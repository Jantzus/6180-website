import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import React from "react";

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

// SIMPLIFIED: Import simplified tags functionality
import { useTagsManagement } from "./useTagsManagement";
import { TagsDisplay, PhotoTagging } from "./TagDisplayComponents";

// Import LazyImage for existing files display
import { LazyImage } from "@/components/LazyImage";

// UPDATED: Interface for existing files - now includes fileName
interface ExistingFile {
  dataKey: string;
  thumbnailDataKey: string | null;
  durationInSeconds: number | null;
  dataInBytes: number;
  fileName?: string; // NEW: Original filename from fileDisplayName
}

// NEW: Interface for applied tags (matching the type used throughout the app)
interface AppliedTag {
  tagTitle: string;
  TagType: string;
  subtags: { tagTitle: string; subtagTitle: string; }[];
}

// NEW: Unified Tagging Section Container Component
const TaggingSectionContainer = ({ children, t, isRTL }: {
  children: React.ReactNode;
  t: (key: string) => string;
  isRTL: boolean;
}) => {
  return (
    <div style={{
      padding: '32px',
      marginBottom: '32px',
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
        marginBottom: '24px',
        flexDirection: isRTL ? 'row-reverse' : 'row'
      }}>
        <span style={{ marginRight: isRTL ? '0' : '12px', marginLeft: isRTL ? '12px' : '0', fontSize: '20px' }}>
          🏷️
        </span>
        {t('Select files to start tagging')}
      </div>
      
      {children}
    </div>
  );
};

// NEW: New Photos Section Component (styled like Existing Files) - Updated with delete all and soft selection styling
const NewPhotosSection = ({ 
  selectedPhotos,
  selectedPhotoIndices, 
  onToggleSelection, 
  onSelectAll, 
  onDeselectAll, 
  onRemovePhoto,
  onDeleteAll,
  disabled,
  photoTagsMap, // NEW: Added photoTagsMap prop
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
  photoTagsMap: Map<number, AppliedTag[]>; // NEW: Added type
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
        alignItems: 'center',
        marginBottom: '24px',
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
            onClick={selectedPhotoIndices.size > 0 ? onDeselectAll : onSelectAll}
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
            {selectedPhotoIndices.size > 0 ? t('Done Tagging Selected') : t('Select All')}
          </button>
          
          {selectedPhotoIndices.size === 0 && (
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
          )}
        </div>
      </div>

      {/* Use the existing PhotoHandler but hide its header and pass photoTagsMap */}
      <PhotoHandler 
        selectedPhotos={selectedPhotos}
        selectedPhotoIndices={selectedPhotoIndices}
        isSavingAlbum={disabled}
        onRemovePhoto={onRemovePhoto}
        onTogglePhotoSelection={onToggleSelection}
        onSelectAllPhotos={onSelectAll}
        onDeselectAllPhotos={onDeselectAll}
        hideHeader={true}
        photoTagsMap={photoTagsMap} // NEW: Pass the photo tags map
      />
    </div>
  );
};

