import{d as o,u as h,j as e,c as L,r as m,R as y,I as S,a as k,g as x,b as c,e as v}from"./utils-BzOvwzP3.js";import{G as T,A as R,H as w,L as C,a as I,b as B,B as E,c as A,d as l}from"./styled-components-DK3Pjsc-.js";const P=o.div`
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
`,z=o(d)`
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
`,G=({className:n,label:t="🌐",variant:a="default",onChange:s})=>{const{language:i,setLanguage:g,languages:f,loading:u}=h(),j=async r=>{const p=r.target.value;await g(p),s&&s(p)},b=a==="minimal"?z:a==="button"?D:d;return e.jsxs(P,{className:n,children:[e.jsx($,{children:t}),e.jsx(b,{value:i,onChange:j,"aria-label":"Language",disabled:u,children:f.map(r=>e.jsx(F,{value:r.code,children:r.name},r.code))}),u&&e.jsx("span",{style:{fontSize:"12px",color:"#666"},children:"•"})]})},H=()=>{const{t:n,language:t}=h(),a=x(t)==="rtl";k.useEffect(()=>{document.documentElement.lang=t,document.documentElement.dir=x(t)},[t]);const s=async()=>{const i=`my-albums.html?lang=${t}`;await v(i)&&m(i)};return e.jsxs(e.Fragment,{children:[e.jsx(T,{}),e.jsx(R,{$isRTL:a,children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"space-between",height:"calc(100vh - 60px)"},children:[e.jsxs(w,{children:[e.jsxs(C,{$isRTL:a,children:[e.jsx(I,{src:c("images/logo_no_background.png"),alt:"6180 Logo"}),e.jsx("h1",{style:{fontSize:"1.4em",fontWeight:"bold",color:"#222",margin:0},children:"6180"})]}),e.jsx(G,{})]}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(B,{children:n("Create Albums Together")}),e.jsx(E,{$primary:!0,onClick:s,className:"hover-button",style:{marginTop:"20px",padding:"12px 20px"},children:n("Start")})]}),e.jsxs(A,{children:[e.jsx(l,{href:c("terms.html"),children:n("Terms of Service")}),e.jsx(l,{href:c("privacy.html"),children:n("Privacy Policy")}),e.jsx(l,{href:c("support.html"),children:n("Support")})]})]})})]})};(async function(){const n=localStorage.getItem("preferred-language")||localStorage.getItem("user_language")||"en";if(await L()){m(`my-albums.html?lang=${n}`);return}y.createRoot(document.getElementById("root")).render(e.jsx(S,{initialLanguage:n,preloadLanguages:["en"],children:e.jsx(H,{})}))})();
