import { useState, useEffect, useRef } from "react";
import { 
  SelectedPhoto, 
  ProgressTracker
} from "@/lib/types";
import { LOCAL_STORAGE_KEYS } from "@/lib/config";
import { checkLoginWithRefresh, generateUUID } from "@/lib/utils";
import { 
  createLogger, 
  createPhotoStatusUpdater, 
  updateProgressTracker,
  processFilesBeforeUploadingToS3,
  clearAlbumData
} from "@/lib/file-upload-utils";

/**
 * Custom hook for handling album upload functionality
 */
export const useAlbumUpload = (cognitoUsername: string | null) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedPhotos, setSelectedPhotos] = useState<SelectedPhoto[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [progressTracker, setProgressTracker] = useState<ProgressTracker>({
    totalFiles: 0,
    filesComplete: 0,
    filesUploading: 0,
    filesProcessing: 0,
    filesWithError: 0,
    overallProgress: 0
  });
  const [debugMessages, setDebugMessages] = useState<string[]>([]);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  
  // Add new state for file processing completion tracking
  const [fileProcessingComplete, setFileProcessingComplete] = useState(false);
  
  // Use the createLogger function from the utils
  const log = createLogger(setDebugMessages);
  
  // Use updateProgressTracker from the utils
  useEffect(() => {
    updateProgressTracker(selectedPhotos, setProgressTracker);
  }, [selectedPhotos]);

  // Add effect to handle navigation after file processing is complete
  useEffect(() => {
    if (fileProcessingComplete && selectedPhotos.length > 0) {
      // Show a completion message in the UI
      const successCount = selectedPhotos.filter(photo => photo.status === 'complete').length;
      const errorCount = selectedPhotos.filter(photo => photo.status === 'error').length;
      
      log(`✅ Upload complete: ${successCount} successful, ${errorCount} failed`);
      
      // Add a slight delay to show the completion state before redirecting
      setTimeout(() => {
        // Redirect to save-album page with folder ID parameter if adding to existing album
        if (currentFolderId) {
          window.location.href = `/save-album.html?folderId=${encodeURIComponent(currentFolderId)}`;
        } else {
          window.location.href = "/save-album.html";
        }
        
        // Clean up
        handleClearAlbumData();
      }, 1000);
    }
  }, [fileProcessingComplete, selectedPhotos.length, currentFolderId]);

  // Use the clearAlbumData function from utils
  const handleClearAlbumData = () => {
    clearAlbumData(setSelectedPhotos, setProgressTracker, [], log);
    setIsUploading(false);
    setFileProcessingComplete(false);
  }

  // Function to open file picker
  const openFilePicker = (folderId: string | null = null) => {
    // Set current folder ID if adding to existing folder
    setCurrentFolderId(folderId)
    
    // Clear current selected photos before opening file picker
    setSelectedPhotos([])
    
    // Reset file processing completion flag
    setFileProcessingComplete(false)
    
    fileInputRef.current?.click()
  }

  // Use the createPhotoStatusUpdater function from the utils
  const updatePhotoStatus = createPhotoStatusUpdater(setSelectedPhotos);

  // Modified handleFileSelection function to match the pattern in photos.tsx
  const handleFileSelection = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    setIsUploading(true)
    
    // Reset file processing completion flag
    setFileProcessingComplete(false)
    
    // Get a fresh token using the async function
    const token = await checkLoginWithRefresh();
    
    if (!token) {
      log("❌ Authentication failed")
      setIsUploading(false)
      return
    }
    
    if (!cognitoUsername) {
      log("❌ Missing Cognito Username")
      setIsUploading(false)
      return
    }
  
    try {
      // Generate a new folder ID or use existing one
      const newFolderId = currentFolderId || `${cognitoUsername}_____${generateUUID()}____Folder`
      log(`📁 Using folder ID: ${newFolderId}`)
      
      // Initialize empty array for selected photos in state to show initial progress
      setSelectedPhotos(files.map((file) => ({
        fileName: file.name,
        s3PreviewUrl: URL.createObjectURL(file),
        type: file.type,
        size: file.size,
        status: 'pending',
        progress: 0
      })));
      
      // Set up an interval to update the UI while processing continues
      const progressUpdateInterval = setInterval(() => {
        updateProgressTracker(selectedPhotos, setProgressTracker);
      }, 500);
      
      // Use the processFilesBeforeUploadingToS3 function from utils
      const processedPhotos = await processFilesBeforeUploadingToS3(files, cognitoUsername, updatePhotoStatus, log);
      
      // Clear the interval once processing is complete
      clearInterval(progressUpdateInterval);
      
      // Make sure we have a final progress update
      updateProgressTracker(processedPhotos, setProgressTracker);
      
      // Save to localStorage - ONLY the keys and metadata, not the file data
      localStorage.setItem(LOCAL_STORAGE_KEYS.SELECTED_PHOTOS, JSON.stringify(processedPhotos))
      log(`📸 Saved ${processedPhotos.length} photos metadata to storage`)
      
      // If all photos are uploaded successfully, show a completion message
      const allComplete = processedPhotos.every(photo => photo.status === 'complete');
      const anyErrors = processedPhotos.some(photo => photo.status === 'error');
      
      if (allComplete && !anyErrors) {
        log(`✅ All ${processedPhotos.length} files successfully uploaded`);
      } else if (anyErrors) {
        const errorCount = processedPhotos.filter(photo => photo.status === 'error').length;
        log(`⚠️ Upload completed with ${errorCount} errors`);
      }
      
      // Set the file processing completion flag to trigger the navigation effect
      setFileProcessingComplete(true);

    } catch (error) {
      log(`❌ Fatal error in handleFileSelection: ${String(error)}`)
      setIsUploading(false)
    } finally {
      // Clear the file input to allow selecting the same files again
      if (e.target) e.target.value = ""
    }
  }

  return {
    fileInputRef,
    selectedPhotos,
    isUploading,
    progressTracker,
    debugMessages,
    openFilePicker,
    handleFileSelection,
    log
  };
};