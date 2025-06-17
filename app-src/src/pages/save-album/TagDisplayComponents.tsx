import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { TagData, SubtagData, useTagsManagement } from './useTagsManagement';

// Styled components for tag display
const TagsContainer = styled.div`
  margin: 16px 0;
`;

const TagsSection = styled.div`
  margin-bottom: 12px;
`;

const TagsLabel = styled.h3`
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  min-height: 32px;
`;

const TagButton = styled.button<{ $isSelected: boolean; $isDisplayed?: boolean; $isBeingDeleted?: boolean }>`
  position: relative;
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

  ${props => props.$isBeingDeleted && `
    opacity: 0.5;
    pointer-events: none;
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

const DeleteButton = styled.button`
  position: absolute;
  top: -4px;
  right: -4px;
  width: 16px;
  height: 16px;
  border: none;
  border-radius: 50%;
  background: #dc3545;
  color: white;
  font-size: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: #c82333;
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
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

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border: 1px solid #007bff;
  border-radius: 12px;
  background: white;
`;

const TagInput = styled.input`
  border: none;
  outline: none;
  font-size: 12px;
  background: transparent;
  min-width: 80px;
  max-width: 200px;

  &::placeholder {
    color: #999;
  }
`;

const InputButton = styled.button`
  border: none;
  background: transparent;
  color: #007bff;
  font-size: 10px;
  cursor: pointer;
  padding: 2px 4px;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background: #007bff;
    color: white;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const InfoBadge = styled.span`
  background: #6c757d;
  color: white;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: bold;
