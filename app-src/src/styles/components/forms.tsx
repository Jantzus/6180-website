import styled from "styled-components";
import { theme, type DirectionalProps } from "../theme";
import { formInputStyle } from "../globalStyles";

// ========== Form Components ==========

export const FormGroup = styled.div`
  /* Enhanced: Use consistent grid spacing */
  margin-bottom: ${theme.spacing.lg};
`;

export const FormLabel = styled.label`
  display: block;
  /* Enhanced: Use consistent grid spacing */
  margin-bottom: ${theme.spacing.md};
  font-size: ${theme.fontSizes.sm};
  font-weight: 500;
  color: ${theme.colors.text.primary};
`;

export const FormInput = styled.input`
  ${formInputStyle}
`;

export const FormTextarea = styled.textarea`
  ${formInputStyle}
  resize: vertical;
  min-height: 100px; /* Increased minimum height */
  font-family: inherit;
  
  // Ensure consistent placeholder styling with FormInput
  &::placeholder {
    color: ${theme.colors.text.lighter};
    opacity: 0.7;
    font-size: ${theme.fontSizes.md};
    font-family: inherit;
    font-weight: normal;
    line-height: 1.5;
  }
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

// Enhanced Input component with visual polish
export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 6px;
  /* Enhanced: Remove border until focused */
  border: 1px solid transparent;
  background-color: ${theme.colors.grayLighter};
  font-size: 16px;
  box-sizing: border-box;
  transition: all 0.2s ease;
  
  /* Enhanced placeholder styling for elegance */
  &::placeholder {
    color: ${theme.colors.text.lighter};
    opacity: 0.5; // Lower opacity for more elegant appearance
  }
  
  /* Enhanced: Light blue glow on focus */
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    background-color: ${theme.colors.white};
    box-shadow: ${theme.boxShadow.focusGlow};
  }
  
  /* Subtle hover state */
  &:hover:not(:focus) {
    background-color: ${theme.colors.white};
    border-color: ${theme.colors.borderLight};
  }
`;

export const UsernameInput = styled.input<DirectionalProps>`
  width: 100%;
  padding: 10px;
  margin-bottom: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.small};
  border: 1px solid ${theme.colors.border};
  font-size: ${theme.fontSizes.md};
  text-align: ${props => props.$isRTL ? 'right' : 'left'};
`;

export const UsernameError = styled.div`
  color: ${theme.colors.danger};
  margin-bottom: ${theme.spacing.sm};
  font-size: ${theme.fontSizes.sm};
`;

// ========== Two-Factor Authentication Components ==========

export const TwoFactorAuthLabel = styled.div`
  text-align: center;
  /* Enhanced: Use consistent grid spacing */
  margin-top: ${theme.spacing.lg};
  font-size: 11px;
  color: ${theme.colors.text.secondary};
`;