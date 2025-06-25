// useAlbumInitialization.ts - Fixed version with no conditional hooks
import React, { useState, useEffect, useCallback, useRef } from "react";
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
  enhancedLog: (message: string, data?: unknown) => void
) => {
  // FIXED: All state initialization at the top, no conditional calls
  const [cognitoUsername, setCognitoUsername] = useState<string | null>(null);
  const [publicUsername, setPublicUsername] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isExistingAlbum, setIsExistingAlbum] = useState(false);

  // Refs to prevent multiple initializations
  const initializationRef = useRef(false);
  const folderInitRef = useRef(false);
  const photosRestoredRef = useRef(false);

  // SSR-safe client detection - only run once
  useEffect(() => {
    setIsClient(true);
  }, []);

  // SSR-safe localStorage utilities - memoized to prevent re-creation
  const getFromLocalStorage = useCallback((key: string): string | null => {
    if (!isClient) return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }, [isClient]);

  // Stable initialization function that only runs once
  const initializeComponent = useCallback(async () => {
    if (initializationRef.current || !isClient) return;
    initializationRef.current = true;

    enhancedLog("Starting component initialization");
    
    try {
      enhancedLog("Checking login with refresh");
      const token = await checkLoginWithRefresh();
      if (!token) {
        enhancedLog("No token returned from login check, aborting initialization");
        return;
      }
      
      // Extract username directly here
      try {
        // Get public username from localStorage
        const savedUsername = getFromLocalStorage(LOCAL_STORAGE_KEYS.PUBLIC_USERNAME);
        enhancedLog(`Retrieved public username from localStorage: ${savedUsername || 'null'}`);
        setPublicUsername(savedUsername || null);
        
        // Extract Cognito username directly from token
        const payload = JSON.parse(atob(token.split('.')[1]));
        const username = payload["cognito:username"];
        
        if (username) {
          enhancedLog(`Extracted Cognito username from token: ${username}`);
          setCognitoUsername(username);
        } else {
          enhancedLog("No Cognito username found in token");
        }
      } catch (err) {
        console.error("User data initialization error:", err);
        enhancedLog(`User data initialization error: ${err}`);
      }
      
      enhancedLog("Component initialization completed");
    } catch (initErr) {
      console.error("Initialization error:", initErr);
      enhancedLog(`Initialization error: ${initErr}`);
    } finally {
      setIsInitialized(true);
    }
  }, [isClient, enhancedLog, getFromLocalStorage]);

  // Stable folder initialization function
  const initializeFolderIdWithUsername = useCallback(async (username: string) => {
    if (folderInitRef.current || !isClient) return;
    folderInitRef.current = true;

    enhancedLog(`Initializing folder ID with username: ${username}`);
    try {
      // Get folderId from URL query parameter
      const params = new URLSearchParams(window.location.search);
      const id = params.get("folderId");
      enhancedLog(`Folder ID from URL: ${id || 'null'}`);
      
      if (id) {
        // EXISTING ALBUM - has folderId query parameter
        setFolderId(id);
        setIsExistingAlbum(true);
        enhancedLog(`Using existing folder ID: ${id}`);
        setIsCreator(true);
        setShowFolderDetails(true);
        
        // Try to fetch folder details
        try {
          enhancedLog(`Fetching details for existing folder: ${id}`);
          const folderDetails = await AlbumService.fetchFolderDetails(id, enhancedLog);
          
          if (folderDetails) {
            // Update folder details
            setFolderName(folderDetails.folderName);
            setFolderDescription(folderDetails.folderDescription);
            setIsOnPublicProfile(folderDetails.isOnPublicProfile);
            
            if (folderDetails.participantsCanAddItems !== undefined) {
              setParticipantsCanAddItems(folderDetails.participantsCanAddItems);
            }
            
            if (folderDetails.participantsCanDeleteItems !== undefined) {
              setParticipantsCanDeleteItems(folderDetails.participantsCanDeleteItems);
            }
            
            const policy = folderDetails.passwordPolicy;
            setPasswordProtectionOption(policy as PasswordPolicyEnum);
            if (policy !== 'NoPassword' && folderDetails.password) {
              setAlbumPassword(folderDetails.password);
            }
          }
        } catch (fetchErr) {
          console.error("Error fetching folder details:", fetchErr);
          enhancedLog(`Error fetching folder details: ${fetchErr}`);
        }
      } else {
        // NEW ALBUM - no folderId query parameter
        setIsExistingAlbum(false);
        
        // Check for sub-album data first
        const subAlbumDataStr = getFromLocalStorage(LOCAL_STORAGE_KEYS.SUB_ALBUM_DATA);
        
        if (subAlbumDataStr) {
          try {
            const subAlbumData = JSON.parse(subAlbumDataStr) as SubAlbumData;
            
            if (subAlbumData.isSubAlbum && subAlbumData.selectedFileIds?.length > 0) {
              enhancedLog(`Valid sub-album data found with ${subAlbumData.selectedFileIds.length} files`);
              setIsSubAlbum(true);
              setSelectedFileIds(subAlbumData.selectedFileIds);
              
              if (subAlbumData.selectedPhotos && subAlbumData.selectedPhotos.length > 0) {
                setSelectedPhotos(subAlbumData.selectedPhotos);
              }
              
              setShowFolderDetails(true);
              setIsCreator(true);
              
              // Create a new folder ID for sub-album
              const newId = `${username}_____${generateUUID()}____Folder`;
              setFolderId(newId);
              enhancedLog(`Created new folder ID for sub-album: ${newId}`);
              return;
            }
          } catch (e) {
            console.error("Error parsing sub-album data:", e);
            enhancedLog(`Error parsing sub-album data: ${e}`);
          }
        }
        
        // Create new folder ID if no existing ID and no sub-album
        const newId = `${username}_____${generateUUID()}____Folder`;
        enhancedLog(`Creating new folder ID: ${newId}`);
        setFolderId(newId);
        setIsCreator(true);
        setShowFolderDetails(true);
      }
    } catch (err) {
      console.error("Folder ID initialization error:", err);
      enhancedLog(`Folder ID initialization error: ${err}`);
      setIsCreator(false);
    }
  }, [isClient, enhancedLog, getFromLocalStorage, setFolderId, setIsCreator, setShowFolderDetails, 
      setFolderName, setFolderDescription, setIsOnPublicProfile, setParticipantsCanAddItems, 
      setParticipantsCanDeleteItems, setPasswordProtectionOption, setAlbumPassword, 
      setIsSubAlbum, setSelectedFileIds, setSelectedPhotos, setIsExistingAlbum]);

  // Stable photo restoration function
  const restorePhotosFromStorage = useCallback(() => {
    if (!isClient || photosRestoredRef.current) return;
    photosRestoredRef.current = true;
    
    enhancedLog("Attempting to restore photos from localStorage");
    try {
      const storedPhotos = getFromLocalStorage(LOCAL_STORAGE_KEYS.SELECTED_PHOTOS);
      
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
  }, [isClient, enhancedLog, getFromLocalStorage, setSelectedPhotos]);

  // Test S3 connection - memoized
  const testS3Connection = useCallback(() => {
    enhancedLog("Testing S3 connection");
    try {
      if (!s3) {
        enhancedLog("S3 client not available");
      } else {
        enhancedLog("S3 client is available");
      }
    } catch (s3Err) {
      console.error("S3 connection test error:", s3Err);
      enhancedLog(`S3 connection test error: ${s3Err}`);
    }
  }, [enhancedLog]);

  // FIXED: All useEffect calls are now unconditional and always run
  // Main initialization effect - only run once when client is ready
  useEffect(() => {
    if (isClient) {
      initializeComponent();
    }
  }, [isClient, initializeComponent]);

  // Folder initialization effect - only run when we have a username
  useEffect(() => {
    if (cognitoUsername && !folderInitRef.current) {
      initializeFolderIdWithUsername(cognitoUsername);
    }
  }, [cognitoUsername, initializeFolderIdWithUsername]);

  // Photo restoration effect - only run once when client is ready
  useEffect(() => {
    if (isClient) {
      restorePhotosFromStorage();
      testS3Connection();
    }
  }, [isClient, restorePhotosFromStorage, testS3Connection]);

  return {
    cognitoUsername,
    publicUsername,
    setPublicUsername,
    isInitialized,
    isExistingAlbum
  };
};