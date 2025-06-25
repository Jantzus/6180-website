// SingleAlbumMode.tsx - Complete fixed version with tags functionality restored
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n/translations";
import { PasswordPolicyEnum, FOLDERPOSITION_FIELD } from "@/lib/types";
import { 
  LOCAL_STORAGE_KEYS, 
  AWS_PRIVATE_GRAPHQL_ENDPOINT 
} from "@/lib/config";
import { checkLoginWithRefresh } from "@/lib/utils";
import { prewarmCredentials } from "@/lib/s3";
import { useFileUploadProcessor } from "@/lib/useFileUploadProcessor";
import { useUsernameManagement } from "@/lib/useUsernameManagement";
import { 
  useAlbumInitialization, 
} from "./hooks/useAlbumInitialization";
import { 
  useAlbumSave 
} from "./hooks/useAlbumSave";
import { 
  ExistingFilesSection, 
  NewPhotosSection 
} from "./FileSections";
import { 
  GearButton,
  SingleAlbumSettingsMenu 
} from "./GlobalSettingsMenu";
import {
  FolderDetailsComponent,
  SavingProgressComponent
} from "./components";
import { UsernamePrompt } from "@/components/UsernamePrompt";
import { UploadProgress } from "@/components/UploadProgress";
import { PasswordDialog } from "@/components/PasswordDialog";
import { DebugLog } from "@/components/DebugLog";
import {
  GlobalStyle,
  FixedHeader,
  FixedHeaderContent,
  Body,
  ProfileLink,
  ActionButtons,
  Button
} from "@/styles/styled-components";
import { FileState, ExistingFile, AppliedTag } from "./types/album-types";
import { AlbumService } from "./services/album.service";
import { useTagsManagement } from "./useTagsManagement";
import { TagsDisplay } from "./TagDisplayComponents";

// Enhanced circuit breaker with cooldown
const useCircuitBreaker = (componentName: string, maxRenders = 50, timeWindow = 3000) => {
  const renderCount = useRef(0);
  const lastResetTime = useRef(Date.now());
  const isBlocked = useRef(false);
  const blockStartTime = useRef(0);

  const now = Date.now();
  
  // Reset counter if time window has passed
  if (now - lastResetTime.current > timeWindow) {
    renderCount.current = 0;
    lastResetTime.current = now;
    
    // Only unblock after a longer cooldown period
    if (isBlocked.current && now - blockStartTime.current > 10000) {
      isBlocked.current = false;
      console.log(`🔄 Circuit breaker reset for ${componentName}`);
    }
  }

  renderCount.current++;

  if (renderCount.current > maxRenders && !isBlocked.current) {
    isBlocked.current = true;
    blockStartTime.current = now;
    console.error(`🚨 CIRCUIT BREAKER ACTIVATED for ${componentName}! Renders: ${renderCount.current}`);
  }

  return { 
    isBlocked: isBlocked.current, 
    renderCount: renderCount.current,
    reset: () => {
      renderCount.current = 0;
      lastResetTime.current = Date.now();
      isBlocked.current = false;
    }
  };
};



