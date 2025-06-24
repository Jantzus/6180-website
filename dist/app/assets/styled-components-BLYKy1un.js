import{aI as m,q as i,d as t}from"./utils-DBhM6xd7.js";const o={colors:{primary:"#007bff",primaryDark:"#0056b3",success:"#4caf50",danger:"#e53935",warning:"#ff9800",info:"#2196f3",gray:"#8c8c8c",grayLight:"#e0e0e0",grayLighter:"#f0f0f0",white:"#fff",black:"#000",overlay:"rgba(0, 0, 0, 0.7)",overlayLight:"rgba(0, 0, 0, 0.5)",border:"#ddd",borderLight:"#eaeaea",selectionBorder:"rgba(0, 123, 255, 0.6)",text:{primary:"#333",secondary:"#666",light:"#777",lighter:"#999",subtle:"#aaa",white:"#fff"},background:{primary:"#f9fafb",gradientStart:"#fdfdfd",gradientEnd:"#f6f6f6",card:"#fff",highlight:"#f0f7ff",error:"#fdeded"},highlight:{border:"#cce0ff",error:"#f7d0d0"}},spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px"},borderRadius:{small:"4px",medium:"8px",large:"16px",circle:"50%"},fontSizes:{xs:"12px",sm:"14px",md:"16px",lg:"18px",xxl:"24px"},boxShadow:{sm:"0 1px 2px rgba(0,0,0,0.06)",md:"0 1px 3px rgba(0,0,0,0.1)",xl:"0 8px 24px rgba(0,0,0,0.2)",cardSoft:"0 8px 32px rgba(0,0,0,0.08)",primaryBtn:"0 4px 12px rgba(0, 123, 255, 0.2)",selection:"0 2px 4px rgba(0, 0, 0, 0.2)",textShadow:"0 0 5px rgba(0, 0, 0, 0.8)",focusGlow:"0 0 0 2px rgba(153, 202, 255, 0.4)",selectionGlow:"0 0 0 3px rgba(0, 123, 255, 0.3), 0 4px 12px rgba(0, 123, 255, 0.15)",inputSoft:"0 2px 8px rgba(0, 0, 0, 0.04)"},breakpoints:{mobile:"767px"}},a="64px",d="60px",f=m`
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
    background: linear-gradient(135deg, ${o.colors.background.gradientStart} 0%, ${o.colors.background.gradientEnd} 100%);
    min-height: 100vh;
    background-attachment: fixed;
  }

  #root {
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
  }  
`,c=e=>i`
  direction: ${e?"rtl":"ltr"};
`,r=e=>i`
  @media (max-width: ${o.breakpoints.mobile}) {
    ${e}
  }
`,n=i`
  background-color: ${o.colors.background.card};
  border-radius: ${o.borderRadius.medium};
  box-shadow: ${o.boxShadow.md};
