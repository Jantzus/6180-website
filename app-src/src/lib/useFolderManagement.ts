import { useState, useEffect } from "react";
import { FolderType, FOLDERPOSITION_FIELD, SelectedTag } from "@/lib/types";
import { AWS_PRIVATE_GRAPHQL_ENDPOINT, LOCAL_STORAGE_KEYS } from "@/lib/config";
import { checkLoginWithRefresh } from "@/lib/utils";

// Add interface for subscription info
interface SubscriptionInfo {
  intNumberOfSubscriptions: number;
  bytesOfDataUsed: number;
  SubscriptionStatus?: string;
}

// GraphQL response type interfaces
interface GraphQLFile {
  dataInBytes?: number;
  dataKey: string;
  thumbnailDataKey?: string;
  durationInSeconds?: number;
}

interface GraphQLTag {
  TagType: string;
  tagTitle: string;
  subtags?: GraphQLSubtag[];
}

interface GraphQLSubtag {
  TagType: string;
  tagTitle: string;
  subtagTitle: string;
}

interface GraphQLFileReference {
  id: string;
  fileDisplayName?: string;
  selectedTags?: GraphQLTag[];
  file: GraphQLFile;
}

interface GraphQLContact {
  id: string;
  item?: {
    publicDisplayName?: string;
  };
}

interface GraphQLFolder {
  id: string;
  albumNanoId?: string;
  folderName?: string;
  folderDescription?: string;
  folderPassword?: {
    password?: string;
    policy?: string;
  };
  creatorId?: string;
  createdAt?: number;
  updatedAt?: number;
  fileReferencesPage?: {
    items?: GraphQLFileReference[];
  };
  contactsUsingInvite?: {
    items?: GraphQLContact[];
  };
  folderInviteParameters?: {
    usingFolderInviteGrantsRightToAddItems?: boolean;
  };
}

interface GraphQLFolderPosition {
  id: string;
  profileIds?: string[];
  folder: GraphQLFolder;
}

interface GraphQLFetchRelationsResponse {
  data?: {
    fetchRelations?: {
      items?: GraphQLFolderPosition[];
    };
  };
  errors?: Array<{ message: string }>;
}

interface GraphQLSubscriptionResponse {
  data?: {
    changeMySubscription?: {
      id: string;
      createdAt: number;
      updatedAt: number;
      stripeCustomerId: string;
      SubscriptionStatus?: string;
      intNumberOfSubscriptions: number;
    };
  };
  errors?: Array<{ message: string }>;
}

// Helper function to calculate total bytes used from all folders
const calculateTotalBytesUsed = (folders: FolderType[]): number => {
  return folders.reduce((total, folder) => {
    const folderBytes = folder.files.reduce((folderTotal, file) => {
      return folderTotal + (file.dataInBytes || 0);
    }, 0);
    return total + folderBytes;
  }, 0);
};

/**
 * Custom hook for folder management functionality
 */
