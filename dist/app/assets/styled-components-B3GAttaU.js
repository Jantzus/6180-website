import{aD as p,aE as e,d as i}from"./utils-CF8TLIZ8.js";const o={colors:{primary:"#007bff",primaryDark:"#0056b3",success:"#4caf50",danger:"#e53935",warning:"#ff9800",info:"#2196f3",gray:"#8c8c8c",grayLight:"#e0e0e0",grayLighter:"#f0f0f0",white:"#fff",black:"#000",overlay:"rgba(0, 0, 0, 0.7)",overlayLight:"rgba(0, 0, 0, 0.5)",border:"#ddd",borderLight:"#eaeaea",text:{primary:"#333",secondary:"#666",light:"#777",lighter:"#999",white:"#fff"},background:{primary:"#f9fafb",card:"#fff",highlight:"#f0f7ff",error:"#fdeded"},highlight:{border:"#cce0ff",error:"#f7d0d0"}},spacing:{xs:"4px",sm:"8px",md:"16px",xl:"32px"},borderRadius:{small:"4px",medium:"8px",large:"16px",circle:"50%"},fontSizes:{xs:"12px",sm:"14px",md:"16px",lg:"18px",xxl:"24px"},boxShadow:{sm:"0 1px 2px rgba(0,0,0,0.06)",md:"0 1px 3px rgba(0,0,0,0.1)",xl:"0 8px 24px rgba(0,0,0,0.2)",primaryBtn:"0 4px 12px rgba(0, 123, 255, 0.2)",selection:"0 2px 4px rgba(0, 0, 0, 0.2)",textShadow:"0 0 5px rgba(0, 0, 0, 0.8)"},breakpoints:{mobile:"767px"}},h=p`
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
`,n=t=>e`
  direction: ${t?"rtl":"ltr"};
`,r=t=>e`
  @media (max-width: ${o.breakpoints.mobile}) {
    ${t}
  }
`,a=e`
  background-color: ${o.colors.background.card};
  border-radius: ${o.borderRadius.medium};
  box-shadow: ${o.boxShadow.md};
`,d=e`
  width: 100%;
  padding: 10px 12px;
  font-size: ${o.fontSizes.md};
  border-radius: ${o.borderRadius.small};
  border: 1px solid ${o.colors.border};
  box-sizing: border-box;
`,c=e`
  cursor: ${t=>t.disabled||t.$isDisabled?"not-allowed":"pointer"};
  opacity: ${t=>t.disabled||t.$isDisabled?.6:1};
  transition: all 0.2s ease;
  border-radius: ${o.borderRadius.medium};
`,g=e`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`,b=i.div`
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
`,f=i.div`
  padding: ${o.spacing.md};
  background-color: ${o.colors.background.primary};
  min-height: 100vh;
  max-width: 100vw;
  position: relative;
  /* Ensure proper spacing from top, accounting for safe areas */
  padding-top: max(${o.spacing.md}, env(safe-area-inset-top));
  padding-top: max(${o.spacing.md}, constant(safe-area-inset-top));
  /* Handle RTL direction */
  ${t=>n(t.$isRTL)}
  
  ${r(`
    padding: ${o.spacing.sm};
    padding-top: max(${o.spacing.sm}, env(safe-area-inset-top));
    padding-top: max(${o.spacing.sm}, constant(safe-area-inset-top));
  `)}
`,u=i.div`
  padding: 0 ${o.spacing.md} ${o.spacing.md};
  width: 100%;
  overflow: visible;
  
  ${r(`
    padding: 0 ${o.spacing.md} ${o.spacing.sm};
    width: 100%;
  `)}
`;i.div`
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
  position: relative;
`;const w=i.div`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid ${o.colors.borderLight};
  /* Remove sticky positioning to prevent conflicts */
  position: relative;
  z-index: 100;
  backdrop-filter: blur(8px);
  margin-bottom: ${o.spacing.sm};
`,y=i.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${o.spacing.sm} ${o.spacing.md};
  
  ${r(`
    padding: ${o.spacing.sm};
  `)}
