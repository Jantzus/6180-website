import React, { useState, useEffect } from "react";
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n";
import { 
  checkLoginWithoutRedirect, 
  useFullscreenView,
  redirectTo,
  generateUrl,
} from "@/lib/utils";
import { prewarmCredentials } from "@/lib/s3";

// Import the new shared hook
import { useFileUploadProcessor } from "@/lib/useFileUploadProcessor";

// Import types and utilities
import { AlbumData, PasswordPolicyEnum, MediaItem } from "@/lib/types";
import { generateInviteLink } from "@/lib/utils";
import { LOCAL_STORAGE_KEYS } from "@/lib/config";

// Import the useUsernameManagement hook from the correct location
import { useUsernameManagement } from "@/lib/useUsernameManagement";

// Import extracted utility functions
import { 
  executeAlbumSave, 
  createSubAlbumWithSelectedItems,
  useSelectionMode, 
  usePasswordProtection,
  useShareActions
} from "./utils";

// Import extracted components
import { 
  SelectPhotosButton, 
  SelectionModeBanner 
} from "./components";

// Import the new MediaTagsFilter component
import { MediaTagsFilter } from "./MediaTagsFilter";

// Import styled components with new layout styles
import { 
  Body, 
  MediaContainer,
  GlobalStyle,
  // Updated brand header components with reduced padding:
  FixedHeader,
  FixedHeaderContent,
  BrandLink,
  BrandLogo,
  BrandLogoContainer,
  // Updated layout+filter control components with improved spacing:
  LayoutFilterBlock,
  ControlLabel,
  ColumnsSelector
} from "@/styles/styled-components";

// Import components
import { FullscreenMediaViewer } from "./FullscreenMediaViewer";
import { PasswordModal } from "@/pages/photos/PasswordModal";
import { PhotoLoginModal } from "@/pages/photos/PhotoLoginModal";
import { FileInput } from "@/components/FileInput";
import { UploadProgress } from "@/components/UploadProgress";
import { CopyLinkModal } from "@/components/Modals/CopyLinkModal";
import { ConfirmationModal } from "@/components/Modals/ConfirmationModal";

import { UsernamePrompt } from "@/components/UsernamePrompt";
import { AlbumMediaGrid } from "@/components/AlbumMediaGrid";
import { AlbumInfoComponent } from "@/components/AlbumInfoComponent";
import { AlbumHeader } from "./AlbumHeader";

// ============================
// Pure Album UI Component Props Interface
// ============================

export interface AlbumPageStaticProps {
  albumData: AlbumData | null;
  folderId: string | null;
  cognitoUsername: string | null;
}

// ============================
// Pure Album UI Component
// ============================

