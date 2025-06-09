import{d as o,u as h,j as e,c as y,r as m,R as L,I as S,a as k,g as u,b as c,e as v}from"./utils-enBZsXYW.js";import{G as T,A as C,H as R,L as w,a as B,b as I,B as E,c as z,d as l}from"./styled-components-DvRwd5hZ.js";const A=o.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,P=o.span`
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
`,$=o(d)`
  border: none;
  background: transparent;
  padding: 3px 5px;
  min-width: 100px;
`,D=o(d)`
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 6px 12px;
  font-weight: 500;
`,F=o.option`
  padding: 8px;
`,G=({className:n,label:t="🌐",variant:a="default",onChange:r})=>{const{language:i,setLanguage:g,languages:f,loading:x}=h(),j=async s=>{const p=s.target.value;await g(p),r&&r(p)},b=a==="minimal"?$:a==="button"?D:d;return e.jsxs(A,{className:n,children:[e.jsx(P,{children:t}),e.jsx(b,{value:i,onChange:j,"aria-label":"Language",disabled:x,children:f.map(s=>e.jsx(F,{value:s.code,children:s.name},s.code))}),x&&e.jsx("span",{style:{fontSize:"12px",color:"#666"},children:"•"})]})},H=()=>{const{t:n,language:t}=h(),a=u(t)==="rtl";k.useEffect(()=>{document.documentElement.lang=t,document.documentElement.dir=u(t)},[t]);const r=async()=>{const i=`my-albums.html?lang=${t}`;await v(i)&&m(i)};return e.jsxs(e.Fragment,{children:[e.jsx(T,{}),e.jsx(C,{$isRTL:a,children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"space-between",height:"calc(100vh - 60px)"},children:[e.jsx(R,{children:e.jsxs(w,{$isRTL:a,children:[e.jsx(B,{src:c("images/logo_no_background.png"),alt:"6180 Logo"}),e.jsx("h1",{style:{fontSize:"1.4em",fontWeight:"bold",color:"#222",margin:0},children:"6180"})]})}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(I,{children:n("Create Albums Together")}),e.jsx(E,{$primary:!0,onClick:r,className:"hover-button",style:{marginTop:"20px",padding:"12px 20px"},children:n("Start")})]}),e.jsxs(z,{children:[e.jsxs("div",{style:{marginBottom:"12px"},children:[e.jsx(l,{href:c("terms.html"),children:n("Terms of Service")}),e.jsx(l,{href:c("privacy.html"),children:n("Privacy Policy")}),e.jsx(l,{href:c("support.html"),children:n("Support")})]}),e.jsx("div",{style:{display:"flex",justifyContent:"center",opacity:.7,fontSize:"0.85em"},children:e.jsx(G,{})})]})]})})]})};(async function(){const n=localStorage.getItem("preferred-language")||localStorage.getItem("user_language")||"en";if(await y()){m(`my-albums.html?lang=${n}`);return}L.createRoot(document.getElementById("root")).render(e.jsx(S,{initialLanguage:n,preloadLanguages:["en"],children:e.jsx(H,{})}))})();
