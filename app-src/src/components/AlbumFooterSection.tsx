import React, { useState, useEffect } from "react";
import { FolderType } from "@/lib/types";
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n";
import { generateInviteLink } from "@/lib/utils";
import { CopyLinkModal } from "./Modals/CopyLinkModal";
import { ConfirmationModal } from "./Modals/ConfirmationModal";
import { checkLoginWithRefresh, checkLoginWithoutRedirect } from "@/lib/utils";
import { S3_BUCKET_URL, AWS_PRIVATE_GRAPHQL_ENDPOINT } from "@/lib/config";
import { downloadPhotos } from "@/lib/fileOperations";

// FooterSection Component
type AlbumFooterSectionProps = {
  folder: FolderType;
  openFilePicker?: (folderId: string | null) => void;
  cognitoUsername: string | null;
  updateProfileIds?: (profileIds: string[]) => void; 
  onModalStateChange?: (isOpen: boolean) => void; // New prop to communicate modal state
};

export const AlbumFooterSection: React.FC<AlbumFooterSectionProps> = ({
  folder,
  openFilePicker,
  cognitoUsername,
  updateProfileIds,
  onModalStateChange
}) => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";
  const [showingCopyLinkAlert, setShowingCopyLinkAlert] = useState<boolean>(false);
  const [showingCopiedLinkAlert, setShowingCopiedLinkAlert] = useState<boolean>(false);
  
  // Compute isOnPublicProfile from the current folder state
  const [localProfileIds, setLocalProfileIds] = useState<string[]>(folder.profileIds || []);
  const publicProfileId = cognitoUsername ? `${cognitoUsername}_____Public____Profile` : '';
  const isOnPublicProfile = localProfileIds.includes(publicProfileId);

  // Generate the invite link
  const inviteLink = generateInviteLink(
    folder.folderId,
    folder.albumNanoId,
    folder.creatorId && folder.contacts && folder.contacts[folder.creatorId] 
    ? folder.contacts[folder.creatorId] 
    : 'album',
    folder.folderName
  )

  // Update local state when the folder prop changes
  useEffect(() => {
    setLocalProfileIds(folder.profileIds || []);
  }, [folder.profileIds]);

  // Notify parent component when any modal state changes
  useEffect(() => {
    const isAnyModalOpen = showingCopyLinkAlert || showingCopiedLinkAlert;
    if (onModalStateChange) {
      onModalStateChange(isAnyModalOpen);
    }
  }, [showingCopyLinkAlert, showingCopiedLinkAlert, onModalStateChange]);

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

  // Handle downloading photos
  const handleDownloadPhotos = async (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    
    // Check login first for certain operations
    const token = await checkLoginWithoutRedirect();
    
    if (!token) {
      alert(t('You must be logged in to download photos'));
      return;
    }
    
    // Transform the folder data to the format expected by downloadPhotos
    if (folder && folder.files && folder.files.length > 0) {
      // Convert the folder files to MediaItem format
      const mediaItems = folder.files.map((file, index) => {
        // Explicitly type as "image" or "video" to match MediaItem type
        const fileType: "image" | "video" = file.dataKey.toLowerCase().endsWith('.mp4') ? 'video' : 'image';
        
        return {
          url: `${S3_BUCKET_URL}${file.dataKey}`,
          thumbnailUrl: file.thumbnailDataKey ? `${S3_BUCKET_URL}${file.thumbnailDataKey}` : undefined,
          type: fileType,
          index: index,
          // Add other required properties from MediaItem type
          id: `file-${index}`,
          fileId: file.dataKey,
          loaded: false
        };
      });
      
      // Create the album data structure required by downloadPhotos
      const albumData = {
        mediaItems: mediaItems,
        folderName: folder.folderName || 'Album'
      };
      
      // Create a dummy openFullscreenView function (since we don't have fullscreen view in this component)
      const openFullscreenView = (index: number) => {
        window.open(mediaItems[index].url, '_blank');
      };
      
      // Call the downloadPhotos function from fileOperations
      downloadPhotos(albumData, t, openFullscreenView);
    } else {
      alert(t('No items to download'));
    }
  };

  // Handle public profile toggle
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
      
      // Update local state instead of reloading the page
      const updatedItems = json?.data?.changeFiles?.items || [];
      const updatedItem = updatedItems.find((item: any) => item.id === folder.folderPositionId);
      
      if (updatedItem && updatedItem.profileIds) {
        // First update local state
        setLocalProfileIds(updatedItem.profileIds);
        
        // Then propagate changes to parent component
        if (updateProfileIds) {
          updateProfileIds(updatedItem.profileIds);
        }
        
        // You can add a success notification here if desired
        console.log("Album visibility updated successfully");
      }
    } catch (err) {
      console.error("Failed to toggle album visibility:", err);
      alert(t('Failed to update album visibility. Please try again.'));
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
            {(openFilePicker && <button
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
            </button>)}
            
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
            
            {/* New Download Photos button added between Add Photos and Copy Link */}
            <button
              onClick={handleDownloadPhotos}
              style={{
                ...buttonStyle,
                backgroundColor: "#e0e0e0",
              }}
            >
              {t('Download')}
            </button>
            
            <button
              onClick={handlePublicProfileClick}
              style={{
                ...buttonStyle,
                backgroundColor: isOnPublicProfile ? "#4caf50" : "#e0e0e0",
                color: isOnPublicProfile ? "white" : "inherit",
              }}
            >
              {isOnPublicProfile ? t('On Public Profile') : t('Not On Public Profile')}
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