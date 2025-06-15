import{d as o,u as h,j as e,c as b,r as m,R as L,I as S,a as v,g as u,b as l,e as k}from"./utils-CuQXS0Z6.js";import{G as T,A as w,H as C,L as R,a as B,b as I,B as z,c as E,d as c}from"./styled-components-C-fYuu40.js";const P=o.div`
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
`,D=({className:n,label:t="🌐",variant:a="default",onChange:r})=>{const{language:i,setLanguage:g,languages:f,loading:p}=h(),j=async s=>{const x=s.target.value;await g(x),r&&r(x)},y=a==="minimal"?A:a==="button"?H:d;return e.jsxs(P,{className:n,children:[e.jsx($,{children:t}),e.jsx(y,{value:i,onChange:j,"aria-label":"Language",disabled:p,children:f.map(s=>e.jsx(W,{value:s.code,children:s.name},s.code))}),p&&e.jsx("span",{style:{fontSize:"12px",color:"#666"},children:"•"})]})},F=()=>{const{t:n,language:t}=h(),a=u(t)==="rtl";v.useEffect(()=>{document.documentElement.lang=t,document.documentElement.dir=u(t)},[t]);const r=async()=>{const i=`my-albums.html?lang=${t}`;await k(i)&&m(i)};return e.jsxs(e.Fragment,{children:[e.jsx(T,{}),e.jsx(w,{$isRTL:a,children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"space-between",height:"calc(100vh - 60px)"},children:[e.jsx(C,{children:e.jsxs(R,{$isRTL:a,children:[e.jsx(B,{src:l("images/logo_no_background.png"),alt:"6180 Logo"}),e.jsx("h1",{style:{fontSize:"1.4em",fontWeight:"bold",color:"#222",margin:0},children:"6180"})]})}),e.jsxs("div",{style:{textAlign:"center",maxWidth:"600px",margin:"0 auto",padding:"0 20px"},children:[e.jsx(I,{children:n("Instant Photo and Video Sharing to Spark Conversations")}),e.jsx("p",{style:{fontSize:"1.1em",color:"#666",marginBottom:"30px",lineHeight:"1.6"},children:n("Tag by event, location, mood, and more — then share password-protected albums instantly.")}),e.jsx(z,{$primary:!0,onClick:r,className:"hover-button",style:{marginTop:"20px",padding:"12px 20px"},children:n("Start")})]}),e.jsxs(E,{children:[e.jsxs("div",{style:{marginBottom:"12px"},children:[e.jsx(c,{href:l("terms.html"),children:n("Terms of Service")}),e.jsx(c,{href:l("privacy.html"),children:n("Privacy Policy")}),e.jsx(c,{href:l("support.html"),children:n("Support")})]}),e.jsx("div",{style:{display:"flex",justifyContent:"center",opacity:.7,fontSize:"0.85em"},children:e.jsx(D,{})})]})]})})]})};(async function(){const n=localStorage.getItem("preferred-language")||localStorage.getItem("user_language")||"en";if(await b()){m(`my-albums.html?lang=${n}`);return}L.createRoot(document.getElementById("root")).render(e.jsx(S,{initialLanguage:n,preloadLanguages:["en"],children:e.jsx(F,{})}))})();