export const useFolderManagement = (log: (message: string) => void) => {
  const [folders, setFolders] = useState<FolderType[]>([]);
  const [filteredFolders, setFilteredFolders] = useState<FolderType[]>([]);
  const [publicUsername, setPublicUsername] = useState<string | null>(null);
  const [cognitoUsername, setCognitoUsername] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isContactFiltered, setIsContactFiltered] = useState<boolean>(false);
  const [isTagFiltered, setIsTagFiltered] = useState<boolean>(false);
  const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionInfo | null>(null);
  const [calculatedBytesUsed, setCalculatedBytesUsed] = useState<number>(0);

  // Calculate total bytes used whenever folders change
  useEffect(() => {
    const totalBytes = calculateTotalBytesUsed(folders);
    setCalculatedBytesUsed(totalBytes);
  }, [folders]);

  // Separate function for subscription info
  const fetchSubscriptionInfo = async (token: string) => {
    try {
      const subscriptionQuery = `
        mutation GetSubscriptionInfo {
          changeMySubscription(getSubscriptionInfoInput: true) {
            ... on SubscriptionInfo {
              id
              createdAt
              updatedAt
              stripeCustomerId
              SubscriptionStatus
              intNumberOfSubscriptions
            }
          }
        }
      `;

      const subscriptionRes = await fetch(AWS_PRIVATE_GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: subscriptionQuery }),
      });

      const subscriptionJson: GraphQLSubscriptionResponse = await subscriptionRes.json();

      if (subscriptionJson.errors) {
        console.error("Subscription GraphQL errors:", subscriptionJson.errors);
        // Don't fail the entire operation if subscription fetch fails
        log(`⚠️ Warning: Failed to fetch subscription info: ${JSON.stringify(subscriptionJson.errors)}`);
        return;
      }

      const subscriptionData = subscriptionJson?.data?.changeMySubscription;
      if (subscriptionData) {
        setSubscriptionInfo({
          intNumberOfSubscriptions: subscriptionData.intNumberOfSubscriptions || 0,
          bytesOfDataUsed: 0, // We'll use calculatedBytesUsed instead
          SubscriptionStatus: subscriptionData.SubscriptionStatus
        });
        log(`✅ Successfully fetched subscription info`);
      }

    } catch (err) {
      console.error("Failed to load subscription info:", err);
      log(`⚠️ Warning: Failed to fetch subscription info: ${String(err)}`);
      // Don't fail the entire operation
    }
  };
  
  // Separated fetchFolders function with two distinct GraphQL calls
  const fetchFolders = async (token: string) => {
    try {
      // FIRST: Fetch folders data only
      const foldersQuery = `
        mutation FetchRelations($fetchRelationsInput: FetchRelationsInput!) {
          fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
            items {
              ... on FolderPosition {
                ${FOLDERPOSITION_FIELD}
              }
            }
          }
        }
      `;

      const variables = {
        fetchRelationsInput: {
          ownerItemId: "myAccountOwnerItemId",
          rangeKeyPrefix: "FolderPosition",
          index: "ownerItemId_____RelationType____sortParameter",
          limit: 2000,
          scanIndexForward: false,
        },
      };

      const foldersRes = await fetch(AWS_PRIVATE_GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: foldersQuery, variables }),
      });

      const foldersJson: GraphQLFetchRelationsResponse = await foldersRes.json();

      if (foldersJson.errors) {
        console.error("Folders GraphQL errors:", foldersJson.errors);
        log(`❌ Failed to fetch folders: ${JSON.stringify(foldersJson.errors)}`);
        return;
      }

      // Process folders data
      const items = foldersJson?.data?.fetchRelations?.items || [];
      const validItems = items.filter((item: GraphQLFolderPosition) => 
        item && 
        item.id && 
        item.folder && 
        item.folder.id
      );

      const parsed: FolderType[] = validItems.map((item: GraphQLFolderPosition) => {
        const folder = item.folder;
        
        // UPDATED: Process fileReferencesPage items to include selectedTags
        const fileReferences = folder?.fileReferencesPage?.items || [];
        
        const files = fileReferences
          .filter((ref: GraphQLFileReference) => ref && ref.file && ref.file.dataKey)
          .map((ref: GraphQLFileReference) => {
            const file = ref.file;
            
            // Parse selectedTags from the reference
            const selectedTags: SelectedTag[] = ref.selectedTags?.map((tag: GraphQLTag) => ({
              TagType: tag.TagType,
              tagTitle: tag.tagTitle,
              subtags: tag.subtags?.map((subtag: GraphQLSubtag) => ({
                TagType: subtag.TagType,
                tagTitle: subtag.tagTitle,
                subtagTitle: subtag.subtagTitle
              })) || []
            })) || [];
            
            return {
              dataKey: file.dataKey,
              thumbnailDataKey: file.thumbnailDataKey || undefined,
              durationInSeconds: file.durationInSeconds || undefined,
              dataInBytes: file.dataInBytes || 0,
              selectedTags: selectedTags,
              fileDisplayName: ref.fileDisplayName || undefined
            };
          });
      
        const contacts: Record<string, string> = {};
        if (folder?.contactsUsingInvite?.items) {
          folder.contactsUsingInvite.items.forEach((contact: GraphQLContact) => {
            if (contact?.id && contact?.item?.publicDisplayName) {
              contacts[contact.id] = contact.item.publicDisplayName;
            }
          });
        }
      
        return {
          folderPositionId: item.id,
          folderId: folder.id,
          albumNanoId: folder.albumNanoId,
          folderName: folder.folderName,
          folderDescription: folder.folderDescription,
          folderPassword: folder.folderPassword,
          creatorId: folder.creatorId,
          createdAt: folder.createdAt,
          updatedAt: folder.updatedAt,
          files: files,
          profileIds: item.profileIds || [],
          contacts: contacts,
          usingFolderInviteGrantsRightToAddItems:
            folder?.folderInviteParameters?.usingFolderInviteGrantsRightToAddItems || false
        };
      });

      setFolders(parsed);
      
      // Log tag statistics for debugging
      const totalAlbums = parsed.length;
      const albumsWithTags = parsed.filter(folder => 
        folder.files.some(file => file.selectedTags && file.selectedTags.length > 0)
      ).length;
      
      log(`✅ Successfully fetched ${totalAlbums} folders, ${albumsWithTags} have tags`);

      // SECOND: Fetch subscription info separately (if needed)
      await fetchSubscriptionInfo(token);

    } catch (err) {
      console.error("Failed to load folders:", err);
      log(`❌ Failed to fetch folders: ${String(err)}`);
    }
  };

  // Load user data and fetch folders
  useEffect(() => {
    setPublicUsername(localStorage.getItem(LOCAL_STORAGE_KEYS.PUBLIC_USERNAME) || null);

    // Use async/await with the new checkLoginWithRefresh function
    const fetchUserAndFolders = async () => {
      const token = await checkLoginWithRefresh();
      if (!token) return;

      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const username = payload["cognito:username"];
        setCognitoUsername(username);
      } catch (err) {
        console.error("Failed to decode token", err);
      }

      await fetchFolders(token);
    };

    fetchUserAndFolders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Initialize filteredFolders with all folders when folders changes
  useEffect(() => {
    if (!isContactFiltered && !isTagFiltered) {
      setFilteredFolders(folders);
    }
  }, [folders, isContactFiltered, isTagFiltered]);

  // Filter folders based on search query
  useEffect(() => {
    if (searchQuery === "") {
      // If no search query but contact or tag filter is active, don't reset
      if (!isContactFiltered && !isTagFiltered) {
        setFilteredFolders(folders);
      }
      return;
    }
    
    // For search filtering, we need to determine the base set of folders to filter from
    // If contact or tag filters are active, we need to recalculate from the original folders
    // and apply all filters together to avoid circular dependencies
    const searchFiltered = folders.filter(folder => {
      const nameMatch = folder.folderName?.toLowerCase().includes(searchQuery.toLowerCase());
      const descMatch = folder.folderDescription?.toLowerCase().includes(searchQuery.toLowerCase());
      return nameMatch || descMatch;
    });
    
    // Apply additional filters only if they are active
    // Note: This will be overridden by handleContactFilterChange/handleTagFilterChange
    // when those filters are active
    if (!isContactFiltered && !isTagFiltered) {
      setFilteredFolders(searchFiltered);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, folders]);

  // Handle contact filter change
  const handleContactFilterChange = (contactFilteredFolders: FolderType[]) => {
    setIsContactFiltered(true);
    setIsTagFiltered(false); // Reset tag filter when contact filter is applied
    
    // Apply search filter on top of contact filter if search query exists
    if (searchQuery) {
      const searchFiltered = contactFilteredFolders.filter(folder => {
        const nameMatch = folder.folderName?.toLowerCase().includes(searchQuery.toLowerCase());
        const descMatch = folder.folderDescription?.toLowerCase().includes(searchQuery.toLowerCase());
        return nameMatch || descMatch;
      });
      setFilteredFolders(searchFiltered);
    } else {
      setFilteredFolders(contactFilteredFolders);
    }
  };

  // Reset contact filter
  const resetContactFilter = () => {
    setIsContactFiltered(false);
    
    // If there's a search query, still filter by that
    if (searchQuery) {
      setFilteredFolders(
        folders.filter(folder => {
          const nameMatch = folder.folderName?.toLowerCase().includes(searchQuery.toLowerCase());
          const descMatch = folder.folderDescription?.toLowerCase().includes(searchQuery.toLowerCase());
          return nameMatch || descMatch;
        })
      );
    } else {
      // Otherwise show all folders
      setFilteredFolders(folders);
    }
  };

  // Handle tag filter change
  const handleTagFilterChange = (tagFilteredFolders: FolderType[]) => {
    setIsTagFiltered(true);
    setIsContactFiltered(false); // Reset contact filter when tag filter is applied
    
    // Apply search filter on top of tag filter if search query exists
    if (searchQuery) {
      const searchFiltered = tagFilteredFolders.filter(folder => {
        const nameMatch = folder.folderName?.toLowerCase().includes(searchQuery.toLowerCase());
        const descMatch = folder.folderDescription?.toLowerCase().includes(searchQuery.toLowerCase());
        return nameMatch || descMatch;
      });
      setFilteredFolders(searchFiltered);
    } else {
      setFilteredFolders(tagFilteredFolders);
    }
  };

  // Reset tag filter
  const resetTagFilter = () => {
    setIsTagFiltered(false);
    
    // If there's a search query, still filter by that
    if (searchQuery) {
      setFilteredFolders(
        folders.filter(folder => {
          const nameMatch = folder.folderName?.toLowerCase().includes(searchQuery.toLowerCase());
          const descMatch = folder.folderDescription?.toLowerCase().includes(searchQuery.toLowerCase());
          return nameMatch || descMatch;
        })
      );
    } else {
      // Otherwise show all folders
      setFilteredFolders(folders);
    }
  };
 
  // Handle deletion confirmation dialog
  const handleDeleteClick = async (folderPositionId: string, t: (key: string) => string) => {
    try {
      console.log("Deleting album with id:", folderPositionId)
      
      // Get a fresh token using the async function
      const token = await checkLoginWithRefresh();
      
      if (!token) {
        console.error("Authentication failed")
        return
      }
      
      const deleteQuery = `
        mutation DeleteFolderPosition($deletedFolderPositionIds: [ID!]) {
          changeFiles(deletedFolderPositionIds: $deletedFolderPositionIds) {
            items {
              ... on IdObject {
                id
              }
            }
          }
        }
      `
      
      const res = await fetch(AWS_PRIVATE_GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          query: deleteQuery, 
          variables: { 
            deletedFolderPositionIds: [folderPositionId] 
          } 
        }),
      })
      
      const json = await res.json()
      
      if (json?.data?.changeFiles?.items) {
        log(`✅ Successfully deleted folder position ${folderPositionId}`)
        // Remove folder from the state
        setFolders(prevFolders => prevFolders.filter(folder => folder.folderPositionId !== folderPositionId))
      } else if (json.errors) {
        const errorMessage = json.errors[0]?.message || "Unknown GraphQL error"
        log(`❌ Failed to delete folder: ${errorMessage}`)
        throw new Error(errorMessage)
      }
    } catch (err) {
      log(`❌ Failed to delete folder: ${String(err)}`)
      console.error("Failed to delete folder:", err)
      alert(t('Failed to delete album. Please try again.'))
    }
  }

  return {
    folders,
    filteredFolders,
    publicUsername,
    cognitoUsername,
    searchQuery,
    setSearchQuery,
    handleContactFilterChange,
    resetContactFilter,
    handleTagFilterChange,
    resetTagFilter,
    handleDeleteClick,
    setFolders,
    subscriptionInfo,
    calculatedBytesUsed
  };
};