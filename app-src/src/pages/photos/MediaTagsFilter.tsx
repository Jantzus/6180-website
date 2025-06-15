import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { MediaItem } from "@/lib/types";
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n";

// Styled components for media tag filter display
const FilterContainer = styled.div<{ $isRTL: boolean }>`
  width: 100%;
  margin-bottom: 24px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  direction: ${props => props.$isRTL ? 'rtl' : 'ltr'};
`;

const FilterSection = styled.div`
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const FilterLabel = styled.h3<{ $isRTL: boolean }>`
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  display: flex;
  align-items: center;
  gap: 8px;
  text-align: ${props => props.$isRTL ? 'right' : 'left'};
`;

const TagsScrollContainer = styled.div<{ $isRTL: boolean }>`
  display: flex;
  flex-direction: ${props => props.$isRTL ? 'row-reverse' : 'row'};
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
  -webkit-overflow-scrolling: touch;
  flex-wrap: nowrap;

  /* Hide scrollbar for WebKit browsers */
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for Firefox */
  scrollbar-width: none;
`;

const TagButton = styled.button<{ $isSelected: boolean; $isDisplayed: boolean }>`
  padding: 6px 12px;
  border: 1px solid ${props => 
    props.$isDisplayed ? '#28a745' : 
    props.$isSelected ? '#007bff' : '#ced4da'
  };
  border-radius: 16px;
  background: ${props => 
    props.$isDisplayed ? '#28a745' : 
    props.$isSelected ? '#007bff' : '#ffffff'
  };
  color: ${props => 
    (props.$isDisplayed || props.$isSelected) ? '#ffffff' : '#495057'
  };
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
  height: 40px;
  display: flex;
  align-items: center;

  &:hover {
    background: ${props => 
      props.$isDisplayed ? '#1e7e34' :
      props.$isSelected ? '#0056b3' : '#e9ecef'
    };
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SubtagButton = styled.button<{ $isSelected: boolean }>`
  padding: 4px 8px;
  border: 1px solid ${props => props.$isSelected ? '#007bff' : '#ced4da'};
  border-radius: 12px;
  background: ${props => props.$isSelected ? '#007bff' : '#ffffff'};
  color: ${props => props.$isSelected ? '#ffffff' : '#495057'};
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    background: ${props => props.$isSelected ? '#0056b3' : '#e9ecef'};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SummaryText = styled.div<{ $isRTL: boolean }>`
  margin-top: 8px;
  font-size: 13px;
  color: #555;
  font-style: italic;
  text-align: ${props => props.$isRTL ? 'right' : 'left'};
`;

const EmptyState = styled.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 8px 0;
`;

// Tag structure for display purposes
interface DisplayTag {
  key: string;
  TagType: string;
  tagTitle: string;
  timestamp: number;
  subtags: DisplaySubtag[];
}

interface DisplaySubtag {
  key: string;
  TagType: string;
  tagTitle: string;
  subtagTitle: string;
  timestamp: number;
}

// MediaTagsFilter Component with hierarchical multi-select filtering
type MediaTagsFilterProps = {
  mediaItems: MediaItem[];
  onFilterChange: (filteredMediaItems: MediaItem[]) => void;
  resetFilter: () => void;
};

export const MediaTagsFilter: React.FC<MediaTagsFilterProps> = ({
  mediaItems,
  onFilterChange,
  resetFilter,
}) => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";
  
  // State to track all unique tags across media items
  const [allTags, setAllTags] = useState<DisplayTag[]>([]);
  
  // State to track the currently selected tags and subtags (array of keys)
  const [selectedTagKeys, setSelectedTagKeys] = useState<string[]>([]);
  
  // State to track which tag is currently displayed (showing its subtags)
  const [displayedTagKey, setDisplayedTagKey] = useState<string | null>(null);
  
  // State to track tags from the currently visible media items
  const [visibleTags, setVisibleTags] = useState<DisplayTag[]>([]);
  
  // Extract all unique tags and subtags from media items and organize hierarchically
  useEffect(() => {
    // Create maps to track the most recent timestamp for each tag and subtag
    const tagsMap = new Map<string, { tag: DisplayTag; timestamp: number }>();
    
    mediaItems.forEach((mediaItem, index) => {
      // Use index as a timestamp substitute since media items might not have timestamps
      const itemTimestamp = Date.now() - index; // Most recent items have higher timestamps
      
      // Check if mediaItem has selectedTags (similar to file structure)
      const selectedTags = (mediaItem as any).selectedTags;
      if (!selectedTags) return;
      
      selectedTags.forEach((tag: any) => {
        // Process main tag
        const mainTagKey = `${tag.TagType}-${tag.tagTitle}`;
        
        if (!tagsMap.has(mainTagKey)) {
          tagsMap.set(mainTagKey, {
            tag: {
              key: mainTagKey,
              TagType: tag.TagType,
              tagTitle: tag.tagTitle,
              timestamp: itemTimestamp,
              subtags: []
            },
            timestamp: itemTimestamp
          });
        } else {
          // Update timestamp if this is more recent
          const existing = tagsMap.get(mainTagKey)!;
          if (itemTimestamp > existing.timestamp) {
            existing.timestamp = itemTimestamp;
            existing.tag.timestamp = itemTimestamp;
          }
        }
        
        // Process subtags
        tag.subtags?.forEach((subtag: any) => {
          const subtagKey = `${subtag.TagType}-${subtag.tagTitle}-${subtag.subtagTitle}`;
          const mainTag = tagsMap.get(mainTagKey)!.tag;
          
          // Check if this subtag already exists for this main tag
          const existingSubtag = mainTag.subtags.find(s => s.key === subtagKey);
          
          if (!existingSubtag) {
            mainTag.subtags.push({
              key: subtagKey,
              TagType: subtag.TagType,
              tagTitle: subtag.tagTitle,
              subtagTitle: subtag.subtagTitle,
              timestamp: itemTimestamp
            });
          } else {
            // Update timestamp if this is more recent
            if (itemTimestamp > existingSubtag.timestamp) {
              existingSubtag.timestamp = itemTimestamp;
            }
          }
        });
      });
    });
    
    // Convert Map to array and sort by timestamp (most recent first)
    const tagsArray = Array.from(tagsMap.values())
      .sort((a, b) => b.timestamp - a.timestamp)
      .map(entry => {
        // Sort subtags by timestamp too
        entry.tag.subtags.sort((a, b) => b.timestamp - a.timestamp);
        return entry.tag;
      });
    
    setAllTags(tagsArray);
    setVisibleTags(tagsArray);
  }, [mediaItems]);
  
  // Filter media items when tag/subtag selection changes
  const filterMediaItems = (selectedKeys: string[]) => {
    if (selectedKeys.length === 0) {
      resetFilter();
      setVisibleTags(allTags);
      return;
    }
    
    // Filter media items to only those containing ALL selected tags/subtags
    const newFilteredMediaItems = mediaItems.filter(mediaItem => {
      // Get all tag keys from this media item
      const mediaItemTagKeys = new Set<string>();
      
      const selectedTags = (mediaItem as any).selectedTags;
      if (!selectedTags) return false;
      
      selectedTags.forEach((tag: any) => {
        // Add main tag key
        mediaItemTagKeys.add(`${tag.TagType}-${tag.tagTitle}`);
        
        // Add subtag keys
        tag.subtags?.forEach((subtag: any) => {
          mediaItemTagKeys.add(`${subtag.TagType}-${subtag.tagTitle}-${subtag.subtagTitle}`);
        });
      });
      
      // Check if ALL selected tags exist in this media item's tags
      return selectedKeys.every(selectedKey => 
        mediaItemTagKeys.has(selectedKey)
      );
    });
    
    // Update visible tags based on the filtered media items
    updateVisibleTags(newFilteredMediaItems);
    
    onFilterChange(newFilteredMediaItems);
  };
  
  // Handle main tag click
  const handleTagClick = (tag: DisplayTag) => {
    const isSelected = selectedTagKeys.includes(tag.key);
    const isDisplayed = displayedTagKey === tag.key;
    
    if (!isSelected) {
      // Tag is not selected, select it for filtering
      const newSelectedKeys = [...selectedTagKeys, tag.key];
      setSelectedTagKeys(newSelectedKeys);
      setDisplayedTagKey(tag.key);
      filterMediaItems(newSelectedKeys);
    } else if (isSelected && !isDisplayed) {
      // Tag is selected but not displayed, display it to show subtags
      setDisplayedTagKey(tag.key);
    } else if (isSelected && isDisplayed) {
      // Tag is selected and displayed, unselect it and hide subtags
      const newSelectedKeys = selectedTagKeys.filter(k => 
        k !== tag.key && !tag.subtags.some(s => s.key === k)
      );
      setSelectedTagKeys(newSelectedKeys);
      setDisplayedTagKey(null);
      filterMediaItems(newSelectedKeys);
    }
  };
  
  // Handle subtag click
  const handleSubtagClick = (subtag: DisplaySubtag) => {
    const isSelected = selectedTagKeys.includes(subtag.key);
    
    let newSelectedKeys: string[];
    if (isSelected) {
      // Remove subtag from selection
      newSelectedKeys = selectedTagKeys.filter(k => k !== subtag.key);
    } else {
      // Add subtag to selection
      newSelectedKeys = [...selectedTagKeys, subtag.key];
    }
    
    setSelectedTagKeys(newSelectedKeys);
    filterMediaItems(newSelectedKeys);
  };
  
  // Helper function to update visible tags based on filtered media items
  const updateVisibleTags = (filteredMediaItems: MediaItem[]) => {
    // Extract all unique tag keys from the filtered media items
    const tagKeysSet = new Set<string>();
    
    filteredMediaItems.forEach(mediaItem => {
      const selectedTags = (mediaItem as any).selectedTags;
      if (!selectedTags) return;
      
      selectedTags.forEach((tag: any) => {
        // Add main tag key
        tagKeysSet.add(`${tag.TagType}-${tag.tagTitle}`);
      });
    });
    
    // Make sure all selected main tags remain visible
    selectedTagKeys.forEach(tagKey => {
      // Check if this is a main tag key (not a subtag)
      if (!tagKey.includes('-', tagKey.indexOf('-') + 1)) {
        tagKeysSet.add(tagKey);
      }
    });
    
    // Filter tags based on visible keys
    const newVisibleTags = allTags.filter(tag => 
      tagKeysSet.has(tag.key)
    );
    
    setVisibleTags(newVisibleTags);
  };
  
  // Get the currently displayed tag
  const displayedTag = displayedTagKey ? allTags.find(t => t.key === displayedTagKey) : null;
  
  // Count total selections (main tags + subtags)
  const totalSelections = selectedTagKeys.length;
  
  // If no tags found, don't render the component
  if (allTags.length === 0) {
    return null;
  }
  
  return (
    <FilterContainer $isRTL={isRTL}>
      <FilterSection>
        <TagsScrollContainer $isRTL={isRTL}>
          {visibleTags.length > 0 ? (
            visibleTags.map(tag => (
              <TagButton
                key={tag.key}
                $isSelected={selectedTagKeys.includes(tag.key)}
                $isDisplayed={displayedTagKey === tag.key}
                onClick={() => handleTagClick(tag)}
                title={`${tag.TagType}: ${tag.tagTitle}`}
              >
                {tag.tagTitle}
              </TagButton>
            ))
          ) : (
            <EmptyState>No tags available</EmptyState>
          )}
        </TagsScrollContainer>
      </FilterSection>

      {/* Subtags section - only show when a tag is displayed */}
      {displayedTag && displayedTag.subtags.length > 0 && (
        <FilterSection>
          <FilterLabel $isRTL={isRTL}>
            Subtags for "{displayedTag.tagTitle}"
          </FilterLabel>
          
          <TagsScrollContainer $isRTL={isRTL}>
            {displayedTag.subtags.map(subtag => (
              <SubtagButton
                key={subtag.key}
                $isSelected={selectedTagKeys.includes(subtag.key)}
                onClick={() => handleSubtagClick(subtag)}
                title={`${subtag.TagType}: ${subtag.tagTitle} → ${subtag.subtagTitle}`}
              >
                {subtag.subtagTitle}
              </SubtagButton>
            ))}
          </TagsScrollContainer>
        </FilterSection>
      )}
      
      {/* Show selection summary if multiple items are selected */}
      {totalSelections > 1 && (
        <SummaryText $isRTL={isRTL}>
          {t('Showing photos with all selected tags')}
        </SummaryText>
      )}
    </FilterContainer>
  );
};