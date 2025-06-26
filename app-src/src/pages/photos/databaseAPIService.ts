import { 
  S3_BUCKET_URL, 
  AWS_PUBLIC_GRAPHQL_ENDPOINT, 
  AWS_PUBLIC_API_KEY, 
  AWS_PRIVATE_GRAPHQL_ENDPOINT 
} from '@/lib/config';
import { FETCH_FOLDERS_QUERY } from '@/lib/types';
import { AlbumData, MediaItem, Contact } from '@/lib/types';
import { formatTime } from '@/lib/utils';
import { checkLoginWithoutRedirect } from "@/lib/utils";
import { RawAPIResponse } from './rawApiTypes';

// Type definitions for API response structure
interface Subtag {
  TagType: string;
  tagTitle: string;
  subtagTitle: string;
}

interface Tag {
  TagType: string;
  tagTitle: string;
  subtags?: Subtag[];
}

interface FileData {
  id: string;
  dataKey: string;
  thumbnailDataKey?: string;
  durationInSeconds?: number;
  ownerContactId?: string;
}

interface FileReference {
  file: FileData;
  fileDisplayName?: string;
  selectedTags?: Tag[];
}

interface ContactItem {
  id: string;
  item: {
    publicDisplayName: string;
  };
}

interface FolderPassword {
  policy?: string;
  password?: string;
}

interface FolderInviteParameters {
  usingFolderInviteGrantsRightToAddItems?: boolean;
}

interface FolderData {
  id: string;
  albumNanoId?: string;
  folderName?: string;
  creatorId?: string;
  folderDescription?: string;
  folderPassword?: FolderPassword;
  folderInviteParameters?: FolderInviteParameters;
  contactsUsingInvite?: {
    items: ContactItem[];
  };
  fileReferencesPage?: {
    items: FileReference[];
  };
  folderPosition?: {
    id: string;
    profileIds?: string[];
  };
}

interface APIResponseData {
  fetchRelations: {
    items: FolderData[];
  };
}

interface APIResponse {
  data?: APIResponseData;
}

