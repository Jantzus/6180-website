import{d as U,u as Se,r as y,j as e,g as ye,l as H,k as ne,P as ke,m as Oe,O as Ne,n as Re,o as Ue,p as Be,q as Me,s as ie,S as ze,t as qe,v as We,w as Je,x as Ge,y as Ve,z as He,D as Ke,E as Qe,M as Ye,V as Xe,F as Ze,U as Le,J as et,K as tt,N as st,Q as rt,T as it,W as pe,X as me,Y as ot,Z as at,_ as ge,$ as he,a0 as be,a1 as xe,a as lt,I as nt,G as dt,A as ct,H as ut,a2 as ft,a3 as pt,a4 as mt,a5 as gt,a6 as ht,a7 as bt}from"./styled-components-TLcRmuEy.js";import{u as Pe,U as xt}from"./customHooks-D-nAAZj0.js";import{L as Pt,D as vt}from"./DebugLog-Ds6bRgIn.js";import{b as L,g as ce,s as wt,m as St,d as yt,u as It,e as $t,p as jt,f as Ft}from"./utils-Bp6O1SOV.js";const _t=U.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`,Ct=U.div`
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`,At=U.div`
  font-size: 18px;
  font-weight: 500;
  color: white;
  background-color: #888;
  padding: 15px 20px;
  text-align: center;
`,Dt=U.div`
  direction: ${s=>s.isRTL?"rtl":"ltr"};
  padding: 30px;
`,ve=U.p`
  margin-bottom: 15px;
  font-size: 16px;
`,Et=U.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 25px;
  margin-top: 20px;
  box-sizing: border-box;
`,Tt=U.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
`,oe=U.div`
  display: flex;
  align-items: center;
  cursor: ${s=>s.disabled?"not-allowed":"pointer"};
  opacity: ${s=>s.disabled?.7:1};
`,ae=U.input`
  margin-right: 10px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  
  &:disabled {
    cursor: not-allowed;
  }
`,le=U.label`
  display: flex;
  cursor: ${s=>s.disabled?"not-allowed":"pointer"};
  font-size: 16px;
`,de=U.span`
  color: #aaa;
  margin-left: 8px;
