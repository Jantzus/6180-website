import React, { useState, useEffect, useRef } from "react";
import { AlbumData, PasswordPolicyEnum } from "@/lib/types";
// Import styled components
import { 
  Header, 
  HeaderContent,
  HeaderControlsWithFullWidth,
  CreateAlbumButton, 
  RowSelectorContainer, 
  RowSelectorLabel, 
  RowSelectorSelect,
  ActionButton,
  HamburgerButton, 
  HamburgerIcon, 
  HamburgerLine, 
  DropdownMenu, 
  MenuButton
} from "@/styles/photos-styled-components";
import ResponsiveHeader from "@/components/HeaderComponents";

// Album Header Component
export const AlbumHeader: React.FC<{
  t: (key: string) => string;
  isSelectionMode: boolean;
  selectedItems: Set<number>;
  shareSelection: () => void;
  cancelSelection: () => void;
  createSubalbum: () => void;
  showingEnterPassword: () => boolean;
  promptForPassword: () => void;
  passwordPolicy: PasswordPolicyEnum | undefined;
  isAuthorized: boolean;
  addPhotosToAlbum: () => void;
  saveAlbumDirectly: () => void;
  handleDownloadPhotos: () => void;
  handleCopyLink: () => void;
  handlePublicProfileToggle: () => void;
  isOnPublicProfile: boolean;
  albumData: AlbumData | null;
  columns: string;
  changeColumns: (value: string) => void;
}> = ({
  t,
  isSelectionMode,
  selectedItems,
  shareSelection,
  cancelSelection,
  createSubalbum,
  showingEnterPassword,
  promptForPassword,
  passwordPolicy,
  isAuthorized,
  addPhotosToAlbum,
  saveAlbumDirectly,
  handleDownloadPhotos,
  handleCopyLink,
  handlePublicProfileToggle,
  isOnPublicProfile,
  albumData,
  columns,
  changeColumns
}) => {
  // State for hamburger menu control
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Define our breakpoint for responsive design
  const BREAKPOINT = 840; // px
  
  // Check window width on mount and when resized
  useEffect(() => {
    // Set initial state immediately to avoid flicker
    setIsMobile(window.innerWidth < BREAKPOINT);
    
    const checkWidth = () => {
      setIsMobile(window.innerWidth < BREAKPOINT);
    };
    
    // Add resize listener
    window.addEventListener('resize', checkWidth);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkWidth);
  }, []);
  
  // Toggle menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  // Close menu
  const closeMenu = () => {
    setMenuOpen(false);
  };
  
  // Execute action and close menu
  const handleAction = (action: () => void) => {
    action();
    closeMenu();
  };
  
  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    
    // Handle scroll to close menu
    const handleScroll = () => {
      setMenuOpen(false);
    };
    
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [menuOpen]);

  return (
    <Header>
      <HeaderContent>
        <HeaderControlsWithFullWidth>
          {isSelectionMode ? (
            <div style={{ display: 'flex', gap: '16px' }}>
              <ActionButton 
                onClick={shareSelection} 
                disabled={selectedItems.size === 0}
                style={{ 
                  opacity: selectedItems.size === 0 ? 0.5 : 1,
                  backgroundColor: selectedItems.size > 0 ? '#006adc' : undefined,
                  color: selectedItems.size > 0 ? 'white' : undefined,
                }}
              >
                {t('Create Sub-album')} ({selectedItems.size})
              </ActionButton>
              <ActionButton onClick={cancelSelection}>
                {t('Cancel')}
              </ActionButton>
            </div>
          ) : (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              width: '100%', 
              flexWrap: 'nowrap', 
              alignItems: 'center'
            }}>
              {/* Left side - Create Sub-album button */}
              <div style={{ flexShrink: 0 }}> 
              {!showingEnterPassword() && (
                <CreateAlbumButton onClick={createSubalbum}>
                  {t('Create Sub-album')}
                </CreateAlbumButton>
              )}
              </div>
              
              {/* Right side - actions group */}
              <div style={{ 
                marginLeft: 'auto',
                display: 'flex',
                alignItems: 'center'
              }}>
                {/* Show password button */}
                {!isSelectionMode && 
                !isAuthorized && 
                passwordPolicy && 
                passwordPolicy !== 'NoPassword' && (
                  <ActionButton onClick={promptForPassword}>
                    {t('Enter Password')}
                  </ActionButton>
                )}
                
                {/* Show the modified header component with action menu for albums with folderPositionId */}
                {!isSelectionMode && !(
                  !isAuthorized && passwordPolicy && passwordPolicy !== 'NoPassword'
                ) && (
                  albumData?.folderPositionId ? (
                    <div 
                      ref={menuRef} 
                      style={{ 
                        position: 'relative', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'flex-end',
                        flexWrap: 'nowrap'
                      }}
                    >
                      {isMobile ? (
                        <>
                          <HamburgerButton 
                            onClick={toggleMenu}
                            aria-label={t('Menu')}
                            aria-expanded={menuOpen}
                          >
                            <HamburgerIcon>
                              <HamburgerLine />
                              <HamburgerLine />
                              <HamburgerLine />
                            </HamburgerIcon>
                            {t('Actions')}
                          </HamburgerButton>
                          
                          {menuOpen && (
                            <DropdownMenu>
                              <MenuButton onClick={() => handleAction(addPhotosToAlbum)}>
                                {t('Add Photos')}
                              </MenuButton>
                              
                              <MenuButton onClick={() => handleAction(handleDownloadPhotos)}>
                                {t('Download')}
                              </MenuButton>
                              
                              <MenuButton onClick={() => handleAction(handleCopyLink)}>
                                {t('Copy Link')}
                              </MenuButton>
                              
                              <MenuButton onClick={() => handleAction(handlePublicProfileToggle)}>
                                {isOnPublicProfile ? t('Remove from Public Profile') : t('Add to Public Profile')}
                              </MenuButton>
                            </DropdownMenu>
                          )}
                        </>
                      ) : (
                        // Desktop view with all buttons visible
                        <div style={{ 
                          display: 'flex', 
                          gap: '10px',
                          flexWrap: 'nowrap'
                        }}>
                          <ActionButton
                            onClick={addPhotosToAlbum}
                          >
                            {t('Add Photos')}
                          </ActionButton>
                          
                          <ActionButton
                            onClick={handleDownloadPhotos}
                          >
                            {t('Download')}
                          </ActionButton>
                          
                          <ActionButton
                            onClick={handleCopyLink}
                          >
                            {t('Copy Link')}
                          </ActionButton>
                          
                          <ActionButton
                            onClick={handlePublicProfileToggle}
                            style={{
                              backgroundColor: isOnPublicProfile ? "#4caf50" : "#e0e0e0",
                              color: isOnPublicProfile ? "white" : "inherit",
                            }}
                          >
                            {isOnPublicProfile ? t('On Public Profile') : t('Not On Public Profile')}
                          </ActionButton>
                        </div>
                      )}
                    </div>
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
          )}
        </HeaderControlsWithFullWidth>
        <RowSelectorContainer>
          <RowSelectorLabel htmlFor="columns" id="columns-label">
            <strong>{t('Columns:')}</strong>
          </RowSelectorLabel>
          <RowSelectorSelect 
            id="columns" 
            value={columns} 
            onChange={(e) => changeColumns(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </RowSelectorSelect>
        </RowSelectorContainer>
      </HeaderContent>
    </Header>
  );
};