`;

// Tag with delete functionality component
interface TagWithDeleteProps {
  tag: TagData;
  isSelected: boolean;
  isDisplayed: boolean;
  isBeingDeleted: boolean;
  disabled: boolean;
  onTagClick: (tag: TagData) => void;
  onDeleteTag: (tagId: string) => void;
  getTagDisplayText: (tag: TagData) => string;
}

const TagWithDelete: React.FC<TagWithDeleteProps> = ({
  tag,
  isSelected,
  isDisplayed,
  isBeingDeleted,
  disabled,
  onTagClick,
  onDeleteTag,
  getTagDisplayText
}) => {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <TagButton
      $isSelected={isSelected}
      $isDisplayed={isDisplayed}
      $isBeingDeleted={isBeingDeleted}
      disabled={disabled}
      onClick={() => onTagClick(tag)}
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      {getTagDisplayText(tag)}
      {showDelete && !disabled && !isBeingDeleted && (
        <DeleteButton
          onClick={(e) => {
            e.stopPropagation();
            onDeleteTag(tag.id);
          }}
          disabled={isBeingDeleted}
        >
          ×
        </DeleteButton>
      )}
    </TagButton>
  );
};

// Subtag with delete functionality component
interface SubtagWithDeleteProps {
  subtag: SubtagData;
  isSelected: boolean;
  isBeingDeleted: boolean;
  disabled: boolean;
  onSubtagClick: (subtag: SubtagData) => void;
  onDeleteSubtag: (subtagId: string) => void;
}

const SubtagWithDelete: React.FC<SubtagWithDeleteProps> = ({
  subtag,
  isSelected,
  isBeingDeleted,
  disabled,
  onSubtagClick,
  onDeleteSubtag
}) => {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <SubtagButton
      $isSelected={isSelected}
      $isBeingDeleted={isBeingDeleted}
      disabled={disabled}
      onClick={() => onSubtagClick(subtag)}
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      {subtag.subtagTitle}
      {showDelete && !disabled && !isBeingDeleted && (
        <DeleteButton
          onClick={(e) => {
            e.stopPropagation();
            onDeleteSubtag(subtag.id);
          }}
          disabled={isBeingDeleted}
        >
          ×
        </DeleteButton>
      )}
    </SubtagButton>
  );
};

// New tag input component
interface NewTagInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
  placeholder?: string;
}

const NewTagInput: React.FC<NewTagInputProps> = ({
  value,
  onChange,
  onSubmit,
  onCancel,
  isSubmitting,
  placeholder = "Enter tag name..."
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <InputContainer>
      <TagInput
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder={placeholder}
        disabled={isSubmitting}
      />
      <InputButton
        onClick={onSubmit}
        disabled={!value.trim() || isSubmitting}
        title="Add (Enter)"
      >
        {isSubmitting ? '...' : '✓'}
      </InputButton>
      <InputButton
        onClick={onCancel}
        disabled={isSubmitting}
        title="Cancel (Escape)"
      >
        ×
      </InputButton>
    </InputContainer>
  );
};

// Main Tags Display Component - UPDATED for photo-level tagging
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
    tagIdBeingDeleted,
    isAddingNewTag,
    newTagTitle,
    isSubmittingNewTag,
    selectTag,
    unselectTag,
    setDisplayedTag,
    isTagSelected,
    deleteTag,
    startAddingNewTag,
    cancelAddingNewTag,
    submitNewTag,
    setNewTagTitle
  } = tagsManager;

  const handleTagClick = (tag: TagData) => {
    if (disabled) return;
    
    const isSelected = isTagSelected(tag);
    const isDisplayed = displayedTagId === tag.id;
    
    if (!isSelected) {
      // Tag is not selected, select it for application to photos
      selectTag(tag);
      setDisplayedTag(tag.id);
      enhancedLog(`Selected tag for photo application: ${tag.tagTitle}`);
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

  const handleDeleteTag = async (tagId: string) => {
    if (disabled) return;
    
    enhancedLog(`Delete tag initiated: ${tagId}`);
    const success = await deleteTag(tagId);
    if (success) {
      enhancedLog(`Tag successfully deleted: ${tagId}`);
    } else {
      enhancedLog(`Failed to delete tag: ${tagId}`);
    }
  };

  const handleSubmitNewTag = async () => {
    const success = await submitNewTag();
    if (!success) {
      enhancedLog("Failed to submit new tag");
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
        <TagsLabel>
          Tag the selected photos
          {selectedTags.length > 0 && (
            <InfoBadge>{selectedTags.length} selected</InfoBadge>
          )}
        </TagsLabel>
        <TagsRow>
          {isLoadingTags ? (
            <LoadingText>Loading tags...</LoadingText>
          ) : (
            <>
              {sortedTags.map(tag => (
                <TagWithDelete
                  key={tag.id}
                  tag={tag}
                  isSelected={isTagSelected(tag)}
                  isDisplayed={displayedTagId === tag.id}
                  isBeingDeleted={tagIdBeingDeleted === tag.id}
                  disabled={disabled}
                  onTagClick={handleTagClick}
                  onDeleteTag={handleDeleteTag}
                  getTagDisplayText={getTagDisplayText}
                />
              ))}
              
              {isAddingNewTag ? (
                <NewTagInput
                  value={newTagTitle}
                  onChange={setNewTagTitle}
                  onSubmit={handleSubmitNewTag}
                  onCancel={cancelAddingNewTag}
                  isSubmitting={isSubmittingNewTag}
                  placeholder="Enter tag name..."
                />
              ) : (
                <ActionButton 
                  disabled={disabled}
                  onClick={startAddingNewTag}
                >
                  + Add Tag
                </ActionButton>
              )}
              
              {sortedTags.length === 0 && !isAddingNewTag && (
                <EmptyState>No tags available</EmptyState>
              )}
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

      {/* Instructions for photo tagging */}
      {selectedTags.length > 0 && (
        <div style={{
          marginTop: '12px',
          padding: '12px 16px',
          background: '#e7f3ff',
          borderRadius: '6px',
          fontSize: '13px',
          color: '#0c5aa6',
          border: '1px solid #b3d9ff'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span>✅</span>
            <strong>Tags Applied:</strong>
          </div>
          All selected files will have <strong>{selectedTags.length} tag{selectedTags.length !== 1 ? 's' : ''}</strong> applied to them when you save the album.<br/>
          <strong>Selected tags:</strong> {selectedTags.map(tag => {
            const subtagNames = tag.subtags.map(s => s.subtagTitle);
            return subtagNames.length > 0 
              ? `${tag.tagTitle} (${subtagNames.join(', ')})` 
              : tag.tagTitle;
          }).join(', ')}
        </div>
      )}
    </TagsContainer>
  );
};

// Subtags Display Component - UPDATED for photo-level tagging
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
    subtagIdBeingDeleted,
    isAddingNewSubtag,
    newSubtagTitle,
    isSubmittingNewSubtag,
    selectSubtag,
    unselectSubtag,
    isSubtagSelected,
    deleteSubtag,
    startAddingNewSubtag,
    cancelAddingNewSubtag,
    submitNewSubtag,
    setNewSubtagTitle
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
      enhancedLog(`Unselected subtag for photo application: ${subtag.subtagTitle}`);
    } else {
      selectSubtag(subtag);
      enhancedLog(`Selected subtag for photo application: ${subtag.subtagTitle}`);
    }
  };

  const handleDeleteSubtag = async (subtagId: string) => {
    if (disabled) return;
    
    enhancedLog(`Delete subtag initiated: ${subtagId}`);
    const success = await deleteSubtag(subtagId);
    if (success) {
      enhancedLog(`Subtag successfully deleted: ${subtagId}`);
    } else {
      enhancedLog(`Failed to delete subtag: ${subtagId}`);
    }
  };

  const handleSubmitNewSubtag = async () => {
    const success = await submitNewSubtag();
    if (!success) {
      enhancedLog("Failed to submit new subtag");
    }
  };

  if (!displayedTag) {
    return null;
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
          <SubtagWithDelete
            key={subtag.id}
            subtag={subtag}
            isSelected={isSubtagSelected(subtag)}
            isBeingDeleted={subtagIdBeingDeleted === subtag.id}
            disabled={disabled}
            onSubtagClick={handleSubtagClick}
            onDeleteSubtag={handleDeleteSubtag}
          />
        ))}
        
        {isAddingNewSubtag ? (
          <NewTagInput
            value={newSubtagTitle}
            onChange={setNewSubtagTitle}
            onSubmit={handleSubmitNewSubtag}
            onCancel={cancelAddingNewSubtag}
            isSubmitting={isSubmittingNewSubtag}
            placeholder="Enter subtag name..."
          />
        ) : (
          <ActionButton 
            disabled={disabled}
            onClick={startAddingNewSubtag}
          >
            + Add Subtag
          </ActionButton>
        )}
        
        {sortedSubtags.length === 0 && !isAddingNewSubtag && (
          <EmptyState>No subtags available</EmptyState>
        )}
      </TagsRow>
    </TagsSection>
  );
};

// Updated PhotoTagging component for individual photo tagging display
interface PhotoTaggingProps {
  photoTags: { tagTitle: string; TagType: string; subtags: { tagTitle: string; subtagTitle: string; }[] }[];
  isSelected?: boolean;
  onToggleSelection?: () => void;
}

export const PhotoTagging: React.FC<PhotoTaggingProps> = ({ 
  photoTags,
  isSelected = false,
  onToggleSelection
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
      fontSize: '12px',
      cursor: onToggleSelection ? 'pointer' : 'default'
    }}
    onClick={onToggleSelection}>
      {photoTags.length > 0 ? (
        <div>
          Tags: {photoTags.map(tag => 
            tag.subtags.length > 0 
              ? `${tag.tagTitle} (${tag.subtags.map(s => s.subtagTitle).join(', ')})`
              : tag.tagTitle
          ).join(', ')}
        </div>
      ) : (
        <div style={{ opacity: 0.7 }}>
          {isSelected ? 'Selected for tagging' : 'No tags applied'}
        </div>
      )}
    </div>
  );
};