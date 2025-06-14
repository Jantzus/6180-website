import{aF as p,aG as i,d as t}from"./utils-CuQXS0Z6.js";const o={colors:{primary:"#007bff",primaryDark:"#0056b3",success:"#4caf50",danger:"#e53935",warning:"#ff9800",info:"#2196f3",gray:"#8c8c8c",grayLight:"#e0e0e0",grayLighter:"#f0f0f0",white:"#fff",black:"#000",overlay:"rgba(0, 0, 0, 0.7)",overlayLight:"rgba(0, 0, 0, 0.5)",border:"#ddd",borderLight:"#eaeaea",text:{primary:"#333",secondary:"#666",light:"#777",lighter:"#999",white:"#fff"},background:{primary:"#f9fafb",card:"#fff",highlight:"#f0f7ff",error:"#fdeded"},highlight:{border:"#cce0ff",error:"#f7d0d0"}},spacing:{xs:"4px",sm:"8px",md:"16px",xl:"32px"},borderRadius:{small:"4px",medium:"8px",large:"16px",circle:"50%"},fontSizes:{xs:"12px",sm:"14px",md:"16px",lg:"18px",xxl:"24px"},boxShadow:{sm:"0 1px 2px rgba(0,0,0,0.06)",md:"0 1px 3px rgba(0,0,0,0.1)",xl:"0 8px 24px rgba(0,0,0,0.2)",primaryBtn:"0 4px 12px rgba(0, 123, 255, 0.2)",selection:"0 2px 4px rgba(0, 0, 0, 0.2)",textShadow:"0 0 5px rgba(0, 0, 0, 0.8)"},breakpoints:{mobile:"767px"}},u=p`
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
    height: 100%;
    overflow-x: hidden;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    /* Ensure viewport is properly handled */
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    font-family: 'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    /* Prevent content from being hidden behind notches/status bars */
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
    /* Fallback for older browsers */
    padding-top: constant(safe-area-inset-top);
    padding-bottom: constant(safe-area-inset-bottom);
    padding-left: constant(safe-area-inset-left);
    padding-right: constant(safe-area-inset-right);
    /* Prevent zooming issues */
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }

  #root {
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
    /* Ensure proper stacking context */
    z-index: 0;
  }  
`,a=e=>i`
  direction: ${e?"rtl":"ltr"};
`,r=e=>i`
  @media (max-width: ${o.breakpoints.mobile}) {
    ${e}
  }
`,n=i`
  background-color: ${o.colors.background.card};
  border-radius: ${o.borderRadius.medium};
  box-shadow: ${o.boxShadow.md};
`,d=i`
  width: 100%;
  padding: 10px 12px;
  font-size: ${o.fontSizes.md};
  font-family: inherit; // Ensure same font family
  line-height: 1.5; // Consistent line height
  border-radius: ${o.borderRadius.small};
  border: 1px solid ${o.colors.border};
  box-sizing: border-box;
  background-color: ${o.colors.white};
  color: ${o.colors.text.primary};
  
  // Consistent placeholder styling
  &::placeholder {
    color: ${o.colors.text.lighter};
    opacity: 1; // Override browser defaults
    font-size: ${o.fontSizes.md};
    font-family: inherit;
    font-weight: normal;
  }
  
  // Remove browser-specific styling differences
  &::-webkit-input-placeholder {
    color: ${o.colors.text.lighter};
    opacity: 1;
  }
  
  &::-moz-placeholder {
    color: ${o.colors.text.lighter};
    opacity: 1;
  }
  
  &:-ms-input-placeholder {
    color: ${o.colors.text.lighter};
    opacity: 1;
  }
  
  &:focus {
    outline: none;
    border-color: ${o.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`,c=i`
  cursor: ${e=>e.disabled||e.$isDisabled?"not-allowed":"pointer"};
  opacity: ${e=>e.disabled||e.$isDisabled?.6:1};
  transition: all 0.2s ease;
  border-radius: ${o.borderRadius.medium};
`,g=i`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`,x=t.div`
  max-width: 1200px;
  margin: auto;
  background: ${o.colors.background.primary};
  color: ${o.colors.text.primary};
  line-height: 1.5;
  padding: ${o.spacing.md};
  width: 100%;
  overflow-x: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  
  ${r(`
    padding: ${o.spacing.sm};
  `)}
`,b=t.div`
  padding: ${o.spacing.md};
  background-color: ${o.colors.background.primary};
  min-height: 100vh;
  max-width: 100vw;
  position: relative;
  /* Ensure proper spacing from top, accounting for safe areas */
  padding-top: max(${o.spacing.md}, env(safe-area-inset-top));
  padding-top: max(${o.spacing.md}, constant(safe-area-inset-top));
  /* Handle RTL direction */
  ${e=>a(e.$isRTL)}
  
  ${r(`
    padding: ${o.spacing.sm};
    padding-top: max(${o.spacing.sm}, env(safe-area-inset-top));
    padding-top: max(${o.spacing.sm}, constant(safe-area-inset-top));
  `)}
`,f=t.div`
  padding: 0 ${o.spacing.md} ${o.spacing.md};
  width: 100%;
  overflow: visible;
  
  ${r(`
    padding: 0 ${o.spacing.md} ${o.spacing.sm};
    width: 100%;
  `)}
`;t.div`
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
  position: relative;
`;const w=t.div`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid ${o.colors.borderLight};
  /* Remove sticky positioning to prevent conflicts */
  position: relative;
  z-index: 100;
  backdrop-filter: blur(8px);
  margin-bottom: ${o.spacing.sm};
`,y=t.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${o.spacing.sm} ${o.spacing.md};
  
  ${r(`
    padding: ${o.spacing.sm};
  `)}
