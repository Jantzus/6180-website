import{ab as ft,ac as ht,k as we,a8 as Ge,l as gt,d as w,ad as W,j as r,ae as K,r as b,u as be,af as mt,i as Qt,C as Se,R as Gt,ag as xt,ah as vt,ai as te,aj as yt,ak as ge,al as Ve,a as Vt,I as Jt,G as Kt,g as Ie}from"./styled-components-BaNm_kET.js";import{c as J,l as Xt,b as wt,n as Z,o as Yt,q as Zt,r as er,t as tr,v as rr,j as or,w as nr,g as ir,i as sr,u as Je,p as ar}from"./utils-IiT-_NTh.js";import{U as lr,F as dr,d as cr}from"./FileInput-CNu1xAkW.js";import{u as ur,U as pr}from"./customHooks-ksbsXZL8.js";import{C as fr,S as hr,I as gr,R as mr}from"./SignUpCommand-Oa3ebleT.js";import{C as xr,a as vr}from"./Modals-CIKTPGld.js";import"./parseJsonBody-BvA1ed5S.js";const me=`
  mutation FetchFolderPositions($fetchRelationsInput: FetchRelationsInput!) {
    fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
      items {
        ... on Folder {
          id
          albumNanoId
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
`,xe=(t,l)=>{var g,m,v,x,C;const i=((m=(g=t==null?void 0:t.data)==null?void 0:g.fetchRelations)==null?void 0:m.items)||[],n=[],u={};let s="Photos",d,a="",o,e=!1,c=!1,p,f=!1;const h=new Set;if(i.length>0){const y=i[0];l&&(y!=null&&y.id)&&l(y.id),y!=null&&y.albumNanoId&&(d=d),y!=null&&y.folderName&&y.folderName.length>0&&(s=y.folderName),y!=null&&y.folderDescription&&y.folderDescription.length>0&&(a=y.folderDescription),y!=null&&y.folderPassword&&(y.folderPassword.policy&&(o=y.folderPassword.policy,e=o!=="NoPassword"),y.folderPassword.password&&o!=="NoPassword"&&(c=!0,p=y.folderPassword.password)),y!=null&&y.folderInviteParameters&&(f=!!y.folderInviteParameters.usingFolderInviteGrantsRightToAddItems),(((x=(v=i[0])==null?void 0:v.contactsUsingInvite)==null?void 0:x.items)||[]).forEach(P=>{var R;P!=null&&P.id&&((R=P==null?void 0:P.item)!=null&&R.publicDisplayName)&&(u[P.id]=P.item.publicDisplayName)}),(((C=y==null?void 0:y.fileReferencesPage)==null?void 0:C.items)||[]).forEach(P=>{const R=P==null?void 0:P.file;if(!(R!=null&&R.dataKey))return;const{id:j,dataKey:k,thumbnailDataKey:A,durationInSeconds:S,ownerContactId:B}=R;if(h.has(k))return;h.add(k);const _=`${Ge}${k}`,M=A?`${Ge}${A}`:void 0;k.startsWith("Input/Image/")?n.push({type:"image",fileId:j,url:_,thumbnailUrl:M||_,ownerContactId:B,loaded:!1}):k.startsWith("Input/Video/")&&n.push({type:"video",fileId:j,url:_,thumbnailUrl:M||_,duration:Xt(S),ownerContactId:B,loaded:!1})})}return{mediaItems:n,folderName:s,albumNanoId:d,folderDescription:a,contacts:u,passwordPolicy:o,passwordRequired:e,hasPassword:c,actualPassword:p,usingFolderInviteGrantsRightToAddItems:f}},yr=async(t,l)=>{var i,n,u,s;try{const a={fetchRelationsInput:{targetItemIdentifier____RelationType:`${t}____Folder`,index:"targetItemIdentifier____RelationType",limit:1,scanIndexForward:!1,nextToken:null}},o=fetch(ft,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":ht},body:JSON.stringify({query:me,variables:a})}).then(h=>h.json()),e=(async()=>{const h=await J();return h?fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${h}`},body:JSON.stringify({query:me,variables:a})}).then(g=>g.json()):null})(),c=await o;let p=xe(c,l);const f=await e;if(f){const h=(s=(u=(n=(i=f==null?void 0:f.data)==null?void 0:i.fetchRelations)==null?void 0:n.items)==null?void 0:u[0])==null?void 0:s.folderPosition;if(h){const g=xe(f,l);g.folderPositionId=h==null?void 0:h.id,g.profileIds=h==null?void 0:h.profileIds,p=g}}return p}catch(d){return console.error("Error fetching folder data:",d),null}},wr=async(t,l)=>{var i,n,u,s;try{const a={fetchRelationsInput:{albumNanoId:t,index:"albumNanoId",limit:1,scanIndexForward:!1,nextToken:null}},o=fetch(ft,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":ht},body:JSON.stringify({query:me,variables:a})}).then(h=>h.json()),e=(async()=>{const h=await J();return h?fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${h}`},body:JSON.stringify({query:me,variables:a})}).then(g=>g.json()):null})(),c=await o;let p=xe(c,l);const f=await e;if(f){const h=(s=(u=(n=(i=f==null?void 0:f.data)==null?void 0:i.fetchRelations)==null?void 0:n.items)==null?void 0:u[0])==null?void 0:s.folderPosition;if(h){const g=xe(f,l);g.folderPositionId=h==null?void 0:h.id,g.profileIds=h==null?void 0:h.profileIds,p=g}}return p}catch(d){return console.error("Error fetching folder data:",d),null}},pe=async(t,l,i)=>{console.log("Starting album registration");const n=document.createElement("div");n.style.position="fixed",n.style.top="0",n.style.left="0",n.style.width="100%",n.style.height="100%",n.style.backgroundColor="rgba(0, 0, 0, 0.5)",n.style.display="flex",n.style.justifyContent="center",n.style.alignItems="center",n.style.zIndex="2000";const u=document.createElement("div");u.style.backgroundColor="white",u.style.padding="30px",u.style.borderRadius="8px",u.style.textAlign="center";const s=document.createElement("p");s.id="saveProgressText",s.textContent=t("Registering album...");const d=document.createElement("div");d.style.backgroundColor="#f0f0f0",d.style.borderRadius="4px",d.style.overflow="hidden",d.style.height="8px",d.style.marginTop="10px";const a=document.createElement("div");a.id="saveProgress",a.style.backgroundColor="#4caf50",a.style.height="100%",a.style.width="5%",a.style.transition="width 0.3s ease";const o=document.createElement("p");o.id="saveErrorText",o.style.color="#f44336",o.style.display="none",o.style.marginTop="10px",o.style.fontSize="14px",d.appendChild(a),u.appendChild(s),u.appendChild(d),u.appendChild(o),n.appendChild(u),document.body.appendChild(n);try{const e=await wt();if(!e){console.error("No token available for registering album"),document.body.removeChild(n);return}if(!JSON.parse(atob(e.split(".")[1]))["cognito:username"]){console.error("Missing username in token"),Z(o,"Could not retrieve username from token",s,a);return}if(!l){console.error("No folder ID available"),Z(o,"Folder ID is missing",s,a);return}if(!i||!i.mediaItems){console.error("No album data available"),Z(o,"Album data is missing or incomplete",s,a);return}if(i.mediaItems.length===0){console.error("No media items to save"),Z(o,"No media items in album to save",s,a);return}const f=Math.floor(Date.now()/1e3);fe(30,s,a,t("Preparing album data..."));const h={currentTime:f,folderId:l,profileIds:["Only Me_____Only Me____Profile"],folderPositionSelectedTagInputs:[],folderPositionPoints:1};console.log("Folder position input:",h),fe(50,s,a,t("Saving album..."));const g=`
      mutation SaveAlbum(
        $folderPositionInputs: [FolderPositionInput!]
      ) {
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items { id }
        }
      }
    `,m={folderPositionInputs:[h]};console.log("GraphQL mutation variables:",JSON.stringify(m));try{const v=await fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({query:g,variables:m})});if(fe(80,s,a,t("Almost there...")),!v.ok)throw new Error(`HTTP error: ${v.status} ${v.statusText}`);const x=await v.text();let C;try{C=JSON.parse(x),console.log("API response:",C)}catch(y){const P=y instanceof Error?y.message:"Unknown JSON parse error";throw new Error(`Invalid JSON response: ${P}`)}if(C.errors&&C.errors.length>0){const y=C.errors.map(P=>(console.error("GraphQL error:",P),P.message||"Unknown GraphQL error")).join("; ");throw new Error(`GraphQL errors: ${y}`)}console.log("Album registered successfully"),fe(100,s,a,t("Album registered successfully!")),sessionStorage.setItem("album_just_saved","true"),setTimeout(()=>{document.body.removeChild(n),window.location.href="/my-albums.html"},2e3)}catch(v){const x=v instanceof Error?v.message:"Unknown API error";console.error("Error in API request:",v),Z(o,x,s,a)}}catch(e){const c=e instanceof Error?e.message:"Unknown error";console.error("Error registering album:",e),Z(o,c,s,a)}},br=async(t,l,i)=>{if(i.size===0){alert(t("Please select at least one item to share."));return}if(l)try{const n=document.createElement("div");n.style.position="fixed",n.style.top="0",n.style.left="0",n.style.width="100%",n.style.height="100%",n.style.backgroundColor="rgba(0, 0, 0, 0.5)",n.style.display="flex",n.style.justifyContent="center",n.style.alignItems="center",n.style.zIndex="2000";const u=document.createElement("div");u.style.backgroundColor="white",u.style.padding="30px",u.style.borderRadius="8px",u.style.textAlign="center";const s=document.createElement("p");s.textContent=t("Creating sub-album..."),u.appendChild(s),n.appendChild(u),document.body.appendChild(n);const d=[],a=[];Array.from(i).forEach(e=>{var p;const c=l.mediaItems[e];if(c&&c.fileId){d.push(c.fileId);const f={fileName:((p=c.fileId.split("_____")[1])==null?void 0:p.split("____")[0])||`file-${e}`,s3PreviewUrl:c.type==="video"&&c.thumbnailUrl||c.url,type:c.type==="video"?"video":"image",size:0,status:"complete",progress:100,fileId:c.fileId,duration:c.type==="video"&&c.duration?parseFloat(c.duration.split(":").reduce((h,g)=>60*h+parseFloat(g),0).toString()):null};a.push(f)}});const o={isSubAlbum:!0,selectedFileIds:d,selectedPhotos:a};localStorage.setItem(gt.SUB_ALBUM_DATA,JSON.stringify(o)),document.body.removeChild(n),window.location.href="/save-album.html"}catch(n){console.error("Error creating sub-album:",n),alert(t("There was an error creating the sub-album. Please try again."))}},fe=(t,l,i,n)=>{i.style.width=`${t}%`,n&&(l.textContent=n)},Cr=w.div`
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
`,Pr=w.div`
  position: sticky;
  top: 0;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0,0,0,0.06);
  z-index: 10;
  margin-bottom: 10px;
  width: 100%;