`,l=i`
  width: 100%;
  padding: 14px 16px;
  font-size: ${o.fontSizes.md};
  font-family: inherit;
  line-height: 1.5;
  border-radius: ${o.borderRadius.medium};
  border: 1px solid ${o.colors.borderLight};
  box-sizing: border-box;
  background-color: ${o.colors.white};
  color: ${o.colors.text.primary};
  transition: all 0.3s ease;
  box-shadow: ${o.boxShadow.inputSoft};
  
  // Enhanced placeholder styling for elegance
  &::placeholder {
    color: ${o.colors.text.lighter};
    opacity: 0.7;
    font-size: ${o.fontSizes.md};
    font-family: inherit;
    font-weight: normal;
  }
  
  // Remove browser-specific styling differences
  &::-webkit-input-placeholder {
    color: ${o.colors.text.lighter};
    opacity: 0.7;
  }
  
  &::-moz-placeholder {
    color: ${o.colors.text.lighter};
    opacity: 0.7;
  }
  
  &:-ms-input-placeholder {
    color: ${o.colors.text.lighter};
    opacity: 0.7;
  }
  
  /* Enhanced focus state with blue glow */
  &:focus {
    outline: none;
    border-color: ${o.colors.primary};
    box-shadow: ${o.boxShadow.focusGlow}, ${o.boxShadow.inputSoft};
  }
  
  /* Subtle hover state for better UX */
  &:hover:not(:focus) {
    border-color: ${o.colors.border};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,g=i`
  cursor: ${e=>e.disabled||e.$isDisabled?"not-allowed":"pointer"};
  opacity: ${e=>e.disabled||e.$isDisabled?.6:1};
  transition: all 0.2s ease;
  border-radius: ${o.borderRadius.medium};
`,h=i`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`,w=t.div`
  max-width: 1200px;
  margin: auto;
  background: ${o.colors.background.primary};
  color: ${o.colors.text.primary};
  line-height: 1.5;
  /* Enhanced: Increased top padding for more breathing room from fixed header */
  padding: calc(${a} + 24px) ${o.spacing.md} ${o.spacing.md};
  width: 100%;
  overflow-x: hidden;
  min-height: 100vh;
  position: relative;
  
  ${r(`
    padding: calc(${d} + 20px) ${o.spacing.sm} ${o.spacing.sm};
  `)}
`,y=t.div`
  padding: ${o.spacing.md};
  background: linear-gradient(135deg, ${o.colors.background.gradientStart} 0%, ${o.colors.background.gradientEnd} 100%);
  min-height: 100vh;
  max-width: 100vw;
  position: relative;
  ${e=>c(e.$isRTL)}
  
  ${r(`
    padding: ${o.spacing.sm};
  `)}
`,v=t.div`
  /* Enhanced: Use consistent grid spacing (24px) for uniform alignment */
  padding: ${o.spacing.sm} ${o.spacing.lg} ${o.spacing.lg};
  width: 100%;
  overflow: visible;
  
  ${r(`
    padding: ${o.spacing.sm} ${o.spacing.lg} ${o.spacing.sm};
    width: 100%;
  `)}
`;t.div`
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
  position: relative;
`;const z=t.div`
  /* Fixed positioning for 100% reliability */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: ${a};
  
  /* Enhanced styling with subtle blur and divider */
  background-color: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid ${o.colors.borderLight};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px); /* Safari support */
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  
  /* Fixed z-index - stays below modals but above normal content */
  z-index: 9999;
  
  /* Performance optimizations */
  will-change: transform;
  transform: translateZ(0);
  
  /* Mobile adjustments */
  ${r(`
    height: ${d};
  `)}
`,k=t.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${o.spacing.md};
  
  ${r(`
    padding: 0 ${o.spacing.md};
  `)}
`,x=t.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${o.spacing.sm};
  color: ${o.colors.text.secondary};
  font-size: ${o.fontSizes.sm};
  transition: all 0.2s ease;
  /* Enhanced: Increased vertical padding for better visual centering */
  padding: ${o.spacing.md} ${o.spacing.sm};
  border-radius: ${o.borderRadius.small};
  
  &:hover {
    background-color: ${o.colors.grayLighter};
    color: ${o.colors.text.primary};
  }
  
  &:focus {
    outline: 2px solid ${o.colors.primary};
    outline-offset: 2px;
  }
`;t(x)`
  font-style: italic;
  /* Enhanced: Made more subtle with lighter color and smaller font */
  color: ${o.colors.text.subtle}; /* Changed from secondary to subtle for more dimmed appearance */
  font-size: 9px; /* Further reduced from 10px to 9px for even less prominence */
  font-weight: 300; /* Lighter weight for reduced visual load */
  /* Enhanced: Nudged down slightly for better vertical balance */
  margin-top: 5px;
  
  &:hover {
    color: ${o.colors.text.secondary}; /* Lighter hover color than before */
  }
  
  ${r(`
    font-size: 8px; /* Even smaller on mobile */
    max-width: 180px; /* Reduced max width */
    text-align: right;
    margin-top: 3px; /* Smaller nudge on mobile */
  `)}
`;const S=t.img`
  width: 20px;
  height: 20px;
  margin: 0;
  /* Image protection */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
  pointer-events: none;
`,L=t.div`
  display: flex;
  align-items: center;
  flex-direction: ${e=>e.$isRTL?"row-reverse":"row"};
  gap: ${o.spacing.sm};
  margin: 0;
`;t.div`
  max-width: 400px;
  width: 100%;
  /* Enhanced: Increased top padding for breathing room above logo */
  padding: 40px 32px 32px;
  /* Enhanced: Larger border radius for more modern look */
  border-radius: ${o.borderRadius.large}; // 16px as mentioned
  /* Enhanced: Softer, more elevated shadow */
  box-shadow: ${o.boxShadow.cardSoft};
  text-align: center;
  background-color: ${o.colors.background.card};
  /* Add subtle backdrop blur for depth */
  backdrop-filter: blur(10px);
  
  ${r(`
    padding: 32px 24px 24px;
    margin: 0 16px;
  `)}
`;t.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
`;t.div`
  margin-bottom: 24px;
`;t.img`
  height: 60px;
  margin-bottom: 16px;
  /* Image protection */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
  pointer-events: none;
`;const b=t.input`
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
`;t(b)`
  letter-spacing: 2px;
  text-align: center;
`;t.p`
  font-size: 13px;
  color: #666;
  margin-top: 16px;
  text-align: center;
`;t.div`
  margin-top: 16px;
  font-size: 14px;
  color: #666;
  display: flex;
  justify-content: center;
  gap: 8px;
`;t.button`
  background: none;
  border: none;
  color: #007bff;
  padding: 0;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${o.colors.primaryDark};
  }
