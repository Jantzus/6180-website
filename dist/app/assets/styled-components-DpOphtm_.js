import{aG as m,q as i,d as t}from"./utils-DjWiEyfK.js";const e={colors:{primary:"#007bff",primaryDark:"#0056b3",success:"#4caf50",danger:"#e53935",warning:"#ff9800",info:"#2196f3",gray:"#8c8c8c",grayLight:"#e0e0e0",grayLighter:"#f0f0f0",white:"#fff",black:"#000",overlay:"rgba(0, 0, 0, 0.7)",overlayLight:"rgba(0, 0, 0, 0.5)",border:"#ddd",borderLight:"#eaeaea",selectionBorder:"rgba(0, 123, 255, 0.6)",text:{primary:"#333",secondary:"#666",light:"#777",lighter:"#999",subtle:"#aaa",white:"#fff"},background:{primary:"#f9fafb",gradientStart:"#fdfdfd",gradientEnd:"#f6f6f6",card:"#fff",highlight:"#f0f7ff",error:"#fdeded"},highlight:{border:"#cce0ff",error:"#f7d0d0"}},spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px"},borderRadius:{small:"4px",medium:"8px",large:"16px",circle:"50%"},fontSizes:{xs:"12px",sm:"14px",md:"16px",lg:"18px",xxl:"24px"},boxShadow:{sm:"0 1px 2px rgba(0,0,0,0.06)",md:"0 1px 3px rgba(0,0,0,0.1)",xl:"0 8px 24px rgba(0,0,0,0.2)",cardSoft:"0 8px 32px rgba(0,0,0,0.08)",primaryBtn:"0 4px 12px rgba(0, 123, 255, 0.2)",selection:"0 2px 4px rgba(0, 0, 0, 0.2)",textShadow:"0 0 5px rgba(0, 0, 0, 0.8)",focusGlow:"0 0 0 2px rgba(153, 202, 255, 0.4)",selectionGlow:"0 0 0 3px rgba(0, 123, 255, 0.3), 0 4px 12px rgba(0, 123, 255, 0.15)",inputSoft:"0 2px 8px rgba(0, 0, 0, 0.04)"},breakpoints:{mobile:"767px"}},s="64px",d="60px",f=m`
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
    background: linear-gradient(135deg, ${e.colors.background.gradientStart} 0%, ${e.colors.background.gradientEnd} 100%);
    min-height: 100vh;
    background-attachment: fixed;
  }

  #root {
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
  }  
`,c=o=>i`
  direction: ${o?"rtl":"ltr"};
`,r=o=>i`
  @media (max-width: ${e.breakpoints.mobile}) {
    ${o}
  }
`,n=i`
  background-color: ${e.colors.background.card};
  border-radius: ${e.borderRadius.medium};
  box-shadow: ${e.boxShadow.md};
