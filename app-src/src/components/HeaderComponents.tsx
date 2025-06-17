import React, { useState, useEffect, useRef } from "react";
import { 
  DropdownMenu,
  Button,
  MenuButton,
  HamburgerIcon,
  HamburgerLine,
  DropdownMenuChoice
} from "@/styles/styled-components";
import { ResponsiveHeaderProps } from "@/lib/types";

// Extended props to include buttonStyle
interface ExtendedResponsiveHeaderProps extends ResponsiveHeaderProps {
  buttonStyle?: React.CSSProperties;
}

// ResponsiveHeader component with improved responsive behavior and tighter spacing
const ResponsiveHeader: React.FC<ExtendedResponsiveHeaderProps> = ({ 
  addPhotosToAlbum, 
  saveAlbum, 
  promptForPassword, 
  showingEnterPassword, 
  passwordPolicy,
  usingFolderInviteGrantsRightToAddItems,
  buttonStyle = {},
  t 
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Define our breakpoint - set this high enough to accommodate all buttons with comfortable spacing
  const BREAKPOINT = 840; // px - higher than typical tablet breakpoint to ensure buttons don't wrap
  
  // Default button style with reduced padding
  const defaultButtonStyle: React.CSSProperties = {
    padding: '8px 16px', // Reduced vertical padding by 4px
    ...buttonStyle // Allow override from props
  };
  
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
  
  // Mobile view with hamburger menu
  if (isMobile) {
    return (
      <div 
        ref={menuRef} 
        style={{ 
          position: 'relative', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'flex-end',
          width: '100%',
          flexWrap: 'nowrap'
        }}
      >
        {/* Only show the hamburger menu if user can save or create sub-album */}
        {!showingEnterPassword && (
          <div style={{ flexShrink: 0 }}>
            <MenuButton 
              onClick={toggleMenu}
              aria-label={t('Menu')}
              aria-expanded={menuOpen}
              style={{
                padding: '6px 12px', // Tighter mobile padding
                fontSize: '14px'
              }}
            >
              <HamburgerIcon>
                <HamburgerLine />
                <HamburgerLine />
                <HamburgerLine />
              </HamburgerIcon>
              {t('Add')}
            </MenuButton>
            
            {menuOpen && (
              <DropdownMenu style={{
                padding: '8px 0', // Reduced dropdown padding
                gap: '4px' // Tighter spacing between menu items
              }}>
                {/* <DropdownMenuChoice onClick={() => handleAction(saveAlbum)}>
                  {t('Open On Phone')}
                </DropdownMenuChoice>  */}

                {usingFolderInviteGrantsRightToAddItems && (
                  <DropdownMenuChoice 
                    onClick={() => handleAction(addPhotosToAlbum)}
                    style={{ padding: '8px 16px' }} // Consistent mobile menu item padding
                  >
                    {t('Add Photos To Album')}
                  </DropdownMenuChoice>
                )}

                <DropdownMenuChoice 
                  onClick={() => handleAction(saveAlbum)}
                  style={{ padding: '8px 16px' }} // Consistent mobile menu item padding
                >
                  {t('Save To Library')}
                </DropdownMenuChoice> 

                <DropdownMenuChoice 
                  onClick={() => handleAction(saveAlbum)}
                  style={{ padding: '8px 16px' }} // Consistent mobile menu item padding
                >
                  {t('Download')}
                </DropdownMenuChoice>
              </DropdownMenu>
            )}
          </div>
        )}

        {/* Show Enter Password button if needed */}
        {showingEnterPassword && passwordPolicy && passwordPolicy !== 'NoPassword' && (
          <div style={{ flexShrink: 0 }}> 
            <Button 
              onClick={promptForPassword} 
              $passwordSet={true}
              style={{
                padding: '6px 12px', // Tighter mobile padding
                fontSize: '14px'
              }}
            >
              {t('Enter Password')}
            </Button>
          </div>
        )}
      </div>
    );
  }
  
  // Desktop view with all buttons visible
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '16px', // Reduced from 20px to 16px for consistent spacing
      justifyContent: 'flex-end',
      flexWrap: 'nowrap'
    }}>
      {/* Only show action buttons if user can save or create sub-album */}
      {!showingEnterPassword && (
        <div style={{ 
          display: 'flex', 
          gap: '16px', // Reduced from 20px to 16px for consistent spacing
          flexWrap: 'nowrap'
        }}>
          {usingFolderInviteGrantsRightToAddItems && (
            <Button 
              onClick={addPhotosToAlbum}
              style={defaultButtonStyle}
            >
              {t('Add Photos')}
            </Button>
          )}
          
          <Button 
            onClick={saveAlbum}
            style={defaultButtonStyle}
          >
            {t('Save To Library')}
          </Button>

          <Button 
            onClick={saveAlbum}
            style={defaultButtonStyle}
          >
            {t('Download')}
          </Button>
        </div>
      )}
      
      {/* Show Enter Password button if needed */}
      {showingEnterPassword && (
        <div>
          <Button 
            onClick={promptForPassword} 
            $passwordSet={true}
            style={defaultButtonStyle}
          >
            {t('Enter Password')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ResponsiveHeader;