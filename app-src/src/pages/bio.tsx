import React, { useState, useEffect, useMemo, useRef } from "react";
import ReactDOM from "react-dom/client";
import { createGlobalStyle } from "styled-components";
import { checkLoginWithoutRedirect, checkLoginWithRefresh } from "@/lib/utils";
import {
  AWS_PUBLIC_GRAPHQL_ENDPOINT,
  AWS_PUBLIC_API_KEY,
  AWS_PRIVATE_GRAPHQL_ENDPOINT,
  S3_BUCKET_URL,
  LOCAL_STORAGE_KEYS
} from "@/lib/config";
import { getOwnerItemId, getTargetItemIdentifier } from "@/lib/utils";
import { I18nProvider, useTranslation } from "@/lib/i18n/react";
import { getLanguageDirection } from "@/lib/i18n";
import { SupportedLanguage } from "@/lib/i18n/translations";

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
  createdAt: string;
  updatedAt: string;
  files: any[];
  profileIds: string[];
}

// LazyImage Component - Copied to avoid importing from components
interface LazyImageProps {
  src?: string;
  alt: string;
  style: React.CSSProperties;
  thumbnailDataKey?: string | null;
  dataKey?: string | null;
  bucketUrl?: string;
  [key: string]: any;
}

const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  style, 
  thumbnailDataKey, 
  dataKey, 
  bucketUrl = S3_BUCKET_URL,
  ...props 
}) => {
  const [loaded, setLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');

  useEffect(() => {
    // Reset state when the image source changes
    setLoaded(false);
    
    // Determine the appropriate source for the image
    // Order of priority: thumbnailDataKey -> dataKey -> src
    let imageSrc = '';
    
    if (thumbnailDataKey) {
      imageSrc = `${bucketUrl}${thumbnailDataKey}`;
    } else if (dataKey) {
      imageSrc = `${bucketUrl}${dataKey}`;
    } else if (src) {
      imageSrc = src;
    }
    
    setCurrentSrc(imageSrc);
  }, [thumbnailDataKey, dataKey, src, bucketUrl]);

  // Handle successful image load
  const handleImageLoaded = () => {
    setLoaded(true);
  };

  // Handle image loading error
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error("Image load error:", e);
    
    // If thumbnail fails, try loading the full image as a fallback
    if (thumbnailDataKey && dataKey && thumbnailDataKey !== dataKey) {
      // Only change source if we're currently using the thumbnail
      if (currentSrc === `${bucketUrl}${thumbnailDataKey}`) {
        console.log("Falling back to full image");
        setCurrentSrc(`${bucketUrl}${dataKey}`);
      }
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      style={{
        ...style,
        opacity: loaded ? 1 : 0.3,
        transition: 'opacity 0.3s ease-in-out',
      }}
      onLoad={handleImageLoaded}
      onError={handleImageError}
      {...props}
    />
  );
};

// Styled Components via createGlobalStyle
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    -webkit-text-size-adjust: 100%;
  }
  
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background-color: #f8f9fa;
  }
  
  #root {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
