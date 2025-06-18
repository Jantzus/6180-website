import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from "@/lib/i18n/hooks";
import { TagData, SubtagData, useTagsManagement } from './useTagsManagement';

// Styled components for tag display with clear binary states
const TagsContainer = styled.div`
  margin: 32px 0;
`;

const TagsSection = styled.div`
  margin-bottom: 24px;
`;

const TagsLabel = styled.h3`
  margin: 0 0 16px 0;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  min-height: 32px;
`;

// UPDATED: Black with white text for applied tags, green for displayed tag
const TagButton = styled.button<{ 
  $isApplied: boolean; 
  $isDisplayed?: boolean; 
  $isBeingDeleted?: boolean 
}>`
  position: relative;
  padding: 8px 16px;
  border: 2px solid ${props => {
    if (props.$isDisplayed) return '#28a745';
    return props.$isApplied ? '#333333' : '#dee2e6';
  }};
  border-radius: 20px;
  background: ${props => {
    if (props.$isDisplayed) return '#28a745';
    return props.$isApplied ? '#333333' : '#ffffff';
  }};
  color: ${props => {
    if (props.$isDisplayed) return '#ffffff';
    return props.$isApplied ? '#ffffff' : '#6c757d';
  }};
  font-size: 13px;
  font-weight: ${props => props.$isApplied || props.$isDisplayed ? '600' : '500'};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${props => {
    if (props.$isDisplayed) return '0 0 0 3px rgba(40, 167, 69, 0.3), 0 4px 12px rgba(40, 167, 69, 0.15)';
    if (props.$isApplied) return '0 0 0 2px rgba(51, 51, 51, 0.2), 0 4px 12px rgba(51, 51, 51, 0.15)';
    return '0 2px 8px rgba(0, 0, 0, 0.04)';
  }};

  ${props => props.$isBeingDeleted && `
    opacity: 0.5;
    pointer-events: none;
  `}

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${props => {
      if (props.$isDisplayed) return '0 0 0 4px rgba(40, 167, 69, 0.4), 0 6px 16px rgba(40, 167, 69, 0.2)';
      if (props.$isApplied) return '0 0 0 3px rgba(51, 51, 51, 0.3), 0 6px 16px rgba(51, 51, 51, 0.2)';
      return '0 4px 12px rgba(0, 0, 0, 0.1)';
    }};
    
    background: ${props => {
      if (props.$isDisplayed) return '#1e7e34';
      if (props.$isApplied) return '#1a1a1a';
      return '#f8f9fa';
    }};
    
    border-color: ${props => {
      if (props.$isDisplayed) return '#1e7e34';
      if (props.$isApplied) return '#1a1a1a';
      return '#007bff';
    }};
    
    color: ${props => {
      if (props.$isDisplayed || props.$isApplied) return '#ffffff';
      return '#007bff';
    }};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SubtagButton = styled(TagButton)`
  font-size: 12px;
  padding: 6px 12px;
  border-radius: 16px;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: -6px;
  right: -6px;
  width: 18px;
  height: 18px;
  border: none;
  border-radius: 50%;
  background: rgba(220, 53, 69, 0.9);
  color: white;
  font-size: 11px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);

  &:hover {
    background: #c82333;
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(220, 53, 69, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const LoadingText = styled.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 16px;
`;

const EmptyState = styled.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 16px;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #6c757d;
  border-radius: 16px;
  background: transparent;
  color: #6c757d;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  &:hover {
    background: #6c757d;
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 1px solid #007bff;
  border-radius: 16px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.1);
  transition: all 0.2s ease;
  
  &:focus-within {
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.3), 0 4px 12px rgba(0, 123, 255, 0.15);
  }
`;

const TagInput = styled.input`
  border: none;
  outline: none;
  font-size: 12px;
  background: transparent;
  min-width: 100px;
  max-width: 200px;

  &::placeholder {
    color: #999;
    opacity: 0.7;
  }
`;

const InputButton = styled.button`
  border: none;
  background: transparent;
  color: #007bff;
  font-size: 11px;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: #007bff;
    color: white;
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

// Tag with delete functionality component - UPDATED: removed arrow, simplified click behavior
interface TagWithDeleteProps {
  tag: TagData;
  isApplied: boolean;
  isDisplayed: boolean;
  isBeingDeleted: boolean;
  disabled: boolean;
  onTagClick: (tag: TagData) => void;
  onDeleteTag: (tagId: string) => void;
  getTagDisplayText: (tag: TagData) => string;
}

const TagWithDelete: React.FC<TagWithDeleteProps> = React.memo(({
  tag,
  isApplied,
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
      $isApplied={isApplied}
      $isDisplayed={isDisplayed}
      $isBeingDeleted={isBeingDeleted}
      disabled={disabled}
      onClick={() => onTagClick(tag)}
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <span>{getTagDisplayText(tag)}</span>
      
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
});

// Subtag with delete functionality component
interface SubtagWithDeleteProps {
  subtag: SubtagData;
  isApplied: boolean;
  isBeingDeleted: boolean;
  disabled: boolean;
  onSubtagClick: (subtag: SubtagData) => void;
  onDeleteSubtag: (subtagId: string) => void;
}

const SubtagWithDelete: React.FC<SubtagWithDeleteProps> = React.memo(({
  subtag,
  isApplied,
  isBeingDeleted,
  disabled,
  onSubtagClick,
  onDeleteSubtag
}) => {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <SubtagButton
      $isApplied={isApplied}
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
});

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
  const { t } = useTranslation();
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
        title={t('Add (Enter)')}
      >
        {isSubmitting ? '...' : '✓'}
      </InputButton>
      <InputButton
        onClick={onCancel}
        disabled={isSubmitting}
        title={t('Cancel (Escape)')}
      >
        ×
      </InputButton>
    </InputContainer>
  );
};

// Main Tags Display Component
interface TagsDisplayProps {
  tagsManager: ReturnType<typeof useTagsManagement>;
  disabled?: boolean;
  enhancedLog: (message: string, data?: any) => void;
}

export const TagsDisplay: React.FC<TagsDisplayProps> = React.memo(({ 
  tagsManager, 
  disabled = false,
  enhancedLog
}) => {
  const { t } = useTranslation();
  const {
    tags,
    displayedTagId,
    isLoadingTags,
    tagIdBeingDeleted,
    isAddingNewTag,
    newTagTitle,
    isSubmittingNewTag,
    toggleTagOnSelectedFiles,
    setDisplayedTag,
    isTagAppliedToSelected,
    deleteTag,
    startAddingNewTag,
    cancelAddingNewTag,
    submitNewTag,
    setNewTagTitle,
    getAppliedTagsForSelected,
    hasSelectedFiles
  } = tagsManager;

  // Hide completely if no files are selected
  if (!hasSelectedFiles()) {
    return null;
  }

  const handleTagClick = (tag: TagData) => {
    if (disabled) return;
    
    const wasApplied = isTagAppliedToSelected(tag);
    enhancedLog(`Tag "${tag.tagTitle}" clicked - current state: ${wasApplied ? 'applied to all' : 'not applied to all'}`);
    
    // ALWAYS apply/remove the tag first
    toggleTagOnSelectedFiles(tag);
    
    // Handle subtag display logic AFTER the tag state change
    if (tag.subtags && tag.subtags.length > 0) {
      // If tag was applied and is now being removed, hide subtags
      if (wasApplied) {
        setDisplayedTag(null);
      } else {
        // If tag is being applied, show its subtags
        setDisplayedTag(tag.id);
      }
    }
    
    enhancedLog(`After toggle - new state: ${wasApplied ? 'removed from all' : 'applied to all'}`);
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
    const appliedTags = getAppliedTagsForSelected();
    const appliedTag = appliedTags.find(t => t.tagTitle === tag.tagTitle);
    
    if (!appliedTag || appliedTag.subtags.length === 0) {
      return tag.tagTitle;
    }
    
    const subtagNames = appliedTag.subtags.map(s => s.subtagTitle).join(' || ');
    return `${tag.tagTitle}  |  ${subtagNames}`;
  };

  // Sort tags by points (highest first) then by updated date
  const sortedTags = React.useMemo(() => {
    return [...tags].sort((a, b) => {
      if (a.points !== b.points) {
        return b.points - a.points;
      }
      return b.updatedAt - a.updatedAt;
    });
  }, [tags]);

  return (
    <TagsContainer>
      <TagsSection>
        <TagsLabel>
          {t('Apply tags to selected files')}
        </TagsLabel>
        <TagsRow>
          {isLoadingTags ? (
            <LoadingText>{t('Loading tags...')}</LoadingText>
          ) : (
            <>
              {sortedTags.map(tag => {
                const isApplied = isTagAppliedToSelected(tag);
                return (
                  <TagWithDelete
                    key={tag.id}
                    tag={tag}
                    isApplied={isApplied}
                    isDisplayed={displayedTagId === tag.id}
                    isBeingDeleted={tagIdBeingDeleted === tag.id}
                    disabled={disabled}
                    onTagClick={handleTagClick}
                    onDeleteTag={handleDeleteTag}
                    getTagDisplayText={getTagDisplayText}
                  />
                );
              })}
              
              {isAddingNewTag ? (
                <NewTagInput
                  value={newTagTitle}
                  onChange={setNewTagTitle}
                  onSubmit={handleSubmitNewTag}
                  onCancel={cancelAddingNewTag}
                  isSubmitting={isSubmittingNewTag}
                  placeholder={t('Enter tag name...')}
                />
              ) : (
                <ActionButton 
                  disabled={disabled}
                  onClick={startAddingNewTag}
                >
                  {t('+ Add Tag')}
                </ActionButton>
              )}
              
              {sortedTags.length === 0 && !isAddingNewTag && (
                <EmptyState>{t('No tags available')}</EmptyState>
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

      {/* Instructions with new black/green color scheme */}
      <div style={{
        marginTop: '24px',
        padding: '20px 24px',
        background: 'linear-gradient(135deg, #e7f3ff 0%, #f0f8ff 100%)',
        borderRadius: '12px',
        fontSize: '13px',
        color: '#0c5aa6',
        border: '1px solid #b3d9ff',
        boxShadow: '0 4px 12px rgba(0, 123, 255, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <span style={{ fontSize: '16px' }}>🏷️</span>
          <strong style={{ fontSize: '14px' }}>{t('Tag States:')}</strong>
        </div>
        <div style={{ lineHeight: '1.5' }}>
          <strong>{t('Click any tag once to apply/remove it from ALL selected files')}</strong><br/>
          • <strong style={{ color: '#333333' }}>⚫</strong> {t('Black tags: Applied to selected files')}<br/>
          • <strong style={{ color: '#28a745' }}>🟢</strong> {t('Green tags: Most recently clicked tag (showing subtags)')}<br/>
          • <strong style={{ color: '#6c757d' }}>⚪</strong> {t('Gray tags: Available but not applied')}<br/>
        </div>
      </div>
    </TagsContainer>
  );
});

// Subtags Display Component
interface SubtagsDisplayProps {
  tagsManager: ReturnType<typeof useTagsManagement>;
  disabled?: boolean;
  enhancedLog: (message: string, data?: any) => void;
}

const SubtagsDisplay: React.FC<SubtagsDisplayProps> = React.memo(({ 
  tagsManager, 
  disabled = false,
  enhancedLog 
}) => {
  const { t } = useTranslation();
  const {
    displayedTagId,
    subtagIdBeingDeleted,
    isAddingNewSubtag,
    newSubtagTitle,
    isSubmittingNewSubtag,
    toggleSubtagOnSelectedFiles,
    isSubtagAppliedToSelected,
    deleteSubtag,
    startAddingNewSubtag,
    cancelAddingNewSubtag,
    submitNewSubtag,
    setNewSubtagTitle,
    tags
  } = tagsManager;

  const displayedTagSubtags = displayedTagId ? 
    tags.find(t => t.id === displayedTagId)?.subtags || [] : 
    [];
  const displayedTag = tags.find(t => t.id === displayedTagId);

  const handleSubtagClick = (subtag: SubtagData) => {
    if (disabled) return;
    
    enhancedLog(`Subtag "${subtag.subtagTitle}" clicked - current state: ${isSubtagAppliedToSelected(subtag) ? 'applied to all' : 'not applied to all'}`);
    toggleSubtagOnSelectedFiles(subtag);
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
  const sortedSubtags = React.useMemo(() => {
    return [...displayedTagSubtags].sort((a, b) => {
      if (a.points !== b.points) {
        return b.points - a.points;
      }
      return b.updatedAt - a.updatedAt;
    });
  }, [displayedTagSubtags]);

  return (
    <TagsSection>
      <TagsLabel>{t('Subtags for "{{tagTitle}}"', { tagTitle: displayedTag.tagTitle })}</TagsLabel>
      <TagsRow>
        {sortedSubtags.map(subtag => (
          <SubtagWithDelete
            key={subtag.id}
            subtag={subtag}
            isApplied={isSubtagAppliedToSelected(subtag)}
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
            placeholder={t('Enter subtag name...')}
          />
        ) : (
          <ActionButton 
            disabled={disabled}
            onClick={startAddingNewSubtag}
          >
            {t('+ Add Subtag')}
          </ActionButton>
        )}
        
        {sortedSubtags.length === 0 && !isAddingNewSubtag && (
          <EmptyState>{t('No subtags available')}</EmptyState>
        )}
      </TagsRow>
    </TagsSection>
  );
});

// PhotoTagging component for individual photo tagging display
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
  const { t } = useTranslation();

  return (
    <div style={{ 
      position: 'absolute', 
      bottom: '8px', 
      left: '8px', 
      right: '8px',
      background: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      padding: '6px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      cursor: onToggleSelection ? 'pointer' : 'default',
      backdropFilter: 'blur(4px)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
    }}
    onClick={onToggleSelection}>
      {photoTags.length > 0 ? (
        <div>
          {t('Tags: ')}{photoTags.map(tag => 
            tag.subtags.length > 0 
              ? `${tag.tagTitle} (${tag.subtags.map(s => s.subtagTitle).join(', ')})`
              : tag.tagTitle
          ).join(', ')}
        </div>
      ) : (
        <div style={{ opacity: 0.7 }}>
          {isSelected ? t('Selected for tagging') : t('No tags applied')}
        </div>
      )}
    </div>
  );
};