`;t.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  padding: 20px;
`;t.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;const R=t.div`
  ${n} /* Apply white card styling */
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px; /* Increased spacing before media grid */
  padding: ${o.spacing.lg}; /* Add padding for content inside white box */
  
  ${r(`
    gap: 16px; /* Slightly more spacing on mobile for better separation */
    padding: ${o.spacing.md}; /* Smaller padding on mobile */
  `)}
`;t.div`
  display: flex;
  align-items: flex-start; /* Align to top for better stacking */
  gap: 24px; /* 24px between Columns and Filter by sections */
  flex-wrap: wrap;
  
  ${r(`
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  `)}
`;t.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;const E=t.span`
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
`,I=t.select`
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
`;t.div`
  position: relative;
  background: ${o.colors.white};
  box-shadow: ${o.boxShadow.sm};
  z-index: 10;
  /* Enhanced: Increased margin-bottom for more breathing room */
  margin-bottom: ${o.spacing.xl}; /* 32px instead of 24px */
  width: 100%;
  border-radius: ${o.borderRadius.medium};
  margin-top: 0;
`;t.div`
  display: flex;
  flex-direction: column;
  /* Enhanced: Use consistent grid spacing */
  padding: ${o.spacing.lg};
  
  ${r(`
    padding: ${o.spacing.lg};
  `)}
`;t.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* Enhanced: Use consistent grid spacing */
  margin-top: ${o.spacing.lg};
  margin-bottom: ${o.spacing.sm};
  gap: ${o.spacing.xs}; /* Reduced from sm (8px) to xs (4px) */
  flex-wrap: wrap;
  
  ${e=>e.$fullWidth&&i`
    width: 100%;
    
    > div {
      width: auto;
      display: flex;
      align-items: center;
    }
  `}
`;const j=t.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  /* Enhanced: Use consistent grid spacing */
  margin-bottom: ${o.spacing.lg};
  position: relative;
  z-index: 1;
  margin-top: 0;
  
  ${r(`
    margin-top: 0;
    flex-wrap: wrap;
    gap: ${o.spacing.sm};
  `)}
`;t.div`
  display: flex;
  align-items: center;
  /* Enhanced: Better anchoring - reduce gap and tighten with buttons above */
  margin-top: ${o.spacing.xs}; /* Reduced from sm to xs for tighter grouping */
  margin-left: 0; /* Ensure flush left alignment */
`;t.label`
  margin-right: ${o.spacing.sm};
  font-size: ${o.fontSizes.xs}; /* Reduced from sm to xs for less prominence */
  color: ${o.colors.text.secondary};
  font-weight: normal;
`;t.select`
  padding: 4px ${o.spacing.sm}; /* Reduced vertical padding */
  border: 1px solid ${o.colors.border};
  border-radius: ${o.borderRadius.small};
  background-color: ${o.colors.white};
  cursor: pointer;
  font-size: ${o.fontSizes.xs}; /* Reduced from sm to xs to match label */
  min-width: 50px;
`;const B=t.div`
  display: flex;
  align-items: center;
  flex-direction: ${e=>e.$isRTL?"row":"row-reverse"};
  gap: ${o.spacing.sm};  
`,C=t.img`
  height: 32px;
  /* Image protection */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
  pointer-events: none;
`,U=t.h1`
  font-size: ${o.fontSizes.xxl};
  margin: ${o.spacing.sm} 0;
`,p=t.button`
  ${g}
  background-color: ${e=>e.$primary?e.$isHovered?o.colors.primaryDark:o.colors.primary:e.$passwordSet?o.colors.black:"transparent"};
  color: ${e=>e.$primary?o.colors.text.white:e.$passwordSet?o.colors.white:o.colors.primary};
  /* Enhanced: Lighter font weight for premium feel */
  font-weight: 500;
  /* FIXED: Consistent padding for uniform button heights */
  padding: 8px 16px; /* Standardized to 8px vertical, 16px horizontal */
  /* Enhanced: Consistent font size */
  font-size: ${o.fontSizes.sm}; /* 14px */
  border: ${e=>e.$primary?"none":`1px solid ${o.colors.primary}`};
  border-radius: ${o.borderRadius.medium};
  min-width: 120px; /* Reduced slightly for better mobile fit */
  white-space: nowrap; /* Prevent text wrapping */
  text-align: center;
  box-shadow: ${e=>e.$primary?o.boxShadow.primaryBtn:"none"};
  align-items: center;
  justify-content: center;
  /* FIXED: Ensure consistent line-height for uniform button heights */
  line-height: 1.4;
  height: 40px; /* Fixed height to ensure all buttons are exactly the same height */
  
  &:hover {
    background-color: ${e=>e.$primary?o.colors.primaryDark:e.$passwordSet?"#333333":o.colors.grayLighter};
  }
`,F=t(p)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px; /* Consistent with Button padding */
  width: auto;
  height: 40px; /* Same fixed height as Button */
