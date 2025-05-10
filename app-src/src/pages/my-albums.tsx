import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import { checkLoginWithRefresh } from "@/lib/utils";
import { AWS_PRIVATE_GRAPHQL_ENDPOINT, LOCAL_STORAGE_KEYS } from "@/lib/config";
import { 
  Folder, 
  SelectedPhoto, 
  ProgressTracker
} from "@/lib/types";
import { I18nProvider, useTranslation } from "@/components/LanguageSelector";
import { getLanguageDirection } from "@/lib/i18n";
import { SupportedLanguage } from "@/lib/i18n/translations";

// Import components
import {
  GlobalStyle,
  AppContainer,
} from "@/styles/styled-components";
import { Header } from "@/components/Header";
import { CreateAlbumButton } from "@/components/CreateAlbumButton";
import { SearchBar } from "@/components/SearchBar";
import { ContactsFilter } from "@/components/ContactsFilter";
import { UploadProgress } from "@/components/UploadProgress";
import { AlbumList } from "@/components/AlbumList";
import { FileInput } from "@/components/FileInput";
import { DebugLog } from "@/components/DebugLog";

// Import utilities
import { 
  createLogger, 
  createPhotoStatusUpdater, 
  updateProgressTracker,
  processFilesBeforeUploadingToS3,
  clearAlbumData
} from "@/lib/file-upload-utils";
import { generateUUID } from "@/lib/utils";

