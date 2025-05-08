import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import { I18nProvider, useTranslation } from "@/lib/i18n/react";
import { getLanguageDirection } from "@/lib/i18n";
import { checkLoginWithoutRedirect, checkLoginWithRefresh } from "@/lib/utils";

// Import types and utilities
import { AlbumData, PasswordPolicyEnum, SelectedPhoto, ProgressTracker } from "@/lib/types";
import { getIdFromUrl, formatUUID, generateUUID } from "@/lib/utils";
import { fetchFolder } from "@/lib/apiService";
import { downloadPhotos } from "@/lib/fileOperations";
import { LOCAL_STORAGE_KEYS } from "@/lib/config";

// Import upload utilities
import { 
  createLogger, 
  createPhotoStatusUpdater, 
  updateProgressTracker,
  processFilesBeforeUploadingToS3
} from "@/lib/file-upload-utils";

// Add the AWS_PRIVATE_GRAPHQL_ENDPOINT import
import { AWS_PRIVATE_GRAPHQL_ENDPOINT } from "@/lib/config";

// Import styled components
import { 
  GlobalStyle, 
  Body, 
  Header, 
  HeaderContent,
  HeaderControlsWithFullWidth,
  CreateAlbumButton, 
  RowSelectorContainer, 
  RowSelectorLabel, 
  RowSelectorSelect,
  MediaContainer, 
  AlbumTitle, 
  AlbumTitleStrong, 
  DescriptionBlock, 
  DescriptionText, 
  MediaGrid, 
  ErrorMessage, 
  LoadingMessage,
  SelectionBanner,
  SelectionCheckbox,
  Checkmark,
  ActionButton,
  OwnerBadge
} from "@/styles/photos-styled-components";

// Import styled components
import { 
  ModalOverlay,
  UsernameModal,
  UsernameTitle,
  UsernameDescription,
  UsernameInput,
  UsernameError,
  UsernameButton,
  UsernameAltButton
} from "@/styles/styled-components";

// Import components
import { LazyImage, VideoThumbnail, FullscreenMediaViewer } from "@/components/MediaComponents";
import { PasswordModal } from "@/components/ModalComponents";
import ResponsiveHeader from "@/components/HeaderComponents";
import { FileInput } from "@/components/FileInput";
import { UploadProgress } from "@/components/UploadProgress";
import LoginModal from "@/components/LoginModal";

