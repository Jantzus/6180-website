export type LanguageCode = 
'en-US' | 'en' | 
'zh-CN' | 'zh' | 
'fr-FR' | 'fr' | 
'de-DE' | 'de' | 
'es-ES' | 'es' | 
'ru' | 'ja' | 'pt-BR' | 'pt' | 
'it' | 'ko' | 'ar' | 'nl' |
'tr' | 'pl' |
'sv-SE' | 'sv' | 'he' | 'uk' | 'th' | 'vi' | 'cs' | 'ro' | 'fi' | 
'da' | 'hu' | 'id' | 'no' | 'nb' | 'sk' | 'el' | 'hi' | 'fa' | 
'bn' | 'ta' | 'te' | 'kn' | 'ml' | 'mr' | 'ur' | 'zh-HK' | 'zh-TW' | 
'af' | 'az' | 'eu' | 'bg' | 'ca' | 'et' | 'gl' | 'gu' | 'is' | 
'kk' | 'ky' | 'lo' | 'lt' | 'lv' | 'mk' | 'mn' | 'ne' | 'pa' | 
'si' | 'sl' | 'sq' | 'sr' | 'sw' | 'tg' | 'tl' | 'uz' | 'xh' | 
'yo' | 'zu' | 'am' | 'ha' | 'ig' | 'jv' | 'km' | 'my' | 'or' | 
'ps' | 'sd' | 'so' | 'as' | 'bho' | 'br' | 'eo' | 'fy' | 'ga' | 
'gd' | 'mi' | 'mt' | 'nn' | 'rw' | 'sa' | 'sm' | 'st';

export type SelectedPhoto = {
  fileName: string
  s3PreviewUrl: string
  type: string | undefined
  size?: number
  duration?: number | null
  thumbnailDataKey?: string | null
  thumbnailSize?: number | null
  tempKey?: string | null
  tempThumbnailKey?: string | null
  status: UploadStatus
  progress: number
  errorMessage?: string
  fileId?: string  // Added to support existing files from sub-albums
}

export type UploadStatus = 'pending' | 'uploading' | 'processing' | 'complete' | 'error';

export type ProgressTracker = {
  totalFiles: number
  filesComplete: number
  filesUploading: number
  filesProcessing: number
  filesWithError: number
  overallProgress: number
}

export type PasswordPolicyEnum = 'NotVisible' | 'Watermark' | 'CannotBeSaved' | 'NoPassword';

export type FolderPasswordParameters = {
  password?: string;
  policy?: PasswordPolicyEnum;
};

export type FileType = {
  dataKey: string;
  thumbnailDataKey: string | null;
  durationInSeconds: number | null;
};

export interface FolderType {
  folderPositionId: string;
  folderId: string;
  albumNanoId?: string | null;
  folderName?: string;
  folderDescription?: string;
  folderPassword?: {
    password?: string;
    policy?: string;
  };
  creatorId?: string;
  createdAt?: number;
  updatedAt?: number;
  files: Array<{
    dataKey: string;
    thumbnailDataKey?: string;
    durationInSeconds?: number;
  }>;
  profileIds?: string[];
  contacts?: Record<string, string>;
}

export interface File {
  dataKey: string
  thumbnailDataKey: string | null
  durationInSeconds: number | null
}

export interface Folder {
  folderPositionId: string
  folderId: string
  albumNanoId: string | null
  creatorId: string
  folderName: string | null
  folderDescription?: string
  folderPassword?: FolderPasswordParameters
  createdAt: number | null
  updatedAt: number | null
  files: File[]
  profileIds?: string[]
  contacts?: Record<string, string>
  usingFolderInviteGrantsRightToAddItems?: boolean
}

// Types definition for the application

// Media types
export interface MediaItem {
  type: 'image' | 'video';
  fileId: string;
  url: string;
  thumbnailUrl?: string;
  duration?: string;
  ownerName?: string;
  ownerContactId?: string;
  loaded?: boolean;
}

// Contact mapping
export interface Contact {
  [id: string]: string;
}


// Main album data structure
export interface AlbumData {
  mediaItems: MediaItem[];
  albumNanoId: string | null | undefined;  
  folderName: string;
  folderDescription: string;
  creatorId: string | null | undefined;
  contacts: Contact;
  passwordPolicy?: string;
  passwordRequired?: boolean;
  hasPassword?: boolean;
  actualPassword?: string;
  usingFolderInviteGrantsRightToAddItems?: boolean;
  folderPositionId?: string;
  profileIds?: string[];
}

// Props for various components
export interface PhotoPageLazyImageProps {
  src: string;
  thumbnailSrc?: string;
  alt: string;
  className?: string;
  loadFullResolution?: boolean;
  onFullResolutionLoaded?: () => void;
  onClick?: () => void;
  showWatermark?: boolean;
}



export interface ResponsiveHeaderProps {
  addPhotosToAlbum: () => void;
  saveAlbum: () => void;
  downloadPhotos: () => void;
  promptForPassword: () => void;
  showingEnterPassword: boolean;
  passwordPolicy?: string;
  usingFolderInviteGrantsRightToAddItems?: boolean;
  t: (key: string) => string;
}

// GraphQL query
export const FOLDERPOSITION_FIELD = `
  id
  profileIds
  folder {
    id
    albumNanoId
    folderName
    folderDescription
    folderPassword {
      password
      policy
    }
    creatorId
    createdAt
    updatedAt
    fileReferencesPage {
      items {
        file {
          dataKey
          thumbnailDataKey
          durationInSeconds
        }
      }
    }
    contactsUsingInvite {
      items {
        id
        item {
          ... on Persona {
            publicDisplayName
          }
        }
      }
    }
    folderInviteParameters {
      usingFolderInviteGrantsRightToAddItems
    }      
  }
`

export const FETCH_FOLDERS_QUERY = `
  mutation FetchFolderPositions($fetchRelationsInput: FetchRelationsInput!) {
    fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
      items {
        ... on Folder {
          id
          albumNanoId
          folderName
          folderDescription
          creatorId
          createdAt
          updatedAt
          folderPassword {
            password
            policy
          }
          fileReferencesPage {
            items {
              file {
                id
                ownerContactId
                dataKey
                thumbnailDataKey
                durationInSeconds
              }
            }
          }
          contactsUsingInvite {
            items {
              id
              item {
                ... on Persona {
                  publicDisplayName
                }
              }
            }
          }
          folderInviteParameters {
            usingFolderInviteGrantsRightToAddItems
          }
          folderPosition {
            id
            profileIds
          }
        }
      }
      nextToken
    }
  }
`;