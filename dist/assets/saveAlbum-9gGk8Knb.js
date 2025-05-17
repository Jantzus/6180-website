import{d as R,u as ve,r as $,j as t,g as we,l as G,k as le,P as Ne,m as Oe,O as ke,n as Re,o as Ue,p as Be,q as Me,s as re,S as ze,t as qe,v as We,w as Je,x as Ge,y as He,z as Ve,D as Ke,E as Qe,M as Ye,V as Xe,F as Ze,U as Le,J as et,K as tt,N as st,Q as rt,T as it,W as me,X as ge,Y as ot,Z as at,_ as he,$ as Pe,a0 as be,a1 as xe,a as lt,I as nt,G as dt,A as ct,H as ut,a2 as ft,a3 as pt,a4 as mt,a5 as gt,a6 as ht,a7 as Pt}from"./styled-components-BDjSWUyR.js";import{u as bt,U as xt}from"./customHooks-CV19HVa_.js";import{L as It,D as St}from"./DebugLog-CLzGqvTk.js";import{b as te,g as ce,s as vt,m as wt,d as $t,e as yt,f as Ft,u as _t,h as jt,p as Ct,i as At}from"./utils-DvsMzbzJ.js";const Et=R.div`
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
`,Dt=R.div`
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`,Tt=R.div`
  font-size: 18px;
  font-weight: 500;
  color: white;
  background-color: #888;
  padding: 15px 20px;
  text-align: center;
`,Nt=R.div`
  direction: ${s=>s.isRTL?"rtl":"ltr"};
  padding: 30px;
`,Ie=R.p`
  margin-bottom: 15px;
  font-size: 16px;
`,Ot=R.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 25px;
  margin-top: 20px;
  box-sizing: border-box;
