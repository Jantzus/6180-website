import React, { useState, useEffect, useRef } from "react";
import { 
  ActionButton, 
  HamburgerButton, 
  HamburgerIcon, 
  HamburgerLine, 
  DropdownMenu, 
  MenuButton, 
  PasswordButton 
} from "@/styles/photos-styled-components";
import { ResponsiveHeaderProps } from "@/lib/types";

// ResponsiveHeader component
const ResponsiveHeader: React.FC<ResponsiveHeaderProps> = ({ 
  addPhotosToAlbum, 
  saveAlbum, 
  downloadPhotos, 
  getQRCode, 
  promptForPassword, 
  showingEnterPassword, 
  passwordPolicy, 
  t 
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Check window width on mount and when resized
  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkWidth();
    
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
  
  if (isMobile) {
    return (
      <div 
        ref={menuRef} 
        style={{ 
          position: 'relative', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          width: '100%',
          flexWrap: 'nowrap' // Prevent wrapping
        }}
      >
        {/* Only show the hamburger menu if user can save or create sub-album */}
        {!showingEnterPassword && (
          <div style={{ flexShrink: 0 }}>
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
              {t('Add')}
            </HamburgerButton>
            
            {menuOpen && (
              <DropdownMenu>
                <MenuButton onClick={() => handleAction(addPhotosToAlbum)}>
                  {t('Add Photos To Album')}
                </MenuButton>
                
                <MenuButton onClick={() => handleAction(saveAlbum)}>
                  {t('Save Album To 6180')}
                </MenuButton>
                
                <MenuButton onClick={() => handleAction(downloadPhotos)}>
                  {t('Download Photos')}
                </MenuButton>
                
                <MenuButton onClick={() => handleAction(getQRCode)}>
                  {t('Open On iPhone App')}
                </MenuButton>
              </DropdownMenu>
            )}
          </div>
        )}

        {/* Show Enter Password button if needed - now on the right */}
        {showingEnterPassword && passwordPolicy && passwordPolicy !== 'NoPassword' && (
          <div style={{ marginLeft: 'auto', flexShrink: 0 }}> {/* Added flexShrink */}
            <PasswordButton onClick={promptForPassword}>
              {t('Enter Password')}
            </PasswordButton>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '20px',
      justifyContent: 'flex-end',
      flexWrap: 'nowrap'
    }}>
      {/* Only show action buttons if user can save or create sub-album */}
      {!showingEnterPassword && (
        <div style={{ 
          display: 'flex', 
          gap: '20px',
          flexWrap: 'wrap'
        }}>
          <ActionButton onClick={addPhotosToAlbum}>
            {t('Add Photos To Album')}
          </ActionButton>
          
          <ActionButton onClick={saveAlbum}>
            {t('Save Album To 6180')}
          </ActionButton>
          
          <ActionButton onClick={downloadPhotos}>
            {t('Download Photos')}
          </ActionButton>
          
          <ActionButton onClick={getQRCode}>
            {t('Open On iPhone App')}
          </ActionButton>
        </div>
      )}
      
      {/* Show Enter Password button if needed */}
      {showingEnterPassword && (
        <div>
          <PasswordButton onClick={promptForPassword}>
            {t('Enter Password')}
          </PasswordButton>
        </div>
      )}
    </div>
  );
};

export default ResponsiveHeader;