export const AlbumPageStatic: React.FC<AlbumPageStaticProps> = ({
  albumData,
  folderId,
  cognitoUsername: initialCognitoUsername
}) => {
  // Hooks for i18n
  const { t, language } = useTranslation();
  
  // Custom hooks
  const fullscreenView = useFullscreenView();
  const selectionMode = useSelectionMode();
  const passwordProtection = usePasswordProtection();
  const usernameManager = useUsernameManagement(t);
  
  // State
  const [columns, setColumns] = useState<string>('1');
  
  // Media filtering state
  const [filteredMediaItems, setFilteredMediaItems] = useState<MediaItem[]>([]);
  const [isMediaFiltered, setIsMediaFiltered] = useState<boolean>(false);
  
  // Login and user state
  const [showInlineOTPLogin, setShowInlineOTPLogin] = useState(false);
  const [showSelectPhotosButton, setShowSelectPhotosButton] = useState(false);
  const [cognitoUsername, setCognitoUsername] = useState<string | null>(initialCognitoUsername);
  
  // Rotating slogan state - start with random slogan
  const [currentSloganIndex, setCurrentSloganIndex] = useState(() => 
    Math.floor(Math.random() * 6)
  );
  const [sloganVisible, setSloganVisible] = useState(true);
  
  // Array of rotating slogans
  const slogans = [
    t('Tag, save and find that performance — before it\'s lost.'),
    t('Tag, save and find that smile — before it\'s lost.'),
    t('Tag, save and find that birthday — before it\'s lost.'),
    t('Tag, save and find that sunset — before it\'s lost.'),
    t('Tag, save and find that party — before it\'s lost.'),
    t('Tag, save and find that vacation — before it\'s lost.')
  ];
  
  // Use the new shared hook for file uploads
  const fileUpload = useFileUploadProcessor((folderId) => {
    // Custom navigation callback
    if (folderId) {
      redirectTo(`save-album.html?folderId=${encodeURIComponent(folderId)}`);
    } else {
      redirectTo("save-album.html");
    }
  });
  
  // Destruct from hooks
  const { 
    passwordPolicy, setPasswordPolicy, isAuthorized, setIsAuthorized,
    showPasswordModal, setShowPasswordModal, passwordError, setPasswordError,
    passwordVerified, setPasswordVerified,
    shouldShowContent, shouldShowWatermark, showingEnterPassword, promptForPassword
  } = passwordProtection;
  
  // Add logging for password protection state
  console.log('Password protection state:', {
    passwordPolicy,
    isAuthorized,
    showPasswordModal,
    passwordVerified,
    showingEnterPassword
  });
  
  console.log('shouldShowContent result:', shouldShowContent);
  console.log('shouldShowWatermark result:', shouldShowWatermark);
  
  // Destructure only what we need from file upload hook to avoid unused variable warnings
  const {
    fileInputRef, isUploading, progressTracker, log
  } = fileUpload;
  
  const {
    fullscreenItem, openFullscreenView, closeFullscreenView,
    goToPrevItem, goToNextItem
  } = fullscreenView;
  
  const {
    isSelectionMode, setIsSelectionMode, selectedItems, toggleItemSelection, 
    selectAll, unselectAll, cancelSelection
  } = selectionMode;
  
  // Initialize share actions hook
  const shareActions = useShareActions(albumData, folderId, cognitoUsername, t);

  // Wrapper functions to pass the correct parameters to the hook functions
  const handleSelectAll = () => selectAll(filteredMediaItems.length);
  const handleUnselectAll = () => unselectAll();

  // Check if any media items have tags
  const hasAnyTags = albumData?.mediaItems?.some(item => 
    item.selectedTags && item.selectedTags.length > 0
  ) || false;

  // NEW: Prewarm S3 credentials when the page loads for extra reliability
  useEffect(() => {
    const warmUpPageCredentials = async () => {
      try {
        await prewarmCredentials();
        log("🔥 Photos page S3 credentials prewarmed successfully");
      } catch (error) {
        log(`⚠️ Photos page credential prewarming failed: ${String(error)}`);
      }
    };
    
    warmUpPageCredentials();
  }, []); // Empty dependency array - run once when page loads

  // Rotating slogan effect with smooth fade transitions
  useEffect(() => {
    const interval = setInterval(() => {
      // Start fade out
      setSloganVisible(false);
      
      // After fade out completes, change text and fade in
      setTimeout(() => {
        setCurrentSloganIndex((prevIndex) => (prevIndex + 1) % slogans.length);
        setSloganVisible(true);
      }, 1000); // Wait for fade out to complete (1s)
    }, 7000); // Every 7 seconds

    return () => clearInterval(interval);
  }, [slogans.length]);

  // ✅ DEBUG: Initialize filtered media items when album data changes
  useEffect(() => {
    if (albumData?.mediaItems) {
      console.log('🎯 AlbumPageStatic: albumData updated, checking mediaItems tags:', {
        totalItems: albumData.mediaItems.length,
        itemsWithTags: albumData.mediaItems.filter(item => item.selectedTags && item.selectedTags.length > 0).length,
        firstItemTagCount: albumData.mediaItems[0]?.selectedTags?.length || 0
      });
      
      // Log detailed info about first few items
      albumData.mediaItems.slice(0, 3).forEach((item, index) => {
        console.log(`🎯 AlbumPageStatic item ${index}:`, {
          fileId: item.fileId.substring(0, 50) + '...',
          hasSelectedTags: !!item.selectedTags,
          tagCount: item.selectedTags?.length || 0,
          tags: item.selectedTags?.map(tag => ({
            type: tag.TagType,
            title: tag.tagTitle,
            subtags: tag.subtags?.length || 0
          })) || []
        });
      });
      
      setFilteredMediaItems(albumData.mediaItems);
      setIsMediaFiltered(false);
    }
  }, [albumData]);

  // Initialize password protection when album data changes
  useEffect(() => {
    if (albumData) {
      // Set password policy from the album data
      if (albumData.passwordPolicy) {
        setPasswordPolicy(albumData.passwordPolicy as PasswordPolicyEnum);
        console.log('Password policy set to:', albumData.passwordPolicy);
        
        // If NoPassword policy or the user has a folderPosition, automatically set as authorized
        if (albumData.passwordPolicy === 'NoPassword' || albumData.folderPositionId) {
          setIsAuthorized(true);
          console.log('User automatically authorized');
        } else {
          console.log('User not automatically authorized, will need to enter password');
        }
      }
    }
  }, [albumData, setPasswordPolicy, setIsAuthorized]);

  // Media filter handlers
  const handleMediaFilterChange = (newFilteredItems: MediaItem[]) => {
    setFilteredMediaItems(newFilteredItems);
    setIsMediaFiltered(true);
    
    // Clear selections when filter changes since item indices change
    selectedItems.clear();
  };

  const resetMediaFilter = () => {
    if (albumData?.mediaItems) {
      setFilteredMediaItems(albumData.mediaItems);
      setIsMediaFiltered(false);
      
      // Clear selections when filter is reset since item indices change
      selectedItems.clear();
    }
  };
  
  // Handle password submission
  const handlePasswordSubmit = async (password: string) => {
    // Clear any previous errors
    setPasswordError(null);
    
    // First check if password is empty
    if (password.trim() === '') {
      setPasswordError(t('Password cannot be empty'));
      return;
    }
    
    // Get the actual password from the album data
    const actualPassword = albumData?.actualPassword;
    
    // If there's no password to validate against
    if (!actualPassword) {
      // If we know there should be a password but we couldn't get it
      if (albumData?.hasPassword) {
        setPasswordError(t('Unable to validate password. Please try again later.'));
        return;
      } else {
        // If there's no password, just authorize the user (shouldn't normally happen)
        setIsAuthorized(true);
        setShowPasswordModal(false);
        return;
      }
    }
    
    // Compare entered password with actual password
    if (password !== actualPassword) {
      setPasswordError(t('Invalid password. Please try again.'));
      return;
    }
    
    // Password is correct, now check login status
    const token = await checkLoginWithoutRedirect();
    
    if (!token) {
      // Password is correct but user is not logged in
      // Close password modal and show login modal
      setShowPasswordModal(false);
      
      // Set a flag to mark that password verification was successful
      // but login is still needed
      setPasswordVerified(true);
      
      // Show the inline login modal
      setShowInlineOTPLogin(true);
      return;
    }
    
    // User has entered correct password and is already logged in
    setIsAuthorized(true);
    setShowPasswordModal(false);
    setPasswordError(null);
    
    // If there's a token but we don't have the username, get it
    if (!cognitoUsername) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const username = payload["cognito:username"];
        setCognitoUsername(username);
      } catch (err) {
        console.error("Failed to decode token", err);
      }
    }
    
    // Check the public username from localStorage before executing album save
    const publicUsername = localStorage.getItem(LOCAL_STORAGE_KEYS.PUBLIC_USERNAME);
    if (publicUsername?.startsWith("Profile-")) {
      console.log("Public username starts with 'Profile-', showing username prompt");

      // If username exists, set it as input value
      if (publicUsername) {
        usernameManager.setUsernameInput("");
      }

      usernameManager.setShowUsernamePrompt(true);
      return;
    }
    
    // Execute the save operation
    executeAlbumSave(t, folderId, albumData);
  };

  // Change columns
  const changeColumns = (value: string) => {
    setColumns(value);
    localStorage.setItem('columns', value);
  };

  // Function to open file picker directly
  const openFilePicker = () => {
    fileUpload.openFilePicker(folderId);
  };

  // Handler for successful login
  const handleLoginSuccess = async () => {
    // Close the login modal first
    setShowInlineOTPLogin(false);
    
    // Get the token and extract username
    const token = await checkLoginWithoutRedirect();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const username = payload["cognito:username"];
        setCognitoUsername(username);
        
        // If password was verified before login, mark as authorized now
        if (passwordVerified) {
          setIsAuthorized(true);
          setPasswordVerified(false); // Reset the flag
        }
        
        // Check the public username from localStorage before proceeding with album save
        const publicUsername = localStorage.getItem(LOCAL_STORAGE_KEYS.PUBLIC_USERNAME);
        if (publicUsername?.startsWith("Profile-")) {
          console.log("Public username starts with 'Profile-', showing username prompt");

          // If username exists, set it as input value
          if (publicUsername) {
            usernameManager.setUsernameInput("");
          }

          usernameManager.setShowUsernamePrompt(true);
          return;
        }
        
        // Check if there's a pending save album operation
        executeAlbumSave(t, folderId, albumData);
        return;
        
      } catch (err) {
        console.error("Failed to decode token", err);
      }
    }
  };

  // Handle file selection using the shared hook
  const handleFileSelection = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
  
    // Remove the localStorage timestamp once files are selected
    localStorage.removeItem('selectPhotosButtonTimestamp');
    setShowSelectPhotosButton(false);
    
    // Use the shared file upload processor
    const success = await fileUpload.handleFileSelection(e, cognitoUsername);
    
    if (!success) {
      // Instead of showing the PhotoLoginModal, show the InlineOTPLogin
      setShowInlineOTPLogin(true);
    }
  };

  // New implementation for saveAlbumDirectly that first checks login, username, and shows OTP if needed
  const saveAlbumDirectly = async () => {
    console.log("Starting album registration");
    
    // Check if authorized for CannotBeSaved policy
    if (passwordPolicy === 'CannotBeSaved' && !isAuthorized) {
      // Set flag that we want to save after password verification
      promptForPassword();
      return;
    }
    
    // Check login first
    const token = await checkLoginWithoutRedirect();
    
    if (!token) {
      console.log("User not logged in, showing OTP login");
      // Show the inline login
      setShowInlineOTPLogin(true);
      return;
    }
    
    // If there's a token but we don't have the username, get it
    if (!cognitoUsername) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const username = payload["cognito:username"];
        setCognitoUsername(username);
      } catch (err) {
        console.error("Failed to decode token", err);
      }
    }
    
    // Check the public username from localStorage
    const publicUsername = localStorage.getItem(LOCAL_STORAGE_KEYS.PUBLIC_USERNAME);
    if (publicUsername?.startsWith("Profile-")) {

      console.log("Public username starts with 'Profile-', showing username prompt");

      // If username exists, set it as input value
      if (publicUsername) {
        usernameManager.setUsernameInput("");
      }

      usernameManager.setShowUsernamePrompt(true);
      return;
    }
    
    // User is logged in and has valid username, continue with album save
    executeAlbumSave(t, folderId, albumData);
  };

  // Create Sub-album function - RESTORED
  const createSubalbum = async () => {
    // Check if authorized for protected policies
    if ((passwordPolicy === 'NotVisible' || passwordPolicy === 'CannotBeSaved') && !isAuthorized) {
      promptForPassword();
      return;
    }
    
    // Toggle selection mode
    setIsSelectionMode(!isSelectionMode);
    // Clear any existing selections when toggling
    selectedItems.clear();
  };
  
  // Share the selected items - RESTORED
  const shareSelectPhotos = async () => {
    createSubAlbumWithSelectedItems(t, albumData, selectedItems);
  };

  // Handle create sub-album from copy link modal
  const handleCreateSubAlbum = () => {
    shareActions.setShowingCopyLinkAlert(false);
    createSubalbum();
  };

  // Set default columns
  useEffect(() => {
    const savedColumnsValue = localStorage.getItem('columns') || '1';
    setColumns(savedColumnsValue);
  }, []);

  // Check if user is logged in and get cognito username
  useEffect(() => {
    const getUserInfo = async () => {
      const token = await checkLoginWithoutRedirect();
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const username = payload["cognito:username"];
          setCognitoUsername(username);
          
          // Check if the Select Photos button should be shown based on timestamp
          const buttonTimestamp = localStorage.getItem('selectPhotosButtonTimestamp');
          if (buttonTimestamp) {
            const timestamp = parseInt(buttonTimestamp, 10);
            const currentTime = Date.now();
            // Calculate time difference in minutes
            const timeDifference = (currentTime - timestamp) / (1000 * 60);
            
            // Only show the button if less than 10 minutes have passed
            setShowSelectPhotosButton(timeDifference < 10);
            
            // If more than 10 minutes have passed, remove the timestamp from localStorage
            if (timeDifference >= 10) {
              localStorage.removeItem('selectPhotosButtonTimestamp');
            }
          } else {
            setShowSelectPhotosButton(false);
          }
        } catch (err) {
          console.error("Failed to decode token", err);
        }
      }
    };
  
    getUserInfo();
  }, []);

  // Set page title
  useEffect(() => {
    if (albumData?.folderName) {
      document.title = albumData.folderName;
    } else {
      document.title = t('Photos');
    }
  }, [albumData, language]);

  // Debug logging for media grid props
  useEffect(() => {
    console.log('AlbumMediaGrid props changed:', {
      albumDataExists: !!albumData,
      mediaItemsCount: albumData?.mediaItems?.length,
      filteredMediaItemsCount: filteredMediaItems?.length,
      columns,
      shouldShowContent,
      shouldShowWatermark,
      isMediaFiltered
    });
  }, [albumData, filteredMediaItems, columns, shouldShowContent, shouldShowWatermark, isMediaFiltered]);

  // Extract album owner name function
  const getAlbumOwnerName = (): string => {
    if (!albumData) return t('the album owner');

    if (albumData.creatorId && albumData.contacts[albumData.creatorId]) {
      return albumData.contacts[albumData.creatorId];
    }
    
    // Default fallback
    return t('the album owner');
  };

  // Check if RTL
  const isRTL = getLanguageDirection(language) === 'rtl';

  // Create album data with filtered media items for passing to components
  const displayAlbumData = albumData ? {
    ...albumData,
    mediaItems: filteredMediaItems
  } : null;

  // Render
  return (
    <>
      <GlobalStyle />
      
      {/* 6180 Brand Header - Reduced padding by 35% */}
      <FixedHeader style={{ padding: '12px 0' }}>
        <FixedHeaderContent style={{ 
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Left side: Logo and Home text */}
          <BrandLink 
            href="https://6180.io" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={cognitoUsername ? t('Visit Home') : t('Visit 6180.io')}
          >
            <BrandLogoContainer $isRTL={isRTL}>
              <BrandLogo 
                src={generateUrl("images/logo_no_background.png")}
                alt={t('6180 Logo')}
              />
              <span style={{ marginLeft: isRTL ? '0' : '8px', marginRight: isRTL ? '8px' : '0', fontSize: '20px', fontWeight: '700' }}>
                {cognitoUsername ? t('Home') : t('6180')}
              </span>
            </BrandLogoContainer>
          </BrandLink>
          
          {/* Right side: Tagline in original position, smaller italic font */}
          <div 
            style={{ 
              fontSize: '14px',
              fontStyle: 'italic',
              color: '#666',
              textAlign: isRTL ? 'left' : 'right',
              transition: 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out',
              opacity: sloganVisible ? 1 : 0,
              transform: sloganVisible ? 'translateY(0)' : 'translateY(-1px)',
              willChange: 'opacity, transform'
            }}
          >
            {t(slogans[currentSloganIndex])}
          </div>
        </FixedHeaderContent>
      </FixedHeader>

      {/* Body content - adjusted padding for new header height */}
      <Body $isRTL={isRTL} style={{ paddingTop: '88px' }}>
        <AlbumHeader
          t={t}
          isSelectionMode={isSelectionMode}
          selectedItems={selectedItems}
          shareSelectPhotos={shareSelectPhotos}
          cancelSelection={cancelSelection}
          selectAll={handleSelectAll}
          unselectAll={handleUnselectAll}
          showingEnterPassword={showingEnterPassword}
          promptForPassword={promptForPassword}
          passwordPolicy={passwordPolicy}
          isAuthorized={isAuthorized}
          saveAlbumDirectly={saveAlbumDirectly}
          handleCopyLink={() => shareActions.setShowingCopyLinkAlert(true)}
          albumData={albumData}
        />

        <MediaContainer id="media-container" style={{
          paddingTop: '12px', // Reduced from default to tighten spacing after header
          paddingBottom: '24px' // Keep bottom padding
        }}>
          {/* Select Photos Button */}
          <SelectPhotosButton 
            showSelectPhotosButton={showSelectPhotosButton}
            albumData={albumData}
            openFilePicker={openFilePicker}
            t={t}
          />
          
          {/* Enhanced Upload Progress Component with more detailed status */}
          {isUploading && (
            <div style={{ width: '100%', marginBottom: '16px' }}>
              <UploadProgress 
                progressTracker={progressTracker} 
                isRTL={getLanguageDirection(language) === "rtl"}
                style={{ marginTop: '16px' }}
                showSuccessMessage={true}
                showErrorMessage={true}
              />
            </div>
          )}
                  
          {/* Selection Mode Banner */}
          <SelectionModeBanner
            isSelectionMode={isSelectionMode}
            t={t}
          />
        
          {/* Album Title and Description */}
          <AlbumInfoComponent
            albumData={albumData}
            t={t}
          />
          
          {/* Columns selector - when no tags, show as simple left-aligned control */}
          {albumData?.mediaItems && albumData.mediaItems.length > 0 && !hasAnyTags && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              marginBottom: '16px'
              // Remove paddingLeft to align with the natural flow
            }}>
              <ControlLabel style={{ margin: '0' }}>{t('Columns:')}</ControlLabel>
              <ColumnsSelector
                value={columns}
                onChange={(e) => changeColumns(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </ColumnsSelector>
            </div>
          )}

          {/* UPDATED: Unified Layout + Filter Control Block - only show when there are tags */}
          {albumData?.mediaItems && albumData.mediaItems.length > 0 && hasAnyTags && (
            <LayoutFilterBlock style={{
              background: 'rgba(248, 249, 250, 0.8)',
              border: '1px solid #e9ecef',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '16px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}>
              {/* Columns Selector */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                marginBottom: '8px'
              }}>
                <ControlLabel style={{ margin: '0' }}>{t('Columns:')}</ControlLabel>
                <ColumnsSelector
                  value={columns}
                  onChange={(e) => changeColumns(e.target.value)}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </ColumnsSelector>
              </div>
              
              {/* Filter Tags */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '8px',
                flexWrap: 'wrap'
              }}>
                <ControlLabel style={{ margin: '0', paddingTop: '6px', flexShrink: 0 }}>{t('Filter by:')}</ControlLabel>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <MediaTagsFilter
                    mediaItems={albumData.mediaItems}
                    onFilterChange={handleMediaFilterChange}
                    resetFilter={resetMediaFilter}
                  />
                </div>
              </div>
            </LayoutFilterBlock>
          )}
          
          {/* Media Grid - reduced spacing */}
          <div style={{ marginTop: '16px' }}>
            <AlbumMediaGrid
              isLoading={false} // Loading is handled by the wrapper
              error={null} // Error is handled by the wrapper
              albumData={displayAlbumData}
              columns={columns}
              shouldShowContent={shouldShowContent}
              shouldShowWatermark={shouldShowWatermark}
              isSelectionMode={isSelectionMode}
              selectedItems={selectedItems}
              toggleItemSelection={toggleItemSelection}
              openFullscreenView={openFullscreenView}
              t={t}
            />
          </div>
        </MediaContainer>
        
        {/* Password Modal with error display */}
        <PasswordModal
          isOpen={showPasswordModal}
          onClose={() => {
            setShowPasswordModal(false);
            setPasswordError(null); // Clear error when closing modal
          }}
          onSubmit={handlePasswordSubmit}
          error={passwordError}
          t={t}
        />
        
        {/* PhotoLoginModal Component */}
        <PhotoLoginModal
          isOpen={showInlineOTPLogin}
          onClose={() => {
            setShowInlineOTPLogin(false);
          }}
          onLoginSuccess={handleLoginSuccess}
          ownerName={getAlbumOwnerName()}
          t={t}
        />
        
        {/* FileInput Component */}
        <FileInput 
          onFileSelection={handleFileSelection} 
          ref={fileInputRef}
        />
        
        {/* Fullscreen Media Viewer */}
        {fullscreenItem !== null && displayAlbumData && (
          <FullscreenMediaViewer
            item={displayAlbumData.mediaItems[fullscreenItem]}
            index={fullscreenItem}
            onClose={closeFullscreenView}
            onPrev={goToPrevItem}
            onNext={() => goToNextItem(filteredMediaItems.length)}
            hasNext={fullscreenItem < filteredMediaItems.length - 1}
            hasPrev={fullscreenItem > 0}
            showWatermark={shouldShowWatermark()}
            ownerName={
              (() => {
                // Get the owner contact ID
                const ownerContactId = filteredMediaItems[fullscreenItem].ownerContactId;
                if (!ownerContactId) return "";
                
                // Check if contacts exists and has a direct entry
                if (albumData?.contacts && albumData.contacts[ownerContactId]) {
                  return albumData.contacts[ownerContactId];
                }
                
                // Extract the username portion
                const extractedUsername = ownerContactId.split('_____')[0] || "";
                
                // If the extracted username matches the current user's cognito username, display "Me"
                if (extractedUsername === cognitoUsername) {
                  return t('Me');
                }
                
                // Otherwise use the extracted username
                return extractedUsername;
              })()
            }
          />
        )}
        
        {/* Username Prompt Modal */}
        <UsernamePrompt
          t={t}
          language={language}
          usernameManager={usernameManager}
          onSuccess={(_) => {
            // Automatically proceed with saving the album
            executeAlbumSave(t, folderId, albumData);
          }}
        />
        
        {/* Copy Link Modals */}
        <CopyLinkModal
          isOpen={shareActions.showingCopyLinkAlert}
          onClose={() => shareActions.setShowingCopyLinkAlert(false)}
          inviteLink={
            generateInviteLink(
              folderId,
              albumData?.albumNanoId,
              albumData?.creatorId && albumData?.contacts && albumData?.contacts[albumData?.creatorId] 
              ? albumData?.contacts[albumData?.creatorId] 
              : 'album',
              albumData?.folderName
            )
          }
          onCopy={shareActions.handleCopy}
          onCreateSubAlbum={handleCreateSubAlbum}
          showCreateSubAlbum={true}
          t={t}
          isRTL={getLanguageDirection(language) === "rtl"}
        />
        
        <ConfirmationModal
          isOpen={shareActions.showingCopiedLinkAlert}
          onClose={() => shareActions.setShowingCopiedLinkAlert(false)}
          t={t}
          isRTL={getLanguageDirection(language) === "rtl"}
        />
      </Body>
    </>
  );
};