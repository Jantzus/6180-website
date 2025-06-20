import{d as a,q as ye,u as X,a as S,j as t,b as ne,g as H,r as ae,o as le,R as we,I as $e,p as Se}from"./utils-kEhIe06W.js";import{u as Te,U as ve}from"./useFileUploadProcessor-B_xfvpBz.js";import{G as ke,A as je}from"./styled-components-BqWomI2t.js";import{A as Be}from"./AlbumList-BtXtCLYN.js";import{F as Fe}from"./FileInput-CwLKmVFv.js";import{L as Re}from"./LazyImage-BuY-Ba_Q.js";import{u as Ce}from"./useFolderManagement-D-V_0cmY.js";import"./fileOperations-CxIp3kfM.js";import"./types-Cxncrjqw.js";const s={colors:{primary:"#007bff",primaryDark:"#0056b3",danger:"#e53935",white:"#fff",grayLight:"#e0e0e0",borderLight:"#eaeaea",text:{primary:"#333",secondary:"#666",white:"#fff"}},spacing:{sm:"8px",md:"16px"},borderRadius:{small:"4px",medium:"8px",large:"16px",circle:"50%"},fontSizes:{xs:"12px",sm:"14px",lg:"18px",xl:"20px"},boxShadow:{primaryBtn:"0 4px 12px rgba(0, 123, 255, 0.2)",xl:"0 8px 24px rgba(0,0,0,0.2)"},breakpoints:{mobile:"767px"}},q=e=>ye`
  @media (max-width: ${s.breakpoints.mobile}) {
    ${e}
  }
`,Ae=a.header`
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
`,Ee=a.div`
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
`,Ge=a.div`
  display: flex;
  align-items: center;
  gap: ${s.spacing.sm};
  flex: 0 0 auto;
`,Ie=a.img`
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
`,De=a.h1`
  font-size: ${s.fontSizes.xl};
  font-weight: 600;
  color: ${s.colors.text.primary};
  margin: 0;
  letter-spacing: -0.01em;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif;
  
  ${q(`
    font-size: ${s.fontSizes.lg};
  `)}
`,ze=a.div`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  padding: 0 ${s.spacing.md};
  
  @media (max-width: 768px) {
    display: none;
  }
`,Le=a.button`
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
`,Me=a.span`
  font-size: 18px;
  line-height: 1;
  font-weight: 300;
`,_e=a.div`
  flex: 0 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  gap: ${s.spacing.sm};
`,Oe=a.button`
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
`,Pe=a.button`
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
`,Ye=a.div`
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
`,Ue=a.span`
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 768px) {
    display: none;
  }
`,We=a.svg`
  width: 12px;
  height: 12px;
  transform: ${e=>e.$isOpen?"rotate(180deg)":"rotate(0deg)"};
  transition: transform 0.2s ease;
  opacity: 0.6;
`,Ne=a.div`
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
`,ge=a.a`
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
`,Ke=a.button`
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
`,Ve=a.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`,He=a.span`
  font-size: ${s.fontSizes.xs};
  color: ${s.colors.text.secondary};
  font-weight: 400;
  margin-top: 2px;
`,Xe=a.div`
  height: 1px;
  background-color: rgba(0, 0, 0, 0.08);
  margin: ${s.spacing.sm} 0;
`,qe=a.div`
  height: 1px;
  background-color: ${s.colors.borderLight};
  width: 100%;
