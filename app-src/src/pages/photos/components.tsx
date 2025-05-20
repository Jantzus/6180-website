import React from "react";
import { 
  AlbumData, 
} from "@/lib/types";
import { 
  SelectionBanner,
} from "@/styles/styled-components";

// Select Photos Button Component
export const SelectPhotosButton: React.FC<{
  showSelectPhotosButton: boolean;
  albumData: AlbumData | null;
  openFilePicker: () => void;
  t: (key: string) => string;
}> = ({ showSelectPhotosButton, albumData, openFilePicker, t }) => {
  if (!showSelectPhotosButton || !albumData?.usingFolderInviteGrantsRightToAddItems) return null;
  
  return (
    <div style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '20px',
      marginTop: '10px'
    }}>
      <button
        onClick={openFilePicker}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          padding: '12px 20px',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '16px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        <span>{t('Select Photos To Add To Album')}</span>
      </button>
    </div>
  );
};

// Selection Banner Component
export const SelectionModeBanner: React.FC<{
  isSelectionMode: boolean;
  t: (key: string) => string;
}> = ({ isSelectionMode, t }) => {
  if (!isSelectionMode) return null;
  
  return (
    <SelectionBanner>
      <p>{t('Select photos and videos to share')}</p>
    </SelectionBanner>
  );
};