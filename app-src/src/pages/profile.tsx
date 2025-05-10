import React, { useState, useEffect, useMemo, useRef } from "react";
import ReactDOM from "react-dom/client";
import { 
  checkLoginWithoutRedirect, 
  getTargetItemIdentifier, 
  formatDate,
  formatUUID 
} from "@/lib/utils";
import {
  AWS_PUBLIC_GRAPHQL_ENDPOINT,
  AWS_PUBLIC_API_KEY,
  AWS_PRIVATE_GRAPHQL_ENDPOINT,
  LOCAL_STORAGE_KEYS
} from "@/lib/config";
import { I18nProvider, useTranslation } from "@/components/LanguageSelector";
import { getLanguageDirection } from "@/lib/i18n";
import { SupportedLanguage } from "@/lib/i18n/translations";
import { SearchBar } from "@/components/SearchBar";
import { CopyLinkModal, ConfirmationModal } from "@/components/Modals";
import { LazyImage } from "@/components/LazyImage";
// Import styled components
import {
  HeaderContainer,
  ProfileControls,
  ProfileMenu,
  ProfileAvatar,
  ProfileName,
  DropdownIndicator,
  DropdownMenu,
  DropdownItem,
  ProfileNotification,
  FooterContainer,
  ButtonGroup,
  ButtonRow,
  Button,
  EmptyState,
  AlbumCard,
  AlbumLink,
  AlbumContent,
  AlbumHeader,
  AlbumDetails,
  AlbumTitle,
  AlbumDates,
  ImageContainer,
  ImageScroller,
  ImageItem,
  ImageShadow,
  PasswordPolicy,
  PolicyIndicator,
  AlbumDescription,
  LoadingState,
  ErrorState,
  MainContainer
} from "@/styles/profile-styled-components.tsx";
import {
  GlobalStyle
} from "@/styles/styled-components.tsx";

// Types
interface FolderPassword {
  password?: string;
  policy?: string;
}

interface Folder {
  folderPositionId: string;
  folderId: string;
  folderName?: string;
  folderDescription?: string;
  folderPassword?: FolderPassword;
  creatorId: string;
  createdAt: number;
  updatedAt: number;
  files: any[];
  profileIds: string[];
}

// ProfileHeader Component
interface ProfileHeaderProps {
  username: string;
  isCurrentUser: boolean;
  isRTL: boolean;
}

// Modified ProfileHeader Component
const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  username, 
  isCurrentUser,
  isRTL 
}) => {
  const { t } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  
  // Toggle dropdown menu
  const toggleDropdown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isDropdownOpen) setIsDropdownOpen(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);
  
  return (
    <HeaderContainer isRTL={isRTL}>
      <ProfileControls isRTL={isRTL}>
        <ProfileMenu onClick={toggleDropdown}>
          <ProfileAvatar>
            {username ? username.charAt(0).toUpperCase() : "?"}
          </ProfileAvatar>
          
          <ProfileName>
            {username || t('User Profile')}
          </ProfileName>
          
          <DropdownIndicator />
        </ProfileMenu>
        
        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <DropdownMenu>
            <DropdownItem 
              hasBorder={true}
              onClick={() => {
                alert(t('Bio feature is coming soon! Stay tuned for updates where you can share more about yourself.'));
              }}
            >
              <span>Bio</span>
            </DropdownItem>
            
            <DropdownItem 
              hasBorder={true}
              onClick={() => {
                alert(t('Email feature is coming soon! Soon you will be able to share your email with connections.'));
              }}
            >
              <span>E-mail</span>
            </DropdownItem>
            
            <DropdownItem 
              onClick={() => {
                alert(t('Add Contact feature is coming soon! You will be able to add this person as a contact on 6180.'));
              }}
            >
              <span>Contact On 6180</span>
            </DropdownItem>
          </DropdownMenu>
        )}
      </ProfileControls>
      
      {isCurrentUser && (
        <ProfileNotification>
          <p>{t('This is how others see your public profile')}</p>
        </ProfileNotification>
      )}
    </HeaderContainer>
  );
};

// AlbumFooter Component - Enhanced to include public profile toggle
interface AlbumFooterProps {
  folder: Folder;
  isOwner: boolean;
  hasAddPhotoPermission: boolean;
  cognitoUsername: string | null;
  openFilePicker?: (folderId: string) => void;
  updateProfileIds?: (folderId: string, profileIds: string[]) => void;
}