// Process data returned from API - DEBUG VERSION (kept for backward compatibility)
export const processData = (
  json: APIResponse, 
  setFolderId?: (id: string | null) => void
): AlbumData => {
  console.log('🔄 processData called with raw JSON:', JSON.stringify(json, null, 2));
  
  const items = json?.data?.fetchRelations?.items || [];
  console.log('📊 Items found:', items.length);
  console.log('📊 Items details:', JSON.stringify(items, null, 2));
  
  const mediaItems: MediaItem[] = [];
  const contacts: Contact = {};
  let folderName = 'Photos';
  let albumNanoId: string | null | undefined = undefined;
  let creatorId: string | null | undefined = undefined;
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
    console.log('📁 Processing folder:', JSON.stringify(folder, null, 2));
    
    // Save the folder ID if setter is provided
    if (setFolderId && folder?.id) {
      console.log('🆔 Setting folder ID:', folder.id);
      setFolderId(folder.id);
    }
    
    // Get albumNanoId if available
    if (folder?.albumNanoId) {
      albumNanoId = folder.albumNanoId;
      console.log('🏷️ Album nano ID found:', albumNanoId);
    }
    
    // Get folder name if available
    if (folder?.folderName && folder.folderName.length > 0) {
      folderName = folder.folderName;
      console.log('📝 Folder name found:', folderName);
    }
    
    // Get creator ID if available
    if (folder?.creatorId && folder.creatorId.length > 0) {
      creatorId = folder.creatorId;
      console.log('👤 Creator ID found:', creatorId);
    }

    // Get folder description if available
    if (folder?.folderDescription && folder.folderDescription.length > 0) {
      folderDescription = folder.folderDescription;
      console.log('📄 Folder description found:', folderDescription);
    }
    
    // Get password policy and the actual password
    if (folder?.folderPassword) {
      console.log('🔐 Folder password object found:', JSON.stringify(folder.folderPassword, null, 2));
      
      if (folder.folderPassword.policy) {
        passwordPolicy = folder.folderPassword.policy;
        console.log('🔒 Password policy:', passwordPolicy);
        
        // Check if password is required
        passwordRequired = passwordPolicy !== 'NoPassword';
        console.log('🔑 Password required:', passwordRequired);
      }
      
      // Store the actual password if it exists
      if (folder.folderPassword.password && passwordPolicy !== 'NoPassword') {
        hasPassword = true;
        actualPassword = folder.folderPassword.password;
        console.log('🗝️ Actual password found (length):', actualPassword.length);
      }
    }
    
    // Extract the usingFolderInviteGrantsRightToAddItems property
    if (folder?.folderInviteParameters) {
      console.log('📨 Folder invite parameters found:', JSON.stringify(folder.folderInviteParameters, null, 2));
      usingFolderInviteGrantsRightToAddItems = !!folder.folderInviteParameters.usingFolderInviteGrantsRightToAddItems;
      console.log('➕ Using folder invite grants right to add items:', usingFolderInviteGrantsRightToAddItems);
    }
    
    // Build contacts map
    const contactItems = items[0]?.contactsUsingInvite?.items || [];
    console.log('👥 Processing contacts:', contactItems.length);
    contactItems.forEach((contact: ContactItem, index: number) => {
      console.log(`👤 Contact ${index}:`, JSON.stringify(contact, null, 2));
      if (contact?.id && contact?.item?.publicDisplayName) {
        contacts[contact.id] = contact.item.publicDisplayName;
        console.log(`✅ Added contact: ${contact.id} -> ${contact.item.publicDisplayName}`);
      }
    });
    
    // Get media items and filter duplicates by dataKey
    const fileReferences = folder?.fileReferencesPage?.items || [];
    console.log('📸 Processing file references:', fileReferences.length);
    
    fileReferences.forEach((ref: FileReference, index: number) => {
      console.log(`📄 File reference ${index}:`, JSON.stringify(ref, null, 2));
      
      const file = ref?.file;
      if (!file?.dataKey) {
        console.log(`❌ Skipping file reference ${index} - no dataKey`);
        return;
      }

      const { id, dataKey, thumbnailDataKey, durationInSeconds, ownerContactId } = file;
      // Extract fileDisplayName from the reference level, not file level
      const refFileDisplayName = ref.fileDisplayName;
      console.log(`📂 Processing file: ID=${id}, dataKey=${dataKey}, thumbnailDataKey=${thumbnailDataKey}, duration=${durationInSeconds}, owner=${ownerContactId}, refFileDisplayName=${refFileDisplayName}`);
      
      // Skip this item if we've already seen this dataKey
      if (uniqueDataKeys.has(dataKey)) {
        console.log(`⚠️ Duplicate dataKey found, skipping: ${dataKey}`);
        return;
      }
      
      // Add to our set of seen dataKeys
      uniqueDataKeys.add(dataKey);
      
      // ✅ CRITICAL FIX: Parse selectedTags from the reference
      console.log(`🔍 Raw selectedTags for file ${id}:`, ref.selectedTags);
      
      const selectedTags = ref.selectedTags?.map((tag: Tag) => ({
        TagType: tag.TagType,
        tagTitle: tag.tagTitle,
        subtags: tag.subtags?.map((subtag: Subtag) => ({
          TagType: subtag.TagType,
          tagTitle: subtag.tagTitle,
          subtagTitle: subtag.subtagTitle
        })) || []
      })) || [];
      
      console.log(`🏷️ Processed selectedTags for file ${id}:`, selectedTags);
      console.log(`📊 Number of tags:`, selectedTags.length);
      
      // Extract fileDisplayName from reference level or fall back to a generated name
      const displayName = refFileDisplayName || 
        (dataKey.split('/').pop()?.split('.')[0]) || 
        `file-${index}`;
      
      console.log(`📝 File display name: ${displayName}`);
      
      const url = `${S3_BUCKET_URL}${dataKey}`;
      const thumbnailUrl = thumbnailDataKey ? `${S3_BUCKET_URL}${thumbnailDataKey}` : undefined;

      if (dataKey.startsWith("Input/Image/")) {
        const imageItem = { 
          type: "image" as const, 
          fileId: id,
          url,
          thumbnailUrl: thumbnailUrl || url,
          ownerContactId: ownerContactId,
          fileDisplayName: displayName,
          loaded: false,
          selectedTags: selectedTags // ✅ ADD selectedTags to image items
        };
        
        // ✅ ADDITIONAL DEBUG: Log the complete imageItem
        console.log('🖼️ Complete image item with tags:', {
          fileId: imageItem.fileId,
          type: imageItem.type,
          fileDisplayName: imageItem.fileDisplayName,
          tagCount: imageItem.selectedTags?.length || 0,
          tags: imageItem.selectedTags
        });
        
        mediaItems.push(imageItem);
        console.log('✅ Successfully added image item to mediaItems array');
      } else if (dataKey.startsWith("Input/Video/")) {
        const videoItem = {
          type: "video" as const,
          fileId: id,
          url,
          thumbnailUrl: thumbnailUrl || url,
          duration: formatTime(durationInSeconds),
          ownerContactId: ownerContactId,
          fileDisplayName: displayName,
          loaded: false,
          selectedTags: selectedTags // ✅ ADD selectedTags to video items
        };
        
        console.log('🎥 Complete video item with tags:', {
          fileId: videoItem.fileId,
          type: videoItem.type,
          fileDisplayName: videoItem.fileDisplayName,
          tagCount: videoItem.selectedTags?.length || 0,
          tags: videoItem.selectedTags
        });
        
        mediaItems.push(videoItem);
        console.log('✅ Successfully added video item to mediaItems array');
      } else {
        console.log(`❓ Unknown file type for dataKey: ${dataKey}`);
      }
    });
  } else {
    console.log('❌ No items found in API response');
  }
  
  const result = { 
    mediaItems, 
    folderName, 
    albumNanoId,
    creatorId,
    folderDescription, 
    contacts, 
    passwordPolicy,
    passwordRequired,
    hasPassword,
    actualPassword,
    usingFolderInviteGrantsRightToAddItems
  };
  
  // ✅ ENHANCED DEBUG: Log detailed info about the final result
  console.log('✅ processData final result summary:', {
    mediaItemsCount: result.mediaItems.length,
    mediaItemsWithTags: result.mediaItems.filter(item => item.selectedTags && item.selectedTags.length > 0).length,
    firstItemTags: result.mediaItems[0]?.selectedTags?.length || 0,
    totalTagsAcrossAllItems: result.mediaItems.reduce((total, item) => total + (item.selectedTags?.length || 0), 0)
  });
  
  // Log first few items with their tags and display names
  result.mediaItems.slice(0, 3).forEach((item, index) => {
    console.log(`📋 Item ${index} details:`, {
      fileId: item.fileId,
      fileDisplayName: item.fileDisplayName,
      tagCount: item.selectedTags?.length || 0,
      tags: item.selectedTags?.map(tag => `${tag.tagTitle}(${tag.subtags.length})`) || []
    });
  });
  
  console.log('✅ processData final result:', JSON.stringify(result, null, 2));
  return result;
};

