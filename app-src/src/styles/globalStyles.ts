import { createGlobalStyle, css } from "styled-components";
import { theme } from "./theme";

// ========== Global Styles ==========

export const GlobalStyle = createGlobalStyle`
  @keyframes loadingAnimation {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  
  * {
    box-sizing: border-box;
    -webkit-text-size-adjust: 100%;
  }
  
  html {
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-x: hidden;
  }
  
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-x: hidden;
    font-family: 'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    background: linear-gradient(135deg, ${theme.colors.background.gradientStart} 0%, ${theme.colors.background.gradientEnd} 100%);
    min-height: 100vh;
    background-attachment: fixed;
  }

  #root {
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
  }  
`;

// ========== Mixins & Utilities ==========

// Directional styles mixin
export const directionalStyles = (isRTL: boolean) => css`
  direction: ${isRTL ? 'rtl' : 'ltr'};
`;

// Enhanced card style with softer shadow
export const cardStyle = css`
  background-color: ${theme.colors.background.card};
  border-radius: ${theme.borderRadius.medium};
  box-shadow: ${theme.boxShadow.md};
`;

// Enhanced form input style with improved visual design
export const formInputStyle = css`
  width: 100%;
  padding: 14px 16px;
  font-size: ${theme.fontSizes.md};
  font-family: inherit;
  line-height: 1.5;
  border-radius: ${theme.borderRadius.medium};
  border: 1px solid ${theme.colors.borderLight};
  box-sizing: border-box;
  background-color: ${theme.colors.white};
  color: ${theme.colors.text.primary};
  transition: all 0.3s ease;
  box-shadow: ${theme.boxShadow.inputSoft};
  
  // Enhanced placeholder styling for elegance
  &::placeholder {
    color: ${theme.colors.text.lighter};
    opacity: 0.7;
    font-size: ${theme.fontSizes.md};
    font-family: inherit;
    font-weight: normal;
  }
  
  // Remove browser-specific styling differences
  &::-webkit-input-placeholder {
    color: ${theme.colors.text.lighter};
    opacity: 0.7;
  }
  
  &::-moz-placeholder {
    color: ${theme.colors.text.lighter};
    opacity: 0.7;
  }
  
  &:-ms-input-placeholder {
    color: ${theme.colors.text.lighter};
    opacity: 0.7;
  }
  
  /* Enhanced focus state with blue glow */
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.boxShadow.focusGlow}, ${theme.boxShadow.inputSoft};
  }
  
  /* Subtle hover state for better UX */
  &:hover:not(:focus) {
    border-color: ${theme.colors.border};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

export const buttonBaseStyle = css<{ disabled?: boolean; $isDisabled?: boolean }>`
  cursor: ${props => (props.disabled || props.$isDisabled) ? 'not-allowed' : 'pointer'};
  opacity: ${props => (props.disabled || props.$isDisabled) ? 0.6 : 1};
  transition: all 0.2s ease;
  border-radius: ${theme.borderRadius.medium};
`;

export const overlayStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;