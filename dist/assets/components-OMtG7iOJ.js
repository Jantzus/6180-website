import{f as c,u as i,r as x,j as n,h}from"./styled-components-CsRi_P85.js";const m=c.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,b=c.span`
  font-size: 16px;
`,j=c.select`
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
`,L=c.option`
  padding: 8px;
`,y=({k:e,params:a,fallback:t})=>{const{t:s}=i();return n.jsx(n.Fragment,{children:s(e,a)||t||e})},S=({k:e,params:a,fallback:t})=>{const{translation:s,loading:r}=h(e,a);return r?n.jsx(n.Fragment,{children:t||e}):n.jsx(n.Fragment,{children:s})},T=({className:e,label:a="🌐",variant:t="default",onChange:s})=>{const{language:r,setLanguage:p,languages:u,loading:d}=i(),g=async o=>{const l=o.target.value;await p(l),s&&s(l)},f=x.useMemo(()=>c(j)`
      ${t==="minimal"&&`
        border: none;
        background: transparent;
        padding: 3px 5px;
        min-width: 100px;
      `}
      
      ${t==="button"&&`
        background-color: #f5f5f5;
        border-radius: 20px;
        padding: 6px 12px;
        font-weight: 500;
      `}
    `,[t]);return n.jsxs(m,{className:e,children:[n.jsx(b,{children:a}),n.jsx(f,{value:r,onChange:g,"aria-label":"Language",disabled:d,children:u.map(o=>n.jsx(L,{value:o.code,children:o.name},o.code))}),d&&n.jsx("span",{style:{fontSize:"12px",color:"#666"},children:"•"})]})},F=({language:e,fallback:a=n.jsx("div",{children:"Loading translations..."}),children:t})=>{const{loading:s,setLanguage:r}=i();return x.useEffect(()=>{e&&r(e)},[e,r]),s?n.jsx(n.Fragment,{children:a}):n.jsx(n.Fragment,{children:t})};export{S as A,T as L,F as T,y as a};
