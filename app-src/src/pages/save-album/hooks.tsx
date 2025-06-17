import React, { useState, useEffect } from "react";
import { AWS_PRIVATE_GRAPHQL_ENDPOINT, LOCAL_STORAGE_KEYS } from "@/lib/config";
import { 
  ProgressTracker,
  SelectedPhoto,
  PasswordPolicyEnum,
  UploadStatus
} from "@/lib/types";
import { generateUUID, redirectTo } from "@/lib/utils";
import { checkLoginWithRefresh, createNanoIdFromUUID, getTargetItemIdentifier } from "@/lib/utils";
import { 
  moveFilesToPublic,
  clearAlbumData,
  s3
} from "@/lib/file-upload-utils";

// Enhanced interface for sub-album data
interface SubAlbumData {
  isSubAlbum: boolean;
  selectedFileIds: string[];
  selectedPhotos?: SelectedPhoto[];
}

// Additional types and interfaces for tag support
interface SelectedTagInput {
  TagType: string;
  tagTitle: string;
  selectedSubtagInputs: SelectedSubtagInput[];
}

interface SelectedSubtagInput {
  TagType: string;
  tagTitle: string;
  subtagTitle: string;
}

// Interface for file reference input (updated to include tags)
interface FileReferenceInput {
  fileReferencesHolderId: string;
  currentTime: number;
  points: number;
  hasBeenDeleted: boolean;
  selectedTagInputs: SelectedTagInput[];
  fileId: string;
  fileInput: any | null;
}

// GraphQL query for fetching folder details
const FETCH_FOLDER_QUERY = `
  query FetchFolders($folderIds: [String!]!, $fetchRelationsInput: FetchRelationsInput!) {
    fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
      items {
        ... on Tag {
          id
          createdAt
          updatedAt
          TagType
          tagTitle
          points
          subtags {
            items {
              id
              createdAt
              updatedAt
              TagType
              tagTitle
              subtagTitle
              points
            }
            nextToken
          }
        }
      }
      nextToken
    }
    fetchFolders(folderIds: $folderIds) {
      items {
        creatorId      
        folderName
        folderDescription
        folderPassword {
          password
          policy
        }
        fileReferencesPage {
          items {
            file {
              ownerContactId
              dataKey
              thumbnailDataKey
              durationInSeconds
            }
          }
        }
        contactsUsingInvite {
          items {
            id
            item {
              ... on Persona {
                publicDisplayName
              }
            }
          }
        }
        folderInviteParameters {
          usingFolderInviteGrantsRightToAddItems
          usingFolderInviteGrantsRightToRemoveItems
        }
        folderPosition {
          id
          profileIds
        }          
      }
    }
  }
`;