`,Sr=w.div`
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  
  @media (max-width: 767px) {
    padding: 16px 16px;
  }
`,Ir=w.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 5px;
  gap: 10px;
  flex-wrap: wrap;
`,Tr=w.button`
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
`,jr=w.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`,kr=w.h2`
  font-weight: 400;
  margin: 0 0 16px 0;
  font-size: 24px;
  padding: 0;
  
  @media (max-width: 767px) {
    padding: 0;
  }
`,Er=w.strong`
  font-weight: 700;
`,Rr=w.div`
  padding: 0 24px 20px;
  width: 100%;
  overflow: visible; // Allow content to flow naturally
  
  @media (max-width: 767px) {
    padding: 0 16px 15px;
    width: 100%;
  }
`,Lr=w.div`
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  width: 100%;
`,Ar=w.p`
  color: #333;
  margin: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  max-width: 100%;
`,_r=w.div`
  display: grid;
  grid-gap: 20px;
  width: 100%;
  min-height: 0; // Allow proper sizing
  
  ${t=>{switch(t.columns){case"1":return W`grid-template-columns: repeat(1, 1fr);`;case"2":return W`grid-template-columns: repeat(2, 1fr);`;case"3":return W`grid-template-columns: repeat(3, 1fr);`;case"4":return W`grid-template-columns: repeat(4, 1fr);`;case"5":return W`grid-template-columns: repeat(5, 1fr);`;default:return W`grid-template-columns: repeat(1, 1fr);`}}}
  
  @media (max-width: 767px) {
    grid-gap: 8px;
    ${t=>{const l=parseInt(t.columns);return l>3?W`grid-template-columns: repeat(3, minmax(0, 1fr));`:l>1?W`grid-template-columns: repeat(${l}, minmax(0, 1fr));`:W`grid-template-columns: repeat(1, minmax(0, 1fr));`}}
  }
`,Br=w.div`
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
  
  ${t=>t.isHovered&&W`
    transform: translateY(-2px);
  `}
  
  ${t=>t.isVideo&&W`
    cursor: pointer;
  `}
  
  @media (max-width: 767px) {
    border-radius: 4px;
    margin-bottom: 10px; // Less margin on mobile
  }
`,Mr=w.div`
  position: relative;
  overflow: hidden;
  background-color: #f0f0f0;
  width: 100%;
  padding-bottom: 75%; // Create a consistent aspect ratio (4:3)
  height: 0; // Use padding-bottom for aspect ratio
  
  @media (max-width: 767px) {
    padding-bottom: 100%; // Square aspect ratio on mobile
  }
`,Ke=w.div`
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
`,Or=w.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  transition: opacity 0.3s;
  opacity: ${t=>t.isLoaded?1:0};
`,Nr=w.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading-animation 1.5s infinite;
  z-index: 0;
`,Dr=w.div`
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
`,zr=w.div`
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
`,Ur=w.div`
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
`,Te=w.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #d32f2f;
  grid-column: 1 / -1;
  width: 100%;
`,Fr=w.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
  grid-column: 1 / -1;
  width: 100%;
`,$r=w.label`
  margin-right: 8px;
  font-size: 14px;
  color: #555;
  font-weight: normal;
`,Wr=w.select`
  padding: 5px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  font-size: 14px;
  min-width: 50px;
`,Hr=w.div`
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
`,qr=w.div`
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
`;w.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;w.div`
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
`;w.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
  
  @media (max-width: 767px) {
    font-size: 18px;
  }
`;w.ol`
  list-style-type: decimal;
  padding-left: 20px;
`;w.li`
  margin-bottom: 12px;
  font-size: 16px;
  
  @media (max-width: 767px) {
    font-size: 14px;
  }
`;w.button`
  margin-top: 16px;
  padding: 8px 16px;
  background-color: #006adc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;const bt=w.div`
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
`;w.p`
  font-style: italic;
  margin-top: 12px;
  margin-bottom: 12px;
  text-align: center;
  
  @media (max-width: 767px) {
    font-size: 14px;
  }
`;const Qr=w(Ir)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  
  > div {
    width: auto;
    display: flex;
    align-items: center;
  }
`;w(Br)`
  ${t=>t.isSelected&&`
    border: 3px solid #006adc;
    box-shadow: 0 0 0 3px rgba(0, 106, 220, 0.3);
  `}
`;const Gr=w.div`
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
`,Vr=w.div`
  padding: 10px 20px;
  background-color: #f0f7ff;
  border-radius: 4px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`,Jr=w.div`
  color: white;
  font-size: 14px;
  font-weight: bold;
`,ve=w.div`
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
`,ye=w.div`
  color: white;
  font-size: 24px;
  font-weight: bold;
  transform: rotate(-30deg);
  opacity: 0.7;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
  user-select: none;
  white-space: nowrap;
`,Kr=w.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 2000;
  display: flex;
  flex-direction: column;
`,Ue=w.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 16px;
  padding: 5px 10px;
  cursor: ${t=>t.isDisabled?"not-allowed":"pointer"};
  opacity: ${t=>t.isDisabled?.5:1};
`;w(Ue)``;const Xr=w.div`
  display: flex;
  gap: 10px;
`,Yr=w.a`
  text-decoration: none;
  color: white;
  background-color: #006adc;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
`,Zr=w.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  opacity: ${t=>t.isLoaded?1:0};
  transition: opacity 0.3s;
`,eo=w.img`
  position: absolute;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  opacity: 0.5;
`,to=w.video`
  max-width: 100%;
  max-height: 100%;
