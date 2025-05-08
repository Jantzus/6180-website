import{c as qt,d as Vt,a as pe,S as Ze,r as x,u as ke,j as o,e as Gt,f as bt,A as Jt,C as Re,R as Kt,I as Yt,g as ue,b as et}from"./config-C81kv4lT.js";import{c as X,e as Xt,b as Pe,d as Zt,h as eo,i as to,g as oo}from"./utils-BMtZFOCn.js";import{U as ro,F as no,C as io,a as so,d as ao}from"./FileInput-Aqf5WrG6.js";import{u as Qe,c as lo,a as co,p as uo}from"./file-upload-utils-Pz9rjdMU.js";import{d as C,l as V,f as po}from"./styled-components.browser.esm-DAVmpCtn.js";import{L as fo,N as ho,Q as go,W as mo,X as xo,Y as yo,Z as vo,_ as bo}from"./styled-components-BCaeVUml.js";import{C as wo,S as Co,I as Po,R as So}from"./SignUpCommand-5ZAYfGgq.js";import"./index-DFUfgcbK.js";import"./parseJsonBody-Cin9RETb.js";const tt=`
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
            profileIds
          }
        }
      }
      nextToken
    }
  }
`,ot=(e,i)=>{var h,m,g,b,v;const r=((m=(h=e==null?void 0:e.data)==null?void 0:h.fetchRelations)==null?void 0:m.items)||[],l=[],u={};let a="Photos",s="",d,n=!1,t=!1,c,p=!1;const f=new Set;if(r.length>0){const y=r[0];i&&(y!=null&&y.id)&&i(y.id),y!=null&&y.folderName&&y.folderName.length>0&&(a=y.folderName),y!=null&&y.folderDescription&&y.folderDescription.length>0&&(s=y.folderDescription),y!=null&&y.folderPassword&&(y.folderPassword.policy&&(d=y.folderPassword.policy,n=d!=="NoPassword"),y.folderPassword.password&&d!=="NoPassword"&&(t=!0,c=y.folderPassword.password)),y!=null&&y.folderInviteParameters&&(p=!!y.folderInviteParameters.usingFolderInviteGrantsRightToAddItems),(((b=(g=r[0])==null?void 0:g.contactsUsingInvite)==null?void 0:b.items)||[]).forEach(I=>{var E;I!=null&&I.id&&((E=I==null?void 0:I.item)!=null&&E.publicDisplayName)&&(u[I.id]=I.item.publicDisplayName)}),(((v=y==null?void 0:y.fileReferencesPage)==null?void 0:v.items)||[]).forEach(I=>{const E=I==null?void 0:I.file;if(!(E!=null&&E.dataKey))return;const{id:_,dataKey:k,thumbnailDataKey:T,durationInSeconds:O,ownerContactId:R}=E;if(f.has(k))return;f.add(k);const B=`${Ze}${k}`,A=T?`${Ze}${T}`:void 0;k.startsWith("Input/Image/")?l.push({type:"image",fileId:_,url:B,thumbnailUrl:A||B,ownerContactId:R,loaded:!1}):k.startsWith("Input/Video/")&&l.push({type:"video",fileId:_,url:B,thumbnailUrl:A||B,duration:Xt(O),ownerContactId:R,loaded:!1})})}return{mediaItems:l,folderName:a,folderDescription:s,contacts:u,passwordPolicy:d,passwordRequired:n,hasPassword:t,actualPassword:c,usingFolderInviteGrantsRightToAddItems:p}},Io=async(e,i)=>{var r,l,u,a;try{const d={fetchRelationsInput:{targetItemIdentifier____RelationType:`${e}____Folder`,index:"targetItemIdentifier____RelationType",limit:1,scanIndexForward:!1,nextToken:null}},n=fetch(qt,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":Vt},body:JSON.stringify({query:tt,variables:d})}).then(h=>h.json()),t=(async()=>{const h=await X();return h?fetch(pe,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${h}`},body:JSON.stringify({query:tt,variables:d})}).then(m=>m.json()):null})(),c=await n;let p=ot(c,i);const f=await t;if(f){const h=(a=(u=(l=(r=f==null?void 0:f.data)==null?void 0:r.fetchRelations)==null?void 0:l.items)==null?void 0:u[0])==null?void 0:a.folderPosition;if(h){const m=ot(f,i);m.folderPositionId=h==null?void 0:h.id,m.profileIds=h==null?void 0:h.profileIds,p=m}}return p}catch(s){return console.error("Error fetching folder data:",s),null}},ko=C.div`
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
`,To=C.div`
  position: sticky;
  top: 0;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0,0,0,0.06);
  z-index: 10;
  margin-bottom: 10px;
  width: 100%;
`,jo=C.div`
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  
  @media (max-width: 767px) {
    padding: 16px 16px;
  }
`,Eo=C.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 5px;
  gap: 10px;
  flex-wrap: wrap;
`,Ro=C.button`
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
`,Ao=C.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`,$=C.button`
  background: transparent;
  color: #006adc;
  border: 1px solid #006adc;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
`,wt=C.button`
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
`,Ct=C.span`
  width: 18px;
  height: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`,ne=C.span`
  height: 2px;
  background: #006adc;
  width: 100%;
`,Pt=C.div`
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
`,Z=C.button`
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
`,Lo=C.h2`
  font-weight: 400;
  margin: 0 0 16px 0;
  font-size: 24px;
  padding: 0;
  
  @media (max-width: 767px) {
    padding: 0;
  }
`,_o=C.strong`
  font-weight: 700;
`,Bo=C.div`
  padding: 0 24px 20px;
  width: 100%;
  overflow: visible; // Allow content to flow naturally
  
  @media (max-width: 767px) {
    padding: 0 16px 15px;
    width: 100%;
  }
`,Mo=C.div`
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 20px;
`,No=C.p`
  margin: 0;
`,Oo=C.div`
  display: grid;
  grid-gap: 20px;
  width: 100%;
  min-height: 0; // Allow proper sizing
  
  ${e=>{switch(e.columns){case"1":return V`grid-template-columns: repeat(1, 1fr);`;case"2":return V`grid-template-columns: repeat(2, 1fr);`;case"3":return V`grid-template-columns: repeat(3, 1fr);`;case"4":return V`grid-template-columns: repeat(4, 1fr);`;case"5":return V`grid-template-columns: repeat(5, 1fr);`;default:return V`grid-template-columns: repeat(1, 1fr);`}}}
  
  @media (max-width: 767px) {
    grid-gap: 8px;
    ${e=>{const i=parseInt(e.columns);return i>3?V`grid-template-columns: repeat(3, minmax(0, 1fr));`:i>1?V`grid-template-columns: repeat(${i}, minmax(0, 1fr));`:V`grid-template-columns: repeat(1, minmax(0, 1fr));`}}
  }
`,Uo=C.div`
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
  
  ${e=>e.isHovered&&V`
    transform: translateY(-2px);
  `}
  
  ${e=>e.isVideo&&V`
    cursor: pointer;
  `}
  
  @media (max-width: 767px) {
    border-radius: 4px;
    margin-bottom: 10px; // Less margin on mobile
  }
`,zo=C.div`
  position: relative;
  overflow: hidden;
  background-color: #f0f0f0;
  width: 100%;
  padding-bottom: 75%; // Create a consistent aspect ratio (4:3)
  height: 0; // Use padding-bottom for aspect ratio
  
  @media (max-width: 767px) {
    padding-bottom: 100%; // Square aspect ratio on mobile
  }
`,rt=C.div`
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
`,Do=C.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  transition: opacity 0.3s;
  opacity: ${e=>e.isLoaded?1:0};
`,Fo=C.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading-animation 1.5s infinite;
  z-index: 0;
`,$o=C.div`
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
`,Wo=C.div`
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
`,Ho=C.div`
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
`,Ae=C.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #d32f2f;
  grid-column: 1 / -1;
  width: 100%;
`,Qo=C.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
  grid-column: 1 / -1;
  width: 100%;
`,qo=C.label`
  margin-right: 8px;
  font-size: 14px;
  color: #555;
  font-weight: normal;
`,Vo=C.select`
  padding: 5px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  font-size: 14px;
  min-width: 50px;
`,Go=C.div`
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
`,Jo=C.div`
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
`;C.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;C.div`
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
`;C.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
  
  @media (max-width: 767px) {
    font-size: 18px;
  }
`;C.ol`
  list-style-type: decimal;
  padding-left: 20px;
`;C.li`
  margin-bottom: 12px;
  font-size: 16px;
  
  @media (max-width: 767px) {
    font-size: 14px;
  }
`;C.button`
  margin-top: 16px;
  padding: 8px 16px;
  background-color: #006adc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;const St=C.div`
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
`;C.p`
  font-style: italic;
  margin-top: 12px;
  margin-bottom: 12px;
  text-align: center;
  
  @media (max-width: 767px) {
    font-size: 14px;
  }
`;const Ko=po`
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
`,Yo=C(Eo)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  
  > div {
    width: auto;
    display: flex;
    align-items: center;
  }
`;C(Uo)`
  ${e=>e.isSelected&&`
    border: 3px solid #006adc;
    box-shadow: 0 0 0 3px rgba(0, 106, 220, 0.3);
  `}
`;const Xo=C.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${e=>e.isSelected?"#006adc":"rgba(255, 255, 255, 0.8)"};
  border: ${e=>e.isSelected?"none":"2px solid #006adc"};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`,Zo=C.div`
  padding: 10px 20px;
  background-color: #f0f7ff;
  border-radius: 4px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`,er=C.div`
  color: white;
  font-size: 14px;
  font-weight: bold;
`,Se=C.div`
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
`,Ie=C.div`
  color: white;
  font-size: 24px;
  font-weight: bold;
  transform: rotate(-30deg);
  opacity: 0.7;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
  user-select: none;
  white-space: nowrap;
`,nt=C($)`
  background-color: #4caf50;
  color: white;
  &:hover {
    background-color: #45a049;
  }
`,qe=({src:e,thumbnailSrc:i,alt:r,className:l="",loadFullResolution:u=!1,onFullResolutionLoaded:a,onClick:s,showWatermark:d=!1})=>{const[n,t]=x.useState(!1),[c,p]=x.useState(!1),[f,h]=x.useState(!1),[m,g]=x.useState("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E"),{t:b}=ke();return x.useEffect(()=>{if(i){const v=new Image;v.src=i,v.onload=()=>{g(i),t(!0)}}},[i]),x.useEffect(()=>{if(u&&!c){h(!0);const v=new Image;v.src=e,v.onload=()=>{g(e),p(!0),h(!1),a&&a()}}},[u,e,c,a]),o.jsxs(zo,{onClick:s,children:[o.jsx(Do,{src:m,alt:r,className:l,isLoaded:n,style:{cursor:s?"pointer":"default"}}),!n&&o.jsx(Fo,{}),f&&o.jsx(St,{children:b("Loading full resolution...")}),d&&n&&o.jsx(Se,{children:o.jsx(Ie,{children:"6180 Watermarked"})})]})},tr=({thumbnailUrl:e,videoUrl:i,duration:r,index:l,onFullResolutionLoaded:u,onClick:a,showWatermark:s=!1})=>{const[d,n]=x.useState(!1),[t,c]=x.useState(!1),[p,f]=x.useState(!1),h=Gt.useRef(null),{t:m}=ke(),g=()=>{if(a){a();return}p?n(!0):c(!0)},b=()=>{f(!0),n(!0),u&&u()};return x.useEffect(()=>{if(t&&h.current&&!p){const v=h.current,y=()=>{b(),v.removeEventListener("canplaythrough",y)};return v.addEventListener("canplaythrough",y),v.load(),()=>{v.removeEventListener("canplaythrough",y)}}},[t,p]),d?o.jsxs("div",{style:{position:"relative",width:"100%",height:"100%"},children:[o.jsxs("video",{ref:h,controls:!0,style:{width:"100%",height:"100%"},children:[o.jsx("source",{src:i,type:"video/mp4"}),m("Your browser does not support the video tag.")]}),s&&o.jsx(Se,{children:o.jsx(Ie,{children:"6180 Watermarked"})})]}):t&&!p?o.jsxs(rt,{children:[o.jsx(qe,{src:i,thumbnailSrc:e,alt:`Video thumbnail ${l+1}`,showWatermark:s}),o.jsx(St,{children:m("Loading video...")}),o.jsx("video",{ref:h,style:{display:"none"},preload:"auto",children:o.jsx("source",{src:i,type:"video/mp4"})})]}):o.jsxs(rt,{onClick:g,children:[o.jsx(qe,{src:i,thumbnailSrc:e,alt:`Video thumbnail ${l+1}`,showWatermark:s}),o.jsx(Wo,{}),o.jsx(Ho,{children:r})]})},or=({item:e,index:i,onClose:r,onPrev:l,onNext:u,hasNext:a,hasPrev:s,ownerName:d,showWatermark:n=!1})=>{const[t,c]=x.useState(!1),[p,f]=x.useState(!0),{t:h}=ke();x.useEffect(()=>{const g=b=>{b.key==="Escape"?r():b.key==="ArrowLeft"&&s?l():b.key==="ArrowRight"&&a&&u()};return window.addEventListener("keydown",g),()=>window.removeEventListener("keydown",g)},[r,u,l,a,s]);const m=g=>(g==null?void 0:g.split("_____")[0])||"";return o.jsxs("div",{style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",backgroundColor:"rgba(0, 0, 0, 0.9)",zIndex:2e3,display:"flex",flexDirection:"column"},children:[o.jsxs("div",{style:{padding:"15px",display:"flex",justifyContent:"space-between",alignItems:"center",backgroundColor:"rgba(0, 0, 0, 0.7)"},children:[o.jsx("button",{style:{background:"transparent",border:"none",color:"white",fontSize:"16px",padding:"5px 10px",cursor:"pointer"},onClick:r,children:h("Back")}),o.jsxs("div",{style:{display:"flex",gap:"10px"},children:[o.jsx("button",{style:{background:"transparent",border:"none",color:"white",fontSize:"16px",padding:"5px 10px",cursor:s?"pointer":"not-allowed",opacity:s?1:.5},onClick:s?l:void 0,disabled:!s,children:"←"}),o.jsx("button",{style:{background:"transparent",border:"none",color:"white",fontSize:"16px",padding:"5px 10px",cursor:a?"pointer":"not-allowed",opacity:a?1:.5},onClick:a?u:void 0,disabled:!a,children:"→"})]})]}),o.jsxs("div",{style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",overflow:"auto",padding:"10px",position:"relative"},children:[e.type==="image"?o.jsxs("div",{style:{position:"relative"},children:[o.jsx("img",{src:e.url,alt:`Image ${i+1}`,style:{maxWidth:"100%",maxHeight:"100%",objectFit:"contain",opacity:t?1:0,transition:"opacity 0.3s"},onLoad:()=>{c(!0),f(!1)}}),n&&o.jsx(Se,{children:o.jsx(Ie,{children:"6180 Watermarked"})}),!t&&e.thumbnailUrl&&o.jsx("img",{src:e.thumbnailUrl,alt:`Thumbnail ${i+1}`,style:{position:"absolute",maxWidth:"100%",maxHeight:"100%",objectFit:"contain",opacity:.5}})]}):o.jsxs("div",{style:{position:"relative"},children:[o.jsxs("video",{controls:!0,autoPlay:!0,style:{maxWidth:"100%",maxHeight:"100%"},onLoadedData:()=>f(!1),children:[o.jsx("source",{src:e.url,type:"video/mp4"}),h("Your browser does not support the video tag.")]}),n&&o.jsx(Se,{children:o.jsx(Ie,{children:"6180 Watermarked"})})]}),p&&o.jsx("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",backgroundColor:"rgba(0, 0, 0, 0.7)",color:"white",padding:"10px 20px",borderRadius:"4px",zIndex:10},children:e.type==="image"?h("Loading full resolution..."):h("Loading video...")})]}),o.jsx("div",{style:{padding:"15px",display:"flex",justifyContent:"center",backgroundColor:"rgba(0, 0, 0, 0.7)",color:"white"},children:e.ownerContactId&&o.jsxs("a",{href:`/profile.html?id=${m(e.ownerContactId)}`,style:{textDecoration:"none",color:"white",backgroundColor:"#006adc",padding:"8px 16px",borderRadius:"4px",fontSize:"14px",display:"flex",alignItems:"center",gap:"6px"},children:[o.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[o.jsx("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),o.jsx("circle",{cx:"12",cy:"7",r:"4"})]}),d]})})]})};var oe={},Le={exports:{}},_e,it;function rr(){if(it)return _e;it=1;var e="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return _e=e,_e}var Be,st;function nr(){if(st)return Be;st=1;var e=rr();function i(){}function r(){}return r.resetWarningCache=i,Be=function(){function l(s,d,n,t,c,p){if(p!==e){var f=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw f.name="Invariant Violation",f}}l.isRequired=l;function u(){return l}var a={array:l,bigint:l,bool:l,func:l,number:l,object:l,string:l,symbol:l,any:l,arrayOf:u,element:l,elementType:l,instanceOf:u,node:l,objectOf:u,oneOf:u,oneOfType:u,shape:u,exact:u,checkPropTypes:r,resetWarningCache:i};return a.PropTypes=a,a},Be}var at;function It(){return at||(at=1,Le.exports=nr()()),Le.exports}var Me,lt;function kt(){return lt||(lt=1,Me={L:1,M:0,Q:3,H:2}),Me}var Ne,dt;function Tt(){return dt||(dt=1,Ne={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8}),Ne}var Oe,ct;function ir(){if(ct)return Oe;ct=1;var e=Tt();function i(r){this.mode=e.MODE_8BIT_BYTE,this.data=r}return i.prototype={getLength:function(r){return this.data.length},write:function(r){for(var l=0;l<this.data.length;l++)r.put(this.data.charCodeAt(l),8)}},Oe=i,Oe}var Ue,ut;function sr(){if(ut)return Ue;ut=1;var e=kt();function i(r,l){this.totalCount=r,this.dataCount=l}return i.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],i.getRSBlocks=function(r,l){var u=i.getRsBlockTable(r,l);if(u==null)throw new Error("bad rs block @ typeNumber:"+r+"/errorCorrectLevel:"+l);for(var a=u.length/3,s=new Array,d=0;d<a;d++)for(var n=u[d*3+0],t=u[d*3+1],c=u[d*3+2],p=0;p<n;p++)s.push(new i(t,c));return s},i.getRsBlockTable=function(r,l){switch(l){case e.L:return i.RS_BLOCK_TABLE[(r-1)*4+0];case e.M:return i.RS_BLOCK_TABLE[(r-1)*4+1];case e.Q:return i.RS_BLOCK_TABLE[(r-1)*4+2];case e.H:return i.RS_BLOCK_TABLE[(r-1)*4+3];default:return}},Ue=i,Ue}var ze,pt;function ar(){if(pt)return ze;pt=1;function e(){this.buffer=new Array,this.length=0}return e.prototype={get:function(i){var r=Math.floor(i/8);return(this.buffer[r]>>>7-i%8&1)==1},put:function(i,r){for(var l=0;l<r;l++)this.putBit((i>>>r-l-1&1)==1)},getLengthInBits:function(){return this.length},putBit:function(i){var r=Math.floor(this.length/8);this.buffer.length<=r&&this.buffer.push(0),i&&(this.buffer[r]|=128>>>this.length%8),this.length++}},ze=e,ze}var De,ft;function jt(){if(ft)return De;ft=1;for(var e={glog:function(r){if(r<1)throw new Error("glog("+r+")");return e.LOG_TABLE[r]},gexp:function(r){for(;r<0;)r+=255;for(;r>=256;)r-=255;return e.EXP_TABLE[r]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},i=0;i<8;i++)e.EXP_TABLE[i]=1<<i;for(var i=8;i<256;i++)e.EXP_TABLE[i]=e.EXP_TABLE[i-4]^e.EXP_TABLE[i-5]^e.EXP_TABLE[i-6]^e.EXP_TABLE[i-8];for(var i=0;i<255;i++)e.LOG_TABLE[e.EXP_TABLE[i]]=i;return De=e,De}var Fe,ht;function Et(){if(ht)return Fe;ht=1;var e=jt();function i(r,l){if(r.length==null)throw new Error(r.length+"/"+l);for(var u=0;u<r.length&&r[u]==0;)u++;this.num=new Array(r.length-u+l);for(var a=0;a<r.length-u;a++)this.num[a]=r[a+u]}return i.prototype={get:function(r){return this.num[r]},getLength:function(){return this.num.length},multiply:function(r){for(var l=new Array(this.getLength()+r.getLength()-1),u=0;u<this.getLength();u++)for(var a=0;a<r.getLength();a++)l[u+a]^=e.gexp(e.glog(this.get(u))+e.glog(r.get(a)));return new i(l,0)},mod:function(r){if(this.getLength()-r.getLength()<0)return this;for(var l=e.glog(this.get(0))-e.glog(r.get(0)),u=new Array(this.getLength()),a=0;a<this.getLength();a++)u[a]=this.get(a);for(var a=0;a<r.getLength();a++)u[a]^=e.gexp(e.glog(r.get(a))+l);return new i(u,0).mod(r)}},Fe=i,Fe}var $e,gt;function lr(){if(gt)return $e;gt=1;var e=Tt(),i=Et(),r=jt(),l={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},u={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(a){for(var s=a<<10;u.getBCHDigit(s)-u.getBCHDigit(u.G15)>=0;)s^=u.G15<<u.getBCHDigit(s)-u.getBCHDigit(u.G15);return(a<<10|s)^u.G15_MASK},getBCHTypeNumber:function(a){for(var s=a<<12;u.getBCHDigit(s)-u.getBCHDigit(u.G18)>=0;)s^=u.G18<<u.getBCHDigit(s)-u.getBCHDigit(u.G18);return a<<12|s},getBCHDigit:function(a){for(var s=0;a!=0;)s++,a>>>=1;return s},getPatternPosition:function(a){return u.PATTERN_POSITION_TABLE[a-1]},getMask:function(a,s,d){switch(a){case l.PATTERN000:return(s+d)%2==0;case l.PATTERN001:return s%2==0;case l.PATTERN010:return d%3==0;case l.PATTERN011:return(s+d)%3==0;case l.PATTERN100:return(Math.floor(s/2)+Math.floor(d/3))%2==0;case l.PATTERN101:return s*d%2+s*d%3==0;case l.PATTERN110:return(s*d%2+s*d%3)%2==0;case l.PATTERN111:return(s*d%3+(s+d)%2)%2==0;default:throw new Error("bad maskPattern:"+a)}},getErrorCorrectPolynomial:function(a){for(var s=new i([1],0),d=0;d<a;d++)s=s.multiply(new i([1,r.gexp(d)],0));return s},getLengthInBits:function(a,s){if(1<=s&&s<10)switch(a){case e.MODE_NUMBER:return 10;case e.MODE_ALPHA_NUM:return 9;case e.MODE_8BIT_BYTE:return 8;case e.MODE_KANJI:return 8;default:throw new Error("mode:"+a)}else if(s<27)switch(a){case e.MODE_NUMBER:return 12;case e.MODE_ALPHA_NUM:return 11;case e.MODE_8BIT_BYTE:return 16;case e.MODE_KANJI:return 10;default:throw new Error("mode:"+a)}else if(s<41)switch(a){case e.MODE_NUMBER:return 14;case e.MODE_ALPHA_NUM:return 13;case e.MODE_8BIT_BYTE:return 16;case e.MODE_KANJI:return 12;default:throw new Error("mode:"+a)}else throw new Error("type:"+s)},getLostPoint:function(a){for(var s=a.getModuleCount(),d=0,n=0;n<s;n++)for(var t=0;t<s;t++){for(var c=0,p=a.isDark(n,t),f=-1;f<=1;f++)if(!(n+f<0||s<=n+f))for(var h=-1;h<=1;h++)t+h<0||s<=t+h||f==0&&h==0||p==a.isDark(n+f,t+h)&&c++;c>5&&(d+=3+c-5)}for(var n=0;n<s-1;n++)for(var t=0;t<s-1;t++){var m=0;a.isDark(n,t)&&m++,a.isDark(n+1,t)&&m++,a.isDark(n,t+1)&&m++,a.isDark(n+1,t+1)&&m++,(m==0||m==4)&&(d+=3)}for(var n=0;n<s;n++)for(var t=0;t<s-6;t++)a.isDark(n,t)&&!a.isDark(n,t+1)&&a.isDark(n,t+2)&&a.isDark(n,t+3)&&a.isDark(n,t+4)&&!a.isDark(n,t+5)&&a.isDark(n,t+6)&&(d+=40);for(var t=0;t<s;t++)for(var n=0;n<s-6;n++)a.isDark(n,t)&&!a.isDark(n+1,t)&&a.isDark(n+2,t)&&a.isDark(n+3,t)&&a.isDark(n+4,t)&&!a.isDark(n+5,t)&&a.isDark(n+6,t)&&(d+=40);for(var g=0,t=0;t<s;t++)for(var n=0;n<s;n++)a.isDark(n,t)&&g++;var b=Math.abs(100*g/s/s-50)/5;return d+=b*10,d}};return $e=u,$e}var We,mt;function dr(){if(mt)return We;mt=1;var e=ir(),i=sr(),r=ar(),l=lr(),u=Et();function a(d,n){this.typeNumber=d,this.errorCorrectLevel=n,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}var s=a.prototype;return s.addData=function(d){var n=new e(d);this.dataList.push(n),this.dataCache=null},s.isDark=function(d,n){if(d<0||this.moduleCount<=d||n<0||this.moduleCount<=n)throw new Error(d+","+n);return this.modules[d][n]},s.getModuleCount=function(){return this.moduleCount},s.make=function(){if(this.typeNumber<1){var d=1;for(d=1;d<40;d++){for(var n=i.getRSBlocks(d,this.errorCorrectLevel),t=new r,c=0,p=0;p<n.length;p++)c+=n[p].dataCount;for(var p=0;p<this.dataList.length;p++){var f=this.dataList[p];t.put(f.mode,4),t.put(f.getLength(),l.getLengthInBits(f.mode,d)),f.write(t)}if(t.getLengthInBits()<=c*8)break}this.typeNumber=d}this.makeImpl(!1,this.getBestMaskPattern())},s.makeImpl=function(d,n){this.moduleCount=this.typeNumber*4+17,this.modules=new Array(this.moduleCount);for(var t=0;t<this.moduleCount;t++){this.modules[t]=new Array(this.moduleCount);for(var c=0;c<this.moduleCount;c++)this.modules[t][c]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(d,n),this.typeNumber>=7&&this.setupTypeNumber(d),this.dataCache==null&&(this.dataCache=a.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,n)},s.setupPositionProbePattern=function(d,n){for(var t=-1;t<=7;t++)if(!(d+t<=-1||this.moduleCount<=d+t))for(var c=-1;c<=7;c++)n+c<=-1||this.moduleCount<=n+c||(0<=t&&t<=6&&(c==0||c==6)||0<=c&&c<=6&&(t==0||t==6)||2<=t&&t<=4&&2<=c&&c<=4?this.modules[d+t][n+c]=!0:this.modules[d+t][n+c]=!1)},s.getBestMaskPattern=function(){for(var d=0,n=0,t=0;t<8;t++){this.makeImpl(!0,t);var c=l.getLostPoint(this);(t==0||d>c)&&(d=c,n=t)}return n},s.createMovieClip=function(d,n,t){var c=d.createEmptyMovieClip(n,t),p=1;this.make();for(var f=0;f<this.modules.length;f++)for(var h=f*p,m=0;m<this.modules[f].length;m++){var g=m*p,b=this.modules[f][m];b&&(c.beginFill(0,100),c.moveTo(g,h),c.lineTo(g+p,h),c.lineTo(g+p,h+p),c.lineTo(g,h+p),c.endFill())}return c},s.setupTimingPattern=function(){for(var d=8;d<this.moduleCount-8;d++)this.modules[d][6]==null&&(this.modules[d][6]=d%2==0);for(var n=8;n<this.moduleCount-8;n++)this.modules[6][n]==null&&(this.modules[6][n]=n%2==0)},s.setupPositionAdjustPattern=function(){for(var d=l.getPatternPosition(this.typeNumber),n=0;n<d.length;n++)for(var t=0;t<d.length;t++){var c=d[n],p=d[t];if(this.modules[c][p]==null)for(var f=-2;f<=2;f++)for(var h=-2;h<=2;h++)f==-2||f==2||h==-2||h==2||f==0&&h==0?this.modules[c+f][p+h]=!0:this.modules[c+f][p+h]=!1}},s.setupTypeNumber=function(d){for(var n=l.getBCHTypeNumber(this.typeNumber),t=0;t<18;t++){var c=!d&&(n>>t&1)==1;this.modules[Math.floor(t/3)][t%3+this.moduleCount-8-3]=c}for(var t=0;t<18;t++){var c=!d&&(n>>t&1)==1;this.modules[t%3+this.moduleCount-8-3][Math.floor(t/3)]=c}},s.setupTypeInfo=function(d,n){for(var t=this.errorCorrectLevel<<3|n,c=l.getBCHTypeInfo(t),p=0;p<15;p++){var f=!d&&(c>>p&1)==1;p<6?this.modules[p][8]=f:p<8?this.modules[p+1][8]=f:this.modules[this.moduleCount-15+p][8]=f}for(var p=0;p<15;p++){var f=!d&&(c>>p&1)==1;p<8?this.modules[8][this.moduleCount-p-1]=f:p<9?this.modules[8][15-p-1+1]=f:this.modules[8][15-p-1]=f}this.modules[this.moduleCount-8][8]=!d},s.mapData=function(d,n){for(var t=-1,c=this.moduleCount-1,p=7,f=0,h=this.moduleCount-1;h>0;h-=2)for(h==6&&h--;;){for(var m=0;m<2;m++)if(this.modules[c][h-m]==null){var g=!1;f<d.length&&(g=(d[f]>>>p&1)==1);var b=l.getMask(n,c,h-m);b&&(g=!g),this.modules[c][h-m]=g,p--,p==-1&&(f++,p=7)}if(c+=t,c<0||this.moduleCount<=c){c-=t,t=-t;break}}},a.PAD0=236,a.PAD1=17,a.createData=function(d,n,t){for(var c=i.getRSBlocks(d,n),p=new r,f=0;f<t.length;f++){var h=t[f];p.put(h.mode,4),p.put(h.getLength(),l.getLengthInBits(h.mode,d)),h.write(p)}for(var m=0,f=0;f<c.length;f++)m+=c[f].dataCount;if(p.getLengthInBits()>m*8)throw new Error("code length overflow. ("+p.getLengthInBits()+">"+m*8+")");for(p.getLengthInBits()+4<=m*8&&p.put(0,4);p.getLengthInBits()%8!=0;)p.putBit(!1);for(;!(p.getLengthInBits()>=m*8||(p.put(a.PAD0,8),p.getLengthInBits()>=m*8));)p.put(a.PAD1,8);return a.createBytes(p,c)},a.createBytes=function(d,n){for(var t=0,c=0,p=0,f=new Array(n.length),h=new Array(n.length),m=0;m<n.length;m++){var g=n[m].dataCount,b=n[m].totalCount-g;c=Math.max(c,g),p=Math.max(p,b),f[m]=new Array(g);for(var v=0;v<f[m].length;v++)f[m][v]=255&d.buffer[v+t];t+=g;var y=l.getErrorCorrectPolynomial(b),I=new u(f[m],y.getLength()-1),E=I.mod(y);h[m]=new Array(y.getLength()-1);for(var v=0;v<h[m].length;v++){var _=v+E.getLength()-h[m].length;h[m][v]=_>=0?E.get(_):0}}for(var k=0,v=0;v<n.length;v++)k+=n[v].totalCount;for(var T=new Array(k),O=0,v=0;v<c;v++)for(var m=0;m<n.length;m++)v<f[m].length&&(T[O++]=f[m][v]);for(var v=0;v<p;v++)for(var m=0;m<n.length;m++)v<h[m].length&&(T[O++]=h[m][v]);return T},We=a,We}var we={},xt;function cr(){if(xt)return we;xt=1,Object.defineProperty(we,"__esModule",{value:!0});var e=Object.assign||function(t){for(var c=1;c<arguments.length;c++){var p=arguments[c];for(var f in p)Object.prototype.hasOwnProperty.call(p,f)&&(t[f]=p[f])}return t},i=It(),r=a(i),l=bt(),u=a(l);function a(t){return t&&t.__esModule?t:{default:t}}function s(t,c){var p={};for(var f in t)c.indexOf(f)>=0||Object.prototype.hasOwnProperty.call(t,f)&&(p[f]=t[f]);return p}var d={bgColor:r.default.oneOfType([r.default.object,r.default.string]).isRequired,bgD:r.default.string.isRequired,fgColor:r.default.oneOfType([r.default.object,r.default.string]).isRequired,fgD:r.default.string.isRequired,size:r.default.number.isRequired,title:r.default.string,viewBoxSize:r.default.number.isRequired,xmlns:r.default.string},n=(0,l.forwardRef)(function(t,c){var p=t.bgColor,f=t.bgD,h=t.fgD,m=t.fgColor,g=t.size,b=t.title,v=t.viewBoxSize,y=t.xmlns,I=y===void 0?"http://www.w3.org/2000/svg":y,E=s(t,["bgColor","bgD","fgD","fgColor","size","title","viewBoxSize","xmlns"]);return u.default.createElement("svg",e({},E,{height:g,ref:c,viewBox:"0 0 "+v+" "+v,width:g,xmlns:I}),b?u.default.createElement("title",null,b):null,u.default.createElement("path",{d:f,fill:p}),u.default.createElement("path",{d:h,fill:m}))});return n.displayName="QRCodeSvg",n.propTypes=d,we.default=n,we}var yt;function ur(){if(yt)return oe;yt=1,Object.defineProperty(oe,"__esModule",{value:!0}),oe.QRCode=void 0;var e=Object.assign||function(g){for(var b=1;b<arguments.length;b++){var v=arguments[b];for(var y in v)Object.prototype.hasOwnProperty.call(v,y)&&(g[y]=v[y])}return g},i=It(),r=p(i),l=kt(),u=p(l),a=dr(),s=p(a),d=bt(),n=p(d),t=cr(),c=p(t);function p(g){return g&&g.__esModule?g:{default:g}}function f(g,b){var v={};for(var y in g)b.indexOf(y)>=0||Object.prototype.hasOwnProperty.call(g,y)&&(v[y]=g[y]);return v}var h={bgColor:r.default.oneOfType([r.default.object,r.default.string]),fgColor:r.default.oneOfType([r.default.object,r.default.string]),level:r.default.string,size:r.default.number,value:r.default.string.isRequired},m=(0,d.forwardRef)(function(g,b){var v=g.bgColor,y=v===void 0?"#FFFFFF":v,I=g.fgColor,E=I===void 0?"#000000":I,_=g.level,k=_===void 0?"L":_,T=g.size,O=T===void 0?256:T,R=g.value,B=f(g,["bgColor","fgColor","level","size","value"]),A=new s.default(-1,u.default[k]);A.addData(R),A.make();var M=A.modules;return n.default.createElement(c.default,e({},B,{bgColor:y,bgD:M.map(function(F,W){return F.map(function(H,Q){return H?"":"M "+Q+" "+W+" l 1 0 0 1 -1 0 Z"}).join(" ")}).join(" "),fgColor:E,fgD:M.map(function(F,W){return F.map(function(H,Q){return H?"M "+Q+" "+W+" l 1 0 0 1 -1 0 Z":""}).join(" ")}).join(" "),ref:b,size:O,viewBoxSize:M.length}))});return oe.QRCode=m,m.displayName="QRCode",m.propTypes=h,oe.default=m,oe}ur();const pr=({isOpen:e,onClose:i,onSubmit:r,error:l,t:u})=>{const[a,s]=x.useState(""),[d,n]=x.useState(!1);if(!e)return null;const t=c=>{c.preventDefault(),n(!0),r(a),n(!1)};return o.jsx(Go,{children:o.jsx(Jo,{style:{maxWidth:"400px"},children:o.jsxs("div",{style:{padding:"20px"},children:[o.jsx("h3",{style:{margin:"0 0 20px 0",textAlign:"center"},children:u("Enter Password")}),o.jsxs("form",{onSubmit:t,children:[o.jsxs("div",{style:{marginBottom:"20px"},children:[o.jsx("input",{type:"password",value:a,onChange:c=>s(c.target.value),placeholder:u("Password"),style:{width:"100%",padding:"10px",borderRadius:"4px",border:l?"1px solid #d32f2f":"1px solid #ccc",fontSize:"16px"},required:!0}),l&&o.jsx("div",{style:{color:"#d32f2f",fontSize:"14px",marginTop:"5px",padding:"5px"},children:l})]}),o.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[o.jsx("button",{type:"button",onClick:i,style:{padding:"10px 16px",backgroundColor:"#f3f4f6",border:"none",borderRadius:"4px",cursor:"pointer",fontSize:"14px"},children:u("Cancel")}),o.jsx("button",{type:"submit",disabled:d||!a,style:{padding:"10px 16px",backgroundColor:"#006adc",color:"white",border:"none",borderRadius:"4px",cursor:a?"pointer":"not-allowed",opacity:a?1:.7,fontSize:"14px"},children:u(d?"Submitting...":"Submit")})]})]})]})})})},fr=({addPhotosToAlbum:e,saveAlbum:i,promptForPassword:r,showingEnterPassword:l,passwordPolicy:u,usingFolderInviteGrantsRightToAddItems:a,t:s})=>{const[d,n]=x.useState(!1),[t,c]=x.useState(!1),p=x.useRef(null),f=840;x.useEffect(()=>{c(window.innerWidth<f);const b=()=>{c(window.innerWidth<f)};return window.addEventListener("resize",b),()=>window.removeEventListener("resize",b)},[]);const h=()=>{n(!d)},m=()=>{n(!1)},g=b=>{b(),m()};return x.useEffect(()=>{const b=y=>{p.current&&!p.current.contains(y.target)&&n(!1)},v=()=>{n(!1)};return d&&(document.addEventListener("mousedown",b),window.addEventListener("scroll",v)),()=>{document.removeEventListener("mousedown",b),window.removeEventListener("scroll",v)}},[d]),t?o.jsxs("div",{ref:p,style:{position:"relative",display:"flex",alignItems:"center",justifyContent:"flex-end",width:"100%",flexWrap:"nowrap"},children:[!l&&o.jsxs("div",{style:{flexShrink:0},children:[o.jsxs(wt,{onClick:h,"aria-label":s("Menu"),"aria-expanded":d,children:[o.jsxs(Ct,{children:[o.jsx(ne,{}),o.jsx(ne,{}),o.jsx(ne,{})]}),s("Save")]}),d&&o.jsxs(Pt,{children:[a&&o.jsx(Z,{onClick:()=>g(e),children:s("Add Photos To Album")}),o.jsx(Z,{onClick:()=>g(i),children:s("Save To My Library")}),o.jsx(Z,{onClick:()=>g(i),children:s("Download To My Device")})]})]}),l&&u&&u!=="NoPassword"&&o.jsx("div",{style:{flexShrink:0},children:o.jsx(nt,{onClick:r,children:s("Enter Password")})})]}):o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"20px",justifyContent:"flex-end",flexWrap:"nowrap"},children:[!l&&o.jsxs("div",{style:{display:"flex",gap:"20px",flexWrap:"nowrap"},children:[a&&o.jsx($,{onClick:e,children:s("Add Photos")}),o.jsx($,{onClick:i,children:s("Save To My Library")}),o.jsx($,{onClick:i,children:s("Download To My Device")})]}),l&&o.jsx("div",{children:o.jsx(nt,{onClick:r,children:s("Enter Password")})})]})},He=new wo({region:Jt});function vt(e){const i=e.trim().toLowerCase(),r="@gmail.com";return i.endsWith(r)?`${i.slice(0,-r.length).replace(/\./g,"")}${r}`:i}const hr=({isOpen:e,onClose:i,onLoginSuccess:r,t:l})=>{const[u,a]=x.useState(""),[s,d]=x.useState(!1),[n,t]=x.useState(""),[c,p]=x.useState(""),[f,h]=x.useState("idle"),[m,g]=x.useState(""),b=x.useRef(null),v=x.useRef(null);x.useEffect(()=>{s&&v.current&&v.current.focus()},[s]),x.useEffect(()=>{e&&b.current&&!s&&b.current.focus()},[e,s]);function y(k){const T=k.target.value;/^\d*$/.test(T)&&T.length<=6&&t(T)}async function I(){var T;h("sending"),g("");const k=vt(u);if(!k||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(k)){h("error"),g(l("Please enter a valid email address"));return}try{const O=new Co({ClientId:Re,Username:k,Password:crypto.randomUUID(),UserAttributes:[{Name:"email",Value:k}]});try{await He.send(O)}catch(A){if(!((T=A.name)!=null&&T.includes("UsernameExistsException")))throw A}const R=new Po({ClientId:Re,AuthFlow:"CUSTOM_AUTH",AuthParameters:{USERNAME:k}}),B=await He.send(R);if(B.Session)p(B.Session),d(!0),h("idle");else throw new Error("No session returned from InitiateAuth")}catch(O){console.error(O),h("error"),g(l("Unable to send verification code. Please try again later."))}}async function E(){var T,O,R,B,A,M;h("verifying"),g("");const k=vt(u);try{const F=new So({ClientId:Re,ChallengeName:"CUSTOM_CHALLENGE",ChallengeResponses:{USERNAME:k,ANSWER:n},Session:c}),H=(T=(await He.send(F)).AuthenticationResult)==null?void 0:T.IdToken;if(!H)throw new Error("No token received");localStorage.setItem("idToken",H);const fe=`${JSON.parse(atob(H.split(".")[1]))["cognito:username"]}_____Public____Profile`,ee=await(await fetch(pe,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${H}`},body:JSON.stringify({query:`
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
          `,variables:{relationIds:[fe]}})})).json(),he=(M=(A=(B=(R=(O=ee==null?void 0:ee.data)==null?void 0:O.batchGetItems)==null?void 0:R.items)==null?void 0:B[0])==null?void 0:A.item)==null?void 0:M.anyDisplayName;he&&localStorage.setItem("publicUsername",he),h("idle"),r(),i()}catch(F){console.error(F),h("error"),g(l("Invalid or expired verification code. Please try again or request a new code."))}}function _(){d(!1),t(""),h("idle")}return e?o.jsx("div",{style:{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',backgroundColor:"rgba(0, 0, 0, 0.5)",position:"fixed",top:0,left:0,right:0,bottom:0,display:"flex",alignItems:"center",justifyContent:"center",zIndex:1e3},children:o.jsxs("div",{style:{maxWidth:400,width:"100%",background:"#ffffff",padding:"32px",borderRadius:"12px",boxShadow:"0 6px 20px rgba(0,0,0,0.06)",textAlign:"center"},children:[o.jsxs("div",{style:{marginBottom:"24px"},children:[o.jsx("img",{src:"images/logo_no_background.png",alt:"6180 Logo",style:{height:"60px",marginBottom:"16px"}}),o.jsx("h2",{style:{fontSize:"24px",fontWeight:600,color:"#333"},children:l("Sign in to 6180")})]}),m&&o.jsx("div",{style:{backgroundColor:"#f8d7da",color:"#721c24",padding:"10px",borderRadius:"6px",marginBottom:"16px",fontSize:"14px"},children:m}),s?o.jsxs(o.Fragment,{children:[o.jsxs("p",{style:{marginBottom:"16px",color:"#555"},children:[l("Check your email for a 6-digit verification code sent to")," ",o.jsx("strong",{children:u})]}),o.jsx("input",{ref:v,type:"tel",inputMode:"numeric",pattern:"[0-9]*",maxLength:6,value:n,onChange:y,placeholder:l("Enter 6-digit code"),style:{width:"100%",padding:"12px",marginBottom:"16px",borderRadius:"6px",border:"1px solid #ccc",fontSize:"16px",boxSizing:"border-box",letterSpacing:"2px",textAlign:"center"}}),o.jsx("button",{onClick:E,disabled:f==="verifying"||n.length!==6,style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#28a745",color:"#fff",border:"none",borderRadius:"6px",cursor:f==="verifying"||n.length!==6?"not-allowed":"pointer",opacity:f==="verifying"||n.length!==6?.7:1},children:l(f==="verifying"?"Verifying...":"Verify Code")}),o.jsxs("div",{style:{marginTop:"16px",fontSize:"14px",color:"#666",display:"flex",justifyContent:"center",gap:"8px"},children:[o.jsx("span",{children:l("Didn't receive a code?")}),o.jsx("button",{onClick:_,style:{background:"none",border:"none",color:"#007bff",padding:0,cursor:"pointer",fontSize:"14px",textDecoration:"underline"},children:l("Send new code")})]}),o.jsx("button",{onClick:i,style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#f8f9fa",color:"#555",border:"1px solid #ccc",borderRadius:"6px",cursor:"pointer",marginTop:"12px"},children:l("Cancel")})]}):o.jsxs(o.Fragment,{children:[o.jsx("input",{ref:b,type:"email",value:u,onChange:k=>a(k.target.value),placeholder:l("Enter your email"),style:{width:"100%",padding:"12px",marginBottom:"16px",borderRadius:"6px",border:"1px solid #ccc",fontSize:"16px",boxSizing:"border-box"}}),o.jsx("button",{onClick:I,disabled:f==="sending"||!u.trim(),style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#007bff",color:"#fff",border:"none",borderRadius:"6px",cursor:f==="sending"||!u.trim()?"not-allowed":"pointer",opacity:f==="sending"||!u.trim()?.7:1},children:l(f==="sending"?"Sending...":"Send Verification Code")}),o.jsx("p",{style:{fontSize:"13px",color:"#666",marginTop:"16px",textAlign:"center"},children:l("We'll send a secure verification code to your email")}),o.jsx("button",{onClick:i,style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#f8f9fa",color:"#555",border:"1px solid #ccc",borderRadius:"6px",cursor:"pointer",marginTop:"12px"},children:l("Cancel")})]})]})}):null},Ce=(e,i,r,l,u=!1)=>{r&&(r.style.width=`${e}%`,u&&(r.style.backgroundColor="#f44336")),i&&(i.textContent=l,u&&(i.style.color="#f44336"))},re=(e,i,r,l)=>{var u;if(l&&(l.style.width="100%",l.style.backgroundColor="#f44336"),r&&(r.textContent="Error registering album",r.style.color="#f44336"),e){e.textContent=i,e.style.display="block";const a=document.createElement("button");a.textContent="Retry",a.style.marginTop="15px",a.style.padding="8px 16px",a.style.backgroundColor="#2196f3",a.style.color="white",a.style.border="none",a.style.borderRadius="4px",a.style.cursor="pointer",a.onclick=function(){const n=e.closest('div[style*="position: fixed"]');n&&n.parentNode&&n.parentNode.removeChild(n),setTimeout(()=>{window.location.reload()},500)};const s=document.createElement("button");s.textContent="Close",s.style.marginTop="15px",s.style.marginLeft="10px",s.style.padding="8px 16px",s.style.backgroundColor="#757575",s.style.color="white",s.style.border="none",s.style.borderRadius="4px",s.style.cursor="pointer",s.onclick=function(){const n=e.closest('div[style*="position: fixed"]');n&&n.parentNode&&n.parentNode.removeChild(n)};const d=document.createElement("div");d.appendChild(a),d.appendChild(s),(u=e.parentNode)==null||u.appendChild(d)}},gr=e=>{const[i,r]=x.useState(!1),[l,u]=x.useState(""),[a,s]=x.useState(""),[d,n]=x.useState(!1),[t,c]=x.useState(!1),p=x.useCallback(m=>{const g=/^[a-zA-Z0-9-]+$/.test(m);return console.log(`Username validation for '${m}': ${g}`),g},[]),f=x.useCallback(async(m,g)=>{var I,E;console.log(`Submitting username: ${m}`),c(!0),s("");const b=await Pe();if(!b){s(e("Authentication error. Please try again.")),c(!1);return}const v=`
      mutation MyMutation($savePublicProfileDisplayNameInput: SavePublicProfileDisplayNameInput) {
        changeMyAccountItem(savePublicProfileDisplayNameInput: $savePublicProfileDisplayNameInput) {
          ... on Profile {
            anyDisplayName
          }
        }
      }
    `,y={savePublicProfileDisplayNameInput:{anyDisplayName:m}};try{const k=await(await fetch(pe,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${b}`},body:JSON.stringify({query:v,variables:y})})).json(),T=(E=(I=k==null?void 0:k.data)==null?void 0:I.changeMyAccountItem)==null?void 0:E.anyDisplayName;if(T)g(T);else throw new Error("Username taken")}catch(_){console.error(`Error submitting username: ${_}`),s(e("Username is already taken. Please try a different one.")),n(!0),c(!1)}},[e]),h=x.useCallback(m=>{const g=Math.floor(1e5+Math.random()*9e5).toString(),b=`${l}${g}`;console.log(`Appending random digits to username: ${l} -> ${b}`),u(b),f(b,m)},[l,f]);return{showUsernamePrompt:i,setShowUsernamePrompt:r,usernameInput:l,setUsernameInput:u,usernameError:a,setUsernameError:s,showAltButton:d,setShowAltButton:n,isSubmittingUsername:t,setIsSubmittingUsername:c,validateUsername:p,submitUsername:f,appendRandomDigits:h}},mr=()=>{const e=x.useRef(null),[i,r]=x.useState([]),[l,u]=x.useState(!1),[a,s]=x.useState(!1),[d,n]=x.useState({totalFiles:0,filesComplete:0,filesUploading:0,filesProcessing:0,filesWithError:0,overallProgress:0}),t=lo(()=>{});return x.useEffect(()=>{Qe(i,n)},[i]),{fileInputRef:e,selectedPhotos:i,setSelectedPhotos:r,isUploading:l,setIsUploading:u,fileProcessingComplete:a,setFileProcessingComplete:s,progressTracker:d,setProgressTracker:n,log:t}},xr=()=>{const[e,i]=x.useState(null),[r,l]=x.useState({}),u=x.useCallback(t=>{i(t),l(c=>({...c,[t]:!0})),document.body.style.overflow="hidden"},[]),a=x.useCallback(()=>{i(null),document.body.style.overflow=""},[]),s=x.useCallback(()=>{e!==null&&e>0&&(i(e-1),l(t=>({...t,[e-1]:!0})))},[e]),d=x.useCallback(t=>{e!==null&&e<t-1&&(i(e+1),l(c=>({...c,[e+1]:!0})))},[e]),n=x.useCallback((t,c,p)=>{if(c){const f=[...c.mediaItems];f[t]={...f[t],loaded:!0},p({...c,mediaItems:f}),l(h=>{const m={...h};return delete m[t],m})}},[]);return{fullscreenItem:e,setFullscreenItem:i,loadingFullResolution:r,setLoadingFullResolution:l,openFullscreenView:u,closeFullscreenView:a,goToPrevItem:s,goToNextItem:d,handleFullResolutionLoaded:n}},yr=()=>{const[e,i]=x.useState(!1),[r,l]=x.useState(new Set),u=x.useCallback((s,d)=>{d.stopPropagation(),l(n=>{const t=new Set(n);return t.has(s)?t.delete(s):t.add(s),t})},[]),a=x.useCallback(()=>{i(!1),l(new Set)},[]);return{isSelectionMode:e,setIsSelectionMode:i,selectedItems:r,setSelectedItems:l,toggleItemSelection:u,cancelSelection:a}},vr=()=>{const[e,i]=x.useState(void 0),[r,l]=x.useState(!1),[u,a]=x.useState(!1),[s,d]=x.useState(null),[n,t]=x.useState(!1),c=x.useCallback(()=>!e||r||e==="NoPassword"?!0:e==="NotVisible"?(s&&console.error("Password error:",s),!1):!0,[e,r,s]),p=x.useCallback(()=>{const m=(s==null?void 0:s.toLowerCase().includes("watermark"))??!1;return!r&&e==="Watermark"||m},[r,e,s]),f=x.useCallback(()=>!r&&e!==void 0&&e!=="NoPassword",[r,e]),h=x.useCallback(()=>{d(null),a(!0)},[]);return{passwordPolicy:e,setPasswordPolicy:i,isAuthorized:r,setIsAuthorized:l,showPasswordModal:u,setShowPasswordModal:a,passwordError:s,setPasswordError:d,passwordVerified:n,setPasswordVerified:t,shouldShowContent:c,shouldShowWatermark:p,showingEnterPassword:f,promptForPassword:h}},br=(e,i,r,l)=>{const[u,a]=x.useState(!1),[s,d]=x.useState(!1),[n,t]=x.useState(!1),[c,p]=x.useState([]);x.useEffect(()=>{if(e&&e.profileIds&&r){const g=`${r}_____Public____Profile`;p(e.profileIds),t(e.profileIds.includes(g))}},[e,r]);const f=x.useCallback(()=>i?`https://6180.io/photos.html?id=${Zt(i).replace(/-/g,"")}`:"",[i]),h=x.useCallback(()=>{const g=f();navigator.clipboard.writeText(g).then(()=>{a(!1),d(!0)}).catch(b=>{console.error("Failed to copy link:",b),alert(l("Failed to copy link"))})},[f,l]),m=x.useCallback(async()=>{var g,b,v;if(!r||!i){alert(l("You must be logged in to perform this action"));return}try{const y=await Pe();if(!y){console.error("Authentication failed");return}const I=`${r}_____Public____Profile`,E=[...c];if(n){const B=E.indexOf(I);B>-1&&E.splice(B,1)}else E.push(I);const T=await(await fetch(pe,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${y}`},body:JSON.stringify({query:`
        mutation ChangeAlbumVisibility($folderPositionChangeProfileIdsInput: FolderPositionChangeProfileIdsInput!) {
          changeFiles(folderPositionChangeProfileIdsInput: $folderPositionChangeProfileIdsInput) {
            items {
              ... on FolderPosition {
                id
                profileIds
              }
            }
          }
        }
      `,variables:{folderPositionChangeProfileIdsInput:{folderId:i,profileIds:E}}})})).json();if(T.errors)throw new Error(((g=T.errors[0])==null?void 0:g.message)||"Unknown error");const R=(((v=(b=T==null?void 0:T.data)==null?void 0:b.changeFiles)==null?void 0:v.items)||[]).find(B=>B.folderPositionId===(e==null?void 0:e.folderPositionId));R&&R.profileIds&&(p(R.profileIds),t(R.profileIds.includes(I)),console.log("Album visibility updated successfully"))}catch(y){console.error("Failed to toggle album visibility:",y),alert(l("Failed to update album visibility. Please try again."))}},[r,i,c,n,e,l]);return{showingCopyLinkAlert:u,setShowingCopyLinkAlert:a,showingCopiedLinkAlert:s,setShowingCopiedLinkAlert:d,isOnPublicProfile:n,handleCopy:h,handlePublicProfileToggle:m,generateInviteLink:f}},wr=({t:e,language:i,usernameManager:r,onSuccess:l})=>{const{showUsernamePrompt:u,setShowUsernamePrompt:a,usernameInput:s,setUsernameInput:d,usernameError:n,validateUsername:t,submitUsername:c,showAltButton:p,appendRandomDigits:f,isSubmittingUsername:h}=r,m=g=>{console.log(`Username successfully updated to: ${g}`),localStorage.setItem("publicUsername",g),a(!1),l(g)};return u?o.jsx(fo,{children:o.jsxs(ho,{isRTL:ue(i)==="rtl",children:[o.jsx(go,{children:e("Enter Username")}),o.jsx(mo,{children:e("Username should contain only letters, numbers and hyphens. Example: john-doe2")}),o.jsx(xo,{value:s,onChange:g=>d(g.target.value),isRTL:ue(i)==="rtl"}),n&&o.jsx(yo,{children:n}),o.jsx(vo,{disabled:h,onClick:()=>{if(!t(s)){r.setUsernameError(e("Username must contain only letters, numbers, and hyphens."));return}c(s,m)},children:e("Select Username")}),p&&o.jsx(bo,{disabled:h,onClick:()=>f(m),children:e("Add Random Digits to Username")})]})}):null},Cr=({item:e,index:i,isSelectionMode:r,isSelected:l,toggleItemSelection:u,openFullscreenView:a,showWatermark:s,ownerName:d})=>o.jsxs("div",{style:{position:"relative",border:r&&l?"3px solid #006adc":void 0,borderRadius:"8px",overflow:"hidden",boxShadow:r&&l?"0 0 0 3px rgba(0, 106, 220, 0.3)":void 0},onClick:n=>r?u(i,n):a(i),children:[r&&o.jsx(Xo,{isSelected:l,onClick:n=>u(i,n),children:l&&o.jsx(er,{children:"✓"})}),e.type==="image"?o.jsx(qe,{src:e.url,thumbnailSrc:e.thumbnailUrl,alt:`Album image ${i+1}`,loadFullResolution:!1,onFullResolutionLoaded:()=>{},onClick:()=>r?void 0:a(i),showWatermark:s}):o.jsx(tr,{thumbnailUrl:e.thumbnailUrl||"",videoUrl:e.url,duration:e.duration||"0:00",index:i,onFullResolutionLoaded:()=>{},onClick:()=>r?void 0:a(i),showWatermark:s}),d&&o.jsx($o,{children:d})]},i),Pr=({isLoading:e,error:i,albumData:r,columns:l,shouldShowContent:u,shouldShowWatermark:a,isSelectionMode:s,selectedItems:d,toggleItemSelection:n,openFullscreenView:t,t:c})=>e?o.jsx(Qo,{id:"loading-message",children:c("Loading album content...")}):i?o.jsx(Ae,{children:i}):u()?!r||r.mediaItems.length===0?o.jsx(Ae,{children:c("No media found in this album")}):o.jsx(Oo,{id:"media-grid",columns:l,children:r.mediaItems.map((p,f)=>{const h=p.ownerContactId&&r.contacts[p.ownerContactId]?r.contacts[p.ownerContactId]:"",m=d.has(f),g=a();return o.jsx(Cr,{item:p,index:f,isSelectionMode:s,isSelected:m,toggleItemSelection:n,openFullscreenView:t,showWatermark:g,ownerName:h},f)})}):o.jsx("div",{style:{gridColumn:"1 / -1",textAlign:"center",padding:"40px 0"},children:o.jsx(Ae,{children:c("Enter the password to view album contents")})}),Sr=({t:e,isSelectionMode:i,selectedItems:r,shareSelection:l,cancelSelection:u,createSubalbum:a,showingEnterPassword:s,promptForPassword:d,passwordPolicy:n,isAuthorized:t,addPhotosToAlbum:c,saveAlbumDirectly:p,handleDownloadPhotos:f,handleCopyLink:h,handlePublicProfileToggle:m,isOnPublicProfile:g,albumData:b,columns:v,changeColumns:y})=>{const[I,E]=x.useState(!1),[_,k]=x.useState(!1),T=x.useRef(null),O=840;x.useEffect(()=>{k(window.innerWidth<O);const M=()=>{k(window.innerWidth<O)};return window.addEventListener("resize",M),()=>window.removeEventListener("resize",M)},[]);const R=()=>{E(!I)},B=()=>{E(!1)},A=M=>{M(),B()};return x.useEffect(()=>{const M=W=>{T.current&&!T.current.contains(W.target)&&E(!1)},F=()=>{E(!1)};return I&&(document.addEventListener("mousedown",M),window.addEventListener("scroll",F)),()=>{document.removeEventListener("mousedown",M),window.removeEventListener("scroll",F)}},[I]),o.jsx(To,{children:o.jsxs(jo,{children:[o.jsx(Yo,{children:i?o.jsxs("div",{style:{display:"flex",gap:"16px"},children:[o.jsxs($,{onClick:l,disabled:r.size===0,style:{opacity:r.size===0?.5:1,backgroundColor:r.size>0?"#006adc":void 0,color:r.size>0?"white":void 0},children:[e("Create Sub-album")," (",r.size,")"]}),o.jsx($,{onClick:u,children:e("Cancel")})]}):o.jsxs("div",{style:{display:"flex",justifyContent:"space-between",width:"100%",flexWrap:"nowrap",alignItems:"center"},children:[o.jsx("div",{style:{flexShrink:0},children:!s()&&o.jsx(Ro,{onClick:a,children:e("Create Sub-album")})}),o.jsxs("div",{style:{marginLeft:"auto",display:"flex",alignItems:"center"},children:[!i&&!t&&n&&n!=="NoPassword"&&o.jsx($,{onClick:d,children:e("Enter Password")}),!i&&!(!t&&n&&n!=="NoPassword")&&(b!=null&&b.folderPositionId?o.jsx("div",{ref:T,style:{position:"relative",display:"flex",alignItems:"center",justifyContent:"flex-end",flexWrap:"nowrap"},children:_?o.jsxs(o.Fragment,{children:[o.jsxs(wt,{onClick:R,"aria-label":e("Menu"),"aria-expanded":I,children:[o.jsxs(Ct,{children:[o.jsx(ne,{}),o.jsx(ne,{}),o.jsx(ne,{})]}),e("Actions")]}),I&&o.jsxs(Pt,{children:[o.jsx(Z,{onClick:()=>A(c),children:e("Add Photos")}),o.jsx(Z,{onClick:()=>A(f),children:e("Download")}),o.jsx(Z,{onClick:()=>A(h),children:e("Copy Link")}),o.jsx(Z,{onClick:()=>A(m),children:e(g?"Remove from Public Profile":"Add to Public Profile")})]})]}):o.jsxs("div",{style:{display:"flex",gap:"10px",flexWrap:"nowrap"},children:[o.jsx($,{onClick:c,children:e("Add Photos")}),o.jsx($,{onClick:f,children:e("Download")}),o.jsx($,{onClick:h,children:e("Copy Link")}),o.jsx($,{onClick:m,style:{backgroundColor:g?"#4caf50":"#e0e0e0",color:g?"white":"inherit"},children:e(g?"On Public Profile":"Not On Public Profile")})]})}):o.jsx(fr,{addPhotosToAlbum:c,saveAlbum:p,downloadPhotos:f,promptForPassword:d,showingEnterPassword:s(),passwordPolicy:n,usingFolderInviteGrantsRightToAddItems:b==null?void 0:b.usingFolderInviteGrantsRightToAddItems,t:e}))]})]})}),o.jsxs(Ao,{children:[o.jsx(qo,{htmlFor:"columns",id:"columns-label",children:o.jsx("strong",{children:e("Columns:")})}),o.jsxs(Vo,{id:"columns",value:v,onChange:M=>y(M.target.value),children:[o.jsx("option",{value:"1",children:"1"}),o.jsx("option",{value:"2",children:"2"}),o.jsx("option",{value:"3",children:"3"}),o.jsx("option",{value:"4",children:"4"}),o.jsx("option",{value:"5",children:"5"})]})]})]})})},Ir=({albumData:e,t:i})=>!e||Object.keys(e.contacts).length===0?null:o.jsx("div",{style:{width:"100%",backgroundColor:"#f0f7ff",borderRadius:"8px",padding:"16px",marginBottom:"20px",boxShadow:"0 2px 4px rgba(0,0,0,0.1)",border:"1px solid #d0e1f9"},children:o.jsxs("p",{style:{margin:"0",fontSize:"15px",color:"#333",textAlign:"left"},children:[i('Click "Save" to create a memory with '),o.jsx("strong",{children:Object.values(e.contacts).filter(r=>!r.toString().startsWith("Profile-")).join(", ")}),i(" that you can filter for later")]})}),kr=({showSelectPhotosButton:e,albumData:i,openFilePicker:r,t:l})=>!e||!(i!=null&&i.usingFolderInviteGrantsRightToAddItems)?null:o.jsx("div",{style:{width:"100%",display:"flex",justifyContent:"center",marginBottom:"20px",marginTop:"10px"},children:o.jsx("button",{onClick:r,style:{backgroundColor:"#007bff",color:"white",border:"none",borderRadius:"6px",padding:"12px 20px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"8px",fontSize:"16px",boxShadow:"0 2px 4px rgba(0,0,0,0.1)"},children:o.jsx("span",{children:l("Select Photos To Add To Album")})})}),Tr=({albumData:e,t:i})=>e?o.jsxs(o.Fragment,{children:[e.folderName&&e.folderName!==i("Photos")&&e.folderName.trim()!==""&&o.jsx(Lo,{id:"album-title",children:o.jsx(_o,{children:e.folderName})}),e.folderDescription&&e.folderDescription.trim()!==""&&o.jsx(Mo,{id:"description-container",children:o.jsx(No,{children:e.folderDescription})})]}):null,jr=({isAuthorized:e,passwordPolicy:i,passwordError:r,promptForPassword:l,t:u})=>e||i!=="NotVisible"?null:o.jsxs("div",{style:{padding:"20px",backgroundColor:"#f3f4f6",borderRadius:"8px",textAlign:"center",marginBottom:"20px"},children:[o.jsx("h3",{children:u("This album is password protected")}),o.jsx("p",{children:u("Please enter the password to view the contents")}),r&&o.jsx("div",{style:{color:"#d32f2f",fontSize:"14px",margin:"10px 0",padding:"5px",backgroundColor:"rgba(211, 47, 47, 0.1)",borderRadius:"4px"},children:r}),o.jsx("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"10px"},children:o.jsx($,{onClick:l,children:u("Enter Password")})})]}),Er=({isSelectionMode:e,t:i})=>e?o.jsx(Zo,{children:o.jsx("p",{children:i("Select photos and videos to create a sub-album to share")})}):null,Rr=()=>{const{t:e,language:i}=ke(),r=mr(),l=xr(),u=yr(),a=vr(),s=gr(e),[d,n]=x.useState("1"),[t,c]=x.useState(null),[p,f]=x.useState(!0),[h,m]=x.useState(null),[g,b]=x.useState(null),[v,y]=x.useState(!1),[I,E]=x.useState(!1),[_,k]=x.useState(null),[T,O]=x.useState(!1),{passwordPolicy:R,setPasswordPolicy:B,isAuthorized:A,setIsAuthorized:M,showPasswordModal:F,setShowPasswordModal:W,passwordError:H,setPasswordError:Q,passwordVerified:Ve,setPasswordVerified:fe,shouldShowContent:Ge,shouldShowWatermark:ee,showingEnterPassword:he,promptForPassword:ie}=a,{fileInputRef:Te,selectedPhotos:se,setSelectedPhotos:Je,isUploading:Rt,setIsUploading:ge,fileProcessingComplete:Ke,setFileProcessingComplete:je,progressTracker:ae,log:J}=r,{fullscreenItem:te,openFullscreenView:Ye,closeFullscreenView:At,goToPrevItem:Lt,goToNextItem:_t}=l,{isSelectionMode:me,setIsSelectionMode:Bt,selectedItems:le,toggleItemSelection:Mt,cancelSelection:Nt}=u,G=br(t,g,_,e),Ot=async w=>{if(Q(null),w.trim()===""){Q(e("Password cannot be empty"));return}const P=t==null?void 0:t.actualPassword;if(!P)if(t!=null&&t.hasPassword){Q(e("Unable to validate password. Please try again later."));return}else{M(!0),W(!1);return}if(w!==P){Q(e("Invalid password. Please try again."));return}if(!await X()){W(!1),fe(!0),y(!0);return}M(!0),W(!1),Q(null),xe()},Ut=w=>{n(w),localStorage.setItem("columns",w)},Xe=()=>{Te.current&&Te.current.click()},zt=async()=>{const w=await X();if(!w){O(!0),y(!0);return}if(!_)try{const S=JSON.parse(atob(w.split(".")[1]))["cognito:username"];k(S)}catch(P){console.error("Failed to decode token",P)}je(!1),Xe()},Dt=async()=>{y(!1);const w=await X();if(w)try{const S=JSON.parse(atob(w.split(".")[1]))["cognito:username"];k(S),Ve&&(M(!0),fe(!1)),T&&(localStorage.setItem("selectPhotosButtonTimestamp",Date.now().toString()),O(!1)),xe();return}catch(P){console.error("Failed to decode token",P)}},Ft=async w=>{const P=Array.from(w.target.files||[]);if(!P.length)return;localStorage.removeItem("selectPhotosButtonTimestamp"),E(!1),ge(!0),je(!1);const S=await Pe();if(!S){J("❌ Authentication failed"),ge(!1),y(!0);return}try{const j=JSON.parse(atob(S.split(".")[1]))["cognito:username"];if(!j){J("❌ Missing Cognito Username"),ge(!1);return}k(j);const U=g||`${j}_____${oo()}____Folder`;J(`📁 Using folder ID: ${U}`),Je(P.map(z=>({fileName:z.name,s3PreviewUrl:URL.createObjectURL(z),type:z.type,size:z.size,status:"pending",progress:0})));const D=co(Je),N=setInterval(()=>{Qe(se,r.setProgressTracker)},500),q=await uo(P,j,D,J);clearInterval(N),Qe(q,r.setProgressTracker),localStorage.setItem(et.SELECTED_PHOTOS,JSON.stringify(q)),J(`📸 Saved ${q.length} photos metadata to storage`);const de=q.every(z=>z.status==="complete"),Y=q.some(z=>z.status==="error");if(de&&!Y)J(`✅ All ${q.length} files successfully uploaded`);else if(Y){const z=q.filter(ye=>ye.status==="error").length;J(`⚠️ Upload completed with ${z} errors`)}setTimeout(()=>{je(!0)},1e3)}catch(L){J(`❌ Fatal error in handleFileSelection: ${String(L)}`),ge(!1)}finally{w.target&&(w.target.value="")}},xe=async()=>{console.log("Starting album registration");const w=document.createElement("div");w.style.position="fixed",w.style.top="0",w.style.left="0",w.style.width="100%",w.style.height="100%",w.style.backgroundColor="rgba(0, 0, 0, 0.5)",w.style.display="flex",w.style.justifyContent="center",w.style.alignItems="center",w.style.zIndex="2000";const P=document.createElement("div");P.style.backgroundColor="white",P.style.padding="30px",P.style.borderRadius="8px",P.style.textAlign="center";const S=document.createElement("p");S.id="saveProgressText",S.textContent=e("Registering album...");const L=document.createElement("div");L.style.backgroundColor="#f0f0f0",L.style.borderRadius="4px",L.style.overflow="hidden",L.style.height="8px",L.style.marginTop="10px";const j=document.createElement("div");j.id="saveProgress",j.style.backgroundColor="#4caf50",j.style.height="100%",j.style.width="5%",j.style.transition="width 0.3s ease";const U=document.createElement("p");U.id="saveErrorText",U.style.color="#f44336",U.style.display="none",U.style.marginTop="10px",U.style.fontSize="14px",L.appendChild(j),P.appendChild(S),P.appendChild(L),P.appendChild(U),w.appendChild(P),document.body.appendChild(w);try{const D=await Pe();if(!D){console.error("No token available for registering album"),document.body.removeChild(w);return}if(!JSON.parse(atob(D.split(".")[1]))["cognito:username"]){console.error("Missing username in token"),re(U,"Could not retrieve username from token",S,j);return}if(!g){console.error("No folder ID available"),re(U,"Folder ID is missing",S,j);return}if(!t||!t.mediaItems){console.error("No album data available"),re(U,"Album data is missing or incomplete",S,j);return}if(t.mediaItems.length===0){console.error("No media items to save"),re(U,"No media items in album to save",S,j);return}const de=Math.floor(Date.now()/1e3);Ce(30,S,j,e("Preparing album data..."));const Y={currentTime:de,folderId:g,profileIds:["Only Me_____Only Me____Profile"],folderPositionSelectedTagInputs:[],folderPositionPoints:1};console.log("Folder position input:",Y),Ce(50,S,j,e("Saving album..."));const z=`
        mutation SaveAlbum(
          $folderPositionInputs: [FolderPositionInput!]
        ) {
          changeFiles(folderPositionInputs: $folderPositionInputs) {
            items { id }
          }
        }
      `,ye={folderPositionInputs:[Y]};console.log("GraphQL mutation variables:",JSON.stringify(ye));try{const K=await fetch(pe,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${D}`},body:JSON.stringify({query:z,variables:ye})});if(Ce(80,S,j,e("Almost there...")),!K.ok)throw new Error(`HTTP error: ${K.status} ${K.statusText}`);const Ee=await K.text();let ce;try{ce=JSON.parse(Ee),console.log("API response:",ce)}catch(ve){const be=ve instanceof Error?ve.message:"Unknown JSON parse error";throw new Error(`Invalid JSON response: ${be}`)}if(ce.errors&&ce.errors.length>0){const ve=ce.errors.map(be=>(console.error("GraphQL error:",be),be.message||"Unknown GraphQL error")).join("; ");throw new Error(`GraphQL errors: ${ve}`)}console.log("Album registered successfully"),Ce(100,S,j,e("Album registered successfully!")),sessionStorage.setItem("album_just_saved","true"),setTimeout(()=>{document.body.removeChild(w),window.location.href="/my-albums.html"},2e3)}catch(K){const Ee=K instanceof Error?K.message:"Unknown API error";console.error("Error in API request:",K),re(U,Ee,S,j)}}catch(D){const N=D instanceof Error?D.message:"Unknown error";console.error("Error registering album:",D),re(U,N,S,j)}},$t=async()=>{if(console.log("Starting album registration"),R==="CannotBeSaved"&&!A){ie();return}const w=await X();if(!w){console.log("User not logged in, showing OTP login"),y(!0);return}if(!_)try{const L=JSON.parse(atob(w.split(".")[1]))["cognito:username"];k(L)}catch(S){console.error("Failed to decode token",S)}const P=localStorage.getItem("publicUsername");if(P!=null&&P.startsWith("Profile-")){console.log("Public username starts with 'Profile-', showing username prompt"),s.setUsernameInput(P),s.setShowUsernamePrompt(!0);return}xe()},Wt=async()=>{if((R==="NotVisible"||R==="CannotBeSaved")&&!A){ie();return}Bt(!me),le.clear()},Ht=async()=>{if(le.size===0){alert(e("Please select at least one item to share."));return}if(t)try{const w=document.createElement("div");w.style.position="fixed",w.style.top="0",w.style.left="0",w.style.width="100%",w.style.height="100%",w.style.backgroundColor="rgba(0, 0, 0, 0.5)",w.style.display="flex",w.style.justifyContent="center",w.style.alignItems="center",w.style.zIndex="2000";const P=document.createElement("div");P.style.backgroundColor="white",P.style.padding="30px",P.style.borderRadius="8px",P.style.textAlign="center";const S=document.createElement("p");S.textContent=e("Creating sub-album..."),P.appendChild(S),w.appendChild(P),document.body.appendChild(w);const L=[],j=[];Array.from(le).forEach(D=>{var q;const N=t.mediaItems[D];if(N&&N.fileId){L.push(N.fileId);const de={fileName:((q=N.fileId.split("_____")[1])==null?void 0:q.split("____")[0])||`file-${D}`,s3PreviewUrl:N.type==="video"&&N.thumbnailUrl||N.url,type:N.type==="video"?"video":"image",size:0,status:"complete",progress:100,fileId:N.fileId,duration:N.type==="video"&&N.duration?parseFloat(N.duration.split(":").reduce((Y,z)=>60*Y+parseFloat(z),0).toString()):null};j.push(de)}});const U={isSubAlbum:!0,selectedFileIds:L,selectedPhotos:j};localStorage.setItem(et.SUB_ALBUM_DATA,JSON.stringify(U)),document.body.removeChild(w),window.location.href="/save-album.html"}catch(w){console.error("Error creating sub-album:",w),alert(e("There was an error creating the sub-album. Please try again."))}},Qt=async()=>{if(R==="CannotBeSaved"&&!A){ie();return}if(!await X()&&(g||R==="CannotBeSaved")){y(!0);return}t&&ao(t,e,Ye)};return x.useEffect(()=>{const w=localStorage.getItem("columns")||"1";n(w)},[]),x.useEffect(()=>{(async()=>{const P=eo();if(!P){m(e("Valid ID not obtained from query parameter.")),f(!1);return}const S=P.split("_");let L=S[S.length-1].replace(/-/g,"");L.length===32?(L=to(L),console.log(L)):console.error("Invalid UUID format: must be 32 characters after removing dashes");const j=await Io(L,b);j&&(c(j),j.passwordPolicy&&(B(j.passwordPolicy),(j.passwordPolicy==="NoPassword"||j.folderPositionId)&&M(!0))),f(!1)})()},[]),x.useEffect(()=>{(async()=>{const P=await X();if(P)try{const L=JSON.parse(atob(P.split(".")[1]))["cognito:username"];k(L);const j=localStorage.getItem("selectPhotosButtonTimestamp");if(j){const U=parseInt(j,10),N=(Date.now()-U)/(1e3*60);E(N<10),N>=10&&localStorage.removeItem("selectPhotosButtonTimestamp")}else E(!1)}catch(S){console.error("Failed to decode token",S)}})()},[]),x.useEffect(()=>{if(Ke&&se.length>0){const w=se.filter(S=>S.status==="complete").length,P=se.filter(S=>S.status==="error").length;console.log(`Upload complete: ${w} successful, ${P} failed`),g?window.location.href=`/save-album.html?folderId=${encodeURIComponent(g)}`:window.location.href="/save-album.html"}},[Ke,se.length,g]),x.useEffect(()=>{t!=null&&t.folderName?document.title=t.folderName:document.title=e("Photos")},[t,i]),o.jsxs(ko,{children:[o.jsx(Ko,{}),o.jsx(Sr,{t:e,isSelectionMode:me,selectedItems:le,shareSelection:Ht,cancelSelection:Nt,createSubalbum:Wt,showingEnterPassword:he,promptForPassword:ie,passwordPolicy:R,isAuthorized:A,addPhotosToAlbum:zt,saveAlbumDirectly:$t,handleDownloadPhotos:Qt,handleCopyLink:()=>G.setShowingCopyLinkAlert(!0),handlePublicProfileToggle:G.handlePublicProfileToggle,isOnPublicProfile:G.isOnPublicProfile,albumData:t,columns:d,changeColumns:Ut}),o.jsxs(Bo,{id:"media-container",children:[o.jsx(kr,{showSelectPhotosButton:I,albumData:t,openFilePicker:Xe,t:e}),o.jsx(Ir,{albumData:t,t:e}),Rt&&o.jsxs("div",{style:{width:"100%",marginBottom:"20px"},children:[o.jsx(ro,{progressTracker:ae,t:e,isRTL:ue(i)==="rtl",style:{marginTop:"20px"}}),ae.filesComplete>0&&ae.filesComplete===ae.totalFiles&&o.jsx("div",{style:{backgroundColor:"#e8f5e9",color:"#2e7d32",padding:"10px 16px",borderRadius:"6px",fontSize:"14px",marginTop:"10px",textAlign:"center"},children:e("Upload complete! Preparing to save your album...")}),ae.filesWithError>0&&o.jsx("div",{style:{backgroundColor:"#ffebee",color:"#c62828",padding:"10px 16px",borderRadius:"6px",fontSize:"14px",marginTop:"10px",textAlign:"center"},children:e("Some files could not be uploaded. You can continue with the successfully uploaded files.")})]}),o.jsx(jr,{isAuthorized:A,passwordPolicy:R,passwordError:H,promptForPassword:ie,t:e}),o.jsx(Er,{isSelectionMode:me,t:e}),o.jsx(Tr,{albumData:t,t:e}),o.jsx(Pr,{isLoading:p,error:h,albumData:t,columns:d,shouldShowContent:Ge,shouldShowWatermark:ee,isSelectionMode:me,selectedItems:le,toggleItemSelection:Mt,openFullscreenView:Ye,t:e})]}),o.jsx(pr,{isOpen:F,onClose:()=>{W(!1),Q(null)},onSubmit:Ot,error:H,t:e}),o.jsx(hr,{isOpen:v,onClose:()=>{y(!1)},onLoginSuccess:Dt,t:e}),o.jsx(no,{onFileSelection:Ft,ref:Te}),te!==null&&t&&o.jsx(or,{item:t.mediaItems[te],index:te,onClose:At,onPrev:Lt,onNext:()=>_t(t.mediaItems.length),hasNext:te<t.mediaItems.length-1,hasPrev:te>0,showWatermark:ee(),ownerName:(()=>{const w=t.mediaItems[te].ownerContactId;if(!w)return"";if(t.contacts&&t.contacts[w])return t.contacts[w];const P=w.split("_____")[0]||"";return P===_?e("Me"):P})()}),o.jsx(wr,{t:e,language:i,usernameManager:s,onSuccess:w=>{xe()}}),o.jsx(io,{isOpen:G.showingCopyLinkAlert,onClose:()=>G.setShowingCopyLinkAlert(!1),inviteLink:G.generateInviteLink(),onCopy:G.handleCopy,t:e,isRTL:ue(i)==="rtl"}),o.jsx(so,{isOpen:G.showingCopiedLinkAlert,onClose:()=>G.setShowingCopiedLinkAlert(!1),t:e,isRTL:ue(i)==="rtl"})]})},Ar=()=>o.jsx(Yt,{children:o.jsx(Rr,{})});Kt.createRoot(document.getElementById("root")).render(o.jsx(Ar,{}));
