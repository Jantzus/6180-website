import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { FolderType } from "@/lib/types";
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n";

// Styled components for filter display
const FilterContainer = styled.div<{ $isRTL: boolean }>`
  width: 100%;
  margin-top: 12px;
  margin-bottom: 16px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  direction: ${props => props.$isRTL ? 'rtl' : 'ltr'};
  
  @media (max-width: 768px) {
    margin-top: 20px;
    padding: 16px;
  }
  
  @media (max-width: 480px) {
    margin-top: 24px;
    padding: 12px;
    border-radius: 8px;
  }
`;

const SearchSection = styled.div`
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  max-width: 100%;
`;

const SearchIcon = styled.div<{ $isRTL: boolean }>`
  position: absolute;
  left: ${props => props.$isRTL ? 'auto' : '16px'};
  right: ${props => props.$isRTL ? '16px' : 'auto'};
  top: 50%;
  transform: translateY(-50%);
  color: #9CA3AF;
  pointer-events: none;
  z-index: 1;
`;

const SearchInput = styled.input<{ $isRTL: boolean }>`
  width: 100%;
  height: 44px;
  padding-left: ${props => props.$isRTL ? '16px' : '48px'};
  padding-right: ${props => props.$isRTL ? '48px' : '16px'};
  font-size: 15px;
  font-weight: 400;
  color: #1F2937;
  background-color: #FFFFFF;
  border: 1px solid #D1D5DB;
  border-radius: 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif;
  outline: none;

  &::placeholder {
    color: #9CA3AF;
    opacity: 0.8;
  }

  &:focus {
    border-color: #007AFF;
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1), 0 1px 2px rgba(0, 0, 0, 0.05);
    background-color: #FFFFFF;
  }

  &:hover:not(:focus) {
    border-color: #9CA3AF;
    background-color: #FAFAFA;
  }

  @media (max-width: 480px) {
    height: 42px;
    padding-left: ${props => props.$isRTL ? '12px' : '44px'};
    padding-right: ${props => props.$isRTL ? '44px' : '12px'};
  }
`;

const ClearButton = styled.button<{ $isRTL: boolean }>`
  position: absolute;
  right: ${props => props.$isRTL ? 'auto' : '16px'};
  left: ${props => props.$isRTL ? '16px' : 'auto'};
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #9CA3AF;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 1;

  &:hover {
    background-color: #6B7280;
  }
`;

const FilterSection = styled.div`
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 8px;
  }
`;

const FilterRow = styled.div<{ $isRTL: boolean }>`
  display: flex;
  flex-direction: ${props => props.$isRTL ? 'row-reverse' : 'row'};
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
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
    gap: 8px;
    padding-bottom: 6px;
  }
`;

const ToggleButton = styled.button<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid ${props => props.$isActive ? '#007bff' : '#ced4da'};
  border-radius: 16px;
  background: ${props => props.$isActive ? '#007bff' : '#ffffff'};
  color: ${props => props.$isActive ? '#ffffff' : '#495057'};
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: ${props => props.$isActive ? '#0056b3' : '#e9ecef'};
    transform: translateY(-1px);
  }
  
  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    font-size: 14px;
    border-radius: 12px;
  }
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
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;

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
  
  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 12px;
    height: 36px;
    max-width: 250px;
    border-radius: 12px;
  }