`,m=t.a`
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
`,v=t(m)`
  font-style: italic;
  color: ${o.colors.text.light};
  font-size: ${o.fontSizes.xs};
  
  &:hover {
    color: ${o.colors.text.secondary};
  }
`,z=t.img`
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
`,k=t.div`
  display: flex;
  align-items: center;
  flex-direction: ${e=>e.$isRTL?"row-reverse":"row"};
  gap: ${o.spacing.sm};
  margin: 0;
`,S=t.div`
  /* Remove sticky positioning to prevent cutoff issues */
  position: relative;
  background: ${o.colors.white};
  box-shadow: ${o.boxShadow.sm};
  z-index: 10;
  margin-bottom: ${o.spacing.sm};
  width: 100%;
  border-radius: ${o.borderRadius.medium};
`,R=t.div`
  display: flex;
  flex-direction: column;
  padding: ${o.spacing.md};
  
  ${r(`
    padding: ${o.spacing.md};
  `)}
`,L=t.div`
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
`,C=t.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: ${o.spacing.md};
  /* Ensure no positioning conflicts */
  position: relative;
  z-index: 1;
  /* Add some top margin to prevent cutoff */
  margin-top: ${o.spacing.sm};
  
  ${r(`
    margin-top: ${o.spacing.xs};
    flex-wrap: wrap;
    gap: ${o.spacing.sm};
  `)}
`,T=t.div`
  display: flex;
  align-items: center;
  margin-top: ${o.spacing.sm};
`,j=t.label`
  margin-right: ${o.spacing.sm};
  font-size: ${o.fontSizes.sm};
  color: ${o.colors.text.secondary};
  font-weight: normal;
`,B=t.select`
  padding: 5px ${o.spacing.sm};
  border: 1px solid ${o.colors.border};
  border-radius: ${o.borderRadius.small};
  background-color: ${o.colors.white};
  cursor: pointer;
  font-size: ${o.fontSizes.sm};
  min-width: 50px;
`,I=t.div`
  display: flex;
  align-items: center;
  flex-direction: ${e=>e.$isRTL?"row-reverse":"row"};
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
`,A=t.h1`
  font-size: ${o.fontSizes.xxl};
  margin: ${o.spacing.sm} 0;
`,l=t.button`
  ${c}
  background-color: ${e=>e.$primary?e.$isHovered?o.colors.primaryDark:o.colors.primary:e.$passwordSet?o.colors.black:"transparent"};
  color: ${e=>e.$primary?o.colors.text.white:e.$passwordSet?o.colors.white:o.colors.primary};
  font-weight: ${e=>e.$primary?"500":"normal"};
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
`,F=t(l)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 8px;
  width: auto;
