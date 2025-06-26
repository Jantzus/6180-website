import{m as be,k as Re,r as i,l as he,n as ht,s as _s,o as Rs,p as zs,q as Os,a as Ee,v as jt,t as m,d as $,w as $e,u as ge,j as e,P as Ms,M as Bs,x as Ct,g as Ne,B as Ke,G as Dt,F as Et,y as Ft,z as Nt,b as _t,D as Rt,E as Us,R as Gs,I as Ws}from"./layout-CDsPc4Yx.js";import{F as Ks}from"./types-CyPfckSQ.js";import{u as Hs,U as qs}from"./UploadProgress-DI9k79zO.js";import{M as Js,V as Qs,a as Vs,u as zt,U as Ot}from"./UsernamePrompt-Da58F7yb.js";import{L as Ys}from"./LazyImage-Ik6jAQSh.js";import{F as mt,a as xt,b as Xs,c as Zs}from"./forms-BkfdZfzd.js";import{g as bt,c as Le}from"./folderStructureUtils-BmdkosLC.js";const Ls=`
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
`,er=`
  mutation MyMutation($folderPositionInputs: [FolderPositionInput!]) {
    changeFiles(folderPositionInputs: $folderPositionInputs) {
      items {
        id
      }
    }
  }
`,tr=`
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
`,sr=`
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
`,rr=`
  mutation DeleteFileReferences($deletedFileReferenceIds: [ID!]!) {
    changeFiles(deletedFileReferenceIds: $deletedFileReferenceIds) {
      items {
        id
      }
    }
  }
`;class Fe{static async fetchFolderDetails(r,s){var n,u,h,a,o,c;s(`Fetching details for folder ID: ${r}`);try{const d=await be();if(!d)return s("No token available for fetching folder details"),null;s("Sending GraphQL query to fetch folder details");const g=await(await fetch(Re,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${d}`},body:JSON.stringify({query:Ls,variables:{folderIds:[r],fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(s("Folder details API response:",g),g.errors)return console.error("GraphQL errors:",g.errors),s(`GraphQL errors: ${JSON.stringify(g.errors)}`),null;const p=((u=(n=g==null?void 0:g.data)==null?void 0:n.fetchFolders)==null?void 0:u.items)||[];if(s(`Found ${p.length} folder items`),p.length===0)return s("No folder items found"),null;const l=p[0];s("Retrieved folder data:",l);const T=l.folderPosition,O=T==null?void 0:T.profileIds,R=Array.isArray(O)&&O.some(se=>se.includes("Public____Profile"))||!1;s(`Folder is on public profile: ${R}`),s("Profile IDs:",O);const k=(h=l.folderInviteParameters)==null?void 0:h.usingFolderInviteGrantsRightToAddItems;s(`Participants can add items: ${k}`);const Q=(a=l.folderInviteParameters)==null?void 0:a.usingFolderInviteGrantsRightToRemoveItems;return s(`Participants can delete items: ${Q}`),{creatorId:l.creatorId||"",folderName:l.folderName||"",folderDescription:l.folderDescription||"",passwordPolicy:((o=l.folderPassword)==null?void 0:o.policy)||"NoPassword",password:((c=l.folderPassword)==null?void 0:c.password)||"",isOnPublicProfile:R,participantsCanAddItems:k!==void 0?k:!0,participantsCanDeleteItems:Q!==void 0?Q:!1}}catch(d){return console.error("Error in fetchFolderDetails:",d),s(`Error in fetchFolderDetails: ${d}`),null}}static async saveFolderOnly(r,s){var h,a;s("Sending folder-only mutation (no file references, no folder tags)");const n=await be();if(!n)throw s("No token available for saving album, aborting"),new Error("Authentication token not available");const u={folderPositionInputs:[r]};s("GraphQL folder-only mutation variables:",u);try{s("Sending API request to save folder");const o=await fetch(Re,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({query:er,variables:u})});s(`API response status: ${o.status}`);const c=await o.text();s(`API response raw text: ${c}`);const d=JSON.parse(c);if(s("API response JSON:",d),d.errors)throw console.error("Folder save failed:",d.errors),s("Folder save failed with errors:",d.errors),new Error("Failed to save folder");return s("Folder saved successfully"),((a=(h=d.data)==null?void 0:h.changeFiles)==null?void 0:a.items)||[]}catch(o){throw console.error("Error in saveFolderOnly:",o),s(`Error in saveFolderOnly: ${o}`),o}}static async saveFileReferences(r,s){var h,a,o,c,d;s(`Sending file references-only mutation with ${r.length} items (each with individual tags and filenames)`);const n=await be();if(!n)throw s("No token available for saving file references, aborting"),new Error("Authentication token not available");const u={updatedFileReferenceInputs:r};s("GraphQL file references-only mutation variables (first item):",r.length>0?r[0]:"No items");try{s("Sending API request to save file references with individual tags and filenames");const x=await fetch(Re,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({query:tr,variables:u})});s(`API response status: ${x.status}`);const g=await x.text();s(`API response raw text: ${g.substring(0,500)}...`);const p=JSON.parse(g);if(s("API response JSON items count:",((o=(a=(h=p.data)==null?void 0:h.changeFiles0)==null?void 0:a.items)==null?void 0:o.length)||0),p.errors)throw console.error("File references save failed:",p.errors),s("File references save failed with errors:",p.errors),new Error("Failed to save file references");return s("File references chunk saved successfully with individual photo tags and filenames"),((d=(c=p.data)==null?void 0:c.changeFiles0)==null?void 0:d.items)||[]}catch(x){throw console.error("Error in saveFileReferences:",x),s(`Error in saveFileReferences: ${x}`),x}}static async saveFinalChunkWithFolder(r,s,n){var a,o,c,d,x,g,p,l,T;n(`Sending final chunk with folder mutation (${r.length} file references with filenames, no folder tags)`);const u=await be();if(!u)throw n("No token available for saving final chunk, aborting"),new Error("Authentication token not available");const h={folderPositionInputs:[s],updatedFileReferenceInputs:r};n("GraphQL final mutation variables (folder + last chunk with filenames, no folder tags)");try{n("Sending API request for final save with folder (no folder tags, with filenames)");const O=await fetch(Re,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${u}`},body:JSON.stringify({query:sr,variables:h})});n(`API response status: ${O.status}`);const R=await O.text();n(`API response raw text: ${R.substring(0,500)}...`);const k=JSON.parse(R);if(n("API response JSON:",{fileReferencesCount:((c=(o=(a=k.data)==null?void 0:a.changeFiles0)==null?void 0:o.items)==null?void 0:c.length)||0,folderItems:((x=(d=k.data)==null?void 0:d.changeFiles)==null?void 0:x.items)||[]}),k.errors)throw console.error("Final save failed:",k.errors),n("Final save failed with errors:",k.errors),new Error("Failed to complete album save");return n("Final chunk and folder saved successfully (with individual photo tags and filenames)"),{fileReferences:((p=(g=k.data)==null?void 0:g.changeFiles0)==null?void 0:p.items)||[],folderPositions:((T=(l=k.data)==null?void 0:l.changeFiles)==null?void 0:T.items)||[]}}catch(O){throw console.error("Error in saveFinalChunkWithFolder:",O),n(`Error in saveFinalChunkWithFolder: ${O}`),O}}static async deleteFileReferences(r,s){var h,a;s(`Deleting ${r.length} file references: ${r.join(", ")}`);const n=await be();if(!n)throw s("No token available for deleting file references, aborting"),new Error("Authentication token not available");const u={deletedFileReferenceIds:r};s("GraphQL delete file references mutation variables:",u);try{s("Sending API request to delete file references");const o=await fetch(Re,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({query:rr,variables:u})});s(`API response status: ${o.status}`);const c=await o.text();s(`API response raw text: ${c}`);const d=JSON.parse(c);if(s("API response JSON:",d),d.errors)throw console.error("File references deletion failed:",d.errors),s("File references deletion failed with errors:",d.errors),new Error("Failed to delete file references");return s(`Successfully deleted ${r.length} file references`),((a=(h=d.data)==null?void 0:h.changeFiles)==null?void 0:a.items)||[]}catch(o){throw console.error("Error in deleteFileReferences:",o),s(`Error in deleteFileReferences: ${o}`),o}}}const ir=(t,r,s,n,u,h,a,o,c,d,x,g,p,l)=>{const[T,O]=i.useState(null),[R,k]=i.useState(null),[Q,se]=i.useState(!1),[w,L]=i.useState(!1),[re,W]=i.useState(!1),X=i.useRef(!1),oe=i.useRef(!1),te=i.useRef(!1);i.useEffect(()=>{L(!0)},[]);const j=i.useCallback(A=>{if(!w)return null;try{return localStorage.getItem(A)}catch{return null}},[w]),J=i.useCallback(async()=>{if(!(X.current||!w)){X.current=!0,l("Starting component initialization");try{l("Checking login with refresh");const A=await be();if(!A){l("No token returned from login check, aborting initialization");return}try{const K=j(he.PUBLIC_USERNAME);l(`Retrieved public username from localStorage: ${K||"null"}`),k(K||null);const G=JSON.parse(atob(A.split(".")[1]))["cognito:username"];G?(l(`Extracted Cognito username from token: ${G}`),O(G)):l("No Cognito username found in token")}catch(K){console.error("User data initialization error:",K),l(`User data initialization error: ${K}`)}l("Component initialization completed")}catch(A){console.error("Initialization error:",A),l(`Initialization error: ${A}`)}finally{se(!0)}}},[w,l,j]),ne=i.useCallback(async A=>{var K;if(!(oe.current||!w)){oe.current=!0,l(`Initializing folder ID with username: ${A}`);try{const G=new URLSearchParams(window.location.search).get("folderId");if(l(`Folder ID from URL: ${G||"null"}`),G){t(G),W(!0),l(`Using existing folder ID: ${G}`),s(!0),n(!0);try{l(`Fetching details for existing folder: ${G}`);const M=await Fe.fetchFolderDetails(G,l);if(M){u(M.folderName),h(M.folderDescription),a(M.isOnPublicProfile),M.participantsCanAddItems!==void 0&&o(M.participantsCanAddItems),M.participantsCanDeleteItems!==void 0&&p(M.participantsCanDeleteItems);const le=M.passwordPolicy;c(le),le!=="NoPassword"&&M.password&&d(M.password)}}catch(M){console.error("Error fetching folder details:",M),l(`Error fetching folder details: ${M}`)}}else{W(!1);const M=j(he.SUB_ALBUM_DATA);if(M)try{const ce=JSON.parse(M);if(ce.isSubAlbum&&((K=ce.selectedFileIds)==null?void 0:K.length)>0){l(`Valid sub-album data found with ${ce.selectedFileIds.length} files`),x(!0),g(ce.selectedFileIds),ce.selectedPhotos&&ce.selectedPhotos.length>0&&r(ce.selectedPhotos),n(!0),s(!0);const fe=`${A}_____${ht()}____Folder`;t(fe),l(`Created new folder ID for sub-album: ${fe}`);return}}catch(ce){console.error("Error parsing sub-album data:",ce),l(`Error parsing sub-album data: ${ce}`)}const le=`${A}_____${ht()}____Folder`;l(`Creating new folder ID: ${le}`),t(le),s(!0),n(!0)}}catch(U){console.error("Folder ID initialization error:",U),l(`Folder ID initialization error: ${U}`),s(!1)}}},[w,l,j,t,s,n,u,h,a,o,p,c,d,x,g,r,W]),F=i.useCallback(()=>{if(!(!w||te.current)){te.current=!0,l("Attempting to restore photos from localStorage");try{const A=j(he.SELECTED_PHOTOS);if(A)try{const K=JSON.parse(A);l(`Parsed ${K.length} photos from localStorage`),Array.isArray(K)&&K.length>0&&(r(K),l(`Restored ${K.length} photos to state`))}catch(K){console.error("Error parsing stored photos:",K),l(`Error parsing stored photos: ${K}`)}}catch(A){console.error("Error restoring photos from storage:",A),l(`Error restoring photos from storage: ${A}`)}}},[w,l,j,r]),P=i.useCallback(()=>{l("Testing S3 connection");try{l(_s?"S3 client is available":"S3 client not available")}catch(A){console.error("S3 connection test error:",A),l(`S3 connection test error: ${A}`)}},[l]);return i.useEffect(()=>{w&&J()},[w,J]),i.useEffect(()=>{T&&!oe.current&&ne(T)},[T,ne]),i.useEffect(()=>{w&&(F(),P())},[w,F,P]),{cognitoUsername:T,publicUsername:R,setPublicUsername:k,isInitialized:Q,isExistingAlbum:re}},Mt=t=>t.map(r=>({TagType:r.TagType,tagTitle:r.tagTitle,subtags:r.subtags.map(s=>({TagType:r.TagType,tagTitle:s.tagTitle,subtagTitle:s.subtagTitle}))})),Bt=t=>{const r=new Set;return t.filter(s=>r.has(s.fileId)?!1:(r.add(s.fileId),!0))},Ut=(t,r)=>{const s=[];for(let n=0;n<t.length;n+=r)s.push(t.slice(n,n+r));return s},Gt=(t,r,s,n,u,h,a,o,c,d,x,g,p,l,T)=>{T("Creating folder position input WITHOUT folder-level tags"),T(`Profile visibility: ${h?"Public":"Only Me"}`);const O=h?[`${u}_____Public____Profile`]:["Only Me_____Only Me____Profile"];T(`Profile IDs: ${JSON.stringify(O)}`);let R=[];p&&l.length>0&&(T(`Creating file reference IDs for ${l.length} sub-album files`),R=l.map(w=>{const L=w.split("_____");if(L.length>=2){const W=L[1].split("____")[0],X=`${s}_____${W}____FileReference`;return T(`Created file reference ID for sub-album: ${X}`),X}return T(`Using original fileId as fallback: ${w}`),w})),T(`Created ${R.length} acceptedFileReferenceIds`);const k=c!=="NoPassword"?d:null;if(T(`Password protection: ${c}`),T(`Album password: ${k?"******":"null"}`),T(`Participants can add items: ${a}`),T(`Participants can delete items: ${o}`),!n)throw T("Error: folderId is null or undefined"),new Error("folderId is required to create folder position input");const Q=Rs(n),se=zs(Q);return{currentTime:t,folderId:n,profileIds:O,folderPositionPoints:1,acceptedFileReferenceIds:R,folderInput:{folderAboutContactIds:[r],albumNanoId:se,folderName:x,folderDescription:g,folderPasswordInput:{password:k,policy:c},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:a,usingFolderInviteGrantsRightToRemoveItems:o,addedItemsNeedFolderCreatorApproval:!1}}}},Wt=(t,r,s,n,u,h,a)=>(a(`Creating file reference inputs with individual photo tags and original filenames for ${t.length} photos`),t.map((o,c)=>{var O;const d=h.get(c)||[],x=Mt(d),g=o.originalFileName||o.fileName;if(a(`Photo ${c} (${o.fileName}): ${d.length} tags applied, display name: ${g}`),o.fileId)return a(`Using existing fileId for photo: ${o.fileId}`),{fileReferencesHolderId:n,currentTime:r,points:1,hasBeenDeleted:!1,selectedTagInputs:x,fileId:o.fileId,fileDisplayName:g,fileInput:null};const p=o.type==="video"||(O=o.type)!=null&&O.startsWith("video")?`Input/Video/${o.fileName}`:`Input/Image/${o.fileName}`,l=`${u}_____${o.fileName}____File`;a(`Created file reference for ${o.fileName}:`),a(`  - dataKey: ${p}`),a(`  - fileId: ${l}`),a(`  - fileDisplayName: ${g}`),a(`  - thumbnailDataKey: ${o.thumbnailDataKey||"undefined"}`),a(`  - size: ${o.size}`),a(`  - thumbnailSize: ${o.thumbnailSize||0}`),a(`  - duration: ${o.duration||"undefined"}`),a(`  - tags: ${d.length} tags selected for this photo`);const T={fileId:l,ownerFileInput:{editorContactIds:[s],FileSharingOptionsEnum:"Anyone",dataKey:p,thumbnailDataKey:o.thumbnailDataKey,dataInBytes:o.size,thumbnailDataInBytes:o.thumbnailSize||0,s3UploadedAt:r,durationInSeconds:o.duration},editorFileInput:{aboutContactIds:[s],captionText:"",numericFilterInputs:[]}};return{fileReferencesHolderId:n,currentTime:r,points:1,hasBeenDeleted:!1,selectedTagInputs:x,fileId:l,fileDisplayName:g,fileInput:T}})),ar=(t,r,s,n,u,h,a)=>{const o=[];return u.forEach(c=>{const d=h.get(c)||[];if(d.length>0){const x=n[c];if(x){const g=x.dataKey.split("/"),p=g[g.length-1],l=`${s}_____${p}____File`,T=x.fileName||p,O=Mt(d);a(`Creating file reference for existing file ${c} (${p}) with ${d.length} tags, display name: ${T}`),o.push({fileReferencesHolderId:r,currentTime:t,points:1,hasBeenDeleted:!1,selectedTagInputs:O,fileId:l,fileDisplayName:T,fileInput:null})}}}),a(`Created ${o.length} file references for existing files with tags and filenames`),o},or=(t,r,s,n,u,h,a,o,c,d,x,g,p,l,T,O,R,k,Q,se,w,L)=>{const[re,W]=i.useState(!1),X=i.useRef(!1);i.useEffect(()=>{W(!0)},[]);const oe=i.useCallback(()=>(w("Validating required data"),r?t?(w("All required data validated successfully"),!0):(w("No folder ID, validation failed"),!1):(w("No Cognito username, validation failed"),!1)),[r,t,w]),te=i.useCallback(P=>{if(w(`Save progress text: ${P}`),!!re)try{const A=document.getElementById("saveProgressText");A&&(A.innerText=P)}catch(A){w(`Failed to update progress text in DOM: ${A}`)}},[re,w]),j=i.useCallback(P=>{if(re)try{const A=document.getElementById("saveProgress");A&&(A.style.width=`${P}%`,w(`Updated save progress bar: ${P}%`))}catch(A){w(`Failed to update progress bar: ${A}`)}k(P)},[re,k,w]),J=i.useCallback(()=>{if(w("Handling successful save"),Os(Q,se,[he.SELECTED_PHOTOS,he.SUB_ALBUM_DATA],w),te(L("Album saved successfully!")),re)try{sessionStorage.setItem("album_just_saved","true"),w("Set 'album_just_saved' flag in sessionStorage")}catch(P){w(`Failed to set sessionStorage flag: ${P}`)}w("Setting timeout for redirect to my-albums.html"),setTimeout(()=>{w("Redirecting to my-albums.html"),Ee("my-albums.html")},1e3)},[w,Q,se,te,L,re]),ne=i.useCallback(async(P,A)=>{w("Starting chunked save process");try{te(L("Processing files in chunks..."));const K=48;if(A.length===0)w("No file references to process, saving only folder position"),await Fe.saveFolderOnly(P,w);else{const U=Bt(A);w(`Processing ${U.length} unique file references`);const G=Ut(U,K);w(`Split file references into ${G.length} chunks`);for(let M=0;M<G.length;M++){const le=G[M];w(`Processing chunk ${M+1} of ${G.length}`);const ce=M/G.length*80;j(10+ce),M<G.length-1?(te(L("Saving files: chunk {{chunkNumber}} of {{totalChunks}}...",{chunkNumber:M+1,totalChunks:G.length})),await Fe.saveFileReferences(le,w)):(te(L("Finalizing album...")),await Fe.saveFinalChunkWithFolder(le,P,w))}}j(100),te(L("Album saved successfully!")),J()}catch(K){console.error("Error in chunked save process:",K),w(`Error in chunked save process: ${K}`),te(L("Error: {{error}}",{error:String(K)})),R(!1),X.current=!1}},[w,te,L,j,J,R]);return{saveAlbumDirectly:i.useCallback(async()=>{if(X.current){w("Save already in progress, skipping duplicate call");return}X.current=!0,w("Starting direct album save"),R(!0),k(5);try{if(!oe()){w("Required data validation failed, aborting save");return}const P=Math.floor(Date.now()/1e3),A=`${r}_____${r}____Account`,U=t.split("_____")[1].split("____")[0];w(`Save timestamp: ${P}`),w(`Account ID: ${A}`),w(`Folder ID: ${t}`);const G=Gt(P,A,U,t,r,o,c,d,x,g,h,a,n,u,w);let M=[];const le=s.filter(fe=>fe.status==="complete");if(w(`Found ${le.length} valid photos`),le.length>0){const fe=le.filter(ye=>!ye.fileId);fe.length>0&&(w("Moving files from temp to public folder"),await jt(fe,j,w));const we=Wt(le,P,A,t,r,p,w);M=M.concat(we)}const ce=ar(P,t,r,T,O,l,w);if(ce.length>0&&(M=M.concat(ce)),n&&u.length>0){const fe=u.map(we=>{const ye=we.split("_____"),Pe=ye.length>=2?ye[1].split("____")[0]:we;return{fileReferencesHolderId:t,currentTime:P,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:we,fileDisplayName:Pe,fileInput:null}});M=M.concat(fe)}w(`Total file reference inputs: ${M.length}`),await ne(G,M)}catch(P){console.error("Error in saveAlbumDirectly:",P),w(`Error in saveAlbumDirectly: ${P}`),R(!1)}finally{X.current=!1}},[oe,r,t,o,c,d,x,g,h,a,n,u,s,p,T,O,l,w,R,k,j,ne])}},nr=$.h3`
  font-size: ${m.fontSizes.lg};
  margin: 0 0 ${m.spacing.sm} 0;
`,Kt=$.div`
  height: ${t=>t.$height||"8px"};
  background-color: ${m.colors.grayLight};
  border-radius: ${m.borderRadius.small};
  overflow: hidden;
  ${t=>t.$bottom&&`bottom: ${t.$bottom};`}
  ${t=>t.$left&&`left: ${t.$left};`}
  ${t=>t.$right&&`right: ${t.$right};`}
  ${t=>t.$bottom&&t.$left&&t.$right&&"position: absolute;"}
`,Ht=$.div`
  height: 100%;
  background-color: ${t=>t.$status==="processing"?m.colors.warning:t.$status==="error"?m.colors.danger:t.$status==="complete"?m.colors.success:m.colors.info};
  border-radius: ${m.borderRadius.small};
  transition: width 0.3s ease;
  width: ${t=>(t.$progress||0)*100}%;
`,lr=$.div`
  font-size: ${m.fontSizes.sm};
  margin-bottom: ${m.spacing.sm};
`,cr=$.div`
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
`,dr=$.div`
  margin: 32px 0;
`,qt=$.div`
  margin-bottom: 24px;
`,Jt=$.h3`
  margin: 0 0 16px 0;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  display: flex;
  align-items: center;
  gap: 12px;
`,Qt=$.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  min-height: 32px;
`,Vt=$.button`
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
`,ur=$(Vt)`
  font-size: 12px;
  padding: 6px 12px;
  border-radius: 16px;
