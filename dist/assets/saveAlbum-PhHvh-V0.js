import{d as U,u as Se,r as I,j as e,g as Ie,l as H,k as ne,P as ke,m as Ne,O as Oe,n as Re,o as Ue,p as Be,q as Me,s as ie,S as ze,t as qe,v as We,w as Je,x as Ge,y as Ve,z as He,D as Ke,E as Qe,M as Ye,V as Xe,F as Ze,U as Le,J as et,K as tt,N as st,Q as rt,T as it,W as pe,X as me,Y as ot,Z as at,_ as ge,$ as he,a0 as be,a1 as xe,a as lt,I as nt,G as dt,A as ct,H as ut,a2 as ft,a3 as pt,a4 as mt,a5 as gt,a6 as ht,a7 as bt}from"./styled-components-BaNm_kET.js";import{u as Pe,U as xt}from"./customHooks-ksbsXZL8.js";import{L as Pt,D as vt}from"./DebugLog-CX_7VMVX.js";import{b as L,g as ce,s as wt,m as St,d as It,e as yt,f as $t,u as jt,h as Ft,p as _t,i as Ct}from"./utils-IiT-_NTh.js";const At=U.div`
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
`,Dt=U.div`
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
`,kt=U.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 25px;
  margin-top: 20px;
  box-sizing: border-box;