`,T=t.span`
  width: 18px;
  height: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: ${o.spacing.sm};
`,A=t.span`
  height: 2px;
  background: ${o.colors.primary};
  width: 100%;
`,H=t(p)`
  width: 100%;
  text-align: left;
  padding: ${o.spacing.md};
  background: transparent;
  color: ${o.colors.primary};
  border: none;
  margin: 2px 0;
  height: auto; /* Allow dropdown items to have natural height */
  
  &:hover {
    background-color: ${o.colors.grayLighter};
  }

  border-bottom: 1px solid ${o.colors.borderLight};
  
  &:last-of-type {
    border-bottom: none;
  }
`;t.button`
  ${g}
  background-color: ${o.colors.danger};
  color: ${o.colors.text.white};
  border: none;
  border-radius: ${o.borderRadius.small};
  padding: 6px ${o.spacing.sm};
  font-size: ${o.fontSizes.xs};
  margin-top: auto;
  height: auto;
`;const P=t.div`
  display: flex;
  gap: ${o.spacing.xs};
`,M=t.div`
  display: flex;
  flex-direction: column;
  gap: ${o.spacing.xs}; /* Reduced from sm (8px) to xs (4px) */
  /* Enhanced: Use consistent grid spacing */
  margin-bottom: ${o.spacing.lg};
  width: 100%;
  align-items: flex-end; /* Align buttons to the right side */
  padding: 0 ${o.spacing.sm}; /* Match the header button positioning */
`,D=t.a`
  font-size: ${o.fontSizes.sm};
  color: ${o.colors.primary};
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: ${o.spacing.sm};
  padding: ${o.spacing.xs} 0;
  
  &:hover {
    text-decoration: underline;
  }
`;t.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;t.div`
  font-size: ${o.fontSizes.md};
  color: ${o.colors.text.secondary};
`;const G=t.a`
  text-decoration: none;
  color: ${o.colors.text.white};
  background-color: ${o.colors.primary};
  padding: ${o.spacing.sm} ${o.spacing.md};
  border-radius: ${o.borderRadius.small};
  font-size: ${o.fontSizes.sm};
  display: flex;
  align-items: center;
  gap: 6px;
`,V=t.div`
  /* Enhanced: Use consistent grid spacing */
  margin-bottom: ${o.spacing.lg};
  text-align: center;
  direction: ${e=>e.$isRTL?"rtl":"ltr"};
`,X=t.div`
  display: flex;
  align-items: center;
  justify-content: ${e=>e.$isRTL?"flex-start":"flex-end"};
  margin-bottom: ${o.spacing.sm};
  position: relative;
`;t.div`
  width: 40px;
  height: 40px;
  border-radius: ${o.borderRadius.circle};
  background-color: ${o.colors.grayLight};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${o.fontSizes.lg};
  color: ${o.colors.text.secondary};
