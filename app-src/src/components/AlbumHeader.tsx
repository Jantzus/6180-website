import React from "react";
import { AlbumData, PasswordPolicyEnum } from "@/lib/types";
// Import styled components
import { 
  Header, 
  HeaderContent,
  HeaderControls,
  Button,
  RowSelectorContainer, 
  RowSelectorLabel, 
  RowSelectorSelect
} from "@/styles/styled-components";
import ResponsiveHeader from "@/components/HeaderComponents";

// Album Header Component
export const AlbumHeader: React.FC<{
  t: (key: string) => string;
  isSelectionMode: boolean;
  selectedItems?: Set<number>;
  shareSelectPhotos?: () => void;
  cancelSelection: () => void;
  showingEnterPassword: () => boolean;
  promptForPassword: () => void;
  passwordPolicy: PasswordPolicyEnum | undefined;
  isAuthorized: boolean;
  addPhotosToAlbum: () => void;
  saveAlbumDirectly: () => void;
  handleDownloadPhotos: () => void;
  handleCopyLink: () => void;
  albumData: AlbumData | null;
  columns: string;
  changeColumns: (value: string) => void;
}> = ({
  t,
  isSelectionMode,
  selectedItems = new Set(),
  shareSelectPhotos,
  cancelSelection,
  showingEnterPassword,
  promptForPassword,
  passwordPolicy,
  isAuthorized,
  addPhotosToAlbum,
  saveAlbumDirectly,
  handleDownloadPhotos,
  handleCopyLink,
  albumData,
  columns,
  changeColumns
}) => {

  // Selection mode actions
  const renderSelectionModeActions = () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      {shareSelectPhotos && (
        <Button 
          onClick={shareSelectPhotos} 
          disabled={selectedItems.size === 0}
          style={{ 
            opacity: selectedItems.size === 0 ? 0.5 : 1,
            backgroundColor: selectedItems.size > 0 ? '#006adc' : undefined,
            color: selectedItems.size > 0 ? 'white' : undefined,
          }}
        >
          {t('Share Selection')} ({selectedItems.size})
        </Button>
      )}
      <Button onClick={cancelSelection}>
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
      <Button onClick={promptForPassword} $passwordSet={true}>
        {t('Enter Password')}
      </Button>
    )
  );

  // Simple "Download" button for albums with folderPositionId
  const renderDownloadButton = () => (
    <Button onClick={handleDownloadPhotos}>
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
        alignItems: 'center'
      }}>
        <div style={{ flexShrink: 0 }}> 
          {!showingEnterPassword() && (
            <>
              <Button onClick={handleCopyLink}>
                {t('Share')}
              </Button>
            </>
          )}
        </div>
        
        {/* Right side - actions group */}
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
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
              />
            )
          )}
        </div>
      </div>
    );
  };

  return (
    <Header>
      <HeaderContent>
        <HeaderControls $fullWidth>
          {renderMainContent()}
        </HeaderControls>
        <RowSelectorContainer>
          <RowSelectorLabel htmlFor="columns" id="columns-label">
            <strong>{t('Columns:')}</strong>
          </RowSelectorLabel>
          <RowSelectorSelect 
            id="columns" 
            value={columns} 
            onChange={(e) => changeColumns(e.target.value)}
          >
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num.toString()}>{num}</option>
            ))}
          </RowSelectorSelect>
        </RowSelectorContainer>
      </HeaderContent>
    </Header>
  );
};