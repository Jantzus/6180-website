// album-types.ts - All TypeScript interfaces and types for album functionality
import { PasswordPolicyEnum } from "@/lib/types";

// Interface for existing files
export interface ExistingFile {
  dataKey: string;
  thumbnailDataKey: string | null;
  durationInSeconds: number | null;
  dataInBytes: number;
  fileName?: string;
}

// Interface for applied tags
export interface AppliedTag {
  tagTitle: string;
  TagType: string;
  subtags: { tagTitle: string; subtagTitle: string; }[];
}

// Consolidated file state to avoid complex state synchronization
export interface FileState {
  selectedPhotoIndices: Set<number>;
  photoTagsMap: Map<number, AppliedTag[]>;
  selectedExistingIndices: Set<number>;
  existingFileTagsMap: Map<number, AppliedTag[]>;
}

// Global settings interface
export interface GlobalSettings {
  isOnPublicProfile: boolean;
  participantsCanAddItems: boolean;
  participantsCanDeleteItems: boolean;
  passwordProtectionOption: PasswordPolicyEnum;
  albumPassword: string;
}

// NEW: Enhanced interface for sub-album data
export interface SubAlbumData {
  isSubAlbum: boolean;
  selectedFileIds: string[];
  selectedPhotos?: any[]; // Using any[] to avoid circular dependency with SelectedPhoto
}

// NEW: Additional types for tag support
export interface SelectedTagInput {
  TagType: string;
  tagTitle: string;
  subtags: SelectedSubtagInput[];
}

export interface SelectedSubtagInput {
  TagType: string;
  tagTitle: string;
  subtagTitle: string;
}

// NEW: Interface for file reference input (updated to include tags and fileDisplayName)
export interface FileReferenceInput {
  fileReferencesHolderId: string;
  currentTime: number;
  points: number;
  hasBeenDeleted: boolean;
  selectedTagInputs: SelectedTagInput[];
  fileId: string;
  fileDisplayName?: string;  // Add fileDisplayName support
  fileInput: any | null;
}