// useAlbumSave.ts - Fixed version with no conditional hooks
import React, { useState, useEffect, useCallback, useRef } from "react";
import { SelectedPhoto, PasswordPolicyEnum, ProgressTracker } from "@/lib/types";
import { LOCAL_STORAGE_KEYS } from "@/lib/config";
import { redirectTo } from "@/lib/utils";
import { moveFilesToPublic, clearAlbumData } from "@/lib/file-upload-utils";
import { AlbumService } from "../services/album.service";
import { AppliedTag, FileReferenceInput, ExistingFile } from "../types/album-types";
import { 
  removeDuplicateFileReferences,
  splitArrayIntoChunks,
  createFolderPositionInput,
  createFileReferenceInputs,
  createExistingFileReferenceInputs
} from "../utils/album.utils";

export const useAlbumSave = (
  folderId: string | null,
  cognitoUsername: string | null,
  selectedPhotos: SelectedPhoto[],
  isSubAlbum: boolean,
  selectedFileIds: string[],
  folderName: string,
  folderDescription: string,
  isOnPublicProfile: boolean,
  participantsCanAddItems: boolean,
  participantsCanDeleteItems: boolean,
  passwordProtectionOption: PasswordPolicyEnum,
  albumPassword: string,
  photoTagsMap: Map<number, AppliedTag[]>,
  existingFileTagsMap: Map<number, AppliedTag[]>,
  existingFiles: ExistingFile[],
  selectedExistingIndices: Set<number>,
  setIsSavingAlbum: React.Dispatch<React.SetStateAction<boolean>>,
  setSavingProgress: React.Dispatch<React.SetStateAction<number>>,
  setSelectedPhotos: React.Dispatch<React.SetStateAction<SelectedPhoto[]>>,
  setProgressTracker: React.Dispatch<React.SetStateAction<ProgressTracker>>,
  enhancedLog: (message: string, data?: unknown) => void,
  t: (key: string, options?: Record<string, string | number>) => string
) => {
  
  // FIXED: All state and hooks called unconditionally at the top
  const [isClient, setIsClient] = useState(false);
  const saveInProgressRef = useRef(false);

  // SSR-safe client detection
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Memoized validation function
  const validateRequiredData = useCallback((): boolean => {
    enhancedLog("Validating required data");
    
    if (!cognitoUsername) {
      enhancedLog("No Cognito username, validation failed");
      return false;
    }
    
    if (!folderId) {
      enhancedLog("No folder ID, validation failed");
      return false;
    }
    
    enhancedLog("All required data validated successfully");
    return true;
  }, [cognitoUsername, folderId, enhancedLog]);

  // Memoized progress update function
  const updateSaveProgressText = useCallback((text: string) => {
    enhancedLog(`Save progress text: ${text}`);
    
    if (!isClient) return;
    
    try {
      const saveProgressText = document.getElementById('saveProgressText');
      if (saveProgressText) {
        saveProgressText.innerText = text;
      }
    } catch (error) {
      enhancedLog(`Failed to update progress text in DOM: ${error}`);
    }
  }, [isClient, enhancedLog]);

  // Memoized progress update function
  const updateSaveProgress = useCallback((progress: number) => {
    if (isClient) {
      try {
        const progressBar = document.getElementById('saveProgress');
        if (progressBar) {
          progressBar.style.width = `${progress}%`;
          enhancedLog(`Updated save progress bar: ${progress}%`);
        }
      } catch (error) {
        enhancedLog(`Failed to update progress bar: ${error}`);
      }
    }
    
    setSavingProgress(progress);
  }, [isClient, setSavingProgress, enhancedLog]);

  // Memoized success handler
  const handleSuccessfulSave = useCallback(() => {
    enhancedLog("Handling successful save");
    
    // Clear album data
    clearAlbumData(
      setSelectedPhotos, 
      setProgressTracker, 
      [LOCAL_STORAGE_KEYS.SELECTED_PHOTOS, LOCAL_STORAGE_KEYS.SUB_ALBUM_DATA], 
      enhancedLog
    );
    
    updateSaveProgressText(t('Album saved successfully!'));
    
    if (isClient) {
      try {
        sessionStorage.setItem('album_just_saved', 'true');
        enhancedLog("Set 'album_just_saved' flag in sessionStorage");
      } catch (error) {
        enhancedLog(`Failed to set sessionStorage flag: ${error}`);
      }
    }
    
    enhancedLog("Setting timeout for redirect to my-albums.html");
    setTimeout(() => {
      enhancedLog("Redirecting to my-albums.html");
      redirectTo("my-albums.html");
    }, 1000);
  }, [enhancedLog, setSelectedPhotos, setProgressTracker, updateSaveProgressText, t, isClient]);

  // Memoized chunked save function
  const saveWithChunking = useCallback(async (
    folderPositionInput: Record<string, unknown>, 
    fileReferenceInputs: FileReferenceInput[]
  ) => {
    enhancedLog("Starting chunked save process");
    
    try {
      updateSaveProgressText(t("Processing files in chunks..."));
      
      const chunkSize = 48;
      
      if (fileReferenceInputs.length === 0) {
        enhancedLog("No file references to process, saving only folder position");
        await AlbumService.saveFolderOnly(folderPositionInput, enhancedLog);
      } else {
        const uniqueFileReferences = removeDuplicateFileReferences(fileReferenceInputs);
        enhancedLog(`Processing ${uniqueFileReferences.length} unique file references`);
        
        const chunks = splitArrayIntoChunks(uniqueFileReferences, chunkSize);
        enhancedLog(`Split file references into ${chunks.length} chunks`);
        
        for (let i = 0; i < chunks.length; i++) {
          const chunk = chunks[i];
          enhancedLog(`Processing chunk ${i + 1} of ${chunks.length}`);
          
          const chunkProgress = (i / chunks.length) * 80;
          updateSaveProgress(10 + chunkProgress);
          
          if (i < chunks.length - 1) {
            updateSaveProgressText(t('Saving files: chunk {{chunkNumber}} of {{totalChunks}}...', { 
              chunkNumber: i + 1, 
              totalChunks: chunks.length 
            }));
            await AlbumService.saveFileReferences(chunk, enhancedLog);
          } else {
            updateSaveProgressText(t("Finalizing album..."));
            await AlbumService.saveFinalChunkWithFolder(chunk, folderPositionInput, enhancedLog);
          }
        }
      }
      
      updateSaveProgress(100);
      updateSaveProgressText(t("Album saved successfully!"));
      handleSuccessfulSave();
      
    } catch (error) {
      console.error("Error in chunked save process:", error);
      enhancedLog(`Error in chunked save process: ${error}`);
      updateSaveProgressText(t("Error: {{error}}", { error: String(error) }));
      setIsSavingAlbum(false);
      saveInProgressRef.current = false;
    }
  }, [enhancedLog, updateSaveProgressText, t, updateSaveProgress, handleSuccessfulSave, setIsSavingAlbum]);

  // Main save function with duplicate prevention
  const saveAlbumDirectly = useCallback(async () => {
    // Prevent multiple simultaneous saves
    if (saveInProgressRef.current) {
      enhancedLog("Save already in progress, skipping duplicate call");
      return;
    }

    saveInProgressRef.current = true;
    enhancedLog("Starting direct album save");
    setIsSavingAlbum(true);
    setSavingProgress(5);

    try {
      if (!validateRequiredData()) {
        enhancedLog("Required data validation failed, aborting save");
        return;
      }
      
      const now = Math.floor(Date.now() / 1000);
      const accountId = `${cognitoUsername}_____${cognitoUsername}____Account`;
      const folderParts = folderId!.split("_____");
      const folderTargetItemIdentifier = folderParts[1].split("____")[0];
      
      enhancedLog(`Save timestamp: ${now}`);
      enhancedLog(`Account ID: ${accountId}`);
      enhancedLog(`Folder ID: ${folderId}`);

      // Create folder position input
      const folderPositionInput: Record<string, unknown> = createFolderPositionInput(
        now,
        accountId,
        folderTargetItemIdentifier,
        folderId!,
        cognitoUsername!,
        isOnPublicProfile,
        participantsCanAddItems,
        participantsCanDeleteItems,
        passwordProtectionOption,
        albumPassword,
        folderName,
        folderDescription,
        isSubAlbum,
        selectedFileIds,
        enhancedLog
      );
      
      let fileReferenceInputs: FileReferenceInput[] = [];
      
      // Process new uploads
      const validPhotos = selectedPhotos.filter(photo => photo.status === 'complete');
      enhancedLog(`Found ${validPhotos.length} valid photos`);
      
      if (validPhotos.length > 0) {
        const newUploads = validPhotos.filter(photo => !photo.fileId);
        
        if (newUploads.length > 0) {
          enhancedLog("Moving files from temp to public folder");
          await moveFilesToPublic(newUploads, updateSaveProgress, enhancedLog);
        }
        
        const newFileReferenceInputs = createFileReferenceInputs(
          validPhotos, 
          now, 
          accountId, 
          folderId!, 
          cognitoUsername!, 
          photoTagsMap, 
          enhancedLog
        );
        fileReferenceInputs = fileReferenceInputs.concat(newFileReferenceInputs);
      }
      
      // Add existing file references
      const existingFileReferenceInputs = createExistingFileReferenceInputs(
        now,
        folderId!,
        cognitoUsername!,
        existingFiles,
        selectedExistingIndices,
        existingFileTagsMap,
        enhancedLog
      );
      
      if (existingFileReferenceInputs.length > 0) {
        fileReferenceInputs = fileReferenceInputs.concat(existingFileReferenceInputs);
      }
      
      // Add sub-album file references
      if (isSubAlbum && selectedFileIds.length > 0) {
        const subAlbumFileReferenceInputs: FileReferenceInput[] = selectedFileIds.map((fileId) => {
          const parts = fileId.split('_____');
          const fileDisplayName = parts.length >= 2 ? parts[1].split('____')[0] : fileId;
          
          return {
            fileReferencesHolderId: folderId!,
            currentTime: now,
            points: 1,
            hasBeenDeleted: false,
            selectedTagInputs: [],
            fileId,
            fileDisplayName: fileDisplayName,
            fileInput: null
          };
        });
        
        fileReferenceInputs = fileReferenceInputs.concat(subAlbumFileReferenceInputs);
      }
      
      enhancedLog(`Total file reference inputs: ${fileReferenceInputs.length}`);
      
      // Save with chunking
      await saveWithChunking(folderPositionInput, fileReferenceInputs);
      
    } catch (err) {
      console.error("Error in saveAlbumDirectly:", err);
      enhancedLog(`Error in saveAlbumDirectly: ${err}`);
      setIsSavingAlbum(false);
    } finally {
      saveInProgressRef.current = false;
    }
  }, [
    validateRequiredData, cognitoUsername, folderId, isOnPublicProfile, 
    participantsCanAddItems, participantsCanDeleteItems, passwordProtectionOption,
    albumPassword, folderName, folderDescription, isSubAlbum, selectedFileIds,
    selectedPhotos, photoTagsMap, existingFiles, selectedExistingIndices,
    existingFileTagsMap, enhancedLog, setIsSavingAlbum, setSavingProgress,
    updateSaveProgress, saveWithChunking
  ]);

  return {
    saveAlbumDirectly
  };
};