`,kt=R.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
`,ie=R.div`
  display: flex;
  align-items: center;
  cursor: ${s=>s.disabled?"not-allowed":"pointer"};
  opacity: ${s=>s.disabled?.7:1};
`,oe=R.input`
  margin-right: 10px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  
  &:disabled {
    cursor: not-allowed;
  }
`,ae=R.label`
  display: flex;
  cursor: ${s=>s.disabled?"not-allowed":"pointer"};
  font-size: 16px;
`,de=R.span`
  color: #aaa;
  margin-left: 8px;
`,Rt=R.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`,Se=R.button`
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
`,Ut=({isOpen:s,onClose:d,initialOption:I="NoPassword",initialPassword:x=""})=>{const{t:i,language:T}=ve(),N=we(T)==="rtl",[j,w]=$.useState(I),[E,B]=$.useState(x);if($.useEffect(()=>{s&&(w(I),B(x))},[s,I,x]),!s)return null;const f=E.trim()==="",r=D=>{D!=="NoPassword"&&f||w(D)},H=D=>{D.target===D.currentTarget&&d()};return t.jsx(Et,{onClick:H,children:t.jsxs(Dt,{children:[t.jsx(Tt,{children:i("Album Password Policy")}),t.jsxs(Nt,{isRTL:N,children:[t.jsx(Ie,{children:i("Enter a password for this album.")}),t.jsx(Ot,{type:"text",placeholder:i("Enter password"),value:E,onChange:D=>B(D.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"}),t.jsx(Ie,{children:i("Select password restrictions.")}),t.jsxs(kt,{children:[t.jsxs(ie,{disabled:f,children:[t.jsx(oe,{type:"radio",name:"protection",id:"notVisible",checked:j==="NotVisible",onChange:()=>{},disabled:f,onClick:()=>!f&&r("NotVisible")}),t.jsxs(ae,{htmlFor:"notVisible",disabled:f,children:[i("Password Required To See Or Save"),f&&t.jsx(de,{children:i("Password required")})]})]}),t.jsxs(ie,{disabled:f,children:[t.jsx(oe,{type:"radio",name:"protection",id:"watermark",checked:j==="Watermark",onChange:()=>{},disabled:f,onClick:()=>!f&&r("Watermark")}),t.jsxs(ae,{htmlFor:"watermark",disabled:f,children:[i("Password Required To Remove Watermark Or Save"),f&&t.jsx(de,{children:i("Password required")})]})]}),t.jsxs(ie,{disabled:f,children:[t.jsx(oe,{type:"radio",name:"protection",id:"cannotBeSaved",checked:j==="CannotBeSaved",onChange:()=>{},disabled:f,onClick:()=>!f&&r("CannotBeSaved")}),t.jsxs(ae,{htmlFor:"cannotBeSaved",disabled:f,children:[i("Password Required To Save"),f&&t.jsx(de,{children:i("Password required")})]})]}),t.jsxs(ie,{disabled:!1,children:[t.jsx(oe,{type:"radio",name:"protection",id:"noPassword",checked:j==="NoPassword",onChange:()=>{},onClick:()=>r("NoPassword")}),t.jsx(ae,{htmlFor:"noPassword",disabled:!1,children:i("No Password")})]})]}),t.jsxs(Rt,{children:[t.jsx(Se,{onClick:()=>d(),children:i("Cancel")}),t.jsx(Se,{onClick:()=>{console.log(`Saving with option: ${j}, password: ${E.length>0?"********":"none"}`),d(j,E)},children:i("Save")})]})]})]})})},Bt=`
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
`,Mt=(s,d,I,x,i,T,N,j,w,E,B,f,r)=>{const[H,D]=$.useState(null),[e,M]=$.useState(null),W=async y=>{r(`Initializing folder ID with username: ${y}`);try{const C=new URLSearchParams(window.location.search).get("folderId");if(r(`Folder ID from URL: ${C||"null"}`),C){s(C),r(`Using existing folder ID: ${C}`);try{r(`Fetching details for folder: ${C}`);const h=await Y(C,r);if(r("Folder details retrieved:",h),h){const F=`${y}_____${y}____Account`,O=h.creatorId===F;if(r(`User is creator of folder: ${O}, accountId: ${F}, creator: ${h.creatorId}`),I(O),O){r("User is creator, showing folder details"),x(!0),i(h.folderName),T(h.folderDescription),N(h.isOnPublicProfile),r(`Setting isOnPublicProfile: ${h.isOnPublicProfile}`),h.participantsCanAddItems!==void 0&&(j(h.participantsCanAddItems),r(`Setting participantsCanAddItems: ${h.participantsCanAddItems}`));const v=h.passwordPolicy;r(`Password policy from folder details: ${v}`),w(v),v!=="NoPassword"&&h.password&&E(h.password),r(`Set password protection option to: ${v}`)}else r("User is NOT the creator, hiding editable fields"),x(!1)}else r("No folder details retrieved, setting isCreator to false"),I(!1)}catch(h){console.error("Error fetching folder details:",h),r(`Error fetching folder details: ${h}`),I(!1)}}else{const h=`${y}_____${ce()}____Folder`;r(`Creating new folder ID: ${h}`),s(h),r("Setting isCreator to true for new album"),I(!0),x(!0)}}catch(c){console.error("Folder ID initialization error:",c),r(`Folder ID initialization error: ${c}`),I(!1)}},Y=async(y,c)=>{var C,h,F,O,v,o,n,p;c(`Fetching details for folder ID: ${y}`);try{const a=await te();if(!a)return c("No token available for fetching folder details"),null;c("Sending GraphQL query to fetch folder details");const l=await(await fetch(le,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({query:Bt,variables:{folderIds:[y]}})})).json();if(c("Folder details API response:",l),l.errors)return console.error("GraphQL errors:",l.errors),c(`GraphQL errors: ${JSON.stringify(l.errors)}`),null;const m=((h=(C=l==null?void 0:l.data)==null?void 0:C.fetchFolders)==null?void 0:h.items)||[];if(c(`Found ${m.length} folder items`),m.length===0)return c("No folder items found"),null;const u=m[0];c("Retrieved folder data:",u);const S=((O=(F=u.folderPosition)==null?void 0:F.profileIds)==null?void 0:O.some(z=>z.includes("Public____Profile")))||!1;c(`Folder is on public profile: ${S}`),c("Profile IDs:",(v=u.folderPosition)==null?void 0:v.profileIds);const A=(o=u.folderInviteParameters)==null?void 0:o.usingFolderInviteGrantsRightToAddItems;return c(`Participants can add items: ${A}`),{creatorId:u.creatorId||"",folderName:u.folderName||"",folderDescription:u.folderDescription||"",passwordPolicy:((n=u.folderPassword)==null?void 0:n.policy)||"NoPassword",password:((p=u.folderPassword)==null?void 0:p.password)||"",isOnPublicProfile:S,participantsCanAddItems:A!==void 0?A:!0}}catch(a){return console.error("Error in fetchFolderDetails:",a),c(`Error in fetchFolderDetails: ${a}`),null}},X=()=>{r("Attempting to restore photos from localStorage");try{const y=localStorage.getItem(G.SELECTED_PHOTOS);if(r(`Found stored photos: ${y?"yes":"no"}`),y)try{const c=JSON.parse(y);r(`Parsed ${c.length} photos from localStorage`),Array.isArray(c)&&c.length>0&&(d(c),r(`Restored ${c.length} photos to state`))}catch(c){console.error("Error parsing stored photos:",c),r(`Error parsing stored photos: ${c}`)}}catch(y){console.error("Error restoring photos from storage:",y),r(`Error restoring photos from storage: ${y}`)}},Z=()=>{r("Testing S3 connection");try{vt?r("S3 client is available"):(console.error("S3 client not available"),r("S3 client not available"))}catch(y){console.error("S3 connection test error:",y),r(`S3 connection test error: ${y}`)}},L=async()=>{var y;r("Starting component initialization");try{r("Checking login with refresh");const c=await te();if(!c){r("No token returned from login check, aborting initialization");return}try{const C=localStorage.getItem(G.PUBLIC_USERNAME);r(`Retrieved public username from localStorage: ${C||"null"}`),M(C||null);const F=JSON.parse(atob(c.split(".")[1]))["cognito:username"];if(F){r(`Extracted Cognito username from token: ${F}`),D(F);const O=localStorage.getItem(G.SUB_ALBUM_DATA);if(r(`Sub-album data from localStorage: ${O||"null"}`),O)try{const v=JSON.parse(O);if(r("Parsed sub-album data:",v),v.isSubAlbum&&((y=v.selectedFileIds)==null?void 0:y.length)>0){r(`Valid sub-album data found with ${v.selectedFileIds.length} files`),B(!0),f(v.selectedFileIds),v.selectedPhotos&&v.selectedPhotos.length>0&&(r(`Found ${v.selectedPhotos.length} selected photos in sub-album data`),d(v.selectedPhotos)),x(!0),I(!0);const o=`${F}_____${ce()}____Folder`;r(`Generated new folder ID for sub-album: ${o}`),s(o)}else r("Invalid sub-album data, proceeding with normal initialization"),await W(F)}catch(v){console.error("Error parsing sub-album data:",v),r(`Error parsing sub-album data: ${v}`),await W(F)}else r("No sub-album data found, proceeding with normal folder initialization"),await W(F)}else r("No Cognito username found in token")}catch(C){console.error("User data initialization error:",C),r(`User data initialization error: ${C}`)}X(),Z(),r("Component initialization completed")}catch(c){console.error("Initialization error:",c),r(`Initialization error: ${c}`)}};return $.useEffect(()=>{L()},[]),{cognitoUsername:H,publicUsername:e,setPublicUsername:M}},zt=(s,d,I,x,i,T,N,j,w,E,B,f,r,H,D,e)=>{const M=o=>{e(`Save progress text: ${o}`);const n=document.getElementById("saveProgressText");n&&(n.innerText=o)},W=o=>{const n=document.getElementById("saveProgress");n?(n.style.width=`${o}%`,e(`Updated save progress bar: ${o}%`)):e("Progress bar element not found"),r(o)},Y=(o,n)=>{e(`Splitting array of ${o.length} items into chunks of ${n}`);const p=[];for(let a=0;a<o.length;a+=n)p.push(o.slice(a,a+n));return e(`Created ${p.length} chunks`),p},X=o=>{const n=new Set;return o.filter(p=>n.has(p.fileId)?(e(`Skipping duplicate file reference with ID: ${p.fileId}`),!1):(n.add(p.fileId),!0))},Z=(o,n,p)=>{e("Creating folder position input"),e(`Profile visibility: ${j?"Public":"Only Me"}`);const a=j?[`${d}_____Public____Profile`]:["Only Me_____Only Me____Profile"];e(`Profile IDs: ${JSON.stringify(a)}`);let P=[];x&&i.length>0&&(e(`Creating file reference IDs for ${i.length} sub-album files`),P=i.map(S=>{const A=S.split("_____");if(A.length>=2){const U=A[1].split("____")[0],V=`${p}_____${U}____FileReference`;return e(`Created file reference ID for sub-album: ${V}`),V}return e(`Using original fileId as fallback: ${S}`),S})),e(`Created ${P.length} acceptedFileReferenceIds`);const l=E!=="NoPassword"?B:null;if(e(`Password protection: ${E}`),e(`Album password: ${l?"******":"null"}`),e(`Participants can add items: ${w}`),!s)throw e("Error: folderId is null or undefined"),new Error("folderId is required to create folder position input");const m=$t(s),u=yt(m);return{currentTime:o,folderId:s,profileIds:a,folderPositionSelectedTagInputs:[],folderPositionPoints:1,acceptedFileReferenceIds:P,folderInput:{folderSelectedTagInputs:[],folderAboutContactIds:[n],albumNanoId:u,folderName:T,folderDescription:N,folderPasswordInput:{password:l,policy:E},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,usingFolderInviteGrantsRightToRemoveItems:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:w,addedItemsNeedFolderCreatorApproval:!1}}}},L=(o,n,p)=>(e(`Creating file reference inputs for ${o.length} photos`),o.map(a=>{var m;if(a.fileId)return e(`Using existing fileId for photo: ${a.fileId}`),{fileReferencesHolderId:s,currentTime:n,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:a.fileId,fileInput:null};const P=a.type==="video"||(m=a.type)!=null&&m.startsWith("video")?`Input/Video/${a.fileName}`:`Input/Image/${a.fileName}`,l=`${d}_____${a.fileName}____File`;return e(`Created file reference for ${a.fileName}:`),e(`  - dataKey: ${P}`),e(`  - fileId: ${l}`),e(`  - thumbnailDataKey: ${a.thumbnailDataKey||"undefined"}`),e(`  - size: ${a.size}`),e(`  - thumbnailSize: ${a.thumbnailSize||0}`),e(`  - duration: ${a.duration||"undefined"}`),{fileReferencesHolderId:s,currentTime:n,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:l,fileInput:{fileId:l,ownerFileInput:{editorContactIds:[p],FileSharingOptionsEnum:"Anyone",dataKey:P,thumbnailDataKey:a.thumbnailDataKey,dataInBytes:a.size,thumbnailDataInBytes:a.thumbnailSize||0,s3UploadedAt:n,durationInSeconds:a.duration},editorFileInput:{aboutContactIds:[p],captionText:"",numericFilterInputs:[]}}}})),y=async o=>{var P,l;e("Sending folder-only mutation (no file references)");const n=await te();if(!n)throw e("No token available for saving album, aborting"),new Error("Authentication token not available");const p=`
      mutation MyMutation($folderPositionInputs: [FolderPositionInput!]) {
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items {
            id
          }
        }
      }
    `,a={folderPositionInputs:[o]};e("GraphQL folder-only mutation variables:",a);try{e("Sending API request to save folder");const m=await fetch(le,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({query:p,variables:a})});e(`API response status: ${m.status}`);const u=await m.text();e(`API response raw text: ${u}`);const S=JSON.parse(u);if(e("API response JSON:",S),S.errors)throw console.error("Folder save failed:",S.errors),e("Folder save failed with errors:",S.errors),new Error("Failed to save folder");return e("Folder saved successfully"),((l=(P=S.data)==null?void 0:P.changeFiles)==null?void 0:l.items)||[]}catch(m){throw console.error("Error in sendFolderOnlyMutation:",m),e(`Error in sendFolderOnlyMutation: ${m}`),m}},c=async o=>{var P,l,m,u,S;e(`Sending file references-only mutation with ${o.length} items`);const n=await te();if(!n)throw e("No token available for saving file references, aborting"),new Error("Authentication token not available");const p=`
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
    `,a={updatedFileReferenceInputs:o};e("GraphQL file references-only mutation variables (first item):",o.length>0?o[0]:"No items");try{e("Sending API request to save file references");const A=await fetch(le,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({query:p,variables:a})});e(`API response status: ${A.status}`);const z=await A.text();e(`API response raw text: ${z.substring(0,500)}...`);const U=JSON.parse(z);if(e("API response JSON items count:",((m=(l=(P=U.data)==null?void 0:P.changeFiles0)==null?void 0:l.items)==null?void 0:m.length)||0),U.errors)throw console.error("File references save failed:",U.errors),e("File references save failed with errors:",U.errors),new Error("Failed to save file references");return e("File references chunk saved successfully"),((S=(u=U.data)==null?void 0:u.changeFiles0)==null?void 0:S.items)||[]}catch(A){throw console.error("Error in sendFileReferencesOnlyMutation:",A),e(`Error in sendFileReferencesOnlyMutation: ${A}`),A}},C=async(o,n)=>{var l,m,u,S,A,z,U,V,g;e(`Sending final chunk with folder mutation (${o.length} file references)`);const p=await te();if(!p)throw e("No token available for saving final chunk, aborting"),new Error("Authentication token not available");const a=`
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
    `,P={folderPositionInputs:[n],updatedFileReferenceInputs:o};e("GraphQL final mutation variables (folder + last chunk)");try{e("Sending API request for final save with folder");const q=await fetch(le,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${p}`},body:JSON.stringify({query:a,variables:P})});e(`API response status: ${q.status}`);const K=await q.text();e(`API response raw text: ${K.substring(0,500)}...`);const J=JSON.parse(K);if(e("API response JSON:",{fileReferencesCount:((u=(m=(l=J.data)==null?void 0:l.changeFiles0)==null?void 0:m.items)==null?void 0:u.length)||0,folderItems:((A=(S=J.data)==null?void 0:S.changeFiles)==null?void 0:A.items)||[]}),J.errors)throw console.error("Final save failed:",J.errors),e("Final save failed with errors:",J.errors),new Error("Failed to complete album save");return e("Final chunk and folder saved successfully"),{fileReferences:((U=(z=J.data)==null?void 0:z.changeFiles0)==null?void 0:U.items)||[],folderPositions:((g=(V=J.data)==null?void 0:V.changeFiles)==null?void 0:g.items)||[]}}catch(q){throw console.error("Error in sendFinalChunkWithFolderMutation:",q),e(`Error in sendFinalChunkWithFolderMutation: ${q}`),q}},h=async()=>(e("Validating required data"),await te()?d?s?(e("All required data validated successfully"),!0):(e("No folder ID, validation failed"),!1):(e("No Cognito username, validation failed"),!1):(e("No token available, validation failed"),!1)),F=()=>{e("Handling successful save"),Ft(H,D,[G.SELECTED_PHOTOS,G.SUB_ALBUM_DATA],e),e("Album data cleared");const o=document.getElementById("saveProgressText");o&&(o.innerText="Album saved successfully!",e("Updated progress text to 'Album saved successfully!'")),sessionStorage.setItem("album_just_saved","true"),e("Set 'album_just_saved' flag in sessionStorage"),e("Setting timeout for redirect to my-albums.html"),setTimeout(()=>{e("Redirecting to my-albums.html"),window.location.href="/my-albums.html"},1e3)},O=async(o,n)=>{e("Starting chunked save process");try{M("Processing files in chunks...");const p=48;if(n.length===0)e("No file references to process, saving only folder position"),await y(o);else{const a=X(n);e(`After removing duplicates, processing ${a.length} unique file references`);const P=Y(a,p);e(`Split file references into ${P.length} chunks of max size ${p}`);for(let l=0;l<P.length;l++){const m=P[l];e(`Processing chunk ${l+1} of ${P.length} with ${m.length} file references`);const u=l/P.length*80;r(10+u),W(10+u),l<P.length-1?(M(`Saving files: chunk ${l+1} of ${P.length}...`),await c(m)):(M("Finalizing album..."),await C(m,o))}}r(100),W(100),M("Album saved successfully!"),F()}catch(p){console.error("Error in chunked save process:",p),e(`Error in chunked save process: ${p}`),M(`Error: ${p}`),f(!1)}};return{saveAlbumDirectly:async()=>{e("Starting direct album save"),f(!0),r(5);try{if(e("Validating required data for save"),!await h()){e("Required data validation failed, aborting save"),f(!1);return}const o=Math.floor(Date.now()/1e3),n=`${d}_____${d}____Account`,a=s.split("_____")[1].split("____")[0];e(`Save timestamp: ${o}`),e(`Account ID: ${n}`),e(`Folder ID: ${s}`),e(`Folder target item identifier: ${a}`),e("Creating folder position input");const P=Z(o,n,a);e("Folder position input created:",P);let l=[];const m=I.filter(u=>u.status==="complete");if(e(`Found ${m.length} valid photos with 'complete' status`),m.length>0){const u=m.filter(A=>!A.fileId);e(`Found ${u.length} new uploads to move from temp to public folder`),u.length>0&&(e("Moving files from temp to public folder"),await wt(u,W,e)),e("Creating file reference inputs for uploads");const S=L(m,o,n);e(`Created ${S.length} file reference inputs for uploads`,S),l=l.concat(S)}if(x&&i.length>0){e(`Adding ${i.length} existing file references for sub-album`);const u=i.map(S=>(e(`Creating file reference for existing file ID: ${S}`),{fileReferencesHolderId:s,currentTime:o,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:S,fileInput:null}));e(`Created ${u.length} file reference inputs for existing files`,u),l=l.concat(u)}e(`Total file reference inputs: ${l.length}`),e("Sending GraphQL mutations with chunked file references"),await O(P,l)}catch(o){console.error("Error in saveAlbumDirectly:",o),e(`Error in saveAlbumDirectly: ${o}`),f(!1)}}}},qt=s=>s.map(d=>{const I=d.type,x=d.name.split(".").pop()||"jpg";return{fileName:`${ce()}.${x}`,s3PreviewUrl:URL.createObjectURL(d),type:I,size:d.size,status:"pending",progress:0}}),Wt=(s,d,I,x)=>{x(`Updating photos with processed info, starting at index ${s}`),I(i=>{const T=[...i];return d.forEach((N,j)=>{const w=s+j;w<T.length&&(x(`Updating photo at index ${w} with processed info`),T[w]=N)}),T})},Jt=({selectedPhotos:s,isSavingAlbum:d,onRemovePhoto:I})=>{const{t:x}=ne();return s.length===0?null:t.jsxs(t.Fragment,{children:[t.jsxs(He,{children:[s.length," ",s.length>1?x("photos selected"):x("photo selected"),":"]}),t.jsx(Ve,{children:s.map((i,T)=>{var N,j;return t.jsxs(Ke,{children:[t.jsx(Qe,{status:i.status,children:i.status==="complete"?"✓":i.status==="error"?"✕":i.status==="uploading"?"↑":i.status==="processing"?"⚙️":"•"}),t.jsxs(Ye,{children:[i.type==="video"||(N=i.type)!=null&&N.startsWith("video")?t.jsx(Xe,{src:i.s3PreviewUrl,controls:!0}):t.jsx(Ze,{src:i.s3PreviewUrl,alt:i.fileName}),(i.status==="uploading"||i.status==="processing")&&t.jsx(Le,{children:t.jsx(et,{progress:i.progress,status:i.status})})]}),t.jsxs(tt,{children:[(j=i.type)!=null&&j.startsWith("video")?x("Video"):x("Image"),i.size&&` • ${(i.size/1024/1024).toFixed(1)} MB`,i.duration&&` • ${i.duration}s`]}),i.status==="error"&&i.errorMessage&&t.jsxs(st,{children:[x("Error"),": ",i.errorMessage.length>40?i.errorMessage.substring(0,37)+"...":i.errorMessage]}),t.jsx(rt,{onClick:()=>I(T),disabled:d,children:x("Remove")})]},T)})})]})},Gt=({progressTracker:s})=>{const{t:d}=ne();return s.totalFiles===0?null:t.jsxs(Ne,{children:[t.jsx(Oe,{children:d("Upload Progress")}),t.jsxs(ke,{children:[t.jsxs(Re,{children:[t.jsxs("span",{children:[d("Overall Progress"),": ",Math.round(s.overallProgress),"%"]}),t.jsxs("span",{children:[s.filesComplete," ",d("of")," ",s.totalFiles," ",d("complete")]})]}),t.jsx(Ue,{children:t.jsx(Be,{progress:s.overallProgress})})]}),t.jsxs(Me,{children:[s.filesUploading>0&&t.jsxs(re,{children:[d("Uploading"),": ",s.filesUploading]}),s.filesProcessing>0&&t.jsxs(re,{children:[d("Processing"),": ",s.filesProcessing]}),s.filesComplete>0&&t.jsxs(re,{children:[d("Complete"),": ",s.filesComplete]}),s.filesWithError>0&&t.jsxs(re,{isError:!0,children:[d("Failed"),": ",s.filesWithError]})]})]})},Ht=({isSavingAlbum:s,savingProgress:d})=>{const{t:I}=ne();return s?t.jsxs(ze,{children:[t.jsx(qe,{children:I("Saving Album")}),t.jsx(We,{id:"saveProgressText",children:I("Moving files...")}),t.jsx(Je,{children:t.jsx(Ge,{id:"saveProgress",style:{width:`${d}%`}})})]}):null},Vt=({showFolderDetails:s,isCreator:d,folderName:I,setFolderName:x,folderDescription:i,setFolderDescription:T,isOnPublicProfile:N,handlePublicProfileToggle:j,participantsCanAddItems:w,handleParticipantsCanAddItemsToggle:E,isSavingAlbum:B})=>{const{t:f}=ne();return!s||d!==!0?null:t.jsxs(it,{children:[t.jsxs(me,{children:[t.jsx(ge,{htmlFor:"folderName",children:f("Album Name (Optional)")}),t.jsx(ot,{id:"folderName",type:"text",value:I,onChange:r=>x(r.target.value),placeholder:f("Enter album name")})]}),t.jsxs(me,{children:[t.jsx(ge,{htmlFor:"folderDescription",children:f("Album Description (Optional)")}),t.jsx(at,{id:"folderDescription",value:i,onChange:r=>T(r.target.value),placeholder:f("Enter album description"),rows:4})]}),t.jsxs(he,{children:[t.jsx(Pe,{children:f(N?"On Public Profile":"Not On Public Profile")}),t.jsxs(be,{children:[t.jsx("input",{type:"checkbox",checked:N,onChange:j,disabled:B}),t.jsx(xe,{})]})]}),t.jsxs(he,{children:[t.jsx(Pe,{children:f(w?"Participants Can Add Items":"Participants Cannot Add Items")}),t.jsxs(be,{children:[t.jsx("input",{type:"checkbox",checked:w,onChange:E,disabled:B}),t.jsx(xe,{})]})]})]})},ne=()=>({t:s=>s,language:"en"}),Kt=()=>{const{t:s,language:d}=ve(),I=we(d)==="rtl",x=bt(s),{setShowUsernamePrompt:i,setUsernameInput:T}=x,[N,j]=$.useState(null),[w,E]=$.useState([]),[B,f]=$.useState([]),[r,H]=$.useState({totalFiles:0,filesComplete:0,filesUploading:0,filesProcessing:0,filesWithError:0,overallProgress:0}),[D,e]=$.useState(!1),[M,W]=$.useState(0),[Y,X]=$.useState(""),[Z,L]=$.useState(""),[y,c]=$.useState(!1),[C,h]=$.useState(!1),[F,O]=$.useState("NoPassword"),[v,o]=$.useState(""),[n,p]=$.useState(!1),[a,P]=$.useState(!0),[l,m]=$.useState(null),[u,S]=$.useState(!1),[A,z]=$.useState([]),U=jt(f),V=At(E),g=(b,_)=>{let k=`[${new Date().toISOString()}] ${b}`;if(_!==void 0)try{const ee=typeof _=="object"?JSON.stringify(_,null,2):String(_);k+=`
Data: ${ee}`,console.log(k),console.log("Data object:",_)}catch(ee){k+=` [Error stringifying data: ${ee}]`,console.log(k),console.log("Raw data:",_)}else console.log(k);U(k)},{cognitoUsername:q,publicUsername:K,setPublicUsername:J}=Mt(j,E,m,c,X,L,p,P,O,o,S,z,g),{saveAlbumDirectly:ue}=zt(N,q,w,u,A,Y,Z,n,a,F,v,e,W,E,H,g);$.useEffect(()=>{w.length>0&&(localStorage.setItem(G.SELECTED_PHOTOS,JSON.stringify(w)),g(`Saved ${w.length} photos to localStorage`))},[w]),$.useEffect(()=>{_t(w,H)},[w]);const $e=b=>{g(`Removing photo at index: ${b}`);const _=w.filter((Q,k)=>k!==b);E(_),g(`New photos count: ${_.length}`),_.length>0?(localStorage.setItem(G.SELECTED_PHOTOS,JSON.stringify(_)),g(`Updated localStorage with ${_.length} photos`)):(localStorage.removeItem(G.SELECTED_PHOTOS),g("Removed photos from localStorage"))},ye=async b=>{if(g("Add photos triggered from file input"),!q){g("No Cognito username available, cannot add photos");return}const _=Array.from(b.target.files||[]);if(g(`Selected ${_.length} files`),!!_.length)try{const Q=qt(_);g(`Created ${Q.length} initial photo objects`),E(se=>[...se,...Q]);const k=w.length;g(`Starting processing at index: ${k}`);const ee=await Ct(_,q,(se,fe,pe,Te)=>{V(k+se,fe,pe,Te),g(`Updated status for photo ${k+se}: ${fe}, progress: ${pe}`)},g);g(`Updating ${ee.length} photos with processed info`),Wt(k,ee,E,g)}catch(Q){console.error("Error in handleAddPhotos:",Q),g(`Error in handleAddPhotos: ${Q}`)}finally{b.target.value="",g("Reset file input value")}},Fe=()=>{const b=!n;g(`Toggling isOnPublicProfile to: ${b}`),p(b)},_e=()=>{const b=!a;g(`Toggling participantsCanAddItems to: ${b}`),P(b)},je=async()=>{g("Album save initiated"),e(!0);try{if(K!=null&&K.startsWith("Profile-")){g("Public username starts with 'Profile-', showing username prompt"),T(K),i(!0),e(!1);return}g("Valid username found, proceeding to save album directly"),ue()}catch(b){console.error("Error in handleSaveAlbum:",b),g(`Error in handleSaveAlbum: ${b}`),e(!1)}},Ce=b=>{g(`Handling successful username update to: ${b}`),localStorage.setItem(G.PUBLIC_USERNAME,b),J(b),i(!1),g("Proceeding to save album after username update"),ue()},Ae=(b,_)=>{g(`Password dialog closed with option: ${b}, password: ${_?"******":"undefined"}`),b&&O(b),_!==void 0&&o(_),h(!1)},Ee=()=>F==="NoPassword"?s("Album Password Policy"):`${s(F==="NotVisible"?"Password Required To See Or Save":F==="Watermark"?"Password Required To Remove Watermark Or Save":"Password Required To Save")} ${v?`(${v})`:""}`,De=()=>{g("Opening password dialog"),h(!0)};return t.jsxs(t.Fragment,{children:[t.jsx(dt,{}),t.jsxs(ct,{isRTL:I,children:[t.jsxs("div",{style:{maxWidth:"900px",margin:"0 auto"},children:[t.jsxs(ut,{children:[t.jsx(ft,{href:"/my-albums.html",children:s("My Albums")}),t.jsx(It,{t:s})]}),t.jsx(Gt,{progressTracker:r}),t.jsx(Ht,{isSavingAlbum:D,savingProgress:M}),t.jsx(pt,{id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:ye}),t.jsx(Jt,{selectedPhotos:w,isSavingAlbum:D,onRemovePhoto:$e}),t.jsxs(mt,{children:[t.jsx(Vt,{showFolderDetails:y,isCreator:l,folderName:Y,setFolderName:X,folderDescription:Z,setFolderDescription:L,isOnPublicProfile:n,handlePublicProfileToggle:Fe,participantsCanAddItems:a,handleParticipantsCanAddItemsToggle:_e,isSavingAlbum:D}),t.jsx(gt,{onClick:()=>{const b=document.getElementById("file-input");b==null||b.click()},disabled:D,children:s("Add More Photos")}),l===!0&&t.jsx(ht,{passwordSet:F!=="NoPassword",onClick:De,disabled:D,children:Ee()}),t.jsx(Pt,{onClick:je,disabled:D,children:s(D?"Saving Album...":"Save Album")})]}),t.jsx(xt,{t:s,language:d,usernameManager:x,onSuccess:Ce}),C&&t.jsx(Ut,{isOpen:C,onClose:Ae,initialOption:F,initialPassword:v})]}),t.jsx(St,{debugMessages:B,t:s,isRTL:I,textDirection:I?"rtl":"ltr"})]})]})},Qt=()=>t.jsx(nt,{children:t.jsx(Kt,{})});lt.createRoot(document.getElementById("root")).render(t.jsx(Qt,{}));
