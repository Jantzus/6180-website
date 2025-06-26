import React, { useMemo, useCallback, useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import { I18nProvider } from "@/lib/i18n/context";
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n";
import { useFileUploadProcessor } from "@/lib/useFileUploadProcessor";
import { redirectTo, generateUrl } from "@/lib/utils";
import { prewarmCredentials } from "@/lib/s3";
import { LOCAL_STORAGE_KEYS } from "@/lib/config";
import { FolderType } from "@/lib/types";

// Import components
import {
  GlobalStyle,
  AppContainer,
} from "@/styles/styled-components";
import { MyAlbumsHeader } from "./MyAlbumsHeader";
import { AlbumsFilter } from "./AlbumsFilter";
import { UploadProgress } from "@/components/UploadProgress";
import { AlbumList } from "@/components/AlbumList";
import { LazyImage } from "@/components/LazyImage";

// Import the new components and utilities
import { AlbumCreationModal, FolderStructure } from "./AlbumCreationModal";
import { 
  analyzeFolderStructure, 
  hasLevel1Subfolders, 
  createAlbumGroupsFromSelectedPhotos,
  storeFolderStructureMetadata,
  getFolderStructureMetadata,
  clearFolderStructureMetadata,
  getUserAlbumPreference, 
  clearUserAlbumPreference,
  setUserAlbumPreference
} from "@/lib/folderStructureUtils";

// Import custom hooks and utilities
import { useFolderManagement } from "@/lib/useFolderManagement";

// Constants
const FREE_TIER_STORAGE_LIMIT_GB = 10;
const MAX_PREVIEW_IMAGES = 3;

// Types
interface SubscriptionInfo {
  intNumberOfSubscriptions: number;
  bytesOfDataUsed: number;
}

interface FileInputAttributes extends React.InputHTMLAttributes<HTMLInputElement> {
  webkitdirectory?: string;
}

// FIXED: Single file filtering function with minimal logging
const isValidMediaFile = (file: File): boolean => {
  // Filter out system files
  if (file.name.startsWith('.DS_Store') || 
      file.name.startsWith('._') || 
      file.name.startsWith('Thumbs.db') ||
      file.name.startsWith('.') ||
      file.name === 'desktop.ini') {
    return false;
  }
  
  // Check if it's a valid media file
  const validTypes = /\.(jpg|jpeg|png|gif|bmp|webp|svg|mp4|mov|avi|wmv|flv|webm|mkv)$/i;
  if (!validTypes.test(file.name)) {
    return false;
  }
  
  // Check file size (avoid 0 byte files)
  return file.size > 0;
};

// FIXED: Optimized file filtering with single pass - no redundant calculations
const filterValidFiles = (files: File[]): { validFiles: File[]; filteredCount: number } => {
  const validFiles: File[] = [];
  let filteredCount = 0;
  
  for (const file of files) {
    if (!file || !file.name) {
      filteredCount++;
      continue;
    }
    
    if (isValidMediaFile(file)) {
      validFiles.push(file);
    } else {
      filteredCount++;
    }
  }
  
  return { validFiles, filteredCount };
};

// Enhanced File Input Component with folder support
const EnhancedFileInput = React.forwardRef<HTMLInputElement, {
  onFileSelection: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFolderSelection: (e: React.ChangeEvent<HTMLInputElement>) => void;
}>(({ onFileSelection, onFolderSelection }, ref) => {
  return (
    <div style={{ display: 'none' }}>
      <input
        ref={ref}
        id="file-input"
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={onFileSelection}
        style={{ display: 'none' }}
      />
      
      <input
        id="folder-input"
        type="file"
        accept="image/*,video/*"
        multiple
        {...({ webkitdirectory: "" } as FileInputAttributes)}
        onChange={onFolderSelection}
        style={{ display: 'none' }}
      />
    </div>
  );
});

EnhancedFileInput.displayName = 'EnhancedFileInput';

// Elegant App Promotion Component - SSR-safe
const AppDownloadPromotion = React.memo(({ 
  t, 
  isRTL 
}: { 
  t: (key: string) => string; 
  isRTL: boolean; 
}) => {
  return (
    <div style={{
      padding: '20px 24px',
      marginTop: '20px',
      marginBottom: '20px',
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      borderRadius: '8px',
      textAlign: isRTL ? 'right' : 'left',
      direction: isRTL ? 'rtl' : 'ltr',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      position: 'relative'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '4px',
            color: '#333',
            lineHeight: '1.3'
          }}>
            {t('Use the 6180 app to showcase your albums offline')}
          </div>
          <div style={{
            fontSize: '14px',
            color: '#666',
            lineHeight: '1.4',
            fontWeight: '400'
          }}>
            {t('Intelligently tagged and beautifully organized')}
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          flexShrink: 0
        }}>
          <a
            href="https://apps.apple.com/app/6180/id6468679610"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              backgroundColor: '#007bff',
              borderRadius: '8px',
              textDecoration: 'none',
              color: 'white',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0056b3';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#007bff';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span style={{ fontSize: '16px' }}>🍎</span>            
            {t('Open On iOS')}
          </a>
          
          <a
            href="https://play.google.com/store/apps/details?id=io.i6180.android"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              backgroundColor: '#007bff',
              borderRadius: '8px',
              textDecoration: 'none',
              color: 'white',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0056b3';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#007bff';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span style={{ fontSize: '16px' }}>🤖</span>            
            {t('Open On Android')}
          </a>
        </div>
      </div>
    </div>
  );
});