// Updated ExistingFilesSection Component with enhanced tag visibility and filename display
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
  existingFileTagsMap, // NEW: Added existing file tags map
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
  existingFileTagsMap: Map<number, AppliedTag[]>; // NEW: Added type
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
            {selectedExistingIndices.size > 0 ? t('Done Tagging Selected') : t('Select All')}
          </button>
        </div>
      </div>

      <div style={{
        display: 'flex',
        overflowX: 'auto',
        gap: '16px',
        padding: '20px',
        border: '2px dashed #007bff',
        borderRadius: '12px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        scrollbarWidth: 'thin',
        scrollbarColor: '#007bff #f8f9fa'
      }}>
        {existingFiles.map((file, index) => {
          const isSelected = selectedExistingIndices.has(index);
          const appliedTags = existingFileTagsMap.get(index) || []; // Get applied tags for this file

          return (
            <div key={`existing-${index}-${file.dataKey}`} style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '8px',
              minWidth: '160px' // Ensure consistent width
            }}>
              <div
                style={{
                  position: 'relative',
                  width: '160px',
                  height: '160px',
                  flexShrink: 0,
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: isSelected ? '2px solid rgba(0, 123, 255, 0.6)' : '2px solid #ddd',
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  opacity: disabled ? 0.6 : 1,
                  transition: 'all 0.3s ease',
                  boxShadow: isSelected ? '0 0 0 3px rgba(0, 123, 255, 0.3), 0 4px 12px rgba(0, 123, 255, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.04)',
                  transform: isSelected ? 'translateY(-2px)' : 'translateY(0)'
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
                
                {/* Soft Delete Button - Only show when selected and user has delete permissions */}
                {isSelected && !disabled && (isCreator === true || participantsCanDeleteItems) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(t('Are you sure you want to remove this file?'))) {
                        onDeleteFile(index);
                      }
                    }}
                    style={{
                      position: 'absolute',
                      top: '6px',
                      right: '6px',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      border: 'none',
                      backgroundColor: 'rgba(220, 53, 69, 0.8)',
                      color: 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      zIndex: 15,
                      opacity: 1,
                      transition: 'all 0.2s ease',
                      transform: 'scale(0.8)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(200, 35, 51, 0.9)';
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.opacity = '1';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(220, 53, 69, 0.8)';
                      e.currentTarget.style.transform = 'scale(0.8)';
                      e.currentTarget.style.opacity = '0';
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
                    {(file.dataInBytes / (1024 * 1024)).toFixed(1)}{t('MB')}
                  </div>
                )}

                {/* Video duration indicator */}
                {file.durationInSeconds && (
                  <div style={{
                    position: 'absolute',
                    bottom: '4px',
                    right: '4px',
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
              
              {/* NEW: Enhanced filename and tags display */}
              <div style={{ minHeight: '60px', display: 'flex', flexDirection: 'column', gap: '4px' }}> 
                {/* Filename display */}
                {file.fileName && (
                  <div style={{
                    fontSize: '11px',
                    fontWeight: '600',
                    color: '#333',
                    padding: '4px 8px',
                    backgroundColor: isSelected ? '#e3f2fd' : '#f8f9fa',
                    borderRadius: '4px',
                    border: `1px solid ${isSelected ? '#90caf9' : '#e9ecef'}`,
                    textAlign: 'center',
                    wordBreak: 'break-word',
                    lineHeight: '1.2',
                    transition: 'all 0.2s ease'
                  }}>
                    {file.fileName}
                  </div>
                )}
                
                {/* Tags or "No tags" display */}
                <div style={{ minHeight: '32px' }}>
                  {appliedTags.length > 0 ? (
                    <PhotoTagging 
                      photoTags={appliedTags}
                      isSelected={isSelected}
                      onToggleSelection={() => !disabled && onToggleSelection(index)}
                    />
                  ) : (
                    <div style={{
                      fontSize: '10px',
                      color: '#6c757d',
                      fontStyle: 'italic',
                      textAlign: 'center',
                      padding: '6px 8px',
                      backgroundColor: 'rgba(108, 117, 125, 0.1)',
                      borderRadius: '4px',
                      border: '1px solid rgba(108, 117, 125, 0.2)'
                    }}>
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
  
  // NEW: Participants Can Delete Items toggle state
  const [participantsCanDeleteItems, setParticipantsCanDeleteItems] = useState<boolean>(false);
  
  // State for checking if user is the creator - initialize as null (undetermined)
  const [isCreator, setIsCreator] = useState<boolean | null>(null);

  // State for sub-album data
  const [isSubAlbum, setIsSubAlbum] = useState<boolean>(false);
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([]);

  // NEW: State to track if we're loading from query parameter
  const [isLoadingFromQueryParam, setIsLoadingFromQueryParam] = useState<boolean>(false);

  // NEW: State for settings dropdown
  const [showSettingsDropdown, setShowSettingsDropdown] = useState<boolean>(false);

  // SIMPLIFIED: State for photo selection and tagging
  const [selectedPhotoIndices, setSelectedPhotoIndices] = useState<Set<number>>(new Set());
  const [photoTagsMap, setPhotoTagsMap] = useState<Map<number, AppliedTag[]>>(new Map());

  // NEW: State for existing files
  const [existingFiles, setExistingFiles] = useState<ExistingFile[]>([]);
  const [selectedExistingIndices, setSelectedExistingIndices] = useState<Set<number>>(new Set());
  const [existingFileTagsMap, setExistingFileTagsMap] = useState<Map<number, AppliedTag[]>>(new Map());
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
    setOnSaveAlbumPage, // UPDATED: Use setOnSaveAlbumPage instead of setEditingExistingAlbum
    log
  } = useFileUploadProcessor(navigateAfterUpload, true); // Disable auto-navigation

  // NEW: Set that we're on the save-album page so navigation is disabled
  useEffect(() => {
    // Tell the hook we're on the save-album page so it won't navigate
    setOnSaveAlbumPage(true);
    enhancedLog("🏠 Set isOnSaveAlbumPage to true - navigation disabled");
    
    return () => {
      // Clean up when leaving the page
      setOnSaveAlbumPage(false);
      enhancedLog("🏠 Set isOnSaveAlbumPage to false - navigation enabled");
    };
  }, [setOnSaveAlbumPage]);

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

  // UPDATED: Function to fetch existing album data with proper tag extraction and filename capture
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
        return;
      }

      const folder = targetFolder.folder;
      const fileReferences = folder?.fileReferencesPage?.items || [];
    
      // UPDATED: Extract both files AND their existing tags AND filenames
      const files: ExistingFile[] = [];
      const existingTagsMap = new Map<number, AppliedTag[]>();
      
      fileReferences.forEach((ref: any, index: number) => {
        const file = ref.file;
        if (file && file.dataKey) {
          // NEW: Extract filename from fileDisplayName if available
          const fileName = ref.fileDisplayName || null;
          
          // Add file to the files array with filename
          files.push({
            dataKey: file.dataKey,
            thumbnailDataKey: file.thumbnailDataKey || null,
            durationInSeconds: file.durationInSeconds || null,
            dataInBytes: file.dataInBytes || 0,
            fileName: fileName // NEW: Include filename from backend
          });
          
          // FIXED: Extract existing selectedTags and convert to AppliedTag format
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
            enhancedLog(`Existing file ${index} (${fileName || 'unnamed'}) has ${appliedTags.length} tags applied:`, appliedTags.map(t => t.tagTitle));
          }
        }
      });

      setExistingFiles(files);
      
      // FIXED: Set the existing tags map with the extracted tags
      setExistingFileTagsMap(existingTagsMap);
      
      enhancedLog(`✅ Successfully loaded ${files.length} existing files with ${existingTagsMap.size} files having existing tags and ${files.filter(f => f.fileName).length} files with names`);

      // Update folder details if they haven't been set yet
      if (!folderName && folder.folderName) {
        setFolderName(folder.folderName);
      }
      if (!folderDescription && folder.folderDescription) {
        setFolderDescription(folder.folderDescription);
      }

    } catch (error) {
      console.error("Failed to fetch existing album data:", error);
      enhancedLog(`❌ Failed to fetch existing album data: ${String(error)}`);
    } finally {
      setIsLoadingExistingFiles(false);
    }
  };

  // NEW: Check for query parameters first and set up state accordingly
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const folderIdParam = urlParams.get('folderId');
    
    if (folderIdParam) {
      enhancedLog(`Found folderId query parameter: ${folderIdParam} - loading existing album`);
      setIsLoadingFromQueryParam(true);
      
      // Set the folder ID from query parameter
      setFolderId(folderIdParam);
      
      // This is not a sub-album since we're editing an existing album
      setIsSubAlbum(false);
      
      // Clear any sub-album data from localStorage since we're loading an existing album
      localStorage.removeItem(LOCAL_STORAGE_KEYS.SUB_ALBUM_DATA);
      enhancedLog("Cleared sub-album data from localStorage - loading existing album from query parameter");
      
      // FIXED: Only clear selected photos if there aren't any photos currently being processed
      // Check if the useFileUploadProcessor is currently handling photos for this album
      const storedPhotos = localStorage.getItem(LOCAL_STORAGE_KEYS.SELECTED_PHOTOS);
      if (!storedPhotos) {
        enhancedLog("No stored photos found - proceeding with existing album load");
      } else {
        try {
          const parsedPhotos = JSON.parse(storedPhotos);
          if (Array.isArray(parsedPhotos) && parsedPhotos.length > 0) {
            enhancedLog(`Found ${parsedPhotos.length} stored photos - these may be newly uploaded for this album, preserving them`);
            // Don't clear - let the album initialization hook handle this
          } else {
            localStorage.removeItem(LOCAL_STORAGE_KEYS.SELECTED_PHOTOS);
            enhancedLog("Cleared empty photos array from localStorage");
          }
        } catch (error) {
          enhancedLog(`Error parsing stored photos: ${error}`);
          localStorage.removeItem(LOCAL_STORAGE_KEYS.SELECTED_PHOTOS);
        }
      }
      
      // Show folder details for existing album
      setShowFolderDetails(true);
      
      // Set creator status to true for now (will be verified when album data loads)
      setIsCreator(true);
    } else {
      enhancedLog("No folderId query parameter found, will proceed with normal initialization");
      setIsLoadingFromQueryParam(false);
    }
  }, []); // Run once on component mount

  // Use the album initialization hook - but conditionally skip some setters when loading from query param
  const { cognitoUsername, publicUsername, setPublicUsername } = useAlbumInitialization(
    isLoadingFromQueryParam ? () => {} : setFolderId, // Skip folder ID setting if loading from query param
    setSelectedPhotos, // Always allow photo setting - hook will load from localStorage
    isLoadingFromQueryParam ? () => {} : setIsCreator, // Skip creator setting if loading from query param
    isLoadingFromQueryParam ? () => {} : setShowFolderDetails, // Skip folder details if loading from query param
    setFolderName,
    setFolderDescription,
    setIsOnPublicProfile,
    setParticipantsCanAddItems,
    setPasswordProtectionOption,
    setAlbumPassword,
    isLoadingFromQueryParam ? () => {} : setIsSubAlbum, // Skip sub-album setting if loading from query param
    isLoadingFromQueryParam ? () => {} : setSelectedFileIds, // Skip file IDs if loading from query param
    setParticipantsCanDeleteItems,
    enhancedLog
  );

  // UPDATED: Load existing files when folderId changes (simplified)
  useEffect(() => {
    if (folderId) {
      enhancedLog(`Loading existing files for folder ID: ${folderId}`);
      fetchExistingAlbumData(folderId);
    }
  }, [folderId]);

  // SIMPLIFIED: Initialize tags management with simplified logic - FIXED to ensure reactivity
  const tagsManager = useTagsManagement(
    photoTagsMap,
    setPhotoTagsMap,
    existingFileTagsMap,
    setExistingFileTagsMap,
    selectedPhotoIndices,
    selectedExistingIndices,
    enhancedLog
  );

  // Use the album save hook with updated parameters for file-level tagging and pass t function
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
    participantsCanDeleteItems, // NEW: Add this parameter
    passwordProtectionOption,
    albumPassword,
    photoTagsMap, // NEW: pass photo tags map instead of global tags
    existingFileTagsMap, // NEW: pass existing file tags map
    existingFiles, // NEW: pass existing files array
    selectedExistingIndices, // NEW: pass selected existing file indices
    setIsSavingAlbum,
    setSavingProgress,
    setSelectedPhotos,
    setProgressTracker,
    enhancedLog,
    t // NEW: Pass the t function for translations
  );

  // UPDATED: Update folderId when currentFolderId changes (simplified)
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

  // FIXED: Enhanced existing file selection functions with better logging
  const toggleExistingFileSelection = (index: number) => {
    enhancedLog(`Toggling selection for existing file at index: ${index}`);
    setSelectedExistingIndices(prev => {
      const updated = new Set(prev);
      const wasSelected = updated.has(index);
      
      if (wasSelected) {
        updated.delete(index);
        enhancedLog(`Deselected existing file ${index} - remaining selected: ${updated.size}`);
      } else {
        updated.add(index);
        enhancedLog(`Selected existing file ${index} - total selected: ${updated.size}`);
      }
      
      return updated;
    });
  };

  const selectAllExistingFiles = () => {
    enhancedLog(`Selecting all ${existingFiles.length} existing files`);
    const allIndices = new Set<number>();
    for (let i = 0; i < existingFiles.length; i++) {
      allIndices.add(i);
    }
    setSelectedExistingIndices(allIndices);
    enhancedLog(`Selected all existing files - total: ${allIndices.size}`);
  };

  const deselectAllExistingFiles = () => {
    enhancedLog("Deselecting all existing files");
    setSelectedExistingIndices(new Set());
  };

  // FIXED: Enhanced photo selection functions with better logging
  const togglePhotoSelection = (index: number) => {
    enhancedLog(`Toggling selection for photo at index: ${index}`);
    setSelectedPhotoIndices(prev => {
      const updated = new Set(prev);
      const wasSelected = updated.has(index);
      
      if (wasSelected) {
        updated.delete(index);
        enhancedLog(`Deselected photo ${index} - remaining selected: ${updated.size}`);
      } else {
        updated.add(index);
        enhancedLog(`Selected photo ${index} - total selected: ${updated.size}`);
      }
      
      return updated;
    });
  };

  const selectAllPhotos = () => {
    enhancedLog(`Selecting all ${selectedPhotos.length} photos`);
    const allIndices = new Set<number>();
    for (let i = 0; i < selectedPhotos.length; i++) {
      allIndices.add(i);
    }
    setSelectedPhotoIndices(allIndices);
    enhancedLog(`Selected all photos - total: ${allIndices.size}`);
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

  // FIXED: Add useEffect to log when selection changes for debugging
  useEffect(() => {
    enhancedLog(`Selection state changed:`, {
      selectedPhotos: Array.from(selectedPhotoIndices),
      selectedExistingFiles: Array.from(selectedExistingIndices),
      totalSelected: selectedPhotoIndices.size + selectedExistingIndices.size
    });
  }, [selectedPhotoIndices, selectedExistingIndices, enhancedLog]);

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

  // NEW: ---------- PARTICIPANTS CAN DELETE ITEMS TOGGLE ----------
  
  const handleParticipantsCanDeleteItemsToggle = () => {
    const newValue = !participantsCanDeleteItems;
    enhancedLog(`Toggling participantsCanDeleteItems to: ${newValue}`);
    setParticipantsCanDeleteItems(newValue);
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

  // SIMPLIFIED: Check if we have any files and if any are selected
  const hasAnyFiles = selectedPhotos.length > 0 || existingFiles.length > 0;
  const hasSelectedFiles = selectedPhotoIndices.size > 0 || selectedExistingIndices.size > 0;

  // FIXED: Calculate total selected files count and tag map hash to trigger re-renders
  const totalSelectedFilesCount = React.useMemo(() => {
    const count = selectedPhotoIndices.size + selectedExistingIndices.size;
    enhancedLog(`Total selected files count updated: ${count}`);
    return count;
  }, [selectedPhotoIndices.size, selectedExistingIndices.size, enhancedLog]);

  // NEW: Calculate a hash of the tag maps to ensure re-render when tags change
  const tagMapsHash = React.useMemo(() => {
    const photoTagsHash = Array.from(photoTagsMap.entries()).map(([index, tags]) => 
      `${index}:${tags.map(t => `${t.tagTitle}(${t.subtags.map(s => s.subtagTitle).join(',')})`).join('|')}`
    ).join(';');
    
    const existingTagsHash = Array.from(existingFileTagsMap.entries()).map(([index, tags]) => 
      `${index}:${tags.map(t => `${t.tagTitle}(${t.subtags.map(s => s.subtagTitle).join(',')})`).join('|')}`
    ).join(';');
    
    return `${photoTagsHash}||${existingTagsHash}`;
  }, [photoTagsMap, existingFileTagsMap]);

  // ========== RENDER METHODS ==========

  return (
    <>
      <GlobalStyle />
      
      {/* Updated Fixed Header with proper alignment and gear icon positioning */}
      <FixedHeader>
        <FixedHeaderContent>
          <ProfileLink href="my-albums.html">
            {t('My Albums')}
          </ProfileLink>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Settings Dropdown - Moved to left side of Save Album button */}
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
                  <DropdownMenu>
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
                        <span>{participantsCanAddItems ? t('Allow Additions') : t('Do Not Allow Additions')}</span>
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
                      onClick={() => handleSettingsOptionClick(handleParticipantsCanDeleteItemsToggle)}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%'
                      }}>
                        <span>{participantsCanDeleteItems ? t('Allow Removals') : t('Do Not Allow Removals')}</span>
                        <span style={{ 
                          fontSize: '12px', 
                          color: participantsCanDeleteItems ? '#28a745' : '#6c757d',
                          fontWeight: 'bold'
                        }}>
                          {participantsCanDeleteItems ? '✓' : '○'}
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
          </div>
        </FixedHeaderContent>
      </FixedHeader>

      {/* NEW: Use Body component for proper fixed header spacing */}
      <Body $isRTL={isRTL}>
        {/* Folder Details - Only show if user is creator with updated placeholder text */}
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
        
        {/* Loading Existing Files Message */}
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
        
        {/* SIMPLIFIED: Unified Tagging Section - Only show if user is creator and has files */}
        {showFolderDetails && isCreator === true && hasAnyFiles && (
          <TaggingSectionContainer t={t} isRTL={isRTL}>
            {/* Existing Files Section */}
            {existingFiles.length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <ExistingFilesSection
                  existingFiles={existingFiles}
                  selectedExistingIndices={selectedExistingIndices}
                  onToggleSelection={toggleExistingFileSelection}
                  onSelectAll={selectAllExistingFiles}
                  onDeselectAll={deselectAllExistingFiles}
                  onDeleteFile={removeExistingFile}
                  disabled={isTaggingDisabled}
                  isCreator={isCreator}
                  participantsCanDeleteItems={participantsCanDeleteItems}
                  existingFileTagsMap={existingFileTagsMap} // NEW: Pass existing file tags map
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
              photoTagsMap={photoTagsMap} // NEW: Pass photo tags map
              t={t}
              isRTL={isRTL}
            />
            
            {/* SIMPLIFIED: Tags Section - FIXED to ensure proper re-rendering */}
            <div style={{ marginTop: hasSelectedFiles ? '32px' : '16px' }}>
              <TagsDisplay 
                key={`tags-${totalSelectedFilesCount}-${tagMapsHash.slice(0, 20)}`} // FIXED: Force re-render when selection OR tags change
                tagsManager={tagsManager}
                disabled={isTaggingDisabled}
                enhancedLog={enhancedLog}
              />
            </div>
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