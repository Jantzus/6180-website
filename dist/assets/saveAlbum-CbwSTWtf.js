import{u as Q,r as I,j as e,g as Se,R as Ne,I as Oe,b as K,a as de}from"./index-BQCoonNn.js";import{u as pe,G as Re,A as Ue,C as Be,H as ze,B as Me,a as qe,b as We,c as Je,S as Ve,P as Ge,d as He,U as Ke,e as Qe,f as Ye,O as Xe,g as Ze,h as Le,i as et,j as tt,k as oe,l as st,m as rt,n as it,o as ot,p as at,q as lt,r as nt,s as dt,t as ct,M as ut,V as ft,v as pt,w as mt,x as gt,F as ht,E as bt,R as xt,y as Pt,z as me,D as ge,I as vt,J as wt,T as he,K as be,L as xe,N as Pe}from"./customHooks-BZkNMluP.js";import{u as St,b as yt,p as It,d as $t,e as se,g as ue,s as jt,m as Ft,f as Ct}from"./utils-MSJ8woNW.js";import{d as U}from"./styled-components.browser.esm-CpMl8bPK.js";import{L as _t,D as At}from"./DebugLog-7mBNLpH8.js";const Dt=U.div`
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
`,Et=U.div`
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`,kt=U.div`
  font-size: 18px;
  font-weight: 500;
  color: white;
  background-color: #888;
  padding: 15px 20px;
  text-align: center;
`,Tt=U.div`
  direction: ${s=>s.isRTL?"rtl":"ltr"};
  padding: 30px;
`,ve=U.p`
  margin-bottom: 15px;
  font-size: 16px;
`,Nt=U.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 25px;
  margin-top: 20px;
  box-sizing: border-box;
