import{c as no,d as io,a as ye,S as ct,r as y,u as Ce,j as e,e as so,f as At,A as ao,C as Re,R as lo,I as co,g as Ae,b as ut}from"./config-C81kv4lT.js";import{c as re,e as uo,h as po,i as fo,b as Le,g as ho}from"./utils-BvimWbmh.js";import{U as go,F as mo,d as xo}from"./FileInput-DDbbSRvU.js";import{u as _e,c as vo,a as yo,p as bo}from"./file-upload-utils-CwNVKzun.js";import{d as S,l as $,f as wo}from"./styled-components.browser.esm-DAVmpCtn.js";import{Q as Co,W as So,X as Po,Y as Io,Z as To,_ as ko,$ as Eo,a0 as jo}from"./styled-components-Dtny2Xl9.js";import{C as Ro,S as Ao,I as Lo,R as _o}from"./SignUpCommand-5ZAYfGgq.js";import"./index-DFUfgcbK.js";import"./parseJsonBody-Cin9RETb.js";const pt=`
  mutation FetchFolderPositions($fetchRelationsInput: FetchRelationsInput!) {
    fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
      items {
        ... on Folder {
          id
          folderName
          folderDescription
          folderPassword {
            password
            policy
          }
          fileReferencesPage {
            items {
              file {
                ownerContactId
                dataKey
                thumbnailDataKey
                durationInSeconds
              }
            }
          }
          contactsUsingInvite {
            items {
              id
              item {
                ... on Persona {
                  publicDisplayName
                }
              }
            }
          }
          folderInviteParameters {
            usingFolderInviteGrantsRightToAddItems
          }
          folderPosition {
            id
          }
        }
      }
      nextToken
    }
  }
`,ft=(t,h)=>{var m,g,v,T,w;const a=((g=(m=t==null?void 0:t.data)==null?void 0:m.fetchRelations)==null?void 0:g.items)||[],c=[],r={};let i="Photos",d="",s,n=!1,o=!1,f,p=!1;const l=new Set;if(a.length>0){const b=a[0];h&&(b!=null&&b.id)&&h(b.id),b!=null&&b.folderName&&b.folderName.length>0&&(i=b.folderName),b!=null&&b.folderDescription&&b.folderDescription.length>0&&(d=b.folderDescription),b!=null&&b.folderPassword&&(b.folderPassword.policy&&(s=b.folderPassword.policy,n=s!=="NoPassword"),b.folderPassword.password&&s!=="NoPassword"&&(o=!0,f=b.folderPassword.password)),b!=null&&b.folderInviteParameters&&(p=!!b.folderInviteParameters.usingFolderInviteGrantsRightToAddItems),(((T=(v=a[0])==null?void 0:v.contactsUsingInvite)==null?void 0:T.items)||[]).forEach(j=>{var D;j!=null&&j.id&&((D=j==null?void 0:j.item)!=null&&D.publicDisplayName)&&(r[j.id]=j.item.publicDisplayName)}),(((w=b==null?void 0:b.fileReferencesPage)==null?void 0:w.items)||[]).forEach(j=>{const D=j==null?void 0:j.file;if(!(D!=null&&D.dataKey))return;const{id:z,dataKey:E,thumbnailDataKey:L,durationInSeconds:A,ownerContactId:U}=D;if(l.has(E))return;l.add(E);const B=`${ct}${E}`,N=L?`${ct}${L}`:void 0;E.startsWith("Input/Image/")?c.push({type:"image",fileId:z,url:B,thumbnailUrl:N||B,ownerId:U,loaded:!1}):E.startsWith("Input/Video/")&&c.push({type:"video",fileId:z,url:B,thumbnailUrl:N||B,duration:uo(A),ownerId:U,loaded:!1})})}return{mediaItems:c,folderName:i,folderDescription:d,contacts:r,passwordPolicy:s,passwordRequired:n,hasPassword:o,actualPassword:f,usingFolderInviteGrantsRightToAddItems:p}},Bo=async(t,h)=>{var a,c,r,i,d;try{const n={fetchRelationsInput:{targetItemIdentifier____RelationType:`${t}____Folder`,index:"targetItemIdentifier____RelationType",limit:1,scanIndexForward:!1,nextToken:null}},o=fetch(no,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":io},body:JSON.stringify({query:pt,variables:n})}).then(g=>g.json()),f=(async()=>{const g=await re();return g?fetch(ye,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${g}`},body:JSON.stringify({query:pt,variables:n})}).then(v=>v.json()):null})(),p=await o;let l=ft(p,h);const m=await f;if(m){const g=(d=(i=(r=(c=(a=m==null?void 0:m.data)==null?void 0:a.fetchRelations)==null?void 0:c.items)==null?void 0:r[0])==null?void 0:i.folderPosition)==null?void 0:d.id,v=ft(m,h);g&&(l=v)}return l}catch(s){return console.error("Error fetching folder data:",s),null}},Do=S.div`
  font-family: Helvetica, Arial, sans-serif;
  max-width: 1200px;
  margin: auto;
  background: #f9fafb;
  color: #333;
  line-height: 1.5;
  padding: 20px;
  width: 100%;
  overflow-x: hidden;
  min-height: 100vh; // Use viewport height
  display: flex;
  flex-direction: column;
  
  @media (max-width: 767px) {
    padding: 10px;
  }
`,No=S.div`
  position: sticky;
  top: 0;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0,0,0,0.06);
  z-index: 10;
  margin-bottom: 10px;
  width: 100%;
`,Mo=S.div`
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  
  @media (max-width: 767px) {
    padding: 16px 16px;
  }
`,Oo=S.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 5px;
  gap: 10px;
  flex-wrap: wrap;
`,zo=S.button`
  background: transparent;
  color: #006adc;
  border: 1px solid #006adc;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
  margin-right: auto; // This will push it to the left
  height: 36px; // Set a fixed height to match other buttons
  display: flex;
  align-items: center; // Center text vertically
`,Uo=S.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`,V=S.button`
  background: transparent;
  color: #006adc;
  border: 1px solid #006adc;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
`,Fo=S.button`
  background: transparent;
  color: #006adc;
  border: 1px solid #006adc;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
`,$o=S.span`
  width: 18px;
  height: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`,Be=S.span`
  height: 2px;
  background: #006adc;
  width: 100%;
`,Wo=S.div`
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
`,De=S.button`
  background: transparent;
  color: #006adc;
  border: 1px solid #006adc;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  width: 100%;
  text-align: left;
`,Ho=S.h2`
  font-weight: 400;
  margin: 0 0 16px 0;
  font-size: 24px;
  padding: 0;
  
  @media (max-width: 767px) {
    padding: 0;
  }
`,qo=S.strong`
  font-weight: 700;
`,Qo=S.div`
  padding: 0 24px 20px;
  width: 100%;
  overflow: visible; // Allow content to flow naturally
  
  @media (max-width: 767px) {
    padding: 0 16px 15px;
    width: 100%;
  }
`,Go=S.div`
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 20px;
`,Vo=S.p`
  margin: 0;
`,Jo=S.div`
  display: grid;
  grid-gap: 20px;
  width: 100%;
  min-height: 0; // Allow proper sizing
  
  ${t=>{switch(t.columns){case"1":return $`grid-template-columns: repeat(1, 1fr);`;case"2":return $`grid-template-columns: repeat(2, 1fr);`;case"3":return $`grid-template-columns: repeat(3, 1fr);`;case"4":return $`grid-template-columns: repeat(4, 1fr);`;case"5":return $`grid-template-columns: repeat(5, 1fr);`;default:return $`grid-template-columns: repeat(1, 1fr);`}}}
  
  @media (max-width: 767px) {
    grid-gap: 8px;
    ${t=>{const h=parseInt(t.columns);return h>3?$`grid-template-columns: repeat(3, minmax(0, 1fr));`:h>1?$`grid-template-columns: repeat(${h}, minmax(0, 1fr));`:$`grid-template-columns: repeat(1, minmax(0, 1fr));`}}
  }
`,Ko=S.div`
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: transform 0.2s;
  position: relative;
  height: auto; // Allow natural height
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  margin-bottom: 20px; // Add bottom margin for spacing
  
  ${t=>t.isHovered&&$`
    transform: translateY(-2px);
  `}
  
  ${t=>t.isVideo&&$`
    cursor: pointer;
  `}
  
  @media (max-width: 767px) {
    border-radius: 4px;
    margin-bottom: 10px; // Less margin on mobile
  }
`,Yo=S.div`
  position: relative;
  overflow: hidden;
  background-color: #f0f0f0;
  width: 100%;
  padding-bottom: 75%; // Create a consistent aspect ratio (4:3)
  height: 0; // Use padding-bottom for aspect ratio
  
  @media (max-width: 767px) {
    padding-bottom: 100%; // Square aspect ratio on mobile
  }
`,ht=S.div`
  position: relative;
  overflow: hidden;
  background-color: #f0f0f0;
  width: 100%;
  min-height: 200px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 767px) {
    min-height: 120px;
    aspect-ratio: 1/1;
    height: 0;
    padding-bottom: 100%;
  }
`,Xo=S.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  transition: opacity 0.3s;
  opacity: ${t=>t.isLoaded?1:0};
`,Zo=S.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading-animation 1.5s infinite;
  z-index: 0;
`,er=S.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: rgba(255,255,255,0.85);
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 500;
  z-index: 3;
  border-radius: 3px;
  
  @media (max-width: 767px) {
    padding: 3px 6px;
    font-size: 10px;
    bottom: 8px;
    right: 8px;
    max-width: 45%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`,tr=S.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background-color: rgba(0,0,0,0.7);
  border-radius: 50%;
  z-index: 2;
  
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 55%;
    transform: translate(-50%, -50%);
    border-style: solid;
    border-width: 15px 0 15px 25px;
    border-color: transparent transparent transparent white;
  }
  
  @media (max-width: 767px) {
    width: 40px;
    height: 40px;
    
    &::before {
      border-width: 10px 0 10px 16px;
    }
  }
