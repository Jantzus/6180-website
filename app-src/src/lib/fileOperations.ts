import { MediaItem } from "@/lib/types";

// SSR-safe check for browser environment
const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

// Type definition for progress modal elements
interface ProgressModal {
  container: HTMLDivElement;
  title: HTMLParagraphElement;
  progressBar: HTMLDivElement;
  progressText: HTMLDivElement;
  cancelBtn: HTMLButtonElement;
}

// Simple, reliable download function
export const downloadPhotos = (
  albumData: { mediaItems: MediaItem[], folderName: string },
  t: (key: string) => string,
  openFullscreenView: (index: number) => void
) => {
  // Early return if not in browser environment
  if (!isBrowser) {
    console.warn('downloadPhotos called in non-browser environment');
    return;
  }

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    handleMobileDownload(albumData, t, openFullscreenView);
  } else {
    handleDesktopDownload(albumData, t);
  }
};

// Helper function to download single file using blob method
const downloadWithBlob = async (item: MediaItem, filename: string): Promise<boolean> => {
  try {
    const response = await fetch(item.url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    window.URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.warn('Blob download failed:', error);
    return false;
  }
};

// Mobile download handler (browser-only)
const handleMobileDownload = (
  albumData: { mediaItems: MediaItem[], folderName: string },
  t: (key: string) => string,
  openFullscreenView: (index: number) => void
) => {
  if (!isBrowser) return;

  const modalContainer = document.createElement('div');
  modalContainer.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background-color: rgba(0, 0, 0, 0.7); z-index: 10000;
    display: flex; justify-content: center; align-items: center;
  `;
  
  const modalContent = document.createElement('div');
  modalContent.style.cssText = `
    background: white; border-radius: 8px; padding: 0; width: 95%;
    max-width: 400px; max-height: 85%; display: flex; flex-direction: column;
    position: relative; box-sizing: border-box;
  `;
  
  const headerContainer = document.createElement('div');
  headerContainer.style.cssText = `
    position: sticky; top: 0; background: white; z-index: 10;
    padding: 15px 20px; border-top-left-radius: 8px; border-top-right-radius: 8px;
    display: flex; justify-content: flex-start;
  `;
  
  const closeButton = document.createElement('button');
  closeButton.textContent = t('Close');
  closeButton.style.cssText = `
    padding: 10px 16px; background: #f3f4f6; border: none;
    border-radius: 4px; cursor: pointer;
  `;
  closeButton.onclick = () => document.body.removeChild(modalContainer);
  
  headerContainer.appendChild(closeButton);
  
  const contentWrapper = document.createElement('div');
  contentWrapper.style.cssText = `
    overflow: auto; padding: 0px 16px; flex-grow: 1;
    width: 100%; box-sizing: border-box;
  `;
  
  const itemsContainer = document.createElement('div');
  itemsContainer.style.cssText = `
    display: grid; grid-template-columns: repeat(2, 1fr);
    gap: 10px; margin-bottom: 20px; width: 100%; box-sizing: border-box;
  `;
  
  if (albumData && albumData.mediaItems.length > 0) {
    albumData.mediaItems.forEach((item, index) => {
      const downloadItem = document.createElement('div');
      downloadItem.style.cssText = `
        display: flex; flex-direction: column; align-items: center;
        border: 1px solid #eee; padding: 10px; border-radius: 4px;
      `;
      
      const thumbnail = document.createElement('img');
      thumbnail.src = item.type === 'image' ? (item.thumbnailUrl || item.url) : (item.thumbnailUrl || '');
      thumbnail.style.cssText = `
        width: 100%; height: 120px; object-fit: cover;
        margin-bottom: 10px; cursor: pointer;
      `;
      thumbnail.onclick = () => {
        document.body.removeChild(modalContainer);
        openFullscreenView(index);
      };
      
      const downloadButton = document.createElement('button');
      const filename = item.fileDisplayName || `${albumData.folderName || 'media'}-${index + 1}.${item.type === 'image' ? 'jpg' : 'mp4'}`;
      
      const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
      if (isIOS) {
        downloadButton.addEventListener('click', function(e) {
          e.preventDefault();
          document.body.removeChild(modalContainer);
          openFullscreenView(index);
        });
        downloadButton.textContent = item.type === 'image' ? t('View Photo') : t('View Video');
      } else {
        downloadButton.addEventListener('click', async function(e) {
          e.preventDefault();
          
          // Show loading state
          downloadButton.textContent = t('Downloading...');
          downloadButton.disabled = true;
          
          const success = await downloadWithBlob(item, filename);
          
          downloadButton.textContent = success ? t('Downloaded!') : t('Download Failed');
          downloadButton.disabled = false;
          
          // Reset button text after a moment
          setTimeout(() => {
            downloadButton.textContent = t('Download');
          }, 2000);
        });
        downloadButton.textContent = t('Download');
      }
      
      downloadButton.style.cssText = `
        text-decoration: none; color: white; background-color: #006adc;
        padding: 8px 8px; border: none; border-radius: 4px; font-size: 13px;
        text-align: center; width: 100%; box-sizing: border-box;
        white-space: nowrap; cursor: pointer;
      `;
      
      downloadItem.appendChild(thumbnail);
      downloadItem.appendChild(downloadButton);
      itemsContainer.appendChild(downloadItem);
    });
  }
  
  const explanationText = document.createElement('p');
  explanationText.innerHTML = t('Due to technical limitations, bulk downloads on mobile browsers aren\'t supported, and some videos may not download.<br><br>To download all photos and videos at once, please:');
  explanationText.style.cssText = 'padding-right: 10px; font-size: 14px; width: 100%; box-sizing: border-box;';
  
  const optionsList = document.createElement('ul');
  optionsList.style.paddingLeft = '20px';
  
  const options = [
    t('visit this page on a desktop computer to download all photos and videos at once'),
    t('save the photos to your 6180 account and use the 6180 app'),
    t('select the "Open On iPhone App" option')
  ];
  
  options.forEach(optionText => {
    const option = document.createElement('li');
    option.textContent = optionText;
    option.style.cssText = 'margin-bottom: 10px; font-size: 14px;';
    optionsList.appendChild(option);
  });
  
  modalContent.appendChild(headerContainer);
  contentWrapper.appendChild(explanationText);
  contentWrapper.appendChild(optionsList);
  contentWrapper.appendChild(itemsContainer);
  modalContent.appendChild(contentWrapper);
  modalContainer.appendChild(modalContent);
  
  document.body.appendChild(modalContainer);
};

// Desktop download handler (browser-only)
const handleDesktopDownload = (
  albumData: { mediaItems: MediaItem[], folderName: string },
  t: (key: string) => string
) => {
  if (!isBrowser) return;

  if (!albumData || albumData.mediaItems.length === 0) {
    alert(t('No items to download'));
    return;
  }
  
  const items = albumData.mediaItems;
  const folderName = albumData.folderName || 'Photos';
  
  // For large collections, ask user if they want to continue
  if (items.length > 50) {
    if (!confirm(t(`You are downloading ${items.length} files. This may take several minutes. Continue?`))) {
      return;
    }
  }
  
  // Create modal
  const modal = createProgressModal(t);
  if (!modal) return; // Guard against SSR
  
  document.body.appendChild(modal.container);
  
  let cancelled = false;
  modal.cancelBtn.onclick = () => {
    cancelled = true;
    document.body.removeChild(modal.container);
  };
  
  // Start download process
  startDownloadProcess(items, folderName, modal, t, () => cancelled)
    .then(() => {
      if (!cancelled) {
        setTimeout(() => {
          if (document.body.contains(modal.container)) {
            document.body.removeChild(modal.container);
          }
        }, 2000);
      }
    })
    .catch((error) => {
      if (!cancelled) {
        showError(modal, t, error.message, () => {
          document.body.removeChild(modal.container);
          // Retry with individual downloads
          handleIndividualDownloads(items, folderName);
        });
      }
    });
};

// Create progress modal (browser-only)
const createProgressModal = (t: (key: string) => string): ProgressModal | null => {
  if (!isBrowser) return null;

  const container = document.createElement('div');
  container.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center;
    align-items: center; z-index: 2000;
  `;
  
  const content = document.createElement('div');
  content.style.cssText = `
    background: white; padding: 30px; border-radius: 8px;
    text-align: center; min-width: 300px;
  `;
  
  const title = document.createElement('p');
  title.textContent = t('Preparing your download...');
  title.style.cssText = 'margin-bottom: 20px; font-size: 16px; font-weight: 500;';
  
  const progressContainer = document.createElement('div');
  progressContainer.style.cssText = `
    width: 100%; background: #f0f0f0; border-radius: 4px;
    overflow: hidden; margin-bottom: 10px;
  `;
  
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    width: 0%; height: 20px; background: #006adc;
    transition: width 0.3s ease;
  `;
  
  const progressText = document.createElement('div');
  progressText.style.cssText = 'font-size: 12px; color: #666; margin-bottom: 10px;';
  
  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = t('Cancel');
  cancelBtn.style.cssText = `
    padding: 8px 16px; background: #f3f4f6; border: 1px solid #ccc;
    border-radius: 4px; cursor: pointer; margin-top: 10px;
  `;
  
  progressContainer.appendChild(progressBar);
  content.appendChild(title);
  content.appendChild(progressContainer);
  content.appendChild(progressText);
  content.appendChild(cancelBtn);
  container.appendChild(content);
  
  return {
    container,
    title,
    progressBar,
    progressText,
    cancelBtn
  };
};

// Main download process using blob method (browser-only)
const startDownloadProcess = async (
  items: MediaItem[],
  folderName: string,
  modal: ProgressModal,
  t: (key: string) => string,
  isCancelled: () => boolean
) => {
  if (!isBrowser) return;

  let completed = 0;
  let failed = 0;
  const usedFilenames = new Set<string>(); // Track used filenames to avoid duplicates
  
  modal.title.textContent = t('Starting downloads...');
  modal.progressText.textContent = t('Files will download with their original names');
  
  // Download files one by one
  for (let i = 0; i < items.length; i++) {
    if (isCancelled()) return;
    
    const item = items[i];
    
    // Get the original filename or create a fallback
    let filename = item.fileDisplayName;
    
    // If no original filename, create one based on file type
    if (!filename) {
      const extension = item.type === 'image' ? 'jpg' : 'mp4';
      filename = `${folderName}-${i + 1}.${extension}`;
    }
    
    // Handle duplicate filenames by adding a number
    let finalFilename = filename;
    let counter = 1;
    while (usedFilenames.has(finalFilename.toLowerCase())) {
      const lastDotIndex = filename.lastIndexOf('.');
      if (lastDotIndex !== -1) {
        const nameWithoutExt = filename.substring(0, lastDotIndex);
        const extension = filename.substring(lastDotIndex);
        finalFilename = `${nameWithoutExt} (${counter})${extension}`;
      } else {
        finalFilename = `${filename} (${counter})`;
      }
      counter++;
    }
    
    // Remember this filename to avoid duplicates
    usedFilenames.add(finalFilename.toLowerCase());
    
    // Show which file we're downloading
    modal.progressText.textContent = t(`Downloading ${i + 1} of ${items.length}: ${finalFilename}`);
    
    try {
      // Use blob method for reliable downloads
      const success = await downloadWithBlob(item, finalFilename);
      
      if (success) {
        completed++;
      } else {
        failed++;
      }
      
      // Small delay between downloads to prevent overwhelming the browser
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.warn(`Failed to download file ${finalFilename}:`, error);
      failed++;
    }
    
    // Update progress
    const progress = Math.round(((i + 1) / items.length) * 100);
    modal.progressBar.style.width = `${progress}%`;
  }
  
  if (isCancelled()) return;
  
  // Show completion message
  modal.title.textContent = t('Downloads complete!');
  if (failed > 0) {
    modal.progressText.textContent = t(`${completed} files downloaded with original names, ${failed} failed`);
  } else {
    modal.progressText.textContent = t(`All ${completed} files downloaded with their original names!`);
  }
  
  // Auto-close after 3 seconds
  setTimeout(() => {
    if (!isCancelled() && document.body.contains(modal.container)) {
      document.body.removeChild(modal.container);
    }
  }, 3000);
};

// Fallback: individual file downloads (browser-only)
const handleIndividualDownloads = async (
  items: MediaItem[],
  folderName: string,
) => {
  if (!isBrowser) return;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const filename = item.fileDisplayName || `${folderName}-${i + 1}.${item.type === 'image' ? 'jpg' : 'mp4'}`;
    
    // Add delay between downloads
    await new Promise(resolve => setTimeout(resolve, i * 1000));
    
    try {
      await downloadWithBlob(item, filename);
    } catch (error) {
      console.warn(`Failed to download file ${i + 1}:`, error);
    }
  }
};

// Fallback: show error message (browser-only)
const showError = (
  modal: ProgressModal,
  t: (key: string) => string,
  errorMsg: string,
  retryFn: () => void
) => {
  if (!isBrowser || !modal) return;

  modal.title.textContent = t('Download failed');
  modal.progressText.textContent = errorMsg;
  modal.progressBar.style.backgroundColor = '#d32f2f';
  modal.progressBar.style.width = '100%';
  
  modal.cancelBtn.textContent = t('Close');
  
  const retryBtn = document.createElement('button');
  retryBtn.textContent = t('Retry');
  retryBtn.style.cssText = `
    padding: 8px 16px; background: #006adc; color: white;
    border: none; border-radius: 4px; cursor: pointer;
    margin-top: 10px; margin-left: 10px;
  `;
  retryBtn.onclick = retryFn;
  
  modal.cancelBtn.parentNode!.appendChild(retryBtn);
};