`;t.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
`;t.h1`
  font-size: ${o.fontSizes.lg};
  margin: 0;
  font-weight: 600;
`;const N=t.div`
  margin-top: ${o.spacing.sm};
  padding: ${o.spacing.sm};
  background-color: ${o.colors.background.highlight};
  border-radius: ${o.borderRadius.small};
  border: 1px solid ${o.colors.highlight.border};
  max-width: 500px;
  font-size: ${o.fontSizes.xs};
  margin: 0 auto;
  
  p {
    margin: 0;
  }
`,O=t.h2`
  font-weight: 400;
  /* Enhanced: Use consistent grid spacing */
  margin: 0 0 ${o.spacing.lg} 0;
  font-size: ${o.fontSizes.xxl};
  padding: 0;
  
  ${r(`
    padding: 0;
  `)}
`,W=t.strong`
  font-weight: 700;
`,_=t.div`
  ${n}
  /* Enhanced: Use consistent grid spacing */
  padding: ${e=>e.$padding||o.spacing.lg};
  margin-bottom: ${e=>e.$marginBottom||o.spacing.lg};
  width: 100%;
`,Y=t.p`
  color: ${o.colors.text.primary};
  margin: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  max-width: 100%;
  font-size: ${o.fontSizes.md};
`,q=t.div`
  text-align: center;
  padding: 40px;
  font-size: ${o.fontSizes.lg};
  grid-column: 1 / -1;
  width: 100%;
  border-radius: ${o.borderRadius.medium};
  color: ${e=>{switch(e.$type){case"error":return o.colors.danger;case"loading":return o.colors.text.secondary;default:return o.colors.text.primary}}};
`,J=t.div`
  margin-top: ${o.spacing.sm};
  /* Enhanced: Use consistent grid spacing */
  margin-bottom: ${o.spacing.lg};
  font-size: ${o.fontSizes.xs};
  color: ${o.colors.text.secondary};
  line-height: 1.5;
  text-align: ${e=>e.$isRTL?"right":"left"};
  white-space: pre-wrap;
`,K=t.div`
  font-size: ${o.fontSizes.xs};
  color: ${o.colors.text.light};
  text-align: ${e=>e.$isRTL?"right":"left"};
  margin-top: ${o.spacing.xs};
`,Z=t.div`
  display: flex;
  align-items: center;
  font-size: ${o.fontSizes.xs};
  color: ${o.colors.text.secondary};
`,Q=t.div`
  display: grid;
  /* Enhanced: This is the main grid spacing that other elements should align to */
  grid-gap: ${o.spacing.lg};
  width: 100%;
  min-height: 0;
  
  ${e=>{switch(e.$columns){case"1":return i`grid-template-columns: repeat(1, 1fr);`;case"2":return i`grid-template-columns: repeat(2, 1fr);`;case"3":return i`grid-template-columns: repeat(3, 1fr);`;case"4":return i`grid-template-columns: repeat(4, 1fr);`;case"5":return i`grid-template-columns: repeat(5, 1fr);`;default:return i`grid-template-columns: repeat(1, 1fr);`}}}
  
  @media (max-width: ${o.breakpoints.mobile}) {
    grid-gap: ${o.spacing.md};
    ${e=>{const s=parseInt(e.$columns);return s>3?i`grid-template-columns: repeat(3, minmax(0, 1fr));`:s>1?i`grid-template-columns: repeat(${s}, minmax(0, 1fr));`:i`grid-template-columns: repeat(1, minmax(0, 1fr));`}}
  }
`,u=i`
  ${n}
  transition: transform 0.2s;
  position: relative;
  height: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  /* Enhanced: Use consistent grid spacing */
  margin-bottom: ${o.spacing.lg};
  
  ${e=>e.$isHovered&&i`
    transform: translateY(-2px);
  `}
  
  ${r(`
    margin-bottom: ${o.spacing.lg};
  `)}
`;t.div`
  ${u}
  ${e=>e.$isVideo&&i`
    cursor: pointer;
  `}
  ${e=>e.$isSelected&&i`
    border: 3px solid ${o.colors.primary};
    box-shadow: 0 0 0 3px rgba(0, 106, 220, 0.3);
  `}
`;t.div`
  display: flex;
  flex-wrap: wrap;
  /* Enhanced: Use consistent grid spacing */
  gap: ${o.spacing.lg};
  margin-bottom: ${o.spacing.lg};
  width: 100%;
`;const oo=t.div`
  ${n}
  display: flex;
  flex-direction: column;
  padding: ${o.spacing.sm};
  width: 160px;
  position: relative;
  transition: all 0.3s ease;
  
  /* Soft selection styling instead of heavy blue box */
  &[data-selected="true"] {
    box-shadow: ${o.boxShadow.selectionGlow};
    border: 2px solid ${o.colors.selectionBorder};
    transform: translateY(-2px);
  }
`,eo=t.div`
  position: relative;
  overflow: hidden;
  background-color: ${o.colors.grayLighter};
  width: 100%;
  padding-bottom: 75%;
  height: 0;
  border-radius: ${o.borderRadius.medium};
  
  ${r(`
    padding-bottom: 100%;
  `)}
`,to=t.img`
  opacity: ${e=>e.$isLoaded?1:0};
  transition: opacity 0.3s;
  max-width: 100%;
  max-height: 100%;
  object-fit: ${e=>e.$objectFit||"contain"};
  border-radius: ${o.borderRadius.medium};
  /* Image protection */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
  pointer-events: auto; /* Keep pointer events for click handlers */
  
  ${e=>e.$objectFit==="cover"&&i`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  `}
`;t.img`
  position: absolute;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  opacity: 0.5;
  border-radius: ${o.borderRadius.medium};
  /* Image protection */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
  pointer-events: none;
`;t.video`
  max-width: 100%;
  max-height: 100%;
  border-radius: ${o.borderRadius.medium};
  /* Video protection */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
`;const io=t.div`
  position: relative;
  overflow: hidden;
  background-color: ${o.colors.grayLighter};
  width: 100%;
  min-height: 200px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  border-radius: ${o.borderRadius.medium};
  
  ${r(`
    min-height: 120px;
    aspect-ratio: 1/1;
    height: 0;
    padding-bottom: 100%;
  `)}
`,ro=t.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background-color: ${o.colors.overlayLight};
  border-radius: ${o.borderRadius.circle};
  z-index: 2;
  
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 55%;
    transform: translate(-50%, -50%);
    border-style: solid;
    border-width: 15px 0 15px 25px;
    border-color: transparent transparent transparent ${o.colors.white};
  }
  
  ${r(`
    width: 40px;
    height: 40px;
    
    &::before {
      border-width: 10px 0 10px 16px;
    }
  `)}
