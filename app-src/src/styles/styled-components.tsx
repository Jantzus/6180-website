import styled, { createGlobalStyle, css } from "styled-components";
import { UploadStatus } from "@/lib/types";

// ========== Styled Components ==========

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

const directionalStyles = (isRTL: boolean) => css`
  direction: ${isRTL ? 'rtl' : 'ltr'};
`;

interface DirectionalProps {
  isRTL: boolean;
}

export const AppContainer = styled.div<DirectionalProps>`
  padding: 20px 20px;
  background-color: #f9fafb;
  min-height: 100vh;
  max-width: 100vw;
  ${props => directionalStyles(props.isRTL)}
`;

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

export const ContentContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

// Header Components
export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

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

// Progress Tracking Components
export const ProgressContainer = styled.div`
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

// Saving Progress Components
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

// Photo Grid Components
export const SelectedCount = styled.p`
  font-size: 16px;
  margin-bottom: 16px;
  color: #333;
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

export const FileInfo = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 6px;
`;

export const ErrorMessage = styled.div`
  font-size: 12px;
  color: #e53935;
  margin-bottom: 6px;
`;

interface ButtonProps {
  disabled?: boolean;
}

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

// Action Button Components
export const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`;

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

// Folder Details Components
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

// Username Modal Components
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

// Debug Components
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

// File Input
export const HiddenFileInput = styled.input`
  display: none;
`;

// Toggle Components - Refined elegant design
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

export const Headline = styled.h1`
  font-size: 1.8em;
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

// Profile Header Styled Components
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

export const PolicyIndicator = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #555;
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

export const PublicProfileDisplayNameMenu = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
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


export const PublicProfileDisplayName = styled.h1`
  font-size: 18px;
  margin: 0;
  font-weight: 600;
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

export const PasswordActionButton = styled(ActionButton)`
  background-color: #4caf50;
  color: white;
  &:hover {
    background-color: #45a049;
  }
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


// Album List Styled Components
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