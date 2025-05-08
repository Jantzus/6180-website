import JSZip from "jszip";
import { MediaItem } from "@/lib/types";

// Download photos function
export const downloadPhotos = (
  albumData: { mediaItems: MediaItem[], folderName: string },
  t: (key: string) => string,
  openFullscreenView: (index: number) => void
) => {
  // Check if running on mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    // Create a modal for mobile users with explanation and individual download options
    const modalContainer = document.createElement('div');
    modalContainer.style.position = 'fixed';
    modalContainer.style.top = '0';
    modalContainer.style.left = '0';
    modalContainer.style.width = '100%';
    modalContainer.style.height = '100%';
    modalContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    modalContainer.style.zIndex = '1000';
    modalContainer.style.display = 'flex';
    modalContainer.style.justifyContent = 'center';
    modalContainer.style.alignItems = 'center';
    
    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = 'white';
    modalContent.style.borderRadius = '8px';
    modalContent.style.padding = '0';
    modalContent.style.width = '95%'; // Increase width to prevent cutting off
    modalContent.style.maxWidth = '400px'; // Set a maximum width for larger screens
    modalContent.style.maxHeight = '85%';
    modalContent.style.display = 'flex';
    modalContent.style.flexDirection = 'column';
    modalContent.style.position = 'relative';
    modalContent.style.boxSizing = 'border-box'; // Ensure padding is included in width
    
    // Add a sticky header for the close button
    const headerContainer = document.createElement('div');
    headerContainer.style.position = 'sticky';
    headerContainer.style.top = '0';
    headerContainer.style.backgroundColor = 'white';
    headerContainer.style.zIndex = '10';
    headerContainer.style.padding = '15px 20px';
    headerContainer.style.borderTopLeftRadius = '8px';
    headerContainer.style.borderTopRightRadius = '8px';
    headerContainer.style.display = 'flex';
    headerContainer.style.justifyContent = 'flex-start';
    
    // Add close button to the header
    const closeButton = document.createElement('button');
    closeButton.textContent = t('Close');
    closeButton.style.padding = '10px 16px';
    closeButton.style.backgroundColor = '#f3f4f6';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '4px';
    closeButton.style.cursor = 'pointer';
    closeButton.onclick = () => {
      document.body.removeChild(modalContainer);
    };
    
    headerContainer.appendChild(closeButton);
    
    // Create a content wrapper with scrolling
    const contentWrapper = document.createElement('div');
    contentWrapper.style.overflow = 'auto';
    contentWrapper.style.padding = '16px';
    contentWrapper.style.flexGrow = '1';
    contentWrapper.style.width = '100%';
    contentWrapper.style.boxSizing = 'border-box'; // Ensure padding is included in width calculation
    
    // Items container for individual photo downloads
    const itemsContainer = document.createElement('div');
    itemsContainer.style.display = 'grid';
    itemsContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
    itemsContainer.style.gap = '10px';
    itemsContainer.style.marginBottom = '20px';
    itemsContainer.style.width = '100%';
    itemsContainer.style.boxSizing = 'border-box'; // Ensure content fits within parent container
    
    // Add individual download items
    if (albumData && albumData.mediaItems.length > 0) {
      albumData.mediaItems.forEach((item, index) => {
        // Create container for each download item
        const downloadItem = document.createElement('div');
        downloadItem.style.display = 'flex';
        downloadItem.style.flexDirection = 'column';
        downloadItem.style.alignItems = 'center';
        downloadItem.style.border = '1px solid #eee';
        downloadItem.style.padding = '10px';
        downloadItem.style.borderRadius = '4px';
        
        // Create thumbnail
        const thumbnail = document.createElement('img');
        thumbnail.src = item.type === 'image' ? (item.thumbnailUrl || item.url) : (item.thumbnailUrl || '');
        thumbnail.style.width = '100%';
        thumbnail.style.height = '120px';
        thumbnail.style.objectFit = 'cover';
        thumbnail.style.marginBottom = '10px';
        thumbnail.style.cursor = 'pointer';
        
        // Add click handler to open fullscreen view
        thumbnail.onclick = () => {
          document.body.removeChild(modalContainer);
          openFullscreenView(index);
        };
        
        // Create download link
        const downloadLink = document.createElement('a');
        downloadLink.href = item.url;
        
        // For iOS, we need special handling
        const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
        if (isIOS) {
          // Use the same handler for both images and videos
          downloadLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            document.body.removeChild(modalContainer);
            openFullscreenView(index);
          });
          
          downloadLink.textContent = item.type === 'image' ? t('View Photo') : t('View Video');
        } else {
          // For Android and other mobile browsers - no changes needed
          downloadLink.download = `${albumData.folderName || 'media'}-${index + 1}.${item.type === 'image' ? 'jpg' : 'mp4'}`;
          downloadLink.textContent = t('Download');
        }
        
        downloadLink.style.textDecoration = 'none';
        downloadLink.style.color = 'white';
        downloadLink.style.backgroundColor = '#006adc';
        downloadLink.style.padding = '8px 8px'; // Reduce padding for better fit
        downloadLink.style.borderRadius = '4px';
        downloadLink.style.fontSize = '13px'; // Slightly smaller font size
        downloadLink.style.textAlign = 'center';
        downloadLink.style.width = '100%';
        downloadLink.style.boxSizing = 'border-box'; // Ensure padding is included in width
        downloadLink.style.whiteSpace = 'nowrap'; // Prevent text wrapping in button
        
        // Add to container
        downloadItem.appendChild(thumbnail);
        downloadItem.appendChild(downloadLink);
        itemsContainer.appendChild(downloadItem);
      });
    } else {
      const noItemsMsg = document.createElement('p');
      noItemsMsg.textContent = t('No items to download');
      itemsContainer.appendChild(noItemsMsg);
    }
    
    // Add explanation text at the bottom
    const explanationText = document.createElement('p');
    
    explanationText.innerHTML = t('Due to technical limitations, bulk downloads on mobile browsers aren\'t supported, and some videos may not download.<br><br>To download all photos and videos at once, please:');
    
    explanationText.style.borderTop = '1px solid #eee';
    explanationText.style.paddingTop = '15px';
    explanationText.style.paddingRight = '10px';
    explanationText.style.fontSize = '14px'; // Slightly smaller font for better fit
    explanationText.style.width = '100%';
    explanationText.style.boxSizing = 'border-box'; // Ensure padding is included in width
    
    // Add options as bullet points
    const optionsList = document.createElement('ul');
    optionsList.style.paddingLeft = '20px'; // Add proper indentation for list items
    
    const option1 = document.createElement('li');
    option1.textContent = t('visit this page on a desktop computer to download all photos and videos at once');
    option1.style.marginBottom = '10px';
    
    const option2 = document.createElement('li');
    option2.textContent = t('save the photos to your 6180 account and use the 6180 app');
    option2.style.marginBottom = '10px';

    const option3 = document.createElement('li');
    option3.textContent = t('select the "Open On iPhone App" option');
    option3.style.marginBottom = '10px';      
    
    optionsList.appendChild(option1);
    optionsList.appendChild(option2);
    optionsList.appendChild(option3);      
    
    // Assemble modal
    modalContent.appendChild(headerContainer);
    contentWrapper.appendChild(itemsContainer);
    contentWrapper.appendChild(explanationText);
    contentWrapper.appendChild(optionsList);
    modalContent.appendChild(contentWrapper);
    modalContainer.appendChild(modalContent);
    
    // Add modal to body
    document.body.appendChild(modalContainer);
    
  } else {
    // Desktop implementation with locally installed JSZip
    if (albumData && albumData.mediaItems.length > 0) {
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
      loadingText.textContent = t('Preparing your download...');
      loadingText.style.marginBottom = '20px';
      
      const progressContainer = document.createElement('div');
      progressContainer.style.width = '100%';
      progressContainer.style.backgroundColor = '#f0f0f0';
      progressContainer.style.borderRadius = '4px';
      progressContainer.style.overflow = 'hidden';
      
      const progressBar = document.createElement('div');
      progressBar.style.width = '0%';
      progressBar.style.height = '20px';
      progressBar.style.backgroundColor = '#006adc';
      progressBar.style.transition = 'width 0.3s';
      
      progressContainer.appendChild(progressBar);
      loadingContent.appendChild(loadingText);
      loadingContent.appendChild(progressContainer);
      loadingModal.appendChild(loadingContent);
      document.body.appendChild(loadingModal);
      
      try {
        // Use the already installed JSZip library
        const zip = new JSZip();
        const totalFiles = albumData.mediaItems.length;
        const folderName = albumData.folderName || 'Photos';
        let processedFiles = 0;
        
        // Function to fetch a file and add it to the zip
        const fetchAndZip = async (item: MediaItem, index: number) => {
          try {
            const response = await fetch(item.url);
            if (!response.ok) throw new Error(`Failed to fetch ${item.url}`);
            
            const blob = await response.blob();
            const extension = item.type === 'image' ? 'jpg' : 'mp4';
            const fileName = `${folderName}-${index + 1}.${extension}`;
            
            zip.file(fileName, blob);
            
            processedFiles++;
            const progress = Math.round((processedFiles / totalFiles) * 100);
            progressBar.style.width = `${progress}%`;
            loadingText.textContent = t(`Preparing your download... ${processedFiles}/${totalFiles}`);
          } catch (error) {
            console.error(`Error fetching file ${item.url}:`, error);
          }
        };
        
        // Process files in smaller batches to avoid memory issues
        const batchSize = 5;
        
        (async () => {
          for (let i = 0; i < totalFiles; i += batchSize) {
            const batch = albumData.mediaItems.slice(i, i + batchSize);
            await Promise.all(batch.map((item, idx) => fetchAndZip(item, i + idx)));
          }
          
          // Generate and trigger download
          loadingText.textContent = t('Generating zip file...');
          const content = await zip.generateAsync({
            type: 'blob',
            compression: 'DEFLATE',
            compressionOptions: { level: 6 }
          }, (metadata) => {
            const progress = Math.round(metadata.percent);
            progressBar.style.width = `${progress}%`;
          });
          
          const url = URL.createObjectURL(content);
          const downloadLink = document.createElement('a');
          downloadLink.href = url;
          downloadLink.download = `[6180] ${folderName}.zip`;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
          
          // Clean up
          setTimeout(() => {
            URL.revokeObjectURL(url);
            document.body.removeChild(loadingModal);
          }, 1000);
        })().catch(error => {
          console.error('Error creating zip file:', error);
          loadingText.textContent = t('Error creating zip file. Please try again.');
          progressBar.style.backgroundColor = '#d32f2f';
          
          // Add close button
          const closeButton = document.createElement('button');
          closeButton.textContent = t('Close');
          closeButton.style.marginTop = '20px';
          closeButton.style.padding = '8px 16px';
          closeButton.style.backgroundColor = '#f3f4f6';
          closeButton.style.border = 'none';
          closeButton.style.borderRadius = '4px';
          closeButton.style.cursor = 'pointer';
          closeButton.onclick = () => {
            document.body.removeChild(loadingModal);
          };
          
          loadingContent.appendChild(closeButton);
        });
      } catch (error) {
        console.error('Error initializing JSZip:', error);
        loadingText.textContent = t('Error initializing zip functionality. Please try again later.');
        progressBar.style.backgroundColor = '#d32f2f';
        
        // Add close button
        const closeButton = document.createElement('button');
        closeButton.textContent = t('Close');
        closeButton.style.marginTop = '20px';
        closeButton.style.padding = '8px 16px';
        closeButton.style.backgroundColor = '#f3f4f6';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '4px';
        closeButton.style.cursor = 'pointer';
        closeButton.onclick = () => {
          document.body.removeChild(loadingModal);
        };
        
        loadingContent.appendChild(closeButton);
      }
    } else {
      alert(t('No items to download'));
    }
  }
};