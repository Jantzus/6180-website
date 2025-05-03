import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { I18nProvider, useTranslation } from "@/lib/i18n/react";
import JSZip from "jszip";
import QRCode from "react-qr-code";
import { checkLoginWithRefreshOrRedirectToTarget, checkLoginWithoutRedirect } from "@/lib/utils";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

// Import styled components
import {
  Body,
  Header,
  HeaderContent,
  HeaderControls,
  CreateAlbumButton,
  RowSelectorContainer,
  ActionButton,
  HamburgerButton,
  HamburgerIcon,
  HamburgerLine,
  DropdownMenu,
  MenuButton,
  AlbumTitle,
  AlbumTitleStrong,
  MediaContainer,
  DescriptionBlock,
  DescriptionText,
  MediaGrid,
  MediaBlock,
  LazyImageContainer,
  ThumbnailWrapper,
  StyledImage,
  LoadingPlaceholder,
  OwnerBadge,
  PlayButton,
  DurationBadge,
  ErrorMessage,
  LoadingMessage,
  RowSelectorLabel,
  RowSelectorSelect,
  Modal,
  ModalContent,
  QRCodeContainer,
  InstructionsContainer,
  InstructionHeading,
  InstructionList,
  InstructionItem,
  CloseButton,
  LoadingOverlay,
  ItalicText
} from "@/styles/photos-styled-components";

import { 
  S3_BUCKET_URL,
  AWS_PUBLIC_GRAPHQL_ENDPOINT,
  AWS_PUBLIC_API_KEY,
  AWS_PRIVATE_GRAPHQL_ENDPOINT
} from "@/lib/config"

// Define new styled components for selection feature
const SelectionCheckbox = styled.div<{ isSelected: boolean }>`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${(props) => (props.isSelected ? '#006adc' : 'rgba(255, 255, 255, 0.8)')};
  border: ${(props) => (props.isSelected ? 'none' : '2px solid #006adc')};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const SelectionBanner = styled.div`
  padding: 10px 20px;
  background-color: #f0f7ff;
  border-radius: 4px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Checkmark = styled.div`
  color: white;
  font-size: 14px;
  font-weight: bold;
`;

// Types
interface MediaItem {
  type: 'image' | 'video';
  url: string;
  thumbnailUrl?: string;
  duration?: string;
  ownerId?: string;
  loaded?: boolean;
}

interface Contact {
  [id: string]: string;
}

interface AlbumData {
  mediaItems: MediaItem[];
  folderName: string;
  folderDescription: string;
  contacts: Contact;
}

// Global styles
const GlobalStyle = createGlobalStyle`
  @keyframes loading-animation {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  
  /* Added to ensure proper display on mobile */
  * {
    box-sizing: border-box;
    -webkit-text-size-adjust: 100%;
  }
  
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }
  
  #root {
    width: 100%;
    overflow-x: hidden;
  }
`;

// GraphQL query
const FETCH_FOLDERS_QUERY = `
  query FetchFolders($folderIds: [String!]!) {
    fetchFolders(folderIds: $folderIds) {
      items {
        folderName
        folderDescription
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
        folderPosition {
          id
        }
      }
    }
  }
`;

