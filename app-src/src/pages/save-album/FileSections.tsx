// FileSections.tsx - Components for managing existing files and new photos
import React from 'react';
import { LazyImage } from "@/components/LazyImage";
import { PhotoHandler } from "./components";
import { ExistingFile, AppliedTag } from "./types/album-types";

// Props interfaces
interface ExistingFilesSectionProps {
  existingFiles: ExistingFile[];
  selectedExistingIndices: Set<number>;
  onToggleSelection: (index: number) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onDeleteFile: (index: number) => void;
  disabled: boolean;
  isCreator: boolean | null;
  participantsCanDeleteItems: boolean;
  existingFileTagsMap: Map<number, AppliedTag[]>;
  t: (key: string) => string;
  isRTL: boolean;
}

interface NewPhotosSectionProps {
  selectedPhotos: any[];
  selectedPhotoIndices: Set<number>;
  onToggleSelection: (index: number) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onRemovePhoto: (index: number) => void;
  onDeleteAll: () => void;
  disabled: boolean;
  photoTagsMap: Map<number, AppliedTag[]>;
  columns: string;
  setColumns: (columns: string) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

// Existing files section component
export const ExistingFilesSection: React.FC<ExistingFilesSectionProps> = ({ 
  existingFiles, 
  selectedExistingIndices, 
  onToggleSelection, 
  onSelectAll, 
  onDeselectAll, 
  onDeleteFile, 
  disabled, 
  isCreator,
  participantsCanDeleteItems,
  existingFileTagsMap,
  t, 
  isRTL 
}) => {
  // Add CSS for pulse animation if not already present
  React.useEffect(() => {
    const styleId = 'existing-files-animations';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes subtlePulse {
          0%, 100% { 
            opacity: 1;
            transform: scale(1);
            box-shadow: 0 2px 8px rgba(0, 123, 255, 0.2);
          }
          50% { 
            opacity: 0.95;
            transform: scale(1.01);
            box-shadow: 0 3px 12px rgba(0, 123, 255, 0.3);
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  if (existingFiles.length === 0) return null;

  return (
    <div style={{ 
      marginBottom: '32px',
      direction: isRTL ? 'rtl' : 'ltr'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        flexDirection: isRTL ? 'row-reverse' : 'row'
      }}>
        <div>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#333',
            margin: 0
          }}>
            {t('Existing Files ({count})').replace('{count}', existingFiles.length.toString())}
          </h3>
        </div>
        
        <div style={{
          display: 'flex',
          gap: '8px',
          flexDirection: isRTL ? 'row-reverse' : 'row'
        }}>
          <button
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: disabled ? '#f8f9fa' : '#fff',
              color: disabled ? '#999' : '#333',
              cursor: disabled ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease'
            }}
            onClick={selectedExistingIndices.size > 0 ? onDeselectAll : onSelectAll}
            disabled={disabled}
          >
            {selectedExistingIndices.size > 0 ? t('Done Tagging Selected') : t('Select All')}
          </button>
        </div>
      </div>

      <div className="existing-files-grid">
        {existingFiles.map((file, index) => {
          const isSelected = selectedExistingIndices.has(index);
          const appliedTags = existingFileTagsMap.get(index) || [];

          return (
            <div key={`existing-${index}-${file.dataKey}`} className="existing-file-item">
              <div
                className={`existing-file-card ${isSelected ? 'selected' : ''}`}
                onClick={() => !disabled && onToggleSelection(index)}
              >
                <LazyImage
                  thumbnailDataKey={file.thumbnailDataKey}
                  dataKey={file.dataKey}
                  alt={t('Existing file')}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                
                {isSelected && !disabled && (isCreator === true || participantsCanDeleteItems) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(t('Are you sure you want to remove this file?'))) {
                        onDeleteFile(index);
                      }
                    }}
                    className="delete-button"
                    title={t('Remove file')}
                  >
                    ×
                  </button>
                )}

                {file.dataInBytes > 0 && (
                  <div className="file-size">
                    {t('{size} MB').replace('{size}', (file.dataInBytes / (1024 * 1024)).toFixed(1))}
                  </div>
                )}

                {file.durationInSeconds && (
                  <div className="file-duration">
                    {t('{minutes}:{seconds}').replace('{minutes}', Math.floor(file.durationInSeconds / 60).toString()).replace('{seconds}', String(Math.floor(file.durationInSeconds % 60)).padStart(2, '0'))}
                  </div>
                )}
              </div>
              
              <div className="file-info">
                {file.fileName && (
                  <div className={`file-name ${isSelected ? 'selected' : ''}`}>
                    {file.fileName}
                  </div>
                )}
                
                <div className="file-tags">
                  {appliedTags.length > 0 ? (
                    <div className="tags-display">
                      <div className="tags-content">
                        <span className="tag-icon">🏷️</span>
                        <span className="tags-text">
                          {appliedTags.map(tag => {
                            if (tag.subtags.length > 0) {
                              const subtagNames = tag.subtags.map(s => s.subtagTitle).join(', ');
                              return t('{tagTitle}: {subtags}').replace('{tagTitle}', tag.tagTitle).replace('{subtags}', subtagNames);
                            }
                            return tag.tagTitle;
                          }).join(' • ')}
                        </span>
                      </div>
                    </div>
                  ) : isSelected ? (
                    <div style={{
                      background: 'white',
                      border: '1px solid #007bff',
                      color: '#007bff',
                      fontWeight: '600',
                      fontSize: '11px',
                      fontStyle: 'normal',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      boxShadow: '0 2px 8px rgba(0, 123, 255, 0.2)',
                      animation: 'subtlePulse 2.5s infinite'
                    }}>
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                        <span>👇</span> {t('Scroll down to select tags')}
                      </span>
                    </div>
                  ) : null
                  }
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// New photos section component
export const NewPhotosSection: React.FC<NewPhotosSectionProps> = ({ 
  selectedPhotos,
  selectedPhotoIndices, 
  onToggleSelection, 
  onSelectAll, 
  onDeselectAll, 
  onRemovePhoto,
  onDeleteAll,
  disabled,
  photoTagsMap,
  columns,
  setColumns,
  t, 
  isRTL 
}) => {
  if (selectedPhotos.length === 0) return null;

  return (
    <div style={{ 
      marginBottom: '32px',
      direction: isRTL ? 'rtl' : 'ltr'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '16px',
        flexDirection: isRTL ? 'row-reverse' : 'row'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#333',
          margin: 0
        }}>
          {t('New Files ({count})').replace('{count}', selectedPhotos.length.toString())}
        </h3>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: isRTL ? 'flex-start' : 'flex-end',
          gap: '8px'
        }}>
          <div style={{
            display: 'flex',
            gap: '8px',
            flexDirection: isRTL ? 'row-reverse' : 'row'
          }}>
            <button
              className="control-button"
              onClick={selectedPhotoIndices.size > 0 ? onDeselectAll : onSelectAll}
              disabled={disabled}
            >
              {selectedPhotoIndices.size > 0 ? t('Done Tagging Selected') : t('Select All')}
            </button>
            
            {selectedPhotoIndices.size === 0 && (
              <button
                className="control-button danger"
                onClick={onDeleteAll}
                disabled={disabled}
              >
                {t('Delete All')}
              </button>
            )}
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px',
            flexDirection: isRTL ? 'row-reverse' : 'row'
          }}>
            <label className="columns-label">{t('Columns:')}</label>
            <select
              value={columns}
              onChange={(e) => setColumns(e.target.value)}
              className="columns-select"
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

      <PhotoHandler 
        selectedPhotos={selectedPhotos}
        selectedPhotoIndices={selectedPhotoIndices}
        isSavingAlbum={disabled}
        onRemovePhoto={onRemovePhoto}
        onTogglePhotoSelection={onToggleSelection}
        onSelectAllPhotos={onSelectAll}
        onDeselectAllPhotos={onDeselectAll}
        hideHeader={true}
        photoTagsMap={photoTagsMap}
        columns={columns}
      />
    </div>
  );
};