import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
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
  // Flag to indicate if this tag was created from applied tags
  isCreatedFromApplied?: boolean;
}

export interface SubtagData {
  id: string;
  tagTitle: string;
  subtagTitle: string;
  TagType: string;
  points: number;
  createdAt: number;
  updatedAt: number;
  // Flag to indicate if this subtag was created from applied tags
  isCreatedFromApplied?: boolean;
}

// Interface for applied tags (what gets saved to backend)
export interface AppliedTag {
  tagTitle: string;
  TagType: string;
  subtags: { tagTitle: string; subtagTitle: string; }[];
}

// Interface for API tag response
interface APITagResponse {
  id: string;
  createdAt: number;
  updatedAt: number;
  TagType: string;
  tagTitle: string;
  points: number;
  subtags?: {
    items?: APISubtagResponse[];
    nextToken?: string;
  };
}

// Interface for API subtag response
interface APISubtagResponse {
  id: string;
  createdAt: number;
  updatedAt: number;
  TagType: string;
  tagTitle: string;
  subtagTitle: string;
  points: number;
}

// GraphQL queries and mutations
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

const DELETE_TAG_MUTATION = `
  mutation DeleteTag($tagId: String!) {
    deleteTag(tagId: $tagId) {
      id
      hasBeenDeleted
    }
  }
`;

const DELETE_SUBTAG_MUTATION = `
  mutation DeleteSubtag($subtagId: String!) {
    deleteSubtag(subtagId: $subtagId) {
      id
      hasBeenDeleted
    }
  }
`;

