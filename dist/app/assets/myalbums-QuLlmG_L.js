import{d as n,J as Me,u as re,r as d,j as e,b as he,g as se,a as oe,t as w,w as ce,R as ze,I as Ie,l as ue,G as Le,A as Ge,E as Pe}from"./buttons-DAdOhyvx.js";import{M as Oe,S as _e,a as Ue,b as We,c as Ye,u as Ne,U as Ke}from"./UploadProgress-CFUg2z3o.js";import{A as Ve}from"./AlbumList-CBGaxb7y.js";import{L as He}from"./LazyImage-NXOXfEhL.js";import{R as Je}from"./DownloadModal-DBxTG9Hj.js";import{a as Xe,b as qe,c as G,d as Ze,h as Qe,e as et,s as be,f as tt,i as ye}from"./folderStructureUtils-BmdkosLC.js";import{u as ot}from"./useFolderManagement-4H43f54i.js";import"./types-CyPfckSQ.js";const st=!1,s={colors:{primary:"#007bff",primaryDark:"#0056b3",danger:"#e53935",white:"#fff",grayLight:"#e0e0e0",borderLight:"#eaeaea",text:{primary:"#333",secondary:"#666",white:"#fff"}},spacing:{sm:"8px",md:"16px"},borderRadius:{small:"4px",medium:"8px",large:"16px",circle:"50%"},fontSizes:{xs:"12px",sm:"14px",lg:"18px",xl:"20px"},boxShadow:{primaryBtn:"0 4px 12px rgba(0, 123, 255, 0.2)",xl:"0 8px 24px rgba(0,0,0,0.2)"},breakpoints:{mobile:"767px"}},de=t=>Me`
  @media (max-width: ${s.breakpoints.mobile}) {
    ${t}
  }
`,rt=n.header`
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
`,nt=n.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${s.spacing.md}; /* Reduced from lg to md to match content */
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
  
  ${de(`
    padding: 0 ${s.spacing.md};
  `)}
`,it=n.div`
  display: flex;
  align-items: center;
  gap: ${s.spacing.sm};
  flex: 0 0 auto;
`,at=n.img`
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
  
  ${de(`
    width: 24px;
    height: 24px;
  `)}
`,lt=n.h1`
  font-size: ${s.fontSizes.xl};
  font-weight: 600;
  color: ${s.colors.text.primary};
  margin: 0;
  letter-spacing: -0.01em;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif;
  
  ${de(`
    font-size: ${s.fontSizes.lg};
  `)}
`,ct=n.div`
  flex: 1 1 auto;
  display: ${t=>t.$isMobile?"none":"flex"};
  justify-content: center;
  padding: 0 ${s.spacing.md};
  
  @media (max-width: 768px) {
    display: none;
  }
`,dt=n.div`
  display: inline-flex;
  gap: ${s.spacing.sm};
  align-items: center;
`,pt=n.button`
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
  min-width: 120px;
  box-shadow: ${s.boxShadow.primaryBtn};

  &:hover {
    background-color: ${s.colors.primaryDark};
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }
`,ft=n.button`
  display: ${t=>t.$isMobile?"none":"inline-flex"};
  align-items: center;
  gap: ${s.spacing.sm};
  padding: 10px ${s.spacing.md};
  background-color: transparent;
  color: ${s.colors.primary};
  border: 1px solid ${s.colors.primary};
  border-radius: ${s.borderRadius.medium};
  font-size: ${s.fontSizes.sm};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif;
  min-width: 120px;

  &:hover {
    background-color: ${s.colors.primary};
    color: ${s.colors.text.white};
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }

  // Hide on mobile/tablet
  @media (max-width: 1024px) {
    display: none;
  }
`,ut=n.span`
  font-size: 18px;
  line-height: 1;
  font-weight: 300;
`,gt=n.span`
  font-size: 16px;
  line-height: 1;
`,mt=n.div`
  flex: 0 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  gap: ${s.spacing.sm};
`,xt=n.button`
  display: ${t=>t.$isMobile?"flex":"none"};
  align-items: center;
  justify-content: center;
  padding: 10px 12px;
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
    padding: 10px 10px;
    font-size: ${s.fontSizes.xs};
  }
`,ht=n.button`
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
`,bt=n.div`
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
`,yt=n.span`
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: ${t=>t.$isMobile?"none":"inline"};

  @media (max-width: 768px) {
    display: none;
  }
`,wt=n.svg`
  width: 12px;
  height: 12px;
  transform: ${t=>t.$isOpen?"rotate(180deg)":"rotate(0deg)"};
  transition: transform 0.2s ease;
  opacity: 0.6;
`,St=n.div`
  position: absolute;
  top: 100%;
  right: ${t=>t.$isRTL?"auto":"0"};
  left: ${t=>t.$isRTL?"0":"auto"};
  margin-top: ${s.spacing.sm};
  min-width: 240px;
  background-color: ${s.colors.white};
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: ${s.borderRadius.large};
  box-shadow: ${s.boxShadow.xl};
  padding: ${s.spacing.sm};
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif;
  z-index: 1001;

  ${de(`
    min-width: 220px;
    max-width: calc(100vw - 32px);
  `)}