`,Yt=$.button`
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
`,pr=$.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 16px;
`,Xt=$.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 16px;
`,Zt=$.button`
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
`,fr=$.div`
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
`,gr=$.input`
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
`,wt=$.button`
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
`,Lt=()=>{const[t,r]=i.useState(!1);return i.useEffect(()=>{const s=()=>{const u=navigator,h=!!("ontouchstart"in window||navigator.maxTouchPoints&&navigator.maxTouchPoints>0||u.msMaxTouchPoints&&u.msMaxTouchPoints>0);r(h)};s();const n=()=>{s()};return window.addEventListener("resize",n),()=>{window.removeEventListener("resize",n)}},[]),t},es=$e.memo(({tag:t,isApplied:r,isDisplayed:s,isBeingDeleted:n,disabled:u,onTagClick:h,onDeleteTag:a,displayText:o})=>{const{t:c}=ge(),[d,x]=i.useState(!1),g=Lt(),p=i.useCallback(()=>{h(t)},[h,t]),l=i.useCallback(O=>{O.stopPropagation(),a(t.id)},[a,t.id]),T=g?s&&!u&&!n:d&&s&&!u&&!n;return e.jsxs(Vt,{$isApplied:r,$isDisplayed:s,$isBeingDeleted:n,disabled:u,onClick:p,onMouseEnter:()=>!g&&s&&x(!0),onMouseLeave:()=>!g&&s&&x(!1),children:[e.jsx("span",{style:{paddingRight:T?"20px":"0"},children:o}),T&&e.jsx(Yt,{$isMobile:g,onClick:l,disabled:n,title:c("Delete tag"),children:"×"})]})});es.displayName="TagWithDelete";const ts=$e.memo(({subtag:t,isApplied:r,isBeingDeleted:s,disabled:n,onSubtagClick:u,onDeleteSubtag:h})=>{const{t:a}=ge(),[o,c]=i.useState(!1),d=Lt(),x=i.useCallback(()=>{u(t)},[u,t]),g=i.useCallback(l=>{l.stopPropagation(),h(t.id)},[h,t.id]),p=d?r&&!n&&!s:o&&r&&!n&&!s;return e.jsxs(ur,{$isApplied:r,$isBeingDeleted:s,disabled:n,onClick:x,onMouseEnter:()=>!d&&r&&c(!0),onMouseLeave:()=>!d&&r&&c(!1),children:[e.jsx("span",{style:{paddingRight:p?"20px":"0"},children:t.subtagTitle}),p&&e.jsx(Yt,{$isMobile:d,onClick:g,disabled:s,title:a("Delete subtag"),children:"×"})]})});ts.displayName="SubtagWithDelete";const ot=$e.memo(({value:t,onChange:r,onSubmit:s,onCancel:n,isSubmitting:u,placeholder:h="Enter tag name..."})=>{const{t:a}=ge(),o=i.useRef(null);i.useEffect(()=>{o.current&&o.current.focus()},[]);const c=i.useCallback(x=>{x.key==="Enter"?s():x.key==="Escape"&&n()},[s,n]),d=i.useCallback(x=>{r(x.target.value)},[r]);return e.jsxs(fr,{children:[e.jsx(gr,{ref:o,type:"text",value:t,onChange:d,onKeyDown:c,placeholder:a(h),disabled:u}),e.jsx(wt,{onClick:s,disabled:!t.trim()||u,title:a("Add (Enter)"),children:u?"...":"✓"}),e.jsx(wt,{onClick:n,disabled:u,title:a("Cancel (Escape)"),children:"×"})]})});ot.displayName="NewTagInput";const nt=$e.memo(({tagsManager:t,disabled:r=!1,enhancedLog:s})=>{const{t:n}=ge(),{tags:u,displayedTagId:h,isLoadingTags:a,tagIdBeingDeleted:o,isAddingNewTag:c,newTagTitle:d,isSubmittingNewTag:x,toggleTagOnSelectedFiles:g,setDisplayedTag:p,isTagAppliedToSelected:l,deleteTag:T,startAddingNewTag:O,cancelAddingNewTag:R,submitNewTag:k,setNewTagTitle:Q,getAppliedTagsForSelected:se,hasSelectedFiles:w}=t,L=i.useCallback(j=>{if(!l(j))return j.tagTitle;const F=se().find(A=>A.tagTitle===j.tagTitle);if(!F||F.subtags.length===0)return j.tagTitle;const P=F.subtags.map(A=>A.subtagTitle).join(" || ");return n("{{tagTitle}}  |  {{subtags}}",{tagTitle:j.tagTitle,subtags:P})},[l,se,n]),re=i.useMemo(()=>u.map(j=>({tag:j,isApplied:l(j),isDisplayed:h===j.id,isBeingDeleted:o===j.id,displayText:L(j)})),[u,l,h,o,L]),W=i.useCallback(j=>{if(r)return;const J=l(j);s(`Tag "${j.tagTitle}" clicked - current state: ${J?"applied to all":"not applied to all"}`),g(j),j.subtags&&j.subtags.length>0&&p(J?null:j.id),s(`After toggle - new state: ${J?"removed from all":"applied to all"}`)},[r,l,s,g,p]),X=i.useCallback(async j=>{if(r)return;s(`Delete tag initiated: ${j}`);const J=await T(j);s(J?`Tag successfully deleted: ${j}`:`Failed to delete tag: ${j}`)},[r,s,T]),oe=i.useCallback(async()=>{await k()||s("Failed to submit new tag")},[k,s]),te=i.useMemo(()=>[...re].sort((j,J)=>j.tag.points!==J.tag.points?J.tag.points-j.tag.points:J.tag.updatedAt-j.tag.updatedAt),[re]);return i.useEffect(()=>{const j=u.filter(ne=>l(ne)),J=se();s(`TagsDisplay render - ${j.length} tags applied to all selected files`),s("Applied tags with subtags:",J)},[u,se,l,s]),w()?e.jsxs(dr,{children:[e.jsxs(qt,{children:[e.jsx(Jt,{children:n("Apply tags to selected files")}),e.jsx(Qt,{children:a?e.jsx(pr,{children:n("Loading tags...")}):e.jsxs(e.Fragment,{children:[te.map(({tag:j,isApplied:J,isDisplayed:ne,isBeingDeleted:F,displayText:P})=>e.jsx(es,{tag:j,isApplied:J,isDisplayed:ne,isBeingDeleted:F,disabled:r,onTagClick:W,onDeleteTag:X,displayText:P},j.id)),c?e.jsx(ot,{value:d,onChange:Q,onSubmit:oe,onCancel:R,isSubmitting:x,placeholder:n("Enter tag name...")}):e.jsx(Zt,{disabled:r,onClick:O,children:n("+ Add Tag")}),te.length===0&&!c&&e.jsx(Xt,{children:n("No tags available")})]})})]}),h&&e.jsx(ss,{tagsManager:t,disabled:r,enhancedLog:s}),e.jsx("div",{style:{marginTop:"24px",padding:"20px 24px",background:"linear-gradient(135deg, #e7f3ff 0%, #f0f8ff 100%)",borderRadius:"12px",fontSize:"13px",color:"#0c5aa6",border:"1px solid #b3d9ff",boxShadow:"0 4px 12px rgba(0, 123, 255, 0.08)"},children:e.jsxs("div",{style:{lineHeight:"2.2"},children:[e.jsxs("div",{style:{marginBottom:"8px"},children:[e.jsx("strong",{style:{color:"#28a745"},children:"🟢"}),"  ",n("Most recently clicked tag (showing subtags)")]}),e.jsxs("div",{style:{marginBottom:"8px"},children:[e.jsx("strong",{style:{color:"#333333"},children:"⚫"}),"  ",n("Applied to selected files")]}),e.jsxs("div",{children:[e.jsx("strong",{style:{color:"#6c757d"},children:"⚪"}),"  ",n("Available but not applied to all selected files")]})]})})]}):null});nt.displayName="TagsDisplay";const ss=$e.memo(({tagsManager:t,disabled:r=!1,enhancedLog:s})=>{const{t:n}=ge(),{displayedTagId:u,subtagIdBeingDeleted:h,isAddingNewSubtag:a,newSubtagTitle:o,isSubmittingNewSubtag:c,toggleSubtagOnSelectedFiles:d,isSubtagAppliedToSelected:x,deleteSubtag:g,startAddingNewSubtag:p,cancelAddingNewSubtag:l,submitNewSubtag:T,setNewSubtagTitle:O,tags:R}=t,k=i.useCallback(W=>{r||(s(`Subtag "${W.subtagTitle}" clicked - current state: ${x(W)?"applied to all":"not applied to all"}`),d(W))},[r,s,x,d]),Q=i.useCallback(async W=>{if(r)return;s(`Delete subtag initiated: ${W}`);const X=await g(W);s(X?`Subtag successfully deleted: ${W}`:`Failed to delete subtag: ${W}`)},[r,s,g]),se=i.useCallback(async()=>{await T()||s("Failed to submit new subtag")},[T,s]),w=i.useMemo(()=>{const W=R.find(j=>j.id===u);if(!W)return null;const te=(W.subtags||[]).map(j=>({subtag:j,isApplied:x(j),isBeingDeleted:h===j.id})).sort((j,J)=>j.subtag.points!==J.subtag.points?J.subtag.points-j.subtag.points:J.subtag.updatedAt-j.subtag.updatedAt);return{displayedTag:W,subtagDisplayData:te}},[R,u,x,h]);if(!w)return null;const{displayedTag:L,subtagDisplayData:re}=w;return e.jsxs(qt,{children:[e.jsx(Jt,{children:n('Subtags for "{{tagTitle}}"',{tagTitle:L.tagTitle})}),e.jsxs(Qt,{children:[re.map(({subtag:W,isApplied:X,isBeingDeleted:oe})=>e.jsx(ts,{subtag:W,isApplied:X,isBeingDeleted:oe,disabled:r,onSubtagClick:k,onDeleteSubtag:Q},W.id)),a?e.jsx(ot,{value:o,onChange:O,onSubmit:se,onCancel:l,isSubmitting:c,placeholder:n("Enter subtag name...")}):e.jsx(Zt,{disabled:r,onClick:p,children:n("+ Add Subtag")}),re.length===0&&!a&&e.jsx(Xt,{children:n("No subtags available")})]})]})});ss.displayName="SubtagsDisplay";const rs=$e.memo(({photoTags:t,isSelected:r=!1,onToggleSelection:s,fileName:n,showFileName:u=!1})=>{const{t:h}=ge();i.useEffect(()=>{const d="photo-tagging-animations";if(typeof document<"u"&&!document.getElementById(d)){const x=document.createElement("style");x.id=d,x.textContent=`
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
      `,document.head.appendChild(x)}},[]);const a=i.useMemo(()=>t.length===0?"":t.map(d=>{if(d.subtags.length>0){const x=d.subtags.map(g=>g.subtagTitle).join(", ");return h("{{tagTitle}}: {{subtags}}",{tagTitle:d.tagTitle,subtags:x})}return d.tagTitle}).join(" • "),[t,h]),o=t.length>0;return u&&n||o||r?e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"4px"},children:[u&&n&&e.jsx("div",{style:{fontSize:"11px",fontWeight:"600",color:"#333",padding:"4px 8px",backgroundColor:r?"#e3f2fd":"#f8f9fa",borderRadius:"4px",border:`1px solid ${r?"#90caf9":"#e9ecef"}`,textAlign:"center",wordBreak:"break-word",lineHeight:"1.2",transition:"all 0.2s ease"},children:n}),e.jsx("div",{style:{background:o?"linear-gradient(135deg, rgba(0, 123, 255, 0.95) 0%, rgba(0, 123, 255, 0.85) 100%)":"transparent",color:"white",padding:o?"8px 12px":"6px 12px",borderRadius:o?"8px":"6px",fontSize:o?"11px":"10px",cursor:s?"pointer":"default",backdropFilter:o?"blur(6px)":"none",boxShadow:o?"0 4px 12px rgba(0, 123, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)":"none",border:o?"1px solid rgba(255, 255, 255, 0.2)":"none",transition:"all 0.3s ease",lineHeight:"1.3",minHeight:o?"32px":"auto",display:"flex",alignItems:"center",wordBreak:"break-word"},onClick:s,onMouseEnter:d=>{o&&(d.currentTarget.style.transform="translateY(-1px)",d.currentTarget.style.boxShadow="0 6px 16px rgba(0, 123, 255, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3)")},onMouseLeave:d=>{o&&(d.currentTarget.style.transform="translateY(0)",d.currentTarget.style.boxShadow="0 4px 12px rgba(0, 123, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)")},children:o?e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",width:"100%",flexWrap:"wrap"},children:[e.jsx("span",{style:{fontSize:"12px",opacity:.9,flexShrink:0},children:"🏷️"}),e.jsx("span",{style:{fontWeight:"600",textShadow:"0 1px 2px rgba(0, 0, 0, 0.3)",flex:1},children:a})]}):e.jsx("div",{style:{opacity:1,fontStyle:"normal",textAlign:"center",width:"100%",fontSize:r?"11px":"10px",fontWeight:r?"600":"normal",background:r?"white":"transparent",color:r?"#007bff":"white",borderRadius:r?"6px":"0",padding:r?"8px 12px":"0",border:r?"1px solid #007bff":"none",boxShadow:r?"0 2px 8px rgba(0, 123, 255, 0.2)":"none",animation:r?"subtlePulse 2.5s infinite":"none"},children:r?e.jsxs("span",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"4px"},children:[e.jsx("span",{children:"👇"})," ",h("Scroll down to select tags")]}):e.jsx("span",{style:{opacity:.8,fontStyle:"italic"},children:h("No tags applied")})})})]}):null});rs.displayName="PhotoTagging";const hr=()=>{i.useEffect(()=>{if(typeof document>"u")return;const t="photo-handler-styles";if(document.getElementById(t))return;const r=document.createElement("style");r.id=t,r.textContent=`
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
    `,document.head.appendChild(r)},[])},yt={traditional:{padding:"20px",border:"2px dashed #007bff",borderRadius:"12px",backgroundColor:"#fff",boxShadow:"0 2px 8px rgba(0, 0, 0, 0.04)"},horizontal:{display:"flex",overflowX:"auto",gap:"16px",padding:"20px",border:"2px dashed #007bff",borderRadius:"12px",backgroundColor:"#fff",boxShadow:"0 2px 8px rgba(0, 0, 0, 0.04)",scrollbarWidth:"thin",scrollbarColor:"#007bff #f8f9fa",scrollBehavior:"smooth",WebkitOverflowScrolling:"touch"}},Tt={traditional:{display:"flex",flexDirection:"column",gap:"8px",minWidth:"0"},horizontal:{display:"flex",flexDirection:"column",gap:"8px",minWidth:"180px",maxWidth:"180px",flexShrink:0}},lt=$e.memo(({selectedPhotos:t,selectedPhotoIndices:r,isSavingAlbum:s,onRemovePhoto:n,onTogglePhotoSelection:u,photoTagsMap:h,columns:a="1",isMultipleAlbumMode:o=!1})=>{const{t:c}=ge();hr();const d=i.useMemo(()=>{if(o&&a==="horizontal")return yt.horizontal;const p=parseInt(a,10),l=isNaN(p)||p<1?1:Math.min(p,5);return{...yt.traditional,display:"grid",gridTemplateColumns:`repeat(${l}, 1fr)`,gap:"16px"}},[o,a]),x=i.useMemo(()=>o&&a==="horizontal"?Tt.horizontal:Tt.traditional,[o,a]),g=i.useMemo(()=>o&&a==="horizontal"?"photo-card-horizontal":"photo-card-traditional",[o,a]);return t.length===0?null:e.jsx(e.Fragment,{children:e.jsx("div",{style:d,className:"photo-grid",children:t.map((p,l)=>{var R,k;const T=r.has(l),O=h.get(l)||[];return e.jsxs("div",{style:x,children:[e.jsxs(Ms,{"data-selected":T?"true":"false",className:`${g} ${T?"selected":""}`,onClick:()=>u(l),children:[T&&!s&&e.jsx("button",{onClick:Q=>{Q.stopPropagation(),confirm(c("Are you sure you want to remove this photo?"))&&n(l)},className:"photo-delete-button",title:c("Remove photo"),children:"×"}),p.status!=="complete"&&e.jsx(cr,{$status:p.status,children:p.status==="error"?"✕":p.status==="uploading"?"↑":p.status==="processing"?"⚙️":"•"}),e.jsxs(Js,{className:`media-preview ${T?"selected":""}`,children:[p.type==="video"||(R=p.type)!=null&&R.startsWith("video")?e.jsx(Qs,{src:p.s3PreviewUrl,controls:!0,className:"media-item"}):e.jsx(Vs,{src:p.s3PreviewUrl,alt:p.fileName,className:"media-item"}),(p.status==="uploading"||p.status==="processing")&&e.jsx(Kt,{$bottom:"4px",$left:"4px",$right:"4px",$height:"4px",children:e.jsx(Ht,{$progress:p.progress,$status:p.status})})]}),e.jsxs("div",{className:"file-info-overlay",children:[(k=p.type)!=null&&k.startsWith("video")?c("Video"):c("Image"),p.size&&c(" • {{size}} MB",{size:(p.size/1024/1024).toFixed(1)}),p.duration&&c(" • {{duration}}s",{duration:p.duration})]}),o&&a==="horizontal"&&T&&e.jsx("div",{className:"selection-indicator",children:c("SELECTED")}),p.status==="error"&&p.errorMessage&&e.jsx(Bs,{$type:"error",children:c("Error: {{message}}",{message:p.errorMessage.length>40?p.errorMessage.substring(0,37)+"...":p.errorMessage})})]}),e.jsx("div",{className:`photo-info ${o&&a==="horizontal"?"horizontal":"traditional"}`,children:e.jsx(rs,{photoTags:O,isSelected:T,onToggleSelection:()=>u(l),fileName:p.originalFileName||p.fileName,showFileName:!0})})]},l)})})})});lt.displayName="PhotoHandler";const is=$e.memo(({isSavingAlbum:t,savingProgress:r})=>{const{t:s}=ge();return t?e.jsxs(Ct,{children:[e.jsx(nr,{children:s("Saving Album")}),e.jsx(lr,{id:"saveProgressText",children:s("Moving files...")}),e.jsx(Kt,{children:e.jsx(Ht,{id:"saveProgress",$progress:r/100})})]}):null});is.displayName="SavingProgressComponent";const as=$e.memo(({showFolderDetails:t,isCreator:r,folderName:s,setFolderName:n,folderDescription:u,setFolderDescription:h,isSavingAlbum:a})=>{const{t:o}=ge();return!t||r!==!0?null:e.jsxs(Ct,{children:[e.jsxs(mt,{children:[e.jsx(xt,{htmlFor:"folderName",children:o("Album Name")}),e.jsx(Xs,{id:"folderName",type:"text",value:s,onChange:c=>n(c.target.value),placeholder:o("e.g. Family Vacation in Kyoto"),disabled:a})]}),e.jsxs(mt,{children:[e.jsx(xt,{htmlFor:"folderDescription",children:o("Album Description")}),e.jsx(Zs,{id:"folderDescription",value:u,onChange:c=>h(c.target.value),placeholder:o("e.g. what's special about this album"),rows:4,disabled:a})]})]})});as.displayName="FolderDetailsComponent";const mr=()=>{i.useEffect(()=>{if(typeof document>"u")return;const t="existing-files-animations";if(document.getElementById(t))return;const r=document.createElement("style");r.id=t,r.textContent=`
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
    `,document.head.appendChild(r)},[])},xr=({existingFiles:t,selectedExistingIndices:r,onToggleSelection:s,onSelectAll:n,onDeselectAll:u,onDeleteFile:h,disabled:a,isCreator:o,participantsCanDeleteItems:c,existingFileTagsMap:d,t:x,isRTL:g})=>(mr(),t.length===0?null:e.jsxs("div",{style:{marginBottom:"32px",direction:g?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px",flexDirection:g?"row-reverse":"row"},children:[e.jsx("div",{children:e.jsx("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:x("Existing Files ({count})").replace("{count}",t.length.toString())})}),e.jsx("div",{style:{display:"flex",gap:"8px",flexDirection:g?"row-reverse":"row"},children:e.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:a?"#f8f9fa":"#fff",color:a?"#999":"#333",cursor:a?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:r.size>0?u:n,disabled:a,children:r.size>0?x("Done Tagging Selected"):x("Select All")})})]}),e.jsx("div",{className:"existing-files-grid",children:t.map((p,l)=>{const T=r.has(l),O=d.get(l)||[];return e.jsxs("div",{className:"existing-file-item",children:[e.jsxs("div",{className:`existing-file-card ${T?"selected":""}`,onClick:()=>!a&&s(l),children:[e.jsx(Ys,{thumbnailDataKey:p.thumbnailDataKey,dataKey:p.dataKey,alt:x("Existing file"),style:{width:"100%",height:"100%",objectFit:"cover"}}),T&&!a&&(o===!0||c)&&e.jsx("button",{onClick:R=>{R.stopPropagation(),confirm(x("Are you sure you want to remove this file?"))&&h(l)},className:"delete-button",title:x("Remove file"),children:"×"}),p.dataInBytes>0&&e.jsx("div",{className:"file-size",children:x("{size} MB").replace("{size}",(p.dataInBytes/(1024*1024)).toFixed(1))}),p.durationInSeconds&&e.jsx("div",{className:"file-duration",children:x("{minutes}:{seconds}").replace("{minutes}",Math.floor(p.durationInSeconds/60).toString()).replace("{seconds}",String(Math.floor(p.durationInSeconds%60)).padStart(2,"0"))})]}),e.jsxs("div",{className:"file-info",children:[p.fileName&&e.jsx("div",{className:`file-name ${T?"selected":""}`,children:p.fileName}),e.jsx("div",{className:"file-tags",children:O.length>0?e.jsx("div",{className:"tags-display",children:e.jsxs("div",{className:"tags-content",children:[e.jsx("span",{className:"tag-icon",children:"🏷️"}),e.jsx("span",{className:"tags-text",children:O.map(R=>{if(R.subtags.length>0){const k=R.subtags.map(Q=>Q.subtagTitle).join(", ");return x("{tagTitle}: {subtags}").replace("{tagTitle}",R.tagTitle).replace("{subtags}",k)}return R.tagTitle}).join(" • ")})]})}):T?e.jsx("div",{style:{background:"white",border:"1px solid #007bff",color:"#007bff",fontWeight:"600",fontSize:"11px",fontStyle:"normal",padding:"8px 12px",borderRadius:"6px",boxShadow:"0 2px 8px rgba(0, 123, 255, 0.2)",animation:"subtlePulse 2.5s infinite"},children:e.jsxs("span",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"4px"},children:[e.jsx("span",{children:"👇"})," ",x("Scroll down to select tags")]})}):null})]})]},`existing-${l}-${p.dataKey}`)})})]})),br=({selectedPhotos:t,selectedPhotoIndices:r,onToggleSelection:s,onSelectAll:n,onDeselectAll:u,onRemovePhoto:h,onDeleteAll:a,disabled:o,photoTagsMap:c,columns:d,setColumns:x,t:g,isRTL:p})=>t.length===0?null:e.jsxs("div",{style:{marginBottom:"32px",direction:p?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"16px",flexDirection:p?"row-reverse":"row"},children:[e.jsx("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:g("New Files ({count})").replace("{count}",t.length.toString())}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:p?"flex-start":"flex-end",gap:"8px"},children:[e.jsxs("div",{style:{display:"flex",gap:"8px",flexDirection:p?"row-reverse":"row"},children:[e.jsx("button",{className:"control-button",onClick:r.size>0?u:n,disabled:o,children:r.size>0?g("Done Tagging Selected"):g("Select All")}),r.size===0&&e.jsx("button",{className:"control-button danger",onClick:a,disabled:o,children:g("Delete All")})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",flexDirection:p?"row-reverse":"row"},children:[e.jsx("label",{className:"columns-label",children:g("Columns:")}),e.jsxs("select",{value:d,onChange:l=>x(l.target.value),className:"columns-select",children:[e.jsx("option",{value:"1",children:"1"}),e.jsx("option",{value:"2",children:"2"}),e.jsx("option",{value:"3",children:"3"}),e.jsx("option",{value:"4",children:"4"}),e.jsx("option",{value:"5",children:"5"})]})]})]})]}),e.jsx(lt,{selectedPhotos:t,selectedPhotoIndices:r,isSavingAlbum:o,onRemovePhoto:h,onTogglePhotoSelection:s,onSelectAllPhotos:n,onDeselectAllPhotos:u,hideHeader:!0,photoTagsMap:c,columns:d})]}),wr=$.button`
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
`,os=$.div`
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
`,ns=$.h4`
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
`,ls=$.button`
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
`,yr=$.button`
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
`,Tr=({showGlobalGear:t,globalSettings:r,setGlobalSettings:s,onPasswordClick:n,onApplySettings:u})=>{const{t:h,language:a}=ge(),o=Ne(a)==="rtl";return t?e.jsx(os,{$isRTL:o,children:e.jsxs(ze,{children:[e.jsx(ns,{children:h("Apply to All Albums")}),e.jsxs(ze,{children:[e.jsxs(Oe,{children:[e.jsx(Me,{children:h("Public Profile")}),e.jsxs(Be,{children:[e.jsx("input",{type:"checkbox",checked:r.isOnPublicProfile,onChange:c=>s(d=>({...d,isOnPublicProfile:c.target.checked}))}),e.jsx(Ue,{})]})]}),e.jsxs(Oe,{children:[e.jsx(Me,{children:h("Participants Can Add Items")}),e.jsxs(Be,{children:[e.jsx("input",{type:"checkbox",checked:r.participantsCanAddItems,onChange:c=>s(d=>({...d,participantsCanAddItems:c.target.checked}))}),e.jsx(Ue,{})]})]}),e.jsxs(Oe,{children:[e.jsx(Me,{children:h("Participants Can Delete Items")}),e.jsxs(Be,{children:[e.jsx("input",{type:"checkbox",checked:r.participantsCanDeleteItems,onChange:c=>s(d=>({...d,participantsCanDeleteItems:c.target.checked}))}),e.jsx(Ue,{})]})]})]}),e.jsx(ze,{children:e.jsxs(ls,{$hasAnyPassword:r.passwordProtectionOption!=="NoPassword"&&!!r.albumPassword,onClick:n,children:[r.passwordProtectionOption!=="NoPassword"&&r.albumPassword?"🔒":"🔓",r.passwordProtectionOption!=="NoPassword"&&r.albumPassword?h("Password Set"):h("Set Password for All")]})}),e.jsx(yr,{onClick:u,children:h("Apply to All Albums")})]})}):null},vr=({showGear:t,isOnPublicProfile:r,participantsCanAddItems:s,participantsCanDeleteItems:n,passwordProtectionOption:u,albumPassword:h,onTogglePublicProfile:a,onToggleParticipantsCanAdd:o,onToggleParticipantsCanDelete:c,onPasswordClick:d,disabled:x})=>{const{t:g,language:p}=ge(),l=Ne(p)==="rtl";return t?e.jsx(os,{$isRTL:l,children:e.jsxs(ze,{children:[e.jsx(ns,{children:g("Album Settings")}),e.jsxs(ze,{children:[e.jsxs(Oe,{children:[e.jsx(Me,{children:g("Public Profile")}),e.jsxs(Be,{children:[e.jsx("input",{type:"checkbox",checked:r,onChange:a,disabled:x}),e.jsx(Ue,{})]})]}),e.jsxs(Oe,{children:[e.jsx(Me,{children:g("Participants Can Add Items")}),e.jsxs(Be,{children:[e.jsx("input",{type:"checkbox",checked:s,onChange:o,disabled:x}),e.jsx(Ue,{})]})]}),e.jsxs(Oe,{children:[e.jsx(Me,{children:g("Participants Can Delete Items")}),e.jsxs(Be,{children:[e.jsx("input",{type:"checkbox",checked:n,onChange:c,disabled:x}),e.jsx(Ue,{})]})]})]}),e.jsx(ze,{children:e.jsxs(ls,{$hasAnyPassword:u!=="NoPassword"&&!!h,onClick:d,disabled:x,children:[u!=="NoPassword"&&h?"🔒":"🔓",g(u!=="NoPassword"&&h?"Password Set":"Set Password")]})})]})}):null},cs=({onClick:t,disabled:r,title:s})=>e.jsx(wr,{onClick:t,disabled:r,title:s,children:"⚙️"}),Sr=$.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10000;
`,$r=$.div`
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
`,Pr=$.div`
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
`,Ir=$.div`
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
`,Ar=$.h3`
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
`,kr=$.p`
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
`,vt=$.div`
  margin-bottom: ${m.spacing.lg};
`,St=$.label`
  display: block;
  margin-bottom: ${m.spacing.sm};
  font-size: 14px;
  font-weight: 500;
  color: ${m.colors.text.primary};
`,jr=$.input`
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
`,Cr=$.div`
  display: flex;
  flex-direction: column;
  gap: ${m.spacing.md};
  margin-bottom: ${m.spacing.xl};
`,Dr=$.div`
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
`,Er=$.div`
  flex: 1;
`,Fr=$.div`
  margin-bottom: ${m.spacing.xs};
`,Nr=$.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${m.colors.primary};
  flex-shrink: 0;
