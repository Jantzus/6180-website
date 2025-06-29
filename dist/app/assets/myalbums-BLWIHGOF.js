import{d as s,J as _e,u as ce,r as l,j as e,b as je,g as me,a as le,t as w,w as xe,R as Ue,I as We,l as ue,G as Ne,A as Ye,E as Ke}from"./buttons-DVLwyWsJ.js";import{U as He,M as Ve,S as Je,a as Xe,b as qe,c as Ze,u as Qe}from"./UploadProgress-BBcMwYUU.js";import{A as et}from"./AlbumList-DPafjcyg.js";import{L as tt}from"./LazyImage-BWJG2LaE.js";import{R as ot}from"./DownloadModal-D-e_3f3W.js";import{a as nt,b as st,c as _,d as Se,e as rt,h as it,f as at,s as Ce,i as lt}from"./folderStructureUtils-D_wamYMJ.js";import{u as ct}from"./useFolderManagement-DvaMQRbG.js";import"./types-CyPfckSQ.js";const dt=!1,n={colors:{primary:"#007bff",primaryDark:"#0056b3",danger:"#e53935",white:"#fff",grayLight:"#e0e0e0",borderLight:"#eaeaea",text:{primary:"#333",secondary:"#666",white:"#fff"}},spacing:{sm:"8px",md:"16px"},borderRadius:{small:"4px",medium:"8px",large:"16px",circle:"50%"},fontSizes:{xs:"12px",sm:"14px",lg:"18px",xl:"20px"},boxShadow:{primaryBtn:"0 4px 12px rgba(0, 123, 255, 0.2)",xl:"0 8px 24px rgba(0,0,0,0.2)"},breakpoints:{mobile:"767px"}},he=t=>_e`
  @media (max-width: ${n.breakpoints.mobile}) {
    ${t}
  }
`,pt=s.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid ${n.colors.borderLight};
  transition: all 0.2s ease;
`,ft=s.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${n.spacing.md}; /* Reduced from lg to md to match content */
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
  
  ${he(`
    padding: 0 ${n.spacing.md};
  `)}
`,ut=s.div`
  display: flex;
  align-items: center;
  gap: ${n.spacing.sm};
  flex: 0 0 auto;
`,gt=s.img`
  width: 28px;
  height: 28px;
  border-radius: ${n.borderRadius.small};
  object-fit: cover;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
  pointer-events: none;
  
  ${he(`
    width: 24px;
    height: 24px;
  `)}
`,mt=s.h1`
  font-size: ${n.fontSizes.xl};
  font-weight: 600;
  color: ${n.colors.text.primary};
  margin: 0;
  letter-spacing: -0.01em;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif;
  
  ${he(`
    font-size: ${n.fontSizes.lg};
  `)}
`,xt=s.div`
  flex: 1 1 auto;
  display: ${t=>t.$isMobile?"none":"flex"};
  justify-content: center;
  padding: 0 ${n.spacing.md};
  
  @media (max-width: 768px) {
    display: none;
  }
`,ht=s.div`
  display: inline-flex;
  gap: ${n.spacing.sm};
  align-items: center;
`,bt=s.button`
  display: inline-flex;
  align-items: center;
  gap: ${n.spacing.sm};
  padding: 10px ${n.spacing.md};
  background-color: ${n.colors.primary};
  color: ${n.colors.text.white};
  border: none;
  border-radius: ${n.borderRadius.medium};
  font-size: ${n.fontSizes.sm};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif;
  min-width: 120px;
  box-shadow: ${n.boxShadow.primaryBtn};

  &:hover {
    background-color: ${n.colors.primaryDark};
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }
`,yt=s.button`
  display: ${t=>t.$isMobile?"none":"inline-flex"};
  align-items: center;
  gap: ${n.spacing.sm};
  padding: 10px ${n.spacing.md};
  background-color: transparent;
  color: ${n.colors.primary};
  border: 1px solid ${n.colors.primary};
  border-radius: ${n.borderRadius.medium};
  font-size: ${n.fontSizes.sm};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif;
  min-width: 120px;

  &:hover {
    background-color: ${n.colors.primary};
    color: ${n.colors.text.white};
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }

  // Hide on mobile/tablet
  @media (max-width: 1024px) {
    display: none;
  }
`,wt=s.span`
  font-size: 18px;
  line-height: 1;
  font-weight: 300;
`,$t=s.span`
  font-size: 16px;
  line-height: 1;
`,St=s.div`
  flex: 0 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  gap: ${n.spacing.sm};
`,vt=s.button`
  display: ${t=>t.$isMobile?"flex":"none"};
  align-items: center;
  justify-content: center;
  padding: 10px 12px;
  background-color: ${n.colors.primary};
  color: ${n.colors.text.white};
  border: none;
  border-radius: ${n.borderRadius.small};
  font-size: ${n.fontSizes.sm};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${n.boxShadow.primaryBtn};
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif;
  white-space: nowrap;

  &:hover {
    background-color: ${n.colors.primaryDark};
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    display: flex;
  }

  @media (max-width: 480px) {
    padding: 10px 10px;
    font-size: ${n.fontSizes.xs};
  }
`,Tt=s.button`
  display: flex;
  align-items: center;
  gap: ${n.spacing.sm};
  padding: 6px ${n.spacing.sm};
  background-color: transparent;
  border: none;
  border-radius: ${n.borderRadius.small};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: ${n.fontSizes.sm};
  font-weight: 500;
  color: ${n.colors.text.primary};
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif;

  &:hover {
    background-color: rgba(0, 0, 0, 0.06);
  }
`,kt=s.div`
  width: 30px;
  height: 30px;
  border-radius: ${n.borderRadius.circle};
  background-color: ${n.colors.grayLight};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${n.fontSizes.sm};
  color: ${n.colors.text.secondary};
  font-weight: 600;
`,jt=s.span`
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: ${t=>t.$isMobile?"none":"inline"};

  @media (max-width: 768px) {
    display: none;
  }
`,Ct=s.svg`
  width: 12px;
  height: 12px;
  transform: ${t=>t.$isOpen?"rotate(180deg)":"rotate(0deg)"};
  transition: transform 0.2s ease;
  opacity: 0.6;
`,At=s.div`
  position: absolute;
  top: 100%;
  right: ${t=>t.$isRTL?"auto":"0"};
  left: ${t=>t.$isRTL?"0":"auto"};
  margin-top: ${n.spacing.sm};
  min-width: 240px;
  background-color: ${n.colors.white};
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: ${n.borderRadius.large};
  box-shadow: ${n.boxShadow.xl};
  padding: ${n.spacing.sm};
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif;
  z-index: 1001;

  ${he(`
    min-width: 220px;
    max-width: calc(100vw - 32px);
  `)}
`,Ae=s.a`
  display: flex;
  align-items: center;
  gap: ${n.spacing.sm};
  padding: ${n.spacing.sm} 14px;
  border-radius: ${n.borderRadius.small};
  text-decoration: none;
  color: ${n.colors.text.primary};
  font-size: ${n.fontSizes.sm};
  font-weight: 400;
  transition: background-color 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`,Ft=s.button`
  display: flex;
  align-items: center;
  gap: ${n.spacing.sm};
  padding: ${n.spacing.sm} 14px;
  border-radius: ${n.borderRadius.small};
  background-color: transparent;
  border: none;
  color: ${n.colors.danger};
  font-size: ${n.fontSizes.sm};
  font-weight: 400;
  transition: background-color 0.2s ease;
  cursor: pointer;
  width: 100%;
  text-align: left;

  &:hover {
    background-color: rgba(255, 59, 48, 0.08);
  }
`,Et=s.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`,Bt=s.span`
  font-size: ${n.fontSizes.xs};
  color: ${n.colors.text.secondary};
  font-weight: 400;
  margin-top: 2px;
