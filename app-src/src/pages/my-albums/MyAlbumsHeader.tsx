import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n";
import { redirectTo, generateUrl } from "@/lib/utils";

// Types
type MyAlbumsHeaderProps = {
  publicUsername: string | null;
  subscriptionInfo: { 
    intNumberOfSubscriptions: number; 
    bytesOfDataUsed: number; 
  } | null;
  calculatedBytesUsed: number;
  onNewAlbum?: () => void; // Keep for backward compatibility
  onSelectFiles?: () => void; // File selection handler
  onSelectFolder?: () => void; // Folder selection handler
};

interface DirectionalProps {
  $isRTL: boolean;
}

// SSR-safe device detection defaults
const DEFAULT_IS_MOBILE = false;

// Theme object (matching your existing theme structure)
const theme = {
  colors: {
    primary: "#007bff",
    primaryDark: "#0056b3",
    danger: "#e53935",
    white: "#fff",
    grayLight: "#e0e0e0",
    borderLight: "#eaeaea",
    text: {
      primary: "#333",
      secondary: "#666",
      white: "#fff"
    }
  },
  spacing: {
    sm: "8px",
    md: "16px",
    lg: "24px"
  },
  borderRadius: {
    small: "4px",
    medium: "8px",
    large: "16px",
    circle: "50%"
  },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    lg: "18px",
    xl: "20px"
  },
  boxShadow: {
    primaryBtn: "0 4px 12px rgba(0, 123, 255, 0.2)",
    xl: "0 8px 24px rgba(0,0,0,0.2)"
  },
  breakpoints: {
    mobile: "767px"
  }
};

// Responsive mixin
const mobile = (content: string) => css`
  @media (max-width: ${theme.breakpoints.mobile}) {
    ${content}
  }
`;

// Styled Components
const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid ${theme.colors.borderLight};
  transition: all 0.2s ease;
`;

const HeaderContent = styled.div<DirectionalProps>`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md}; /* Reduced from lg to md to match content */
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  direction: ${props => props.$isRTL ? 'rtl' : 'ltr'};
  
  ${mobile(`
    padding: 0 ${theme.spacing.md};
  `)}
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  flex: 0 0 auto;
`;

const Logo = styled.img`
  width: 28px;
  height: 28px;
  border-radius: ${theme.borderRadius.small};
  object-fit: cover;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
  pointer-events: none;
  
  ${mobile(`
    width: 24px;
    height: 24px;
  `)}
`;

const AppTitle = styled.h1`
  font-size: ${theme.fontSizes.xl};
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin: 0;
  letter-spacing: -0.01em;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif;
  
  ${mobile(`
    font-size: ${theme.fontSizes.lg};
  `)}
`;

const CenterSection = styled.div<{ $isMobile: boolean }>`
  flex: 1 1 auto;
  display: ${props => props.$isMobile ? 'none' : 'flex'};
  justify-content: center;
  padding: 0 ${theme.spacing.md};
  
  @media (max-width: 768px) {
    display: none;
  }
`;

// Simplified button group for two separate buttons
const ButtonGroup = styled.div`
  display: inline-flex;
  gap: ${theme.spacing.sm};
  align-items: center;
`;

const NewAlbumButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: 10px ${theme.spacing.md};
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text.white};
  border: none;
  border-radius: ${theme.borderRadius.medium};
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif;
  min-width: 120px;
  box-shadow: ${theme.boxShadow.primaryBtn};

  &:hover {
    background-color: ${theme.colors.primaryDark};
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const UploadFolderButton = styled.button<{ $isMobile: boolean }>`
  display: ${props => props.$isMobile ? 'none' : 'inline-flex'};
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: 10px ${theme.spacing.md};
  background-color: transparent;
  color: ${theme.colors.primary};
  border: 1px solid ${theme.colors.primary};
  border-radius: ${theme.borderRadius.medium};
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif;
  min-width: 120px;

  &:hover {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.text.white};
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }

  // Hide on mobile/tablet
  @media (max-width: 1024px) {
    display: none;
  }
`;

const PlusIcon = styled.span`
  font-size: 18px;
  line-height: 1;
  font-weight: 300;
`;

const FolderIcon = styled.span`
  font-size: 16px;
  line-height: 1;