`,H=t.span`
  width: 18px;
  height: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: ${o.spacing.sm};
`,M=t.span`
  height: 2px;
  background: ${o.colors.primary};
  width: 100%;
`,D=t(l)`
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
  ${c}
  background-color: ${o.colors.danger};
  color: ${o.colors.text.white};
  border: none;
  border-radius: ${o.borderRadius.small};
  padding: 6px ${o.spacing.sm};
  font-size: ${o.fontSizes.xs};
  margin-top: auto;
`;const E=t.div`
  display: flex;
  gap: ${o.spacing.sm};
`,G=t.div`
  display: flex;
  flex-direction: column;
  gap: ${o.spacing.sm};
  margin-bottom: ${o.spacing.md};
  width: 100%;
`,V=t.a`
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
`;const O=t.a`
  text-decoration: none;
  color: ${o.colors.text.white};
  background-color: ${o.colors.primary};
  padding: ${o.spacing.sm} ${o.spacing.md};
  border-radius: ${o.borderRadius.small};
  font-size: ${o.fontSizes.sm};
  display: flex;
  align-items: center;
  gap: 6px;
`,W=t.div`
  margin-bottom: ${o.spacing.md};
  text-align: center;
  direction: ${e=>e.$isRTL?"rtl":"ltr"};
`,N=t.div`
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
`;const U=t.div`
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
`,q=t.h2`
  font-weight: 400;
  margin: 0 0 ${o.spacing.md} 0;
  font-size: ${o.fontSizes.xxl};
  padding: 0;
  
  ${r(`
    padding: 0;
  `)}
`,K=t.strong`
  font-weight: 700;
`,X=t.div`
  ${n}
  padding: ${e=>e.$padding||o.spacing.md};
  margin-bottom: ${e=>e.$marginBottom||o.spacing.md};
  width: 100%;
`,Y=t.p`
  color: ${o.colors.text.primary};
  margin: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  max-width: 100%;
  font-size: ${o.fontSizes.md};
`,J=t.div`
  text-align: center;
  padding: 40px;
  font-size: ${o.fontSizes.lg};
  grid-column: 1 / -1;
  width: 100%;
  border-radius: ${o.borderRadius.medium};
  color: ${e=>{switch(e.$type){case"error":return o.colors.danger;case"loading":return o.colors.text.secondary;default:return o.colors.text.primary}}};
`,Q=t.div`
  margin-top: ${o.spacing.sm};
  margin-bottom: ${o.spacing.md};
  font-size: ${o.fontSizes.xs};
  color: ${o.colors.text.secondary};
  line-height: 1.5;
  text-align: ${e=>e.$isRTL?"right":"left"};
  white-space: pre-wrap;
`,Z=t.div`
  font-size: ${o.fontSizes.xs};
  color: ${o.colors.text.light};
  text-align: ${e=>e.$isRTL?"right":"left"};
  margin-top: ${o.spacing.xs};
`,_=t.div`
  display: flex;
  align-items: center;
  font-size: ${o.fontSizes.xs};
  color: ${o.colors.text.secondary};
