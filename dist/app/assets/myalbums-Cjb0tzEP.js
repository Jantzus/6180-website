import{d as l,o as ye,u as X,a as T,j as t,b as ne,g as H,r as ae,q as le,R as we,I as Se,p as Te}from"./utils-DWLWZiq9.js";import{u as $e,U as ve}from"./useFileUploadProcessor-BqbxkK04.js";import{G as ke,A as je}from"./styled-components-C-Cnp35q.js";import{A as Be}from"./AlbumList-erJhNpAL.js";import{F as Fe}from"./FileInput-ro6ppH_a.js";import{L as Re}from"./LazyImage-DKl7VXhz.js";import{u as Ce}from"./utils-XHuYF640.js";import"./fileOperations-4XdlKeRo.js";import"./types-B2_92tNb.js";const s={colors:{primary:"#007bff",primaryDark:"#0056b3",danger:"#e53935",white:"#fff",grayLight:"#e0e0e0",borderLight:"#eaeaea",text:{primary:"#333",secondary:"#666",white:"#fff"}},spacing:{sm:"8px",md:"16px"},borderRadius:{small:"4px",medium:"8px",large:"16px",circle:"50%"},fontSizes:{xs:"12px",sm:"14px",lg:"18px",xl:"20px"},boxShadow:{primaryBtn:"0 4px 12px rgba(0, 123, 255, 0.2)",xl:"0 8px 24px rgba(0,0,0,0.2)"},breakpoints:{mobile:"767px"}},q=e=>ye`
  @media (max-width: ${s.breakpoints.mobile}) {
    ${e}
  }
`,Ae=l.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid ${s.colors.borderLight};
  transition: all 0.2s ease;
`,Ee=l.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${s.spacing.md}; /* Reduced from lg to md to match content */
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  direction: ${e=>e.$isRTL?"rtl":"ltr"};
  
  ${q(`
    padding: 0 ${s.spacing.md};
  `)}
`,Ge=l.div`
  display: flex;
  align-items: center;
  gap: ${s.spacing.sm};
  flex: 0 0 auto;
`,Ie=l.img`
  width: 28px;
  height: 28px;
  border-radius: ${s.borderRadius.small};
  object-fit: cover;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
  pointer-events: none;
  
  ${q(`
    width: 24px;
    height: 24px;
  `)}
`,De=l.h1`
  font-size: ${s.fontSizes.xl};
  font-weight: 600;
  color: ${s.colors.text.primary};
  margin: 0;
  letter-spacing: -0.01em;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif;
  
  ${q(`
    font-size: ${s.fontSizes.lg};
  `)}
`,ze=l.div`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  padding: 0 ${s.spacing.md};
  
  @media (max-width: 768px) {
    display: none;
  }
`,Le=l.button`
  display: inline-flex;
  align-items: center;
  gap: ${s.spacing.sm};
  padding: 10px ${s.spacing.md};
  background-color: ${s.colors.primary};
  color: ${s.colors.text.white};
  border: none;
  border-radius: ${s.borderRadius.medium};
  font-size: ${s.fontSizes.sm};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif;
  min-width: 140px;
  box-shadow: ${s.boxShadow.primaryBtn};
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: ${s.colors.primaryDark};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
  }

  &:active {
    transform: translateY(0px) scale(0.98);
  }
`,Me=l.span`
  font-size: 18px;
  line-height: 1;
  font-weight: 300;
`,_e=l.div`
  flex: 0 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  gap: ${s.spacing.sm};
`,Oe=l.button`
  display: none;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  background-color: ${s.colors.primary};
  color: ${s.colors.text.white};
  border: none;
  border-radius: ${s.borderRadius.small};
  font-size: ${s.fontSizes.sm};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${s.boxShadow.primaryBtn};
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif;
  white-space: nowrap;

  &:hover {
    background-color: ${s.colors.primaryDark};
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    display: flex;
  }

  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: ${s.fontSizes.xs};
  }
`,Pe=l.button`
  display: flex;
  align-items: center;
  gap: ${s.spacing.sm};
  padding: 6px ${s.spacing.sm};
  background-color: transparent;
  border: none;
  border-radius: ${s.borderRadius.small};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: ${s.fontSizes.sm};
  font-weight: 500;
  color: ${s.colors.text.primary};
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif;

  &:hover {
    background-color: rgba(0, 0, 0, 0.06);
  }
`,Ye=l.div`
  width: 30px;
  height: 30px;
  border-radius: ${s.borderRadius.circle};
  background-color: ${s.colors.grayLight};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${s.fontSizes.sm};
  color: ${s.colors.text.secondary};
  font-weight: 600;
`,We=l.span`
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 768px) {
    display: none;
  }
`,Ue=l.svg`
  width: 12px;
  height: 12px;
  transform: ${e=>e.$isOpen?"rotate(180deg)":"rotate(0deg)"};
  transition: transform 0.2s ease;
  opacity: 0.6;
`,Ke=l.div`
  position: absolute;
  top: 100%;
  right: ${e=>e.$isRTL?"auto":"0"};
  left: ${e=>e.$isRTL?"0":"auto"};
  margin-top: ${s.spacing.sm};
  min-width: 240px;
  background-color: ${s.colors.white};
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: ${s.borderRadius.large};
  box-shadow: ${s.boxShadow.xl};
  padding: ${s.spacing.sm};
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif;
  z-index: 1001;

  ${q(`
    min-width: 220px;
    max-width: calc(100vw - 32px);
  `)}
`,ge=l.a`
  display: flex;
  align-items: center;
  gap: ${s.spacing.sm};
  padding: ${s.spacing.sm} 14px;
  border-radius: ${s.borderRadius.small};
  text-decoration: none;
  color: ${s.colors.text.primary};
  font-size: ${s.fontSizes.sm};
  font-weight: 400;
  transition: background-color 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`,Ne=l.button`
  display: flex;
  align-items: center;
  gap: ${s.spacing.sm};
  padding: ${s.spacing.sm} 14px;
  border-radius: ${s.borderRadius.small};
  background-color: transparent;
  border: none;
  color: ${s.colors.danger};
  font-size: ${s.fontSizes.sm};
  font-weight: 400;
  transition: background-color 0.2s ease;
  cursor: pointer;
  width: 100%;
  text-align: left;

  &:hover {
    background-color: rgba(255, 59, 48, 0.08);
  }
`,Ve=l.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`,He=l.span`
  font-size: ${s.fontSizes.xs};
  color: ${s.colors.text.secondary};
  font-weight: 400;
  margin-top: 2px;
