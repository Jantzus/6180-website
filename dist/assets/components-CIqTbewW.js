import{f as a,u as i,r as b,j as e}from"./styled-components-DtPfDTlN.js";const f=a.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,h=a.span`
  font-size: 16px;
`,m=a.select`
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
`,j=a.option`
  padding: 8px;
`,S=({k:t,params:s,fallback:n})=>{const{t:r}=i();return e.jsx(e.Fragment,{children:r(t,s)||n||t})},L=({className:t,label:s="🌐",variant:n="default",onChange:r})=>{const{language:l,setLanguage:p,languages:x,loading:c}=i(),u=async o=>{const d=o.target.value;await p(d),r&&r(d)},g=b.useMemo(()=>a(m)`
      ${n==="minimal"&&`
        border: none;
        background: transparent;
        padding: 3px 5px;
        min-width: 100px;
      `}
      
      ${n==="button"&&`
        background-color: #f5f5f5;
        border-radius: 20px;
        padding: 6px 12px;
        font-weight: 500;
      `}
    `,[n]);return e.jsxs(f,{className:t,children:[e.jsx(h,{children:s}),e.jsx(g,{value:l,onChange:u,"aria-label":"Language",disabled:c,children:x.map(o=>e.jsx(j,{value:o.code,children:o.name},o.code))}),c&&e.jsx("span",{style:{fontSize:"12px",color:"#666"},children:"•"})]})};export{L,S as T};
