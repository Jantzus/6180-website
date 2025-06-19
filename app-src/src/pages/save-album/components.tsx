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

// ========== PHOTO HANDLING COMPONENT ==========
export interface PhotoHandlerProps {
  selectedPhotos: SelectedPhoto[];
  selectedPhotoIndices: Set<number>;
  isSavingAlbum: boolean;
  onRemovePhoto: (index: number) => void;
  onTogglePhotoSelection: (index: number) => void;
  onSelectAllPhotos: () => void;
  onDeselectAllPhotos: () => void;
  hideHeader?: boolean; // Optional prop to hide the header instruction
  photoTagsMap: Map<number, AppliedTag[]>; // NEW: Photo tags map to show applied tags
}

export const PhotoHandler: React.FC<PhotoHandlerProps> = ({ 
  selectedPhotos, 
  selectedPhotoIndices,
  isSavingAlbum, 
  onRemovePhoto,
  onTogglePhotoSelection,
  onSelectAllPhotos,
  onDeselectAllPhotos,
  hideHeader = false, // Default to false for backward compatibility
  photoTagsMap // NEW: Photo tags map
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
      {!hideHeader && (
        <Card style={{ marginBottom: '16px', border: '2px solid #007bff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px' }}>
            <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#007bff' }}>
              {hasSelectedPhotos 
                ? t('{{count}} file(s) selected for tagging', { count: selectedPhotoIndices.size })
                : t('Select files with blue borders for tagging')
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
          const appliedTags = photoTagsMap.get(i) || []; // Get applied tags for this photo
          
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <PhotoCard 
                data-selected={isSelected ? "true" : "false"}
                style={{ 
                  position: 'relative',
                  cursor: 'pointer'
                }}
                onClick={() => onTogglePhotoSelection(i)}
              >
              {/* Soft Delete Button - Only show when selected and on hover */}
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
                    top: '6px',
                    right: '6px',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: 'rgba(220, 53, 69, 0.8)',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    zIndex: 15,
                    opacity: 1,
                    transition: 'all 0.2s ease',
                    transform: 'scale(0.8)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(200, 35, 51, 0.9)';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(220, 53, 69, 0.8)';
                    e.currentTarget.style.transform = 'scale(0.8)';
                    e.currentTarget.style.opacity = '0';
                  }}
                  title={t('Remove photo')}
                >
                  ×
                </button>
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
              
              {/* File info - Back to normal position */}
              <div style={{
                position: 'absolute',
                bottom: '32px', // Leave space for SELECTED indicator
                left: '8px',
                right: '8px',
                background: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '11px',
                textAlign: 'center',
                backdropFilter: 'blur(4px)'
              }}>
                {photo.type?.startsWith("video") ? t('Video') : t('Image')}
                {photo.size && ` • ${(photo.size / 1024 / 1024).toFixed(1)} ${t('MB')}`}
                {photo.duration && ` • ${photo.duration}${t('s')}`}
              </div>

              {/* Error message if any */}
              {photo.status === 'error' && photo.errorMessage && (
                <Message $type="error">
                  {t('Error')}: {photo.errorMessage.length > 40 ? photo.errorMessage.substring(0, 37) + "..." : photo.errorMessage}
                </Message>
              )}
            </PhotoCard>
            
            {/* NEW: Enhanced filename and tags display - Outside the photo card */}
            <div style={{ minHeight: '60px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <PhotoTagging 
                photoTags={appliedTags}
                isSelected={isSelected}
                onToggleSelection={() => onTogglePhotoSelection(i)}
                fileName={photo.originalFileName || photo.fileName} // NEW: Pass filename
                showFileName={true} // NEW: Enable filename display
              />
            </div>
          </div>
          );
        })}
      </PhotoGrid>

      {/* CSS for hover effect on PhotoCard to show delete button */}
      <style>
        {`
          [data-selected="true"]:hover button {
            opacity: 1 !important;
            transform: scale(1) !important;
          }
        `}
      </style>
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
};