import React, { useState, useEffect, useRef } from "react";
import styled, { createGlobalStyle, css } from "styled-components";

import { UploadStatus } from "@/lib/types";
import { useTranslation } from "@/lib/i18n/hooks";

// ========== Global Styles ==========

export const GlobalStyle = createGlobalStyle`
  @keyframes loading-animation {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  
  /* Added to ensure proper display on mobile */
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

// ========== Directional Styles ==========

const directionalStyles = (isRTL: boolean) => css`
  direction: ${isRTL ? 'rtl' : 'ltr'};
`;

interface DirectionalProps {
  isRTL: boolean;
}

// ========== Responsive Mixins ==========

const mobile = (content: any) => css`
  @media (max-width: 767px) {
    ${content}
  }
`;

// ========== App Layout Components ==========

export const Body = styled.div`
  max-width: 1200px;
  margin: auto;
  background: #f9fafb;
  color: #333;
  line-height: 1.5;
  padding: 20px;
  width: 100%;
  overflow-x: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  
  ${mobile(`
    padding: 10px;
  `)}
`;

export const AppContainer = styled.div<DirectionalProps>`
  padding: 20px 20px;
  background-color: #f9fafb;
  min-height: 100vh;
  max-width: 100vw;
  ${props => directionalStyles(props.isRTL)}
