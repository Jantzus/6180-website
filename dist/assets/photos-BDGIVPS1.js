import{a8 as gt,a9 as mt,k as Se,aa as Je,l as ee,d as y,ab as W,j as o,ac as Z,r as w,u as Pe,ad as xt,i as Qt,C as Ee,R as Gt,ae as vt,af as bt,ag as ne,ah as yt,ai as ve,aj as Ke,a as Vt,I as Jt,G as Kt,g as je}from"./styled-components-BDjSWUyR.js";import{c as Y,j as Xt,b as wt,k as oe,l as Yt,n as Zt,o as eo,q as to,r as oo,t as ro,v as no,g as io,i as so,u as Xe,p as ao}from"./utils-DvsMzbzJ.js";import{C as lo,a as co,d as uo}from"./fileOperations-BLRZJHHo.js";import{u as po,U as fo}from"./customHooks-CV19HVa_.js";import{U as ho,F as go}from"./FileInput-11xBTlDs.js";import{C as mo,S as xo,I as vo,R as bo}from"./SignUpCommand-DnPF4gli.js";import"./parseJsonBody-BYBwnPsq.js";const be=`
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
                id
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
`,ye=(t,c)=>{var g,m,v,x,C;const i=((m=(g=t==null?void 0:t.data)==null?void 0:g.fetchRelations)==null?void 0:m.items)||[],n=[],u={};let s="Photos",l,a="",r,e=!1,f=!1,d,p=!1;const h=new Set;if(i.length>0){const b=i[0];c&&(b!=null&&b.id)&&c(b.id),b!=null&&b.albumNanoId&&(l=l),b!=null&&b.folderName&&b.folderName.length>0&&(s=b.folderName),b!=null&&b.folderDescription&&b.folderDescription.length>0&&(a=b.folderDescription),b!=null&&b.folderPassword&&(b.folderPassword.policy&&(r=b.folderPassword.policy,e=r!=="NoPassword"),b.folderPassword.password&&r!=="NoPassword"&&(f=!0,d=b.folderPassword.password)),b!=null&&b.folderInviteParameters&&(p=!!b.folderInviteParameters.usingFolderInviteGrantsRightToAddItems),(((x=(v=i[0])==null?void 0:v.contactsUsingInvite)==null?void 0:x.items)||[]).forEach(S=>{var A;S!=null&&S.id&&((A=S==null?void 0:S.item)!=null&&A.publicDisplayName)&&(u[S.id]=S.item.publicDisplayName)}),(((C=b==null?void 0:b.fileReferencesPage)==null?void 0:C.items)||[]).forEach(S=>{const A=S==null?void 0:S.file;if(!(A!=null&&A.dataKey))return;const{id:E,dataKey:j,thumbnailDataKey:_,durationInSeconds:P,ownerContactId:M}=A;if(h.has(j))return;h.add(j);const B=`${Je}${j}`,N=_?`${Je}${_}`:void 0;j.startsWith("Input/Image/")?n.push({type:"image",fileId:E,url:B,thumbnailUrl:N||B,ownerContactId:M,loaded:!1}):j.startsWith("Input/Video/")&&n.push({type:"video",fileId:E,url:B,thumbnailUrl:N||B,duration:Xt(P),ownerContactId:M,loaded:!1})})}return{mediaItems:n,folderName:s,albumNanoId:l,folderDescription:a,contacts:u,passwordPolicy:r,passwordRequired:e,hasPassword:f,actualPassword:d,usingFolderInviteGrantsRightToAddItems:p}},yo=async(t,c)=>{var i,n,u,s;try{const a={fetchRelationsInput:{targetItemIdentifier____RelationType:`${t}____Folder`,index:"targetItemIdentifier____RelationType",limit:1,scanIndexForward:!1,nextToken:null}},r=fetch(gt,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":mt},body:JSON.stringify({query:be,variables:a})}).then(h=>h.json()),e=(async()=>{const h=await Y();return h?fetch(Se,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${h}`},body:JSON.stringify({query:be,variables:a})}).then(g=>g.json()):null})(),f=await r;let d=ye(f,c);const p=await e;if(p){const h=(s=(u=(n=(i=p==null?void 0:p.data)==null?void 0:i.fetchRelations)==null?void 0:n.items)==null?void 0:u[0])==null?void 0:s.folderPosition;if(h){const g=ye(p,c);g.folderPositionId=h==null?void 0:h.id,g.profileIds=h==null?void 0:h.profileIds,d=g}}return d}catch(l){return console.error("Error fetching folder data:",l),null}},wo=async(t,c)=>{var i,n,u,s;try{const a={fetchRelationsInput:{albumNanoId:t,index:"albumNanoId",limit:1,scanIndexForward:!1,nextToken:null}},r=fetch(gt,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":mt},body:JSON.stringify({query:be,variables:a})}).then(h=>h.json()),e=(async()=>{const h=await Y();return h?fetch(Se,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${h}`},body:JSON.stringify({query:be,variables:a})}).then(g=>g.json()):null})(),f=await r;let d=ye(f,c);const p=await e;if(p){const h=(s=(u=(n=(i=p==null?void 0:p.data)==null?void 0:i.fetchRelations)==null?void 0:n.items)==null?void 0:u[0])==null?void 0:s.folderPosition;if(h){const g=ye(p,c);g.folderPositionId=h==null?void 0:h.id,g.profileIds=h==null?void 0:h.profileIds,d=g}}return d}catch(l){return console.error("Error fetching folder data:",l),null}},ge=async(t,c,i)=>{console.log("Starting album registration");const n=document.createElement("div");n.style.position="fixed",n.style.top="0",n.style.left="0",n.style.width="100%",n.style.height="100%",n.style.backgroundColor="rgba(0, 0, 0, 0.5)",n.style.display="flex",n.style.justifyContent="center",n.style.alignItems="center",n.style.zIndex="2000";const u=document.createElement("div");u.style.backgroundColor="white",u.style.padding="30px",u.style.borderRadius="8px",u.style.textAlign="center";const s=document.createElement("p");s.id="saveProgressText",s.textContent=t("Registering album...");const l=document.createElement("div");l.style.backgroundColor="#f0f0f0",l.style.borderRadius="4px",l.style.overflow="hidden",l.style.height="8px",l.style.marginTop="10px";const a=document.createElement("div");a.id="saveProgress",a.style.backgroundColor="#4caf50",a.style.height="100%",a.style.width="5%",a.style.transition="width 0.3s ease";const r=document.createElement("p");r.id="saveErrorText",r.style.color="#f44336",r.style.display="none",r.style.marginTop="10px",r.style.fontSize="14px",l.appendChild(a),u.appendChild(s),u.appendChild(l),u.appendChild(r),n.appendChild(u),document.body.appendChild(n);try{const e=await wt();if(!e){console.error("No token available for registering album"),document.body.removeChild(n);return}if(!JSON.parse(atob(e.split(".")[1]))["cognito:username"]){console.error("Missing username in token"),oe(r,"Could not retrieve username from token",s,a);return}if(!c){console.error("No folder ID available"),oe(r,"Folder ID is missing",s,a);return}if(!i||!i.mediaItems){console.error("No album data available"),oe(r,"Album data is missing or incomplete",s,a);return}if(i.mediaItems.length===0){console.error("No media items to save"),oe(r,"No media items in album to save",s,a);return}const p=Math.floor(Date.now()/1e3);me(30,s,a,t("Preparing album data..."));const h={currentTime:p,folderId:c,profileIds:["Only Me_____Only Me____Profile"],folderPositionSelectedTagInputs:[],folderPositionPoints:1};console.log("Folder position input:",h),me(50,s,a,t("Saving album..."));const g=`
      mutation SaveAlbum(
        $folderPositionInputs: [FolderPositionInput!]
      ) {
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items { id }
        }
      }
    `,m={folderPositionInputs:[h]};console.log("GraphQL mutation variables:",JSON.stringify(m));try{const v=await fetch(Se,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({query:g,variables:m})});if(me(80,s,a,t("Almost there...")),!v.ok)throw new Error(`HTTP error: ${v.status} ${v.statusText}`);const x=await v.text();let C;try{C=JSON.parse(x),console.log("API response:",C)}catch(b){const S=b instanceof Error?b.message:"Unknown JSON parse error";throw new Error(`Invalid JSON response: ${S}`)}if(C.errors&&C.errors.length>0){const b=C.errors.map(S=>(console.error("GraphQL error:",S),S.message||"Unknown GraphQL error")).join("; ");throw new Error(`GraphQL errors: ${b}`)}console.log("Album registered successfully"),me(100,s,a,t("Album registered successfully!")),sessionStorage.setItem("album_just_saved","true"),setTimeout(()=>{document.body.removeChild(n),window.location.href="/my-albums.html"},2e3)}catch(v){const x=v instanceof Error?v.message:"Unknown API error";console.error("Error in API request:",v),oe(r,x,s,a)}}catch(e){const f=e instanceof Error?e.message:"Unknown error";console.error("Error registering album:",e),oe(r,f,s,a)}},Co=async(t,c,i)=>{if(i.size===0){console.log("[SubAlbum] Error: No items selected"),alert(t("Please select at least one item to share."));return}if(c)try{console.log("[SubAlbum] Creating loading modal");const n=document.createElement("div");n.style.position="fixed",n.style.top="0",n.style.left="0",n.style.width="100%",n.style.height="100%",n.style.backgroundColor="rgba(0, 0, 0, 0.5)",n.style.display="flex",n.style.justifyContent="center",n.style.alignItems="center",n.style.zIndex="2000";const u=document.createElement("div");u.style.backgroundColor="white",u.style.padding="30px",u.style.borderRadius="8px",u.style.textAlign="center";const s=document.createElement("p");s.textContent=t("Creating sub-album..."),u.appendChild(s),n.appendChild(u),document.body.appendChild(n),console.log("[SubAlbum] Loading modal added to DOM");const l=[],a=[];console.log("[SubAlbum] Starting to process selected items"),Array.from(i).forEach((e,f)=>{var p;console.log(`[SubAlbum] Processing item ${f+1}/${i.size}, index: ${e}`);const d=c.mediaItems[e];if(console.log("[SubAlbum] Media item found:",{hasMediaItem:!!d,fileId:d==null?void 0:d.fileId,type:d==null?void 0:d.type,hasUrl:!!(d!=null&&d.url)}),d&&d.fileId){l.push(d.fileId);const h=d.fileId.split("_____"),g=((p=h[1])==null?void 0:p.split("____")[0])||`file-${e}`;console.log("[SubAlbum] Extracted fileName:",{fileIdParts:h,fileName:g});const m={fileName:g,s3PreviewUrl:d.type==="video"&&d.thumbnailUrl||d.url,type:d.type==="video"?"video":"image",size:0,status:"complete",progress:100,fileId:d.fileId,duration:d.type==="video"&&d.duration?parseFloat(d.duration.split(":").reduce((v,x)=>60*v+parseFloat(x),0).toString()):null};console.log("[SubAlbum] Created SelectedPhoto object:",m),a.push(m)}else console.warn(`[SubAlbum] Skipping invalid media item at index ${e}`)}),console.log("[SubAlbum] Processing complete. Summary:",{selectedFileIdsCount:l.length,selectedPhotosCount:a.length,fileIdsSample:l.slice(0,2)});const r={isSubAlbum:!0,selectedFileIds:l,selectedPhotos:a};console.log("[SubAlbum] Created subAlbumData:",{isSubAlbum:r.isSubAlbum,selectedFileIdsCount:r.selectedFileIds.length,selectedPhotosCount:r.selectedPhotos.length});try{console.log(`[SubAlbum] Saving to localStorage with key: ${ee.SUB_ALBUM_DATA}`);const e=JSON.stringify(r);console.log(`[SubAlbum] Serialized data length: ${e.length} characters`),localStorage.setItem(ee.SUB_ALBUM_DATA,e),console.log("[SubAlbum] Successfully saved to localStorage")}catch(e){if(console.error("[SubAlbum] Error saving to localStorage:",e),e instanceof DOMException&&(e.name==="QuotaExceededError"||e.name==="NS_ERROR_DOM_QUOTA_REACHED")){console.error("[SubAlbum] localStorage quota exceeded"),alert(t("Storage limit exceeded. The album may be too large to share this way.")),document.body.removeChild(n);return}throw e}console.log("[SubAlbum] Removing loading modal"),document.body.removeChild(n),console.log("[SubAlbum] Redirecting to save-album.html"),window.location.href="/save-album.html"}catch(n){console.error("[SubAlbum] Error creating sub-album:",n),alert(t("There was an error creating the sub-album. Please try again."));try{const u=document.querySelector('div[style*="position: fixed"][style*="backgroundColor: rgba(0, 0, 0, 0.5)"]');u&&u.parentNode&&(console.log("[SubAlbum] Cleaning up loading modal after error"),u.parentNode.removeChild(u))}catch(u){console.error("[SubAlbum] Error cleaning up after main error:",u)}}else console.error("[SubAlbum] Error: Album data is null"),alert(t("Cannot create sub-album: Album data is missing."))},me=(t,c,i,n)=>{i.style.width=`${t}%`,n&&(c.textContent=n)},So=y.div`
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
`,Po=y.div`
  position: sticky;
  top: 0;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0,0,0,0.06);
  z-index: 10;
  margin-bottom: 10px;
  width: 100%;
`,Io=y.div`
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  
  @media (max-width: 767px) {
    padding: 16px 16px;
  }
`,To=y.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 5px;
  gap: 10px;
  flex-wrap: wrap;
`,Eo=y.button`
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
`,jo=y.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`,ko=y.h2`
  font-weight: 400;
  margin: 0 0 16px 0;
  font-size: 24px;
  padding: 0;
  
  @media (max-width: 767px) {
    padding: 0;
  }
`,Ao=y.strong`
  font-weight: 700;
`,Ro=y.div`
  padding: 0 24px 20px;
  width: 100%;
  overflow: visible; // Allow content to flow naturally
  
  @media (max-width: 767px) {
    padding: 0 16px 15px;
    width: 100%;
  }
`,Lo=y.div`
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  width: 100%;
`,_o=y.p`
  color: #333;
  margin: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  max-width: 100%;
`,Bo=y.div`
  display: grid;
  grid-gap: 20px;
  width: 100%;
  min-height: 0; // Allow proper sizing
  
  ${t=>{switch(t.columns){case"1":return W`grid-template-columns: repeat(1, 1fr);`;case"2":return W`grid-template-columns: repeat(2, 1fr);`;case"3":return W`grid-template-columns: repeat(3, 1fr);`;case"4":return W`grid-template-columns: repeat(4, 1fr);`;case"5":return W`grid-template-columns: repeat(5, 1fr);`;default:return W`grid-template-columns: repeat(1, 1fr);`}}}
  
  @media (max-width: 767px) {
    grid-gap: 8px;
    ${t=>{const c=parseInt(t.columns);return c>3?W`grid-template-columns: repeat(3, minmax(0, 1fr));`:c>1?W`grid-template-columns: repeat(${c}, minmax(0, 1fr));`:W`grid-template-columns: repeat(1, minmax(0, 1fr));`}}
  }
`,Mo=y.div`
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
`,No=y.div`
  position: relative;
  overflow: hidden;
  background-color: #f0f0f0;
  width: 100%;
  padding-bottom: 75%; // Create a consistent aspect ratio (4:3)
  height: 0; // Use padding-bottom for aspect ratio
  
  @media (max-width: 767px) {
    padding-bottom: 100%; // Square aspect ratio on mobile
  }
`,Ye=y.div`
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
`,Oo=y.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  transition: opacity 0.3s;
  opacity: ${t=>t.isLoaded?1:0};
`,Do=y.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading-animation 1.5s infinite;
  z-index: 0;
`,zo=y.div`
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
`,Uo=y.div`
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
`,Fo=y.div`
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
`,ke=y.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #d32f2f;
  grid-column: 1 / -1;
  width: 100%;
`,$o=y.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
  grid-column: 1 / -1;
  width: 100%;
`,Wo=y.label`
  margin-right: 8px;
  font-size: 14px;
  color: #555;
  font-weight: normal;
`,Ho=y.select`
  padding: 5px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  font-size: 14px;
  min-width: 50px;
`,qo=y.div`
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
`,Qo=y.div`
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
`;y.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;y.div`
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
`;y.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
  
  @media (max-width: 767px) {
    font-size: 18px;
  }
`;y.ol`
  list-style-type: decimal;
  padding-left: 20px;
`;y.li`
  margin-bottom: 12px;
  font-size: 16px;
  
  @media (max-width: 767px) {
    font-size: 14px;
  }
`;y.button`
  margin-top: 16px;
  padding: 8px 16px;
  background-color: #006adc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;const Ct=y.div`
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
`;y.p`
  font-style: italic;
  margin-top: 12px;
  margin-bottom: 12px;
  text-align: center;
  
  @media (max-width: 767px) {
    font-size: 14px;
  }
`;const Go=y(To)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  
  > div {
    width: auto;
    display: flex;
    align-items: center;
  }
`;y(Mo)`
  ${t=>t.isSelected&&`
    border: 3px solid #006adc;
    box-shadow: 0 0 0 3px rgba(0, 106, 220, 0.3);
  `}
`;const Vo=y.div`
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
`,Jo=y.div`
  padding: 10px 20px;
  background-color: #f0f7ff;
  border-radius: 4px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`,Ko=y.div`
  color: white;
  font-size: 14px;
  font-weight: bold;
`,we=y.div`
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
`,Ce=y.div`
  color: white;
  font-size: 24px;
  font-weight: bold;
  transform: rotate(-30deg);
  opacity: 0.7;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
  user-select: none;
  white-space: nowrap;
`,Xo=y.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 2000;
  display: flex;
  flex-direction: column;
`,We=y.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 16px;
  padding: 5px 10px;
  cursor: ${t=>t.isDisabled?"not-allowed":"pointer"};
  opacity: ${t=>t.isDisabled?.5:1};
`;y(We)``;const Yo=y.div`
  display: flex;
  gap: 10px;
`,Zo=y.a`
  text-decoration: none;
  color: white;
  background-color: #006adc;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
`,er=y.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  opacity: ${t=>t.isLoaded?1:0};
  transition: opacity 0.3s;
`,tr=y.img`
  position: absolute;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  opacity: 0.5;
`,or=y.video`
  max-width: 100%;
  max-height: 100%;
`,rr=y.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  z-index: 10;
`,Ze=y.div`
  position: relative;
`,nr=({showSelectPhotosButton:t,albumData:c,openFilePicker:i,t:n})=>!t||!(c!=null&&c.usingFolderInviteGrantsRightToAddItems)?null:o.jsx("div",{style:{width:"100%",display:"flex",justifyContent:"center",marginBottom:"20px",marginTop:"10px"},children:o.jsx("button",{onClick:i,style:{backgroundColor:"#007bff",color:"white",border:"none",borderRadius:"6px",padding:"12px 20px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"8px",fontSize:"16px",boxShadow:"0 2px 4px rgba(0,0,0,0.1)"},children:o.jsx("span",{children:n("Select Photos To Add To Album")})})}),ir=({isAuthorized:t,passwordPolicy:c,passwordError:i,promptForPassword:n,t:u})=>t||c!=="NotVisible"?null:o.jsxs("div",{style:{padding:"20px",backgroundColor:"#f3f4f6",borderRadius:"8px",textAlign:"center",marginBottom:"20px"},children:[o.jsx("h3",{children:u("This album is password protected")}),o.jsx("p",{children:u("Please enter the password to view the contents")}),i&&o.jsx("div",{style:{color:"#d32f2f",fontSize:"14px",margin:"10px 0",padding:"5px",backgroundColor:"rgba(211, 47, 47, 0.1)",borderRadius:"4px"},children:i}),o.jsx("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"10px"},children:o.jsx(Z,{onClick:n,children:u("Enter Password")})})]}),sr=({isSelectionMode:t,t:c})=>t?o.jsx(Jo,{children:o.jsx("p",{children:c("Select photos and videos to create a sub-album to share")})}):null,ar=y.div`
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
`,lr=y.div`
  padding: 15px;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
`,dr=y.button`
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
`,cr=y.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  padding: 10px;
  position: relative;
  touch-action: pan-y; /* Allow vertical scrolling but capture horizontal swipes */
`,ur=({item:t,index:c,onClose:i,onPrev:n,onNext:u,hasNext:s,hasPrev:l,ownerName:a,showWatermark:r=!1})=>{const[e,f]=w.useState(!1),[d,p]=w.useState(!0),{t:h}=Pe(),g=w.useRef(null),m=w.useRef(null),v=w.useRef(null),x=50,[C,b]=w.useState(!1),S=w.useRef(0);w.useEffect(()=>{const P=M=>{M.key==="Escape"?i():M.key==="ArrowLeft"&&l?n():M.key==="ArrowRight"&&s&&u()};return window.addEventListener("keydown",P),()=>window.removeEventListener("keydown",P)},[i,u,n,s,l]);const A=P=>{g.current=P.touches[0].clientX,v.current&&(S.current=v.current.scrollTop),b(!1)},E=P=>{g.current!==null&&(v.current&&Math.abs(v.current.scrollTop-S.current)>10&&b(!0),m.current=P.touches[0].clientX)},j=()=>{if(g.current===null||m.current===null||C){g.current=null,m.current=null;return}const P=m.current-g.current;Math.abs(P)>x&&(P>0&&l?n():P<0&&s&&u()),g.current=null,m.current=null},_=P=>(P==null?void 0:P.split("_____")[0])||"";return o.jsxs(Xo,{children:[o.jsxs(ar,{children:[o.jsx(dr,{onClick:i,children:"✕"}),o.jsxs(Yo,{children:[o.jsx(We,{onClick:l?n:void 0,disabled:!l,isDisabled:!l,children:"←"}),o.jsx(We,{onClick:s?u:void 0,disabled:!s,isDisabled:!s,children:"→"})]})]}),o.jsxs(cr,{ref:v,onTouchStart:A,onTouchMove:E,onTouchEnd:j,children:[t.type==="image"?o.jsxs(Ze,{children:[o.jsx(er,{src:t.url,alt:`Image ${c+1}`,isLoaded:e,onLoad:()=>{f(!0),p(!1)}}),r&&o.jsx(we,{children:o.jsx(Ce,{children:"6180 Watermarked"})}),!e&&t.thumbnailUrl&&o.jsx(tr,{src:t.thumbnailUrl,alt:`Thumbnail ${c+1}`})]}):o.jsxs(Ze,{children:[o.jsxs(or,{controls:!0,autoPlay:!0,onLoadedData:()=>p(!1),children:[o.jsx("source",{src:t.url,type:"video/mp4"}),h("Your browser does not support the video tag.")]}),r&&o.jsx(we,{children:o.jsx(Ce,{children:"6180 Watermarked"})})]}),d&&o.jsx(rr,{children:t.type==="image"?h("Loading full resolution..."):h("Loading video...")})]}),o.jsx(lr,{children:t.ownerContactId&&o.jsxs(Zo,{href:`/profile.html?id=${_(t.ownerContactId)}`,children:[o.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[o.jsx("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),o.jsx("circle",{cx:"12",cy:"7",r:"4"})]}),a]})})]})};var re={},Ae={exports:{}},Re,et;function pr(){if(et)return Re;et=1;var t="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Re=t,Re}var Le,tt;function fr(){if(tt)return Le;tt=1;var t=pr();function c(){}function i(){}return i.resetWarningCache=c,Le=function(){function n(l,a,r,e,f,d){if(d!==t){var p=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw p.name="Invariant Violation",p}}n.isRequired=n;function u(){return n}var s={array:n,bigint:n,bool:n,func:n,number:n,object:n,string:n,symbol:n,any:n,arrayOf:u,element:n,elementType:n,instanceOf:u,node:n,objectOf:u,oneOf:u,oneOfType:u,shape:u,exact:u,checkPropTypes:i,resetWarningCache:c};return s.PropTypes=s,s},Le}var ot;function St(){return ot||(ot=1,Ae.exports=fr()()),Ae.exports}var _e,rt;function Pt(){return rt||(rt=1,_e={L:1,M:0,Q:3,H:2}),_e}var Be,nt;function It(){return nt||(nt=1,Be={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8}),Be}var Me,it;function hr(){if(it)return Me;it=1;var t=It();function c(i){this.mode=t.MODE_8BIT_BYTE,this.data=i}return c.prototype={getLength:function(i){return this.data.length},write:function(i){for(var n=0;n<this.data.length;n++)i.put(this.data.charCodeAt(n),8)}},Me=c,Me}var Ne,st;function gr(){if(st)return Ne;st=1;var t=Pt();function c(i,n){this.totalCount=i,this.dataCount=n}return c.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],c.getRSBlocks=function(i,n){var u=c.getRsBlockTable(i,n);if(u==null)throw new Error("bad rs block @ typeNumber:"+i+"/errorCorrectLevel:"+n);for(var s=u.length/3,l=new Array,a=0;a<s;a++)for(var r=u[a*3+0],e=u[a*3+1],f=u[a*3+2],d=0;d<r;d++)l.push(new c(e,f));return l},c.getRsBlockTable=function(i,n){switch(n){case t.L:return c.RS_BLOCK_TABLE[(i-1)*4+0];case t.M:return c.RS_BLOCK_TABLE[(i-1)*4+1];case t.Q:return c.RS_BLOCK_TABLE[(i-1)*4+2];case t.H:return c.RS_BLOCK_TABLE[(i-1)*4+3];default:return}},Ne=c,Ne}var Oe,at;function mr(){if(at)return Oe;at=1;function t(){this.buffer=new Array,this.length=0}return t.prototype={get:function(c){var i=Math.floor(c/8);return(this.buffer[i]>>>7-c%8&1)==1},put:function(c,i){for(var n=0;n<i;n++)this.putBit((c>>>i-n-1&1)==1)},getLengthInBits:function(){return this.length},putBit:function(c){var i=Math.floor(this.length/8);this.buffer.length<=i&&this.buffer.push(0),c&&(this.buffer[i]|=128>>>this.length%8),this.length++}},Oe=t,Oe}var De,lt;function Tt(){if(lt)return De;lt=1;for(var t={glog:function(i){if(i<1)throw new Error("glog("+i+")");return t.LOG_TABLE[i]},gexp:function(i){for(;i<0;)i+=255;for(;i>=256;)i-=255;return t.EXP_TABLE[i]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},c=0;c<8;c++)t.EXP_TABLE[c]=1<<c;for(var c=8;c<256;c++)t.EXP_TABLE[c]=t.EXP_TABLE[c-4]^t.EXP_TABLE[c-5]^t.EXP_TABLE[c-6]^t.EXP_TABLE[c-8];for(var c=0;c<255;c++)t.LOG_TABLE[t.EXP_TABLE[c]]=c;return De=t,De}var ze,dt;function Et(){if(dt)return ze;dt=1;var t=Tt();function c(i,n){if(i.length==null)throw new Error(i.length+"/"+n);for(var u=0;u<i.length&&i[u]==0;)u++;this.num=new Array(i.length-u+n);for(var s=0;s<i.length-u;s++)this.num[s]=i[s+u]}return c.prototype={get:function(i){return this.num[i]},getLength:function(){return this.num.length},multiply:function(i){for(var n=new Array(this.getLength()+i.getLength()-1),u=0;u<this.getLength();u++)for(var s=0;s<i.getLength();s++)n[u+s]^=t.gexp(t.glog(this.get(u))+t.glog(i.get(s)));return new c(n,0)},mod:function(i){if(this.getLength()-i.getLength()<0)return this;for(var n=t.glog(this.get(0))-t.glog(i.get(0)),u=new Array(this.getLength()),s=0;s<this.getLength();s++)u[s]=this.get(s);for(var s=0;s<i.getLength();s++)u[s]^=t.gexp(t.glog(i.get(s))+n);return new c(u,0).mod(i)}},ze=c,ze}var Ue,ct;function xr(){if(ct)return Ue;ct=1;var t=It(),c=Et(),i=Tt(),n={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},u={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(s){for(var l=s<<10;u.getBCHDigit(l)-u.getBCHDigit(u.G15)>=0;)l^=u.G15<<u.getBCHDigit(l)-u.getBCHDigit(u.G15);return(s<<10|l)^u.G15_MASK},getBCHTypeNumber:function(s){for(var l=s<<12;u.getBCHDigit(l)-u.getBCHDigit(u.G18)>=0;)l^=u.G18<<u.getBCHDigit(l)-u.getBCHDigit(u.G18);return s<<12|l},getBCHDigit:function(s){for(var l=0;s!=0;)l++,s>>>=1;return l},getPatternPosition:function(s){return u.PATTERN_POSITION_TABLE[s-1]},getMask:function(s,l,a){switch(s){case n.PATTERN000:return(l+a)%2==0;case n.PATTERN001:return l%2==0;case n.PATTERN010:return a%3==0;case n.PATTERN011:return(l+a)%3==0;case n.PATTERN100:return(Math.floor(l/2)+Math.floor(a/3))%2==0;case n.PATTERN101:return l*a%2+l*a%3==0;case n.PATTERN110:return(l*a%2+l*a%3)%2==0;case n.PATTERN111:return(l*a%3+(l+a)%2)%2==0;default:throw new Error("bad maskPattern:"+s)}},getErrorCorrectPolynomial:function(s){for(var l=new c([1],0),a=0;a<s;a++)l=l.multiply(new c([1,i.gexp(a)],0));return l},getLengthInBits:function(s,l){if(1<=l&&l<10)switch(s){case t.MODE_NUMBER:return 10;case t.MODE_ALPHA_NUM:return 9;case t.MODE_8BIT_BYTE:return 8;case t.MODE_KANJI:return 8;default:throw new Error("mode:"+s)}else if(l<27)switch(s){case t.MODE_NUMBER:return 12;case t.MODE_ALPHA_NUM:return 11;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 10;default:throw new Error("mode:"+s)}else if(l<41)switch(s){case t.MODE_NUMBER:return 14;case t.MODE_ALPHA_NUM:return 13;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 12;default:throw new Error("mode:"+s)}else throw new Error("type:"+l)},getLostPoint:function(s){for(var l=s.getModuleCount(),a=0,r=0;r<l;r++)for(var e=0;e<l;e++){for(var f=0,d=s.isDark(r,e),p=-1;p<=1;p++)if(!(r+p<0||l<=r+p))for(var h=-1;h<=1;h++)e+h<0||l<=e+h||p==0&&h==0||d==s.isDark(r+p,e+h)&&f++;f>5&&(a+=3+f-5)}for(var r=0;r<l-1;r++)for(var e=0;e<l-1;e++){var g=0;s.isDark(r,e)&&g++,s.isDark(r+1,e)&&g++,s.isDark(r,e+1)&&g++,s.isDark(r+1,e+1)&&g++,(g==0||g==4)&&(a+=3)}for(var r=0;r<l;r++)for(var e=0;e<l-6;e++)s.isDark(r,e)&&!s.isDark(r,e+1)&&s.isDark(r,e+2)&&s.isDark(r,e+3)&&s.isDark(r,e+4)&&!s.isDark(r,e+5)&&s.isDark(r,e+6)&&(a+=40);for(var e=0;e<l;e++)for(var r=0;r<l-6;r++)s.isDark(r,e)&&!s.isDark(r+1,e)&&s.isDark(r+2,e)&&s.isDark(r+3,e)&&s.isDark(r+4,e)&&!s.isDark(r+5,e)&&s.isDark(r+6,e)&&(a+=40);for(var m=0,e=0;e<l;e++)for(var r=0;r<l;r++)s.isDark(r,e)&&m++;var v=Math.abs(100*m/l/l-50)/5;return a+=v*10,a}};return Ue=u,Ue}var Fe,ut;function vr(){if(ut)return Fe;ut=1;var t=hr(),c=gr(),i=mr(),n=xr(),u=Et();function s(a,r){this.typeNumber=a,this.errorCorrectLevel=r,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}var l=s.prototype;return l.addData=function(a){var r=new t(a);this.dataList.push(r),this.dataCache=null},l.isDark=function(a,r){if(a<0||this.moduleCount<=a||r<0||this.moduleCount<=r)throw new Error(a+","+r);return this.modules[a][r]},l.getModuleCount=function(){return this.moduleCount},l.make=function(){if(this.typeNumber<1){var a=1;for(a=1;a<40;a++){for(var r=c.getRSBlocks(a,this.errorCorrectLevel),e=new i,f=0,d=0;d<r.length;d++)f+=r[d].dataCount;for(var d=0;d<this.dataList.length;d++){var p=this.dataList[d];e.put(p.mode,4),e.put(p.getLength(),n.getLengthInBits(p.mode,a)),p.write(e)}if(e.getLengthInBits()<=f*8)break}this.typeNumber=a}this.makeImpl(!1,this.getBestMaskPattern())},l.makeImpl=function(a,r){this.moduleCount=this.typeNumber*4+17,this.modules=new Array(this.moduleCount);for(var e=0;e<this.moduleCount;e++){this.modules[e]=new Array(this.moduleCount);for(var f=0;f<this.moduleCount;f++)this.modules[e][f]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(a,r),this.typeNumber>=7&&this.setupTypeNumber(a),this.dataCache==null&&(this.dataCache=s.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,r)},l.setupPositionProbePattern=function(a,r){for(var e=-1;e<=7;e++)if(!(a+e<=-1||this.moduleCount<=a+e))for(var f=-1;f<=7;f++)r+f<=-1||this.moduleCount<=r+f||(0<=e&&e<=6&&(f==0||f==6)||0<=f&&f<=6&&(e==0||e==6)||2<=e&&e<=4&&2<=f&&f<=4?this.modules[a+e][r+f]=!0:this.modules[a+e][r+f]=!1)},l.getBestMaskPattern=function(){for(var a=0,r=0,e=0;e<8;e++){this.makeImpl(!0,e);var f=n.getLostPoint(this);(e==0||a>f)&&(a=f,r=e)}return r},l.createMovieClip=function(a,r,e){var f=a.createEmptyMovieClip(r,e),d=1;this.make();for(var p=0;p<this.modules.length;p++)for(var h=p*d,g=0;g<this.modules[p].length;g++){var m=g*d,v=this.modules[p][g];v&&(f.beginFill(0,100),f.moveTo(m,h),f.lineTo(m+d,h),f.lineTo(m+d,h+d),f.lineTo(m,h+d),f.endFill())}return f},l.setupTimingPattern=function(){for(var a=8;a<this.moduleCount-8;a++)this.modules[a][6]==null&&(this.modules[a][6]=a%2==0);for(var r=8;r<this.moduleCount-8;r++)this.modules[6][r]==null&&(this.modules[6][r]=r%2==0)},l.setupPositionAdjustPattern=function(){for(var a=n.getPatternPosition(this.typeNumber),r=0;r<a.length;r++)for(var e=0;e<a.length;e++){var f=a[r],d=a[e];if(this.modules[f][d]==null)for(var p=-2;p<=2;p++)for(var h=-2;h<=2;h++)p==-2||p==2||h==-2||h==2||p==0&&h==0?this.modules[f+p][d+h]=!0:this.modules[f+p][d+h]=!1}},l.setupTypeNumber=function(a){for(var r=n.getBCHTypeNumber(this.typeNumber),e=0;e<18;e++){var f=!a&&(r>>e&1)==1;this.modules[Math.floor(e/3)][e%3+this.moduleCount-8-3]=f}for(var e=0;e<18;e++){var f=!a&&(r>>e&1)==1;this.modules[e%3+this.moduleCount-8-3][Math.floor(e/3)]=f}},l.setupTypeInfo=function(a,r){for(var e=this.errorCorrectLevel<<3|r,f=n.getBCHTypeInfo(e),d=0;d<15;d++){var p=!a&&(f>>d&1)==1;d<6?this.modules[d][8]=p:d<8?this.modules[d+1][8]=p:this.modules[this.moduleCount-15+d][8]=p}for(var d=0;d<15;d++){var p=!a&&(f>>d&1)==1;d<8?this.modules[8][this.moduleCount-d-1]=p:d<9?this.modules[8][15-d-1+1]=p:this.modules[8][15-d-1]=p}this.modules[this.moduleCount-8][8]=!a},l.mapData=function(a,r){for(var e=-1,f=this.moduleCount-1,d=7,p=0,h=this.moduleCount-1;h>0;h-=2)for(h==6&&h--;;){for(var g=0;g<2;g++)if(this.modules[f][h-g]==null){var m=!1;p<a.length&&(m=(a[p]>>>d&1)==1);var v=n.getMask(r,f,h-g);v&&(m=!m),this.modules[f][h-g]=m,d--,d==-1&&(p++,d=7)}if(f+=e,f<0||this.moduleCount<=f){f-=e,e=-e;break}}},s.PAD0=236,s.PAD1=17,s.createData=function(a,r,e){for(var f=c.getRSBlocks(a,r),d=new i,p=0;p<e.length;p++){var h=e[p];d.put(h.mode,4),d.put(h.getLength(),n.getLengthInBits(h.mode,a)),h.write(d)}for(var g=0,p=0;p<f.length;p++)g+=f[p].dataCount;if(d.getLengthInBits()>g*8)throw new Error("code length overflow. ("+d.getLengthInBits()+">"+g*8+")");for(d.getLengthInBits()+4<=g*8&&d.put(0,4);d.getLengthInBits()%8!=0;)d.putBit(!1);for(;!(d.getLengthInBits()>=g*8||(d.put(s.PAD0,8),d.getLengthInBits()>=g*8));)d.put(s.PAD1,8);return s.createBytes(d,f)},s.createBytes=function(a,r){for(var e=0,f=0,d=0,p=new Array(r.length),h=new Array(r.length),g=0;g<r.length;g++){var m=r[g].dataCount,v=r[g].totalCount-m;f=Math.max(f,m),d=Math.max(d,v),p[g]=new Array(m);for(var x=0;x<p[g].length;x++)p[g][x]=255&a.buffer[x+e];e+=m;var C=n.getErrorCorrectPolynomial(v),b=new u(p[g],C.getLength()-1),S=b.mod(C);h[g]=new Array(C.getLength()-1);for(var x=0;x<h[g].length;x++){var A=x+S.getLength()-h[g].length;h[g][x]=A>=0?S.get(A):0}}for(var E=0,x=0;x<r.length;x++)E+=r[x].totalCount;for(var j=new Array(E),_=0,x=0;x<f;x++)for(var g=0;g<r.length;g++)x<p[g].length&&(j[_++]=p[g][x]);for(var x=0;x<d;x++)for(var g=0;g<r.length;g++)x<h[g].length&&(j[_++]=h[g][x]);return j},Fe=s,Fe}var xe={},pt;function br(){if(pt)return xe;pt=1,Object.defineProperty(xe,"__esModule",{value:!0});var t=Object.assign||function(e){for(var f=1;f<arguments.length;f++){var d=arguments[f];for(var p in d)Object.prototype.hasOwnProperty.call(d,p)&&(e[p]=d[p])}return e},c=St(),i=s(c),n=xt(),u=s(n);function s(e){return e&&e.__esModule?e:{default:e}}function l(e,f){var d={};for(var p in e)f.indexOf(p)>=0||Object.prototype.hasOwnProperty.call(e,p)&&(d[p]=e[p]);return d}var a={bgColor:i.default.oneOfType([i.default.object,i.default.string]).isRequired,bgD:i.default.string.isRequired,fgColor:i.default.oneOfType([i.default.object,i.default.string]).isRequired,fgD:i.default.string.isRequired,size:i.default.number.isRequired,title:i.default.string,viewBoxSize:i.default.number.isRequired,xmlns:i.default.string},r=(0,n.forwardRef)(function(e,f){var d=e.bgColor,p=e.bgD,h=e.fgD,g=e.fgColor,m=e.size,v=e.title,x=e.viewBoxSize,C=e.xmlns,b=C===void 0?"http://www.w3.org/2000/svg":C,S=l(e,["bgColor","bgD","fgD","fgColor","size","title","viewBoxSize","xmlns"]);return u.default.createElement("svg",t({},S,{height:m,ref:f,viewBox:"0 0 "+x+" "+x,width:m,xmlns:b}),v?u.default.createElement("title",null,v):null,u.default.createElement("path",{d:p,fill:d}),u.default.createElement("path",{d:h,fill:g}))});return r.displayName="QRCodeSvg",r.propTypes=a,xe.default=r,xe}var ft;function yr(){if(ft)return re;ft=1,Object.defineProperty(re,"__esModule",{value:!0}),re.QRCode=void 0;var t=Object.assign||function(m){for(var v=1;v<arguments.length;v++){var x=arguments[v];for(var C in x)Object.prototype.hasOwnProperty.call(x,C)&&(m[C]=x[C])}return m},c=St(),i=d(c),n=Pt(),u=d(n),s=vr(),l=d(s),a=xt(),r=d(a),e=br(),f=d(e);function d(m){return m&&m.__esModule?m:{default:m}}function p(m,v){var x={};for(var C in m)v.indexOf(C)>=0||Object.prototype.hasOwnProperty.call(m,C)&&(x[C]=m[C]);return x}var h={bgColor:i.default.oneOfType([i.default.object,i.default.string]),fgColor:i.default.oneOfType([i.default.object,i.default.string]),level:i.default.string,size:i.default.number,value:i.default.string.isRequired},g=(0,a.forwardRef)(function(m,v){var x=m.bgColor,C=x===void 0?"#FFFFFF":x,b=m.fgColor,S=b===void 0?"#000000":b,A=m.level,E=A===void 0?"L":A,j=m.size,_=j===void 0?256:j,P=m.value,M=p(m,["bgColor","fgColor","level","size","value"]),B=new l.default(-1,u.default[E]);B.addData(P),B.make();var N=B.modules;return r.default.createElement(f.default,t({},M,{bgColor:C,bgD:N.map(function(U,F){return U.map(function(O,D){return O?"":"M "+D+" "+F+" l 1 0 0 1 -1 0 Z"}).join(" ")}).join(" "),fgColor:S,fgD:N.map(function(U,F){return U.map(function(O,D){return O?"M "+D+" "+F+" l 1 0 0 1 -1 0 Z":""}).join(" ")}).join(" "),ref:v,size:_,viewBoxSize:N.length}))});return re.QRCode=g,g.displayName="QRCode",g.propTypes=h,re.default=g,re}yr();const wr=({isOpen:t,onClose:c,onSubmit:i,error:n,t:u})=>{const[s,l]=w.useState(""),[a,r]=w.useState(!1);if(!t)return null;const e=f=>{f.preventDefault(),r(!0),i(s),r(!1)};return o.jsx(qo,{children:o.jsx(Qo,{style:{maxWidth:"400px"},children:o.jsxs("div",{style:{padding:"20px"},children:[o.jsx("h3",{style:{margin:"0 0 20px 0",textAlign:"center"},children:u("Enter Password")}),o.jsxs("form",{onSubmit:e,children:[o.jsxs("div",{style:{marginBottom:"20px"},children:[o.jsx("input",{type:"password",value:s,onChange:f=>l(f.target.value),placeholder:u("Password"),style:{width:"100%",padding:"10px",borderRadius:"4px",border:n?"1px solid #d32f2f":"1px solid #ccc",fontSize:"16px"},required:!0}),n&&o.jsx("div",{style:{color:"#d32f2f",fontSize:"14px",marginTop:"5px",padding:"5px"},children:n})]}),o.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[o.jsx("button",{type:"button",onClick:c,style:{padding:"10px 16px",backgroundColor:"#f3f4f6",border:"none",borderRadius:"4px",cursor:"pointer",fontSize:"14px"},children:u("Cancel")}),o.jsx("button",{type:"submit",disabled:a||!s,style:{padding:"10px 16px",backgroundColor:"#006adc",color:"white",border:"none",borderRadius:"4px",cursor:s?"pointer":"not-allowed",opacity:s?1:.7,fontSize:"14px"},children:u(a?"Submitting...":"Submit")})]})]})]})})})},$e=new mo({region:Qt});function ht(t){const c=t.trim().toLowerCase(),i="@gmail.com";return c.endsWith(i)?`${c.slice(0,-i.length).replace(/\./g,"")}${i}`:c}const Cr=({isOpen:t,onClose:c,onLoginSuccess:i,t:n})=>{const[u,s]=w.useState(""),[l,a]=w.useState(!1),[r,e]=w.useState(""),[f,d]=w.useState(""),[p,h]=w.useState("idle"),[g,m]=w.useState(""),v=w.useRef(null),x=w.useRef(null);w.useEffect(()=>{l&&x.current&&x.current.focus()},[l]),w.useEffect(()=>{t&&v.current&&!l&&v.current.focus()},[t,l]);function C(E){const j=E.target.value;/^\d*$/.test(j)&&j.length<=6&&e(j)}async function b(){var j;h("sending"),m("");const E=ht(u);if(!E||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(E)){h("error"),m(n("Please enter a valid email address"));return}try{const _=new xo({ClientId:Ee,Username:E,Password:crypto.randomUUID(),UserAttributes:[{Name:"email",Value:E}]});try{await $e.send(_)}catch(B){if(!((j=B.name)!=null&&j.includes("UsernameExistsException")))throw B}const P=new vo({ClientId:Ee,AuthFlow:"CUSTOM_AUTH",AuthParameters:{USERNAME:E}}),M=await $e.send(P);if(M.Session)d(M.Session),a(!0),h("idle");else throw new Error("No session returned from InitiateAuth")}catch(_){console.error(_),h("error"),m(n("Unable to send verification code. Please try again later."))}}async function S(){var j,_,P,M,B,N;h("verifying"),m("");const E=ht(u);try{const U=new bo({ClientId:Ee,ChallengeName:"CUSTOM_CHALLENGE",ChallengeResponses:{USERNAME:E,ANSWER:r},Session:f}),O=(j=(await $e.send(U)).AuthenticationResult)==null?void 0:j.IdToken;if(!O)throw new Error("No token received");localStorage.setItem("idToken",O);const k=`${JSON.parse(atob(O.split(".")[1]))["cognito:username"]}_____Public____Profile`,J=await(await fetch(Se,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${O}`},body:JSON.stringify({query:`
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
          `,variables:{relationIds:[k]}})})).json(),ce=(N=(B=(M=(P=(_=J==null?void 0:J.data)==null?void 0:_.batchGetItems)==null?void 0:P.items)==null?void 0:M[0])==null?void 0:B.item)==null?void 0:N.anyDisplayName;ce&&localStorage.setItem(ee.PUBLIC_USERNAME,ce),h("idle"),i(),c()}catch(U){console.error(U),h("error"),m(n("Invalid or expired verification code. Please try again or request a new code."))}}function A(){a(!1),e(""),h("idle")}return t?o.jsx("div",{style:{backgroundColor:"rgba(0, 0, 0, 0.5)",position:"fixed",top:0,left:0,right:0,bottom:0,display:"flex",alignItems:"center",justifyContent:"center",zIndex:1e3},children:o.jsxs("div",{style:{maxWidth:400,width:"100%",background:"#ffffff",padding:"32px",borderRadius:"12px",boxShadow:"0 6px 20px rgba(0,0,0,0.06)",textAlign:"center"},children:[o.jsxs("div",{style:{marginBottom:"24px"},children:[o.jsx("img",{src:"images/logo_no_background.png",alt:"6180 Logo",style:{height:"60px",marginBottom:"16px"}}),o.jsx("h2",{style:{fontSize:"24px",fontWeight:600,color:"#333"},children:n("Sign in to 6180")})]}),g&&o.jsx("div",{style:{backgroundColor:"#f8d7da",color:"#721c24",padding:"10px",borderRadius:"6px",marginBottom:"16px",fontSize:"14px"},children:g}),l?o.jsxs(o.Fragment,{children:[o.jsxs("p",{style:{marginBottom:"16px",color:"#555"},children:[n("Check your email for a 6-digit verification code sent to")," ",o.jsx("strong",{children:u})]}),o.jsx("input",{ref:x,type:"tel",inputMode:"numeric",pattern:"[0-9]*",maxLength:6,value:r,onChange:C,placeholder:n("Enter 6-digit code"),style:{width:"100%",padding:"12px",marginBottom:"16px",borderRadius:"6px",border:"1px solid #ccc",fontSize:"16px",boxSizing:"border-box",letterSpacing:"2px",textAlign:"center"}}),o.jsx("button",{onClick:S,disabled:p==="verifying"||r.length!==6,style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#28a745",color:"#fff",border:"none",borderRadius:"6px",cursor:p==="verifying"||r.length!==6?"not-allowed":"pointer",opacity:p==="verifying"||r.length!==6?.7:1},children:n(p==="verifying"?"Verifying...":"Verify Code")}),o.jsxs("div",{style:{marginTop:"16px",fontSize:"14px",color:"#666",display:"flex",justifyContent:"center",gap:"8px"},children:[o.jsx("span",{children:n("Didn't receive a code?")}),o.jsx("button",{onClick:A,style:{background:"none",border:"none",color:"#007bff",padding:0,cursor:"pointer",fontSize:"14px",textDecoration:"underline"},children:n("Send new code")})]}),o.jsx("button",{onClick:c,style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#f8f9fa",color:"#555",border:"1px solid #ccc",borderRadius:"6px",cursor:"pointer",marginTop:"12px"},children:n("Cancel")})]}):o.jsxs(o.Fragment,{children:[o.jsx("input",{ref:v,type:"email",value:u,onChange:E=>s(E.target.value),placeholder:n("Enter your email"),style:{width:"100%",padding:"12px",marginBottom:"16px",borderRadius:"6px",border:"1px solid #ccc",fontSize:"16px",boxSizing:"border-box"}}),o.jsx("button",{onClick:b,disabled:p==="sending"||!u.trim(),style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#007bff",color:"#fff",border:"none",borderRadius:"6px",cursor:p==="sending"||!u.trim()?"not-allowed":"pointer",opacity:p==="sending"||!u.trim()?.7:1},children:n(p==="sending"?"Sending...":"Send Verification Code")}),o.jsx("p",{style:{fontSize:"13px",color:"#666",marginTop:"16px",textAlign:"center"},children:n("We'll send a secure verification code to your email")}),o.jsx("button",{onClick:c,style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#f8f9fa",color:"#555",border:"1px solid #ccc",borderRadius:"6px",cursor:"pointer",marginTop:"12px"},children:n("Cancel")})]})]})}):null},Sr=({albumData:t,t:c})=>!t||Object.keys(t.contacts).length===0?null:o.jsx("div",{style:{width:"100%",backgroundColor:"#f0f7ff",borderRadius:"8px",padding:"16px",marginBottom:"20px",boxShadow:"0 2px 4px rgba(0,0,0,0.1)",border:"1px solid #d0e1f9"},children:o.jsxs("p",{style:{margin:"0",fontSize:"15px",color:"#333",textAlign:"left"},children:[c('Click "Save" to create memories you can find later with')," ‎",o.jsx("strong",{children:Object.values(t.contacts).filter(i=>!i.toString().startsWith("Profile-")).join(", ")})]})}),He=({src:t,thumbnailSrc:c,alt:i,className:n="",loadFullResolution:u=!1,onFullResolutionLoaded:s,onClick:l,showWatermark:a=!1})=>{const[r,e]=w.useState(!1),[f,d]=w.useState(!1),[p,h]=w.useState(!1),[g,m]=w.useState("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E"),{t:v}=Pe();return w.useEffect(()=>{if(c){const x=new Image;x.src=c,x.onload=()=>{m(c),e(!0)}}},[c]),w.useEffect(()=>{if(u&&!f){h(!0);const x=new Image;x.src=t,x.onload=()=>{m(t),d(!0),h(!1),s&&s()}}},[u,t,f,s]),o.jsxs(No,{onClick:l,children:[o.jsx(Oo,{src:g,alt:i,className:n,isLoaded:r,style:{cursor:l?"pointer":"default"}}),!r&&o.jsx(Do,{}),p&&o.jsx(Ct,{children:v("Loading full resolution...")}),a&&r&&o.jsx(we,{children:o.jsx(Ce,{children:"6180 Watermarked"})})]})},Pr=({thumbnailUrl:t,videoUrl:c,duration:i,index:n,onFullResolutionLoaded:u,onClick:s,showWatermark:l=!1})=>{const[a,r]=w.useState(!1),[e,f]=w.useState(!1),[d,p]=w.useState(!1),h=Gt.useRef(null),{t:g}=Pe(),m=()=>{if(s){s();return}d?r(!0):f(!0)},v=()=>{p(!0),r(!0),u&&u()};return w.useEffect(()=>{if(e&&h.current&&!d){const x=h.current,C=()=>{v(),x.removeEventListener("canplaythrough",C)};return x.addEventListener("canplaythrough",C),x.load(),()=>{x.removeEventListener("canplaythrough",C)}}},[e,d]),a?o.jsxs("div",{style:{position:"relative",width:"100%",height:"100%"},children:[o.jsxs("video",{ref:h,controls:!0,style:{width:"100%",height:"100%"},children:[o.jsx("source",{src:c,type:"video/mp4"}),g("Your browser does not support the video tag.")]}),l&&o.jsx(we,{children:o.jsx(Ce,{children:"6180 Watermarked"})})]}):e&&!d?o.jsxs(Ye,{children:[o.jsx(He,{src:c,thumbnailSrc:t,alt:`Video thumbnail ${n+1}`,showWatermark:l}),o.jsx(Ct,{children:g("Loading video...")}),o.jsx("video",{ref:h,style:{display:"none"},preload:"auto",children:o.jsx("source",{src:c,type:"video/mp4"})})]}):o.jsxs(Ye,{onClick:m,children:[o.jsx(He,{src:c,thumbnailSrc:t,alt:`Video thumbnail ${n+1}`,showWatermark:l}),o.jsx(Uo,{}),o.jsx(Fo,{children:i})]})},Ir=({item:t,index:c,isSelectionMode:i,isSelected:n,toggleItemSelection:u,openFullscreenView:s,showWatermark:l,ownerName:a})=>o.jsxs("div",{style:{position:"relative",border:i&&n?"3px solid #006adc":void 0,borderRadius:"8px",overflow:"hidden",boxShadow:i&&n?"0 0 0 3px rgba(0, 106, 220, 0.3)":void 0},onClick:r=>i?u(c,r):s(c),children:[i&&o.jsx(Vo,{isSelected:n,onClick:r=>u(c,r),children:n&&o.jsx(Ko,{children:"✓"})}),t.type==="image"?o.jsx(He,{src:t.url,thumbnailSrc:t.thumbnailUrl,alt:`Album image ${c+1}`,loadFullResolution:!1,onFullResolutionLoaded:()=>{},onClick:()=>i?void 0:s(c),showWatermark:l}):o.jsx(Pr,{thumbnailUrl:t.thumbnailUrl||"",videoUrl:t.url,duration:t.duration||"0:00",index:c,onFullResolutionLoaded:()=>{},onClick:()=>i?void 0:s(c),showWatermark:l}),a&&o.jsx(zo,{children:a})]},c),Tr=({isLoading:t,error:c,albumData:i,columns:n,shouldShowContent:u,shouldShowWatermark:s,isSelectionMode:l,selectedItems:a,toggleItemSelection:r,openFullscreenView:e,t:f})=>t?o.jsx($o,{id:"loading-message",children:f("Loading album content...")}):c?o.jsx(ke,{children:c}):u()?!i||i.mediaItems.length===0?o.jsx(ke,{children:f("No media found in this album")}):o.jsx(Bo,{id:"media-grid",columns:n,children:i.mediaItems.map((d,p)=>{const h=d.ownerContactId&&i.contacts[d.ownerContactId]?i.contacts[d.ownerContactId]:"",g=a.has(p),m=s();return o.jsx(Ir,{item:d,index:p,isSelectionMode:l,isSelected:g,toggleItemSelection:r,openFullscreenView:e,showWatermark:m,ownerName:h},p)})}):o.jsx("div",{style:{gridColumn:"1 / -1",textAlign:"center",padding:"40px 0"},children:o.jsx(ke,{children:f("Enter the password to view album contents")})}),Er=({albumData:t,t:c})=>t?o.jsxs(o.Fragment,{children:[t.folderName&&t.folderName!==c("Photos")&&t.folderName.trim()!==""&&o.jsx(ko,{id:"album-title",children:o.jsx(Ao,{children:t.folderName})}),t.folderDescription&&t.folderDescription.trim()!==""&&o.jsx(Lo,{id:"description-container",children:o.jsx(_o,{children:t.folderDescription})})]}):null,jr=({addPhotosToAlbum:t,saveAlbum:c,promptForPassword:i,showingEnterPassword:n,passwordPolicy:u,usingFolderInviteGrantsRightToAddItems:s,t:l})=>{const[a,r]=w.useState(!1),[e,f]=w.useState(!1),d=w.useRef(null),p=840;w.useEffect(()=>{f(window.innerWidth<p);const v=()=>{f(window.innerWidth<p)};return window.addEventListener("resize",v),()=>window.removeEventListener("resize",v)},[]);const h=()=>{r(!a)},g=()=>{r(!1)},m=v=>{v(),g()};return w.useEffect(()=>{const v=C=>{d.current&&!d.current.contains(C.target)&&r(!1)},x=()=>{r(!1)};return a&&(document.addEventListener("mousedown",v),window.addEventListener("scroll",x)),()=>{document.removeEventListener("mousedown",v),window.removeEventListener("scroll",x)}},[a]),e?o.jsxs("div",{ref:d,style:{position:"relative",display:"flex",alignItems:"center",justifyContent:"flex-end",width:"100%",flexWrap:"nowrap"},children:[!n&&o.jsxs("div",{style:{flexShrink:0},children:[o.jsxs(vt,{onClick:h,"aria-label":l("Menu"),"aria-expanded":a,children:[o.jsxs(bt,{children:[o.jsx(ne,{}),o.jsx(ne,{}),o.jsx(ne,{})]}),l("Save")]}),a&&o.jsxs(yt,{children:[s&&o.jsx(ve,{onClick:()=>m(t),children:l("Add Photos To Album")}),o.jsx(ve,{onClick:()=>m(c),children:l("Save To My Library")}),o.jsx(ve,{onClick:()=>m(c),children:l("Download To My Device")})]})]}),n&&u&&u!=="NoPassword"&&o.jsx("div",{style:{flexShrink:0},children:o.jsx(Ke,{onClick:i,children:l("Enter Password")})})]}):o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"20px",justifyContent:"flex-end",flexWrap:"nowrap"},children:[!n&&o.jsxs("div",{style:{display:"flex",gap:"20px",flexWrap:"nowrap"},children:[s&&o.jsx(Z,{onClick:t,children:l("Add Photos")}),o.jsx(Z,{onClick:c,children:l("Save To My Library")}),o.jsx(Z,{onClick:c,children:l("Download To My Device")})]}),n&&o.jsx("div",{children:o.jsx(Ke,{onClick:i,children:l("Enter Password")})})]})},kr=({t,isSelectionMode:c,selectedItems:i,shareSelectPhotos:n,cancelSelection:u,createSubalbum:s,showingEnterPassword:l,promptForPassword:a,passwordPolicy:r,isAuthorized:e,addPhotosToAlbum:f,saveAlbumDirectly:d,handleDownloadPhotos:p,handleCopyLink:h,handlePublicProfileToggle:g,isOnPublicProfile:m,albumData:v,columns:x,changeColumns:C})=>{const[b,S]=w.useState(!1),[A,E]=w.useState(!1),j=w.useRef(null),_=840;w.useEffect(()=>{E(window.innerWidth<_);const k=()=>{E(window.innerWidth<_)};return window.addEventListener("resize",k),()=>window.removeEventListener("resize",k)},[]);const P=()=>{S(!b)},M=()=>{S(!1)},B=k=>{k(),M()};w.useEffect(()=>{const k=J=>{j.current&&!j.current.contains(J.target)&&S(!1)},Q=()=>{S(!1)};return b&&(document.addEventListener("mousedown",k),window.addEventListener("scroll",Q)),()=>{document.removeEventListener("mousedown",k),window.removeEventListener("scroll",Q)}},[b]);const N=()=>[{label:t("Add Photos"),onClick:f},{label:t("Download"),onClick:p},{label:t("Copy Link"),onClick:h},{label:t(m?"On Public Profile":"Not On Public Profile"),onClick:g,style:{backgroundColor:m?"#4caf50":"#e0e0e0",color:m?"white":"inherit"}}],U=()=>o.jsxs("div",{style:{display:"flex",gap:"16px"},children:[o.jsxs(Z,{onClick:n,disabled:i.size===0,style:{opacity:i.size===0?.5:1,backgroundColor:i.size>0?"#006adc":void 0,color:i.size>0?"white":void 0},children:[t("Share Select Photos")," (",i.size,")"]}),o.jsx(Z,{onClick:u,children:t("Cancel")})]}),F=()=>!c&&!e&&r&&r!=="NoPassword"&&o.jsx(Z,{onClick:a,children:t("Enter Password")}),O=()=>o.jsxs(o.Fragment,{children:[o.jsxs(vt,{onClick:P,"aria-label":t("Menu"),"aria-expanded":b,children:[o.jsxs(bt,{children:[o.jsx(ne,{}),o.jsx(ne,{}),o.jsx(ne,{})]}),t("Actions")]}),b&&o.jsx(yt,{children:N().map((k,Q)=>o.jsx(ve,{onClick:()=>B(k.onClick),style:k.style,disabled:k.disabled,children:k.label},Q))})]}),D=()=>o.jsx("div",{style:{display:"flex",gap:"10px",flexWrap:"nowrap"},children:N().map((k,Q)=>o.jsx(Z,{onClick:k.onClick,style:k.style,disabled:k.disabled,children:k.label},Q))}),de=()=>c?U():o.jsxs("div",{style:{display:"flex",justifyContent:"space-between",width:"100%",flexWrap:"nowrap",alignItems:"center"},children:[o.jsx("div",{style:{flexShrink:0},children:!l()&&o.jsx(Eo,{onClick:s,children:t("Share Select Photos")})}),o.jsxs("div",{style:{marginLeft:"auto",display:"flex",alignItems:"center"},children:[F(),!c&&!(!e&&r&&r!=="NoPassword")&&(v!=null&&v.folderPositionId?o.jsx("div",{ref:j,style:{position:"relative",display:"flex",alignItems:"center",justifyContent:"flex-end",flexWrap:"nowrap"},children:A?O():D()}):o.jsx(jr,{addPhotosToAlbum:f,saveAlbum:d,downloadPhotos:p,promptForPassword:a,showingEnterPassword:l(),passwordPolicy:r,usingFolderInviteGrantsRightToAddItems:v==null?void 0:v.usingFolderInviteGrantsRightToAddItems,t}))]})]});return o.jsx(Po,{children:o.jsxs(Io,{children:[o.jsx(Go,{children:de()}),o.jsxs(jo,{children:[o.jsx(Wo,{htmlFor:"columns",id:"columns-label",children:o.jsx("strong",{children:t("Columns:")})}),o.jsx(Ho,{id:"columns",value:x,onChange:k=>C(k.target.value),children:[1,2,3,4,5].map(k=>o.jsx("option",{value:k.toString(),children:k},k))})]})]})})},Ar=()=>{const{t,language:c}=Pe(),i=Yt(),n=Zt(),u=eo(),s=to(),l=po(t),[a,r]=w.useState("1"),[e,f]=w.useState(null),[d,p]=w.useState(!0),[h,g]=w.useState(null),[m,v]=w.useState(null),[x,C]=w.useState(!1),[b,S]=w.useState(!1),[A,E]=w.useState(null),[j,_]=w.useState(!1),{passwordPolicy:P,setPasswordPolicy:M,isAuthorized:B,setIsAuthorized:N,showPasswordModal:U,setShowPasswordModal:F,passwordError:O,setPasswordError:D,passwordVerified:de,setPasswordVerified:k,shouldShowContent:Q,shouldShowWatermark:J,showingEnterPassword:ce,promptForPassword:ie}=s,{fileInputRef:Ie,selectedPhotos:se,setSelectedPhotos:qe,isUploading:jt,setIsUploading:ue,fileProcessingComplete:Qe,setFileProcessingComplete:Te,progressTracker:ae,log:K}=i,{fullscreenItem:te,openFullscreenView:Ge,closeFullscreenView:kt,goToPrevItem:At,goToNextItem:Rt}=n,{isSelectionMode:pe,setIsSelectionMode:Lt,selectedItems:fe,toggleItemSelection:_t,cancelSelection:Bt}=u,X=oo(e,m,A,t),Mt=async I=>{if(D(null),I.trim()===""){D(t("Password cannot be empty"));return}const T=e==null?void 0:e.actualPassword;if(!T)if(e!=null&&e.hasPassword){D(t("Unable to validate password. Please try again later."));return}else{N(!0),F(!1);return}if(I!==T){D(t("Invalid password. Please try again."));return}const R=await Y();if(!R){F(!1),k(!0),C(!0);return}if(N(!0),F(!1),D(null),!A)try{const $=JSON.parse(atob(R.split(".")[1]))["cognito:username"];E($)}catch(z){console.error("Failed to decode token",z)}const L=localStorage.getItem(ee.PUBLIC_USERNAME);if(L!=null&&L.startsWith("Profile-")){console.log("Public username starts with 'Profile-', showing username prompt"),L&&l.setUsernameInput(L),l.setShowUsernamePrompt(!0);return}ge(t,m,e)},Nt=I=>{r(I),localStorage.setItem("columns",I)},Ve=()=>{Ie.current&&Ie.current.click()},Ot=async()=>{const I=await Y();if(!I){_(!0),C(!0);return}if(!A)try{const R=JSON.parse(atob(I.split(".")[1]))["cognito:username"];E(R)}catch(T){console.error("Failed to decode token",T)}Te(!1),Ve()},Dt=async()=>{C(!1);const I=await Y();if(I)try{const R=JSON.parse(atob(I.split(".")[1]))["cognito:username"];E(R),de&&(N(!0),k(!1)),j&&(localStorage.setItem("selectPhotosButtonTimestamp",Date.now().toString()),_(!1));const L=localStorage.getItem(ee.PUBLIC_USERNAME);if(L!=null&&L.startsWith("Profile-")){console.log("Public username starts with 'Profile-', showing username prompt"),L&&l.setUsernameInput(L),l.setShowUsernamePrompt(!0);return}ge(t,m,e);return}catch(T){console.error("Failed to decode token",T)}},zt=async I=>{const T=Array.from(I.target.files||[]);if(!T.length)return;localStorage.removeItem("selectPhotosButtonTimestamp"),S(!1),ue(!0),Te(!1);const R=await wt();if(!R){K("❌ Authentication failed"),ue(!1),C(!0);return}try{const z=JSON.parse(atob(R.split(".")[1]))["cognito:username"];if(!z){K("❌ Missing Cognito Username"),ue(!1);return}E(z);const $=m||`${z}_____${io()}____Folder`;K(`📁 Using folder ID: ${$}`),qe(T.map(q=>({fileName:q.name,s3PreviewUrl:URL.createObjectURL(q),type:q.type,size:q.size,status:"pending",progress:0})));const G=so(qe),le=setInterval(()=>{Xe(se,i.setProgressTracker)},500),H=await ao(T,z,G,K);clearInterval(le),Xe(H,i.setProgressTracker),localStorage.setItem(ee.SELECTED_PHOTOS,JSON.stringify(H)),K(`📸 Saved ${H.length} photos metadata to storage`);const he=H.every(q=>q.status==="complete"),V=H.some(q=>q.status==="error");if(he&&!V)K(`✅ All ${H.length} files successfully uploaded`);else if(V){const q=H.filter(qt=>qt.status==="error").length;K(`⚠️ Upload completed with ${q} errors`)}setTimeout(()=>{Te(!0)},1e3)}catch(L){K(`❌ Fatal error in handleFileSelection: ${String(L)}`),ue(!1)}finally{I.target&&(I.target.value="")}},Ut=async()=>{if(console.log("Starting album registration"),P==="CannotBeSaved"&&!B){ie();return}const I=await Y();if(!I){console.log("User not logged in, showing OTP login"),C(!0);return}if(!A)try{const L=JSON.parse(atob(I.split(".")[1]))["cognito:username"];E(L)}catch(R){console.error("Failed to decode token",R)}const T=localStorage.getItem(ee.PUBLIC_USERNAME);if(T!=null&&T.startsWith("Profile-")){console.log("Public username starts with 'Profile-', showing username prompt"),T&&l.setUsernameInput(T),l.setShowUsernamePrompt(!0);return}ge(t,m,e)},Ft=async()=>{if((P==="NotVisible"||P==="CannotBeSaved")&&!B){ie();return}Lt(!pe),fe.clear()},$t=async()=>{Co(t,e,fe)},Wt=async()=>{if(P==="CannotBeSaved"&&!B){ie();return}if(!await Y()&&(m||P==="CannotBeSaved")){C(!0);return}e&&uo(e,t,Ge)};w.useEffect(()=>{const I=localStorage.getItem("columns")||"1";r(I)},[]);const Ht=()=>{const T=new URLSearchParams(window.location.search).get("id");if(T)return T;const R=window.location.pathname.split("/"),L=R[R.length-1];return L&&L.includes("_")?L:null};return w.useEffect(()=>{(async()=>{const T=Ht();if(!T){const H=new URL(window.location.href).search.substring(1).split("-"),he=H[H.length-1];if(he){const V=await wo(he,v);if(V){f(V),V.passwordPolicy&&(M(V.passwordPolicy),(V.passwordPolicy==="NoPassword"||V.folderPositionId)&&N(!0)),p(!1);return}}g(t("Valid ID not obtained from query parameter.")),p(!1);return}const R=T.split("-"),z=R[R.length-1].replace(/-/g,"").split("_");let $=z[z.length-1].replace(/-/g,"");$.length===32?($=no($),console.log($)):console.error("Invalid UUID format: must be 32 characters after removing dashes");const G=await yo($,v);G&&(f(G),G.passwordPolicy&&(M(G.passwordPolicy),(G.passwordPolicy==="NoPassword"||G.folderPositionId)&&N(!0))),p(!1)})()},[]),w.useEffect(()=>{(async()=>{const T=await Y();if(T)try{const L=JSON.parse(atob(T.split(".")[1]))["cognito:username"];E(L);const z=localStorage.getItem("selectPhotosButtonTimestamp");if(z){const $=parseInt(z,10),le=(Date.now()-$)/(1e3*60);S(le<10),le>=10&&localStorage.removeItem("selectPhotosButtonTimestamp")}else S(!1)}catch(R){console.error("Failed to decode token",R)}})()},[]),w.useEffect(()=>{if(Qe&&se.length>0){const I=se.filter(R=>R.status==="complete").length,T=se.filter(R=>R.status==="error").length;console.log(`Upload complete: ${I} successful, ${T} failed`),m?window.location.href=`/save-album.html?folderId=${encodeURIComponent(m)}`:window.location.href="/save-album.html"}},[Qe,se.length,m]),w.useEffect(()=>{e!=null&&e.folderName?document.title=e.folderName:document.title=t("Photos")},[e,c]),o.jsxs(So,{children:[o.jsx(Kt,{}),o.jsx(kr,{t,isSelectionMode:pe,selectedItems:fe,shareSelectPhotos:$t,cancelSelection:Bt,createSubalbum:Ft,showingEnterPassword:ce,promptForPassword:ie,passwordPolicy:P,isAuthorized:B,addPhotosToAlbum:Ot,saveAlbumDirectly:Ut,handleDownloadPhotos:Wt,handleCopyLink:()=>X.setShowingCopyLinkAlert(!0),handlePublicProfileToggle:X.handlePublicProfileToggle,isOnPublicProfile:X.isOnPublicProfile,albumData:e,columns:a,changeColumns:Nt}),o.jsxs(Ro,{id:"media-container",children:[o.jsx(nr,{showSelectPhotosButton:b,albumData:e,openFilePicker:Ve,t}),o.jsx(Sr,{albumData:e,t}),jt&&o.jsxs("div",{style:{width:"100%",marginBottom:"20px"},children:[o.jsx(ho,{progressTracker:ae,t,isRTL:je(c)==="rtl",style:{marginTop:"20px"}}),ae.filesComplete>0&&ae.filesComplete===ae.totalFiles&&o.jsx("div",{style:{backgroundColor:"#e8f5e9",color:"#2e7d32",padding:"10px 16px",borderRadius:"6px",fontSize:"14px",marginTop:"10px",textAlign:"center"},children:t("Upload complete! Preparing to save your album...")}),ae.filesWithError>0&&o.jsx("div",{style:{backgroundColor:"#ffebee",color:"#c62828",padding:"10px 16px",borderRadius:"6px",fontSize:"14px",marginTop:"10px",textAlign:"center"},children:t("Some files could not be uploaded. You can continue with the successfully uploaded files.")})]}),o.jsx(ir,{isAuthorized:B,passwordPolicy:P,passwordError:O,promptForPassword:ie,t}),o.jsx(sr,{isSelectionMode:pe,t}),o.jsx(Er,{albumData:e,t}),o.jsx(Tr,{isLoading:d,error:h,albumData:e,columns:a,shouldShowContent:Q,shouldShowWatermark:J,isSelectionMode:pe,selectedItems:fe,toggleItemSelection:_t,openFullscreenView:Ge,t})]}),o.jsx(wr,{isOpen:U,onClose:()=>{F(!1),D(null)},onSubmit:Mt,error:O,t}),o.jsx(Cr,{isOpen:x,onClose:()=>{C(!1)},onLoginSuccess:Dt,t}),o.jsx(go,{onFileSelection:zt,ref:Ie}),te!==null&&e&&o.jsx(ur,{item:e.mediaItems[te],index:te,onClose:kt,onPrev:At,onNext:()=>Rt(e.mediaItems.length),hasNext:te<e.mediaItems.length-1,hasPrev:te>0,showWatermark:J(),ownerName:(()=>{const I=e.mediaItems[te].ownerContactId;if(!I)return"";if(e.contacts&&e.contacts[I])return e.contacts[I];const T=I.split("_____")[0]||"";return T===A?t("Me"):T})()}),o.jsx(fo,{t,language:c,usernameManager:l,onSuccess:I=>{ge(t,m,e)}}),o.jsx(lo,{isOpen:X.showingCopyLinkAlert,onClose:()=>X.setShowingCopyLinkAlert(!1),inviteLink:ro(m,e==null?void 0:e.albumNanoId,e==null?void 0:e.folderName),onCopy:X.handleCopy,t,isRTL:je(c)==="rtl"}),o.jsx(co,{isOpen:X.showingCopiedLinkAlert,onClose:()=>X.setShowingCopiedLinkAlert(!1),t,isRTL:je(c)==="rtl"})]})},Rr=()=>o.jsx(Jt,{children:o.jsx(Ar,{})});Vt.createRoot(document.getElementById("root")).render(o.jsx(Rr,{}));
