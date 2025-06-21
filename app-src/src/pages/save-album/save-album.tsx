import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import React from "react";

// Import styled components
import {
  GlobalStyle,
  FixedHeader,
  FixedHeaderContent,
  Body,
  ProfileLink,
  ActionButtons,
  Button,
  HeaderControlLabel,
  HeaderControlSelect
} from "@/styles/styled-components";
import { UsernamePrompt } from "@/components/UsernamePrompt";
import { UploadProgress } from "@/components/UploadProgress";

import { LOCAL_STORAGE_KEYS, AWS_PRIVATE_GRAPHQL_ENDPOINT } from "@/lib/config";
import { 
  PasswordPolicyEnum,
  FOLDERPOSITION_FIELD,
  SelectedPhoto
} from "@/lib/types";

import { I18nProvider } from "@/lib/i18n/context";
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n/translations";
import { PasswordDialog } from "@/components/PasswordDialog";
import { DebugLog } from "@/components/DebugLog";
import { useUsernameManagement } from "@/lib/useUsernameManagement";
import { prewarmCredentials } from "@/lib/s3";
import { checkLoginWithRefresh, redirectTo } from "@/lib/utils";

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

// Import tags functionality
import { useTagsManagement } from "./useTagsManagement";
import { TagsDisplay } from "./TagDisplayComponents";

// Import LazyImage for existing files display
import { LazyImage } from "@/components/LazyImage";

// Import multiple albums components and utilities
import { MultipleAlbumsManager, AlbumData } from "./MultipleAlbumsManager";
import { generateUUID as utilGenerateUUID, clearFolderStructureMetadata } from "@/lib/folderStructureUtils";

// Interface for existing files
interface ExistingFile {
  dataKey: string;
  thumbnailDataKey: string | null;
  durationInSeconds: number | null;
  dataInBytes: number;
  fileName?: string;
}

// Interface for applied tags
interface AppliedTag {
  tagTitle: string;
  TagType: string;
  subtags: { tagTitle: string; subtagTitle: string; }[];
}

// FIXED: Consolidated file state to avoid complex state synchronization
interface FileState {
  selectedPhotoIndices: Set<number>;
  photoTagsMap: Map<number, AppliedTag[]>;
  selectedExistingIndices: Set<number>;
  existingFileTagsMap: Map<number, AppliedTag[]>;
}

