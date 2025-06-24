import React from "react";
import ReactDOM from "react-dom";

// Types for the modal components
interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  inviteLink: string;
  onCopy: (text: string) => void;
  onCreateSubAlbum?: () => void;
  onShowQRCode?: () => void;
  onDownload?: () => void;
  showCreateSubAlbum?: boolean;
  showQRCode?: boolean;
  showDownload?: boolean;
  t: (key: string) => string;
  isRTL: boolean;
}

// ShareModal Component with React Portal and proper TypeScript types
export const ShareModal: React.FC<ShareModalProps> = ({ 
  isOpen, 
  onClose, 
  inviteLink, 
  onCopy,
  onCreateSubAlbum,
  onShowQRCode,
  onDownload,
  showCreateSubAlbum = false,
  showQRCode = true,
  showDownload = true,
  t,
  isRTL
}) => {
  if (!isOpen) return null;

  // Common button style with center alignment
  const buttonStyle = {
    width: "100%",
    padding: "12px",
    margin: "8px 0",
    border: "1px solid #ddd",
    borderRadius: "6px",
    backgroundColor: "#fff",
    textAlign: "center" as const, // Center aligned buttons
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.2s"
  };

  const modalContent = (
    <div 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10000, // Increased z-index to ensure it's above everything
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)", // Safari support
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "20px",
          width: "90%",
          maxWidth: "400px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          direction: isRTL ? "rtl" : "ltr",
          textAlign: "center", // Center aligned content
          position: "relative",
          animation: "modalFadeIn 0.2s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ 
          marginTop: 0, 
          marginBottom: "16px", 
          fontSize: "18px",
          color: "#333",
          fontWeight: "600",
          textAlign: isRTL ? "right" : "left" // Leading side alignment for title
        }}>
          {t('Choose an action')}
        </h3>
        
        {/* Create Sub-Album Button - Only show when specified */}
        {showCreateSubAlbum && onCreateSubAlbum && (
          <button
            style={buttonStyle}
            onClick={(e) => {
              e.stopPropagation();
              onCreateSubAlbum();
            }}
            onMouseOver={(e) => {
              e.stopPropagation();
              e.currentTarget.style.backgroundColor = "#f5f5f5";
            }}
            onMouseOut={(e) => {
              e.stopPropagation();
              e.currentTarget.style.backgroundColor = "#fff";
            }}
          >
            {t('Share Specific Files')}
          </button>
        )}

        {/* Show QR Code Button */}
        {showQRCode && onShowQRCode && (
          <button
            style={{
              ...buttonStyle,
              backgroundColor: "#4caf50",
              color: "white",
              border: "none"
            }}
            onClick={(e) => {
              e.stopPropagation();
              onShowQRCode();
            }}
            onMouseOver={(e) => {
              e.stopPropagation();
              e.currentTarget.style.backgroundColor = "#45a049";
            }}
            onMouseOut={(e) => {
              e.stopPropagation();
              e.currentTarget.style.backgroundColor = "#4caf50";
            }}
          >
            {t('Show QR Code')}
          </button>
        )}

        {/* Download Button */}
        {showDownload && onDownload && (
          <button
            style={{
              ...buttonStyle,
              backgroundColor: "#2196f3",
              color: "white",
              border: "none"
            }}
            onClick={(e) => {
              e.stopPropagation();
              onDownload();
            }}
            onMouseOver={(e) => {
              e.stopPropagation();
              e.currentTarget.style.backgroundColor = "#1976d2";
            }}
            onMouseOut={(e) => {
              e.stopPropagation();
              e.currentTarget.style.backgroundColor = "#2196f3";
            }}
          >
            {t('Download')}
          </button>
        )}
        
        {/* Copy Link Button */}
        <button
          style={buttonStyle}
          onClick={(e) => {
            e.stopPropagation();
            onCopy(inviteLink);
          }}
          onMouseOver={(e) => {
            e.stopPropagation();
            e.currentTarget.style.backgroundColor = "#f5f5f5";
          }}
          onMouseOut={(e) => {
            e.stopPropagation();
            e.currentTarget.style.backgroundColor = "#fff";
          }}
        >
          {t('Copy Link')}
        </button>
        
        {/* Cancel Button */}
        <button
          style={{
            ...buttonStyle,
            backgroundColor: "#f0f0f0",
            marginTop: "16px"
          }}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          onMouseOver={(e) => {
            e.stopPropagation();
            e.currentTarget.style.backgroundColor = "#e0e0e0";
          }}
          onMouseOut={(e) => {
            e.stopPropagation();
            e.currentTarget.style.backgroundColor = "#f0f0f0";
          }}
        >
          {t('Cancel')}
        </button>
      </div>
      
      {/* Add CSS animation styles */}
      <style>
        {`
          @keyframes modalFadeIn {
            from {
              opacity: 0;
              transform: scale(0.9) translateY(-10px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
        `}
      </style>
    </div>
  );

  // Use React Portal to render the modal at the document body level
  return ReactDOM.createPortal(modalContent, document.body);
};