`,kt=U.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`,we=U.button`
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
`,Ot=({isOpen:s,onClose:l,initialOption:x="NoPassword",initialPassword:g=""})=>{const{t:i,language:A}=Se(),k=ye(A)==="rtl",[P,j]=y.useState(x),[O,M]=y.useState(g);if(y.useEffect(()=>{s&&(j(x),M(g))},[s,x,g]),!s)return null;const p=O.trim()==="",r=T=>{T!=="NoPassword"&&p||j(T)},N=T=>{T.target===T.currentTarget&&l()};return e.jsx(_t,{onClick:N,children:e.jsxs(Ct,{children:[e.jsx(At,{children:i("Album Password Policy")}),e.jsxs(Dt,{isRTL:k,children:[e.jsx(ve,{children:i("Enter a password for this album.")}),e.jsx(Et,{type:"text",placeholder:i("Enter password"),value:O,onChange:T=>M(T.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"}),e.jsx(ve,{children:i("Select password restrictions.")}),e.jsxs(Tt,{children:[e.jsxs(oe,{disabled:p,children:[e.jsx(ae,{type:"radio",name:"protection",id:"notVisible",checked:P==="NotVisible",onChange:()=>{},disabled:p,onClick:()=>!p&&r("NotVisible")}),e.jsxs(le,{htmlFor:"notVisible",disabled:p,children:[i("Password Required To See Or Save"),p&&e.jsx(de,{children:i("Password required")})]})]}),e.jsxs(oe,{disabled:p,children:[e.jsx(ae,{type:"radio",name:"protection",id:"watermark",checked:P==="Watermark",onChange:()=>{},disabled:p,onClick:()=>!p&&r("Watermark")}),e.jsxs(le,{htmlFor:"watermark",disabled:p,children:[i("Password Required To Remove Watermark Or Save"),p&&e.jsx(de,{children:i("Password required")})]})]}),e.jsxs(oe,{disabled:p,children:[e.jsx(ae,{type:"radio",name:"protection",id:"cannotBeSaved",checked:P==="CannotBeSaved",onChange:()=>{},disabled:p,onClick:()=>!p&&r("CannotBeSaved")}),e.jsxs(le,{htmlFor:"cannotBeSaved",disabled:p,children:[i("Password Required To Save"),p&&e.jsx(de,{children:i("Password required")})]})]}),e.jsxs(oe,{disabled:!1,children:[e.jsx(ae,{type:"radio",name:"protection",id:"noPassword",checked:P==="NoPassword",onChange:()=>{},onClick:()=>r("NoPassword")}),e.jsx(le,{htmlFor:"noPassword",disabled:!1,children:i("No Password")})]})]}),e.jsxs(kt,{children:[e.jsx(we,{onClick:()=>l(),children:i("Cancel")}),e.jsx(we,{onClick:()=>{console.log(`Saving with option: ${P}, password: ${O.length>0?"********":"none"}`),l(P,O)},children:i("Save")})]})]})]})})},Nt=`
  query FetchFolders($folderIds: [String!]!) {
    fetchFolders(folderIds: $folderIds) {
      items {
        creatorId      
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
  }
`,Rt=(s,l,x,g,i,A,k,P,j,O,M,p,r)=>{const[N,T]=y.useState(null),[t,q]=y.useState(null),W=async I=>{r(`Initializing folder ID with username: ${I}`);try{const _=new URLSearchParams(window.location.search).get("folderId");if(r(`Folder ID from URL: ${_||"null"}`),_){s(_),r(`Using existing folder ID: ${_}`);try{r(`Fetching details for folder: ${_}`);const h=await K(_,r);if(r("Folder details retrieved:",h),h){const D=`${I}_____${I}____Account`,E=h.creatorId===D;if(r(`User is creator of folder: ${E}, accountId: ${D}, creator: ${h.creatorId}`),x(E),E){r("User is creator, showing folder details"),g(!0),i(h.folderName),A(h.folderDescription),k(h.isOnPublicProfile),r(`Setting isOnPublicProfile: ${h.isOnPublicProfile}`),h.participantsCanAddItems!==void 0&&(P(h.participantsCanAddItems),r(`Setting participantsCanAddItems: ${h.participantsCanAddItems}`));const $=h.passwordPolicy;r(`Password policy from folder details: ${$}`),j($),$!=="NoPassword"&&h.password&&O(h.password),r(`Set password protection option to: ${$}`)}else r("User is NOT the creator, hiding editable fields"),g(!1)}else r("No folder details retrieved, setting isCreator to false"),x(!1)}catch(h){console.error("Error fetching folder details:",h),r(`Error fetching folder details: ${h}`),x(!1)}}else{const h=`${I}_____${ce()}____Folder`;r(`Creating new folder ID: ${h}`),s(h),r("Setting isCreator to true for new album"),x(!0),g(!0)}}catch(c){console.error("Folder ID initialization error:",c),r(`Folder ID initialization error: ${c}`),x(!1)}},K=async(I,c)=>{var _,h,D,E,$,o,d,m;c(`Fetching details for folder ID: ${I}`);try{const a=await L();if(!a)return c("No token available for fetching folder details"),null;c("Sending GraphQL query to fetch folder details");const n=await(await fetch(ne,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({query:Nt,variables:{folderIds:[I]}})})).json();if(c("Folder details API response:",n),n.errors)return console.error("GraphQL errors:",n.errors),c(`GraphQL errors: ${JSON.stringify(n.errors)}`),null;const f=((h=(_=n==null?void 0:n.data)==null?void 0:_.fetchFolders)==null?void 0:h.items)||[];if(c(`Found ${f.length} folder items`),f.length===0)return c("No folder items found"),null;const u=f[0];c("Retrieved folder data:",u);const S=((E=(D=u.folderPosition)==null?void 0:D.profileIds)==null?void 0:E.some(B=>B.includes("Public____Profile")))||!1;c(`Folder is on public profile: ${S}`),c("Profile IDs:",($=u.folderPosition)==null?void 0:$.profileIds);const C=(o=u.folderInviteParameters)==null?void 0:o.usingFolderInviteGrantsRightToAddItems;return c(`Participants can add items: ${C}`),{creatorId:u.creatorId||"",folderName:u.folderName||"",folderDescription:u.folderDescription||"",passwordPolicy:((d=u.folderPassword)==null?void 0:d.policy)||"NoPassword",password:((m=u.folderPassword)==null?void 0:m.password)||"",isOnPublicProfile:S,participantsCanAddItems:C!==void 0?C:!0}}catch(a){return console.error("Error in fetchFolderDetails:",a),c(`Error in fetchFolderDetails: ${a}`),null}},Q=()=>{r("Attempting to restore photos from localStorage");try{const I=localStorage.getItem(H.SELECTED_PHOTOS);if(r(`Found stored photos: ${I?"yes":"no"}`),I)try{const c=JSON.parse(I);r(`Parsed ${c.length} photos from localStorage`),Array.isArray(c)&&c.length>0&&(l(c),r(`Restored ${c.length} photos to state`))}catch(c){console.error("Error parsing stored photos:",c),r(`Error parsing stored photos: ${c}`)}}catch(I){console.error("Error restoring photos from storage:",I),r(`Error restoring photos from storage: ${I}`)}},Y=()=>{r("Testing S3 connection");try{wt?r("S3 client is available"):(console.error("S3 client not available"),r("S3 client not available"))}catch(I){console.error("S3 connection test error:",I),r(`S3 connection test error: ${I}`)}},ee=async()=>{var I;r("Starting component initialization");try{r("Checking login with refresh");const c=await L();if(!c){r("No token returned from login check, aborting initialization");return}try{const _=localStorage.getItem("publicUsername");r(`Retrieved public username from localStorage: ${_||"null"}`),q(_||null);const D=JSON.parse(atob(c.split(".")[1]))["cognito:username"];if(D){r(`Extracted Cognito username from token: ${D}`),T(D);const E=localStorage.getItem(H.SUB_ALBUM_DATA);if(r(`Sub-album data from localStorage: ${E||"null"}`),E)try{const $=JSON.parse(E);if(r("Parsed sub-album data:",$),$.isSubAlbum&&((I=$.selectedFileIds)==null?void 0:I.length)>0){r(`Valid sub-album data found with ${$.selectedFileIds.length} files`),M(!0),p($.selectedFileIds),$.selectedPhotos&&$.selectedPhotos.length>0&&(r(`Found ${$.selectedPhotos.length} selected photos in sub-album data`),l($.selectedPhotos)),g(!0),x(!0);const o=`${D}_____${ce()}____Folder`;r(`Generated new folder ID for sub-album: ${o}`),s(o)}else r("Invalid sub-album data, proceeding with normal initialization"),await W(D)}catch($){console.error("Error parsing sub-album data:",$),r(`Error parsing sub-album data: ${$}`),await W(D)}else r("No sub-album data found, proceeding with normal folder initialization"),await W(D)}else r("No Cognito username found in token")}catch(_){console.error("User data initialization error:",_),r(`User data initialization error: ${_}`)}Q(),Y(),r("Component initialization completed")}catch(c){console.error("Initialization error:",c),r(`Initialization error: ${c}`)}};return y.useEffect(()=>{ee()},[]),{cognitoUsername:N,publicUsername:t,setPublicUsername:q}},Ut=(s,l,x,g,i,A,k,P,j,O,M,p,r,N,T,t)=>{const q=o=>{t(`Save progress text: ${o}`);const d=document.getElementById("saveProgressText");d&&(d.innerText=o)},W=o=>{const d=document.getElementById("saveProgress");d?(d.style.width=`${o}%`,t(`Updated save progress bar: ${o}%`)):t("Progress bar element not found"),r(o)},K=(o,d)=>{t(`Splitting array of ${o.length} items into chunks of ${d}`);const m=[];for(let a=0;a<o.length;a+=d)m.push(o.slice(a,a+d));return t(`Created ${m.length} chunks`),m},Q=o=>{const d=new Set;return o.filter(m=>d.has(m.fileId)?(t(`Skipping duplicate file reference with ID: ${m.fileId}`),!1):(d.add(m.fileId),!0))},Y=(o,d,m)=>{t("Creating folder position input"),t(`Profile visibility: ${P?"Public":"Only Me"}`);const a=P?[`${l}_____Public____Profile`]:["Only Me_____Only Me____Profile"];t(`Profile IDs: ${JSON.stringify(a)}`);let v=[];g&&i.length>0&&(t(`Creating file reference IDs for ${i.length} sub-album files`),v=i.map(f=>{const u=f.split("_____");if(u.length>=2){const C=u[1].split("____")[0],B=`${m}_____${C}____FileReference`;return t(`Created file reference ID for sub-album: ${B}`),B}return t(`Using original fileId as fallback: ${f}`),f})),t(`Created ${v.length} acceptedFileReferenceIds`);const n=O!=="NoPassword"?M:null;return t(`Password protection: ${O}`),t(`Album password: ${n?"******":"null"}`),t(`Participants can add items: ${j}`),{currentTime:o,folderId:s,profileIds:a,folderPositionSelectedTagInputs:[],folderPositionPoints:1,acceptedFileReferenceIds:v,folderInput:{folderSelectedTagInputs:[],folderAboutContactIds:[d],folderName:A,folderDescription:k,folderPasswordInput:{password:n,policy:O},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,usingFolderInviteGrantsRightToRemoveItems:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:j,addedItemsNeedFolderCreatorApproval:!1}}}},ee=(o,d,m)=>(t(`Creating file reference inputs for ${o.length} photos`),o.map(a=>{var f;if(a.fileId)return t(`Using existing fileId for photo: ${a.fileId}`),{fileReferencesHolderId:s,currentTime:d,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:a.fileId,fileInput:null};const v=a.type==="video"||(f=a.type)!=null&&f.startsWith("video")?`Input/Video/${a.fileName}`:`Input/Image/${a.fileName}`,n=`${l}_____${a.fileName}____File`;return t(`Created file reference for ${a.fileName}:`),t(`  - dataKey: ${v}`),t(`  - fileId: ${n}`),t(`  - thumbnailDataKey: ${a.thumbnailDataKey||"undefined"}`),t(`  - size: ${a.size}`),t(`  - thumbnailSize: ${a.thumbnailSize||0}`),t(`  - duration: ${a.duration||"undefined"}`),{fileReferencesHolderId:s,currentTime:d,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:n,fileInput:{fileId:n,ownerFileInput:{editorContactIds:[m],FileSharingOptionsEnum:"Anyone",dataKey:v,thumbnailDataKey:a.thumbnailDataKey,dataInBytes:a.size,thumbnailDataInBytes:a.thumbnailSize||0,s3UploadedAt:d,durationInSeconds:a.duration},editorFileInput:{aboutContactIds:[m],captionText:"",numericFilterInputs:[]}}}})),I=async o=>{var v,n;t("Sending folder-only mutation (no file references)");const d=await L();if(!d)throw t("No token available for saving album, aborting"),new Error("Authentication token not available");const m=`
      mutation MyMutation($folderPositionInputs: [FolderPositionInput!]) {
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items {
            id
          }
        }
      }
    `,a={folderPositionInputs:[o]};t("GraphQL folder-only mutation variables:",a);try{t("Sending API request to save folder");const f=await fetch(ne,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${d}`},body:JSON.stringify({query:m,variables:a})});t(`API response status: ${f.status}`);const u=await f.text();t(`API response raw text: ${u}`);const S=JSON.parse(u);if(t("API response JSON:",S),S.errors)throw console.error("Folder save failed:",S.errors),t("Folder save failed with errors:",S.errors),new Error("Failed to save folder");return t("Folder saved successfully"),((n=(v=S.data)==null?void 0:v.changeFiles)==null?void 0:n.items)||[]}catch(f){throw console.error("Error in sendFolderOnlyMutation:",f),t(`Error in sendFolderOnlyMutation: ${f}`),f}},c=async o=>{var v,n,f,u,S;t(`Sending file references-only mutation with ${o.length} items`);const d=await L();if(!d)throw t("No token available for saving file references, aborting"),new Error("Authentication token not available");const m=`
      mutation MyMutation($updatedFileReferenceInputs: [UpdatedFileReferenceInput!]) {
        changeFiles0(updatedFileReferenceInputs: $updatedFileReferenceInputs) {
          items {
            ... on FileReference {
              id
              createdAt
              updatedAt
              fileId
              file {
                dataKey
                thumbnailDataKey
              }
            }
          }
        }
      }
    `,a={updatedFileReferenceInputs:o};t("GraphQL file references-only mutation variables (first item):",o.length>0?o[0]:"No items");try{t("Sending API request to save file references");const C=await fetch(ne,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${d}`},body:JSON.stringify({query:m,variables:a})});t(`API response status: ${C.status}`);const B=await C.text();t(`API response raw text: ${B.substring(0,500)}...`);const J=JSON.parse(B);if(t("API response JSON items count:",((f=(n=(v=J.data)==null?void 0:v.changeFiles0)==null?void 0:n.items)==null?void 0:f.length)||0),J.errors)throw console.error("File references save failed:",J.errors),t("File references save failed with errors:",J.errors),new Error("Failed to save file references");return t("File references chunk saved successfully"),((S=(u=J.data)==null?void 0:u.changeFiles0)==null?void 0:S.items)||[]}catch(C){throw console.error("Error in sendFileReferencesOnlyMutation:",C),t(`Error in sendFileReferencesOnlyMutation: ${C}`),C}},_=async(o,d)=>{var n,f,u,S,C,B,J,b,X;t(`Sending final chunk with folder mutation (${o.length} file references)`);const m=await L();if(!m)throw t("No token available for saving final chunk, aborting"),new Error("Authentication token not available");const a=`
      mutation MyMutation(
        $folderPositionInputs: [FolderPositionInput!],
        $updatedFileReferenceInputs: [UpdatedFileReferenceInput!]
      ) {
        changeFiles0(updatedFileReferenceInputs: $updatedFileReferenceInputs) {
          items {
            ... on FileReference { id createdAt updatedAt fileId file { dataKey thumbnailDataKey } }
          }
        }
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items { id }
        }
      }
    `,v={folderPositionInputs:[d],updatedFileReferenceInputs:o};t("GraphQL final mutation variables (folder + last chunk)");try{t("Sending API request for final save with folder");const z=await fetch(ne,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${m}`},body:JSON.stringify({query:a,variables:v})});t(`API response status: ${z.status}`);const se=await z.text();t(`API response raw text: ${se.substring(0,500)}...`);const G=JSON.parse(se);if(t("API response JSON:",{fileReferencesCount:((u=(f=(n=G.data)==null?void 0:n.changeFiles0)==null?void 0:f.items)==null?void 0:u.length)||0,folderItems:((C=(S=G.data)==null?void 0:S.changeFiles)==null?void 0:C.items)||[]}),G.errors)throw console.error("Final save failed:",G.errors),t("Final save failed with errors:",G.errors),new Error("Failed to complete album save");return t("Final chunk and folder saved successfully"),{fileReferences:((J=(B=G.data)==null?void 0:B.changeFiles0)==null?void 0:J.items)||[],folderPositions:((X=(b=G.data)==null?void 0:b.changeFiles)==null?void 0:X.items)||[]}}catch(z){throw console.error("Error in sendFinalChunkWithFolderMutation:",z),t(`Error in sendFinalChunkWithFolderMutation: ${z}`),z}},h=async()=>(t("Validating required data"),await L()?l?s?(t("All required data validated successfully"),!0):(t("No folder ID, validation failed"),!1):(t("No Cognito username, validation failed"),!1):(t("No token available, validation failed"),!1)),D=()=>{t("Handling successful save"),yt(N,T,[H.SELECTED_PHOTOS,H.SUB_ALBUM_DATA],t),t("Album data cleared");const o=document.getElementById("saveProgressText");o&&(o.innerText="Album saved successfully!",t("Updated progress text to 'Album saved successfully!'")),sessionStorage.setItem("album_just_saved","true"),t("Set 'album_just_saved' flag in sessionStorage"),t("Setting timeout for redirect to my-albums.html"),setTimeout(()=>{t("Redirecting to my-albums.html"),window.location.href="/my-albums.html"},1e3)},E=async(o,d)=>{t("Starting chunked save process");try{q("Processing files in chunks...");const m=48;if(d.length===0)t("No file references to process, saving only folder position"),await I(o);else{const a=Q(d);t(`After removing duplicates, processing ${a.length} unique file references`);const v=K(a,m);t(`Split file references into ${v.length} chunks of max size ${m}`);for(let n=0;n<v.length;n++){const f=v[n];t(`Processing chunk ${n+1} of ${v.length} with ${f.length} file references`);const u=n/v.length*80;r(10+u),W(10+u),n<v.length-1?(q(`Saving files: chunk ${n+1} of ${v.length}...`),await c(f)):(q("Finalizing album..."),await _(f,o))}}r(100),W(100),q("Album saved successfully!"),D()}catch(m){console.error("Error in chunked save process:",m),t(`Error in chunked save process: ${m}`),q(`Error: ${m}`),p(!1)}};return{saveAlbumDirectly:async()=>{t("Starting direct album save"),p(!0),r(5);try{if(t("Validating required data for save"),!await h()){t("Required data validation failed, aborting save"),p(!1);return}const o=Math.floor(Date.now()/1e3),d=`${l}_____${l}____Account`,a=s.split("_____")[1].split("____")[0];t(`Save timestamp: ${o}`),t(`Account ID: ${d}`),t(`Folder ID: ${s}`),t(`Folder target item identifier: ${a}`),t("Creating folder position input");const v=Y(o,d,a);t("Folder position input created:",v);let n=[];const f=x.filter(u=>u.status==="complete");if(t(`Found ${f.length} valid photos with 'complete' status`),f.length>0){const u=f.filter(C=>!C.fileId);t(`Found ${u.length} new uploads to move from temp to public folder`),u.length>0&&(t("Moving files from temp to public folder"),await St(u,W,t)),t("Creating file reference inputs for uploads");const S=ee(f,o,d);t(`Created ${S.length} file reference inputs for uploads`,S),n=n.concat(S)}if(g&&i.length>0){t(`Adding ${i.length} existing file references for sub-album`);const u=i.map(S=>(t(`Creating file reference for existing file ID: ${S}`),{fileReferencesHolderId:s,currentTime:o,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:S,fileInput:null}));t(`Created ${u.length} file reference inputs for existing files`,u),n=n.concat(u)}t(`Total file reference inputs: ${n.length}`),t("Sending GraphQL mutations with chunked file references"),await E(v,n)}catch(o){console.error("Error in saveAlbumDirectly:",o),t(`Error in saveAlbumDirectly: ${o}`),p(!1)}}}},Bt=s=>s.map(l=>{const x=l.type,g=l.name.split(".").pop()||"jpg";return{fileName:`${ce()}.${g}`,s3PreviewUrl:URL.createObjectURL(l),type:x,size:l.size,status:"pending",progress:0}}),Mt=(s,l,x,g)=>{g(`Updating photos with processed info, starting at index ${s}`),x(i=>{const A=[...i];return l.forEach((k,P)=>{const j=s+P;j<A.length&&(g(`Updating photo at index ${j} with processed info`),A[j]=k)}),A})},zt=({selectedPhotos:s,isSavingAlbum:l,onRemovePhoto:x})=>{const{t:g}=te();return s.length===0?null:e.jsxs(e.Fragment,{children:[e.jsxs(Ve,{children:[s.length," ",s.length>1?g("photos selected"):g("photo selected"),":"]}),e.jsx(He,{children:s.map((i,A)=>{var k,P;return e.jsxs(Ke,{children:[e.jsx(Qe,{status:i.status,children:i.status==="complete"?"✓":i.status==="error"?"✕":i.status==="uploading"?"↑":i.status==="processing"?"⚙️":"•"}),e.jsxs(Ye,{children:[i.type==="video"||(k=i.type)!=null&&k.startsWith("video")?e.jsx(Xe,{src:i.s3PreviewUrl,controls:!0}):e.jsx(Ze,{src:i.s3PreviewUrl,alt:i.fileName}),(i.status==="uploading"||i.status==="processing")&&e.jsx(Le,{children:e.jsx(et,{progress:i.progress,status:i.status})})]}),e.jsxs(tt,{children:[(P=i.type)!=null&&P.startsWith("video")?g("Video"):g("Image"),i.size&&` • ${(i.size/1024/1024).toFixed(1)} MB`,i.duration&&` • ${i.duration}s`]}),i.status==="error"&&i.errorMessage&&e.jsxs(st,{children:[g("Error"),": ",i.errorMessage.length>40?i.errorMessage.substring(0,37)+"...":i.errorMessage]}),e.jsx(rt,{onClick:()=>x(A),disabled:l,children:g("Remove")})]},A)})})]})},qt=({progressTracker:s})=>{const{t:l}=te();return s.totalFiles===0?null:e.jsxs(ke,{children:[e.jsx(Oe,{children:l("Upload Progress")}),e.jsxs(Ne,{children:[e.jsxs(Re,{children:[e.jsxs("span",{children:[l("Overall Progress"),": ",Math.round(s.overallProgress*100),"%"]}),e.jsxs("span",{children:[s.filesComplete," ",l("of")," ",s.totalFiles," ",l("complete")]})]}),e.jsx(Ue,{children:e.jsx(Be,{progress:s.overallProgress})})]}),e.jsxs(Me,{children:[s.filesUploading>0&&e.jsxs(ie,{children:[l("Uploading"),": ",s.filesUploading]}),s.filesProcessing>0&&e.jsxs(ie,{children:[l("Processing"),": ",s.filesProcessing]}),s.filesComplete>0&&e.jsxs(ie,{children:[l("Complete"),": ",s.filesComplete]}),s.filesWithError>0&&e.jsxs(ie,{isError:!0,children:[l("Failed"),": ",s.filesWithError]})]})]})},Wt=({isSavingAlbum:s,savingProgress:l})=>{const{t:x}=te();return s?e.jsxs(ze,{children:[e.jsx(qe,{children:x("Saving Album")}),e.jsx(We,{id:"saveProgressText",children:x("Moving files...")}),e.jsx(Je,{children:e.jsx(Ge,{id:"saveProgress",style:{width:`${l}%`}})})]}):null},Jt=({isSubAlbum:s,selectedPhotos:l,selectedFileIds:x})=>{const{t:g}=te();return!s||l.length===0&&x.length===0?null:e.jsxs("div",{style:{backgroundColor:"#e3f2fd",padding:"15px",borderRadius:"8px",marginBottom:"20px",fontSize:"16px"},children:[e.jsxs("p",{style:{margin:0},children:[g("Creating a new sub-album with")," ",e.jsx("strong",{children:x.length})," ",g("selected items")]}),e.jsx("p",{style:{margin:"10px 0 0 0",fontSize:"14px",color:"#0277bd"},children:g("You can add more photos or videos to this sub-album before saving")}),l.length>0&&e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:"10px",marginTop:"15px",justifyContent:"flex-start"},children:[l.slice(0,5).map((i,A)=>e.jsxs("div",{style:{width:"80px",height:"80px",position:"relative",borderRadius:"4px",overflow:"hidden",boxShadow:"0 1px 3px rgba(0,0,0,0.12)"},children:[e.jsx("img",{src:i.s3PreviewUrl,alt:i.fileName,style:{width:"100%",height:"100%",objectFit:"cover"}}),i.type==="video"&&e.jsx("div",{style:{position:"absolute",bottom:"5px",right:"5px",backgroundColor:"rgba(0,0,0,0.7)",color:"white",fontSize:"10px",padding:"2px 4px",borderRadius:"2px"},children:i.duration?`${Math.floor(i.duration)}s`:"Video"})]},A)),l.length>5&&e.jsxs("div",{style:{width:"80px",height:"80px",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"#bbdefb",borderRadius:"4px",color:"#0d47a1",fontWeight:"bold"},children:["+",l.length-5," ",g("more")]})]})]})},Gt=({showFolderDetails:s,isCreator:l,folderName:x,setFolderName:g,folderDescription:i,setFolderDescription:A,isOnPublicProfile:k,handlePublicProfileToggle:P,participantsCanAddItems:j,handleParticipantsCanAddItemsToggle:O,isSavingAlbum:M})=>{const{t:p}=te();return!s||l!==!0?null:e.jsxs(it,{children:[e.jsxs(pe,{children:[e.jsx(me,{htmlFor:"folderName",children:p("Album Name (Optional)")}),e.jsx(ot,{id:"folderName",type:"text",value:x,onChange:r=>g(r.target.value),placeholder:p("Enter album name")})]}),e.jsxs(pe,{children:[e.jsx(me,{htmlFor:"folderDescription",children:p("Album Description (Optional)")}),e.jsx(at,{id:"folderDescription",value:i,onChange:r=>A(r.target.value),placeholder:p("Enter album description"),rows:4})]}),e.jsxs(ge,{children:[e.jsx(he,{children:p(k?"On Public Profile":"Not On Public Profile")}),e.jsxs(be,{children:[e.jsx("input",{type:"checkbox",checked:k,onChange:P,disabled:M}),e.jsx(xe,{})]})]}),e.jsxs(ge,{children:[e.jsx(he,{children:p(j?"Participants Can Add Items":"Participants Cannot Add Items")}),e.jsxs(be,{children:[e.jsx("input",{type:"checkbox",checked:j,onChange:O,disabled:M}),e.jsx(xe,{})]})]})]})},te=()=>({t:s=>s,language:"en"}),Vt=()=>{const{t:s,language:l}=Se(),x=ye(l)==="rtl",{setShowUsernamePrompt:g,setUsernameInput:i}=Pe(s),[A,k]=y.useState(null),[P,j]=y.useState([]),[O,M]=y.useState([]),[p,r]=y.useState({totalFiles:0,filesComplete:0,filesUploading:0,filesProcessing:0,filesWithError:0,overallProgress:0}),[N,T]=y.useState(!1),[t,q]=y.useState(0),[W,K]=y.useState(""),[Q,Y]=y.useState(""),[ee,I]=y.useState(!1),[c,_]=y.useState(!1),[h,D]=y.useState("NoPassword"),[E,$]=y.useState(""),[o,d]=y.useState(!1),[m,a]=y.useState(!0),[v,n]=y.useState(null),[f,u]=y.useState(!1),[S,C]=y.useState([]),B=$t(M),J=Ft(j),b=(w,F)=>{let R=`[${new Date().toISOString()}] ${w}`;if(F!==void 0)try{const Z=typeof F=="object"?JSON.stringify(F,null,2):String(F);R+=`
Data: ${Z}`,console.log(R),console.log("Data object:",F)}catch(Z){R+=` [Error stringifying data: ${Z}]`,console.log(R),console.log("Raw data:",F)}else console.log(R);B(R)},{cognitoUsername:X,publicUsername:z,setPublicUsername:se}=Rt(k,j,n,I,K,Y,d,a,D,$,u,C,b),{saveAlbumDirectly:G}=Ut(A,X,P,f,S,W,Q,o,m,h,E,T,q,j,r,b);y.useEffect(()=>{P.length>0&&(localStorage.setItem(H.SELECTED_PHOTOS,JSON.stringify(P)),b(`Saved ${P.length} photos to localStorage`))},[P]),y.useEffect(()=>{It(P,r)},[P]);const Ie=w=>{b(`Removing photo at index: ${w}`);const F=P.filter((V,R)=>R!==w);j(F),b(`New photos count: ${F.length}`),F.length>0?(localStorage.setItem(H.SELECTED_PHOTOS,JSON.stringify(F)),b(`Updated localStorage with ${F.length} photos`)):(localStorage.removeItem(H.SELECTED_PHOTOS),b("Removed photos from localStorage"))},$e=async w=>{if(b("Add photos triggered from file input"),!X){b("No Cognito username available, cannot add photos");return}const F=Array.from(w.target.files||[]);if(b(`Selected ${F.length} files`),!!F.length)try{const V=Bt(F);b(`Created ${V.length} initial photo objects`),j(re=>[...re,...V]);const R=P.length;b(`Starting processing at index: ${R}`);const Z=await jt(F,X,(re,ue,fe,Te)=>{J(R+re,ue,fe,Te),b(`Updated status for photo ${R+re}: ${ue}, progress: ${fe}`)},b);b(`Updating ${Z.length} photos with processed info`),Mt(R,Z,j,b)}catch(V){console.error("Error in handleAddPhotos:",V),b(`Error in handleAddPhotos: ${V}`)}finally{w.target.value="",b("Reset file input value")}},je=()=>{const w=!o;b(`Toggling isOnPublicProfile to: ${w}`),d(w)},Fe=()=>{const w=!m;b(`Toggling participantsCanAddItems to: ${w}`),a(w)},_e=async()=>{b("Album save initiated"),T(!0);try{if(z!=null&&z.startsWith("Profile-")){b("Public username starts with 'Profile-', showing username prompt"),i(z),g(!0),T(!1);return}b("Valid username found, proceeding to save album directly"),G()}catch(w){console.error("Error in handleSaveAlbum:",w),b(`Error in handleSaveAlbum: ${w}`),T(!1)}},Ce=w=>{b(`Handling successful username update to: ${w}`),localStorage.setItem("publicUsername",w),se(w),g(!1),b("Proceeding to save album after username update"),G()},Ae=(w,F)=>{b(`Password dialog closed with option: ${w}, password: ${F?"******":"undefined"}`),w&&D(w),F!==void 0&&$(F),_(!1)},De=()=>h==="NoPassword"?s("Album Password Policy"):`${s(h==="NotVisible"?"Password Required To See Or Save":h==="Watermark"?"Password Required To Remove Watermark Or Save":"Password Required To Save")} ${E?`(${E})`:""}`,Ee=()=>{b("Opening password dialog"),_(!0)};return e.jsxs(e.Fragment,{children:[e.jsx(dt,{}),e.jsxs(ct,{isRTL:x,children:[e.jsxs("div",{style:{maxWidth:"900px",margin:"0 auto"},children:[e.jsxs(ut,{children:[e.jsx(ft,{href:"/my-albums.html",children:s("My Albums")}),e.jsx(Pt,{t:s})]}),e.jsx(qt,{progressTracker:p}),e.jsx(Wt,{isSavingAlbum:N,savingProgress:t}),e.jsx(pt,{id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:$e}),e.jsx(Jt,{isSubAlbum:f,selectedPhotos:P,selectedFileIds:S}),e.jsx(zt,{selectedPhotos:P,isSavingAlbum:N,onRemovePhoto:Ie}),e.jsxs(mt,{children:[e.jsx(Gt,{showFolderDetails:ee,isCreator:v,folderName:W,setFolderName:K,folderDescription:Q,setFolderDescription:Y,isOnPublicProfile:o,handlePublicProfileToggle:je,participantsCanAddItems:m,handleParticipantsCanAddItemsToggle:Fe,isSavingAlbum:N}),e.jsx(gt,{onClick:()=>{const w=document.getElementById("file-input");w==null||w.click()},disabled:N,children:s("Add More Photos")}),v===!0&&e.jsx(ht,{passwordSet:h!=="NoPassword",onClick:Ee,disabled:N,children:De()}),e.jsx(bt,{onClick:_e,disabled:N,children:s(N?"Saving Album...":"Save Album")})]}),e.jsx(xt,{t:s,language:l,usernameManager:Pe(s),onSuccess:Ce}),c&&e.jsx(Ot,{isOpen:c,onClose:Ae,initialOption:h,initialPassword:E})]}),e.jsx(vt,{debugMessages:O,t:s,isRTL:x,textDirection:x?"rtl":"ltr"})]})]})},Ht=()=>e.jsx(nt,{children:e.jsx(Vt,{})});lt.createRoot(document.getElementById("root")).render(e.jsx(Ht,{}));
