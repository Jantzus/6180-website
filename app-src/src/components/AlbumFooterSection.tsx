import React, { useState, useEffect } from "react";
import { FolderType } from "@/lib/types";
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n";
import { generateInviteLink } from "@/lib/utils";
import { CopyLinkModal } from "./Modals/CopyLinkModal";
import { ConfirmationModal } from "./Modals/ConfirmationModal";
import { QRCodeModal } from "./Modals/QRCodeModal";
import { DownloadModal } from "./Modals/DownloadModal";
import { checkLoginWithRefresh, checkLoginWithoutRedirect } from "@/lib/utils";
import { AWS_PRIVATE_GRAPHQL_ENDPOINT } from "@/lib/config";

// FooterSection Component
type AlbumFooterSectionProps = {
  folder: FolderType;
  cognitoUsername: string | null;
  updateProfileIds?: (profileIds: string[]) => void; 
  onModalStateChange?: (isOpen: boolean) => void;
};

export const AlbumFooterSection: React.FC<AlbumFooterSectionProps> = ({
  folder,
  cognitoUsername,
  updateProfileIds,
  onModalStateChange
}) => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";
  const [showingCopyLinkAlert, setShowingCopyLinkAlert] = useState<boolean>(false);
  const [showingCopiedLinkAlert, setShowingCopiedLinkAlert] = useState<boolean>(false);
  const [showingQRCode, setShowingQRCode] = useState<boolean>(false);
  const [showingDownloadModal, setShowingDownloadModal] = useState<boolean>(false);
  
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
    const isAnyModalOpen = showingCopyLinkAlert || showingCopiedLinkAlert || showingQRCode || showingDownloadModal;
    if (onModalStateChange) {
      onModalStateChange(isAnyModalOpen);
    }
  }, [showingCopyLinkAlert, showingCopiedLinkAlert, showingQRCode, showingDownloadModal, onModalStateChange]);

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

  // Handle opening download modal
  const handleDownloadClick = async (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    
    // Check login first
    const token = await checkLoginWithoutRedirect();
    
    if (!token) {
      alert(t('You must be logged in to download photos'));
      return;
    }
    
    // Check if folder has files
    if (!folder || !folder.files || folder.files.length === 0) {
      alert(t('No items to download'));
      return;
    }
    
    // Open the download modal
    setShowingDownloadModal(true);
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
            {/* Show QR Code button */}
            <button
              onClick={(e) => {
                e.preventDefault(); 
                e.stopPropagation();
                setShowingQRCode(true);
              }}
              style={{
                ...buttonStyle,
                backgroundColor: "#4caf50",
                color: "white",
              }}
            >
              {t('Show QR Code')}
            </button>
            
            {/* Updated Download button - now opens modal */}
            <button
              onClick={handleDownloadClick}
              style={{
                ...buttonStyle,
                backgroundColor: "#2196f3",
                color: "white",
              }}
            >
              {t('Download')}
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

            {/* Elegant Public Profile Toggle Button */}
            <button
              onClick={handlePublicProfileClick}
              style={{
                ...buttonStyle,
                backgroundColor: isOnPublicProfile ? "#4caf50" : "#e0e0e0",
                color: isOnPublicProfile ? "white" : "inherit",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                position: "relative",
                border: isOnPublicProfile ? "none" : "1px solid #ccc",
                transition: "all 0.2s ease",
              }}
            >
              {/* Subtle toggle indicator - small dot */}
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: isOnPublicProfile ? "rgba(255,255,255,0.8)" : "#999",
                  borderRadius: "50%",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                }}
              />
              
              {/* Descriptive label that changes */}
              <span style={{ flexShrink: 0 }}>
                {isOnPublicProfile ? t('On Public Profile') : t('Not On Public Profile')}
              </span>
            </button>
          </div>
        </div>
        
        {/* Hide scrollbar for WebKit browsers */}
        <style>
          {`
            div::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
      </div>
      
      {/* Copy Link Modals - Now using React Portal */}
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

      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={showingQRCode}
        onClose={() => setShowingQRCode(false)}
        albumLink={inviteLink}
        t={t}
        isRTL={isRTL}
      />

      {/* Download Modal */}
      <DownloadModal
        isOpen={showingDownloadModal}
        folder={folder}
        onClose={() => setShowingDownloadModal(false)}
      />
    </>
  );
};