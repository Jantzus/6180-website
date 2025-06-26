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
import { MediaGrid } from "@/styles/components/layout";

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
  padding: 40px 16px;
  overflow: hidden;
  overscroll-behavior: contain;
  
  @media (max-width: 768px) {
    padding: 60px 16px;
  }
`;

const ModalContent = styled.div<{ $isRTL: boolean }>`
  background: white;
  border-radius: 16px;
  padding: 0;
  width: 100%;
  max-width: 1200px;
  max-height: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  direction: ${props => props.$isRTL ? 'rtl' : 'ltr'};
  animation: modalFadeIn 0.3s ease-out;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
  @media (max-width: 768px) {
    border-radius: 12px;
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
  padding: 20px 24px 16px 24px;
  border-bottom: 1px solid #e9ecef;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: ${props => props.$isRTL ? 'row-reverse' : 'row'};
  
  @media (max-width: 768px) {
    padding: 16px 16px 12px 16px;
  }
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const ModalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 12px 24px;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  
  @media (max-width: 768px) {
    padding: 8px 16px;
  }
`;

const ModalFooter = styled.div<{ $isRTL: boolean }>`
  padding: 12px 24px 20px 24px;
  border-top: 1px solid #e9ecef;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: ${props => props.$isRTL ? 'row-reverse' : 'row'};
  
  @media (max-width: 768px) {
    padding: 16px 16px 20px 16px;
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
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
    gap: 8px;
  }
`;

const SelectionCount = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const SelectionActions = styled.div`
  display: flex;
  gap: 12px;
  
  @media (max-width: 768px) {
    width: 100%;
    gap: 12px;
  }
`;

const ActionButton = styled.button<{ $primary?: boolean }>`
  padding: 8px 16px;
  border: ${props => props.$primary ? 'none' : '1px solid #ccc'};
  border-radius: 6px;
  background: ${props => props.$primary ? '#007bff' : 'transparent'};
  color: ${props => props.$primary ? 'white' : '#666'};
  font-size: 13px;
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
    padding: 14px 16px;
    font-size: 13px;
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
  
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const ControlRow = styled.div<{ $isRTL: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
  flex-direction: ${props => props.$isRTL ? 'row-reverse' : 'row'};
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 12px;
    margin-bottom: 10px;
  }
`;

const ControlLabel = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const ColumnsSelector = styled.select`
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 13px;
  background: white;
  cursor: pointer;
  
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const FilterLabel = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #333;
  margin-bottom: 6px;
  
  @media (max-width: 768px) {
    font-size: 12px;
    margin-bottom: 8px;
  }
`;

const TagsFilterSection = styled.div`
  margin: 10px 0;
  
  @media (max-width: 768px) {
    margin: 12px 0;
  }
`;

const MediaItemContainer = styled.div<{ $isSelected: boolean }>`
  position: relative;
  aspect-ratio: 1;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid ${props => props.$isSelected ? '#007bff' : 'transparent'};
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`;

const SelectionOverlay = styled.div<{ $isSelected: boolean }>`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 20px;
  height: 20px;
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
    font-size: 10px;
    font-weight: bold;
    opacity: ${props => props.$isSelected ? 1 : 0};
  }
`;

const VideoDurationOverlay = styled.div`
  position: absolute;
  bottom: 6px;
  right: 6px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 500;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #666;
  font-size: 14px;
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
  const [isClient, setIsClient] = useState(false);
  
  // State for UI controls
  const [columns, setColumns] = useState<string>('3');
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    setIsClient(true);
  }, []);
  
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
      if (isClient) {
        window.open(selectedMediaItems[index].url, '_blank');
      }
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
    if (isOpen && isClient) {
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
  }, [isOpen, isClient]);
  
  if (!isOpen || !isClient) return null;
  
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
            </ControlRow>
            
            {/* Tags Filter Section - only show if there are tags */}
            {hasAnyTags && (
              <TagsFilterSection>
                <FilterLabel>{t('Filter by tags:')}</FilterLabel>
                <MediaTagsFilter
                  mediaItems={mediaItems}
                  onFilterChange={handleMediaFilterChange}
                  resetFilter={resetMediaFilter}
                />
              </TagsFilterSection>
            )}

            <ControlRow $isRTL={isRTL}>
              {/* Only show Select All button when not all items are selected */}
              {selectedItems.size < filteredMediaItems.length && (
                <ActionButton onClick={selectAll}>
                  {isMediaFiltered 
                    ? t('Select Filtered ({{count}})', { count: filteredMediaItems.length.toString() })
                    : t('Select All')
                  }
                </ActionButton>
              )}
              
              {selectedItems.size > 0 && (
                <ActionButton onClick={unselectAll}>
                  {t('Unselect All')}
                </ActionButton>
              )}
            </ControlRow>     
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
              <span style={{ fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
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