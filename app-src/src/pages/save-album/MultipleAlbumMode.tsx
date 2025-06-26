// MultipleAlbumMode.tsx - Fixed to use real save functionality
import React, { useState, useEffect } from 'react';
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n/translations";
import { PasswordPolicyEnum, SelectedPhoto } from "@/lib/types";
import { LOCAL_STORAGE_KEYS } from "@/lib/config";
import { redirectTo, generateUrl, checkLoginWithRefresh } from "@/lib/utils";
import { generateUUID as utilGenerateUUID, clearFolderStructureMetadata } from "@/lib/folderStructureUtils";
import { moveFilesToPublic } from "@/lib/file-upload-utils";
import { useUsernameManagement } from "@/lib/useUsernameManagement";
import { AlbumService } from "./services/album.service";
import { MultipleAlbumsManager, AlbumData } from "./MultipleAlbumsManager";
import { PasswordDialog } from "@/components/PasswordDialog";
import { UsernamePrompt } from "@/components/UsernamePrompt";
import { 
  GearButton,
  GlobalSettingsMenu 
} from "./GlobalSettingsMenu";
import { 
  FixedHeader,
  FixedHeaderContent,
} from "@/styles/components/layout";
import { 
  Body, 
} from "@/styles/components/layout";
import { 
  BackButton,
  Button,
} from "@/styles/components/buttons";

import { GlobalStyle } from "@/styles/globalStyles";
import { theme } from "@/styles/theme";
import styled from 'styled-components';
import { GlobalSettings, AppliedTag } from "./types/album-types";
import { FileReferenceInput } from "./types/album-types";
import { 
  createFolderPositionInput,
  createFileReferenceInputs,
  removeDuplicateFileReferences,
  splitArrayIntoChunks
} from "./utils/album.utils";


const HeaderControlLabel = styled.span`
  font-size: ${theme.fontSizes.sm}; // 14px to match other header elements
  color: ${theme.colors.text.secondary}; // Subtle gray like other controls
  font-weight: 500;
  white-space: nowrap;
  display: flex;
  align-items: center;
`;

const HeaderControlSelect = styled.select`
  padding: 6px 12px;
  border-radius: ${theme.borderRadius.medium};
  border: 1px solid ${theme.colors.borderLight};
  background-color: ${theme.colors.white};
  font-size: ${theme.fontSizes.sm}; // 14px to match label
  cursor: pointer;
  box-shadow: ${theme.boxShadow.sm};
  min-width: 60px;
  transition: all 0.2s ease;
  color: ${theme.colors.text.primary};
  
  &:hover {
    border-color: ${theme.colors.border};
    box-shadow: ${theme.boxShadow.md};
  }
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.boxShadow.focusGlow};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: ${theme.colors.grayLighter};
  }
`;

