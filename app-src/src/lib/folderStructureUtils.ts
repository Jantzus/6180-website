import { SelectedPhoto } from "@/lib/types";

// Interface for folder structure
export interface FolderStructure {
  name: string;
  files: File[];
  subfolders: FolderStructure[];
  path: string;
}

// Interface for album groups
export interface AlbumGroup {
  name: string;
  selectedPhotos: SelectedPhoto[];
  folderPath: string;
}

// Interface for folder structure metadata
interface FolderStructureMetadata {
  folderStructure: FolderStructure;
  userChoice: 'separate' | 'combined';
  filePathMap: Map<string, string>; // Maps both file.name AND originalFileName to folder paths
}

// Storage keys
const FOLDER_STRUCTURE_METADATA_KEY = 'folderStructureMetadata';
const USER_ALBUM_PREFERENCE_KEY = 'albumCreationPreference';

// Generate a UUID (simple version)
export const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// ENHANCED: Filter out system files and invalid files
const isValidMediaFile = (file: File): boolean => {
  // Filter out .DS_Store and other system files
  if (file.name.startsWith('.DS_Store') || 
      file.name.startsWith('._') || 
      file.name.startsWith('Thumbs.db') ||
      file.name.startsWith('.') ||
      file.name === 'desktop.ini') {
    console.log(`🚫 Filtering out system file: ${file.name}`);
    return false;
  }
  
  // Check if it's a valid media file
  const validTypes = /\.(jpg|jpeg|png|gif|bmp|webp|svg|mp4|mov|avi|wmv|flv|webm|mkv)$/i;
  if (!validTypes.test(file.name)) {
    console.log(`🚫 Filtering out non-media file: ${file.name}`);
    return false;
  }
  
  // Check file size (optional - avoid 0 byte files)
  if (file.size === 0) {
    console.log(`🚫 Filtering out empty file: ${file.name}`);
    return false;
  }
  
  return true;
};

/**
 * Analyzes the folder structure from a list of files
 */
export const analyzeFolderStructure = (files: File[]): FolderStructure | null => {
  if (!files || files.length === 0) {
    return null;
  }

  // ENHANCED: Filter valid files first
  const validFiles = files.filter(isValidMediaFile);
  console.log(`📁 Filtered ${validFiles.length} valid files out of ${files.length} total files`);
  
  if (validFiles.length === 0) {
    console.log('📁 No valid media files found after filtering');
    return null;
  }

  // Check if files have webkitRelativePath (indicating folder upload)
  const filesWithPaths = validFiles.filter(file => 
    file.webkitRelativePath && 
    typeof file.webkitRelativePath === 'string' && 
    file.webkitRelativePath.includes('/')
  );

  if (filesWithPaths.length === 0) {
    // No folder structure detected
    console.log('📁 No folder structure detected in valid files');
    return null;
  }

  // Build folder structure
  const folderMap = new Map<string, FolderStructure>();
  const rootFolderName = filesWithPaths[0].webkitRelativePath.split('/')[0];
  
  // Initialize root folder
  const rootFolder: FolderStructure = {
    name: rootFolderName,
    files: [],
    subfolders: [],
    path: rootFolderName
  };

  filesWithPaths.forEach(file => {
    const pathParts = file.webkitRelativePath.split('/');
    
    if (pathParts.length === 2) {
      // File is in root folder
      rootFolder.files.push(file);
    } else if (pathParts.length > 2) {
      // File is in a subfolder
      const subfolderPath = pathParts.slice(0, -1).join('/');
      const subfolderName = pathParts[1]; // First level subfolder name
      
      if (!folderMap.has(subfolderName)) {
        const subfolder: FolderStructure = {
          name: subfolderName,
          files: [],
          subfolders: [],
          path: subfolderPath
        };
        folderMap.set(subfolderName, subfolder);
        rootFolder.subfolders.push(subfolder);
      }
      
      const subfolder = folderMap.get(subfolderName)!;
      subfolder.files.push(file);
    }
  });

  console.log(`📁 Built folder structure: root(${rootFolder.files.length}) + ${rootFolder.subfolders.length} subfolders`);
  return rootFolder;
};

/**
 * Checks if the folder structure has meaningful level 1 subfolders
 */
export const hasLevel1Subfolders = (folderStructure: FolderStructure): boolean => {
  if (!folderStructure || !folderStructure.subfolders) {
    return false;
  }

  // Check if there are at least 2 subfolders with files
  const subfoldersWithFiles = folderStructure.subfolders.filter(subfolder => 
    subfolder.files && subfolder.files.length > 0
  );

  return subfoldersWithFiles.length >= 2;
};

