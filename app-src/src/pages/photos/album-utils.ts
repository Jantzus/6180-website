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
        window.location.href = "/my-albums.html";
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
    alert(t('Please select at least one item to share.'));
    return;
  }
  
  // Create a new sub-album with selected items
  if (albumData) {
    try {
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
      loadingText.textContent = t('Creating sub-album...');
      
      loadingContent.appendChild(loadingText);
      loadingModal.appendChild(loadingContent);
      document.body.appendChild(loadingModal);
      
      // Extract fileIds and create selected photos array of selected items
      const selectedFileIds: string[] = [];
      const selectedPhotosArray: SelectedPhoto[] = [];
      
      // Loop through each selected item and create a SelectedPhoto object for each
      Array.from(selectedItems).forEach(index => {
        const mediaItem = albumData.mediaItems[index];
        if (mediaItem && mediaItem.fileId) {
          // Add to fileIds array
          selectedFileIds.push(mediaItem.fileId);
          
          // Create a SelectedPhoto object
          const newSelectedPhoto: SelectedPhoto = {
            fileName: mediaItem.fileId.split('_____')[1]?.split('____')[0] || `file-${index}`,
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
          
          selectedPhotosArray.push(newSelectedPhoto);
        }
      });
      
      // Create data structure for sub-album selected files
      const subAlbumData = {
        isSubAlbum: true,
        selectedFileIds: selectedFileIds,
        selectedPhotos: selectedPhotosArray
      };
      
      // Save to localStorage
      localStorage.setItem(LOCAL_STORAGE_KEYS.SUB_ALBUM_DATA, JSON.stringify(subAlbumData));
      
      // Remove loading modal
      document.body.removeChild(loadingModal);
      
      // Redirect to save-album page without a folderId parameter
      window.location.href = '/save-album.html';
      
    } catch (error) {
      console.error('Error creating sub-album:', error);
      alert(t('There was an error creating the sub-album. Please try again.'));
    }
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