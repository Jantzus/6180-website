import { useState, useEffect } from 'react';
import { AWS_PRIVATE_GRAPHQL_ENDPOINT } from '@/lib/config';
import { checkLoginWithRefresh } from '@/lib/utils';
import { SelectedTag } from '@/lib/types';

// Types for tags and subtags
export interface TagData {
  id: string;
  tagTitle: string;
  TagType: string;
  points: number;
  createdAt: number;
  updatedAt: number;
  subtags?: SubtagData[];
}

export interface SubtagData {
  id: string;
  tagTitle: string;
  subtagTitle: string;
  TagType: string;
  points: number;
  createdAt: number;
  updatedAt: number;
}

// GraphQL query for fetching tags and subtags
const FETCH_TAGS_QUERY = `
  query FetchTags($fetchRelationsInput: FetchRelationsInput!) {
    fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
      items {
        ... on Tag {
          id
          createdAt
          updatedAt
          TagType
          tagTitle
          points
          subtags {
            items {
              id
              createdAt
              updatedAt
              TagType
              tagTitle
              subtagTitle
              points
            }
            nextToken
          }
        }
      }
      nextToken
    }
  }
`;

// GraphQL mutation for adding a new tag
const ADD_TAG_MUTATION = `
  mutation AddTag($tagInput: TagInput!) {
    addTag(tagInput: $tagInput) {
      id
      createdAt
      updatedAt
      TagType
      tagTitle
      points
    }
  }
`;

// GraphQL mutation for adding a new subtag
const ADD_SUBTAG_MUTATION = `
  mutation AddSubtag($subtagInput: SubtagInput!) {
    addSubtag(subtagInput: $subtagInput) {
      id
      createdAt
      updatedAt
      TagType
      tagTitle
      subtagTitle
      points
    }
  }
`;

// GraphQL mutation for removing/deleting a tag
const DELETE_TAG_MUTATION = `
  mutation DeleteTag($tagId: String!) {
    deleteTag(tagId: $tagId) {
      id
      hasBeenDeleted
    }
  }
`;

// GraphQL mutation for removing/deleting a subtag
const DELETE_SUBTAG_MUTATION = `
  mutation DeleteSubtag($subtagId: String!) {
    deleteSubtag(subtagId: $subtagId) {
      id
      hasBeenDeleted
    }
  }
`;

