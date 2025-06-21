// album-types.ts - Shared types and interfaces for album functionality
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