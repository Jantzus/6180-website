import{m as be,k as Re,r,l as he,n as mt,s as Rs,o as zs,p as Os,q as Ms,a as De,v as Ct,t as m,d as $,w as $e,u as ge,j as e,P as Bs,M as Us,x as Dt,g as Fe,B as Ke,G as Et,F as Ft,y as Nt,z as _t,b as Rt,D as zt,E as Gs,R as Ws,I as Ks}from"./buttons-DmOL7fFv.js";import{F as Hs}from"./types-CyPfckSQ.js";import{u as qs,U as Js}from"./UploadProgress-CPjeWyET.js";import{M as Qs,V as Vs,a as Ys,u as Ot,U as Mt}from"./UsernamePrompt-YTP1QG_w.js";import{L as Xs}from"./LazyImage-DxoJHmkk.js";import{F as xt,a as bt,b as Zs,c as Ls}from"./forms-B4HN34YU.js";import{g as wt,c as Le}from"./folderStructureUtils-BmdkosLC.js";const er=`
  query FetchFolders($folderIds: [String!]!, $fetchRelationsInput: FetchRelationsInput!) {
    fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
      items {
        ... on Tag {
          id
          createdAt
          updatedAt
          TagType
          tagTitle
          points
          subtags {
            items {
              id
              createdAt
              updatedAt
              TagType
              tagTitle
              subtagTitle
              points
            }
            nextToken
          }
        }
      }
      nextToken
    }
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
            id
            fileDisplayName
            selectedTags {
              TagType
              tagTitle
              subtags {
                  TagType
                  tagTitle
                  subtagTitle
              }
            }          
            file {
              ownerContactId
              dataKey
              thumbnailDataKey
              durationInSeconds
              dataInBytes
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
          usingFolderInviteGrantsRightToRemoveItems
        }
        folderPosition {
          id
          profileIds
        }          
      }
    }
  }
`,tr=`
  mutation MyMutation($folderPositionInputs: [FolderPositionInput!]) {
    changeFiles(folderPositionInputs: $folderPositionInputs) {
      items {
        id
      }
    }
  }
`,sr=`
  mutation MyMutation($updatedFileReferenceInputs: [UpdatedFileReferenceInput!]) {
    changeFiles0(updatedFileReferenceInputs: $updatedFileReferenceInputs) {
      items {
        ... on FileReference {
          id
          createdAt
          updatedAt
          fileId
          fileDisplayName
          file {
            dataKey
            thumbnailDataKey
          }
        }
      }
    }
  }
`,rr=`
  mutation MyMutation(
    $folderPositionInputs: [FolderPositionInput!],
    $updatedFileReferenceInputs: [UpdatedFileReferenceInput!]
  ) {
    changeFiles0(updatedFileReferenceInputs: $updatedFileReferenceInputs) {
      items {
        ... on FileReference { 
          id 
          createdAt 
          updatedAt 
          fileId 
          fileDisplayName
          file { 
            dataKey 
            thumbnailDataKey 
          } 
        }
      }
    }
    changeFiles(folderPositionInputs: $folderPositionInputs) {
      items { id }
    }
  }
`,ir=`
  mutation DeleteFileReferences($deletedFileReferenceIds: [ID!]!) {
    changeFiles(deletedFileReferenceIds: $deletedFileReferenceIds) {
      items {
        id
      }
    }
  }
`;class Ee{static async fetchFolderDetails(i,s){var n,u,g,a,o,c;s(`Fetching details for folder ID: ${i}`);try{const d=await be();if(!d)return s("No token available for fetching folder details"),null;s("Sending GraphQL query to fetch folder details");const f=await(await fetch(Re,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${d}`},body:JSON.stringify({query:er,variables:{folderIds:[i],fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(s("Folder details API response:",f),f.errors)return console.error("GraphQL errors:",f.errors),s(`GraphQL errors: ${JSON.stringify(f.errors)}`),null;const p=((u=(n=f==null?void 0:f.data)==null?void 0:n.fetchFolders)==null?void 0:u.items)||[];if(s(`Found ${p.length} folder items`),p.length===0)return s("No folder items found"),null;const l=p[0];s("Retrieved folder data:",l);const v=l.folderPosition,O=v==null?void 0:v.profileIds,z=Array.isArray(O)&&O.some(re=>re.includes("Public____Profile"))||!1;s(`Folder is on public profile: ${z}`),s("Profile IDs:",O);const j=(g=l.folderInviteParameters)==null?void 0:g.usingFolderInviteGrantsRightToAddItems;s(`Participants can add items: ${j}`);const Q=(a=l.folderInviteParameters)==null?void 0:a.usingFolderInviteGrantsRightToRemoveItems;return s(`Participants can delete items: ${Q}`),{creatorId:l.creatorId||"",folderName:l.folderName||"",folderDescription:l.folderDescription||"",passwordPolicy:((o=l.folderPassword)==null?void 0:o.policy)||"NoPassword",password:((c=l.folderPassword)==null?void 0:c.password)||"",isOnPublicProfile:z,participantsCanAddItems:j!==void 0?j:!0,participantsCanDeleteItems:Q!==void 0?Q:!1}}catch(d){return console.error("Error in fetchFolderDetails:",d),s(`Error in fetchFolderDetails: ${d}`),null}}static async saveFolderOnly(i,s){var g,a;s("Sending folder-only mutation (no file references, no folder tags)");const n=await be();if(!n)throw s("No token available for saving album, aborting"),new Error("Authentication token not available");const u={folderPositionInputs:[i]};s("GraphQL folder-only mutation variables:",u);try{s("Sending API request to save folder");const o=await fetch(Re,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({query:tr,variables:u})});s(`API response status: ${o.status}`);const c=await o.text();s(`API response raw text: ${c}`);const d=JSON.parse(c);if(s("API response JSON:",d),d.errors)throw console.error("Folder save failed:",d.errors),s("Folder save failed with errors:",d.errors),new Error("Failed to save folder");return s("Folder saved successfully"),((a=(g=d.data)==null?void 0:g.changeFiles)==null?void 0:a.items)||[]}catch(o){throw console.error("Error in saveFolderOnly:",o),s(`Error in saveFolderOnly: ${o}`),o}}static async saveFileReferences(i,s){var g,a,o,c,d;s(`Sending file references-only mutation with ${i.length} items (each with individual tags and filenames)`);const n=await be();if(!n)throw s("No token available for saving file references, aborting"),new Error("Authentication token not available");const u={updatedFileReferenceInputs:i};s("GraphQL file references-only mutation variables (first item):",i.length>0?i[0]:"No items");try{s("Sending API request to save file references with individual tags and filenames");const x=await fetch(Re,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({query:sr,variables:u})});s(`API response status: ${x.status}`);const f=await x.text();s(`API response raw text: ${f.substring(0,500)}...`);const p=JSON.parse(f);if(s("API response JSON items count:",((o=(a=(g=p.data)==null?void 0:g.changeFiles0)==null?void 0:a.items)==null?void 0:o.length)||0),p.errors)throw console.error("File references save failed:",p.errors),s("File references save failed with errors:",p.errors),new Error("Failed to save file references");return s("File references chunk saved successfully with individual photo tags and filenames"),((d=(c=p.data)==null?void 0:c.changeFiles0)==null?void 0:d.items)||[]}catch(x){throw console.error("Error in saveFileReferences:",x),s(`Error in saveFileReferences: ${x}`),x}}static async saveFinalChunkWithFolder(i,s,n){var a,o,c,d,x,f,p,l,v;n(`Sending final chunk with folder mutation (${i.length} file references with filenames, no folder tags)`);const u=await be();if(!u)throw n("No token available for saving final chunk, aborting"),new Error("Authentication token not available");const g={folderPositionInputs:[s],updatedFileReferenceInputs:i};n("GraphQL final mutation variables (folder + last chunk with filenames, no folder tags)");try{n("Sending API request for final save with folder (no folder tags, with filenames)");const O=await fetch(Re,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${u}`},body:JSON.stringify({query:rr,variables:g})});n(`API response status: ${O.status}`);const z=await O.text();n(`API response raw text: ${z.substring(0,500)}...`);const j=JSON.parse(z);if(n("API response JSON:",{fileReferencesCount:((c=(o=(a=j.data)==null?void 0:a.changeFiles0)==null?void 0:o.items)==null?void 0:c.length)||0,folderItems:((x=(d=j.data)==null?void 0:d.changeFiles)==null?void 0:x.items)||[]}),j.errors)throw console.error("Final save failed:",j.errors),n("Final save failed with errors:",j.errors),new Error("Failed to complete album save");return n("Final chunk and folder saved successfully (with individual photo tags and filenames)"),{fileReferences:((p=(f=j.data)==null?void 0:f.changeFiles0)==null?void 0:p.items)||[],folderPositions:((v=(l=j.data)==null?void 0:l.changeFiles)==null?void 0:v.items)||[]}}catch(O){throw console.error("Error in saveFinalChunkWithFolder:",O),n(`Error in saveFinalChunkWithFolder: ${O}`),O}}static async deleteFileReferences(i,s){var g,a;s(`Deleting ${i.length} file references: ${i.join(", ")}`);const n=await be();if(!n)throw s("No token available for deleting file references, aborting"),new Error("Authentication token not available");const u={deletedFileReferenceIds:i};s("GraphQL delete file references mutation variables:",u);try{s("Sending API request to delete file references");const o=await fetch(Re,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({query:ir,variables:u})});s(`API response status: ${o.status}`);const c=await o.text();s(`API response raw text: ${c}`);const d=JSON.parse(c);if(s("API response JSON:",d),d.errors)throw console.error("File references deletion failed:",d.errors),s("File references deletion failed with errors:",d.errors),new Error("Failed to delete file references");return s(`Successfully deleted ${i.length} file references`),((a=(g=d.data)==null?void 0:g.changeFiles)==null?void 0:a.items)||[]}catch(o){throw console.error("Error in deleteFileReferences:",o),s(`Error in deleteFileReferences: ${o}`),o}}}const ar=(t,i,s,n,u,g,a,o,c,d,x,f,p,l)=>{const[v,O]=r.useState(null),[z,j]=r.useState(null),[Q,re]=r.useState(!1),[y,L]=r.useState(!1),[se,W]=r.useState(!1),Z=r.useRef(!1),oe=r.useRef(!1),ee=r.useRef(!1);r.useEffect(()=>{L(!0)},[]);const k=r.useCallback(A=>{if(!y)return null;try{return localStorage.getItem(A)}catch{return null}},[y]),J=r.useCallback(async()=>{if(!(Z.current||!y)){Z.current=!0,l("Starting component initialization");try{l("Checking login with refresh");const A=await be();if(!A){l("No token returned from login check, aborting initialization");return}try{const K=k(he.PUBLIC_USERNAME);l(`Retrieved public username from localStorage: ${K||"null"}`),j(K||null);const G=JSON.parse(atob(A.split(".")[1]))["cognito:username"];G?(l(`Extracted Cognito username from token: ${G}`),O(G)):l("No Cognito username found in token")}catch(K){console.error("User data initialization error:",K),l(`User data initialization error: ${K}`)}l("Component initialization completed")}catch(A){console.error("Initialization error:",A),l(`Initialization error: ${A}`)}finally{re(!0)}}},[y,l,k]),ne=r.useCallback(async A=>{var K;if(!(oe.current||!y)){oe.current=!0,l(`Initializing folder ID with username: ${A}`);try{const G=new URLSearchParams(window.location.search).get("folderId");if(l(`Folder ID from URL: ${G||"null"}`),G){t(G),W(!0),l(`Using existing folder ID: ${G}`),s(!0),n(!0);try{l(`Fetching details for existing folder: ${G}`);const M=await Ee.fetchFolderDetails(G,l);if(M){u(M.folderName),g(M.folderDescription),a(M.isOnPublicProfile),M.participantsCanAddItems!==void 0&&o(M.participantsCanAddItems),M.participantsCanDeleteItems!==void 0&&p(M.participantsCanDeleteItems);const le=M.passwordPolicy;c(le),le!=="NoPassword"&&M.password&&d(M.password)}}catch(M){console.error("Error fetching folder details:",M),l(`Error fetching folder details: ${M}`)}}else{W(!1);const M=k(he.SUB_ALBUM_DATA);if(M)try{const ce=JSON.parse(M);if(ce.isSubAlbum&&((K=ce.selectedFileIds)==null?void 0:K.length)>0){l(`Valid sub-album data found with ${ce.selectedFileIds.length} files`),x(!0),f(ce.selectedFileIds),ce.selectedPhotos&&ce.selectedPhotos.length>0&&i(ce.selectedPhotos),n(!0),s(!0);const fe=`${A}_____${mt()}____Folder`;t(fe),l(`Created new folder ID for sub-album: ${fe}`);return}}catch(ce){console.error("Error parsing sub-album data:",ce),l(`Error parsing sub-album data: ${ce}`)}const le=`${A}_____${mt()}____Folder`;l(`Creating new folder ID: ${le}`),t(le),s(!0),n(!0)}}catch(U){console.error("Folder ID initialization error:",U),l(`Folder ID initialization error: ${U}`),s(!1)}}},[y,l,k,t,s,n,u,g,a,o,p,c,d,x,f,i,W]),E=r.useCallback(()=>{if(!(!y||ee.current)){ee.current=!0,l("Attempting to restore photos from localStorage");try{const A=k(he.SELECTED_PHOTOS);if(A)try{const K=JSON.parse(A);l(`Parsed ${K.length} photos from localStorage`),Array.isArray(K)&&K.length>0&&(i(K),l(`Restored ${K.length} photos to state`))}catch(K){console.error("Error parsing stored photos:",K),l(`Error parsing stored photos: ${K}`)}}catch(A){console.error("Error restoring photos from storage:",A),l(`Error restoring photos from storage: ${A}`)}}},[y,l,k,i]),I=r.useCallback(()=>{l("Testing S3 connection");try{l(Rs?"S3 client is available":"S3 client not available")}catch(A){console.error("S3 connection test error:",A),l(`S3 connection test error: ${A}`)}},[l]);return r.useEffect(()=>{y&&J()},[y,J]),r.useEffect(()=>{v&&!oe.current&&ne(v)},[v,ne]),r.useEffect(()=>{y&&(E(),I())},[y,E,I]),{cognitoUsername:v,publicUsername:z,setPublicUsername:j,isInitialized:Q,isExistingAlbum:se}},Bt=t=>t.map(i=>({TagType:i.TagType,tagTitle:i.tagTitle,subtags:i.subtags.map(s=>({TagType:i.TagType,tagTitle:s.tagTitle,subtagTitle:s.subtagTitle}))})),Ut=t=>{const i=new Set;return t.filter(s=>i.has(s.fileId)?!1:(i.add(s.fileId),!0))},Gt=(t,i)=>{const s=[];for(let n=0;n<t.length;n+=i)s.push(t.slice(n,n+i));return s},Wt=(t,i,s,n,u,g,a,o,c,d,x,f,p,l,v)=>{v("Creating folder position input WITHOUT folder-level tags"),v(`Profile visibility: ${g?"Public":"Only Me"}`);const O=g?[`${u}_____Public____Profile`]:["Only Me_____Only Me____Profile"];v(`Profile IDs: ${JSON.stringify(O)}`);let z=[];p&&l.length>0&&(v(`Creating file reference IDs for ${l.length} sub-album files`),z=l.map(y=>{const L=y.split("_____");if(L.length>=2){const W=L[1].split("____")[0],Z=`${s}_____${W}____FileReference`;return v(`Created file reference ID for sub-album: ${Z}`),Z}return v(`Using original fileId as fallback: ${y}`),y})),v(`Created ${z.length} acceptedFileReferenceIds`);const j=c!=="NoPassword"?d:null;if(v(`Password protection: ${c}`),v(`Album password: ${j?"******":"null"}`),v(`Participants can add items: ${a}`),v(`Participants can delete items: ${o}`),!n)throw v("Error: folderId is null or undefined"),new Error("folderId is required to create folder position input");const Q=zs(n),re=Os(Q);return{currentTime:t,folderId:n,profileIds:O,folderPositionPoints:1,acceptedFileReferenceIds:z,folderInput:{folderAboutContactIds:[i],albumNanoId:re,folderName:x,folderDescription:f,folderPasswordInput:{password:j,policy:c},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:a,usingFolderInviteGrantsRightToRemoveItems:o,addedItemsNeedFolderCreatorApproval:!1}}}},Kt=(t,i,s,n,u,g,a)=>(a(`Creating file reference inputs with individual photo tags and original filenames for ${t.length} photos`),t.map((o,c)=>{var O;const d=g.get(c)||[],x=Bt(d),f=o.originalFileName||o.fileName;if(a(`Photo ${c} (${o.fileName}): ${d.length} tags applied, display name: ${f}`),o.fileId)return a(`Using existing fileId for photo: ${o.fileId}`),{fileReferencesHolderId:n,currentTime:i,points:1,hasBeenDeleted:!1,selectedTagInputs:x,fileId:o.fileId,fileDisplayName:f,fileInput:null};const p=o.type==="video"||(O=o.type)!=null&&O.startsWith("video")?`Input/Video/${o.fileName}`:`Input/Image/${o.fileName}`,l=`${u}_____${o.fileName}____File`;a(`Created file reference for ${o.fileName}:`),a(`  - dataKey: ${p}`),a(`  - fileId: ${l}`),a(`  - fileDisplayName: ${f}`),a(`  - thumbnailDataKey: ${o.thumbnailDataKey||"undefined"}`),a(`  - size: ${o.size}`),a(`  - thumbnailSize: ${o.thumbnailSize||0}`),a(`  - duration: ${o.duration||"undefined"}`),a(`  - tags: ${d.length} tags selected for this photo`);const v={fileId:l,ownerFileInput:{editorContactIds:[s],FileSharingOptionsEnum:"Anyone",dataKey:p,thumbnailDataKey:o.thumbnailDataKey,dataInBytes:o.size,thumbnailDataInBytes:o.thumbnailSize||0,s3UploadedAt:i,durationInSeconds:o.duration},editorFileInput:{aboutContactIds:[s],captionText:"",numericFilterInputs:[]}};return{fileReferencesHolderId:n,currentTime:i,points:1,hasBeenDeleted:!1,selectedTagInputs:x,fileId:l,fileDisplayName:f,fileInput:v}})),or=(t,i,s,n,u,g,a)=>{const o=[];return u.forEach(c=>{const d=g.get(c)||[];if(d.length>0){const x=n[c];if(x){const f=x.dataKey.split("/"),p=f[f.length-1],l=`${s}_____${p}____File`,v=x.fileName||p,O=Bt(d);a(`Creating file reference for existing file ${c} (${p}) with ${d.length} tags, display name: ${v}`),o.push({fileReferencesHolderId:i,currentTime:t,points:1,hasBeenDeleted:!1,selectedTagInputs:O,fileId:l,fileDisplayName:v,fileInput:null})}}}),a(`Created ${o.length} file references for existing files with tags and filenames`),o},nr=(t,i,s,n,u,g,a,o,c,d,x,f,p,l,v,O,z,j,Q,re,y,L)=>{const[se,W]=r.useState(!1),Z=r.useRef(!1);r.useEffect(()=>{W(!0)},[]);const oe=r.useCallback(()=>(y("Validating required data"),i?t?(y("All required data validated successfully"),!0):(y("No folder ID, validation failed"),!1):(y("No Cognito username, validation failed"),!1)),[i,t,y]),ee=r.useCallback(I=>{if(y(`Save progress text: ${I}`),!!se)try{const A=document.getElementById("saveProgressText");A&&(A.innerText=I)}catch(A){y(`Failed to update progress text in DOM: ${A}`)}},[se,y]),k=r.useCallback(I=>{if(se)try{const A=document.getElementById("saveProgress");A&&(A.style.width=`${I}%`,y(`Updated save progress bar: ${I}%`))}catch(A){y(`Failed to update progress bar: ${A}`)}j(I)},[se,j,y]),J=r.useCallback(()=>{if(y("Handling successful save"),Ms(Q,re,[he.SELECTED_PHOTOS,he.SUB_ALBUM_DATA],y),ee(L("Album saved successfully!")),se)try{sessionStorage.setItem("album_just_saved","true"),y("Set 'album_just_saved' flag in sessionStorage")}catch(I){y(`Failed to set sessionStorage flag: ${I}`)}y("Setting timeout for redirect to my-albums.html"),setTimeout(()=>{y("Redirecting to my-albums.html"),De("my-albums.html")},1e3)},[y,Q,re,ee,L,se]),ne=r.useCallback(async(I,A)=>{y("Starting chunked save process");try{ee(L("Processing files in chunks..."));const K=48;if(A.length===0)y("No file references to process, saving only folder position"),await Ee.saveFolderOnly(I,y);else{const U=Ut(A);y(`Processing ${U.length} unique file references`);const G=Gt(U,K);y(`Split file references into ${G.length} chunks`);for(let M=0;M<G.length;M++){const le=G[M];y(`Processing chunk ${M+1} of ${G.length}`);const ce=M/G.length*80;k(10+ce),M<G.length-1?(ee(L("Saving files: chunk {{chunkNumber}} of {{totalChunks}}...",{chunkNumber:M+1,totalChunks:G.length})),await Ee.saveFileReferences(le,y)):(ee(L("Finalizing album...")),await Ee.saveFinalChunkWithFolder(le,I,y))}}k(100),ee(L("Album saved successfully!")),J()}catch(K){console.error("Error in chunked save process:",K),y(`Error in chunked save process: ${K}`),ee(L("Error: {{error}}",{error:String(K)})),z(!1),Z.current=!1}},[y,ee,L,k,J,z]);return{saveAlbumDirectly:r.useCallback(async()=>{if(Z.current){y("Save already in progress, skipping duplicate call");return}Z.current=!0,y("Starting direct album save"),z(!0),j(5);try{if(!oe()){y("Required data validation failed, aborting save");return}const I=Math.floor(Date.now()/1e3),A=`${i}_____${i}____Account`,U=t.split("_____")[1].split("____")[0];y(`Save timestamp: ${I}`),y(`Account ID: ${A}`),y(`Folder ID: ${t}`);const G=Wt(I,A,U,t,i,o,c,d,x,f,g,a,n,u,y);let M=[];const le=s.filter(fe=>fe.status==="complete");if(y(`Found ${le.length} valid photos`),le.length>0){const fe=le.filter(ye=>!ye.fileId);fe.length>0&&(y("Moving files from temp to public folder"),await Ct(fe,k,y));const we=Kt(le,I,A,t,i,p,y);M=M.concat(we)}const ce=or(I,t,i,v,O,l,y);if(ce.length>0&&(M=M.concat(ce)),n&&u.length>0){const fe=u.map(we=>{const ye=we.split("_____"),Pe=ye.length>=2?ye[1].split("____")[0]:we;return{fileReferencesHolderId:t,currentTime:I,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:we,fileDisplayName:Pe,fileInput:null}});M=M.concat(fe)}y(`Total file reference inputs: ${M.length}`),await ne(G,M)}catch(I){console.error("Error in saveAlbumDirectly:",I),y(`Error in saveAlbumDirectly: ${I}`),z(!1)}finally{Z.current=!1}},[oe,i,t,o,c,d,x,f,g,a,n,u,s,p,v,O,l,y,z,j,k,ne])}},lr=$.h3`
  font-size: ${m.fontSizes.lg};
  margin: 0 0 ${m.spacing.sm} 0;
`,Ht=$.div`
  height: ${t=>t.$height||"8px"};
  background-color: ${m.colors.grayLight};
  border-radius: ${m.borderRadius.small};
  overflow: hidden;
  ${t=>t.$bottom&&`bottom: ${t.$bottom};`}
  ${t=>t.$left&&`left: ${t.$left};`}
  ${t=>t.$right&&`right: ${t.$right};`}
  ${t=>t.$bottom&&t.$left&&t.$right&&"position: absolute;"}
`,qt=$.div`
  height: 100%;
  background-color: ${t=>t.$status==="processing"?m.colors.warning:t.$status==="error"?m.colors.danger:t.$status==="complete"?m.colors.success:m.colors.info};
  border-radius: ${m.borderRadius.small};
  transition: width 0.3s ease;
  width: ${t=>(t.$progress||0)*100}%;
`,cr=$.div`
  font-size: ${m.fontSizes.sm};
  margin-bottom: ${m.spacing.sm};
`,dr=$.div`
  position: absolute;
  top: ${m.spacing.sm};
  right: ${m.spacing.sm};
  width: 24px;
  height: 24px;
  border-radius: ${m.borderRadius.circle};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${m.fontSizes.xs};
  color: ${m.colors.white};
  z-index: 1;
  background-color: ${t=>{switch(t.$status){case"complete":return m.colors.success;case"error":return m.colors.danger;case"uploading":return m.colors.info;case"processing":return m.colors.warning;default:return m.colors.gray}}};
`,ur=$.div`
  margin: 32px 0;
`,Jt=$.div`
  margin-bottom: 24px;
`,Qt=$.h3`
  margin: 0 0 16px 0;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  display: flex;
  align-items: center;
  gap: 12px;
`,Vt=$.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  min-height: 32px;
`,Yt=$.button`
  position: relative;
  padding: 8px 16px;
  border: 2px solid ${t=>t.$isDisplayed?"#28a745":t.$isApplied?"#333333":"#dee2e6"};
  border-radius: 20px;
  background: ${t=>t.$isDisplayed?"#28a745":t.$isApplied?"#333333":"#ffffff"};
  color: ${t=>t.$isDisplayed||t.$isApplied?"#ffffff":"#6c757d"};
  font-size: 13px;
  font-weight: ${t=>t.$isApplied||t.$isDisplayed?"600":"500"};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${t=>t.$isDisplayed?"0 0 0 3px rgba(40, 167, 69, 0.3), 0 4px 12px rgba(40, 167, 69, 0.15)":t.$isApplied?"0 0 0 2px rgba(51, 51, 51, 0.2), 0 4px 12px rgba(51, 51, 51, 0.15)":"0 2px 8px rgba(0, 0, 0, 0.04)"};

  ${t=>t.$isBeingDeleted&&`
    opacity: 0.5;
    pointer-events: none;
  `}

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${t=>t.$isDisplayed?"0 0 0 4px rgba(40, 167, 69, 0.4), 0 6px 16px rgba(40, 167, 69, 0.2)":t.$isApplied?"0 0 0 3px rgba(51, 51, 51, 0.3), 0 6px 16px rgba(51, 51, 51, 0.2)":"0 4px 12px rgba(0, 0, 0, 0.1)"};
    
    background: ${t=>t.$isDisplayed?"#1e7e34":t.$isApplied?"#1a1a1a":"#f8f9fa"};
    
    border-color: ${t=>t.$isDisplayed?"#1e7e34":t.$isApplied?"#1a1a1a":"#007bff"};
    
    color: ${t=>t.$isDisplayed||t.$isApplied?"#ffffff":"#007bff"};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`,pr=$(Yt)`
  font-size: 12px;
  padding: 6px 12px;
  border-radius: 16px;
