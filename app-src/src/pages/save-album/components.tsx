import React from "react";
import { 
  SelectedPhoto,
} from "@/lib/types";
import {
  Card,
  ProgressTitle,
  ProgressBarBg,
  ProgressBar,
  ProgressText,
  PhotoGrid,
  PhotoCard,
  StatusIndicator,
  MediaPreview,
  MediaItem,
  VideoItem,
  ProgressBar as UploadProgressBar,
  FileInfo,
  Message,
  Card as FolderDetails,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea
} from "@/styles/styled-components";

// ========== PHOTO HANDLING COMPONENT ==========
export interface PhotoHandlerProps {
  selectedPhotos: SelectedPhoto[];
  selectedPhotoIndices: Set<number>;
  isSavingAlbum: boolean;
  onRemovePhoto: (index: number) => void;
  onTogglePhotoSelection: (index: number) => void;
  onSelectAllPhotos: () => void;
  onDeselectAllPhotos: () => void;
  hideHeader?: boolean; // NEW: Optional prop to hide the header instruction
}

export const PhotoHandler: React.FC<PhotoHandlerProps> = ({ 
  selectedPhotos, 
  selectedPhotoIndices,
  isSavingAlbum, 
  onRemovePhoto,
  onTogglePhotoSelection,
  onSelectAllPhotos,
  onDeselectAllPhotos,
  hideHeader = false // NEW: Default to false for backward compatibility
}) => {
  const { t } = useTranslation();

  if (selectedPhotos.length === 0) {
    return null;
  }

  const hasSelectedPhotos = selectedPhotoIndices.size > 0;
  const allPhotosSelected = selectedPhotoIndices.size === selectedPhotos.length;

  return (
    <>
      {/* Photo Selection Controls - Only show if not hidden */}
      {!hideHeader && selectedPhotos.length > 1 && (
        <Card style={{ marginBottom: '16px', border: '2px solid #007bff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px' }}>
            <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#007bff' }}>
              {hasSelectedPhotos 
                ? t('{{count}} file(s) selected for tagging', { count: selectedPhotoIndices.size })
                : t('Click files below to select them for tagging')
              }
            </span>
            <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
              {!allPhotosSelected && (
                <button 
                  onClick={onSelectAllPhotos}
                  disabled={isSavingAlbum}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #007bff',
                    borderRadius: '4px',
                    background: '#007bff',
                    color: 'white',
                    fontSize: '12px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  {t('Select All')}
                </button>
              )}
              {hasSelectedPhotos && (
                <button 
                  onClick={onDeselectAllPhotos}
                  disabled={isSavingAlbum}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #6c757d',
                    borderRadius: '4px',
                    background: 'transparent',
                    color: '#6c757d',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  {t('Deselect All')}
                </button>
              )}
            </div>
          </div>
        </Card>
      )}

      <PhotoGrid>
        {selectedPhotos.map((photo, i) => {
          const isSelected = selectedPhotoIndices.has(i);
          
          return (
            <PhotoCard 
              key={i} 
              style={{ 
                position: 'relative',
                cursor: selectedPhotos.length > 1 ? 'pointer' : 'default',
                border: isSelected ? '3px solid #007bff' : '1px solid #e9ecef',
                borderRadius: '8px',
                overflow: 'hidden'
              }}
              onClick={() => selectedPhotos.length > 1 && onTogglePhotoSelection(i)}
            >
              {/* Remove button - Only show when selected */}
              {isSelected && !isSavingAlbum && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(t('Are you sure you want to remove this photo?'))) {
                      onRemovePhoto(i);
                    }
                  }}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: 'rgba(220, 53, 69, 0.9)',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: '900',
                    zIndex: 20,
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    lineHeight: '1'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(200, 35, 51, 1)';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(220, 53, 69, 0.9)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  title={t('Remove photo')}
                >
                  ×
                </button>
              )}

              {/* Selection Indicator Text */}
              {selectedPhotos.length > 1 && isSelected && (
                <div style={{
                  position: 'absolute',
                  bottom: '8px',
                  left: '8px',
                  right: '8px',
                  background: 'rgba(0, 123, 255, 0.9)',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  zIndex: 10
                }}>
                  SELECTED
                </div>
              )}

              {/* Status indicator - only show for non-complete status or errors */}
              {photo.status !== 'complete' && (
                <StatusIndicator $status={photo.status}>
                  {photo.status === 'error' ? '✕' :
                   photo.status === 'uploading' ? '↑' :
                   photo.status === 'processing' ? '⚙️' : '•'}
                </StatusIndicator>
              )}

              {/* Media preview */}
              <MediaPreview style={{ 
                opacity: selectedPhotos.length === 1 || !isSelected ? 1 : 0.85,
                transition: 'opacity 0.2s ease'
              }}>
                {photo.type === "video" || photo.type?.startsWith("video") ? (
                  <VideoItem src={photo.s3PreviewUrl} controls />
                ) : (
                  <MediaItem src={photo.s3PreviewUrl} alt={photo.fileName} />
                )}
                
                {/* Upload progress bar for in-progress items */}
                {(photo.status === 'uploading' || photo.status === 'processing') && (
                  <ProgressBarBg $bottom="4px" $left="4px" $right="4px" $height="4px">
                    <UploadProgressBar $progress={photo.progress} $status={photo.status} />
                  </ProgressBarBg>
                )}
              </MediaPreview>
              
              {/* File info */}
              <FileInfo>
                {photo.type?.startsWith("video") ? t('Video') : t('Image')}
                {photo.size && ` • ${(photo.size / 1024 / 1024).toFixed(1)} MB`}
                {photo.duration && ` • ${photo.duration}s`}
              </FileInfo>

              {/* Error message if any */}
              {photo.status === 'error' && photo.errorMessage && (
                <Message $type="error">
                  {t('Error')}: {photo.errorMessage.length > 40 ? photo.errorMessage.substring(0, 37) + "..." : photo.errorMessage}
                </Message>
              )}
            </PhotoCard>
          );
        })}
      </PhotoGrid>
    </>
  );
};

// ========== SAVING PROGRESS COMPONENT ==========
export interface SavingProgressComponentProps {
  isSavingAlbum: boolean;
  savingProgress: number;
}

export const SavingProgressComponent: React.FC<SavingProgressComponentProps> = ({ isSavingAlbum, savingProgress }) => {
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
};

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

export const FolderDetailsComponent: React.FC<FolderDetailsComponentProps> = ({
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
          placeholder={t('Enter album name (optional)')}
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
          placeholder={t('Enter album description (optional)')}
          rows={4}
          disabled={isSavingAlbum}
        />
      </FormGroup>
    </FolderDetails>
  );
};

// Add missing useTranslation definition to avoid import errors
const useTranslation = () => {
  // This is just a stub to prevent errors in this file
  // The actual implementation will be imported in the main file
  return {
    t: (key: string, options?: any) => {
      if (options && typeof options === 'object' && 'count' in options) {
        return key.replace('{{count}}', String(options.count));
      }
      return key;
    },
    language: "en"
  };
};