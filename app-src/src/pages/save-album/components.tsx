import React, { useMemo } from "react";
import { 
  SelectedPhoto,
} from "@/lib/types";
import {
  Card,
  ProgressTitle,
  ProgressBarBg,
  ProgressBar,
  ProgressText,
  PhotoCard,
  StatusIndicator,
  MediaPreview,
  MediaItem,
  VideoItem,
  ProgressBar as UploadProgressBar,
  Message,
  Card as FolderDetails,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea
} from "@/styles/styled-components";
import { useTranslation } from "@/lib/i18n/hooks";
import { PhotoTagging } from "./TagDisplayComponents";

// Interface for applied tags (matching the type used in save-album.tsx)
interface AppliedTag {
  tagTitle: string;
  TagType: string;
  subtags: { tagTitle: string; subtagTitle: string; }[];
}

// FIXED: CSS classes instead of JavaScript object creation on every render
const PHOTO_GRID_STYLES = {
  traditional: {
    padding: '20px',
    border: '2px dashed #007bff',
    borderRadius: '12px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
  },
  horizontal: {
    display: 'flex',
    overflowX: 'auto',
    gap: '16px',
    padding: '20px',
    border: '2px dashed #007bff',
    borderRadius: '12px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
    scrollbarWidth: 'thin',
    scrollbarColor: '#007bff #f8f9fa',
    scrollBehavior: 'smooth',
    WebkitOverflowScrolling: 'touch'
  }
} as const;

// FIXED: Memoized style objects to prevent recreation on every render
const PHOTO_CONTAINER_STYLES = {
  traditional: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
    minWidth: '0'
  },
  horizontal: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
    minWidth: '180px',
    maxWidth: '180px',
    flexShrink: 0
  }
} as const;

// ========== PHOTO HANDLING COMPONENT ==========
export interface PhotoHandlerProps {
  selectedPhotos: SelectedPhoto[];
  selectedPhotoIndices: Set<number>;
  isSavingAlbum: boolean;
  onRemovePhoto: (index: number) => void;
  onTogglePhotoSelection: (index: number) => void;
  onSelectAllPhotos: () => void;
  onDeselectAllPhotos: () => void;
  hideHeader?: boolean;
  photoTagsMap: Map<number, AppliedTag[]>;
  columns?: string;
  isMultipleAlbumMode?: boolean;
}