`,Xt=$.button`
  position: absolute;
  top: -6px;
  right: -6px;
  width: 18px;
  height: 18px;
  border: none;
  border-radius: 50%;
  background: rgba(220, 53, 69, 0.9);
  color: white;
  font-size: 11px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);

  ${t=>t.$isMobile&&`
    width: 20px;
    height: 20px;
    font-size: 12px;
    box-shadow: 0 3px 10px rgba(220, 53, 69, 0.4);
    background: rgba(220, 53, 69, 0.95);
  `}

  &:hover {
    background: #c82333;
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(220, 53, 69, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`,fr=$.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 16px;
`,Zt=$.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 16px;
`,Lt=$.button`
  padding: 8px 16px;
  border: 1px solid #6c757d;
  border-radius: 16px;
  background: transparent;
  color: #6c757d;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  &:hover {
    background: #6c757d;
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`,gr=$.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 1px solid #007bff;
  border-radius: 16px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.1);
  transition: all 0.2s ease;
  
  &:focus-within {
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.3), 0 4px 12px rgba(0, 123, 255, 0.15);
  }
`,hr=$.input`
  border: none;
  outline: none;
  font-size: 12px;
  background: transparent;
  min-width: 100px;
  max-width: 200px;

  &::placeholder {
    color: #999;
    opacity: 0.7;
  }
`,yt=$.button`
  border: none;
  background: transparent;
  color: #007bff;
  font-size: 11px;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: #007bff;
    color: white;
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`,es=()=>{const[t,i]=r.useState(!1);return r.useEffect(()=>{const s=()=>{const u=navigator,g=!!("ontouchstart"in window||navigator.maxTouchPoints&&navigator.maxTouchPoints>0||u.msMaxTouchPoints&&u.msMaxTouchPoints>0);i(g)};s();const n=()=>{s()};return window.addEventListener("resize",n),()=>{window.removeEventListener("resize",n)}},[]),t},ts=$e.memo(({tag:t,isApplied:i,isDisplayed:s,isBeingDeleted:n,disabled:u,onTagClick:g,onDeleteTag:a,displayText:o})=>{const{t:c}=ge(),[d,x]=r.useState(!1),f=es(),p=r.useCallback(()=>{g(t)},[g,t]),l=r.useCallback(O=>{O.stopPropagation(),a(t.id)},[a,t.id]),v=f?s&&!u&&!n:d&&s&&!u&&!n;return e.jsxs(Yt,{$isApplied:i,$isDisplayed:s,$isBeingDeleted:n,disabled:u,onClick:p,onMouseEnter:()=>!f&&s&&x(!0),onMouseLeave:()=>!f&&s&&x(!1),children:[e.jsx("span",{style:{paddingRight:v?"20px":"0"},children:o}),v&&e.jsx(Xt,{$isMobile:f,onClick:l,disabled:n,title:c("Delete tag"),children:"×"})]})});ts.displayName="TagWithDelete";const ss=$e.memo(({subtag:t,isApplied:i,isBeingDeleted:s,disabled:n,onSubtagClick:u,onDeleteSubtag:g})=>{const{t:a}=ge(),[o,c]=r.useState(!1),d=es(),x=r.useCallback(()=>{u(t)},[u,t]),f=r.useCallback(l=>{l.stopPropagation(),g(t.id)},[g,t.id]),p=d?i&&!n&&!s:o&&i&&!n&&!s;return e.jsxs(pr,{$isApplied:i,$isBeingDeleted:s,disabled:n,onClick:x,onMouseEnter:()=>!d&&i&&c(!0),onMouseLeave:()=>!d&&i&&c(!1),children:[e.jsx("span",{style:{paddingRight:p?"20px":"0"},children:t.subtagTitle}),p&&e.jsx(Xt,{$isMobile:d,onClick:f,disabled:s,title:a("Delete subtag"),children:"×"})]})});ss.displayName="SubtagWithDelete";const ot=$e.memo(({value:t,onChange:i,onSubmit:s,onCancel:n,isSubmitting:u,placeholder:g="Enter tag name..."})=>{const{t:a}=ge(),o=r.useRef(null);r.useEffect(()=>{o.current&&o.current.focus()},[]);const c=r.useCallback(x=>{x.key==="Enter"?s():x.key==="Escape"&&n()},[s,n]),d=r.useCallback(x=>{i(x.target.value)},[i]);return e.jsxs(gr,{children:[e.jsx(hr,{ref:o,type:"text",value:t,onChange:d,onKeyDown:c,placeholder:a(g),disabled:u}),e.jsx(yt,{onClick:s,disabled:!t.trim()||u,title:a("Add (Enter)"),children:u?"...":"✓"}),e.jsx(yt,{onClick:n,disabled:u,title:a("Cancel (Escape)"),children:"×"})]})});ot.displayName="NewTagInput";const nt=$e.memo(({tagsManager:t,disabled:i=!1,enhancedLog:s})=>{const{t:n}=ge(),{tags:u,displayedTagId:g,isLoadingTags:a,tagIdBeingDeleted:o,isAddingNewTag:c,newTagTitle:d,isSubmittingNewTag:x,toggleTagOnSelectedFiles:f,setDisplayedTag:p,isTagAppliedToSelected:l,deleteTag:v,startAddingNewTag:O,cancelAddingNewTag:z,submitNewTag:j,setNewTagTitle:Q,getAppliedTagsForSelected:re,hasSelectedFiles:y}=t,L=r.useCallback(k=>{if(!l(k))return k.tagTitle;const E=re().find(A=>A.tagTitle===k.tagTitle);if(!E||E.subtags.length===0)return k.tagTitle;const I=E.subtags.map(A=>A.subtagTitle).join(" || ");return n("{{tagTitle}}  |  {{subtags}}",{tagTitle:k.tagTitle,subtags:I})},[l,re,n]),se=r.useMemo(()=>u.map(k=>({tag:k,isApplied:l(k),isDisplayed:g===k.id,isBeingDeleted:o===k.id,displayText:L(k)})),[u,l,g,o,L]),W=r.useCallback(k=>{if(i)return;const J=l(k);s(`Tag "${k.tagTitle}" clicked - current state: ${J?"applied to all":"not applied to all"}`),f(k),k.subtags&&k.subtags.length>0&&p(J?null:k.id),s(`After toggle - new state: ${J?"removed from all":"applied to all"}`)},[i,l,s,f,p]),Z=r.useCallback(async k=>{if(i)return;s(`Delete tag initiated: ${k}`);const J=await v(k);s(J?`Tag successfully deleted: ${k}`:`Failed to delete tag: ${k}`)},[i,s,v]),oe=r.useCallback(async()=>{await j()||s("Failed to submit new tag")},[j,s]),ee=r.useMemo(()=>[...se].sort((k,J)=>k.tag.points!==J.tag.points?J.tag.points-k.tag.points:J.tag.updatedAt-k.tag.updatedAt),[se]);return r.useEffect(()=>{const k=u.filter(ne=>l(ne)),J=re();s(`TagsDisplay render - ${k.length} tags applied to all selected files`),s("Applied tags with subtags:",J)},[u,re,l,s]),y()?e.jsxs(ur,{children:[e.jsxs(Jt,{children:[e.jsx(Qt,{children:n("Apply tags to selected files")}),e.jsx(Vt,{children:a?e.jsx(fr,{children:n("Loading tags...")}):e.jsxs(e.Fragment,{children:[ee.map(({tag:k,isApplied:J,isDisplayed:ne,isBeingDeleted:E,displayText:I})=>e.jsx(ts,{tag:k,isApplied:J,isDisplayed:ne,isBeingDeleted:E,disabled:i,onTagClick:W,onDeleteTag:Z,displayText:I},k.id)),c?e.jsx(ot,{value:d,onChange:Q,onSubmit:oe,onCancel:z,isSubmitting:x,placeholder:n("Enter tag name...")}):e.jsx(Lt,{disabled:i,onClick:O,children:n("+ Add Tag")}),ee.length===0&&!c&&e.jsx(Zt,{children:n("No tags available")})]})})]}),g&&e.jsx(rs,{tagsManager:t,disabled:i,enhancedLog:s}),e.jsx("div",{style:{marginTop:"24px",padding:"20px 24px",background:"linear-gradient(135deg, #e7f3ff 0%, #f0f8ff 100%)",borderRadius:"12px",fontSize:"13px",color:"#0c5aa6",border:"1px solid #b3d9ff",boxShadow:"0 4px 12px rgba(0, 123, 255, 0.08)"},children:e.jsxs("div",{style:{lineHeight:"2.2"},children:[e.jsxs("div",{style:{marginBottom:"8px"},children:[e.jsx("strong",{style:{color:"#28a745"},children:"🟢"}),"  ",n("Most recently clicked tag (showing subtags)")]}),e.jsxs("div",{style:{marginBottom:"8px"},children:[e.jsx("strong",{style:{color:"#333333"},children:"⚫"}),"  ",n("Applied to selected files")]}),e.jsxs("div",{children:[e.jsx("strong",{style:{color:"#6c757d"},children:"⚪"}),"  ",n("Available but not applied to all selected files")]})]})})]}):null});nt.displayName="TagsDisplay";const rs=$e.memo(({tagsManager:t,disabled:i=!1,enhancedLog:s})=>{const{t:n}=ge(),{displayedTagId:u,subtagIdBeingDeleted:g,isAddingNewSubtag:a,newSubtagTitle:o,isSubmittingNewSubtag:c,toggleSubtagOnSelectedFiles:d,isSubtagAppliedToSelected:x,deleteSubtag:f,startAddingNewSubtag:p,cancelAddingNewSubtag:l,submitNewSubtag:v,setNewSubtagTitle:O,tags:z}=t,j=r.useCallback(W=>{i||(s(`Subtag "${W.subtagTitle}" clicked - current state: ${x(W)?"applied to all":"not applied to all"}`),d(W))},[i,s,x,d]),Q=r.useCallback(async W=>{if(i)return;s(`Delete subtag initiated: ${W}`);const Z=await f(W);s(Z?`Subtag successfully deleted: ${W}`:`Failed to delete subtag: ${W}`)},[i,s,f]),re=r.useCallback(async()=>{await v()||s("Failed to submit new subtag")},[v,s]),y=r.useMemo(()=>{const W=z.find(k=>k.id===u);if(!W)return null;const ee=(W.subtags||[]).map(k=>({subtag:k,isApplied:x(k),isBeingDeleted:g===k.id})).sort((k,J)=>k.subtag.points!==J.subtag.points?J.subtag.points-k.subtag.points:J.subtag.updatedAt-k.subtag.updatedAt);return{displayedTag:W,subtagDisplayData:ee}},[z,u,x,g]);if(!y)return null;const{displayedTag:L,subtagDisplayData:se}=y;return e.jsxs(Jt,{children:[e.jsx(Qt,{children:n('Subtags for "{{tagTitle}}"',{tagTitle:L.tagTitle})}),e.jsxs(Vt,{children:[se.map(({subtag:W,isApplied:Z,isBeingDeleted:oe})=>e.jsx(ss,{subtag:W,isApplied:Z,isBeingDeleted:oe,disabled:i,onSubtagClick:j,onDeleteSubtag:Q},W.id)),a?e.jsx(ot,{value:o,onChange:O,onSubmit:re,onCancel:l,isSubmitting:c,placeholder:n("Enter subtag name...")}):e.jsx(Lt,{disabled:i,onClick:p,children:n("+ Add Subtag")}),se.length===0&&!a&&e.jsx(Zt,{children:n("No subtags available")})]})]})});rs.displayName="SubtagsDisplay";const is=$e.memo(({photoTags:t,isSelected:i=!1,onToggleSelection:s,fileName:n,showFileName:u=!1})=>{const{t:g}=ge();r.useEffect(()=>{const d="photo-tagging-animations";if(typeof document<"u"&&!document.getElementById(d)){const x=document.createElement("style");x.id=d,x.textContent=`
        @keyframes subtlePulse {
          0%, 100% { 
            opacity: 1;
            transform: scale(1);
            box-shadow: 0 2px 8px rgba(0, 123, 255, 0.2);
          }
          50% { 
            opacity: 0.95;
            transform: scale(1.01);
            box-shadow: 0 3px 12px rgba(0, 123, 255, 0.3);
          }
        }
      `,document.head.appendChild(x)}},[]);const a=r.useMemo(()=>t.length===0?"":t.map(d=>{if(d.subtags.length>0){const x=d.subtags.map(f=>f.subtagTitle).join(", ");return g("{{tagTitle}}: {{subtags}}",{tagTitle:d.tagTitle,subtags:x})}return d.tagTitle}).join(" • "),[t,g]),o=t.length>0;return u&&n||o||i?e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"4px"},children:[u&&n&&e.jsx("div",{style:{fontSize:"11px",fontWeight:"600",color:"#333",padding:"4px 8px",backgroundColor:i?"#e3f2fd":"#f8f9fa",borderRadius:"4px",border:`1px solid ${i?"#90caf9":"#e9ecef"}`,textAlign:"center",wordBreak:"break-word",lineHeight:"1.2",transition:"all 0.2s ease"},children:n}),e.jsx("div",{style:{background:o?"linear-gradient(135deg, rgba(0, 123, 255, 0.95) 0%, rgba(0, 123, 255, 0.85) 100%)":"transparent",color:"white",padding:o?"8px 12px":"6px 12px",borderRadius:o?"8px":"6px",fontSize:o?"11px":"10px",cursor:s?"pointer":"default",backdropFilter:o?"blur(6px)":"none",boxShadow:o?"0 4px 12px rgba(0, 123, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)":"none",border:o?"1px solid rgba(255, 255, 255, 0.2)":"none",transition:"all 0.3s ease",lineHeight:"1.3",minHeight:o?"32px":"auto",display:"flex",alignItems:"center",wordBreak:"break-word"},onClick:s,onMouseEnter:d=>{o&&(d.currentTarget.style.transform="translateY(-1px)",d.currentTarget.style.boxShadow="0 6px 16px rgba(0, 123, 255, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3)")},onMouseLeave:d=>{o&&(d.currentTarget.style.transform="translateY(0)",d.currentTarget.style.boxShadow="0 4px 12px rgba(0, 123, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)")},children:o?e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",width:"100%",flexWrap:"wrap"},children:[e.jsx("span",{style:{fontSize:"12px",opacity:.9,flexShrink:0},children:"🏷️"}),e.jsx("span",{style:{fontWeight:"600",textShadow:"0 1px 2px rgba(0, 0, 0, 0.3)",flex:1},children:a})]}):e.jsx("div",{style:{opacity:1,fontStyle:"normal",textAlign:"center",width:"100%",fontSize:i?"11px":"10px",fontWeight:i?"600":"normal",background:i?"white":"transparent",color:i?"#007bff":"white",borderRadius:i?"6px":"0",padding:i?"8px 12px":"0",border:i?"1px solid #007bff":"none",boxShadow:i?"0 2px 8px rgba(0, 123, 255, 0.2)":"none",animation:i?"subtlePulse 2.5s infinite":"none"},children:i?e.jsxs("span",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"4px"},children:[e.jsx("span",{children:"👇"})," ",g("Scroll down to select tags")]}):e.jsx("span",{style:{opacity:.8,fontStyle:"italic"},children:g("No tags applied")})})})]}):null});is.displayName="PhotoTagging";const mr=()=>{r.useEffect(()=>{if(typeof document>"u")return;const t="photo-handler-styles";if(document.getElementById(t))return;const i=document.createElement("style");i.id=t,i.textContent=`
      .photo-grid {
        position: relative;
        transition: grid-template-columns 0.3s ease;
      }

      .photo-card-traditional {
        position: relative;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .photo-card-horizontal {
        position: relative;
        cursor: pointer;
        transition: all 0.3s ease;
        width: 180px;
        height: 180px;
      }

      .photo-card-horizontal.selected {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0, 123, 255, 0.3), 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .photo-delete-button {
        position: absolute;
        top: 6px;
        right: 6px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: none;
        background-color: rgba(220, 53, 69, 0.9);
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        font-weight: bold;
        z-index: 15;
        opacity: 1;
        transition: all 0.2s ease;
        transform: scale(0.9);
        box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
      }

      .photo-delete-button:hover {
        background-color: rgba(200, 35, 51, 0.95);
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(220, 53, 69, 0.4);
      }

      .media-preview {
        transition: opacity 0.2s ease;
      }

      .media-preview.selected {
        opacity: 0.85;
      }

      .media-item {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .photo-card-horizontal .media-item {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .file-info-overlay {
        position: absolute;
        bottom: 32px;
        left: 8px;
        right: 8px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 11px;
        text-align: center;
        backdrop-filter: blur(4px);
      }

      .selection-indicator {
        position: absolute;
        bottom: 4px;
        left: 4px;
        right: 4px;
        background: rgba(0, 123, 255, 0.9);
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 10px;
        font-weight: bold;
        text-align: center;
        backdrop-filter: blur(4px);
        box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);
      }

      .photo-info {
        min-height: 60px;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .photo-info.horizontal {
        width: 180px;
      }

      /* Enhanced scrollbar styling for horizontal layout */
      .photo-grid::-webkit-scrollbar {
        height: 10px;
      }

      .photo-grid::-webkit-scrollbar-track {
        background: #f8f9fa;
        border-radius: 6px;
        margin: 0 8px;
      }

      .photo-grid::-webkit-scrollbar-thumb {
        background: linear-gradient(90deg, #007bff, #0056b3);
        border-radius: 6px;
        border: 2px solid #f8f9fa;
      }

      .photo-grid::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(90deg, #0056b3, #004085);
      }

      /* Enhanced selection animations for horizontal layout */
      .photo-card-horizontal.selected {
        animation: selectedPulse 2s infinite;
      }

      @keyframes selectedPulse {
        0%, 100% { 
          box-shadow: 0 8px 24px rgba(0, 123, 255, 0.3), 0 4px 12px rgba(0, 0, 0, 0.1); 
        }
        50% { 
          box-shadow: 0 12px 32px rgba(0, 123, 255, 0.4), 0 6px 16px rgba(0, 0, 0, 0.15); 
        }
      }

      /* Show delete button on hover for selected cards */
      .photo-card-traditional[data-selected="true"]:hover .photo-delete-button,
      .photo-card-horizontal[data-selected="true"]:hover .photo-delete-button {
        opacity: 1;
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(220, 53, 69, 0.4);
      }

      /* Add smooth transitions for responsive grid changes */
      .photo-grid[style*="display: grid"] {
        transition: all 0.3s ease;
      }

      .photo-grid[style*="display: grid"] > div {
        transition: all 0.3s ease;
      }
    `,document.head.appendChild(i)},[])},Tt={traditional:{padding:"20px",border:"2px dashed #007bff",borderRadius:"12px",backgroundColor:"#fff",boxShadow:"0 2px 8px rgba(0, 0, 0, 0.04)"},horizontal:{display:"flex",overflowX:"auto",gap:"16px",padding:"20px",border:"2px dashed #007bff",borderRadius:"12px",backgroundColor:"#fff",boxShadow:"0 2px 8px rgba(0, 0, 0, 0.04)",scrollbarWidth:"thin",scrollbarColor:"#007bff #f8f9fa",scrollBehavior:"smooth",WebkitOverflowScrolling:"touch"}},vt={traditional:{display:"flex",flexDirection:"column",gap:"8px",minWidth:"0"},horizontal:{display:"flex",flexDirection:"column",gap:"8px",minWidth:"180px",maxWidth:"180px",flexShrink:0}},lt=$e.memo(({selectedPhotos:t,selectedPhotoIndices:i,isSavingAlbum:s,onRemovePhoto:n,onTogglePhotoSelection:u,photoTagsMap:g,columns:a="1",isMultipleAlbumMode:o=!1})=>{const{t:c}=ge();mr();const d=r.useMemo(()=>{if(o&&a==="horizontal")return Tt.horizontal;const p=parseInt(a,10),l=isNaN(p)||p<1?1:Math.min(p,5);return{...Tt.traditional,display:"grid",gridTemplateColumns:`repeat(${l}, 1fr)`,gap:"16px"}},[o,a]),x=r.useMemo(()=>o&&a==="horizontal"?vt.horizontal:vt.traditional,[o,a]),f=r.useMemo(()=>o&&a==="horizontal"?"photo-card-horizontal":"photo-card-traditional",[o,a]);return t.length===0?null:e.jsx(e.Fragment,{children:e.jsx("div",{style:d,className:"photo-grid",children:t.map((p,l)=>{var z,j;const v=i.has(l),O=g.get(l)||[];return e.jsxs("div",{style:x,children:[e.jsxs(Bs,{"data-selected":v?"true":"false",className:`${f} ${v?"selected":""}`,onClick:()=>u(l),children:[v&&!s&&e.jsx("button",{onClick:Q=>{Q.stopPropagation(),confirm(c("Are you sure you want to remove this photo?"))&&n(l)},className:"photo-delete-button",title:c("Remove photo"),children:"×"}),p.status!=="complete"&&e.jsx(dr,{$status:p.status,children:p.status==="error"?"✕":p.status==="uploading"?"↑":p.status==="processing"?"⚙️":"•"}),e.jsxs(Qs,{className:`media-preview ${v?"selected":""}`,children:[p.type==="video"||(z=p.type)!=null&&z.startsWith("video")?e.jsx(Vs,{src:p.s3PreviewUrl,controls:!0,className:"media-item"}):e.jsx(Ys,{src:p.s3PreviewUrl,alt:p.fileName,className:"media-item"}),(p.status==="uploading"||p.status==="processing")&&e.jsx(Ht,{$bottom:"4px",$left:"4px",$right:"4px",$height:"4px",children:e.jsx(qt,{$progress:p.progress,$status:p.status})})]}),e.jsxs("div",{className:"file-info-overlay",children:[(j=p.type)!=null&&j.startsWith("video")?c("Video"):c("Image"),p.size&&c(" • {{size}} MB",{size:(p.size/1024/1024).toFixed(1)}),p.duration&&c(" • {{duration}}s",{duration:p.duration})]}),o&&a==="horizontal"&&v&&e.jsx("div",{className:"selection-indicator",children:c("SELECTED")}),p.status==="error"&&p.errorMessage&&e.jsx(Us,{$type:"error",children:c("Error: {{message}}",{message:p.errorMessage.length>40?p.errorMessage.substring(0,37)+"...":p.errorMessage})})]}),e.jsx("div",{className:`photo-info ${o&&a==="horizontal"?"horizontal":"traditional"}`,children:e.jsx(is,{photoTags:O,isSelected:v,onToggleSelection:()=>u(l),fileName:p.originalFileName||p.fileName,showFileName:!0})})]},l)})})})});lt.displayName="PhotoHandler";const as=$e.memo(({isSavingAlbum:t,savingProgress:i})=>{const{t:s}=ge();return t?e.jsxs(Dt,{children:[e.jsx(lr,{children:s("Saving Album")}),e.jsx(cr,{id:"saveProgressText",children:s("Moving files...")}),e.jsx(Ht,{children:e.jsx(qt,{id:"saveProgress",$progress:i/100})})]}):null});as.displayName="SavingProgressComponent";const os=$e.memo(({showFolderDetails:t,isCreator:i,folderName:s,setFolderName:n,folderDescription:u,setFolderDescription:g,isSavingAlbum:a})=>{const{t:o}=ge();return!t||i!==!0?null:e.jsxs(Dt,{children:[e.jsxs(xt,{children:[e.jsx(bt,{htmlFor:"folderName",children:o("Album Name")}),e.jsx(Zs,{id:"folderName",type:"text",value:s,onChange:c=>n(c.target.value),placeholder:o("e.g. Family Vacation in Kyoto"),disabled:a})]}),e.jsxs(xt,{children:[e.jsx(bt,{htmlFor:"folderDescription",children:o("Album Description")}),e.jsx(Ls,{id:"folderDescription",value:u,onChange:c=>g(c.target.value),placeholder:o("e.g. what's special about this album"),rows:4,disabled:a})]})]})});os.displayName="FolderDetailsComponent";const xr=()=>{r.useEffect(()=>{if(typeof document>"u")return;const t="existing-files-animations";if(document.getElementById(t))return;const i=document.createElement("style");i.id=t,i.textContent=`
      @keyframes subtlePulse {
        0%, 100% { 
          opacity: 1;
          transform: scale(1);
          box-shadow: 0 2px 8px rgba(0, 123, 255, 0.2);
        }
        50% { 
          opacity: 0.95;
          transform: scale(1.01);
          box-shadow: 0 3px 12px rgba(0, 123, 255, 0.3);
        }
      }
    `,document.head.appendChild(i)},[])},br=({existingFiles:t,selectedExistingIndices:i,onToggleSelection:s,onSelectAll:n,onDeselectAll:u,onDeleteFile:g,disabled:a,isCreator:o,participantsCanDeleteItems:c,existingFileTagsMap:d,t:x,isRTL:f})=>(xr(),t.length===0?null:e.jsxs("div",{style:{marginBottom:"32px",direction:f?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px",flexDirection:f?"row-reverse":"row"},children:[e.jsx("div",{children:e.jsx("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:x("Existing Files ({count})").replace("{count}",t.length.toString())})}),e.jsx("div",{style:{display:"flex",gap:"8px",flexDirection:f?"row-reverse":"row"},children:e.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:a?"#f8f9fa":"#fff",color:a?"#999":"#333",cursor:a?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:i.size>0?u:n,disabled:a,children:i.size>0?x("Done Tagging Selected"):x("Select All")})})]}),e.jsx("div",{className:"existing-files-grid",children:t.map((p,l)=>{const v=i.has(l),O=d.get(l)||[];return e.jsxs("div",{className:"existing-file-item",children:[e.jsxs("div",{className:`existing-file-card ${v?"selected":""}`,onClick:()=>!a&&s(l),children:[e.jsx(Xs,{thumbnailDataKey:p.thumbnailDataKey,dataKey:p.dataKey,alt:x("Existing file"),style:{width:"100%",height:"100%",objectFit:"cover"}}),v&&!a&&(o===!0||c)&&e.jsx("button",{onClick:z=>{z.stopPropagation(),confirm(x("Are you sure you want to remove this file?"))&&g(l)},className:"delete-button",title:x("Remove file"),children:"×"}),p.dataInBytes>0&&e.jsx("div",{className:"file-size",children:x("{size} MB").replace("{size}",(p.dataInBytes/(1024*1024)).toFixed(1))}),p.durationInSeconds&&e.jsx("div",{className:"file-duration",children:x("{minutes}:{seconds}").replace("{minutes}",Math.floor(p.durationInSeconds/60).toString()).replace("{seconds}",String(Math.floor(p.durationInSeconds%60)).padStart(2,"0"))})]}),e.jsxs("div",{className:"file-info",children:[p.fileName&&e.jsx("div",{className:`file-name ${v?"selected":""}`,children:p.fileName}),e.jsx("div",{className:"file-tags",children:O.length>0?e.jsx("div",{className:"tags-display",children:e.jsxs("div",{className:"tags-content",children:[e.jsx("span",{className:"tag-icon",children:"🏷️"}),e.jsx("span",{className:"tags-text",children:O.map(z=>{if(z.subtags.length>0){const j=z.subtags.map(Q=>Q.subtagTitle).join(", ");return x("{tagTitle}: {subtags}").replace("{tagTitle}",z.tagTitle).replace("{subtags}",j)}return z.tagTitle}).join(" • ")})]})}):v?e.jsx("div",{style:{background:"white",border:"1px solid #007bff",color:"#007bff",fontWeight:"600",fontSize:"11px",fontStyle:"normal",padding:"8px 12px",borderRadius:"6px",boxShadow:"0 2px 8px rgba(0, 123, 255, 0.2)",animation:"subtlePulse 2.5s infinite"},children:e.jsxs("span",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"4px"},children:[e.jsx("span",{children:"👇"})," ",x("Scroll down to select tags")]})}):null})]})]},`existing-${l}-${p.dataKey}`)})})]})),wr=({selectedPhotos:t,selectedPhotoIndices:i,onToggleSelection:s,onSelectAll:n,onDeselectAll:u,onRemovePhoto:g,onDeleteAll:a,disabled:o,photoTagsMap:c,columns:d,setColumns:x,t:f,isRTL:p})=>t.length===0?null:e.jsxs("div",{style:{marginBottom:"32px",direction:p?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"16px",flexDirection:p?"row-reverse":"row"},children:[e.jsx("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:f("New Files ({count})").replace("{count}",t.length.toString())}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:p?"flex-start":"flex-end",gap:"8px"},children:[e.jsxs("div",{style:{display:"flex",gap:"8px",flexDirection:p?"row-reverse":"row"},children:[e.jsx("button",{className:"control-button",onClick:i.size>0?u:n,disabled:o,children:i.size>0?f("Done Tagging Selected"):f("Select All")}),i.size===0&&e.jsx("button",{className:"control-button danger",onClick:a,disabled:o,children:f("Delete All")})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",flexDirection:p?"row-reverse":"row"},children:[e.jsx("label",{className:"columns-label",children:f("Columns:")}),e.jsxs("select",{value:d,onChange:l=>x(l.target.value),className:"columns-select",children:[e.jsx("option",{value:"1",children:"1"}),e.jsx("option",{value:"2",children:"2"}),e.jsx("option",{value:"3",children:"3"}),e.jsx("option",{value:"4",children:"4"}),e.jsx("option",{value:"5",children:"5"})]})]})]})]}),e.jsx(lt,{selectedPhotos:t,selectedPhotoIndices:i,isSavingAlbum:o,onRemovePhoto:g,onTogglePhotoSelection:s,onSelectAllPhotos:n,onDeselectAllPhotos:u,hideHeader:!0,photoTagsMap:c,columns:d})]}),yr=$.button`
  padding: 8px;
  border: 1px solid #6c757d;
  border-radius: 6px;
  background: transparent;
  color: #6c757d;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  position: relative;

  &:hover {
    background: #6c757d;
    color: white;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`,ns=$.div`
  position: absolute;
  top: 100%;
  ${t=>t.$isRTL?"left: 0;":"right: 0;"}
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 300px;
  padding: 20px;
  margin-top: 4px;
`,ze=$.div`
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,ls=$.h4`
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
`,Oe=$.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 8px 0;
`,Me=$.div`
  font-size: 14px;
  color: #333;
  line-height: 1.4;
`,Be=$.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 26px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
    
    &:checked + span {
      background-color: #007bff;
    }
    
    &:checked + span:before {
      transform: translateX(18px);
    }
    
    &:disabled + span {
      background-color: #e6e6e6;
      cursor: not-allowed;
    }
  }
`,Ue=$.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .2s;
  border-radius: 26px;
  
  &:before {
    position: absolute;
    content: "";
    height: 22px;
    width: 22px;
    left: 2px;
    top: 2px;
    background-color: white;
    transition: .2s;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`,cs=$.button`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${t=>t.$hasAnyPassword?"#28a745":"#dee2e6"};
  border-radius: 8px;
  background: ${t=>t.$hasAnyPassword?"#28a745":"#f8f9fa"};
  color: ${t=>t.$hasAnyPassword?"white":"#6c757d"};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: ${t=>t.$hasAnyPassword?"#218838":"#e9ecef"};
    border-color: ${t=>t.$hasAnyPassword?"#218838":"#adb5bd"};
  }
`,Tr=$.button`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #007bff;
  border-radius: 8px;
  background: #007bff;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 8px;

  &:hover {
    background: #0056b3;
    border-color: #0056b3;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`,vr=({showGlobalGear:t,globalSettings:i,setGlobalSettings:s,onPasswordClick:n,onApplySettings:u})=>{const{t:g,language:a}=ge(),o=Fe(a)==="rtl";return t?e.jsx(ns,{$isRTL:o,children:e.jsxs(ze,{children:[e.jsx(ls,{children:g("Apply to All Albums")}),e.jsxs(ze,{children:[e.jsxs(Oe,{children:[e.jsx(Me,{children:g("Public Profile")}),e.jsxs(Be,{children:[e.jsx("input",{type:"checkbox",checked:i.isOnPublicProfile,onChange:c=>s(d=>({...d,isOnPublicProfile:c.target.checked}))}),e.jsx(Ue,{})]})]}),e.jsxs(Oe,{children:[e.jsx(Me,{children:g("Participants Can Add Items")}),e.jsxs(Be,{children:[e.jsx("input",{type:"checkbox",checked:i.participantsCanAddItems,onChange:c=>s(d=>({...d,participantsCanAddItems:c.target.checked}))}),e.jsx(Ue,{})]})]}),e.jsxs(Oe,{children:[e.jsx(Me,{children:g("Participants Can Delete Items")}),e.jsxs(Be,{children:[e.jsx("input",{type:"checkbox",checked:i.participantsCanDeleteItems,onChange:c=>s(d=>({...d,participantsCanDeleteItems:c.target.checked}))}),e.jsx(Ue,{})]})]})]}),e.jsx(ze,{children:e.jsxs(cs,{$hasAnyPassword:i.passwordProtectionOption!=="NoPassword"&&!!i.albumPassword,onClick:n,children:[i.passwordProtectionOption!=="NoPassword"&&i.albumPassword?"🔒":"🔓",i.passwordProtectionOption!=="NoPassword"&&i.albumPassword?g("Password Set"):g("Set Password for All")]})}),e.jsx(Tr,{onClick:u,children:g("Apply to All Albums")})]})}):null},Sr=({showGear:t,isOnPublicProfile:i,participantsCanAddItems:s,participantsCanDeleteItems:n,passwordProtectionOption:u,albumPassword:g,onTogglePublicProfile:a,onToggleParticipantsCanAdd:o,onToggleParticipantsCanDelete:c,onPasswordClick:d,disabled:x})=>{const{t:f,language:p}=ge(),l=Fe(p)==="rtl";return t?e.jsx(ns,{$isRTL:l,children:e.jsxs(ze,{children:[e.jsx(ls,{children:f("Album Settings")}),e.jsxs(ze,{children:[e.jsxs(Oe,{children:[e.jsx(Me,{children:f("Public Profile")}),e.jsxs(Be,{children:[e.jsx("input",{type:"checkbox",checked:i,onChange:a,disabled:x}),e.jsx(Ue,{})]})]}),e.jsxs(Oe,{children:[e.jsx(Me,{children:f("Participants Can Add Items")}),e.jsxs(Be,{children:[e.jsx("input",{type:"checkbox",checked:s,onChange:o,disabled:x}),e.jsx(Ue,{})]})]}),e.jsxs(Oe,{children:[e.jsx(Me,{children:f("Participants Can Delete Items")}),e.jsxs(Be,{children:[e.jsx("input",{type:"checkbox",checked:n,onChange:c,disabled:x}),e.jsx(Ue,{})]})]})]}),e.jsx(ze,{children:e.jsxs(cs,{$hasAnyPassword:u!=="NoPassword"&&!!g,onClick:d,disabled:x,children:[u!=="NoPassword"&&g?"🔒":"🔓",f(u!=="NoPassword"&&g?"Password Set":"Set Password")]})})]})}):null},ds=({onClick:t,disabled:i,title:s})=>e.jsx(yr,{onClick:t,disabled:i,title:s,children:"⚙️"}),$r=$.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10000;
`,Pr=$.div`
  background-color: ${m.colors.white};
  border-radius: ${m.borderRadius.medium};
  box-shadow: ${m.boxShadow.lg};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10001;
  width: min(500px, calc(100vw - 64px));
  max-height: calc(100vh - 64px);
  overflow-y: auto;
  overflow-x: hidden;
  
  /* Ensure smooth scrolling */
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: ${m.colors.border} transparent;
  
  /* Custom scrollbar for webkit browsers */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${m.colors.border};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${m.colors.secondary};
  }
  
  @media (max-width: 480px) {
    width: calc(100vw - 20px);
    /* Account for mobile browser UI - more conservative approach */
    max-height: calc(100vh - 160px);
    /* Support for newer browsers with dynamic viewport */
    max-height: calc(100dvh - 60px);
    top: 10px;
    left: 10px;
    transform: none;
    border-radius: ${m.borderRadius.small};
  }
  
  @media (max-height: 700px) {
    max-height: calc(100vh - 80px);
    max-height: calc(100dvh - 40px);
    top: 20px;
    transform: translateX(-50%);
    
    @media (max-width: 480px) {
      top: 10px;
      left: 10px;
      transform: none;
      max-height: calc(100vh - 160px);
      max-height: calc(100dvh - 60px);
    }
  }
  
  @media (max-height: 600px) {
    max-height: calc(100vh - 100px);
    max-height: calc(100dvh - 40px);
    top: 10px;
    transform: translateX(-50%);
    
    @media (max-width: 480px) {
      top: 10px;
      left: 10px;
      transform: none;
      max-height: calc(100vh - 160px);
      max-height: calc(100dvh - 60px);
    }
  }
  
  /* For very small screens - prioritize fitting content */
  @media (max-height: 500px) {
    max-height: calc(100vh - 60px);
    max-height: calc(100dvh - 20px);
    top: 5px;
    transform: translateX(-50%);
    
    @media (max-width: 480px) {
      top: 5px;
      left: 10px;
      transform: none;
      max-height: calc(100vh - 140px);
      max-height: calc(100dvh - 40px);
    }
  }
`,Ir=$.div`
  padding: 40px;
  
  @media (max-width: 768px) {
    padding: 30px;
  }
  
  @media (max-width: 480px) {
    padding: 20px;
  }
  
  @media (max-height: 700px) {
    padding: 24px;
  }
  
  @media (max-height: 600px) {
    padding: 20px;
  }
`,Ar=$.div`
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
`,kr=$.h3`
  font-size: 24px;
  font-weight: 600;
  color: ${m.colors.text.primary};
  margin: 0 0 ${m.spacing.lg} 0;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 22px;
    margin: 0 0 ${m.spacing.md} 0;
  }
  
  @media (max-height: 700px) {
    font-size: 20px;
    margin: 0 0 ${m.spacing.md} 0;
  }
  
  @media (max-width: 480px) {
    font-size: 18px;
  }
`,jr=$.p`
  margin-bottom: ${m.spacing.lg};
  font-size: 16px;
  color: ${m.colors.text.secondary};
  line-height: 1.5;
  
  @media (max-width: 768px) {
    margin-bottom: ${m.spacing.md};
    font-size: 15px;
  }
  
  @media (max-height: 700px) {
    margin-bottom: ${m.spacing.sm};
    font-size: 14px;
  }
`,St=$.div`
  margin-bottom: ${m.spacing.lg};
`,$t=$.label`
  display: block;
  margin-bottom: ${m.spacing.sm};
  font-size: 14px;
  font-weight: 500;
  color: ${m.colors.text.primary};
`,Cr=$.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${m.colors.border};
  border-radius: ${m.borderRadius.small};
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${m.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  &::placeholder {
    color: ${m.colors.text.light};
  }
`,Dr=$.div`
  display: flex;
  flex-direction: column;
  gap: ${m.spacing.md};
  margin-bottom: ${m.spacing.xl};
`,Er=$.div`
  border: 2px solid ${t=>t.$isSelected?m.colors.primary:m.colors.border};
  border-radius: ${m.borderRadius.medium};
  padding: ${m.spacing.lg};
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${t=>t.$isSelected?m.colors.background.highlight:m.colors.white};
  display: flex;
  align-items: center;
  gap: ${m.spacing.lg};
  
  @media (max-width: 768px) {
    padding: ${m.spacing.md};
    gap: ${m.spacing.md};
  }
  
  @media (max-width: 480px) {
    padding: ${m.spacing.sm};
    gap: ${m.spacing.sm};
  }
  
  @media (max-height: 700px) {
    padding: ${m.spacing.sm};
    gap: ${m.spacing.sm};
  }
`,Fr=$.div`
  flex: 1;
`,Nr=$.div`
  margin-bottom: ${m.spacing.xs};
`,_r=$.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${m.colors.primary};
  flex-shrink: 0;
`,Rr=$.label`
  font-size: 16px;
  font-weight: 500;
  color: ${m.colors.text.primary};
  cursor: pointer;
  display: block;
`,zr=$.div`
  font-size: 14px;
  color: ${m.colors.text.secondary};
  margin-top: ${m.spacing.xs};
`,Or=$.div`
  color: ${m.colors.warning};
  font-size: 12px;
  font-style: italic;
  margin-top: ${m.spacing.xs};
  font-weight: 500;
`,Mr=$.div`
  display: flex;
  gap: ${m.spacing.sm};
  justify-content: center;
  margin-top: ${m.spacing.xl};
`,Br=$.div`
  background-color: ${m.colors.background.primary};
  border-radius: ${m.borderRadius.medium};
  padding: ${m.spacing.md};
  margin: ${m.spacing.md} 0;
  border-left: 4px solid ${m.colors.primary};
  font-size: 14px;
  color: ${m.colors.text.secondary};
  line-height: 1.4;
  
  @media (max-width: 768px) {
    padding: ${m.spacing.sm};
    margin: ${m.spacing.sm} 0;
    font-size: 13px;
  }
  
  @media (max-height: 700px) {
    padding: ${m.spacing.xs};
    font-size: 12px;
  }
`,Ur=[{value:"NotVisible",titleKey:"Password Required To See Or Save",descriptionKey:"Album will be completely hidden until correct password is entered"},{value:"Watermark",titleKey:"Watermarked And No Saving Without Password",descriptionKey:"Photos will be visible with watermarks, password required to save"},{value:"CannotBeSaved",titleKey:"Password Required To Save",descriptionKey:"Photos are visible but password required to download or save"},{value:"NoPassword",titleKey:"No Password",descriptionKey:"Album is fully public with no restrictions"}],us=({isOpen:t,onClose:i,initialOption:s="NoPassword",initialPassword:n=""})=>{const{t:u,language:g}=ge(),a=Fe(g)==="rtl",[o,c]=r.useState(!1),[d,x]=r.useState(s),[f,p]=r.useState(n);if(r.useEffect(()=>{c(!0)},[]),r.useEffect(()=>{t&&(x(s),p(n))},[t,s,n]),!t||!o)return null;const l=f.trim()==="",v=j=>{x(j)},O=j=>{j.target===j.currentTarget&&i()},z=j=>j!=="NoPassword";return e.jsxs(e.Fragment,{children:[e.jsx($r,{onClick:O}),e.jsx(Pr,{children:e.jsx(Ir,{children:e.jsxs(Ar,{$isRTL:a,children:[e.jsx(kr,{children:u("Album Password Policy")}),e.jsx(jr,{children:u("Configure password protection for your album. Choose how you want to restrict access to your photos.")}),e.jsxs(St,{children:[e.jsx($t,{children:u("Enter Password")}),e.jsx(Cr,{type:"text",placeholder:u("Enter password (optional)"),value:f,onChange:j=>p(j.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"})]}),e.jsxs(St,{children:[e.jsx($t,{children:u("Select Protection Level")}),e.jsx(Dr,{children:Ur.map(j=>e.jsxs(Er,{$isSelected:d===j.value,onClick:()=>v(j.value),children:[e.jsx(_r,{type:"radio",name:"protection",checked:d===j.value,onChange:()=>v(j.value)}),e.jsxs(Fr,{children:[e.jsx(Nr,{children:e.jsx(Rr,{children:u(j.titleKey)})}),e.jsx(zr,{children:u(j.descriptionKey)}),l&&z(j.value)&&d===j.value&&e.jsx(Or,{children:u('⚠️ Will use "password" as default if left empty')})]})]},j.value))})]}),z(d)&&e.jsxs(Br,{children:[e.jsx("strong",{children:u("💡 Password Protection Info:")}),e.jsx("br",{}),u('If you leave the password field empty, "password" will be used as the default password. You can change this anytime in album settings.')]}),e.jsxs(Mr,{children:[e.jsx(Ke,{onClick:()=>i(),children:u("Cancel")}),e.jsx(Ke,{$primary:!0,onClick:()=>{const j=l&&z(d)?"password":f;console.log(`Saving with option: ${d}, password: ${j.length>0?"********":"none"}`),i(d,j)},children:u("Save")})]})]})})})]})},Gr=({debugMessages:t,t:i,isRTL:s,textDirection:n})=>t.length===0?null:e.jsxs("div",{style:{marginTop:"40px",background:"#fff3cd",padding:"16px",borderRadius:"8px",border:"1px solid #ffeeba",maxWidth:900,margin:"0 auto",direction:n},children:[e.jsx("h3",{style:{marginTop:0,fontSize:"18px",color:"#856404",textAlign:s?"right":"left"},children:i("Debug Log")}),e.jsx("pre",{style:{fontSize:"14px",color:"#856404",whiteSpace:"pre-wrap",maxHeight:"400px",overflow:"auto",textAlign:s?"right":"left"},children:t.map((u,g)=>e.jsx("div",{style:{marginBottom:"8px"},children:u},g))})]}),Wr=`
  query FetchTags($fetchRelationsInput: FetchRelationsInput!) {
    fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
      items {
        ... on Tag {
          id
          createdAt
          updatedAt
          TagType
          tagTitle
          points
          subtags {
            items {
              id
              createdAt
              updatedAt
              TagType
              tagTitle
              subtagTitle
              points
            }
            nextToken
          }
        }
      }
      nextToken
    }
  }
`,Kr=`
  mutation AddTag($tagInput: TagInput!) {
    addTag(tagInput: $tagInput) {
      id
      createdAt
      updatedAt
      TagType
      tagTitle
      points
    }
  }
`,Hr=`
  mutation AddSubtag($subtagInput: SubtagInput!) {
    addSubtag(subtagInput: $subtagInput) {
      id
      createdAt
      updatedAt
      TagType
      tagTitle
      subtagTitle
      points
    }
  }
`,qr=`
  mutation DeleteTag($tagId: String!) {
    deleteTag(tagId: $tagId) {
      id
      hasBeenDeleted
    }
  }
`,Jr=`
  mutation DeleteSubtag($subtagId: String!) {
    deleteSubtag(subtagId: $subtagId) {
      id
      hasBeenDeleted
    }
  }
`,We=()=>typeof crypto<"u"&&crypto.randomUUID?crypto.randomUUID():"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){const i=Math.random()*16|0;return(t=="x"?i:i&3|8).toString(16)}),ps=(t,i,s,n,u,g,a)=>{const[o,c]=r.useState([]),[d,x]=r.useState(null),[f,p]=r.useState(!1),[l,v]=r.useState(null),[O,z]=r.useState(null),[j,Q]=r.useState(null),[re,y]=r.useState(!1),[L,se]=r.useState(!1),[W,Z]=r.useState(""),[oe,ee]=r.useState(""),[k,J]=r.useState(!1),[ne,E]=r.useState(!1),I=r.useRef(!1),A=r.useRef(""),K=r.useRef(!1),U=r.useMemo(()=>({photoIndices:Array.from(u),existingIndices:Array.from(g),hasSelection:u.size>0||g.size>0}),[u,g]),G=r.useMemo(()=>{const h=[];t.forEach(T=>{h.push(...T)}),s.forEach(T=>{h.push(...T)});const w=new Map;return h.forEach(T=>{if(w.has(T.tagTitle)){const D=w.get(T.tagTitle),_=[...D.subtags,...T.subtags],C=Array.from(new Map(_.map(F=>[F.subtagTitle,F])).values());w.set(T.tagTitle,{...D,subtags:C})}else w.set(T.tagTitle,T)}),Array.from(w.values())},[t,s]),M=r.useCallback((h,w)=>{const T=[],D=Math.floor(Date.now()/1e3),_=new Set(h.map(C=>C.tagTitle));return w.forEach(C=>{if(_.has(C.tagTitle)){const F=h.findIndex(P=>P.tagTitle===C.tagTitle);if(F!==-1){const P=h[F],Y=new Set((P.subtags||[]).map(q=>q.subtagTitle)),te=[];C.subtags.forEach(q=>{if(!Y.has(q.subtagTitle)){const _e={id:We(),tagTitle:q.tagTitle,subtagTitle:q.subtagTitle,TagType:C.TagType||"File",points:1,createdAt:D,updatedAt:D,isCreatedFromApplied:!0};te.push(_e),a(`Created missing subtag from applied tags: ${q.subtagTitle} for tag ${q.tagTitle}`)}}),te.length>0&&(h[F]={...P,subtags:[...P.subtags||[],...te]})}}else{const F={id:We(),tagTitle:C.tagTitle,TagType:C.TagType||"File",points:1,createdAt:D,updatedAt:D,subtags:[],isCreatedFromApplied:!0};C.subtags&&C.subtags.length>0&&(F.subtags=C.subtags.map(P=>({id:We(),tagTitle:P.tagTitle,subtagTitle:P.subtagTitle,TagType:C.TagType||"File",points:1,createdAt:D,updatedAt:D,isCreatedFromApplied:!0}))),T.push(F),a(`Created missing tag from applied tags: ${C.tagTitle} with ${C.subtags.length} subtags`)}}),T},[a]),le=r.useCallback(h=>{if(!U.hasSelection)return!1;const w=U.photoIndices.length===0||U.photoIndices.every(D=>(t.get(D)||[]).some(C=>C.tagTitle===h.tagTitle)),T=U.existingIndices.length===0||U.existingIndices.every(D=>(s.get(D)||[]).some(C=>C.tagTitle===h.tagTitle));return w&&T},[U,t,s]),ce=r.useCallback(h=>{if(!U.hasSelection)return!1;let w=0,T=0;U.photoIndices.forEach(P=>{const te=(t.get(P)||[]).find(q=>q.tagTitle===h.tagTitle);te&&(w++,te.subtags.some(q=>q.subtagTitle===h.subtagTitle)&&T++)});let D=0,_=0;U.existingIndices.forEach(P=>{const te=(s.get(P)||[]).find(q=>q.tagTitle===h.tagTitle);te&&(D++,te.subtags.some(q=>q.subtagTitle===h.subtagTitle)&&_++)});const C=w+D,F=T+_;return C>0&&F===C},[U,t,s]),fe=r.useCallback(h=>{if(!U.hasSelection){a("No files selected for tag application");return}const w=le(h);a(`${w?"Removing":"Applying"} tag "${h.tagTitle}" ${w?"from":"to"} all selected files`),U.photoIndices.length>0&&i(T=>{const D=new Map(T);return U.photoIndices.forEach(_=>{const C=D.get(_)||[];if(w){const F=C.filter(P=>P.tagTitle!==h.tagTitle);D.set(_,F)}else if(!C.some(P=>P.tagTitle===h.tagTitle)){const P={tagTitle:h.tagTitle,TagType:h.TagType,subtags:[]};D.set(_,[...C,P])}}),D}),U.existingIndices.length>0&&n(T=>{const D=new Map(T);return U.existingIndices.forEach(_=>{const C=D.get(_)||[];if(w){const F=C.filter(P=>P.tagTitle!==h.tagTitle);D.set(_,F)}else if(!C.some(P=>P.tagTitle===h.tagTitle)){const P={tagTitle:h.tagTitle,TagType:h.TagType,subtags:[]};D.set(_,[...C,P])}}),D})},[U,le,i,n,a]),we=r.useCallback(h=>{if(!U.hasSelection){a("No files selected for subtag application");return}const w=ce(h);a(`${w?"Removing":"Applying"} subtag "${h.subtagTitle}" ${w?"from":"to"} all selected files with parent tag`),U.photoIndices.length>0&&i(T=>{const D=new Map(T);return U.photoIndices.forEach(_=>{const F=(D.get(_)||[]).map(P=>{if(P.tagTitle===h.tagTitle){if(w)return{...P,subtags:P.subtags.filter(Y=>Y.subtagTitle!==h.subtagTitle)};if(!P.subtags.some(te=>te.subtagTitle===h.subtagTitle))return{...P,subtags:[...P.subtags,{tagTitle:h.tagTitle,subtagTitle:h.subtagTitle}]}}return P});D.set(_,F)}),D}),U.existingIndices.length>0&&n(T=>{const D=new Map(T);return U.existingIndices.forEach(_=>{const F=(D.get(_)||[]).map(P=>{if(P.tagTitle===h.tagTitle){if(w)return{...P,subtags:P.subtags.filter(Y=>Y.subtagTitle!==h.subtagTitle)};if(!P.subtags.some(te=>te.subtagTitle===h.subtagTitle))return{...P,subtags:[...P.subtags,{tagTitle:h.tagTitle,subtagTitle:h.subtagTitle}]}}return P});D.set(_,F)}),D})},[U,ce,i,n,a]),ye=r.useCallback(()=>{const h=[];U.photoIndices.forEach(T=>{const D=t.get(T)||[];h.push(...D)}),U.existingIndices.forEach(T=>{const D=s.get(T)||[];h.push(...D)});const w=new Map;return h.forEach(T=>{if(w.has(T.tagTitle)){const D=w.get(T.tagTitle),_=[...D.subtags,...T.subtags],C=Array.from(new Map(_.map(F=>[F.subtagTitle,F])).values());w.set(T.tagTitle,{...D,subtags:C})}else w.set(T.tagTitle,T)}),Array.from(w.values())},[U,t,s]),Pe=r.useCallback(()=>U.hasSelection,[U.hasSelection]),de=r.useCallback(async()=>{var h,w;if(K.current||f){a("Tags already loading, skipping duplicate fetch");return}K.current=!0,a("Fetching tags from API and checking for missing applied tags"),p(!0),Q(null);try{const T=await be();if(!T){a("No token available for fetching tags"),Q("Authentication token not available");return}const D=await fetch(Re,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${T}`},body:JSON.stringify({query:Wr,variables:{fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})});if(!D.ok)throw new Error(`HTTP error! status: ${D.status}`);const _=await D.json();if(a("Tags API response:",_),_.errors){console.error("GraphQL errors:",_.errors);const P=_.errors.map(Y=>Y.message).join(", ");a(`GraphQL errors: ${P}`),Q(`GraphQL errors: ${P}`);return}let F=(((w=(h=_==null?void 0:_.data)==null?void 0:h.fetchRelations)==null?void 0:w.items)||[]).map(P=>{var Y,te;return{id:P.id,tagTitle:P.tagTitle,TagType:P.TagType,points:P.points,createdAt:P.createdAt,updatedAt:P.updatedAt,subtags:((te=(Y=P.subtags)==null?void 0:Y.items)==null?void 0:te.map(q=>({id:q.id,tagTitle:q.tagTitle,subtagTitle:q.subtagTitle,TagType:q.TagType,points:q.points,createdAt:q.createdAt,updatedAt:q.updatedAt})))||[]}});if(a(`Fetched ${F.length} tags from API`),G.length>0){const P=M(F,G);P.length>0&&(a(`Created ${P.length} missing tags from applied tags`),F=[...P,...F])}a(`Final tags list: ${F.length} tags (including ${F.filter(P=>P.isCreatedFromApplied).length} created from applied tags)`),c(F),I.current=!0}catch(T){console.error("Error fetching tags:",T),a(`Error fetching tags: ${T}`),Q(T instanceof Error?T.message:"Unknown error occurred")}finally{p(!1),K.current=!1}},[f,a,G,M]),Ie=r.useCallback(h=>{a(`Setting displayed tag: ${h}`),x(h)},[a]),Ne=r.useCallback(()=>{if(!d)return[];const h=o.find(w=>w.id===d);return(h==null?void 0:h.subtags)||[]},[d,o]),Ae=async(h,w)=>{if(a(`Adding new tag: ${h} of type: ${w}`),!h.trim())return a("Cannot add tag with empty title"),!1;J(!0);try{if(!await be())return a("No token available for adding tag"),!1;if(await(async()=>(a("PLACEHOLDER: Would send GraphQL mutation to add tag",{mutation:Kr,variables:{tagInput:{tagTitle:h.trim(),TagType:w,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(C=>setTimeout(C,500)),!0))()){const C={id:We(),tagTitle:h.trim(),TagType:w,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3),subtags:[]};return c(F=>[C,...F]),fe(C),Ie(C.id),Z(""),y(!1),a(`Successfully added and applied new tag: ${h}`),!0}return!1}catch(T){return console.error("Error adding new tag:",T),a(`Error adding new tag: ${T}`),!1}finally{J(!1)}},b=async(h,w,T)=>{if(a(`Adding new subtag: ${w} to tag: ${h}`),!w.trim())return a("Cannot add subtag with empty title"),!1;if(!d)return a("No displayed tag for adding subtag"),!1;E(!0);try{if(!await be())return a("No token available for adding subtag"),!1;if(await(async()=>(a("PLACEHOLDER: Would send GraphQL mutation to add subtag",{mutation:Hr,variables:{subtagInput:{tagTitle:h,subtagTitle:w.trim(),TagType:T,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(F=>setTimeout(F,500)),!0))()){const F={id:We(),tagTitle:h,subtagTitle:w.trim(),TagType:T,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3)};return c(P=>P.map(Y=>Y.id===d?{...Y,subtags:[F,...Y.subtags||[]]}:Y)),we(F),ee(""),se(!1),a(`Successfully added and applied new subtag: ${w}`),!0}return!1}catch(D){return console.error("Error adding new subtag:",D),a(`Error adding new subtag: ${D}`),!1}finally{E(!1)}},N=async h=>{a(`Deleting tag: ${h}`),v(h);try{if(!await be())return a("No token available for deleting tag"),!1;if(await(async()=>(a("PLACEHOLDER: Would send GraphQL mutation to delete tag",{mutation:qr,variables:{tagId:h}}),await new Promise(_=>setTimeout(_,500)),!0))()){const _=o.find(C=>C.id===h);return c(C=>C.filter(F=>F.id!==h)),_&&(i(C=>{const F=new Map(C);return C.forEach((P,Y)=>{const te=P.filter(q=>q.tagTitle!==_.tagTitle);F.set(Y,te)}),F}),n(C=>{const F=new Map(C);return C.forEach((P,Y)=>{const te=P.filter(q=>q.tagTitle!==_.tagTitle);F.set(Y,te)}),F})),d===h&&Ie(null),a(`Successfully deleted tag: ${h}`),!0}return!1}catch(w){return console.error("Error deleting tag:",w),a(`Error deleting tag: ${w}`),!1}finally{v(null)}},B=async h=>{a(`Deleting subtag: ${h}`),z(h);try{if(!await be())return a("No token available for deleting subtag"),!1;if(await(async()=>(a("PLACEHOLDER: Would send GraphQL mutation to delete subtag",{mutation:Jr,variables:{subtagId:h}}),await new Promise(_=>setTimeout(_,500)),!0))()){let _=null;return c(C=>C.map(F=>{var Y;const P=((Y=F.subtags)==null?void 0:Y.filter(te=>te.id===h?(_=te,!1):!0))||[];return{...F,subtags:P}})),_&&(i(C=>{const F=new Map(C);return C.forEach((P,Y)=>{const te=P.map(q=>q.tagTitle===_.tagTitle?{...q,subtags:q.subtags.filter(_e=>_e.subtagTitle!==_.subtagTitle)}:q);F.set(Y,te)}),F}),n(C=>{const F=new Map(C);return C.forEach((P,Y)=>{const te=P.map(q=>q.tagTitle===_.tagTitle?{...q,subtags:q.subtags.filter(_e=>_e.subtagTitle!==_.subtagTitle)}:q);F.set(Y,te)}),F})),a(`Successfully deleted subtag: ${h}`),!0}return!1}catch(w){return console.error("Error deleting subtag:",w),a(`Error deleting subtag: ${w}`),!1}finally{z(null)}},H=()=>{y(!0),Z("")},ie=()=>{y(!1),Z("")},ue=()=>{se(!0),ee("")},V=()=>{se(!1),ee("")},ke=async()=>W.trim()?await Ae(W,"File"):!1,Te=async()=>{if(oe.trim()&&d){const h=o.find(w=>w.id===d);if(h)return await b(h.tagTitle,oe,h.TagType)}return!1};return r.useEffect(()=>{I.current||de()},[de]),r.useEffect(()=>{if(!I.current||K.current)return;const h=JSON.stringify(G.map(w=>({title:w.tagTitle,subtags:w.subtags.map(T=>T.subtagTitle).sort()})));if(h!==A.current){A.current=h;const w=G.filter(T=>!o.some(D=>D.tagTitle===T.tagTitle));if(w.length>0){a(`Detected ${w.length} new applied tags, refreshing tags list`,w.map(D=>D.tagTitle));const T=setTimeout(()=>{de()},300);return()=>clearTimeout(T)}}},[G,o,a,de]),r.useEffect(()=>{if(d){const h=o.find(w=>w.id===d);h&&!le(h)&&(a(`Clearing displayed tag "${h.tagTitle}" because it's no longer applied to all selected files`),x(null))}},[u.size,g.size,d,o,le,a]),{tags:o,displayedTagId:d,isLoadingTags:f,tagIdBeingDeleted:l,subtagIdBeingDeleted:O,fetchError:j,isAddingNewTag:re,isAddingNewSubtag:L,newTagTitle:W,newSubtagTitle:oe,isSubmittingNewTag:k,isSubmittingNewSubtag:ne,fetchTags:de,toggleTagOnSelectedFiles:fe,toggleSubtagOnSelectedFiles:we,setDisplayedTag:Ie,isTagAppliedToSelected:le,isSubtagAppliedToSelected:ce,getDisplayedTagSubtags:Ne,getAppliedTagsForSelected:ye,hasSelectedFiles:Pe,addNewTag:Ae,addNewSubtag:b,deleteTag:N,deleteSubtag:B,startAddingNewTag:H,cancelAddingNewTag:ie,startAddingNewSubtag:ue,cancelAddingNewSubtag:V,submitNewTag:ke,submitNewSubtag:Te,setNewTagTitle:Z,setNewSubtagTitle:ee}},Qr=(t,i=50,s=3e3)=>{const n=r.useRef(0),u=r.useRef(Date.now()),g=r.useRef(!1),a=r.useRef(0),o=Date.now();return o-u.current>s&&(n.current=0,u.current=o,g.current&&o-a.current>1e4&&(g.current=!1,console.log(`🔄 Circuit breaker reset for ${t}`))),n.current++,n.current>i&&!g.current&&(g.current=!0,a.current=o,console.error(`🚨 CIRCUIT BREAKER ACTIVATED for ${t}! Renders: ${n.current}`)),{isBlocked:g.current,renderCount:n.current,reset:()=>{n.current=0,u.current=Date.now(),g.current=!1}}},Vr=$.div`
  display: flex;
  flex-direction: column;
  gap: ${m.spacing.xs}; /* Reduced from sm (8px) to xs (4px) */
  /* Enhanced: Use consistent grid spacing */
  margin-bottom: ${m.spacing.lg};
  width: 100%;
  align-items: flex-end; /* Align buttons to the right side */
  padding: 0 ${m.spacing.sm}; /* Match the header button positioning */
`,Pt=()=>{const{t,language:i}=ge(),s=Fe(i)==="rtl",{isBlocked:n,renderCount:u,reset:g}=Qr("SingleAlbumMode"),[a,o]=r.useState({selectedPhotoIndices:new Set,photoTagsMap:new Map,selectedExistingIndices:new Set,existingFileTagsMap:new Map}),c=Ot(t),{setShowUsernamePrompt:d,setUsernameInput:x}=c,[f,p]=r.useState(null),[l,v]=r.useState(!1),[O,z]=r.useState(0),[j,Q]=r.useState(""),[re,y]=r.useState(""),[L,se]=r.useState(!1),[W,Z]=r.useState(!1),[oe,ee]=r.useState("NoPassword"),[k,J]=r.useState(""),[ne,E]=r.useState(!1),[I,A]=r.useState(!0),[K,U]=r.useState(!1),[G,M]=r.useState(null),[le,ce]=r.useState(!1),[fe,we]=r.useState([]),[ye,Pe]=r.useState("2"),[de,Ie]=r.useState([]),[Ne,Ae]=r.useState(!1),[b,N]=r.useState(!1),[B,H]=r.useState(!1),ie=r.useRef(null),ue=r.useRef(!1),V=r.useCallback((S,R)=>{const X=new Date().toISOString();console.log(`[${X}] ${S}`,R)},[]),ke=r.useCallback(S=>{!f&&S&&p(S)},[f]),Te=qs(ke,!0),{fileInputRef:h,selectedPhotos:w,setSelectedPhotos:T,isUploading:D,progressTracker:_,setProgressTracker:C,debugMessages:F,currentFolderId:P,openFilePicker:Y,handleFileSelection:te,setOnSaveAlbumPage:q}=Te,_e=ar(p,T,M,se,Q,y,E,A,ee,J,ce,we,U,V),{cognitoUsername:ct,publicUsername:He,setPublicUsername:dt,isExistingAlbum:qe}=_e,fs=ps(a.photoTagsMap,S=>{o(R=>({...R,photoTagsMap:typeof S=="function"?S(R.photoTagsMap):S}))},a.existingFileTagsMap,S=>{o(R=>({...R,existingFileTagsMap:typeof S=="function"?S(R.existingFileTagsMap):S}))},a.selectedPhotoIndices,a.selectedExistingIndices,V),gs=nr(f||P,ct,w,le,fe,j,re,ne,I,K,oe,k,a.photoTagsMap,a.existingFileTagsMap,de,a.selectedExistingIndices,v,z,T,C,V,t),{saveAlbumDirectly:Je}=gs;r.useEffect(()=>{const S=localStorage.getItem("save-album-columns")||"2";Pe(S)},[]);const hs=r.useCallback(S=>{Pe(S),localStorage.setItem("save-album-columns",S)},[]);r.useEffect(()=>{const S=R=>{ie.current&&!ie.current.contains(R.target)&&H(!1)};return document.addEventListener("mousedown",S),()=>{document.removeEventListener("mousedown",S)}},[]),r.useEffect(()=>(q(!0),()=>q(!1)),[q]),r.useEffect(()=>{(async()=>{try{await Gs()}catch(R){console.warn("Credential prewarming failed:",R)}})()},[]);const ut=r.useCallback(async S=>{var R,X;if(S){Ae(!0);try{const ae=await be();if(!ae)return;const pe=`
        mutation FetchRelations($fetchRelationsInput: FetchRelationsInput!) {
          fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
            items {
              ... on FolderPosition {
                ${Hs}
              }
            }
          }
        }
      `,me={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}},ve=await(await fetch(Re,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${ae}`},body:JSON.stringify({query:pe,variables:me})})).json();if(ve.errors){console.error("GraphQL errors:",ve.errors);return}const pt=(((X=(R=ve==null?void 0:ve.data)==null?void 0:R.fetchRelations)==null?void 0:X.items)||[]).find(Se=>Se&&Se.folder&&Se.folder.id===S);if(!pt)return;const Ge=pt.folder,Qe=Ge.fileReferencesPage,Ns=Array.isArray(Qe==null?void 0:Qe.items)?Qe.items:[],ft=[],gt=new Map;Ns.forEach((Se,_s)=>{const Ce=Se.file;if(Ce&&Ce.dataKey){let Xe=Se.fileDisplayName;if(!Xe&&Ce.dataKey){const Ve=Ce.dataKey.split("/");Xe=Ve[Ve.length-1]}ft.push({fileReferenceId:Se.id,dataKey:Ce.dataKey,thumbnailDataKey:Ce.thumbnailDataKey||null,durationInSeconds:Ce.durationInSeconds||null,dataInBytes:Ce.dataInBytes||0,fileName:Xe||void 0});const Ze=Se.selectedTags;if(Array.isArray(Ze)&&Ze.length>0){const Ve=Ze.map(Ye=>({tagTitle:Ye.tagTitle,TagType:Ye.TagType,subtags:Array.isArray(Ye.subtags)?Ye.subtags.map(ht=>({tagTitle:ht.tagTitle,subtagTitle:ht.subtagTitle})):[]}));gt.set(_s,Ve)}}}),Ie(ft),o(Se=>({...Se,existingFileTagsMap:gt})),ue.current||(Ge.folderName&&Q(Ge.folderName),Ge.folderDescription&&y(Ge.folderDescription),ue.current=!0,V("Set initial folder details from fetched data"))}catch(ae){console.error("Failed to fetch existing album data:",ae)}finally{Ae(!1)}}},[V]);r.useEffect(()=>{f&&qe?(V(`Loading existing files for existing album: ${f}`),ut(f)):f&&!qe&&V(`New album detected with folderId: ${f}, skipping existing files load`)},[f,qe,ut,V]),r.useEffect(()=>{P&&!f&&p(P)},[P,f]),r.useEffect(()=>{o(S=>{const R=new Set,X=new Map;return S.selectedPhotoIndices.forEach(ae=>{ae<w.length&&R.add(ae)}),S.photoTagsMap.forEach((ae,pe)=>{pe<w.length&&X.set(pe,ae)}),{...S,selectedPhotoIndices:R,photoTagsMap:X}})},[w.length]),r.useEffect(()=>{o(S=>{const R=new Set,X=new Map;return S.selectedExistingIndices.forEach(ae=>{ae<de.length&&R.add(ae)}),S.existingFileTagsMap.forEach((ae,pe)=>{pe<de.length&&X.set(pe,ae)}),{...S,selectedExistingIndices:R,existingFileTagsMap:X}})},[de.length]);const ms=r.useCallback(S=>{const R=w.filter((X,ae)=>ae!==S);T(R);try{R.length>0?localStorage.setItem(he.SELECTED_PHOTOS,JSON.stringify(R)):localStorage.removeItem(he.SELECTED_PHOTOS)}catch(X){console.warn("Failed to update localStorage:",X)}o(X=>{const ae=new Set,pe=new Map;return X.selectedPhotoIndices.forEach(me=>{me<S?ae.add(me):me>S&&ae.add(me-1)}),X.photoTagsMap.forEach((me,xe)=>{xe<S?pe.set(xe,me):xe>S&&pe.set(xe-1,me)}),{...X,selectedPhotoIndices:ae,photoTagsMap:pe}})},[w,T]),xs=r.useCallback(async S=>{const R=de[S];if(!R){V(`No file found at index ${S}`);return}N(!0),V(`Starting deletion of file reference: ${R.fileReferenceId}`);try{await Ee.deleteFileReferences([R.fileReferenceId],V),V(`Successfully deleted file reference: ${R.fileReferenceId}`);const X=de.filter((ae,pe)=>pe!==S);Ie(X),o(ae=>{const pe=new Set,me=new Map;return ae.selectedExistingIndices.forEach(xe=>{xe<S?pe.add(xe):xe>S&&pe.add(xe-1)}),ae.existingFileTagsMap.forEach((xe,ve)=>{ve<S?me.set(ve,xe):ve>S&&me.set(ve-1,xe)}),{...ae,selectedExistingIndices:pe,existingFileTagsMap:me}}),V(`File removed from local state, ${X.length} files remaining`)}catch(X){console.error("Failed to delete file reference:",X),V(`Failed to delete file reference: ${X}`),alert(t("Failed to delete file. Please try again."))}finally{N(!1)}},[de,V,t]),bs=r.useCallback(S=>{o(R=>{const X=new Set(R.selectedExistingIndices);return X.has(S)?X.delete(S):X.add(S),{...R,selectedExistingIndices:X}})},[]),ws=r.useCallback(()=>{const S=new Set;for(let R=0;R<de.length;R++)S.add(R);o(R=>({...R,selectedExistingIndices:S}))},[de.length]),ys=r.useCallback(()=>{o(S=>({...S,selectedExistingIndices:new Set}))},[]),Ts=r.useCallback(S=>{o(R=>{const X=new Set(R.selectedPhotoIndices);return X.has(S)?X.delete(S):X.add(S),{...R,selectedPhotoIndices:X}})},[]),vs=r.useCallback(()=>{const S=new Set;for(let R=0;R<w.length;R++)S.add(R);o(R=>({...R,selectedPhotoIndices:S}))},[w.length]),Ss=r.useCallback(()=>{o(S=>({...S,selectedPhotoIndices:new Set}))},[]),$s=r.useCallback(()=>{if(confirm(t("Are you sure you want to delete all new files? This action cannot be undone."))){T([]),o({selectedPhotoIndices:new Set,photoTagsMap:new Map,selectedExistingIndices:new Set,existingFileTagsMap:new Map});try{localStorage.removeItem(he.SELECTED_PHOTOS)}catch(S){console.warn("Failed to update localStorage:",S)}}},[t,T]),Ps=r.useCallback(async()=>{if(!l){v(!0);try{if(He!=null&&He.startsWith("Profile-")){x(""),d(!0),v(!1);return}Je()}catch(S){console.error("Error in handleSaveAlbumSingle:",S),v(!1)}}},[l,He,x,d,Je]),Is=r.useCallback(S=>{try{localStorage.setItem(he.PUBLIC_USERNAME,S)}catch(R){console.warn("Failed to save username to localStorage:",R)}dt(S),d(!1),Je()},[dt,d,Je]),As=r.useCallback((S,R)=>{S&&ee(S),R!==void 0&&J(R),Z(!1)},[]),ks=r.useCallback(()=>{Z(!0)},[]),js=r.useCallback(()=>{E(!ne)},[ne]),Cs=r.useCallback(()=>{A(!I)},[I]),Ds=r.useCallback(()=>{U(!K)},[K]),Es=r.useCallback(()=>{Y(f)},[Y,f]),je=l||D||Ne||b,Fs=w.length>0||de.length>0;return n?e.jsxs("div",{style:{padding:"20px",textAlign:"center",backgroundColor:"#ffebee",border:"2px solid #f44336",borderRadius:"8px",margin:"20px"},children:[e.jsx("h2",{children:"🚨 Component Temporarily Blocked"}),e.jsx("p",{children:"The component was rendering too frequently and has been safely stopped."}),e.jsxs("p",{children:["Render count: ",u]}),e.jsx("button",{onClick:g,style:{padding:"10px 20px",backgroundColor:"#4caf50",color:"white",border:"none",borderRadius:"4px",cursor:"pointer",marginRight:"10px"},children:"Reset Component"}),e.jsx("button",{onClick:()=>window.location.reload(),style:{padding:"10px 20px",backgroundColor:"#f44336",color:"white",border:"none",borderRadius:"4px",cursor:"pointer"},children:"Reload Page"})]}):e.jsxs(e.Fragment,{children:[e.jsx(Et,{}),!1,e.jsx(Ft,{children:e.jsxs(Nt,{style:{display:"flex",justifyContent:"space-between",alignItems:"center",flexDirection:s?"row-reverse":"row"},children:[e.jsx("div",{style:{order:s?2:1,textAlign:s?"right":"left"},children:e.jsx(_t,{onClick:()=>De(Rt("my-albums.html")),children:t("← Back To Albums")})}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",order:s?1:2,flexDirection:s?"row-reverse":"row"},children:[L&&G===!0&&e.jsxs("div",{ref:ie,style:{position:"relative"},children:[e.jsx(ds,{onClick:()=>H(!B),disabled:je,title:t("Album Settings")}),e.jsx(Sr,{showGear:B,isOnPublicProfile:ne,participantsCanAddItems:I,participantsCanDeleteItems:K,passwordProtectionOption:oe,albumPassword:k,onTogglePublicProfile:js,onToggleParticipantsCanAdd:Cs,onToggleParticipantsCanDelete:Ds,onPasswordClick:ks,disabled:je})]}),e.jsx(Ke,{$primary:!0,onClick:Ps,disabled:je,style:{minWidth:"120px",fontSize:"14px",padding:"8px 16px"},children:t(l?"Saving...":"Save Album")})]})]})}),e.jsxs(zt,{$isRTL:s,children:[e.jsx("div",{style:{marginTop:L&&G===!0?"3px":"0"},children:e.jsx(os,{showFolderDetails:L,isCreator:G,folderName:j,setFolderName:Q,folderDescription:re,setFolderDescription:y,isSavingAlbum:je})}),(D||_.totalFiles>0&&(_.filesUploading>0||_.filesProcessing>0||_.filesComplete<_.totalFiles))&&e.jsx(Js,{progressTracker:_,isRTL:Fe(i)==="rtl",variant:"detailed",context:"saving",isUploading:D,showSuccessMessage:!1,showErrorMessage:!0,customMessages:{error:t("Some photos could not be processed. You can continue with the successfully processed photos.")}}),b&&e.jsx("div",{style:{padding:"16px",marginBottom:"16px",backgroundColor:"#fff3cd",border:"1px solid #ffeaa7",borderRadius:"8px",color:"#856404",textAlign:"center",fontWeight:"500"},children:t("Deleting file...")}),Ne&&e.jsx("div",{style:{padding:"16px",marginBottom:"16px",backgroundColor:"#f8f9fa",border:"1px solid #dee2e6",borderRadius:"8px",color:"#6c757d",textAlign:"center",fontStyle:"italic"},children:t("Loading existing files...")}),e.jsx("input",{ref:h,id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:S=>te(S,ct),style:{display:"none"}}),L&&G===!0&&Fs&&e.jsxs("div",{style:{padding:"32px",marginBottom:"32px",backgroundColor:"#f8f9fa",border:"2px solid #e9ecef",borderRadius:"12px",direction:s?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",fontSize:"18px",color:"#495057",fontWeight:"600",marginBottom:"24px",flexDirection:s?"row-reverse":"row"},children:[e.jsx("span",{style:{marginRight:s?"0":"12px",marginLeft:s?"12px":"0",fontSize:"20px"},children:"🏷️"}),t("Select files to start adding or removing tags")]}),qe&&de.length>0&&e.jsx(br,{existingFiles:de,selectedExistingIndices:a.selectedExistingIndices,onToggleSelection:bs,onSelectAll:ws,onDeselectAll:ys,onDeleteFile:xs,disabled:je,isCreator:G,participantsCanDeleteItems:K,existingFileTagsMap:a.existingFileTagsMap,t,isRTL:s}),e.jsx(wr,{selectedPhotos:w,selectedPhotoIndices:a.selectedPhotoIndices,onToggleSelection:Ts,onSelectAll:vs,onDeselectAll:Ss,onRemovePhoto:ms,onDeleteAll:$s,disabled:je,photoTagsMap:a.photoTagsMap,columns:ye,setColumns:hs,t,isRTL:s}),(a.selectedPhotoIndices.size>0||a.selectedExistingIndices.size>0)&&e.jsx(nt,{tagsManager:fs,disabled:je,enhancedLog:V})]}),e.jsx(as,{isSavingAlbum:l,savingProgress:O}),e.jsx(Vr,{children:e.jsx(Ke,{onClick:Es,disabled:je,children:t(D?"Uploading...":"Add More Photos")})}),e.jsx(Mt,{t,language:i,usernameManager:c,onSuccess:Is}),e.jsx(us,{isOpen:W,onClose:As,initialOption:oe,initialPassword:k}),e.jsx(Gr,{debugMessages:F,t,isRTL:s,textDirection:s?"rtl":"ltr"})]})]})},Yr=$.div`
  background: #fff;
  border: 2px solid #e9ecef;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    border-color: #007bff;
    box-shadow: 0 6px 20px rgba(0, 123, 255, 0.1);
  }
`,Xr=$.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`,Zr=$.div`
  flex: 1;
`,Lr=$.h3`
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
`,ei=$.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
`,ti=$.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: stretch;
  }
`,It=$.button`
  padding: 8px 16px;
  border: 1px solid ${t=>t.$variant==="primary"?"#007bff":t.$variant==="danger"?"#dc3545":"#6c757d"};
  border-radius: 6px;
  background: ${t=>t.$variant==="primary"?"#007bff":t.$variant==="danger"?"#dc3545":"transparent"};
  color: ${t=>t.$variant==="primary"||t.$variant==="danger"?"white":"#6c757d"};
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    background: ${t=>t.$variant==="primary"?"#0056b3":t.$variant==="danger"?"#c82333":"#6c757d"};
    color: white;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    flex: 1;
  }
`,si=$.button`
  padding: 8px;
  border: 1px solid #6c757d;
  border-radius: 6px;
  background: transparent;
  color: #6c757d;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  position: relative;

  &:hover {
    background: #6c757d;
    color: white;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`,ri=$.div`
  position: absolute;
  top: 100%;
  ${t=>t.$isRTL?"left: 0;":"right: 0;"}
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 280px;
  padding: 16px;
  margin-top: 4px;
`,et=$.div`
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,tt=$.h4`
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #333;
`,st=$.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  padding: 4px 0;
`,rt=$.div`
  font-size: 13px;
  color: #333;
  line-height: 1.4;
`,it=$.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
    
    &:checked + span {
      background-color: #007bff;
    }
    
    &:checked + span:before {
      transform: translateX(16px);
    }
    
    &:disabled + span {
      background-color: #e6e6e6;
      cursor: not-allowed;
    }
  }
`,at=$.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .2s;
  border-radius: 24px;
  
  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 2px;
    top: 2px;
    background-color: white;
    transition: .2s;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`,ii=$.button`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid ${t=>t.$hasPassword?"#28a745":"#dee2e6"};
  border-radius: 6px;
  background: ${t=>t.$hasPassword?"#28a745":"#f8f9fa"};
  color: ${t=>t.$hasPassword?"white":"#6c757d"};
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &:hover {
    background: ${t=>t.$hasPassword?"#218838":"#e9ecef"};
    border-color: ${t=>t.$hasPassword?"#218838":"#adb5bd"};
  }
`,At=$.div`
  margin-bottom: 16px;
`,kt=$.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #333;
  font-size: 14px;
`,ai=$.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  &:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
  }
`,oi=$.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  resize: vertical;
  min-height: 80px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  &:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
  }
`,ni=$.div`
  margin-top: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e9ecef;
`,li=$.div`
  width: 100%;
  height: 6px;
  background: #e9ecef;
  border-radius: 3px;
  overflow: hidden;
  margin-top: 8px;
`,ci=$.div`
  height: 100%;
  background: linear-gradient(90deg, #007bff, #28a745);
  width: ${t=>t.$progress}%;
  transition: width 0.3s ease;
`,di=$.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
  justify-content: flex-end;
  flex-direction: ${t=>t.$isRTL?"row-reverse":"row"};
`,jt=$.button`
  padding: 6px 12px;
  font-size: 12px;
  border: 1px solid ${t=>t.$variant==="danger"?"#dc3545":"#ddd"};
  border-radius: 4px;
  background-color: ${t=>t.$variant==="danger"?"#dc3545":"#fff"};
  color: ${t=>t.$variant==="danger"?"white":"#333"};
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover:not(:disabled) {
    background-color: ${t=>t.$variant==="danger"?"#c82333":"#f8f9fa"};
    border-color: ${t=>t.$variant==="danger"?"#c82333":"#007bff"};
    color: ${t=>t.$variant==="danger"?"white":"#007bff"};
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: #f8f9fa;
    color: #999;
    cursor: not-allowed;
    transform: none;
  }
`,ui=({album:t,onUpdate:i,onSave:s,onRemove:n,onShowPasswordDialog:u,disabled:g,columns:a,enhancedLog:o})=>{const{t:c,language:d}=ge(),x=Fe(d)==="rtl",[f,p]=r.useState(!1),[l,v]=r.useState(!1),O=r.useRef(null);r.useEffect(()=>{const I=A=>{O.current&&!O.current.contains(A.target)&&p(!1)};return document.addEventListener("mousedown",I),()=>{document.removeEventListener("mousedown",I)}},[]);const z=ps(t.photoTagsMap,I=>{const A=typeof I=="function"?I(t.photoTagsMap):I;i({photoTagsMap:A})},new Map,()=>{},t.selectedPhotoIndices,new Set,o),j=I=>{i({name:I})},Q=I=>{i({description:I})},re=I=>{const A=new Set(t.selectedPhotoIndices);A.has(I)?A.delete(I):A.add(I),i({selectedPhotoIndices:A})},y=()=>{const I=new Set;for(let A=0;A<t.photos.length;A++)I.add(A);i({selectedPhotoIndices:I})},L=()=>{i({selectedPhotoIndices:new Set})},se=()=>{confirm(c("Are you sure you want to delete all files from this album? This action cannot be undone."))&&i({photos:[],selectedPhotoIndices:new Set,photoTagsMap:new Map})},W=I=>{const A=t.photos.filter((G,M)=>M!==I),K=new Set;t.selectedPhotoIndices.forEach(G=>{G<I?K.add(G):G>I&&K.add(G-1)});const U=new Map;t.photoTagsMap.forEach((G,M)=>{M<I?U.set(M,G):M>I&&U.set(M-1,G)}),i({photos:A,selectedPhotoIndices:K,photoTagsMap:U})},Z=()=>{i({isOnPublicProfile:!t.isOnPublicProfile})},oe=()=>{i({participantsCanAddItems:!t.participantsCanAddItems})},ee=()=>{i({participantsCanDeleteItems:!t.participantsCanDeleteItems})},k=()=>{u(t.id)},J=async()=>{if(!(l||g)){v(!0),o(`Starting save for album: ${t.name}`);try{const I=await s();o(`Save completed for album: ${t.name}, success: ${I}`),I||alert(c('Failed to save album "{{albumName}}". Please try again.',{albumName:t.name}))}catch(I){console.error("Error saving album:",I),o(`Error saving album ${t.name}: ${I}`),alert(c('Failed to save album "{{albumName}}". Please try again.',{albumName:t.name}))}finally{v(!1)}}},ne=t.passwordProtectionOption!=="NoPassword"&&t.albumPassword,E=g||l||t.isSaving;return e.jsxs(Yr,{children:[e.jsxs(Xr,{$isRTL:x,children:[e.jsxs(Zr,{children:[e.jsxs(Lr,{children:[e.jsx("span",{children:"📁"}),t.name,(t.isSaving||l)&&e.jsx("span",{style:{color:"#007bff"},children:"⏳"}),t.savingProgress===100&&e.jsx("span",{style:{color:"#28a745"},children:"✅"})]}),e.jsxs(ei,{children:[t.photos.length===1?c("1 file"):c("{{count}} files",{count:t.photos.length}),t.selectedPhotoIndices.size>0&&e.jsxs("span",{children:[" • ",c("{{count}} selected for tagging",{count:t.selectedPhotoIndices.size})]})]})]}),e.jsx(ti,{children:!t.isSaving&&!l&&t.savingProgress<100&&e.jsxs(e.Fragment,{children:[e.jsx(It,{$variant:"primary",onClick:J,disabled:E,children:c(l?"Saving...":"Save")}),e.jsxs("div",{ref:O,style:{position:"relative"},children:[e.jsx(si,{onClick:()=>p(!f),disabled:E,title:c("Album Settings"),children:"⚙️"}),f&&e.jsxs(ri,{$isRTL:x,children:[e.jsxs(et,{children:[e.jsx(tt,{children:c("Visibility")}),e.jsxs(st,{children:[e.jsx(rt,{children:c("Public Profile")}),e.jsxs(it,{children:[e.jsx("input",{type:"checkbox",checked:t.isOnPublicProfile,onChange:Z,disabled:E}),e.jsx(at,{})]})]})]}),e.jsxs(et,{children:[e.jsx(tt,{children:c("Participant Permissions")}),e.jsxs(st,{children:[e.jsx(rt,{children:c("Can Add Items")}),e.jsxs(it,{children:[e.jsx("input",{type:"checkbox",checked:t.participantsCanAddItems,onChange:oe,disabled:E}),e.jsx(at,{})]})]}),e.jsxs(st,{children:[e.jsx(rt,{children:c("Can Delete Items")}),e.jsxs(it,{children:[e.jsx("input",{type:"checkbox",checked:t.participantsCanDeleteItems,onChange:ee,disabled:E}),e.jsx(at,{})]})]})]}),e.jsxs(et,{children:[e.jsx(tt,{children:c("Security")}),e.jsxs(ii,{$hasPassword:!!ne,onClick:k,disabled:E,children:[ne?"🔒":"🔓",c(ne?"Password Set":"Set Password")]})]})]})]}),e.jsx(It,{$variant:"danger",onClick:n,disabled:E,children:c("Remove")})]})})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",marginBottom:"20px"},children:[e.jsxs(At,{children:[e.jsx(kt,{children:c("Album Name")}),e.jsx(ai,{type:"text",value:t.name,onChange:I=>j(I.target.value),placeholder:c("e.g. Family Vacation in Kyoto"),disabled:E})]}),e.jsxs("div",{children:[e.jsxs(At,{children:[e.jsx(kt,{children:c("Album Description")}),e.jsx(oi,{value:t.description,onChange:I=>Q(I.target.value),placeholder:c("e.g. what's special about this album"),disabled:E,rows:3})]}),t.photos.length>0&&e.jsxs(di,{$isRTL:x,children:[e.jsx(jt,{onClick:t.selectedPhotoIndices.size>0?L:y,disabled:E,children:t.selectedPhotoIndices.size>0?c("Done Tagging Selected"):c("Select All")}),t.selectedPhotoIndices.size===0&&e.jsx(jt,{$variant:"danger",onClick:se,disabled:E,children:c("Delete All")})]})]})]}),e.jsx(lt,{selectedPhotos:t.photos,selectedPhotoIndices:t.selectedPhotoIndices,isSavingAlbum:E,onRemovePhoto:W,onTogglePhotoSelection:re,onSelectAllPhotos:y,onDeselectAllPhotos:L,hideHeader:!1,photoTagsMap:t.photoTagsMap,columns:a,isMultipleAlbumMode:!0}),t.selectedPhotoIndices.size>0&&e.jsx(ni,{children:e.jsx(nt,{tagsManager:z,disabled:E,enhancedLog:o})}),(t.isSaving||l)&&e.jsxs("div",{style:{marginTop:"16px"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},children:[e.jsx("span",{style:{fontSize:"14px",fontWeight:"600",color:"#333"},children:c(l?"Starting save...":"Saving album...")}),e.jsx("span",{style:{fontSize:"14px",color:"#666"},children:c("{{progress}}%",{progress:t.savingProgress})})]}),e.jsx(li,{children:e.jsx(ci,{$progress:t.savingProgress})})]})]})},pi=$.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
`,fi=({albums:t,setAlbums:i,isSavingAny:s,onSaveAlbum:n,onRemoveAlbum:u,onShowPasswordDialog:g,columns:a,setColumns:o,enhancedLog:c})=>{const{language:d}=ge(),x=Fe(d)==="rtl",f=r.useCallback((l,v)=>{i(O=>O.map(z=>z.id===l?{...z,...v}:z))},[i]),p=r.useCallback(async l=>{try{const v=await n(l);return c(`Album ${l} save result: ${v?"success":"failed"}`),v}catch(v){return c(`Error saving album ${l}: ${v}`),!1}},[n,c]);return e.jsx("div",{children:e.jsx(pi,{$isRTL:x,children:t.map(l=>e.jsx(ui,{album:l,onUpdate:v=>f(l.id,v),onSave:()=>p(l.id),onRemove:()=>u(l.id),onShowPasswordDialog:g,disabled:s,columns:a,setColumns:o,enhancedLog:c},l.id))})})},gi=$.span`
  font-size: ${m.fontSizes.sm}; // 14px to match other header elements
  color: ${m.colors.text.secondary}; // Subtle gray like other controls
  font-weight: 500;
  white-space: nowrap;
  display: flex;
  align-items: center;
`,hi=$.select`
  padding: 6px 12px;
  border-radius: ${m.borderRadius.medium};
  border: 1px solid ${m.colors.borderLight};
  background-color: ${m.colors.white};
  font-size: ${m.fontSizes.sm}; // 14px to match label
  cursor: pointer;
  box-shadow: ${m.boxShadow.sm};
  min-width: 60px;
  transition: all 0.2s ease;
  color: ${m.colors.text.primary};
  
  &:hover {
    border-color: ${m.colors.border};
    box-shadow: ${m.boxShadow.md};
  }
  
  &:focus {
    outline: none;
    border-color: ${m.colors.primary};
    box-shadow: ${m.boxShadow.focusGlow};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: ${m.colors.grayLighter};
  }
`,mi=()=>{var Ne,Ae;const{t,language:i}=ge(),s=Fe(i)==="rtl",[n,u]=r.useState([]),[g,a]=r.useState("2"),[o,c]=r.useState(!1),[d,x]=r.useState(!1),[f,p]=r.useState(null),[l,v]=r.useState(null),[O,z]=r.useState(!1),[j,Q]=r.useState(0),[re,y]=r.useState(0),[L,se]=r.useState(""),[W,Z]=r.useState({isOnPublicProfile:!1,participantsCanAddItems:!0,participantsCanDeleteItems:!1,passwordProtectionOption:"NoPassword",albumPassword:""}),oe=Ot(t),{setShowUsernamePrompt:ee,setUsernameInput:k}=oe,[J,ne]=r.useState(null);r.useEffect(()=>{const b=localStorage.getItem(he.PUBLIC_USERNAME);ne(b||null)},[]);const E=(b,N)=>{const B=new Date().toISOString();console.log(`[${B}] ${b}`,N)};r.useEffect(()=>{(async()=>{try{const N=await be();if(N){const H=JSON.parse(atob(N.split(".")[1]))["cognito:username"];H&&(v(H),E(`Initialized Cognito username: ${H}`))}}catch(N){console.error("Error initializing username:",N)}})()},[]);const I=b=>{a(b),localStorage.setItem("save-album-columns",b),E(`Column setting changed to ${b} for all albums`)};r.useEffect(()=>{const b=localStorage.getItem(he.MULTI_ALBUM_DATA);if(b)try{const B=JSON.parse(b).filter(ie=>{if(!ie||!ie.name||!Array.isArray(ie.selectedPhotos))return!1;const ue=ie.selectedPhotos.filter(V=>V&&V.fileName&&V.originalFileName&&V.s3PreviewUrl&&V.s3PreviewUrl.includes("amazonaws.com"));return ie.selectedPhotos=ue,ue.length>0});if(B.length===0){alert(t("No valid albums were found. Please try selecting your files again.")),De("my-albums.html");return}const H=B.map(ie=>({id:wt(),name:ie.name,description:"",photos:ie.selectedPhotos,selectedPhotoIndices:new Set,photoTagsMap:new Map,isOnPublicProfile:!1,participantsCanAddItems:!0,participantsCanDeleteItems:!1,passwordProtectionOption:"NoPassword",albumPassword:"",isSaving:!1,savingProgress:0,folderId:""}));u(H),Le()}catch(N){console.error("Error parsing multi-album data:",N),alert(t("There was an error loading your albums. Please try selecting your files again.")),De("my-albums.html")}else alert(t("No album data was found. Please try selecting your files again.")),De("my-albums.html")},[t]),r.useEffect(()=>{const b=localStorage.getItem("save-album-columns")||"2";a(b)},[]);const A=(b,N)=>{E(`Album ${b} progress: ${N}`)},K=(b,N)=>{u(B=>B.map(H=>H.id===b?{...H,savingProgress:N}:H))},U=async(b,N,B)=>{E(`Starting chunked save for album ${b}`),A(b,t("Processing files in chunks..."));const H=48;if(B.length===0)E(`No file references for album ${b}, saving only folder position`),await Ee.saveFolderOnly(N,E);else{const ie=Ut(B);E(`Album ${b}: Processing ${ie.length} unique file references`);const ue=Gt(ie,H);E(`Album ${b}: Split into ${ue.length} chunks`);for(let V=0;V<ue.length;V++){const ke=ue[V];E(`Album ${b}: Processing chunk ${V+1} of ${ue.length}`);const Te=V/ue.length*80;K(b,10+Te),V<ue.length-1?(A(b,t("Saving files: chunk {{chunkNumber}} of {{totalChunks}}...",{chunkNumber:V+1,totalChunks:ue.length})),await Ee.saveFileReferences(ke,E)):(A(b,t("Finalizing album...")),await Ee.saveFinalChunkWithFolder(ke,N,E))}}K(b,100),A(b,t("Album saved successfully!"))},G=async b=>{const N=n.find(B=>B.id===b);if(!N)return E(`Album ${b} not found`),!1;if(N.photos.length===0)return alert(t('The album "{{albumName}}" has no photos to save.',{albumName:N.name})),!1;if(!l)return E(`No Cognito username available for album ${b}`),!1;E(`Starting real save for album: ${N.name}`),u(B=>B.map(H=>H.id===b?{...H,isSaving:!0,savingProgress:5}:H));try{const B=Math.floor(Date.now()/1e3),H=`${l}_____${wt()}____Folder`,ie=`${l}_____${l}____Account`,V=H.split("_____")[1].split("____")[0];E(`Album ${b} folder ID: ${H}`),u(w=>w.map(T=>T.id===b?{...T,folderId:H}:T));const ke=Wt(B,ie,V,H,l,N.isOnPublicProfile,N.participantsCanAddItems,N.participantsCanDeleteItems,N.passwordProtectionOption,N.albumPassword,N.name,N.description,!1,[],E),Te=N.photos.filter(w=>w.status==="complete");E(`Album ${b}: ${Te.length} valid photos`);let h=[];if(Te.length>0){const w=Te.filter(T=>!T.fileId);w.length>0&&(E(`Album ${b}: Moving ${w.length} files to public folder`),A(b,t("Moving files...")),await Ct(w,T=>K(b,T),E)),E(`Album ${b}: Creating file reference inputs`),h=Kt(Te,B,ie,H,l,N.photoTagsMap,E)}return await U(b,ke,h),u(w=>w.map(T=>T.id===b?{...T,isSaving:!1,savingProgress:100}:T)),E(`Successfully saved album: ${N.name}`),!0}catch(B){return console.error(`Error saving album ${b}:`,B),E(`Error saving album ${b}: ${B}`),u(H=>H.map(ie=>ie.id===b?{...ie,isSaving:!1,savingProgress:0}:ie)),alert(t('Failed to save album "{{albumName}}". Please try again.',{albumName:N.name})),!1}},M=async()=>{if(J!=null&&J.startsWith("Profile-")){k(""),ee(!0);return}if(!l){alert(t("Unable to determine user credentials. Please refresh and try again."));return}const b=n.filter(B=>B.savingProgress<100);if(b.length===0)return;E(`Starting save process for ${b.length} albums`),z(!0),y(b.length),Q(0);const N=[];try{for(let B=0;B<b.length;B++){const H=b[B];Q(B+1),se(H.name),E(`Saving album ${B+1} of ${b.length}: ${H.name}`),await G(H.id)||N.push(H.name),await new Promise(ue=>setTimeout(ue,200))}if(N.length===0)E("All albums saved successfully, cleaning up and redirecting"),setTimeout(()=>{localStorage.removeItem(he.MULTI_ALBUM_DATA),Le(),sessionStorage.setItem("album_just_saved","true"),De("my-albums.html")},1e3);else{const B=N.length===1?t('Failed to save album "{{albumName}}". Please try again.',{albumName:N[0]}):t("Failed to save {{count}} albums: {{albumNames}}. Please try again.",{count:N.length,albumNames:N.join(", ")});alert(B)}}catch(B){console.error("Error in save all albums:",B),alert(t("There was an error saving albums. Please try again."))}finally{z(!1),Q(0),y(0),se("")}},le=b=>{localStorage.setItem(he.PUBLIC_USERNAME,b),ne(b),ee(!1),z(!1),Q(0),y(0),se(""),M()},ce=b=>{const N=n.find(B=>B.id===b);N&&(p(b),Z(B=>({...B,passwordProtectionOption:N.passwordProtectionOption,albumPassword:N.albumPassword})),x(!0))},fe=()=>{p(null),x(!0)},we=(b,N)=>{b!==void 0&&N!==void 0&&(f?u(B=>B.map(H=>H.id===f?{...H,passwordProtectionOption:b,albumPassword:N}:H)):Z(B=>({...B,passwordProtectionOption:b,albumPassword:N}))),x(!1),p(null)},ye=()=>{u(b=>b.map(N=>({...N,isOnPublicProfile:W.isOnPublicProfile,participantsCanAddItems:W.participantsCanAddItems,participantsCanDeleteItems:W.participantsCanDeleteItems,passwordProtectionOption:W.passwordProtectionOption,albumPassword:W.albumPassword}))),c(!1),E("Applied global settings to all albums",W)},Pe=b=>{const N=n.find(H=>H.id===b);if(N&&!confirm(t('Are you sure you want to remove the album "{{albumName}}"?',{albumName:N.name})))return;const B=n.filter(H=>H.id!==b);u(B),B.length===0&&(localStorage.removeItem(he.MULTI_ALBUM_DATA),Le(),De("my-albums.html"))},de=n.some(b=>b.isSaving)||O,Ie=n.some(b=>b.savingProgress<100);return e.jsxs(e.Fragment,{children:[e.jsx(Et,{}),e.jsx("style",{children:`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}),e.jsx(Ft,{children:e.jsxs(Nt,{style:{display:"flex",justifyContent:"space-between",alignItems:"center",flexDirection:s?"row-reverse":"row"},children:[e.jsx("div",{style:{order:s?2:1,textAlign:s?"right":"left"},children:e.jsx(_t,{onClick:()=>De(Rt("my-albums.html")),children:t("← Back To Albums")})}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",order:s?1:2,flexDirection:s?"row-reverse":"row"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx(gi,{children:t("Columns:")}),e.jsxs(hi,{value:g,onChange:b=>I(b.target.value),disabled:de,children:[e.jsx("option",{value:"1",children:"1"}),e.jsx("option",{value:"2",children:"2"}),e.jsx("option",{value:"3",children:"3"}),e.jsx("option",{value:"4",children:"4"}),e.jsx("option",{value:"5",children:"5"})]})]}),e.jsxs("div",{style:{position:"relative"},children:[e.jsx(ds,{onClick:()=>c(!o),disabled:de,title:t("Global Settings for All Albums")}),e.jsx(vr,{showGlobalGear:o,globalSettings:W,setGlobalSettings:Z,onPasswordClick:fe,onApplySettings:ye})]}),Ie&&e.jsx(Ke,{$primary:!0,onClick:M,disabled:de,style:{minWidth:"160px",fontSize:"14px",padding:"8px 16px"},children:O?t("Saving {{current}} of {{total}}...",{current:j,total:re}):n.length===1?t("Save 1 Album"):t("Save {{count}} Albums",{count:n.filter(b=>b.savingProgress<100).length})})]})]})}),e.jsxs(zt,{$isRTL:s,children:[O&&e.jsxs("div",{style:{marginBottom:"24px",padding:"20px",backgroundColor:"#e3f2fd",border:"2px solid #2196f3",borderRadius:"12px",boxShadow:"0 4px 12px rgba(33, 150, 243, 0.1)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"16px",marginBottom:"16px"},children:[e.jsx("div",{style:{width:"24px",height:"24px",border:"3px solid #e3f2fd",borderTop:"3px solid #2196f3",borderRadius:"50%",animation:"spin 1s linear infinite"}}),e.jsxs("div",{children:[e.jsxs("div",{style:{fontSize:"16px",fontWeight:"600",color:"#1565c0",marginBottom:"4px"},children:[t("Saving Albums")," (",j," / ",re,")"]}),e.jsx("div",{style:{fontSize:"14px",color:"#1976d2"},children:t("Currently saving: {{albumName}}",{albumName:L})})]})]}),e.jsx("div",{style:{width:"100%",height:"8px",backgroundColor:"#bbdefb",borderRadius:"4px",overflow:"hidden"},children:e.jsx("div",{style:{width:`${j/re*100}%`,height:"100%",backgroundColor:"#2196f3",transition:"width 0.3s ease",borderRadius:"4px"}})}),e.jsx("div",{style:{marginTop:"8px",fontSize:"12px",color:"#1976d2",textAlign:"center"},children:t("Please wait while your albums are being saved...")})]}),e.jsx(fi,{albums:n,setAlbums:u,isSavingAny:de,onSaveAlbum:G,onRemoveAlbum:Pe,onShowPasswordDialog:ce,columns:g,setColumns:I,enhancedLog:E})]}),e.jsx(us,{isOpen:d,onClose:we,initialOption:f?((Ne=n.find(b=>b.id===f))==null?void 0:Ne.passwordProtectionOption)||"NoPassword":W.passwordProtectionOption,initialPassword:f?((Ae=n.find(b=>b.id===f))==null?void 0:Ae.albumPassword)||"":W.albumPassword}),e.jsx(Mt,{t,language:i,usernameManager:oe,onSuccess:le})]})},xi=()=>{const[t,i]=r.useState(!1),[s,n]=r.useState(!1);return r.useEffect(()=>{if(typeof window<"u"){const g=new URLSearchParams(window.location.search).get("mode");i(g==="multiple"),n(!0)}},[]),s?t?e.jsx(mi,{}):e.jsx(Pt,{}):e.jsx(Pt,{})},bi=()=>e.jsx(Ks,{children:e.jsx(xi,{})});if(typeof document<"u"){const t=document.getElementById("root");t&&Ws.createRoot(t).render(e.jsx(bi,{}))}
