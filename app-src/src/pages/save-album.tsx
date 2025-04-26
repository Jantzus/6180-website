import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import styled, { createGlobalStyle, css } from "styled-components";

import { GRAPHQL_ENDPOINT, STORAGE_KEYS } from "@/lib/config";
import { 
  ProgressTracker,
  UploadStatus,
  SelectedPhoto,
  ProtectionOption
} from "@/lib/types";

import { generateUUID } from "@/lib/utils";
import { checkLoginOrRedirect } from "@/lib/utils";
import { I18nProvider, useTranslation } from "@/lib/i18n/react";
import { getLanguageDirection } from "@/lib/i18n/translations";
import { PasswordDialog } from "@/components/PasswordDialog";
import { LogoutButton } from "@/components/LogoutButton";

// Import utility functions from file-upload-utils
import { 
  createLogger,
  createPhotoStatusUpdater,
  updateProgressTracker,
  processFiles,
  moveFilesToPublic,
  clearAlbumData,
  s3
} from "@/lib/file-upload-utils";

// Password Policy Enum matching the GraphQL API schema
enum PasswordPolicyEnum {
  NotVisible = "NotVisible",
  Watermark = "Watermark",
  CannotBeSaved = "CannotBeSaved",
  NoPassword = "NoPassword"
}

// GraphQL query for fetching folder details
const FETCH_FOLDER_QUERY = `
  query FetchFolders($folderIds: [String!]!) {
    fetchFolders(folderIds: $folderIds) {
      items {
        folderName
        folderDescription
        folderPassword {
          password
          policy
        }
        fileReferencesPage {
          items {
            file {
              ownerContactId
              dataKey
              thumbnailDataKey
              durationInSeconds
            }
          }
        }
        contactsUsingInvite {
          items {
            id
            item {
              ... on Persona {
                publicDisplayName
              }
            }
          }
        }
        folderPosition {
          id
        }          
      }
    }
  }
`;

// ========== Styled Components ==========

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }
`;

const directionalStyles = (isRTL: boolean) => css`
  direction: ${isRTL ? 'rtl' : 'ltr'};
`;

interface DirectionalProps {
  isRTL: boolean;
}

const AppContainer = styled.div<DirectionalProps>`
  padding: 40px 20px;
  background-color: #f9fafb;
  min-height: 100vh;
  ${props => directionalStyles(props.isRTL)}
`;

const ContentContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

// Header Components
const HeaderSection = styled.div`
  margin-bottom: 20px;
`;

const BackLinkContainer = styled.div`
  margin-bottom: 12px;
`;

const BackLink = styled.a`
  font-size: 16px;
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Username = styled.div`
  font-size: 16px;
  color: #666;
`;

// Progress Tracking Components
const ProgressContainer = styled.div`
  margin-bottom: 24px;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const ProgressTitle = styled.h3`
  font-size: 18px;
  margin: 0 0 12px 0;
`;

const OverallProgress = styled.div`
  margin-bottom: 12px;
`;

const ProgressStats = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 6px;
`;

const ProgressBarBg = styled.div`
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`;

interface ProgressBarProps {
  progress: number;
}

const ProgressBar = styled.div<ProgressBarProps>`
  height: 100%;
  background-color: #4caf50;
  border-radius: 4px;
  transition: width 0.3s ease;
  width: ${props => props.progress * 100}%;
`;

const ProgressDetails = styled.div`
  display: flex;
  gap: 12px;
  font-size: 14px;
  color: #666;
`;

interface ProgressItemProps {
  isError?: boolean;
}

const ProgressItem = styled.div<ProgressItemProps>`
  color: ${props => props.isError ? '#e53935' : 'inherit'};
`;

// Saving Progress Components
const SavingProgressContainer = styled.div`
  margin-bottom: 24px;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const SavingProgressTitle = styled.h3`
  font-size: 18px;
  margin: 0 0 12px 0;
`;

const SavingProgressText = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
`;

const SavingProgressBarBg = styled.div`
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`;

const SavingProgressBar = styled.div`
  height: 100%;
  background-color: #2196f3;
  border-radius: 4px;
  transition: width 0.3s ease;
`;

