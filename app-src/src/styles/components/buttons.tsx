import styled from "styled-components";
import { theme, type ButtonProps } from "../theme";
import { buttonBaseStyle } from "../globalStyles";

// ========== Button Components ==========

export const Button = styled.button<ButtonProps>`
  ${buttonBaseStyle}
  background-color: ${props => {
    if (props.$primary) return props.$isHovered ? theme.colors.primaryDark : theme.colors.primary;
    if (props.$passwordSet) return theme.colors.black;
    return 'transparent';
  }};
  color: ${props => {
    if (props.$primary) return theme.colors.text.white;
    if (props.$passwordSet) return theme.colors.white;
    return theme.colors.primary;
  }};
  /* Enhanced: Lighter font weight for premium feel */
  font-weight: 500;
  /* FIXED: Consistent padding for uniform button heights */
  padding: 8px 16px; /* Standardized to 8px vertical, 16px horizontal */
  /* Enhanced: Consistent font size */
  font-size: ${theme.fontSizes.sm}; /* 14px */
  border: ${props => props.$primary ? 'none' : `1px solid ${theme.colors.primary}`};
  border-radius: ${theme.borderRadius.medium};
  min-width: 120px; /* Reduced slightly for better mobile fit */
  white-space: nowrap; /* Prevent text wrapping */
  text-align: center;
  box-shadow: ${props => props.$primary ? theme.boxShadow.primaryBtn : 'none'};
  align-items: center;
  justify-content: center;
  /* FIXED: Ensure consistent line-height for uniform button heights */
  line-height: 1.4;
  height: 40px; /* Fixed height to ensure all buttons are exactly the same height */
  
  /* Fix for mobile hover state sticking */
  &:hover {
    background-color: ${props => {
      if (props.$primary) return theme.colors.primaryDark;
      if (props.$passwordSet) return '#333333';
      return theme.colors.grayLighter;
    }};
  }
  
  /* Remove hover effects on touch devices */
  @media (hover: none) and (pointer: coarse) {
    &:hover {
      background-color: ${props => {
        if (props.$primary) return props.$isHovered ? theme.colors.primaryDark : theme.colors.primary;
        if (props.$passwordSet) return theme.colors.black;
        return 'transparent';
      }};
    }
  }
  
  /* Ensure active/focus states don't stick on mobile */
  &:active,
  &:focus {
    outline: none;
  }
  
  /* On touch devices, only show feedback during actual press */
  @media (hover: none) and (pointer: coarse) {
    &:active {
      background-color: ${props => {
        if (props.$primary) return theme.colors.primaryDark;
        if (props.$passwordSet) return '#333333';
        return theme.colors.grayLighter;
      }};
      transform: scale(0.98);
      transition: all 0.1s ease;
    }
  }
`;

export const BackButton = styled.button`
  background: transparent;
  border: 1px solid ${theme.colors.primary};
  color: ${theme.colors.primary};
  padding: 8px 16px;
  border-radius: ${theme.borderRadius.medium};
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
  }
  
  /* Remove hover effects on touch devices */
  @media (hover: none) and (pointer: coarse) {
    &:hover {
      background: transparent;
      color: ${theme.colors.primary};
    }
    
    &:active {
      background-color: ${theme.colors.primary};
      color: ${theme.colors.white};
      transform: scale(0.98);
    }
  }
`;

export const MenuButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px; /* Consistent with Button padding */
  width: auto;
  height: 40px; /* Same fixed height as Button */
`;

export const RemoveButton = styled.button<ButtonProps>`
  ${buttonBaseStyle}
  background-color: ${theme.colors.danger};
  color: ${theme.colors.text.white};
  border: none;
  border-radius: ${theme.borderRadius.small};
  padding: 6px ${theme.spacing.sm};
  font-size: ${theme.fontSizes.xs};
  margin-top: auto;
  height: auto;
`;

export const DropdownMenuChoice = styled(Button)`
  width: 100%;
  text-align: left;
  padding: ${theme.spacing.md};
  background: transparent;
  color: ${theme.colors.primary};
  border: none;
  margin: 2px 0;
  height: auto; /* Allow dropdown items to have natural height */
  
  &:hover {
    background-color: ${theme.colors.grayLighter};
  }

  border-bottom: 1px solid ${theme.colors.borderLight};
  
  &:last-of-type {
    border-bottom: none;
  }
  
  /* Remove hover effects on touch devices for dropdown items too */
  @media (hover: none) and (pointer: coarse) {
    &:hover {
      background: transparent;
    }
    
    &:active {
      background-color: ${theme.colors.grayLighter};
    }
  }
`;

// Soft delete button for selected items
export const SoftDeleteButton = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 18px;
  height: 18px;
  border-radius: ${theme.borderRadius.circle};
  border: none;
  background: rgba(220, 53, 69, 0.8);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  z-index: 15;
  opacity: 0;
  transition: all 0.2s ease;
  transform: scale(0.8);
  
  &:hover {
    background: rgba(200, 35, 51, 0.9);
    transform: scale(1);
  }
  
  /* Show on parent hover */
  *:hover > & {
    opacity: 1;
    transform: scale(1);
  }
`;

// ========== Icon Components ==========

export const HamburgerIcon = styled.span`
  width: 18px;
  height: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: ${theme.spacing.sm};
`;

export const HamburgerLine = styled.span`
  height: 2px;
  background: ${theme.colors.primary};
  width: 100%;
`;


export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 9998; /* Just below header, above normal content */
  background-color: ${theme.colors.white};
  box-shadow: ${theme.boxShadow.md};
  border-radius: ${theme.borderRadius.small};
  padding: ${theme.spacing.sm};
  display: flex;
  flex-direction: column;
  min-width: 180px;
  margin-top: ${theme.spacing.xs};
`;