`,Nt=U.div`
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
`,Ot=U.div`
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
`,Rt=({isOpen:s,onClose:l,initialOption:x="NoPassword",initialPassword:g=""})=>{const{t:i,language:A}=Se(),k=Ie(A)==="rtl",[P,j]=I.useState(x),[N,M]=I.useState(g);if(I.useEffect(()=>{s&&(j(x),M(g))},[s,x,g]),!s)return null;const f=N.trim()==="",r=T=>{T!=="NoPassword"&&f||j(T)},O=T=>{T.target===T.currentTarget&&l()};return e.jsx(At,{onClick:O,children:e.jsxs(Et,{children:[e.jsx(Dt,{children:i("Album Password Policy")}),e.jsxs(Tt,{isRTL:k,children:[e.jsx(ve,{children:i("Enter a password for this album.")}),e.jsx(kt,{type:"text",placeholder:i("Enter password"),value:N,onChange:T=>M(T.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"}),e.jsx(ve,{children:i("Select password restrictions.")}),e.jsxs(Nt,{children:[e.jsxs(oe,{disabled:f,children:[e.jsx(ae,{type:"radio",name:"protection",id:"notVisible",checked:P==="NotVisible",onChange:()=>{},disabled:f,onClick:()=>!f&&r("NotVisible")}),e.jsxs(le,{htmlFor:"notVisible",disabled:f,children:[i("Password Required To See Or Save"),f&&e.jsx(de,{children:i("Password required")})]})]}),e.jsxs(oe,{disabled:f,children:[e.jsx(ae,{type:"radio",name:"protection",id:"watermark",checked:P==="Watermark",onChange:()=>{},disabled:f,onClick:()=>!f&&r("Watermark")}),e.jsxs(le,{htmlFor:"watermark",disabled:f,children:[i("Password Required To Remove Watermark Or Save"),f&&e.jsx(de,{children:i("Password required")})]})]}),e.jsxs(oe,{disabled:f,children:[e.jsx(ae,{type:"radio",name:"protection",id:"cannotBeSaved",checked:P==="CannotBeSaved",onChange:()=>{},disabled:f,onClick:()=>!f&&r("CannotBeSaved")}),e.jsxs(le,{htmlFor:"cannotBeSaved",disabled:f,children:[i("Password Required To Save"),f&&e.jsx(de,{children:i("Password required")})]})]}),e.jsxs(oe,{disabled:!1,children:[e.jsx(ae,{type:"radio",name:"protection",id:"noPassword",checked:P==="NoPassword",onChange:()=>{},onClick:()=>r("NoPassword")}),e.jsx(le,{htmlFor:"noPassword",disabled:!1,children:i("No Password")})]})]}),e.jsxs(Ot,{children:[e.jsx(we,{onClick:()=>l(),children:i("Cancel")}),e.jsx(we,{onClick:()=>{console.log(`Saving with option: ${P}, password: ${N.length>0?"********":"none"}`),l(P,N)},children:i("Save")})]})]})]})})},Ut=`
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
`,Bt=(s,l,x,g,i,A,k,P,j,N,M,f,r)=>{const[O,T]=I.useState(null),[t,q]=I.useState(null),W=async y=>{r(`Initializing folder ID with username: ${y}`);try{const _=new URLSearchParams(window.location.search).get("folderId");if(r(`Folder ID from URL: ${_||"null"}`),_){s(_),r(`Using existing folder ID: ${_}`);try{r(`Fetching details for folder: ${_}`);const h=await K(_,r);if(r("Folder details retrieved:",h),h){const E=`${y}_____${y}____Account`,D=h.creatorId===E;if(r(`User is creator of folder: ${D}, accountId: ${E}, creator: ${h.creatorId}`),x(D),D){r("User is creator, showing folder details"),g(!0),i(h.folderName),A(h.folderDescription),k(h.isOnPublicProfile),r(`Setting isOnPublicProfile: ${h.isOnPublicProfile}`),h.participantsCanAddItems!==void 0&&(P(h.participantsCanAddItems),r(`Setting participantsCanAddItems: ${h.participantsCanAddItems}`));const $=h.passwordPolicy;r(`Password policy from folder details: ${$}`),j($),$!=="NoPassword"&&h.password&&N(h.password),r(`Set password protection option to: ${$}`)}else r("User is NOT the creator, hiding editable fields"),g(!1)}else r("No folder details retrieved, setting isCreator to false"),x(!1)}catch(h){console.error("Error fetching folder details:",h),r(`Error fetching folder details: ${h}`),x(!1)}}else{const h=`${y}_____${ce()}____Folder`;r(`Creating new folder ID: ${h}`),s(h),r("Setting isCreator to true for new album"),x(!0),g(!0)}}catch(c){console.error("Folder ID initialization error:",c),r(`Folder ID initialization error: ${c}`),x(!1)}},K=async(y,c)=>{var _,h,E,D,$,o,d,p;c(`Fetching details for folder ID: ${y}`);try{const a=await L();if(!a)return c("No token available for fetching folder details"),null;c("Sending GraphQL query to fetch folder details");const n=await(await fetch(ne,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({query:Ut,variables:{folderIds:[y]}})})).json();if(c("Folder details API response:",n),n.errors)return console.error("GraphQL errors:",n.errors),c(`GraphQL errors: ${JSON.stringify(n.errors)}`),null;const b=((h=(_=n==null?void 0:n.data)==null?void 0:_.fetchFolders)==null?void 0:h.items)||[];if(c(`Found ${b.length} folder items`),b.length===0)return c("No folder items found"),null;const u=b[0];c("Retrieved folder data:",u);const S=((D=(E=u.folderPosition)==null?void 0:E.profileIds)==null?void 0:D.some(J=>J.includes("Public____Profile")))||!1;c(`Folder is on public profile: ${S}`),c("Profile IDs:",($=u.folderPosition)==null?void 0:$.profileIds);const C=(o=u.folderInviteParameters)==null?void 0:o.usingFolderInviteGrantsRightToAddItems;return c(`Participants can add items: ${C}`),{creatorId:u.creatorId||"",folderName:u.folderName||"",folderDescription:u.folderDescription||"",passwordPolicy:((d=u.folderPassword)==null?void 0:d.policy)||"NoPassword",password:((p=u.folderPassword)==null?void 0:p.password)||"",isOnPublicProfile:S,participantsCanAddItems:C!==void 0?C:!0}}catch(a){return console.error("Error in fetchFolderDetails:",a),c(`Error in fetchFolderDetails: ${a}`),null}},Q=()=>{r("Attempting to restore photos from localStorage");try{const y=localStorage.getItem(H.SELECTED_PHOTOS);if(r(`Found stored photos: ${y?"yes":"no"}`),y)try{const c=JSON.parse(y);r(`Parsed ${c.length} photos from localStorage`),Array.isArray(c)&&c.length>0&&(l(c),r(`Restored ${c.length} photos to state`))}catch(c){console.error("Error parsing stored photos:",c),r(`Error parsing stored photos: ${c}`)}}catch(y){console.error("Error restoring photos from storage:",y),r(`Error restoring photos from storage: ${y}`)}},Y=()=>{r("Testing S3 connection");try{wt?r("S3 client is available"):(console.error("S3 client not available"),r("S3 client not available"))}catch(y){console.error("S3 connection test error:",y),r(`S3 connection test error: ${y}`)}},ee=async()=>{var y;r("Starting component initialization");try{r("Checking login with refresh");const c=await L();if(!c){r("No token returned from login check, aborting initialization");return}try{const _=localStorage.getItem("publicUsername");r(`Retrieved public username from localStorage: ${_||"null"}`),q(_||null);const E=JSON.parse(atob(c.split(".")[1]))["cognito:username"];if(E){r(`Extracted Cognito username from token: ${E}`),T(E);const D=localStorage.getItem(H.SUB_ALBUM_DATA);if(r(`Sub-album data from localStorage: ${D||"null"}`),D)try{const $=JSON.parse(D);if(r("Parsed sub-album data:",$),$.isSubAlbum&&((y=$.selectedFileIds)==null?void 0:y.length)>0){r(`Valid sub-album data found with ${$.selectedFileIds.length} files`),M(!0),f($.selectedFileIds),$.selectedPhotos&&$.selectedPhotos.length>0&&(r(`Found ${$.selectedPhotos.length} selected photos in sub-album data`),l($.selectedPhotos)),g(!0),x(!0);const o=`${E}_____${ce()}____Folder`;r(`Generated new folder ID for sub-album: ${o}`),s(o)}else r("Invalid sub-album data, proceeding with normal initialization"),await W(E)}catch($){console.error("Error parsing sub-album data:",$),r(`Error parsing sub-album data: ${$}`),await W(E)}else r("No sub-album data found, proceeding with normal folder initialization"),await W(E)}else r("No Cognito username found in token")}catch(_){console.error("User data initialization error:",_),r(`User data initialization error: ${_}`)}Q(),Y(),r("Component initialization completed")}catch(c){console.error("Initialization error:",c),r(`Initialization error: ${c}`)}};return I.useEffect(()=>{ee()},[]),{cognitoUsername:O,publicUsername:t,setPublicUsername:q}},Mt=(s,l,x,g,i,A,k,P,j,N,M,f,r,O,T,t)=>{const q=o=>{t(`Save progress text: ${o}`);const d=document.getElementById("saveProgressText");d&&(d.innerText=o)},W=o=>{const d=document.getElementById("saveProgress");d?(d.style.width=`${o}%`,t(`Updated save progress bar: ${o}%`)):t("Progress bar element not found"),r(o)},K=(o,d)=>{t(`Splitting array of ${o.length} items into chunks of ${d}`);const p=[];for(let a=0;a<o.length;a+=d)p.push(o.slice(a,a+d));return t(`Created ${p.length} chunks`),p},Q=o=>{const d=new Set;return o.filter(p=>d.has(p.fileId)?(t(`Skipping duplicate file reference with ID: ${p.fileId}`),!1):(d.add(p.fileId),!0))},Y=(o,d,p)=>{t("Creating folder position input"),t(`Profile visibility: ${P?"Public":"Only Me"}`);const a=P?[`${l}_____Public____Profile`]:["Only Me_____Only Me____Profile"];t(`Profile IDs: ${JSON.stringify(a)}`);let v=[];g&&i.length>0&&(t(`Creating file reference IDs for ${i.length} sub-album files`),v=i.map(S=>{const C=S.split("_____");if(C.length>=2){const B=C[1].split("____")[0],m=`${p}_____${B}____FileReference`;return t(`Created file reference ID for sub-album: ${m}`),m}return t(`Using original fileId as fallback: ${S}`),S})),t(`Created ${v.length} acceptedFileReferenceIds`);const n=N!=="NoPassword"?M:null;if(t(`Password protection: ${N}`),t(`Album password: ${n?"******":"null"}`),t(`Participants can add items: ${j}`),!s)throw t("Error: folderId is null or undefined"),new Error("folderId is required to create folder position input");const b=It(s),u=yt(b);return{currentTime:o,folderId:s,profileIds:a,folderPositionSelectedTagInputs:[],folderPositionPoints:1,acceptedFileReferenceIds:v,folderInput:{folderSelectedTagInputs:[],folderAboutContactIds:[d],albumNanoId:u,folderName:A,folderDescription:k,folderPasswordInput:{password:n,policy:N},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,usingFolderInviteGrantsRightToRemoveItems:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:j,addedItemsNeedFolderCreatorApproval:!1}}}},ee=(o,d,p)=>(t(`Creating file reference inputs for ${o.length} photos`),o.map(a=>{var b;if(a.fileId)return t(`Using existing fileId for photo: ${a.fileId}`),{fileReferencesHolderId:s,currentTime:d,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:a.fileId,fileInput:null};const v=a.type==="video"||(b=a.type)!=null&&b.startsWith("video")?`Input/Video/${a.fileName}`:`Input/Image/${a.fileName}`,n=`${l}_____${a.fileName}____File`;return t(`Created file reference for ${a.fileName}:`),t(`  - dataKey: ${v}`),t(`  - fileId: ${n}`),t(`  - thumbnailDataKey: ${a.thumbnailDataKey||"undefined"}`),t(`  - size: ${a.size}`),t(`  - thumbnailSize: ${a.thumbnailSize||0}`),t(`  - duration: ${a.duration||"undefined"}`),{fileReferencesHolderId:s,currentTime:d,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:n,fileInput:{fileId:n,ownerFileInput:{editorContactIds:[p],FileSharingOptionsEnum:"Anyone",dataKey:v,thumbnailDataKey:a.thumbnailDataKey,dataInBytes:a.size,thumbnailDataInBytes:a.thumbnailSize||0,s3UploadedAt:d,durationInSeconds:a.duration},editorFileInput:{aboutContactIds:[p],captionText:"",numericFilterInputs:[]}}}})),y=async o=>{var v,n;t("Sending folder-only mutation (no file references)");const d=await L();if(!d)throw t("No token available for saving album, aborting"),new Error("Authentication token not available");const p=`
      mutation MyMutation($folderPositionInputs: [FolderPositionInput!]) {
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items {
            id
          }
        }
      }
    `,a={folderPositionInputs:[o]};t("GraphQL folder-only mutation variables:",a);try{t("Sending API request to save folder");const b=await fetch(ne,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${d}`},body:JSON.stringify({query:p,variables:a})});t(`API response status: ${b.status}`);const u=await b.text();t(`API response raw text: ${u}`);const S=JSON.parse(u);if(t("API response JSON:",S),S.errors)throw console.error("Folder save failed:",S.errors),t("Folder save failed with errors:",S.errors),new Error("Failed to save folder");return t("Folder saved successfully"),((n=(v=S.data)==null?void 0:v.changeFiles)==null?void 0:n.items)||[]}catch(b){throw console.error("Error in sendFolderOnlyMutation:",b),t(`Error in sendFolderOnlyMutation: ${b}`),b}},c=async o=>{var v,n,b,u,S;t(`Sending file references-only mutation with ${o.length} items`);const d=await L();if(!d)throw t("No token available for saving file references, aborting"),new Error("Authentication token not available");const p=`
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
    `,a={updatedFileReferenceInputs:o};t("GraphQL file references-only mutation variables (first item):",o.length>0?o[0]:"No items");try{t("Sending API request to save file references");const C=await fetch(ne,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${d}`},body:JSON.stringify({query:p,variables:a})});t(`API response status: ${C.status}`);const J=await C.text();t(`API response raw text: ${J.substring(0,500)}...`);const B=JSON.parse(J);if(t("API response JSON items count:",((b=(n=(v=B.data)==null?void 0:v.changeFiles0)==null?void 0:n.items)==null?void 0:b.length)||0),B.errors)throw console.error("File references save failed:",B.errors),t("File references save failed with errors:",B.errors),new Error("Failed to save file references");return t("File references chunk saved successfully"),((S=(u=B.data)==null?void 0:u.changeFiles0)==null?void 0:S.items)||[]}catch(C){throw console.error("Error in sendFileReferencesOnlyMutation:",C),t(`Error in sendFileReferencesOnlyMutation: ${C}`),C}},_=async(o,d)=>{var n,b,u,S,C,J,B,m,X;t(`Sending final chunk with folder mutation (${o.length} file references)`);const p=await L();if(!p)throw t("No token available for saving final chunk, aborting"),new Error("Authentication token not available");const a=`
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
    `,v={folderPositionInputs:[d],updatedFileReferenceInputs:o};t("GraphQL final mutation variables (folder + last chunk)");try{t("Sending API request for final save with folder");const z=await fetch(ne,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${p}`},body:JSON.stringify({query:a,variables:v})});t(`API response status: ${z.status}`);const se=await z.text();t(`API response raw text: ${se.substring(0,500)}...`);const G=JSON.parse(se);if(t("API response JSON:",{fileReferencesCount:((u=(b=(n=G.data)==null?void 0:n.changeFiles0)==null?void 0:b.items)==null?void 0:u.length)||0,folderItems:((C=(S=G.data)==null?void 0:S.changeFiles)==null?void 0:C.items)||[]}),G.errors)throw console.error("Final save failed:",G.errors),t("Final save failed with errors:",G.errors),new Error("Failed to complete album save");return t("Final chunk and folder saved successfully"),{fileReferences:((B=(J=G.data)==null?void 0:J.changeFiles0)==null?void 0:B.items)||[],folderPositions:((X=(m=G.data)==null?void 0:m.changeFiles)==null?void 0:X.items)||[]}}catch(z){throw console.error("Error in sendFinalChunkWithFolderMutation:",z),t(`Error in sendFinalChunkWithFolderMutation: ${z}`),z}},h=async()=>(t("Validating required data"),await L()?l?s?(t("All required data validated successfully"),!0):(t("No folder ID, validation failed"),!1):(t("No Cognito username, validation failed"),!1):(t("No token available, validation failed"),!1)),E=()=>{t("Handling successful save"),$t(O,T,[H.SELECTED_PHOTOS,H.SUB_ALBUM_DATA],t),t("Album data cleared");const o=document.getElementById("saveProgressText");o&&(o.innerText="Album saved successfully!",t("Updated progress text to 'Album saved successfully!'")),sessionStorage.setItem("album_just_saved","true"),t("Set 'album_just_saved' flag in sessionStorage"),t("Setting timeout for redirect to my-albums.html"),setTimeout(()=>{t("Redirecting to my-albums.html"),window.location.href="/my-albums.html"},1e3)},D=async(o,d)=>{t("Starting chunked save process");try{q("Processing files in chunks...");const p=48;if(d.length===0)t("No file references to process, saving only folder position"),await y(o);else{const a=Q(d);t(`After removing duplicates, processing ${a.length} unique file references`);const v=K(a,p);t(`Split file references into ${v.length} chunks of max size ${p}`);for(let n=0;n<v.length;n++){const b=v[n];t(`Processing chunk ${n+1} of ${v.length} with ${b.length} file references`);const u=n/v.length*80;r(10+u),W(10+u),n<v.length-1?(q(`Saving files: chunk ${n+1} of ${v.length}...`),await c(b)):(q("Finalizing album..."),await _(b,o))}}r(100),W(100),q("Album saved successfully!"),E()}catch(p){console.error("Error in chunked save process:",p),t(`Error in chunked save process: ${p}`),q(`Error: ${p}`),f(!1)}};return{saveAlbumDirectly:async()=>{t("Starting direct album save"),f(!0),r(5);try{if(t("Validating required data for save"),!await h()){t("Required data validation failed, aborting save"),f(!1);return}const o=Math.floor(Date.now()/1e3),d=`${l}_____${l}____Account`,a=s.split("_____")[1].split("____")[0];t(`Save timestamp: ${o}`),t(`Account ID: ${d}`),t(`Folder ID: ${s}`),t(`Folder target item identifier: ${a}`),t("Creating folder position input");const v=Y(o,d,a);t("Folder position input created:",v);let n=[];const b=x.filter(u=>u.status==="complete");if(t(`Found ${b.length} valid photos with 'complete' status`),b.length>0){const u=b.filter(C=>!C.fileId);t(`Found ${u.length} new uploads to move from temp to public folder`),u.length>0&&(t("Moving files from temp to public folder"),await St(u,W,t)),t("Creating file reference inputs for uploads");const S=ee(b,o,d);t(`Created ${S.length} file reference inputs for uploads`,S),n=n.concat(S)}if(g&&i.length>0){t(`Adding ${i.length} existing file references for sub-album`);const u=i.map(S=>(t(`Creating file reference for existing file ID: ${S}`),{fileReferencesHolderId:s,currentTime:o,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:S,fileInput:null}));t(`Created ${u.length} file reference inputs for existing files`,u),n=n.concat(u)}t(`Total file reference inputs: ${n.length}`),t("Sending GraphQL mutations with chunked file references"),await D(v,n)}catch(o){console.error("Error in saveAlbumDirectly:",o),t(`Error in saveAlbumDirectly: ${o}`),f(!1)}}}},zt=s=>s.map(l=>{const x=l.type,g=l.name.split(".").pop()||"jpg";return{fileName:`${ce()}.${g}`,s3PreviewUrl:URL.createObjectURL(l),type:x,size:l.size,status:"pending",progress:0}}),qt=(s,l,x,g)=>{g(`Updating photos with processed info, starting at index ${s}`),x(i=>{const A=[...i];return l.forEach((k,P)=>{const j=s+P;j<A.length&&(g(`Updating photo at index ${j} with processed info`),A[j]=k)}),A})},Wt=({selectedPhotos:s,isSavingAlbum:l,onRemovePhoto:x})=>{const{t:g}=te();return s.length===0?null:e.jsxs(e.Fragment,{children:[e.jsxs(Ve,{children:[s.length," ",s.length>1?g("photos selected"):g("photo selected"),":"]}),e.jsx(He,{children:s.map((i,A)=>{var k,P;return e.jsxs(Ke,{children:[e.jsx(Qe,{status:i.status,children:i.status==="complete"?"✓":i.status==="error"?"✕":i.status==="uploading"?"↑":i.status==="processing"?"⚙️":"•"}),e.jsxs(Ye,{children:[i.type==="video"||(k=i.type)!=null&&k.startsWith("video")?e.jsx(Xe,{src:i.s3PreviewUrl,controls:!0}):e.jsx(Ze,{src:i.s3PreviewUrl,alt:i.fileName}),(i.status==="uploading"||i.status==="processing")&&e.jsx(Le,{children:e.jsx(et,{progress:i.progress,status:i.status})})]}),e.jsxs(tt,{children:[(P=i.type)!=null&&P.startsWith("video")?g("Video"):g("Image"),i.size&&` • ${(i.size/1024/1024).toFixed(1)} MB`,i.duration&&` • ${i.duration}s`]}),i.status==="error"&&i.errorMessage&&e.jsxs(st,{children:[g("Error"),": ",i.errorMessage.length>40?i.errorMessage.substring(0,37)+"...":i.errorMessage]}),e.jsx(rt,{onClick:()=>x(A),disabled:l,children:g("Remove")})]},A)})})]})},Jt=({progressTracker:s})=>{const{t:l}=te();return s.totalFiles===0?null:e.jsxs(ke,{children:[e.jsx(Ne,{children:l("Upload Progress")}),e.jsxs(Oe,{children:[e.jsxs(Re,{children:[e.jsxs("span",{children:[l("Overall Progress"),": ",Math.round(s.overallProgress*100),"%"]}),e.jsxs("span",{children:[s.filesComplete," ",l("of")," ",s.totalFiles," ",l("complete")]})]}),e.jsx(Ue,{children:e.jsx(Be,{progress:s.overallProgress})})]}),e.jsxs(Me,{children:[s.filesUploading>0&&e.jsxs(ie,{children:[l("Uploading"),": ",s.filesUploading]}),s.filesProcessing>0&&e.jsxs(ie,{children:[l("Processing"),": ",s.filesProcessing]}),s.filesComplete>0&&e.jsxs(ie,{children:[l("Complete"),": ",s.filesComplete]}),s.filesWithError>0&&e.jsxs(ie,{isError:!0,children:[l("Failed"),": ",s.filesWithError]})]})]})},Gt=({isSavingAlbum:s,savingProgress:l})=>{const{t:x}=te();return s?e.jsxs(ze,{children:[e.jsx(qe,{children:x("Saving Album")}),e.jsx(We,{id:"saveProgressText",children:x("Moving files...")}),e.jsx(Je,{children:e.jsx(Ge,{id:"saveProgress",style:{width:`${l}%`}})})]}):null},Vt=({isSubAlbum:s,selectedPhotos:l,selectedFileIds:x})=>{const{t:g}=te();return!s||l.length===0&&x.length===0?null:e.jsxs("div",{style:{backgroundColor:"#e3f2fd",padding:"15px",borderRadius:"8px",marginBottom:"20px",fontSize:"16px"},children:[e.jsxs("p",{style:{margin:0},children:[g("Creating a new sub-album with")," ",e.jsx("strong",{children:x.length})," ",g("selected items")]}),e.jsx("p",{style:{margin:"10px 0 0 0",fontSize:"14px",color:"#0277bd"},children:g("You can add more photos or videos to this sub-album before saving")}),l.length>0&&e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:"10px",marginTop:"15px",justifyContent:"flex-start"},children:[l.slice(0,5).map((i,A)=>e.jsxs("div",{style:{width:"80px",height:"80px",position:"relative",borderRadius:"4px",overflow:"hidden",boxShadow:"0 1px 3px rgba(0,0,0,0.12)"},children:[e.jsx("img",{src:i.s3PreviewUrl,alt:i.fileName,style:{width:"100%",height:"100%",objectFit:"cover"}}),i.type==="video"&&e.jsx("div",{style:{position:"absolute",bottom:"5px",right:"5px",backgroundColor:"rgba(0,0,0,0.7)",color:"white",fontSize:"10px",padding:"2px 4px",borderRadius:"2px"},children:i.duration?`${Math.floor(i.duration)}s`:"Video"})]},A)),l.length>5&&e.jsxs("div",{style:{width:"80px",height:"80px",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"#bbdefb",borderRadius:"4px",color:"#0d47a1",fontWeight:"bold"},children:["+",l.length-5," ",g("more")]})]})]})},Ht=({showFolderDetails:s,isCreator:l,folderName:x,setFolderName:g,folderDescription:i,setFolderDescription:A,isOnPublicProfile:k,handlePublicProfileToggle:P,participantsCanAddItems:j,handleParticipantsCanAddItemsToggle:N,isSavingAlbum:M})=>{const{t:f}=te();return!s||l!==!0?null:e.jsxs(it,{children:[e.jsxs(pe,{children:[e.jsx(me,{htmlFor:"folderName",children:f("Album Name (Optional)")}),e.jsx(ot,{id:"folderName",type:"text",value:x,onChange:r=>g(r.target.value),placeholder:f("Enter album name")})]}),e.jsxs(pe,{children:[e.jsx(me,{htmlFor:"folderDescription",children:f("Album Description (Optional)")}),e.jsx(at,{id:"folderDescription",value:i,onChange:r=>A(r.target.value),placeholder:f("Enter album description"),rows:4})]}),e.jsxs(ge,{children:[e.jsx(he,{children:f(k?"On Public Profile":"Not On Public Profile")}),e.jsxs(be,{children:[e.jsx("input",{type:"checkbox",checked:k,onChange:P,disabled:M}),e.jsx(xe,{})]})]}),e.jsxs(ge,{children:[e.jsx(he,{children:f(j?"Participants Can Add Items":"Participants Cannot Add Items")}),e.jsxs(be,{children:[e.jsx("input",{type:"checkbox",checked:j,onChange:N,disabled:M}),e.jsx(xe,{})]})]})]})},te=()=>({t:s=>s,language:"en"}),Kt=()=>{const{t:s,language:l}=Se(),x=Ie(l)==="rtl",{setShowUsernamePrompt:g,setUsernameInput:i}=Pe(s),[A,k]=I.useState(null),[P,j]=I.useState([]),[N,M]=I.useState([]),[f,r]=I.useState({totalFiles:0,filesComplete:0,filesUploading:0,filesProcessing:0,filesWithError:0,overallProgress:0}),[O,T]=I.useState(!1),[t,q]=I.useState(0),[W,K]=I.useState(""),[Q,Y]=I.useState(""),[ee,y]=I.useState(!1),[c,_]=I.useState(!1),[h,E]=I.useState("NoPassword"),[D,$]=I.useState(""),[o,d]=I.useState(!1),[p,a]=I.useState(!0),[v,n]=I.useState(null),[b,u]=I.useState(!1),[S,C]=I.useState([]),J=Ft(M),B=Ct(j),m=(w,F)=>{let R=`[${new Date().toISOString()}] ${w}`;if(F!==void 0)try{const Z=typeof F=="object"?JSON.stringify(F,null,2):String(F);R+=`
Data: ${Z}`,console.log(R),console.log("Data object:",F)}catch(Z){R+=` [Error stringifying data: ${Z}]`,console.log(R),console.log("Raw data:",F)}else console.log(R);J(R)},{cognitoUsername:X,publicUsername:z,setPublicUsername:se}=Bt(k,j,n,y,K,Y,d,a,E,$,u,C,m),{saveAlbumDirectly:G}=Mt(A,X,P,b,S,W,Q,o,p,h,D,T,q,j,r,m);I.useEffect(()=>{P.length>0&&(localStorage.setItem(H.SELECTED_PHOTOS,JSON.stringify(P)),m(`Saved ${P.length} photos to localStorage`))},[P]),I.useEffect(()=>{jt(P,r)},[P]);const ye=w=>{m(`Removing photo at index: ${w}`);const F=P.filter((V,R)=>R!==w);j(F),m(`New photos count: ${F.length}`),F.length>0?(localStorage.setItem(H.SELECTED_PHOTOS,JSON.stringify(F)),m(`Updated localStorage with ${F.length} photos`)):(localStorage.removeItem(H.SELECTED_PHOTOS),m("Removed photos from localStorage"))},$e=async w=>{if(m("Add photos triggered from file input"),!X){m("No Cognito username available, cannot add photos");return}const F=Array.from(w.target.files||[]);if(m(`Selected ${F.length} files`),!!F.length)try{const V=zt(F);m(`Created ${V.length} initial photo objects`),j(re=>[...re,...V]);const R=P.length;m(`Starting processing at index: ${R}`);const Z=await _t(F,X,(re,ue,fe,Te)=>{B(R+re,ue,fe,Te),m(`Updated status for photo ${R+re}: ${ue}, progress: ${fe}`)},m);m(`Updating ${Z.length} photos with processed info`),qt(R,Z,j,m)}catch(V){console.error("Error in handleAddPhotos:",V),m(`Error in handleAddPhotos: ${V}`)}finally{w.target.value="",m("Reset file input value")}},je=()=>{const w=!o;m(`Toggling isOnPublicProfile to: ${w}`),d(w)},Fe=()=>{const w=!p;m(`Toggling participantsCanAddItems to: ${w}`),a(w)},_e=async()=>{m("Album save initiated"),T(!0);try{if(z!=null&&z.startsWith("Profile-")){m("Public username starts with 'Profile-', showing username prompt"),i(z),g(!0),T(!1);return}m("Valid username found, proceeding to save album directly"),G()}catch(w){console.error("Error in handleSaveAlbum:",w),m(`Error in handleSaveAlbum: ${w}`),T(!1)}},Ce=w=>{m(`Handling successful username update to: ${w}`),localStorage.setItem("publicUsername",w),se(w),g(!1),m("Proceeding to save album after username update"),G()},Ae=(w,F)=>{m(`Password dialog closed with option: ${w}, password: ${F?"******":"undefined"}`),w&&E(w),F!==void 0&&$(F),_(!1)},Ee=()=>h==="NoPassword"?s("Album Password Policy"):`${s(h==="NotVisible"?"Password Required To See Or Save":h==="Watermark"?"Password Required To Remove Watermark Or Save":"Password Required To Save")} ${D?`(${D})`:""}`,De=()=>{m("Opening password dialog"),_(!0)};return e.jsxs(e.Fragment,{children:[e.jsx(dt,{}),e.jsxs(ct,{isRTL:x,children:[e.jsxs("div",{style:{maxWidth:"900px",margin:"0 auto"},children:[e.jsxs(ut,{children:[e.jsx(ft,{href:"/my-albums.html",children:s("My Albums")}),e.jsx(Pt,{t:s})]}),e.jsx(Jt,{progressTracker:f}),e.jsx(Gt,{isSavingAlbum:O,savingProgress:t}),e.jsx(pt,{id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:$e}),e.jsx(Vt,{isSubAlbum:b,selectedPhotos:P,selectedFileIds:S}),e.jsx(Wt,{selectedPhotos:P,isSavingAlbum:O,onRemovePhoto:ye}),e.jsxs(mt,{children:[e.jsx(Ht,{showFolderDetails:ee,isCreator:v,folderName:W,setFolderName:K,folderDescription:Q,setFolderDescription:Y,isOnPublicProfile:o,handlePublicProfileToggle:je,participantsCanAddItems:p,handleParticipantsCanAddItemsToggle:Fe,isSavingAlbum:O}),e.jsx(gt,{onClick:()=>{const w=document.getElementById("file-input");w==null||w.click()},disabled:O,children:s("Add More Photos")}),v===!0&&e.jsx(ht,{passwordSet:h!=="NoPassword",onClick:De,disabled:O,children:Ee()}),e.jsx(bt,{onClick:_e,disabled:O,children:s(O?"Saving Album...":"Save Album")})]}),e.jsx(xt,{t:s,language:l,usernameManager:Pe(s),onSuccess:Ce}),c&&e.jsx(Rt,{isOpen:c,onClose:Ae,initialOption:h,initialPassword:D})]}),e.jsx(vt,{debugMessages:N,t:s,isRTL:x,textDirection:x?"rtl":"ltr"})]})]})},Qt=()=>e.jsx(nt,{children:e.jsx(Kt,{})});lt.createRoot(document.getElementById("root")).render(e.jsx(Qt,{}));
