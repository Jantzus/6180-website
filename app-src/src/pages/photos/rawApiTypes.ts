// rawApiTypes.ts - Types for the actual API response structure

export interface RawSelectedTag {
  TagType: string;
  tagTitle: string;
  subtags: Array<{
    TagType: string;
    tagTitle: string;
    subtagTitle: string;
  }>;
}

export interface RawFileReference {
  fileDisplayName: string | null;
  selectedTags: RawSelectedTag[];
  file: {
    id: string;
    ownerContactId: string;
    dataKey: string;
    thumbnailDataKey: string | null;
    durationInSeconds: number | null;
    dataInBytes: number;
  };
}

export interface RawContact {
  id: string;
  item: {
    publicDisplayName: string;
  };
}

export interface RawFolderPassword {
  password?: string;
  policy?: string;
}

export interface RawFolderInviteParameters {
  usingFolderInviteGrantsRightToAddItems: boolean;
}

export interface RawFolderPosition {
  id: string;
  profileIds: string[];
}

export interface RawFolderItem {
  id: string;
  albumNanoId: string;
  folderName: string | null;
  folderDescription: string | null;
  creatorId: string;
  createdAt: number;
  updatedAt: number;
  folderPassword: RawFolderPassword | null;
  fileReferencesPage: {
    items: RawFileReference[];
  };
  contactsUsingInvite: {
    items: RawContact[];
  };
  folderInviteParameters: RawFolderInviteParameters;
  folderPosition?: RawFolderPosition | null;
}

export interface RawAPIResponse {
  data: {
    fetchRelations: {
      items: RawFolderItem[];
      nextToken: string | null;
    };
  };
}

// Props interface for AlbumPageStatic
export interface AlbumPageStaticProps {
  rawAPIResponse: RawAPIResponse | null;
  folderId: string | null;
  cognitoUsername: string | null;
}