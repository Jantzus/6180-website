// MultipleAlbumsManager.tsx - Updated to support real save functionality - Fixed TypeScript errors
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n";
import { SelectedPhoto, PasswordPolicyEnum } from "@/lib/types";
import { AlbumItem } from "./AlbumItem";

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

// Interface for album data - Fixed: replaced any with SelectedPhoto
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
  onSaveAlbum: (albumId: string) => Promise<boolean>; // Updated to return Promise<boolean>
  onRemoveAlbum: (albumId: string) => void;
  onShowPasswordDialog: (albumId: string) => void;
  columns: string;
  setColumns: (columns: string) => void;
  enhancedLog: (message: string, data?: unknown) => void; // Fixed: changed any to unknown
}

export const MultipleAlbumsManager: React.FC<MultipleAlbumsManagerProps> = ({
  albums,
  setAlbums,
  isSavingAny,
  onSaveAlbum,
  onRemoveAlbum,
  onShowPasswordDialog,
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

  // Handle individual album save
  const handleSaveAlbum = useCallback(async (albumId: string) => {
    try {
      const success = await onSaveAlbum(albumId);
      enhancedLog(`Album ${albumId} save result: ${success ? 'success' : 'failed'}`);
      return success;
    } catch (error) {
      enhancedLog(`Error saving album ${albumId}: ${error}`);
      return false;
    }
  }, [onSaveAlbum, enhancedLog]);

  return (
    <div>
      {/* Albums list */}
      <AlbumsContainer $isRTL={isRTL}>
        {albums.map((album) => (
          <AlbumItem
            key={album.id}
            album={album}
            onUpdate={(updates) => updateAlbum(album.id, updates)}
            onSave={() => handleSaveAlbum(album.id)}
            onRemove={() => onRemoveAlbum(album.id)}
            onShowPasswordDialog={onShowPasswordDialog}
            disabled={isSavingAny}
            columns={columns}
            setColumns={setColumns}
            enhancedLog={enhancedLog}
          />
        ))}
      </AlbumsContainer>
    </div>
  );
};