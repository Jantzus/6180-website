import { useState, useEffect } from "react"
import { 
  PasswordPolicyEnum
} from "@/lib/types"
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n/translations"
import styled from "styled-components"
import { theme, DirectionalProps } from '@/styles/theme'
import { Button } from '@/styles/components/buttons'


// ===== STYLED COMPONENTS =====
const PasswordOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10000;
`;

const PasswordContainer = styled.div`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.medium};
  box-shadow: ${theme.boxShadow.lg};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10001;
  width: min(500px, calc(100vw - 64px));
  max-height: calc(100vh - 64px);
  overflow-y: auto;
  overflow-x: hidden;
  
  /* Ensure smooth scrolling */
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: ${theme.colors.border} transparent;
  
  /* Custom scrollbar for webkit browsers */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.border};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${theme.colors.secondary};
  }
  
  @media (max-width: 480px) {
    width: calc(100vw - 20px);
    /* Account for mobile browser UI - more conservative approach */
    max-height: calc(100vh - 160px);
    /* Support for newer browsers with dynamic viewport */
    max-height: calc(100dvh - 60px);
    top: 10px;
    left: 10px;
    transform: none;
    border-radius: ${theme.borderRadius.small};
  }
  
  @media (max-height: 700px) {
    max-height: calc(100vh - 80px);
    max-height: calc(100dvh - 40px);
    top: 20px;
    transform: translateX(-50%);
    
    @media (max-width: 480px) {
      top: 10px;
      left: 10px;
      transform: none;
      max-height: calc(100vh - 160px);
      max-height: calc(100dvh - 60px);
    }
  }
  
  @media (max-height: 600px) {
    max-height: calc(100vh - 100px);
    max-height: calc(100dvh - 40px);
    top: 10px;
    transform: translateX(-50%);
    
    @media (max-width: 480px) {
      top: 10px;
      left: 10px;
      transform: none;
      max-height: calc(100vh - 160px);
      max-height: calc(100dvh - 60px);
    }
  }
  
  /* For very small screens - prioritize fitting content */
  @media (max-height: 500px) {
    max-height: calc(100vh - 60px);
    max-height: calc(100dvh - 20px);
    top: 5px;
    transform: translateX(-50%);
    
    @media (max-width: 480px) {
      top: 5px;
      left: 10px;
      transform: none;
      max-height: calc(100vh - 140px);
      max-height: calc(100dvh - 40px);
    }
  }
`;

const ScrollableContent = styled.div`
  padding: 40px;
  
  @media (max-width: 768px) {
    padding: 30px;
  }
  
  @media (max-width: 480px) {
    padding: 20px;
  }
  
  @media (max-height: 700px) {
    padding: 24px;
  }
  
  @media (max-height: 600px) {
    padding: 20px;
  }
`;

const DialogContent = styled.div<DirectionalProps>`
  direction: ${props => props.$isRTL ? 'rtl' : 'ltr'};
