interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: (key: string) => string;
  isRTL: boolean;
}

// Confirmation Modal Component with proper TypeScript types
export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ 
  isOpen, 
  onClose, 
  t,
  isRTL
}) => {
  if (!isOpen) return null;

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
          textAlign: isRTL ? "right" : "left" as const, // Use as const to fix type issue
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ marginTop: 0, marginBottom: "16px", fontSize: "18px" }}>
          {t('Link to album website copied.')}
        </h3>
        
        <button
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            backgroundColor: "#f0f0f0",
            textAlign: "center" as const, // Use as const to fix type issue
            cursor: "pointer",
            fontSize: "14px"
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
          {t('OK')}
        </button>
      </div>
    </div>
  );
};