`;

const RightSection = styled.div`
  flex: 0 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const MobileNewAlbumButton = styled.button<{ $isMobile: boolean }>`
  display: ${props => props.$isMobile ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  padding: 10px 12px;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text.white};
  border: none;
  border-radius: ${theme.borderRadius.small};
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${theme.boxShadow.primaryBtn};
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif;
  white-space: nowrap;

  &:hover {
    background-color: ${theme.colors.primaryDark};
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    display: flex;
  }

  @media (max-width: 480px) {
    padding: 10px 10px;
    font-size: ${theme.fontSizes.xs};
  }
`;

const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: 6px ${theme.spacing.sm};
  background-color: transparent;
  border: none;
  border-radius: ${theme.borderRadius.small};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: ${theme.fontSizes.sm};
  font-weight: 500;
  color: ${theme.colors.text.primary};
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif;

  &:hover {
    background-color: rgba(0, 0, 0, 0.06);
  }
`;

const UserAvatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: ${theme.borderRadius.circle};
  background-color: ${theme.colors.grayLight};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text.secondary};
  font-weight: 600;
`;

const Username = styled.span<{ $isMobile: boolean }>`
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: ${props => props.$isMobile ? 'none' : 'inline'};

  @media (max-width: 768px) {
    display: none;
  }
`;

const DropdownArrow = styled.svg<{ $isOpen: boolean }>`
  width: 12px;
  height: 12px;
  transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.2s ease;
  opacity: 0.6;
`;

const ProfileDropdownMenu = styled.div<DirectionalProps>`
  position: absolute;
  top: 100%;
  right: ${props => props.$isRTL ? 'auto' : '0'};
  left: ${props => props.$isRTL ? '0' : 'auto'};
  margin-top: ${theme.spacing.sm};
  min-width: 240px;
  background-color: ${theme.colors.white};
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: ${theme.borderRadius.large};
  box-shadow: ${theme.boxShadow.xl};
  padding: ${theme.spacing.sm};
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif;
  z-index: 1001;

  ${mobile(`
    min-width: 220px;
    max-width: calc(100vw - 32px);
  `)}
`;

const ProfileDropdownItem = styled.a`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} 14px;
  border-radius: ${theme.borderRadius.small};
  text-decoration: none;
  color: ${theme.colors.text.primary};
  font-size: ${theme.fontSizes.sm};
  font-weight: 400;
  transition: background-color 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const ProfileDropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} 14px;
  border-radius: ${theme.borderRadius.small};
  background-color: transparent;
  border: none;
  color: ${theme.colors.danger};
  font-size: ${theme.fontSizes.sm};
  font-weight: 400;
  transition: background-color 0.2s ease;
  cursor: pointer;
  width: 100%;
  text-align: left;

  &:hover {
    background-color: rgba(255, 59, 48, 0.08);
  }
`;

const StorageInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StorageUsage = styled.span`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.text.secondary};
  font-weight: 400;
  margin-top: 2px;
`;

const Separator = styled.div`
  height: 1px;
  background-color: rgba(0, 0, 0, 0.08);
  margin: ${theme.spacing.sm} 0;
`;

const BottomDivider = styled.div`
  height: 1px;
  background-color: ${theme.colors.borderLight};
  width: 100%;
`;

