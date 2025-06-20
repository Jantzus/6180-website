import React from "react";
import { AlbumData, PasswordPolicyEnum } from "@/lib/types";
// Import styled components - removed Header and HeaderContent since buttons are now standalone
import { 
  Button
} from "@/styles/styled-components";
import ResponsiveHeader from "./HeaderComponents";

// Album Header Component - Now just renders standalone buttons without container
export const AlbumHeader: React.FC<{
  t: (key: string) => string;
  isSelectionMode: boolean;
  selectedItems?: Set<number>;
  shareSelectPhotos?: () => void;
  cancelSelection: () => void;
  selectAll: () => void;
  unselectAll: () => void;
  showingEnterPassword: () => boolean;
  promptForPassword: () => void;
  passwordPolicy: PasswordPolicyEnum | undefined;
  isAuthorized: boolean;
  addPhotosToAlbum: () => void;
  saveAlbumDirectly: () => void;
  handleDownloadPhotos: () => void;
  handleCopyLink: () => void;
  albumData: AlbumData | null;
}> = ({
  t,
  isSelectionMode,
  selectedItems = new Set(),
  shareSelectPhotos,
  cancelSelection,
  selectAll,
  unselectAll,
  showingEnterPassword,
  promptForPassword,
  passwordPolicy,
  isAuthorized,
  addPhotosToAlbum,
  saveAlbumDirectly,
  handleDownloadPhotos,
  handleCopyLink,
  albumData
}) => {

  // Determine if all items are selected
  const totalItems = albumData?.mediaItems?.length || 0;
  const allItemsSelected = totalItems > 0 && selectedItems.size === totalItems;

  // Selection mode actions
  const renderSelectionModeActions = () => (
    <div style={{ 
      display: 'flex', 
      gap: '16px',
      alignItems: 'center',
      justifyContent: 'flex-start', // Explicitly align to the left
      width: '100%',
      marginBottom: '24px', // Reduced from 32px to 24px
      paddingLeft: '24px',
      paddingRight: '24px'
    }}>
      {shareSelectPhotos && (
        <Button 
          onClick={shareSelectPhotos} 
          disabled={selectedItems.size === 0}
          style={{ 
            opacity: selectedItems.size === 0 ? 0.5 : 1,
            backgroundColor: selectedItems.size > 0 ? '#006adc' : undefined,
            color: selectedItems.size > 0 ? 'white' : undefined,
            padding: '8px 16px', // Reduced vertical padding by 4px
            marginLeft: '0', // Override the default margin-left: auto
          }}
        >
          {t('Share')} ({selectedItems.size})
        </Button>
      )}
      
      {/* Select All / Unselect All button */}
      {totalItems > 0 && (
        allItemsSelected ? (
          <Button 
            onClick={unselectAll}
            style={{ 
              padding: '8px 16px',
              marginLeft: '0',
            }}
          >
            {t('Unselect All')}
          </Button>
        ) : (
          <Button 
            onClick={selectAll}
            style={{ 
              padding: '8px 16px',
              marginLeft: '0',
            }}
          >
            {t('Select All')}
          </Button>
        )
      )}
      
      <Button 
        onClick={cancelSelection}
        style={{ 
          padding: '8px 16px', // Reduced vertical padding by 4px
          marginLeft: '0', // Override the default margin-left: auto
        }}
      >
        {t('Cancel')}
      </Button>
    </div>
  );

  // Password button when needed
  const renderPasswordButton = () => (
    !isSelectionMode && 
    !isAuthorized && 
    passwordPolicy && 
    passwordPolicy !== 'NoPassword' && (
      <Button 
        onClick={promptForPassword} 
        $passwordSet={true}
        style={{ 
          padding: '8px 16px', // Reduced vertical padding by 4px
        }}
      >
        {t('Enter Password')}
      </Button>
    )
  );

  // Simple "Download" button for albums with folderPositionId
  const renderDownloadButton = () => (
    <Button 
      onClick={handleDownloadPhotos}
      style={{ 
        padding: '8px 16px', // Reduced vertical padding by 4px
      }}
    >
      {t('Download')}
    </Button>
  );

  // Render the main content area based on various conditions
  const renderMainContent = () => {
    if (isSelectionMode) {
      return renderSelectionModeActions();
    }

    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        width: '100%', 
        flexWrap: 'nowrap', 
        alignItems: 'center',
        marginBottom: '24px', // Reduced from 32px to 24px
        paddingLeft: '24px',
        paddingRight: '24px'
      }}>
        <div style={{ flexShrink: 0 }}> 
          {!showingEnterPassword() && (
            <>
              <Button 
                onClick={handleCopyLink}
                style={{ 
                  padding: '8px 16px', // Reduced vertical padding by 4px
                  marginLeft: '0', // Override the default margin-left: auto for left-side button
                }}
              >
                {t('Share')}
              </Button>
            </>
          )}
        </div>
        
        {/* Right side - actions group */}
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: '16px' // Consistent 16px spacing between buttons
        }}>
          {renderPasswordButton()}
          
          {/* Show the modified header component with action menu for albums with folderPositionId */}
          {!isSelectionMode && !(
            !isAuthorized && passwordPolicy && passwordPolicy !== 'NoPassword'
          ) && (
            albumData?.folderPositionId ? (
              renderDownloadButton()
            ) : (
              <ResponsiveHeader 
                addPhotosToAlbum={addPhotosToAlbum}
                saveAlbum={saveAlbumDirectly}
                downloadPhotos={handleDownloadPhotos}
                promptForPassword={promptForPassword}
                showingEnterPassword={showingEnterPassword()}
                passwordPolicy={passwordPolicy}
                usingFolderInviteGrantsRightToAddItems={albumData?.usingFolderInviteGrantsRightToAddItems}
                t={t} 
                buttonStyle={{ 
                  padding: '8px 16px', // Reduced vertical padding by 4px
                }}
              />
            )
          )}
        </div>
      </div>
    );
  };

  // Return buttons directly without Header container
  return renderMainContent();
};