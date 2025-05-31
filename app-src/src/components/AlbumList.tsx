import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { FolderType } from "@/lib/types";
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n";
import { formatDate, generateInviteLink, generateUrl } from "@/lib/utils";
import { LazyImage } from "./LazyImage";
import { FooterSection } from "./FooterSection";
import { S3_BUCKET_URL } from "@/lib/config";
import { 
  PolicyIndicator, 
  AlbumDescription,
  FileCount,
  State,
  AlbumDates
} from "@/styles/styled-components.tsx";

// Helper function to format bytes into human-readable format
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${Math.round((bytes / Math.pow(k, i)) * 100) / 100} ${sizes[i]}`;
};

// Helper function to calculate total size of files in a folder
const calculateTotalSize = (files: Array<{ dataInBytes?: number }>): number => {
  return files.reduce((total, file) => {
    return total + (file.dataInBytes || 0);
  }, 0);
};

// Styled Components (from original AlbumList.tsx)
const Container = styled.div<{ isRTL: boolean }>`
  margin-bottom: 30px;
  width: 100%;
  direction: ${props => props.isRTL ? "rtl" : "ltr"};
`;

const AlbumLink = styled.a`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  overflow: hidden;
`;

const AlbumCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: box-shadow 0.2s ease;
  width: 100%;
  max-width: 100%;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;

  &:hover {
    box-shadow: 0 6px 16px rgba(0,0,0,0.08);
  }
`;