// Main Component
export const MyAlbumsHeader: React.FC<MyAlbumsHeaderProps> = ({ 
  publicUsername,
  subscriptionInfo,
  calculatedBytesUsed,
  onNewAlbum,
  onSelectFiles,
  onSelectFolder
}) => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";
  
  // SSR-safe state management
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(DEFAULT_IS_MOBILE);
  const [isClient, setIsClient] = useState(false);
  
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // SSR-safe device detection and event listeners
  useEffect(() => {
    setIsClient(true);
    
    // Detect device type after hydration
    const checkDevice = () => {
      if (typeof window !== 'undefined') {
        const windowWidth = window.innerWidth;
        const newIsMobile = windowWidth <= 768;
        setIsMobile(newIsMobile);
      }
    };
    
    checkDevice();
    
    // Set up event listeners
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    const handleResize = () => {
      checkDevice();
    };

    if (typeof window !== 'undefined') {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('resize', handleResize);
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  // Format storage usage
  const formatStorage = () => {
    if (!subscriptionInfo) return "-- / -- GB";
    
    const usedGB = (calculatedBytesUsed / (1024 * 1024 * 1024)).toFixed(1);
    const totalGB = subscriptionInfo.intNumberOfSubscriptions === 0 
      ? 10 
      : subscriptionInfo.intNumberOfSubscriptions * 10;
    
    return `${usedGB} / ${totalGB} GB`;
  };

  // Get display name
  const getDisplayName = () => {
    if (!publicUsername) return "Profile";
    const firstName = publicUsername.split(' ')[0];
    return firstName.length > 12 ? firstName.substring(0, 12) + "..." : firstName;
  };

  // Handle logout - SSR-safe
  const handleLogout = () => {
    if (isClient && typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
    redirectTo("index.html");
  };

  // Handle button clicks
  const handleSelectFiles = () => {
    if (onSelectFiles) {
      onSelectFiles();
    } else if (onNewAlbum) {
      // Fallback to original behavior
      onNewAlbum();
    }
  };

  const handleSelectFolder = () => {
    if (onSelectFolder) {
      onSelectFolder();
    }
  };

  return (
    <>
      <HeaderContainer>
        <HeaderContent $isRTL={isRTL}>
          {/* Left: Logo and App Name */}
          <LogoSection>
            <Logo 
              src={generateUrl("images/logo_no_background.png")}
              alt="6180 Logo"
            />
            <AppTitle>6180</AppTitle>
          </LogoSection>

          {/* Center: New Album and Upload Folder Buttons (hidden on mobile) */}
          <CenterSection $isMobile={isMobile}>
            <ButtonGroup>
              <NewAlbumButton onClick={handleSelectFiles}>
                <PlusIcon>+</PlusIcon>
                {t('New Album')}
              </NewAlbumButton>
              
              {/* Upload Folder Button - only show if handler exists and on desktop */}
              {onSelectFolder && (
                <UploadFolderButton $isMobile={isMobile} onClick={handleSelectFolder}>
                  <FolderIcon>📁</FolderIcon>
                  {t('Upload Folder')}
                </UploadFolderButton>
              )}
            </ButtonGroup>
          </CenterSection>

          {/* Right: Profile Section */}
          <RightSection>
            {/* Mobile New Album Button */}
            <MobileNewAlbumButton $isMobile={isMobile} onClick={handleSelectFiles}>
              {t('New Album')}
            </MobileNewAlbumButton>

            {/* Profile Button */}
            <div ref={profileDropdownRef} style={{ position: 'relative' }}>
              <ProfileButton onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}>
                <UserAvatar>
                  {getDisplayName().charAt(0).toUpperCase()}
                </UserAvatar>
                
                <Username $isMobile={isMobile}>
                  {getDisplayName()}
                </Username>
                
                <DropdownArrow 
                  $isOpen={isProfileDropdownOpen}
                  viewBox="0 0 12 12"
                >
                  <path 
                    d="M2.5 4.5L6 8L9.5 4.5" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </DropdownArrow>
              </ProfileButton>

              {/* Profile Dropdown Menu */}
              {isProfileDropdownOpen && (
                <ProfileDropdownMenu $isRTL={isRTL}>
                  {/* View Public Profile */}
                  {publicUsername && (
                    <ProfileDropdownItem
                      href={`https://6180.io/${publicUsername}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span style={{ fontSize: '16px' }}>👤</span>
                      {t('View Public Profile')}
                    </ProfileDropdownItem>
                  )}
                  
                  {/* Storage */}
                  <ProfileDropdownItem href={generateUrl("storage/manage.html")}>
                    <span style={{ fontSize: '16px' }}>📦</span>
                    <StorageInfo>
                      <span>{t('Storage')}</span>
                      <StorageUsage>
                        {formatStorage()}
                      </StorageUsage>
                    </StorageInfo>
                  </ProfileDropdownItem>
                  
                  {/* Separator */}
                  <Separator />
                  
                  {/* Log Out */}
                  <ProfileDropdownButton onClick={handleLogout}>
                    <span style={{ fontSize: '16px' }}>🚪</span>
                    {t('Log Out')}
                  </ProfileDropdownButton>
                </ProfileDropdownMenu>
              )}
            </div>
          </RightSection>
        </HeaderContent>
        
        {/* Bottom Divider */}
        <BottomDivider />
      </HeaderContainer>
    </>
  );
};