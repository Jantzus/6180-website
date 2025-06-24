import{h as ce,f as Se,a as h,L as oe,i as at,s as ms,k as xs,l as bs,m as ws,n as ys,r as ve,d as S,o as ue,u as ie,j as e,g as be,p as Ts,R as vs,I as Ss}from"./utils-C9eagC26.js";import{F as $s}from"./types-Cxncrjqw.js";import{u as Ps,U as Is}from"./UploadProgress-BUvPoE8d.js";import{u as As,U as js}from"./UsernamePrompt-BrHdQ3lB.js";import{L as ks}from"./LazyImage-DL8fCKIe.js";import{P as Cs,S as Ds,e as Fs,V as Es,f as _s,g as wt,h as yt,M as Ns,C as Tt,i as zs,j as Rs,F as ot,k as nt,l as Os,m as Ms,G as vt,n as St,o as $t,p as Pt,B as Ve,q as It,r as Bs,s as Us,t as Gs}from"./styled-components-cZY8FpoG.js";import{g as lt,c as Ge}from"./folderStructureUtils-BmdkosLC.js";const Ws=`
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
`,Ks=`
  mutation MyMutation($folderPositionInputs: [FolderPositionInput!]) {
    changeFiles(folderPositionInputs: $folderPositionInputs) {
      items {
        id
      }
    }
  }
`,Hs=`
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
`,qs=`
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
`;class Re{static async fetchFolderDetails(a,s){var r,c,x,i,l,o,g,f,m;s(`Fetching details for folder ID: ${a}`);try{const d=await ce();if(!d)return s("No token available for fetching folder details"),null;s("Sending GraphQL query to fetch folder details");const w=await(await fetch(Se,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${d}`},body:JSON.stringify({query:Ws,variables:{folderIds:[a],fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(s("Folder details API response:",w),w.errors)return console.error("GraphQL errors:",w.errors),s(`GraphQL errors: ${JSON.stringify(w.errors)}`),null;const P=((c=(r=w==null?void 0:w.data)==null?void 0:r.fetchFolders)==null?void 0:c.items)||[];if(s(`Found ${P.length} folder items`),P.length===0)return s("No folder items found"),null;const R=P[0];s("Retrieved folder data:",R);const K=((i=(x=R.folderPosition)==null?void 0:x.profileIds)==null?void 0:i.some(v=>v.includes("Public____Profile")))||!1;s(`Folder is on public profile: ${K}`),s("Profile IDs:",(l=R.folderPosition)==null?void 0:l.profileIds);const q=(o=R.folderInviteParameters)==null?void 0:o.usingFolderInviteGrantsRightToAddItems;s(`Participants can add items: ${q}`);const X=(g=R.folderInviteParameters)==null?void 0:g.usingFolderInviteGrantsRightToRemoveItems;return s(`Participants can delete items: ${X}`),{creatorId:R.creatorId||"",folderName:R.folderName||"",folderDescription:R.folderDescription||"",passwordPolicy:((f=R.folderPassword)==null?void 0:f.policy)||"NoPassword",password:((m=R.folderPassword)==null?void 0:m.password)||"",isOnPublicProfile:K,participantsCanAddItems:q!==void 0?q:!0,participantsCanDeleteItems:X!==void 0?X:!1}}catch(d){return console.error("Error in fetchFolderDetails:",d),s(`Error in fetchFolderDetails: ${d}`),null}}static async saveFolderOnly(a,s){var x,i;s("Sending folder-only mutation (no file references, no folder tags)");const r=await ce();if(!r)throw s("No token available for saving album, aborting"),new Error("Authentication token not available");const c={folderPositionInputs:[a]};s("GraphQL folder-only mutation variables:",c);try{s("Sending API request to save folder");const l=await fetch(Se,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({query:Ks,variables:c})});s(`API response status: ${l.status}`);const o=await l.text();s(`API response raw text: ${o}`);const g=JSON.parse(o);if(s("API response JSON:",g),g.errors)throw console.error("Folder save failed:",g.errors),s("Folder save failed with errors:",g.errors),new Error("Failed to save folder");return s("Folder saved successfully"),((i=(x=g.data)==null?void 0:x.changeFiles)==null?void 0:i.items)||[]}catch(l){throw console.error("Error in saveFolderOnly:",l),s(`Error in saveFolderOnly: ${l}`),l}}static async saveFileReferences(a,s){var x,i,l,o,g;s(`Sending file references-only mutation with ${a.length} items (each with individual tags and filenames)`);const r=await ce();if(!r)throw s("No token available for saving file references, aborting"),new Error("Authentication token not available");const c={updatedFileReferenceInputs:a};s("GraphQL file references-only mutation variables (first item):",a.length>0?a[0]:"No items");try{s("Sending API request to save file references with individual tags and filenames");const f=await fetch(Se,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({query:Hs,variables:c})});s(`API response status: ${f.status}`);const m=await f.text();s(`API response raw text: ${m.substring(0,500)}...`);const d=JSON.parse(m);if(s("API response JSON items count:",((l=(i=(x=d.data)==null?void 0:x.changeFiles0)==null?void 0:i.items)==null?void 0:l.length)||0),d.errors)throw console.error("File references save failed:",d.errors),s("File references save failed with errors:",d.errors),new Error("Failed to save file references");return s("File references chunk saved successfully with individual photo tags and filenames"),((g=(o=d.data)==null?void 0:o.changeFiles0)==null?void 0:g.items)||[]}catch(f){throw console.error("Error in saveFileReferences:",f),s(`Error in saveFileReferences: ${f}`),f}}static async saveFinalChunkWithFolder(a,s,r){var i,l,o,g,f,m,d,n,w;r(`Sending final chunk with folder mutation (${a.length} file references with filenames, no folder tags)`);const c=await ce();if(!c)throw r("No token available for saving final chunk, aborting"),new Error("Authentication token not available");const x={folderPositionInputs:[s],updatedFileReferenceInputs:a};r("GraphQL final mutation variables (folder + last chunk with filenames, no folder tags)");try{r("Sending API request for final save with folder (no folder tags, with filenames)");const P=await fetch(Se,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${c}`},body:JSON.stringify({query:qs,variables:x})});r(`API response status: ${P.status}`);const R=await P.text();r(`API response raw text: ${R.substring(0,500)}...`);const K=JSON.parse(R);if(r("API response JSON:",{fileReferencesCount:((o=(l=(i=K.data)==null?void 0:i.changeFiles0)==null?void 0:l.items)==null?void 0:o.length)||0,folderItems:((f=(g=K.data)==null?void 0:g.changeFiles)==null?void 0:f.items)||[]}),K.errors)throw console.error("Final save failed:",K.errors),r("Final save failed with errors:",K.errors),new Error("Failed to complete album save");return r("Final chunk and folder saved successfully (with individual photo tags and filenames)"),{fileReferences:((d=(m=K.data)==null?void 0:m.changeFiles0)==null?void 0:d.items)||[],folderPositions:((w=(n=K.data)==null?void 0:n.changeFiles)==null?void 0:w.items)||[]}}catch(P){throw console.error("Error in saveFinalChunkWithFolder:",P),r(`Error in saveFinalChunkWithFolder: ${P}`),P}}}const Js=(t,a,s,r,c,x,i,l,o,g,f,m,d,n)=>{const[w,P]=h.useState(null),[R,K]=h.useState(null),q=async G=>{n(`Initializing folder ID with username: ${G}`);try{const C=new URLSearchParams(window.location.search).get("folderId");if(n(`Folder ID from URL: ${C||"null"}`),C){t(C),n(`Using existing folder ID: ${C}`);try{n(`Fetching details for folder: ${C}`);const U=await Re.fetchFolderDetails(C,n);if(n("Folder details retrieved:",U),U){const D=`${G}_____${G}____Account`,j=U.creatorId===D;if(n(`User is creator of folder: ${j}, accountId: ${D}, creator: ${U.creatorId}`),s(j),j){n("User is creator, showing folder details"),r(!0),c(U.folderName),x(U.folderDescription),i(U.isOnPublicProfile),n(`Setting isOnPublicProfile: ${U.isOnPublicProfile}`),U.participantsCanAddItems!==void 0&&(l(U.participantsCanAddItems),n(`Setting participantsCanAddItems: ${U.participantsCanAddItems}`)),U.participantsCanDeleteItems!==void 0&&(d(U.participantsCanDeleteItems),n(`Setting participantsCanDeleteItems: ${U.participantsCanDeleteItems}`));const u=U.passwordPolicy;n(`Password policy from folder details: ${u}`),o(u),u!=="NoPassword"&&U.password&&g(U.password),n(`Set password protection option to: ${u}`)}else n("User is NOT the creator, hiding editable fields"),r(!1)}else n("No folder details retrieved, setting isCreator to true"),s(!0),r(!0)}catch(U){console.error("Error fetching folder details:",U),n(`Error fetching folder details: ${U}`),s(!1)}}else{const U=`${G}_____${at()}____Folder`;n(`Creating new folder ID: ${U}`),t(U),n("Setting isCreator to true for new album"),s(!0),r(!0)}}catch(H){console.error("Folder ID initialization error:",H),n(`Folder ID initialization error: ${H}`),s(!1)}},X=()=>{n("Attempting to restore photos from localStorage");try{const G=localStorage.getItem(oe.SELECTED_PHOTOS);if(n(`Found stored photos: ${G?"yes":"no"}`),G)try{const H=JSON.parse(G);n(`Parsed ${H.length} photos from localStorage`),Array.isArray(H)&&H.length>0&&(a(H),n(`Restored ${H.length} photos to state (including original filenames)`))}catch(H){console.error("Error parsing stored photos:",H),n(`Error parsing stored photos: ${H}`)}}catch(G){console.error("Error restoring photos from storage:",G),n(`Error restoring photos from storage: ${G}`)}},v=()=>{n("Testing S3 connection");try{ms?n("S3 client is available"):(console.error("S3 client not available"),n("S3 client not available"))}catch(G){console.error("S3 connection test error:",G),n(`S3 connection test error: ${G}`)}},Y=async()=>{var G;n("Starting component initialization");try{n("Checking login with refresh");const H=await ce();if(!H){n("No token returned from login check, aborting initialization");return}try{const C=localStorage.getItem(oe.PUBLIC_USERNAME);n(`Retrieved public username from localStorage: ${C||"null"}`),K(C||null);const D=JSON.parse(atob(H.split(".")[1]))["cognito:username"];if(D){n(`Extracted Cognito username from token: ${D}`),P(D);const j=localStorage.getItem(oe.SUB_ALBUM_DATA);if(n(`Sub-album data from localStorage: ${j||"null"}`),j)try{const u=JSON.parse(j);if(n("Parsed sub-album data:",u),u.isSubAlbum&&((G=u.selectedFileIds)==null?void 0:G.length)>0){n(`Valid sub-album data found with ${u.selectedFileIds.length} files`),f(!0),m(u.selectedFileIds),u.selectedPhotos&&u.selectedPhotos.length>0&&(n(`Found ${u.selectedPhotos.length} selected photos in sub-album data`),a(u.selectedPhotos)),r(!0),s(!0);const I=`${D}_____${at()}____Folder`;n(`Generated new folder ID for sub-album: ${I}`),t(I)}else n("Invalid sub-album data, proceeding with normal initialization"),await q(D)}catch(u){console.error("Error parsing sub-album data:",u),n(`Error parsing sub-album data: ${u}`),await q(D)}else n("No sub-album data found, proceeding with normal folder initialization"),await q(D)}else n("No Cognito username found in token")}catch(C){console.error("User data initialization error:",C),n(`User data initialization error: ${C}`)}X(),v(),n("Component initialization completed")}catch(H){console.error("Initialization error:",H),n(`Initialization error: ${H}`)}};return h.useEffect(()=>{Y()},[]),{cognitoUsername:w,publicUsername:R,setPublicUsername:K}},At=t=>t.map(a=>({TagType:a.TagType,tagTitle:a.tagTitle,subtags:a.subtags.map(s=>({TagType:a.TagType,tagTitle:s.tagTitle,subtagTitle:s.subtagTitle}))})),Qs=t=>{const a=new Set;return t.filter(s=>a.has(s.fileId)?!1:(a.add(s.fileId),!0))},Vs=(t,a)=>{const s=[];for(let r=0;r<t.length;r+=a)s.push(t.slice(r,r+a));return s},Ys=(t,a,s,r,c,x,i,l,o,g,f,m,d,n,w)=>{w("Creating folder position input WITHOUT folder-level tags"),w(`Profile visibility: ${x?"Public":"Only Me"}`);const P=x?[`${c}_____Public____Profile`]:["Only Me_____Only Me____Profile"];w(`Profile IDs: ${JSON.stringify(P)}`);let R=[];d&&n.length>0&&(w(`Creating file reference IDs for ${n.length} sub-album files`),R=n.map(v=>{const Y=v.split("_____");if(Y.length>=2){const H=Y[1].split("____")[0],C=`${s}_____${H}____FileReference`;return w(`Created file reference ID for sub-album: ${C}`),C}return w(`Using original fileId as fallback: ${v}`),v})),w(`Created ${R.length} acceptedFileReferenceIds`);const K=o!=="NoPassword"?g:null;if(w(`Password protection: ${o}`),w(`Album password: ${K?"******":"null"}`),w(`Participants can add items: ${i}`),w(`Participants can delete items: ${l}`),!r)throw w("Error: folderId is null or undefined"),new Error("folderId is required to create folder position input");const q=xs(r),X=bs(q);return{currentTime:t,folderId:r,profileIds:P,folderPositionPoints:1,acceptedFileReferenceIds:R,folderInput:{folderAboutContactIds:[a],albumNanoId:X,folderName:f,folderDescription:m,folderPasswordInput:{password:K,policy:o},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:i,usingFolderInviteGrantsRightToRemoveItems:l,addedItemsNeedFolderCreatorApproval:!1}}}},Xs=(t,a,s,r,c,x,i)=>(i(`Creating file reference inputs with individual photo tags and original filenames for ${t.length} photos`),t.map((l,o)=>{var w;const g=x.get(o)||[],f=At(g),m=l.originalFileName||l.fileName;if(i(`Photo ${o} (${l.fileName}): ${g.length} tags applied, display name: ${m}`),l.fileId)return i(`Using existing fileId for photo: ${l.fileId}`),{fileReferencesHolderId:r,currentTime:a,points:1,hasBeenDeleted:!1,selectedTagInputs:f,fileId:l.fileId,fileDisplayName:m,fileInput:null};const d=l.type==="video"||(w=l.type)!=null&&w.startsWith("video")?`Input/Video/${l.fileName}`:`Input/Image/${l.fileName}`,n=`${c}_____${l.fileName}____File`;return i(`Created file reference for ${l.fileName}:`),i(`  - dataKey: ${d}`),i(`  - fileId: ${n}`),i(`  - fileDisplayName: ${m}`),i(`  - thumbnailDataKey: ${l.thumbnailDataKey||"undefined"}`),i(`  - size: ${l.size}`),i(`  - thumbnailSize: ${l.thumbnailSize||0}`),i(`  - duration: ${l.duration||"undefined"}`),i(`  - tags: ${g.length} tags selected for this photo`),{fileReferencesHolderId:r,currentTime:a,points:1,hasBeenDeleted:!1,selectedTagInputs:f,fileId:n,fileDisplayName:m,fileInput:{fileId:n,ownerFileInput:{editorContactIds:[s],FileSharingOptionsEnum:"Anyone",dataKey:d,thumbnailDataKey:l.thumbnailDataKey,dataInBytes:l.size,thumbnailDataInBytes:l.thumbnailSize||0,s3UploadedAt:a,durationInSeconds:l.duration},editorFileInput:{aboutContactIds:[s],captionText:"",numericFilterInputs:[]}}}})),Zs=(t,a,s,r,c,x,i)=>{const l=[];return c.forEach(o=>{const g=x.get(o)||[];if(g.length>0){const f=r[o];if(f){const m=f.dataKey.split("/"),d=m[m.length-1],n=`${s}_____${d}____File`,w=f.fileName||d,P=At(g);i(`Creating file reference for existing file ${o} (${d}) with ${g.length} tags, display name: ${w}`),l.push({fileReferencesHolderId:a,currentTime:t,points:1,hasBeenDeleted:!1,selectedTagInputs:P,fileId:n,fileDisplayName:w,fileInput:null})}}}),i(`Created ${l.length} file references for existing files with tags and filenames`),l},Ls=(t,a,s,r,c,x,i,l,o,g,f,m,d,n,w,P,R,K,q,X,v,Y)=>{const G=u=>{v(`Save progress text: ${u}`);const I=document.getElementById("saveProgressText");I&&(I.innerText=u)},H=u=>{const I=document.getElementById("saveProgress");I?(I.style.width=`${u}%`,v(`Updated save progress bar: ${u}%`)):v("Progress bar element not found"),K(u)},C=()=>(v("Validating required data"),a?t?(v("All required data validated successfully"),!0):(v("No folder ID, validation failed"),!1):(v("No Cognito username, validation failed"),!1)),U=()=>{v("Handling successful save"),ys(q,X,[oe.SELECTED_PHOTOS,oe.SUB_ALBUM_DATA],v),v("Album data cleared"),G(Y("Album saved successfully!")),sessionStorage.setItem("album_just_saved","true"),v("Set 'album_just_saved' flag in sessionStorage"),v("Setting timeout for redirect to my-albums.html"),setTimeout(()=>{v("Redirecting to my-albums.html"),ve("my-albums.html")},1e3)},D=async(u,I)=>{v("Starting chunked save process (individual photo tags with filenames, no folder tags, including existing files with tags)");try{G(Y("Processing files in chunks..."));const E=48;if(I.length===0)v("No file references to process, saving only folder position (no folder tags)"),await Re.saveFolderOnly(u,v);else{const _=Qs(I);v(`After removing duplicates, processing ${_.length} unique file references`);const O=Vs(_,E);v(`Split file references into ${O.length} chunks of max size ${E}`);for(let J=0;J<O.length;J++){const ee=O[J];v(`Processing chunk ${J+1} of ${O.length} with ${ee.length} file references`);const ne=J/O.length*80;K(10+ne),H(10+ne),J<O.length-1?(G(Y("Saving files: chunk {{chunkNumber}} of {{totalChunks}}...",{chunkNumber:J+1,totalChunks:O.length})),await Re.saveFileReferences(ee,v)):(G(Y("Finalizing album...")),await Re.saveFinalChunkWithFolder(ee,u,v))}}K(100),H(100),G(Y("Album saved successfully!")),U()}catch(E){console.error("Error in chunked save process:",E),v(`Error in chunked save process: ${E}`),G(Y("Error: {{error}}",{error:String(E)})),R(!1)}};return{saveAlbumDirectly:async()=>{v("Starting direct album save with individual photo tagging, existing file tagging, and original filenames"),v(`Photo tags map: ${d.size} photos have tags applied`),v(`Existing file tags map: ${n.size} existing files have tags applied`),R(!0),K(5);try{if(v("Validating required data for save"),!C()){v("Required data validation failed, aborting save"),R(!1);return}const u=Math.floor(Date.now()/1e3),I=`${a}_____${a}____Account`,_=t.split("_____")[1].split("____")[0];v(`Save timestamp: ${u}`),v(`Account ID: ${I}`),v(`Folder ID: ${t}`),v(`Folder target item identifier: ${_}`),v("Creating folder position input (no folder tags)");const O=Ys(u,I,_,t,a,l,o,g,f,m,x,i,r,c,v);v("Folder position input created:",O);let J=[];const ee=s.filter(ae=>ae.status==="complete");if(v(`Found ${ee.length} valid photos with 'complete' status`),ee.length>0){const ae=ee.filter(we=>!we.fileId);v(`Found ${ae.length} new uploads to move from temp to public folder`),ae.length>0&&(v("Moving files from temp to public folder"),await ws(ae,H,v)),v("Creating file reference inputs for uploads with individual photo tags and original filenames");const le=Xs(ee,u,I,t,a,d,v);v(`Created ${le.length} file reference inputs for uploads`,le),J=J.concat(le)}const ne=Zs(u,t,a,w,P,n,v);if(ne.length>0&&(v(`Adding ${ne.length} existing file references with tags and filenames`),J=J.concat(ne)),r&&c.length>0){v(`Adding ${c.length} existing file references for sub-album`);const ae=c.map(le=>{v(`Creating file reference for existing sub-album file ID: ${le}`);const we=[],ge=le.split("_____"),re=ge.length>=2?ge[1].split("____")[0]:le;return{fileReferencesHolderId:t,currentTime:u,points:1,hasBeenDeleted:!1,selectedTagInputs:we,fileId:le,fileDisplayName:re,fileInput:null}});v(`Created ${ae.length} file reference inputs for sub-album files`,ae),J=J.concat(ae)}v(`Total file reference inputs: ${J.length}`),v("Sending GraphQL mutations with chunked file references (individual photo tags, existing file tags, and original filenames)"),await D(O,J)}catch(u){console.error("Error in saveAlbumDirectly:",u),v(`Error in saveAlbumDirectly: ${u}`),R(!1)}}}},ei=`
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
`,ti=`
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
`,si=`
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
`,ii=`
  mutation DeleteTag($tagId: String!) {
    deleteTag(tagId: $tagId) {
      id
      hasBeenDeleted
    }
  }
`,ri=`
  mutation DeleteSubtag($subtagId: String!) {
    deleteSubtag(subtagId: $subtagId) {
      id
      hasBeenDeleted
    }
  }
`,jt=(t,a,s,r,c,x,i)=>{const[l,o]=h.useState([]),[g,f]=h.useState(null),[m,d]=h.useState(!1),[n,w]=h.useState(null),[P,R]=h.useState(null),[K,q]=h.useState(!1),[X,v]=h.useState(!1),[Y,G]=h.useState(""),[H,C]=h.useState(""),[U,D]=h.useState(!1),[j,u]=h.useState(!1),I=h.useMemo(()=>({photoIndices:Array.from(c),existingIndices:Array.from(x)}),[c,x]),E=()=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(p){const $=Math.random()*16|0;return(p=="x"?$:$&3|8).toString(16)}),_=h.useCallback(()=>{const p=[];t.forEach(k=>{p.push(...k)}),s.forEach(k=>{p.push(...k)});const $=new Map;return p.forEach(k=>{if($.has(k.tagTitle)){const W=$.get(k.tagTitle),F=[...W.subtags,...k.subtags],y=Array.from(new Map(F.map(b=>[b.subtagTitle,b])).values());$.set(k.tagTitle,{...W,subtags:y})}else $.set(k.tagTitle,k)}),Array.from($.values())},[t,s]),O=h.useCallback((p,$)=>{const k=[],W=Math.floor(Date.now()/1e3);return $.forEach(F=>{const y=p.find(b=>b.tagTitle===F.tagTitle);if(y){const b=[];if(F.subtags.forEach(B=>{var z;if(!((z=y.subtags)==null?void 0:z.find(Q=>Q.subtagTitle===B.subtagTitle))){const Q={id:E(),tagTitle:B.tagTitle,subtagTitle:B.subtagTitle,TagType:F.TagType||"File",points:1,createdAt:W,updatedAt:W,isCreatedFromApplied:!0};b.push(Q),i(`Created missing subtag from applied tags: ${B.subtagTitle} for tag ${B.tagTitle}`)}}),b.length>0){const B=p.findIndex(N=>N.id===y.id);B!==-1&&(p[B]={...y,subtags:[...y.subtags||[],...b]})}}else{const b={id:E(),tagTitle:F.tagTitle,TagType:F.TagType||"File",points:1,createdAt:W,updatedAt:W,subtags:[],isCreatedFromApplied:!0};F.subtags&&F.subtags.length>0&&(b.subtags=F.subtags.map(B=>({id:E(),tagTitle:B.tagTitle,subtagTitle:B.subtagTitle,TagType:F.TagType||"File",points:1,createdAt:W,updatedAt:W,isCreatedFromApplied:!0}))),k.push(b),i(`Created missing tag from applied tags: ${F.tagTitle} with ${F.subtags.length} subtags`)}}),k},[E,i]),J=h.useCallback(p=>{const{photoIndices:$,existingIndices:k}=I;if($.length===0&&k.length===0)return!1;const W=$.length===0||$.every(b=>(t.get(b)||[]).some(N=>N.tagTitle===p.tagTitle)),F=k.length===0||k.every(b=>(s.get(b)||[]).some(N=>N.tagTitle===p.tagTitle)),y=W&&F;return($.length>0||k.length>0)&&i(`Tag "${p.tagTitle}" applied to all selected? ${y} (photos: ${W}, existing: ${F})`),y},[I,t,s,i]),ee=h.useCallback(p=>{const{photoIndices:$,existingIndices:k}=I;let W=0,F=0;$.forEach(z=>{const Z=(t.get(z)||[]).find(fe=>fe.tagTitle===p.tagTitle);Z&&(W++,Z.subtags.some(fe=>fe.subtagTitle===p.subtagTitle)&&F++)});let y=0,b=0;k.forEach(z=>{const Z=(s.get(z)||[]).find(fe=>fe.tagTitle===p.tagTitle);Z&&(y++,Z.subtags.some(fe=>fe.subtagTitle===p.subtagTitle)&&b++)});const B=W+y,N=F+b;return B>0&&N===B},[I,t,s]),ne=h.useCallback(p=>{const{photoIndices:$,existingIndices:k}=I;if($.length===0&&k.length===0){i("No files selected for tag application");return}const W=J(p);i(`${W?"Removing":"Applying"} tag "${p.tagTitle}" ${W?"from":"to"} all selected files`),$.length>0&&a(F=>{const y=new Map(F);return $.forEach(b=>{const B=y.get(b)||[];if(W){const N=B.filter(z=>z.tagTitle!==p.tagTitle);y.set(b,N),i(`Removed tag "${p.tagTitle}" from photo ${b}`)}else if(!B.some(z=>z.tagTitle===p.tagTitle)){const z={tagTitle:p.tagTitle,TagType:p.TagType,subtags:[]};y.set(b,[...B,z]),i(`Added tag "${p.tagTitle}" to photo ${b}`)}}),y}),k.length>0&&r(F=>{const y=new Map(F);return k.forEach(b=>{const B=y.get(b)||[];if(W){const N=B.filter(z=>z.tagTitle!==p.tagTitle);y.set(b,N),i(`Removed tag "${p.tagTitle}" from existing file ${b}`)}else if(!B.some(z=>z.tagTitle===p.tagTitle)){const z={tagTitle:p.tagTitle,TagType:p.TagType,subtags:[]};y.set(b,[...B,z]),i(`Added tag "${p.tagTitle}" to existing file ${b}`)}}),y})},[I,J,a,r,i]),ae=h.useCallback(p=>{const{photoIndices:$,existingIndices:k}=I;if($.length===0&&k.length===0){i("No files selected for subtag application");return}const W=ee(p);i(`${W?"Removing":"Applying"} subtag "${p.subtagTitle}" ${W?"from":"to"} all selected files with parent tag`),$.length>0&&a(F=>{const y=new Map(F);return $.forEach(b=>{const N=(y.get(b)||[]).map(z=>{if(z.tagTitle===p.tagTitle){if(W)return{...z,subtags:z.subtags.filter(Q=>Q.subtagTitle!==p.subtagTitle)};if(!z.subtags.some(Z=>Z.subtagTitle===p.subtagTitle))return{...z,subtags:[...z.subtags,{tagTitle:p.tagTitle,subtagTitle:p.subtagTitle}]}}return z});y.set(b,N)}),y}),k.length>0&&r(F=>{const y=new Map(F);return k.forEach(b=>{const N=(y.get(b)||[]).map(z=>{if(z.tagTitle===p.tagTitle){if(W)return{...z,subtags:z.subtags.filter(Q=>Q.subtagTitle!==p.subtagTitle)};if(!z.subtags.some(Z=>Z.subtagTitle===p.subtagTitle))return{...z,subtags:[...z.subtags,{tagTitle:p.tagTitle,subtagTitle:p.subtagTitle}]}}return z});y.set(b,N)}),y})},[I,ee,a,r,i]),le=h.useCallback(()=>{const{photoIndices:p,existingIndices:$}=I,k=[];p.forEach(y=>{const b=t.get(y)||[];k.push(...b)}),$.forEach(y=>{const b=s.get(y)||[];k.push(...b)});const W=new Map;k.forEach(y=>{if(W.has(y.tagTitle)){const b=W.get(y.tagTitle),B=[...b.subtags,...y.subtags],N=Array.from(new Map(B.map(z=>[z.subtagTitle,z])).values());W.set(y.tagTitle,{...b,subtags:N})}else W.set(y.tagTitle,y)});const F=Array.from(W.values());return i(`getAppliedTagsForSelected: ${F.length} unique tags from ${p.length} photos + ${$.length} existing files`),F},[I,t,s,i]),we=h.useCallback(()=>c.size>0||x.size>0,[c.size,x.size]),ge=async()=>{var p,$;i("Fetching tags from API and checking for missing applied tags"),d(!0);try{const k=await ce();if(!k){i("No token available for fetching tags");return}const F=await(await fetch(Se,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${k}`},body:JSON.stringify({query:ei,variables:{fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(i("Tags API response:",F),F.errors){console.error("GraphQL errors:",F.errors),i(`GraphQL errors: ${JSON.stringify(F.errors)}`);return}let b=((($=(p=F==null?void 0:F.data)==null?void 0:p.fetchRelations)==null?void 0:$.items)||[]).map(N=>{var z,Q;return{id:N.id,tagTitle:N.tagTitle,TagType:N.TagType,points:N.points,createdAt:N.createdAt,updatedAt:N.updatedAt,subtags:((Q=(z=N.subtags)==null?void 0:z.items)==null?void 0:Q.map(Z=>({id:Z.id,tagTitle:Z.tagTitle,subtagTitle:Z.subtagTitle,TagType:Z.TagType,points:Z.points,createdAt:Z.createdAt,updatedAt:Z.updatedAt})))||[]}});i(`Fetched ${b.length} tags from API`);const B=_();if(i(`Found ${B.length} unique applied tags in file maps`),B.length>0){const N=O(b,B);N.length>0&&(i(`Created ${N.length} missing tags from applied tags`),b=[...N,...b])}i(`Final tags list: ${b.length} tags (including ${b.filter(N=>N.isCreatedFromApplied).length} created from applied tags)`),o(b)}catch(k){console.error("Error fetching tags:",k),i(`Error fetching tags: ${k}`)}finally{d(!1)}},re=h.useCallback(p=>{i(`Setting displayed tag: ${p}`),f(p)},[i]),Ee=h.useCallback(()=>{if(!g)return[];const p=l.find($=>$.id===g);return(p==null?void 0:p.subtags)||[]},[g,l]),ke=async(p,$)=>{if(i(`Adding new tag: ${p} of type: ${$}`),!p.trim())return i("Cannot add tag with empty title"),!1;D(!0);try{if(!await ce())return i("No token available for adding tag"),!1;if(await(async()=>(i("PLACEHOLDER: Would send GraphQL mutation to add tag",{mutation:ti,variables:{tagInput:{tagTitle:p.trim(),TagType:$,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(y=>setTimeout(y,500)),!0))()){const y={id:E(),tagTitle:p.trim(),TagType:$,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3),subtags:[]};return o(b=>[y,...b]),ne(y),re(y.id),G(""),q(!1),i(`Successfully added and applied new tag: ${p}`),!0}return!1}catch(k){return console.error("Error adding new tag:",k),i(`Error adding new tag: ${k}`),!1}finally{D(!1)}},Ce=async(p,$,k)=>{if(i(`Adding new subtag: ${$} to tag: ${p}`),!$.trim())return i("Cannot add subtag with empty title"),!1;if(!g)return i("No displayed tag for adding subtag"),!1;u(!0);try{if(!await ce())return i("No token available for adding subtag"),!1;if(await(async()=>(i("PLACEHOLDER: Would send GraphQL mutation to add subtag",{mutation:si,variables:{subtagInput:{tagTitle:p,subtagTitle:$.trim(),TagType:k,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(b=>setTimeout(b,500)),!0))()){const b={id:E(),tagTitle:p,subtagTitle:$.trim(),TagType:k,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3)};return o(B=>B.map(N=>N.id===g?{...N,subtags:[b,...N.subtags||[]]}:N)),ae(b),C(""),v(!1),i(`Successfully added and applied new subtag: ${$}`),!0}return!1}catch(W){return console.error("Error adding new subtag:",W),i(`Error adding new subtag: ${W}`),!1}finally{u(!1)}},_e=async p=>{i(`Deleting tag: ${p}`),w(p);try{if(!await ce())return i("No token available for deleting tag"),!1;if(await(async()=>(i("PLACEHOLDER: Would send GraphQL mutation to delete tag",{mutation:ii,variables:{tagId:p}}),await new Promise(F=>setTimeout(F,500)),!0))()){const F=l.find(y=>y.id===p);return o(y=>y.filter(b=>b.id!==p)),F&&(a(y=>{const b=new Map(y);return y.forEach((B,N)=>{const z=B.filter(Q=>Q.tagTitle!==F.tagTitle);b.set(N,z)}),b}),r(y=>{const b=new Map(y);return y.forEach((B,N)=>{const z=B.filter(Q=>Q.tagTitle!==F.tagTitle);b.set(N,z)}),b})),g===p&&re(null),i(`Successfully deleted tag: ${p}`),!0}return!1}catch($){return console.error("Error deleting tag:",$),i(`Error deleting tag: ${$}`),!1}finally{w(null)}},Ne=async p=>{i(`Deleting subtag: ${p}`),R(p);try{if(!await ce())return i("No token available for deleting subtag"),!1;if(await(async()=>(i("PLACEHOLDER: Would send GraphQL mutation to delete subtag",{mutation:ri,variables:{subtagId:p}}),await new Promise(F=>setTimeout(F,500)),!0))()){let F=null;return o(y=>y.map(b=>{var N;const B=((N=b.subtags)==null?void 0:N.filter(z=>z.id===p?(F=z,!1):!0))||[];return{...b,subtags:B}})),F&&(a(y=>{const b=new Map(y);return y.forEach((B,N)=>{const z=B.map(Q=>Q.tagTitle===F.tagTitle?{...Q,subtags:Q.subtags.filter(Z=>Z.subtagTitle!==F.subtagTitle)}:Q);b.set(N,z)}),b}),r(y=>{const b=new Map(y);return y.forEach((B,N)=>{const z=B.map(Q=>Q.tagTitle===F.tagTitle?{...Q,subtags:Q.subtags.filter(Z=>Z.subtagTitle!==F.subtagTitle)}:Q);b.set(N,z)}),b})),i(`Successfully deleted subtag: ${p}`),!0}return!1}catch($){return console.error("Error deleting subtag:",$),i(`Error deleting subtag: ${$}`),!1}finally{R(null)}},De=()=>{q(!0),G("")},Te=()=>{q(!1),G("")},Xe=()=>{v(!0),C("")},Oe=()=>{v(!1),C("")},Me=async()=>Y.trim()?await ke(Y,"File"):!1,pe=async()=>{if(H.trim()&&g){const p=l.find($=>$.id===g);if(p)return await Ce(p.tagTitle,H,p.TagType)}return!1};return h.useEffect(()=>{ge()},[]),h.useEffect(()=>{const p=_();if(p.length>0&&l.length>0){const $=p.filter(k=>!l.some(W=>W.tagTitle===k.tagTitle));$.length>0&&(i(`Detected ${$.length} new applied tags, refreshing tags list`,$.map(k=>k.tagTitle)),ge())}},[t,s,_,l,i]),h.useEffect(()=>{if(i(`Selection changed - Photos: ${c.size}, Existing: ${x.size}`),g){const p=l.find($=>$.id===g);p&&!J(p)&&(i(`Clearing displayed tag "${p.tagTitle}" because it's no longer applied to all selected files`),f(null))}},[c.size,x.size,g,l,J,i]),h.useEffect(()=>{if(g){const p=l.find($=>$.id===g);p&&!J(p)&&(i(`Clearing displayed tag "${p.tagTitle}" due to tag map changes`),f(null))}},[t,s,g,l,J,i]),{tags:l,displayedTagId:g,isLoadingTags:m,tagIdBeingDeleted:n,subtagIdBeingDeleted:P,isAddingNewTag:K,isAddingNewSubtag:X,newTagTitle:Y,newSubtagTitle:H,isSubmittingNewTag:U,isSubmittingNewSubtag:j,fetchTags:ge,toggleTagOnSelectedFiles:ne,toggleSubtagOnSelectedFiles:ae,setDisplayedTag:re,isTagAppliedToSelected:J,isSubtagAppliedToSelected:ee,getDisplayedTagSubtags:Ee,getAppliedTagsForSelected:le,hasSelectedFiles:we,addNewTag:ke,addNewSubtag:Ce,deleteTag:_e,deleteSubtag:Ne,startAddingNewTag:De,cancelAddingNewTag:Te,startAddingNewSubtag:Xe,cancelAddingNewSubtag:Oe,submitNewTag:Me,submitNewSubtag:pe,setNewTagTitle:G,setNewSubtagTitle:C,extractAllAppliedTags:_,createMissingAppliedTags:O}},ai=S.div`
  margin: 32px 0;
`,kt=S.div`
  margin-bottom: 24px;
`,Ct=S.h3`
  margin: 0 0 16px 0;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  display: flex;
  align-items: center;
  gap: 12px;
`,Dt=S.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  min-height: 32px;
`,Ft=S.button`
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
`,oi=S(Ft)`
  font-size: 12px;
  padding: 6px 12px;
  border-radius: 16px;
`,Et=S.button`
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
`,ni=S.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 16px;
`,_t=S.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 16px;
`,Nt=S.button`
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
`,li=S.div`
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
`,di=S.input`
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
`,dt=S.button`
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
`,ci=ue.memo(({tag:t,isApplied:a,isDisplayed:s,isBeingDeleted:r,disabled:c,onTagClick:x,onDeleteTag:i,getTagDisplayText:l})=>{const{t:o}=ie(),[g,f]=h.useState(!1),[m,d]=h.useState(!1);h.useEffect(()=>{const w=()=>{d("ontouchstart"in window||navigator.maxTouchPoints>0)};return w(),window.addEventListener("resize",w),()=>window.removeEventListener("resize",w)},[]);const n=m?s&&!c&&!r:g&&s&&!c&&!r;return e.jsxs(Ft,{$isApplied:a,$isDisplayed:s,$isBeingDeleted:r,disabled:c,onClick:()=>x(t),onMouseEnter:()=>!m&&s&&f(!0),onMouseLeave:()=>!m&&s&&f(!1),children:[e.jsx("span",{style:{paddingRight:n?"20px":"0"},children:l(t)}),n&&e.jsx(Et,{$isMobile:m,onClick:w=>{w.stopPropagation(),i(t.id)},disabled:r,title:o("Delete tag"),children:"×"})]})}),ui=ue.memo(({subtag:t,isApplied:a,isBeingDeleted:s,disabled:r,onSubtagClick:c,onDeleteSubtag:x})=>{const{t:i}=ie(),[l,o]=h.useState(!1),[g,f]=h.useState(!1);h.useEffect(()=>{const d=()=>{f("ontouchstart"in window||navigator.maxTouchPoints>0)};return d(),window.addEventListener("resize",d),()=>window.removeEventListener("resize",d)},[]);const m=g?a&&!r&&!s:l&&a&&!r&&!s;return e.jsxs(oi,{$isApplied:a,$isBeingDeleted:s,disabled:r,onClick:()=>c(t),onMouseEnter:()=>!g&&a&&o(!0),onMouseLeave:()=>!g&&a&&o(!1),children:[e.jsx("span",{style:{paddingRight:m?"20px":"0"},children:t.subtagTitle}),m&&e.jsx(Et,{$isMobile:g,onClick:d=>{d.stopPropagation(),x(t.id)},disabled:s,title:i("Delete subtag"),children:"×"})]})}),zt=({value:t,onChange:a,onSubmit:s,onCancel:r,isSubmitting:c,placeholder:x="Enter tag name..."})=>{const{t:i}=ie(),l=h.useRef(null);h.useEffect(()=>{l.current&&l.current.focus()},[]);const o=g=>{g.key==="Enter"?s():g.key==="Escape"&&r()};return e.jsxs(li,{children:[e.jsx(di,{ref:l,type:"text",value:t,onChange:g=>a(g.target.value),onKeyDown:o,placeholder:i(x),disabled:c}),e.jsx(dt,{onClick:s,disabled:!t.trim()||c,title:i("Add (Enter)"),children:c?"...":"✓"}),e.jsx(dt,{onClick:r,disabled:c,title:i("Cancel (Escape)"),children:"×"})]})},Rt=ue.memo(({tagsManager:t,disabled:a=!1,enhancedLog:s})=>{const{t:r}=ie(),{tags:c,displayedTagId:x,isLoadingTags:i,tagIdBeingDeleted:l,isAddingNewTag:o,newTagTitle:g,isSubmittingNewTag:f,toggleTagOnSelectedFiles:m,setDisplayedTag:d,isTagAppliedToSelected:n,deleteTag:w,startAddingNewTag:P,cancelAddingNewTag:R,submitNewTag:K,setNewTagTitle:q,getAppliedTagsForSelected:X,hasSelectedFiles:v}=t;if(!v())return null;const Y=ue.useCallback(D=>{if(!n(D))return D.tagTitle;const I=X().find(_=>_.tagTitle===D.tagTitle);if(!I||I.subtags.length===0)return D.tagTitle;const E=I.subtags.map(_=>_.subtagTitle).join(" || ");return r("{{tagTitle}}  |  {{subtags}}",{tagTitle:D.tagTitle,subtags:E})},[n,X,r]);ue.useEffect(()=>{const D=c.filter(u=>n(u)),j=X();s(`TagsDisplay render - ${D.length} tags applied to all selected files`),s("Applied tags with subtags:",j)},[c,n,X,s]);const G=D=>{if(a)return;const j=n(D);s(`Tag "${D.tagTitle}" clicked - current state: ${j?"applied to all":"not applied to all"}`),m(D),D.subtags&&D.subtags.length>0&&d(j?null:D.id),s(`After toggle - new state: ${j?"removed from all":"applied to all"}`)},H=async D=>{if(a)return;s(`Delete tag initiated: ${D}`);const j=await w(D);s(j?`Tag successfully deleted: ${D}`:`Failed to delete tag: ${D}`)},C=async()=>{await K()||s("Failed to submit new tag")},U=ue.useMemo(()=>[...c].sort((D,j)=>D.points!==j.points?j.points-D.points:j.updatedAt-D.updatedAt),[c]);return e.jsxs(ai,{children:[e.jsxs(kt,{children:[e.jsx(Ct,{children:r("Apply tags to selected files")}),e.jsx(Dt,{children:i?e.jsx(ni,{children:r("Loading tags...")}):e.jsxs(e.Fragment,{children:[U.map(D=>{const j=n(D);return e.jsx(ci,{tag:D,isApplied:j,isDisplayed:x===D.id,isBeingDeleted:l===D.id,disabled:a,onTagClick:G,onDeleteTag:H,getTagDisplayText:Y},D.id)}),o?e.jsx(zt,{value:g,onChange:q,onSubmit:C,onCancel:R,isSubmitting:f,placeholder:r("Enter tag name...")}):e.jsx(Nt,{disabled:a,onClick:P,children:r("+ Add Tag")}),U.length===0&&!o&&e.jsx(_t,{children:r("No tags available")})]})})]}),x&&e.jsx(pi,{tagsManager:t,disabled:a,enhancedLog:s}),e.jsx("div",{style:{marginTop:"24px",padding:"20px 24px",background:"linear-gradient(135deg, #e7f3ff 0%, #f0f8ff 100%)",borderRadius:"12px",fontSize:"13px",color:"#0c5aa6",border:"1px solid #b3d9ff",boxShadow:"0 4px 12px rgba(0, 123, 255, 0.08)"},children:e.jsxs("div",{style:{lineHeight:"2.2"},children:[e.jsxs("div",{style:{marginBottom:"8px"},children:[e.jsx("strong",{style:{color:"#28a745"},children:"🟢"}),"  ",r("Most recently clicked tag (showing subtags)")]}),e.jsxs("div",{style:{marginBottom:"8px"},children:[e.jsx("strong",{style:{color:"#333333"},children:"⚫"}),"  ",r("Applied to selected files")]}),e.jsxs("div",{children:[e.jsx("strong",{style:{color:"#6c757d"},children:"⚪"}),"  ",r("Available but not applied to all selected files")]})]})})]})}),pi=ue.memo(({tagsManager:t,disabled:a=!1,enhancedLog:s})=>{var H;const{t:r}=ie(),{displayedTagId:c,subtagIdBeingDeleted:x,isAddingNewSubtag:i,newSubtagTitle:l,isSubmittingNewSubtag:o,toggleSubtagOnSelectedFiles:g,isSubtagAppliedToSelected:f,deleteSubtag:m,startAddingNewSubtag:d,cancelAddingNewSubtag:n,submitNewSubtag:w,setNewSubtagTitle:P,tags:R}=t,K=c?((H=R.find(C=>C.id===c))==null?void 0:H.subtags)||[]:[],q=R.find(C=>C.id===c),X=C=>{a||(s(`Subtag "${C.subtagTitle}" clicked - current state: ${f(C)?"applied to all":"not applied to all"}`),g(C))},v=async C=>{if(a)return;s(`Delete subtag initiated: ${C}`);const U=await m(C);s(U?`Subtag successfully deleted: ${C}`:`Failed to delete subtag: ${C}`)},Y=async()=>{await w()||s("Failed to submit new subtag")};if(!q)return null;const G=ue.useMemo(()=>[...K].sort((C,U)=>C.points!==U.points?U.points-C.points:U.updatedAt-C.updatedAt),[K]);return e.jsxs(kt,{children:[e.jsx(Ct,{children:r('Subtags for "{{tagTitle}}"',{tagTitle:q.tagTitle})}),e.jsxs(Dt,{children:[G.map(C=>e.jsx(ui,{subtag:C,isApplied:f(C),isBeingDeleted:x===C.id,disabled:a,onSubtagClick:X,onDeleteSubtag:v},C.id)),i?e.jsx(zt,{value:l,onChange:P,onSubmit:Y,onCancel:n,isSubmitting:o,placeholder:r("Enter subtag name...")}):e.jsx(Nt,{disabled:a,onClick:d,children:r("+ Add Subtag")}),G.length===0&&!i&&e.jsx(_t,{children:r("No subtags available")})]})]})}),gi=({photoTags:t,isSelected:a=!1,onToggleSelection:s,fileName:r,showFileName:c=!1})=>{const{t:x}=ie(),l=(f=>f.length===0?"":f.map(m=>{if(m.subtags.length>0){const d=m.subtags.map(n=>n.subtagTitle).join(", ");return x("{{tagTitle}}: {{subtags}}",{tagTitle:m.tagTitle,subtags:d})}return m.tagTitle}).join(" • "))(t),o=t.length>0;return c&&r||o||a?e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"4px"},children:[c&&r&&e.jsx("div",{style:{fontSize:"11px",fontWeight:"600",color:"#333",padding:"4px 8px",backgroundColor:a?"#e3f2fd":"#f8f9fa",borderRadius:"4px",border:`1px solid ${a?"#90caf9":"#e9ecef"}`,textAlign:"center",wordBreak:"break-word",lineHeight:"1.2",transition:"all 0.2s ease"},children:r}),e.jsx("div",{style:{background:o?"linear-gradient(135deg, rgba(0, 123, 255, 0.95) 0%, rgba(0, 123, 255, 0.85) 100%)":"rgba(108, 117, 125, 0.6)",color:"white",padding:o?"8px 12px":"6px 12px",borderRadius:o?"8px":"6px",fontSize:o?"11px":"10px",cursor:s?"pointer":"default",backdropFilter:"blur(6px)",boxShadow:o?"0 4px 12px rgba(0, 123, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)":"0 2px 8px rgba(0, 0, 0, 0.2)",border:o?"1px solid rgba(255, 255, 255, 0.2)":"none",transition:"all 0.3s ease",lineHeight:"1.3",minHeight:"32px",display:"flex",alignItems:"center",wordBreak:"break-word"},onClick:s,onMouseEnter:f=>{o&&(f.currentTarget.style.transform="translateY(-1px)",f.currentTarget.style.boxShadow="0 6px 16px rgba(0, 123, 255, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3)")},onMouseLeave:f=>{o&&(f.currentTarget.style.transform="translateY(0)",f.currentTarget.style.boxShadow="0 4px 12px rgba(0, 123, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)")},children:o?e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",width:"100%",flexWrap:"wrap"},children:[e.jsx("span",{style:{fontSize:"12px",opacity:.9,flexShrink:0},children:"🏷️"}),e.jsx("span",{style:{fontWeight:"600",textShadow:"0 1px 2px rgba(0, 0, 0, 0.3)",flex:1},children:l})]}):e.jsx("div",{style:{opacity:.8,fontStyle:"italic",textAlign:"center",width:"100%",fontSize:"10px"},children:x("No tags applied")})})]}):null},ct={traditional:{padding:"20px",border:"2px dashed #007bff",borderRadius:"12px",backgroundColor:"#fff",boxShadow:"0 2px 8px rgba(0, 0, 0, 0.04)"},horizontal:{display:"flex",overflowX:"auto",gap:"16px",padding:"20px",border:"2px dashed #007bff",borderRadius:"12px",backgroundColor:"#fff",boxShadow:"0 2px 8px rgba(0, 0, 0, 0.04)",scrollbarWidth:"thin",scrollbarColor:"#007bff #f8f9fa",scrollBehavior:"smooth",WebkitOverflowScrolling:"touch"}},ut={traditional:{display:"flex",flexDirection:"column",gap:"8px",minWidth:"0"},horizontal:{display:"flex",flexDirection:"column",gap:"8px",minWidth:"180px",maxWidth:"180px",flexShrink:0}},Ye=ue.memo(({selectedPhotos:t,selectedPhotoIndices:a,isSavingAlbum:s,onRemovePhoto:r,onTogglePhotoSelection:c,photoTagsMap:x,columns:i="1",isMultipleAlbumMode:l=!1})=>{const{t:o}=ie(),g=h.useMemo(()=>{if(l&&i==="horizontal")return ct.horizontal;const d=parseInt(i,10),n=isNaN(d)||d<1?1:Math.min(d,5);return{...ct.traditional,display:"grid",gridTemplateColumns:`repeat(${n}, 1fr)`,gap:"16px"}},[l,i]),f=h.useMemo(()=>l&&i==="horizontal"?ut.horizontal:ut.traditional,[l,i]),m=h.useMemo(()=>l&&i==="horizontal"?"photo-card-horizontal":"photo-card-traditional",[l,i]);return t.length===0?null:e.jsx(e.Fragment,{children:e.jsx("div",{style:g,className:"photo-grid",children:t.map((d,n)=>{var R,K;const w=a.has(n),P=x.get(n)||[];return e.jsxs("div",{style:f,children:[e.jsxs(Cs,{"data-selected":w?"true":"false",className:`${m} ${w?"selected":""}`,onClick:()=>c(n),children:[w&&!s&&e.jsx("button",{onClick:q=>{q.stopPropagation(),confirm(o("Are you sure you want to remove this photo?"))&&r(n)},className:"photo-delete-button",title:o("Remove photo"),children:"×"}),d.status!=="complete"&&e.jsx(Ds,{$status:d.status,children:d.status==="error"?"✕":d.status==="uploading"?"↑":d.status==="processing"?"⚙️":"•"}),e.jsxs(Fs,{className:`media-preview ${w?"selected":""}`,children:[d.type==="video"||(R=d.type)!=null&&R.startsWith("video")?e.jsx(Es,{src:d.s3PreviewUrl,controls:!0,className:"media-item"}):e.jsx(_s,{src:d.s3PreviewUrl,alt:d.fileName,className:"media-item"}),(d.status==="uploading"||d.status==="processing")&&e.jsx(wt,{$bottom:"4px",$left:"4px",$right:"4px",$height:"4px",children:e.jsx(yt,{$progress:d.progress,$status:d.status})})]}),e.jsxs("div",{className:"file-info-overlay",children:[(K=d.type)!=null&&K.startsWith("video")?o("Video"):o("Image"),d.size&&o(" • {{size}} MB",{size:(d.size/1024/1024).toFixed(1)}),d.duration&&o(" • {{duration}}s",{duration:d.duration})]}),l&&i==="horizontal"&&w&&e.jsx("div",{className:"selection-indicator",children:o("SELECTED")}),d.status==="error"&&d.errorMessage&&e.jsx(Ns,{$type:"error",children:o("Error: {{message}}",{message:d.errorMessage.length>40?d.errorMessage.substring(0,37)+"...":d.errorMessage})})]}),e.jsx("div",{className:`photo-info ${l&&i==="horizontal"?"horizontal":"traditional"}`,children:e.jsx(gi,{photoTags:P,isSelected:w,onToggleSelection:()=>c(n),fileName:d.originalFileName||d.fileName,showFileName:!0})})]},n)})})})});Ye.displayName="PhotoHandler";const Ot=ue.memo(({isSavingAlbum:t,savingProgress:a})=>{const{t:s}=ie();return t?e.jsxs(Tt,{children:[e.jsx(zs,{children:s("Saving Album")}),e.jsx(Rs,{id:"saveProgressText",children:s("Moving files...")}),e.jsx(wt,{children:e.jsx(yt,{id:"saveProgress",$progress:a/100})})]}):null});Ot.displayName="SavingProgressComponent";const Mt=ue.memo(({showFolderDetails:t,isCreator:a,folderName:s,setFolderName:r,folderDescription:c,setFolderDescription:x,isSavingAlbum:i})=>{const{t:l}=ie();return!t||a!==!0?null:e.jsxs(Tt,{children:[e.jsxs(ot,{children:[e.jsx(nt,{htmlFor:"folderName",children:l("Album Name")}),e.jsx(Os,{id:"folderName",type:"text",value:s,onChange:o=>r(o.target.value),placeholder:l("e.g. Family Vacation in Kyoto"),disabled:i})]}),e.jsxs(ot,{children:[e.jsx(nt,{htmlFor:"folderDescription",children:l("Album Description")}),e.jsx(Ms,{id:"folderDescription",value:c,onChange:o=>x(o.target.value),placeholder:l("e.g. what's special about this album"),rows:4,disabled:i})]})]})});Mt.displayName="FolderDetailsComponent";if(typeof document<"u"){const t=document.createElement("style");t.textContent=`
    .photo-grid {
      position: relative;
      /* FIXED: Added transition for smooth column changes */
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

    /* FIXED: Add smooth transitions for responsive grid changes */
    .photo-grid[style*="display: grid"] {
      transition: all 0.3s ease;
    }

    .photo-grid[style*="display: grid"] > div {
      transition: all 0.3s ease;
    }
  `,document.head.querySelector("#photo-handler-styles")||(t.id="photo-handler-styles",document.head.appendChild(t))}const fi=({existingFiles:t,selectedExistingIndices:a,onToggleSelection:s,onSelectAll:r,onDeselectAll:c,onDeleteFile:x,disabled:i,isCreator:l,participantsCanDeleteItems:o,existingFileTagsMap:g,t:f,isRTL:m})=>t.length===0?null:e.jsxs("div",{style:{marginBottom:"32px",direction:m?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px",flexDirection:m?"row-reverse":"row"},children:[e.jsx("div",{children:e.jsx("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:f("Existing Files ({count})").replace("{count}",t.length.toString())})}),e.jsx("div",{style:{display:"flex",gap:"8px",flexDirection:m?"row-reverse":"row"},children:e.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:i?"#f8f9fa":"#fff",color:i?"#999":"#333",cursor:i?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:a.size>0?c:r,disabled:i,children:a.size>0?f("Done Tagging Selected"):f("Select All")})})]}),e.jsx("div",{className:"existing-files-grid",children:t.map((d,n)=>{const w=a.has(n),P=g.get(n)||[];return e.jsxs("div",{className:"existing-file-item",children:[e.jsxs("div",{className:`existing-file-card ${w?"selected":""}`,onClick:()=>!i&&s(n),children:[e.jsx(ks,{thumbnailDataKey:d.thumbnailDataKey,dataKey:d.dataKey,alt:f("Existing file"),style:{width:"100%",height:"100%",objectFit:"cover"}}),w&&!i&&(l===!0||o)&&e.jsx("button",{onClick:R=>{R.stopPropagation(),confirm(f("Are you sure you want to remove this file?"))&&x(n)},className:"delete-button",title:f("Remove file"),children:"×"}),d.dataInBytes>0&&e.jsx("div",{className:"file-size",children:f("{size} MB").replace("{size}",(d.dataInBytes/(1024*1024)).toFixed(1))}),d.durationInSeconds&&e.jsx("div",{className:"file-duration",children:f("{minutes}:{seconds}").replace("{minutes}",Math.floor(d.durationInSeconds/60).toString()).replace("{seconds}",String(Math.floor(d.durationInSeconds%60)).padStart(2,"0"))})]}),e.jsxs("div",{className:"file-info",children:[d.fileName&&e.jsx("div",{className:`file-name ${w?"selected":""}`,children:d.fileName}),e.jsx("div",{className:"file-tags",children:P.length>0?e.jsx("div",{className:"tags-display",children:e.jsxs("div",{className:"tags-content",children:[e.jsx("span",{className:"tag-icon",children:"🏷️"}),e.jsx("span",{className:"tags-text",children:P.map(R=>{if(R.subtags.length>0){const K=R.subtags.map(q=>q.subtagTitle).join(", ");return f("{tagTitle}: {subtags}").replace("{tagTitle}",R.tagTitle).replace("{subtags}",K)}return R.tagTitle}).join(" • ")})]})}):e.jsx("div",{className:"no-tags",children:f("No tags applied")})})]})]},`existing-${n}-${d.dataKey}`)})})]}),hi=({selectedPhotos:t,selectedPhotoIndices:a,onToggleSelection:s,onSelectAll:r,onDeselectAll:c,onRemovePhoto:x,onDeleteAll:i,disabled:l,photoTagsMap:o,columns:g,setColumns:f,t:m,isRTL:d})=>t.length===0?null:e.jsxs("div",{style:{marginBottom:"32px",direction:d?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"16px",flexDirection:d?"row-reverse":"row"},children:[e.jsx("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:m("New Files ({count})").replace("{count}",t.length.toString())}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:d?"flex-start":"flex-end",gap:"8px"},children:[e.jsxs("div",{style:{display:"flex",gap:"8px",flexDirection:d?"row-reverse":"row"},children:[e.jsx("button",{className:"control-button",onClick:a.size>0?c:r,disabled:l,children:a.size>0?m("Done Tagging Selected"):m("Select All")}),a.size===0&&e.jsx("button",{className:"control-button danger",onClick:i,disabled:l,children:m("Delete All")})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",flexDirection:d?"row-reverse":"row"},children:[e.jsx("label",{className:"columns-label",children:m("Columns:")}),e.jsxs("select",{value:g,onChange:n=>f(n.target.value),className:"columns-select",children:[e.jsx("option",{value:"1",children:"1"}),e.jsx("option",{value:"2",children:"2"}),e.jsx("option",{value:"3",children:"3"}),e.jsx("option",{value:"4",children:"4"}),e.jsx("option",{value:"5",children:"5"})]})]})]})]}),e.jsx(Ye,{selectedPhotos:t,selectedPhotoIndices:a,isSavingAlbum:l,onRemovePhoto:x,onTogglePhotoSelection:s,onSelectAllPhotos:r,onDeselectAllPhotos:c,hideHeader:!0,photoTagsMap:o,columns:g})]}),mi=S.button`
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
`,Bt=S.div`
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
`,$e=S.div`
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,Ut=S.h4`
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
`,Pe=S.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 8px 0;
`,Ie=S.div`
  font-size: 14px;
  color: #333;
  line-height: 1.4;
`,Ae=S.label`
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
`,je=S.span`
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
`,Gt=S.button`
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
`,xi=S.button`
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
`,bi=({showGlobalGear:t,globalSettings:a,setGlobalSettings:s,onPasswordClick:r,onApplySettings:c})=>{const{t:x,language:i}=ie(),l=be(i)==="rtl";return t?e.jsx(Bt,{$isRTL:l,children:e.jsxs($e,{children:[e.jsx(Ut,{children:x("Apply to All Albums")}),e.jsxs($e,{children:[e.jsxs(Pe,{children:[e.jsx(Ie,{children:x("Public Profile")}),e.jsxs(Ae,{children:[e.jsx("input",{type:"checkbox",checked:a.isOnPublicProfile,onChange:o=>s(g=>({...g,isOnPublicProfile:o.target.checked}))}),e.jsx(je,{})]})]}),e.jsxs(Pe,{children:[e.jsx(Ie,{children:x("Participants Can Add Items")}),e.jsxs(Ae,{children:[e.jsx("input",{type:"checkbox",checked:a.participantsCanAddItems,onChange:o=>s(g=>({...g,participantsCanAddItems:o.target.checked}))}),e.jsx(je,{})]})]}),e.jsxs(Pe,{children:[e.jsx(Ie,{children:x("Participants Can Delete Items")}),e.jsxs(Ae,{children:[e.jsx("input",{type:"checkbox",checked:a.participantsCanDeleteItems,onChange:o=>s(g=>({...g,participantsCanDeleteItems:o.target.checked}))}),e.jsx(je,{})]})]})]}),e.jsx($e,{children:e.jsxs(Gt,{$hasAnyPassword:a.passwordProtectionOption!=="NoPassword"&&!!a.albumPassword,onClick:r,children:[a.passwordProtectionOption!=="NoPassword"&&a.albumPassword?"🔒":"🔓",a.passwordProtectionOption!=="NoPassword"&&a.albumPassword?x("Password Set"):x("Set Password for All")]})}),e.jsx(xi,{onClick:c,children:x("Apply to All Albums")})]})}):null},wi=({showGear:t,isOnPublicProfile:a,participantsCanAddItems:s,participantsCanDeleteItems:r,passwordProtectionOption:c,albumPassword:x,onTogglePublicProfile:i,onToggleParticipantsCanAdd:l,onToggleParticipantsCanDelete:o,onPasswordClick:g,disabled:f})=>{const{t:m,language:d}=ie(),n=be(d)==="rtl";return t?e.jsx(Bt,{$isRTL:n,children:e.jsxs($e,{children:[e.jsx(Ut,{children:m("Album Settings")}),e.jsxs($e,{children:[e.jsxs(Pe,{children:[e.jsx(Ie,{children:m("Public Profile")}),e.jsxs(Ae,{children:[e.jsx("input",{type:"checkbox",checked:a,onChange:i,disabled:f}),e.jsx(je,{})]})]}),e.jsxs(Pe,{children:[e.jsx(Ie,{children:m("Participants Can Add Items")}),e.jsxs(Ae,{children:[e.jsx("input",{type:"checkbox",checked:s,onChange:l,disabled:f}),e.jsx(je,{})]})]}),e.jsxs(Pe,{children:[e.jsx(Ie,{children:m("Participants Can Delete Items")}),e.jsxs(Ae,{children:[e.jsx("input",{type:"checkbox",checked:r,onChange:o,disabled:f}),e.jsx(je,{})]})]})]}),e.jsx($e,{children:e.jsxs(Gt,{$hasAnyPassword:c!=="NoPassword"&&!!x,onClick:g,disabled:f,children:[c!=="NoPassword"&&x?"🔒":"🔓",m(c!=="NoPassword"&&x?"Password Set":"Set Password")]})})]})}):null},Wt=({onClick:t,disabled:a,title:s})=>e.jsx(mi,{onClick:t,disabled:a,title:s,children:"⚙️"}),A={colors:{primary:"#007bff",primaryDark:"#0056b3",secondary:"#6c757d",success:"#4caf50",danger:"#e53935",warning:"#ff9800",white:"#fff",text:{primary:"#333",secondary:"#666",light:"#777"},background:{primary:"#f9fafb",highlight:"#f0f7ff"},border:"#ddd"},spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px"},borderRadius:{small:"4px",medium:"8px"},boxShadow:{lg:"0 4px 10px rgba(0,0,0,0.08)"}},yi=S.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10000;
`,Ti=S.div`
  background-color: ${A.colors.white};
  border-radius: ${A.borderRadius.medium};
  box-shadow: ${A.boxShadow.lg};
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
  scrollbar-color: ${A.colors.border} transparent;
  
  /* Custom scrollbar for webkit browsers */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${A.colors.border};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${A.colors.secondary};
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
    border-radius: ${A.borderRadius.small};
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
`,vi=S.div`
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
`,Si=S.div`
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
`,$i=S.h3`
  font-size: 24px;
  font-weight: 600;
  color: ${A.colors.text.primary};
  margin: 0 0 ${A.spacing.lg} 0;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 22px;
    margin: 0 0 ${A.spacing.md} 0;
  }
  
  @media (max-height: 700px) {
    font-size: 20px;
    margin: 0 0 ${A.spacing.md} 0;
  }
  
  @media (max-width: 480px) {
    font-size: 18px;
  }
`,Pi=S.p`
  margin-bottom: ${A.spacing.lg};
  font-size: 16px;
  color: ${A.colors.text.secondary};
  line-height: 1.5;
  
  @media (max-width: 768px) {
    margin-bottom: ${A.spacing.md};
    font-size: 15px;
  }
  
  @media (max-height: 700px) {
    margin-bottom: ${A.spacing.sm};
    font-size: 14px;
  }
`,pt=S.div`
  margin-bottom: ${A.spacing.lg};
`,gt=S.label`
  display: block;
  margin-bottom: ${A.spacing.sm};
  font-size: 14px;
  font-weight: 500;
  color: ${A.colors.text.primary};
`,Ii=S.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${A.colors.border};
  border-radius: ${A.borderRadius.small};
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${A.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  &::placeholder {
    color: ${A.colors.text.light};
  }
`,Ai=S.div`
  display: flex;
  flex-direction: column;
  gap: ${A.spacing.md};
  margin-bottom: ${A.spacing.xl};
`,ji=S.div`
  border: 2px solid ${t=>t.$isSelected?A.colors.primary:A.colors.border};
  border-radius: ${A.borderRadius.medium};
  padding: ${A.spacing.lg};
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${t=>t.$isSelected?A.colors.background.highlight:A.colors.white};
  display: flex;
  align-items: center;
  gap: ${A.spacing.lg};
  
  @media (max-width: 768px) {
    padding: ${A.spacing.md};
    gap: ${A.spacing.md};
  }
  
  @media (max-width: 480px) {
    padding: ${A.spacing.sm};
    gap: ${A.spacing.sm};
  }
  
  @media (max-height: 700px) {
    padding: ${A.spacing.sm};
    gap: ${A.spacing.sm};
  }
`,ki=S.div`
  flex: 1;
`,Ci=S.div`
  margin-bottom: ${A.spacing.xs};
`,Di=S.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${A.colors.primary};
  flex-shrink: 0;
`,Fi=S.label`
  font-size: 16px;
  font-weight: 500;
  color: ${A.colors.text.primary};
  cursor: pointer;
  display: block;
`,Ei=S.div`
  font-size: 14px;
  color: ${A.colors.text.secondary};
  margin-top: ${A.spacing.xs};
`,_i=S.div`
  color: ${A.colors.warning};
  font-size: 12px;
  font-style: italic;
  margin-top: ${A.spacing.xs};
  font-weight: 500;
`,Ni=S.div`
  display: flex;
  gap: ${A.spacing.sm};
  justify-content: center;
  margin-top: ${A.spacing.xl};
`,ft=S.button`
  background-color: ${t=>t.$variant==="danger"?A.colors.danger:t.$variant==="secondary"?"transparent":t.$variant==="success"?A.colors.success:A.colors.primary};
  color: ${t=>t.$variant==="secondary"?A.colors.primary:A.colors.white};
  border: ${t=>t.$variant==="secondary"?`1px solid ${A.colors.primary}`:"none"};
  padding: ${t=>t.$size==="small"?"8px 16px":t.$size==="large"?"16px 32px":"12px 24px"};
  border-radius: ${A.borderRadius.medium};
  cursor: ${t=>t.disabled?"not-allowed":"pointer"};
  font-size: ${t=>t.$size==="small"?"14px":t.$size==="large"?"18px":"16px"};
  font-weight: 500;
  transition: all 0.2s ease;
  opacity: ${t=>t.disabled?.6:1};
  min-width: 100px;

  &:hover:not(:disabled) {
    background-color: ${t=>t.$variant==="danger"?"#c62828":t.$variant==="secondary"?A.colors.background.highlight:t.$variant==="success"?"#388e3c":A.colors.primaryDark};
  }
`,zi=S.div`
  background-color: ${A.colors.background.primary};
  border-radius: ${A.borderRadius.medium};
  padding: ${A.spacing.md};
  margin: ${A.spacing.md} 0;
  border-left: 4px solid ${A.colors.primary};
  font-size: 14px;
  color: ${A.colors.text.secondary};
  line-height: 1.4;
  
  @media (max-width: 768px) {
    padding: ${A.spacing.sm};
    margin: ${A.spacing.sm} 0;
    font-size: 13px;
  }
  
  @media (max-height: 700px) {
    padding: ${A.spacing.xs};
    font-size: 12px;
  }
`,Ri=[{value:"NotVisible",titleKey:"Password Required To See Or Save",descriptionKey:"Album will be completely hidden until correct password is entered"},{value:"Watermark",titleKey:"Watermarked And No Saving Without Password",descriptionKey:"Photos will be visible with watermarks, password required to save"},{value:"CannotBeSaved",titleKey:"Password Required To Save",descriptionKey:"Photos are visible but password required to download or save"},{value:"NoPassword",titleKey:"No Password",descriptionKey:"Album is fully public with no restrictions"}],Kt=({isOpen:t,onClose:a,initialOption:s="NoPassword",initialPassword:r=""})=>{const{t:c,language:x}=ie(),i=be(x)==="rtl",[l,o]=h.useState(s),[g,f]=h.useState(r);if(h.useEffect(()=>{t&&(o(s),f(r))},[t,s,r]),!t)return null;const m=g.trim()==="",d=P=>{o(P)},n=P=>{P.target===P.currentTarget&&a()},w=P=>P!=="NoPassword";return e.jsxs(e.Fragment,{children:[e.jsx(yi,{onClick:n}),e.jsx(Ti,{children:e.jsx(vi,{children:e.jsxs(Si,{$isRTL:i,children:[e.jsx($i,{children:c("Album Password Policy")}),e.jsx(Pi,{children:c("Configure password protection for your album. Choose how you want to restrict access to your photos.")}),e.jsxs(pt,{children:[e.jsx(gt,{children:c("Enter Password")}),e.jsx(Ii,{type:"text",placeholder:c("Enter password (optional)"),value:g,onChange:P=>f(P.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"})]}),e.jsxs(pt,{children:[e.jsx(gt,{children:c("Select Protection Level")}),e.jsx(Ai,{children:Ri.map(P=>e.jsxs(ji,{$isSelected:l===P.value,onClick:()=>d(P.value),children:[e.jsx(Di,{type:"radio",name:"protection",checked:l===P.value,onChange:()=>d(P.value)}),e.jsxs(ki,{children:[e.jsx(Ci,{children:e.jsx(Fi,{children:c(P.titleKey)})}),e.jsx(Ei,{children:c(P.descriptionKey)}),m&&w(P.value)&&l===P.value&&e.jsx(_i,{children:c('⚠️ Will use "password" as default if left empty')})]})]},P.value))})]}),w(l)&&e.jsxs(zi,{children:[e.jsx("strong",{children:c("💡 Password Protection Info:")}),e.jsx("br",{}),c('If you leave the password field empty, "password" will be used as the default password. You can change this anytime in album settings.')]}),e.jsxs(Ni,{children:[e.jsx(ft,{$variant:"secondary",onClick:()=>a(),children:c("Cancel")}),e.jsx(ft,{$variant:"primary",onClick:()=>{const P=m&&w(l)?"password":g;console.log(`Saving with option: ${l}, password: ${P.length>0?"********":"none"}`),a(l,P)},children:c("Save")})]})]})})})]})},Oi=({debugMessages:t,t:a,isRTL:s,textDirection:r})=>t.length===0?null:e.jsxs("div",{style:{marginTop:"40px",background:"#fff3cd",padding:"16px",borderRadius:"8px",border:"1px solid #ffeeba",maxWidth:900,margin:"0 auto",direction:r},children:[e.jsx("h3",{style:{marginTop:0,fontSize:"18px",color:"#856404",textAlign:s?"right":"left"},children:a("Debug Log")}),e.jsx("pre",{style:{fontSize:"14px",color:"#856404",whiteSpace:"pre-wrap",maxHeight:"400px",overflow:"auto",textAlign:s?"right":"left"},children:t.map((c,x)=>e.jsx("div",{style:{marginBottom:"8px"},children:c},x))})]}),Mi=()=>{const{t,language:a}=ie(),s=be(a)==="rtl",[r,c]=h.useState({selectedPhotoIndices:new Set,photoTagsMap:new Map,selectedExistingIndices:new Set,existingFileTagsMap:new Map}),x=As(t),{setShowUsernamePrompt:i,setUsernameInput:l}=x,[o,g]=h.useState(null),[f,m]=h.useState(!1),[d,n]=h.useState(0),[w,P]=h.useState(""),[R,K]=h.useState(""),[q,X]=h.useState(!1),[v,Y]=h.useState(!1),[G,H]=h.useState("NoPassword"),[C,U]=h.useState(""),[D,j]=h.useState(!1),[u,I]=h.useState(!0),[E,_]=h.useState(!1),[O,J]=h.useState(null),[ee,ne]=h.useState(!1),[ae,le]=h.useState([]),[we,ge]=h.useState("2"),[re,Ee]=h.useState([]),[ke,Ce]=h.useState(!1),[_e,Ne]=h.useState(!1),De=h.useRef(null),Te=(T,M)=>{const V=new Date().toISOString();console.log(`[${V}] ${T}`,M)};h.useEffect(()=>{const T=M=>{De.current&&!De.current.contains(M.target)&&Ne(!1)};return document.addEventListener("mousedown",T),()=>{document.removeEventListener("mousedown",T)}},[]);const Oe=Ps(T=>{!o&&T&&g(T)},!0),{fileInputRef:Me,selectedPhotos:pe,setSelectedPhotos:p,isUploading:$,progressTracker:k,setProgressTracker:W,debugMessages:F,currentFolderId:y,openFilePicker:b,handleFileSelection:B,setOnSaveAlbumPage:N}=Oe,z=Js(g,p,J,X,P,K,j,I,H,U,ne,le,_,Te),{cognitoUsername:Q,publicUsername:Z,setPublicUsername:fe}=z,Ht=jt(r.photoTagsMap,T=>{c(M=>({...M,photoTagsMap:typeof T=="function"?T(M.photoTagsMap):T}))},r.existingFileTagsMap,T=>{c(M=>({...M,existingFileTagsMap:typeof T=="function"?T(M.existingFileTagsMap):T}))},r.selectedPhotoIndices,r.selectedExistingIndices,Te),qt=Ls(o||y,Q,pe,ee,ae,w,R,D,u,E,G,C,r.photoTagsMap,r.existingFileTagsMap,re,r.selectedExistingIndices,m,n,p,W,Te,t),{saveAlbumDirectly:Ze}=qt;h.useEffect(()=>{const T=localStorage.getItem("save-album-columns")||"2";ge(T)},[]);const Jt=T=>{ge(T),localStorage.setItem("save-album-columns",T)};h.useEffect(()=>(N(!0),()=>N(!1)),[N]),h.useEffect(()=>{(async()=>{try{await Ts()}catch(M){console.warn("Credential prewarming failed:",M)}})()},[]);const Qt=async T=>{var M,V,L;if(T){Ce(!0);try{const te=await ce();if(!te)return;const se=`
        mutation FetchRelations($fetchRelationsInput: FetchRelationsInput!) {
          fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
            items {
              ... on FolderPosition {
                ${$s}
              }
            }
          }
        }
      `,de={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}},Fe=await(await fetch(Se,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${te}`},body:JSON.stringify({query:se,variables:de})})).json();if(Fe.errors){console.error("GraphQL errors:",Fe.errors);return}const Le=(((V=(M=Fe==null?void 0:Fe.data)==null?void 0:M.fetchRelations)==null?void 0:V.items)||[]).find(he=>he&&he.folder&&he.folder.id===T);if(!Le)return;const ye=Le.folder,fs=((L=ye==null?void 0:ye.fileReferencesPage)==null?void 0:L.items)||[],et=[],tt=new Map;fs.forEach((he,hs)=>{const xe=he.file;if(xe&&xe.dataKey){let Be=he.fileDisplayName;if(!Be&&xe.dataKey){const ze=xe.dataKey.split("/");Be=ze[ze.length-1]}et.push({dataKey:xe.dataKey,thumbnailDataKey:xe.thumbnailDataKey||null,durationInSeconds:xe.durationInSeconds||null,dataInBytes:xe.dataInBytes||0,fileName:Be||void 0});const st=he.selectedTags||[];if(st.length>0){const ze=st.map(Ue=>{var it;return{tagTitle:Ue.tagTitle,TagType:Ue.TagType,subtags:((it=Ue.subtags)==null?void 0:it.map(rt=>({tagTitle:rt.tagTitle,subtagTitle:rt.subtagTitle})))||[]}});tt.set(hs,ze)}}}),Ee(et),c(he=>({...he,existingFileTagsMap:tt})),!w&&ye.folderName&&P(ye.folderName),!R&&ye.folderDescription&&K(ye.folderDescription)}catch(te){console.error("Failed to fetch existing album data:",te)}finally{Ce(!1)}}};h.useEffect(()=>{const M=new URLSearchParams(window.location.search).get("folderId");M&&(g(M),ne(!1),localStorage.removeItem(oe.SUB_ALBUM_DATA),X(!0),J(!0))},[]),h.useEffect(()=>{o&&Qt(o)},[o]),h.useEffect(()=>{y&&!o&&g(y)},[y,o]),h.useEffect(()=>{c(T=>{const M=new Set,V=new Map;return T.selectedPhotoIndices.forEach(L=>{L<pe.length&&M.add(L)}),T.photoTagsMap.forEach((L,te)=>{te<pe.length&&V.set(te,L)}),{...T,selectedPhotoIndices:M,photoTagsMap:V}})},[pe.length]),h.useEffect(()=>{c(T=>{const M=new Set,V=new Map;return T.selectedExistingIndices.forEach(L=>{L<re.length&&M.add(L)}),T.existingFileTagsMap.forEach((L,te)=>{te<re.length&&V.set(te,L)}),{...T,selectedExistingIndices:M,existingFileTagsMap:V}})},[re.length]);const Vt=T=>{const M=pe.filter((V,L)=>L!==T);p(M),M.length>0?localStorage.setItem(oe.SELECTED_PHOTOS,JSON.stringify(M)):localStorage.removeItem(oe.SELECTED_PHOTOS),c(V=>{const L=new Set,te=new Map;return V.selectedPhotoIndices.forEach(se=>{se<T?L.add(se):se>T&&L.add(se-1)}),V.photoTagsMap.forEach((se,de)=>{de<T?te.set(de,se):de>T&&te.set(de-1,se)}),{...V,selectedPhotoIndices:L,photoTagsMap:te}})},Yt=T=>{const M=re.filter((V,L)=>L!==T);Ee(M),c(V=>{const L=new Set,te=new Map;return V.selectedExistingIndices.forEach(se=>{se<T?L.add(se):se>T&&L.add(se-1)}),V.existingFileTagsMap.forEach((se,de)=>{de<T?te.set(de,se):de>T&&te.set(de-1,se)}),{...V,selectedExistingIndices:L,existingFileTagsMap:te}})},Xt=T=>{c(M=>{const V=new Set(M.selectedExistingIndices);return V.has(T)?V.delete(T):V.add(T),{...M,selectedExistingIndices:V}})},Zt=()=>{const T=new Set;for(let M=0;M<re.length;M++)T.add(M);c(M=>({...M,selectedExistingIndices:T}))},Lt=()=>{c(T=>({...T,selectedExistingIndices:new Set}))},es=T=>{c(M=>{const V=new Set(M.selectedPhotoIndices);return V.has(T)?V.delete(T):V.add(T),{...M,selectedPhotoIndices:V}})},ts=()=>{const T=new Set;for(let M=0;M<pe.length;M++)T.add(M);c(M=>({...M,selectedPhotoIndices:T}))},ss=()=>{c(T=>({...T,selectedPhotoIndices:new Set}))},is=()=>{confirm(t("Are you sure you want to delete all new files? This action cannot be undone."))&&(p([]),c({selectedPhotoIndices:new Set,photoTagsMap:new Map,selectedExistingIndices:new Set,existingFileTagsMap:new Map}),localStorage.removeItem(oe.SELECTED_PHOTOS))},rs=async()=>{m(!0);try{if(Z!=null&&Z.startsWith("Profile-")){l(""),i(!0),m(!1);return}Ze()}catch(T){console.error("Error in handleSaveAlbumSingle:",T),m(!1)}},as=T=>{localStorage.setItem(oe.PUBLIC_USERNAME,T),fe(T),i(!1),Ze()},os=(T,M)=>{T&&H(T),M!==void 0&&U(M),Y(!1)},ns=()=>{Y(!0)},ls=()=>{j(!D)},ds=()=>{I(!u)},cs=()=>{_(!E)},us=()=>{b(o)},me=f||$||ke,ps=pe.length>0||re.length>0,gs=r.selectedPhotoIndices.size>0||r.selectedExistingIndices.size>0;return e.jsxs(e.Fragment,{children:[e.jsx(vt,{}),e.jsx(St,{children:e.jsxs($t,{children:[e.jsx(Pt,{href:"my-albums.html",children:t("Back to Albums")}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[q&&O===!0&&e.jsxs("div",{ref:De,style:{position:"relative"},children:[e.jsx(Wt,{onClick:()=>Ne(!_e),disabled:me,title:t("Album Settings")}),e.jsx(wi,{showGear:_e,isOnPublicProfile:D,participantsCanAddItems:u,participantsCanDeleteItems:E,passwordProtectionOption:G,albumPassword:C,onTogglePublicProfile:ls,onToggleParticipantsCanAdd:ds,onToggleParticipantsCanDelete:cs,onPasswordClick:ns,disabled:me})]}),e.jsx(Ve,{$primary:!0,onClick:rs,disabled:me,style:{minWidth:"120px",fontSize:"14px",padding:"8px 16px"},children:t(f?"Saving...":"Save Album")})]})]})}),e.jsxs(It,{$isRTL:s,children:[e.jsx("div",{style:{marginTop:q&&O===!0?"3px":"0"},children:e.jsx(Mt,{showFolderDetails:q,isCreator:O,folderName:w,setFolderName:P,folderDescription:R,setFolderDescription:K,isSavingAlbum:me})}),($||k.totalFiles>0&&(k.filesUploading>0||k.filesProcessing>0||k.filesComplete<k.totalFiles))&&e.jsx(Is,{progressTracker:k,isRTL:be(a)==="rtl",variant:"detailed",context:"saving",isUploading:$,showSuccessMessage:!1,showErrorMessage:!0,customMessages:{error:t("Some photos could not be processed. You can continue with the successfully processed photos.")}}),ke&&e.jsx("div",{style:{padding:"16px",marginBottom:"16px",backgroundColor:"#f8f9fa",border:"1px solid #dee2e6",borderRadius:"8px",color:"#6c757d",textAlign:"center",fontStyle:"italic"},children:t("Loading existing files...")}),e.jsx("input",{ref:Me,id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:T=>B(T,Q),style:{display:"none"}}),q&&O===!0&&ps&&e.jsxs("div",{style:{padding:"32px",marginBottom:"32px",backgroundColor:"#f8f9fa",border:"2px solid #e9ecef",borderRadius:"12px",direction:s?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",fontSize:"18px",color:"#495057",fontWeight:"600",marginBottom:"24px",flexDirection:s?"row-reverse":"row"},children:[e.jsx("span",{style:{marginRight:s?"0":"12px",marginLeft:s?"12px":"0",fontSize:"20px"},children:"🏷️"}),t("Select files to start adding or removing tags")]}),re.length>0&&e.jsx(fi,{existingFiles:re,selectedExistingIndices:r.selectedExistingIndices,onToggleSelection:Xt,onSelectAll:Zt,onDeselectAll:Lt,onDeleteFile:Yt,disabled:me,isCreator:O,participantsCanDeleteItems:E,existingFileTagsMap:r.existingFileTagsMap,t,isRTL:s}),e.jsx(hi,{selectedPhotos:pe,selectedPhotoIndices:r.selectedPhotoIndices,onToggleSelection:es,onSelectAll:ts,onDeselectAll:ss,onRemovePhoto:Vt,onDeleteAll:is,disabled:me,photoTagsMap:r.photoTagsMap,columns:we,setColumns:Jt,t,isRTL:s}),e.jsx("div",{style:{marginTop:gs?"32px":"16px"},children:e.jsx(Rt,{tagsManager:Ht,disabled:me,enhancedLog:Te})})]}),e.jsx(Ot,{isSavingAlbum:f,savingProgress:d}),e.jsx(Bs,{children:e.jsx(Ve,{onClick:us,disabled:me,children:t($?"Uploading...":"Add More Photos")})}),e.jsx(js,{t,language:a,usernameManager:x,onSuccess:as}),e.jsx(Kt,{isOpen:v,onClose:os,initialOption:G,initialPassword:C}),e.jsx(Oi,{debugMessages:F,t,isRTL:s,textDirection:s?"rtl":"ltr"})]})]})},Bi=S.div`
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
`,Ui=S.div`
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
`,Gi=S.div`
  flex: 1;
`,Wi=S.h3`
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
`,Ki=S.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
`,Hi=S.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: stretch;
  }
`,ht=S.button`
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
`,qi=S.button`
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
`,Ji=S.div`
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
`,We=S.div`
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,Ke=S.h4`
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #333;
`,He=S.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  padding: 4px 0;
`,qe=S.div`
  font-size: 13px;
  color: #333;
  line-height: 1.4;
`,Je=S.label`
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
`,Qe=S.span`
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
`,Qi=S.button`
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
`,mt=S.div`
  margin-bottom: 16px;
`,xt=S.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #333;
  font-size: 14px;
`,Vi=S.input`
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
`,Yi=S.textarea`
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
`,Xi=S.div`
  margin-top: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e9ecef;
`,Zi=S.div`
  width: 100%;
  height: 6px;
  background: #e9ecef;
  border-radius: 3px;
  overflow: hidden;
  margin-top: 8px;
`,Li=S.div`
  height: 100%;
  background: linear-gradient(90deg, #007bff, #28a745);
  width: ${t=>t.$progress}%;
  transition: width 0.3s ease;
`,er=S.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
  justify-content: flex-end;
  flex-direction: ${t=>t.$isRTL?"row-reverse":"row"};
`,bt=S.button`
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
`,tr=({album:t,onUpdate:a,onSave:s,onRemove:r,onShowPasswordDialog:c,disabled:x,columns:i,enhancedLog:l})=>{const{t:o,language:g}=ie(),f=be(g)==="rtl",[m,d]=h.useState(!1),n=h.useRef(null);h.useEffect(()=>{const j=u=>{n.current&&!n.current.contains(u.target)&&d(!1)};return document.addEventListener("mousedown",j),()=>{document.removeEventListener("mousedown",j)}},[]);const w=jt(t.photoTagsMap,j=>{const u=typeof j=="function"?j(t.photoTagsMap):j;a({photoTagsMap:u})},new Map,()=>{},t.selectedPhotoIndices,new Set,l),P=j=>{a({name:j})},R=j=>{a({description:j})},K=j=>{const u=new Set(t.selectedPhotoIndices);u.has(j)?u.delete(j):u.add(j),a({selectedPhotoIndices:u})},q=()=>{const j=new Set;for(let u=0;u<t.photos.length;u++)j.add(u);a({selectedPhotoIndices:j})},X=()=>{a({selectedPhotoIndices:new Set})},v=()=>{confirm(o("Are you sure you want to delete all files from this album? This action cannot be undone."))&&a({photos:[],selectedPhotoIndices:new Set,photoTagsMap:new Map})},Y=j=>{const u=t.photos.filter((_,O)=>O!==j),I=new Set;t.selectedPhotoIndices.forEach(_=>{_<j?I.add(_):_>j&&I.add(_-1)});const E=new Map;t.photoTagsMap.forEach((_,O)=>{O<j?E.set(O,_):O>j&&E.set(O-1,_)}),a({photos:u,selectedPhotoIndices:I,photoTagsMap:E})},G=()=>{a({isOnPublicProfile:!t.isOnPublicProfile})},H=()=>{a({participantsCanAddItems:!t.participantsCanAddItems})},C=()=>{a({participantsCanDeleteItems:!t.participantsCanDeleteItems})},U=()=>{c(t.id)},D=t.passwordProtectionOption!=="NoPassword"&&t.albumPassword;return e.jsxs(Bi,{children:[e.jsxs(Ui,{$isRTL:f,children:[e.jsxs(Gi,{children:[e.jsxs(Wi,{children:[e.jsx("span",{children:"📁"}),t.name,t.isSaving&&e.jsx("span",{style:{color:"#007bff"},children:"⏳"}),t.savingProgress===100&&e.jsx("span",{style:{color:"#28a745"},children:"✅"})]}),e.jsxs(Ki,{children:[t.photos.length===1?o("1 file"):o("{{count}} files",{count:t.photos.length}),t.selectedPhotoIndices.size>0&&e.jsxs("span",{children:[" • ",o("{{count}} selected for tagging",{count:t.selectedPhotoIndices.size})]})]})]}),e.jsx(Hi,{children:!t.isSaving&&t.savingProgress<100&&e.jsxs(e.Fragment,{children:[e.jsx(ht,{$variant:"primary",onClick:s,disabled:x,children:o("Save")}),e.jsxs("div",{ref:n,style:{position:"relative"},children:[e.jsx(qi,{onClick:()=>d(!m),disabled:x,title:o("Album Settings"),children:"⚙️"}),m&&e.jsxs(Ji,{$isRTL:f,children:[e.jsxs(We,{children:[e.jsx(Ke,{children:o("Visibility")}),e.jsxs(He,{children:[e.jsx(qe,{children:o("Public Profile")}),e.jsxs(Je,{children:[e.jsx("input",{type:"checkbox",checked:t.isOnPublicProfile,onChange:G,disabled:t.isSaving}),e.jsx(Qe,{})]})]})]}),e.jsxs(We,{children:[e.jsx(Ke,{children:o("Participant Permissions")}),e.jsxs(He,{children:[e.jsx(qe,{children:o("Can Add Items")}),e.jsxs(Je,{children:[e.jsx("input",{type:"checkbox",checked:t.participantsCanAddItems,onChange:H,disabled:t.isSaving}),e.jsx(Qe,{})]})]}),e.jsxs(He,{children:[e.jsx(qe,{children:o("Can Delete Items")}),e.jsxs(Je,{children:[e.jsx("input",{type:"checkbox",checked:t.participantsCanDeleteItems,onChange:C,disabled:t.isSaving}),e.jsx(Qe,{})]})]})]}),e.jsxs(We,{children:[e.jsx(Ke,{children:o("Security")}),e.jsxs(Qi,{$hasPassword:!!D,onClick:U,disabled:t.isSaving,children:[D?"🔒":"🔓",o(D?"Password Set":"Set Password")]})]})]})]}),e.jsx(ht,{$variant:"danger",onClick:r,disabled:x,children:o("Remove")})]})})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",marginBottom:"20px"},children:[e.jsxs(mt,{children:[e.jsx(xt,{children:o("Album Name")}),e.jsx(Vi,{type:"text",value:t.name,onChange:j=>P(j.target.value),placeholder:o("e.g. Family Vacation in Kyoto"),disabled:t.isSaving||t.savingProgress===100})]}),e.jsxs("div",{children:[e.jsxs(mt,{children:[e.jsx(xt,{children:o("Album Description")}),e.jsx(Yi,{value:t.description,onChange:j=>R(j.target.value),placeholder:o("e.g. what's special about this album"),disabled:t.isSaving||t.savingProgress===100,rows:3})]}),t.photos.length>0&&e.jsxs(er,{$isRTL:f,children:[e.jsx(bt,{onClick:t.selectedPhotoIndices.size>0?X:q,disabled:t.isSaving||t.savingProgress===100,children:t.selectedPhotoIndices.size>0?o("Done Tagging Selected"):o("Select All")}),t.selectedPhotoIndices.size===0&&e.jsx(bt,{$variant:"danger",onClick:v,disabled:t.isSaving||t.savingProgress===100,children:o("Delete All")})]})]})]}),e.jsx(Ye,{selectedPhotos:t.photos,selectedPhotoIndices:t.selectedPhotoIndices,isSavingAlbum:t.isSaving||t.savingProgress===100,onRemovePhoto:Y,onTogglePhotoSelection:K,onSelectAllPhotos:q,onDeselectAllPhotos:X,hideHeader:!1,photoTagsMap:t.photoTagsMap,columns:i,isMultipleAlbumMode:!0}),t.selectedPhotoIndices.size>0&&e.jsx(Xi,{children:e.jsx(Rt,{tagsManager:w,disabled:t.isSaving||t.savingProgress===100,enhancedLog:l})}),t.isSaving&&e.jsxs("div",{style:{marginTop:"16px"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},children:[e.jsx("span",{style:{fontSize:"14px",fontWeight:"600",color:"#333"},children:o("Saving album...")}),e.jsx("span",{style:{fontSize:"14px",color:"#666"},children:o("{{progress}}%",{progress:t.savingProgress})})]}),e.jsx(Zi,{children:e.jsx(Li,{$progress:t.savingProgress})})]})]})},sr=S.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
`,ir=({albums:t,setAlbums:a,isSavingAny:s,onSaveAlbum:r,onRemoveAlbum:c,onShowPasswordDialog:x,columns:i,setColumns:l,enhancedLog:o})=>{const{language:g}=ie(),f=be(g)==="rtl",m=h.useCallback((d,n)=>{a(w=>w.map(P=>P.id===d?{...P,...n}:P))},[a]);return e.jsx("div",{children:e.jsx(sr,{$isRTL:f,children:t.map(d=>e.jsx(tr,{album:d,onUpdate:n=>m(d.id,n),onSave:()=>r(d.id),onRemove:()=>c(d.id),onShowPasswordDialog:x,disabled:s,columns:i,setColumns:l,enhancedLog:o},d.id))})})},rr=()=>{var D,j;const{t,language:a}=ie(),s=be(a)==="rtl",[r,c]=h.useState([]),[x,i]=h.useState("2"),[l,o]=h.useState(!1),[g,f]=h.useState(!1),[m,d]=h.useState(null),[n,w]=h.useState({isOnPublicProfile:!1,participantsCanAddItems:!0,participantsCanDeleteItems:!1,passwordProtectionOption:"NoPassword",albumPassword:""}),P=(u,I)=>{const E=new Date().toISOString();console.log(`[${E}] ${u}`,I)},R=u=>{i(u),localStorage.setItem("save-album-columns",u),P(`Column setting changed to ${u} for all albums`)};h.useEffect(()=>{const u=localStorage.getItem(oe.MULTI_ALBUM_DATA);if(u)try{const E=JSON.parse(u).filter(O=>{if(!O||!O.name||!Array.isArray(O.selectedPhotos))return!1;const J=O.selectedPhotos.filter(ee=>ee&&ee.fileName&&ee.originalFileName&&ee.s3PreviewUrl&&ee.s3PreviewUrl.includes("amazonaws.com"));return O.selectedPhotos=J,J.length>0});if(E.length===0){alert(t("No valid albums were found. Please try selecting your files again.")),ve("my-albums.html");return}const _=E.map(O=>({id:lt(),name:O.name,description:"",photos:O.selectedPhotos,selectedPhotoIndices:new Set,photoTagsMap:new Map,isOnPublicProfile:!1,participantsCanAddItems:!0,participantsCanDeleteItems:!1,passwordProtectionOption:"NoPassword",albumPassword:"",isSaving:!1,savingProgress:0,folderId:""}));c(_),Ge()}catch(I){console.error("Error parsing multi-album data:",I),alert(t("There was an error loading your albums. Please try selecting your files again.")),ve("my-albums.html")}else alert(t("No album data was found. Please try selecting your files again.")),ve("my-albums.html")},[t]),h.useEffect(()=>{const u=localStorage.getItem("save-album-columns")||"2";i(u)},[]);const K=u=>{const I=r.find(E=>E.id===u);I&&(d(u),w(E=>({...E,passwordProtectionOption:I.passwordProtectionOption,albumPassword:I.albumPassword})),f(!0))},q=()=>{d(null),f(!0)},X=(u,I)=>{u!==void 0&&I!==void 0&&(m?c(E=>E.map(_=>_.id===m?{..._,passwordProtectionOption:u,albumPassword:I}:_)):w(E=>({...E,passwordProtectionOption:u,albumPassword:I}))),f(!1),d(null)},v=()=>{c(u=>u.map(I=>({...I,isOnPublicProfile:n.isOnPublicProfile,participantsCanAddItems:n.participantsCanAddItems,participantsCanDeleteItems:n.participantsCanDeleteItems,passwordProtectionOption:n.passwordProtectionOption,albumPassword:n.albumPassword}))),o(!1),P("Applied global settings to all albums",n)},Y=async u=>{const I=r.find(E=>E.id===u);if(I){if(I.photos.length===0){alert(t('The album "{{albumName}}" has no photos to save.',{albumName:I.name}));return}c(E=>E.map(_=>_.id===u?{..._,isSaving:!0,savingProgress:0}:_));try{const E=`${Date.now()}_____${lt()}____Folder`;c(_=>_.map(O=>O.id===u?{...O,folderId:E}:O));for(let _=10;_<=100;_+=20)c(O=>O.map(J=>J.id===u?{...J,savingProgress:_}:J)),await new Promise(O=>setTimeout(O,500));c(_=>_.map(O=>O.id===u?{...O,isSaving:!1,savingProgress:100}:O))}catch(E){console.error(`Error saving album ${u}:`,E),c(_=>_.map(O=>O.id===u?{...O,isSaving:!1,savingProgress:0}:O)),alert(t('Failed to save album "{{albumName}}". Please try again.',{albumName:I.name}))}}},G=async()=>{const u=r.filter(I=>I.savingProgress<100);if(u.length!==0)try{for(const E of u)await Y(E.id),await new Promise(_=>setTimeout(_,200));r.filter(E=>u.some(_=>_.id===E.id)&&E.savingProgress<100).length===0&&setTimeout(()=>{localStorage.removeItem(oe.MULTI_ALBUM_DATA),Ge(),ve("my-albums.html")},1e3)}catch(I){console.error("Error saving all albums:",I),alert(t("There was an error saving some albums. Please try again."))}},H=u=>{const I=r.find(_=>_.id===u);if(I&&!confirm(t('Are you sure you want to remove the album "{{albumName}}"?',{albumName:I.name})))return;const E=r.filter(_=>_.id!==u);c(E),E.length===0&&(localStorage.removeItem(oe.MULTI_ALBUM_DATA),Ge(),ve("my-albums.html"))},C=r.some(u=>u.isSaving),U=r.some(u=>u.savingProgress<100);return e.jsxs(e.Fragment,{children:[e.jsx(vt,{}),e.jsx(St,{children:e.jsxs($t,{children:[e.jsx(Pt,{href:"my-albums.html",children:t("Back to Albums")}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx(Us,{children:t("Columns:")}),e.jsxs(Gs,{value:x,onChange:u=>R(u.target.value),disabled:C,children:[e.jsx("option",{value:"1",children:"1"}),e.jsx("option",{value:"2",children:"2"}),e.jsx("option",{value:"3",children:"3"}),e.jsx("option",{value:"4",children:"4"}),e.jsx("option",{value:"5",children:"5"})]})]}),e.jsxs("div",{style:{position:"relative"},children:[e.jsx(Wt,{onClick:()=>o(!l),disabled:C,title:t("Global Settings for All Albums")}),e.jsx(bi,{showGlobalGear:l,globalSettings:n,setGlobalSettings:w,onPasswordClick:q,onApplySettings:v})]}),U&&!C&&e.jsx(Ve,{$primary:!0,onClick:G,style:{minWidth:"120px",fontSize:"14px",padding:"8px 16px"},children:r.length===1?t("Save 1 Album"):t("Save {{count}} Albums",{count:r.length})})]})]})}),e.jsx(It,{$isRTL:s,children:e.jsx(ir,{albums:r,setAlbums:c,isSavingAny:C,onSaveAlbum:Y,onRemoveAlbum:H,onShowPasswordDialog:K,columns:x,setColumns:R,enhancedLog:P})}),e.jsx(Kt,{isOpen:g,onClose:X,initialOption:m?((D=r.find(u=>u.id===m))==null?void 0:D.passwordProtectionOption)||"NoPassword":n.passwordProtectionOption,initialPassword:m?((j=r.find(u=>u.id===m))==null?void 0:j.albumPassword)||"":n.albumPassword})]})},ar=()=>new URLSearchParams(window.location.search).get("mode")==="multiple"?e.jsx(rr,{}):e.jsx(Mi,{}),or=()=>e.jsx(Ss,{children:e.jsx(ar,{})});vs.createRoot(document.getElementById("root")).render(e.jsx(or,{}));