export const PhotoHandler: React.FC<PhotoHandlerProps> = React.memo(({ 
  selectedPhotos, 
  selectedPhotoIndices,
  isSavingAlbum, 
  onRemovePhoto,
  onTogglePhotoSelection,
  photoTagsMap,
  columns = "1",
  isMultipleAlbumMode = false
}) => {
  const { t } = useTranslation();

  // FIXED: Corrected grid layout calculation with proper column updates
  const gridLayout = useMemo(() => {
    // For multiple album mode, we only want horizontal layout if explicitly set to "horizontal"
    // Otherwise, always use grid layout with specified columns
    if (isMultipleAlbumMode && columns === "horizontal") {
      return PHOTO_GRID_STYLES.horizontal;
    }
    
    // Parse the column number and create grid layout
    const numColumns = parseInt(columns, 10);
    const validColumns = isNaN(numColumns) || numColumns < 1 ? 1 : Math.min(numColumns, 5);
    
    return {
      ...PHOTO_GRID_STYLES.traditional,
      display: 'grid',
      gridTemplateColumns: `repeat(${validColumns}, 1fr)`,
      gap: '16px'
    };
  }, [isMultipleAlbumMode, columns]);

  // FIXED: Memoized container style calculation  
  const containerStyle = useMemo(() => {
    return isMultipleAlbumMode && columns === "horizontal" 
      ? PHOTO_CONTAINER_STYLES.horizontal 
      : PHOTO_CONTAINER_STYLES.traditional;
  }, [isMultipleAlbumMode, columns]);

  // FIXED: Memoized photo card styles
  const getPhotoCardClassName = useMemo(() => {
    return isMultipleAlbumMode && columns === "horizontal" 
      ? 'photo-card-horizontal' 
      : 'photo-card-traditional';
  }, [isMultipleAlbumMode, columns]);

  if (selectedPhotos.length === 0) {
    return null;
  }

  return (
    <>
      <div style={gridLayout} className="photo-grid">
        {selectedPhotos.map((photo, i) => {
          const isSelected = selectedPhotoIndices.has(i);
          const appliedTags = photoTagsMap.get(i) || [];
          
          return (
            <div key={i} style={containerStyle}>
              <PhotoCard 
                data-selected={isSelected ? "true" : "false"}
                className={`${getPhotoCardClassName} ${isSelected ? 'selected' : ''}`}
                onClick={() => onTogglePhotoSelection(i)}
              >
                {/* Delete Button */}
                {isSelected && !isSavingAlbum && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(t('Are you sure you want to remove this photo?'))) {
                        onRemovePhoto(i);
                      }
                    }}
                    className="photo-delete-button"
                    title={t('Remove photo')}
                  >
                    ×
                  </button>
                )}

                {/* Status indicator */}
                {photo.status !== 'complete' && (
                  <StatusIndicator $status={photo.status}>
                    {photo.status === 'error' ? '✕' :
                     photo.status === 'uploading' ? '↑' :
                     photo.status === 'processing' ? '⚙️' : '•'}
                  </StatusIndicator>
                )}

                {/* Media preview */}
                <MediaPreview className={`media-preview ${isSelected ? 'selected' : ''}`}>
                  {photo.type === "video" || photo.type?.startsWith("video") ? (
                    <VideoItem 
                      src={photo.s3PreviewUrl} 
                      controls 
                      className="media-item"
                    />
                  ) : (
                    <MediaItem 
                      src={photo.s3PreviewUrl} 
                      alt={photo.fileName}
                      className="media-item"
                    />
                  )}
                  
                  {/* Upload progress bar */}
                  {(photo.status === 'uploading' || photo.status === 'processing') && (
                    <ProgressBarBg $bottom="4px" $left="4px" $right="4px" $height="4px">
                      <UploadProgressBar $progress={photo.progress} $status={photo.status} />
                    </ProgressBarBg>
                  )}
                </MediaPreview>
                
                {/* File info */}
                <div className="file-info-overlay">
                  {photo.type?.startsWith("video") ? t('Video') : t('Image')}
                  {photo.size && ` • ${(photo.size / 1024 / 1024).toFixed(1)} ${t('MB')}`}
                  {photo.duration && ` • ${photo.duration}${t('s')}`}
                </div>

                {/* Selection indicator for horizontal layout */}
                {isMultipleAlbumMode && columns === "horizontal" && isSelected && (
                  <div className="selection-indicator">
                    {t('SELECTED')}
                  </div>
                )}

                {/* Error message */}
                {photo.status === 'error' && photo.errorMessage && (
                  <Message $type="error">
                    {t('Error')}: {photo.errorMessage.length > 40 ? photo.errorMessage.substring(0, 37) + "..." : photo.errorMessage}
                  </Message>
                )}
              </PhotoCard>
              
              {/* Filename and tags display */}
              <div className={`photo-info ${isMultipleAlbumMode && columns === "horizontal" ? 'horizontal' : 'traditional'}`}>
                <PhotoTagging 
                  photoTags={appliedTags}
                  isSelected={isSelected}
                  onToggleSelection={() => onTogglePhotoSelection(i)}
                  fileName={photo.originalFileName || photo.fileName}
                  showFileName={true}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
});

PhotoHandler.displayName = 'PhotoHandler';

// ========== SAVING PROGRESS COMPONENT ==========
export interface SavingProgressComponentProps {
  isSavingAlbum: boolean;
  savingProgress: number;
}

export const SavingProgressComponent: React.FC<SavingProgressComponentProps> = React.memo(({ 
  isSavingAlbum, 
  savingProgress 
}) => {
  const { t } = useTranslation();

  if (!isSavingAlbum) {
    return null;
  }

  return (
    <Card>
      <ProgressTitle>{t('Saving Album')}</ProgressTitle>
      <ProgressText id="saveProgressText">{t('Moving files...')}</ProgressText>
      <ProgressBarBg>
        <ProgressBar id="saveProgress" $progress={savingProgress/100} />
      </ProgressBarBg>
    </Card>
  );
});

SavingProgressComponent.displayName = 'SavingProgressComponent';

// ========== SIMPLIFIED FOLDER DETAILS COMPONENT ==========
export interface FolderDetailsComponentProps {
  showFolderDetails: boolean;
  isCreator: boolean | null;
  folderName: string;
  setFolderName: React.Dispatch<React.SetStateAction<string>>;
  folderDescription: string;
  setFolderDescription: React.Dispatch<React.SetStateAction<string>>;
  isSavingAlbum: boolean;
}

export const FolderDetailsComponent: React.FC<FolderDetailsComponentProps> = React.memo(({
  showFolderDetails,
  isCreator,
  folderName,
  setFolderName,
  folderDescription,
  setFolderDescription,
  isSavingAlbum
}) => {
  const { t } = useTranslation();

  if (!showFolderDetails || isCreator !== true) {
    return null;
  }

  return (
    <FolderDetails>
      <FormGroup>
        <FormLabel htmlFor="folderName">
          {t('Album Name')}
        </FormLabel>
        <FormInput
          id="folderName"
          type="text"
          value={folderName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFolderName(e.target.value)}
          placeholder={t('e.g. Family Vacation in Kyoto')}
          disabled={isSavingAlbum}
        />
      </FormGroup>
      
      <FormGroup>
        <FormLabel htmlFor="folderDescription">
          {t('Album Description')}
        </FormLabel>
        <FormTextarea
          id="folderDescription"
          value={folderDescription}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFolderDescription(e.target.value)}
          placeholder={t("e.g. what's special about this album")}
          rows={4}
          disabled={isSavingAlbum}
        />
      </FormGroup>
    </FolderDetails>
  );
});

