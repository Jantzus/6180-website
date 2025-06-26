import styled from "styled-components";
import { theme, HEADER_HEIGHT, HEADER_HEIGHT_MOBILE, type DirectionalProps } from "../theme";
import { directionalStyles, cardStyle } from "../globalStyles";

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