`,oo=t.div`
  display: grid;
  grid-gap: ${o.spacing.md};
  width: 100%;
  min-height: 0;
  
  ${e=>{switch(e.$columns){case"1":return i`grid-template-columns: repeat(1, 1fr);`;case"2":return i`grid-template-columns: repeat(2, 1fr);`;case"3":return i`grid-template-columns: repeat(3, 1fr);`;case"4":return i`grid-template-columns: repeat(4, 1fr);`;case"5":return i`grid-template-columns: repeat(5, 1fr);`;default:return i`grid-template-columns: repeat(1, 1fr);`}}}
  
  @media (max-width: ${o.breakpoints.mobile}) {
    grid-gap: ${o.spacing.sm};
    ${e=>{const s=parseInt(e.$columns);return s>3?i`grid-template-columns: repeat(3, minmax(0, 1fr));`:s>1?i`grid-template-columns: repeat(${s}, minmax(0, 1fr));`:i`grid-template-columns: repeat(1, minmax(0, 1fr));`}}
  }
`,$=i`
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
  ${$}
  ${e=>e.$isVideo&&i`
    cursor: pointer;
  `}
  ${e=>e.$isSelected&&i`
    border: 3px solid ${o.colors.primary};
    box-shadow: 0 0 0 3px rgba(0, 106, 220, 0.3);
  `}
`;const eo=t.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${o.spacing.md};
  margin-bottom: ${o.spacing.xl};
  width: 100%;
`,to=t.div`
  ${n}
  display: flex;
  flex-direction: column;
  padding: ${o.spacing.sm};
  width: 160px;
  position: relative;
`,io=t.div`
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
`,ro=t.img`
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
`;const no=t.div`
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
`,so=t.div`
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
`,ao=t.div`
  position: relative;
  margin-bottom: ${o.spacing.sm};
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`,co=t.img`
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
`,lo=t.video`
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
`;const po=t.div`
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
`,go=t.div`
  ${g}
  background-color: ${e=>e.$type==="loading"?o.colors.overlayLight:"transparent"};
  z-index: ${e=>e.$type==="loading"?4:5};
  color: ${e=>e.$type==="loading"?o.colors.white:"inherit"};
  font-weight: ${e=>e.$type==="loading"?500:"inherit"};
  text-align: ${e=>e.$type==="loading"?"center":"inherit"};
  padding: ${e=>e.$type==="loading"?"0 10px":"0"};
  pointer-events: ${e=>e.$type==="watermark"?"none":"auto"};
  border-radius: ${o.borderRadius.medium}; // For overlays on containers/cards
`,mo=t.div`
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
`,$o=t.h3`
  font-size: ${o.fontSizes.lg};
  margin: 0 0 ${o.spacing.sm} 0;
`,ho=t.div`
  height: ${e=>e.$height||"8px"};
  background-color: ${o.colors.grayLight};
  border-radius: ${o.borderRadius.small};
  overflow: hidden;
  ${e=>e.$bottom&&`bottom: ${e.$bottom};`}
  ${e=>e.$left&&`left: ${e.$left};`}
  ${e=>e.$right&&`right: ${e.$right};`}
  ${e=>e.$bottom&&e.$left&&e.$right&&"position: absolute;"}
`,uo=t.div`
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
  z-index: ${e=>e.$zIndex||1e3};
  display: flex;
  justify-content: center;
  align-items: center;
`,fo=t.div`
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
  ${e=>a(e.$isRTL)}
`;t.p`
  font-size: ${o.fontSizes.md};
  margin-bottom: ${o.spacing.sm};
`;t.p`
  font-size: ${o.fontSizes.sm};
  margin-bottom: ${o.spacing.md};
  color: ${o.colors.text.secondary};
`;const wo=t.input`
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
`;const yo=t.div`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 100;
  background-color: ${o.colors.white};
  box-shadow: ${o.boxShadow.md};
  border-radius: ${o.borderRadius.small};
  padding: ${o.spacing.sm};
  display: flex;
  flex-direction: column;
  min-width: 180px;
  margin-top: ${o.spacing.xs};
`,vo=t.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 2000;
  display: flex;
  flex-direction: column;
`,zo=t.div`
  text-align: center;
  margin-top: ${o.spacing.md};
  font-size: 11px;
  color: ${o.colors.text.secondary};
`,ko=t.div`
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
`,So=t.div`
  color: ${o.colors.white};
  font-size: ${o.fontSizes.sm};
  font-weight: bold;
