import React, { useState, useEffect, useMemo } from "react";
import ReactDOM from "react-dom/client";
import { 
  checkLoginWithoutRedirect, 
  // formatUUID 
} from "@/lib/utils";
import {
  AWS_PUBLIC_GRAPHQL_ENDPOINT,
  AWS_PUBLIC_API_KEY,
  AWS_PRIVATE_GRAPHQL_ENDPOINT,
} from "@/lib/config";
import { I18nProvider } from "@/lib/i18n/context";
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n";
import { SearchBar } from "@/components/SearchBar";
import { AlbumList } from "@/components/AlbumList";
import { ProfileHeader } from "@/components/ProfileHeader";
import { FolderType, FOLDERPOSITION_FIELD } from "@/lib/types";
import {
  GlobalStyle,
  AppContainer,
  State
} from "@/styles/styled-components.tsx";

// Helper function to convert a string to searchable format
// Similar to Swift's getSearchableString
const getSearchableString = (originalString: string): string => {
  return originalString
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove punctuation (equivalent to isNotPunctuationMark)
    .trim(); // Trim whitespace
};

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
  
  // Extract publicDisplayName from URL on component mount
  useEffect(() => {
    const getPublicDisplayNameFromUrl = (): string | null => {
      // Check in query params
      const urlParams = new URLSearchParams(window.location.search);
      let publicDisplayName = urlParams.get('id');
      
      if (publicDisplayName) return publicDisplayName;
      
      // Check in path
      const pathMatch = window.location.pathname.match(/\/persona\/([^\/]+)/);
      if (pathMatch && pathMatch[1]) {
        return pathMatch[1];
      }

      const pathSegments = window.location.pathname.split('/').filter(Boolean);
      
      // Skip if this is an /app/ path or other special paths
      if (pathSegments.length > 0 && 
        (pathSegments[0] === 'app')) {
      // Continue to traditional method
      } else if (pathSegments.length === 1) {
        // Single segment URL like /Snapitwithsam
        return pathSegments[0];
      }
      
      return null;
    };

    const publicDisplayName = getPublicDisplayNameFromUrl();
    if (publicDisplayName) {
      setProfileUsername(publicDisplayName);
      fetchContactPositionBasedOnPublicDisplayName(publicDisplayName);
    } else {
      setError(t('No profile name provided'));
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

  // Update page title when profile username changes
  useEffect(() => {
    if (profileUsername) {
      document.title = profileUsername;
    } else {
      document.title = '6180 bio'; // Fallback to original title
    }
    
    // Optional: Clean up on unmount by restoring original title
    return () => {
      document.title = '6180 bio';
    };
  }, [profileUsername]);

  // Function to fetch contact position based on public display name
  const fetchContactPositionBasedOnPublicDisplayName = async (publicDisplayName: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const searchableString = getSearchableString(publicDisplayName);
      
      // Prepare variables for GraphQL query
      const fetchRelationsInput = {
        ownerItemId: `PUBLICDISPLAYNAME_${searchableString}`,
        rangeKeyPrefix: "PUBLICDISPLAYNAME____PublicDisplayName",
        index: "ownerItemId_____targetItemIdentifier____RelationType",
        limit: 1,
        scanIndexForward: false
      };
      
      // GraphQL query
      const FETCH_PUBLIC_DISPLAY_NAME_QUERY = `
        mutation FetchPublicDisplayName($fetchRelationsInput: FetchRelationsInput!) {
          fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
            items {
              ... on PublicDisplayName {
                ownerAccountId
                folderPositionsPage {
                  items {        
                    ${FOLDERPOSITION_FIELD}
                  }
                }        
              }
            }
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
                query: FETCH_PUBLIC_DISPLAY_NAME_QUERY,
                variables: { fetchRelationsInput }
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
            query: FETCH_PUBLIC_DISPLAY_NAME_QUERY,
            variables: { fetchRelationsInput }
          })
        });
        
        result = await publicResult.json();
      }
      
      // Process results
      if (result?.data?.fetchRelations?.items && result.data.fetchRelations.items.length > 0) {
        const publicDisplayNameItem = result.data.fetchRelations.items[0];
        
        // Set owner item ID
        if (publicDisplayNameItem.ownerAccountId) {
          setOwnerItemId(publicDisplayNameItem.ownerAccountId);
        }
        
        // Process folders from folderPositionsPage
        if (publicDisplayNameItem.folderPositionsPage?.items) {
          const folderPositions = publicDisplayNameItem.folderPositionsPage.items;
          
          // Transform data to match the Folder type
          const parsedFolders: FolderType[] = folderPositions.map((item: any) => {
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
        } else {
          setFolders([]);
        }
      } else {
        setError(t('No Public Albums Found'));
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
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
      
      <AppContainer $isRTL={isRTL}>
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
            <State $type="empty">
              <p>{t('Loading albums...')}</p>
            </State>
          )}
          
          {/* Error State */}
          {error && (
            <State $type="error">
              <p>{error}</p>
            </State>
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
      </AppContainer>
    </>
  );
};

// Initialize the app with I18nProvider
ReactDOM.createRoot(document.getElementById("root")!).render(
  <I18nProvider>
    <PersonaViewer />
  </I18nProvider>
);