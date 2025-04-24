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

export type FileType = {
  dataKey: string;
  thumbnailDataKey: string | null;
  durationInSeconds: number | null;
};

export type FolderType = {
  folderPositionId: string;
  folderId: string;
  creatorId: string;
  folderName: string | null;
  createdAt: number | null;
  updatedAt: number | null;
  files: FileType[];
};

export interface File {
  dataKey: string
  thumbnailDataKey: string | null
  durationInSeconds: number | null
}

export interface Folder {
  folderPositionId: string
  folderId: string
  creatorId: string
  folderName: string | null
  createdAt: number | null
  updatedAt: number | null
  files: File[]
}