/**
 * ENHANCED: Stores folder structure metadata with improved filename mapping
 */
export const storeFolderStructureMetadata = (
  folderStructure: FolderStructure, 
  userChoice: 'separate' | 'combined',
  files: File[]
): void => {
  try {
    // ENHANCED: Create comprehensive filename mapping
    const filePathMap = new Map<string, string>();
    
    // Filter to only valid media files
    const validFiles = files.filter(isValidMediaFile);
    console.log(`💾 Storing metadata for ${validFiles.length} valid files`);
    
    validFiles.forEach(file => {
      if (file.webkitRelativePath && typeof file.webkitRelativePath === 'string') {
        const pathParts = file.webkitRelativePath.split('/');
        if (pathParts.length > 1) {
          const folderPath = pathParts.slice(0, -1).join('/');
          
          // Store mapping for both file.name and potential variations
          filePathMap.set(file.name, folderPath);
          
          // Also store with path variations that might be used later
          const fileNameWithoutPath = pathParts[pathParts.length - 1];
          if (fileNameWithoutPath !== file.name) {
            filePathMap.set(fileNameWithoutPath, folderPath);
          }
          
          console.log(`💾 Mapped "${file.name}" -> "${folderPath}"`);
        }
      }
    });

    const metadata: FolderStructureMetadata = {
      folderStructure,
      userChoice,
      filePathMap
    };

    // Convert Map to array for JSON storage
    const storageData = {
      folderStructure: metadata.folderStructure,
      userChoice: metadata.userChoice,
      filePathMap: Array.from(metadata.filePathMap.entries())
    };

    sessionStorage.setItem(FOLDER_STRUCTURE_METADATA_KEY, JSON.stringify(storageData));
    
    console.log(`✅ Stored folder structure metadata with ${filePathMap.size} file mappings`);
  } catch (error) {
    console.error('❌ Error storing folder structure metadata:', error);
  }
};

/**
 * Retrieves folder structure metadata from sessionStorage
 */
export const getFolderStructureMetadata = (): FolderStructureMetadata | null => {
  try {
    const stored = sessionStorage.getItem(FOLDER_STRUCTURE_METADATA_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored);
    
    // Reconstruct the Map from the stored array
    const filePathMap = new Map<string, string>(parsed.filePathMap || []);
    
    return {
      folderStructure: parsed.folderStructure,
      userChoice: parsed.userChoice,
      filePathMap
    };
  } catch (error) {
    console.error('❌ Error retrieving folder structure metadata:', error);
    return null;
  }
};

/**
 * Clears folder structure metadata from sessionStorage
 */
export const clearFolderStructureMetadata = (): void => {
  try {
    sessionStorage.removeItem(FOLDER_STRUCTURE_METADATA_KEY);
    console.log('✅ Cleared folder structure metadata');
  } catch (error) {
    console.error('❌ Error clearing folder structure metadata:', error);
  }
};

/**
 * Gets user's album creation preference for this session
 */
export const getUserAlbumPreference = (): 'separate' | 'combined' | null => {
  try {
    const preference = sessionStorage.getItem(USER_ALBUM_PREFERENCE_KEY);
    return preference as 'separate' | 'combined' | null;
  } catch (error) {
    console.error('❌ Error getting user album preference:', error);
    return null;
  }
};

/**
 * Sets user's album creation preference for this session
 */
export const setUserAlbumPreference = (preference: 'separate' | 'combined'): void => {
  try {
    sessionStorage.setItem(USER_ALBUM_PREFERENCE_KEY, preference);
    console.log(`✅ Set user album preference: ${preference}`);
  } catch (error) {
    console.error('❌ Error setting user album preference:', error);
  }
};

/**
 * Clears user's album creation preference
 */
export const clearUserAlbumPreference = (): void => {
  try {
    sessionStorage.removeItem(USER_ALBUM_PREFERENCE_KEY);
    console.log('✅ Cleared user album preference');
  } catch (error) {
    console.error('❌ Error clearing user album preference:', error);
  }
};

/**
 * ENHANCED: Creates album groups from selected photos with improved filtering and mapping
 */
