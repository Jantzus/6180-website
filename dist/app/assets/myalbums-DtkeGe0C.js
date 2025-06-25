import{d as i,q as Be,u as Z,r as m,j as e,b as ge,g as q,a as ne,o as se,R as Ee,I as Re,L as de,p as Ie}from"./utils-Dg1WdiuL.js";import{u as ze,U as De}from"./UploadProgress-BbvDDDzm.js";import{G as Me,A as Le}from"./styled-components-CkPYYn5H.js";import{A as Ge}from"./AlbumList-BxemxfoJ.js";import{L as Pe}from"./LazyImage-B-l0icNJ.js";import{R as Oe}from"./DownloadModal-DD8rxzYd.js";import{a as _e,b as Ue,c as P,d as We,h as Ye,e as Ne,s as he,f as Ke,i as be}from"./folderStructureUtils-BmdkosLC.js";import{u as Ve}from"./useFolderManagement-WSh1rYLp.js";import"./types-CyPfckSQ.js";const He=!1,n={colors:{primary:"#007bff",primaryDark:"#0056b3",danger:"#e53935",white:"#fff",grayLight:"#e0e0e0",borderLight:"#eaeaea",text:{primary:"#333",secondary:"#666",white:"#fff"}},spacing:{sm:"8px",md:"16px"},borderRadius:{small:"4px",medium:"8px",large:"16px",circle:"50%"},fontSizes:{xs:"12px",sm:"14px",lg:"18px",xl:"20px"},boxShadow:{primaryBtn:"0 4px 12px rgba(0, 123, 255, 0.2)",xl:"0 8px 24px rgba(0,0,0,0.2)"},breakpoints:{mobile:"767px"}},ie=t=>Be`
  @media (max-width: ${n.breakpoints.mobile}) {
    ${t}
  }
`,Je=i.header`
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
`,Xe=i.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${n.spacing.md}; /* Reduced from lg to md to match content */
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
  
  ${ie(`
    padding: 0 ${n.spacing.md};
  `)}
`,qe=i.div`
  display: flex;
  align-items: center;
  gap: ${n.spacing.sm};
  flex: 0 0 auto;
`,Ze=i.img`
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
  
  ${ie(`
    width: 24px;
    height: 24px;
  `)}
`,Qe=i.h1`
  font-size: ${n.fontSizes.xl};
  font-weight: 600;
  color: ${n.colors.text.primary};
  margin: 0;
  letter-spacing: -0.01em;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif;
  
  ${ie(`
    font-size: ${n.fontSizes.lg};
  `)}
`,et=i.div`
  flex: 1 1 auto;
  display: ${t=>t.$isMobile?"none":"flex"};
  justify-content: center;
  padding: 0 ${n.spacing.md};
  
  @media (max-width: 768px) {
    display: none;
  }
`,tt=i.div`
  display: inline-flex;
  gap: ${n.spacing.sm};
  align-items: center;
`,ot=i.button`
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
`,rt=i.button`
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
`,nt=i.span`
  font-size: 18px;
  line-height: 1;
  font-weight: 300;
`,st=i.span`
  font-size: 16px;
  line-height: 1;
`,it=i.div`
  flex: 0 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  gap: ${n.spacing.sm};
`,at=i.button`
  display: ${t=>t.$isMobile?"flex":"none"};
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
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
    padding: 6px 10px;
    font-size: ${n.fontSizes.xs};
  }
`,lt=i.button`
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
`,ct=i.div`
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
`,dt=i.span`
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: ${t=>t.$isMobile?"none":"inline"};

  @media (max-width: 768px) {
    display: none;
  }
`,pt=i.svg`
  width: 12px;
  height: 12px;
  transform: ${t=>t.$isOpen?"rotate(180deg)":"rotate(0deg)"};
  transition: transform 0.2s ease;
  opacity: 0.6;
`,ft=i.div`
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

  ${ie(`
    min-width: 220px;
    max-width: calc(100vw - 32px);
  `)}
