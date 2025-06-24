// GlobalSettingsMenu.tsx - Global settings menu components
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n/translations";
import { PasswordPolicyEnum } from "@/lib/types";
import { GlobalSettings } from "./types/album-types";

// Styled components for global gear menu
const GlobalGearButton = styled.button`
  padding: 8px;
  border: 1px solid #6c757d;
  border-radius: 6px;
  background: transparent;
  color: #6c757d;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  position: relative;

  &:hover {
    background: #6c757d;
    color: white;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const GlobalGearDropdown = styled.div<{ $isRTL: boolean }>`
  position: absolute;
  top: 100%;
  ${props => props.$isRTL ? 'left: 0;' : 'right: 0;'}
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 300px;
  padding: 20px;
  margin-top: 4px;
`;

const GlobalDropdownSection = styled.div`
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const GlobalDropdownLabel = styled.h4`
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const GlobalToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 8px 0;
`;

const GlobalToggleLabel = styled.div`
  font-size: 14px;
  color: #333;
  line-height: 1.4;
`;

const GlobalToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 26px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
    
    &:checked + span {
      background-color: #007bff;
    }
    
    &:checked + span:before {
      transform: translateX(18px);
    }
    
    &:disabled + span {
      background-color: #e6e6e6;
      cursor: not-allowed;
    }
  }
`;

const GlobalToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .2s;
  border-radius: 26px;
  
  &:before {
    position: absolute;
    content: "";
    height: 22px;
    width: 22px;
    left: 2px;
    top: 2px;
    background-color: white;
    transition: .2s;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`;

const GlobalPasswordButton = styled.button<{ $hasAnyPassword: boolean }>`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${props => props.$hasAnyPassword ? '#28a745' : '#dee2e6'};
  border-radius: 8px;
  background: ${props => props.$hasAnyPassword ? '#28a745' : '#f8f9fa'};
  color: ${props => props.$hasAnyPassword ? 'white' : '#6c757d'};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: ${props => props.$hasAnyPassword ? '#218838' : '#e9ecef'};
    border-color: ${props => props.$hasAnyPassword ? '#218838' : '#adb5bd'};
  }
`;

const ApplyButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #007bff;
  border-radius: 8px;
  background: #007bff;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 8px;

  &:hover {
    background: #0056b3;
    border-color: #0056b3;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

// Props interfaces
interface GlobalSettingsMenuProps {
  showGlobalGear: boolean;
  globalSettings: GlobalSettings;
  setGlobalSettings: React.Dispatch<React.SetStateAction<GlobalSettings>>;
  onPasswordClick: () => void;
  onApplySettings: () => void;
}

interface SingleAlbumSettingsMenuProps {
  showGear: boolean;
  isOnPublicProfile: boolean;
  participantsCanAddItems: boolean;
  participantsCanDeleteItems: boolean;
  passwordProtectionOption: PasswordPolicyEnum;
  albumPassword: string;
  onTogglePublicProfile: () => void;
  onToggleParticipantsCanAdd: () => void;
  onToggleParticipantsCanDelete: () => void;
  onPasswordClick: () => void;
  disabled: boolean;
}

// Global settings menu component for multiple album mode
export const GlobalSettingsMenu: React.FC<GlobalSettingsMenuProps> = ({
  showGlobalGear,
  globalSettings,
  setGlobalSettings,
  onPasswordClick,
  onApplySettings
}) => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";

  if (!showGlobalGear) return null;

  return (
    <GlobalGearDropdown $isRTL={isRTL}>
      <GlobalDropdownSection>
        <GlobalDropdownLabel>{t('Apply to All Albums')}</GlobalDropdownLabel>
        
        <GlobalDropdownSection>
          <GlobalToggleContainer>
            <GlobalToggleLabel>{t('Public Profile')}</GlobalToggleLabel>
            <GlobalToggleSwitch>
              <input
                type="checkbox"
                checked={globalSettings.isOnPublicProfile}
                onChange={(e) => setGlobalSettings(prev => ({
                  ...prev,
                  isOnPublicProfile: e.target.checked
                }))}
              />
              <GlobalToggleSlider />
            </GlobalToggleSwitch>
          </GlobalToggleContainer>
          
          <GlobalToggleContainer>
            <GlobalToggleLabel>{t('Participants Can Add Items')}</GlobalToggleLabel>
            <GlobalToggleSwitch>
              <input
                type="checkbox"
                checked={globalSettings.participantsCanAddItems}
                onChange={(e) => setGlobalSettings(prev => ({
                  ...prev,
                  participantsCanAddItems: e.target.checked
                }))}
              />
              <GlobalToggleSlider />
            </GlobalToggleSwitch>
          </GlobalToggleContainer>
          
          <GlobalToggleContainer>
            <GlobalToggleLabel>{t('Participants Can Delete Items')}</GlobalToggleLabel>
            <GlobalToggleSwitch>
              <input
                type="checkbox"
                checked={globalSettings.participantsCanDeleteItems}
                onChange={(e) => setGlobalSettings(prev => ({
                  ...prev,
                  participantsCanDeleteItems: e.target.checked
                }))}
              />
              <GlobalToggleSlider />
            </GlobalToggleSwitch>
          </GlobalToggleContainer>
        </GlobalDropdownSection>

        <GlobalDropdownSection>
          <GlobalPasswordButton
            $hasAnyPassword={globalSettings.passwordProtectionOption !== 'NoPassword' && !!globalSettings.albumPassword}
            onClick={onPasswordClick}
          >
            {globalSettings.passwordProtectionOption !== 'NoPassword' && globalSettings.albumPassword ? '🔒' : '🔓'}
            {globalSettings.passwordProtectionOption !== 'NoPassword' && globalSettings.albumPassword ? t('Password Set') : t('Set Password for All')}
          </GlobalPasswordButton>
        </GlobalDropdownSection>

        <ApplyButton onClick={onApplySettings}>
          {t('Apply to All Albums')}
        </ApplyButton>
      </GlobalDropdownSection>
    </GlobalGearDropdown>
  );
};