`,we=n.a`
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
`,$t=n.button`
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
`,Tt=n.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`,vt=n.span`
  font-size: ${s.fontSizes.xs};
  color: ${s.colors.text.secondary};
  font-weight: 400;
  margin-top: 2px;
`,kt=n.div`
  height: 1px;
  background-color: rgba(0, 0, 0, 0.08);
  margin: ${s.spacing.sm} 0;
`,jt=n.div`
  height: 1px;
  background-color: ${s.colors.borderLight};
  width: 100%;
`,Ct=({publicUsername:t,subscriptionInfo:p,calculatedBytesUsed:c,onNewAlbum:m,onSelectFiles:x,onSelectFolder:F})=>{const{t:i,language:T}=re(),S=se(T)==="rtl",[h,f]=d.useState(!1),[k,a]=d.useState(st),[$,y]=d.useState(!1),E=d.useRef(null);d.useEffect(()=>{y(!0);const I=()=>{if(typeof window<"u"){const N=window.innerWidth<=768;a(N)}};I();const D=J=>{E.current&&!E.current.contains(J.target)&&f(!1)},H=()=>{I()};if(typeof window<"u")return document.addEventListener("mousedown",D),window.addEventListener("resize",H),()=>{document.removeEventListener("mousedown",D),window.removeEventListener("resize",H)}},[]);const z=()=>{if(!p)return"-- / -- GB";const I=(c/(1024*1024*1024)).toFixed(1),D=p.intNumberOfSubscriptions===0?10:p.intNumberOfSubscriptions*10;return`${I} / ${D} GB`},R=()=>{if(!t)return"Profile";const I=t.split(" ")[0];return I.length>12?I.substring(0,12)+"...":I},P=()=>{$&&typeof localStorage<"u"&&localStorage.clear(),oe("index.html")},O=()=>{x?x():m&&m()},Y=()=>{F&&F()};return e.jsx(e.Fragment,{children:e.jsxs(rt,{children:[e.jsxs(nt,{$isRTL:S,children:[e.jsxs(it,{children:[e.jsx(at,{src:he("images/logo_no_background.png"),alt:"6180 Logo"}),e.jsx(lt,{children:"6180"})]}),e.jsx(ct,{$isMobile:k,children:e.jsxs(dt,{children:[e.jsxs(pt,{onClick:O,children:[e.jsx(ut,{children:"+"}),i("New Album")]}),F&&e.jsxs(ft,{$isMobile:k,onClick:Y,children:[e.jsx(gt,{children:"📁"}),i("Upload Folder")]})]})}),e.jsxs(mt,{children:[e.jsx(xt,{$isMobile:k,onClick:O,children:i("New Album")}),e.jsxs("div",{ref:E,style:{position:"relative"},children:[e.jsxs(ht,{onClick:()=>f(!h),children:[e.jsx(bt,{children:R().charAt(0).toUpperCase()}),e.jsx(yt,{$isMobile:k,children:R()}),e.jsx(wt,{$isOpen:h,viewBox:"0 0 12 12",children:e.jsx("path",{d:"M2.5 4.5L6 8L9.5 4.5",stroke:"currentColor",strokeWidth:"1.5",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})})]}),h&&e.jsxs(St,{$isRTL:S,children:[t&&e.jsxs(we,{href:`https://6180.io/${t}`,target:"_blank",rel:"noopener noreferrer",children:[e.jsx("span",{style:{fontSize:"16px"},children:"👤"}),i("View Public Profile")]}),e.jsxs(we,{href:he("storage/manage.html"),children:[e.jsx("span",{style:{fontSize:"16px"},children:"📦"}),e.jsxs(Tt,{children:[e.jsx("span",{children:i("Storage")}),e.jsx(vt,{children:z()})]})]}),e.jsx(kt,{}),e.jsxs($t,{onClick:P,children:[e.jsx("span",{style:{fontSize:"16px"},children:"🚪"}),i("Log Out")]})]})]})]})]}),e.jsx(jt,{})]})})},Ft=n.div`
  width: 100%;
  margin-top: 12px;
  margin-bottom: 16px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
  
  @media (max-width: 768px) {
    margin-top: 20px;
    padding: 16px;
  }
  
  @media (max-width: 480px) {
    margin-top: 24px;
    padding: 12px;
    border-radius: 8px;
  }
`,At=n.div`
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`,Bt=n.div`
  position: relative;
  max-width: 100%;
`,Et=n.div`
  position: absolute;
  left: ${t=>t.$isRTL?"auto":"16px"};
  right: ${t=>t.$isRTL?"16px":"auto"};
  top: 50%;
  transform: translateY(-50%);
  color: #9CA3AF;
  pointer-events: none;
  z-index: 1;
`,Rt=n.input`
  width: 100%;
  height: 44px;
  padding-left: ${t=>t.$isRTL?"16px":"48px"};
  padding-right: ${t=>t.$isRTL?"48px":"16px"};
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
    padding-left: ${t=>t.$isRTL?"12px":"44px"};
    padding-right: ${t=>t.$isRTL?"44px":"12px"};
  }
`,Dt=n.button`
  position: absolute;
  right: ${t=>t.$isRTL?"auto":"16px"};
  left: ${t=>t.$isRTL?"16px":"auto"};
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
`,ge=n.div`
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 8px;
  }
`,me=n.div`
  display: flex;
  flex-direction: ${t=>t.$isRTL?"row-reverse":"row"};
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
`,Mt=n.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid ${t=>t.$isActive?"#007bff":"#ced4da"};
  border-radius: 16px;
  background: ${t=>t.$isActive?"#007bff":"#ffffff"};
  color: ${t=>t.$isActive?"#ffffff":"#495057"};
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: ${t=>t.$isActive?"#0056b3":"#e9ecef"};
    transform: translateY(-1px);
  }
  
  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    font-size: 14px;
    border-radius: 12px;
  }
