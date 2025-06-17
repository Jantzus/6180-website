import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

// Import styled components - UPDATED: Added FixedHeader, FixedHeaderContent, Body, DropdownMenu, DropdownMenuChoice
import {
  GlobalStyle,
  FixedHeader,
  FixedHeaderContent,
  Body,
  ProfileLink,
  ActionButtons,
  Button,
  DropdownMenu,
  DropdownMenuChoice
} from "@/styles/styled-components";
import { UsernamePrompt } from "@/components/UsernamePrompt";
import { UploadProgress } from "@/components/UploadProgress";

import { LOCAL_STORAGE_KEYS, AWS_PRIVATE_GRAPHQL_ENDPOINT } from "@/lib/config";
import { 
  PasswordPolicyEnum,
  FOLDERPOSITION_FIELD
} from "@/lib/types";

import { I18nProvider } from "@/lib/i18n/context";
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n/translations";
import { PasswordDialog } from "@/components/PasswordDialog";
import { DebugLog } from "@/components/DebugLog";
import { useUsernameManagement } from "@/lib/useUsernameManagement";
import { prewarmCredentials } from "@/lib/s3";
import { checkLoginWithRefresh } from "@/lib/utils";

// Import the file upload processor hook
import { useFileUploadProcessor } from "@/lib/useFileUploadProcessor";

// Import custom hooks
import { 
  useAlbumInitialization, 
  useAlbumSave
} from "./hooks";

// Import components - using updated PhotoHandler
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

// NEW: Interface for existing files
interface ExistingFile {
  dataKey: string;
  thumbnailDataKey: string | null;
  durationInSeconds: number | null;
  dataInBytes: number;
  fileName?: string; // We might not have this for existing files
}

// NEW: Unified Tagging Section Container Component
const TaggingSectionContainer = ({ children, t, isRTL }: {
  children: React.ReactNode;
  t: (key: string) => string;
  isRTL: boolean;
}) => {
  return (
    <div style={{
      padding: '24px',
      marginBottom: '24px',
      backgroundColor: '#f8f9fa',
      border: '2px solid #e9ecef',
      borderRadius: '12px',
      direction: isRTL ? 'rtl' : 'ltr'
    }}>
      {/* Tagging Section Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        fontSize: '18px',
        color: '#495057',
        fontWeight: '600',
        marginBottom: '20px',
        flexDirection: isRTL ? 'row-reverse' : 'row'
      }}>
        <span style={{ marginRight: isRTL ? '0' : '12px', marginLeft: isRTL ? '12px' : '0', fontSize: '20px' }}>
          🏷️
        </span>
        {t('Click files below to select them for tagging')}
      </div>
      
      {children}
    </div>
  );
};

// NEW: New Photos Section Component (styled like Existing Files) - Updated with delete all
const NewPhotosSection = ({ 
  selectedPhotos,
  selectedPhotoIndices, 
  onToggleSelection, 
  onSelectAll, 
  onDeselectAll, 
  onRemovePhoto,
  onDeleteAll,
  disabled, 
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
  t: (key: string) => string;
  isRTL: boolean;
}) => {
  if (selectedPhotos.length === 0) return null;

  return (
    <div style={{ 
      marginBottom: '24px',
      direction: isRTL ? 'rtl' : 'ltr'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
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
            onClick={selectedPhotoIndices.size === selectedPhotos.length ? onDeselectAll : onSelectAll}
            disabled={disabled}
            onMouseEnter={(e) => {
              if (!disabled) {
                e.currentTarget.style.backgroundColor = '#f8f9fa';
              }
            }}
            onMouseLeave={(e) => {
              if (!disabled) {
                e.currentTarget.style.backgroundColor = '#fff';
              }
            }}
          >
            {selectedPhotoIndices.size === selectedPhotos.length ? t('Deselect All') : t('Select All')}
          </button>
          
          <button
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              border: '1px solid #dc3545',
              borderRadius: '4px',
              backgroundColor: disabled ? '#f8f9fa' : '#fff',
              color: disabled ? '#999' : '#dc3545',
              cursor: disabled ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease'
            }}
            onClick={onDeleteAll}
            disabled={disabled}
            onMouseEnter={(e) => {
              if (!disabled) {
                e.currentTarget.style.backgroundColor = '#dc3545';
                e.currentTarget.style.color = '#fff';
              }
            }}
            onMouseLeave={(e) => {
              if (!disabled) {
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.color = '#dc3545';
              }
            }}
          >
            {t('Delete All')}
          </button>
        </div>
      </div>

      {/* Use the existing PhotoHandler but hide its header */}
      <PhotoHandler 
        selectedPhotos={selectedPhotos}
        selectedPhotoIndices={selectedPhotoIndices}
        isSavingAlbum={disabled}
        onRemovePhoto={onRemovePhoto}
        onTogglePhotoSelection={onToggleSelection}
        onSelectAllPhotos={onSelectAll}
        onDeselectAllPhotos={onDeselectAll}
        hideHeader={true}
      />
    </div>
  );
};