`,ye=i.a`
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
`,ut=i.button`
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
`,gt=i.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`,xt=i.span`
  font-size: ${n.fontSizes.xs};
  color: ${n.colors.text.secondary};
  font-weight: 400;
  margin-top: 2px;
`,mt=i.div`
  height: 1px;
  background-color: rgba(0, 0, 0, 0.08);
  margin: ${n.spacing.sm} 0;
`,ht=i.div`
  height: 1px;
  background-color: ${n.colors.borderLight};
  width: 100%;
`,bt=({publicUsername:t,subscriptionInfo:f,calculatedBytesUsed:c,onNewAlbum:a,onSelectFiles:g,onSelectFolder:k})=>{const{t:T,language:b}=Z(),v=q(b)==="rtl",[x,u]=m.useState(!1),[h,l]=m.useState(He),[w,$]=m.useState(!1),j=m.useRef(null);m.useEffect(()=>{$(!0);const I=()=>{if(typeof window<"u"){const L=window.innerWidth<=768;l(L)}};I();const R=M=>{j.current&&!j.current.contains(M.target)&&u(!1)},V=()=>{I()};if(typeof window<"u")return document.addEventListener("mousedown",R),window.addEventListener("resize",V),()=>{document.removeEventListener("mousedown",R),window.removeEventListener("resize",V)}},[]);const E=()=>{if(!f)return"-- / -- GB";const I=(c/(1024*1024*1024)).toFixed(1),R=f.intNumberOfSubscriptions===0?10:f.intNumberOfSubscriptions*10;return`${I} / ${R} GB`},D=()=>{if(!t)return"Profile";const I=t.split(" ")[0];return I.length>12?I.substring(0,12)+"...":I},O=()=>{w&&typeof localStorage<"u"&&localStorage.clear(),ne("index.html")},_=()=>{g?g():a&&a()},Y=()=>{k&&k()};return e.jsx(e.Fragment,{children:e.jsxs(Je,{children:[e.jsxs(Xe,{$isRTL:v,children:[e.jsxs(qe,{children:[e.jsx(Ze,{src:ge("images/logo_no_background.png"),alt:"6180 Logo"}),e.jsx(Qe,{children:"6180"})]}),e.jsx(et,{$isMobile:h,children:e.jsxs(tt,{children:[e.jsxs(ot,{onClick:_,children:[e.jsx(nt,{children:"+"}),T("New Album")]}),k&&e.jsxs(rt,{$isMobile:h,onClick:Y,children:[e.jsx(st,{children:"📁"}),T("Upload Folder")]})]})}),e.jsxs(it,{children:[e.jsx(at,{$isMobile:h,onClick:_,children:T("New Album")}),e.jsxs("div",{ref:j,style:{position:"relative"},children:[e.jsxs(lt,{onClick:()=>u(!x),children:[e.jsx(ct,{children:D().charAt(0).toUpperCase()}),e.jsx(dt,{$isMobile:h,children:D()}),e.jsx(pt,{$isOpen:x,viewBox:"0 0 12 12",children:e.jsx("path",{d:"M2.5 4.5L6 8L9.5 4.5",stroke:"currentColor",strokeWidth:"1.5",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})})]}),x&&e.jsxs(ft,{$isRTL:v,children:[t&&e.jsxs(ye,{href:`https://6180.io/${t}`,target:"_blank",rel:"noopener noreferrer",children:[e.jsx("span",{style:{fontSize:"16px"},children:"👤"}),T("View Public Profile")]}),e.jsxs(ye,{href:ge("storage/manage.html"),children:[e.jsx("span",{style:{fontSize:"16px"},children:"📦"}),e.jsxs(gt,{children:[e.jsx("span",{children:T("Storage")}),e.jsx(xt,{children:E()})]})]}),e.jsx(mt,{}),e.jsxs(ut,{onClick:O,children:[e.jsx("span",{style:{fontSize:"16px"},children:"🚪"}),T("Log Out")]})]})]})]})]}),e.jsx(ht,{})]})})},yt=i.div`
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
`,wt=i.div`
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`,St=i.div`
  position: relative;
  max-width: 100%;
`,$t=i.div`
  position: absolute;
  left: ${t=>t.$isRTL?"auto":"16px"};
  right: ${t=>t.$isRTL?"16px":"auto"};
  top: 50%;
  transform: translateY(-50%);
  color: #9CA3AF;
  pointer-events: none;
  z-index: 1;
`,Tt=i.input`
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
`,vt=i.button`
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
`,pe=i.div`
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 8px;
  }
`,fe=i.div`
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
`,kt=i.button`
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
`,jt=i.button`
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
`,Ct=i.button`
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
`,Ft=i.button`
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
`,At=i.div`
  margin-top: 8px;
  font-size: 13px;
  color: #555;
  font-style: italic;
  text-align: ${t=>t.$isRTL?"right":"left"};
`,Bt=i.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 8px 0;
`,Et=({folders:t,searchQuery:f,setSearchQuery:c,onTagFilterChange:a,onContactFilterChange:g,resetTagFilter:k,resetContactFilter:T})=>{const{t:b,language:v}=Z(),x=q(v)==="rtl",[u,h]=m.useState(!1),[l,w]=m.useState([]),[$,j]=m.useState([]),[E,D]=m.useState(null),[O,_]=m.useState([]),[Y,I]=m.useState([]),[R,V]=m.useState([]),[M,L]=m.useState([]),z=r=>r.subtags.filter(d=>$.includes(d.key)),U=r=>{const d=z(r);if(d.length===0)return r.tagTitle;const y=d.map(o=>o.subtagTitle).join(", ");return`${r.tagTitle} (${y})`};m.useEffect(()=>{const r=new Map,d=new Map;t.forEach(s=>{const p=s.updatedAt?new Date(s.updatedAt).getTime():s.createdAt?new Date(s.createdAt).getTime():0;s.files.forEach(S=>{var C;(C=S.selectedTags)==null||C.forEach(F=>{var W;const A=`${F.TagType}-${F.tagTitle}`;if(!r.has(A))r.set(A,{tag:{key:A,TagType:F.TagType,tagTitle:F.tagTitle,timestamp:p,subtags:[]},timestamp:p});else{const B=r.get(A);p>B.timestamp&&(B.timestamp=p,B.tag.timestamp=p)}(W=F.subtags)==null||W.forEach(B=>{const xe=`${B.TagType}-${B.tagTitle}-${B.subtagTitle}`,me=r.get(A).tag,ce=me.subtags.find(Ae=>Ae.key===xe);ce?p>ce.timestamp&&(ce.timestamp=p):me.subtags.push({key:xe,TagType:B.TagType,tagTitle:B.tagTitle,subtagTitle:B.subtagTitle,timestamp:p})})})}),s.contacts&&Object.values(s.contacts).forEach(S=>{if(typeof S=="string"&&!S.toString().startsWith("Profile-")){const C=d.get(S);(!C||p>C.timestamp)&&d.set(S,{name:S,timestamp:p})}})});const y=Array.from(r.values()).sort((s,p)=>p.timestamp-s.timestamp).map(s=>(s.tag.subtags.sort((p,S)=>S.timestamp-p.timestamp),s.tag)),o=Array.from(d.values()).sort((s,p)=>p.timestamp-s.timestamp).map(s=>s.name);w(y),_(y),I(o),L(o)},[t]);const N=r=>{if(r.length===0){k(),_(l);return}const d=t.filter(y=>{const o=new Set;return y.files.forEach(s=>{var p;(p=s.selectedTags)==null||p.forEach(S=>{var C;o.add(`${S.TagType}-${S.tagTitle}`),(C=S.subtags)==null||C.forEach(F=>{o.add(`${F.TagType}-${F.tagTitle}-${F.subtagTitle}`)})})}),r.every(s=>o.has(s))});oe(d),a(d)},Q=r=>{if(r.length===0){T(),L(Y);return}const d=t.filter(y=>{if(!y.contacts)return!1;const o=Object.values(y.contacts).filter(s=>typeof s=="string"&&!s.toString().startsWith("Profile-"));return r.every(s=>o.includes(s))});le(d),g(d)},ae=r=>{const d=$.includes(r.key),y=E===r.key;if(d){if(d&&!y)D(r.key);else if(d&&y){const o=$.filter(s=>s!==r.key&&!r.subtags.some(p=>p.key===s));j(o),D(null),N(o)}}else{const o=[...$,r.key];j(o),D(r.key),N(o)}},ee=r=>{const d=$.includes(r.key);let y;d?y=$.filter(o=>o!==r.key):y=[...$,r.key],j(y),N(y)},te=r=>{let d;R.includes(r)?d=R.filter(y=>y!==r):d=[...R,r],V(d),Q(d)},oe=r=>{const d=new Set;r.forEach(o=>{o.files.forEach(s=>{var p;(p=s.selectedTags)==null||p.forEach(S=>{d.add(`${S.TagType}-${S.tagTitle}`)})})}),$.forEach(o=>{o.includes("-",o.indexOf("-")+1)||d.add(o)});const y=l.filter(o=>d.has(o.key));_(y)},le=r=>{const d=new Set;r.forEach(o=>{o.contacts&&Object.values(o.contacts).forEach(s=>{typeof s=="string"&&!s.toString().startsWith("Profile-")&&d.add(s)})}),R.forEach(o=>{d.add(o)});const y=Y.filter(o=>d.has(o));L(y)},K=E?l.find(r=>r.key===E):null,X=$.length,H=R.length,J=Y.length>0,G=l.length>0;return!J&&!G&&!f?null:e.jsxs(yt,{$isRTL:x,children:[e.jsx(wt,{children:e.jsxs(St,{children:[e.jsx($t,{$isRTL:x,children:e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("circle",{cx:"11",cy:"11",r:"8"}),e.jsx("path",{d:"m21 21-4.35-4.35"})]})}),e.jsx(Tt,{$isRTL:x,type:"text",value:f,onChange:r=>c(r.target.value),placeholder:b("Search albums by title or description")}),f&&e.jsx(vt,{$isRTL:x,onClick:()=>c(""),children:e.jsxs("svg",{width:"10",height:"10",viewBox:"0 0 24 24",fill:"none",stroke:"white",strokeWidth:"2",children:[e.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),e.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})}),(J||G)&&e.jsxs(e.Fragment,{children:[e.jsx(pe,{children:e.jsxs(fe,{$isRTL:x,children:[J&&e.jsx(kt,{$isActive:u,onClick:()=>h(!u),title:b("Toggle contacts filter"),children:"👥"}),G&&O.length>0?O.map(r=>{const d=z(r),y=d.length>0?`${r.TagType}: ${r.tagTitle} (${d.map(o=>o.subtagTitle).join(", ")})`:`Click to add/remove: ${r.TagType}: ${r.tagTitle}`;return e.jsx(jt,{$isSelected:$.includes(r.key),$isDisplayed:E===r.key,onClick:()=>ae(r),title:y,children:U(r)},r.key)}):G?e.jsx(Bt,{children:b("No tags available")}):null]})}),u&&J&&e.jsx(pe,{children:e.jsx(fe,{$isRTL:x,children:M.map(r=>e.jsx(Ct,{$isSelected:R.includes(r),onClick:()=>te(r),title:`Click to add/remove: ${r}`,children:r},r))})}),K&&K.subtags.length>0&&e.jsx(pe,{children:e.jsx(fe,{$isRTL:x,children:K.subtags.map(r=>e.jsx(Ft,{$isSelected:$.includes(r.key),onClick:()=>ee(r),title:`Click to add/remove: ${r.TagType}: ${r.tagTitle} → ${r.subtagTitle}`,children:r.subtagTitle},r.key))})}),(X>0||H>0)&&e.jsx(At,{$isRTL:x,children:H>0&&X>0?b("Showing albums with all selected contacts and tags"):H>0?b("Showing albums with all selected contacts"):X>0?b("Showing albums with all selected tags"):""})]})]})},Rt=i.div`
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
`,It=i.div`
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
`,zt=i.h2`
  margin: 0 0 16px 0;
  font-size: 24px;
  font-weight: 600;
  color: #333;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
