import{d as r,u as y,r as o,j as e,R as M,I as $,c as z,a as b,g as f,b as p,e as T}from"./utils-2qV3otm0.js";import{G as I,A as E,H as P,L as B,a as R,b as A,B as C,c as W,d as x}from"./styled-components-UVQg2Kys.js";const O=r.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,D=r.span`
  font-size: 16px;
`,u=r.select`
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
`,F=r(u)`
  border: none;
  background: transparent;
  padding: ${n=>n.$isMobile?"5px 8px":"3px 5px"};
`,H=r(u)`
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: ${n=>n.$isMobile?"8px 16px":"6px 12px"};
  font-weight: 500;
`,G=r.option`
  padding: 8px;
`,U=({className:n,label:t="🌐",variant:i="default",onChange:s})=>{const{language:c,setLanguage:l,languages:g,loading:h}=y(),[j,m]=o.useState(!1);o.useEffect(()=>{if(typeof window>"u")return;(()=>{const w=window.innerWidth<768,S=navigator.maxTouchPoints>0,k=/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);m(w||S||k)})();const d=()=>{m(window.innerWidth<768)};return window.addEventListener("resize",d),()=>{window.removeEventListener("resize",d)}},[]);const L=async a=>{const d=a.target.value;await l(d),s&&s(d)},v=i==="minimal"?F:i==="button"?H:u;return e.jsxs(O,{className:n,children:[e.jsx(D,{children:t}),e.jsx(v,{$isMobile:j,value:c,onChange:L,"aria-label":"Language",disabled:h,children:g.map(a=>e.jsx(G,{value:a.code,children:a.name},a.code))}),h&&e.jsx("span",{style:{fontSize:"12px",color:"#666"},children:"•"})]})},_=()=>{const{t:n,language:t}=y(),i=f(t)==="rtl";o.useEffect(()=>{document.documentElement.lang=t,document.documentElement.dir=f(t)},[t]);const s=async()=>{const c=`my-albums.html?lang=${t}`;await T(c)&&b(c)};return e.jsxs(e.Fragment,{children:[e.jsx(I,{}),e.jsx(E,{$isRTL:i,children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"space-between",height:"calc(100vh - 60px)"},children:[e.jsx(P,{children:e.jsx(B,{$isRTL:i,children:e.jsx(R,{src:p("images/logo_no_background.png"),alt:"6180 Logo"})})}),e.jsxs("div",{style:{textAlign:"center",maxWidth:"600px",margin:"0 auto",padding:"0 20px"},children:[e.jsx(A,{children:n("Best Way to Save and Share Photos")}),e.jsx("p",{style:{fontSize:"1.1em",color:"#666",marginBottom:"30px",lineHeight:"1.6"},children:n("Tag, revisit and send your favorite moments — by occasion, mood, or location — in seconds.")}),e.jsx(C,{$primary:!0,onClick:s,className:"hover-button",style:{marginTop:"20px",padding:"12px 20px"},children:n("Use 6180")})]}),e.jsxs(W,{children:[e.jsxs("div",{style:{marginBottom:"12px"},children:[e.jsx(x,{href:p("terms.html"),children:n("Terms of Service")}),e.jsx(x,{href:p("privacy.html"),children:n("Privacy Policy")}),e.jsx(x,{href:p("support.html"),children:n("Support")})]}),e.jsx("div",{style:{display:"flex",justifyContent:"center",opacity:.7,fontSize:"0.85em"},children:e.jsx(U,{})})]})]})})]})},N=()=>{const[n,t]=o.useState("en"),[i,s]=o.useState(!1);return o.useEffect(()=>{(async()=>{const l=localStorage.getItem("preferred-language")||localStorage.getItem("user_language")||"en";t(l);try{if(await z()){b(`my-albums.html?lang=${l}`);return}}catch(g){console.warn("Login check failed:",g)}s(!0)})()},[]),o.useEffect(()=>{},[]),i?e.jsx($,{initialLanguage:n,preloadLanguages:["en"],children:e.jsx(_,{})}):e.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",fontFamily:"system-ui, -apple-system, sans-serif"},children:"Loading..."})};typeof window<"u"&&M.createRoot(document.getElementById("root")).render(e.jsx(N,{}));
