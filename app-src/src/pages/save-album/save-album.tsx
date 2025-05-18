import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

// Import styled components
import {
  GlobalStyle,
  AppContainer,
  HeaderContainer,
  ProfileLink,
  ActionButtons,
  Button
} from "@/styles/styled-components";
import { UsernamePrompt } from "@/components/UsernamePrompt";
import { UploadProgress } from "@/components/UploadProgress";

import { LOCAL_STORAGE_KEYS } from "@/lib/config";
import { 
  PasswordPolicyEnum
} from "@/lib/types";

import { I18nProvider } from "@/lib/i18n/context";
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n/translations";
import { PasswordDialog } from "@/components/PasswordDialog";
import { LogoutButton } from "@/components/LogoutButton";
import { DebugLog } from "@/components/DebugLog";
import { useUsernameManagement } from "@/lib/customHooks";

// Import the file upload processor hook
import { useFileUploadProcessor } from "@/lib/useFileUploadProcessor";

// Import custom hooks
import { 
  useAlbumInitialization, 
  useAlbumSave
} from "./hooks";

// Import components
import {
  PhotoHandler,
  SavingProgressComponent,
  FolderDetailsComponent
} from "./components";

// ========== MAIN COMPONENT ==========

const SaveAlbum = () => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";

  // Use the username management hook - store the FULL instance
  const usernameManager = useUsernameManagement(t);
  
  // Destructure methods for convenience
  const {
    setShowUsernamePrompt,
    setUsernameInput
  } = usernameManager;

  // Core state for album details
  const [folderId, setFolderId] = useState<string | null>(null);
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
  
  // State for checking if user is the creator - initialize as null (undetermined)
  const [isCreator, setIsCreator] = useState<boolean | null>(null);

  // State for sub-album data
  const [isSubAlbum, setIsSubAlbum] = useState<boolean>(false);
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([]);

  // Custom navigation function for the useFileUploadProcessor hook
  const navigateAfterUpload = (uploadedFolderId: string | null) => {
    // Don't navigate, just set the folder ID if not already set
    if (!folderId && uploadedFolderId) {
      setFolderId(uploadedFolderId);
    }
  };

  // Use the file upload processor hook
  const {
    fileInputRef,
    selectedPhotos,
    setSelectedPhotos,
    isUploading,
    progressTracker,
    setProgressTracker,
    debugMessages,
    currentFolderId,
    openFilePicker,
    handleFileSelection,
    log
  } = useFileUploadProcessor(navigateAfterUpload);

  // Enhanced logging function that uses the log from useFileUploadProcessor
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
    
    // Add to debug messages for UI using the log function from useFileUploadProcessor
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

  // Use the album save hook with all required parameters
  const { saveAlbumDirectly } = useAlbumSave(
    folderId || currentFolderId,
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

  // Update folderId when currentFolderId changes
  useEffect(() => {
    if (currentFolderId && !folderId) {
      setFolderId(currentFolderId);
      enhancedLog(`Updated folder ID from upload processor: ${currentFolderId}`);
    }
  }, [currentFolderId, folderId]);

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
    localStorage.setItem(LOCAL_STORAGE_KEYS.PUBLIC_USERNAME, newName);
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

  // Handle add photos by using the openFilePicker function from the hook
  const handleAddPhotos = () => {
    enhancedLog("Add photos button clicked");
    openFilePicker(folderId);
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
          <UploadProgress 
            progressTracker={progressTracker}
            t={t}
            isRTL={isRTL}
            variant="detailed"
          />
          
          {/* Hidden File Input - now using the ref from the hook */}
          <input
            ref={fileInputRef}
            id="file-input"
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={(e) => handleFileSelection(e, cognitoUsername)}
            style={{ display: 'none' }}
          />
          
          {/* Photo Grid */}
          <PhotoHandler 
            selectedPhotos={selectedPhotos}
            isSavingAlbum={isSavingAlbum || isUploading}
            onRemovePhoto={removePhoto}
          />
          
          {/* Saving Progress */}
          <SavingProgressComponent 
            isSavingAlbum={isSavingAlbum} 
            savingProgress={savingProgress} 
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
              isSavingAlbum={isSavingAlbum || isUploading}
            />
            
            {/* Add Photos button - Show for both regular albums and sub-albums */}
            <Button
              onClick={handleAddPhotos}
              disabled={isSavingAlbum || isUploading}
            >
              {isUploading ? t('Uploading...') : t('Add More Photos')}
            </Button>
            
            {/* Only show password button if user is creator */}
            {isCreator === true && (
              <Button
                passwordSet={passwordProtectionOption !== 'NoPassword'}
                onClick={handleOpenPasswordDialog}
                disabled={isSavingAlbum || isUploading}
              >
                {getPasswordPolicyButtonText()}
              </Button>
            )}

            <Button
              primary
              onClick={handleSaveAlbum}
              disabled={isSavingAlbum || isUploading}
            >
              {isSavingAlbum ? t('Saving Album...') : t('Save Album')}
            </Button>
          </ActionButtons>
          
          {/* Username Prompt Modal */}
          <UsernamePrompt
            t={t}
            language={language}
            usernameManager={usernameManager}
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