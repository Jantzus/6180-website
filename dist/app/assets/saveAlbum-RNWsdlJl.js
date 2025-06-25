import{h as be,f as _e,r as a,L as he,i as gt,s as Ns,k as _s,l as Rs,m as zs,a as Re,n as jt,d as P,o as $e,u as ge,j as e,g as Fe,p as Os,R as Ms,I as Bs}from"./utils-2qV3otm0.js";import{F as Us}from"./types-CyPfckSQ.js";import{u as Gs,U as Ws}from"./UploadProgress-r2mYk3JH.js";import{u as Ct,U as Dt}from"./UsernamePrompt-cxZeoDNA.js";import{L as Ks}from"./LazyImage-Ddix0i_I.js";import{P as Hs,S as qs,e as Js,V as Qs,f as Vs,g as Et,h as Ft,M as Ys,C as Nt,i as Xs,j as Zs,F as ht,k as mt,l as Ls,m as er,G as _t,n as Rt,o as zt,p as Ot,B as at,q as Mt,r as tr,s as sr,t as rr}from"./styled-components-UVQg2Kys.js";import{g as xt,c as Xe}from"./folderStructureUtils-BmdkosLC.js";const ar=`
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
`,ir=`
  mutation MyMutation($folderPositionInputs: [FolderPositionInput!]) {
    changeFiles(folderPositionInputs: $folderPositionInputs) {
      items {
        id
      }
    }
  }
`,or=`
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
`,nr=`
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
`,lr=`
  mutation DeleteFileReferences($deletedFileReferenceIds: [ID!]!) {
    changeFiles(deletedFileReferenceIds: $deletedFileReferenceIds) {
      items {
        id
      }
    }
  }
`;class Ee{static async fetchFolderDetails(r,s){var n,u,g,i,o,c;s(`Fetching details for folder ID: ${r}`);try{const d=await be();if(!d)return s("No token available for fetching folder details"),null;s("Sending GraphQL query to fetch folder details");const h=await(await fetch(_e,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${d}`},body:JSON.stringify({query:ar,variables:{folderIds:[r],fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(s("Folder details API response:",h),h.errors)return console.error("GraphQL errors:",h.errors),s(`GraphQL errors: ${JSON.stringify(h.errors)}`),null;const p=((u=(n=h==null?void 0:h.data)==null?void 0:n.fetchFolders)==null?void 0:u.items)||[];if(s(`Found ${p.length} folder items`),p.length===0)return s("No folder items found"),null;const l=p[0];s("Retrieved folder data:",l);const y=l.folderPosition,O=y==null?void 0:y.profileIds,z=Array.isArray(O)&&O.some(te=>te.includes("Public____Profile"))||!1;s(`Folder is on public profile: ${z}`),s("Profile IDs:",O);const I=(g=l.folderInviteParameters)==null?void 0:g.usingFolderInviteGrantsRightToAddItems;s(`Participants can add items: ${I}`);const Q=(i=l.folderInviteParameters)==null?void 0:i.usingFolderInviteGrantsRightToRemoveItems;return s(`Participants can delete items: ${Q}`),{creatorId:l.creatorId||"",folderName:l.folderName||"",folderDescription:l.folderDescription||"",passwordPolicy:((o=l.folderPassword)==null?void 0:o.policy)||"NoPassword",password:((c=l.folderPassword)==null?void 0:c.password)||"",isOnPublicProfile:z,participantsCanAddItems:I!==void 0?I:!0,participantsCanDeleteItems:Q!==void 0?Q:!1}}catch(d){return console.error("Error in fetchFolderDetails:",d),s(`Error in fetchFolderDetails: ${d}`),null}}static async saveFolderOnly(r,s){var g,i;s("Sending folder-only mutation (no file references, no folder tags)");const n=await be();if(!n)throw s("No token available for saving album, aborting"),new Error("Authentication token not available");const u={folderPositionInputs:[r]};s("GraphQL folder-only mutation variables:",u);try{s("Sending API request to save folder");const o=await fetch(_e,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({query:ir,variables:u})});s(`API response status: ${o.status}`);const c=await o.text();s(`API response raw text: ${c}`);const d=JSON.parse(c);if(s("API response JSON:",d),d.errors)throw console.error("Folder save failed:",d.errors),s("Folder save failed with errors:",d.errors),new Error("Failed to save folder");return s("Folder saved successfully"),((i=(g=d.data)==null?void 0:g.changeFiles)==null?void 0:i.items)||[]}catch(o){throw console.error("Error in saveFolderOnly:",o),s(`Error in saveFolderOnly: ${o}`),o}}static async saveFileReferences(r,s){var g,i,o,c,d;s(`Sending file references-only mutation with ${r.length} items (each with individual tags and filenames)`);const n=await be();if(!n)throw s("No token available for saving file references, aborting"),new Error("Authentication token not available");const u={updatedFileReferenceInputs:r};s("GraphQL file references-only mutation variables (first item):",r.length>0?r[0]:"No items");try{s("Sending API request to save file references with individual tags and filenames");const m=await fetch(_e,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({query:or,variables:u})});s(`API response status: ${m.status}`);const h=await m.text();s(`API response raw text: ${h.substring(0,500)}...`);const p=JSON.parse(h);if(s("API response JSON items count:",((o=(i=(g=p.data)==null?void 0:g.changeFiles0)==null?void 0:i.items)==null?void 0:o.length)||0),p.errors)throw console.error("File references save failed:",p.errors),s("File references save failed with errors:",p.errors),new Error("Failed to save file references");return s("File references chunk saved successfully with individual photo tags and filenames"),((d=(c=p.data)==null?void 0:c.changeFiles0)==null?void 0:d.items)||[]}catch(m){throw console.error("Error in saveFileReferences:",m),s(`Error in saveFileReferences: ${m}`),m}}static async saveFinalChunkWithFolder(r,s,n){var i,o,c,d,m,h,p,l,y;n(`Sending final chunk with folder mutation (${r.length} file references with filenames, no folder tags)`);const u=await be();if(!u)throw n("No token available for saving final chunk, aborting"),new Error("Authentication token not available");const g={folderPositionInputs:[s],updatedFileReferenceInputs:r};n("GraphQL final mutation variables (folder + last chunk with filenames, no folder tags)");try{n("Sending API request for final save with folder (no folder tags, with filenames)");const O=await fetch(_e,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${u}`},body:JSON.stringify({query:nr,variables:g})});n(`API response status: ${O.status}`);const z=await O.text();n(`API response raw text: ${z.substring(0,500)}...`);const I=JSON.parse(z);if(n("API response JSON:",{fileReferencesCount:((c=(o=(i=I.data)==null?void 0:i.changeFiles0)==null?void 0:o.items)==null?void 0:c.length)||0,folderItems:((m=(d=I.data)==null?void 0:d.changeFiles)==null?void 0:m.items)||[]}),I.errors)throw console.error("Final save failed:",I.errors),n("Final save failed with errors:",I.errors),new Error("Failed to complete album save");return n("Final chunk and folder saved successfully (with individual photo tags and filenames)"),{fileReferences:((p=(h=I.data)==null?void 0:h.changeFiles0)==null?void 0:p.items)||[],folderPositions:((y=(l=I.data)==null?void 0:l.changeFiles)==null?void 0:y.items)||[]}}catch(O){throw console.error("Error in saveFinalChunkWithFolder:",O),n(`Error in saveFinalChunkWithFolder: ${O}`),O}}static async deleteFileReferences(r,s){var g,i;s(`Deleting ${r.length} file references: ${r.join(", ")}`);const n=await be();if(!n)throw s("No token available for deleting file references, aborting"),new Error("Authentication token not available");const u={deletedFileReferenceIds:r};s("GraphQL delete file references mutation variables:",u);try{s("Sending API request to delete file references");const o=await fetch(_e,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({query:lr,variables:u})});s(`API response status: ${o.status}`);const c=await o.text();s(`API response raw text: ${c}`);const d=JSON.parse(c);if(s("API response JSON:",d),d.errors)throw console.error("File references deletion failed:",d.errors),s("File references deletion failed with errors:",d.errors),new Error("Failed to delete file references");return s(`Successfully deleted ${r.length} file references`),((i=(g=d.data)==null?void 0:g.changeFiles)==null?void 0:i.items)||[]}catch(o){throw console.error("Error in deleteFileReferences:",o),s(`Error in deleteFileReferences: ${o}`),o}}}const cr=(t,r,s,n,u,g,i,o,c,d,m,h,p,l)=>{const[y,O]=a.useState(null),[z,I]=a.useState(null),[Q,te]=a.useState(!1),[w,Z]=a.useState(!1),[se,W]=a.useState(!1),Y=a.useRef(!1),oe=a.useRef(!1),ee=a.useRef(!1);a.useEffect(()=>{Z(!0)},[]);const k=a.useCallback(A=>{if(!w)return null;try{return localStorage.getItem(A)}catch{return null}},[w]),J=a.useCallback(async()=>{if(!(Y.current||!w)){Y.current=!0,l("Starting component initialization");try{l("Checking login with refresh");const A=await be();if(!A){l("No token returned from login check, aborting initialization");return}try{const K=k(he.PUBLIC_USERNAME);l(`Retrieved public username from localStorage: ${K||"null"}`),I(K||null);const G=JSON.parse(atob(A.split(".")[1]))["cognito:username"];G?(l(`Extracted Cognito username from token: ${G}`),O(G)):l("No Cognito username found in token")}catch(K){console.error("User data initialization error:",K),l(`User data initialization error: ${K}`)}l("Component initialization completed")}catch(A){console.error("Initialization error:",A),l(`Initialization error: ${A}`)}finally{te(!0)}}},[w,l,k]),ne=a.useCallback(async A=>{var K;if(!(oe.current||!w)){oe.current=!0,l(`Initializing folder ID with username: ${A}`);try{const G=new URLSearchParams(window.location.search).get("folderId");if(l(`Folder ID from URL: ${G||"null"}`),G){t(G),W(!0),l(`Using existing folder ID: ${G}`),s(!0),n(!0);try{l(`Fetching details for existing folder: ${G}`);const M=await Ee.fetchFolderDetails(G,l);if(M){u(M.folderName),g(M.folderDescription),i(M.isOnPublicProfile),M.participantsCanAddItems!==void 0&&o(M.participantsCanAddItems),M.participantsCanDeleteItems!==void 0&&p(M.participantsCanDeleteItems);const le=M.passwordPolicy;c(le),le!=="NoPassword"&&M.password&&d(M.password)}}catch(M){console.error("Error fetching folder details:",M),l(`Error fetching folder details: ${M}`)}}else{W(!1);const M=k(he.SUB_ALBUM_DATA);if(M)try{const ce=JSON.parse(M);if(ce.isSubAlbum&&((K=ce.selectedFileIds)==null?void 0:K.length)>0){l(`Valid sub-album data found with ${ce.selectedFileIds.length} files`),m(!0),h(ce.selectedFileIds),ce.selectedPhotos&&ce.selectedPhotos.length>0&&r(ce.selectedPhotos),n(!0),s(!0);const fe=`${A}_____${gt()}____Folder`;t(fe),l(`Created new folder ID for sub-album: ${fe}`);return}}catch(ce){console.error("Error parsing sub-album data:",ce),l(`Error parsing sub-album data: ${ce}`)}const le=`${A}_____${gt()}____Folder`;l(`Creating new folder ID: ${le}`),t(le),s(!0),n(!0)}}catch(U){console.error("Folder ID initialization error:",U),l(`Folder ID initialization error: ${U}`),s(!1)}}},[w,l,k,t,s,n,u,g,i,o,p,c,d,m,h,r,W]),F=a.useCallback(()=>{if(!(!w||ee.current)){ee.current=!0,l("Attempting to restore photos from localStorage");try{const A=k(he.SELECTED_PHOTOS);if(A)try{const K=JSON.parse(A);l(`Parsed ${K.length} photos from localStorage`),Array.isArray(K)&&K.length>0&&(r(K),l(`Restored ${K.length} photos to state`))}catch(K){console.error("Error parsing stored photos:",K),l(`Error parsing stored photos: ${K}`)}}catch(A){console.error("Error restoring photos from storage:",A),l(`Error restoring photos from storage: ${A}`)}}},[w,l,k,r]),S=a.useCallback(()=>{l("Testing S3 connection");try{l(Ns?"S3 client is available":"S3 client not available")}catch(A){console.error("S3 connection test error:",A),l(`S3 connection test error: ${A}`)}},[l]);return a.useEffect(()=>{w&&J()},[w,J]),a.useEffect(()=>{y&&!oe.current&&ne(y)},[y,ne]),a.useEffect(()=>{w&&(F(),S())},[w,F,S]),{cognitoUsername:y,publicUsername:z,setPublicUsername:I,isInitialized:Q,isExistingAlbum:se}},Bt=t=>t.map(r=>({TagType:r.TagType,tagTitle:r.tagTitle,subtags:r.subtags.map(s=>({TagType:r.TagType,tagTitle:s.tagTitle,subtagTitle:s.subtagTitle}))})),Ut=t=>{const r=new Set;return t.filter(s=>r.has(s.fileId)?!1:(r.add(s.fileId),!0))},Gt=(t,r)=>{const s=[];for(let n=0;n<t.length;n+=r)s.push(t.slice(n,n+r));return s},Wt=(t,r,s,n,u,g,i,o,c,d,m,h,p,l,y)=>{y("Creating folder position input WITHOUT folder-level tags"),y(`Profile visibility: ${g?"Public":"Only Me"}`);const O=g?[`${u}_____Public____Profile`]:["Only Me_____Only Me____Profile"];y(`Profile IDs: ${JSON.stringify(O)}`);let z=[];p&&l.length>0&&(y(`Creating file reference IDs for ${l.length} sub-album files`),z=l.map(w=>{const Z=w.split("_____");if(Z.length>=2){const W=Z[1].split("____")[0],Y=`${s}_____${W}____FileReference`;return y(`Created file reference ID for sub-album: ${Y}`),Y}return y(`Using original fileId as fallback: ${w}`),w})),y(`Created ${z.length} acceptedFileReferenceIds`);const I=c!=="NoPassword"?d:null;if(y(`Password protection: ${c}`),y(`Album password: ${I?"******":"null"}`),y(`Participants can add items: ${i}`),y(`Participants can delete items: ${o}`),!n)throw y("Error: folderId is null or undefined"),new Error("folderId is required to create folder position input");const Q=_s(n),te=Rs(Q);return{currentTime:t,folderId:n,profileIds:O,folderPositionPoints:1,acceptedFileReferenceIds:z,folderInput:{folderAboutContactIds:[r],albumNanoId:te,folderName:m,folderDescription:h,folderPasswordInput:{password:I,policy:c},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:i,usingFolderInviteGrantsRightToRemoveItems:o,addedItemsNeedFolderCreatorApproval:!1}}}},Kt=(t,r,s,n,u,g,i)=>(i(`Creating file reference inputs with individual photo tags and original filenames for ${t.length} photos`),t.map((o,c)=>{var O;const d=g.get(c)||[],m=Bt(d),h=o.originalFileName||o.fileName;if(i(`Photo ${c} (${o.fileName}): ${d.length} tags applied, display name: ${h}`),o.fileId)return i(`Using existing fileId for photo: ${o.fileId}`),{fileReferencesHolderId:n,currentTime:r,points:1,hasBeenDeleted:!1,selectedTagInputs:m,fileId:o.fileId,fileDisplayName:h,fileInput:null};const p=o.type==="video"||(O=o.type)!=null&&O.startsWith("video")?`Input/Video/${o.fileName}`:`Input/Image/${o.fileName}`,l=`${u}_____${o.fileName}____File`;i(`Created file reference for ${o.fileName}:`),i(`  - dataKey: ${p}`),i(`  - fileId: ${l}`),i(`  - fileDisplayName: ${h}`),i(`  - thumbnailDataKey: ${o.thumbnailDataKey||"undefined"}`),i(`  - size: ${o.size}`),i(`  - thumbnailSize: ${o.thumbnailSize||0}`),i(`  - duration: ${o.duration||"undefined"}`),i(`  - tags: ${d.length} tags selected for this photo`);const y={fileId:l,ownerFileInput:{editorContactIds:[s],FileSharingOptionsEnum:"Anyone",dataKey:p,thumbnailDataKey:o.thumbnailDataKey,dataInBytes:o.size,thumbnailDataInBytes:o.thumbnailSize||0,s3UploadedAt:r,durationInSeconds:o.duration},editorFileInput:{aboutContactIds:[s],captionText:"",numericFilterInputs:[]}};return{fileReferencesHolderId:n,currentTime:r,points:1,hasBeenDeleted:!1,selectedTagInputs:m,fileId:l,fileDisplayName:h,fileInput:y}})),dr=(t,r,s,n,u,g,i)=>{const o=[];return u.forEach(c=>{const d=g.get(c)||[];if(d.length>0){const m=n[c];if(m){const h=m.dataKey.split("/"),p=h[h.length-1],l=`${s}_____${p}____File`,y=m.fileName||p,O=Bt(d);i(`Creating file reference for existing file ${c} (${p}) with ${d.length} tags, display name: ${y}`),o.push({fileReferencesHolderId:r,currentTime:t,points:1,hasBeenDeleted:!1,selectedTagInputs:O,fileId:l,fileDisplayName:y,fileInput:null})}}}),i(`Created ${o.length} file references for existing files with tags and filenames`),o},ur=(t,r,s,n,u,g,i,o,c,d,m,h,p,l,y,O,z,I,Q,te,w,Z)=>{const[se,W]=a.useState(!1),Y=a.useRef(!1);a.useEffect(()=>{W(!0)},[]);const oe=a.useCallback(()=>(w("Validating required data"),r?t?(w("All required data validated successfully"),!0):(w("No folder ID, validation failed"),!1):(w("No Cognito username, validation failed"),!1)),[r,t,w]),ee=a.useCallback(S=>{if(w(`Save progress text: ${S}`),!!se)try{const A=document.getElementById("saveProgressText");A&&(A.innerText=S)}catch(A){w(`Failed to update progress text in DOM: ${A}`)}},[se,w]),k=a.useCallback(S=>{if(se)try{const A=document.getElementById("saveProgress");A&&(A.style.width=`${S}%`,w(`Updated save progress bar: ${S}%`))}catch(A){w(`Failed to update progress bar: ${A}`)}I(S)},[se,I,w]),J=a.useCallback(()=>{if(w("Handling successful save"),zs(Q,te,[he.SELECTED_PHOTOS,he.SUB_ALBUM_DATA],w),ee(Z("Album saved successfully!")),se)try{sessionStorage.setItem("album_just_saved","true"),w("Set 'album_just_saved' flag in sessionStorage")}catch(S){w(`Failed to set sessionStorage flag: ${S}`)}w("Setting timeout for redirect to my-albums.html"),setTimeout(()=>{w("Redirecting to my-albums.html"),Re("my-albums.html")},1e3)},[w,Q,te,ee,Z,se]),ne=a.useCallback(async(S,A)=>{w("Starting chunked save process");try{ee(Z("Processing files in chunks..."));const K=48;if(A.length===0)w("No file references to process, saving only folder position"),await Ee.saveFolderOnly(S,w);else{const U=Ut(A);w(`Processing ${U.length} unique file references`);const G=Gt(U,K);w(`Split file references into ${G.length} chunks`);for(let M=0;M<G.length;M++){const le=G[M];w(`Processing chunk ${M+1} of ${G.length}`);const ce=M/G.length*80;k(10+ce),M<G.length-1?(ee(Z("Saving files: chunk {{chunkNumber}} of {{totalChunks}}...",{chunkNumber:M+1,totalChunks:G.length})),await Ee.saveFileReferences(le,w)):(ee(Z("Finalizing album...")),await Ee.saveFinalChunkWithFolder(le,S,w))}}k(100),ee(Z("Album saved successfully!")),J()}catch(K){console.error("Error in chunked save process:",K),w(`Error in chunked save process: ${K}`),ee(Z("Error: {{error}}",{error:String(K)})),z(!1),Y.current=!1}},[w,ee,Z,k,J,z]);return{saveAlbumDirectly:a.useCallback(async()=>{if(Y.current){w("Save already in progress, skipping duplicate call");return}Y.current=!0,w("Starting direct album save"),z(!0),I(5);try{if(!oe()){w("Required data validation failed, aborting save");return}const S=Math.floor(Date.now()/1e3),A=`${r}_____${r}____Account`,U=t.split("_____")[1].split("____")[0];w(`Save timestamp: ${S}`),w(`Account ID: ${A}`),w(`Folder ID: ${t}`);const G=Wt(S,A,U,t,r,o,c,d,m,h,g,i,n,u,w);let M=[];const le=s.filter(fe=>fe.status==="complete");if(w(`Found ${le.length} valid photos`),le.length>0){const fe=le.filter(ye=>!ye.fileId);fe.length>0&&(w("Moving files from temp to public folder"),await jt(fe,k,w));const we=Kt(le,S,A,t,r,p,w);M=M.concat(we)}const ce=dr(S,t,r,y,O,l,w);if(ce.length>0&&(M=M.concat(ce)),n&&u.length>0){const fe=u.map(we=>{const ye=we.split("_____"),Pe=ye.length>=2?ye[1].split("____")[0]:we;return{fileReferencesHolderId:t,currentTime:S,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:we,fileDisplayName:Pe,fileInput:null}});M=M.concat(fe)}w(`Total file reference inputs: ${M.length}`),await ne(G,M)}catch(S){console.error("Error in saveAlbumDirectly:",S),w(`Error in saveAlbumDirectly: ${S}`),z(!1)}finally{Y.current=!1}},[oe,r,t,o,c,d,m,h,g,i,n,u,s,p,y,O,l,w,z,I,k,ne])}},pr=P.div`
  margin: 32px 0;
`,Ht=P.div`
  margin-bottom: 24px;
`,qt=P.h3`
  margin: 0 0 16px 0;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  display: flex;
  align-items: center;
  gap: 12px;
`,Jt=P.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  min-height: 32px;
`,Qt=P.button`
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
`,fr=P(Qt)`
  font-size: 12px;
  padding: 6px 12px;
  border-radius: 16px;
