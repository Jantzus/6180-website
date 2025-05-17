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
    margin: 0;
    padding: 0;
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
  
  @media (max-width: 767px) {
    padding: 10px;
  }
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
  
  @media (max-width: 767px) {
    padding: 0 16px 15px;
    width: 100%;
  }
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
  
  @media (max-width: 767px) {
    padding: 16px 16px;
  }
`;

export const HeaderControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 5px;
  gap: 10px;
  flex-wrap: wrap;
`;

export const HeaderControlsWithFullWidth = styled(HeaderControls)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  
  > div {
    width: auto;
    display: flex;
    align-items: center;
  }
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

export const AppName = styled.div<DirectionalProps>`
  font-size: 1.4em;
  font-weight: bold;
  color: #222;
`;

export const Headline = styled.h1`
  font-size: 1.8em;
`;

// ========== Button Components ==========

export const ActionButton = styled.button`
  background: transparent;
  color: #006adc;
  border: 1px solid #006adc;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
`;

export const HamburgerButton = styled.button`
  background: transparent;
  color: #006adc;
  border: 1px solid #006adc;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const HamburgerIcon = styled.span`
  width: 18px;
  height: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const HamburgerLine = styled.span`
  height: 2px;
  background: #006adc;
  width: 100%;
`;

export const CreateAlbumButton = styled.button`
  background: transparent;
  color: #006adc;
  border: 1px solid #006adc;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
  margin-right: auto; // This will push it to the left
  height: 36px; // Set a fixed height to match other buttons
  display: flex;
  align-items: center; // Center text vertically
`;

export const MenuButton = styled.button`
  background: transparent;
  color: #006adc;
  border: 1px solid #006adc;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  width: 100%;
  text-align: left;
`;

export const CloseButton = styled.button`
  margin-top: 16px;
  padding: 8px 16px;
  background-color: #006adc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

export const PasswordActionButton = styled(ActionButton)`
  background-color: #4caf50;
  color: white;
  &:hover {
    background-color: #45a049;
  }
`;

interface ButtonProps {
  disabled?: boolean;
}

export const Button = styled.button<ButtonProps>`
  padding: 14px 28px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.6 : 1};
`;

export const PrimaryButton = styled(Button)`
  background-color: #007bff;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
`;

export const SecondaryButton = styled(Button)`
  background-color: #8c8c8c;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
`;

interface PasswordButtonProps extends ButtonProps {
  passwordSet: boolean;
}

export const PasswordButton = styled(SecondaryButton)<PasswordButtonProps>`
  color: ${props => props.passwordSet ? '#000000' : 'white'};
  font-weight: ${props => props.passwordSet ? 'bold' : 'normal'};
`;

export const BigButton = styled.button<{ primary?: boolean; isHovered?: boolean }>`
  padding: 12px 20px;
  text-decoration: none;
  border: none;
  border-radius: 6px;
  font-size: 1em;
  cursor: pointer;
  text-align: center;
  display: inline-block;
  background-color: ${props => props.primary ? '#007bff' : '#e9e9e9'};
  color: ${props => props.primary ? 'white' : '#333'};
  background-color: ${props => props.primary && props.isHovered ? '#0056b3' : undefined};
`;

export const RemoveButton = styled.button<ButtonProps>`
  background-color: #e53935;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 8px;
  font-size: 12px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  margin-top: auto;
  opacity: ${props => props.disabled ? 0.6 : 1};
`;

export const NavigationButton = styled.button<{ isDisabled?: boolean }>`
  background: transparent;
  border: none;
  color: white;
  font-size: 16px;
  padding: 5px 10px;
  cursor: ${props => props.isDisabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.isDisabled ? 0.5 : 1};
`;

export const BackButton = styled(NavigationButton)``;

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
  
  @media (max-width: 767px) {
    padding: 0;
  }
`;

export const AlbumTitleStrong = styled.strong`
  font-weight: 700;
`;

export const DescriptionBlock = styled.div`
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
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

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #d32f2f;
  grid-column: 1 / -1;
  width: 100%;
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
  grid-column: 1 / -1;
  width: 100%;
`;

export const ItalicText = styled.p`
  font-style: italic;
  margin-top: 12px;
  margin-bottom: 12px;
  text-align: center;
  
  @media (max-width: 767px) {
    font-size: 14px;
  }
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

export const MediaBlock = styled.div<{ isHovered?: boolean; isVideo?: boolean }>`
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
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
  
  ${props => props.isVideo && css`
    cursor: pointer;
  `}
  
  @media (max-width: 767px) {
    border-radius: 4px;
    margin-bottom: 10px; // Less margin on mobile
  }
