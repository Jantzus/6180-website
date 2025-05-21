import styled, { createGlobalStyle, css } from "styled-components";

import { UploadStatus } from "@/lib/types";

// ========== Theme Variables ==========

const theme = {
  colors: {
    primary: "#007bff",
    primaryDark: "#0056b3",
    secondary: "#6c757d",
    success: "#4caf50",
    danger: "#e53935",
    warning: "#ff9800",
    info: "#2196f3",
    light: "#f9fafb",
    dark: "#333",
    gray: "#8c8c8c",
    grayLight: "#e0e0e0",
    grayLighter: "#f0f0f0",
    white: "#fff",
    black: "#000",
    overlay: "rgba(0, 0, 0, 0.7)",
    overlayLight: "rgba(0, 0, 0, 0.5)",
    border: "#ddd",
    borderLight: "#eaeaea",
    text: {
      primary: "#333",
      secondary: "#666",
      light: "#777",
      lighter: "#999",
      white: "#fff"
    },
    background: {
      primary: "#f9fafb",
      card: "#fff",
      highlight: "#f0f7ff",
      error: "#fdeded"
    },
    highlight: {
      border: "#cce0ff",
      error: "#f7d0d0"
    }
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px"
  },
  // Simplified border radius system with fewer options based on component context
  borderRadius: {
    none: "0",
    small: "4px",      // For small UI elements like tags, badges, chips
    medium: "8px",     // For most containers, cards, buttons
    large: "16px",     // For prominent elements, modals, featured cards
    full: "999px",     // For pills, tags (nearly circular but works with any height)
    circle: "50%"      // Perfect circles (for avatars, icons)
  },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    xxl: "24px"
  },
  boxShadow: {
    sm: "0 1px 2px rgba(0,0,0,0.06)",
    md: "0 1px 3px rgba(0,0,0,0.1)",
    lg: "0 4px 10px rgba(0,0,0,0.08)",
    xl: "0 8px 24px rgba(0,0,0,0.2)",
    primaryBtn: "0 4px 12px rgba(0, 123, 255, 0.2)",
    selection: "0 2px 4px rgba(0, 0, 0, 0.2)",
    textShadow: "0 0 5px rgba(0, 0, 0, 0.8)"
  },
  breakpoints: {
    mobile: "767px"
  }
};

// ========== Global Styles ==========

export const GlobalStyle = createGlobalStyle`
  @keyframes loadingAnimation {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  
  * {
    box-sizing: border-box;
    -webkit-text-size-adjust: 100%;
  }
  
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }

  body {
    font-family: 'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  }

  #root {
    width: 100%;
    overflow-x: hidden;
  }  
`;

// ========== Mixins & Utilities ==========

// Directional styles mixin
const directionalStyles = (isRTL: boolean) => css`
  direction: ${isRTL ? 'rtl' : 'ltr'};
`;

interface DirectionalProps {
  isRTL: boolean;
}

// Responsive mixins
const mobile = (content: any) => css`
  @media (max-width: ${theme.breakpoints.mobile}) {
    ${content}
  }
`;

// Shared style mixins
const cardStyle = css`
  background-color: ${theme.colors.background.card};
  border-radius: ${theme.borderRadius.medium};
  box-shadow: ${theme.boxShadow.md};
`;

const formInputStyle = css`
  width: 100%;
  padding: 10px 12px;
  font-size: ${theme.fontSizes.md};
  border-radius: ${theme.borderRadius.small};
  border: 1px solid ${theme.colors.border};
  box-sizing: border-box;
`;

interface ButtonProps {
  disabled?: boolean;
  primary?: boolean;
  isHovered?: boolean;
  passwordSet?: boolean;
  isDisabled?: boolean;
}

const buttonBaseStyle = css<ButtonProps>`
  cursor: ${props => (props.disabled || props.isDisabled) ? 'not-allowed' : 'pointer'};
  opacity: ${props => (props.disabled || props.isDisabled) ? 0.6 : 1};
  transition: all 0.2s ease;
  border-radius: ${theme.borderRadius.medium};
`;

const overlayStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// ========== Layout Components ==========