`,or=S.div`
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 4px 8px;
  font-size: 14px;
  border-radius: 4px;
  font-weight: 500;
  z-index: 2;
  
  @media (max-width: 767px) {
    padding: 2px 6px;
    font-size: 12px;
  }
`,Ne=S.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #d32f2f;
  grid-column: 1 / -1;
  width: 100%;
`,rr=S.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
  grid-column: 1 / -1;
  width: 100%;
`,nr=S.label`
  margin-right: 8px;
  font-size: 14px;
  color: #555;
  font-weight: normal;
`,ir=S.select`
  padding: 5px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  font-size: 14px;
  min-width: 50px;
`,sr=S.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`,ar=S.div`
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 767px) {
    padding: 16px;
    width: 90%;
  }
`;S.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;S.div`
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
`;S.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
  
  @media (max-width: 767px) {
    font-size: 18px;
  }
`;S.ol`
  list-style-type: decimal;
  padding-left: 20px;
`;S.li`
  margin-bottom: 12px;
  font-size: 16px;
  
  @media (max-width: 767px) {
    font-size: 14px;
  }
`;S.button`
  margin-top: 16px;
  padding: 8px 16px;
  background-color: #006adc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;const Lt=S.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 4;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 500;
  text-align: center;
  padding: 0 10px;
`;S.p`
  font-style: italic;
  margin-top: 12px;
  margin-bottom: 12px;
  text-align: center;
  
  @media (max-width: 767px) {
    font-size: 14px;
  }
`;const lr=wo`
  @keyframes loading-animation {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  
  /* Added to ensure proper display on mobile */
  * {
    box-sizing: border-box;
    -webkit-text-size-adjust: 100%;
  }
  
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }
  
  #root {
    width: 100%;
    overflow-x: hidden;
  }
`,dr=S(Oo)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  
  > div {
    width: auto;
    display: flex;
    align-items: center;
  }
`;S(Ko)`
  ${t=>t.isSelected&&`
    border: 3px solid #006adc;
    box-shadow: 0 0 0 3px rgba(0, 106, 220, 0.3);
  `}
`;const cr=S.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${t=>t.isSelected?"#006adc":"rgba(255, 255, 255, 0.8)"};
  border: ${t=>t.isSelected?"none":"2px solid #006adc"};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`,ur=S.div`
  padding: 10px 20px;
  background-color: #f0f7ff;
  border-radius: 4px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`,pr=S.div`
  color: white;
  font-size: 14px;
  font-weight: bold;
