// useAlbumInitialization.ts - Focused hook for album initialization only
import React, { useState, useEffect } from "react";
import { SelectedPhoto, PasswordPolicyEnum } from "@/lib/types";
import { LOCAL_STORAGE_KEYS } from "@/lib/config";
import { generateUUID } from "@/lib/utils";
import { s3 } from "@/lib/file-upload-utils";
import { AlbumService } from "../services/album.service";
import { SubAlbumData } from "../types/album-types";
import { checkLoginWithRefresh } from "@/lib/utils";

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
  setParticipantsCanDeleteItems: React.Dispatch<React.SetStateAction<boolean>>,
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
          const folderDetails = await AlbumService.fetchFolderDetails(id, enhancedLog);
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
              
              // Set participants can delete items toggle state based on folderDetails
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
            enhancedLog(`Restored ${parsedPhotos.length} photos to state (including original filenames)`);
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