`,Rt=s.div`
  height: 1px;
  background-color: rgba(0, 0, 0, 0.08);
  margin: ${n.spacing.sm} 0;
`,Mt=s.div`
  height: 1px;
  background-color: ${n.colors.borderLight};
  width: 100%;
`,Dt=({publicUsername:t,subscriptionInfo:u,calculatedBytesUsed:c,onNewAlbum:d,onSelectFiles:m,onSelectFolder:k})=>{const{t:a,language:b}=ce(),y=me(b)==="rtl",[p,f]=l.useState(!1),[$,i]=l.useState(dt),[S,v]=l.useState(!1),F=l.useRef(null);l.useEffect(()=>{v(!0);const B=()=>{if(typeof window<"u"){const Z=window.innerWidth<=768;i(Z)}};B();const z=ne=>{F.current&&!F.current.contains(ne.target)&&f(!1)},oe=()=>{B()};if(typeof window<"u")return document.addEventListener("mousedown",z),window.addEventListener("resize",oe),()=>{document.removeEventListener("mousedown",z),window.removeEventListener("resize",oe)}},[]);const R=()=>{if(!u)return"-- / -- GB";const B=(c/(1024*1024*1024)).toFixed(1),z=u.intNumberOfSubscriptions===0?10:u.intNumberOfSubscriptions*10;return`${B} / ${z} GB`},D=()=>{if(!t)return"Profile";const B=t.split(" ")[0];return B.length>12?B.substring(0,12)+"...":B},E=()=>{S&&typeof localStorage<"u"&&localStorage.clear(),le("index.html")},K=()=>{m?m():d&&d()},q=()=>{k&&k()};return e.jsx(e.Fragment,{children:e.jsxs(pt,{children:[e.jsxs(ft,{$isRTL:y,children:[e.jsxs(ut,{children:[e.jsx(gt,{src:je("images/logo_no_background.png"),alt:"6180 Logo"}),e.jsx(mt,{children:"6180"})]}),e.jsx(xt,{$isMobile:$,children:e.jsxs(ht,{children:[e.jsxs(bt,{onClick:K,children:[e.jsx(wt,{children:"+"}),a("New Album")]}),k&&e.jsxs(yt,{$isMobile:$,onClick:q,children:[e.jsx($t,{children:"📁"}),a("Upload Folder")]})]})}),e.jsxs(St,{children:[e.jsx(vt,{$isMobile:$,onClick:K,children:a("New Album")}),e.jsxs("div",{ref:F,style:{position:"relative"},children:[e.jsxs(Tt,{onClick:()=>f(!p),children:[e.jsx(kt,{children:D().charAt(0).toUpperCase()}),e.jsx(jt,{$isMobile:$,children:D()}),e.jsx(Ct,{$isOpen:p,viewBox:"0 0 12 12",children:e.jsx("path",{d:"M2.5 4.5L6 8L9.5 4.5",stroke:"currentColor",strokeWidth:"1.5",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})})]}),p&&e.jsxs(At,{$isRTL:y,children:[t&&e.jsxs(Ae,{href:`https://6180.io/${t}`,target:"_blank",rel:"noopener noreferrer",children:[e.jsx("span",{style:{fontSize:"16px"},children:"👤"}),a("View Public Profile")]}),e.jsxs(Ae,{href:je("storage/manage.html"),children:[e.jsx("span",{style:{fontSize:"16px"},children:"📦"}),e.jsxs(Et,{children:[e.jsx("span",{children:a("Storage")}),e.jsx(Bt,{children:R()})]})]}),e.jsx(Rt,{}),e.jsxs(Ft,{onClick:E,children:[e.jsx("span",{style:{fontSize:"16px"},children:"🚪"}),a("Log Out")]})]})]})]})]}),e.jsx(Mt,{})]})})},zt=s.div`
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
`,It=s.div`
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`,Lt=s.div`
  position: relative;
  max-width: 100%;
