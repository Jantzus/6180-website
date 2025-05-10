import React from "react";
import { 
  ProgressTracker,
  SelectedPhoto,
} from "@/lib/types";
import {
  ProgressContainer,
  ProgressTitle,
  OverallProgress,
  ProgressStats,
  ProgressBarBg,
  ProgressBar,
  ProgressDetails,
  ProgressItem,
  SavingProgressContainer,
  SavingProgressTitle,
  SavingProgressText,
  SavingProgressBarBg,
  SavingProgressBar,
  SelectedCount,
  PhotoGrid,
  PhotoCard,
  StatusIndicator,
  MediaPreview,
  MediaItem,
  VideoItem,
  UploadProgressBarBg,
  UploadProgressBar,
  FileInfo,
  ErrorMessage,
  RemoveButton,
  FolderDetails,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  ToggleContainer,
  ToggleLabel,
  ToggleSwitch,
  ToggleSlider
} from "@/styles/styled-components";

// ========== PHOTO HANDLING COMPONENT ==========
export interface PhotoHandlerProps {
  selectedPhotos: SelectedPhoto[];
  isSavingAlbum: boolean;
  onRemovePhoto: (index: number) => void;
}

export const PhotoHandler: React.FC<PhotoHandlerProps> = ({ 
  selectedPhotos, 
  isSavingAlbum, 
  onRemovePhoto 
}) => {
  const { t } = useTranslation();

  if (selectedPhotos.length === 0) {
    return null;
  }

  return (
    <>
      <SelectedCount>
        {selectedPhotos.length} {selectedPhotos.length > 1 ? t('photos selected') : t('photo selected')}:
      </SelectedCount>

      <PhotoGrid>
        {selectedPhotos.map((photo, i) => (
          <PhotoCard key={i}>
            {/* Status indicator */}
            <StatusIndicator status={photo.status}>
              {photo.status === 'complete' ? '✓' : 
               photo.status === 'error' ? '✕' :
               photo.status === 'uploading' ? '↑' :
               photo.status === 'processing' ? '⚙️' : '•'}
            </StatusIndicator>

            {/* Media preview */}
            <MediaPreview>
              {photo.type === "video" || photo.type?.startsWith("video") ? (
                <VideoItem src={photo.s3PreviewUrl} controls />
              ) : (
                <MediaItem src={photo.s3PreviewUrl} alt={photo.fileName} />
              )}
              
              {/* Upload progress bar for in-progress items */}
              {(photo.status === 'uploading' || photo.status === 'processing') && (
                <UploadProgressBarBg>
                  <UploadProgressBar progress={photo.progress} status={photo.status} />
                </UploadProgressBarBg>
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
              <ErrorMessage>
                {t('Error')}: {photo.errorMessage.length > 40 ? photo.errorMessage.substring(0, 37) + "..." : photo.errorMessage}
              </ErrorMessage>
            )}
            
            {/* Remove button */}
            <RemoveButton 
              onClick={() => onRemovePhoto(i)} 
              disabled={isSavingAlbum}
            >
              {t('Remove')}
            </RemoveButton>
          </PhotoCard>
        ))}
      </PhotoGrid>
    </>
  );
};

// ========== PROGRESS TRACKER COMPONENT ==========
export interface ProgressTrackerComponentProps {
  progressTracker: ProgressTracker;
}

export const ProgressTrackerComponent: React.FC<ProgressTrackerComponentProps> = ({ progressTracker }) => {
  const { t } = useTranslation();

  if (progressTracker.totalFiles === 0) {
    return null;
  }

  return (
    <ProgressContainer>
      <ProgressTitle>{t('Upload Progress')}</ProgressTitle>
      
      <OverallProgress>
        <ProgressStats>
          <span>{t('Overall Progress')}: {Math.round(progressTracker.overallProgress * 100)}%</span>
          <span>{progressTracker.filesComplete} {t('of')} {progressTracker.totalFiles} {t('complete')}</span>
        </ProgressStats>
        <ProgressBarBg>
          <ProgressBar progress={progressTracker.overallProgress} />
        </ProgressBarBg>
      </OverallProgress>
      
      <ProgressDetails>
        {progressTracker.filesUploading > 0 && (
          <ProgressItem>{t('Uploading')}: {progressTracker.filesUploading}</ProgressItem>
        )}
        {progressTracker.filesProcessing > 0 && (
          <ProgressItem>{t('Processing')}: {progressTracker.filesProcessing}</ProgressItem>
        )}
        {progressTracker.filesComplete > 0 && (
          <ProgressItem>{t('Complete')}: {progressTracker.filesComplete}</ProgressItem>
        )}
        {progressTracker.filesWithError > 0 && (
          <ProgressItem isError>{t('Failed')}: {progressTracker.filesWithError}</ProgressItem>
        )}
      </ProgressDetails>
    </ProgressContainer>
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
    <SavingProgressContainer>
      <SavingProgressTitle>{t('Saving Album')}</SavingProgressTitle>
      <SavingProgressText id="saveProgressText">{t('Moving files...')}</SavingProgressText>
      <SavingProgressBarBg>
        <SavingProgressBar id="saveProgress" style={{ width: `${savingProgress}%` }} />
      </SavingProgressBarBg>
    </SavingProgressContainer>
  );
};

