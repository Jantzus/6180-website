// album.utils.ts - Pure utility functions for album functionality
import { SelectedPhoto, UploadStatus } from "@/lib/types";
import { generateUUID, getTargetItemIdentifier } from "@/lib/utils";
import { createNanoIdFromUUID } from "@/lib/utils";
import { AppliedTag, SelectedTagInput, FileReferenceInput } from "../types/album-types";

/**
 * Create initial photo objects from files
 */
export const createInitialPhotoObjects = (files: File[]): SelectedPhoto[] => {
  return files.map(file => {
    const type: string = file.type;
    const fileExt = file.name.split('.').pop() || "jpg";
    const uuidFileName = `${generateUUID()}.${fileExt}`;
    
    return {
      fileName: uuidFileName,
      originalFileName: file.name, // Store original filename
      s3PreviewUrl: URL.createObjectURL(file), // Use local object URL initially
      type,
      size: file.size,
      status: 'pending' as UploadStatus,
      progress: 0
    } as SelectedPhoto;
  });
};

/**
 * Update photos with processed info
 */
export const updatePhotosWithProcessedInfo = (
  startIndex: number, 
  processedPhotos: SelectedPhoto[],
  setSelectedPhotos: React.Dispatch<React.SetStateAction<SelectedPhoto[]>>,
  enhancedLog: (message: string, data?: any) => void
) => {
  enhancedLog(`Updating photos with processed info, starting at index ${startIndex}`);
  setSelectedPhotos(prev => {
    const updated = [...prev];
    
    // Update each processed photo
    processedPhotos.forEach((processedPhoto, i) => {
      const index = startIndex + i;
      if (index < updated.length) {
        enhancedLog(`Updating photo at index ${index} with processed info`);
        updated[index] = processedPhoto;
      }
    });
    
    return updated;
  });
};

/**
 * Convert applied tags to the format expected by the API
 */
export const convertTagsToApiFormat = (tags: AppliedTag[]): SelectedTagInput[] => {
  return tags.map(tag => ({
    TagType: tag.TagType,
    tagTitle: tag.tagTitle,
    subtags: tag.subtags.map(subtag => ({
      TagType: tag.TagType,
      tagTitle: subtag.tagTitle,
      subtagTitle: subtag.subtagTitle
    }))
  }));
};

/**
 * Remove duplicate file references by fileId
 */
export const removeDuplicateFileReferences = (fileReferences: FileReferenceInput[]): FileReferenceInput[] => {
  const uniqueFileIds = new Set<string>();
  return fileReferences.filter(ref => {
    if (uniqueFileIds.has(ref.fileId)) {
      return false;
    }
    uniqueFileIds.add(ref.fileId);
    return true;
  });
};

/**
 * Split array into chunks of specified size
 */
