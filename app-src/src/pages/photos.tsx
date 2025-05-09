import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactDOM from "react-dom/client";
import { I18nProvider, useTranslation } from "@/lib/i18n/react";
import { getLanguageDirection } from "@/lib/i18n";
import { checkLoginWithoutRedirect, checkLoginWithRefresh } from "@/lib/utils";

// Import types and utilities
import { AlbumData, PasswordPolicyEnum, SelectedPhoto, ProgressTracker } from "@/lib/types";
import { getIdFromUrl, formatUUID, generateUUID, getTargetItemIdentifier } from "@/lib/utils";
import { fetchFolder } from "@/lib/apiService";
import { downloadPhotos } from "@/lib/fileOperations";

// Import upload utilities
import { 
  createLogger, 
  createPhotoStatusUpdater, 
  updateProgressTracker,
  processFilesBeforeUploadingToS3
} from "@/lib/file-upload-utils";

// Add the AWS_PRIVATE_GRAPHQL_ENDPOINT import
import { AWS_PRIVATE_GRAPHQL_ENDPOINT, LOCAL_STORAGE_KEYS } from "@/lib/config";
import { useUsernameManagement } from "@/lib/customHooks"

// Import styled components
import { 
  GlobalStyle, 
  Body, 
  MediaContainer, 
  SelectionBanner,
  ActionButton
} from "@/styles/photos-styled-components";

// Import components
import { FullscreenMediaViewer } from "@/components/MediaComponents";
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
// Utility functions
// ============================

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
    textElement.textContent = 'Error registering album';
    textElement.style.color = '#f44336';
  }
  
  // Show detailed error message
  if (errorElement) {
    errorElement.textContent = errorMessage;
    errorElement.style.display = 'block';
    
    // Add retry button
    const retryButton = document.createElement('button');
    retryButton.textContent = 'Retry';
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
      setTimeout(() => {
        // This is a hack - the real saveAlbumDirectly will be provided by closure
        window.location.reload();
      }, 500);
    };
    
    // Add close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
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

// Hook for file upload management
const useFileUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedPhotos, setSelectedPhotos] = useState<SelectedPhoto[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [fileProcessingComplete, setFileProcessingComplete] = useState(false);
  const [progressTracker, setProgressTracker] = useState<ProgressTracker>({
    totalFiles: 0,
    filesComplete: 0,
    filesUploading: 0,
    filesProcessing: 0,
    filesWithError: 0,
    overallProgress: 0
  });

  const log = createLogger(() => {
    // Empty function since we don't need to display debug messages in UI
  });

  // Update progress tracker when selectedPhotos changes
  useEffect(() => {
    updateProgressTracker(selectedPhotos, setProgressTracker);
  }, [selectedPhotos]);

  return {
    fileInputRef,
    selectedPhotos,
    setSelectedPhotos,
    isUploading,
    setIsUploading,
    fileProcessingComplete,
    setFileProcessingComplete,
    progressTracker,
    setProgressTracker,
    log
  };
};

// Hook for fullscreen view management
const useFullscreenView = () => {
  const [fullscreenItem, setFullscreenItem] = useState<number | null>(null);
  const [loadingFullResolution, setLoadingFullResolution] = useState<Record<number, boolean>>({});

  const openFullscreenView = useCallback((index: number) => {
    setFullscreenItem(index);
    // Pre-load the full resolution of the selected item
    setLoadingFullResolution(prev => ({
      ...prev,
      [index]: true
    }));
    
    // Lock body scroll when fullscreen is open
    document.body.style.overflow = 'hidden';
  }, []);
  
  const closeFullscreenView = useCallback(() => {
    setFullscreenItem(null);
    // Restore body scroll when fullscreen is closed
    document.body.style.overflow = '';
  }, []);
  
  const goToPrevItem = useCallback(() => {
    if (fullscreenItem !== null && fullscreenItem > 0) {
      setFullscreenItem(fullscreenItem - 1);
      setLoadingFullResolution(prev => ({
        ...prev,
        [fullscreenItem - 1]: true
      }));
    }
  }, [fullscreenItem]);
  
  const goToNextItem = useCallback((totalItems: number) => {
    if (fullscreenItem !== null && fullscreenItem < totalItems - 1) {
      setFullscreenItem(fullscreenItem + 1);
      setLoadingFullResolution(prev => ({
        ...prev,
        [fullscreenItem + 1]: true
      }));
    }
  }, [fullscreenItem]);

  const handleFullResolutionLoaded = useCallback((index: number, albumData: AlbumData, setAlbumData: React.Dispatch<React.SetStateAction<AlbumData | null>>) => {
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
  }, []);

  return {
    fullscreenItem,
    setFullscreenItem,
    loadingFullResolution,
    setLoadingFullResolution,
    openFullscreenView,
    closeFullscreenView,
    goToPrevItem,
    goToNextItem,
    handleFullResolutionLoaded
  };
};