`,be=S.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 5;
`,we=S.div`
  color: white;
  font-size: 24px;
  font-weight: bold;
  transform: rotate(-30deg);
  opacity: 0.7;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
  user-select: none;
  white-space: nowrap;
`,gt=S(V)`
  background-color: #4caf50;
  color: white;
  &:hover {
    background-color: #45a049;
  }
`,Ke=({src:t,thumbnailSrc:h,alt:a,className:c="",loadFullResolution:r=!1,onFullResolutionLoaded:i,onClick:d,showWatermark:s=!1})=>{const[n,o]=y.useState(!1),[f,p]=y.useState(!1),[l,m]=y.useState(!1),[g,v]=y.useState("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E"),{t:T}=Ce();return y.useEffect(()=>{if(h){const w=new Image;w.src=h,w.onload=()=>{v(h),o(!0)}}},[h]),y.useEffect(()=>{if(r&&!f){m(!0);const w=new Image;w.src=t,w.onload=()=>{v(t),p(!0),m(!1),i&&i()}}},[r,t,f,i]),e.jsxs(Yo,{onClick:d,children:[e.jsx(Xo,{src:g,alt:a,className:c,isLoaded:n,style:{cursor:d?"pointer":"default"}}),!n&&e.jsx(Zo,{}),l&&e.jsx(Lt,{children:T("Loading full resolution...")}),s&&n&&e.jsx(be,{children:e.jsx(we,{children:"6180 Watermarked"})})]})},fr=({thumbnailUrl:t,videoUrl:h,duration:a,index:c,onFullResolutionLoaded:r,onClick:i,showWatermark:d=!1})=>{const[s,n]=y.useState(!1),[o,f]=y.useState(!1),[p,l]=y.useState(!1),m=so.useRef(null),{t:g}=Ce(),v=()=>{if(i){i();return}p?n(!0):f(!0)},T=()=>{l(!0),n(!0),r&&r()};return y.useEffect(()=>{if(o&&m.current&&!p){const w=m.current,b=()=>{T(),w.removeEventListener("canplaythrough",b)};return w.addEventListener("canplaythrough",b),w.load(),()=>{w.removeEventListener("canplaythrough",b)}}},[o,p]),s?e.jsxs("div",{style:{position:"relative",width:"100%",height:"100%"},children:[e.jsxs("video",{ref:m,controls:!0,style:{width:"100%",height:"100%"},children:[e.jsx("source",{src:h,type:"video/mp4"}),g("Your browser does not support the video tag.")]}),d&&e.jsx(be,{children:e.jsx(we,{children:"6180 Watermarked"})})]}):o&&!p?e.jsxs(ht,{children:[e.jsx(Ke,{src:h,thumbnailSrc:t,alt:`Video thumbnail ${c+1}`,showWatermark:d}),e.jsx(Lt,{children:g("Loading video...")}),e.jsx("video",{ref:m,style:{display:"none"},preload:"auto",children:e.jsx("source",{src:h,type:"video/mp4"})})]}):e.jsxs(ht,{onClick:v,children:[e.jsx(Ke,{src:h,thumbnailSrc:t,alt:`Video thumbnail ${c+1}`,showWatermark:d}),e.jsx(tr,{}),e.jsx(or,{children:a})]})},hr=({item:t,index:h,onClose:a,onPrev:c,onNext:r,hasNext:i,hasPrev:d,albumName:s,showWatermark:n=!1})=>{const[o,f]=y.useState(!1),[p,l]=y.useState(!0),{t:m}=Ce();return y.useEffect(()=>{const g=v=>{v.key==="Escape"?a():v.key==="ArrowLeft"&&d?c():v.key==="ArrowRight"&&i&&r()};return window.addEventListener("keydown",g),()=>window.removeEventListener("keydown",g)},[a,r,c,i,d]),e.jsxs("div",{style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",backgroundColor:"rgba(0, 0, 0, 0.9)",zIndex:2e3,display:"flex",flexDirection:"column"},children:[e.jsxs("div",{style:{padding:"15px",display:"flex",justifyContent:"space-between",alignItems:"center",backgroundColor:"rgba(0, 0, 0, 0.7)"},children:[e.jsx("button",{style:{background:"transparent",border:"none",color:"white",fontSize:"16px",padding:"5px 10px",cursor:"pointer"},onClick:a,children:m("Back")}),e.jsxs("div",{style:{display:"flex",gap:"10px"},children:[e.jsx("button",{style:{background:"transparent",border:"none",color:"white",fontSize:"16px",padding:"5px 10px",cursor:d?"pointer":"not-allowed",opacity:d?1:.5},onClick:d?c:void 0,disabled:!d,children:"←"}),e.jsx("button",{style:{background:"transparent",border:"none",color:"white",fontSize:"16px",padding:"5px 10px",cursor:i?"pointer":"not-allowed",opacity:i?1:.5},onClick:i?r:void 0,disabled:!i,children:"→"})]})]}),e.jsxs("div",{style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",overflow:"auto",padding:"10px",position:"relative"},children:[t.type==="image"?e.jsxs("div",{style:{position:"relative"},children:[e.jsx("img",{src:t.url,alt:`Image ${h+1}`,style:{maxWidth:"100%",maxHeight:"100%",objectFit:"contain",opacity:o?1:0,transition:"opacity 0.3s"},onLoad:()=>{f(!0),l(!1)}}),n&&e.jsx(be,{children:e.jsx(we,{children:"6180 Watermarked"})}),!o&&t.thumbnailUrl&&e.jsx("img",{src:t.thumbnailUrl,alt:`Thumbnail ${h+1}`,style:{position:"absolute",maxWidth:"100%",maxHeight:"100%",objectFit:"contain",opacity:.5}})]}):e.jsxs("div",{style:{position:"relative"},children:[e.jsxs("video",{controls:!0,autoPlay:!0,style:{maxWidth:"100%",maxHeight:"100%"},onLoadedData:()=>l(!1),children:[e.jsx("source",{src:t.url,type:"video/mp4"}),m("Your browser does not support the video tag.")]}),n&&e.jsx(be,{children:e.jsx(we,{children:"6180 Watermarked"})})]}),p&&e.jsx("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",backgroundColor:"rgba(0, 0, 0, 0.7)",color:"white",padding:"10px 20px",borderRadius:"4px",zIndex:10},children:t.type==="image"?m("Loading full resolution..."):m("Loading video...")})]}),e.jsx("div",{style:{padding:"15px",display:"flex",justifyContent:"center",backgroundColor:"rgba(0, 0, 0, 0.7)",color:"white"},children:e.jsx("a",{href:t.url,download:`${s}-${h+1}.${t.type==="image"?"jpg":"mp4"}`,style:{textDecoration:"none",color:"white",backgroundColor:"#006adc",padding:"8px 16px",borderRadius:"4px",fontSize:"14px"},children:t.type==="image"?m("Download Photo"):m("Download Video")})})]})};var oe={},Me={exports:{}},Oe,mt;function gr(){if(mt)return Oe;mt=1;var t="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Oe=t,Oe}var ze,xt;function mr(){if(xt)return ze;xt=1;var t=gr();function h(){}function a(){}return a.resetWarningCache=h,ze=function(){function c(d,s,n,o,f,p){if(p!==t){var l=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw l.name="Invariant Violation",l}}c.isRequired=c;function r(){return c}var i={array:c,bigint:c,bool:c,func:c,number:c,object:c,string:c,symbol:c,any:c,arrayOf:r,element:c,elementType:c,instanceOf:r,node:c,objectOf:r,oneOf:r,oneOfType:r,shape:r,exact:r,checkPropTypes:a,resetWarningCache:h};return i.PropTypes=i,i},ze}var vt;function _t(){return vt||(vt=1,Me.exports=mr()()),Me.exports}var Ue,yt;function Bt(){return yt||(yt=1,Ue={L:1,M:0,Q:3,H:2}),Ue}var Fe,bt;function Dt(){return bt||(bt=1,Fe={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8}),Fe}var $e,wt;function xr(){if(wt)return $e;wt=1;var t=Dt();function h(a){this.mode=t.MODE_8BIT_BYTE,this.data=a}return h.prototype={getLength:function(a){return this.data.length},write:function(a){for(var c=0;c<this.data.length;c++)a.put(this.data.charCodeAt(c),8)}},$e=h,$e}var We,Ct;function vr(){if(Ct)return We;Ct=1;var t=Bt();function h(a,c){this.totalCount=a,this.dataCount=c}return h.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],h.getRSBlocks=function(a,c){var r=h.getRsBlockTable(a,c);if(r==null)throw new Error("bad rs block @ typeNumber:"+a+"/errorCorrectLevel:"+c);for(var i=r.length/3,d=new Array,s=0;s<i;s++)for(var n=r[s*3+0],o=r[s*3+1],f=r[s*3+2],p=0;p<n;p++)d.push(new h(o,f));return d},h.getRsBlockTable=function(a,c){switch(c){case t.L:return h.RS_BLOCK_TABLE[(a-1)*4+0];case t.M:return h.RS_BLOCK_TABLE[(a-1)*4+1];case t.Q:return h.RS_BLOCK_TABLE[(a-1)*4+2];case t.H:return h.RS_BLOCK_TABLE[(a-1)*4+3];default:return}},We=h,We}var He,St;function yr(){if(St)return He;St=1;function t(){this.buffer=new Array,this.length=0}return t.prototype={get:function(h){var a=Math.floor(h/8);return(this.buffer[a]>>>7-h%8&1)==1},put:function(h,a){for(var c=0;c<a;c++)this.putBit((h>>>a-c-1&1)==1)},getLengthInBits:function(){return this.length},putBit:function(h){var a=Math.floor(this.length/8);this.buffer.length<=a&&this.buffer.push(0),h&&(this.buffer[a]|=128>>>this.length%8),this.length++}},He=t,He}var qe,Pt;function Nt(){if(Pt)return qe;Pt=1;for(var t={glog:function(a){if(a<1)throw new Error("glog("+a+")");return t.LOG_TABLE[a]},gexp:function(a){for(;a<0;)a+=255;for(;a>=256;)a-=255;return t.EXP_TABLE[a]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},h=0;h<8;h++)t.EXP_TABLE[h]=1<<h;for(var h=8;h<256;h++)t.EXP_TABLE[h]=t.EXP_TABLE[h-4]^t.EXP_TABLE[h-5]^t.EXP_TABLE[h-6]^t.EXP_TABLE[h-8];for(var h=0;h<255;h++)t.LOG_TABLE[t.EXP_TABLE[h]]=h;return qe=t,qe}var Qe,It;function Mt(){if(It)return Qe;It=1;var t=Nt();function h(a,c){if(a.length==null)throw new Error(a.length+"/"+c);for(var r=0;r<a.length&&a[r]==0;)r++;this.num=new Array(a.length-r+c);for(var i=0;i<a.length-r;i++)this.num[i]=a[i+r]}return h.prototype={get:function(a){return this.num[a]},getLength:function(){return this.num.length},multiply:function(a){for(var c=new Array(this.getLength()+a.getLength()-1),r=0;r<this.getLength();r++)for(var i=0;i<a.getLength();i++)c[r+i]^=t.gexp(t.glog(this.get(r))+t.glog(a.get(i)));return new h(c,0)},mod:function(a){if(this.getLength()-a.getLength()<0)return this;for(var c=t.glog(this.get(0))-t.glog(a.get(0)),r=new Array(this.getLength()),i=0;i<this.getLength();i++)r[i]=this.get(i);for(var i=0;i<a.getLength();i++)r[i]^=t.gexp(t.glog(a.get(i))+c);return new h(r,0).mod(a)}},Qe=h,Qe}var Ge,Tt;function br(){if(Tt)return Ge;Tt=1;var t=Dt(),h=Mt(),a=Nt(),c={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},r={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(i){for(var d=i<<10;r.getBCHDigit(d)-r.getBCHDigit(r.G15)>=0;)d^=r.G15<<r.getBCHDigit(d)-r.getBCHDigit(r.G15);return(i<<10|d)^r.G15_MASK},getBCHTypeNumber:function(i){for(var d=i<<12;r.getBCHDigit(d)-r.getBCHDigit(r.G18)>=0;)d^=r.G18<<r.getBCHDigit(d)-r.getBCHDigit(r.G18);return i<<12|d},getBCHDigit:function(i){for(var d=0;i!=0;)d++,i>>>=1;return d},getPatternPosition:function(i){return r.PATTERN_POSITION_TABLE[i-1]},getMask:function(i,d,s){switch(i){case c.PATTERN000:return(d+s)%2==0;case c.PATTERN001:return d%2==0;case c.PATTERN010:return s%3==0;case c.PATTERN011:return(d+s)%3==0;case c.PATTERN100:return(Math.floor(d/2)+Math.floor(s/3))%2==0;case c.PATTERN101:return d*s%2+d*s%3==0;case c.PATTERN110:return(d*s%2+d*s%3)%2==0;case c.PATTERN111:return(d*s%3+(d+s)%2)%2==0;default:throw new Error("bad maskPattern:"+i)}},getErrorCorrectPolynomial:function(i){for(var d=new h([1],0),s=0;s<i;s++)d=d.multiply(new h([1,a.gexp(s)],0));return d},getLengthInBits:function(i,d){if(1<=d&&d<10)switch(i){case t.MODE_NUMBER:return 10;case t.MODE_ALPHA_NUM:return 9;case t.MODE_8BIT_BYTE:return 8;case t.MODE_KANJI:return 8;default:throw new Error("mode:"+i)}else if(d<27)switch(i){case t.MODE_NUMBER:return 12;case t.MODE_ALPHA_NUM:return 11;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 10;default:throw new Error("mode:"+i)}else if(d<41)switch(i){case t.MODE_NUMBER:return 14;case t.MODE_ALPHA_NUM:return 13;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 12;default:throw new Error("mode:"+i)}else throw new Error("type:"+d)},getLostPoint:function(i){for(var d=i.getModuleCount(),s=0,n=0;n<d;n++)for(var o=0;o<d;o++){for(var f=0,p=i.isDark(n,o),l=-1;l<=1;l++)if(!(n+l<0||d<=n+l))for(var m=-1;m<=1;m++)o+m<0||d<=o+m||l==0&&m==0||p==i.isDark(n+l,o+m)&&f++;f>5&&(s+=3+f-5)}for(var n=0;n<d-1;n++)for(var o=0;o<d-1;o++){var g=0;i.isDark(n,o)&&g++,i.isDark(n+1,o)&&g++,i.isDark(n,o+1)&&g++,i.isDark(n+1,o+1)&&g++,(g==0||g==4)&&(s+=3)}for(var n=0;n<d;n++)for(var o=0;o<d-6;o++)i.isDark(n,o)&&!i.isDark(n,o+1)&&i.isDark(n,o+2)&&i.isDark(n,o+3)&&i.isDark(n,o+4)&&!i.isDark(n,o+5)&&i.isDark(n,o+6)&&(s+=40);for(var o=0;o<d;o++)for(var n=0;n<d-6;n++)i.isDark(n,o)&&!i.isDark(n+1,o)&&i.isDark(n+2,o)&&i.isDark(n+3,o)&&i.isDark(n+4,o)&&!i.isDark(n+5,o)&&i.isDark(n+6,o)&&(s+=40);for(var v=0,o=0;o<d;o++)for(var n=0;n<d;n++)i.isDark(n,o)&&v++;var T=Math.abs(100*v/d/d-50)/5;return s+=T*10,s}};return Ge=r,Ge}var Ve,kt;function wr(){if(kt)return Ve;kt=1;var t=xr(),h=vr(),a=yr(),c=br(),r=Mt();function i(s,n){this.typeNumber=s,this.errorCorrectLevel=n,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}var d=i.prototype;return d.addData=function(s){var n=new t(s);this.dataList.push(n),this.dataCache=null},d.isDark=function(s,n){if(s<0||this.moduleCount<=s||n<0||this.moduleCount<=n)throw new Error(s+","+n);return this.modules[s][n]},d.getModuleCount=function(){return this.moduleCount},d.make=function(){if(this.typeNumber<1){var s=1;for(s=1;s<40;s++){for(var n=h.getRSBlocks(s,this.errorCorrectLevel),o=new a,f=0,p=0;p<n.length;p++)f+=n[p].dataCount;for(var p=0;p<this.dataList.length;p++){var l=this.dataList[p];o.put(l.mode,4),o.put(l.getLength(),c.getLengthInBits(l.mode,s)),l.write(o)}if(o.getLengthInBits()<=f*8)break}this.typeNumber=s}this.makeImpl(!1,this.getBestMaskPattern())},d.makeImpl=function(s,n){this.moduleCount=this.typeNumber*4+17,this.modules=new Array(this.moduleCount);for(var o=0;o<this.moduleCount;o++){this.modules[o]=new Array(this.moduleCount);for(var f=0;f<this.moduleCount;f++)this.modules[o][f]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(s,n),this.typeNumber>=7&&this.setupTypeNumber(s),this.dataCache==null&&(this.dataCache=i.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,n)},d.setupPositionProbePattern=function(s,n){for(var o=-1;o<=7;o++)if(!(s+o<=-1||this.moduleCount<=s+o))for(var f=-1;f<=7;f++)n+f<=-1||this.moduleCount<=n+f||(0<=o&&o<=6&&(f==0||f==6)||0<=f&&f<=6&&(o==0||o==6)||2<=o&&o<=4&&2<=f&&f<=4?this.modules[s+o][n+f]=!0:this.modules[s+o][n+f]=!1)},d.getBestMaskPattern=function(){for(var s=0,n=0,o=0;o<8;o++){this.makeImpl(!0,o);var f=c.getLostPoint(this);(o==0||s>f)&&(s=f,n=o)}return n},d.createMovieClip=function(s,n,o){var f=s.createEmptyMovieClip(n,o),p=1;this.make();for(var l=0;l<this.modules.length;l++)for(var m=l*p,g=0;g<this.modules[l].length;g++){var v=g*p,T=this.modules[l][g];T&&(f.beginFill(0,100),f.moveTo(v,m),f.lineTo(v+p,m),f.lineTo(v+p,m+p),f.lineTo(v,m+p),f.endFill())}return f},d.setupTimingPattern=function(){for(var s=8;s<this.moduleCount-8;s++)this.modules[s][6]==null&&(this.modules[s][6]=s%2==0);for(var n=8;n<this.moduleCount-8;n++)this.modules[6][n]==null&&(this.modules[6][n]=n%2==0)},d.setupPositionAdjustPattern=function(){for(var s=c.getPatternPosition(this.typeNumber),n=0;n<s.length;n++)for(var o=0;o<s.length;o++){var f=s[n],p=s[o];if(this.modules[f][p]==null)for(var l=-2;l<=2;l++)for(var m=-2;m<=2;m++)l==-2||l==2||m==-2||m==2||l==0&&m==0?this.modules[f+l][p+m]=!0:this.modules[f+l][p+m]=!1}},d.setupTypeNumber=function(s){for(var n=c.getBCHTypeNumber(this.typeNumber),o=0;o<18;o++){var f=!s&&(n>>o&1)==1;this.modules[Math.floor(o/3)][o%3+this.moduleCount-8-3]=f}for(var o=0;o<18;o++){var f=!s&&(n>>o&1)==1;this.modules[o%3+this.moduleCount-8-3][Math.floor(o/3)]=f}},d.setupTypeInfo=function(s,n){for(var o=this.errorCorrectLevel<<3|n,f=c.getBCHTypeInfo(o),p=0;p<15;p++){var l=!s&&(f>>p&1)==1;p<6?this.modules[p][8]=l:p<8?this.modules[p+1][8]=l:this.modules[this.moduleCount-15+p][8]=l}for(var p=0;p<15;p++){var l=!s&&(f>>p&1)==1;p<8?this.modules[8][this.moduleCount-p-1]=l:p<9?this.modules[8][15-p-1+1]=l:this.modules[8][15-p-1]=l}this.modules[this.moduleCount-8][8]=!s},d.mapData=function(s,n){for(var o=-1,f=this.moduleCount-1,p=7,l=0,m=this.moduleCount-1;m>0;m-=2)for(m==6&&m--;;){for(var g=0;g<2;g++)if(this.modules[f][m-g]==null){var v=!1;l<s.length&&(v=(s[l]>>>p&1)==1);var T=c.getMask(n,f,m-g);T&&(v=!v),this.modules[f][m-g]=v,p--,p==-1&&(l++,p=7)}if(f+=o,f<0||this.moduleCount<=f){f-=o,o=-o;break}}},i.PAD0=236,i.PAD1=17,i.createData=function(s,n,o){for(var f=h.getRSBlocks(s,n),p=new a,l=0;l<o.length;l++){var m=o[l];p.put(m.mode,4),p.put(m.getLength(),c.getLengthInBits(m.mode,s)),m.write(p)}for(var g=0,l=0;l<f.length;l++)g+=f[l].dataCount;if(p.getLengthInBits()>g*8)throw new Error("code length overflow. ("+p.getLengthInBits()+">"+g*8+")");for(p.getLengthInBits()+4<=g*8&&p.put(0,4);p.getLengthInBits()%8!=0;)p.putBit(!1);for(;!(p.getLengthInBits()>=g*8||(p.put(i.PAD0,8),p.getLengthInBits()>=g*8));)p.put(i.PAD1,8);return i.createBytes(p,f)},i.createBytes=function(s,n){for(var o=0,f=0,p=0,l=new Array(n.length),m=new Array(n.length),g=0;g<n.length;g++){var v=n[g].dataCount,T=n[g].totalCount-v;f=Math.max(f,v),p=Math.max(p,T),l[g]=new Array(v);for(var w=0;w<l[g].length;w++)l[g][w]=255&s.buffer[w+o];o+=v;var b=c.getErrorCorrectPolynomial(T),j=new r(l[g],b.getLength()-1),D=j.mod(b);m[g]=new Array(b.getLength()-1);for(var w=0;w<m[g].length;w++){var z=w+D.getLength()-m[g].length;m[g][w]=z>=0?D.get(z):0}}for(var E=0,w=0;w<n.length;w++)E+=n[w].totalCount;for(var L=new Array(E),A=0,w=0;w<f;w++)for(var g=0;g<n.length;g++)w<l[g].length&&(L[A++]=l[g][w]);for(var w=0;w<p;w++)for(var g=0;g<n.length;g++)w<m[g].length&&(L[A++]=m[g][w]);return L},Ve=i,Ve}var ve={},Et;function Cr(){if(Et)return ve;Et=1,Object.defineProperty(ve,"__esModule",{value:!0});var t=Object.assign||function(o){for(var f=1;f<arguments.length;f++){var p=arguments[f];for(var l in p)Object.prototype.hasOwnProperty.call(p,l)&&(o[l]=p[l])}return o},h=_t(),a=i(h),c=At(),r=i(c);function i(o){return o&&o.__esModule?o:{default:o}}function d(o,f){var p={};for(var l in o)f.indexOf(l)>=0||Object.prototype.hasOwnProperty.call(o,l)&&(p[l]=o[l]);return p}var s={bgColor:a.default.oneOfType([a.default.object,a.default.string]).isRequired,bgD:a.default.string.isRequired,fgColor:a.default.oneOfType([a.default.object,a.default.string]).isRequired,fgD:a.default.string.isRequired,size:a.default.number.isRequired,title:a.default.string,viewBoxSize:a.default.number.isRequired,xmlns:a.default.string},n=(0,c.forwardRef)(function(o,f){var p=o.bgColor,l=o.bgD,m=o.fgD,g=o.fgColor,v=o.size,T=o.title,w=o.viewBoxSize,b=o.xmlns,j=b===void 0?"http://www.w3.org/2000/svg":b,D=d(o,["bgColor","bgD","fgD","fgColor","size","title","viewBoxSize","xmlns"]);return r.default.createElement("svg",t({},D,{height:v,ref:f,viewBox:"0 0 "+w+" "+w,width:v,xmlns:j}),T?r.default.createElement("title",null,T):null,r.default.createElement("path",{d:l,fill:p}),r.default.createElement("path",{d:m,fill:g}))});return n.displayName="QRCodeSvg",n.propTypes=s,ve.default=n,ve}var jt;function Sr(){if(jt)return oe;jt=1,Object.defineProperty(oe,"__esModule",{value:!0}),oe.QRCode=void 0;var t=Object.assign||function(v){for(var T=1;T<arguments.length;T++){var w=arguments[T];for(var b in w)Object.prototype.hasOwnProperty.call(w,b)&&(v[b]=w[b])}return v},h=_t(),a=p(h),c=Bt(),r=p(c),i=wr(),d=p(i),s=At(),n=p(s),o=Cr(),f=p(o);function p(v){return v&&v.__esModule?v:{default:v}}function l(v,T){var w={};for(var b in v)T.indexOf(b)>=0||Object.prototype.hasOwnProperty.call(v,b)&&(w[b]=v[b]);return w}var m={bgColor:a.default.oneOfType([a.default.object,a.default.string]),fgColor:a.default.oneOfType([a.default.object,a.default.string]),level:a.default.string,size:a.default.number,value:a.default.string.isRequired},g=(0,s.forwardRef)(function(v,T){var w=v.bgColor,b=w===void 0?"#FFFFFF":w,j=v.fgColor,D=j===void 0?"#000000":j,z=v.level,E=z===void 0?"L":z,L=v.size,A=L===void 0?256:L,U=v.value,B=l(v,["bgColor","fgColor","level","size","value"]),N=new d.default(-1,r.default[E]);N.addData(U),N.make();var W=N.modules;return n.default.createElement(f.default,t({},B,{bgColor:b,bgD:W.map(function(M,J){return M.map(function(H,q){return H?"":"M "+q+" "+J+" l 1 0 0 1 -1 0 Z"}).join(" ")}).join(" "),fgColor:D,fgD:W.map(function(M,J){return M.map(function(H,q){return H?"M "+q+" "+J+" l 1 0 0 1 -1 0 Z":""}).join(" ")}).join(" "),ref:T,size:A,viewBoxSize:W.length}))});return oe.QRCode=g,g.displayName="QRCode",g.propTypes=m,oe.default=g,oe}Sr();const Pr=({isOpen:t,onClose:h,onSubmit:a,error:c,t:r})=>{const[i,d]=y.useState(""),[s,n]=y.useState(!1);if(!t)return null;const o=f=>{f.preventDefault(),n(!0),a(i),n(!1)};return e.jsx(sr,{children:e.jsx(ar,{style:{maxWidth:"400px"},children:e.jsxs("div",{style:{padding:"20px"},children:[e.jsx("h3",{style:{margin:"0 0 20px 0",textAlign:"center"},children:r("Enter Password")}),e.jsxs("form",{onSubmit:o,children:[e.jsxs("div",{style:{marginBottom:"20px"},children:[e.jsx("input",{type:"password",value:i,onChange:f=>d(f.target.value),placeholder:r("Password"),style:{width:"100%",padding:"10px",borderRadius:"4px",border:c?"1px solid #d32f2f":"1px solid #ccc",fontSize:"16px"},required:!0}),c&&e.jsx("div",{style:{color:"#d32f2f",fontSize:"14px",marginTop:"5px",padding:"5px"},children:c})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[e.jsx("button",{type:"button",onClick:h,style:{padding:"10px 16px",backgroundColor:"#f3f4f6",border:"none",borderRadius:"4px",cursor:"pointer",fontSize:"14px"},children:r("Cancel")}),e.jsx("button",{type:"submit",disabled:s||!i,style:{padding:"10px 16px",backgroundColor:"#006adc",color:"white",border:"none",borderRadius:"4px",cursor:i?"pointer":"not-allowed",opacity:i?1:.7,fontSize:"14px"},children:r(s?"Submitting...":"Submit")})]})]})]})})})},Ir=({addPhotosToAlbum:t,saveAlbum:h,promptForPassword:a,showingEnterPassword:c,passwordPolicy:r,usingFolderInviteGrantsRightToAddItems:i,t:d})=>{const[s,n]=y.useState(!1),[o,f]=y.useState(!1),p=y.useRef(null),l=840;y.useEffect(()=>{f(window.innerWidth<l);const T=()=>{f(window.innerWidth<l)};return window.addEventListener("resize",T),()=>window.removeEventListener("resize",T)},[]);const m=()=>{n(!s)},g=()=>{n(!1)},v=T=>{T(),g()};return y.useEffect(()=>{const T=b=>{p.current&&!p.current.contains(b.target)&&n(!1)},w=()=>{n(!1)};return s&&(document.addEventListener("mousedown",T),window.addEventListener("scroll",w)),()=>{document.removeEventListener("mousedown",T),window.removeEventListener("scroll",w)}},[s]),o?e.jsxs("div",{ref:p,style:{position:"relative",display:"flex",alignItems:"center",justifyContent:"flex-end",width:"100%",flexWrap:"nowrap"},children:[!c&&e.jsxs("div",{style:{flexShrink:0},children:[e.jsxs(Fo,{onClick:m,"aria-label":d("Menu"),"aria-expanded":s,children:[e.jsxs($o,{children:[e.jsx(Be,{}),e.jsx(Be,{}),e.jsx(Be,{})]}),d("Save")]}),s&&e.jsxs(Wo,{children:[i&&e.jsx(De,{onClick:()=>v(t),children:d("Add Photos To Album")}),e.jsx(De,{onClick:()=>v(h),children:d("Save To My Library")}),e.jsx(De,{onClick:()=>v(h),children:d("Download To My Device")})]})]}),c&&r&&r!=="NoPassword"&&e.jsx("div",{style:{flexShrink:0},children:e.jsx(gt,{onClick:a,children:d("Enter Password")})})]}):e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"20px",justifyContent:"flex-end",flexWrap:"nowrap"},children:[!c&&e.jsxs("div",{style:{display:"flex",gap:"20px",flexWrap:"nowrap"},children:[i&&e.jsx(V,{onClick:t,children:d("Add Photos")}),e.jsx(V,{onClick:h,children:d("Save To My Library")}),e.jsx(V,{onClick:h,children:d("Download To My Device")})]}),c&&e.jsx("div",{children:e.jsx(gt,{onClick:a,children:d("Enter Password")})})]})},Je=new Ro({region:ao});function Rt(t){const h=t.trim().toLowerCase(),a="@gmail.com";return h.endsWith(a)?`${h.slice(0,-a.length).replace(/\./g,"")}${a}`:h}const Tr=({isOpen:t,onClose:h,onLoginSuccess:a,t:c})=>{const[r,i]=y.useState(""),[d,s]=y.useState(!1),[n,o]=y.useState(""),[f,p]=y.useState(""),[l,m]=y.useState("idle"),[g,v]=y.useState(""),T=y.useRef(null),w=y.useRef(null);y.useEffect(()=>{d&&w.current&&w.current.focus()},[d]),y.useEffect(()=>{t&&T.current&&!d&&T.current.focus()},[t,d]);function b(E){const L=E.target.value;/^\d*$/.test(L)&&L.length<=6&&o(L)}async function j(){var L;m("sending"),v("");const E=Rt(r);if(!E||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(E)){m("error"),v(c("Please enter a valid email address"));return}try{const A=new Ao({ClientId:Re,Username:E,Password:crypto.randomUUID(),UserAttributes:[{Name:"email",Value:E}]});try{await Je.send(A)}catch(N){if(!((L=N.name)!=null&&L.includes("UsernameExistsException")))throw N}const U=new Lo({ClientId:Re,AuthFlow:"CUSTOM_AUTH",AuthParameters:{USERNAME:E}}),B=await Je.send(U);if(B.Session)p(B.Session),s(!0),m("idle");else throw new Error("No session returned from InitiateAuth")}catch(A){console.error(A),m("error"),v(c("Unable to send verification code. Please try again later."))}}async function D(){var L,A,U,B,N,W;m("verifying"),v("");const E=Rt(r);try{const M=new _o({ClientId:Re,ChallengeName:"CUSTOM_CHALLENGE",ChallengeResponses:{USERNAME:E,ANSWER:n},Session:f}),H=(L=(await Je.send(M)).AuthenticationResult)==null?void 0:L.IdToken;if(!H)throw new Error("No token received");localStorage.setItem("idToken",H);const le=`${JSON.parse(atob(H.split(".")[1]))["cognito:username"]}_____Public____Profile`,K=await(await fetch(ye,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${H}`},body:JSON.stringify({query:`
            mutation MyMutation($relationIds: [ID!]) {
              batchGetItems(relationIds: $relationIds) {
                items {
                  id
                  item {
                    ... on Profile {
                      anyDisplayName
                    }
                  }
                }
                nextToken
              }
            }
          `,variables:{relationIds:[le]}})})).json(),de=(W=(N=(B=(U=(A=K==null?void 0:K.data)==null?void 0:A.batchGetItems)==null?void 0:U.items)==null?void 0:B[0])==null?void 0:N.item)==null?void 0:W.anyDisplayName;de&&localStorage.setItem("publicUsername",de),m("idle"),a(),h()}catch(M){console.error(M),m("error"),v(c("Invalid or expired verification code. Please try again or request a new code."))}}function z(){s(!1),o(""),m("idle")}return t?e.jsx("div",{style:{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',backgroundColor:"rgba(0, 0, 0, 0.5)",position:"fixed",top:0,left:0,right:0,bottom:0,display:"flex",alignItems:"center",justifyContent:"center",zIndex:1e3},children:e.jsxs("div",{style:{maxWidth:400,width:"100%",background:"#ffffff",padding:"32px",borderRadius:"12px",boxShadow:"0 6px 20px rgba(0,0,0,0.06)",textAlign:"center"},children:[e.jsxs("div",{style:{marginBottom:"24px"},children:[e.jsx("img",{src:"images/logo_no_background.png",alt:"6180 Logo",style:{height:"60px",marginBottom:"16px"}}),e.jsx("h2",{style:{fontSize:"24px",fontWeight:600,color:"#333"},children:c("Sign in to 6180")})]}),g&&e.jsx("div",{style:{backgroundColor:"#f8d7da",color:"#721c24",padding:"10px",borderRadius:"6px",marginBottom:"16px",fontSize:"14px"},children:g}),d?e.jsxs(e.Fragment,{children:[e.jsxs("p",{style:{marginBottom:"16px",color:"#555"},children:[c("Check your email for a 6-digit verification code sent to")," ",e.jsx("strong",{children:r})]}),e.jsx("input",{ref:w,type:"tel",inputMode:"numeric",pattern:"[0-9]*",maxLength:6,value:n,onChange:b,placeholder:c("Enter 6-digit code"),style:{width:"100%",padding:"12px",marginBottom:"16px",borderRadius:"6px",border:"1px solid #ccc",fontSize:"16px",boxSizing:"border-box",letterSpacing:"2px",textAlign:"center"}}),e.jsx("button",{onClick:D,disabled:l==="verifying"||n.length!==6,style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#28a745",color:"#fff",border:"none",borderRadius:"6px",cursor:l==="verifying"||n.length!==6?"not-allowed":"pointer",opacity:l==="verifying"||n.length!==6?.7:1},children:c(l==="verifying"?"Verifying...":"Verify Code")}),e.jsxs("div",{style:{marginTop:"16px",fontSize:"14px",color:"#666",display:"flex",justifyContent:"center",gap:"8px"},children:[e.jsx("span",{children:c("Didn't receive a code?")}),e.jsx("button",{onClick:z,style:{background:"none",border:"none",color:"#007bff",padding:0,cursor:"pointer",fontSize:"14px",textDecoration:"underline"},children:c("Send new code")})]}),e.jsx("button",{onClick:h,style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#f8f9fa",color:"#555",border:"1px solid #ccc",borderRadius:"6px",cursor:"pointer",marginTop:"12px"},children:c("Cancel")})]}):e.jsxs(e.Fragment,{children:[e.jsx("input",{ref:T,type:"email",value:r,onChange:E=>i(E.target.value),placeholder:c("Enter your email"),style:{width:"100%",padding:"12px",marginBottom:"16px",borderRadius:"6px",border:"1px solid #ccc",fontSize:"16px",boxSizing:"border-box"}}),e.jsx("button",{onClick:j,disabled:l==="sending"||!r.trim(),style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#007bff",color:"#fff",border:"none",borderRadius:"6px",cursor:l==="sending"||!r.trim()?"not-allowed":"pointer",opacity:l==="sending"||!r.trim()?.7:1},children:c(l==="sending"?"Sending...":"Send Verification Code")}),e.jsx("p",{style:{fontSize:"13px",color:"#666",marginTop:"16px",textAlign:"center"},children:c("We'll send a secure verification code to your email")}),e.jsx("button",{onClick:h,style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#f8f9fa",color:"#555",border:"1px solid #ccc",borderRadius:"6px",cursor:"pointer",marginTop:"12px"},children:c("Cancel")})]})]})}):null},kr=()=>{const{t,language:h}=Ce(),[a,c]=y.useState("1"),[r,i]=y.useState(null),[d,s]=y.useState(!0),[n,o]=y.useState(null),[f,p]=y.useState(null),[l,m]=y.useState(void 0),[g,v]=y.useState(!1),[T,w]=y.useState(!1),[b,j]=y.useState(null),[D,z]=y.useState({}),[E,L]=y.useState(null),[A,U]=y.useState(!1),[B,N]=y.useState(new Set),W=y.useRef(null),[M,J]=y.useState([]),[H,q]=y.useState(!1),[Ye,le]=y.useState(!1),[X,K]=y.useState({totalFiles:0,filesComplete:0,filesUploading:0,filesProcessing:0,filesWithError:0,overallProgress:0}),[de,Z]=y.useState(!1),[Ot,Se]=y.useState(!1),[Xe,ne]=y.useState(null),[Ze,Pe]=y.useState(!1),[ce,ee]=y.useState(!1),[zt,et]=y.useState(!1),[ie,Ie]=y.useState(""),[tt,ue]=y.useState(""),[Ut,Ft]=y.useState(!1),[ot,Te]=y.useState(!1),Q=vo(()=>{});y.useEffect(()=>{_e(M,K)},[M]),y.useEffect(()=>{if(Ze&&M.length>0){const u=M.filter(C=>C.status==="complete").length,x=M.filter(C=>C.status==="error").length;console.log(`Upload complete: ${u} successful, ${x} failed`),f?window.location.href=`/save-album.html?folderId=${encodeURIComponent(f)}`:window.location.href="/save-album.html"}},[Ze,M.length,f]);const $t=()=>!l||g||l==="NoPassword"?!0:l==="NotVisible"?(b&&console.error("Password error:",b),!1):!0,rt=()=>{const u=(b==null?void 0:b.toLowerCase().includes("watermark"))??!1;return!g&&l==="Watermark"||u},nt=()=>!g&&l!==void 0&&l!=="NoPassword",Wt=u=>{if(j(null),u.trim()===""){j(t("Password cannot be empty"));return}const x=r==null?void 0:r.actualPassword;if(!x)if(r!=null&&r.hasPassword){j(t("Unable to validate password. Please try again later."));return}else{v(!0),w(!1);return}if(u!==x){j(t("Invalid password. Please try again."));return}v(!0),w(!1),j(null),ce&&(ee(!1),he())},Y=()=>{j(null),w(!0)},pe=u=>{if(!A){if(l==="NotVisible"&&!g){Y();return}L(u),ke(u),document.body.style.overflow="hidden"}},Ht=()=>{L(null),document.body.style.overflow=""},qt=()=>{E!==null&&E>0&&(L(E-1),ke(E-1))},Qt=()=>{E!==null&&r&&E<r.mediaItems.length-1&&(L(E+1),ke(E+1))},ke=u=>{z(x=>({...x,[u]:!0}))},it=u=>{if(r){const x=[...r.mediaItems];x[u]={...x[u],loaded:!0},i({...r,mediaItems:x}),z(C=>{const I={...C};return delete I[u],I})}},Gt=u=>{c(u),localStorage.setItem("columns",u)},st=()=>{W.current&&W.current.click()},Vt=async()=>{const u=await re();if(!u){le(!0),Z(!0);return}if(!Xe)try{const C=JSON.parse(atob(u.split(".")[1]))["cognito:username"];ne(C)}catch(x){console.error("Failed to decode token",x)}Pe(!1),st()},Jt=async()=>{Z(!1);const u=await re();if(u)try{const C=JSON.parse(atob(u.split(".")[1]))["cognito:username"];if(ne(C),Ye&&(localStorage.setItem("selectPhotosButtonTimestamp",Date.now().toString()),le(!1)),ce){ee(!1),he();return}setTimeout(()=>{window.location.reload()},500)}catch(x){console.error("Failed to decode token",x)}},Kt=async u=>{const x=Array.from(u.target.files||[]);if(!x.length)return;localStorage.removeItem("selectPhotosButtonTimestamp"),Se(!1),q(!0),Pe(!1);const C=await Le();if(!C){Q("❌ Authentication failed"),q(!1),Z(!0);return}try{const P=JSON.parse(atob(C.split(".")[1]))["cognito:username"];if(!P){Q("❌ Missing Cognito Username"),q(!1);return}ne(P);const k=f||`${P}_____${ho()}____Folder`;Q(`📁 Using folder ID: ${k}`),J(x.map(F=>({fileName:F.name,s3PreviewUrl:URL.createObjectURL(F),type:F.type,size:F.size,status:"pending",progress:0})));const R=yo(J),O=setInterval(()=>{_e(M,K)},500),_=await bo(x,P,R,Q);clearInterval(O),_e(_,K),localStorage.setItem(ut.SELECTED_PHOTOS,JSON.stringify(_)),Q(`📸 Saved ${_.length} photos metadata to storage`);const Ee=_.every(F=>F.status==="complete"),se=_.some(F=>F.status==="error");if(Ee&&!se)Q(`✅ All ${_.length} files successfully uploaded`);else if(se){const F=_.filter(ge=>ge.status==="error").length;Q(`⚠️ Upload completed with ${F} errors`)}setTimeout(()=>{Pe(!0)},1e3)}catch(I){Q(`❌ Fatal error in handleFileSelection: ${String(I)}`),q(!1)}finally{u.target&&(u.target.value="")}},Yt=u=>{const x=/^[a-zA-Z0-9-]+$/.test(u);return console.log(`Username validation for '${u}': ${x}`),x},at=async u=>{var P,k;console.log(`Submitting username: ${u}`),Te(!0),ue("");const x=await Le();if(!x){ue(t("Authentication error. Please try again.")),Te(!1);return}const C=`
      mutation MyMutation($savePublicProfileDisplayNameInput: SavePublicProfileDisplayNameInput) {
        changeMyAccountItem(savePublicProfileDisplayNameInput: $savePublicProfileDisplayNameInput) {
          ... on Profile {
            anyDisplayName
          }
        }
      }
    `,I={savePublicProfileDisplayNameInput:{anyDisplayName:u}};try{const O=await(await fetch(ye,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${x}`},body:JSON.stringify({query:C,variables:I})})).json(),_=(k=(P=O==null?void 0:O.data)==null?void 0:P.changeMyAccountItem)==null?void 0:k.anyDisplayName;if(_)Xt(_);else throw new Error("Username taken")}catch(R){console.error(`Error submitting username: ${R}`),ue(t("Username is already taken. Please try a different one.")),Ft(!0),Te(!1)}},Xt=u=>{console.log(`Username successfully updated to: ${u}`),localStorage.setItem("publicUsername",u),et(!1),he()},Zt=()=>{const u=Math.floor(1e5+Math.random()*9e5).toString(),x=`${ie}${u}`;console.log(`Appending random digits to username: ${ie} -> ${x}`),Ie(x),at(x)},fe=(u,x,C,I,P=!1)=>{C&&(C.style.width=`${u}%`,P&&(C.style.backgroundColor="#f44336")),x&&(x.textContent=I,P&&(x.style.color="#f44336"))},te=(u,x,C,I)=>{var P;if(I&&(I.style.width="100%",I.style.backgroundColor="#f44336"),C&&(C.textContent=t("Error saving album"),C.style.color="#f44336"),u){u.textContent=x,u.style.display="block";const k=document.createElement("button");k.textContent=t("Retry"),k.style.marginTop="15px",k.style.padding="8px 16px",k.style.backgroundColor="#2196f3",k.style.color="white",k.style.border="none",k.style.borderRadius="4px",k.style.cursor="pointer",k.onclick=function(){const _=u.closest('div[style*="position: fixed"]');_&&_.parentNode&&_.parentNode.removeChild(_),setTimeout(lt,500)};const R=document.createElement("button");R.textContent=t("Close"),R.style.marginTop="15px",R.style.marginLeft="10px",R.style.padding="8px 16px",R.style.backgroundColor="#757575",R.style.color="white",R.style.border="none",R.style.borderRadius="4px",R.style.cursor="pointer",R.onclick=function(){const _=u.closest('div[style*="position: fixed"]');_&&_.parentNode&&_.parentNode.removeChild(_)};const O=document.createElement("div");O.appendChild(k),O.appendChild(R),(P=u.parentNode)==null||P.appendChild(O)}},he=async()=>{console.log("Starting album save execution");const u=document.createElement("div");u.style.position="fixed",u.style.top="0",u.style.left="0",u.style.width="100%",u.style.height="100%",u.style.backgroundColor="rgba(0, 0, 0, 0.5)",u.style.display="flex",u.style.justifyContent="center",u.style.alignItems="center",u.style.zIndex="2000";const x=document.createElement("div");x.style.backgroundColor="white",x.style.padding="30px",x.style.borderRadius="8px",x.style.textAlign="center";const C=document.createElement("p");C.id="saveProgressText",C.textContent=t("Saving album...");const I=document.createElement("div");I.style.backgroundColor="#f0f0f0",I.style.borderRadius="4px",I.style.overflow="hidden",I.style.height="8px",I.style.marginTop="10px";const P=document.createElement("div");P.id="saveProgress",P.style.backgroundColor="#4caf50",P.style.height="100%",P.style.width="5%",P.style.transition="width 0.3s ease";const k=document.createElement("p");k.id="saveErrorText",k.style.color="#f44336",k.style.display="none",k.style.marginTop="10px",k.style.fontSize="14px",I.appendChild(P),x.appendChild(C),x.appendChild(I),x.appendChild(k),u.appendChild(x),document.body.appendChild(u);try{const R=await Le();if(!R){console.error("No token available for saving album"),document.body.removeChild(u);return}const _=JSON.parse(atob(R.split(".")[1]))["cognito:username"];if(!_){console.error("Missing username in token"),te(k,"Could not retrieve username from token",C,P);return}if(!f){console.error("No folder ID available"),te(k,"Folder ID is missing",C,P);return}if(!r||!r.mediaItems){console.error("No album data available"),te(k,"Album data is missing or incomplete",C,P);return}if(r.mediaItems.length===0){console.error("No media items to save"),te(k,"No media items in album to save",C,P);return}const Ee=Math.floor(Date.now()/1e3);fe(30,C,P,t("Preparing album data..."));const se={currentTime:Ee,folderId:f,profileIds:[`${_}_____Public____Profile`],folderPositionSelectedTagInputs:[],folderPositionPoints:1};console.log("Folder position input:",se),fe(50,C,P,t("Saving album..."));const F=`
        mutation SaveAlbum(
          $folderPositionInputs: [FolderPositionInput!]
        ) {
          changeFiles(folderPositionInputs: $folderPositionInputs) {
            items { id }
          }
        }
      `,ge={folderPositionInputs:[se]};console.log("GraphQL mutation variables:",JSON.stringify(ge));try{const G=await fetch(ye,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${R}`},body:JSON.stringify({query:F,variables:ge})});if(fe(80,C,P,t("Almost there...")),!G.ok)throw new Error(`HTTP error: ${G.status} ${G.statusText}`);const je=await G.text();let ae;try{ae=JSON.parse(je),console.log("API response:",ae)}catch(me){const xe=me instanceof Error?me.message:"Unknown JSON parse error";throw new Error(`Invalid JSON response: ${xe}`)}if(ae.errors&&ae.errors.length>0){const me=ae.errors.map(xe=>(console.error("GraphQL error:",xe),xe.message||"Unknown GraphQL error")).join("; ");throw new Error(`GraphQL errors: ${me}`)}console.log("Album saved successfully"),fe(100,C,P,t("Album saved successfully!")),sessionStorage.setItem("album_just_saved","true"),setTimeout(()=>{document.body.removeChild(u),window.location.href="/my-albums.html"},2e3)}catch(G){const je=G instanceof Error?G.message:"Unknown API error";console.error("Error in API request:",G),te(k,je,C,P)}}catch(R){const O=R instanceof Error?R.message:"Unknown error";console.error("Error saving album:",R),te(k,O,C,P)}},lt=async()=>{if(console.log("Starting direct album save"),l==="CannotBeSaved"&&!g){ee(!0),Y();return}const u=await re();if(!u){console.log("User not logged in, showing OTP login"),ee(!0),Z(!0);return}if(!Xe)try{const I=JSON.parse(atob(u.split(".")[1]))["cognito:username"];ne(I)}catch(C){console.error("Failed to decode token",C)}const x=localStorage.getItem("publicUsername");if(x!=null&&x.startsWith("Profile-")){console.log("Public username starts with 'Profile-', showing username prompt"),Ie(x),et(!0);return}he()},eo=async()=>{if((l==="NotVisible"||l==="CannotBeSaved")&&!g){Y();return}U(!A),N(new Set)},dt=(u,x)=>{x.stopPropagation(),N(C=>{const I=new Set(C);return I.has(u)?I.delete(u):I.add(u),I})},to=()=>{U(!1),N(new Set)},oo=async()=>{if(B.size===0){alert(t("Please select at least one item to share."));return}if(r)try{const u=document.createElement("div");u.style.position="fixed",u.style.top="0",u.style.left="0",u.style.width="100%",u.style.height="100%",u.style.backgroundColor="rgba(0, 0, 0, 0.5)",u.style.display="flex",u.style.justifyContent="center",u.style.alignItems="center",u.style.zIndex="2000";const x=document.createElement("div");x.style.backgroundColor="white",x.style.padding="30px",x.style.borderRadius="8px",x.style.textAlign="center";const C=document.createElement("p");C.textContent=t("Creating sub-album..."),x.appendChild(C),u.appendChild(x),document.body.appendChild(u);const P={isSubAlbum:!0,selectedFileIds:Array.from(B).map(k=>{var R;return(R=r.mediaItems[k])==null?void 0:R.fileId}).filter(k=>k)};localStorage.setItem(ut.SUB_ALBUM_DATA,JSON.stringify(P)),document.body.removeChild(u),window.location.href="/save-album.html"}catch(u){console.error("Error creating sub-album:",u),alert(t("There was an error creating the sub-album. Please try again."))}},ro=async()=>{if(l==="CannotBeSaved"&&!g){Y();return}if(!await re()&&(f||l==="CannotBeSaved")){Z(!0);return}r&&xo(r,t,pe)};return y.useEffect(()=>{const u=localStorage.getItem("columns")||"1";c(u)},[]),y.useEffect(()=>{(async()=>{const x=po();if(!x){o(t("Valid ID not obtained from query parameter.")),s(!1);return}const C=x.split("_");let I=C[C.length-1].replace(/-/g,"");I.length===32?(I=fo(I),console.log(I)):console.error("Invalid UUID format: must be 32 characters after removing dashes");const P=await Bo(I,p);P&&(i(P),P.passwordPolicy&&(m(P.passwordPolicy),P.passwordPolicy==="NoPassword"&&v(!0))),s(!1)})()},[]),y.useEffect(()=>{(async()=>{const x=await re();if(x)try{const I=JSON.parse(atob(x.split(".")[1]))["cognito:username"];ne(I);const P=localStorage.getItem("selectPhotosButtonTimestamp");if(P){const k=parseInt(P,10),O=(Date.now()-k)/(1e3*60);Se(O<10),O>=10&&localStorage.removeItem("selectPhotosButtonTimestamp")}else Se(!1)}catch(C){console.error("Failed to decode token",C)}})()},[]),y.useEffect(()=>{r!=null&&r.folderName?document.title=r.folderName:document.title=t("Photos")},[r,h]),e.jsxs(Do,{children:[e.jsx(lr,{}),e.jsx(No,{children:e.jsxs(Mo,{children:[e.jsx(dr,{children:A?e.jsxs("div",{style:{display:"flex",gap:"16px"},children:[e.jsxs(V,{onClick:oo,disabled:B.size===0,style:{opacity:B.size===0?.5:1,backgroundColor:B.size>0?"#006adc":void 0,color:B.size>0?"white":void 0},children:[t("Create Sub-album")," (",B.size,")"]}),e.jsx(V,{onClick:to,children:t("Cancel")})]}):e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",width:"100%",flexWrap:"nowrap",alignItems:"center"},children:[e.jsx("div",{style:{flexShrink:0},children:!nt()&&e.jsx(zo,{onClick:eo,children:t("Create Sub-album")})}),e.jsxs("div",{style:{marginLeft:"auto",display:"flex",alignItems:"center"},children:[!A&&!g&&l&&l!=="NoPassword"&&e.jsx(V,{onClick:Y,children:t("Enter Password")}),!A&&!(!g&&l&&l!=="NoPassword")&&e.jsx(Ir,{addPhotosToAlbum:Vt,saveAlbum:lt,downloadPhotos:ro,promptForPassword:Y,showingEnterPassword:nt(),passwordPolicy:l,usingFolderInviteGrantsRightToAddItems:r==null?void 0:r.usingFolderInviteGrantsRightToAddItems,t})]})]})}),e.jsxs(Uo,{children:[e.jsx(nr,{htmlFor:"columns",id:"columns-label",children:e.jsx("strong",{children:t("Columns:")})}),e.jsxs(ir,{id:"columns",value:a,onChange:u=>Gt(u.target.value),children:[e.jsx("option",{value:"1",children:"1"}),e.jsx("option",{value:"2",children:"2"}),e.jsx("option",{value:"3",children:"3"}),e.jsx("option",{value:"4",children:"4"}),e.jsx("option",{value:"5",children:"5"})]})]})]})}),e.jsxs(Qo,{id:"media-container",children:[Ot&&(r==null?void 0:r.usingFolderInviteGrantsRightToAddItems)&&e.jsx("div",{style:{width:"100%",display:"flex",justifyContent:"center",marginBottom:"20px",marginTop:"10px"},children:e.jsx("button",{onClick:st,style:{backgroundColor:"#007bff",color:"white",border:"none",borderRadius:"6px",padding:"12px 20px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"8px",fontSize:"16px",boxShadow:"0 2px 4px rgba(0,0,0,0.1)"},children:e.jsx("span",{children:t("Select Photos To Add To Album")})})}),r&&Object.keys(r.contacts).length>0&&e.jsx("div",{style:{width:"100%",backgroundColor:"#f0f7ff",borderRadius:"8px",padding:"16px",marginBottom:"20px",boxShadow:"0 2px 4px rgba(0,0,0,0.1)",border:"1px solid #d0e1f9"},children:e.jsxs("p",{style:{margin:"0",fontSize:"15px",color:"#333",textAlign:"left"},children:[t('Click "Save" to create a memory with '),e.jsx("strong",{children:Object.values(r.contacts).filter(u=>!u.toString().startsWith("Profile-")).join(", ")}),t(" that you can filter for later")]})}),H&&e.jsxs("div",{style:{width:"100%",marginBottom:"20px"},children:[e.jsx(go,{progressTracker:X,t,isRTL:Ae(h)==="rtl",style:{marginTop:"20px"}}),X.filesComplete>0&&X.filesComplete===X.totalFiles&&e.jsx("div",{style:{backgroundColor:"#e8f5e9",color:"#2e7d32",padding:"10px 16px",borderRadius:"6px",fontSize:"14px",marginTop:"10px",textAlign:"center"},children:t("Upload complete! Preparing to save your album...")}),X.filesWithError>0&&e.jsx("div",{style:{backgroundColor:"#ffebee",color:"#c62828",padding:"10px 16px",borderRadius:"6px",fontSize:"14px",marginTop:"10px",textAlign:"center"},children:t("Some files could not be uploaded. You can continue with the successfully uploaded files.")})]}),!g&&l==="NotVisible"&&e.jsxs("div",{style:{padding:"20px",backgroundColor:"#f3f4f6",borderRadius:"8px",textAlign:"center",marginBottom:"20px"},children:[e.jsx("h3",{children:t("This album is password protected")}),e.jsx("p",{children:t("Please enter the password to view the contents")}),b&&e.jsx("div",{style:{color:"#d32f2f",fontSize:"14px",margin:"10px 0",padding:"5px",backgroundColor:"rgba(211, 47, 47, 0.1)",borderRadius:"4px"},children:b}),e.jsx("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"10px"},children:e.jsx(V,{onClick:Y,children:t("Enter Password")})})]}),A&&e.jsx(ur,{children:e.jsx("p",{children:t("Select photos and videos to create a sub-album to share")})}),(r==null?void 0:r.folderName)&&r.folderName!==t("Photos")&&r.folderName.trim()!==""&&e.jsx(Ho,{id:"album-title",children:e.jsx(qo,{children:r.folderName})}),r!=null&&r.folderDescription&&r.folderDescription.trim()!==""?e.jsx(Go,{id:"description-container",children:e.jsx(Vo,{children:r.folderDescription})}):null,e.jsx(Jo,{id:"media-grid",columns:a,children:d?e.jsx(rr,{id:"loading-message",children:t("Loading album content...")}):n?e.jsx(Ne,{children:n}):$t()?r&&r.mediaItems.length===0?e.jsx(Ne,{children:t("No media found in this album")}):r==null?void 0:r.mediaItems.map((u,x)=>{const C=u.ownerId&&r.contacts[u.ownerId]?r.contacts[u.ownerId]:"",I=B.has(x),P=rt();return e.jsxs("div",{style:{position:"relative",border:A&&I?"3px solid #006adc":void 0,borderRadius:"8px",overflow:"hidden",boxShadow:A&&I?"0 0 0 3px rgba(0, 106, 220, 0.3)":void 0},onClick:k=>A?dt(x,k):pe(x),children:[A&&e.jsx(cr,{isSelected:I,onClick:k=>dt(x,k),children:I&&e.jsx(pr,{children:"✓"})}),u.type==="image"?e.jsx(Ke,{src:u.url,thumbnailSrc:u.thumbnailUrl,alt:`Album image ${x+1}`,loadFullResolution:D[x]||!1,onFullResolutionLoaded:()=>it(x),onClick:()=>A?void 0:pe(x),showWatermark:P}):e.jsx(fr,{thumbnailUrl:u.thumbnailUrl||"",videoUrl:u.url,duration:u.duration||"0:00",index:x,onFullResolutionLoaded:()=>it(x),onClick:()=>A?void 0:pe(x),showWatermark:P}),C&&e.jsx(er,{children:C})]},x)}):e.jsx("div",{style:{gridColumn:"1 / -1",textAlign:"center",padding:"40px 0"},children:e.jsx(Ne,{children:t("Enter the password to view album contents")})})})]}),e.jsx(Pr,{isOpen:T,onClose:()=>{w(!1),j(null),ce&&ee(!1)},onSubmit:Wt,error:b,t}),e.jsx(Tr,{isOpen:de,onClose:()=>{Z(!1),ce&&ee(!1)},onLoginSuccess:Jt,t}),e.jsx(mo,{onFileSelection:Kt,ref:W}),E!==null&&r&&e.jsx(hr,{item:r.mediaItems[E],index:E,onClose:Ht,onPrev:qt,onNext:Qt,hasNext:E<r.mediaItems.length-1,hasPrev:E>0,albumName:r.folderName,showWatermark:rt()}),zt&&e.jsx(Co,{children:e.jsxs(So,{isRTL:Ae(h)==="rtl",children:[e.jsx(Po,{children:t("Enter Username")}),e.jsx(Io,{children:t("Username should contain only letters, numbers and hyphens. Example: john-doe2")}),e.jsx(To,{value:ie,onChange:u=>Ie(u.target.value),isRTL:Ae(h)==="rtl"}),tt&&e.jsx(ko,{children:tt}),e.jsx(Eo,{disabled:ot,onClick:()=>{if(!Yt(ie)){ue(t("Username must contain only letters, numbers, and hyphens."));return}at(ie)},children:t("Select Username")}),Ut&&e.jsx(jo,{disabled:ot,onClick:Zt,children:t("Add Random Digits to Username")})]})})]})},Er=()=>e.jsx(co,{children:e.jsx(kr,{})});lo.createRoot(document.getElementById("root")).render(e.jsx(Er,{}));
