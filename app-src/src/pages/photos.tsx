import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { I18nProvider, useTranslation } from "@/lib/i18n/react";
import JSZip from "jszip";
import QRCode from "react-qr-code";
import { checkLoginWithRefreshOrRedirectToTarget } from "@/lib/utils";

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

// Constants
const GRAPHQL_ENDPOINT = "https://nmu355vgsbdbjcihhtekwdczxi.appsync-api.us-east-1.amazonaws.com/graphql";
const API_KEY = "da2-45aunjrsbfbdhlaaomrswhsszq";
const BUCKET_URL = "https://i6180-assets-prod-0.s3.amazonaws.com/";

// CSS styles as a JavaScript object
const styles = {
  body: {
    fontFamily: 'Helvetica, Arial, sans-serif',
    maxWidth: '1200px',
    margin: 'auto',
    background: '#f9fafb',
    color: '#333',
    lineHeight: 1.5,
    padding: '20px'
  },
  header: {
    position: 'sticky' as const,
    top: 0,
    background: '#fff',
    boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
    zIndex: 10,
    marginBottom: '10px'
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '16px 24px'
  },
  headerControls: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '10px',
    marginBottom: '5px', 
    gap: '10px' 
  },
  rowSelectorContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px' 
  },
  actionButton: {
    background: 'transparent',
    color: '#006adc',
    border: '1px solid #006adc',
    borderRadius: '4px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: '14px',
    transition: 'all 0.2s ease'
  },
  // Responsive header styles
  hamburgerButton: {
    background: 'transparent',
    color: '#006adc',
    border: '1px solid #006adc',
    borderRadius: '4px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: '14px',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  hamburgerIcon: {
    width: '18px',
    height: '14px',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-between'
  },
  hamburgerLine: {
    height: '2px',
    background: '#006adc',
    width: '100%'
  },
  dropdownMenu: {
    position: 'absolute' as const,
    top: '100%',
    right: 0,
    zIndex: 100,
    backgroundColor: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    borderRadius: '4px',
    padding: '8px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
    minWidth: '180px',
    marginTop: '4px'
  },
  menuButton: {
    background: 'transparent',
    color: '#006adc',
    border: '1px solid #006adc',
    borderRadius: '4px',
    padding: '10px',
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: '14px',
    width: '100%',
    textAlign: 'left' as const
  },
  loginText: {
    color: '#006adc',
    padding: '8px 0',
    fontWeight: 500,
    cursor: 'pointer',
    textDecoration: 'underline',
    display: 'inline-block'
  },
  albumTitle: {
    fontWeight: 400,
    margin: '0 0 16px 0',
    fontSize: '24px',
    padding: '16px 0',
  },
  albumTitleStrong: {
    fontWeight: 700
  },
  mediaContainer: {
    padding: '10px 20px 20px'
  },
  descriptionBlock: {
    background: 'white',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    borderRadius: '4px',
    padding: '20px',
    marginBottom: '20px'
  },
  descriptionText: {
    margin: 0
  },
  mediaGrid: {
    display: 'grid',
    gridGap: '20px'
  },
  onePerRow: {
    gridTemplateColumns: 'repeat(1, 1fr)'
  },
  twoPerRow: {
    gridTemplateColumns: 'repeat(2, 1fr)'
  },
  threePerRow: {
    gridTemplateColumns: 'repeat(3, 1fr)'
  },
  fourPerRow: {
    gridTemplateColumns: 'repeat(4, 1fr)'
  },
  fivePerRow: {
    gridTemplateColumns: 'repeat(5, 1fr)'
  },
  mediaBlock: {
    background: 'white',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
    position: 'relative' as const,
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const
  },
  mediaBlockHover: {
    transform: 'translateY(-2px)'
  },
  lazyImageContainer: {
    position: 'relative' as const,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    width: '100%',
    minHeight: '200px',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column' as const
  },
  thumbnailWrapper: {
    position: 'relative' as const,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    width: '100%',
    minHeight: '200px',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column' as const
  },
  lazyImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    position: 'relative' as const,
    zIndex: 1,
    transition: 'opacity 0.3s',
    opacity: 0
  },
  lazyImageLoaded: {
    opacity: 1
  },
  loadingPlaceholder: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'loading-animation 1.5s infinite',
    zIndex: 0
  },
  ownerBadge: {
    position: 'absolute' as const,
    bottom: '12px',
    right: '12px',
    background: 'rgba(255,255,255,0.85)',
    padding: '6px 12px',
    fontSize: '12px',
    fontWeight: 500,
    zIndex: 3
  },
  videoContainer: {
    cursor: 'pointer'
  },
  playButton: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60px',
    height: '60px',
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: '50%',
    zIndex: 2
  },
  playButtonBefore: {
    content: '""',
    position: 'absolute' as const,
    top: '50%',
    left: '55%',
    transform: 'translate(-50%, -50%)',
    borderStyle: 'solid',
    borderWidth: '15px 0 15px 25px',
    borderColor: 'transparent transparent transparent white'
  },
  durationBadge: {
    position: 'absolute' as const,
    bottom: '12px',
    left: '12px',
    background: 'rgba(0,0,0,0.7)',
    color: 'white',
    padding: '4px 8px',
    fontSize: '14px',
    borderRadius: '4px',
    fontWeight: 500,
    zIndex: 2
  },
  error: {
    textAlign: 'center' as const,
    padding: '40px',
    fontSize: '18px',
    color: '#d32f2f'
  },
  loading: {
    textAlign: 'center' as const,
    padding: '40px',
    fontSize: '18px',
    color: '#666'
  },
  rowSelector: {
    display: 'flex',
    alignItems: 'center'
  },
  rowSelectorLabel: {
    marginRight: '8px',
    fontSize: '14px',
    color: '#555',
    fontWeight: 'normal' as const
  },
  rowSelectorSelect: {
    padding: '5px 8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    minWidth: '50px'
  },
  languageSelectorContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '0 20px 8px 0'
  },
  // QR Code Modal styles
  modal: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    maxWidth: '90%',
    maxHeight: '90%',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center'
  },
  qrCodeContainer: {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center'
  },
  instructionsContainer: {
    marginBottom: '20px',
    width: '100%',
    maxWidth: '400px'
  },
  instructionHeading: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '16px',
    textAlign: 'center' as const
  },
  instructionList: {
    listStyleType: 'decimal',
    paddingLeft: '20px'
  },
  instructionItem: {
    marginBottom: '12px',
    fontSize: '16px'
  },
  closeButton: {
    marginTop: '16px',
    padding: '8px 16px',
    backgroundColor: '#006adc',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  // Loading overlay
  loadingOverlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontWeight: 500
  }
};

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