`,Dt=i.p`
  margin: 0 0 24px 0;
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`,Mt=i.div`
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
`,we=i.div`
  margin-left: ${t=>t.$level*20}px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
`,Lt=i.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`,Se=i.button`
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
`,$e=i.span`
  font-size: 20px;
  flex-shrink: 0;
`,Te=i.div`
  flex: 1;
`,ve=i.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
`,ke=i.div`
  font-size: 14px;
  color: #666;
  line-height: 1.4;
`,Gt=i.button`
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
`,Pt=({isOpen:t,folderStructure:f,onChoice:c,onCancel:a})=>{const{t:g,language:k}=Z(),T=q(k)==="rtl",[b,v]=m.useState(!1);if(m.useEffect(()=>{v(!0)},[]),!t||!f)return null;const x=(l,w=0)=>{const $=[];return w===0&&$.push(e.jsxs(we,{$level:w,children:[e.jsx("span",{children:"📁"}),e.jsx("span",{children:l.name}),e.jsxs("span",{style:{color:"#999",fontSize:"12px"},children:["(",l.files.length===1?g("{{count}} file",{count:l.files.length.toString()}):g("{{count}} files",{count:l.files.length.toString()}),")"]})]},l.path)),l.subfolders.forEach(j=>{const E=j.files.length+j.subfolders.reduce((D,O)=>D+O.files.length,0);$.push(e.jsxs(we,{$level:w+1,children:[e.jsx("span",{children:"📁"}),e.jsx("span",{children:j.name}),e.jsxs("span",{style:{color:"#999",fontSize:"12px"},children:["(",E===1?g("{{count}} file",{count:E.toString()}):g("{{count}} files",{count:E.toString()}),")"]})]},j.path)),w<1&&j.subfolders.length>0&&$.push(...x(j,w+2))}),$},u=l=>{if(typeof window<"u"&&window.sessionStorage)try{sessionStorage.setItem("album_creation_preference",l)}catch(w){console.warn("Failed to store album creation preference:",w)}c(l)},h=e.jsx(Rt,{onClick:a,children:e.jsxs(It,{$isRTL:T,onClick:l=>l.stopPropagation(),children:[e.jsx(zt,{children:g("Create Multiple Albums?")}),e.jsx(Dt,{children:g("We noticed your folder contains subfolders. Would you like to create a separate album for each subfolder, or treat them all as one album?")}),e.jsx(Mt,{children:x(f)}),e.jsxs(Lt,{children:[e.jsxs(Se,{onClick:()=>u("separate"),children:[e.jsx($e,{children:"📁"}),e.jsxs(Te,{children:[e.jsx(ve,{children:g("Separate albums by folder")}),e.jsx(ke,{children:g('Each subfolder becomes a different album (e.g., "Day1", "Day2")')})]})]}),e.jsxs(Se,{onClick:()=>u("combined"),children:[e.jsx($e,{children:"🔗"}),e.jsxs(Te,{children:[e.jsx(ve,{children:g("Combine all into one album")}),e.jsx(ke,{children:g("All files are merged into one album")})]})]})]}),e.jsx(Gt,{onClick:a,children:g("Cancel")})]})});return b?Oe.createPortal(h,document.body):null},je=10,ue=3,Ot=t=>t.name.startsWith(".DS_Store")||t.name.startsWith("._")||t.name.startsWith("Thumbs.db")||t.name.startsWith(".")||t.name==="desktop.ini"||!/\.(jpg|jpeg|png|gif|bmp|webp|svg|mp4|mov|avi|wmv|flv|webm|mkv)$/i.test(t.name)?!1:t.size>0,_t=t=>{const f=[];let c=0;for(const a of t){if(!a||!a.name){c++;continue}Ot(a)?f.push(a):c++}return{validFiles:f,filteredCount:c}},Ce=se.forwardRef(({onFileSelection:t,onFolderSelection:f},c)=>e.jsxs("div",{style:{display:"none"},children:[e.jsx("input",{ref:c,id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:t,style:{display:"none"}}),e.jsx("input",{id:"folder-input",type:"file",accept:"image/*,video/*",multiple:!0,webkitdirectory:"",onChange:f,style:{display:"none"}})]}));Ce.displayName="EnhancedFileInput";const Ut=se.memo(({t,isRTL:f})=>e.jsx("div",{style:{padding:"20px 24px",marginTop:"20px",marginBottom:"20px",backgroundColor:"#fff",border:"1px solid #ddd",borderRadius:"8px",textAlign:f?"right":"left",direction:f?"rtl":"ltr",boxShadow:"0 1px 3px rgba(0,0,0,0.1)",position:"relative"},children:e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"16px"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:"18px",fontWeight:"600",marginBottom:"4px",color:"#333",lineHeight:"1.3"},children:t("Use the 6180 app to showcase your albums offline")}),e.jsx("div",{style:{fontSize:"14px",color:"#666",lineHeight:"1.4",fontWeight:"400"},children:t("Intelligently tagged and beautifully organized")})]}),e.jsxs("div",{style:{display:"flex",gap:"12px",alignItems:"center",flexShrink:0},children:[e.jsxs("a",{href:"https://apps.apple.com/app/6180/id6468679610",target:"_blank",rel:"noopener noreferrer",style:{display:"inline-flex",alignItems:"center",gap:"8px",padding:"8px 16px",backgroundColor:"#007bff",borderRadius:"8px",textDecoration:"none",color:"white",fontSize:"14px",fontWeight:"500",transition:"all 0.2s ease",whiteSpace:"nowrap",border:"none",cursor:"pointer"},onMouseEnter:c=>{c.currentTarget.style.backgroundColor="#0056b3",c.currentTarget.style.transform="translateY(-1px)"},onMouseLeave:c=>{c.currentTarget.style.backgroundColor="#007bff",c.currentTarget.style.transform="translateY(0)"},children:[e.jsx("span",{style:{fontSize:"16px"},children:"🍎"}),t("Open On iOS")]}),e.jsxs("a",{href:"https://play.google.com/store/apps/details?id=io.i6180.android",target:"_blank",rel:"noopener noreferrer",style:{display:"inline-flex",alignItems:"center",gap:"8px",padding:"8px 16px",backgroundColor:"#007bff",borderRadius:"8px",textDecoration:"none",color:"white",fontSize:"14px",fontWeight:"500",transition:"all 0.2s ease",whiteSpace:"nowrap",border:"none",cursor:"pointer"},onMouseEnter:c=>{c.currentTarget.style.backgroundColor="#0056b3",c.currentTarget.style.transform="translateY(-1px)"},onMouseLeave:c=>{c.currentTarget.style.backgroundColor="#007bff",c.currentTarget.style.transform="translateY(0)"},children:[e.jsx("span",{style:{fontSize:"16px"},children:"🤖"}),t("Open On Android")]})]})]})})),Wt=t=>t/(1024*1024*1024),re=t=>t<1?`${Math.round(t*1e3)} MB`:`${t.toFixed(1)} GB`,Fe=(t,f,c)=>{if(!f)return[];const{intNumberOfSubscriptions:a}=f;let g=[];if(a===0){const k=je*1024*1024*1024;if(t.length>5){const T=[...t].sort((x,u)=>{const h=new Date(x.createdAt||0).getTime(),l=new Date(u.createdAt||0).getTime();return h-l}),b=t.length-5;g=[...T.slice(0,b)]}if(c>k){const T=[...t].sort((u,h)=>{const l=new Date(u.createdAt||0).getTime(),w=new Date(h.createdAt||0).getTime();return l-w});let b=c-k,v=[];for(const u of T){if(b<=0)break;const h=u.files.reduce((l,w)=>l+(w.dataInBytes||0),0);v.push(u),b-=h}const x=new Set(g.map(u=>u.folderId));for(const u of v)x.has(u.folderId)||g.push(u)}}else{const k=a*10*1024*1024*1024;if(c>k){const T=[...t].sort((v,x)=>{const u=new Date(v.createdAt||0).getTime(),h=new Date(x.createdAt||0).getTime();return u-h});let b=c-k;for(const v of T){if(b<=0)break;const x=v.files.reduce((u,h)=>u+(h.dataInBytes||0),0);g.push(v),b-=x}}}return g},Yt=se.memo(({albumsToDelete:t,isRTL:f})=>{const{t:c}=Z();return t.length===0?null:e.jsx("div",{style:{marginTop:"16px"},children:t.map(a=>e.jsx("div",{style:{marginBottom:"20px",direction:f?"rtl":"ltr"},children:e.jsxs("div",{style:{background:"#fff",border:"2px solid #dc3545",borderRadius:"12px",padding:"20px",position:"relative",overflow:"hidden",opacity:"0.85"},children:[e.jsx("div",{style:{marginTop:"30px",marginBottom:"16px",display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexDirection:f?"row-reverse":"row"},children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:f?"flex-end":"flex-start"},children:[e.jsx("h3",{style:{fontSize:"18px",margin:"0 0 4px 0",color:"#dc3545",fontWeight:"bold"},children:a.folderName||"Untitled Album"}),e.jsxs("div",{style:{fontSize:"13px",color:"#666",textAlign:f?"right":"left"},children:[a.createdAt&&e.jsxs("div",{children:[c("Created"),": ",new Date(a.createdAt).toLocaleDateString()]}),e.jsx("div",{children:a.files.length===1?c("{{count}} file",{count:a.files.length.toString()}):c("{{count}} files",{count:a.files.length.toString()})})]})]})}),a.folderDescription&&a.folderDescription.length>1&&e.jsx("div",{style:{fontSize:"14px",color:"#555",marginBottom:"16px",textAlign:f?"right":"left",fontStyle:"italic"},children:a.folderDescription}),e.jsxs("div",{style:{width:"100%",position:"relative"},children:[e.jsxs("div",{style:{display:"flex",overflowX:"auto",gap:"12px",paddingBottom:"8px",msOverflowStyle:"none",scrollbarWidth:"thin",WebkitOverflowScrolling:"touch",maxWidth:"100%",flexDirection:f?"row-reverse":"row"},children:[a.files.slice(0,ue).map((g,k)=>e.jsxs("div",{style:{width:"160px",height:"100px",flexShrink:0,position:"relative",borderRadius:"6px",overflow:"hidden",border:"2px solid #dc3545"},children:[e.jsx(Pe,{thumbnailDataKey:g.thumbnailDataKey,dataKey:g.dataKey,alt:c("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover"}}),e.jsx("div",{style:{position:"absolute",top:"0",left:"0",right:"0",bottom:"0",background:"rgba(220, 53, 69, 0.3)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"24px"},children:"❌"})]},k)),a.files.length>ue&&e.jsxs("div",{style:{width:"160px",height:"100px",flexShrink:0,position:"relative",borderRadius:"6px",border:"2px dashed #dc3545",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"#f8f9fa",color:"#dc3545",fontSize:"14px",fontWeight:"bold"},children:["+",a.files.length-ue," more"]})]}),a.files.length>2&&e.jsx("div",{style:{position:"absolute",[f?"left":"right"]:0,top:0,bottom:8,width:"30px",background:f?"linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))":"linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))",pointerEvents:"none"}})]})]})},a.folderId))})}),Nt=se.memo(({subscriptionInfo:t,albumCount:f,folders:c,calculatedBytesUsed:a,t:g,isRTL:k})=>{if(!t)return null;const{intNumberOfSubscriptions:T}=t,b=Wt(a),v=m.useMemo(()=>Fe(c,t,a),[c,t,a]);let x="none",u="";if(T===0){const l=je,w=f>5,$=b>l;!w&&!$?(x="free-space",u=g("You can save 5 albums that total a maximum of {FREE_TIER_STORAGE_LIMIT_GB} GB for free. Delete unused albums to make space.").replace("{FREE_TIER_STORAGE_LIMIT_GB}",l.toString())):w&&$?(x="free-both-exceeded",u=g("You have over 5 albums AND your files occupy {formatGB(usedGB)} space (limit: {FREE_TIER_STORAGE_LIMIT_GB} GB). These albums are being automatically deleted unless you decide to delete other albums:").replace("{formatGB(usedGB)}",re(b)).replace("{FREE_TIER_STORAGE_LIMIT_GB}",l.toString())):w?(x="free-count-exceeded",u=g("You have {albumCount} albums but can only save 5 for free. These oldest albums are being automatically deleted unless you decide to delete other albums:").replace("{albumCount}",f.toString())):$&&(x="free-storage-exceeded",u=g("Your files occupy {formatGB(usedGB)} space, but you only have {FREE_TIER_STORAGE_LIMIT_GB} GB storage. These albums are being automatically deleted unless you decide to delete other albums:").replace("{formatGB(usedGB)}",re(b)).replace("{FREE_TIER_STORAGE_LIMIT_GB}",l.toString()))}else{const l=T*10,w=l-b;w<0?(x="paid-exceeded",u=g("Your files occupy {formatGB(usedGB)} space, but you only have {totalStorageGB} GB storage. These albums are being automatically deleted unless you decide to delete other albums:").replace("{formatGB(usedGB)}",re(b)).replace("{totalStorageGB}",l.toString())):w<1.5&&(x="paid-warning",u=g("Your files occupy {formatGB(usedGB)} of {totalStorageGB} GB storage. You may need to upgrade your subscription soon.").replace("{formatGB(usedGB)}",re(b)).replace("{totalStorageGB}",l.toString()))}if(x==="none")return null;const h=["free-count-exceeded","free-storage-exceeded","free-both-exceeded","paid-exceeded"].includes(x);return e.jsxs("div",{style:{padding:"12px 20px",marginBottom:"16px",backgroundColor:h?"#fff3cd":"#f8f9fa",border:`1px solid ${h?"#ffeaa7":"#e9ecef"}`,borderRadius:"8px",color:h?"#856404":"#6c757d",fontSize:"14px",textAlign:k?"right":"left",direction:k?"rtl":"ltr"},children:[u,h&&v.length>0&&e.jsx(Yt,{albumsToDelete:v,isRTL:k}),e.jsx("div",{style:{marginTop:"12px"},children:e.jsx("a",{href:ge("storage/manage.html"),style:{color:"#007bff",textDecoration:"underline",cursor:"pointer",fontWeight:"bold"},onMouseEnter:l=>{l.currentTarget.style.color="#0056b3"},onMouseLeave:l=>{l.currentTarget.style.color="#007bff"},children:g("Click To Upgrade Subscription (US$1 monthly per 10 GB)")})})]})}),Kt=()=>{const{t,language:f}=Z(),c=q(f)==="rtl",[a,g]=m.useState(!1),[k,T]=m.useState(!1),[b,v]=m.useState(null),[x,u]=m.useState([]),h=m.useRef(null);m.useEffect(()=>{g(!0)},[]);const{folders:l,filteredFolders:w,publicUsername:$,cognitoUsername:j,searchQuery:E,setSearchQuery:D,handleContactFilterChange:O,resetContactFilter:_,handleTagFilterChange:Y,resetTagFilter:I,handleDeleteClick:R,setFolders:V,subscriptionInfo:M,calculatedBytesUsed:L}=Ve(o=>{(o.includes("Error")||o.includes("Failed"))&&console.error(o)}),z=ze(o=>{if(a){try{if(_e()){const p=localStorage.getItem(de.SELECTED_PHOTOS);if(p){const S=JSON.parse(p),C=Ue(S);if(C.length>1){const F=C.map(A=>({name:A.name,selectedPhotos:A.selectedPhotos,folderPath:A.folderPath}));localStorage.setItem(de.MULTI_ALBUM_DATA,JSON.stringify(F)),P(),ne("save-album.html?mode=multiple");return}else P()}else P()}}catch(s){console.error("Error processing multi-album data:",s),typeof P=="function"&&P()}if(o){const s=`save-album.html?folderId=${encodeURIComponent(o)}`;ne(s)}else ne("save-album.html")}},!1),{fileInputRef:U,isUploading:N,isProcessingFiles:Q,progressTracker:ae,setSelectedPhotos:ee}=z;m.useEffect(()=>{if(!a)return;(async()=>{try{await Ie()}catch(s){console.warn("Credential prewarming failed:",s)}})()},[a]);const te=m.useMemo(()=>M?Fe(l,M,L):[],[l,M,L]),oe=m.useMemo(()=>new Set(te.map(o=>o.folderId)),[te]),le=m.useMemo(()=>w.filter(o=>!oe.has(o.folderId)),[w,oe]),K=m.useCallback(async o=>{if(!a)return!1;const s=Array.from(o.target.files||[]);if(!s.length)return!1;const{validFiles:p,filteredCount:S}=_t(s);if(p.length===0)return alert("No valid image or video files were selected. Please select media files."),!1;S>0&&console.log(`Filtered out ${S} invalid/system files`);const C=We(p);if(C&&Ye(C)){const F=Ne();if(F){he(C,F,p);const A=new DataTransfer;p.forEach(B=>A.items.add(B));const W={...o,target:{...o.target,files:A.files}};try{await z.handleFileSelection(W,j)}catch(B){console.error("Error in file upload:",B),P()}}else v(C),u(p),T(!0)}else{const F=new DataTransfer;p.forEach(W=>F.items.add(W));const A={...o,target:{...o.target,files:F.files}};try{await z.handleFileSelection(A,j)}catch(W){console.error("Error in single album file selection:",W)}}return!0},[z,j,a]),X=m.useCallback((o,s,p)=>{if(!a)return;Ke(o),he(p,o,s),T(!1),v(null),u([]);const S=U.current;if(S)try{const C=new DataTransfer;s.forEach(A=>{A&&A.name&&C.items.add(A)}),S.files=C.files;const F=new Event("change",{bubbles:!0});Object.defineProperty(F,"target",{writable:!1,value:S}),z.handleFileSelection(F,j)}catch(C){console.error("Error in album creation flow:",C),P()}else console.error("File input ref not available"),P()},[z,j,U,a]),H=m.useCallback(async o=>K(o),[K]),J=m.useCallback(()=>{T(!1),v(null),u([]),U.current&&(U.current.value=""),h.current&&(h.current.value=""),a&&(be(),P())},[U,a]),G=m.useCallback((o=null,s="files")=>{if(a)try{if(be(),P(),localStorage.removeItem(de.MULTI_ALBUM_DATA),ee([]),s==="folder")if(h.current)h.current.click();else throw new Error("Folder picker not available");else z.openFilePicker(o)}catch(p){console.error("Error opening file picker:",p),alert("Sorry, there was an error opening the file picker. Please try again.")}},[z,ee,a]),r=m.useCallback(()=>{try{G(null,"files")}catch(o){console.error("Error selecting files:",o)}},[G]),d=m.useCallback(()=>{try{G(null,"folder")}catch(o){console.error("Error selecting folder:",o)}},[G]),y=E.length>0||l.some(o=>o.contacts&&Object.keys(o.contacts).length>0||o.files.some(s=>s.selectedTags&&s.selectedTags.length>0));return e.jsxs(e.Fragment,{children:[e.jsx(Me,{}),e.jsxs(Le,{$isRTL:c,children:[e.jsx(bt,{publicUsername:$,subscriptionInfo:M,calculatedBytesUsed:L,onNewAlbum:()=>G(null,"files"),onSelectFiles:r,onSelectFolder:d}),(N||Q)&&e.jsx("div",{style:{width:"100%",marginBottom:"20px"},children:e.jsx(De,{progressTracker:ae,isUploading:N,isProcessingFiles:Q,isRTL:q(f)==="rtl",style:{marginTop:"20px"},context:"uploading",showSuccessMessage:!0,showErrorMessage:!0})}),l.length>3&&e.jsx(Nt,{subscriptionInfo:M,albumCount:l.length,folders:l,calculatedBytesUsed:L,t,isRTL:c}),l.length<=3&&e.jsx(Ut,{t,isRTL:c}),y&&e.jsx(Et,{folders:l,searchQuery:E,setSearchQuery:D,onTagFilterChange:Y,onContactFilterChange:O,resetTagFilter:I,resetContactFilter:_}),e.jsx(Ge,{folders:le,setFolders:V,handleDeleteClick:o=>R(o,t),isUploading:N,cognitoUsername:j,isProfileView:!1}),e.jsx(Ce,{ref:U,onFileSelection:K,onFolderSelection:H}),e.jsx("input",{ref:h,type:"file",accept:"image/*,video/*",multiple:!0,webkitdirectory:"",onChange:H,style:{display:"none"}}),e.jsx(Pt,{isOpen:k,folderStructure:b,onChoice:o=>X(o,x,b),onCancel:J})]})]})},Vt=()=>e.jsx(Re,{children:e.jsx(Kt,{})});typeof window<"u"&&document.getElementById("root")&&Ee.createRoot(document.getElementById("root")).render(e.jsx(Vt,{}));