// Custom hook for managing album initialization
export const useAlbumInitialization = (
  setFolderId: React.Dispatch<React.SetStateAction<string | null>>,
  setSelectedPhotos: React.Dispatch<React.SetStateAction<SelectedPhoto[]>>,
  setIsCreator: React.Dispatch<React.SetStateAction<boolean | null>>,
  setShowFolderDetails: React.Dispatch<React.SetStateAction<boolean>>,
  setFolderName: React.Dispatch<React.SetStateAction<string>>,
  setFolderDescription: React.Dispatch<React.SetStateAction<string>>,
  setIsOnPublicProfile: React.Dispatch<React.SetStateAction<boolean>>,
  setParticipantsCanAddItems: React.Dispatch<React.SetStateAction<boolean>>,
  setPasswordProtectionOption: React.Dispatch<React.SetStateAction<PasswordPolicyEnum>>,
  setAlbumPassword: React.Dispatch<React.SetStateAction<string>>,
  setIsSubAlbum: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedFileIds: React.Dispatch<React.SetStateAction<string[]>>,
  setParticipantsCanDeleteItems: React.Dispatch<React.SetStateAction<boolean>>, // NEW: Add this parameter
  enhancedLog: (message: string, data?: any) => void
) => {
  const [cognitoUsername, setCognitoUsername] = useState<string | null>(null);
  const [publicUsername, setPublicUsername] = useState<string | null>(null);

  // Helper function for folder initialization
  const initializeFolderIdWithUsername = async (username: string) => {
    enhancedLog(`Initializing folder ID with username: ${username}`);
    try {
      // Get folderId from URL query parameter
      const params = new URLSearchParams(window.location.search);
      const id = params.get("folderId");
      enhancedLog(`Folder ID from URL: ${id || 'null'}`);
      
      if (id) {
        setFolderId(id);
        enhancedLog(`Using existing folder ID: ${id}`);
        
        // Since this is an existing album, fetch its details
        try {
          enhancedLog(`Fetching details for folder: ${id}`);
          const folderDetails = await fetchFolderDetails(id, enhancedLog);
          enhancedLog("Folder details retrieved:", folderDetails);
          
          if (folderDetails) {
            // Check if current user is the creator
            const accountId = `${username}_____${username}____Account`;
            const userIsCreator = folderDetails.creatorId === accountId;
            enhancedLog(`User is creator of folder: ${userIsCreator}, accountId: ${accountId}, creator: ${folderDetails.creatorId}`);
            setIsCreator(userIsCreator);
            
            // If user is creator, show folder details
            if (userIsCreator) {
              enhancedLog("User is creator, showing folder details");
              setShowFolderDetails(true);
              
              // Update album details in state
              setFolderName(folderDetails.folderName);
              setFolderDescription(folderDetails.folderDescription);
              
              // Set the public profile toggle state
              setIsOnPublicProfile(folderDetails.isOnPublicProfile);
              enhancedLog(`Setting isOnPublicProfile: ${folderDetails.isOnPublicProfile}`);
              
              // Set participants can add items toggle state based on folderDetails
              if (folderDetails.participantsCanAddItems !== undefined) {
                setParticipantsCanAddItems(folderDetails.participantsCanAddItems);
                enhancedLog(`Setting participantsCanAddItems: ${folderDetails.participantsCanAddItems}`);
              }
              
              // NEW: Set participants can delete items toggle state based on folderDetails
              if (folderDetails.participantsCanDeleteItems !== undefined) {
                setParticipantsCanDeleteItems(folderDetails.participantsCanDeleteItems);
                enhancedLog(`Setting participantsCanDeleteItems: ${folderDetails.participantsCanDeleteItems}`);
              }
              
              // Handle password policy with proper enum mapping
              const policy = folderDetails.passwordPolicy;
              enhancedLog(`Password policy from folder details: ${policy}`);
              
              // Map the PasswordPolicyEnum values to our local state options
              setPasswordProtectionOption(policy);
              if (policy !== 'NoPassword' && folderDetails.password) {
                setAlbumPassword(folderDetails.password);
              }
              enhancedLog(`Set password protection option to: ${policy}`);
            } else {
              // If not creator, still load the data but don't show editable fields
              enhancedLog("User is NOT the creator, hiding editable fields");
              setShowFolderDetails(false);
            }
          } else {
            // If we couldn't fetch folder details, set it is a new folder
            enhancedLog("No folder details retrieved, setting isCreator to true");
            setIsCreator(true);
            setShowFolderDetails(true);
          }
        } catch (fetchErr) {
          console.error("Error fetching folder details:", fetchErr);
          enhancedLog(`Error fetching folder details: ${fetchErr}`);
          // Set isCreator to false on error as a safety measure
          setIsCreator(false);
        }
      } else {
        // If no ID in URL, create a new one
        const newId = `${username}_____${generateUUID()}____Folder`;
        enhancedLog(`Creating new folder ID: ${newId}`);
        setFolderId(newId);
        
        // For new albums, user is automatically the creator
        enhancedLog("Setting isCreator to true for new album");
        setIsCreator(true);
        // Show folder details for new albums
        setShowFolderDetails(true);
      }
    } catch (err) {
      console.error("Folder ID initialization error:", err);
      enhancedLog(`Folder ID initialization error: ${err}`);
      // Set isCreator to false on error as a safety measure
      setIsCreator(false);
    }
  };

  const fetchFolderDetails = async (folderId: string, enhancedLog: (message: string, data?: any) => void) => {
    enhancedLog(`Fetching details for folder ID: ${folderId}`);
    try {
      const token = await checkLoginWithRefresh();
      if (!token) {
        enhancedLog("No token available for fetching folder details");
        return null;
      }
      
      enhancedLog("Sending GraphQL query to fetch folder details");
      const response = await fetch(AWS_PRIVATE_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          query: FETCH_FOLDER_QUERY,
          variables: { 
            folderIds: [folderId],
            fetchRelationsInput: {
              ownerItemId: "myAccountOwnerItemId",
              rangeKeyPrefix: "Tag____File",
              index: "ownerItemId_____RelationType____sortParameter",
              limit: 2000,
              scanIndexForward: false,
            }
          }
        })
      });
      
      const result = await response.json();
      enhancedLog("Folder details API response:", result);
      
      if (result.errors) {
        console.error("GraphQL errors:", result.errors);
        enhancedLog(`GraphQL errors: ${JSON.stringify(result.errors)}`);
        return null;
      }
      
      const items = result?.data?.fetchFolders?.items || [];
      enhancedLog(`Found ${items.length} folder items`);
      
      if (items.length === 0) {
        enhancedLog("No folder items found");
        return null;
      }
      
      const folder = items[0];
      enhancedLog("Retrieved folder data:", folder);
      
      // Check if this folder is on the public profile
      const isPublic = folder.folderPosition?.profileIds?.some(
        (profileId: string) => profileId.includes("Public____Profile")
      ) || false;
      
      enhancedLog(`Folder is on public profile: ${isPublic}`);
      enhancedLog("Profile IDs:", folder.folderPosition?.profileIds);
      
      // Extract participants can add items setting
      const canAddItems = folder.folderInviteParameters?.usingFolderInviteGrantsRightToAddItems;
      enhancedLog(`Participants can add items: ${canAddItems}`);
      
      // NEW: Extract participants can delete items setting
      const canDeleteItems = folder.folderInviteParameters?.usingFolderInviteGrantsRightToRemoveItems;
      enhancedLog(`Participants can delete items: ${canDeleteItems}`);
      
      return {
        creatorId: folder.creatorId || '',
        folderName: folder.folderName || '',
        folderDescription: folder.folderDescription || '',
        passwordPolicy: folder.folderPassword?.policy || 'NoPassword',
        password: folder.folderPassword?.password || '',
        isOnPublicProfile: isPublic,
        participantsCanAddItems: canAddItems !== undefined ? canAddItems : true,
        participantsCanDeleteItems: canDeleteItems !== undefined ? canDeleteItems : false // NEW: Add this field
      };
    } catch (error) {
      console.error("Error in fetchFolderDetails:", error);
      enhancedLog(`Error in fetchFolderDetails: ${error}`);
      return null;
    }
  };

  const restorePhotosFromStorage = () => {
    enhancedLog("Attempting to restore photos from localStorage");
    try {
      const storedPhotos = localStorage.getItem(LOCAL_STORAGE_KEYS.SELECTED_PHOTOS);
      enhancedLog(`Found stored photos: ${storedPhotos ? 'yes' : 'no'}`);
      
      if (storedPhotos) {
        try {
          const parsedPhotos = JSON.parse(storedPhotos) as SelectedPhoto[];
          enhancedLog(`Parsed ${parsedPhotos.length} photos from localStorage`);
          
          if (Array.isArray(parsedPhotos) && parsedPhotos.length > 0) {
            setSelectedPhotos(parsedPhotos);
            enhancedLog(`Restored ${parsedPhotos.length} photos to state`);
          }
        } catch (parseErr) {
          console.error("Error parsing stored photos:", parseErr);
          enhancedLog(`Error parsing stored photos: ${parseErr}`);
        }
      }
    } catch (storageErr) {
      console.error("Error restoring photos from storage:", storageErr);
      enhancedLog(`Error restoring photos from storage: ${storageErr}`);
    }
  };

  const testS3Connection = () => {
    enhancedLog("Testing S3 connection");
    try {
      if (!s3) {
        console.error("S3 client not available");
        enhancedLog("S3 client not available");
      } else {
        enhancedLog("S3 client is available");
      }
    } catch (s3Err) {
      console.error("S3 connection test error:", s3Err);
      enhancedLog(`S3 connection test error: ${s3Err}`);
    }
  };

  const initializeComponent = async () => {
    enhancedLog("Starting component initialization");
    
    try {
      enhancedLog("Checking login with refresh");
      const token = await checkLoginWithRefresh();
      if (!token) {
        enhancedLog("No token returned from login check, aborting initialization");
        return;
      }
      
      // Extract username directly here instead of in a separate function
      try {
        // Get public username
        const savedUsername = localStorage.getItem(LOCAL_STORAGE_KEYS.PUBLIC_USERNAME);
        enhancedLog(`Retrieved public username from localStorage: ${savedUsername || 'null'}`);
        setPublicUsername(savedUsername || null);
        
        // Extract Cognito username directly from token
        const payload = JSON.parse(atob(token.split('.')[1]));
        const username = payload["cognito:username"];
        
        if (username) {
          enhancedLog(`Extracted Cognito username from token: ${username}`);
          // Set the username in state
          setCognitoUsername(username);
          
          // Check for sub-album data in localStorage
          const subAlbumDataStr = localStorage.getItem(LOCAL_STORAGE_KEYS.SUB_ALBUM_DATA);
          enhancedLog(`Sub-album data from localStorage: ${subAlbumDataStr || 'null'}`);
          
          if (subAlbumDataStr) {
            try {
              const subAlbumData = JSON.parse(subAlbumDataStr) as SubAlbumData;
              enhancedLog("Parsed sub-album data:", subAlbumData);
              
              if (subAlbumData.isSubAlbum && subAlbumData.selectedFileIds?.length > 0) {
                enhancedLog(`Valid sub-album data found with ${subAlbumData.selectedFileIds.length} files`);
                setIsSubAlbum(true);
                setSelectedFileIds(subAlbumData.selectedFileIds);
                
                // If we have selectedPhotos in the sub-album data, use them
                if (subAlbumData.selectedPhotos && subAlbumData.selectedPhotos.length > 0) {
                  enhancedLog(`Found ${subAlbumData.selectedPhotos.length} selected photos in sub-album data`);
                  setSelectedPhotos(subAlbumData.selectedPhotos);
                }
                
                // For sub-albums, always show folder details
                setShowFolderDetails(true);
                // User is automatically the creator for new sub-albums
                setIsCreator(true);
                // Create a new folder ID
                const newId = `${username}_____${generateUUID()}____Folder`;
                enhancedLog(`Generated new folder ID for sub-album: ${newId}`);
                setFolderId(newId);
              } else {
                // If we have any issues with the sub-album data, proceed with normal initialization
                enhancedLog("Invalid sub-album data, proceeding with normal initialization");
                await initializeFolderIdWithUsername(username);
              }
            } catch (e) {
              console.error("Error parsing sub-album data:", e);
              enhancedLog(`Error parsing sub-album data: ${e}`);
              await initializeFolderIdWithUsername(username);
            }
          } else {
            // No sub-album data, proceed with normal folder initialization
            enhancedLog("No sub-album data found, proceeding with normal folder initialization");
            await initializeFolderIdWithUsername(username);
          }
        } else {
          enhancedLog("No Cognito username found in token");
        }
      } catch (err) {
        console.error("User data initialization error:", err);
        enhancedLog(`User data initialization error: ${err}`);
      }
      
      restorePhotosFromStorage();
      testS3Connection();
      enhancedLog("Component initialization completed");
    } catch (initErr) {
      console.error("Initialization error:", initErr);
      enhancedLog(`Initialization error: ${initErr}`);
    }
  };

  useEffect(() => {
    initializeComponent();
  }, []);

  return {
    cognitoUsername,
    publicUsername,
    setPublicUsername
  };
};

