// AlbumItem.tsx - Updated to remove individual column selectors since we have global control
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n";
import { PhotoHandler } from "./components";
import { TagsDisplay } from "./TagDisplayComponents";
import { useTagsManagement } from "./useTagsManagement";
import type { AlbumData } from "./MultipleAlbumsManager";

// Styled components for individual album
const AlbumBlock = styled.div`
  background: #fff;
  border: 2px solid #e9ecef;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    border-color: #007bff;
    box-shadow: 0 6px 20px rgba(0, 123, 255, 0.1);
  }
`;

const AlbumHeader = styled.div<{ $isRTL: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  direction: ${props => props.$isRTL ? 'rtl' : 'ltr'};
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const AlbumInfo = styled.div`
  flex: 1;
`;

const AlbumTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AlbumStats = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
`;

const AlbumActions = styled.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    justify-content: stretch;
  }
`;

const ActionButton = styled.button<{ $variant?: 'primary' | 'danger' | 'secondary' }>`
  padding: 8px 16px;
  border: 1px solid ${props => 
    props.$variant === 'primary' ? '#007bff' :
    props.$variant === 'danger' ? '#dc3545' : '#6c757d'
  };
  border-radius: 6px;
  background: ${props => 
    props.$variant === 'primary' ? '#007bff' :
    props.$variant === 'danger' ? '#dc3545' : 'transparent'
  };
  color: ${props => 
    props.$variant === 'primary' || props.$variant === 'danger' ? 'white' : '#6c757d'
  };
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    background: ${props => 
      props.$variant === 'primary' ? '#0056b3' :
      props.$variant === 'danger' ? '#c82333' : '#6c757d'
    };
    color: white;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    flex: 1;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #333;
  font-size: 14px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  &:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  resize: vertical;
  min-height: 80px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  &:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
  }
`;

const TaggingSection = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e9ecef;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: #e9ecef;
  border-radius: 3px;
  overflow: hidden;
  margin-top: 8px;
`;

const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  background: linear-gradient(90deg, #007bff, #28a745);
  width: ${props => props.$progress}%;
  transition: width 0.3s ease;
`;

// UPDATED: Simplified selection controls without column selector
const SelectionControls = styled.div<{ $isRTL: boolean }>`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  direction: ${props => props.$isRTL ? 'rtl' : 'ltr'};
  justify-content: flex-end;
  flex-direction: ${props => props.$isRTL ? 'row-reverse' : 'row'};
`;

const ControlButton = styled.button<{ $variant?: 'danger' }>`
  padding: 6px 12px;
  font-size: 12px;
  border: 1px solid ${props => props.$variant === 'danger' ? '#dc3545' : '#ddd'};
  border-radius: 4px;
  background-color: ${props => props.$variant === 'danger' ? '#dc3545' : '#fff'};
  color: ${props => props.$variant === 'danger' ? 'white' : '#333'};
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover:not(:disabled) {
    background-color: ${props => props.$variant === 'danger' ? '#c82333' : '#f8f9fa'};
    border-color: ${props => props.$variant === 'danger' ? '#c82333' : '#007bff'};
    color: ${props => props.$variant === 'danger' ? 'white' : '#007bff'};
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: #f8f9fa;
    color: #999;
    cursor: not-allowed;
    transform: none;
  }
`;

interface AlbumItemProps {
  album: AlbumData;
  onUpdate: (updates: Partial<AlbumData>) => void;
  onSave: () => void;
  onRemove: () => void;
  disabled: boolean;
  columns: string;
  setColumns: (columns: string) => void; // This is now unused but kept for compatibility
  enhancedLog: (message: string, data?: any) => void;
}

export const AlbumItem: React.FC<AlbumItemProps> = ({
  album,
  onUpdate,
  onSave,
  onRemove,
  disabled,
  columns, // Global columns value passed from parent
  enhancedLog
}) => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";

  // NOW SAFE: Hook is called at the top level of this component
  const tagsManager = useTagsManagement(
    album.photoTagsMap,
    (newPhotoTagsMap) => {
      // Handle both direct map and setter function
      const resolvedMap = typeof newPhotoTagsMap === 'function' 
        ? newPhotoTagsMap(album.photoTagsMap)
        : newPhotoTagsMap;
      onUpdate({ photoTagsMap: resolvedMap });
    },
    new Map(), // No existing files for new albums
    () => {}, // No existing files setter
    album.selectedPhotoIndices,
    new Set(), // No existing files selected
    enhancedLog
  );

  // Handle album name change
  const handleNameChange = (name: string) => {
    onUpdate({ name });
  };

  // Handle album description change
  const handleDescriptionChange = (description: string) => {
    onUpdate({ description });
  };

  // Handle photo selection for tagging
  const handlePhotoSelection = (photoIndex: number) => {
    const newSelectedIndices = new Set(album.selectedPhotoIndices);
    if (newSelectedIndices.has(photoIndex)) {
      newSelectedIndices.delete(photoIndex);
    } else {
      newSelectedIndices.add(photoIndex);
    }

    onUpdate({ selectedPhotoIndices: newSelectedIndices });
  };

  // Handle select all photos
  const handleSelectAllPhotos = () => {
    const allIndices = new Set<number>();
    for (let i = 0; i < album.photos.length; i++) {
      allIndices.add(i);
    }
    onUpdate({ selectedPhotoIndices: allIndices });
  };

  // Handle deselect all photos
  const handleDeselectAllPhotos = () => {
    onUpdate({ selectedPhotoIndices: new Set() });
  };

  // Handle delete all photos
  const handleDeleteAllPhotos = () => {
    if (confirm(t('Are you sure you want to delete all files from this album? This action cannot be undone.'))) {
      onUpdate({ 
        photos: [],
        selectedPhotoIndices: new Set(),
        photoTagsMap: new Map()
      });
    }
  };

  // Handle photo removal
  const handleRemovePhoto = (photoIndex: number) => {
    const newPhotos = album.photos.filter((_, i) => i !== photoIndex);
    const newSelectedIndices = new Set<number>();
    
    // Adjust selected indices
    album.selectedPhotoIndices.forEach(index => {
      if (index < photoIndex) {
        newSelectedIndices.add(index);
      } else if (index > photoIndex) {
        newSelectedIndices.add(index - 1);
      }
    });

    // Adjust photo tags map
    const newPhotoTagsMap = new Map();
    album.photoTagsMap.forEach((tags, index) => {
      if (index < photoIndex) {
        newPhotoTagsMap.set(index, tags);
      } else if (index > photoIndex) {
        newPhotoTagsMap.set(index - 1, tags);
      }
    });

    onUpdate({ 
      photos: newPhotos,
      selectedPhotoIndices: newSelectedIndices,
      photoTagsMap: newPhotoTagsMap
    });
  };

  return (
    <AlbumBlock>
      <AlbumHeader $isRTL={isRTL}>
        <AlbumInfo>
          <AlbumTitle>
            <span>📁</span>
            {album.name}
            {album.isSaving && <span style={{ color: '#007bff' }}>⏳</span>}
            {album.savingProgress === 100 && <span style={{ color: '#28a745' }}>✅</span>}
          </AlbumTitle>
          <AlbumStats>
            {album.photos.length === 1 
              ? t('{{count}} file', { count: album.photos.length.toString() })
              : t('{{count}} files', { count: album.photos.length.toString() })
            }
            {album.selectedPhotoIndices.size > 0 && (
              <span> • {t('{{count}} selected for tagging', { count: album.selectedPhotoIndices.size })}</span>
            )}
          </AlbumStats>
        </AlbumInfo>

        <AlbumActions>
          {!album.isSaving && album.savingProgress < 100 && (
            <>
              <ActionButton 
                $variant="primary"
                onClick={onSave}
                disabled={disabled}
              >
                {t('Save')}
              </ActionButton>
              <ActionButton 
                $variant="danger"
                onClick={onRemove}
                disabled={disabled}
              >
                {t('Remove')}
              </ActionButton>
            </>
          )}
        </AlbumActions>
      </AlbumHeader>

      {/* UPDATED: Album details form - removed column selector since it's now global */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
        <FormGroup>
          <FormLabel>{t('Album Name')}</FormLabel>
          <FormInput
            type="text"
            value={album.name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder={t('e.g. Family Vacation in Kyoto')}
            disabled={album.isSaving || album.savingProgress === 100}
          />
        </FormGroup>

        <div>
          <FormGroup>
            <FormLabel>{t('Album Description')}</FormLabel>
            <FormTextarea
              value={album.description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              placeholder={t("e.g. what's special about this album")}
              disabled={album.isSaving || album.savingProgress === 100}
              rows={3}
            />
          </FormGroup>

          {/* UPDATED: Simplified selection controls without column selector */}
          {album.photos.length > 0 && (
            <SelectionControls $isRTL={isRTL}>
              <ControlButton
                onClick={album.selectedPhotoIndices.size > 0 ? handleDeselectAllPhotos : handleSelectAllPhotos}
                disabled={album.isSaving || album.savingProgress === 100}
              >
                {album.selectedPhotoIndices.size > 0 ? t('Done Tagging Selected') : t('Select All')}
              </ControlButton>
              
              {album.selectedPhotoIndices.size === 0 && (
                <ControlButton
                  $variant="danger"
                  onClick={handleDeleteAllPhotos}
                  disabled={album.isSaving || album.savingProgress === 100}
                >
                  {t('Delete All')}
                </ControlButton>
              )}
            </SelectionControls>
          )}
        </div>
      </div>

      {/* Photos grid - uses global columns value */}
      <PhotoHandler
        selectedPhotos={album.photos}
        selectedPhotoIndices={album.selectedPhotoIndices}
        isSavingAlbum={album.isSaving || album.savingProgress === 100}
        onRemovePhoto={handleRemovePhoto}
        onTogglePhotoSelection={handlePhotoSelection}
        onSelectAllPhotos={handleSelectAllPhotos}
        onDeselectAllPhotos={handleDeselectAllPhotos}
        hideHeader={false}
        photoTagsMap={album.photoTagsMap}
        columns={columns} // Global columns value
        isMultipleAlbumMode={true} // Ensure proper layout for multiple albums
      />

      {/* Tagging section */}
      {album.selectedPhotoIndices.size > 0 && (
        <TaggingSection>
          <TagsDisplay 
            tagsManager={tagsManager}
            disabled={album.isSaving || album.savingProgress === 100}
            enhancedLog={enhancedLog}
          />
        </TaggingSection>
      )}

      {/* Saving progress */}
      {album.isSaving && (
        <div style={{ marginTop: '16px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '8px'
          }}>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
              {t('Saving album...')}
            </span>
            <span style={{ fontSize: '14px', color: '#666' }}>
              {album.savingProgress}%
            </span>
          </div>
          <ProgressBar>
            <ProgressFill $progress={album.savingProgress} />
          </ProgressBar>
        </div>
      )}
    </AlbumBlock>
  );
};