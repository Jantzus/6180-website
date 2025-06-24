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

const DeleteButton = styled.button<{ $isMobile?: boolean }>`
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

  ${props => props.$isMobile && `
    width: 20px;
    height: 20px;
    font-size: 12px;
    box-shadow: 0 3px 10px rgba(220, 53, 69, 0.4);
    background: rgba(220, 53, 69, 0.95);
  `}

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

// Tag with delete functionality component - UPDATED: Mobile-friendly delete buttons
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
  const { t } = useTranslation();
  const [showDelete, setShowDelete] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect if this is a touch device
  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    
    checkTouchDevice();
    window.addEventListener('resize', checkTouchDevice);
    
    return () => window.removeEventListener('resize', checkTouchDevice);
  }, []);

  // Only show delete button for GREEN tags (displayed/most recently selected)
  // On touch devices, always show for green tags
  // On non-touch devices, show on hover for green tags
  const shouldShowDelete = isTouchDevice 
    ? isDisplayed && !disabled && !isBeingDeleted
    : showDelete && isDisplayed && !disabled && !isBeingDeleted;

  return (
    <TagButton
      $isApplied={isApplied}
      $isDisplayed={isDisplayed}
      $isBeingDeleted={isBeingDeleted}
      disabled={disabled}
      onClick={() => onTagClick(tag)}
      onMouseEnter={() => !isTouchDevice && isDisplayed && setShowDelete(true)}
      onMouseLeave={() => !isTouchDevice && isDisplayed && setShowDelete(false)}
    >
      <span style={{ paddingRight: shouldShowDelete ? '20px' : '0' }}>
        {getTagDisplayText(tag)}
      </span>
      
      {shouldShowDelete && (
        <DeleteButton
          $isMobile={isTouchDevice}
          onClick={(e) => {
            e.stopPropagation();
            onDeleteTag(tag.id);
          }}
          disabled={isBeingDeleted}
          title={t('Delete tag')}
        >
          ×
        </DeleteButton>
      )}
    </TagButton>
  );
});

// Subtag with delete functionality component - UPDATED: Mobile-friendly delete buttons
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
  const { t } = useTranslation();
  const [showDelete, setShowDelete] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect if this is a touch device
  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    
    checkTouchDevice();
    window.addEventListener('resize', checkTouchDevice);
    
    return () => window.removeEventListener('resize', checkTouchDevice);
  }, []);

  // Only show delete button for applied subtags (since subtags are only visible when parent tag is green)
  // On touch devices, always show for applied subtags
  // On non-touch devices, show on hover for applied subtags
  const shouldShowDelete = isTouchDevice 
    ? isApplied && !disabled && !isBeingDeleted
    : showDelete && isApplied && !disabled && !isBeingDeleted;

  return (
    <SubtagButton
      $isApplied={isApplied}
      $isBeingDeleted={isBeingDeleted}
      disabled={disabled}
      onClick={() => onSubtagClick(subtag)}
      onMouseEnter={() => !isTouchDevice && isApplied && setShowDelete(true)}
      onMouseLeave={() => !isTouchDevice && isApplied && setShowDelete(false)}
    >
      <span style={{ paddingRight: shouldShowDelete ? '20px' : '0' }}>
        {subtag.subtagTitle}
      </span>
      {shouldShowDelete && (
        <DeleteButton
          $isMobile={isTouchDevice}
          onClick={(e) => {
            e.stopPropagation();
            onDeleteSubtag(subtag.id);
          }}
          disabled={isBeingDeleted}
          title={t('Delete subtag')}
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
        placeholder={t(placeholder)}
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

  // Memoize getTagDisplayText to ensure it updates when dependencies change
  const getTagDisplayText = React.useCallback((tag: TagData): string => {
    // Only show subtags if the tag is actually applied to ALL selected files
    const isApplied = isTagAppliedToSelected(tag);
    
    if (!isApplied) {
      // If tag is not applied to all selected files, just show the tag title
      return tag.tagTitle;
    }
    
    // If tag is applied, check for subtags
    const appliedTags = getAppliedTagsForSelected();
    const appliedTag = appliedTags.find(t => t.tagTitle === tag.tagTitle);
    
    if (!appliedTag || appliedTag.subtags.length === 0) {
      return tag.tagTitle;
    }
    
    const subtagNames = appliedTag.subtags.map(s => s.subtagTitle).join(' || ');
    return t('{{tagTitle}}  |  {{subtags}}', { tagTitle: tag.tagTitle, subtags: subtagNames });
  }, [isTagAppliedToSelected, getAppliedTagsForSelected, t]);

  // Log current tag states for debugging
  React.useEffect(() => {
    const appliedTags = tags.filter(tag => isTagAppliedToSelected(tag));
    const appliedTagsWithSubtags = getAppliedTagsForSelected();
    enhancedLog(`TagsDisplay render - ${appliedTags.length} tags applied to all selected files`);
    enhancedLog(`Applied tags with subtags:`, appliedTagsWithSubtags);
  }, [tags, isTagAppliedToSelected, getAppliedTagsForSelected, enhancedLog]);

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

      {/* Instructions with mobile-friendly delete information */}
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
        <div style={{ lineHeight: '2.2' }}>
          <div style={{ marginBottom: '8px' }}>
            <strong style={{ color: '#28a745' }}>🟢</strong>  {t('Most recently clicked tag (showing subtags)')}
          </div>
          <div style={{ marginBottom: '8px' }}>
            <strong style={{ color: '#333333' }}>⚫</strong>  {t('Applied to selected files')}
          </div>
          <div>
            <strong style={{ color: '#6c757d' }}>⚪</strong>  {t('Available but not applied to all selected files')}
          </div>
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

// ENHANCED PhotoTagging component for displaying tags outside individual files - UPDATED with filename support
interface PhotoTaggingProps {
  photoTags: { tagTitle: string; TagType: string; subtags: { tagTitle: string; subtagTitle: string; }[] }[];
  isSelected?: boolean;
  onToggleSelection?: () => void;
  fileName?: string; // NEW: Optional filename parameter
  showFileName?: boolean; // NEW: Optional flag to show filename
}

export const PhotoTagging: React.FC<PhotoTaggingProps> = ({ 
  photoTags,
  isSelected = false,
  onToggleSelection,
  fileName, // NEW: Filename parameter
  showFileName = false // NEW: Flag to control filename display
}) => {
  const { t } = useTranslation();

  // Add CSS for pulse animation if not already present
  React.useEffect(() => {
    const styleId = 'photo-tagging-animations';
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

  // Enhanced tag display formatting
  const formatTagsDisplay = (tags: typeof photoTags): string => {
    if (tags.length === 0) return '';
    
    return tags.map(tag => {
      if (tag.subtags.length > 0) {
        const subtagNames = tag.subtags.map(s => s.subtagTitle).join(', ');
        return t('{{tagTitle}}: {{subtags}}', { tagTitle: tag.tagTitle, subtags: subtagNames });
      }
      return tag.tagTitle;
    }).join(' • ');
  };

  const tagsText = formatTagsDisplay(photoTags);
  const hasAnyTags = photoTags.length > 0;

  // NEW: Show component if we have filename to display OR tags OR if selected
  const shouldRender = showFileName && fileName || hasAnyTags || isSelected;

  // Don't render anything if no relevant content to show
  if (!shouldRender) {
    return null;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {/* NEW: Filename display */}
      {showFileName && fileName && (
        <div style={{
          fontSize: '11px',
          fontWeight: '600',
          color: '#333',
          padding: '4px 8px',
          backgroundColor: isSelected ? '#e3f2fd' : '#f8f9fa',
          borderRadius: '4px',
          border: `1px solid ${isSelected ? '#90caf9' : '#e9ecef'}`,
          textAlign: 'center',
          wordBreak: 'break-word',
          lineHeight: '1.2',
          transition: 'all 0.2s ease'
        }}>
          {fileName}
        </div>
      )}

      {/* Tags display */}
      <div 
        style={{ 
          background: hasAnyTags 
            ? 'linear-gradient(135deg, rgba(0, 123, 255, 0.95) 0%, rgba(0, 123, 255, 0.85) 100%)'
            : 'transparent', // No background for untagged files
          color: 'white',
          padding: hasAnyTags ? '8px 12px' : '6px 12px',
          borderRadius: hasAnyTags ? '8px' : '6px',
          fontSize: hasAnyTags ? '11px' : '10px',
          cursor: onToggleSelection ? 'pointer' : 'default',
          backdropFilter: hasAnyTags ? 'blur(6px)' : 'none',
          boxShadow: hasAnyTags 
            ? '0 4px 12px rgba(0, 123, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)'
            : 'none',
          border: hasAnyTags ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
          transition: 'all 0.3s ease',
          lineHeight: '1.3',
          minHeight: hasAnyTags ? '32px' : 'auto',
          display: 'flex',
          alignItems: 'center',
          wordBreak: 'break-word'
        }}
        onClick={onToggleSelection}
        onMouseEnter={(e) => {
          if (hasAnyTags) {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 123, 255, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3)';
          }
        }}
        onMouseLeave={(e) => {
          if (hasAnyTags) {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 123, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)';
          }
        }}
      >
        {hasAnyTags ? (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px',
            width: '100%',
            flexWrap: 'wrap'
          }}>
            {/* Tag icon */}
            <span style={{ 
              fontSize: '12px',
              opacity: 0.9,
              flexShrink: 0
            }}>
              🏷️
            </span>
            {/* Tags text - no truncation, allow wrapping */}
            <span style={{ 
              fontWeight: '600',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
              flex: 1
            }}>
              {tagsText}
            </span>
          </div>
        ) : (
          <div style={{ 
            opacity: 1,
            fontStyle: 'normal',
            textAlign: 'center',
            width: '100%',
            fontSize: isSelected ? '11px' : '10px',
            fontWeight: isSelected ? '600' : 'normal',
            background: isSelected 
              ? 'white' 
              : 'transparent',
            color: isSelected ? '#007bff' : 'white',
            borderRadius: isSelected ? '6px' : '0',
            padding: isSelected ? '8px 12px' : '0',
            border: isSelected ? '1px solid #007bff' : 'none',
            boxShadow: isSelected ? '0 2px 8px rgba(0, 123, 255, 0.2)' : 'none',
            animation: isSelected ? 'subtlePulse 2.5s infinite' : 'none'
          }}>
            {isSelected ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <span>👇</span> {t('Scroll down to select tags')}
              </span>
            ) : (
              <span style={{ opacity: 0.8, fontStyle: 'italic' }}>
                {t('No tags applied')}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};