`,_r=$.label`
  font-size: 16px;
  font-weight: 500;
  color: ${m.colors.text.primary};
  cursor: pointer;
  display: block;
`,Rr=$.div`
  font-size: 14px;
  color: ${m.colors.text.secondary};
  margin-top: ${m.spacing.xs};
`,zr=$.div`
  color: ${m.colors.warning};
  font-size: 12px;
  font-style: italic;
  margin-top: ${m.spacing.xs};
  font-weight: 500;
`,Or=$.div`
  display: flex;
  gap: ${m.spacing.sm};
  justify-content: center;
  margin-top: ${m.spacing.xl};
`,Mr=$.div`
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
`,Br=[{value:"NotVisible",titleKey:"Password Required To See Or Save",descriptionKey:"Album will be completely hidden until correct password is entered"},{value:"Watermark",titleKey:"Watermarked And No Saving Without Password",descriptionKey:"Photos will be visible with watermarks, password required to save"},{value:"CannotBeSaved",titleKey:"Password Required To Save",descriptionKey:"Photos are visible but password required to download or save"},{value:"NoPassword",titleKey:"No Password",descriptionKey:"Album is fully public with no restrictions"}],ds=({isOpen:t,onClose:r,initialOption:s="NoPassword",initialPassword:n=""})=>{const{t:u,language:h}=ge(),a=Ne(h)==="rtl",[o,c]=i.useState(!1),[d,x]=i.useState(s),[g,p]=i.useState(n);if(i.useEffect(()=>{c(!0)},[]),i.useEffect(()=>{t&&(x(s),p(n))},[t,s,n]),!t||!o)return null;const l=g.trim()==="",T=k=>{x(k)},O=k=>{k.target===k.currentTarget&&r()},R=k=>k!=="NoPassword";return e.jsxs(e.Fragment,{children:[e.jsx(Sr,{onClick:O}),e.jsx($r,{children:e.jsx(Pr,{children:e.jsxs(Ir,{$isRTL:a,children:[e.jsx(Ar,{children:u("Album Password Policy")}),e.jsx(kr,{children:u("Configure password protection for your album. Choose how you want to restrict access to your photos.")}),e.jsxs(vt,{children:[e.jsx(St,{children:u("Enter Password")}),e.jsx(jr,{type:"text",placeholder:u("Enter password (optional)"),value:g,onChange:k=>p(k.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"})]}),e.jsxs(vt,{children:[e.jsx(St,{children:u("Select Protection Level")}),e.jsx(Cr,{children:Br.map(k=>e.jsxs(Dr,{$isSelected:d===k.value,onClick:()=>T(k.value),children:[e.jsx(Nr,{type:"radio",name:"protection",checked:d===k.value,onChange:()=>T(k.value)}),e.jsxs(Er,{children:[e.jsx(Fr,{children:e.jsx(_r,{children:u(k.titleKey)})}),e.jsx(Rr,{children:u(k.descriptionKey)}),l&&R(k.value)&&d===k.value&&e.jsx(zr,{children:u('⚠️ Will use "password" as default if left empty')})]})]},k.value))})]}),R(d)&&e.jsxs(Mr,{children:[e.jsx("strong",{children:u("💡 Password Protection Info:")}),e.jsx("br",{}),u('If you leave the password field empty, "password" will be used as the default password. You can change this anytime in album settings.')]}),e.jsxs(Or,{children:[e.jsx(Ke,{onClick:()=>r(),children:u("Cancel")}),e.jsx(Ke,{$primary:!0,onClick:()=>{const k=l&&R(d)?"password":g;console.log(`Saving with option: ${d}, password: ${k.length>0?"********":"none"}`),r(d,k)},children:u("Save")})]})]})})})]})},Ur=({debugMessages:t,t:r,isRTL:s,textDirection:n})=>t.length===0?null:e.jsxs("div",{style:{marginTop:"40px",background:"#fff3cd",padding:"16px",borderRadius:"8px",border:"1px solid #ffeeba",maxWidth:900,margin:"0 auto",direction:n},children:[e.jsx("h3",{style:{marginTop:0,fontSize:"18px",color:"#856404",textAlign:s?"right":"left"},children:r("Debug Log")}),e.jsx("pre",{style:{fontSize:"14px",color:"#856404",whiteSpace:"pre-wrap",maxHeight:"400px",overflow:"auto",textAlign:s?"right":"left"},children:t.map((u,h)=>e.jsx("div",{style:{marginBottom:"8px"},children:u},h))})]}),Gr=`
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
`,Wr=`
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
`,Kr=`
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
`,Hr=`
  mutation DeleteTag($tagId: String!) {
    deleteTag(tagId: $tagId) {
      id
      hasBeenDeleted
    }
  }
