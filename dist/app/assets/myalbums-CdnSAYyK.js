import{d as i,q as Be,u as X,a as y,j as e,b as ge,g as J,r as oe,o as re,R as Ee,I as Re,L as ce,p as ze}from"./utils-CWdzPvYe.js";import{u as De,U as Ie}from"./useFileUploadProcessor-CpX7IOHU.js";import{G as Le,A as Me}from"./styled-components-B6xIuogB.js";import{A as Ge}from"./AlbumList-Dei8jmQH.js";import{L as Pe}from"./LazyImage-BrSh01Xa.js";import{a as Oe,b as _e,c as L,d as Ue,h as We,e as Ye,s as he,f as Ne,i as be}from"./folderStructureUtils-BmdkosLC.js";import{u as Ke}from"./useFolderManagement-D65l0sHK.js";import"./fileOperations-Db84KpGJ.js";import"./types-Cxncrjqw.js";const s={colors:{primary:"#007bff",primaryDark:"#0056b3",danger:"#e53935",white:"#fff",grayLight:"#e0e0e0",borderLight:"#eaeaea",text:{primary:"#333",secondary:"#666",white:"#fff"}},spacing:{sm:"8px",md:"16px"},borderRadius:{small:"4px",medium:"8px",large:"16px",circle:"50%"},fontSizes:{xs:"12px",sm:"14px",lg:"18px",xl:"20px"},boxShadow:{primaryBtn:"0 4px 12px rgba(0, 123, 255, 0.2)",xl:"0 8px 24px rgba(0,0,0,0.2)"},breakpoints:{mobile:"767px"}},se=t=>Be`
  @media (max-width: ${s.breakpoints.mobile}) {
    ${t}
  }
`,Ve=i.header`
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
`,He=i.div`
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
`,Je=i.div`
  display: flex;
  align-items: center;
  gap: ${s.spacing.sm};
  flex: 0 0 auto;
`,Xe=i.img`
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
`,qe=i.h1`
  font-size: ${s.fontSizes.xl};
  font-weight: 600;
  color: ${s.colors.text.primary};
  margin: 0;
  letter-spacing: -0.01em;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif;
  
  ${se(`
    font-size: ${s.fontSizes.lg};
  `)}
`,Ze=i.div`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  padding: 0 ${s.spacing.md};
  
  @media (max-width: 768px) {
    display: none;
  }
`,Qe=i.div`
  display: inline-flex;
  gap: ${s.spacing.sm};
  align-items: center;
`,et=i.button`
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
`,tt=i.button`
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
`,ot=i.span`
  font-size: 18px;
  line-height: 1;
  font-weight: 300;
`,rt=i.span`
  font-size: 16px;
  line-height: 1;
`,st=i.div`
  flex: 0 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  gap: ${s.spacing.sm};
`,nt=i.button`
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
`,it=i.button`
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
`,at=i.div`
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
`,lt=i.span`
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 768px) {
    display: none;
  }
`,ct=i.svg`
  width: 12px;
  height: 12px;
  transform: ${t=>t.$isOpen?"rotate(180deg)":"rotate(0deg)"};
  transition: transform 0.2s ease;
  opacity: 0.6;
`,dt=i.div`
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
`,ye=i.a`
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
`,pt=i.button`
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
`,ft=i.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`,gt=i.span`
  font-size: ${s.fontSizes.xs};
  color: ${s.colors.text.secondary};
  font-weight: 400;
  margin-top: 2px;
`,xt=i.div`
  height: 1px;
  background-color: rgba(0, 0, 0, 0.08);
  margin: ${s.spacing.sm} 0;
`,ut=i.div`
  height: 1px;
  background-color: ${s.colors.borderLight};
  width: 100%;
