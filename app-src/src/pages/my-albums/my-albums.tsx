import React, { useMemo, useCallback, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { I18nProvider } from "@/lib/i18n/context";
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n";
import { useFileUploadProcessor } from "@/lib/useFileUploadProcessor";
import { redirectTo, generateUrl } from "@/lib/utils";
import { prewarmCredentials } from "@/lib/s3";

// Import components
import {
  GlobalStyle,
  AppContainer,
} from "@/styles/styled-components";
import { MyAlbumsHeader } from "./MyAlbumsHeader";
import { NewAlbumButton } from "@/components/NewAlbumButton";
import { SearchBar } from "@/components/SearchBar";
import { ContactsFilter } from "@/components/ContactsFilter";
import { UploadProgress } from "@/components/UploadProgress";
import { AlbumList } from "@/components/AlbumList";
import { FileInput } from "@/components/FileInput";
import { DebugLog } from "@/components/DebugLog";
import { LazyImage } from "@/components/LazyImage";

// Import custom hooks and utilities
import { useFolderManagement } from "./utils";

// Constants
const FREE_TIER_STORAGE_LIMIT_GB = 10;
const MAX_PREVIEW_IMAGES = 3; // Limit preview images to reduce bandwidth

// Elegant App Promotion Component - Consistent with Brand
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
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '16px',
          flex: '1',
          minWidth: '200px'
        }}>
          {/* App icon using actual logo */}
          <img 
            src={generateUrl("images/logo_no_background.png")}
            alt="6180 App Icon"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              flexShrink: 0,
              objectFit: 'cover'
            }}
          />
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
        </div>
        
        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          flexShrink: 0
        }}>
          <a
            href="#" // Replace with App Store URL
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
            iOS App
          </a>
          
          <a
            href="#" // Replace with Google Play URL
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
            Android App
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
const getAlbumsToDelete = (folders: any[], subscriptionInfo: any, calculatedBytesUsed: number): any[] => {
  // Return empty array if subscriptionInfo is not loaded yet
  if (!subscriptionInfo) {
    return [];
  }

  const { intNumberOfSubscriptions } = subscriptionInfo;
  
  let albumsToDelete: any[] = [];
  
  if (intNumberOfSubscriptions === 0) {
    // Free tier
    const storageLimit = FREE_TIER_STORAGE_LIMIT_GB * 1024 * 1024 * 1024; // Convert to bytes
    
    // Check if over album count limit (5 albums)
    if (folders.length > 5) {
      // Sort by creation date (oldest first) and take the excess albums
      const sortedByOldest = [...folders].sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return dateA - dateB; // Oldest first
      });
      
      const excessAlbums = folders.length - 5;
      const albumsForCountDeletion = sortedByOldest.slice(0, excessAlbums);
      albumsToDelete = [...albumsForCountDeletion];
    }
    
    // Check if over storage limit
    if (calculatedBytesUsed > storageLimit) {
      // Calculate which albums to delete to get under the storage limit
      // Sort by oldest first, then calculate cumulative storage to remove
      const sortedByOldest = [...folders].sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return dateA - dateB; // Oldest first
      });
      
      let bytesToRemove = calculatedBytesUsed - storageLimit;
      let albumsForStorageDeletion: any[] = [];
      
      for (const folder of sortedByOldest) {
        if (bytesToRemove <= 0) break;
        
        // Calculate total bytes for this album
        const albumBytes = folder.files.reduce((total: number, file: any) => {
          return total + (file.dataInBytes || 0);
        }, 0);
        
        albumsForStorageDeletion.push(folder);
        bytesToRemove -= albumBytes;
      }
      
      // Merge with albums already marked for deletion due to count limit
      // Use a Set to avoid duplicates
      const markedIds = new Set(albumsToDelete.map(album => album.folderId));
      for (const album of albumsForStorageDeletion) {
        if (!markedIds.has(album.folderId)) {
          albumsToDelete.push(album);
        }
      }
    }
  } else {
    // Paid tier - only storage limit applies
    const totalStorageBytes = intNumberOfSubscriptions * 10 * 1024 * 1024 * 1024; // Convert GB to bytes
    
    if (calculatedBytesUsed > totalStorageBytes) {
      // Calculate which albums to delete to get under the storage limit
      const sortedByOldest = [...folders].sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return dateA - dateB; // Oldest first
      });
      
      let bytesToRemove = calculatedBytesUsed - totalStorageBytes;
      
      for (const folder of sortedByOldest) {
        if (bytesToRemove <= 0) break;
        
        // Calculate total bytes for this album
        const albumBytes = folder.files.reduce((total: number, file: any) => {
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
  albumsToDelete: any[]; 
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

            {/* Album header */}
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

            {/* Album description */}
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

            {/* LIMITED Photo gallery preview - ONLY show first few images */}
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
                {/* BANDWIDTH FIX: Only show first MAX_PREVIEW_IMAGES files */}
                {folder.files.slice(0, MAX_PREVIEW_IMAGES).map((file: any, i: number) => (
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
                      // BANDWIDTH FIX: Only pass necessary props, avoid redundant src
                      thumbnailDataKey={file.thumbnailDataKey}
                      dataKey={file.dataKey}
                      alt={t('Thumbnail')}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    {/* Overlay to show "will be deleted" effect */}
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
                
                {/* Show indicator if there are more files */}
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
              
              {/* Gradient overlay for scrolling indication */}
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
  subscriptionInfo: { intNumberOfSubscriptions: number; bytesOfDataUsed: number; } | null; 
  albumCount: number; 
  folders: any[];
  calculatedBytesUsed: number;
  t: (key: string) => string; 
  isRTL: boolean; 
}) => {
  // Don't show anything if subscription info is not loaded yet
  if (!subscriptionInfo) {
    return null;
  }

  const { intNumberOfSubscriptions } = subscriptionInfo;
  const usedGB = bytesToGB(calculatedBytesUsed);
  
  // MEMOIZED: Get albums that should be marked for deletion
  const albumsToDelete = useMemo(() => 
    getAlbumsToDelete(folders, subscriptionInfo, calculatedBytesUsed),
    [folders, subscriptionInfo, calculatedBytesUsed]
  );
  
  // Determine which message to show based on conditions
  let messageType: 'free-space' | 'free-count-exceeded' | 'free-storage-exceeded' | 'free-both-exceeded' | 'paid-warning' | 'paid-exceeded' | 'none' = 'none';
  let message = '';
  
  if (intNumberOfSubscriptions === 0) {
    // Free tier logic
    const storageLimit = FREE_TIER_STORAGE_LIMIT_GB;
    const isOverAlbumCount = albumCount > 5;
    const isOverStorage = usedGB > storageLimit;
    
    if (!isOverAlbumCount && !isOverStorage) {
      // Within limits - show helpful info
      messageType = 'free-space';
      message = t(`You can save 5 albums that total a maximum of {FREE_TIER_STORAGE_LIMIT_GB} GB for free. Delete unused albums to make space.`).replace('{FREE_TIER_STORAGE_LIMIT_GB}', storageLimit.toString());
    } else if (isOverAlbumCount && isOverStorage) {
      // Over both limits
      messageType = 'free-both-exceeded';
      message = t(`You have over 5 albums AND your files occupy {formatGB(usedGB)} space (limit: {FREE_TIER_STORAGE_LIMIT_GB} GB). These albums are being automatically deleted unless you decide to delete other albums:`).replace('{formatGB(usedGB)}', formatGB(usedGB)).replace('{FREE_TIER_STORAGE_LIMIT_GB}', storageLimit.toString());
    } else if (isOverAlbumCount) {
      // Over album count only
      messageType = 'free-count-exceeded';
      message = t(`You have {albumCount} albums but can only save 5 for free. These oldest albums are being automatically deleted unless you decide to delete other albums:`).replace('{albumCount}', albumCount.toString());
    } else if (isOverStorage) {
      // Over storage only
      messageType = 'free-storage-exceeded';
      message = t(`Your files occupy {formatGB(usedGB)} space, but you only have {FREE_TIER_STORAGE_LIMIT_GB} GB storage. These albums are being automatically deleted unless you decide to delete other albums:`).replace('{formatGB(usedGB)}', formatGB(usedGB)).replace('{FREE_TIER_STORAGE_LIMIT_GB}', storageLimit.toString());
    }
  } else {
    // Paid tier logic
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
  
  // Determine if this is an "exceeded" state that shows album deletion preview
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
      
      {/* Show visual album preview for albums marked for deletion */}
      {showDeletionPreview && albumsToDelete.length > 0 && (
        <AlbumDeletionPreview 
          albumsToDelete={albumsToDelete}
          isRTL={isRTL}
        />
      )}
      
      {/* Consistent upgrade link for all message types */}
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
  // Get translation function from the hook for the main component
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";
  
  // Use the folder management hook
  const { 
    folders,
    filteredFolders,
    publicUsername,
    cognitoUsername,
    searchQuery,
    setSearchQuery,
    handleContactFilterChange,
    resetContactFilter,
    handleDeleteClick,
    setFolders,
    subscriptionInfo,
    calculatedBytesUsed
  } = useFolderManagement((message: string) => log(message));
  
  // Directly integrate the file upload processor hook
  const fileUploadProcessor = useFileUploadProcessor((folderId) => {
    // Custom navigation callback for the album upload flow
    if (folderId) {
      redirectTo(`save-album.html?folderId=${encodeURIComponent(folderId)}`);
    } else {
      redirectTo("save-album.html");
    }
  });
  
  // Destructure the file upload processor for easier access
  const {
    fileInputRef,
    isUploading,
    isProcessingFiles,
    progressTracker,
    debugMessages,
    setSelectedPhotos,
    log
  } = fileUploadProcessor;

  // NEW: Prewarm S3 credentials when the page loads for extra reliability
  useEffect(() => {
    const warmUpPageCredentials = async () => {
      try {
        await prewarmCredentials();
        log("🔥 Page-level S3 credentials prewarmed successfully");
      } catch (error) {
        log(`⚠️ Page-level credential prewarming failed: ${String(error)}`);
      }
    };
    
    warmUpPageCredentials();
  }, []); // Empty dependency array - run once when page loads
  
  // MEMOIZED: Get albums that should be marked for deletion (only if subscriptionInfo is loaded)
  const albumsToDelete = useMemo(() => 
    subscriptionInfo ? getAlbumsToDelete(folders, subscriptionInfo, calculatedBytesUsed) : [],
    [folders, subscriptionInfo, calculatedBytesUsed]
  );
  
  const albumsToDeleteIds = useMemo(() => 
    new Set(albumsToDelete.map(album => album.folderId)),
    [albumsToDelete]
  );
  
  // MEMOIZED: Filter out albums marked for deletion from the main list
  const displayFolders = useMemo(() =>
    filteredFolders.filter(folder => !albumsToDeleteIds.has(folder.folderId)),
    [filteredFolders, albumsToDeleteIds]
  );

  // MEMOIZED: Specialized open file picker for album upload
  const openFilePicker = useCallback((folderId: string | null = null) => {
    // Clear selected photos when starting a new album
    setSelectedPhotos([]);

    // Use the shared file picker
    fileUploadProcessor.openFilePicker(folderId);
  }, [fileUploadProcessor]);

  // MEMOIZED: Specialized file selection handler that passes the cognitoUsername
  const handleFileSelection = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    return await fileUploadProcessor.handleFileSelection(e, cognitoUsername);
  }, [fileUploadProcessor, cognitoUsername]);

  return (
    <>
      <GlobalStyle />
      <AppContainer $isRTL={isRTL}>
        <MyAlbumsHeader
          publicUsername={publicUsername}
        />

        {/* Create Album button with storage indicator */}
        <div style={{
          display: "flex",
          alignItems: "baseline",
          gap: "16px",
          marginBottom: "16px",
          direction: isRTL ? "rtl" : "ltr"
        }}>
          <NewAlbumButton
            isUploading={isUploading}
            isProcessingFiles={isProcessingFiles}
            openFilePicker={openFilePicker}
            t={t}
            isRTL={isRTL}
          />
          
          {/* Storage usage indicator as hyperlink */}
          {subscriptionInfo && (
            <a 
              href={generateUrl("storage/manage.html")}
              style={{
                fontSize: "14px",
                color: "#007bff",
                fontWeight: "500",
                whiteSpace: "nowrap",
                textDecoration: "underline",
                transition: "color 0.2s ease",
                lineHeight: "1.5",
                marginTop: "2px",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#0056b3";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#007bff";
              }}
            >
              {formatGB(bytesToGB(calculatedBytesUsed))} / {
                subscriptionInfo.intNumberOfSubscriptions === 0 
                  ? FREE_TIER_STORAGE_LIMIT_GB
                  : subscriptionInfo.intNumberOfSubscriptions * 10
              } GB
            </a>
          )}
        </div>
        
        {/* Dynamic storage limit message - only show if more than 3 albums */}
        {displayFolders.length > 3 && (
          <StorageMessage 
            subscriptionInfo={subscriptionInfo}
            albumCount={folders.length}
            folders={folders}
            calculatedBytesUsed={calculatedBytesUsed}
            t={t}
            isRTL={isRTL}
          />
        )}
        
        {/* Enhanced App promotion message for users with few albums */}
        {displayFolders.length <= 3 && (
          <AppDownloadPromotion t={t} isRTL={isRTL} />
        )}

        {/* Search Bar Component */}
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          t={t}
          isRTL={isRTL}
        />
        
        {/* Add the new ContactsFilter component here */}
        <ContactsFilter
          folders={folders}
          onFilterChange={handleContactFilterChange}
          resetFilter={resetContactFilter}
        />
        
        {/* Updated conditional rendering for enhanced status messages */}
        {(isUploading || isProcessingFiles) && (
          <div style={{ width: '100%', marginBottom: '20px' }}>
            <UploadProgress 
              progressTracker={progressTracker}
              isUploading={isUploading}
              isProcessingFiles={isProcessingFiles}
              isRTL={getLanguageDirection(language) === "rtl"}
              style={{ marginTop: '20px' }}
              context="uploading" // This keeps the traditional "Upload progress" text
              showSuccessMessage={true}
              showErrorMessage={true}
            />
          </div>
        )}
        
        <AlbumList 
          folders={displayFolders}
          setFolders={setFolders}
          handleDeleteClick={(folderPositionId: string) => handleDeleteClick(folderPositionId, t)}
          openFilePicker={openFilePicker}
          isUploading={isUploading}
          cognitoUsername={cognitoUsername}
          isProfileView={false}
        />
        
        {/* Use the refactored FileInput component */}
        <FileInput 
          onFileSelection={handleFileSelection} 
          ref={fileInputRef}
        />

        <DebugLog 
          debugMessages={debugMessages}
          t={t}
          isRTL={isRTL}
          textDirection={isRTL ? "rtl" : "ltr"}
        />
      </AppContainer>
    </>
  )
}

// Initialize the app with I18nProvider
ReactDOM.createRoot(document.getElementById("root")!).render(
  <I18nProvider>
    <MyAlbums />
  </I18nProvider>
)