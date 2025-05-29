import React from "react";

// Create Album Button Component
type NewAlbumButtonProps = {
  isUploading: boolean;
  openFilePicker: (folderId: string | null) => void;
  t: (key: string) => string;
  isRTL: boolean;
};

export const NewAlbumButton: React.FC<NewAlbumButtonProps> = ({ 
  isUploading, 
  openFilePicker,
  t
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%"
      }}
    >
      <button
        onClick={() => openFilePicker(null)}
        style={{
          fontSize: "14px",
          padding: "8px 16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          opacity: isUploading ? 0.6 : 1,
          pointerEvents: isUploading ? "none" : "auto"
        }}
        disabled={isUploading}
      >
        {isUploading ? t('Uploading...') : t('New Album')}
      </button>
    </div>
  );
};