// Updated MultipleAlbumMode component in save-album.tsx
const MultipleAlbumMode: React.FC = () => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";
  
  const [multipleAlbums, setMultipleAlbums] = useState<AlbumData[]>([]);
  const [columns, setColumns] = useState<string>('2');

  // Enhanced logging function
  const enhancedLog = (message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`, data);
  };

  // FIXED: Handle columns change with localStorage save
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
          alert("No valid albums were found. Please try selecting your files again.");
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
        alert("There was an error loading your albums. Please try selecting your files again.");
        redirectTo("my-albums.html");
      }
    } else {
      alert("No album data was found. Please try selecting your files again.");
      redirectTo("my-albums.html");
    }
  }, []);

  // Set default columns
  useEffect(() => {
    const savedColumnsValue = localStorage.getItem('save-album-columns') || '2';
    setColumns(savedColumnsValue);
  }, []);

  // Save individual album
  const handleSaveAlbum = async (albumId: string) => {
    const album = multipleAlbums.find(a => a.id === albumId);
    if (!album) return;

    if (album.photos.length === 0) {
      alert(`The album "${album.name}" has no photos to save.`);
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
      alert(`Failed to save album "${album.name}". Please try again.`);
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
      alert("There was an error saving some albums. Please try again.");
    }
  };

  // Remove album
  const handleRemoveAlbum = (albumId: string) => {
    const albumToRemove = multipleAlbums.find(a => a.id === albumId);
    if (albumToRemove && !confirm(`Are you sure you want to remove the album "${albumToRemove.name}"?`)) {
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
            {/* FIXED: Global column selector for all albums */}
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
                  {t('Save {{count}} Albums', { count: multipleAlbums.length })}
                </Button>
              )}
            </div>

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
                {t('Save {{count}} Albums', { count: multipleAlbums.length })}
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
          columns={columns}
          setColumns={handleColumnsChange} // FIXED: Pass the handler that saves to localStorage
          enhancedLog={enhancedLog}
        />
      </Body>
    </>
  );
};

// FIXED: Single album mode component with consolidated state
const SingleAlbumMode: React.FC = () => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";

  // FIXED: Consolidated file state
  const [fileState, setFileState] = useState<FileState>({
    selectedPhotoIndices: new Set(),
    photoTagsMap: new Map(),
    selectedExistingIndices: new Set(),
    existingFileTagsMap: new Map()
  });

  // Use the username management hook
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
  
  // Public profile toggle state
  const [isOnPublicProfile, setIsOnPublicProfile] = useState<boolean>(false);
  
  // Participants Can Add Items toggle state
  const [participantsCanAddItems, setParticipantsCanAddItems] = useState<boolean>(true);
  
  // Participants Can Delete Items toggle state
  const [participantsCanDeleteItems, setParticipantsCanDeleteItems] = useState<boolean>(false);
  
  // State for checking if user is the creator
  const [isCreator, setIsCreator] = useState<boolean | null>(null);

  // State for sub-album data
  const [isSubAlbum, setIsSubAlbum] = useState<boolean>(false);
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([]);

  // State for columns
  const [columns, setColumns] = useState<string>('2');

  // State for existing files
  const [existingFiles, setExistingFiles] = useState<ExistingFile[]>([]);
  const [isLoadingExistingFiles, setIsLoadingExistingFiles] = useState(false);

  // Enhanced logging function
  const enhancedLog = (message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`, data);
  };

  // Custom navigation function for the useFileUploadProcessor hook
  const navigateAfterUpload = (uploadedFolderId: string | null) => {
    if (!folderId && uploadedFolderId) {
      setFolderId(uploadedFolderId);
    }
  };

  // FIXED: Always call hooks unconditionally
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

  // FIXED: Simplified album initialization - no conditional parameters
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

  // FIXED: Tags management with consolidated state
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

  // Set default columns
  useEffect(() => {
    const savedColumnsValue = localStorage.getItem('save-album-columns') || '2';
    setColumns(savedColumnsValue);
  }, []);

  // Save columns to localStorage when changed
  const handleColumnsChange = (newColumns: string) => {
    setColumns(newColumns);
    localStorage.setItem('save-album-columns', newColumns);
  };

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

  // Function to fetch existing album data
  const fetchExistingAlbumData = async (albumFolderId: string) => {
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
      
      const targetFolder = items.find((item: any) => 
        item && 
        item.folder && 
        item.folder.id === albumFolderId
      );

      if (!targetFolder) return;

      const folder = targetFolder.folder;
      const fileReferences = folder?.fileReferencesPage?.items || [];
    
      const files: ExistingFile[] = [];
      const existingTagsMap = new Map<number, AppliedTag[]>();
      
      fileReferences.forEach((ref: any, index: number) => {
        const file = ref.file;
        if (file && file.dataKey) {
          let fileName = ref.fileDisplayName;
          
          if (!fileName && file.dataKey) {
            const dataKeyParts = file.dataKey.split('/');
            fileName = dataKeyParts[dataKeyParts.length - 1];
          }
          
          files.push({
            dataKey: file.dataKey,
            thumbnailDataKey: file.thumbnailDataKey || null,
            durationInSeconds: file.durationInSeconds || null,
            dataInBytes: file.dataInBytes || 0,
            fileName: fileName || undefined
          });
          
          const selectedTags = ref.selectedTags || [];
          if (selectedTags.length > 0) {
            const appliedTags: AppliedTag[] = selectedTags.map((tag: any) => ({
              tagTitle: tag.tagTitle,
              TagType: tag.TagType,
              subtags: tag.subtags?.map((subtag: any) => ({
                tagTitle: subtag.tagTitle,
                subtagTitle: subtag.subtagTitle
              })) || []
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
        setFolderName(folder.folderName);
      }
      if (!folderDescription && folder.folderDescription) {
        setFolderDescription(folder.folderDescription);
      }

    } catch (error) {
      console.error("Failed to fetch existing album data:", error);
    } finally {
      setIsLoadingExistingFiles(false);
    }
  };

  // Check for query parameters first
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const folderIdParam = urlParams.get('folderId');
    
    if (folderIdParam) {
      setFolderId(folderIdParam);
      setIsSubAlbum(false);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.SUB_ALBUM_DATA);
      setShowFolderDetails(true);
      setIsCreator(true);
    }
  }, []);

  // Load existing files when folderId changes
  useEffect(() => {
    if (folderId) {
      fetchExistingAlbumData(folderId);
    }
  }, [folderId]);

  // Update folderId when currentFolderId changes
  useEffect(() => {
    if (currentFolderId && !folderId) {
      setFolderId(currentFolderId);
    }
  }, [currentFolderId, folderId]);

  // FIXED: Clean up selection when files change - simplified
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

  // FIXED: Removed repetitive mode checking from individual functions
  // Photo management functions
  const removePhoto = (indexToRemove: number) => {
    const updated = selectedPhotos.filter((_, i) => i !== indexToRemove);
    setSelectedPhotos(updated);
    
    if (updated.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.SELECTED_PHOTOS, JSON.stringify(updated));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.SELECTED_PHOTOS);
    }

    // Update file state
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
  };

  // Existing file management functions
  const removeExistingFile = (indexToRemove: number) => {
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
  };

  // Selection functions
  const toggleExistingFileSelection = (index: number) => {
    setFileState(prev => {
      const updated = new Set(prev.selectedExistingIndices);
      if (updated.has(index)) {
        updated.delete(index);
      } else {
        updated.add(index);
      }
      return { ...prev, selectedExistingIndices: updated };
    });
  };

  const selectAllExistingFiles = () => {
    const allIndices = new Set<number>();
    for (let i = 0; i < existingFiles.length; i++) {
      allIndices.add(i);
    }
    setFileState(prev => ({ ...prev, selectedExistingIndices: allIndices }));
  };

  const deselectAllExistingFiles = () => {
    setFileState(prev => ({ ...prev, selectedExistingIndices: new Set() }));
  };

  const togglePhotoSelection = (index: number) => {
    setFileState(prev => {
      const updated = new Set(prev.selectedPhotoIndices);
      if (updated.has(index)) {
        updated.delete(index);
      } else {
        updated.add(index);
      }
      return { ...prev, selectedPhotoIndices: updated };
    });
  };

  const selectAllPhotos = () => {
    const allIndices = new Set<number>();
    for (let i = 0; i < selectedPhotos.length; i++) {
      allIndices.add(i);
    }
    setFileState(prev => ({ ...prev, selectedPhotoIndices: allIndices }));
  };

  const deselectAllPhotos = () => {
    setFileState(prev => ({ ...prev, selectedPhotoIndices: new Set() }));
  };

  const deleteAllPhotos = () => {
    if (confirm(t('Are you sure you want to delete all new files? This action cannot be undone.'))) {
      setSelectedPhotos([]);
      setFileState({
        selectedPhotoIndices: new Set(),
        photoTagsMap: new Map(),
        selectedExistingIndices: new Set(),
        existingFileTagsMap: new Map()
      });
      
      localStorage.removeItem(LOCAL_STORAGE_KEYS.SELECTED_PHOTOS);
    }
  };

  // Album saving
  const handleSaveAlbumSingle = async () => {
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
  };

  // Handle successful username update
  const handleSuccessfulUsernameUpdate = (newName: string) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.PUBLIC_USERNAME, newName);
    setPublicUsername(newName);
    setShowUsernamePrompt(false);
    saveAlbumDirectly();
  };

  // Password management
  const handleClosePasswordDialog = (option?: PasswordPolicyEnum, password?: string) => {
    if (option) {
      setPasswordProtectionOption(option);
    }
    
    if (password !== undefined) {
      setAlbumPassword(password);
    }
    
    setShowPasswordDialog(false);
  };

  // Handle add photos
  const handleAddPhotos = () => {
    openFilePicker(folderId);
  };

  // Determine states for UI
  const isTaggingDisabled = isSavingAlbum || isUploading || isLoadingExistingFiles;
  const hasAnyFiles = selectedPhotos.length > 0 || existingFiles.length > 0;
  const hasSelectedFiles = fileState.selectedPhotoIndices.size > 0 || fileState.selectedExistingIndices.size > 0;

  return (
    <>
      <GlobalStyle />
      
      <FixedHeader>
        <FixedHeaderContent>
          <ProfileLink href="my-albums.html">
            {t('Back to Albums')}
          </ProfileLink>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Button
              $primary
              onClick={handleSaveAlbumSingle}
              disabled={isSavingAlbum || isUploading || isLoadingExistingFiles}
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
            isSavingAlbum={isSavingAlbum || isUploading}
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
            
            <div style={{ marginTop: hasSelectedFiles ? '32px' : '16px' }}>
              <TagsDisplay 
                tagsManager={tagsManager}
                disabled={isTaggingDisabled}
                enhancedLog={enhancedLog}
              />
            </div>
          </div>
        )}
                  
        <SavingProgressComponent 
          isSavingAlbum={isSavingAlbum} 
          savingProgress={savingProgress} 
        />

        <ActionButtons>
          <Button
            onClick={handleAddPhotos}
            disabled={isSavingAlbum || isUploading || isLoadingExistingFiles}
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

