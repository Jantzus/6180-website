import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  albumLink: string;
  t: (key: string) => string;
  isRTL: boolean;
}

// QRCodeModal Component with React Portal
export const QRCodeModal: React.FC<QRCodeModalProps> = ({ 
  isOpen, 
  onClose, 
  albumLink,
  t,
  isRTL
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isOpen || !isClient) return null;

  // Generate QR code URL using QR Server API (free service, no API key needed)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(albumLink)}`;

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
        zIndex: 10000,
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "32px",
          width: "90%",
          maxWidth: "400px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          direction: isRTL ? "rtl" : "ltr",
          textAlign: "center",
          position: "relative",
          animation: "modalFadeIn 0.3s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ 
          marginTop: 0, 
          marginBottom: "16px", 
          fontSize: "20px",
          color: "#333",
          fontWeight: "600"
        }}>
          {t('Share Album with QR Code')}
        </h3>
        
        <p style={{
          margin: "0 0 24px 0",
          fontSize: "14px",
          color: "#666",
          lineHeight: "1.5"
        }}>
          {t('Let others scan this QR code with their phone camera to instantly access your album')}
        </p>

        {/* QR Code Container */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "24px",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "12px",
          border: "1px solid #e9ecef"
        }}>
          <img 
            src={qrCodeUrl}
            alt={t('QR Code for album')}
            style={{
              width: "200px",
              height: "200px",
              border: "4px solid white",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}
            onError={(e) => {
              // Fallback if QR code fails to load
              e.currentTarget.style.display = 'none';
              const container = e.currentTarget.parentElement;
              if (container) {
                container.innerHTML = `
                  <div style="
                    width: 200px; 
                    height: 200px; 
                    background: #f0f0f0; 
                    border-radius: 8px; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center;
                    color: #666;
                    font-size: 14px;
                    text-align: center;
                    padding: 20px;
                    box-sizing: border-box;
                  ">
                    ${t('QR Code could not be generated. Please use the link sharing option instead.')}
                  </div>
                `;
              }
            }}
          />
        </div>

        {/* Instructions */}
        <div style={{
          backgroundColor: "#e8f4f8",
          padding: "16px",
          borderRadius: "8px",
          marginBottom: "24px",
          border: "1px solid #b3e0f2"
        }}>
          <p style={{
            margin: "0 0 8px 0",
            fontSize: "13px",
            color: "#0c5460",
            fontWeight: "600"
          }}>
            {t('How to scan:')}
          </p>
          <p style={{
            margin: 0,
            fontSize: "12px",
            color: "#0c5460",
            lineHeight: "1.4",
            textAlign: isRTL ? "right" : "left"
          }}>
            • {t('open your phone camera app (or use any QR code scanner app)')}<br/>
            • {t('point camera at the QR code')}<br/>
            • {t('tap the notification that appears')}<br/>
          </p>
        </div>

        {/* Album Link Display */}
        <div style={{
          backgroundColor: "#f8f9fa",
          padding: "12px",
          borderRadius: "6px",
          marginBottom: "20px",
          border: "1px solid #e9ecef"
        }}>
          <p style={{
            margin: "0 0 4px 0",
            fontSize: "11px",
            color: "#666",
            fontWeight: "600"
          }}>
            {t('Album Link:')}
          </p>
          <p style={{
            margin: 0,
            fontSize: "11px",
            color: "#333",
            wordBreak: "break-all",
            fontFamily: "monospace"
          }}>
            {albumLink}
          </p>
        </div>
        
        <button
          style={{
            width: "100%",
            padding: "12px 24px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#007bff",
            color: "white",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "background-color 0.2s"
          }}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#0056b3";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#007bff";
          }}
        >
          {t('Close')}
        </button>
      </div>
      
      {/* Add CSS animation styles */}
      <style>
        {`
          @keyframes modalFadeIn {
            from {
              opacity: 0;
              transform: scale(0.9) translateY(-20px);
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