// SSR-safe UUID generator
const generateUUID = (): string => {
  // Use crypto.randomUUID if available (modern browsers), fallback to custom implementation
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  
  // Fallback implementation for SSR/older browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const useTagsManagement = (
  // File maps and selection indices passed from parent
  photoTagsMap: Map<number, AppliedTag[]>,
  setPhotoTagsMap: React.Dispatch<React.SetStateAction<Map<number, AppliedTag[]>>>,
  existingFileTagsMap: Map<number, AppliedTag[]>,
  setExistingFileTagsMap: React.Dispatch<React.SetStateAction<Map<number, AppliedTag[]>>>,
  selectedPhotoIndices: Set<number>,
  selectedExistingIndices: Set<number>,
  enhancedLog: (message: string, data?: unknown) => void
) => {
  // SSR-safe state initialization
  const [tags, setTags] = useState<TagData[]>([]);
  const [displayedTagId, setDisplayedTagId] = useState<string | null>(null);
  const [isLoadingTags, setIsLoadingTags] = useState(false);
  const [tagIdBeingDeleted, setTagIdBeingDeleted] = useState<string | null>(null);
  const [subtagIdBeingDeleted, setSubtagIdBeingDeleted] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  
  // UI state for adding new tags/subtags
  const [isAddingNewTag, setIsAddingNewTag] = useState(false);
  const [isAddingNewSubtag, setIsAddingNewSubtag] = useState(false);
  const [newTagTitle, setNewTagTitle] = useState('');
  const [newSubtagTitle, setNewSubtagTitle] = useState('');
  const [isSubmittingNewTag, setIsSubmittingNewTag] = useState(false);
  const [isSubmittingNewSubtag, setIsSubmittingNewSubtag] = useState(false);

  // Use refs to prevent infinite loops - track if we've already fetched tags
  const hasFetchedTags = useRef(false);
  const lastAppliedTagsHash = useRef<string>('');

  // Memoized helper to get all currently selected file indices
  const getAllSelectedIndices = useMemo(() => {
    return {
      photoIndices: Array.from(selectedPhotoIndices),
      existingIndices: Array.from(selectedExistingIndices)
    };
  }, [selectedPhotoIndices, selectedExistingIndices]);

  // Function to extract all unique applied tags from file maps - MEMOIZED
  const extractAllAppliedTags = useCallback((): AppliedTag[] => {
    const allAppliedTags: AppliedTag[] = [];
    
    // Collect from photos
    photoTagsMap.forEach(fileTags => {
      allAppliedTags.push(...fileTags);
    });
    
    // Collect from existing files
    existingFileTagsMap.forEach(fileTags => {
      allAppliedTags.push(...fileTags);
    });
    
    // Return unique tags with subtag consolidation
    const uniqueTags = new Map<string, AppliedTag>();
    
    allAppliedTags.forEach(tag => {
      if (uniqueTags.has(tag.tagTitle)) {
        // Merge subtags if tag already exists
        const existingTag = uniqueTags.get(tag.tagTitle)!;
        const allSubtags = [...existingTag.subtags, ...tag.subtags];
        // Remove duplicate subtags
        const uniqueSubtags = Array.from(
          new Map(allSubtags.map(s => [s.subtagTitle, s])).values()
        );
        uniqueTags.set(tag.tagTitle, { ...existingTag, subtags: uniqueSubtags });
      } else {
        uniqueTags.set(tag.tagTitle, tag);
      }
    });
    
    return Array.from(uniqueTags.values());
  }, [photoTagsMap, existingFileTagsMap]);

  // Function to create missing tags from applied tags - MEMOIZED
  const createMissingAppliedTags = useCallback((fetchedTags: TagData[], appliedTags: AppliedTag[]): TagData[] => {
    const missingTags: TagData[] = [];
    const currentTime = Math.floor(Date.now() / 1000);
    
    appliedTags.forEach(appliedTag => {
      // Check if this tag exists in fetched tags
      const existingTag = fetchedTags.find(t => t.tagTitle === appliedTag.tagTitle);
      
      if (!existingTag) {
        // Create missing tag
        const newTag: TagData = {
          id: generateUUID(),
          tagTitle: appliedTag.tagTitle,
          TagType: appliedTag.TagType || 'File',
          points: 1,
          createdAt: currentTime,
          updatedAt: currentTime,
          subtags: [],
          isCreatedFromApplied: true
        };
        
        // Add subtags if any
        if (appliedTag.subtags && appliedTag.subtags.length > 0) {
          newTag.subtags = appliedTag.subtags.map(appliedSubtag => ({
            id: generateUUID(),
            tagTitle: appliedSubtag.tagTitle,
            subtagTitle: appliedSubtag.subtagTitle,
            TagType: appliedTag.TagType || 'File',
            points: 1,
            createdAt: currentTime,
            updatedAt: currentTime,
            isCreatedFromApplied: true
          }));
        }
        
        missingTags.push(newTag);
        enhancedLog(`Created missing tag from applied tags: ${appliedTag.tagTitle} with ${appliedTag.subtags.length} subtags`);
      } else {
        // Check for missing subtags in existing tag
        const missingSubtags: SubtagData[] = [];
        
        appliedTag.subtags.forEach(appliedSubtag => {
          const existingSubtag = existingTag.subtags?.find(s => s.subtagTitle === appliedSubtag.subtagTitle);
          
          if (!existingSubtag) {
            const newSubtag: SubtagData = {
              id: generateUUID(),
              tagTitle: appliedSubtag.tagTitle,
              subtagTitle: appliedSubtag.subtagTitle,
              TagType: appliedTag.TagType || 'File',
              points: 1,
              createdAt: currentTime,
              updatedAt: currentTime,
              isCreatedFromApplied: true
            };
            
            missingSubtags.push(newSubtag);
            enhancedLog(`Created missing subtag from applied tags: ${appliedSubtag.subtagTitle} for tag ${appliedSubtag.tagTitle}`);
          }
        });
        
        // Add missing subtags to existing tag if any
        if (missingSubtags.length > 0) {
          const tagIndex = fetchedTags.findIndex(t => t.id === existingTag.id);
          if (tagIndex !== -1) {
            fetchedTags[tagIndex] = {
              ...existingTag,
              subtags: [...(existingTag.subtags || []), ...missingSubtags]
            };
          }
        }
      }
    });
    
    return missingTags;
  }, [enhancedLog]);

  // Check if tag is applied to ALL currently selected files - MEMOIZED
  const isTagAppliedToSelected = useCallback((tag: TagData): boolean => {
    const { photoIndices, existingIndices } = getAllSelectedIndices;
    
    // If no files are selected, return false
    if (photoIndices.length === 0 && existingIndices.length === 0) {
      return false;
    }
    
    // Check if ALL selected photos have this tag
    const allPhotosHaveTag = photoIndices.length === 0 || photoIndices.every(index => {
      const fileTags = photoTagsMap.get(index) || [];
      return fileTags.some(t => t.tagTitle === tag.tagTitle);
    });
    
    // Check if ALL selected existing files have this tag
    const allExistingHaveTag = existingIndices.length === 0 || existingIndices.every(index => {
      const fileTags = existingFileTagsMap.get(index) || [];
      return fileTags.some(t => t.tagTitle === tag.tagTitle);
    });
    
    // Return true only if ALL selected files have the tag
    return allPhotosHaveTag && allExistingHaveTag;
  }, [getAllSelectedIndices, photoTagsMap, existingFileTagsMap]);

  // Check if subtag is applied to ALL currently selected files that have the parent tag - MEMOIZED
  const isSubtagAppliedToSelected = useCallback((subtag: SubtagData): boolean => {
    const { photoIndices, existingIndices } = getAllSelectedIndices;
    
    // For photos
    let photoFilesWithParentTag = 0;
    let photoFilesWithSubtag = 0;
    
    photoIndices.forEach(index => {
      const fileTags = photoTagsMap.get(index) || [];
      const parentTag = fileTags.find(t => t.tagTitle === subtag.tagTitle);
      if (parentTag) {
        photoFilesWithParentTag++;
        if (parentTag.subtags.some(s => s.subtagTitle === subtag.subtagTitle)) {
          photoFilesWithSubtag++;
        }
      }
    });
    
    // For existing files
    let existingFilesWithParentTag = 0;
    let existingFilesWithSubtag = 0;
    
    existingIndices.forEach(index => {
      const fileTags = existingFileTagsMap.get(index) || [];
      const parentTag = fileTags.find(t => t.tagTitle === subtag.tagTitle);
      if (parentTag) {
        existingFilesWithParentTag++;
        if (parentTag.subtags.some(s => s.subtagTitle === subtag.subtagTitle)) {
          existingFilesWithSubtag++;
        }
      }
    });
    
    const totalFilesWithParentTag = photoFilesWithParentTag + existingFilesWithParentTag;
    const totalFilesWithSubtag = photoFilesWithSubtag + existingFilesWithSubtag;
    
    // Only return true if ALL files with the parent tag also have this subtag
    return totalFilesWithParentTag > 0 && totalFilesWithSubtag === totalFilesWithParentTag;
  }, [getAllSelectedIndices, photoTagsMap, existingFileTagsMap]);

  // Apply/remove tag to ALL selected files based on current state - MEMOIZED
  const toggleTagOnSelectedFiles = useCallback((tag: TagData) => {
    const { photoIndices, existingIndices } = getAllSelectedIndices;
    
    if (photoIndices.length === 0 && existingIndices.length === 0) {
      enhancedLog("No files selected for tag application");
      return;
    }
    
    const isAppliedToAll = isTagAppliedToSelected(tag);
    enhancedLog(`${isAppliedToAll ? 'Removing' : 'Applying'} tag "${tag.tagTitle}" ${isAppliedToAll ? 'from' : 'to'} all selected files`);
    
    // Update photo tags
    if (photoIndices.length > 0) {
      setPhotoTagsMap(prev => {
        const updated = new Map(prev);
        photoIndices.forEach(index => {
          const currentTags = updated.get(index) || [];
          
          if (isAppliedToAll) {
            // Remove the tag from this file
            const filteredTags = currentTags.filter(t => t.tagTitle !== tag.tagTitle);
            updated.set(index, filteredTags);
            enhancedLog(`Removed tag "${tag.tagTitle}" from photo ${index}`);
          } else {
            // Add the tag to this file (if not already present)
            const hasTag = currentTags.some(t => t.tagTitle === tag.tagTitle);
            if (!hasTag) {
              const newTag: AppliedTag = {
                tagTitle: tag.tagTitle,
                TagType: tag.TagType,
                subtags: []
              };
              updated.set(index, [...currentTags, newTag]);
              enhancedLog(`Added tag "${tag.tagTitle}" to photo ${index}`);
            }
          }
        });
        return updated;
      });
    }
    
    // Update existing file tags
    if (existingIndices.length > 0) {
      setExistingFileTagsMap(prev => {
        const updated = new Map(prev);
        existingIndices.forEach(index => {
          const currentTags = updated.get(index) || [];
          
          if (isAppliedToAll) {
            // Remove the tag from this file
            const filteredTags = currentTags.filter(t => t.tagTitle !== tag.tagTitle);
            updated.set(index, filteredTags);
            enhancedLog(`Removed tag "${tag.tagTitle}" from existing file ${index}`);
          } else {
            // Add the tag to this file (if not already present)
            const hasTag = currentTags.some(t => t.tagTitle === tag.tagTitle);
            if (!hasTag) {
              const newTag: AppliedTag = {
                tagTitle: tag.tagTitle,
                TagType: tag.TagType,
                subtags: []
              };
              updated.set(index, [...currentTags, newTag]);
              enhancedLog(`Added tag "${tag.tagTitle}" to existing file ${index}`);
            }
          }
        });
        return updated;
      });
    }
  }, [getAllSelectedIndices, isTagAppliedToSelected, setPhotoTagsMap, setExistingFileTagsMap, enhancedLog]);

  // Apply/remove subtag to ALL selected files that have the parent tag - MEMOIZED
  const toggleSubtagOnSelectedFiles = useCallback((subtag: SubtagData) => {
    const { photoIndices, existingIndices } = getAllSelectedIndices;
    
    if (photoIndices.length === 0 && existingIndices.length === 0) {
      enhancedLog("No files selected for subtag application");
      return;
    }
    
    const isAppliedToAll = isSubtagAppliedToSelected(subtag);
    enhancedLog(`${isAppliedToAll ? 'Removing' : 'Applying'} subtag "${subtag.subtagTitle}" ${isAppliedToAll ? 'from' : 'to'} all selected files with parent tag`);
    
    // Update photo tags
    if (photoIndices.length > 0) {
      setPhotoTagsMap(prev => {
        const updated = new Map(prev);
        photoIndices.forEach(index => {
          const currentTags = updated.get(index) || [];
          const updatedTags = currentTags.map(tag => {
            if (tag.tagTitle === subtag.tagTitle) {
              if (isAppliedToAll) {
                // Remove the subtag
                return {
                  ...tag,
                  subtags: tag.subtags.filter(s => s.subtagTitle !== subtag.subtagTitle)
                };
              } else {
                // Add the subtag (if not already present)
                const hasSubtag = tag.subtags.some(s => s.subtagTitle === subtag.subtagTitle);
                if (!hasSubtag) {
                  return {
                    ...tag,
                    subtags: [...tag.subtags, {
                      tagTitle: subtag.tagTitle,
                      subtagTitle: subtag.subtagTitle
                    }]
                  };
                }
              }
            }
            return tag;
          });
          updated.set(index, updatedTags);
        });
        return updated;
      });
    }
    
    // Update existing file tags
    if (existingIndices.length > 0) {
      setExistingFileTagsMap(prev => {
        const updated = new Map(prev);
        existingIndices.forEach(index => {
          const currentTags = updated.get(index) || [];
          const updatedTags = currentTags.map(tag => {
            if (tag.tagTitle === subtag.tagTitle) {
              if (isAppliedToAll) {
                // Remove the subtag
                return {
                  ...tag,
                  subtags: tag.subtags.filter(s => s.subtagTitle !== subtag.subtagTitle)
                };
              } else {
                // Add the subtag (if not already present)
                const hasSubtag = tag.subtags.some(s => s.subtagTitle === subtag.subtagTitle);
                if (!hasSubtag) {
                  return {
                    ...tag,
                    subtags: [...tag.subtags, {
                      tagTitle: subtag.tagTitle,
                      subtagTitle: subtag.subtagTitle
                    }]
                  };
                }
              }
            }
            return tag;
          });
          updated.set(index, updatedTags);
        });
        return updated;
      });
    }
  }, [getAllSelectedIndices, isSubtagAppliedToSelected, setPhotoTagsMap, setExistingFileTagsMap, enhancedLog]);

  // Get all unique tags that are applied to currently selected files - MEMOIZED
  const getAppliedTagsForSelected = useCallback((): AppliedTag[] => {
    const { photoIndices, existingIndices } = getAllSelectedIndices;
    const allAppliedTags: AppliedTag[] = [];
    
    // Collect from photos
    photoIndices.forEach(index => {
      const fileTags = photoTagsMap.get(index) || [];
      allAppliedTags.push(...fileTags);
    });
    
    // Collect from existing files
    existingIndices.forEach(index => {
      const fileTags = existingFileTagsMap.get(index) || [];
      allAppliedTags.push(...fileTags);
    });
    
    // Return unique tags with subtag consolidation
    const uniqueTags = new Map<string, AppliedTag>();
    
    allAppliedTags.forEach(tag => {
      if (uniqueTags.has(tag.tagTitle)) {
        // Merge subtags if tag already exists
        const existingTag = uniqueTags.get(tag.tagTitle)!;
        const allSubtags = [...existingTag.subtags, ...tag.subtags];
        // Remove duplicate subtags
        const uniqueSubtags = Array.from(
          new Map(allSubtags.map(s => [s.subtagTitle, s])).values()
        );
        uniqueTags.set(tag.tagTitle, { ...existingTag, subtags: uniqueSubtags });
      } else {
        uniqueTags.set(tag.tagTitle, tag);
      }
    });
    
    return Array.from(uniqueTags.values());
  }, [getAllSelectedIndices, photoTagsMap, existingFileTagsMap]);

  // Check if any files are currently selected - MEMOIZED
  const hasSelectedFiles = useCallback((): boolean => {
    return selectedPhotoIndices.size > 0 || selectedExistingIndices.size > 0;
  }, [selectedPhotoIndices.size, selectedExistingIndices.size]);

  // Fetch tags from the API and merge with missing applied tags - MEMOIZED to prevent infinite loops
  const fetchTags = useCallback(async () => {
    if (isLoadingTags) {
      enhancedLog("Tags already loading, skipping duplicate fetch");
      return;
    }

    enhancedLog("Fetching tags from API and checking for missing applied tags");
    setIsLoadingTags(true);
    setFetchError(null);
    
    try {
      const token = await checkLoginWithRefresh();
      if (!token) {
        enhancedLog("No token available for fetching tags");
        setFetchError("Authentication token not available");
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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      enhancedLog("Tags API response:", result);

      if (result.errors) {
        console.error("GraphQL errors:", result.errors);
        enhancedLog(`GraphQL errors: ${JSON.stringify(result.errors)}`);
        setFetchError(`GraphQL errors: ${result.errors.map((e: any) => e.message).join(', ')}`);
        return;
      }

      const fetchedTags = result?.data?.fetchRelations?.items || [];
      
      let transformedTags: TagData[] = fetchedTags.map((tag: APITagResponse) => ({
        id: tag.id,
        tagTitle: tag.tagTitle,
        TagType: tag.TagType,
        points: tag.points,
        createdAt: tag.createdAt,
        updatedAt: tag.updatedAt,
        subtags: tag.subtags?.items?.map((subtag: APISubtagResponse) => ({
          id: subtag.id,
          tagTitle: subtag.tagTitle,
          subtagTitle: subtag.subtagTitle,
          TagType: subtag.TagType,
          points: subtag.points,
          createdAt: subtag.createdAt,
          updatedAt: subtag.updatedAt,
        })) || []
      }));

      enhancedLog(`Fetched ${transformedTags.length} tags from API`);

      // Check for missing applied tags and create them
      const allAppliedTags = extractAllAppliedTags();
      enhancedLog(`Found ${allAppliedTags.length} unique applied tags in file maps`);

      if (allAppliedTags.length > 0) {
        const missingTags = createMissingAppliedTags(transformedTags, allAppliedTags);
        
        if (missingTags.length > 0) {
          enhancedLog(`Created ${missingTags.length} missing tags from applied tags`);
          // Prepend missing tags to the beginning of the list so they're visible first
          transformedTags = [...missingTags, ...transformedTags];
        }
      }

      enhancedLog(`Final tags list: ${transformedTags.length} tags (including ${transformedTags.filter(t => t.isCreatedFromApplied).length} created from applied tags)`);
      setTags(transformedTags);
      hasFetchedTags.current = true;
    } catch (error) {
      console.error("Error fetching tags:", error);
      enhancedLog(`Error fetching tags: ${error}`);
      setFetchError(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setIsLoadingTags(false);
    }
  }, [isLoadingTags, enhancedLog, extractAllAppliedTags, createMissingAppliedTags]);

  // Set displayed tag (for showing subtags) - MEMOIZED
  const setDisplayedTag = useCallback((tagId: string | null) => {
    enhancedLog(`Setting displayed tag: ${tagId}`);
    setDisplayedTagId(tagId);
  }, [enhancedLog]);

  // Get subtags for the displayed tag - MEMOIZED
  const getDisplayedTagSubtags = useCallback((): SubtagData[] => {
    if (!displayedTagId) return [];
    
    const displayedTag = tags.find(t => t.id === displayedTagId);
    return displayedTag?.subtags || [];
  }, [displayedTagId, tags]);

  // Add new tag function
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
      const simulateBackendCall = async () => {
        enhancedLog("PLACEHOLDER: Would send GraphQL mutation to add tag", {
          mutation: ADD_TAG_MUTATION,
          variables: {
            tagInput: {
              tagTitle: tagTitle.trim(),
              TagType,
              points: 1,
              myAccountOwnerItemId: "myAccountOwnerItemId"
            }
          }
        });
        
        await new Promise(resolve => setTimeout(resolve, 500));
        return true;
      };

      const success = await simulateBackendCall();
      
      if (success) {
        const newTag: TagData = {
          id: generateUUID(),
          tagTitle: tagTitle.trim(),
          TagType,
          points: 1,
          createdAt: Math.floor(Date.now() / 1000),
          updatedAt: Math.floor(Date.now() / 1000),
          subtags: []
        };

        setTags(prev => [newTag, ...prev]);
        
        // Auto-apply the new tag to selected files
        toggleTagOnSelectedFiles(newTag);
        setDisplayedTag(newTag.id);
        
        setNewTagTitle('');
        setIsAddingNewTag(false);
        
        enhancedLog(`Successfully added and applied new tag: ${tagTitle}`);
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

  // Add new subtag function
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
      const simulateBackendCall = async () => {
        enhancedLog("PLACEHOLDER: Would send GraphQL mutation to add subtag", {
          mutation: ADD_SUBTAG_MUTATION,
          variables: {
            subtagInput: {
              tagTitle,
              subtagTitle: subtagTitle.trim(),
              TagType,
              points: 1,
              myAccountOwnerItemId: "myAccountOwnerItemId"
            }
          }
        });
        
        await new Promise(resolve => setTimeout(resolve, 500));
        return true;
      };

      const success = await simulateBackendCall();
      
      if (success) {
        const newSubtag: SubtagData = {
          id: generateUUID(),
          tagTitle,
          subtagTitle: subtagTitle.trim(),
          TagType,
          points: 1,
          createdAt: Math.floor(Date.now() / 1000),
          updatedAt: Math.floor(Date.now() / 1000)
        };

        setTags(prev => prev.map(tag => {
          if (tag.id === displayedTagId) {
            return {
              ...tag,
              subtags: [newSubtag, ...(tag.subtags || [])]
            };
          }
          return tag;
        }));
        
        // Auto-apply the new subtag to selected files that have the parent tag
        toggleSubtagOnSelectedFiles(newSubtag);
        
        setNewSubtagTitle('');
        setIsAddingNewSubtag(false);
        
        enhancedLog(`Successfully added and applied new subtag: ${subtagTitle}`);
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

  // Delete tag function
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
      const simulateBackendCall = async () => {
        enhancedLog("PLACEHOLDER: Would send GraphQL mutation to delete tag", {
          mutation: DELETE_TAG_MUTATION,
          variables: { tagId }
        });
        
        await new Promise(resolve => setTimeout(resolve, 500));
        return true;
      };

      const success = await simulateBackendCall();
      
      if (success) {
        const deletedTag = tags.find(tag => tag.id === tagId);
        
        // Remove from local state
        setTags(prev => prev.filter(tag => tag.id !== tagId));
        
        // Remove from all file tag maps
        if (deletedTag) {
          setPhotoTagsMap(prev => {
            const updated = new Map(prev);
            prev.forEach((tags, index) => {
              const filteredTags = tags.filter(t => t.tagTitle !== deletedTag.tagTitle);
              updated.set(index, filteredTags);
            });
            return updated;
          });
          
          setExistingFileTagsMap(prev => {
            const updated = new Map(prev);
            prev.forEach((tags, index) => {
              const filteredTags = tags.filter(t => t.tagTitle !== deletedTag.tagTitle);
              updated.set(index, filteredTags);
            });
            return updated;
          });
        }
        
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

  // Delete subtag function
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
      const simulateBackendCall = async () => {
        enhancedLog("PLACEHOLDER: Would send GraphQL mutation to delete subtag", {
          mutation: DELETE_SUBTAG_MUTATION,
          variables: { subtagId }
        });
        
        await new Promise(resolve => setTimeout(resolve, 500));
        return true;
      };

      const success = await simulateBackendCall();
      
      if (success) {
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
        
        // Remove from all file tag maps
        if (deletedSubtag) {
          setPhotoTagsMap(prev => {
            const updated = new Map(prev);
            prev.forEach((tags, index) => {
              const updatedTags = tags.map(tag => {
                if (tag.tagTitle === deletedSubtag!.tagTitle) {
                  return {
                    ...tag,
                    subtags: tag.subtags.filter(s => s.subtagTitle !== deletedSubtag!.subtagTitle)
                  };
                }
                return tag;
              });
              updated.set(index, updatedTags);
            });
            return updated;
          });
          
          setExistingFileTagsMap(prev => {
            const updated = new Map(prev);
            prev.forEach((tags, index) => {
              const updatedTags = tags.map(tag => {
                if (tag.tagTitle === deletedSubtag!.tagTitle) {
                  return {
                    ...tag,
                    subtags: tag.subtags.filter(s => s.subtagTitle !== deletedSubtag!.subtagTitle)
                  };
                }
                return tag;
              });
              updated.set(index, updatedTags);
            });
            return updated;
          });
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
      const success = await addNewTag(newTagTitle, "File");
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

  // FIXED: Initial fetch on mount - only run once
  useEffect(() => {
    if (!hasFetchedTags.current) {
      fetchTags();
    }
  }, []); // Empty dependency array - only run once

  // FIXED: Smart tag refresh based on applied tags changes
  useEffect(() => {
    // Only check for missing tags if we've already fetched tags initially
    if (!hasFetchedTags.current) return;

    const allAppliedTags = extractAllAppliedTags();
    const appliedTagsHash = JSON.stringify(allAppliedTags.map(t => ({ title: t.tagTitle, subtags: t.subtags.map(s => s.subtagTitle).sort() })));
    
    // Only refetch if the applied tags have actually changed
    if (appliedTagsHash !== lastAppliedTagsHash.current) {
      lastAppliedTagsHash.current = appliedTagsHash;
      
      // Check if there are any applied tags that don't exist in current tags
      const missingAppliedTags = allAppliedTags.filter(appliedTag => 
        !tags.some(tag => tag.tagTitle === appliedTag.tagTitle)
      );
      
      if (missingAppliedTags.length > 0) {
        enhancedLog(`Detected ${missingAppliedTags.length} new applied tags, refreshing tags list`, missingAppliedTags.map(t => t.tagTitle));
        fetchTags();
      }
    }
  }, [photoTagsMap, existingFileTagsMap, tags, extractAllAppliedTags, enhancedLog, fetchTags]);

  // Clear displayed tag if it's no longer applied to all selected files
  useEffect(() => {
    if (displayedTagId) {
      const displayedTag = tags.find(t => t.id === displayedTagId);
      if (displayedTag && !isTagAppliedToSelected(displayedTag)) {
        enhancedLog(`Clearing displayed tag "${displayedTag.tagTitle}" because it's no longer applied to all selected files`);
        setDisplayedTagId(null);
      }
    }
  }, [selectedPhotoIndices.size, selectedExistingIndices.size, displayedTagId, tags, isTagAppliedToSelected, enhancedLog]);

  return {
    // State
    tags,
    displayedTagId,
    isLoadingTags,
    tagIdBeingDeleted,
    subtagIdBeingDeleted,
    fetchError,
    
    // UI state for adding
    isAddingNewTag,
    isAddingNewSubtag,
    newTagTitle,
    newSubtagTitle,
    isSubmittingNewTag,
    isSubmittingNewSubtag,
    
    // Actions
    fetchTags,
    toggleTagOnSelectedFiles,
    toggleSubtagOnSelectedFiles,
    setDisplayedTag,
    
    // Properly memoized getters that update when selection changes
    isTagAppliedToSelected,
    isSubtagAppliedToSelected,
    getDisplayedTagSubtags,
    getAppliedTagsForSelected,
    hasSelectedFiles,
    
    // Add/Remove functions
    addNewTag,
    addNewSubtag,
    deleteTag,
    deleteSubtag,
    
    // UI state management
    startAddingNewTag,
    cancelAddingNewTag,
    startAddingNewSubtag,
    cancelAddingNewSubtag,
    submitNewTag,
    submitNewSubtag,
    setNewTagTitle,
    setNewSubtagTitle,
    
    // Utility functions
    extractAllAppliedTags,
    createMissingAppliedTags
  };
};