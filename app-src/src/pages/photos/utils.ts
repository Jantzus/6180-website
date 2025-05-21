import { AlbumData, SelectedPhoto } from "@/lib/types";
import { LOCAL_STORAGE_KEYS, AWS_PRIVATE_GRAPHQL_ENDPOINT } from "@/lib/config";
import { checkLoginWithRefresh, showDetailedError } from "@/lib/utils";

// Execute album save operation
export const executeAlbumSave = async (
  t: (key: string) => string,
  folderId: string | null,
  albumData: AlbumData | null
) => {
  console.log("Starting album registration");
  
  // Create a loading indicator for album saving
  const loadingModal = document.createElement('div');
  loadingModal.style.position = 'fixed';
  loadingModal.style.top = '0';
  loadingModal.style.left = '0';
  loadingModal.style.width = '100%';
  loadingModal.style.height = '100%';
  loadingModal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  loadingModal.style.display = 'flex';
  loadingModal.style.justifyContent = 'center';
  loadingModal.style.alignItems = 'center';
  loadingModal.style.zIndex = '2000';
  
  const loadingContent = document.createElement('div');
  loadingContent.style.backgroundColor = 'white';
  loadingContent.style.padding = '30px';
  loadingContent.style.borderRadius = '8px';
  loadingContent.style.textAlign = 'center';
  
  const loadingText = document.createElement('p');
  loadingText.id = 'saveProgressText';
  loadingText.textContent = t('Registering album...');
  
  const progressBarBg = document.createElement('div');
  progressBarBg.style.backgroundColor = '#f0f0f0';
  progressBarBg.style.borderRadius = '4px';
  progressBarBg.style.overflow = 'hidden';
  progressBarBg.style.height = '8px';
  progressBarBg.style.marginTop = '10px';
  
  const progressBar = document.createElement('div');
  progressBar.id = 'saveProgress';
  progressBar.style.backgroundColor = '#4caf50';
  progressBar.style.height = '100%';
  progressBar.style.width = '5%';
  progressBar.style.transition = 'width 0.3s ease';

  // Add error message element
  const errorText = document.createElement('p');
  errorText.id = 'saveErrorText';
  errorText.style.color = '#f44336';
  errorText.style.display = 'none';
  errorText.style.marginTop = '10px';
  errorText.style.fontSize = '14px';
  
  progressBarBg.appendChild(progressBar);
  loadingContent.appendChild(loadingText);
  loadingContent.appendChild(progressBarBg);
  loadingContent.appendChild(errorText);
  loadingModal.appendChild(loadingContent);
  document.body.appendChild(loadingModal);

  try {
    // Get current username from cognito token
    const token = await checkLoginWithRefresh();
    if (!token) {
      console.error("No token available for registering album");
      document.body.removeChild(loadingModal);
      return;
    }
    
    // Extract username from token
    const payload = JSON.parse(atob(token.split('.')[1]));
    const username = payload["cognito:username"];
    
    if (!username) {
      console.error("Missing username in token");
      showDetailedError(errorText, "Could not retrieve username from token", loadingText, progressBar);
      return;
    }
    
    // Validate folder ID
    if (!folderId) {
      console.error("No folder ID available");
      showDetailedError(errorText, "Folder ID is missing", loadingText, progressBar);
      return;
    }
    
    // Validate album data
    if (!albumData || !albumData.mediaItems) {
      console.error("No album data available");
      showDetailedError(errorText, "Album data is missing or incomplete", loadingText, progressBar);
      return;
    }

    if (albumData.mediaItems.length === 0) {
      console.error("No media items to save");
      showDetailedError(errorText, "No media items in album to save", loadingText, progressBar);
      return;
    }
    
    // Prepare timestamp and account ID
    const now = Math.floor(Date.now() / 1000);
    
    // Update progress - Step 1
    updateSaveProgress(30, loadingText, progressBar, t('Preparing album data...'));

    // Simplified folder position input - minimal requirements only
    const folderPositionInput = {
      currentTime: now,
      folderId: folderId,
      profileIds: [`Only Me_____Only Me____Profile`],
      folderPositionSelectedTagInputs: [],
      folderPositionPoints: 1,
    };
    
    console.log("Folder position input:", folderPositionInput);
    
    // Update progress - Step 2
    updateSaveProgress(50, loadingText, progressBar, t('Saving album...'));
    
    // Send GraphQL mutation to save album - simplified mutation
    const mutation = `
      mutation SaveAlbum(
        $folderPositionInputs: [FolderPositionInput!]
      ) {
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items { id }
        }
      }
    `;

    const variables = {
      folderPositionInputs: [folderPositionInput]
    };

    console.log("GraphQL mutation variables:", JSON.stringify(variables));
    
    // Send API request with robust error handling
    try {
      const response = await fetch(AWS_PRIVATE_GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: mutation, variables }),
      });
      
      // Update progress - Step 3
      updateSaveProgress(80, loadingText, progressBar, t('Almost there...'));
      
      // Check for HTTP errors
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
      }
      
      const responseText = await response.text();
      
      // Validate response is JSON
      let json;
      try {
        json = JSON.parse(responseText);
        console.log("API response:", json);
      } catch (err) {
        const parseErrorMessage = err instanceof Error ? err.message : "Unknown JSON parse error";
        throw new Error(`Invalid JSON response: ${parseErrorMessage}`);
      }
      
      // Check for GraphQL errors
      if (json.errors && json.errors.length > 0) {
        const errorMessages = json.errors.map((err: { message?: string }) => {
          console.error("GraphQL error:", err);
          return err.message || "Unknown GraphQL error";
        }).join("; ");
        
        throw new Error(`GraphQL errors: ${errorMessages}`);
      }
      
      // Success!
      console.log("Album registered successfully");
      updateSaveProgress(100, loadingText, progressBar, t('Album registered successfully!'));
      
      // Set a flag in sessionStorage that we just completed an album
      sessionStorage.setItem('album_just_saved', 'true');
      
      // Slight delay before redirect for user to see success message
      setTimeout(() => {
        document.body.removeChild(loadingModal);
        window.location.href = "my-albums.html";
      }, 2000);
    } catch (err) {
      const fetchErrorMessage = err instanceof Error ? err.message : "Unknown API error";
      console.error("Error in API request:", err);
      showDetailedError(errorText, fetchErrorMessage, loadingText, progressBar);
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Error registering album:", err);
    showDetailedError(errorText, errorMessage, loadingText, progressBar);
  }
};

