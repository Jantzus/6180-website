// useAlbumSave.ts - SSR-safe focused hook for album saving only
import React, { useState, useEffect } from "react";
import { SelectedPhoto, PasswordPolicyEnum, ProgressTracker } from "@/lib/types";
import { LOCAL_STORAGE_KEYS } from "@/lib/config";
import { redirectTo } from "@/lib/utils";
import { moveFilesToPublic, clearAlbumData } from "@/lib/file-upload-utils";
import { AlbumService } from "../services/album.service";
import { AppliedTag, FileReferenceInput } from "../types/album-types";
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
  existingFiles: any[],
  selectedExistingIndices: Set<number>,
  setIsSavingAlbum: React.Dispatch<React.SetStateAction<boolean>>,
  setSavingProgress: React.Dispatch<React.SetStateAction<number>>,
  setSelectedPhotos: React.Dispatch<React.SetStateAction<SelectedPhoto[]>>,
  setProgressTracker: React.Dispatch<React.SetStateAction<ProgressTracker>>,
  enhancedLog: (message: string, data?: any) => void,
  t: (key: string, options?: any) => string
) => {
  
  // SSR-safe client detection
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // SSR-safe helper function to update progress text (expects already translated text)
  const updateSaveProgressText = (text: string) => {
    enhancedLog(`Save progress text: ${text}`);
    
    // Only access DOM on client-side to avoid SSR issues
    if (!isClient) return;
    
    try {
      const saveProgressText = document.getElementById('saveProgressText');
      if (saveProgressText) {
        saveProgressText.innerText = text;
      }
    } catch (error) {
      // Silent fail if DOM access fails
      enhancedLog(`Failed to update progress text in DOM: ${error}`);
    }
  };

  // SSR-safe helper function to update progress UI
  const updateSaveProgress = (progress: number) => {
    // Update progress in UI (client-side only)
    if (isClient) {
      try {
        const progressBar = document.getElementById('saveProgress');
        if (progressBar) {
          progressBar.style.width = `${progress}%`;
          enhancedLog(`Updated save progress bar: ${progress}%`);
        } else {
          enhancedLog("Progress bar element not found");
        }
      } catch (error) {
        enhancedLog(`Failed to update progress bar: ${error}`);
      }
    }
    
    setSavingProgress(progress);
  };

  // Function to validate required data
  const validateRequiredData = (): boolean => {
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
  };

  // Function to handle successful save
  const handleSuccessfulSave = () => {
    enhancedLog("Handling successful save");
    // Clear all album data before redirecting
    clearAlbumData(setSelectedPhotos, setProgressTracker, [LOCAL_STORAGE_KEYS.SELECTED_PHOTOS, LOCAL_STORAGE_KEYS.SUB_ALBUM_DATA], enhancedLog);
    enhancedLog("Album data cleared");
    
    updateSaveProgressText(t('Album saved successfully!'));
    
    // SSR-safe sessionStorage operation
    if (isClient) {
      try {
        // Set a flag in sessionStorage that we just completed an album
        sessionStorage.setItem('album_just_saved', 'true');
        enhancedLog("Set 'album_just_saved' flag in sessionStorage");
      } catch (error) {
        enhancedLog(`Failed to set sessionStorage flag: ${error}`);
      }
    }
    
    // Slight delay before redirect for user to see success message
    enhancedLog("Setting timeout for redirect to my-albums.html");
    setTimeout(() => {
      enhancedLog("Redirecting to my-albums.html");
      redirectTo("my-albums.html");
    }, 1000);
  };

  // Main save with chunking function
  const saveWithChunking = async (folderPositionInput: any, fileReferenceInputs: FileReferenceInput[]) => {
    enhancedLog("Starting chunked save process (individual photo tags with filenames, no folder tags, including existing files with tags)");
    try {
      updateSaveProgressText(t("Processing files in chunks..."));
      
      // Define chunk size - similar to the iOS code
      const chunkSize = 48;
      
      if (fileReferenceInputs.length === 0) {
        // If no file references, just save the folder position
        enhancedLog("No file references to process, saving only folder position (no folder tags)");
        await AlbumService.saveFolderOnly(folderPositionInput, enhancedLog);
      } else {
        // Before chunking, remove any duplicates by fileId
        const uniqueFileReferences = removeDuplicateFileReferences(fileReferenceInputs);
        enhancedLog(`After removing duplicates, processing ${uniqueFileReferences.length} unique file references`);
        
        // Split file references into chunks
        const chunks = splitArrayIntoChunks(uniqueFileReferences, chunkSize);
        enhancedLog(`Split file references into ${chunks.length} chunks of max size ${chunkSize}`);
        
        // Process each chunk
        for (let i = 0; i < chunks.length; i++) {
          const chunk = chunks[i];
          enhancedLog(`Processing chunk ${i + 1} of ${chunks.length} with ${chunk.length} file references`);
          
          // Update progress
          const chunkProgress = (i / chunks.length) * 80; // 80% of progress bar for chunks
          setSavingProgress(10 + chunkProgress); // Start at 10%, end at 90%
          updateSaveProgress(10 + chunkProgress);
          
          if (i < chunks.length - 1) {
            // Process all chunks except the last one - just save file references
            updateSaveProgressText(t('Saving files: chunk {{chunkNumber}} of {{totalChunks}}...', { 
              chunkNumber: i + 1, 
              totalChunks: chunks.length 
            }));
            await AlbumService.saveFileReferences(chunk, enhancedLog);
          } else {
            // Process the last chunk with the folder position
            updateSaveProgressText(t("Finalizing album..."));
            await AlbumService.saveFinalChunkWithFolder(chunk, folderPositionInput, enhancedLog);
          }
        }
      }
      
      // Complete the save process
      setSavingProgress(100);
      updateSaveProgress(100);
      updateSaveProgressText(t("Album saved successfully!"));
      handleSuccessfulSave();
      
    } catch (error) {
      console.error("Error in chunked save process:", error);
      enhancedLog(`Error in chunked save process: ${error}`);
      updateSaveProgressText(t("Error: {{error}}", { error: String(error) }));
      setIsSavingAlbum(false);
    }
  };

  // Function to save album directly
  const saveAlbumDirectly = async () => {
    enhancedLog("Starting direct album save with individual photo tagging, existing file tagging, and original filenames");
    enhancedLog(`Photo tags map: ${photoTagsMap.size} photos have tags applied`);
    enhancedLog(`Existing file tags map: ${existingFileTagsMap.size} existing files have tags applied`);
    setIsSavingAlbum(true);
    setSavingProgress(5); // Start progress at 5%

    try {
      // Validate required data
      enhancedLog("Validating required data for save");
      if (!validateRequiredData()) {
        enhancedLog("Required data validation failed, aborting save");
        setIsSavingAlbum(false);
        return;
      }
      
      // Prepare folder and account IDs
      const now = Math.floor(Date.now() / 1000);
      const accountId = `${cognitoUsername}_____${cognitoUsername}____Account`;
      const folderParts = folderId!.split("_____");
      const folderTargetItemIdentifier = folderParts[1].split("____")[0];
      
      enhancedLog(`Save timestamp: ${now}`);
      enhancedLog(`Account ID: ${accountId}`);
      enhancedLog(`Folder ID: ${folderId}`);
      enhancedLog(`Folder target item identifier: ${folderTargetItemIdentifier}`);

      // Prepare file references - handle both new uploads and existing files
      enhancedLog("Creating folder position input (no folder tags)");
      const folderPositionInput = createFolderPositionInput(
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
      enhancedLog("Folder position input created:", folderPositionInput);
      
      let fileReferenceInputs: FileReferenceInput[] = [];
      
      // Process new uploads if any exist
      const validPhotos = selectedPhotos.filter(photo => photo.status === 'complete');
      enhancedLog(`Found ${validPhotos.length} valid photos with 'complete' status`);
      
      if (validPhotos.length > 0) {
        // Only move files from temp to public folder for new uploads (those without a fileId)
        const newUploads = validPhotos.filter(photo => !photo.fileId);
        enhancedLog(`Found ${newUploads.length} new uploads to move from temp to public folder`);
        
        if (newUploads.length > 0) {
          // Move files from temp to public folder for any new uploads
          enhancedLog("Moving files from temp to public folder");
          await moveFilesToPublic(
            newUploads, 
            updateSaveProgress,
            enhancedLog
          );
        }
        
        // Create file references for new uploads (apply individual photo tags and include filenames)
        enhancedLog("Creating file reference inputs for uploads with individual photo tags and original filenames");
        const newFileReferenceInputs = createFileReferenceInputs(
          validPhotos, 
          now, 
          accountId, 
          folderId!, 
          cognitoUsername!, 
          photoTagsMap, 
          enhancedLog
        );
        enhancedLog(`Created ${newFileReferenceInputs.length} file reference inputs for uploads`, newFileReferenceInputs);
        fileReferenceInputs = fileReferenceInputs.concat(newFileReferenceInputs);
      }
      
      // Add existing file references for files with tags applied
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
        enhancedLog(`Adding ${existingFileReferenceInputs.length} existing file references with tags and filenames`);
        fileReferenceInputs = fileReferenceInputs.concat(existingFileReferenceInputs);
      }
      
      // Add existing file references for sub-album files
      if (isSubAlbum && selectedFileIds.length > 0) {
        enhancedLog(`Adding ${selectedFileIds.length} existing file references for sub-album`);
        // Create file reference inputs from selectedFileIds
        const subAlbumFileReferenceInputs: FileReferenceInput[] = selectedFileIds.map((fileId) => {
          enhancedLog(`Creating file reference for existing sub-album file ID: ${fileId}`);
          
          // For sub-album files, we need to check if they have tags applied
          // Since selectedFileIds don't correspond to photo indices, we'll apply no tags for now
          // This could be enhanced later to support tagging existing files in sub-albums
          const emptyTags: any[] = [];
          
          // Extract filename for display name from fileId
          const parts = fileId.split('_____');
          const fileDisplayName = parts.length >= 2 ? parts[1].split('____')[0] : fileId;
          
          return {
            fileReferencesHolderId: folderId!,
            currentTime: now,
            points: 1,
            hasBeenDeleted: false,
            selectedTagInputs: emptyTags, // No tags for existing sub-album files for now
            fileId,
            fileDisplayName: fileDisplayName, // Include filename for sub-album files
            fileInput: null // No file input needed for existing files
          };
        });
        
        enhancedLog(`Created ${subAlbumFileReferenceInputs.length} file reference inputs for sub-album files`, subAlbumFileReferenceInputs);
        fileReferenceInputs = fileReferenceInputs.concat(subAlbumFileReferenceInputs);
      }
      
      enhancedLog(`Total file reference inputs: ${fileReferenceInputs.length}`);
      
      // Send GraphQL mutation with all file references using chunking approach
      enhancedLog("Sending GraphQL mutations with chunked file references (individual photo tags, existing file tags, and original filenames)");
      await saveWithChunking(folderPositionInput, fileReferenceInputs);
    } catch (err) {
      console.error("Error in saveAlbumDirectly:", err);
      enhancedLog(`Error in saveAlbumDirectly: ${err}`);
      setIsSavingAlbum(false);
    }
  };

  return {
    saveAlbumDirectly
  };
};