`,Xe=l.div`
  height: 1px;
  background-color: rgba(0, 0, 0, 0.08);
  margin: ${s.spacing.sm} 0;
`,qe=l.div`
  height: 1px;
  background-color: ${s.colors.borderLight};
  width: 100%;
`,Je=({publicUsername:e,subscriptionInfo:g,calculatedBytesUsed:n,onNewAlbum:r})=>{const{t:x,language:v}=X(),k=H(v)==="rtl",[f,$]=T.useState(!1),c=T.useRef(null);T.useEffect(()=>{const b=y=>{c.current&&!c.current.contains(y.target)&&$(!1)};return document.addEventListener("mousedown",b),()=>document.removeEventListener("mousedown",b)},[]);const p=()=>{if(!g)return"-- / -- GB";const b=(n/(1024*1024*1024)).toFixed(1),y=g.intNumberOfSubscriptions===0?10:g.intNumberOfSubscriptions*10;return`${b} / ${y} GB`},w=()=>{if(!e)return"Profile";const b=e.split(" ")[0];return b.length>12?b.substring(0,12)+"...":b},u=()=>{localStorage.clear(),ae("index.html")};return t.jsx(t.Fragment,{children:t.jsxs(Ae,{children:[t.jsxs(Ee,{$isRTL:k,children:[t.jsxs(Ge,{children:[t.jsx(Ie,{src:ne("images/logo_no_background.png"),alt:"6180 Logo"}),t.jsx(De,{children:"6180"})]}),t.jsx(ze,{children:t.jsxs(Le,{onClick:r,children:[t.jsx(Me,{children:"+"}),x("New Album")]})}),t.jsxs(_e,{ref:c,children:[t.jsx(Oe,{onClick:r,children:x("New Album")}),t.jsxs(Pe,{onClick:()=>$(!f),children:[t.jsx(Ye,{children:w().charAt(0).toUpperCase()}),t.jsx(We,{children:w()}),t.jsx(Ue,{$isOpen:f,viewBox:"0 0 12 12",children:t.jsx("path",{d:"M2.5 4.5L6 8L9.5 4.5",stroke:"currentColor",strokeWidth:"1.5",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})})]}),f&&t.jsxs(Ke,{$isRTL:k,children:[e&&t.jsxs(ge,{href:`https://6180.io/${e}`,target:"_blank",rel:"noopener noreferrer",children:[t.jsx("span",{style:{fontSize:"16px"},children:"👤"}),x("View Public Profile")]}),t.jsxs(ge,{href:ne("storage/manage.html"),children:[t.jsx("span",{style:{fontSize:"16px"},children:"📦"}),t.jsxs(Ve,{children:[t.jsx("span",{children:x("Storage")}),t.jsx(He,{children:p()})]})]}),t.jsx(Xe,{}),t.jsxs(Ne,{onClick:u,children:[t.jsx("span",{style:{fontSize:"16px"},children:"🚪"}),x("Log Out")]})]})]})]}),t.jsx(qe,{})]})})},Ze=({publicUsername:e,subscriptionInfo:g,calculatedBytesUsed:n,onNewAlbum:r})=>t.jsx(Je,{publicUsername:e,subscriptionInfo:g,calculatedBytesUsed:n,onNewAlbum:r}),Qe=l.div`
  width: 100%;
  margin-top: 12px;
  margin-bottom: 16px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  direction: ${e=>e.$isRTL?"rtl":"ltr"};
  
  @media (max-width: 768px) {
    margin-top: 20px;
    padding: 16px;
  }
  
  @media (max-width: 480px) {
    margin-top: 24px;
    padding: 12px;
    border-radius: 8px;
  }