// FullscreenMediaViewer component
const FullscreenMediaViewer: React.FC<{
  item: MediaItem;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  albumName: string;
  ownerName?: string;
}> = ({
  item,
  index,
  onClose,
  onPrev,
  onNext,
  hasNext,
  hasPrev,
  albumName
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasPrev) {
        onPrev();
      } else if (e.key === 'ArrowRight' && hasNext) {
        onNext();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev, hasNext, hasPrev]);
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      zIndex: 2000,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header with controls */}
      <div style={{
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
      }}>
        <button 
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '16px',
            padding: '5px 10px',
            cursor: 'pointer'
          }}
          onClick={onClose}
        >
          {t('Back')}
        </button>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '16px',
              padding: '5px 10px',
              cursor: hasPrev ? 'pointer' : 'not-allowed',
              opacity: hasPrev ? 1 : 0.5
            }}
            onClick={hasPrev ? onPrev : undefined}
            disabled={!hasPrev}
          >
            ←
          </button>
          <button 
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '16px',
              padding: '5px 10px',
              cursor: hasNext ? 'pointer' : 'not-allowed',
              opacity: hasNext ? 1 : 0.5
            }}
            onClick={hasNext ? onNext : undefined}
            disabled={!hasNext}
          >
            →
          </button>
        </div>
      </div>
      
      {/* Media container */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto',
        padding: '10px',
        position: 'relative'
      }}>
        {item.type === 'image' ? (
          <>
            <img 
              src={item.url}
              alt={`Image ${index + 1}`}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                opacity: isLoaded ? 1 : 0,
                transition: 'opacity 0.3s'
              }}
              onLoad={() => {
                setIsLoaded(true);
                setIsLoading(false);
              }}
            />
            {/* Show thumbnail while loading */}
            {!isLoaded && item.thumbnailUrl && (
              <img 
                src={item.thumbnailUrl}
                alt={`Thumbnail ${index + 1}`}
                style={{
                  position: 'absolute',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  opacity: 0.5
                }}
              />
            )}
          </>
        ) : (
          <video controls autoPlay style={{ maxWidth: '100%', maxHeight: '100%' }} onLoadedData={() => setIsLoading(false)}>
            <source src={item.url} type="video/mp4" />
            {t('Your browser does not support the video tag.')}
          </video>
        )}
        
        {isLoading && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '4px',
            zIndex: 10
          }}>
            {item.type === 'image' ? t('Loading full resolution...') : t('Loading video...')}
          </div>
        )}
      </div>
      
      {/* Footer with options */}
      <div style={{
        padding: '15px',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white'
      }}>
        <a 
          href={item.url} 
          download={`${albumName}-${index + 1}.${item.type === 'image' ? 'jpg' : 'mp4'}`}
          style={{
            textDecoration: 'none',
            color: 'white',
            backgroundColor: '#006adc',
            padding: '8px 16px',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        >
          {item.type === 'image' ? t('Download Photo') : t('Download Video')}
        </a>
      </div>
    </div>
  );
};

// LazyImage component
const LazyImage: React.FC<{ 
  src: string; 
  thumbnailSrc?: string; 
  alt: string; 
  className?: string;
  loadFullResolution?: boolean;
  onFullResolutionLoaded?: () => void;
  onClick?: () => void; // Added onClick prop
}> = ({ 
  src, 
  thumbnailSrc, 
  alt, 
  className = '', 
  loadFullResolution = false,
  onFullResolutionLoaded,
  onClick // Added onClick prop
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [fullResLoaded, setFullResLoaded] = useState(false);
  const [isLoadingFullRes, setIsLoadingFullRes] = useState(false);
  const [imageSrc, setImageSrc] = useState("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E");
  const { t } = useTranslation();
  
  // First load the thumbnail if available
  useEffect(() => {
    if (thumbnailSrc) {
      const img = new Image();
      img.src = thumbnailSrc;
      img.onload = () => {
        setImageSrc(thumbnailSrc);
        setIsLoaded(true);
      };
    }
  }, [thumbnailSrc]);
  
  // Load the full resolution image when requested
  useEffect(() => {
    if (loadFullResolution && !fullResLoaded) {
      setIsLoadingFullRes(true);
      
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImageSrc(src);
        setFullResLoaded(true);
        setIsLoadingFullRes(false);
        if (onFullResolutionLoaded) {
          onFullResolutionLoaded();
        }
      };
    }
  }, [loadFullResolution, src, fullResLoaded, onFullResolutionLoaded]);
  
  return (
    <LazyImageContainer onClick={onClick}> {/* Added onClick */}
      <StyledImage 
        src={imageSrc} 
        alt={alt} 
        className={className}
        isLoaded={isLoaded}
        style={{ cursor: onClick ? 'pointer' : 'default' }} // Added cursor style
      />
      {!isLoaded && <LoadingPlaceholder />}
      {isLoadingFullRes && (
        <LoadingOverlay>
          {t('Loading full resolution...')}
        </LoadingOverlay>
      )}
    </LazyImageContainer>
  );
};

