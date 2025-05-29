import { useState, useEffect } from "react";
import { FolderType, FOLDERPOSITION_FIELD } from "@/lib/types";
import { AWS_PRIVATE_GRAPHQL_ENDPOINT, LOCAL_STORAGE_KEYS } from "@/lib/config";
import { checkLoginWithRefresh } from "@/lib/utils";

// Add interface for subscription info
interface SubscriptionInfo {
  intNumberOfSubscriptions: number;
  bytesOfDataUsed: number;
  SubscriptionStatus?: string;
}

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
  const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionInfo>({
    intNumberOfSubscriptions: 0,
    bytesOfDataUsed: 0
  });

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
  }, []);

  // Initialize filteredFolders with all folders when folders changes
  useEffect(() => {
    if (!isContactFiltered) {
      setFilteredFolders(folders);
    }
  }, [folders, isContactFiltered]);

  // Filter folders based on search query
  useEffect(() => {
    if (searchQuery === "") {
      // If no search query but contact filter is active, don't reset
      if (!isContactFiltered) {
        setFilteredFolders(folders);
      }
      return;
    }
    
    // Apply search filter on top of current folders (either all or contact-filtered)
    const basefolders = isContactFiltered ? filteredFolders : folders;
    
    const searchFiltered = basefolders.filter(folder => {
      const nameMatch = folder.folderName?.toLowerCase().includes(searchQuery.toLowerCase());
      const descMatch = folder.folderDescription?.toLowerCase().includes(searchQuery.toLowerCase());
      return nameMatch || descMatch;
    });
    
    setFilteredFolders(searchFiltered);
  }, [searchQuery, folders, isContactFiltered]);

  // Handle contact filter change
  const handleContactFilterChange = (contactFilteredFolders: FolderType[]) => {
    setIsContactFiltered(true);
    setFilteredFolders(contactFilteredFolders);
    
    // If there's also a search query, apply that filter too
    if (searchQuery) {
      setFilteredFolders(prevFiltered => 
        prevFiltered.filter(folder => {
          const nameMatch = folder.folderName?.toLowerCase().includes(searchQuery.toLowerCase());
          const descMatch = folder.folderDescription?.toLowerCase().includes(searchQuery.toLowerCase());
          return nameMatch || descMatch;
        })
      );
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
  
  // Separated fetchFolders function to use with the token
  const fetchFolders = async (token: string) => {
    const query = `
      mutation FetchRelations($relationIds: [ID!], $fetchRelationsInput: FetchRelationsInput!) {
        batchGetItems(relationIds: $relationIds) {
            items {
                id
                item {
                    ... on SubscriptionInfo {
                      id
                      createdAt
                      updatedAt
                      stripeCustomerId
                      SubscriptionStatus
                      intNumberOfSubscriptions
                      bytesOfDataUsed
                    }
                }
            }
            nextToken
        }      
        fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
          items {
            ... on FolderPosition {
              ${FOLDERPOSITION_FIELD}
            }
          }
        }
      }
    `

    const variables = {
      relationIds: [ "myAccountOwnerItemId_____myAccountOwnerItemId____SubscriptionInfo" ],
      fetchRelationsInput: {
        ownerItemId: "myAccountOwnerItemId",
        rangeKeyPrefix: "FolderPosition",
        index: "ownerItemId_____RelationType____sortParameter",
        limit: 50,
        scanIndexForward: false,
      },
    }

    try {
      const res = await fetch(AWS_PRIVATE_GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query, variables }),
      })

      const json = await res.json()

      // Extract subscription info from batchGetItems
      const subscriptionItems = json?.data?.batchGetItems?.items || [];
      if (subscriptionItems.length > 0) {
        const subscriptionData = subscriptionItems[0]?.item;
        if (subscriptionData) {
          setSubscriptionInfo({
            intNumberOfSubscriptions: subscriptionData.intNumberOfSubscriptions || 0,
            bytesOfDataUsed: subscriptionData.bytesOfDataUsed || 0,
            SubscriptionStatus: subscriptionData.SubscriptionStatus
          });
        }
      }

      const items = json?.data?.fetchRelations?.items || []

      const parsed: FolderType[] = items.map((item: any) => {
        const folder = item.folder
        const rawFiles = folder?.fileReferencesPage?.items?.map((ref: any) => ref.file) || []
        
        // Properly map files with explicit field preservation
        const files = rawFiles
          .filter((f: any) => f && f.dataKey)
          .map((file: any) => ({
            dataKey: file.dataKey,
            thumbnailDataKey: file.thumbnailDataKey || null,
            durationInSeconds: file.durationInSeconds || null,
            dataInBytes: file.dataInBytes || 0 // Explicitly preserve dataInBytes with fallback to 0
          }));
        
        // Extract contacts from contactsUsingInvite
        const contacts: Record<string, string> = {};
        if (folder?.contactsUsingInvite?.items) {
          folder.contactsUsingInvite.items.forEach((contact: any) => {
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
          files: files, // Use the properly mapped files array
          profileIds: item.profileIds || [], // Include profileIds from the item
          contacts: contacts, // Include the contacts map
          usingFolderInviteGrantsRightToAddItems: 
            folder?.folderInviteParameters?.usingFolderInviteGrantsRightToAddItems || false
        }
      })

      setFolders(parsed)
    } catch (err) {
      console.error("Failed to load folders:", err)
      log(`❌ Failed to fetch folders: ${String(err)}`)
    }
  }

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
    handleDeleteClick,
    setFolders,
    subscriptionInfo // Add subscription info to return values
  };
};