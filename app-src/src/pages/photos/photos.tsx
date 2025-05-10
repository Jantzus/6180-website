import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { I18nProvider } from "@/lib/i18n/context";
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n";
import { 
  checkLoginWithoutRedirect, 
  checkLoginWithRefresh, 
  useFileUpload,
  useFullscreenView,
  useSelectionMode, 
  usePasswordProtection,
  useShareActions
 } from "@/lib/utils";

// Import types and utilities
import { AlbumData, PasswordPolicyEnum } from "@/lib/types";
import { getIdFromUrl, formatUUID, generateUUID } from "@/lib/utils";
import { fetchFolder } from "@/lib/apiService";
import { downloadPhotos } from "@/lib/fileOperations";

// Import upload utilities
import { 
  createPhotoStatusUpdater, 
  updateProgressTracker,
  processFilesBeforeUploadingToS3
} from "@/lib/file-upload-utils";

// Add the AWS_PRIVATE_GRAPHQL_ENDPOINT import
import { LOCAL_STORAGE_KEYS } from "@/lib/config";
import { useUsernameManagement } from "@/lib/customHooks";

// Import extracted utility functions
import { executeAlbumSave, createSubAlbumWithSelectedItems } from "./album-utils";

// Import extracted components
import { 
  SelectPhotosButton, 
  PasswordProtectionMessage, 
  SelectionModeBanner 
} from "./album-components";

// Import styled components
import { 
  Body, 
  MediaContainer
} from "@/styles/photos-styled-components";
import { 
  GlobalStyle
} from "@/styles/styled-components";

