import{d as l,o as ye,u as X,a as S,j as t,b as ne,g as H,r as ae,q as le,R as we,I as $e,p as Se}from"./utils-DWLWZiq9.js";import{u as Te,U as ve}from"./useFileUploadProcessor-mRvvJjs-.js";import{G as ke,A as je}from"./styled-components-BiBgUlVV.js";import{A as Be}from"./AlbumList-f1NBaF-W.js";import{F as Fe}from"./FileInput-ro6ppH_a.js";import{L as Re}from"./LazyImage-DKl7VXhz.js";import{u as Ce}from"./utils-XHuYF640.js";import"./fileOperations-4XdlKeRo.js";import"./types-B2_92tNb.js";const s={colors:{primary:"#007bff",primaryDark:"#0056b3",danger:"#e53935",white:"#fff",grayLight:"#e0e0e0",borderLight:"#eaeaea",text:{primary:"#333",secondary:"#666",white:"#fff"}},spacing:{sm:"8px",md:"16px"},borderRadius:{small:"4px",medium:"8px",large:"16px",circle:"50%"},fontSizes:{xs:"12px",sm:"14px",lg:"18px",xl:"20px"},boxShadow:{primaryBtn:"0 4px 12px rgba(0, 123, 255, 0.2)",xl:"0 8px 24px rgba(0,0,0,0.2)"},breakpoints:{mobile:"767px"}},q=e=>ye`
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
`,Ue=l.span`
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 768px) {
    display: none;
  }
`,We=l.svg`
  width: 12px;
  height: 12px;
  transform: ${e=>e.$isOpen?"rotate(180deg)":"rotate(0deg)"};
  transition: transform 0.2s ease;
  opacity: 0.6;
`,Ne=l.div`
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
`,Ke=l.button`
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
`,Je=({publicUsername:e,subscriptionInfo:g,calculatedBytesUsed:n,onNewAlbum:r})=>{const{t:x,language:k}=X(),T=H(k)==="rtl",[f,v]=S.useState(!1),d=S.useRef(null);S.useEffect(()=>{const y=w=>{d.current&&!d.current.contains(w.target)&&v(!1)};return document.addEventListener("mousedown",y),()=>document.removeEventListener("mousedown",y)},[]);const p=()=>{if(!g)return"-- / -- GB";const y=(n/(1024*1024*1024)).toFixed(1),w=g.intNumberOfSubscriptions===0?10:g.intNumberOfSubscriptions*10;return`${y} / ${w} GB`},$=()=>{if(!e)return"Profile";const y=e.split(" ")[0];return y.length>12?y.substring(0,12)+"...":y},u=()=>{localStorage.clear(),ae("index.html")};return t.jsx(t.Fragment,{children:t.jsxs(Ae,{children:[t.jsxs(Ee,{$isRTL:T,children:[t.jsxs(Ge,{children:[t.jsx(Ie,{src:ne("images/logo_no_background.png"),alt:"6180 Logo"}),t.jsx(De,{children:"6180"})]}),t.jsx(ze,{children:t.jsxs(Le,{onClick:r,children:[t.jsx(Me,{children:"+"}),x("New Album")]})}),t.jsxs(_e,{ref:d,children:[t.jsx(Oe,{onClick:r,children:x("New Album")}),t.jsxs(Pe,{onClick:()=>v(!f),children:[t.jsx(Ye,{children:$().charAt(0).toUpperCase()}),t.jsx(Ue,{children:$()}),t.jsx(We,{$isOpen:f,viewBox:"0 0 12 12",children:t.jsx("path",{d:"M2.5 4.5L6 8L9.5 4.5",stroke:"currentColor",strokeWidth:"1.5",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})})]}),f&&t.jsxs(Ne,{$isRTL:T,children:[e&&t.jsxs(ge,{href:`https://6180.io/${e}`,target:"_blank",rel:"noopener noreferrer",children:[t.jsx("span",{style:{fontSize:"16px"},children:"👤"}),x("View Public Profile")]}),t.jsxs(ge,{href:ne("storage/manage.html"),children:[t.jsx("span",{style:{fontSize:"16px"},children:"📦"}),t.jsxs(Ve,{children:[t.jsx("span",{children:x("Storage")}),t.jsx(He,{children:p()})]})]}),t.jsx(Xe,{}),t.jsxs(Ke,{onClick:u,children:[t.jsx("span",{style:{fontSize:"16px"},children:"🚪"}),x("Log Out")]})]})]})]}),t.jsx(qe,{})]})})},Ze=({publicUsername:e,subscriptionInfo:g,calculatedBytesUsed:n,onNewAlbum:r})=>t.jsx(Je,{publicUsername:e,subscriptionInfo:g,calculatedBytesUsed:n,onNewAlbum:r}),Qe=l.div`
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
`,ct=l.div`
  margin-top: 8px;
  font-size: 13px;
  color: #555;
  font-style: italic;
  text-align: ${e=>e.$isRTL?"right":"left"};
`,dt=l.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 8px 0;
`,pt=({folders:e,searchQuery:g,setSearchQuery:n,onTagFilterChange:r,onContactFilterChange:x,resetTagFilter:k,resetContactFilter:T})=>{const{t:f,language:v}=X(),d=H(v)==="rtl",[p,$]=S.useState(!1),[u,y]=S.useState([]),[w,C]=S.useState([]),[A,E]=S.useState(null),[Y,z]=S.useState([]),[L,J]=S.useState([]),[G,B]=S.useState([]),[U,M]=S.useState([]),W=o=>o.subtags.filter(i=>w.includes(i.key)),N=o=>{const i=W(o);if(i.length===0)return o.tagTitle;const m=i.map(a=>a.subtagTitle).join(", ");return`${o.tagTitle} (${m})`};S.useEffect(()=>{const o=new Map,i=new Map;e.forEach(c=>{const b=c.updatedAt?new Date(c.updatedAt).getTime():c.createdAt?new Date(c.createdAt).getTime():0;c.files.forEach(j=>{var D;(D=j.selectedTags)==null||D.forEach(I=>{var ce;const O=`${I.TagType}-${I.tagTitle}`;if(!o.has(O))o.set(O,{tag:{key:O,TagType:I.TagType,tagTitle:I.tagTitle,timestamp:b,subtags:[]},timestamp:b});else{const R=o.get(O);b>R.timestamp&&(R.timestamp=b,R.tag.timestamp=b)}(ce=I.subtags)==null||ce.forEach(R=>{const de=`${R.TagType}-${R.tagTitle}-${R.subtagTitle}`,pe=o.get(O).tag,oe=pe.subtags.find(be=>be.key===de);oe?b>oe.timestamp&&(oe.timestamp=b):pe.subtags.push({key:de,TagType:R.TagType,tagTitle:R.tagTitle,subtagTitle:R.subtagTitle,timestamp:b})})})}),c.contacts&&Object.values(c.contacts).forEach(j=>{if(typeof j=="string"&&!j.toString().startsWith("Profile-")){const D=i.get(j);(!D||b>D.timestamp)&&i.set(j,{name:j,timestamp:b})}})});const m=Array.from(o.values()).sort((c,b)=>b.timestamp-c.timestamp).map(c=>(c.tag.subtags.sort((b,j)=>j.timestamp-b.timestamp),c.tag)),a=Array.from(i.values()).sort((c,b)=>b.timestamp-c.timestamp).map(c=>c.name);y(m),z(m),J(a),M(a)},[e]);const _=o=>{if(o.length===0){k(),z(u);return}const i=e.filter(m=>{const a=new Set;return m.files.forEach(c=>{var b;(b=c.selectedTags)==null||b.forEach(j=>{var D;a.add(`${j.TagType}-${j.tagTitle}`),(D=j.subtags)==null||D.forEach(I=>{a.add(`${I.TagType}-${I.tagTitle}-${I.subtagTitle}`)})})}),o.every(c=>a.has(c))});me(i),r(i)},Z=o=>{if(o.length===0){T(),M(L);return}const i=e.filter(m=>{if(!m.contacts)return!1;const a=Object.values(m.contacts).filter(c=>typeof c=="string"&&!c.toString().startsWith("Profile-"));return o.every(c=>a.includes(c))});he(i),x(i)},h=o=>{const i=w.includes(o.key),m=A===o.key;if(i){if(i&&!m)E(o.key);else if(i&&m){const a=w.filter(c=>c!==o.key&&!o.subtags.some(b=>b.key===c));C(a),E(null),_(a)}}else{const a=[...w,o.key];C(a),E(o.key),_(a)}},F=o=>{const i=w.includes(o.key);let m;i?m=w.filter(a=>a!==o.key):m=[...w,o.key],C(m),_(m)},ue=o=>{let i;G.includes(o)?i=G.filter(m=>m!==o):i=[...G,o],B(i),Z(i)},me=o=>{const i=new Set;o.forEach(a=>{a.files.forEach(c=>{var b;(b=c.selectedTags)==null||b.forEach(j=>{i.add(`${j.TagType}-${j.tagTitle}`)})})}),w.forEach(a=>{a.includes("-",a.indexOf("-")+1)||i.add(a)});const m=u.filter(a=>i.has(a.key));z(m)},he=o=>{const i=new Set;o.forEach(a=>{a.contacts&&Object.values(a.contacts).forEach(c=>{typeof c=="string"&&!c.toString().startsWith("Profile-")&&i.add(c)})}),G.forEach(a=>{i.add(a)});const m=L.filter(a=>i.has(a));M(m)},Q=A?u.find(o=>o.key===A):null,ee=w.length,te=G.length,K=L.length>0,V=u.length>0;return!K&&!V&&!g?null:t.jsxs(Qe,{$isRTL:d,children:[t.jsx(et,{children:t.jsxs(tt,{children:[t.jsx(ot,{$isRTL:d,children:t.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[t.jsx("circle",{cx:"11",cy:"11",r:"8"}),t.jsx("path",{d:"m21 21-4.35-4.35"})]})}),t.jsx(st,{$isRTL:d,type:"text",value:g,onChange:o=>n(o.target.value),placeholder:f("Search albums by title or description")}),g&&t.jsx(rt,{$isRTL:d,onClick:()=>n(""),children:t.jsxs("svg",{width:"10",height:"10",viewBox:"0 0 24 24",fill:"none",stroke:"white",strokeWidth:"2",children:[t.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),t.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})}),(K||V)&&t.jsxs(t.Fragment,{children:[t.jsx(se,{children:t.jsxs(re,{$isRTL:d,children:[K&&t.jsx(it,{$isActive:p,onClick:()=>$(!p),title:f("Toggle contacts filter"),children:"👥"}),V&&Y.length>0?Y.map(o=>{const i=W(o),m=i.length>0?`${o.TagType}: ${o.tagTitle} (${i.map(a=>a.subtagTitle).join(", ")})`:`Click to add/remove: ${o.TagType}: ${o.tagTitle}`;return t.jsx(nt,{$isSelected:w.includes(o.key),$isDisplayed:A===o.key,onClick:()=>h(o),title:m,children:N(o)},o.key)}):V?t.jsx(dt,{children:"No tags available"}):null]})}),p&&K&&t.jsx(se,{children:t.jsx(re,{$isRTL:d,children:U.map(o=>t.jsx(at,{$isSelected:G.includes(o),onClick:()=>ue(o),title:`Click to add/remove: ${o}`,children:o},o))})}),Q&&Q.subtags.length>0&&t.jsx(se,{children:t.jsx(re,{$isRTL:d,children:Q.subtags.map(o=>t.jsx(lt,{$isSelected:w.includes(o.key),onClick:()=>F(o),title:`Click to add/remove: ${o.TagType}: ${o.tagTitle} → ${o.subtagTitle}`,children:o.subtagTitle},o.key))})}),(ee>0||te>0)&&t.jsx(ct,{$isRTL:d,children:te>0&&ee>0?f("Showing albums with all selected contacts and tags"):te>0?f("Showing albums with all selected contacts"):ee>0?f("Showing albums with all selected tags"):""})]})]})},xe=10,ie=3,gt=le.memo(({t:e,isRTL:g})=>t.jsx("div",{style:{padding:"20px 24px",marginTop:"20px",marginBottom:"20px",backgroundColor:"#fff",border:"1px solid #ddd",borderRadius:"8px",textAlign:g?"right":"left",direction:g?"rtl":"ltr",boxShadow:"0 1px 3px rgba(0,0,0,0.1)",position:"relative"},children:t.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"16px"},children:[t.jsxs("div",{children:[t.jsx("div",{style:{fontSize:"18px",fontWeight:"600",marginBottom:"4px",color:"#333",lineHeight:"1.3"},children:e("Use the 6180 app to showcase your albums offline")}),t.jsx("div",{style:{fontSize:"14px",color:"#666",lineHeight:"1.4",fontWeight:"400"},children:e("Intelligently tagged and beautifully organized")})]}),t.jsxs("div",{style:{display:"flex",gap:"12px",alignItems:"center",flexShrink:0},children:[t.jsxs("a",{href:"#",target:"_blank",rel:"noopener noreferrer",style:{display:"inline-flex",alignItems:"center",gap:"8px",padding:"8px 16px",backgroundColor:"#007bff",borderRadius:"8px",textDecoration:"none",color:"white",fontSize:"14px",fontWeight:"500",transition:"all 0.2s ease",whiteSpace:"nowrap",border:"none",cursor:"pointer"},onMouseEnter:n=>{n.currentTarget.style.backgroundColor="#0056b3",n.currentTarget.style.transform="translateY(-1px)"},onMouseLeave:n=>{n.currentTarget.style.backgroundColor="#007bff",n.currentTarget.style.transform="translateY(0)"},children:[t.jsx("span",{style:{fontSize:"16px"},children:"🍎"}),e("Open On iOS")]}),t.jsxs("a",{href:"#",target:"_blank",rel:"noopener noreferrer",style:{display:"inline-flex",alignItems:"center",gap:"8px",padding:"8px 16px",backgroundColor:"#007bff",borderRadius:"8px",textDecoration:"none",color:"white",fontSize:"14px",fontWeight:"500",transition:"all 0.2s ease",whiteSpace:"nowrap",border:"none",cursor:"pointer"},onMouseEnter:n=>{n.currentTarget.style.backgroundColor="#0056b3",n.currentTarget.style.transform="translateY(-1px)"},onMouseLeave:n=>{n.currentTarget.style.backgroundColor="#007bff",n.currentTarget.style.transform="translateY(0)"},children:[t.jsx("span",{style:{fontSize:"16px"},children:"🤖"}),e("Open On Android")]})]})]})})),xt=e=>e/(1024*1024*1024),P=e=>e<1?`${Math.round(e*1e3)} MB`:`${e.toFixed(1)} GB`,fe=(e,g,n)=>{if(!g)return[];const{intNumberOfSubscriptions:r}=g;let x=[];if(r===0){const k=xe*1024*1024*1024;if(e.length>5){const T=[...e].sort((d,p)=>{const $=new Date(d.createdAt||0).getTime(),u=new Date(p.createdAt||0).getTime();return $-u}),f=e.length-5;x=[...T.slice(0,f)]}if(n>k){const T=[...e].sort((p,$)=>{const u=new Date(p.createdAt||0).getTime(),y=new Date($.createdAt||0).getTime();return u-y});let f=n-k,v=[];for(const p of T){if(f<=0)break;const $=p.files.reduce((u,y)=>u+(y.dataInBytes||0),0);v.push(p),f-=$}const d=new Set(x.map(p=>p.folderId));for(const p of v)d.has(p.folderId)||x.push(p)}}else{const k=r*10*1024*1024*1024;if(n>k){const T=[...e].sort((v,d)=>{const p=new Date(v.createdAt||0).getTime(),$=new Date(d.createdAt||0).getTime();return p-$});let f=n-k;for(const v of T){if(f<=0)break;const d=v.files.reduce((p,$)=>p+($.dataInBytes||0),0);x.push(v),f-=d}}}return x},ft=le.memo(({albumsToDelete:e,isRTL:g})=>{const{t:n}=X();return e.length===0?null:t.jsx("div",{style:{marginTop:"16px"},children:e.map(r=>t.jsx("div",{style:{marginBottom:"20px",direction:g?"rtl":"ltr"},children:t.jsxs("div",{style:{background:"#fff",border:"2px solid #dc3545",borderRadius:"12px",padding:"20px",position:"relative",overflow:"hidden",opacity:"0.85"},children:[t.jsx("div",{style:{marginTop:"30px",marginBottom:"16px",display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexDirection:g?"row-reverse":"row"},children:t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:g?"flex-end":"flex-start"},children:[t.jsx("h3",{style:{fontSize:"18px",margin:"0 0 4px 0",color:"#dc3545",fontWeight:"bold"},children:r.folderName||"Untitled Album"}),t.jsxs("div",{style:{fontSize:"13px",color:"#666",textAlign:g?"right":"left"},children:[r.createdAt&&t.jsxs("div",{children:[n("Created"),": ",new Date(r.createdAt).toLocaleDateString()]}),t.jsx("div",{children:r.files.length===1?n("{{count}} file",{count:r.files.length.toString()}):n("{{count}} files",{count:r.files.length.toString()})})]})]})}),r.folderDescription&&r.folderDescription.length>1&&t.jsx("div",{style:{fontSize:"14px",color:"#555",marginBottom:"16px",textAlign:g?"right":"left",fontStyle:"italic"},children:r.folderDescription}),t.jsxs("div",{style:{width:"100%",position:"relative"},children:[t.jsxs("div",{style:{display:"flex",overflowX:"auto",gap:"12px",paddingBottom:"8px",msOverflowStyle:"none",scrollbarWidth:"thin",WebkitOverflowScrolling:"touch",maxWidth:"100%",flexDirection:g?"row-reverse":"row"},children:[r.files.slice(0,ie).map((x,k)=>t.jsxs("div",{style:{width:"160px",height:"100px",flexShrink:0,position:"relative",borderRadius:"6px",overflow:"hidden",border:"2px solid #dc3545"},children:[t.jsx(Re,{thumbnailDataKey:x.thumbnailDataKey,dataKey:x.dataKey,alt:n("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover"}}),t.jsx("div",{style:{position:"absolute",top:"0",left:"0",right:"0",bottom:"0",background:"rgba(220, 53, 69, 0.3)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"24px"},children:"❌"})]},k)),r.files.length>ie&&t.jsxs("div",{style:{width:"160px",height:"100px",flexShrink:0,position:"relative",borderRadius:"6px",border:"2px dashed #dc3545",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"#f8f9fa",color:"#dc3545",fontSize:"14px",fontWeight:"bold"},children:["+",r.files.length-ie," more"]})]}),r.files.length>2&&t.jsx("div",{style:{position:"absolute",[g?"left":"right"]:0,top:0,bottom:8,width:"30px",background:g?"linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))":"linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))",pointerEvents:"none"}})]})]})},r.folderId))})}),ut=le.memo(({subscriptionInfo:e,albumCount:g,folders:n,calculatedBytesUsed:r,t:x,isRTL:k})=>{if(!e)return null;const{intNumberOfSubscriptions:T}=e,f=xt(r),v=S.useMemo(()=>fe(n,e,r),[n,e,r]);let d="none",p="";if(T===0){const u=xe,y=g>5,w=f>u;!y&&!w?(d="free-space",p=x("You can save 5 albums that total a maximum of {FREE_TIER_STORAGE_LIMIT_GB} GB for free. Delete unused albums to make space.").replace("{FREE_TIER_STORAGE_LIMIT_GB}",u.toString())):y&&w?(d="free-both-exceeded",p=x("You have over 5 albums AND your files occupy {formatGB(usedGB)} space (limit: {FREE_TIER_STORAGE_LIMIT_GB} GB). These albums are being automatically deleted unless you decide to delete other albums:").replace("{formatGB(usedGB)}",P(f)).replace("{FREE_TIER_STORAGE_LIMIT_GB}",u.toString())):y?(d="free-count-exceeded",p=x("You have {albumCount} albums but can only save 5 for free. These oldest albums are being automatically deleted unless you decide to delete other albums:").replace("{albumCount}",g.toString())):(w||w)&&(d="free-storage-exceeded",p=x("Your files occupy {formatGB(usedGB)} space, but you only have {FREE_TIER_STORAGE_LIMIT_GB} GB storage. These albums are being automatically deleted unless you decide to delete other albums:").replace("{formatGB(usedGB)}",P(f)).replace("{FREE_TIER_STORAGE_LIMIT_GB}",u.toString()))}else{const u=T*10,y=u-f;y<0?(d="paid-exceeded",p=x("Your files occupy {formatGB(usedGB)} space, but you only have {totalStorageGB} GB storage. These albums are being automatically deleted unless you decide to delete other albums:").replace("{formatGB(usedGB)}",P(f)).replace("{totalStorageGB}",u.toString())):y<1.5&&(d="paid-warning",p=x("Your files occupy {formatGB(usedGB)} of {totalStorageGB} GB storage. You may need to upgrade your subscription soon.").replace("{formatGB(usedGB)}",P(f)).replace("{totalStorageGB}",u.toString()))}if(d==="none")return null;const $=["free-count-exceeded","free-storage-exceeded","free-both-exceeded","paid-exceeded"].includes(d);return t.jsxs("div",{style:{padding:"12px 20px",marginBottom:"16px",backgroundColor:$?"#fff3cd":"#f8f9fa",border:`1px solid ${$?"#ffeaa7":"#e9ecef"}`,borderRadius:"8px",color:$?"#856404":"#6c757d",fontSize:"14px",textAlign:k?"right":"left",direction:k?"rtl":"ltr"},children:[p,$&&v.length>0&&t.jsx(ft,{albumsToDelete:v,isRTL:k}),t.jsx("div",{style:{marginTop:"12px"},children:t.jsx("a",{href:ne("storage/manage.html"),style:{color:"#007bff",textDecoration:"underline",cursor:"pointer",fontWeight:"bold"},onMouseEnter:u=>{u.currentTarget.style.color="#0056b3"},onMouseLeave:u=>{u.currentTarget.style.color="#007bff"},children:x("Click To Upgrade Subscription (US$1 monthly per 10 GB)")})})]})}),mt=()=>{const{t:e,language:g}=X(),n=H(g)==="rtl",{folders:r,filteredFolders:x,publicUsername:k,cognitoUsername:T,searchQuery:f,setSearchQuery:v,handleContactFilterChange:d,resetContactFilter:p,handleTagFilterChange:$,resetTagFilter:u,handleDeleteClick:y,setFolders:w,subscriptionInfo:C,calculatedBytesUsed:A}=Ce(h=>B(h)),E=Te(h=>{if(B(`🚀 Navigation callback triggered with folderId: ${h}`),h){const F=`save-album.html?folderId=${encodeURIComponent(h)}`;B(`🎯 Redirecting to: ${F}`),ae(F)}else B("🎯 Redirecting to: save-album.html"),ae("save-album.html")},!1),{fileInputRef:Y,isUploading:z,isProcessingFiles:L,progressTracker:J,setSelectedPhotos:G,log:B}=E;S.useEffect(()=>{(async()=>{try{await Se(),B("🔥 Page-level S3 credentials prewarmed successfully")}catch(F){B(`⚠️ Page-level credential prewarming failed: ${String(F)}`)}})()},[]);const U=S.useMemo(()=>C?fe(r,C,A):[],[r,C,A]),M=S.useMemo(()=>new Set(U.map(h=>h.folderId)),[U]),W=S.useMemo(()=>x.filter(h=>!M.has(h.folderId)),[x,M]),N=S.useCallback((h=null)=>{B(`📂 openFilePicker called with folderId: ${h}`),G([]),B("🧹 Cleared existing selected photos"),E.openFilePicker(h),B(`🎬 File picker opened for ${h?"existing album":"new album"}`)},[E,G,B]),_=S.useCallback(async h=>{B(`📁 File selection started with cognitoUsername: ${T}`);const F=await E.handleFileSelection(h,T);return B(`📁 File selection completed with result: ${F}`),F},[E,T,B]),Z=f.length>0||r.some(h=>h.contacts&&Object.keys(h.contacts).length>0||h.files.some(F=>F.selectedTags&&F.selectedTags.length>0));return t.jsxs(t.Fragment,{children:[t.jsx(ke,{}),t.jsxs(je,{$isRTL:n,children:[t.jsx(Ze,{publicUsername:k,subscriptionInfo:C,calculatedBytesUsed:A,onNewAlbum:()=>N(null)}),(z||L)&&t.jsx("div",{style:{width:"100%",marginBottom:"20px"},children:t.jsx(ve,{progressTracker:J,isUploading:z,isProcessingFiles:L,isRTL:H(g)==="rtl",style:{marginTop:"20px"},context:"uploading",showSuccessMessage:!0,showErrorMessage:!0})}),r.length>3&&t.jsx(ut,{subscriptionInfo:C,albumCount:r.length,folders:r,calculatedBytesUsed:A,t:e,isRTL:n}),r.length<=3&&t.jsx(gt,{t:e,isRTL:n}),Z&&t.jsx(pt,{folders:r,searchQuery:f,setSearchQuery:v,onTagFilterChange:$,onContactFilterChange:d,resetTagFilter:u,resetContactFilter:p}),t.jsx(Be,{folders:W,setFolders:w,handleDeleteClick:h=>y(h,e),openFilePicker:N,isUploading:z,cognitoUsername:T,isProfileView:!1}),t.jsx(Fe,{onFileSelection:_,ref:Y})]})]})};we.createRoot(document.getElementById("root")).render(t.jsx($e,{children:t.jsx(mt,{})}));
