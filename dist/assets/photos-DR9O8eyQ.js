import{c as At,d as Bt,a as st,S as Oe,r as y,u as le,j as e,e as _t,f as at,A as Dt,C as pe,R as zt,I as Mt,g as Nt,b as Ue}from"./config-C81kv4lT.js";import{c as X,e as Ot,h as Ut,i as Ft,b as Wt,g as $t}from"./utils-BvimWbmh.js";import{F as Ht,d as qt}from"./fileOperations-BKyaGLwT.js";import{u as fe,c as Qt,a as Gt,p as Vt}from"./file-upload-utils-CwNVKzun.js";import{d as C,l as N,f as Kt}from"./styled-components.browser.esm-DAVmpCtn.js";import{C as Jt,S as Yt,I as Xt,R as Zt}from"./SignUpCommand-5ZAYfGgq.js";import"./index-DFUfgcbK.js";import"./parseJsonBody-Cin9RETb.js";const Fe=`
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
`,We=(t,u)=>{var g,h,m,S,b;const a=((h=(g=t==null?void 0:t.data)==null?void 0:g.fetchRelations)==null?void 0:h.items)||[],c=[],r={};let i="Photos",d="",s,n=!1,o=!1,f,p=!1;const l=new Set;if(a.length>0){const v=a[0];u&&(v!=null&&v.id)&&u(v.id),v!=null&&v.folderName&&v.folderName.length>0&&(i=v.folderName),v!=null&&v.folderDescription&&v.folderDescription.length>0&&(d=v.folderDescription),v!=null&&v.folderPassword&&(v.folderPassword.policy&&(s=v.folderPassword.policy,n=s!=="NoPassword"),v.folderPassword.password&&s!=="NoPassword"&&(o=!0,f=v.folderPassword.password)),v!=null&&v.folderInviteParameters&&(p=!!v.folderInviteParameters.usingFolderInviteGrantsRightToAddItems),(((S=(m=a[0])==null?void 0:m.contactsUsingInvite)==null?void 0:S.items)||[]).forEach(I=>{var L;I!=null&&I.id&&((L=I==null?void 0:I.item)!=null&&L.publicDisplayName)&&(r[I.id]=I.item.publicDisplayName)}),(((b=v==null?void 0:v.fileReferencesPage)==null?void 0:b.items)||[]).forEach(I=>{const L=I==null?void 0:I.file;if(!(L!=null&&L.dataKey))return;const{id:D,dataKey:P,thumbnailDataKey:E,durationInSeconds:j,ownerContactId:z}=L;if(l.has(P))return;l.add(P);const k=`${Oe}${P}`,B=E?`${Oe}${E}`:void 0;P.startsWith("Input/Image/")?c.push({type:"image",fileId:D,url:k,thumbnailUrl:B||k,ownerId:z,loaded:!1}):P.startsWith("Input/Video/")&&c.push({type:"video",fileId:D,url:k,thumbnailUrl:B||k,duration:Ot(j),ownerId:z,loaded:!1})})}return{mediaItems:c,folderName:i,folderDescription:d,contacts:r,passwordPolicy:s,passwordRequired:n,hasPassword:o,actualPassword:f,usingFolderInviteGrantsRightToAddItems:p}},eo=async(t,u)=>{var a,c,r,i,d;try{const n={fetchRelationsInput:{targetItemIdentifier____RelationType:`${t}____Folder`,index:"targetItemIdentifier____RelationType",limit:1,scanIndexForward:!1,nextToken:null}},o=fetch(At,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":Bt},body:JSON.stringify({query:Fe,variables:n})}).then(h=>h.json()),f=(async()=>{const h=await X();return h?fetch(st,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${h}`},body:JSON.stringify({query:Fe,variables:n})}).then(m=>m.json()):null})(),p=await o;let l=We(p,u);const g=await f;if(g){const h=(d=(i=(r=(c=(a=g==null?void 0:g.data)==null?void 0:a.fetchRelations)==null?void 0:c.items)==null?void 0:r[0])==null?void 0:i.folderPosition)==null?void 0:d.id,m=We(g,u);h&&(l=m)}return l}catch(s){return console.error("Error fetching folder data:",s),null}},to=C.div`
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
`,oo=C.div`
  position: sticky;
  top: 0;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0,0,0,0.06);
  z-index: 10;
  margin-bottom: 10px;
  width: 100%;
`,ro=C.div`
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  
  @media (max-width: 767px) {
    padding: 16px 16px;
  }
`,no=C.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 5px;
  gap: 10px;
  flex-wrap: wrap;
`,io=C.button`
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
`,so=C.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`,H=C.button`
  background: transparent;
  color: #006adc;
  border: 1px solid #006adc;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
`,ao=C.button`
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
`,lo=C.span`
  width: 18px;
  height: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`,he=C.span`
  height: 2px;
  background: #006adc;
  width: 100%;
`,co=C.div`
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
`,ge=C.button`
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
`,uo=C.h2`
  font-weight: 400;
  margin: 0 0 16px 0;
  font-size: 24px;
  padding: 0;
  
  @media (max-width: 767px) {
    padding: 0;
  }
`,po=C.strong`
  font-weight: 700;
`,fo=C.div`
  padding: 0 24px 20px;
  width: 100%;
  overflow: visible; // Allow content to flow naturally
  
  @media (max-width: 767px) {
    padding: 0 16px 15px;
    width: 100%;
  }
`,ho=C.div`
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 20px;
`,go=C.p`
  margin: 0;
`,mo=C.div`
  display: grid;
  grid-gap: 20px;
  width: 100%;
  min-height: 0; // Allow proper sizing
  
  ${t=>{switch(t.columns){case"1":return N`grid-template-columns: repeat(1, 1fr);`;case"2":return N`grid-template-columns: repeat(2, 1fr);`;case"3":return N`grid-template-columns: repeat(3, 1fr);`;case"4":return N`grid-template-columns: repeat(4, 1fr);`;case"5":return N`grid-template-columns: repeat(5, 1fr);`;default:return N`grid-template-columns: repeat(1, 1fr);`}}}
  
  @media (max-width: 767px) {
    grid-gap: 8px;
    ${t=>{const u=parseInt(t.columns);return u>3?N`grid-template-columns: repeat(3, minmax(0, 1fr));`:u>1?N`grid-template-columns: repeat(${u}, minmax(0, 1fr));`:N`grid-template-columns: repeat(1, minmax(0, 1fr));`}}
  }
`,xo=C.div`
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
  
  ${t=>t.isHovered&&N`
    transform: translateY(-2px);
  `}
  
  ${t=>t.isVideo&&N`
    cursor: pointer;
  `}
  
  @media (max-width: 767px) {
    border-radius: 4px;
    margin-bottom: 10px; // Less margin on mobile
  }
`,vo=C.div`
  position: relative;
  overflow: hidden;
  background-color: #f0f0f0;
  width: 100%;
  padding-bottom: 75%; // Create a consistent aspect ratio (4:3)
  height: 0; // Use padding-bottom for aspect ratio
  
  @media (max-width: 767px) {
    padding-bottom: 100%; // Square aspect ratio on mobile
  }
`,$e=C.div`
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
`,bo=C.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  transition: opacity 0.3s;
  opacity: ${t=>t.isLoaded?1:0};
`,yo=C.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading-animation 1.5s infinite;
  z-index: 0;
`,wo=C.div`
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
`,Co=C.div`
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
`,So=C.div`
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
`,me=C.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #d32f2f;
  grid-column: 1 / -1;
  width: 100%;
`,Po=C.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
  grid-column: 1 / -1;
  width: 100%;
`,Io=C.label`
  margin-right: 8px;
  font-size: 14px;
  color: #555;
  font-weight: normal;
`,jo=C.select`
  padding: 5px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  font-size: 14px;
  min-width: 50px;
`,Ro=C.div`
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
`,Eo=C.div`
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
`;const lt=C.div`
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
`;const To=Kt`
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
`,ko=C(no)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  
  > div {
    width: auto;
    display: flex;
    align-items: center;
  }
`;C(xo)`
  ${t=>t.isSelected&&`
    border: 3px solid #006adc;
    box-shadow: 0 0 0 3px rgba(0, 106, 220, 0.3);
  `}
`;const Lo=C.div`
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
`,Ao=C.div`
  padding: 10px 20px;
  background-color: #f0f7ff;
  border-radius: 4px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`,Bo=C.div`
  color: white;
  font-size: 14px;
  font-weight: bold;
`,se=C.div`
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
`,ae=C.div`
  color: white;
  font-size: 24px;
  font-weight: bold;
  transform: rotate(-30deg);
  opacity: 0.7;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
  user-select: none;
  white-space: nowrap;
`,He=C(H)`
  background-color: #4caf50;
  color: white;
  &:hover {
    background-color: #45a049;
  }
`,ke=({src:t,thumbnailSrc:u,alt:a,className:c="",loadFullResolution:r=!1,onFullResolutionLoaded:i,onClick:d,showWatermark:s=!1})=>{const[n,o]=y.useState(!1),[f,p]=y.useState(!1),[l,g]=y.useState(!1),[h,m]=y.useState("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E"),{t:S}=le();return y.useEffect(()=>{if(u){const b=new Image;b.src=u,b.onload=()=>{m(u),o(!0)}}},[u]),y.useEffect(()=>{if(r&&!f){g(!0);const b=new Image;b.src=t,b.onload=()=>{m(t),p(!0),g(!1),i&&i()}}},[r,t,f,i]),e.jsxs(vo,{onClick:d,children:[e.jsx(bo,{src:h,alt:a,className:c,isLoaded:n,style:{cursor:d?"pointer":"default"}}),!n&&e.jsx(yo,{}),l&&e.jsx(lt,{children:S("Loading full resolution...")}),s&&n&&e.jsx(se,{children:e.jsx(ae,{children:"6180 Watermarked"})})]})},_o=({thumbnailUrl:t,videoUrl:u,duration:a,index:c,onFullResolutionLoaded:r,onClick:i,showWatermark:d=!1})=>{const[s,n]=y.useState(!1),[o,f]=y.useState(!1),[p,l]=y.useState(!1),g=_t.useRef(null),{t:h}=le(),m=()=>{if(i){i();return}p?n(!0):f(!0)},S=()=>{l(!0),n(!0),r&&r()};return y.useEffect(()=>{if(o&&g.current&&!p){const b=g.current,v=()=>{S(),b.removeEventListener("canplaythrough",v)};return b.addEventListener("canplaythrough",v),b.load(),()=>{b.removeEventListener("canplaythrough",v)}}},[o,p]),s?e.jsxs("div",{style:{position:"relative",width:"100%",height:"100%"},children:[e.jsxs("video",{ref:g,controls:!0,style:{width:"100%",height:"100%"},children:[e.jsx("source",{src:u,type:"video/mp4"}),h("Your browser does not support the video tag.")]}),d&&e.jsx(se,{children:e.jsx(ae,{children:"6180 Watermarked"})})]}):o&&!p?e.jsxs($e,{children:[e.jsx(ke,{src:u,thumbnailSrc:t,alt:`Video thumbnail ${c+1}`,showWatermark:d}),e.jsx(lt,{children:h("Loading video...")}),e.jsx("video",{ref:g,style:{display:"none"},preload:"auto",children:e.jsx("source",{src:u,type:"video/mp4"})})]}):e.jsxs($e,{onClick:m,children:[e.jsx(ke,{src:u,thumbnailSrc:t,alt:`Video thumbnail ${c+1}`,showWatermark:d}),e.jsx(Co,{}),e.jsx(So,{children:a})]})},Do=({item:t,index:u,onClose:a,onPrev:c,onNext:r,hasNext:i,hasPrev:d,albumName:s,showWatermark:n=!1})=>{const[o,f]=y.useState(!1),[p,l]=y.useState(!0),{t:g}=le();return y.useEffect(()=>{const h=m=>{m.key==="Escape"?a():m.key==="ArrowLeft"&&d?c():m.key==="ArrowRight"&&i&&r()};return window.addEventListener("keydown",h),()=>window.removeEventListener("keydown",h)},[a,r,c,i,d]),e.jsxs("div",{style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",backgroundColor:"rgba(0, 0, 0, 0.9)",zIndex:2e3,display:"flex",flexDirection:"column"},children:[e.jsxs("div",{style:{padding:"15px",display:"flex",justifyContent:"space-between",alignItems:"center",backgroundColor:"rgba(0, 0, 0, 0.7)"},children:[e.jsx("button",{style:{background:"transparent",border:"none",color:"white",fontSize:"16px",padding:"5px 10px",cursor:"pointer"},onClick:a,children:g("Back")}),e.jsxs("div",{style:{display:"flex",gap:"10px"},children:[e.jsx("button",{style:{background:"transparent",border:"none",color:"white",fontSize:"16px",padding:"5px 10px",cursor:d?"pointer":"not-allowed",opacity:d?1:.5},onClick:d?c:void 0,disabled:!d,children:"←"}),e.jsx("button",{style:{background:"transparent",border:"none",color:"white",fontSize:"16px",padding:"5px 10px",cursor:i?"pointer":"not-allowed",opacity:i?1:.5},onClick:i?r:void 0,disabled:!i,children:"→"})]})]}),e.jsxs("div",{style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",overflow:"auto",padding:"10px",position:"relative"},children:[t.type==="image"?e.jsxs("div",{style:{position:"relative"},children:[e.jsx("img",{src:t.url,alt:`Image ${u+1}`,style:{maxWidth:"100%",maxHeight:"100%",objectFit:"contain",opacity:o?1:0,transition:"opacity 0.3s"},onLoad:()=>{f(!0),l(!1)}}),n&&e.jsx(se,{children:e.jsx(ae,{children:"6180 Watermarked"})}),!o&&t.thumbnailUrl&&e.jsx("img",{src:t.thumbnailUrl,alt:`Thumbnail ${u+1}`,style:{position:"absolute",maxWidth:"100%",maxHeight:"100%",objectFit:"contain",opacity:.5}})]}):e.jsxs("div",{style:{position:"relative"},children:[e.jsxs("video",{controls:!0,autoPlay:!0,style:{maxWidth:"100%",maxHeight:"100%"},onLoadedData:()=>l(!1),children:[e.jsx("source",{src:t.url,type:"video/mp4"}),g("Your browser does not support the video tag.")]}),n&&e.jsx(se,{children:e.jsx(ae,{children:"6180 Watermarked"})})]}),p&&e.jsx("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",backgroundColor:"rgba(0, 0, 0, 0.7)",color:"white",padding:"10px 20px",borderRadius:"4px",zIndex:10},children:t.type==="image"?g("Loading full resolution..."):g("Loading video...")})]}),e.jsx("div",{style:{padding:"15px",display:"flex",justifyContent:"center",backgroundColor:"rgba(0, 0, 0, 0.7)",color:"white"},children:e.jsx("a",{href:t.url,download:`${s}-${u+1}.${t.type==="image"?"jpg":"mp4"}`,style:{textDecoration:"none",color:"white",backgroundColor:"#006adc",padding:"8px 16px",borderRadius:"4px",fontSize:"14px"},children:t.type==="image"?g("Download Photo"):g("Download Video")})})]})};var Y={},xe={exports:{}},ve,qe;function zo(){if(qe)return ve;qe=1;var t="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return ve=t,ve}var be,Qe;function Mo(){if(Qe)return be;Qe=1;var t=zo();function u(){}function a(){}return a.resetWarningCache=u,be=function(){function c(d,s,n,o,f,p){if(p!==t){var l=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw l.name="Invariant Violation",l}}c.isRequired=c;function r(){return c}var i={array:c,bigint:c,bool:c,func:c,number:c,object:c,string:c,symbol:c,any:c,arrayOf:r,element:c,elementType:c,instanceOf:r,node:c,objectOf:r,oneOf:r,oneOfType:r,shape:r,exact:r,checkPropTypes:a,resetWarningCache:u};return i.PropTypes=i,i},be}var Ge;function dt(){return Ge||(Ge=1,xe.exports=Mo()()),xe.exports}var ye,Ve;function ct(){return Ve||(Ve=1,ye={L:1,M:0,Q:3,H:2}),ye}var we,Ke;function ut(){return Ke||(Ke=1,we={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8}),we}var Ce,Je;function No(){if(Je)return Ce;Je=1;var t=ut();function u(a){this.mode=t.MODE_8BIT_BYTE,this.data=a}return u.prototype={getLength:function(a){return this.data.length},write:function(a){for(var c=0;c<this.data.length;c++)a.put(this.data.charCodeAt(c),8)}},Ce=u,Ce}var Se,Ye;function Oo(){if(Ye)return Se;Ye=1;var t=ct();function u(a,c){this.totalCount=a,this.dataCount=c}return u.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],u.getRSBlocks=function(a,c){var r=u.getRsBlockTable(a,c);if(r==null)throw new Error("bad rs block @ typeNumber:"+a+"/errorCorrectLevel:"+c);for(var i=r.length/3,d=new Array,s=0;s<i;s++)for(var n=r[s*3+0],o=r[s*3+1],f=r[s*3+2],p=0;p<n;p++)d.push(new u(o,f));return d},u.getRsBlockTable=function(a,c){switch(c){case t.L:return u.RS_BLOCK_TABLE[(a-1)*4+0];case t.M:return u.RS_BLOCK_TABLE[(a-1)*4+1];case t.Q:return u.RS_BLOCK_TABLE[(a-1)*4+2];case t.H:return u.RS_BLOCK_TABLE[(a-1)*4+3];default:return}},Se=u,Se}var Pe,Xe;function Uo(){if(Xe)return Pe;Xe=1;function t(){this.buffer=new Array,this.length=0}return t.prototype={get:function(u){var a=Math.floor(u/8);return(this.buffer[a]>>>7-u%8&1)==1},put:function(u,a){for(var c=0;c<a;c++)this.putBit((u>>>a-c-1&1)==1)},getLengthInBits:function(){return this.length},putBit:function(u){var a=Math.floor(this.length/8);this.buffer.length<=a&&this.buffer.push(0),u&&(this.buffer[a]|=128>>>this.length%8),this.length++}},Pe=t,Pe}var Ie,Ze;function pt(){if(Ze)return Ie;Ze=1;for(var t={glog:function(a){if(a<1)throw new Error("glog("+a+")");return t.LOG_TABLE[a]},gexp:function(a){for(;a<0;)a+=255;for(;a>=256;)a-=255;return t.EXP_TABLE[a]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},u=0;u<8;u++)t.EXP_TABLE[u]=1<<u;for(var u=8;u<256;u++)t.EXP_TABLE[u]=t.EXP_TABLE[u-4]^t.EXP_TABLE[u-5]^t.EXP_TABLE[u-6]^t.EXP_TABLE[u-8];for(var u=0;u<255;u++)t.LOG_TABLE[t.EXP_TABLE[u]]=u;return Ie=t,Ie}var je,et;function ft(){if(et)return je;et=1;var t=pt();function u(a,c){if(a.length==null)throw new Error(a.length+"/"+c);for(var r=0;r<a.length&&a[r]==0;)r++;this.num=new Array(a.length-r+c);for(var i=0;i<a.length-r;i++)this.num[i]=a[i+r]}return u.prototype={get:function(a){return this.num[a]},getLength:function(){return this.num.length},multiply:function(a){for(var c=new Array(this.getLength()+a.getLength()-1),r=0;r<this.getLength();r++)for(var i=0;i<a.getLength();i++)c[r+i]^=t.gexp(t.glog(this.get(r))+t.glog(a.get(i)));return new u(c,0)},mod:function(a){if(this.getLength()-a.getLength()<0)return this;for(var c=t.glog(this.get(0))-t.glog(a.get(0)),r=new Array(this.getLength()),i=0;i<this.getLength();i++)r[i]=this.get(i);for(var i=0;i<a.getLength();i++)r[i]^=t.gexp(t.glog(a.get(i))+c);return new u(r,0).mod(a)}},je=u,je}var Re,tt;function Fo(){if(tt)return Re;tt=1;var t=ut(),u=ft(),a=pt(),c={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},r={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(i){for(var d=i<<10;r.getBCHDigit(d)-r.getBCHDigit(r.G15)>=0;)d^=r.G15<<r.getBCHDigit(d)-r.getBCHDigit(r.G15);return(i<<10|d)^r.G15_MASK},getBCHTypeNumber:function(i){for(var d=i<<12;r.getBCHDigit(d)-r.getBCHDigit(r.G18)>=0;)d^=r.G18<<r.getBCHDigit(d)-r.getBCHDigit(r.G18);return i<<12|d},getBCHDigit:function(i){for(var d=0;i!=0;)d++,i>>>=1;return d},getPatternPosition:function(i){return r.PATTERN_POSITION_TABLE[i-1]},getMask:function(i,d,s){switch(i){case c.PATTERN000:return(d+s)%2==0;case c.PATTERN001:return d%2==0;case c.PATTERN010:return s%3==0;case c.PATTERN011:return(d+s)%3==0;case c.PATTERN100:return(Math.floor(d/2)+Math.floor(s/3))%2==0;case c.PATTERN101:return d*s%2+d*s%3==0;case c.PATTERN110:return(d*s%2+d*s%3)%2==0;case c.PATTERN111:return(d*s%3+(d+s)%2)%2==0;default:throw new Error("bad maskPattern:"+i)}},getErrorCorrectPolynomial:function(i){for(var d=new u([1],0),s=0;s<i;s++)d=d.multiply(new u([1,a.gexp(s)],0));return d},getLengthInBits:function(i,d){if(1<=d&&d<10)switch(i){case t.MODE_NUMBER:return 10;case t.MODE_ALPHA_NUM:return 9;case t.MODE_8BIT_BYTE:return 8;case t.MODE_KANJI:return 8;default:throw new Error("mode:"+i)}else if(d<27)switch(i){case t.MODE_NUMBER:return 12;case t.MODE_ALPHA_NUM:return 11;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 10;default:throw new Error("mode:"+i)}else if(d<41)switch(i){case t.MODE_NUMBER:return 14;case t.MODE_ALPHA_NUM:return 13;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 12;default:throw new Error("mode:"+i)}else throw new Error("type:"+d)},getLostPoint:function(i){for(var d=i.getModuleCount(),s=0,n=0;n<d;n++)for(var o=0;o<d;o++){for(var f=0,p=i.isDark(n,o),l=-1;l<=1;l++)if(!(n+l<0||d<=n+l))for(var g=-1;g<=1;g++)o+g<0||d<=o+g||l==0&&g==0||p==i.isDark(n+l,o+g)&&f++;f>5&&(s+=3+f-5)}for(var n=0;n<d-1;n++)for(var o=0;o<d-1;o++){var h=0;i.isDark(n,o)&&h++,i.isDark(n+1,o)&&h++,i.isDark(n,o+1)&&h++,i.isDark(n+1,o+1)&&h++,(h==0||h==4)&&(s+=3)}for(var n=0;n<d;n++)for(var o=0;o<d-6;o++)i.isDark(n,o)&&!i.isDark(n,o+1)&&i.isDark(n,o+2)&&i.isDark(n,o+3)&&i.isDark(n,o+4)&&!i.isDark(n,o+5)&&i.isDark(n,o+6)&&(s+=40);for(var o=0;o<d;o++)for(var n=0;n<d-6;n++)i.isDark(n,o)&&!i.isDark(n+1,o)&&i.isDark(n+2,o)&&i.isDark(n+3,o)&&i.isDark(n+4,o)&&!i.isDark(n+5,o)&&i.isDark(n+6,o)&&(s+=40);for(var m=0,o=0;o<d;o++)for(var n=0;n<d;n++)i.isDark(n,o)&&m++;var S=Math.abs(100*m/d/d-50)/5;return s+=S*10,s}};return Re=r,Re}var Ee,ot;function Wo(){if(ot)return Ee;ot=1;var t=No(),u=Oo(),a=Uo(),c=Fo(),r=ft();function i(s,n){this.typeNumber=s,this.errorCorrectLevel=n,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}var d=i.prototype;return d.addData=function(s){var n=new t(s);this.dataList.push(n),this.dataCache=null},d.isDark=function(s,n){if(s<0||this.moduleCount<=s||n<0||this.moduleCount<=n)throw new Error(s+","+n);return this.modules[s][n]},d.getModuleCount=function(){return this.moduleCount},d.make=function(){if(this.typeNumber<1){var s=1;for(s=1;s<40;s++){for(var n=u.getRSBlocks(s,this.errorCorrectLevel),o=new a,f=0,p=0;p<n.length;p++)f+=n[p].dataCount;for(var p=0;p<this.dataList.length;p++){var l=this.dataList[p];o.put(l.mode,4),o.put(l.getLength(),c.getLengthInBits(l.mode,s)),l.write(o)}if(o.getLengthInBits()<=f*8)break}this.typeNumber=s}this.makeImpl(!1,this.getBestMaskPattern())},d.makeImpl=function(s,n){this.moduleCount=this.typeNumber*4+17,this.modules=new Array(this.moduleCount);for(var o=0;o<this.moduleCount;o++){this.modules[o]=new Array(this.moduleCount);for(var f=0;f<this.moduleCount;f++)this.modules[o][f]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(s,n),this.typeNumber>=7&&this.setupTypeNumber(s),this.dataCache==null&&(this.dataCache=i.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,n)},d.setupPositionProbePattern=function(s,n){for(var o=-1;o<=7;o++)if(!(s+o<=-1||this.moduleCount<=s+o))for(var f=-1;f<=7;f++)n+f<=-1||this.moduleCount<=n+f||(0<=o&&o<=6&&(f==0||f==6)||0<=f&&f<=6&&(o==0||o==6)||2<=o&&o<=4&&2<=f&&f<=4?this.modules[s+o][n+f]=!0:this.modules[s+o][n+f]=!1)},d.getBestMaskPattern=function(){for(var s=0,n=0,o=0;o<8;o++){this.makeImpl(!0,o);var f=c.getLostPoint(this);(o==0||s>f)&&(s=f,n=o)}return n},d.createMovieClip=function(s,n,o){var f=s.createEmptyMovieClip(n,o),p=1;this.make();for(var l=0;l<this.modules.length;l++)for(var g=l*p,h=0;h<this.modules[l].length;h++){var m=h*p,S=this.modules[l][h];S&&(f.beginFill(0,100),f.moveTo(m,g),f.lineTo(m+p,g),f.lineTo(m+p,g+p),f.lineTo(m,g+p),f.endFill())}return f},d.setupTimingPattern=function(){for(var s=8;s<this.moduleCount-8;s++)this.modules[s][6]==null&&(this.modules[s][6]=s%2==0);for(var n=8;n<this.moduleCount-8;n++)this.modules[6][n]==null&&(this.modules[6][n]=n%2==0)},d.setupPositionAdjustPattern=function(){for(var s=c.getPatternPosition(this.typeNumber),n=0;n<s.length;n++)for(var o=0;o<s.length;o++){var f=s[n],p=s[o];if(this.modules[f][p]==null)for(var l=-2;l<=2;l++)for(var g=-2;g<=2;g++)l==-2||l==2||g==-2||g==2||l==0&&g==0?this.modules[f+l][p+g]=!0:this.modules[f+l][p+g]=!1}},d.setupTypeNumber=function(s){for(var n=c.getBCHTypeNumber(this.typeNumber),o=0;o<18;o++){var f=!s&&(n>>o&1)==1;this.modules[Math.floor(o/3)][o%3+this.moduleCount-8-3]=f}for(var o=0;o<18;o++){var f=!s&&(n>>o&1)==1;this.modules[o%3+this.moduleCount-8-3][Math.floor(o/3)]=f}},d.setupTypeInfo=function(s,n){for(var o=this.errorCorrectLevel<<3|n,f=c.getBCHTypeInfo(o),p=0;p<15;p++){var l=!s&&(f>>p&1)==1;p<6?this.modules[p][8]=l:p<8?this.modules[p+1][8]=l:this.modules[this.moduleCount-15+p][8]=l}for(var p=0;p<15;p++){var l=!s&&(f>>p&1)==1;p<8?this.modules[8][this.moduleCount-p-1]=l:p<9?this.modules[8][15-p-1+1]=l:this.modules[8][15-p-1]=l}this.modules[this.moduleCount-8][8]=!s},d.mapData=function(s,n){for(var o=-1,f=this.moduleCount-1,p=7,l=0,g=this.moduleCount-1;g>0;g-=2)for(g==6&&g--;;){for(var h=0;h<2;h++)if(this.modules[f][g-h]==null){var m=!1;l<s.length&&(m=(s[l]>>>p&1)==1);var S=c.getMask(n,f,g-h);S&&(m=!m),this.modules[f][g-h]=m,p--,p==-1&&(l++,p=7)}if(f+=o,f<0||this.moduleCount<=f){f-=o,o=-o;break}}},i.PAD0=236,i.PAD1=17,i.createData=function(s,n,o){for(var f=u.getRSBlocks(s,n),p=new a,l=0;l<o.length;l++){var g=o[l];p.put(g.mode,4),p.put(g.getLength(),c.getLengthInBits(g.mode,s)),g.write(p)}for(var h=0,l=0;l<f.length;l++)h+=f[l].dataCount;if(p.getLengthInBits()>h*8)throw new Error("code length overflow. ("+p.getLengthInBits()+">"+h*8+")");for(p.getLengthInBits()+4<=h*8&&p.put(0,4);p.getLengthInBits()%8!=0;)p.putBit(!1);for(;!(p.getLengthInBits()>=h*8||(p.put(i.PAD0,8),p.getLengthInBits()>=h*8));)p.put(i.PAD1,8);return i.createBytes(p,f)},i.createBytes=function(s,n){for(var o=0,f=0,p=0,l=new Array(n.length),g=new Array(n.length),h=0;h<n.length;h++){var m=n[h].dataCount,S=n[h].totalCount-m;f=Math.max(f,m),p=Math.max(p,S),l[h]=new Array(m);for(var b=0;b<l[h].length;b++)l[h][b]=255&s.buffer[b+o];o+=m;var v=c.getErrorCorrectPolynomial(S),I=new r(l[h],v.getLength()-1),L=I.mod(v);g[h]=new Array(v.getLength()-1);for(var b=0;b<g[h].length;b++){var D=b+L.getLength()-g[h].length;g[h][b]=D>=0?L.get(D):0}}for(var P=0,b=0;b<n.length;b++)P+=n[b].totalCount;for(var E=new Array(P),j=0,b=0;b<f;b++)for(var h=0;h<n.length;h++)b<l[h].length&&(E[j++]=l[h][b]);for(var b=0;b<p;b++)for(var h=0;h<n.length;h++)b<g[h].length&&(E[j++]=g[h][b]);return E},Ee=i,Ee}var ie={},rt;function $o(){if(rt)return ie;rt=1,Object.defineProperty(ie,"__esModule",{value:!0});var t=Object.assign||function(o){for(var f=1;f<arguments.length;f++){var p=arguments[f];for(var l in p)Object.prototype.hasOwnProperty.call(p,l)&&(o[l]=p[l])}return o},u=dt(),a=i(u),c=at(),r=i(c);function i(o){return o&&o.__esModule?o:{default:o}}function d(o,f){var p={};for(var l in o)f.indexOf(l)>=0||Object.prototype.hasOwnProperty.call(o,l)&&(p[l]=o[l]);return p}var s={bgColor:a.default.oneOfType([a.default.object,a.default.string]).isRequired,bgD:a.default.string.isRequired,fgColor:a.default.oneOfType([a.default.object,a.default.string]).isRequired,fgD:a.default.string.isRequired,size:a.default.number.isRequired,title:a.default.string,viewBoxSize:a.default.number.isRequired,xmlns:a.default.string},n=(0,c.forwardRef)(function(o,f){var p=o.bgColor,l=o.bgD,g=o.fgD,h=o.fgColor,m=o.size,S=o.title,b=o.viewBoxSize,v=o.xmlns,I=v===void 0?"http://www.w3.org/2000/svg":v,L=d(o,["bgColor","bgD","fgD","fgColor","size","title","viewBoxSize","xmlns"]);return r.default.createElement("svg",t({},L,{height:m,ref:f,viewBox:"0 0 "+b+" "+b,width:m,xmlns:I}),S?r.default.createElement("title",null,S):null,r.default.createElement("path",{d:l,fill:p}),r.default.createElement("path",{d:g,fill:h}))});return n.displayName="QRCodeSvg",n.propTypes=s,ie.default=n,ie}var nt;function Ho(){if(nt)return Y;nt=1,Object.defineProperty(Y,"__esModule",{value:!0}),Y.QRCode=void 0;var t=Object.assign||function(m){for(var S=1;S<arguments.length;S++){var b=arguments[S];for(var v in b)Object.prototype.hasOwnProperty.call(b,v)&&(m[v]=b[v])}return m},u=dt(),a=p(u),c=ct(),r=p(c),i=Wo(),d=p(i),s=at(),n=p(s),o=$o(),f=p(o);function p(m){return m&&m.__esModule?m:{default:m}}function l(m,S){var b={};for(var v in m)S.indexOf(v)>=0||Object.prototype.hasOwnProperty.call(m,v)&&(b[v]=m[v]);return b}var g={bgColor:a.default.oneOfType([a.default.object,a.default.string]),fgColor:a.default.oneOfType([a.default.object,a.default.string]),level:a.default.string,size:a.default.number,value:a.default.string.isRequired},h=(0,s.forwardRef)(function(m,S){var b=m.bgColor,v=b===void 0?"#FFFFFF":b,I=m.fgColor,L=I===void 0?"#000000":I,D=m.level,P=D===void 0?"L":D,E=m.size,j=E===void 0?256:E,z=m.value,k=l(m,["bgColor","fgColor","level","size","value"]),B=new d.default(-1,r.default[P]);B.addData(z),B.make();var O=B.modules;return n.default.createElement(f.default,t({},k,{bgColor:v,bgD:O.map(function(_,q){return _.map(function(U,W){return U?"":"M "+W+" "+q+" l 1 0 0 1 -1 0 Z"}).join(" ")}).join(" "),fgColor:L,fgD:O.map(function(_,q){return _.map(function(U,W){return U?"M "+W+" "+q+" l 1 0 0 1 -1 0 Z":""}).join(" ")}).join(" "),ref:S,size:j,viewBoxSize:O.length}))});return Y.QRCode=h,h.displayName="QRCode",h.propTypes=g,Y.default=h,Y}Ho();const qo=({isOpen:t,onClose:u,onSubmit:a,error:c,t:r})=>{const[i,d]=y.useState(""),[s,n]=y.useState(!1);if(!t)return null;const o=f=>{f.preventDefault(),n(!0),a(i),n(!1)};return e.jsx(Ro,{children:e.jsx(Eo,{style:{maxWidth:"400px"},children:e.jsxs("div",{style:{padding:"20px"},children:[e.jsx("h3",{style:{margin:"0 0 20px 0",textAlign:"center"},children:r("Enter Password")}),e.jsxs("form",{onSubmit:o,children:[e.jsxs("div",{style:{marginBottom:"20px"},children:[e.jsx("input",{type:"password",value:i,onChange:f=>d(f.target.value),placeholder:r("Password"),style:{width:"100%",padding:"10px",borderRadius:"4px",border:c?"1px solid #d32f2f":"1px solid #ccc",fontSize:"16px"},required:!0}),c&&e.jsx("div",{style:{color:"#d32f2f",fontSize:"14px",marginTop:"5px",padding:"5px"},children:c})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[e.jsx("button",{type:"button",onClick:u,style:{padding:"10px 16px",backgroundColor:"#f3f4f6",border:"none",borderRadius:"4px",cursor:"pointer",fontSize:"14px"},children:r("Cancel")}),e.jsx("button",{type:"submit",disabled:s||!i,style:{padding:"10px 16px",backgroundColor:"#006adc",color:"white",border:"none",borderRadius:"4px",cursor:i?"pointer":"not-allowed",opacity:i?1:.7,fontSize:"14px"},children:r(s?"Submitting...":"Submit")})]})]})]})})})},Qo=({addPhotosToAlbum:t,saveAlbum:u,promptForPassword:a,showingEnterPassword:c,passwordPolicy:r,usingFolderInviteGrantsRightToAddItems:i,t:d})=>{const[s,n]=y.useState(!1),[o,f]=y.useState(!1),p=y.useRef(null),l=840;y.useEffect(()=>{f(window.innerWidth<l);const S=()=>{f(window.innerWidth<l)};return window.addEventListener("resize",S),()=>window.removeEventListener("resize",S)},[]);const g=()=>{n(!s)},h=()=>{n(!1)},m=S=>{S(),h()};return y.useEffect(()=>{const S=v=>{p.current&&!p.current.contains(v.target)&&n(!1)},b=()=>{n(!1)};return s&&(document.addEventListener("mousedown",S),window.addEventListener("scroll",b)),()=>{document.removeEventListener("mousedown",S),window.removeEventListener("scroll",b)}},[s]),o?e.jsxs("div",{ref:p,style:{position:"relative",display:"flex",alignItems:"center",justifyContent:"flex-end",width:"100%",flexWrap:"nowrap"},children:[!c&&e.jsxs("div",{style:{flexShrink:0},children:[e.jsxs(ao,{onClick:g,"aria-label":d("Menu"),"aria-expanded":s,children:[e.jsxs(lo,{children:[e.jsx(he,{}),e.jsx(he,{}),e.jsx(he,{})]}),d("Add")]}),s&&e.jsxs(co,{children:[i&&e.jsx(ge,{onClick:()=>m(t),children:d("Add Photos To Album")}),e.jsx(ge,{onClick:()=>m(u),children:d("Save Album to 6180")}),e.jsx(ge,{onClick:()=>m(u),children:d("Download Photos")})]})]}),c&&r&&r!=="NoPassword"&&e.jsx("div",{style:{flexShrink:0},children:e.jsx(He,{onClick:a,children:d("Enter Password")})})]}):e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"20px",justifyContent:"flex-end",flexWrap:"nowrap"},children:[!c&&e.jsxs("div",{style:{display:"flex",gap:"20px",flexWrap:"nowrap"},children:[i&&e.jsx(H,{onClick:t,children:d("Add Photos")}),e.jsx(H,{onClick:u,children:d("Save Album to 6180")}),e.jsx(H,{onClick:u,children:d("Download Photos")})]}),c&&e.jsx("div",{children:e.jsx(He,{onClick:a,children:d("Enter Password")})})]})},Go=({progressTracker:t,t:u,isRTL:a,style:c})=>t.totalFiles===0?null:e.jsxs("div",{style:{marginBottom:"24px",backgroundColor:"#fff",padding:"16px",borderRadius:"8px",boxShadow:"0 1px 3px rgba(0,0,0,0.1)",width:"100%",direction:a?"rtl":"ltr",boxSizing:"border-box",overflow:"hidden",...c},children:[e.jsx("h3",{style:{fontSize:"18px",margin:"0 0 12px 0"},children:u("Upload Progress")}),e.jsxs("div",{style:{marginBottom:"12px"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"14px",marginBottom:"6px"},children:[e.jsxs("span",{children:[u("Overall Progress"),": ",Math.round(t.overallProgress*100),"%"]}),e.jsxs("span",{children:[t.filesComplete," ",u("of")," ",t.totalFiles," ",u("complete")]})]}),e.jsx("div",{style:{height:"8px",backgroundColor:"#e0e0e0",borderRadius:"4px",overflow:"hidden"},children:e.jsx("div",{style:{height:"100%",width:`${t.overallProgress*100}%`,backgroundColor:"#4caf50",borderRadius:"4px",transition:"width 0.3s ease",float:a?"right":"left"}})})]}),e.jsxs("div",{style:{display:"flex",gap:"12px",fontSize:"14px",color:"#666",flexDirection:a?"row-reverse":"row",flexWrap:"wrap",overflow:"hidden"},children:[t.filesUploading>0&&e.jsxs("div",{children:["📤 ",u("Uploading"),": ",t.filesUploading]}),t.filesProcessing>0&&e.jsxs("div",{children:["⚙️ ",u("Processing"),": ",t.filesProcessing]}),t.filesComplete>0&&e.jsxs("div",{children:["✅ ",u("Complete"),": ",t.filesComplete]}),t.filesWithError>0&&e.jsxs("div",{style:{color:"#e53935"},children:["❌ ",u("Failed"),": ",t.filesWithError]})]})]}),Te=new Jt({region:Dt});function it(t){const u=t.trim().toLowerCase(),a="@gmail.com";return u.endsWith(a)?`${u.slice(0,-a.length).replace(/\./g,"")}${a}`:u}const Vo=({isOpen:t,onClose:u,onLoginSuccess:a,t:c})=>{const[r,i]=y.useState(""),[d,s]=y.useState(!1),[n,o]=y.useState(""),[f,p]=y.useState(""),[l,g]=y.useState("idle"),[h,m]=y.useState(""),S=y.useRef(null),b=y.useRef(null);y.useEffect(()=>{d&&b.current&&b.current.focus()},[d]),y.useEffect(()=>{t&&S.current&&!d&&S.current.focus()},[t,d]);function v(P){const E=P.target.value;/^\d*$/.test(E)&&E.length<=6&&o(E)}async function I(){var E;g("sending"),m("");const P=it(r);if(!P||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(P)){g("error"),m(c("Please enter a valid email address"));return}try{const j=new Yt({ClientId:pe,Username:P,Password:crypto.randomUUID(),UserAttributes:[{Name:"email",Value:P}]});try{await Te.send(j)}catch(B){if(!((E=B.name)!=null&&E.includes("UsernameExistsException")))throw B}const z=new Xt({ClientId:pe,AuthFlow:"CUSTOM_AUTH",AuthParameters:{USERNAME:P}}),k=await Te.send(z);if(k.Session)p(k.Session),s(!0),g("idle");else throw new Error("No session returned from InitiateAuth")}catch(j){console.error(j),g("error"),m(c("Unable to send verification code. Please try again later."))}}async function L(){var E,j,z,k,B,O;g("verifying"),m("");const P=it(r);try{const _=new Zt({ClientId:pe,ChallengeName:"CUSTOM_CHALLENGE",ChallengeResponses:{USERNAME:P,ANSWER:n},Session:f}),U=(E=(await Te.send(_)).AuthenticationResult)==null?void 0:E.IdToken;if(!U)throw new Error("No token received");localStorage.setItem("idToken",U);const ee=`${JSON.parse(atob(U.split(".")[1]))["cognito:username"]}_____Public____Profile`,Q=await(await fetch(st,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${U}`},body:JSON.stringify({query:`
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
          `,variables:{relationIds:[ee]}})})).json(),te=(O=(B=(k=(z=(j=Q==null?void 0:Q.data)==null?void 0:j.batchGetItems)==null?void 0:z.items)==null?void 0:k[0])==null?void 0:B.item)==null?void 0:O.anyDisplayName;te&&localStorage.setItem("publicUsername",te),g("idle"),a(),u()}catch(_){console.error(_),g("error"),m(c("Invalid or expired verification code. Please try again or request a new code."))}}function D(){s(!1),o(""),g("idle")}return t?e.jsx("div",{style:{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',backgroundColor:"rgba(0, 0, 0, 0.5)",position:"fixed",top:0,left:0,right:0,bottom:0,display:"flex",alignItems:"center",justifyContent:"center",zIndex:1e3},children:e.jsxs("div",{style:{maxWidth:400,width:"100%",background:"#ffffff",padding:"32px",borderRadius:"12px",boxShadow:"0 6px 20px rgba(0,0,0,0.06)",textAlign:"center"},children:[e.jsxs("div",{style:{marginBottom:"24px"},children:[e.jsx("img",{src:"images/logo_no_background.png",alt:"6180 Logo",style:{height:"60px",marginBottom:"16px"}}),e.jsx("h2",{style:{fontSize:"24px",fontWeight:600,color:"#333"},children:c("Sign in to 6180")})]}),h&&e.jsx("div",{style:{backgroundColor:"#f8d7da",color:"#721c24",padding:"10px",borderRadius:"6px",marginBottom:"16px",fontSize:"14px"},children:h}),d?e.jsxs(e.Fragment,{children:[e.jsxs("p",{style:{marginBottom:"16px",color:"#555"},children:[c("Check your email for a 6-digit verification code sent to")," ",e.jsx("strong",{children:r})]}),e.jsx("input",{ref:b,type:"tel",inputMode:"numeric",pattern:"[0-9]*",maxLength:6,value:n,onChange:v,placeholder:c("Enter 6-digit code"),style:{width:"100%",padding:"12px",marginBottom:"16px",borderRadius:"6px",border:"1px solid #ccc",fontSize:"16px",boxSizing:"border-box",letterSpacing:"2px",textAlign:"center"}}),e.jsx("button",{onClick:L,disabled:l==="verifying"||n.length!==6,style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#28a745",color:"#fff",border:"none",borderRadius:"6px",cursor:l==="verifying"||n.length!==6?"not-allowed":"pointer",opacity:l==="verifying"||n.length!==6?.7:1},children:c(l==="verifying"?"Verifying...":"Verify Code")}),e.jsxs("div",{style:{marginTop:"16px",fontSize:"14px",color:"#666",display:"flex",justifyContent:"center",gap:"8px"},children:[e.jsx("span",{children:c("Didn't receive a code?")}),e.jsx("button",{onClick:D,style:{background:"none",border:"none",color:"#007bff",padding:0,cursor:"pointer",fontSize:"14px",textDecoration:"underline"},children:c("Send new code")})]}),e.jsx("button",{onClick:u,style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#f8f9fa",color:"#555",border:"1px solid #ccc",borderRadius:"6px",cursor:"pointer",marginTop:"12px"},children:c("Cancel")})]}):e.jsxs(e.Fragment,{children:[e.jsx("input",{ref:S,type:"email",value:r,onChange:P=>i(P.target.value),placeholder:c("Enter your email"),style:{width:"100%",padding:"12px",marginBottom:"16px",borderRadius:"6px",border:"1px solid #ccc",fontSize:"16px",boxSizing:"border-box"}}),e.jsx("button",{onClick:I,disabled:l==="sending"||!r.trim(),style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#007bff",color:"#fff",border:"none",borderRadius:"6px",cursor:l==="sending"||!r.trim()?"not-allowed":"pointer",opacity:l==="sending"||!r.trim()?.7:1},children:c(l==="sending"?"Sending...":"Send Verification Code")}),e.jsx("p",{style:{fontSize:"13px",color:"#666",marginTop:"16px",textAlign:"center"},children:c("We'll send a secure verification code to your email")}),e.jsx("button",{onClick:u,style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#f8f9fa",color:"#555",border:"1px solid #ccc",borderRadius:"6px",cursor:"pointer",marginTop:"12px"},children:c("Cancel")})]})]})}):null},Ko=()=>{const{t,language:u}=le(),[a,c]=y.useState("1"),[r,i]=y.useState(null),[d,s]=y.useState(!0),[n,o]=y.useState(null),[f,p]=y.useState(null),[l,g]=y.useState(void 0),[h,m]=y.useState(!1),[S,b]=y.useState(!1),[v,I]=y.useState(null),[L,D]=y.useState({}),[P,E]=y.useState(null),[j,z]=y.useState(!1),[k,B]=y.useState(new Set),O=y.useRef(null),[_,q]=y.useState([]),[U,W]=y.useState(!1),[Le,ee]=y.useState(!1),[K,Q]=y.useState({totalFiles:0,filesComplete:0,filesUploading:0,filesProcessing:0,filesWithError:0,overallProgress:0}),[te,J]=y.useState(!1),[ht,de]=y.useState(!1),[gt,oe]=y.useState(null),[Ae,ce]=y.useState(!1),$=Qt(()=>{});y.useEffect(()=>{fe(_,Q)},[_]),y.useEffect(()=>{if(Ae&&_.length>0){const x=_.filter(R=>R.status==="complete").length,w=_.filter(R=>R.status==="error").length;console.log(`Upload complete: ${x} successful, ${w} failed`),f?window.location.href=`/save-album.html?folderId=${encodeURIComponent(f)}`:window.location.href="/save-album.html"}},[Ae,_.length,f]);const mt=()=>!l||h||l==="NoPassword"?!0:l==="NotVisible"?(v&&console.error("Password error:",v),!1):!0,Be=()=>{const x=(v==null?void 0:v.toLowerCase().includes("watermark"))??!1;return!h&&l==="Watermark"||x},_e=()=>!h&&l!==void 0&&l!=="NoPassword",xt=x=>{if(I(null),x.trim()===""){I(t("Password cannot be empty"));return}const w=r==null?void 0:r.actualPassword;if(!w)if(r!=null&&r.hasPassword){I(t("Unable to validate password. Please try again later."));return}else{m(!0),b(!1);return}if(x!==w){I(t("Invalid password. Please try again."));return}m(!0),b(!1),I(null)},G=()=>{I(null),b(!0)},re=x=>{if(!j){if(l==="NotVisible"&&!h){G();return}E(x),ue(x),document.body.style.overflow="hidden"}},vt=()=>{E(null),document.body.style.overflow=""},bt=()=>{P!==null&&P>0&&(E(P-1),ue(P-1))},yt=()=>{P!==null&&r&&P<r.mediaItems.length-1&&(E(P+1),ue(P+1))},ue=x=>{D(w=>({...w,[x]:!0}))},De=x=>{if(r){const w=[...r.mediaItems];w[x]={...w[x],loaded:!0},i({...r,mediaItems:w}),D(R=>{const T={...R};return delete T[x],T})}},wt=x=>{c(x),localStorage.setItem("columns",x)},ze=()=>{O.current&&O.current.click()},Ct=async()=>{const x=await X();if(!x){ee(!0),J(!0);return}if(!gt)try{const R=JSON.parse(atob(x.split(".")[1]))["cognito:username"];oe(R)}catch(w){console.error("Failed to decode token",w)}ce(!1),ze()},St=async()=>{J(!1);const x=await X();if(x)try{const R=JSON.parse(atob(x.split(".")[1]))["cognito:username"];oe(R),Le&&(localStorage.setItem("selectPhotosButtonTimestamp",Date.now().toString()),ee(!1)),setTimeout(()=>{window.location.reload()},500)}catch(w){console.error("Failed to decode token",w)}},Pt=async x=>{const w=Array.from(x.target.files||[]);if(!w.length)return;localStorage.removeItem("selectPhotosButtonTimestamp"),de(!1),W(!0),ce(!1);const R=await Wt();if(!R){$("❌ Authentication failed"),W(!1),J(!0);return}try{const A=JSON.parse(atob(R.split(".")[1]))["cognito:username"];if(!A){$("❌ Missing Cognito Username"),W(!1);return}oe(A);const M=f||`${A}_____${$t()}____Folder`;$(`📁 Using folder ID: ${M}`),q(w.map(F=>({fileName:F.name,s3PreviewUrl:URL.createObjectURL(F),type:F.type,size:F.size,status:"pending",progress:0})));const Z=Gt(q),ne=setInterval(()=>{fe(_,Q)},500),V=await Vt(w,A,Z,$);clearInterval(ne),fe(V,Q),localStorage.setItem(Ue.SELECTED_PHOTOS,JSON.stringify(V)),$(`📸 Saved ${V.length} photos metadata to storage`);const kt=V.every(F=>F.status==="complete"),Ne=V.some(F=>F.status==="error");if(kt&&!Ne)$(`✅ All ${V.length} files successfully uploaded`);else if(Ne){const F=V.filter(Lt=>Lt.status==="error").length;$(`⚠️ Upload completed with ${F} errors`)}setTimeout(()=>{ce(!0)},1e3)}catch(T){$(`❌ Fatal error in handleFileSelection: ${String(T)}`),W(!1)}finally{x.target&&(x.target.value="")}},It=async()=>{if(l==="CannotBeSaved"&&!h){G();return}if(!await X()){J(!0);return}f?window.location.href=`/save-album.html?folderId=${f}`:alert(t("Please try refreshing the page or contact support if the problem persists."))},jt=async()=>{if((l==="NotVisible"||l==="CannotBeSaved")&&!h){G();return}z(!j),B(new Set)},Me=(x,w)=>{w.stopPropagation(),B(R=>{const T=new Set(R);return T.has(x)?T.delete(x):T.add(x),T})},Rt=()=>{z(!1),B(new Set)},Et=async()=>{if(k.size===0){alert(t("Please select at least one item to share."));return}if(r)try{const x=document.createElement("div");x.style.position="fixed",x.style.top="0",x.style.left="0",x.style.width="100%",x.style.height="100%",x.style.backgroundColor="rgba(0, 0, 0, 0.5)",x.style.display="flex",x.style.justifyContent="center",x.style.alignItems="center",x.style.zIndex="2000";const w=document.createElement("div");w.style.backgroundColor="white",w.style.padding="30px",w.style.borderRadius="8px",w.style.textAlign="center";const R=document.createElement("p");R.textContent=t("Creating sub-album..."),w.appendChild(R),x.appendChild(w),document.body.appendChild(x);const A={isSubAlbum:!0,selectedFileIds:Array.from(k).map(M=>{var Z;return(Z=r.mediaItems[M])==null?void 0:Z.fileId}).filter(M=>M)};localStorage.setItem(Ue.SUB_ALBUM_DATA,JSON.stringify(A)),document.body.removeChild(x),window.location.href="/save-album.html"}catch(x){console.error("Error creating sub-album:",x),alert(t("There was an error creating the sub-album. Please try again."))}},Tt=async()=>{if(l==="CannotBeSaved"&&!h){G();return}if(!await X()&&(f||l==="CannotBeSaved")){J(!0);return}r&&qt(r,t,re)};return y.useEffect(()=>{const x=localStorage.getItem("columns")||"1";c(x)},[]),y.useEffect(()=>{(async()=>{const w=Ut();if(!w){o(t("Valid ID not obtained from query parameter.")),s(!1);return}const R=w.split("_");let T=R[R.length-1].replace(/-/g,"");T.length===32?(T=Ft(T),console.log(T)):console.error("Invalid UUID format: must be 32 characters after removing dashes");const A=await eo(T,p);A&&(i(A),A.passwordPolicy&&(g(A.passwordPolicy),A.passwordPolicy==="NoPassword"&&m(!0))),s(!1)})()},[]),y.useEffect(()=>{(async()=>{const w=await X();if(w)try{const T=JSON.parse(atob(w.split(".")[1]))["cognito:username"];oe(T);const A=localStorage.getItem("selectPhotosButtonTimestamp");if(A){const M=parseInt(A,10),ne=(Date.now()-M)/(1e3*60);de(ne<10),ne>=10&&localStorage.removeItem("selectPhotosButtonTimestamp")}else de(!1)}catch(R){console.error("Failed to decode token",R)}})()},[]),y.useEffect(()=>{r!=null&&r.folderName?document.title=r.folderName:document.title=t("Photos")},[r,u]),e.jsxs(to,{children:[e.jsx(To,{}),e.jsx(oo,{children:e.jsxs(ro,{children:[e.jsx(ko,{children:j?e.jsxs("div",{style:{display:"flex",gap:"16px"},children:[e.jsxs(H,{onClick:Et,disabled:k.size===0,style:{opacity:k.size===0?.5:1,backgroundColor:k.size>0?"#006adc":void 0,color:k.size>0?"white":void 0},children:[t("Create Sub-album")," (",k.size,")"]}),e.jsx(H,{onClick:Rt,children:t("Cancel")})]}):e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",width:"100%",flexWrap:"nowrap",alignItems:"center"},children:[e.jsx("div",{style:{flexShrink:0},children:!_e()&&e.jsx(io,{onClick:jt,children:t("Create Sub-album")})}),e.jsxs("div",{style:{marginLeft:"auto",display:"flex",alignItems:"center"},children:[!j&&!h&&l&&l!=="NoPassword"&&e.jsx(H,{onClick:G,children:t("Enter Password")}),!j&&!(!h&&l&&l!=="NoPassword")&&e.jsx(Qo,{addPhotosToAlbum:Ct,saveAlbum:It,downloadPhotos:Tt,promptForPassword:G,showingEnterPassword:_e(),passwordPolicy:l,usingFolderInviteGrantsRightToAddItems:r==null?void 0:r.usingFolderInviteGrantsRightToAddItems,t})]})]})}),e.jsxs(so,{children:[e.jsx(Io,{htmlFor:"columns",id:"columns-label",children:e.jsx("strong",{children:t("Columns:")})}),e.jsxs(jo,{id:"columns",value:a,onChange:x=>wt(x.target.value),children:[e.jsx("option",{value:"1",children:"1"}),e.jsx("option",{value:"2",children:"2"}),e.jsx("option",{value:"3",children:"3"}),e.jsx("option",{value:"4",children:"4"}),e.jsx("option",{value:"5",children:"5"})]})]})]})}),e.jsxs(fo,{id:"media-container",children:[ht&&(r==null?void 0:r.usingFolderInviteGrantsRightToAddItems)&&e.jsx("div",{style:{width:"100%",display:"flex",justifyContent:"center",marginBottom:"20px",marginTop:"10px"},children:e.jsx("button",{onClick:ze,style:{backgroundColor:"#007bff",color:"white",border:"none",borderRadius:"6px",padding:"12px 20px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"8px",fontSize:"16px",boxShadow:"0 2px 4px rgba(0,0,0,0.1)"},children:e.jsx("span",{children:t("Select Photos To Add To Album")})})}),r&&Object.keys(r.contacts).length>0&&e.jsx("div",{style:{width:"100%",backgroundColor:"#f0f7ff",borderRadius:"8px",padding:"16px",marginBottom:"20px",boxShadow:"0 2px 4px rgba(0,0,0,0.1)",border:"1px solid #d0e1f9"},children:e.jsxs("p",{style:{margin:"0",fontSize:"15px",color:"#333",textAlign:"left"},children:[t('Click "Add" to create a memory with '),e.jsx("strong",{children:Object.values(r.contacts).filter(x=>!x.toString().startsWith("Profile-")).join(", ")}),t(" that you can filter for later")]})}),U&&e.jsxs("div",{style:{width:"100%",marginBottom:"20px"},children:[e.jsx(Go,{progressTracker:K,t,isRTL:Nt(u)==="rtl",style:{marginTop:"20px"}}),K.filesComplete>0&&K.filesComplete===K.totalFiles&&e.jsx("div",{style:{backgroundColor:"#e8f5e9",color:"#2e7d32",padding:"10px 16px",borderRadius:"6px",fontSize:"14px",marginTop:"10px",textAlign:"center"},children:t("Upload complete! Preparing to save your album...")}),K.filesWithError>0&&e.jsx("div",{style:{backgroundColor:"#ffebee",color:"#c62828",padding:"10px 16px",borderRadius:"6px",fontSize:"14px",marginTop:"10px",textAlign:"center"},children:t("Some files could not be uploaded. You can continue with the successfully uploaded files.")})]}),!h&&l==="NotVisible"&&e.jsxs("div",{style:{padding:"20px",backgroundColor:"#f3f4f6",borderRadius:"8px",textAlign:"center",marginBottom:"20px"},children:[e.jsx("h3",{children:t("This album is password protected")}),e.jsx("p",{children:t("Please enter the password to view the contents")}),v&&e.jsx("div",{style:{color:"#d32f2f",fontSize:"14px",margin:"10px 0",padding:"5px",backgroundColor:"rgba(211, 47, 47, 0.1)",borderRadius:"4px"},children:v}),e.jsx("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"10px"},children:e.jsx(H,{onClick:G,children:t("Enter Password")})})]}),j&&e.jsx(Ao,{children:e.jsx("p",{children:t("Select photos and videos to create a sub-album to share")})}),(r==null?void 0:r.folderName)&&r.folderName!==t("Photos")&&r.folderName.trim()!==""&&e.jsx(uo,{id:"album-title",children:e.jsx(po,{children:r.folderName})}),r!=null&&r.folderDescription&&r.folderDescription.trim()!==""?e.jsx(ho,{id:"description-container",children:e.jsx(go,{children:r.folderDescription})}):null,e.jsx(mo,{id:"media-grid",columns:a,children:d?e.jsx(Po,{id:"loading-message",children:t("Loading album content...")}):n?e.jsx(me,{children:n}):mt()?r&&r.mediaItems.length===0?e.jsx(me,{children:t("No media found in this album")}):r==null?void 0:r.mediaItems.map((x,w)=>{const R=x.ownerId&&r.contacts[x.ownerId]?r.contacts[x.ownerId]:"",T=k.has(w),A=Be();return e.jsxs("div",{style:{position:"relative",border:j&&T?"3px solid #006adc":void 0,borderRadius:"8px",overflow:"hidden",boxShadow:j&&T?"0 0 0 3px rgba(0, 106, 220, 0.3)":void 0},onClick:M=>j?Me(w,M):re(w),children:[j&&e.jsx(Lo,{isSelected:T,onClick:M=>Me(w,M),children:T&&e.jsx(Bo,{children:"✓"})}),x.type==="image"?e.jsx(ke,{src:x.url,thumbnailSrc:x.thumbnailUrl,alt:`Album image ${w+1}`,loadFullResolution:L[w]||!1,onFullResolutionLoaded:()=>De(w),onClick:()=>j?void 0:re(w),showWatermark:A}):e.jsx(_o,{thumbnailUrl:x.thumbnailUrl||"",videoUrl:x.url,duration:x.duration||"0:00",index:w,onFullResolutionLoaded:()=>De(w),onClick:()=>j?void 0:re(w),showWatermark:A}),R&&e.jsx(wo,{children:R})]},w)}):e.jsx("div",{style:{gridColumn:"1 / -1",textAlign:"center",padding:"40px 0"},children:e.jsx(me,{children:t("Enter the password to view album contents")})})})]}),e.jsx(qo,{isOpen:S,onClose:()=>{b(!1),I(null)},onSubmit:xt,error:v,t}),e.jsx(Vo,{isOpen:te,onClose:()=>J(!1),onLoginSuccess:St,t}),e.jsx(Ht,{onFileSelection:Pt,ref:O}),P!==null&&r&&e.jsx(Do,{item:r.mediaItems[P],index:P,onClose:vt,onPrev:bt,onNext:yt,hasNext:P<r.mediaItems.length-1,hasPrev:P>0,albumName:r.folderName,showWatermark:Be()})]})},Jo=()=>e.jsx(Mt,{children:e.jsx(Ko,{})});zt.createRoot(document.getElementById("root")).render(e.jsx(Jo,{}));
