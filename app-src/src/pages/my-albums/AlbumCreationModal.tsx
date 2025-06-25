import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n";

// Styled components for the modal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  padding: 20px;
`;

const ModalContent = styled.div<{ $isRTL: boolean }>`
  background: white;
  border-radius: 16px;
  padding: 32px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  direction: ${props => props.$isRTL ? 'rtl' : 'ltr'};
  animation: modalFadeIn 0.3s ease-out;
  
  @media (max-width: 768px) {
    padding: 24px;
    margin: 20px;
    max-width: calc(100vw - 40px);
  }
  
  @keyframes modalFadeIn {
    from {
      opacity: 0;
      transform: scale(0.9) translateY(-20px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`;

const ModalTitle = styled.h2`
  margin: 0 0 16px 0;
  font-size: 24px;
  font-weight: 600;
  color: #333;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const ModalDescription = styled.p`
  margin: 0 0 24px 0;
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const FolderPreview = styled.div`
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0 24px 0;
  font-family: monospace;
  font-size: 14px;
  color: #495057;
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
  gap: 12px;
  margin-bottom: 24px;
`;

const OptionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 16px;
  text-align: left;
  width: 100%;

  &:hover {
    border-color: #007bff;
    background: #f8f9ff;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    padding: 14px 16px;
    font-size: 14px;
  }
`;

const OptionIcon = styled.span`
  font-size: 20px;
  flex-shrink: 0;
`;

const OptionContent = styled.div`
  flex: 1;
`;

const OptionTitle = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
`;

const OptionDescription = styled.div`
  font-size: 14px;
  color: #666;
  line-height: 1.4;
`;

const CancelButton = styled.button`
  width: 100%;
  padding: 12px 24px;
  border: 1px solid #6c757d;
  border-radius: 8px;
  background: transparent;
  color: #6c757d;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #6c757d;
    color: white;
  }
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
          <span style={{ color: '#999', fontSize: '12px' }}>
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
          <span style={{ color: '#999', fontSize: '12px' }}>
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
      <ModalContent $isRTL={isRTL} onClick={(e) => e.stopPropagation()}>
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

        <CancelButton onClick={onCancel}>
          {t('Cancel')}
        </CancelButton>
      </ModalContent>
    </ModalOverlay>
  );

  // SSR-safe portal: only render portal on client-side after mount
  if (!isMounted) {
    return null;
  }

  // Use React Portal to render the modal at the document body level
  return ReactDOM.createPortal(modalContent, document.body);
};