`,Je=({publicUsername:e,subscriptionInfo:g,calculatedBytesUsed:c,onNewAlbum:r})=>{const{t:x,language:k}=X(),T=H(k)==="rtl",[f,v]=S.useState(!1),d=S.useRef(null);S.useEffect(()=>{const y=w=>{d.current&&!d.current.contains(w.target)&&v(!1)};return document.addEventListener("mousedown",y),()=>document.removeEventListener("mousedown",y)},[]);const p=()=>{if(!g)return"-- / -- GB";const y=(c/(1024*1024*1024)).toFixed(1),w=g.intNumberOfSubscriptions===0?10:g.intNumberOfSubscriptions*10;return`${y} / ${w} GB`},$=()=>{if(!e)return"Profile";const y=e.split(" ")[0];return y.length>12?y.substring(0,12)+"...":y},u=()=>{localStorage.clear(),ae("index.html")};return t.jsx(t.Fragment,{children:t.jsxs(Ae,{children:[t.jsxs(Ee,{$isRTL:T,children:[t.jsxs(Ge,{children:[t.jsx(Ie,{src:ne("images/logo_no_background.png"),alt:"6180 Logo"}),t.jsx(De,{children:"6180"})]}),t.jsx(ze,{children:t.jsxs(Le,{onClick:r,children:[t.jsx(Me,{children:"+"}),x("New Album(s)")]})}),t.jsxs(_e,{ref:d,children:[t.jsx(Oe,{onClick:r,children:x("New Album(s)")}),t.jsxs(Pe,{onClick:()=>v(!f),children:[t.jsx(Ye,{children:$().charAt(0).toUpperCase()}),t.jsx(Ue,{children:$()}),t.jsx(We,{$isOpen:f,viewBox:"0 0 12 12",children:t.jsx("path",{d:"M2.5 4.5L6 8L9.5 4.5",stroke:"currentColor",strokeWidth:"1.5",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})})]}),f&&t.jsxs(Ne,{$isRTL:T,children:[e&&t.jsxs(ge,{href:`https://6180.io/${e}`,target:"_blank",rel:"noopener noreferrer",children:[t.jsx("span",{style:{fontSize:"16px"},children:"👤"}),x("View Public Profile")]}),t.jsxs(ge,{href:ne("storage/manage.html"),children:[t.jsx("span",{style:{fontSize:"16px"},children:"📦"}),t.jsxs(Ve,{children:[t.jsx("span",{children:x("Storage")}),t.jsx(He,{children:p()})]})]}),t.jsx(Xe,{}),t.jsxs(Ke,{onClick:u,children:[t.jsx("span",{style:{fontSize:"16px"},children:"🚪"}),x("Log Out")]})]})]})]}),t.jsx(qe,{})]})})},Ze=a.div`
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
`,Qe=a.div`
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`,et=a.div`
  position: relative;
  max-width: 100%;
`,tt=a.div`
  position: absolute;
  left: ${e=>e.$isRTL?"auto":"16px"};
  right: ${e=>e.$isRTL?"16px":"auto"};
  top: 50%;
  transform: translateY(-50%);
  color: #9CA3AF;
  pointer-events: none;
  z-index: 1;
`,ot=a.input`
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
`,st=a.button`
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
`,se=a.div`
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 8px;
  }
`,ie=a.div`
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
`,it=a.button`
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
`,rt=a.button`
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
`,nt=a.button`
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
`,at=a.button`
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
`,lt=a.div`
  margin-top: 8px;
  font-size: 13px;
  color: #555;
  font-style: italic;
  text-align: ${e=>e.$isRTL?"right":"left"};