`,no=t.div`
  position: relative;
  margin-bottom: ${o.spacing.sm};
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`,so=t.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: ${o.borderRadius.medium};
  /* Image protection */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
  pointer-events: auto;
`,ao=t.video`
  max-width: 100%;
  max-height: 100%;
  border-radius: ${o.borderRadius.medium};
  /* Video protection */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
`;t.div`
  position: relative;
`;const co=t.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, ${o.colors.grayLighter} 25%, ${o.colors.grayLight} 50%, ${o.colors.grayLighter} 75%);
  background-size: 200% 100%;
  animation: loadingAnimation 1.5s infinite;
  z-index: 0;
  border-radius: ${o.borderRadius.medium};
`,lo=t.div`
  ${h}
  background-color: ${e=>e.$type==="loading"?o.colors.overlayLight:"transparent"};
  z-index: ${e=>e.$type==="loading"?4:5};
  color: ${e=>e.$type==="loading"?o.colors.white:"inherit"};
  font-weight: ${e=>e.$type==="loading"?500:"inherit"};
  text-align: ${e=>e.$type==="loading"?"center":"inherit"};
  padding: ${e=>e.$type==="loading"?"0 10px":"0"};
  pointer-events: ${e=>e.$type==="watermark"?"none":"auto"};
  border-radius: ${o.borderRadius.medium}; // For overlays on containers/cards
`,go=t.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${o.colors.overlay};
  color: ${o.colors.white};
  padding: 10px 20px;
  border-radius: ${o.borderRadius.small};
  z-index: 10;
  font-size: ${o.fontSizes.md};
`,po=t.h3`
  font-size: ${o.fontSizes.lg};
  margin: 0 0 ${o.spacing.sm} 0;
`,mo=t.div`
  height: ${e=>e.$height||"8px"};
  background-color: ${o.colors.grayLight};
  border-radius: ${o.borderRadius.small};
  overflow: hidden;
  ${e=>e.$bottom&&`bottom: ${e.$bottom};`}
  ${e=>e.$left&&`left: ${e.$left};`}
  ${e=>e.$right&&`right: ${e.$right};`}
  ${e=>e.$bottom&&e.$left&&e.$right&&"position: absolute;"}
`,ho=t.div`
  height: 100%;
  background-color: ${e=>e.$status==="processing"?o.colors.warning:e.$status==="error"?o.colors.danger:e.$status==="complete"?o.colors.success:o.colors.info};
  border-radius: ${o.borderRadius.small};
  transition: width 0.3s ease;
  width: ${e=>(e.$progress||0)*100}%;
`,xo=t.div`
  font-size: ${o.fontSizes.sm};
  margin-bottom: ${o.spacing.sm};
`,bo=t.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${o.colors.overlay};
  z-index: ${e=>e.$zIndex||1e4}; /* Always above header (9999) */
  display: flex;
  justify-content: center;
  align-items: center;
`,uo=t.div`
  ${n}
  /* Enhanced: Use consistent grid spacing */
  padding: ${o.spacing.lg};
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  ${r(`
    padding: ${o.spacing.lg};
    width: 90%;
  `)}
`;t.div`
  background: ${o.colors.white};
  padding: 30px;
  border-radius: ${o.borderRadius.large};
  width: 90%;
  max-width: 400px;
  box-shadow: ${o.boxShadow.xl};
  ${e=>c(e.$isRTL)}
`;t.p`
  font-size: ${o.fontSizes.md};
  margin-bottom: ${o.spacing.sm};
`;t.p`
  font-size: ${o.fontSizes.sm};
  /* Enhanced: Use consistent grid spacing */
  margin-bottom: ${o.spacing.lg};
  color: ${o.colors.text.secondary};
`;const $o=t.input`
  width: 100%;
  padding: 10px;
  margin-bottom: ${o.spacing.sm};
  border-radius: ${o.borderRadius.small};
  border: 1px solid ${o.colors.border};
  font-size: ${o.fontSizes.md};
  text-align: ${e=>e.$isRTL?"right":"left"};
`;t.div`
  color: ${o.colors.danger};
  margin-bottom: ${o.spacing.sm};
  font-size: ${o.fontSizes.sm};