const AlbumFooter: React.FC<AlbumFooterProps> = ({
  folder,
  isOwner,
  hasAddPhotoPermission,
  cognitoUsername,
  openFilePicker,
  updateProfileIds
}) => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";
  
  // Define state for managing alerts and public profile status
  const [isOnPublicProfile, setIsOnPublicProfile] = useState<boolean>(
    (folder.profileIds || []).includes(`${cognitoUsername}_____Public____Profile`)
  );
  const [showingCopyLinkAlert, setShowingCopyLinkAlert] = useState<boolean>(false);
  const [showingCopiedLinkAlert, setShowingCopiedLinkAlert] = useState<boolean>(false);
  
  // Generate the invite link
  let formattedTargetItemIdentifier = getTargetItemIdentifier(folder.folderId).replace(/-/g, '');
  const inviteLink = `https://6180.io/photos.html?id=${formattedTargetItemIdentifier}`;
  
  // Handle copy function
  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink)
      .then(() => {
        setShowingCopyLinkAlert(false);
        setShowingCopiedLinkAlert(true);
      })
      .catch(err => {
        console.error("Failed to copy link:", err);
        alert(t('Failed to copy link'));
      });
  };
  
  // Handle toggling public profile visibility
  const handlePublicProfileClick = async (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    
    if (!cognitoUsername) {
      alert(t('You must be logged in to perform this action'));
      return;
    }
    
    try {
      // Get a fresh token
      const token = await checkLoginWithoutRedirect();
      
      if (!token) {
        console.error("Authentication failed");
        return;
      }
      
      // Determine the new profileIds array
      const publicProfileId = `${cognitoUsername}_____Public____Profile`;
      const newProfileIds = [...folder.profileIds || []];
      
      if (isOnPublicProfile) {
        // Remove from public profile
        const index = newProfileIds.indexOf(publicProfileId);
        if (index > -1) {
          newProfileIds.splice(index, 1);
        }
      } else {
        // Add to public profile
        newProfileIds.push(publicProfileId);
      }
      
      // Prepare the mutation query
      const toggleVisibilityQuery = `
        mutation ChangeAlbumVisibility($folderPositionChangeProfileIdsInput: FolderPositionChangeProfileIdsInput!) {
          changeFiles(folderPositionChangeProfileIdsInput: $folderPositionChangeProfileIdsInput) {
            items {
              ... on FolderPosition {
                id
                profileIds
              }
            }
          }
        }
      `;
      
      // Call the API
      const res = await fetch(AWS_PRIVATE_GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          query: toggleVisibilityQuery, 
          variables: { 
            folderPositionChangeProfileIdsInput: {
              folderId: folder.folderId,
              profileIds: newProfileIds
            }
          } 
        }),
      });
      
      const json = await res.json();
      
      if (json.errors) {
        throw new Error(json.errors[0]?.message || "Unknown error");
      }
      
      // Update local state
      const updatedItems = json?.data?.changeFiles?.items || [];
      const updatedItem = updatedItems.find((item: any) => item.id === folder.folderPositionId);
      
      if (updatedItem && updatedItem.profileIds) {
        // Update local state
        setIsOnPublicProfile(!isOnPublicProfile);
        
        // Then propagate changes to parent component if needed
        if (updateProfileIds) {
          updateProfileIds(folder.folderId, updatedItem.profileIds);
        }
        
        console.log("Album visibility updated successfully");
      }
    } catch (err) {
      console.error("Failed to toggle album visibility:", err);
      alert(t('Failed to update album visibility. Please try again.'));
    }
  };

  return (
    <>
      <FooterContainer isRTL={isRTL}>
        <ButtonGroup isRTL={isRTL}>
          <ButtonRow isRTL={isRTL}>
            {hasAddPhotoPermission && openFilePicker && (
              <Button
                variant="success"
                onClick={(e) => {
                  e.preventDefault(); 
                  e.stopPropagation();
                  openFilePicker(folder.folderId);
                }}
              >
                {t('Add Photos')}
              </Button>
            )}
            
            <Button
              onClick={(e) => {
                e.preventDefault(); 
                e.stopPropagation();
                setShowingCopyLinkAlert(true);
              }}
            >
              {t('Copy Link')}
            </Button>
            
            {isOwner && (
              <>
                <Button
                  variant="primary"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.href = `/save-album.html?folderId=${encodeURIComponent(folder.folderId)}`;
                  }}
                >
                  {t('Edit Album')}
                </Button>
                
                {/* Public Profile Toggle Button - Only show for owners */}
                <Button
                  variant={isOnPublicProfile ? "active" : "default"}
                  onClick={handlePublicProfileClick}
                >
                  {isOnPublicProfile ? t('Remove From Public Profile') : t('Add To Public Profile')}
                </Button>
              </>
            )}
          </ButtonRow>
        </ButtonGroup>
      </FooterContainer>
      
      {/* Copy Link Modals */}
      <CopyLinkModal
        isOpen={showingCopyLinkAlert}
        onClose={() => setShowingCopyLinkAlert(false)}
        inviteLink={inviteLink}
        onCopy={() => handleCopy()}
        t={t}
        isRTL={isRTL}
      />
      
      <ConfirmationModal
        isOpen={showingCopiedLinkAlert}
        onClose={() => setShowingCopiedLinkAlert(false)}
        t={t}
        isRTL={isRTL}
      />
    </>
  );
};

