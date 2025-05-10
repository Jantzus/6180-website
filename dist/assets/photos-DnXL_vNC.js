import{a9 as Wt,aa as Ht,k as De,a8 as qe,l as ft,i as b,ab as $,j as o,r as w,u as me,ac as ht,h as qt,C as be,ad as Gt,R as Qt,I as Vt,G as Kt,g as we}from"./styled-components-D8Vx4Z_D.js";import{c as J,j as Jt,b as gt,k as X,l as Yt,n as Xt,o as Zt,q as eo,r as to,t as oo,v as ro,g as no,f as io,u as Ge,p as so}from"./utils-DnHu70rO.js";import{U as ao,F as lo,d as co}from"./FileInput-SyyMfYS9.js";import{u as uo,U as po}from"./customHooks-id-dp1TW.js";import{C as fo,S as ho,I as go,R as mo}from"./SignUpCommand-C2Nrv3ko.js";import{C as xo,a as vo}from"./Modals-I2ROaRI0.js";import"./parseJsonBody-Dv62rqZ0.js";const Qe=`
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
`,Ve=(t,l)=>{var h,g,m,y,v;const i=((g=(h=t==null?void 0:t.data)==null?void 0:h.fetchRelations)==null?void 0:g.items)||[],n=[],u={};let a="Photos",d="",s,r=!1,e=!1,c,p=!1;const f=new Set;if(i.length>0){const x=i[0];l&&(x!=null&&x.id)&&l(x.id),x!=null&&x.folderName&&x.folderName.length>0&&(a=x.folderName),x!=null&&x.folderDescription&&x.folderDescription.length>0&&(d=x.folderDescription),x!=null&&x.folderPassword&&(x.folderPassword.policy&&(s=x.folderPassword.policy,r=s!=="NoPassword"),x.folderPassword.password&&s!=="NoPassword"&&(e=!0,c=x.folderPassword.password)),x!=null&&x.folderInviteParameters&&(p=!!x.folderInviteParameters.usingFolderInviteGrantsRightToAddItems),(((y=(m=i[0])==null?void 0:m.contactsUsingInvite)==null?void 0:y.items)||[]).forEach(C=>{var I;C!=null&&C.id&&((I=C==null?void 0:C.item)!=null&&I.publicDisplayName)&&(u[C.id]=C.item.publicDisplayName)}),(((v=x==null?void 0:x.fileReferencesPage)==null?void 0:v.items)||[]).forEach(C=>{const I=C==null?void 0:C.file;if(!(I!=null&&I.dataKey))return;const{id:_,dataKey:P,thumbnailDataKey:j,durationInSeconds:L,ownerContactId:A}=I;if(f.has(P))return;f.add(P);const B=`${qe}${P}`,E=j?`${qe}${j}`:void 0;P.startsWith("Input/Image/")?n.push({type:"image",fileId:_,url:B,thumbnailUrl:E||B,ownerContactId:A,loaded:!1}):P.startsWith("Input/Video/")&&n.push({type:"video",fileId:_,url:B,thumbnailUrl:E||B,duration:Jt(L),ownerContactId:A,loaded:!1})})}return{mediaItems:n,folderName:a,folderDescription:d,contacts:u,passwordPolicy:s,passwordRequired:r,hasPassword:e,actualPassword:c,usingFolderInviteGrantsRightToAddItems:p}},yo=async(t,l)=>{var i,n,u,a;try{const s={fetchRelationsInput:{targetItemIdentifier____RelationType:`${t}____Folder`,index:"targetItemIdentifier____RelationType",limit:1,scanIndexForward:!1,nextToken:null}},r=fetch(Wt,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":Ht},body:JSON.stringify({query:Qe,variables:s})}).then(h=>h.json()),e=(async()=>{const h=await J();return h?fetch(De,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${h}`},body:JSON.stringify({query:Qe,variables:s})}).then(g=>g.json()):null})(),c=await r;let p=Ve(c,l);const f=await e;if(f){const h=(a=(u=(n=(i=f==null?void 0:f.data)==null?void 0:i.fetchRelations)==null?void 0:n.items)==null?void 0:u[0])==null?void 0:a.folderPosition;if(h){const g=Ve(f,l);g.folderPositionId=h==null?void 0:h.id,g.profileIds=h==null?void 0:h.profileIds,p=g}}return p}catch(d){return console.error("Error fetching folder data:",d),null}},ce=async(t,l,i)=>{console.log("Starting album registration");const n=document.createElement("div");n.style.position="fixed",n.style.top="0",n.style.left="0",n.style.width="100%",n.style.height="100%",n.style.backgroundColor="rgba(0, 0, 0, 0.5)",n.style.display="flex",n.style.justifyContent="center",n.style.alignItems="center",n.style.zIndex="2000";const u=document.createElement("div");u.style.backgroundColor="white",u.style.padding="30px",u.style.borderRadius="8px",u.style.textAlign="center";const a=document.createElement("p");a.id="saveProgressText",a.textContent=t("Registering album...");const d=document.createElement("div");d.style.backgroundColor="#f0f0f0",d.style.borderRadius="4px",d.style.overflow="hidden",d.style.height="8px",d.style.marginTop="10px";const s=document.createElement("div");s.id="saveProgress",s.style.backgroundColor="#4caf50",s.style.height="100%",s.style.width="5%",s.style.transition="width 0.3s ease";const r=document.createElement("p");r.id="saveErrorText",r.style.color="#f44336",r.style.display="none",r.style.marginTop="10px",r.style.fontSize="14px",d.appendChild(s),u.appendChild(a),u.appendChild(d),u.appendChild(r),n.appendChild(u),document.body.appendChild(n);try{const e=await gt();if(!e){console.error("No token available for registering album"),document.body.removeChild(n);return}if(!JSON.parse(atob(e.split(".")[1]))["cognito:username"]){console.error("Missing username in token"),X(r,"Could not retrieve username from token",a,s);return}if(!l){console.error("No folder ID available"),X(r,"Folder ID is missing",a,s);return}if(!i||!i.mediaItems){console.error("No album data available"),X(r,"Album data is missing or incomplete",a,s);return}if(i.mediaItems.length===0){console.error("No media items to save"),X(r,"No media items in album to save",a,s);return}const f=Math.floor(Date.now()/1e3);ue(30,a,s,t("Preparing album data..."));const h={currentTime:f,folderId:l,profileIds:["Only Me_____Only Me____Profile"],folderPositionSelectedTagInputs:[],folderPositionPoints:1};console.log("Folder position input:",h),ue(50,a,s,t("Saving album..."));const g=`
      mutation SaveAlbum(
        $folderPositionInputs: [FolderPositionInput!]
      ) {
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items { id }
        }
      }
    `,m={folderPositionInputs:[h]};console.log("GraphQL mutation variables:",JSON.stringify(m));try{const y=await fetch(De,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({query:g,variables:m})});if(ue(80,a,s,t("Almost there...")),!y.ok)throw new Error(`HTTP error: ${y.status} ${y.statusText}`);const v=await y.text();let x;try{x=JSON.parse(v),console.log("API response:",x)}catch(C){const I=C instanceof Error?C.message:"Unknown JSON parse error";throw new Error(`Invalid JSON response: ${I}`)}if(x.errors&&x.errors.length>0){const C=x.errors.map(I=>(console.error("GraphQL error:",I),I.message||"Unknown GraphQL error")).join("; ");throw new Error(`GraphQL errors: ${C}`)}console.log("Album registered successfully"),ue(100,a,s,t("Album registered successfully!")),sessionStorage.setItem("album_just_saved","true"),setTimeout(()=>{document.body.removeChild(n),window.location.href="/my-albums.html"},2e3)}catch(y){const v=y instanceof Error?y.message:"Unknown API error";console.error("Error in API request:",y),X(r,v,a,s)}}catch(e){const c=e instanceof Error?e.message:"Unknown error";console.error("Error registering album:",e),X(r,c,a,s)}},bo=async(t,l,i)=>{if(i.size===0){alert(t("Please select at least one item to share."));return}if(l)try{const n=document.createElement("div");n.style.position="fixed",n.style.top="0",n.style.left="0",n.style.width="100%",n.style.height="100%",n.style.backgroundColor="rgba(0, 0, 0, 0.5)",n.style.display="flex",n.style.justifyContent="center",n.style.alignItems="center",n.style.zIndex="2000";const u=document.createElement("div");u.style.backgroundColor="white",u.style.padding="30px",u.style.borderRadius="8px",u.style.textAlign="center";const a=document.createElement("p");a.textContent=t("Creating sub-album..."),u.appendChild(a),n.appendChild(u),document.body.appendChild(n);const d=[],s=[];Array.from(i).forEach(e=>{var p;const c=l.mediaItems[e];if(c&&c.fileId){d.push(c.fileId);const f={fileName:((p=c.fileId.split("_____")[1])==null?void 0:p.split("____")[0])||`file-${e}`,s3PreviewUrl:c.type==="video"&&c.thumbnailUrl||c.url,type:c.type==="video"?"video":"image",size:0,status:"complete",progress:100,fileId:c.fileId,duration:c.type==="video"&&c.duration?parseFloat(c.duration.split(":").reduce((h,g)=>60*h+parseFloat(g),0).toString()):null};s.push(f)}});const r={isSubAlbum:!0,selectedFileIds:d,selectedPhotos:s};localStorage.setItem(ft.SUB_ALBUM_DATA,JSON.stringify(r)),document.body.removeChild(n),window.location.href="/save-album.html"}catch(n){console.error("Error creating sub-album:",n),alert(t("There was an error creating the sub-album. Please try again."))}},ue=(t,l,i,n)=>{i.style.width=`${t}%`,n&&(l.textContent=n)},wo=b.div`
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
`,Co=b.div`
  position: sticky;
  top: 0;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0,0,0,0.06);
  z-index: 10;
  margin-bottom: 10px;
  width: 100%;
`,Po=b.div`
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  
  @media (max-width: 767px) {
    padding: 16px 16px;
  }
`,So=b.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 5px;
  gap: 10px;
  flex-wrap: wrap;
`,Io=b.button`
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
`,To=b.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`,G=b.button`
  background: transparent;
  color: #006adc;
  border: 1px solid #006adc;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
`,mt=b.button`
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
`,xt=b.span`
  width: 18px;
  height: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`,ee=b.span`
  height: 2px;
  background: #006adc;
  width: 100%;
`,vt=b.div`
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
`,fe=b.button`
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
`,ko=b.h2`
  font-weight: 400;
  margin: 0 0 16px 0;
  font-size: 24px;
  padding: 0;
  
  @media (max-width: 767px) {
    padding: 0;
  }
`,jo=b.strong`
  font-weight: 700;
`,Eo=b.div`
  padding: 0 24px 20px;
  width: 100%;
  overflow: visible; // Allow content to flow naturally
  
  @media (max-width: 767px) {
    padding: 0 16px 15px;
    width: 100%;
  }
`,Ro=b.div`
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  width: 100%;
`,Lo=b.p`
  color: #333;
  margin: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  max-width: 100%;
`,Ao=b.div`
  display: grid;
  grid-gap: 20px;
  width: 100%;
  min-height: 0; // Allow proper sizing
  
  ${t=>{switch(t.columns){case"1":return $`grid-template-columns: repeat(1, 1fr);`;case"2":return $`grid-template-columns: repeat(2, 1fr);`;case"3":return $`grid-template-columns: repeat(3, 1fr);`;case"4":return $`grid-template-columns: repeat(4, 1fr);`;case"5":return $`grid-template-columns: repeat(5, 1fr);`;default:return $`grid-template-columns: repeat(1, 1fr);`}}}
  
  @media (max-width: 767px) {
    grid-gap: 8px;
    ${t=>{const l=parseInt(t.columns);return l>3?$`grid-template-columns: repeat(3, minmax(0, 1fr));`:l>1?$`grid-template-columns: repeat(${l}, minmax(0, 1fr));`:$`grid-template-columns: repeat(1, minmax(0, 1fr));`}}
  }
`,_o=b.div`
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
`,Bo=b.div`
  position: relative;
  overflow: hidden;
  background-color: #f0f0f0;
  width: 100%;
  padding-bottom: 75%; // Create a consistent aspect ratio (4:3)
  height: 0; // Use padding-bottom for aspect ratio
  
  @media (max-width: 767px) {
    padding-bottom: 100%; // Square aspect ratio on mobile
  }
`,Ke=b.div`
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
`,Mo=b.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  transition: opacity 0.3s;
  opacity: ${t=>t.isLoaded?1:0};
`,Oo=b.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading-animation 1.5s infinite;
  z-index: 0;
`,No=b.div`
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
`,Do=b.div`
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
`,zo=b.div`
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
`,Ce=b.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #d32f2f;
  grid-column: 1 / -1;
  width: 100%;
`,Uo=b.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
  grid-column: 1 / -1;
  width: 100%;
`,Fo=b.label`
  margin-right: 8px;
  font-size: 14px;
  color: #555;
  font-weight: normal;
`,$o=b.select`
  padding: 5px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  font-size: 14px;
  min-width: 50px;
`,Wo=b.div`
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
`,Ho=b.div`
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
`;b.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;b.div`
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
`;b.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
  
  @media (max-width: 767px) {
    font-size: 18px;
  }
`;b.ol`
  list-style-type: decimal;
  padding-left: 20px;
`;b.li`
  margin-bottom: 12px;
  font-size: 16px;
  
  @media (max-width: 767px) {
    font-size: 14px;
  }
`;b.button`
  margin-top: 16px;
  padding: 8px 16px;
  background-color: #006adc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;const yt=b.div`
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
`;b.p`
  font-style: italic;
  margin-top: 12px;
  margin-bottom: 12px;
  text-align: center;
  
  @media (max-width: 767px) {
    font-size: 14px;
  }
`;const qo=b(So)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  
  > div {
    width: auto;
    display: flex;
    align-items: center;
  }
`;b(_o)`
  ${t=>t.isSelected&&`
    border: 3px solid #006adc;
    box-shadow: 0 0 0 3px rgba(0, 106, 220, 0.3);
  `}
`;const Go=b.div`
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
`,Qo=b.div`
  padding: 10px 20px;
  background-color: #f0f7ff;
  border-radius: 4px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`,Vo=b.div`
  color: white;
  font-size: 14px;
  font-weight: bold;
`,he=b.div`
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
`,ge=b.div`
  color: white;
  font-size: 24px;
  font-weight: bold;
  transform: rotate(-30deg);
  opacity: 0.7;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
  user-select: none;
  white-space: nowrap;
`,Je=b(G)`
  background-color: #4caf50;
  color: white;
  &:hover {
    background-color: #45a049;
  }
`,Ko=b.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 2000;
  display: flex;
  flex-direction: column;
`,Oe=b.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 16px;
  padding: 5px 10px;
  cursor: ${t=>t.isDisabled?"not-allowed":"pointer"};
  opacity: ${t=>t.isDisabled?.5:1};
`,Jo=b(Oe)``,Yo=b.div`
  display: flex;
  gap: 10px;
`,Xo=b.a`
  text-decoration: none;
  color: white;
  background-color: #006adc;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
`,Zo=b.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  opacity: ${t=>t.isLoaded?1:0};
  transition: opacity 0.3s;
`,er=b.img`
  position: absolute;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  opacity: 0.5;
`,tr=b.video`
  max-width: 100%;
  max-height: 100%;
`,or=b.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  z-index: 10;
`,Ye=b.div`
  position: relative;
`,rr=({showSelectPhotosButton:t,albumData:l,openFilePicker:i,t:n})=>!t||!(l!=null&&l.usingFolderInviteGrantsRightToAddItems)?null:o.jsx("div",{style:{width:"100%",display:"flex",justifyContent:"center",marginBottom:"20px",marginTop:"10px"},children:o.jsx("button",{onClick:i,style:{backgroundColor:"#007bff",color:"white",border:"none",borderRadius:"6px",padding:"12px 20px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"8px",fontSize:"16px",boxShadow:"0 2px 4px rgba(0,0,0,0.1)"},children:o.jsx("span",{children:n("Select Photos To Add To Album")})})}),nr=({isAuthorized:t,passwordPolicy:l,passwordError:i,promptForPassword:n,t:u})=>t||l!=="NotVisible"?null:o.jsxs("div",{style:{padding:"20px",backgroundColor:"#f3f4f6",borderRadius:"8px",textAlign:"center",marginBottom:"20px"},children:[o.jsx("h3",{children:u("This album is password protected")}),o.jsx("p",{children:u("Please enter the password to view the contents")}),i&&o.jsx("div",{style:{color:"#d32f2f",fontSize:"14px",margin:"10px 0",padding:"5px",backgroundColor:"rgba(211, 47, 47, 0.1)",borderRadius:"4px"},children:i}),o.jsx("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"10px"},children:o.jsx(G,{onClick:n,children:u("Enter Password")})})]}),ir=({isSelectionMode:t,t:l})=>t?o.jsx(Qo,{children:o.jsx("p",{children:l("Select photos and videos to create a sub-album to share")})}):null,sr=b.div`
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
`,ar=b.div`
  padding: 15px;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
`,lr=b.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  padding: 10px;
  position: relative;
`,dr=({item:t,index:l,onClose:i,onPrev:n,onNext:u,hasNext:a,hasPrev:d,ownerName:s,showWatermark:r=!1})=>{const[e,c]=w.useState(!1),[p,f]=w.useState(!0),{t:h}=me();w.useEffect(()=>{const m=y=>{y.key==="Escape"?i():y.key==="ArrowLeft"&&d?n():y.key==="ArrowRight"&&a&&u()};return window.addEventListener("keydown",m),()=>window.removeEventListener("keydown",m)},[i,u,n,a,d]);const g=m=>(m==null?void 0:m.split("_____")[0])||"";return o.jsxs(Ko,{children:[o.jsxs(sr,{children:[o.jsx(Jo,{onClick:i,children:h("Back")}),o.jsxs(Yo,{children:[o.jsx(Oe,{onClick:d?n:void 0,disabled:!d,isDisabled:!d,children:"←"}),o.jsx(Oe,{onClick:a?u:void 0,disabled:!a,isDisabled:!a,children:"→"})]})]}),o.jsxs(lr,{children:[t.type==="image"?o.jsxs(Ye,{children:[o.jsx(Zo,{src:t.url,alt:`Image ${l+1}`,isLoaded:e,onLoad:()=>{c(!0),f(!1)}}),r&&o.jsx(he,{children:o.jsx(ge,{children:"6180 Watermarked"})}),!e&&t.thumbnailUrl&&o.jsx(er,{src:t.thumbnailUrl,alt:`Thumbnail ${l+1}`})]}):o.jsxs(Ye,{children:[o.jsxs(tr,{controls:!0,autoPlay:!0,onLoadedData:()=>f(!1),children:[o.jsx("source",{src:t.url,type:"video/mp4"}),h("Your browser does not support the video tag.")]}),r&&o.jsx(he,{children:o.jsx(ge,{children:"6180 Watermarked"})})]}),p&&o.jsx(or,{children:t.type==="image"?h("Loading full resolution..."):h("Loading video...")})]}),o.jsx(ar,{children:t.ownerContactId&&o.jsxs(Xo,{href:`/profile.html?id=${g(t.ownerContactId)}`,children:[o.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[o.jsx("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),o.jsx("circle",{cx:"12",cy:"7",r:"4"})]}),s]})})]})};var Z={},Pe={exports:{}},Se,Xe;function cr(){if(Xe)return Se;Xe=1;var t="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return Se=t,Se}var Ie,Ze;function ur(){if(Ze)return Ie;Ze=1;var t=cr();function l(){}function i(){}return i.resetWarningCache=l,Ie=function(){function n(d,s,r,e,c,p){if(p!==t){var f=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw f.name="Invariant Violation",f}}n.isRequired=n;function u(){return n}var a={array:n,bigint:n,bool:n,func:n,number:n,object:n,string:n,symbol:n,any:n,arrayOf:u,element:n,elementType:n,instanceOf:u,node:n,objectOf:u,oneOf:u,oneOfType:u,shape:u,exact:u,checkPropTypes:i,resetWarningCache:l};return a.PropTypes=a,a},Ie}var et;function bt(){return et||(et=1,Pe.exports=ur()()),Pe.exports}var Te,tt;function wt(){return tt||(tt=1,Te={L:1,M:0,Q:3,H:2}),Te}var ke,ot;function Ct(){return ot||(ot=1,ke={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8}),ke}var je,rt;function pr(){if(rt)return je;rt=1;var t=Ct();function l(i){this.mode=t.MODE_8BIT_BYTE,this.data=i}return l.prototype={getLength:function(i){return this.data.length},write:function(i){for(var n=0;n<this.data.length;n++)i.put(this.data.charCodeAt(n),8)}},je=l,je}var Ee,nt;function fr(){if(nt)return Ee;nt=1;var t=wt();function l(i,n){this.totalCount=i,this.dataCount=n}return l.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],l.getRSBlocks=function(i,n){var u=l.getRsBlockTable(i,n);if(u==null)throw new Error("bad rs block @ typeNumber:"+i+"/errorCorrectLevel:"+n);for(var a=u.length/3,d=new Array,s=0;s<a;s++)for(var r=u[s*3+0],e=u[s*3+1],c=u[s*3+2],p=0;p<r;p++)d.push(new l(e,c));return d},l.getRsBlockTable=function(i,n){switch(n){case t.L:return l.RS_BLOCK_TABLE[(i-1)*4+0];case t.M:return l.RS_BLOCK_TABLE[(i-1)*4+1];case t.Q:return l.RS_BLOCK_TABLE[(i-1)*4+2];case t.H:return l.RS_BLOCK_TABLE[(i-1)*4+3];default:return}},Ee=l,Ee}var Re,it;function hr(){if(it)return Re;it=1;function t(){this.buffer=new Array,this.length=0}return t.prototype={get:function(l){var i=Math.floor(l/8);return(this.buffer[i]>>>7-l%8&1)==1},put:function(l,i){for(var n=0;n<i;n++)this.putBit((l>>>i-n-1&1)==1)},getLengthInBits:function(){return this.length},putBit:function(l){var i=Math.floor(this.length/8);this.buffer.length<=i&&this.buffer.push(0),l&&(this.buffer[i]|=128>>>this.length%8),this.length++}},Re=t,Re}var Le,st;function Pt(){if(st)return Le;st=1;for(var t={glog:function(i){if(i<1)throw new Error("glog("+i+")");return t.LOG_TABLE[i]},gexp:function(i){for(;i<0;)i+=255;for(;i>=256;)i-=255;return t.EXP_TABLE[i]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},l=0;l<8;l++)t.EXP_TABLE[l]=1<<l;for(var l=8;l<256;l++)t.EXP_TABLE[l]=t.EXP_TABLE[l-4]^t.EXP_TABLE[l-5]^t.EXP_TABLE[l-6]^t.EXP_TABLE[l-8];for(var l=0;l<255;l++)t.LOG_TABLE[t.EXP_TABLE[l]]=l;return Le=t,Le}var Ae,at;function St(){if(at)return Ae;at=1;var t=Pt();function l(i,n){if(i.length==null)throw new Error(i.length+"/"+n);for(var u=0;u<i.length&&i[u]==0;)u++;this.num=new Array(i.length-u+n);for(var a=0;a<i.length-u;a++)this.num[a]=i[a+u]}return l.prototype={get:function(i){return this.num[i]},getLength:function(){return this.num.length},multiply:function(i){for(var n=new Array(this.getLength()+i.getLength()-1),u=0;u<this.getLength();u++)for(var a=0;a<i.getLength();a++)n[u+a]^=t.gexp(t.glog(this.get(u))+t.glog(i.get(a)));return new l(n,0)},mod:function(i){if(this.getLength()-i.getLength()<0)return this;for(var n=t.glog(this.get(0))-t.glog(i.get(0)),u=new Array(this.getLength()),a=0;a<this.getLength();a++)u[a]=this.get(a);for(var a=0;a<i.getLength();a++)u[a]^=t.gexp(t.glog(i.get(a))+n);return new l(u,0).mod(i)}},Ae=l,Ae}var _e,lt;function gr(){if(lt)return _e;lt=1;var t=Ct(),l=St(),i=Pt(),n={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},u={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(a){for(var d=a<<10;u.getBCHDigit(d)-u.getBCHDigit(u.G15)>=0;)d^=u.G15<<u.getBCHDigit(d)-u.getBCHDigit(u.G15);return(a<<10|d)^u.G15_MASK},getBCHTypeNumber:function(a){for(var d=a<<12;u.getBCHDigit(d)-u.getBCHDigit(u.G18)>=0;)d^=u.G18<<u.getBCHDigit(d)-u.getBCHDigit(u.G18);return a<<12|d},getBCHDigit:function(a){for(var d=0;a!=0;)d++,a>>>=1;return d},getPatternPosition:function(a){return u.PATTERN_POSITION_TABLE[a-1]},getMask:function(a,d,s){switch(a){case n.PATTERN000:return(d+s)%2==0;case n.PATTERN001:return d%2==0;case n.PATTERN010:return s%3==0;case n.PATTERN011:return(d+s)%3==0;case n.PATTERN100:return(Math.floor(d/2)+Math.floor(s/3))%2==0;case n.PATTERN101:return d*s%2+d*s%3==0;case n.PATTERN110:return(d*s%2+d*s%3)%2==0;case n.PATTERN111:return(d*s%3+(d+s)%2)%2==0;default:throw new Error("bad maskPattern:"+a)}},getErrorCorrectPolynomial:function(a){for(var d=new l([1],0),s=0;s<a;s++)d=d.multiply(new l([1,i.gexp(s)],0));return d},getLengthInBits:function(a,d){if(1<=d&&d<10)switch(a){case t.MODE_NUMBER:return 10;case t.MODE_ALPHA_NUM:return 9;case t.MODE_8BIT_BYTE:return 8;case t.MODE_KANJI:return 8;default:throw new Error("mode:"+a)}else if(d<27)switch(a){case t.MODE_NUMBER:return 12;case t.MODE_ALPHA_NUM:return 11;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 10;default:throw new Error("mode:"+a)}else if(d<41)switch(a){case t.MODE_NUMBER:return 14;case t.MODE_ALPHA_NUM:return 13;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 12;default:throw new Error("mode:"+a)}else throw new Error("type:"+d)},getLostPoint:function(a){for(var d=a.getModuleCount(),s=0,r=0;r<d;r++)for(var e=0;e<d;e++){for(var c=0,p=a.isDark(r,e),f=-1;f<=1;f++)if(!(r+f<0||d<=r+f))for(var h=-1;h<=1;h++)e+h<0||d<=e+h||f==0&&h==0||p==a.isDark(r+f,e+h)&&c++;c>5&&(s+=3+c-5)}for(var r=0;r<d-1;r++)for(var e=0;e<d-1;e++){var g=0;a.isDark(r,e)&&g++,a.isDark(r+1,e)&&g++,a.isDark(r,e+1)&&g++,a.isDark(r+1,e+1)&&g++,(g==0||g==4)&&(s+=3)}for(var r=0;r<d;r++)for(var e=0;e<d-6;e++)a.isDark(r,e)&&!a.isDark(r,e+1)&&a.isDark(r,e+2)&&a.isDark(r,e+3)&&a.isDark(r,e+4)&&!a.isDark(r,e+5)&&a.isDark(r,e+6)&&(s+=40);for(var e=0;e<d;e++)for(var r=0;r<d-6;r++)a.isDark(r,e)&&!a.isDark(r+1,e)&&a.isDark(r+2,e)&&a.isDark(r+3,e)&&a.isDark(r+4,e)&&!a.isDark(r+5,e)&&a.isDark(r+6,e)&&(s+=40);for(var m=0,e=0;e<d;e++)for(var r=0;r<d;r++)a.isDark(r,e)&&m++;var y=Math.abs(100*m/d/d-50)/5;return s+=y*10,s}};return _e=u,_e}var Be,dt;function mr(){if(dt)return Be;dt=1;var t=pr(),l=fr(),i=hr(),n=gr(),u=St();function a(s,r){this.typeNumber=s,this.errorCorrectLevel=r,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}var d=a.prototype;return d.addData=function(s){var r=new t(s);this.dataList.push(r),this.dataCache=null},d.isDark=function(s,r){if(s<0||this.moduleCount<=s||r<0||this.moduleCount<=r)throw new Error(s+","+r);return this.modules[s][r]},d.getModuleCount=function(){return this.moduleCount},d.make=function(){if(this.typeNumber<1){var s=1;for(s=1;s<40;s++){for(var r=l.getRSBlocks(s,this.errorCorrectLevel),e=new i,c=0,p=0;p<r.length;p++)c+=r[p].dataCount;for(var p=0;p<this.dataList.length;p++){var f=this.dataList[p];e.put(f.mode,4),e.put(f.getLength(),n.getLengthInBits(f.mode,s)),f.write(e)}if(e.getLengthInBits()<=c*8)break}this.typeNumber=s}this.makeImpl(!1,this.getBestMaskPattern())},d.makeImpl=function(s,r){this.moduleCount=this.typeNumber*4+17,this.modules=new Array(this.moduleCount);for(var e=0;e<this.moduleCount;e++){this.modules[e]=new Array(this.moduleCount);for(var c=0;c<this.moduleCount;c++)this.modules[e][c]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(s,r),this.typeNumber>=7&&this.setupTypeNumber(s),this.dataCache==null&&(this.dataCache=a.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,r)},d.setupPositionProbePattern=function(s,r){for(var e=-1;e<=7;e++)if(!(s+e<=-1||this.moduleCount<=s+e))for(var c=-1;c<=7;c++)r+c<=-1||this.moduleCount<=r+c||(0<=e&&e<=6&&(c==0||c==6)||0<=c&&c<=6&&(e==0||e==6)||2<=e&&e<=4&&2<=c&&c<=4?this.modules[s+e][r+c]=!0:this.modules[s+e][r+c]=!1)},d.getBestMaskPattern=function(){for(var s=0,r=0,e=0;e<8;e++){this.makeImpl(!0,e);var c=n.getLostPoint(this);(e==0||s>c)&&(s=c,r=e)}return r},d.createMovieClip=function(s,r,e){var c=s.createEmptyMovieClip(r,e),p=1;this.make();for(var f=0;f<this.modules.length;f++)for(var h=f*p,g=0;g<this.modules[f].length;g++){var m=g*p,y=this.modules[f][g];y&&(c.beginFill(0,100),c.moveTo(m,h),c.lineTo(m+p,h),c.lineTo(m+p,h+p),c.lineTo(m,h+p),c.endFill())}return c},d.setupTimingPattern=function(){for(var s=8;s<this.moduleCount-8;s++)this.modules[s][6]==null&&(this.modules[s][6]=s%2==0);for(var r=8;r<this.moduleCount-8;r++)this.modules[6][r]==null&&(this.modules[6][r]=r%2==0)},d.setupPositionAdjustPattern=function(){for(var s=n.getPatternPosition(this.typeNumber),r=0;r<s.length;r++)for(var e=0;e<s.length;e++){var c=s[r],p=s[e];if(this.modules[c][p]==null)for(var f=-2;f<=2;f++)for(var h=-2;h<=2;h++)f==-2||f==2||h==-2||h==2||f==0&&h==0?this.modules[c+f][p+h]=!0:this.modules[c+f][p+h]=!1}},d.setupTypeNumber=function(s){for(var r=n.getBCHTypeNumber(this.typeNumber),e=0;e<18;e++){var c=!s&&(r>>e&1)==1;this.modules[Math.floor(e/3)][e%3+this.moduleCount-8-3]=c}for(var e=0;e<18;e++){var c=!s&&(r>>e&1)==1;this.modules[e%3+this.moduleCount-8-3][Math.floor(e/3)]=c}},d.setupTypeInfo=function(s,r){for(var e=this.errorCorrectLevel<<3|r,c=n.getBCHTypeInfo(e),p=0;p<15;p++){var f=!s&&(c>>p&1)==1;p<6?this.modules[p][8]=f:p<8?this.modules[p+1][8]=f:this.modules[this.moduleCount-15+p][8]=f}for(var p=0;p<15;p++){var f=!s&&(c>>p&1)==1;p<8?this.modules[8][this.moduleCount-p-1]=f:p<9?this.modules[8][15-p-1+1]=f:this.modules[8][15-p-1]=f}this.modules[this.moduleCount-8][8]=!s},d.mapData=function(s,r){for(var e=-1,c=this.moduleCount-1,p=7,f=0,h=this.moduleCount-1;h>0;h-=2)for(h==6&&h--;;){for(var g=0;g<2;g++)if(this.modules[c][h-g]==null){var m=!1;f<s.length&&(m=(s[f]>>>p&1)==1);var y=n.getMask(r,c,h-g);y&&(m=!m),this.modules[c][h-g]=m,p--,p==-1&&(f++,p=7)}if(c+=e,c<0||this.moduleCount<=c){c-=e,e=-e;break}}},a.PAD0=236,a.PAD1=17,a.createData=function(s,r,e){for(var c=l.getRSBlocks(s,r),p=new i,f=0;f<e.length;f++){var h=e[f];p.put(h.mode,4),p.put(h.getLength(),n.getLengthInBits(h.mode,s)),h.write(p)}for(var g=0,f=0;f<c.length;f++)g+=c[f].dataCount;if(p.getLengthInBits()>g*8)throw new Error("code length overflow. ("+p.getLengthInBits()+">"+g*8+")");for(p.getLengthInBits()+4<=g*8&&p.put(0,4);p.getLengthInBits()%8!=0;)p.putBit(!1);for(;!(p.getLengthInBits()>=g*8||(p.put(a.PAD0,8),p.getLengthInBits()>=g*8));)p.put(a.PAD1,8);return a.createBytes(p,c)},a.createBytes=function(s,r){for(var e=0,c=0,p=0,f=new Array(r.length),h=new Array(r.length),g=0;g<r.length;g++){var m=r[g].dataCount,y=r[g].totalCount-m;c=Math.max(c,m),p=Math.max(p,y),f[g]=new Array(m);for(var v=0;v<f[g].length;v++)f[g][v]=255&s.buffer[v+e];e+=m;var x=n.getErrorCorrectPolynomial(y),C=new u(f[g],x.getLength()-1),I=C.mod(x);h[g]=new Array(x.getLength()-1);for(var v=0;v<h[g].length;v++){var _=v+I.getLength()-h[g].length;h[g][v]=_>=0?I.get(_):0}}for(var P=0,v=0;v<r.length;v++)P+=r[v].totalCount;for(var j=new Array(P),L=0,v=0;v<c;v++)for(var g=0;g<r.length;g++)v<f[g].length&&(j[L++]=f[g][v]);for(var v=0;v<p;v++)for(var g=0;g<r.length;g++)v<h[g].length&&(j[L++]=h[g][v]);return j},Be=a,Be}var pe={},ct;function xr(){if(ct)return pe;ct=1,Object.defineProperty(pe,"__esModule",{value:!0});var t=Object.assign||function(e){for(var c=1;c<arguments.length;c++){var p=arguments[c];for(var f in p)Object.prototype.hasOwnProperty.call(p,f)&&(e[f]=p[f])}return e},l=bt(),i=a(l),n=ht(),u=a(n);function a(e){return e&&e.__esModule?e:{default:e}}function d(e,c){var p={};for(var f in e)c.indexOf(f)>=0||Object.prototype.hasOwnProperty.call(e,f)&&(p[f]=e[f]);return p}var s={bgColor:i.default.oneOfType([i.default.object,i.default.string]).isRequired,bgD:i.default.string.isRequired,fgColor:i.default.oneOfType([i.default.object,i.default.string]).isRequired,fgD:i.default.string.isRequired,size:i.default.number.isRequired,title:i.default.string,viewBoxSize:i.default.number.isRequired,xmlns:i.default.string},r=(0,n.forwardRef)(function(e,c){var p=e.bgColor,f=e.bgD,h=e.fgD,g=e.fgColor,m=e.size,y=e.title,v=e.viewBoxSize,x=e.xmlns,C=x===void 0?"http://www.w3.org/2000/svg":x,I=d(e,["bgColor","bgD","fgD","fgColor","size","title","viewBoxSize","xmlns"]);return u.default.createElement("svg",t({},I,{height:m,ref:c,viewBox:"0 0 "+v+" "+v,width:m,xmlns:C}),y?u.default.createElement("title",null,y):null,u.default.createElement("path",{d:f,fill:p}),u.default.createElement("path",{d:h,fill:g}))});return r.displayName="QRCodeSvg",r.propTypes=s,pe.default=r,pe}var ut;function vr(){if(ut)return Z;ut=1,Object.defineProperty(Z,"__esModule",{value:!0}),Z.QRCode=void 0;var t=Object.assign||function(m){for(var y=1;y<arguments.length;y++){var v=arguments[y];for(var x in v)Object.prototype.hasOwnProperty.call(v,x)&&(m[x]=v[x])}return m},l=bt(),i=p(l),n=wt(),u=p(n),a=mr(),d=p(a),s=ht(),r=p(s),e=xr(),c=p(e);function p(m){return m&&m.__esModule?m:{default:m}}function f(m,y){var v={};for(var x in m)y.indexOf(x)>=0||Object.prototype.hasOwnProperty.call(m,x)&&(v[x]=m[x]);return v}var h={bgColor:i.default.oneOfType([i.default.object,i.default.string]),fgColor:i.default.oneOfType([i.default.object,i.default.string]),level:i.default.string,size:i.default.number,value:i.default.string.isRequired},g=(0,s.forwardRef)(function(m,y){var v=m.bgColor,x=v===void 0?"#FFFFFF":v,C=m.fgColor,I=C===void 0?"#000000":C,_=m.level,P=_===void 0?"L":_,j=m.size,L=j===void 0?256:j,A=m.value,B=f(m,["bgColor","fgColor","level","size","value"]),E=new d.default(-1,u.default[P]);E.addData(A),E.make();var M=E.modules;return r.default.createElement(c.default,t({},B,{bgColor:x,bgD:M.map(function(U,F){return U.map(function(N,D){return N?"":"M "+D+" "+F+" l 1 0 0 1 -1 0 Z"}).join(" ")}).join(" "),fgColor:I,fgD:M.map(function(U,F){return U.map(function(N,D){return N?"M "+D+" "+F+" l 1 0 0 1 -1 0 Z":""}).join(" ")}).join(" "),ref:y,size:L,viewBoxSize:M.length}))});return Z.QRCode=g,g.displayName="QRCode",g.propTypes=h,Z.default=g,Z}vr();const yr=({isOpen:t,onClose:l,onSubmit:i,error:n,t:u})=>{const[a,d]=w.useState(""),[s,r]=w.useState(!1);if(!t)return null;const e=c=>{c.preventDefault(),r(!0),i(a),r(!1)};return o.jsx(Wo,{children:o.jsx(Ho,{style:{maxWidth:"400px"},children:o.jsxs("div",{style:{padding:"20px"},children:[o.jsx("h3",{style:{margin:"0 0 20px 0",textAlign:"center"},children:u("Enter Password")}),o.jsxs("form",{onSubmit:e,children:[o.jsxs("div",{style:{marginBottom:"20px"},children:[o.jsx("input",{type:"password",value:a,onChange:c=>d(c.target.value),placeholder:u("Password"),style:{width:"100%",padding:"10px",borderRadius:"4px",border:n?"1px solid #d32f2f":"1px solid #ccc",fontSize:"16px"},required:!0}),n&&o.jsx("div",{style:{color:"#d32f2f",fontSize:"14px",marginTop:"5px",padding:"5px"},children:n})]}),o.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[o.jsx("button",{type:"button",onClick:l,style:{padding:"10px 16px",backgroundColor:"#f3f4f6",border:"none",borderRadius:"4px",cursor:"pointer",fontSize:"14px"},children:u("Cancel")}),o.jsx("button",{type:"submit",disabled:s||!a,style:{padding:"10px 16px",backgroundColor:"#006adc",color:"white",border:"none",borderRadius:"4px",cursor:a?"pointer":"not-allowed",opacity:a?1:.7,fontSize:"14px"},children:u(s?"Submitting...":"Submit")})]})]})]})})})},Me=new fo({region:qt});function pt(t){const l=t.trim().toLowerCase(),i="@gmail.com";return l.endsWith(i)?`${l.slice(0,-i.length).replace(/\./g,"")}${i}`:l}const br=({isOpen:t,onClose:l,onLoginSuccess:i,t:n})=>{const[u,a]=w.useState(""),[d,s]=w.useState(!1),[r,e]=w.useState(""),[c,p]=w.useState(""),[f,h]=w.useState("idle"),[g,m]=w.useState(""),y=w.useRef(null),v=w.useRef(null);w.useEffect(()=>{d&&v.current&&v.current.focus()},[d]),w.useEffect(()=>{t&&y.current&&!d&&y.current.focus()},[t,d]);function x(P){const j=P.target.value;/^\d*$/.test(j)&&j.length<=6&&e(j)}async function C(){var j;h("sending"),m("");const P=pt(u);if(!P||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(P)){h("error"),m(n("Please enter a valid email address"));return}try{const L=new ho({ClientId:be,Username:P,Password:crypto.randomUUID(),UserAttributes:[{Name:"email",Value:P}]});try{await Me.send(L)}catch(E){if(!((j=E.name)!=null&&j.includes("UsernameExistsException")))throw E}const A=new go({ClientId:be,AuthFlow:"CUSTOM_AUTH",AuthParameters:{USERNAME:P}}),B=await Me.send(A);if(B.Session)p(B.Session),s(!0),h("idle");else throw new Error("No session returned from InitiateAuth")}catch(L){console.error(L),h("error"),m(n("Unable to send verification code. Please try again later."))}}async function I(){var j,L,A,B,E,M;h("verifying"),m("");const P=pt(u);try{const U=new mo({ClientId:be,ChallengeName:"CUSTOM_CHALLENGE",ChallengeResponses:{USERNAME:P,ANSWER:r},Session:c}),N=(j=(await Me.send(U)).AuthenticationResult)==null?void 0:j.IdToken;if(!N)throw new Error("No token received");localStorage.setItem("idToken",N);const T=`${JSON.parse(atob(N.split(".")[1]))["cognito:username"]}_____Public____Profile`,Q=await(await fetch(De,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${N}`},body:JSON.stringify({query:`
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
          `,variables:{relationIds:[T]}})})).json(),ie=(M=(E=(B=(A=(L=Q==null?void 0:Q.data)==null?void 0:L.batchGetItems)==null?void 0:A.items)==null?void 0:B[0])==null?void 0:E.item)==null?void 0:M.anyDisplayName;ie&&localStorage.setItem("publicUsername",ie),h("idle"),i(),l()}catch(U){console.error(U),h("error"),m(n("Invalid or expired verification code. Please try again or request a new code."))}}function _(){s(!1),e(""),h("idle")}return t?o.jsx("div",{style:{backgroundColor:"rgba(0, 0, 0, 0.5)",position:"fixed",top:0,left:0,right:0,bottom:0,display:"flex",alignItems:"center",justifyContent:"center",zIndex:1e3},children:o.jsxs("div",{style:{maxWidth:400,width:"100%",background:"#ffffff",padding:"32px",borderRadius:"12px",boxShadow:"0 6px 20px rgba(0,0,0,0.06)",textAlign:"center"},children:[o.jsxs("div",{style:{marginBottom:"24px"},children:[o.jsx("img",{src:"images/logo_no_background.png",alt:"6180 Logo",style:{height:"60px",marginBottom:"16px"}}),o.jsx("h2",{style:{fontSize:"24px",fontWeight:600,color:"#333"},children:n("Sign in to 6180")})]}),g&&o.jsx("div",{style:{backgroundColor:"#f8d7da",color:"#721c24",padding:"10px",borderRadius:"6px",marginBottom:"16px",fontSize:"14px"},children:g}),d?o.jsxs(o.Fragment,{children:[o.jsxs("p",{style:{marginBottom:"16px",color:"#555"},children:[n("Check your email for a 6-digit verification code sent to")," ",o.jsx("strong",{children:u})]}),o.jsx("input",{ref:v,type:"tel",inputMode:"numeric",pattern:"[0-9]*",maxLength:6,value:r,onChange:x,placeholder:n("Enter 6-digit code"),style:{width:"100%",padding:"12px",marginBottom:"16px",borderRadius:"6px",border:"1px solid #ccc",fontSize:"16px",boxSizing:"border-box",letterSpacing:"2px",textAlign:"center"}}),o.jsx("button",{onClick:I,disabled:f==="verifying"||r.length!==6,style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#28a745",color:"#fff",border:"none",borderRadius:"6px",cursor:f==="verifying"||r.length!==6?"not-allowed":"pointer",opacity:f==="verifying"||r.length!==6?.7:1},children:n(f==="verifying"?"Verifying...":"Verify Code")}),o.jsxs("div",{style:{marginTop:"16px",fontSize:"14px",color:"#666",display:"flex",justifyContent:"center",gap:"8px"},children:[o.jsx("span",{children:n("Didn't receive a code?")}),o.jsx("button",{onClick:_,style:{background:"none",border:"none",color:"#007bff",padding:0,cursor:"pointer",fontSize:"14px",textDecoration:"underline"},children:n("Send new code")})]}),o.jsx("button",{onClick:l,style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#f8f9fa",color:"#555",border:"1px solid #ccc",borderRadius:"6px",cursor:"pointer",marginTop:"12px"},children:n("Cancel")})]}):o.jsxs(o.Fragment,{children:[o.jsx("input",{ref:y,type:"email",value:u,onChange:P=>a(P.target.value),placeholder:n("Enter your email"),style:{width:"100%",padding:"12px",marginBottom:"16px",borderRadius:"6px",border:"1px solid #ccc",fontSize:"16px",boxSizing:"border-box"}}),o.jsx("button",{onClick:C,disabled:f==="sending"||!u.trim(),style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#007bff",color:"#fff",border:"none",borderRadius:"6px",cursor:f==="sending"||!u.trim()?"not-allowed":"pointer",opacity:f==="sending"||!u.trim()?.7:1},children:n(f==="sending"?"Sending...":"Send Verification Code")}),o.jsx("p",{style:{fontSize:"13px",color:"#666",marginTop:"16px",textAlign:"center"},children:n("We'll send a secure verification code to your email")}),o.jsx("button",{onClick:l,style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#f8f9fa",color:"#555",border:"1px solid #ccc",borderRadius:"6px",cursor:"pointer",marginTop:"12px"},children:n("Cancel")})]})]})}):null},wr=({albumData:t,t:l})=>!t||Object.keys(t.contacts).length===0?null:o.jsx("div",{style:{width:"100%",backgroundColor:"#f0f7ff",borderRadius:"8px",padding:"16px",marginBottom:"20px",boxShadow:"0 2px 4px rgba(0,0,0,0.1)",border:"1px solid #d0e1f9"},children:o.jsxs("p",{style:{margin:"0",fontSize:"15px",color:"#333",textAlign:"left"},children:[l('Click "Save" to create a memory with '),o.jsx("strong",{children:Object.values(t.contacts).filter(i=>!i.toString().startsWith("Profile-")).join(", ")}),l(" that you can filter for later")]})}),Ne=({src:t,thumbnailSrc:l,alt:i,className:n="",loadFullResolution:u=!1,onFullResolutionLoaded:a,onClick:d,showWatermark:s=!1})=>{const[r,e]=w.useState(!1),[c,p]=w.useState(!1),[f,h]=w.useState(!1),[g,m]=w.useState("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E"),{t:y}=me();return w.useEffect(()=>{if(l){const v=new Image;v.src=l,v.onload=()=>{m(l),e(!0)}}},[l]),w.useEffect(()=>{if(u&&!c){h(!0);const v=new Image;v.src=t,v.onload=()=>{m(t),p(!0),h(!1),a&&a()}}},[u,t,c,a]),o.jsxs(Bo,{onClick:d,children:[o.jsx(Mo,{src:g,alt:i,className:n,isLoaded:r,style:{cursor:d?"pointer":"default"}}),!r&&o.jsx(Oo,{}),f&&o.jsx(yt,{children:y("Loading full resolution...")}),s&&r&&o.jsx(he,{children:o.jsx(ge,{children:"6180 Watermarked"})})]})},Cr=({thumbnailUrl:t,videoUrl:l,duration:i,index:n,onFullResolutionLoaded:u,onClick:a,showWatermark:d=!1})=>{const[s,r]=w.useState(!1),[e,c]=w.useState(!1),[p,f]=w.useState(!1),h=Gt.useRef(null),{t:g}=me(),m=()=>{if(a){a();return}p?r(!0):c(!0)},y=()=>{f(!0),r(!0),u&&u()};return w.useEffect(()=>{if(e&&h.current&&!p){const v=h.current,x=()=>{y(),v.removeEventListener("canplaythrough",x)};return v.addEventListener("canplaythrough",x),v.load(),()=>{v.removeEventListener("canplaythrough",x)}}},[e,p]),s?o.jsxs("div",{style:{position:"relative",width:"100%",height:"100%"},children:[o.jsxs("video",{ref:h,controls:!0,style:{width:"100%",height:"100%"},children:[o.jsx("source",{src:l,type:"video/mp4"}),g("Your browser does not support the video tag.")]}),d&&o.jsx(he,{children:o.jsx(ge,{children:"6180 Watermarked"})})]}):e&&!p?o.jsxs(Ke,{children:[o.jsx(Ne,{src:l,thumbnailSrc:t,alt:`Video thumbnail ${n+1}`,showWatermark:d}),o.jsx(yt,{children:g("Loading video...")}),o.jsx("video",{ref:h,style:{display:"none"},preload:"auto",children:o.jsx("source",{src:l,type:"video/mp4"})})]}):o.jsxs(Ke,{onClick:m,children:[o.jsx(Ne,{src:l,thumbnailSrc:t,alt:`Video thumbnail ${n+1}`,showWatermark:d}),o.jsx(Do,{}),o.jsx(zo,{children:i})]})},Pr=({item:t,index:l,isSelectionMode:i,isSelected:n,toggleItemSelection:u,openFullscreenView:a,showWatermark:d,ownerName:s})=>o.jsxs("div",{style:{position:"relative",border:i&&n?"3px solid #006adc":void 0,borderRadius:"8px",overflow:"hidden",boxShadow:i&&n?"0 0 0 3px rgba(0, 106, 220, 0.3)":void 0},onClick:r=>i?u(l,r):a(l),children:[i&&o.jsx(Go,{isSelected:n,onClick:r=>u(l,r),children:n&&o.jsx(Vo,{children:"✓"})}),t.type==="image"?o.jsx(Ne,{src:t.url,thumbnailSrc:t.thumbnailUrl,alt:`Album image ${l+1}`,loadFullResolution:!1,onFullResolutionLoaded:()=>{},onClick:()=>i?void 0:a(l),showWatermark:d}):o.jsx(Cr,{thumbnailUrl:t.thumbnailUrl||"",videoUrl:t.url,duration:t.duration||"0:00",index:l,onFullResolutionLoaded:()=>{},onClick:()=>i?void 0:a(l),showWatermark:d}),s&&o.jsx(No,{children:s})]},l),Sr=({isLoading:t,error:l,albumData:i,columns:n,shouldShowContent:u,shouldShowWatermark:a,isSelectionMode:d,selectedItems:s,toggleItemSelection:r,openFullscreenView:e,t:c})=>t?o.jsx(Uo,{id:"loading-message",children:c("Loading album content...")}):l?o.jsx(Ce,{children:l}):u()?!i||i.mediaItems.length===0?o.jsx(Ce,{children:c("No media found in this album")}):o.jsx(Ao,{id:"media-grid",columns:n,children:i.mediaItems.map((p,f)=>{const h=p.ownerContactId&&i.contacts[p.ownerContactId]?i.contacts[p.ownerContactId]:"",g=s.has(f),m=a();return o.jsx(Pr,{item:p,index:f,isSelectionMode:d,isSelected:g,toggleItemSelection:r,openFullscreenView:e,showWatermark:m,ownerName:h},f)})}):o.jsx("div",{style:{gridColumn:"1 / -1",textAlign:"center",padding:"40px 0"},children:o.jsx(Ce,{children:c("Enter the password to view album contents")})}),Ir=({albumData:t,t:l})=>t?o.jsxs(o.Fragment,{children:[t.folderName&&t.folderName!==l("Photos")&&t.folderName.trim()!==""&&o.jsx(ko,{id:"album-title",children:o.jsx(jo,{children:t.folderName})}),t.folderDescription&&t.folderDescription.trim()!==""&&o.jsx(Ro,{id:"description-container",children:o.jsx(Lo,{children:t.folderDescription})})]}):null,Tr=({addPhotosToAlbum:t,saveAlbum:l,promptForPassword:i,showingEnterPassword:n,passwordPolicy:u,usingFolderInviteGrantsRightToAddItems:a,t:d})=>{const[s,r]=w.useState(!1),[e,c]=w.useState(!1),p=w.useRef(null),f=840;w.useEffect(()=>{c(window.innerWidth<f);const y=()=>{c(window.innerWidth<f)};return window.addEventListener("resize",y),()=>window.removeEventListener("resize",y)},[]);const h=()=>{r(!s)},g=()=>{r(!1)},m=y=>{y(),g()};return w.useEffect(()=>{const y=x=>{p.current&&!p.current.contains(x.target)&&r(!1)},v=()=>{r(!1)};return s&&(document.addEventListener("mousedown",y),window.addEventListener("scroll",v)),()=>{document.removeEventListener("mousedown",y),window.removeEventListener("scroll",v)}},[s]),e?o.jsxs("div",{ref:p,style:{position:"relative",display:"flex",alignItems:"center",justifyContent:"flex-end",width:"100%",flexWrap:"nowrap"},children:[!n&&o.jsxs("div",{style:{flexShrink:0},children:[o.jsxs(mt,{onClick:h,"aria-label":d("Menu"),"aria-expanded":s,children:[o.jsxs(xt,{children:[o.jsx(ee,{}),o.jsx(ee,{}),o.jsx(ee,{})]}),d("Save")]}),s&&o.jsxs(vt,{children:[a&&o.jsx(fe,{onClick:()=>m(t),children:d("Add Photos To Album")}),o.jsx(fe,{onClick:()=>m(l),children:d("Save To My Library")}),o.jsx(fe,{onClick:()=>m(l),children:d("Download To My Device")})]})]}),n&&u&&u!=="NoPassword"&&o.jsx("div",{style:{flexShrink:0},children:o.jsx(Je,{onClick:i,children:d("Enter Password")})})]}):o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"20px",justifyContent:"flex-end",flexWrap:"nowrap"},children:[!n&&o.jsxs("div",{style:{display:"flex",gap:"20px",flexWrap:"nowrap"},children:[a&&o.jsx(G,{onClick:t,children:d("Add Photos")}),o.jsx(G,{onClick:l,children:d("Save To My Library")}),o.jsx(G,{onClick:l,children:d("Download To My Device")})]}),n&&o.jsx("div",{children:o.jsx(Je,{onClick:i,children:d("Enter Password")})})]})},kr=({t,isSelectionMode:l,selectedItems:i,shareSelection:n,cancelSelection:u,createSubalbum:a,showingEnterPassword:d,promptForPassword:s,passwordPolicy:r,isAuthorized:e,addPhotosToAlbum:c,saveAlbumDirectly:p,handleDownloadPhotos:f,handleCopyLink:h,handlePublicProfileToggle:g,isOnPublicProfile:m,albumData:y,columns:v,changeColumns:x})=>{const[C,I]=w.useState(!1),[_,P]=w.useState(!1),j=w.useRef(null),L=840;w.useEffect(()=>{P(window.innerWidth<L);const T=()=>{P(window.innerWidth<L)};return window.addEventListener("resize",T),()=>window.removeEventListener("resize",T)},[]);const A=()=>{I(!C)},B=()=>{I(!1)},E=T=>{T(),B()};w.useEffect(()=>{const T=Q=>{j.current&&!j.current.contains(Q.target)&&I(!1)},H=()=>{I(!1)};return C&&(document.addEventListener("mousedown",T),window.addEventListener("scroll",H)),()=>{document.removeEventListener("mousedown",T),window.removeEventListener("scroll",H)}},[C]);const M=()=>[{label:t("Add Photos"),onClick:c},{label:t("Download"),onClick:f},{label:t("Copy Link"),onClick:h},{label:t(m?"On Public Profile":"Not On Public Profile"),onClick:g,style:{backgroundColor:m?"#4caf50":"#e0e0e0",color:m?"white":"inherit"}}],U=()=>o.jsxs("div",{style:{display:"flex",gap:"16px"},children:[o.jsxs(G,{onClick:n,disabled:i.size===0,style:{opacity:i.size===0?.5:1,backgroundColor:i.size>0?"#006adc":void 0,color:i.size>0?"white":void 0},children:[t("Create Sub-album")," (",i.size,")"]}),o.jsx(G,{onClick:u,children:t("Cancel")})]}),F=()=>!l&&!e&&r&&r!=="NoPassword"&&o.jsx(G,{onClick:s,children:t("Enter Password")}),N=()=>o.jsxs(o.Fragment,{children:[o.jsxs(mt,{onClick:A,"aria-label":t("Menu"),"aria-expanded":C,children:[o.jsxs(xt,{children:[o.jsx(ee,{}),o.jsx(ee,{}),o.jsx(ee,{})]}),t("Actions")]}),C&&o.jsx(vt,{children:M().map((T,H)=>o.jsx(fe,{onClick:()=>E(T.onClick),style:T.style,disabled:T.disabled,children:T.label},H))})]}),D=()=>o.jsx("div",{style:{display:"flex",gap:"10px",flexWrap:"nowrap"},children:M().map((T,H)=>o.jsx(G,{onClick:T.onClick,style:T.style,disabled:T.disabled,children:T.label},H))}),ne=()=>l?U():o.jsxs("div",{style:{display:"flex",justifyContent:"space-between",width:"100%",flexWrap:"nowrap",alignItems:"center"},children:[o.jsx("div",{style:{flexShrink:0},children:!d()&&o.jsx(Io,{onClick:a,children:t("Create Sub-album")})}),o.jsxs("div",{style:{marginLeft:"auto",display:"flex",alignItems:"center"},children:[F(),!l&&!(!e&&r&&r!=="NoPassword")&&(y!=null&&y.folderPositionId?o.jsx("div",{ref:j,style:{position:"relative",display:"flex",alignItems:"center",justifyContent:"flex-end",flexWrap:"nowrap"},children:_?N():D()}):o.jsx(Tr,{addPhotosToAlbum:c,saveAlbum:p,downloadPhotos:f,promptForPassword:s,showingEnterPassword:d(),passwordPolicy:r,usingFolderInviteGrantsRightToAddItems:y==null?void 0:y.usingFolderInviteGrantsRightToAddItems,t}))]})]});return o.jsx(Co,{children:o.jsxs(Po,{children:[o.jsx(qo,{children:ne()}),o.jsxs(To,{children:[o.jsx(Fo,{htmlFor:"columns",id:"columns-label",children:o.jsx("strong",{children:t("Columns:")})}),o.jsx($o,{id:"columns",value:v,onChange:T=>x(T.target.value),children:[1,2,3,4,5].map(T=>o.jsx("option",{value:T.toString(),children:T},T))})]})]})})},jr=()=>{const{t,language:l}=me(),i=Yt(),n=Xt(),u=Zt(),a=eo(),d=uo(t),[s,r]=w.useState("1"),[e,c]=w.useState(null),[p,f]=w.useState(!0),[h,g]=w.useState(null),[m,y]=w.useState(null),[v,x]=w.useState(!1),[C,I]=w.useState(!1),[_,P]=w.useState(null),[j,L]=w.useState(!1),{passwordPolicy:A,setPasswordPolicy:B,isAuthorized:E,setIsAuthorized:M,showPasswordModal:U,setShowPasswordModal:F,passwordError:N,setPasswordError:D,passwordVerified:ne,setPasswordVerified:T,shouldShowContent:H,shouldShowWatermark:Q,showingEnterPassword:ie,promptForPassword:te}=a,{fileInputRef:xe,selectedPhotos:oe,setSelectedPhotos:ze,isUploading:It,setIsUploading:se,fileProcessingComplete:Ue,setFileProcessingComplete:ve,progressTracker:re,log:V}=i,{fullscreenItem:Y,openFullscreenView:Fe,closeFullscreenView:Tt,goToPrevItem:kt,goToNextItem:jt}=n,{isSelectionMode:ae,setIsSelectionMode:Et,selectedItems:le,toggleItemSelection:Rt,cancelSelection:Lt}=u,q=to(e,m,_,t),At=async S=>{if(D(null),S.trim()===""){D(t("Password cannot be empty"));return}const k=e==null?void 0:e.actualPassword;if(!k)if(e!=null&&e.hasPassword){D(t("Unable to validate password. Please try again later."));return}else{M(!0),F(!1);return}if(S!==k){D(t("Invalid password. Please try again."));return}if(!await J()){F(!1),T(!0),x(!0);return}M(!0),F(!1),D(null),ce(t,m,e)},_t=S=>{r(S),localStorage.setItem("columns",S)},$e=()=>{xe.current&&xe.current.click()},Bt=async()=>{const S=await J();if(!S){L(!0),x(!0);return}if(!_)try{const R=JSON.parse(atob(S.split(".")[1]))["cognito:username"];P(R)}catch(k){console.error("Failed to decode token",k)}ve(!1),$e()},Mt=async()=>{x(!1);const S=await J();if(S)try{const R=JSON.parse(atob(S.split(".")[1]))["cognito:username"];P(R),ne&&(M(!0),T(!1)),j&&(localStorage.setItem("selectPhotosButtonTimestamp",Date.now().toString()),L(!1)),ce(t,m,e);return}catch(k){console.error("Failed to decode token",k)}},Ot=async S=>{const k=Array.from(S.target.files||[]);if(!k.length)return;localStorage.removeItem("selectPhotosButtonTimestamp"),I(!1),se(!0),ve(!1);const R=await gt();if(!R){V("❌ Authentication failed"),se(!1),x(!0);return}try{const O=JSON.parse(atob(R.split(".")[1]))["cognito:username"];if(!O){V("❌ Missing Cognito Username"),se(!1);return}P(O);const ye=m||`${O}_____${no()}____Folder`;V(`📁 Using folder ID: ${ye}`),ze(k.map(W=>({fileName:W.name,s3PreviewUrl:URL.createObjectURL(W),type:W.type,size:W.size,status:"pending",progress:0})));const We=io(ze),de=setInterval(()=>{Ge(oe,i.setProgressTracker)},500),K=await so(k,O,We,V);clearInterval(de),Ge(K,i.setProgressTracker),localStorage.setItem(ft.SELECTED_PHOTOS,JSON.stringify(K)),V(`📸 Saved ${K.length} photos metadata to storage`);const Ft=K.every(W=>W.status==="complete"),He=K.some(W=>W.status==="error");if(Ft&&!He)V(`✅ All ${K.length} files successfully uploaded`);else if(He){const W=K.filter($t=>$t.status==="error").length;V(`⚠️ Upload completed with ${W} errors`)}setTimeout(()=>{ve(!0)},1e3)}catch(z){V(`❌ Fatal error in handleFileSelection: ${String(z)}`),se(!1)}finally{S.target&&(S.target.value="")}},Nt=async()=>{if(console.log("Starting album registration"),A==="CannotBeSaved"&&!E){te();return}const S=await J();if(!S){console.log("User not logged in, showing OTP login"),x(!0);return}if(!_)try{const z=JSON.parse(atob(S.split(".")[1]))["cognito:username"];P(z)}catch(R){console.error("Failed to decode token",R)}const k=localStorage.getItem("publicUsername");if(k!=null&&k.startsWith("Profile-")){console.log("Public username starts with 'Profile-', showing username prompt"),d.setUsernameInput(k),d.setShowUsernamePrompt(!0);return}ce(t,m,e)},Dt=async()=>{if((A==="NotVisible"||A==="CannotBeSaved")&&!E){te();return}Et(!ae),le.clear()},zt=async()=>{bo(t,e,le)},Ut=async()=>{if(A==="CannotBeSaved"&&!E){te();return}if(!await J()&&(m||A==="CannotBeSaved")){x(!0);return}e&&co(e,t,Fe)};return w.useEffect(()=>{const S=localStorage.getItem("columns")||"1";r(S)},[]),w.useEffect(()=>{(async()=>{const k=oo();if(!k){g(t("Valid ID not obtained from query parameter.")),f(!1);return}const R=k.split("_");let z=R[R.length-1].replace(/-/g,"");z.length===32?(z=ro(z),console.log(z)):console.error("Invalid UUID format: must be 32 characters after removing dashes");const O=await yo(z,y);O&&(c(O),O.passwordPolicy&&(B(O.passwordPolicy),(O.passwordPolicy==="NoPassword"||O.folderPositionId)&&M(!0))),f(!1)})()},[]),w.useEffect(()=>{(async()=>{const k=await J();if(k)try{const z=JSON.parse(atob(k.split(".")[1]))["cognito:username"];P(z);const O=localStorage.getItem("selectPhotosButtonTimestamp");if(O){const ye=parseInt(O,10),de=(Date.now()-ye)/(1e3*60);I(de<10),de>=10&&localStorage.removeItem("selectPhotosButtonTimestamp")}else I(!1)}catch(R){console.error("Failed to decode token",R)}})()},[]),w.useEffect(()=>{if(Ue&&oe.length>0){const S=oe.filter(R=>R.status==="complete").length,k=oe.filter(R=>R.status==="error").length;console.log(`Upload complete: ${S} successful, ${k} failed`),m?window.location.href=`/save-album.html?folderId=${encodeURIComponent(m)}`:window.location.href="/save-album.html"}},[Ue,oe.length,m]),w.useEffect(()=>{e!=null&&e.folderName?document.title=e.folderName:document.title=t("Photos")},[e,l]),o.jsxs(wo,{children:[o.jsx(Kt,{}),o.jsx(kr,{t,isSelectionMode:ae,selectedItems:le,shareSelection:zt,cancelSelection:Lt,createSubalbum:Dt,showingEnterPassword:ie,promptForPassword:te,passwordPolicy:A,isAuthorized:E,addPhotosToAlbum:Bt,saveAlbumDirectly:Nt,handleDownloadPhotos:Ut,handleCopyLink:()=>q.setShowingCopyLinkAlert(!0),handlePublicProfileToggle:q.handlePublicProfileToggle,isOnPublicProfile:q.isOnPublicProfile,albumData:e,columns:s,changeColumns:_t}),o.jsxs(Eo,{id:"media-container",children:[o.jsx(rr,{showSelectPhotosButton:C,albumData:e,openFilePicker:$e,t}),o.jsx(wr,{albumData:e,t}),It&&o.jsxs("div",{style:{width:"100%",marginBottom:"20px"},children:[o.jsx(ao,{progressTracker:re,t,isRTL:we(l)==="rtl",style:{marginTop:"20px"}}),re.filesComplete>0&&re.filesComplete===re.totalFiles&&o.jsx("div",{style:{backgroundColor:"#e8f5e9",color:"#2e7d32",padding:"10px 16px",borderRadius:"6px",fontSize:"14px",marginTop:"10px",textAlign:"center"},children:t("Upload complete! Preparing to save your album...")}),re.filesWithError>0&&o.jsx("div",{style:{backgroundColor:"#ffebee",color:"#c62828",padding:"10px 16px",borderRadius:"6px",fontSize:"14px",marginTop:"10px",textAlign:"center"},children:t("Some files could not be uploaded. You can continue with the successfully uploaded files.")})]}),o.jsx(nr,{isAuthorized:E,passwordPolicy:A,passwordError:N,promptForPassword:te,t}),o.jsx(ir,{isSelectionMode:ae,t}),o.jsx(Ir,{albumData:e,t}),o.jsx(Sr,{isLoading:p,error:h,albumData:e,columns:s,shouldShowContent:H,shouldShowWatermark:Q,isSelectionMode:ae,selectedItems:le,toggleItemSelection:Rt,openFullscreenView:Fe,t})]}),o.jsx(yr,{isOpen:U,onClose:()=>{F(!1),D(null)},onSubmit:At,error:N,t}),o.jsx(br,{isOpen:v,onClose:()=>{x(!1)},onLoginSuccess:Mt,t}),o.jsx(lo,{onFileSelection:Ot,ref:xe}),Y!==null&&e&&o.jsx(dr,{item:e.mediaItems[Y],index:Y,onClose:Tt,onPrev:kt,onNext:()=>jt(e.mediaItems.length),hasNext:Y<e.mediaItems.length-1,hasPrev:Y>0,showWatermark:Q(),ownerName:(()=>{const S=e.mediaItems[Y].ownerContactId;if(!S)return"";if(e.contacts&&e.contacts[S])return e.contacts[S];const k=S.split("_____")[0]||"";return k===_?t("Me"):k})()}),o.jsx(po,{t,language:l,usernameManager:d,onSuccess:S=>{ce(t,m,e)}}),o.jsx(xo,{isOpen:q.showingCopyLinkAlert,onClose:()=>q.setShowingCopyLinkAlert(!1),inviteLink:q.generateInviteLink(),onCopy:q.handleCopy,t,isRTL:we(l)==="rtl"}),o.jsx(vo,{isOpen:q.showingCopiedLinkAlert,onClose:()=>q.setShowingCopiedLinkAlert(!1),t,isRTL:we(l)==="rtl"})]})},Er=()=>o.jsx(Vt,{children:o.jsx(jr,{})});Qt.createRoot(document.getElementById("root")).render(o.jsx(Er,{}));
