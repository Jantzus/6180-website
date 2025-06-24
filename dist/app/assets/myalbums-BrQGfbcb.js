import{d as a,q as Be,u as X,a as w,j as e,b as ge,g as J,r as oe,o as re,R as Re,I as Ee,L as ce,p as De}from"./utils-BR5Tkj09.js";import{u as ze,U as Ie}from"./UploadProgress-BudANiyZ.js";import{G as Le,A as Me}from"./styled-components-D8vhGa_p.js";import{A as Ge}from"./AlbumList-CXvUP8Nq.js";import{L as Pe}from"./LazyImage-CX-6wHVd.js";import{R as Oe}from"./DownloadModal-C8Mb1Z2U.js";import{a as _e,b as Ue,c as M,d as We,h as Ye,e as Ne,s as he,f as Ke,i as be}from"./folderStructureUtils-BmdkosLC.js";import{u as Ve}from"./useFolderManagement-BDuN9HsA.js";import"./types-Cxncrjqw.js";const s={colors:{primary:"#007bff",primaryDark:"#0056b3",danger:"#e53935",white:"#fff",grayLight:"#e0e0e0",borderLight:"#eaeaea",text:{primary:"#333",secondary:"#666",white:"#fff"}},spacing:{sm:"8px",md:"16px"},borderRadius:{small:"4px",medium:"8px",large:"16px",circle:"50%"},fontSizes:{xs:"12px",sm:"14px",lg:"18px",xl:"20px"},boxShadow:{primaryBtn:"0 4px 12px rgba(0, 123, 255, 0.2)",xl:"0 8px 24px rgba(0,0,0,0.2)"},breakpoints:{mobile:"767px"}},se=t=>Be`
  @media (max-width: ${s.breakpoints.mobile}) {
    ${t}
  }
`,He=a.header`
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
`,Je=a.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${s.spacing.md}; /* Reduced from lg to md to match content */
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
  
  ${se(`
    padding: 0 ${s.spacing.md};
  `)}
`,Xe=a.div`
  display: flex;
  align-items: center;
  gap: ${s.spacing.sm};
  flex: 0 0 auto;
`,qe=a.img`
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
  
  ${se(`
    width: 24px;
    height: 24px;
  `)}
`,Ze=a.h1`
  font-size: ${s.fontSizes.xl};
  font-weight: 600;
  color: ${s.colors.text.primary};
  margin: 0;
  letter-spacing: -0.01em;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif;
  
  ${se(`
    font-size: ${s.fontSizes.lg};
  `)}
`,Qe=a.div`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  padding: 0 ${s.spacing.md};
  
  @media (max-width: 768px) {
    display: none;
  }
`,et=a.div`
  display: inline-flex;
  gap: ${s.spacing.sm};
  align-items: center;
`,tt=a.button`
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
`,ot=a.button`
  display: inline-flex;
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
`,rt=a.span`
  font-size: 18px;
  line-height: 1;
  font-weight: 300;
`,st=a.span`
  font-size: 16px;
  line-height: 1;
`,nt=a.div`
  flex: 0 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  gap: ${s.spacing.sm};
`,it=a.button`
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
`,at=a.button`
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
`,lt=a.div`
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
`,ct=a.span`
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 768px) {
    display: none;
  }
`,dt=a.svg`
  width: 12px;
  height: 12px;
  transform: ${t=>t.$isOpen?"rotate(180deg)":"rotate(0deg)"};
  transition: transform 0.2s ease;
  opacity: 0.6;
`,pt=a.div`
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

  ${se(`
    min-width: 220px;
    max-width: calc(100vw - 32px);
  `)}
