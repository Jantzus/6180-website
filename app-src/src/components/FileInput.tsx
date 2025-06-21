// FileInput.tsx - Enhanced version with folder support
import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n";

const FileInputContainer = styled.div`
  display: none; /* Hidden by default, controlled by refs */
`;

const HiddenFileInput = styled.input`
  display: none;
`;

// Type declaration for webkitdirectory attribute
declare module 'react' {
  interface InputHTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    webkitdirectory?: string;
    directory?: string;
  }
}

interface FileInputProps {
  onFileSelection: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  multiple?: boolean;
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(({
  onFileSelection,
  accept = "image/*,video/*",
  multiple = true
}, ref) => {
  return (
    <FileInputContainer>
      {/* Regular file input */}
      <HiddenFileInput
        ref={ref}
        id="file-input"
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={onFileSelection}
      />
      
      {/* Folder input - separate input for folder selection */}
      <HiddenFileInput
        id="folder-input"
        type="file"
        accept={accept}
        multiple={multiple}
        webkitdirectory=""
        directory=""
        onChange={onFileSelection}
      />
    </FileInputContainer>
  );
});

FileInput.displayName = 'FileInput';

// Enhanced Upload Button Component
interface UploadButtonProps {
  onFileClick: () => void;
  onFolderClick: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const ButtonContainer = styled.div<{ $isRTL: boolean }>`
  display: flex;
  gap: 8px;
  align-items: center;
  direction: ${props => props.$isRTL ? 'rtl' : 'ltr'};
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }
`;

const UploadButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: 2px solid ${props => props.$variant === 'primary' ? '#007bff' : '#6c757d'};
  border-radius: 12px;
  background: ${props => props.$variant === 'primary' ? '#007bff' : 'transparent'};
  color: ${props => props.$variant === 'primary' ? 'white' : '#6c757d'};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background: ${props => props.$variant === 'primary' ? '#0056b3' : '#6c757d'};
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const IconSpan = styled.span`
  font-size: 16px;
`;

export const EnhancedUploadButtons: React.FC<UploadButtonProps> = ({
  onFileClick,
  onFolderClick,
  disabled = false,
  style
}) => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";

  return (
    <ButtonContainer $isRTL={isRTL} style={style}>
      <UploadButton
        $variant="primary"
        onClick={onFileClick}
        disabled={disabled}
        title={t('Select individual files')}
      >
        <IconSpan>📷</IconSpan>
        {t('Select Files')}
      </UploadButton>
      
      <UploadButton
        $variant="secondary"
        onClick={onFolderClick}
        disabled={disabled}
        title={t('Select an entire folder')}
      >
        <IconSpan>📁</IconSpan>
        {t('Select Folder')}
      </UploadButton>
    </ButtonContainer>
  );
};