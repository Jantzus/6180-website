import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

// Import styled components
import {
  GlobalStyle,
  AppContainer,
  ContentContainer,
  HeaderContainer,
  BackLinkContainer,
  BackLink,
  ProgressContainer,
  ProgressTitle,
  OverallProgress,
  ProgressStats,
  ProgressBarBg,
  ProgressBar,
  ProgressDetails,
  ProgressItem,
  SavingProgressContainer,
  SavingProgressTitle,
  SavingProgressText,
  SavingProgressBarBg,
  SavingProgressBar,
  SelectedCount,
  PhotoGrid,
  PhotoCard,
  StatusIndicator,
  MediaPreview,
  MediaItem,
  VideoItem,
  UploadProgressBarBg,
  UploadProgressBar,
  FileInfo,
  ErrorMessage,
  RemoveButton,
  ActionButtons,
  PrimaryButton,
  SecondaryButton,
  PasswordButton,
  FolderDetails,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  ModalOverlay,
  UsernameModal,
  UsernameTitle,
  UsernameDescription,
  UsernameInput,
  UsernameError,
  UsernameButton,
  UsernameAltButton,
  DebugContainer,
  DebugTitle,
  DebugMessages,
  DebugMessage,
  HiddenFileInput,
  ToggleContainer,
  ToggleLabel,
  ToggleSwitch,
  ToggleSlider
} from "@/styles/styled-components";

import { AWS_PRIVATE_GRAPHQL_ENDPOINT, LOCAL_STORAGE_KEYS } from "@/lib/config";
import { 
  ProgressTracker,
  UploadStatus,
  SelectedPhoto,
  ProtectionOption
} from "@/lib/types";

import { generateUUID } from "@/lib/utils";
import { I18nProvider, useTranslation } from "@/lib/i18n/react";
import { getLanguageDirection } from "@/lib/i18n/translations";
import { PasswordDialog } from "@/components/PasswordDialog";
import { LogoutButton } from "@/components/LogoutButton";

// Import utility functions from file-upload-utils
import { 
  createLogger,
  createPhotoStatusUpdater,
  updateProgressTracker,
  processFilesBeforeUploadingToS3,
  moveFilesToPublic,
  clearAlbumData,
  s3
} from "@/lib/file-upload-utils";

import { checkLoginWithRefresh } from "@/lib/utils"

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
        creatorId      
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
        folderInviteParameters {
          usingFolderInviteGrantsRightToAddItems
        }
        folderPosition {
          id
          profileIds
        }          
      }
    }
  }
