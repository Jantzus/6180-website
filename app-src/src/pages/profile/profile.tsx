import React, { useState, useEffect, useMemo } from "react";
import ReactDOM from "react-dom/client";
import { 
  checkLoginWithoutRedirect, 
  formatUUID 
} from "@/lib/utils";
import {
  AWS_PUBLIC_GRAPHQL_ENDPOINT,
  AWS_PUBLIC_API_KEY,
  AWS_PRIVATE_GRAPHQL_ENDPOINT,
  LOCAL_STORAGE_KEYS
} from "@/lib/config";
import { I18nProvider } from "@/lib/i18n/context";
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n";
import { SupportedLanguage } from "@/lib/i18n/translations";
import { SearchBar } from "@/components/SearchBar";
// Import the unified AlbumList
import { AlbumList } from "@/components/AlbumList";
import { FolderType } from "@/lib/types";
// Import styled components
import {
  GlobalStyle,
  AppContainer,
  ErrorState,
  EmptyState,
  ProfileHeader
} from "@/styles/styled-components.tsx";

// Main PersonaViewer Component
const PersonaViewer: React.FC = () => {
  
  const [ownerItemId, setOwnerItemId] = useState<string>("");
  const [profileUsername, setProfileUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [folders, setFolders] = useState<FolderType[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [cognitoUsername, setCognitoUsername] = useState<string | null>(null);
  
  // Check if the logged-in user is the owner of this profile
  const isOwner = useMemo(() => {
    // If the user is not logged in or no owner item ID, they're not the owner
    if (!cognitoUsername || !ownerItemId) return false;
    
    // Parse the ownerItemId to get the username component
    // Assuming ownerItemId format is like: username_____Public____Profile
    const parts = ownerItemId.split('_____');
    if (parts.length > 0) {
      return parts[0] === cognitoUsername;
    }
    
    return false;
  }, [cognitoUsername, ownerItemId]);
  
  // Get translation functions
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";
  
  // Extract ownerItemId from URL on component mount
  useEffect(() => {
    const getOwnerItemIdFromUrl = (): string | null => {
      // Check in query params
      const urlParams = new URLSearchParams(window.location.search);
      let id = urlParams.get('id');
      
      let formattedId = id?.replace(/-/g, '');

      // Make sure it's exactly 32 characters before formatting
      if (formattedId?.length === 32) {
        formattedId = formatUUID(formattedId);
        console.log(formattedId); // e.g., B89D8BAF-F9A1-484B-A379-FA7FAD081303
      } else {
        console.error('Invalid UUID format: must be 32 characters after removing dashes');
      }

      if (formattedId) return formattedId;
      
      // Check in path
      const pathMatch = window.location.pathname.match(/\/persona\/([^\/]+)/);
      if (pathMatch && pathMatch[1]) {
        return pathMatch[1];
      }
      
      return null;
    };

    const id = getOwnerItemIdFromUrl();
    if (id) {
      setOwnerItemId(id);
      
      // Try to extract username from the ownerItemId
      // Assuming format like username_____Public____Profile
      const parts = id.split('_____');
      if (parts.length > 0) {
        setProfileUsername(parts[0]);
      }
    } else {
      setError(t('No profile ID provided'));
      setIsLoading(false);
    }
  }, [t]);

  // Check user login status
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await checkLoginWithoutRedirect();
        if (token) {
          setIsLoggedIn(true);
          
          // Extract username from token
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const username = payload["cognito:username"];
            setCognitoUsername(username);
          } catch (err) {
            console.error("Failed to decode token", err);
          }
        }
      } catch (err) {
        console.error("Error checking login:", err);
      }
    };
    
    checkLogin();
  }, []);

  // Fetch folders when ownerItemId is available
  useEffect(() => {
    if (ownerItemId) {
      fetchFolders();
    }
  }, [ownerItemId]);

  // Function to fetch folders
  const fetchFolders = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Prepare variables for GraphQL query
      const fetchRelationsInput = {
        ownerItemId: ownerItemId,
        rangeKeyPrefix: "Folder",
        index: "ownerItemId_____RelationType____sortParameter",
        limit: 1000,
        scanIndexForward: false,
        nextToken: null
      };
      
      const variables = {
        relationIds: [ `${ownerItemId}_____Public____Profile` ],
        fetchRelationsInput: fetchRelationsInput
      };
      
      // GraphQL query
      const FETCH_FOLDERS_QUERY = `
        mutation FetchFolderPositions($relationIds: [ID!], $fetchRelationsInput: FetchRelationsInput!) {
          batchGetItems(relationIds: $relationIds) {
              items {
                  id
                  item {
                      ... on Profile {
                        anyDisplayName
                      }
                  }
              }
              nextToken
          }        
          fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
            items {
              ... on FolderPosition {
                id
                profileIds
                folder {
                  id
                  albumNanoId
                  folderName
                  folderDescription
                  folderPassword {
                    password
                    policy
                  }
                  creatorId
                  createdAt
                  updatedAt
                  fileReferencesPage {
                    items {
                      file {
                        dataKey
                        thumbnailDataKey
                        durationInSeconds
                      }
                    }
                  }
                }
              }
            }
            nextToken
          }
        }
      `;

      // Try authenticated API call first if logged in
      let result;
      if (isLoggedIn) {
        try {
          const token = await checkLoginWithoutRedirect();
          if (token) {
            const privateResult = await fetch(AWS_PRIVATE_GRAPHQL_ENDPOINT, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                query: FETCH_FOLDERS_QUERY,
                variables: variables
              })
            });
            
            result = await privateResult.json();
          }
        } catch (err) {
          console.error("Error fetching private data:", err);
          // Fall back to public API
        }
      }
      
      // If no authenticated result, use public API
      if (!result) {
        const publicResult = await fetch(AWS_PUBLIC_GRAPHQL_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': AWS_PUBLIC_API_KEY
          },
          body: JSON.stringify({
            query: FETCH_FOLDERS_QUERY,
            variables: variables
          })
        });
        
        result = await publicResult.json();
      }
      
      // Extract anyDisplayName from profile data and set it
      if (result?.data?.batchGetItems?.items && result.data.batchGetItems.items.length > 0) {
        const profileItem = result.data.batchGetItems.items[0];
        if (profileItem?.item?.anyDisplayName) {
          setProfileUsername(profileItem.item.anyDisplayName);
        }
      }
      
      // Process folders results
      if (result?.data?.fetchRelations?.items) {
        const items = result.data.fetchRelations.items;
        
        // Transform data to match the Folder type
        const parsedFolders: FolderType[] = items.map((item: any) => {
          const folder = item.folder;
          const files = folder?.fileReferencesPage?.items?.map((ref: any) => ref.file) || [];
          
          return {
            folderPositionId: item.id,
            folderId: folder.id,
            albumNanoId: folder.albumNanoId,
            folderName: folder.folderName,
            folderDescription: folder.folderDescription,
            folderPassword: folder.folderPassword,
            creatorId: folder.creatorId,
            createdAt: folder.createdAt,
            updatedAt: folder.updatedAt,
            files: files.filter((f: any) => f && f.dataKey),
            profileIds: item.profileIds || []
          };
        });
        
        setFolders(parsedFolders);
      }
    } catch (error) {
      console.error('Error fetching folders:', error);
      setError(t('Failed to fetch profile data'));
    } finally {
      setIsLoading(false);
    }
  };
  
  // Filter folders based on search query
  const filteredFolders = useMemo(() => {
    if (!searchQuery) return folders;
    
    return folders.filter(folder => {
      const nameMatch = folder.folderName?.toLowerCase().includes(searchQuery.toLowerCase());
      const descMatch = folder.folderDescription?.toLowerCase().includes(searchQuery.toLowerCase());
      return nameMatch || descMatch;
    });
  }, [folders, searchQuery]);

  return (
    <>
      <GlobalStyle />
      
      <AppContainer isRTL={isRTL}>
        {/* Profile Header */}
        <ProfileHeader 
          username={profileUsername || t('User')}
          isCurrentUser={isOwner}
          isRTL={isRTL}
        />
        
        {/* Search Bar */}
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          t={t}
          isRTL={isRTL}
        />
        
        {/* Loading State */}
        {isLoading && (
          <EmptyState>
            <p>{t('Loading albums...')}</p>
          </EmptyState>
        )}
        
        {/* Error State */}
        {error && (
          <ErrorState>
            <p>{error}</p>
          </ErrorState>
        )}
        
        {/* Album List */}
        {!isLoading && !error && (
          <AlbumList 
            folders={filteredFolders}
            setFolders={setFolders}
            cognitoUsername={cognitoUsername}
            isProfileView={true}
          />
        )}
        
        {/* File Input for adding photos when authorized */}
        {/* {isLoggedIn && (
          <FileInput 
            onFileSelection={handleFileSelection} 
            ref={fileInputRef}
          />
        )} */}
      </AppContainer>
    </>
  );
};

// Initialize the app with I18nProvider
ReactDOM.createRoot(document.getElementById("root")!).render(
  <I18nProvider initialLanguage={localStorage.getItem(LOCAL_STORAGE_KEYS.LANGUAGE) as SupportedLanguage || 'en'}>
    <PersonaViewer />
  </I18nProvider>
);