import { useState, useEffect } from "react"
import { 
  ProtectionOption
} from "@/lib/types"
import { useTranslation } from "@/lib/i18n/react"
import { getLanguageDirection } from "@/lib/i18n/translations"
import styled from "styled-components"

// Styled Components for the dialog
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const DialogContainer = styled.div`
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const DialogTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: white;
  background-color: #888;
  padding: 15px 20px;
  text-align: center;
`;

interface DirectionalProps {
  isRTL: boolean;
}

const DialogContent = styled.div<DirectionalProps>`
  direction: ${props => props.isRTL ? 'rtl' : 'ltr'};
  padding: 30px;
`;

const DialogText = styled.p`
  margin-bottom: 15px;
  font-size: 16px;
`;

const PasswordInput = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 25px;
  margin-top: 20px;
  box-sizing: border-box;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
`;

interface OptionWrapperProps {
  disabled: boolean;
}

const OptionWrapper = styled.div<OptionWrapperProps>`
  display: flex;
  align-items: center;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.7 : 1};
`;

const RadioInput = styled.input`
  margin-right: 10px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  
  &:disabled {
    cursor: not-allowed;
  }
`;

interface LabelProps {
  disabled: boolean;
}

const OptionLabel = styled.label<LabelProps>`
  display: flex;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: 16px;
`;

const PasswordRequiredText = styled.span`
  color: #aaa;
  margin-left: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
`;

// Component Props
type PasswordDialogProps = {
  isOpen: boolean;
  onClose: (option?: ProtectionOption, password?: string) => void;
  initialOption?: ProtectionOption;
  initialPassword?: string;
};

export const PasswordDialog: React.FC<PasswordDialogProps> = ({
  isOpen,
  onClose,
  initialOption = 'noPassword',
  initialPassword = ''
}) => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";
  
  // Initialize state with props
  const [selectedOption, setSelectedOption] = useState<ProtectionOption>(initialOption);
  const [password, setPassword] = useState(initialPassword);

  // Reset state when dialog opens
  useEffect(() => {
    if (isOpen) {
      setSelectedOption(initialOption);
      setPassword(initialPassword);
    }
  }, [isOpen, initialOption, initialPassword]);

  if (!isOpen) return null;

  // Determine if password options should be disabled
  const passwordRequired = password.trim() === '';

  // Function to handle option selection
  const handleOptionSelect = (option: ProtectionOption) => {
    // Only allow password-protected options if password is entered
    if ((option !== 'noPassword') && passwordRequired) {
      return;
    }
    setSelectedOption(option);
  };

  // Handle backdrop click to close dialog
  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if the click was directly on the backdrop
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleBackdropClick}>
      <DialogContainer>
        <DialogTitle>
          {t('Album Password Policy')}
        </DialogTitle>
        
        <DialogContent isRTL={isRTL}>
          <DialogText>
            {t('Enter a password for this album.')}
          </DialogText>
          
          <DialogText>
            {t('Select what can be done with photos and videos without a password.')}
          </DialogText>
          
          <PasswordInput
            type="text"
            placeholder={t('Enter password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoCapitalize="none"
            autoComplete="off"
            spellCheck="false"
            autoCorrect="off"
          />
          
          <OptionsContainer>
            {/* Not Visible Option */}
            <OptionWrapper disabled={passwordRequired}>
              <RadioInput 
                type="radio" 
                name="protection" 
                id="notVisible" 
                checked={selectedOption === 'notVisible'}
                onChange={() => {}} // Empty handler to prevent React warning
                disabled={passwordRequired}
                onClick={() => !passwordRequired && handleOptionSelect('notVisible')}
              />
              <OptionLabel 
                htmlFor="notVisible"
                disabled={passwordRequired}
              >
                {t('Not Visible')}
                {passwordRequired && (
                  <PasswordRequiredText>
                    {t('Password required')}
                  </PasswordRequiredText>
                )}
              </OptionLabel>
            </OptionWrapper>
            
            {/* Watermark Option */}
            <OptionWrapper disabled={passwordRequired}>
              <RadioInput 
                type="radio" 
                name="protection" 
                id="watermark" 
                checked={selectedOption === 'watermark'}
                onChange={() => {}} // Empty handler to prevent React warning
                disabled={passwordRequired}
                onClick={() => !passwordRequired && handleOptionSelect('watermark')}
              />
              <OptionLabel 
                htmlFor="watermark"
                disabled={passwordRequired}
              >
                {t('Watermark')}
                {passwordRequired && (
                  <PasswordRequiredText>
                    {t('Password required')}
                  </PasswordRequiredText>
                )}
              </OptionLabel>
            </OptionWrapper>
            
            {/* Cannot Be Saved Option */}
            <OptionWrapper disabled={passwordRequired}>
              <RadioInput 
                type="radio" 
                name="protection" 
                id="cannotBeSaved" 
                checked={selectedOption === 'cannotBeSaved'}
                onChange={() => {}} // Empty handler to prevent React warning
                disabled={passwordRequired}
                onClick={() => !passwordRequired && handleOptionSelect('cannotBeSaved')}
              />
              <OptionLabel 
                htmlFor="cannotBeSaved"
                disabled={passwordRequired}
              >
                {t('Cannot Be Saved')}
                {passwordRequired && (
                  <PasswordRequiredText>
                    {t('Password required')}
                  </PasswordRequiredText>
                )}
              </OptionLabel>
            </OptionWrapper>
            
            {/* No Password Option - Always available */}
            <OptionWrapper disabled={false}>
              <RadioInput 
                type="radio" 
                name="protection" 
                id="noPassword" 
                checked={selectedOption === 'noPassword'}
                onChange={() => {}} // Empty handler to prevent React warning
                onClick={() => handleOptionSelect('noPassword')}
              />
              <OptionLabel 
                htmlFor="noPassword"
                disabled={false}
              >
                {t('No Password')}
              </OptionLabel>
            </OptionWrapper>
          </OptionsContainer>
          
          <ButtonContainer>
            <Button
              onClick={() => onClose()} // Don't pass selected values when canceling
            >
              {t('Cancel')}
            </Button>
            <Button
              onClick={() => {
                console.log(`Saving with option: ${selectedOption}, password: ${password.length > 0 ? '********' : 'none'}`);
                // Pass the selected option and password to the parent component
                onClose(selectedOption, password);
              }}
            >
              {t('Save')}
            </Button>
          </ButtonContainer>
        </DialogContent>
      </DialogContainer>
    </ModalOverlay>
  );
};