`,Pt=s.div`
  position: absolute;
  left: ${t=>t.$isRTL?"auto":"16px"};
  right: ${t=>t.$isRTL?"16px":"auto"};
  top: 50%;
  transform: translateY(-50%);
  color: #9CA3AF;
  pointer-events: none;
  z-index: 1;
`,Gt=s.input`
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
`,Ot=s.button`
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
`,ve=s.div`
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 8px;
  }
`,Te=s.div`
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
`,_t=s.button`
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
`,Ut=s.button`
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
`,Wt=s.button`
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
`,Nt=s.button`
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
`,Yt=s.div`
  margin-top: 8px;
  font-size: 13px;
  color: #555;
  font-style: italic;
  text-align: ${t=>t.$isRTL?"right":"left"};
`,Kt=s.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 8px 0;
`,Ht=({folders:t,searchQuery:u,setSearchQuery:c,onTagFilterChange:d,onContactFilterChange:m,resetTagFilter:k,resetContactFilter:a})=>{const{t:b,language:y}=ce(),p=me(y)==="rtl",[f,$]=l.useState(!1),[i,S]=l.useState([]),[v,F]=l.useState([]),[R,D]=l.useState(null),[E,K]=l.useState([]),[q,B]=l.useState([]),[z,oe]=l.useState([]),[ne,Z]=l.useState([]),de=o=>o.subtags.filter(g=>v.includes(g.key)),be=o=>{const g=de(o);if(g.length===0)return o.tagTitle;const T=g.map(x=>x.subtagTitle).join(", ");return`${o.tagTitle} (${T})`};l.useEffect(()=>{const o=new Map,g=new Map;t.forEach(h=>{const j=h.updatedAt?new Date(h.updatedAt).getTime():h.createdAt?new Date(h.createdAt).getTime():0;h.files.forEach(A=>{var W;(W=A.selectedTags)==null||W.forEach(L=>{var X;const te=`${L.TagType}-${L.tagTitle}`;if(!o.has(te))o.set(te,{tag:{key:te,TagType:L.TagType,tagTitle:L.tagTitle,timestamp:j,subtags:[]},timestamp:j});else{const P=o.get(te);j>P.timestamp&&(P.timestamp=j,P.tag.timestamp=j)}(X=L.subtags)==null||X.forEach(P=>{const pe=`${P.TagType}-${P.tagTitle}-${P.subtagTitle}`,fe=o.get(te).tag,r=fe.subtags.find(C=>C.key===pe);r?j>r.timestamp&&(r.timestamp=j):fe.subtags.push({key:pe,TagType:P.TagType,tagTitle:P.tagTitle,subtagTitle:P.subtagTitle,timestamp:j})})})}),h.contacts&&Object.values(h.contacts).forEach(A=>{if(typeof A=="string"&&!A.toString().startsWith("Profile-")){const W=g.get(A);(!W||j>W.timestamp)&&g.set(A,{name:A,timestamp:j})}})});const T=Array.from(o.values()).sort((h,j)=>j.timestamp-h.timestamp).map(h=>(h.tag.subtags.sort((j,A)=>A.timestamp-j.timestamp),h.tag)),x=Array.from(g.values()).sort((h,j)=>j.timestamp-h.timestamp).map(h=>h.name);S(T),K(T),B(x),Z(x)},[t]);const re=o=>{if(o.length===0){k(),K(i);return}const g=t.filter(T=>{const x=new Set;return T.files.forEach(h=>{var j;(j=h.selectedTags)==null||j.forEach(A=>{var W;x.add(`${A.TagType}-${A.tagTitle}`),(W=A.subtags)==null||W.forEach(L=>{x.add(`${L.TagType}-${L.tagTitle}-${L.subtagTitle}`)})})}),o.every(h=>x.has(h))});I(g),d(g)},ye=o=>{if(o.length===0){a(),Z(q);return}const g=t.filter(T=>{if(!T.contacts)return!1;const x=Object.values(T.contacts).filter(h=>typeof h=="string"&&!h.toString().startsWith("Profile-"));return o.every(h=>x.includes(h))});J(g),m(g)},Q=o=>{const g=v.includes(o.key),T=R===o.key;if(g){if(g&&!T)D(o.key);else if(g&&T){const x=v.filter(h=>h!==o.key&&!o.subtags.some(j=>j.key===h));F(x),D(null),re(x)}}else{const x=[...v,o.key];F(x),D(o.key),re(x)}},se=o=>{const g=v.includes(o.key);let T;g?T=v.filter(x=>x!==o.key):T=[...v,o.key],F(T),re(T)},we=o=>{let g;z.includes(o)?g=z.filter(T=>T!==o):g=[...z,o],oe(g),ye(g)},I=o=>{const g=new Set;o.forEach(x=>{x.files.forEach(h=>{var j;(j=h.selectedTags)==null||j.forEach(A=>{g.add(`${A.TagType}-${A.tagTitle}`)})})}),v.forEach(x=>{x.includes("-",x.indexOf("-")+1)||g.add(x)});const T=i.filter(x=>g.has(x.key));K(T)},J=o=>{const g=new Set;o.forEach(x=>{x.contacts&&Object.values(x.contacts).forEach(h=>{typeof h=="string"&&!h.toString().startsWith("Profile-")&&g.add(h)})}),z.forEach(x=>{g.add(x)});const T=q.filter(x=>g.has(x));Z(T)},U=R?i.find(o=>o.key===R):null,H=v.length,ie=z.length,V=q.length>0,ee=i.length>0;return!V&&!ee&&!u?null:e.jsxs(zt,{$isRTL:p,children:[e.jsx(It,{children:e.jsxs(Lt,{children:[e.jsx(Pt,{$isRTL:p,children:e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("circle",{cx:"11",cy:"11",r:"8"}),e.jsx("path",{d:"m21 21-4.35-4.35"})]})}),e.jsx(Gt,{$isRTL:p,type:"text",value:u,onChange:o=>c(o.target.value),placeholder:b("Search albums by title or description")}),u&&e.jsx(Ot,{$isRTL:p,onClick:()=>c(""),children:e.jsxs("svg",{width:"10",height:"10",viewBox:"0 0 24 24",fill:"none",stroke:"white",strokeWidth:"2",children:[e.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),e.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})}),(V||ee)&&e.jsxs(e.Fragment,{children:[e.jsx(ve,{children:e.jsxs(Te,{$isRTL:p,children:[V&&e.jsx(_t,{$isActive:f,onClick:()=>$(!f),title:b("Toggle contacts filter"),children:"👥"}),ee&&E.length>0?E.map(o=>{const g=de(o),T=g.length>0?`${o.TagType}: ${o.tagTitle} (${g.map(x=>x.subtagTitle).join(", ")})`:`Click to add/remove: ${o.TagType}: ${o.tagTitle}`;return e.jsx(Ut,{$isSelected:v.includes(o.key),$isDisplayed:R===o.key,onClick:()=>Q(o),title:T,children:be(o)},o.key)}):ee?e.jsx(Kt,{children:b("No tags available")}):null]})}),f&&V&&e.jsx(ve,{children:e.jsx(Te,{$isRTL:p,children:ne.map(o=>e.jsx(Wt,{$isSelected:z.includes(o),onClick:()=>we(o),title:`Click to add/remove: ${o}`,children:o},o))})}),U&&U.subtags.length>0&&e.jsx(ve,{children:e.jsx(Te,{$isRTL:p,children:U.subtags.map(o=>e.jsx(Nt,{$isSelected:v.includes(o.key),onClick:()=>se(o),title:`Click to add/remove: ${o.TagType}: ${o.tagTitle} → ${o.subtagTitle}`,children:o.subtagTitle},o.key))})}),(H>0||ie>0)&&e.jsx(Yt,{$isRTL:p,children:ie>0&&H>0?b("Showing albums with all selected contacts and tags"):ie>0?b("Showing albums with all selected contacts"):H>0?b("Showing albums with all selected tags"):""})]})]})},Vt=s.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(2px);
`,Jt=s.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
`,Xt=s.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  text-align: ${t=>t.$isRTL?"right":"left"};
`,qt=s.div`
  font-size: 24px;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #007bff, #0056b3);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`,Zt=s.div`
  flex: 1;
`,Qt=s.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #333;
  line-height: 1.2;
`,eo=s.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.4;
`,to=s.div`
  margin-bottom: 24px;
`,oo=s.div`
  display: flex;
  gap: 12px;
  justify-content: ${t=>t.$isRTL?"flex-start":"flex-end"};
  flex-direction: ${t=>t.$isRTL?"row-reverse":"row"};
`,no=s.button`
  padding: 12px 24px;
  background: transparent;
  border: 2px solid #dc3545;
  border-radius: 8px;
  color: #dc3545;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 100px;

  &:hover {
    background: #dc3545;
    color: white;
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`,so=s.button`
  padding: 12px 24px;
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  color: #495057;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 100px;

  &:hover {
    background: #e9ecef;
    border-color: #dee2e6;
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }
`,ro=({isVisible:t,albumName:u,progressTracker:c,isUploading:d,isProcessingFiles:m,isRTL:k,onCancel:a,onHide:b,canCancel:y,t:p})=>{if(!t)return null;const f=d||m,$=y&&f;return e.jsx(Vt,{onClick:i=>i.target===i.currentTarget&&b(),children:e.jsxs(Jt,{$isRTL:k,onClick:i=>i.stopPropagation(),children:[e.jsxs(Xt,{$isRTL:k,children:[e.jsx(qt,{children:"📸"}),e.jsxs(Zt,{children:[e.jsx(Qt,{children:p(u?"Adding Photos to Album":"Creating New Album")}),e.jsx(eo,{children:u||p("Uploading your photos...")})]})]}),e.jsx(to,{children:e.jsx(He,{progressTracker:c,isUploading:d,isProcessingFiles:m,isRTL:k,context:"uploading",showSuccessMessage:!1,showErrorMessage:!0,variant:"detailed",style:{background:"transparent",border:"none",padding:0}})}),e.jsxs(oo,{$isRTL:k,children:[$&&e.jsx(no,{onClick:a,children:p("Cancel Upload")}),!f&&e.jsx(so,{onClick:b,children:p("Close")})]})]})})},io=s.div`
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
`,Fe=s.div`
  margin-left: ${t=>t.$level*20}px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
`,ao=s.div`
  display: flex;
  flex-direction: column;
  gap: ${w.spacing.sm};
  margin-bottom: ${w.spacing.lg};
`,Ee=s.button`
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
`,Be=s.span`
  font-size: ${w.fontSizes.xl};
  flex-shrink: 0;
`,Re=s.div`
  flex: 1;
`,Me=s.div`
  font-weight: 600;
  color: ${w.colors.text.primary};
  margin-bottom: 4px;
`,De=s.div`
  font-size: ${w.fontSizes.sm};
  color: ${w.colors.text.secondary};
  line-height: 1.4;
`,lo=({isOpen:t,folderStructure:u,onChoice:c,onCancel:d})=>{const{t:m,language:k}=ce(),a=me(k)==="rtl",[b,y]=l.useState(!1);if(l.useEffect(()=>{y(!0)},[]),!t||!u)return null;const p=(i,S=0)=>{const v=[];return S===0&&v.push(e.jsxs(Fe,{$level:S,children:[e.jsx("span",{children:"📁"}),e.jsx("span",{children:i.name}),e.jsxs("span",{style:{color:w.colors.text.lighter,fontSize:"12px"},children:["(",i.files.length===1?m("{{count}} file",{count:i.files.length.toString()}):m("{{count}} files",{count:i.files.length.toString()}),")"]})]},i.path)),i.subfolders.forEach(F=>{const R=F.files.length+F.subfolders.reduce((D,E)=>D+E.files.length,0);v.push(e.jsxs(Fe,{$level:S+1,children:[e.jsx("span",{children:"📁"}),e.jsx("span",{children:F.name}),e.jsxs("span",{style:{color:w.colors.text.lighter,fontSize:"12px"},children:["(",R===1?m("{{count}} file",{count:R.toString()}):m("{{count}} files",{count:R.toString()}),")"]})]},F.path)),S<1&&F.subfolders.length>0&&v.push(...p(F,S+2))}),v},f=i=>{if(typeof window<"u"&&window.sessionStorage)try{sessionStorage.setItem("album_creation_preference",i)}catch(S){console.warn("Failed to store album creation preference:",S)}c(i)},$=e.jsx(Ve,{onClick:d,children:e.jsxs(Je,{$isRTL:a,onClick:i=>i.stopPropagation(),children:[e.jsx(Xe,{children:m("Create Multiple Albums?")}),e.jsx(qe,{children:m("We noticed your folder contains subfolders. Would you like to create a separate album for each subfolder, or treat them all as one album?")}),e.jsx(io,{children:p(u)}),e.jsxs(ao,{children:[e.jsxs(Ee,{onClick:()=>f("separate"),children:[e.jsx(Be,{children:"📁"}),e.jsxs(Re,{children:[e.jsx(Me,{children:m("Separate albums by folder")}),e.jsx(De,{children:m('Each subfolder becomes a different album (e.g., "Day1", "Day2")')})]})]}),e.jsxs(Ee,{onClick:()=>f("combined"),children:[e.jsx(Be,{children:"🔗"}),e.jsxs(Re,{children:[e.jsx(Me,{children:m("Combine all into one album")}),e.jsx(De,{children:m("All files are merged into one album")})]})]})]}),e.jsx(Ze,{onClick:d,children:m("Cancel")})]})});return b?ot.createPortal($,document.body):null},ze=10,ke=3,co=t=>t.name.startsWith(".DS_Store")||t.name.startsWith("._")||t.name.startsWith("Thumbs.db")||t.name.startsWith(".")||t.name==="desktop.ini"||!/\.(jpg|jpeg|png|gif|bmp|webp|svg|mp4|mov|avi|wmv|flv|webm|mkv)$/i.test(t.name)?!1:t.size>0,po=t=>{const u=[];let c=0;for(const d of t){if(!d||!d.name){c++;continue}co(d)?u.push(d):c++}return{validFiles:u,filteredCount:c}},Ie=xe.forwardRef(({onFileSelection:t,onFolderSelection:u},c)=>e.jsxs("div",{style:{display:"none"},children:[e.jsx("input",{ref:c,id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:t,style:{display:"none"}}),e.jsx("input",{id:"folder-input",type:"file",accept:"image/*,video/*",multiple:!0,webkitdirectory:"",onChange:u,style:{display:"none"}})]}));Ie.displayName="EnhancedFileInput";const Le=xe.memo(({t,isRTL:u})=>e.jsx("div",{style:{padding:"20px 24px",marginTop:"20px",marginBottom:"20px",backgroundColor:"#fff",border:"1px solid #ddd",borderRadius:"8px",textAlign:u?"right":"left",direction:u?"rtl":"ltr",boxShadow:"0 1px 3px rgba(0,0,0,0.1)",position:"relative"},children:e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"16px"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:"18px",fontWeight:"600",marginBottom:"4px",color:"#333",lineHeight:"1.3"},children:t("Use the 6180 app to showcase your albums offline")}),e.jsx("div",{style:{fontSize:"14px",color:"#666",lineHeight:"1.4",fontWeight:"400"},children:t("Intelligently tagged and beautifully organized")})]}),e.jsxs("div",{style:{display:"flex",gap:"12px",alignItems:"center",flexShrink:0},children:[e.jsxs("a",{href:"https://apps.apple.com/app/6180/id6468679610",target:"_blank",rel:"noopener noreferrer",style:{display:"inline-flex",alignItems:"center",gap:"8px",padding:"8px 16px",backgroundColor:"#007bff",borderRadius:"8px",textDecoration:"none",color:"white",fontSize:"14px",fontWeight:"500",transition:"all 0.2s ease",whiteSpace:"nowrap",border:"none",cursor:"pointer"},onMouseEnter:c=>{c.currentTarget.style.backgroundColor="#0056b3",c.currentTarget.style.transform="translateY(-1px)"},onMouseLeave:c=>{c.currentTarget.style.backgroundColor="#007bff",c.currentTarget.style.transform="translateY(0)"},children:[e.jsx("span",{style:{fontSize:"16px"},children:"🍎"}),t("Open On iOS")]}),e.jsxs("a",{href:"https://play.google.com/store/apps/details?id=io.i6180.android",target:"_blank",rel:"noopener noreferrer",style:{display:"inline-flex",alignItems:"center",gap:"8px",padding:"8px 16px",backgroundColor:"#007bff",borderRadius:"8px",textDecoration:"none",color:"white",fontSize:"14px",fontWeight:"500",transition:"all 0.2s ease",whiteSpace:"nowrap",border:"none",cursor:"pointer"},onMouseEnter:c=>{c.currentTarget.style.backgroundColor="#0056b3",c.currentTarget.style.transform="translateY(-1px)"},onMouseLeave:c=>{c.currentTarget.style.backgroundColor="#007bff",c.currentTarget.style.transform="translateY(0)"},children:[e.jsx("span",{style:{fontSize:"16px"},children:"🤖"}),t("Open On Android")]})]})]})}));Le.displayName="AppDownloadPromotion";const fo=t=>t/(1024*1024*1024),ge=t=>t<1?`${Math.round(t*1e3)} MB`:`${t.toFixed(1)} GB`,Pe=(t,u,c)=>{if(!u)return[];const{intNumberOfSubscriptions:d}=u;let m=[];if(d===0){const k=ze*1024*1024*1024;if(t.length>5){const a=[...t].sort((p,f)=>{const $=new Date(p.createdAt||0).getTime(),i=new Date(f.createdAt||0).getTime();return $-i}),b=t.length-5;m=[...a.slice(0,b)]}if(c>k){const a=[...t].sort((f,$)=>{const i=new Date(f.createdAt||0).getTime(),S=new Date($.createdAt||0).getTime();return i-S});let b=c-k;const y=[];for(const f of a){if(b<=0)break;const $=f.files.reduce((i,S)=>i+(S.dataInBytes||0),0);y.push(f),b-=$}const p=new Set(m.map(f=>f.folderId));for(const f of y)p.has(f.folderId)||m.push(f)}}else{const k=d*10*1024*1024*1024;if(c>k){const a=[...t].sort((y,p)=>{const f=new Date(y.createdAt||0).getTime(),$=new Date(p.createdAt||0).getTime();return f-$});let b=c-k;for(const y of a){if(b<=0)break;const p=y.files.reduce((f,$)=>f+($.dataInBytes||0),0);m.push(y),b-=p}}}return m},Ge=xe.memo(({albumsToDelete:t,isRTL:u})=>{const{t:c}=ce(),[d,m]=l.useState(!1);l.useEffect(()=>{m(!0)},[]);const k=l.useMemo(()=>d?t.map(a=>({...a,formattedDate:a.createdAt?new Date(a.createdAt).toLocaleDateString():null})):t.map(a=>({...a,formattedDate:null})),[t,d]);return t.length===0?null:e.jsx("div",{style:{marginTop:"16px"},children:k.map(a=>e.jsx("div",{style:{marginBottom:"20px",direction:u?"rtl":"ltr"},children:e.jsxs("div",{style:{background:"#fff",border:"2px solid #dc3545",borderRadius:"12px",padding:"20px",position:"relative",overflow:"hidden",opacity:"0.85"},children:[e.jsx("div",{style:{marginTop:"30px",marginBottom:"16px",display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexDirection:u?"row-reverse":"row"},children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:u?"flex-end":"flex-start"},children:[e.jsx("h3",{style:{fontSize:"18px",margin:"0 0 4px 0",color:"#dc3545",fontWeight:"bold"},children:a.folderName||"Untitled Album"}),e.jsxs("div",{style:{fontSize:"13px",color:"#666",textAlign:u?"right":"left"},children:[a.formattedDate&&e.jsxs("div",{children:[c("Created"),": ",a.formattedDate]}),e.jsx("div",{children:a.files.length===1?c("{{count}} file",{count:a.files.length.toString()}):c("{{count}} files",{count:a.files.length.toString()})})]})]})}),a.folderDescription&&a.folderDescription.length>1&&e.jsx("div",{style:{fontSize:"14px",color:"#555",marginBottom:"16px",textAlign:u?"right":"left",fontStyle:"italic"},children:a.folderDescription}),e.jsxs("div",{style:{width:"100%",position:"relative"},children:[e.jsxs("div",{style:{display:"flex",overflowX:"auto",gap:"12px",paddingBottom:"8px",msOverflowStyle:"none",scrollbarWidth:"thin",WebkitOverflowScrolling:"touch",maxWidth:"100%",flexDirection:u?"row-reverse":"row"},children:[a.files.slice(0,ke).map((b,y)=>e.jsxs("div",{style:{width:"160px",height:"100px",flexShrink:0,position:"relative",borderRadius:"6px",overflow:"hidden",border:"2px solid #dc3545"},children:[e.jsx(tt,{thumbnailDataKey:b.thumbnailDataKey,dataKey:b.dataKey,alt:c("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover"}}),e.jsx("div",{style:{position:"absolute",top:"0",left:"0",right:"0",bottom:"0",background:"rgba(220, 53, 69, 0.3)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"24px"},children:"❌"})]},y)),a.files.length>ke&&e.jsxs("div",{style:{width:"160px",height:"100px",flexShrink:0,position:"relative",borderRadius:"6px",border:"2px dashed #dc3545",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"#f8f9fa",color:"#dc3545",fontSize:"14px",fontWeight:"bold"},children:["+",a.files.length-ke," more"]})]}),a.files.length>2&&e.jsx("div",{style:{position:"absolute",[u?"left":"right"]:0,top:0,bottom:8,width:"30px",background:u?"linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))":"linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))",pointerEvents:"none"}})]})]})},a.folderId))})});Ge.displayName="AlbumDeletionPreview";const Oe=xe.memo(({subscriptionInfo:t,albumCount:u,folders:c,calculatedBytesUsed:d,t:m,isRTL:k})=>{const a=l.useMemo(()=>t?Pe(c,t,d):[],[c,t,d]);if(!t)return null;const{intNumberOfSubscriptions:b}=t,y=fo(d);let p="none",f="";if(b===0){const i=ze,S=u>5,v=y>i;!S&&!v?(p="free-space",f=m("You can save 5 albums that total a maximum of {FREE_TIER_STORAGE_LIMIT_GB} GB for free. Delete unused albums to make space.").replace("{FREE_TIER_STORAGE_LIMIT_GB}",i.toString())):S&&v?(p="free-both-exceeded",f=m("You have over 5 albums AND your files occupy {formatGB(usedGB)} space (limit: {FREE_TIER_STORAGE_LIMIT_GB} GB). These albums are being automatically deleted unless you decide to delete other albums:").replace("{formatGB(usedGB)}",ge(y)).replace("{FREE_TIER_STORAGE_LIMIT_GB}",i.toString())):S?(p="free-count-exceeded",f=m("You have {albumCount} albums but can only save 5 for free. These oldest albums are being automatically deleted unless you decide to delete other albums:").replace("{albumCount}",u.toString())):v&&(p="free-storage-exceeded",f=m("Your files occupy {formatGB(usedGB)} space, but you only have {FREE_TIER_STORAGE_LIMIT_GB} GB storage. These albums are being automatically deleted unless you decide to delete other albums:").replace("{formatGB(usedGB)}",ge(y)).replace("{FREE_TIER_STORAGE_LIMIT_GB}",i.toString()))}else{const i=b*10,S=i-y;S<0?(p="paid-exceeded",f=m("Your files occupy {formatGB(usedGB)} space, but you only have {totalStorageGB} GB storage. These albums are being automatically deleted unless you decide to delete other albums:").replace("{formatGB(usedGB)}",ge(y)).replace("{totalStorageGB}",i.toString())):S<1.5&&(p="paid-warning",f=m("Your files occupy {formatGB(usedGB)} of {totalStorageGB} GB storage. You may need to upgrade your subscription soon.").replace("{formatGB(usedGB)}",ge(y)).replace("{totalStorageGB}",i.toString()))}if(p==="none")return null;const $=["free-count-exceeded","free-storage-exceeded","free-both-exceeded","paid-exceeded"].includes(p);return e.jsxs("div",{style:{padding:"12px 20px",marginBottom:"16px",backgroundColor:$?"#fff3cd":"#f8f9fa",border:`1px solid ${$?"#ffeaa7":"#e9ecef"}`,borderRadius:"8px",color:$?"#856404":"#6c757d",fontSize:"14px",textAlign:k?"right":"left",direction:k?"rtl":"ltr"},children:[f,$&&a.length>0&&e.jsx(Ge,{albumsToDelete:a,isRTL:k}),e.jsx("div",{style:{marginTop:"12px"},children:e.jsx("a",{href:je("storage/manage.html"),style:{color:"#007bff",textDecoration:"underline",cursor:"pointer",fontWeight:"bold"},onMouseEnter:i=>{i.currentTarget.style.color="#0056b3"},onMouseLeave:i=>{i.currentTarget.style.color="#007bff"},children:m("Click To Upgrade Subscription (US$1 monthly per 10 GB)")})})]})});Oe.displayName="StorageMessage";const uo=()=>{const{t,language:u}=ce(),c=me(u)==="rtl",[d,m]=l.useState(!1),[k,a]=l.useState(!1),[b,y]=l.useState(null),[p,f]=l.useState([]),[$,i]=l.useState(!1),[S,v]=l.useState(!1),[F,R]=l.useState(null),D=l.useRef(null);l.useEffect(()=>{m(!0)},[]);const{folders:E,filteredFolders:K,publicUsername:q,cognitoUsername:B,searchQuery:z,setSearchQuery:oe,handleContactFilterChange:ne,resetContactFilter:Z,handleTagFilterChange:de,resetTagFilter:be,handleDeleteClick:re,setFolders:ye,subscriptionInfo:Q,calculatedBytesUsed:se}=ct(r=>{(r.includes("Error")||r.includes("Failed"))&&console.error(r)}),we=l.useCallback(r=>{if(d){try{if(nt()){const M=localStorage.getItem(ue.SELECTED_PHOTOS);if(M){const N=JSON.parse(M),G=st(N);if(G.length>1){const Y=G.map(O=>({name:O.name,selectedPhotos:O.selectedPhotos,folderPath:O.folderPath}));localStorage.setItem(ue.MULTI_ALBUM_DATA,JSON.stringify(Y)),_(),le("save-album.html?mode=multiple");return}else _()}else _()}}catch(C){console.error("Error processing multi-album data:",C),typeof _=="function"&&_()}if($)i(!1),console.log("🎯 Navigating to save-album for new album"),le("save-album.html");else if(r){const C=`save-album.html?folderId=${encodeURIComponent(r)}`;console.log(`🎯 Navigating to save-album with folderId: ${r}`),le(C)}else console.log("🎯 Fallback navigation to save-album"),le("save-album.html")}},[d,$]),I=Qe(we,!1),{fileInputRef:J,isUploading:U,isProcessingFiles:H,progressTracker:ie,setSelectedPhotos:V,clearUploadData:ee}=I;l.useEffect(()=>{(U||H)&&!S&&v(!0)},[U,H,S]),l.useEffect(()=>{if(!U&&!H&&S){const r=setTimeout(()=>{v(!1),R(null)},2e3);return()=>clearTimeout(r)}},[U,H,S]),l.useEffect(()=>{if(!d)return;(async()=>{try{await Ke()}catch(C){console.warn("Credential prewarming failed:",C)}})()},[d]);const o=l.useMemo(()=>Q?Pe(E,Q,se):[],[E,Q,se]),g=l.useMemo(()=>new Set(o.map(r=>r.folderId)),[o]),T=l.useMemo(()=>K.filter(r=>!g.has(r.folderId)),[K,g]),x=l.useCallback(r=>{if(d)try{console.log(`🎯 Starting Add Photos flow for existing album: ${r}`);const C=E.find(N=>N.folderId===r),M=(C==null?void 0:C.folderName)||"Untitled Album";i(!1),R(M),Se(),_(),localStorage.removeItem(ue.MULTI_ALBUM_DATA),V([]),I.openFilePicker(r),console.log(`📂 Opened file picker to add photos to album: ${r}`)}catch(C){console.error("Error opening file picker for existing album:",C),alert("Sorry, there was an error opening the file picker. Please try again.")}},[I,V,d,E]),h=l.useCallback(()=>{try{ee(),v(!1),R(null),i(!1),console.log("Upload cancelled by user")}catch(r){console.error("Error cancelling upload:",r)}},[ee]),j=l.useCallback(()=>{v(!1)},[]),A=l.useCallback(async r=>{if(!d)return!1;const C=Array.from(r.target.files||[]);if(!C.length)return!1;F||R(null);const{validFiles:M,filteredCount:N}=po(C);if(M.length===0)return alert("No valid image or video files were selected. Please select media files."),!1;N>0&&console.log(`Filtered out ${N} invalid/system files`);const G=rt(M);if(G&&it(G)){const Y=at();if(Y){Ce(G,Y,M);const O=new DataTransfer;M.forEach($e=>O.items.add($e));const ae={...r,target:{...r.target,files:O.files}};try{await I.handleFileSelection(ae,B)}catch($e){console.error("Error in file upload:",$e),_()}}else y(G),f(M),a(!0)}else{const Y=new DataTransfer;M.forEach(ae=>Y.items.add(ae));const O={...r,target:{...r.target,files:Y.files}};try{await I.handleFileSelection(O,B)}catch(ae){console.error("Error in single album file selection:",ae)}}return!0},[I,B,d,F]),W=l.useCallback((r,C,M)=>{if(!d)return;lt(r),Ce(M,r,C),a(!1),y(null),f([]);const N=J.current;if(N)try{const G=new DataTransfer;C.forEach(O=>{O&&O.name&&G.items.add(O)}),N.files=G.files;const Y=new Event("change",{bubbles:!0});Object.defineProperty(Y,"target",{writable:!1,value:N}),I.handleFileSelection(Y,B)}catch(G){console.error("Error in album creation flow:",G),_()}else console.error("File input ref not available"),_()},[I,B,J,d]),L=l.useCallback(async r=>A(r),[A]),te=l.useCallback(()=>{a(!1),y(null),f([]),i(!1),J.current&&(J.current.value=""),D.current&&(D.current.value=""),d&&(Se(),_())},[J,d]),X=l.useCallback((r=null,C="files")=>{if(d)try{if(i(r===null),r===null&&R(null),Se(),_(),localStorage.removeItem(ue.MULTI_ALBUM_DATA),V([]),C==="folder")if(D.current)D.current.click();else throw new Error("Folder picker not available");else I.openFilePicker(r)}catch(M){console.error("Error opening file picker:",M),i(!1),alert("Sorry, there was an error opening the file picker. Please try again.")}},[I,V,d]),P=l.useCallback(()=>{try{X(null,"files")}catch(r){console.error("Error selecting files:",r)}},[X]),pe=l.useCallback(()=>{try{X(null,"folder")}catch(r){console.error("Error selecting folder:",r)}},[X]),fe=z.length>0||E.some(r=>r.contacts&&Object.keys(r.contacts).length>0||r.files.some(C=>C.selectedTags&&C.selectedTags.length>0));return e.jsxs(e.Fragment,{children:[e.jsx(Ne,{}),e.jsxs(Ye,{$isRTL:c,children:[e.jsx(Dt,{publicUsername:q,subscriptionInfo:Q,calculatedBytesUsed:se,onNewAlbum:()=>X(null,"files"),onSelectFiles:P,onSelectFolder:pe}),E.length>3&&e.jsx(Oe,{subscriptionInfo:Q,albumCount:E.length,folders:E,calculatedBytesUsed:se,t,isRTL:c}),E.length<=3&&e.jsx(Le,{t,isRTL:c}),fe&&e.jsx(Ht,{folders:E,searchQuery:z,setSearchQuery:oe,onTagFilterChange:de,onContactFilterChange:ne,resetTagFilter:be,resetContactFilter:Z}),e.jsx(et,{folders:T,setFolders:ye,handleDeleteClick:r=>re(r,t),isUploading:U,cognitoUsername:B,isProfileView:!1,onAddPhotos:x}),e.jsx(Ie,{ref:J,onFileSelection:A,onFolderSelection:L}),e.jsx("input",{ref:D,type:"file",accept:"image/*,video/*",multiple:!0,webkitdirectory:"",onChange:L,style:{display:"none"}}),e.jsx(ro,{isVisible:S,albumName:F,progressTracker:ie,isUploading:U,isProcessingFiles:H,isRTL:c,onCancel:h,onHide:j,canCancel:!0,t}),e.jsx(lo,{isOpen:k,folderStructure:b,onChoice:r=>W(r,p,b),onCancel:te})]})]})},go=()=>e.jsx(We,{children:e.jsx(uo,{})});typeof window<"u"&&document.getElementById("root")&&Ue.createRoot(document.getElementById("root")).render(e.jsx(go,{}));
