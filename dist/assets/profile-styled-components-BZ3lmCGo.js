import{j as x,r as a,a8 as v,d as o}from"./styled-components-Cp5DMLPM.js";const L=({searchQuery:e,setSearchQuery:l,t:d,isRTL:r})=>x.jsx("div",{style:{width:"100%",marginBottom:24,boxSizing:"border-box",direction:r?"rtl":"ltr"},children:x.jsx("input",{type:"text",placeholder:d("Search album title or description"),value:e,onChange:t=>l(t.target.value),style:{width:"100%",padding:"10px 16px",fontSize:"14px",border:"1px solid #ddd",borderRadius:"6px",outline:"none",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",boxSizing:"border-box"}})}),S=({src:e,alt:l,style:d,thumbnailDataKey:r,dataKey:t,bucketUrl:s=v,...u})=>{const[b,c]=a.useState(!1),[f,g]=a.useState(""),[h,p]=a.useState(!1);a.useEffect(()=>{c(!1);let i="",n=!1;r&&r.length>0?(i=`${s}${r}`,n=!0):t&&t.length>0?(i=`${s}${t}`,n=!0):e&&e.length>0&&(i=e,n=!0),g(i),p(n)},[r,t,e,s]);const w=()=>{c(!0)},m=i=>{console.error("Image load error:",i),r&&t&&r!==t&&f===`${s}${r}`?(console.log("Falling back to full image"),g(`${s}${t}`)):p(!1)};return h?x.jsx("img",{src:f,alt:l,style:{...d,opacity:b?1:.3,transition:"opacity 0.3s ease-in-out"},onLoad:w,onError:m,...u}):null};o.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #555;
  margin-left: 8px;
`;o.div`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 100;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-radius: 4px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 180px;
  margin-top: 4px;
`;o.div`
  padding: 10px 16px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-bottom: ${e=>e.hasBorder?"1px solid #eee":"none"};
`;o.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  flex-direction: ${e=>e.isRTL?"row-reverse":"row"};
`;o.div`
  display: flex;
  width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
  flex-direction: ${e=>e.isRTL?"row-reverse":"row"};
  gap: 10px;
`;o.div`
  display: flex;
  gap: 10px;
  flex-direction: ${e=>e.isRTL?"row-reverse":"row"};
`;o.button`
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  text-align: center;
  white-space: nowrap;
  flex-shrink: 0;
  
  background-color: ${e=>{switch(e.variant){case"primary":return"#2196f3";case"success":return"#4caf50";case"active":return"#4caf50";default:return"#e0e0e0"}}};
  
  color: ${e=>{switch(e.variant){case"primary":case"success":case"active":return"white";default:return"inherit"}}};
`;const R=o.div`
  margin-bottom: 30px;
  width: 100%;
  direction: ${e=>e.isRTL?"rtl":"ltr"};
`,y=o.a`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  overflow: hidden;
`,T=o.div`
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: box-shadow 0.2s ease;
  width: 100%;
  max-width: 100%;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  
  &:hover {
    box-shadow: 0 6px 16px rgba(0,0,0,0.08);
  }
`,z=o.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
  flex-direction: ${e=>e.isRTL?"row-reverse":"row"};
`,I=o.div`
  display: flex;
  flex-direction: column;
  align-items: ${e=>e.isRTL?"flex-end":"flex-start"};
`,j=o.h2`
  font-size: 20px;
  margin: 0;
  color: #222;
`,A=o.div`
  font-size: 13px;
  color: #777;
  text-align: ${e=>e.isRTL?"right":"left"};
  margin-top: 4px;
`,k=o.div`
  width: 100%;
  position: relative;
`,C=o.div`
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding-bottom: 8px;
  -ms-overflow-style: none;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
  max-width: 100%;
  flex-direction: ${e=>e.isRTL?"row-reverse":"row"};
`,E=o.div`
  flex-shrink: 0;
`,B=o.div`
  position: absolute;
  ${e=>e.isRTL?"left":"right"}: 0;
  top: 0;
  bottom: 8px;
  width: 30px;
  background: ${e=>e.isRTL?"linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))":"linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))"};
  pointer-events: none;
`,P=o.div`
  display: flex;
  justify-content: ${e=>e.isRTL?"flex-start":"flex-end"};
  margin-top: 8px;
  margin-bottom: 8px;
`;export{A,k as I,S as L,P,L as S,R as a,y as b,T as c,z as d,I as e,j as f,C as g,E as h,B as i};
