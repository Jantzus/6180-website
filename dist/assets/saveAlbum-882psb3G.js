import{d as N,u as we,r as $,j as t,g as ve,k as K,i as oe,l as Se,P as Oe,m as Ue,n as ye,o as $e,S as Me,p as Be,q as ze,s as qe,t as We,V as Ge,v as Je,F as Ve,M as He,w as Ke,x as fe,y as pe,z as Qe,D as Ye,T as me,E as ge,J as be,K as he,a as Xe,I as Ze,G as Le,A as et,H as tt,N as rt,O as st,B as le}from"./styled-components-DL0uHAXq.js";import{u as it,U as ot}from"./customHooks-zd8Hyfso.js";import{u as at,U as lt}from"./useFileUploadProcessor-DeO4ttjl.js";import{L as nt,D as dt}from"./DebugLog-D9H_xZ4a.js";import{b as L,g as Pe,s as ct,m as ut,d as ft,e as pt,f as mt}from"./utils-CzC9PFvy.js";const gt=N.div`
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
`,bt=N.div`
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`,ht=N.div`
  font-size: 18px;
  font-weight: 500;
  color: white;
  background-color: #888;
  padding: 15px 20px;
  text-align: center;
`,Pt=N.div`
  direction: ${i=>i.isRTL?"rtl":"ltr"};
  padding: 30px;
`,xe=N.p`
  margin-bottom: 15px;
  font-size: 16px;
`,xt=N.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 25px;
  margin-top: 20px;
  box-sizing: border-box;
