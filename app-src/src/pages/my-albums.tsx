import React from "react"
import ReactDOM from "react-dom/client"
import { useEffect, useState, useRef } from "react"
import { checkLoginOrRedirect, generateUUID, getOwnerItemId, getTargetItemIdentifier } from "@/lib/utils"
import { GRAPHQL_ENDPOINT, STORAGE_KEYS } from "@/lib/config"
import JSZip from 'jszip'
import { 
  Folder, 
  SelectedPhoto, 
  ProgressTracker,
  FolderType
} from "@/lib/types"
import { SupportedLanguage } from "@/lib/i18n/translations"
import { LogoutButton } from "@/components/LogoutButton"
import { LazyImage } from "@/components/LazyImage"
import { UploadProgress } from "@/components/UploadProgress"
import { FileInput } from "@/components/FileInput"
import { DebugLog } from "@/components/DebugLog"
import { S3_BUCKET_URL } from "@/lib/config"
import { formatDate } from "@/lib/utils"
import { getLanguageDirection } from "@/lib/i18n"
import { 
  I18nProvider, 
  // LanguageSelector,
  useTranslation
} from "@/lib/i18n/react"

// Import the utilities from file-upload-utils.ts
import { 
  createLogger, 
  createPhotoStatusUpdater, 
  updateProgressTracker,
  processFiles,
  clearAlbumData
} from "@/lib/file-upload-utils"

// Header Component
type HeaderProps = {
  publicUsername: string | null;
  isUploading: boolean;
  openFilePicker: (folderId: string | null) => void;
};

