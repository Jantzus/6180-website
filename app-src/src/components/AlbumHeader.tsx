import React, { useState, useEffect, useRef } from "react";
import { AlbumData, PasswordPolicyEnum } from "@/lib/types";
// Import styled components
import { 
  Header, 
  HeaderContent,
  HeaderControls,
  Button,
  MenuButton, 
  RowSelectorContainer, 
  RowSelectorLabel, 
  RowSelectorSelect,
  DropdownMenu,
  HamburgerIcon,
  HamburgerLine,
  DropdownMenuChoice
} from "@/styles/styled-components";
import ResponsiveHeader from "@/components/HeaderComponents";

// Define action types for reuse
type ActionItem = {
  label: string;
  onClick: () => void;
  style?: React.CSSProperties;
  disabled?: boolean;
};

// Album Header Component
export const AlbumHeader: React.FC<{
  t: (key: string) => string;
  isSelectionMode: boolean;
  selectedItems: Set<number>;
  shareSelectPhotos: () => void;
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
  shareSelectPhotos,
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

  // Define common action items to avoid repetition
  const getActionItems = (): ActionItem[] => [
    {
      label: t('Add Photos'),
      onClick: addPhotosToAlbum
    },
    {
      label: t('Download'),
      onClick: handleDownloadPhotos
    },
    {
      label: t('Copy Link'),
      onClick: handleCopyLink
    },
    {
      label: isOnPublicProfile ? t('On Public Profile') : t('Not On Public Profile'),
      onClick: handlePublicProfileToggle,
      style: {
        backgroundColor: isOnPublicProfile ? "#4caf50" : "#e0e0e0",
        color: isOnPublicProfile ? "white" : "inherit",
      }
    }
  ];

  // Selection mode actions
  const renderSelectionModeActions = () => (
    <div style={{ display: 'flex', gap: '16px' }}>
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

  // Actions menu for mobile view
  const renderMobileMenu = () => (
    <>
      <MenuButton 
        onClick={toggleMenu}
        aria-label={t('Menu')}
        aria-expanded={menuOpen}
      >
        <HamburgerIcon style={{ marginRight: '8px' }}>
          <HamburgerLine />
          <HamburgerLine />
          <HamburgerLine />
        </HamburgerIcon>
        <span>{t('Add')}</span>
      </MenuButton>
      
      {menuOpen && (
        <DropdownMenu>
          {getActionItems().map((item, index) => (
            <DropdownMenuChoice 
              key={index} 
              onClick={() => handleAction(item.onClick)}
              style={item.style}
              disabled={item.disabled}
            >
              {item.label}
            </DropdownMenuChoice>
          ))}
        </DropdownMenu>
      )}
    </>
  );

  // Actions for desktop view
  const renderDesktopActions = () => (
    <div style={{ 
      display: 'flex', 
      gap: '10px',
      flexWrap: 'nowrap'
    }}>
      {getActionItems().map((item, index) => (
        <Button
          key={index}
          onClick={item.onClick}
          style={item.style}
          disabled={item.disabled}
        >
          {item.label}
        </Button>
      ))}
    </div>
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
            <Button onClick={createSubalbum}>
              {t('Share Selection')}
            </Button>
          )}
        </div>
        
        {/* Right side - actions group */}
        <div style={{ 
          marginLeft: 'auto',
          display: 'flex',
          alignItems: 'center'
        }}>
          {renderPasswordButton()}
          
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
                {isMobile ? renderMobileMenu() : renderDesktopActions()}
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