// Updated MultipleAlbumMode component with real save functionality
export const MultipleAlbumMode: React.FC = () => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";
  
  const [multipleAlbums, setMultipleAlbums] = useState<AlbumData[]>([]);
  const [columns, setColumns] = useState<string>('2');
  const [showGlobalGear, setShowGlobalGear] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [currentPasswordAlbumId, setCurrentPasswordAlbumId] = useState<string | null>(null);
  const [cognitoUsername, setCognitoUsername] = useState<string | null>(null);
  const [isSavingAll, setIsSavingAll] = useState(false);
  const [currentSavingIndex, setCurrentSavingIndex] = useState(0);
  const [totalAlbumsToSave, setTotalAlbumsToSave] = useState(0);
  const [currentSavingAlbumName, setCurrentSavingAlbumName] = useState<string>('');
  const [globalSettings, setGlobalSettings] = useState<GlobalSettings>({
    isOnPublicProfile: false,
    participantsCanAddItems: true,
    participantsCanDeleteItems: false,
    passwordProtectionOption: 'NoPassword' as PasswordPolicyEnum,
    albumPassword: ''
  });

  // Username management for save operations
  const usernameManager = useUsernameManagement(t);
  const {
    setShowUsernamePrompt,
    setUsernameInput
  } = usernameManager;

  // Separate state for public username
  const [publicUsername, setPublicUsername] = useState<string | null>(null);

  // Initialize public username
  useEffect(() => {
    const savedUsername = localStorage.getItem(LOCAL_STORAGE_KEYS.PUBLIC_USERNAME);
    setPublicUsername(savedUsername || null);
  }, []);

  // Enhanced logging function - FIXED: Line 194 - Replace any with unknown
  const enhancedLog = (message: string, data?: unknown) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`, data);
  };

  // Extract username on mount
  useEffect(() => {
    const initializeUsername = async () => {
      try {
        const token = await checkLoginWithRefresh();
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const username = payload["cognito:username"];
          if (username) {
            setCognitoUsername(username);
            enhancedLog(`Initialized Cognito username: ${username}`);
          }
        }
      } catch (error) {
        console.error("Error initializing username:", error);
      }
    };

    initializeUsername();
  }, []);

  // Handle columns change with localStorage save
  const handleColumnsChange = (newColumns: string) => {
    setColumns(newColumns);
    localStorage.setItem('save-album-columns', newColumns);
    enhancedLog(`Column setting changed to ${newColumns} for all albums`);
  };

  // Load multi-album data on mount
  useEffect(() => {
    const multiAlbumDataStr = localStorage.getItem(LOCAL_STORAGE_KEYS.MULTI_ALBUM_DATA);
    
    if (multiAlbumDataStr) {
      try {
        const multiAlbumData: { name: string; selectedPhotos: SelectedPhoto[]; folderPath: string; }[] = JSON.parse(multiAlbumDataStr);
        
        // Validate the data structure
        const validAlbumData = multiAlbumData.filter(group => {
          if (!group || !group.name || !Array.isArray(group.selectedPhotos)) {
            return false;
          }
          
          const validPhotos = group.selectedPhotos.filter(photo => {
            return photo && photo.fileName && photo.originalFileName && 
                   photo.s3PreviewUrl && photo.s3PreviewUrl.includes('amazonaws.com');
          });
          
          group.selectedPhotos = validPhotos;
          return validPhotos.length > 0;
        });
        
        if (validAlbumData.length === 0) {
          alert(t("No valid albums were found. Please try selecting your files again."));
          redirectTo("my-albums.html");
          return;
        }
        
        // Convert to AlbumData format
        const albumsData: AlbumData[] = validAlbumData.map((group) => ({
          id: utilGenerateUUID(),
          name: group.name,
          description: '',
          photos: group.selectedPhotos,
          selectedPhotoIndices: new Set<number>(),
          photoTagsMap: new Map<number, AppliedTag[]>(),
          isOnPublicProfile: false,
          participantsCanAddItems: true,
          participantsCanDeleteItems: false,
          passwordProtectionOption: 'NoPassword' as PasswordPolicyEnum,
          albumPassword: '',
          isSaving: false,
          savingProgress: 0,
          folderId: ''
        }));
        
        setMultipleAlbums(albumsData);
        clearFolderStructureMetadata();
      } catch (error) {
        console.error("Error parsing multi-album data:", error);
        alert(t("There was an error loading your albums. Please try selecting your files again."));
        redirectTo("my-albums.html");
      }
    } else {
      alert(t("No album data was found. Please try selecting your files again."));
      redirectTo("my-albums.html");
    }
  }, [t]);

  // Set default columns
  useEffect(() => {
    const savedColumnsValue = localStorage.getItem('save-album-columns') || '2';
    setColumns(savedColumnsValue);
  }, []);

  // Update progress text helper
  const updateProgressText = (albumId: string, text: string) => {
    enhancedLog(`Album ${albumId} progress: ${text}`);
    // Note: In a real implementation, you might want to store progress messages
    // in state and display them in the UI
  };

  // Update progress helper
  const updateProgress = (albumId: string, progress: number) => {
    setMultipleAlbums(prev => prev.map(a => 
      a.id === albumId ? { ...a, savingProgress: progress } : a
    ));
  };

  // Real save album function using the same logic as single album mode - FIXED: Line 78
  const saveAlbumWithChunking = async (
    albumId: string,
    folderPositionInput: Record<string, unknown>, // FIXED: Line 78 - was any
    fileReferenceInputs: FileReferenceInput[]
  ) => {
    enhancedLog(`Starting chunked save for album ${albumId}`);
    updateProgressText(albumId, t("Processing files in chunks..."));
    
    const chunkSize = 48;
    
    if (fileReferenceInputs.length === 0) {
      enhancedLog(`No file references for album ${albumId}, saving only folder position`);
      await AlbumService.saveFolderOnly(folderPositionInput, enhancedLog);
    } else {
      const uniqueFileReferences = removeDuplicateFileReferences(fileReferenceInputs);
      enhancedLog(`Album ${albumId}: Processing ${uniqueFileReferences.length} unique file references`);
      
      const chunks = splitArrayIntoChunks(uniqueFileReferences, chunkSize);
      enhancedLog(`Album ${albumId}: Split into ${chunks.length} chunks`);
      
      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        enhancedLog(`Album ${albumId}: Processing chunk ${i + 1} of ${chunks.length}`);
        
        const chunkProgress = (i / chunks.length) * 80;
        updateProgress(albumId, 10 + chunkProgress);
        
        if (i < chunks.length - 1) {
          updateProgressText(albumId, t('Saving files: chunk {{chunkNumber}} of {{totalChunks}}...', { 
            chunkNumber: i + 1, 
            totalChunks: chunks.length 
          }));
          await AlbumService.saveFileReferences(chunk, enhancedLog);
        } else {
          updateProgressText(albumId, t("Finalizing album..."));
          await AlbumService.saveFinalChunkWithFolder(chunk, folderPositionInput, enhancedLog);
        }
      }
    }
    
    updateProgress(albumId, 100);
    updateProgressText(albumId, t("Album saved successfully!"));
  };

  // Real save individual album function
  const handleSaveAlbum = async (albumId: string): Promise<boolean> => {
    const album = multipleAlbums.find(a => a.id === albumId);
    if (!album) {
      enhancedLog(`Album ${albumId} not found`);
      return false;
    }

    if (album.photos.length === 0) {
      alert(t('The album "{{albumName}}" has no photos to save.', { albumName: album.name }));
      return false;
    }

    if (!cognitoUsername) {
      enhancedLog(`No Cognito username available for album ${albumId}`);
      return false;
    }

    enhancedLog(`Starting real save for album: ${album.name}`);
    
    // Set saving state
    setMultipleAlbums(prev => prev.map(a => 
      a.id === albumId ? { ...a, isSaving: true, savingProgress: 5 } : a
    ));

    try {
      // Generate folder ID and prepare data
      const now = Math.floor(Date.now() / 1000);
      const albumFolderId = `${cognitoUsername}_____${utilGenerateUUID()}____Folder`;
      const accountId = `${cognitoUsername}_____${cognitoUsername}____Account`;
      const folderParts = albumFolderId.split("_____");
      const folderTargetItemIdentifier = folderParts[1].split("____")[0];
      
      enhancedLog(`Album ${albumId} folder ID: ${albumFolderId}`);
      
      // Update album with folder ID
      setMultipleAlbums(prev => prev.map(a => 
        a.id === albumId ? { ...a, folderId: albumFolderId } : a
      ));

      // Create folder position input
      const folderPositionInput = createFolderPositionInput(
        now,
        accountId,
        folderTargetItemIdentifier,
        albumFolderId,
        cognitoUsername,
        album.isOnPublicProfile,
        album.participantsCanAddItems,
        album.participantsCanDeleteItems,
        album.passwordProtectionOption,
        album.albumPassword,
        album.name,
        album.description,
        false, // isSubAlbum
        [], // selectedFileIds
        enhancedLog
      );

      // Get valid photos
      const validPhotos = album.photos.filter(photo => photo.status === 'complete');
      enhancedLog(`Album ${albumId}: ${validPhotos.length} valid photos`);

      let fileReferenceInputs: FileReferenceInput[] = [];

      if (validPhotos.length > 0) {
        // Move files from temp to public folder for new uploads
        const newUploads = validPhotos.filter(photo => !photo.fileId);
        if (newUploads.length > 0) {
          enhancedLog(`Album ${albumId}: Moving ${newUploads.length} files to public folder`);
          updateProgressText(albumId, t('Moving files...'));
          
          await moveFilesToPublic(
            newUploads,
            (progress) => updateProgress(albumId, progress),
            enhancedLog
          );
        }

        // Create file reference inputs (no tags for multiple album mode for now)
        enhancedLog(`Album ${albumId}: Creating file reference inputs`);
        fileReferenceInputs = createFileReferenceInputs(
          validPhotos,
          now,
          accountId,
          albumFolderId,
          cognitoUsername,
          album.photoTagsMap,
          enhancedLog
        );
      }

      // Save with chunking
      await saveAlbumWithChunking(albumId, folderPositionInput, fileReferenceInputs);

      // Mark as complete
      setMultipleAlbums(prev => prev.map(a => 
        a.id === albumId ? { ...a, isSaving: false, savingProgress: 100 } : a
      ));

      enhancedLog(`Successfully saved album: ${album.name}`);
      return true;

    } catch (error) {
      console.error(`Error saving album ${albumId}:`, error);
      enhancedLog(`Error saving album ${albumId}: ${error}`);
      
      setMultipleAlbums(prev => prev.map(a => 
        a.id === albumId ? { ...a, isSaving: false, savingProgress: 0 } : a
      ));
      
      alert(t('Failed to save album "{{albumName}}". Please try again.', { albumName: album.name }));
      return false;
    }
  };

  // Save all albums with real functionality and progress tracking - FIXED: Line 392
  const handleSaveAllAlbums = async () => {
    // Check username first
    if (publicUsername?.startsWith("Profile-")) {
      setUsernameInput("");
      setShowUsernamePrompt(true);
      return;
    }

    if (!cognitoUsername) {
      alert(t("Unable to determine user credentials. Please refresh and try again."));
      return;
    }

    const unsavedAlbums = multipleAlbums.filter(album => album.savingProgress < 100);
    
    if (unsavedAlbums.length === 0) return;

    enhancedLog(`Starting save process for ${unsavedAlbums.length} albums`);

    // Set up progress tracking
    setIsSavingAll(true);
    setTotalAlbumsToSave(unsavedAlbums.length);
    setCurrentSavingIndex(0);

    // FIXED: Line 392 - Removed unused successfulSaves variable
    const failedAlbums: string[] = [];

    try {
      for (let i = 0; i < unsavedAlbums.length; i++) {
        const album = unsavedAlbums[i];
        
        // Update progress tracking
        setCurrentSavingIndex(i + 1);
        setCurrentSavingAlbumName(album.name);
        
        enhancedLog(`Saving album ${i + 1} of ${unsavedAlbums.length}: ${album.name}`);
        
        const success = await handleSaveAlbum(album.id);
        if (!success) {
          failedAlbums.push(album.name);
        }
        
        // Small delay between saves
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      if (failedAlbums.length === 0) {
        // All albums saved successfully
        enhancedLog("All albums saved successfully, cleaning up and redirecting");
        setTimeout(() => {
          localStorage.removeItem(LOCAL_STORAGE_KEYS.MULTI_ALBUM_DATA);
          clearFolderStructureMetadata();
          sessionStorage.setItem('album_just_saved', 'true');
          redirectTo("my-albums.html");
        }, 1000);
      } else {
        // Some albums failed
        const message = failedAlbums.length === 1 
          ? t('Failed to save album "{{albumName}}". Please try again.', { albumName: failedAlbums[0] })
          : t('Failed to save {{count}} albums: {{albumNames}}. Please try again.', { 
              count: failedAlbums.length, 
              albumNames: failedAlbums.join(', ')
            });
        alert(message);
      }
      
    } catch (error) {
      console.error("Error in save all albums:", error);
      alert(t("There was an error saving albums. Please try again."));
    } finally {
      // Reset progress tracking
      setIsSavingAll(false);
      setCurrentSavingIndex(0);
      setTotalAlbumsToSave(0);
      setCurrentSavingAlbumName('');
    }
  };

  // Handle successful username update
  const handleSuccessfulUsernameUpdate = (newName: string) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.PUBLIC_USERNAME, newName);
    setPublicUsername(newName);
    setShowUsernamePrompt(false);
    // Reset any progress state before retrying
    setIsSavingAll(false);
    setCurrentSavingIndex(0);
    setTotalAlbumsToSave(0);
    setCurrentSavingAlbumName('');
    // Retry save after username update
    handleSaveAllAlbums();
  };

  // Handle showing password dialog for individual album
  const handleShowPasswordDialog = (albumId: string) => {
    const album = multipleAlbums.find(a => a.id === albumId);
    if (album) {
      setCurrentPasswordAlbumId(albumId);
      setGlobalSettings(prev => ({
        ...prev,
        passwordProtectionOption: album.passwordProtectionOption,
        albumPassword: album.albumPassword
      }));
      setShowPasswordDialog(true);
    }
  };

  // Handle showing password dialog for global settings
  const handleGlobalPasswordClick = () => {
    setCurrentPasswordAlbumId(null); // Indicates global settings
    setShowPasswordDialog(true);
  };

  // Handle password dialog close
  const handleClosePasswordDialog = (option?: PasswordPolicyEnum, password?: string) => {
    if (option !== undefined && password !== undefined) {
      if (currentPasswordAlbumId) {
        // Update specific album
        setMultipleAlbums(prev => prev.map(album => 
          album.id === currentPasswordAlbumId 
            ? { ...album, passwordProtectionOption: option, albumPassword: password }
            : album
        ));
      } else {
        // Update global settings
        setGlobalSettings(prev => ({
          ...prev,
          passwordProtectionOption: option,
          albumPassword: password
        }));
      }
    }
    
    setShowPasswordDialog(false);
    setCurrentPasswordAlbumId(null);
  };

  // Apply global settings to all albums
  const applyGlobalSettings = () => {
    setMultipleAlbums(prev => prev.map(album => ({
      ...album,
      isOnPublicProfile: globalSettings.isOnPublicProfile,
      participantsCanAddItems: globalSettings.participantsCanAddItems,
      participantsCanDeleteItems: globalSettings.participantsCanDeleteItems,
      passwordProtectionOption: globalSettings.passwordProtectionOption,
      albumPassword: globalSettings.albumPassword
    })));
    setShowGlobalGear(false);
    enhancedLog('Applied global settings to all albums', globalSettings);
  };

  // Remove album
  const handleRemoveAlbum = (albumId: string) => {
    const albumToRemove = multipleAlbums.find(a => a.id === albumId);
    if (albumToRemove && !confirm(t('Are you sure you want to remove the album "{{albumName}}"?', { albumName: albumToRemove.name }))) {
      return;
    }
    
    const updatedAlbums = multipleAlbums.filter(a => a.id !== albumId);
    setMultipleAlbums(updatedAlbums);
    
    if (updatedAlbums.length === 0) {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.MULTI_ALBUM_DATA);
      clearFolderStructureMetadata();
      redirectTo("my-albums.html");
    }
  };

  const isSavingAny = multipleAlbums.some(album => album.isSaving) || isSavingAll;
  const hasUnsavedAlbums = multipleAlbums.some(album => album.savingProgress < 100);

  return (
    <>
      <GlobalStyle />
      
      {/* Add spinner animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      
      <FixedHeader>
        <FixedHeaderContent style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexDirection: isRTL ? 'row-reverse' : 'row'
        }}>
          <div style={{ 
            order: isRTL ? 2 : 1,
            textAlign: isRTL ? 'right' : 'left'
          }}>
            <BackButton onClick={() => redirectTo(generateUrl('my-albums.html'))}>
              {t('← Back To Albums')}
            </BackButton>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            order: isRTL ? 1 : 2,
            flexDirection: isRTL ? 'row-reverse' : 'row'
          }}>
            {/* Global column selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <HeaderControlLabel>
                {t('Columns:')}
              </HeaderControlLabel>
              <HeaderControlSelect
                value={columns}
                onChange={(e) => handleColumnsChange(e.target.value)}
                disabled={isSavingAny}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </HeaderControlSelect>
            </div>

            {/* Global gear menu */}
            <div style={{ position: 'relative' }}>
              <GearButton
                onClick={() => setShowGlobalGear(!showGlobalGear)}
                disabled={isSavingAny}
                title={t('Global Settings for All Albums')}
              />
              <GlobalSettingsMenu
                showGlobalGear={showGlobalGear}
                globalSettings={globalSettings}
                setGlobalSettings={setGlobalSettings}
                onPasswordClick={handleGlobalPasswordClick}
                onApplySettings={applyGlobalSettings}
              />
            </div>

            {/* Save all albums button */}
            {hasUnsavedAlbums && (
              <Button
                $primary
                onClick={handleSaveAllAlbums}
                disabled={isSavingAny}
                style={{
                  minWidth: '160px',
                  fontSize: '14px',
                  padding: '8px 16px'
                }}
              >
                {isSavingAll ? (
                  t('Saving {{current}} of {{total}}...', { 
                    current: currentSavingIndex, 
                    total: totalAlbumsToSave 
                  })
                ) : multipleAlbums.length === 1 ? (
                  t('Save 1 Album')
                ) : (
                  t('Save {{count}} Albums', { count: multipleAlbums.filter(a => a.savingProgress < 100).length })
                )}
              </Button>
            )}
          </div>
        </FixedHeaderContent>
      </FixedHeader>

      <Body $isRTL={isRTL}>
        {/* Global saving progress indicator */}
        {isSavingAll && (
          <div style={{
            marginBottom: '24px',
            padding: '20px',
            backgroundColor: '#e3f2fd',
            border: '2px solid #2196f3',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(33, 150, 243, 0.1)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '16px'
            }}>
              <div style={{
                width: '24px',
                height: '24px',
                border: '3px solid #e3f2fd',
                borderTop: '3px solid #2196f3',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              <div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#1565c0',
                  marginBottom: '4px'
                }}>
                  {t('Saving Albums')} ({currentSavingIndex} / {totalAlbumsToSave})
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#1976d2'
                }}>
                  {t('Currently saving: {{albumName}}', { albumName: currentSavingAlbumName })}
                </div>
              </div>
            </div>
            
            {/* Progress bar */}
            <div style={{
              width: '100%',
              height: '8px',
              backgroundColor: '#bbdefb',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${(currentSavingIndex / totalAlbumsToSave) * 100}%`,
                height: '100%',
                backgroundColor: '#2196f3',
                transition: 'width 0.3s ease',
                borderRadius: '4px'
              }} />
            </div>
            
            <div style={{
              marginTop: '8px',
              fontSize: '12px',
              color: '#1976d2',
              textAlign: 'center'
            }}>
              {t('Please wait while your albums are being saved...')}
            </div>
          </div>
        )}

        <MultipleAlbumsManager
          albums={multipleAlbums}
          setAlbums={setMultipleAlbums}
          isSavingAny={isSavingAny}
          onSaveAlbum={handleSaveAlbum}
          onRemoveAlbum={handleRemoveAlbum}
          onShowPasswordDialog={handleShowPasswordDialog}
          columns={columns}
          setColumns={handleColumnsChange}
          enhancedLog={enhancedLog}
        />
      </Body>

      {/* Password Dialog */}
      <PasswordDialog 
        isOpen={showPasswordDialog} 
        onClose={handleClosePasswordDialog}
        initialOption={currentPasswordAlbumId ? 
          multipleAlbums.find(a => a.id === currentPasswordAlbumId)?.passwordProtectionOption || 'NoPassword' :
          globalSettings.passwordProtectionOption
        }
        initialPassword={currentPasswordAlbumId ?
          multipleAlbums.find(a => a.id === currentPasswordAlbumId)?.albumPassword || '' :
          globalSettings.albumPassword
        }
      />

      {/* Username Prompt */}
      <UsernamePrompt
        t={t}
        language={language}
        usernameManager={usernameManager}
        onSuccess={handleSuccessfulUsernameUpdate}
      />
    </>
  );
};