`,mt=({publicUsername:t,subscriptionInfo:f,calculatedBytesUsed:d,onNewAlbum:u,onSelectFiles:g,onSelectFolder:v})=>{const{t:$,language:h}=X(),T=J(h)==="rtl",[a,l]=y.useState(!1),b=y.useRef(null);y.useEffect(()=>{const C=G=>{b.current&&!b.current.contains(G.target)&&l(!1)};return document.addEventListener("mousedown",C),()=>document.removeEventListener("mousedown",C)},[]);const m=()=>{if(!f)return"-- / -- GB";const C=(d/(1024*1024*1024)).toFixed(1),G=f.intNumberOfSubscriptions===0?10:f.intNumberOfSubscriptions*10;return`${C} / ${G} GB`},S=()=>{if(!t)return"Profile";const C=t.split(" ")[0];return C.length>12?C.substring(0,12)+"...":C},k=()=>{localStorage.clear(),oe("index.html")},B=()=>{g?g():u&&u()},M=()=>{v&&v()};return e.jsx(e.Fragment,{children:e.jsxs(Ve,{children:[e.jsxs(He,{$isRTL:T,children:[e.jsxs(Je,{children:[e.jsx(Xe,{src:ge("images/logo_no_background.png"),alt:"6180 Logo"}),e.jsx(qe,{children:"6180"})]}),e.jsx(Ze,{children:e.jsxs(Qe,{children:[e.jsxs(et,{onClick:B,children:[e.jsx(ot,{children:"+"}),$("New Album")]}),v&&e.jsxs(tt,{onClick:M,children:[e.jsx(rt,{children:"📁"}),$("Upload Folder")]})]})}),e.jsxs(st,{children:[e.jsx(nt,{onClick:B,children:$("New Album")}),e.jsxs("div",{ref:b,style:{position:"relative"},children:[e.jsxs(it,{onClick:()=>l(!a),children:[e.jsx(at,{children:S().charAt(0).toUpperCase()}),e.jsx(lt,{children:S()}),e.jsx(ct,{$isOpen:a,viewBox:"0 0 12 12",children:e.jsx("path",{d:"M2.5 4.5L6 8L9.5 4.5",stroke:"currentColor",strokeWidth:"1.5",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})})]}),a&&e.jsxs(dt,{$isRTL:T,children:[t&&e.jsxs(ye,{href:`https://6180.io/${t}`,target:"_blank",rel:"noopener noreferrer",children:[e.jsx("span",{style:{fontSize:"16px"},children:"👤"}),$("View Public Profile")]}),e.jsxs(ye,{href:ge("storage/manage.html"),children:[e.jsx("span",{style:{fontSize:"16px"},children:"📦"}),e.jsxs(ft,{children:[e.jsx("span",{children:$("Storage")}),e.jsx(gt,{children:m()})]})]}),e.jsx(xt,{}),e.jsxs(pt,{onClick:k,children:[e.jsx("span",{style:{fontSize:"16px"},children:"🚪"}),$("Log Out")]})]})]})]})]}),e.jsx(ut,{})]})})},ht=i.div`
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
`,bt=i.div`
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`,yt=i.div`
  position: relative;
  max-width: 100%;
`,wt=i.div`
  position: absolute;
  left: ${t=>t.$isRTL?"auto":"16px"};
  right: ${t=>t.$isRTL?"16px":"auto"};
  top: 50%;
  transform: translateY(-50%);
  color: #9CA3AF;
  pointer-events: none;
  z-index: 1;
`,St=i.input`
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
`,$t=i.button`
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
`,de=i.div`
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 8px;
  }
`,pe=i.div`
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
`,Tt=i.button`
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
`,vt=i.button`
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
`,kt=i.button`
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
`,jt=i.button`
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
`,Ft=i.div`
  margin-top: 8px;
  font-size: 13px;
  color: #555;
  font-style: italic;
  text-align: ${t=>t.$isRTL?"right":"left"};
