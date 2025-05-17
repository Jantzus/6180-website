import React, { useState } from "react";
import QRCode from "react-qr-code";
import { 
  Modal, 
  ModalContent, 
  QRCodeContainer, 
  InstructionsContainer, 
  InstructionHeading, 
  InstructionList, 
  InstructionItem, 
  CloseButton, 
  ItalicText 
} from "@/styles/styled-components";
import { QRCodeModalProps, PasswordModalProps } from "@/lib/types";

// QR Code Modal component
export const QRCodeModal: React.FC<QRCodeModalProps> = ({ 
  isOpen, 
  onClose, 
  folderId, 
  t 
}) => {
  if (!isOpen) return null;
  
  // Create a QR code URL with the properly formatted folder ID
  const qrCodeUrl = folderId ? `https://6180.io/folder/${folderId}` : '';
  
  return (
    <Modal>
      <ModalContent>
        <QRCodeContainer>
          {folderId && (
            <QRCode 
              value={qrCodeUrl}
              size={256}
              style={{ height: "auto", maxWidth: "300px", width: "100%" }}
              viewBox={`0 0 256 256`}
              level="H"
            />
          )}
        </QRCodeContainer>
        
        <InstructionsContainer>
          <InstructionHeading>{t('To load this album on your iPhone:')}</InstructionHeading>
          <InstructionList>
            <InstructionItem>
              {t('Use your phone\'s camera to scan the QR code to get [6180] from the [App Store] and sign up')}
            </InstructionItem>
            <InstructionItem>
              {t('Tap "Files" at the bottom middle')}
            </InstructionItem>
            <InstructionItem>
              {t('Tap "Album QR Code" at the top left')}
            </InstructionItem>
          </InstructionList>
          
          <ItalicText>
            {t('You can also screen shot this page with your phone and click "Load Saved QR Code" on the iPhone app')}
          </ItalicText>
        </InstructionsContainer>

        <CloseButton onClick={onClose}>
          {t('Close')}
        </CloseButton>
      </ModalContent>
    </Modal>
  );
};

// Password modal component
export const PasswordModal: React.FC<PasswordModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  error,
  t
}) => {
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (!isOpen) return null;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    onSubmit(password);
    setIsSubmitting(false);
  };
  
  return (
    <Modal>
      <ModalContent style={{ maxWidth: "400px" }}>
        <div style={{ padding: "20px" }}>
          <h3 style={{ margin: "0 0 20px 0", textAlign: "center" }}>{t('Enter Password')}</h3>
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('Password')}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: error ? "1px solid #d32f2f" : "1px solid #ccc",
                  fontSize: "16px"
                }}
                required
              />
              
              {/* Display error message if present */}
              {error && (
                <div style={{ 
                  color: "#d32f2f", 
                  fontSize: "14px", 
                  marginTop: "5px",
                  padding: "5px"
                }}>
                  {error}
                </div>
              )}
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: "10px 16px",
                  backgroundColor: "#f3f4f6",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px"
                }}
              >
                {t('Cancel')}
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting || !password}
                style={{
                  padding: "10px 16px",
                  backgroundColor: "#006adc",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: password ? "pointer" : "not-allowed",
                  opacity: password ? 1 : 0.7,
                  fontSize: "14px"
                }}
              >
                {isSubmitting ? t('Submitting...') : t('Submit')}
              </button>
            </div>
          </form>
        </div>
      </ModalContent>
    </Modal>
  );
};