const HeaderSection = styled.div<{ isRTL: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
  flex-direction: ${props => props.isRTL ? "row-reverse" : "row"};
`;

const TitleSection = styled.div<{ isRTL: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.isRTL ? "flex-end" : "flex-start"};
`;

const AlbumTitle = styled.h2`
  font-size: 20px;
  margin: 0;
  color: #222;
`;

const ActionSection = styled.div<{ isRTL: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.isRTL ? "flex-start" : "flex-end"};
  justify-content: flex-end;
  gap: 8px;
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const EditLink = styled.a`
  font-size: 13px;
  color: #2196f3;
  text-decoration: none;
`;

const DeleteLink = styled.a`
  font-size: 13px;
  color: #d32f2f;
  text-decoration: none;
`;

const DropdownMenu = styled.div<{ isRTL: boolean }>`
  display: none;
  position: absolute;
  top: 100%;
  right: ${props => props.isRTL ? "auto" : 0};
  left: ${props => props.isRTL ? 0 : "auto"};
  background-color: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-radius: 4px;
  z-index: 10;
  min-width: 150px;
  padding: 8px 0;
  margin-top: 5px;
  text-align: ${props => props.isRTL ? "right" : "left"};
`;

const DropdownItem = styled.a<{ isDelete?: boolean }>`
  display: block;
  padding: 8px 16px;
  color: ${props => props.isDelete ? "#d32f2f" : "#2196f3"};
  text-decoration: none;
  font-size: 13px;
  white-space: nowrap;
`;

const GalleryContainer = styled.div`
  width: 100%;
  position: relative;
`;

const GalleryScroll = styled.div<{ isRTL: boolean }>`
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding-bottom: 8px;
  ms-overflow-style: none;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
  max-width: 100%;
  flex-direction: ${props => props.isRTL ? "row-reverse" : "row"};
`;

const GradientOverlay = styled.div<{ isRTL: boolean }>`
  position: absolute;
  ${props => props.isRTL ? "left" : "right"}: 0;
  top: 0;
  bottom: 8px;
  width: 30px;
  background: ${props => props.isRTL
    ? "linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))"
    : "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))"};
  pointer-events: none;
`;

const PasswordPolicyContainer = styled.div<{ isRTL: boolean }>`
  display: flex;
  justify-content: ${props => props.isRTL ? "flex-start" : "flex-end"};
  margin-top: 8px;
  margin-bottom: 8px;
`;

const ContactsContainer = styled.div<{ isRTL: boolean }>`
  width: 100%;
  background-color: #f0f7ff;
  border-radius: 8px;
  padding: 12px 16px;
  margin-top: 16px;
  box-sizing: border-box;
  border: 1px solid #d0e1f9;
  direction: ${props => props.isRTL ? "rtl" : "ltr"};
`;

const ContactsText = styled.p<{ isRTL: boolean }>`
  margin: 0;
  font-size: 14px;
  color: #333;
  text-align: ${props => props.isRTL ? "right" : "left"};
`;

// Create a wrapper component instead of directly styling LazyImage
const ThumbnailWrapper = styled.div`
  width: 160px;
  height: 100px;
  flex-shrink: 0;
`;

// Props for the unified AlbumList component
export interface AlbumListProps {
  folders: FolderType[];
  setFolders?: React.Dispatch<React.SetStateAction<any[]>>;
  handleDeleteClick?: (folderPositionId: string, t?: any) => void;
  openFilePicker?: (folderId: string | null | undefined) => void;
  isUploading?: boolean;
  cognitoUsername: string | null;
  isProfileView?: boolean;
}

// The unified AlbumList component
export const AlbumList: React.FC<AlbumListProps> = ({
  folders,
  setFolders,
  handleDeleteClick,
  openFilePicker,
  isUploading = false,
  cognitoUsername,
  isProfileView = false,
}) => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";

  // Reference to keep track of active dropdown menu
  const activeDropdownRef = useRef<HTMLElement | null>(null);

  // Function to handle clicks outside dropdown menu and scrolling
  useEffect(() => {
    // Function to close active dropdown
    function closeActiveDropdown() {
      if (activeDropdownRef.current) {
        activeDropdownRef.current.style.display = "none";
        activeDropdownRef.current = null;
      }
    }

    // Handle scroll events only - removed document click handler
    function handleScroll() {
      closeActiveDropdown();
    }

    // Add only scroll event listener
    window.addEventListener("scroll", handleScroll, true); // Use capture phase to detect all scrolling
    
    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  // Function to toggle dropdown visibility
  const toggleDropdown = (e: React.MouseEvent, dropdownElement: HTMLElement) => {
    e.preventDefault();
    e.stopPropagation();
    
    // If there's already an open dropdown and it's not this one, close it
    if (activeDropdownRef.current && activeDropdownRef.current !== dropdownElement) {
      activeDropdownRef.current.style.display = "none";
    }
    
    // Toggle current dropdown
    const isVisible = dropdownElement.style.display === "block";
    dropdownElement.style.display = isVisible ? "none" : "block";
    
    // Update the active dropdown reference
    activeDropdownRef.current = isVisible ? null : dropdownElement;
  };

  // New function to initiate delete process with system dialog
  const handleDeleteButtonClick = (folderPositionId: string) => {
    // Close any open dropdown
    if (activeDropdownRef.current) {
      activeDropdownRef.current.style.display = "none";
      activeDropdownRef.current = null;
    }
    
    // Use the browser's native confirm dialog
    const confirmDelete = window.confirm(t('Are you sure you want to delete this album? This action cannot be undone.'));
    
    if (confirmDelete && handleDeleteClick) {
      handleDeleteClick(folderPositionId, t);
    }
  };

  // Helper function to update folder profileIds
  const updateFolderProfileIds = (folderId: string, profileIds: string[]) => {
    if (setFolders) {
      setFolders(prevFolders => 
        prevFolders.map(folder => 
          folder.folderId === folderId 
            ? { ...folder, profileIds } 
            : folder
        )
      );
    }
  };

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

  if (folders.length === 0 && !isUploading) {
    return (
      <State type="empty">
        <p>{t('No albums found')}</p>
      </State>
    );
  }

  // Render for profile view (using the profile-styled-components)
  if (isProfileView) {
    return (
      <>
        {folders.map((folder) => {
          // Get password policy from folder data
          const passwordPolicy = folder.folderPassword?.policy || "NoPassword";

          const inviteLink = generateInviteLink(
            folder.folderId,
            folder.albumNanoId || null,
            folder.creatorId && folder.contacts && folder.contacts[folder.creatorId] ,
            folder.folderName
          );

          return (
            <Container key={folder.folderId} isRTL={isRTL}>
              <AlbumLink href={inviteLink}>
                <AlbumCard>
                  <HeaderSection isRTL={isRTL}>
                    <TitleSection isRTL={isRTL}>
                      <AlbumTitle>{folder.folderName || ""}</AlbumTitle>
                    </TitleSection>
                  </HeaderSection>

                  {/* Album description section */}
                  {folder.folderDescription && folder.folderDescription.length > 1 && (
                    <AlbumDescription isRTL={isRTL}>
                      {folder.folderDescription}
                    </AlbumDescription>
                  )}

                  <GalleryContainer>
                    <GalleryScroll isRTL={isRTL}>
                      {folder.files.map((file, i) => (
                        <ThumbnailWrapper key={i}>
                          <LazyImage
                            thumbnailDataKey={file.thumbnailDataKey}
                            dataKey={file.dataKey}
                            src={`${S3_BUCKET_URL}${file.thumbnailDataKey || file.dataKey}`}
                            alt={t('Thumbnail')}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              borderRadius: 6,
                              border: '1px solid #ddd'
                            }}
                          />
                        </ThumbnailWrapper>
                      ))}
                    </GalleryScroll>
                    
                    {folder.files.length > 3 && (
                      <GradientOverlay isRTL={isRTL} />
                    )}
                  </GalleryContainer>
                  
                  {/* Password Policy Indicator */}
                  <PasswordPolicyContainer isRTL={isRTL}>
                    {passwordPolicy !== "NoPassword" && (
                      <PolicyIndicator>
                        <span>{getPasswordPolicyText(passwordPolicy)}</span>
                      </PolicyIndicator>
                    )}
                  </PasswordPolicyContainer>
                </AlbumCard>
              </AlbumLink>
            </Container>
          );
        })}
      </>
    );
  }

  // Default render for my-albums view
  return (
    <>
      {folders.map((folder) => {
        const showCreated = folder.createdAt != null;
        const showUpdated = folder.updatedAt != null && folder.createdAt != null && folder.updatedAt !== folder.createdAt;

        // Check if user is the creator of the album
        const isCreator = folder.creatorId === `${cognitoUsername}_____${cognitoUsername}____Account`;

        // Get password policy from folder data
        const passwordPolicy = folder.folderPassword?.policy || "NoPassword";

        // Get the contacts from the folder's contactsUsingInvite
        const contacts = folder.contacts || {};
        const contactNames = Object.values(contacts).filter(contact => 
          contact && typeof contact === 'string' && !contact.toString().startsWith('Profile-')
        );

        // Calculate total size of files in this folder
        const totalSize = calculateTotalSize(folder.files);

        const inviteLink = generateInviteLink(
          folder.folderId,
          folder.albumNanoId || null,
          folder.creatorId && folder.contacts && folder.contacts[folder.creatorId],
          folder.folderName
        );

        return (
          <Container key={folder.folderId} isRTL={isRTL}>
            <AlbumLink href={inviteLink}>
              <AlbumCard>
                <HeaderSection isRTL={isRTL}>
                  <TitleSection isRTL={isRTL}>
                    <AlbumTitle>{folder.folderName || ""}</AlbumTitle>
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
                  </TitleSection>
                  
                  <ActionSection isRTL={isRTL}>
                    {isCreator ? (
                      <DropdownContainer>
                        <EditLink
                          href="#"
                          onClick={(e) => {
                            const dropdownMenu = e.currentTarget.nextElementSibling as HTMLElement;
                            if (dropdownMenu) {
                              toggleDropdown(e, dropdownMenu);
                            }
                          }}
                        >
                          {t('Edit')}
                        </EditLink>
                        <DropdownMenu
                          isRTL={isRTL}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <DropdownItem
                            href={generateUrl(`save-album.html?folderId=${encodeURIComponent(folder.folderId)}`)}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            {t('Edit Details')}
                          </DropdownItem>
                          <DropdownItem
                            href="#"
                            isDelete
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleDeleteButtonClick(folder.folderPositionId);
                            }}
                          >
                            {t('Delete My Copy')}
                          </DropdownItem>
                        </DropdownMenu>
                      </DropdownContainer>
                    ) : (
                      <DeleteLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDeleteButtonClick(folder.folderPositionId);
                        }}
                      >
                        {t('Delete')}
                      </DeleteLink>
                    )}
                  </ActionSection>
                </HeaderSection>

                {/* Album description section */}
                {folder.folderDescription && folder.folderDescription.length > 1 && (
                  <AlbumDescription isRTL={isRTL}>
                    {folder.folderDescription}
                  </AlbumDescription>
                )}

                <FileCount isRTL={isRTL}>
                  {folder.files.length === 1 
                    ? `${t('{{count}} file', { count: folder.files.length.toString() })} • ${formatFileSize(totalSize)}`
                    : `${t('{{count}} files', { count: folder.files.length.toString() })} • ${formatFileSize(totalSize)}`
                  }
                </FileCount>

                <GalleryContainer>
                  <GalleryScroll isRTL={isRTL}>
                    {folder.files.map((file, i) => (
                      <ThumbnailWrapper key={i}>
                        <LazyImage
                          thumbnailDataKey={file.thumbnailDataKey}
                          dataKey={file.dataKey}
                          src={`${S3_BUCKET_URL}${file.thumbnailDataKey || file.dataKey}`}
                          alt={t('Thumbnail')}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: 6,
                            border: '1px solid #ddd'
                          }}
                        />
                      </ThumbnailWrapper>
                    ))}
                  </GalleryScroll>
                  
                  {folder.files.length > 3 && (
                    <GradientOverlay isRTL={isRTL} />
                  )}
                </GalleryContainer>
                
                {/* Password Policy Indicator */}
                <PasswordPolicyContainer isRTL={isRTL}>
                  {passwordPolicy !== "NoPassword" && (
                    <PolicyIndicator>
                      <span>{getPasswordPolicyText(passwordPolicy)}</span>
                    </PolicyIndicator>
                  )}
                </PasswordPolicyContainer>
                
                {/* Pass the folder to the FooterSection with additional props */}
                {isProfileView == false && FooterSection && (
                  <FooterSection
                    folder={folder}
                    openFilePicker={openFilePicker}
                    cognitoUsername={cognitoUsername}
                    updateProfileIds={(profileIds) => updateFolderProfileIds(folder.folderId, profileIds)}
                  />
                )}

                {/* Display contacts list if available */}
                {contactNames.length > 0 && (
                  <ContactsContainer isRTL={isRTL}>
                    <ContactsText isRTL={isRTL}>
                      {t('Shared with')}: {contactNames.join(', ')}
                    </ContactsText>
                  </ContactsContainer>
                )}
              </AlbumCard>
            </AlbumLink>
          </Container>
        );
      })}
    </>
  );
};