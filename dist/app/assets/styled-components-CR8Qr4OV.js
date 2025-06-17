import{aG as m,o as i,d as t}from"./utils-BHA6G1ZQ.js";const o={colors:{primary:"#007bff",primaryDark:"#0056b3",success:"#4caf50",danger:"#e53935",warning:"#ff9800",info:"#2196f3",gray:"#8c8c8c",grayLight:"#e0e0e0",grayLighter:"#f0f0f0",white:"#fff",black:"#000",overlay:"rgba(0, 0, 0, 0.7)",overlayLight:"rgba(0, 0, 0, 0.5)",border:"#ddd",borderLight:"#eaeaea",text:{primary:"#333",secondary:"#666",light:"#777",lighter:"#999",white:"#fff"},background:{primary:"#f9fafb",gradientStart:"#fdfdfd",gradientEnd:"#f6f6f6",card:"#fff",highlight:"#f0f7ff",error:"#fdeded"},highlight:{border:"#cce0ff",error:"#f7d0d0"}},spacing:{xs:"4px",sm:"8px",md:"16px",xl:"32px"},borderRadius:{small:"4px",medium:"8px",large:"16px",circle:"50%"},fontSizes:{xs:"12px",sm:"14px",md:"16px",lg:"18px",xxl:"24px"},boxShadow:{sm:"0 1px 2px rgba(0,0,0,0.06)",md:"0 1px 3px rgba(0,0,0,0.1)",xl:"0 8px 24px rgba(0,0,0,0.2)",cardSoft:"0 8px 32px rgba(0,0,0,0.08)",primaryBtn:"0 4px 12px rgba(0, 123, 255, 0.2)",selection:"0 2px 4px rgba(0, 0, 0, 0.2)",textShadow:"0 0 5px rgba(0, 0, 0, 0.8)",focusGlow:"0 0 0 2px rgba(153, 202, 255, 0.4)"},breakpoints:{mobile:"767px"}},s="64px",d="60px",f=m`
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
`,l=e=>i`
  direction: ${e?"rtl":"ltr"};
`,r=e=>i`
  @media (max-width: ${o.breakpoints.mobile}) {
    ${e}
  }
`,n=i`
  background-color: ${o.colors.background.card};
  border-radius: ${o.borderRadius.medium};
  box-shadow: ${o.boxShadow.md};
`,c=i`
  width: 100%;
  padding: 10px 12px;
  font-size: ${o.fontSizes.md};
  font-family: inherit; // Ensure same font family
  line-height: 1.5; // Consistent line height
  border-radius: ${o.borderRadius.small};
  /* Enhanced: Remove border until focused for cleaner look */
  border: 1px solid transparent;
  box-sizing: border-box;
  background-color: ${o.colors.white};
  color: ${o.colors.text.primary};
  transition: all 0.2s ease; /* Smooth transition for focus state */
  
  // Enhanced placeholder styling for elegance
  &::placeholder {
    color: ${o.colors.text.lighter};
    opacity: 0.5; // Lower opacity for more elegant appearance
    font-size: ${o.fontSizes.md};
    font-family: inherit;
    font-weight: normal;
  }
  
  // Remove browser-specific styling differences
  &::-webkit-input-placeholder {
    color: ${o.colors.text.lighter};
    opacity: 0.5;
  }
  
  &::-moz-placeholder {
    color: ${o.colors.text.lighter};
    opacity: 0.5;
  }
  
  &:-ms-input-placeholder {
    color: ${o.colors.text.lighter};
    opacity: 0.5;
  }
  
  /* Enhanced focus state with blue glow */
  &:focus {
    outline: none;
    border-color: ${o.colors.primary};
    box-shadow: ${o.boxShadow.focusGlow};
  }
  
  /* Subtle hover state for better UX */
  &:hover:not(:focus) {
    border-color: ${o.colors.borderLight};
  }
`,g=i`
  cursor: ${e=>e.disabled||e.$isDisabled?"not-allowed":"pointer"};
  opacity: ${e=>e.disabled||e.$isDisabled?.6:1};
  transition: all 0.2s ease;
  border-radius: ${o.borderRadius.medium};
`,$=i`
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
  /* Add top padding to account for fixed header */
  padding: ${s} ${o.spacing.md} ${o.spacing.md};
  width: 100%;
  overflow-x: hidden;
  min-height: 100vh;
  position: relative;
  
  ${r(`
    padding: ${d} ${o.spacing.sm} ${o.spacing.sm};
  `)}
`,y=t.div`
  padding: ${o.spacing.md};
  background: linear-gradient(135deg, ${o.colors.background.gradientStart} 0%, ${o.colors.background.gradientEnd} 100%);
  min-height: 100vh;
  max-width: 100vw;
  position: relative;
  ${e=>l(e.$isRTL)}
  
  ${r(`
    padding: ${o.spacing.sm};
  `)}
`,v=t.div`
  padding: ${o.spacing.sm} ${o.spacing.md} ${o.spacing.md};
  width: 100%;
  overflow: visible;
  
  ${r(`
    padding: ${o.spacing.sm} ${o.spacing.md} ${o.spacing.sm};
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
  
  /* Styling */
  background-color: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid ${o.colors.borderLight};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px); /* Safari support */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
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
  gap: ${o.spacing.md}; /* Add gap between logo and slogan */
  
  ${r(`
    padding: 0 ${o.spacing.sm};
    gap: ${o.spacing.sm}; /* Smaller gap on mobile */
  `)}
`,h=t.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${o.spacing.sm};
  color: ${o.colors.text.secondary};
  font-size: ${o.fontSizes.sm};
  transition: all 0.2s ease;
  padding: ${o.spacing.xs} ${o.spacing.sm};
  border-radius: ${o.borderRadius.small};
  
  &:hover {
    background-color: ${o.colors.grayLighter};
    color: ${o.colors.text.primary};
  }
  
  &:focus {
    outline: 2px solid ${o.colors.primary};
    outline-offset: 2px;
  }
`,S=t(h)`
  font-style: italic;
  color: ${o.colors.text.secondary}; /* Made darker for better visibility */
  font-size: ${o.fontSizes.xs};
  
  &:hover {
    color: ${o.colors.text.primary};
  }
  
  ${r(`
    font-size: 11px; /* Slightly smaller on mobile but still visible */
    max-width: 200px; /* Limit width on mobile */
    text-align: right;
  `)}
`,L=t.img`
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
`;const u=t.input`
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
`;const I=t.div`
  position: relative;
  background: ${o.colors.white};
  box-shadow: ${o.boxShadow.sm};
  z-index: 10;
  margin-bottom: ${o.spacing.sm};
  width: 100%;
  border-radius: ${o.borderRadius.medium};
  margin-top: 0;
`,j=t.div`
  display: flex;
  flex-direction: column;
  padding: ${o.spacing.md};
  
  ${r(`
    padding: ${o.spacing.md};
  `)}
`,T=t.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${o.spacing.sm};
  margin-bottom: ${o.spacing.xs};
  gap: ${o.spacing.sm};
  flex-wrap: wrap;
  
  ${e=>e.$fullWidth&&i`
    width: 100%;
    
    > div {
      width: auto;
      display: flex;
      align-items: center;
    }
  `}
`,B=t.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: ${o.spacing.md};
  position: relative;
  z-index: 1;
  margin-top: 0;
  
  ${r(`
    margin-top: 0;
    flex-wrap: wrap;
    gap: ${o.spacing.sm};
  `)}
`,C=t.div`
  display: flex;
  align-items: center;
  margin-top: ${o.spacing.sm};
`,E=t.label`
  margin-right: ${o.spacing.sm};
  font-size: ${o.fontSizes.sm};
  color: ${o.colors.text.secondary};
  font-weight: normal;
`,A=t.select`
  padding: 5px ${o.spacing.sm};
  border: 1px solid ${o.colors.border};
  border-radius: ${o.borderRadius.small};
  background-color: ${o.colors.white};
  cursor: pointer;
  font-size: ${o.fontSizes.sm};
  min-width: 50px;
`,H=t.div`
  display: flex;
  align-items: center;
  flex-direction: ${e=>e.$isRTL?"row":"row-reverse"};
  gap: ${o.spacing.sm};  
`,P=t.img`
  height: 32px;
  /* Image protection */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
  pointer-events: none;
`,F=t.h1`
  font-size: ${o.fontSizes.xxl};
  margin: ${o.spacing.sm} 0;
`,p=t.button`
  ${g}
  background-color: ${e=>e.$primary?e.$isHovered?o.colors.primaryDark:o.colors.primary:e.$passwordSet?o.colors.black:"transparent"};
  color: ${e=>e.$primary?o.colors.text.white:e.$passwordSet?o.colors.white:o.colors.primary};
  /* Enhanced: Lighter font weight for premium feel */
  font-weight: 500;
  padding: 12px 20px;
  font-size: ${o.fontSizes.md};
  border: ${e=>e.$primary?"none":`1px solid ${o.colors.primary}`};
  border-radius: ${o.borderRadius.medium};
  min-width: 140px; /* Changed from fixed width to min-width */
  width: auto; /* Allow the button to grow based on content */
  white-space: nowrap; /* Prevent text wrapping */
  text-align: center;
  margin-left: auto; /* Align to trailing side */
  box-shadow: ${e=>e.$primary?o.boxShadow.primaryBtn:"none"};
  
  &:hover {
    background-color: ${e=>e.$primary?o.colors.primaryDark:e.$passwordSet?"#333333":o.colors.grayLighter};
  }
`,D=t(p)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 8px;
  width: auto;
`,M=t.span`
  width: 18px;
  height: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: ${o.spacing.sm};
`,G=t.span`
  height: 2px;
  background: ${o.colors.primary};
  width: 100%;
`,V=t(p)`
  width: 100%;
  text-align: left;
  padding: ${o.spacing.md};
  background: transparent;
  color: ${o.colors.primary};
  border: none;
  margin: 2px 0;
  
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
`;const O=t.div`
  display: flex;
  gap: ${o.spacing.sm};
`,U=t.div`
  display: flex;
  flex-direction: column;
  gap: ${o.spacing.sm};
  margin-bottom: ${o.spacing.md};
  width: 100%;
`,W=t.a`
  font-size: ${o.fontSizes.sm};
  color: ${o.colors.primary};
  text-decoration: none;
  font-weight: 500;
  display: inline-block;
  padding: ${o.spacing.xs} 0;
`;t.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;t.div`
  font-size: ${o.fontSizes.md};
  color: ${o.colors.text.secondary};
`;const _=t.a`
  text-decoration: none;
  color: ${o.colors.text.white};
  background-color: ${o.colors.primary};
  padding: ${o.spacing.sm} ${o.spacing.md};
  border-radius: ${o.borderRadius.small};
  font-size: ${o.fontSizes.sm};
  display: flex;
  align-items: center;
  gap: 6px;
`,N=t.div`
  margin-bottom: ${o.spacing.md};
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
`;const q=t.div`
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
`,J=t.h2`
  font-weight: 400;
  margin: 0 0 ${o.spacing.md} 0;
  font-size: ${o.fontSizes.xxl};
  padding: 0;
  
  ${r(`
    padding: 0;
  `)}
`,K=t.strong`
  font-weight: 700;
`,Y=t.div`
  ${n}
  padding: ${e=>e.$padding||o.spacing.md};
  margin-bottom: ${e=>e.$marginBottom||o.spacing.md};
  width: 100%;