`,zt=n.button`
  padding: 6px 12px;
  border: 1px solid ${t=>t.$isDisplayed?"#28a745":t.$isSelected?"#007bff":"#ced4da"};
  border-radius: 16px;
  background: ${t=>t.$isDisplayed?"#28a745":t.$isSelected?"#007bff":"#ffffff"};
  color: ${t=>t.$isDisplayed||t.$isSelected?"#ffffff":"#495057"};
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
    background: ${t=>t.$isDisplayed?"#1e7e34":t.$isSelected?"#0056b3":"#e9ecef"};
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
`,It=n.button`
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 13px;
  cursor: pointer;
  border: 1px solid #ddd;
  background-color: ${t=>t.$isSelected?"#2196f3":"#fff"};
  color: ${t=>t.$isSelected?"#fff":"#333"};
  white-space: nowrap;
  transition: all 0.2s ease;
  flex-shrink: 0;
  height: 40px;

  &:hover {
    background-color: ${t=>t.$isSelected?"#1976d2":"#e9ecef"};
    transform: translateY(-1px);
  }
  
  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 12px;
    height: 36px;
    border-radius: 12px;
  }
`,Lt=n.button`
  padding: 4px 8px;
  border: 1px solid ${t=>t.$isSelected?"#007bff":"#ced4da"};
  border-radius: 12px;
  background: ${t=>t.$isSelected?"#007bff":"#ffffff"};
  color: ${t=>t.$isSelected?"#ffffff":"#495057"};
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    background: ${t=>t.$isSelected?"#0056b3":"#e9ecef"};
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
`,Gt=n.div`
  margin-top: 8px;
  font-size: 13px;
  color: #555;
  font-style: italic;
  text-align: ${t=>t.$isRTL?"right":"left"};