// Updated ExistingFilesSection Component with simplified delete button behavior
const ExistingFilesSection = ({ 
  existingFiles, 
  selectedExistingIndices, 
  onToggleSelection, 
  onSelectAll, 
  onDeselectAll, 
  onDeleteFile, 
  disabled, 
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
  t: (key: string) => string;
  isRTL: boolean;
}) => {
  if (existingFiles.length === 0) return null;

  return (
    <div style={{ 
      marginBottom: '24px',
      direction: isRTL ? 'rtl' : 'ltr'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
        flexDirection: isRTL ? 'row-reverse' : 'row'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#333',
          margin: 0
        }}>
          {t('Existing Files')} ({existingFiles.length})
        </h3>
        
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
            onClick={selectedExistingIndices.size === existingFiles.length ? onDeselectAll : onSelectAll}
            disabled={disabled}
            onMouseEnter={(e) => {
              if (!disabled) {
                e.currentTarget.style.backgroundColor = '#f8f9fa';
              }
            }}
            onMouseLeave={(e) => {
              if (!disabled) {
                e.currentTarget.style.backgroundColor = '#fff';
              }
            }}
          >
            {selectedExistingIndices.size === existingFiles.length ? t('Deselect All') : t('Select All')}
          </button>
        </div>
      </div>

      <div style={{
        display: 'flex',
        overflowX: 'auto',
        gap: '12px',
        padding: '16px',
        border: '2px dashed #007bff',
        borderRadius: '8px',
        backgroundColor: '#fff',
        scrollbarWidth: 'thin',
        scrollbarColor: '#007bff #f8f9fa'
      }}>
        {existingFiles.map((file, index) => {
          const isSelected = selectedExistingIndices.has(index);

          return (
            <div
              key={`existing-${index}-${file.dataKey}`}
              style={{
                position: 'relative',
                width: '160px',
                height: '160px',
                flexShrink: 0,
                borderRadius: '8px',
                overflow: 'hidden',
                border: isSelected ? '3px solid #007bff' : '2px solid #ddd',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.6 : 1,
                transition: 'all 0.2s ease'
              }}
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
              
              {/* Selection Indicator Text */}
              {isSelected && (
                <div style={{
                  position: 'absolute',
                  bottom: '8px',
                  left: '8px',
                  right: '8px',
                  background: 'rgba(0, 123, 255, 0.9)',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  zIndex: 10
                }}>
                  SELECTED
                </div>
              )}

              {/* Individual Delete Button - Only show when selected */}
              {isSelected && !disabled && (
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the selection toggle
                    if (confirm(t('Are you sure you want to remove this file?'))) {
                      onDeleteFile(index);
                    }
                  }}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: 'rgba(220, 53, 69, 0.9)',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: '900',
                    zIndex: 20,
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    lineHeight: '1'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(200, 35, 51, 1)';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(220, 53, 69, 0.9)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  title={t('Remove file')}
                >
                  ×
                </button>
              )}

              {/* File size indicator */}
              {file.dataInBytes > 0 && (
                <div style={{
                  position: 'absolute',
                  bottom: '4px',
                  left: '4px',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  fontSize: '10px',
                  padding: '2px 4px',
                  borderRadius: '4px'
                }}>
                  {(file.dataInBytes / (1024 * 1024)).toFixed(1)}MB
                </div>
              )}

              {/* Video duration indicator */}
              {file.durationInSeconds && (
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  left: '8px',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  fontSize: '10px',
                  padding: '2px 4px',
                  borderRadius: '4px'
                }}>
                  {Math.floor(file.durationInSeconds / 60)}:{String(Math.floor(file.durationInSeconds % 60)).padStart(2, '0')}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

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

  // NEW: State for settings dropdown
  const [showSettingsDropdown, setShowSettingsDropdown] = useState<boolean>(false);

  // NEW: State for photo selection and tagging
  const [selectedPhotoIndices, setSelectedPhotoIndices] = useState<Set<number>>(new Set());
  const [photoTagsMap, setPhotoTagsMap] = useState<Map<number, { tagTitle: string; TagType: string; subtags: { tagTitle: string; subtagTitle: string; }[] }[]>>(new Map());

  // NEW: State for existing files
  const [existingFiles, setExistingFiles] = useState<ExistingFile[]>([]);
  const [selectedExistingIndices, setSelectedExistingIndices] = useState<Set<number>>(new Set());
  const [existingFileTagsMap, setExistingFileTagsMap] = useState<Map<number, { tagTitle: string; TagType: string; subtags: { tagTitle: string; subtagTitle: string; }[] }[]>>(new Map());
  const [isLoadingExistingFiles, setIsLoadingExistingFiles] = useState(false);

  // Custom navigation function for the useFileUploadProcessor hook
  const navigateAfterUpload = (uploadedFolderId: string | null) => {
    // Don't navigate, just set the folder ID if not already set
    if (!folderId && uploadedFolderId) {
      setFolderId(uploadedFolderId);
    }
  };

  // Use the file upload processor hook with auto-navigation disabled for existing albums
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
    setEditingExistingAlbum,
    log
  } = useFileUploadProcessor(navigateAfterUpload, true); // Disable auto-navigation

  // NEW: Prewarm S3 credentials when the page loads for extra reliability
  useEffect(() => {
    const warmUpPageCredentials = async () => {
      try {
        await prewarmCredentials();
        log("🔥 Save-album page S3 credentials prewarmed successfully");
      } catch (error) {
        log(`⚠️ Save-album page credential prewarming failed: ${String(error)}`);
      }
    };
    
    warmUpPageCredentials();
  }, []); // Empty dependency array - run once when page loads

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

  // NEW: Function to fetch existing album data
  const fetchExistingAlbumData = async (albumFolderId: string) => {
    if (!albumFolderId) return;
    
    setIsLoadingExistingFiles(true);
    enhancedLog(`Fetching existing album data for folder ID: ${albumFolderId}`);

    try {
      const token = await checkLoginWithRefresh();
      if (!token) {
        enhancedLog("❌ Authentication failed while fetching existing album data");
        return;
      }

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
        enhancedLog(`❌ Failed to fetch existing album data: ${JSON.stringify(json.errors)}`);
        return;
      }

      const items = json?.data?.fetchRelations?.items || [];
      
      // Find the specific folder
      const targetFolder = items.find((item: any) => 
        item && 
        item.folder && 
        item.folder.id === albumFolderId
      );

      if (!targetFolder) {
        // enhancedLog(`⚠️ Folder with ID ${albumFolderId} not found`);
        return;
      }

      const folder = targetFolder.folder;
      const rawFiles = folder?.fileReferencesPage?.items?.map((ref: any) => ref.file) || [];
    
      const files: ExistingFile[] = rawFiles
        .filter((f: any) => f && f.dataKey)
        .map((file: any) => ({
          dataKey: file.dataKey,
          thumbnailDataKey: file.thumbnailDataKey || null,
          durationInSeconds: file.durationInSeconds || null,
          dataInBytes: file.dataInBytes || 0
        }));

      setExistingFiles(files);
      enhancedLog(`✅ Successfully loaded ${files.length} existing files`);

      // Update folder details if they haven't been set yet
      if (!folderName && folder.folderName) {
        setFolderName(folder.folderName);
      }
      if (!folderDescription && folder.folderDescription) {
        setFolderDescription(folder.folderDescription);
      }

      // Set up the upload processor for existing album mode
      setEditingExistingAlbum(albumFolderId);

    } catch (error) {
      console.error("Failed to fetch existing album data:", error);
      enhancedLog(`❌ Failed to fetch existing album data: ${String(error)}`);
    } finally {
      setIsLoadingExistingFiles(false);
    }
  };

  // NEW: Load existing files when folderId changes
  useEffect(() => {
    if (folderId && folderId !== currentFolderId) {
      enhancedLog(`Loading existing files for folder ID: ${folderId}`);
      fetchExistingAlbumData(folderId);
    }
  }, [folderId, currentFolderId]);

  // Initialize tags management
  const tagsManager = useTagsManagement(enhancedLog);

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

  // Use the album save hook with updated parameters for file-level tagging
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
    photoTagsMap, // NEW: pass photo tags map instead of global tags
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

  // NEW: Clean up photo selection when photos are removed
  useEffect(() => {
    // Remove any selected indices that are beyond the current photo count
    setSelectedPhotoIndices(prev => {
      const updated = new Set<number>();
      prev.forEach(index => {
        if (index < selectedPhotos.length) {
          updated.add(index);
        }
      });
      return updated;
    });

    // Remove any photo tags for indices that no longer exist
    setPhotoTagsMap(prev => {
      const updated = new Map(prev);
      const indicesToRemove: number[] = [];
      
      prev.forEach((_, index) => {
        if (index >= selectedPhotos.length) {
          indicesToRemove.push(index);
        }
      });
      
      indicesToRemove.forEach(index => {
        updated.delete(index);
      });
      
      return updated;
    });
  }, [selectedPhotos.length]);

  // NEW: Clean up existing file selection when files are removed
  useEffect(() => {
    setSelectedExistingIndices(prev => {
      const updated = new Set<number>();
      prev.forEach(index => {
        if (index < existingFiles.length) {
          updated.add(index);
        }
      });
      return updated;
    });

    setExistingFileTagsMap(prev => {
      const updated = new Map(prev);
      const indicesToRemove: number[] = [];
      
      prev.forEach((_, index) => {
        if (index >= existingFiles.length) {
          indicesToRemove.push(index);
        }
      });
      
      indicesToRemove.forEach(index => {
        updated.delete(index);
      });
      
      return updated;
    });
  }, [existingFiles.length]);

  // ---------- PHOTO MANAGEMENT ----------

  const removePhoto = (indexToRemove: number) => {
    enhancedLog(`Removing photo at index: ${indexToRemove}`);
    const updated = selectedPhotos.filter((_, i) => i !== indexToRemove);
    setSelectedPhotos(updated);
    enhancedLog(`New files count: ${updated.length}`);
    
    // Update localStorage
    if (updated.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.SELECTED_PHOTOS, JSON.stringify(updated));
      enhancedLog(`Updated localStorage with ${updated.length} photos`);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.SELECTED_PHOTOS);
      enhancedLog("Removed photos from localStorage");
    }

    // Update selected indices and tags map - shift indices down for photos after the removed one
    setSelectedPhotoIndices(prev => {
      const updated = new Set<number>();
      prev.forEach(index => {
        if (index < indexToRemove) {
          updated.add(index);
        } else if (index > indexToRemove) {
          updated.add(index - 1);
        }
        // Skip the removed index
      });
      return updated;
    });

    setPhotoTagsMap(prev => {
      const updated = new Map();
      prev.forEach((tags, index) => {
        if (index < indexToRemove) {
          updated.set(index, tags);
        } else if (index > indexToRemove) {
          updated.set(index - 1, tags);
        }
        // Skip the removed index
      });
      return updated;
    });
  };

  // NEW: Existing file management functions
  const removeExistingFile = (indexToRemove: number) => {
    enhancedLog(`Removing existing file at index: ${indexToRemove}`);
    const updated = existingFiles.filter((_, i) => i !== indexToRemove);
    setExistingFiles(updated);
    enhancedLog(`New existing files count: ${updated.length}`);

    // Update selected indices and tags map - shift indices down
    setSelectedExistingIndices(prev => {
      const updated = new Set<number>();
      prev.forEach(index => {
        if (index < indexToRemove) {
          updated.add(index);
        } else if (index > indexToRemove) {
          updated.add(index - 1);
        }
      });
      return updated;
    });

    setExistingFileTagsMap(prev => {
      const updated = new Map();
      prev.forEach((tags, index) => {
        if (index < indexToRemove) {
          updated.set(index, tags);
        } else if (index > indexToRemove) {
          updated.set(index - 1, tags);
        }
      });
      return updated;
    });
  };

  const toggleExistingFileSelection = (index: number) => {
    enhancedLog(`Toggling selection for existing file at index: ${index}`);
    setSelectedExistingIndices(prev => {
      const updated = new Set(prev);
      if (updated.has(index)) {
        updated.delete(index);
        enhancedLog(`Deselected existing file ${index}`);
      } else {
        updated.add(index);
        enhancedLog(`Selected existing file ${index}`);
      }
      return updated;
    });
  };

  const selectAllExistingFiles = () => {
    enhancedLog("Selecting all existing files");
    const allIndices = new Set<number>();
    for (let i = 0; i < existingFiles.length; i++) {
      allIndices.add(i);
    }
    setSelectedExistingIndices(allIndices);
  };

  const deselectAllExistingFiles = () => {
    enhancedLog("Deselecting all existing files");
    setSelectedExistingIndices(new Set());
  };

  // NEW: Photo selection functions
  const togglePhotoSelection = (index: number) => {
    enhancedLog(`Toggling selection for photo at index: ${index}`);
    setSelectedPhotoIndices(prev => {
      const updated = new Set(prev);
      if (updated.has(index)) {
        updated.delete(index);
        enhancedLog(`Deselected photo ${index}`);
      } else {
        updated.add(index);
        enhancedLog(`Selected photo ${index}`);
      }
      return updated;
    });
  };

  const selectAllPhotos = () => {
    enhancedLog("Selecting all photos");
    const allIndices = new Set<number>();
    for (let i = 0; i < selectedPhotos.length; i++) {
      allIndices.add(i);
    }
    setSelectedPhotoIndices(allIndices);
  };

  const deselectAllPhotos = () => {
    enhancedLog("Deselecting all photos");
    setSelectedPhotoIndices(new Set());
  };

  // NEW: Delete all photos function with confirmation
  const deleteAllPhotos = () => {
    if (confirm(t('Are you sure you want to delete all new files? This action cannot be undone.'))) {
      enhancedLog("Deleting all new photos");
      setSelectedPhotos([]);
      setSelectedPhotoIndices(new Set());
      setPhotoTagsMap(new Map());
      
      // Clear from localStorage
      localStorage.removeItem(LOCAL_STORAGE_KEYS.SELECTED_PHOTOS);
      enhancedLog("Cleared all photos from localStorage");
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
    enhancedLog("Photo tags applied:", Object.fromEntries(photoTagsMap));
    enhancedLog("Existing file tags applied:", Object.fromEntries(existingFileTagsMap));
    
    // Close settings dropdown if open
    setShowSettingsDropdown(false);
    setIsSavingAlbum(true);

    try {
      if (publicUsername?.startsWith("Profile-")) {
        enhancedLog("Public username starts with 'Profile-', showing username prompt");
        setUsernameInput("");
        setShowUsernamePrompt(true);
        setIsSavingAlbum(false);
        return;
      }

      // If we have a valid username, proceed directly to saving
      enhancedLog("Valid username found, proceeding to save album directly with file-level tagging");
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

  const handleOpenPasswordDialog = () => {
    enhancedLog("Opening password dialog");
    setShowPasswordDialog(true);
  };

  // Handle add photos by using the openFilePicker function from the hook
  const handleAddPhotos = () => {
    enhancedLog("Add photos button clicked");
    openFilePicker(folderId);
  };

  // NEW: Settings dropdown handlers
  const handleSettingsDropdownToggle = () => {
    setShowSettingsDropdown(!showSettingsDropdown);
  };

  const handleSettingsOptionClick = (action: () => void) => {
    action();
    setShowSettingsDropdown(false);
  };

  // NEW: Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showSettingsDropdown && !target.closest('.settings-dropdown-container')) {
        setShowSettingsDropdown(false);
      }
    };

    if (showSettingsDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSettingsDropdown]);

  // Determine if tagging should be disabled
  const isTaggingDisabled = isSavingAlbum || isUploading || isLoadingExistingFiles;

  // Check if we have any files to show the tagging section
  const hasAnyFiles = selectedPhotos.length > 0 || existingFiles.length > 0;

  // Check if any photos are selected to show the tagging section
  const hasSelectedPhotos = selectedPhotoIndices.size > 0 || selectedExistingIndices.size > 0;

  // ========== RENDER METHODS ==========

  return (
    <>
      <GlobalStyle />
      
      {/* NEW: Fixed Header with Settings Dropdown and Save Button */}
      <FixedHeader>
        <FixedHeaderContent>
          <ProfileLink href="my-albums.html">
            {t('My Albums')}
          </ProfileLink>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Save Album Button */}
            <Button
              $primary
              onClick={handleSaveAlbum}
              disabled={isSavingAlbum || isUploading || isLoadingExistingFiles}
              style={{
                minWidth: '120px',
                fontSize: '14px',
                padding: '8px 16px'
              }}
            >
              {isSavingAlbum ? t('Saving...') : t('Save Album')}
            </Button>

            {/* Settings Dropdown - Only show if user is creator */}
            {isCreator === true && (
              <div 
                className="settings-dropdown-container"
                style={{ 
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <button
                  onClick={handleSettingsDropdownToggle}
                  disabled={isSavingAlbum || isUploading || isLoadingExistingFiles}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: (isSavingAlbum || isUploading || isLoadingExistingFiles) ? 'not-allowed' : 'pointer',
                    padding: '8px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: (isSavingAlbum || isUploading || isLoadingExistingFiles) ? '#ccc' : '#666',
                    fontSize: '18px',
                    transition: 'all 0.2s ease',
                    backgroundColor: showSettingsDropdown ? '#f0f0f0' : 'transparent',
                    opacity: (isSavingAlbum || isUploading || isLoadingExistingFiles) ? 0.5 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!showSettingsDropdown && !isSavingAlbum && !isUploading && !isLoadingExistingFiles) {
                      e.currentTarget.style.backgroundColor = '#f8f9fa';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!showSettingsDropdown && !isSavingAlbum && !isUploading && !isLoadingExistingFiles) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                  title={t('Album Settings')}
                >
                  ⚙️
                </button>
                
                {showSettingsDropdown && !isSavingAlbum && !isUploading && !isLoadingExistingFiles && (
                  <DropdownMenu style={{ minWidth: '280px' }}>
                    <DropdownMenuChoice
                      onClick={() => handleSettingsOptionClick(handlePublicProfileToggle)}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%'
                      }}>
                        <span>{isOnPublicProfile ? t('Remove From Public Profile') : t('Add To Public Profile')}</span>
                        <span style={{ 
                          fontSize: '12px', 
                          color: isOnPublicProfile ? '#28a745' : '#6c757d',
                          fontWeight: 'bold'
                        }}>
                          {isOnPublicProfile ? '✓' : '○'}
                        </span>
                      </div>
                    </DropdownMenuChoice>
                    
                    <DropdownMenuChoice
                      onClick={() => handleSettingsOptionClick(handleParticipantsCanAddItemsToggle)}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%'
                      }}>
                        <span>{t('Participants Can Add Items')}</span>
                        <span style={{ 
                          fontSize: '12px', 
                          color: participantsCanAddItems ? '#28a745' : '#6c757d',
                          fontWeight: 'bold'
                        }}>
                          {participantsCanAddItems ? '✓' : '○'}
                        </span>
                      </div>
                    </DropdownMenuChoice>
                    
                    <DropdownMenuChoice
                      onClick={() => handleSettingsOptionClick(() => {
                        // Placeholder for "Participants Can Delete Items" - this functionality would need to be implemented
                        enhancedLog("Participants Can Delete Items clicked - functionality not yet implemented");
                      })}
                      style={{ opacity: 0.6 }}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%'
                      }}>
                        <span>{t('Participants Can Delete Items')}</span>
                        <span style={{ 
                          fontSize: '12px', 
                          color: '#6c757d',
                          fontWeight: 'bold'
                        }}>
                          ○
                        </span>
                      </div>
                    </DropdownMenuChoice>
                    
                    <DropdownMenuChoice
                      onClick={() => handleSettingsOptionClick(handleOpenPasswordDialog)}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%'
                      }}>
                        <span>{t('Album Password Policy')}</span>
                        <span style={{ 
                          fontSize: '12px', 
                          color: passwordProtectionOption !== 'NoPassword' ? '#28a745' : '#6c757d',
                          fontWeight: 'bold'
                        }}>
                          {passwordProtectionOption !== 'NoPassword' ? '✓' : '○'}
                        </span>
                      </div>
                    </DropdownMenuChoice>
                  </DropdownMenu>
                )}
              </div>
            )}
          </div>
        </FixedHeaderContent>
      </FixedHeader>

      {/* NEW: Use Body component for proper fixed header spacing */}
      <Body $isRTL={isRTL}>
        {/* Folder Details - Only show if user is creator */}
        <div style={{ marginTop: showFolderDetails && isCreator === true ? '24px' : '0' }}>
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

        {/* Progress Tracking - Only show when files are actually being processed */}
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
        
        {/* NEW: Unified Tagging Section - Always show files if user is creator and has files */}
        {showFolderDetails && isCreator === true && hasAnyFiles && (
          <TaggingSectionContainer t={t} isRTL={isRTL}>
            {/* Existing Files Section */}
            {existingFiles.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <ExistingFilesSection
                  existingFiles={existingFiles}
                  selectedExistingIndices={selectedExistingIndices}
                  onToggleSelection={toggleExistingFileSelection}
                  onSelectAll={selectAllExistingFiles}
                  onDeselectAll={deselectAllExistingFiles}
                  onDeleteFile={removeExistingFile}
                  disabled={isTaggingDisabled}
                  t={t}
                  isRTL={isRTL}
                />
              </div>
            )}

            {/* New Photos Section */}
            <NewPhotosSection
              selectedPhotos={selectedPhotos}
              selectedPhotoIndices={selectedPhotoIndices}
              onToggleSelection={togglePhotoSelection}
              onSelectAll={selectAllPhotos}
              onDeselectAll={deselectAllPhotos}
              onRemovePhoto={removePhoto}
              onDeleteAll={deleteAllPhotos}
              disabled={isTaggingDisabled}
              t={t}
              isRTL={isRTL}
            />
            
            {/* Tags Selection Section - Only show when photos are selected */}
            {hasSelectedPhotos && (
              <div style={{ marginTop: '24px' }}>
                <TagsDisplay 
                  tagsManager={tagsManager}
                  disabled={isTaggingDisabled}
                  enhancedLog={enhancedLog}
                />
              </div>
            )}
          </TaggingSectionContainer>
        )}
                  
        {/* Saving Progress */}
        <SavingProgressComponent 
          isSavingAlbum={isSavingAlbum} 
          savingProgress={savingProgress} 
        />

        {/* Action Buttons - Only "Add More Photos" */}
        <ActionButtons>
          <Button
            onClick={handleAddPhotos}
            disabled={isSavingAlbum || isUploading || isLoadingExistingFiles}
          >
            {isUploading ? t('Uploading...') : t('Add More Photos')}
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
        <PasswordDialog 
          isOpen={showPasswordDialog} 
          onClose={handleClosePasswordDialog}
          initialOption={passwordProtectionOption}
          initialPassword={albumPassword} 
        />

        {/* Debug Log */}
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

// Wrap the SaveAlbum component with I18nProvider
const SaveAlbumWithTranslations = () => {
  return (
    <I18nProvider>
      <SaveAlbum />
    </I18nProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<SaveAlbumWithTranslations />);