`,It=N.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
`,re=N.div`
  display: flex;
  align-items: center;
  cursor: ${i=>i.disabled?"not-allowed":"pointer"};
  opacity: ${i=>i.disabled?.7:1};
`,se=N.input`
  margin-right: 10px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  
  &:disabled {
    cursor: not-allowed;
  }
`,ie=N.label`
  display: flex;
  cursor: ${i=>i.disabled?"not-allowed":"pointer"};
  font-size: 16px;
`,ne=N.span`
  color: #aaa;
  margin-left: 8px;
`,wt=N.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`,Ie=N.button`
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
`,vt=({isOpen:i,onClose:S,initialOption:I="NoPassword",initialPassword:v=""})=>{const{t:s,language:R}=we(),C=ve(R)==="rtl",[F,A]=$.useState(I),[T,U]=$.useState(v);if($.useEffect(()=>{i&&(A(I),U(v))},[i,I,v]),!i)return null;const u=T.trim()==="",r=E=>{E!=="NoPassword"&&u||A(E)},G=E=>{E.target===E.currentTarget&&S()};return t.jsx(gt,{onClick:G,children:t.jsxs(bt,{children:[t.jsx(ht,{children:s("Album Password Policy")}),t.jsxs(Pt,{isRTL:C,children:[t.jsx(xe,{children:s("Enter a password for this album.")}),t.jsx(xt,{type:"text",placeholder:s("Enter password"),value:T,onChange:E=>U(E.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"}),t.jsx(xe,{children:s("Select password restrictions.")}),t.jsxs(It,{children:[t.jsxs(re,{disabled:u,children:[t.jsx(se,{type:"radio",name:"protection",id:"notVisible",checked:F==="NotVisible",onChange:()=>{},disabled:u,onClick:()=>!u&&r("NotVisible")}),t.jsxs(ie,{htmlFor:"notVisible",disabled:u,children:[s("Password Required To See Or Save"),u&&t.jsx(ne,{children:s("Password required")})]})]}),t.jsxs(re,{disabled:u,children:[t.jsx(se,{type:"radio",name:"protection",id:"watermark",checked:F==="Watermark",onChange:()=>{},disabled:u,onClick:()=>!u&&r("Watermark")}),t.jsxs(ie,{htmlFor:"watermark",disabled:u,children:[s("Password Required To Remove Watermark Or Save"),u&&t.jsx(ne,{children:s("Password required")})]})]}),t.jsxs(re,{disabled:u,children:[t.jsx(se,{type:"radio",name:"protection",id:"cannotBeSaved",checked:F==="CannotBeSaved",onChange:()=>{},disabled:u,onClick:()=>!u&&r("CannotBeSaved")}),t.jsxs(ie,{htmlFor:"cannotBeSaved",disabled:u,children:[s("Password Required To Save"),u&&t.jsx(ne,{children:s("Password required")})]})]}),t.jsxs(re,{disabled:!1,children:[t.jsx(se,{type:"radio",name:"protection",id:"noPassword",checked:F==="NoPassword",onChange:()=>{},onClick:()=>r("NoPassword")}),t.jsx(ie,{htmlFor:"noPassword",disabled:!1,children:s("No Password")})]})]}),t.jsxs(wt,{children:[t.jsx(Ie,{onClick:()=>S(),children:s("Cancel")}),t.jsx(Ie,{onClick:()=>{console.log(`Saving with option: ${F}, password: ${T.length>0?"********":"none"}`),S(F,T)},children:s("Save")})]})]})]})})},St=`
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
`,yt=(i,S,I,v,s,R,C,F,A,T,U,u,r)=>{const[G,E]=$.useState(null),[e,M]=$.useState(null),q=async h=>{r(`Initializing folder ID with username: ${h}`);try{const y=new URLSearchParams(window.location.search).get("folderId");if(r(`Folder ID from URL: ${y||"null"}`),y){i(y),r(`Using existing folder ID: ${y}`);try{r(`Fetching details for folder: ${y}`);const m=await Y(y,r);if(r("Folder details retrieved:",m),m){const _=`${h}_____${h}____Account`,D=m.creatorId===_;if(r(`User is creator of folder: ${D}, accountId: ${_}, creator: ${m.creatorId}`),I(D),D){r("User is creator, showing folder details"),v(!0),s(m.folderName),R(m.folderDescription),C(m.isOnPublicProfile),r(`Setting isOnPublicProfile: ${m.isOnPublicProfile}`),m.participantsCanAddItems!==void 0&&(F(m.participantsCanAddItems),r(`Setting participantsCanAddItems: ${m.participantsCanAddItems}`));const w=m.passwordPolicy;r(`Password policy from folder details: ${w}`),A(w),w!=="NoPassword"&&m.password&&T(m.password),r(`Set password protection option to: ${w}`)}else r("User is NOT the creator, hiding editable fields"),v(!1)}else r("No folder details retrieved, setting isCreator to false"),I(!1)}catch(m){console.error("Error fetching folder details:",m),r(`Error fetching folder details: ${m}`),I(!1)}}else{const m=`${h}_____${Pe()}____Folder`;r(`Creating new folder ID: ${m}`),i(m),r("Setting isCreator to true for new album"),I(!0),v(!0)}}catch(c){console.error("Folder ID initialization error:",c),r(`Folder ID initialization error: ${c}`),I(!1)}},Y=async(h,c)=>{var y,m,_,D,w,o,n,f;c(`Fetching details for folder ID: ${h}`);try{const a=await L();if(!a)return c("No token available for fetching folder details"),null;c("Sending GraphQL query to fetch folder details");const l=await(await fetch(oe,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({query:St,variables:{folderIds:[h]}})})).json();if(c("Folder details API response:",l),l.errors)return console.error("GraphQL errors:",l.errors),c(`GraphQL errors: ${JSON.stringify(l.errors)}`),null;const p=((m=(y=l==null?void 0:l.data)==null?void 0:y.fetchFolders)==null?void 0:m.items)||[];if(c(`Found ${p.length} folder items`),p.length===0)return c("No folder items found"),null;const d=p[0];c("Retrieved folder data:",d);const g=((D=(_=d.folderPosition)==null?void 0:_.profileIds)==null?void 0:D.some(z=>z.includes("Public____Profile")))||!1;c(`Folder is on public profile: ${g}`),c("Profile IDs:",(w=d.folderPosition)==null?void 0:w.profileIds);const x=(o=d.folderInviteParameters)==null?void 0:o.usingFolderInviteGrantsRightToAddItems;return c(`Participants can add items: ${x}`),{creatorId:d.creatorId||"",folderName:d.folderName||"",folderDescription:d.folderDescription||"",passwordPolicy:((n=d.folderPassword)==null?void 0:n.policy)||"NoPassword",password:((f=d.folderPassword)==null?void 0:f.password)||"",isOnPublicProfile:g,participantsCanAddItems:x!==void 0?x:!0}}catch(a){return console.error("Error in fetchFolderDetails:",a),c(`Error in fetchFolderDetails: ${a}`),null}},X=()=>{r("Attempting to restore photos from localStorage");try{const h=localStorage.getItem(K.SELECTED_PHOTOS);if(r(`Found stored photos: ${h?"yes":"no"}`),h)try{const c=JSON.parse(h);r(`Parsed ${c.length} photos from localStorage`),Array.isArray(c)&&c.length>0&&(S(c),r(`Restored ${c.length} photos to state`))}catch(c){console.error("Error parsing stored photos:",c),r(`Error parsing stored photos: ${c}`)}}catch(h){console.error("Error restoring photos from storage:",h),r(`Error restoring photos from storage: ${h}`)}},B=()=>{r("Testing S3 connection");try{ct?r("S3 client is available"):(console.error("S3 client not available"),r("S3 client not available"))}catch(h){console.error("S3 connection test error:",h),r(`S3 connection test error: ${h}`)}},Z=async()=>{var h;r("Starting component initialization");try{r("Checking login with refresh");const c=await L();if(!c){r("No token returned from login check, aborting initialization");return}try{const y=localStorage.getItem(K.PUBLIC_USERNAME);r(`Retrieved public username from localStorage: ${y||"null"}`),M(y||null);const _=JSON.parse(atob(c.split(".")[1]))["cognito:username"];if(_){r(`Extracted Cognito username from token: ${_}`),E(_);const D=localStorage.getItem(K.SUB_ALBUM_DATA);if(r(`Sub-album data from localStorage: ${D||"null"}`),D)try{const w=JSON.parse(D);if(r("Parsed sub-album data:",w),w.isSubAlbum&&((h=w.selectedFileIds)==null?void 0:h.length)>0){r(`Valid sub-album data found with ${w.selectedFileIds.length} files`),U(!0),u(w.selectedFileIds),w.selectedPhotos&&w.selectedPhotos.length>0&&(r(`Found ${w.selectedPhotos.length} selected photos in sub-album data`),S(w.selectedPhotos)),v(!0),I(!0);const o=`${_}_____${Pe()}____Folder`;r(`Generated new folder ID for sub-album: ${o}`),i(o)}else r("Invalid sub-album data, proceeding with normal initialization"),await q(_)}catch(w){console.error("Error parsing sub-album data:",w),r(`Error parsing sub-album data: ${w}`),await q(_)}else r("No sub-album data found, proceeding with normal folder initialization"),await q(_)}else r("No Cognito username found in token")}catch(y){console.error("User data initialization error:",y),r(`User data initialization error: ${y}`)}X(),B(),r("Component initialization completed")}catch(c){console.error("Initialization error:",c),r(`Initialization error: ${c}`)}};return $.useEffect(()=>{Z()},[]),{cognitoUsername:G,publicUsername:e,setPublicUsername:M}},$t=(i,S,I,v,s,R,C,F,A,T,U,u,r,G,E,e)=>{const M=o=>{e(`Save progress text: ${o}`);const n=document.getElementById("saveProgressText");n&&(n.innerText=o)},q=o=>{const n=document.getElementById("saveProgress");n?(n.style.width=`${o}%`,e(`Updated save progress bar: ${o}%`)):e("Progress bar element not found"),r(o)},Y=(o,n)=>{e(`Splitting array of ${o.length} items into chunks of ${n}`);const f=[];for(let a=0;a<o.length;a+=n)f.push(o.slice(a,a+n));return e(`Created ${f.length} chunks`),f},X=o=>{const n=new Set;return o.filter(f=>n.has(f.fileId)?(e(`Skipping duplicate file reference with ID: ${f.fileId}`),!1):(n.add(f.fileId),!0))},B=(o,n,f)=>{e("Creating folder position input"),e(`Profile visibility: ${F?"Public":"Only Me"}`);const a=F?[`${S}_____Public____Profile`]:["Only Me_____Only Me____Profile"];e(`Profile IDs: ${JSON.stringify(a)}`);let b=[];v&&s.length>0&&(e(`Creating file reference IDs for ${s.length} sub-album files`),b=s.map(g=>{const x=g.split("_____");if(x.length>=2){const O=x[1].split("____")[0],Q=`${f}_____${O}____FileReference`;return e(`Created file reference ID for sub-album: ${Q}`),Q}return e(`Using original fileId as fallback: ${g}`),g})),e(`Created ${b.length} acceptedFileReferenceIds`);const l=T!=="NoPassword"?U:null;if(e(`Password protection: ${T}`),e(`Album password: ${l?"******":"null"}`),e(`Participants can add items: ${A}`),!i)throw e("Error: folderId is null or undefined"),new Error("folderId is required to create folder position input");const p=ft(i),d=pt(p);return{currentTime:o,folderId:i,profileIds:a,folderPositionSelectedTagInputs:[],folderPositionPoints:1,acceptedFileReferenceIds:b,folderInput:{folderSelectedTagInputs:[],folderAboutContactIds:[n],albumNanoId:d,folderName:R,folderDescription:C,folderPasswordInput:{password:l,policy:T},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,usingFolderInviteGrantsRightToRemoveItems:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:A,addedItemsNeedFolderCreatorApproval:!1}}}},Z=(o,n,f)=>(e(`Creating file reference inputs for ${o.length} photos`),o.map(a=>{var p;if(a.fileId)return e(`Using existing fileId for photo: ${a.fileId}`),{fileReferencesHolderId:i,currentTime:n,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:a.fileId,fileInput:null};const b=a.type==="video"||(p=a.type)!=null&&p.startsWith("video")?`Input/Video/${a.fileName}`:`Input/Image/${a.fileName}`,l=`${S}_____${a.fileName}____File`;return e(`Created file reference for ${a.fileName}:`),e(`  - dataKey: ${b}`),e(`  - fileId: ${l}`),e(`  - thumbnailDataKey: ${a.thumbnailDataKey||"undefined"}`),e(`  - size: ${a.size}`),e(`  - thumbnailSize: ${a.thumbnailSize||0}`),e(`  - duration: ${a.duration||"undefined"}`),{fileReferencesHolderId:i,currentTime:n,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:l,fileInput:{fileId:l,ownerFileInput:{editorContactIds:[f],FileSharingOptionsEnum:"Anyone",dataKey:b,thumbnailDataKey:a.thumbnailDataKey,dataInBytes:a.size,thumbnailDataInBytes:a.thumbnailSize||0,s3UploadedAt:n,durationInSeconds:a.duration},editorFileInput:{aboutContactIds:[f],captionText:"",numericFilterInputs:[]}}}})),h=async o=>{var b,l;e("Sending folder-only mutation (no file references)");const n=await L();if(!n)throw e("No token available for saving album, aborting"),new Error("Authentication token not available");const f=`
      mutation MyMutation($folderPositionInputs: [FolderPositionInput!]) {
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items {
            id
          }
        }
      }
    `,a={folderPositionInputs:[o]};e("GraphQL folder-only mutation variables:",a);try{e("Sending API request to save folder");const p=await fetch(oe,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({query:f,variables:a})});e(`API response status: ${p.status}`);const d=await p.text();e(`API response raw text: ${d}`);const g=JSON.parse(d);if(e("API response JSON:",g),g.errors)throw console.error("Folder save failed:",g.errors),e("Folder save failed with errors:",g.errors),new Error("Failed to save folder");return e("Folder saved successfully"),((l=(b=g.data)==null?void 0:b.changeFiles)==null?void 0:l.items)||[]}catch(p){throw console.error("Error in sendFolderOnlyMutation:",p),e(`Error in sendFolderOnlyMutation: ${p}`),p}},c=async o=>{var b,l,p,d,g;e(`Sending file references-only mutation with ${o.length} items`);const n=await L();if(!n)throw e("No token available for saving file references, aborting"),new Error("Authentication token not available");const f=`
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
    `,a={updatedFileReferenceInputs:o};e("GraphQL file references-only mutation variables (first item):",o.length>0?o[0]:"No items");try{e("Sending API request to save file references");const x=await fetch(oe,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({query:f,variables:a})});e(`API response status: ${x.status}`);const z=await x.text();e(`API response raw text: ${z.substring(0,500)}...`);const O=JSON.parse(z);if(e("API response JSON items count:",((p=(l=(b=O.data)==null?void 0:b.changeFiles0)==null?void 0:l.items)==null?void 0:p.length)||0),O.errors)throw console.error("File references save failed:",O.errors),e("File references save failed with errors:",O.errors),new Error("Failed to save file references");return e("File references chunk saved successfully"),((g=(d=O.data)==null?void 0:d.changeFiles0)==null?void 0:g.items)||[]}catch(x){throw console.error("Error in sendFileReferencesOnlyMutation:",x),e(`Error in sendFileReferencesOnlyMutation: ${x}`),x}},y=async(o,n)=>{var l,p,d,g,x,z,O,Q,J;e(`Sending final chunk with folder mutation (${o.length} file references)`);const f=await L();if(!f)throw e("No token available for saving final chunk, aborting"),new Error("Authentication token not available");const a=`
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
    `,b={folderPositionInputs:[n],updatedFileReferenceInputs:o};e("GraphQL final mutation variables (folder + last chunk)");try{e("Sending API request for final save with folder");const V=await fetch(oe,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${f}`},body:JSON.stringify({query:a,variables:b})});e(`API response status: ${V.status}`);const ee=await V.text();e(`API response raw text: ${ee.substring(0,500)}...`);const W=JSON.parse(ee);if(e("API response JSON:",{fileReferencesCount:((d=(p=(l=W.data)==null?void 0:l.changeFiles0)==null?void 0:p.items)==null?void 0:d.length)||0,folderItems:((x=(g=W.data)==null?void 0:g.changeFiles)==null?void 0:x.items)||[]}),W.errors)throw console.error("Final save failed:",W.errors),e("Final save failed with errors:",W.errors),new Error("Failed to complete album save");return e("Final chunk and folder saved successfully"),{fileReferences:((O=(z=W.data)==null?void 0:z.changeFiles0)==null?void 0:O.items)||[],folderPositions:((J=(Q=W.data)==null?void 0:Q.changeFiles)==null?void 0:J.items)||[]}}catch(V){throw console.error("Error in sendFinalChunkWithFolderMutation:",V),e(`Error in sendFinalChunkWithFolderMutation: ${V}`),V}},m=async()=>(e("Validating required data"),await L()?S?i?(e("All required data validated successfully"),!0):(e("No folder ID, validation failed"),!1):(e("No Cognito username, validation failed"),!1):(e("No token available, validation failed"),!1)),_=()=>{e("Handling successful save"),mt(G,E,[K.SELECTED_PHOTOS,K.SUB_ALBUM_DATA],e),e("Album data cleared");const o=document.getElementById("saveProgressText");o&&(o.innerText="Album saved successfully!",e("Updated progress text to 'Album saved successfully!'")),sessionStorage.setItem("album_just_saved","true"),e("Set 'album_just_saved' flag in sessionStorage"),e("Setting timeout for redirect to my-albums.html"),setTimeout(()=>{e("Redirecting to my-albums.html"),window.location.href="/my-albums.html"},1e3)},D=async(o,n)=>{e("Starting chunked save process");try{M("Processing files in chunks...");const f=48;if(n.length===0)e("No file references to process, saving only folder position"),await h(o);else{const a=X(n);e(`After removing duplicates, processing ${a.length} unique file references`);const b=Y(a,f);e(`Split file references into ${b.length} chunks of max size ${f}`);for(let l=0;l<b.length;l++){const p=b[l];e(`Processing chunk ${l+1} of ${b.length} with ${p.length} file references`);const d=l/b.length*80;r(10+d),q(10+d),l<b.length-1?(M(`Saving files: chunk ${l+1} of ${b.length}...`),await c(p)):(M("Finalizing album..."),await y(p,o))}}r(100),q(100),M("Album saved successfully!"),_()}catch(f){console.error("Error in chunked save process:",f),e(`Error in chunked save process: ${f}`),M(`Error: ${f}`),u(!1)}};return{saveAlbumDirectly:async()=>{e("Starting direct album save"),u(!0),r(5);try{if(e("Validating required data for save"),!await m()){e("Required data validation failed, aborting save"),u(!1);return}const o=Math.floor(Date.now()/1e3),n=`${S}_____${S}____Account`,a=i.split("_____")[1].split("____")[0];e(`Save timestamp: ${o}`),e(`Account ID: ${n}`),e(`Folder ID: ${i}`),e(`Folder target item identifier: ${a}`),e("Creating folder position input");const b=B(o,n,a);e("Folder position input created:",b);let l=[];const p=I.filter(d=>d.status==="complete");if(e(`Found ${p.length} valid photos with 'complete' status`),p.length>0){const d=p.filter(x=>!x.fileId);e(`Found ${d.length} new uploads to move from temp to public folder`),d.length>0&&(e("Moving files from temp to public folder"),await ut(d,q,e)),e("Creating file reference inputs for uploads");const g=Z(p,o,n);e(`Created ${g.length} file reference inputs for uploads`,g),l=l.concat(g)}if(v&&s.length>0){e(`Adding ${s.length} existing file references for sub-album`);const d=s.map(g=>(e(`Creating file reference for existing file ID: ${g}`),{fileReferencesHolderId:i,currentTime:o,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:g,fileInput:null}));e(`Created ${d.length} file reference inputs for existing files`,d),l=l.concat(d)}e(`Total file reference inputs: ${l.length}`),e("Sending GraphQL mutations with chunked file references"),await D(b,l)}catch(o){console.error("Error in saveAlbumDirectly:",o),e(`Error in saveAlbumDirectly: ${o}`),u(!1)}}}},Ft=({selectedPhotos:i,isSavingAlbum:S,onRemovePhoto:I})=>{const{t:v}=de();return i.length===0?null:t.jsxs(t.Fragment,{children:[t.jsxs(Me,{children:[i.length," ",i.length>1?v("photos selected"):v("photo selected"),":"]}),t.jsx(Be,{children:i.map((s,R)=>{var C,F;return t.jsxs(ze,{children:[t.jsx(qe,{status:s.status,children:s.status==="complete"?"✓":s.status==="error"?"✕":s.status==="uploading"?"↑":s.status==="processing"?"⚙️":"•"}),t.jsxs(We,{children:[s.type==="video"||(C=s.type)!=null&&C.startsWith("video")?t.jsx(Ge,{src:s.s3PreviewUrl,controls:!0}):t.jsx(Je,{src:s.s3PreviewUrl,alt:s.fileName}),(s.status==="uploading"||s.status==="processing")&&t.jsx(ye,{bottom:"4px",left:"4px",right:"4px",height:"4px",children:t.jsx($e,{progress:s.progress,status:s.status})})]}),t.jsxs(Ve,{children:[(F=s.type)!=null&&F.startsWith("video")?v("Video"):v("Image"),s.size&&` • ${(s.size/1024/1024).toFixed(1)} MB`,s.duration&&` • ${s.duration}s`]}),s.status==="error"&&s.errorMessage&&t.jsxs(He,{type:"error",children:[v("Error"),": ",s.errorMessage.length>40?s.errorMessage.substring(0,37)+"...":s.errorMessage]}),t.jsx(Ke,{onClick:()=>I(R),disabled:S,children:v("Remove")})]},R)})})]})},_t=({isSavingAlbum:i,savingProgress:S})=>{const{t:I}=de();return i?t.jsxs(Se,{children:[t.jsx(Oe,{children:I("Saving Album")}),t.jsx(Ue,{id:"saveProgressText",children:I("Moving files...")}),t.jsx(ye,{children:t.jsx($e,{id:"saveProgress",progress:S/100})})]}):null},At=({showFolderDetails:i,isCreator:S,folderName:I,setFolderName:v,folderDescription:s,setFolderDescription:R,isOnPublicProfile:C,handlePublicProfileToggle:F,participantsCanAddItems:A,handleParticipantsCanAddItemsToggle:T,isSavingAlbum:U})=>{const{t:u}=de();return!i||S!==!0?null:t.jsxs(Se,{children:[t.jsxs(fe,{children:[t.jsx(pe,{htmlFor:"folderName",children:u("Album Name (Optional)")}),t.jsx(Qe,{id:"folderName",type:"text",value:I,onChange:r=>v(r.target.value),placeholder:u("Enter album name")})]}),t.jsxs(fe,{children:[t.jsx(pe,{htmlFor:"folderDescription",children:u("Album Description (Optional)")}),t.jsx(Ye,{id:"folderDescription",value:s,onChange:r=>R(r.target.value),placeholder:u("Enter album description"),rows:4})]}),t.jsxs(me,{children:[t.jsx(ge,{children:u(C?"On Public Profile":"Not On Public Profile")}),t.jsxs(be,{children:[t.jsx("input",{type:"checkbox",checked:C,onChange:F,disabled:U}),t.jsx(he,{})]})]}),t.jsxs(me,{children:[t.jsx(ge,{children:u(A?"Participants Can Add Items":"Participants Cannot Add Items")}),t.jsxs(be,{children:[t.jsx("input",{type:"checkbox",checked:A,onChange:T,disabled:U}),t.jsx(he,{})]})]})]})},de=()=>({t:i=>i,language:"en"}),jt=()=>{const{t:i,language:S}=we(),I=ve(S)==="rtl",v=it(i),{setShowUsernamePrompt:s,setUsernameInput:R}=v,[C,F]=$.useState(null),[A,T]=$.useState(!1),[U,u]=$.useState(0),[r,G]=$.useState(""),[E,e]=$.useState(""),[M,q]=$.useState(!1),[Y,X]=$.useState(!1),[B,Z]=$.useState("NoPassword"),[h,c]=$.useState(""),[y,m]=$.useState(!1),[_,D]=$.useState(!0),[w,o]=$.useState(null),[n,f]=$.useState(!1),[a,b]=$.useState([]),l=P=>{!C&&P&&F(P)},{fileInputRef:p,selectedPhotos:d,setSelectedPhotos:g,isUploading:x,progressTracker:z,setProgressTracker:O,debugMessages:Q,currentFolderId:J,openFilePicker:V,handleFileSelection:ee,log:W}=at(l),j=(P,k)=>{let H=`[${new Date().toISOString()}] ${P}`;if(k!==void 0)try{const ae=typeof k=="object"?JSON.stringify(k,null,2):String(k);H+=`
Data: ${ae}`,console.log(H),console.log("Data object:",k)}catch(ae){H+=` [Error stringifying data: ${ae}]`,console.log(H),console.log("Raw data:",k)}else console.log(H);W(H)},{cognitoUsername:ce,publicUsername:te,setPublicUsername:Fe}=yt(F,g,o,q,G,e,m,D,Z,c,f,b,j),{saveAlbumDirectly:ue}=$t(C||J,ce,d,n,a,r,E,y,_,B,h,T,u,g,O,j);$.useEffect(()=>{J&&!C&&(F(J),j(`Updated folder ID from upload processor: ${J}`))},[J,C]);const _e=P=>{j(`Removing photo at index: ${P}`);const k=d.filter((Re,H)=>H!==P);g(k),j(`New photos count: ${k.length}`),k.length>0?(localStorage.setItem(K.SELECTED_PHOTOS,JSON.stringify(k)),j(`Updated localStorage with ${k.length} photos`)):(localStorage.removeItem(K.SELECTED_PHOTOS),j("Removed photos from localStorage"))},Ae=()=>{const P=!y;j(`Toggling isOnPublicProfile to: ${P}`),m(P)},je=()=>{const P=!_;j(`Toggling participantsCanAddItems to: ${P}`),D(P)},Ce=async()=>{j("Album save initiated"),T(!0);try{if(te!=null&&te.startsWith("Profile-")){j("Public username starts with 'Profile-', showing username prompt"),R(te),s(!0),T(!1);return}j("Valid username found, proceeding to save album directly"),ue()}catch(P){console.error("Error in handleSaveAlbum:",P),j(`Error in handleSaveAlbum: ${P}`),T(!1)}},Te=P=>{j(`Handling successful username update to: ${P}`),localStorage.setItem(K.PUBLIC_USERNAME,P),Fe(P),s(!1),j("Proceeding to save album after username update"),ue()},ke=(P,k)=>{j(`Password dialog closed with option: ${P}, password: ${k?"******":"undefined"}`),P&&Z(P),k!==void 0&&c(k),X(!1)},De=()=>B==="NoPassword"?i("Album Password Policy"):`${i(B==="NotVisible"?"Password Required To See Or Save":B==="Watermark"?"Password Required To Remove Watermark Or Save":"Password Required To Save")} ${h?`(${h})`:""}`,Ee=()=>{j("Opening password dialog"),X(!0)},Ne=()=>{j("Add photos button clicked"),V(C)};return t.jsxs(t.Fragment,{children:[t.jsx(Le,{}),t.jsxs(et,{isRTL:I,children:[t.jsxs("div",{style:{maxWidth:"900px",margin:"0 auto"},children:[t.jsxs(tt,{children:[t.jsx(rt,{href:"/my-albums.html",children:i("My Albums")}),t.jsx(nt,{t:i})]}),t.jsx(lt,{progressTracker:z,t:i,isRTL:I,variant:"detailed"}),t.jsx(_t,{isSavingAlbum:A,savingProgress:U}),t.jsx("input",{ref:p,id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:P=>ee(P,ce),style:{display:"none"}}),t.jsx(Ft,{selectedPhotos:d,isSavingAlbum:A||x,onRemovePhoto:_e}),t.jsxs(st,{children:[t.jsx(At,{showFolderDetails:M,isCreator:w,folderName:r,setFolderName:G,folderDescription:E,setFolderDescription:e,isOnPublicProfile:y,handlePublicProfileToggle:Ae,participantsCanAddItems:_,handleParticipantsCanAddItemsToggle:je,isSavingAlbum:A||x}),t.jsx(le,{onClick:Ne,disabled:A||x,children:i(x?"Uploading...":"Add More Photos")}),w===!0&&t.jsx(le,{passwordSet:B!=="NoPassword",onClick:Ee,disabled:A||x,children:De()}),t.jsx(le,{primary:!0,onClick:Ce,disabled:A||x,children:i(A?"Saving Album...":"Save Album")})]}),t.jsx(ot,{t:i,language:S,usernameManager:v,onSuccess:Te}),Y&&t.jsx(vt,{isOpen:Y,onClose:ke,initialOption:B,initialPassword:h})]}),t.jsx(dt,{debugMessages:Q,t:i,isRTL:I,textDirection:I?"rtl":"ltr"})]})]})},Ct=()=>t.jsx(Ze,{children:t.jsx(jt,{})});Xe.createRoot(document.getElementById("root")).render(t.jsx(Ct,{}));