`;

// Helper function to format date based on iOS implementation
const formatDate = (dateString: string | null) => {
  if (!dateString) return "";
  
  try {
    // Convert string to number if needed
    const timestamp = typeof dateString === 'string' 
      ? Number(dateString) 
      : dateString;
    
    // Skip invalid numbers
    if (isNaN(timestamp)) {
      console.log("Invalid timestamp:", dateString);
      return "";
    }
    
    // Create Date from timestamp (assumes seconds since epoch like iOS)
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    
    // Verify we have a reasonable date (not epoch or future)
    const year = date.getFullYear();
    if (year <= 1970 || year > 2100) {
      console.log("Date outside reasonable range:", date.toISOString());
      return "";
    }
    
    // Format the date using Intl formatter
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  } catch (e) {
    console.error("Error formatting date:", e);
    return ""; // Return empty string on error
  }
};

// ProfileHeader Component
interface ProfileHeaderProps {
  username: string;
  isCurrentUser: boolean;
  isRTL: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  username, 
  isCurrentUser,
  isRTL 
}) => {
  const { t } = useTranslation();
  
  return (
    <div style={{ 
      marginBottom: 40,
      textAlign: "center",
      direction: isRTL ? "rtl" : "ltr"
    }}>
      <div style={{ 
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center" 
      }}>
        <div style={{ 
          width: 80,
          height: 80,
          borderRadius: "50%",
          backgroundColor: "#e0e0e0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
          fontSize: 32,
          color: "#555"
        }}>
          {username ? username.charAt(0).toUpperCase() : "?"}
        </div>
        
        <h1 style={{ 
          fontSize: 24, 
          marginBottom: 8,
          fontWeight: 600
        }}>
          {username || t('User Profile')}
        </h1>
        
        <div style={{ 
          fontSize: 16,
          color: "#666",
          marginBottom: 16 
        }}>
          {t('Public Albums')}
        </div>
        
        {isCurrentUser && (
          <div style={{
            marginTop: 16,
            padding: "12px 16px",
            backgroundColor: "#f0f7ff",
            borderRadius: 8,
            border: "1px solid #cce0ff",
            maxWidth: 500
          }}>
            <p style={{ margin: 0, fontSize: 14 }}>
              {t('This is how others see your public profile')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// CopyLinkModal Component
interface CopyLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  inviteLink: string;
  onCopy: (text: string) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

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
    textAlign: textAlignValue,
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
          textAlign: textAlignValue,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ marginTop: 0, marginBottom: "16px", fontSize: "18px" }}>
          {t('Share Album Link')}
        </h3>
        
        <button
          style={buttonStyle}
          onClick={() => onCopy(inviteLink)}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f5f5f5"}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#fff"}
        >
          {t('Copy Link')}
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

// ConfirmationModal Component
interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: (key: string) => string;
  isRTL: boolean;
}

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
          textAlign: isRTL ? "right" : "left" as const,
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
            textAlign: "center" as const,
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
  const [showingCopyLinkAlert, setShowingCopyLinkAlert] = useState<boolean>(false);
  const [showingCopiedLinkAlert, setShowingCopiedLinkAlert] = useState<boolean>(false);
  
  // Calculate if album is on public profile
  const [localProfileIds, setLocalProfileIds] = useState<string[]>(folder.profileIds || []);
  const publicProfileId = cognitoUsername ? `${cognitoUsername}_____Public____Profile` : '';
  const isOnPublicProfile = localProfileIds.includes(publicProfileId);
  
  // Update local state when folder props change
  useEffect(() => {
    setLocalProfileIds(folder.profileIds || []);
  }, [folder.profileIds]);
  
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
      const token = await checkLoginWithRefresh();
      
      if (!token) {
        console.error("Authentication failed");
        return;
      }
      
      // Determine the new profileIds array
      const newProfileIds = [...localProfileIds];
      
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
        // First update local state
        setLocalProfileIds(updatedItem.profileIds);
        
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

  // Common button style
  const buttonStyle = {
    padding: "8px 12px",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 14,
    textAlign: "center" as const,
    whiteSpace: "nowrap" as const,
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
          scrollbarWidth: "none" as const,
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
            {hasAddPhotoPermission && openFilePicker && (
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
            )}
            
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
            
            {isOwner && (
              <>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.href = `/save-album.html?folderId=${encodeURIComponent(folder.folderId)}`;
                  }}
                  style={{
                    ...buttonStyle,
                    backgroundColor: "#2196f3",
                    color: "white",
                  }}
                >
                  {t('Edit Album')}
                </button>
                
                {/* Public Profile Toggle Button - Only show for owners */}
                <button
                  onClick={handlePublicProfileClick}
                  style={{
                    ...buttonStyle,
                    backgroundColor: isOnPublicProfile ? "#4caf50" : "#e0e0e0",
                    color: isOnPublicProfile ? "white" : "inherit",
                  }}
                >
                  {isOnPublicProfile ? t('Remove From Public Profile') : t('Add To Public Profile')}
                </button>
              </>
            )}
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

// Search Bar Component
interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery, t, isRTL }) => {
  return (
    <div 
      style={{
        width: "100%", 
        marginBottom: 24,
        boxSizing: "border-box",
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
          boxSizing: "border-box",
        }}
      />
    </div>
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
      <div style={{ 
        textAlign: "center", 
        padding: "40px 20px",
        backgroundColor: "white",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
      }}>
        <p style={{ fontSize: 16, color: "#666" }}>
          {t('No public albums found')}
        </p>
      </div>
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
                    alignItems: "flex-end",
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
                        {showCreated && folder.createdAt && formatDate(folder.createdAt) && (
                          <div>{t('Created')}: {formatDate(folder.createdAt)}</div>
                        )}
                        {showUpdated && folder.updatedAt && formatDate(folder.updatedAt) && (
                          <div>{t('Updated')}: {formatDate(folder.updatedAt)}</div>
                        )}
                      </div>
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
                      scrollbarWidth: "thin" as const,
                      WebkitOverflowScrolling: "touch",
                      maxWidth: "100%",
                      flexDirection: isRTL ? "row-reverse" : "row"
                    }}
                  >
                    {folder.files.map((file, i) => (
                      <LazyImage
                        key={i}
                        thumbnailDataKey={file.thumbnailDataKey}
                        dataKey={file.dataKey}
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
                
                {/* Password Policy Indicator */}
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
                
                {/* Album description section */}
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
                
                {/* Updated AlbumFooter with public profile toggle capability */}
                <AlbumFooter
                  folder={folder}
                  isOwner={isCreator}
                  hasAddPhotoPermission={hasAddPhotoPermission}
                  cognitoUsername={cognitoUsername}
                  openFilePicker={openFilePicker}
                  updateProfileIds={updateFolderProfileIds}
                />
              </div>
            </a>
          </div>
        );
      })}
    </>
  );
};

// AppPromo Component
interface AppPromoProps {
  t: (key: string) => string;
  isRTL: boolean;
}

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
        {t('Get the iPhone app to add contacts, communicate with contacts and see when contacts have added new albums.')}
      </a>
    </div>
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
  const fileInputRef = useRef<HTMLInputElement>(null);
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
      const id = urlParams.get('id');
      
      if (id) return id;
      
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
      
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 20px" }}>
        {/* Profile Header */}
        <ProfileHeader 
          username={profileUsername || t('User')}
          isCurrentUser={isOwner}
          isRTL={isRTL}
        />
        
        {/* App Promo */}
        <AppPromo t={t} isRTL={isRTL} />
        
        {/* Search Bar */}
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          t={t}
          isRTL={isRTL}
        />
        
        {/* Loading State */}
        {isLoading && (
          <div style={{ 
            textAlign: "center", 
            padding: "40px 20px",
            backgroundColor: "white",
            borderRadius: 12,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
          }}>
            <p style={{ fontSize: 16, color: "#666" }}>
              {t('Loading albums...')}
            </p>
          </div>
        )}
        
        {/* Error State */}
        {error && (
          <div style={{ 
            textAlign: "center", 
            padding: "40px 20px",
            backgroundColor: "#fdeded",
            borderRadius: 12,
            border: "1px solid #f7d0d0",
            marginBottom: 20
          }}>
            <p style={{ fontSize: 16, color: "#d32f2f" }}>
              {error}
            </p>
          </div>
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
      </div>
    </>
  );
};

// Initialize the app with I18nProvider
ReactDOM.createRoot(document.getElementById("root")!).render(
  <I18nProvider initialLanguage={localStorage.getItem(LOCAL_STORAGE_KEYS.LANGUAGE) as SupportedLanguage || 'en'}>
    <PersonaViewer />
  </I18nProvider>
);