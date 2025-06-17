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
import { prewarmCredentials } from "./s3";

/**
 * Optimized custom hook for handling file upload functionality
 * This hook consolidates common file upload logic used across the application
 * with performance optimizations to prevent unnecessary re-renders and bandwidth usage
 * 
 * FIXED: Enhanced navigation logic to properly handle "Add Photos" flow
 * UPDATED: Improved navigation logic using isOnSaveAlbumPage instead of isEditingExistingAlbum
 * ENHANCED: Support for credential prewarming and better error handling
 */
export const useFileUploadProcessor = (
  navigateAfterUpload?: (folderId: string | null) => void,
  // Option to disable auto-navigation (useful when editing existing albums)
  disableAutoNavigation?: boolean
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
  
  // Track if we're on the save-album page (instead of isEditingExistingAlbum)
  const [isOnSaveAlbumPage, setIsOnSaveAlbumPage] = useState(false);
  
  // MEMOIZED: Create logger function to prevent recreation on every render
  const log = useMemo(() => createLogger(setDebugMessages), []);
  
  // MEMOIZED: Create photo status updater to prevent recreation on every render
  const updatePhotoStatus = useMemo(() => createPhotoStatusUpdater(setSelectedPhotos), []);
  
  // Prewarm S3 credentials on hook initialization to eliminate first-upload stalling
  useEffect(() => {
    const warmUpCredentials = async () => {
      try {
        await prewarmCredentials();
        log("🔥 S3 credentials prewarmed successfully");
      } catch (error) {
        log(`⚠️ Credential prewarming failed: ${String(error)}`);
      }
    };
    
    warmUpCredentials();
  }, []); // Empty dependency array - run once on mount
  
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

  // FIXED: Handle navigation after file processing is complete
  // Simplified navigation logic to fix "Add Photos" flow
  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    // FIXED: Simplified navigation conditions
    const shouldNavigate = fileProcessingComplete && 
                          selectedPhotos.length > 0 && 
                          disableAutoNavigation !== true && 
                          !isOnSaveAlbumPage;
    
    if (shouldNavigate) {
      // Clear any existing timeout to prevent duplicate navigation
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
      
      // Show a completion message in the UI
      const successCount = selectedPhotos.filter(photo => photo.status === 'complete').length;
      const errorCount = selectedPhotos.filter(photo => photo.status === 'error').length;
      
      log(`✅ Upload complete: ${successCount} successful, ${errorCount} failed`);
      log(`🚀 Navigating to save-album with folderId: ${currentFolderId}`);
      
      // Set uploading to false immediately to clean up UI
      setIsUploading(false);
      setIsProcessingFiles(false);
      
      // FIXED: Shorter timeout and better navigation logic
      navigationTimeoutRef.current = setTimeout(() => {
        try {
          if (navigateAfterUpload) {
            log(`🎯 Using custom navigation callback with folderId: ${currentFolderId}`);
            navigateAfterUpload(currentFolderId);
          } else {
            // Default navigation behavior if no callback provided
            const targetUrl = currentFolderId ? 
              `save-album.html?folderId=${encodeURIComponent(currentFolderId)}` : 
              "save-album.html";
            log(`🎯 Using default navigation to: ${targetUrl}`);
            redirectTo(targetUrl);
          }
        } catch (error) {
          log(`❌ Navigation error: ${String(error)}`);
        }
      }, 500); // Reduced timeout for faster navigation
    } else if (fileProcessingComplete && selectedPhotos.length > 0 && isOnSaveAlbumPage) {
      // For save-album page, just clean up the upload state without navigating
      const successCount = selectedPhotos.filter(photo => photo.status === 'complete').length;
      const errorCount = selectedPhotos.filter(photo => photo.status === 'error').length;
      
      log(`✅ Files added to existing album: ${successCount} successful, ${errorCount} failed`);
      setIsUploading(false);
      setIsProcessingFiles(false);
    }
    
    // Cleanup function to clear timeout if component unmounts
    return () => {
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, [fileProcessingComplete, selectedPhotos.length, currentFolderId, navigateAfterUpload, log, disableAutoNavigation, isOnSaveAlbumPage]);

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
    setIsOnSaveAlbumPage(false);
    
    // Clear any pending navigation
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
      navigationTimeoutRef.current = null;
    }
  }, []);

  // MEMOIZED: Function to open file picker
  const openFilePicker = useCallback((folderId: string | null = null) => {
    // Determine if we're working with an existing album
    const isExistingAlbum = Boolean(folderId);
    
    // Set current folder ID if adding to existing folder
    setCurrentFolderId(folderId);
    
    // Reset file processing completion flag
    setFileProcessingComplete(false);
    setIsProcessingFiles(false);
    
    // Clear any pending navigation
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
      navigationTimeoutRef.current = null;
    }
    
    log(isExistingAlbum ? 
      `📂 Opening file picker for existing album: ${folderId}` : 
      "📂 Opening file picker for new album"
    );
    
    fileInputRef.current?.click();
  }, [log]);

  // Function to set that we're on the save-album page
  const setOnSaveAlbumPage = useCallback((isOnPage: boolean) => {
    setIsOnSaveAlbumPage(isOnPage);
    log(`🏠 Set isOnSaveAlbumPage to: ${isOnPage}`);
  }, [log]);

  // MEMOIZED: Handle file selection with optimized state management
  // FIXED: Enhanced error handling and logging
  const handleFileSelection = useCallback(async (e: React.ChangeEvent<HTMLInputElement>, cognitoUsername: string | null) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) {
      log("❌ No files selected");
      return false;
    }

    // Get current photos to append to (only if we're on save-album page and want to preserve uploads)
    const existingPhotos = isOnSaveAlbumPage ? 
      selectedPhotos.filter(photo => photo.status === 'complete' || photo.status === 'error') : 
      [];
    const isAddingToExisting = existingPhotos.length > 0;
    
    log(currentFolderId ? 
      (isAddingToExisting ? 
        `📸 Adding ${files.length} new files to existing album with ${existingPhotos.length} previously uploaded photos` : 
        `📸 Adding ${files.length} new files to existing album: ${currentFolderId}`
      ) :
      `📸 Processing ${files.length} new files for new album`
    );

    // Set states immediately for better UX
    setIsUploading(true);
    setIsProcessingFiles(true);
    
    // Reset file processing completion flag
    setFileProcessingComplete(false);
    
    // Initialize progress tracker - account for existing completed photos
    const totalFiles = existingPhotos.length + files.length;
    const filesComplete = existingPhotos.length;
    
    setProgressTracker({
      totalFiles,
      filesComplete,
      filesUploading: 0,
      filesProcessing: files.length,
      filesWithError: 0,
      overallProgress: totalFiles > 0 ? (filesComplete / totalFiles) * 100 : 0
    });
    
    try {
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
    
      // Generate a new folder ID or use existing one
      const newFolderId = currentFolderId || `${cognitoUsername}_____${generateUUID()}____Folder`;
      log(`📁 Using folder ID: ${newFolderId}${currentFolderId ? ' (existing)' : ' (new)'}`);
      setCurrentFolderId(newFolderId);
      
      // Initialize new photos with proper initial state
      const newPhotos = files.map((file) => ({
        fileName: file.name,
        s3PreviewUrl: URL.createObjectURL(file),
        type: file.type,
        size: file.size,
        status: 'pending' as const,
        progress: 0
      }));
      
      // Combine existing photos with new photos for immediate UI update
      const combinedPhotos = [...existingPhotos, ...newPhotos];
      setSelectedPhotos(combinedPhotos);
      
      log(`🚀 Starting upload process for ${files.length} files...`);
      
      // Process only the new files
      const processedNewPhotos = await processFilesBeforeUploadingToS3(files, cognitoUsername, updatePhotoStatus, log);
      
      // Combine existing photos with processed new photos
      const finalCombinedPhotos = [...existingPhotos, ...processedNewPhotos];
      setSelectedPhotos(finalCombinedPhotos);
      
      // Make sure we have a final progress update
      updateProgressTracker(finalCombinedPhotos, setProgressTracker);
      
      // FIXED: Always save to localStorage for navigation flow
      // This ensures save-album.tsx can load the photos
      localStorage.setItem(LOCAL_STORAGE_KEYS.SELECTED_PHOTOS, JSON.stringify(finalCombinedPhotos));
      log(`💾 Saved ${finalCombinedPhotos.length} photos metadata to localStorage`);
      
      // Check results for new photos only
      const newCompletePhotos = processedNewPhotos.filter(photo => photo.status === 'complete');
      const newErrorPhotos = processedNewPhotos.filter(photo => photo.status === 'error');
      
      if (newCompletePhotos.length === processedNewPhotos.length && newErrorPhotos.length === 0) {
        log(`✅ All ${processedNewPhotos.length} new files successfully uploaded`);
      } else if (newErrorPhotos.length > 0) {
        log(`⚠️ Upload completed with ${newErrorPhotos.length} errors out of ${processedNewPhotos.length} new files`);
      }
      
      // FIXED: Set the file processing completion flag to trigger the navigation effect
      log(`🎯 Setting fileProcessingComplete=true to trigger navigation`);
      setFileProcessingComplete(true);
      return true;

    } catch (error) {
      log(`❌ Fatal error in handleFileSelection: ${String(error)}`);
      console.error("Upload error:", error);
      setIsUploading(false);
      setIsProcessingFiles(false);
      setFileProcessingComplete(false);
      return false;
    } finally {
      // Clear the file input to allow selecting the same files again
      if (e.target) e.target.value = "";
    }
  }, [currentFolderId, updatePhotoStatus, log, selectedPhotos, isOnSaveAlbumPage]);

  // Function to reset for new album creation
  const resetForNewAlbum = useCallback(() => {
    clearUploadData();
    setCurrentFolderId(null);
    setIsOnSaveAlbumPage(false);
    log("🔄 Reset for new album creation");
  }, [clearUploadData, log]);

  // Function to load photos from localStorage (useful for page refreshes)
  const loadPhotosFromStorage = useCallback(() => {
    try {
      const storedPhotos = localStorage.getItem(LOCAL_STORAGE_KEYS.SELECTED_PHOTOS);
      if (storedPhotos) {
        const parsedPhotos = JSON.parse(storedPhotos);
        if (Array.isArray(parsedPhotos) && parsedPhotos.length > 0) {
          setSelectedPhotos(parsedPhotos);
          log(`📸 Loaded ${parsedPhotos.length} photos from storage`);
          return parsedPhotos;
        }
      }
    } catch (error) {
      log(`⚠️ Failed to load photos from storage: ${String(error)}`);
    }
    return [];
  }, [log]);

  // Function to check if there are uploads in progress
  const hasUploadsInProgress = useCallback(() => {
    return isUploading || isProcessingFiles || (
      progressTracker.totalFiles > 0 && 
      progressTracker.filesComplete < progressTracker.totalFiles
    );
  }, [isUploading, isProcessingFiles, progressTracker]);

  // Function to get upload statistics
  const getUploadStats = useCallback(() => {
    const complete = selectedPhotos.filter(photo => photo.status === 'complete').length;
    const errors = selectedPhotos.filter(photo => photo.status === 'error').length;
    const pending = selectedPhotos.filter(photo => photo.status === 'pending' || photo.status === 'uploading').length;
    
    return {
      total: selectedPhotos.length,
      complete,
      errors,
      pending,
      successRate: selectedPhotos.length > 0 ? (complete / selectedPhotos.length) * 100 : 0
    };
  }, [selectedPhotos]);

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
    // Core file input and state
    fileInputRef,
    selectedPhotos,
    setSelectedPhotos,
    isUploading,
    setIsUploading,
    isProcessingFiles,
    setIsProcessingFiles,
    progressTracker,
    setProgressTracker,
    debugMessages,
    fileProcessingComplete,
    setFileProcessingComplete,
    currentFolderId,
    
    // Enhanced state for save-album page tracking
    isOnSaveAlbumPage,
    
    // Core functions
    openFilePicker,
    handleFileSelection,
    clearUploadData,
    log,
    updatePhotoStatus,
    
    // Enhanced functions for save-album page support
    setOnSaveAlbumPage,
    resetForNewAlbum,
    loadPhotosFromStorage,
    hasUploadsInProgress,
    getUploadStats
  };
};