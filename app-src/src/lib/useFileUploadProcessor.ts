import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { 
  SelectedPhoto, 
  ProgressTracker
} from "@/lib/types";
import { LOCAL_STORAGE_KEYS } from "@/lib/config";
import { checkLoginWithRefresh, generateUUID, redirectTo } from "@/lib/utils";
import { 
  createLogger, 
  createPhotoStatusUpdater, 
  updateProgressTracker,
  processFilesBeforeUploadingToS3
} from "@/lib/file-upload-utils";

/**
 * Optimized custom hook for handling file upload functionality
 * This hook consolidates common file upload logic used across the application
 * with performance optimizations to prevent unnecessary re-renders and bandwidth usage
 */
export const useFileUploadProcessor = (
  navigateAfterUpload?: (folderId: string | null) => void
) => {
  // Core file input and state management
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedPhotos, setSelectedPhotos] = useState<SelectedPhoto[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessingFiles, setIsProcessingFiles] = useState(false);
  const [progressTracker, setProgressTracker] = useState<ProgressTracker>({
    totalFiles: 0,
    filesComplete: 0,
    filesUploading: 0,
    filesProcessing: 0,
    filesWithError: 0,
    overallProgress: 0
  });
  const [debugMessages, setDebugMessages] = useState<string[]>([]);
  const [fileProcessingComplete, setFileProcessingComplete] = useState(false);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  
  // MEMOIZED: Create logger function to prevent recreation on every render
  const log = useMemo(() => createLogger(setDebugMessages), []);
  
  // MEMOIZED: Create photo status updater to prevent recreation on every render
  const updatePhotoStatus = useMemo(() => createPhotoStatusUpdater(setSelectedPhotos), []);
  
  // THROTTLED: Update progress tracker when selected photos change
  // Use a ref to track if an update is already scheduled to prevent excessive updates
  const updateScheduledRef = useRef(false);
  
  useEffect(() => {
    if (!updateScheduledRef.current) {
      updateScheduledRef.current = true;
      
      // Use requestAnimationFrame to batch progress updates
      requestAnimationFrame(() => {
        updateProgressTracker(selectedPhotos, setProgressTracker);
        updateScheduledRef.current = false;
      });
    }
  }, [selectedPhotos]);

  // OPTIMIZED: Handle navigation after file processing is complete
  // Use refs to avoid stale closure issues and reduce re-renders
  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    if (fileProcessingComplete && selectedPhotos.length > 0) {
      // Clear any existing timeout to prevent duplicate navigation
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
      
      // Show a completion message in the UI
      const successCount = selectedPhotos.filter(photo => photo.status === 'complete').length;
      const errorCount = selectedPhotos.filter(photo => photo.status === 'error').length;
      
      log(`✅ Upload complete: ${successCount} successful, ${errorCount} failed`);
      
      // Set uploading to false immediately to clean up UI
      setIsUploading(false);
      setIsProcessingFiles(false);
      
      // Schedule navigation with cleanup
      navigationTimeoutRef.current = setTimeout(() => {
        if (navigateAfterUpload) {
          navigateAfterUpload(currentFolderId);
        } else {
          // Default navigation behavior if no callback provided
          if (currentFolderId) {
            redirectTo(`save-album.html?folderId=${encodeURIComponent(currentFolderId)}`);
          } else {
            redirectTo("save-album.html");
          }
        }
      }, 800);
    }
    
    // Cleanup function to clear timeout if component unmounts
    return () => {
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, [fileProcessingComplete, selectedPhotos.length, currentFolderId, navigateAfterUpload, log]);

  // MEMOIZED: Function to clear upload data
  const clearUploadData = useCallback(() => {
    setSelectedPhotos([]);
    setProgressTracker({
      totalFiles: 0,
      filesComplete: 0,
      filesUploading: 0,
      filesProcessing: 0,
      filesWithError: 0,
      overallProgress: 0
    });
    setDebugMessages([]);
    setIsUploading(false);
    setIsProcessingFiles(false);
    setFileProcessingComplete(false);
    
    // Clear any pending navigation
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
      navigationTimeoutRef.current = null;
    }
  }, []);

  // MEMOIZED: Function to open file picker
  const openFilePicker = useCallback((folderId: string | null = null) => {
    // Set current folder ID if adding to existing folder
    setCurrentFolderId(folderId);
    
    // Clear current selected photos before opening file picker
    setSelectedPhotos([]);
    
    // Reset file processing completion flag
    setFileProcessingComplete(false);
    setIsProcessingFiles(false);
    
    // Clear any pending navigation
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
      navigationTimeoutRef.current = null;
    }
    
    fileInputRef.current?.click();
  }, []);

  // MEMOIZED: Handle file selection with optimized state management
  const handleFileSelection = useCallback(async (e: React.ChangeEvent<HTMLInputElement>, cognitoUsername: string | null) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return false;

    // Set states immediately for better UX
    setIsUploading(true);
    setIsProcessingFiles(true);
    
    // Reset file processing completion flag
    setFileProcessingComplete(false);
    
    // Initialize progress tracker immediately
    setProgressTracker({
      totalFiles: files.length,
      filesComplete: 0,
      filesUploading: 0,
      filesProcessing: files.length,
      filesWithError: 0,
      overallProgress: 0
    });
    
    // Get a fresh token using the async function
    const token = await checkLoginWithRefresh();
    
    if (!token) {
      log("❌ Authentication failed");
      setIsUploading(false);
      setIsProcessingFiles(false);
      return false;
    }
    
    if (!cognitoUsername) {
      log("❌ Missing Cognito Username");
      setIsUploading(false);
      setIsProcessingFiles(false);
      return false;
    }
  
    try {
      // Generate a new folder ID or use existing one
      const newFolderId = currentFolderId || `${cognitoUsername}_____${generateUUID()}____Folder`;
      log(`📁 Using folder ID: ${newFolderId}`);
      setCurrentFolderId(newFolderId);
      
      // Initialize selected photos with proper initial state
      const initialPhotos = files.map((file) => ({
        fileName: file.name,
        s3PreviewUrl: URL.createObjectURL(file),
        type: file.type,
        size: file.size,
        status: 'pending' as const,
        progress: 0
      }));
      
      setSelectedPhotos(initialPhotos);
      
      // Use the processFilesBeforeUploadingToS3 function from utils
      const processedPhotos = await processFilesBeforeUploadingToS3(files, cognitoUsername, updatePhotoStatus, log);
      
      // Make sure we have a final progress update
      updateProgressTracker(processedPhotos, setProgressTracker);
      
      // Save to localStorage - ONLY the keys and metadata, not the file data
      localStorage.setItem(LOCAL_STORAGE_KEYS.SELECTED_PHOTOS, JSON.stringify(processedPhotos));
      log(`📸 Saved ${processedPhotos.length} photos metadata to storage`);
      
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
      return true;

    } catch (error) {
      log(`❌ Fatal error in handleFileSelection: ${String(error)}`);
      setIsUploading(false);
      setIsProcessingFiles(false);
      return false;
    } finally {
      // Clear the file input to allow selecting the same files again
      if (e.target) e.target.value = "";
    }
  }, [currentFolderId, updatePhotoStatus, log]);

  // Cleanup function to prevent memory leaks
  useEffect(() => {
    return () => {
      // Cleanup any pending navigation timeout
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
      
      // Revoke any object URLs to prevent memory leaks
      selectedPhotos.forEach(photo => {
        if (photo.s3PreviewUrl && photo.s3PreviewUrl.startsWith('blob:')) {
          URL.revokeObjectURL(photo.s3PreviewUrl);
        }
      });
    };
  }, [selectedPhotos]);

  return {
    fileInputRef,
    selectedPhotos,
    setSelectedPhotos,
    isUploading,
    setIsUploading,
    isProcessingFiles,
    progressTracker,
    setProgressTracker,
    debugMessages,
    fileProcessingComplete,
    setFileProcessingComplete,
    currentFolderId,
    openFilePicker,
    handleFileSelection,
    clearUploadData,
    log,
    updatePhotoStatus
  };
};