`;

export const SelectableMediaBlock = styled(MediaBlock)<{ isSelected?: boolean }>`
  ${(props) =>
    props.isSelected &&
    `
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
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.03);
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
  
  @media (max-width: 767px) {
    padding-bottom: 100%; // Square aspect ratio on mobile
  }
`;

export const StyledImage = styled.img<{ isLoaded: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  transition: opacity 0.3s;
  opacity: ${props => props.isLoaded ? 1 : 0};
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
  
  @media (max-width: 767px) {
    min-height: 120px;
    aspect-ratio: 1/1;
    height: 0;
    padding-bottom: 100%;
  }
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
  
  @media (max-width: 767px) {
    width: 40px;
    height: 40px;
    
    &::before {
      border-width: 10px 0 10px 16px;
    }
  }
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

export const Image = styled.img<{ isLoaded: boolean }>`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  opacity: ${props => props.isLoaded ? 1 : 0};
  transition: opacity 0.3s;
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

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 4;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 500;
  text-align: center;
  padding: 0 10px;
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

export const ProgressContainer = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

export const ProgressTitle = styled.h3`
  font-size: 18px;
  margin: 0 0 12px 0;
`;

export const OverallProgress = styled.div`
  margin-bottom: 12px;
`;

export const ProgressStats = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 6px;
`;

export const ProgressBarBg = styled.div`
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`;

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar = styled.div<ProgressBarProps>`
  height: 100%;
  background-color: #4caf50;
  border-radius: 4px;
  transition: width 0.3s ease;
  width: ${props => props.progress * 100}%;
`;

export const ProgressDetails = styled.div`
  display: flex;
  gap: 12px;
  font-size: 14px;
  color: #666;
`;

interface ProgressItemProps {
  isError?: boolean;
}

export const ProgressItem = styled.div<ProgressItemProps>`
  color: ${props => props.isError ? '#e53935' : 'inherit'};
`;

export const UploadProgressBarBg = styled.div`
  position: absolute;
  bottom: 4px;
  left: 4px;
  right: 4px;
  height: 4px;
  background-color: rgba(0,0,0,0.2);
  border-radius: 2px;
  overflow: hidden;
`;

interface UploadProgressBarProps {
  progress: number;
  status: UploadStatus;
}

export const UploadProgressBar = styled.div<UploadProgressBarProps>`
  height: 100%;
  background-color: ${props => props.status === 'processing' ? '#ff9800' : '#2196f3'};
  transition: width 0.3s ease;
  width: ${props => props.progress * 100}%;
`;

export const SavingProgressContainer = styled.div`
  margin-bottom: 24px;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

export const SavingProgressTitle = styled.h3`
  font-size: 18px;
  margin: 0 0 12px 0;
`;

export const SavingProgressText = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
`;

export const SavingProgressBarBg = styled.div`
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`;

export const SavingProgressBar = styled.div`
  height: 100%;
  background-color: #2196f3;
  border-radius: 4px;
  transition: width 0.3s ease;
`;

// ========== Modal & Dialog Components ==========

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 767px) {
    padding: 16px;
    width: 90%;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

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

export const UsernameButton = styled.button<ButtonProps>`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  margin-bottom: 10px;
  opacity: ${props => props.disabled ? 0.6 : 1};
`;

export const UsernameAltButton = styled.button<ButtonProps>`
  width: 100%;
  padding: 12px;
  background-color: #6c757d;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.6 : 1};
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
  
  @media (max-width: 767px) {
    font-size: 18px;
  }
`;

export const InstructionList = styled.ol`
  list-style-type: decimal;
  padding-left: 20px;
`;

export const InstructionItem = styled.li`
  margin-bottom: 12px;
  font-size: 16px;
  
  @media (max-width: 767px) {
    font-size: 14px;
  }
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

export const DurationBadge = styled.div`
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 4px 8px;
  font-size: 14px;
  border-radius: 4px;
  font-weight: 500;
  z-index: 2;
  
  @media (max-width: 767px) {
    padding: 2px 6px;
    font-size: 12px;
  }
`;

export const OwnerBadge = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: rgba(255,255,255,0.85);
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 500;
  z-index: 3;
  border-radius: 3px;
  
  @media (max-width: 767px) {
    padding: 3px 6px;
    font-size: 10px;
    bottom: 8px;
    right: 8px;
    max-width: 45%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

interface StatusIndicatorProps {
  status: UploadStatus;
}

export const StatusIndicator = styled.div<StatusIndicatorProps>`
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

export const FolderDetails = styled.div`
  margin-top: 12px;
  margin-bottom: 12px;
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

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

export const FormInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-sizing: border-box;
`;

export const FormTextarea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-sizing: border-box;
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

export const WatermarkOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 5;
`;

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

export const EmptyState = styled.div`
  text-align: center; 
  padding: 40px 20px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  
  p {
    font-size: 16px;
    color: #666;
  }
`;

export const ErrorState = styled.div`
  text-align: center;
  padding: 40px 20px;
  background-color: #fdeded;
  border-radius: 12px;
  border: 1px solid #f7d0d0;
  margin-bottom: 20px;
  
  p {
    font-size: 16px;
    color: #d32f2f;
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
            {username || t('User Profile')}
          </HamburgerButton>
          
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