// Add keyframes for loading animation
const keyframesStyle = `
  @keyframes loading-animation {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

// LazyImage component - UPDATED
const LazyImage: React.FC<{ 
  src: string; 
  thumbnailSrc?: string; 
  alt: string; 
  className?: string;
  loadFullResolution?: boolean;
  onFullResolutionLoaded?: () => void;
}> = ({ 
  src, 
  thumbnailSrc, 
  alt, 
  className = '', 
  loadFullResolution = false,
  onFullResolutionLoaded
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
    <div style={styles.lazyImageContainer}>
      <img 
        style={{
          ...styles.lazyImage,
          ...(isLoaded ? styles.lazyImageLoaded : {})
        }}
        src={imageSrc} 
        alt={alt} 
        className={className}
      />
      {!isLoaded && <div style={styles.loadingPlaceholder}></div>}
      {isLoadingFullRes && (
        <div style={styles.loadingOverlay}>
          {t('Loading full resolution...')}
        </div>
      )}
    </div>
  );
};

// VideoThumbnail component - UPDATED
const VideoThumbnail: React.FC<{ 
  thumbnailUrl: string; 
  videoUrl: string; 
  duration: string; 
  index: number;
  onFullResolutionLoaded?: () => void;
}> = ({ 
  thumbnailUrl, 
  videoUrl, 
  duration, 
  index,
  onFullResolutionLoaded
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadFullVideo, setLoadFullVideo] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const { t } = useTranslation();
  
  const handleClick = () => {
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
      <div style={styles.thumbnailWrapper}>
        <LazyImage 
          src={videoUrl}
          thumbnailSrc={thumbnailUrl} 
          alt={`Video thumbnail ${index + 1}`}
        />
        <div style={styles.loadingOverlay}>
          {t('Loading video...')}
        </div>
        <video 
          ref={videoRef} 
          style={{ display: 'none' }} 
          preload="auto"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      </div>
    );
  }
  
  return (
    <div style={styles.thumbnailWrapper} onClick={handleClick}>
      <LazyImage 
        src={videoUrl}
        thumbnailSrc={thumbnailUrl} 
        alt={`Video thumbnail ${index + 1}`}
      />
      <div style={styles.playButton}>
        <div style={styles.playButtonBefore}></div>
      </div>
      <div style={styles.durationBadge}>{duration}</div>
    </div>
  );
};

// Format time in MM:SS
const formatTime = (seconds: number = 0): string => {
  return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
};

// Updated QR Code Modal component with save image functionality and added text
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
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        <div style={styles.qrCodeContainer}>
          {/* Use QRCode component from react-qr-code with ref */}
          {folderId && (
            <QRCode 
              value={qrCodeUrl}
              size={256}
              style={{ height: "auto", maxWidth: "300px", width: "100%" }}
              viewBox={`0 0 256 256`}
              level="H"
            />
          )}
          
        </div>
        
        <div style={styles.instructionsContainer}>
          <h3 style={styles.instructionHeading}>{t('To load this album on your iPhone:')}</h3>
          <ol style={styles.instructionList}>
            <li style={styles.instructionItem}>
              {t('Use your phone\'s camera to scan the QR code to get [6180] from the [App Store] and sign up')}
            </li>
            <li style={styles.instructionItem}>
              {t('Tap "Files" at the bottom middle')}
            </li>
            <li style={styles.instructionItem}>
              {t('Tap "Album QR Code" at the top left')}
            </li>
          </ol>
          
          {/* Added italic text as requested */}
          <p style={{ fontStyle: 'italic', marginTop: '12px', marginBottom: '12px', textAlign: 'center' }}>
            {t('You can also screen shot this page with your phone and click "Load Saved QR Code" on the iPhone app')}
          </p>
          
        </div>

        <button style={styles.closeButton} onClick={onClose}>
          {t('Close')}
        </button>
      </div>
    </div>
  );
};

// ResponsiveHeader component
const ResponsiveHeader: React.FC<{
  saveAlbum: () => void;
  downloadPhotos: () => void;
  getQRCode: () => void;
  t: (key: string) => string;
}> = ({ saveAlbum, downloadPhotos, getQRCode, t }) => {
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
        <button 
          style={styles.hamburgerButton} 
          onClick={toggleMenu}
          aria-label={t('Menu')}
          aria-expanded={menuOpen}
        >
          <span style={styles.hamburgerIcon}>
            <span style={styles.hamburgerLine}></span>
            <span style={styles.hamburgerLine}></span>
            <span style={styles.hamburgerLine}></span>
          </span>
          {t('Save Photos')}
        </button>
        
        {menuOpen && (
          <div style={styles.dropdownMenu}>
            <button 
              style={styles.menuButton} 
              onClick={() => handleAction(saveAlbum)}
            >
              {t('Add Photos To Album')}
            </button>
            
            <button 
              style={styles.menuButton} 
              onClick={() => handleAction(saveAlbum)}
            >
              {t('Save To 6180')}
            </button>
            
            <button 
              style={styles.menuButton} 
              onClick={() => handleAction(downloadPhotos)}
            >
              {t('Download Photos')}
            </button>
            
            <button 
              style={styles.menuButton} 
              onClick={() => handleAction(getQRCode)}
            >
              {t('Open On iPhone App')}
            </button>
          </div>
        )}
      </div>
    );
  }
  
  // Desktop view
  return (
    <>
      <button
        style={styles.actionButton}
        onClick={saveAlbum}
      >
        {t('Add Photos To Album')}
      </button>            
      <button
        style={styles.actionButton}
        onClick={saveAlbum}
      >
        {t('Save To 6180')}
      </button>
      
      <button
        style={styles.actionButton}
        onClick={downloadPhotos}
      >
        {t('Download Photos')}
      </button>
      
      <button
        style={styles.actionButton}
        onClick={getQRCode}
      >
        {t('Open On iPhone App')}
      </button>
    </>
  );
};

// Main Photo Album Component - UPDATED
const PhotoAlbumContent: React.FC = () => {
  // Hooks for i18n
  const { t, language } = useTranslation();
  
  // State
  const [columns, setColumns] = useState<string>('1');
  const [albumData, setAlbumData] = useState<AlbumData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [folderId, setFolderId] = useState<string | null>(null);
  
  // Interactive state
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [showQRModal, setShowQRModal] = useState<boolean>(false);
  
  // Added state for tracking which items are loading in full resolution
  const [loadingFullResolution, setLoadingFullResolution] = useState<Record<number, boolean>>({});

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

  // Process data returned from API - UPDATED
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
        
        const url = `${BUCKET_URL}public/${dataKey}`;
        const thumbnailUrl = thumbnailDataKey ? `${BUCKET_URL}public/${thumbnailDataKey}` : undefined;

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

  // Fetch folder data
  const fetchFolder = async (folderId: string): Promise<AlbumData | null> => {
    try {
      const response = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        },
        body: JSON.stringify({
          query: FETCH_FOLDERS_QUERY,
          variables: { folderIds: [folderId] }
        })
      });
      
      const result = await response.json();
      return processData(result);
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
  
  // Save album function - UPDATED with await
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

  // Handle Get QR Code function
  const getQRCode = () => {
    setShowQRModal(true);
  };

  // Download photos function - UPDATED
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
      
      // Items container for individual photo downloads
      const itemsContainer = document.createElement('div');
      itemsContainer.style.display = 'grid';
      itemsContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
      itemsContainer.style.gap = '10px';
      itemsContainer.style.marginBottom = '20px';
      
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
          // UPDATED: Use thumbnailUrl instead of url for initial display
          thumbnail.src = item.type === 'image' ? (item.thumbnailUrl || item.url) : (item.thumbnailUrl || '');
          thumbnail.style.width = '100%';
          thumbnail.style.height = '120px';
          thumbnail.style.objectFit = 'cover';
          thumbnail.style.marginBottom = '10px';
          
          // Create download link - UPDATED FOR IOS
          const downloadLink = document.createElement('a');
          downloadLink.href = item.url;
          
          // For iOS, we need special handling
          const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
          if (isIOS) {
            // Use the same handler for both images and videos
            downloadLink.addEventListener('click', function(e) {
              e.preventDefault();
              
              // Trigger full resolution loading for this item
              handleLoadFullResolution(index);
              
              // Create a full-screen overlay
              const overlay = document.createElement('div');
              overlay.style.position = 'fixed';
              overlay.style.top = '0';
              overlay.style.left = '0';
              overlay.style.width = '100%';
              overlay.style.height = '100%';
              overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
              overlay.style.zIndex = '2000';
              overlay.style.display = 'flex';
              overlay.style.flexDirection = 'column';
              
              // Add a header with back button
              const header = document.createElement('div');
              header.style.padding = '15px';
              header.style.display = 'flex';
              header.style.justifyContent = 'flex-start';
              header.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
              
              const backButton = document.createElement('button');
              backButton.textContent = t('Back');
              backButton.style.background = 'transparent';
              backButton.style.border = 'none';
              backButton.style.color = 'white';
              backButton.style.fontSize = '16px';
              backButton.style.padding = '5px 10px';
              backButton.style.cursor = 'pointer';
              backButton.onclick = () => {
                document.body.removeChild(overlay);
              };
              
              header.appendChild(backButton);
              
              // Create media container
              const mediaContainer = document.createElement('div');
              mediaContainer.style.flex = '1';
              mediaContainer.style.display = 'flex';
              mediaContainer.style.alignItems = 'center';
              mediaContainer.style.justifyContent = 'center';
              mediaContainer.style.overflow = 'auto';
              mediaContainer.style.padding = '10px';
              mediaContainer.style.position = 'relative';
              
              // Create loading indicator
              const loadingIndicator = document.createElement('div');
              loadingIndicator.textContent = t('Loading full resolution...');
              loadingIndicator.style.position = 'absolute';
              loadingIndicator.style.top = '50%';
              loadingIndicator.style.left = '50%';
              loadingIndicator.style.transform = 'translate(-50%, -50%)';
              loadingIndicator.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
              loadingIndicator.style.color = 'white';
              loadingIndicator.style.padding = '10px 20px';
              loadingIndicator.style.borderRadius = '4px';
              loadingIndicator.style.zIndex = '10';
              
              // Differentiate between image and video
              if (item.type === 'image') {
                // Handle image display
                const fullImage = document.createElement('img');
                fullImage.style.maxWidth = '100%';
                fullImage.style.maxHeight = '100%';
                fullImage.style.objectFit = 'contain';
                fullImage.style.opacity = '0';
                fullImage.style.transition = 'opacity 0.3s';
                
                // First show the thumbnail
                fullImage.src = item.thumbnailUrl || item.url;
                fullImage.style.opacity = '0.5';
                
                // Then load the full resolution
                setTimeout(() => {
                  fullImage.onload = () => {
                    loadingIndicator.style.display = 'none';
                    fullImage.style.opacity = '1';
                    // Mark item as loaded
                    handleFullResolutionLoaded(index);
                  };
                  fullImage.src = item.url;
                }, 100);
                
                mediaContainer.appendChild(fullImage);
              } else {
                // Handle video display
                const video = document.createElement('video');
                video.style.maxWidth = '100%';
                video.style.maxHeight = '100%';
                video.style.display = 'none'; // Initially hidden while loading
                video.controls = true;
                
                // Create a temporary thumbnail display
                const tempThumb = document.createElement('img');
                tempThumb.src = item.thumbnailUrl || '';
                tempThumb.style.maxWidth = '100%';
                tempThumb.style.maxHeight = '100%';
                tempThumb.style.objectFit = 'contain';
                tempThumb.style.opacity = '0.5';
                
                // Set up event listeners for video loading
                video.oncanplaythrough = () => {
                  loadingIndicator.style.display = 'none';
                  tempThumb.style.display = 'none';
                  video.style.display = 'block';
                  // Mark item as loaded
                  handleFullResolutionLoaded(index);
                };
                
                // Add error handling
                video.onerror = () => {
                  loadingIndicator.textContent = t('Error loading video. Please try again.');
                  setTimeout(() => {
                    document.body.removeChild(overlay);
                  }, 2000);
                };
                
                const source = document.createElement('source');
                source.src = item.url;
                source.type = 'video/mp4';
                
                video.appendChild(source);
                mediaContainer.appendChild(tempThumb);
                mediaContainer.appendChild(video);
                
                // Start loading the video
                video.load();
              }
              
              // Instructions text
              const instructions = document.createElement('div');
              instructions.textContent = item.type === 'image' 
                ? t('Tap and hold image to save') 
                : t('Tap share icon to save video');
              instructions.style.color = 'white';
              instructions.style.fontSize = '14px';
              instructions.style.padding = '10px 15px';
              instructions.style.textAlign = 'center';
              instructions.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
              
              // Assemble the overlay
              mediaContainer.appendChild(loadingIndicator);
              overlay.appendChild(header);
              overlay.appendChild(mediaContainer);
              overlay.appendChild(instructions);
              
              // Add to document
              document.body.appendChild(overlay);
            });
            
            downloadLink.textContent = item.type === 'image' ? t('Download Photo') : t('Only On Desktop');
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
      
      explanationText.innerHTML = t('Due to technical limitations, bulk downloads on mobile browsers aren’t supported, and some videos may not download.<br><br>To download all photos and videos at once, please:');
      
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
              // UPDATED: Load full resolution when downloading
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
            downloadLink.download = `${folderName}.zip`;
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

  // Add keyframes to the document
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = keyframesStyle;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Set default columns
  useEffect(() => {
    const savedColumnsValue = localStorage.getItem('columns') || '1';
    setColumns(savedColumnsValue);
  }, []);

  // We're not hiding the columns selector anymore as per request
  // The previous effect for hiding the columns selector has been removed

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

  // Get column-specific grid style
  const getGridStyle = () => {
    switch(columns) {
      case '1': return { ...styles.mediaGrid, ...styles.onePerRow };
      case '2': return { ...styles.mediaGrid, ...styles.twoPerRow };
      case '3': return { ...styles.mediaGrid, ...styles.threePerRow };
      case '4': return { ...styles.mediaGrid, ...styles.fourPerRow };
      case '5': return { ...styles.mediaGrid, ...styles.fivePerRow };
      default: return { ...styles.mediaGrid, ...styles.onePerRow };
    }
  };

  // Render
  return (
    <div style={styles.body}>
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerControls}>
            <ResponsiveHeader 
              saveAlbum={saveAlbum} 
              downloadPhotos={downloadPhotos}
              getQRCode={getQRCode}
              t={t} 
            />
          </div>
          <div id="columns-container" style={styles.rowSelectorContainer}>
            <label htmlFor="columns" id="columns-label" style={styles.rowSelectorLabel}>
              <strong>{t('Columns:')}</strong>
            </label>
            <select 
              id="columns" 
              value={columns} 
              onChange={(e) => changeColumns(e.target.value)}
              style={styles.rowSelectorSelect}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
      </div>

      <div id="media-container" style={styles.mediaContainer}>
        {albumData?.folderName && albumData.folderName !== t('Photos') && albumData.folderName.trim() !== "" && (
          <h2 id="album-title" style={styles.albumTitle}>
            <strong style={styles.albumTitleStrong}>{albumData.folderName}</strong>
          </h2>
        )}
        
        {albumData?.folderDescription && albumData.folderDescription.trim() !== "" ? (
          <div id="description-container" style={styles.descriptionBlock}>
            <p style={styles.descriptionText}>{albumData.folderDescription}</p>
          </div>
        ) : null}
        
        <div id="media-grid" style={getGridStyle()}>
          {isLoading ? (
            <div id="loading-message" style={styles.loading}>
              {t('Loading album content...')}
            </div>
          ) : error ? (
            <div style={styles.error}>{error}</div>
          ) : albumData && albumData.mediaItems.length === 0 ? (
            <div style={styles.error}>{t('No media found in this album')}</div>
          ) : (
            albumData?.mediaItems.map((item, index) => {
              const ownerName = item.ownerId && albumData.contacts[item.ownerId] 
                ? albumData.contacts[item.ownerId] 
                : '';
              
              return (
                <div 
                  key={index} 
                  style={{
                    ...styles.mediaBlock,
                    ...(item.type === 'video' ? styles.videoContainer : {}),
                    ...(hoverIdx === index ? styles.mediaBlockHover : {})
                  }}
                  onMouseEnter={() => setHoverIdx(index)}
                  onMouseLeave={() => setHoverIdx(null)}
                >
                  {item.type === 'image' ? (
                    <LazyImage 
                      src={item.url}
                      thumbnailSrc={item.thumbnailUrl}
                      alt={`Album image ${index + 1}`}
                      loadFullResolution={loadingFullResolution[index] || false}
                      onFullResolutionLoaded={() => handleFullResolutionLoaded(index)}
                    />
                  ) : (
                    <VideoThumbnail 
                      thumbnailUrl={item.thumbnailUrl || ''} 
                      videoUrl={item.url} 
                      duration={item.duration || '0:00'} 
                      index={index}
                      onFullResolutionLoaded={() => handleFullResolutionLoaded(index)}
                    />
                  )}
                  
                  {ownerName && <div style={styles.ownerBadge}>{ownerName}</div>}
                </div>
              );
            })
          )}
        </div>
      </div>
      
      {/* QR Code Modal */}
      <QRCodeModal 
        isOpen={showQRModal} 
        onClose={() => setShowQRModal(false)} 
        folderId={folderId}
        t={t}
      />
    </div>
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