// Hook for selection mode management
const useSelectionMode = () => {
  const [isSelectionMode, setIsSelectionMode] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

  const toggleItemSelection = useCallback((index: number, event: React.MouseEvent) => {
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
  }, []);
  
  const cancelSelection = useCallback(() => {
    setIsSelectionMode(false);
    setSelectedItems(new Set());
  }, []);

  return {
    isSelectionMode,
    setIsSelectionMode,
    selectedItems,
    setSelectedItems,
    toggleItemSelection,
    cancelSelection
  };
};

// Hook for password protection management
const usePasswordProtection = () => {
  const [passwordPolicy, setPasswordPolicy] = useState<PasswordPolicyEnum | undefined>(undefined);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordVerified, setPasswordVerified] = useState<boolean>(false);
  // const [pendingSaveAlbum, setPendingSaveAlbum] = useState(false);

  const shouldShowContent = useCallback(() => {
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
  }, [passwordPolicy, isAuthorized, passwordError]);
  
  const shouldShowWatermark = useCallback(() => {
    // If there's a password error and it mentions watermark, or policy is Watermark
    const showWatermarkDueToError = passwordError?.toLowerCase().includes('watermark') ?? false;
    return (!isAuthorized && passwordPolicy === 'Watermark') || showWatermarkDueToError;
  }, [isAuthorized, passwordPolicy, passwordError]);

  const showingEnterPassword = useCallback(() => {
    // Show buttons if user is authorized OR there's no password policy OR policy is NoPassword
    return !isAuthorized && passwordPolicy !== undefined && passwordPolicy !== 'NoPassword';
  }, [isAuthorized, passwordPolicy]);

  const promptForPassword = useCallback(() => {
    setPasswordError(null); // Clear any previous errors
    setShowPasswordModal(true);
  }, []);

  return {
    passwordPolicy,
    setPasswordPolicy,
    isAuthorized,
    setIsAuthorized,
    showPasswordModal,
    setShowPasswordModal,
    passwordError,
    setPasswordError,
    passwordVerified,
    setPasswordVerified,
    // pendingSaveAlbum,
    // setPendingSaveAlbum,
    shouldShowContent,
    shouldShowWatermark,
    showingEnterPassword,
    promptForPassword
  };
};

