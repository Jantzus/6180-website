import { useUsernameManagement } from "@/lib/customHooks"
import { getLanguageDirection } from "@/lib/i18n";

// Import styled components
import { 
  ModalOverlay,
  UsernameModal,
  UsernameTitle,
  UsernameDescription,
  UsernameInput,
  UsernameError,
  UsernameButton,
  UsernameAltButton
} from "@/styles/styled-components";

// Username Modal Component
export const UsernamePrompt: React.FC<{
  t: (key: string) => string;
  language: string;
  usernameManager: ReturnType<typeof useUsernameManagement>;
  onSuccess: (newName: string) => void;
}> = ({ t, language, usernameManager, onSuccess }) => {
  const {
    showUsernamePrompt,
    setShowUsernamePrompt,
    usernameInput,
    setUsernameInput,
    usernameError,
    validateUsername,
    submitUsername,
    showAltButton,
    appendRandomDigits,
    isSubmittingUsername
  } = usernameManager;

  const handleSuccessfulUsernameUpdate = (newName: string) => {
    console.log(`Username successfully updated to: ${newName}`);
    localStorage.setItem("publicUsername", newName);
    setShowUsernamePrompt(false);
    onSuccess(newName);
  };

  if (!showUsernamePrompt) return null;

  return (
    <ModalOverlay>
      <UsernameModal isRTL={getLanguageDirection(language as "en") === "rtl"}>
        <UsernameTitle>
          {t('Enter Username')}
        </UsernameTitle>
        <UsernameDescription>
          {t('Username should contain only letters, numbers and hyphens. Example: john-doe2')}
        </UsernameDescription>
        <UsernameInput
          value={usernameInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsernameInput(e.target.value)}
          isRTL={getLanguageDirection(language as "en") === "rtl"}
        />
        {usernameError && <UsernameError>{usernameError}</UsernameError>}
        <UsernameButton
          disabled={isSubmittingUsername}
          onClick={() => {
            if (!validateUsername(usernameInput)) {
              usernameManager.setUsernameError(t('Username must contain only letters, numbers, and hyphens.'));
              return;
            }
            submitUsername(usernameInput, handleSuccessfulUsernameUpdate);
          }}
        >
          {t('Select Username')}
        </UsernameButton>
        {showAltButton && (
          <UsernameAltButton
            disabled={isSubmittingUsername}
            onClick={() => appendRandomDigits(handleSuccessfulUsernameUpdate)}
          >
            {t('Add Random Digits to Username')}
          </UsernameAltButton>
        )}
      </UsernameModal>
    </ModalOverlay>
  );
};