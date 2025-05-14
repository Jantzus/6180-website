import{d as a,u as x,R as m,j as e,a as h,I as f,r as u,g as p,G as b,A as j,H as v,L,b as y,c as k,e as S,B as w,f as E,h as g}from"./styled-components-tja97-6r.js";import{c as H,a as M}from"./utils-BnUKyO0x.js";const I=a.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  inline-size: fit-content;
`,R=a.label`
  font-weight: normal;
  font-size: 1em;
  cursor: pointer;
`,B=a.select`
  padding: 5px 10px;
  background-color: transparent;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  min-width: 150px;
  appearance: auto;
  transition: border-color 0.2s ease;
  
  &:hover {
    border-color: #bbb;
  }
  
  &:focus {
    outline: none;
    border-color: #999;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.05);
  }
`,C=a.option`
  padding: 5px;
`,T=({className:n,label:o="🌐",variant:s="default"})=>{const{language:r,setLanguage:c,languages:i}=x(),d=m.useMemo(()=>a(B)`
      ${s==="minimal"&&`
        border: none;
        background: transparent;
        padding: 3px 5px;
        min-width: 100px;
      `}
      
      ${s==="button"&&`
        background-color: #f5f5f5;
        border-radius: 20px;
        padding: 6px 12px;
        font-weight: 500;
      `}
    `,[s]);return e.jsxs(I,{className:n,children:[e.jsx(R,{children:o}),e.jsx(d,{value:r,onChange:t=>c(t.target.value),"aria-label":"Language",children:i.map(t=>e.jsx(C,{value:t.code,children:t.name},t.code))})]})};async function A(){const n=localStorage.getItem("user_language")||"en";if(await H()){window.location.href=`/my-albums.html?lang=${n}`;return}h.createRoot(document.getElementById("root")).render(e.jsx(f,{children:e.jsx(P,{})}))}const P=()=>{const{t:n,language:o}=x(),[s,r]=u.useState(null),[c,i]=u.useState(null);u.useEffect(()=>{document.documentElement.lang=o;const l=p(o);document.documentElement.dir=l,localStorage.setItem("user_language",o)},[o]);const d=async()=>{let l=`/my-albums.html?lang=${o}`;await M(l)&&(window.location.href=l)},t=p(o)==="rtl";return e.jsxs(e.Fragment,{children:[e.jsx(b,{}),e.jsx(j,{isRTL:t,children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"space-between",minHeight:"calc(100vh - 60px)"},children:[e.jsxs(v,{children:[e.jsxs(L,{isRTL:t,children:[e.jsx(y,{src:"images/logo_no_background.png",alt:"6180 Logo"}),e.jsx(k,{isRTL:t,children:"6180"})]}),e.jsx(T,{className:"language-selector"})]}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(S,{children:n("Create Albums Together")}),e.jsx(w,{primary:!0,isHovered:c===0,onClick:d,onMouseEnter:()=>i(0),onMouseLeave:()=>i(null),style:{marginTop:"20px"},children:n("Start")})]}),e.jsxs(E,{children:[e.jsx(g,{href:"terms.html",isHovered:s==="terms",onMouseEnter:()=>r("terms"),onMouseLeave:()=>r(null),children:n("Terms of Service")}),e.jsx(g,{href:"privacy.html",isHovered:s==="privacy",onMouseEnter:()=>r("privacy"),onMouseLeave:()=>r(null),children:n("Privacy Policy")}),e.jsx(g,{href:"support.html",isHovered:s==="support",onMouseEnter:()=>r("support"),onMouseLeave:()=>r(null),children:n("Support")})]})]})})]})};A();