`,et=l.div`
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`,tt=l.div`
  position: relative;
  max-width: 100%;
`,ot=l.div`
  position: absolute;
  left: ${e=>e.$isRTL?"auto":"16px"};
  right: ${e=>e.$isRTL?"16px":"auto"};
  top: 50%;
  transform: translateY(-50%);
  color: #9CA3AF;
  pointer-events: none;
  z-index: 1;
`,st=l.input`
  width: 100%;
  height: 44px;
  padding-left: ${e=>e.$isRTL?"16px":"48px"};
  padding-right: ${e=>e.$isRTL?"48px":"16px"};
  font-size: 15px;
  font-weight: 400;
  color: #1F2937;
  background-color: #FFFFFF;
  border: 1px solid #D1D5DB;
  border-radius: 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif;
  outline: none;

  &::placeholder {
    color: #9CA3AF;
    opacity: 0.8;
  }

  &:focus {
    border-color: #007AFF;
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1), 0 1px 2px rgba(0, 0, 0, 0.05);
    background-color: #FFFFFF;
  }

  &:hover:not(:focus) {
    border-color: #9CA3AF;
    background-color: #FAFAFA;
  }

  @media (max-width: 480px) {
    height: 42px;
    padding-left: ${e=>e.$isRTL?"12px":"44px"};
    padding-right: ${e=>e.$isRTL?"44px":"12px"};
  }
`,rt=l.button`
  position: absolute;
  right: ${e=>e.$isRTL?"auto":"16px"};
  left: ${e=>e.$isRTL?"16px":"auto"};
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #9CA3AF;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 1;

  &:hover {
    background-color: #6B7280;
  }
`,se=l.div`
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 8px;
  }
`,re=l.div`
  display: flex;
  flex-direction: ${e=>e.$isRTL?"row-reverse":"row"};
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
  -webkit-overflow-scrolling: touch;
  flex-wrap: nowrap;
  align-items: center;

  /* Hide scrollbar for WebKit browsers */
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for Firefox */
  scrollbar-width: none;
  
  @media (max-width: 480px) {
    gap: 8px;
    padding-bottom: 6px;
  }