export const Body = styled.div`
  max-width: 1200px;
  margin: auto;
  background: ${theme.colors.background.primary};
  color: ${theme.colors.text.primary};
  line-height: 1.5;
  padding: ${theme.spacing.md};
  width: 100%;
  overflow-x: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  
  ${mobile(`
    padding: ${theme.spacing.sm};
  `)}
`;

export const AppContainer = styled.div<DirectionalProps>`
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.background.primary};
  min-height: 100vh;
  max-width: 100vw;
  ${props => directionalStyles(props.isRTL)}
`;

export const MediaContainer = styled.div`
  padding: 0 ${theme.spacing.md} ${theme.spacing.md};
  width: 100%;
  overflow: visible;
  
  ${mobile(`
    padding: 0 ${theme.spacing.md} ${theme.spacing.sm};
    width: 100%;
  `)}
`;

export const ContentContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

// ========== Header Components ==========

export const Header = styled.div`
  position: sticky;
  top: 0;
  background: ${theme.colors.white};
  box-shadow: ${theme.boxShadow.sm};
  z-index: 10;
  margin-bottom: ${theme.spacing.sm};
  width: 100%;
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing.md};
  
  ${mobile(`
    padding: ${theme.spacing.md};
  `)}
`;

export const HeaderControls = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.xs};
  gap: ${theme.spacing.sm};
  flex-wrap: wrap;
  
  ${props => props.fullWidth && css`
    width: 100%;
    
    > div {
      width: auto;
      display: flex;
      align-items: center;
    }
  `}
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: ${theme.spacing.md};
`;

export const RowSelectorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${theme.spacing.sm};
`;

export const RowSelectorLabel = styled.label`
  margin-right: ${theme.spacing.sm};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text.secondary};
  font-weight: normal;
`;

export const RowSelectorSelect = styled.select`
  padding: 5px ${theme.spacing.sm};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.small};
  background-color: ${theme.colors.white};
  cursor: pointer;
  font-size: ${theme.fontSizes.sm};
  min-width: 50px;
`;

// ========== Logo and Branding ==========

export const LogoContainer = styled.div<DirectionalProps>`
  display: flex;
  align-items: center;
  flex-direction: ${props => props.isRTL ? 'row-reverse' : 'row'};
  gap: ${theme.spacing.sm};  
`;

export const Logo = styled.img`
  height: 32px;
`;

export const Headline = styled.h1`
  font-size: ${theme.fontSizes.xxl};
`;

// ========== Button Components ==========

export const Button = styled.button<ButtonProps>`
  ${buttonBaseStyle}
  background-color: ${props => {
    if (props.primary) return props.isHovered ? theme.colors.primaryDark : theme.colors.primary;
    if (props.passwordSet) return theme.colors.black;
    return 'transparent';
  }};
  color: ${props => {
    if (props.primary) return theme.colors.text.white;
    if (props.passwordSet) return theme.colors.white;
    return theme.colors.primary;
  }};
  font-weight: ${props => props.primary ? '500' : 'normal'};
  padding: 12px 20px;
  font-size: ${theme.fontSizes.md};
  border: ${props => props.primary ? 'none' : `1px solid ${theme.colors.primary}`};
  border-radius: ${theme.borderRadius.medium};
  min-width: 140px; /* Changed from fixed width to min-width */
  width: auto; /* Allow the button to grow based on content */
  white-space: nowrap; /* Prevent text wrapping */
  text-align: center;
  margin-left: auto; /* Align to trailing side */
  box-shadow: ${props => props.primary ? theme.boxShadow.primaryBtn : 'none'};
  
  &:hover {
    background-color: ${props => {
      if (props.primary) return theme.colors.primaryDark;
      if (props.passwordSet) return '#333333';
      return theme.colors.grayLighter;
    }};
  }
`;

export const MenuButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 8px;
  width: auto;
`;

export const HamburgerIcon = styled.span`
  width: 18px;
  height: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: ${theme.spacing.sm};
`;

export const HamburgerLine = styled.span`
  height: 2px;
  background: ${theme.colors.primary};
  width: 100%;
