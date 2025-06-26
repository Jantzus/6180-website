import React, { useState, useEffect, useMemo, useCallback } from "react";
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
  State
} from "@/styles/styled-components.tsx";
import {
  AppContainer,
} from "@/styles/components/layout";
import { GlobalStyle } from "@/styles/globalStyles";

// Helper function to convert a string to searchable format
// Similar to Swift's getSearchableString
const getSearchableString = (originalString: string): string => {
  return originalString
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove punctuation (equivalent to isNotPunctuationMark)
    .trim(); // Trim whitespace
};

// SSR-safe token decoder with fallback
const decodeTokenSafely = (token: string): { username?: string } => {
  try {
    // Base64 decode without browser dependency
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = '';
    
    // Try browser atob first if available
    if (typeof window !== 'undefined' && window.atob) {
      jsonPayload = window.atob(base64);
    } else {
      // Fallback for SSR - simple base64 decode simulation
      // This is a simplified version and might not work for all cases
      try {
        jsonPayload = decodeURIComponent(escape(atob(base64)));
      } catch {
        return {};
      }
    }
    
    const payload = JSON.parse(jsonPayload);
    return { username: payload["cognito:username"] };
  } catch (err) {
    console.error("Failed to decode token", err);
  }
  return {};
};

// SSR-safe URL parser
const useSSRSafeURL = () => {
  const [profileName, setProfileName] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    if (typeof window === 'undefined') return;

    // Parse URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const publicDisplayName = urlParams.get('id'); // Fixed: use const instead of let
    
    if (publicDisplayName) {
      setProfileName(publicDisplayName);
      return;
    }
    
    // Check in path - Fixed: removed unnecessary escape character
    const pathMatch = window.location.pathname.match(/\/persona\/([^/]+)/);
    if (pathMatch && pathMatch[1]) {
      setProfileName(pathMatch[1]);
      return;
    }

    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    
    // Skip if this is an /app/ path or other special paths
    if (pathSegments.length > 0 && 
      (pathSegments[0] === 'app')) {
      // Continue to traditional method
    } else if (pathSegments.length === 1) {
      // Single segment URL like /Snapitwithsam
      setProfileName(pathSegments[0]);
      return;
    }
    
    setProfileName(null);
  }, []);

  return { profileName, isClient };
};

// SSR-safe document title manager
const useSSRSafeDocumentTitle = (title: string) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    if (typeof document !== 'undefined') {
      document.title = title;
    }
    
    // Optional: Clean up on unmount by restoring original title
    return () => {
      if (typeof document !== 'undefined') {
        document.title = '6180 bio';
      }
    };
  }, [title, isClient]);
};

// Define types for GraphQL response
interface FileReference {
  id: string;
  fileDisplayName?: string;
  selectedTags?: Array<{
    TagType: string;
    tagTitle: string;
    subtags: Array<{
      TagType: string;
      tagTitle: string;
      subtagTitle: string;
    }>;
  }>;
  file: {
    dataInBytes?: number;
    dataKey: string;
    thumbnailDataKey?: string;
    durationInSeconds?: number;
  };
}

interface FolderPosition {
  id: string;
  profileIds?: string[];
  folder: {
    id: string;
    albumNanoId?: string;
    folderName?: string;
    folderDescription?: string;
    folderPassword?: {
      password?: string;
      policy?: string;
    };
    creatorId?: string;
    createdAt?: number;
    updatedAt?: number;
    fileReferencesPage?: {
      items: FileReference[];
    };
  };
}

interface PublicDisplayNameResponse {
  ownerAccountId?: string;
  folderPositionsPage?: {
    items: FolderPosition[];
  };
}

// Main PersonaViewer Component - Exported for fast refresh
export const PersonaViewer: React.FC = () => {
  
  const [ownerItemId, setOwnerItemId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [folders, setFolders] = useState<FolderType[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [cognitoUsername, setCognitoUsername] = useState<string | null>(null);
  
  // Client-side hydration state
  const [isClient, setIsClient] = useState<boolean>(false);
  
  // SSR-safe hooks
  const { profileName, isClient: urlIsClient } = useSSRSafeURL();
  
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
  
  // Document title management
  useSSRSafeDocumentTitle(profileName || '6180 bio');
  
  // Mark as client-side after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Function to fetch contact position based on public display name
  const fetchContactPositionBasedOnPublicDisplayName = useCallback(async (publicDisplayName: string) => {
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
        const publicDisplayNameItem = result.data.fetchRelations.items[0] as PublicDisplayNameResponse;
        
        // Set owner item ID
        if (publicDisplayNameItem.ownerAccountId) {
          setOwnerItemId(publicDisplayNameItem.ownerAccountId);
        }
        
        // Process folders from folderPositionsPage
        if (publicDisplayNameItem.folderPositionsPage?.items) {
          const folderPositions = publicDisplayNameItem.folderPositionsPage.items;
          
          // Transform data to match the Folder type
          const parsedFolders: FolderType[] = folderPositions.map((item: FolderPosition) => {
            const folder = item.folder;
            const files = folder?.fileReferencesPage?.items?.map((ref: FileReference) => ref.file) || [];
            
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
              files: files.filter((f) => f && f.dataKey),
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
  }, [isLoggedIn, t]); // Fixed: Added missing dependencies

  // Extract publicDisplayName from URL on component mount (client-side only)
  useEffect(() => {
    if (!urlIsClient || !profileName) {
      if (urlIsClient && !profileName) {
        setError(t('No profile name provided'));
        setIsLoading(false);
      }
      return;
    }
    
    fetchContactPositionBasedOnPublicDisplayName(profileName);
  }, [urlIsClient, profileName, t, fetchContactPositionBasedOnPublicDisplayName]); // Fixed: Added missing dependency

  // Check user login status (client-side only)
  useEffect(() => {
    if (!isClient) return; // Skip during SSR
    
    const checkLogin = async () => {
      try {
        const token = await checkLoginWithoutRedirect();
        if (token) {
          setIsLoggedIn(true);
          
          // Extract username from token using SSR-safe decoder
          const { username } = decodeTokenSafely(token);
          if (username) {
            setCognitoUsername(username);
          }
        }
      } catch (err) {
        console.error("Error checking login:", err);
      }
    };
    
    checkLogin();
  }, [isClient]);
  
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
            username={profileName || t('User')}
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

// SSR-safe app initialization
const initializeApp = () => {
  if (typeof document !== 'undefined' && typeof window !== 'undefined') {
    const rootElement = document.getElementById("root");
    if (rootElement) {
      ReactDOM.createRoot(rootElement).render(
        <I18nProvider>
          <PersonaViewer />
        </I18nProvider>
      );
    }
  }
};

// Initialize the app with I18nProvider (client-side only)
if (typeof window !== 'undefined') {
  initializeApp();
}