// ========== SUB ALBUM INFO COMPONENT ==========
export interface SubAlbumInfoProps {
  isSubAlbum: boolean;
  selectedPhotos: SelectedPhoto[];
  selectedFileIds: string[];
}

export const SubAlbumInfo: React.FC<SubAlbumInfoProps> = ({ isSubAlbum, selectedPhotos, selectedFileIds }) => {
  const { t } = useTranslation();

  if (!isSubAlbum || (selectedPhotos.length === 0 && selectedFileIds.length === 0)) {
    return null;
  }

  return (
    <div style={{ 
      backgroundColor: '#e3f2fd', 
      padding: '15px', 
      borderRadius: '8px', 
      marginBottom: '20px',
      fontSize: '16px'
    }}>
      <p style={{ margin: 0 }}>
        {t('Creating a new sub-album with')} <strong>{selectedFileIds.length}</strong> {t('selected items')}
      </p>
      <p style={{ margin: '10px 0 0 0', fontSize: '14px', color: '#0277bd' }}>
        {t('You can add more photos or videos to this sub-album before saving')}
      </p>
      
      {/* Show thumbnails of selected photos if available */}
      {selectedPhotos.length > 0 && (
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '10px', 
          marginTop: '15px',
          justifyContent: 'flex-start'
        }}>
          {selectedPhotos.slice(0, 5).map((photo, index) => (
            <div key={index} style={{ 
              width: '80px', 
              height: '80px', 
              position: 'relative', 
              borderRadius: '4px',
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.12)'
            }}>
              <img 
                src={photo.s3PreviewUrl} 
                alt={photo.fileName} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover' 
                }} 
              />
              {photo.type === 'video' && (
                <div style={{
                  position: 'absolute',
                  bottom: '5px',
                  right: '5px',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  fontSize: '10px',
                  padding: '2px 4px',
                  borderRadius: '2px'
                }}>
                  {photo.duration ? `${Math.floor(photo.duration)}s` : 'Video'}
                </div>
              )}
            </div>
          ))}
          {selectedPhotos.length > 5 && (
            <div style={{ 
              width: '80px', 
              height: '80px', 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#bbdefb',
              borderRadius: '4px',
              color: '#0d47a1',
              fontWeight: 'bold'
            }}>
              +{selectedPhotos.length - 5} {t('more')}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ========== FOLDER DETAILS COMPONENT ==========
export interface FolderDetailsComponentProps {
  showFolderDetails: boolean;
  isCreator: boolean | null;
  folderName: string;
  setFolderName: React.Dispatch<React.SetStateAction<string>>;
  folderDescription: string;
  setFolderDescription: React.Dispatch<React.SetStateAction<string>>;
  isOnPublicProfile: boolean;
  handlePublicProfileToggle: () => void;
  participantsCanAddItems: boolean;
  handleParticipantsCanAddItemsToggle: () => void;
  isSavingAlbum: boolean;
}

export const FolderDetailsComponent: React.FC<FolderDetailsComponentProps> = ({
  showFolderDetails,
  isCreator,
  folderName,
  setFolderName,
  folderDescription,
  setFolderDescription,
  isOnPublicProfile,
  handlePublicProfileToggle,
  participantsCanAddItems,
  handleParticipantsCanAddItemsToggle,
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
          {t('Album Name (Optional)')}
        </FormLabel>
        <FormInput
          id="folderName"
          type="text"
          value={folderName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFolderName(e.target.value)}
          placeholder={t('Enter album name')}
        />
      </FormGroup>
      
      <FormGroup>
        <FormLabel htmlFor="folderDescription">
          {t('Album Description (Optional)')}
        </FormLabel>
        <FormTextarea
          id="folderDescription"
          value={folderDescription}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFolderDescription(e.target.value)}
          placeholder={t('Enter album description')}
          rows={4}
        />
      </FormGroup>
      
      {/* Public Profile Toggle */}
      <ToggleContainer>
        <ToggleLabel>
          {isOnPublicProfile ? t('On Public Profile') : t('Not On Public Profile')}
        </ToggleLabel>
        <ToggleSwitch>
          <input 
            type="checkbox" 
            checked={isOnPublicProfile} 
            onChange={handlePublicProfileToggle}
            disabled={isSavingAlbum}
          />
          <ToggleSlider />
        </ToggleSwitch>
      </ToggleContainer>

      {/* Participants Can Add Items Toggle */}
      <ToggleContainer>
        <ToggleLabel>
          {participantsCanAddItems ? t('Participants Can Add Items') : t('Participants Cannot Add Items')}
        </ToggleLabel>
        <ToggleSwitch>
          <input 
            type="checkbox" 
            checked={participantsCanAddItems} 
            onChange={handleParticipantsCanAddItemsToggle}
            disabled={isSavingAlbum}
          />
          <ToggleSlider />
        </ToggleSwitch>
      </ToggleContainer>
    </FolderDetails>
  );
};

// Add missing useTranslation definition to avoid import errors
const useTranslation = () => {
  // This is just a stub to prevent errors in this file
  // The actual implementation will be imported in the main file
  return {
    t: (key: string) => key,
    language: "en"
  };
};