// Custom hook for saving album (updated to apply tags to individual files)
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
  participantsCanDeleteItems: boolean, // NEW: Add this parameter
  passwordProtectionOption: PasswordPolicyEnum,
  albumPassword: string,
  // NEW: Map of photo indices to their tags
  photoTagsMap: Map<number, { tagTitle: string; TagType: string; subtags: { tagTitle: string; subtagTitle: string; }[] }[]>,
  setIsSavingAlbum: React.Dispatch<React.SetStateAction<boolean>>,
  setSavingProgress: React.Dispatch<React.SetStateAction<number>>,
  setSelectedPhotos: React.Dispatch<React.SetStateAction<SelectedPhoto[]>>,
  setProgressTracker: React.Dispatch<React.SetStateAction<ProgressTracker>>,
  enhancedLog: (message: string, data?: any) => void
) => {
  
  // Convert selected tags to the format expected by the API
  const convertTagsToApiFormat = (tags: typeof photoTagsMap extends Map<any, infer T> ? T : never): SelectedTagInput[] => {
    enhancedLog(`Converting ${tags.length} tags to API format`);
    
    return tags.map(tag => ({
      TagType: tag.TagType,
      tagTitle: tag.tagTitle,
      selectedSubtagInputs: tag.subtags.map(subtag => ({
        TagType: tag.TagType,
        tagTitle: subtag.tagTitle,
        subtagTitle: subtag.subtagTitle
      }))
    }));
  };

  // Helper function to update progress text
  const updateSaveProgressText = (text: string) => {
    enhancedLog(`Save progress text: ${text}`);
    const saveProgressText = document.getElementById('saveProgressText');
    if (saveProgressText) {
      saveProgressText.innerText = text;
    }
  };

  // Helper function to update progress UI
  const updateSaveProgress = (progress: number) => {
    // Update progress in UI
    const progressBar = document.getElementById('saveProgress');
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
      enhancedLog(`Updated save progress bar: ${progress}%`);
    } else {
      enhancedLog("Progress bar element not found");
    }
    setSavingProgress(progress);
  };

  // Helper function to split array into chunks of specified size
  const splitArrayIntoChunks = <T,>(array: T[], chunkSize: number): T[][] => {
    enhancedLog(`Splitting array of ${array.length} items into chunks of ${chunkSize}`);
    const result: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    enhancedLog(`Created ${result.length} chunks`);
    return result;
  };

  // Helper function to remove duplicate file references
  const removeDuplicateFileReferences = (fileReferences: FileReferenceInput[]): FileReferenceInput[] => {
    const uniqueFileIds = new Set<string>();
    return fileReferences.filter(ref => {
      if (uniqueFileIds.has(ref.fileId)) {
        enhancedLog(`Skipping duplicate file reference with ID: ${ref.fileId}`);
        return false;
      }
      uniqueFileIds.add(ref.fileId);
      return true;
    });
  };

  // Create folder position input (UPDATED: removed folder-level tagging)
  const createFolderPositionInput = (
    timestamp: number, 
    accountId: string, 
    folderTargetItemIdentifier: string
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
    enhancedLog(`Participants can delete items: ${participantsCanDeleteItems}`); // NEW: Add this log
    
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
      // REMOVED: folderPositionSelectedTagInputs - no longer tagging at folder level
      folderPositionPoints: 1,
      acceptedFileReferenceIds,
      folderInput: {
        // REMOVED: folderSelectedTagInputs - no longer tagging at folder level
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

  // Create file reference inputs (UPDATED: apply tags to individual photos based on selection)
  const createFileReferenceInputs = (
    validPhotos: SelectedPhoto[], 
    timestamp: number, 
    accountId: string
  ) => {
    enhancedLog(`Creating file reference inputs with individual photo tags for ${validPhotos.length} photos`);
    
    return validPhotos.map((photo, photoIndex) => {
      // Get the tags for this specific photo (if it was selected for tagging)
      const photoTags = photoTagsMap.get(photoIndex) || [];
      const photoTagsForApi = convertTagsToApiFormat(photoTags);
      
      enhancedLog(`Photo ${photoIndex} (${photo.fileName}): ${photoTags.length} tags applied`);
      
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

  // Mutation for saving only folder position (UPDATED: no folder tags)
  const sendFolderOnlyMutation = async (folderPositionInput: any) => {
    enhancedLog("Sending folder-only mutation (no file references, no folder tags)");
    
    const token = await checkLoginWithRefresh();
    if (!token) {
      enhancedLog("No token available for saving album, aborting");
      throw new Error("Authentication token not available");
    }
    
    const mutation = `
      mutation MyMutation($folderPositionInputs: [FolderPositionInput!]) {
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items {
            id
          }
        }
      }
    `;

    const variables = {
      folderPositionInputs: [folderPositionInput]
    };

    enhancedLog("GraphQL folder-only mutation variables:", variables);

    try {
      enhancedLog("Sending API request to save folder");
      const response = await fetch(AWS_PRIVATE_GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: mutation, variables }),
      });
      
      enhancedLog(`API response status: ${response.status}`);
      
      const responseText = await response.text();
      enhancedLog(`API response raw text: ${responseText}`);
      
      const json = JSON.parse(responseText);
      enhancedLog("API response JSON:", json);

      if (json.errors) {
        console.error("Folder save failed:", json.errors);
        enhancedLog(`Folder save failed with errors:`, json.errors);
        throw new Error("Failed to save folder");
      }
      
      enhancedLog("Folder saved successfully");
      return json.data?.changeFiles?.items || [];
    } catch (error) {
      console.error("Error in sendFolderOnlyMutation:", error);
      enhancedLog(`Error in sendFolderOnlyMutation: ${error}`);
      throw error;
    }
  };

  // Mutation for saving file references only (UPDATED: with individual photo tags)
  const sendFileReferencesOnlyMutation = async (fileReferenceInputs: FileReferenceInput[]) => {
    enhancedLog(`Sending file references-only mutation with ${fileReferenceInputs.length} items (each with individual tags)`);
    
    const token = await checkLoginWithRefresh();
    if (!token) {
      enhancedLog("No token available for saving file references, aborting");
      throw new Error("Authentication token not available");
    }
    
    const mutation = `
      mutation MyMutation($updatedFileReferenceInputs: [UpdatedFileReferenceInput!]) {
        changeFiles0(updatedFileReferenceInputs: $updatedFileReferenceInputs) {
          items {
            ... on FileReference {
              id
              createdAt
              updatedAt
              fileId
              file {
                dataKey
                thumbnailDataKey
              }
            }
          }
        }
      }
    `;

    const variables = {
      updatedFileReferenceInputs: fileReferenceInputs
    };

    enhancedLog("GraphQL file references-only mutation variables (first item):", 
      fileReferenceInputs.length > 0 ? fileReferenceInputs[0] : "No items");

    try {
      enhancedLog("Sending API request to save file references with individual tags");
      const response = await fetch(AWS_PRIVATE_GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: mutation, variables }),
      });
      
      enhancedLog(`API response status: ${response.status}`);
      
      const responseText = await response.text();
      enhancedLog(`API response raw text: ${responseText.substring(0, 500)}...`); // Log first 500 chars to avoid huge logs
      
      const json = JSON.parse(responseText);
      enhancedLog("API response JSON items count:", json.data?.changeFiles0?.items?.length || 0);

      if (json.errors) {
        console.error("File references save failed:", json.errors);
        enhancedLog(`File references save failed with errors:`, json.errors);
        throw new Error("Failed to save file references");
      }
      
      enhancedLog("File references chunk saved successfully with individual photo tags");
      return json.data?.changeFiles0?.items || [];
    } catch (error) {
      console.error("Error in sendFileReferencesOnlyMutation:", error);
      enhancedLog(`Error in sendFileReferencesOnlyMutation: ${error}`);
      throw error;
    }
  };

  // Mutation for saving the final chunk with folder position (UPDATED: no folder tags)
  const sendFinalChunkWithFolderMutation = async (fileReferenceInputs: FileReferenceInput[], folderPositionInput: any) => {
    enhancedLog(`Sending final chunk with folder mutation (${fileReferenceInputs.length} file references, no folder tags)`);
    
    const token = await checkLoginWithRefresh();
    if (!token) {
      enhancedLog("No token available for saving final chunk, aborting");
      throw new Error("Authentication token not available");
    }
    
    const mutation = `
      mutation MyMutation(
        $folderPositionInputs: [FolderPositionInput!],
        $updatedFileReferenceInputs: [UpdatedFileReferenceInput!]
      ) {
        changeFiles0(updatedFileReferenceInputs: $updatedFileReferenceInputs) {
          items {
            ... on FileReference { id createdAt updatedAt fileId file { dataKey thumbnailDataKey } }
          }
        }
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items { id }
        }
      }
    `;

    const variables = {
      folderPositionInputs: [folderPositionInput],
      updatedFileReferenceInputs: fileReferenceInputs,
    };

    enhancedLog("GraphQL final mutation variables (folder + last chunk, no folder tags)");

    try {
      enhancedLog("Sending API request for final save with folder (no folder tags)");
      const response = await fetch(AWS_PRIVATE_GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: mutation, variables }),
      });
      
      enhancedLog(`API response status: ${response.status}`);
      
      const responseText = await response.text();
      enhancedLog(`API response raw text: ${responseText.substring(0, 500)}...`); // First 500 chars
      
      const json = JSON.parse(responseText);
      enhancedLog("API response JSON:", {
        fileReferencesCount: json.data?.changeFiles0?.items?.length || 0,
        folderItems: json.data?.changeFiles?.items || []
      });

      if (json.errors) {
        console.error("Final save failed:", json.errors);
        enhancedLog(`Final save failed with errors:`, json.errors);
        throw new Error("Failed to complete album save");
      }
      
      enhancedLog("Final chunk and folder saved successfully (with individual photo tags)");
      return {
        fileReferences: json.data?.changeFiles0?.items || [],
        folderPositions: json.data?.changeFiles?.items || []
      };
    } catch (error) {
      console.error("Error in sendFinalChunkWithFolderMutation:", error);
      enhancedLog(`Error in sendFinalChunkWithFolderMutation: ${error}`);
      throw error;
    }
  };

  // Function to validate required data
  const validateRequiredData = async () => {
    enhancedLog("Validating required data");
    const token = await checkLoginWithRefresh();
    
    if (!token) {
      enhancedLog("No token available, validation failed");
      return false;
    }
    
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
    
    const saveSuccessText = document.getElementById('saveProgressText');
    if (saveSuccessText) {
      saveSuccessText.innerText = 'Album saved successfully!';
      enhancedLog("Updated progress text to 'Album saved successfully!'");
    }
    
    // Set a flag in sessionStorage that we just completed an album
    sessionStorage.setItem('album_just_saved', 'true');
    enhancedLog("Set 'album_just_saved' flag in sessionStorage");
    
    // Slight delay before redirect for user to see success message
    enhancedLog("Setting timeout for redirect to my-albums.html");
    setTimeout(() => {
      enhancedLog("Redirecting to my-albums.html");
      redirectTo("my-albums.html");
    }, 1000);
  };

  // Main save with chunking function (UPDATED: no folder tags)
  const saveWithChunking = async (folderPositionInput: any, fileReferenceInputs: FileReferenceInput[]) => {
    enhancedLog("Starting chunked save process (individual photo tags, no folder tags)");
    try {
      updateSaveProgressText("Processing files in chunks...");
      
      // Define chunk size - similar to the iOS code
      const chunkSize = 48;
      
      if (fileReferenceInputs.length === 0) {
        // If no file references, just save the folder position
        enhancedLog("No file references to process, saving only folder position (no folder tags)");
        await sendFolderOnlyMutation(folderPositionInput);
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
            updateSaveProgressText(`Saving files: chunk ${i + 1} of ${chunks.length}...`);
            await sendFileReferencesOnlyMutation(chunk);
          } else {
            // Process the last chunk with the folder position
            updateSaveProgressText("Finalizing album...");
            await sendFinalChunkWithFolderMutation(chunk, folderPositionInput);
          }
        }
      }
      
      // Complete the save process
      setSavingProgress(100);
      updateSaveProgress(100);
      updateSaveProgressText("Album saved successfully!");
      handleSuccessfulSave();
      
    } catch (error) {
      console.error("Error in chunked save process:", error);
      enhancedLog(`Error in chunked save process: ${error}`);
      updateSaveProgressText(`Error: ${error}`);
      setIsSavingAlbum(false);
    }
  };

  // Function to save album directly (UPDATED: use individual photo tags instead of folder tags)
  const saveAlbumDirectly = async () => {
    enhancedLog("Starting direct album save with individual photo tagging");
    enhancedLog(`Photo tags map: ${photoTagsMap.size} photos have tags applied`);
    setIsSavingAlbum(true);
    setSavingProgress(5); // Start progress at 5%

    try {
      // Validate required data
      enhancedLog("Validating required data for save");
      if (!await validateRequiredData()) {
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
      const folderPositionInput = createFolderPositionInput(now, accountId, folderTargetItemIdentifier);
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
        
        // Create file references for new uploads (apply individual photo tags)
        enhancedLog("Creating file reference inputs for uploads with individual photo tags");
        const newFileReferenceInputs = createFileReferenceInputs(validPhotos, now, accountId);
        enhancedLog(`Created ${newFileReferenceInputs.length} file reference inputs for uploads`, newFileReferenceInputs);
        fileReferenceInputs = fileReferenceInputs.concat(newFileReferenceInputs);
      }
      
      // Add existing file references for sub-album files
      if (isSubAlbum && selectedFileIds.length > 0) {
        enhancedLog(`Adding ${selectedFileIds.length} existing file references for sub-album`);
        // Create file reference inputs from selectedFileIds
        const existingFileReferenceInputs: FileReferenceInput[] = selectedFileIds.map((fileId) => {
          enhancedLog(`Creating file reference for existing file ID: ${fileId}`);
          
          // For sub-album files, we need to check if they have tags applied
          // Since selectedFileIds don't correspond to photo indices, we'll apply no tags for now
          // This could be enhanced later to support tagging existing files in sub-albums
          const emptyTags: SelectedTagInput[] = [];
          
          return {
            fileReferencesHolderId: folderId!,
            currentTime: now,
            points: 1,
            hasBeenDeleted: false,
            selectedTagInputs: emptyTags, // No tags for existing sub-album files for now
            fileId,
            fileInput: null // No file input needed for existing files
          };
        });
        
        enhancedLog(`Created ${existingFileReferenceInputs.length} file reference inputs for existing files`, existingFileReferenceInputs);
        fileReferenceInputs = fileReferenceInputs.concat(existingFileReferenceInputs);
      }
      
      enhancedLog(`Total file reference inputs: ${fileReferenceInputs.length}`);
      
      // Send GraphQL mutation with all file references using chunking approach
      enhancedLog("Sending GraphQL mutations with chunked file references (individual photo tags)");
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

// Utility function for creating initial photo objects
export const createInitialPhotoObjects = (files: File[]): SelectedPhoto[] => {
  return files.map(file => {
    const type: string = file.type;
    const fileExt = file.name.split('.').pop() || "jpg";
    const uuidFileName = `${generateUUID()}.${fileExt}`;
    
    return {
      fileName: uuidFileName,
      s3PreviewUrl: URL.createObjectURL(file), // Use local object URL initially
      type,
      size: file.size,
      status: 'pending' as UploadStatus,
      progress: 0
    } as SelectedPhoto;
  });
};

// Utility function to update photos with processed info
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