`,Z=t.p`
  color: ${o.colors.text.primary};
  margin: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  max-width: 100%;
  font-size: ${o.fontSizes.md};
`,Q=t.div`
  text-align: center;
  padding: 40px;
  font-size: ${o.fontSizes.lg};
  grid-column: 1 / -1;
  width: 100%;
  border-radius: ${o.borderRadius.medium};
  color: ${e=>{switch(e.$type){case"error":return o.colors.danger;case"loading":return o.colors.text.secondary;default:return o.colors.text.primary}}};
`,oo=t.div`
  margin-top: ${o.spacing.sm};
  margin-bottom: ${o.spacing.md};
  font-size: ${o.fontSizes.xs};
  color: ${o.colors.text.secondary};
  line-height: 1.5;
  text-align: ${e=>e.$isRTL?"right":"left"};
  white-space: pre-wrap;
`,eo=t.div`
  font-size: ${o.fontSizes.xs};
  color: ${o.colors.text.light};
  text-align: ${e=>e.$isRTL?"right":"left"};
  margin-top: ${o.spacing.xs};
`,to=t.div`
  display: flex;
  align-items: center;
  font-size: ${o.fontSizes.xs};
  color: ${o.colors.text.secondary};
`,io=t.div`
  display: grid;
  grid-gap: ${o.spacing.md};
  width: 100%;
  min-height: 0;
  
  ${e=>{switch(e.$columns){case"1":return i`grid-template-columns: repeat(1, 1fr);`;case"2":return i`grid-template-columns: repeat(2, 1fr);`;case"3":return i`grid-template-columns: repeat(3, 1fr);`;case"4":return i`grid-template-columns: repeat(4, 1fr);`;case"5":return i`grid-template-columns: repeat(5, 1fr);`;default:return i`grid-template-columns: repeat(1, 1fr);`}}}
  
  @media (max-width: ${o.breakpoints.mobile}) {
    grid-gap: ${o.spacing.sm};
    ${e=>{const a=parseInt(e.$columns);return a>3?i`grid-template-columns: repeat(3, minmax(0, 1fr));`:a>1?i`grid-template-columns: repeat(${a}, minmax(0, 1fr));`:i`grid-template-columns: repeat(1, minmax(0, 1fr));`}}
  }
`,x=i`
  ${n}
  transition: transform 0.2s;
  position: relative;
  height: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  margin-bottom: ${o.spacing.md};
  
  ${e=>e.$isHovered&&i`
    transform: translateY(-2px);
  `}
  
  ${r(`
    margin-bottom: ${o.spacing.sm};
  `)}
`;t.div`
  ${x}
  ${e=>e.$isVideo&&i`
    cursor: pointer;
  `}
  ${e=>e.$isSelected&&i`
    border: 3px solid ${o.colors.primary};
    box-shadow: 0 0 0 3px rgba(0, 106, 220, 0.3);
  `}
