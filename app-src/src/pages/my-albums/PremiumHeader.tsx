import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n";
import { redirectTo, generateUrl } from "@/lib/utils";

// Types
interface PremiumHeaderProps {
  publicUsername: string | null;
  subscriptionInfo: { 
    intNumberOfSubscriptions: number; 
    bytesOfDataUsed: number; 
  } | null;
  calculatedBytesUsed: number;
  onNewAlbum?: () => void;
}

interface DirectionalProps {
  $isRTL: boolean;
}

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
const mobile = (content: any) => css`
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

const CenterSection = styled.div`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  padding: 0 ${theme.spacing.md};
  
  @media (max-width: 768px) {
    display: none;
  }
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
  min-width: 140px;
  box-shadow: ${theme.boxShadow.primaryBtn};
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: ${theme.colors.primaryDark};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
  }

  &:active {
    transform: translateY(0px) scale(0.98);
  }
`;

const PlusIcon = styled.span`
  font-size: 18px;
  line-height: 1;
  font-weight: 300;
`;

const RightSection = styled.div`
  flex: 0 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const MobileNewAlbumButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
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
    padding: 6px 10px;
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

const Username = styled.span`
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

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

const DropdownMenu = styled.div<DirectionalProps>`
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

const DropdownItem = styled.a`
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

const DropdownButton = styled.button`
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

// Premium Header Component
export const PremiumHeader: React.FC<PremiumHeaderProps> = ({ 
  publicUsername,
  subscriptionInfo,
  calculatedBytesUsed,
  onNewAlbum
}) => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

  // Handle logout
  const handleLogout = () => {
    localStorage.clear();
    redirectTo("index.html");
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

          {/* Center: New Album Button (hidden on mobile) */}
          <CenterSection>
            <NewAlbumButton onClick={onNewAlbum}>
              <PlusIcon>+</PlusIcon>
              {t('New Album')}
            </NewAlbumButton>
          </CenterSection>

          {/* Right: Profile Section */}
          <RightSection ref={dropdownRef}>
            {/* Mobile New Album Button */}
            <MobileNewAlbumButton onClick={onNewAlbum}>
              {t('New Album')}
            </MobileNewAlbumButton>

            {/* Profile Button */}
            <ProfileButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <UserAvatar>
                {getDisplayName().charAt(0).toUpperCase()}
              </UserAvatar>
              
              <Username>
                {getDisplayName()}
              </Username>
              
              <DropdownArrow 
                $isOpen={isDropdownOpen}
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

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <DropdownMenu $isRTL={isRTL}>
                {/* View Public Profile */}
                {publicUsername && (
                  <DropdownItem
                    href={`https://6180.io/${publicUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span style={{ fontSize: '16px' }}>👤</span>
                    {t('View Public Profile')}
                  </DropdownItem>
                )}
                
                {/* Storage */}
                <DropdownItem href={generateUrl("storage/manage.html")}>
                  <span style={{ fontSize: '16px' }}>📦</span>
                  <StorageInfo>
                    <span>{t('Storage')}</span>
                    <StorageUsage>
                      {formatStorage()}
                    </StorageUsage>
                  </StorageInfo>
                </DropdownItem>
                
                {/* Separator */}
                <Separator />
                
                {/* Log Out */}
                <DropdownButton onClick={handleLogout}>
                  <span style={{ fontSize: '16px' }}>🚪</span>
                  {t('Log Out')}
                </DropdownButton>
              </DropdownMenu>
            )}
          </RightSection>
        </HeaderContent>
        
        {/* Bottom Divider */}
        <BottomDivider />
      </HeaderContainer>
    </>
  );
};