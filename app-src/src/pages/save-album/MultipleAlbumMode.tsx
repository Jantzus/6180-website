// MultipleAlbumMode.tsx - Multiple album creation mode component
import React, { useState, useEffect } from 'react';
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n/translations";
import { PasswordPolicyEnum, SelectedPhoto } from "@/lib/types";
import { LOCAL_STORAGE_KEYS } from "@/lib/config";
import { redirectTo } from "@/lib/utils";
import { generateUUID as utilGenerateUUID, clearFolderStructureMetadata } from "@/lib/folderStructureUtils";
import { MultipleAlbumsManager, AlbumData } from "./MultipleAlbumsManager";
import { PasswordDialog } from "@/components/PasswordDialog";
import { 
  GearButton,
  GlobalSettingsMenu 
} from "./GlobalSettingsMenu";
import {
  GlobalStyle,
  FixedHeader,
  FixedHeaderContent,
  Body,
  ProfileLink,
  Button,
  HeaderControlLabel,
  HeaderControlSelect
} from "@/styles/styled-components";
import { GlobalSettings, AppliedTag } from "./album-types";

// Updated MultipleAlbumMode component
export const MultipleAlbumMode: React.FC = () => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";
  
  const [multipleAlbums, setMultipleAlbums] = useState<AlbumData[]>([]);
  const [columns, setColumns] = useState<string>('2');
  const [showGlobalGear, setShowGlobalGear] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [currentPasswordAlbumId, setCurrentPasswordAlbumId] = useState<string | null>(null);
  const [globalSettings, setGlobalSettings] = useState<GlobalSettings>({
    isOnPublicProfile: false,
    participantsCanAddItems: true,
    participantsCanDeleteItems: false,
    passwordProtectionOption: 'NoPassword' as PasswordPolicyEnum,
    albumPassword: ''
  });

  // Enhanced logging function
  const enhancedLog = (message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`, data);
  };

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

  // Save individual album
  const handleSaveAlbum = async (albumId: string) => {
    const album = multipleAlbums.find(a => a.id === albumId);
    if (!album) return;

    if (album.photos.length === 0) {
      alert(t('The album "{{albumName}}" has no photos to save.', { albumName: album.name }));
      return;
    }

    setMultipleAlbums(prev => prev.map(a => 
      a.id === albumId ? { ...a, isSaving: true, savingProgress: 0 } : a
    ));

    try {
      const albumFolderId = `${Date.now()}_____${utilGenerateUUID()}____Folder`;
      
      setMultipleAlbums(prev => prev.map(a => 
        a.id === albumId ? { ...a, folderId: albumFolderId } : a
      ));

      // Simulate saving process
      for (let progress = 10; progress <= 100; progress += 20) {
        setMultipleAlbums(prev => prev.map(a => 
          a.id === albumId ? { ...a, savingProgress: progress } : a
        ));
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      setMultipleAlbums(prev => prev.map(a => 
        a.id === albumId ? { ...a, isSaving: false, savingProgress: 100 } : a
      ));
      
    } catch (error) {
      console.error(`Error saving album ${albumId}:`, error);
      setMultipleAlbums(prev => prev.map(a => 
        a.id === albumId ? { ...a, isSaving: false, savingProgress: 0 } : a
      ));
      alert(t('Failed to save album "{{albumName}}". Please try again.', { albumName: album.name }));
    }
  };

  // Save all albums
  const handleSaveAllAlbums = async () => {
    const unsavedAlbums = multipleAlbums.filter(album => album.savingProgress < 100);
    
    if (unsavedAlbums.length === 0) return;

    try {
      for (const album of unsavedAlbums) {
        await handleSaveAlbum(album.id);
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      const failedAlbums = multipleAlbums.filter(album => 
        unsavedAlbums.some(ua => ua.id === album.id) && album.savingProgress < 100
      );

      if (failedAlbums.length === 0) {
        setTimeout(() => {
          localStorage.removeItem(LOCAL_STORAGE_KEYS.MULTI_ALBUM_DATA);
          clearFolderStructureMetadata();
          redirectTo("my-albums.html");
        }, 1000);
      }
      
    } catch (error) {
      console.error("Error saving all albums:", error);
      alert(t("There was an error saving some albums. Please try again."));
    }
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

  const isSavingAny = multipleAlbums.some(album => album.isSaving);
  const hasUnsavedAlbums = multipleAlbums.some(album => album.savingProgress < 100);

  return (
    <>
      <GlobalStyle />
      
      <FixedHeader>
        <FixedHeaderContent>
          <ProfileLink href="my-albums.html">
            {t('Back to Albums')}
          </ProfileLink>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
            {hasUnsavedAlbums && !isSavingAny && (
              <Button
                $primary
                onClick={handleSaveAllAlbums}
                style={{
                  minWidth: '120px',
                  fontSize: '14px',
                  padding: '8px 16px'
                }}
              >
                {multipleAlbums.length === 1 
                  ? t('Save 1 Album')
                  : t('Save {{count}} Albums', { count: multipleAlbums.length })
                }
              </Button>
            )}
          </div>
        </FixedHeaderContent>
      </FixedHeader>

      <Body $isRTL={isRTL}>
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
    </>
  );
};