`;const ro=t.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${o.spacing.md};
  margin-bottom: ${o.spacing.xl};
  width: 100%;
`,no=t.div`
  ${n}
  display: flex;
  flex-direction: column;
  padding: ${o.spacing.sm};
  width: 160px;
  position: relative;
`,ao=t.div`
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
`,so=t.img`
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
`;const lo=t.div`
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
`,co=t.div`
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
`,go=t.div`
  position: relative;
  margin-bottom: ${o.spacing.sm};
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`,po=t.img`
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
`,mo=t.video`
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
`;const $o=t.div`
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
`,ho=t.div`
  ${$}
  background-color: ${e=>e.$type==="loading"?o.colors.overlayLight:"transparent"};
  z-index: ${e=>e.$type==="loading"?4:5};
  color: ${e=>e.$type==="loading"?o.colors.white:"inherit"};
  font-weight: ${e=>e.$type==="loading"?500:"inherit"};
  text-align: ${e=>e.$type==="loading"?"center":"inherit"};
  padding: ${e=>e.$type==="loading"?"0 10px":"0"};
  pointer-events: ${e=>e.$type==="watermark"?"none":"auto"};
  border-radius: ${o.borderRadius.medium}; // For overlays on containers/cards
`,uo=t.div`
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
`,xo=t.h3`
  font-size: ${o.fontSizes.lg};
  margin: 0 0 ${o.spacing.sm} 0;
`,bo=t.div`
  height: ${e=>e.$height||"8px"};
  background-color: ${o.colors.grayLight};
  border-radius: ${o.borderRadius.small};
  overflow: hidden;
  ${e=>e.$bottom&&`bottom: ${e.$bottom};`}
  ${e=>e.$left&&`left: ${e.$left};`}
  ${e=>e.$right&&`right: ${e.$right};`}
  ${e=>e.$bottom&&e.$left&&e.$right&&"position: absolute;"}
`,fo=t.div`
  height: 100%;
  background-color: ${e=>e.$status==="processing"?o.colors.warning:e.$status==="error"?o.colors.danger:e.$status==="complete"?o.colors.success:o.colors.info};
  border-radius: ${o.borderRadius.small};
  transition: width 0.3s ease;
  width: ${e=>(e.$progress||0)*100}%;
`,wo=t.div`
  font-size: ${o.fontSizes.sm};
  margin-bottom: ${o.spacing.sm};
`,yo=t.div`
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
`,vo=t.div`
  ${n}
  padding: ${o.spacing.md};
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  ${r(`
    padding: ${o.spacing.md};
    width: 90%;
  `)}
`;t.div`
  background: ${o.colors.white};
  padding: 30px;
  border-radius: ${o.borderRadius.large};
  width: 90%;
  max-width: 400px;
  box-shadow: ${o.boxShadow.xl};
  ${e=>l(e.$isRTL)}
`;t.p`
  font-size: ${o.fontSizes.md};
  margin-bottom: ${o.spacing.sm};
`;t.p`
  font-size: ${o.fontSizes.sm};
  margin-bottom: ${o.spacing.md};
  color: ${o.colors.text.secondary};
`;const zo=t.input`
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
`;const ko=t.div`
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
`,So=t.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 10000; /* Always above header (9999) */
  display: flex;
  flex-direction: column;
`,Lo=t.div`
  text-align: center;
  margin-top: ${o.spacing.md};
  font-size: 11px;
  color: ${o.colors.text.secondary};
`,Ro=t.div`
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
`,Io=t.div`
  color: ${o.colors.white};
  font-size: ${o.fontSizes.sm};
  font-weight: bold;