// Single album settings menu component
export const SingleAlbumSettingsMenu: React.FC<SingleAlbumSettingsMenuProps> = ({
  showGear,
  isOnPublicProfile,
  participantsCanAddItems,
  participantsCanDeleteItems,
  passwordProtectionOption,
  albumPassword,
  onTogglePublicProfile,
  onToggleParticipantsCanAdd,
  onToggleParticipantsCanDelete,
  onPasswordClick,
  disabled
}) => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";

  if (!showGear) return null;

  return (
    <GlobalGearDropdown $isRTL={isRTL}>
      <GlobalDropdownSection>
        <GlobalDropdownLabel>{t('Album Settings')}</GlobalDropdownLabel>
        
        <GlobalDropdownSection>
          <GlobalToggleContainer>
            <GlobalToggleLabel>{t('Public Profile')}</GlobalToggleLabel>
            <GlobalToggleSwitch>
              <input
                type="checkbox"
                checked={isOnPublicProfile}
                onChange={onTogglePublicProfile}
                disabled={disabled}
              />
              <GlobalToggleSlider />
            </GlobalToggleSwitch>
          </GlobalToggleContainer>
          
          <GlobalToggleContainer>
            <GlobalToggleLabel>{t('Participants Can Add Items')}</GlobalToggleLabel>
            <GlobalToggleSwitch>
              <input
                type="checkbox"
                checked={participantsCanAddItems}
                onChange={onToggleParticipantsCanAdd}
                disabled={disabled}
              />
              <GlobalToggleSlider />
            </GlobalToggleSwitch>
          </GlobalToggleContainer>
          
          <GlobalToggleContainer>
            <GlobalToggleLabel>{t('Participants Can Delete Items')}</GlobalToggleLabel>
            <GlobalToggleSwitch>
              <input
                type="checkbox"
                checked={participantsCanDeleteItems}
                onChange={onToggleParticipantsCanDelete}
                disabled={disabled}
              />
              <GlobalToggleSlider />
            </GlobalToggleSwitch>
          </GlobalToggleContainer>
        </GlobalDropdownSection>

        <GlobalDropdownSection>
          <GlobalPasswordButton
            $hasAnyPassword={passwordProtectionOption !== 'NoPassword' && !!albumPassword}
            onClick={onPasswordClick}
            disabled={disabled}
          >
            {passwordProtectionOption !== 'NoPassword' && albumPassword ? '🔒' : '🔓'}
            {passwordProtectionOption !== 'NoPassword' && albumPassword ? t('Password Set') : t('Set Password')}
          </GlobalPasswordButton>
        </GlobalDropdownSection>
      </GlobalDropdownSection>
    </GlobalGearDropdown>
  );
};

// Gear button component that can be reused
export const GearButton: React.FC<{
  onClick: () => void;
  disabled: boolean;
  title: string;
}> = ({ onClick, disabled, title }) => (
  <GlobalGearButton
    onClick={onClick}
    disabled={disabled}
    title={title}
  >
    ⚙️
  </GlobalGearButton>
);