`,m=i.a`
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
`,v=i(m)`
  font-style: italic;
  color: ${o.colors.text.light};
  font-size: ${o.fontSizes.xs};
  
  &:hover {
    color: ${o.colors.text.secondary};
  }
`,z=i.img`
  width: 20px;
  height: 20px;
  margin: 0;
`,k=i.div`
  display: flex;
  align-items: center;
  flex-direction: ${t=>t.$isRTL?"row-reverse":"row"};
  gap: ${o.spacing.sm};
  margin: 0;
`,S=i.div`
  /* Remove sticky positioning to prevent cutoff issues */
  position: relative;
  background: ${o.colors.white};
  box-shadow: ${o.boxShadow.sm};
  z-index: 10;
  margin-bottom: ${o.spacing.sm};
  width: 100%;
  border-radius: ${o.borderRadius.medium};
`,R=i.div`
  display: flex;
  flex-direction: column;
  padding: ${o.spacing.md};
  
  ${r(`
    padding: ${o.spacing.md};
  `)}
`,L=i.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${o.spacing.sm};
  margin-bottom: ${o.spacing.xs};
  gap: ${o.spacing.sm};
  flex-wrap: wrap;
  
  ${t=>t.$fullWidth&&e`
    width: 100%;
    
    > div {
      width: auto;
      display: flex;
      align-items: center;
    }
  `}
`,B=i.div`
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
`,C=i.div`
  display: flex;
  align-items: center;
  margin-top: ${o.spacing.sm};
`,T=i.label`
  margin-right: ${o.spacing.sm};
  font-size: ${o.fontSizes.sm};
  color: ${o.colors.text.secondary};
  font-weight: normal;
`,j=i.select`
  padding: 5px ${o.spacing.sm};
  border: 1px solid ${o.colors.border};
  border-radius: ${o.borderRadius.small};
  background-color: ${o.colors.white};
  cursor: pointer;
  font-size: ${o.fontSizes.sm};
  min-width: 50px;
`,P=i.div`
  display: flex;
  align-items: center;
  flex-direction: ${t=>t.$isRTL?"row-reverse":"row"};
  gap: ${o.spacing.sm};  
`,I=i.img`
  height: 32px;
`,H=i.h1`
  font-size: ${o.fontSizes.xxl};
  margin: ${o.spacing.sm} 0;
`,l=i.button`
  ${c}
  background-color: ${t=>t.$primary?t.$isHovered?o.colors.primaryDark:o.colors.primary:t.$passwordSet?o.colors.black:"transparent"};
  color: ${t=>t.$primary?o.colors.text.white:t.$passwordSet?o.colors.white:o.colors.primary};
  font-weight: ${t=>t.$primary?"500":"normal"};
  padding: 12px 20px;
  font-size: ${o.fontSizes.md};
  border: ${t=>t.$primary?"none":`1px solid ${o.colors.primary}`};
  border-radius: ${o.borderRadius.medium};
  min-width: 140px; /* Changed from fixed width to min-width */
  width: auto; /* Allow the button to grow based on content */
  white-space: nowrap; /* Prevent text wrapping */
  text-align: center;
  margin-left: auto; /* Align to trailing side */
  box-shadow: ${t=>t.$primary?o.boxShadow.primaryBtn:"none"};
  
  &:hover {
    background-color: ${t=>t.$primary?o.colors.primaryDark:t.$passwordSet?"#333333":o.colors.grayLighter};
  }
`,A=i(l)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 8px;
  width: auto;
`,F=i.span`
  width: 18px;
  height: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: ${o.spacing.sm};
`,D=i.span`
  height: 2px;
  background: ${o.colors.primary};
  width: 100%;
`,M=i(l)`
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
`,E=i.button`
  ${c}
  background-color: ${o.colors.danger};
  color: ${o.colors.text.white};
  border: none;
  border-radius: ${o.borderRadius.small};
  padding: 6px ${o.spacing.sm};
  font-size: ${o.fontSizes.xs};
  margin-top: auto;
`,G=i.div`
  display: flex;
  gap: ${o.spacing.sm};