// Create a sub-album with selected items
export const createSubAlbumWithSelectedItems = async (
  t: (key: string) => string, 
  albumData: AlbumData | null,
  selectedItems: Set<number>
) => {
  
  if (selectedItems.size === 0) {
    console.log("[SubAlbum] Error: No items selected");
    alert(t('Please select at least one item to share.'));
    return;
  }
  
  // Create a new sub-album with selected items
  if (albumData) {
    try {
      console.log("[SubAlbum] Creating loading modal");
      // Show loading indicator
      const loadingModal = document.createElement('div');
      loadingModal.style.position = 'fixed';
      loadingModal.style.top = '0';
      loadingModal.style.left = '0';
      loadingModal.style.width = '100%';
      loadingModal.style.height = '100%';
      loadingModal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      loadingModal.style.display = 'flex';
      loadingModal.style.justifyContent = 'center';
      loadingModal.style.alignItems = 'center';
      loadingModal.style.zIndex = '2000';
      
      const loadingContent = document.createElement('div');
      loadingContent.style.backgroundColor = 'white';
      loadingContent.style.padding = '30px';
      loadingContent.style.borderRadius = '8px';
      loadingContent.style.textAlign = 'center';
      
      const loadingText = document.createElement('p');
      loadingText.textContent = t('Selecting files...');
      
      loadingContent.appendChild(loadingText);
      loadingModal.appendChild(loadingContent);
      document.body.appendChild(loadingModal);
      console.log("[SubAlbum] Loading modal added to DOM");
      
      // Extract fileIds and create selected photos array of selected items
      const selectedFileIds: string[] = [];
      const selectedPhotosArray: SelectedPhoto[] = [];
      
      console.log("[SubAlbum] Starting to process selected items");
      // Loop through each selected item and create a SelectedPhoto object for each
      Array.from(selectedItems).forEach((index, i) => {
        console.log(`[SubAlbum] Processing item ${i+1}/${selectedItems.size}, index: ${index}`);
        
        const mediaItem = albumData.mediaItems[index];
        console.log(`[SubAlbum] Media item found:`, {
          hasMediaItem: !!mediaItem,
          fileId: mediaItem?.fileId,
          type: mediaItem?.type,
          hasUrl: !!mediaItem?.url
        });
        
        if (mediaItem && mediaItem.fileId) {
          // Add to fileIds array
          selectedFileIds.push(mediaItem.fileId);
          
          // Debug file name extraction
          const fileIdParts = mediaItem.fileId.split('_____');
          const fileName = fileIdParts[1]?.split('____')[0] || `file-${index}`;
          console.log(`[SubAlbum] Extracted fileName:`, {
            fileIdParts,
            fileName
          });
          
          // Create a SelectedPhoto object
          const newSelectedPhoto: SelectedPhoto = {
            fileName: fileName,
            s3PreviewUrl: mediaItem.type === 'video' ? (mediaItem.thumbnailUrl || mediaItem.url) : mediaItem.url,
            type: mediaItem.type === 'video' ? 'video' : 'image',
            size: 0, // We don't have this info from the album view
            status: 'complete', // Mark as complete since these are existing files
            progress: 100,
            fileId: mediaItem.fileId, // Store the original fileId
            // If video, include the duration
            duration: mediaItem.type === 'video' && mediaItem.duration ? 
              parseFloat(mediaItem.duration.split(':').reduce((acc, time) => (60 * acc) + parseFloat(time), 0).toString()) : 
              null
          };
          
          console.log(`[SubAlbum] Created SelectedPhoto object:`, newSelectedPhoto);
          selectedPhotosArray.push(newSelectedPhoto);
        } else {
          console.warn(`[SubAlbum] Skipping invalid media item at index ${index}`);
        }
      });
      
      console.log("[SubAlbum] Processing complete. Summary:", {
        selectedFileIdsCount: selectedFileIds.length,
        selectedPhotosCount: selectedPhotosArray.length,
        fileIdsSample: selectedFileIds.slice(0, 2)
      });
      
      // Create data structure for sub-album selected files
      const subAlbumData = {
        isSubAlbum: true,
        selectedFileIds: selectedFileIds,
        selectedPhotos: selectedPhotosArray
      };
      
      console.log("[SubAlbum] Created subAlbumData:", {
        isSubAlbum: subAlbumData.isSubAlbum,
        selectedFileIdsCount: subAlbumData.selectedFileIds.length,
        selectedPhotosCount: subAlbumData.selectedPhotos.length
      });
      
      // Save to localStorage
      try {
        console.log(`[SubAlbum] Saving to localStorage with key: ${LOCAL_STORAGE_KEYS.SUB_ALBUM_DATA}`);
        const serializedData = JSON.stringify(subAlbumData);
        console.log(`[SubAlbum] Serialized data length: ${serializedData.length} characters`);
        
        localStorage.setItem(LOCAL_STORAGE_KEYS.SUB_ALBUM_DATA, serializedData);
        console.log("[SubAlbum] Successfully saved to localStorage");
      } catch (storageError) {
        console.error("[SubAlbum] Error saving to localStorage:", storageError);
        // Check if it's a quota error
        if (storageError instanceof DOMException && 
            (storageError.name === 'QuotaExceededError' || 
             storageError.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
          console.error("[SubAlbum] localStorage quota exceeded");
          alert(t('Storage limit exceeded. The album may be too large to share this way.'));
          document.body.removeChild(loadingModal);
          return;
        }
        throw storageError; // re-throw to be caught by the outer catch
      }
      
      console.log("[SubAlbum] Removing loading modal");
      // Remove loading modal
      document.body.removeChild(loadingModal);
      
      console.log("[SubAlbum] Redirecting to save-album.html");
      // Redirect to save-album page without a folderId parameter
      window.location.href = '/save-album.html';
      
    } catch (error) {
      console.error('[SubAlbum] Error creating selection:', error);
      alert(t('There was an error creating the selection. Please try again.'));
      try {
        // Try to remove the loading modal if it exists
        const loadingModal = document.querySelector('div[style*="position: fixed"][style*="backgroundColor: rgba(0, 0, 0, 0.5)"]');
        if (loadingModal && loadingModal.parentNode) {
          console.log("[SubAlbum] Cleaning up loading modal after error");
          loadingModal.parentNode.removeChild(loadingModal);
        }
      } catch (cleanupError) {
        console.error('[SubAlbum] Error cleaning up after main error:', cleanupError);
      }
    }
  } else {
    console.error('[SubAlbum] Error: Album data is null');
    alert(t('Cannot create selection: Album data is missing.'));
  }
};

// Update save progress
export const updateSaveProgress = (
  percent: number, 
  textElement: HTMLElement, 
  progressBar: HTMLElement, 
  message?: string
) => {
  progressBar.style.width = `${percent}%`;
  if (message) {
    textElement.textContent = message;
  }
};