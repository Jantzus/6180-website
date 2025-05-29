import{d as r,u as p,r as h,j as e,c as y,a as m,R as L,I as k,g as x,b as i,e as S}from"./utils-BxvT7dao.js";import{G as v,A as w,H as T,L as C,a as R,b as I,B as E,c as A,d as l}from"./styled-components-D_J2MxxR.js";const B=r.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,P=r.span`
  font-size: 16px;
`,z=r.select`
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
`,$=r.option`
  padding: 8px;
`,D=({className:n,label:t="🌐",variant:o="default",onChange:s})=>{const{language:c,setLanguage:d,languages:f,loading:g}=p(),j=async a=>{const u=a.target.value;await d(u),s&&s(u)},b=h.useMemo(()=>r(z)`
      ${o==="minimal"&&`
        border: none;
        background: transparent;
        padding: 3px 5px;
        min-width: 100px;
      `}
      
      ${o==="button"&&`
        background-color: #f5f5f5;
        border-radius: 20px;
        padding: 6px 12px;
        font-weight: 500;
      `}
    `,[o]);return e.jsxs(B,{className:n,children:[e.jsx(P,{children:t}),e.jsx(b,{value:c,onChange:j,"aria-label":"Language",disabled:g,children:f.map(a=>e.jsx($,{value:a.code,children:a.name},a.code))}),g&&e.jsx("span",{style:{fontSize:"12px",color:"#666"},children:"•"})]})},F=()=>{const{t:n,language:t}=p(),o=x(t)==="rtl";h.useEffect(()=>{document.documentElement.lang=t,document.documentElement.dir=x(t)},[t]);const s=async()=>{const c=`my-albums.html?lang=${t}`;await S(c)&&m(c)};return e.jsxs(e.Fragment,{children:[e.jsx(v,{}),e.jsx(w,{isRTL:o,children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"space-between",height:"calc(100vh - 60px)"},children:[e.jsxs(T,{children:[e.jsxs(C,{isRTL:o,children:[e.jsx(R,{src:i("images/logo_no_background.png"),alt:"6180 Logo"}),e.jsx("h1",{style:{fontSize:"1.4em",fontWeight:"bold",color:"#222",margin:0},children:"6180"})]}),e.jsx(D,{})]}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(I,{children:n("Create Albums Together")}),e.jsx(E,{primary:!0,onClick:s,className:"hover-button",style:{marginTop:"20px",padding:"12px 20px"},children:n("Start")})]}),e.jsxs(A,{children:[e.jsx(l,{href:i("terms.html"),children:n("Terms of Service")}),e.jsx(l,{href:i("privacy.html"),children:n("Privacy Policy")}),e.jsx(l,{href:i("support.html"),children:n("Support")})]})]})})]})};(async function(){const n=localStorage.getItem("preferred-language")||localStorage.getItem("user_language")||"en";if(await y()){m(`my-albums.html?lang=${n}`);return}L.createRoot(document.getElementById("root")).render(e.jsx(k,{initialLanguage:n,preloadLanguages:["en"],children:e.jsx(F,{})}))})();