`,ct=a.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 8px 0;
`,dt=({folders:e,searchQuery:g,setSearchQuery:c,onTagFilterChange:r,onContactFilterChange:x,resetTagFilter:k,resetContactFilter:T})=>{const{t:f,language:v}=X(),d=H(v)==="rtl",[p,$]=S.useState(!1),[u,y]=S.useState([]),[w,C]=S.useState([]),[A,E]=S.useState(null),[Y,z]=S.useState([]),[L,J]=S.useState([]),[G,B]=S.useState([]),[U,M]=S.useState([]),W=o=>o.subtags.filter(i=>w.includes(i.key)),N=o=>{const i=W(o);if(i.length===0)return o.tagTitle;const m=i.map(n=>n.subtagTitle).join(", ");return`${o.tagTitle} (${m})`};S.useEffect(()=>{const o=new Map,i=new Map;e.forEach(l=>{const b=l.updatedAt?new Date(l.updatedAt).getTime():l.createdAt?new Date(l.createdAt).getTime():0;l.files.forEach(j=>{var D;(D=j.selectedTags)==null||D.forEach(I=>{var ce;const O=`${I.TagType}-${I.tagTitle}`;if(!o.has(O))o.set(O,{tag:{key:O,TagType:I.TagType,tagTitle:I.tagTitle,timestamp:b,subtags:[]},timestamp:b});else{const R=o.get(O);b>R.timestamp&&(R.timestamp=b,R.tag.timestamp=b)}(ce=I.subtags)==null||ce.forEach(R=>{const de=`${R.TagType}-${R.tagTitle}-${R.subtagTitle}`,pe=o.get(O).tag,oe=pe.subtags.find(be=>be.key===de);oe?b>oe.timestamp&&(oe.timestamp=b):pe.subtags.push({key:de,TagType:R.TagType,tagTitle:R.tagTitle,subtagTitle:R.subtagTitle,timestamp:b})})})}),l.contacts&&Object.values(l.contacts).forEach(j=>{if(typeof j=="string"&&!j.toString().startsWith("Profile-")){const D=i.get(j);(!D||b>D.timestamp)&&i.set(j,{name:j,timestamp:b})}})});const m=Array.from(o.values()).sort((l,b)=>b.timestamp-l.timestamp).map(l=>(l.tag.subtags.sort((b,j)=>j.timestamp-b.timestamp),l.tag)),n=Array.from(i.values()).sort((l,b)=>b.timestamp-l.timestamp).map(l=>l.name);y(m),z(m),J(n),M(n)},[e]);const _=o=>{if(o.length===0){k(),z(u);return}const i=e.filter(m=>{const n=new Set;return m.files.forEach(l=>{var b;(b=l.selectedTags)==null||b.forEach(j=>{var D;n.add(`${j.TagType}-${j.tagTitle}`),(D=j.subtags)==null||D.forEach(I=>{n.add(`${I.TagType}-${I.tagTitle}-${I.subtagTitle}`)})})}),o.every(l=>n.has(l))});me(i),r(i)},Z=o=>{if(o.length===0){T(),M(L);return}const i=e.filter(m=>{if(!m.contacts)return!1;const n=Object.values(m.contacts).filter(l=>typeof l=="string"&&!l.toString().startsWith("Profile-"));return o.every(l=>n.includes(l))});he(i),x(i)},h=o=>{const i=w.includes(o.key),m=A===o.key;if(i){if(i&&!m)E(o.key);else if(i&&m){const n=w.filter(l=>l!==o.key&&!o.subtags.some(b=>b.key===l));C(n),E(null),_(n)}}else{const n=[...w,o.key];C(n),E(o.key),_(n)}},F=o=>{const i=w.includes(o.key);let m;i?m=w.filter(n=>n!==o.key):m=[...w,o.key],C(m),_(m)},ue=o=>{let i;G.includes(o)?i=G.filter(m=>m!==o):i=[...G,o],B(i),Z(i)},me=o=>{const i=new Set;o.forEach(n=>{n.files.forEach(l=>{var b;(b=l.selectedTags)==null||b.forEach(j=>{i.add(`${j.TagType}-${j.tagTitle}`)})})}),w.forEach(n=>{n.includes("-",n.indexOf("-")+1)||i.add(n)});const m=u.filter(n=>i.has(n.key));z(m)},he=o=>{const i=new Set;o.forEach(n=>{n.contacts&&Object.values(n.contacts).forEach(l=>{typeof l=="string"&&!l.toString().startsWith("Profile-")&&i.add(l)})}),G.forEach(n=>{i.add(n)});const m=L.filter(n=>i.has(n));M(m)},Q=A?u.find(o=>o.key===A):null,ee=w.length,te=G.length,K=L.length>0,V=u.length>0;return!K&&!V&&!g?null:t.jsxs(Ze,{$isRTL:d,children:[t.jsx(Qe,{children:t.jsxs(et,{children:[t.jsx(tt,{$isRTL:d,children:t.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[t.jsx("circle",{cx:"11",cy:"11",r:"8"}),t.jsx("path",{d:"m21 21-4.35-4.35"})]})}),t.jsx(ot,{$isRTL:d,type:"text",value:g,onChange:o=>c(o.target.value),placeholder:f("Search albums by title or description")}),g&&t.jsx(st,{$isRTL:d,onClick:()=>c(""),children:t.jsxs("svg",{width:"10",height:"10",viewBox:"0 0 24 24",fill:"none",stroke:"white",strokeWidth:"2",children:[t.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),t.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})}),(K||V)&&t.jsxs(t.Fragment,{children:[t.jsx(se,{children:t.jsxs(ie,{$isRTL:d,children:[K&&t.jsx(it,{$isActive:p,onClick:()=>$(!p),title:f("Toggle contacts filter"),children:"👥"}),V&&Y.length>0?Y.map(o=>{const i=W(o),m=i.length>0?`${o.TagType}: ${o.tagTitle} (${i.map(n=>n.subtagTitle).join(", ")})`:`Click to add/remove: ${o.TagType}: ${o.tagTitle}`;return t.jsx(rt,{$isSelected:w.includes(o.key),$isDisplayed:A===o.key,onClick:()=>h(o),title:m,children:N(o)},o.key)}):V?t.jsx(ct,{children:"No tags available"}):null]})}),p&&K&&t.jsx(se,{children:t.jsx(ie,{$isRTL:d,children:U.map(o=>t.jsx(nt,{$isSelected:G.includes(o),onClick:()=>ue(o),title:`Click to add/remove: ${o}`,children:o},o))})}),Q&&Q.subtags.length>0&&t.jsx(se,{children:t.jsx(ie,{$isRTL:d,children:Q.subtags.map(o=>t.jsx(at,{$isSelected:w.includes(o.key),onClick:()=>F(o),title:`Click to add/remove: ${o.TagType}: ${o.tagTitle} → ${o.subtagTitle}`,children:o.subtagTitle},o.key))})}),(ee>0||te>0)&&t.jsx(lt,{$isRTL:d,children:te>0&&ee>0?f("Showing albums with all selected contacts and tags"):te>0?f("Showing albums with all selected contacts"):ee>0?f("Showing albums with all selected tags"):""})]})]})},xe=10,re=3,pt=le.memo(({t:e,isRTL:g})=>t.jsx("div",{style:{padding:"20px 24px",marginTop:"20px",marginBottom:"20px",backgroundColor:"#fff",border:"1px solid #ddd",borderRadius:"8px",textAlign:g?"right":"left",direction:g?"rtl":"ltr",boxShadow:"0 1px 3px rgba(0,0,0,0.1)",position:"relative"},children:t.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"16px"},children:[t.jsxs("div",{children:[t.jsx("div",{style:{fontSize:"18px",fontWeight:"600",marginBottom:"4px",color:"#333",lineHeight:"1.3"},children:e("Use the 6180 app to showcase your albums offline")}),t.jsx("div",{style:{fontSize:"14px",color:"#666",lineHeight:"1.4",fontWeight:"400"},children:e("Intelligently tagged and beautifully organized")})]}),t.jsxs("div",{style:{display:"flex",gap:"12px",alignItems:"center",flexShrink:0},children:[t.jsxs("a",{href:"https://apps.apple.com/app/6180/id6468679610",target:"_blank",rel:"noopener noreferrer",style:{display:"inline-flex",alignItems:"center",gap:"8px",padding:"8px 16px",backgroundColor:"#007bff",borderRadius:"8px",textDecoration:"none",color:"white",fontSize:"14px",fontWeight:"500",transition:"all 0.2s ease",whiteSpace:"nowrap",border:"none",cursor:"pointer"},onMouseEnter:c=>{c.currentTarget.style.backgroundColor="#0056b3",c.currentTarget.style.transform="translateY(-1px)"},onMouseLeave:c=>{c.currentTarget.style.backgroundColor="#007bff",c.currentTarget.style.transform="translateY(0)"},children:[t.jsx("span",{style:{fontSize:"16px"},children:"🍎"}),e("Open On iOS")]}),t.jsxs("a",{href:"https://play.google.com/store/apps/details?id=io.i6180.android",target:"_blank",rel:"noopener noreferrer",style:{display:"inline-flex",alignItems:"center",gap:"8px",padding:"8px 16px",backgroundColor:"#007bff",borderRadius:"8px",textDecoration:"none",color:"white",fontSize:"14px",fontWeight:"500",transition:"all 0.2s ease",whiteSpace:"nowrap",border:"none",cursor:"pointer"},onMouseEnter:c=>{c.currentTarget.style.backgroundColor="#0056b3",c.currentTarget.style.transform="translateY(-1px)"},onMouseLeave:c=>{c.currentTarget.style.backgroundColor="#007bff",c.currentTarget.style.transform="translateY(0)"},children:[t.jsx("span",{style:{fontSize:"16px"},children:"🤖"}),e("Open On Android")]})]})]})})),gt=e=>e/(1024*1024*1024),P=e=>e<1?`${Math.round(e*1e3)} MB`:`${e.toFixed(1)} GB`,fe=(e,g,c)=>{if(!g)return[];const{intNumberOfSubscriptions:r}=g;let x=[];if(r===0){const k=xe*1024*1024*1024;if(e.length>5){const T=[...e].sort((d,p)=>{const $=new Date(d.createdAt||0).getTime(),u=new Date(p.createdAt||0).getTime();return $-u}),f=e.length-5;x=[...T.slice(0,f)]}if(c>k){const T=[...e].sort((p,$)=>{const u=new Date(p.createdAt||0).getTime(),y=new Date($.createdAt||0).getTime();return u-y});let f=c-k,v=[];for(const p of T){if(f<=0)break;const $=p.files.reduce((u,y)=>u+(y.dataInBytes||0),0);v.push(p),f-=$}const d=new Set(x.map(p=>p.folderId));for(const p of v)d.has(p.folderId)||x.push(p)}}else{const k=r*10*1024*1024*1024;if(c>k){const T=[...e].sort((v,d)=>{const p=new Date(v.createdAt||0).getTime(),$=new Date(d.createdAt||0).getTime();return p-$});let f=c-k;for(const v of T){if(f<=0)break;const d=v.files.reduce((p,$)=>p+($.dataInBytes||0),0);x.push(v),f-=d}}}return x},xt=le.memo(({albumsToDelete:e,isRTL:g})=>{const{t:c}=X();return e.length===0?null:t.jsx("div",{style:{marginTop:"16px"},children:e.map(r=>t.jsx("div",{style:{marginBottom:"20px",direction:g?"rtl":"ltr"},children:t.jsxs("div",{style:{background:"#fff",border:"2px solid #dc3545",borderRadius:"12px",padding:"20px",position:"relative",overflow:"hidden",opacity:"0.85"},children:[t.jsx("div",{style:{marginTop:"30px",marginBottom:"16px",display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexDirection:g?"row-reverse":"row"},children:t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:g?"flex-end":"flex-start"},children:[t.jsx("h3",{style:{fontSize:"18px",margin:"0 0 4px 0",color:"#dc3545",fontWeight:"bold"},children:r.folderName||"Untitled Album"}),t.jsxs("div",{style:{fontSize:"13px",color:"#666",textAlign:g?"right":"left"},children:[r.createdAt&&t.jsxs("div",{children:[c("Created"),": ",new Date(r.createdAt).toLocaleDateString()]}),t.jsx("div",{children:r.files.length===1?c("{{count}} file",{count:r.files.length.toString()}):c("{{count}} files",{count:r.files.length.toString()})})]})]})}),r.folderDescription&&r.folderDescription.length>1&&t.jsx("div",{style:{fontSize:"14px",color:"#555",marginBottom:"16px",textAlign:g?"right":"left",fontStyle:"italic"},children:r.folderDescription}),t.jsxs("div",{style:{width:"100%",position:"relative"},children:[t.jsxs("div",{style:{display:"flex",overflowX:"auto",gap:"12px",paddingBottom:"8px",msOverflowStyle:"none",scrollbarWidth:"thin",WebkitOverflowScrolling:"touch",maxWidth:"100%",flexDirection:g?"row-reverse":"row"},children:[r.files.slice(0,re).map((x,k)=>t.jsxs("div",{style:{width:"160px",height:"100px",flexShrink:0,position:"relative",borderRadius:"6px",overflow:"hidden",border:"2px solid #dc3545"},children:[t.jsx(Re,{thumbnailDataKey:x.thumbnailDataKey,dataKey:x.dataKey,alt:c("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover"}}),t.jsx("div",{style:{position:"absolute",top:"0",left:"0",right:"0",bottom:"0",background:"rgba(220, 53, 69, 0.3)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"24px"},children:"❌"})]},k)),r.files.length>re&&t.jsxs("div",{style:{width:"160px",height:"100px",flexShrink:0,position:"relative",borderRadius:"6px",border:"2px dashed #dc3545",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"#f8f9fa",color:"#dc3545",fontSize:"14px",fontWeight:"bold"},children:["+",r.files.length-re," more"]})]}),r.files.length>2&&t.jsx("div",{style:{position:"absolute",[g?"left":"right"]:0,top:0,bottom:8,width:"30px",background:g?"linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))":"linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))",pointerEvents:"none"}})]})]})},r.folderId))})}),ft=le.memo(({subscriptionInfo:e,albumCount:g,folders:c,calculatedBytesUsed:r,t:x,isRTL:k})=>{if(!e)return null;const{intNumberOfSubscriptions:T}=e,f=gt(r),v=S.useMemo(()=>fe(c,e,r),[c,e,r]);let d="none",p="";if(T===0){const u=xe,y=g>5,w=f>u;!y&&!w?(d="free-space",p=x("You can save 5 albums that total a maximum of {FREE_TIER_STORAGE_LIMIT_GB} GB for free. Delete unused albums to make space.").replace("{FREE_TIER_STORAGE_LIMIT_GB}",u.toString())):y&&w?(d="free-both-exceeded",p=x("You have over 5 albums AND your files occupy {formatGB(usedGB)} space (limit: {FREE_TIER_STORAGE_LIMIT_GB} GB). These albums are being automatically deleted unless you decide to delete other albums:").replace("{formatGB(usedGB)}",P(f)).replace("{FREE_TIER_STORAGE_LIMIT_GB}",u.toString())):y?(d="free-count-exceeded",p=x("You have {albumCount} albums but can only save 5 for free. These oldest albums are being automatically deleted unless you decide to delete other albums:").replace("{albumCount}",g.toString())):(w||w)&&(d="free-storage-exceeded",p=x("Your files occupy {formatGB(usedGB)} space, but you only have {FREE_TIER_STORAGE_LIMIT_GB} GB storage. These albums are being automatically deleted unless you decide to delete other albums:").replace("{formatGB(usedGB)}",P(f)).replace("{FREE_TIER_STORAGE_LIMIT_GB}",u.toString()))}else{const u=T*10,y=u-f;y<0?(d="paid-exceeded",p=x("Your files occupy {formatGB(usedGB)} space, but you only have {totalStorageGB} GB storage. These albums are being automatically deleted unless you decide to delete other albums:").replace("{formatGB(usedGB)}",P(f)).replace("{totalStorageGB}",u.toString())):y<1.5&&(d="paid-warning",p=x("Your files occupy {formatGB(usedGB)} of {totalStorageGB} GB storage. You may need to upgrade your subscription soon.").replace("{formatGB(usedGB)}",P(f)).replace("{totalStorageGB}",u.toString()))}if(d==="none")return null;const $=["free-count-exceeded","free-storage-exceeded","free-both-exceeded","paid-exceeded"].includes(d);return t.jsxs("div",{style:{padding:"12px 20px",marginBottom:"16px",backgroundColor:$?"#fff3cd":"#f8f9fa",border:`1px solid ${$?"#ffeaa7":"#e9ecef"}`,borderRadius:"8px",color:$?"#856404":"#6c757d",fontSize:"14px",textAlign:k?"right":"left",direction:k?"rtl":"ltr"},children:[p,$&&v.length>0&&t.jsx(xt,{albumsToDelete:v,isRTL:k}),t.jsx("div",{style:{marginTop:"12px"},children:t.jsx("a",{href:ne("storage/manage.html"),style:{color:"#007bff",textDecoration:"underline",cursor:"pointer",fontWeight:"bold"},onMouseEnter:u=>{u.currentTarget.style.color="#0056b3"},onMouseLeave:u=>{u.currentTarget.style.color="#007bff"},children:x("Click To Upgrade Subscription (US$1 monthly per 10 GB)")})})]})}),ut=()=>{const{t:e,language:g}=X(),c=H(g)==="rtl",{folders:r,filteredFolders:x,publicUsername:k,cognitoUsername:T,searchQuery:f,setSearchQuery:v,handleContactFilterChange:d,resetContactFilter:p,handleTagFilterChange:$,resetTagFilter:u,handleDeleteClick:y,setFolders:w,subscriptionInfo:C,calculatedBytesUsed:A}=Ce(h=>B(h)),E=Te(h=>{if(B(`🚀 Navigation callback triggered with folderId: ${h}`),h){const F=`save-album.html?folderId=${encodeURIComponent(h)}`;B(`🎯 Redirecting to: ${F}`),ae(F)}else B("🎯 Redirecting to: save-album.html"),ae("save-album.html")},!1),{fileInputRef:Y,isUploading:z,isProcessingFiles:L,progressTracker:J,setSelectedPhotos:G,log:B}=E;S.useEffect(()=>{(async()=>{try{await Se(),B("🔥 Page-level S3 credentials prewarmed successfully")}catch(F){B(`⚠️ Page-level credential prewarming failed: ${String(F)}`)}})()},[]);const U=S.useMemo(()=>C?fe(r,C,A):[],[r,C,A]),M=S.useMemo(()=>new Set(U.map(h=>h.folderId)),[U]),W=S.useMemo(()=>x.filter(h=>!M.has(h.folderId)),[x,M]),N=S.useCallback((h=null)=>{B(`📂 openFilePicker called with folderId: ${h}`),G([]),B("🧹 Cleared existing selected photos"),E.openFilePicker(h),B(`🎬 File picker opened for ${h?"existing album":"new album"}`)},[E,G,B]),_=S.useCallback(async h=>{B(`📁 File selection started with cognitoUsername: ${T}`);const F=await E.handleFileSelection(h,T);return B(`📁 File selection completed with result: ${F}`),F},[E,T,B]),Z=f.length>0||r.some(h=>h.contacts&&Object.keys(h.contacts).length>0||h.files.some(F=>F.selectedTags&&F.selectedTags.length>0));return t.jsxs(t.Fragment,{children:[t.jsx(ke,{}),t.jsxs(je,{$isRTL:c,children:[t.jsx(Je,{publicUsername:k,subscriptionInfo:C,calculatedBytesUsed:A,onNewAlbum:()=>N(null)}),(z||L)&&t.jsx("div",{style:{width:"100%",marginBottom:"20px"},children:t.jsx(ve,{progressTracker:J,isUploading:z,isProcessingFiles:L,isRTL:H(g)==="rtl",style:{marginTop:"20px"},context:"uploading",showSuccessMessage:!0,showErrorMessage:!0})}),r.length>3&&t.jsx(ft,{subscriptionInfo:C,albumCount:r.length,folders:r,calculatedBytesUsed:A,t:e,isRTL:c}),r.length<=3&&t.jsx(pt,{t:e,isRTL:c}),Z&&t.jsx(dt,{folders:r,searchQuery:f,setSearchQuery:v,onTagFilterChange:$,onContactFilterChange:d,resetTagFilter:u,resetContactFilter:p}),t.jsx(Be,{folders:W,setFolders:w,handleDeleteClick:h=>y(h,e),openFilePicker:N,isUploading:z,cognitoUsername:T,isProfileView:!1}),t.jsx(Fe,{onFileSelection:_,ref:Y})]})]})};we.createRoot(document.getElementById("root")).render(t.jsx($e,{children:t.jsx(ut,{})}));