`,W=i.div`
  display: flex;
  flex-direction: column;
  gap: ${o.spacing.sm};
  margin-bottom: ${o.spacing.md};
  width: 100%;
`,N=i.a`
  font-size: ${o.fontSizes.sm};
  color: ${o.colors.primary};
  text-decoration: none;
  font-weight: 500;
  display: inline-block;
  padding: ${o.spacing.xs} 0;
`;i.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;i.div`
  font-size: ${o.fontSizes.md};
  color: ${o.colors.text.secondary};
`;const O=i.a`
  text-decoration: none;
  color: ${o.colors.text.white};
  background-color: ${o.colors.primary};
  padding: ${o.spacing.sm} ${o.spacing.md};
  border-radius: ${o.borderRadius.small};
  font-size: ${o.fontSizes.sm};
  display: flex;
  align-items: center;
  gap: 6px;
`,U=i.div`
  margin-bottom: ${o.spacing.md};
  text-align: center;
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
`,V=i.div`
  display: flex;
  align-items: center;
  justify-content: ${t=>t.$isRTL?"flex-start":"flex-end"};
  margin-bottom: ${o.spacing.sm};
  position: relative;
`;i.div`
  width: 40px;
  height: 40px;
  border-radius: ${o.borderRadius.circle};
  background-color: ${o.colors.grayLight};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${o.fontSizes.lg};
  color: ${o.colors.text.secondary};
`;i.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
`;i.h1`
  font-size: ${o.fontSizes.lg};
  margin: 0;
  font-weight: 600;
`;const q=i.div`
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
`,X=i.h2`
  font-weight: 400;
  margin: 0 0 ${o.spacing.md} 0;
  font-size: ${o.fontSizes.xxl};
  padding: 0;
  
  ${r(`
    padding: 0;
  `)}
`,Y=i.strong`
  font-weight: 700;
`,J=i.div`
  ${a}
  padding: ${t=>t.$padding||o.spacing.md};
  margin-bottom: ${t=>t.$marginBottom||o.spacing.md};
  width: 100%;
`,K=i.p`
  color: ${o.colors.text.primary};
  margin: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  max-width: 100%;
  font-size: ${o.fontSizes.md};
`,Q=i.div`
  text-align: center;
  padding: 40px;
  font-size: ${o.fontSizes.lg};
  grid-column: 1 / -1;
  width: 100%;
  border-radius: ${o.borderRadius.medium};
  color: ${t=>{switch(t.$type){case"error":return o.colors.danger;case"loading":return o.colors.text.secondary;default:return o.colors.text.primary}}};
`,Z=i.div`
  margin-top: ${o.spacing.sm};
  margin-bottom: ${o.spacing.md};
  font-size: ${o.fontSizes.xs};
  color: ${o.colors.text.secondary};
  line-height: 1.5;
  text-align: ${t=>t.$isRTL?"right":"left"};
  white-space: pre-wrap;
`,_=i.div`
  font-size: ${o.fontSizes.xs};
  color: ${o.colors.text.light};
  text-align: ${t=>t.$isRTL?"right":"left"};
  margin-top: ${o.spacing.xs};
`,oo=i.div`
  display: flex;
  align-items: center;
  font-size: ${o.fontSizes.xs};
  color: ${o.colors.text.secondary};
`,to=i.div`
  display: grid;
  grid-gap: ${o.spacing.md};
  width: 100%;
  min-height: 0;
  
  ${t=>{switch(t.$columns){case"1":return e`grid-template-columns: repeat(1, 1fr);`;case"2":return e`grid-template-columns: repeat(2, 1fr);`;case"3":return e`grid-template-columns: repeat(3, 1fr);`;case"4":return e`grid-template-columns: repeat(4, 1fr);`;case"5":return e`grid-template-columns: repeat(5, 1fr);`;default:return e`grid-template-columns: repeat(1, 1fr);`}}}
  
  @media (max-width: ${o.breakpoints.mobile}) {
    grid-gap: ${o.spacing.sm};
    ${t=>{const s=parseInt(t.$columns);return s>3?e`grid-template-columns: repeat(3, minmax(0, 1fr));`:s>1?e`grid-template-columns: repeat(${s}, minmax(0, 1fr));`:e`grid-template-columns: repeat(1, minmax(0, 1fr));`}}
  }
`,$=e`
  ${a}
  transition: transform 0.2s;
  position: relative;
  height: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  margin-bottom: ${o.spacing.md};
  
  ${t=>t.$isHovered&&e`
    transform: translateY(-2px);
  `}
  
  ${r(`
    margin-bottom: ${o.spacing.sm};
  `)}
`;i.div`
  ${$}
  ${t=>t.$isVideo&&e`
    cursor: pointer;
  `}
  ${t=>t.$isSelected&&e`
    border: 3px solid ${o.colors.primary};
    box-shadow: 0 0 0 3px rgba(0, 106, 220, 0.3);
  `}
`;const io=i.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${o.spacing.md};
  margin-bottom: ${o.spacing.xl};
  width: 100%;
