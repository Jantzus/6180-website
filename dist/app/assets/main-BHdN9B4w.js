import{d as a,u as w,r as i,j as e,t as y,R as T,I as k,c as z,a as S,g as b,G as A,A as P,H as E,L as I,b as x,B as R,e as B,f as m,h as D}from"./buttons-CJB49aeq.js";const C=a.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,O=a.span`
  font-size: 16px;
`,f=a.select`
  padding: ${t=>t.$isMobile?"8px 12px":"6px 10px"};
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: white;
  font-size: ${t=>t.$isMobile?"16px":"14px"}; /* Prevent zoom on iOS */
  cursor: pointer;
  min-width: ${t=>t.$isMobile?"120px":"100px"};
  
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
`,W=a(f)`
  border: none;
  background: transparent;
  padding: ${t=>t.$isMobile?"5px 8px":"3px 5px"};
`,q=a(f)`
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: ${t=>t.$isMobile?"8px 16px":"6px 12px"};
  font-weight: 500;
`,F=a.option`
  padding: 8px;
`,N=({className:t,label:n="🌐",variant:r="default",onChange:c})=>{const{language:l,setLanguage:o,languages:s,loading:p}=w(),[u,g]=i.useState(!1);i.useEffect(()=>{if(typeof window>"u")return;(()=>{const L=window.innerWidth<768,$=navigator.maxTouchPoints>0,M=/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);g(L||$||M)})();const h=()=>{g(window.innerWidth<768)};return window.addEventListener("resize",h),()=>{window.removeEventListener("resize",h)}},[]);const j=async d=>{const h=d.target.value;await o(h),c&&c(h)},v=r==="minimal"?W:r==="button"?q:f;return e.jsxs(C,{className:t,children:[e.jsx(O,{children:n}),e.jsx(v,{$isMobile:u,value:l,onChange:j,"aria-label":"Language",disabled:p,children:s.map(d=>e.jsx(F,{value:d.code,children:d.name},d.code))}),p&&e.jsx("span",{style:{fontSize:"12px",color:"#666"},children:"•"})]})},H=a.h1`
  font-size: ${y.fontSizes.xxl};
  margin: ${y.spacing.sm} 0;
`,G=()=>{const{t,language:n}=w(),r=b(n)==="rtl";i.useEffect(()=>{document.documentElement.lang=n,document.documentElement.dir=b(n)},[n]),i.useEffect(()=>{(()=>{document.title=`${t("Save and Share Photos")} - 6180`;const o=document.querySelector('meta[name="description"]');o&&o.setAttribute("content",t("Nothing to download. Done in seconds. Save and share photos effortlessly with 6180."));const s=document.querySelector('meta[property="og:title"]');s&&s.setAttribute("content",`${t("Save and Share Photos")} - 6180`);const p=document.querySelector('meta[property="og:description"]');p&&p.setAttribute("content",t("Nothing to download. Done in seconds. Save and share photos effortlessly with 6180."));const u=document.querySelector('meta[name="twitter:title"]');u&&u.setAttribute("content",`${t("Save and Share Photos")} - 6180`);const g=document.querySelector('meta[name="twitter:description"]');g&&g.setAttribute("content",t("Nothing to download. Done in seconds. Save and share photos effortlessly with 6180."))})()},[t,n]);const c=async()=>{const l=`my-albums.html?lang=${n}`;await D(l)&&S(l)};return e.jsxs(e.Fragment,{children:[e.jsx(A,{}),e.jsx(P,{$isRTL:r,children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"space-between",height:"calc(100vh - 60px)"},children:[e.jsx(E,{}),e.jsxs("div",{style:{textAlign:"center",maxWidth:"600px",margin:"0 auto",padding:"0 20px"},children:[e.jsx(H,{children:t("Save and Share Photos")}),e.jsx("div",{style:{marginTop:"50px",marginBottom:"30px",display:"flex",justifyContent:"center"},children:e.jsx("div",{style:{background:"white",borderRadius:"24px",padding:"16px",boxShadow:"0 12px 40px rgba(0, 0, 0, 0.08), 0 0 20px rgba(102, 126, 234, 0.1)",border:"1px solid rgba(255, 255, 255, 0.8)"},children:e.jsx(I,{src:x("images/homepage-graphic.jpg"),alt:"6180 - Two bears sharing photos",style:{width:"280px",height:"173px",borderRadius:"16px",objectFit:"contain"}})})}),e.jsx("p",{style:{fontSize:"0.85em",color:"#666",marginBottom:"30px",lineHeight:"1.6",textAlign:"center",fontStyle:"italic"},children:t("Nothing to download. Done in seconds.")}),e.jsx(R,{$primary:!0,onClick:c,className:"hover-button",style:{marginTop:"20px",padding:"12px 20px"},children:t("Use 6180")})]}),e.jsxs(B,{children:[e.jsxs("div",{style:{marginBottom:"12px"},children:[e.jsx(m,{href:x("terms.html"),children:t("Terms of Service")}),e.jsx(m,{href:x("privacy.html"),children:t("Privacy Policy")}),e.jsx(m,{href:x("support.html"),children:t("Support")})]}),e.jsx("div",{style:{display:"flex",justifyContent:"center",opacity:.7,fontSize:"0.85em"},children:e.jsx(N,{})})]})]})})]})},U=()=>{const[t,n]=i.useState("en"),[r,c]=i.useState(!1);return i.useEffect(()=>{(async()=>{const o=localStorage.getItem("preferred-language")||localStorage.getItem("user_language")||"en";n(o);try{if(await z()){S(`my-albums.html?lang=${o}`);return}}catch(s){console.warn("Login check failed:",s)}c(!0)})()},[]),i.useEffect(()=>{},[]),r?e.jsx(k,{initialLanguage:t,preloadLanguages:["en"],children:e.jsx(G,{})}):e.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",fontFamily:"system-ui, -apple-system, sans-serif"},children:"Loading..."})};typeof window<"u"&&T.createRoot(document.getElementById("root")).render(e.jsx(U,{}));