// AlbumList Component - Updated to include setFolders and updateProfileIds
interface AlbumListProps {
  folders: Folder[];
  setFolders: React.Dispatch<React.SetStateAction<Folder[]>>;
  isOwner: boolean;
  hasAddPhotoPermission: boolean;
  cognitoUsername: string | null;
  openFilePicker?: (folderId: string) => void;
}

// Updated AlbumList Component - The key change is in the files.map section to only render non-empty thumbnails
const AlbumList: React.FC<AlbumListProps> = ({ 
  folders,
  setFolders,
  hasAddPhotoPermission,
  cognitoUsername,
  openFilePicker
}) => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";

  if (folders.length === 0) {
    return (
      <EmptyState>
        <p>{t('No public albums found')}</p>
      </EmptyState>
    );
  }

  // Helper function to get password policy display text
  const getPasswordPolicyText = (policy?: string) => {
    switch(policy) {
      case "NotVisible":
        return t('Hidden');
      case "Watermark":
        return t('Watermarked');
      case "CannotBeSaved":
        return t('Cannot be saved');
      case "NoPassword":
      default:
        return t('No password');
    }
  };

  // Helper function to update folder profileIds
  const updateFolderProfileIds = (folderId: string, profileIds: string[]) => {
    setFolders(prevFolders => 
      prevFolders.map(folder => 
        folder.folderId === folderId 
          ? { ...folder, profileIds } 
          : folder
      )
    );
  };

  return (
    <>
      {folders.map((folder) => {
        const showCreated = folder.createdAt != null;
        const showUpdated = folder.updatedAt != null && folder.updatedAt !== folder.createdAt;

        // Check if user is the creator of the album
        const isCreator = folder.creatorId === `${cognitoUsername}_____${cognitoUsername}____Account`;

        // Get password policy from folder data
        const passwordPolicy = folder.folderPassword?.policy || "NoPassword";

        let formattedTargetItemIdentifier = getTargetItemIdentifier(folder.folderId).replace(/-/g, '');
        const inviteLink = `https://6180.io/photos.html?id=${formattedTargetItemIdentifier}`;

        // Filter out files that have valid thumbnails or data keys
        const validFiles = folder.files.filter(file => 
          (file.thumbnailDataKey && file.thumbnailDataKey.length > 0) || 
          (file.dataKey && file.dataKey.length > 0)
        );

        return (
          <AlbumCard key={folder.folderId} isRTL={isRTL}>
            <AlbumLink href={inviteLink}>
              <AlbumContent>
                <AlbumHeader isRTL={isRTL}>
                  <AlbumDetails isRTL={isRTL}>
                    <AlbumTitle>
                      {folder.folderName || ""}
                    </AlbumTitle>
                    {(showCreated || showUpdated) && (
                      <AlbumDates isRTL={isRTL}>
                        {showCreated && folder.createdAt && formatDate(folder.createdAt) && (
                          <div>{t('Created')}: {formatDate(folder.createdAt)}</div>
                        )}
                        {showUpdated && folder.updatedAt && formatDate(folder.updatedAt) && (
                          <div>{t('Updated')}: {formatDate(folder.updatedAt)}</div>
                        )}
                      </AlbumDates>
                    )}
                  </AlbumDetails>
                </AlbumHeader>
                
                {/* Only show the image container if there are valid files */}
                {validFiles.length > 0 && (
                  <ImageContainer>
                    <ImageScroller isRTL={isRTL}>
                      {validFiles.map((file, i) => (
                        <ImageItem key={i}>
                          <LazyImage
                            thumbnailDataKey={file.thumbnailDataKey}
                            dataKey={file.dataKey}
                            alt={t('Thumbnail')}
                            style={{
                              width: 160,
                              height: 100,
                              objectFit: "cover",
                              borderRadius: 6,
                              border: "1px solid #ddd",
                            }}
                          />
                        </ImageItem>
                      ))}
                    </ImageScroller>
                    
                    {validFiles.length > 3 && (
                      <ImageShadow isRTL={isRTL} />
                    )}
                  </ImageContainer>
                )}
                
                {/* Password Policy Indicator */}
                <PasswordPolicy isRTL={isRTL}>
                  {passwordPolicy !== "NoPassword" && (
                    <PolicyIndicator>
                      <span>{getPasswordPolicyText(passwordPolicy)}</span>
                    </PolicyIndicator>
                  )}
                </PasswordPolicy>
                
                {/* Album description section */}
                <AlbumDescription isRTL={isRTL}>
                  {folder.folderDescription && folder.folderDescription.length > 1 
                    ? folder.folderDescription 
                    : ""}
                </AlbumDescription>
                
                {/* Updated AlbumFooter with public profile toggle capability */}
                <AlbumFooter
                  folder={folder}
                  isOwner={isCreator}
                  hasAddPhotoPermission={hasAddPhotoPermission}
                  cognitoUsername={cognitoUsername}
                  openFilePicker={openFilePicker}
                  updateProfileIds={updateFolderProfileIds}
                />
              </AlbumContent>
            </AlbumLink>
          </AlbumCard>
        );
      })}
    </>
  );
};

