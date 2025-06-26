import styled, { css } from "styled-components";
import { 
  theme,
  DirectionalProps
} from './theme'
import { 
  Button,
} from './components/buttons'
import { overlayStyle } from '@/styles/globalStyles'

// ========== Header Height Constants ==========
// Define header height as a constant to keep it consistent across components
const HEADER_HEIGHT = '64px'; // Increased from 60px for better slogan visibility
const HEADER_HEIGHT_MOBILE = '60px'; // Increased from 56px

export const directionalStyles = (isRTL: boolean) => css`
  direction: ${isRTL ? 'rtl' : 'ltr'};
`;

// ========== Brand Header Components ==========

export const FixedHeader = styled.div`
  /* Fixed positioning for 100% reliability */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: ${HEADER_HEIGHT};
  
  /* Enhanced styling with subtle blur and divider */
  background-color: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid ${theme.colors.borderLight};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px); /* Safari support */
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  
  /* Fixed z-index - stays below modals but above normal content */
  z-index: 9999;
  
  /* Performance optimizations */
  will-change: transform;
  transform: translateZ(0);
  
  /* Mobile adjustments */
  @media (max-width: ${theme.breakpoints.mobile}) {
    height: ${HEADER_HEIGHT_MOBILE};
  }
`;

export const FixedHeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0 ${theme.spacing.md};
  }
`;

// ========== Enhanced Login Components ==========


export const LogoImage = styled.img`
  height: 60px;
  margin-bottom: 16px;
  /* Image protection */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
  pointer-events: none;
`;

// Enhanced Input component with visual polish
export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 6px;
  /* Enhanced: Remove border until focused */
  border: 1px solid transparent;
  background-color: ${theme.colors.grayLighter};
  font-size: 16px;
  box-sizing: border-box;
  transition: all 0.2s ease;
  
  /* Enhanced placeholder styling for elegance */
  &::placeholder {
    color: ${theme.colors.text.lighter};
    opacity: 0.5; // Lower opacity for more elegant appearance
  }
  
  /* Enhanced: Light blue glow on focus */
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    background-color: ${theme.colors.white};
    box-shadow: ${theme.boxShadow.focusGlow};
  }
  
  /* Subtle hover state */
  &:hover:not(:focus) {
    background-color: ${theme.colors.white};
    border-color: ${theme.colors.borderLight};
  }
`;

export const CenteredContent = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

// ========== Layout & Filter Control Components ==========

export const ColumnsSelector = styled.select`
  padding: 8px 12px;
  border-radius: ${theme.borderRadius.medium}; /* Match tag styling */
  border: 1px solid ${theme.colors.borderLight};
  background-color: ${theme.colors.white};
  font-size: 14px; /* Match tag font size */
  cursor: pointer;
  box-shadow: ${theme.boxShadow.sm}; /* Subtle shadow to match tags */
  min-width: 60px;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${theme.colors.border};
    box-shadow: ${theme.boxShadow.md};
  }
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.boxShadow.focusGlow};
  }
`;

// ========== Header Components ==========

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  /* Enhanced: Use consistent grid spacing */
  margin-bottom: ${theme.spacing.lg};
  position: relative;
  z-index: 1;
  margin-top: 0;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-top: 0;
    flex-wrap: wrap;
    gap: ${theme.spacing.sm};
  }
`;

// ========== Logo and Branding ==========

export const Logo = styled.img`
  height: 32px;
  /* Image protection */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
  pointer-events: none;
`;

// ========== Button Components ==========

export const MenuButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px; /* Consistent with Button padding */
  width: auto;
  height: 40px; /* Same fixed height as Button */
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
  padding: ${theme.spacing.md};
  background: transparent;
  color: ${theme.colors.primary};
  border: none;
  margin: 2px 0;
  height: auto; /* Allow dropdown items to have natural height */
  
  &:hover {
    background-color: ${theme.colors.grayLighter};
  }

  border-bottom: 1px solid ${theme.colors.borderLight};
  
  &:last-of-type {
    border-bottom: none;
  }
`;

// ========== User Profile & Account Components ==========

export const ProfileLink = styled.a`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.xs} 0;
  
  &:hover {
    text-decoration: underline;
  }
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

export const ProfileHeaderContainer = styled.div<DirectionalProps>`
  /* Enhanced: Use consistent grid spacing */
  margin-bottom: ${theme.spacing.lg};
  text-align: center;
  direction: ${props => props.$isRTL ? "rtl" : "ltr"};
`;

export const ProfileControls = styled.div<DirectionalProps>`
  display: flex;
  align-items: center;
  justify-content: ${props => props.$isRTL ? "flex-start" : "flex-end"};
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
  /* Enhanced: Use consistent grid spacing */
  margin: 0 0 ${theme.spacing.lg} 0;
  font-size: ${theme.fontSizes.xxl};
  padding: 0;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0;
  }
`;

export const AlbumTitleStrong = styled.strong`
  font-weight: 700;
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
  $type?: 'error' | 'loading' | 'info';
}

export const Message = styled.div<MessageProps>`
  text-align: center;
  padding: 40px;
  font-size: ${theme.fontSizes.lg};
  grid-column: 1 / -1;
  width: 100%;
  border-radius: ${theme.borderRadius.medium};
  color: ${props => {
    switch(props.$type) {
      case 'error': return theme.colors.danger;
      case 'loading': return theme.colors.text.secondary;
      default: return theme.colors.text.primary;
    }
  }};
`;


export const AlbumDescription = styled.div<DirectionalProps>`
  margin-top: ${theme.spacing.sm};
  /* Enhanced: Use consistent grid spacing */
  margin-bottom: ${theme.spacing.lg};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.text.secondary};
  line-height: 1.5;
  text-align: ${props => props.$isRTL ? "right" : "left"};
  white-space: pre-wrap;
`;

