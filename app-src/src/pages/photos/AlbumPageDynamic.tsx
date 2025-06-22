import React, { useState, useEffect } from "react";
import { useTranslation } from "@/lib/i18n/hooks";
import { checkLoginWithoutRedirect } from "@/lib/utils";
import { AlbumData } from "@/lib/types";
import { formatUUID } from "@/lib/utils";
import { fetchFolderUsingTargetItemIdentifier, fetchFolderUsingAlbumNanoId } from "./databaseAPIService";
import { AlbumPageStatic } from "./AlbumPageStatic";

// ============================
// Album Data Fetching Wrapper Component
// ============================

export const AlbumPageDynamic: React.FC = () => {
  const { t } = useTranslation();
  
  // Data fetching state
  const [albumData, setAlbumData] = useState<AlbumData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [folderId, setFolderId] = useState<string | null>(null);
  const [cognitoUsername, setCognitoUsername] = useState<string | null>(null);

  // Updated URL parameter extraction function
  const getParametersFromUrl = (): string | null => {
    console.log('getParametersFromUrl called');
    console.log('window.location.pathname:', window.location.pathname);
    
    // Handle path-based format: /prefix/parameters
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    console.log('pathSegments:', pathSegments);
    
    // Skip if it's the traditional app path
    if (pathSegments.length > 0 && pathSegments[0] === 'app') {
      console.log('Traditional app path detected, returning null');
      return null;
    }
    
    // For /prefix/parameters format, return the parameters part
    if (pathSegments.length === 2) {
      console.log('Found parameters:', pathSegments[1]);
      return pathSegments[1];
    }
    
    console.log('No valid path format found, returning null');
    return null;
  };

  // Album initialization logic
  useEffect(() => {
    const initAlbum = async () => {
      console.log('initAlbum called');
      const parameters = getParametersFromUrl();
      console.log('Extracted parameters:', parameters);
      
      if (!parameters) {
        console.log('No parameters found, setting error');
        setError(t('Valid parameters not found in URL'));
        setIsLoading(false);
        return;
      }
      
      let identifier: string;
      let useTargetItemIdentifier = false;
      
      console.log('Checking if parameters contain "id=":', parameters.includes('id='));
      
      // Check if parameters contain "id="
      if (parameters.includes('id=')) {
        console.log('Parameters contain "id=", extracting identifier');
        // Extract the value after "id="
        const idIndex = parameters.indexOf('id=');
        if (idIndex !== -1) {
          identifier = parameters.substring(idIndex + 3); // 3 is length of "id="
          useTargetItemIdentifier = true;
          console.log('Extracted identifier after "id=":', identifier);
          console.log('Will use fetchFolderUsingTargetItemIdentifier');
        } else {
          console.log('Failed to find "id=" in parameters');
          setError(t('Invalid id parameter format'));
          setIsLoading(false);
          return;
        }
      } else {
        // Use the entire parameters string
        identifier = parameters;
        useTargetItemIdentifier = false;
        console.log('Using entire parameters as identifier:', identifier);
        console.log('Will use fetchFolderUsingAlbumNanoId');
      }
      
      // If identifier contains "-", ignore everything before the last "-"
      if (identifier.includes('-')) {
        const parts = identifier.split('-');
        const originalIdentifier = identifier;
        identifier = parts[parts.length - 1];
        console.log('Identifier contained "-", stripped from:', originalIdentifier, 'to:', identifier);
      } else {
        console.log('Identifier does not contain "-", keeping as is:', identifier);
      }
      
      let data;
      
      if (useTargetItemIdentifier) {
        console.log('Calling fetchFolderUsingTargetItemIdentifier with identifier:', identifier);
        // Use fetchFolderUsingTargetItemIdentifier logic

        let formattedId = identifier
    
        // Make sure it's exactly 32 characters before formatting
        if (formattedId.length === 32) {
          formattedId = formatUUID(formattedId);
          console.log(formattedId); // e.g., B89D8BAF-F9A1-484B-A379-FA7FAD081303
        } else {
          console.error('Invalid UUID format: must be 32 characters after removing dashes');
        }
  
        data = await fetchFolderUsingTargetItemIdentifier(formattedId, setFolderId);
      } else {
        console.log('Calling fetchFolderUsingAlbumNanoId with identifier:', identifier);
        // Use fetchFolderUsingAlbumNanoId logic
        data = await fetchFolderUsingAlbumNanoId(identifier, setFolderId);
      }
      
      console.log('API call result:', data ? 'Success' : 'Failed');
      
      if (data) {
        console.log('Full album data received:', data);
        console.log('Media items count:', data.mediaItems ? data.mediaItems.length : 'No mediaItems property');
        console.log('Password policy:', data.passwordPolicy);
        console.log('Folder position ID:', data.folderPositionId);
        
        setAlbumData(data);
        console.log('Album data set successfully');
      } else {
        console.log('No data returned from API, setting error');
        setError(t('Album not found'));
      }
      
      setIsLoading(false);
      console.log('initAlbum completed');
    };

    initAlbum();
  }, [t]);

  // Check if user is logged in and get cognito username
  useEffect(() => {
    const getUserInfo = async () => {
      const token = await checkLoginWithoutRedirect();
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const username = payload["cognito:username"];
          setCognitoUsername(username);
        } catch (err) {
          console.error("Failed to decode token", err);
        }
      }
    };
  
    getUserInfo();
  }, []);

  // Show loading state
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px'
      }}>
        {t('Loading album...')}
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        color: '#d32f2f'
      }}>
        {error}
      </div>
    );
  }

  // Render the static component with fetched data
  return (
    <AlbumPageStatic
      albumData={albumData}
      folderId={folderId}
      cognitoUsername={cognitoUsername}
    />
  );
};