`,Vt=P.button`
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
`,gr=P.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 16px;
`,Yt=P.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 16px;
`,Xt=P.button`
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
`,hr=P.div`
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
`,mr=P.input`
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
`,bt=P.button`
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
`,Zt=()=>{const[t,r]=a.useState(!1);return a.useEffect(()=>{const s=()=>{const u="ontouchstart"in window||navigator.maxTouchPoints&&navigator.maxTouchPoints>0||navigator.msMaxTouchPoints&&navigator.msMaxTouchPoints>0;r(u)};s();const n=()=>{s()};return window.addEventListener("resize",n),()=>{window.removeEventListener("resize",n)}},[]),t},Lt=$e.memo(({tag:t,isApplied:r,isDisplayed:s,isBeingDeleted:n,disabled:u,onTagClick:g,onDeleteTag:i,displayText:o})=>{const{t:c}=ge(),[d,m]=a.useState(!1),h=Zt(),p=a.useCallback(()=>{g(t)},[g,t]),l=a.useCallback(O=>{O.stopPropagation(),i(t.id)},[i,t.id]),y=h?s&&!u&&!n:d&&s&&!u&&!n;return e.jsxs(Qt,{$isApplied:r,$isDisplayed:s,$isBeingDeleted:n,disabled:u,onClick:p,onMouseEnter:()=>!h&&s&&m(!0),onMouseLeave:()=>!h&&s&&m(!1),children:[e.jsx("span",{style:{paddingRight:y?"20px":"0"},children:o}),y&&e.jsx(Vt,{$isMobile:h,onClick:l,disabled:n,title:c("Delete tag"),children:"×"})]})});Lt.displayName="TagWithDelete";const es=$e.memo(({subtag:t,isApplied:r,isBeingDeleted:s,disabled:n,onSubtagClick:u,onDeleteSubtag:g})=>{const{t:i}=ge(),[o,c]=a.useState(!1),d=Zt(),m=a.useCallback(()=>{u(t)},[u,t]),h=a.useCallback(l=>{l.stopPropagation(),g(t.id)},[g,t.id]),p=d?r&&!n&&!s:o&&r&&!n&&!s;return e.jsxs(fr,{$isApplied:r,$isBeingDeleted:s,disabled:n,onClick:m,onMouseEnter:()=>!d&&r&&c(!0),onMouseLeave:()=>!d&&r&&c(!1),children:[e.jsx("span",{style:{paddingRight:p?"20px":"0"},children:t.subtagTitle}),p&&e.jsx(Vt,{$isMobile:d,onClick:h,disabled:s,title:i("Delete subtag"),children:"×"})]})});es.displayName="SubtagWithDelete";const it=$e.memo(({value:t,onChange:r,onSubmit:s,onCancel:n,isSubmitting:u,placeholder:g="Enter tag name..."})=>{const{t:i}=ge(),o=a.useRef(null);a.useEffect(()=>{o.current&&o.current.focus()},[]);const c=a.useCallback(m=>{m.key==="Enter"?s():m.key==="Escape"&&n()},[s,n]),d=a.useCallback(m=>{r(m.target.value)},[r]);return e.jsxs(hr,{children:[e.jsx(mr,{ref:o,type:"text",value:t,onChange:d,onKeyDown:c,placeholder:i(g),disabled:u}),e.jsx(bt,{onClick:s,disabled:!t.trim()||u,title:i("Add (Enter)"),children:u?"...":"✓"}),e.jsx(bt,{onClick:n,disabled:u,title:i("Cancel (Escape)"),children:"×"})]})});it.displayName="NewTagInput";const ot=$e.memo(({tagsManager:t,disabled:r=!1,enhancedLog:s})=>{const{t:n}=ge(),{tags:u,displayedTagId:g,isLoadingTags:i,tagIdBeingDeleted:o,isAddingNewTag:c,newTagTitle:d,isSubmittingNewTag:m,toggleTagOnSelectedFiles:h,setDisplayedTag:p,isTagAppliedToSelected:l,deleteTag:y,startAddingNewTag:O,cancelAddingNewTag:z,submitNewTag:I,setNewTagTitle:Q,getAppliedTagsForSelected:te,hasSelectedFiles:w}=t;if(!w())return null;const Z=a.useCallback(k=>{if(!l(k))return k.tagTitle;const F=te().find(A=>A.tagTitle===k.tagTitle);if(!F||F.subtags.length===0)return k.tagTitle;const S=F.subtags.map(A=>A.subtagTitle).join(" || ");return n("{{tagTitle}}  |  {{subtags}}",{tagTitle:k.tagTitle,subtags:S})},[l,te,n]),se=a.useMemo(()=>u.map(k=>({tag:k,isApplied:l(k),isDisplayed:g===k.id,isBeingDeleted:o===k.id,displayText:Z(k)})),[u,l,g,o,Z]),W=a.useCallback(k=>{if(r)return;const J=l(k);s(`Tag "${k.tagTitle}" clicked - current state: ${J?"applied to all":"not applied to all"}`),h(k),k.subtags&&k.subtags.length>0&&p(J?null:k.id),s(`After toggle - new state: ${J?"removed from all":"applied to all"}`)},[r,l,s,h,p]),Y=a.useCallback(async k=>{if(r)return;s(`Delete tag initiated: ${k}`);const J=await y(k);s(J?`Tag successfully deleted: ${k}`:`Failed to delete tag: ${k}`)},[r,s,y]),oe=a.useCallback(async()=>{await I()||s("Failed to submit new tag")},[I,s]),ee=a.useMemo(()=>[...se].sort((k,J)=>k.tag.points!==J.tag.points?J.tag.points-k.tag.points:J.tag.updatedAt-k.tag.updatedAt),[se]);return a.useEffect(()=>{const k=u.filter(ne=>l(ne)),J=te();s(`TagsDisplay render - ${k.length} tags applied to all selected files`),s("Applied tags with subtags:",J)},[u.length,te,s]),e.jsxs(pr,{children:[e.jsxs(Ht,{children:[e.jsx(qt,{children:n("Apply tags to selected files")}),e.jsx(Jt,{children:i?e.jsx(gr,{children:n("Loading tags...")}):e.jsxs(e.Fragment,{children:[ee.map(({tag:k,isApplied:J,isDisplayed:ne,isBeingDeleted:F,displayText:S})=>e.jsx(Lt,{tag:k,isApplied:J,isDisplayed:ne,isBeingDeleted:F,disabled:r,onTagClick:W,onDeleteTag:Y,displayText:S},k.id)),c?e.jsx(it,{value:d,onChange:Q,onSubmit:oe,onCancel:z,isSubmitting:m,placeholder:n("Enter tag name...")}):e.jsx(Xt,{disabled:r,onClick:O,children:n("+ Add Tag")}),ee.length===0&&!c&&e.jsx(Yt,{children:n("No tags available")})]})})]}),g&&e.jsx(ts,{tagsManager:t,disabled:r,enhancedLog:s}),e.jsx("div",{style:{marginTop:"24px",padding:"20px 24px",background:"linear-gradient(135deg, #e7f3ff 0%, #f0f8ff 100%)",borderRadius:"12px",fontSize:"13px",color:"#0c5aa6",border:"1px solid #b3d9ff",boxShadow:"0 4px 12px rgba(0, 123, 255, 0.08)"},children:e.jsxs("div",{style:{lineHeight:"2.2"},children:[e.jsxs("div",{style:{marginBottom:"8px"},children:[e.jsx("strong",{style:{color:"#28a745"},children:"🟢"}),"  ",n("Most recently clicked tag (showing subtags)")]}),e.jsxs("div",{style:{marginBottom:"8px"},children:[e.jsx("strong",{style:{color:"#333333"},children:"⚫"}),"  ",n("Applied to selected files")]}),e.jsxs("div",{children:[e.jsx("strong",{style:{color:"#6c757d"},children:"⚪"}),"  ",n("Available but not applied to all selected files")]})]})})]})});ot.displayName="TagsDisplay";const ts=$e.memo(({tagsManager:t,disabled:r=!1,enhancedLog:s})=>{const{t:n}=ge(),{displayedTagId:u,subtagIdBeingDeleted:g,isAddingNewSubtag:i,newSubtagTitle:o,isSubmittingNewSubtag:c,toggleSubtagOnSelectedFiles:d,isSubtagAppliedToSelected:m,deleteSubtag:h,startAddingNewSubtag:p,cancelAddingNewSubtag:l,submitNewSubtag:y,setNewSubtagTitle:O,tags:z}=t,I=a.useMemo(()=>{const W=z.find(k=>k.id===u);if(!W)return null;const ee=(W.subtags||[]).map(k=>({subtag:k,isApplied:m(k),isBeingDeleted:g===k.id})).sort((k,J)=>k.subtag.points!==J.subtag.points?J.subtag.points-k.subtag.points:J.subtag.updatedAt-k.subtag.updatedAt);return{displayedTag:W,subtagDisplayData:ee}},[z,u,m,g]),Q=a.useCallback(W=>{r||(s(`Subtag "${W.subtagTitle}" clicked - current state: ${m(W)?"applied to all":"not applied to all"}`),d(W))},[r,s,m,d]),te=a.useCallback(async W=>{if(r)return;s(`Delete subtag initiated: ${W}`);const Y=await h(W);s(Y?`Subtag successfully deleted: ${W}`:`Failed to delete subtag: ${W}`)},[r,s,h]),w=a.useCallback(async()=>{await y()||s("Failed to submit new subtag")},[y,s]);if(!I)return null;const{displayedTag:Z,subtagDisplayData:se}=I;return e.jsxs(Ht,{children:[e.jsx(qt,{children:n('Subtags for "{{tagTitle}}"',{tagTitle:Z.tagTitle})}),e.jsxs(Jt,{children:[se.map(({subtag:W,isApplied:Y,isBeingDeleted:oe})=>e.jsx(es,{subtag:W,isApplied:Y,isBeingDeleted:oe,disabled:r,onSubtagClick:Q,onDeleteSubtag:te},W.id)),i?e.jsx(it,{value:o,onChange:O,onSubmit:w,onCancel:l,isSubmitting:c,placeholder:n("Enter subtag name...")}):e.jsx(Xt,{disabled:r,onClick:p,children:n("+ Add Subtag")}),se.length===0&&!i&&e.jsx(Yt,{children:n("No subtags available")})]})]})});ts.displayName="SubtagsDisplay";const ss=$e.memo(({photoTags:t,isSelected:r=!1,onToggleSelection:s,fileName:n,showFileName:u=!1})=>{const{t:g}=ge();a.useEffect(()=>{const d="photo-tagging-animations";if(typeof document<"u"&&!document.getElementById(d)){const m=document.createElement("style");m.id=d,m.textContent=`
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
      `,document.head.appendChild(m)}},[]);const i=a.useMemo(()=>t.length===0?"":t.map(d=>{if(d.subtags.length>0){const m=d.subtags.map(h=>h.subtagTitle).join(", ");return g("{{tagTitle}}: {{subtags}}",{tagTitle:d.tagTitle,subtags:m})}return d.tagTitle}).join(" • "),[t,g]),o=t.length>0;return u&&n||o||r?e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"4px"},children:[u&&n&&e.jsx("div",{style:{fontSize:"11px",fontWeight:"600",color:"#333",padding:"4px 8px",backgroundColor:r?"#e3f2fd":"#f8f9fa",borderRadius:"4px",border:`1px solid ${r?"#90caf9":"#e9ecef"}`,textAlign:"center",wordBreak:"break-word",lineHeight:"1.2",transition:"all 0.2s ease"},children:n}),e.jsx("div",{style:{background:o?"linear-gradient(135deg, rgba(0, 123, 255, 0.95) 0%, rgba(0, 123, 255, 0.85) 100%)":"transparent",color:"white",padding:o?"8px 12px":"6px 12px",borderRadius:o?"8px":"6px",fontSize:o?"11px":"10px",cursor:s?"pointer":"default",backdropFilter:o?"blur(6px)":"none",boxShadow:o?"0 4px 12px rgba(0, 123, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)":"none",border:o?"1px solid rgba(255, 255, 255, 0.2)":"none",transition:"all 0.3s ease",lineHeight:"1.3",minHeight:o?"32px":"auto",display:"flex",alignItems:"center",wordBreak:"break-word"},onClick:s,onMouseEnter:d=>{o&&(d.currentTarget.style.transform="translateY(-1px)",d.currentTarget.style.boxShadow="0 6px 16px rgba(0, 123, 255, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3)")},onMouseLeave:d=>{o&&(d.currentTarget.style.transform="translateY(0)",d.currentTarget.style.boxShadow="0 4px 12px rgba(0, 123, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)")},children:o?e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",width:"100%",flexWrap:"wrap"},children:[e.jsx("span",{style:{fontSize:"12px",opacity:.9,flexShrink:0},children:"🏷️"}),e.jsx("span",{style:{fontWeight:"600",textShadow:"0 1px 2px rgba(0, 0, 0, 0.3)",flex:1},children:i})]}):e.jsx("div",{style:{opacity:1,fontStyle:"normal",textAlign:"center",width:"100%",fontSize:r?"11px":"10px",fontWeight:r?"600":"normal",background:r?"white":"transparent",color:r?"#007bff":"white",borderRadius:r?"6px":"0",padding:r?"8px 12px":"0",border:r?"1px solid #007bff":"none",boxShadow:r?"0 2px 8px rgba(0, 123, 255, 0.2)":"none",animation:r?"subtlePulse 2.5s infinite":"none"},children:r?e.jsxs("span",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"4px"},children:[e.jsx("span",{children:"👇"})," ",g("Scroll down to select tags")]}):e.jsx("span",{style:{opacity:.8,fontStyle:"italic"},children:g("No tags applied")})})})]}):null});ss.displayName="PhotoTagging";const xr=()=>{a.useEffect(()=>{if(typeof document>"u")return;const t="photo-handler-styles";if(document.getElementById(t))return;const r=document.createElement("style");r.id=t,r.textContent=`
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
    `,document.head.appendChild(r)},[])},wt={traditional:{padding:"20px",border:"2px dashed #007bff",borderRadius:"12px",backgroundColor:"#fff",boxShadow:"0 2px 8px rgba(0, 0, 0, 0.04)"},horizontal:{display:"flex",overflowX:"auto",gap:"16px",padding:"20px",border:"2px dashed #007bff",borderRadius:"12px",backgroundColor:"#fff",boxShadow:"0 2px 8px rgba(0, 0, 0, 0.04)",scrollbarWidth:"thin",scrollbarColor:"#007bff #f8f9fa",scrollBehavior:"smooth",WebkitOverflowScrolling:"touch"}},yt={traditional:{display:"flex",flexDirection:"column",gap:"8px",minWidth:"0"},horizontal:{display:"flex",flexDirection:"column",gap:"8px",minWidth:"180px",maxWidth:"180px",flexShrink:0}},nt=$e.memo(({selectedPhotos:t,selectedPhotoIndices:r,isSavingAlbum:s,onRemovePhoto:n,onTogglePhotoSelection:u,photoTagsMap:g,columns:i="1",isMultipleAlbumMode:o=!1})=>{const{t:c}=ge();xr();const d=a.useMemo(()=>{if(o&&i==="horizontal")return wt.horizontal;const p=parseInt(i,10),l=isNaN(p)||p<1?1:Math.min(p,5);return{...wt.traditional,display:"grid",gridTemplateColumns:`repeat(${l}, 1fr)`,gap:"16px"}},[o,i]),m=a.useMemo(()=>o&&i==="horizontal"?yt.horizontal:yt.traditional,[o,i]),h=a.useMemo(()=>o&&i==="horizontal"?"photo-card-horizontal":"photo-card-traditional",[o,i]);return t.length===0?null:e.jsx(e.Fragment,{children:e.jsx("div",{style:d,className:"photo-grid",children:t.map((p,l)=>{var z,I;const y=r.has(l),O=g.get(l)||[];return e.jsxs("div",{style:m,children:[e.jsxs(Hs,{"data-selected":y?"true":"false",className:`${h} ${y?"selected":""}`,onClick:()=>u(l),children:[y&&!s&&e.jsx("button",{onClick:Q=>{Q.stopPropagation(),confirm(c("Are you sure you want to remove this photo?"))&&n(l)},className:"photo-delete-button",title:c("Remove photo"),children:"×"}),p.status!=="complete"&&e.jsx(qs,{$status:p.status,children:p.status==="error"?"✕":p.status==="uploading"?"↑":p.status==="processing"?"⚙️":"•"}),e.jsxs(Js,{className:`media-preview ${y?"selected":""}`,children:[p.type==="video"||(z=p.type)!=null&&z.startsWith("video")?e.jsx(Qs,{src:p.s3PreviewUrl,controls:!0,className:"media-item"}):e.jsx(Vs,{src:p.s3PreviewUrl,alt:p.fileName,className:"media-item"}),(p.status==="uploading"||p.status==="processing")&&e.jsx(Et,{$bottom:"4px",$left:"4px",$right:"4px",$height:"4px",children:e.jsx(Ft,{$progress:p.progress,$status:p.status})})]}),e.jsxs("div",{className:"file-info-overlay",children:[(I=p.type)!=null&&I.startsWith("video")?c("Video"):c("Image"),p.size&&c(" • {{size}} MB",{size:(p.size/1024/1024).toFixed(1)}),p.duration&&c(" • {{duration}}s",{duration:p.duration})]}),o&&i==="horizontal"&&y&&e.jsx("div",{className:"selection-indicator",children:c("SELECTED")}),p.status==="error"&&p.errorMessage&&e.jsx(Ys,{$type:"error",children:c("Error: {{message}}",{message:p.errorMessage.length>40?p.errorMessage.substring(0,37)+"...":p.errorMessage})})]}),e.jsx("div",{className:`photo-info ${o&&i==="horizontal"?"horizontal":"traditional"}`,children:e.jsx(ss,{photoTags:O,isSelected:y,onToggleSelection:()=>u(l),fileName:p.originalFileName||p.fileName,showFileName:!0})})]},l)})})})});nt.displayName="PhotoHandler";const rs=$e.memo(({isSavingAlbum:t,savingProgress:r})=>{const{t:s}=ge();return t?e.jsxs(Nt,{children:[e.jsx(Xs,{children:s("Saving Album")}),e.jsx(Zs,{id:"saveProgressText",children:s("Moving files...")}),e.jsx(Et,{children:e.jsx(Ft,{id:"saveProgress",$progress:r/100})})]}):null});rs.displayName="SavingProgressComponent";const as=$e.memo(({showFolderDetails:t,isCreator:r,folderName:s,setFolderName:n,folderDescription:u,setFolderDescription:g,isSavingAlbum:i})=>{const{t:o}=ge();return!t||r!==!0?null:e.jsxs(Nt,{children:[e.jsxs(ht,{children:[e.jsx(mt,{htmlFor:"folderName",children:o("Album Name")}),e.jsx(Ls,{id:"folderName",type:"text",value:s,onChange:c=>n(c.target.value),placeholder:o("e.g. Family Vacation in Kyoto"),disabled:i})]}),e.jsxs(ht,{children:[e.jsx(mt,{htmlFor:"folderDescription",children:o("Album Description")}),e.jsx(er,{id:"folderDescription",value:u,onChange:c=>g(c.target.value),placeholder:o("e.g. what's special about this album"),rows:4,disabled:i})]})]})});as.displayName="FolderDetailsComponent";const br=()=>{a.useEffect(()=>{if(typeof document>"u")return;const t="existing-files-animations";if(document.getElementById(t))return;const r=document.createElement("style");r.id=t,r.textContent=`
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
    `,document.head.appendChild(r)},[])},wr=({existingFiles:t,selectedExistingIndices:r,onToggleSelection:s,onSelectAll:n,onDeselectAll:u,onDeleteFile:g,disabled:i,isCreator:o,participantsCanDeleteItems:c,existingFileTagsMap:d,t:m,isRTL:h})=>(br(),t.length===0?null:e.jsxs("div",{style:{marginBottom:"32px",direction:h?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px",flexDirection:h?"row-reverse":"row"},children:[e.jsx("div",{children:e.jsx("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:m("Existing Files ({count})").replace("{count}",t.length.toString())})}),e.jsx("div",{style:{display:"flex",gap:"8px",flexDirection:h?"row-reverse":"row"},children:e.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:i?"#f8f9fa":"#fff",color:i?"#999":"#333",cursor:i?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:r.size>0?u:n,disabled:i,children:r.size>0?m("Done Tagging Selected"):m("Select All")})})]}),e.jsx("div",{className:"existing-files-grid",children:t.map((p,l)=>{const y=r.has(l),O=d.get(l)||[];return e.jsxs("div",{className:"existing-file-item",children:[e.jsxs("div",{className:`existing-file-card ${y?"selected":""}`,onClick:()=>!i&&s(l),children:[e.jsx(Ks,{thumbnailDataKey:p.thumbnailDataKey,dataKey:p.dataKey,alt:m("Existing file"),style:{width:"100%",height:"100%",objectFit:"cover"}}),y&&!i&&(o===!0||c)&&e.jsx("button",{onClick:z=>{z.stopPropagation(),confirm(m("Are you sure you want to remove this file?"))&&g(l)},className:"delete-button",title:m("Remove file"),children:"×"}),p.dataInBytes>0&&e.jsx("div",{className:"file-size",children:m("{size} MB").replace("{size}",(p.dataInBytes/(1024*1024)).toFixed(1))}),p.durationInSeconds&&e.jsx("div",{className:"file-duration",children:m("{minutes}:{seconds}").replace("{minutes}",Math.floor(p.durationInSeconds/60).toString()).replace("{seconds}",String(Math.floor(p.durationInSeconds%60)).padStart(2,"0"))})]}),e.jsxs("div",{className:"file-info",children:[p.fileName&&e.jsx("div",{className:`file-name ${y?"selected":""}`,children:p.fileName}),e.jsx("div",{className:"file-tags",children:O.length>0?e.jsx("div",{className:"tags-display",children:e.jsxs("div",{className:"tags-content",children:[e.jsx("span",{className:"tag-icon",children:"🏷️"}),e.jsx("span",{className:"tags-text",children:O.map(z=>{if(z.subtags.length>0){const I=z.subtags.map(Q=>Q.subtagTitle).join(", ");return m("{tagTitle}: {subtags}").replace("{tagTitle}",z.tagTitle).replace("{subtags}",I)}return z.tagTitle}).join(" • ")})]})}):y?e.jsx("div",{style:{background:"white",border:"1px solid #007bff",color:"#007bff",fontWeight:"600",fontSize:"11px",fontStyle:"normal",padding:"8px 12px",borderRadius:"6px",boxShadow:"0 2px 8px rgba(0, 123, 255, 0.2)",animation:"subtlePulse 2.5s infinite"},children:e.jsxs("span",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"4px"},children:[e.jsx("span",{children:"👇"})," ",m("Scroll down to select tags")]})}):null})]})]},`existing-${l}-${p.dataKey}`)})})]})),yr=({selectedPhotos:t,selectedPhotoIndices:r,onToggleSelection:s,onSelectAll:n,onDeselectAll:u,onRemovePhoto:g,onDeleteAll:i,disabled:o,photoTagsMap:c,columns:d,setColumns:m,t:h,isRTL:p})=>t.length===0?null:e.jsxs("div",{style:{marginBottom:"32px",direction:p?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"16px",flexDirection:p?"row-reverse":"row"},children:[e.jsx("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:h("New Files ({count})").replace("{count}",t.length.toString())}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:p?"flex-start":"flex-end",gap:"8px"},children:[e.jsxs("div",{style:{display:"flex",gap:"8px",flexDirection:p?"row-reverse":"row"},children:[e.jsx("button",{className:"control-button",onClick:r.size>0?u:n,disabled:o,children:r.size>0?h("Done Tagging Selected"):h("Select All")}),r.size===0&&e.jsx("button",{className:"control-button danger",onClick:i,disabled:o,children:h("Delete All")})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",flexDirection:p?"row-reverse":"row"},children:[e.jsx("label",{className:"columns-label",children:h("Columns:")}),e.jsxs("select",{value:d,onChange:l=>m(l.target.value),className:"columns-select",children:[e.jsx("option",{value:"1",children:"1"}),e.jsx("option",{value:"2",children:"2"}),e.jsx("option",{value:"3",children:"3"}),e.jsx("option",{value:"4",children:"4"}),e.jsx("option",{value:"5",children:"5"})]})]})]})]}),e.jsx(nt,{selectedPhotos:t,selectedPhotoIndices:r,isSavingAlbum:o,onRemovePhoto:g,onTogglePhotoSelection:s,onSelectAllPhotos:n,onDeselectAllPhotos:u,hideHeader:!0,photoTagsMap:c,columns:d})]}),Tr=P.button`
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
`,is=P.div`
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
`,ze=P.div`
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,os=P.h4`
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
`,Oe=P.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 8px 0;
`,Me=P.div`
  font-size: 14px;
  color: #333;
  line-height: 1.4;