`;

export const DropdownMenuChoice = styled(Button)`
  width: 100%;
  text-align: left;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: transparent;
  color: ${theme.colors.primary};
  border: none;
  margin: 2px 0;
  
  &:hover {
    background-color: ${theme.colors.grayLighter};
  }

  border-bottom: 1px solid ${theme.colors.borderLight};
  
  &:last-of-type {
    border-bottom: none;
  }
`;

export const RemoveButton = styled.button<ButtonProps>`
  ${buttonBaseStyle}
  background-color: ${theme.colors.danger};
  color: ${theme.colors.text.white};
  border: none;
  border-radius: ${theme.borderRadius.small};
  padding: 6px ${theme.spacing.sm};
  font-size: ${theme.fontSizes.xs};
  margin-top: auto;
`;

export const NavButtonsContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

export const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
`;

// ========== User Profile & Account Components ==========

export const ProfileLink = styled.a`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
`;

export const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Username = styled.div`
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.text.secondary};
`;

export const OwnerProfileLink = styled.a`
  text-decoration: none;
  color: ${theme.colors.text.white};
  background-color: ${theme.colors.primary};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.small};
  font-size: ${theme.fontSizes.sm};
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const ProfileHeaderContainer = styled.div<{ isRTL: boolean }>`
  margin-bottom: ${theme.spacing.md};
  text-align: center;
  direction: ${props => props.isRTL ? "rtl" : "ltr"};
`;

export const ProfileControls = styled.div<{ isRTL: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${props => props.isRTL ? "flex-start" : "flex-end"};
  margin-bottom: ${theme.spacing.sm};
  position: relative;
`;

export const ProfileAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.circle};
  background-color: ${theme.colors.grayLight};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.text.secondary};
`;

export const PublicProfileDisplayNameMenu = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
`;

export const PublicProfileDisplayName = styled.h1`
  font-size: ${theme.fontSizes.lg};
  margin: 0;
  font-weight: 600;
`;

export const PublicProfileExplanation = styled.div`
  margin-top: ${theme.spacing.sm};
  padding: ${theme.spacing.sm};
  background-color: ${theme.colors.background.highlight};
  border-radius: ${theme.borderRadius.small};
  border: 1px solid ${theme.colors.highlight.border};
  max-width: 500px;
  font-size: ${theme.fontSizes.xs};
  margin: 0 auto;
  
  p {
    margin: 0;
  }
`;

// ========== Text & Typography Components ==========

export const AlbumTitle = styled.h2`
  font-weight: 400;
  margin: 0 0 ${theme.spacing.md} 0;
  font-size: ${theme.fontSizes.xxl};
  padding: 0;
  
  ${mobile(`
    padding: 0;
  `)}
`;

export const AlbumTitleStrong = styled.strong`
  font-weight: 700;
`;

export const Card = styled.div<{ padding?: string; marginBottom?: string }>`
  ${cardStyle}
  padding: ${props => props.padding || theme.spacing.md};
  margin-bottom: ${props => props.marginBottom || theme.spacing.md};
  width: 100%;
`;

export const DescriptionText = styled.p`
  color: ${theme.colors.text.primary};
  margin: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  max-width: 100%;
  font-size: ${theme.fontSizes.md};
`;

// Message styles
interface MessageProps {
  type?: 'error' | 'loading' | 'info';
}

export const Message = styled.div<MessageProps>`
  text-align: center;
  padding: 40px;
  font-size: ${theme.fontSizes.lg};
  grid-column: 1 / -1;
  width: 100%;
  border-radius: ${theme.borderRadius.medium};
  color: ${props => {
    switch(props.type) {
      case 'error': return theme.colors.danger;
      case 'loading': return theme.colors.text.secondary;
      default: return theme.colors.text.primary;
    }
  }};
`;


export const AlbumDescription = styled.div<{ isRTL: boolean }>`
  margin-top: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.text.secondary};
  line-height: 1.5;
  text-align: ${props => props.isRTL ? "right" : "left"};
  white-space: pre-wrap;
`;

export const AlbumDates = styled.div<{ isRTL: boolean }>`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.text.light};
  text-align: ${props => props.isRTL ? "right" : "left"};
  margin-top: ${theme.spacing.xs};
`;