`,l=i`
  width: 100%;
  padding: 14px 16px;
  font-size: ${e.fontSizes.md};
  font-family: inherit;
  line-height: 1.5;
  border-radius: ${e.borderRadius.medium};
  border: 1px solid ${e.colors.borderLight};
  box-sizing: border-box;
  background-color: ${e.colors.white};
  color: ${e.colors.text.primary};
  transition: all 0.3s ease;
  box-shadow: ${e.boxShadow.inputSoft};
  
  // Enhanced placeholder styling for elegance
  &::placeholder {
    color: ${e.colors.text.lighter};
    opacity: 0.7;
    font-size: ${e.fontSizes.md};
    font-family: inherit;
    font-weight: normal;
  }
  
  // Remove browser-specific styling differences
  &::-webkit-input-placeholder {
    color: ${e.colors.text.lighter};
    opacity: 0.7;
  }
  
  &::-moz-placeholder {
    color: ${e.colors.text.lighter};
    opacity: 0.7;
  }
  
  &:-ms-input-placeholder {
    color: ${e.colors.text.lighter};
    opacity: 0.7;
  }
  
  /* Enhanced focus state with blue glow */
  &:focus {
    outline: none;
    border-color: ${e.colors.primary};
    box-shadow: ${e.boxShadow.focusGlow}, ${e.boxShadow.inputSoft};
  }
  
  /* Subtle hover state for better UX */
  &:hover:not(:focus) {
    border-color: ${e.colors.border};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,g=i`
  cursor: ${o=>o.disabled||o.$isDisabled?"not-allowed":"pointer"};
  opacity: ${o=>o.disabled||o.$isDisabled?.6:1};
  transition: all 0.2s ease;
  border-radius: ${e.borderRadius.medium};
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
  background: ${e.colors.background.primary};
  color: ${e.colors.text.primary};
  line-height: 1.5;
  /* Enhanced: Increased top padding for more breathing room from fixed header */
  padding: calc(${s} + 24px) ${e.spacing.md} ${e.spacing.md};
  width: 100%;
  overflow-x: hidden;
  min-height: 100vh;
  position: relative;
  
  ${r(`
    padding: calc(${d} + 20px) ${e.spacing.sm} ${e.spacing.sm};
  `)}
`,y=t.div`
  padding: ${e.spacing.md};
  background: linear-gradient(135deg, ${e.colors.background.gradientStart} 0%, ${e.colors.background.gradientEnd} 100%);
  min-height: 100vh;
  max-width: 100vw;
  position: relative;
  ${o=>c(o.$isRTL)}
  
  ${r(`
    padding: ${e.spacing.sm};
  `)}
`,v=t.div`
  /* Enhanced: Use consistent grid spacing (24px) for uniform alignment */
  padding: ${e.spacing.sm} ${e.spacing.lg} ${e.spacing.lg};
  width: 100%;
  overflow: visible;
  
  ${r(`
    padding: ${e.spacing.sm} ${e.spacing.lg} ${e.spacing.sm};
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
  height: ${s};
  
  /* Enhanced styling with subtle blur and divider */
  background-color: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid ${e.colors.borderLight};
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
  padding: 0 ${e.spacing.md};
  
  ${r(`
    padding: 0 ${e.spacing.md};
  `)}
`,x=t.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${e.spacing.sm};
  color: ${e.colors.text.secondary};
  font-size: ${e.fontSizes.sm};
  transition: all 0.2s ease;
  /* Enhanced: Increased vertical padding for better visual centering */
  padding: ${e.spacing.md} ${e.spacing.sm};
  border-radius: ${e.borderRadius.small};
  
  &:hover {
    background-color: ${e.colors.grayLighter};
    color: ${e.colors.text.primary};
  }
  
  &:focus {
    outline: 2px solid ${e.colors.primary};
    outline-offset: 2px;
  }
`;t(x)`
  font-style: italic;
  /* Enhanced: Made more subtle with lighter color and smaller font */
  color: ${e.colors.text.subtle}; /* Changed from secondary to subtle for more dimmed appearance */
  font-size: 9px; /* Further reduced from 10px to 9px for even less prominence */
  font-weight: 300; /* Lighter weight for reduced visual load */
  /* Enhanced: Nudged down slightly for better vertical balance */
  margin-top: 5px;
  
  &:hover {
    color: ${e.colors.text.secondary}; /* Lighter hover color than before */
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
`,R=t.div`
  display: flex;
  align-items: center;
  flex-direction: ${o=>o.$isRTL?"row-reverse":"row"};
  gap: ${e.spacing.sm};
  margin: 0;
`;t.div`
  max-width: 400px;
  width: 100%;
  /* Enhanced: Increased top padding for breathing room above logo */
  padding: 40px 32px 32px;
  /* Enhanced: Larger border radius for more modern look */
  border-radius: ${e.borderRadius.large}; // 16px as mentioned
  /* Enhanced: Softer, more elevated shadow */
  box-shadow: ${e.boxShadow.cardSoft};
  text-align: center;
  background-color: ${e.colors.background.card};
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
`;const u=t.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 6px;
  /* Enhanced: Remove border until focused */
  border: 1px solid transparent;
  background-color: ${e.colors.grayLighter};
  font-size: 16px;
  box-sizing: border-box;
  transition: all 0.2s ease;
  
  /* Enhanced placeholder styling for elegance */
  &::placeholder {
    color: ${e.colors.text.lighter};
    opacity: 0.5; // Lower opacity for more elegant appearance
  }
  
  /* Enhanced: Light blue glow on focus */
  &:focus {
    outline: none;
    border-color: ${e.colors.primary};
    background-color: ${e.colors.white};
    box-shadow: ${e.boxShadow.focusGlow};
  }
  
  /* Subtle hover state */
  &:hover:not(:focus) {
    background-color: ${e.colors.white};
    border-color: ${e.colors.borderLight};
  }
`;t(u)`
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
    color: ${e.colors.primaryDark};
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
`;const L=t.div`
  ${n} /* Apply white card styling */
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px; /* Increased spacing before media grid */
  padding: ${e.spacing.lg}; /* Add padding for content inside white box */
  
  ${r(`
    gap: 16px; /* Slightly more spacing on mobile for better separation */
    padding: ${e.spacing.md}; /* Smaller padding on mobile */
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
  color: ${e.colors.text.lighter}; /* Subtle gray labels */
  font-weight: 500;
  white-space: nowrap;
`,I=t.select`
  padding: 8px 12px;
  border-radius: ${e.borderRadius.medium}; /* Match tag styling */
  border: 1px solid ${e.colors.borderLight};
  background-color: ${e.colors.white};
  font-size: 14px; /* Match tag font size */
  cursor: pointer;
  box-shadow: ${e.boxShadow.sm}; /* Subtle shadow to match tags */
  min-width: 60px;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${e.colors.border};
    box-shadow: ${e.boxShadow.md};
  }
  
  &:focus {
    outline: none;
    border-color: ${e.colors.primary};
    box-shadow: ${e.boxShadow.focusGlow};
  }
`;t.div`
  position: relative;
  background: ${e.colors.white};
  box-shadow: ${e.boxShadow.sm};
  z-index: 10;
  /* Enhanced: Increased margin-bottom for more breathing room */
  margin-bottom: ${e.spacing.xl}; /* 32px instead of 24px */
  width: 100%;
  border-radius: ${e.borderRadius.medium};
  margin-top: 0;
`;t.div`
  display: flex;
  flex-direction: column;
  /* Enhanced: Use consistent grid spacing */
  padding: ${e.spacing.lg};
  
  ${r(`
    padding: ${e.spacing.lg};
  `)}
`;t.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* Enhanced: Use consistent grid spacing */
  margin-top: ${e.spacing.lg};
  margin-bottom: ${e.spacing.sm};
  gap: ${e.spacing.xs}; /* Reduced from sm (8px) to xs (4px) */
  flex-wrap: wrap;
  
  ${o=>o.$fullWidth&&i`
    width: 100%;
    
    > div {
      width: auto;
      display: flex;
      align-items: center;
    }
  `}
`;const B=t.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  /* Enhanced: Use consistent grid spacing */
  margin-bottom: ${e.spacing.lg};
  position: relative;
  z-index: 1;
  margin-top: 0;
  
  ${r(`
    margin-top: 0;
    flex-wrap: wrap;
    gap: ${e.spacing.sm};
  `)}
`;t.div`
  display: flex;
  align-items: center;
  /* Enhanced: Better anchoring - reduce gap and tighten with buttons above */
  margin-top: ${e.spacing.xs}; /* Reduced from sm to xs for tighter grouping */
  margin-left: 0; /* Ensure flush left alignment */
`;t.label`
  margin-right: ${e.spacing.sm};
  font-size: ${e.fontSizes.xs}; /* Reduced from sm to xs for less prominence */
  color: ${e.colors.text.secondary};
  font-weight: normal;
`;t.select`
  padding: 4px ${e.spacing.sm}; /* Reduced vertical padding */
  border: 1px solid ${e.colors.border};
  border-radius: ${e.borderRadius.small};
  background-color: ${e.colors.white};
  cursor: pointer;
  font-size: ${e.fontSizes.xs}; /* Reduced from sm to xs to match label */
  min-width: 50px;
`;const U=t.div`
  display: flex;
  align-items: center;
  flex-direction: ${o=>o.$isRTL?"row":"row-reverse"};
  gap: ${e.spacing.sm};  
`,j=t.img`
  height: 32px;
  /* Image protection */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
  pointer-events: none;
`,C=t.h1`
  font-size: ${e.fontSizes.xxl};
  margin: ${e.spacing.sm} 0;
`,p=t.button`
  ${g}
  background-color: ${o=>o.$primary?o.$isHovered?e.colors.primaryDark:e.colors.primary:o.$passwordSet?e.colors.black:"transparent"};
  color: ${o=>o.$primary?e.colors.text.white:o.$passwordSet?e.colors.white:e.colors.primary};
  /* Enhanced: Lighter font weight for premium feel */
  font-weight: 500;
  /* FIXED: Consistent padding for uniform button heights */
  padding: 8px 16px; /* Standardized to 8px vertical, 16px horizontal */
  /* Enhanced: Consistent font size */
  font-size: ${e.fontSizes.sm}; /* 14px */
  border: ${o=>o.$primary?"none":`1px solid ${e.colors.primary}`};
  border-radius: ${e.borderRadius.medium};
  min-width: 120px; /* Reduced slightly for better mobile fit */
  white-space: nowrap; /* Prevent text wrapping */
  text-align: center;
  box-shadow: ${o=>o.$primary?e.boxShadow.primaryBtn:"none"};
  align-items: center;
  justify-content: center;
  /* FIXED: Ensure consistent line-height for uniform button heights */
  line-height: 1.4;
  height: 40px; /* Fixed height to ensure all buttons are exactly the same height */
  
  &:hover {
    background-color: ${o=>o.$primary?e.colors.primaryDark:o.$passwordSet?"#333333":e.colors.grayLighter};
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
  margin-right: ${e.spacing.sm};
`,A=t.span`
  height: 2px;
  background: ${e.colors.primary};
  width: 100%;
`,P=t(p)`
  width: 100%;
  text-align: left;
  padding: ${e.spacing.md};
  background: transparent;
  color: ${e.colors.primary};
  border: none;
  margin: 2px 0;
  height: auto; /* Allow dropdown items to have natural height */
  
  &:hover {
    background-color: ${e.colors.grayLighter};
  }

  border-bottom: 1px solid ${e.colors.borderLight};
  
  &:last-of-type {
    border-bottom: none;
  }
`;t.button`
  ${g}
  background-color: ${e.colors.danger};
  color: ${e.colors.text.white};
  border: none;
  border-radius: ${e.borderRadius.small};
  padding: 6px ${e.spacing.sm};
  font-size: ${e.fontSizes.xs};
  margin-top: auto;
  height: auto;
`;const H=t.div`
  display: flex;
  gap: ${e.spacing.xs};
`,M=t.div`
  display: flex;
  flex-direction: column;
  gap: ${e.spacing.xs}; /* Reduced from sm (8px) to xs (4px) */
  /* Enhanced: Use consistent grid spacing */
  margin-bottom: ${e.spacing.lg};
  width: 100%;
  align-items: flex-end; /* Align buttons to the right side */
  padding: 0 ${e.spacing.sm}; /* Match the header button positioning */
`,D=t.a`
  font-size: ${e.fontSizes.sm};
  color: ${e.colors.primary};
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: ${e.spacing.sm};
  padding: ${e.spacing.xs} 0;
  
  &:hover {
    text-decoration: underline;
  }
`;t.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;t.div`
  font-size: ${e.fontSizes.md};
  color: ${e.colors.text.secondary};
`;const G=t.a`
  text-decoration: none;
  color: ${e.colors.text.white};
  background-color: ${e.colors.primary};
  padding: ${e.spacing.sm} ${e.spacing.md};
  border-radius: ${e.borderRadius.small};
  font-size: ${e.fontSizes.sm};
  display: flex;
  align-items: center;
  gap: 6px;
`,V=t.div`
  /* Enhanced: Use consistent grid spacing */
  margin-bottom: ${e.spacing.lg};
  text-align: center;
  direction: ${o=>o.$isRTL?"rtl":"ltr"};
`,X=t.div`
  display: flex;
  align-items: center;
  justify-content: ${o=>o.$isRTL?"flex-start":"flex-end"};
  margin-bottom: ${e.spacing.sm};
  position: relative;
`;t.div`
  width: 40px;
  height: 40px;
  border-radius: ${e.borderRadius.circle};
  background-color: ${e.colors.grayLight};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${e.fontSizes.lg};
  color: ${e.colors.text.secondary};
`;t.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
`;t.h1`
  font-size: ${e.fontSizes.lg};
  margin: 0;
  font-weight: 600;
`;const N=t.div`
  margin-top: ${e.spacing.sm};
  padding: ${e.spacing.sm};
  background-color: ${e.colors.background.highlight};
  border-radius: ${e.borderRadius.small};
  border: 1px solid ${e.colors.highlight.border};
  max-width: 500px;
  font-size: ${e.fontSizes.xs};
  margin: 0 auto;
  
  p {
    margin: 0;
  }
`,O=t.h2`
  font-weight: 400;
  /* Enhanced: Use consistent grid spacing */
  margin: 0 0 ${e.spacing.lg} 0;
  font-size: ${e.fontSizes.xxl};
  padding: 0;
  
  ${r(`
    padding: 0;
  `)}
`,W=t.strong`
  font-weight: 700;
`,_=t.div`
  ${n}
  /* Enhanced: Use consistent grid spacing */
  padding: ${o=>o.$padding||e.spacing.lg};
  margin-bottom: ${o=>o.$marginBottom||e.spacing.lg};
  width: 100%;
`,Y=t.p`
  color: ${e.colors.text.primary};
  margin: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  max-width: 100%;
  font-size: ${e.fontSizes.md};
`,q=t.div`
  text-align: center;
  padding: 40px;
  font-size: ${e.fontSizes.lg};
  grid-column: 1 / -1;
  width: 100%;
  border-radius: ${e.borderRadius.medium};
  color: ${o=>{switch(o.$type){case"error":return e.colors.danger;case"loading":return e.colors.text.secondary;default:return e.colors.text.primary}}};
`,J=t.div`
  margin-top: ${e.spacing.sm};
  /* Enhanced: Use consistent grid spacing */
  margin-bottom: ${e.spacing.lg};
  font-size: ${e.fontSizes.xs};
  color: ${e.colors.text.secondary};
  line-height: 1.5;
  text-align: ${o=>o.$isRTL?"right":"left"};
  white-space: pre-wrap;
`,K=t.div`
  font-size: ${e.fontSizes.xs};
  color: ${e.colors.text.light};
  text-align: ${o=>o.$isRTL?"right":"left"};
  margin-top: ${e.spacing.xs};
`,Z=t.div`
  display: flex;
  align-items: center;
  font-size: ${e.fontSizes.xs};
  color: ${e.colors.text.secondary};
`,Q=t.div`
  display: grid;
  /* Enhanced: This is the main grid spacing that other elements should align to */
  grid-gap: ${e.spacing.lg};
  width: 100%;
  min-height: 0;
  
  ${o=>{switch(o.$columns){case"1":return i`grid-template-columns: repeat(1, 1fr);`;case"2":return i`grid-template-columns: repeat(2, 1fr);`;case"3":return i`grid-template-columns: repeat(3, 1fr);`;case"4":return i`grid-template-columns: repeat(4, 1fr);`;case"5":return i`grid-template-columns: repeat(5, 1fr);`;default:return i`grid-template-columns: repeat(1, 1fr);`}}}
  
  @media (max-width: ${e.breakpoints.mobile}) {
    grid-gap: ${e.spacing.md};
    ${o=>{const a=parseInt(o.$columns);return a>3?i`grid-template-columns: repeat(3, minmax(0, 1fr));`:a>1?i`grid-template-columns: repeat(${a}, minmax(0, 1fr));`:i`grid-template-columns: repeat(1, minmax(0, 1fr));`}}
  }
`,b=i`
  ${n}
  transition: transform 0.2s;
  position: relative;
  height: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  /* Enhanced: Use consistent grid spacing */
  margin-bottom: ${e.spacing.lg};
  
  ${o=>o.$isHovered&&i`
    transform: translateY(-2px);
  `}
  
  ${r(`
    margin-bottom: ${e.spacing.lg};
  `)}
`;t.div`
  ${b}
  ${o=>o.$isVideo&&i`
    cursor: pointer;
  `}
  ${o=>o.$isSelected&&i`
    border: 3px solid ${e.colors.primary};
    box-shadow: 0 0 0 3px rgba(0, 106, 220, 0.3);
  `}
`;const ee=t.div`
  display: flex;
  flex-wrap: wrap;
  /* Enhanced: Use consistent grid spacing */
  gap: ${e.spacing.lg};
  margin-bottom: ${e.spacing.lg};
  width: 100%;
`,oe=t.div`
  ${n}
  display: flex;
  flex-direction: column;
  padding: ${e.spacing.sm};
  width: 160px;
  position: relative;
  transition: all 0.3s ease;
  
  /* Soft selection styling instead of heavy blue box */
  &[data-selected="true"] {
    box-shadow: ${e.boxShadow.selectionGlow};
    border: 2px solid ${e.colors.selectionBorder};
    transform: translateY(-2px);
  }
`,te=t.div`
  position: relative;
  overflow: hidden;
  background-color: ${e.colors.grayLighter};
  width: 100%;
  padding-bottom: 75%;
  height: 0;
  border-radius: ${e.borderRadius.medium};
  
  ${r(`
    padding-bottom: 100%;
  `)}
`,ie=t.img`
  opacity: ${o=>o.$isLoaded?1:0};
  transition: opacity 0.3s;
  max-width: 100%;
  max-height: 100%;
  object-fit: ${o=>o.$objectFit||"contain"};
  border-radius: ${e.borderRadius.medium};
  /* Image protection */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
  pointer-events: auto; /* Keep pointer events for click handlers */
  
  ${o=>o.$objectFit==="cover"&&i`
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
  border-radius: ${e.borderRadius.medium};
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
  border-radius: ${e.borderRadius.medium};
  /* Video protection */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
`;const re=t.div`
  position: relative;
  overflow: hidden;
  background-color: ${e.colors.grayLighter};
  width: 100%;
  min-height: 200px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  border-radius: ${e.borderRadius.medium};
  
  ${r(`
    min-height: 120px;
    aspect-ratio: 1/1;
    height: 0;
    padding-bottom: 100%;
  `)}
`,ne=t.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background-color: ${e.colors.overlayLight};
  border-radius: ${e.borderRadius.circle};
  z-index: 2;
  
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 55%;
    transform: translate(-50%, -50%);
    border-style: solid;
    border-width: 15px 0 15px 25px;
    border-color: transparent transparent transparent ${e.colors.white};
  }
  
  ${r(`
    width: 40px;
    height: 40px;
    
    &::before {
      border-width: 10px 0 10px 16px;
    }
  `)}
`,ae=t.div`
  position: relative;
  margin-bottom: ${e.spacing.sm};
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`,se=t.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: ${e.borderRadius.medium};
  /* Image protection */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
  pointer-events: auto;
`,de=t.video`
  max-width: 100%;
  max-height: 100%;
  border-radius: ${e.borderRadius.medium};
  /* Video protection */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
`;t.div`
  position: relative;
`;const ce=t.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, ${e.colors.grayLighter} 25%, ${e.colors.grayLight} 50%, ${e.colors.grayLighter} 75%);
  background-size: 200% 100%;
  animation: loadingAnimation 1.5s infinite;
  z-index: 0;
  border-radius: ${e.borderRadius.medium};
`,le=t.div`
  ${h}
  background-color: ${o=>o.$type==="loading"?e.colors.overlayLight:"transparent"};
  z-index: ${o=>o.$type==="loading"?4:5};
  color: ${o=>o.$type==="loading"?e.colors.white:"inherit"};
  font-weight: ${o=>o.$type==="loading"?500:"inherit"};
  text-align: ${o=>o.$type==="loading"?"center":"inherit"};
  padding: ${o=>o.$type==="loading"?"0 10px":"0"};
  pointer-events: ${o=>o.$type==="watermark"?"none":"auto"};
  border-radius: ${e.borderRadius.medium}; // For overlays on containers/cards
`,ge=t.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${e.colors.overlay};
  color: ${e.colors.white};
  padding: 10px 20px;
  border-radius: ${e.borderRadius.small};
  z-index: 10;
  font-size: ${e.fontSizes.md};
`,pe=t.h3`
  font-size: ${e.fontSizes.lg};
  margin: 0 0 ${e.spacing.sm} 0;
`,me=t.div`
  height: ${o=>o.$height||"8px"};
  background-color: ${e.colors.grayLight};
  border-radius: ${e.borderRadius.small};
  overflow: hidden;
  ${o=>o.$bottom&&`bottom: ${o.$bottom};`}
  ${o=>o.$left&&`left: ${o.$left};`}
  ${o=>o.$right&&`right: ${o.$right};`}
  ${o=>o.$bottom&&o.$left&&o.$right&&"position: absolute;"}
`,he=t.div`
  height: 100%;
  background-color: ${o=>o.$status==="processing"?e.colors.warning:o.$status==="error"?e.colors.danger:o.$status==="complete"?e.colors.success:e.colors.info};
  border-radius: ${e.borderRadius.small};
  transition: width 0.3s ease;
  width: ${o=>(o.$progress||0)*100}%;
`,xe=t.div`
  font-size: ${e.fontSizes.sm};
  margin-bottom: ${e.spacing.sm};
`,ue=t.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${e.colors.overlay};
  z-index: ${o=>o.$zIndex||1e4}; /* Always above header (9999) */
  display: flex;
  justify-content: center;
  align-items: center;
`,be=t.div`
  ${n}
  /* Enhanced: Use consistent grid spacing */
  padding: ${e.spacing.lg};
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  ${r(`
    padding: ${e.spacing.lg};
    width: 90%;
  `)}
`;t.div`
  background: ${e.colors.white};
  padding: 30px;
  border-radius: ${e.borderRadius.large};
  width: 90%;
  max-width: 400px;
  box-shadow: ${e.boxShadow.xl};
  ${o=>c(o.$isRTL)}
`;t.p`
  font-size: ${e.fontSizes.md};
  margin-bottom: ${e.spacing.sm};
`;t.p`
  font-size: ${e.fontSizes.sm};
  /* Enhanced: Use consistent grid spacing */
  margin-bottom: ${e.spacing.lg};
  color: ${e.colors.text.secondary};
`;const $e=t.input`
  width: 100%;
  padding: 10px;
  margin-bottom: ${e.spacing.sm};
  border-radius: ${e.borderRadius.small};
  border: 1px solid ${e.colors.border};
  font-size: ${e.fontSizes.md};
  text-align: ${o=>o.$isRTL?"right":"left"};
`;t.div`
  color: ${e.colors.danger};
  margin-bottom: ${e.spacing.sm};
  font-size: ${e.fontSizes.sm};
`;const fe=t.div`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 9998; /* Just below header, above normal content */
  background-color: ${e.colors.white};
  box-shadow: ${e.boxShadow.md};
  border-radius: ${e.borderRadius.small};
  padding: ${e.spacing.sm};
  display: flex;
  flex-direction: column;
  min-width: 180px;
  margin-top: ${e.spacing.xs};
`,we=t.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 10000; /* Always above header (9999) */
  display: flex;
  flex-direction: column;
`,ye=t.div`
  text-align: center;
  /* Enhanced: Use consistent grid spacing */
  margin-top: ${e.spacing.lg};
  font-size: 11px;
  color: ${e.colors.text.secondary};
`,ve=t.div`
  position: absolute;
  top: ${e.spacing.sm};
  right: ${e.spacing.sm};
  z-index: 10;
  width: 24px;
  height: 24px;
  border-radius: ${e.borderRadius.circle};
  background-color: ${o=>o.$isSelected?e.colors.primary:"rgba(255, 255, 255, 0.8)"};
  border: ${o=>o.$isSelected?"none":`2px solid ${e.colors.primary}`};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${e.boxShadow.selection};
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`,ze=t.div`
  color: ${e.colors.white};
  font-size: ${e.fontSizes.sm};
  font-weight: bold;
`,ke=t.div`
  /* Enhanced: Use consistent grid spacing */
  padding: ${e.spacing.sm} ${e.spacing.lg};
  background-color: ${e.colors.background.highlight};
  border-radius: ${e.borderRadius.small};
  margin-bottom: ${e.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${e.boxShadow.md};
`,Se=t.div`
  position: absolute;
  z-index: 2;
  bottom: ${e.spacing.sm};
  left: ${o=>o.$position==="bottomLeft"?e.spacing.sm:"auto"};
  right: ${o=>o.$position==="bottomRight"?e.spacing.sm:"auto"};
  background: ${o=>o.$light?"rgba(255,255,255,0.85)":e.colors.overlay};
  color: ${o=>o.$light?"inherit":e.colors.white};
  padding: ${o=>o.$light?"6px 12px":"4px 8px"};
  font-size: ${o=>o.$light?e.fontSizes.xs:e.fontSizes.sm};
  font-weight: 500;
  border-radius: ${o=>(o.$light,e.borderRadius.small)};
  
  ${r(`
    padding: ${o=>o.$light?"3px 6px":"2px 6px"};
    font-size: ${o=>o.$light?"10px":e.fontSizes.xs};
    bottom: ${o=>o.$light?"8px":e.spacing.sm};
    ${o=>o.$position==="bottomRight"&&o.$light&&`
      max-width: 45%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `}
  `)}
`,Re=t.div`
  position: absolute;
  top: ${e.spacing.sm};
  right: ${e.spacing.sm};
  width: 24px;
  height: 24px;
  border-radius: ${e.borderRadius.circle};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${e.fontSizes.xs};
  color: ${e.colors.white};
  z-index: 1;
  background-color: ${o=>{switch(o.$status){case"complete":return e.colors.success;case"error":return e.colors.danger;case"uploading":return e.colors.info;case"processing":return e.colors.warning;default:return e.colors.gray}}};
`;t.button`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 18px;
  height: 18px;
  border-radius: ${e.borderRadius.circle};
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
`;const Le=t.div`
  /* Enhanced: Use consistent grid spacing */
  margin-bottom: ${e.spacing.lg};
`,Ee=t.label`
  display: block;
  /* Enhanced: Use consistent grid spacing */
  margin-bottom: ${e.spacing.md};
  font-size: ${e.fontSizes.sm};
  font-weight: 500;
  color: ${e.colors.text.primary};
`,Ie=t.input`
  ${l}
`,Be=t.textarea`
  ${l}
  resize: vertical;
  min-height: 100px; /* Increased minimum height */
  font-family: inherit;
  
  // Ensure consistent placeholder styling with FormInput
  &::placeholder {
    color: ${e.colors.text.lighter};
    opacity: 0.7;
    font-size: ${e.fontSizes.md};
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
  margin-bottom: ${e.spacing.lg};
  padding: 4px 0;
  gap: 15px;
`;t.div`
  font-size: ${e.fontSizes.sm};
  font-weight: 500;
  color: ${e.colors.text.primary};
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
      background-color: ${e.colors.primary};
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
  background-color: ${e.colors.grayLight};
  transition: .2s;
  border-radius: 24px;
  
  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 2px;
    top: 2px;
    background-color: ${e.colors.white};
    transition: .2s;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`;const Ue=t.div`
  color: ${e.colors.white};
  font-size: ${e.fontSizes.xxl};
  font-weight: bold;
  transform: rotate(-30deg);
  opacity: 0.7;
  text-shadow: ${e.boxShadow.textShadow};
  user-select: none;
  white-space: nowrap;
`;t.div`
  font-size: ${e.fontSizes.xs};
  color: ${e.colors.text.secondary};
  margin-bottom: 6px;
`;const je=t.div`
  text-align: center;
  /* Enhanced: Use consistent grid spacing */
  padding: ${e.spacing.lg};
  font-size: 0.9em;
  color: ${e.colors.text.secondary};
`,Ce=t.a`
  margin: 0 ${e.spacing.sm};
  color: ${e.colors.text.secondary};
  text-decoration: ${o=>o.$isHovered?"underline":"none"};
`,Fe=t.div`
  text-align: center; 
  /* Enhanced: Use consistent grid spacing */
  padding: 40px ${e.spacing.lg};
  border-radius: ${e.borderRadius.medium};
  background-color: ${o=>o.$type==="error"?e.colors.background.error:e.colors.white};
  border: ${o=>o.$type==="error"?`1px solid ${e.colors.highlight.error}`:"none"};
  box-shadow: ${o=>o.$type==="empty"?e.boxShadow.md:"none"};
  margin-bottom: ${o=>o.$type==="error"?e.spacing.lg:"0"};
  
  p {
    font-size: ${e.fontSizes.md};
    color: ${o=>o.$type==="error"?e.colors.danger:e.colors.text.secondary};
  }
`;t.div`
  /* Enhanced: Use consistent grid spacing */
  margin-top: ${e.spacing.lg};
  padding: ${e.spacing.lg};
  background-color: ${e.colors.grayLighter};
  border-radius: ${e.borderRadius.medium};
`;t.h3`
  /* Enhanced: Use consistent grid spacing */
  margin: 0 0 ${e.spacing.md} 0;
  font-size: ${e.fontSizes.md};
`;t.pre`
  margin: 0;
  font-size: ${e.fontSizes.xs};
  white-space: pre-wrap;
  max-height: 200px;
  overflow-y: auto;
`;t.div`
  /* Enhanced: Use consistent grid spacing */
  margin-bottom: ${e.spacing.sm};
  font-size: ${e.fontSizes.xs};
`;t.a`
  font-size: ${e.fontSizes.xs};
  color: ${e.colors.text.secondary};
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${e.colors.text.primary};
  }
`;const Te=t.div`
  font-size: ${e.fontSizes.xs};
  color: ${e.colors.text.lighter};
  text-align: ${o=>(o.$isRTL,"right")};
  /* Enhanced: Use consistent grid spacing */
  margin-bottom: ${e.spacing.lg};
  display: flex;
  justify-content: flex-end;
`;export{Y as $,y as A,p as B,_ as C,fe as D,te as E,Le as F,f as G,B as H,ie as I,ce as J,re as K,U as L,q as M,H as N,le as O,pe as P,ne as Q,Se as R,Re as S,ye as T,ve as U,de as V,Ue as W,ze as X,Q as Y,O as Z,W as _,j as a,F as a0,T as a1,A as a2,x as a3,R as a4,S as a5,v as a6,E as a7,I as a8,L as a9,$e as aa,V as ab,X as ac,N as ad,Fe as ae,J as af,Z as ag,K as ah,Te as ai,C as b,je as c,Ce as d,Ee as e,Ie as f,Be as g,xe as h,me as i,he as j,ee as k,oe as l,ae as m,se as n,z as o,k as p,D as q,P as r,w as s,M as t,ke as u,we as v,ge as w,G as x,ue as y,be as z};