// Helper function to convert bytes to GB
const bytesToGB = (bytes: number): number => {
  return bytes / (1024 * 1024 * 1024);
};

// Helper function to format GB display
const formatGB = (gb: number): string => {
  return gb < 1 ? `${Math.round(gb * 1000)} MB` : `${gb.toFixed(1)} GB`;
};

// Memoized helper function to get albums that should be marked for deletion
const getAlbumsToDelete = (folders: FolderType[], subscriptionInfo: SubscriptionInfo | null, calculatedBytesUsed: number): FolderType[] => {
  if (!subscriptionInfo) {
    return [];
  }

  const { intNumberOfSubscriptions } = subscriptionInfo;
  
  let albumsToDelete: FolderType[] = [];
  
  if (intNumberOfSubscriptions === 0) {
    const storageLimit = FREE_TIER_STORAGE_LIMIT_GB * 1024 * 1024 * 1024;
    
    if (folders.length > 5) {
      const sortedByOldest = [...folders].sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return dateA - dateB;
      });
      
      const excessAlbums = folders.length - 5;
      const albumsForCountDeletion = sortedByOldest.slice(0, excessAlbums);
      albumsToDelete = [...albumsForCountDeletion];
    }
    
    if (calculatedBytesUsed > storageLimit) {
      const sortedByOldest = [...folders].sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return dateA - dateB;
      });
      
      let bytesToRemove = calculatedBytesUsed - storageLimit;
      const albumsForStorageDeletion: FolderType[] = [];
      
      for (const folder of sortedByOldest) {
        if (bytesToRemove <= 0) break;
        
        const albumBytes = folder.files.reduce((total: number, file: FolderType['files'][0]) => {
          return total + (file.dataInBytes || 0);
        }, 0);
        
        albumsForStorageDeletion.push(folder);
        bytesToRemove -= albumBytes;
      }
      
      const markedIds = new Set(albumsToDelete.map(album => album.folderId));
      for (const album of albumsForStorageDeletion) {
        if (!markedIds.has(album.folderId)) {
          albumsToDelete.push(album);
        }
      }
    }
  } else {
    const totalStorageBytes = intNumberOfSubscriptions * 10 * 1024 * 1024 * 1024;
    
    if (calculatedBytesUsed > totalStorageBytes) {
      const sortedByOldest = [...folders].sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return dateA - dateB;
      });
      
      let bytesToRemove = calculatedBytesUsed - totalStorageBytes;
      
      for (const folder of sortedByOldest) {
        if (bytesToRemove <= 0) break;
        
        const albumBytes = folder.files.reduce((total: number, file: FolderType['files'][0]) => {
          return total + (file.dataInBytes || 0);
        }, 0);
        
        albumsToDelete.push(folder);
        bytesToRemove -= albumBytes;
      }
    }
  }
  
  return albumsToDelete;
};