`,qr=`
  mutation DeleteSubtag($subtagId: String!) {
    deleteSubtag(subtagId: $subtagId) {
      id
      hasBeenDeleted
    }
  }
`,We=()=>typeof crypto<"u"&&crypto.randomUUID?crypto.randomUUID():"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){const r=Math.random()*16|0;return(t=="x"?r:r&3|8).toString(16)}),us=(t,r,s,n,u,h,a)=>{const[o,c]=i.useState([]),[d,x]=i.useState(null),[g,p]=i.useState(!1),[l,T]=i.useState(null),[O,R]=i.useState(null),[k,Q]=i.useState(null),[se,w]=i.useState(!1),[L,re]=i.useState(!1),[W,X]=i.useState(""),[oe,te]=i.useState(""),[j,J]=i.useState(!1),[ne,F]=i.useState(!1),P=i.useRef(!1),A=i.useRef(""),K=i.useRef(!1),U=i.useMemo(()=>({photoIndices:Array.from(u),existingIndices:Array.from(h),hasSelection:u.size>0||h.size>0}),[u,h]),G=i.useMemo(()=>{const f=[];t.forEach(v=>{f.push(...v)}),s.forEach(v=>{f.push(...v)});const y=new Map;return f.forEach(v=>{if(y.has(v.tagTitle)){const C=y.get(v.tagTitle),z=[...C.subtags,...v.subtags],D=Array.from(new Map(z.map(E=>[E.subtagTitle,E])).values());y.set(v.tagTitle,{...C,subtags:D})}else y.set(v.tagTitle,v)}),Array.from(y.values())},[t,s]),M=i.useCallback((f,y)=>{const v=[],C=Math.floor(Date.now()/1e3),z=new Set(f.map(D=>D.tagTitle));return y.forEach(D=>{if(z.has(D.tagTitle)){const E=f.findIndex(I=>I.tagTitle===D.tagTitle);if(E!==-1){const I=f[E],Y=new Set((I.subtags||[]).map(q=>q.subtagTitle)),Z=[];D.subtags.forEach(q=>{if(!Y.has(q.subtagTitle)){const je={id:We(),tagTitle:q.tagTitle,subtagTitle:q.subtagTitle,TagType:D.TagType||"File",points:1,createdAt:C,updatedAt:C,isCreatedFromApplied:!0};Z.push(je),a(`Created missing subtag from applied tags: ${q.subtagTitle} for tag ${q.tagTitle}`)}}),Z.length>0&&(f[E]={...I,subtags:[...I.subtags||[],...Z]})}}else{const E={id:We(),tagTitle:D.tagTitle,TagType:D.TagType||"File",points:1,createdAt:C,updatedAt:C,subtags:[],isCreatedFromApplied:!0};D.subtags&&D.subtags.length>0&&(E.subtags=D.subtags.map(I=>({id:We(),tagTitle:I.tagTitle,subtagTitle:I.subtagTitle,TagType:D.TagType||"File",points:1,createdAt:C,updatedAt:C,isCreatedFromApplied:!0}))),v.push(E),a(`Created missing tag from applied tags: ${D.tagTitle} with ${D.subtags.length} subtags`)}}),v},[a]),le=i.useCallback(f=>{if(!U.hasSelection)return!1;const y=U.photoIndices.length===0||U.photoIndices.every(C=>(t.get(C)||[]).some(D=>D.tagTitle===f.tagTitle)),v=U.existingIndices.length===0||U.existingIndices.every(C=>(s.get(C)||[]).some(D=>D.tagTitle===f.tagTitle));return y&&v},[U,t,s]),ce=i.useCallback(f=>{if(!U.hasSelection)return!1;let y=0,v=0;U.photoIndices.forEach(I=>{const Z=(t.get(I)||[]).find(q=>q.tagTitle===f.tagTitle);Z&&(y++,Z.subtags.some(q=>q.subtagTitle===f.subtagTitle)&&v++)});let C=0,z=0;U.existingIndices.forEach(I=>{const Z=(s.get(I)||[]).find(q=>q.tagTitle===f.tagTitle);Z&&(C++,Z.subtags.some(q=>q.subtagTitle===f.subtagTitle)&&z++)});const D=y+C,E=v+z;return D>0&&E===D},[U,t,s]),fe=i.useCallback(f=>{if(!U.hasSelection){a("No files selected for tag application");return}const y=le(f);a(`${y?"Removing":"Applying"} tag "${f.tagTitle}" ${y?"from":"to"} all selected files`),U.photoIndices.length>0&&r(v=>{const C=new Map(v);return U.photoIndices.forEach(z=>{const D=C.get(z)||[];if(y){const E=D.filter(I=>I.tagTitle!==f.tagTitle);C.set(z,E)}else if(!D.some(I=>I.tagTitle===f.tagTitle)){const I={tagTitle:f.tagTitle,TagType:f.TagType,subtags:[]};C.set(z,[...D,I])}}),C}),U.existingIndices.length>0&&n(v=>{const C=new Map(v);return U.existingIndices.forEach(z=>{const D=C.get(z)||[];if(y){const E=D.filter(I=>I.tagTitle!==f.tagTitle);C.set(z,E)}else if(!D.some(I=>I.tagTitle===f.tagTitle)){const I={tagTitle:f.tagTitle,TagType:f.TagType,subtags:[]};C.set(z,[...D,I])}}),C})},[U,le,r,n,a]),we=i.useCallback(f=>{if(!U.hasSelection){a("No files selected for subtag application");return}const y=ce(f);a(`${y?"Removing":"Applying"} subtag "${f.subtagTitle}" ${y?"from":"to"} all selected files with parent tag`),U.photoIndices.length>0&&r(v=>{const C=new Map(v);return U.photoIndices.forEach(z=>{const E=(C.get(z)||[]).map(I=>{if(I.tagTitle===f.tagTitle){if(y)return{...I,subtags:I.subtags.filter(Y=>Y.subtagTitle!==f.subtagTitle)};if(!I.subtags.some(Z=>Z.subtagTitle===f.subtagTitle))return{...I,subtags:[...I.subtags,{tagTitle:f.tagTitle,subtagTitle:f.subtagTitle}]}}return I});C.set(z,E)}),C}),U.existingIndices.length>0&&n(v=>{const C=new Map(v);return U.existingIndices.forEach(z=>{const E=(C.get(z)||[]).map(I=>{if(I.tagTitle===f.tagTitle){if(y)return{...I,subtags:I.subtags.filter(Y=>Y.subtagTitle!==f.subtagTitle)};if(!I.subtags.some(Z=>Z.subtagTitle===f.subtagTitle))return{...I,subtags:[...I.subtags,{tagTitle:f.tagTitle,subtagTitle:f.subtagTitle}]}}return I});C.set(z,E)}),C})},[U,ce,r,n,a]),ye=i.useCallback(()=>{const f=[];U.photoIndices.forEach(v=>{const C=t.get(v)||[];f.push(...C)}),U.existingIndices.forEach(v=>{const C=s.get(v)||[];f.push(...C)});const y=new Map;return f.forEach(v=>{if(y.has(v.tagTitle)){const C=y.get(v.tagTitle),z=[...C.subtags,...v.subtags],D=Array.from(new Map(z.map(E=>[E.subtagTitle,E])).values());y.set(v.tagTitle,{...C,subtags:D})}else y.set(v.tagTitle,v)}),Array.from(y.values())},[U,t,s]),Pe=i.useCallback(()=>U.hasSelection,[U.hasSelection]),de=i.useCallback(async()=>{var f,y;if(K.current||g){a("Tags already loading, skipping duplicate fetch");return}K.current=!0,a("Fetching tags from API and checking for missing applied tags"),p(!0),Q(null);try{const v=await be();if(!v){a("No token available for fetching tags"),Q("Authentication token not available");return}const C=await fetch(Re,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${v}`},body:JSON.stringify({query:Gr,variables:{fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})});if(!C.ok)throw new Error(`HTTP error! status: ${C.status}`);const z=await C.json();if(a("Tags API response:",z),z.errors){console.error("GraphQL errors:",z.errors);const I=z.errors.map(Y=>Y.message).join(", ");a(`GraphQL errors: ${I}`),Q(`GraphQL errors: ${I}`);return}let E=(((y=(f=z==null?void 0:z.data)==null?void 0:f.fetchRelations)==null?void 0:y.items)||[]).map(I=>{var Y,Z;return{id:I.id,tagTitle:I.tagTitle,TagType:I.TagType,points:I.points,createdAt:I.createdAt,updatedAt:I.updatedAt,subtags:((Z=(Y=I.subtags)==null?void 0:Y.items)==null?void 0:Z.map(q=>({id:q.id,tagTitle:q.tagTitle,subtagTitle:q.subtagTitle,TagType:q.TagType,points:q.points,createdAt:q.createdAt,updatedAt:q.updatedAt})))||[]}});if(a(`Fetched ${E.length} tags from API`),G.length>0){const I=M(E,G);I.length>0&&(a(`Created ${I.length} missing tags from applied tags`),E=[...I,...E])}a(`Final tags list: ${E.length} tags (including ${E.filter(I=>I.isCreatedFromApplied).length} created from applied tags)`),c(E),P.current=!0}catch(v){console.error("Error fetching tags:",v),a(`Error fetching tags: ${v}`),Q(v instanceof Error?v.message:"Unknown error occurred")}finally{p(!1),K.current=!1}},[g,a,G,M]),Ie=i.useCallback(f=>{a(`Setting displayed tag: ${f}`),x(f)},[a]),_e=i.useCallback(()=>{if(!d)return[];const f=o.find(y=>y.id===d);return(f==null?void 0:f.subtags)||[]},[d,o]),Ae=async(f,y)=>{if(a(`Adding new tag: ${f} of type: ${y}`),!f.trim())return a("Cannot add tag with empty title"),!1;J(!0);try{if(!await be())return a("No token available for adding tag"),!1;if(await(async()=>(a("PLACEHOLDER: Would send GraphQL mutation to add tag",{mutation:Wr,variables:{tagInput:{tagTitle:f.trim(),TagType:y,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(D=>setTimeout(D,500)),!0))()){const D={id:We(),tagTitle:f.trim(),TagType:y,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3),subtags:[]};return c(E=>[D,...E]),fe(D),Ie(D.id),X(""),w(!1),a(`Successfully added and applied new tag: ${f}`),!0}return!1}catch(v){return console.error("Error adding new tag:",v),a(`Error adding new tag: ${v}`),!1}finally{J(!1)}},b=async(f,y,v)=>{if(a(`Adding new subtag: ${y} to tag: ${f}`),!y.trim())return a("Cannot add subtag with empty title"),!1;if(!d)return a("No displayed tag for adding subtag"),!1;F(!0);try{if(!await be())return a("No token available for adding subtag"),!1;if(await(async()=>(a("PLACEHOLDER: Would send GraphQL mutation to add subtag",{mutation:Kr,variables:{subtagInput:{tagTitle:f,subtagTitle:y.trim(),TagType:v,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(E=>setTimeout(E,500)),!0))()){const E={id:We(),tagTitle:f,subtagTitle:y.trim(),TagType:v,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3)};return c(I=>I.map(Y=>Y.id===d?{...Y,subtags:[E,...Y.subtags||[]]}:Y)),we(E),te(""),re(!1),a(`Successfully added and applied new subtag: ${y}`),!0}return!1}catch(C){return console.error("Error adding new subtag:",C),a(`Error adding new subtag: ${C}`),!1}finally{F(!1)}},N=async f=>{a(`Deleting tag: ${f}`),T(f);try{if(!await be())return a("No token available for deleting tag"),!1;if(await(async()=>(a("PLACEHOLDER: Would send GraphQL mutation to delete tag",{mutation:Hr,variables:{tagId:f}}),await new Promise(z=>setTimeout(z,500)),!0))()){const z=o.find(D=>D.id===f);return c(D=>D.filter(E=>E.id!==f)),z&&(r(D=>{const E=new Map(D);return D.forEach((I,Y)=>{const Z=I.filter(q=>q.tagTitle!==z.tagTitle);E.set(Y,Z)}),E}),n(D=>{const E=new Map(D);return D.forEach((I,Y)=>{const Z=I.filter(q=>q.tagTitle!==z.tagTitle);E.set(Y,Z)}),E})),d===f&&Ie(null),a(`Successfully deleted tag: ${f}`),!0}return!1}catch(y){return console.error("Error deleting tag:",y),a(`Error deleting tag: ${y}`),!1}finally{T(null)}},B=async f=>{a(`Deleting subtag: ${f}`),R(f);try{if(!await be())return a("No token available for deleting subtag"),!1;if(await(async()=>(a("PLACEHOLDER: Would send GraphQL mutation to delete subtag",{mutation:qr,variables:{subtagId:f}}),await new Promise(z=>setTimeout(z,500)),!0))()){let z=null;return c(D=>D.map(E=>{var Y;const I=((Y=E.subtags)==null?void 0:Y.filter(Z=>Z.id===f?(z=Z,!1):!0))||[];return{...E,subtags:I}})),z&&(r(D=>{const E=new Map(D);return D.forEach((I,Y)=>{const Z=I.map(q=>q.tagTitle===z.tagTitle?{...q,subtags:q.subtags.filter(je=>je.subtagTitle!==z.subtagTitle)}:q);E.set(Y,Z)}),E}),n(D=>{const E=new Map(D);return D.forEach((I,Y)=>{const Z=I.map(q=>q.tagTitle===z.tagTitle?{...q,subtags:q.subtags.filter(je=>je.subtagTitle!==z.subtagTitle)}:q);E.set(Y,Z)}),E})),a(`Successfully deleted subtag: ${f}`),!0}return!1}catch(y){return console.error("Error deleting subtag:",y),a(`Error deleting subtag: ${y}`),!1}finally{R(null)}},H=()=>{w(!0),X("")},ie=()=>{w(!1),X("")},ee=()=>{re(!0),te("")},ue=()=>{re(!1),te("")},ke=async()=>W.trim()?await Ae(W,"File"):!1,Te=async()=>{if(oe.trim()&&d){const f=o.find(y=>y.id===d);if(f)return await b(f.tagTitle,oe,f.TagType)}return!1};return i.useEffect(()=>{P.current||de()},[de]),i.useEffect(()=>{if(!P.current||K.current)return;const f=JSON.stringify(G.map(y=>({title:y.tagTitle,subtags:y.subtags.map(v=>v.subtagTitle).sort()})));if(f!==A.current){A.current=f;const y=G.filter(v=>!o.some(C=>C.tagTitle===v.tagTitle));if(y.length>0){a(`Detected ${y.length} new applied tags, refreshing tags list`,y.map(C=>C.tagTitle));const v=setTimeout(()=>{de()},300);return()=>clearTimeout(v)}}},[G,o,a,de]),i.useEffect(()=>{if(d){const f=o.find(y=>y.id===d);f&&!le(f)&&(a(`Clearing displayed tag "${f.tagTitle}" because it's no longer applied to all selected files`),x(null))}},[u.size,h.size,d,o,le,a]),{tags:o,displayedTagId:d,isLoadingTags:g,tagIdBeingDeleted:l,subtagIdBeingDeleted:O,fetchError:k,isAddingNewTag:se,isAddingNewSubtag:L,newTagTitle:W,newSubtagTitle:oe,isSubmittingNewTag:j,isSubmittingNewSubtag:ne,fetchTags:de,toggleTagOnSelectedFiles:fe,toggleSubtagOnSelectedFiles:we,setDisplayedTag:Ie,isTagAppliedToSelected:le,isSubtagAppliedToSelected:ce,getDisplayedTagSubtags:_e,getAppliedTagsForSelected:ye,hasSelectedFiles:Pe,addNewTag:Ae,addNewSubtag:b,deleteTag:N,deleteSubtag:B,startAddingNewTag:H,cancelAddingNewTag:ie,startAddingNewSubtag:ee,cancelAddingNewSubtag:ue,submitNewTag:ke,submitNewSubtag:Te,setNewTagTitle:X,setNewSubtagTitle:te}},Jr=(t,r=50,s=3e3)=>{const n=i.useRef(0),u=i.useRef(Date.now()),h=i.useRef(!1),a=i.useRef(0),o=Date.now();return o-u.current>s&&(n.current=0,u.current=o,h.current&&o-a.current>1e4&&(h.current=!1,console.log(`🔄 Circuit breaker reset for ${t}`))),n.current++,n.current>r&&!h.current&&(h.current=!0,a.current=o,console.error(`🚨 CIRCUIT BREAKER ACTIVATED for ${t}! Renders: ${n.current}`)),{isBlocked:h.current,renderCount:n.current,reset:()=>{n.current=0,u.current=Date.now(),h.current=!1}}},Qr=$.div`
  display: flex;
  flex-direction: column;
  gap: ${m.spacing.xs}; /* Reduced from sm (8px) to xs (4px) */
  /* Enhanced: Use consistent grid spacing */
  margin-bottom: ${m.spacing.lg};
  width: 100%;
  align-items: flex-end; /* Align buttons to the right side */
  padding: 0 ${m.spacing.sm}; /* Match the header button positioning */
`,$t=()=>{const{t,language:r}=ge(),s=Ne(r)==="rtl",{isBlocked:n,renderCount:u,reset:h}=Jr("SingleAlbumMode"),[a,o]=i.useState({selectedPhotoIndices:new Set,photoTagsMap:new Map,selectedExistingIndices:new Set,existingFileTagsMap:new Map}),c=zt(t),{setShowUsernamePrompt:d,setUsernameInput:x}=c,[g,p]=i.useState(null),[l,T]=i.useState(!1),[O,R]=i.useState(0),[k,Q]=i.useState(""),[se,w]=i.useState(""),[L,re]=i.useState(!1),[W,X]=i.useState(!1),[oe,te]=i.useState("NoPassword"),[j,J]=i.useState(""),[ne,F]=i.useState(!1),[P,A]=i.useState(!0),[K,U]=i.useState(!1),[G,M]=i.useState(null),[le,ce]=i.useState(!1),[fe,we]=i.useState([]),[ye,Pe]=i.useState("2"),[de,Ie]=i.useState([]),[_e,Ae]=i.useState(!1),[b,N]=i.useState(!1),[B,H]=i.useState(!1),ie=i.useRef(null),ee=i.useCallback((S,_)=>{const V=new Date().toISOString();console.log(`[${V}] ${S}`,_)},[]),ue=i.useCallback(S=>{!g&&S&&p(S)},[g]),ke=Hs(ue,!0),{fileInputRef:Te,selectedPhotos:f,setSelectedPhotos:y,isUploading:v,progressTracker:C,setProgressTracker:z,debugMessages:D,currentFolderId:E,openFilePicker:I,handleFileSelection:Y,setOnSaveAlbumPage:Z}=ke,q=ir(p,y,M,re,Q,w,F,A,te,J,ce,we,U,ee),{cognitoUsername:je,publicUsername:He,setPublicUsername:ct,isExistingAlbum:qe}=q,ps=us(a.photoTagsMap,S=>{o(_=>({..._,photoTagsMap:typeof S=="function"?S(_.photoTagsMap):S}))},a.existingFileTagsMap,S=>{o(_=>({..._,existingFileTagsMap:typeof S=="function"?S(_.existingFileTagsMap):S}))},a.selectedPhotoIndices,a.selectedExistingIndices,ee),fs=or(g||E,je,f,le,fe,k,se,ne,P,K,oe,j,a.photoTagsMap,a.existingFileTagsMap,de,a.selectedExistingIndices,T,R,y,z,ee,t),{saveAlbumDirectly:Je}=fs;i.useEffect(()=>{const S=localStorage.getItem("save-album-columns")||"2";Pe(S)},[]);const gs=i.useCallback(S=>{Pe(S),localStorage.setItem("save-album-columns",S)},[]);i.useEffect(()=>{const S=_=>{ie.current&&!ie.current.contains(_.target)&&H(!1)};return document.addEventListener("mousedown",S),()=>{document.removeEventListener("mousedown",S)}},[]),i.useEffect(()=>(Z(!0),()=>Z(!1)),[Z]),i.useEffect(()=>{(async()=>{try{await Us()}catch(_){console.warn("Credential prewarming failed:",_)}})()},[]);const dt=i.useCallback(async S=>{var _,V;if(S){Ae(!0);try{const ae=await be();if(!ae)return;const pe=`
        mutation FetchRelations($fetchRelationsInput: FetchRelationsInput!) {
          fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
            items {
              ... on FolderPosition {
                ${Ks}
              }
            }
          }
        }
      `,me={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}},ve=await(await fetch(Re,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${ae}`},body:JSON.stringify({query:pe,variables:me})})).json();if(ve.errors){console.error("GraphQL errors:",ve.errors);return}const ut=(((V=(_=ve==null?void 0:ve.data)==null?void 0:_.fetchRelations)==null?void 0:V.items)||[]).find(Se=>Se&&Se.folder&&Se.folder.id===S);if(!ut)return;const Ge=ut.folder,Qe=Ge.fileReferencesPage,Fs=Array.isArray(Qe==null?void 0:Qe.items)?Qe.items:[],pt=[],ft=new Map;Fs.forEach((Se,Ns)=>{const De=Se.file;if(De&&De.dataKey){let Xe=Se.fileDisplayName;if(!Xe&&De.dataKey){const Ve=De.dataKey.split("/");Xe=Ve[Ve.length-1]}pt.push({fileReferenceId:Se.id,dataKey:De.dataKey,thumbnailDataKey:De.thumbnailDataKey||null,durationInSeconds:De.durationInSeconds||null,dataInBytes:De.dataInBytes||0,fileName:Xe||void 0});const Ze=Se.selectedTags;if(Array.isArray(Ze)&&Ze.length>0){const Ve=Ze.map(Ye=>({tagTitle:Ye.tagTitle,TagType:Ye.TagType,subtags:Array.isArray(Ye.subtags)?Ye.subtags.map(gt=>({tagTitle:gt.tagTitle,subtagTitle:gt.subtagTitle})):[]}));ft.set(Ns,Ve)}}}),Ie(pt),o(Se=>({...Se,existingFileTagsMap:ft})),!k&&Ge.folderName&&Q(Ge.folderName),!se&&Ge.folderDescription&&w(Ge.folderDescription)}catch(ae){console.error("Failed to fetch existing album data:",ae)}finally{Ae(!1)}}},[k,se]);i.useEffect(()=>{g&&qe?(ee(`Loading existing files for existing album: ${g}`),dt(g)):g&&!qe&&ee(`New album detected with folderId: ${g}, skipping existing files load`)},[g,qe,dt,ee]),i.useEffect(()=>{E&&!g&&p(E)},[E,g]),i.useEffect(()=>{o(S=>{const _=new Set,V=new Map;return S.selectedPhotoIndices.forEach(ae=>{ae<f.length&&_.add(ae)}),S.photoTagsMap.forEach((ae,pe)=>{pe<f.length&&V.set(pe,ae)}),{...S,selectedPhotoIndices:_,photoTagsMap:V}})},[f.length]),i.useEffect(()=>{o(S=>{const _=new Set,V=new Map;return S.selectedExistingIndices.forEach(ae=>{ae<de.length&&_.add(ae)}),S.existingFileTagsMap.forEach((ae,pe)=>{pe<de.length&&V.set(pe,ae)}),{...S,selectedExistingIndices:_,existingFileTagsMap:V}})},[de.length]);const hs=i.useCallback(S=>{const _=f.filter((V,ae)=>ae!==S);y(_);try{_.length>0?localStorage.setItem(he.SELECTED_PHOTOS,JSON.stringify(_)):localStorage.removeItem(he.SELECTED_PHOTOS)}catch(V){console.warn("Failed to update localStorage:",V)}o(V=>{const ae=new Set,pe=new Map;return V.selectedPhotoIndices.forEach(me=>{me<S?ae.add(me):me>S&&ae.add(me-1)}),V.photoTagsMap.forEach((me,xe)=>{xe<S?pe.set(xe,me):xe>S&&pe.set(xe-1,me)}),{...V,selectedPhotoIndices:ae,photoTagsMap:pe}})},[f,y]),ms=i.useCallback(async S=>{const _=de[S];if(!_){ee(`No file found at index ${S}`);return}N(!0),ee(`Starting deletion of file reference: ${_.fileReferenceId}`);try{await Fe.deleteFileReferences([_.fileReferenceId],ee),ee(`Successfully deleted file reference: ${_.fileReferenceId}`);const V=de.filter((ae,pe)=>pe!==S);Ie(V),o(ae=>{const pe=new Set,me=new Map;return ae.selectedExistingIndices.forEach(xe=>{xe<S?pe.add(xe):xe>S&&pe.add(xe-1)}),ae.existingFileTagsMap.forEach((xe,ve)=>{ve<S?me.set(ve,xe):ve>S&&me.set(ve-1,xe)}),{...ae,selectedExistingIndices:pe,existingFileTagsMap:me}}),ee(`File removed from local state, ${V.length} files remaining`)}catch(V){console.error("Failed to delete file reference:",V),ee(`Failed to delete file reference: ${V}`),alert(t("Failed to delete file. Please try again."))}finally{N(!1)}},[de,ee,t]),xs=i.useCallback(S=>{o(_=>{const V=new Set(_.selectedExistingIndices);return V.has(S)?V.delete(S):V.add(S),{..._,selectedExistingIndices:V}})},[]),bs=i.useCallback(()=>{const S=new Set;for(let _=0;_<de.length;_++)S.add(_);o(_=>({..._,selectedExistingIndices:S}))},[de.length]),ws=i.useCallback(()=>{o(S=>({...S,selectedExistingIndices:new Set}))},[]),ys=i.useCallback(S=>{o(_=>{const V=new Set(_.selectedPhotoIndices);return V.has(S)?V.delete(S):V.add(S),{..._,selectedPhotoIndices:V}})},[]),Ts=i.useCallback(()=>{const S=new Set;for(let _=0;_<f.length;_++)S.add(_);o(_=>({..._,selectedPhotoIndices:S}))},[f.length]),vs=i.useCallback(()=>{o(S=>({...S,selectedPhotoIndices:new Set}))},[]),Ss=i.useCallback(()=>{if(confirm(t("Are you sure you want to delete all new files? This action cannot be undone."))){y([]),o({selectedPhotoIndices:new Set,photoTagsMap:new Map,selectedExistingIndices:new Set,existingFileTagsMap:new Map});try{localStorage.removeItem(he.SELECTED_PHOTOS)}catch(S){console.warn("Failed to update localStorage:",S)}}},[t,y]),$s=i.useCallback(async()=>{if(!l){T(!0);try{if(He!=null&&He.startsWith("Profile-")){x(""),d(!0),T(!1);return}Je()}catch(S){console.error("Error in handleSaveAlbumSingle:",S),T(!1)}}},[l,He,x,d,Je]),Ps=i.useCallback(S=>{try{localStorage.setItem(he.PUBLIC_USERNAME,S)}catch(_){console.warn("Failed to save username to localStorage:",_)}ct(S),d(!1),Je()},[ct,d,Je]),Is=i.useCallback((S,_)=>{S&&te(S),_!==void 0&&J(_),X(!1)},[]),As=i.useCallback(()=>{X(!0)},[]),ks=i.useCallback(()=>{F(!ne)},[ne]),js=i.useCallback(()=>{A(!P)},[P]),Cs=i.useCallback(()=>{U(!K)},[K]),Ds=i.useCallback(()=>{I(g)},[I,g]),Ce=l||v||_e||b,Es=f.length>0||de.length>0;return n?e.jsxs("div",{style:{padding:"20px",textAlign:"center",backgroundColor:"#ffebee",border:"2px solid #f44336",borderRadius:"8px",margin:"20px"},children:[e.jsx("h2",{children:"🚨 Component Temporarily Blocked"}),e.jsx("p",{children:"The component was rendering too frequently and has been safely stopped."}),e.jsxs("p",{children:["Render count: ",u]}),e.jsx("button",{onClick:h,style:{padding:"10px 20px",backgroundColor:"#4caf50",color:"white",border:"none",borderRadius:"4px",cursor:"pointer",marginRight:"10px"},children:"Reset Component"}),e.jsx("button",{onClick:()=>window.location.reload(),style:{padding:"10px 20px",backgroundColor:"#f44336",color:"white",border:"none",borderRadius:"4px",cursor:"pointer"},children:"Reload Page"})]}):e.jsxs(e.Fragment,{children:[e.jsx(Dt,{}),!1,e.jsx(Et,{children:e.jsxs(Ft,{style:{display:"flex",justifyContent:"space-between",alignItems:"center",flexDirection:s?"row-reverse":"row"},children:[e.jsx("div",{style:{order:s?2:1,textAlign:s?"right":"left"},children:e.jsx(Nt,{onClick:()=>Ee(_t("my-albums.html")),children:t("← Back To Albums")})}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",order:s?1:2,flexDirection:s?"row-reverse":"row"},children:[L&&G===!0&&e.jsxs("div",{ref:ie,style:{position:"relative"},children:[e.jsx(cs,{onClick:()=>H(!B),disabled:Ce,title:t("Album Settings")}),e.jsx(vr,{showGear:B,isOnPublicProfile:ne,participantsCanAddItems:P,participantsCanDeleteItems:K,passwordProtectionOption:oe,albumPassword:j,onTogglePublicProfile:ks,onToggleParticipantsCanAdd:js,onToggleParticipantsCanDelete:Cs,onPasswordClick:As,disabled:Ce})]}),e.jsx(Ke,{$primary:!0,onClick:$s,disabled:Ce,style:{minWidth:"120px",fontSize:"14px",padding:"8px 16px"},children:t(l?"Saving...":"Save Album")})]})]})}),e.jsxs(Rt,{$isRTL:s,children:[e.jsx("div",{style:{marginTop:L&&G===!0?"3px":"0"},children:e.jsx(as,{showFolderDetails:L,isCreator:G,folderName:k,setFolderName:Q,folderDescription:se,setFolderDescription:w,isSavingAlbum:Ce})}),(v||C.totalFiles>0&&(C.filesUploading>0||C.filesProcessing>0||C.filesComplete<C.totalFiles))&&e.jsx(qs,{progressTracker:C,isRTL:Ne(r)==="rtl",variant:"detailed",context:"saving",isUploading:v,showSuccessMessage:!1,showErrorMessage:!0,customMessages:{error:t("Some photos could not be processed. You can continue with the successfully processed photos.")}}),b&&e.jsx("div",{style:{padding:"16px",marginBottom:"16px",backgroundColor:"#fff3cd",border:"1px solid #ffeaa7",borderRadius:"8px",color:"#856404",textAlign:"center",fontWeight:"500"},children:t("Deleting file...")}),_e&&e.jsx("div",{style:{padding:"16px",marginBottom:"16px",backgroundColor:"#f8f9fa",border:"1px solid #dee2e6",borderRadius:"8px",color:"#6c757d",textAlign:"center",fontStyle:"italic"},children:t("Loading existing files...")}),e.jsx("input",{ref:Te,id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:S=>Y(S,je),style:{display:"none"}}),L&&G===!0&&Es&&e.jsxs("div",{style:{padding:"32px",marginBottom:"32px",backgroundColor:"#f8f9fa",border:"2px solid #e9ecef",borderRadius:"12px",direction:s?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",fontSize:"18px",color:"#495057",fontWeight:"600",marginBottom:"24px",flexDirection:s?"row-reverse":"row"},children:[e.jsx("span",{style:{marginRight:s?"0":"12px",marginLeft:s?"12px":"0",fontSize:"20px"},children:"🏷️"}),t("Select files to start adding or removing tags")]}),qe&&de.length>0&&e.jsx(xr,{existingFiles:de,selectedExistingIndices:a.selectedExistingIndices,onToggleSelection:xs,onSelectAll:bs,onDeselectAll:ws,onDeleteFile:ms,disabled:Ce,isCreator:G,participantsCanDeleteItems:K,existingFileTagsMap:a.existingFileTagsMap,t,isRTL:s}),e.jsx(br,{selectedPhotos:f,selectedPhotoIndices:a.selectedPhotoIndices,onToggleSelection:ys,onSelectAll:Ts,onDeselectAll:vs,onRemovePhoto:hs,onDeleteAll:Ss,disabled:Ce,photoTagsMap:a.photoTagsMap,columns:ye,setColumns:gs,t,isRTL:s}),(a.selectedPhotoIndices.size>0||a.selectedExistingIndices.size>0)&&e.jsx(nt,{tagsManager:ps,disabled:Ce,enhancedLog:ee})]}),e.jsx(is,{isSavingAlbum:l,savingProgress:O}),e.jsx(Qr,{children:e.jsx(Ke,{onClick:Ds,disabled:Ce,children:t(v?"Uploading...":"Add More Photos")})}),e.jsx(Ot,{t,language:r,usernameManager:c,onSuccess:Ps}),e.jsx(ds,{isOpen:W,onClose:Is,initialOption:oe,initialPassword:j}),e.jsx(Ur,{debugMessages:D,t,isRTL:s,textDirection:s?"rtl":"ltr"})]})]})},Vr=$.div`
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
`,Yr=$.div`
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
`,Xr=$.div`
  flex: 1;
`,Zr=$.h3`
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
`,Lr=$.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
`,ei=$.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: stretch;
  }
`,Pt=$.button`
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
`,ti=$.button`
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
`,si=$.div`
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
`,ri=$.button`
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
`,It=$.div`
  margin-bottom: 16px;
`,At=$.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #333;
  font-size: 14px;
`,ii=$.input`
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
`,ai=$.textarea`
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
`,oi=$.div`
  margin-top: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e9ecef;
`,ni=$.div`
  width: 100%;
  height: 6px;
  background: #e9ecef;
  border-radius: 3px;
  overflow: hidden;
  margin-top: 8px;
`,li=$.div`
  height: 100%;
  background: linear-gradient(90deg, #007bff, #28a745);
  width: ${t=>t.$progress}%;
  transition: width 0.3s ease;
`,ci=$.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
  justify-content: flex-end;
  flex-direction: ${t=>t.$isRTL?"row-reverse":"row"};
`,kt=$.button`
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
`,di=({album:t,onUpdate:r,onSave:s,onRemove:n,onShowPasswordDialog:u,disabled:h,columns:a,enhancedLog:o})=>{const{t:c,language:d}=ge(),x=Ne(d)==="rtl",[g,p]=i.useState(!1),[l,T]=i.useState(!1),O=i.useRef(null);i.useEffect(()=>{const P=A=>{O.current&&!O.current.contains(A.target)&&p(!1)};return document.addEventListener("mousedown",P),()=>{document.removeEventListener("mousedown",P)}},[]);const R=us(t.photoTagsMap,P=>{const A=typeof P=="function"?P(t.photoTagsMap):P;r({photoTagsMap:A})},new Map,()=>{},t.selectedPhotoIndices,new Set,o),k=P=>{r({name:P})},Q=P=>{r({description:P})},se=P=>{const A=new Set(t.selectedPhotoIndices);A.has(P)?A.delete(P):A.add(P),r({selectedPhotoIndices:A})},w=()=>{const P=new Set;for(let A=0;A<t.photos.length;A++)P.add(A);r({selectedPhotoIndices:P})},L=()=>{r({selectedPhotoIndices:new Set})},re=()=>{confirm(c("Are you sure you want to delete all files from this album? This action cannot be undone."))&&r({photos:[],selectedPhotoIndices:new Set,photoTagsMap:new Map})},W=P=>{const A=t.photos.filter((G,M)=>M!==P),K=new Set;t.selectedPhotoIndices.forEach(G=>{G<P?K.add(G):G>P&&K.add(G-1)});const U=new Map;t.photoTagsMap.forEach((G,M)=>{M<P?U.set(M,G):M>P&&U.set(M-1,G)}),r({photos:A,selectedPhotoIndices:K,photoTagsMap:U})},X=()=>{r({isOnPublicProfile:!t.isOnPublicProfile})},oe=()=>{r({participantsCanAddItems:!t.participantsCanAddItems})},te=()=>{r({participantsCanDeleteItems:!t.participantsCanDeleteItems})},j=()=>{u(t.id)},J=async()=>{if(!(l||h)){T(!0),o(`Starting save for album: ${t.name}`);try{const P=await s();o(`Save completed for album: ${t.name}, success: ${P}`),P||alert(c('Failed to save album "{{albumName}}". Please try again.',{albumName:t.name}))}catch(P){console.error("Error saving album:",P),o(`Error saving album ${t.name}: ${P}`),alert(c('Failed to save album "{{albumName}}". Please try again.',{albumName:t.name}))}finally{T(!1)}}},ne=t.passwordProtectionOption!=="NoPassword"&&t.albumPassword,F=h||l||t.isSaving;return e.jsxs(Vr,{children:[e.jsxs(Yr,{$isRTL:x,children:[e.jsxs(Xr,{children:[e.jsxs(Zr,{children:[e.jsx("span",{children:"📁"}),t.name,(t.isSaving||l)&&e.jsx("span",{style:{color:"#007bff"},children:"⏳"}),t.savingProgress===100&&e.jsx("span",{style:{color:"#28a745"},children:"✅"})]}),e.jsxs(Lr,{children:[t.photos.length===1?c("1 file"):c("{{count}} files",{count:t.photos.length}),t.selectedPhotoIndices.size>0&&e.jsxs("span",{children:[" • ",c("{{count}} selected for tagging",{count:t.selectedPhotoIndices.size})]})]})]}),e.jsx(ei,{children:!t.isSaving&&!l&&t.savingProgress<100&&e.jsxs(e.Fragment,{children:[e.jsx(Pt,{$variant:"primary",onClick:J,disabled:F,children:c(l?"Saving...":"Save")}),e.jsxs("div",{ref:O,style:{position:"relative"},children:[e.jsx(ti,{onClick:()=>p(!g),disabled:F,title:c("Album Settings"),children:"⚙️"}),g&&e.jsxs(si,{$isRTL:x,children:[e.jsxs(et,{children:[e.jsx(tt,{children:c("Visibility")}),e.jsxs(st,{children:[e.jsx(rt,{children:c("Public Profile")}),e.jsxs(it,{children:[e.jsx("input",{type:"checkbox",checked:t.isOnPublicProfile,onChange:X,disabled:F}),e.jsx(at,{})]})]})]}),e.jsxs(et,{children:[e.jsx(tt,{children:c("Participant Permissions")}),e.jsxs(st,{children:[e.jsx(rt,{children:c("Can Add Items")}),e.jsxs(it,{children:[e.jsx("input",{type:"checkbox",checked:t.participantsCanAddItems,onChange:oe,disabled:F}),e.jsx(at,{})]})]}),e.jsxs(st,{children:[e.jsx(rt,{children:c("Can Delete Items")}),e.jsxs(it,{children:[e.jsx("input",{type:"checkbox",checked:t.participantsCanDeleteItems,onChange:te,disabled:F}),e.jsx(at,{})]})]})]}),e.jsxs(et,{children:[e.jsx(tt,{children:c("Security")}),e.jsxs(ri,{$hasPassword:!!ne,onClick:j,disabled:F,children:[ne?"🔒":"🔓",c(ne?"Password Set":"Set Password")]})]})]})]}),e.jsx(Pt,{$variant:"danger",onClick:n,disabled:F,children:c("Remove")})]})})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",marginBottom:"20px"},children:[e.jsxs(It,{children:[e.jsx(At,{children:c("Album Name")}),e.jsx(ii,{type:"text",value:t.name,onChange:P=>k(P.target.value),placeholder:c("e.g. Family Vacation in Kyoto"),disabled:F})]}),e.jsxs("div",{children:[e.jsxs(It,{children:[e.jsx(At,{children:c("Album Description")}),e.jsx(ai,{value:t.description,onChange:P=>Q(P.target.value),placeholder:c("e.g. what's special about this album"),disabled:F,rows:3})]}),t.photos.length>0&&e.jsxs(ci,{$isRTL:x,children:[e.jsx(kt,{onClick:t.selectedPhotoIndices.size>0?L:w,disabled:F,children:t.selectedPhotoIndices.size>0?c("Done Tagging Selected"):c("Select All")}),t.selectedPhotoIndices.size===0&&e.jsx(kt,{$variant:"danger",onClick:re,disabled:F,children:c("Delete All")})]})]})]}),e.jsx(lt,{selectedPhotos:t.photos,selectedPhotoIndices:t.selectedPhotoIndices,isSavingAlbum:F,onRemovePhoto:W,onTogglePhotoSelection:se,onSelectAllPhotos:w,onDeselectAllPhotos:L,hideHeader:!1,photoTagsMap:t.photoTagsMap,columns:a,isMultipleAlbumMode:!0}),t.selectedPhotoIndices.size>0&&e.jsx(oi,{children:e.jsx(nt,{tagsManager:R,disabled:F,enhancedLog:o})}),(t.isSaving||l)&&e.jsxs("div",{style:{marginTop:"16px"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},children:[e.jsx("span",{style:{fontSize:"14px",fontWeight:"600",color:"#333"},children:c(l?"Starting save...":"Saving album...")}),e.jsx("span",{style:{fontSize:"14px",color:"#666"},children:c("{{progress}}%",{progress:t.savingProgress})})]}),e.jsx(ni,{children:e.jsx(li,{$progress:t.savingProgress})})]})]})},ui=$.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
`,pi=({albums:t,setAlbums:r,isSavingAny:s,onSaveAlbum:n,onRemoveAlbum:u,onShowPasswordDialog:h,columns:a,setColumns:o,enhancedLog:c})=>{const{language:d}=ge(),x=Ne(d)==="rtl",g=i.useCallback((l,T)=>{r(O=>O.map(R=>R.id===l?{...R,...T}:R))},[r]),p=i.useCallback(async l=>{try{const T=await n(l);return c(`Album ${l} save result: ${T?"success":"failed"}`),T}catch(T){return c(`Error saving album ${l}: ${T}`),!1}},[n,c]);return e.jsx("div",{children:e.jsx(ui,{$isRTL:x,children:t.map(l=>e.jsx(di,{album:l,onUpdate:T=>g(l.id,T),onSave:()=>p(l.id),onRemove:()=>u(l.id),onShowPasswordDialog:h,disabled:s,columns:a,setColumns:o,enhancedLog:c},l.id))})})},fi=$.span`
  font-size: ${m.fontSizes.sm}; // 14px to match other header elements
  color: ${m.colors.text.secondary}; // Subtle gray like other controls
  font-weight: 500;
  white-space: nowrap;
  display: flex;
  align-items: center;
`,gi=$.select`
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
`,hi=()=>{var _e,Ae;const{t,language:r}=ge(),s=Ne(r)==="rtl",[n,u]=i.useState([]),[h,a]=i.useState("2"),[o,c]=i.useState(!1),[d,x]=i.useState(!1),[g,p]=i.useState(null),[l,T]=i.useState(null),[O,R]=i.useState(!1),[k,Q]=i.useState(0),[se,w]=i.useState(0),[L,re]=i.useState(""),[W,X]=i.useState({isOnPublicProfile:!1,participantsCanAddItems:!0,participantsCanDeleteItems:!1,passwordProtectionOption:"NoPassword",albumPassword:""}),oe=zt(t),{setShowUsernamePrompt:te,setUsernameInput:j}=oe,[J,ne]=i.useState(null);i.useEffect(()=>{const b=localStorage.getItem(he.PUBLIC_USERNAME);ne(b||null)},[]);const F=(b,N)=>{const B=new Date().toISOString();console.log(`[${B}] ${b}`,N)};i.useEffect(()=>{(async()=>{try{const N=await be();if(N){const H=JSON.parse(atob(N.split(".")[1]))["cognito:username"];H&&(T(H),F(`Initialized Cognito username: ${H}`))}}catch(N){console.error("Error initializing username:",N)}})()},[]);const P=b=>{a(b),localStorage.setItem("save-album-columns",b),F(`Column setting changed to ${b} for all albums`)};i.useEffect(()=>{const b=localStorage.getItem(he.MULTI_ALBUM_DATA);if(b)try{const B=JSON.parse(b).filter(ie=>{if(!ie||!ie.name||!Array.isArray(ie.selectedPhotos))return!1;const ee=ie.selectedPhotos.filter(ue=>ue&&ue.fileName&&ue.originalFileName&&ue.s3PreviewUrl&&ue.s3PreviewUrl.includes("amazonaws.com"));return ie.selectedPhotos=ee,ee.length>0});if(B.length===0){alert(t("No valid albums were found. Please try selecting your files again.")),Ee("my-albums.html");return}const H=B.map(ie=>({id:bt(),name:ie.name,description:"",photos:ie.selectedPhotos,selectedPhotoIndices:new Set,photoTagsMap:new Map,isOnPublicProfile:!1,participantsCanAddItems:!0,participantsCanDeleteItems:!1,passwordProtectionOption:"NoPassword",albumPassword:"",isSaving:!1,savingProgress:0,folderId:""}));u(H),Le()}catch(N){console.error("Error parsing multi-album data:",N),alert(t("There was an error loading your albums. Please try selecting your files again.")),Ee("my-albums.html")}else alert(t("No album data was found. Please try selecting your files again.")),Ee("my-albums.html")},[t]),i.useEffect(()=>{const b=localStorage.getItem("save-album-columns")||"2";a(b)},[]);const A=(b,N)=>{F(`Album ${b} progress: ${N}`)},K=(b,N)=>{u(B=>B.map(H=>H.id===b?{...H,savingProgress:N}:H))},U=async(b,N,B)=>{F(`Starting chunked save for album ${b}`),A(b,t("Processing files in chunks..."));const H=48;if(B.length===0)F(`No file references for album ${b}, saving only folder position`),await Fe.saveFolderOnly(N,F);else{const ie=Bt(B);F(`Album ${b}: Processing ${ie.length} unique file references`);const ee=Ut(ie,H);F(`Album ${b}: Split into ${ee.length} chunks`);for(let ue=0;ue<ee.length;ue++){const ke=ee[ue];F(`Album ${b}: Processing chunk ${ue+1} of ${ee.length}`);const Te=ue/ee.length*80;K(b,10+Te),ue<ee.length-1?(A(b,t("Saving files: chunk {{chunkNumber}} of {{totalChunks}}...",{chunkNumber:ue+1,totalChunks:ee.length})),await Fe.saveFileReferences(ke,F)):(A(b,t("Finalizing album...")),await Fe.saveFinalChunkWithFolder(ke,N,F))}}K(b,100),A(b,t("Album saved successfully!"))},G=async b=>{const N=n.find(B=>B.id===b);if(!N)return F(`Album ${b} not found`),!1;if(N.photos.length===0)return alert(t('The album "{{albumName}}" has no photos to save.',{albumName:N.name})),!1;if(!l)return F(`No Cognito username available for album ${b}`),!1;F(`Starting real save for album: ${N.name}`),u(B=>B.map(H=>H.id===b?{...H,isSaving:!0,savingProgress:5}:H));try{const B=Math.floor(Date.now()/1e3),H=`${l}_____${bt()}____Folder`,ie=`${l}_____${l}____Account`,ue=H.split("_____")[1].split("____")[0];F(`Album ${b} folder ID: ${H}`),u(y=>y.map(v=>v.id===b?{...v,folderId:H}:v));const ke=Gt(B,ie,ue,H,l,N.isOnPublicProfile,N.participantsCanAddItems,N.participantsCanDeleteItems,N.passwordProtectionOption,N.albumPassword,N.name,N.description,!1,[],F),Te=N.photos.filter(y=>y.status==="complete");F(`Album ${b}: ${Te.length} valid photos`);let f=[];if(Te.length>0){const y=Te.filter(v=>!v.fileId);y.length>0&&(F(`Album ${b}: Moving ${y.length} files to public folder`),A(b,t("Moving files...")),await jt(y,v=>K(b,v),F)),F(`Album ${b}: Creating file reference inputs`),f=Wt(Te,B,ie,H,l,N.photoTagsMap,F)}return await U(b,ke,f),u(y=>y.map(v=>v.id===b?{...v,isSaving:!1,savingProgress:100}:v)),F(`Successfully saved album: ${N.name}`),!0}catch(B){return console.error(`Error saving album ${b}:`,B),F(`Error saving album ${b}: ${B}`),u(H=>H.map(ie=>ie.id===b?{...ie,isSaving:!1,savingProgress:0}:ie)),alert(t('Failed to save album "{{albumName}}". Please try again.',{albumName:N.name})),!1}},M=async()=>{if(J!=null&&J.startsWith("Profile-")){j(""),te(!0);return}if(!l){alert(t("Unable to determine user credentials. Please refresh and try again."));return}const b=n.filter(B=>B.savingProgress<100);if(b.length===0)return;F(`Starting save process for ${b.length} albums`),R(!0),w(b.length),Q(0);const N=[];try{for(let B=0;B<b.length;B++){const H=b[B];Q(B+1),re(H.name),F(`Saving album ${B+1} of ${b.length}: ${H.name}`),await G(H.id)||N.push(H.name),await new Promise(ee=>setTimeout(ee,200))}if(N.length===0)F("All albums saved successfully, cleaning up and redirecting"),setTimeout(()=>{localStorage.removeItem(he.MULTI_ALBUM_DATA),Le(),sessionStorage.setItem("album_just_saved","true"),Ee("my-albums.html")},1e3);else{const B=N.length===1?t('Failed to save album "{{albumName}}". Please try again.',{albumName:N[0]}):t("Failed to save {{count}} albums: {{albumNames}}. Please try again.",{count:N.length,albumNames:N.join(", ")});alert(B)}}catch(B){console.error("Error in save all albums:",B),alert(t("There was an error saving albums. Please try again."))}finally{R(!1),Q(0),w(0),re("")}},le=b=>{localStorage.setItem(he.PUBLIC_USERNAME,b),ne(b),te(!1),R(!1),Q(0),w(0),re(""),M()},ce=b=>{const N=n.find(B=>B.id===b);N&&(p(b),X(B=>({...B,passwordProtectionOption:N.passwordProtectionOption,albumPassword:N.albumPassword})),x(!0))},fe=()=>{p(null),x(!0)},we=(b,N)=>{b!==void 0&&N!==void 0&&(g?u(B=>B.map(H=>H.id===g?{...H,passwordProtectionOption:b,albumPassword:N}:H)):X(B=>({...B,passwordProtectionOption:b,albumPassword:N}))),x(!1),p(null)},ye=()=>{u(b=>b.map(N=>({...N,isOnPublicProfile:W.isOnPublicProfile,participantsCanAddItems:W.participantsCanAddItems,participantsCanDeleteItems:W.participantsCanDeleteItems,passwordProtectionOption:W.passwordProtectionOption,albumPassword:W.albumPassword}))),c(!1),F("Applied global settings to all albums",W)},Pe=b=>{const N=n.find(H=>H.id===b);if(N&&!confirm(t('Are you sure you want to remove the album "{{albumName}}"?',{albumName:N.name})))return;const B=n.filter(H=>H.id!==b);u(B),B.length===0&&(localStorage.removeItem(he.MULTI_ALBUM_DATA),Le(),Ee("my-albums.html"))},de=n.some(b=>b.isSaving)||O,Ie=n.some(b=>b.savingProgress<100);return e.jsxs(e.Fragment,{children:[e.jsx(Dt,{}),e.jsx("style",{children:`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}),e.jsx(Et,{children:e.jsxs(Ft,{style:{display:"flex",justifyContent:"space-between",alignItems:"center",flexDirection:s?"row-reverse":"row"},children:[e.jsx("div",{style:{order:s?2:1,textAlign:s?"right":"left"},children:e.jsx(Nt,{onClick:()=>Ee(_t("my-albums.html")),children:t("← Back To Albums")})}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",order:s?1:2,flexDirection:s?"row-reverse":"row"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx(fi,{children:t("Columns:")}),e.jsxs(gi,{value:h,onChange:b=>P(b.target.value),disabled:de,children:[e.jsx("option",{value:"1",children:"1"}),e.jsx("option",{value:"2",children:"2"}),e.jsx("option",{value:"3",children:"3"}),e.jsx("option",{value:"4",children:"4"}),e.jsx("option",{value:"5",children:"5"})]})]}),e.jsxs("div",{style:{position:"relative"},children:[e.jsx(cs,{onClick:()=>c(!o),disabled:de,title:t("Global Settings for All Albums")}),e.jsx(Tr,{showGlobalGear:o,globalSettings:W,setGlobalSettings:X,onPasswordClick:fe,onApplySettings:ye})]}),Ie&&e.jsx(Ke,{$primary:!0,onClick:M,disabled:de,style:{minWidth:"160px",fontSize:"14px",padding:"8px 16px"},children:O?t("Saving {{current}} of {{total}}...",{current:k,total:se}):n.length===1?t("Save 1 Album"):t("Save {{count}} Albums",{count:n.filter(b=>b.savingProgress<100).length})})]})]})}),e.jsxs(Rt,{$isRTL:s,children:[O&&e.jsxs("div",{style:{marginBottom:"24px",padding:"20px",backgroundColor:"#e3f2fd",border:"2px solid #2196f3",borderRadius:"12px",boxShadow:"0 4px 12px rgba(33, 150, 243, 0.1)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"16px",marginBottom:"16px"},children:[e.jsx("div",{style:{width:"24px",height:"24px",border:"3px solid #e3f2fd",borderTop:"3px solid #2196f3",borderRadius:"50%",animation:"spin 1s linear infinite"}}),e.jsxs("div",{children:[e.jsxs("div",{style:{fontSize:"16px",fontWeight:"600",color:"#1565c0",marginBottom:"4px"},children:[t("Saving Albums")," (",k," / ",se,")"]}),e.jsx("div",{style:{fontSize:"14px",color:"#1976d2"},children:t("Currently saving: {{albumName}}",{albumName:L})})]})]}),e.jsx("div",{style:{width:"100%",height:"8px",backgroundColor:"#bbdefb",borderRadius:"4px",overflow:"hidden"},children:e.jsx("div",{style:{width:`${k/se*100}%`,height:"100%",backgroundColor:"#2196f3",transition:"width 0.3s ease",borderRadius:"4px"}})}),e.jsx("div",{style:{marginTop:"8px",fontSize:"12px",color:"#1976d2",textAlign:"center"},children:t("Please wait while your albums are being saved...")})]}),e.jsx(pi,{albums:n,setAlbums:u,isSavingAny:de,onSaveAlbum:G,onRemoveAlbum:Pe,onShowPasswordDialog:ce,columns:h,setColumns:P,enhancedLog:F})]}),e.jsx(ds,{isOpen:d,onClose:we,initialOption:g?((_e=n.find(b=>b.id===g))==null?void 0:_e.passwordProtectionOption)||"NoPassword":W.passwordProtectionOption,initialPassword:g?((Ae=n.find(b=>b.id===g))==null?void 0:Ae.albumPassword)||"":W.albumPassword}),e.jsx(Ot,{t,language:r,usernameManager:oe,onSuccess:le})]})},mi=()=>{const[t,r]=i.useState(!1),[s,n]=i.useState(!1);return i.useEffect(()=>{if(typeof window<"u"){const h=new URLSearchParams(window.location.search).get("mode");r(h==="multiple"),n(!0)}},[]),s?t?e.jsx(hi,{}):e.jsx($t,{}):e.jsx($t,{})},xi=()=>e.jsx(Ws,{children:e.jsx(mi,{})});if(typeof document<"u"){const t=document.getElementById("root");t&&Gs.createRoot(t).render(e.jsx(xi,{}))}
