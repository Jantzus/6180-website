// src/lib/i18n/styled.tsx
import styled from 'styled-components';

// Styled components for the language selector
// These are SSR-safe as they don't access browser APIs during definition
export const SelectorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  inline-size: fit-content;
`;

export const GlobeIcon = styled.label`
  font-weight: normal;
  font-size: 1em;
  cursor: pointer;
  user-select: none;
`;

export const SelectBox = styled.select`
  padding: 5px 10px;
  background-color: transparent;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  min-width: 150px;
  appearance: auto;
  transition: border-color 0.2s ease;
  
  /* Ensure consistent appearance across browsers */
  box-sizing: border-box;
  
  &:hover {
    border-color: #bbb;
  }
  
  &:focus {
    outline: none;
    border-color: #999;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.05);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  /* Responsive design - mobile-friendly touch targets */
  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 16px; /* Prevent zoom on iOS */
    min-width: 120px;
  }
  
  /* High contrast mode support */
  @media (prefers-contrast: high) {
    border-color: #000;
    
    &:focus {
      border-color: #000;
      box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.3);
    }
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const Option = styled.option`
  padding: 5px;
  background-color: white;
  color: black;
  
  /* Ensure options are readable */
  &:hover,
  &:focus {
    background-color: #f0f0f0;
  }
`;