// Updated PasswordModal.tsx
import { useState } from "react";
import { 
  Modal, 
} from "@/styles/styled-components";
import {
  ModalContent
} from "@/styles/modalStyles";
import { 
  Button,
} from "@/styles/components/buttons";

import { 
  FormInput,
  FormGroup,
  TwoFactorAuthLabel,
} from "@/styles/components/forms";

export interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
  error: string | null;
  t: (key: string) => string;
}

// Updated Password modal component with consistent styling
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
      <ModalContent 
        $isRTL={false}
        style={{ maxWidth: "400px", textAlign: "center", padding: "32px" }}
      >
        <h3 style={{ margin: "0 0 24px 0" }}>{t('Enter Password')}</h3>
        
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <FormGroup>
            <FormInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('Password')}
              style={{
                border: error ? "1px solid #d32f2f" : undefined,
                padding: "12px",
                width: "100%",
                boxSizing: "border-box"
              }}
              required
            />
            
            {/* Display error message if present */}
            {error && (
              <div style={{ 
                color: "#d32f2f", 
                fontSize: "14px", 
                marginTop: "8px",
                textAlign: "left"
              }}>
                {error}
              </div>
            )}
          </FormGroup>
          
          <div style={{ display: "flex", gap: "12px", width: "100%" }}>
            <Button
              type="button"
              onClick={onClose}
              style={{
                backgroundColor: "#f3f4f6",
                color: "#333",
                flex: 1
              }}
            >
              {t('Cancel')}
            </Button>
            
            <Button
              type="submit"
              $primary
              disabled={isSubmitting || !password}
              style={{ flex: 1 }}
            >
              {isSubmitting ? t('Submitting...') : t('Submit')}
            </Button>
          </div>
        </form>
        
        {/* Two-Factor Authentication label */}
        <TwoFactorAuthLabel>
          {t('Two-Factor Authentication')}
        </TwoFactorAuthLabel>
      </ModalContent>
    </Modal>
  );
};