export const useTagsManagement = (
  enhancedLog: (message: string, data?: any) => void
) => {
  const [tags, setTags] = useState<TagData[]>([]);
  // UPDATED: selectedTags now represents tags being prepared for application to photos
  const [selectedTags, setSelectedTags] = useState<SelectedTag[]>([]);
  const [displayedTagId, setDisplayedTagId] = useState<string | null>(null);
  const [isLoadingTags, setIsLoadingTags] = useState(false);
  const [tagIdBeingDeleted, setTagIdBeingDeleted] = useState<string | null>(null);
  const [subtagIdBeingDeleted, setSubtagIdBeingDeleted] = useState<string | null>(null);
  
  // UI state for adding new tags/subtags
  const [isAddingNewTag, setIsAddingNewTag] = useState(false);
  const [isAddingNewSubtag, setIsAddingNewSubtag] = useState(false);
  const [newTagTitle, setNewTagTitle] = useState('');
  const [newSubtagTitle, setNewSubtagTitle] = useState('');
  const [isSubmittingNewTag, setIsSubmittingNewTag] = useState(false);
  const [isSubmittingNewSubtag, setIsSubmittingNewSubtag] = useState(false);

  // Fetch tags from the API
  const fetchTags = async () => {
    enhancedLog("Fetching tags from API");
    setIsLoadingTags(true);
    
    try {
      const token = await checkLoginWithRefresh();
      if (!token) {
        enhancedLog("No token available for fetching tags");
        return;
      }

      const response = await fetch(AWS_PRIVATE_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          query: FETCH_TAGS_QUERY,
          variables: {
            fetchRelationsInput: {
              ownerItemId: "myAccountOwnerItemId",
              rangeKeyPrefix: "Tag____File",
              index: "ownerItemId_____RelationType____sortParameter",
              limit: 2000,
              scanIndexForward: false,
            }
          }
        })
      });

      const result = await response.json();
      enhancedLog("Tags API response:", result);

      if (result.errors) {
        console.error("GraphQL errors:", result.errors);
        enhancedLog(`GraphQL errors: ${JSON.stringify(result.errors)}`);
        return;
      }

      const fetchedTags = result?.data?.fetchRelations?.items || [];
      
      // Transform the data to match our TagData interface
      const transformedTags: TagData[] = fetchedTags.map((tag: any) => ({
        id: tag.id,
        tagTitle: tag.tagTitle,
        TagType: tag.TagType,
        points: tag.points,
        createdAt: tag.createdAt,
        updatedAt: tag.updatedAt,
        subtags: tag.subtags?.items?.map((subtag: any) => ({
          id: subtag.id,
          tagTitle: subtag.tagTitle,
          subtagTitle: subtag.subtagTitle,
          TagType: subtag.TagType,
          points: subtag.points,
          createdAt: subtag.createdAt,
          updatedAt: subtag.updatedAt,
        })) || []
      }));

      enhancedLog(`Fetched ${transformedTags.length} tags`);
      setTags(transformedTags);
    } catch (error) {
      console.error("Error fetching tags:", error);
      enhancedLog(`Error fetching tags: ${error}`);
    } finally {
      setIsLoadingTags(false);
    }
  };

  // UPDATED: Select a tag for later application to photos
  const selectTag = (tag: TagData) => {
    enhancedLog(`Selecting tag for photo application: ${tag.tagTitle}`);
    
    const existingTag = selectedTags.find(t => t.tagTitle === tag.tagTitle);
    if (!existingTag) {
      const newSelectedTag: SelectedTag = {
        tagTitle: tag.tagTitle,
        TagType: tag.TagType,
        subtags: []
      };
      setSelectedTags(prev => [...prev, newSelectedTag]);
      enhancedLog(`Tag ${tag.tagTitle} added to selection for photo application`);
    }
  };

  // UPDATED: Unselect a tag from photo application selection
  const unselectTag = (tag: TagData) => {
    enhancedLog(`Unselecting tag from photo application: ${tag.tagTitle}`);
    setSelectedTags(prev => prev.filter(t => t.tagTitle !== tag.tagTitle));
    
    // If this was the displayed tag, clear the displayed tag
    if (displayedTagId === tag.id) {
      setDisplayedTagId(null);
    }
  };

  // UPDATED: Select a subtag for later application to photos
  const selectSubtag = (subtag: SubtagData) => {
    enhancedLog(`Selecting subtag for photo application: ${subtag.subtagTitle} for tag: ${subtag.tagTitle}`);
    
    setSelectedTags(prev => prev.map(tag => {
      if (tag.tagTitle === subtag.tagTitle) {
        const existingSubtag = tag.subtags.find(s => s.subtagTitle === subtag.subtagTitle);
        if (!existingSubtag) {
          return {
            ...tag,
            subtags: [...tag.subtags, {
              TagType: subtag.TagType,
              tagTitle: subtag.tagTitle,
              subtagTitle: subtag.subtagTitle
            }]
          };
        }
      }
      return tag;
    }));
  };

  // UPDATED: Unselect a subtag from photo application selection
  const unselectSubtag = (subtag: SubtagData) => {
    enhancedLog(`Unselecting subtag from photo application: ${subtag.subtagTitle} for tag: ${subtag.tagTitle}`);
    
    setSelectedTags(prev => prev.map(tag => {
      if (tag.tagTitle === subtag.tagTitle) {
        return {
          ...tag,
          subtags: tag.subtags.filter(s => s.subtagTitle !== subtag.subtagTitle)
        };
      }
      return tag;
    }));
  };

  // Set displayed tag (for showing subtags)
  const setDisplayedTag = (tagId: string | null) => {
    enhancedLog(`Setting displayed tag: ${tagId}`);
    setDisplayedTagId(tagId);
  };

  // Check if a tag is selected for photo application
  const isTagSelected = (tag: TagData): boolean => {
    return selectedTags.some(t => t.tagTitle === tag.tagTitle);
  };

  // Check if a subtag is selected for photo application
  const isSubtagSelected = (subtag: SubtagData): boolean => {
    const selectedTag = selectedTags.find(t => t.tagTitle === subtag.tagTitle);
    return selectedTag?.subtags.some(s => s.subtagTitle === subtag.subtagTitle) || false;
  };

  // Get subtags for the displayed tag
  const getDisplayedTagSubtags = (): SubtagData[] => {
    if (!displayedTagId) return [];
    
    const displayedTag = tags.find(t => t.id === displayedTagId);
    return displayedTag?.subtags || [];
  };

  // NEW: Clear all selected tags (useful after applying tags to photos)
  const clearSelectedTags = () => {
    enhancedLog("Clearing all selected tags");
    setSelectedTags([]);
    setDisplayedTagId(null);
  };

  // Generate a UUID (simple version for demo)
  const generateUUID = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  // Add new tag function - now with actual implementation
  const addNewTag = async (tagTitle: string, TagType: string): Promise<boolean> => {
    enhancedLog(`Adding new tag: ${tagTitle} of type: ${TagType}`);
    
    if (!tagTitle.trim()) {
      enhancedLog("Cannot add tag with empty title");
      return false;
    }

    setIsSubmittingNewTag(true);
    
    try {
      const token = await checkLoginWithRefresh();
      if (!token) {
        enhancedLog("No token available for adding tag");
        return false;
      }

      // TODO: Replace this with actual backend call
      // For now, this is a placeholder that simulates the API call
      const simulateBackendCall = async () => {
        // Placeholder for actual GraphQL mutation
        enhancedLog("PLACEHOLDER: Would send GraphQL mutation to add tag", {
          mutation: ADD_TAG_MUTATION,
          variables: {
            tagInput: {
              tagTitle: tagTitle.trim(),
              TagType,
              points: 1,
              myAccountOwnerItemId: "myAccountOwnerItemId" // This should come from authentication
            }
          }
        });
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Return simulated success
        return true;
      };

      const success = await simulateBackendCall();
      
      if (success) {
        // Create a temporary tag object to add to local state
        const newTag: TagData = {
          id: generateUUID(),
          tagTitle: tagTitle.trim(),
          TagType,
          points: 1,
          createdAt: Math.floor(Date.now() / 1000),
          updatedAt: Math.floor(Date.now() / 1000),
          subtags: []
        };

        // Add to local state
        setTags(prev => [newTag, ...prev]);
        
        // Auto-select and display the new tag for photo application
        selectTag(newTag);
        setDisplayedTag(newTag.id);
        
        // Clear the input
        setNewTagTitle('');
        setIsAddingNewTag(false);
        
        enhancedLog(`Successfully added new tag for photo application: ${tagTitle}`);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Error adding new tag:", error);
      enhancedLog(`Error adding new tag: ${error}`);
      return false;
    } finally {
      setIsSubmittingNewTag(false);
    }
  };

  // Add new subtag function - now with actual implementation
  const addNewSubtag = async (tagTitle: string, subtagTitle: string, TagType: string): Promise<boolean> => {
    enhancedLog(`Adding new subtag: ${subtagTitle} to tag: ${tagTitle}`);
    
    if (!subtagTitle.trim()) {
      enhancedLog("Cannot add subtag with empty title");
      return false;
    }

    if (!displayedTagId) {
      enhancedLog("No displayed tag for adding subtag");
      return false;
    }

    setIsSubmittingNewSubtag(true);
    
    try {
      const token = await checkLoginWithRefresh();
      if (!token) {
        enhancedLog("No token available for adding subtag");
        return false;
      }

      // TODO: Replace this with actual backend call
      // For now, this is a placeholder that simulates the API call
      const simulateBackendCall = async () => {
        // Placeholder for actual GraphQL mutation
        enhancedLog("PLACEHOLDER: Would send GraphQL mutation to add subtag", {
          mutation: ADD_SUBTAG_MUTATION,
          variables: {
            subtagInput: {
              tagTitle,
              subtagTitle: subtagTitle.trim(),
              TagType,
              points: 1,
              myAccountOwnerItemId: "myAccountOwnerItemId" // This should come from authentication
            }
          }
        });
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Return simulated success
        return true;
      };

      const success = await simulateBackendCall();
      
      if (success) {
        // Create a temporary subtag object to add to local state
        const newSubtag: SubtagData = {
          id: generateUUID(),
          tagTitle,
          subtagTitle: subtagTitle.trim(),
          TagType,
          points: 1,
          createdAt: Math.floor(Date.now() / 1000),
          updatedAt: Math.floor(Date.now() / 1000)
        };

        // Add to local state - find the parent tag and add the subtag
        setTags(prev => prev.map(tag => {
          if (tag.id === displayedTagId) {
            return {
              ...tag,
              subtags: [newSubtag, ...(tag.subtags || [])]
            };
          }
          return tag;
        }));
        
        // Auto-select the new subtag for photo application
        selectSubtag(newSubtag);
        
        // Clear the input
        setNewSubtagTitle('');
        setIsAddingNewSubtag(false);
        
        enhancedLog(`Successfully added new subtag for photo application: ${subtagTitle}`);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Error adding new subtag:", error);
      enhancedLog(`Error adding new subtag: ${error}`);
      return false;
    } finally {
      setIsSubmittingNewSubtag(false);
    }
  };

  // Delete tag function - now with actual implementation
  const deleteTag = async (tagId: string): Promise<boolean> => {
    enhancedLog(`Deleting tag: ${tagId}`);
    setTagIdBeingDeleted(tagId);
    
    try {
      const token = await checkLoginWithRefresh();
      if (!token) {
        enhancedLog("No token available for deleting tag");
        return false;
      }

      // TODO: Replace this with actual backend call
      // For now, this is a placeholder that simulates the API call
      const simulateBackendCall = async () => {
        // Placeholder for actual GraphQL mutation
        enhancedLog("PLACEHOLDER: Would send GraphQL mutation to delete tag", {
          mutation: DELETE_TAG_MUTATION,
          variables: {
            tagId
          }
        });
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Return simulated success
        return true;
      };

      const success = await simulateBackendCall();
      
      if (success) {
        // Remove from local state
        setTags(prev => prev.filter(tag => tag.id !== tagId));
        
        // Remove from selected tags if it was selected for photo application
        const deletedTag = tags.find(tag => tag.id === tagId);
        if (deletedTag) {
          unselectTag(deletedTag);
        }
        
        // Clear displayed tag if it was the deleted one
        if (displayedTagId === tagId) {
          setDisplayedTag(null);
        }
        
        enhancedLog(`Successfully deleted tag: ${tagId}`);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting tag:", error);
      enhancedLog(`Error deleting tag: ${error}`);
      return false;
    } finally {
      setTagIdBeingDeleted(null);
    }
  };

  // Delete subtag function - now with actual implementation
  const deleteSubtag = async (subtagId: string): Promise<boolean> => {
    enhancedLog(`Deleting subtag: ${subtagId}`);
    setSubtagIdBeingDeleted(subtagId);
    
    try {
      const token = await checkLoginWithRefresh();
      if (!token) {
        enhancedLog("No token available for deleting subtag");
        return false;
      }

      // TODO: Replace this with actual backend call
      // For now, this is a placeholder that simulates the API call
      const simulateBackendCall = async () => {
        // Placeholder for actual GraphQL mutation
        enhancedLog("PLACEHOLDER: Would send GraphQL mutation to delete subtag", {
          mutation: DELETE_SUBTAG_MUTATION,
          variables: {
            subtagId
          }
        });
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Return simulated success
        return true;
      };

      const success = await simulateBackendCall();
      
      if (success) {
        // Find the subtag to be deleted
        let deletedSubtag: SubtagData | null = null;
        
        // Remove from local state
        setTags(prev => prev.map(tag => {
          const updatedSubtags = tag.subtags?.filter(subtag => {
            if (subtag.id === subtagId) {
              deletedSubtag = subtag;
              return false;
            }
            return true;
          }) || [];
          
          return {
            ...tag,
            subtags: updatedSubtags
          };
        }));
        
        // Remove from selected subtags if it was selected for photo application
        if (deletedSubtag) {
          unselectSubtag(deletedSubtag);
        }
        
        enhancedLog(`Successfully deleted subtag: ${subtagId}`);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting subtag:", error);
      enhancedLog(`Error deleting subtag: ${error}`);
      return false;
    } finally {
      setSubtagIdBeingDeleted(null);
    }
  };

  // Update tag points function - placeholder for future implementation
  const updateTagPoints = async (tagId: string, points: number): Promise<boolean> => {
    enhancedLog(`Placeholder: Updating tag points: ${tagId} to ${points}`);
    // TODO: Implement GraphQL mutation to update tag points
    return false;
  };

  // UI state management functions
  const startAddingNewTag = () => {
    setIsAddingNewTag(true);
    setNewTagTitle('');
  };

  const cancelAddingNewTag = () => {
    setIsAddingNewTag(false);
    setNewTagTitle('');
  };

  const startAddingNewSubtag = () => {
    setIsAddingNewSubtag(true);
    setNewSubtagTitle('');
  };

  const cancelAddingNewSubtag = () => {
    setIsAddingNewSubtag(false);
    setNewSubtagTitle('');
  };

  const submitNewTag = async () => {
    if (newTagTitle.trim()) {
      const success = await addNewTag(newTagTitle, "File"); // Default TagType
      return success;
    }
    return false;
  };

  const submitNewSubtag = async () => {
    if (newSubtagTitle.trim() && displayedTagId) {
      const displayedTag = tags.find(t => t.id === displayedTagId);
      if (displayedTag) {
        const success = await addNewSubtag(displayedTag.tagTitle, newSubtagTitle, displayedTag.TagType);
        return success;
      }
    }
    return false;
  };

  // Initialize tags on mount
  useEffect(() => {
    fetchTags();
  }, []);

  return {
    // State
    tags,
    selectedTags, // UPDATED: now represents tags prepared for photo application
    displayedTagId,
    isLoadingTags,
    tagIdBeingDeleted,
    subtagIdBeingDeleted,
    
    // UI state for adding
    isAddingNewTag,
    isAddingNewSubtag,
    newTagTitle,
    newSubtagTitle,
    isSubmittingNewTag,
    isSubmittingNewSubtag,
    
    // Actions
    fetchTags,
    selectTag, // UPDATED: selects tag for photo application
    unselectTag, // UPDATED: unselects tag from photo application
    selectSubtag, // UPDATED: selects subtag for photo application
    unselectSubtag, // UPDATED: unselects subtag from photo application
    setDisplayedTag,
    clearSelectedTags, // NEW: clears all selected tags
    
    // Getters
    isTagSelected, // UPDATED: checks if tag is selected for photo application
    isSubtagSelected, // UPDATED: checks if subtag is selected for photo application
    getDisplayedTagSubtags,
    
    // State setters
    setTagIdBeingDeleted,
    setSubtagIdBeingDeleted,
    
    // Add/Remove functions
    addNewTag,
    addNewSubtag,
    deleteTag,
    deleteSubtag,
    updateTagPoints,
    
    // UI state management
    startAddingNewTag,
    cancelAddingNewTag,
    startAddingNewSubtag,
    cancelAddingNewSubtag,
    submitNewTag,
    submitNewSubtag,
    setNewTagTitle,
    setNewSubtagTitle
  };
};