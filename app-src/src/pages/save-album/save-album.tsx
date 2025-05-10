import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

// Import styled components
import {
  GlobalStyle,
  AppContainer,
  HeaderContainer,
  ProfileLink,
  ActionButtons,
  PrimaryButton,
  SecondaryButton,
  PasswordButton,
  HiddenFileInput
} from "@/styles/styled-components";
import { UsernamePrompt } from "@/components/UsernamePrompt";

import { LOCAL_STORAGE_KEYS } from "@/lib/config";
import { 
  ProgressTracker,
  SelectedPhoto,
  PasswordPolicyEnum
} from "@/lib/types";

import { I18nProvider, useTranslation } from "@/components/LanguageSelector";
import { getLanguageDirection } from "@/lib/i18n/translations";
import { PasswordDialog } from "@/components/PasswordDialog";
import { LogoutButton } from "@/components/LogoutButton";
import { DebugLog } from "@/components/DebugLog";
import { useUsernameManagement } from "@/lib/customHooks";

// Import utility functions from file-upload-utils
import { 
  createLogger,
  createPhotoStatusUpdater,
  updateProgressTracker,
  processFilesBeforeUploadingToS3,
} from "@/lib/file-upload-utils";

// Import custom hooks
import { 
  useAlbumInitialization, 
  useAlbumSave,
  createInitialPhotoObjects,
  updatePhotosWithProcessedInfo
} from "./albumHooks";

// Import components
import {
  PhotoHandler,
  ProgressTrackerComponent,
  SavingProgressComponent,
  SubAlbumInfo,
  FolderDetailsComponent
} from "./albumComponents";

// ========== MAIN COMPONENT ==========

const SaveAlbum = () => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";

  // Use the username management hook
  const {
    setShowUsernamePrompt,
    setUsernameInput
  } = useUsernameManagement(t);

  // Core state
  const [folderId, setFolderId] = useState<string | null>(null);
  const [selectedPhotos, setSelectedPhotos] = useState<SelectedPhoto[]>([]);
  const [debugMessages, setDebugMessages] = useState<string[]>([]);
  
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
  const [passwordProtectionOption, setPasswordProtectionOption] = useState<PasswordPolicyEnum>('NoPassword');
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

  // Use the album initialization hook
  const { cognitoUsername, publicUsername, setPublicUsername } = useAlbumInitialization(
    setFolderId,
    setSelectedPhotos,
    setIsCreator,
    setShowFolderDetails,
    setFolderName,
    setFolderDescription,
    setIsOnPublicProfile,
    setParticipantsCanAddItems,
    setPasswordProtectionOption,
    setAlbumPassword,
    setIsSubAlbum,
    setSelectedFileIds,
    enhancedLog
  );

  // Use the album save hook
  const { saveAlbumDirectly } = useAlbumSave(
    folderId,
    cognitoUsername,
    selectedPhotos,
    isSubAlbum,
    selectedFileIds,
    folderName,
    folderDescription,
    isOnPublicProfile,
    participantsCanAddItems,
    passwordProtectionOption,
    albumPassword,
    setIsSavingAlbum,
    setSavingProgress,
    setSelectedPhotos,
    setProgressTracker,
    enhancedLog
  );

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
        enhancedLog
      );
      
      // Update selected photos with processed info
      enhancedLog(`Updating ${processedPhotos.length} photos with processed info`);
      updatePhotosWithProcessedInfo(currentIndex, processedPhotos, setSelectedPhotos, enhancedLog);
    } catch (error) {
      console.error("Error in handleAddPhotos:", error);
      enhancedLog(`Error in handleAddPhotos: ${error}`);
    } finally {
      e.target.value = "";
      enhancedLog("Reset file input value");
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

  // Handle successful username update - callback for the username hook
  const handleSuccessfulUsernameUpdate = (newName: string) => {
    enhancedLog(`Handling successful username update to: ${newName}`);
    localStorage.setItem("publicUsername", newName);
    setPublicUsername(newName);
    setShowUsernamePrompt(false);
    
    // Automatically proceed with saving the album
    enhancedLog("Proceeding to save album after username update");
    saveAlbumDirectly();
  };

  // ---------- PASSWORD MANAGEMENT ----------

  const handleClosePasswordDialog = (option?: PasswordPolicyEnum, password?: string) => {
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
    if (passwordProtectionOption === 'NoPassword') {
      return t('Album Password Policy');
    }
    
    const optionText = 
      passwordProtectionOption === 'NotVisible' ? t('Password Required To See Or Save') :
      passwordProtectionOption === 'Watermark' ? t('Password Required To Remove Watermark Or Save') :
      t('Password Required To Save');
    
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
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Header Section */}
          <HeaderContainer>
            <ProfileLink href="/my-albums.html">
              {t('My Albums')}
            </ProfileLink>

            <LogoutButton t={t} />
          </HeaderContainer>
          
          {/* Progress Tracking */}
          <ProgressTrackerComponent progressTracker={progressTracker} />
          
          {/* Saving Progress */}
          <SavingProgressComponent 
            isSavingAlbum={isSavingAlbum} 
            savingProgress={savingProgress} 
          />
          
          {/* Hidden File Input */}
          <HiddenFileInput
            id="file-input"
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleAddPhotos}
          />
          
          {/* Enhanced Sub-album message with thumbnails */}
          <SubAlbumInfo 
            isSubAlbum={isSubAlbum} 
            selectedPhotos={selectedPhotos} 
            selectedFileIds={selectedFileIds} 
          />
          
          {/* Photo Grid */}
          <PhotoHandler 
            selectedPhotos={selectedPhotos}
            isSavingAlbum={isSavingAlbum}
            onRemovePhoto={removePhoto}
          />
          
          {/* Action Buttons */}
          <ActionButtons>
            
            {/* Folder Details - Only show if user is creator */}
            <FolderDetailsComponent
              showFolderDetails={showFolderDetails}
              isCreator={isCreator}
              folderName={folderName}
              setFolderName={setFolderName}
              folderDescription={folderDescription}
              setFolderDescription={setFolderDescription}
              isOnPublicProfile={isOnPublicProfile}
              handlePublicProfileToggle={handlePublicProfileToggle}
              participantsCanAddItems={participantsCanAddItems}
              handleParticipantsCanAddItemsToggle={handleParticipantsCanAddItemsToggle}
              isSavingAlbum={isSavingAlbum}
            />
            
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
                passwordSet={passwordProtectionOption !== 'NoPassword'}
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
          <UsernamePrompt
            t={t}
            language={language}
            usernameManager={useUsernameManagement(t)} // Pass the hook return value directly
            onSuccess={handleSuccessfulUsernameUpdate}
          />
          
          {/* Password Dialog */}
          {showPasswordDialog && (
            <PasswordDialog 
              isOpen={showPasswordDialog} 
              onClose={handleClosePasswordDialog}
              initialOption={passwordProtectionOption}
              initialPassword={albumPassword} 
            />
          )}
        </div>

        {/* Debug Log */}
        <DebugLog 
          debugMessages={debugMessages} 
          t={t} 
          isRTL={isRTL}
          textDirection={isRTL ? "rtl" : "ltr"} 
        />
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