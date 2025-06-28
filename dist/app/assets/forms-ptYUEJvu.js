import{t as o,d as e,bh as t}from"./buttons-DAdOhyvx.js";const i=e.div`
  /* Enhanced: Use consistent grid spacing */
  margin-bottom: ${o.spacing.lg};
`,n=e.label`
  display: block;
  /* Enhanced: Use consistent grid spacing */
  margin-bottom: ${o.spacing.md};
  font-size: ${o.fontSizes.sm};
  font-weight: 500;
  color: ${o.colors.text.primary};
`,a=e.input`
  ${t}
`,c=e.textarea`
  ${t}
  resize: vertical;
  min-height: 100px; /* Increased minimum height */
  font-family: inherit;
  
  // Ensure consistent placeholder styling with FormInput
  &::placeholder {
    color: ${o.colors.text.lighter};
    opacity: 0.7;
    font-size: ${o.fontSizes.md};
    font-family: inherit;
    font-weight: normal;
    line-height: 1.5;
  }
`;e.input`
  display: none;
`;const l=e.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 6px;
  /* Enhanced: Remove border until focused */
  border: 1px solid transparent;
  background-color: ${o.colors.grayLighter};
  font-size: 16px;
  box-sizing: border-box;
  transition: all 0.2s ease;
  
  /* Enhanced placeholder styling for elegance */
  &::placeholder {
    color: ${o.colors.text.lighter};
    opacity: 0.5; // Lower opacity for more elegant appearance
  }
  
  /* Enhanced: Light blue glow on focus */
  &:focus {
    outline: none;
    border-color: ${o.colors.primary};
    background-color: ${o.colors.white};
    box-shadow: ${o.boxShadow.focusGlow};
  }
  
  /* Subtle hover state */
  &:hover:not(:focus) {
    background-color: ${o.colors.white};
    border-color: ${o.colors.borderLight};
  }
`,d=e.input`
  width: 100%;
  padding: 10px;
  margin-bottom: ${o.spacing.sm};
  border-radius: ${o.borderRadius.small};
  border: 1px solid ${o.colors.border};
  font-size: ${o.fontSizes.md};
  text-align: ${r=>r.$isRTL?"right":"left"};
`;e.div`
  color: ${o.colors.danger};
  margin-bottom: ${o.spacing.sm};
  font-size: ${o.fontSizes.sm};
`;const p=e.div`
  text-align: center;
  /* Enhanced: Use consistent grid spacing */
  margin-top: ${o.spacing.lg};
  font-size: 11px;
  color: ${o.colors.text.secondary};
`,h=e.select`
  padding: 8px 12px;
  border-radius: ${o.borderRadius.medium}; /* Match tag styling */
  border: 1px solid ${o.colors.borderLight};
  background-color: ${o.colors.white};
  font-size: 14px; /* Match tag font size */
  cursor: pointer;
  box-shadow: ${o.boxShadow.sm}; /* Subtle shadow to match tags */
  min-width: 60px;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${o.colors.border};
    box-shadow: ${o.boxShadow.md};
  }
  
  &:focus {
    outline: none;
    border-color: ${o.colors.primary};
    box-shadow: ${o.boxShadow.focusGlow};
  }
`,g=e.div`
  position: absolute;
  top: ${o.spacing.sm};
  right: ${o.spacing.sm};
  z-index: 10;
  width: 24px;
  height: 24px;
  border-radius: ${o.borderRadius.circle};
  background-color: ${r=>r.$isSelected?o.colors.primary:"rgba(255, 255, 255, 0.8)"};
  border: ${r=>r.$isSelected?"none":`2px solid ${o.colors.primary}`};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${o.boxShadow.selection};
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`,b=e.div`
  color: ${o.colors.white};
  font-size: ${o.fontSizes.sm};
  font-weight: bold;
`;export{b as C,i as F,l as I,g as S,p as T,d as U,n as a,a as b,c,h as d};
