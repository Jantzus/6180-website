import{d as o,u as m,j as e,c as b,r as h,R as L,I as v,a as S,g as u,b as c,e as k}from"./utils-DJV_2HXH.js";import{G as T,A as R,H as w,L as B,a as C,b as I,B as E,c as P,d as l}from"./styled-components-Blakvb3E.js";const z=o.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,$=o.span`
  font-size: 16px;
`,d=o.select`
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: white;
  font-size: 14px;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`,A=o(d)`
  border: none;
  background: transparent;
  padding: 3px 5px;
  min-width: 100px;
`,H=o(d)`
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 6px 12px;
  font-weight: 500;
`,W=o.option`
  padding: 8px;
`,D=({className:n,label:t="🌐",variant:a="default",onChange:r})=>{const{language:i,setLanguage:g,languages:f,loading:p}=m(),j=async s=>{const x=s.target.value;await g(x),r&&r(x)},y=a==="minimal"?A:a==="button"?H:d;return e.jsxs(z,{className:n,children:[e.jsx($,{children:t}),e.jsx(y,{value:i,onChange:j,"aria-label":"Language",disabled:p,children:f.map(s=>e.jsx(W,{value:s.code,children:s.name},s.code))}),p&&e.jsx("span",{style:{fontSize:"12px",color:"#666"},children:"•"})]})},F=()=>{const{t:n,language:t}=m(),a=u(t)==="rtl";S.useEffect(()=>{document.documentElement.lang=t,document.documentElement.dir=u(t)},[t]);const r=async()=>{const i=`my-albums.html?lang=${t}`;await k(i)&&h(i)};return e.jsxs(e.Fragment,{children:[e.jsx(T,{}),e.jsx(R,{$isRTL:a,children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"space-between",height:"calc(100vh - 60px)"},children:[e.jsx(w,{children:e.jsx(B,{$isRTL:a,children:e.jsx(C,{src:c("images/logo_no_background.png"),alt:"6180 Logo"})})}),e.jsxs("div",{style:{textAlign:"center",maxWidth:"600px",margin:"0 auto",padding:"0 20px"},children:[e.jsx(I,{children:n("Best Way to Save and Share Photos")}),e.jsx("p",{style:{fontSize:"1.1em",color:"#666",marginBottom:"30px",lineHeight:"1.6"},children:n("Tag, revisit and send your favorite moments — by occasion, mood, or location — in seconds.")}),e.jsx(E,{$primary:!0,onClick:r,className:"hover-button",style:{marginTop:"20px",padding:"12px 20px"},children:n("Use 6180")})]}),e.jsxs(P,{children:[e.jsxs("div",{style:{marginBottom:"12px"},children:[e.jsx(l,{href:c("terms.html"),children:n("Terms of Service")}),e.jsx(l,{href:c("privacy.html"),children:n("Privacy Policy")}),e.jsx(l,{href:c("support.html"),children:n("Support")})]}),e.jsx("div",{style:{display:"flex",justifyContent:"center",opacity:.7,fontSize:"0.85em"},children:e.jsx(D,{})})]})]})})]})};(async function(){const n=localStorage.getItem("preferred-language")||localStorage.getItem("user_language")||"en";if(await b()){h(`my-albums.html?lang=${n}`);return}L.createRoot(document.getElementById("root")).render(e.jsx(v,{initialLanguage:n,preloadLanguages:["en"],children:e.jsx(F,{})}))})();
