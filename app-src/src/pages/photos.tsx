import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { I18nProvider, useTranslation, LanguageSelector } from "@/lib/i18n/react";

// Types
interface MediaItem {
  type: 'image' | 'video';
  url: string;
  thumbnailUrl?: string;
  duration?: string;
  ownerId?: string;
}

interface Contact {
  [id: string]: string;
}

interface AlbumData {
  mediaItems: MediaItem[];
  folderName: string;
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px'
  },
  saveButton: { 
    color: '#006adc',
    border: '1px solid #ccc',
    borderRadius: '4px',
    background: 'white',
    padding: '8px 16px',
    cursor: 'pointer',
    fontWeight: 500,
    minWidth: '80px',
    textAlign: 'center' as const
  },
  albumTitle: {
    fontWeight: 400,
    margin: 0,
    padding: '16px 24px 0 24px',
    fontSize: '24px',
    display: 'none',
    backgroundColor: 'white'
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
  }
};

// GraphQL query
const FETCH_FOLDERS_QUERY = `
  query FetchFolders($folderIds: [String!]!) {
    fetchFolders(folderIds: $folderIds) {
      items {
        folderName
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

// LazyImage component
const LazyImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E");
  
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
  }, [src]);
  
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
    </div>
  );
};

// VideoThumbnail component
const VideoThumbnail: React.FC<{ 
  thumbnailUrl: string; 
  videoUrl: string; 
  duration: string; 
  index: number 
}> = ({ thumbnailUrl, videoUrl, duration, index }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handleClick = () => {
    setIsPlaying(true);
  };
  
  if (isPlaying) {
    return (
      <video controls style={{ width: '100%' }}>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }
  
  return (
    <div style={styles.thumbnailWrapper} onClick={handleClick}>
      <LazyImage 
        src={thumbnailUrl} 
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

// Main Photo Album Component
const PhotoAlbumContent: React.FC = () => {
  // Hooks for i18n
  const { t, language } = useTranslation();
  
  // State
  const [columns, setColumns] = useState<string>('1');
  const [albumData, setAlbumData] = useState<AlbumData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Interactive state
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

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
    
    if (items.length > 0) {
      // Get folder name if available
      if (items[0]?.folderName && items[0].folderName.length > 0) {
        folderName = items[0].folderName;
      }
      
      // Build contacts map
      (items[0]?.contactsUsingInvite?.items || []).forEach((contact: any) => {
        if (contact?.id && contact?.item?.publicDisplayName) {
          contacts[contact.id] = contact.item.publicDisplayName;
        }
      });
      
      // Get media items
      (items[0]?.fileReferencesPage?.items || []).forEach((ref: any) => {
        const file = ref?.file;
        if (!file?.dataKey) return;

        const { dataKey, thumbnailDataKey, durationInSeconds, ownerContactId } = file;
        const url = `${BUCKET_URL}public/${dataKey}`;

        if (dataKey.startsWith("Input/Image/")) {
          mediaItems.push({ 
            type: "image", 
            url,
            ownerId: ownerContactId
          });
        } else if (dataKey.startsWith("Input/Video/")) {
          mediaItems.push({
            type: "video",
            url,
            thumbnailUrl: `${BUCKET_URL}public/${thumbnailDataKey}`,
            duration: formatTime(durationInSeconds),
            ownerId: ownerContactId
          });
        }
      });
    }
    
    return { mediaItems, folderName, contacts };
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

  // Save album function
  const saveAlbum = () => {
    const folderId = getFolderIdFromUrl();
    const formattedFolderId = formatFolderId(folderId);
    
    if (formattedFolderId) {
      window.location.href = `/save-album.html?folderId=${formattedFolderId}`;
    } else {
      alert(t('Please try refreshing the page or contact support if the problem persists.'));
    }
  };

  // Change columns
  const changeColumns = (value: string) => {
    setColumns(value);
    localStorage.setItem('columns', value);
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

  // Fetch album data
  useEffect(() => {
    const initAlbum = async () => {
      const rawFolderId = getFolderIdFromUrl();
      
      if (!rawFolderId) {
        setError(t('Please try refreshing the page or contact support if the problem persists.'));
        setIsLoading(false);
        return;
      }
      
      const folderId = formatFolderId(rawFolderId);
      
      if (!folderId) {
        setError(t('Please try refreshing the page or contact support if the problem persists.'));
        setIsLoading(false);
        return;
      }
      
      const data = await fetchFolder(folderId);
      
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
        {albumData?.folderName && albumData.folderName !== t('Photos') && albumData.folderName.trim() !== "" && (
          <h2 id="album-title" style={{
            ...styles.albumTitle,
            display: 'block'
          }}>
            <strong style={styles.albumTitleStrong}>{albumData.folderName}</strong>
          </h2>
        )}
        <div style={styles.headerContent}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={styles.rowSelector}>
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
          <div>
            <button 
              id="save-button" 
              onClick={saveAlbum}
              style={styles.saveButton}
            >
              {t('Save')}
            </button>
          </div>
        </div>
      </div>

      <div style={styles.languageSelectorContainer}>
        <LanguageSelector />
      </div>

      <div id="media-container" style={styles.mediaContainer}>
        <div id="description-container" style={styles.descriptionBlock}>
          <p style={styles.descriptionText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.</p>
        </div>
        
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
                      alt={`Album image ${index + 1}`} 
                    />
                  ) : (
                    <VideoThumbnail 
                      thumbnailUrl={item.thumbnailUrl || ''} 
                      videoUrl={item.url} 
                      duration={item.duration || '0:00'} 
                      index={index} 
                    />
                  )}
                  {ownerName && <div style={styles.ownerBadge}>{ownerName}</div>}
                </div>
              );
            })
          )}
        </div>
      </div>
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