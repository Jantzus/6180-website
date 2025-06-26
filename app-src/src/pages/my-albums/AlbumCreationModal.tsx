import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n";

// Import shared modal components
import {
  ModalOverlay,
  StandardModalContent,
  ModalTitle,
  ModalDescription,
  ModalCancelButton
} from "@/styles/modalStyles";

// Import theme for consistency
import { theme } from "@/styles/theme";

// Only define AlbumCreationModal-specific styled components
const FolderPreview = styled.div`
  background: ${theme.colors.background.primary};
  border: 1px solid ${theme.colors.borderLight};
  border-radius: ${theme.borderRadius.medium};
  padding: ${theme.spacing.md};
  margin: ${theme.spacing.md} 0 ${theme.spacing.lg} 0;
  font-family: monospace;
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text.primary};
  max-height: 150px;
  overflow-y: auto;
`;

const FolderLine = styled.div<{ $level: number }>`
  margin-left: ${props => props.$level * 20}px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.lg};
`;

const OptionButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border: 2px solid ${theme.colors.borderLight};
  border-radius: ${theme.borderRadius.medium};
  background: ${theme.colors.background.card};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: ${theme.fontSizes.md};
  text-align: left;
  width: 100%;

  &:hover {
    border-color: ${theme.colors.primary};
    background: ${theme.colors.background.highlight};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    font-size: ${theme.fontSizes.sm};
  }
`;

const OptionIcon = styled.span`
  font-size: ${theme.fontSizes.xl};
  flex-shrink: 0;
`;

const OptionContent = styled.div`
  flex: 1;
`;

const OptionTitle = styled.div`
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: 4px;
`;

const OptionDescription = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text.secondary};
  line-height: 1.4;
`;

// Interface for folder structure
export interface FolderStructure {
  name: string;
  files: File[];
  subfolders: FolderStructure[];
  path: string;
}

interface AlbumCreationModalProps {
  isOpen: boolean;
  folderStructure: FolderStructure | null;
  onChoice: (choice: 'separate' | 'combined') => void;
  onCancel: () => void;
}

export const AlbumCreationModal: React.FC<AlbumCreationModalProps> = ({
  isOpen,
  folderStructure,
  onChoice,
  onCancel
}) => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";
  
  // SSR-safe state for portal mounting
  const [isMounted, setIsMounted] = useState(false);

  // Ensure portal only renders on client-side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isOpen || !folderStructure) return null;

  // Render folder structure preview
  const renderFolderStructure = (folder: FolderStructure, level: number = 0): React.ReactNode[] => {
    const elements: React.ReactNode[] = [];
    
    if (level === 0) {
      elements.push(
        <FolderLine key={folder.path} $level={level}>
          <span>📁</span>
          <span>{folder.name}</span>
          <span style={{ color: theme.colors.text.lighter, fontSize: '12px' }}>
            ({folder.files.length === 1 
              ? t('{{count}} file', { count: folder.files.length.toString() })
              : t('{{count}} files', { count: folder.files.length.toString() })
            })
          </span>
        </FolderLine>
      );
    }
    
    folder.subfolders.forEach(subfolder => {
      const totalFiles = subfolder.files.length + subfolder.subfolders.reduce((acc, sf) => acc + sf.files.length, 0);
      elements.push(
        <FolderLine key={subfolder.path} $level={level + 1}>
          <span>📁</span>
          <span>{subfolder.name}</span>
          <span style={{ color: theme.colors.text.lighter, fontSize: '12px' }}>
            ({totalFiles === 1 
              ? t('{{count}} file', { count: totalFiles.toString() })
              : t('{{count}} files', { count: totalFiles.toString() })
            })
          </span>
        </FolderLine>
      );
      
      // Show nested subfolders up to level 2
      if (level < 1 && subfolder.subfolders.length > 0) {
        elements.push(...renderFolderStructure(subfolder, level + 2));
      }
    });
    
    return elements;
  };

  const handleChoice = (choice: 'separate' | 'combined') => {
    // Store user's choice for this session - SSR-safe
    if (typeof window !== 'undefined' && window.sessionStorage) {
      try {
        sessionStorage.setItem('album_creation_preference', choice);
      } catch (error) {
        console.warn('Failed to store album creation preference:', error);
      }
    }
    onChoice(choice);
  };

  const modalContent = (
    <ModalOverlay onClick={onCancel}>
      <StandardModalContent $isRTL={isRTL} onClick={(e) => e.stopPropagation()}>
        <ModalTitle>{t('Create Multiple Albums?')}</ModalTitle>
        
        <ModalDescription>
          {t('We noticed your folder contains subfolders. Would you like to create a separate album for each subfolder, or treat them all as one album?')}
        </ModalDescription>

        <FolderPreview>
          {renderFolderStructure(folderStructure)}
        </FolderPreview>

        <OptionsContainer>
          <OptionButton onClick={() => handleChoice('separate')}>
            <OptionIcon>📁</OptionIcon>
            <OptionContent>
              <OptionTitle>{t('Separate albums by folder')}</OptionTitle>
              <OptionDescription>
                {t('Each subfolder becomes a different album (e.g., "Day1", "Day2")')}
              </OptionDescription>
            </OptionContent>
          </OptionButton>

          <OptionButton onClick={() => handleChoice('combined')}>
            <OptionIcon>🔗</OptionIcon>
            <OptionContent>
              <OptionTitle>{t('Combine all into one album')}</OptionTitle>
              <OptionDescription>
                {t('All files are merged into one album')}
              </OptionDescription>
            </OptionContent>
          </OptionButton>
        </OptionsContainer>

        <ModalCancelButton onClick={onCancel}>
          {t('Cancel')}
        </ModalCancelButton>
      </StandardModalContent>
    </ModalOverlay>
  );

  // SSR-safe portal: only render portal on client-side after mount
  if (!isMounted) {
    return null;
  }

  // Use React Portal to render the modal at the document body level
  return ReactDOM.createPortal(modalContent, document.body);
};