`,ye=a.a`
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
`,ft=a.button`
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
`,gt=a.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`,xt=a.span`
  font-size: ${s.fontSizes.xs};
  color: ${s.colors.text.secondary};
  font-weight: 400;
  margin-top: 2px;
`,ut=a.div`
  height: 1px;
  background-color: rgba(0, 0, 0, 0.08);
  margin: ${s.spacing.sm} 0;
`,mt=a.div`
  height: 1px;
  background-color: ${s.colors.borderLight};
  width: 100%;
`,ht=({publicUsername:t,subscriptionInfo:p,calculatedBytesUsed:c,onNewAlbum:u,onSelectFiles:f,onSelectFolder:k})=>{const{t:T,language:y}=X(),v=J(y)==="rtl",[g,n]=w.useState(!1),h=w.useRef(null);w.useEffect(()=>{const C=G=>{h.current&&!h.current.contains(G.target)&&n(!1)};return document.addEventListener("mousedown",C),()=>document.removeEventListener("mousedown",C)},[]);const m=()=>{if(!p)return"-- / -- GB";const C=(c/(1024*1024*1024)).toFixed(1),G=p.intNumberOfSubscriptions===0?10:p.intNumberOfSubscriptions*10;return`${C} / ${G} GB`},b=()=>{if(!t)return"Profile";const C=t.split(" ")[0];return C.length>12?C.substring(0,12)+"...":C},$=()=>{localStorage.clear(),oe("index.html")},B=()=>{f?f():u&&u()},R=()=>{k&&k()};return e.jsx(e.Fragment,{children:e.jsxs(He,{children:[e.jsxs(Je,{$isRTL:v,children:[e.jsxs(Xe,{children:[e.jsx(qe,{src:ge("images/logo_no_background.png"),alt:"6180 Logo"}),e.jsx(Ze,{children:"6180"})]}),e.jsx(Qe,{children:e.jsxs(et,{children:[e.jsxs(tt,{onClick:B,children:[e.jsx(rt,{children:"+"}),T("New Album")]}),k&&e.jsxs(ot,{onClick:R,children:[e.jsx(st,{children:"📁"}),T("Upload Folder")]})]})}),e.jsxs(nt,{children:[e.jsx(it,{onClick:B,children:T("New Album")}),e.jsxs("div",{ref:h,style:{position:"relative"},children:[e.jsxs(at,{onClick:()=>n(!g),children:[e.jsx(lt,{children:b().charAt(0).toUpperCase()}),e.jsx(ct,{children:b()}),e.jsx(dt,{$isOpen:g,viewBox:"0 0 12 12",children:e.jsx("path",{d:"M2.5 4.5L6 8L9.5 4.5",stroke:"currentColor",strokeWidth:"1.5",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})})]}),g&&e.jsxs(pt,{$isRTL:v,children:[t&&e.jsxs(ye,{href:`https://6180.io/${t}`,target:"_blank",rel:"noopener noreferrer",children:[e.jsx("span",{style:{fontSize:"16px"},children:"👤"}),T("View Public Profile")]}),e.jsxs(ye,{href:ge("storage/manage.html"),children:[e.jsx("span",{style:{fontSize:"16px"},children:"📦"}),e.jsxs(gt,{children:[e.jsx("span",{children:T("Storage")}),e.jsx(xt,{children:m()})]})]}),e.jsx(ut,{}),e.jsxs(ft,{onClick:$,children:[e.jsx("span",{style:{fontSize:"16px"},children:"🚪"}),T("Log Out")]})]})]})]})]}),e.jsx(mt,{})]})})},bt=a.div`
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
`,yt=a.div`
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`,wt=a.div`
  position: relative;
  max-width: 100%;
`,St=a.div`
  position: absolute;
  left: ${t=>t.$isRTL?"auto":"16px"};
  right: ${t=>t.$isRTL?"16px":"auto"};
  top: 50%;
  transform: translateY(-50%);
  color: #9CA3AF;
  pointer-events: none;
  z-index: 1;
`,$t=a.input`
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
`,Tt=a.button`
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
`,de=a.div`
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 8px;
  }
`,pe=a.div`
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
`,vt=a.button`
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
`,kt=a.button`
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
`,jt=a.button`
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
`,Ft=a.button`
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
`,Ct=a.div`
  margin-top: 8px;
  font-size: 13px;
  color: #555;
  font-style: italic;
  text-align: ${t=>t.$isRTL?"right":"left"};
`,At=a.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 8px 0;
`,Bt=({folders:t,searchQuery:p,setSearchQuery:c,onTagFilterChange:u,onContactFilterChange:f,resetTagFilter:k,resetContactFilter:T})=>{const{t:y,language:v}=X(),g=J(v)==="rtl",[n,h]=w.useState(!1),[m,b]=w.useState([]),[$,B]=w.useState([]),[R,C]=w.useState(null),[G,Y]=w.useState([]),[N,ne]=w.useState([]),[A,P]=w.useState([]),[E,D]=w.useState([]),O=r=>r.subtags.filter(o=>$.includes(o.key)),q=r=>{const o=O(r);if(o.length===0)return r.tagTitle;const d=o.map(i=>i.subtagTitle).join(", ");return`${r.tagTitle} (${d})`};w.useEffect(()=>{const r=new Map,o=new Map;t.forEach(l=>{const x=l.updatedAt?new Date(l.updatedAt).getTime():l.createdAt?new Date(l.createdAt).getTime():0;l.files.forEach(S=>{var j;(j=S.selectedTags)==null||j.forEach(F=>{var xe;const L=`${F.TagType}-${F.tagTitle}`;if(!r.has(L))r.set(L,{tag:{key:L,TagType:F.TagType,tagTitle:F.tagTitle,timestamp:x,subtags:[]},timestamp:x});else{const z=r.get(L);x>z.timestamp&&(z.timestamp=x,z.tag.timestamp=x)}(xe=F.subtags)==null||xe.forEach(z=>{const ue=`${z.TagType}-${z.tagTitle}-${z.subtagTitle}`,me=r.get(L).tag,le=me.subtags.find(Ae=>Ae.key===ue);le?x>le.timestamp&&(le.timestamp=x):me.subtags.push({key:ue,TagType:z.TagType,tagTitle:z.tagTitle,subtagTitle:z.subtagTitle,timestamp:x})})})}),l.contacts&&Object.values(l.contacts).forEach(S=>{if(typeof S=="string"&&!S.toString().startsWith("Profile-")){const j=o.get(S);(!j||x>j.timestamp)&&o.set(S,{name:S,timestamp:x})}})});const d=Array.from(r.values()).sort((l,x)=>x.timestamp-l.timestamp).map(l=>(l.tag.subtags.sort((x,S)=>S.timestamp-x.timestamp),l.tag)),i=Array.from(o.values()).sort((l,x)=>x.timestamp-l.timestamp).map(l=>l.name);b(d),Y(d),ne(i),D(i)},[t]);const K=r=>{if(r.length===0){k(),Y(m);return}const o=t.filter(d=>{const i=new Set;return d.files.forEach(l=>{var x;(x=l.selectedTags)==null||x.forEach(S=>{var j;i.add(`${S.TagType}-${S.tagTitle}`),(j=S.subtags)==null||j.forEach(F=>{i.add(`${F.TagType}-${F.tagTitle}-${F.subtagTitle}`)})})}),r.every(l=>i.has(l))});V(o),u(o)},Z=r=>{if(r.length===0){T(),D(N);return}const o=t.filter(d=>{if(!d.contacts)return!1;const i=Object.values(d.contacts).filter(l=>typeof l=="string"&&!l.toString().startsWith("Profile-"));return r.every(l=>i.includes(l))});ae(o),f(o)},Q=r=>{const o=$.includes(r.key),d=R===r.key;if(o){if(o&&!d)C(r.key);else if(o&&d){const i=$.filter(l=>l!==r.key&&!r.subtags.some(x=>x.key===l));B(i),C(null),K(i)}}else{const i=[...$,r.key];B(i),C(r.key),K(i)}},ee=r=>{const o=$.includes(r.key);let d;o?d=$.filter(i=>i!==r.key):d=[...$,r.key],B(d),K(d)},ie=r=>{let o;A.includes(r)?o=A.filter(d=>d!==r):o=[...A,r],P(o),Z(o)},V=r=>{const o=new Set;r.forEach(i=>{i.files.forEach(l=>{var x;(x=l.selectedTags)==null||x.forEach(S=>{o.add(`${S.TagType}-${S.tagTitle}`)})})}),$.forEach(i=>{i.includes("-",i.indexOf("-")+1)||o.add(i)});const d=m.filter(i=>o.has(i.key));Y(d)},ae=r=>{const o=new Set;r.forEach(i=>{i.contacts&&Object.values(i.contacts).forEach(l=>{typeof l=="string"&&!l.toString().startsWith("Profile-")&&o.add(l)})}),A.forEach(i=>{o.add(i)});const d=N.filter(i=>o.has(i));D(d)},_=R?m.find(r=>r.key===R):null,H=$.length,I=A.length,U=N.length>0,W=m.length>0;return!U&&!W&&!p?null:e.jsxs(bt,{$isRTL:g,children:[e.jsx(yt,{children:e.jsxs(wt,{children:[e.jsx(St,{$isRTL:g,children:e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("circle",{cx:"11",cy:"11",r:"8"}),e.jsx("path",{d:"m21 21-4.35-4.35"})]})}),e.jsx($t,{$isRTL:g,type:"text",value:p,onChange:r=>c(r.target.value),placeholder:y("Search albums by title or description")}),p&&e.jsx(Tt,{$isRTL:g,onClick:()=>c(""),children:e.jsxs("svg",{width:"10",height:"10",viewBox:"0 0 24 24",fill:"none",stroke:"white",strokeWidth:"2",children:[e.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),e.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})}),(U||W)&&e.jsxs(e.Fragment,{children:[e.jsx(de,{children:e.jsxs(pe,{$isRTL:g,children:[U&&e.jsx(vt,{$isActive:n,onClick:()=>h(!n),title:y("Toggle contacts filter"),children:"👥"}),W&&G.length>0?G.map(r=>{const o=O(r),d=o.length>0?`${r.TagType}: ${r.tagTitle} (${o.map(i=>i.subtagTitle).join(", ")})`:`Click to add/remove: ${r.TagType}: ${r.tagTitle}`;return e.jsx(kt,{$isSelected:$.includes(r.key),$isDisplayed:R===r.key,onClick:()=>Q(r),title:d,children:q(r)},r.key)}):W?e.jsx(At,{children:y("No tags available")}):null]})}),n&&U&&e.jsx(de,{children:e.jsx(pe,{$isRTL:g,children:E.map(r=>e.jsx(jt,{$isSelected:A.includes(r),onClick:()=>ie(r),title:`Click to add/remove: ${r}`,children:r},r))})}),_&&_.subtags.length>0&&e.jsx(de,{children:e.jsx(pe,{$isRTL:g,children:_.subtags.map(r=>e.jsx(Ft,{$isSelected:$.includes(r.key),onClick:()=>ee(r),title:`Click to add/remove: ${r.TagType}: ${r.tagTitle} → ${r.subtagTitle}`,children:r.subtagTitle},r.key))})}),(H>0||I>0)&&e.jsx(Ct,{$isRTL:g,children:I>0&&H>0?y("Showing albums with all selected contacts and tags"):I>0?y("Showing albums with all selected contacts"):H>0?y("Showing albums with all selected tags"):""})]})]})},Rt=a.div`
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
`,Et=a.div`
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
`,Dt=a.h2`
  margin: 0 0 16px 0;
  font-size: 24px;
  font-weight: 600;
  color: #333;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
