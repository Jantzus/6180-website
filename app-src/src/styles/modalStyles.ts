import styled from "styled-components";
import { Button } from "./components/buttons";
import { theme, ModalProps } from "@/styles/theme";

export const Modal = styled.div<ModalProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.overlay};
  z-index: ${props => props.$zIndex || 10000}; /* Always above header (9999) */
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Common Modal Overlay with backdrop blur
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${theme.colors.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  padding: 20px;
  overflow: hidden;
  overscroll-behavior: contain;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 16px;
  }
`;

// Common Modal Content with RTL support and animation
export const ModalContent = styled.div<{ $isRTL: boolean }>`
  background: ${theme.colors.background.card};
  border-radius: ${theme.borderRadius.large};
  padding: ${theme.spacing.xl};
  width: 100%;
  box-shadow: ${theme.boxShadow.xl};
  direction: ${props => props.$isRTL ? 'rtl' : 'ltr'};
  animation: modalFadeIn 0.3s ease-out;
  position: relative;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.lg};
    border-radius: ${theme.borderRadius.medium};
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

// Standard Modal Title
export const ModalTitle = styled.h2`
  margin: 0 0 ${theme.spacing.md} 0;
  font-size: ${theme.fontSizes.xxl};
  font-weight: 600;
  color: ${theme.colors.text.primary};
  text-align: center;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.fontSizes.xl};
  }
`;

// Standard Modal Description/Subtitle
export const ModalDescription = styled.p`
  margin: 0 0 ${theme.spacing.lg} 0;
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.text.secondary};
  line-height: 1.5;
  text-align: center;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.fontSizes.sm};
  }
`;

// Base Modal Button (extends the main Button component)
export const ModalButton = styled(Button)`
  width: 100%;
  padding: 12px ${theme.spacing.lg};
  font-size: ${theme.fontSizes.sm};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 14px ${theme.spacing.md};
  }
`;

// Cancel/Secondary Modal Button
export const ModalCancelButton = styled(ModalButton)`
  background: transparent;
  color: ${theme.colors.text.secondary};
  border: 1px solid ${theme.colors.text.secondary};

  &:hover {
    background: ${theme.colors.text.secondary};
    color: ${theme.colors.white};
  }
`;

// Primary Modal Button
export const ModalPrimaryButton = styled(ModalButton)`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;

  &:hover:not(:disabled) {
    background: ${theme.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

// Modal Header (for modals with header sections)
export const ModalHeader = styled.div<{ $isRTL: boolean }>`
  padding: ${theme.spacing.lg} ${theme.spacing.lg} ${theme.spacing.md} ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.borderLight};
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: ${props => props.$isRTL ? 'row-reverse' : 'row'};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.sm} ${theme.spacing.md};
  }
`;

// Modal Body (for modals with scrollable content)
export const ModalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
  }
`;

// Modal Footer (for modals with action buttons at bottom)
export const ModalFooter = styled.div<{ $isRTL: boolean }>`
  padding: ${theme.spacing.sm} ${theme.spacing.lg} ${theme.spacing.lg} ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.borderLight};
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: ${props => props.$isRTL ? 'row-reverse' : 'row'};
  gap: ${theme.spacing.sm};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.lg} ${theme.spacing.md};
    flex-direction: column;
    gap: ${theme.spacing.md};
    align-items: stretch;
  }
`;

// Flex Modal Content (for modals that need flex layout)
export const FlexModalContent = styled(ModalContent)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-height: 90vh;
  max-width: 90vw;
`;

// Standard Modal Content (for simple modals)
export const StandardModalContent = styled(ModalContent)`
  max-width: 500px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    max-width: calc(100vw - 32px);
  }
`;

// Wide Modal Content (for modals with more content)
export const WideModalContent = styled(ModalContent)`
  max-width: 1200px;
  max-height: 90vh;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    max-width: calc(100vw - 32px);
  }
`;