`;const fo=t.div`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 9998; /* Just below header, above normal content */
  background-color: ${o.colors.white};
  box-shadow: ${o.boxShadow.md};
  border-radius: ${o.borderRadius.small};
  padding: ${o.spacing.sm};
  display: flex;
  flex-direction: column;
  min-width: 180px;
  margin-top: ${o.spacing.xs};
`,wo=t.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 10000; /* Always above header (9999) */
  display: flex;
  flex-direction: column;
`,yo=t.div`
  text-align: center;
  /* Enhanced: Use consistent grid spacing */
  margin-top: ${o.spacing.lg};
  font-size: 11px;
  color: ${o.colors.text.secondary};
`,vo=t.div`
  position: absolute;
  top: ${o.spacing.sm};
  right: ${o.spacing.sm};
  z-index: 10;
  width: 24px;
  height: 24px;
  border-radius: ${o.borderRadius.circle};
  background-color: ${e=>e.$isSelected?o.colors.primary:"rgba(255, 255, 255, 0.8)"};
  border: ${e=>e.$isSelected?"none":`2px solid ${o.colors.primary}`};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${o.boxShadow.selection};
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`,zo=t.div`
  color: ${o.colors.white};
  font-size: ${o.fontSizes.sm};
  font-weight: bold;
`,ko=t.div`
  /* Enhanced: Use consistent grid spacing */
  padding: ${o.spacing.sm} ${o.spacing.lg};
  background-color: ${o.colors.background.highlight};
  border-radius: ${o.borderRadius.small};
  margin-bottom: ${o.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${o.boxShadow.md};
`,So=t.div`
  position: absolute;
  z-index: 2;
  bottom: ${o.spacing.sm};
  left: ${e=>e.$position==="bottomLeft"?o.spacing.sm:"auto"};
  right: ${e=>e.$position==="bottomRight"?o.spacing.sm:"auto"};
  background: ${e=>e.$light?"rgba(255,255,255,0.85)":o.colors.overlay};
  color: ${e=>e.$light?"inherit":o.colors.white};
  padding: ${e=>e.$light?"6px 12px":"4px 8px"};
  font-size: ${e=>e.$light?o.fontSizes.xs:o.fontSizes.sm};
  font-weight: 500;
  border-radius: ${e=>(e.$light,o.borderRadius.small)};
  
  ${r(`
    padding: ${e=>e.$light?"3px 6px":"2px 6px"};
    font-size: ${e=>e.$light?"10px":o.fontSizes.xs};
    bottom: ${e=>e.$light?"8px":o.spacing.sm};
    ${e=>e.$position==="bottomRight"&&e.$light&&`
      max-width: 45%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `}
  `)}
`,Lo=t.div`
  position: absolute;
  top: ${o.spacing.sm};
  right: ${o.spacing.sm};
  width: 24px;
  height: 24px;
  border-radius: ${o.borderRadius.circle};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${o.fontSizes.xs};
  color: ${o.colors.white};
  z-index: 1;
  background-color: ${e=>{switch(e.$status){case"complete":return o.colors.success;case"error":return o.colors.danger;case"uploading":return o.colors.info;case"processing":return o.colors.warning;default:return o.colors.gray}}};
`;t.button`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 18px;
  height: 18px;
  border-radius: ${o.borderRadius.circle};
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
`;const Ro=t.div`
  /* Enhanced: Use consistent grid spacing */
  margin-bottom: ${o.spacing.lg};
`,Eo=t.label`
  display: block;
  /* Enhanced: Use consistent grid spacing */
  margin-bottom: ${o.spacing.md};
  font-size: ${o.fontSizes.sm};
  font-weight: 500;
  color: ${o.colors.text.primary};
`,Io=t.input`
  ${l}
`,jo=t.textarea`
  ${l}
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
`;t.div`
  display: flex;
  align-items: center;
  /* Enhanced: Use consistent grid spacing */
  margin-bottom: ${o.spacing.lg};
  padding: 4px 0;
  gap: 15px;
`;t.div`
  font-size: ${o.fontSizes.sm};
  font-weight: 500;
  color: ${o.colors.text.primary};
  line-height: 24px;
`;t.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
    
    &:checked + span {
      background-color: ${o.colors.primary};
    }
    
    &:focus + span {
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
    
    &:checked + span:before {
      transform: translateX(16px);
    }
    
    &:disabled + span {
      background-color: #e6e6e6;
      cursor: not-allowed;
    }
  }
