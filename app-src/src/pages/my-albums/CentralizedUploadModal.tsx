// CentralizedUploadModal.tsx - New component for centralized upload progress

import React from 'react';
import styled from 'styled-components';
import { UploadProgress } from '@/components/UploadProgress';
import { ProgressTracker } from '@/lib/types';

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
  z-index: 9999;
  backdrop-filter: blur(2px);
`;

const ModalContent = styled.div<{ $isRTL: boolean }>`
  background: white;
  border-radius: 16px;
  padding: 32px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  direction: ${props => props.$isRTL ? 'rtl' : 'ltr'};
`;

const ModalHeader = styled.div<{ $isRTL: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  text-align: ${props => props.$isRTL ? 'right' : 'left'};
`;

const ModalIcon = styled.div`
  font-size: 24px;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #007bff, #0056b3);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const ModalTitleSection = styled.div`
  flex: 1;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #333;
  line-height: 1.2;
`;

const ModalSubtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.4;
`;

const ProgressSection = styled.div`
  margin-bottom: 24px;
`;

const ButtonSection = styled.div<{ $isRTL: boolean }>`
  display: flex;
  gap: 12px;
  justify-content: ${props => props.$isRTL ? 'flex-start' : 'flex-end'};
  flex-direction: ${props => props.$isRTL ? 'row-reverse' : 'row'};
`;

const CancelButton = styled.button`
  padding: 12px 24px;
  background: transparent;
  border: 2px solid #dc3545;
  border-radius: 8px;
  color: #dc3545;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 100px;

  &:hover {
    background: #dc3545;
    color: white;
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const HideButton = styled.button`
  padding: 12px 24px;
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  color: #495057;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 100px;

  &:hover {
    background: #e9ecef;
    border-color: #dee2e6;
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }
`;

interface CentralizedUploadModalProps {
  isVisible: boolean;
  albumName: string | null;
  progressTracker: ProgressTracker;
  isUploading: boolean;
  isProcessingFiles: boolean;
  isRTL: boolean;
  onCancel: () => void;
  onHide: () => void;
  canCancel: boolean;
  t: (key: string, options?: any) => string;
}

export const CentralizedUploadModal: React.FC<CentralizedUploadModalProps> = ({
  isVisible,
  albumName,
  progressTracker,
  isUploading,
  isProcessingFiles,
  isRTL,
  onCancel,
  onHide,
  canCancel,
  t
}) => {
  if (!isVisible) return null;

  const isActive = isUploading || isProcessingFiles;
  const showCancel = canCancel && isActive;

  return (
    <ModalOverlay onClick={(e) => e.target === e.currentTarget && onHide()}>
      <ModalContent $isRTL={isRTL} onClick={(e) => e.stopPropagation()}>
        <ModalHeader $isRTL={isRTL}>
          <ModalIcon>
            📸
          </ModalIcon>
          <ModalTitleSection>
            <ModalTitle>
              {albumName ? 
                t('Adding Photos to Album') : 
                t('Creating New Album')
              }
            </ModalTitle>
            <ModalSubtitle>
              {albumName || t('Uploading your photos...')}
            </ModalSubtitle>
          </ModalTitleSection>
        </ModalHeader>

        <ProgressSection>
          <UploadProgress 
            progressTracker={progressTracker}
            isUploading={isUploading}
            isProcessingFiles={isProcessingFiles}
            isRTL={isRTL}
            context="uploading"
            showSuccessMessage={false}
            showErrorMessage={true}
            variant="detailed"
            style={{ 
              background: 'transparent',
              border: 'none',
              padding: 0
            }}
          />
        </ProgressSection>

        <ButtonSection $isRTL={isRTL}>
          {showCancel && (
            <CancelButton onClick={onCancel}>
              {t('Cancel Upload')}
            </CancelButton>
          )}
          
          {!isActive && (
            <HideButton onClick={onHide}>
              {t('Close')}
            </HideButton>
          )}
        </ButtonSection>
      </ModalContent>
    </ModalOverlay>
  );
};