export const AlbumDates = styled.div<DirectionalProps>`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.text.light};
  text-align: ${props => props.$isRTL ? "right" : "left"};
  margin-top: ${theme.spacing.xs};
`;

export const PolicyIndicator = styled.div`
  display: flex;
  align-items: center;
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.text.secondary};
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

export const Overlay = styled.div<{ $type?: 'loading' | 'watermark' }>`
  ${overlayStyle}
  background-color: ${props => props.$type === 'loading' ? theme.colors.overlayLight : 'transparent'};
  z-index: ${props => props.$type === 'loading' ? 4 : 5};
  color: ${props => props.$type === 'loading' ? theme.colors.white : 'inherit'};
  font-weight: ${props => props.$type === 'loading' ? 500 : 'inherit'};
  text-align: ${props => props.$type === 'loading' ? 'center' : 'inherit'};
  padding: ${props => props.$type === 'loading' ? '0 10px' : '0'};
  pointer-events: ${props => props.$type === 'watermark' ? 'none' : 'auto'};
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

// ========== Modal & Dialog Components ==========

interface ModalProps {
  $zIndex?: number;
}

export const Modal = styled.div<ModalProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.overlay};
  z-index: ${props => props.$zIndex || 10000}; /* Always above header (9999) */
  display: flex;
  justify-content: center;
  align-items: center;
`;


export const UsernameInput = styled.input<DirectionalProps>`
  width: 100%;
  padding: 10px;
  margin-bottom: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.small};
  border: 1px solid ${theme.colors.border};
  font-size: ${theme.fontSizes.md};
  text-align: ${props => props.$isRTL ? 'right' : 'left'};
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
  z-index: 9998; /* Just below header, above normal content */
  background-color: ${theme.colors.white};
  box-shadow: ${theme.boxShadow.md};
  border-radius: ${theme.borderRadius.small};
  padding: ${theme.spacing.sm};
  display: flex;
  flex-direction: column;
  min-width: 180px;
  margin-top: ${theme.spacing.xs};
`;

// ========== Selection & Status Components ==========

export const SelectionCheckbox = styled.div<{ $isSelected: boolean }>`
  position: absolute;
  top: ${theme.spacing.sm};
  right: ${theme.spacing.sm};
  z-index: 10;
  width: 24px;
  height: 24px;
  border-radius: ${theme.borderRadius.circle};
  background-color: ${(props) => (props.$isSelected ? theme.colors.primary : 'rgba(255, 255, 255, 0.8)')};
  border: ${(props) => (props.$isSelected ? 'none' : `2px solid ${theme.colors.primary}`)};
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
  /* Enhanced: Use consistent grid spacing */
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  background-color: ${theme.colors.background.highlight};
  border-radius: ${theme.borderRadius.small};
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${theme.boxShadow.md};
`;

// Badge styles with softer delete button
interface BadgeProps {
  $position: 'bottomLeft' | 'bottomRight';
  $light?: boolean;
}

export const Badge = styled.div<BadgeProps>`
  position: absolute;
  z-index: 2;
  bottom: ${theme.spacing.sm};
  left: ${(props) => props.$position === 'bottomLeft' ? theme.spacing.sm : 'auto'};
  right: ${(props) => props.$position === 'bottomRight' ? theme.spacing.sm : 'auto'};
  background: ${(props) => props.$light ? 'rgba(255,255,255,0.85)' : theme.colors.overlay};
  color: ${(props) => props.$light ? 'inherit' : theme.colors.white};
  padding: ${(props) => props.$light ? '6px 12px' : '4px 8px'};
  font-size: ${(props) => props.$light ? theme.fontSizes.xs : theme.fontSizes.sm};
  font-weight: 500;
  border-radius: ${theme.borderRadius.small};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 3px 6px;
    font-size: 10px;
    bottom: 8px;
    max-width: 45%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

// Soft delete button for selected items
export const SoftDeleteButton = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 18px;
  height: 18px;
  border-radius: ${theme.borderRadius.circle};
  border: none;
  background: rgba(220, 53, 69, 0.8);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  z-index: 15;
  opacity: 0;
  transition: all 0.2s ease;
  transform: scale(0.8);
  
  &:hover {
    background: rgba(200, 35, 51, 0.9);
    transform: scale(1);
  }
  
  /* Show on parent hover */
  *:hover > & {
    opacity: 1;
    transform: scale(1);
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
  /* Enhanced: Use consistent grid spacing */
  padding: ${theme.spacing.lg};
  font-size: 0.9em;
  color: ${theme.colors.text.secondary};
`;

export const LegalLinkFooterButton = styled.a<{ $isHovered?: boolean }>`
  margin: 0 ${theme.spacing.sm};
  color: ${theme.colors.text.secondary};
  text-decoration: ${props => props.$isHovered ? 'underline' : 'none'};
`;

// State components
interface StateProps {
  $type?: 'empty' | 'error';
}

export const State = styled.div<StateProps>`
  text-align: center; 
  /* Enhanced: Use consistent grid spacing */
  padding: 40px ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.medium};
  background-color: ${props => props.$type === 'error' ? theme.colors.background.error : theme.colors.white};
  border: ${props => props.$type === 'error' ? `1px solid ${theme.colors.highlight.error}` : 'none'};
  box-shadow: ${props => props.$type === 'empty' ? theme.boxShadow.md : 'none'};
  margin-bottom: ${props => props.$type === 'error' ? theme.spacing.lg : '0'};
  
  p {
    font-size: ${theme.fontSizes.md};
    color: ${props => props.$type === 'error' ? theme.colors.danger : theme.colors.text.secondary};
  }
`;