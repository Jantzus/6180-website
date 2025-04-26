import { useState, useEffect } from "react"
import { 
  ProtectionOption
} from "@/lib/types"
import { useTranslation } from "@/lib/i18n/react"
import { getLanguageDirection } from "@/lib/i18n/translations"

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

  // This function prevents any click events from propagating through the dialog
  const stopPropagation = (e: React.MouseEvent | React.FormEvent) => {
    e.preventDefault();  // Prevent default behavior
    e.stopPropagation(); // Stop propagation to parent elements
  };
  
  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if the click was directly on the backdrop
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div 
        className={`modal-container ${isRTL ? 'rtl' : 'ltr'}`} 
        onClick={stopPropagation}
      >
        <div className={`modal-header ${isRTL ? 'text-right' : 'text-left'}`}>
          {t('Enter a password for this album.')}
          <br />
          <br />
          {t('Select what can be done with photos and videos without a password.')}
        </div>
        
        <input
          type="text"
          className="password-input"
          placeholder={t('Enter password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoCapitalize="none"
          autoComplete="off"
          spellCheck="false"
          autoCorrect="off"
        />
        
        <div className="options-container">
          {/* Not Visible Option */}
          <div 
            className={`option ${selectedOption === 'notVisible' ? 'selected' : ''} ${passwordRequired ? 'disabled' : ''}`}
            onClick={() => !passwordRequired && handleOptionSelect('notVisible')}
          >
            <input 
              type="radio" 
              name="protection" 
              id="notVisible" 
              className={`radio-input ${isRTL ? 'rtl' : 'ltr'}`}
              checked={selectedOption === 'notVisible'}
              onChange={() => {}} // Empty handler to prevent React warning
              disabled={passwordRequired}
              onClick={(e) => {
                e.stopPropagation();
                !passwordRequired && handleOptionSelect('notVisible');
              }}
            />
            <label 
              htmlFor="notVisible"
              className={`option-label ${passwordRequired ? 'disabled' : ''}`}
              onClick={() => !passwordRequired && handleOptionSelect('notVisible')}
            >
              {t('Not Visible')}
              {passwordRequired && (
                <span className="password-required-text">
                  {t('Password required')}
                </span>
              )}
            </label>
          </div>
          
          {/* Watermark Option */}
          <div 
            className={`option ${selectedOption === 'watermark' ? 'selected' : ''} ${passwordRequired ? 'disabled' : ''}`}
            onClick={() => !passwordRequired && handleOptionSelect('watermark')}
          >
            <input 
              type="radio" 
              name="protection" 
              id="watermark" 
              className={`radio-input ${isRTL ? 'rtl' : 'ltr'}`}
              checked={selectedOption === 'watermark'}
              onChange={() => {}} // Empty handler to prevent React warning
              disabled={passwordRequired}
              onClick={(e) => {
                e.stopPropagation();
                !passwordRequired && handleOptionSelect('watermark');
              }}
            />
            <label 
              htmlFor="watermark"
              className={`option-label ${passwordRequired ? 'disabled' : ''}`}
              onClick={() => !passwordRequired && handleOptionSelect('watermark')}
            >
              {t('Watermark')}
              {passwordRequired && (
                <span className="password-required-text">
                  {t('Password required')}
                </span>
              )}
            </label>
          </div>
          
          {/* Cannot Be Saved Option */}
          <div 
            className={`option ${selectedOption === 'cannotBeSaved' ? 'selected' : ''} ${passwordRequired ? 'disabled' : ''}`}
            onClick={() => !passwordRequired && handleOptionSelect('cannotBeSaved')}
          >
            <input 
              type="radio" 
              name="protection" 
              id="cannotBeSaved" 
              className={`radio-input ${isRTL ? 'rtl' : 'ltr'}`}
              checked={selectedOption === 'cannotBeSaved'}
              onChange={() => {}} // Empty handler to prevent React warning
              disabled={passwordRequired}
              onClick={(e) => {
                e.stopPropagation();
                !passwordRequired && handleOptionSelect('cannotBeSaved');
              }}
            />
            <label 
              htmlFor="cannotBeSaved"
              className={`option-label ${passwordRequired ? 'disabled' : ''}`}
              onClick={() => !passwordRequired && handleOptionSelect('cannotBeSaved')}
            >
              {t('Cannot Be Saved')}
              {passwordRequired && (
                <span className="password-required-text">
                  {t('Password required')}
                </span>
              )}
            </label>
          </div>
          
          {/* No Password Option - Always available */}
          <div 
            className={`option ${selectedOption === 'noPassword' ? 'selected' : ''}`}
            onClick={() => handleOptionSelect('noPassword')}
          >
            <input 
              type="radio" 
              name="protection" 
              id="noPassword" 
              className={`radio-input ${isRTL ? 'rtl' : 'ltr'}`}
              checked={selectedOption === 'noPassword'}
              onChange={() => {}} // Empty handler to prevent React warning
              onClick={(e) => {
                e.stopPropagation();
                handleOptionSelect('noPassword');
              }}
            />
            <label 
              htmlFor="noPassword"
              className="option-label"
              onClick={() => handleOptionSelect('noPassword')}
            >
              {t('No Password')}
            </label>
          </div>
        </div>
        
        <div className={`button-container ${isRTL ? 'rtl' : 'ltr'}`}>
          <button
            className="cancel-button"
            onClick={() => onClose()} // Don't pass selected values when canceling
          >
            {t('Cancel')}
          </button>
          <button
            className="save-button"
            onClick={() => {
              console.log(`Saving with option: ${selectedOption}, password: ${password.length > 0 ? '********' : 'none'}`);
              // Pass the selected option and password to the parent component
              onClose(selectedOption, password);
            }}
          >
            {t('Save')}
          </button>
        </div>
      </div>
    </div>
  );
};
