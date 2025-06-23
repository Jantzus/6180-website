import React, { useState, useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { FolderType, MediaItem } from "@/lib/types";
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n";
import { S3_BUCKET_URL } from "@/lib/config";
import { downloadPhotos } from "@/lib/fileOperations";
import { MediaTagsFilter } from "../MediaTagsFilter";
import { LazyImage } from "../LazyImage";

// Styled components for the modal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  padding: 20px;
  overflow: hidden;
  overscroll-behavior: contain;
`;

const ModalContent = styled.div<{ $isRTL: boolean }>`
  background: white;
  border-radius: 16px;
  padding: 0;
  max-width: 90vw;
  max-height: 90vh;
  width: 1200px;
  height: 800px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  direction: ${props => props.$isRTL ? 'rtl' : 'ltr'};
  animation: modalFadeIn 0.3s ease-out;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
  @media (max-width: 768px) {
    width: 95vw;
    height: 95vh;
    max-width: none;
    max-height: none;
  }
  
  @keyframes modalFadeIn {
    from {
      opacity: 0;
      transform: scale(0.9) translateY(-20px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`;

const ModalHeader = styled.div<{ $isRTL: boolean }>`
  padding: 24px 32px 16px 32px;
  border-bottom: 1px solid #e9ecef;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: ${props => props.$isRTL ? 'row-reverse' : 'row'};
  
  @media (max-width: 768px) {
    padding: 20px 20px 12px 20px;
  }
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #333;
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f5f5f5;
    color: #333;
  }
`;

const ModalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 16px 32px;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  
  @media (max-width: 768px) {
    padding: 12px 20px;
  }
`;

const ModalFooter = styled.div<{ $isRTL: boolean }>`
  padding: 16px 32px 24px 32px;
  border-top: 1px solid #e9ecef;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: ${props => props.$isRTL ? 'row-reverse' : 'row'};
  
  @media (max-width: 768px) {
    padding: 12px 20px 20px 20px;
    flex-direction: column;
    gap: 12px;
  }
`;

const SelectionInfo = styled.div<{ $isRTL: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-direction: ${props => props.$isRTL ? 'row-reverse' : 'row'};
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const SelectionCount = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

const SelectionActions = styled.div`
  display: flex;
  gap: 12px;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ActionButton = styled.button<{ $primary?: boolean }>`
  padding: 10px 20px;
  border: ${props => props.$primary ? 'none' : '1px solid #ccc'};
  border-radius: 8px;
  background: ${props => props.$primary ? '#007bff' : 'transparent'};
  color: ${props => props.$primary ? 'white' : '#666'};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  
  &:hover {
    background: ${props => props.$primary ? '#0056b3' : '#f5f5f5'};
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
  
  @media (max-width: 768px) {
    flex: 1;
    padding: 12px 16px;
  }
`;

const DownloadButton = styled(ActionButton)`
  background: #28a745;
  border: none;
  color: white;
  
  &:hover:not(:disabled) {
    background: #1e7e34;
  }
`;

const FilterSection = styled.div<{ $isRTL: boolean }>`
  margin-bottom: 16px;
  direction: ${props => props.$isRTL ? 'rtl' : 'ltr'};
`;

const ControlRow = styled.div<{ $isRTL: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
  flex-direction: ${props => props.$isRTL ? 'row-reverse' : 'row'};
  flex-wrap: wrap;
`;

const ControlLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
`;

const ColumnsSelector = styled.select`
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  background: white;
  cursor: pointer;
`;

const FilterLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
`;

const MediaGrid = styled.div<{ $columns: string }>`
  display: grid;
  grid-template-columns: repeat(${props => props.$columns}, 1fr);
  gap: 16px;
  margin-top: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(${props => Math.min(parseInt(props.$columns), 3)}, 1fr);
    gap: 12px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(${props => Math.min(parseInt(props.$columns), 2)}, 1fr);
    gap: 8px;
  }
`;

const MediaItemContainer = styled.div<{ $isSelected: boolean }>`
  position: relative;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 3px solid ${props => props.$isSelected ? '#007bff' : 'transparent'};
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const SelectionOverlay = styled.div<{ $isSelected: boolean }>`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${props => props.$isSelected ? '#007bff' : 'rgba(255, 255, 255, 0.8)'};
  border: 2px solid ${props => props.$isSelected ? '#007bff' : '#ccc'};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  
  &::after {
    content: '✓';
    color: white;
    font-size: 12px;
    font-weight: bold;
    opacity: ${props => props.$isSelected ? 1 : 0};
  }
`;

const VideoDurationOverlay = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 16px;
  grid-column: 1 / -1;
`;

// Helper function to format duration
const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Props interface
interface DownloadModalProps {
  isOpen: boolean;
  folder: FolderType;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  folder,
  onClose
}) => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";
  
  // State for UI controls
  const [columns, setColumns] = useState<string>('3');
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  
  // Convert folder files to MediaItem format
  const mediaItems: MediaItem[] = useMemo(() => {
    return folder.files.map((file) => {
      // More comprehensive video format detection
      const videoFormats = /\.(mp4|mov|avi|wmv|flv|webm|mkv)$/i;
      const fileType: "image" | "video" = videoFormats.test(file.dataKey) ? 'video' : 'image';
      
      return {
        type: fileType,
        fileId: file.dataKey,
        url: `${S3_BUCKET_URL}${file.dataKey}`,
        thumbnailUrl: file.thumbnailDataKey ? `${S3_BUCKET_URL}${file.thumbnailDataKey}` : undefined,
        duration: file.durationInSeconds ? formatDuration(file.durationInSeconds) : undefined,
        loaded: false,
        dataInBytes: file.dataInBytes,
        selectedTags: file.selectedTags,
        fileDisplayName: file.fileDisplayName
      };
    });
  }, [folder.files]);
  
  // State for filtered media items
  const [filteredMediaItems, setFilteredMediaItems] = useState<MediaItem[]>(mediaItems);
  const [isMediaFiltered, setIsMediaFiltered] = useState<boolean>(false);
  
  // Initialize filtered items when mediaItems change
  useEffect(() => {
    setFilteredMediaItems(mediaItems);
    setSelectedItems(new Set()); // Clear selections when media changes
    setIsMediaFiltered(false);
  }, [mediaItems]);
  
  // Check if any media items have tags
  const hasAnyTags = mediaItems.some(item => 
    item.selectedTags && item.selectedTags.length > 0
  );
  
  // Selection handlers
  const toggleItemSelection = (index: number) => {
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
  
  const selectAll = () => {
    setSelectedItems(new Set([...Array(filteredMediaItems.length).keys()]));
  };
  
  const unselectAll = () => {
    setSelectedItems(new Set());
  };
  
  // Download selected items
  const downloadSelected = () => {
    if (selectedItems.size === 0) return;
    
    // Get selected media items
    const selectedMediaItems = Array.from(selectedItems).map(index => filteredMediaItems[index]);
    
    // Create album data for download
    const albumData = {
      mediaItems: selectedMediaItems,
      folderName: folder.folderName || 'Selected Items'
    };
    
    // Dummy openFullscreenView function
    const openFullscreenView = (index: number) => {
      window.open(selectedMediaItems[index].url, '_blank');
    };
    
    // Call download function
    downloadPhotos(albumData, t, openFullscreenView);
    
    // Close modal after initiating download
    onClose();
  };
  
  // Media filter handlers
  const handleMediaFilterChange = (newFilteredItems: MediaItem[]) => {
    setFilteredMediaItems(newFilteredItems);
    setIsMediaFiltered(true);
    // Clear selections when filter changes since item indices change
    setSelectedItems(new Set());
  };
  
  const resetMediaFilter = () => {
    setFilteredMediaItems(mediaItems);
    setIsMediaFiltered(false);
    // Clear selections when filter is reset
    setSelectedItems(new Set());
  };
  
  // Lock/unlock body scroll when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      // Store original overflow value
      const originalOverflow = document.body.style.overflow;
      const originalTouchAction = document.body.style.touchAction;
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      
      // Cleanup function to restore original styles
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
      };
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  const modalContent = (
    <ModalOverlay 
      onClick={onClose}
      onTouchMove={(e) => {
        // Prevent touch scrolling on the overlay itself
        e.preventDefault();
      }}
    >
      <ModalContent 
        $isRTL={isRTL} 
        onClick={(e) => e.stopPropagation()}
        onTouchMove={(e) => {
          // Allow scrolling within the modal content
          e.stopPropagation();
        }}
      >
        <ModalHeader $isRTL={isRTL}>
          <ModalTitle>{t('Select Items to Download')}</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        
        <ModalBody>
          {/* Filter and Controls Section */}
          <FilterSection $isRTL={isRTL}>
            {/* Basic Controls Row */}
            <ControlRow $isRTL={isRTL}>
              <ControlLabel>{t('Columns:')}</ControlLabel>
              <ColumnsSelector
                value={columns}
                onChange={(e) => setColumns(e.target.value)}
              >
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </ColumnsSelector>
              
              <ActionButton onClick={selectAll}>
                {isMediaFiltered 
                  ? t('Select Filtered ({{count}})', { count: filteredMediaItems.length.toString() })
                  : t('Select All')
                }
              </ActionButton>
              
              {selectedItems.size > 0 && (
                <ActionButton onClick={unselectAll}>
                  {t('Unselect All')}
                </ActionButton>
              )}
            </ControlRow>
            
            {/* Tags Filter Section - only show if there are tags */}
            {hasAnyTags && (
              <div>
                <FilterLabel>{t('Filter by tags:')}</FilterLabel>
                <MediaTagsFilter
                  mediaItems={mediaItems}
                  onFilterChange={handleMediaFilterChange}
                  resetFilter={resetMediaFilter}
                />
              </div>
            )}
          </FilterSection>
          
          {/* Media Grid */}
          {filteredMediaItems.length > 0 ? (
            <MediaGrid $columns={columns}>
              {filteredMediaItems.map((item, index) => (
                <MediaItemContainer
                  key={index}
                  $isSelected={selectedItems.has(index)}
                  onClick={() => toggleItemSelection(index)}
                >
                  <LazyImage
                    src={item.thumbnailUrl || item.url}
                    alt={item.fileDisplayName || `Item ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  
                  <SelectionOverlay $isSelected={selectedItems.has(index)} />
                  
                  {item.type === 'video' && item.duration && (
                    <VideoDurationOverlay>
                      {item.duration}
                    </VideoDurationOverlay>
                  )}
                </MediaItemContainer>
              ))}
            </MediaGrid>
          ) : (
            <EmptyState>
              {isMediaFiltered 
                ? t('No items match the current filter')
                : t('No items to download')
              }
            </EmptyState>
          )}
        </ModalBody>
        
        <ModalFooter $isRTL={isRTL}>
          <SelectionInfo $isRTL={isRTL}>
            <SelectionCount>
              {selectedItems.size === 1 
                ? t('{{count}} item selected', { count: selectedItems.size.toString() })
                : t('{{count}} items selected', { count: selectedItems.size.toString() })
              }
            </SelectionCount>
            
            {isMediaFiltered && (
              <span style={{ fontSize: '14px', color: '#666', fontStyle: 'italic' }}>
                {filteredMediaItems.length === 1
                  ? t('({{count}} item shown after filtering)', { count: filteredMediaItems.length.toString() })
                  : t('({{count}} items shown after filtering)', { count: filteredMediaItems.length.toString() })
                }
              </span>
            )}
          </SelectionInfo>
          
          <SelectionActions>
            <ActionButton onClick={onClose}>
              {t('Cancel')}
            </ActionButton>
            
            <DownloadButton 
              onClick={downloadSelected}
              disabled={selectedItems.size === 0}
            >
              {selectedItems.size === 0 
                ? t('Select items to download')
                : selectedItems.size === 1
                ? t('Download {{count}} item', { count: selectedItems.size.toString() })
                : t('Download {{count}} items', { count: selectedItems.size.toString() })
              }
            </DownloadButton>
          </SelectionActions>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
  
  // Use React Portal to render the modal at the document body level
  return ReactDOM.createPortal(modalContent, document.body);
};