`,ro=w.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  z-index: 10;
`,Xe=w.div`
  position: relative;
`,oo=({showSelectPhotosButton:t,albumData:l,openFilePicker:i,t:n})=>!t||!(l!=null&&l.usingFolderInviteGrantsRightToAddItems)?null:r.jsx("div",{style:{width:"100%",display:"flex",justifyContent:"center",marginBottom:"20px",marginTop:"10px"},children:r.jsx("button",{onClick:i,style:{backgroundColor:"#007bff",color:"white",border:"none",borderRadius:"6px",padding:"12px 20px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"8px",fontSize:"16px",boxShadow:"0 2px 4px rgba(0,0,0,0.1)"},children:r.jsx("span",{children:n("Select Photos To Add To Album")})})}),no=({isAuthorized:t,passwordPolicy:l,passwordError:i,promptForPassword:n,t:u})=>t||l!=="NotVisible"?null:r.jsxs("div",{style:{padding:"20px",backgroundColor:"#f3f4f6",borderRadius:"8px",textAlign:"center",marginBottom:"20px"},children:[r.jsx("h3",{children:u("This album is password protected")}),r.jsx("p",{children:u("Please enter the password to view the contents")}),i&&r.jsx("div",{style:{color:"#d32f2f",fontSize:"14px",margin:"10px 0",padding:"5px",backgroundColor:"rgba(211, 47, 47, 0.1)",borderRadius:"4px"},children:i}),r.jsx("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"10px"},children:r.jsx(K,{onClick:n,children:u("Enter Password")})})]}),io=({isSelectionMode:t,t:l})=>t?r.jsx(Vr,{children:r.jsx("p",{children:l("Select photos and videos to create a sub-album to share")})}):null,so=w.div`
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
`,ao=w.div`
  padding: 15px;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
`,lo=w.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  &:hover {
    opacity: 0.8;
  }
`,co=w.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  padding: 10px;
  position: relative;
  touch-action: pan-y; /* Allow vertical scrolling but capture horizontal swipes */
`,uo=({item:t,index:l,onClose:i,onPrev:n,onNext:u,hasNext:s,hasPrev:d,ownerName:a,showWatermark:o=!1})=>{const[e,c]=b.useState(!1),[p,f]=b.useState(!0),{t:h}=be(),g=b.useRef(null),m=b.useRef(null),v=b.useRef(null),x=50,[C,y]=b.useState(!1),P=b.useRef(0);b.useEffect(()=>{const S=B=>{B.key==="Escape"?i():B.key==="ArrowLeft"&&d?n():B.key==="ArrowRight"&&s&&u()};return window.addEventListener("keydown",S),()=>window.removeEventListener("keydown",S)},[i,u,n,s,d]);const R=S=>{g.current=S.touches[0].clientX,v.current&&(P.current=v.current.scrollTop),y(!1)},j=S=>{g.current!==null&&(v.current&&Math.abs(v.current.scrollTop-P.current)>10&&y(!0),m.current=S.touches[0].clientX)},k=()=>{if(g.current===null||m.current===null||C){g.current=null,m.current=null;return}const S=m.current-g.current;Math.abs(S)>x&&(S>0&&d?n():S<0&&s&&u()),g.current=null,m.current=null},A=S=>(S==null?void 0:S.split("_____")[0])||"";return r.jsxs(Kr,{children:[r.jsxs(so,{children:[r.jsx(lo,{onClick:i,children:"✕"}),r.jsxs(Xr,{children:[r.jsx(Ue,{onClick:d?n:void 0,disabled:!d,isDisabled:!d,children:"←"}),r.jsx(Ue,{onClick:s?u:void 0,disabled:!s,isDisabled:!s,children:"→"})]})]}),r.jsxs(co,{ref:v,onTouchStart:R,onTouchMove:j,onTouchEnd:k,children:[t.type==="image"?r.jsxs(Xe,{children:[r.jsx(Zr,{src:t.url,alt:`Image ${l+1}`,isLoaded:e,onLoad:()=>{c(!0),f(!1)}}),o&&r.jsx(ve,{children:r.jsx(ye,{children:"6180 Watermarked"})}),!e&&t.thumbnailUrl&&r.jsx(eo,{src:t.thumbnailUrl,alt:`Thumbnail ${l+1}`})]}):r.jsxs(Xe,{children:[r.jsxs(to,{controls:!0,autoPlay:!0,onLoadedData:()=>f(!1),children:[r.jsx("source",{src:t.url,type:"video/mp4"}),h("Your browser does not support the video tag.")]}),o&&r.jsx(ve,{children:r.jsx(ye,{children:"6180 Watermarked"})})]}),p&&r.jsx(ro,{children:t.type==="image"?h("Loading full resolution..."):h("Loading video...")})]}),r.jsx(ao,{children:t.ownerContactId&&r.jsxs(Yr,{href:`/profile.html?id=${A(t.ownerContactId)}`,children:[r.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[r.jsx("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),r.jsx("circle",{cx:"12",cy:"7",r:"4"})]}),a]})})]})};var ee={},je={exports:{}},ke,Ye;function po(){if(Ye)return ke;Ye=1;var t="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return ke=t,ke}var Ee,Ze;function fo(){if(Ze)return Ee;Ze=1;var t=po();function l(){}function i(){}return i.resetWarningCache=l,Ee=function(){function n(d,a,o,e,c,p){if(p!==t){var f=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw f.name="Invariant Violation",f}}n.isRequired=n;function u(){return n}var s={array:n,bigint:n,bool:n,func:n,number:n,object:n,string:n,symbol:n,any:n,arrayOf:u,element:n,elementType:n,instanceOf:u,node:n,objectOf:u,oneOf:u,oneOfType:u,shape:u,exact:u,checkPropTypes:i,resetWarningCache:l};return s.PropTypes=s,s},Ee}var et;function Ct(){return et||(et=1,je.exports=fo()()),je.exports}var Re,tt;function Pt(){return tt||(tt=1,Re={L:1,M:0,Q:3,H:2}),Re}var Le,rt;function St(){return rt||(rt=1,Le={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8}),Le}var Ae,ot;function ho(){if(ot)return Ae;ot=1;var t=St();function l(i){this.mode=t.MODE_8BIT_BYTE,this.data=i}return l.prototype={getLength:function(i){return this.data.length},write:function(i){for(var n=0;n<this.data.length;n++)i.put(this.data.charCodeAt(n),8)}},Ae=l,Ae}var _e,nt;function go(){if(nt)return _e;nt=1;var t=Pt();function l(i,n){this.totalCount=i,this.dataCount=n}return l.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],l.getRSBlocks=function(i,n){var u=l.getRsBlockTable(i,n);if(u==null)throw new Error("bad rs block @ typeNumber:"+i+"/errorCorrectLevel:"+n);for(var s=u.length/3,d=new Array,a=0;a<s;a++)for(var o=u[a*3+0],e=u[a*3+1],c=u[a*3+2],p=0;p<o;p++)d.push(new l(e,c));return d},l.getRsBlockTable=function(i,n){switch(n){case t.L:return l.RS_BLOCK_TABLE[(i-1)*4+0];case t.M:return l.RS_BLOCK_TABLE[(i-1)*4+1];case t.Q:return l.RS_BLOCK_TABLE[(i-1)*4+2];case t.H:return l.RS_BLOCK_TABLE[(i-1)*4+3];default:return}},_e=l,_e}var Be,it;function mo(){if(it)return Be;it=1;function t(){this.buffer=new Array,this.length=0}return t.prototype={get:function(l){var i=Math.floor(l/8);return(this.buffer[i]>>>7-l%8&1)==1},put:function(l,i){for(var n=0;n<i;n++)this.putBit((l>>>i-n-1&1)==1)},getLengthInBits:function(){return this.length},putBit:function(l){var i=Math.floor(this.length/8);this.buffer.length<=i&&this.buffer.push(0),l&&(this.buffer[i]|=128>>>this.length%8),this.length++}},Be=t,Be}var Me,st;function It(){if(st)return Me;st=1;for(var t={glog:function(i){if(i<1)throw new Error("glog("+i+")");return t.LOG_TABLE[i]},gexp:function(i){for(;i<0;)i+=255;for(;i>=256;)i-=255;return t.EXP_TABLE[i]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},l=0;l<8;l++)t.EXP_TABLE[l]=1<<l;for(var l=8;l<256;l++)t.EXP_TABLE[l]=t.EXP_TABLE[l-4]^t.EXP_TABLE[l-5]^t.EXP_TABLE[l-6]^t.EXP_TABLE[l-8];for(var l=0;l<255;l++)t.LOG_TABLE[t.EXP_TABLE[l]]=l;return Me=t,Me}var Oe,at;function Tt(){if(at)return Oe;at=1;var t=It();function l(i,n){if(i.length==null)throw new Error(i.length+"/"+n);for(var u=0;u<i.length&&i[u]==0;)u++;this.num=new Array(i.length-u+n);for(var s=0;s<i.length-u;s++)this.num[s]=i[s+u]}return l.prototype={get:function(i){return this.num[i]},getLength:function(){return this.num.length},multiply:function(i){for(var n=new Array(this.getLength()+i.getLength()-1),u=0;u<this.getLength();u++)for(var s=0;s<i.getLength();s++)n[u+s]^=t.gexp(t.glog(this.get(u))+t.glog(i.get(s)));return new l(n,0)},mod:function(i){if(this.getLength()-i.getLength()<0)return this;for(var n=t.glog(this.get(0))-t.glog(i.get(0)),u=new Array(this.getLength()),s=0;s<this.getLength();s++)u[s]=this.get(s);for(var s=0;s<i.getLength();s++)u[s]^=t.gexp(t.glog(i.get(s))+n);return new l(u,0).mod(i)}},Oe=l,Oe}var Ne,lt;function xo(){if(lt)return Ne;lt=1;var t=St(),l=Tt(),i=It(),n={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},u={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(s){for(var d=s<<10;u.getBCHDigit(d)-u.getBCHDigit(u.G15)>=0;)d^=u.G15<<u.getBCHDigit(d)-u.getBCHDigit(u.G15);return(s<<10|d)^u.G15_MASK},getBCHTypeNumber:function(s){for(var d=s<<12;u.getBCHDigit(d)-u.getBCHDigit(u.G18)>=0;)d^=u.G18<<u.getBCHDigit(d)-u.getBCHDigit(u.G18);return s<<12|d},getBCHDigit:function(s){for(var d=0;s!=0;)d++,s>>>=1;return d},getPatternPosition:function(s){return u.PATTERN_POSITION_TABLE[s-1]},getMask:function(s,d,a){switch(s){case n.PATTERN000:return(d+a)%2==0;case n.PATTERN001:return d%2==0;case n.PATTERN010:return a%3==0;case n.PATTERN011:return(d+a)%3==0;case n.PATTERN100:return(Math.floor(d/2)+Math.floor(a/3))%2==0;case n.PATTERN101:return d*a%2+d*a%3==0;case n.PATTERN110:return(d*a%2+d*a%3)%2==0;case n.PATTERN111:return(d*a%3+(d+a)%2)%2==0;default:throw new Error("bad maskPattern:"+s)}},getErrorCorrectPolynomial:function(s){for(var d=new l([1],0),a=0;a<s;a++)d=d.multiply(new l([1,i.gexp(a)],0));return d},getLengthInBits:function(s,d){if(1<=d&&d<10)switch(s){case t.MODE_NUMBER:return 10;case t.MODE_ALPHA_NUM:return 9;case t.MODE_8BIT_BYTE:return 8;case t.MODE_KANJI:return 8;default:throw new Error("mode:"+s)}else if(d<27)switch(s){case t.MODE_NUMBER:return 12;case t.MODE_ALPHA_NUM:return 11;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 10;default:throw new Error("mode:"+s)}else if(d<41)switch(s){case t.MODE_NUMBER:return 14;case t.MODE_ALPHA_NUM:return 13;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 12;default:throw new Error("mode:"+s)}else throw new Error("type:"+d)},getLostPoint:function(s){for(var d=s.getModuleCount(),a=0,o=0;o<d;o++)for(var e=0;e<d;e++){for(var c=0,p=s.isDark(o,e),f=-1;f<=1;f++)if(!(o+f<0||d<=o+f))for(var h=-1;h<=1;h++)e+h<0||d<=e+h||f==0&&h==0||p==s.isDark(o+f,e+h)&&c++;c>5&&(a+=3+c-5)}for(var o=0;o<d-1;o++)for(var e=0;e<d-1;e++){var g=0;s.isDark(o,e)&&g++,s.isDark(o+1,e)&&g++,s.isDark(o,e+1)&&g++,s.isDark(o+1,e+1)&&g++,(g==0||g==4)&&(a+=3)}for(var o=0;o<d;o++)for(var e=0;e<d-6;e++)s.isDark(o,e)&&!s.isDark(o,e+1)&&s.isDark(o,e+2)&&s.isDark(o,e+3)&&s.isDark(o,e+4)&&!s.isDark(o,e+5)&&s.isDark(o,e+6)&&(a+=40);for(var e=0;e<d;e++)for(var o=0;o<d-6;o++)s.isDark(o,e)&&!s.isDark(o+1,e)&&s.isDark(o+2,e)&&s.isDark(o+3,e)&&s.isDark(o+4,e)&&!s.isDark(o+5,e)&&s.isDark(o+6,e)&&(a+=40);for(var m=0,e=0;e<d;e++)for(var o=0;o<d;o++)s.isDark(o,e)&&m++;var v=Math.abs(100*m/d/d-50)/5;return a+=v*10,a}};return Ne=u,Ne}var De,dt;function vo(){if(dt)return De;dt=1;var t=ho(),l=go(),i=mo(),n=xo(),u=Tt();function s(a,o){this.typeNumber=a,this.errorCorrectLevel=o,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}var d=s.prototype;return d.addData=function(a){var o=new t(a);this.dataList.push(o),this.dataCache=null},d.isDark=function(a,o){if(a<0||this.moduleCount<=a||o<0||this.moduleCount<=o)throw new Error(a+","+o);return this.modules[a][o]},d.getModuleCount=function(){return this.moduleCount},d.make=function(){if(this.typeNumber<1){var a=1;for(a=1;a<40;a++){for(var o=l.getRSBlocks(a,this.errorCorrectLevel),e=new i,c=0,p=0;p<o.length;p++)c+=o[p].dataCount;for(var p=0;p<this.dataList.length;p++){var f=this.dataList[p];e.put(f.mode,4),e.put(f.getLength(),n.getLengthInBits(f.mode,a)),f.write(e)}if(e.getLengthInBits()<=c*8)break}this.typeNumber=a}this.makeImpl(!1,this.getBestMaskPattern())},d.makeImpl=function(a,o){this.moduleCount=this.typeNumber*4+17,this.modules=new Array(this.moduleCount);for(var e=0;e<this.moduleCount;e++){this.modules[e]=new Array(this.moduleCount);for(var c=0;c<this.moduleCount;c++)this.modules[e][c]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(a,o),this.typeNumber>=7&&this.setupTypeNumber(a),this.dataCache==null&&(this.dataCache=s.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,o)},d.setupPositionProbePattern=function(a,o){for(var e=-1;e<=7;e++)if(!(a+e<=-1||this.moduleCount<=a+e))for(var c=-1;c<=7;c++)o+c<=-1||this.moduleCount<=o+c||(0<=e&&e<=6&&(c==0||c==6)||0<=c&&c<=6&&(e==0||e==6)||2<=e&&e<=4&&2<=c&&c<=4?this.modules[a+e][o+c]=!0:this.modules[a+e][o+c]=!1)},d.getBestMaskPattern=function(){for(var a=0,o=0,e=0;e<8;e++){this.makeImpl(!0,e);var c=n.getLostPoint(this);(e==0||a>c)&&(a=c,o=e)}return o},d.createMovieClip=function(a,o,e){var c=a.createEmptyMovieClip(o,e),p=1;this.make();for(var f=0;f<this.modules.length;f++)for(var h=f*p,g=0;g<this.modules[f].length;g++){var m=g*p,v=this.modules[f][g];v&&(c.beginFill(0,100),c.moveTo(m,h),c.lineTo(m+p,h),c.lineTo(m+p,h+p),c.lineTo(m,h+p),c.endFill())}return c},d.setupTimingPattern=function(){for(var a=8;a<this.moduleCount-8;a++)this.modules[a][6]==null&&(this.modules[a][6]=a%2==0);for(var o=8;o<this.moduleCount-8;o++)this.modules[6][o]==null&&(this.modules[6][o]=o%2==0)},d.setupPositionAdjustPattern=function(){for(var a=n.getPatternPosition(this.typeNumber),o=0;o<a.length;o++)for(var e=0;e<a.length;e++){var c=a[o],p=a[e];if(this.modules[c][p]==null)for(var f=-2;f<=2;f++)for(var h=-2;h<=2;h++)f==-2||f==2||h==-2||h==2||f==0&&h==0?this.modules[c+f][p+h]=!0:this.modules[c+f][p+h]=!1}},d.setupTypeNumber=function(a){for(var o=n.getBCHTypeNumber(this.typeNumber),e=0;e<18;e++){var c=!a&&(o>>e&1)==1;this.modules[Math.floor(e/3)][e%3+this.moduleCount-8-3]=c}for(var e=0;e<18;e++){var c=!a&&(o>>e&1)==1;this.modules[e%3+this.moduleCount-8-3][Math.floor(e/3)]=c}},d.setupTypeInfo=function(a,o){for(var e=this.errorCorrectLevel<<3|o,c=n.getBCHTypeInfo(e),p=0;p<15;p++){var f=!a&&(c>>p&1)==1;p<6?this.modules[p][8]=f:p<8?this.modules[p+1][8]=f:this.modules[this.moduleCount-15+p][8]=f}for(var p=0;p<15;p++){var f=!a&&(c>>p&1)==1;p<8?this.modules[8][this.moduleCount-p-1]=f:p<9?this.modules[8][15-p-1+1]=f:this.modules[8][15-p-1]=f}this.modules[this.moduleCount-8][8]=!a},d.mapData=function(a,o){for(var e=-1,c=this.moduleCount-1,p=7,f=0,h=this.moduleCount-1;h>0;h-=2)for(h==6&&h--;;){for(var g=0;g<2;g++)if(this.modules[c][h-g]==null){var m=!1;f<a.length&&(m=(a[f]>>>p&1)==1);var v=n.getMask(o,c,h-g);v&&(m=!m),this.modules[c][h-g]=m,p--,p==-1&&(f++,p=7)}if(c+=e,c<0||this.moduleCount<=c){c-=e,e=-e;break}}},s.PAD0=236,s.PAD1=17,s.createData=function(a,o,e){for(var c=l.getRSBlocks(a,o),p=new i,f=0;f<e.length;f++){var h=e[f];p.put(h.mode,4),p.put(h.getLength(),n.getLengthInBits(h.mode,a)),h.write(p)}for(var g=0,f=0;f<c.length;f++)g+=c[f].dataCount;if(p.getLengthInBits()>g*8)throw new Error("code length overflow. ("+p.getLengthInBits()+">"+g*8+")");for(p.getLengthInBits()+4<=g*8&&p.put(0,4);p.getLengthInBits()%8!=0;)p.putBit(!1);for(;!(p.getLengthInBits()>=g*8||(p.put(s.PAD0,8),p.getLengthInBits()>=g*8));)p.put(s.PAD1,8);return s.createBytes(p,c)},s.createBytes=function(a,o){for(var e=0,c=0,p=0,f=new Array(o.length),h=new Array(o.length),g=0;g<o.length;g++){var m=o[g].dataCount,v=o[g].totalCount-m;c=Math.max(c,m),p=Math.max(p,v),f[g]=new Array(m);for(var x=0;x<f[g].length;x++)f[g][x]=255&a.buffer[x+e];e+=m;var C=n.getErrorCorrectPolynomial(v),y=new u(f[g],C.getLength()-1),P=y.mod(C);h[g]=new Array(C.getLength()-1);for(var x=0;x<h[g].length;x++){var R=x+P.getLength()-h[g].length;h[g][x]=R>=0?P.get(R):0}}for(var j=0,x=0;x<o.length;x++)j+=o[x].totalCount;for(var k=new Array(j),A=0,x=0;x<c;x++)for(var g=0;g<o.length;g++)x<f[g].length&&(k[A++]=f[g][x]);for(var x=0;x<p;x++)for(var g=0;g<o.length;g++)x<h[g].length&&(k[A++]=h[g][x]);return k},De=s,De}var he={},ct;function yo(){if(ct)return he;ct=1,Object.defineProperty(he,"__esModule",{value:!0});var t=Object.assign||function(e){for(var c=1;c<arguments.length;c++){var p=arguments[c];for(var f in p)Object.prototype.hasOwnProperty.call(p,f)&&(e[f]=p[f])}return e},l=Ct(),i=s(l),n=mt(),u=s(n);function s(e){return e&&e.__esModule?e:{default:e}}function d(e,c){var p={};for(var f in e)c.indexOf(f)>=0||Object.prototype.hasOwnProperty.call(e,f)&&(p[f]=e[f]);return p}var a={bgColor:i.default.oneOfType([i.default.object,i.default.string]).isRequired,bgD:i.default.string.isRequired,fgColor:i.default.oneOfType([i.default.object,i.default.string]).isRequired,fgD:i.default.string.isRequired,size:i.default.number.isRequired,title:i.default.string,viewBoxSize:i.default.number.isRequired,xmlns:i.default.string},o=(0,n.forwardRef)(function(e,c){var p=e.bgColor,f=e.bgD,h=e.fgD,g=e.fgColor,m=e.size,v=e.title,x=e.viewBoxSize,C=e.xmlns,y=C===void 0?"http://www.w3.org/2000/svg":C,P=d(e,["bgColor","bgD","fgD","fgColor","size","title","viewBoxSize","xmlns"]);return u.default.createElement("svg",t({},P,{height:m,ref:c,viewBox:"0 0 "+x+" "+x,width:m,xmlns:y}),v?u.default.createElement("title",null,v):null,u.default.createElement("path",{d:f,fill:p}),u.default.createElement("path",{d:h,fill:g}))});return o.displayName="QRCodeSvg",o.propTypes=a,he.default=o,he}var ut;function wo(){if(ut)return ee;ut=1,Object.defineProperty(ee,"__esModule",{value:!0}),ee.QRCode=void 0;var t=Object.assign||function(m){for(var v=1;v<arguments.length;v++){var x=arguments[v];for(var C in x)Object.prototype.hasOwnProperty.call(x,C)&&(m[C]=x[C])}return m},l=Ct(),i=p(l),n=Pt(),u=p(n),s=vo(),d=p(s),a=mt(),o=p(a),e=yo(),c=p(e);function p(m){return m&&m.__esModule?m:{default:m}}function f(m,v){var x={};for(var C in m)v.indexOf(C)>=0||Object.prototype.hasOwnProperty.call(m,C)&&(x[C]=m[C]);return x}var h={bgColor:i.default.oneOfType([i.default.object,i.default.string]),fgColor:i.default.oneOfType([i.default.object,i.default.string]),level:i.default.string,size:i.default.number,value:i.default.string.isRequired},g=(0,a.forwardRef)(function(m,v){var x=m.bgColor,C=x===void 0?"#FFFFFF":x,y=m.fgColor,P=y===void 0?"#000000":y,R=m.level,j=R===void 0?"L":R,k=m.size,A=k===void 0?256:k,S=m.value,B=f(m,["bgColor","fgColor","level","size","value"]),_=new d.default(-1,u.default[j]);_.addData(S),_.make();var M=_.modules;return o.default.createElement(c.default,t({},B,{bgColor:C,bgD:M.map(function(F,$){return F.map(function(z,U){return z?"":"M "+U+" "+$+" l 1 0 0 1 -1 0 Z"}).join(" ")}).join(" "),fgColor:P,fgD:M.map(function(F,$){return F.map(function(z,U){return z?"M "+U+" "+$+" l 1 0 0 1 -1 0 Z":""}).join(" ")}).join(" "),ref:v,size:A,viewBoxSize:M.length}))});return ee.QRCode=g,g.displayName="QRCode",g.propTypes=h,ee.default=g,ee}wo();const bo=({isOpen:t,onClose:l,onSubmit:i,error:n,t:u})=>{const[s,d]=b.useState(""),[a,o]=b.useState(!1);if(!t)return null;const e=c=>{c.preventDefault(),o(!0),i(s),o(!1)};return r.jsx(Hr,{children:r.jsx(qr,{style:{maxWidth:"400px"},children:r.jsxs("div",{style:{padding:"20px"},children:[r.jsx("h3",{style:{margin:"0 0 20px 0",textAlign:"center"},children:u("Enter Password")}),r.jsxs("form",{onSubmit:e,children:[r.jsxs("div",{style:{marginBottom:"20px"},children:[r.jsx("input",{type:"password",value:s,onChange:c=>d(c.target.value),placeholder:u("Password"),style:{width:"100%",padding:"10px",borderRadius:"4px",border:n?"1px solid #d32f2f":"1px solid #ccc",fontSize:"16px"},required:!0}),n&&r.jsx("div",{style:{color:"#d32f2f",fontSize:"14px",marginTop:"5px",padding:"5px"},children:n})]}),r.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[r.jsx("button",{type:"button",onClick:l,style:{padding:"10px 16px",backgroundColor:"#f3f4f6",border:"none",borderRadius:"4px",cursor:"pointer",fontSize:"14px"},children:u("Cancel")}),r.jsx("button",{type:"submit",disabled:a||!s,style:{padding:"10px 16px",backgroundColor:"#006adc",color:"white",border:"none",borderRadius:"4px",cursor:s?"pointer":"not-allowed",opacity:s?1:.7,fontSize:"14px"},children:u(a?"Submitting...":"Submit")})]})]})]})})})},ze=new fr({region:Qt});function pt(t){const l=t.trim().toLowerCase(),i="@gmail.com";return l.endsWith(i)?`${l.slice(0,-i.length).replace(/\./g,"")}${i}`:l}const Co=({isOpen:t,onClose:l,onLoginSuccess:i,t:n})=>{const[u,s]=b.useState(""),[d,a]=b.useState(!1),[o,e]=b.useState(""),[c,p]=b.useState(""),[f,h]=b.useState("idle"),[g,m]=b.useState(""),v=b.useRef(null),x=b.useRef(null);b.useEffect(()=>{d&&x.current&&x.current.focus()},[d]),b.useEffect(()=>{t&&v.current&&!d&&v.current.focus()},[t,d]);function C(j){const k=j.target.value;/^\d*$/.test(k)&&k.length<=6&&e(k)}async function y(){var k;h("sending"),m("");const j=pt(u);if(!j||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(j)){h("error"),m(n("Please enter a valid email address"));return}try{const A=new hr({ClientId:Se,Username:j,Password:crypto.randomUUID(),UserAttributes:[{Name:"email",Value:j}]});try{await ze.send(A)}catch(_){if(!((k=_.name)!=null&&k.includes("UsernameExistsException")))throw _}const S=new gr({ClientId:Se,AuthFlow:"CUSTOM_AUTH",AuthParameters:{USERNAME:j}}),B=await ze.send(S);if(B.Session)p(B.Session),a(!0),h("idle");else throw new Error("No session returned from InitiateAuth")}catch(A){console.error(A),h("error"),m(n("Unable to send verification code. Please try again later."))}}async function P(){var k,A,S,B,_,M;h("verifying"),m("");const j=pt(u);try{const F=new mr({ClientId:Se,ChallengeName:"CUSTOM_CHALLENGE",ChallengeResponses:{USERNAME:j,ANSWER:o},Session:c}),z=(k=(await ze.send(F)).AuthenticationResult)==null?void 0:k.IdToken;if(!z)throw new Error("No token received");localStorage.setItem("idToken",z);const E=`${JSON.parse(atob(z.split(".")[1]))["cognito:username"]}_____Public____Profile`,Q=await(await fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${z}`},body:JSON.stringify({query:`
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
          `,variables:{relationIds:[E]}})})).json(),ae=(M=(_=(B=(S=(A=Q==null?void 0:Q.data)==null?void 0:A.batchGetItems)==null?void 0:S.items)==null?void 0:B[0])==null?void 0:_.item)==null?void 0:M.anyDisplayName;ae&&localStorage.setItem("publicUsername",ae),h("idle"),i(),l()}catch(F){console.error(F),h("error"),m(n("Invalid or expired verification code. Please try again or request a new code."))}}function R(){a(!1),e(""),h("idle")}return t?r.jsx("div",{style:{backgroundColor:"rgba(0, 0, 0, 0.5)",position:"fixed",top:0,left:0,right:0,bottom:0,display:"flex",alignItems:"center",justifyContent:"center",zIndex:1e3},children:r.jsxs("div",{style:{maxWidth:400,width:"100%",background:"#ffffff",padding:"32px",borderRadius:"12px",boxShadow:"0 6px 20px rgba(0,0,0,0.06)",textAlign:"center"},children:[r.jsxs("div",{style:{marginBottom:"24px"},children:[r.jsx("img",{src:"images/logo_no_background.png",alt:"6180 Logo",style:{height:"60px",marginBottom:"16px"}}),r.jsx("h2",{style:{fontSize:"24px",fontWeight:600,color:"#333"},children:n("Sign in to 6180")})]}),g&&r.jsx("div",{style:{backgroundColor:"#f8d7da",color:"#721c24",padding:"10px",borderRadius:"6px",marginBottom:"16px",fontSize:"14px"},children:g}),d?r.jsxs(r.Fragment,{children:[r.jsxs("p",{style:{marginBottom:"16px",color:"#555"},children:[n("Check your email for a 6-digit verification code sent to")," ",r.jsx("strong",{children:u})]}),r.jsx("input",{ref:x,type:"tel",inputMode:"numeric",pattern:"[0-9]*",maxLength:6,value:o,onChange:C,placeholder:n("Enter 6-digit code"),style:{width:"100%",padding:"12px",marginBottom:"16px",borderRadius:"6px",border:"1px solid #ccc",fontSize:"16px",boxSizing:"border-box",letterSpacing:"2px",textAlign:"center"}}),r.jsx("button",{onClick:P,disabled:f==="verifying"||o.length!==6,style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#28a745",color:"#fff",border:"none",borderRadius:"6px",cursor:f==="verifying"||o.length!==6?"not-allowed":"pointer",opacity:f==="verifying"||o.length!==6?.7:1},children:n(f==="verifying"?"Verifying...":"Verify Code")}),r.jsxs("div",{style:{marginTop:"16px",fontSize:"14px",color:"#666",display:"flex",justifyContent:"center",gap:"8px"},children:[r.jsx("span",{children:n("Didn't receive a code?")}),r.jsx("button",{onClick:R,style:{background:"none",border:"none",color:"#007bff",padding:0,cursor:"pointer",fontSize:"14px",textDecoration:"underline"},children:n("Send new code")})]}),r.jsx("button",{onClick:l,style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#f8f9fa",color:"#555",border:"1px solid #ccc",borderRadius:"6px",cursor:"pointer",marginTop:"12px"},children:n("Cancel")})]}):r.jsxs(r.Fragment,{children:[r.jsx("input",{ref:v,type:"email",value:u,onChange:j=>s(j.target.value),placeholder:n("Enter your email"),style:{width:"100%",padding:"12px",marginBottom:"16px",borderRadius:"6px",border:"1px solid #ccc",fontSize:"16px",boxSizing:"border-box"}}),r.jsx("button",{onClick:y,disabled:f==="sending"||!u.trim(),style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#007bff",color:"#fff",border:"none",borderRadius:"6px",cursor:f==="sending"||!u.trim()?"not-allowed":"pointer",opacity:f==="sending"||!u.trim()?.7:1},children:n(f==="sending"?"Sending...":"Send Verification Code")}),r.jsx("p",{style:{fontSize:"13px",color:"#666",marginTop:"16px",textAlign:"center"},children:n("We'll send a secure verification code to your email")}),r.jsx("button",{onClick:l,style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#f8f9fa",color:"#555",border:"1px solid #ccc",borderRadius:"6px",cursor:"pointer",marginTop:"12px"},children:n("Cancel")})]})]})}):null},Po=({albumData:t,t:l})=>!t||Object.keys(t.contacts).length===0?null:r.jsx("div",{style:{width:"100%",backgroundColor:"#f0f7ff",borderRadius:"8px",padding:"16px",marginBottom:"20px",boxShadow:"0 2px 4px rgba(0,0,0,0.1)",border:"1px solid #d0e1f9"},children:r.jsxs("p",{style:{margin:"0",fontSize:"15px",color:"#333",textAlign:"left"},children:[l('Click "Save" to create memories you can find later with')," ‎",r.jsx("strong",{children:Object.values(t.contacts).filter(i=>!i.toString().startsWith("Profile-")).join(", ")})]})}),Fe=({src:t,thumbnailSrc:l,alt:i,className:n="",loadFullResolution:u=!1,onFullResolutionLoaded:s,onClick:d,showWatermark:a=!1})=>{const[o,e]=b.useState(!1),[c,p]=b.useState(!1),[f,h]=b.useState(!1),[g,m]=b.useState("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E"),{t:v}=be();return b.useEffect(()=>{if(l){const x=new Image;x.src=l,x.onload=()=>{m(l),e(!0)}}},[l]),b.useEffect(()=>{if(u&&!c){h(!0);const x=new Image;x.src=t,x.onload=()=>{m(t),p(!0),h(!1),s&&s()}}},[u,t,c,s]),r.jsxs(Mr,{onClick:d,children:[r.jsx(Or,{src:g,alt:i,className:n,isLoaded:o,style:{cursor:d?"pointer":"default"}}),!o&&r.jsx(Nr,{}),f&&r.jsx(bt,{children:v("Loading full resolution...")}),a&&o&&r.jsx(ve,{children:r.jsx(ye,{children:"6180 Watermarked"})})]})},So=({thumbnailUrl:t,videoUrl:l,duration:i,index:n,onFullResolutionLoaded:u,onClick:s,showWatermark:d=!1})=>{const[a,o]=b.useState(!1),[e,c]=b.useState(!1),[p,f]=b.useState(!1),h=Gt.useRef(null),{t:g}=be(),m=()=>{if(s){s();return}p?o(!0):c(!0)},v=()=>{f(!0),o(!0),u&&u()};return b.useEffect(()=>{if(e&&h.current&&!p){const x=h.current,C=()=>{v(),x.removeEventListener("canplaythrough",C)};return x.addEventListener("canplaythrough",C),x.load(),()=>{x.removeEventListener("canplaythrough",C)}}},[e,p]),a?r.jsxs("div",{style:{position:"relative",width:"100%",height:"100%"},children:[r.jsxs("video",{ref:h,controls:!0,style:{width:"100%",height:"100%"},children:[r.jsx("source",{src:l,type:"video/mp4"}),g("Your browser does not support the video tag.")]}),d&&r.jsx(ve,{children:r.jsx(ye,{children:"6180 Watermarked"})})]}):e&&!p?r.jsxs(Ke,{children:[r.jsx(Fe,{src:l,thumbnailSrc:t,alt:`Video thumbnail ${n+1}`,showWatermark:d}),r.jsx(bt,{children:g("Loading video...")}),r.jsx("video",{ref:h,style:{display:"none"},preload:"auto",children:r.jsx("source",{src:l,type:"video/mp4"})})]}):r.jsxs(Ke,{onClick:m,children:[r.jsx(Fe,{src:l,thumbnailSrc:t,alt:`Video thumbnail ${n+1}`,showWatermark:d}),r.jsx(zr,{}),r.jsx(Ur,{children:i})]})},Io=({item:t,index:l,isSelectionMode:i,isSelected:n,toggleItemSelection:u,openFullscreenView:s,showWatermark:d,ownerName:a})=>r.jsxs("div",{style:{position:"relative",border:i&&n?"3px solid #006adc":void 0,borderRadius:"8px",overflow:"hidden",boxShadow:i&&n?"0 0 0 3px rgba(0, 106, 220, 0.3)":void 0},onClick:o=>i?u(l,o):s(l),children:[i&&r.jsx(Gr,{isSelected:n,onClick:o=>u(l,o),children:n&&r.jsx(Jr,{children:"✓"})}),t.type==="image"?r.jsx(Fe,{src:t.url,thumbnailSrc:t.thumbnailUrl,alt:`Album image ${l+1}`,loadFullResolution:!1,onFullResolutionLoaded:()=>{},onClick:()=>i?void 0:s(l),showWatermark:d}):r.jsx(So,{thumbnailUrl:t.thumbnailUrl||"",videoUrl:t.url,duration:t.duration||"0:00",index:l,onFullResolutionLoaded:()=>{},onClick:()=>i?void 0:s(l),showWatermark:d}),a&&r.jsx(Dr,{children:a})]},l),To=({isLoading:t,error:l,albumData:i,columns:n,shouldShowContent:u,shouldShowWatermark:s,isSelectionMode:d,selectedItems:a,toggleItemSelection:o,openFullscreenView:e,t:c})=>t?r.jsx(Fr,{id:"loading-message",children:c("Loading album content...")}):l?r.jsx(Te,{children:l}):u()?!i||i.mediaItems.length===0?r.jsx(Te,{children:c("No media found in this album")}):r.jsx(_r,{id:"media-grid",columns:n,children:i.mediaItems.map((p,f)=>{const h=p.ownerContactId&&i.contacts[p.ownerContactId]?i.contacts[p.ownerContactId]:"",g=a.has(f),m=s();return r.jsx(Io,{item:p,index:f,isSelectionMode:d,isSelected:g,toggleItemSelection:o,openFullscreenView:e,showWatermark:m,ownerName:h},f)})}):r.jsx("div",{style:{gridColumn:"1 / -1",textAlign:"center",padding:"40px 0"},children:r.jsx(Te,{children:c("Enter the password to view album contents")})}),jo=({albumData:t,t:l})=>t?r.jsxs(r.Fragment,{children:[t.folderName&&t.folderName!==l("Photos")&&t.folderName.trim()!==""&&r.jsx(kr,{id:"album-title",children:r.jsx(Er,{children:t.folderName})}),t.folderDescription&&t.folderDescription.trim()!==""&&r.jsx(Lr,{id:"description-container",children:r.jsx(Ar,{children:t.folderDescription})})]}):null,ko=({addPhotosToAlbum:t,saveAlbum:l,promptForPassword:i,showingEnterPassword:n,passwordPolicy:u,usingFolderInviteGrantsRightToAddItems:s,t:d})=>{const[a,o]=b.useState(!1),[e,c]=b.useState(!1),p=b.useRef(null),f=840;b.useEffect(()=>{c(window.innerWidth<f);const v=()=>{c(window.innerWidth<f)};return window.addEventListener("resize",v),()=>window.removeEventListener("resize",v)},[]);const h=()=>{o(!a)},g=()=>{o(!1)},m=v=>{v(),g()};return b.useEffect(()=>{const v=C=>{p.current&&!p.current.contains(C.target)&&o(!1)},x=()=>{o(!1)};return a&&(document.addEventListener("mousedown",v),window.addEventListener("scroll",x)),()=>{document.removeEventListener("mousedown",v),window.removeEventListener("scroll",x)}},[a]),e?r.jsxs("div",{ref:p,style:{position:"relative",display:"flex",alignItems:"center",justifyContent:"flex-end",width:"100%",flexWrap:"nowrap"},children:[!n&&r.jsxs("div",{style:{flexShrink:0},children:[r.jsxs(xt,{onClick:h,"aria-label":d("Menu"),"aria-expanded":a,children:[r.jsxs(vt,{children:[r.jsx(te,{}),r.jsx(te,{}),r.jsx(te,{})]}),d("Save")]}),a&&r.jsxs(yt,{children:[s&&r.jsx(ge,{onClick:()=>m(t),children:d("Add Photos To Album")}),r.jsx(ge,{onClick:()=>m(l),children:d("Save To My Library")}),r.jsx(ge,{onClick:()=>m(l),children:d("Download To My Device")})]})]}),n&&u&&u!=="NoPassword"&&r.jsx("div",{style:{flexShrink:0},children:r.jsx(Ve,{onClick:i,children:d("Enter Password")})})]}):r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"20px",justifyContent:"flex-end",flexWrap:"nowrap"},children:[!n&&r.jsxs("div",{style:{display:"flex",gap:"20px",flexWrap:"nowrap"},children:[s&&r.jsx(K,{onClick:t,children:d("Add Photos")}),r.jsx(K,{onClick:l,children:d("Save To My Library")}),r.jsx(K,{onClick:l,children:d("Download To My Device")})]}),n&&r.jsx("div",{children:r.jsx(Ve,{onClick:i,children:d("Enter Password")})})]})},Eo=({t,isSelectionMode:l,selectedItems:i,shareSelection:n,cancelSelection:u,createSubalbum:s,showingEnterPassword:d,promptForPassword:a,passwordPolicy:o,isAuthorized:e,addPhotosToAlbum:c,saveAlbumDirectly:p,handleDownloadPhotos:f,handleCopyLink:h,handlePublicProfileToggle:g,isOnPublicProfile:m,albumData:v,columns:x,changeColumns:C})=>{const[y,P]=b.useState(!1),[R,j]=b.useState(!1),k=b.useRef(null),A=840;b.useEffect(()=>{j(window.innerWidth<A);const E=()=>{j(window.innerWidth<A)};return window.addEventListener("resize",E),()=>window.removeEventListener("resize",E)},[]);const S=()=>{P(!y)},B=()=>{P(!1)},_=E=>{E(),B()};b.useEffect(()=>{const E=Q=>{k.current&&!k.current.contains(Q.target)&&P(!1)},q=()=>{P(!1)};return y&&(document.addEventListener("mousedown",E),window.addEventListener("scroll",q)),()=>{document.removeEventListener("mousedown",E),window.removeEventListener("scroll",q)}},[y]);const M=()=>[{label:t("Add Photos"),onClick:c},{label:t("Download"),onClick:f},{label:t("Copy Link"),onClick:h},{label:t(m?"On Public Profile":"Not On Public Profile"),onClick:g,style:{backgroundColor:m?"#4caf50":"#e0e0e0",color:m?"white":"inherit"}}],F=()=>r.jsxs("div",{style:{display:"flex",gap:"16px"},children:[r.jsxs(K,{onClick:n,disabled:i.size===0,style:{opacity:i.size===0?.5:1,backgroundColor:i.size>0?"#006adc":void 0,color:i.size>0?"white":void 0},children:[t("Create Sub-album")," (",i.size,")"]}),r.jsx(K,{onClick:u,children:t("Cancel")})]}),$=()=>!l&&!e&&o&&o!=="NoPassword"&&r.jsx(K,{onClick:a,children:t("Enter Password")}),z=()=>r.jsxs(r.Fragment,{children:[r.jsxs(xt,{onClick:S,"aria-label":t("Menu"),"aria-expanded":y,children:[r.jsxs(vt,{children:[r.jsx(te,{}),r.jsx(te,{}),r.jsx(te,{})]}),t("Actions")]}),y&&r.jsx(yt,{children:M().map((E,q)=>r.jsx(ge,{onClick:()=>_(E.onClick),style:E.style,disabled:E.disabled,children:E.label},q))})]}),U=()=>r.jsx("div",{style:{display:"flex",gap:"10px",flexWrap:"nowrap"},children:M().map((E,q)=>r.jsx(K,{onClick:E.onClick,style:E.style,disabled:E.disabled,children:E.label},q))}),se=()=>l?F():r.jsxs("div",{style:{display:"flex",justifyContent:"space-between",width:"100%",flexWrap:"nowrap",alignItems:"center"},children:[r.jsx("div",{style:{flexShrink:0},children:!d()&&r.jsx(Tr,{onClick:s,children:t("Create Sub-album")})}),r.jsxs("div",{style:{marginLeft:"auto",display:"flex",alignItems:"center"},children:[$(),!l&&!(!e&&o&&o!=="NoPassword")&&(v!=null&&v.folderPositionId?r.jsx("div",{ref:k,style:{position:"relative",display:"flex",alignItems:"center",justifyContent:"flex-end",flexWrap:"nowrap"},children:R?z():U()}):r.jsx(ko,{addPhotosToAlbum:c,saveAlbum:p,downloadPhotos:f,promptForPassword:a,showingEnterPassword:d(),passwordPolicy:o,usingFolderInviteGrantsRightToAddItems:v==null?void 0:v.usingFolderInviteGrantsRightToAddItems,t}))]})]});return r.jsx(Pr,{children:r.jsxs(Sr,{children:[r.jsx(Qr,{children:se()}),r.jsxs(jr,{children:[r.jsx($r,{htmlFor:"columns",id:"columns-label",children:r.jsx("strong",{children:t("Columns:")})}),r.jsx(Wr,{id:"columns",value:x,onChange:E=>C(E.target.value),children:[1,2,3,4,5].map(E=>r.jsx("option",{value:E.toString(),children:E},E))})]})]})})},Ro=()=>{const{t,language:l}=be(),i=Yt(),n=Zt(),u=er(),s=tr(),d=ur(t),[a,o]=b.useState("1"),[e,c]=b.useState(null),[p,f]=b.useState(!0),[h,g]=b.useState(null),[m,v]=b.useState(null),[x,C]=b.useState(!1),[y,P]=b.useState(!1),[R,j]=b.useState(null),[k,A]=b.useState(!1),{passwordPolicy:S,setPasswordPolicy:B,isAuthorized:_,setIsAuthorized:M,showPasswordModal:F,setShowPasswordModal:$,passwordError:z,setPasswordError:U,passwordVerified:se,setPasswordVerified:E,shouldShowContent:q,shouldShowWatermark:Q,showingEnterPassword:ae,promptForPassword:re}=s,{fileInputRef:Ce,selectedPhotos:oe,setSelectedPhotos:$e,isUploading:jt,setIsUploading:le,fileProcessingComplete:We,setFileProcessingComplete:Pe,progressTracker:ne,log:G}=i,{fullscreenItem:Y,openFullscreenView:He,closeFullscreenView:kt,goToPrevItem:Et,goToNextItem:Rt}=n,{isSelectionMode:de,setIsSelectionMode:Lt,selectedItems:ce,toggleItemSelection:At,cancelSelection:_t}=u,V=rr(e,m,R,t),Bt=async I=>{if(U(null),I.trim()===""){U(t("Password cannot be empty"));return}const T=e==null?void 0:e.actualPassword;if(!T)if(e!=null&&e.hasPassword){U(t("Unable to validate password. Please try again later."));return}else{M(!0),$(!1);return}if(I!==T){U(t("Invalid password. Please try again."));return}if(!await J()){$(!1),E(!0),C(!0);return}M(!0),$(!1),U(null),pe(t,m,e)},Mt=I=>{o(I),localStorage.setItem("columns",I)},qe=()=>{Ce.current&&Ce.current.click()},Ot=async()=>{const I=await J();if(!I){A(!0),C(!0);return}if(!R)try{const L=JSON.parse(atob(I.split(".")[1]))["cognito:username"];j(L)}catch(T){console.error("Failed to decode token",T)}Pe(!1),qe()},Nt=async()=>{C(!1);const I=await J();if(I)try{const L=JSON.parse(atob(I.split(".")[1]))["cognito:username"];j(L),se&&(M(!0),E(!1)),k&&(localStorage.setItem("selectPhotosButtonTimestamp",Date.now().toString()),A(!1)),pe(t,m,e);return}catch(T){console.error("Failed to decode token",T)}},Dt=async I=>{const T=Array.from(I.target.files||[]);if(!T.length)return;localStorage.removeItem("selectPhotosButtonTimestamp"),P(!1),le(!0),Pe(!1);const L=await wt();if(!L){G("❌ Authentication failed"),le(!1),C(!0);return}try{const N=JSON.parse(atob(L.split(".")[1]))["cognito:username"];if(!N){G("❌ Missing Cognito Username"),le(!1);return}j(N);const ue=m||`${N}_____${ir()}____Folder`;G(`📁 Using folder ID: ${ue}`),$e(T.map(H=>({fileName:H.name,s3PreviewUrl:URL.createObjectURL(H),type:H.type,size:H.size,status:"pending",progress:0})));const ie=sr($e),X=setInterval(()=>{Je(oe,i.setProgressTracker)},500),D=await ar(T,N,ie,G);clearInterval(X),Je(D,i.setProgressTracker),localStorage.setItem(gt.SELECTED_PHOTOS,JSON.stringify(D)),G(`📸 Saved ${D.length} photos metadata to storage`);const Ht=D.every(H=>H.status==="complete"),Qe=D.some(H=>H.status==="error");if(Ht&&!Qe)G(`✅ All ${D.length} files successfully uploaded`);else if(Qe){const H=D.filter(qt=>qt.status==="error").length;G(`⚠️ Upload completed with ${H} errors`)}setTimeout(()=>{Pe(!0)},1e3)}catch(O){G(`❌ Fatal error in handleFileSelection: ${String(O)}`),le(!1)}finally{I.target&&(I.target.value="")}},zt=async()=>{if(console.log("Starting album registration"),S==="CannotBeSaved"&&!_){re();return}const I=await J();if(!I){console.log("User not logged in, showing OTP login"),C(!0);return}if(!R)try{const O=JSON.parse(atob(I.split(".")[1]))["cognito:username"];j(O)}catch(L){console.error("Failed to decode token",L)}const T=localStorage.getItem("publicUsername");if(T!=null&&T.startsWith("Profile-")){console.log("Public username starts with 'Profile-', showing username prompt"),d.setUsernameInput(T),d.setShowUsernamePrompt(!0);return}pe(t,m,e)},Ut=async()=>{if((S==="NotVisible"||S==="CannotBeSaved")&&!_){re();return}Lt(!de),ce.clear()},Ft=async()=>{br(t,e,ce)},$t=async()=>{if(S==="CannotBeSaved"&&!_){re();return}if(!await J()&&(m||S==="CannotBeSaved")){C(!0);return}e&&cr(e,t,He)};b.useEffect(()=>{const I=localStorage.getItem("columns")||"1";o(I)},[]);const Wt=()=>{const T=new URLSearchParams(window.location.search).get("id");if(T)return T;const L=window.location.pathname.split("/"),O=L[L.length-1];return O&&O.includes("_")?O:null};return b.useEffect(()=>{(async()=>{const T=Wt();if(!T){const ie=new URL(window.location.href).search.substring(1).split("-"),X=ie[ie.length-1];if(X){const D=await wr(X,v);if(D){c(D),D.passwordPolicy&&(B(D.passwordPolicy),(D.passwordPolicy==="NoPassword"||D.folderPositionId)&&M(!0)),f(!1);return}}g(t("Valid ID not obtained from query parameter.")),f(!1);return}const L=T.split("_");let O=L[L.length-1].replace(/-/g,"");O.length===32?(O=nr(O),console.log(O)):console.error("Invalid UUID format: must be 32 characters after removing dashes");const N=await yr(O,v);N&&(c(N),N.passwordPolicy&&(B(N.passwordPolicy),(N.passwordPolicy==="NoPassword"||N.folderPositionId)&&M(!0))),f(!1)})()},[]),b.useEffect(()=>{(async()=>{const T=await J();if(T)try{const O=JSON.parse(atob(T.split(".")[1]))["cognito:username"];j(O);const N=localStorage.getItem("selectPhotosButtonTimestamp");if(N){const ue=parseInt(N,10),X=(Date.now()-ue)/(1e3*60);P(X<10),X>=10&&localStorage.removeItem("selectPhotosButtonTimestamp")}else P(!1)}catch(L){console.error("Failed to decode token",L)}})()},[]),b.useEffect(()=>{if(We&&oe.length>0){const I=oe.filter(L=>L.status==="complete").length,T=oe.filter(L=>L.status==="error").length;console.log(`Upload complete: ${I} successful, ${T} failed`),m?window.location.href=`/save-album.html?folderId=${encodeURIComponent(m)}`:window.location.href="/save-album.html"}},[We,oe.length,m]),b.useEffect(()=>{e!=null&&e.folderName?document.title=e.folderName:document.title=t("Photos")},[e,l]),r.jsxs(Cr,{children:[r.jsx(Kt,{}),r.jsx(Eo,{t,isSelectionMode:de,selectedItems:ce,shareSelection:Ft,cancelSelection:_t,createSubalbum:Ut,showingEnterPassword:ae,promptForPassword:re,passwordPolicy:S,isAuthorized:_,addPhotosToAlbum:Ot,saveAlbumDirectly:zt,handleDownloadPhotos:$t,handleCopyLink:()=>V.setShowingCopyLinkAlert(!0),handlePublicProfileToggle:V.handlePublicProfileToggle,isOnPublicProfile:V.isOnPublicProfile,albumData:e,columns:a,changeColumns:Mt}),r.jsxs(Rr,{id:"media-container",children:[r.jsx(oo,{showSelectPhotosButton:y,albumData:e,openFilePicker:qe,t}),r.jsx(Po,{albumData:e,t}),jt&&r.jsxs("div",{style:{width:"100%",marginBottom:"20px"},children:[r.jsx(lr,{progressTracker:ne,t,isRTL:Ie(l)==="rtl",style:{marginTop:"20px"}}),ne.filesComplete>0&&ne.filesComplete===ne.totalFiles&&r.jsx("div",{style:{backgroundColor:"#e8f5e9",color:"#2e7d32",padding:"10px 16px",borderRadius:"6px",fontSize:"14px",marginTop:"10px",textAlign:"center"},children:t("Upload complete! Preparing to save your album...")}),ne.filesWithError>0&&r.jsx("div",{style:{backgroundColor:"#ffebee",color:"#c62828",padding:"10px 16px",borderRadius:"6px",fontSize:"14px",marginTop:"10px",textAlign:"center"},children:t("Some files could not be uploaded. You can continue with the successfully uploaded files.")})]}),r.jsx(no,{isAuthorized:_,passwordPolicy:S,passwordError:z,promptForPassword:re,t}),r.jsx(io,{isSelectionMode:de,t}),r.jsx(jo,{albumData:e,t}),r.jsx(To,{isLoading:p,error:h,albumData:e,columns:a,shouldShowContent:q,shouldShowWatermark:Q,isSelectionMode:de,selectedItems:ce,toggleItemSelection:At,openFullscreenView:He,t})]}),r.jsx(bo,{isOpen:F,onClose:()=>{$(!1),U(null)},onSubmit:Bt,error:z,t}),r.jsx(Co,{isOpen:x,onClose:()=>{C(!1)},onLoginSuccess:Nt,t}),r.jsx(dr,{onFileSelection:Dt,ref:Ce}),Y!==null&&e&&r.jsx(uo,{item:e.mediaItems[Y],index:Y,onClose:kt,onPrev:Et,onNext:()=>Rt(e.mediaItems.length),hasNext:Y<e.mediaItems.length-1,hasPrev:Y>0,showWatermark:Q(),ownerName:(()=>{const I=e.mediaItems[Y].ownerContactId;if(!I)return"";if(e.contacts&&e.contacts[I])return e.contacts[I];const T=I.split("_____")[0]||"";return T===R?t("Me"):T})()}),r.jsx(pr,{t,language:l,usernameManager:d,onSuccess:I=>{pe(t,m,e)}}),r.jsx(xr,{isOpen:V.showingCopyLinkAlert,onClose:()=>V.setShowingCopyLinkAlert(!1),inviteLink:or(m,e==null?void 0:e.albumNanoId,e==null?void 0:e.folderName),onCopy:V.handleCopy,t,isRTL:Ie(l)==="rtl"}),r.jsx(vr,{isOpen:V.showingCopiedLinkAlert,onClose:()=>V.setShowingCopiedLinkAlert(!1),t,isRTL:Ie(l)==="rtl"})]})},Lo=()=>r.jsx(Jt,{children:r.jsx(Ro,{})});Vt.createRoot(document.getElementById("root")).render(r.jsx(Lo,{}));