`,eo=i.div`
  ${a}
  display: flex;
  flex-direction: column;
  padding: ${o.spacing.sm};
  width: 160px;
  position: relative;
`,ro=i.div`
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
`,ao=i.img`
  opacity: ${t=>t.$isLoaded?1:0};
  transition: opacity 0.3s;
  max-width: 100%;
  max-height: 100%;
  object-fit: ${t=>t.$objectFit||"contain"};
  border-radius: ${o.borderRadius.medium};
  ${t=>t.$objectFit==="cover"&&e`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  `}
`;i.img`
  position: absolute;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  opacity: 0.5;
  border-radius: ${o.borderRadius.medium};
`;i.video`
  max-width: 100%;
  max-height: 100%;
  border-radius: ${o.borderRadius.medium};
`;const so=i.div`
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
`,no=i.div`
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
`,co=i.div`
  position: relative;
  margin-bottom: ${o.spacing.sm};
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`,lo=i.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: ${o.borderRadius.medium};
`,po=i.video`
  max-width: 100%;
  max-height: 100%;
  border-radius: ${o.borderRadius.medium};
`;i.div`
  position: relative;
`;const go=i.div`
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
`,mo=i.div`
  ${g}
  background-color: ${t=>t.$type==="loading"?o.colors.overlayLight:"transparent"};
  z-index: ${t=>t.$type==="loading"?4:5};
  color: ${t=>t.$type==="loading"?o.colors.white:"inherit"};
  font-weight: ${t=>t.$type==="loading"?500:"inherit"};
  text-align: ${t=>t.$type==="loading"?"center":"inherit"};
  padding: ${t=>t.$type==="loading"?"0 10px":"0"};
  pointer-events: ${t=>t.$type==="watermark"?"none":"auto"};
  border-radius: ${o.borderRadius.medium}; // For overlays on containers/cards
`,$o=i.div`
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
`,xo=i.h3`
  font-size: ${o.fontSizes.lg};
  margin: 0 0 ${o.spacing.sm} 0;
`,ho=i.div`
  height: ${t=>t.$height||"8px"};
  background-color: ${o.colors.grayLight};
  border-radius: ${o.borderRadius.small};
  overflow: hidden;
  ${t=>t.$bottom&&`bottom: ${t.$bottom};`}
  ${t=>t.$left&&`left: ${t.$left};`}
  ${t=>t.$right&&`right: ${t.$right};`}
  ${t=>t.$bottom&&t.$left&&t.$right&&"position: absolute;"}
`,bo=i.div`
  height: 100%;
  background-color: ${t=>t.$status==="processing"?o.colors.warning:t.$status==="error"?o.colors.danger:t.$status==="complete"?o.colors.success:o.colors.info};
  border-radius: ${o.borderRadius.small};
  transition: width 0.3s ease;
  width: ${t=>(t.$progress||0)*100}%;
`,fo=i.div`
  font-size: ${o.fontSizes.sm};
  margin-bottom: ${o.spacing.sm};
`,uo=i.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${o.colors.overlay};
  z-index: ${t=>t.$zIndex||1e3};
  display: flex;
  justify-content: center;
  align-items: center;