`;

const DialogTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin: 0 0 ${theme.spacing.lg} 0;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 22px;
    margin: 0 0 ${theme.spacing.md} 0;
  }
  
  @media (max-height: 700px) {
    font-size: 20px;
    margin: 0 0 ${theme.spacing.md} 0;
  }
  
  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const DialogText = styled.p`
  margin-bottom: ${theme.spacing.lg};
  font-size: 16px;
  color: ${theme.colors.text.secondary};
  line-height: 1.5;
  
  @media (max-width: 768px) {
    margin-bottom: ${theme.spacing.md};
    font-size: 15px;
  }
  
  @media (max-height: 700px) {
    margin-bottom: ${theme.spacing.sm};
    font-size: 14px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${theme.spacing.sm};
  font-size: 14px;
  font-weight: 500;
  color: ${theme.colors.text.primary};
`;

const PasswordInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.small};
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  &::placeholder {
    color: ${theme.colors.text.light};
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
`;

const OptionCard = styled.div<{$isSelected: boolean}>`
  border: 2px solid ${props => props.$isSelected ? theme.colors.primary : theme.colors.border};
  border-radius: ${theme.borderRadius.medium};
  padding: ${theme.spacing.lg};
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${props => props.$isSelected ? theme.colors.background.highlight : theme.colors.white};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};
  
  @media (max-width: 768px) {
    padding: ${theme.spacing.md};
    gap: ${theme.spacing.md};
  }
  
  @media (max-width: 480px) {
    padding: ${theme.spacing.sm};
    gap: ${theme.spacing.sm};
  }
  
  @media (max-height: 700px) {
    padding: ${theme.spacing.sm};
    gap: ${theme.spacing.sm};
  }
`;

const OptionContent = styled.div`
  flex: 1;
`;

const OptionHeader = styled.div`
  margin-bottom: ${theme.spacing.xs};
`;

const RadioInput = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${theme.colors.primary};
  flex-shrink: 0;
`;

const OptionLabel = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: ${theme.colors.text.primary};
  cursor: pointer;
  display: block;
`;

const OptionDescription = styled.div`
  font-size: 14px;
  color: ${theme.colors.text.secondary};
  margin-top: ${theme.spacing.xs};
`;

const DefaultPasswordText = styled.div`
  color: ${theme.colors.warning};
  font-size: 12px;
  font-style: italic;
  margin-top: ${theme.spacing.xs};
  font-weight: 500;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  justify-content: center;
  margin-top: ${theme.spacing.xl};
`;

const InfoBox = styled.div`
  background-color: ${theme.colors.background.primary};
  border-radius: ${theme.borderRadius.medium};
  padding: ${theme.spacing.md};
  margin: ${theme.spacing.md} 0;
  border-left: 4px solid ${theme.colors.primary};
  font-size: 14px;
  color: ${theme.colors.text.secondary};
  line-height: 1.4;
  
  @media (max-width: 768px) {
    padding: ${theme.spacing.sm};
    margin: ${theme.spacing.sm} 0;
    font-size: 13px;
  }
  
  @media (max-height: 700px) {
    padding: ${theme.spacing.xs};
    font-size: 12px;
  }
`;

// Component Props
type PasswordDialogProps = {
  isOpen: boolean;
  onClose: (option?: PasswordPolicyEnum, password?: string) => void;
  initialOption?: PasswordPolicyEnum;
  initialPassword?: string;
};

// Password policy options with descriptions
const passwordOptions = [
  {
    value: 'NotVisible' as PasswordPolicyEnum,
    titleKey: 'Password Required To See Or Save',
    descriptionKey: 'Album will be completely hidden until correct password is entered'
  },
  {
    value: 'Watermark' as PasswordPolicyEnum,
    titleKey: 'Watermarked And No Saving Without Password',
    descriptionKey: 'Photos will be visible with watermarks, password required to save'
  },
  {
    value: 'CannotBeSaved' as PasswordPolicyEnum,
    titleKey: 'Password Required To Save',
    descriptionKey: 'Photos are visible but password required to download or save'
  },
  {
    value: 'NoPassword' as PasswordPolicyEnum,
    titleKey: 'No Password',
    descriptionKey: 'Album is fully public with no restrictions'
  }
];

export const PasswordDialog: React.FC<PasswordDialogProps> = ({
  isOpen,
  onClose,
  initialOption = 'NoPassword',
  initialPassword = ''
}) => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";
  const [isClient, setIsClient] = useState(false);
  
  // Initialize state with props
  const [selectedOption, setSelectedOption] = useState<PasswordPolicyEnum>(initialOption);
  const [password, setPassword] = useState(initialPassword);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Reset state when dialog opens
  useEffect(() => {
    if (isOpen) {
      setSelectedOption(initialOption);
      setPassword(initialPassword);
    }
  }, [isOpen, initialOption, initialPassword]);

  if (!isOpen || !isClient) return null;

  // Check if password is empty
  const passwordEmpty = password.trim() === '';

  // Function to handle option selection
  const handleOptionSelect = (option: PasswordPolicyEnum) => {
    setSelectedOption(option);
  };

  // Handle backdrop click to close dialog
  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if the click was directly on the backdrop
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Helper function to check if option requires password
  const requiresPassword = (option: PasswordPolicyEnum) => {
    return option !== 'NoPassword';
  };

  return (
    <>
      <PasswordOverlay onClick={handleBackdropClick} />
      <PasswordContainer>
        <ScrollableContent>
          <DialogContent $isRTL={isRTL}>
            <DialogTitle>
              {t('Album Password Policy')}
            </DialogTitle>
            
            <DialogText>
              {t('Configure password protection for your album. Choose how you want to restrict access to your photos.')}
            </DialogText>
            
            <FormGroup>
              <Label>{t('Enter Password')}</Label>
              <PasswordInput
                type="text"
                placeholder={t('Enter password (optional)')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoCapitalize="none"
                autoComplete="off"
                spellCheck="false"
                autoCorrect="off"
              />
            </FormGroup>

            <FormGroup>
              <Label>{t('Select Protection Level')}</Label>
              <OptionsContainer>
                {passwordOptions.map((option) => (
                  <OptionCard
                    key={option.value}
                    $isSelected={selectedOption === option.value}
                    onClick={() => handleOptionSelect(option.value)}
                  >
                    <RadioInput 
                      type="radio" 
                      name="protection" 
                      checked={selectedOption === option.value}
                      onChange={() => handleOptionSelect(option.value)}
                    />
                    <OptionContent>
                      <OptionHeader>
                        <OptionLabel>
                          {t(option.titleKey)}
                        </OptionLabel>
                      </OptionHeader>
                      
                      <OptionDescription>
                        {t(option.descriptionKey)}
                      </OptionDescription>
                      
                      {passwordEmpty && requiresPassword(option.value) && selectedOption === option.value && (
                        <DefaultPasswordText>
                          {t('⚠️ Will use "password" as default if left empty')}
                        </DefaultPasswordText>
                      )}
                    </OptionContent>
                  </OptionCard>
                ))}
              </OptionsContainer>
            </FormGroup>

            {requiresPassword(selectedOption) && (
              <InfoBox>
                <strong>{t('💡 Password Protection Info:')}</strong>
                <br />
                {t('If you leave the password field empty, "password" will be used as the default password. You can change this anytime in album settings.')}
              </InfoBox>
            )}
            
            <ButtonContainer>
              <Button
                onClick={() => onClose()} // Don't pass selected values when canceling
              >
                {t('Cancel')}
              </Button>
              <Button
                $primary={true}
                onClick={() => {
                  // Use "password" as default if field is empty and a password-protected option is selected
                  const finalPassword = passwordEmpty && requiresPassword(selectedOption) 
                    ? 'password' 
                    : password;
                  
                  console.log(`Saving with option: ${selectedOption}, password: ${finalPassword.length > 0 ? '********' : 'none'}`);
                  // Pass the selected option and final password to the parent component
                  onClose(selectedOption, finalPassword);
                }}
              >
                {t('Save')}
              </Button>
            </ButtonContainer>
          </DialogContent>
        </ScrollableContent>
      </PasswordContainer>
    </>
  );
};