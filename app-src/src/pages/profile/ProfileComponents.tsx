import React, { useState, useEffect } from "react";
import { 
  checkLoginWithoutRedirect, 
  getTargetItemIdentifier, 
  formatDate 
} from "@/lib/utils";
import {
  AWS_PRIVATE_GRAPHQL_ENDPOINT
} from "@/lib/config";
import { useTranslation } from "@/components/LanguageSelector";
import { getLanguageDirection } from "@/lib/i18n";
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
  AlbumDescription
} from "@/styles/profile-styled-components.tsx";

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

// ProfileHeader Component
export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
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

// AlbumFooter Component
interface AlbumFooterProps {
  folder: Folder;
  isOwner: boolean;
  hasAddPhotoPermission: boolean;
  cognitoUsername: string | null;
  openFilePicker?: (folderId: string) => void;
  updateProfileIds?: (folderId: string, profileIds: string[]) => void;
}

export const AlbumFooter: React.FC<AlbumFooterProps> = ({
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

// AlbumList Component
interface AlbumListProps {
  folders: Folder[];
  setFolders: React.Dispatch<React.SetStateAction<Folder[]>>;
  isOwner: boolean;
  hasAddPhotoPermission: boolean;
  cognitoUsername: string | null;
  openFilePicker?: (folderId: string) => void;
}

export const AlbumList: React.FC<AlbumListProps> = ({ 
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
                
                {/* AlbumFooter with public profile toggle capability */}
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

// FileInput Component
interface FileInputProps {
  onFileSelection: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
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

// Export types for use in other files
export type { Folder, FolderPassword, ProfileHeaderProps, AlbumFooterProps, AlbumListProps, FileInputProps };