// NEW: Fetch folder data with dual API approach - returns raw API response
export const fetchFolderRawAPIResponse = async (
  searchType: 'targetItemIdentifier' | 'albumNanoId',
  identifier: string, 
  setFolderId?: (id: string | null) => void
): Promise<RawAPIResponse | null> => {
  console.log(`🔍 fetchFolderRawAPIResponse called with ${searchType}:`, identifier);
  
  try {
    // Create the input for the query format
    let fetchRelationsInput: Record<string, unknown>;
    
    if (searchType === 'targetItemIdentifier') {
      fetchRelationsInput = {
        targetItemIdentifier____RelationType: `${identifier}____Folder`,
        index: "targetItemIdentifier____RelationType",
        limit: 1,
        scanIndexForward: false,
        nextToken: null
      };
    } else {
      fetchRelationsInput = {
        albumNanoId: identifier,
        index: "albumNanoId",
        limit: 1,
        scanIndexForward: false,
        nextToken: null
      };
    }

    const variables = {
      fetchRelationsInput: fetchRelationsInput
    };
    
    console.log('📤 Query variables:', JSON.stringify(variables, null, 2));
    
    // First, use the public API to get a quick response
    console.log('🌐 Making public API call...');
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
    console.log('🔒 Checking private API availability...');
    const privateApiPromise = (async () => {
      const token = await checkLoginWithoutRedirect();
      console.log('🎫 Token available:', !!token);
      
      if (!token) {
        console.log('❌ No token - skipping private API');
        return null; // User is not logged in
      }
      
      console.log('🌐 Making private API call...');
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
    console.log('⏳ Waiting for public API response...');
    const publicResult = await publicApiPromise;
    console.log('📥 Public API raw response:', JSON.stringify(publicResult, null, 2));
    
    let finalResult = publicResult;
    
    // Set folder ID from public result if available
    if (setFolderId && publicResult?.data?.fetchRelations?.items?.[0]?.id) {
      console.log('🆔 Setting folder ID from public API:', publicResult.data.fetchRelations.items[0].id);
      setFolderId(publicResult.data.fetchRelations.items[0].id);
    }
    
    // Then wait for the private API (if available)
    console.log('⏳ Waiting for private API response...');
    const privateResult = await privateApiPromise;
    
    if (privateResult) {
      console.log('📥 Private API raw response:', JSON.stringify(privateResult, null, 2));
      
      const folderPosition = privateResult?.data?.fetchRelations?.items?.[0]?.folderPosition;
      console.log('📍 Folder position found:', !!folderPosition);
      console.log('📍 Folder position details:', JSON.stringify(folderPosition, null, 2));
      
      if (folderPosition) {
        // Enhance the public result with folder position data
        finalResult = { ...privateResult };
        console.log('🔄 Using enhanced private data');
        
        // Set folder ID from private result if available
        if (setFolderId && privateResult?.data?.fetchRelations?.items?.[0]?.id) {
          console.log('🆔 Setting folder ID from private API:', privateResult.data.fetchRelations.items[0].id);
          setFolderId(privateResult.data.fetchRelations.items[0].id);
        }
      } else {
        console.log('❌ No folder position in private API response');
      }
    } else {
      console.log('❌ No private API response (user not logged in or API failed)');
    }
    
    console.log('✅ Final raw API response:', JSON.stringify(finalResult, null, 2));
    return finalResult as RawAPIResponse;
  } catch (error) {
    console.error('💥 Error in fetchFolderRawAPIResponse:', error);
    return null;
  }
};

// Legacy functions for backward compatibility
export const fetchFolderUsingTargetItemIdentifier = async (
  targetItemIdentifier: string, 
  setFolderId?: (id: string | null) => void
): Promise<AlbumData | null> => {
  console.log('🔍 fetchFolderUsingTargetItemIdentifier called with:', targetItemIdentifier);
  
  try {
    // Create the input for the new query format
    const fetchRelationsInput = {
      targetItemIdentifier____RelationType: `${targetItemIdentifier}____Folder`,
      index: "targetItemIdentifier____RelationType",
      limit: 1,
      scanIndexForward: false,
      nextToken: null
    };

    const variables = {
      fetchRelationsInput: fetchRelationsInput
    };
    
    console.log('📤 Query variables:', JSON.stringify(variables, null, 2));
    
    // First, use the public API to get a quick response
    console.log('🌐 Making public API call...');
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
    console.log('🔒 Checking private API availability...');
    const privateApiPromise = (async () => {
      const token = await checkLoginWithoutRedirect();
      console.log('🎫 Token available:', !!token);
      
      if (!token) {
        console.log('❌ No token - skipping private API');
        return null; // User is not logged in
      }
      
      console.log('🌐 Making private API call...');
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
    console.log('⏳ Waiting for public API response...');
    const publicResult = await publicApiPromise;
    console.log('📥 Public API raw response:', JSON.stringify(publicResult, null, 2));
    
    let initialData = processData(publicResult, setFolderId);
    console.log('🔄 Processed public data:', JSON.stringify(initialData, null, 2));
    
    // Then wait for the private API (if available)
    console.log('⏳ Waiting for private API response...');
    const privateResult = await privateApiPromise;
    
    if (privateResult) {
      console.log('📥 Private API raw response:', JSON.stringify(privateResult, null, 2));
      
      const folderPosition = privateResult?.data?.fetchRelations?.items?.[0]?.folderPosition;
      console.log('📍 Folder position found:', !!folderPosition);
      console.log('📍 Folder position details:', JSON.stringify(folderPosition, null, 2));
      
      if (folderPosition) {
        const privateData = processData(privateResult, setFolderId);
        console.log('🔄 Processed private data (before enhancement):', JSON.stringify(privateData, null, 2));
        
        // Set a more flexible flag indicating the presence of a folderPosition
        privateData.folderPositionId = folderPosition?.id;
        privateData.profileIds = folderPosition?.profileIds;
        
        console.log('🔄 Enhanced private data:', JSON.stringify(privateData, null, 2));
        initialData = privateData;
      } else {
        console.log('❌ No folder position in private API response');
      }
    } else {
      console.log('❌ No private API response (user not logged in or API failed)');
    }
    
    console.log('✅ Final return data:', JSON.stringify(initialData, null, 2));
    return initialData;
  } catch (error) {
    console.error('💥 Error in fetchFolderUsingTargetItemIdentifier:', error);
    return null;
  }
};

// Fetch folder data with dual API approach
export const fetchFolderUsingAlbumNanoId = async (
  albumNanoId: string, 
  setFolderId?: (id: string | null) => void
): Promise<AlbumData | null> => {
  try {
    // Create the input for the new query format
    const fetchRelationsInput = {
      albumNanoId: albumNanoId,
      index: "albumNanoId",
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
      
      const folderPosition = privateResult?.data?.fetchRelations?.items?.[0]?.folderPosition;
      
      if (folderPosition) {
        const privateData = processData(privateResult, setFolderId);
        
        // Set a more flexible flag indicating the presence of a folderPosition
        privateData.folderPositionId = folderPosition?.id;
        privateData.profileIds = folderPosition?.profileIds

        initialData = privateData;
      }
    }
    
    return initialData;
  } catch (error) {
    console.error('Error fetching folder data:', error);
    return null;
  }
};