// Main Photo Album Component
const PhotoAlbumContent: React.FC = () => {
  // Hooks for i18n
  const { t, language } = useTranslation();
  
  // State
  const [columns, setColumns] = useState<string>('1');
  const [albumData, setAlbumData] = useState<AlbumData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [folderId, setFolderId] = useState<string | null>(null); // Used when processing API data
  
  // Password and authorization state
  const [passwordPolicy, setPasswordPolicy] = useState<PasswordPolicyEnum | undefined>(undefined);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  // Add state to track password verification
  const [passwordVerified, setPasswordVerified] = useState<boolean>(false);
  
  // Added state for tracking which items are loading in full resolution
  const [loadingFullResolution, setLoadingFullResolution] = useState<Record<number, boolean>>({});
  
  // State for fullscreen viewer
  const [fullscreenItem, setFullscreenItem] = useState<number | null>(null);
  
  // Selection mode state
  const [isSelectionMode, setIsSelectionMode] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

  // State for file upload and tracking
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedPhotos, setSelectedPhotos] = useState<SelectedPhoto[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [addPhotosClicked, setAddPhotosClicked] = useState(false);  
  const [progressTracker, setProgressTracker] = useState<ProgressTracker>({
    totalFiles: 0,
    filesComplete: 0,
    filesUploading: 0,
    filesProcessing: 0,
    filesWithError: 0,
    overallProgress: 0 // Note: This is a decimal (0-1) not a percentage (0-100)
  });
  
  // Add new state for inline OTP login
  const [showInlineOTPLogin, setShowInlineOTPLogin] = useState(false);
  // Check localStorage instead of using state for tracking login success
  const [showSelectPhotosButton, setShowSelectPhotosButton] = useState(false);
  // Add state to track user information
  const [cognitoUsername, setCognitoUsername] = useState<string | null>(null);
  // Add new state to track file processing completion
  const [fileProcessingComplete, setFileProcessingComplete] = useState(false);
  // Add state to track pending save album operation
  const [pendingSaveAlbum, setPendingSaveAlbum] = useState(false);
  
  // Add state for username handling
  const [showUsernamePrompt, setShowUsernamePrompt] = useState<boolean>(false);
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [showAltButton, setShowAltButton] = useState<boolean>(false);
  const [isSubmittingUsername, setIsSubmittingUsername] = useState<boolean>(false);

  // Create logger for tracking upload progress (logs to console only, not stored in state)
  const log = createLogger(() => {
    // Using empty function since we don't need to display debug messages in UI
  });
  
  // Update progress tracker when selectedPhotos changes
  useEffect(() => {
    updateProgressTracker(selectedPhotos, setProgressTracker);
  }, [selectedPhotos]);

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

  // Check if content should be protected based on policy and authorization
  const shouldShowContent = () => {
    // If no policy or authorized, show content
    if (!passwordPolicy || isAuthorized || passwordPolicy === 'NoPassword') {
      return true;
    }
    
    // With NotVisible policy and not authorized, hide content
    if (passwordPolicy === 'NotVisible') {
      // If there's a password error, log it for debugging
      if (passwordError) {
        console.error('Password error:', passwordError);
      }
      return false;
    }
    
    // For other policies, show content with appropriate restrictions
    return true;
  };
  
  // Check if watermark should be applied
  const shouldShowWatermark = () => {
    // If there's a password error and it mentions watermark, or policy is Watermark
    const showWatermarkDueToError = passwordError?.toLowerCase().includes('watermark') ?? false;
    return (!isAuthorized && passwordPolicy === 'Watermark') || showWatermarkDueToError;
  };

  // Detect if password entry should be shown
  const showingEnterPassword = () => {
    // Show buttons if user is authorized OR there's no password policy OR policy is NoPassword
    return !isAuthorized && passwordPolicy !== undefined && passwordPolicy !== 'NoPassword';
  };

  // Handle password submission - UPDATED to check login after password verification
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
    
    // Check if there's a pending save album operation
    if (pendingSaveAlbum) {
      // Reset the flag
      setPendingSaveAlbum(false);
      // Execute the save operation
      executeAlbumSave();
    }
  };
  
  // Function to prompt for password
  const promptForPassword = () => {
    setPasswordError(null); // Clear any previous errors
    setShowPasswordModal(true);
  };

  // Open fullscreen view for a media item
  const openFullscreenView = (index: number) => {
    // Don't open fullscreen view in selection mode
    if (isSelectionMode) return;
    
    // Check if authorized for NotVisible policy
    if (passwordPolicy === 'NotVisible' && !isAuthorized) {
      promptForPassword();
      return;
    }
    
    setFullscreenItem(index);
    // Pre-load the full resolution of the selected item
    handleLoadFullResolution(index);
    
    // Lock body scroll when fullscreen is open
    document.body.style.overflow = 'hidden';
  };
  
  // Close fullscreen view
  const closeFullscreenView = () => {
    setFullscreenItem(null);
    // Restore body scroll when fullscreen is closed
    document.body.style.overflow = '';
  };
  
  // Navigate to previous item in fullscreen view
  const goToPrevItem = () => {
    if (fullscreenItem !== null && fullscreenItem > 0) {
      setFullscreenItem(fullscreenItem - 1);
      handleLoadFullResolution(fullscreenItem - 1);
    }
  };
  
  // Navigate to next item in fullscreen view
  const goToNextItem = () => {
    if (fullscreenItem !== null && albumData && fullscreenItem < albumData.mediaItems.length - 1) {
      setFullscreenItem(fullscreenItem + 1);
      handleLoadFullResolution(fullscreenItem + 1);
    }
  };

  // Function to handle full resolution loading for an item
  const handleLoadFullResolution = (index: number) => {
    setLoadingFullResolution(prev => ({
      ...prev,
      [index]: true
    }));
  };
  
  // Function to mark full resolution as loaded
  const handleFullResolutionLoaded = (index: number) => {
    if (albumData) {
      const updatedMediaItems = [...albumData.mediaItems];
      updatedMediaItems[index] = {
        ...updatedMediaItems[index],
        loaded: true
      };
      
      setAlbumData({
        ...albumData,
        mediaItems: updatedMediaItems
      });
      
      // Clear loading state
      setLoadingFullResolution(prev => {
        const updated = { ...prev };
        delete updated[index];
        return updated;
      });
    }
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

  // Handler for successful login that reloads the page - UPDATED for password verification
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
        if (pendingSaveAlbum) {
          // Reset the flag
          setPendingSaveAlbum(false);
          // Execute the save operation
          executeAlbumSave();
          return;
        }
        
      } catch (err) {
        console.error("Failed to decode token", err);
      }
    }
  };

  // Handle file selection - Updated to show progress and ensure processing completes before navigation
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
        updateProgressTracker(selectedPhotos, setProgressTracker);
      }, 500);
      
      // Use the processFilesBeforeUploadingToS3 function - this processes the files and uploads them to S3 temp
      const processedPhotos = await processFilesBeforeUploadingToS3(files, username, updatePhotoStatus, log);
      
      // Clear the interval once processing is complete
      clearInterval(progressUpdateInterval);
      
      // Make sure we have a final progress update
      updateProgressTracker(processedPhotos, setProgressTracker);
      
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

  // Username validation
  const validateUsername = (username: string) => {
    const isValid = /^[a-zA-Z0-9-]+$/.test(username);
    console.log(`Username validation for '${username}': ${isValid}`);
    return isValid;
  };

  // Submit username
  const submitUsername = async (proposedName: string) => {
    console.log(`Submitting username: ${proposedName}`);
    setIsSubmittingUsername(true);
    setUsernameError("");

    const token = await checkLoginWithRefresh();
    if (!token) {
      setUsernameError(t('Authentication error. Please try again.'));
      setIsSubmittingUsername(false);
      return;
    }

    const mutation = `
      mutation MyMutation($savePublicProfileDisplayNameInput: SavePublicProfileDisplayNameInput) {
        changeMyAccountItem(savePublicProfileDisplayNameInput: $savePublicProfileDisplayNameInput) {
          ... on Profile {
            anyDisplayName
          }
        }
      }
    `;

    const variables = {
      savePublicProfileDisplayNameInput: {
        anyDisplayName: proposedName,
      },
    };

    try {
      const res = await fetch(AWS_PRIVATE_GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: mutation, variables }),
      });

      const json = await res.json();
      const newName = json?.data?.changeMyAccountItem?.anyDisplayName;

      if (newName) {
        handleSuccessfulUsernameUpdate(newName);
      } else {
        throw new Error("Username taken");
      }
    } catch (e) {
      console.error(`Error submitting username: ${e}`);
      setUsernameError(t('Username is already taken. Please try a different one.'));
      setShowAltButton(true);
      setIsSubmittingUsername(false);
    }
  };

  // Handle successful username update
  const handleSuccessfulUsernameUpdate = (newName: string) => {
    console.log(`Username successfully updated to: ${newName}`);
    localStorage.setItem("publicUsername", newName);
    setShowUsernamePrompt(false);
    
    // Automatically proceed with saving the album
    executeAlbumSave();
  };

  // Add random digits to username
  const appendRandomDigits = () => {
    const digits = Math.floor(100000 + Math.random() * 900000).toString();
    const modified = `${usernameInput}${digits}`;
    console.log(`Appending random digits to username: ${usernameInput} -> ${modified}`);
    setUsernameInput(modified);
    submitUsername(modified);
  };

  // Helper function to update save progress
  const updateSaveProgress = (
    progress: number, 
    textElement: HTMLElement,
    progressBar: HTMLElement,
    message: string,
    isError: boolean = false
  ) => {
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
      if (isError) {
        progressBar.style.backgroundColor = '#f44336';
      }
    }
    
    if (textElement) {
      textElement.textContent = message;
      if (isError) {
        textElement.style.color = '#f44336';
      }
    }
  };

  // Helper function to show detailed error with retry button
  const showDetailedError = (
    errorElement: HTMLElement, 
    errorMessage: string, 
    textElement: HTMLElement, 
    progressBar: HTMLElement
  ) => {
    if (progressBar) {
      progressBar.style.width = '100%';
      progressBar.style.backgroundColor = '#f44336';
    }
    
    if (textElement) {
      textElement.textContent = t('Error saving album');
      textElement.style.color = '#f44336';
    }
    
    // Show detailed error message
    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.style.display = 'block';
      
      // Add retry button
      const retryButton = document.createElement('button');
      retryButton.textContent = t('Retry');
      retryButton.style.marginTop = '15px';
      retryButton.style.padding = '8px 16px';
      retryButton.style.backgroundColor = '#2196f3';
      retryButton.style.color = 'white';
      retryButton.style.border = 'none';
      retryButton.style.borderRadius = '4px';
      retryButton.style.cursor = 'pointer';
      retryButton.onclick = function() {
        // Remove the modal and try again
        const modalElement = errorElement.closest('div[style*="position: fixed"]');
        if (modalElement && modalElement.parentNode) {
          modalElement.parentNode.removeChild(modalElement);
        }
        // Give a slight delay before retrying
        setTimeout(saveAlbumDirectly, 500);
      };
      
      // Add close button
      const closeButton = document.createElement('button');
      closeButton.textContent = t('Close');
      closeButton.style.marginTop = '15px';
      closeButton.style.marginLeft = '10px';
      closeButton.style.padding = '8px 16px';
      closeButton.style.backgroundColor = '#757575';
      closeButton.style.color = 'white';
      closeButton.style.border = 'none';
      closeButton.style.borderRadius = '4px';
      closeButton.style.cursor = 'pointer';
      closeButton.onclick = function() {
        const modalElement = errorElement.closest('div[style*="position: fixed"]');
        if (modalElement && modalElement.parentNode) {
          modalElement.parentNode.removeChild(modalElement);
        }
      };
      
      // Add buttons container
      const buttonsContainer = document.createElement('div');
      buttonsContainer.appendChild(retryButton);
      buttonsContainer.appendChild(closeButton);
      
      errorElement.parentNode?.appendChild(buttonsContainer);
    }
  };

  // Implementation for executing album save operation
  const executeAlbumSave = async () => {
    console.log("Starting album save execution");
    
    // Create a loading indicator for album saving
    const loadingModal = document.createElement('div');
    loadingModal.style.position = 'fixed';
    loadingModal.style.top = '0';
    loadingModal.style.left = '0';
    loadingModal.style.width = '100%';
    loadingModal.style.height = '100%';
    loadingModal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    loadingModal.style.display = 'flex';
    loadingModal.style.justifyContent = 'center';
    loadingModal.style.alignItems = 'center';
    loadingModal.style.zIndex = '2000';
    
    const loadingContent = document.createElement('div');
    loadingContent.style.backgroundColor = 'white';
    loadingContent.style.padding = '30px';
    loadingContent.style.borderRadius = '8px';
    loadingContent.style.textAlign = 'center';
    
    const loadingText = document.createElement('p');
    loadingText.id = 'saveProgressText';
    loadingText.textContent = t('Saving album...');
    
    const progressBarBg = document.createElement('div');
    progressBarBg.style.backgroundColor = '#f0f0f0';
    progressBarBg.style.borderRadius = '4px';
    progressBarBg.style.overflow = 'hidden';
    progressBarBg.style.height = '8px';
    progressBarBg.style.marginTop = '10px';
    
    const progressBar = document.createElement('div');
    progressBar.id = 'saveProgress';
    progressBar.style.backgroundColor = '#4caf50';
    progressBar.style.height = '100%';
    progressBar.style.width = '5%';
    progressBar.style.transition = 'width 0.3s ease';

    // Add error message element
    const errorText = document.createElement('p');
    errorText.id = 'saveErrorText';
    errorText.style.color = '#f44336';
    errorText.style.display = 'none';
    errorText.style.marginTop = '10px';
    errorText.style.fontSize = '14px';
    
    progressBarBg.appendChild(progressBar);
    loadingContent.appendChild(loadingText);
    loadingContent.appendChild(progressBarBg);
    loadingContent.appendChild(errorText);
    loadingModal.appendChild(loadingContent);
    document.body.appendChild(loadingModal);

    try {
      // Get current username from cognito token
      const token = await checkLoginWithRefresh();
      if (!token) {
        console.error("No token available for saving album");
        document.body.removeChild(loadingModal);
        return;
      }
      
      // Extract username from token
      const payload = JSON.parse(atob(token.split('.')[1]));
      const username = payload["cognito:username"];
      
      if (!username) {
        console.error("Missing username in token");
        showDetailedError(errorText, "Could not retrieve username from token", loadingText, progressBar);
        return;
      }
      
      // Validate folder ID
      if (!folderId) {
        console.error("No folder ID available");
        showDetailedError(errorText, "Folder ID is missing", loadingText, progressBar);
        return;
      }
      
      // Validate album data
      if (!albumData || !albumData.mediaItems) {
        console.error("No album data available");
        showDetailedError(errorText, "Album data is missing or incomplete", loadingText, progressBar);
        return;
      }

      if (albumData.mediaItems.length === 0) {
        console.error("No media items to save");
        showDetailedError(errorText, "No media items in album to save", loadingText, progressBar);
        return;
      }
      
      // Prepare timestamp and account ID
      const now = Math.floor(Date.now() / 1000);
      
      // Update progress - Step 1
      updateSaveProgress(30, loadingText, progressBar, t('Preparing album data...'));

      // Simplified folder position input - minimal requirements only
      const folderPositionInput = {
        currentTime: now,
        folderId: folderId,
        profileIds: [`${username}_____Public____Profile`],
        folderPositionSelectedTagInputs: [],
        folderPositionPoints: 1,
        // No need for acceptedFileReferenceIds or hiddenFileReferenceIds since we're using changeFiles0
      };
      
      console.log("Folder position input:", folderPositionInput);
      
      // Update progress - Step 2
      updateSaveProgress(50, loadingText, progressBar, t('Saving album...'));
      
      // Send GraphQL mutation to save album - simplified mutation
      const mutation = `
        mutation SaveAlbum(
          $folderPositionInputs: [FolderPositionInput!]
        ) {
          changeFiles(folderPositionInputs: $folderPositionInputs) {
            items { id }
          }
        }
      `;

      const variables = {
        folderPositionInputs: [folderPositionInput]
      };

      console.log("GraphQL mutation variables:", JSON.stringify(variables));
      
      // Send API request with robust error handling
      try {
        const response = await fetch(AWS_PRIVATE_GRAPHQL_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ query: mutation, variables }),
        });
        
        // Update progress - Step 3
        updateSaveProgress(80, loadingText, progressBar, t('Almost there...'));
        
        // Check for HTTP errors
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
        }
        
        const responseText = await response.text();
        
        // Validate response is JSON
        let json;
        try {
          json = JSON.parse(responseText);
          console.log("API response:", json);
        } catch (err) {
          const parseErrorMessage = err instanceof Error ? err.message : "Unknown JSON parse error";
          throw new Error(`Invalid JSON response: ${parseErrorMessage}`);
        }
        
        // Check for GraphQL errors
        if (json.errors && json.errors.length > 0) {
          const errorMessages = json.errors.map((err: { message?: string }) => {
            console.error("GraphQL error:", err);
            return err.message || "Unknown GraphQL error";
          }).join("; ");
          
          throw new Error(`GraphQL errors: ${errorMessages}`);
        }
        
        // Success!
        console.log("Album saved successfully");
        updateSaveProgress(100, loadingText, progressBar, t('Album saved successfully!'));
        
        // Set a flag in sessionStorage that we just completed an album
        sessionStorage.setItem('album_just_saved', 'true');
        
        // Slight delay before redirect for user to see success message
        setTimeout(() => {
          document.body.removeChild(loadingModal);
          window.location.href = "/my-albums.html";
        }, 2000);
      } catch (err) {
        const fetchErrorMessage = err instanceof Error ? err.message : "Unknown API error";
        console.error("Error in API request:", err);
        showDetailedError(errorText, fetchErrorMessage, loadingText, progressBar);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.error("Error saving album:", err);
      showDetailedError(errorText, errorMessage, loadingText, progressBar);
    }
  };

  // New implementation for saveAlbumDirectly that first checks login, username, and shows OTP if needed
  const saveAlbumDirectly = async () => {
    console.log("Starting direct album save");
    
    // Check if authorized for CannotBeSaved policy
    if (passwordPolicy === 'CannotBeSaved' && !isAuthorized) {
      // Set flag that we want to save after password verification
      setPendingSaveAlbum(true);
      promptForPassword();
      return;
    }
    
    // Check login first
    const token = await checkLoginWithoutRedirect();
    
    if (!token) {
      console.log("User not logged in, showing OTP login");
      // Set flag that we want to save after login
      setPendingSaveAlbum(true);
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
      setUsernameInput(publicUsername);
      setShowUsernamePrompt(true);
      return;
    }
    
    // User is logged in and has valid username, continue with album save
    executeAlbumSave();
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
    setSelectedItems(new Set());
  };
  
  // Toggle item selection
  const toggleItemSelection = (index: number, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent opening fullscreen view
    
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };
  
  // Cancel selection mode
  const cancelSelection = () => {
    setIsSelectionMode(false);
    setSelectedItems(new Set());
  };
  
  // Share the selected items - UPDATED to check login first
  const shareSelection = async () => {
    if (selectedItems.size === 0) {
      alert(t('Please select at least one item to share.'));
      return;
    }
    
    // Create a new sub-album with selected items
    if (albumData) {
      try {
        // Show loading indicator
        const loadingModal = document.createElement('div');
        loadingModal.style.position = 'fixed';
        loadingModal.style.top = '0';
        loadingModal.style.left = '0';
        loadingModal.style.width = '100%';
        loadingModal.style.height = '100%';
        loadingModal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        loadingModal.style.display = 'flex';
        loadingModal.style.justifyContent = 'center';
        loadingModal.style.alignItems = 'center';
        loadingModal.style.zIndex = '2000';
        
        const loadingContent = document.createElement('div');
        loadingContent.style.backgroundColor = 'white';
        loadingContent.style.padding = '30px';
        loadingContent.style.borderRadius = '8px';
        loadingContent.style.textAlign = 'center';
        
        const loadingText = document.createElement('p');
        loadingText.textContent = t('Creating sub-album...');
        
        loadingContent.appendChild(loadingText);
        loadingModal.appendChild(loadingContent);
        document.body.appendChild(loadingModal);
        
        // Extract fileIds of selected items
        const selectedFileIds = Array.from(selectedItems)
          .map(index => albumData.mediaItems[index]?.fileId)
          .filter(fileId => fileId) as string[];
        
        // Create data structure for sub-album selected files
        const subAlbumData = {
          isSubAlbum: true,
          selectedFileIds: selectedFileIds
        };
        
        // Save to localStorage
        localStorage.setItem(LOCAL_STORAGE_KEYS.SUB_ALBUM_DATA, JSON.stringify(subAlbumData));
        
        // Remove loading modal
        document.body.removeChild(loadingModal);
        
        // Redirect to save-album page without a folderId parameter
        window.location.href = '/save-album.html';
        
      } catch (error) {
        console.error('Error creating sub-album:', error);
        alert(t('There was an error creating the sub-album. Please try again.'));
      }
    }
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
          if (data.passwordPolicy === 'NoPassword' || data.hasFolderPosition) {
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
      
      <Header>
        <HeaderContent>
          <HeaderControlsWithFullWidth>
            {isSelectionMode ? (
              <div style={{ display: 'flex', gap: '16px' }}>
                <ActionButton 
                  onClick={shareSelection} 
                  disabled={selectedItems.size === 0}
                  style={{ 
                    opacity: selectedItems.size === 0 ? 0.5 : 1,
                    backgroundColor: selectedItems.size > 0 ? '#006adc' : undefined,
                    color: selectedItems.size > 0 ? 'white' : undefined,
                  }}
                >
                  {t('Create Sub-album')} ({selectedItems.size})
                </ActionButton>
                <ActionButton onClick={cancelSelection}>
                  {t('Cancel')}
                </ActionButton>
              </div>
            ) : (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', // This ensures maximum space between left and right groups
                width: '100%', 
                flexWrap: 'nowrap', 
                alignItems: 'center'
              }}>
                {/* Left side - Create Sub-album button */}
                <div style={{ flexShrink: 0 }}> 
                {!showingEnterPassword() && (
                  <CreateAlbumButton onClick={createSubalbum}>
                    {t('Create Sub-album')}
                  </CreateAlbumButton>
                )}
                </div>
                
                {/* Right side - actions group */}
                <div style={{ 
                  marginLeft: 'auto', // Push all the way to the right
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  {/* Show password button */}
                  {!isSelectionMode && 
                  !isAuthorized && 
                  passwordPolicy && 
                  passwordPolicy !== 'NoPassword' && (
                    <ActionButton onClick={promptForPassword}>
                      {t('Enter Password')}
                    </ActionButton>
                  )}
                  
                  {/* Show the responsive header for other buttons */}
                  {!isSelectionMode && !(
                    !isAuthorized && passwordPolicy && passwordPolicy !== 'NoPassword'
                  ) && (
                    <ResponsiveHeader 
                      addPhotosToAlbum={addPhotosToAlbum}
                      saveAlbum={saveAlbumDirectly} // Use the direct save method instead
                      downloadPhotos={handleDownloadPhotos}
                      promptForPassword={promptForPassword}
                      showingEnterPassword={showingEnterPassword()}
                      passwordPolicy={passwordPolicy}
                      usingFolderInviteGrantsRightToAddItems={albumData?.usingFolderInviteGrantsRightToAddItems}
                      t={t} 
                    />
                  )}
                </div>
              </div>
            )}
          </HeaderControlsWithFullWidth>
          <RowSelectorContainer>
            <RowSelectorLabel htmlFor="columns" id="columns-label">
              <strong>{t('Columns:')}</strong>
            </RowSelectorLabel>
            <RowSelectorSelect 
              id="columns" 
              value={columns} 
              onChange={(e) => changeColumns(e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </RowSelectorSelect>
          </RowSelectorContainer>
        </HeaderContent>
      </Header>

      <MediaContainer id="media-container">
        {/* Add a proper container for the "Select Photos" button when localStorage flag is set */}
        {showSelectPhotosButton && albumData?.usingFolderInviteGrantsRightToAddItems && (
          <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px',
            marginTop: '10px'
          }}>
            <button
              onClick={openFilePicker}
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '12px 20px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '16px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <span>{t('Select Photos To Add To Album')}</span>
            </button>
          </div>
        )}
        
        {/* New Contact List Box - showing contacts that user can share memories with */}
        {albumData && Object.keys(albumData.contacts).length > 0 && (
          <div style={{
            width: '100%',
            backgroundColor: '#f0f7ff',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            border: '1px solid #d0e1f9'
          }}>
            <p style={{
              margin: '0',
              fontSize: '15px',
              color: '#333',
              textAlign: 'left'
            }}>
              {t('Click "Save" to create a memory with ')}
              <strong>
                {Object.values(albumData.contacts)
                  .filter(contact => !contact.toString().startsWith('Profile-'))
                  .join(', ')}
              </strong>
              {t(' that you can filter for later')}
            </p>
          </div>
        )}
        
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
        {!isAuthorized && passwordPolicy === 'NotVisible' && (
          <div style={{ 
            padding: '20px', 
            backgroundColor: '#f3f4f6', 
            borderRadius: '8px',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            <h3>{t('This album is password protected')}</h3>
            <p>{t('Please enter the password to view the contents')}</p>
            {passwordError && (
              <div style={{ 
                color: "#d32f2f", 
                fontSize: "14px", 
                margin: "10px 0",
                padding: "5px",
                backgroundColor: "rgba(211, 47, 47, 0.1)",
                borderRadius: "4px"
              }}>
                {passwordError}
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <ActionButton onClick={promptForPassword}>
                {t('Enter Password')}
              </ActionButton>
            </div>
          </div>
        )}
        
        {isSelectionMode && (
          <SelectionBanner>
            <p>{t('Select photos and videos to create a sub-album to share')}</p>
          </SelectionBanner>
        )}
      
        {albumData?.folderName && albumData.folderName !== t('Photos') && albumData.folderName.trim() !== "" && (
          <AlbumTitle id="album-title">
            <AlbumTitleStrong>{albumData.folderName}</AlbumTitleStrong>
          </AlbumTitle>
        )}
        
        {albumData?.folderDescription && albumData.folderDescription.trim() !== "" ? (
          <DescriptionBlock id="description-container">
            <DescriptionText>{albumData.folderDescription}</DescriptionText>
          </DescriptionBlock>
        ) : null}
        
        <MediaGrid id="media-grid" columns={columns}>
          {isLoading ? (
            <LoadingMessage id="loading-message">
              {t('Loading album content...')}
            </LoadingMessage>
          ) : error ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : !shouldShowContent() ? (
            // Empty state for protected content
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 0' }}>
              <ErrorMessage>{t('Enter the password to view album contents')}</ErrorMessage>
            </div>
          ) : albumData && albumData.mediaItems.length === 0 ? (
            <ErrorMessage>{t('No media found in this album')}</ErrorMessage>
          ) : (
            albumData?.mediaItems.map((item, index) => {
              // Restore the ownerName extraction from the contacts map
              const ownerName = item.ownerId && albumData.contacts[item.ownerId] 
                ? albumData.contacts[item.ownerId] 
                : '';
              
              const isSelected = selectedItems.has(index);
              const showWatermark = shouldShowWatermark();
              
              return (
                <div 
                  key={index} 
                  style={{ 
                    position: 'relative',
                    border: isSelectionMode && isSelected ? '3px solid #006adc' : undefined,
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: isSelectionMode && isSelected ? '0 0 0 3px rgba(0, 106, 220, 0.3)' : undefined
                  }}
                  onClick={(e: React.MouseEvent) => isSelectionMode ? 
                    toggleItemSelection(index, e) : 
                    openFullscreenView(index)}
                >
                  {isSelectionMode && (
                    <SelectionCheckbox 
                      isSelected={isSelected}
                      onClick={(e: React.MouseEvent) => toggleItemSelection(index, e)}
                    >
                      {isSelected && (
                        <Checkmark>✓</Checkmark>
                      )}
                    </SelectionCheckbox>
                  )}
                  
                  {item.type === 'image' ? (
                    <LazyImage 
                      src={item.url}
                      thumbnailSrc={item.thumbnailUrl}
                      alt={`Album image ${index + 1}`}
                      loadFullResolution={loadingFullResolution[index] || false}
                      onFullResolutionLoaded={() => handleFullResolutionLoaded(index)}
                      onClick={() => isSelectionMode ? undefined : openFullscreenView(index)}
                      showWatermark={showWatermark}
                    />
                  ) : (
                    <VideoThumbnail 
                      thumbnailUrl={item.thumbnailUrl || ''} 
                      videoUrl={item.url} 
                      duration={item.duration || '0:00'} 
                      index={index}
                      onFullResolutionLoaded={() => handleFullResolutionLoaded(index)}
                      onClick={() => isSelectionMode ? undefined : openFullscreenView(index)}
                      showWatermark={showWatermark}
                    />
                  )}
                  
                  {/* Display owner badge if owner name exists */}
                  {ownerName && (
                    <OwnerBadge>{ownerName}</OwnerBadge>
                  )}
                </div>
              );
            })
          )}
        </MediaGrid>
      </MediaContainer>
      
      {/* Password Modal with error display */}
      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => {
          setShowPasswordModal(false);
          setPasswordError(null); // Clear error when closing modal
          // If we were trying to save the album but canceled password entry, clear the flag
          if (pendingSaveAlbum) {
            setPendingSaveAlbum(false);
          }
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
          // If we were trying to save the album but canceled login, clear the flag
          if (pendingSaveAlbum) {
            setPendingSaveAlbum(false);
          }
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
          onNext={goToNextItem}
          hasNext={fullscreenItem < albumData.mediaItems.length - 1}
          hasPrev={fullscreenItem > 0}
          albumName={albumData.folderName}
          showWatermark={shouldShowWatermark()}
        />
      )}
      
      {/* Username Prompt Modal */}
      {showUsernamePrompt && (
        <ModalOverlay>
          <UsernameModal isRTL={getLanguageDirection(language) === "rtl"}>
            <UsernameTitle>
              {t('Enter Username')}
            </UsernameTitle>
            <UsernameDescription>
              {t('Username should contain only letters, numbers and hyphens. Example: john-doe2')}
            </UsernameDescription>
            <UsernameInput
              value={usernameInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsernameInput(e.target.value)}
              isRTL={getLanguageDirection(language) === "rtl"}
            />
            {usernameError && <UsernameError>{usernameError}</UsernameError>}
            <UsernameButton
              disabled={isSubmittingUsername}
              onClick={() => {
                if (!validateUsername(usernameInput)) {
                  setUsernameError(t('Username must contain only letters, numbers, and hyphens.'));
                  return;
                }
                submitUsername(usernameInput);
              }}
            >
              {t('Select Username')}
            </UsernameButton>
            {showAltButton && (
              <UsernameAltButton
                disabled={isSubmittingUsername}
                onClick={appendRandomDigits}
              >
                {t('Add Random Digits to Username')}
              </UsernameAltButton>
            )}
          </UsernameModal>
        </ModalOverlay>
      )}
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