`,Pt=n.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 8px 0;
`,Ot=({folders:t,searchQuery:p,setSearchQuery:c,onTagFilterChange:m,onContactFilterChange:x,resetTagFilter:F,resetContactFilter:i})=>{const{t:T,language:S}=re(),h=se(S)==="rtl",[f,k]=d.useState(!1),[a,$]=d.useState([]),[y,E]=d.useState([]),[z,R]=d.useState(null),[P,O]=d.useState([]),[Y,I]=d.useState([]),[D,H]=d.useState([]),[J,N]=d.useState([]),_=o=>o.subtags.filter(l=>y.includes(l.key)),X=o=>{const l=_(o);if(l.length===0)return o.tagTitle;const v=l.map(u=>u.subtagTitle).join(", ");return`${o.tagTitle} (${v})`};d.useEffect(()=>{const o=new Map,l=new Map;t.forEach(g=>{const r=g.updatedAt?new Date(g.updatedAt).getTime():g.createdAt?new Date(g.createdAt).getTime():0;g.files.forEach(b=>{var C;(C=b.selectedTags)==null||C.forEach(A=>{var M;const B=`${A.TagType}-${A.tagTitle}`;if(!o.has(B))o.set(B,{tag:{key:B,TagType:A.TagType,tagTitle:A.tagTitle,timestamp:r,subtags:[]},timestamp:r});else{const j=o.get(B);r>j.timestamp&&(j.timestamp=r,j.tag.timestamp=r)}(M=A.subtags)==null||M.forEach(j=>{const W=`${j.TagType}-${j.tagTitle}-${j.subtagTitle}`,Q=o.get(B).tag,fe=Q.subtags.find(De=>De.key===W);fe?r>fe.timestamp&&(fe.timestamp=r):Q.subtags.push({key:W,TagType:j.TagType,tagTitle:j.tagTitle,subtagTitle:j.subtagTitle,timestamp:r})})})}),g.contacts&&Object.values(g.contacts).forEach(b=>{if(typeof b=="string"&&!b.toString().startsWith("Profile-")){const C=l.get(b);(!C||r>C.timestamp)&&l.set(b,{name:b,timestamp:r})}})});const v=Array.from(o.values()).sort((g,r)=>r.timestamp-g.timestamp).map(g=>(g.tag.subtags.sort((r,b)=>b.timestamp-r.timestamp),g.tag)),u=Array.from(l.values()).sort((g,r)=>r.timestamp-g.timestamp).map(g=>g.name);$(v),O(v),I(u),N(u)},[t]);const L=o=>{if(o.length===0){F(),O(a);return}const l=t.filter(v=>{const u=new Set;return v.files.forEach(g=>{var r;(r=g.selectedTags)==null||r.forEach(b=>{var C;u.add(`${b.TagType}-${b.tagTitle}`),(C=b.subtags)==null||C.forEach(A=>{u.add(`${A.TagType}-${A.tagTitle}-${A.subtagTitle}`)})})}),o.every(g=>u.has(g))});ie(l),m(l)},U=o=>{if(o.length===0){i(),N(Y);return}const l=t.filter(v=>{if(!v.contacts)return!1;const u=Object.values(v.contacts).filter(g=>typeof g=="string"&&!g.toString().startsWith("Profile-"));return o.every(g=>u.includes(g))});ae(l),x(l)},ee=o=>{const l=y.includes(o.key),v=z===o.key;if(l){if(l&&!v)R(o.key);else if(l&&v){const u=y.filter(g=>g!==o.key&&!o.subtags.some(r=>r.key===g));E(u),R(null),L(u)}}else{const u=[...y,o.key];E(u),R(o.key),L(u)}},ne=o=>{const l=y.includes(o.key);let v;l?v=y.filter(u=>u!==o.key):v=[...y,o.key],E(v),L(v)},pe=o=>{let l;D.includes(o)?l=D.filter(v=>v!==o):l=[...D,o],H(l),U(l)},ie=o=>{const l=new Set;o.forEach(u=>{u.files.forEach(g=>{var r;(r=g.selectedTags)==null||r.forEach(b=>{l.add(`${b.TagType}-${b.tagTitle}`)})})}),y.forEach(u=>{u.includes("-",u.indexOf("-")+1)||l.add(u)});const v=a.filter(u=>l.has(u.key));O(v)},ae=o=>{const l=new Set;o.forEach(u=>{u.contacts&&Object.values(u.contacts).forEach(g=>{typeof g=="string"&&!g.toString().startsWith("Profile-")&&l.add(g)})}),D.forEach(u=>{l.add(u)});const v=Y.filter(u=>l.has(u));N(v)},q=z?a.find(o=>o.key===z):null,te=y.length,K=D.length,Z=Y.length>0,V=a.length>0;return!Z&&!V&&!p?null:e.jsxs(Ft,{$isRTL:h,children:[e.jsx(At,{children:e.jsxs(Bt,{children:[e.jsx(Et,{$isRTL:h,children:e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("circle",{cx:"11",cy:"11",r:"8"}),e.jsx("path",{d:"m21 21-4.35-4.35"})]})}),e.jsx(Rt,{$isRTL:h,type:"text",value:p,onChange:o=>c(o.target.value),placeholder:T("Search albums by title or description")}),p&&e.jsx(Dt,{$isRTL:h,onClick:()=>c(""),children:e.jsxs("svg",{width:"10",height:"10",viewBox:"0 0 24 24",fill:"none",stroke:"white",strokeWidth:"2",children:[e.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),e.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})}),(Z||V)&&e.jsxs(e.Fragment,{children:[e.jsx(ge,{children:e.jsxs(me,{$isRTL:h,children:[Z&&e.jsx(Mt,{$isActive:f,onClick:()=>k(!f),title:T("Toggle contacts filter"),children:"👥"}),V&&P.length>0?P.map(o=>{const l=_(o),v=l.length>0?`${o.TagType}: ${o.tagTitle} (${l.map(u=>u.subtagTitle).join(", ")})`:`Click to add/remove: ${o.TagType}: ${o.tagTitle}`;return e.jsx(zt,{$isSelected:y.includes(o.key),$isDisplayed:z===o.key,onClick:()=>ee(o),title:v,children:X(o)},o.key)}):V?e.jsx(Pt,{children:T("No tags available")}):null]})}),f&&Z&&e.jsx(ge,{children:e.jsx(me,{$isRTL:h,children:J.map(o=>e.jsx(It,{$isSelected:D.includes(o),onClick:()=>pe(o),title:`Click to add/remove: ${o}`,children:o},o))})}),q&&q.subtags.length>0&&e.jsx(ge,{children:e.jsx(me,{$isRTL:h,children:q.subtags.map(o=>e.jsx(Lt,{$isSelected:y.includes(o.key),onClick:()=>ne(o),title:`Click to add/remove: ${o.TagType}: ${o.tagTitle} → ${o.subtagTitle}`,children:o.subtagTitle},o.key))})}),(te>0||K>0)&&e.jsx(Gt,{$isRTL:h,children:K>0&&te>0?T("Showing albums with all selected contacts and tags"):K>0?T("Showing albums with all selected contacts"):te>0?T("Showing albums with all selected tags"):""})]})]})},_t=n.div`
  background: ${w.colors.background.primary};
  border: 1px solid ${w.colors.borderLight};
  border-radius: ${w.borderRadius.medium};
  padding: ${w.spacing.md};
  margin: ${w.spacing.md} 0 ${w.spacing.lg} 0;
  font-family: monospace;
  font-size: ${w.fontSizes.sm};
  color: ${w.colors.text.primary};
  max-height: 150px;
  overflow-y: auto;
`,Se=n.div`
  margin-left: ${t=>t.$level*20}px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
`,Ut=n.div`
  display: flex;
  flex-direction: column;
  gap: ${w.spacing.sm};
  margin-bottom: ${w.spacing.lg};
`,$e=n.button`
  display: flex;
  align-items: center;
  gap: ${w.spacing.sm};
  padding: ${w.spacing.md} ${w.spacing.lg};
  border: 2px solid ${w.colors.borderLight};
  border-radius: ${w.borderRadius.medium};
  background: ${w.colors.background.card};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: ${w.fontSizes.md};
  text-align: left;
  width: 100%;

  &:hover {
    border-color: ${w.colors.primary};
    background: ${w.colors.background.highlight};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: ${w.breakpoints.mobile}) {
    padding: ${w.spacing.sm} ${w.spacing.md};
    font-size: ${w.fontSizes.sm};
  }
`,Te=n.span`
  font-size: ${w.fontSizes.xl};
  flex-shrink: 0;
`,ve=n.div`
  flex: 1;
`,ke=n.div`
  font-weight: 600;
  color: ${w.colors.text.primary};
  margin-bottom: 4px;
`,je=n.div`
  font-size: ${w.fontSizes.sm};
  color: ${w.colors.text.secondary};
  line-height: 1.4;
`,Wt=({isOpen:t,folderStructure:p,onChoice:c,onCancel:m})=>{const{t:x,language:F}=re(),i=se(F)==="rtl",[T,S]=d.useState(!1);if(d.useEffect(()=>{S(!0)},[]),!t||!p)return null;const h=(a,$=0)=>{const y=[];return $===0&&y.push(e.jsxs(Se,{$level:$,children:[e.jsx("span",{children:"📁"}),e.jsx("span",{children:a.name}),e.jsxs("span",{style:{color:w.colors.text.lighter,fontSize:"12px"},children:["(",a.files.length===1?x("{{count}} file",{count:a.files.length.toString()}):x("{{count}} files",{count:a.files.length.toString()}),")"]})]},a.path)),a.subfolders.forEach(E=>{const z=E.files.length+E.subfolders.reduce((R,P)=>R+P.files.length,0);y.push(e.jsxs(Se,{$level:$+1,children:[e.jsx("span",{children:"📁"}),e.jsx("span",{children:E.name}),e.jsxs("span",{style:{color:w.colors.text.lighter,fontSize:"12px"},children:["(",z===1?x("{{count}} file",{count:z.toString()}):x("{{count}} files",{count:z.toString()}),")"]})]},E.path)),$<1&&E.subfolders.length>0&&y.push(...h(E,$+2))}),y},f=a=>{if(typeof window<"u"&&window.sessionStorage)try{sessionStorage.setItem("album_creation_preference",a)}catch($){console.warn("Failed to store album creation preference:",$)}c(a)},k=e.jsx(Oe,{onClick:m,children:e.jsxs(_e,{$isRTL:i,onClick:a=>a.stopPropagation(),children:[e.jsx(Ue,{children:x("Create Multiple Albums?")}),e.jsx(We,{children:x("We noticed your folder contains subfolders. Would you like to create a separate album for each subfolder, or treat them all as one album?")}),e.jsx(_t,{children:h(p)}),e.jsxs(Ut,{children:[e.jsxs($e,{onClick:()=>f("separate"),children:[e.jsx(Te,{children:"📁"}),e.jsxs(ve,{children:[e.jsx(ke,{children:x("Separate albums by folder")}),e.jsx(je,{children:x('Each subfolder becomes a different album (e.g., "Day1", "Day2")')})]})]}),e.jsxs($e,{onClick:()=>f("combined"),children:[e.jsx(Te,{children:"🔗"}),e.jsxs(ve,{children:[e.jsx(ke,{children:x("Combine all into one album")}),e.jsx(je,{children:x("All files are merged into one album")})]})]})]}),e.jsx(Ye,{onClick:m,children:x("Cancel")})]})});return T?Je.createPortal(k,document.body):null},Ce=10,xe=3,Yt=t=>t.name.startsWith(".DS_Store")||t.name.startsWith("._")||t.name.startsWith("Thumbs.db")||t.name.startsWith(".")||t.name==="desktop.ini"||!/\.(jpg|jpeg|png|gif|bmp|webp|svg|mp4|mov|avi|wmv|flv|webm|mkv)$/i.test(t.name)?!1:t.size>0,Nt=t=>{const p=[];let c=0;for(const m of t){if(!m||!m.name){c++;continue}Yt(m)?p.push(m):c++}return{validFiles:p,filteredCount:c}},Fe=ce.forwardRef(({onFileSelection:t,onFolderSelection:p},c)=>e.jsxs("div",{style:{display:"none"},children:[e.jsx("input",{ref:c,id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:t,style:{display:"none"}}),e.jsx("input",{id:"folder-input",type:"file",accept:"image/*,video/*",multiple:!0,webkitdirectory:"",onChange:p,style:{display:"none"}})]}));Fe.displayName="EnhancedFileInput";const Ae=ce.memo(({t,isRTL:p})=>e.jsx("div",{style:{padding:"20px 24px",marginTop:"20px",marginBottom:"20px",backgroundColor:"#fff",border:"1px solid #ddd",borderRadius:"8px",textAlign:p?"right":"left",direction:p?"rtl":"ltr",boxShadow:"0 1px 3px rgba(0,0,0,0.1)",position:"relative"},children:e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"16px"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:"18px",fontWeight:"600",marginBottom:"4px",color:"#333",lineHeight:"1.3"},children:t("Use the 6180 app to showcase your albums offline")}),e.jsx("div",{style:{fontSize:"14px",color:"#666",lineHeight:"1.4",fontWeight:"400"},children:t("Intelligently tagged and beautifully organized")})]}),e.jsxs("div",{style:{display:"flex",gap:"12px",alignItems:"center",flexShrink:0},children:[e.jsxs("a",{href:"https://apps.apple.com/app/6180/id6468679610",target:"_blank",rel:"noopener noreferrer",style:{display:"inline-flex",alignItems:"center",gap:"8px",padding:"8px 16px",backgroundColor:"#007bff",borderRadius:"8px",textDecoration:"none",color:"white",fontSize:"14px",fontWeight:"500",transition:"all 0.2s ease",whiteSpace:"nowrap",border:"none",cursor:"pointer"},onMouseEnter:c=>{c.currentTarget.style.backgroundColor="#0056b3",c.currentTarget.style.transform="translateY(-1px)"},onMouseLeave:c=>{c.currentTarget.style.backgroundColor="#007bff",c.currentTarget.style.transform="translateY(0)"},children:[e.jsx("span",{style:{fontSize:"16px"},children:"🍎"}),t("Open On iOS")]}),e.jsxs("a",{href:"https://play.google.com/store/apps/details?id=io.i6180.android",target:"_blank",rel:"noopener noreferrer",style:{display:"inline-flex",alignItems:"center",gap:"8px",padding:"8px 16px",backgroundColor:"#007bff",borderRadius:"8px",textDecoration:"none",color:"white",fontSize:"14px",fontWeight:"500",transition:"all 0.2s ease",whiteSpace:"nowrap",border:"none",cursor:"pointer"},onMouseEnter:c=>{c.currentTarget.style.backgroundColor="#0056b3",c.currentTarget.style.transform="translateY(-1px)"},onMouseLeave:c=>{c.currentTarget.style.backgroundColor="#007bff",c.currentTarget.style.transform="translateY(0)"},children:[e.jsx("span",{style:{fontSize:"16px"},children:"🤖"}),t("Open On Android")]})]})]})}));Ae.displayName="AppDownloadPromotion";const Kt=t=>t/(1024*1024*1024),le=t=>t<1?`${Math.round(t*1e3)} MB`:`${t.toFixed(1)} GB`,Be=(t,p,c)=>{if(!p)return[];const{intNumberOfSubscriptions:m}=p;let x=[];if(m===0){const F=Ce*1024*1024*1024;if(t.length>5){const i=[...t].sort((h,f)=>{const k=new Date(h.createdAt||0).getTime(),a=new Date(f.createdAt||0).getTime();return k-a}),T=t.length-5;x=[...i.slice(0,T)]}if(c>F){const i=[...t].sort((f,k)=>{const a=new Date(f.createdAt||0).getTime(),$=new Date(k.createdAt||0).getTime();return a-$});let T=c-F;const S=[];for(const f of i){if(T<=0)break;const k=f.files.reduce((a,$)=>a+($.dataInBytes||0),0);S.push(f),T-=k}const h=new Set(x.map(f=>f.folderId));for(const f of S)h.has(f.folderId)||x.push(f)}}else{const F=m*10*1024*1024*1024;if(c>F){const i=[...t].sort((S,h)=>{const f=new Date(S.createdAt||0).getTime(),k=new Date(h.createdAt||0).getTime();return f-k});let T=c-F;for(const S of i){if(T<=0)break;const h=S.files.reduce((f,k)=>f+(k.dataInBytes||0),0);x.push(S),T-=h}}}return x},Ee=ce.memo(({albumsToDelete:t,isRTL:p})=>{const{t:c}=re(),[m,x]=d.useState(!1);d.useEffect(()=>{x(!0)},[]);const F=d.useMemo(()=>m?t.map(i=>({...i,formattedDate:i.createdAt?new Date(i.createdAt).toLocaleDateString():null})):t.map(i=>({...i,formattedDate:null})),[t,m]);return t.length===0?null:e.jsx("div",{style:{marginTop:"16px"},children:F.map(i=>e.jsx("div",{style:{marginBottom:"20px",direction:p?"rtl":"ltr"},children:e.jsxs("div",{style:{background:"#fff",border:"2px solid #dc3545",borderRadius:"12px",padding:"20px",position:"relative",overflow:"hidden",opacity:"0.85"},children:[e.jsx("div",{style:{marginTop:"30px",marginBottom:"16px",display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexDirection:p?"row-reverse":"row"},children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:p?"flex-end":"flex-start"},children:[e.jsx("h3",{style:{fontSize:"18px",margin:"0 0 4px 0",color:"#dc3545",fontWeight:"bold"},children:i.folderName||"Untitled Album"}),e.jsxs("div",{style:{fontSize:"13px",color:"#666",textAlign:p?"right":"left"},children:[i.formattedDate&&e.jsxs("div",{children:[c("Created"),": ",i.formattedDate]}),e.jsx("div",{children:i.files.length===1?c("{{count}} file",{count:i.files.length.toString()}):c("{{count}} files",{count:i.files.length.toString()})})]})]})}),i.folderDescription&&i.folderDescription.length>1&&e.jsx("div",{style:{fontSize:"14px",color:"#555",marginBottom:"16px",textAlign:p?"right":"left",fontStyle:"italic"},children:i.folderDescription}),e.jsxs("div",{style:{width:"100%",position:"relative"},children:[e.jsxs("div",{style:{display:"flex",overflowX:"auto",gap:"12px",paddingBottom:"8px",msOverflowStyle:"none",scrollbarWidth:"thin",WebkitOverflowScrolling:"touch",maxWidth:"100%",flexDirection:p?"row-reverse":"row"},children:[i.files.slice(0,xe).map((T,S)=>e.jsxs("div",{style:{width:"160px",height:"100px",flexShrink:0,position:"relative",borderRadius:"6px",overflow:"hidden",border:"2px solid #dc3545"},children:[e.jsx(He,{thumbnailDataKey:T.thumbnailDataKey,dataKey:T.dataKey,alt:c("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover"}}),e.jsx("div",{style:{position:"absolute",top:"0",left:"0",right:"0",bottom:"0",background:"rgba(220, 53, 69, 0.3)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"24px"},children:"❌"})]},S)),i.files.length>xe&&e.jsxs("div",{style:{width:"160px",height:"100px",flexShrink:0,position:"relative",borderRadius:"6px",border:"2px dashed #dc3545",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"#f8f9fa",color:"#dc3545",fontSize:"14px",fontWeight:"bold"},children:["+",i.files.length-xe," more"]})]}),i.files.length>2&&e.jsx("div",{style:{position:"absolute",[p?"left":"right"]:0,top:0,bottom:8,width:"30px",background:p?"linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))":"linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))",pointerEvents:"none"}})]})]})},i.folderId))})});Ee.displayName="AlbumDeletionPreview";const Re=ce.memo(({subscriptionInfo:t,albumCount:p,folders:c,calculatedBytesUsed:m,t:x,isRTL:F})=>{const i=d.useMemo(()=>t?Be(c,t,m):[],[c,t,m]);if(!t)return null;const{intNumberOfSubscriptions:T}=t,S=Kt(m);let h="none",f="";if(T===0){const a=Ce,$=p>5,y=S>a;!$&&!y?(h="free-space",f=x("You can save 5 albums that total a maximum of {FREE_TIER_STORAGE_LIMIT_GB} GB for free. Delete unused albums to make space.").replace("{FREE_TIER_STORAGE_LIMIT_GB}",a.toString())):$&&y?(h="free-both-exceeded",f=x("You have over 5 albums AND your files occupy {formatGB(usedGB)} space (limit: {FREE_TIER_STORAGE_LIMIT_GB} GB). These albums are being automatically deleted unless you decide to delete other albums:").replace("{formatGB(usedGB)}",le(S)).replace("{FREE_TIER_STORAGE_LIMIT_GB}",a.toString())):$?(h="free-count-exceeded",f=x("You have {albumCount} albums but can only save 5 for free. These oldest albums are being automatically deleted unless you decide to delete other albums:").replace("{albumCount}",p.toString())):y&&(h="free-storage-exceeded",f=x("Your files occupy {formatGB(usedGB)} space, but you only have {FREE_TIER_STORAGE_LIMIT_GB} GB storage. These albums are being automatically deleted unless you decide to delete other albums:").replace("{formatGB(usedGB)}",le(S)).replace("{FREE_TIER_STORAGE_LIMIT_GB}",a.toString()))}else{const a=T*10,$=a-S;$<0?(h="paid-exceeded",f=x("Your files occupy {formatGB(usedGB)} space, but you only have {totalStorageGB} GB storage. These albums are being automatically deleted unless you decide to delete other albums:").replace("{formatGB(usedGB)}",le(S)).replace("{totalStorageGB}",a.toString())):$<1.5&&(h="paid-warning",f=x("Your files occupy {formatGB(usedGB)} of {totalStorageGB} GB storage. You may need to upgrade your subscription soon.").replace("{formatGB(usedGB)}",le(S)).replace("{totalStorageGB}",a.toString()))}if(h==="none")return null;const k=["free-count-exceeded","free-storage-exceeded","free-both-exceeded","paid-exceeded"].includes(h);return e.jsxs("div",{style:{padding:"12px 20px",marginBottom:"16px",backgroundColor:k?"#fff3cd":"#f8f9fa",border:`1px solid ${k?"#ffeaa7":"#e9ecef"}`,borderRadius:"8px",color:k?"#856404":"#6c757d",fontSize:"14px",textAlign:F?"right":"left",direction:F?"rtl":"ltr"},children:[f,k&&i.length>0&&e.jsx(Ee,{albumsToDelete:i,isRTL:F}),e.jsx("div",{style:{marginTop:"12px"},children:e.jsx("a",{href:he("storage/manage.html"),style:{color:"#007bff",textDecoration:"underline",cursor:"pointer",fontWeight:"bold"},onMouseEnter:a=>{a.currentTarget.style.color="#0056b3"},onMouseLeave:a=>{a.currentTarget.style.color="#007bff"},children:x("Click To Upgrade Subscription (US$1 monthly per 10 GB)")})})]})});Re.displayName="StorageMessage";const Vt=()=>{const{t,language:p}=re(),c=se(p)==="rtl",[m,x]=d.useState(!1),[F,i]=d.useState(!1),[T,S]=d.useState(null),[h,f]=d.useState([]),[k,a]=d.useState(!1),$=d.useRef(null);d.useEffect(()=>{x(!0)},[]);const{folders:y,filteredFolders:E,publicUsername:z,cognitoUsername:R,searchQuery:P,setSearchQuery:O,handleContactFilterChange:Y,resetContactFilter:I,handleTagFilterChange:D,resetTagFilter:H,handleDeleteClick:J,setFolders:N,subscriptionInfo:_,calculatedBytesUsed:X}=ot(r=>{(r.includes("Error")||r.includes("Failed"))&&console.error(r)}),L=Ne(r=>{if(m){try{if(Xe()){const C=localStorage.getItem(ue.SELECTED_PHOTOS);if(C){const A=JSON.parse(C),B=qe(A);if(B.length>1){const M=B.map(j=>({name:j.name,selectedPhotos:j.selectedPhotos,folderPath:j.folderPath}));localStorage.setItem(ue.MULTI_ALBUM_DATA,JSON.stringify(M)),G(),oe("save-album.html?mode=multiple");return}else G()}else G()}}catch(b){console.error("Error processing multi-album data:",b),typeof G=="function"&&G()}if(k)a(!1),oe("save-album.html");else if(r){const b=`save-album.html?folderId=${encodeURIComponent(r)}`;oe(b)}else oe("save-album.html")}},!1),{fileInputRef:U,isUploading:ee,isProcessingFiles:ne,progressTracker:pe,setSelectedPhotos:ie}=L;d.useEffect(()=>{if(!m)return;(async()=>{try{await Pe()}catch(b){console.warn("Credential prewarming failed:",b)}})()},[m]);const ae=d.useMemo(()=>_?Be(y,_,X):[],[y,_,X]),q=d.useMemo(()=>new Set(ae.map(r=>r.folderId)),[ae]),te=d.useMemo(()=>E.filter(r=>!q.has(r.folderId)),[E,q]),K=d.useCallback(async r=>{if(!m)return!1;const b=Array.from(r.target.files||[]);if(!b.length)return!1;const{validFiles:C,filteredCount:A}=Nt(b);if(C.length===0)return alert("No valid image or video files were selected. Please select media files."),!1;A>0&&console.log(`Filtered out ${A} invalid/system files`);const B=Ze(C);if(B&&Qe(B)){const M=et();if(M){be(B,M,C);const j=new DataTransfer;C.forEach(Q=>j.items.add(Q));const W={...r,target:{...r.target,files:j.files}};try{await L.handleFileSelection(W,R)}catch(Q){console.error("Error in file upload:",Q),G()}}else S(B),f(C),i(!0)}else{const M=new DataTransfer;C.forEach(W=>M.items.add(W));const j={...r,target:{...r.target,files:M.files}};try{await L.handleFileSelection(j,R)}catch(W){console.error("Error in single album file selection:",W)}}return!0},[L,R,m]),Z=d.useCallback((r,b,C)=>{if(!m)return;tt(r),be(C,r,b),i(!1),S(null),f([]);const A=U.current;if(A)try{const B=new DataTransfer;b.forEach(j=>{j&&j.name&&B.items.add(j)}),A.files=B.files;const M=new Event("change",{bubbles:!0});Object.defineProperty(M,"target",{writable:!1,value:A}),L.handleFileSelection(M,R)}catch(B){console.error("Error in album creation flow:",B),G()}else console.error("File input ref not available"),G()},[L,R,U,m]),V=d.useCallback(async r=>K(r),[K]),o=d.useCallback(()=>{i(!1),S(null),f([]),a(!1),U.current&&(U.current.value=""),$.current&&($.current.value=""),m&&(ye(),G())},[U,m]),l=d.useCallback((r=null,b="files")=>{if(m)try{if(a(r===null),ye(),G(),localStorage.removeItem(ue.MULTI_ALBUM_DATA),ie([]),b==="folder")if($.current)$.current.click();else throw new Error("Folder picker not available");else L.openFilePicker(r)}catch(C){console.error("Error opening file picker:",C),a(!1),alert("Sorry, there was an error opening the file picker. Please try again.")}},[L,ie,m]),v=d.useCallback(()=>{try{l(null,"files")}catch(r){console.error("Error selecting files:",r)}},[l]),u=d.useCallback(()=>{try{l(null,"folder")}catch(r){console.error("Error selecting folder:",r)}},[l]),g=P.length>0||y.some(r=>r.contacts&&Object.keys(r.contacts).length>0||r.files.some(b=>b.selectedTags&&b.selectedTags.length>0));return e.jsxs(e.Fragment,{children:[e.jsx(Le,{}),e.jsxs(Ge,{$isRTL:c,children:[e.jsx(Ct,{publicUsername:z,subscriptionInfo:_,calculatedBytesUsed:X,onNewAlbum:()=>l(null,"files"),onSelectFiles:v,onSelectFolder:u}),(ee||ne)&&e.jsx("div",{style:{width:"100%",marginBottom:"20px"},children:e.jsx(Ke,{progressTracker:pe,isUploading:ee,isProcessingFiles:ne,isRTL:se(p)==="rtl",style:{marginTop:"20px"},context:"uploading",showSuccessMessage:!0,showErrorMessage:!0})}),y.length>3&&e.jsx(Re,{subscriptionInfo:_,albumCount:y.length,folders:y,calculatedBytesUsed:X,t,isRTL:c}),y.length<=3&&e.jsx(Ae,{t,isRTL:c}),g&&e.jsx(Ot,{folders:y,searchQuery:P,setSearchQuery:O,onTagFilterChange:D,onContactFilterChange:Y,resetTagFilter:H,resetContactFilter:I}),e.jsx(Ve,{folders:te,setFolders:N,handleDeleteClick:r=>J(r,t),isUploading:ee,cognitoUsername:R,isProfileView:!1}),e.jsx(Fe,{ref:U,onFileSelection:K,onFolderSelection:V}),e.jsx("input",{ref:$,type:"file",accept:"image/*,video/*",multiple:!0,webkitdirectory:"",onChange:V,style:{display:"none"}}),e.jsx(Wt,{isOpen:F,folderStructure:T,onChoice:r=>Z(r,h,T),onCancel:o})]})]})},Ht=()=>e.jsx(Ie,{children:e.jsx(Vt,{})});typeof window<"u"&&document.getElementById("root")&&ze.createRoot(document.getElementById("root")).render(e.jsx(Ht,{}));