export const Header: React.FC<HeaderProps> = ({ 
  publicUsername, 
  isUploading, 
  openFilePicker
}) => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
          width: "100%"
        }}
      >
        <div
          style={{
            order: isRTL ? 2 : 1
          }}
        >
          <button
            onClick={() => openFilePicker(null)}
            style={{
              fontSize: "14px",
              padding: "8px 16px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              opacity: isUploading ? 0.6 : 1,
              pointerEvents: isUploading ? "none" : "auto"
            }}
            disabled={isUploading}
          >
            {isUploading ? t('Uploading...') : t('Create Album')}
          </button>
        </div>
        
        <div 
          style={{
            order: isRTL ? 1 : 2
          }}
        >
          <button
            onClick={() => {
              alert(t('Feature coming soon: "Show all public albums with a link to share with other users"'));
            }}
            style={{
              fontSize: "14px",
              padding: "8px 16px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            {t('My Public Profile')}
          </button>
        </div>
      </div>
      
      {/* Second row with username and Log Out button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
          width: "100%",
          flexDirection: isRTL ? "row-reverse" : "row"
        }}
      >
        {publicUsername && (
          <div style={{ fontSize: "16px", color: "#666" }}>{publicUsername}</div>
        )}

        {publicUsername && (
          <LogoutButton 
            t={t}
          />
        )}
      </div>
    </>
  );
};

// App Promo Component
type AppPromoProps = {
  t: (key: string) => string;
  isRTL: boolean;
};

const AppPromo: React.FC<AppPromoProps> = ({ t, isRTL }) => {
  return (
    <div 
      style={{
        width: "100%", 
        marginBottom: 24,
        backgroundColor: "#f0f7ff",
        padding: "12px 16px",
        borderRadius: "8px",
        boxSizing: "border-box",
        direction: isRTL ? "rtl" : "ltr",
        border: "1px solid #cce0ff",
        textAlign: isRTL ? "right" : "left" as const
      }}
    >
      <a 
        href="https://apps.apple.com/app/6180/id6468679610"
        style={{
          color: "#2196f3",
          textDecoration: "none",
          fontSize: "14px",
          display: "block",
          width: "100%",
        }}
        target="_blank"
        rel="noopener noreferrer"
      >
        {t('Get the iPhone app to be notified when people have added pictures to an album and to filter your albums by tags and contacts.')}
      </a>
    </div>
  );
};

// Search Bar Component
type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  t: (key: string) => string;
  isRTL: boolean;
};

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery, t, isRTL }) => {
  return (
    <div 
      style={{
        width: "100%", 
        marginBottom: 24,
        boxSizing: "border-box", // Include padding in width calculation
        direction: isRTL ? "rtl" : "ltr"
      }}
    >
      <input
        type="text"
        placeholder={t('Search album title or description')}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "10px 16px",
          fontSize: "14px",
          border: "1px solid #ddd",
          borderRadius: "6px",
          outline: "none",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          boxSizing: "border-box", // Include padding in width calculation
        }}
      />
    </div>
  );
};

// Types for the modal components
interface CopyLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  inviteLink: string;
  onCopy: (text: string) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: (key: string) => string;
  isRTL: boolean;
}

// CopyLinkModal Component with proper TypeScript types
const CopyLinkModal: React.FC<CopyLinkModalProps> = ({ 
  isOpen, 
  onClose, 
  inviteLink, 
  onCopy,
  t,
  isRTL
}) => {
  if (!isOpen) return null;

  // Define textAlign value with proper type
  const textAlignValue: "left" | "right" | "center" = isRTL ? "right" : "left";

  // Common button style with properly typed textAlign
  const buttonStyle = {
    width: "100%",
    padding: "12px",
    margin: "8px 0",
    border: "1px solid #ddd",
    borderRadius: "6px",
    backgroundColor: "#fff",
    textAlign: textAlignValue, // Use the typed value
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.2s"
  };

  return (
    <div 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "20px",
          width: "90%",
          maxWidth: "400px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
          direction: isRTL ? "rtl" : "ltr",
          textAlign: textAlignValue, // Use the typed value
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ marginTop: 0, marginBottom: "16px", fontSize: "18px" }}>
          {t('Choose a message template')}
        </h3>
        
        <button
          style={buttonStyle}
          onClick={() => onCopy(inviteLink)}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f5f5f5"}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#fff"}
        >
          {t('Link Only')}
        </button>
        
        <button
          style={buttonStyle}
          onClick={() => onCopy(`${t('Here are photos from our event')}: ${inviteLink}`)}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f5f5f5"}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#fff"}
        >
          {t('View Album Photos')}
        </button>
        
        <button
          style={buttonStyle}
          onClick={() => onCopy(`${t('Please add any photos from our event here')}: ${inviteLink}`)}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f5f5f5"}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#fff"}
        >
          {t('Add Photos To Album')}
        </button>
        
        <button
          style={{
            ...buttonStyle,
            backgroundColor: "#f0f0f0",
            marginTop: "16px"
          }}
          onClick={onClose}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#e0e0e0"}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
        >
          {t('Cancel')}
        </button>
      </div>
    </div>
  );
};

// Confirmation Modal Component with proper TypeScript types
const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ 
  isOpen, 
  onClose, 
  t,
  isRTL
}) => {
  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "20px",
          width: "90%",
          maxWidth: "400px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
          direction: isRTL ? "rtl" : "ltr",
          textAlign: isRTL ? "right" : "left" as const, // Use as const to fix type issue
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ marginTop: 0, marginBottom: "16px", fontSize: "18px" }}>
          {t('Link to album website copied.')}
        </h3>
        
        <button
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            backgroundColor: "#f0f0f0",
            textAlign: "center" as const, // Use as const to fix type issue
            cursor: "pointer",
            fontSize: "14px"
          }}
          onClick={onClose}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#e0e0e0"}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
        >
          {t('OK')}
        </button>
      </div>
    </div>
  );
};

// FooterSection Component
type FooterSectionProps = {
  folder: FolderType;
  openFilePicker: (folderId: string | null) => void;
};

export const FooterSection: React.FC<FooterSectionProps> = ({
  folder,
  openFilePicker
}) => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [showingCopyLinkAlert, setShowingCopyLinkAlert] = useState<boolean>(false);
  const [showingCopiedLinkAlert, setShowingCopiedLinkAlert] = useState<boolean>(false);

  // Generate the invite link
  const folderInvite = `${getOwnerItemId(folder.folderId)}_${getTargetItemIdentifier(folder.folderId)}`;
  const inviteLink = `https://6180.io/photos.html?id=${folderInvite}`;
  
  // Handle copy function
  const handleCopy = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setShowingCopyLinkAlert(false);
        setShowingCopiedLinkAlert(true);
      })
      .catch(err => {
        console.error("Failed to copy link:", err);
        alert(t('Failed to copy link'));
      });
  };

  const handleAddToPublicProfileClick = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    // Add to public profile functionality would go here
    alert(t('Feature coming soon: "Make album accessible on your public profile"'));
  };

  const handleDownloadAlbumClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!folder.files || folder.files.length === 0) {
      alert(t('No files to download in this album.'));
      return;
    }
    
    try {
      // Set downloading state
      setIsDownloading(true);
      
      // Create a new JSZip instance
      const zip = new JSZip();
      
      // Create a folder inside the zip with the album name
      const folderName = folder.folderName || 'Album';
      const albumFolder = zip.folder(folderName);
      
      if (!albumFolder) {
        throw new Error('Failed to create folder in zip');
      }
      
      // Add files to the zip
      const downloadPromises = folder.files.map(async (file, index) => {
        try {
          // Determine which S3 key to use - original file, not thumbnail
          const s3Key = file.dataKey;
          
          if (!s3Key) {
            console.warn('File missing dataKey:', file);
            return null;
          }
          
          // Get file from S3
          const response = await fetch(`${S3_BUCKET_URL}${s3Key}`);
          
          if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`);
          }
          
          // Get the blob data
          const blob = await response.blob();
          
          // Generate a filename from the S3 key
          const filename = s3Key.split('/').pop() || `file_${index + 1}`;
          
          // Add file to the zip
          albumFolder.file(filename, blob);
          
          return true;
        } catch (error) {
          console.error('Error downloading file:', error);
          return null;
        }
      });
      
      // Wait for all downloads to complete
      await Promise.all(downloadPromises);
      
      // Generate the zip file
      const content = await zip.generateAsync({ type: 'blob' });
      
      // Create a download link
      const downloadUrl = URL.createObjectURL(content);
      const downloadLink = document.createElement('a');
      downloadLink.href = downloadUrl;
      downloadLink.download = `${folderName}.zip`;
      
      // Trigger download
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      // Clean up
      URL.revokeObjectURL(downloadUrl);
      
    } catch (error) {
      console.error('Error creating ZIP file:', error);
      alert(t('Failed to create ZIP file. Please try again.'));
    } finally {
      // Reset downloading state
      setIsDownloading(false);
    }
  };

  // Common button style to avoid repetition
  const buttonStyle = {
    padding: "8px 12px",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 14,
    textAlign: "center" as const, // Use const assertion to fix type issue
    whiteSpace: "nowrap" as const, // Use const assertion to fix type issue
    flexShrink: 0
  };

  return (
    <>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: 16,
        flexDirection: isRTL ? "row-reverse" : "row"
      }}>
        <div style={{ 
          display: "flex",
          width: "100%", 
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          flexDirection: isRTL ? "row-reverse" : "row",
          gap: "10px"
        }}>
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexDirection: isRTL ? "row-reverse" : "row"
            }}
          >
            <button
              onClick={(e) => {
                e.preventDefault(); 
                e.stopPropagation();
                openFilePicker(folder.folderId);
              }}
              style={{
                ...buttonStyle,
                backgroundColor: "#4caf50",
                color: "white",
              }}
            >
              {t('Add Photos')}
            </button>
            
            <button
              onClick={(e) => {
                e.preventDefault(); 
                e.stopPropagation();
                setShowingCopyLinkAlert(true);
              }}
              style={{
                ...buttonStyle,
                backgroundColor: "#e0e0e0",
              }}
            >
              {t('Copy Link')}
            </button>
            
            <button
              onClick={handleDownloadAlbumClick}
              style={{
                ...buttonStyle,
                backgroundColor: "#e0e0e0",
                opacity: isDownloading ? 0.7 : 1,
                cursor: isDownloading ? "default" : "pointer",
              }}
              disabled={isDownloading}
            >
              {isDownloading ? t('Preparing...') : t('Download Album')}
            </button>
            
            <button
              onClick={handleAddToPublicProfileClick}
              style={{
                ...buttonStyle,
                backgroundColor: "#e0e0e0",
              }}
            >
              {t('Add To Public Profile')}
            </button>
          </div>
        </div>
        
        {/* Copy Link Modals */}
        <CopyLinkModal
          isOpen={showingCopyLinkAlert}
          onClose={() => setShowingCopyLinkAlert(false)}
          inviteLink={inviteLink}
          onCopy={handleCopy}
          t={t}
          isRTL={isRTL}
        />
        
        <ConfirmationModal
          isOpen={showingCopiedLinkAlert}
          onClose={() => setShowingCopiedLinkAlert(false)}
          t={t}
          isRTL={isRTL}
        />
        
        {/* Hide scrollbar for WebKit browsers */}
        <style>
          {`
            div::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
      </div>
    </>
  );
};

// AlbumList Component
// Import types
// Note: In a real implementation, this would be imported from the types.ts file
// import { FolderType, PasswordPolicyEnum } from "@/lib/types";

type AlbumListProps = {
  folders: FolderType[];
  handleDeleteClick: (folderPositionId: string) => void;
  openFilePicker: (folderId: string | null) => void;
  isUploading: boolean;
  cognitoUsername: string | null;
};

export const AlbumList: React.FC<AlbumListProps> = ({ 
  folders, 
  handleDeleteClick, 
  openFilePicker,
  isUploading,
  cognitoUsername
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

    // Handle clicks outside the dropdown
    function handleClickOutside(event: MouseEvent) {
      if (activeDropdownRef.current && !activeDropdownRef.current.contains(event.target as Node)) {
        closeActiveDropdown();
      }
    }

    // Handle scroll events
    function handleScroll() {
      closeActiveDropdown();
    }

    // Add event listeners
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, true); // Use capture phase to detect all scrolling
    
    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
    return <p style={{ fontSize: 16, color: "#555", width: "100%" }}>{t('No albums found')}</p>;
  }

  return (
    <>
      {folders.map((folder) => {
        const showCreated = folder.createdAt != null;
        const showUpdated = folder.updatedAt != null && folder.updatedAt !== folder.createdAt;

        // Check if user is the creator of the album
        const isCreator = folder.creatorId === `${cognitoUsername}_____${cognitoUsername}____Account`;

        // Get password policy from folder data
        const passwordPolicy = folder.folderPassword?.policy || "NoPassword";

        return (
          <div
            key={folder.folderId}
            style={{
              marginBottom: 30,
              width: "100%",
              direction: isRTL ? "rtl" : "ltr"
            }}
          >
            <a
              href={`https://6180.io/photos.html?id=${getOwnerItemId(folder.folderId)}_${getTargetItemIdentifier(folder.folderId)}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
                width: "100%",
                overflow: "hidden"
              }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  padding: 20,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  transition: "box-shadow 0.2s ease",
                  width: "100%",
                  maxWidth: "100%",
                  position: "relative",
                  boxSizing: "border-box",
                  overflow: "hidden"
                }}
                onMouseOver={(e) =>
                  ((e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.08)"))
                }
                onMouseOut={(e) =>
                  ((e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)"))
                }
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end", // Changed from "center" to "flex-end" to bottom-align
                    marginBottom: 16,
                    flexDirection: isRTL ? "row-reverse" : "row"
                  }}
                >
                  <div style={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: isRTL ? "flex-end" : "flex-start" 
                  }}>
                    <h2 style={{ fontSize: 20, margin: 0, color: "#222" }}>
                      {folder.folderName || ""}
                    </h2>
                    {(showCreated || showUpdated) && (
                      <div style={{ 
                        fontSize: 13, 
                        color: "#777", 
                        textAlign: isRTL ? "right" : "left" as const,
                        marginTop: 4
                      }}>
                        {showCreated && <div>{t('Created')}: {formatDate(folder.createdAt)}</div>}
                        {showUpdated && <div>{t('Updated')}: {formatDate(folder.updatedAt)}</div>}
                      </div>
                    )}
                  </div>
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: isRTL ? "flex-start" : "flex-end",
                    justifyContent: "flex-end", // Added to ensure vertical alignment at the bottom
                    gap: "8px"
                  }}>
                    {isCreator ? (
                      <div style={{ position: "relative" }}>
                        <a
                          href="#"
                          onClick={(e) => {
                            const dropdownMenu = e.currentTarget.nextElementSibling as HTMLElement;
                            if (dropdownMenu) {
                              toggleDropdown(e, dropdownMenu);
                            }
                          }}
                          style={{
                            fontSize: "13px",
                            color: "#2196f3",
                            textDecoration: "none",
                          }}
                        >
                          {t('Edit')}
                        </a>
                        <div 
                          style={{
                            display: "none",
                            position: "absolute",
                            top: "100%",
                            right: isRTL ? "auto" : 0,
                            left: isRTL ? 0 : "auto",
                            backgroundColor: "white",
                            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                            borderRadius: "4px",
                            zIndex: 10,
                            minWidth: "150px",
                            padding: "8px 0",
                            marginTop: "5px",
                            textAlign: isRTL ? "right" : "left" as const
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <a
                            href={`/save-album.html?folderId=${encodeURIComponent(folder.folderId)}`}
                            style={{
                              display: "block",
                              padding: "8px 16px",
                              color: "#2196f3",
                              textDecoration: "none",
                              fontSize: "13px",
                              whiteSpace: "nowrap"
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            {t('Edit Details')}
                          </a>
                          <a
                            href="#"
                            style={{
                              display: "block",
                              padding: "8px 16px",
                              color: "#d32f2f",
                              textDecoration: "none",
                              fontSize: "13px",
                              whiteSpace: "nowrap"
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              
                              // Close dropdown first
                              if (activeDropdownRef.current) {
                                activeDropdownRef.current.style.display = "none";
                                activeDropdownRef.current = null;
                              }
                              
                              // Use setTimeout to ensure the dropdown has closed
                              setTimeout(() => {
                                const confirmDelete = window.confirm(t('Are you sure you want to delete this album?'));
                                if (confirmDelete) {
                                  handleDeleteClick(folder.folderPositionId);
                                }
                              }, 100);
                            }}
                          >
                            {t('Delete My Copy')}
                          </a>
                        </div>
                      </div>
                    ) : (
                      <a
                        href="#"
                        onClick={() => handleDeleteClick(folder.folderPositionId)}
                        style={{
                          fontSize: "13px",
                          color: "#d32f2f",
                          textDecoration: "none",
                        }}
                      >
                        {t('Delete')}
                      </a>
                    )}
                  </div>
                </div>
                
                <div 
                  style={{ 
                    width: "100%",
                    position: "relative",
                  }}
                >
                  <div 
                    style={{ 
                      display: "flex", 
                      overflowX: "auto",
                      gap: 12,
                      paddingBottom: 8,
                      msOverflowStyle: "none", 
                      scrollbarWidth: "thin",
                      WebkitOverflowScrolling: "touch",
                      maxWidth: "100%",
                      flexDirection: isRTL ? "row-reverse" : "row"
                    }}
                  >
                    {folder.files.map((file, i) => (
                      <LazyImage
                        key={i}
                        src={`${S3_BUCKET_URL}${file.thumbnailDataKey || file.dataKey}`}
                        alt={t('Thumbnail')}
                        style={{
                          width: 160,
                          height: 100,
                          objectFit: "cover",
                          borderRadius: 6,
                          border: "1px solid #ddd",
                          flexShrink: 0,
                        }}
                      />
                    ))}
                  </div>
                  
                  {folder.files.length > 3 && (
                    <div 
                      style={{
                        position: "absolute",
                        [isRTL ? "left" : "right"]: 0,
                        top: 0,
                        bottom: 8,
                        width: 30,
                        background: isRTL 
                          ? "linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))"
                          : "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))",
                        pointerEvents: "none",
                      }}
                    />
                  )}
                </div>
                
                {/* Password Policy Indicator - moved here under the pictures */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: isRTL ? "flex-start" : "flex-end",
                    marginTop: 8,
                    marginBottom: 8
                  }}
                >
                  {passwordPolicy !== "NoPassword" && (
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "12px",
                      color: "#555"
                    }}>
                      <span>{getPasswordPolicyText(passwordPolicy)}</span>
                    </div>
                  )}
                </div>
                
                {/* Album description section - updated to use folderDescription if available */}
                <div
                  style={{
                    marginTop: 8,
                    marginBottom: 16,
                    fontSize: 14,
                    color: "#555",
                    lineHeight: 1.5,
                    textAlign: isRTL ? "right" : "left" as const
                  }}
                >
                  {folder.folderDescription && folder.folderDescription.length > 1 
                    ? folder.folderDescription 
                    : ""}
                </div>
                
                {/* Pass the folder to the FooterSection */}
                <FooterSection
                  folder={folder}
                  openFilePicker={openFilePicker}
                />
              </div>
            </a>
          </div>
        );
      })}
    </>
  );
};

