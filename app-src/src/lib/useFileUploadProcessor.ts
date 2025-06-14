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
 * NEW: Enhanced to better separate new uploads from existing files
 * UPDATED: Improved navigation logic and state management for existing albums
 * ENHANCED: Support for credential prewarming and better error handling
 */
export const useFileUploadProcessor = (
  navigateAfterUpload?: (folderId: string | null) => void,
  // NEW: Option to disable auto-navigation (useful when editing existing albums)
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
  
  // NEW: Track if we're working with an existing album
  const [isEditingExistingAlbum, setIsEditingExistingAlbum] = useState(false);
  
  // MEMOIZED: Create logger function to prevent recreation on every render
  const log = useMemo(() => createLogger(setDebugMessages), []);
  
  // MEMOIZED: Create photo status updater to prevent recreation on every render
  const updatePhotoStatus = useMemo(() => createPhotoStatusUpdater(setSelectedPhotos), []);
  
  // NEW: Prewarm S3 credentials on hook initialization to eliminate first-upload stalling
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

  // OPTIMIZED: Handle navigation after file processing is complete
  // Use refs to avoid stale closure issues and reduce re-renders
  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    // NEW: Only navigate if auto-navigation is enabled and we're not editing an existing album
    if (fileProcessingComplete && selectedPhotos.length > 0 && !disableAutoNavigation && !isEditingExistingAlbum) {
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
    } else if (fileProcessingComplete && selectedPhotos.length > 0) {
      // NEW: For existing albums, just clean up the upload state without navigating
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
  }, [fileProcessingComplete, selectedPhotos.length, currentFolderId, navigateAfterUpload, log, disableAutoNavigation, isEditingExistingAlbum]);

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
    setIsEditingExistingAlbum(false);
    
    // Clear any pending navigation
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
      navigationTimeoutRef.current = null;
    }
  }, []);

  // MEMOIZED: Function to open file picker
  const openFilePicker = useCallback((folderId: string | null = null) => {
    // NEW: Determine if we're working with an existing album
    const isExistingAlbum = Boolean(folderId);
    setIsEditingExistingAlbum(isExistingAlbum);
    
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
      `Opening file picker for existing album: ${folderId}` : 
      "Opening file picker for new album"
    );
    
    fileInputRef.current?.click();
  }, [log]);

  // NEW: Function to set up for editing an existing album
  const setEditingExistingAlbum = useCallback((folderId: string) => {
    setCurrentFolderId(folderId);
    setIsEditingExistingAlbum(true);
    log(`Set up for editing existing album: ${folderId}`);
  }, [log]);

  // MEMOIZED: Handle file selection with optimized state management
  // UPDATED: Enhanced logic for existing albums vs new albums
  const handleFileSelection = useCallback(async (e: React.ChangeEvent<HTMLInputElement>, cognitoUsername: string | null) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return false;

    // Get current photos to append to (only if we're editing an existing album and want to preserve uploads)
    const existingPhotos = isEditingExistingAlbum ? 
      selectedPhotos.filter(photo => photo.status === 'complete' || photo.status === 'error') : 
      [];
    const isAddingToExisting = existingPhotos.length > 0;
    
    log(isEditingExistingAlbum ? 
      (isAddingToExisting ? 
        `📸 Adding ${files.length} new files to existing album with ${existingPhotos.length} previously uploaded photos` : 
        `📸 Adding ${files.length} new files to existing album`
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
      
      // Process only the new files
      const processedNewPhotos = await processFilesBeforeUploadingToS3(files, cognitoUsername, updatePhotoStatus, log);
      
      // Combine existing photos with processed new photos
      const finalCombinedPhotos = [...existingPhotos, ...processedNewPhotos];
      setSelectedPhotos(finalCombinedPhotos);
      
      // Make sure we have a final progress update
      updateProgressTracker(finalCombinedPhotos, setProgressTracker);
      
      // Save to localStorage - ONLY the keys and metadata, not the file data
      // NEW: For existing albums, we might want to handle localStorage differently
      if (!isEditingExistingAlbum || existingPhotos.length === 0) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.SELECTED_PHOTOS, JSON.stringify(finalCombinedPhotos));
        log(`📸 Saved ${finalCombinedPhotos.length} photos metadata to storage`);
      } else {
        log(`📸 Processed ${processedNewPhotos.length} new photos for existing album (not overwriting localStorage)`);
      }
      
      // Check results for new photos only
      const newCompletePhotos = processedNewPhotos.filter(photo => photo.status === 'complete');
      const newErrorPhotos = processedNewPhotos.filter(photo => photo.status === 'error');
      
      if (newCompletePhotos.length === processedNewPhotos.length && newErrorPhotos.length === 0) {
        log(`✅ All ${processedNewPhotos.length} new files successfully uploaded`);
      } else if (newErrorPhotos.length > 0) {
        log(`⚠️ Upload completed with ${newErrorPhotos.length} errors out of ${processedNewPhotos.length} new files`);
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
  }, [currentFolderId, updatePhotoStatus, log, selectedPhotos, isEditingExistingAlbum]);

  // NEW: Function to reset for new album creation
  const resetForNewAlbum = useCallback(() => {
    clearUploadData();
    setCurrentFolderId(null);
    setIsEditingExistingAlbum(false);
    log("🔄 Reset for new album creation");
  }, [clearUploadData, log]);

  // NEW: Function to load photos from localStorage (useful for page refreshes)
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

  // NEW: Function to check if there are uploads in progress
  const hasUploadsInProgress = useCallback(() => {
    return isUploading || isProcessingFiles || (
      progressTracker.totalFiles > 0 && 
      progressTracker.filesComplete < progressTracker.totalFiles
    );
  }, [isUploading, isProcessingFiles, progressTracker]);

  // NEW: Function to get upload statistics
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
    
    // NEW: Enhanced state for existing album support
    isEditingExistingAlbum,
    
    // Core functions
    openFilePicker,
    handleFileSelection,
    clearUploadData,
    log,
    updatePhotoStatus,
    
    // NEW: Enhanced functions for existing album support
    setEditingExistingAlbum,
    resetForNewAlbum,
    loadPhotosFromStorage,
    hasUploadsInProgress,
    getUploadStats
  };
};