export const PolicyIndicator = styled.div`
  display: flex;
  align-items: center;
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.text.secondary};
`;

// ========== Media Grid Components ==========

export const MediaGrid = styled.div<{ columns: string }>`
  display: grid;
  grid-gap: ${theme.spacing.md};
  width: 100%;
  min-height: 0;
  
  ${props => {
    switch(props.columns) {
      case '1': return css`grid-template-columns: repeat(1, 1fr);`;
      case '2': return css`grid-template-columns: repeat(2, 1fr);`;
      case '3': return css`grid-template-columns: repeat(3, 1fr);`;
      case '4': return css`grid-template-columns: repeat(4, 1fr);`;
      case '5': return css`grid-template-columns: repeat(5, 1fr);`;
      default: return css`grid-template-columns: repeat(1, 1fr);`;
    }
  }}
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-gap: ${theme.spacing.sm};
    ${props => {
      const col = parseInt(props.columns);
      if (col > 3) return css`grid-template-columns: repeat(3, minmax(0, 1fr));`;
      if (col > 1) return css`grid-template-columns: repeat(${col}, minmax(0, 1fr));`;
      return css`grid-template-columns: repeat(1, minmax(0, 1fr));`;
    }}
  }
`;

// Media block style
const mediaBlockStyle = css<{ isHovered?: boolean }>`
  ${cardStyle}
  transition: transform 0.2s;
  position: relative;
  height: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  margin-bottom: ${theme.spacing.md};
  
  ${props => props.isHovered && css`
    transform: translateY(-2px);
  `}
  
  ${mobile(`
    margin-bottom: ${theme.spacing.sm};
  `)}
`;

export const MediaBlock = styled.div<{ 
  isHovered?: boolean; 
  isVideo?: boolean; 
  isSelected?: boolean 
}>`
  ${mediaBlockStyle}
  ${props => props.isVideo && css`
    cursor: pointer;
  `}
  ${props => props.isSelected && css`
    border: 3px solid ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(0, 106, 220, 0.3);
  `}
`;

export const PhotoGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
`;

export const PhotoCard = styled.div`
  ${cardStyle}
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing.sm};
  width: 160px;
  position: relative;
`;

// ========== Image & Video Components ==========

export const LazyImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  background-color: ${theme.colors.grayLighter};
  width: 100%;
  padding-bottom: 75%;
  height: 0;
  border-radius: ${theme.borderRadius.medium};
  
  ${mobile(`
    padding-bottom: 100%;
  `)}
`;

// Image styles
interface ImageProps {
  isLoaded: boolean;
  objectFit?: 'cover' | 'contain';
}

export const Image = styled.img<ImageProps>`
  opacity: ${props => props.isLoaded ? 1 : 0};
  transition: opacity 0.3s;
  max-width: 100%;
  max-height: 100%;
  object-fit: ${props => props.objectFit || 'contain'};
  border-radius: ${theme.borderRadius.medium};
  ${props => props.objectFit === 'cover' && css`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  `}
`;

export const ThumbnailImage = styled.img`
  position: absolute;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  opacity: 0.5;
  border-radius: ${theme.borderRadius.medium};
`;

export const VideoElement = styled.video`
  max-width: 100%;
  max-height: 100%;
  border-radius: ${theme.borderRadius.medium};
`;

export const ThumbnailWrapper = styled.div`
  position: relative;
  overflow: hidden;
  background-color: ${theme.colors.grayLighter};
  width: 100%;
  min-height: 200px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  border-radius: ${theme.borderRadius.medium};
  
  ${mobile(`
    min-height: 120px;
    aspect-ratio: 1/1;
    height: 0;
    padding-bottom: 100%;
  `)}
`;

export const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background-color: ${theme.colors.overlayLight};
  border-radius: ${theme.borderRadius.circle};
  z-index: 2;
  
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 55%;
    transform: translate(-50%, -50%);
    border-style: solid;
    border-width: 15px 0 15px 25px;
    border-color: transparent transparent transparent ${theme.colors.white};
  }
  
  ${mobile(`
    width: 40px;
    height: 40px;
    
    &::before {
      border-width: 10px 0 10px 16px;
    }
  `)}