`,it=l.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid ${e=>e.$isActive?"#007bff":"#ced4da"};
  border-radius: 16px;
  background: ${e=>e.$isActive?"#007bff":"#ffffff"};
  color: ${e=>e.$isActive?"#ffffff":"#495057"};
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: ${e=>e.$isActive?"#0056b3":"#e9ecef"};
    transform: translateY(-1px);
  }
  
  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    font-size: 14px;
    border-radius: 12px;
  }
`,nt=l.button`
  padding: 6px 12px;
  border: 1px solid ${e=>e.$isDisplayed?"#28a745":e.$isSelected?"#007bff":"#ced4da"};
  border-radius: 16px;
  background: ${e=>e.$isDisplayed?"#28a745":e.$isSelected?"#007bff":"#ffffff"};
  color: ${e=>e.$isDisplayed||e.$isSelected?"#ffffff":"#495057"};
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
  height: 40px;
  display: flex;
  align-items: center;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background: ${e=>e.$isDisplayed?"#1e7e34":e.$isSelected?"#0056b3":"#e9ecef"};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 12px;
    height: 36px;
    max-width: 250px;
    border-radius: 12px;
  }
`,at=l.button`
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 13px;
  cursor: pointer;
  border: 1px solid #ddd;
  background-color: ${e=>e.$isSelected?"#2196f3":"#fff"};
  color: ${e=>e.$isSelected?"#fff":"#333"};
  white-space: nowrap;
  transition: all 0.2s ease;
  flex-shrink: 0;
  height: 40px;

  &:hover {
    background-color: ${e=>e.$isSelected?"#1976d2":"#e9ecef"};
    transform: translateY(-1px);
  }
  
  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 12px;
    height: 36px;
    border-radius: 12px;
  }
`,lt=l.button`
  padding: 4px 8px;
  border: 1px solid ${e=>e.$isSelected?"#007bff":"#ced4da"};
  border-radius: 12px;
  background: ${e=>e.$isSelected?"#007bff":"#ffffff"};
  color: ${e=>e.$isSelected?"#ffffff":"#495057"};
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    background: ${e=>e.$isSelected?"#0056b3":"#e9ecef"};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  @media (max-width: 480px) {
    padding: 4px 6px;
    font-size: 11px;
    border-radius: 8px;
  }
`,dt=l.div`
  margin-top: 8px;
  font-size: 13px;
  color: #555;
  font-style: italic;
  text-align: ${e=>e.$isRTL?"right":"left"};
`,ct=l.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 8px 0;
`,pt=({folders:e,searchQuery:g,setSearchQuery:n,onTagFilterChange:r,onContactFilterChange:x,resetTagFilter:v,resetContactFilter:k})=>{const{t:f,language:$}=X(),c=H($)==="rtl",[p,w]=T.useState(!1),[u,b]=T.useState([]),[y,F]=T.useState([]),[R,C]=T.useState(null),[Y,I]=T.useState([]),[D,J]=T.useState([]),[E,M]=T.useState([]),[W,z]=T.useState([]),U=o=>o.subtags.filter(i=>y.includes(i.key)),K=o=>{const i=U(o);if(i.length===0)return o.tagTitle;const m=i.map(a=>a.subtagTitle).join(", ");return`${o.tagTitle} (${m})`};T.useEffect(()=>{const o=new Map,i=new Map;e.forEach(d=>{const h=d.updatedAt?new Date(d.updatedAt).getTime():d.createdAt?new Date(d.createdAt).getTime():0;d.files.forEach(j=>{var G;(G=j.selectedTags)==null||G.forEach(A=>{var de;const O=`${A.TagType}-${A.tagTitle}`;if(!o.has(O))o.set(O,{tag:{key:O,TagType:A.TagType,tagTitle:A.tagTitle,timestamp:h,subtags:[]},timestamp:h});else{const B=o.get(O);h>B.timestamp&&(B.timestamp=h,B.tag.timestamp=h)}(de=A.subtags)==null||de.forEach(B=>{const ce=`${B.TagType}-${B.tagTitle}-${B.subtagTitle}`,pe=o.get(O).tag,oe=pe.subtags.find(be=>be.key===ce);oe?h>oe.timestamp&&(oe.timestamp=h):pe.subtags.push({key:ce,TagType:B.TagType,tagTitle:B.tagTitle,subtagTitle:B.subtagTitle,timestamp:h})})})}),d.contacts&&Object.values(d.contacts).forEach(j=>{if(typeof j=="string"&&!j.toString().startsWith("Profile-")){const G=i.get(j);(!G||h>G.timestamp)&&i.set(j,{name:j,timestamp:h})}})});const m=Array.from(o.values()).sort((d,h)=>h.timestamp-d.timestamp).map(d=>(d.tag.subtags.sort((h,j)=>j.timestamp-h.timestamp),d.tag)),a=Array.from(i.values()).sort((d,h)=>h.timestamp-d.timestamp).map(d=>d.name);b(m),I(m),J(a),z(a)},[e]);const _=o=>{if(o.length===0){v(),I(u);return}const i=e.filter(m=>{const a=new Set;return m.files.forEach(d=>{var h;(h=d.selectedTags)==null||h.forEach(j=>{var G;a.add(`${j.TagType}-${j.tagTitle}`),(G=j.subtags)==null||G.forEach(A=>{a.add(`${A.TagType}-${A.tagTitle}-${A.subtagTitle}`)})})}),o.every(d=>a.has(d))});me(i),r(i)},Z=o=>{if(o.length===0){k(),z(D);return}const i=e.filter(m=>{if(!m.contacts)return!1;const a=Object.values(m.contacts).filter(d=>typeof d=="string"&&!d.toString().startsWith("Profile-"));return o.every(d=>a.includes(d))});he(i),x(i)},S=o=>{const i=y.includes(o.key),m=R===o.key;if(i){if(i&&!m)C(o.key);else if(i&&m){const a=y.filter(d=>d!==o.key&&!o.subtags.some(h=>h.key===d));F(a),C(null),_(a)}}else{const a=[...y,o.key];F(a),C(o.key),_(a)}},L=o=>{const i=y.includes(o.key);let m;i?m=y.filter(a=>a!==o.key):m=[...y,o.key],F(m),_(m)},ue=o=>{let i;E.includes(o)?i=E.filter(m=>m!==o):i=[...E,o],M(i),Z(i)},me=o=>{const i=new Set;o.forEach(a=>{a.files.forEach(d=>{var h;(h=d.selectedTags)==null||h.forEach(j=>{i.add(`${j.TagType}-${j.tagTitle}`)})})}),y.forEach(a=>{a.includes("-",a.indexOf("-")+1)||i.add(a)});const m=u.filter(a=>i.has(a.key));I(m)},he=o=>{const i=new Set;o.forEach(a=>{a.contacts&&Object.values(a.contacts).forEach(d=>{typeof d=="string"&&!d.toString().startsWith("Profile-")&&i.add(d)})}),E.forEach(a=>{i.add(a)});const m=D.filter(a=>i.has(a));z(m)},Q=R?u.find(o=>o.key===R):null,ee=y.length,te=E.length,N=D.length>0,V=u.length>0;return!N&&!V&&!g?null:t.jsxs(Qe,{$isRTL:c,children:[t.jsx(et,{children:t.jsxs(tt,{children:[t.jsx(ot,{$isRTL:c,children:t.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[t.jsx("circle",{cx:"11",cy:"11",r:"8"}),t.jsx("path",{d:"m21 21-4.35-4.35"})]})}),t.jsx(st,{$isRTL:c,type:"text",value:g,onChange:o=>n(o.target.value),placeholder:f("Search albums by title or description")}),g&&t.jsx(rt,{$isRTL:c,onClick:()=>n(""),children:t.jsxs("svg",{width:"10",height:"10",viewBox:"0 0 24 24",fill:"none",stroke:"white",strokeWidth:"2",children:[t.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),t.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})}),(N||V)&&t.jsxs(t.Fragment,{children:[t.jsx(se,{children:t.jsxs(re,{$isRTL:c,children:[N&&t.jsx(it,{$isActive:p,onClick:()=>w(!p),title:f("Toggle contacts filter"),children:"👥"}),V&&Y.length>0?Y.map(o=>{const i=U(o),m=i.length>0?`${o.TagType}: ${o.tagTitle} (${i.map(a=>a.subtagTitle).join(", ")})`:`Click to add/remove: ${o.TagType}: ${o.tagTitle}`;return t.jsx(nt,{$isSelected:y.includes(o.key),$isDisplayed:R===o.key,onClick:()=>S(o),title:m,children:K(o)},o.key)}):V?t.jsx(ct,{children:"No tags available"}):null]})}),p&&N&&t.jsx(se,{children:t.jsx(re,{$isRTL:c,children:W.map(o=>t.jsx(at,{$isSelected:E.includes(o),onClick:()=>ue(o),title:`Click to add/remove: ${o}`,children:o},o))})}),Q&&Q.subtags.length>0&&t.jsx(se,{children:t.jsx(re,{$isRTL:c,children:Q.subtags.map(o=>t.jsx(lt,{$isSelected:y.includes(o.key),onClick:()=>L(o),title:`Click to add/remove: ${o.TagType}: ${o.tagTitle} → ${o.subtagTitle}`,children:o.subtagTitle},o.key))})}),(ee>0||te>0)&&t.jsx(dt,{$isRTL:c,children:te>0&&ee>0?f("Showing albums with all selected contacts and tags"):te>0?f("Showing albums with all selected contacts"):ee>0?f("Showing albums with all selected tags"):""})]})]})},xe=10,ie=3,gt=le.memo(({t:e,isRTL:g})=>t.jsx("div",{style:{padding:"20px 24px",marginTop:"20px",marginBottom:"20px",backgroundColor:"#fff",border:"1px solid #ddd",borderRadius:"8px",textAlign:g?"right":"left",direction:g?"rtl":"ltr",boxShadow:"0 1px 3px rgba(0,0,0,0.1)",position:"relative"},children:t.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"16px"},children:[t.jsxs("div",{children:[t.jsx("div",{style:{fontSize:"18px",fontWeight:"600",marginBottom:"4px",color:"#333",lineHeight:"1.3"},children:e("Use the 6180 app to showcase your albums offline")}),t.jsx("div",{style:{fontSize:"14px",color:"#666",lineHeight:"1.4",fontWeight:"400"},children:e("Intelligently tagged and beautifully organized")})]}),t.jsxs("div",{style:{display:"flex",gap:"12px",alignItems:"center",flexShrink:0},children:[t.jsxs("a",{href:"#",target:"_blank",rel:"noopener noreferrer",style:{display:"inline-flex",alignItems:"center",gap:"8px",padding:"8px 16px",backgroundColor:"#007bff",borderRadius:"8px",textDecoration:"none",color:"white",fontSize:"14px",fontWeight:"500",transition:"all 0.2s ease",whiteSpace:"nowrap",border:"none",cursor:"pointer"},onMouseEnter:n=>{n.currentTarget.style.backgroundColor="#0056b3",n.currentTarget.style.transform="translateY(-1px)"},onMouseLeave:n=>{n.currentTarget.style.backgroundColor="#007bff",n.currentTarget.style.transform="translateY(0)"},children:[t.jsx("span",{style:{fontSize:"16px"},children:"🍎"}),e("Open On iOS")]}),t.jsxs("a",{href:"#",target:"_blank",rel:"noopener noreferrer",style:{display:"inline-flex",alignItems:"center",gap:"8px",padding:"8px 16px",backgroundColor:"#007bff",borderRadius:"8px",textDecoration:"none",color:"white",fontSize:"14px",fontWeight:"500",transition:"all 0.2s ease",whiteSpace:"nowrap",border:"none",cursor:"pointer"},onMouseEnter:n=>{n.currentTarget.style.backgroundColor="#0056b3",n.currentTarget.style.transform="translateY(-1px)"},onMouseLeave:n=>{n.currentTarget.style.backgroundColor="#007bff",n.currentTarget.style.transform="translateY(0)"},children:[t.jsx("span",{style:{fontSize:"16px"},children:"🤖"}),e("Open On Android")]})]})]})})),xt=e=>e/(1024*1024*1024),P=e=>e<1?`${Math.round(e*1e3)} MB`:`${e.toFixed(1)} GB`,fe=(e,g,n)=>{if(!g)return[];const{intNumberOfSubscriptions:r}=g;let x=[];if(r===0){const v=xe*1024*1024*1024;if(e.length>5){const k=[...e].sort((c,p)=>{const w=new Date(c.createdAt||0).getTime(),u=new Date(p.createdAt||0).getTime();return w-u}),f=e.length-5;x=[...k.slice(0,f)]}if(n>v){const k=[...e].sort((p,w)=>{const u=new Date(p.createdAt||0).getTime(),b=new Date(w.createdAt||0).getTime();return u-b});let f=n-v,$=[];for(const p of k){if(f<=0)break;const w=p.files.reduce((u,b)=>u+(b.dataInBytes||0),0);$.push(p),f-=w}const c=new Set(x.map(p=>p.folderId));for(const p of $)c.has(p.folderId)||x.push(p)}}else{const v=r*10*1024*1024*1024;if(n>v){const k=[...e].sort(($,c)=>{const p=new Date($.createdAt||0).getTime(),w=new Date(c.createdAt||0).getTime();return p-w});let f=n-v;for(const $ of k){if(f<=0)break;const c=$.files.reduce((p,w)=>p+(w.dataInBytes||0),0);x.push($),f-=c}}}return x},ft=le.memo(({albumsToDelete:e,isRTL:g})=>{const{t:n}=X();return e.length===0?null:t.jsx("div",{style:{marginTop:"16px"},children:e.map(r=>t.jsx("div",{style:{marginBottom:"20px",direction:g?"rtl":"ltr"},children:t.jsxs("div",{style:{background:"#fff",border:"2px solid #dc3545",borderRadius:"12px",padding:"20px",position:"relative",overflow:"hidden",opacity:"0.85"},children:[t.jsx("div",{style:{marginTop:"30px",marginBottom:"16px",display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexDirection:g?"row-reverse":"row"},children:t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:g?"flex-end":"flex-start"},children:[t.jsx("h3",{style:{fontSize:"18px",margin:"0 0 4px 0",color:"#dc3545",fontWeight:"bold"},children:r.folderName||"Untitled Album"}),t.jsxs("div",{style:{fontSize:"13px",color:"#666",textAlign:g?"right":"left"},children:[r.createdAt&&t.jsxs("div",{children:[n("Created"),": ",new Date(r.createdAt).toLocaleDateString()]}),t.jsx("div",{children:r.files.length===1?n("{{count}} file",{count:r.files.length.toString()}):n("{{count}} files",{count:r.files.length.toString()})})]})]})}),r.folderDescription&&r.folderDescription.length>1&&t.jsx("div",{style:{fontSize:"14px",color:"#555",marginBottom:"16px",textAlign:g?"right":"left",fontStyle:"italic"},children:r.folderDescription}),t.jsxs("div",{style:{width:"100%",position:"relative"},children:[t.jsxs("div",{style:{display:"flex",overflowX:"auto",gap:"12px",paddingBottom:"8px",msOverflowStyle:"none",scrollbarWidth:"thin",WebkitOverflowScrolling:"touch",maxWidth:"100%",flexDirection:g?"row-reverse":"row"},children:[r.files.slice(0,ie).map((x,v)=>t.jsxs("div",{style:{width:"160px",height:"100px",flexShrink:0,position:"relative",borderRadius:"6px",overflow:"hidden",border:"2px solid #dc3545"},children:[t.jsx(Re,{thumbnailDataKey:x.thumbnailDataKey,dataKey:x.dataKey,alt:n("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover"}}),t.jsx("div",{style:{position:"absolute",top:"0",left:"0",right:"0",bottom:"0",background:"rgba(220, 53, 69, 0.3)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"24px"},children:"❌"})]},v)),r.files.length>ie&&t.jsxs("div",{style:{width:"160px",height:"100px",flexShrink:0,position:"relative",borderRadius:"6px",border:"2px dashed #dc3545",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"#f8f9fa",color:"#dc3545",fontSize:"14px",fontWeight:"bold"},children:["+",r.files.length-ie," more"]})]}),r.files.length>2&&t.jsx("div",{style:{position:"absolute",[g?"left":"right"]:0,top:0,bottom:8,width:"30px",background:g?"linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))":"linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))",pointerEvents:"none"}})]})]})},r.folderId))})}),ut=le.memo(({subscriptionInfo:e,albumCount:g,folders:n,calculatedBytesUsed:r,t:x,isRTL:v})=>{if(!e)return null;const{intNumberOfSubscriptions:k}=e,f=xt(r),$=T.useMemo(()=>fe(n,e,r),[n,e,r]);let c="none",p="";if(k===0){const u=xe,b=g>5,y=f>u;!b&&!y?(c="free-space",p=x("You can save 5 albums that total a maximum of {FREE_TIER_STORAGE_LIMIT_GB} GB for free. Delete unused albums to make space.").replace("{FREE_TIER_STORAGE_LIMIT_GB}",u.toString())):b&&y?(c="free-both-exceeded",p=x("You have over 5 albums AND your files occupy {formatGB(usedGB)} space (limit: {FREE_TIER_STORAGE_LIMIT_GB} GB). These albums are being automatically deleted unless you decide to delete other albums:").replace("{formatGB(usedGB)}",P(f)).replace("{FREE_TIER_STORAGE_LIMIT_GB}",u.toString())):b?(c="free-count-exceeded",p=x("You have {albumCount} albums but can only save 5 for free. These oldest albums are being automatically deleted unless you decide to delete other albums:").replace("{albumCount}",g.toString())):(y||y)&&(c="free-storage-exceeded",p=x("Your files occupy {formatGB(usedGB)} space, but you only have {FREE_TIER_STORAGE_LIMIT_GB} GB storage. These albums are being automatically deleted unless you decide to delete other albums:").replace("{formatGB(usedGB)}",P(f)).replace("{FREE_TIER_STORAGE_LIMIT_GB}",u.toString()))}else{const u=k*10,b=u-f;b<0?(c="paid-exceeded",p=x("Your files occupy {formatGB(usedGB)} space, but you only have {totalStorageGB} GB storage. These albums are being automatically deleted unless you decide to delete other albums:").replace("{formatGB(usedGB)}",P(f)).replace("{totalStorageGB}",u.toString())):b<1.5&&(c="paid-warning",p=x("Your files occupy {formatGB(usedGB)} of {totalStorageGB} GB storage. You may need to upgrade your subscription soon.").replace("{formatGB(usedGB)}",P(f)).replace("{totalStorageGB}",u.toString()))}if(c==="none")return null;const w=["free-count-exceeded","free-storage-exceeded","free-both-exceeded","paid-exceeded"].includes(c);return t.jsxs("div",{style:{padding:"12px 20px",marginBottom:"16px",backgroundColor:w?"#fff3cd":"#f8f9fa",border:`1px solid ${w?"#ffeaa7":"#e9ecef"}`,borderRadius:"8px",color:w?"#856404":"#6c757d",fontSize:"14px",textAlign:v?"right":"left",direction:v?"rtl":"ltr"},children:[p,w&&$.length>0&&t.jsx(ft,{albumsToDelete:$,isRTL:v}),t.jsx("div",{style:{marginTop:"12px"},children:t.jsx("a",{href:ne("storage/manage.html"),style:{color:"#007bff",textDecoration:"underline",cursor:"pointer",fontWeight:"bold"},onMouseEnter:u=>{u.currentTarget.style.color="#0056b3"},onMouseLeave:u=>{u.currentTarget.style.color="#007bff"},children:x("Click To Upgrade Subscription (US$1 monthly per 10 GB)")})})]})}),mt=()=>{const{t:e,language:g}=X(),n=H(g)==="rtl",{folders:r,filteredFolders:x,publicUsername:v,cognitoUsername:k,searchQuery:f,setSearchQuery:$,handleContactFilterChange:c,resetContactFilter:p,handleTagFilterChange:w,resetTagFilter:u,handleDeleteClick:b,setFolders:y,subscriptionInfo:F,calculatedBytesUsed:R}=Ce(S=>M(S)),C=$e(S=>{S?ae(`save-album.html?folderId=${encodeURIComponent(S)}`):ae("save-album.html")}),{fileInputRef:Y,isUploading:I,isProcessingFiles:D,progressTracker:J,setSelectedPhotos:E,log:M}=C;T.useEffect(()=>{(async()=>{try{await Te(),M("🔥 Page-level S3 credentials prewarmed successfully")}catch(L){M(`⚠️ Page-level credential prewarming failed: ${String(L)}`)}})()},[]);const W=T.useMemo(()=>F?fe(r,F,R):[],[r,F,R]),z=T.useMemo(()=>new Set(W.map(S=>S.folderId)),[W]),U=T.useMemo(()=>x.filter(S=>!z.has(S.folderId)),[x,z]),K=T.useCallback((S=null)=>{E([]),C.openFilePicker(S)},[C]),_=T.useCallback(async S=>await C.handleFileSelection(S,k),[C,k]),Z=f.length>0||r.some(S=>S.contacts&&Object.keys(S.contacts).length>0||S.files.some(L=>L.selectedTags&&L.selectedTags.length>0));return t.jsxs(t.Fragment,{children:[t.jsx(ke,{}),t.jsxs(je,{$isRTL:n,children:[t.jsx(Ze,{publicUsername:v,subscriptionInfo:F,calculatedBytesUsed:R,onNewAlbum:()=>K(null)}),(I||D)&&t.jsx("div",{style:{width:"100%",marginBottom:"20px"},children:t.jsx(ve,{progressTracker:J,isUploading:I,isProcessingFiles:D,isRTL:H(g)==="rtl",style:{marginTop:"20px"},context:"uploading",showSuccessMessage:!0,showErrorMessage:!0})}),r.length>3&&t.jsx(ut,{subscriptionInfo:F,albumCount:r.length,folders:r,calculatedBytesUsed:R,t:e,isRTL:n}),r.length<=3&&t.jsx(gt,{t:e,isRTL:n}),Z&&t.jsx(pt,{folders:r,searchQuery:f,setSearchQuery:$,onTagFilterChange:w,onContactFilterChange:c,resetTagFilter:u,resetContactFilter:p}),t.jsx(Be,{folders:U,setFolders:y,handleDeleteClick:S=>b(S,e),openFilePicker:K,isUploading:I,cognitoUsername:k,isProfileView:!1}),t.jsx(Fe,{onFileSelection:_,ref:Y})]})]})};we.createRoot(document.getElementById("root")).render(t.jsx(Se,{children:t.jsx(mt,{})}));
