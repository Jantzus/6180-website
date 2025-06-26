import{d as r,q as Be,u as se,r as x,j as e,b as me,g as oe,a as te,o as le,R as Ee,I as Re,L as fe,p as ze}from"./utils-BM__RYiI.js";import{u as De,U as Ie}from"./UploadProgress-Cm08sL_0.js";import{G as Me,A as Le}from"./styled-components-BL7UYftG.js";import{A as Ge}from"./AlbumList-D_uXmqB8.js";import{L as Pe}from"./LazyImage-DcEfsjeK.js";import{R as Oe}from"./DownloadModal-CKECtVRR.js";import{a as _e,b as Ue,c as L,d as We,h as Ye,e as Ne,s as he,f as Ke,i as be}from"./folderStructureUtils-BmdkosLC.js";import{u as Ve}from"./useFolderManagement-DVNXarZa.js";import"./types-CyPfckSQ.js";const He=!1,s={colors:{primary:"#007bff",primaryDark:"#0056b3",danger:"#e53935",white:"#fff",grayLight:"#e0e0e0",borderLight:"#eaeaea",text:{primary:"#333",secondary:"#666",white:"#fff"}},spacing:{sm:"8px",md:"16px"},borderRadius:{small:"4px",medium:"8px",large:"16px",circle:"50%"},fontSizes:{xs:"12px",sm:"14px",lg:"18px",xl:"20px"},boxShadow:{primaryBtn:"0 4px 12px rgba(0, 123, 255, 0.2)",xl:"0 8px 24px rgba(0,0,0,0.2)"},breakpoints:{mobile:"767px"}},ce=t=>Be`
  @media (max-width: ${s.breakpoints.mobile}) {
    ${t}
  }
`,Je=r.header`
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
`,Xe=r.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${s.spacing.md}; /* Reduced from lg to md to match content */
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
  
  ${ce(`
    padding: 0 ${s.spacing.md};
  `)}
`,qe=r.div`
  display: flex;
  align-items: center;
  gap: ${s.spacing.sm};
  flex: 0 0 auto;
`,Ze=r.img`
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
  
  ${ce(`
    width: 24px;
    height: 24px;
  `)}
`,Qe=r.h1`
  font-size: ${s.fontSizes.xl};
  font-weight: 600;
  color: ${s.colors.text.primary};
  margin: 0;
  letter-spacing: -0.01em;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif;
  
  ${ce(`
    font-size: ${s.fontSizes.lg};
  `)}
`,et=r.div`
  flex: 1 1 auto;
  display: ${t=>t.$isMobile?"none":"flex"};
  justify-content: center;
  padding: 0 ${s.spacing.md};
  
  @media (max-width: 768px) {
    display: none;
  }
`,tt=r.div`
  display: inline-flex;
  gap: ${s.spacing.sm};
  align-items: center;
`,ot=r.button`
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
`,st=r.button`
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
`,nt=r.span`
  font-size: 18px;
  line-height: 1;
  font-weight: 300;
`,rt=r.span`
  font-size: 16px;
  line-height: 1;
`,it=r.div`
  flex: 0 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  gap: ${s.spacing.sm};
`,at=r.button`
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
`,lt=r.button`
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
`,ct=r.div`
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
`,dt=r.span`
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: ${t=>t.$isMobile?"none":"inline"};

  @media (max-width: 768px) {
    display: none;
  }
`,pt=r.svg`
  width: 12px;
  height: 12px;
  transform: ${t=>t.$isOpen?"rotate(180deg)":"rotate(0deg)"};
  transition: transform 0.2s ease;
  opacity: 0.6;
`,ft=r.div`
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

  ${ce(`
    min-width: 220px;
    max-width: calc(100vw - 32px);
  `)}