// Hook for handling share actions similar to FooterSection
const useShareActions = (albumData: AlbumData | null, folderId: string | null, cognitoUsername: string | null, t: (key: string) => string) => {
  const [showingCopyLinkAlert, setShowingCopyLinkAlert] = useState<boolean>(false);
  const [showingCopiedLinkAlert, setShowingCopiedLinkAlert] = useState<boolean>(false);
  const [isOnPublicProfile, setIsOnPublicProfile] = useState<boolean>(false);
  const [localProfileIds, setLocalProfileIds] = useState<string[]>([]);
  
  // Update when album data changes
  useEffect(() => {
    if (albumData && albumData.profileIds && cognitoUsername) {
      const publicProfileId = `${cognitoUsername}_____Public____Profile`;
      setLocalProfileIds(albumData.profileIds);
      setIsOnPublicProfile(albumData.profileIds.includes(publicProfileId));
    }
  }, [albumData, cognitoUsername]);
  
  // Generate the invite link based on folder id
  const generateInviteLink = useCallback(() => {
    if (!folderId) return '';
    let formattedTargetItemIdentifier = getTargetItemIdentifier(folderId).replace(/-/g, '');
    return `https://6180.io/photos.html?id=${formattedTargetItemIdentifier}`;
  }, [folderId]);
  
  // Handle copy function
  const handleCopy = useCallback(() => {
    const inviteLink = generateInviteLink();
    navigator.clipboard.writeText(inviteLink)
      .then(() => {
        setShowingCopyLinkAlert(false);
        setShowingCopiedLinkAlert(true);
      })
      .catch(err => {
        console.error("Failed to copy link:", err);
        alert(t('Failed to copy link'));
      });
  }, [generateInviteLink, t]);
  
  // Handle public profile toggle
  const handlePublicProfileToggle = useCallback(async () => {
    if (!cognitoUsername || !folderId) {
      alert(t('You must be logged in to perform this action'));
      return;
    }
    
    try {
      // Get a fresh token
      const token = await checkLoginWithRefresh();
      
      if (!token) {
        console.error("Authentication failed");
        return;
      }
      
      // Determine the new profileIds array
      const publicProfileId = `${cognitoUsername}_____Public____Profile`;
      const newProfileIds = [...localProfileIds];
      
      if (isOnPublicProfile) {
        // Remove from public profile
        const index = newProfileIds.indexOf(publicProfileId);
        if (index > -1) {
          newProfileIds.splice(index, 1);
        }
      } else {
        // Add to public profile
        newProfileIds.push(publicProfileId);
      }
      
      // Prepare the mutation query
      const toggleVisibilityQuery = `
        mutation ChangeAlbumVisibility($folderPositionChangeProfileIdsInput: FolderPositionChangeProfileIdsInput!) {
          changeFiles(folderPositionChangeProfileIdsInput: $folderPositionChangeProfileIdsInput) {
            items {
              ... on FolderPosition {
                id
                profileIds
              }
            }
          }
        }
      `;
      
      // Call the API
      const res = await fetch(AWS_PRIVATE_GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          query: toggleVisibilityQuery, 
          variables: { 
            folderPositionChangeProfileIdsInput: {
              folderId: folderId,
              profileIds: newProfileIds
            }
          } 
        }),
      });
      
      const json = await res.json();
      
      if (json.errors) {
        throw new Error(json.errors[0]?.message || "Unknown error");
      }
      
      // Update local state
      const updatedItems = json?.data?.changeFiles?.items || [];
      const updatedItem = updatedItems.find((item: any) => item.folderPositionId === albumData?.folderPositionId);
      
      if (updatedItem && updatedItem.profileIds) {
        setLocalProfileIds(updatedItem.profileIds);
        setIsOnPublicProfile(updatedItem.profileIds.includes(publicProfileId));
        console.log("Album visibility updated successfully");
      }
    } catch (err) {
      console.error("Failed to toggle album visibility:", err);
      alert(t('Failed to update album visibility. Please try again.'));
    }
  }, [cognitoUsername, folderId, localProfileIds, isOnPublicProfile, albumData, t]);
  
  return {
    showingCopyLinkAlert,
    setShowingCopyLinkAlert,
    showingCopiedLinkAlert,
    setShowingCopiedLinkAlert,
    isOnPublicProfile,
    handleCopy,
    handlePublicProfileToggle,
    generateInviteLink
  };
};

// ============================
// Sub-components
// ============================

// Select Photos Button Component
const SelectPhotosButton: React.FC<{
  showSelectPhotosButton: boolean;
  albumData: AlbumData | null;
  openFilePicker: () => void;
  t: (key: string) => string;
}> = ({ showSelectPhotosButton, albumData, openFilePicker, t }) => {
  if (!showSelectPhotosButton || !albumData?.usingFolderInviteGrantsRightToAddItems) return null;
  
  return (
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
  );
};

