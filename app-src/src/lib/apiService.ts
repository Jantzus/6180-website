import { 
  S3_BUCKET_URL, 
  AWS_PUBLIC_GRAPHQL_ENDPOINT, 
  AWS_PUBLIC_API_KEY, 
  AWS_PRIVATE_GRAPHQL_ENDPOINT 
} from '@/lib/config';
import { FETCH_FOLDERS_QUERY } from '@/lib/types';
import { AlbumData, MediaItem, Contact } from '@/lib/types';
import { formatTime } from './utils';
import { checkLoginWithoutRedirect } from "@/lib/utils";

// Process data returned from API
export const processData = (
  json: any, 
  setFolderId?: (id: string | null) => void
): AlbumData => {
  const items = json?.data?.fetchRelations?.items || [];
  const mediaItems: MediaItem[] = [];
  const contacts: Contact = {};
  let folderName = 'Photos';
  let folderDescription = '';
  let passwordPolicy = undefined;
  let passwordRequired = false;
  let hasPassword = false;
  let actualPassword = undefined;
  let usingFolderInviteGrantsRightToAddItems = false;
  
  // Set to track unique dataKeys
  const uniqueDataKeys = new Set<string>();
  
  if (items.length > 0) {
    const folder = items[0];
    
    // Save the folder ID if setter is provided
    if (setFolderId && folder?.id) {
      setFolderId(folder.id);
    }
    
    // Get folder name if available
    if (folder?.folderName && folder.folderName.length > 0) {
      folderName = folder.folderName;
    }
    
    // Get folder description if available
    if (folder?.folderDescription && folder.folderDescription.length > 0) {
      folderDescription = folder.folderDescription;
    }
    
    // Get password policy and the actual password
    if (folder?.folderPassword) {
      if (folder.folderPassword.policy) {
        passwordPolicy = folder.folderPassword.policy;
        
        // Check if password is required
        passwordRequired = passwordPolicy !== 'NoPassword';
      }
      
      // Store the actual password if it exists
      if (folder.folderPassword.password && passwordPolicy !== 'NoPassword') {
        hasPassword = true;
        actualPassword = folder.folderPassword.password;
      }
    }
    
    // Extract the usingFolderInviteGrantsRightToAddItems property
    if (folder?.folderInviteParameters) {
      usingFolderInviteGrantsRightToAddItems = !!folder.folderInviteParameters.usingFolderInviteGrantsRightToAddItems;
    }
    
    // Build contacts map
    (items[0]?.contactsUsingInvite?.items || []).forEach((contact: any) => {
      if (contact?.id && contact?.item?.publicDisplayName) {
        contacts[contact.id] = contact.item.publicDisplayName;
      }
    });
    
    // Get media items and filter duplicates by dataKey
    (folder?.fileReferencesPage?.items || []).forEach((ref: any) => {
      const file = ref?.file;
      if (!file?.dataKey) return;

      const { id, dataKey, thumbnailDataKey, durationInSeconds, ownerContactId } = file;
      
      // Skip this item if we've already seen this dataKey
      if (uniqueDataKeys.has(dataKey)) {
        return;
      }
      
      // Add to our set of seen dataKeys
      uniqueDataKeys.add(dataKey);
      
      const url = `${S3_BUCKET_URL}${dataKey}`;
      const thumbnailUrl = thumbnailDataKey ? `${S3_BUCKET_URL}${thumbnailDataKey}` : undefined;

      if (dataKey.startsWith("Input/Image/")) {
        mediaItems.push({ 
          type: "image", 
          fileId: id,
          url,
          thumbnailUrl: thumbnailUrl || url,
          ownerId: ownerContactId,
          loaded: false
        });
      } else if (dataKey.startsWith("Input/Video/")) {
        mediaItems.push({
          type: "video",
          fileId: id,
          url,
          thumbnailUrl: thumbnailUrl || url,
          duration: formatTime(durationInSeconds),
          ownerId: ownerContactId,
          loaded: false
        });
      }
    });
  }
  
  return { 
    mediaItems, 
    folderName, 
    folderDescription, 
    contacts, 
    passwordPolicy,
    passwordRequired,
    hasPassword,
    actualPassword,
    usingFolderInviteGrantsRightToAddItems
  };
};

// Fetch folder data with dual API approach
export const fetchFolder = async (
  suffix: string, 
  setFolderId?: (id: string | null) => void
): Promise<AlbumData | null> => {
  try {
    // Create the input for the new query format
    const fetchRelationsInput = {
      targetItemIdentifier____RelationType: `${suffix}____Folder`,
      index: "targetItemIdentifier____RelationType",
      limit: 1,
      scanIndexForward: false,
      nextToken: null
    };

    const variables = {
      fetchRelationsInput: fetchRelationsInput
    };
    
    // First, use the public API to get a quick response
    const publicApiPromise = fetch(AWS_PUBLIC_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': AWS_PUBLIC_API_KEY
      },
      body: JSON.stringify({
        query: FETCH_FOLDERS_QUERY,
        variables: variables
      })
    }).then(response => response.json());
    
    // In parallel, try to use the private API if the user is logged in
    const privateApiPromise = (async () => {
      const token = await checkLoginWithoutRedirect();
      if (!token) {
        return null; // User is not logged in
      }
      
      // User is logged in, use private API for richer data
      return fetch(AWS_PRIVATE_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          query: FETCH_FOLDERS_QUERY,
          variables: variables
        })
      }).then(response => response.json());
    })();
    
    // Wait for the public API to respond first
    const publicResult = await publicApiPromise;
    let initialData = processData(publicResult, setFolderId);
    
    // Then wait for the private API (if available)
    const privateResult = await privateApiPromise;
    if (privateResult) {
      
      const folderPosition = privateResult?.data?.fetchRelations?.items?.[0]?.folderPosition?.id;
      
      const privateData = processData(privateResult, setFolderId);
      if (folderPosition) {
        initialData = privateData;
      }
    }
    
    return initialData;
  } catch (error) {
    console.error('Error fetching folder data:', error);
    return null;
  }
};