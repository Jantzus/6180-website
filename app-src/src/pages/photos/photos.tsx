import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { I18nProvider } from "@/lib/i18n/context";
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
import { formatUUID, generateInviteLink } from "@/lib/utils";
import { fetchFolderUsingTargetItemIdentifier, fetchFolderUsingAlbumNanoId } from "@/lib/databaseAPIService";
import { downloadPhotos } from "@/lib/fileOperations";
import { LOCAL_STORAGE_KEYS } from "@/lib/config";

// Import the useUsernameManagement hook from the correct location
import { useUsernameManagement } from "@/lib/useUsernameManagement";

// Import extracted utility functions
import { 
  executeAlbumSave, 
  useSelectionMode, 
  usePasswordProtection,
  useShareActions
} from "./utils";

// Import extracted components
import { 
  SelectPhotosButton, 
  SelectionModeBanner 
} from "./components";

// Import the new Enhanced MediaTagsFilter component
import { EnhancedMediaTagsFilter } from "./EnhancedMediaTagsFilter";

// Import styled components
import { 
  Body, 
  MediaContainer,
  GlobalStyle,
  // Add the new brand header components:
  BrandHeader,
  BrandHeaderContent,
  BrandLink,
  BrandLogo,
  BrandLogoContainer,
  BrandSlogan
} from "@/styles/styled-components";

// Import components
import { FullscreenMediaViewer } from "@/components/FullscreenMediaViewer";
import { PasswordModal } from "@/pages/photos/PasswordModal";
import { PhotoLoginModal } from "@/pages/photos/PhotoLoginModal";
import { FileInput } from "@/components/FileInput";
import { UploadProgress } from "@/components/UploadProgress";
import { CopyLinkModal } from "@/components/Modals/CopyLinkModal";
import { ConfirmationModal } from "@/components/Modals/ConfirmationModal";

import { UsernamePrompt } from "@/components/UsernamePrompt";
import { AlbumMediaGrid } from "@/components/AlbumMediaGrid";
import { AlbumInfoComponent } from "@/components/AlbumInfoComponent";
import { AlbumHeader } from "@/components/AlbumHeader";

// ============================
// Main Photo Album Component
// ============================

