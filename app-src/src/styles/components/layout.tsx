import styled from "styled-components";
import { theme, HEADER_HEIGHT, HEADER_HEIGHT_MOBILE, type DirectionalProps, type BadgeProps, type MessageProps, type StateProps } from "../theme";
import { directionalStyles, cardStyle, overlayStyle } from "../globalStyles";

// ========== Layout Components ==========

export const Body = styled.div<DirectionalProps>`
  max-width: 1200px;
  margin: auto;
  background: ${theme.colors.background.primary};
  color: ${theme.colors.text.primary};
  line-height: 1.5;
  /* Enhanced: Increased top padding for more breathing room from fixed header */
  padding: calc(${HEADER_HEIGHT} + 24px) ${theme.spacing.md} ${theme.spacing.md};
  width: 100%;
  overflow-x: hidden;
  min-height: 100vh;
  position: relative;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: calc(${HEADER_HEIGHT_MOBILE} + 20px) ${theme.spacing.sm} ${theme.spacing.sm};
  }
`;

export const AppContainer = styled.div<DirectionalProps>`
  padding: ${theme.spacing.md};
  background: linear-gradient(135deg, ${theme.colors.background.gradientStart} 0%, ${theme.colors.background.gradientEnd} 100%);
  min-height: 100vh;
  max-width: 100vw;
  position: relative;
  ${props => directionalStyles(props.$isRTL)}
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.sm};
  }
`;

export const MediaContainer = styled.div`
  /* Enhanced: Use consistent grid spacing (24px) for uniform alignment */
  padding: ${theme.spacing.sm} ${theme.spacing.lg} ${theme.spacing.lg};
  width: 100%;
  overflow: visible;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.sm} ${theme.spacing.lg} ${theme.spacing.sm};
    width: 100%;
  }
`;

export const ContentContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
  position: relative;
`;

export const CenteredContent = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const PhotoCard = styled.div`
  ${cardStyle}
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing.sm};
  width: 160px;
  position: relative;
  transition: all 0.3s ease;
  
  /* Soft selection styling instead of heavy blue box */
  &[data-selected="true"] {
    box-shadow: ${theme.boxShadow.selectionGlow};
    border: 2px solid ${theme.colors.selectionBorder};
    transform: translateY(-2px);
  }
`;

export const Card = styled.div<{ $padding?: string; $marginBottom?: string }>`
  ${cardStyle}
  /* Enhanced: Use consistent grid spacing */
  padding: ${props => props.$padding || theme.spacing.lg};
  margin-bottom: ${props => props.$marginBottom || theme.spacing.lg};
  width: 100%;
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

// ========== Grid Components ==========

export const MediaGrid = styled.div<{ $columns: string }>`
  display: grid;
  /* Enhanced: This is the main grid spacing that other elements should align to */
  grid-gap: ${theme.spacing.lg};
  width: 100%;
  min-height: 0;
  
  ${props => {
    switch(props.$columns) {
      case '1': return `grid-template-columns: repeat(1, 1fr);`;
      case '2': return `grid-template-columns: repeat(2, 1fr);`;
      case '3': return `grid-template-columns: repeat(3, 1fr);`;
      case '4': return `grid-template-columns: repeat(4, 1fr);`;
      case '5': return `grid-template-columns: repeat(5, 1fr);`;
      default: return `grid-template-columns: repeat(1, 1fr);`;
    }
  }}
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-gap: ${theme.spacing.md};
    ${props => {
      const col = parseInt(props.$columns);
      if (col > 3) return `grid-template-columns: repeat(3, minmax(0, 1fr));`;
      if (col > 1) return `grid-template-columns: repeat(${col}, minmax(0, 1fr));`;
      return `grid-template-columns: repeat(1, minmax(0, 1fr));`;
    }}
  }
`;

export const PhotoGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* Enhanced: Use consistent grid spacing */
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};
  width: 100%;
`;

// ========== Selection Components ==========

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

// ========== Message Components ==========

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

// ========== Badge Components ==========

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

// ========== State Components ==========

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