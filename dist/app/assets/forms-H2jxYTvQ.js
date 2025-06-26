import{t as o,d as t,bo as e}from"./layout-D_Ibv38s.js";const i=t.div`
  /* Enhanced: Use consistent grid spacing */
  margin-bottom: ${o.spacing.lg};
`,s=t.label`
  display: block;
  /* Enhanced: Use consistent grid spacing */
  margin-bottom: ${o.spacing.md};
  font-size: ${o.fontSizes.sm};
  font-weight: 500;
  color: ${o.colors.text.primary};
`,a=t.input`
  ${e}
`,c=t.textarea`
  ${e}
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
`;t.input`
  display: none;
`;const l=t.input`
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
`;t.input`
  width: 100%;
  padding: 10px;
  margin-bottom: ${o.spacing.sm};
  border-radius: ${o.borderRadius.small};
  border: 1px solid ${o.colors.border};
  font-size: ${o.fontSizes.md};
  text-align: ${r=>r.$isRTL?"right":"left"};
`;t.div`
  color: ${o.colors.danger};
  margin-bottom: ${o.spacing.sm};
  font-size: ${o.fontSizes.sm};
`;const d=t.div`
  text-align: center;
  /* Enhanced: Use consistent grid spacing */
  margin-top: ${o.spacing.lg};
  font-size: 11px;
  color: ${o.colors.text.secondary};
`;export{i as F,l as I,d as T,s as a,a as b,c};