`,Be=P.label`
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
`,Ue=P.span`
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
`,ns=P.button`
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
`,vr=P.button`
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
`,Sr=({showGlobalGear:t,globalSettings:r,setGlobalSettings:s,onPasswordClick:n,onApplySettings:u})=>{const{t:g,language:i}=ge(),o=Fe(i)==="rtl";return t?e.jsx(is,{$isRTL:o,children:e.jsxs(ze,{children:[e.jsx(os,{children:g("Apply to All Albums")}),e.jsxs(ze,{children:[e.jsxs(Oe,{children:[e.jsx(Me,{children:g("Public Profile")}),e.jsxs(Be,{children:[e.jsx("input",{type:"checkbox",checked:r.isOnPublicProfile,onChange:c=>s(d=>({...d,isOnPublicProfile:c.target.checked}))}),e.jsx(Ue,{})]})]}),e.jsxs(Oe,{children:[e.jsx(Me,{children:g("Participants Can Add Items")}),e.jsxs(Be,{children:[e.jsx("input",{type:"checkbox",checked:r.participantsCanAddItems,onChange:c=>s(d=>({...d,participantsCanAddItems:c.target.checked}))}),e.jsx(Ue,{})]})]}),e.jsxs(Oe,{children:[e.jsx(Me,{children:g("Participants Can Delete Items")}),e.jsxs(Be,{children:[e.jsx("input",{type:"checkbox",checked:r.participantsCanDeleteItems,onChange:c=>s(d=>({...d,participantsCanDeleteItems:c.target.checked}))}),e.jsx(Ue,{})]})]})]}),e.jsx(ze,{children:e.jsxs(ns,{$hasAnyPassword:r.passwordProtectionOption!=="NoPassword"&&!!r.albumPassword,onClick:n,children:[r.passwordProtectionOption!=="NoPassword"&&r.albumPassword?"🔒":"🔓",r.passwordProtectionOption!=="NoPassword"&&r.albumPassword?g("Password Set"):g("Set Password for All")]})}),e.jsx(vr,{onClick:u,children:g("Apply to All Albums")})]})}):null},$r=({showGear:t,isOnPublicProfile:r,participantsCanAddItems:s,participantsCanDeleteItems:n,passwordProtectionOption:u,albumPassword:g,onTogglePublicProfile:i,onToggleParticipantsCanAdd:o,onToggleParticipantsCanDelete:c,onPasswordClick:d,disabled:m})=>{const{t:h,language:p}=ge(),l=Fe(p)==="rtl";return t?e.jsx(is,{$isRTL:l,children:e.jsxs(ze,{children:[e.jsx(os,{children:h("Album Settings")}),e.jsxs(ze,{children:[e.jsxs(Oe,{children:[e.jsx(Me,{children:h("Public Profile")}),e.jsxs(Be,{children:[e.jsx("input",{type:"checkbox",checked:r,onChange:i,disabled:m}),e.jsx(Ue,{})]})]}),e.jsxs(Oe,{children:[e.jsx(Me,{children:h("Participants Can Add Items")}),e.jsxs(Be,{children:[e.jsx("input",{type:"checkbox",checked:s,onChange:o,disabled:m}),e.jsx(Ue,{})]})]}),e.jsxs(Oe,{children:[e.jsx(Me,{children:h("Participants Can Delete Items")}),e.jsxs(Be,{children:[e.jsx("input",{type:"checkbox",checked:n,onChange:c,disabled:m}),e.jsx(Ue,{})]})]})]}),e.jsx(ze,{children:e.jsxs(ns,{$hasAnyPassword:u!=="NoPassword"&&!!g,onClick:d,disabled:m,children:[u!=="NoPassword"&&g?"🔒":"🔓",h(u!=="NoPassword"&&g?"Password Set":"Set Password")]})})]})}):null},ls=({onClick:t,disabled:r,title:s})=>e.jsx(Tr,{onClick:t,disabled:r,title:s,children:"⚙️"}),j={colors:{primary:"#007bff",primaryDark:"#0056b3",secondary:"#6c757d",success:"#4caf50",danger:"#e53935",warning:"#ff9800",white:"#fff",text:{primary:"#333",secondary:"#666",light:"#777"},background:{primary:"#f9fafb",highlight:"#f0f7ff"},border:"#ddd"},spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px"},borderRadius:{small:"4px",medium:"8px"},boxShadow:{lg:"0 4px 10px rgba(0,0,0,0.08)"}},Pr=P.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10000;
`,Ir=P.div`
  background-color: ${j.colors.white};
  border-radius: ${j.borderRadius.medium};
  box-shadow: ${j.boxShadow.lg};
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
  scrollbar-color: ${j.colors.border} transparent;
  
  /* Custom scrollbar for webkit browsers */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${j.colors.border};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${j.colors.secondary};
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
    border-radius: ${j.borderRadius.small};
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
`,Ar=P.div`
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
`,kr=P.div`
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
`,jr=P.h3`
  font-size: 24px;
  font-weight: 600;
  color: ${j.colors.text.primary};
  margin: 0 0 ${j.spacing.lg} 0;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 22px;
    margin: 0 0 ${j.spacing.md} 0;
  }
  
  @media (max-height: 700px) {
    font-size: 20px;
    margin: 0 0 ${j.spacing.md} 0;
  }
  
  @media (max-width: 480px) {
    font-size: 18px;
  }
`,Cr=P.p`
  margin-bottom: ${j.spacing.lg};
  font-size: 16px;
  color: ${j.colors.text.secondary};
  line-height: 1.5;
  
  @media (max-width: 768px) {
    margin-bottom: ${j.spacing.md};
    font-size: 15px;
  }
  
  @media (max-height: 700px) {
    margin-bottom: ${j.spacing.sm};
    font-size: 14px;
  }
`,Tt=P.div`
  margin-bottom: ${j.spacing.lg};
`,vt=P.label`
  display: block;
  margin-bottom: ${j.spacing.sm};
  font-size: 14px;
  font-weight: 500;
  color: ${j.colors.text.primary};
`,Dr=P.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${j.colors.border};
  border-radius: ${j.borderRadius.small};
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${j.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  &::placeholder {
    color: ${j.colors.text.light};
  }
`,Er=P.div`
  display: flex;
  flex-direction: column;
  gap: ${j.spacing.md};
  margin-bottom: ${j.spacing.xl};
`,Fr=P.div`
  border: 2px solid ${t=>t.$isSelected?j.colors.primary:j.colors.border};
  border-radius: ${j.borderRadius.medium};
  padding: ${j.spacing.lg};
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${t=>t.$isSelected?j.colors.background.highlight:j.colors.white};
  display: flex;
  align-items: center;
  gap: ${j.spacing.lg};
  
  @media (max-width: 768px) {
    padding: ${j.spacing.md};
    gap: ${j.spacing.md};
  }
  
  @media (max-width: 480px) {
    padding: ${j.spacing.sm};
    gap: ${j.spacing.sm};
  }
  
  @media (max-height: 700px) {
    padding: ${j.spacing.sm};
    gap: ${j.spacing.sm};
  }
`,Nr=P.div`
  flex: 1;
`,_r=P.div`
  margin-bottom: ${j.spacing.xs};
`,Rr=P.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${j.colors.primary};
  flex-shrink: 0;
`,zr=P.label`
  font-size: 16px;
  font-weight: 500;
  color: ${j.colors.text.primary};
  cursor: pointer;
  display: block;
`,Or=P.div`
  font-size: 14px;
  color: ${j.colors.text.secondary};
  margin-top: ${j.spacing.xs};
`,Mr=P.div`
  color: ${j.colors.warning};
  font-size: 12px;
  font-style: italic;
  margin-top: ${j.spacing.xs};
  font-weight: 500;
`,Br=P.div`
  display: flex;
  gap: ${j.spacing.sm};
  justify-content: center;
  margin-top: ${j.spacing.xl};
`,St=P.button`
  background-color: ${t=>t.$variant==="danger"?j.colors.danger:t.$variant==="secondary"?"transparent":t.$variant==="success"?j.colors.success:j.colors.primary};
  color: ${t=>t.$variant==="secondary"?j.colors.primary:j.colors.white};
  border: ${t=>t.$variant==="secondary"?`1px solid ${j.colors.primary}`:"none"};
  padding: ${t=>t.$size==="small"?"8px 16px":t.$size==="large"?"16px 32px":"12px 24px"};
  border-radius: ${j.borderRadius.medium};
  cursor: ${t=>t.disabled?"not-allowed":"pointer"};
  font-size: ${t=>t.$size==="small"?"14px":t.$size==="large"?"18px":"16px"};
  font-weight: 500;
  transition: all 0.2s ease;
  opacity: ${t=>t.disabled?.6:1};
  min-width: 100px;

  &:hover:not(:disabled) {
    background-color: ${t=>t.$variant==="danger"?"#c62828":t.$variant==="secondary"?j.colors.background.highlight:t.$variant==="success"?"#388e3c":j.colors.primaryDark};
  }
`,Ur=P.div`
  background-color: ${j.colors.background.primary};
  border-radius: ${j.borderRadius.medium};
  padding: ${j.spacing.md};
  margin: ${j.spacing.md} 0;
  border-left: 4px solid ${j.colors.primary};
  font-size: 14px;
  color: ${j.colors.text.secondary};
  line-height: 1.4;
  
  @media (max-width: 768px) {
    padding: ${j.spacing.sm};
    margin: ${j.spacing.sm} 0;
    font-size: 13px;
  }
  
  @media (max-height: 700px) {
    padding: ${j.spacing.xs};
    font-size: 12px;
  }
`,Gr=[{value:"NotVisible",titleKey:"Password Required To See Or Save",descriptionKey:"Album will be completely hidden until correct password is entered"},{value:"Watermark",titleKey:"Watermarked And No Saving Without Password",descriptionKey:"Photos will be visible with watermarks, password required to save"},{value:"CannotBeSaved",titleKey:"Password Required To Save",descriptionKey:"Photos are visible but password required to download or save"},{value:"NoPassword",titleKey:"No Password",descriptionKey:"Album is fully public with no restrictions"}],cs=({isOpen:t,onClose:r,initialOption:s="NoPassword",initialPassword:n=""})=>{const{t:u,language:g}=ge(),i=Fe(g)==="rtl",[o,c]=a.useState(!1),[d,m]=a.useState(s),[h,p]=a.useState(n);if(a.useEffect(()=>{c(!0)},[]),a.useEffect(()=>{t&&(m(s),p(n))},[t,s,n]),!t||!o)return null;const l=h.trim()==="",y=I=>{m(I)},O=I=>{I.target===I.currentTarget&&r()},z=I=>I!=="NoPassword";return e.jsxs(e.Fragment,{children:[e.jsx(Pr,{onClick:O}),e.jsx(Ir,{children:e.jsx(Ar,{children:e.jsxs(kr,{$isRTL:i,children:[e.jsx(jr,{children:u("Album Password Policy")}),e.jsx(Cr,{children:u("Configure password protection for your album. Choose how you want to restrict access to your photos.")}),e.jsxs(Tt,{children:[e.jsx(vt,{children:u("Enter Password")}),e.jsx(Dr,{type:"text",placeholder:u("Enter password (optional)"),value:h,onChange:I=>p(I.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"})]}),e.jsxs(Tt,{children:[e.jsx(vt,{children:u("Select Protection Level")}),e.jsx(Er,{children:Gr.map(I=>e.jsxs(Fr,{$isSelected:d===I.value,onClick:()=>y(I.value),children:[e.jsx(Rr,{type:"radio",name:"protection",checked:d===I.value,onChange:()=>y(I.value)}),e.jsxs(Nr,{children:[e.jsx(_r,{children:e.jsx(zr,{children:u(I.titleKey)})}),e.jsx(Or,{children:u(I.descriptionKey)}),l&&z(I.value)&&d===I.value&&e.jsx(Mr,{children:u('⚠️ Will use "password" as default if left empty')})]})]},I.value))})]}),z(d)&&e.jsxs(Ur,{children:[e.jsx("strong",{children:u("💡 Password Protection Info:")}),e.jsx("br",{}),u('If you leave the password field empty, "password" will be used as the default password. You can change this anytime in album settings.')]}),e.jsxs(Br,{children:[e.jsx(St,{$variant:"secondary",onClick:()=>r(),children:u("Cancel")}),e.jsx(St,{$variant:"primary",onClick:()=>{const I=l&&z(d)?"password":h;console.log(`Saving with option: ${d}, password: ${I.length>0?"********":"none"}`),r(d,I)},children:u("Save")})]})]})})})]})},Wr=({debugMessages:t,t:r,isRTL:s,textDirection:n})=>t.length===0?null:e.jsxs("div",{style:{marginTop:"40px",background:"#fff3cd",padding:"16px",borderRadius:"8px",border:"1px solid #ffeeba",maxWidth:900,margin:"0 auto",direction:n},children:[e.jsx("h3",{style:{marginTop:0,fontSize:"18px",color:"#856404",textAlign:s?"right":"left"},children:r("Debug Log")}),e.jsx("pre",{style:{fontSize:"14px",color:"#856404",whiteSpace:"pre-wrap",maxHeight:"400px",overflow:"auto",textAlign:s?"right":"left"},children:t.map((u,g)=>e.jsx("div",{style:{marginBottom:"8px"},children:u},g))})]}),Kr=`
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
`,Hr=`
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
`,qr=`
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
`,Jr=`
  mutation DeleteTag($tagId: String!) {
    deleteTag(tagId: $tagId) {
      id
      hasBeenDeleted
    }
  }
`,Qr=`
  mutation DeleteSubtag($subtagId: String!) {
    deleteSubtag(subtagId: $subtagId) {
      id
      hasBeenDeleted
    }
  }
`,We=()=>typeof crypto<"u"&&crypto.randomUUID?crypto.randomUUID():"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){const r=Math.random()*16|0;return(t=="x"?r:r&3|8).toString(16)}),ds=(t,r,s,n,u,g,i)=>{const[o,c]=a.useState([]),[d,m]=a.useState(null),[h,p]=a.useState(!1),[l,y]=a.useState(null),[O,z]=a.useState(null),[I,Q]=a.useState(null),[te,w]=a.useState(!1),[Z,se]=a.useState(!1),[W,Y]=a.useState(""),[oe,ee]=a.useState(""),[k,J]=a.useState(!1),[ne,F]=a.useState(!1),S=a.useRef(!1),A=a.useRef(""),K=a.useRef(!1),U=a.useMemo(()=>({photoIndices:Array.from(u),existingIndices:Array.from(g),hasSelection:u.size>0||g.size>0}),[u,g]),G=a.useMemo(()=>{const f=[];t.forEach(T=>{f.push(...T)}),s.forEach(T=>{f.push(...T)});const b=new Map;return f.forEach(T=>{if(b.has(T.tagTitle)){const C=b.get(T.tagTitle),_=[...C.subtags,...T.subtags],D=Array.from(new Map(_.map(E=>[E.subtagTitle,E])).values());b.set(T.tagTitle,{...C,subtags:D})}else b.set(T.tagTitle,T)}),Array.from(b.values())},[t,s]),M=a.useCallback((f,b)=>{const T=[],C=Math.floor(Date.now()/1e3),_=new Set(f.map(D=>D.tagTitle));return b.forEach(D=>{if(_.has(D.tagTitle)){const E=f.findIndex($=>$.tagTitle===D.tagTitle);if(E!==-1){const $=f[E],L=new Set(($.subtags||[]).map(q=>q.subtagTitle)),X=[];D.subtags.forEach(q=>{if(!L.has(q.subtagTitle)){const je={id:We(),tagTitle:q.tagTitle,subtagTitle:q.subtagTitle,TagType:D.TagType||"File",points:1,createdAt:C,updatedAt:C,isCreatedFromApplied:!0};X.push(je),i(`Created missing subtag from applied tags: ${q.subtagTitle} for tag ${q.tagTitle}`)}}),X.length>0&&(f[E]={...$,subtags:[...$.subtags||[],...X]})}}else{const E={id:We(),tagTitle:D.tagTitle,TagType:D.TagType||"File",points:1,createdAt:C,updatedAt:C,subtags:[],isCreatedFromApplied:!0};D.subtags&&D.subtags.length>0&&(E.subtags=D.subtags.map($=>({id:We(),tagTitle:$.tagTitle,subtagTitle:$.subtagTitle,TagType:D.TagType||"File",points:1,createdAt:C,updatedAt:C,isCreatedFromApplied:!0}))),T.push(E),i(`Created missing tag from applied tags: ${D.tagTitle} with ${D.subtags.length} subtags`)}}),T},[i]),le=a.useCallback(f=>{if(!U.hasSelection)return!1;const b=U.photoIndices.length===0||U.photoIndices.every(C=>(t.get(C)||[]).some(D=>D.tagTitle===f.tagTitle)),T=U.existingIndices.length===0||U.existingIndices.every(C=>(s.get(C)||[]).some(D=>D.tagTitle===f.tagTitle));return b&&T},[U,t,s]),ce=a.useCallback(f=>{if(!U.hasSelection)return!1;let b=0,T=0;U.photoIndices.forEach($=>{const X=(t.get($)||[]).find(q=>q.tagTitle===f.tagTitle);X&&(b++,X.subtags.some(q=>q.subtagTitle===f.subtagTitle)&&T++)});let C=0,_=0;U.existingIndices.forEach($=>{const X=(s.get($)||[]).find(q=>q.tagTitle===f.tagTitle);X&&(C++,X.subtags.some(q=>q.subtagTitle===f.subtagTitle)&&_++)});const D=b+C,E=T+_;return D>0&&E===D},[U,t,s]),fe=a.useCallback(f=>{if(!U.hasSelection){i("No files selected for tag application");return}const b=le(f);i(`${b?"Removing":"Applying"} tag "${f.tagTitle}" ${b?"from":"to"} all selected files`),U.photoIndices.length>0&&r(T=>{const C=new Map(T);return U.photoIndices.forEach(_=>{const D=C.get(_)||[];if(b){const E=D.filter($=>$.tagTitle!==f.tagTitle);C.set(_,E)}else if(!D.some($=>$.tagTitle===f.tagTitle)){const $={tagTitle:f.tagTitle,TagType:f.TagType,subtags:[]};C.set(_,[...D,$])}}),C}),U.existingIndices.length>0&&n(T=>{const C=new Map(T);return U.existingIndices.forEach(_=>{const D=C.get(_)||[];if(b){const E=D.filter($=>$.tagTitle!==f.tagTitle);C.set(_,E)}else if(!D.some($=>$.tagTitle===f.tagTitle)){const $={tagTitle:f.tagTitle,TagType:f.TagType,subtags:[]};C.set(_,[...D,$])}}),C})},[U,le,r,n,i]),we=a.useCallback(f=>{if(!U.hasSelection){i("No files selected for subtag application");return}const b=ce(f);i(`${b?"Removing":"Applying"} subtag "${f.subtagTitle}" ${b?"from":"to"} all selected files with parent tag`),U.photoIndices.length>0&&r(T=>{const C=new Map(T);return U.photoIndices.forEach(_=>{const E=(C.get(_)||[]).map($=>{if($.tagTitle===f.tagTitle){if(b)return{...$,subtags:$.subtags.filter(L=>L.subtagTitle!==f.subtagTitle)};if(!$.subtags.some(X=>X.subtagTitle===f.subtagTitle))return{...$,subtags:[...$.subtags,{tagTitle:f.tagTitle,subtagTitle:f.subtagTitle}]}}return $});C.set(_,E)}),C}),U.existingIndices.length>0&&n(T=>{const C=new Map(T);return U.existingIndices.forEach(_=>{const E=(C.get(_)||[]).map($=>{if($.tagTitle===f.tagTitle){if(b)return{...$,subtags:$.subtags.filter(L=>L.subtagTitle!==f.subtagTitle)};if(!$.subtags.some(X=>X.subtagTitle===f.subtagTitle))return{...$,subtags:[...$.subtags,{tagTitle:f.tagTitle,subtagTitle:f.subtagTitle}]}}return $});C.set(_,E)}),C})},[U,ce,r,n,i]),ye=a.useCallback(()=>{const f=[];U.photoIndices.forEach(T=>{const C=t.get(T)||[];f.push(...C)}),U.existingIndices.forEach(T=>{const C=s.get(T)||[];f.push(...C)});const b=new Map;return f.forEach(T=>{if(b.has(T.tagTitle)){const C=b.get(T.tagTitle),_=[...C.subtags,...T.subtags],D=Array.from(new Map(_.map(E=>[E.subtagTitle,E])).values());b.set(T.tagTitle,{...C,subtags:D})}else b.set(T.tagTitle,T)}),Array.from(b.values())},[U,t,s]),Pe=a.useCallback(()=>U.hasSelection,[U.hasSelection]),de=a.useCallback(async()=>{var f,b;if(K.current||h){i("Tags already loading, skipping duplicate fetch");return}K.current=!0,i("Fetching tags from API and checking for missing applied tags"),p(!0),Q(null);try{const T=await be();if(!T){i("No token available for fetching tags"),Q("Authentication token not available");return}const C=await fetch(_e,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${T}`},body:JSON.stringify({query:Kr,variables:{fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})});if(!C.ok)throw new Error(`HTTP error! status: ${C.status}`);const _=await C.json();if(i("Tags API response:",_),_.errors){console.error("GraphQL errors:",_.errors),i(`GraphQL errors: ${JSON.stringify(_.errors)}`),Q(`GraphQL errors: ${_.errors.map($=>$.message).join(", ")}`);return}let E=(((b=(f=_==null?void 0:_.data)==null?void 0:f.fetchRelations)==null?void 0:b.items)||[]).map($=>{var L,X;return{id:$.id,tagTitle:$.tagTitle,TagType:$.TagType,points:$.points,createdAt:$.createdAt,updatedAt:$.updatedAt,subtags:((X=(L=$.subtags)==null?void 0:L.items)==null?void 0:X.map(q=>({id:q.id,tagTitle:q.tagTitle,subtagTitle:q.subtagTitle,TagType:q.TagType,points:q.points,createdAt:q.createdAt,updatedAt:q.updatedAt})))||[]}});if(i(`Fetched ${E.length} tags from API`),G.length>0){const $=M(E,G);$.length>0&&(i(`Created ${$.length} missing tags from applied tags`),E=[...$,...E])}i(`Final tags list: ${E.length} tags (including ${E.filter($=>$.isCreatedFromApplied).length} created from applied tags)`),c(E),S.current=!0}catch(T){console.error("Error fetching tags:",T),i(`Error fetching tags: ${T}`),Q(T instanceof Error?T.message:"Unknown error occurred")}finally{p(!1),K.current=!1}},[h,i,G,M]),Ie=a.useCallback(f=>{i(`Setting displayed tag: ${f}`),m(f)},[i]),Ne=a.useCallback(()=>{if(!d)return[];const f=o.find(b=>b.id===d);return(f==null?void 0:f.subtags)||[]},[d,o]),Ae=async(f,b)=>{if(i(`Adding new tag: ${f} of type: ${b}`),!f.trim())return i("Cannot add tag with empty title"),!1;J(!0);try{if(!await be())return i("No token available for adding tag"),!1;if(await(async()=>(i("PLACEHOLDER: Would send GraphQL mutation to add tag",{mutation:Hr,variables:{tagInput:{tagTitle:f.trim(),TagType:b,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(D=>setTimeout(D,500)),!0))()){const D={id:We(),tagTitle:f.trim(),TagType:b,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3),subtags:[]};return c(E=>[D,...E]),fe(D),Ie(D.id),Y(""),w(!1),i(`Successfully added and applied new tag: ${f}`),!0}return!1}catch(T){return console.error("Error adding new tag:",T),i(`Error adding new tag: ${T}`),!1}finally{J(!1)}},x=async(f,b,T)=>{if(i(`Adding new subtag: ${b} to tag: ${f}`),!b.trim())return i("Cannot add subtag with empty title"),!1;if(!d)return i("No displayed tag for adding subtag"),!1;F(!0);try{if(!await be())return i("No token available for adding subtag"),!1;if(await(async()=>(i("PLACEHOLDER: Would send GraphQL mutation to add subtag",{mutation:qr,variables:{subtagInput:{tagTitle:f,subtagTitle:b.trim(),TagType:T,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(E=>setTimeout(E,500)),!0))()){const E={id:We(),tagTitle:f,subtagTitle:b.trim(),TagType:T,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3)};return c($=>$.map(L=>L.id===d?{...L,subtags:[E,...L.subtags||[]]}:L)),we(E),ee(""),se(!1),i(`Successfully added and applied new subtag: ${b}`),!0}return!1}catch(C){return console.error("Error adding new subtag:",C),i(`Error adding new subtag: ${C}`),!1}finally{F(!1)}},N=async f=>{i(`Deleting tag: ${f}`),y(f);try{if(!await be())return i("No token available for deleting tag"),!1;if(await(async()=>(i("PLACEHOLDER: Would send GraphQL mutation to delete tag",{mutation:Jr,variables:{tagId:f}}),await new Promise(_=>setTimeout(_,500)),!0))()){const _=o.find(D=>D.id===f);return c(D=>D.filter(E=>E.id!==f)),_&&(r(D=>{const E=new Map(D);return D.forEach(($,L)=>{const X=$.filter(q=>q.tagTitle!==_.tagTitle);E.set(L,X)}),E}),n(D=>{const E=new Map(D);return D.forEach(($,L)=>{const X=$.filter(q=>q.tagTitle!==_.tagTitle);E.set(L,X)}),E})),d===f&&Ie(null),i(`Successfully deleted tag: ${f}`),!0}return!1}catch(b){return console.error("Error deleting tag:",b),i(`Error deleting tag: ${b}`),!1}finally{y(null)}},B=async f=>{i(`Deleting subtag: ${f}`),z(f);try{if(!await be())return i("No token available for deleting subtag"),!1;if(await(async()=>(i("PLACEHOLDER: Would send GraphQL mutation to delete subtag",{mutation:Qr,variables:{subtagId:f}}),await new Promise(_=>setTimeout(_,500)),!0))()){let _=null;return c(D=>D.map(E=>{var L;const $=((L=E.subtags)==null?void 0:L.filter(X=>X.id===f?(_=X,!1):!0))||[];return{...E,subtags:$}})),_&&(r(D=>{const E=new Map(D);return D.forEach(($,L)=>{const X=$.map(q=>q.tagTitle===_.tagTitle?{...q,subtags:q.subtags.filter(je=>je.subtagTitle!==_.subtagTitle)}:q);E.set(L,X)}),E}),n(D=>{const E=new Map(D);return D.forEach(($,L)=>{const X=$.map(q=>q.tagTitle===_.tagTitle?{...q,subtags:q.subtags.filter(je=>je.subtagTitle!==_.subtagTitle)}:q);E.set(L,X)}),E})),i(`Successfully deleted subtag: ${f}`),!0}return!1}catch(b){return console.error("Error deleting subtag:",b),i(`Error deleting subtag: ${b}`),!1}finally{z(null)}},H=()=>{w(!0),Y("")},ae=()=>{w(!1),Y("")},re=()=>{se(!0),ee("")},ue=()=>{se(!1),ee("")},ke=async()=>W.trim()?await Ae(W,"File"):!1,Te=async()=>{if(oe.trim()&&d){const f=o.find(b=>b.id===d);if(f)return await x(f.tagTitle,oe,f.TagType)}return!1};return a.useEffect(()=>{S.current||de()},[]),a.useEffect(()=>{if(!S.current||K.current)return;const f=JSON.stringify(G.map(b=>({title:b.tagTitle,subtags:b.subtags.map(T=>T.subtagTitle).sort()})));if(f!==A.current){A.current=f;const b=G.filter(T=>!o.some(C=>C.tagTitle===T.tagTitle));if(b.length>0){i(`Detected ${b.length} new applied tags, refreshing tags list`,b.map(C=>C.tagTitle));const T=setTimeout(()=>{de()},300);return()=>clearTimeout(T)}}},[G,o,i,de]),a.useEffect(()=>{if(d){const f=o.find(b=>b.id===d);f&&!le(f)&&(i(`Clearing displayed tag "${f.tagTitle}" because it's no longer applied to all selected files`),m(null))}},[u.size,g.size,d,o,le,i]),{tags:o,displayedTagId:d,isLoadingTags:h,tagIdBeingDeleted:l,subtagIdBeingDeleted:O,fetchError:I,isAddingNewTag:te,isAddingNewSubtag:Z,newTagTitle:W,newSubtagTitle:oe,isSubmittingNewTag:k,isSubmittingNewSubtag:ne,fetchTags:de,toggleTagOnSelectedFiles:fe,toggleSubtagOnSelectedFiles:we,setDisplayedTag:Ie,isTagAppliedToSelected:le,isSubtagAppliedToSelected:ce,getDisplayedTagSubtags:Ne,getAppliedTagsForSelected:ye,hasSelectedFiles:Pe,addNewTag:Ae,addNewSubtag:x,deleteTag:N,deleteSubtag:B,startAddingNewTag:H,cancelAddingNewTag:ae,startAddingNewSubtag:re,cancelAddingNewSubtag:ue,submitNewTag:ke,submitNewSubtag:Te,setNewTagTitle:Y,setNewSubtagTitle:ee}},Vr=(t,r=50,s=3e3)=>{const n=a.useRef(0),u=a.useRef(Date.now()),g=a.useRef(!1),i=a.useRef(0),o=Date.now();return o-u.current>s&&(n.current=0,u.current=o,g.current&&o-i.current>1e4&&(g.current=!1,console.log(`🔄 Circuit breaker reset for ${t}`))),n.current++,n.current>r&&!g.current&&(g.current=!0,i.current=o,console.error(`🚨 CIRCUIT BREAKER ACTIVATED for ${t}! Renders: ${n.current}`)),{isBlocked:g.current,renderCount:n.current,reset:()=>{n.current=0,u.current=Date.now(),g.current=!1}}},$t=()=>{const{t,language:r}=ge(),s=Fe(r)==="rtl",{isBlocked:n,renderCount:u,reset:g}=Vr("SingleAlbumMode"),[i,o]=a.useState({selectedPhotoIndices:new Set,photoTagsMap:new Map,selectedExistingIndices:new Set,existingFileTagsMap:new Map}),c=Ct(t),{setShowUsernamePrompt:d,setUsernameInput:m}=c,[h,p]=a.useState(null),[l,y]=a.useState(!1),[O,z]=a.useState(0),[I,Q]=a.useState(""),[te,w]=a.useState(""),[Z,se]=a.useState(!1),[W,Y]=a.useState(!1),[oe,ee]=a.useState("NoPassword"),[k,J]=a.useState(""),[ne,F]=a.useState(!1),[S,A]=a.useState(!0),[K,U]=a.useState(!1),[G,M]=a.useState(null),[le,ce]=a.useState(!1),[fe,we]=a.useState([]),[ye,Pe]=a.useState("2"),[de,Ie]=a.useState([]),[Ne,Ae]=a.useState(!1),[x,N]=a.useState(!1),[B,H]=a.useState(!1),ae=a.useRef(null),re=a.useCallback((v,R)=>{const V=new Date().toISOString();console.log(`[${V}] ${v}`,R)},[]),ue=a.useCallback(v=>{!h&&v&&p(v)},[h]),ke=Gs(ue,!0),{fileInputRef:Te,selectedPhotos:f,setSelectedPhotos:b,isUploading:T,progressTracker:C,setProgressTracker:_,debugMessages:D,currentFolderId:E,openFilePicker:$,handleFileSelection:L,setOnSaveAlbumPage:X}=ke,q=cr(p,b,M,se,Q,w,F,A,ee,J,ce,we,U,re),{cognitoUsername:je,publicUsername:Ke,setPublicUsername:lt}=q,us=ds(i.photoTagsMap,v=>{o(R=>({...R,photoTagsMap:typeof v=="function"?v(R.photoTagsMap):v}))},i.existingFileTagsMap,v=>{o(R=>({...R,existingFileTagsMap:typeof v=="function"?v(R.existingFileTagsMap):v}))},i.selectedPhotoIndices,i.selectedExistingIndices,re),ps=ur(h||E,je,f,le,fe,I,te,ne,S,K,oe,k,i.photoTagsMap,i.existingFileTagsMap,de,i.selectedExistingIndices,y,z,b,_,re,t),{saveAlbumDirectly:He}=ps;a.useEffect(()=>{const v=localStorage.getItem("save-album-columns")||"2";Pe(v)},[]);const fs=a.useCallback(v=>{Pe(v),localStorage.setItem("save-album-columns",v)},[]);a.useEffect(()=>{const v=R=>{ae.current&&!ae.current.contains(R.target)&&H(!1)};return document.addEventListener("mousedown",v),()=>{document.removeEventListener("mousedown",v)}},[]),a.useEffect(()=>(X(!0),()=>X(!1)),[X]),a.useEffect(()=>{(async()=>{try{await Os()}catch(R){console.warn("Credential prewarming failed:",R)}})()},[]);const ct=a.useCallback(async v=>{var R,V;if(v){Ae(!0);try{const ie=await be();if(!ie)return;const pe=`
        mutation FetchRelations($fetchRelationsInput: FetchRelationsInput!) {
          fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
            items {
              ... on FolderPosition {
                ${Us}
              }
            }
          }
        }
      `,me={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}},ve=await(await fetch(_e,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${ie}`},body:JSON.stringify({query:pe,variables:me})})).json();if(ve.errors){console.error("GraphQL errors:",ve.errors);return}const dt=(((V=(R=ve==null?void 0:ve.data)==null?void 0:R.fetchRelations)==null?void 0:V.items)||[]).find(Se=>Se&&Se.folder&&Se.folder.id===v);if(!dt)return;const Ge=dt.folder,qe=Ge.fileReferencesPage,Es=Array.isArray(qe==null?void 0:qe.items)?qe.items:[],ut=[],pt=new Map;Es.forEach((Se,Fs)=>{const De=Se.file;if(De&&De.dataKey){let Ve=Se.fileDisplayName;if(!Ve&&De.dataKey){const Je=De.dataKey.split("/");Ve=Je[Je.length-1]}ut.push({fileReferenceId:Se.id,dataKey:De.dataKey,thumbnailDataKey:De.thumbnailDataKey||null,durationInSeconds:De.durationInSeconds||null,dataInBytes:De.dataInBytes||0,fileName:Ve||void 0});const Ye=Se.selectedTags;if(Array.isArray(Ye)&&Ye.length>0){const Je=Ye.map(Qe=>({tagTitle:Qe.tagTitle,TagType:Qe.TagType,subtags:Array.isArray(Qe.subtags)?Qe.subtags.map(ft=>({tagTitle:ft.tagTitle,subtagTitle:ft.subtagTitle})):[]}));pt.set(Fs,Je)}}}),Ie(ut),o(Se=>({...Se,existingFileTagsMap:pt})),!I&&Ge.folderName&&Q(Ge.folderName),!te&&Ge.folderDescription&&w(Ge.folderDescription)}catch(ie){console.error("Failed to fetch existing album data:",ie)}finally{Ae(!1)}}},[I,te]);a.useEffect(()=>{h&&ct(h)},[h,ct]),a.useEffect(()=>{E&&!h&&p(E)},[E,h]),a.useEffect(()=>{o(v=>{const R=new Set,V=new Map;return v.selectedPhotoIndices.forEach(ie=>{ie<f.length&&R.add(ie)}),v.photoTagsMap.forEach((ie,pe)=>{pe<f.length&&V.set(pe,ie)}),{...v,selectedPhotoIndices:R,photoTagsMap:V}})},[f.length]),a.useEffect(()=>{o(v=>{const R=new Set,V=new Map;return v.selectedExistingIndices.forEach(ie=>{ie<de.length&&R.add(ie)}),v.existingFileTagsMap.forEach((ie,pe)=>{pe<de.length&&V.set(pe,ie)}),{...v,selectedExistingIndices:R,existingFileTagsMap:V}})},[de.length]);const gs=a.useCallback(v=>{const R=f.filter((V,ie)=>ie!==v);b(R);try{R.length>0?localStorage.setItem(he.SELECTED_PHOTOS,JSON.stringify(R)):localStorage.removeItem(he.SELECTED_PHOTOS)}catch(V){console.warn("Failed to update localStorage:",V)}o(V=>{const ie=new Set,pe=new Map;return V.selectedPhotoIndices.forEach(me=>{me<v?ie.add(me):me>v&&ie.add(me-1)}),V.photoTagsMap.forEach((me,xe)=>{xe<v?pe.set(xe,me):xe>v&&pe.set(xe-1,me)}),{...V,selectedPhotoIndices:ie,photoTagsMap:pe}})},[f,b]),hs=a.useCallback(async v=>{const R=de[v];if(!R){re(`No file found at index ${v}`);return}N(!0),re(`Starting deletion of file reference: ${R.fileReferenceId}`);try{await Ee.deleteFileReferences([R.fileReferenceId],re),re(`Successfully deleted file reference: ${R.fileReferenceId}`);const V=de.filter((ie,pe)=>pe!==v);Ie(V),o(ie=>{const pe=new Set,me=new Map;return ie.selectedExistingIndices.forEach(xe=>{xe<v?pe.add(xe):xe>v&&pe.add(xe-1)}),ie.existingFileTagsMap.forEach((xe,ve)=>{ve<v?me.set(ve,xe):ve>v&&me.set(ve-1,xe)}),{...ie,selectedExistingIndices:pe,existingFileTagsMap:me}}),re(`File removed from local state, ${V.length} files remaining`)}catch(V){console.error("Failed to delete file reference:",V),re(`Failed to delete file reference: ${V}`),alert(t("Failed to delete file. Please try again."))}finally{N(!1)}},[de,re,t]),ms=a.useCallback(v=>{o(R=>{const V=new Set(R.selectedExistingIndices);return V.has(v)?V.delete(v):V.add(v),{...R,selectedExistingIndices:V}})},[]),xs=a.useCallback(()=>{const v=new Set;for(let R=0;R<de.length;R++)v.add(R);o(R=>({...R,selectedExistingIndices:v}))},[de.length]),bs=a.useCallback(()=>{o(v=>({...v,selectedExistingIndices:new Set}))},[]),ws=a.useCallback(v=>{o(R=>{const V=new Set(R.selectedPhotoIndices);return V.has(v)?V.delete(v):V.add(v),{...R,selectedPhotoIndices:V}})},[]),ys=a.useCallback(()=>{const v=new Set;for(let R=0;R<f.length;R++)v.add(R);o(R=>({...R,selectedPhotoIndices:v}))},[f.length]),Ts=a.useCallback(()=>{o(v=>({...v,selectedPhotoIndices:new Set}))},[]),vs=a.useCallback(()=>{if(confirm(t("Are you sure you want to delete all new files? This action cannot be undone."))){b([]),o({selectedPhotoIndices:new Set,photoTagsMap:new Map,selectedExistingIndices:new Set,existingFileTagsMap:new Map});try{localStorage.removeItem(he.SELECTED_PHOTOS)}catch(v){console.warn("Failed to update localStorage:",v)}}},[t,b]),Ss=a.useCallback(async()=>{if(!l){y(!0);try{if(Ke!=null&&Ke.startsWith("Profile-")){m(""),d(!0),y(!1);return}He()}catch(v){console.error("Error in handleSaveAlbumSingle:",v),y(!1)}}},[l,Ke,m,d,He]),$s=a.useCallback(v=>{try{localStorage.setItem(he.PUBLIC_USERNAME,v)}catch(R){console.warn("Failed to save username to localStorage:",R)}lt(v),d(!1),He()},[lt,d,He]),Ps=a.useCallback((v,R)=>{v&&ee(v),R!==void 0&&J(R),Y(!1)},[]),Is=a.useCallback(()=>{Y(!0)},[]),As=a.useCallback(()=>{F(!ne)},[ne]),ks=a.useCallback(()=>{A(!S)},[S]),js=a.useCallback(()=>{U(!K)},[K]),Cs=a.useCallback(()=>{$(h)},[$,h]),Ce=l||T||Ne||x,Ds=f.length>0||de.length>0;return n?e.jsxs("div",{style:{padding:"20px",textAlign:"center",backgroundColor:"#ffebee",border:"2px solid #f44336",borderRadius:"8px",margin:"20px"},children:[e.jsx("h2",{children:"🚨 Component Temporarily Blocked"}),e.jsx("p",{children:"The component was rendering too frequently and has been safely stopped."}),e.jsxs("p",{children:["Render count: ",u]}),e.jsx("button",{onClick:g,style:{padding:"10px 20px",backgroundColor:"#4caf50",color:"white",border:"none",borderRadius:"4px",cursor:"pointer",marginRight:"10px"},children:"Reset Component"}),e.jsx("button",{onClick:()=>window.location.reload(),style:{padding:"10px 20px",backgroundColor:"#f44336",color:"white",border:"none",borderRadius:"4px",cursor:"pointer"},children:"Reload Page"})]}):e.jsxs(e.Fragment,{children:[e.jsx(_t,{}),!1,e.jsx(Rt,{children:e.jsxs(zt,{children:[e.jsx(Ot,{href:"my-albums.html",children:t("Back to Albums")}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[Z&&G===!0&&e.jsxs("div",{ref:ae,style:{position:"relative"},children:[e.jsx(ls,{onClick:()=>H(!B),disabled:Ce,title:t("Album Settings")}),e.jsx($r,{showGear:B,isOnPublicProfile:ne,participantsCanAddItems:S,participantsCanDeleteItems:K,passwordProtectionOption:oe,albumPassword:k,onTogglePublicProfile:As,onToggleParticipantsCanAdd:ks,onToggleParticipantsCanDelete:js,onPasswordClick:Is,disabled:Ce})]}),e.jsx(at,{$primary:!0,onClick:Ss,disabled:Ce,style:{minWidth:"120px",fontSize:"14px",padding:"8px 16px"},children:t(l?"Saving...":"Save Album")})]})]})}),e.jsxs(Mt,{$isRTL:s,children:[e.jsx("div",{style:{marginTop:Z&&G===!0?"3px":"0"},children:e.jsx(as,{showFolderDetails:Z,isCreator:G,folderName:I,setFolderName:Q,folderDescription:te,setFolderDescription:w,isSavingAlbum:Ce})}),(T||C.totalFiles>0&&(C.filesUploading>0||C.filesProcessing>0||C.filesComplete<C.totalFiles))&&e.jsx(Ws,{progressTracker:C,isRTL:Fe(r)==="rtl",variant:"detailed",context:"saving",isUploading:T,showSuccessMessage:!1,showErrorMessage:!0,customMessages:{error:t("Some photos could not be processed. You can continue with the successfully processed photos.")}}),x&&e.jsx("div",{style:{padding:"16px",marginBottom:"16px",backgroundColor:"#fff3cd",border:"1px solid #ffeaa7",borderRadius:"8px",color:"#856404",textAlign:"center",fontWeight:"500"},children:t("Deleting file...")}),Ne&&e.jsx("div",{style:{padding:"16px",marginBottom:"16px",backgroundColor:"#f8f9fa",border:"1px solid #dee2e6",borderRadius:"8px",color:"#6c757d",textAlign:"center",fontStyle:"italic"},children:t("Loading existing files...")}),e.jsx("input",{ref:Te,id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:v=>L(v,je),style:{display:"none"}}),Z&&G===!0&&Ds&&e.jsxs("div",{style:{padding:"32px",marginBottom:"32px",backgroundColor:"#f8f9fa",border:"2px solid #e9ecef",borderRadius:"12px",direction:s?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",fontSize:"18px",color:"#495057",fontWeight:"600",marginBottom:"24px",flexDirection:s?"row-reverse":"row"},children:[e.jsx("span",{style:{marginRight:s?"0":"12px",marginLeft:s?"12px":"0",fontSize:"20px"},children:"🏷️"}),t("Select files to start adding or removing tags")]}),de.length>0&&e.jsx(wr,{existingFiles:de,selectedExistingIndices:i.selectedExistingIndices,onToggleSelection:ms,onSelectAll:xs,onDeselectAll:bs,onDeleteFile:hs,disabled:Ce,isCreator:G,participantsCanDeleteItems:K,existingFileTagsMap:i.existingFileTagsMap,t,isRTL:s}),e.jsx(yr,{selectedPhotos:f,selectedPhotoIndices:i.selectedPhotoIndices,onToggleSelection:ws,onSelectAll:ys,onDeselectAll:Ts,onRemovePhoto:gs,onDeleteAll:vs,disabled:Ce,photoTagsMap:i.photoTagsMap,columns:ye,setColumns:fs,t,isRTL:s}),(i.selectedPhotoIndices.size>0||i.selectedExistingIndices.size>0)&&e.jsx(ot,{tagsManager:us,disabled:Ce,enhancedLog:re})]}),e.jsx(rs,{isSavingAlbum:l,savingProgress:O}),e.jsx(tr,{children:e.jsx(at,{onClick:Cs,disabled:Ce,children:t(T?"Uploading...":"Add More Photos")})}),e.jsx(Dt,{t,language:r,usernameManager:c,onSuccess:$s}),e.jsx(cs,{isOpen:W,onClose:Ps,initialOption:oe,initialPassword:k}),e.jsx(Wr,{debugMessages:D,t,isRTL:s,textDirection:s?"rtl":"ltr"})]})]})},Yr=P.div`
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
`,Xr=P.div`
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
`,Zr=P.div`
  flex: 1;
`,Lr=P.h3`
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
`,ea=P.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
`,ta=P.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: stretch;
  }
`,Pt=P.button`
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
`,sa=P.button`
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
`,ra=P.div`
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
`,Ze=P.div`
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,Le=P.h4`
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #333;
`,et=P.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  padding: 4px 0;
`,tt=P.div`
  font-size: 13px;
  color: #333;
  line-height: 1.4;
`,st=P.label`
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
`,rt=P.span`
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
`,aa=P.button`
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
`,It=P.div`
  margin-bottom: 16px;
`,At=P.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #333;
  font-size: 14px;
`,ia=P.input`
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
`,oa=P.textarea`
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
`,na=P.div`
  margin-top: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e9ecef;
`,la=P.div`
  width: 100%;
  height: 6px;
  background: #e9ecef;
  border-radius: 3px;
  overflow: hidden;
  margin-top: 8px;
`,ca=P.div`
  height: 100%;
  background: linear-gradient(90deg, #007bff, #28a745);
  width: ${t=>t.$progress}%;
  transition: width 0.3s ease;
`,da=P.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
  justify-content: flex-end;
  flex-direction: ${t=>t.$isRTL?"row-reverse":"row"};
`,kt=P.button`
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
`,ua=({album:t,onUpdate:r,onSave:s,onRemove:n,onShowPasswordDialog:u,disabled:g,columns:i,enhancedLog:o})=>{const{t:c,language:d}=ge(),m=Fe(d)==="rtl",[h,p]=a.useState(!1),[l,y]=a.useState(!1),O=a.useRef(null);a.useEffect(()=>{const S=A=>{O.current&&!O.current.contains(A.target)&&p(!1)};return document.addEventListener("mousedown",S),()=>{document.removeEventListener("mousedown",S)}},[]);const z=ds(t.photoTagsMap,S=>{const A=typeof S=="function"?S(t.photoTagsMap):S;r({photoTagsMap:A})},new Map,()=>{},t.selectedPhotoIndices,new Set,o),I=S=>{r({name:S})},Q=S=>{r({description:S})},te=S=>{const A=new Set(t.selectedPhotoIndices);A.has(S)?A.delete(S):A.add(S),r({selectedPhotoIndices:A})},w=()=>{const S=new Set;for(let A=0;A<t.photos.length;A++)S.add(A);r({selectedPhotoIndices:S})},Z=()=>{r({selectedPhotoIndices:new Set})},se=()=>{confirm(c("Are you sure you want to delete all files from this album? This action cannot be undone."))&&r({photos:[],selectedPhotoIndices:new Set,photoTagsMap:new Map})},W=S=>{const A=t.photos.filter((G,M)=>M!==S),K=new Set;t.selectedPhotoIndices.forEach(G=>{G<S?K.add(G):G>S&&K.add(G-1)});const U=new Map;t.photoTagsMap.forEach((G,M)=>{M<S?U.set(M,G):M>S&&U.set(M-1,G)}),r({photos:A,selectedPhotoIndices:K,photoTagsMap:U})},Y=()=>{r({isOnPublicProfile:!t.isOnPublicProfile})},oe=()=>{r({participantsCanAddItems:!t.participantsCanAddItems})},ee=()=>{r({participantsCanDeleteItems:!t.participantsCanDeleteItems})},k=()=>{u(t.id)},J=async()=>{if(!(l||g)){y(!0),o(`Starting save for album: ${t.name}`);try{const S=await s();o(`Save completed for album: ${t.name}, success: ${S}`),S||alert(c('Failed to save album "{{albumName}}". Please try again.',{albumName:t.name}))}catch(S){console.error("Error saving album:",S),o(`Error saving album ${t.name}: ${S}`),alert(c('Failed to save album "{{albumName}}". Please try again.',{albumName:t.name}))}finally{y(!1)}}},ne=t.passwordProtectionOption!=="NoPassword"&&t.albumPassword,F=g||l||t.isSaving;return e.jsxs(Yr,{children:[e.jsxs(Xr,{$isRTL:m,children:[e.jsxs(Zr,{children:[e.jsxs(Lr,{children:[e.jsx("span",{children:"📁"}),t.name,(t.isSaving||l)&&e.jsx("span",{style:{color:"#007bff"},children:"⏳"}),t.savingProgress===100&&e.jsx("span",{style:{color:"#28a745"},children:"✅"})]}),e.jsxs(ea,{children:[t.photos.length===1?c("1 file"):c("{{count}} files",{count:t.photos.length}),t.selectedPhotoIndices.size>0&&e.jsxs("span",{children:[" • ",c("{{count}} selected for tagging",{count:t.selectedPhotoIndices.size})]})]})]}),e.jsx(ta,{children:!t.isSaving&&!l&&t.savingProgress<100&&e.jsxs(e.Fragment,{children:[e.jsx(Pt,{$variant:"primary",onClick:J,disabled:F,children:c(l?"Saving...":"Save")}),e.jsxs("div",{ref:O,style:{position:"relative"},children:[e.jsx(sa,{onClick:()=>p(!h),disabled:F,title:c("Album Settings"),children:"⚙️"}),h&&e.jsxs(ra,{$isRTL:m,children:[e.jsxs(Ze,{children:[e.jsx(Le,{children:c("Visibility")}),e.jsxs(et,{children:[e.jsx(tt,{children:c("Public Profile")}),e.jsxs(st,{children:[e.jsx("input",{type:"checkbox",checked:t.isOnPublicProfile,onChange:Y,disabled:F}),e.jsx(rt,{})]})]})]}),e.jsxs(Ze,{children:[e.jsx(Le,{children:c("Participant Permissions")}),e.jsxs(et,{children:[e.jsx(tt,{children:c("Can Add Items")}),e.jsxs(st,{children:[e.jsx("input",{type:"checkbox",checked:t.participantsCanAddItems,onChange:oe,disabled:F}),e.jsx(rt,{})]})]}),e.jsxs(et,{children:[e.jsx(tt,{children:c("Can Delete Items")}),e.jsxs(st,{children:[e.jsx("input",{type:"checkbox",checked:t.participantsCanDeleteItems,onChange:ee,disabled:F}),e.jsx(rt,{})]})]})]}),e.jsxs(Ze,{children:[e.jsx(Le,{children:c("Security")}),e.jsxs(aa,{$hasPassword:!!ne,onClick:k,disabled:F,children:[ne?"🔒":"🔓",c(ne?"Password Set":"Set Password")]})]})]})]}),e.jsx(Pt,{$variant:"danger",onClick:n,disabled:F,children:c("Remove")})]})})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",marginBottom:"20px"},children:[e.jsxs(It,{children:[e.jsx(At,{children:c("Album Name")}),e.jsx(ia,{type:"text",value:t.name,onChange:S=>I(S.target.value),placeholder:c("e.g. Family Vacation in Kyoto"),disabled:F})]}),e.jsxs("div",{children:[e.jsxs(It,{children:[e.jsx(At,{children:c("Album Description")}),e.jsx(oa,{value:t.description,onChange:S=>Q(S.target.value),placeholder:c("e.g. what's special about this album"),disabled:F,rows:3})]}),t.photos.length>0&&e.jsxs(da,{$isRTL:m,children:[e.jsx(kt,{onClick:t.selectedPhotoIndices.size>0?Z:w,disabled:F,children:t.selectedPhotoIndices.size>0?c("Done Tagging Selected"):c("Select All")}),t.selectedPhotoIndices.size===0&&e.jsx(kt,{$variant:"danger",onClick:se,disabled:F,children:c("Delete All")})]})]})]}),e.jsx(nt,{selectedPhotos:t.photos,selectedPhotoIndices:t.selectedPhotoIndices,isSavingAlbum:F,onRemovePhoto:W,onTogglePhotoSelection:te,onSelectAllPhotos:w,onDeselectAllPhotos:Z,hideHeader:!1,photoTagsMap:t.photoTagsMap,columns:i,isMultipleAlbumMode:!0}),t.selectedPhotoIndices.size>0&&e.jsx(na,{children:e.jsx(ot,{tagsManager:z,disabled:F,enhancedLog:o})}),(t.isSaving||l)&&e.jsxs("div",{style:{marginTop:"16px"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},children:[e.jsx("span",{style:{fontSize:"14px",fontWeight:"600",color:"#333"},children:c(l?"Starting save...":"Saving album...")}),e.jsx("span",{style:{fontSize:"14px",color:"#666"},children:c("{{progress}}%",{progress:t.savingProgress})})]}),e.jsx(la,{children:e.jsx(ca,{$progress:t.savingProgress})})]})]})},pa=P.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
`,fa=({albums:t,setAlbums:r,isSavingAny:s,onSaveAlbum:n,onRemoveAlbum:u,onShowPasswordDialog:g,columns:i,setColumns:o,enhancedLog:c})=>{const{language:d}=ge(),m=Fe(d)==="rtl",h=a.useCallback((l,y)=>{r(O=>O.map(z=>z.id===l?{...z,...y}:z))},[r]),p=a.useCallback(async l=>{try{const y=await n(l);return c(`Album ${l} save result: ${y?"success":"failed"}`),y}catch(y){return c(`Error saving album ${l}: ${y}`),!1}},[n,c]);return e.jsx("div",{children:e.jsx(pa,{$isRTL:m,children:t.map(l=>e.jsx(ua,{album:l,onUpdate:y=>h(l.id,y),onSave:()=>p(l.id),onRemove:()=>u(l.id),onShowPasswordDialog:g,disabled:s,columns:i,setColumns:o,enhancedLog:c},l.id))})})},ga=()=>{var Ne,Ae;const{t,language:r}=ge(),s=Fe(r)==="rtl",[n,u]=a.useState([]),[g,i]=a.useState("2"),[o,c]=a.useState(!1),[d,m]=a.useState(!1),[h,p]=a.useState(null),[l,y]=a.useState(null),[O,z]=a.useState(!1),[I,Q]=a.useState(0),[te,w]=a.useState(0),[Z,se]=a.useState(""),[W,Y]=a.useState({isOnPublicProfile:!1,participantsCanAddItems:!0,participantsCanDeleteItems:!1,passwordProtectionOption:"NoPassword",albumPassword:""}),oe=Ct(t),{setShowUsernamePrompt:ee,setUsernameInput:k}=oe,[J,ne]=a.useState(null);a.useEffect(()=>{const x=localStorage.getItem(he.PUBLIC_USERNAME);ne(x||null)},[]);const F=(x,N)=>{const B=new Date().toISOString();console.log(`[${B}] ${x}`,N)};a.useEffect(()=>{(async()=>{try{const N=await be();if(N){const H=JSON.parse(atob(N.split(".")[1]))["cognito:username"];H&&(y(H),F(`Initialized Cognito username: ${H}`))}}catch(N){console.error("Error initializing username:",N)}})()},[]);const S=x=>{i(x),localStorage.setItem("save-album-columns",x),F(`Column setting changed to ${x} for all albums`)};a.useEffect(()=>{const x=localStorage.getItem(he.MULTI_ALBUM_DATA);if(x)try{const B=JSON.parse(x).filter(ae=>{if(!ae||!ae.name||!Array.isArray(ae.selectedPhotos))return!1;const re=ae.selectedPhotos.filter(ue=>ue&&ue.fileName&&ue.originalFileName&&ue.s3PreviewUrl&&ue.s3PreviewUrl.includes("amazonaws.com"));return ae.selectedPhotos=re,re.length>0});if(B.length===0){alert(t("No valid albums were found. Please try selecting your files again.")),Re("my-albums.html");return}const H=B.map(ae=>({id:xt(),name:ae.name,description:"",photos:ae.selectedPhotos,selectedPhotoIndices:new Set,photoTagsMap:new Map,isOnPublicProfile:!1,participantsCanAddItems:!0,participantsCanDeleteItems:!1,passwordProtectionOption:"NoPassword",albumPassword:"",isSaving:!1,savingProgress:0,folderId:""}));u(H),Xe()}catch(N){console.error("Error parsing multi-album data:",N),alert(t("There was an error loading your albums. Please try selecting your files again.")),Re("my-albums.html")}else alert(t("No album data was found. Please try selecting your files again.")),Re("my-albums.html")},[t]),a.useEffect(()=>{const x=localStorage.getItem("save-album-columns")||"2";i(x)},[]);const A=(x,N)=>{F(`Album ${x} progress: ${N}`)},K=(x,N)=>{u(B=>B.map(H=>H.id===x?{...H,savingProgress:N}:H))},U=async(x,N,B)=>{F(`Starting chunked save for album ${x}`),A(x,t("Processing files in chunks..."));const H=48;if(B.length===0)F(`No file references for album ${x}, saving only folder position`),await Ee.saveFolderOnly(N,F);else{const ae=Ut(B);F(`Album ${x}: Processing ${ae.length} unique file references`);const re=Gt(ae,H);F(`Album ${x}: Split into ${re.length} chunks`);for(let ue=0;ue<re.length;ue++){const ke=re[ue];F(`Album ${x}: Processing chunk ${ue+1} of ${re.length}`);const Te=ue/re.length*80;K(x,10+Te),ue<re.length-1?(A(x,t("Saving files: chunk {{chunkNumber}} of {{totalChunks}}...",{chunkNumber:ue+1,totalChunks:re.length})),await Ee.saveFileReferences(ke,F)):(A(x,t("Finalizing album...")),await Ee.saveFinalChunkWithFolder(ke,N,F))}}K(x,100),A(x,t("Album saved successfully!"))},G=async x=>{const N=n.find(B=>B.id===x);if(!N)return F(`Album ${x} not found`),!1;if(N.photos.length===0)return alert(t('The album "{{albumName}}" has no photos to save.',{albumName:N.name})),!1;if(!l)return F(`No Cognito username available for album ${x}`),!1;F(`Starting real save for album: ${N.name}`),u(B=>B.map(H=>H.id===x?{...H,isSaving:!0,savingProgress:5}:H));try{const B=Math.floor(Date.now()/1e3),H=`${l}_____${xt()}____Folder`,ae=`${l}_____${l}____Account`,ue=H.split("_____")[1].split("____")[0];F(`Album ${x} folder ID: ${H}`),u(b=>b.map(T=>T.id===x?{...T,folderId:H}:T));const ke=Wt(B,ae,ue,H,l,N.isOnPublicProfile,N.participantsCanAddItems,N.participantsCanDeleteItems,N.passwordProtectionOption,N.albumPassword,N.name,N.description,!1,[],F),Te=N.photos.filter(b=>b.status==="complete");F(`Album ${x}: ${Te.length} valid photos`);let f=[];if(Te.length>0){const b=Te.filter(T=>!T.fileId);b.length>0&&(F(`Album ${x}: Moving ${b.length} files to public folder`),A(x,t("Moving files...")),await jt(b,T=>K(x,T),F)),F(`Album ${x}: Creating file reference inputs`),f=Kt(Te,B,ae,H,l,N.photoTagsMap,F)}return await U(x,ke,f),u(b=>b.map(T=>T.id===x?{...T,isSaving:!1,savingProgress:100}:T)),F(`Successfully saved album: ${N.name}`),!0}catch(B){return console.error(`Error saving album ${x}:`,B),F(`Error saving album ${x}: ${B}`),u(H=>H.map(ae=>ae.id===x?{...ae,isSaving:!1,savingProgress:0}:ae)),alert(t('Failed to save album "{{albumName}}". Please try again.',{albumName:N.name})),!1}},M=async()=>{if(J!=null&&J.startsWith("Profile-")){k(""),ee(!0);return}if(!l){alert(t("Unable to determine user credentials. Please refresh and try again."));return}const x=n.filter(B=>B.savingProgress<100);if(x.length===0)return;F(`Starting save process for ${x.length} albums`),z(!0),w(x.length),Q(0);const N=[];try{for(let B=0;B<x.length;B++){const H=x[B];Q(B+1),se(H.name),F(`Saving album ${B+1} of ${x.length}: ${H.name}`),await G(H.id)||N.push(H.name),await new Promise(re=>setTimeout(re,200))}if(N.length===0)F("All albums saved successfully, cleaning up and redirecting"),setTimeout(()=>{localStorage.removeItem(he.MULTI_ALBUM_DATA),Xe(),sessionStorage.setItem("album_just_saved","true"),Re("my-albums.html")},1e3);else{const B=N.length===1?t('Failed to save album "{{albumName}}". Please try again.',{albumName:N[0]}):t("Failed to save {{count}} albums: {{albumNames}}. Please try again.",{count:N.length,albumNames:N.join(", ")});alert(B)}}catch(B){console.error("Error in save all albums:",B),alert(t("There was an error saving albums. Please try again."))}finally{z(!1),Q(0),w(0),se("")}},le=x=>{localStorage.setItem(he.PUBLIC_USERNAME,x),ne(x),ee(!1),z(!1),Q(0),w(0),se(""),M()},ce=x=>{const N=n.find(B=>B.id===x);N&&(p(x),Y(B=>({...B,passwordProtectionOption:N.passwordProtectionOption,albumPassword:N.albumPassword})),m(!0))},fe=()=>{p(null),m(!0)},we=(x,N)=>{x!==void 0&&N!==void 0&&(h?u(B=>B.map(H=>H.id===h?{...H,passwordProtectionOption:x,albumPassword:N}:H)):Y(B=>({...B,passwordProtectionOption:x,albumPassword:N}))),m(!1),p(null)},ye=()=>{u(x=>x.map(N=>({...N,isOnPublicProfile:W.isOnPublicProfile,participantsCanAddItems:W.participantsCanAddItems,participantsCanDeleteItems:W.participantsCanDeleteItems,passwordProtectionOption:W.passwordProtectionOption,albumPassword:W.albumPassword}))),c(!1),F("Applied global settings to all albums",W)},Pe=x=>{const N=n.find(H=>H.id===x);if(N&&!confirm(t('Are you sure you want to remove the album "{{albumName}}"?',{albumName:N.name})))return;const B=n.filter(H=>H.id!==x);u(B),B.length===0&&(localStorage.removeItem(he.MULTI_ALBUM_DATA),Xe(),Re("my-albums.html"))},de=n.some(x=>x.isSaving)||O,Ie=n.some(x=>x.savingProgress<100);return e.jsxs(e.Fragment,{children:[e.jsx(_t,{}),e.jsx("style",{children:`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}),e.jsx(Rt,{children:e.jsxs(zt,{children:[e.jsx(Ot,{href:"my-albums.html",children:t("Back to Albums")}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx(sr,{children:t("Columns:")}),e.jsxs(rr,{value:g,onChange:x=>S(x.target.value),disabled:de,children:[e.jsx("option",{value:"1",children:"1"}),e.jsx("option",{value:"2",children:"2"}),e.jsx("option",{value:"3",children:"3"}),e.jsx("option",{value:"4",children:"4"}),e.jsx("option",{value:"5",children:"5"})]})]}),e.jsxs("div",{style:{position:"relative"},children:[e.jsx(ls,{onClick:()=>c(!o),disabled:de,title:t("Global Settings for All Albums")}),e.jsx(Sr,{showGlobalGear:o,globalSettings:W,setGlobalSettings:Y,onPasswordClick:fe,onApplySettings:ye})]}),Ie&&e.jsx(at,{$primary:!0,onClick:M,disabled:de,style:{minWidth:"160px",fontSize:"14px",padding:"8px 16px"},children:O?t("Saving {{current}} of {{total}}...",{current:I,total:te}):n.length===1?t("Save 1 Album"):t("Save {{count}} Albums",{count:n.filter(x=>x.savingProgress<100).length})})]})]})}),e.jsxs(Mt,{$isRTL:s,children:[O&&e.jsxs("div",{style:{marginBottom:"24px",padding:"20px",backgroundColor:"#e3f2fd",border:"2px solid #2196f3",borderRadius:"12px",boxShadow:"0 4px 12px rgba(33, 150, 243, 0.1)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"16px",marginBottom:"16px"},children:[e.jsx("div",{style:{width:"24px",height:"24px",border:"3px solid #e3f2fd",borderTop:"3px solid #2196f3",borderRadius:"50%",animation:"spin 1s linear infinite"}}),e.jsxs("div",{children:[e.jsxs("div",{style:{fontSize:"16px",fontWeight:"600",color:"#1565c0",marginBottom:"4px"},children:[t("Saving Albums")," (",I," / ",te,")"]}),e.jsx("div",{style:{fontSize:"14px",color:"#1976d2"},children:t("Currently saving: {{albumName}}",{albumName:Z})})]})]}),e.jsx("div",{style:{width:"100%",height:"8px",backgroundColor:"#bbdefb",borderRadius:"4px",overflow:"hidden"},children:e.jsx("div",{style:{width:`${I/te*100}%`,height:"100%",backgroundColor:"#2196f3",transition:"width 0.3s ease",borderRadius:"4px"}})}),e.jsx("div",{style:{marginTop:"8px",fontSize:"12px",color:"#1976d2",textAlign:"center"},children:t("Please wait while your albums are being saved...")})]}),e.jsx(fa,{albums:n,setAlbums:u,isSavingAny:de,onSaveAlbum:G,onRemoveAlbum:Pe,onShowPasswordDialog:ce,columns:g,setColumns:S,enhancedLog:F})]}),e.jsx(cs,{isOpen:d,onClose:we,initialOption:h?((Ne=n.find(x=>x.id===h))==null?void 0:Ne.passwordProtectionOption)||"NoPassword":W.passwordProtectionOption,initialPassword:h?((Ae=n.find(x=>x.id===h))==null?void 0:Ae.albumPassword)||"":W.albumPassword}),e.jsx(Dt,{t,language:r,usernameManager:oe,onSuccess:le})]})},ha=()=>{const[t,r]=a.useState(!1),[s,n]=a.useState(!1);return a.useEffect(()=>{if(typeof window<"u"){const g=new URLSearchParams(window.location.search).get("mode");r(g==="multiple"),n(!0)}},[]),s?t?e.jsx(ga,{}):e.jsx($t,{}):e.jsx($t,{})},ma=()=>e.jsx(Bs,{children:e.jsx(ha,{})});if(typeof document<"u"){const t=document.getElementById("root");t&&Ms.createRoot(t).render(e.jsx(ma,{}))}