FolderDetailsComponent.displayName = 'FolderDetailsComponent';

// FIXED: CSS styles to replace inline JavaScript objects - improves performance
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    .photo-grid {
      position: relative;
      /* FIXED: Added transition for smooth column changes */
      transition: grid-template-columns 0.3s ease;
    }

    .photo-card-traditional {
      position: relative;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .photo-card-horizontal {
      position: relative;
      cursor: pointer;
      transition: all 0.3s ease;
      width: 180px;
      height: 180px;
    }

    .photo-card-horizontal.selected {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 123, 255, 0.3), 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .photo-delete-button {
      position: absolute;
      top: 6px;
      right: 6px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: none;
      background-color: rgba(220, 53, 69, 0.9);
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: bold;
      z-index: 15;
      opacity: 1;
      transition: all 0.2s ease;
      transform: scale(0.9);
      box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
    }

    .photo-delete-button:hover {
      background-color: rgba(200, 35, 51, 0.95);
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(220, 53, 69, 0.4);
    }

    .media-preview {
      transition: opacity 0.2s ease;
    }

    .media-preview.selected {
      opacity: 0.85;
    }

    .media-item {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .photo-card-horizontal .media-item {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .file-info-overlay {
      position: absolute;
      bottom: 32px;
      left: 8px;
      right: 8px;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 11px;
      text-align: center;
      backdrop-filter: blur(4px);
    }

    .selection-indicator {
      position: absolute;
      bottom: 4px;
      left: 4px;
      right: 4px;
      background: rgba(0, 123, 255, 0.9);
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 10px;
      font-weight: bold;
      text-align: center;
      backdrop-filter: blur(4px);
      box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);
    }

    .photo-info {
      min-height: 60px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .photo-info.horizontal {
      width: 180px;
    }

    /* Enhanced scrollbar styling for horizontal layout */
    .photo-grid::-webkit-scrollbar {
      height: 10px;
    }

    .photo-grid::-webkit-scrollbar-track {
      background: #f8f9fa;
      border-radius: 6px;
      margin: 0 8px;
    }

    .photo-grid::-webkit-scrollbar-thumb {
      background: linear-gradient(90deg, #007bff, #0056b3);
      border-radius: 6px;
      border: 2px solid #f8f9fa;
    }

    .photo-grid::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(90deg, #0056b3, #004085);
    }

    /* Enhanced selection animations for horizontal layout */
    .photo-card-horizontal.selected {
      animation: selectedPulse 2s infinite;
    }

    @keyframes selectedPulse {
      0%, 100% { 
        box-shadow: 0 8px 24px rgba(0, 123, 255, 0.3), 0 4px 12px rgba(0, 0, 0, 0.1); 
      }
      50% { 
        box-shadow: 0 12px 32px rgba(0, 123, 255, 0.4), 0 6px 16px rgba(0, 0, 0, 0.15); 
      }
    }

    /* Show delete button on hover for selected cards */
    .photo-card-traditional[data-selected="true"]:hover .photo-delete-button,
    .photo-card-horizontal[data-selected="true"]:hover .photo-delete-button {
      opacity: 1;
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(220, 53, 69, 0.4);
    }

    /* FIXED: Add smooth transitions for responsive grid changes */
    .photo-grid[style*="display: grid"] {
      transition: all 0.3s ease;
    }

    .photo-grid[style*="display: grid"] > div {
      transition: all 0.3s ease;
    }
  `;
  
  // Only append if not already added
  if (!document.head.querySelector('#photo-handler-styles')) {
    styleSheet.id = 'photo-handler-styles';
    document.head.appendChild(styleSheet);
  }
}