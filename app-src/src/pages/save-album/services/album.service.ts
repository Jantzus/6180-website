// album.service.ts - API interaction logic for album functionality
import { AWS_PRIVATE_GRAPHQL_ENDPOINT } from "@/lib/config";
import { checkLoginWithRefresh } from "@/lib/utils";
import { 
  FETCH_FOLDER_QUERY, 
  SAVE_FOLDER_MUTATION, 
  SAVE_FILE_REFERENCES_MUTATION, 
  SAVE_FINAL_CHUNK_WITH_FOLDER_MUTATION,
  DELETE_FILE_REFERENCES_MUTATION
} from "../graphql/album-queries";
import { FileReferenceInput } from "../types/album-types";

export class AlbumService {
  /**
   * Fetch folder details from the API
   */
  static async fetchFolderDetails(folderId: string, enhancedLog: (message: string, data?: any) => void) {
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
      
      // Extract participants can delete items setting
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
        participantsCanDeleteItems: canDeleteItems !== undefined ? canDeleteItems : false
      };
    } catch (error) {
      console.error("Error in fetchFolderDetails:", error);
      enhancedLog(`Error in fetchFolderDetails: ${error}`);
      return null;
    }
  }

  /**
   * Save folder only (no file references)
   */
  static async saveFolderOnly(folderPositionInput: any, enhancedLog: (message: string, data?: any) => void) {
    enhancedLog("Sending folder-only mutation (no file references, no folder tags)");
    
    const token = await checkLoginWithRefresh();
    if (!token) {
      enhancedLog("No token available for saving album, aborting");
      throw new Error("Authentication token not available");
    }

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
        body: JSON.stringify({ query: SAVE_FOLDER_MUTATION, variables }),
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
      console.error("Error in saveFolderOnly:", error);
      enhancedLog(`Error in saveFolderOnly: ${error}`);
      throw error;
    }
  }

  /**
   * Save file references only
   */
  static async saveFileReferences(fileReferenceInputs: FileReferenceInput[], enhancedLog: (message: string, data?: any) => void) {
    enhancedLog(`Sending file references-only mutation with ${fileReferenceInputs.length} items (each with individual tags and filenames)`);
    
    const token = await checkLoginWithRefresh();
    if (!token) {
      enhancedLog("No token available for saving file references, aborting");
      throw new Error("Authentication token not available");
    }

    const variables = {
      updatedFileReferenceInputs: fileReferenceInputs
    };

    enhancedLog("GraphQL file references-only mutation variables (first item):", 
      fileReferenceInputs.length > 0 ? fileReferenceInputs[0] : "No items");

    try {
      enhancedLog("Sending API request to save file references with individual tags and filenames");
      const response = await fetch(AWS_PRIVATE_GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: SAVE_FILE_REFERENCES_MUTATION, variables }),
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
      
      enhancedLog("File references chunk saved successfully with individual photo tags and filenames");
      return json.data?.changeFiles0?.items || [];
    } catch (error) {
      console.error("Error in saveFileReferences:", error);
      enhancedLog(`Error in saveFileReferences: ${error}`);
      throw error;
    }
  }

  /**
   * Save final chunk with folder position
   */
  static async saveFinalChunkWithFolder(
    fileReferenceInputs: FileReferenceInput[], 
    folderPositionInput: any, 
    enhancedLog: (message: string, data?: any) => void
  ) {
    enhancedLog(`Sending final chunk with folder mutation (${fileReferenceInputs.length} file references with filenames, no folder tags)`);
    
    const token = await checkLoginWithRefresh();
    if (!token) {
      enhancedLog("No token available for saving final chunk, aborting");
      throw new Error("Authentication token not available");
    }

    const variables = {
      folderPositionInputs: [folderPositionInput],
      updatedFileReferenceInputs: fileReferenceInputs,
    };

    enhancedLog("GraphQL final mutation variables (folder + last chunk with filenames, no folder tags)");

    try {
      enhancedLog("Sending API request for final save with folder (no folder tags, with filenames)");
      const response = await fetch(AWS_PRIVATE_GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: SAVE_FINAL_CHUNK_WITH_FOLDER_MUTATION, variables }),
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
      
      enhancedLog("Final chunk and folder saved successfully (with individual photo tags and filenames)");
      return {
        fileReferences: json.data?.changeFiles0?.items || [],
        folderPositions: json.data?.changeFiles?.items || []
      };
    } catch (error) {
      console.error("Error in saveFinalChunkWithFolder:", error);
      enhancedLog(`Error in saveFinalChunkWithFolder: ${error}`);
      throw error;
    }
  }

  /**
   * NEW: Delete file references by their IDs
   */
  static async deleteFileReferences(fileReferenceIds: string[], enhancedLog: (message: string, data?: any) => void) {
    enhancedLog(`Deleting ${fileReferenceIds.length} file references: ${fileReferenceIds.join(', ')}`);
    
    const token = await checkLoginWithRefresh();
    if (!token) {
      enhancedLog("No token available for deleting file references, aborting");
      throw new Error("Authentication token not available");
    }

    const variables = {
      deletedFileReferenceIds: fileReferenceIds
    };

    enhancedLog("GraphQL delete file references mutation variables:", variables);

    try {
      enhancedLog("Sending API request to delete file references");
      const response = await fetch(AWS_PRIVATE_GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: DELETE_FILE_REFERENCES_MUTATION, variables }),
      });
      
      enhancedLog(`API response status: ${response.status}`);
      
      const responseText = await response.text();
      enhancedLog(`API response raw text: ${responseText}`);
      
      const json = JSON.parse(responseText);
      enhancedLog("API response JSON:", json);

      if (json.errors) {
        console.error("File references deletion failed:", json.errors);
        enhancedLog(`File references deletion failed with errors:`, json.errors);
        throw new Error("Failed to delete file references");
      }
      
      enhancedLog(`Successfully deleted ${fileReferenceIds.length} file references`);
      return json.data?.changeFiles?.items || [];
    } catch (error) {
      console.error("Error in deleteFileReferences:", error);
      enhancedLog(`Error in deleteFileReferences: ${error}`);
      throw error;
    }
  }
}