// Main component with all original functionality restored
export const SingleAlbumMode: React.FC = () => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";
  
  // Circuit breaker protection
  const { isBlocked, renderCount, reset } = useCircuitBreaker('SingleAlbumMode');
  
  // Show safe UI if blocked
  if (isBlocked) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center', 
        backgroundColor: '#ffebee',
        border: '2px solid #f44336',
        borderRadius: '8px',
        margin: '20px'
      }}>
        <h2>🚨 Component Temporarily Blocked</h2>
        <p>The component was rendering too frequently and has been safely stopped.</p>
        <p>Render count: {renderCount}</p>
        <button 
          onClick={reset}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Reset Component
        </button>
        <button 
          onClick={() => window.location.reload()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Reload Page
        </button>
      </div>
    );
  }

  // Consolidated file state
  const [fileState, setFileState] = useState<FileState>({
    selectedPhotoIndices: new Set(),
    photoTagsMap: new Map(),
    selectedExistingIndices: new Set(),
    existingFileTagsMap: new Map()
  });

  // Username management
  const usernameManager = useUsernameManagement(t);
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
  
  // Public profile and participant settings
  const [isOnPublicProfile, setIsOnPublicProfile] = useState<boolean>(false);
  const [participantsCanAddItems, setParticipantsCanAddItems] = useState<boolean>(true);
  const [participantsCanDeleteItems, setParticipantsCanDeleteItems] = useState<boolean>(false);
  
  // State for checking if user is the creator
  const [isCreator, setIsCreator] = useState<boolean | null>(null);

  // State for sub-album data
  const [isSubAlbum, setIsSubAlbum] = useState<boolean>(false);
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([]);

  // State for columns - default to desktop assumption (2 columns)
  const [columns, setColumns] = useState<string>('2');

  // State for existing files
  const [existingFiles, setExistingFiles] = useState<ExistingFile[]>([]);
  const [isLoadingExistingFiles, setIsLoadingExistingFiles] = useState(false);
  const [isDeletingFiles, setIsDeletingFiles] = useState(false);

  // State for single album gear menu
  const [showSingleGear, setShowSingleGear] = useState(false);
  const singleGearRef = useRef<HTMLDivElement>(null);

  // Enhanced logging function - memoized to prevent re-creation
  const enhancedLog = useCallback((message: string, data?: unknown) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`, data);
  }, []);

  // Custom navigation function for the useFileUploadProcessor hook
  const navigateAfterUpload = useCallback((uploadedFolderId: string | null) => {
    if (!folderId && uploadedFolderId) {
      setFolderId(uploadedFolderId);
    }
  }, [folderId]);

  // File upload processor
  const fileUploadProcessor = useFileUploadProcessor(navigateAfterUpload, true);
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
    setOnSaveAlbumPage,
  } = fileUploadProcessor;

  // Album initialization
  const albumInitialization = useAlbumInitialization(
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
    setParticipantsCanDeleteItems,
    enhancedLog
  );
  
  const { cognitoUsername, publicUsername, setPublicUsername } = albumInitialization;

  // Tags management - now using the full implementation
  const tagsManager = useTagsManagement(
    fileState.photoTagsMap,
    (newPhotoTagsMap) => {
      setFileState(prev => ({
        ...prev,
        photoTagsMap: typeof newPhotoTagsMap === 'function' 
          ? newPhotoTagsMap(prev.photoTagsMap)
          : newPhotoTagsMap
      }));
    },
    fileState.existingFileTagsMap,
    (newExistingFileTagsMap) => {
      setFileState(prev => ({
        ...prev,
        existingFileTagsMap: typeof newExistingFileTagsMap === 'function'
          ? newExistingFileTagsMap(prev.existingFileTagsMap)
          : newExistingFileTagsMap
      }));
    },
    fileState.selectedPhotoIndices,
    fileState.selectedExistingIndices,
    enhancedLog
  );

  // Album save hook
  const albumSave = useAlbumSave(
    folderId || currentFolderId,
    cognitoUsername,
    selectedPhotos,
    isSubAlbum,
    selectedFileIds,
    folderName,
    folderDescription,
    isOnPublicProfile,
    participantsCanAddItems,
    participantsCanDeleteItems,
    passwordProtectionOption,
    albumPassword,
    fileState.photoTagsMap,
    fileState.existingFileTagsMap,
    existingFiles,
    fileState.selectedExistingIndices,
    setIsSavingAlbum,
    setSavingProgress,
    setSelectedPhotos,
    setProgressTracker,
    enhancedLog,
    t
  );
  
  const { saveAlbumDirectly } = albumSave;

  // SSR-safe columns initialization
  useEffect(() => {
    const savedColumnsValue = localStorage.getItem('save-album-columns') || '2';
    setColumns(savedColumnsValue);
  }, []);

  // SSR-safe columns save to localStorage when changed
  const handleColumnsChange = useCallback((newColumns: string) => {
    setColumns(newColumns);
    localStorage.setItem('save-album-columns', newColumns);
  }, []);

  // SSR-safe click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (singleGearRef.current && !singleGearRef.current.contains(event.target as Node)) {
        setShowSingleGear(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Set that we're on the save-album page
  useEffect(() => {
    setOnSaveAlbumPage(true);
    return () => setOnSaveAlbumPage(false);
  }, [setOnSaveAlbumPage]);

  // Prewarm S3 credentials when the page loads
  useEffect(() => {
    const warmUpPageCredentials = async () => {
      try {
        await prewarmCredentials();
      } catch (error) {
        console.warn("Credential prewarming failed:", error);
      }
    };
    
    warmUpPageCredentials();
  }, []);

  // Function to fetch existing album data with fileReferenceId
  const fetchExistingAlbumData = useCallback(async (albumFolderId: string) => {
    if (!albumFolderId) return;
    
    setIsLoadingExistingFiles(true);

    try {
      const token = await checkLoginWithRefresh();
      if (!token) return;

      const foldersQuery = `
        mutation FetchRelations($fetchRelationsInput: FetchRelationsInput!) {
          fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
            items {
              ... on FolderPosition {
                ${FOLDERPOSITION_FIELD}
              }
            }
          }
        }
      `;

      const variables = {
        fetchRelationsInput: {
          ownerItemId: "myAccountOwnerItemId",
          rangeKeyPrefix: "FolderPosition",
          index: "ownerItemId_____RelationType____sortParameter",
          limit: 2000,
          scanIndexForward: false,
        },
      };

      const response = await fetch(AWS_PRIVATE_GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: foldersQuery, variables }),
      });

      const json = await response.json();

      if (json.errors) {
        console.error("GraphQL errors:", json.errors);
        return;
      }

      const items = json?.data?.fetchRelations?.items || [];
      
      const targetFolder = items.find((item: Record<string, unknown>) => 
        item && 
        item.folder && 
        (item.folder as Record<string, unknown>).id === albumFolderId
      );

      if (!targetFolder) return;

      const folder = (targetFolder as Record<string, unknown>).folder as Record<string, unknown>;
      const fileReferencesPage = folder.fileReferencesPage as Record<string, unknown> | undefined;
      const fileReferences = Array.isArray(fileReferencesPage?.items) ? fileReferencesPage.items : [];
    
      const files: ExistingFile[] = [];
      const existingTagsMap = new Map<number, AppliedTag[]>();
      
      fileReferences.forEach((ref: Record<string, unknown>, index: number) => {
        const file = ref.file as Record<string, unknown>;
        if (file && file.dataKey) {
          let fileName = ref.fileDisplayName as string | undefined;
          
          if (!fileName && file.dataKey) {
            const dataKeyParts = (file.dataKey as string).split('/');
            fileName = dataKeyParts[dataKeyParts.length - 1];
          }
          
          files.push({
            fileReferenceId: ref.id as string,
            dataKey: file.dataKey as string,
            thumbnailDataKey: (file.thumbnailDataKey as string) || null,
            durationInSeconds: (file.durationInSeconds as number) || null,
            dataInBytes: (file.dataInBytes as number) || 0,
            fileName: fileName || undefined
          });
          
          const selectedTags = ref.selectedTags;
          if (Array.isArray(selectedTags) && selectedTags.length > 0) {
            const appliedTags: AppliedTag[] = selectedTags.map((tag: Record<string, unknown>) => ({
              tagTitle: tag.tagTitle as string,
              TagType: tag.TagType as string,
              subtags: Array.isArray(tag.subtags) ? tag.subtags.map((subtag: Record<string, unknown>) => ({
                tagTitle: subtag.tagTitle as string,
                subtagTitle: subtag.subtagTitle as string
              })) : []
            }));
            
            existingTagsMap.set(index, appliedTags);
          }
        }
      });

      setExistingFiles(files);
      setFileState(prev => ({
        ...prev,
        existingFileTagsMap: existingTagsMap
      }));

      if (!folderName && folder.folderName) {
        setFolderName(folder.folderName as string);
      }
      if (!folderDescription && folder.folderDescription) {
        setFolderDescription(folder.folderDescription as string);
      }

    } catch (error) {
      console.error("Failed to fetch existing album data:", error);
    } finally {
      setIsLoadingExistingFiles(false);
    }
  }, [folderName, folderDescription]);

  // Load existing files when folderId changes
  useEffect(() => {
    if (folderId) {
      fetchExistingAlbumData(folderId);
    }
  }, [folderId, fetchExistingAlbumData]);

  // Update folderId when currentFolderId changes
  useEffect(() => {
    if (currentFolderId && !folderId) {
      setFolderId(currentFolderId);
    }
  }, [currentFolderId, folderId]);

  // Clean up selection when files change
  useEffect(() => {
    setFileState(prev => {
      const newSelectedPhotoIndices = new Set<number>();
      const newPhotoTagsMap = new Map<number, AppliedTag[]>();
      
      prev.selectedPhotoIndices.forEach(index => {
        if (index < selectedPhotos.length) {
          newSelectedPhotoIndices.add(index);
        }
      });

      prev.photoTagsMap.forEach((tags, index) => {
        if (index < selectedPhotos.length) {
          newPhotoTagsMap.set(index, tags);
        }
      });
      
      return {
        ...prev,
        selectedPhotoIndices: newSelectedPhotoIndices,
        photoTagsMap: newPhotoTagsMap
      };
    });
  }, [selectedPhotos.length]);

  // Clean up existing file selection when files are removed
  useEffect(() => {
    setFileState(prev => {
      const newSelectedExistingIndices = new Set<number>();
      const newExistingFileTagsMap = new Map<number, AppliedTag[]>();
      
      prev.selectedExistingIndices.forEach(index => {
        if (index < existingFiles.length) {
          newSelectedExistingIndices.add(index);
        }
      });

      prev.existingFileTagsMap.forEach((tags, index) => {
        if (index < existingFiles.length) {
          newExistingFileTagsMap.set(index, tags);
        }
      });
      
      return {
        ...prev,
        selectedExistingIndices: newSelectedExistingIndices,
        existingFileTagsMap: newExistingFileTagsMap
      };
    });
  }, [existingFiles.length]);

  // Photo management functions
  const removePhoto = useCallback((indexToRemove: number) => {
    const updated = selectedPhotos.filter((_, i) => i !== indexToRemove);
    setSelectedPhotos(updated);
    
    try {
      if (updated.length > 0) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.SELECTED_PHOTOS, JSON.stringify(updated));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.SELECTED_PHOTOS);
      }
    } catch (error) {
      console.warn("Failed to update localStorage:", error);
    }

    setFileState(prev => {
      const newSelectedIndices = new Set<number>();
      const newPhotoTagsMap = new Map<number, AppliedTag[]>();
      
      prev.selectedPhotoIndices.forEach(index => {
        if (index < indexToRemove) {
          newSelectedIndices.add(index);
        } else if (index > indexToRemove) {
          newSelectedIndices.add(index - 1);
        }
      });

      prev.photoTagsMap.forEach((tags, index) => {
        if (index < indexToRemove) {
          newPhotoTagsMap.set(index, tags);
        } else if (index > indexToRemove) {
          newPhotoTagsMap.set(index - 1, tags);
        }
      });
      
      return {
        ...prev,
        selectedPhotoIndices: newSelectedIndices,
        photoTagsMap: newPhotoTagsMap
      };
    });
  }, [selectedPhotos, setSelectedPhotos]);

  // Existing file management functions
  const removeExistingFile = useCallback(async (indexToRemove: number) => {
    const fileToRemove = existingFiles[indexToRemove];
    if (!fileToRemove) {
      enhancedLog(`No file found at index ${indexToRemove}`);
      return;
    }

    setIsDeletingFiles(true);
    enhancedLog(`Starting deletion of file reference: ${fileToRemove.fileReferenceId}`);

    try {
      await AlbumService.deleteFileReferences([fileToRemove.fileReferenceId], enhancedLog);
      enhancedLog(`Successfully deleted file reference: ${fileToRemove.fileReferenceId}`);

      const updated = existingFiles.filter((_, i) => i !== indexToRemove);
      setExistingFiles(updated);

      setFileState(prev => {
        const newSelectedIndices = new Set<number>();
        const newExistingTagsMap = new Map<number, AppliedTag[]>();
        
        prev.selectedExistingIndices.forEach(index => {
          if (index < indexToRemove) {
            newSelectedIndices.add(index);
          } else if (index > indexToRemove) {
            newSelectedIndices.add(index - 1);
          }
        });

        prev.existingFileTagsMap.forEach((tags, index) => {
          if (index < indexToRemove) {
            newExistingTagsMap.set(index, tags);
          } else if (index > indexToRemove) {
            newExistingTagsMap.set(index - 1, tags);
          }
        });
        
        return {
          ...prev,
          selectedExistingIndices: newSelectedIndices,
          existingFileTagsMap: newExistingTagsMap
        };
      });

      enhancedLog(`File removed from local state, ${updated.length} files remaining`);
    } catch (error) {
      console.error("Failed to delete file reference:", error);
      enhancedLog(`Failed to delete file reference: ${error}`);
      alert(t("Failed to delete file. Please try again."));
    } finally {
      setIsDeletingFiles(false);
    }
  }, [existingFiles, enhancedLog, t]);

  // Selection functions
  const toggleExistingFileSelection = useCallback((index: number) => {
    setFileState(prev => {
      const updated = new Set(prev.selectedExistingIndices);
      if (updated.has(index)) {
        updated.delete(index);
      } else {
        updated.add(index);
      }
      return { ...prev, selectedExistingIndices: updated };
    });
  }, []);

  const selectAllExistingFiles = useCallback(() => {
    const allIndices = new Set<number>();
    for (let i = 0; i < existingFiles.length; i++) {
      allIndices.add(i);
    }
    setFileState(prev => ({ ...prev, selectedExistingIndices: allIndices }));
  }, [existingFiles.length]);

  const deselectAllExistingFiles = useCallback(() => {
    setFileState(prev => ({ ...prev, selectedExistingIndices: new Set() }));
  }, []);

  const togglePhotoSelection = useCallback((index: number) => {
    setFileState(prev => {
      const updated = new Set(prev.selectedPhotoIndices);
      if (updated.has(index)) {
        updated.delete(index);
      } else {
        updated.add(index);
      }
      return { ...prev, selectedPhotoIndices: updated };
    });
  }, []);

  const selectAllPhotos = useCallback(() => {
    const allIndices = new Set<number>();
    for (let i = 0; i < selectedPhotos.length; i++) {
      allIndices.add(i);
    }
    setFileState(prev => ({ ...prev, selectedPhotoIndices: allIndices }));
  }, [selectedPhotos.length]);

  const deselectAllPhotos = useCallback(() => {
    setFileState(prev => ({ ...prev, selectedPhotoIndices: new Set() }));
  }, []);

  const deleteAllPhotos = useCallback(() => {
    if (confirm(t('Are you sure you want to delete all new files? This action cannot be undone.'))) {
      setSelectedPhotos([]);
      setFileState({
        selectedPhotoIndices: new Set(),
        photoTagsMap: new Map(),
        selectedExistingIndices: new Set(),
        existingFileTagsMap: new Map()
      });
      
      try {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.SELECTED_PHOTOS);
      } catch (error) {
        console.warn("Failed to update localStorage:", error);
      }
    }
  }, [t, setSelectedPhotos]);

  // Album saving
  const handleSaveAlbumSingle = useCallback(async () => {
    if (isSavingAlbum) return; // Prevent multiple saves
    
    setIsSavingAlbum(true);

    try {
      if (publicUsername?.startsWith("Profile-")) {
        setUsernameInput("");
        setShowUsernamePrompt(true);
        setIsSavingAlbum(false);
        return;
      }

      saveAlbumDirectly();
    } catch (err) {
      console.error("Error in handleSaveAlbumSingle:", err);
      setIsSavingAlbum(false);
    }
  }, [isSavingAlbum, publicUsername, setUsernameInput, setShowUsernamePrompt, saveAlbumDirectly]);

  // Handle successful username update
  const handleSuccessfulUsernameUpdate = useCallback((newName: string) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.PUBLIC_USERNAME, newName);
    } catch (error) {
      console.warn("Failed to save username to localStorage:", error);
    }
    setPublicUsername(newName);
    setShowUsernamePrompt(false);
    saveAlbumDirectly();
  }, [setPublicUsername, setShowUsernamePrompt, saveAlbumDirectly]);

  // Handle password dialog close
  const handleClosePasswordDialog = useCallback((option?: PasswordPolicyEnum, password?: string) => {
    if (option) {
      setPasswordProtectionOption(option);
    }
    
    if (password !== undefined) {
      setAlbumPassword(password);
    }
    
    setShowPasswordDialog(false);
  }, []);

  // Handle single album gear menu password click
  const handleSingleAlbumPasswordClick = useCallback(() => {
    setShowPasswordDialog(true);
  }, []);

  // Handle single album gear menu toggles
  const handleToggleSinglePublicProfile = useCallback(() => {
    setIsOnPublicProfile(!isOnPublicProfile);
  }, [isOnPublicProfile]);

  const handleToggleSingleParticipantsCanAdd = useCallback(() => {
    setParticipantsCanAddItems(!participantsCanAddItems);
  }, [participantsCanAddItems]);

  const handleToggleSingleParticipantsCanDelete = useCallback(() => {
    setParticipantsCanDeleteItems(!participantsCanDeleteItems);
  }, [participantsCanDeleteItems]);

  // Handle add photos
  const handleAddPhotos = useCallback(() => {
    openFilePicker(folderId);
  }, [openFilePicker, folderId]);

  // Determine states for UI
  const isTaggingDisabled = isSavingAlbum || isUploading || isLoadingExistingFiles || isDeletingFiles;
  const hasAnyFiles = selectedPhotos.length > 0 || existingFiles.length > 0;

  return (
    <>
      <GlobalStyle />
      
      {/* Debug info in development */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{ 
          position: 'fixed', 
          top: '10px', 
          right: '10px', 
          background: 'rgba(0,0,0,0.8)', 
          color: 'white', 
          padding: '10px',
          borderRadius: '4px',
          fontSize: '12px',
          zIndex: 9999
        }}>
          Renders: {renderCount}
        </div>
      )}
      
      <FixedHeader>
        <FixedHeaderContent>
          <ProfileLink href="my-albums.html">
            {t('Back to Albums')}
          </ProfileLink>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Single album gear menu */}
            {showFolderDetails && isCreator === true && (
              <div ref={singleGearRef} style={{ position: 'relative' }}>
                <GearButton
                  onClick={() => setShowSingleGear(!showSingleGear)}
                  disabled={isTaggingDisabled}
                  title={t('Album Settings')}
                />
                <SingleAlbumSettingsMenu
                  showGear={showSingleGear}
                  isOnPublicProfile={isOnPublicProfile}
                  participantsCanAddItems={participantsCanAddItems}
                  participantsCanDeleteItems={participantsCanDeleteItems}
                  passwordProtectionOption={passwordProtectionOption}
                  albumPassword={albumPassword}
                  onTogglePublicProfile={handleToggleSinglePublicProfile}
                  onToggleParticipantsCanAdd={handleToggleSingleParticipantsCanAdd}
                  onToggleParticipantsCanDelete={handleToggleSingleParticipantsCanDelete}
                  onPasswordClick={handleSingleAlbumPasswordClick}
                  disabled={isTaggingDisabled}
                />
              </div>
            )}

            <Button
              $primary
              onClick={handleSaveAlbumSingle}
              disabled={isTaggingDisabled}
              style={{
                minWidth: '120px',
                fontSize: '14px',
                padding: '8px 16px'
              }}
            >
              {isSavingAlbum ? t('Saving...') : t('Save Album')}
            </Button>
          </div>
        </FixedHeaderContent>
      </FixedHeader>

      <Body $isRTL={isRTL}>
        <div style={{ marginTop: showFolderDetails && isCreator === true ? '3px' : '0' }}>
          <FolderDetailsComponent
            showFolderDetails={showFolderDetails}
            isCreator={isCreator}
            folderName={folderName}
            setFolderName={setFolderName}
            folderDescription={folderDescription}
            setFolderDescription={setFolderDescription}
            isSavingAlbum={isTaggingDisabled}
          />
        </div>

        {(isUploading || 
          (progressTracker.totalFiles > 0 && 
           (progressTracker.filesUploading > 0 || progressTracker.filesProcessing > 0 || 
            progressTracker.filesComplete < progressTracker.totalFiles))) && (
          <UploadProgress
            progressTracker={progressTracker}
            isRTL={getLanguageDirection(language) === "rtl"}
            variant="detailed"
            context="saving"
            isUploading={isUploading}
            showSuccessMessage={false}
            showErrorMessage={true}
            customMessages={{
              error: t('Some photos could not be processed. You can continue with the successfully processed photos.')
            }}
          />
        )}
        
        {isDeletingFiles && (
          <div style={{
            padding: '16px',
            marginBottom: '16px',
            backgroundColor: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '8px',
            color: '#856404',
            textAlign: 'center',
            fontWeight: '500'
          }}>
            {t('Deleting file...')}
          </div>
        )}
        
        {isLoadingExistingFiles && (
          <div style={{
            padding: '16px',
            marginBottom: '16px',
            backgroundColor: '#f8f9fa',
            border: '1px solid #dee2e6',
            borderRadius: '8px',
            color: '#6c757d',
            textAlign: 'center',
            fontStyle: 'italic'
          }}>
            {t('Loading existing files...')}
          </div>
        )}
        
        <input
          ref={fileInputRef}
          id="file-input"
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={(e) => handleFileSelection(e, cognitoUsername)}
          style={{ display: 'none' }}
        />
        
        {showFolderDetails && isCreator === true && hasAnyFiles && (
          <div style={{
            padding: '32px',
            marginBottom: '32px',
            backgroundColor: '#f8f9fa',
            border: '2px solid #e9ecef',
            borderRadius: '12px',
            direction: isRTL ? 'rtl' : 'ltr'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '18px',
              color: '#495057',
              fontWeight: '600',
              marginBottom: '24px',
              flexDirection: isRTL ? 'row-reverse' : 'row'
            }}>
              <span style={{ marginRight: isRTL ? '0' : '12px', marginLeft: isRTL ? '12px' : '0', fontSize: '20px' }}>
                🏷️
              </span>
              {t('Select files to start adding or removing tags')}
            </div>
            
            {existingFiles.length > 0 && (
              <ExistingFilesSection
                existingFiles={existingFiles}
                selectedExistingIndices={fileState.selectedExistingIndices}
                onToggleSelection={toggleExistingFileSelection}
                onSelectAll={selectAllExistingFiles}
                onDeselectAll={deselectAllExistingFiles}
                onDeleteFile={removeExistingFile}
                disabled={isTaggingDisabled}
                isCreator={isCreator}
                participantsCanDeleteItems={participantsCanDeleteItems}
                existingFileTagsMap={fileState.existingFileTagsMap}
                t={t}
                isRTL={isRTL}
              />
            )}

            <NewPhotosSection
              selectedPhotos={selectedPhotos}
              selectedPhotoIndices={fileState.selectedPhotoIndices}
              onToggleSelection={togglePhotoSelection}
              onSelectAll={selectAllPhotos}
              onDeselectAll={deselectAllPhotos}
              onRemovePhoto={removePhoto}
              onDeleteAll={deleteAllPhotos}
              disabled={isTaggingDisabled}
              photoTagsMap={fileState.photoTagsMap}
              columns={columns}
              setColumns={handleColumnsChange}
              t={t}
              isRTL={isRTL}
            />
            
            {/* Tags functionality - now fully restored */}
            {(fileState.selectedPhotoIndices.size > 0 || fileState.selectedExistingIndices.size > 0) && (
              <TagsDisplay 
                tagsManager={tagsManager}
                disabled={isTaggingDisabled}
                enhancedLog={enhancedLog}
              />
            )}
          </div>
        )}
                  
        <SavingProgressComponent 
          isSavingAlbum={isSavingAlbum} 
          savingProgress={savingProgress} 
        />

        <ActionButtons>
          <Button
            onClick={handleAddPhotos}
            disabled={isTaggingDisabled}
          >
            {isUploading ? t('Uploading...') : t('Add More Photos')}
          </Button>
        </ActionButtons>
        
        <UsernamePrompt
          t={t}
          language={language}
          usernameManager={usernameManager}
          onSuccess={handleSuccessfulUsernameUpdate}
        />
        
        <PasswordDialog 
          isOpen={showPasswordDialog} 
          onClose={handleClosePasswordDialog}
          initialOption={passwordProtectionOption}
          initialPassword={albumPassword} 
        />

        <DebugLog 
          debugMessages={debugMessages} 
          t={t} 
          isRTL={isRTL}
          textDirection={isRTL ? "rtl" : "ltr"} 
        />
      </Body>
    </>
  );
};