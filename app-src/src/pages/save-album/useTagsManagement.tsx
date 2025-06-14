import { useState, useEffect } from 'react';
import { AWS_PRIVATE_GRAPHQL_ENDPOINT } from '@/lib/config';
import { checkLoginWithRefresh } from '@/lib/utils';

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

export interface SelectedTag {
  tagTitle: string;
  TagType: string;
  subtags: SelectedSubtag[];
}

export interface SelectedSubtag {
  tagTitle: string;
  subtagTitle: string;
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

export const useTagsManagement = (
  enhancedLog: (message: string, data?: any) => void
) => {
  const [tags, setTags] = useState<TagData[]>([]);
  const [selectedTags, setSelectedTags] = useState<SelectedTag[]>([]);
  const [displayedTagId, setDisplayedTagId] = useState<string | null>(null);
  const [isLoadingTags, setIsLoadingTags] = useState(false);
  const [tagIdBeingDeleted, setTagIdBeingDeleted] = useState<string | null>(null);
  const [subtagIdBeingDeleted, setSubtagIdBeingDeleted] = useState<string | null>(null);

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

  // Select a tag
  const selectTag = (tag: TagData) => {
    enhancedLog(`Selecting tag: ${tag.tagTitle}`);
    
    const existingTag = selectedTags.find(t => t.tagTitle === tag.tagTitle);
    if (!existingTag) {
      const newSelectedTag: SelectedTag = {
        tagTitle: tag.tagTitle,
        TagType: tag.TagType,
        subtags: []
      };
      setSelectedTags(prev => [...prev, newSelectedTag]);
      enhancedLog(`Tag ${tag.tagTitle} added to selection`);
    }
  };

  // Unselect a tag
  const unselectTag = (tag: TagData) => {
    enhancedLog(`Unselecting tag: ${tag.tagTitle}`);
    setSelectedTags(prev => prev.filter(t => t.tagTitle !== tag.tagTitle));
    
    // If this was the displayed tag, clear the displayed tag
    if (displayedTagId === tag.id) {
      setDisplayedTagId(null);
    }
  };

  // Select a subtag
  const selectSubtag = (subtag: SubtagData) => {
    enhancedLog(`Selecting subtag: ${subtag.subtagTitle} for tag: ${subtag.tagTitle}`);
    
    setSelectedTags(prev => prev.map(tag => {
      if (tag.tagTitle === subtag.tagTitle) {
        const existingSubtag = tag.subtags.find(s => s.subtagTitle === subtag.subtagTitle);
        if (!existingSubtag) {
          return {
            ...tag,
            subtags: [...tag.subtags, {
              tagTitle: subtag.tagTitle,
              subtagTitle: subtag.subtagTitle
            }]
          };
        }
      }
      return tag;
    }));
  };

  // Unselect a subtag
  const unselectSubtag = (subtag: SubtagData) => {
    enhancedLog(`Unselecting subtag: ${subtag.subtagTitle} for tag: ${subtag.tagTitle}`);
    
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

  // Check if a tag is selected
  const isTagSelected = (tag: TagData): boolean => {
    return selectedTags.some(t => t.tagTitle === tag.tagTitle);
  };

  // Check if a subtag is selected
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

  // Placeholder functions for future functionality
  const addNewTag = async (tagTitle: string, TagType: string): Promise<boolean> => {
    enhancedLog(`Placeholder: Adding new tag: ${tagTitle} of type: ${TagType}`);
    // TODO: Implement GraphQL mutation to add new tag
    return false;
  };

  const addNewSubtag = async (tagTitle: string, subtagTitle: string, _TagType: string): Promise<boolean> => {
    enhancedLog(`Placeholder: Adding new subtag: ${subtagTitle} to tag: ${tagTitle}`);
    // TODO: Implement GraphQL mutation to add new subtag
    return false;
  };

  const deleteTag = async (tagId: string): Promise<boolean> => {
    enhancedLog(`Placeholder: Deleting tag: ${tagId}`);
    // TODO: Implement GraphQL mutation to delete tag
    return false;
  };

  const deleteSubtag = async (subtagId: string): Promise<boolean> => {
    enhancedLog(`Placeholder: Deleting subtag: ${subtagId}`);
    // TODO: Implement GraphQL mutation to delete subtag
    return false;
  };

  const updateTagPoints = async (tagId: string, points: number): Promise<boolean> => {
    enhancedLog(`Placeholder: Updating tag points: ${tagId} to ${points}`);
    // TODO: Implement GraphQL mutation to update tag points
    return false;
  };

  // Initialize tags on mount
  useEffect(() => {
    fetchTags();
  }, []);

  return {
    // State
    tags,
    selectedTags,
    displayedTagId,
    isLoadingTags,
    tagIdBeingDeleted,
    subtagIdBeingDeleted,
    
    // Actions
    fetchTags,
    selectTag,
    unselectTag,
    selectSubtag,
    unselectSubtag,
    setDisplayedTag,
    
    // Getters
    isTagSelected,
    isSubtagSelected,
    getDisplayedTagSubtags,
    
    // State setters
    setTagIdBeingDeleted,
    setSubtagIdBeingDeleted,
    
    // Placeholder functions for future implementation
    addNewTag,
    addNewSubtag,
    deleteTag,
    deleteSubtag,
    updateTagPoints
  };
};