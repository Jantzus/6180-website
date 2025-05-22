import { useState } from "react";
import { 
  Modal, 
  ModalContent, 
  Button,
  TwoFactorAuthLabel,
} from "@/styles/styled-components";

export interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
  error: string | null;
  t: (key: string) => string;
}

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
            
            <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
              <Button
                type="button"
                onClick={onClose}
                style={{
                  backgroundColor: "#f3f4f6",
                  color: "#333"
                }}
              >
                {t('Cancel')}
              </Button>
              
              <Button
                type="submit"
                primary
                disabled={isSubmitting || !password}
                style={{
                  opacity: password ? 1 : 0.7
                }}
              >
                {isSubmitting ? t('Submitting...') : t('Submit')}
              </Button>
            </div>
          </form>
          
          {/* Two-Factor Authentication label */}
          <TwoFactorAuthLabel>
            {t('Two-Factor Authentication')}
          </TwoFactorAuthLabel>
        </div>
      </ModalContent>
    </Modal>
  );
};