`;

export const MediaPreview = styled.div`
  position: relative;
  margin-bottom: ${theme.spacing.sm};
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MediaItem = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: ${theme.borderRadius.medium};
`;

export const VideoItem = styled.video`
  max-width: 100%;
  max-height: 100%;
  border-radius: ${theme.borderRadius.medium};
`;

export const MediaWrapper = styled.div`
  position: relative;
`;

// ========== Loading & Progress Components ==========

export const LoadingPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, ${theme.colors.grayLighter} 25%, ${theme.colors.grayLight} 50%, ${theme.colors.grayLighter} 75%);
  background-size: 200% 100%;
  animation: loadingAnimation 1.5s infinite;
  z-index: 0;
  border-radius: ${theme.borderRadius.medium};
`;

export const Overlay = styled.div<{ type?: 'loading' | 'watermark' }>`
  ${overlayStyle}
  background-color: ${props => props.type === 'loading' ? theme.colors.overlayLight : 'transparent'};
  z-index: ${props => props.type === 'loading' ? 4 : 5};
  color: ${props => props.type === 'loading' ? theme.colors.white : 'inherit'};
  font-weight: ${props => props.type === 'loading' ? 500 : 'inherit'};
  text-align: ${props => props.type === 'loading' ? 'center' : 'inherit'};
  padding: ${props => props.type === 'loading' ? '0 10px' : '0'};
  pointer-events: ${props => props.type === 'watermark' ? 'none' : 'auto'};
  border-radius: ${theme.borderRadius.medium}; // For overlays on containers/cards
`;

export const LoadingIndicator = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${theme.colors.overlay};
  color: ${theme.colors.white};
  padding: 10px 20px;
  border-radius: ${theme.borderRadius.small};
  z-index: 10;
  font-size: ${theme.fontSizes.md};
`;

// Progress components
interface ProgressProps {
  progress?: number;
  status?: UploadStatus;
  isError?: boolean;
}

export const ProgressTitle = styled.h3`
  font-size: ${theme.fontSizes.lg};
  margin: 0 0 ${theme.spacing.sm} 0;
`;

export const ProgressBarBg = styled.div<{ bottom?: string; left?: string; right?: string; height?: string }>`
  height: ${props => props.height || '8px'};
  background-color: ${theme.colors.grayLight};
  border-radius: ${theme.borderRadius.small};
  overflow: hidden;
  ${props => props.bottom && `bottom: ${props.bottom};`}
  ${props => props.left && `left: ${props.left};`}
  ${props => props.right && `right: ${props.right};`}
  ${props => props.bottom && props.left && props.right && 'position: absolute;'}
`;

export const ProgressBar = styled.div<ProgressProps>`
  height: 100%;
  background-color: ${props => {
    if (props.status === 'processing') return theme.colors.warning;
    if (props.status === 'error') return theme.colors.danger;
    if (props.status === 'complete') return theme.colors.success;
    return theme.colors.info; // Default or uploading
  }};
  border-radius: ${theme.borderRadius.small};
  transition: width 0.3s ease;
  width: ${props => (props.progress || 0) * 100}%;
`;

export const ProgressText = styled.div`
  font-size: ${theme.fontSizes.sm};
  margin-bottom: ${theme.spacing.sm};
`;

// ========== Modal & Dialog Components ==========

interface ModalProps {
  zIndex?: number;
}

export const Modal = styled.div<ModalProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.overlay};
  z-index: ${props => props.zIndex || 1000};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  ${cardStyle}
  padding: ${theme.spacing.md};
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  ${mobile(`
    padding: ${theme.spacing.md};
    width: 90%;
  `)}
`;

// Username component styles
export const UsernameModal = styled.div<DirectionalProps>`
  background: ${theme.colors.white};
  padding: 30px;
  border-radius: ${theme.borderRadius.large};
  width: 90%;
  max-width: 400px;
  box-shadow: ${theme.boxShadow.xl};
  ${props => directionalStyles(props.isRTL)}
`;

