import React from "react";

// Create Album Button Component
type NewAlbumButtonProps = {
  isUploading: boolean;
  isProcessingFiles?: boolean; // NEW: Track if files are being processed
  openFilePicker: (folderId: string | null) => void;
  t: (key: string) => string;
  isRTL: boolean;
};

export const NewAlbumButton: React.FC<NewAlbumButtonProps> = ({ 
  isUploading, 
  isProcessingFiles = false,
  openFilePicker,
  t,
  isRTL
}) => {
  // Button is disabled if uploading OR processing files
  const isDisabled = isUploading || isProcessingFiles;
  
  // Determine button text based on state
  const getButtonText = () => {
    if (isProcessingFiles) return t('Processing...');
    if (isUploading) return t('Uploading...');
    return t('New Album');
  };

  const handleClick = () => {
    // Prevent multiple clicks when disabled
    if (isDisabled) return;
    openFilePicker(null);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        direction: isRTL ? "rtl" : "ltr"
      }}
    >
      <button
        onClick={handleClick}
        style={{
          fontSize: "14px",
          padding: "8px 16px",
          backgroundColor: isDisabled ? "#6c757d" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: isDisabled ? "not-allowed" : "pointer",
          opacity: isDisabled ? 0.6 : 1,
          pointerEvents: isDisabled ? "none" : "auto",
          transition: "all 0.2s ease-in-out",
          minWidth: "120px", // Prevent button from jumping when text changes
          position: "relative",
          overflow: "hidden",
          textAlign: "center"
        }}
        disabled={isDisabled}
        aria-label={getButtonText()}
        title={getButtonText()}
      >
        {/* Button text */}
        <span style={{ 
          display: "inline-block",
          transition: "opacity 0.2s ease-in-out",
          marginRight: isDisabled ? "16px" : "0" // Make space for spinner when disabled
        }}>
          {getButtonText()}
        </span>
        
        {/* Loading indicator */}
        {isDisabled && (
          <div style={{
            position: "absolute",
            top: "50%",
            right: "8px",
            transform: "translateY(-50%)",
            width: "12px",
            height: "12px",
            border: "1.5px solid rgba(255, 255, 255, 0.3)",
            borderTop: "1.5px solid white",
            borderRadius: "50%",
            animation: "spin 1s linear infinite"
          }} />
        )}
      </button>
      
      {/* Add keyframe animation for the loading spinner */}
      <style>
        {`
          @keyframes spin {
            0% { transform: translateY(-50%) rotate(0deg); }
            100% { transform: translateY(-50%) rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};