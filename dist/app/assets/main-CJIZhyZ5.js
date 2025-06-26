import{d as i,u as b,r as s,j as e,t as u,R as z,I as M,c as T,a as j,g as y,G as I,A as E,H as P,L as R,b as p,B,e as A,f as x,h as C}from"./layout-D_Ibv38s.js";const W=i.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,O=i.span`
  font-size: 16px;
`,h=i.select`
  padding: ${n=>n.$isMobile?"8px 12px":"6px 10px"};
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: white;
  font-size: ${n=>n.$isMobile?"16px":"14px"}; /* Prevent zoom on iOS */
  cursor: pointer;
  min-width: ${n=>n.$isMobile?"120px":"100px"};
  
  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
  
  /* Touch-friendly styling for mobile */
  @media (max-width: 768px) {
    font-size: 16px; /* Prevent zoom on iOS */
    padding: 8px 12px;
    min-width: 120px;
  }
`,D=i(h)`
  border: none;
  background: transparent;
  padding: ${n=>n.$isMobile?"5px 8px":"3px 5px"};
`,F=i(h)`
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: ${n=>n.$isMobile?"8px 16px":"6px 12px"};
  font-weight: 500;
`,H=i.option`
  padding: 8px;
`,G=({className:n,label:t="🌐",variant:o="default",onChange:a})=>{const{language:c,setLanguage:l,languages:g,loading:m}=b(),[v,f]=s.useState(!1);s.useEffect(()=>{if(typeof window>"u")return;(()=>{const S=window.innerWidth<768,$=navigator.maxTouchPoints>0,k=/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);f(S||$||k)})();const d=()=>{f(window.innerWidth<768)};return window.addEventListener("resize",d),()=>{window.removeEventListener("resize",d)}},[]);const L=async r=>{const d=r.target.value;await l(d),a&&a(d)},w=o==="minimal"?D:o==="button"?F:h;return e.jsxs(W,{className:n,children:[e.jsx(O,{children:t}),e.jsx(w,{$isMobile:v,value:c,onChange:L,"aria-label":"Language",disabled:m,children:g.map(r=>e.jsx(H,{value:r.code,children:r.name},r.code))}),m&&e.jsx("span",{style:{fontSize:"12px",color:"#666"},children:"•"})]})},U=i.h1`
  font-size: ${u.fontSizes.xxl};
  margin: ${u.spacing.sm} 0;
`,_=i.div`
  display: flex;
  align-items: center;
  flex-direction: ${n=>n.$isRTL?"row":"row-reverse"};
  gap: ${u.spacing.sm};  
`,N=()=>{const{t:n,language:t}=b(),o=y(t)==="rtl";s.useEffect(()=>{document.documentElement.lang=t,document.documentElement.dir=y(t)},[t]);const a=async()=>{const c=`my-albums.html?lang=${t}`;await C(c)&&j(c)};return e.jsxs(e.Fragment,{children:[e.jsx(I,{}),e.jsx(E,{$isRTL:o,children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"space-between",height:"calc(100vh - 60px)"},children:[e.jsx(P,{children:e.jsx(_,{$isRTL:o,children:e.jsx(R,{src:p("images/logo_no_background.png"),alt:"6180 Logo"})})}),e.jsxs("div",{style:{textAlign:"center",maxWidth:"600px",margin:"0 auto",padding:"0 20px"},children:[e.jsx(U,{children:n("Best Way to Save and Share Photos")}),e.jsx("p",{style:{fontSize:"1.1em",color:"#666",marginBottom:"30px",lineHeight:"1.6"},children:n("Tag, revisit and send your favorite moments — by occasion, mood, or location — in seconds.")}),e.jsx(B,{$primary:!0,onClick:a,className:"hover-button",style:{marginTop:"20px",padding:"12px 20px"},children:n("Use 6180")})]}),e.jsxs(A,{children:[e.jsxs("div",{style:{marginBottom:"12px"},children:[e.jsx(x,{href:p("terms.html"),children:n("Terms of Service")}),e.jsx(x,{href:p("privacy.html"),children:n("Privacy Policy")}),e.jsx(x,{href:p("support.html"),children:n("Support")})]}),e.jsx("div",{style:{display:"flex",justifyContent:"center",opacity:.7,fontSize:"0.85em"},children:e.jsx(G,{})})]})]})})]})},q=()=>{const[n,t]=s.useState("en"),[o,a]=s.useState(!1);return s.useEffect(()=>{(async()=>{const l=localStorage.getItem("preferred-language")||localStorage.getItem("user_language")||"en";t(l);try{if(await T()){j(`my-albums.html?lang=${l}`);return}}catch(g){console.warn("Login check failed:",g)}a(!0)})()},[]),s.useEffect(()=>{},[]),o?e.jsx(M,{initialLanguage:n,preloadLanguages:["en"],children:e.jsx(N,{})}):e.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",fontFamily:"system-ui, -apple-system, sans-serif"},children:"Loading..."})};typeof window<"u"&&z.createRoot(document.getElementById("root")).render(e.jsx(q,{}));