// Photo Grid Components
const SelectedCount = styled.p`
  font-size: 16px;
  margin-bottom: 16px;
  color: #333;
`;

const PhotoGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 32px;
`;

const PhotoCard = styled.div`
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

const StatusIndicator = styled.div<StatusIndicatorProps>`
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

const MediaPreview = styled.div`
  position: relative;
  margin-bottom: 8px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MediaItem = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 6px;
`;

const VideoItem = styled.video`
  max-width: 100%;
  max-height: 100%;
  border-radius: 6px;
`;

const UploadProgressBarBg = styled.div`
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

const UploadProgressBar = styled.div<UploadProgressBarProps>`
  height: 100%;
  background-color: ${props => props.status === 'processing' ? '#ff9800' : '#2196f3'};
  transition: width 0.3s ease;
  width: ${props => props.progress * 100}%;
`;

const FileInfo = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 6px;
`;

const ErrorMessage = styled.div`
  font-size: 12px;
  color: #e53935;
  margin-bottom: 6px;
`;

const RemoveButton = styled.button<ButtonProps>`
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
const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`;

interface ButtonProps {
  disabled?: boolean;
}

const Button = styled.button<ButtonProps>`
  padding: 14px 28px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.6 : 1};
`;

const PrimaryButton = styled(Button)`
  background-color: #007bff;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
`;

const SecondaryButton = styled(Button)`
  background-color: #8c8c8c;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
`;

interface PasswordButtonProps extends ButtonProps {
  passwordSet: boolean;
}

const PasswordButton = styled(SecondaryButton)<PasswordButtonProps>`
  color: ${props => props.passwordSet ? '#000000' : 'white'};
  font-weight: ${props => props.passwordSet ? 'bold' : 'normal'};
`;

// Folder Details Components
const FolderDetails = styled.div`
  margin-top: 12px;
  margin-bottom: 12px;
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-sizing: border-box;
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  resize: vertical;
`;

// Username Modal Components
const ModalOverlay = styled.div`
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

const UsernameModal = styled.div<DirectionalProps>`
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  ${props => directionalStyles(props.isRTL)}
`;

const UsernameTitle = styled.p`
  font-size: 16px;
  margin-bottom: 12px;
`;

const UsernameDescription = styled.p`
  font-size: 14px;
  margin-bottom: 16px;
  color: #666;
`;

const UsernameInput = styled.input<DirectionalProps>`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
  text-align: ${props => props.isRTL ? 'right' : 'left'};
`;

const UsernameError = styled.div`
  color: #e53935;
  margin-bottom: 12px;
`;

const UsernameButton = styled.button<ButtonProps>`
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

const UsernameAltButton = styled.button<ButtonProps>`
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
const DebugContainer = styled.div`
  margin-top: 24px;
  padding: 16px;
  background-color: #f0f0f0;
  border-radius: 8px;
`;

const DebugTitle = styled.h3`
  margin: 0 0 12px 0;
  font-size: 16px;
`;

const DebugMessages = styled.pre`
  margin: 0;
  font-size: 12px;
  white-space: pre-wrap;
  max-height: 200px;
  overflow-y: auto;
`;

const DebugMessage = styled.div`
  margin-bottom: 4px;
`;

// File Input
const HiddenFileInput = styled.input`
  display: none;
`;

// ========== Main Component ==========