`,zt=a.p`
  margin: 0 0 24px 0;
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`,It=a.div`
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
`,we=a.div`
  margin-left: ${t=>t.$level*20}px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
`,Lt=a.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`,Se=a.button`
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
`,$e=a.span`
  font-size: 20px;
  flex-shrink: 0;
`,Te=a.div`
  flex: 1;
`,ve=a.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
`,ke=a.div`
  font-size: 14px;
  color: #666;
  line-height: 1.4;
`,Mt=a.button`
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
`,Gt=({isOpen:t,folderStructure:p,onChoice:c,onCancel:u})=>{const{t:f,language:k}=X(),T=J(k)==="rtl";if(!t||!p)return null;const y=(n,h=0)=>{const m=[];return h===0&&m.push(e.jsxs(we,{$level:h,children:[e.jsx("span",{children:"📁"}),e.jsx("span",{children:n.name}),e.jsxs("span",{style:{color:"#999",fontSize:"12px"},children:["(",n.files.length===1?f("{{count}} file",{count:n.files.length.toString()}):f("{{count}} files",{count:n.files.length.toString()}),")"]})]},n.path)),n.subfolders.forEach(b=>{const $=b.files.length+b.subfolders.reduce((B,R)=>B+R.files.length,0);m.push(e.jsxs(we,{$level:h+1,children:[e.jsx("span",{children:"📁"}),e.jsx("span",{children:b.name}),e.jsxs("span",{style:{color:"#999",fontSize:"12px"},children:["(",$===1?f("{{count}} file",{count:$.toString()}):f("{{count}} files",{count:$.toString()}),")"]})]},b.path)),h<1&&b.subfolders.length>0&&m.push(...y(b,h+2))}),m},v=n=>{sessionStorage.setItem("album_creation_preference",n),c(n)},g=e.jsx(Rt,{onClick:u,children:e.jsxs(Et,{$isRTL:T,onClick:n=>n.stopPropagation(),children:[e.jsx(Dt,{children:f("Create Multiple Albums?")}),e.jsx(zt,{children:f("We noticed your folder contains subfolders. Would you like to create a separate album for each subfolder, or treat them all as one album?")}),e.jsx(It,{children:y(p)}),e.jsxs(Lt,{children:[e.jsxs(Se,{onClick:()=>v("separate"),children:[e.jsx($e,{children:"📁"}),e.jsxs(Te,{children:[e.jsx(ve,{children:f("Separate albums by folder")}),e.jsx(ke,{children:f('Each subfolder becomes a different album (e.g., "Day1", "Day2")')})]})]}),e.jsxs(Se,{onClick:()=>v("combined"),children:[e.jsx($e,{children:"🔗"}),e.jsxs(Te,{children:[e.jsx(ve,{children:f("Combine all into one album")}),e.jsx(ke,{children:f("All files are merged into one album")})]})]})]}),e.jsx(Mt,{onClick:u,children:f("Cancel")})]})});return Oe.createPortal(g,document.body)},je=10,fe=3,Pt=t=>t.name.startsWith(".DS_Store")||t.name.startsWith("._")||t.name.startsWith("Thumbs.db")||t.name.startsWith(".")||t.name==="desktop.ini"||!/\.(jpg|jpeg|png|gif|bmp|webp|svg|mp4|mov|avi|wmv|flv|webm|mkv)$/i.test(t.name)?!1:t.size>0,Ot=t=>{const p=[];let c=0;for(const u of t){if(!u||!u.name){c++;continue}Pt(u)?p.push(u):c++}return{validFiles:p,filteredCount:c}},Fe=re.forwardRef(({onFileSelection:t,onFolderSelection:p},c)=>e.jsxs("div",{style:{display:"none"},children:[e.jsx("input",{ref:c,id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:t,style:{display:"none"}}),e.jsx("input",{id:"folder-input",type:"file",accept:"image/*,video/*",multiple:!0,webkitdirectory:"",onChange:p,style:{display:"none"}})]}));Fe.displayName="EnhancedFileInput";const _t=re.memo(({t,isRTL:p})=>e.jsx("div",{style:{padding:"20px 24px",marginTop:"20px",marginBottom:"20px",backgroundColor:"#fff",border:"1px solid #ddd",borderRadius:"8px",textAlign:p?"right":"left",direction:p?"rtl":"ltr",boxShadow:"0 1px 3px rgba(0,0,0,0.1)",position:"relative"},children:e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"16px"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:"18px",fontWeight:"600",marginBottom:"4px",color:"#333",lineHeight:"1.3"},children:t("Use the 6180 app to showcase your albums offline")}),e.jsx("div",{style:{fontSize:"14px",color:"#666",lineHeight:"1.4",fontWeight:"400"},children:t("Intelligently tagged and beautifully organized")})]}),e.jsxs("div",{style:{display:"flex",gap:"12px",alignItems:"center",flexShrink:0},children:[e.jsxs("a",{href:"https://apps.apple.com/app/6180/id6468679610",target:"_blank",rel:"noopener noreferrer",style:{display:"inline-flex",alignItems:"center",gap:"8px",padding:"8px 16px",backgroundColor:"#007bff",borderRadius:"8px",textDecoration:"none",color:"white",fontSize:"14px",fontWeight:"500",transition:"all 0.2s ease",whiteSpace:"nowrap",border:"none",cursor:"pointer"},onMouseEnter:c=>{c.currentTarget.style.backgroundColor="#0056b3",c.currentTarget.style.transform="translateY(-1px)"},onMouseLeave:c=>{c.currentTarget.style.backgroundColor="#007bff",c.currentTarget.style.transform="translateY(0)"},children:[e.jsx("span",{style:{fontSize:"16px"},children:"🍎"}),t("Open On iOS")]}),e.jsxs("a",{href:"https://play.google.com/store/apps/details?id=io.i6180.android",target:"_blank",rel:"noopener noreferrer",style:{display:"inline-flex",alignItems:"center",gap:"8px",padding:"8px 16px",backgroundColor:"#007bff",borderRadius:"8px",textDecoration:"none",color:"white",fontSize:"14px",fontWeight:"500",transition:"all 0.2s ease",whiteSpace:"nowrap",border:"none",cursor:"pointer"},onMouseEnter:c=>{c.currentTarget.style.backgroundColor="#0056b3",c.currentTarget.style.transform="translateY(-1px)"},onMouseLeave:c=>{c.currentTarget.style.backgroundColor="#007bff",c.currentTarget.style.transform="translateY(0)"},children:[e.jsx("span",{style:{fontSize:"16px"},children:"🤖"}),t("Open On Android")]})]})]})})),Ut=t=>t/(1024*1024*1024),te=t=>t<1?`${Math.round(t*1e3)} MB`:`${t.toFixed(1)} GB`,Ce=(t,p,c)=>{if(!p)return[];const{intNumberOfSubscriptions:u}=p;let f=[];if(u===0){const k=je*1024*1024*1024;if(t.length>5){const T=[...t].sort((g,n)=>{const h=new Date(g.createdAt||0).getTime(),m=new Date(n.createdAt||0).getTime();return h-m}),y=t.length-5;f=[...T.slice(0,y)]}if(c>k){const T=[...t].sort((n,h)=>{const m=new Date(n.createdAt||0).getTime(),b=new Date(h.createdAt||0).getTime();return m-b});let y=c-k,v=[];for(const n of T){if(y<=0)break;const h=n.files.reduce((m,b)=>m+(b.dataInBytes||0),0);v.push(n),y-=h}const g=new Set(f.map(n=>n.folderId));for(const n of v)g.has(n.folderId)||f.push(n)}}else{const k=u*10*1024*1024*1024;if(c>k){const T=[...t].sort((v,g)=>{const n=new Date(v.createdAt||0).getTime(),h=new Date(g.createdAt||0).getTime();return n-h});let y=c-k;for(const v of T){if(y<=0)break;const g=v.files.reduce((n,h)=>n+(h.dataInBytes||0),0);f.push(v),y-=g}}}return f},Wt=re.memo(({albumsToDelete:t,isRTL:p})=>{const{t:c}=X();return t.length===0?null:e.jsx("div",{style:{marginTop:"16px"},children:t.map(u=>e.jsx("div",{style:{marginBottom:"20px",direction:p?"rtl":"ltr"},children:e.jsxs("div",{style:{background:"#fff",border:"2px solid #dc3545",borderRadius:"12px",padding:"20px",position:"relative",overflow:"hidden",opacity:"0.85"},children:[e.jsx("div",{style:{marginTop:"30px",marginBottom:"16px",display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexDirection:p?"row-reverse":"row"},children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:p?"flex-end":"flex-start"},children:[e.jsx("h3",{style:{fontSize:"18px",margin:"0 0 4px 0",color:"#dc3545",fontWeight:"bold"},children:u.folderName||"Untitled Album"}),e.jsxs("div",{style:{fontSize:"13px",color:"#666",textAlign:p?"right":"left"},children:[u.createdAt&&e.jsxs("div",{children:[c("Created"),": ",new Date(u.createdAt).toLocaleDateString()]}),e.jsx("div",{children:u.files.length===1?c("{{count}} file",{count:u.files.length.toString()}):c("{{count}} files",{count:u.files.length.toString()})})]})]})}),u.folderDescription&&u.folderDescription.length>1&&e.jsx("div",{style:{fontSize:"14px",color:"#555",marginBottom:"16px",textAlign:p?"right":"left",fontStyle:"italic"},children:u.folderDescription}),e.jsxs("div",{style:{width:"100%",position:"relative"},children:[e.jsxs("div",{style:{display:"flex",overflowX:"auto",gap:"12px",paddingBottom:"8px",msOverflowStyle:"none",scrollbarWidth:"thin",WebkitOverflowScrolling:"touch",maxWidth:"100%",flexDirection:p?"row-reverse":"row"},children:[u.files.slice(0,fe).map((f,k)=>e.jsxs("div",{style:{width:"160px",height:"100px",flexShrink:0,position:"relative",borderRadius:"6px",overflow:"hidden",border:"2px solid #dc3545"},children:[e.jsx(Pe,{thumbnailDataKey:f.thumbnailDataKey,dataKey:f.dataKey,alt:c("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover"}}),e.jsx("div",{style:{position:"absolute",top:"0",left:"0",right:"0",bottom:"0",background:"rgba(220, 53, 69, 0.3)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"24px"},children:"❌"})]},k)),u.files.length>fe&&e.jsxs("div",{style:{width:"160px",height:"100px",flexShrink:0,position:"relative",borderRadius:"6px",border:"2px dashed #dc3545",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"#f8f9fa",color:"#dc3545",fontSize:"14px",fontWeight:"bold"},children:["+",u.files.length-fe," more"]})]}),u.files.length>2&&e.jsx("div",{style:{position:"absolute",[p?"left":"right"]:0,top:0,bottom:8,width:"30px",background:p?"linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))":"linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))",pointerEvents:"none"}})]})]})},u.folderId))})}),Yt=re.memo(({subscriptionInfo:t,albumCount:p,folders:c,calculatedBytesUsed:u,t:f,isRTL:k})=>{if(!t)return null;const{intNumberOfSubscriptions:T}=t,y=Ut(u),v=w.useMemo(()=>Ce(c,t,u),[c,t,u]);let g="none",n="";if(T===0){const m=je,b=p>5,$=y>m;!b&&!$?(g="free-space",n=f("You can save 5 albums that total a maximum of {FREE_TIER_STORAGE_LIMIT_GB} GB for free. Delete unused albums to make space.").replace("{FREE_TIER_STORAGE_LIMIT_GB}",m.toString())):b&&$?(g="free-both-exceeded",n=f("You have over 5 albums AND your files occupy {formatGB(usedGB)} space (limit: {FREE_TIER_STORAGE_LIMIT_GB} GB). These albums are being automatically deleted unless you decide to delete other albums:").replace("{formatGB(usedGB)}",te(y)).replace("{FREE_TIER_STORAGE_LIMIT_GB}",m.toString())):b?(g="free-count-exceeded",n=f("You have {albumCount} albums but can only save 5 for free. These oldest albums are being automatically deleted unless you decide to delete other albums:").replace("{albumCount}",p.toString())):$&&(g="free-storage-exceeded",n=f("Your files occupy {formatGB(usedGB)} space, but you only have {FREE_TIER_STORAGE_LIMIT_GB} GB storage. These albums are being automatically deleted unless you decide to delete other albums:").replace("{formatGB(usedGB)}",te(y)).replace("{FREE_TIER_STORAGE_LIMIT_GB}",m.toString()))}else{const m=T*10,b=m-y;b<0?(g="paid-exceeded",n=f("Your files occupy {formatGB(usedGB)} space, but you only have {totalStorageGB} GB storage. These albums are being automatically deleted unless you decide to delete other albums:").replace("{formatGB(usedGB)}",te(y)).replace("{totalStorageGB}",m.toString())):b<1.5&&(g="paid-warning",n=f("Your files occupy {formatGB(usedGB)} of {totalStorageGB} GB storage. You may need to upgrade your subscription soon.").replace("{formatGB(usedGB)}",te(y)).replace("{totalStorageGB}",m.toString()))}if(g==="none")return null;const h=["free-count-exceeded","free-storage-exceeded","free-both-exceeded","paid-exceeded"].includes(g);return e.jsxs("div",{style:{padding:"12px 20px",marginBottom:"16px",backgroundColor:h?"#fff3cd":"#f8f9fa",border:`1px solid ${h?"#ffeaa7":"#e9ecef"}`,borderRadius:"8px",color:h?"#856404":"#6c757d",fontSize:"14px",textAlign:k?"right":"left",direction:k?"rtl":"ltr"},children:[n,h&&v.length>0&&e.jsx(Wt,{albumsToDelete:v,isRTL:k}),e.jsx("div",{style:{marginTop:"12px"},children:e.jsx("a",{href:ge("storage/manage.html"),style:{color:"#007bff",textDecoration:"underline",cursor:"pointer",fontWeight:"bold"},onMouseEnter:m=>{m.currentTarget.style.color="#0056b3"},onMouseLeave:m=>{m.currentTarget.style.color="#007bff"},children:f("Click To Upgrade Subscription (US$1 monthly per 10 GB)")})})]})}),Nt=()=>{const{t,language:p}=X(),c=J(p)==="rtl",[u,f]=w.useState(!1),[k,T]=w.useState(null),[y,v]=w.useState([]),g=w.useRef(null),{folders:n,filteredFolders:h,publicUsername:m,cognitoUsername:b,searchQuery:$,setSearchQuery:B,handleContactFilterChange:R,resetContactFilter:C,handleTagFilterChange:G,resetTagFilter:Y,handleDeleteClick:N,setFolders:ne,subscriptionInfo:A,calculatedBytesUsed:P}=Ve(o=>{(o.includes("Error")||o.includes("Failed"))&&console.error(o)}),E=ze(o=>{if(_e()){const i=localStorage.getItem(ce.SELECTED_PHOTOS);if(i)try{const l=JSON.parse(i),x=Ue(l);if(x.length>1){const S=x.map(j=>({name:j.name,selectedPhotos:j.selectedPhotos,folderPath:j.folderPath}));localStorage.setItem(ce.MULTI_ALBUM_DATA,JSON.stringify(S)),M(),oe("save-album.html?mode=multiple");return}else M()}catch(l){console.error("Error processing multi-album data:",l),M()}else M()}if(o){const i=`save-album.html?folderId=${encodeURIComponent(o)}`;oe(i)}else oe("save-album.html")},!1),{fileInputRef:D,isUploading:O,isProcessingFiles:q,progressTracker:K,setSelectedPhotos:Z}=E;w.useEffect(()=>{(async()=>{try{await De()}catch(d){console.warn("Credential prewarming failed:",d)}})()},[]);const Q=w.useMemo(()=>A?Ce(n,A,P):[],[n,A,P]),ee=w.useMemo(()=>new Set(Q.map(o=>o.folderId)),[Q]),ie=w.useMemo(()=>h.filter(o=>!ee.has(o.folderId)),[h,ee]),V=w.useCallback(async o=>{const d=Array.from(o.target.files||[]);if(!d.length)return!1;const{validFiles:i,filteredCount:l}=Ot(d);if(i.length===0)return alert("No valid image or video files were selected. Please select media files."),!1;l>0&&console.log(`Filtered out ${l} invalid/system files`);const x=We(i);if(x&&Ye(x)){const S=Ne();if(S){he(x,S,i);const j=new DataTransfer;i.forEach(L=>j.items.add(L));const F={...o,target:{...o.target,files:j.files}};try{await E.handleFileSelection(F,b)}catch(L){console.error("Error in file upload:",L),M()}}else T(x),v(i),f(!0)}else{const S=new DataTransfer;i.forEach(F=>S.items.add(F));const j={...o,target:{...o.target,files:S.files}};try{await E.handleFileSelection(j,b)}catch(F){console.error("Error in single album file selection:",F)}}return!0},[E,b]),ae=w.useCallback((o,d,i)=>{Ke(o),he(i,o,d),f(!1),T(null),v([]);const l=D.current;if(l)try{const x=new DataTransfer;d.forEach(j=>{j&&j.name&&x.items.add(j)}),l.files=x.files;const S=new Event("change",{bubbles:!0});Object.defineProperty(S,"target",{writable:!1,value:l}),E.handleFileSelection(S,b)}catch(x){console.error("Error in album creation flow:",x),M()}else console.error("File input ref not available"),M()},[E,b,D]),_=w.useCallback(async o=>V(o),[V]),H=w.useCallback(()=>{f(!1),T(null),v([]),D.current&&(D.current.value=""),g.current&&(g.current.value=""),be(),M()},[D]),I=w.useCallback((o=null,d="files")=>{try{if(be(),M(),localStorage.removeItem(ce.MULTI_ALBUM_DATA),Z([]),d==="folder")if(g.current)g.current.click();else throw new Error("Folder picker not available");else E.openFilePicker(o)}catch(i){console.error("Error opening file picker:",i),alert("Sorry, there was an error opening the file picker. Please try again.")}},[E,Z]),U=w.useCallback(()=>{try{I(null,"files")}catch(o){console.error("Error selecting files:",o)}},[I]),W=w.useCallback(()=>{try{I(null,"folder")}catch(o){console.error("Error selecting folder:",o)}},[I]),r=$.length>0||n.some(o=>o.contacts&&Object.keys(o.contacts).length>0||o.files.some(d=>d.selectedTags&&d.selectedTags.length>0));return e.jsxs(e.Fragment,{children:[e.jsx(Le,{}),e.jsxs(Me,{$isRTL:c,children:[e.jsx(ht,{publicUsername:m,subscriptionInfo:A,calculatedBytesUsed:P,onNewAlbum:()=>I(null,"files"),onSelectFiles:U,onSelectFolder:W}),(O||q)&&e.jsx("div",{style:{width:"100%",marginBottom:"20px"},children:e.jsx(Ie,{progressTracker:K,isUploading:O,isProcessingFiles:q,isRTL:J(p)==="rtl",style:{marginTop:"20px"},context:"uploading",showSuccessMessage:!0,showErrorMessage:!0})}),n.length>3&&e.jsx(Yt,{subscriptionInfo:A,albumCount:n.length,folders:n,calculatedBytesUsed:P,t,isRTL:c}),n.length<=3&&e.jsx(_t,{t,isRTL:c}),r&&e.jsx(Bt,{folders:n,searchQuery:$,setSearchQuery:B,onTagFilterChange:G,onContactFilterChange:R,resetTagFilter:Y,resetContactFilter:C}),e.jsx(Ge,{folders:ie,setFolders:ne,handleDeleteClick:o=>N(o,t),isUploading:O,cognitoUsername:b,isProfileView:!1}),e.jsx(Fe,{ref:D,onFileSelection:V,onFolderSelection:_}),e.jsx("input",{ref:g,type:"file",accept:"image/*,video/*",multiple:!0,webkitdirectory:"",onChange:_,style:{display:"none"}}),e.jsx(Gt,{isOpen:u,folderStructure:k,onChoice:o=>ae(o,y,k),onCancel:H})]})]})};Re.createRoot(document.getElementById("root")).render(e.jsx(Ee,{children:e.jsx(Nt,{})}));
