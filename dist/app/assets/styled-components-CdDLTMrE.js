import{aD as g,aE as e,d as t}from"./utils-BHKWecq1.js";const o={colors:{primary:"#007bff",primaryDark:"#0056b3",success:"#4caf50",danger:"#e53935",warning:"#ff9800",info:"#2196f3",gray:"#8c8c8c",grayLight:"#e0e0e0",grayLighter:"#f0f0f0",white:"#fff",black:"#000",overlay:"rgba(0, 0, 0, 0.7)",overlayLight:"rgba(0, 0, 0, 0.5)",border:"#ddd",borderLight:"#eaeaea",text:{primary:"#333",secondary:"#666",light:"#777",lighter:"#999",white:"#fff"},background:{primary:"#f9fafb",card:"#fff",highlight:"#f0f7ff",error:"#fdeded"},highlight:{border:"#cce0ff",error:"#f7d0d0"}},spacing:{xs:"4px",sm:"8px",md:"16px",xl:"32px"},borderRadius:{small:"4px",medium:"8px",large:"16px",circle:"50%"},fontSizes:{xs:"12px",sm:"14px",md:"16px",lg:"18px",xxl:"24px"},boxShadow:{sm:"0 1px 2px rgba(0,0,0,0.06)",md:"0 1px 3px rgba(0,0,0,0.1)",xl:"0 8px 24px rgba(0,0,0,0.2)",primaryBtn:"0 4px 12px rgba(0, 123, 255, 0.2)",selection:"0 2px 4px rgba(0, 0, 0, 0.2)",textShadow:"0 0 5px rgba(0, 0, 0, 0.8)"},breakpoints:{mobile:"767px"}},h=g`
  @keyframes loadingAnimation {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  
  * {
    box-sizing: border-box;
    -webkit-text-size-adjust: 100%;
  }
  
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }

  body {
    font-family: 'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  }

  #root {
    width: 100%;
    overflow-x: hidden;
  }  
`,n=i=>e`
  direction: ${i?"rtl":"ltr"};
`,r=i=>e`
  @media (max-width: ${o.breakpoints.mobile}) {
    ${i}
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
  cursor: ${i=>i.disabled||i.isDisabled?"not-allowed":"pointer"};
  opacity: ${i=>i.disabled||i.isDisabled?.6:1};
  transition: all 0.2s ease;
  border-radius: ${o.borderRadius.medium};
`,p=e`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`,b=t.div`
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
`,f=t.div`
  padding: ${o.spacing.md};
  background-color: ${o.colors.background.primary};
  min-height: 100vh;
  max-width: 100vw;
  ${i=>n(i.isRTL)}
`,u=t.div`
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
`;const w=t.div`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid ${o.colors.borderLight};
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(8px);
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
`,S=t.div`
  display: flex;
  align-items: center;
  flex-direction: ${i=>i.isRTL?"row-reverse":"row"};
  gap: ${o.spacing.sm};
  margin: 0;
`,k=t.div`
  position: sticky;
  top: 0;
  background: ${o.colors.white};
  box-shadow: ${o.boxShadow.sm};
  z-index: 10;
  margin-bottom: ${o.spacing.sm};
  width: 100%;
`,L=t.div`
  display: flex;
  flex-direction: column;
  padding: ${o.spacing.md};
  
  ${r(`
    padding: ${o.spacing.md};
  `)}
`,R=t.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${o.spacing.sm};
  margin-bottom: ${o.spacing.xs};
  gap: ${o.spacing.sm};
  flex-wrap: wrap;
  
  ${i=>i.fullWidth&&e`
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
`,C=t.div`
  display: flex;
  align-items: center;
  margin-top: ${o.spacing.sm};
`,T=t.label`
  margin-right: ${o.spacing.sm};
  font-size: ${o.fontSizes.sm};
  color: ${o.colors.text.secondary};
  font-weight: normal;
`,j=t.select`
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
  flex-direction: ${i=>i.isRTL?"row-reverse":"row"};
  gap: ${o.spacing.sm};  
`,P=t.img`
  height: 32px;
`,H=t.h1`
  font-size: ${o.fontSizes.xxl};
`,l=t.button`
  ${c}
  background-color: ${i=>i.primary?i.isHovered?o.colors.primaryDark:o.colors.primary:i.passwordSet?o.colors.black:"transparent"};
  color: ${i=>i.primary?o.colors.text.white:i.passwordSet?o.colors.white:o.colors.primary};
  font-weight: ${i=>i.primary?"500":"normal"};
  padding: 12px 20px;
  font-size: ${o.fontSizes.md};
  border: ${i=>i.primary?"none":`1px solid ${o.colors.primary}`};
  border-radius: ${o.borderRadius.medium};
  min-width: 140px; /* Changed from fixed width to min-width */
  width: auto; /* Allow the button to grow based on content */
  white-space: nowrap; /* Prevent text wrapping */
  text-align: center;
  margin-left: auto; /* Align to trailing side */
  box-shadow: ${i=>i.primary?o.boxShadow.primaryBtn:"none"};
  
  &:hover {
    background-color: ${i=>i.primary?o.colors.primaryDark:i.passwordSet?"#333333":o.colors.grayLighter};
  }
`,F=t(l)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 8px;
  width: auto;
`,A=t.span`
  width: 18px;
  height: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: ${o.spacing.sm};
`,D=t.span`
  height: 2px;
  background: ${o.colors.primary};
  width: 100%;
`,M=t(l)`
  width: 100%;
  text-align: left;
  padding: ${o.spacing.sm} ${o.spacing.md};
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
`,G=t.button`
  ${c}
  background-color: ${o.colors.danger};
  color: ${o.colors.text.white};
  border: none;
  border-radius: ${o.borderRadius.small};
  padding: 6px ${o.spacing.sm};
  font-size: ${o.fontSizes.xs};
  margin-top: auto;
`,W=t.div`
  display: flex;
  gap: ${o.spacing.sm};
`,E=t.div`
  display: flex;
  flex-direction: column;
  gap: ${o.spacing.sm};
  margin-bottom: ${o.spacing.md};
`,V=t.a`
  font-size: ${o.fontSizes.sm};
  color: ${o.colors.primary};
  text-decoration: none;
  font-weight: 500;
`;t.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;t.div`
  font-size: ${o.fontSizes.md};
  color: ${o.colors.text.secondary};
`;const N=t.a`
  text-decoration: none;
  color: ${o.colors.text.white};
  background-color: ${o.colors.primary};
  padding: ${o.spacing.sm} ${o.spacing.md};
  border-radius: ${o.borderRadius.small};
  font-size: ${o.fontSizes.sm};
  display: flex;
  align-items: center;
  gap: 6px;
`,O=t.div`
  margin-bottom: ${o.spacing.md};
  text-align: center;
  direction: ${i=>i.isRTL?"rtl":"ltr"};
`,U=t.div`
  display: flex;
  align-items: center;
  justify-content: ${i=>i.isRTL?"flex-start":"flex-end"};
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
`,X=t.h2`
  font-weight: 400;
  margin: 0 0 ${o.spacing.md} 0;
  font-size: ${o.fontSizes.xxl};
  padding: 0;
  
  ${r(`
    padding: 0;
  `)}
`,Y=t.strong`
  font-weight: 700;
`,J=t.div`
  ${a}
  padding: ${i=>i.padding||o.spacing.md};
  margin-bottom: ${i=>i.marginBottom||o.spacing.md};
  width: 100%;
`,K=t.p`
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
  color: ${i=>{switch(i.type){case"error":return o.colors.danger;case"loading":return o.colors.text.secondary;default:return o.colors.text.primary}}};
`,Z=t.div`
  margin-top: ${o.spacing.sm};
  margin-bottom: ${o.spacing.md};
  font-size: ${o.fontSizes.xs};
  color: ${o.colors.text.secondary};
  line-height: 1.5;
  text-align: ${i=>i.isRTL?"right":"left"};
  white-space: pre-wrap;
`,_=t.div`
  font-size: ${o.fontSizes.xs};
  color: ${o.colors.text.light};
  text-align: ${i=>i.isRTL?"right":"left"};
  margin-top: ${o.spacing.xs};
`,oo=t.div`
  display: flex;
  align-items: center;
  font-size: ${o.fontSizes.xs};
  color: ${o.colors.text.secondary};
`,io=t.div`
  display: grid;
  grid-gap: ${o.spacing.md};
  width: 100%;
  min-height: 0;
  
  ${i=>{switch(i.columns){case"1":return e`grid-template-columns: repeat(1, 1fr);`;case"2":return e`grid-template-columns: repeat(2, 1fr);`;case"3":return e`grid-template-columns: repeat(3, 1fr);`;case"4":return e`grid-template-columns: repeat(4, 1fr);`;case"5":return e`grid-template-columns: repeat(5, 1fr);`;default:return e`grid-template-columns: repeat(1, 1fr);`}}}
  
  @media (max-width: ${o.breakpoints.mobile}) {
    grid-gap: ${o.spacing.sm};
    ${i=>{const s=parseInt(i.columns);return s>3?e`grid-template-columns: repeat(3, minmax(0, 1fr));`:s>1?e`grid-template-columns: repeat(${s}, minmax(0, 1fr));`:e`grid-template-columns: repeat(1, minmax(0, 1fr));`}}
  }
`,x=e`
  ${a}
  transition: transform 0.2s;
  position: relative;
  height: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  margin-bottom: ${o.spacing.md};
  
  ${i=>i.isHovered&&e`
    transform: translateY(-2px);
  `}
  
  ${r(`
    margin-bottom: ${o.spacing.sm};
  `)}
`;t.div`
  ${x}
  ${i=>i.isVideo&&e`
    cursor: pointer;
  `}
  ${i=>i.isSelected&&e`
    border: 3px solid ${o.colors.primary};
    box-shadow: 0 0 0 3px rgba(0, 106, 220, 0.3);
  `}
`;const to=t.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${o.spacing.md};
  margin-bottom: ${o.spacing.xl};
`,eo=t.div`
  ${a}
  display: flex;
  flex-direction: column;
  padding: ${o.spacing.sm};
  width: 160px;
  position: relative;
`,ro=t.div`
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
`,ao=t.img`
  opacity: ${i=>i.isLoaded?1:0};
  transition: opacity 0.3s;
  max-width: 100%;
  max-height: 100%;
  object-fit: ${i=>i.objectFit||"contain"};
  border-radius: ${o.borderRadius.medium};
  ${i=>i.objectFit==="cover"&&e`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  `}
`,so=t.img`
  position: absolute;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  opacity: 0.5;
  border-radius: ${o.borderRadius.medium};
`,no=t.video`
  max-width: 100%;
  max-height: 100%;
  border-radius: ${o.borderRadius.medium};
`,co=t.div`
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
`,lo=t.div`
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
`,mo=t.video`
  max-width: 100%;
  max-height: 100%;
  border-radius: ${o.borderRadius.medium};
`,xo=t.div`
  position: relative;
`,$o=t.div`
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
  ${p}
  background-color: ${i=>i.type==="loading"?o.colors.overlayLight:"transparent"};
  z-index: ${i=>i.type==="loading"?4:5};
  color: ${i=>i.type==="loading"?o.colors.white:"inherit"};
  font-weight: ${i=>i.type==="loading"?500:"inherit"};
  text-align: ${i=>i.type==="loading"?"center":"inherit"};
  padding: ${i=>i.type==="loading"?"0 10px":"0"};
  pointer-events: ${i=>i.type==="watermark"?"none":"auto"};
  border-radius: ${o.borderRadius.medium}; // For overlays on containers/cards
`,bo=t.div`
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
`,fo=t.h3`
  font-size: ${o.fontSizes.lg};
  margin: 0 0 ${o.spacing.sm} 0;
`,uo=t.div`
  height: ${i=>i.height||"8px"};
  background-color: ${o.colors.grayLight};
  border-radius: ${o.borderRadius.small};
  overflow: hidden;
  ${i=>i.bottom&&`bottom: ${i.bottom};`}
  ${i=>i.left&&`left: ${i.left};`}
  ${i=>i.right&&`right: ${i.right};`}
  ${i=>i.bottom&&i.left&&i.right&&"position: absolute;"}
`,wo=t.div`
  height: 100%;
  background-color: ${i=>i.status==="processing"?o.colors.warning:i.status==="error"?o.colors.danger:i.status==="complete"?o.colors.success:o.colors.info};
  border-radius: ${o.borderRadius.small};
  transition: width 0.3s ease;
  width: ${i=>(i.progress||0)*100}%;
`,yo=t.div`
  font-size: ${o.fontSizes.sm};
  margin-bottom: ${o.spacing.sm};
`,vo=t.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${o.colors.overlay};
  z-index: ${i=>i.zIndex||1e3};
  display: flex;
  justify-content: center;
  align-items: center;
`,zo=t.div`
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
`;t.div`
  background: ${o.colors.white};
  padding: 30px;
  border-radius: ${o.borderRadius.large};
  width: 90%;
  max-width: 400px;
  box-shadow: ${o.boxShadow.xl};
  ${i=>n(i.isRTL)}
`;t.p`
  font-size: ${o.fontSizes.md};
  margin-bottom: ${o.spacing.sm};
`;t.p`
  font-size: ${o.fontSizes.sm};
  margin-bottom: ${o.spacing.md};
  color: ${o.colors.text.secondary};
`;const So=t.input`
  width: 100%;
  padding: 10px;
  margin-bottom: ${o.spacing.sm};
  border-radius: ${o.borderRadius.small};
  border: 1px solid ${o.colors.border};
  font-size: ${o.fontSizes.md};
  text-align: ${i=>i.isRTL?"right":"left"};
`;t.div`
  color: ${o.colors.danger};
  margin-bottom: ${o.spacing.sm};
  font-size: ${o.fontSizes.sm};
`;const ko=t.div`
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
  gap: ${o.spacing.sm};
  min-width: 180px;
  margin-top: ${o.spacing.xs};
`,Lo=t.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 2000;
  display: flex;
  flex-direction: column;
`,Ro=t.div`
  text-align: center;
  margin-top: ${o.spacing.md};
  font-size: 11px;
  color: ${o.colors.text.secondary};
`,Bo=t.div`
  position: absolute;
  top: ${o.spacing.sm};
  right: ${o.spacing.sm};
  z-index: 10;
  width: 24px;
  height: 24px;
  border-radius: ${o.borderRadius.circle};
  background-color: ${i=>i.isSelected?o.colors.primary:"rgba(255, 255, 255, 0.8)"};
  border: ${i=>i.isSelected?"none":`2px solid ${o.colors.primary}`};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${o.boxShadow.selection};
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`,Co=t.div`
  color: ${o.colors.white};
  font-size: ${o.fontSizes.sm};
  font-weight: bold;
`,To=t.div`
  padding: ${o.spacing.sm} ${o.spacing.md};
  background-color: ${o.colors.background.highlight};
  border-radius: ${o.borderRadius.small};
  margin-bottom: ${o.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${o.boxShadow.md};
`,jo=t.p`
  font-size: ${o.fontSizes.sm};
  margin-bottom: ${o.spacing.md};
  color: ${o.colors.text.primary};
`,Io=t.div`
  position: absolute;
  z-index: 2;
  bottom: ${o.spacing.sm};
  left: ${i=>i.position==="bottomLeft"?o.spacing.sm:"auto"};
  right: ${i=>i.position==="bottomRight"?o.spacing.sm:"auto"};
  background: ${i=>i.light?"rgba(255,255,255,0.85)":o.colors.overlay};
  color: ${i=>i.light?"inherit":o.colors.white};
  padding: ${i=>i.light?"6px 12px":"4px 8px"};
  font-size: ${i=>i.light?o.fontSizes.xs:o.fontSizes.sm};
  font-weight: 500;
  border-radius: ${i=>(i.light,o.borderRadius.small)};
  
  ${r(`
    padding: ${i=>i.light?"3px 6px":"2px 6px"};
    font-size: ${i=>i.light?"10px":o.fontSizes.xs};
    bottom: ${i=>i.light?"8px":o.spacing.sm};
    ${i=>i.position==="bottomRight"&&i.light&&`
      max-width: 45%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `}
  `)}
`,Po=t.div`
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
  background-color: ${i=>{switch(i.status){case"complete":return o.colors.success;case"error":return o.colors.danger;case"uploading":return o.colors.info;case"processing":return o.colors.warning;default:return o.colors.gray}}};
`,Ho=t.div`
  margin-bottom: ${o.spacing.md};
`,Fo=t.label`
  display: block;
  margin-bottom: ${o.spacing.sm};
  font-size: ${o.fontSizes.sm};
  font-weight: 500;
  color: ${o.colors.text.primary};
`,Ao=t.input`
  ${d}
`,Do=t.textarea`
  ${d}
  resize: vertical;
`;t.input`
  display: none;
`;const Mo=t.div`
  display: flex;
  align-items: center;
  margin-bottom: ${o.spacing.md};
  padding: 4px 0;
  gap: 15px;
`,Go=t.div`
  font-size: ${o.fontSizes.sm};
  font-weight: 500;
  color: ${o.colors.text.primary};
  line-height: 24px;
`,Wo=t.label`
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
`,Eo=t.span`
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
`,Vo=t.div`
  color: ${o.colors.white};
  font-size: ${o.fontSizes.xxl};
  font-weight: bold;
  transform: rotate(-30deg);
  opacity: 0.7;
  text-shadow: ${o.boxShadow.textShadow};
  user-select: none;
  white-space: nowrap;
`,No=t.div`
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
  text-decoration: ${i=>i.isHovered?"underline":"none"};
`,qo=t.div`
  text-align: center; 
  padding: 40px ${o.spacing.md};
  border-radius: ${o.borderRadius.medium};
  background-color: ${i=>i.type==="error"?o.colors.background.error:o.colors.white};
  border: ${i=>i.type==="error"?`1px solid ${o.colors.highlight.error}`:"none"};
  box-shadow: ${i=>i.type==="empty"?o.boxShadow.md:"none"};
  margin-bottom: ${i=>i.type==="error"?o.spacing.md:"0"};
  
  p {
    font-size: ${o.fontSizes.md};
    color: ${i=>i.type==="error"?o.colors.danger:o.colors.text.secondary};
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
`;const Xo=t.a`
  font-size: ${o.fontSizes.xs};
  color: ${o.colors.text.secondary};
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${o.colors.text.primary};
  }
`,Yo=t.div`
  font-size: ${o.fontSizes.xs};
  color: ${o.colors.text.lighter};
  text-align: ${i=>(i.isRTL,"right")};
  margin-bottom: ${o.spacing.md};
  display: flex;
  justify-content: flex-end;
`;export{Io as $,f as A,l as B,J as C,no as D,bo as E,No as F,h as G,B as H,ao as I,N as J,vo as K,I as L,Q as M,W as N,ho as O,to as P,zo as Q,G as R,jo as S,Mo as T,Ro as U,mo as V,Vo as W,ro as X,$o as Y,co as Z,lo as _,P as a,Bo as a0,Co as a1,io as a2,X as a3,Y as a4,K as a5,F as a6,A as a7,D as a8,ko as a9,M as aa,k as ab,L as ac,R as ad,C as ae,T as af,j as ag,b as ah,w as ai,y as aj,m as ak,S as al,z as am,v as an,u as ao,So as ap,O as aq,U as ar,q as as,qo as at,Z as au,oo as av,_ as aw,Yo as ax,H as b,Oo as c,Uo as d,eo as e,Po as f,go as g,po as h,uo as i,wo as j,fo as k,yo as l,Ho as m,Fo as n,Ao as o,Do as p,Go as q,Wo as r,Eo as s,V as t,E as u,Xo as v,To as w,Lo as x,xo as y,so as z};
