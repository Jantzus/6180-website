import React from 'react';
import styled from 'styled-components';
import { TagData, SubtagData, useTagsManagement } from './useTagsManagement';

// Styled components for tag display
const TagsContainer = styled.div`
  margin: 16px 0;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
`;

const TagsSection = styled.div`
  margin-bottom: 12px;
`;

const TagsLabel = styled.h3`
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
`;

const TagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  min-height: 32px;
`;

const TagButton = styled.button<{ $isSelected: boolean; $isDisplayed?: boolean }>`
  padding: 6px 12px;
  border: 1px solid ${props => props.$isSelected ? '#007bff' : '#ced4da'};
  border-radius: 16px;
  background: ${props => props.$isSelected ? '#007bff' : '#ffffff'};
  color: ${props => props.$isSelected ? '#ffffff' : '#495057'};
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  
  ${props => props.$isDisplayed && `
    border-color: #28a745;
    background: #28a745;
    color: white;
  `}

  &:hover {
    background: ${props => props.$isSelected ? '#0056b3' : '#e9ecef'};
    ${props => props.$isDisplayed && `
      background: #1e7e34;
    `}
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SubtagButton = styled(TagButton)`
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
`;

const LoadingText = styled.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
`;

const EmptyState = styled.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
`;

const ActionButton = styled.button`
  padding: 4px 8px;
  border: 1px solid #6c757d;
  border-radius: 12px;
  background: transparent;
  color: #6c757d;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #6c757d;
    color: white;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// Main Tags Display Component
interface TagsDisplayProps {
  tagsManager: ReturnType<typeof useTagsManagement>;
  disabled?: boolean;
  enhancedLog: (message: string, data?: any) => void;
}

export const TagsDisplay: React.FC<TagsDisplayProps> = ({ 
  tagsManager, 
  disabled = false,
  enhancedLog 
}) => {
  const {
    tags,
    selectedTags,
    displayedTagId,
    isLoadingTags,
    selectTag,
    unselectTag,
    setDisplayedTag,
    isTagSelected
  } = tagsManager;

  const handleTagClick = (tag: TagData) => {
    if (disabled) return;
    
    const isSelected = isTagSelected(tag);
    const isDisplayed = displayedTagId === tag.id;
    
    if (!isSelected) {
      // Tag is not selected, select it
      selectTag(tag);
      setDisplayedTag(tag.id);
      enhancedLog(`Selected and displayed tag: ${tag.tagTitle}`);
    } else if (isSelected && !isDisplayed) {
      // Tag is selected but not displayed, display it
      setDisplayedTag(tag.id);
      enhancedLog(`Displayed tag: ${tag.tagTitle}`);
    } else if (isSelected && isDisplayed) {
      // Tag is selected and displayed, unselect it
      unselectTag(tag);
      setDisplayedTag(null);
      enhancedLog(`Unselected tag: ${tag.tagTitle}`);
    }
  };

  const getTagDisplayText = (tag: TagData): string => {
    const selectedTag = selectedTags.find(t => t.tagTitle === tag.tagTitle);
    if (!selectedTag || selectedTag.subtags.length === 0) {
      return tag.tagTitle;
    }
    
    const subtagNames = selectedTag.subtags.map(s => s.subtagTitle).join(' || ');
    return `${tag.tagTitle}  |  ${subtagNames}`;
  };

  // Sort tags by points (highest first) then by updated date
  const sortedTags = [...tags].sort((a, b) => {
    if (a.points !== b.points) {
      return b.points - a.points;
    }
    return b.updatedAt - a.updatedAt;
  });

  return (
    <TagsContainer>
      <TagsSection>
        <TagsLabel>Tags</TagsLabel>
        <TagsRow>
          {isLoadingTags ? (
            <LoadingText>Loading tags...</LoadingText>
          ) : sortedTags.length === 0 ? (
            <EmptyState>No tags available</EmptyState>
          ) : (
            <>
              {sortedTags.map(tag => (
                <TagButton
                  key={tag.id}
                  $isSelected={isTagSelected(tag)}
                  $isDisplayed={displayedTagId === tag.id}
                  disabled={disabled}
                  onClick={() => handleTagClick(tag)}
                >
                  {getTagDisplayText(tag)}
                </TagButton>
              ))}
              <ActionButton disabled={disabled}>
                + Add Tag
              </ActionButton>
            </>
          )}
        </TagsRow>
      </TagsSection>

      {displayedTagId && (
        <SubtagsDisplay 
          tagsManager={tagsManager}
          disabled={disabled}
          enhancedLog={enhancedLog}
        />
      )}
    </TagsContainer>
  );
};

// Subtags Display Component
interface SubtagsDisplayProps {
  tagsManager: ReturnType<typeof useTagsManagement>;
  disabled?: boolean;
  enhancedLog: (message: string, data?: any) => void;
}

const SubtagsDisplay: React.FC<SubtagsDisplayProps> = ({ 
  tagsManager, 
  disabled = false,
  enhancedLog 
}) => {
  const {
    displayedTagId,
    selectSubtag,
    unselectSubtag,
    isSubtagSelected
  } = tagsManager;

  const displayedTagSubtags = displayedTagId ? 
    tagsManager.tags.find(t => t.id === displayedTagId)?.subtags || [] : 
    [];
  const displayedTag = tagsManager.tags.find(t => t.id === displayedTagId);

  const handleSubtagClick = (subtag: SubtagData) => {
    if (disabled) return;
    
    const isSelected = isSubtagSelected(subtag);
    
    if (isSelected) {
      unselectSubtag(subtag);
      enhancedLog(`Unselected subtag: ${subtag.subtagTitle}`);
    } else {
      selectSubtag(subtag);
      enhancedLog(`Selected subtag: ${subtag.subtagTitle}`);
    }
  };

  if (!displayedTag || displayedTagSubtags.length === 0) {
    return (
      <TagsSection>
        <TagsLabel>Subtags for "{displayedTag?.tagTitle}"</TagsLabel>
        <TagsRow>
          <EmptyState>No subtags available</EmptyState>
          <ActionButton disabled={disabled}>
            + Add Subtag
          </ActionButton>
        </TagsRow>
      </TagsSection>
    );
  }

  // Sort subtags by points (highest first) then by updated date
  const sortedSubtags = [...displayedTagSubtags].sort((a, b) => {
    if (a.points !== b.points) {
      return b.points - a.points;
    }
    return b.updatedAt - a.updatedAt;
  });

  return (
    <TagsSection>
      <TagsLabel>Subtags for "{displayedTag.tagTitle}"</TagsLabel>
      <TagsRow>
        {sortedSubtags.map(subtag => (
          <SubtagButton
            key={subtag.id}
            $isSelected={isSubtagSelected(subtag)}
            disabled={disabled}
            onClick={() => handleSubtagClick(subtag)}
          >
            {subtag.subtagTitle}
          </SubtagButton>
        ))}
        <ActionButton disabled={disabled}>
          + Add Subtag
        </ActionButton>
      </TagsRow>
    </TagsSection>
  );
};

// Placeholder component for individual photo tagging (future functionality)
interface PhotoTaggingProps {
  photoFileName: string; // Will be used when individual photo tagging is implemented
  selectedTags: ReturnType<typeof useTagsManagement>['selectedTags'];
  onUpdatePhotoTags?: (photoFileName: string, tags: any[]) => void; // Will be used for future functionality
}

export const PhotoTagging: React.FC<PhotoTaggingProps> = ({ 
  photoFileName: _photoFileName, // Prefix with underscore to indicate intentionally unused
  selectedTags, 
  onUpdatePhotoTags: _onUpdatePhotoTags // Prefix with underscore to indicate intentionally unused
}) => {
  return (
    <div style={{ 
      position: 'absolute', 
      bottom: '8px', 
      left: '8px', 
      right: '8px',
      background: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px'
    }}>
      {selectedTags.length > 0 ? (
        <div>
          Tags: {selectedTags.map(tag => 
            tag.subtags.length > 0 
              ? `${tag.tagTitle} (${tag.subtags.map(s => s.subtagTitle).join(', ')})`
              : tag.tagTitle
          ).join(', ')}
        </div>
      ) : (
        <div style={{ opacity: 0.7 }}>Click to tag this photo</div>
      )}
    </div>
  );
};