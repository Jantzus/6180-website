import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { MediaItem } from "@/lib/types";
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n";

// Styled components for filter display
const FilterContainer = styled.div<{ $isRTL: boolean }>`
  width: 100%;
  /* Remove gray background, padding, border, and border-radius */
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  direction: ${props => props.$isRTL ? 'rtl' : 'ltr'};
`;

const FilterSection = styled.div`
  margin-bottom: 8px; /* Reduced from 12px to 8px for tighter spacing */

  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 6px; /* Tighter mobile spacing */
  }
`;

const FilterRow = styled.div<{ $isRTL: boolean }>`
  display: flex;
  flex-direction: ${props => props.$isRTL ? 'row-reverse' : 'row'};
  gap: 12px; /* Keep 12px horizontal spacing between tag buttons */
  overflow-x: auto;
  padding-bottom: 6px; /* Reduced from 8px to 6px */
  -webkit-overflow-scrolling: touch;
  flex-wrap: nowrap;
  align-items: center;

  /* Hide scrollbar for WebKit browsers */
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for Firefox */
  scrollbar-width: none;
  
  @media (max-width: 480px) {
    gap: 8px; /* Tighter mobile spacing */
    padding-bottom: 4px; /* Tighter mobile spacing */
  }
`;

const TagButton = styled.button<{ $isSelected: boolean; $isDisplayed: boolean }>`
  padding: 6px 12px; /* Keeping existing padding for good touch targets */
  border: 1px solid ${props => 
    props.$isDisplayed ? '#28a745' : 
    props.$isSelected ? '#000000' : '#ced4da'  // Changed from #007bff to #000000 (black)
  };
  border-radius: 16px;
  background: ${props => 
    props.$isDisplayed ? '#28a745' : 
    props.$isSelected ? '#000000' : '#ffffff'  // Changed from #007bff to #000000 (black)
  };
  color: ${props => 
    (props.$isDisplayed || props.$isSelected) ? '#ffffff' : '#495057'
  };
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
  height: 36px; /* Reduced from 40px to 36px */
  display: flex;
  align-items: center;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background: ${props => 
      props.$isDisplayed ? '#1e7e34' :
      props.$isSelected ? '#333333' : '#e9ecef'  // Changed from #0056b3 to #333333 (dark gray)
    };
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  @media (max-width: 480px) {
    padding: 5px 10px; /* Slightly tighter mobile padding */
    font-size: 12px;
    height: 32px; /* Reduced mobile height */
    max-width: 250px;
    border-radius: 12px;
  }
`;

const SubtagButton = styled.button<{ $isSelected: boolean }>`
  padding: 4px 8px;
  border: 1px solid ${props => props.$isSelected ? '#000000' : '#ced4da'};  // Changed from #007bff to #000000 (black)
  border-radius: 12px;
  background: ${props => props.$isSelected ? '#000000' : '#ffffff'};  // Changed from #007bff to #000000 (black)
  color: ${props => props.$isSelected ? '#ffffff' : '#495057'};
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
  height: 28px; /* Reduced height for subtags */
  display: flex;
  align-items: center;

  &:hover {
    background: ${props => props.$isSelected ? '#333333' : '#e9ecef'};  // Changed from #0056b3 to #333333 (dark gray)
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  @media (max-width: 480px) {
    padding: 3px 6px; /* Tighter mobile padding */
    font-size: 11px;
    height: 24px; /* Smaller mobile height */
    border-radius: 8px;
  }
`;

const SummaryText = styled.div<{ $isRTL: boolean }>`
  margin-top: 6px; /* Reduced from 8px to 6px */
  font-size: 13px;
  color: #555;
  font-style: italic;
  text-align: ${props => props.$isRTL ? 'right' : 'left'};
`;

const EmptyState = styled.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 6px 0; /* Reduced from 8px to 6px */
`;

const ClearButton = styled.button`
  padding: 6px 12px;
  border: 1px solid #dc3545;
  border-radius: 16px;
  background: #ffffff;
  color: #dc3545;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
  height: 36px; /* Reduced from 40px to 36px */
  display: flex;
  align-items: center;

  &:hover {
    background: #dc3545;
    color: #ffffff;
    transform: translateY(-1px);
  }
  
  @media (max-width: 480px) {
    padding: 5px 10px; /* Tighter mobile padding */
    font-size: 12px;
    height: 32px; /* Reduced mobile height */
    border-radius: 12px;
  }
