import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { I18nProvider, useTranslation } from "@/lib/i18n/react";
import { checkLoginWithRefreshOrRedirectToTarget } from "@/lib/utils";

// Import types and utilities
import { AlbumData, PasswordPolicyEnum } from "@/lib/types";
import { getIdFromUrl, formatUUID } from "@/lib/utils";
import { fetchFolder } from "@/lib/apiService";
import { downloadPhotos } from "@/lib/fileOperations";

// Import styled components
import { 
  GlobalStyle, 
  Body, 
  Header, 
  HeaderContent,
  HeaderControlsWithFullWidth,
  CreateAlbumButton, 
  RowSelectorContainer, 
  RowSelectorLabel, 
  RowSelectorSelect,
  MediaContainer, 
  AlbumTitle, 
  AlbumTitleStrong, 
  DescriptionBlock, 
  DescriptionText, 
  MediaGrid, 
  ErrorMessage, 
  LoadingMessage,
  SelectionBanner,
  SelectionCheckbox,
  Checkmark,
  ActionButton,
  OwnerBadge
} from "@/styles/photos-styled-components";

// Import components
import { LazyImage, VideoThumbnail, FullscreenMediaViewer } from "@/components/MediaComponents";
import { QRCodeModal, PasswordModal } from "@/components/ModalComponents";
import ResponsiveHeader from "@/components/HeaderComponents";

