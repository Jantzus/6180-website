import{c as Wt,d as Ht,a as He,S as et,r as w,u as ve,j as e,e as qt,f as Ct,A as Qt,C as Ie,R as Gt,I as Vt,g as Kt,b as tt}from"./config-C81kv4lT.js";import{c as re,e as Jt,h as Yt,i as Xt,b as ot,g as Zt}from"./utils-BvimWbmh.js";import{F as eo,d as to}from"./fileOperations-BKyaGLwT.js";import{u as je,c as oo,a as ro,p as no}from"./file-upload-utils-CwNVKzun.js";import{d as S,l as $,f as io}from"./styled-components.browser.esm-DAVmpCtn.js";import{C as so,S as ao,I as lo,R as co}from"./SignUpCommand-5ZAYfGgq.js";import"./index-DFUfgcbK.js";import"./parseJsonBody-Cin9RETb.js";const rt=`
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
`,nt=(t,u)=>{var m,g,x,I,b;const a=((g=(m=t==null?void 0:t.data)==null?void 0:m.fetchRelations)==null?void 0:g.items)||[],c=[],r={};let i="Photos",d="",s,n=!1,o=!1,f,p=!1;const l=new Set;if(a.length>0){const y=a[0];u&&(y!=null&&y.id)&&u(y.id),y!=null&&y.folderName&&y.folderName.length>0&&(i=y.folderName),y!=null&&y.folderDescription&&y.folderDescription.length>0&&(d=y.folderDescription),y!=null&&y.folderPassword&&(y.folderPassword.policy&&(s=y.folderPassword.policy,n=s!=="NoPassword"),y.folderPassword.password&&s!=="NoPassword"&&(o=!0,f=y.folderPassword.password)),y!=null&&y.folderInviteParameters&&(p=!!y.folderInviteParameters.usingFolderInviteGrantsRightToAddItems),(((I=(x=a[0])==null?void 0:x.contactsUsingInvite)==null?void 0:I.items)||[]).forEach(R=>{var D;R!=null&&R.id&&((D=R==null?void 0:R.item)!=null&&D.publicDisplayName)&&(r[R.id]=R.item.publicDisplayName)}),(((b=y==null?void 0:y.fileReferencesPage)==null?void 0:b.items)||[]).forEach(R=>{const D=R==null?void 0:R.file;if(!(D!=null&&D.dataKey))return;const{id:O,dataKey:T,thumbnailDataKey:L,durationInSeconds:k,ownerContactId:M}=D;if(l.has(T))return;l.add(T);const _=`${et}${T}`,N=L?`${et}${L}`:void 0;T.startsWith("Input/Image/")?c.push({type:"image",fileId:O,url:_,thumbnailUrl:N||_,ownerId:M,loaded:!1}):T.startsWith("Input/Video/")&&c.push({type:"video",fileId:O,url:_,thumbnailUrl:N||_,duration:Jt(k),ownerId:M,loaded:!1})})}return{mediaItems:c,folderName:i,folderDescription:d,contacts:r,passwordPolicy:s,passwordRequired:n,hasPassword:o,actualPassword:f,usingFolderInviteGrantsRightToAddItems:p}},uo=async(t,u)=>{var a,c,r,i,d;try{const n={fetchRelationsInput:{targetItemIdentifier____RelationType:`${t}____Folder`,index:"targetItemIdentifier____RelationType",limit:1,scanIndexForward:!1,nextToken:null}},o=fetch(Wt,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":Ht},body:JSON.stringify({query:rt,variables:n})}).then(g=>g.json()),f=(async()=>{const g=await re();return g?fetch(He,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${g}`},body:JSON.stringify({query:rt,variables:n})}).then(x=>x.json()):null})(),p=await o;let l=nt(p,u);const m=await f;if(m){const g=(d=(i=(r=(c=(a=m==null?void 0:m.data)==null?void 0:a.fetchRelations)==null?void 0:c.items)==null?void 0:r[0])==null?void 0:i.folderPosition)==null?void 0:d.id,x=nt(m,u);g&&(l=x)}return l}catch(s){return console.error("Error fetching folder data:",s),null}},po=S.div`
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
`,fo=S.div`
  position: sticky;
  top: 0;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0,0,0,0.06);
  z-index: 10;
  margin-bottom: 10px;
  width: 100%;
`,ho=S.div`
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  
  @media (max-width: 767px) {
    padding: 16px 16px;
  }
`,go=S.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 5px;
  gap: 10px;
  flex-wrap: wrap;
`,mo=S.button`
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
`,xo=S.div`
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
`,vo=S.button`
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
`,yo=S.span`
  width: 18px;
  height: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`,Te=S.span`
  height: 2px;
  background: #006adc;
  width: 100%;
`,bo=S.div`
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
`,Ee=S.button`
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
`,wo=S.h2`
  font-weight: 400;
  margin: 0 0 16px 0;
  font-size: 24px;
  padding: 0;
  
  @media (max-width: 767px) {
    padding: 0;
  }
`,Co=S.strong`
  font-weight: 700;
`,So=S.div`
  padding: 0 24px 20px;
  width: 100%;
  overflow: visible; // Allow content to flow naturally
  
  @media (max-width: 767px) {
    padding: 0 16px 15px;
    width: 100%;
  }
`,Po=S.div`
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 20px;
`,Io=S.p`
  margin: 0;
`,jo=S.div`
  display: grid;
  grid-gap: 20px;
  width: 100%;
  min-height: 0; // Allow proper sizing
  
  ${t=>{switch(t.columns){case"1":return $`grid-template-columns: repeat(1, 1fr);`;case"2":return $`grid-template-columns: repeat(2, 1fr);`;case"3":return $`grid-template-columns: repeat(3, 1fr);`;case"4":return $`grid-template-columns: repeat(4, 1fr);`;case"5":return $`grid-template-columns: repeat(5, 1fr);`;default:return $`grid-template-columns: repeat(1, 1fr);`}}}
  
  @media (max-width: 767px) {
    grid-gap: 8px;
    ${t=>{const u=parseInt(t.columns);return u>3?$`grid-template-columns: repeat(3, minmax(0, 1fr));`:u>1?$`grid-template-columns: repeat(${u}, minmax(0, 1fr));`:$`grid-template-columns: repeat(1, minmax(0, 1fr));`}}
  }
`,To=S.div`
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
`,Eo=S.div`
  position: relative;
  overflow: hidden;
  background-color: #f0f0f0;
  width: 100%;
  padding-bottom: 75%; // Create a consistent aspect ratio (4:3)
  height: 0; // Use padding-bottom for aspect ratio
  
  @media (max-width: 767px) {
    padding-bottom: 100%; // Square aspect ratio on mobile
  }
`,it=S.div`
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
`,Ro=S.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  transition: opacity 0.3s;
  opacity: ${t=>t.isLoaded?1:0};
`,ko=S.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading-animation 1.5s infinite;
  z-index: 0;
`,Ao=S.div`
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
`,Lo=S.div`
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
`,_o=S.div`
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
`,Re=S.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #d32f2f;
  grid-column: 1 / -1;
  width: 100%;
`,Bo=S.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
  grid-column: 1 / -1;
  width: 100%;
`,Do=S.label`
  margin-right: 8px;
  font-size: 14px;
  color: #555;
  font-weight: normal;
`,No=S.select`
  padding: 5px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  font-size: 14px;
  min-width: 50px;
`,zo=S.div`
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
`,Oo=S.div`
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
`;const St=S.div`
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
`;const Mo=io`
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
`,Uo=S(go)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  
  > div {
    width: auto;
    display: flex;
    align-items: center;
  }
`;S(To)`
  ${t=>t.isSelected&&`
    border: 3px solid #006adc;
    box-shadow: 0 0 0 3px rgba(0, 106, 220, 0.3);
  `}
`;const Fo=S.div`
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
`,$o=S.div`
  padding: 10px 20px;
  background-color: #f0f7ff;
  border-radius: 4px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`,Wo=S.div`
  color: white;
  font-size: 14px;
  font-weight: bold;
`,me=S.div`
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
`,xe=S.div`
  color: white;
  font-size: 24px;
  font-weight: bold;
  transform: rotate(-30deg);
  opacity: 0.7;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
  user-select: none;
  white-space: nowrap;
`,st=S(V)`
  background-color: #4caf50;
  color: white;
  &:hover {
    background-color: #45a049;
  }
`,We=({src:t,thumbnailSrc:u,alt:a,className:c="",loadFullResolution:r=!1,onFullResolutionLoaded:i,onClick:d,showWatermark:s=!1})=>{const[n,o]=w.useState(!1),[f,p]=w.useState(!1),[l,m]=w.useState(!1),[g,x]=w.useState("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E"),{t:I}=ve();return w.useEffect(()=>{if(u){const b=new Image;b.src=u,b.onload=()=>{x(u),o(!0)}}},[u]),w.useEffect(()=>{if(r&&!f){m(!0);const b=new Image;b.src=t,b.onload=()=>{x(t),p(!0),m(!1),i&&i()}}},[r,t,f,i]),e.jsxs(Eo,{onClick:d,children:[e.jsx(Ro,{src:g,alt:a,className:c,isLoaded:n,style:{cursor:d?"pointer":"default"}}),!n&&e.jsx(ko,{}),l&&e.jsx(St,{children:I("Loading full resolution...")}),s&&n&&e.jsx(me,{children:e.jsx(xe,{children:"6180 Watermarked"})})]})},Ho=({thumbnailUrl:t,videoUrl:u,duration:a,index:c,onFullResolutionLoaded:r,onClick:i,showWatermark:d=!1})=>{const[s,n]=w.useState(!1),[o,f]=w.useState(!1),[p,l]=w.useState(!1),m=qt.useRef(null),{t:g}=ve(),x=()=>{if(i){i();return}p?n(!0):f(!0)},I=()=>{l(!0),n(!0),r&&r()};return w.useEffect(()=>{if(o&&m.current&&!p){const b=m.current,y=()=>{I(),b.removeEventListener("canplaythrough",y)};return b.addEventListener("canplaythrough",y),b.load(),()=>{b.removeEventListener("canplaythrough",y)}}},[o,p]),s?e.jsxs("div",{style:{position:"relative",width:"100%",height:"100%"},children:[e.jsxs("video",{ref:m,controls:!0,style:{width:"100%",height:"100%"},children:[e.jsx("source",{src:u,type:"video/mp4"}),g("Your browser does not support the video tag.")]}),d&&e.jsx(me,{children:e.jsx(xe,{children:"6180 Watermarked"})})]}):o&&!p?e.jsxs(it,{children:[e.jsx(We,{src:u,thumbnailSrc:t,alt:`Video thumbnail ${c+1}`,showWatermark:d}),e.jsx(St,{children:g("Loading video...")}),e.jsx("video",{ref:m,style:{display:"none"},preload:"auto",children:e.jsx("source",{src:u,type:"video/mp4"})})]}):e.jsxs(it,{onClick:x,children:[e.jsx(We,{src:u,thumbnailSrc:t,alt:`Video thumbnail ${c+1}`,showWatermark:d}),e.jsx(Lo,{}),e.jsx(_o,{children:a})]})},qo=({item:t,index:u,onClose:a,onPrev:c,onNext:r,hasNext:i,hasPrev:d,albumName:s,showWatermark:n=!1})=>{const[o,f]=w.useState(!1),[p,l]=w.useState(!0),{t:m}=ve();return w.useEffect(()=>{const g=x=>{x.key==="Escape"?a():x.key==="ArrowLeft"&&d?c():x.key==="ArrowRight"&&i&&r()};return window.addEventListener("keydown",g),()=>window.removeEventListener("keydown",g)},[a,r,c,i,d]),e.jsxs("div",{style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",backgroundColor:"rgba(0, 0, 0, 0.9)",zIndex:2e3,display:"flex",flexDirection:"column"},children:[e.jsxs("div",{style:{padding:"15px",display:"flex",justifyContent:"space-between",alignItems:"center",backgroundColor:"rgba(0, 0, 0, 0.7)"},children:[e.jsx("button",{style:{background:"transparent",border:"none",color:"white",fontSize:"16px",padding:"5px 10px",cursor:"pointer"},onClick:a,children:m("Back")}),e.jsxs("div",{style:{display:"flex",gap:"10px"},children:[e.jsx("button",{style:{background:"transparent",border:"none",color:"white",fontSize:"16px",padding:"5px 10px",cursor:d?"pointer":"not-allowed",opacity:d?1:.5},onClick:d?c:void 0,disabled:!d,children:"←"}),e.jsx("button",{style:{background:"transparent",border:"none",color:"white",fontSize:"16px",padding:"5px 10px",cursor:i?"pointer":"not-allowed",opacity:i?1:.5},onClick:i?r:void 0,disabled:!i,children:"→"})]})]}),e.jsxs("div",{style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",overflow:"auto",padding:"10px",position:"relative"},children:[t.type==="image"?e.jsxs("div",{style:{position:"relative"},children:[e.jsx("img",{src:t.url,alt:`Image ${u+1}`,style:{maxWidth:"100%",maxHeight:"100%",objectFit:"contain",opacity:o?1:0,transition:"opacity 0.3s"},onLoad:()=>{f(!0),l(!1)}}),n&&e.jsx(me,{children:e.jsx(xe,{children:"6180 Watermarked"})}),!o&&t.thumbnailUrl&&e.jsx("img",{src:t.thumbnailUrl,alt:`Thumbnail ${u+1}`,style:{position:"absolute",maxWidth:"100%",maxHeight:"100%",objectFit:"contain",opacity:.5}})]}):e.jsxs("div",{style:{position:"relative"},children:[e.jsxs("video",{controls:!0,autoPlay:!0,style:{maxWidth:"100%",maxHeight:"100%"},onLoadedData:()=>l(!1),children:[e.jsx("source",{src:t.url,type:"video/mp4"}),m("Your browser does not support the video tag.")]}),n&&e.jsx(me,{children:e.jsx(xe,{children:"6180 Watermarked"})})]}),p&&e.jsx("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",backgroundColor:"rgba(0, 0, 0, 0.7)",color:"white",padding:"10px 20px",borderRadius:"4px",zIndex:10},children:t.type==="image"?m("Loading full resolution..."):m("Loading video...")})]}),e.jsx("div",{style:{padding:"15px",display:"flex",justifyContent:"center",backgroundColor:"rgba(0, 0, 0, 0.7)",color:"white"},children:e.jsx("a",{href:t.url,download:`${s}-${u+1}.${t.type==="image"?"jpg":"mp4"}`,style:{textDecoration:"none",color:"white",backgroundColor:"#006adc",padding:"8px 16px",borderRadius:"4px",fontSize:"14px"},children:t.type==="image"?m("Download Photo"):m("Download Video")})})]})};var oe={},ke={exports:{}},Ae,at;function Qo(){if(at)return Ae;at=1;var t="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Ae=t,Ae}var Le,lt;function Go(){if(lt)return Le;lt=1;var t=Qo();function u(){}function a(){}return a.resetWarningCache=u,Le=function(){function c(d,s,n,o,f,p){if(p!==t){var l=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw l.name="Invariant Violation",l}}c.isRequired=c;function r(){return c}var i={array:c,bigint:c,bool:c,func:c,number:c,object:c,string:c,symbol:c,any:c,arrayOf:r,element:c,elementType:c,instanceOf:r,node:c,objectOf:r,oneOf:r,oneOfType:r,shape:r,exact:r,checkPropTypes:a,resetWarningCache:u};return i.PropTypes=i,i},Le}var dt;function Pt(){return dt||(dt=1,ke.exports=Go()()),ke.exports}var _e,ct;function It(){return ct||(ct=1,_e={L:1,M:0,Q:3,H:2}),_e}var Be,ut;function jt(){return ut||(ut=1,Be={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8}),Be}var De,pt;function Vo(){if(pt)return De;pt=1;var t=jt();function u(a){this.mode=t.MODE_8BIT_BYTE,this.data=a}return u.prototype={getLength:function(a){return this.data.length},write:function(a){for(var c=0;c<this.data.length;c++)a.put(this.data.charCodeAt(c),8)}},De=u,De}var Ne,ft;function Ko(){if(ft)return Ne;ft=1;var t=It();function u(a,c){this.totalCount=a,this.dataCount=c}return u.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],u.getRSBlocks=function(a,c){var r=u.getRsBlockTable(a,c);if(r==null)throw new Error("bad rs block @ typeNumber:"+a+"/errorCorrectLevel:"+c);for(var i=r.length/3,d=new Array,s=0;s<i;s++)for(var n=r[s*3+0],o=r[s*3+1],f=r[s*3+2],p=0;p<n;p++)d.push(new u(o,f));return d},u.getRsBlockTable=function(a,c){switch(c){case t.L:return u.RS_BLOCK_TABLE[(a-1)*4+0];case t.M:return u.RS_BLOCK_TABLE[(a-1)*4+1];case t.Q:return u.RS_BLOCK_TABLE[(a-1)*4+2];case t.H:return u.RS_BLOCK_TABLE[(a-1)*4+3];default:return}},Ne=u,Ne}var ze,ht;function Jo(){if(ht)return ze;ht=1;function t(){this.buffer=new Array,this.length=0}return t.prototype={get:function(u){var a=Math.floor(u/8);return(this.buffer[a]>>>7-u%8&1)==1},put:function(u,a){for(var c=0;c<a;c++)this.putBit((u>>>a-c-1&1)==1)},getLengthInBits:function(){return this.length},putBit:function(u){var a=Math.floor(this.length/8);this.buffer.length<=a&&this.buffer.push(0),u&&(this.buffer[a]|=128>>>this.length%8),this.length++}},ze=t,ze}var Oe,gt;function Tt(){if(gt)return Oe;gt=1;for(var t={glog:function(a){if(a<1)throw new Error("glog("+a+")");return t.LOG_TABLE[a]},gexp:function(a){for(;a<0;)a+=255;for(;a>=256;)a-=255;return t.EXP_TABLE[a]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},u=0;u<8;u++)t.EXP_TABLE[u]=1<<u;for(var u=8;u<256;u++)t.EXP_TABLE[u]=t.EXP_TABLE[u-4]^t.EXP_TABLE[u-5]^t.EXP_TABLE[u-6]^t.EXP_TABLE[u-8];for(var u=0;u<255;u++)t.LOG_TABLE[t.EXP_TABLE[u]]=u;return Oe=t,Oe}var Me,mt;function Et(){if(mt)return Me;mt=1;var t=Tt();function u(a,c){if(a.length==null)throw new Error(a.length+"/"+c);for(var r=0;r<a.length&&a[r]==0;)r++;this.num=new Array(a.length-r+c);for(var i=0;i<a.length-r;i++)this.num[i]=a[i+r]}return u.prototype={get:function(a){return this.num[a]},getLength:function(){return this.num.length},multiply:function(a){for(var c=new Array(this.getLength()+a.getLength()-1),r=0;r<this.getLength();r++)for(var i=0;i<a.getLength();i++)c[r+i]^=t.gexp(t.glog(this.get(r))+t.glog(a.get(i)));return new u(c,0)},mod:function(a){if(this.getLength()-a.getLength()<0)return this;for(var c=t.glog(this.get(0))-t.glog(a.get(0)),r=new Array(this.getLength()),i=0;i<this.getLength();i++)r[i]=this.get(i);for(var i=0;i<a.getLength();i++)r[i]^=t.gexp(t.glog(a.get(i))+c);return new u(r,0).mod(a)}},Me=u,Me}var Ue,xt;function Yo(){if(xt)return Ue;xt=1;var t=jt(),u=Et(),a=Tt(),c={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},r={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(i){for(var d=i<<10;r.getBCHDigit(d)-r.getBCHDigit(r.G15)>=0;)d^=r.G15<<r.getBCHDigit(d)-r.getBCHDigit(r.G15);return(i<<10|d)^r.G15_MASK},getBCHTypeNumber:function(i){for(var d=i<<12;r.getBCHDigit(d)-r.getBCHDigit(r.G18)>=0;)d^=r.G18<<r.getBCHDigit(d)-r.getBCHDigit(r.G18);return i<<12|d},getBCHDigit:function(i){for(var d=0;i!=0;)d++,i>>>=1;return d},getPatternPosition:function(i){return r.PATTERN_POSITION_TABLE[i-1]},getMask:function(i,d,s){switch(i){case c.PATTERN000:return(d+s)%2==0;case c.PATTERN001:return d%2==0;case c.PATTERN010:return s%3==0;case c.PATTERN011:return(d+s)%3==0;case c.PATTERN100:return(Math.floor(d/2)+Math.floor(s/3))%2==0;case c.PATTERN101:return d*s%2+d*s%3==0;case c.PATTERN110:return(d*s%2+d*s%3)%2==0;case c.PATTERN111:return(d*s%3+(d+s)%2)%2==0;default:throw new Error("bad maskPattern:"+i)}},getErrorCorrectPolynomial:function(i){for(var d=new u([1],0),s=0;s<i;s++)d=d.multiply(new u([1,a.gexp(s)],0));return d},getLengthInBits:function(i,d){if(1<=d&&d<10)switch(i){case t.MODE_NUMBER:return 10;case t.MODE_ALPHA_NUM:return 9;case t.MODE_8BIT_BYTE:return 8;case t.MODE_KANJI:return 8;default:throw new Error("mode:"+i)}else if(d<27)switch(i){case t.MODE_NUMBER:return 12;case t.MODE_ALPHA_NUM:return 11;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 10;default:throw new Error("mode:"+i)}else if(d<41)switch(i){case t.MODE_NUMBER:return 14;case t.MODE_ALPHA_NUM:return 13;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 12;default:throw new Error("mode:"+i)}else throw new Error("type:"+d)},getLostPoint:function(i){for(var d=i.getModuleCount(),s=0,n=0;n<d;n++)for(var o=0;o<d;o++){for(var f=0,p=i.isDark(n,o),l=-1;l<=1;l++)if(!(n+l<0||d<=n+l))for(var m=-1;m<=1;m++)o+m<0||d<=o+m||l==0&&m==0||p==i.isDark(n+l,o+m)&&f++;f>5&&(s+=3+f-5)}for(var n=0;n<d-1;n++)for(var o=0;o<d-1;o++){var g=0;i.isDark(n,o)&&g++,i.isDark(n+1,o)&&g++,i.isDark(n,o+1)&&g++,i.isDark(n+1,o+1)&&g++,(g==0||g==4)&&(s+=3)}for(var n=0;n<d;n++)for(var o=0;o<d-6;o++)i.isDark(n,o)&&!i.isDark(n,o+1)&&i.isDark(n,o+2)&&i.isDark(n,o+3)&&i.isDark(n,o+4)&&!i.isDark(n,o+5)&&i.isDark(n,o+6)&&(s+=40);for(var o=0;o<d;o++)for(var n=0;n<d-6;n++)i.isDark(n,o)&&!i.isDark(n+1,o)&&i.isDark(n+2,o)&&i.isDark(n+3,o)&&i.isDark(n+4,o)&&!i.isDark(n+5,o)&&i.isDark(n+6,o)&&(s+=40);for(var x=0,o=0;o<d;o++)for(var n=0;n<d;n++)i.isDark(n,o)&&x++;var I=Math.abs(100*x/d/d-50)/5;return s+=I*10,s}};return Ue=r,Ue}var Fe,vt;function Xo(){if(vt)return Fe;vt=1;var t=Vo(),u=Ko(),a=Jo(),c=Yo(),r=Et();function i(s,n){this.typeNumber=s,this.errorCorrectLevel=n,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}var d=i.prototype;return d.addData=function(s){var n=new t(s);this.dataList.push(n),this.dataCache=null},d.isDark=function(s,n){if(s<0||this.moduleCount<=s||n<0||this.moduleCount<=n)throw new Error(s+","+n);return this.modules[s][n]},d.getModuleCount=function(){return this.moduleCount},d.make=function(){if(this.typeNumber<1){var s=1;for(s=1;s<40;s++){for(var n=u.getRSBlocks(s,this.errorCorrectLevel),o=new a,f=0,p=0;p<n.length;p++)f+=n[p].dataCount;for(var p=0;p<this.dataList.length;p++){var l=this.dataList[p];o.put(l.mode,4),o.put(l.getLength(),c.getLengthInBits(l.mode,s)),l.write(o)}if(o.getLengthInBits()<=f*8)break}this.typeNumber=s}this.makeImpl(!1,this.getBestMaskPattern())},d.makeImpl=function(s,n){this.moduleCount=this.typeNumber*4+17,this.modules=new Array(this.moduleCount);for(var o=0;o<this.moduleCount;o++){this.modules[o]=new Array(this.moduleCount);for(var f=0;f<this.moduleCount;f++)this.modules[o][f]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(s,n),this.typeNumber>=7&&this.setupTypeNumber(s),this.dataCache==null&&(this.dataCache=i.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,n)},d.setupPositionProbePattern=function(s,n){for(var o=-1;o<=7;o++)if(!(s+o<=-1||this.moduleCount<=s+o))for(var f=-1;f<=7;f++)n+f<=-1||this.moduleCount<=n+f||(0<=o&&o<=6&&(f==0||f==6)||0<=f&&f<=6&&(o==0||o==6)||2<=o&&o<=4&&2<=f&&f<=4?this.modules[s+o][n+f]=!0:this.modules[s+o][n+f]=!1)},d.getBestMaskPattern=function(){for(var s=0,n=0,o=0;o<8;o++){this.makeImpl(!0,o);var f=c.getLostPoint(this);(o==0||s>f)&&(s=f,n=o)}return n},d.createMovieClip=function(s,n,o){var f=s.createEmptyMovieClip(n,o),p=1;this.make();for(var l=0;l<this.modules.length;l++)for(var m=l*p,g=0;g<this.modules[l].length;g++){var x=g*p,I=this.modules[l][g];I&&(f.beginFill(0,100),f.moveTo(x,m),f.lineTo(x+p,m),f.lineTo(x+p,m+p),f.lineTo(x,m+p),f.endFill())}return f},d.setupTimingPattern=function(){for(var s=8;s<this.moduleCount-8;s++)this.modules[s][6]==null&&(this.modules[s][6]=s%2==0);for(var n=8;n<this.moduleCount-8;n++)this.modules[6][n]==null&&(this.modules[6][n]=n%2==0)},d.setupPositionAdjustPattern=function(){for(var s=c.getPatternPosition(this.typeNumber),n=0;n<s.length;n++)for(var o=0;o<s.length;o++){var f=s[n],p=s[o];if(this.modules[f][p]==null)for(var l=-2;l<=2;l++)for(var m=-2;m<=2;m++)l==-2||l==2||m==-2||m==2||l==0&&m==0?this.modules[f+l][p+m]=!0:this.modules[f+l][p+m]=!1}},d.setupTypeNumber=function(s){for(var n=c.getBCHTypeNumber(this.typeNumber),o=0;o<18;o++){var f=!s&&(n>>o&1)==1;this.modules[Math.floor(o/3)][o%3+this.moduleCount-8-3]=f}for(var o=0;o<18;o++){var f=!s&&(n>>o&1)==1;this.modules[o%3+this.moduleCount-8-3][Math.floor(o/3)]=f}},d.setupTypeInfo=function(s,n){for(var o=this.errorCorrectLevel<<3|n,f=c.getBCHTypeInfo(o),p=0;p<15;p++){var l=!s&&(f>>p&1)==1;p<6?this.modules[p][8]=l:p<8?this.modules[p+1][8]=l:this.modules[this.moduleCount-15+p][8]=l}for(var p=0;p<15;p++){var l=!s&&(f>>p&1)==1;p<8?this.modules[8][this.moduleCount-p-1]=l:p<9?this.modules[8][15-p-1+1]=l:this.modules[8][15-p-1]=l}this.modules[this.moduleCount-8][8]=!s},d.mapData=function(s,n){for(var o=-1,f=this.moduleCount-1,p=7,l=0,m=this.moduleCount-1;m>0;m-=2)for(m==6&&m--;;){for(var g=0;g<2;g++)if(this.modules[f][m-g]==null){var x=!1;l<s.length&&(x=(s[l]>>>p&1)==1);var I=c.getMask(n,f,m-g);I&&(x=!x),this.modules[f][m-g]=x,p--,p==-1&&(l++,p=7)}if(f+=o,f<0||this.moduleCount<=f){f-=o,o=-o;break}}},i.PAD0=236,i.PAD1=17,i.createData=function(s,n,o){for(var f=u.getRSBlocks(s,n),p=new a,l=0;l<o.length;l++){var m=o[l];p.put(m.mode,4),p.put(m.getLength(),c.getLengthInBits(m.mode,s)),m.write(p)}for(var g=0,l=0;l<f.length;l++)g+=f[l].dataCount;if(p.getLengthInBits()>g*8)throw new Error("code length overflow. ("+p.getLengthInBits()+">"+g*8+")");for(p.getLengthInBits()+4<=g*8&&p.put(0,4);p.getLengthInBits()%8!=0;)p.putBit(!1);for(;!(p.getLengthInBits()>=g*8||(p.put(i.PAD0,8),p.getLengthInBits()>=g*8));)p.put(i.PAD1,8);return i.createBytes(p,f)},i.createBytes=function(s,n){for(var o=0,f=0,p=0,l=new Array(n.length),m=new Array(n.length),g=0;g<n.length;g++){var x=n[g].dataCount,I=n[g].totalCount-x;f=Math.max(f,x),p=Math.max(p,I),l[g]=new Array(x);for(var b=0;b<l[g].length;b++)l[g][b]=255&s.buffer[b+o];o+=x;var y=c.getErrorCorrectPolynomial(I),R=new r(l[g],y.getLength()-1),D=R.mod(y);m[g]=new Array(y.getLength()-1);for(var b=0;b<m[g].length;b++){var O=b+D.getLength()-m[g].length;m[g][b]=O>=0?D.get(O):0}}for(var T=0,b=0;b<n.length;b++)T+=n[b].totalCount;for(var L=new Array(T),k=0,b=0;b<f;b++)for(var g=0;g<n.length;g++)b<l[g].length&&(L[k++]=l[g][b]);for(var b=0;b<p;b++)for(var g=0;g<n.length;g++)b<m[g].length&&(L[k++]=m[g][b]);return L},Fe=i,Fe}var ge={},yt;function Zo(){if(yt)return ge;yt=1,Object.defineProperty(ge,"__esModule",{value:!0});var t=Object.assign||function(o){for(var f=1;f<arguments.length;f++){var p=arguments[f];for(var l in p)Object.prototype.hasOwnProperty.call(p,l)&&(o[l]=p[l])}return o},u=Pt(),a=i(u),c=Ct(),r=i(c);function i(o){return o&&o.__esModule?o:{default:o}}function d(o,f){var p={};for(var l in o)f.indexOf(l)>=0||Object.prototype.hasOwnProperty.call(o,l)&&(p[l]=o[l]);return p}var s={bgColor:a.default.oneOfType([a.default.object,a.default.string]).isRequired,bgD:a.default.string.isRequired,fgColor:a.default.oneOfType([a.default.object,a.default.string]).isRequired,fgD:a.default.string.isRequired,size:a.default.number.isRequired,title:a.default.string,viewBoxSize:a.default.number.isRequired,xmlns:a.default.string},n=(0,c.forwardRef)(function(o,f){var p=o.bgColor,l=o.bgD,m=o.fgD,g=o.fgColor,x=o.size,I=o.title,b=o.viewBoxSize,y=o.xmlns,R=y===void 0?"http://www.w3.org/2000/svg":y,D=d(o,["bgColor","bgD","fgD","fgColor","size","title","viewBoxSize","xmlns"]);return r.default.createElement("svg",t({},D,{height:x,ref:f,viewBox:"0 0 "+b+" "+b,width:x,xmlns:R}),I?r.default.createElement("title",null,I):null,r.default.createElement("path",{d:l,fill:p}),r.default.createElement("path",{d:m,fill:g}))});return n.displayName="QRCodeSvg",n.propTypes=s,ge.default=n,ge}var bt;function er(){if(bt)return oe;bt=1,Object.defineProperty(oe,"__esModule",{value:!0}),oe.QRCode=void 0;var t=Object.assign||function(x){for(var I=1;I<arguments.length;I++){var b=arguments[I];for(var y in b)Object.prototype.hasOwnProperty.call(b,y)&&(x[y]=b[y])}return x},u=Pt(),a=p(u),c=It(),r=p(c),i=Xo(),d=p(i),s=Ct(),n=p(s),o=Zo(),f=p(o);function p(x){return x&&x.__esModule?x:{default:x}}function l(x,I){var b={};for(var y in x)I.indexOf(y)>=0||Object.prototype.hasOwnProperty.call(x,y)&&(b[y]=x[y]);return b}var m={bgColor:a.default.oneOfType([a.default.object,a.default.string]),fgColor:a.default.oneOfType([a.default.object,a.default.string]),level:a.default.string,size:a.default.number,value:a.default.string.isRequired},g=(0,s.forwardRef)(function(x,I){var b=x.bgColor,y=b===void 0?"#FFFFFF":b,R=x.fgColor,D=R===void 0?"#000000":R,O=x.level,T=O===void 0?"L":O,L=x.size,k=L===void 0?256:L,M=x.value,_=l(x,["bgColor","fgColor","level","size","value"]),N=new d.default(-1,r.default[T]);N.addData(M),N.make();var W=N.modules;return n.default.createElement(f.default,t({},_,{bgColor:y,bgD:W.map(function(z,K){return z.map(function(H,q){return H?"":"M "+q+" "+K+" l 1 0 0 1 -1 0 Z"}).join(" ")}).join(" "),fgColor:D,fgD:W.map(function(z,K){return z.map(function(H,q){return H?"M "+q+" "+K+" l 1 0 0 1 -1 0 Z":""}).join(" ")}).join(" "),ref:I,size:k,viewBoxSize:W.length}))});return oe.QRCode=g,g.displayName="QRCode",g.propTypes=m,oe.default=g,oe}er();const tr=({isOpen:t,onClose:u,onSubmit:a,error:c,t:r})=>{const[i,d]=w.useState(""),[s,n]=w.useState(!1);if(!t)return null;const o=f=>{f.preventDefault(),n(!0),a(i),n(!1)};return e.jsx(zo,{children:e.jsx(Oo,{style:{maxWidth:"400px"},children:e.jsxs("div",{style:{padding:"20px"},children:[e.jsx("h3",{style:{margin:"0 0 20px 0",textAlign:"center"},children:r("Enter Password")}),e.jsxs("form",{onSubmit:o,children:[e.jsxs("div",{style:{marginBottom:"20px"},children:[e.jsx("input",{type:"password",value:i,onChange:f=>d(f.target.value),placeholder:r("Password"),style:{width:"100%",padding:"10px",borderRadius:"4px",border:c?"1px solid #d32f2f":"1px solid #ccc",fontSize:"16px"},required:!0}),c&&e.jsx("div",{style:{color:"#d32f2f",fontSize:"14px",marginTop:"5px",padding:"5px"},children:c})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[e.jsx("button",{type:"button",onClick:u,style:{padding:"10px 16px",backgroundColor:"#f3f4f6",border:"none",borderRadius:"4px",cursor:"pointer",fontSize:"14px"},children:r("Cancel")}),e.jsx("button",{type:"submit",disabled:s||!i,style:{padding:"10px 16px",backgroundColor:"#006adc",color:"white",border:"none",borderRadius:"4px",cursor:i?"pointer":"not-allowed",opacity:i?1:.7,fontSize:"14px"},children:r(s?"Submitting...":"Submit")})]})]})]})})})},or=({addPhotosToAlbum:t,saveAlbum:u,promptForPassword:a,showingEnterPassword:c,passwordPolicy:r,usingFolderInviteGrantsRightToAddItems:i,t:d})=>{const[s,n]=w.useState(!1),[o,f]=w.useState(!1),p=w.useRef(null),l=840;w.useEffect(()=>{f(window.innerWidth<l);const I=()=>{f(window.innerWidth<l)};return window.addEventListener("resize",I),()=>window.removeEventListener("resize",I)},[]);const m=()=>{n(!s)},g=()=>{n(!1)},x=I=>{I(),g()};return w.useEffect(()=>{const I=y=>{p.current&&!p.current.contains(y.target)&&n(!1)},b=()=>{n(!1)};return s&&(document.addEventListener("mousedown",I),window.addEventListener("scroll",b)),()=>{document.removeEventListener("mousedown",I),window.removeEventListener("scroll",b)}},[s]),o?e.jsxs("div",{ref:p,style:{position:"relative",display:"flex",alignItems:"center",justifyContent:"flex-end",width:"100%",flexWrap:"nowrap"},children:[!c&&e.jsxs("div",{style:{flexShrink:0},children:[e.jsxs(vo,{onClick:m,"aria-label":d("Menu"),"aria-expanded":s,children:[e.jsxs(yo,{children:[e.jsx(Te,{}),e.jsx(Te,{}),e.jsx(Te,{})]}),d("Add")]}),s&&e.jsxs(bo,{children:[i&&e.jsx(Ee,{onClick:()=>x(t),children:d("Add Photos To Album")}),e.jsx(Ee,{onClick:()=>x(u),children:d("Save Album To 6180")}),e.jsx(Ee,{onClick:()=>x(u),children:d("Download Photos")})]})]}),c&&r&&r!=="NoPassword"&&e.jsx("div",{style:{flexShrink:0},children:e.jsx(st,{onClick:a,children:d("Enter Password")})})]}):e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"20px",justifyContent:"flex-end",flexWrap:"nowrap"},children:[!c&&e.jsxs("div",{style:{display:"flex",gap:"20px",flexWrap:"nowrap"},children:[i&&e.jsx(V,{onClick:t,children:d("Add Photos")}),e.jsx(V,{onClick:u,children:d("Save Album To 6180")}),e.jsx(V,{onClick:u,children:d("Download Photos")})]}),c&&e.jsx("div",{children:e.jsx(st,{onClick:a,children:d("Enter Password")})})]})},rr=({progressTracker:t,t:u,isRTL:a,style:c})=>t.totalFiles===0?null:e.jsxs("div",{style:{marginBottom:"24px",backgroundColor:"#fff",padding:"16px",borderRadius:"8px",boxShadow:"0 1px 3px rgba(0,0,0,0.1)",width:"100%",direction:a?"rtl":"ltr",boxSizing:"border-box",overflow:"hidden",...c},children:[e.jsx("h3",{style:{fontSize:"18px",margin:"0 0 12px 0"},children:u("Upload Progress")}),e.jsxs("div",{style:{marginBottom:"12px"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"14px",marginBottom:"6px"},children:[e.jsxs("span",{children:[u("Overall Progress"),": ",Math.round(t.overallProgress*100),"%"]}),e.jsxs("span",{children:[t.filesComplete," ",u("of")," ",t.totalFiles," ",u("complete")]})]}),e.jsx("div",{style:{height:"8px",backgroundColor:"#e0e0e0",borderRadius:"4px",overflow:"hidden"},children:e.jsx("div",{style:{height:"100%",width:`${t.overallProgress*100}%`,backgroundColor:"#4caf50",borderRadius:"4px",transition:"width 0.3s ease",float:a?"right":"left"}})})]}),e.jsxs("div",{style:{display:"flex",gap:"12px",fontSize:"14px",color:"#666",flexDirection:a?"row-reverse":"row",flexWrap:"wrap",overflow:"hidden"},children:[t.filesUploading>0&&e.jsxs("div",{children:["📤 ",u("Uploading"),": ",t.filesUploading]}),t.filesProcessing>0&&e.jsxs("div",{children:["⚙️ ",u("Processing"),": ",t.filesProcessing]}),t.filesComplete>0&&e.jsxs("div",{children:["✅ ",u("Complete"),": ",t.filesComplete]}),t.filesWithError>0&&e.jsxs("div",{style:{color:"#e53935"},children:["❌ ",u("Failed"),": ",t.filesWithError]})]})]}),$e=new so({region:Qt});function wt(t){const u=t.trim().toLowerCase(),a="@gmail.com";return u.endsWith(a)?`${u.slice(0,-a.length).replace(/\./g,"")}${a}`:u}const nr=({isOpen:t,onClose:u,onLoginSuccess:a,t:c})=>{const[r,i]=w.useState(""),[d,s]=w.useState(!1),[n,o]=w.useState(""),[f,p]=w.useState(""),[l,m]=w.useState("idle"),[g,x]=w.useState(""),I=w.useRef(null),b=w.useRef(null);w.useEffect(()=>{d&&b.current&&b.current.focus()},[d]),w.useEffect(()=>{t&&I.current&&!d&&I.current.focus()},[t,d]);function y(T){const L=T.target.value;/^\d*$/.test(L)&&L.length<=6&&o(L)}async function R(){var L;m("sending"),x("");const T=wt(r);if(!T||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(T)){m("error"),x(c("Please enter a valid email address"));return}try{const k=new ao({ClientId:Ie,Username:T,Password:crypto.randomUUID(),UserAttributes:[{Name:"email",Value:T}]});try{await $e.send(k)}catch(N){if(!((L=N.name)!=null&&L.includes("UsernameExistsException")))throw N}const M=new lo({ClientId:Ie,AuthFlow:"CUSTOM_AUTH",AuthParameters:{USERNAME:T}}),_=await $e.send(M);if(_.Session)p(_.Session),s(!0),m("idle");else throw new Error("No session returned from InitiateAuth")}catch(k){console.error(k),m("error"),x(c("Unable to send verification code. Please try again later."))}}async function D(){var L,k,M,_,N,W;m("verifying"),x("");const T=wt(r);try{const z=new co({ClientId:Ie,ChallengeName:"CUSTOM_CHALLENGE",ChallengeResponses:{USERNAME:T,ANSWER:n},Session:f}),H=(L=(await $e.send(z)).AuthenticationResult)==null?void 0:L.IdToken;if(!H)throw new Error("No token received");localStorage.setItem("idToken",H);const ae=`${JSON.parse(atob(H.split(".")[1]))["cognito:username"]}_____Public____Profile`,J=await(await fetch(He,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${H}`},body:JSON.stringify({query:`
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
          `,variables:{relationIds:[ae]}})})).json(),le=(W=(N=(_=(M=(k=J==null?void 0:J.data)==null?void 0:k.batchGetItems)==null?void 0:M.items)==null?void 0:_[0])==null?void 0:N.item)==null?void 0:W.anyDisplayName;le&&localStorage.setItem("publicUsername",le),m("idle"),a(),u()}catch(z){console.error(z),m("error"),x(c("Invalid or expired verification code. Please try again or request a new code."))}}function O(){s(!1),o(""),m("idle")}return t?e.jsx("div",{style:{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',backgroundColor:"rgba(0, 0, 0, 0.5)",position:"fixed",top:0,left:0,right:0,bottom:0,display:"flex",alignItems:"center",justifyContent:"center",zIndex:1e3},children:e.jsxs("div",{style:{maxWidth:400,width:"100%",background:"#ffffff",padding:"32px",borderRadius:"12px",boxShadow:"0 6px 20px rgba(0,0,0,0.06)",textAlign:"center"},children:[e.jsxs("div",{style:{marginBottom:"24px"},children:[e.jsx("img",{src:"images/logo_no_background.png",alt:"6180 Logo",style:{height:"60px",marginBottom:"16px"}}),e.jsx("h2",{style:{fontSize:"24px",fontWeight:600,color:"#333"},children:c("Sign in to 6180")})]}),g&&e.jsx("div",{style:{backgroundColor:"#f8d7da",color:"#721c24",padding:"10px",borderRadius:"6px",marginBottom:"16px",fontSize:"14px"},children:g}),d?e.jsxs(e.Fragment,{children:[e.jsxs("p",{style:{marginBottom:"16px",color:"#555"},children:[c("Check your email for a 6-digit verification code sent to")," ",e.jsx("strong",{children:r})]}),e.jsx("input",{ref:b,type:"tel",inputMode:"numeric",pattern:"[0-9]*",maxLength:6,value:n,onChange:y,placeholder:c("Enter 6-digit code"),style:{width:"100%",padding:"12px",marginBottom:"16px",borderRadius:"6px",border:"1px solid #ccc",fontSize:"16px",boxSizing:"border-box",letterSpacing:"2px",textAlign:"center"}}),e.jsx("button",{onClick:D,disabled:l==="verifying"||n.length!==6,style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#28a745",color:"#fff",border:"none",borderRadius:"6px",cursor:l==="verifying"||n.length!==6?"not-allowed":"pointer",opacity:l==="verifying"||n.length!==6?.7:1},children:c(l==="verifying"?"Verifying...":"Verify Code")}),e.jsxs("div",{style:{marginTop:"16px",fontSize:"14px",color:"#666",display:"flex",justifyContent:"center",gap:"8px"},children:[e.jsx("span",{children:c("Didn't receive a code?")}),e.jsx("button",{onClick:O,style:{background:"none",border:"none",color:"#007bff",padding:0,cursor:"pointer",fontSize:"14px",textDecoration:"underline"},children:c("Send new code")})]}),e.jsx("button",{onClick:u,style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#f8f9fa",color:"#555",border:"1px solid #ccc",borderRadius:"6px",cursor:"pointer",marginTop:"12px"},children:c("Cancel")})]}):e.jsxs(e.Fragment,{children:[e.jsx("input",{ref:I,type:"email",value:r,onChange:T=>i(T.target.value),placeholder:c("Enter your email"),style:{width:"100%",padding:"12px",marginBottom:"16px",borderRadius:"6px",border:"1px solid #ccc",fontSize:"16px",boxSizing:"border-box"}}),e.jsx("button",{onClick:R,disabled:l==="sending"||!r.trim(),style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#007bff",color:"#fff",border:"none",borderRadius:"6px",cursor:l==="sending"||!r.trim()?"not-allowed":"pointer",opacity:l==="sending"||!r.trim()?.7:1},children:c(l==="sending"?"Sending...":"Send Verification Code")}),e.jsx("p",{style:{fontSize:"13px",color:"#666",marginTop:"16px",textAlign:"center"},children:c("We'll send a secure verification code to your email")}),e.jsx("button",{onClick:u,style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#f8f9fa",color:"#555",border:"1px solid #ccc",borderRadius:"6px",cursor:"pointer",marginTop:"12px"},children:c("Cancel")})]})]})}):null},ir=()=>{const{t,language:u}=ve(),[a,c]=w.useState("1"),[r,i]=w.useState(null),[d,s]=w.useState(!0),[n,o]=w.useState(null),[f,p]=w.useState(null),[l,m]=w.useState(void 0),[g,x]=w.useState(!1),[I,b]=w.useState(!1),[y,R]=w.useState(null),[D,O]=w.useState({}),[T,L]=w.useState(null),[k,M]=w.useState(!1),[_,N]=w.useState(new Set),W=w.useRef(null),[z,K]=w.useState([]),[H,q]=w.useState(!1),[qe,ae]=w.useState(!1),[X,J]=w.useState({totalFiles:0,filesComplete:0,filesUploading:0,filesProcessing:0,filesWithError:0,overallProgress:0}),[le,Z]=w.useState(!1),[Rt,ye]=w.useState(!1),[Qe,ne]=w.useState(null),[Ge,be]=w.useState(!1),[de,ee]=w.useState(!1),Q=oo(()=>{});w.useEffect(()=>{je(z,J)},[z]),w.useEffect(()=>{if(Ge&&z.length>0){const h=z.filter(C=>C.status==="complete").length,v=z.filter(C=>C.status==="error").length;console.log(`Upload complete: ${h} successful, ${v} failed`),f?window.location.href=`/save-album.html?folderId=${encodeURIComponent(f)}`:window.location.href="/save-album.html"}},[Ge,z.length,f]);const kt=()=>!l||g||l==="NoPassword"?!0:l==="NotVisible"?(y&&console.error("Password error:",y),!1):!0,Ve=()=>{const h=(y==null?void 0:y.toLowerCase().includes("watermark"))??!1;return!g&&l==="Watermark"||h},Ke=()=>!g&&l!==void 0&&l!=="NoPassword",At=h=>{if(R(null),h.trim()===""){R(t("Password cannot be empty"));return}const v=r==null?void 0:r.actualPassword;if(!v)if(r!=null&&r.hasPassword){R(t("Unable to validate password. Please try again later."));return}else{x(!0),b(!1);return}if(h!==v){R(t("Invalid password. Please try again."));return}x(!0),b(!1),R(null),de&&(ee(!1),Ce())},Y=()=>{R(null),b(!0)},ce=h=>{if(!k){if(l==="NotVisible"&&!g){Y();return}L(h),we(h),document.body.style.overflow="hidden"}},Lt=()=>{L(null),document.body.style.overflow=""},_t=()=>{T!==null&&T>0&&(L(T-1),we(T-1))},Bt=()=>{T!==null&&r&&T<r.mediaItems.length-1&&(L(T+1),we(T+1))},we=h=>{O(v=>({...v,[h]:!0}))},Je=h=>{if(r){const v=[...r.mediaItems];v[h]={...v[h],loaded:!0},i({...r,mediaItems:v}),O(C=>{const j={...C};return delete j[h],j})}},Dt=h=>{c(h),localStorage.setItem("columns",h)},Ye=()=>{W.current&&W.current.click()},Nt=async()=>{const h=await re();if(!h){ae(!0),Z(!0);return}if(!Qe)try{const C=JSON.parse(atob(h.split(".")[1]))["cognito:username"];ne(C)}catch(v){console.error("Failed to decode token",v)}be(!1),Ye()},zt=async()=>{Z(!1);const h=await re();if(h)try{const C=JSON.parse(atob(h.split(".")[1]))["cognito:username"];if(ne(C),qe&&(localStorage.setItem("selectPhotosButtonTimestamp",Date.now().toString()),ae(!1)),de){ee(!1),Ce();return}setTimeout(()=>{window.location.reload()},500)}catch(v){console.error("Failed to decode token",v)}},Ot=async h=>{const v=Array.from(h.target.files||[]);if(!v.length)return;localStorage.removeItem("selectPhotosButtonTimestamp"),ye(!1),q(!0),be(!1);const C=await ot();if(!C){Q("❌ Authentication failed"),q(!1),Z(!0);return}try{const P=JSON.parse(atob(C.split(".")[1]))["cognito:username"];if(!P){Q("❌ Missing Cognito Username"),q(!1);return}ne(P);const E=f||`${P}_____${Zt()}____Folder`;Q(`📁 Using folder ID: ${E}`),K(v.map(U=>({fileName:U.name,s3PreviewUrl:URL.createObjectURL(U),type:U.type,size:U.size,status:"pending",progress:0})));const A=ro(K),F=setInterval(()=>{je(z,J)},500),B=await no(v,P,A,Q);clearInterval(F),je(B,J),localStorage.setItem(tt.SELECTED_PHOTOS,JSON.stringify(B)),Q(`📸 Saved ${B.length} photos metadata to storage`);const Se=B.every(U=>U.status==="complete"),ie=B.some(U=>U.status==="error");if(Se&&!ie)Q(`✅ All ${B.length} files successfully uploaded`);else if(ie){const U=B.filter(pe=>pe.status==="error").length;Q(`⚠️ Upload completed with ${U} errors`)}setTimeout(()=>{be(!0)},1e3)}catch(j){Q(`❌ Fatal error in handleFileSelection: ${String(j)}`),q(!1)}finally{h.target&&(h.target.value="")}},ue=(h,v,C,j,P=!1)=>{C&&(C.style.width=`${h}%`,P&&(C.style.backgroundColor="#f44336")),v&&(v.textContent=j,P&&(v.style.color="#f44336"))},te=(h,v,C,j)=>{var P;if(j&&(j.style.width="100%",j.style.backgroundColor="#f44336"),C&&(C.textContent=t("Error saving album"),C.style.color="#f44336"),h){h.textContent=v,h.style.display="block";const E=document.createElement("button");E.textContent=t("Retry"),E.style.marginTop="15px",E.style.padding="8px 16px",E.style.backgroundColor="#2196f3",E.style.color="white",E.style.border="none",E.style.borderRadius="4px",E.style.cursor="pointer",E.onclick=function(){const B=h.closest('div[style*="position: fixed"]');B&&B.parentNode&&B.parentNode.removeChild(B),setTimeout(Xe,500)};const A=document.createElement("button");A.textContent=t("Close"),A.style.marginTop="15px",A.style.marginLeft="10px",A.style.padding="8px 16px",A.style.backgroundColor="#757575",A.style.color="white",A.style.border="none",A.style.borderRadius="4px",A.style.cursor="pointer",A.onclick=function(){const B=h.closest('div[style*="position: fixed"]');B&&B.parentNode&&B.parentNode.removeChild(B)};const F=document.createElement("div");F.appendChild(E),F.appendChild(A),(P=h.parentNode)==null||P.appendChild(F)}},Ce=async()=>{console.log("Starting album save execution");const h=document.createElement("div");h.style.position="fixed",h.style.top="0",h.style.left="0",h.style.width="100%",h.style.height="100%",h.style.backgroundColor="rgba(0, 0, 0, 0.5)",h.style.display="flex",h.style.justifyContent="center",h.style.alignItems="center",h.style.zIndex="2000";const v=document.createElement("div");v.style.backgroundColor="white",v.style.padding="30px",v.style.borderRadius="8px",v.style.textAlign="center";const C=document.createElement("p");C.id="saveProgressText",C.textContent=t("Saving album...");const j=document.createElement("div");j.style.backgroundColor="#f0f0f0",j.style.borderRadius="4px",j.style.overflow="hidden",j.style.height="8px",j.style.marginTop="10px";const P=document.createElement("div");P.id="saveProgress",P.style.backgroundColor="#4caf50",P.style.height="100%",P.style.width="5%",P.style.transition="width 0.3s ease";const E=document.createElement("p");E.id="saveErrorText",E.style.color="#f44336",E.style.display="none",E.style.marginTop="10px",E.style.fontSize="14px",j.appendChild(P),v.appendChild(C),v.appendChild(j),v.appendChild(E),h.appendChild(v),document.body.appendChild(h);try{const A=await ot();if(!A){console.error("No token available for saving album"),document.body.removeChild(h);return}const B=JSON.parse(atob(A.split(".")[1]))["cognito:username"];if(!B){console.error("Missing username in token"),te(E,"Could not retrieve username from token",C,P);return}if(!f){console.error("No folder ID available"),te(E,"Folder ID is missing",C,P);return}if(!r||!r.mediaItems){console.error("No album data available"),te(E,"Album data is missing or incomplete",C,P);return}if(r.mediaItems.length===0){console.error("No media items to save"),te(E,"No media items in album to save",C,P);return}const Se=Math.floor(Date.now()/1e3);ue(30,C,P,t("Preparing album data..."));const ie={currentTime:Se,folderId:f,profileIds:[`${B}_____Public____Profile`],folderPositionSelectedTagInputs:[],folderPositionPoints:1};console.log("Folder position input:",ie),ue(50,C,P,t("Saving album..."));const U=`
        mutation SaveAlbum(
          $folderPositionInputs: [FolderPositionInput!]
        ) {
          changeFiles(folderPositionInputs: $folderPositionInputs) {
            items { id }
          }
        }
      `,pe={folderPositionInputs:[ie]};console.log("GraphQL mutation variables:",JSON.stringify(pe));try{const G=await fetch(He,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${A}`},body:JSON.stringify({query:U,variables:pe})});if(ue(80,C,P,t("Almost there...")),!G.ok)throw new Error(`HTTP error: ${G.status} ${G.statusText}`);const Pe=await G.text();let se;try{se=JSON.parse(Pe),console.log("API response:",se)}catch(fe){const he=fe instanceof Error?fe.message:"Unknown JSON parse error";throw new Error(`Invalid JSON response: ${he}`)}if(se.errors&&se.errors.length>0){const fe=se.errors.map(he=>(console.error("GraphQL error:",he),he.message||"Unknown GraphQL error")).join("; ");throw new Error(`GraphQL errors: ${fe}`)}console.log("Album saved successfully"),ue(100,C,P,t("Album saved successfully!")),sessionStorage.setItem("album_just_saved","true"),setTimeout(()=>{document.body.removeChild(h),window.location.href="/my-albums.html"},2e3)}catch(G){const Pe=G instanceof Error?G.message:"Unknown API error";console.error("Error in API request:",G),te(E,Pe,C,P)}}catch(A){const F=A instanceof Error?A.message:"Unknown error";console.error("Error saving album:",A),te(E,F,C,P)}},Xe=async()=>{if(console.log("Starting direct album save"),l==="CannotBeSaved"&&!g){ee(!0),Y();return}const h=await re();if(!h){console.log("User not logged in, showing OTP login"),ee(!0),Z(!0);return}if(!Qe)try{const C=JSON.parse(atob(h.split(".")[1]))["cognito:username"];ne(C)}catch(v){console.error("Failed to decode token",v)}Ce()},Mt=async()=>{if((l==="NotVisible"||l==="CannotBeSaved")&&!g){Y();return}M(!k),N(new Set)},Ze=(h,v)=>{v.stopPropagation(),N(C=>{const j=new Set(C);return j.has(h)?j.delete(h):j.add(h),j})},Ut=()=>{M(!1),N(new Set)},Ft=async()=>{if(_.size===0){alert(t("Please select at least one item to share."));return}if(r)try{const h=document.createElement("div");h.style.position="fixed",h.style.top="0",h.style.left="0",h.style.width="100%",h.style.height="100%",h.style.backgroundColor="rgba(0, 0, 0, 0.5)",h.style.display="flex",h.style.justifyContent="center",h.style.alignItems="center",h.style.zIndex="2000";const v=document.createElement("div");v.style.backgroundColor="white",v.style.padding="30px",v.style.borderRadius="8px",v.style.textAlign="center";const C=document.createElement("p");C.textContent=t("Creating sub-album..."),v.appendChild(C),h.appendChild(v),document.body.appendChild(h);const P={isSubAlbum:!0,selectedFileIds:Array.from(_).map(E=>{var A;return(A=r.mediaItems[E])==null?void 0:A.fileId}).filter(E=>E)};localStorage.setItem(tt.SUB_ALBUM_DATA,JSON.stringify(P)),document.body.removeChild(h),window.location.href="/save-album.html"}catch(h){console.error("Error creating sub-album:",h),alert(t("There was an error creating the sub-album. Please try again."))}},$t=async()=>{if(l==="CannotBeSaved"&&!g){Y();return}if(!await re()&&(f||l==="CannotBeSaved")){Z(!0);return}r&&to(r,t,ce)};return w.useEffect(()=>{const h=localStorage.getItem("columns")||"1";c(h)},[]),w.useEffect(()=>{(async()=>{const v=Yt();if(!v){o(t("Valid ID not obtained from query parameter.")),s(!1);return}const C=v.split("_");let j=C[C.length-1].replace(/-/g,"");j.length===32?(j=Xt(j),console.log(j)):console.error("Invalid UUID format: must be 32 characters after removing dashes");const P=await uo(j,p);P&&(i(P),P.passwordPolicy&&(m(P.passwordPolicy),P.passwordPolicy==="NoPassword"&&x(!0))),s(!1)})()},[]),w.useEffect(()=>{(async()=>{const v=await re();if(v)try{const j=JSON.parse(atob(v.split(".")[1]))["cognito:username"];ne(j);const P=localStorage.getItem("selectPhotosButtonTimestamp");if(P){const E=parseInt(P,10),F=(Date.now()-E)/(1e3*60);ye(F<10),F>=10&&localStorage.removeItem("selectPhotosButtonTimestamp")}else ye(!1)}catch(C){console.error("Failed to decode token",C)}})()},[]),w.useEffect(()=>{r!=null&&r.folderName?document.title=r.folderName:document.title=t("Photos")},[r,u]),e.jsxs(po,{children:[e.jsx(Mo,{}),e.jsx(fo,{children:e.jsxs(ho,{children:[e.jsx(Uo,{children:k?e.jsxs("div",{style:{display:"flex",gap:"16px"},children:[e.jsxs(V,{onClick:Ft,disabled:_.size===0,style:{opacity:_.size===0?.5:1,backgroundColor:_.size>0?"#006adc":void 0,color:_.size>0?"white":void 0},children:[t("Create Sub-album")," (",_.size,")"]}),e.jsx(V,{onClick:Ut,children:t("Cancel")})]}):e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",width:"100%",flexWrap:"nowrap",alignItems:"center"},children:[e.jsx("div",{style:{flexShrink:0},children:!Ke()&&e.jsx(mo,{onClick:Mt,children:t("Create Sub-album")})}),e.jsxs("div",{style:{marginLeft:"auto",display:"flex",alignItems:"center"},children:[!k&&!g&&l&&l!=="NoPassword"&&e.jsx(V,{onClick:Y,children:t("Enter Password")}),!k&&!(!g&&l&&l!=="NoPassword")&&e.jsx(or,{addPhotosToAlbum:Nt,saveAlbum:Xe,downloadPhotos:$t,promptForPassword:Y,showingEnterPassword:Ke(),passwordPolicy:l,usingFolderInviteGrantsRightToAddItems:r==null?void 0:r.usingFolderInviteGrantsRightToAddItems,t})]})]})}),e.jsxs(xo,{children:[e.jsx(Do,{htmlFor:"columns",id:"columns-label",children:e.jsx("strong",{children:t("Columns:")})}),e.jsxs(No,{id:"columns",value:a,onChange:h=>Dt(h.target.value),children:[e.jsx("option",{value:"1",children:"1"}),e.jsx("option",{value:"2",children:"2"}),e.jsx("option",{value:"3",children:"3"}),e.jsx("option",{value:"4",children:"4"}),e.jsx("option",{value:"5",children:"5"})]})]})]})}),e.jsxs(So,{id:"media-container",children:[Rt&&(r==null?void 0:r.usingFolderInviteGrantsRightToAddItems)&&e.jsx("div",{style:{width:"100%",display:"flex",justifyContent:"center",marginBottom:"20px",marginTop:"10px"},children:e.jsx("button",{onClick:Ye,style:{backgroundColor:"#007bff",color:"white",border:"none",borderRadius:"6px",padding:"12px 20px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"8px",fontSize:"16px",boxShadow:"0 2px 4px rgba(0,0,0,0.1)"},children:e.jsx("span",{children:t("Select Photos To Add To Album")})})}),r&&Object.keys(r.contacts).length>0&&e.jsx("div",{style:{width:"100%",backgroundColor:"#f0f7ff",borderRadius:"8px",padding:"16px",marginBottom:"20px",boxShadow:"0 2px 4px rgba(0,0,0,0.1)",border:"1px solid #d0e1f9"},children:e.jsxs("p",{style:{margin:"0",fontSize:"15px",color:"#333",textAlign:"left"},children:[t('Click "Add" to create a memory with '),e.jsx("strong",{children:Object.values(r.contacts).filter(h=>!h.toString().startsWith("Profile-")).join(", ")}),t(" that you can filter for later")]})}),H&&e.jsxs("div",{style:{width:"100%",marginBottom:"20px"},children:[e.jsx(rr,{progressTracker:X,t,isRTL:Kt(u)==="rtl",style:{marginTop:"20px"}}),X.filesComplete>0&&X.filesComplete===X.totalFiles&&e.jsx("div",{style:{backgroundColor:"#e8f5e9",color:"#2e7d32",padding:"10px 16px",borderRadius:"6px",fontSize:"14px",marginTop:"10px",textAlign:"center"},children:t("Upload complete! Preparing to save your album...")}),X.filesWithError>0&&e.jsx("div",{style:{backgroundColor:"#ffebee",color:"#c62828",padding:"10px 16px",borderRadius:"6px",fontSize:"14px",marginTop:"10px",textAlign:"center"},children:t("Some files could not be uploaded. You can continue with the successfully uploaded files.")})]}),!g&&l==="NotVisible"&&e.jsxs("div",{style:{padding:"20px",backgroundColor:"#f3f4f6",borderRadius:"8px",textAlign:"center",marginBottom:"20px"},children:[e.jsx("h3",{children:t("This album is password protected")}),e.jsx("p",{children:t("Please enter the password to view the contents")}),y&&e.jsx("div",{style:{color:"#d32f2f",fontSize:"14px",margin:"10px 0",padding:"5px",backgroundColor:"rgba(211, 47, 47, 0.1)",borderRadius:"4px"},children:y}),e.jsx("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"10px"},children:e.jsx(V,{onClick:Y,children:t("Enter Password")})})]}),k&&e.jsx($o,{children:e.jsx("p",{children:t("Select photos and videos to create a sub-album to share")})}),(r==null?void 0:r.folderName)&&r.folderName!==t("Photos")&&r.folderName.trim()!==""&&e.jsx(wo,{id:"album-title",children:e.jsx(Co,{children:r.folderName})}),r!=null&&r.folderDescription&&r.folderDescription.trim()!==""?e.jsx(Po,{id:"description-container",children:e.jsx(Io,{children:r.folderDescription})}):null,e.jsx(jo,{id:"media-grid",columns:a,children:d?e.jsx(Bo,{id:"loading-message",children:t("Loading album content...")}):n?e.jsx(Re,{children:n}):kt()?r&&r.mediaItems.length===0?e.jsx(Re,{children:t("No media found in this album")}):r==null?void 0:r.mediaItems.map((h,v)=>{const C=h.ownerId&&r.contacts[h.ownerId]?r.contacts[h.ownerId]:"",j=_.has(v),P=Ve();return e.jsxs("div",{style:{position:"relative",border:k&&j?"3px solid #006adc":void 0,borderRadius:"8px",overflow:"hidden",boxShadow:k&&j?"0 0 0 3px rgba(0, 106, 220, 0.3)":void 0},onClick:E=>k?Ze(v,E):ce(v),children:[k&&e.jsx(Fo,{isSelected:j,onClick:E=>Ze(v,E),children:j&&e.jsx(Wo,{children:"✓"})}),h.type==="image"?e.jsx(We,{src:h.url,thumbnailSrc:h.thumbnailUrl,alt:`Album image ${v+1}`,loadFullResolution:D[v]||!1,onFullResolutionLoaded:()=>Je(v),onClick:()=>k?void 0:ce(v),showWatermark:P}):e.jsx(Ho,{thumbnailUrl:h.thumbnailUrl||"",videoUrl:h.url,duration:h.duration||"0:00",index:v,onFullResolutionLoaded:()=>Je(v),onClick:()=>k?void 0:ce(v),showWatermark:P}),C&&e.jsx(Ao,{children:C})]},v)}):e.jsx("div",{style:{gridColumn:"1 / -1",textAlign:"center",padding:"40px 0"},children:e.jsx(Re,{children:t("Enter the password to view album contents")})})})]}),e.jsx(tr,{isOpen:I,onClose:()=>{b(!1),R(null),de&&ee(!1)},onSubmit:At,error:y,t}),e.jsx(nr,{isOpen:le,onClose:()=>{Z(!1),de&&ee(!1)},onLoginSuccess:zt,t}),e.jsx(eo,{onFileSelection:Ot,ref:W}),T!==null&&r&&e.jsx(qo,{item:r.mediaItems[T],index:T,onClose:Lt,onPrev:_t,onNext:Bt,hasNext:T<r.mediaItems.length-1,hasPrev:T>0,albumName:r.folderName,showWatermark:Ve()})]})},sr=()=>e.jsx(Vt,{children:e.jsx(ir,{})});Gt.createRoot(document.getElementById("root")).render(e.jsx(sr,{}));