`;

// Enhanced interface for sub-album data
interface SubAlbumData {
  isSubAlbum: boolean;
  selectedFileIds: string[];
  selectedPhotos?: SelectedPhoto[];
}

// Interface for file reference input
interface FileReferenceInput {
  fileReferencesHolderId: string;
  currentTime: number;
  points: number;
  hasBeenDeleted: boolean;
  selectedTagInputs: any[];
  fileId: string;
  fileInput: any | null;
}

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
  const [savingProgress, setSavingProgress] = useState(0);
  
  // Album details state
  const [folderName, setFolderName] = useState("");
  const [folderDescription, setFolderDescription] = useState("");
  const [showFolderDetails, setShowFolderDetails] = useState(false);
  
  // Password protection state
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [passwordProtectionOption, setPasswordProtectionOption] = useState<ProtectionOption>('noPassword');
  const [albumPassword, setAlbumPassword] = useState("");
  
  // Public profile toggle state
  const [isOnPublicProfile, setIsOnPublicProfile] = useState<boolean>(false);
  
  // Participants Can Add Items toggle state
  const [participantsCanAddItems, setParticipantsCanAddItems] = useState<boolean>(true);
  
  // New state for checking if user is the creator - initialize as null (undetermined)
  const [isCreator, setIsCreator] = useState<boolean | null>(null);

  // New state for sub-album data
  const [isSubAlbum, setIsSubAlbum] = useState<boolean>(false);
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([]);

  // Create utility instances
  const log = createLogger(setDebugMessages);
  const updatePhotoStatus = createPhotoStatusUpdater(setSelectedPhotos);

  // Enhanced logging function
  const enhancedLog = (message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    let logMessage = `[${timestamp}] ${message}`;
    
    if (data !== undefined) {
      try {
        // Stringify with indentation for better readability in console
        const dataStr = typeof data === 'object' ? 
          JSON.stringify(data, null, 2) : 
          String(data);
          
        logMessage += `\nData: ${dataStr}`;
        
        // For console, we'll log both separately for better inspection
        console.log(logMessage);
        console.log("Data object:", data);
      } catch (e) {
        logMessage += ` [Error stringifying data: ${e}]`;
        console.log(logMessage);
        console.log("Raw data:", data);
      }
    } else {
      console.log(logMessage);
    }
    
    // Add to debug messages for UI
    log(logMessage);
  };

  // ---------- EFFECTS ----------

  // Initialize component
  useEffect(() => {
    enhancedLog("Component initializing");
    initializeComponent();
  }, []);

  // Save selected photos to localStorage
  useEffect(() => {
    if (selectedPhotos.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.SELECTED_PHOTOS, JSON.stringify(selectedPhotos));
      enhancedLog(`Saved ${selectedPhotos.length} photos to localStorage`);
    }
  }, [selectedPhotos]);

  // Update progress tracker
  useEffect(() => {
    updateProgressTracker(selectedPhotos, setProgressTracker);
  }, [selectedPhotos]);

  // ---------- INITIALIZATION ----------

  const initializeComponent = async () => {
    enhancedLog("Starting component initialization");
    setIsSavingAlbum(false);
    
    try {
      enhancedLog("Checking login with refresh");
      const token = await checkLoginWithRefresh();
      if (!token) {
        enhancedLog("No token returned from login check, aborting initialization");
        return;
      }
      
      // Extract username directly here instead of in a separate function
      try {
        // Get public username
        const savedUsername = localStorage.getItem("publicUsername");
        enhancedLog(`Retrieved public username from localStorage: ${savedUsername || 'null'}`);
        setPublicUsername(savedUsername || null);
        
        // Extract Cognito username directly from token
        const payload = JSON.parse(atob(token.split('.')[1]));
        const username = payload["cognito:username"];
        
        if (username) {
          enhancedLog(`Extracted Cognito username from token: ${username}`);
          // Set the username in state
          setCognitoUsername(username);
          
          // Check for sub-album data in localStorage
          const subAlbumDataStr = localStorage.getItem(LOCAL_STORAGE_KEYS.SUB_ALBUM_DATA);
          enhancedLog(`Sub-album data from localStorage: ${subAlbumDataStr || 'null'}`);
          
          if (subAlbumDataStr) {
            try {
              const subAlbumData = JSON.parse(subAlbumDataStr) as SubAlbumData;
              enhancedLog("Parsed sub-album data:", subAlbumData);
              
              if (subAlbumData.isSubAlbum && subAlbumData.selectedFileIds?.length > 0) {
                enhancedLog(`Valid sub-album data found with ${subAlbumData.selectedFileIds.length} files`);
                setIsSubAlbum(true);
                setSelectedFileIds(subAlbumData.selectedFileIds);
                
                // If we have selectedPhotos in the sub-album data, use them
                if (subAlbumData.selectedPhotos && subAlbumData.selectedPhotos.length > 0) {
                  enhancedLog(`Found ${subAlbumData.selectedPhotos.length} selected photos in sub-album data`);
                  setSelectedPhotos(subAlbumData.selectedPhotos);
                }
                
                // For sub-albums, always show folder details
                setShowFolderDetails(true);
                // User is automatically the creator for new sub-albums
                setIsCreator(true);
                // Create a new folder ID
                const newId = `${username}_____${generateUUID()}____Folder`;
                enhancedLog(`Generated new folder ID for sub-album: ${newId}`);
                setFolderId(newId);
              } else {
                // If we have any issues with the sub-album data, proceed with normal initialization
                enhancedLog("Invalid sub-album data, proceeding with normal initialization");
                await initializeFolderIdWithUsername(username);
              }
            } catch (e) {
              console.error("Error parsing sub-album data:", e);
              enhancedLog(`Error parsing sub-album data: ${e}`);
              await initializeFolderIdWithUsername(username);
            }
          } else {
            // No sub-album data, proceed with normal folder initialization
            enhancedLog("No sub-album data found, proceeding with normal folder initialization");
            await initializeFolderIdWithUsername(username);
          }
        } else {
          enhancedLog("No Cognito username found in token");
        }
      } catch (err) {
        console.error("User data initialization error:", err);
        enhancedLog(`User data initialization error: ${err}`);
      }
      
      restorePhotosFromStorage();
      testS3Connection();
      enhancedLog("Component initialization completed");
    } catch (initErr) {
      console.error("Initialization error:", initErr);
      enhancedLog(`Initialization error: ${initErr}`);
    }
  };

  // Adapted initializeFolderId that takes username directly as parameter
  const initializeFolderIdWithUsername = async (username: string) => {
    enhancedLog(`Initializing folder ID with username: ${username}`);
    try {
      // Get folderId from URL query parameter
      const params = new URLSearchParams(window.location.search);
      const id = params.get("folderId");
      enhancedLog(`Folder ID from URL: ${id || 'null'}`);
      
      if (id) {
        setFolderId(id);
        enhancedLog(`Using existing folder ID: ${id}`);
        
        // Since this is an existing album, fetch its details
        try {
          enhancedLog(`Fetching details for folder: ${id}`);
          const folderDetails = await fetchFolderDetails(id);
          enhancedLog("Folder details retrieved:", folderDetails);
          
          if (folderDetails) {
            // Check if current user is the creator
            const accountId = `${username}_____${username}____Account`;
            const userIsCreator = folderDetails.creatorId === accountId;
            enhancedLog(`User is creator of folder: ${userIsCreator}, accountId: ${accountId}, creator: ${folderDetails.creatorId}`);
            setIsCreator(userIsCreator);
            
            // If user is creator, show folder details
            if (userIsCreator) {
              enhancedLog("User is creator, showing folder details");
              setShowFolderDetails(true);
              
              // Update album details in state
              setFolderName(folderDetails.folderName);
              setFolderDescription(folderDetails.folderDescription);
              
              // Set the public profile toggle state
              setIsOnPublicProfile(folderDetails.isOnPublicProfile);
              enhancedLog(`Setting isOnPublicProfile: ${folderDetails.isOnPublicProfile}`);
              
              // Set participants can add items toggle state based on folderDetails
              if (folderDetails.participantsCanAddItems !== undefined) {
                setParticipantsCanAddItems(folderDetails.participantsCanAddItems);
                enhancedLog(`Setting participantsCanAddItems: ${folderDetails.participantsCanAddItems}`);
              }
              
              // Handle password policy with proper enum mapping
              const policy = folderDetails.passwordPolicy;
              enhancedLog(`Password policy from folder details: ${policy}`);
              
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
              enhancedLog(`Set password protection option to: ${passwordProtectionOption}`);
            } else {
              // If not creator, still load the data but don't show editable fields
              enhancedLog("User is NOT the creator, hiding editable fields");
              setShowFolderDetails(false);
            }
          } else {
            // If we couldn't fetch folder details, set isCreator to false as a fallback
            enhancedLog("No folder details retrieved, setting isCreator to false");
            setIsCreator(false);
          }
        } catch (fetchErr) {
          console.error("Error fetching folder details:", fetchErr);
          enhancedLog(`Error fetching folder details: ${fetchErr}`);
          // Set isCreator to false on error as a safety measure
          setIsCreator(false);
        }
      } else {
        // If no ID in URL, create a new one
        const newId = `${username}_____${generateUUID()}____Folder`;
        enhancedLog(`Creating new folder ID: ${newId}`);
        setFolderId(newId);
        
        // For new albums, user is automatically the creator
        enhancedLog("Setting isCreator to true for new album");
        setIsCreator(true);
        // Show folder details for new albums
        setShowFolderDetails(true);
      }
    } catch (err) {
      console.error("Folder ID initialization error:", err);
      enhancedLog(`Folder ID initialization error: ${err}`);
      // Set isCreator to false on error as a safety measure
      setIsCreator(false);
    }
  };

  const fetchFolderDetails = async (folderId: string) => {
    enhancedLog(`Fetching details for folder ID: ${folderId}`);
    try {
      const token = await checkLoginWithRefresh();
      if (!token) {
        enhancedLog("No token available for fetching folder details");
        return null;
      }
      
      enhancedLog("Sending GraphQL query to fetch folder details");
      const response = await fetch(AWS_PRIVATE_GRAPHQL_ENDPOINT, {
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
      enhancedLog("Folder details API response:", result);
      
      if (result.errors) {
        console.error("GraphQL errors:", result.errors);
        enhancedLog(`GraphQL errors: ${JSON.stringify(result.errors)}`);
        return null;
      }
      
      const items = result?.data?.fetchFolders?.items || [];
      enhancedLog(`Found ${items.length} folder items`);
      
      if (items.length === 0) {
        enhancedLog("No folder items found");
        return null;
      }
      
      const folder = items[0];
      enhancedLog("Retrieved folder data:", folder);
      
      // Check if this folder is on the public profile
      const isPublic = folder.folderPosition?.profileIds?.some(
        (profileId: string) => profileId.includes("Public____Profile")
      ) || false;
      
      enhancedLog(`Folder is on public profile: ${isPublic}`);
      enhancedLog("Profile IDs:", folder.folderPosition?.profileIds);
      
      // Extract participants can add items setting
      const canAddItems = folder.folderInviteParameters?.usingFolderInviteGrantsRightToAddItems;
      enhancedLog(`Participants can add items: ${canAddItems}`);
      
      return {
        creatorId: folder.creatorId || '',
        folderName: folder.folderName || '',
        folderDescription: folder.folderDescription || '',
        passwordPolicy: folder.folderPassword?.policy || 'NoPassword',
        password: folder.folderPassword?.password || '',
        isOnPublicProfile: isPublic,
        participantsCanAddItems: canAddItems !== undefined ? canAddItems : true
      };
    } catch (error) {
      console.error("Error in fetchFolderDetails:", error);
      enhancedLog(`Error in fetchFolderDetails: ${error}`);
      return null;
    }
  };

  const restorePhotosFromStorage = () => {
    enhancedLog("Attempting to restore photos from localStorage");
    try {
      const storedPhotos = localStorage.getItem(LOCAL_STORAGE_KEYS.SELECTED_PHOTOS);
      enhancedLog(`Found stored photos: ${storedPhotos ? 'yes' : 'no'}`);
      
      if (storedPhotos) {
        try {
          const parsedPhotos = JSON.parse(storedPhotos) as SelectedPhoto[];
          enhancedLog(`Parsed ${parsedPhotos.length} photos from localStorage`);
          
          if (Array.isArray(parsedPhotos) && parsedPhotos.length > 0) {
            setSelectedPhotos(parsedPhotos);
            enhancedLog(`Restored ${parsedPhotos.length} photos to state`);
          }
        } catch (parseErr) {
          console.error("Error parsing stored photos:", parseErr);
          enhancedLog(`Error parsing stored photos: ${parseErr}`);
        }
      }
    } catch (storageErr) {
      console.error("Error restoring photos from storage:", storageErr);
      enhancedLog(`Error restoring photos from storage: ${storageErr}`);
    }
  };

  const testS3Connection = () => {
    enhancedLog("Testing S3 connection");
    try {
      if (!s3) {
        console.error("S3 client not available");
        enhancedLog("S3 client not available");
      } else {
        enhancedLog("S3 client is available");
      }
    } catch (s3Err) {
      console.error("S3 connection test error:", s3Err);
      enhancedLog(`S3 connection test error: ${s3Err}`);
    }
  };

  // ---------- PUBLIC PROFILE TOGGLE ----------
  
  const handlePublicProfileToggle = () => {
    const newValue = !isOnPublicProfile;
    enhancedLog(`Toggling isOnPublicProfile to: ${newValue}`);
    setIsOnPublicProfile(newValue);
  };

  // ---------- PARTICIPANTS CAN ADD ITEMS TOGGLE ----------
  
  const handleParticipantsCanAddItemsToggle = () => {
    const newValue = !participantsCanAddItems;
    enhancedLog(`Toggling participantsCanAddItems to: ${newValue}`);
    setParticipantsCanAddItems(newValue);
  };

  // ---------- PHOTO MANAGEMENT ----------

  const removePhoto = (indexToRemove: number) => {
    enhancedLog(`Removing photo at index: ${indexToRemove}`);
    const updated = selectedPhotos.filter((_, i) => i !== indexToRemove);
    setSelectedPhotos(updated);
    enhancedLog(`New photos count: ${updated.length}`);
    
    // Update localStorage
    if (updated.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.SELECTED_PHOTOS, JSON.stringify(updated));
      enhancedLog(`Updated localStorage with ${updated.length} photos`);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.SELECTED_PHOTOS);
      enhancedLog("Removed photos from localStorage");
    }
  };

  const handleAddPhotos = async (e: React.ChangeEvent<HTMLInputElement>) => {
    enhancedLog("Add photos triggered from file input");
    if (!cognitoUsername) {
      enhancedLog("No Cognito username available, cannot add photos");
      return;
    }
  
    const files = Array.from(e.target.files || []);
    enhancedLog(`Selected ${files.length} files`);
    
    if (!files.length) return;
    
    try {
      // Add pending photos to state first
      const initialPhotos = createInitialPhotoObjects(files);
      enhancedLog(`Created ${initialPhotos.length} initial photo objects`);
      setSelectedPhotos(prev => [...prev, ...initialPhotos]);
      
      // Process files and update photo status
      const currentIndex = selectedPhotos.length;
      enhancedLog(`Starting processing at index: ${currentIndex}`);
      const processedPhotos = await processFilesBeforeUploadingToS3(
        files,
        cognitoUsername,
        (index, status, progress, errorMessage) => {
          // Adjust index to account for existing photos
          updatePhotoStatus(currentIndex + index, status, progress, errorMessage);
          enhancedLog(`Updated status for photo ${currentIndex + index}: ${status}, progress: ${progress}`);
        },
        log
      );
      
      // Update selected photos with processed info
      enhancedLog(`Updating ${processedPhotos.length} photos with processed info`);
      updatePhotosWithProcessedInfo(currentIndex, processedPhotos);
    } catch (error) {
      console.error("Error in handleAddPhotos:", error);
      enhancedLog(`Error in handleAddPhotos: ${error}`);
    } finally {
      e.target.value = "";
      enhancedLog("Reset file input value");
    }
  };
  
  const createInitialPhotoObjects = (files: File[]): SelectedPhoto[] => {
    enhancedLog(`Creating initial photo objects for ${files.length} files`);
    return files.map(file => {
      const type: string = file.type;
      const fileExt = file.name.split('.').pop() || "jpg";
      const uuidFileName = `${generateUUID()}.${fileExt}`;
      
      enhancedLog(`Created initial photo object: ${uuidFileName}, type: ${type}, size: ${file.size}`);
      
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
    enhancedLog(`Updating photos with processed info, starting at index ${startIndex}`);
    setSelectedPhotos(prev => {
      const updated = [...prev];
      
      // Update each processed photo
      processedPhotos.forEach((processedPhoto, i) => {
        const index = startIndex + i;
        if (index < updated.length) {
          enhancedLog(`Updating photo at index ${index} with processed info`);
          updated[index] = processedPhoto;
        }
      });
      
      return updated;
    });
  };

  // ---------- ALBUM SAVING ----------

  const handleSaveAlbum = async () => {
    enhancedLog("Album save initiated");
    setIsSavingAlbum(true);

    try {
      if (publicUsername?.startsWith("Profile-")) {
        enhancedLog("Public username starts with 'Profile-', showing username prompt");
        setUsernameInput(publicUsername);
        setShowUsernamePrompt(true);
        setIsSavingAlbum(false);
        return;
      }

      // If we have a valid username, proceed directly to saving
      enhancedLog("Valid username found, proceeding to save album directly");
      saveAlbumDirectly();
    } catch (err) {
      console.error("Error in handleSaveAlbum:", err);
      enhancedLog(`Error in handleSaveAlbum: ${err}`);
      setIsSavingAlbum(false);
    }
  };

  // Helper function to split array into chunks of specified size
  const splitArrayIntoChunks = <T,>(array: T[], chunkSize: number): T[][] => {
    enhancedLog(`Splitting array of ${array.length} items into chunks of ${chunkSize}`);
    const result: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    enhancedLog(`Created ${result.length} chunks`);
    return result;
  };

  const saveAlbumDirectly = async () => {
    enhancedLog("Starting direct album save");
    setIsSavingAlbum(true);
    setSavingProgress(5); // Start progress at 5%

    try {
      // Validate required data
      enhancedLog("Validating required data for save");
      if (!await validateRequiredData()) {
        enhancedLog("Required data validation failed, aborting save");
        setIsSavingAlbum(false);
        return;
      }
      
      // Prepare folder and account IDs
      const now = Math.floor(Date.now() / 1000);
      const accountId = `${cognitoUsername}_____${cognitoUsername}____Account`;
      const folderParts = folderId!.split("_____");
      const folderTargetItemIdentifier = folderParts[1].split("____")[0];
      
      enhancedLog(`Save timestamp: ${now}`);
      enhancedLog(`Account ID: ${accountId}`);
      enhancedLog(`Folder ID: ${folderId}`);
      enhancedLog(`Folder target item identifier: ${folderTargetItemIdentifier}`);

      // Prepare file references - handle both new uploads and existing files
      enhancedLog("Creating folder position input");
      const folderPositionInput = createFolderPositionInput(now, accountId, folderTargetItemIdentifier);
      enhancedLog("Folder position input created:", folderPositionInput);
      
      let fileReferenceInputs: FileReferenceInput[] = [];
      
      // Process new uploads if any exist
      const validPhotos = selectedPhotos.filter(photo => photo.status === 'complete');
      enhancedLog(`Found ${validPhotos.length} valid photos with 'complete' status`);
      
      if (validPhotos.length > 0) {
        // Only move files from temp to public folder for new uploads (those without a fileId)
        const newUploads = validPhotos.filter(photo => !photo.fileId);
        enhancedLog(`Found ${newUploads.length} new uploads to move from temp to public folder`);
        
        if (newUploads.length > 0) {
          // Move files from temp to public folder for any new uploads
          enhancedLog("Moving files from temp to public folder");
          await moveFilesToPublic(
            newUploads, 
            updateSaveProgress,
            log
          );
        }
        
        // Create file references for new uploads
        enhancedLog("Creating file reference inputs for uploads");
        const newFileReferenceInputs = createFileReferenceInputs(validPhotos, now, accountId);
        enhancedLog(`Created ${newFileReferenceInputs.length} file reference inputs for uploads`, newFileReferenceInputs);
        fileReferenceInputs = fileReferenceInputs.concat(newFileReferenceInputs);
      }
      
      // Add existing file references for sub-album files
      if (isSubAlbum && selectedFileIds.length > 0) {
        enhancedLog(`Adding ${selectedFileIds.length} existing file references for sub-album`);
        // Create file reference inputs from selectedFileIds
        const existingFileReferenceInputs: FileReferenceInput[] = selectedFileIds.map(fileId => {
          enhancedLog(`Creating file reference for existing file ID: ${fileId}`);
          return {
            fileReferencesHolderId: folderId!,
            currentTime: now,
            points: 1,
            hasBeenDeleted: false,
            selectedTagInputs: [],
            fileId,
            fileInput: null // No file input needed for existing files
          };
        });
        
        enhancedLog(`Created ${existingFileReferenceInputs.length} file reference inputs for existing files`, existingFileReferenceInputs);
        fileReferenceInputs = fileReferenceInputs.concat(existingFileReferenceInputs);
      }
      
      enhancedLog(`Total file reference inputs: ${fileReferenceInputs.length}`);
      
      // Send GraphQL mutation with all file references using chunking approach
      enhancedLog("Sending GraphQL mutations with chunked file references");
      await saveWithChunking(folderPositionInput, fileReferenceInputs);
    } catch (err) {
      console.error("Error in saveAlbumDirectly:", err);
      enhancedLog(`Error in saveAlbumDirectly: ${err}`);
      setIsSavingAlbum(false);
    }
  };
  
  // Helper function to remove duplicate file references (same fileId)
  const removeDuplicateFileReferences = (fileReferences: FileReferenceInput[]): FileReferenceInput[] => {
    const uniqueFileIds = new Set<string>();
    return fileReferences.filter(ref => {
      if (uniqueFileIds.has(ref.fileId)) {
        enhancedLog(`Skipping duplicate file reference with ID: ${ref.fileId}`);
        return false;
      }
      uniqueFileIds.add(ref.fileId);
      return true;
    });
  };
  
  // NEW FUNCTION: Save album with chunking large file reference arrays
  const saveWithChunking = async (folderPositionInput: any, fileReferenceInputs: FileReferenceInput[]) => {
    enhancedLog("Starting chunked save process");
    try {
      updateSaveProgressText("Processing files in chunks...");
      
      // Define chunk size - similar to the iOS code
      const chunkSize = 48;
      
      if (fileReferenceInputs.length === 0) {
        // If no file references, just save the folder position
        enhancedLog("No file references to process, saving only folder position");
        await sendFolderOnlyMutation(folderPositionInput);
      } else {
        // Before chunking, remove any duplicates by fileId
        const uniqueFileReferences = removeDuplicateFileReferences(fileReferenceInputs);
        enhancedLog(`After removing duplicates, processing ${uniqueFileReferences.length} unique file references`);
        
        // Split file references into chunks
        const chunks = splitArrayIntoChunks(uniqueFileReferences, chunkSize);
        enhancedLog(`Split file references into ${chunks.length} chunks of max size ${chunkSize}`);
        
        // Process each chunk
        for (let i = 0; i < chunks.length; i++) {
          const chunk = chunks[i];
          enhancedLog(`Processing chunk ${i + 1} of ${chunks.length} with ${chunk.length} file references`);
          
          // Update progress
          const chunkProgress = (i / chunks.length) * 80; // 80% of progress bar for chunks
          setSavingProgress(10 + chunkProgress); // Start at 10%, end at 90%
          updateSaveProgress(10 + chunkProgress);
          
          if (i < chunks.length - 1) {
            // Process all chunks except the last one - just save file references
            updateSaveProgressText(`Saving files: chunk ${i + 1} of ${chunks.length}...`);
            await sendFileReferencesOnlyMutation(chunk);
          } else {
            // Process the last chunk with the folder position
            updateSaveProgressText("Finalizing album...");
            await sendFinalChunkWithFolderMutation(chunk, folderPositionInput);
          }
        }
      }
      
      // Complete the save process
      setSavingProgress(100);
      updateSaveProgress(100);
      updateSaveProgressText("Album saved successfully!");
      handleSuccessfulSave();
      
    } catch (error) {
      console.error("Error in chunked save process:", error);
      enhancedLog(`Error in chunked save process: ${error}`);
      updateSaveProgressText(`Error: ${error}`);
      setIsSavingAlbum(false);
    }
  };
  
  // Helper to update progress text
  const updateSaveProgressText = (text: string) => {
    enhancedLog(`Save progress text: ${text}`);
    const saveProgressText = document.getElementById('saveProgressText');
    if (saveProgressText) {
      saveProgressText.innerText = t(text);
    }
  };
  
  // NEW: Mutation for saving only folder position (no file references)
  const sendFolderOnlyMutation = async (folderPositionInput: any) => {
    enhancedLog("Sending folder-only mutation (no file references)");
    
    const token = await checkLoginWithRefresh();
    if (!token) {
      enhancedLog("No token available for saving album, aborting");
      throw new Error("Authentication token not available");
    }
    
    const mutation = `
      mutation MyMutation($folderPositionInputs: [FolderPositionInput!]) {
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items {
            id
          }
        }
      }
    `;

    const variables = {
      folderPositionInputs: [folderPositionInput]
    };

    enhancedLog("GraphQL folder-only mutation variables:", variables);

    try {
      enhancedLog("Sending API request to save folder");
      const response = await fetch(AWS_PRIVATE_GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: mutation, variables }),
      });
      
      enhancedLog(`API response status: ${response.status}`);
      
      const responseText = await response.text();
      enhancedLog(`API response raw text: ${responseText}`);
      
      const json = JSON.parse(responseText);
      enhancedLog("API response JSON:", json);

      if (json.errors) {
        console.error("Folder save failed:", json.errors);
        enhancedLog(`Folder save failed with errors:`, json.errors);
        throw new Error("Failed to save folder");
      }
      
      enhancedLog("Folder saved successfully");
      return json.data?.changeFiles?.items || [];
    } catch (error) {
      console.error("Error in sendFolderOnlyMutation:", error);
      enhancedLog(`Error in sendFolderOnlyMutation: ${error}`);
      throw error;
    }
  };
  
  // NEW: Mutation for saving file references only (for all chunks except the last)
  const sendFileReferencesOnlyMutation = async (fileReferenceInputs: FileReferenceInput[]) => {
    enhancedLog(`Sending file references-only mutation with ${fileReferenceInputs.length} items`);
    
    const token = await checkLoginWithRefresh();
    if (!token) {
      enhancedLog("No token available for saving file references, aborting");
      throw new Error("Authentication token not available");
    }
    
    const mutation = `
      mutation MyMutation($updatedFileReferenceInputs: [UpdatedFileReferenceInput!]) {
        changeFiles0(updatedFileReferenceInputs: $updatedFileReferenceInputs) {
          items {
            ... on FileReference {
              id
              createdAt
              updatedAt
              fileId
              file {
                dataKey
                thumbnailDataKey
              }
            }
          }
        }
      }
    `;

    const variables = {
      updatedFileReferenceInputs: fileReferenceInputs
    };

    enhancedLog("GraphQL file references-only mutation variables (first item):", 
      fileReferenceInputs.length > 0 ? fileReferenceInputs[0] : "No items");

    try {
      enhancedLog("Sending API request to save file references");
      const response = await fetch(AWS_PRIVATE_GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: mutation, variables }),
      });
      
      enhancedLog(`API response status: ${response.status}`);
      
      const responseText = await response.text();
      enhancedLog(`API response raw text: ${responseText.substring(0, 500)}...`); // Log first 500 chars to avoid huge logs
      
      const json = JSON.parse(responseText);
      enhancedLog("API response JSON items count:", json.data?.changeFiles0?.items?.length || 0);

      if (json.errors) {
        console.error("File references save failed:", json.errors);
        enhancedLog(`File references save failed with errors:`, json.errors);
        throw new Error("Failed to save file references");
      }
      
      enhancedLog("File references chunk saved successfully");
      return json.data?.changeFiles0?.items || [];
    } catch (error) {
      console.error("Error in sendFileReferencesOnlyMutation:", error);
      enhancedLog(`Error in sendFileReferencesOnlyMutation: ${error}`);
      throw error;
    }
  };
  
  // NEW: Mutation for saving the final chunk with folder position
  const sendFinalChunkWithFolderMutation = async (fileReferenceInputs: FileReferenceInput[], folderPositionInput: any) => {
    enhancedLog(`Sending final chunk with folder mutation (${fileReferenceInputs.length} file references)`);
    
    const token = await checkLoginWithRefresh();
    if (!token) {
      enhancedLog("No token available for saving final chunk, aborting");
      throw new Error("Authentication token not available");
    }
    
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
      updatedFileReferenceInputs: fileReferenceInputs,
    };

    enhancedLog("GraphQL final mutation variables (folder + last chunk)");

    try {
      enhancedLog("Sending API request for final save with folder");
      const response = await fetch(AWS_PRIVATE_GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: mutation, variables }),
      });
      
      enhancedLog(`API response status: ${response.status}`);
      
      const responseText = await response.text();
      enhancedLog(`API response raw text: ${responseText.substring(0, 500)}...`); // First 500 chars
      
      const json = JSON.parse(responseText);
      enhancedLog("API response JSON:", {
        fileReferencesCount: json.data?.changeFiles0?.items?.length || 0,
        folderItems: json.data?.changeFiles?.items || []
      });

      if (json.errors) {
        console.error("Final save failed:", json.errors);
        enhancedLog(`Final save failed with errors:`, json.errors);
        throw new Error("Failed to complete album save");
      }
      
      enhancedLog("Final chunk and folder saved successfully");
      return {
        fileReferences: json.data?.changeFiles0?.items || [],
        folderPositions: json.data?.changeFiles?.items || []
      };
    } catch (error) {
      console.error("Error in sendFinalChunkWithFolderMutation:", error);
      enhancedLog(`Error in sendFinalChunkWithFolderMutation: ${error}`);
      throw error;
    }
  };
  
  const validateRequiredData = async () => {
    enhancedLog("Validating required data");
    const token = await checkLoginWithRefresh();
    
    if (!token) {
      enhancedLog("No token available, validation failed");
      return false;
    }
    
    if (!cognitoUsername) {
      enhancedLog("No Cognito username, validation failed");
      return false;
    }
    
    if (!folderId) {
      enhancedLog("No folder ID, validation failed");
      return false;
    }
    
    enhancedLog("All required data validated successfully");
    return true;
  };
  
  const updateSaveProgress = (progress: number) => {
    // Update progress in UI
    const progressBar = document.getElementById('saveProgress');
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
      enhancedLog(`Updated save progress bar: ${progress}%`);
    } else {
      enhancedLog("Progress bar element not found");
    }
    setSavingProgress(progress);
  };
  
  const createFolderPositionInput = (
    timestamp: number, 
    accountId: string, 
    folderTargetItemIdentifier: string
  ) => {
    enhancedLog("Creating folder position input");
    enhancedLog(`Profile visibility: ${isOnPublicProfile ? 'Public' : 'Only Me'}`);
    
    // Use the correct profileIds based on the toggle state
    const profileIds = isOnPublicProfile 
      ? [`${cognitoUsername}_____Public____Profile`] 
      : ["Only Me_____Only Me____Profile"];
      
    enhancedLog(`Profile IDs: ${JSON.stringify(profileIds)}`);
      
    // Create acceptedFileReferenceIds based on whether it's a sub-album or not
    let acceptedFileReferenceIds: string[] = [];
    
    if (isSubAlbum && selectedFileIds.length > 0) {
      enhancedLog(`Creating file reference IDs for ${selectedFileIds.length} sub-album files`);
      // For sub-albums, create file reference IDs by extracting the fileName from fileId
      acceptedFileReferenceIds = selectedFileIds.map(fileId => {
        // Extract fileName from fileId
        // fileId format: "{accountOwnerItemId}_____{fileName}____File"
        const parts = fileId.split('_____');
        if (parts.length >= 2) {
          const fileNameWithSuffix = parts[1]; // This will include "____File" at the end
          const fileName = fileNameWithSuffix.split('____')[0]; // Get just the fileName part
          
          // Create a new file reference ID with the current target identifier
          const refId = `${folderTargetItemIdentifier}_____${fileName}____FileReference`;
          enhancedLog(`Created file reference ID for sub-album: ${refId}`);
          return refId;
        }
        enhancedLog(`Using original fileId as fallback: ${fileId}`);
        return fileId; // Fallback to original fileId if parsing fails
      });
    }
    
    enhancedLog(`Created ${acceptedFileReferenceIds.length} acceptedFileReferenceIds`);
    
    const folderPassword = passwordProtectionOption !== 'noPassword' ? albumPassword : null;
    const passwordPolicy = PasswordPolicyEnum[passwordProtectionOption.charAt(0).toUpperCase() + passwordProtectionOption.slice(1) as keyof typeof PasswordPolicyEnum];
    
    enhancedLog(`Password protection: ${passwordProtectionOption}`);
    enhancedLog(`Password policy: ${passwordPolicy}`);
    enhancedLog(`Album password: ${folderPassword ? '******' : 'null'}`);
    enhancedLog(`Participants can add items: ${participantsCanAddItems}`);
    
    return {
      currentTime: timestamp,
      folderId,
      profileIds,
      folderPositionSelectedTagInputs: [],
      folderPositionPoints: 1,
      acceptedFileReferenceIds,
      folderInput: {
        folderSelectedTagInputs: [],
        folderAboutContactIds: [accountId],
        folderName: folderName,
        folderDescription: folderDescription,
        folderPasswordInput: {
          password: folderPassword,
          policy: passwordPolicy
        },
        folderInviteParametersInput: {
          folderIsOnlyVisibleThroughCode: true,
          folderInviteHasBeenDisabled: false,
          usingFolderInviteGrantsRightToRemoveItems: false,
          tagContactIdUsingFolderInviteAsFolderAboutContact: true,
          usingFolderInviteGrantsRightToAddItems: participantsCanAddItems,
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
    enhancedLog(`Creating file reference inputs for ${validPhotos.length} photos`);
    
    return validPhotos.map(photo => {
      // If the photo already has a fileId (from a sub-album), use that directly
      if (photo.fileId) {
        enhancedLog(`Using existing fileId for photo: ${photo.fileId}`);
        return {
          fileReferencesHolderId: folderId!,
          currentTime: timestamp,
          points: 1,
          hasBeenDeleted: false,
          selectedTagInputs: [],
          fileId: photo.fileId,
          fileInput: null // No file input needed for existing files
        };
      }
      
      // Otherwise, create a new file reference for uploaded files
      const dataKey = photo.type === "video" || photo.type?.startsWith("video")
        ? `Input/Video/${photo.fileName}`
        : `Input/Image/${photo.fileName}`;

      const fileId = `${cognitoUsername}_____${photo.fileName}____File`;
      
      enhancedLog(`Created file reference for ${photo.fileName}:`);
      enhancedLog(`  - dataKey: ${dataKey}`);
      enhancedLog(`  - fileId: ${fileId}`);
      enhancedLog(`  - thumbnailDataKey: ${photo.thumbnailDataKey || 'undefined'}`);
      enhancedLog(`  - size: ${photo.size}`);
      enhancedLog(`  - thumbnailSize: ${photo.thumbnailSize || 0}`);
      enhancedLog(`  - duration: ${photo.duration || 'undefined'}`);

      return {
        fileReferencesHolderId: folderId!,
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
  
  const handleSuccessfulSave = () => {
    enhancedLog("Handling successful save");
    // Clear all album data before redirecting
    clearAlbumData(setSelectedPhotos, setProgressTracker, [LOCAL_STORAGE_KEYS.SELECTED_PHOTOS, LOCAL_STORAGE_KEYS.SUB_ALBUM_DATA], log);
    enhancedLog("Album data cleared");
    
    const saveSuccessText = document.getElementById('saveProgressText');
    if (saveSuccessText) {
      saveSuccessText.innerText = t('Album saved successfully!');
      enhancedLog("Updated progress text to 'Album saved successfully!'");
    }
    
    // Set a flag in sessionStorage that we just completed an album
    sessionStorage.setItem('album_just_saved', 'true');
    enhancedLog("Set 'album_just_saved' flag in sessionStorage");
    
    // Slight delay before redirect for user to see success message
    enhancedLog("Setting timeout for redirect to my-albums.html");
    setTimeout(() => {
      enhancedLog("Redirecting to my-albums.html");
      window.location.href = "/my-albums.html";
    }, 1000);
  };

  // ---------- USERNAME MANAGEMENT ----------
  
  const validateUsername = (username: string) => {
    const isValid = /^[a-zA-Z0-9-]+$/.test(username);
    enhancedLog(`Username validation for '${username}': ${isValid}`);
    return isValid;
  };

  const submitUsername = async (proposedName: string) => {
    enhancedLog(`Submitting username: ${proposedName}`);
    setIsSubmittingUsername(true);
    setUsernameError("");

    const token = await checkLoginWithRefresh();
    if (!token) {
      enhancedLog("No token available for username submission");
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

    enhancedLog("Username mutation variables:", variables);

    try {
      enhancedLog("Sending API request to save username");
      const res = await fetch(AWS_PRIVATE_GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: mutation, variables }),
      });

      const json = await res.json();
      enhancedLog("Username API response:", json);
      
      const newName = json?.data?.changeMyAccountItem?.anyDisplayName;

      if (newName) {
        enhancedLog(`Username successfully changed to: ${newName}`);
        handleSuccessfulUsernameUpdate(newName);
      } else {
        enhancedLog("Username change failed - likely already taken");
        throw new Error("Username taken");
      }
    } catch (e) {
      enhancedLog(`Error submitting username: ${e}`);
      setUsernameError(t('Username is already taken. Please try a different one.'));
      setShowAltButton(true);
      setIsSubmittingUsername(false);
    }
  };
  
  const handleSuccessfulUsernameUpdate = (newName: string) => {
    enhancedLog(`Handling successful username update to: ${newName}`);
    localStorage.setItem("publicUsername", newName);
    setPublicUsername(newName);
    setShowUsernamePrompt(false);
    
    // Automatically proceed with saving the album
    enhancedLog("Proceeding to save album after username update");
    saveAlbumDirectly();
  };

  const appendRandomDigits = () => {
    const digits = Math.floor(100000 + Math.random() * 900000).toString();
    const modified = `${usernameInput}${digits}`;
    enhancedLog(`Appending random digits to username: ${usernameInput} -> ${modified}`);
    setUsernameInput(modified);
    submitUsername(modified);
  };

  // ---------- PASSWORD MANAGEMENT ----------

  const handleClosePasswordDialog = (option?: ProtectionOption, password?: string) => {
    enhancedLog(`Password dialog closed with option: ${option}, password: ${password ? '******' : 'undefined'}`);
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
    enhancedLog("Opening password dialog");
    setShowPasswordDialog(true);
  };

  // ========== RENDER METHODS ==========

  return (
    <>
      <GlobalStyle />
      <AppContainer isRTL={isRTL}>
        <ContentContainer>
          {/* Header Section */}
          <HeaderContainer>
            <BackLinkContainer>
              <BackLink href="/my-albums.html">
                {t('My Albums')}
              </BackLink>
            </BackLinkContainer>
            
            <LogoutButton t={t} />
            </HeaderContainer>
          
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
                <SavingProgressBar id="saveProgress" style={{ width: `${savingProgress}%` }} />
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
          
          {/* Enhanced Sub-album message with thumbnails */}
          {isSubAlbum && (selectedPhotos.length > 0 || selectedFileIds.length > 0) && (
            <div style={{ 
              backgroundColor: '#e3f2fd', 
              padding: '15px', 
              borderRadius: '8px', 
              marginBottom: '20px',
              fontSize: '16px'
            }}>
              <p style={{ margin: 0 }}>
                {t('Creating a new sub-album with')} <strong>{selectedFileIds.length}</strong> {t('selected items')}
              </p>
              <p style={{ margin: '10px 0 0 0', fontSize: '14px', color: '#0277bd' }}>
                {t('You can add more photos or videos to this sub-album before saving')}
              </p>
              
              {/* Show thumbnails of selected photos if available */}
              {selectedPhotos.length > 0 && (
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '10px', 
                  marginTop: '15px',
                  justifyContent: 'flex-start'
                }}>
                  {selectedPhotos.slice(0, 5).map((photo, index) => (
                    <div key={index} style={{ 
                      width: '80px', 
                      height: '80px', 
                      position: 'relative', 
                      borderRadius: '4px',
                      overflow: 'hidden',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.12)'
                    }}>
                      <img 
                        src={photo.s3PreviewUrl} 
                        alt={photo.fileName} 
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover' 
                        }} 
                      />
                      {photo.type === 'video' && (
                        <div style={{
                          position: 'absolute',
                          bottom: '5px',
                          right: '5px',
                          backgroundColor: 'rgba(0,0,0,0.7)',
                          color: 'white',
                          fontSize: '10px',
                          padding: '2px 4px',
                          borderRadius: '2px'
                        }}>
                          {photo.duration ? `${Math.floor(photo.duration)}s` : 'Video'}
                        </div>
                      )}
                    </div>
                  ))}
                  {selectedPhotos.length > 5 && (
                    <div style={{ 
                      width: '80px', 
                      height: '80px', 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#bbdefb',
                      borderRadius: '4px',
                      color: '#0d47a1',
                      fontWeight: 'bold'
                    }}>
                      +{selectedPhotos.length - 5} {t('more')}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          
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
            
            {/* Folder Details - Only show if user is creator */}
            {showFolderDetails && isCreator === true && (
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
                
                {/* Public Profile Toggle */}
                <ToggleContainer>
                  <ToggleLabel>
                    {isOnPublicProfile ? t('On Public Profile') : t('Not On Public Profile')}
                  </ToggleLabel>
                  <ToggleSwitch>
                    <input 
                      type="checkbox" 
                      checked={isOnPublicProfile} 
                      onChange={handlePublicProfileToggle}
                      disabled={isSavingAlbum}
                    />
                    <ToggleSlider />
                  </ToggleSwitch>
                </ToggleContainer>

                {/* Participants Can Add Items Toggle */}
                <ToggleContainer>
                  <ToggleLabel>
                    {participantsCanAddItems ? t('Participants Can Add Items') : t('Participants Cannot Add Items')}
                  </ToggleLabel>
                  <ToggleSwitch>
                    <input 
                      type="checkbox" 
                      checked={participantsCanAddItems} 
                      onChange={handleParticipantsCanAddItemsToggle}
                      disabled={isSavingAlbum}
                    />
                    <ToggleSlider />
                  </ToggleSwitch>
                </ToggleContainer>
              </FolderDetails>
            )}
            
            {/* Add Photos button - Show for both regular albums and sub-albums */}
            <SecondaryButton
              onClick={() => {
                const input = document.getElementById("file-input") as HTMLInputElement;
                input?.click();
              }}
              disabled={isSavingAlbum}
            >
              {t('Add More Photos')}
            </SecondaryButton>
            
            {/* Only show password button if user is creator */}
            {isCreator === true && (
              <PasswordButton
                passwordSet={passwordProtectionOption !== 'noPassword'}
                onClick={handleOpenPasswordDialog}
                disabled={isSavingAlbum}
              >
                {getPasswordPolicyButtonText()}
              </PasswordButton>
            )}

            <PrimaryButton
              onClick={handleSaveAlbum}
              disabled={isSavingAlbum}
            >
              {isSavingAlbum ? t('Saving Album...') : t('Save Album')}
            </PrimaryButton>
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