export const splitArrayIntoChunks = <T,>(array: T[], chunkSize: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

/**
 * Create folder position input
 */
export const createFolderPositionInput = (
  timestamp: number,
  accountId: string,
  folderTargetItemIdentifier: string,
  folderId: string,
  cognitoUsername: string,
  isOnPublicProfile: boolean,
  participantsCanAddItems: boolean,
  participantsCanDeleteItems: boolean,
  passwordProtectionOption: string,
  albumPassword: string,
  folderName: string,
  folderDescription: string,
  isSubAlbum: boolean,
  selectedFileIds: string[],
  enhancedLog: (message: string, data?: any) => void
) => {
  enhancedLog("Creating folder position input WITHOUT folder-level tags");
  enhancedLog(`Profile visibility: ${isOnPublicProfile ? 'Public' : 'Only Me'}`);
  
  // Use the correct profileIds based on the toggle state
  const profileIds = isOnPublicProfile 
    ? [`${cognitoUsername}_____Public____Profile`] 
    : ["Only Me_____Only Me____Profile"];
    
  enhancedLog(`Profile IDs: ${JSON.stringify(profileIds)}`);
    
  // Create acceptedFileReferenceIds based on whether it's a sub-album or not
  let acceptedFileReferenceIds: string[] = [];
  
  if (isSubAlbum && selectedFileIds.length > 0) {
    enhancedLog(`Creating file reference IDs for ${selectedFileIds.length} sub-album files`);
    // For sub-albums, create file reference IDs by extracting the fileName from fileId
    acceptedFileReferenceIds = selectedFileIds.map(fileId => {
      // Extract fileName from fileId
      // fileId format: "{accountOwnerItemId}_____{fileName}____File"
      const parts = fileId.split('_____');
      if (parts.length >= 2) {
        const fileNameWithSuffix = parts[1]; // This will include "____File" at the end
        const fileName = fileNameWithSuffix.split('____')[0]; // Get just the fileName part
        
        // Create a new file reference ID with the current target identifier
        const refId = `${folderTargetItemIdentifier}_____${fileName}____FileReference`;
        enhancedLog(`Created file reference ID for sub-album: ${refId}`);
        return refId;
      }
      enhancedLog(`Using original fileId as fallback: ${fileId}`);
      return fileId; // Fallback to original fileId if parsing fails
    });
  }
  
  enhancedLog(`Created ${acceptedFileReferenceIds.length} acceptedFileReferenceIds`);
  
  const folderPassword = passwordProtectionOption !== 'NoPassword' ? albumPassword : null;
  
  enhancedLog(`Password protection: ${passwordProtectionOption}`);
  enhancedLog(`Album password: ${folderPassword ? '******' : 'null'}`);
  enhancedLog(`Participants can add items: ${participantsCanAddItems}`);
  enhancedLog(`Participants can delete items: ${participantsCanDeleteItems}`);
  
  if (!folderId) {
    enhancedLog("Error: folderId is null or undefined");
    throw new Error("folderId is required to create folder position input");
  }
  
  const targetItemIdentifier = getTargetItemIdentifier(folderId)
  const nanoId = createNanoIdFromUUID(targetItemIdentifier)

  return {
    currentTime: timestamp,
    folderId,
    profileIds,
    folderPositionPoints: 1,
    acceptedFileReferenceIds,
    folderInput: {
      folderAboutContactIds: [accountId],
      albumNanoId: nanoId,
      folderName: folderName,
      folderDescription: folderDescription,
      folderPasswordInput: {
        password: folderPassword,
        policy: passwordProtectionOption
      },
      folderInviteParametersInput: {
        folderIsOnlyVisibleThroughCode: true,
        folderInviteHasBeenDisabled: false,
        tagContactIdUsingFolderInviteAsFolderAboutContact: true,
        usingFolderInviteGrantsRightToAddItems: participantsCanAddItems,
        usingFolderInviteGrantsRightToRemoveItems: participantsCanDeleteItems,
        addedItemsNeedFolderCreatorApproval: false
      }
    }
  };
};

/**
 * Create file reference inputs for new uploads
 */
export const createFileReferenceInputs = (
  validPhotos: SelectedPhoto[], 
  timestamp: number, 
  accountId: string,
  folderId: string,
  cognitoUsername: string,
  photoTagsMap: Map<number, AppliedTag[]>,
  enhancedLog: (message: string, data?: any) => void
): FileReferenceInput[] => {
  enhancedLog(`Creating file reference inputs with individual photo tags and original filenames for ${validPhotos.length} photos`);
  
  return validPhotos.map((photo, photoIndex) => {
    // Get the tags for this specific photo (if it was selected for tagging)
    const photoTags = photoTagsMap.get(photoIndex) || [];
    const photoTagsForApi = convertTagsToApiFormat(photoTags);
    
    // Use original filename as fileDisplayName
    const fileDisplayName = photo.originalFileName || photo.fileName;
    
    enhancedLog(`Photo ${photoIndex} (${photo.fileName}): ${photoTags.length} tags applied, display name: ${fileDisplayName}`);
    
    // If the photo already has a fileId (from a sub-album), use that directly
    if (photo.fileId) {
      enhancedLog(`Using existing fileId for photo: ${photo.fileId}`);
      return {
        fileReferencesHolderId: folderId!,
        currentTime: timestamp,
        points: 1,
        hasBeenDeleted: false,
        selectedTagInputs: photoTagsForApi, // Apply tags specific to this photo
        fileId: photo.fileId,
        fileDisplayName: fileDisplayName, // Include original filename
        fileInput: null // No file input needed for existing files
      };
    }
    
    // Otherwise, create a new file reference for uploaded files
    const dataKey = photo.type === "video" || photo.type?.startsWith("video")
      ? `Input/Video/${photo.fileName}`
      : `Input/Image/${photo.fileName}`;

    const fileId = `${cognitoUsername}_____${photo.fileName}____File`;
    
    enhancedLog(`Created file reference for ${photo.fileName}:`);
    enhancedLog(`  - dataKey: ${dataKey}`);
    enhancedLog(`  - fileId: ${fileId}`);
    enhancedLog(`  - fileDisplayName: ${fileDisplayName}`);
    enhancedLog(`  - thumbnailDataKey: ${photo.thumbnailDataKey || 'undefined'}`);
    enhancedLog(`  - size: ${photo.size}`);
    enhancedLog(`  - thumbnailSize: ${photo.thumbnailSize || 0}`);
    enhancedLog(`  - duration: ${photo.duration || 'undefined'}`);
    enhancedLog(`  - tags: ${photoTags.length} tags selected for this photo`);

    return {
      fileReferencesHolderId: folderId!,
      currentTime: timestamp,
      points: 1,
      hasBeenDeleted: false,
      selectedTagInputs: photoTagsForApi, // Apply tags specific to this photo
      fileId,
      fileDisplayName: fileDisplayName, // Include original filename
      fileInput: {
        fileId,
        ownerFileInput: {
          editorContactIds: [accountId],
          FileSharingOptionsEnum: "Anyone",
          dataKey,
          thumbnailDataKey: photo.thumbnailDataKey,
          dataInBytes: photo.size!,
          thumbnailDataInBytes: photo.thumbnailSize || 0,
          s3UploadedAt: timestamp,
          durationInSeconds: photo.duration
        },
        editorFileInput: {
          aboutContactIds: [accountId],
          captionText: "",
          numericFilterInputs: [],
        }
      }
    };
  });
};

/**
 * Create file reference inputs for existing files with tags
 */
export const createExistingFileReferenceInputs = (
  timestamp: number,
  folderId: string,
  cognitoUsername: string,
  existingFiles: any[],
  selectedExistingIndices: Set<number>,
  existingFileTagsMap: Map<number, AppliedTag[]>,
  enhancedLog: (message: string, data?: any) => void
): FileReferenceInput[] => {
  const existingFileReferences: FileReferenceInput[] = [];
  
  // Process existing files that have tags applied
  selectedExistingIndices.forEach((index) => {
    const tags = existingFileTagsMap.get(index) || [];
    if (tags.length > 0) {
      // Only create file references for selected existing files that have tags applied
      const existingFile = existingFiles[index];
      if (existingFile) {
        // Extract filename from dataKey for fileId generation
        // DataKey format is typically like "Input/Image/filename.jpg" or similar
        const dataKeyParts = existingFile.dataKey.split('/');
        const fileName = dataKeyParts[dataKeyParts.length - 1];
        
        // Generate fileId in the expected format
        const fileId = `${cognitoUsername}_____${fileName}____File`;
        
        // Use existing fileDisplayName if available, otherwise use extracted filename
        const fileDisplayName = existingFile.fileName || fileName;
        
        const tagsForApi = convertTagsToApiFormat(tags);
        
        enhancedLog(`Creating file reference for existing file ${index} (${fileName}) with ${tags.length} tags, display name: ${fileDisplayName}`);
        
        existingFileReferences.push({
          fileReferencesHolderId: folderId!,
          currentTime: timestamp,
          points: 1,
          hasBeenDeleted: false,
          selectedTagInputs: tagsForApi,
          fileId,
          fileDisplayName: fileDisplayName, // Include original filename
          fileInput: null // No file input needed for existing files - they already exist
        });
      }
    }
  });
  
  enhancedLog(`Created ${existingFileReferences.length} file references for existing files with tags and filenames`);
  return existingFileReferences;
};