`;t.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${o.colors.grayLight};
  transition: .2s;
  border-radius: 24px;
  
  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 2px;
    top: 2px;
    background-color: ${o.colors.white};
    transition: .2s;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`;const Bo=t.div`
  color: ${o.colors.white};
  font-size: ${o.fontSizes.xxl};
  font-weight: bold;
  transform: rotate(-30deg);
  opacity: 0.7;
  text-shadow: ${o.boxShadow.textShadow};
  user-select: none;
  white-space: nowrap;
`;t.div`
  font-size: ${o.fontSizes.xs};
  color: ${o.colors.text.secondary};
  margin-bottom: 6px;
`;const Co=t.div`
  text-align: center;
  /* Enhanced: Use consistent grid spacing */
  padding: ${o.spacing.lg};
  font-size: 0.9em;
  color: ${o.colors.text.secondary};
`,Uo=t.a`
  margin: 0 ${o.spacing.sm};
  color: ${o.colors.text.secondary};
  text-decoration: ${e=>e.$isHovered?"underline":"none"};
`,Fo=t.div`
  text-align: center; 
  /* Enhanced: Use consistent grid spacing */
  padding: 40px ${o.spacing.lg};
  border-radius: ${o.borderRadius.medium};
  background-color: ${e=>e.$type==="error"?o.colors.background.error:o.colors.white};
  border: ${e=>e.$type==="error"?`1px solid ${o.colors.highlight.error}`:"none"};
  box-shadow: ${e=>e.$type==="empty"?o.boxShadow.md:"none"};
  margin-bottom: ${e=>e.$type==="error"?o.spacing.lg:"0"};
  
  p {
    font-size: ${o.fontSizes.md};
    color: ${e=>e.$type==="error"?o.colors.danger:o.colors.text.secondary};
  }
`;t.div`
  /* Enhanced: Use consistent grid spacing */
  margin-top: ${o.spacing.lg};
  padding: ${o.spacing.lg};
  background-color: ${o.colors.grayLighter};
  border-radius: ${o.borderRadius.medium};
`;t.h3`
  /* Enhanced: Use consistent grid spacing */
  margin: 0 0 ${o.spacing.md} 0;
  font-size: ${o.fontSizes.md};
`;t.pre`
  margin: 0;
  font-size: ${o.fontSizes.xs};
  white-space: pre-wrap;
  max-height: 200px;
  overflow-y: auto;
`;t.div`
  /* Enhanced: Use consistent grid spacing */
  margin-bottom: ${o.spacing.sm};
  font-size: ${o.fontSizes.xs};
`;t.a`
  font-size: ${o.fontSizes.xs};
  color: ${o.colors.text.secondary};
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${o.colors.text.primary};
  }
`;const To=t.div`
  font-size: ${o.fontSizes.xs};
  color: ${o.colors.text.lighter};
  text-align: ${e=>(e.$isRTL,"right")};
  /* Enhanced: Use consistent grid spacing */
  margin-bottom: ${o.spacing.lg};
  display: flex;
  justify-content: flex-end;
`,Ao=t.span`
  font-size: ${o.fontSizes.sm}; // 14px to match other header elements
  color: ${o.colors.text.secondary}; // Subtle gray like other controls
  font-weight: 500;
  white-space: nowrap;
  display: flex;
  align-items: center;
`,Ho=t.select`
  padding: 6px 12px;
  border-radius: ${o.borderRadius.medium};
  border: 1px solid ${o.colors.borderLight};
  background-color: ${o.colors.white};
  font-size: ${o.fontSizes.sm}; // 14px to match label
  cursor: pointer;
  box-shadow: ${o.boxShadow.sm};
  min-width: 60px;
  transition: all 0.2s ease;
  color: ${o.colors.text.primary};
  
  &:hover {
    border-color: ${o.colors.border};
    box-shadow: ${o.boxShadow.md};
  }
  
  &:focus {
    outline: none;
    border-color: ${o.colors.primary};
    box-shadow: ${o.boxShadow.focusGlow};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: ${o.colors.grayLighter};
  }
`;export{x as $,y as A,p as B,_ as C,eo as D,co as E,Ro as F,f as G,j as H,to as I,io as J,ro as K,B as L,q as M,P as N,lo as O,oo as P,So as Q,vo as R,Lo as S,yo as T,zo as U,ao as V,Bo as W,Q as X,O as Y,W as Z,Y as _,C as a,L as a0,S as a1,v as a2,E as a3,I as a4,R as a5,$o as a6,V as a7,X as a8,F as a9,T as aa,A as ab,fo as ac,H as ad,N as ae,Fo as af,J as ag,Z as ah,K as ai,To as aj,U as b,Co as c,Uo as d,no as e,so as f,mo as g,ho as h,po as i,xo as j,Eo as k,Io as l,jo as m,z as n,k as o,D as p,w as q,M as r,Ao as s,Ho as t,ko as u,wo as v,go as w,G as x,bo as y,uo as z};