// Password Protection Message Component
const PasswordProtectionMessage: React.FC<{
  isAuthorized: boolean;
  passwordPolicy: PasswordPolicyEnum | undefined;
  passwordError: string | null;
  promptForPassword: () => void;
  t: (key: string) => string;
}> = ({ isAuthorized, passwordPolicy, passwordError, promptForPassword, t }) => {
  if (isAuthorized || passwordPolicy !== 'NotVisible') return null;
  
  return (
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
  );
};

// Selection Banner Component
const SelectionModeBanner: React.FC<{
  isSelectionMode: boolean;
  t: (key: string) => string;
}> = ({ isSelectionMode, t }) => {
  if (!isSelectionMode) return null;
  
  return (
    <SelectionBanner>
      <p>{t('Select photos and videos to create a sub-album to share')}</p>
    </SelectionBanner>
  );
};

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
    executeAlbumSave();
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
        executeAlbumSave();
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

  // Implementation for executing album save operation
  const executeAlbumSave = async () => {
    console.log("Starting album registration");
    
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
    loadingText.textContent = t('Registering album...');
    
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
        console.error("No token available for registering album");
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
        profileIds: [`Only Me_____Only Me____Profile`],
        folderPositionSelectedTagInputs: [],
        folderPositionPoints: 1,
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
        console.log("Album registered successfully");
        updateSaveProgress(100, loadingText, progressBar, t('Album registered successfully!'));
        
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
      console.error("Error registering album:", err);
      showDetailedError(errorText, errorMessage, loadingText, progressBar);
    }
  };

  // New implementation for saveAlbumDirectly that first checks login, username, and shows OTP if needed
  const saveAlbumDirectly = async () => {
    console.log("Starting album registration");
    
    // Check if authorized for CannotBeSaved policy
    if (passwordPolicy === 'CannotBeSaved' && !isAuthorized) {
      // Set flag that we want to save after password verification
      // setPendingSaveAlbum(true);
      promptForPassword();
      return;
    }
    
    // Check login first
    const token = await checkLoginWithoutRedirect();
    
    if (!token) {
      console.log("User not logged in, showing OTP login");
      // Set flag that we want to save after login
      // setPendingSaveAlbum(true);
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
    selectedItems.clear();
  };
  
  // Share the selected items - modified version to create SelectedPhoto objects
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
        
        // Extract fileIds and create selected photos array of selected items
        const selectedFileIds: string[] = [];
        const selectedPhotosArray: SelectedPhoto[] = [];
        
        // Loop through each selected item and create a SelectedPhoto object for each
        Array.from(selectedItems).forEach(index => {
          const mediaItem = albumData.mediaItems[index];
          if (mediaItem && mediaItem.fileId) {
            // Add to fileIds array
            selectedFileIds.push(mediaItem.fileId);
            
            // Create a SelectedPhoto object
            const newSelectedPhoto: SelectedPhoto = {
              fileName: mediaItem.fileId.split('_____')[1]?.split('____')[0] || `file-${index}`,
              s3PreviewUrl: mediaItem.type === 'video' ? (mediaItem.thumbnailUrl || mediaItem.url) : mediaItem.url,
              type: mediaItem.type === 'video' ? 'video' : 'image',
              size: 0, // We don't have this info from the album view
              status: 'complete', // Mark as complete since these are existing files
              progress: 100,
              fileId: mediaItem.fileId, // Store the original fileId
              // If video, include the duration
              duration: mediaItem.type === 'video' && mediaItem.duration ? 
                parseFloat(mediaItem.duration.split(':').reduce((acc, time) => (60 * acc) + parseFloat(time), 0).toString()) : 
                null
            };
            
            selectedPhotosArray.push(newSelectedPhoto);
          }
        });
        
        // Create data structure for sub-album selected files
        const subAlbumData = {
          isSubAlbum: true,
          selectedFileIds: selectedFileIds,
          selectedPhotos: selectedPhotosArray
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
          // If we were trying to save the album but canceled login, clear the flag
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
          executeAlbumSave();
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