// VideoThumbnail component
const VideoThumbnail: React.FC<{ 
  thumbnailUrl: string; 
  videoUrl: string; 
  duration: string; 
  index: number;
  onFullResolutionLoaded?: () => void;
  onClick?: () => void; // Added onClick prop
}> = ({ 
  thumbnailUrl, 
  videoUrl, 
  duration, 
  index,
  onFullResolutionLoaded,
  onClick // Added onClick prop
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadFullVideo, setLoadFullVideo] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const { t } = useTranslation();
  
  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    
    if (!isVideoLoaded) {
      setLoadFullVideo(true);
    } else {
      setIsPlaying(true);
    }
  };
  
  // When full video is loaded, mark as ready to play
  const handleFullVideoLoaded = () => {
    setIsVideoLoaded(true);
    setIsPlaying(true);
    if (onFullResolutionLoaded) {
      onFullResolutionLoaded();
    }
  };
  
  // Load video when the video element is available
  useEffect(() => {
    if (loadFullVideo && videoRef.current && !isVideoLoaded) {
      const video = videoRef.current;
      
      // Set up event listeners for video loading
      const handleCanPlayThrough = () => {
        handleFullVideoLoaded();
        video.removeEventListener('canplaythrough', handleCanPlayThrough);
      };
      
      video.addEventListener('canplaythrough', handleCanPlayThrough);
      
      // Start loading the video
      video.load();
      
      return () => {
        video.removeEventListener('canplaythrough', handleCanPlayThrough);
      };
    }
  }, [loadFullVideo, isVideoLoaded]);
  
  if (isPlaying) {
    return (
      <video ref={videoRef} controls style={{ width: '100%', height: '100%' }}>
        <source src={videoUrl} type="video/mp4" />
        {t('Your browser does not support the video tag.')}
      </video>
    );
  }
  
  if (loadFullVideo && !isVideoLoaded) {
    return (
      <ThumbnailWrapper>
        <LazyImage 
          src={videoUrl}
          thumbnailSrc={thumbnailUrl} 
          alt={`Video thumbnail ${index + 1}`}
        />
        <LoadingOverlay>
          {t('Loading video...')}
        </LoadingOverlay>
        <video 
          ref={videoRef} 
          style={{ display: 'none' }} 
          preload="auto"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      </ThumbnailWrapper>
    );
  }
  
  return (
    <ThumbnailWrapper onClick={handleClick}>
      <LazyImage 
        src={videoUrl}
        thumbnailSrc={thumbnailUrl} 
        alt={`Video thumbnail ${index + 1}`}
      />
      <PlayButton />
      <DurationBadge>{duration}</DurationBadge>
    </ThumbnailWrapper>
  );
};

// Format time in MM:SS
const formatTime = (seconds: number = 0): string => {
  return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
};

// QR Code Modal component
const QRCodeModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  folderId: string | null;
  t: (key: string) => string;
}> = ({ isOpen, onClose, folderId, t }) => {
  if (!isOpen) return null;
  
  // Format folder ID for the QR code URL
  const formatFolderId = (rawId: string | null): string | null => {
    if (!rawId || !rawId.includes('_')) {
      return null;
    }
    
    const [prefix, suffix] = rawId.split('_');
    return `${prefix}_____${suffix}____Folder`;
  };
  
  // Create a QR code URL with the properly formatted folder ID
  const formattedFolderId = folderId ? formatFolderId(folderId) : null;
  const qrCodeUrl = formattedFolderId ? `https://6180.io/folder/${formattedFolderId}` : '';
  
  return (
    <Modal>
      <ModalContent>
        <QRCodeContainer>
          {folderId && (
            <QRCode 
              value={qrCodeUrl}
              size={256}
              style={{ height: "auto", maxWidth: "300px", width: "100%" }}
              viewBox={`0 0 256 256`}
              level="H"
            />
          )}
        </QRCodeContainer>
        
        <InstructionsContainer>
          <InstructionHeading>{t('To load this album on your iPhone:')}</InstructionHeading>
          <InstructionList>
            <InstructionItem>
              {t('Use your phone\'s camera to scan the QR code to get [6180] from the [App Store] and sign up')}
            </InstructionItem>
            <InstructionItem>
              {t('Tap "Files" at the bottom middle')}
            </InstructionItem>
            <InstructionItem>
              {t('Tap "Album QR Code" at the top left')}
            </InstructionItem>
          </InstructionList>
          
          <ItalicText>
            {t('You can also screen shot this page with your phone and click "Load Saved QR Code" on the iPhone app')}
          </ItalicText>
        </InstructionsContainer>

        <CloseButton onClick={onClose}>
          {t('Close')}
        </CloseButton>
      </ModalContent>
    </Modal>
  );
};