export const UsernameTitle = styled.p`
  font-size: ${theme.fontSizes.md};
  margin-bottom: ${theme.spacing.sm};
`;

export const UsernameDescription = styled.p`
  font-size: ${theme.fontSizes.sm};
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.text.secondary};
`;

export const UsernameInput = styled.input<DirectionalProps>`
  width: 100%;
  padding: 10px;
  margin-bottom: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.small};
  border: 1px solid ${theme.colors.border};
  font-size: ${theme.fontSizes.md};
  text-align: ${props => props.isRTL ? 'right' : 'left'};
`;

export const UsernameError = styled.div`
  color: ${theme.colors.danger};
  margin-bottom: ${theme.spacing.sm};
  font-size: ${theme.fontSizes.sm};
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 100;
  background-color: ${theme.colors.white};
  box-shadow: ${theme.boxShadow.md};
  border-radius: ${theme.borderRadius.small};
  padding: ${theme.spacing.sm};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  min-width: 180px;
  margin-top: ${theme.spacing.xs};
`;

export const FullscreenContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 2000;
  display: flex;
  flex-direction: column;
`;

// ========== Selection & Status Components ==========

export const SelectionCheckbox = styled.div<{ isSelected: boolean }>`
  position: absolute;
  top: ${theme.spacing.sm};
  right: ${theme.spacing.sm};
  z-index: 10;
  width: 24px;
  height: 24px;
  border-radius: ${theme.borderRadius.circle};
  background-color: ${(props) => (props.isSelected ? theme.colors.primary : 'rgba(255, 255, 255, 0.8)')};
  border: ${(props) => (props.isSelected ? 'none' : `2px solid ${theme.colors.primary}`)};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${theme.boxShadow.selection};
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

export const Checkmark = styled.div`
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes.sm};
  font-weight: bold;
`;

export const SelectionBanner = styled.div`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background-color: ${theme.colors.background.highlight};
  border-radius: ${theme.borderRadius.small};
  margin-bottom: ${theme.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${theme.boxShadow.md};
`;

export const SelectedCount = styled.p`
  font-size: ${theme.fontSizes.sm};
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.text.primary};
`;

// Badge styles
interface BadgeProps {
  position: 'bottomLeft' | 'bottomRight';
  light?: boolean;
}

export const Badge = styled.div<BadgeProps>`
  position: absolute;
  z-index: 2;
  bottom: ${theme.spacing.sm};
  left: ${(props: BadgeProps) => props.position === 'bottomLeft' ? theme.spacing.sm : 'auto'};
  right: ${(props: BadgeProps) => props.position === 'bottomRight' ? theme.spacing.sm : 'auto'};
  background: ${(props: BadgeProps) => props.light ? 'rgba(255,255,255,0.85)' : theme.colors.overlay};
  color: ${(props: BadgeProps) => props.light ? 'inherit' : theme.colors.white};
  padding: ${(props: BadgeProps) => props.light ? '6px 12px' : '4px 8px'};
  font-size: ${(props: BadgeProps) => props.light ? theme.fontSizes.xs : theme.fontSizes.sm};
  font-weight: 500;
  border-radius: ${(props: BadgeProps) => props.light ? theme.borderRadius.small : theme.borderRadius.small};
  
  ${mobile(`
    padding: ${(props: BadgeProps) => props.light ? '3px 6px' : '2px 6px'};
    font-size: ${(props: BadgeProps) => props.light ? '10px' : theme.fontSizes.xs};
    bottom: ${(props: BadgeProps) => props.light ? '8px' : theme.spacing.sm};
    ${(props: BadgeProps) => props.position === 'bottomRight' && props.light && `
      max-width: 45%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `}
  `)}
`;

export const StatusIndicator = styled.div<{ status: UploadStatus }>`
  position: absolute;
  top: ${theme.spacing.sm};
  right: ${theme.spacing.sm};
  width: 24px;
  height: 24px;
  border-radius: ${theme.borderRadius.circle};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.white};
  z-index: 1;
  background-color: ${props => {
    switch(props.status) {
      case 'complete': return theme.colors.success;
      case 'error': return theme.colors.danger;
      case 'uploading': return theme.colors.info;
      case 'processing': return theme.colors.warning;
      default: return theme.colors.gray;
    }
  }};
`;