const MyAlbums = () => {
  const [folders, setFolders] = useState<Folder[]>([])
  const [publicUsername, setPublicUsername] = useState<string | null>(null)
  const [cognitoUsername, setCognitoUsername] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedPhotos, setSelectedPhotos] = useState<SelectedPhoto[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [progressTracker, setProgressTracker] = useState<ProgressTracker>({
    totalFiles: 0,
    filesComplete: 0,
    filesUploading: 0,
    filesProcessing: 0,
    filesWithError: 0,
    overallProgress: 0
  })
  const [debugMessages, setDebugMessages] = useState<string[]>([])
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>("")
  
  // Use the createLogger function from the utils
  const log = createLogger(setDebugMessages);
  
  // Load user data and fetch folders
  useEffect(() => {
    setPublicUsername(localStorage.getItem("publicUsername") || null)

    const token = checkLoginOrRedirect()
    if (!token) return

    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const username = payload["cognito:username"]
      setCognitoUsername(username)
    } catch (err) {
      console.error("Failed to decode token", err)
    }

    const fetchFolders = async () => {
      const query = `
        mutation FetchRelations($fetchRelationsInput: FetchRelationsInput!) {
          fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
            items {
              ... on FolderPosition {
                id
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
          }
        }
      `

      const variables = {
        fetchRelationsInput: {
          ownerItemId: "myAccountOwnerItemId",
          rangeKeyPrefix: "FolderPosition",
          index: "ownerItemId_____RelationType____sortParameter",
          limit: 50,
          scanIndexForward: false,
        },
      }

      try {
        const res = await fetch(GRAPHQL_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ query, variables }),
        })

        const json = await res.json()

        const items = json?.data?.fetchRelations?.items || []

        const parsed: Folder[] = items.map((item: any) => {
          const folder = item.folder
          const files = folder?.fileReferencesPage?.items?.map((ref: any) => ref.file) || []
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
          }
        })

        setFolders(parsed)
      } catch (err) {
        console.error("Failed to load folders:", err)
        log(`❌ Failed to fetch folders: ${String(err)}`)
      }
    }

    fetchFolders()
  }, [])

  // Use updateProgressTracker from the utils
  useEffect(() => {
    updateProgressTracker(selectedPhotos, setProgressTracker);
  }, [selectedPhotos]);

  // Use the clearAlbumData function from utils
  const handleClearAlbumData = () => {
    clearAlbumData(setSelectedPhotos, setProgressTracker, [], log);
    setIsUploading(false);
  }

  // Function to open file picker
  const openFilePicker = (folderId: string | null = null) => {
    // Set current folder ID if adding to existing folder
    setCurrentFolderId(folderId)
    
    // Clear current selected photos before opening file picker
    setSelectedPhotos([])
    fileInputRef.current?.click()
  }

  // Use the createPhotoStatusUpdater function from the utils
  const updatePhotoStatus = createPhotoStatusUpdater(setSelectedPhotos);

  // Handle file selection
  const handleFileSelection = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    setIsUploading(true)
    
    if (!cognitoUsername) {
      log("❌ Missing Cognito Username")
      setIsUploading(false)
      return
    }
  
    try {
      // Generate a new folder ID or use existing one
      const newFolderId = currentFolderId || `${cognitoUsername}_____${generateUUID()}____Folder`
      log(`📁 Using folder ID: ${newFolderId}`)
      
      // Use the processFiles function from utils instead of implementing it here
      const processedPhotos = await processFiles(files, cognitoUsername, updatePhotoStatus, log);
      
      // Save to localStorage - ONLY the keys and metadata, not the file data
      localStorage.setItem(STORAGE_KEYS.SELECTED_PHOTOS, JSON.stringify(processedPhotos))
      log(`📸 Saved ${processedPhotos.length} photos metadata to storage`)
      
      // Redirect to save-album page with folder ID parameter if adding to existing album
      if (currentFolderId) {
        window.location.href = `/save-album.html?folderId=${encodeURIComponent(currentFolderId)}`
      } else {
        window.location.href = "/save-album.html"
      }

      handleClearAlbumData()

    } catch (error) {
      log(`❌ Fatal error in handleFileSelection: ${String(error)}`)
      setIsUploading(false)
    } finally {
      // Clear the file input to allow selecting the same files again
      if (e.target) e.target.value = ""
    }
  }

  // Handle deletion confirmation dialog
  const handleDeleteClick = async (folderPositionId: string) => {
    try {
      console.log("Deleting album with id:", folderPositionId)
      
      const token = localStorage.getItem("token") || checkLoginOrRedirect()
      if (!token) {
        console.error("No token found")
        return
      }
      
      const deleteQuery = `
        mutation DeleteFolderPosition($deletedFolderPositionIds: [ID!]) {
          changeFiles(deletedFolderPositionIds: $deletedFolderPositionIds) {
            items {
              ... on IdObject {
                id
              }
            }
          }
        }
      `
      
      const res = await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          query: deleteQuery, 
          variables: { 
            deletedFolderPositionIds: [folderPositionId] 
          } 
        }),
      })
      
      const json = await res.json()
      
      if (json?.data?.changeFiles?.items) {
        log(`✅ Successfully deleted folder position ${folderPositionId}`)
        // Remove folder from the state
        setFolders(prevFolders => prevFolders.filter(folder => folder.folderPositionId !== folderPositionId))
      } else if (json.errors) {
        const errorMessage = json.errors[0]?.message || "Unknown GraphQL error"
        log(`❌ Failed to delete folder: ${errorMessage}`)
        throw new Error(errorMessage)
      }
    } catch (err) {
      log(`❌ Failed to delete folder: ${String(err)}`)
      console.error("Failed to delete folder:", err)
      alert(t('Failed to delete album. Please try again.'))
    }
  }

  // Get translation function from the hook for the main component
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";

  return (
    <div
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Language Selector */}
        {/* <div style={{ 
          marginBottom: 20, 
          display: "flex", 
          justifyContent: "flex-end" 
        }}>
          <LanguageSelector className="language-selector" />
        </div> */}

        {/* Container for all content with consistent width */}
        <div style={{ width: "100%" }}>
          <Header 
            publicUsername={publicUsername}
            isUploading={isUploading}
            openFilePicker={openFilePicker}
          />
          
          {/* Add AppPromo Component here */}
          <AppPromo t={t} isRTL={isRTL} />
          
          {/* Search Bar Component */}
          <SearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            t={t}
            isRTL={isRTL}
          />
          
          <UploadProgress 
            progressTracker={progressTracker}
            t={t}
            isRTL={isRTL}
          />

          <AlbumList 
            folders={folders}
            handleDeleteClick={handleDeleteClick}
            openFilePicker={openFilePicker}
            isUploading={isUploading}
            cognitoUsername={cognitoUsername}
          />
          
          {/* Use the refactored FileInput component */}
          <FileInput 
            onFileSelection={handleFileSelection} 
            ref={fileInputRef}
          />
        </div>
      </div>

      <DebugLog 
        debugMessages={debugMessages}
        t={t}
        isRTL={isRTL}
        textDirection={isRTL ? "rtl" : "ltr"}
      />
    </div>
  )
}

// Initialize the app with I18nProvider
ReactDOM.createRoot(document.getElementById("root")!).render(
  <I18nProvider initialLanguage={localStorage.getItem(STORAGE_KEYS.LANGUAGE) as SupportedLanguage || 'en'}>
    <MyAlbums />
  </I18nProvider>
)