import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "@/lib/i18n/hooks";

// Importing styled components from styled-components.tsx
import {
  ProfileHeaderContainer,
  ProfileControls,
  Button,
  HamburgerIcon,
  HamburgerLine,
  DropdownMenu,
  MenuButton,
  PublicProfileExplanation
} from "@/styles/styled-components";

// Profile Header Props Interface
export interface ProfileHeaderProps {
  username: string;
  isCurrentUser: boolean;
  isRTL: boolean;
}

// ProfileHeader Component
export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  username, 
  isCurrentUser,
  isRTL 
}) => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Toggle dropdown menu
  const toggleMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  // Close menu when clicked outside
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
  
  // Execute action and close menu
  const handleAction = (action: () => void) => {
    action();
    setMenuOpen(false);
  };
  
  return (
    <ProfileHeaderContainer isRTL={isRTL}>
      <ProfileControls isRTL={isRTL}>
        <div ref={menuRef} style={{ position: 'relative' }}>
          <Button
            onClick={toggleMenu}
            aria-label={t('Menu')}
            aria-expanded={menuOpen}
          >
            <HamburgerIcon>
              <HamburgerLine />
              <HamburgerLine />
              <HamburgerLine />
            </HamburgerIcon>
            {username || t('User Profile')}
          </Button>
          
          {/* Dropdown Menu */}
          {menuOpen && (
            <DropdownMenu>
              <MenuButton
                onClick={() => handleAction(() => {
                  alert(t('Bio feature is coming soon! Stay tuned for updates where you can share more about yourself.'));
                })}
              >
                {t('Bio')}
              </MenuButton>
              
              <MenuButton
                onClick={() => handleAction(() => {
                  alert(t('Email feature is coming soon! Soon you will be able to share your email with connections.'));
                })}
              >
                {t('E-mail')}
              </MenuButton>
              
              <MenuButton
                onClick={() => handleAction(() => {
                  alert(t('Add Contact feature is coming soon! You will be able to add this person as a contact on 6180.'));
                })}
              >
                {t('Contact On 6180')}
              </MenuButton>
            </DropdownMenu>
          )}
        </div>
      </ProfileControls>
      
      {isCurrentUser && (
        <PublicProfileExplanation>
          <p>{t('This is how others see your public profile')}</p>
        </PublicProfileExplanation>
      )}
    </ProfileHeaderContainer>
  );
};