`,Ct=i.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 8px 0;
`,At=({folders:t,searchQuery:f,setSearchQuery:d,onTagFilterChange:u,onContactFilterChange:g,resetTagFilter:v,resetContactFilter:$})=>{const{t:h,language:T}=X(),a=J(T)==="rtl",[l,b]=y.useState(!1),[m,S]=y.useState([]),[k,B]=y.useState([]),[M,C]=y.useState(null),[G,Y]=y.useState([]),[N,ne]=y.useState([]),[A,P]=y.useState([]),[E,R]=y.useState([]),O=r=>r.subtags.filter(o=>k.includes(o.key)),q=r=>{const o=O(r);if(o.length===0)return r.tagTitle;const p=o.map(n=>n.subtagTitle).join(", ");return`${r.tagTitle} (${p})`};y.useEffect(()=>{const r=new Map,o=new Map;t.forEach(c=>{const x=c.updatedAt?new Date(c.updatedAt).getTime():c.createdAt?new Date(c.createdAt).getTime():0;c.files.forEach(w=>{var j;(j=w.selectedTags)==null||j.forEach(F=>{var xe;const I=`${F.TagType}-${F.tagTitle}`;if(!r.has(I))r.set(I,{tag:{key:I,TagType:F.TagType,tagTitle:F.tagTitle,timestamp:x,subtags:[]},timestamp:x});else{const D=r.get(I);x>D.timestamp&&(D.timestamp=x,D.tag.timestamp=x)}(xe=F.subtags)==null||xe.forEach(D=>{const ue=`${D.TagType}-${D.tagTitle}-${D.subtagTitle}`,me=r.get(I).tag,le=me.subtags.find(Ae=>Ae.key===ue);le?x>le.timestamp&&(le.timestamp=x):me.subtags.push({key:ue,TagType:D.TagType,tagTitle:D.tagTitle,subtagTitle:D.subtagTitle,timestamp:x})})})}),c.contacts&&Object.values(c.contacts).forEach(w=>{if(typeof w=="string"&&!w.toString().startsWith("Profile-")){const j=o.get(w);(!j||x>j.timestamp)&&o.set(w,{name:w,timestamp:x})}})});const p=Array.from(r.values()).sort((c,x)=>x.timestamp-c.timestamp).map(c=>(c.tag.subtags.sort((x,w)=>w.timestamp-x.timestamp),c.tag)),n=Array.from(o.values()).sort((c,x)=>x.timestamp-c.timestamp).map(c=>c.name);S(p),Y(p),ne(n),R(n)},[t]);const K=r=>{if(r.length===0){v(),Y(m);return}const o=t.filter(p=>{const n=new Set;return p.files.forEach(c=>{var x;(x=c.selectedTags)==null||x.forEach(w=>{var j;n.add(`${w.TagType}-${w.tagTitle}`),(j=w.subtags)==null||j.forEach(F=>{n.add(`${F.TagType}-${F.tagTitle}-${F.subtagTitle}`)})})}),r.every(c=>n.has(c))});V(o),u(o)},Z=r=>{if(r.length===0){$(),R(N);return}const o=t.filter(p=>{if(!p.contacts)return!1;const n=Object.values(p.contacts).filter(c=>typeof c=="string"&&!c.toString().startsWith("Profile-"));return r.every(c=>n.includes(c))});ae(o),g(o)},Q=r=>{const o=k.includes(r.key),p=M===r.key;if(o){if(o&&!p)C(r.key);else if(o&&p){const n=k.filter(c=>c!==r.key&&!r.subtags.some(x=>x.key===c));B(n),C(null),K(n)}}else{const n=[...k,r.key];B(n),C(r.key),K(n)}},ee=r=>{const o=k.includes(r.key);let p;o?p=k.filter(n=>n!==r.key):p=[...k,r.key],B(p),K(p)},ie=r=>{let o;A.includes(r)?o=A.filter(p=>p!==r):o=[...A,r],P(o),Z(o)},V=r=>{const o=new Set;r.forEach(n=>{n.files.forEach(c=>{var x;(x=c.selectedTags)==null||x.forEach(w=>{o.add(`${w.TagType}-${w.tagTitle}`)})})}),k.forEach(n=>{n.includes("-",n.indexOf("-")+1)||o.add(n)});const p=m.filter(n=>o.has(n.key));Y(p)},ae=r=>{const o=new Set;r.forEach(n=>{n.contacts&&Object.values(n.contacts).forEach(c=>{typeof c=="string"&&!c.toString().startsWith("Profile-")&&o.add(c)})}),A.forEach(n=>{o.add(n)});const p=N.filter(n=>o.has(n));R(p)},_=M?m.find(r=>r.key===M):null,H=k.length,z=A.length,U=N.length>0,W=m.length>0;return!U&&!W&&!f?null:e.jsxs(ht,{$isRTL:a,children:[e.jsx(bt,{children:e.jsxs(yt,{children:[e.jsx(wt,{$isRTL:a,children:e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("circle",{cx:"11",cy:"11",r:"8"}),e.jsx("path",{d:"m21 21-4.35-4.35"})]})}),e.jsx(St,{$isRTL:a,type:"text",value:f,onChange:r=>d(r.target.value),placeholder:h("Search albums by title or description")}),f&&e.jsx($t,{$isRTL:a,onClick:()=>d(""),children:e.jsxs("svg",{width:"10",height:"10",viewBox:"0 0 24 24",fill:"none",stroke:"white",strokeWidth:"2",children:[e.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),e.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})}),(U||W)&&e.jsxs(e.Fragment,{children:[e.jsx(de,{children:e.jsxs(pe,{$isRTL:a,children:[U&&e.jsx(Tt,{$isActive:l,onClick:()=>b(!l),title:h("Toggle contacts filter"),children:"👥"}),W&&G.length>0?G.map(r=>{const o=O(r),p=o.length>0?`${r.TagType}: ${r.tagTitle} (${o.map(n=>n.subtagTitle).join(", ")})`:`Click to add/remove: ${r.TagType}: ${r.tagTitle}`;return e.jsx(vt,{$isSelected:k.includes(r.key),$isDisplayed:M===r.key,onClick:()=>Q(r),title:p,children:q(r)},r.key)}):W?e.jsx(Ct,{children:h("No tags available")}):null]})}),l&&U&&e.jsx(de,{children:e.jsx(pe,{$isRTL:a,children:E.map(r=>e.jsx(kt,{$isSelected:A.includes(r),onClick:()=>ie(r),title:`Click to add/remove: ${r}`,children:r},r))})}),_&&_.subtags.length>0&&e.jsx(de,{children:e.jsx(pe,{$isRTL:a,children:_.subtags.map(r=>e.jsx(jt,{$isSelected:k.includes(r.key),onClick:()=>ee(r),title:`Click to add/remove: ${r.TagType}: ${r.tagTitle} → ${r.subtagTitle}`,children:r.subtagTitle},r.key))})}),(H>0||z>0)&&e.jsx(Ft,{$isRTL:a,children:z>0&&H>0?h("Showing albums with all selected contacts and tags"):z>0?h("Showing albums with all selected contacts"):H>0?h("Showing albums with all selected tags"):""})]})]})},Bt=i.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
  padding: 20px;
`,Et=i.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
  
  @media (max-width: 768px) {
    padding: 24px;
    margin: 20px;
    max-width: calc(100vw - 40px);
  }
`,Rt=i.h2`
  margin: 0 0 16px 0;
  font-size: 24px;
  font-weight: 600;
  color: #333;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
`,zt=i.p`
  margin: 0 0 24px 0;
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`,Dt=i.div`
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
`,It=i.div`
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
`,Lt=i.button`
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
`,Mt=({isOpen:t,folderStructure:f,onChoice:d,onCancel:u})=>{const{t:g,language:v}=X(),$=J(v)==="rtl";if(!t||!f)return null;const h=(a,l=0)=>{const b=[];return l===0&&b.push(e.jsxs(we,{$level:l,children:[e.jsx("span",{children:"📁"}),e.jsx("span",{children:a.name}),e.jsxs("span",{style:{color:"#999",fontSize:"12px"},children:["(",a.files.length===1?g("{{count}} file",{count:a.files.length.toString()}):g("{{count}} files",{count:a.files.length.toString()}),")"]})]},a.path)),a.subfolders.forEach(m=>{const S=m.files.length+m.subfolders.reduce((k,B)=>k+B.files.length,0);b.push(e.jsxs(we,{$level:l+1,children:[e.jsx("span",{children:"📁"}),e.jsx("span",{children:m.name}),e.jsxs("span",{style:{color:"#999",fontSize:"12px"},children:["(",S===1?g("{{count}} file",{count:S.toString()}):g("{{count}} files",{count:S.toString()}),")"]})]},m.path)),l<1&&m.subfolders.length>0&&b.push(...h(m,l+2))}),b},T=a=>{sessionStorage.setItem("album_creation_preference",a),d(a)};return e.jsx(Bt,{onClick:u,children:e.jsxs(Et,{$isRTL:$,onClick:a=>a.stopPropagation(),children:[e.jsx(Rt,{children:g("Create Multiple Albums?")}),e.jsx(zt,{children:g("We noticed your folder contains subfolders. Would you like to create a separate album for each subfolder, or treat them all as one album?")}),e.jsx(Dt,{children:h(f)}),e.jsxs(It,{children:[e.jsxs(Se,{onClick:()=>T("separate"),children:[e.jsx($e,{children:"📁"}),e.jsxs(Te,{children:[e.jsx(ve,{children:g("Separate albums by folder")}),e.jsx(ke,{children:g('Each subfolder becomes a different album (e.g., "Day1", "Day2")')})]})]}),e.jsxs(Se,{onClick:()=>T("combined"),children:[e.jsx($e,{children:"🔗"}),e.jsxs(Te,{children:[e.jsx(ve,{children:g("Combine all into one album")}),e.jsx(ke,{children:g("All files are merged into one album")})]})]})]}),e.jsx(Lt,{onClick:u,children:g("Cancel")})]})})},je=10,fe=3,Gt=t=>t.name.startsWith(".DS_Store")||t.name.startsWith("._")||t.name.startsWith("Thumbs.db")||t.name.startsWith(".")||t.name==="desktop.ini"||!/\.(jpg|jpeg|png|gif|bmp|webp|svg|mp4|mov|avi|wmv|flv|webm|mkv)$/i.test(t.name)?!1:t.size>0,Pt=t=>{const f=[];let d=0;for(const u of t){if(!u||!u.name){d++;continue}Gt(u)?f.push(u):d++}return{validFiles:f,filteredCount:d}},Fe=re.forwardRef(({onFileSelection:t,onFolderSelection:f},d)=>e.jsxs("div",{style:{display:"none"},children:[e.jsx("input",{ref:d,id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:t,style:{display:"none"}}),e.jsx("input",{id:"folder-input",type:"file",accept:"image/*,video/*",multiple:!0,webkitdirectory:"",onChange:f,style:{display:"none"}})]}));Fe.displayName="EnhancedFileInput";const Ot=re.memo(({t,isRTL:f})=>e.jsx("div",{style:{padding:"20px 24px",marginTop:"20px",marginBottom:"20px",backgroundColor:"#fff",border:"1px solid #ddd",borderRadius:"8px",textAlign:f?"right":"left",direction:f?"rtl":"ltr",boxShadow:"0 1px 3px rgba(0,0,0,0.1)",position:"relative"},children:e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"16px"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:"18px",fontWeight:"600",marginBottom:"4px",color:"#333",lineHeight:"1.3"},children:t("Use the 6180 app to showcase your albums offline")}),e.jsx("div",{style:{fontSize:"14px",color:"#666",lineHeight:"1.4",fontWeight:"400"},children:t("Intelligently tagged and beautifully organized")})]}),e.jsxs("div",{style:{display:"flex",gap:"12px",alignItems:"center",flexShrink:0},children:[e.jsxs("a",{href:"https://apps.apple.com/app/6180/id6468679610",target:"_blank",rel:"noopener noreferrer",style:{display:"inline-flex",alignItems:"center",gap:"8px",padding:"8px 16px",backgroundColor:"#007bff",borderRadius:"8px",textDecoration:"none",color:"white",fontSize:"14px",fontWeight:"500",transition:"all 0.2s ease",whiteSpace:"nowrap",border:"none",cursor:"pointer"},onMouseEnter:d=>{d.currentTarget.style.backgroundColor="#0056b3",d.currentTarget.style.transform="translateY(-1px)"},onMouseLeave:d=>{d.currentTarget.style.backgroundColor="#007bff",d.currentTarget.style.transform="translateY(0)"},children:[e.jsx("span",{style:{fontSize:"16px"},children:"🍎"}),t("Open On iOS")]}),e.jsxs("a",{href:"https://play.google.com/store/apps/details?id=io.i6180.android",target:"_blank",rel:"noopener noreferrer",style:{display:"inline-flex",alignItems:"center",gap:"8px",padding:"8px 16px",backgroundColor:"#007bff",borderRadius:"8px",textDecoration:"none",color:"white",fontSize:"14px",fontWeight:"500",transition:"all 0.2s ease",whiteSpace:"nowrap",border:"none",cursor:"pointer"},onMouseEnter:d=>{d.currentTarget.style.backgroundColor="#0056b3",d.currentTarget.style.transform="translateY(-1px)"},onMouseLeave:d=>{d.currentTarget.style.backgroundColor="#007bff",d.currentTarget.style.transform="translateY(0)"},children:[e.jsx("span",{style:{fontSize:"16px"},children:"🤖"}),t("Open On Android")]})]})]})})),_t=t=>t/(1024*1024*1024),te=t=>t<1?`${Math.round(t*1e3)} MB`:`${t.toFixed(1)} GB`,Ce=(t,f,d)=>{if(!f)return[];const{intNumberOfSubscriptions:u}=f;let g=[];if(u===0){const v=je*1024*1024*1024;if(t.length>5){const $=[...t].sort((a,l)=>{const b=new Date(a.createdAt||0).getTime(),m=new Date(l.createdAt||0).getTime();return b-m}),h=t.length-5;g=[...$.slice(0,h)]}if(d>v){const $=[...t].sort((l,b)=>{const m=new Date(l.createdAt||0).getTime(),S=new Date(b.createdAt||0).getTime();return m-S});let h=d-v,T=[];for(const l of $){if(h<=0)break;const b=l.files.reduce((m,S)=>m+(S.dataInBytes||0),0);T.push(l),h-=b}const a=new Set(g.map(l=>l.folderId));for(const l of T)a.has(l.folderId)||g.push(l)}}else{const v=u*10*1024*1024*1024;if(d>v){const $=[...t].sort((T,a)=>{const l=new Date(T.createdAt||0).getTime(),b=new Date(a.createdAt||0).getTime();return l-b});let h=d-v;for(const T of $){if(h<=0)break;const a=T.files.reduce((l,b)=>l+(b.dataInBytes||0),0);g.push(T),h-=a}}}return g},Ut=re.memo(({albumsToDelete:t,isRTL:f})=>{const{t:d}=X();return t.length===0?null:e.jsx("div",{style:{marginTop:"16px"},children:t.map(u=>e.jsx("div",{style:{marginBottom:"20px",direction:f?"rtl":"ltr"},children:e.jsxs("div",{style:{background:"#fff",border:"2px solid #dc3545",borderRadius:"12px",padding:"20px",position:"relative",overflow:"hidden",opacity:"0.85"},children:[e.jsx("div",{style:{marginTop:"30px",marginBottom:"16px",display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexDirection:f?"row-reverse":"row"},children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:f?"flex-end":"flex-start"},children:[e.jsx("h3",{style:{fontSize:"18px",margin:"0 0 4px 0",color:"#dc3545",fontWeight:"bold"},children:u.folderName||"Untitled Album"}),e.jsxs("div",{style:{fontSize:"13px",color:"#666",textAlign:f?"right":"left"},children:[u.createdAt&&e.jsxs("div",{children:[d("Created"),": ",new Date(u.createdAt).toLocaleDateString()]}),e.jsx("div",{children:u.files.length===1?d("{{count}} file",{count:u.files.length.toString()}):d("{{count}} files",{count:u.files.length.toString()})})]})]})}),u.folderDescription&&u.folderDescription.length>1&&e.jsx("div",{style:{fontSize:"14px",color:"#555",marginBottom:"16px",textAlign:f?"right":"left",fontStyle:"italic"},children:u.folderDescription}),e.jsxs("div",{style:{width:"100%",position:"relative"},children:[e.jsxs("div",{style:{display:"flex",overflowX:"auto",gap:"12px",paddingBottom:"8px",msOverflowStyle:"none",scrollbarWidth:"thin",WebkitOverflowScrolling:"touch",maxWidth:"100%",flexDirection:f?"row-reverse":"row"},children:[u.files.slice(0,fe).map((g,v)=>e.jsxs("div",{style:{width:"160px",height:"100px",flexShrink:0,position:"relative",borderRadius:"6px",overflow:"hidden",border:"2px solid #dc3545"},children:[e.jsx(Pe,{thumbnailDataKey:g.thumbnailDataKey,dataKey:g.dataKey,alt:d("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover"}}),e.jsx("div",{style:{position:"absolute",top:"0",left:"0",right:"0",bottom:"0",background:"rgba(220, 53, 69, 0.3)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"24px"},children:"❌"})]},v)),u.files.length>fe&&e.jsxs("div",{style:{width:"160px",height:"100px",flexShrink:0,position:"relative",borderRadius:"6px",border:"2px dashed #dc3545",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"#f8f9fa",color:"#dc3545",fontSize:"14px",fontWeight:"bold"},children:["+",u.files.length-fe," more"]})]}),u.files.length>2&&e.jsx("div",{style:{position:"absolute",[f?"left":"right"]:0,top:0,bottom:8,width:"30px",background:f?"linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))":"linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))",pointerEvents:"none"}})]})]})},u.folderId))})}),Wt=re.memo(({subscriptionInfo:t,albumCount:f,folders:d,calculatedBytesUsed:u,t:g,isRTL:v})=>{if(!t)return null;const{intNumberOfSubscriptions:$}=t,h=_t(u),T=y.useMemo(()=>Ce(d,t,u),[d,t,u]);let a="none",l="";if($===0){const m=je,S=f>5,k=h>m;!S&&!k?(a="free-space",l=g("You can save 5 albums that total a maximum of {FREE_TIER_STORAGE_LIMIT_GB} GB for free. Delete unused albums to make space.").replace("{FREE_TIER_STORAGE_LIMIT_GB}",m.toString())):S&&k?(a="free-both-exceeded",l=g("You have over 5 albums AND your files occupy {formatGB(usedGB)} space (limit: {FREE_TIER_STORAGE_LIMIT_GB} GB). These albums are being automatically deleted unless you decide to delete other albums:").replace("{formatGB(usedGB)}",te(h)).replace("{FREE_TIER_STORAGE_LIMIT_GB}",m.toString())):S?(a="free-count-exceeded",l=g("You have {albumCount} albums but can only save 5 for free. These oldest albums are being automatically deleted unless you decide to delete other albums:").replace("{albumCount}",f.toString())):k&&(a="free-storage-exceeded",l=g("Your files occupy {formatGB(usedGB)} space, but you only have {FREE_TIER_STORAGE_LIMIT_GB} GB storage. These albums are being automatically deleted unless you decide to delete other albums:").replace("{formatGB(usedGB)}",te(h)).replace("{FREE_TIER_STORAGE_LIMIT_GB}",m.toString()))}else{const m=$*10,S=m-h;S<0?(a="paid-exceeded",l=g("Your files occupy {formatGB(usedGB)} space, but you only have {totalStorageGB} GB storage. These albums are being automatically deleted unless you decide to delete other albums:").replace("{formatGB(usedGB)}",te(h)).replace("{totalStorageGB}",m.toString())):S<1.5&&(a="paid-warning",l=g("Your files occupy {formatGB(usedGB)} of {totalStorageGB} GB storage. You may need to upgrade your subscription soon.").replace("{formatGB(usedGB)}",te(h)).replace("{totalStorageGB}",m.toString()))}if(a==="none")return null;const b=["free-count-exceeded","free-storage-exceeded","free-both-exceeded","paid-exceeded"].includes(a);return e.jsxs("div",{style:{padding:"12px 20px",marginBottom:"16px",backgroundColor:b?"#fff3cd":"#f8f9fa",border:`1px solid ${b?"#ffeaa7":"#e9ecef"}`,borderRadius:"8px",color:b?"#856404":"#6c757d",fontSize:"14px",textAlign:v?"right":"left",direction:v?"rtl":"ltr"},children:[l,b&&T.length>0&&e.jsx(Ut,{albumsToDelete:T,isRTL:v}),e.jsx("div",{style:{marginTop:"12px"},children:e.jsx("a",{href:ge("storage/manage.html"),style:{color:"#007bff",textDecoration:"underline",cursor:"pointer",fontWeight:"bold"},onMouseEnter:m=>{m.currentTarget.style.color="#0056b3"},onMouseLeave:m=>{m.currentTarget.style.color="#007bff"},children:g("Click To Upgrade Subscription (US$1 monthly per 10 GB)")})})]})}),Yt=()=>{const{t,language:f}=X(),d=J(f)==="rtl",[u,g]=y.useState(!1),[v,$]=y.useState(null),[h,T]=y.useState([]),a=y.useRef(null),{folders:l,filteredFolders:b,publicUsername:m,cognitoUsername:S,searchQuery:k,setSearchQuery:B,handleContactFilterChange:M,resetContactFilter:C,handleTagFilterChange:G,resetTagFilter:Y,handleDeleteClick:N,setFolders:ne,subscriptionInfo:A,calculatedBytesUsed:P}=Ke(o=>{(o.includes("Error")||o.includes("Failed"))&&console.error(o)}),E=De(o=>{if(Oe()){const n=localStorage.getItem(ce.SELECTED_PHOTOS);if(n)try{const c=JSON.parse(n),x=_e(c);if(x.length>1){const w=x.map(j=>({name:j.name,selectedPhotos:j.selectedPhotos,folderPath:j.folderPath}));localStorage.setItem(ce.MULTI_ALBUM_DATA,JSON.stringify(w)),L(),oe("save-album.html?mode=multiple");return}else L()}catch(c){console.error("Error processing multi-album data:",c),L()}else L()}if(o){const n=`save-album.html?folderId=${encodeURIComponent(o)}`;oe(n)}else oe("save-album.html")},!1),{fileInputRef:R,isUploading:O,isProcessingFiles:q,progressTracker:K,setSelectedPhotos:Z}=E;y.useEffect(()=>{(async()=>{try{await ze()}catch(p){console.warn("Credential prewarming failed:",p)}})()},[]);const Q=y.useMemo(()=>A?Ce(l,A,P):[],[l,A,P]),ee=y.useMemo(()=>new Set(Q.map(o=>o.folderId)),[Q]),ie=y.useMemo(()=>b.filter(o=>!ee.has(o.folderId)),[b,ee]),V=y.useCallback(async o=>{const p=Array.from(o.target.files||[]);if(!p.length)return!1;const{validFiles:n,filteredCount:c}=Pt(p);if(n.length===0)return alert("No valid image or video files were selected. Please select media files."),!1;c>0&&console.log(`Filtered out ${c} invalid/system files`);const x=Ue(n);if(x&&We(x)){const w=Ye();if(w){he(x,w,n);const j=new DataTransfer;n.forEach(I=>j.items.add(I));const F={...o,target:{...o.target,files:j.files}};try{await E.handleFileSelection(F,S)}catch(I){console.error("Error in file upload:",I),L()}}else $(x),T(n),g(!0)}else{const w=new DataTransfer;n.forEach(F=>w.items.add(F));const j={...o,target:{...o.target,files:w.files}};try{await E.handleFileSelection(j,S)}catch(F){console.error("Error in single album file selection:",F)}}return!0},[E,S]),ae=y.useCallback((o,p,n)=>{Ne(o),he(n,o,p),g(!1),$(null),T([]);const c=R.current;if(c)try{const x=new DataTransfer;p.forEach(j=>{j&&j.name&&x.items.add(j)}),c.files=x.files;const w=new Event("change",{bubbles:!0});Object.defineProperty(w,"target",{writable:!1,value:c}),E.handleFileSelection(w,S)}catch(x){console.error("Error in album creation flow:",x),L()}else console.error("File input ref not available"),L()},[E,S,R]),_=y.useCallback(async o=>V(o),[V]),H=y.useCallback(()=>{g(!1),$(null),T([]),R.current&&(R.current.value=""),a.current&&(a.current.value=""),be(),L()},[R]),z=y.useCallback((o=null,p="files")=>{try{if(be(),L(),localStorage.removeItem(ce.MULTI_ALBUM_DATA),Z([]),p==="folder")if(a.current)a.current.click();else throw new Error("Folder picker not available");else E.openFilePicker(o)}catch(n){console.error("Error opening file picker:",n),alert("Sorry, there was an error opening the file picker. Please try again.")}},[E,Z]),U=y.useCallback(()=>{try{z(null,"files")}catch(o){console.error("Error selecting files:",o)}},[z]),W=y.useCallback(()=>{try{z(null,"folder")}catch(o){console.error("Error selecting folder:",o)}},[z]),r=k.length>0||l.some(o=>o.contacts&&Object.keys(o.contacts).length>0||o.files.some(p=>p.selectedTags&&p.selectedTags.length>0));return e.jsxs(e.Fragment,{children:[e.jsx(Le,{}),e.jsxs(Me,{$isRTL:d,children:[e.jsx(mt,{publicUsername:m,subscriptionInfo:A,calculatedBytesUsed:P,onNewAlbum:()=>z(null,"files"),onSelectFiles:U,onSelectFolder:W}),(O||q)&&e.jsx("div",{style:{width:"100%",marginBottom:"20px"},children:e.jsx(Ie,{progressTracker:K,isUploading:O,isProcessingFiles:q,isRTL:J(f)==="rtl",style:{marginTop:"20px"},context:"uploading",showSuccessMessage:!0,showErrorMessage:!0})}),l.length>3&&e.jsx(Wt,{subscriptionInfo:A,albumCount:l.length,folders:l,calculatedBytesUsed:P,t,isRTL:d}),l.length<=3&&e.jsx(Ot,{t,isRTL:d}),r&&e.jsx(At,{folders:l,searchQuery:k,setSearchQuery:B,onTagFilterChange:G,onContactFilterChange:M,resetTagFilter:Y,resetContactFilter:C}),e.jsx(Ge,{folders:ie,setFolders:ne,handleDeleteClick:o=>N(o,t),openFilePicker:o=>z(o,"files"),isUploading:O,cognitoUsername:S,isProfileView:!1}),e.jsx(Fe,{ref:R,onFileSelection:V,onFolderSelection:_}),e.jsx("input",{ref:a,type:"file",accept:"image/*,video/*",multiple:!0,webkitdirectory:"",onChange:_,style:{display:"none"}}),e.jsx(Mt,{isOpen:u,folderStructure:v,onChoice:o=>ae(o,h,v),onCancel:H})]})]})};Ee.createRoot(document.getElementById("root")).render(e.jsx(Re,{children:e.jsx(Yt,{})}));