`,wo=i.div`
  ${a}
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
`;i.div`
  background: ${o.colors.white};
  padding: 30px;
  border-radius: ${o.borderRadius.large};
  width: 90%;
  max-width: 400px;
  box-shadow: ${o.boxShadow.xl};
  ${t=>n(t.$isRTL)}
`;i.p`
  font-size: ${o.fontSizes.md};
  margin-bottom: ${o.spacing.sm};
`;i.p`
  font-size: ${o.fontSizes.sm};
  margin-bottom: ${o.spacing.md};
  color: ${o.colors.text.secondary};
`;const yo=i.input`
  width: 100%;
  padding: 10px;
  margin-bottom: ${o.spacing.sm};
  border-radius: ${o.borderRadius.small};
  border: 1px solid ${o.colors.border};
  font-size: ${o.fontSizes.md};
  text-align: ${t=>t.$isRTL?"right":"left"};
`;i.div`
  color: ${o.colors.danger};
  margin-bottom: ${o.spacing.sm};
  font-size: ${o.fontSizes.sm};
`;const vo=i.div`
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
`,zo=i.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 2000;
  display: flex;
  flex-direction: column;
`,ko=i.div`
  text-align: center;
  margin-top: ${o.spacing.md};
  font-size: 11px;
  color: ${o.colors.text.secondary};
`,So=i.div`
  position: absolute;
  top: ${o.spacing.sm};
  right: ${o.spacing.sm};
  z-index: 10;
  width: 24px;
  height: 24px;
  border-radius: ${o.borderRadius.circle};
  background-color: ${t=>t.$isSelected?o.colors.primary:"rgba(255, 255, 255, 0.8)"};
  border: ${t=>t.$isSelected?"none":`2px solid ${o.colors.primary}`};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${o.boxShadow.selection};
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`,Ro=i.div`
  color: ${o.colors.white};
  font-size: ${o.fontSizes.sm};
  font-weight: bold;
`,Lo=i.div`
  padding: ${o.spacing.sm} ${o.spacing.md};
  background-color: ${o.colors.background.highlight};
  border-radius: ${o.borderRadius.small};
  margin-bottom: ${o.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${o.boxShadow.md};
`,Bo=i.p`
  font-size: ${o.fontSizes.sm};
  margin-bottom: ${o.spacing.md};
  color: ${o.colors.text.primary};
`,Co=i.div`
  position: absolute;
  z-index: 2;
  bottom: ${o.spacing.sm};
  left: ${t=>t.$position==="bottomLeft"?o.spacing.sm:"auto"};
  right: ${t=>t.$position==="bottomRight"?o.spacing.sm:"auto"};
  background: ${t=>t.$light?"rgba(255,255,255,0.85)":o.colors.overlay};
  color: ${t=>t.$light?"inherit":o.colors.white};
  padding: ${t=>t.$light?"6px 12px":"4px 8px"};
  font-size: ${t=>t.$light?o.fontSizes.xs:o.fontSizes.sm};
  font-weight: 500;
  border-radius: ${t=>(t.$light,o.borderRadius.small)};
  
  ${r(`
    padding: ${t=>t.$light?"3px 6px":"2px 6px"};
    font-size: ${t=>t.$light?"10px":o.fontSizes.xs};
    bottom: ${t=>t.$light?"8px":o.spacing.sm};
    ${t=>t.$position==="bottomRight"&&t.$light&&`
      max-width: 45%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `}
  `)}
`,To=i.div`
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
  background-color: ${t=>{switch(t.$status){case"complete":return o.colors.success;case"error":return o.colors.danger;case"uploading":return o.colors.info;case"processing":return o.colors.warning;default:return o.colors.gray}}};
`,jo=i.div`
  margin-bottom: ${o.spacing.md};
`,Po=i.label`
  display: block;
  margin-bottom: ${o.spacing.sm};
  font-size: ${o.fontSizes.sm};
  font-weight: 500;
  color: ${o.colors.text.primary};
`,Io=i.input`
  ${d}
`,Ho=i.textarea`
  ${d}
  resize: vertical;
`;i.input`
  display: none;
`;const Ao=i.div`
  display: flex;
  align-items: center;
  margin-bottom: ${o.spacing.md};
  padding: 4px 0;
  gap: 15px;
`,Fo=i.div`
  font-size: ${o.fontSizes.sm};
  font-weight: 500;
  color: ${o.colors.text.primary};
  line-height: 24px;
`,Do=i.label`
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
`,Mo=i.span`
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
`,Eo=i.div`
  color: ${o.colors.white};
  font-size: ${o.fontSizes.xxl};
  font-weight: bold;
  transform: rotate(-30deg);
  opacity: 0.7;
  text-shadow: ${o.boxShadow.textShadow};
  user-select: none;
  white-space: nowrap;
`,Go=i.div`
  font-size: ${o.fontSizes.xs};
  color: ${o.colors.text.secondary};
  margin-bottom: 6px;
`,Wo=i.div`
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
`,No=i.a`
  margin: 0 ${o.spacing.sm};
  color: ${o.colors.text.secondary};
  text-decoration: ${t=>t.$isHovered?"underline":"none"};
`,Oo=i.div`
  text-align: center; 
  padding: 40px ${o.spacing.md};
  border-radius: ${o.borderRadius.medium};
  background-color: ${t=>t.$type==="error"?o.colors.background.error:o.colors.white};
  border: ${t=>t.$type==="error"?`1px solid ${o.colors.highlight.error}`:"none"};
  box-shadow: ${t=>t.$type==="empty"?o.boxShadow.md:"none"};
  margin-bottom: ${t=>t.$type==="error"?o.spacing.md:"0"};
  
  p {
    font-size: ${o.fontSizes.md};
    color: ${t=>t.$type==="error"?o.colors.danger:o.colors.text.secondary};
  }
`;i.div`
  margin-top: ${o.spacing.md};
  padding: ${o.spacing.md};
  background-color: ${o.colors.grayLighter};
  border-radius: ${o.borderRadius.medium};
`;i.h3`
  margin: 0 0 ${o.spacing.sm} 0;
  font-size: ${o.fontSizes.md};
`;i.pre`
  margin: 0;
  font-size: ${o.fontSizes.xs};
  white-space: pre-wrap;
  max-height: 200px;
  overflow-y: auto;
`;i.div`
  margin-bottom: ${o.spacing.xs};
  font-size: ${o.fontSizes.xs};
`;const Uo=i.a`
  font-size: ${o.fontSizes.xs};
  color: ${o.colors.text.secondary};
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${o.colors.text.primary};
  }
`,Vo=i.div`
  font-size: ${o.fontSizes.xs};
  color: ${o.colors.text.lighter};
  text-align: ${t=>(t.$isRTL,"right")};
  margin-bottom: ${o.spacing.md};
  display: flex;
  justify-content: flex-end;
`;export{to as $,f as A,l as B,J as C,uo as D,wo as E,Go as F,h as G,B as H,ko as I,ro as J,ao as K,P as L,Q as M,G as N,mo as O,io as P,go as Q,E as R,Bo as S,Ao as T,so as U,po as V,Eo as W,no as X,Co as Y,So as Z,Ro as _,I as a,X as a0,Y as a1,K as a2,A as a3,F as a4,D as a5,vo as a6,M as a7,S as a8,R as a9,L as aa,C as ab,T as ac,j as ad,b as ae,w as af,y as ag,m as ah,k as ai,z as aj,v as ak,u as al,yo as am,U as an,V as ao,q as ap,Oo as aq,Z as ar,oo as as,_ as at,Vo as au,H as b,Wo as c,No as d,eo as e,To as f,co as g,lo as h,ho as i,bo as j,xo as k,fo as l,jo as m,Po as n,Io as o,Ho as p,Fo as q,Do as r,Mo as s,N as t,W as u,Uo as v,Lo as w,zo as x,$o as y,O as z};