export const createAlbumGroupsFromSelectedPhotos = (selectedPhotos: SelectedPhoto[]): AlbumGroup[] => {
  try {
    // ENHANCED: Filter out system files from selectedPhotos first
    const validSelectedPhotos = selectedPhotos.filter(photo => {
      const fileName = photo.originalFileName || photo.fileName;
      const isValid = fileName && 
                     !fileName.startsWith('.DS_Store') && 
                     !fileName.startsWith('._') && 
                     !fileName.startsWith('Thumbs.db') &&
                     !fileName.startsWith('.') &&
                     fileName !== 'desktop.ini';
      
      if (!isValid) {
        console.log(`🚫 Filtering out system file from selectedPhotos: ${fileName}`);
      }
      
      return isValid;
    });
    
    console.log(`📦 Filtered ${validSelectedPhotos.length} valid photos out of ${selectedPhotos.length} total`);
    
    if (validSelectedPhotos.length === 0) {
      console.log('📦 No valid photos after filtering, returning empty');
      return [];
    }

    const metadata = getFolderStructureMetadata();
    if (!metadata) {
      console.log('📁 No folder structure metadata found, creating single album group');
      return [{
        name: 'New Album',
        selectedPhotos: validSelectedPhotos,
        folderPath: ''
      }];
    }

    const { folderStructure, userChoice, filePathMap } = metadata;
    
    if (userChoice === 'combined') {
      console.log('📁 User chose combined mode, creating single album group');
      return [{
        name: folderStructure.name || 'New Album',
        selectedPhotos: validSelectedPhotos,
        folderPath: folderStructure.path
      }];
    }

    // Separate mode: group photos by folder
    const albumGroups = new Map<string, AlbumGroup>();
    console.log(`📁 Processing ${validSelectedPhotos.length} photos in separate mode`);
    console.log(`📁 Available file path mappings: ${filePathMap.size}`);
    
    validSelectedPhotos.forEach((photo, index) => {
      // ENHANCED: Try multiple filename variations for lookup
      const possibleNames = [
        photo.originalFileName,
        photo.fileName,
        // Try without any path prefixes
        photo.originalFileName?.split('/').pop(),
        photo.fileName?.split('/').pop()
      ].filter(Boolean);
      
      let folderPath = '';
      let albumName = 'Unsorted';
      let foundMapping = false;
      
      // Try each possible filename
      for (const fileName of possibleNames) {
        if (fileName && filePathMap.has(fileName)) {
          folderPath = filePathMap.get(fileName)!;
          foundMapping = true;
          console.log(`📁 Found mapping for "${fileName}" -> "${folderPath}"`);
          
          const pathParts = folderPath.split('/');
          if (pathParts.length >= 2) {
            // Use the first level subfolder name as album name
            albumName = pathParts[1];
          } else {
            // File is in root folder
            albumName = pathParts[0] || 'Root';
          }
          break;
        }
      }
      
      if (!foundMapping) {
        console.log(`⚠️ No folder path found for photo ${index}: ${possibleNames.join(', ')}`);
        console.log(`⚠️ Available mappings:`, Array.from(filePathMap.keys()).slice(0, 5));
      }

      // Get or create album group
      if (!albumGroups.has(albumName)) {
        albumGroups.set(albumName, {
          name: albumName,
          selectedPhotos: [],
          folderPath
        });
        console.log(`📦 Created new album group: "${albumName}"`);
      }

      const albumGroup = albumGroups.get(albumName)!;
      albumGroup.selectedPhotos.push(photo);
    });

    const result = Array.from(albumGroups.values());
    console.log(`📦 Created ${result.length} album groups in separate mode`);
    
    // Enhanced logging for debugging
    result.forEach((group, index) => {
      console.log(`📦 Album ${index + 1}: "${group.name}" with ${group.selectedPhotos.length} photos`);
      if (group.selectedPhotos.length <= 3) {
        // Log filenames for small groups
        group.selectedPhotos.forEach(photo => {
          console.log(`   📄 ${photo.originalFileName || photo.fileName}`);
        });
      }
    });

    // ENHANCED: Filter out empty albums
    const nonEmptyAlbums = result.filter(album => album.selectedPhotos.length > 0);
    if (nonEmptyAlbums.length !== result.length) {
      console.log(`📦 Filtered out ${result.length - nonEmptyAlbums.length} empty albums`);
    }

    return nonEmptyAlbums;
  } catch (error) {
    console.error('❌ Error creating album groups:', error);
    // Fallback to single album with filtered photos
    const validPhotos = selectedPhotos.filter(photo => {
      const fileName = photo.originalFileName || photo.fileName;
      return fileName && 
             !fileName.startsWith('.DS_Store') && 
             !fileName.startsWith('._') &&
             !fileName.startsWith('.');
    });
    
    return [{
      name: 'New Album',
      selectedPhotos: validPhotos,
      folderPath: ''
    }];
  }
};