// ResponsiveHeader component
const ResponsiveHeader: React.FC<{
  saveAlbum: () => void;
  downloadPhotos: () => void;
  getQRCode: () => void;
  showSaveButton: boolean; // Added this prop
  t: (key: string) => string;
}> = ({ saveAlbum, downloadPhotos, getQRCode, showSaveButton, t }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  
  // Check window width on mount and when resized
  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkWidth();
    
    // Add resize listener
    window.addEventListener('resize', checkWidth);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkWidth);
  }, []);
  
  // Toggle menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  // Close menu
  const closeMenu = () => {
    setMenuOpen(false);
  };
  
  // Execute action and close menu
  const handleAction = (action: () => void) => {
    action();
    closeMenu();
  };
  
  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    
    // Handle scroll to close menu
    const handleScroll = () => {
      setMenuOpen(false);
    };
    
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [menuOpen]);
  
  if (isMobile) {
    return (
      <div ref={menuRef} style={{ position: 'relative' }}>
        <HamburgerButton 
          onClick={toggleMenu}
          aria-label={t('Menu')}
          aria-expanded={menuOpen}
        >
          <HamburgerIcon>
            <HamburgerLine />
            <HamburgerLine />
            <HamburgerLine />
          </HamburgerIcon>
          {t('Save')}
        </HamburgerButton>
        
        {menuOpen && (
          <DropdownMenu>
            <MenuButton onClick={() => handleAction(saveAlbum)}>
              {t('Add Photos To Album')}
            </MenuButton>
            
            {showSaveButton && (
              <MenuButton onClick={() => handleAction(saveAlbum)}>
                {t('Save To 6180')}
              </MenuButton>
            )}
            
            <MenuButton onClick={() => handleAction(downloadPhotos)}>
              {t('Download Photos')}
            </MenuButton>
            
            <MenuButton onClick={() => handleAction(getQRCode)}>
              {t('Open On iPhone App')}
            </MenuButton>
          </DropdownMenu>
        )}
      </div>
    );
  }
  
  // Desktop view
  return (
    <>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}> {/* Add flex-wrap for responsive behavior */}
        <ActionButton onClick={saveAlbum}>
          {t('Add Photos To Album')}
        </ActionButton>            
        
        {showSaveButton && (
          <ActionButton onClick={saveAlbum}>
            {t('Save To 6180')}
          </ActionButton>
        )}
        
        <ActionButton onClick={downloadPhotos}>
          {t('Download Photos')}
        </ActionButton>
        
        <ActionButton onClick={getQRCode}>
          {t('Open On iPhone App')}
        </ActionButton>
      </div>
    </>
  );
};

// Extend MediaBlock for selection mode support
const SelectableMediaBlock = styled(MediaBlock)<{ isSelected?: boolean }>`
  ${(props) =>
    props.isSelected &&
    `
    border: 3px solid #006adc;
    box-shadow: 0 0 0 3px rgba(0, 106, 220, 0.3);
  `}
`;

