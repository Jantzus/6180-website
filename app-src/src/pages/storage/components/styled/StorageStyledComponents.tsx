import styled from 'styled-components';
import { DirectionalProps } from '@/styles/theme'

// Import theme from the main styled-components file
const theme = {
  colors: {
    primary: "#007bff",
    primaryDark: "#0056b3",
    secondary: "#6c757d",
    success: "#4caf50",
    danger: "#e53935",
    warning: "#ff9800",
    light: "#f9fafb",
    white: "#fff",
    text: {
      primary: "#333",
      secondary: "#666",
      light: "#777"
    },
    background: {
      primary: "#f9fafb",
      card: "#fff",
      highlight: "#f0f7ff"
    },
    border: "#ddd",
    grayLight: "#e0e0e0"
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px"
  },
  borderRadius: {
    small: "4px",
    medium: "8px",
    large: "16px"
  },
  boxShadow: {
    sm: "0 1px 2px rgba(0,0,0,0.06)",
    md: "0 1px 3px rgba(0,0,0,0.1)",
    lg: "0 4px 10px rgba(0,0,0,0.08)"
  }
};

interface StorageProgressProps {
  $percentage: number;
}

interface PlanCardProps {
  $isSelected: boolean;
  $isInsufficient?: boolean;
}

// Storage-specific styled components
export const PageContainer = styled.div<DirectionalProps>`
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.background.primary};
  min-height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  direction: ${props => props.$isRTL ? 'rtl' : 'ltr'};
  position: relative;
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  margin: 0 0 ${theme.spacing.md} 0;
  color: ${theme.colors.text.primary};
`;

export const StorageBar = styled.div`
  background-color: ${theme.colors.grayLight};
  border-radius: ${theme.borderRadius.small};
  height: 20px;
  overflow: hidden;
  margin: ${theme.spacing.md} 0;
`;

export const StorageProgress = styled.div<StorageProgressProps>`
  height: 100%;
  background-color: ${props => {
    if (props.$percentage > 90) return theme.colors.danger;
    if (props.$percentage > 75) return theme.colors.warning;
    return theme.colors.primary;
  }};
  width: ${props => Math.min(props.$percentage, 100)}%;
  transition: width 0.3s ease;
`;

export const StorageInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: ${theme.colors.text.secondary};
`;

export const PlanGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};
`;

export const PlanCard = styled.div<PlanCardProps>`
  border: ${props => {
    if (props.$isInsufficient) return `2px solid ${theme.colors.danger}`;
    return props.$isSelected ? `2px solid ${theme.colors.primary}` : `1px solid ${theme.colors.grayLight}`;
  }};
  border-radius: ${theme.borderRadius.medium};
  padding: ${theme.spacing.md};
  cursor: ${props => props.$isInsufficient ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  background-color: ${props => {
    if (props.$isInsufficient) return '#ffebee';
    return props.$isSelected ? theme.colors.background.highlight : theme.colors.white;
  }};
  opacity: ${props => props.$isInsufficient ? 0.7 : 1};
  position: relative;
`;

export const PlanTitle = styled.h3`
  margin: 0 0 ${theme.spacing.sm} 0;
  font-size: 16px;
  color: ${theme.colors.text.primary};
`;

export const PlanPrice = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm};
`;

export const InsufficientBadge = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: ${theme.colors.danger};
  color: white;
  font-size: 10px;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 12px;
  white-space: nowrap;
  box-shadow: ${theme.boxShadow.sm};
`;

export const LoadingSpinner = styled.div`
  border: 2px solid ${theme.colors.grayLight};
  border-top: 2px solid ${theme.colors.primary};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  display: inline-block;
  margin-right: ${theme.spacing.sm};

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const StripeContainer = styled.div`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.medium};
  box-shadow: ${theme.boxShadow.lg};
  padding: 40px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  width: min(450px, calc(100vw - 64px));
  max-height: calc(100vh - 64px);
  overflow-y: auto;
  
  @media (max-width: 480px) {
    width: calc(100vw - 80px);
    max-height: calc(100vh - 80px);
    padding: ${theme.spacing.lg};
  }
`;

export const StripeOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
`;

export const PaymentMethodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${theme.spacing.sm};
  margin: ${theme.spacing.md} 0;
`;

export const PaymentMethodCard = styled.div<{$isSelected: boolean}>`
  border: 2px solid ${props => props.$isSelected ? theme.colors.primary : theme.colors.border};
  border-radius: ${theme.borderRadius.medium};
  padding: ${theme.spacing.md};
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${props => props.$isSelected ? theme.colors.background.highlight : theme.colors.white};
`;

export const ProRataInfo = styled.div`
  background-color: ${theme.colors.background.primary};
  border-radius: ${theme.borderRadius.medium};
  padding: ${theme.spacing.md};
  margin: ${theme.spacing.md} 0;
  border-left: 4px solid ${theme.colors.success};
`;

export const StripeElementContainer = styled.div`
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.small};
  padding: 10px 12px;
  margin-bottom: ${theme.spacing.md};
  background-color: ${theme.colors.white};

  .StripeElement {
    width: 100%;
  }

  .StripeElement--focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;