// Optimized component to display albums marked for deletion with LIMITED image previews
const AlbumDeletionPreview = React.memo(({ 
  albumsToDelete, 
  isRTL 
}: { 
  albumsToDelete: FolderType[]; 
  isRTL: boolean; 
}) => {

  const { t } = useTranslation();

  if (albumsToDelete.length === 0) return null;

  return (
    <div style={{ marginTop: '16px' }}>
      {albumsToDelete.map((folder) => (
        <div key={folder.folderId} style={{ 
          marginBottom: '20px',
          direction: isRTL ? "rtl" : "ltr"
        }}>
          <div style={{
            background: '#fff',
            border: '2px solid #dc3545',
            borderRadius: '12px',
            padding: '20px',
            position: 'relative',
            overflow: 'hidden',
            opacity: '0.85'
          }}>

            <div style={{ 
              marginTop: '30px',
              marginBottom: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexDirection: isRTL ? "row-reverse" : "row"
            }}>
              <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: isRTL ? "flex-end" : "flex-start"
              }}>
                <h3 style={{
                  fontSize: '18px',
                  margin: '0 0 4px 0',
                  color: '#dc3545',
                  fontWeight: 'bold'
                }}>
                  {folder.folderName || "Untitled Album"}
                </h3>
                <div style={{
                  fontSize: '13px',
                  color: '#666',
                  textAlign: isRTL ? 'right' : 'left'
                }}>
                  {folder.createdAt && (
                    <div>{t('Created')}: {new Date(folder.createdAt).toLocaleDateString()}</div>
                  )}
                  <div>
                    {folder.files.length === 1 
                      ? t('{{count}} file', { count: folder.files.length.toString() })
                      : t('{{count}} files', { count: folder.files.length.toString() })
                    }
                  </div>
                </div>
              </div>
            </div>

            {folder.folderDescription && folder.folderDescription.length > 1 && (
              <div style={{
                fontSize: '14px',
                color: '#555',
                marginBottom: '16px',
                textAlign: isRTL ? 'right' : 'left',
                fontStyle: 'italic'
              }}>
                {folder.folderDescription}
              </div>
            )}

            <div style={{ width: '100%', position: 'relative' }}>
              <div style={{
                display: 'flex',
                overflowX: 'auto',
                gap: '12px',
                paddingBottom: '8px',
                msOverflowStyle: 'none',
                scrollbarWidth: 'thin',
                WebkitOverflowScrolling: 'touch',
                maxWidth: '100%',
                flexDirection: isRTL ? "row-reverse" : "row"
              }}>
                {folder.files.slice(0, MAX_PREVIEW_IMAGES).map((file: FolderType['files'][0], i: number) => (
                  <div key={i} style={{
                    width: '160px',
                    height: '100px',
                    flexShrink: 0,
                    position: 'relative',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    border: '2px solid #dc3545'
                  }}>
                    <LazyImage
                      thumbnailDataKey={file.thumbnailDataKey}
                      dataKey={file.dataKey}
                      alt={t('Thumbnail')}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      right: '0',
                      bottom: '0',
                      background: 'rgba(220, 53, 69, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '24px'
                    }}>
                      ❌
                    </div>
                  </div>
                ))}
                
                {folder.files.length > MAX_PREVIEW_IMAGES && (
                  <div style={{
                    width: '160px',
                    height: '100px',
                    flexShrink: 0,
                    position: 'relative',
                    borderRadius: '6px',
                    border: '2px dashed #dc3545',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f8f9fa',
                    color: '#dc3545',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    +{folder.files.length - MAX_PREVIEW_IMAGES} more
                  </div>
                )}
              </div>
              
              {folder.files.length > 2 && (
                <div style={{
                  position: 'absolute',
                  [isRTL ? "left" : "right"]: 0,
                  top: 0,
                  bottom: 8,
                  width: '30px',
                  background: isRTL
                    ? "linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))"
                    : "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))",
                  pointerEvents: 'none'
                }} />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

// MEMOIZED Storage message component
const StorageMessage = React.memo(({ 
  subscriptionInfo, 
  albumCount, 
  folders,
  calculatedBytesUsed,
  t, 
  isRTL 
}: { 
  subscriptionInfo: SubscriptionInfo | null; 
  albumCount: number; 
  folders: FolderType[];
  calculatedBytesUsed: number;
  t: (key: string) => string; 
  isRTL: boolean; 
}) => {
  // Move useMemo before any early returns to comply with rules of hooks
  const albumsToDelete = useMemo(() => 
    subscriptionInfo ? getAlbumsToDelete(folders, subscriptionInfo, calculatedBytesUsed) : [],
    [folders, subscriptionInfo, calculatedBytesUsed]
  );

  // Early return after all hooks have been called
  if (!subscriptionInfo) {
    return null;
  }

  const { intNumberOfSubscriptions } = subscriptionInfo;
  const usedGB = bytesToGB(calculatedBytesUsed);
  
  let messageType: 'free-space' | 'free-count-exceeded' | 'free-storage-exceeded' | 'free-both-exceeded' | 'paid-warning' | 'paid-exceeded' | 'none' = 'none';
  let message = '';
  
  if (intNumberOfSubscriptions === 0) {
    const storageLimit = FREE_TIER_STORAGE_LIMIT_GB;
    const isOverAlbumCount = albumCount > 5;
    const isOverStorage = usedGB > storageLimit;
    
    if (!isOverAlbumCount && !isOverStorage) {
      messageType = 'free-space';
      message = t(`You can save 5 albums that total a maximum of {FREE_TIER_STORAGE_LIMIT_GB} GB for free. Delete unused albums to make space.`).replace('{FREE_TIER_STORAGE_LIMIT_GB}', storageLimit.toString());
    } else if (isOverAlbumCount && isOverStorage) {
      messageType = 'free-both-exceeded';
      message = t(`You have over 5 albums AND your files occupy {formatGB(usedGB)} space (limit: {FREE_TIER_STORAGE_LIMIT_GB} GB). These albums are being automatically deleted unless you decide to delete other albums:`).replace('{formatGB(usedGB)}', formatGB(usedGB)).replace('{FREE_TIER_STORAGE_LIMIT_GB}', storageLimit.toString());
    } else if (isOverAlbumCount) {
      messageType = 'free-count-exceeded';
      message = t(`You have {albumCount} albums but can only save 5 for free. These oldest albums are being automatically deleted unless you decide to delete other albums:`).replace('{albumCount}', albumCount.toString());
    } else if (isOverStorage) {
      messageType = 'free-storage-exceeded';
      message = t(`Your files occupy {formatGB(usedGB)} space, but you only have {FREE_TIER_STORAGE_LIMIT_GB} GB storage. These albums are being automatically deleted unless you decide to delete other albums:`).replace('{formatGB(usedGB)}', formatGB(usedGB)).replace('{FREE_TIER_STORAGE_LIMIT_GB}', storageLimit.toString());
    }
  } else {
    const totalStorageGB = intNumberOfSubscriptions * 10;
    const remainingGB = totalStorageGB - usedGB;
    
    if (remainingGB < 0) {
      messageType = 'paid-exceeded';
      message = t(`Your files occupy {formatGB(usedGB)} space, but you only have {totalStorageGB} GB storage. These albums are being automatically deleted unless you decide to delete other albums:`).replace('{formatGB(usedGB)}', formatGB(usedGB)).replace('{totalStorageGB}', totalStorageGB.toString());
    } else if (remainingGB < 1.5) {
      messageType = 'paid-warning';
      message = t(`Your files occupy {formatGB(usedGB)} of {totalStorageGB} GB storage. You may need to upgrade your subscription soon.`).replace('{formatGB(usedGB)}', formatGB(usedGB)).replace('{totalStorageGB}', totalStorageGB.toString());
    }
  }
  
  if (messageType === 'none') {
    return null;
  }
  
  const showDeletionPreview = ['free-count-exceeded', 'free-storage-exceeded', 'free-both-exceeded', 'paid-exceeded'].includes(messageType);
  
  return (
    <div style={{
      padding: '12px 20px',
      marginBottom: '16px',
      backgroundColor: showDeletionPreview ? '#fff3cd' : '#f8f9fa',
      border: `1px solid ${showDeletionPreview ? '#ffeaa7' : '#e9ecef'}`,
      borderRadius: '8px',
      color: showDeletionPreview ? '#856404' : '#6c757d',
      fontSize: '14px',
      textAlign: isRTL ? 'right' : 'left',
      direction: isRTL ? 'rtl' : 'ltr'
    }}>
      {message}
      
      {showDeletionPreview && albumsToDelete.length > 0 && (
        <AlbumDeletionPreview 
          albumsToDelete={albumsToDelete}
          isRTL={isRTL}
        />
      )}
      
      <div style={{ marginTop: '12px' }}>
        <a 
          href={generateUrl("storage/manage.html")}
          style={{ 
            color: '#007bff', 
            textDecoration: 'underline', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#0056b3';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#007bff';
          }}
        >
          {t('Click To Upgrade Subscription (US$1 monthly per 10 GB)')}
        </a>
      </div>
    </div>
  );
});

const MyAlbums = () => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";
  
  // SSR-safe device detection state
  const [isClient, setIsClient] = useState(false);
  
  // State for folder structure detection and modal
  const [showAlbumModal, setShowAlbumModal] = useState(false);
  const [detectedFolderStructure, setDetectedFolderStructure] = useState<FolderStructure | null>(null);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  
  // Add state to track if this is a new album creation
  const [isCreatingNewAlbum, setIsCreatingNewAlbum] = useState(false);
  
  // Add ref for folder input
  const folderInputRef = useRef<HTMLInputElement>(null);
  
  // SSR-safe device detection and client setup
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const { 
    folders,
    filteredFolders,
    publicUsername,
    cognitoUsername,
    searchQuery,
    setSearchQuery,
    handleContactFilterChange,
    resetContactFilter,
    handleTagFilterChange,
    resetTagFilter,
    handleDeleteClick,
    setFolders,
    subscriptionInfo,
    calculatedBytesUsed
  } = useFolderManagement((message: string) => {
    // FIXED: Minimal logging only for critical errors
    if (message.includes('Error') || message.includes('Failed')) {
      console.error(message);
    }
  });
  
  // FIXED: File upload processor with minimal logging and new album tracking
  const fileUploadProcessor = useFileUploadProcessor(
    (folderId) => {
      // SSR-safe metadata operations
      if (!isClient) return;
      
      try {
        // Check if we have folder structure metadata for multi-album processing
        const metadata = getFolderStructureMetadata();
        if (metadata) {
          const storedPhotos = localStorage.getItem(LOCAL_STORAGE_KEYS.SELECTED_PHOTOS);
          if (storedPhotos) {
            const selectedPhotos = JSON.parse(storedPhotos);
            const albumGroups = createAlbumGroupsFromSelectedPhotos(selectedPhotos);
            
            if (albumGroups.length > 1) {
              const multiAlbumData = albumGroups.map(group => ({
                name: group.name,
                selectedPhotos: group.selectedPhotos,
                folderPath: group.folderPath
              }));
              
              localStorage.setItem(LOCAL_STORAGE_KEYS.MULTI_ALBUM_DATA, JSON.stringify(multiAlbumData));
              clearFolderStructureMetadata();
              redirectTo("save-album.html?mode=multiple");
              return;
            } else {
              clearFolderStructureMetadata();
            }
          } else {
            clearFolderStructureMetadata();
          }
        }
      } catch (error) {
        console.error('Error processing multi-album data:', error);
        if (typeof clearFolderStructureMetadata === 'function') {
          clearFolderStructureMetadata();
        }
      }
      
      // Normal single album navigation
      // If this was initiated as a new album, don't include folderId in URL
      if (isCreatingNewAlbum) {
        setIsCreatingNewAlbum(false); // Reset the flag
        redirectTo("save-album.html");
      } else if (folderId) {
        const targetUrl = `save-album.html?folderId=${encodeURIComponent(folderId)}`;
        redirectTo(targetUrl);
      } else {
        redirectTo("save-album.html");
      }
    },
    false
  );
  
  const {
    fileInputRef,
    isUploading,
    isProcessingFiles,
    progressTracker,
    setSelectedPhotos,
  } = fileUploadProcessor;

  // SSR-safe credential prewarming
  useEffect(() => {
    if (!isClient) return;
    
    const warmUpPageCredentials = async () => {
      try {
        await prewarmCredentials();
      } catch (error) {
        console.warn("Credential prewarming failed:", error);
      }
    };
    
    warmUpPageCredentials();
  }, [isClient]);
  
  // MEMOIZED: Get albums that should be marked for deletion
  const albumsToDelete = useMemo(() => 
    subscriptionInfo ? getAlbumsToDelete(folders, subscriptionInfo, calculatedBytesUsed) : [],
    [folders, subscriptionInfo, calculatedBytesUsed]
  );
  
  const albumsToDeleteIds = useMemo(() => 
    new Set(albumsToDelete.map(album => album.folderId)),
    [albumsToDelete]
  );
  
  const displayFolders = useMemo(() =>
    filteredFolders.filter(folder => !albumsToDeleteIds.has(folder.folderId)),
    [filteredFolders, albumsToDeleteIds]
  );

  // FIXED: Enhanced file selection with single-pass filtering and minimal logging
  const handleFileSelection = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isClient) return false;
    
    const files = Array.from(e.target.files || []);
    if (!files.length) {
      return false;
    }

    // FIXED: Single-pass file filtering - no redundant calculations
    const { validFiles, filteredCount } = filterValidFiles(files);

    if (validFiles.length === 0) {
      alert("No valid image or video files were selected. Please select media files.");
      return false;
    }

    // FIXED: Minimal logging - only report if files were filtered
    if (filteredCount > 0) {
      console.log(`Filtered out ${filteredCount} invalid/system files`);
    }
    
    // Continue with folder structure analysis using filtered files
    const folderStructure = analyzeFolderStructure(validFiles);
    
    // Check if we have meaningful subfolders
    if (folderStructure && hasLevel1Subfolders(folderStructure)) {
      const userPreference = getUserAlbumPreference();
      
      if (userPreference) {
        // Store metadata and proceed with normal upload
        storeFolderStructureMetadata(folderStructure, userPreference, validFiles);
        
        // Create synthetic event with filtered files
        const dt = new DataTransfer();
        validFiles.forEach(file => dt.items.add(file));
        
        const syntheticEvent = { ...e, target: { ...e.target, files: dt.files } };
        
        // Proceed with normal file upload flow
        try {
          await fileUploadProcessor.handleFileSelection(syntheticEvent as React.ChangeEvent<HTMLInputElement>, cognitoUsername);
        } catch (error) {
          console.error("Error in file upload:", error);
          clearFolderStructureMetadata();
        }
      } else {
        // Show modal for user choice
        setDetectedFolderStructure(folderStructure);
        setPendingFiles(validFiles);
        setShowAlbumModal(true);
      }
    } else {
      // Create synthetic event with filtered files for single album
      const dt = new DataTransfer();
      validFiles.forEach(file => dt.items.add(file));
      
      const syntheticEvent = { ...e, target: { ...e.target, files: dt.files } };
      
      // Proceed with normal single album flow
      try {
        await fileUploadProcessor.handleFileSelection(syntheticEvent as React.ChangeEvent<HTMLInputElement>, cognitoUsername);
      } catch (error) {
        console.error("Error in single album file selection:", error);
      }
    }
    
    return true;
  }, [fileUploadProcessor, cognitoUsername, isClient]);

  // Album creation choice handler
  const handleAlbumCreationChoice = useCallback((choice: 'separate' | 'combined', files: File[], folderStructure: FolderStructure) => {
    if (!isClient) return;
    
    // Store user preference for this session
    setUserAlbumPreference(choice);
    
    // Store folder structure metadata in sessionStorage
    storeFolderStructureMetadata(folderStructure, choice, files);
    
    // Close modal and reset state
    setShowAlbumModal(false);
    setDetectedFolderStructure(null);
    setPendingFiles([]);
    
    // Create a synthetic event and proceed with normal upload flow
    const fileInput = fileInputRef.current;
    if (fileInput) {
      try {
        // Clear the current files and add new ones
        const dt = new DataTransfer();
        files.forEach(file => {
          if (file && file.name) {
            dt.items.add(file);
          }
        });
        fileInput.files = dt.files;
        
        // Create synthetic event
        const syntheticEvent = new Event('change', { bubbles: true });
        Object.defineProperty(syntheticEvent, 'target', {
          writable: false,
          value: fileInput
        });
        
        fileUploadProcessor.handleFileSelection(syntheticEvent as unknown as React.ChangeEvent<HTMLInputElement>, cognitoUsername);
      } catch (error) {
        console.error("Error in album creation flow:", error);
        clearFolderStructureMetadata();
      }
    } else {
      console.error("File input ref not available");
      clearFolderStructureMetadata();
    }
  }, [fileUploadProcessor, cognitoUsername, fileInputRef, isClient]);

  // Handle folder selection (same logic as file selection)
  const handleFolderSelection = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    return handleFileSelection(e);
  }, [handleFileSelection]);

  // Handle modal cancel
  const handleModalCancel = useCallback(() => {
    setShowAlbumModal(false);
    setDetectedFolderStructure(null);
    setPendingFiles([]);
    
    // Reset the new album flag
    setIsCreatingNewAlbum(false);
    
    // Clear both file inputs
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (folderInputRef.current) {
      folderInputRef.current.value = "";
    }
    
    // Clear any stored preference and metadata - SSR-safe
    if (isClient) {
      clearUserAlbumPreference();
      clearFolderStructureMetadata();
    }
  }, [fileInputRef, isClient]);

  // Open file picker with cleanup and support for both files and folders
  const openFilePicker = useCallback((folderId: string | null = null, mode: 'files' | 'folder' = 'files') => {
    if (!isClient) return;
    
    try {
      // Set the new album flag if folderId is null (new album)
      setIsCreatingNewAlbum(folderId === null);
      
      // Clear any previous album groups and metadata - SSR-safe
      clearUserAlbumPreference();
      clearFolderStructureMetadata();
      localStorage.removeItem(LOCAL_STORAGE_KEYS.MULTI_ALBUM_DATA);
      
      // Clear selected photos when starting a new album or adding to existing
      setSelectedPhotos([]);

      // Use the appropriate file input based on mode
      if (mode === 'folder') {
        if (folderInputRef.current) {
          folderInputRef.current.click();
        } else {
          throw new Error("Folder picker not available");
        }
      } else {
        // Use the shared file picker for individual files
        fileUploadProcessor.openFilePicker(folderId);
      }
    } catch (error) {
      console.error("Error opening file picker:", error);
      setIsCreatingNewAlbum(false); // Reset flag on error
      alert("Sorry, there was an error opening the file picker. Please try again.");
    }
  }, [fileUploadProcessor, setSelectedPhotos, isClient]);

  // Add handlers for the enhanced upload buttons
  const handleSelectFiles = useCallback(() => {
    try {
      openFilePicker(null, 'files');
    } catch (error) {
      console.error("Error selecting files:", error);
    }
  }, [openFilePicker]);

  const handleSelectFolder = useCallback(() => {
    try {
      openFilePicker(null, 'folder');
    } catch (error) {
      console.error("Error selecting folder:", error);
    }
  }, [openFilePicker]);

  // Check if we should show the combined search and filter
  const shouldShowSearchAndFilter = searchQuery.length > 0 || folders.some(folder => 
    (folder.contacts && Object.keys(folder.contacts).length > 0) || 
    folder.files.some(file => file.selectedTags && file.selectedTags.length > 0)
  );

  return (
    <>
      <GlobalStyle />
      <AppContainer $isRTL={isRTL}>
        <MyAlbumsHeader
          publicUsername={publicUsername}
          subscriptionInfo={subscriptionInfo}
          calculatedBytesUsed={calculatedBytesUsed}
          onNewAlbum={() => openFilePicker(null, 'files')}
          onSelectFiles={handleSelectFiles}
          onSelectFolder={handleSelectFolder}
        />

        {/* Upload progress */}
        {(isUploading || isProcessingFiles) && (
          <div style={{ width: '100%', marginBottom: '20px' }}>
            <UploadProgress 
              progressTracker={progressTracker}
              isUploading={isUploading}
              isProcessingFiles={isProcessingFiles}
              isRTL={getLanguageDirection(language) === "rtl"}
              style={{ marginTop: '20px' }}
              context="uploading"
              showSuccessMessage={true}
              showErrorMessage={true}
            />
          </div>
        )}

        {/* Storage limit message */}
        {folders.length > 3 && (
          <StorageMessage 
            subscriptionInfo={subscriptionInfo}
            albumCount={folders.length}
            folders={folders}
            calculatedBytesUsed={calculatedBytesUsed}
            t={t}
            isRTL={isRTL}
          />
        )}
        
        {/* App promotion for users with few albums */}
        {folders.length <= 3 && (
          <AppDownloadPromotion t={t} isRTL={isRTL} />
        )}

        {/* Search and filter */}
        {shouldShowSearchAndFilter && (
          <AlbumsFilter
            folders={folders}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onTagFilterChange={handleTagFilterChange}
            onContactFilterChange={handleContactFilterChange}
            resetTagFilter={resetTagFilter}
            resetContactFilter={resetContactFilter}
          />
        )}
        
        <AlbumList 
          folders={displayFolders}
          setFolders={setFolders}
          handleDeleteClick={(folderPositionId: string) => handleDeleteClick(folderPositionId, t)}
          isUploading={isUploading}
          cognitoUsername={cognitoUsername}
          isProfileView={false}
        />
        
        {/* Enhanced File Input with both file and folder support */}
        <EnhancedFileInput 
          ref={fileInputRef}
          onFileSelection={handleFileSelection}
          onFolderSelection={handleFolderSelection}
        />
        
        {/* Hidden folder input */}
        <input
          ref={folderInputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          {...({ webkitdirectory: "" } as FileInputAttributes)}
          onChange={handleFolderSelection}
          style={{ display: 'none' }}
        />

        {/* Album Creation Modal */}
        <AlbumCreationModal
          isOpen={showAlbumModal}
          folderStructure={detectedFolderStructure}
          onChoice={(choice) => handleAlbumCreationChoice(choice, pendingFiles, detectedFolderStructure!)}
          onCancel={handleModalCancel}
        />
      </AppContainer>
    </>
  )
}

// SSR-safe app initialization
const MyAlbumsApp = () => {

  // Render the app even during SSR, but defer client-specific features
  return (
    <I18nProvider>
      <MyAlbums />
    </I18nProvider>
  );
};

// Initialize the app with SSR-safe mounting
if (typeof window !== 'undefined' && document.getElementById("root")) {
  ReactDOM.createRoot(document.getElementById("root")!).render(<MyAlbumsApp />);
}