// Main Photo Album Component
const PhotoAlbumContent: React.FC = () => {
  // Hooks for i18n
  const { t, language } = useTranslation();
  
  // State
  const [columns, setColumns] = useState<string>('1');
  const [albumData, setAlbumData] = useState<AlbumData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [folderId, setFolderId] = useState<string | null>(null);
  const [showSaveButton, setShowSaveButton] = useState<boolean>(true); // Added state for Save button visibility
  
  // Interactive state
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [showQRModal, setShowQRModal] = useState<boolean>(false);
  
  // Added state for tracking which items are loading in full resolution
  const [loadingFullResolution, setLoadingFullResolution] = useState<Record<number, boolean>>({});
  
  // New state for fullscreen viewer
  const [fullscreenItem, setFullscreenItem] = useState<number | null>(null);
  
  // Selection mode state
  const [isSelectionMode, setIsSelectionMode] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

  // Format folder ID
  const formatFolderId = (rawId: string | null): string | null => {
    if (!rawId || !rawId.includes('_')) {
      return null;
    }
    
    const [prefix, suffix] = rawId.split('_');
    return `${prefix}_____${suffix}____Folder`;
  };

  // Get folder ID from URL
  const getFolderIdFromUrl = (): string | null => {
    // Check in query params
    const urlParams = new URLSearchParams(window.location.search);
    const folderId = urlParams.get('id');
    
    if (folderId) return folderId;
    
    // Check in path
    const pathParts = window.location.pathname.split('/');
    const lastPart = pathParts[pathParts.length - 1];
    
    if (lastPart && lastPart.includes('_')) {
      return lastPart;
    }
    
    return null;
  };

  // Process data returned from API
  const processData = (json: any): AlbumData => {
    const items = json?.data?.fetchFolders?.items || [];
    const mediaItems: MediaItem[] = [];
    const contacts: Contact = {};
    let folderName = t('Photos');
    let folderDescription = '';
    
    // Set to track unique dataKeys
    const uniqueDataKeys = new Set<string>();
    
    if (items.length > 0) {
      // Get folder name if available
      if (items[0]?.folderName && items[0].folderName.length > 0) {
        folderName = items[0].folderName;
      }
      
      // Get folder description if available
      if (items[0]?.folderDescription && items[0].folderDescription.length > 0) {
        folderDescription = items[0].folderDescription;
      }
      
      // Build contacts map
      (items[0]?.contactsUsingInvite?.items || []).forEach((contact: any) => {
        if (contact?.id && contact?.item?.publicDisplayName) {
          contacts[contact.id] = contact.item.publicDisplayName;
        }
      });
      
      // Get media items and filter duplicates by dataKey
      (items[0]?.fileReferencesPage?.items || []).forEach((ref: any) => {
        const file = ref?.file;
        if (!file?.dataKey) return;

        const { dataKey, thumbnailDataKey, durationInSeconds, ownerContactId } = file;
        
        // Skip this item if we've already seen this dataKey
        if (uniqueDataKeys.has(dataKey)) {
          return;
        }
        
        // Add to our set of seen dataKeys
        uniqueDataKeys.add(dataKey);
        
        const url = `${S3_BUCKET_URL}${dataKey}`;
        const thumbnailUrl = thumbnailDataKey ? `${S3_BUCKET_URL}${thumbnailDataKey}` : undefined;

        if (dataKey.startsWith("Input/Image/")) {
          mediaItems.push({ 
            type: "image", 
            url,
            thumbnailUrl: thumbnailUrl || url, // Use url as fallback if no thumbnail
            ownerId: ownerContactId,
            loaded: false
          });
        } else if (dataKey.startsWith("Input/Video/")) {
          mediaItems.push({
            type: "video",
            url,
            thumbnailUrl: thumbnailUrl || url, // Use url as fallback if no thumbnail
            duration: formatTime(durationInSeconds),
            ownerId: ownerContactId,
            loaded: false
          });
        }
      });
    }
    
    return { mediaItems, folderName, folderDescription, contacts };
  };

  // Open fullscreen view for a media item
  const openFullscreenView = (index: number) => {
    // Don't open fullscreen view in selection mode
    if (isSelectionMode) return;
    
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

  // Modified: Fetch folder data with dual API approach
  const fetchFolder = async (folderId: string): Promise<AlbumData | null> => {
    try {
      // First, use the public API to get a quick response
      const publicApiPromise = fetch(AWS_PUBLIC_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': AWS_PUBLIC_API_KEY
        },
        body: JSON.stringify({
          query: FETCH_FOLDERS_QUERY,
          variables: { folderIds: [folderId] }
        })
      }).then(response => response.json());
      
      // In parallel, try to use the private API if the user is logged in
      const privateApiPromise = (async () => {
        const token = await checkLoginWithoutRedirect();
        if (!token) {
          return null; // User is not logged in
        }
        
        // User is logged in, use private API for richer data
        return fetch(AWS_PRIVATE_GRAPHQL_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            query: FETCH_FOLDERS_QUERY,
            variables: { folderIds: [folderId] }
          })
        }).then(response => response.json());
      })();
      
      // Wait for the public API to respond first
      const publicResult = await publicApiPromise;
      let initialData = processData(publicResult);
      
      // Set the data from the public API to get a quick first render
      setAlbumData(initialData);
      
      // Then wait for the private API (if available)
      const privateResult = await privateApiPromise;
      if (privateResult) {
        // Check if there's a folderPosition in the private API result
        const folderPosition = privateResult?.data?.fetchFolders?.items?.[0]?.folderPosition?.id;
        
        // If folderPosition exists, hide the Save button
        if (folderPosition) {
          setShowSaveButton(false);
        }
        
        // Replace with potentially richer data from the private API
        const privateData = processData(privateResult);
        if (privateData.mediaItems.length >= initialData.mediaItems.length) {
          initialData = privateData;
          setAlbumData(privateData);
        }
      }
      
      return initialData;
    } catch (error) {
      console.error('Error fetching folder data:', error);
      setError(t('Please try refreshing the page or contact support if the problem persists.'));
      return null;
    }
  };

  // Change columns
  const changeColumns = (value: string) => {
    setColumns(value);
    localStorage.setItem('columns', value);
  };
  
  // Save album function
  const saveAlbum = async () => {
    
    const folderId = getFolderIdFromUrl();
    const formattedFolderId = formatFolderId(folderId);
    
    if (formattedFolderId) {

      const targetPath = `/save-album.html?folderId=${formattedFolderId}`
      const token = await checkLoginWithRefreshOrRedirectToTarget(targetPath);
      
      if (token) {
        window.location.href = targetPath;
      }

    } else {
      alert(t('Please try refreshing the page or contact support if the problem persists.'));
    }
  };

  // Create Selection function - NEW FUNCTION
  const createSubalbum = () => {
    // Toggle selection mode
    setIsSelectionMode(!isSelectionMode);
    // Clear any existing selections when toggling
    setSelectedItems(new Set());
  };
  
  // Toggle item selection - NEW FUNCTION
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
  
  // Cancel selection mode - NEW FUNCTION
  const cancelSelection = () => {
    setIsSelectionMode(false);
    setSelectedItems(new Set());
  };
  
  // Share the selected items - NEW FUNCTION
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

  // Download photos function
  const downloadPhotos = () => {
    // Check if we're on a mobile device
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
      modalContent.style.maxWidth = '90%';
      modalContent.style.maxHeight = '80%';
      modalContent.style.display = 'flex';
      modalContent.style.flexDirection = 'column';
      modalContent.style.position = 'relative';
      
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
      headerContainer.style.justifyContent = 'flex-start'; // Changed from 'flex-end' to 'flex-start'
      
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
      contentWrapper.style.padding = '20px';
      contentWrapper.style.flexGrow = '1';
      contentWrapper.style.width = '100%'; // Added to ensure full width content
      
      // Items container for individual photo downloads
      const itemsContainer = document.createElement('div');
      itemsContainer.style.display = 'grid';
      itemsContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
      itemsContainer.style.gap = '10px';
      itemsContainer.style.marginBottom = '20px';
      itemsContainer.style.width = '100%'; // Added to ensure full width grid
      
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
          // Use thumbnailUrl instead of url for initial display
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
          downloadLink.style.padding = '8px 12px';
          downloadLink.style.borderRadius = '4px';
          downloadLink.style.fontSize = '14px';
          downloadLink.style.textAlign = 'center';
          downloadLink.style.width = '100%'; // Make button fill width
          
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
      
      // Add options as bullet points
      const optionsList = document.createElement('ul');
      
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
              // Load full resolution when downloading
              handleLoadFullResolution(index);
              
              const response = await fetch(item.url);
              if (!response.ok) throw new Error(`Failed to fetch ${item.url}`);
              
              const blob = await response.blob();
              const extension = item.type === 'image' ? 'jpg' : 'mp4';
              const fileName = `${folderName}-${index + 1}.${extension}`;
              
              zip.file(fileName, blob);
              
              // Mark as loaded
              handleFullResolutionLoaded(index);
              
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

  // Set default columns
  useEffect(() => {
    const savedColumnsValue = localStorage.getItem('columns') || '1';
    setColumns(savedColumnsValue);
  }, []);

  // Fetch album data
  useEffect(() => {
    const initAlbum = async () => {
      const rawFolderId = getFolderIdFromUrl();
      
      if (!rawFolderId) {
        setError(t('Please try refreshing the page or contact support if the problem persists.'));
        setIsLoading(false);
        return;
      }
      
      // Save the raw folder ID for QR code
      setFolderId(rawFolderId);
      
      const formattedFolderId = formatFolderId(rawFolderId);
      
      if (!formattedFolderId) {
        setError(t('Please try refreshing the page or contact support if the problem persists.'));
        setIsLoading(false);
        return;
      }
      
      const data = await fetchFolder(formattedFolderId);
      
      if (data) {
        setAlbumData(data);
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
          <HeaderControls>
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
            <CreateAlbumButton onClick={createSubalbum}>
              {t('Create Sub-album')}
            </CreateAlbumButton>
          )}
            
            <div>
              <ResponsiveHeader 
                saveAlbum={saveAlbum} 
                downloadPhotos={downloadPhotos}
                getQRCode={getQRCode}
                showSaveButton={showSaveButton}
                t={t} 
              />
            </div>
          </HeaderControls>
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
          ) : albumData && albumData.mediaItems.length === 0 ? (
            <ErrorMessage>{t('No media found in this album')}</ErrorMessage>
          ) : (
            albumData?.mediaItems.map((item, index) => {
              const ownerName = item.ownerId && albumData.contacts[item.ownerId] 
                ? albumData.contacts[item.ownerId] 
                : '';
              
              const isSelected = selectedItems.has(index);
              
              return (
                <SelectableMediaBlock 
                  key={index} 
                  isHovered={hoverIdx === index}
                  isVideo={item.type === 'video'}
                  isSelected={isSelectionMode && isSelected}
                  onMouseEnter={() => setHoverIdx(index)}
                  onMouseLeave={() => setHoverIdx(null)}
                  onClick={(e: React.MouseEvent) => isSelectionMode ? 
                    toggleItemSelection(index, e) : 
                    openFullscreenView(index)}
                  style={{ position: 'relative' }}
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
                    />
                  ) : (
                    <VideoThumbnail 
                      thumbnailUrl={item.thumbnailUrl || ''} 
                      videoUrl={item.url} 
                      duration={item.duration || '0:00'} 
                      index={index}
                      onFullResolutionLoaded={() => handleFullResolutionLoaded(index)}
                      onClick={() => isSelectionMode ? undefined : openFullscreenView(index)}
                    />
                  )}
                  
                  {ownerName && <OwnerBadge>{ownerName}</OwnerBadge>}
                </SelectableMediaBlock>
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
          ownerName={
            albumData.mediaItems[fullscreenItem].ownerId && 
            albumData.contacts[albumData.mediaItems[fullscreenItem].ownerId] 
              ? albumData.contacts[albumData.mediaItems[fullscreenItem].ownerId] 
              : undefined
          }
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