`;

export const MediaContainer = styled.div`
  padding: 0 24px 20px;
  width: 100%;
  overflow: visible;
  
  ${mobile(`
    padding: 0 16px 15px;
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
  background: #fff;
  box-shadow: 0 1px 2px rgba(0,0,0,0.06);
  z-index: 10;
  margin-bottom: 10px;
  width: 100%;
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  
  ${mobile(`
    padding: 16px 16px;
  `)}
`;

export const HeaderControls = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 5px;
  gap: 10px;
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
`;

export const RowSelectorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

export const RowSelectorLabel = styled.label`
  margin-right: 8px;
  font-size: 14px;
  color: #555;
  font-weight: normal;
`;

export const RowSelectorSelect = styled.select`
  padding: 5px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  font-size: 14px;
  min-width: 50px;
`;

// ========== Logo and Branding ==========

export const LogoContainer = styled.div<DirectionalProps>`
  display: flex;
  align-items: center;
  flex-direction: ${props => props.isRTL ? 'row-reverse' : 'row'};
  gap: 10px;  
`;

export const Logo = styled.img`
  height: 32px;
`;

export const Headline = styled.h1`
  font-size: 1.8em;
`;

// ========== Button Components ==========

// Base button style
interface ButtonProps {
  disabled?: boolean;
  primary?: boolean;
  isHovered?: boolean;
  passwordSet?: boolean;
  isDisabled?: boolean;
}

const buttonBase = css<ButtonProps>`
  cursor: ${props => (props.disabled || props.isDisabled) ? 'not-allowed' : 'pointer'};
  opacity: ${props => (props.disabled || props.isDisabled) ? 0.6 : 1};
  transition: all 0.2s ease;
  border-radius: 4px;
`;

export const Button = styled.button<ButtonProps>`
  ${buttonBase}
  background: ${props => props.primary ? '#007bff' : props.passwordSet ? '#000000' : '#8c8c8c'};
  color: ${props => props.passwordSet ? '#000000' : 'white'};
  font-weight: ${props => props.passwordSet ? 'bold' : 'normal'};
  padding: ${props => props.primary === undefined ? '6px 12px' : '14px 28px'};
  font-size: ${props => props.primary === undefined ? '14px' : '16px'};
  border: ${props => props.primary === undefined ? '1px solid #006adc' : 'none'};
  background-color: ${props => {
    if (props.primary === undefined) return 'transparent';
    if (props.primary && props.isHovered) return '#0056b3';
    if (props.primary) return '#007bff';
    return '#8c8c8c';
  }};
  color: ${props => {
    if (props.primary === undefined) return '#006adc';
    if (props.passwordSet) return '#000000';
    return 'white';
  }};
  box-shadow: ${props => props.primary !== undefined && (props.primary ? 
    '0 4px 12px rgba(0, 123, 255, 0.2)' : 
    '0 4px 10px rgba(0, 0, 0, 0.08)')};
  border-radius: ${props => props.primary !== undefined ? '8px' : '4px'};
  width: ${props => props.primary === undefined && props.passwordSet !== undefined ? '100%' : 'auto'};
  text-align: ${props => props.primary === undefined && props.passwordSet !== undefined ? 'left' : 'center'};
  margin-right: ${props => props.primary === undefined && !props.passwordSet && !props.isDisabled ? 'auto' : '0'};
  height: ${props => props.primary === undefined && !props.passwordSet && !props.isDisabled ? '36px' : 'auto'};
  display: ${props => props.primary === undefined && !props.passwordSet && !props.isDisabled ? 'flex' : 'inline-block'};
  align-items: ${props => props.primary === undefined && !props.passwordSet && !props.isDisabled ? 'center' : 'normal'};
  
  &:hover {
    background-color: ${props => {
      if (props.primary === undefined) return 'transparent';
      if (props.primary) return '#0056b3';
      if (props.passwordSet) return '#000000';
      return '#45a049';
    }};
  }
`;

export const MenuButton = styled(Button)`
  width: 100%;
  text-align: left;
  padding: 8px 16px;
  background: transparent;
  color: #006adc;
  border: none;
  margin: 2px 0;
  
  &:hover {
    background-color: #f5f5f5;
  }

  border-bottom: 1px solid #eaeaea;
  
  &:last-of-type {
    border-bottom: none;
  }
      
`;

export const HamburgerIcon = styled.span`
  width: 18px;
  height: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 8px;
`;

export const HamburgerLine = styled.span`
  height: 2px;
  background: #006adc;
  width: 100%;
`;

export const RemoveButton = styled.button<ButtonProps>`
  ${buttonBase}
  background-color: #e53935;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 8px;
  font-size: 12px;
  margin-top: auto;
`;

export const NavButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`;

// ========== User Profile & Account Components ==========

export const ProfileLink = styled.a`
  font-size: 14px;
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
`;

export const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Username = styled.div`
  font-size: 16px;
  color: #666;
`;

export const OwnerProfileLink = styled.a`
  text-decoration: none;
  color: white;
  background-color: #006adc;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const ProfileHeaderContainer = styled.div<{ isRTL: boolean }>`
  margin-bottom: 24px;
  text-align: center;
  direction: ${props => props.isRTL ? "rtl" : "ltr"};
`;

export const ProfileControls = styled.div<{ isRTL: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${props => props.isRTL ? "flex-start" : "flex-end"};
  margin-bottom: 8px;
  position: relative;
`;

export const ProfileAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #555;
`;

export const PublicProfileDisplayNameMenu = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
`;

export const PublicProfileDisplayName = styled.h1`
  font-size: 18px;
  margin: 0;
  font-weight: 600;
`;

export const PublicProfileExplanation = styled.div`
  margin-top: 12px;
  padding: 8px 12px;
  background-color: #f0f7ff;
  border-radius: 8px;
  border: 1px solid #cce0ff;
  max-width: 500px;
  font-size: 13px;
  margin: 0 auto;
  
  p {
    margin: 0;
  }
`;

// ========== Text & Typography Components ==========

export const AlbumTitle = styled.h2`
  font-weight: 400;
  margin: 0 0 16px 0;
  font-size: 24px;
  padding: 0;
  
  ${mobile(`
    padding: 0;
  `)}
`;

export const AlbumTitleStrong = styled.strong`
  font-weight: 700;
`;

// Card container base style
const cardBase = css`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

export const Card = styled.div<{ padding?: string; marginBottom?: string }>`
  ${cardBase}
  padding: ${props => props.padding || '20px'};
  margin-bottom: ${props => props.marginBottom || '20px'};
  width: 100%;
`;

export const DescriptionText = styled.p`
  color: #333;
  margin: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  max-width: 100%;
`;

// Message styles
interface MessageProps {
  type?: 'error' | 'loading' | 'info';
}

export const Message = styled.div<MessageProps>`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  grid-column: 1 / -1;
  width: 100%;
  color: ${props => {
    switch(props.type) {
      case 'error': return '#d32f2f';
      case 'loading': return '#666';
      default: return '#333';
    }
  }};
`;

export const ItalicText = styled.p`
  font-style: italic;
  margin-top: 12px;
  margin-bottom: 12px;
  text-align: center;
  
  ${mobile(`
    font-size: 14px;
  `)}
`;

export const AlbumDescription = styled.div<{ isRTL: boolean }>`
  margin-top: 8px;
  margin-bottom: 16px;
  font-size: 12px;
  color: #555;
  line-height: 1.5;
  text-align: ${props => props.isRTL ? "right" : "left"};
  white-space: pre-wrap;
`;

export const AlbumDates = styled.div<{ isRTL: boolean }>`
  font-size: 13px;
  color: #777;
  text-align: ${props => props.isRTL ? "right" : "left"};
  margin-top: 4px;
`;

export const PolicyIndicator = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #555;
`;

// ========== Media Grid Components ==========

export const MediaGrid = styled.div<{ columns: string }>`
  display: grid;
  grid-gap: 20px;
  width: 100%;
  min-height: 0; // Allow proper sizing
  
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
  
  @media (max-width: 767px) {
    grid-gap: 8px;
    ${props => {
      // For mobile, limit the maximum number of columns and adjust based on selection
      const col = parseInt(props.columns);
      if (col > 3) return css`grid-template-columns: repeat(3, minmax(0, 1fr));`;
      if (col > 1) return css`grid-template-columns: repeat(${col}, minmax(0, 1fr));`;
      return css`grid-template-columns: repeat(1, minmax(0, 1fr));`;
    }}
  }
`;

// Base media block style
const mediaBlockBase = css<{ isHovered?: boolean }>`
  ${cardBase}
  transition: transform 0.2s;
  position: relative;
  height: auto; // Allow natural height
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  margin-bottom: 20px; // Add bottom margin for spacing
  
  ${props => props.isHovered && css`
    transform: translateY(-2px);
  `}
  
  ${mobile(`
    border-radius: 4px;
    margin-bottom: 10px; // Less margin on mobile
  `)}
`;

export const MediaBlock = styled.div<{ 
  isHovered?: boolean; 
  isVideo?: boolean; 
  isSelected?: boolean 
}>`
  ${mediaBlockBase}
  ${props => props.isVideo && css`
    cursor: pointer;
  `}
  ${props => props.isSelected && css`
    border: 3px solid #006adc;
    box-shadow: 0 0 0 3px rgba(0, 106, 220, 0.3);
  `}
`;

export const PhotoGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 32px;
`;

export const PhotoCard = styled.div`
  ${cardBase}
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 160px;
  position: relative;
`;

// ========== Image & Video Components ==========

export const LazyImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  background-color: #f0f0f0;
  width: 100%;
  padding-bottom: 75%; // Create a consistent aspect ratio (4:3)
  height: 0; // Use padding-bottom for aspect ratio
  
  ${mobile(`
    padding-bottom: 100%; // Square aspect ratio on mobile
  `)}
`;

// Base image styles
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
`;

export const VideoElement = styled.video`
  max-width: 100%;
  max-height: 100%;
`;

export const ThumbnailWrapper = styled.div`
  position: relative;
  overflow: hidden;
  background-color: #f0f0f0;
  width: 100%;
  min-height: 200px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  
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
  background-color: rgba(0,0,0,0.7);
  border-radius: 50%;
  z-index: 2;
  
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 55%;
    transform: translate(-50%, -50%);
    border-style: solid;
    border-width: 15px 0 15px 25px;
    border-color: transparent transparent transparent white;
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
  margin-bottom: 8px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MediaItem = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 6px;
`;

export const VideoItem = styled.video`
  max-width: 100%;
  max-height: 100%;
  border-radius: 6px;
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
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading-animation 1.5s infinite;
  z-index: 0;
`;

// Overlay base styles
const overlayBase = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Overlay = styled.div<{ type?: 'loading' | 'watermark' }>`
  ${overlayBase}
  background-color: ${props => props.type === 'loading' ? 'rgba(0, 0, 0, 0.5)' : 'transparent'};
  z-index: ${props => props.type === 'loading' ? 4 : 5};
  color: ${props => props.type === 'loading' ? 'white' : 'inherit'};
  font-weight: ${props => props.type === 'loading' ? 500 : 'inherit'};
  text-align: ${props => props.type === 'loading' ? 'center' : 'inherit'};
  padding: ${props => props.type === 'loading' ? '0 10px' : '0'};
  pointer-events: ${props => props.type === 'watermark' ? 'none' : 'auto'};
`;

export const LoadingIndicator = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  z-index: 10;
`;

// Progress components
interface ProgressProps {
  progress?: number;
  status?: UploadStatus;
  isError?: boolean;
}

export const ProgressTitle = styled.h3`
  font-size: 18px;
  margin: 0 0 12px 0;
`;

export const ProgressStats = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 6px;
`;

export const ProgressBarBg = styled.div<{ bottom?: string; left?: string; right?: string; height?: string }>`
  height: ${props => props.height || '8px'};
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  ${props => props.bottom && `bottom: ${props.bottom};`}
  ${props => props.left && `left: ${props.left};`}
  ${props => props.right && `right: ${props.right};`}
  ${props => props.bottom && props.left && props.right && 'position: absolute;'}
`;

export const ProgressBar = styled.div<ProgressProps>`
  height: 100%;
  background-color: ${props => {
    if (props.status === 'processing') return '#ff9800';
    if (props.status === 'error') return '#e53935';
    if (props.status === 'complete') return '#4caf50';
    return '#2196f3'; // Default or uploading
  }};
  border-radius: 4px;
  transition: width 0.3s ease;
  width: ${props => (props.progress || 0) * 100}%;
`;

export const ProgressDetails = styled.div`
  display: flex;
  gap: 12px;
  font-size: 14px;
  color: #666;
`;

export const ProgressItem = styled.div<ProgressProps>`
  color: ${props => props.isError ? '#e53935' : 'inherit'};
`;

export const ProgressText = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
`;

// ========== Modal & Dialog Components ==========

// Modal base styles
interface ModalProps {
  zIndex?: number;
}

export const Modal = styled.div<ModalProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: ${props => props.zIndex || 1000};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  ${cardBase}
  padding: 24px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  ${mobile(`
    padding: 16px;
    width: 90%;
  `)}
`;

// Username component styles
export const UsernameModal = styled.div<DirectionalProps>`
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  ${props => directionalStyles(props.isRTL)}
`;

export const UsernameTitle = styled.p`
  font-size: 16px;
  margin-bottom: 12px;
`;

export const UsernameDescription = styled.p`
  font-size: 14px;
  margin-bottom: 16px;
  color: #666;
`;

export const UsernameInput = styled.input<DirectionalProps>`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
  text-align: ${props => props.isRTL ? 'right' : 'left'};
`;

export const UsernameError = styled.div`
  color: #e53935;
  margin-bottom: 12px;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 100;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-radius: 4px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 180px;
  margin-top: 4px;
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

// ========== QR Code Components ==========

export const QRCodeContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const InstructionsContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
`;

export const InstructionHeading = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
  
  ${mobile(`
    font-size: 18px;
  `)}
`;

export const InstructionList = styled.ol`
  list-style-type: decimal;
  padding-left: 20px;
`;

export const InstructionItem = styled.li`
  margin-bottom: 12px;
  font-size: 16px;
  
  ${mobile(`
    font-size: 14px;
  `)}
`;

// ========== Selection & Status Components ==========

export const SelectionCheckbox = styled.div<{ isSelected: boolean }>`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${(props) => (props.isSelected ? '#006adc' : 'rgba(255, 255, 255, 0.8)')};
  border: ${(props) => (props.isSelected ? 'none' : '2px solid #006adc')};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

export const Checkmark = styled.div`
  color: white;
  font-size: 14px;
  font-weight: bold;
`;

export const SelectionBanner = styled.div`
  padding: 10px 20px;
  background-color: #f0f7ff;
  border-radius: 4px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const SelectedCount = styled.p`
  font-size: 16px;
  margin-bottom: 16px;
  color: #333;
`;

// Badge base style
const badgeBase = css`
  position: absolute;
  z-index: 2;
`;

interface BadgeProps {
  position: 'bottomLeft' | 'bottomRight';
  light?: boolean;
}

export const Badge = styled.div<BadgeProps>`
  ${badgeBase}
  bottom: 12px;
  left: ${(props: BadgeProps) => props.position === 'bottomLeft' ? '12px' : 'auto'};
  right: ${(props: BadgeProps) => props.position === 'bottomRight' ? '12px' : 'auto'};
  background: ${(props: BadgeProps) => props.light ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.7)'};
  color: ${(props: BadgeProps) => props.light ? 'inherit' : 'white'};
  padding: ${(props: BadgeProps) => props.light ? '6px 12px' : '4px 8px'};
  font-size: ${(props: BadgeProps) => props.light ? '12px' : '14px'};
  font-weight: 500;
  border-radius: ${(props: BadgeProps) => props.light ? '3px' : '4px'};
  
  ${mobile(`
    padding: ${(props: BadgeProps) => props.light ? '3px 6px' : '2px 6px'};
    font-size: ${(props: BadgeProps) => props.light ? '10px' : '12px'};
    bottom: ${(props: BadgeProps) => props.light ? '8px' : '12px'};
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
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: white;
  z-index: 1;
  background-color: ${props => {
    switch(props.status) {
      case 'complete': return '#4caf50';
      case 'error': return '#e53935';
      case 'uploading': return '#2196f3';
      case 'processing': return '#ff9800';
      default: return '#9e9e9e';
    }
  }};
`;

// ========== Form Components ==========

export const FormGroup = styled.div`
  margin-bottom: 16px;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

// Form input base style
const formInputBase = css`
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-sizing: border-box;
`;

export const FormInput = styled.input`
  ${formInputBase}
`;

export const FormTextarea = styled.textarea`
  ${formInputBase}
  resize: vertical;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

// ========== Toggle Components ==========

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 4px 0;
  gap: 15px; /* Small gap for consistent spacing */
`;

export const ToggleLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  line-height: 24px; /* Added line-height to better align with taller toggle */
`;

export const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px; /* Increased from 20px to 24px */
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
    
    &:checked + span {
      background-color: #007bff;
    }
    
    &:focus + span {
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
    
    &:checked + span:before {
      transform: translateX(16px); /* Adjusted for new dimensions */
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
  background-color: #e0e0e0;
  transition: .2s;
  border-radius: 24px; /* Updated to match height */
  
  &:before {
    position: absolute;
    content: "";
    height: 20px; /* Increased from 16px to 20px */
    width: 20px; /* Increased from 16px to 20px */
    left: 2px;
    top: 2px;
    background-color: white;
    transition: .2s;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`;

// ========== Watermark Components ==========

export const WatermarkText = styled.div`
  color: white;
  font-size: 24px;
  font-weight: bold;
  transform: rotate(-30deg);
  opacity: 0.7;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
  user-select: none;
  white-space: nowrap;
`;

// ========== Miscellaneous Components ==========

export const FileInfo = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 6px;
`;

export const LegalLinksFooter = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 0.9em;
  color: #555;
`;

export const LegalLinkFooterButton = styled.a<{ isHovered?: boolean }>`
  margin: 0 10px;
  color: #555;
  text-decoration: ${props => props.isHovered ? 'underline' : 'none'};
`;

// State components
interface StateProps {
  type?: 'empty' | 'error';
}

export const State = styled.div<StateProps>`
  text-align: center; 
  padding: 40px 20px;
  border-radius: 12px;
  background-color: ${props => props.type === 'error' ? '#fdeded' : 'white'};
  border: ${props => props.type === 'error' ? '1px solid #f7d0d0' : 'none'};
  box-shadow: ${props => props.type === 'empty' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none'};
  margin-bottom: ${props => props.type === 'error' ? '20px' : '0'};
  
  p {
    font-size: 16px;
    color: ${props => props.type === 'error' ? '#d32f2f' : '#666'};
  }
`;

export const DebugContainer = styled.div`
  margin-top: 24px;
  padding: 16px;
  background-color: #f0f0f0;
  border-radius: 8px;
`;

export const DebugTitle = styled.h3`
  margin: 0 0 12px 0;
  font-size: 16px;
`;

export const DebugMessages = styled.pre`
  margin: 0;
  font-size: 12px;
  white-space: pre-wrap;
  max-height: 200px;
  overflow-y: auto;
`;

export const DebugMessage = styled.div`
  margin-bottom: 4px;
`;

// ========== Component with Internal State ==========

// ProfileHeader Component
interface ProfileHeaderProps {
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