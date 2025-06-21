// MultipleAlbumsManager.tsx - Updated to remove individual column controls since we have global control
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n";
import { SelectedPhoto, PasswordPolicyEnum } from "@/lib/types";
import { AlbumItem } from "./AlbumItem"; // Import the full AlbumItem component

// Interface for applied tags (matching the type used in save-album.tsx)
interface AppliedTag {
  tagTitle: string;
  TagType: string;
  subtags: { tagTitle: string; subtagTitle: string; }[];
}

// Styled components for multiple albums
const AlbumsContainer = styled.div<{ $isRTL: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 32px;
  direction: ${props => props.$isRTL ? 'rtl' : 'ltr'};
`;

// Interface for album data
export interface AlbumData {
  id: string;
  name: string;
  description: string;
  photos: (SelectedPhoto & { albumName?: string })[];
  selectedPhotoIndices: Set<number>;
  photoTagsMap: Map<number, AppliedTag[]>;
  isOnPublicProfile: boolean;
  participantsCanAddItems: boolean;
  participantsCanDeleteItems: boolean;
  passwordProtectionOption: PasswordPolicyEnum;
  albumPassword: string;
  isSaving: boolean;
  savingProgress: number;
  folderId: string;
}

interface MultipleAlbumsManagerProps {
  albums: AlbumData[];
  setAlbums: React.Dispatch<React.SetStateAction<AlbumData[]>>;
  isSavingAny: boolean;
  onSaveAlbum: (albumId: string) => void;
  onRemoveAlbum: (albumId: string) => void;
  columns: string;
  setColumns: (columns: string) => void; // This is passed but not used individually anymore
  enhancedLog: (message: string, data?: any) => void;
}

export const MultipleAlbumsManager: React.FC<MultipleAlbumsManagerProps> = ({
  albums,
  setAlbums,
  isSavingAny,
  onSaveAlbum,
  onRemoveAlbum,
  columns,
  setColumns,
  enhancedLog
}) => {
  const { language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";

  // Update album data
  const updateAlbum = useCallback((albumId: string, updates: Partial<AlbumData>) => {
    setAlbums(prev => prev.map(album => 
      album.id === albumId ? { ...album, ...updates } : album
    ));
  }, [setAlbums]);

  return (
    <div>
      {/* Albums list - Using imported AlbumItem with simplified functionality */}
      <AlbumsContainer $isRTL={isRTL}>
        {albums.map((album) => (
          <AlbumItem
            key={album.id}
            album={album}
            onUpdate={(updates) => updateAlbum(album.id, updates)}
            onSave={() => onSaveAlbum(album.id)}
            onRemove={() => onRemoveAlbum(album.id)}
            disabled={isSavingAny}
            columns={columns} // Global columns value
            setColumns={setColumns} // Kept for compatibility but not used individually
            enhancedLog={enhancedLog}
          />
        ))}
      </AlbumsContainer>
    </div>
  );
};