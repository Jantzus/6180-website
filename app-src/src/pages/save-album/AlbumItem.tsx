// AlbumItem.tsx - Updated to include gear menu for individual album settings
import React, { useState, useRef, useEffect } from 'react';
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
  align-items: center;

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

const GearButton = styled.button`
  padding: 8px;
  border: 1px solid #6c757d;
  border-radius: 6px;
  background: transparent;
  color: #6c757d;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  position: relative;

  &:hover {
    background: #6c757d;
    color: white;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const GearDropdown = styled.div<{ $isRTL: boolean }>`
  position: absolute;
  top: 100%;
  ${props => props.$isRTL ? 'left: 0;' : 'right: 0;'}
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 280px;
  padding: 16px;
  margin-top: 4px;
`;

const DropdownSection = styled.div`
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DropdownLabel = styled.h4`
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  padding: 4px 0;
`;

const ToggleLabel = styled.div`
  font-size: 13px;
  color: #333;
  line-height: 1.4;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
    
    &:checked + span {
      background-color: #007bff;
    }
    
    &:checked + span:before {
      transform: translateX(16px);
    }
    
    &:disabled + span {
      background-color: #e6e6e6;
      cursor: not-allowed;
    }
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .2s;
  border-radius: 24px;
  
  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 2px;
    top: 2px;
    background-color: white;
    transition: .2s;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`;

const PasswordButton = styled.button<{ $hasPassword: boolean }>`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid ${props => props.$hasPassword ? '#28a745' : '#dee2e6'};
  border-radius: 6px;
  background: ${props => props.$hasPassword ? '#28a745' : '#f8f9fa'};
  color: ${props => props.$hasPassword ? 'white' : '#6c757d'};
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &:hover {
    background: ${props => props.$hasPassword ? '#218838' : '#e9ecef'};
    border-color: ${props => props.$hasPassword ? '#218838' : '#adb5bd'};
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
  onShowPasswordDialog: (albumId: string) => void;
  disabled: boolean;
  columns: string;
  setColumns: (columns: string) => void;
  enhancedLog: (message: string, data?: any) => void;
}

export const AlbumItem: React.FC<AlbumItemProps> = ({
  album,
  onUpdate,
  onSave,
  onRemove,
  onShowPasswordDialog,
  disabled,
  columns,
  enhancedLog
}) => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";
  const [showGearDropdown, setShowGearDropdown] = useState(false);
  const gearRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (gearRef.current && !gearRef.current.contains(event.target as Node)) {
        setShowGearDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Tags management
  const tagsManager = useTagsManagement(
    album.photoTagsMap,
    (newPhotoTagsMap) => {
      const resolvedMap = typeof newPhotoTagsMap === 'function' 
        ? newPhotoTagsMap(album.photoTagsMap)
        : newPhotoTagsMap;
      onUpdate({ photoTagsMap: resolvedMap });
    },
    new Map(),
    () => {},
    album.selectedPhotoIndices,
    new Set(),
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
    
    album.selectedPhotoIndices.forEach(index => {
      if (index < photoIndex) {
        newSelectedIndices.add(index);
      } else if (index > photoIndex) {
        newSelectedIndices.add(index - 1);
      }
    });

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

  // Settings handlers
  const handleTogglePublicProfile = () => {
    onUpdate({ isOnPublicProfile: !album.isOnPublicProfile });
  };

  const handleToggleParticipantsCanAdd = () => {
    onUpdate({ participantsCanAddItems: !album.participantsCanAddItems });
  };

  const handleToggleParticipantsCanDelete = () => {
    onUpdate({ participantsCanDeleteItems: !album.participantsCanDeleteItems });
  };

  const handlePasswordClick = () => {
    onShowPasswordDialog(album.id);
  };

  const hasPassword = album.passwordProtectionOption !== 'NoPassword' && album.albumPassword;

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
              <div ref={gearRef} style={{ position: 'relative' }}>
                <GearButton
                  onClick={() => setShowGearDropdown(!showGearDropdown)}
                  disabled={disabled}
                  title={t('Album Settings')}
                >
                  ⚙️
                </GearButton>
                {showGearDropdown && (
                  <GearDropdown $isRTL={isRTL}>
                    <DropdownSection>
                      <DropdownLabel>{t('Visibility')}</DropdownLabel>
                      <ToggleContainer>
                        <ToggleLabel>{t('Public Profile')}</ToggleLabel>
                        <ToggleSwitch>
                          <input
                            type="checkbox"
                            checked={album.isOnPublicProfile}
                            onChange={handleTogglePublicProfile}
                            disabled={album.isSaving}
                          />
                          <ToggleSlider />
                        </ToggleSwitch>
                      </ToggleContainer>
                    </DropdownSection>

                    <DropdownSection>
                      <DropdownLabel>{t('Participant Permissions')}</DropdownLabel>
                      <ToggleContainer>
                        <ToggleLabel>{t('Can Add Items')}</ToggleLabel>
                        <ToggleSwitch>
                          <input
                            type="checkbox"
                            checked={album.participantsCanAddItems}
                            onChange={handleToggleParticipantsCanAdd}
                            disabled={album.isSaving}
                          />
                          <ToggleSlider />
                        </ToggleSwitch>
                      </ToggleContainer>
                      <ToggleContainer>
                        <ToggleLabel>{t('Can Delete Items')}</ToggleLabel>
                        <ToggleSwitch>
                          <input
                            type="checkbox"
                            checked={album.participantsCanDeleteItems}
                            onChange={handleToggleParticipantsCanDelete}
                            disabled={album.isSaving}
                          />
                          <ToggleSlider />
                        </ToggleSwitch>
                      </ToggleContainer>
                    </DropdownSection>

                    <DropdownSection>
                      <DropdownLabel>{t('Security')}</DropdownLabel>
                      <PasswordButton
                        $hasPassword={!!hasPassword}
                        onClick={handlePasswordClick}
                        disabled={album.isSaving}
                      >
                        {hasPassword ? '🔒' : '🔓'}
                        {hasPassword ? t('Password Set') : t('Set Password')}
                      </PasswordButton>
                    </DropdownSection>
                  </GearDropdown>
                )}
              </div>
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

      {/* Album details form */}
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

      {/* Photos grid */}
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
        columns={columns}
        isMultipleAlbumMode={true}
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