`,ye=r.a`
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
`,ut=r.button`
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
`,gt=r.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`,xt=r.span`
  font-size: ${s.fontSizes.xs};
  color: ${s.colors.text.secondary};
  font-weight: 400;
  margin-top: 2px;
`,mt=r.div`
  height: 1px;
  background-color: rgba(0, 0, 0, 0.08);
  margin: ${s.spacing.sm} 0;
`,ht=r.div`
  height: 1px;
  background-color: ${s.colors.borderLight};
  width: 100%;
`,bt=({publicUsername:t,subscriptionInfo:d,calculatedBytesUsed:c,onNewAlbum:i,onSelectFiles:g,onSelectFolder:C})=>{const{t:v,language:T}=se(),S=oe(T)==="rtl",[m,p]=x.useState(!1),[$,a]=x.useState(He),[y,b]=x.useState(!1),B=x.useRef(null);x.useEffect(()=>{b(!0);const I=()=>{if(typeof window<"u"){const Y=window.innerWidth<=768;a(Y)}};I();const R=H=>{B.current&&!B.current.contains(H.target)&&p(!1)},V=()=>{I()};if(typeof window<"u")return document.addEventListener("mousedown",R),window.addEventListener("resize",V),()=>{document.removeEventListener("mousedown",R),window.removeEventListener("resize",V)}},[]);const D=()=>{if(!d)return"-- / -- GB";const I=(c/(1024*1024*1024)).toFixed(1),R=d.intNumberOfSubscriptions===0?10:d.intNumberOfSubscriptions*10;return`${I} / ${R} GB`},E=()=>{if(!t)return"Profile";const I=t.split(" ")[0];return I.length>12?I.substring(0,12)+"...":I},G=()=>{y&&typeof localStorage<"u"&&localStorage.clear(),te("index.html")},P=()=>{g?g():i&&i()},W=()=>{C&&C()};return e.jsx(e.Fragment,{children:e.jsxs(Je,{children:[e.jsxs(Xe,{$isRTL:S,children:[e.jsxs(qe,{children:[e.jsx(Ze,{src:me("images/logo_no_background.png"),alt:"6180 Logo"}),e.jsx(Qe,{children:"6180"})]}),e.jsx(et,{$isMobile:$,children:e.jsxs(tt,{children:[e.jsxs(ot,{onClick:P,children:[e.jsx(nt,{children:"+"}),v("New Album")]}),C&&e.jsxs(st,{$isMobile:$,onClick:W,children:[e.jsx(rt,{children:"📁"}),v("Upload Folder")]})]})}),e.jsxs(it,{children:[e.jsx(at,{$isMobile:$,onClick:P,children:v("New Album")}),e.jsxs("div",{ref:B,style:{position:"relative"},children:[e.jsxs(lt,{onClick:()=>p(!m),children:[e.jsx(ct,{children:E().charAt(0).toUpperCase()}),e.jsx(dt,{$isMobile:$,children:E()}),e.jsx(pt,{$isOpen:m,viewBox:"0 0 12 12",children:e.jsx("path",{d:"M2.5 4.5L6 8L9.5 4.5",stroke:"currentColor",strokeWidth:"1.5",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})})]}),m&&e.jsxs(ft,{$isRTL:S,children:[t&&e.jsxs(ye,{href:`https://6180.io/${t}`,target:"_blank",rel:"noopener noreferrer",children:[e.jsx("span",{style:{fontSize:"16px"},children:"👤"}),v("View Public Profile")]}),e.jsxs(ye,{href:me("storage/manage.html"),children:[e.jsx("span",{style:{fontSize:"16px"},children:"📦"}),e.jsxs(gt,{children:[e.jsx("span",{children:v("Storage")}),e.jsx(xt,{children:D()})]})]}),e.jsx(mt,{}),e.jsxs(ut,{onClick:G,children:[e.jsx("span",{style:{fontSize:"16px"},children:"🚪"}),v("Log Out")]})]})]})]})]}),e.jsx(ht,{})]})})},yt=r.div`
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
`,wt=r.div`
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`,St=r.div`
  position: relative;
  max-width: 100%;
`,$t=r.div`
  position: absolute;
  left: ${t=>t.$isRTL?"auto":"16px"};
  right: ${t=>t.$isRTL?"16px":"auto"};
  top: 50%;
  transform: translateY(-50%);
  color: #9CA3AF;
  pointer-events: none;
  z-index: 1;
`,Tt=r.input`
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
`,vt=r.button`
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
`,ue=r.div`
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 8px;
  }
`,ge=r.div`
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
`,kt=r.button`
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
`,jt=r.button`
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
`,Ct=r.button`
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
`,Ft=r.button`
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
`,At=r.div`
  margin-top: 8px;
  font-size: 13px;
  color: #555;
  font-style: italic;
  text-align: ${t=>t.$isRTL?"right":"left"};
`,Bt=r.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 8px 0;
`,Et=({folders:t,searchQuery:d,setSearchQuery:c,onTagFilterChange:i,onContactFilterChange:g,resetTagFilter:C,resetContactFilter:v})=>{const{t:T,language:S}=se(),m=oe(S)==="rtl",[p,$]=x.useState(!1),[a,y]=x.useState([]),[b,B]=x.useState([]),[D,E]=x.useState(null),[G,P]=x.useState([]),[W,I]=x.useState([]),[R,V]=x.useState([]),[H,Y]=x.useState([]),O=o=>o.subtags.filter(l=>b.includes(l.key)),J=o=>{const l=O(o);if(l.length===0)return o.tagTitle;const w=l.map(f=>f.subtagTitle).join(", ");return`${o.tagTitle} (${w})`};x.useEffect(()=>{const o=new Map,l=new Map;t.forEach(u=>{const n=u.updatedAt?new Date(u.updatedAt).getTime():u.createdAt?new Date(u.createdAt).getTime():0;u.files.forEach(h=>{var j;(j=h.selectedTags)==null||j.forEach(F=>{var z;const A=`${F.TagType}-${F.tagTitle}`;if(!o.has(A))o.set(A,{tag:{key:A,TagType:F.TagType,tagTitle:F.tagTitle,timestamp:n,subtags:[]},timestamp:n});else{const k=o.get(A);n>k.timestamp&&(k.timestamp=n,k.tag.timestamp=n)}(z=F.subtags)==null||z.forEach(k=>{const U=`${k.TagType}-${k.tagTitle}-${k.subtagTitle}`,Z=o.get(A).tag,pe=Z.subtags.find(Ae=>Ae.key===U);pe?n>pe.timestamp&&(pe.timestamp=n):Z.subtags.push({key:U,TagType:k.TagType,tagTitle:k.tagTitle,subtagTitle:k.subtagTitle,timestamp:n})})})}),u.contacts&&Object.values(u.contacts).forEach(h=>{if(typeof h=="string"&&!h.toString().startsWith("Profile-")){const j=l.get(h);(!j||n>j.timestamp)&&l.set(h,{name:h,timestamp:n})}})});const w=Array.from(o.values()).sort((u,n)=>n.timestamp-u.timestamp).map(u=>(u.tag.subtags.sort((n,h)=>h.timestamp-n.timestamp),u.tag)),f=Array.from(l.values()).sort((u,n)=>n.timestamp-u.timestamp).map(u=>u.name);y(w),P(w),I(f),Y(f)},[t]);const M=o=>{if(o.length===0){C(),P(a);return}const l=t.filter(w=>{const f=new Set;return w.files.forEach(u=>{var n;(n=u.selectedTags)==null||n.forEach(h=>{var j;f.add(`${h.TagType}-${h.tagTitle}`),(j=h.subtags)==null||j.forEach(F=>{f.add(`${F.TagType}-${F.tagTitle}-${F.subtagTitle}`)})})}),o.every(u=>f.has(u))});re(l),i(l)},_=o=>{if(o.length===0){v(),Y(W);return}const l=t.filter(w=>{if(!w.contacts)return!1;const f=Object.values(w.contacts).filter(u=>typeof u=="string"&&!u.toString().startsWith("Profile-"));return o.every(u=>f.includes(u))});ie(l),g(l)},Q=o=>{const l=b.includes(o.key),w=D===o.key;if(l){if(l&&!w)E(o.key);else if(l&&w){const f=b.filter(u=>u!==o.key&&!o.subtags.some(n=>n.key===u));B(f),E(null),M(f)}}else{const f=[...b,o.key];B(f),E(o.key),M(f)}},ne=o=>{const l=b.includes(o.key);let w;l?w=b.filter(f=>f!==o.key):w=[...b,o.key],B(w),M(w)},de=o=>{let l;R.includes(o)?l=R.filter(w=>w!==o):l=[...R,o],V(l),_(l)},re=o=>{const l=new Set;o.forEach(f=>{f.files.forEach(u=>{var n;(n=u.selectedTags)==null||n.forEach(h=>{l.add(`${h.TagType}-${h.tagTitle}`)})})}),b.forEach(f=>{f.includes("-",f.indexOf("-")+1)||l.add(f)});const w=a.filter(f=>l.has(f.key));P(w)},ie=o=>{const l=new Set;o.forEach(f=>{f.contacts&&Object.values(f.contacts).forEach(u=>{typeof u=="string"&&!u.toString().startsWith("Profile-")&&l.add(u)})}),R.forEach(f=>{l.add(f)});const w=W.filter(f=>l.has(f));Y(w)},X=D?a.find(o=>o.key===D):null,ee=b.length,N=R.length,q=W.length>0,K=a.length>0;return!q&&!K&&!d?null:e.jsxs(yt,{$isRTL:m,children:[e.jsx(wt,{children:e.jsxs(St,{children:[e.jsx($t,{$isRTL:m,children:e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("circle",{cx:"11",cy:"11",r:"8"}),e.jsx("path",{d:"m21 21-4.35-4.35"})]})}),e.jsx(Tt,{$isRTL:m,type:"text",value:d,onChange:o=>c(o.target.value),placeholder:T("Search albums by title or description")}),d&&e.jsx(vt,{$isRTL:m,onClick:()=>c(""),children:e.jsxs("svg",{width:"10",height:"10",viewBox:"0 0 24 24",fill:"none",stroke:"white",strokeWidth:"2",children:[e.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),e.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})}),(q||K)&&e.jsxs(e.Fragment,{children:[e.jsx(ue,{children:e.jsxs(ge,{$isRTL:m,children:[q&&e.jsx(kt,{$isActive:p,onClick:()=>$(!p),title:T("Toggle contacts filter"),children:"👥"}),K&&G.length>0?G.map(o=>{const l=O(o),w=l.length>0?`${o.TagType}: ${o.tagTitle} (${l.map(f=>f.subtagTitle).join(", ")})`:`Click to add/remove: ${o.TagType}: ${o.tagTitle}`;return e.jsx(jt,{$isSelected:b.includes(o.key),$isDisplayed:D===o.key,onClick:()=>Q(o),title:w,children:J(o)},o.key)}):K?e.jsx(Bt,{children:T("No tags available")}):null]})}),p&&q&&e.jsx(ue,{children:e.jsx(ge,{$isRTL:m,children:H.map(o=>e.jsx(Ct,{$isSelected:R.includes(o),onClick:()=>de(o),title:`Click to add/remove: ${o}`,children:o},o))})}),X&&X.subtags.length>0&&e.jsx(ue,{children:e.jsx(ge,{$isRTL:m,children:X.subtags.map(o=>e.jsx(Ft,{$isSelected:b.includes(o.key),onClick:()=>ne(o),title:`Click to add/remove: ${o.TagType}: ${o.tagTitle} → ${o.subtagTitle}`,children:o.subtagTitle},o.key))})}),(ee>0||N>0)&&e.jsx(At,{$isRTL:m,children:N>0&&ee>0?T("Showing albums with all selected contacts and tags"):N>0?T("Showing albums with all selected contacts"):ee>0?T("Showing albums with all selected tags"):""})]})]})},Rt=r.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  padding: 20px;
`,zt=r.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
  animation: modalFadeIn 0.3s ease-out;
  
  @media (max-width: 768px) {
    padding: 24px;
    margin: 20px;
    max-width: calc(100vw - 40px);
  }
  
  @keyframes modalFadeIn {
    from {
      opacity: 0;
      transform: scale(0.9) translateY(-20px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`,Dt=r.h2`
  margin: 0 0 16px 0;
  font-size: 24px;
  font-weight: 600;
  color: #333;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
`,It=r.p`
  margin: 0 0 24px 0;
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`,Mt=r.div`
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0 24px 0;
  font-family: monospace;
  font-size: 14px;
  color: #495057;
  max-height: 150px;
  overflow-y: auto;
`,we=r.div`
  margin-left: ${t=>t.$level*20}px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
`,Lt=r.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`,Se=r.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 16px;
  text-align: left;
  width: 100%;

  &:hover {
    border-color: #007bff;
    background: #f8f9ff;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    padding: 14px 16px;
    font-size: 14px;
  }
`,$e=r.span`
  font-size: 20px;
  flex-shrink: 0;
`,Te=r.div`
  flex: 1;
`,ve=r.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
`,ke=r.div`
  font-size: 14px;
  color: #666;
  line-height: 1.4;
`,Gt=r.button`
  width: 100%;
  padding: 12px 24px;
  border: 1px solid #6c757d;
  border-radius: 8px;
  background: transparent;
  color: #6c757d;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #6c757d;
    color: white;
  }
`,Pt=({isOpen:t,folderStructure:d,onChoice:c,onCancel:i})=>{const{t:g,language:C}=se(),v=oe(C)==="rtl",[T,S]=x.useState(!1);if(x.useEffect(()=>{S(!0)},[]),!t||!d)return null;const m=(a,y=0)=>{const b=[];return y===0&&b.push(e.jsxs(we,{$level:y,children:[e.jsx("span",{children:"📁"}),e.jsx("span",{children:a.name}),e.jsxs("span",{style:{color:"#999",fontSize:"12px"},children:["(",a.files.length===1?g("{{count}} file",{count:a.files.length.toString()}):g("{{count}} files",{count:a.files.length.toString()}),")"]})]},a.path)),a.subfolders.forEach(B=>{const D=B.files.length+B.subfolders.reduce((E,G)=>E+G.files.length,0);b.push(e.jsxs(we,{$level:y+1,children:[e.jsx("span",{children:"📁"}),e.jsx("span",{children:B.name}),e.jsxs("span",{style:{color:"#999",fontSize:"12px"},children:["(",D===1?g("{{count}} file",{count:D.toString()}):g("{{count}} files",{count:D.toString()}),")"]})]},B.path)),y<1&&B.subfolders.length>0&&b.push(...m(B,y+2))}),b},p=a=>{if(typeof window<"u"&&window.sessionStorage)try{sessionStorage.setItem("album_creation_preference",a)}catch(y){console.warn("Failed to store album creation preference:",y)}c(a)},$=e.jsx(Rt,{onClick:i,children:e.jsxs(zt,{$isRTL:v,onClick:a=>a.stopPropagation(),children:[e.jsx(Dt,{children:g("Create Multiple Albums?")}),e.jsx(It,{children:g("We noticed your folder contains subfolders. Would you like to create a separate album for each subfolder, or treat them all as one album?")}),e.jsx(Mt,{children:m(d)}),e.jsxs(Lt,{children:[e.jsxs(Se,{onClick:()=>p("separate"),children:[e.jsx($e,{children:"📁"}),e.jsxs(Te,{children:[e.jsx(ve,{children:g("Separate albums by folder")}),e.jsx(ke,{children:g('Each subfolder becomes a different album (e.g., "Day1", "Day2")')})]})]}),e.jsxs(Se,{onClick:()=>p("combined"),children:[e.jsx($e,{children:"🔗"}),e.jsxs(Te,{children:[e.jsx(ve,{children:g("Combine all into one album")}),e.jsx(ke,{children:g("All files are merged into one album")})]})]})]}),e.jsx(Gt,{onClick:i,children:g("Cancel")})]})});return T?Oe.createPortal($,document.body):null},je=10,xe=3,Ot=t=>t.name.startsWith(".DS_Store")||t.name.startsWith("._")||t.name.startsWith("Thumbs.db")||t.name.startsWith(".")||t.name==="desktop.ini"||!/\.(jpg|jpeg|png|gif|bmp|webp|svg|mp4|mov|avi|wmv|flv|webm|mkv)$/i.test(t.name)?!1:t.size>0,_t=t=>{const d=[];let c=0;for(const i of t){if(!i||!i.name){c++;continue}Ot(i)?d.push(i):c++}return{validFiles:d,filteredCount:c}},Ce=le.forwardRef(({onFileSelection:t,onFolderSelection:d},c)=>e.jsxs("div",{style:{display:"none"},children:[e.jsx("input",{ref:c,id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:t,style:{display:"none"}}),e.jsx("input",{id:"folder-input",type:"file",accept:"image/*,video/*",multiple:!0,webkitdirectory:"",onChange:d,style:{display:"none"}})]}));Ce.displayName="EnhancedFileInput";const Ut=le.memo(({t,isRTL:d})=>e.jsx("div",{style:{padding:"20px 24px",marginTop:"20px",marginBottom:"20px",backgroundColor:"#fff",border:"1px solid #ddd",borderRadius:"8px",textAlign:d?"right":"left",direction:d?"rtl":"ltr",boxShadow:"0 1px 3px rgba(0,0,0,0.1)",position:"relative"},children:e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"16px"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:"18px",fontWeight:"600",marginBottom:"4px",color:"#333",lineHeight:"1.3"},children:t("Use the 6180 app to showcase your albums offline")}),e.jsx("div",{style:{fontSize:"14px",color:"#666",lineHeight:"1.4",fontWeight:"400"},children:t("Intelligently tagged and beautifully organized")})]}),e.jsxs("div",{style:{display:"flex",gap:"12px",alignItems:"center",flexShrink:0},children:[e.jsxs("a",{href:"https://apps.apple.com/app/6180/id6468679610",target:"_blank",rel:"noopener noreferrer",style:{display:"inline-flex",alignItems:"center",gap:"8px",padding:"8px 16px",backgroundColor:"#007bff",borderRadius:"8px",textDecoration:"none",color:"white",fontSize:"14px",fontWeight:"500",transition:"all 0.2s ease",whiteSpace:"nowrap",border:"none",cursor:"pointer"},onMouseEnter:c=>{c.currentTarget.style.backgroundColor="#0056b3",c.currentTarget.style.transform="translateY(-1px)"},onMouseLeave:c=>{c.currentTarget.style.backgroundColor="#007bff",c.currentTarget.style.transform="translateY(0)"},children:[e.jsx("span",{style:{fontSize:"16px"},children:"🍎"}),t("Open On iOS")]}),e.jsxs("a",{href:"https://play.google.com/store/apps/details?id=io.i6180.android",target:"_blank",rel:"noopener noreferrer",style:{display:"inline-flex",alignItems:"center",gap:"8px",padding:"8px 16px",backgroundColor:"#007bff",borderRadius:"8px",textDecoration:"none",color:"white",fontSize:"14px",fontWeight:"500",transition:"all 0.2s ease",whiteSpace:"nowrap",border:"none",cursor:"pointer"},onMouseEnter:c=>{c.currentTarget.style.backgroundColor="#0056b3",c.currentTarget.style.transform="translateY(-1px)"},onMouseLeave:c=>{c.currentTarget.style.backgroundColor="#007bff",c.currentTarget.style.transform="translateY(0)"},children:[e.jsx("span",{style:{fontSize:"16px"},children:"🤖"}),t("Open On Android")]})]})]})})),Wt=t=>t/(1024*1024*1024),ae=t=>t<1?`${Math.round(t*1e3)} MB`:`${t.toFixed(1)} GB`,Fe=(t,d,c)=>{if(!d)return[];const{intNumberOfSubscriptions:i}=d;let g=[];if(i===0){const C=je*1024*1024*1024;if(t.length>5){const v=[...t].sort((m,p)=>{const $=new Date(m.createdAt||0).getTime(),a=new Date(p.createdAt||0).getTime();return $-a}),T=t.length-5;g=[...v.slice(0,T)]}if(c>C){const v=[...t].sort((p,$)=>{const a=new Date(p.createdAt||0).getTime(),y=new Date($.createdAt||0).getTime();return a-y});let T=c-C;const S=[];for(const p of v){if(T<=0)break;const $=p.files.reduce((a,y)=>a+(y.dataInBytes||0),0);S.push(p),T-=$}const m=new Set(g.map(p=>p.folderId));for(const p of S)m.has(p.folderId)||g.push(p)}}else{const C=i*10*1024*1024*1024;if(c>C){const v=[...t].sort((S,m)=>{const p=new Date(S.createdAt||0).getTime(),$=new Date(m.createdAt||0).getTime();return p-$});let T=c-C;for(const S of v){if(T<=0)break;const m=S.files.reduce((p,$)=>p+($.dataInBytes||0),0);g.push(S),T-=m}}}return g},Yt=le.memo(({albumsToDelete:t,isRTL:d})=>{const{t:c}=se();return t.length===0?null:e.jsx("div",{style:{marginTop:"16px"},children:t.map(i=>e.jsx("div",{style:{marginBottom:"20px",direction:d?"rtl":"ltr"},children:e.jsxs("div",{style:{background:"#fff",border:"2px solid #dc3545",borderRadius:"12px",padding:"20px",position:"relative",overflow:"hidden",opacity:"0.85"},children:[e.jsx("div",{style:{marginTop:"30px",marginBottom:"16px",display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexDirection:d?"row-reverse":"row"},children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:d?"flex-end":"flex-start"},children:[e.jsx("h3",{style:{fontSize:"18px",margin:"0 0 4px 0",color:"#dc3545",fontWeight:"bold"},children:i.folderName||"Untitled Album"}),e.jsxs("div",{style:{fontSize:"13px",color:"#666",textAlign:d?"right":"left"},children:[i.createdAt&&e.jsxs("div",{children:[c("Created"),": ",new Date(i.createdAt).toLocaleDateString()]}),e.jsx("div",{children:i.files.length===1?c("{{count}} file",{count:i.files.length.toString()}):c("{{count}} files",{count:i.files.length.toString()})})]})]})}),i.folderDescription&&i.folderDescription.length>1&&e.jsx("div",{style:{fontSize:"14px",color:"#555",marginBottom:"16px",textAlign:d?"right":"left",fontStyle:"italic"},children:i.folderDescription}),e.jsxs("div",{style:{width:"100%",position:"relative"},children:[e.jsxs("div",{style:{display:"flex",overflowX:"auto",gap:"12px",paddingBottom:"8px",msOverflowStyle:"none",scrollbarWidth:"thin",WebkitOverflowScrolling:"touch",maxWidth:"100%",flexDirection:d?"row-reverse":"row"},children:[i.files.slice(0,xe).map((g,C)=>e.jsxs("div",{style:{width:"160px",height:"100px",flexShrink:0,position:"relative",borderRadius:"6px",overflow:"hidden",border:"2px solid #dc3545"},children:[e.jsx(Pe,{thumbnailDataKey:g.thumbnailDataKey,dataKey:g.dataKey,alt:c("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover"}}),e.jsx("div",{style:{position:"absolute",top:"0",left:"0",right:"0",bottom:"0",background:"rgba(220, 53, 69, 0.3)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"24px"},children:"❌"})]},C)),i.files.length>xe&&e.jsxs("div",{style:{width:"160px",height:"100px",flexShrink:0,position:"relative",borderRadius:"6px",border:"2px dashed #dc3545",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"#f8f9fa",color:"#dc3545",fontSize:"14px",fontWeight:"bold"},children:["+",i.files.length-xe," more"]})]}),i.files.length>2&&e.jsx("div",{style:{position:"absolute",[d?"left":"right"]:0,top:0,bottom:8,width:"30px",background:d?"linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))":"linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))",pointerEvents:"none"}})]})]})},i.folderId))})}),Nt=le.memo(({subscriptionInfo:t,albumCount:d,folders:c,calculatedBytesUsed:i,t:g,isRTL:C})=>{const v=x.useMemo(()=>t?Fe(c,t,i):[],[c,t,i]);if(!t)return null;const{intNumberOfSubscriptions:T}=t,S=Wt(i);let m="none",p="";if(T===0){const a=je,y=d>5,b=S>a;!y&&!b?(m="free-space",p=g("You can save 5 albums that total a maximum of {FREE_TIER_STORAGE_LIMIT_GB} GB for free. Delete unused albums to make space.").replace("{FREE_TIER_STORAGE_LIMIT_GB}",a.toString())):y&&b?(m="free-both-exceeded",p=g("You have over 5 albums AND your files occupy {formatGB(usedGB)} space (limit: {FREE_TIER_STORAGE_LIMIT_GB} GB). These albums are being automatically deleted unless you decide to delete other albums:").replace("{formatGB(usedGB)}",ae(S)).replace("{FREE_TIER_STORAGE_LIMIT_GB}",a.toString())):y?(m="free-count-exceeded",p=g("You have {albumCount} albums but can only save 5 for free. These oldest albums are being automatically deleted unless you decide to delete other albums:").replace("{albumCount}",d.toString())):b&&(m="free-storage-exceeded",p=g("Your files occupy {formatGB(usedGB)} space, but you only have {FREE_TIER_STORAGE_LIMIT_GB} GB storage. These albums are being automatically deleted unless you decide to delete other albums:").replace("{formatGB(usedGB)}",ae(S)).replace("{FREE_TIER_STORAGE_LIMIT_GB}",a.toString()))}else{const a=T*10,y=a-S;y<0?(m="paid-exceeded",p=g("Your files occupy {formatGB(usedGB)} space, but you only have {totalStorageGB} GB storage. These albums are being automatically deleted unless you decide to delete other albums:").replace("{formatGB(usedGB)}",ae(S)).replace("{totalStorageGB}",a.toString())):y<1.5&&(m="paid-warning",p=g("Your files occupy {formatGB(usedGB)} of {totalStorageGB} GB storage. You may need to upgrade your subscription soon.").replace("{formatGB(usedGB)}",ae(S)).replace("{totalStorageGB}",a.toString()))}if(m==="none")return null;const $=["free-count-exceeded","free-storage-exceeded","free-both-exceeded","paid-exceeded"].includes(m);return e.jsxs("div",{style:{padding:"12px 20px",marginBottom:"16px",backgroundColor:$?"#fff3cd":"#f8f9fa",border:`1px solid ${$?"#ffeaa7":"#e9ecef"}`,borderRadius:"8px",color:$?"#856404":"#6c757d",fontSize:"14px",textAlign:C?"right":"left",direction:C?"rtl":"ltr"},children:[p,$&&v.length>0&&e.jsx(Yt,{albumsToDelete:v,isRTL:C}),e.jsx("div",{style:{marginTop:"12px"},children:e.jsx("a",{href:me("storage/manage.html"),style:{color:"#007bff",textDecoration:"underline",cursor:"pointer",fontWeight:"bold"},onMouseEnter:a=>{a.currentTarget.style.color="#0056b3"},onMouseLeave:a=>{a.currentTarget.style.color="#007bff"},children:g("Click To Upgrade Subscription (US$1 monthly per 10 GB)")})})]})}),Kt=()=>{const{t,language:d}=se(),c=oe(d)==="rtl",[i,g]=x.useState(!1),[C,v]=x.useState(!1),[T,S]=x.useState(null),[m,p]=x.useState([]),[$,a]=x.useState(!1),y=x.useRef(null);x.useEffect(()=>{g(!0)},[]);const{folders:b,filteredFolders:B,publicUsername:D,cognitoUsername:E,searchQuery:G,setSearchQuery:P,handleContactFilterChange:W,resetContactFilter:I,handleTagFilterChange:R,resetTagFilter:V,handleDeleteClick:H,setFolders:Y,subscriptionInfo:O,calculatedBytesUsed:J}=Ve(n=>{(n.includes("Error")||n.includes("Failed"))&&console.error(n)}),M=De(n=>{if(i){try{if(_e()){const j=localStorage.getItem(fe.SELECTED_PHOTOS);if(j){const F=JSON.parse(j),A=Ue(F);if(A.length>1){const z=A.map(k=>({name:k.name,selectedPhotos:k.selectedPhotos,folderPath:k.folderPath}));localStorage.setItem(fe.MULTI_ALBUM_DATA,JSON.stringify(z)),L(),te("save-album.html?mode=multiple");return}else L()}else L()}}catch(h){console.error("Error processing multi-album data:",h),typeof L=="function"&&L()}if($)a(!1),te("save-album.html");else if(n){const h=`save-album.html?folderId=${encodeURIComponent(n)}`;te(h)}else te("save-album.html")}},!1),{fileInputRef:_,isUploading:Q,isProcessingFiles:ne,progressTracker:de,setSelectedPhotos:re}=M;x.useEffect(()=>{if(!i)return;(async()=>{try{await ze()}catch(h){console.warn("Credential prewarming failed:",h)}})()},[i]);const ie=x.useMemo(()=>O?Fe(b,O,J):[],[b,O,J]),X=x.useMemo(()=>new Set(ie.map(n=>n.folderId)),[ie]),ee=x.useMemo(()=>B.filter(n=>!X.has(n.folderId)),[B,X]),N=x.useCallback(async n=>{if(!i)return!1;const h=Array.from(n.target.files||[]);if(!h.length)return!1;const{validFiles:j,filteredCount:F}=_t(h);if(j.length===0)return alert("No valid image or video files were selected. Please select media files."),!1;F>0&&console.log(`Filtered out ${F} invalid/system files`);const A=We(j);if(A&&Ye(A)){const z=Ne();if(z){he(A,z,j);const k=new DataTransfer;j.forEach(Z=>k.items.add(Z));const U={...n,target:{...n.target,files:k.files}};try{await M.handleFileSelection(U,E)}catch(Z){console.error("Error in file upload:",Z),L()}}else S(A),p(j),v(!0)}else{const z=new DataTransfer;j.forEach(U=>z.items.add(U));const k={...n,target:{...n.target,files:z.files}};try{await M.handleFileSelection(k,E)}catch(U){console.error("Error in single album file selection:",U)}}return!0},[M,E,i]),q=x.useCallback((n,h,j)=>{if(!i)return;Ke(n),he(j,n,h),v(!1),S(null),p([]);const F=_.current;if(F)try{const A=new DataTransfer;h.forEach(k=>{k&&k.name&&A.items.add(k)}),F.files=A.files;const z=new Event("change",{bubbles:!0});Object.defineProperty(z,"target",{writable:!1,value:F}),M.handleFileSelection(z,E)}catch(A){console.error("Error in album creation flow:",A),L()}else console.error("File input ref not available"),L()},[M,E,_,i]),K=x.useCallback(async n=>N(n),[N]),o=x.useCallback(()=>{v(!1),S(null),p([]),a(!1),_.current&&(_.current.value=""),y.current&&(y.current.value=""),i&&(be(),L())},[_,i]),l=x.useCallback((n=null,h="files")=>{if(i)try{if(a(n===null),be(),L(),localStorage.removeItem(fe.MULTI_ALBUM_DATA),re([]),h==="folder")if(y.current)y.current.click();else throw new Error("Folder picker not available");else M.openFilePicker(n)}catch(j){console.error("Error opening file picker:",j),a(!1),alert("Sorry, there was an error opening the file picker. Please try again.")}},[M,re,i]),w=x.useCallback(()=>{try{l(null,"files")}catch(n){console.error("Error selecting files:",n)}},[l]),f=x.useCallback(()=>{try{l(null,"folder")}catch(n){console.error("Error selecting folder:",n)}},[l]),u=G.length>0||b.some(n=>n.contacts&&Object.keys(n.contacts).length>0||n.files.some(h=>h.selectedTags&&h.selectedTags.length>0));return e.jsxs(e.Fragment,{children:[e.jsx(Me,{}),e.jsxs(Le,{$isRTL:c,children:[e.jsx(bt,{publicUsername:D,subscriptionInfo:O,calculatedBytesUsed:J,onNewAlbum:()=>l(null,"files"),onSelectFiles:w,onSelectFolder:f}),(Q||ne)&&e.jsx("div",{style:{width:"100%",marginBottom:"20px"},children:e.jsx(Ie,{progressTracker:de,isUploading:Q,isProcessingFiles:ne,isRTL:oe(d)==="rtl",style:{marginTop:"20px"},context:"uploading",showSuccessMessage:!0,showErrorMessage:!0})}),b.length>3&&e.jsx(Nt,{subscriptionInfo:O,albumCount:b.length,folders:b,calculatedBytesUsed:J,t,isRTL:c}),b.length<=3&&e.jsx(Ut,{t,isRTL:c}),u&&e.jsx(Et,{folders:b,searchQuery:G,setSearchQuery:P,onTagFilterChange:R,onContactFilterChange:W,resetTagFilter:V,resetContactFilter:I}),e.jsx(Ge,{folders:ee,setFolders:Y,handleDeleteClick:n=>H(n,t),isUploading:Q,cognitoUsername:E,isProfileView:!1}),e.jsx(Ce,{ref:_,onFileSelection:N,onFolderSelection:K}),e.jsx("input",{ref:y,type:"file",accept:"image/*,video/*",multiple:!0,webkitdirectory:"",onChange:K,style:{display:"none"}}),e.jsx(Pt,{isOpen:C,folderStructure:T,onChoice:n=>q(n,m,T),onCancel:o})]})]})},Vt=()=>e.jsx(Re,{children:e.jsx(Kt,{})});typeof window<"u"&&document.getElementById("root")&&Ee.createRoot(document.getElementById("root")).render(e.jsx(Vt,{}));