const PhotoAlbumContent: React.FC = () => {
  // Hooks for i18n
  const { t, language } = useTranslation();
  
  // Custom hooks
  const fullscreenView = useFullscreenView();
  const selectionMode = useSelectionMode();
  const passwordProtection = usePasswordProtection();
  const usernameManager = useUsernameManagement(t);
  
  // State
  const [columns, setColumns] = useState<string>('1');
  const [albumData, setAlbumData] = useState<AlbumData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [folderId, setFolderId] = useState<string | null>(null);
  
  // Media filtering state
  const [filteredMediaItems, setFilteredMediaItems] = useState<MediaItem[]>([]);
  const [isMediaFiltered, setIsMediaFiltered] = useState<boolean>(false);
  
  // Login and user state
  const [showInlineOTPLogin, setShowInlineOTPLogin] = useState(false);
  const [showSelectPhotosButton, setShowSelectPhotosButton] = useState(false);
  const [cognitoUsername, setCognitoUsername] = useState<string | null>(null);
  const [addPhotosClicked, setAddPhotosClicked] = useState(false);
  
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
    isSelectionMode, selectedItems, toggleItemSelection, cancelSelection
  } = selectionMode;
  
  // Initialize share actions hook
  const shareActions = useShareActions(albumData, folderId, cognitoUsername, t);

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

  // ✅ ENHANCED DEBUG: Initialize filtered media items when album data changes
  useEffect(() => {
    if (albumData?.mediaItems) {
      console.log('🎯 photos.tsx: albumData updated, checking mediaItems tags:', {
        totalItems: albumData.mediaItems.length,
        itemsWithTags: albumData.mediaItems.filter(item => item.selectedTags && item.selectedTags.length > 0).length,
        firstItemTagCount: albumData.mediaItems[0]?.selectedTags?.length || 0
      });
      
      // Log detailed info about first few items
      albumData.mediaItems.slice(0, 3).forEach((item, index) => {
        console.log(`🎯 photos.tsx item ${index}:`, {
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

  // Media filter handlers
  const handleMediaFilterChange = (newFilteredItems: MediaItem[]) => {
    setFilteredMediaItems(newFilteredItems);
    setIsMediaFiltered(true);
  };

  const resetMediaFilter = () => {
    if (albumData?.mediaItems) {
      setFilteredMediaItems(albumData.mediaItems);
      setIsMediaFiltered(false);
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

  // Function to open file picker after checking login
  const addPhotosToAlbum = async () => {
    // Check login first
    const token = await checkLoginWithoutRedirect();
    
    if (!token) {
      // User is not logged in and clicking Add Photos - set the flag
      setAddPhotosClicked(true);
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
    
    // User is logged in, continue with file selection
    openFilePicker();
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
        
        // Only set the timestamp if the user clicked Add Photos and needed to log in
        if (addPhotosClicked) {
          localStorage.setItem('selectPhotosButtonTimestamp', Date.now().toString());
          // Reset the flag
          setAddPhotosClicked(false);
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

  // Create Sub-album function - REMOVED

  // Modified handle download photos function to directly save the album
  const handleDownloadPhotos = async () => {
    // Check if download should be restricted
    if (passwordPolicy === 'CannotBeSaved' && !isAuthorized) {
      promptForPassword();
      return;
    }
    
    // Check login first for certain operations
    const token = await checkLoginWithoutRedirect();
    
    if (!token && (folderId || passwordPolicy === 'CannotBeSaved')) {
      // Instead of redirecting, show the inline login
      setShowInlineOTPLogin(true);
      return;
    }
    
    // Call download function from fileOperations
    if (albumData) {
      downloadPhotos(albumData, t, openFullscreenView);
    }
  };

  // Set default columns
  useEffect(() => {
    const savedColumnsValue = localStorage.getItem('columns') || '1';
    setColumns(savedColumnsValue);
  }, []);

  // Updated URL parameter extraction function
  const getParametersFromUrl = (): string | null => {
    console.log('getParametersFromUrl called');
    console.log('window.location.pathname:', window.location.pathname);
    
    // Handle path-based format: /prefix/parameters
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    console.log('pathSegments:', pathSegments);
    
    // Skip if it's the traditional app path
    if (pathSegments.length > 0 && pathSegments[0] === 'app') {
      console.log('Traditional app path detected, returning null');
      return null;
    }
    
    // For /prefix/parameters format, return the parameters part
    if (pathSegments.length === 2) {
      console.log('Found parameters:', pathSegments[1]);
      return pathSegments[1];
    }
    
    console.log('No valid path format found, returning null');
    return null;
  };

  // Updated album initialization logic
  useEffect(() => {
    const initAlbum = async () => {
      console.log('initAlbum called');
      const parameters = getParametersFromUrl();
      console.log('Extracted parameters:', parameters);
      
      if (!parameters) {
        console.log('No parameters found, setting error');
        setError(t('Valid parameters not found in URL'));
        setIsLoading(false);
        return;
      }
      
      let identifier: string;
      let useTargetItemIdentifier = false;
      
      console.log('Checking if parameters contain "id=":', parameters.includes('id='));
      
      // Check if parameters contain "id="
      if (parameters.includes('id=')) {
        console.log('Parameters contain "id=", extracting identifier');
        // Extract the value after "id="
        const idIndex = parameters.indexOf('id=');
        if (idIndex !== -1) {
          identifier = parameters.substring(idIndex + 3); // 3 is length of "id="
          useTargetItemIdentifier = true;
          console.log('Extracted identifier after "id=":', identifier);
          console.log('Will use fetchFolderUsingTargetItemIdentifier');
        } else {
          console.log('Failed to find "id=" in parameters');
          setError(t('Invalid id parameter format'));
          setIsLoading(false);
          return;
        }
      } else {
        // Use the entire parameters string
        identifier = parameters;
        useTargetItemIdentifier = false;
        console.log('Using entire parameters as identifier:', identifier);
        console.log('Will use fetchFolderUsingAlbumNanoId');
      }
      
      // If identifier contains "-", ignore everything before the last "-"
      if (identifier.includes('-')) {
        const parts = identifier.split('-');
        const originalIdentifier = identifier;
        identifier = parts[parts.length - 1];
        console.log('Identifier contained "-", stripped from:', originalIdentifier, 'to:', identifier);
      } else {
        console.log('Identifier does not contain "-", keeping as is:', identifier);
      }
      
      let data;
      
      if (useTargetItemIdentifier) {
        console.log('Calling fetchFolderUsingTargetItemIdentifier with identifier:', identifier);
        // Use fetchFolderUsingTargetItemIdentifier logic

        let formattedId = identifier
    
        // Make sure it's exactly 32 characters before formatting
        if (formattedId.length === 32) {
          formattedId = formatUUID(formattedId);
          console.log(formattedId); // e.g., B89D8BAF-F9A1-484B-A379-FA7FAD081303
        } else {
          console.error('Invalid UUID format: must be 32 characters after removing dashes');
        }
  
        data = await fetchFolderUsingTargetItemIdentifier(formattedId, setFolderId);
      } else {
        console.log('Calling fetchFolderUsingAlbumNanoId with identifier:', identifier);
        // Use fetchFolderUsingAlbumNanoId logic
        data = await fetchFolderUsingAlbumNanoId(identifier, setFolderId);
      }
      
      console.log('API call result:', data ? 'Success' : 'Failed');
      
      if (data) {
        console.log('Full album data received:', data);
        console.log('Media items count:', data.mediaItems ? data.mediaItems.length : 'No mediaItems property');
        console.log('Password policy:', data.passwordPolicy);
        console.log('Folder position ID:', data.folderPositionId);
        
        setAlbumData(data);
        
        // Set password policy from the API result
        if (data.passwordPolicy) {
          setPasswordPolicy(data.passwordPolicy as PasswordPolicyEnum);
          console.log('Password policy set to:', data.passwordPolicy);
          
          // If NoPassword policy or the user has a folderPosition, automatically set as authorized
          if (data.passwordPolicy === 'NoPassword' || data.folderPositionId) {
            setIsAuthorized(true);
            console.log('User automatically authorized');
          } else {
            console.log('User not automatically authorized, will need to enter password');
          }
        }
        console.log('Album data set successfully');
      } else {
        console.log('No data returned from API, setting error');
        setError(t('Album not found'));
      }
      
      setIsLoading(false);
      console.log('initAlbum completed');
    };

    initAlbum();
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
      isLoading,
      error,
      albumDataExists: !!albumData,
      mediaItemsCount: albumData?.mediaItems?.length,
      filteredMediaItemsCount: filteredMediaItems?.length,
      columns,
      shouldShowContent,
      shouldShowWatermark,
      isMediaFiltered
    });
  }, [isLoading, error, albumData, filteredMediaItems, columns, shouldShowContent, shouldShowWatermark, isMediaFiltered]);

  // Extract album owner name function
  const getAlbumOwnerName = (): string => {
    if (!albumData) return 'the album owner';

    if (albumData.creatorId && albumData.contacts[albumData.creatorId]) {
      return albumData.contacts[albumData.creatorId];
    }
    
    // Default fallback
    return 'the album owner';
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
    <Body $isRTL={isRTL}>
      <GlobalStyle />
      
      {/* 6180 Brand Header */}
      <BrandHeader>
        <BrandHeaderContent>
          <BrandLink 
            href="https://6180.io" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={t('Visit 6180.io')}
          >
            <BrandLogoContainer $isRTL={isRTL}>
              <BrandLogo 
                src={generateUrl("images/logo_no_background.png")}
                alt="6180 Logo"
              />
              <span style={{ marginLeft: '8px', fontSize: '18px', fontWeight: 'bold' }}>
                {t('Home')}
              </span>
            </BrandLogoContainer>
          </BrandLink>
          
          <BrandSlogan 
            href="https://6180.io" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={t('Create an album in 90 sec')}
          >
            {t('Create an album in 90 sec')}
          </BrandSlogan>
        </BrandHeaderContent>
      </BrandHeader>
      
      <AlbumHeader
        t={t}
        isSelectionMode={isSelectionMode}
        cancelSelection={cancelSelection}
        showingEnterPassword={showingEnterPassword}
        promptForPassword={promptForPassword}
        passwordPolicy={passwordPolicy}
        isAuthorized={isAuthorized}
        addPhotosToAlbum={addPhotosToAlbum}
        saveAlbumDirectly={saveAlbumDirectly}
        handleDownloadPhotos={handleDownloadPhotos}
        handleCopyLink={() => shareActions.setShowingCopyLinkAlert(true)}
        albumData={albumData}
        columns={columns}
        changeColumns={changeColumns}
      />

      <MediaContainer id="media-container">
        {/* Select Photos Button */}
        <SelectPhotosButton 
          showSelectPhotosButton={showSelectPhotosButton}
          albumData={albumData}
          openFilePicker={openFilePicker}
          t={t}
        />
        
        {/* Enhanced Upload Progress Component with more detailed status */}
        {isUploading && (
          <div style={{ width: '100%', marginBottom: '20px' }}>
            <UploadProgress 
              progressTracker={progressTracker} 
              isRTL={getLanguageDirection(language) === "rtl"}
              style={{ marginTop: '20px' }}
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
        
        {/* Enhanced Media Tags Filter */}
        {albumData?.mediaItems && albumData.mediaItems.length > 0 && (
          <EnhancedMediaTagsFilter
            mediaItems={albumData.mediaItems}
            onFilterChange={handleMediaFilterChange}
            resetFilter={resetMediaFilter}
          />
        )}
        
        {/* Media Grid */}
        <AlbumMediaGrid
          isLoading={isLoading}
          error={error}
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
  );
};

// Wrap PhotoAlbumContent with I18nProvider
const PhotoAlbum: React.FC = () => {
  return (
    <I18nProvider>
      <PhotoAlbumContent />
    </I18nProvider>
  );
};

// Initialize the app
ReactDOM.createRoot(document.getElementById("root")!).render(<PhotoAlbum />);