/**
 * Utility function to extract folder name from file path
 */
export const extractFolderNameFromPath = (filePath: string): string => {
  if (!filePath) return 'Root';
  
  const pathParts = filePath.split('/');
  if (pathParts.length >= 2) {
    return pathParts[1]; // First level subfolder
  }
  
  return pathParts[0] || 'Root';
};

/**
 * Utility function to check if a file belongs to a specific folder
 */
export const doesFileMatchFolder = (fileName: string, folderName: string, filePathMap: Map<string, string>): boolean => {
  const filePath = filePathMap.get(fileName);
  if (!filePath) return false;
  
  const extractedFolderName = extractFolderNameFromPath(filePath);
  return extractedFolderName === folderName;
};

/**
 * ENHANCED: Groups files by their folder structure with system file filtering
 */
export const groupFilesByFolder = (files: File[]): Map<string, File[]> => {
  const folderGroups = new Map<string, File[]>();
  
  // Filter valid files first
  const validFiles = files.filter(isValidMediaFile);
  
  validFiles.forEach(file => {
    let folderName = 'Root';
    
    if (file.webkitRelativePath && typeof file.webkitRelativePath === 'string') {
      const pathParts = file.webkitRelativePath.split('/');
      if (pathParts.length >= 2) {
        folderName = pathParts[1]; // First level subfolder
      } else {
        folderName = pathParts[0] || 'Root';
      }
    }
    
    if (!folderGroups.has(folderName)) {
      folderGroups.set(folderName, []);
    }
    
    folderGroups.get(folderName)!.push(file);
  });
  
  return folderGroups;
};

/**
 * Validates folder structure for album creation
 */
export const validateFolderStructureForAlbums = (folderStructure: FolderStructure): boolean => {
  if (!folderStructure) return false;
  
  // Check if we have meaningful subfolders
  if (!hasLevel1Subfolders(folderStructure)) {
    return false;
  }
  
  // Check if subfolders have enough files to warrant separate albums
  const minFilesPerAlbum = 1;
  const validSubfolders = folderStructure.subfolders.filter(subfolder => 
    subfolder.files && subfolder.files.length >= minFilesPerAlbum
  );
  
  return validSubfolders.length >= 2;
};

/**
 * Gets statistics about the folder structure
 */
export const getFolderStructureStats = (folderStructure: FolderStructure): {
  totalFiles: number;
  totalSubfolders: number;
  filesInRoot: number;
  filesInSubfolders: number;
  averageFilesPerSubfolder: number;
} => {
  const stats = {
    totalFiles: 0,
    totalSubfolders: folderStructure.subfolders?.length || 0,
    filesInRoot: folderStructure.files?.length || 0,
    filesInSubfolders: 0,
    averageFilesPerSubfolder: 0
  };
  
  // Count files in subfolders
  if (folderStructure.subfolders) {
    folderStructure.subfolders.forEach(subfolder => {
      const subfolderFileCount = subfolder.files?.length || 0;
      stats.filesInSubfolders += subfolderFileCount;
    });
  }
  
  stats.totalFiles = stats.filesInRoot + stats.filesInSubfolders;
  
  if (stats.totalSubfolders > 0) {
    stats.averageFilesPerSubfolder = Math.round(stats.filesInSubfolders / stats.totalSubfolders);
  }
  
  return stats;
};

/**
 * Determines the recommended album creation mode based on folder structure
 */
export const getRecommendedAlbumMode = (folderStructure: FolderStructure): 'separate' | 'combined' => {
  if (!folderStructure || !hasLevel1Subfolders(folderStructure)) {
    return 'combined';
  }
  
  const stats = getFolderStructureStats(folderStructure);
  
  // If most files are in the root, recommend combined
  if (stats.filesInRoot > stats.filesInSubfolders) {
    return 'combined';
  }
  
  // If there are many small subfolders, recommend combined
  if (stats.totalSubfolders > 10 || stats.averageFilesPerSubfolder < 3) {
    return 'combined';
  }
  
  // Otherwise, recommend separate albums
  return 'separate';
};