// Import components
import { FullscreenMediaViewer } from "@/components/FullscreenMediaViewer";
import { PasswordModal } from "@/components/ModalComponents";
import { FileInput } from "@/components/FileInput";
import { UploadProgress } from "@/components/UploadProgress";
import LoginModal from "@/components/LoginModal";
import { CopyLinkModal, ConfirmationModal } from "@/components/Modals";
import { UsernamePrompt } from "@/components/UsernamePrompt";
import { SaveToShareContactListDescription } from "@/components/SaveToShareContactListDescription";
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
  const fileUpload = useFileUpload();
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
  
  // Login and user state
  const [showInlineOTPLogin, setShowInlineOTPLogin] = useState(false);
  const [showSelectPhotosButton, setShowSelectPhotosButton] = useState(false);
  const [cognitoUsername, setCognitoUsername] = useState<string | null>(null);
  const [addPhotosClicked, setAddPhotosClicked] = useState(false);
  
  // Destruct from hooks
  const { 
    passwordPolicy, setPasswordPolicy, isAuthorized, setIsAuthorized,
    showPasswordModal, setShowPasswordModal, passwordError, setPasswordError,
    passwordVerified, setPasswordVerified,
    shouldShowContent, shouldShowWatermark, showingEnterPassword, promptForPassword
  } = passwordProtection;
  
  const {
    fileInputRef, selectedPhotos, setSelectedPhotos, isUploading, setIsUploading,
    fileProcessingComplete, setFileProcessingComplete, progressTracker, log
  } = fileUpload;
  
  const {
    fullscreenItem, openFullscreenView, closeFullscreenView,
    goToPrevItem, goToNextItem
  } = fullscreenView;
  
  const {
    isSelectionMode, setIsSelectionMode, selectedItems, toggleItemSelection, cancelSelection
  } = selectionMode;
  
  // Initialize share actions hook
  const shareActions = useShareActions(albumData, folderId, cognitoUsername, t);
  
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
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
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
    
    // Reset the file processing completion flag before opening file picker
    setFileProcessingComplete(false);
    
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
        
        // Check if there's a pending save album operation
        executeAlbumSave(t, folderId, albumData);
        return;
        
      } catch (err) {
        console.error("Failed to decode token", err);
      }
    }
  };

  // Handle file selection
  const handleFileSelection = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
  
    // Remove the localStorage timestamp once files are selected
    localStorage.removeItem('selectPhotosButtonTimestamp');
    setShowSelectPhotosButton(false);
    setIsUploading(true);
    // Reset file processing completion flag
    setFileProcessingComplete(false);
    
    // Get a fresh token using the async function
    const token = await checkLoginWithRefresh();
    
    if (!token) {
      log("❌ Authentication failed");
      setIsUploading(false);
      // Instead of showing the LoginModal, show the InlineOTPLogin
      setShowInlineOTPLogin(true);
      return;
    }
    
    // If we get here, the user is authenticated, so continue with the upload
    try {
      // Extract username from token
      const payload = JSON.parse(atob(token.split('.')[1]));
      const username = payload["cognito:username"];
      
      if (!username) {
        log("❌ Missing Cognito Username");
        setIsUploading(false);
        return;
      }
      
      setCognitoUsername(username);
      
      // Generate a new folder ID or use existing one
      const newFolderId = folderId || `${username}_____${generateUUID()}____Folder`;
      log(`📁 Using folder ID: ${newFolderId}`);
      
      // Initialize empty array for selected photos in state to show initial progress
      setSelectedPhotos(files.map((file) => ({
        fileName: file.name,
        s3PreviewUrl: URL.createObjectURL(file),
        type: file.type,
        size: file.size,
        status: 'pending',
        progress: 0
      })));
      
      // Use the createPhotoStatusUpdater function
      const updatePhotoStatus = createPhotoStatusUpdater(setSelectedPhotos);
      
      // Set up an interval to update the UI while processing continues
      const progressUpdateInterval = setInterval(() => {
        updateProgressTracker(selectedPhotos, fileUpload.setProgressTracker);
      }, 500);
      
      // Use the processFilesBeforeUploadingToS3 function
      const processedPhotos = await processFilesBeforeUploadingToS3(files, username, updatePhotoStatus, log);
      
      // Clear the interval once processing is complete
      clearInterval(progressUpdateInterval);
      
      // Make sure we have a final progress update
      updateProgressTracker(processedPhotos, fileUpload.setProgressTracker);
      
      // Save to localStorage - ONLY the keys and metadata, not the file data
      localStorage.setItem(LOCAL_STORAGE_KEYS.SELECTED_PHOTOS, JSON.stringify(processedPhotos));
      log(`📸 Saved ${processedPhotos.length} photos metadata to storage`);
      
      // If all photos are uploaded successfully, show a completion message
      const allComplete = processedPhotos.every(photo => photo.status === 'complete');
      const anyErrors = processedPhotos.some(photo => photo.status === 'error');
      
      if (allComplete && !anyErrors) {
        log(`✅ All ${processedPhotos.length} files successfully uploaded`);
      } else if (anyErrors) {
        const errorCount = processedPhotos.filter(photo => photo.status === 'error').length;
        log(`⚠️ Upload completed with ${errorCount} errors`);
      }
      
      // Set a slight delay before navigation to show the completed upload status
      setTimeout(() => {
        // Set the file processing completion flag to trigger the navigation effect
        setFileProcessingComplete(true);
      }, 1000);
      
    } catch (error) {
      log(`❌ Fatal error in handleFileSelection: ${String(error)}`);
      setIsUploading(false);
    } finally {
      // Clear the file input to allow selecting the same files again
      if (e.target) e.target.value = "";
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
    const publicUsername = localStorage.getItem("publicUsername");
    if (publicUsername?.startsWith("Profile-")) {
      console.log("Public username starts with 'Profile-', showing username prompt");
      usernameManager.setUsernameInput(publicUsername);
      usernameManager.setShowUsernamePrompt(true);
      return;
    }
    
    // User is logged in and has valid username, continue with album save
    executeAlbumSave(t, folderId, albumData);
  };

  // Create Sub-album function
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
  
  // Share the selected items
  const shareSelection = async () => {
    createSubAlbumWithSelectedItems(t, albumData, selectedItems);
  };

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

  // Fetch album data
  useEffect(() => {
    const initAlbum = async () => {
      const id = getIdFromUrl();
      
      if (!id) {
        setError(t('Valid ID not obtained from query parameter.'));
        setIsLoading(false);
        return;
      }
      
      const parts = id.split('_');
      let formattedId = parts[parts.length - 1].replace(/-/g, '');
  
      // Make sure it's exactly 32 characters before formatting
      if (formattedId.length === 32) {
        formattedId = formatUUID(formattedId);
        console.log(formattedId); // e.g., B89D8BAF-F9A1-484B-A379-FA7FAD081303
      } else {
        console.error('Invalid UUID format: must be 32 characters after removing dashes');
      }
  
      const data = await fetchFolder(formattedId, setFolderId);
      
      if (data) {
        setAlbumData(data);
        
        // Set password policy from the API result
        if (data.passwordPolicy) {
          setPasswordPolicy(data.passwordPolicy as PasswordPolicyEnum);
          
          // If NoPassword policy or the user has a folderPosition, automatically set as authorized
          if (data.passwordPolicy === 'NoPassword' || data.folderPositionId) {
            setIsAuthorized(true);
          }
        }
      }
      
      setIsLoading(false);
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

  // Effect to navigate to save-album page after file processing is complete
  useEffect(() => {
    if (fileProcessingComplete && selectedPhotos.length > 0) {
      // Show a completion message in the UI
      const successCount = selectedPhotos.filter(photo => photo.status === 'complete').length;
      const errorCount = selectedPhotos.filter(photo => photo.status === 'error').length;
      
      console.log(`Upload complete: ${successCount} successful, ${errorCount} failed`);
      
      // Get the necessary data for the redirect
      if (folderId) {
        window.location.href = `/save-album.html?folderId=${encodeURIComponent(folderId)}`;
      } else {
        window.location.href = "/save-album.html";
      }
    }
  }, [fileProcessingComplete, selectedPhotos.length, folderId]);

  // Set page title
  useEffect(() => {
    if (albumData?.folderName) {
      document.title = albumData.folderName;
    } else {
      document.title = t('Photos');
    }
  }, [albumData, language]);

  // Render
  return (
    <Body>
      <GlobalStyle />
      
      <AlbumHeader
        t={t}
        isSelectionMode={isSelectionMode}
        selectedItems={selectedItems}
        shareSelection={shareSelection}
        cancelSelection={cancelSelection}
        createSubalbum={createSubalbum}
        showingEnterPassword={showingEnterPassword}
        promptForPassword={promptForPassword}
        passwordPolicy={passwordPolicy}
        isAuthorized={isAuthorized}
        addPhotosToAlbum={addPhotosToAlbum}
        saveAlbumDirectly={saveAlbumDirectly}
        handleDownloadPhotos={handleDownloadPhotos}
        handleCopyLink={() => shareActions.setShowingCopyLinkAlert(true)}
        handlePublicProfileToggle={shareActions.handlePublicProfileToggle}
        isOnPublicProfile={shareActions.isOnPublicProfile}
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
        
        {/* Contact List */}
        <SaveToShareContactListDescription 
          albumData={albumData}
          t={t}
        />
        
        {/* Enhanced Upload Progress Component with more detailed status */}
        {isUploading && (
          <div style={{ width: '100%', marginBottom: '20px' }}>
            <UploadProgress 
              progressTracker={progressTracker} 
              t={t} 
              isRTL={getLanguageDirection(language) === "rtl"}
              style={{ marginTop: '20px' }}
            />
            
            {/* Additional status messages for better user experience */}
            {progressTracker.filesComplete > 0 && progressTracker.filesComplete === progressTracker.totalFiles && (
              <div style={{
                backgroundColor: '#e8f5e9',
                color: '#2e7d32',
                padding: '10px 16px',
                borderRadius: '6px',
                fontSize: '14px',
                marginTop: '10px',
                textAlign: 'center'
              }}>
                {t('Upload complete! Preparing to save your album...')}
              </div>
            )}
            
            {progressTracker.filesWithError > 0 && (
              <div style={{
                backgroundColor: '#ffebee',
                color: '#c62828',
                padding: '10px 16px',
                borderRadius: '6px',
                fontSize: '14px',
                marginTop: '10px',
                textAlign: 'center'
              }}>
                {t('Some files could not be uploaded. You can continue with the successfully uploaded files.')}
              </div>
            )}
          </div>
        )}
        
        {/* Password protection message */}
        <PasswordProtectionMessage
          isAuthorized={isAuthorized}
          passwordPolicy={passwordPolicy}
          passwordError={passwordError}
          promptForPassword={promptForPassword}
          t={t}
        />
        
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
        
        {/* Media Grid */}
        <AlbumMediaGrid
          isLoading={isLoading}
          error={error}
          albumData={albumData}
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
      
      {/* LoginModal Component */}
      <LoginModal
        isOpen={showInlineOTPLogin}
        onClose={() => {
          setShowInlineOTPLogin(false);
        }}
        onLoginSuccess={handleLoginSuccess}
        t={t}
      />
      
      {/* FileInput Component */}
      <FileInput 
        onFileSelection={handleFileSelection} 
        ref={fileInputRef}
      />
      
      {/* Fullscreen Media Viewer */}
      {fullscreenItem !== null && albumData && (
        <FullscreenMediaViewer
          item={albumData.mediaItems[fullscreenItem]}
          index={fullscreenItem}
          onClose={closeFullscreenView}
          onPrev={goToPrevItem}
          onNext={() => goToNextItem(albumData.mediaItems.length)}
          hasNext={fullscreenItem < albumData.mediaItems.length - 1}
          hasPrev={fullscreenItem > 0}
          showWatermark={shouldShowWatermark()}
          ownerName={
            (() => {
              // Get the owner contact ID
              const ownerContactId = albumData.mediaItems[fullscreenItem].ownerContactId;
              if (!ownerContactId) return "";
              
              // Check if contacts exists and has a direct entry
              if (albumData.contacts && albumData.contacts[ownerContactId]) {
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
        inviteLink={shareActions.generateInviteLink()}
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