// Component imports for existing files and new photos sections
const ExistingFilesSection = ({ 
  existingFiles, 
  selectedExistingIndices, 
  onToggleSelection, 
  onSelectAll, 
  onDeselectAll, 
  onDeleteFile, 
  disabled, 
  isCreator,
  participantsCanDeleteItems,
  existingFileTagsMap,
  t, 
  isRTL 
}: {
  existingFiles: ExistingFile[];
  selectedExistingIndices: Set<number>;
  onToggleSelection: (index: number) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onDeleteFile: (index: number) => void;
  disabled: boolean;
  isCreator: boolean | null;
  participantsCanDeleteItems: boolean;
  existingFileTagsMap: Map<number, AppliedTag[]>;
  t: (key: string) => string;
  isRTL: boolean;
}) => {
  if (existingFiles.length === 0) return null;

  return (
    <div style={{ 
      marginBottom: '32px',
      direction: isRTL ? 'rtl' : 'ltr'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        flexDirection: isRTL ? 'row-reverse' : 'row'
      }}>
        <div>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#333',
            margin: 0
          }}>
            {t('Existing Files')} ({existingFiles.length})
          </h3>
        </div>
        
        <div style={{
          display: 'flex',
          gap: '8px',
          flexDirection: isRTL ? 'row-reverse' : 'row'
        }}>
          <button
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: disabled ? '#f8f9fa' : '#fff',
              color: disabled ? '#999' : '#333',
              cursor: disabled ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease'
            }}
            onClick={selectedExistingIndices.size > 0 ? onDeselectAll : onSelectAll}
            disabled={disabled}
          >
            {selectedExistingIndices.size > 0 ? t('Done Tagging Selected') : t('Select All')}
          </button>
        </div>
      </div>

      <div className="existing-files-grid">
        {existingFiles.map((file, index) => {
          const isSelected = selectedExistingIndices.has(index);
          const appliedTags = existingFileTagsMap.get(index) || [];

          return (
            <div key={`existing-${index}-${file.dataKey}`} className="existing-file-item">
              <div
                className={`existing-file-card ${isSelected ? 'selected' : ''}`}
                onClick={() => !disabled && onToggleSelection(index)}
              >
                <LazyImage
                  thumbnailDataKey={file.thumbnailDataKey}
                  dataKey={file.dataKey}
                  alt={t('Existing file')}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                
                {isSelected && !disabled && (isCreator === true || participantsCanDeleteItems) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(t('Are you sure you want to remove this file?'))) {
                        onDeleteFile(index);
                      }
                    }}
                    className="delete-button"
                    title={t('Remove file')}
                  >
                    ×
                  </button>
                )}

                {file.dataInBytes > 0 && (
                  <div className="file-size">
                    {(file.dataInBytes / (1024 * 1024)).toFixed(1)}{t('MB')}
                  </div>
                )}

                {file.durationInSeconds && (
                  <div className="file-duration">
                    {Math.floor(file.durationInSeconds / 60)}:{String(Math.floor(file.durationInSeconds % 60)).padStart(2, '0')}
                  </div>
                )}
              </div>
              
              <div className="file-info">
                {file.fileName && (
                  <div className={`file-name ${isSelected ? 'selected' : ''}`}>
                    {file.fileName}
                  </div>
                )}
                
                <div className="file-tags">
                  {appliedTags.length > 0 ? (
                    <div className="tags-display">
                      <div className="tags-content">
                        <span className="tag-icon">🏷️</span>
                        <span className="tags-text">
                          {appliedTags.map(tag => {
                            if (tag.subtags.length > 0) {
                              const subtagNames = tag.subtags.map(s => s.subtagTitle).join(', ');
                              return `${tag.tagTitle}: ${subtagNames}`;
                            }
                            return tag.tagTitle;
                          }).join(' • ')}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="no-tags">
                      {t('No tags applied')}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const NewPhotosSection = ({ 
  selectedPhotos,
  selectedPhotoIndices, 
  onToggleSelection, 
  onSelectAll, 
  onDeselectAll, 
  onRemovePhoto,
  onDeleteAll,
  disabled,
  photoTagsMap,
  columns,
  setColumns,
  t, 
  isRTL 
}: {
  selectedPhotos: any[];
  selectedPhotoIndices: Set<number>;
  onToggleSelection: (index: number) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onRemovePhoto: (index: number) => void;
  onDeleteAll: () => void;
  disabled: boolean;
  photoTagsMap: Map<number, AppliedTag[]>;
  columns: string;
  setColumns: (columns: string) => void;
  t: (key: string) => string;
  isRTL: boolean;
}) => {
  if (selectedPhotos.length === 0) return null;

  return (
    <div style={{ 
      marginBottom: '32px',
      direction: isRTL ? 'rtl' : 'ltr'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '16px',
        flexDirection: isRTL ? 'row-reverse' : 'row'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#333',
          margin: 0
        }}>
          {t('New Files')} ({selectedPhotos.length})
        </h3>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: isRTL ? 'flex-start' : 'flex-end',
          gap: '8px'
        }}>
          <div style={{
            display: 'flex',
            gap: '8px',
            flexDirection: isRTL ? 'row-reverse' : 'row'
          }}>
            <button
              className="control-button"
              onClick={selectedPhotoIndices.size > 0 ? onDeselectAll : onSelectAll}
              disabled={disabled}
            >
              {selectedPhotoIndices.size > 0 ? t('Done Tagging Selected') : t('Select All')}
            </button>
            
            {selectedPhotoIndices.size === 0 && (
              <button
                className="control-button danger"
                onClick={onDeleteAll}
                disabled={disabled}
              >
                {t('Delete All')}
              </button>
            )}
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px',
            flexDirection: isRTL ? 'row-reverse' : 'row'
          }}>
            <label className="columns-label">{t('Columns:')}</label>
            <select
              value={columns}
              onChange={(e) => setColumns(e.target.value)}
              className="columns-select"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
      </div>

      <PhotoHandler 
        selectedPhotos={selectedPhotos}
        selectedPhotoIndices={selectedPhotoIndices}
        isSavingAlbum={disabled}
        onRemovePhoto={onRemovePhoto}
        onTogglePhotoSelection={onToggleSelection}
        onSelectAllPhotos={onSelectAll}
        onDeselectAllPhotos={onDeselectAll}
        hideHeader={true}
        photoTagsMap={photoTagsMap}
        columns={columns}
      />
    </div>
  );
};