const MyAlbums = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [filteredFolders, setFilteredFolders] = useState<Folder[]>([]);
  const [publicUsername, setPublicUsername] = useState<string | null>(null);
  const [cognitoUsername, setCognitoUsername] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedPhotos, setSelectedPhotos] = useState<SelectedPhoto[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [progressTracker, setProgressTracker] = useState<ProgressTracker>({
    totalFiles: 0,
    filesComplete: 0,
    filesUploading: 0,
    filesProcessing: 0,
    filesWithError: 0,
    overallProgress: 0
  });
  const [debugMessages, setDebugMessages] = useState<string[]>([]);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isContactFiltered, setIsContactFiltered] = useState<boolean>(false);
  
  // Add new state for file processing completion tracking
  const [fileProcessingComplete, setFileProcessingComplete] = useState(false);
  
  // Use the createLogger function from the utils
  const log = createLogger(setDebugMessages);
  
  // Load user data and fetch folders
  useEffect(() => {
    setPublicUsername(localStorage.getItem("publicUsername") || null);

    // Use async/await with the new checkLoginWithRefresh function
    const fetchUserAndFolders = async () => {
      const token = await checkLoginWithRefresh();
      if (!token) return;

      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const username = payload["cognito:username"];
        setCognitoUsername(username);
      } catch (err) {
        console.error("Failed to decode token", err);
      }

      await fetchFolders(token);
    };

    fetchUserAndFolders();
  }, []);

  // Initialize filteredFolders with all folders when folders changes
  useEffect(() => {
    if (!isContactFiltered) {
      setFilteredFolders(folders);
    }
  }, [folders, isContactFiltered]);

  // Filter folders based on search query
  useEffect(() => {
    if (searchQuery === "") {
      // If no search query but contact filter is active, don't reset
      if (!isContactFiltered) {
        setFilteredFolders(folders);
      }
      return;
    }
    
    // Apply search filter on top of current folders (either all or contact-filtered)
    const basefolders = isContactFiltered ? filteredFolders : folders;
    
    const searchFiltered = basefolders.filter(folder => {
      const nameMatch = folder.folderName?.toLowerCase().includes(searchQuery.toLowerCase());
      const descMatch = folder.folderDescription?.toLowerCase().includes(searchQuery.toLowerCase());
      return nameMatch || descMatch;
    });
    
    setFilteredFolders(searchFiltered);
  }, [searchQuery, folders, isContactFiltered]);

  // Add effect to handle navigation after file processing is complete
  useEffect(() => {
    if (fileProcessingComplete && selectedPhotos.length > 0) {
      // Show a completion message in the UI
      const successCount = selectedPhotos.filter(photo => photo.status === 'complete').length;
      const errorCount = selectedPhotos.filter(photo => photo.status === 'error').length;
      
      log(`✅ Upload complete: ${successCount} successful, ${errorCount} failed`);
      
      // Add a slight delay to show the completion state before redirecting
      setTimeout(() => {
        // Redirect to save-album page with folder ID parameter if adding to existing album
        if (currentFolderId) {
          window.location.href = `/save-album.html?folderId=${encodeURIComponent(currentFolderId)}`;
        } else {
          window.location.href = "/save-album.html";
        }
        
        // Clean up
        handleClearAlbumData();
      }, 1000);
    }
  }, [fileProcessingComplete, selectedPhotos.length, currentFolderId]);

  // Handle contact filter change
  const handleContactFilterChange = (contactFilteredFolders: Folder[]) => {
    setIsContactFiltered(true);
    setFilteredFolders(contactFilteredFolders);
    
    // If there's also a search query, apply that filter too
    if (searchQuery) {
      setFilteredFolders(prevFiltered => 
        prevFiltered.filter(folder => {
          const nameMatch = folder.folderName?.toLowerCase().includes(searchQuery.toLowerCase());
          const descMatch = folder.folderDescription?.toLowerCase().includes(searchQuery.toLowerCase());
          return nameMatch || descMatch;
        })
      );
    }
  };

  // Reset contact filter
  const resetContactFilter = () => {
    setIsContactFiltered(false);
    
    // If there's a search query, still filter by that
    if (searchQuery) {
      setFilteredFolders(
        folders.filter(folder => {
          const nameMatch = folder.folderName?.toLowerCase().includes(searchQuery.toLowerCase());
          const descMatch = folder.folderDescription?.toLowerCase().includes(searchQuery.toLowerCase());
          return nameMatch || descMatch;
        })
      );
    } else {
      // Otherwise show all folders
      setFilteredFolders(folders);
    }
  };
  
  // Separated fetchFolders function to use with the token
  const fetchFolders = async (token: string) => {
    const query = `
      mutation FetchRelations($fetchRelationsInput: FetchRelationsInput!) {
        fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
          items {
            ... on FolderPosition {
              id
              profileIds
              folder {
                id
                folderName
                folderDescription
                creatorId                
                folderPassword {
                  password
                  policy
                }
                fileReferencesPage {
                  items {
                    file {
                      ownerContactId
                      dataKey
                      thumbnailDataKey
                      durationInSeconds
                    }
                  }
                }
                contactsUsingInvite {
                  items {
                    id
                    item {
                      ... on Persona {
                        publicDisplayName
                      }
                    }
                  }
                }
                folderInviteParameters {
                  usingFolderInviteGrantsRightToAddItems
                }
              }
            }
          }
        }
      }
    `

    const variables = {
      fetchRelationsInput: {
        ownerItemId: "myAccountOwnerItemId",
        rangeKeyPrefix: "FolderPosition",
        index: "ownerItemId_____RelationType____sortParameter",
        limit: 50,
        scanIndexForward: false,
      },
    }

    try {
      const res = await fetch(AWS_PRIVATE_GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query, variables }),
      })

      const json = await res.json()

      const items = json?.data?.fetchRelations?.items || []

      const parsed: Folder[] = items.map((item: any) => {
        const folder = item.folder
        const files = folder?.fileReferencesPage?.items?.map((ref: any) => ref.file) || []
        
        // Extract contacts from contactsUsingInvite
        const contacts: Record<string, string> = {};
        if (folder?.contactsUsingInvite?.items) {
          folder.contactsUsingInvite.items.forEach((contact: any) => {
            if (contact?.id && contact?.item?.publicDisplayName) {
              contacts[contact.id] = contact.item.publicDisplayName;
            }
          });
        }
        
        return {
          folderPositionId: item.id,
          folderId: folder.id,
          folderName: folder.folderName,
          folderDescription: folder.folderDescription,
          folderPassword: folder.folderPassword,
          creatorId: folder.creatorId,
          createdAt: folder.createdAt,
          updatedAt: folder.updatedAt,
          files: files.filter((f: any) => f && f.dataKey),
          profileIds: item.profileIds || [], // Include profileIds from the item
          contacts: contacts, // Include the contacts map
          usingFolderInviteGrantsRightToAddItems: 
            folder?.folderInviteParameters?.usingFolderInviteGrantsRightToAddItems || false
        }
      })

      setFolders(parsed)
    } catch (err) {
      console.error("Failed to load folders:", err)
      log(`❌ Failed to fetch folders: ${String(err)}`)
    }
  }

  // Use updateProgressTracker from the utils
  useEffect(() => {
    updateProgressTracker(selectedPhotos, setProgressTracker);
  }, [selectedPhotos]);

  // Use the clearAlbumData function from utils
  const handleClearAlbumData = () => {
    clearAlbumData(setSelectedPhotos, setProgressTracker, [], log);
    setIsUploading(false);
    setFileProcessingComplete(false);
  }

  // Function to open file picker
  const openFilePicker = (folderId: string | null = null) => {
    // Set current folder ID if adding to existing folder
    setCurrentFolderId(folderId)
    
    // Clear current selected photos before opening file picker
    setSelectedPhotos([])
    
    // Reset file processing completion flag
    setFileProcessingComplete(false)
    
    fileInputRef.current?.click()
  }

  // Use the createPhotoStatusUpdater function from the utils
  const updatePhotoStatus = createPhotoStatusUpdater(setSelectedPhotos);

  // Modified handleFileSelection function to match the pattern in photos.tsx
  const handleFileSelection = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    setIsUploading(true)
    
    // Reset file processing completion flag
    setFileProcessingComplete(false)
    
    // Get a fresh token using the async function
    const token = await checkLoginWithRefresh();
    
    if (!token) {
      log("❌ Authentication failed")
      setIsUploading(false)
      return
    }
    
    if (!cognitoUsername) {
      log("❌ Missing Cognito Username")
      setIsUploading(false)
      return
    }
  
    try {
      // Generate a new folder ID or use existing one
      const newFolderId = currentFolderId || `${cognitoUsername}_____${generateUUID()}____Folder`
      log(`📁 Using folder ID: ${newFolderId}`)
      
      // Initialize empty array for selected photos in state to show initial progress
      setSelectedPhotos(files.map((file) => ({
        fileName: file.name,
        s3PreviewUrl: URL.createObjectURL(file),
        type: file.type,
        size: file.size,
        status: 'pending',
        progress: 0
      })));
      
      // Set up an interval to update the UI while processing continues
      const progressUpdateInterval = setInterval(() => {
        updateProgressTracker(selectedPhotos, setProgressTracker);
      }, 500);
      
      // Use the processFilesBeforeUploadingToS3 function from utils
      const processedPhotos = await processFilesBeforeUploadingToS3(files, cognitoUsername, updatePhotoStatus, log);
      
      // Clear the interval once processing is complete
      clearInterval(progressUpdateInterval);
      
      // Make sure we have a final progress update
      updateProgressTracker(processedPhotos, setProgressTracker);
      
      // Save to localStorage - ONLY the keys and metadata, not the file data
      localStorage.setItem(LOCAL_STORAGE_KEYS.SELECTED_PHOTOS, JSON.stringify(processedPhotos))
      log(`📸 Saved ${processedPhotos.length} photos metadata to storage`)
      
      // If all photos are uploaded successfully, show a completion message
      const allComplete = processedPhotos.every(photo => photo.status === 'complete');
      const anyErrors = processedPhotos.some(photo => photo.status === 'error');
      
      if (allComplete && !anyErrors) {
        log(`✅ All ${processedPhotos.length} files successfully uploaded`);
      } else if (anyErrors) {
        const errorCount = processedPhotos.filter(photo => photo.status === 'error').length;
        log(`⚠️ Upload completed with ${errorCount} errors`);
      }
      
      // Set the file processing completion flag to trigger the navigation effect
      setFileProcessingComplete(true);

    } catch (error) {
      log(`❌ Fatal error in handleFileSelection: ${String(error)}`)
      setIsUploading(false)
    } finally {
      // Clear the file input to allow selecting the same files again
      if (e.target) e.target.value = ""
    }
  }

  // Handle deletion confirmation dialog
  const handleDeleteClick = async (folderPositionId: string) => {
    try {
      console.log("Deleting album with id:", folderPositionId)
      
      // Get a fresh token using the async function
      const token = await checkLoginWithRefresh();
      
      if (!token) {
        console.error("Authentication failed")
        return
      }
      
      const deleteQuery = `
        mutation DeleteFolderPosition($deletedFolderPositionIds: [ID!]) {
          changeFiles(deletedFolderPositionIds: $deletedFolderPositionIds) {
            items {
              ... on IdObject {
                id
              }
            }
          }
        }
      `
      
      const res = await fetch(AWS_PRIVATE_GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          query: deleteQuery, 
          variables: { 
            deletedFolderPositionIds: [folderPositionId] 
          } 
        }),
      })
      
      const json = await res.json()
      
      if (json?.data?.changeFiles?.items) {
        log(`✅ Successfully deleted folder position ${folderPositionId}`)
        // Remove folder from the state
        setFolders(prevFolders => prevFolders.filter(folder => folder.folderPositionId !== folderPositionId))
      } else if (json.errors) {
        const errorMessage = json.errors[0]?.message || "Unknown GraphQL error"
        log(`❌ Failed to delete folder: ${errorMessage}`)
        throw new Error(errorMessage)
      }
    } catch (err) {
      log(`❌ Failed to delete folder: ${String(err)}`)
      console.error("Failed to delete folder:", err)
      alert(t('Failed to delete album. Please try again.'))
    }
  }

  // Get translation function from the hook for the main component
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";

  return (
    <>
      <GlobalStyle />    
      <AppContainer isRTL={isRTL}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {/* Container for all content with consistent width */}
          <div style={{ width: "100%" }}>
            <Header 
              publicUsername={publicUsername}
              isUploading={isUploading}
              openFilePicker={openFilePicker}
              cognitoUsername={cognitoUsername}
            />

            {/* Create Album button moved here - before the search bar */}
            <CreateAlbumButton
              isUploading={isUploading}
              openFilePicker={openFilePicker}
              t={t}
              isRTL={isRTL}
            />
            
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
            
            {/* Added conditional rendering for enhanced status messages */}
            {isUploading && (
              <div style={{ width: '100%', marginBottom: '20px' }}>
                <UploadProgress 
                  progressTracker={progressTracker}
                  t={t}
                  isRTL={isRTL}
                />
                
                {/* Additional status messages for better user experience */}
                {progressTracker.filesComplete > 0 && progressTracker.filesComplete === progressTracker.totalFiles && (
                  <div style={{
                    backgroundColor: '#e8f5e9',
                    color: '#2e7d32',
                    padding: '10px 16px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    marginTop: '10px',
                    textAlign: 'center'
                  }}>
                    {t('Upload complete! Preparing to save your album...')}
                  </div>
                )}
                
                {progressTracker.filesWithError > 0 && (
                  <div style={{
                    backgroundColor: '#ffebee',
                    color: '#c62828',
                    padding: '10px 16px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    marginTop: '10px',
                    textAlign: 'center'
                  }}>
                    {t('Some files could not be uploaded. You can continue with the successfully uploaded files.')}
                  </div>
                )}
              </div>
            )}

            <AlbumList 
              folders={filteredFolders}
              setFolders={setFolders}
              handleDeleteClick={handleDeleteClick}
              openFilePicker={openFilePicker}
              isUploading={isUploading}
              cognitoUsername={cognitoUsername}
            />
            
            {/* Use the refactored FileInput component */}
            <FileInput 
              onFileSelection={handleFileSelection} 
              ref={fileInputRef}
            />
          </div>
        </div>

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
  <I18nProvider initialLanguage={localStorage.getItem(LOCAL_STORAGE_KEYS.LANGUAGE) as SupportedLanguage || 'en'}>
    <MyAlbums />
  </I18nProvider>
)