// ========== Form Components ==========

export const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: ${theme.spacing.sm};
  font-size: ${theme.fontSizes.sm};
  font-weight: 500;
  color: ${theme.colors.text.primary};
`;

export const FormInput = styled.input`
  ${formInputStyle}
`;

export const FormTextarea = styled.textarea`
  ${formInputStyle}
  resize: vertical;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

// ========== Toggle Components ==========

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing.md};
  padding: 4px 0;
  gap: 15px;
`;

export const ToggleLabel = styled.div`
  font-size: ${theme.fontSizes.sm};
  font-weight: 500;
  color: ${theme.colors.text.primary};
  line-height: 24px;
`;

export const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
    
    &:checked + span {
      background-color: ${theme.colors.primary};
    }
    
    &:focus + span {
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
    
    &:checked + span:before {
      transform: translateX(16px);
    }
    
    &:disabled + span {
      background-color: #e6e6e6;
      cursor: not-allowed;
    }
  }
`;

export const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${theme.colors.grayLight};
  transition: .2s;
  border-radius: 24px;
  
  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 2px;
    top: 2px;
    background-color: ${theme.colors.white};
    transition: .2s;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`;

// ========== Watermark Components ==========

export const WatermarkText = styled.div`
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes.xxl};
  font-weight: bold;
  transform: rotate(-30deg);
  opacity: 0.7;
  text-shadow: ${theme.boxShadow.textShadow};
  user-select: none;
  white-space: nowrap;
`;

// ========== Miscellaneous Components ==========

export const FileInfo = styled.div`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.text.secondary};
  margin-bottom: 6px;
`;

export const LegalLinksFooter = styled.div`
  text-align: center;
  padding: ${theme.spacing.md};
  font-size: 0.9em;
  color: ${theme.colors.text.secondary};
`;

export const LegalLinkFooterButton = styled.a<{ isHovered?: boolean }>`
  margin: 0 ${theme.spacing.sm};
  color: ${theme.colors.text.secondary};
  text-decoration: ${props => props.isHovered ? 'underline' : 'none'};
`;

// State components
interface StateProps {
  type?: 'empty' | 'error';
}

export const State = styled.div<StateProps>`
  text-align: center; 
  padding: 40px ${theme.spacing.md};
  border-radius: ${theme.borderRadius.medium};
  background-color: ${props => props.type === 'error' ? theme.colors.background.error : theme.colors.white};
  border: ${props => props.type === 'error' ? `1px solid ${theme.colors.highlight.error}` : 'none'};
  box-shadow: ${props => props.type === 'empty' ? theme.boxShadow.md : 'none'};
  margin-bottom: ${props => props.type === 'error' ? theme.spacing.md : '0'};
  
  p {
    font-size: ${theme.fontSizes.md};
    color: ${props => props.type === 'error' ? theme.colors.danger : theme.colors.text.secondary};
  }
`;

export const DebugContainer = styled.div`
  margin-top: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.grayLighter};
  border-radius: ${theme.borderRadius.medium};
`;

export const DebugTitle = styled.h3`
  margin: 0 0 ${theme.spacing.sm} 0;
  font-size: ${theme.fontSizes.md};
`;

export const DebugMessages = styled.pre`
  margin: 0;
  font-size: ${theme.fontSizes.xs};
  white-space: pre-wrap;
  max-height: 200px;
  overflow-y: auto;
`;

export const DebugMessage = styled.div`
  margin-bottom: ${theme.spacing.xs};
  font-size: ${theme.fontSizes.xs};
`;

// Styled component for the logout link
export const StyledLogoutLink = styled.a`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.text.secondary};
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${theme.colors.text.primary};
  }
`;

export const FileCount = styled.div<{ isRTL: boolean }>`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.text.lighter};
  text-align: ${props => props.isRTL ? "right" : "right"};
  margin-bottom: ${theme.spacing.md};
  display: flex;
  justify-content: flex-end;
`;