`,Ot=U.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
`,ae=U.div`
  display: flex;
  align-items: center;
  cursor: ${s=>s.disabled?"not-allowed":"pointer"};
  opacity: ${s=>s.disabled?.7:1};
`,le=U.input`
  margin-right: 10px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  
  &:disabled {
    cursor: not-allowed;
  }
`,ne=U.label`
  display: flex;
  cursor: ${s=>s.disabled?"not-allowed":"pointer"};
  font-size: 16px;
`,ce=U.span`
  color: #aaa;
  margin-left: 8px;
`,Rt=U.div`
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
`,Ut=({isOpen:s,onClose:d,initialOption:S="NoPassword",initialPassword:v=""})=>{const{t:i,language:T}=Q(),O=Se(T)==="rtl",[w,D]=I.useState(S),[N,M]=I.useState(v);if(I.useEffect(()=>{s&&(D(S),M(v))},[s,S,v]),!s)return null;const m=N.trim()==="",r=k=>{k!=="NoPassword"&&m||D(k)},R=k=>{k.target===k.currentTarget&&d()};return e.jsx(Dt,{onClick:R,children:e.jsxs(Et,{children:[e.jsx(kt,{children:i("Album Password Policy")}),e.jsxs(Tt,{isRTL:O,children:[e.jsx(ve,{children:i("Enter a password for this album.")}),e.jsx(Nt,{type:"text",placeholder:i("Enter password"),value:N,onChange:k=>M(k.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"}),e.jsx(ve,{children:i("Select password restrictions.")}),e.jsxs(Ot,{children:[e.jsxs(ae,{disabled:m,children:[e.jsx(le,{type:"radio",name:"protection",id:"notVisible",checked:w==="NotVisible",onChange:()=>{},disabled:m,onClick:()=>!m&&r("NotVisible")}),e.jsxs(ne,{htmlFor:"notVisible",disabled:m,children:[i("Password Required To See Or Save"),m&&e.jsx(ce,{children:i("Password required")})]})]}),e.jsxs(ae,{disabled:m,children:[e.jsx(le,{type:"radio",name:"protection",id:"watermark",checked:w==="Watermark",onChange:()=>{},disabled:m,onClick:()=>!m&&r("Watermark")}),e.jsxs(ne,{htmlFor:"watermark",disabled:m,children:[i("Password Required To Remove Watermark Or Save"),m&&e.jsx(ce,{children:i("Password required")})]})]}),e.jsxs(ae,{disabled:m,children:[e.jsx(le,{type:"radio",name:"protection",id:"cannotBeSaved",checked:w==="CannotBeSaved",onChange:()=>{},disabled:m,onClick:()=>!m&&r("CannotBeSaved")}),e.jsxs(ne,{htmlFor:"cannotBeSaved",disabled:m,children:[i("Password Required To Save"),m&&e.jsx(ce,{children:i("Password required")})]})]}),e.jsxs(ae,{disabled:!1,children:[e.jsx(le,{type:"radio",name:"protection",id:"noPassword",checked:w==="NoPassword",onChange:()=>{},onClick:()=>r("NoPassword")}),e.jsx(ne,{htmlFor:"noPassword",disabled:!1,children:i("No Password")})]})]}),e.jsxs(Rt,{children:[e.jsx(we,{onClick:()=>d(),children:i("Cancel")}),e.jsx(we,{onClick:()=>{console.log(`Saving with option: ${w}, password: ${N.length>0?"********":"none"}`),d(w,N)},children:i("Save")})]})]})]})})},Bt=`
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
`,zt=(s,d,S,v,i,T,O,w,D,N,M,m,r)=>{const[R,k]=I.useState(null),[t,J]=I.useState(null),V=async $=>{r(`Initializing folder ID with username: ${$}`);try{const F=new URLSearchParams(window.location.search).get("folderId");if(r(`Folder ID from URL: ${F||"null"}`),F){s(F),r(`Using existing folder ID: ${F}`);try{r(`Fetching details for folder: ${F}`);const b=await Y(F,r);if(r("Folder details retrieved:",b),b){const A=`${$}_____${$}____Account`,E=b.creatorId===A;if(r(`User is creator of folder: ${E}, accountId: ${A}, creator: ${b.creatorId}`),S(E),E){r("User is creator, showing folder details"),v(!0),i(b.folderName),T(b.folderDescription),O(b.isOnPublicProfile),r(`Setting isOnPublicProfile: ${b.isOnPublicProfile}`),b.participantsCanAddItems!==void 0&&(w(b.participantsCanAddItems),r(`Setting participantsCanAddItems: ${b.participantsCanAddItems}`));const j=b.passwordPolicy;r(`Password policy from folder details: ${j}`),D(j),j!=="NoPassword"&&b.password&&N(b.password),r(`Set password protection option to: ${j}`)}else r("User is NOT the creator, hiding editable fields"),v(!1)}else r("No folder details retrieved, setting isCreator to false"),S(!1)}catch(b){console.error("Error fetching folder details:",b),r(`Error fetching folder details: ${b}`),S(!1)}}else{const b=`${$}_____${ue()}____Folder`;r(`Creating new folder ID: ${b}`),s(b),r("Setting isCreator to true for new album"),S(!0),v(!0)}}catch(c){console.error("Folder ID initialization error:",c),r(`Folder ID initialization error: ${c}`),S(!1)}},Y=async($,c)=>{var F,b,A,E,j,o,n,g;c(`Fetching details for folder ID: ${$}`);try{const a=await se();if(!a)return c("No token available for fetching folder details"),null;c("Sending GraphQL query to fetch folder details");const l=await(await fetch(de,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({query:Bt,variables:{folderIds:[$]}})})).json();if(c("Folder details API response:",l),l.errors)return console.error("GraphQL errors:",l.errors),c(`GraphQL errors: ${JSON.stringify(l.errors)}`),null;const f=((b=(F=l==null?void 0:l.data)==null?void 0:F.fetchFolders)==null?void 0:b.items)||[];if(c(`Found ${f.length} folder items`),f.length===0)return c("No folder items found"),null;const u=f[0];c("Retrieved folder data:",u);const y=((E=(A=u.folderPosition)==null?void 0:A.profileIds)==null?void 0:E.some(B=>B.includes("Public____Profile")))||!1;c(`Folder is on public profile: ${y}`),c("Profile IDs:",(j=u.folderPosition)==null?void 0:j.profileIds);const C=(o=u.folderInviteParameters)==null?void 0:o.usingFolderInviteGrantsRightToAddItems;return c(`Participants can add items: ${C}`),{creatorId:u.creatorId||"",folderName:u.folderName||"",folderDescription:u.folderDescription||"",passwordPolicy:((n=u.folderPassword)==null?void 0:n.policy)||"NoPassword",password:((g=u.folderPassword)==null?void 0:g.password)||"",isOnPublicProfile:y,participantsCanAddItems:C!==void 0?C:!0}}catch(a){return console.error("Error in fetchFolderDetails:",a),c(`Error in fetchFolderDetails: ${a}`),null}},X=()=>{r("Attempting to restore photos from localStorage");try{const $=localStorage.getItem(K.SELECTED_PHOTOS);if(r(`Found stored photos: ${$?"yes":"no"}`),$)try{const c=JSON.parse($);r(`Parsed ${c.length} photos from localStorage`),Array.isArray(c)&&c.length>0&&(d(c),r(`Restored ${c.length} photos to state`))}catch(c){console.error("Error parsing stored photos:",c),r(`Error parsing stored photos: ${c}`)}}catch($){console.error("Error restoring photos from storage:",$),r(`Error restoring photos from storage: ${$}`)}},Z=()=>{r("Testing S3 connection");try{jt?r("S3 client is available"):(console.error("S3 client not available"),r("S3 client not available"))}catch($){console.error("S3 connection test error:",$),r(`S3 connection test error: ${$}`)}},re=async()=>{var $;r("Starting component initialization");try{r("Checking login with refresh");const c=await se();if(!c){r("No token returned from login check, aborting initialization");return}try{const F=localStorage.getItem("publicUsername");r(`Retrieved public username from localStorage: ${F||"null"}`),J(F||null);const A=JSON.parse(atob(c.split(".")[1]))["cognito:username"];if(A){r(`Extracted Cognito username from token: ${A}`),k(A);const E=localStorage.getItem(K.SUB_ALBUM_DATA);if(r(`Sub-album data from localStorage: ${E||"null"}`),E)try{const j=JSON.parse(E);if(r("Parsed sub-album data:",j),j.isSubAlbum&&(($=j.selectedFileIds)==null?void 0:$.length)>0){r(`Valid sub-album data found with ${j.selectedFileIds.length} files`),M(!0),m(j.selectedFileIds),j.selectedPhotos&&j.selectedPhotos.length>0&&(r(`Found ${j.selectedPhotos.length} selected photos in sub-album data`),d(j.selectedPhotos)),v(!0),S(!0);const o=`${A}_____${ue()}____Folder`;r(`Generated new folder ID for sub-album: ${o}`),s(o)}else r("Invalid sub-album data, proceeding with normal initialization"),await V(A)}catch(j){console.error("Error parsing sub-album data:",j),r(`Error parsing sub-album data: ${j}`),await V(A)}else r("No sub-album data found, proceeding with normal folder initialization"),await V(A)}else r("No Cognito username found in token")}catch(F){console.error("User data initialization error:",F),r(`User data initialization error: ${F}`)}X(),Z(),r("Component initialization completed")}catch(c){console.error("Initialization error:",c),r(`Initialization error: ${c}`)}};return I.useEffect(()=>{re()},[]),{cognitoUsername:R,publicUsername:t,setPublicUsername:J}},Mt=(s,d,S,v,i,T,O,w,D,N,M,m,r,R,k,t)=>{const J=o=>{t(`Save progress text: ${o}`);const n=document.getElementById("saveProgressText");n&&(n.innerText=o)},V=o=>{const n=document.getElementById("saveProgress");n?(n.style.width=`${o}%`,t(`Updated save progress bar: ${o}%`)):t("Progress bar element not found"),r(o)},Y=(o,n)=>{t(`Splitting array of ${o.length} items into chunks of ${n}`);const g=[];for(let a=0;a<o.length;a+=n)g.push(o.slice(a,a+n));return t(`Created ${g.length} chunks`),g},X=o=>{const n=new Set;return o.filter(g=>n.has(g.fileId)?(t(`Skipping duplicate file reference with ID: ${g.fileId}`),!1):(n.add(g.fileId),!0))},Z=(o,n,g)=>{t("Creating folder position input"),t(`Profile visibility: ${w?"Public":"Only Me"}`);const a=w?[`${d}_____Public____Profile`]:["Only Me_____Only Me____Profile"];t(`Profile IDs: ${JSON.stringify(a)}`);let x=[];v&&i.length>0&&(t(`Creating file reference IDs for ${i.length} sub-album files`),x=i.map(f=>{const u=f.split("_____");if(u.length>=2){const C=u[1].split("____")[0],B=`${g}_____${C}____FileReference`;return t(`Created file reference ID for sub-album: ${B}`),B}return t(`Using original fileId as fallback: ${f}`),f})),t(`Created ${x.length} acceptedFileReferenceIds`);const l=N!=="NoPassword"?M:null;return t(`Password protection: ${N}`),t(`Album password: ${l?"******":"null"}`),t(`Participants can add items: ${D}`),{currentTime:o,folderId:s,profileIds:a,folderPositionSelectedTagInputs:[],folderPositionPoints:1,acceptedFileReferenceIds:x,folderInput:{folderSelectedTagInputs:[],folderAboutContactIds:[n],folderName:T,folderDescription:O,folderPasswordInput:{password:l,policy:N},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,usingFolderInviteGrantsRightToRemoveItems:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:D,addedItemsNeedFolderCreatorApproval:!1}}}},re=(o,n,g)=>(t(`Creating file reference inputs for ${o.length} photos`),o.map(a=>{var f;if(a.fileId)return t(`Using existing fileId for photo: ${a.fileId}`),{fileReferencesHolderId:s,currentTime:n,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:a.fileId,fileInput:null};const x=a.type==="video"||(f=a.type)!=null&&f.startsWith("video")?`Input/Video/${a.fileName}`:`Input/Image/${a.fileName}`,l=`${d}_____${a.fileName}____File`;return t(`Created file reference for ${a.fileName}:`),t(`  - dataKey: ${x}`),t(`  - fileId: ${l}`),t(`  - thumbnailDataKey: ${a.thumbnailDataKey||"undefined"}`),t(`  - size: ${a.size}`),t(`  - thumbnailSize: ${a.thumbnailSize||0}`),t(`  - duration: ${a.duration||"undefined"}`),{fileReferencesHolderId:s,currentTime:n,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:l,fileInput:{fileId:l,ownerFileInput:{editorContactIds:[g],FileSharingOptionsEnum:"Anyone",dataKey:x,thumbnailDataKey:a.thumbnailDataKey,dataInBytes:a.size,thumbnailDataInBytes:a.thumbnailSize||0,s3UploadedAt:n,durationInSeconds:a.duration},editorFileInput:{aboutContactIds:[g],captionText:"",numericFilterInputs:[]}}}})),$=async o=>{var x,l;t("Sending folder-only mutation (no file references)");const n=await se();if(!n)throw t("No token available for saving album, aborting"),new Error("Authentication token not available");const g=`
      mutation MyMutation($folderPositionInputs: [FolderPositionInput!]) {
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items {
            id
          }
        }
      }
    `,a={folderPositionInputs:[o]};t("GraphQL folder-only mutation variables:",a);try{t("Sending API request to save folder");const f=await fetch(de,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({query:g,variables:a})});t(`API response status: ${f.status}`);const u=await f.text();t(`API response raw text: ${u}`);const y=JSON.parse(u);if(t("API response JSON:",y),y.errors)throw console.error("Folder save failed:",y.errors),t("Folder save failed with errors:",y.errors),new Error("Failed to save folder");return t("Folder saved successfully"),((l=(x=y.data)==null?void 0:x.changeFiles)==null?void 0:l.items)||[]}catch(f){throw console.error("Error in sendFolderOnlyMutation:",f),t(`Error in sendFolderOnlyMutation: ${f}`),f}},c=async o=>{var x,l,f,u,y;t(`Sending file references-only mutation with ${o.length} items`);const n=await se();if(!n)throw t("No token available for saving file references, aborting"),new Error("Authentication token not available");const g=`
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
    `,a={updatedFileReferenceInputs:o};t("GraphQL file references-only mutation variables (first item):",o.length>0?o[0]:"No items");try{t("Sending API request to save file references");const C=await fetch(de,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({query:g,variables:a})});t(`API response status: ${C.status}`);const B=await C.text();t(`API response raw text: ${B.substring(0,500)}...`);const G=JSON.parse(B);if(t("API response JSON items count:",((f=(l=(x=G.data)==null?void 0:x.changeFiles0)==null?void 0:l.items)==null?void 0:f.length)||0),G.errors)throw console.error("File references save failed:",G.errors),t("File references save failed with errors:",G.errors),new Error("Failed to save file references");return t("File references chunk saved successfully"),((y=(u=G.data)==null?void 0:u.changeFiles0)==null?void 0:y.items)||[]}catch(C){throw console.error("Error in sendFileReferencesOnlyMutation:",C),t(`Error in sendFileReferencesOnlyMutation: ${C}`),C}},F=async(o,n)=>{var l,f,u,y,C,B,G,h,L;t(`Sending final chunk with folder mutation (${o.length} file references)`);const g=await se();if(!g)throw t("No token available for saving final chunk, aborting"),new Error("Authentication token not available");const a=`
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
    `,x={folderPositionInputs:[n],updatedFileReferenceInputs:o};t("GraphQL final mutation variables (folder + last chunk)");try{t("Sending API request for final save with folder");const q=await fetch(de,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${g}`},body:JSON.stringify({query:a,variables:x})});t(`API response status: ${q.status}`);const ie=await q.text();t(`API response raw text: ${ie.substring(0,500)}...`);const H=JSON.parse(ie);if(t("API response JSON:",{fileReferencesCount:((u=(f=(l=H.data)==null?void 0:l.changeFiles0)==null?void 0:f.items)==null?void 0:u.length)||0,folderItems:((C=(y=H.data)==null?void 0:y.changeFiles)==null?void 0:C.items)||[]}),H.errors)throw console.error("Final save failed:",H.errors),t("Final save failed with errors:",H.errors),new Error("Failed to complete album save");return t("Final chunk and folder saved successfully"),{fileReferences:((G=(B=H.data)==null?void 0:B.changeFiles0)==null?void 0:G.items)||[],folderPositions:((L=(h=H.data)==null?void 0:h.changeFiles)==null?void 0:L.items)||[]}}catch(q){throw console.error("Error in sendFinalChunkWithFolderMutation:",q),t(`Error in sendFinalChunkWithFolderMutation: ${q}`),q}},b=async()=>(t("Validating required data"),await se()?d?s?(t("All required data validated successfully"),!0):(t("No folder ID, validation failed"),!1):(t("No Cognito username, validation failed"),!1):(t("No token available, validation failed"),!1)),A=()=>{t("Handling successful save"),Ct(R,k,[K.SELECTED_PHOTOS,K.SUB_ALBUM_DATA],t),t("Album data cleared");const o=document.getElementById("saveProgressText");o&&(o.innerText="Album saved successfully!",t("Updated progress text to 'Album saved successfully!'")),sessionStorage.setItem("album_just_saved","true"),t("Set 'album_just_saved' flag in sessionStorage"),t("Setting timeout for redirect to my-albums.html"),setTimeout(()=>{t("Redirecting to my-albums.html"),window.location.href="/my-albums.html"},1e3)},E=async(o,n)=>{t("Starting chunked save process");try{J("Processing files in chunks...");const g=48;if(n.length===0)t("No file references to process, saving only folder position"),await $(o);else{const a=X(n);t(`After removing duplicates, processing ${a.length} unique file references`);const x=Y(a,g);t(`Split file references into ${x.length} chunks of max size ${g}`);for(let l=0;l<x.length;l++){const f=x[l];t(`Processing chunk ${l+1} of ${x.length} with ${f.length} file references`);const u=l/x.length*80;r(10+u),V(10+u),l<x.length-1?(J(`Saving files: chunk ${l+1} of ${x.length}...`),await c(f)):(J("Finalizing album..."),await F(f,o))}}r(100),V(100),J("Album saved successfully!"),A()}catch(g){console.error("Error in chunked save process:",g),t(`Error in chunked save process: ${g}`),J(`Error: ${g}`),m(!1)}};return{saveAlbumDirectly:async()=>{t("Starting direct album save"),m(!0),r(5);try{if(t("Validating required data for save"),!await b()){t("Required data validation failed, aborting save"),m(!1);return}const o=Math.floor(Date.now()/1e3),n=`${d}_____${d}____Account`,a=s.split("_____")[1].split("____")[0];t(`Save timestamp: ${o}`),t(`Account ID: ${n}`),t(`Folder ID: ${s}`),t(`Folder target item identifier: ${a}`),t("Creating folder position input");const x=Z(o,n,a);t("Folder position input created:",x);let l=[];const f=S.filter(u=>u.status==="complete");if(t(`Found ${f.length} valid photos with 'complete' status`),f.length>0){const u=f.filter(C=>!C.fileId);t(`Found ${u.length} new uploads to move from temp to public folder`),u.length>0&&(t("Moving files from temp to public folder"),await Ft(u,V,t)),t("Creating file reference inputs for uploads");const y=re(f,o,n);t(`Created ${y.length} file reference inputs for uploads`,y),l=l.concat(y)}if(v&&i.length>0){t(`Adding ${i.length} existing file references for sub-album`);const u=i.map(y=>(t(`Creating file reference for existing file ID: ${y}`),{fileReferencesHolderId:s,currentTime:o,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:y,fileInput:null}));t(`Created ${u.length} file reference inputs for existing files`,u),l=l.concat(u)}t(`Total file reference inputs: ${l.length}`),t("Sending GraphQL mutations with chunked file references"),await E(x,l)}catch(o){console.error("Error in saveAlbumDirectly:",o),t(`Error in saveAlbumDirectly: ${o}`),m(!1)}}}},qt=({selectedPhotos:s,isSavingAlbum:d,onRemovePhoto:S})=>{const{t:v}=Q();return s.length===0?null:e.jsxs(e.Fragment,{children:[e.jsxs(lt,{children:[s.length," ",s.length>1?v("photos selected"):v("photo selected"),":"]}),e.jsx(nt,{children:s.map((i,T)=>{var O,w;return e.jsxs(dt,{children:[e.jsx(ct,{status:i.status,children:i.status==="complete"?"✓":i.status==="error"?"✕":i.status==="uploading"?"↑":i.status==="processing"?"⚙️":"•"}),e.jsxs(ut,{children:[i.type==="video"||(O=i.type)!=null&&O.startsWith("video")?e.jsx(ft,{src:i.s3PreviewUrl,controls:!0}):e.jsx(pt,{src:i.s3PreviewUrl,alt:i.fileName}),(i.status==="uploading"||i.status==="processing")&&e.jsx(mt,{children:e.jsx(gt,{progress:i.progress,status:i.status})})]}),e.jsxs(ht,{children:[(w=i.type)!=null&&w.startsWith("video")?v("Video"):v("Image"),i.size&&` • ${(i.size/1024/1024).toFixed(1)} MB`,i.duration&&` • ${i.duration}s`]}),i.status==="error"&&i.errorMessage&&e.jsxs(bt,{children:[v("Error"),": ",i.errorMessage.length>40?i.errorMessage.substring(0,37)+"...":i.errorMessage]}),e.jsx(xt,{onClick:()=>S(T),disabled:d,children:v("Remove")})]},T)})})]})},Wt=({progressTracker:s})=>{const{t:d}=Q();return s.totalFiles===0?null:e.jsxs(Qe,{children:[e.jsx(Ye,{children:d("Upload Progress")}),e.jsxs(Xe,{children:[e.jsxs(Ze,{children:[e.jsxs("span",{children:[d("Overall Progress"),": ",Math.round(s.overallProgress*100),"%"]}),e.jsxs("span",{children:[s.filesComplete," ",d("of")," ",s.totalFiles," ",d("complete")]})]}),e.jsx(Le,{children:e.jsx(et,{progress:s.overallProgress})})]}),e.jsxs(tt,{children:[s.filesUploading>0&&e.jsxs(oe,{children:[d("Uploading"),": ",s.filesUploading]}),s.filesProcessing>0&&e.jsxs(oe,{children:[d("Processing"),": ",s.filesProcessing]}),s.filesComplete>0&&e.jsxs(oe,{children:[d("Complete"),": ",s.filesComplete]}),s.filesWithError>0&&e.jsxs(oe,{isError:!0,children:[d("Failed"),": ",s.filesWithError]})]})]})},Jt=({isSavingAlbum:s,savingProgress:d})=>{const{t:S}=Q();return s?e.jsxs(st,{children:[e.jsx(rt,{children:S("Saving Album")}),e.jsx(it,{id:"saveProgressText",children:S("Moving files...")}),e.jsx(ot,{children:e.jsx(at,{id:"saveProgress",style:{width:`${d}%`}})})]}):null},Vt=({isSubAlbum:s,selectedPhotos:d,selectedFileIds:S})=>{const{t:v}=Q();return!s||d.length===0&&S.length===0?null:e.jsxs("div",{style:{backgroundColor:"#e3f2fd",padding:"15px",borderRadius:"8px",marginBottom:"20px",fontSize:"16px"},children:[e.jsxs("p",{style:{margin:0},children:[v("Creating a new sub-album with")," ",e.jsx("strong",{children:S.length})," ",v("selected items")]}),e.jsx("p",{style:{margin:"10px 0 0 0",fontSize:"14px",color:"#0277bd"},children:v("You can add more photos or videos to this sub-album before saving")}),d.length>0&&e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:"10px",marginTop:"15px",justifyContent:"flex-start"},children:[d.slice(0,5).map((i,T)=>e.jsxs("div",{style:{width:"80px",height:"80px",position:"relative",borderRadius:"4px",overflow:"hidden",boxShadow:"0 1px 3px rgba(0,0,0,0.12)"},children:[e.jsx("img",{src:i.s3PreviewUrl,alt:i.fileName,style:{width:"100%",height:"100%",objectFit:"cover"}}),i.type==="video"&&e.jsx("div",{style:{position:"absolute",bottom:"5px",right:"5px",backgroundColor:"rgba(0,0,0,0.7)",color:"white",fontSize:"10px",padding:"2px 4px",borderRadius:"2px"},children:i.duration?`${Math.floor(i.duration)}s`:"Video"})]},T)),d.length>5&&e.jsxs("div",{style:{width:"80px",height:"80px",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"#bbdefb",borderRadius:"4px",color:"#0d47a1",fontWeight:"bold"},children:["+",d.length-5," ",v("more")]})]})]})},Gt=({showFolderDetails:s,isCreator:d,folderName:S,setFolderName:v,folderDescription:i,setFolderDescription:T,isOnPublicProfile:O,handlePublicProfileToggle:w,participantsCanAddItems:D,handleParticipantsCanAddItemsToggle:N,isSavingAlbum:M})=>{const{t:m}=Q();return!s||d!==!0?null:e.jsxs(Pt,{children:[e.jsxs(me,{children:[e.jsx(ge,{htmlFor:"folderName",children:m("Album Name (Optional)")}),e.jsx(vt,{id:"folderName",type:"text",value:S,onChange:r=>v(r.target.value),placeholder:m("Enter album name")})]}),e.jsxs(me,{children:[e.jsx(ge,{htmlFor:"folderDescription",children:m("Album Description (Optional)")}),e.jsx(wt,{id:"folderDescription",value:i,onChange:r=>T(r.target.value),placeholder:m("Enter album description"),rows:4})]}),e.jsxs(he,{children:[e.jsx(be,{children:m(O?"On Public Profile":"Not On Public Profile")}),e.jsxs(xe,{children:[e.jsx("input",{type:"checkbox",checked:O,onChange:w,disabled:M}),e.jsx(Pe,{})]})]}),e.jsxs(he,{children:[e.jsx(be,{children:m(D?"Participants Can Add Items":"Participants Cannot Add Items")}),e.jsxs(xe,{children:[e.jsx("input",{type:"checkbox",checked:D,onChange:N,disabled:M}),e.jsx(Pe,{})]})]})]})},Ht=()=>{const{t:s,language:d}=Q(),S=Se(d)==="rtl",{setShowUsernamePrompt:v,setUsernameInput:i}=pe(s),[T,O]=I.useState(null),[w,D]=I.useState([]),[N,M]=I.useState([]),[m,r]=I.useState({totalFiles:0,filesComplete:0,filesUploading:0,filesProcessing:0,filesWithError:0,overallProgress:0}),[R,k]=I.useState(!1),[t,J]=I.useState(0),[V,Y]=I.useState(""),[X,Z]=I.useState(""),[re,$]=I.useState(!1),[c,F]=I.useState(!1),[b,A]=I.useState("NoPassword"),[E,j]=I.useState(""),[o,n]=I.useState(!1),[g,a]=I.useState(!0),[x,l]=I.useState(null),[f,u]=I.useState(!1),[y,C]=I.useState([]),B=yt(M),G=$t(D),h=(p,P)=>{let _=`[${new Date().toISOString()}] ${p}`;if(P!==void 0)try{const W=typeof P=="object"?JSON.stringify(P,null,2):String(P);_+=`
Data: ${W}`,console.log(_),console.log("Data object:",P)}catch(W){_+=` [Error stringifying data: ${W}]`,console.log(_),console.log("Raw data:",P)}else console.log(_);B(_)},{cognitoUsername:L,publicUsername:q,setPublicUsername:ie}=zt(O,D,l,$,Y,Z,n,a,A,j,u,C,h),{saveAlbumDirectly:H}=Mt(T,L,w,f,y,V,X,o,g,b,E,k,J,D,r,h);I.useEffect(()=>{w.length>0&&(localStorage.setItem(K.SELECTED_PHOTOS,JSON.stringify(w)),h(`Saved ${w.length} photos to localStorage`))},[w]),I.useEffect(()=>{St(w,r)},[w]);const ye=p=>{h(`Removing photo at index: ${p}`);const P=w.filter((z,_)=>_!==p);D(P),h(`New photos count: ${P.length}`),P.length>0?(localStorage.setItem(K.SELECTED_PHOTOS,JSON.stringify(P)),h(`Updated localStorage with ${P.length} photos`)):(localStorage.removeItem(K.SELECTED_PHOTOS),h("Removed photos from localStorage"))},Ie=async p=>{if(h("Add photos triggered from file input"),!L){h("No Cognito username available, cannot add photos");return}const P=Array.from(p.target.files||[]);if(h(`Selected ${P.length} files`),!!P.length)try{const z=$e(P);h(`Created ${z.length} initial photo objects`),D(ee=>[...ee,...z]);const _=w.length;h(`Starting processing at index: ${_}`);const W=await It(P,L,(ee,te,fe,Te)=>{G(_+ee,te,fe,Te),h(`Updated status for photo ${_+ee}: ${te}, progress: ${fe}`)},h);h(`Updating ${W.length} photos with processed info`),je(_,W)}catch(z){console.error("Error in handleAddPhotos:",z),h(`Error in handleAddPhotos: ${z}`)}finally{p.target.value="",h("Reset file input value")}},$e=p=>(h(`Creating initial photo objects for ${p.length} files`),p.map(P=>{const z=P.type,_=P.name.split(".").pop()||"jpg",W=`${ue()}.${_}`;return h(`Created initial photo object: ${W}, type: ${z}, size: ${P.size}`),{fileName:W,s3PreviewUrl:URL.createObjectURL(P),type:z,size:P.size,status:"pending",progress:0}})),je=(p,P)=>{h(`Updating photos with processed info, starting at index ${p}`),D(z=>{const _=[...z];return P.forEach((W,ee)=>{const te=p+ee;te<_.length&&(h(`Updating photo at index ${te} with processed info`),_[te]=W)}),_})},Fe=()=>{const p=!o;h(`Toggling isOnPublicProfile to: ${p}`),n(p)},Ce=()=>{const p=!g;h(`Toggling participantsCanAddItems to: ${p}`),a(p)},_e=async()=>{h("Album save initiated"),k(!0);try{if(q!=null&&q.startsWith("Profile-")){h("Public username starts with 'Profile-', showing username prompt"),i(q),v(!0),k(!1);return}h("Valid username found, proceeding to save album directly"),H()}catch(p){console.error("Error in handleSaveAlbum:",p),h(`Error in handleSaveAlbum: ${p}`),k(!1)}},Ae=p=>{h(`Handling successful username update to: ${p}`),localStorage.setItem("publicUsername",p),ie(p),v(!1),h("Proceeding to save album after username update"),H()},De=(p,P)=>{h(`Password dialog closed with option: ${p}, password: ${P?"******":"undefined"}`),p&&A(p),P!==void 0&&j(P),F(!1)},Ee=()=>b==="NoPassword"?s("Album Password Policy"):`${s(b==="NotVisible"?"Not Visible":b==="Watermark"?"Watermark":"Cannot Be Saved")} ${E?`(${E})`:""}`,ke=()=>{h("Opening password dialog"),F(!0)};return e.jsxs(e.Fragment,{children:[e.jsx(Re,{}),e.jsxs(Ue,{isRTL:S,children:[e.jsxs(Be,{children:[e.jsxs(ze,{children:[e.jsx(Me,{children:e.jsx(qe,{href:"/my-albums.html",children:s("My Albums")})}),e.jsx(_t,{t:s})]}),e.jsx(Wt,{progressTracker:m}),e.jsx(Jt,{isSavingAlbum:R,savingProgress:t}),e.jsx(We,{id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:Ie}),e.jsx(Vt,{isSubAlbum:f,selectedPhotos:w,selectedFileIds:y}),e.jsx(qt,{selectedPhotos:w,isSavingAlbum:R,onRemovePhoto:ye}),e.jsxs(Je,{children:[e.jsx(Gt,{showFolderDetails:re,isCreator:x,folderName:V,setFolderName:Y,folderDescription:X,setFolderDescription:Z,isOnPublicProfile:o,handlePublicProfileToggle:Fe,participantsCanAddItems:g,handleParticipantsCanAddItemsToggle:Ce,isSavingAlbum:R}),e.jsx(Ve,{onClick:()=>{const p=document.getElementById("file-input");p==null||p.click()},disabled:R,children:s("Add More Photos")}),x===!0&&e.jsx(Ge,{passwordSet:b!=="NoPassword",onClick:ke,disabled:R,children:Ee()}),e.jsx(He,{onClick:_e,disabled:R,children:s(R?"Saving Album...":"Save Album")})]}),e.jsx(Ke,{t:s,language:d,usernameManager:pe(s),onSuccess:Ae}),c&&e.jsx(Ut,{isOpen:c,onClose:De,initialOption:b,initialPassword:E})]}),e.jsx(At,{debugMessages:N,t:s,isRTL:S,textDirection:S?"rtl":"ltr"})]})]})},Kt=()=>e.jsx(Oe,{children:e.jsx(Ht,{})});Ne.createRoot(document.getElementById("root")).render(e.jsx(Kt,{}));