`,jo=t.div`
  padding: ${o.spacing.sm} ${o.spacing.md};
  background-color: ${o.colors.background.highlight};
  border-radius: ${o.borderRadius.small};
  margin-bottom: ${o.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${o.boxShadow.md};
`,To=t.div`
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
`,Bo=t.div`
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
`,Co=t.div`
  margin-bottom: ${o.spacing.md};
`,Eo=t.label`
  display: block;
  margin-bottom: ${o.spacing.sm};
  font-size: ${o.fontSizes.sm};
  font-weight: 500;
  color: ${o.colors.text.primary};
`,Ao=t.input`
  ${c}
`,Ho=t.textarea`
  ${c}
  resize: vertical;
  min-height: 80px; // Ensure consistent minimum height
  font-family: inherit; // Explicitly inherit font family for textarea
  
  // Additional textarea-specific placeholder styling
  &::placeholder {
    color: ${o.colors.text.lighter};
    opacity: 1;
    font-size: ${o.fontSizes.md};
    font-family: inherit;
    font-weight: normal;
    line-height: 1.5;
  }
`;t.input`
  display: none;
`;const Po=t.div`
  display: flex;
  align-items: center;
  margin-bottom: ${o.spacing.md};
  padding: 4px 0;
  gap: 15px;
`,Fo=t.div`
  font-size: ${o.fontSizes.sm};
  font-weight: 500;
  color: ${o.colors.text.primary};
  line-height: 24px;
`,Do=t.label`
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
`,Mo=t.span`
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
`,Go=t.div`
  color: ${o.colors.white};
  font-size: ${o.fontSizes.xxl};
  font-weight: bold;
  transform: rotate(-30deg);
  opacity: 0.7;
  text-shadow: ${o.boxShadow.textShadow};
  user-select: none;
  white-space: nowrap;
`,Vo=t.div`
  font-size: ${o.fontSizes.xs};
  color: ${o.colors.text.secondary};
  margin-bottom: 6px;
`,Oo=t.div`
  text-align: center;
  padding: ${o.spacing.md};
  font-size: 0.9em;
  color: ${o.colors.text.secondary};
`,Uo=t.a`
  margin: 0 ${o.spacing.sm};
  color: ${o.colors.text.secondary};
  text-decoration: ${e=>e.$isHovered?"underline":"none"};
`,Wo=t.div`
  text-align: center; 
  padding: 40px ${o.spacing.md};
  border-radius: ${o.borderRadius.medium};
  background-color: ${e=>e.$type==="error"?o.colors.background.error:o.colors.white};
  border: ${e=>e.$type==="error"?`1px solid ${o.colors.highlight.error}`:"none"};
  box-shadow: ${e=>e.$type==="empty"?o.boxShadow.md:"none"};
  margin-bottom: ${e=>e.$type==="error"?o.spacing.md:"0"};
  
  p {
    font-size: ${o.fontSizes.md};
    color: ${e=>e.$type==="error"?o.colors.danger:o.colors.text.secondary};
  }
`;t.div`
  margin-top: ${o.spacing.md};
  padding: ${o.spacing.md};
  background-color: ${o.colors.grayLighter};
  border-radius: ${o.borderRadius.medium};
`;t.h3`
  margin: 0 0 ${o.spacing.sm} 0;
  font-size: ${o.fontSizes.md};
`;t.pre`
  margin: 0;
  font-size: ${o.fontSizes.xs};
  white-space: pre-wrap;
  max-height: 200px;
  overflow-y: auto;
`;t.div`
  margin-bottom: ${o.spacing.xs};
  font-size: ${o.fontSizes.xs};
`;const _o=t.a`
  font-size: ${o.fontSizes.xs};
  color: ${o.colors.text.secondary};
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${o.colors.text.primary};
  }
`,No=t.div`
  font-size: ${o.fontSizes.xs};
  color: ${o.colors.text.lighter};
  text-align: ${e=>(e.$isRTL,"right")};
  margin-bottom: ${o.spacing.md};
  display: flex;
  justify-content: flex-end;
`;export{K as $,y as A,p as B,Y as C,vo as D,Lo as E,Co as F,f as G,B as H,ao as I,so as J,$o as K,H as L,Q as M,O as N,ho as O,xo as P,lo as Q,co as R,_o as S,Po as T,To as U,mo as V,Go as W,Ro as X,Io as Y,io as Z,J as _,P as a,Z as a0,D as a1,M as a2,G as a3,ko as a4,V as a5,I as a6,j as a7,T as a8,C as a9,E as aa,A as ab,z as ac,k as ad,h as ae,R as af,L as ag,S as ah,w as ai,v as aj,zo as ak,N as al,X as am,q as an,Wo as ao,oo as ap,to as aq,eo as ar,No as as,F as b,Oo as c,Uo as d,Eo as e,Ao as f,Ho as g,Fo as h,Do as i,Mo as j,wo as k,bo as l,fo as m,ro as n,no as o,Bo as p,go as q,po as r,Vo as s,W as t,U as u,jo as v,So as w,uo as x,_ as y,yo as z};