// FIXED: Main component with proper mode detection
const SaveAlbum = () => {
  // Initialize mode synchronously based on URL
  const urlParams = new URLSearchParams(window.location.search);
  const isMultipleMode = urlParams.get('mode') === 'multiple';
  
  return isMultipleMode ? <MultipleAlbumMode /> : <SingleAlbumMode />;
};

const SaveAlbumWithTranslations = () => {
  return (
    <I18nProvider>
      <SaveAlbum />
    </I18nProvider>
  );
};

// Add CSS for better performance
const styles = `
.existing-files-grid {
  display: flex;
  overflow-x: auto;
  gap: 16px;
  padding: 20px;
  border: 2px dashed #007bff;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  scrollbar-width: thin;
  scrollbar-color: #007bff #f8f9fa;
}

.existing-file-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 160px;
}

.existing-file-card {
  position: relative;
  width: 100%;
  height: 160px;
  flex-shrink: 0;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #ddd;
  cursor: pointer;
  opacity: 1;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transform: translateY(0);
}

.existing-file-card.selected {
  border-color: rgba(0, 123, 255, 0.6);
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.3), 0 4px 12px rgba(0, 123, 255, 0.15);
  transform: translateY(-2px);
}

.delete-button {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: none;
  background-color: rgba(220, 53, 69, 0.8);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  z-index: 15;
  opacity: 1;
  transition: all 0.2s ease;
  transform: scale(0.8);
}

.delete-button:hover {
  background-color: rgba(200, 35, 51, 0.95);
  transform: scale(1.05);
}

.file-size {
  position: absolute;
  bottom: 4px;
  left: 4px;
  background-color: rgba(0,0,0,0.7);
  color: white;
  font-size: 10px;
  padding: 2px 4px;
  border-radius: 4px;
}

.file-duration {
  position: absolute;
  bottom: 4px;
  right: 4px;
  background-color: rgba(0,0,0,0.7);
  color: white;
  font-size: 10px;
  padding: 2px 4px;
  border-radius: 4px;
}

.file-info {
  min-height: 60px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.file-name {
  font-size: 11px;
  font-weight: 600;
  color: #333;
  padding: 4px 8px;
  background-color: #f8f9fa;
  border-radius: 4px;
  border: 1px solid #e9ecef;
  text-align: center;
  word-break: break-word;
  line-height: 1.2;
  transition: all 0.2s ease;
}

.file-name.selected {
  background-color: #e3f2fd;
  border-color: #90caf9;
}

.file-tags {
  min-height: 32px;
}

.tags-display {
  background: linear-gradient(135deg, rgba(0, 123, 255, 0.95) 0%, rgba(0, 123, 255, 0.85) 100%);
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 11px;
  backdrop-filter: blur(6px);
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  line-height: 1.3;
  min-height: 32px;
  display: flex;
  align-items: center;
  word-break: break-word;
}

.tags-content {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  flex-wrap: wrap;
}

.tag-icon {
  font-size: 12px;
  opacity: 0.9;
  flex-shrink: 0;
}

.tags-text {
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  flex: 1;
}

.no-tags {
  font-size: 10px;
  color: #6c757d;
  font-style: italic;
  text-align: center;
  padding: 6px 8px;
  background-color: rgba(108, 117, 125, 0.1);
  border-radius: 4px;
  border: 1px solid rgba(108, 117, 125, 0.2);
}

.control-button {
  padding: 6px 12px;
  font-size: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
}

.control-button:disabled {
  background-color: #f8f9fa;
  color: #999;
  cursor: not-allowed;
}

.control-button.danger {
  border-color: #dc3545;
  color: #dc3545;
}

.control-button.danger:hover:not(:disabled) {
  background-color: #dc3545;
  color: white;
}

.columns-label {
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  color: #333;
}

.columns-select {
  font-size: 12px;
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
}
`;

// Add styles to head
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

ReactDOM.createRoot(document.getElementById("root")!).render(<SaveAlbumWithTranslations />);