`;

const ContactButton = styled.button<{ $isSelected: boolean }>`
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 13px;
  cursor: pointer;
  border: 1px solid #ddd;
  background-color: ${props => props.$isSelected ? '#2196f3' : '#fff'};
  color: ${props => props.$isSelected ? '#fff' : '#333'};
  white-space: nowrap;
  transition: all 0.2s ease;
  flex-shrink: 0;
  height: 40px;

  &:hover {
    background-color: ${props => props.$isSelected ? '#1976d2' : '#e9ecef'};
    transform: translateY(-1px);
  }
  
  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 12px;
    height: 36px;
    border-radius: 12px;
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
  
  @media (max-width: 480px) {
    padding: 4px 6px;
    font-size: 11px;
    border-radius: 8px;
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

// Enhanced TagsFilter Component with integrated search and ContactsFilter
type AlbumsFilterProps = {
  folders: FolderType[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onTagFilterChange: (filteredFolders: FolderType[]) => void;
  onContactFilterChange: (filteredFolders: FolderType[]) => void;
  resetTagFilter: () => void;
  resetContactFilter: () => void;
};

export const AlbumsFilter: React.FC<AlbumsFilterProps> = ({
  folders,
  searchQuery,
  setSearchQuery,
  onTagFilterChange,
  onContactFilterChange,
  resetTagFilter,
  resetContactFilter,
}) => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";
  
  // State for contacts filter toggle
  const [showContactsFilter, setShowContactsFilter] = useState(false);
  
  // State to track all unique tags across albums
  const [allTags, setAllTags] = useState<DisplayTag[]>([]);
  
  // State to track the currently selected tags and subtags (array of keys)
  const [selectedTagKeys, setSelectedTagKeys] = useState<string[]>([]);
  
  // State to track which tag is currently displayed (showing its subtags)
  const [displayedTagKey, setDisplayedTagKey] = useState<string | null>(null);
  
  // State to track tags from the currently visible albums
  const [visibleTags, setVisibleTags] = useState<DisplayTag[]>([]);
  
  // Contacts filter state
  const [allContacts, setAllContacts] = useState<string[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [visibleContacts, setVisibleContacts] = useState<string[]>([]);
  
  // Helper function to get selected subtags for a tag
  const getSelectedSubtags = (tag: DisplayTag): DisplaySubtag[] => {
    return tag.subtags.filter(subtag => selectedTagKeys.includes(subtag.key));
  };
  
  // Helper function to render tag content with subtags
  const renderTagContent = (tag: DisplayTag) => {
    const selectedSubtags = getSelectedSubtags(tag);
    
    if (selectedSubtags.length === 0) {
      return tag.tagTitle;
    }
    
    const subtagText = selectedSubtags.map(st => st.subtagTitle).join(', ');
    return `${tag.tagTitle} (${subtagText})`;
  };
  
  // Extract all unique tags and subtags from folders and organize hierarchically
  useEffect(() => {
    // Process tags
    const tagsMap = new Map<string, { tag: DisplayTag; timestamp: number }>();
    
    // Process contacts
    const contactsMap = new Map<string, { name: string; timestamp: number }>();
    
    folders.forEach(folder => {
      const folderTimestamp = folder.updatedAt 
        ? new Date(folder.updatedAt).getTime() 
        : folder.createdAt 
          ? new Date(folder.createdAt).getTime()
          : 0;
      
      // Process tags
      folder.files.forEach(file => {
        file.selectedTags?.forEach(tag => {
          const mainTagKey = `${tag.TagType}-${tag.tagTitle}`;
          
          if (!tagsMap.has(mainTagKey)) {
            tagsMap.set(mainTagKey, {
              tag: {
                key: mainTagKey,
                TagType: tag.TagType,
                tagTitle: tag.tagTitle,
                timestamp: folderTimestamp,
                subtags: []
              },
              timestamp: folderTimestamp
            });
          } else {
            const existing = tagsMap.get(mainTagKey)!;
            if (folderTimestamp > existing.timestamp) {
              existing.timestamp = folderTimestamp;
              existing.tag.timestamp = folderTimestamp;
            }
          }
          
          tag.subtags?.forEach(subtag => {
            const subtagKey = `${subtag.TagType}-${subtag.tagTitle}-${subtag.subtagTitle}`;
            const mainTag = tagsMap.get(mainTagKey)!.tag;
            
            const existingSubtag = mainTag.subtags.find(s => s.key === subtagKey);
            
            if (!existingSubtag) {
              mainTag.subtags.push({
                key: subtagKey,
                TagType: subtag.TagType,
                tagTitle: subtag.tagTitle,
                subtagTitle: subtag.subtagTitle,
                timestamp: folderTimestamp
              });
            } else {
              if (folderTimestamp > existingSubtag.timestamp) {
                existingSubtag.timestamp = folderTimestamp;
              }
            }
          });
        });
      });
      
      // Process contacts
      if (folder.contacts) {
        Object.values(folder.contacts).forEach(contact => {
          if (typeof contact === 'string' && !contact.toString().startsWith('Profile-')) {
            const existingEntry = contactsMap.get(contact);
            if (!existingEntry || folderTimestamp > existingEntry.timestamp) {
              contactsMap.set(contact, { 
                name: contact, 
                timestamp: folderTimestamp 
              });
            }
          }
        });
      }
    });
    
    // Convert tags to array and sort
    const tagsArray = Array.from(tagsMap.values())
      .sort((a, b) => b.timestamp - a.timestamp)
      .map(entry => {
        entry.tag.subtags.sort((a, b) => b.timestamp - a.timestamp);
        return entry.tag;
      });
    
    // Convert contacts to array and sort
    const contactsArray = Array.from(contactsMap.values())
      .sort((a, b) => b.timestamp - a.timestamp)
      .map(entry => entry.name);
    
    setAllTags(tagsArray);
    setVisibleTags(tagsArray);
    setAllContacts(contactsArray);
    setVisibleContacts(contactsArray);
  }, [folders]);
  
  // Filter folders when tag/subtag selection changes
  const filterByTags = (selectedKeys: string[]) => {
    if (selectedKeys.length === 0) {
      resetTagFilter();
      setVisibleTags(allTags);
      return;
    }
    
    const newFilteredFolders = folders.filter(folder => {
      const folderTagKeys = new Set<string>();
      
      folder.files.forEach(file => {
        file.selectedTags?.forEach(tag => {
          folderTagKeys.add(`${tag.TagType}-${tag.tagTitle}`);
          tag.subtags?.forEach(subtag => {
            folderTagKeys.add(`${subtag.TagType}-${subtag.tagTitle}-${subtag.subtagTitle}`);
          });
        });
      });
      
      return selectedKeys.every(selectedKey => 
        folderTagKeys.has(selectedKey)
      );
    });
    
    updateVisibleTags(newFilteredFolders);
    onTagFilterChange(newFilteredFolders);
  };
  
  // Filter folders when contact selection changes
  const filterByContacts = (selectedContactNames: string[]) => {
    if (selectedContactNames.length === 0) {
      resetContactFilter();
      setVisibleContacts(allContacts);
      return;
    }
    
    const newFilteredFolders = folders.filter(folder => {
      if (!folder.contacts) return false;
      
      const folderContactNames = Object.values(folder.contacts)
        .filter(c => typeof c === 'string' && !c.toString().startsWith('Profile-'));
      
      return selectedContactNames.every(selectedContact => 
        folderContactNames.includes(selectedContact)
      );
    });
    
    updateVisibleContacts(newFilteredFolders);
    onContactFilterChange(newFilteredFolders);
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
  
  // Handle contact click
  const handleContactClick = (contact: string) => {
    let newSelectedContacts: string[];
    
    if (selectedContacts.includes(contact)) {
      newSelectedContacts = selectedContacts.filter(c => c !== contact);
    } else {
      newSelectedContacts = [...selectedContacts, contact];
    }
    
    setSelectedContacts(newSelectedContacts);
    filterByContacts(newSelectedContacts);
  };
  
  // Helper function to update visible tags based on filtered folders
  const updateVisibleTags = (filteredFolders: FolderType[]) => {
    const tagKeysSet = new Set<string>();
    
    filteredFolders.forEach(folder => {
      folder.files.forEach(file => {
        file.selectedTags?.forEach(tag => {
          tagKeysSet.add(`${tag.TagType}-${tag.tagTitle}`);
        });
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
  
  // Helper function to update visible contacts based on filtered folders
  const updateVisibleContacts = (filteredFolders: FolderType[]) => {
    const contactsSet = new Set<string>();
    
    filteredFolders.forEach(folder => {
      if (folder.contacts) {
        Object.values(folder.contacts).forEach(contact => {
          if (typeof contact === 'string' && !contact.toString().startsWith('Profile-')) {
            contactsSet.add(contact);
          }
        });
      }
    });
    
    selectedContacts.forEach(contact => {
      contactsSet.add(contact);
    });
    
    const newVisibleContacts = allContacts.filter(contact => 
      contactsSet.has(contact)
    );
    
    setVisibleContacts(newVisibleContacts);
  };
  
  // Get the currently displayed tag
  const displayedTag = displayedTagKey ? allTags.find(t => t.key === displayedTagKey) : null;
  
  // Count total selections
  const totalTagSelections = selectedTagKeys.length;
  const totalContactSelections = selectedContacts.length;
  
  // Check if we have any contacts or tags to show
  const hasContacts = allContacts.length > 0;
  const hasTags = allTags.length > 0;
  
  // If no tags or contacts found and no search query, don't render the component
  if (!hasContacts && !hasTags && !searchQuery) {
    return null;
  }
  
  return (
    <FilterContainer $isRTL={isRTL}>
      {/* Search Section */}
      <SearchSection>
        <SearchWrapper>
          {/* Search Icon */}
          <SearchIcon $isRTL={isRTL}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </SearchIcon>

          {/* Search Input */}
          <SearchInput
            $isRTL={isRTL}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('Search albums by title or description')}
          />

          {/* Clear Button */}
          {searchQuery && (
            <ClearButton
              $isRTL={isRTL}
              onClick={() => setSearchQuery('')}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </ClearButton>
          )}
        </SearchWrapper>
      </SearchSection>

      {/* Show filters only if we have contacts or tags */}
      {(hasContacts || hasTags) && (
        <>
          {/* Main filter row with contacts toggle and tags */}
          <FilterSection>
            <FilterRow $isRTL={isRTL}>
              {/* Contacts toggle button - only show if there are contacts */}
              {hasContacts && (
                <ToggleButton
                  $isActive={showContactsFilter}
                  onClick={() => setShowContactsFilter(!showContactsFilter)}
                  title={t('Toggle contacts filter')}
                >
                  👥
                </ToggleButton>
              )}
              
              {/* Tags */}
              {hasTags && visibleTags.length > 0 ? (
                visibleTags.map(tag => {
                  const selectedSubtags = getSelectedSubtags(tag);
                  const tooltipText = selectedSubtags.length > 0 
                    ? `${tag.TagType}: ${tag.tagTitle} (${selectedSubtags.map(st => st.subtagTitle).join(', ')})`
                    : `Click to add/remove: ${tag.TagType}: ${tag.tagTitle}`;
                  
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
              ) : hasTags ? (
                <EmptyState>{t('No tags available')}</EmptyState>
              ) : null}
            </FilterRow>
          </FilterSection>

          {/* Contacts filter row - only show when toggled on */}
          {showContactsFilter && hasContacts && (
            <FilterSection>
              <FilterRow $isRTL={isRTL}>
                {visibleContacts.map(contact => (
                  <ContactButton
                    key={contact}
                    $isSelected={selectedContacts.includes(contact)}
                    onClick={() => handleContactClick(contact)}
                    title={`Click to add/remove: ${contact}`}
                  >
                    {contact}
                  </ContactButton>
                ))}
              </FilterRow>
            </FilterSection>
          )}

          {/* Subtags section - only show when a tag is displayed */}
          {displayedTag && displayedTag.subtags.length > 0 && (
            <FilterSection>
              <FilterRow $isRTL={isRTL}>
                {displayedTag.subtags.map(subtag => (
                  <SubtagButton
                    key={subtag.key}
                    $isSelected={selectedTagKeys.includes(subtag.key)}
                    onClick={() => handleSubtagClick(subtag)}
                    title={`Click to add/remove: ${subtag.TagType}: ${subtag.tagTitle} → ${subtag.subtagTitle}`}
                  >
                    {subtag.subtagTitle}
                  </SubtagButton>
                ))}
              </FilterRow>
            </FilterSection>
          )}
          
          {/* Show selection summary if multiple items are selected */}
          {(totalTagSelections > 0 || totalContactSelections > 0) && (
            <SummaryText $isRTL={isRTL}>
              {totalContactSelections > 0 && totalTagSelections > 0
                ? t('Showing albums with all selected contacts and tags')
                : totalContactSelections > 0
                ? t('Showing albums with all selected contacts')
                : totalTagSelections > 0
                ? t('Showing albums with all selected tags')
                : ''}
            </SummaryText>
          )}
        </>
      )}
    </FilterContainer>
  );
};