// FileInput Component - for adding photos to albums when authorized
interface FileInputProps {
  onFileSelection: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ onFileSelection }, ref) => {
    return (
      <input
        type="file"
        accept="image/*,video/*"
        onChange={onFileSelection}
        multiple
        style={{ display: "none" }}
        ref={ref}
      />
    );
  }
);

// Main PersonaViewer Component
const PersonaViewer: React.FC = () => {
  // Use a regular ref instead of the hook for simplicity
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [ownerItemId, setOwnerItemId] = useState<string>("");
  const [profileUsername, setProfileUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [cognitoUsername, setCognitoUsername] = useState<string | null>(null);
  
  // File picker state
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  
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
        fetchRelationsInput: fetchRelationsInput
      };
      
      // GraphQL query
      const FETCH_FOLDERS_QUERY = `
        mutation FetchFolderPositions($fetchRelationsInput: FetchRelationsInput!) {
          fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
            items {
              ... on FolderPosition {
                id
                profileIds
                folder {
                  id
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
      
      // Process results
      if (result?.data?.fetchRelations?.items) {
        const items = result.data.fetchRelations.items;
        
        // Transform data to match the Folder type
        const parsedFolders: Folder[] = items.map((item: any) => {
          const folder = item.folder;
          const files = folder?.fileReferencesPage?.items?.map((ref: any) => ref.file) || [];
          
          return {
            folderPositionId: item.id,
            folderId: folder.id,
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
  
  // File upload logic
  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    
    // Redirect to album editor with folderId
    if (e.target.value && e.target.files?.length) {
      // Store file selection in localStorage temporarily
      // In a real implementation, you would integrate with your upload process
      // For now, just redirect to the save-album page
      localStorage.setItem(LOCAL_STORAGE_KEYS.SELECTED_PHOTOS, JSON.stringify(files.map(f => ({ 
        name: f.name,
        size: f.size,
        type: f.type 
      }))));
      
      if (currentFolderId) {
        window.location.href = `/save-album.html?folderId=${encodeURIComponent(currentFolderId)}`;
      } else {
        window.location.href = "/save-album.html";
      }
    }
    
    // Clear input value
    if (e.target) e.target.value = "";
  };
  
  // Function to open file picker with specific folder
  const openFilePicker = (folderId: string) => {
    setCurrentFolderId(folderId);
    fileInputRef.current?.click();
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
  
  // Determine if the current user is allowed to add photos
  const hasAddPhotoPermission = isLoggedIn;

  return (
    <>
      <GlobalStyle />
      
      <MainContainer>
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
          <LoadingState>
            <p>{t('Loading albums...')}</p>
          </LoadingState>
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
            isOwner={isOwner}
            hasAddPhotoPermission={hasAddPhotoPermission}
            cognitoUsername={cognitoUsername}
            openFilePicker={openFilePicker}
          />
        )}
        
        {/* File Input for adding photos when authorized */}
        {isLoggedIn && (
          <FileInput 
            onFileSelection={handleFileSelection} 
            ref={fileInputRef}
          />
        )}
      </MainContainer>
    </>
  );
};

// Initialize the app with I18nProvider
ReactDOM.createRoot(document.getElementById("root")!).render(
  <I18nProvider initialLanguage={localStorage.getItem(LOCAL_STORAGE_KEYS.LANGUAGE) as SupportedLanguage || 'en'}>
    <PersonaViewer />
  </I18nProvider>
);