`;

// Tag structure for display purposes
interface DisplayTag {
  key: string;
  TagType: string;
  tagTitle: string;
  count: number; // Number of media items with this tag
  subtags: DisplaySubtag[];
}

interface DisplaySubtag {
  key: string;
  TagType: string;
  tagTitle: string;
  subtagTitle: string;
  count: number; // Number of media items with this subtag
}

// Enhanced MediaTagsFilter Component
type MediaTagsFilterProps = {
  mediaItems: MediaItem[];
  onFilterChange: (filteredItems: MediaItem[]) => void;
  resetFilter: () => void;
};

export const MediaTagsFilter: React.FC<MediaTagsFilterProps> = ({
  mediaItems,
  onFilterChange,
  resetFilter,
}) => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";
  
  // ✅ ADD DEBUG LOGGING AT THE START
  console.log('🎯 MediaTagsFilter received props:', {
    mediaItemsCount: mediaItems.length,
    mediaItemsWithTags: mediaItems.filter(item => item.selectedTags && item.selectedTags.length > 0).length,
    firstItemHasTags: mediaItems[0]?.selectedTags ? true : false,
    firstItemTagCount: mediaItems[0]?.selectedTags?.length || 0,
    sampleTags: mediaItems[0]?.selectedTags?.slice(0, 2) || []
  });
  
  // Log each media item's tags
  mediaItems.slice(0, 3).forEach((item, index) => {
    console.log(`🎯 Filter received item ${index}:`, {
      fileId: item.fileId,
      hasSelectedTags: !!item.selectedTags,
      tagCount: item.selectedTags?.length || 0,
      tags: item.selectedTags?.map(tag => `${tag.tagTitle}(${tag.subtags?.length || 0})`) || []
    });
  });
  
  // State to track all unique tags across media items
  const [allTags, setAllTags] = useState<DisplayTag[]>([]);
  
  // State to track the currently selected tags and subtags (array of keys)
  const [selectedTagKeys, setSelectedTagKeys] = useState<string[]>([]);
  
  // State to track which tag is currently displayed (showing its subtags)
  const [displayedTagKey, setDisplayedTagKey] = useState<string | null>(null);
  
  // State to track tags from the currently visible media items
  const [visibleTags, setVisibleTags] = useState<DisplayTag[]>([]);
  
  // Helper function to get selected subtags for a tag
  const getSelectedSubtags = (tag: DisplayTag): DisplaySubtag[] => {
    return tag.subtags.filter(subtag => selectedTagKeys.includes(subtag.key));
  };
  
  // Helper function to render tag content with subtags
  const renderTagContent = (tag: DisplayTag) => {
    const selectedSubtags = getSelectedSubtags(tag);
    
    if (selectedSubtags.length === 0) {
      return `${tag.tagTitle} (${tag.count})`;
    }
    
    const subtagText = selectedSubtags.map(st => `${st.subtagTitle} (${st.count})`).join(', ');
    return `${tag.tagTitle} (${subtagText})`;
  };
  
  // Extract all unique tags and subtags from media items and organize hierarchically
  useEffect(() => {
    console.log('🏷️ MediaTagsFilter: Starting tag extraction from mediaItems:', mediaItems.length);
    
    const tagsMap = new Map<string, { tag: DisplayTag; count: number }>();
    
    mediaItems.forEach((mediaItem, itemIndex) => {
      console.log(`🏷️ Processing mediaItem ${itemIndex}:`, {
        fileId: mediaItem.fileId,
        hasSelectedTags: !!mediaItem.selectedTags,
        selectedTagsLength: mediaItem.selectedTags?.length || 0
      });
      
      mediaItem.selectedTags?.forEach((tag, tagIndex) => {
        console.log(`  🏷️ Processing tag ${tagIndex}:`, tag);
        
        const mainTagKey = `${tag.TagType}-${tag.tagTitle}`;
        
        if (!tagsMap.has(mainTagKey)) {
          tagsMap.set(mainTagKey, {
            tag: {
              key: mainTagKey,
              TagType: tag.TagType,
              tagTitle: tag.tagTitle,
              count: 0,
              subtags: []
            },
            count: 0
          });
          console.log(`    ✅ Created new tag: ${mainTagKey}`);
        }
        
        // Increment count for this tag
        const tagEntry = tagsMap.get(mainTagKey)!;
        tagEntry.count++;
        tagEntry.tag.count = tagEntry.count;
        console.log(`    📊 Updated tag count: ${mainTagKey} = ${tagEntry.count}`);
        
        tag.subtags?.forEach((subtag, subtagIndex) => {
          console.log(`    🏷️ Processing subtag ${subtagIndex}:`, subtag);
          
          const subtagKey = `${subtag.TagType}-${subtag.tagTitle}-${subtag.subtagTitle}`;
          const mainTag = tagEntry.tag;
          
          const existingSubtag = mainTag.subtags.find(s => s.key === subtagKey);
          
          if (!existingSubtag) {
            mainTag.subtags.push({
              key: subtagKey,
              TagType: subtag.TagType,
              tagTitle: subtag.tagTitle,
              subtagTitle: subtag.subtagTitle,
              count: 1
            });
            console.log(`      ✅ Created new subtag: ${subtagKey}`);
          } else {
            existingSubtag.count++;
            console.log(`      📊 Updated subtag count: ${subtagKey} = ${existingSubtag.count}`);
          }
        });
      });
    });
    
    // Convert tags to array and sort by count (descending)
    const tagsArray = Array.from(tagsMap.values())
      .sort((a, b) => b.count - a.count)
      .map(entry => {
        entry.tag.subtags.sort((a, b) => b.count - a.count);
        return entry.tag;
      });
    
    console.log('🏷️ Final tags array:', {
      totalTags: tagsArray.length,
      tags: tagsArray.map(tag => ({
        key: tag.key,
        title: tag.tagTitle,
        count: tag.count,
        subtagsCount: tag.subtags.length
      }))
    });
    
    setAllTags(tagsArray);
    setVisibleTags(tagsArray);
  }, [mediaItems]);
  
  // Filter media items when tag/subtag selection changes
  const filterByTags = (selectedKeys: string[]) => {
    if (selectedKeys.length === 0) {
      resetFilter();
      setVisibleTags(allTags);
      return;
    }
    
    const newFilteredItems = mediaItems.filter(mediaItem => {
      const mediaTagKeys = new Set<string>();
      
      mediaItem.selectedTags?.forEach(tag => {
        mediaTagKeys.add(`${tag.TagType}-${tag.tagTitle}`);
        tag.subtags?.forEach(subtag => {
          mediaTagKeys.add(`${subtag.TagType}-${subtag.tagTitle}-${subtag.subtagTitle}`);
        });
      });
      
      return selectedKeys.every(selectedKey => 
        mediaTagKeys.has(selectedKey)
      );
    });
    
    updateVisibleTags(newFilteredItems);
    onFilterChange(newFilteredItems);
  };
  
  // Handle main tag click
  const handleTagClick = (tag: DisplayTag) => {
    const isSelected = selectedTagKeys.includes(tag.key);
    const isDisplayed = displayedTagKey === tag.key;
    
    if (!isSelected) {
      const newSelectedKeys = [...selectedTagKeys, tag.key];
      setSelectedTagKeys(newSelectedKeys);
      setDisplayedTagKey(tag.key);
      filterByTags(newSelectedKeys);
    } else if (isSelected && !isDisplayed) {
      setDisplayedTagKey(tag.key);
    } else if (isSelected && isDisplayed) {
      const newSelectedKeys = selectedTagKeys.filter(k => 
        k !== tag.key && !tag.subtags.some(s => s.key === k)
      );
      setSelectedTagKeys(newSelectedKeys);
      setDisplayedTagKey(null);
      filterByTags(newSelectedKeys);
    }
  };
  
  // Handle subtag click
  const handleSubtagClick = (subtag: DisplaySubtag) => {
    const isSelected = selectedTagKeys.includes(subtag.key);
    
    let newSelectedKeys: string[];
    if (isSelected) {
      newSelectedKeys = selectedTagKeys.filter(k => k !== subtag.key);
    } else {
      newSelectedKeys = [...selectedTagKeys, subtag.key];
    }
    
    setSelectedTagKeys(newSelectedKeys);
    filterByTags(newSelectedKeys);
  };
  
  // Handle clear all filters
  const handleClearAll = () => {
    setSelectedTagKeys([]);
    setDisplayedTagKey(null);
    resetFilter();
    setVisibleTags(allTags);
  };
  
  // Helper function to update visible tags based on filtered media items
  const updateVisibleTags = (filteredItems: MediaItem[]) => {
    const tagKeysSet = new Set<string>();
    
    filteredItems.forEach(mediaItem => {
      mediaItem.selectedTags?.forEach(tag => {
        tagKeysSet.add(`${tag.TagType}-${tag.tagTitle}`);
      });
    });
    
    selectedTagKeys.forEach(tagKey => {
      if (!tagKey.includes('-', tagKey.indexOf('-') + 1)) {
        tagKeysSet.add(tagKey);
      }
    });
    
    const newVisibleTags = allTags.filter(tag => 
      tagKeysSet.has(tag.key)
    );
    
    setVisibleTags(newVisibleTags);
  };
  
  // Get the currently displayed tag
  const displayedTag = displayedTagKey ? allTags.find(t => t.key === displayedTagKey) : null;
  
  // Count total selections
  const totalSelections = selectedTagKeys.length;
  
  // Check if we have any tags to show
  const hasTags = allTags.length > 0;
  
  // ✅ ADD DEBUG LOGGING FOR COMPONENT RENDERING DECISION
  console.log('🎯 MediaTagsFilter render decision:', {
    allTagsLength: allTags.length,
    hasTags,
    willRender: hasTags
  });
  
  // If no tags found, don't render the component
  if (!hasTags) {
    console.log('❌ MediaTagsFilter: No tags found, returning null');
    return null;
  }
  
  console.log('✅ MediaTagsFilter: Rendering with tags');
  
  return (
    <FilterContainer $isRTL={isRTL}>
      {/* Main filter row with tags */}
      <FilterSection>
        <FilterRow $isRTL={isRTL}>
          {/* Clear all button - only show if there are selections */}
          {totalSelections > 0 && (
            <ClearButton onClick={handleClearAll}>
              {t('Clear All')}
            </ClearButton>
          )}
          
          {visibleTags.length > 0 ? (
            visibleTags.map(tag => {
              const selectedSubtags = getSelectedSubtags(tag);
              const tooltipText = selectedSubtags.length > 0 
                ? t('{{tagType}}: {{tagTitle}} ({{subtags}})', { 
                    tagType: tag.TagType, 
                    tagTitle: tag.tagTitle, 
                    subtags: selectedSubtags.map(st => st.subtagTitle).join(', ')
                  })
                : t('Click to add/remove: {{tagType}}: {{tagTitle}}', { tagType: tag.TagType, tagTitle: tag.tagTitle });
              
              return (
                <TagButton
                  key={tag.key}
                  $isSelected={selectedTagKeys.includes(tag.key)}
                  $isDisplayed={displayedTagKey === tag.key}
                  onClick={() => handleTagClick(tag)}
                  title={tooltipText}
                >
                  {renderTagContent(tag)}
                </TagButton>
              );
            })
          ) : (
            <EmptyState>{t('No tags available')}</EmptyState>
          )}
        </FilterRow>
      </FilterSection>

      {/* Subtags section - only show when a tag is displayed */}
      {displayedTag && displayedTag.subtags.length > 0 && (
        <FilterSection>
          <FilterRow $isRTL={isRTL}>
            {displayedTag.subtags.map(subtag => (
              <SubtagButton
                key={subtag.key}
                $isSelected={selectedTagKeys.includes(subtag.key)}
                onClick={() => handleSubtagClick(subtag)}
                title={t('Click to add/remove: {{tagType}}: {{tagTitle}} → {{subtagTitle}}', { 
                  tagType: subtag.TagType, 
                  tagTitle: subtag.tagTitle, 
                  subtagTitle: subtag.subtagTitle 
                })}
              >
                {subtag.subtagTitle} ({subtag.count})
              </SubtagButton>
            ))}
          </FilterRow>
        </FilterSection>
      )}
      
      {/* Show selection summary if multiple items are selected */}
      {totalSelections > 0 && (
        <SummaryText $isRTL={isRTL}>
          {t('Showing photos with all selected tags')}
        </SummaryText>
      )}
    </FilterContainer>
  );
};