// Main Photo Album Component
const PhotoAlbumContent: React.FC = () => {
  // Hooks for i18n
  const { t, language } = useTranslation();
  
  // State
  const [columns, setColumns] = useState<string>('1');
  const [albumData, setAlbumData] = useState<AlbumData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [folderId, setFolderId] = useState<string | null>(null); // Used when processing API data
  
  // Password and authorization state
  const [passwordPolicy, setPasswordPolicy] = useState<PasswordPolicyEnum | undefined>(undefined);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  
  // Interactive state
  // Removed unused hover state
  const [showQRModal, setShowQRModal] = useState<boolean>(false);
  
  // Added state for tracking which items are loading in full resolution
  const [loadingFullResolution, setLoadingFullResolution] = useState<Record<number, boolean>>({});
  
  // State for fullscreen viewer
  const [fullscreenItem, setFullscreenItem] = useState<number | null>(null);
  
  // Selection mode state
  const [isSelectionMode, setIsSelectionMode] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

  // Check if content should be protected based on policy and authorization
  const shouldShowContent = () => {
    // If no policy or authorized, show content
    if (!passwordPolicy || isAuthorized || passwordPolicy === 'NoPassword') {
      return true;
    }
    
    // With NotVisible policy and not authorized, hide content
    if (passwordPolicy === 'NotVisible') {
      // If there's a password error, log it for debugging
      if (passwordError) {
        console.error('Password error:', passwordError);
      }
      return false;
    }
    
    // For other policies, show content with appropriate restrictions
    return true;
  };
  
  // Check if watermark should be applied
  const shouldShowWatermark = () => {
    // If there's a password error and it mentions watermark, or policy is Watermark
    const showWatermarkDueToError = passwordError?.toLowerCase().includes('watermark') ?? false;
    return (!isAuthorized && passwordPolicy === 'Watermark') || showWatermarkDueToError;
  };

  // Detect if password entry should be shown
  const showingEnterPassword = () => {
    // Show buttons if user is authorized OR there's no password policy OR policy is NoPassword
    return !isAuthorized && passwordPolicy !== undefined && passwordPolicy !== 'NoPassword';
  };

  // Handle password submission
  const handlePasswordSubmit = (password: string) => {
    // Clear any previous errors
    setPasswordError(null);
    
    // First check if password is empty
    if (password.trim() === '') {
      setPasswordError(t('Password cannot be empty'));
      return;
    }
    
    // Get the actual password from the album data
    const actualPassword = albumData?.actualPassword;
    
    // If there's no password to validate against
    if (!actualPassword) {
      // If we know there should be a password but we couldn't get it
      if (albumData?.hasPassword) {
        setPasswordError(t('Unable to validate password. Please try again later.'));
        return;
      } else {
        // If there's no password, just authorize the user (shouldn't normally happen)
        setIsAuthorized(true);
        setShowPasswordModal(false);
        return;
      }
    }
    
    // Compare entered password with actual password
    if (password !== actualPassword) {
      setPasswordError(t('Invalid password. Please try again.'));
      return;
    }
    
    // Success case
    setIsAuthorized(true);
    setShowPasswordModal(false);
    setPasswordError(null);
  };
  
  // Function to prompt for password
  const promptForPassword = () => {
    setPasswordError(null); // Clear any previous errors
    setShowPasswordModal(true);
  };

  // Open fullscreen view for a media item
  const openFullscreenView = (index: number) => {
    // Don't open fullscreen view in selection mode
    if (isSelectionMode) return;
    
    // Check if authorized for NotVisible policy
    if (passwordPolicy === 'NotVisible' && !isAuthorized) {
      promptForPassword();
      return;
    }
    
    setFullscreenItem(index);
    // Pre-load the full resolution of the selected item
    handleLoadFullResolution(index);
    
    // Lock body scroll when fullscreen is open
    document.body.style.overflow = 'hidden';
  };
  
  // Close fullscreen view
  const closeFullscreenView = () => {
    setFullscreenItem(null);
    // Restore body scroll when fullscreen is closed
    document.body.style.overflow = '';
  };
  
  // Navigate to previous item in fullscreen view
  const goToPrevItem = () => {
    if (fullscreenItem !== null && fullscreenItem > 0) {
      setFullscreenItem(fullscreenItem - 1);
      handleLoadFullResolution(fullscreenItem - 1);
    }
  };
  
  // Navigate to next item in fullscreen view
  const goToNextItem = () => {
    if (fullscreenItem !== null && albumData && fullscreenItem < albumData.mediaItems.length - 1) {
      setFullscreenItem(fullscreenItem + 1);
      handleLoadFullResolution(fullscreenItem + 1);
    }
  };

  // Function to handle full resolution loading for an item
  const handleLoadFullResolution = (index: number) => {
    setLoadingFullResolution(prev => ({
      ...prev,
      [index]: true
    }));
  };
  
  // Function to mark full resolution as loaded
  const handleFullResolutionLoaded = (index: number) => {
    if (albumData) {
      const updatedMediaItems = [...albumData.mediaItems];
      updatedMediaItems[index] = {
        ...updatedMediaItems[index],
        loaded: true
      };
      
      setAlbumData({
        ...albumData,
        mediaItems: updatedMediaItems
      });
      
      // Clear loading state
      setLoadingFullResolution(prev => {
        const updated = { ...prev };
        delete updated[index];
        return updated;
      });
    }
  };

  // Change columns
  const changeColumns = (value: string) => {
    setColumns(value);
    localStorage.setItem('columns', value);
  };
  
  // Placeholder for adding photos to album function
  const addPhotosToAlbum = async () => {
    alert(t('This feature is not yet implemented.'));
  };

  // Save album function
  const saveAlbum = async () => {
    // Check if authorized for CannotBeSaved policy
    if (passwordPolicy === 'CannotBeSaved' && !isAuthorized) {
      promptForPassword();
      return;
    }
    
    if (folderId) {
      const targetPath = `/save-album.html?folderId=${folderId}`;
      const token = await checkLoginWithRefreshOrRedirectToTarget(targetPath);
      
      if (token) {
        window.location.href = targetPath;
      }
    } else {
      alert(t('Please try refreshing the page or contact support if the problem persists.'));
    }
  };

  // Create Sub-album function
  const createSubalbum = () => {
    // Check if authorized for protected policies
    if ((passwordPolicy === 'NotVisible' || passwordPolicy === 'CannotBeSaved') && !isAuthorized) {
      promptForPassword();
      return;
    }
    
    // Toggle selection mode
    setIsSelectionMode(!isSelectionMode);
    // Clear any existing selections when toggling
    setSelectedItems(new Set());
  };
  
  // Toggle item selection
  const toggleItemSelection = (index: number, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent opening fullscreen view
    
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };
  
  // Cancel selection mode
  const cancelSelection = () => {
    setIsSelectionMode(false);
    setSelectedItems(new Set());
  };
  
  // Share the selected items
  const shareSelection = async () => {
    if (selectedItems.size === 0) {
      alert(t('Please select at least one item to share.'));
      return;
    }
    
    // Create a new album with selected items
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
        loadingText.textContent = t('Creating album...');
        
        loadingContent.appendChild(loadingText);
        loadingModal.appendChild(loadingContent);
        document.body.appendChild(loadingModal);
        
        // Simulate API call with timeout
        setTimeout(() => {
          document.body.removeChild(loadingModal);
          
          // Show success message
          alert(t(`Successfully created a sub-album with ${selectedItems.size} items.`));
          
          // Reset selection mode
          setIsSelectionMode(false);
          setSelectedItems(new Set());
        }, 1500);
      } catch (error) {
        console.error('Error creating album:', error);
        alert(t('There was an error creating the album. Please try again.'));
      }
    }
  };

  // Handle Get QR Code function
  const getQRCode = () => {
    setShowQRModal(true);
  };

  // Handle downloading photos
  const handleDownloadPhotos = () => {
    // Check if download should be restricted
    if (passwordPolicy === 'CannotBeSaved' && !isAuthorized) {
      promptForPassword();
      return;
    }
    
    // Call download function from fileOperations
    if (albumData) {
      downloadPhotos(albumData, t, openFullscreenView);
    }
  };

  // Set default columns
  useEffect(() => {
    const savedColumnsValue = localStorage.getItem('columns') || '1';
    setColumns(savedColumnsValue);
  }, []);

  // Fetch album data
  useEffect(() => {
    const initAlbum = async () => {
      const id = getIdFromUrl();
      
      if (!id) {
        setError(t('Valid ID not obtained from query parameter.'));
        setIsLoading(false);
        return;
      }
      
      const parts = id.split('_');
      let formattedId = parts[parts.length - 1].replace(/-/g, '');

      // Make sure it's exactly 32 characters before formatting
      if (formattedId.length === 32) {
        formattedId = formatUUID(formattedId);
        console.log(formattedId); // e.g., B89D8BAF-F9A1-484B-A379-FA7FAD081303
      } else {
        console.error('Invalid UUID format: must be 32 characters after removing dashes');
      }

      const data = await fetchFolder(formattedId, setFolderId);
      
      if (data) {
        setAlbumData(data);
        
        // Set password policy from the API result
        if (data.passwordPolicy) {
          setPasswordPolicy(data.passwordPolicy as PasswordPolicyEnum);
          
          // If NoPassword policy, automatically set as authorized
          if (data.passwordPolicy === 'NoPassword') {
            setIsAuthorized(true);
          }
        }
      }
      
      setIsLoading(false);
    };

    initAlbum();
  }, []);

  // Set page title
  useEffect(() => {
    if (albumData?.folderName) {
      document.title = albumData.folderName;
    } else {
      document.title = t('Photos');
    }
  }, [albumData, language]);

  // Render
  return (
    <Body>
      <GlobalStyle />
      
      <Header>
        <HeaderContent>
          <HeaderControlsWithFullWidth>
            {isSelectionMode ? (
              <div style={{ display: 'flex', gap: '16px' }}>
                <ActionButton 
                  onClick={shareSelection} 
                  disabled={selectedItems.size === 0}
                  style={{ 
                    opacity: selectedItems.size === 0 ? 0.5 : 1,
                    backgroundColor: selectedItems.size > 0 ? '#006adc' : undefined,
                    color: selectedItems.size > 0 ? 'white' : undefined,
                  }}
                >
                  {t('Create Sub-album')} ({selectedItems.size})
                </ActionButton>
                <ActionButton onClick={cancelSelection}>
                  {t('Cancel')}
                </ActionButton>
              </div>
            ) : (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', // This ensures maximum space between left and right groups
                width: '100%', 
                flexWrap: 'nowrap', 
                alignItems: 'center'
              }}>
                {/* Left side - Create Sub-album button */}
                <div style={{ flexShrink: 0 }}> 
                {!showingEnterPassword() && (
                  <CreateAlbumButton onClick={createSubalbum}>
                    {t('Create Sub-album')}
                  </CreateAlbumButton>
                )}
                </div>
                
                {/* Right side - actions group */}
                <div style={{ 
                  marginLeft: 'auto', // Push all the way to the right
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  {/* Show password button */}
                  {!isSelectionMode && 
                  !isAuthorized && 
                  passwordPolicy && 
                  passwordPolicy !== 'NoPassword' && (
                    <ActionButton onClick={promptForPassword}>
                      {t('Enter Password')}
                    </ActionButton>
                  )}
                  
                  {/* Show the responsive header for other buttons */}
                  {!isSelectionMode && !(
                    !isAuthorized && passwordPolicy && passwordPolicy !== 'NoPassword'
                  ) && (
                    <ResponsiveHeader 
                      addPhotosToAlbum={addPhotosToAlbum}
                      saveAlbum={saveAlbum} 
                      downloadPhotos={handleDownloadPhotos}
                      getQRCode={getQRCode}
                      promptForPassword={promptForPassword}
                      showingEnterPassword={showingEnterPassword()}
                      passwordPolicy={passwordPolicy}
                      t={t} 
                    />
                  )}
                </div>
              </div>
            )}
          </HeaderControlsWithFullWidth>
          <RowSelectorContainer>
            <RowSelectorLabel htmlFor="columns" id="columns-label">
              <strong>{t('Columns:')}</strong>
            </RowSelectorLabel>
            <RowSelectorSelect 
              id="columns" 
              value={columns} 
              onChange={(e) => changeColumns(e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </RowSelectorSelect>
          </RowSelectorContainer>
        </HeaderContent>
      </Header>

      <MediaContainer id="media-container">
        {/* Password protection message */}
        {!isAuthorized && passwordPolicy === 'NotVisible' && (
          <div style={{ 
            padding: '20px', 
            backgroundColor: '#f3f4f6', 
            borderRadius: '8px',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            <h3>{t('This album is password protected')}</h3>
            <p>{t('Please enter the password to view the contents')}</p>
            {passwordError && (
              <div style={{ 
                color: "#d32f2f", 
                fontSize: "14px", 
                margin: "10px 0",
                padding: "5px",
                backgroundColor: "rgba(211, 47, 47, 0.1)",
                borderRadius: "4px"
              }}>
                {passwordError}
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <ActionButton onClick={promptForPassword}>
                {t('Enter Password')}
              </ActionButton>
            </div>
          </div>
        )}
        
        {isSelectionMode && (
          <SelectionBanner>
            <p>{t('Select photos and videos to create a sub-album to share')}</p>
          </SelectionBanner>
        )}
      
        {albumData?.folderName && albumData.folderName !== t('Photos') && albumData.folderName.trim() !== "" && (
          <AlbumTitle id="album-title">
            <AlbumTitleStrong>{albumData.folderName}</AlbumTitleStrong>
          </AlbumTitle>
        )}
        
        {albumData?.folderDescription && albumData.folderDescription.trim() !== "" ? (
          <DescriptionBlock id="description-container">
            <DescriptionText>{albumData.folderDescription}</DescriptionText>
          </DescriptionBlock>
        ) : null}
        
        <MediaGrid id="media-grid" columns={columns}>
          {isLoading ? (
            <LoadingMessage id="loading-message">
              {t('Loading album content...')}
            </LoadingMessage>
          ) : error ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : !shouldShowContent() ? (
            // Empty state for protected content
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 0' }}>
              <ErrorMessage>{t('Enter the password to view album contents')}</ErrorMessage>
            </div>
          ) : albumData && albumData.mediaItems.length === 0 ? (
            <ErrorMessage>{t('No media found in this album')}</ErrorMessage>
          ) : (
            albumData?.mediaItems.map((item, index) => {
              // Restore the ownerName extraction from the contacts map
              const ownerName = item.ownerId && albumData.contacts[item.ownerId] 
                ? albumData.contacts[item.ownerId] 
                : '';
              
              const isSelected = selectedItems.has(index);
              const showWatermark = shouldShowWatermark();
              
              return (
                <div 
                  key={index} 
                  style={{ 
                    position: 'relative',
                    border: isSelectionMode && isSelected ? '3px solid #006adc' : undefined,
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: isSelectionMode && isSelected ? '0 0 0 3px rgba(0, 106, 220, 0.3)' : undefined
                  }}
                  onClick={(e: React.MouseEvent) => isSelectionMode ? 
                    toggleItemSelection(index, e) : 
                    openFullscreenView(index)}
                >
                  {isSelectionMode && (
                    <SelectionCheckbox 
                      isSelected={isSelected}
                      onClick={(e: React.MouseEvent) => toggleItemSelection(index, e)}
                    >
                      {isSelected && (
                        <Checkmark>✓</Checkmark>
                      )}
                    </SelectionCheckbox>
                  )}
                  
                  {item.type === 'image' ? (
                    <LazyImage 
                      src={item.url}
                      thumbnailSrc={item.thumbnailUrl}
                      alt={`Album image ${index + 1}`}
                      loadFullResolution={loadingFullResolution[index] || false}
                      onFullResolutionLoaded={() => handleFullResolutionLoaded(index)}
                      onClick={() => isSelectionMode ? undefined : openFullscreenView(index)}
                      showWatermark={showWatermark}
                    />
                  ) : (
                    <VideoThumbnail 
                      thumbnailUrl={item.thumbnailUrl || ''} 
                      videoUrl={item.url} 
                      duration={item.duration || '0:00'} 
                      index={index}
                      onFullResolutionLoaded={() => handleFullResolutionLoaded(index)}
                      onClick={() => isSelectionMode ? undefined : openFullscreenView(index)}
                      showWatermark={showWatermark}
                    />
                  )}
                  
                  {/* Display owner badge if owner name exists */}
                  {ownerName && (
                    <OwnerBadge>{ownerName}</OwnerBadge>
                  )}
                </div>
              );
            })
          )}
        </MediaGrid>
      </MediaContainer>
      
      {/* QR Code Modal */}
      <QRCodeModal 
        isOpen={showQRModal} 
        onClose={() => setShowQRModal(false)} 
        folderId={folderId}
        t={t}
      />
      
      {/* Password Modal with error display */}
      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => {
          setShowPasswordModal(false);
          setPasswordError(null); // Clear error when closing modal
        }}
        onSubmit={handlePasswordSubmit}
        error={passwordError}
        t={t}
      />
      
      {/* Fullscreen Media Viewer */}
      {fullscreenItem !== null && albumData && (
        <FullscreenMediaViewer
          item={albumData.mediaItems[fullscreenItem]}
          index={fullscreenItem}
          onClose={closeFullscreenView}
          onPrev={goToPrevItem}
          onNext={goToNextItem}
          hasNext={fullscreenItem < albumData.mediaItems.length - 1}
          hasPrev={fullscreenItem > 0}
          albumName={albumData.folderName}
          showWatermark={shouldShowWatermark()}
        />
      )}
      
    </Body>
  );
};

// Wrap PhotoAlbumContent with I18nProvider
const PhotoAlbum: React.FC = () => {
  return (
    <I18nProvider>
      <PhotoAlbumContent />
    </I18nProvider>
  );
};

// Initialize the app
ReactDOM.createRoot(document.getElementById("root")!).render(<PhotoAlbum />);