`,Ro=t.div`
  padding: ${o.spacing.sm} ${o.spacing.md};
  background-color: ${o.colors.background.highlight};
  border-radius: ${o.borderRadius.small};
  margin-bottom: ${o.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${o.boxShadow.md};
`,Lo=t.div`
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
`,Co=t.div`
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
`,To=t.div`
  margin-bottom: ${o.spacing.md};
`,jo=t.label`
  display: block;
  margin-bottom: ${o.spacing.sm};
  font-size: ${o.fontSizes.sm};
  font-weight: 500;
  color: ${o.colors.text.primary};
`,Bo=t.input`
  ${d}
`,Io=t.textarea`
  ${d}
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
`,Ao=t.div`
  font-size: ${o.fontSizes.sm};
  font-weight: 500;
  color: ${o.colors.text.primary};
  line-height: 24px;
`,Fo=t.label`
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
`,Ho=t.span`
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
`,Mo=t.div`
  color: ${o.colors.white};
  font-size: ${o.fontSizes.xxl};
  font-weight: bold;
  transform: rotate(-30deg);
  opacity: 0.7;
  text-shadow: ${o.boxShadow.textShadow};
  user-select: none;
  white-space: nowrap;
`,Do=t.div`
  font-size: ${o.fontSizes.xs};
  color: ${o.colors.text.secondary};
  margin-bottom: 6px;
`,Eo=t.div`
  text-align: center;
  padding: ${o.spacing.md};
  font-size: 0.9em;
  color: ${o.colors.text.secondary};
  
  /* Progressive enhancement - start with safe-area, add mobile offset */
  padding-bottom: env(safe-area-inset-bottom, ${o.spacing.md});
  padding-bottom: constant(safe-area-inset-bottom, ${o.spacing.md});
  
  @media (max-width: 768px) {
    /* Add extra padding for mobile browser controls */
    padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 30px);
    padding-bottom: calc(constant(safe-area-inset-bottom, 0px) + 30px);
  }
  
  @media (max-width: 480px) {
    padding: ${o.spacing.sm};
    /* More conservative for small screens */
    padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 40px);
    padding-bottom: calc(constant(safe-area-inset-bottom, 0px) + 40px);
  }
`,Go=t.a`
  margin: 0 ${o.spacing.sm};
  color: ${o.colors.text.secondary};
  text-decoration: ${e=>e.$isHovered?"underline":"none"};
`,Vo=t.div`
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
`;const Oo=t.a`
  font-size: ${o.fontSizes.xs};
  color: ${o.colors.text.secondary};
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${o.colors.text.primary};
  }
`,Wo=t.div`
  font-size: ${o.fontSizes.xs};
  color: ${o.colors.text.lighter};
  text-align: ${e=>(e.$isRTL,"right")};
  margin-bottom: ${o.spacing.md};
  display: flex;
  justify-content: flex-end;
`;export{K as $,b as A,l as B,X as C,fo as D,zo as E,To as F,u as G,C as H,io as I,ro as J,po as K,I as L,J as M,E as N,go as O,$o as P,no as Q,so as R,Co as S,Po as T,Lo as U,lo as V,Mo as W,ko as X,So as Y,oo as Z,q as _,P as a,Y as a0,F as a1,H as a2,M as a3,yo as a4,D as a5,S as a6,R as a7,L as a8,T as a9,j as aa,B as ab,x as ac,w as ad,y as ae,m as af,k as ag,z as ah,v as ai,f as aj,wo as ak,W as al,N as am,U as an,Vo as ao,Q as ap,_ as aq,Z as ar,Wo as as,A as b,Eo as c,Go as d,jo as e,Bo as f,Io as g,Ao as h,Fo as i,Ho as j,xo as k,ho as l,uo as m,eo as n,to as o,ao as p,co as q,Do as r,V as s,G as t,Oo as u,Ro as v,vo as w,mo as x,O as y,bo as z};