const SaveAlbum = () => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";

  // Core state
  const [folderId, setFolderId] = useState<string | null>(null);
  const [selectedPhotos, setSelectedPhotos] = useState<SelectedPhoto[]>([]);
  const [debugMessages, setDebugMessages] = useState<string[]>([]);
  
  // User state
  const [publicUsername, setPublicUsername] = useState<string | null>(null);
  const [cognitoUsername, setCognitoUsername] = useState<string | null>(null);
  
  // Username modal state
  const [showUsernamePrompt, setShowUsernamePrompt] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [showAltButton, setShowAltButton] = useState(false);
  const [isSubmittingUsername, setIsSubmittingUsername] = useState(false);
  
  // Progress tracking state
  const [progressTracker, setProgressTracker] = useState<ProgressTracker>({
    totalFiles: 0,
    filesComplete: 0,
    filesUploading: 0,
    filesProcessing: 0,
    filesWithError: 0,
    overallProgress: 0
  });
  const [isSavingAlbum, setIsSavingAlbum] = useState(false);
  
  // Album details state
  const [folderName, setFolderName] = useState("");
  const [folderDescription, setFolderDescription] = useState("");
  const [showFolderDetails, setShowFolderDetails] = useState(false);
  
  // Password protection state
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [passwordProtectionOption, setPasswordProtectionOption] = useState<ProtectionOption>('noPassword');
  const [albumPassword, setAlbumPassword] = useState("");

  // Create utility instances
  const log = createLogger(setDebugMessages);
  const updatePhotoStatus = createPhotoStatusUpdater(setSelectedPhotos);

  // ---------- EFFECTS ----------

  // Initialize component
  useEffect(() => {
    initializeComponent();
  }, []);

  // Save selected photos to localStorage
  useEffect(() => {
    if (selectedPhotos.length > 0) {
      localStorage.setItem(STORAGE_KEYS.SELECTED_PHOTOS, JSON.stringify(selectedPhotos));
    }
  }, [selectedPhotos]);

  // Update progress tracker
  useEffect(() => {
    updateProgressTracker(selectedPhotos, setProgressTracker);
  }, [selectedPhotos]);

  // ---------- INITIALIZATION ----------

  const initializeComponent = async () => {
    setIsSavingAlbum(false);
    
    try {
      const token = checkLoginOrRedirect();
      if (!token) {
        return;
      }
      
      // Extract username directly here instead of in a separate function
      try {
        // Get public username
        const savedUsername = localStorage.getItem("publicUsername");
        setPublicUsername(savedUsername || null);
        
        // Extract Cognito username directly from token
        const payload = JSON.parse(atob(token.split('.')[1]));
        const username = payload["cognito:username"];
        
        if (username) {
          // Set the username in state
          setCognitoUsername(username);
          
          // Now that we have the username, we can proceed with folder initialization
          await initializeFolderIdWithUsername(username);
        }
      } catch (err) {
        console.error("User data initialization error:", err);
      }
      
      restorePhotosFromStorage();
      testS3Connection();
    } catch (initErr) {
      console.error("Initialization error:", initErr);
    }
  };

  // Adapted initializeFolderId that takes username directly as parameter
  const initializeFolderIdWithUsername = async (username: string) => {
    try {
      // Get folderId from URL query parameter
      const params = new URLSearchParams(window.location.search);
      const id = params.get("folderId");
      
      if (id) {
        setFolderId(id);
        
        // Always show folder details, whether creating new or editing existing
        setShowFolderDetails(true);
        
        // Since this is an existing album, fetch its details
        try {
          const folderDetails = await fetchFolderDetails(id);
          
          if (folderDetails) {
            // Update album details in state
            setFolderName(folderDetails.folderName);
            setFolderDescription(folderDetails.folderDescription);
            
            // Handle password policy with proper enum mapping
            const policy = folderDetails.passwordPolicy;
            
            // Map the PasswordPolicyEnum values to our local state options
            switch(policy) {
              case 'NoPassword':
                setPasswordProtectionOption('noPassword');
                break;
              case 'NotVisible':
                setPasswordProtectionOption('notVisible');
                setAlbumPassword(folderDetails.password);
                break;
              case 'Watermark':
                setPasswordProtectionOption('watermark');
                setAlbumPassword(folderDetails.password);
                break;
              case 'CannotBeSaved':
                setPasswordProtectionOption('cannotBeSaved');
                setAlbumPassword(folderDetails.password);
                break;
              default:
                setPasswordProtectionOption('noPassword');
            }
          }
        } catch (fetchErr) {
          console.error("Error fetching folder details:", fetchErr);
        }
      } else {
        // If no ID in URL, create a new one
        const newId = `${username}_____${generateUUID()}____Folder`;
        setFolderId(newId);
        
        // Show folder details for new albums
        setShowFolderDetails(true);
      }
    } catch (err) {
      console.error("Folder ID initialization error:", err);
    }
  };

  const fetchFolderDetails = async (folderId: string) => {
    try {
      const token = localStorage.getItem("idToken");
      if (!token) {
        return null;
      }
      
      const response = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          query: FETCH_FOLDER_QUERY,
          variables: { folderIds: [folderId] }
        })
      });
      
      const result = await response.json();
      
      if (result.errors) {
        console.error("GraphQL errors:", result.errors);
        return null;
      }
      
      const items = result?.data?.fetchFolders?.items || [];
      
      if (items.length === 0) {
        return null;
      }
      
      const folder = items[0];
      
      return {
        folderName: folder.folderName || '',
        folderDescription: folder.folderDescription || '',
        passwordPolicy: folder.folderPassword?.policy || 'NoPassword',
        password: folder.folderPassword?.password || ''
      };
    } catch (error) {
      console.error("Error in fetchFolderDetails:", error);
      return null;
    }
  };

  const restorePhotosFromStorage = () => {
    try {
      const storedPhotos = localStorage.getItem(STORAGE_KEYS.SELECTED_PHOTOS);
      
      if (storedPhotos) {
        try {
          const parsedPhotos = JSON.parse(storedPhotos) as SelectedPhoto[];
          
          if (Array.isArray(parsedPhotos) && parsedPhotos.length > 0) {
            setSelectedPhotos(parsedPhotos);
          }
        } catch (parseErr) {
          console.error("Error parsing stored photos:", parseErr);
        }
      }
    } catch (storageErr) {
      console.error("Error restoring photos from storage:", storageErr);
    }
  };

  const testS3Connection = () => {
    try {
      if (!s3) {
        console.error("S3 client not available");
      }
    } catch (s3Err) {
      console.error("S3 connection test error:", s3Err);
    }
  };

  // ---------- PHOTO MANAGEMENT ----------

  const removePhoto = (indexToRemove: number) => {
    const updated = selectedPhotos.filter((_, i) => i !== indexToRemove);
    setSelectedPhotos(updated);
    
    // Update localStorage
    if (updated.length > 0) {
      localStorage.setItem(STORAGE_KEYS.SELECTED_PHOTOS, JSON.stringify(updated));
    } else {
      localStorage.removeItem(STORAGE_KEYS.SELECTED_PHOTOS);
    }
  };

  const handleAddPhotos = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!cognitoUsername) {
      return;
    }
  
    const files = Array.from(e.target.files || []);
    
    if (!files.length) return;
    
    try {
      // Add pending photos to state first
      const initialPhotos = createInitialPhotoObjects(files);
      setSelectedPhotos(prev => [...prev, ...initialPhotos]);
      
      // Process files and update photo status
      const currentIndex = selectedPhotos.length;
      const processedPhotos = await processFiles(
        files,
        cognitoUsername,
        (index, status, progress, errorMessage) => {
          // Adjust index to account for existing photos
          updatePhotoStatus(currentIndex + index, status, progress, errorMessage);
        },
        log
      );
      
      // Update selected photos with processed info
      updatePhotosWithProcessedInfo(currentIndex, processedPhotos);
    } catch (error) {
      console.error("Error in handleAddPhotos:", error);
    } finally {
      e.target.value = "";
    }
  };
  
  const createInitialPhotoObjects = (files: File[]): SelectedPhoto[] => {
    return files.map(file => {
      const type: string = file.type;
      const fileExt = file.name.split('.').pop() || "jpg";
      const uuidFileName = `${generateUUID()}.${fileExt}`;
      
      return {
        fileName: uuidFileName,
        s3PreviewUrl: URL.createObjectURL(file), // Use local object URL initially
        type,
        size: file.size,
        status: 'pending' as UploadStatus,
        progress: 0
      } as SelectedPhoto;
    });
  };
  
  const updatePhotosWithProcessedInfo = (startIndex: number, processedPhotos: SelectedPhoto[]) => {
    setSelectedPhotos(prev => {
      const updated = [...prev];
      
      // Update each processed photo
      processedPhotos.forEach((processedPhoto, i) => {
        const index = startIndex + i;
        if (index < updated.length) {
          updated[index] = processedPhoto;
        }
      });
      
      return updated;
    });
  };

  // ---------- ALBUM SAVING ----------

  const handleSaveAlbum = async () => {
    setIsSavingAlbum(true);

    try {
      if (publicUsername?.startsWith("Profile-")) {
        setUsernameInput(publicUsername);
        setShowUsernamePrompt(true);
        setIsSavingAlbum(false);
        return;
      }

      // If we have a valid username, proceed directly to saving
      saveAlbumDirectly();
    } catch (err) {
      console.error("Error in handleSaveAlbum:", err);
      setIsSavingAlbum(false);
    }
  };

  const saveAlbumDirectly = async () => {
    setIsSavingAlbum(true);

    try {
      // Validate required data
      if (!validateRequiredData()) {
        setIsSavingAlbum(false);
        return;
      }
      
      // Filter out photos with error status
      const validPhotos = selectedPhotos.filter(photo => photo.status === 'complete');
      
      // Prepare folder and account IDs
      const now = Math.floor(Date.now() / 1000);
      const accountId = `${cognitoUsername}_____${cognitoUsername}____Account`;
      const folderParts = folderId!.split("_____");
      const folderTargetItemIdentifier = folderParts[1].split("____")[0];

      // Move files from temp to public folder
      await moveFilesToPublic(
        validPhotos, 
        updateSaveProgress,
        log
      );

      // Prepare GraphQL input data
      const folderPositionInput = createFolderPositionInput(now, accountId, folderTargetItemIdentifier, validPhotos);
      const updatedFileReferenceInputs = createFileReferenceInputs(validPhotos, now, accountId);
      
      // Send GraphQL mutation
      await sendAlbumSaveMutation(folderPositionInput, updatedFileReferenceInputs);
    } catch (err) {
      console.error("Error in saveAlbumDirectly:", err);
      setIsSavingAlbum(false);
    }
  };
  
  const validateRequiredData = () => {
    const token = localStorage.getItem("idToken");
    
    if (!token) {
      return false;
    }
    
    if (!cognitoUsername) {
      return false;
    }
    
    if (!folderId) {
      return false;
    }
    
    return true;
  };
  
  const updateSaveProgress = (progress: number) => {
    // Update progress in UI - we'll use a ref for this in the styled component
    const progressBar = document.getElementById('saveProgress');
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
  };
  
  const createFolderPositionInput = (
    timestamp: number, 
    accountId: string, 
    folderTargetItemIdentifier: string, 
    validPhotos: SelectedPhoto[]
  ) => {
    return {
      currentTime: timestamp,
      folderId,
      profileIds: ["Only Me_____Only Me____Profile"],
      folderPositionSelectedTagInputs: [],
      folderPositionPoints: 1,
      acceptedFileReferenceIds: validPhotos.map(photo =>
        `${folderTargetItemIdentifier}_____${photo.fileName}____FileReference`
      ),
      hiddenFileReferenceIds: [],
      folderInput: {
        folderSelectedTagInputs: [],
        folderAboutContactIds: [accountId],
        folderName: folderName,
        folderDescription: folderDescription,
        folderPasswordInput: {
          password: passwordProtectionOption !== 'noPassword' ? albumPassword : null,
          policy: PasswordPolicyEnum[passwordProtectionOption.charAt(0).toUpperCase() + passwordProtectionOption.slice(1) as keyof typeof PasswordPolicyEnum]
        },
        folderInviteParametersInput: {
          folderIsOnlyVisibleThroughCode: true,
          folderInviteHasBeenDisabled: false,
          usingFolderInviteGrantsRightToRemoveItems: false,
          tagContactIdUsingFolderInviteAsFolderAboutContact: true,
          usingFolderInviteGrantsRightToAddItems: true,
          addedItemsNeedFolderCreatorApproval: false
        }
      }
    };
  };
  
  const createFileReferenceInputs = (
    validPhotos: SelectedPhoto[], 
    timestamp: number, 
    accountId: string
  ) => {
    return validPhotos.map(photo => {
      const dataKey = photo.type === "video" || photo.type?.startsWith("video")
        ? `Input/Video/${photo.fileName}`
        : `Input/Image/${photo.fileName}`;

      const fileId = `${cognitoUsername}_____${photo.fileName}____File`;

      return {
        fileReferencesHolderId: folderId,
        currentTime: timestamp,
        points: 1,
        hasBeenDeleted: false,
        selectedTagInputs: [],
        fileId,
        fileInput: {
          fileId,
          ownerFileInput: {
            editorContactIds: [accountId],
            FileSharingOptionsEnum: "Anyone",
            dataKey,
            thumbnailDataKey: photo.thumbnailDataKey,
            dataInBytes: photo.size!,
            thumbnailDataInBytes: photo.thumbnailSize || 0,
            s3UploadedAt: timestamp,
            durationInSeconds: photo.duration
          },
          editorFileInput: {
            aboutContactIds: [accountId],
            captionText: "",
            numericFilterInputs: [],
          }
        }
      };
    });
  };
  
  const sendAlbumSaveMutation = async (folderPositionInput: any, updatedFileReferenceInputs: any[]) => {
    const saveProgressText = document.getElementById('saveProgressText');
    if (saveProgressText) {
      saveProgressText.innerText = t('Finalizing album...');
    }

    const token = localStorage.getItem("idToken");
    const mutation = `
      mutation MyMutation(
        $folderPositionInputs: [FolderPositionInput!],
        $updatedFileReferenceInputs: [UpdatedFileReferenceInput!]
      ) {
        changeFiles0(updatedFileReferenceInputs: $updatedFileReferenceInputs) {
          items {
            ... on FileReference { id createdAt updatedAt fileId file { dataKey thumbnailDataKey } }
          }
        }
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items { id }
        }
      }
    `;

    const variables = {
      folderPositionInputs: [folderPositionInput],
      updatedFileReferenceInputs,
    };

    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: mutation, variables }),
    });

    const json = await response.json();

    if (json.errors) {
      console.error("Upload failed:", json.errors);
      setIsSavingAlbum(false);
    } else {
      handleSuccessfulSave();
    }
  };
  
  const handleSuccessfulSave = () => {
    // Clear all album data before redirecting
    clearAlbumData(setSelectedPhotos, setProgressTracker, [STORAGE_KEYS.SELECTED_PHOTOS], log);
    
    const saveSuccessText = document.getElementById('saveProgressText');
    if (saveSuccessText) {
      saveSuccessText.innerText = t('Album saved successfully!');
    }
    
    // Set a flag in sessionStorage that we just completed an album
    sessionStorage.setItem('album_just_saved', 'true');
    
    // Slight delay before redirect for user to see success message
    setTimeout(() => {
      window.location.href = "/my-albums.html";
    }, 1000);
  };

  // ---------- USERNAME MANAGEMENT ----------
  
  const validateUsername = (username: string) => /^[a-zA-Z0-9-]+$/.test(username);

  const submitUsername = async (proposedName: string) => {
    setIsSubmittingUsername(true);
    setUsernameError("");

    const token = localStorage.getItem("idToken");
    if (!token) return;

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
      const res = await fetch(GRAPHQL_ENDPOINT, {
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
      setUsernameError(t('Username is already taken. Please try a different one.'));
      setShowAltButton(true);
      setIsSubmittingUsername(false);
    }
  };
  
  const handleSuccessfulUsernameUpdate = (newName: string) => {
    localStorage.setItem("publicUsername", newName);
    setPublicUsername(newName);
    setShowUsernamePrompt(false);
    
    // Automatically proceed with saving the album
    saveAlbumDirectly();
  };

  const appendRandomDigits = () => {
    const digits = Math.floor(100000 + Math.random() * 900000).toString();
    const modified = `${usernameInput}${digits}`;
    setUsernameInput(modified);
    submitUsername(modified);
  };

  // ---------- PASSWORD MANAGEMENT ----------

  const handleClosePasswordDialog = (option?: ProtectionOption, password?: string) => {
    if (option) {
      setPasswordProtectionOption(option);
    }
    
    if (password !== undefined) {
      setAlbumPassword(password);
    }
    
    setShowPasswordDialog(false);
  };
  
  const getPasswordPolicyButtonText = () => {
    if (passwordProtectionOption === 'noPassword') {
      return t('Album Password Policy');
    }
    
    const optionText = 
      passwordProtectionOption === 'notVisible' ? t('Not Visible') :
      passwordProtectionOption === 'watermark' ? t('Watermark') :
      t('Cannot Be Saved');
    
    return `${optionText} ${albumPassword ? `(${albumPassword})` : ''}`;
  };

  const handleOpenPasswordDialog = () => {
    setShowPasswordDialog(true);
  };

  // ========== RENDER METHODS ==========

  return (
    <>
      <GlobalStyle />
      <AppContainer isRTL={isRTL}>
        <ContentContainer>
          {/* Header Section */}
          <HeaderSection>
            <BackLinkContainer>
              <BackLink href="/my-albums.html">
                {t('My Albums')}
              </BackLink>
            </BackLinkContainer>
            
            {publicUsername && (
              <UserInfo>
                <Username>{publicUsername}</Username>
                <LogoutButton t={t} />
              </UserInfo>
            )}
          </HeaderSection>
          
          {/* Progress Tracking */}
          {progressTracker.totalFiles > 0 && (
            <ProgressContainer>
              <ProgressTitle>{t('Upload Progress')}</ProgressTitle>
              
              <OverallProgress>
                <ProgressStats>
                  <span>{t('Overall Progress')}: {Math.round(progressTracker.overallProgress * 100)}%</span>
                  <span>{progressTracker.filesComplete} {t('of')} {progressTracker.totalFiles} {t('complete')}</span>
                </ProgressStats>
                <ProgressBarBg>
                  <ProgressBar progress={progressTracker.overallProgress} />
                </ProgressBarBg>
              </OverallProgress>
              
              <ProgressDetails>
                {progressTracker.filesUploading > 0 && (
                  <ProgressItem>{t('Uploading')}: {progressTracker.filesUploading}</ProgressItem>
                )}
                {progressTracker.filesProcessing > 0 && (
                  <ProgressItem>{t('Processing')}: {progressTracker.filesProcessing}</ProgressItem>
                )}
                {progressTracker.filesComplete > 0 && (
                  <ProgressItem>{t('Complete')}: {progressTracker.filesComplete}</ProgressItem>
                )}
                {progressTracker.filesWithError > 0 && (
                  <ProgressItem isError>{t('Failed')}: {progressTracker.filesWithError}</ProgressItem>
                )}
              </ProgressDetails>
            </ProgressContainer>
          )}
          
          {/* Saving Progress */}
          {isSavingAlbum && (
            <SavingProgressContainer>
              <SavingProgressTitle>{t('Saving Album')}</SavingProgressTitle>
              <SavingProgressText id="saveProgressText">{t('Moving files...')}</SavingProgressText>
              <SavingProgressBarBg>
                <SavingProgressBar id="saveProgress" style={{ width: "5%" }} />
              </SavingProgressBarBg>
            </SavingProgressContainer>
          )}
          
          {/* Hidden File Input */}
          <HiddenFileInput
            id="file-input"
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleAddPhotos}
          />
          
          {/* Photo Grid */}
          {selectedPhotos.length > 0 && (
            <>
              <SelectedCount>
                {selectedPhotos.length} {selectedPhotos.length > 1 ? t('photos selected') : t('photo selected')}:
              </SelectedCount>

              <PhotoGrid>
                {selectedPhotos.map((photo, i) => (
                  <PhotoCard key={i}>
                    {/* Status indicator */}
                    <StatusIndicator status={photo.status}>
                      {photo.status === 'complete' ? '✓' : 
                       photo.status === 'error' ? '✕' :
                       photo.status === 'uploading' ? '↑' :
                       photo.status === 'processing' ? '⚙️' : '•'}
                    </StatusIndicator>

                    {/* Media preview */}
                    <MediaPreview>
                      {photo.type === "video" || photo.type?.startsWith("video") ? (
                        <VideoItem src={photo.s3PreviewUrl} controls />
                      ) : (
                        <MediaItem src={photo.s3PreviewUrl} alt={photo.fileName} />
                      )}
                      
                      {/* Upload progress bar for in-progress items */}
                      {(photo.status === 'uploading' || photo.status === 'processing') && (
                        <UploadProgressBarBg>
                          <UploadProgressBar progress={photo.progress} status={photo.status} />
                        </UploadProgressBarBg>
                      )}
                    </MediaPreview>
                    
                    {/* File info */}
                    <FileInfo>
                      {photo.type?.startsWith("video") ? t('Video') : t('Image')}
                      {photo.size && ` • ${(photo.size / 1024 / 1024).toFixed(1)} MB`}
                      {photo.duration && ` • ${photo.duration}s`}
                    </FileInfo>

                    {/* Error message if any */}
                    {photo.status === 'error' && photo.errorMessage && (
                      <ErrorMessage>
                        {t('Error')}: {photo.errorMessage.length > 40 ? photo.errorMessage.substring(0, 37) + "..." : photo.errorMessage}
                      </ErrorMessage>
                    )}
                    
                    {/* Remove button */}
                    <RemoveButton 
                      onClick={() => removePhoto(i)} 
                      disabled={isSavingAlbum}
                    >
                      {t('Remove')}
                    </RemoveButton>
                  </PhotoCard>
                ))}
              </PhotoGrid>
            </>
          )}
          
          {/* Action Buttons */}
          <ActionButtons>
            <PrimaryButton
              onClick={handleSaveAlbum}
              disabled={isSavingAlbum}
            >
              {isSavingAlbum ? t('Saving Album...') : t('Save Album')}
            </PrimaryButton>
            
            {/* Folder Details */}
            {showFolderDetails && (
              <FolderDetails>
                <FormGroup>
                  <FormLabel htmlFor="folderName">
                    {t('Album Name (Optional)')}
                  </FormLabel>
                  <FormInput
                    id="folderName"
                    type="text"
                    value={folderName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFolderName(e.target.value)}
                    placeholder={t('Enter album name')}
                  />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel htmlFor="folderDescription">
                    {t('Album Description (Optional)')}
                  </FormLabel>
                  <FormTextarea
                    id="folderDescription"
                    value={folderDescription}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFolderDescription(e.target.value)}
                    placeholder={t('Enter album description')}
                    rows={4}
                  />
                </FormGroup>
              </FolderDetails>
            )}
            
            <SecondaryButton
              onClick={() => {
                const input = document.getElementById("file-input") as HTMLInputElement;
                input?.click();
              }}
              disabled={isSavingAlbum}
            >
              {t('Add More Photos')}
            </SecondaryButton>
            
            <PasswordButton
              passwordSet={passwordProtectionOption !== 'noPassword'}
              onClick={handleOpenPasswordDialog}
              disabled={isSavingAlbum}
            >
              {getPasswordPolicyButtonText()}
            </PasswordButton>
          </ActionButtons>
          
          {/* Username Prompt Modal */}
          {showUsernamePrompt && (
            <ModalOverlay>
              <UsernameModal isRTL={isRTL}>
                <UsernameTitle>
                  {t('Enter Username')}
                </UsernameTitle>
                <UsernameDescription>
                  {t('Username should contain only letters, numbers and hyphens. Example: john-doe2')}
                </UsernameDescription>
                <UsernameInput
                  value={usernameInput}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsernameInput(e.target.value)}
                  isRTL={isRTL}
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
          
          {/* Password Dialog */}
          {showPasswordDialog && (
            <PasswordDialog 
              isOpen={showPasswordDialog} 
              onClose={handleClosePasswordDialog}
              initialOption={passwordProtectionOption}
              initialPassword={albumPassword} 
            />
          )}
        </ContentContainer>

        {/* Debug Log */}
        {debugMessages.length > 0 && (
          <DebugContainer>
            <DebugTitle>{t('Debug Log')}</DebugTitle>
            <DebugMessages>
              {debugMessages.map((msg, i) => (
                <DebugMessage key={i}>{msg}</DebugMessage>
              ))}
            </DebugMessages>
          </DebugContainer>
        )}
      </AppContainer>
    </>
  );
};

// Wrap the SaveAlbum component with I18nProvider
const SaveAlbumWithTranslations = () => {
  return (
    <I18nProvider>
      <SaveAlbum />
    </I18nProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<SaveAlbumWithTranslations />);