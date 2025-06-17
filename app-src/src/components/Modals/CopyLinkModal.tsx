import React from "react";

// Types for the modal components
interface CopyLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  inviteLink: string;
  onCopy: (text: string) => void;
  onCreateSubAlbum?: () => void;
  showCreateSubAlbum?: boolean;
  t: (key: string) => string;
  isRTL: boolean;
}

// CopyLinkModal Component with proper TypeScript types
export const CopyLinkModal: React.FC<CopyLinkModalProps> = ({ 
  isOpen, 
  onClose, 
  inviteLink, 
  onCopy,
  onCreateSubAlbum,
  showCreateSubAlbum = false,
  t,
  isRTL
}) => {
  if (!isOpen) return null;

  // Define textAlign value with proper type
  const textAlignValue: "left" | "right" | "center" = isRTL ? "right" : "left";

  // Common button style with properly typed textAlign
  const buttonStyle = {
    width: "100%",
    padding: "12px",
    margin: "8px 0",
    border: "1px solid #ddd",
    borderRadius: "6px",
    backgroundColor: "#fff",
    textAlign: textAlignValue, // Use the typed value
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.2s"
  };

  return (
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
        zIndex: 1000,
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
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
          direction: isRTL ? "rtl" : "ltr",
          textAlign: textAlignValue, // Use the typed value
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ marginTop: 0, marginBottom: "16px", fontSize: "18px" }}>
          {t('Choose an action')}
        </h3>
        
        {/* Create Sub-Album Button - Only show when specified */}
        {showCreateSubAlbum && onCreateSubAlbum && (
          <button
            style={buttonStyle}
            onClick={(e) => {
              e.stopPropagation(); // Stop event from bubbling up
              onCreateSubAlbum();
            }}
            onMouseOver={(e) => {
              e.stopPropagation(); // Stop mouseOver event bubbling
            e.currentTarget.style.backgroundColor = "#f5f5f5";
            }}
            onMouseOut={(e) => {
              e.stopPropagation(); // Stop mouseOut event bubbling
              e.currentTarget.style.backgroundColor = "#fff";
            }}
          >
            {t('Share Specific Files')}
          </button>
        )}
        
        <button
          style={buttonStyle}
          onClick={(e) => {
            e.stopPropagation(); // Stop event from bubbling up
            onCopy(inviteLink);
          }}
          onMouseOver={(e) => {
            e.stopPropagation(); // Stop mouseOver event bubbling
            e.currentTarget.style.backgroundColor = "#f5f5f5";
          }}
          onMouseOut={(e) => {
            e.stopPropagation(); // Stop mouseOut event bubbling
            e.currentTarget.style.backgroundColor = "#fff";
          }}
        >
          {t('Link Only')}
        </button>
        
        <button
          style={buttonStyle}
          onClick={(e) => {
            e.stopPropagation(); // Stop event from bubbling up
            onCopy(`${t('Here are photos from our event')}: ${inviteLink}`);
          }}
          onMouseOver={(e) => {
            e.stopPropagation(); // Stop mouseOver event bubbling
            e.currentTarget.style.backgroundColor = "#f5f5f5";
          }}
          onMouseOut={(e) => {
            e.stopPropagation(); // Stop mouseOut event bubbling
            e.currentTarget.style.backgroundColor = "#fff";
          }}
        >
          {t('View Album Photos')}
        </button>
        
        <button
          style={buttonStyle}
          onClick={(e) => {
            e.stopPropagation(); // Stop event from bubbling up
            onCopy(`${t('Please add any photos from our event here')}: ${inviteLink}`);
          }}
          onMouseOver={(e) => {
            e.stopPropagation(); // Stop mouseOver event bubbling
            e.currentTarget.style.backgroundColor = "#f5f5f5";
          }}
          onMouseOut={(e) => {
            e.stopPropagation(); // Stop mouseOut event bubbling
            e.currentTarget.style.backgroundColor = "#fff";
          }}
        >
          {t('Add Photos To Album')}
        </button>
        
        <button
          style={{
            ...buttonStyle,
            backgroundColor: "#f0f0f0",
            marginTop: "16px"
          }}
          onClick={(e) => {
            e.stopPropagation(); // Stop event from bubbling up
            onClose();
          }}
          onMouseOver={(e) => {
            e.stopPropagation(); // Stop mouseOver event bubbling
            e.currentTarget.style.backgroundColor = "#e0e0e0";
          }}
          onMouseOut={(e) => {
            e.stopPropagation(); // Stop mouseOut event bubbling
            e.currentTarget.style.backgroundColor = "#f0f0f0";
          }}
        >
          {t('Cancel')}
        </button>
      </div>
    </div>
  );
};