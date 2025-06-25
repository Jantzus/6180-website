import{h as ge,f as Ce,r as p,L as de,i as ct,s as Fs,k as Es,l as _s,m as $t,n as Ns,a as Fe,d as I,o as he,u as ce,j as e,g as Se,p as Rs,R as zs,I as Os}from"./utils-Dg1WdiuL.js";import{F as Ms}from"./types-CyPfckSQ.js";import{u as Bs,U as Us}from"./UploadProgress-BbvDDDzm.js";import{u as Pt,U as It}from"./UsernamePrompt-CFi396Q_.js";import{L as Gs}from"./LazyImage-B-l0icNJ.js";import{P as Ws,S as Ks,e as Hs,V as qs,f as Js,g as At,h as jt,M as Qs,C as Ct,i as Vs,j as Ys,F as dt,k as ut,l as Xs,m as Zs,G as kt,n as Dt,o as Ft,p as Et,B as Le,q as _t,r as Ls,s as ei,t as ti}from"./styled-components-CkPYYn5H.js";import{g as pt,c as qe}from"./folderStructureUtils-BmdkosLC.js";const si=`
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
`,ii=`
  mutation MyMutation($folderPositionInputs: [FolderPositionInput!]) {
    changeFiles(folderPositionInputs: $folderPositionInputs) {
      items {
        id
      }
    }
  }
`,ri=`
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
`,ai=`
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
`,oi=`
  mutation DeleteFileReferences($deletedFileReferenceIds: [ID!]!) {
    changeFiles(deletedFileReferenceIds: $deletedFileReferenceIds) {
      items {
        id
      }
    }
  }
`;class Te{static async fetchFolderDetails(i,s){var a,d,g,r,o,l,f,x,h;s(`Fetching details for folder ID: ${i}`);try{const u=await ge();if(!u)return s("No token available for fetching folder details"),null;s("Sending GraphQL query to fetch folder details");const $=await(await fetch(Ce,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${u}`},body:JSON.stringify({query:si,variables:{folderIds:[i],fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(s("Folder details API response:",$),$.errors)return console.error("GraphQL errors:",$.errors),s(`GraphQL errors: ${JSON.stringify($.errors)}`),null;const W=((d=(a=$==null?void 0:$.data)==null?void 0:a.fetchFolders)==null?void 0:d.items)||[];if(s(`Found ${W.length} folder items`),W.length===0)return s("No folder items found"),null;const F=W[0];s("Retrieved folder data:",F);const A=((r=(g=F.folderPosition)==null?void 0:g.profileIds)==null?void 0:r.some(v=>v.includes("Public____Profile")))||!1;s(`Folder is on public profile: ${A}`),s("Profile IDs:",(o=F.folderPosition)==null?void 0:o.profileIds);const Q=(l=F.folderInviteParameters)==null?void 0:l.usingFolderInviteGrantsRightToAddItems;s(`Participants can add items: ${Q}`);const ee=(f=F.folderInviteParameters)==null?void 0:f.usingFolderInviteGrantsRightToRemoveItems;return s(`Participants can delete items: ${ee}`),{creatorId:F.creatorId||"",folderName:F.folderName||"",folderDescription:F.folderDescription||"",passwordPolicy:((x=F.folderPassword)==null?void 0:x.policy)||"NoPassword",password:((h=F.folderPassword)==null?void 0:h.password)||"",isOnPublicProfile:A,participantsCanAddItems:Q!==void 0?Q:!0,participantsCanDeleteItems:ee!==void 0?ee:!1}}catch(u){return console.error("Error in fetchFolderDetails:",u),s(`Error in fetchFolderDetails: ${u}`),null}}static async saveFolderOnly(i,s){var g,r;s("Sending folder-only mutation (no file references, no folder tags)");const a=await ge();if(!a)throw s("No token available for saving album, aborting"),new Error("Authentication token not available");const d={folderPositionInputs:[i]};s("GraphQL folder-only mutation variables:",d);try{s("Sending API request to save folder");const o=await fetch(Ce,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({query:ii,variables:d})});s(`API response status: ${o.status}`);const l=await o.text();s(`API response raw text: ${l}`);const f=JSON.parse(l);if(s("API response JSON:",f),f.errors)throw console.error("Folder save failed:",f.errors),s("Folder save failed with errors:",f.errors),new Error("Failed to save folder");return s("Folder saved successfully"),((r=(g=f.data)==null?void 0:g.changeFiles)==null?void 0:r.items)||[]}catch(o){throw console.error("Error in saveFolderOnly:",o),s(`Error in saveFolderOnly: ${o}`),o}}static async saveFileReferences(i,s){var g,r,o,l,f;s(`Sending file references-only mutation with ${i.length} items (each with individual tags and filenames)`);const a=await ge();if(!a)throw s("No token available for saving file references, aborting"),new Error("Authentication token not available");const d={updatedFileReferenceInputs:i};s("GraphQL file references-only mutation variables (first item):",i.length>0?i[0]:"No items");try{s("Sending API request to save file references with individual tags and filenames");const x=await fetch(Ce,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({query:ri,variables:d})});s(`API response status: ${x.status}`);const h=await x.text();s(`API response raw text: ${h.substring(0,500)}...`);const u=JSON.parse(h);if(s("API response JSON items count:",((o=(r=(g=u.data)==null?void 0:g.changeFiles0)==null?void 0:r.items)==null?void 0:o.length)||0),u.errors)throw console.error("File references save failed:",u.errors),s("File references save failed with errors:",u.errors),new Error("Failed to save file references");return s("File references chunk saved successfully with individual photo tags and filenames"),((f=(l=u.data)==null?void 0:l.changeFiles0)==null?void 0:f.items)||[]}catch(x){throw console.error("Error in saveFileReferences:",x),s(`Error in saveFileReferences: ${x}`),x}}static async saveFinalChunkWithFolder(i,s,a){var r,o,l,f,x,h,u,n,$;a(`Sending final chunk with folder mutation (${i.length} file references with filenames, no folder tags)`);const d=await ge();if(!d)throw a("No token available for saving final chunk, aborting"),new Error("Authentication token not available");const g={folderPositionInputs:[s],updatedFileReferenceInputs:i};a("GraphQL final mutation variables (folder + last chunk with filenames, no folder tags)");try{a("Sending API request for final save with folder (no folder tags, with filenames)");const W=await fetch(Ce,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${d}`},body:JSON.stringify({query:ai,variables:g})});a(`API response status: ${W.status}`);const F=await W.text();a(`API response raw text: ${F.substring(0,500)}...`);const A=JSON.parse(F);if(a("API response JSON:",{fileReferencesCount:((l=(o=(r=A.data)==null?void 0:r.changeFiles0)==null?void 0:o.items)==null?void 0:l.length)||0,folderItems:((x=(f=A.data)==null?void 0:f.changeFiles)==null?void 0:x.items)||[]}),A.errors)throw console.error("Final save failed:",A.errors),a("Final save failed with errors:",A.errors),new Error("Failed to complete album save");return a("Final chunk and folder saved successfully (with individual photo tags and filenames)"),{fileReferences:((u=(h=A.data)==null?void 0:h.changeFiles0)==null?void 0:u.items)||[],folderPositions:(($=(n=A.data)==null?void 0:n.changeFiles)==null?void 0:$.items)||[]}}catch(W){throw console.error("Error in saveFinalChunkWithFolder:",W),a(`Error in saveFinalChunkWithFolder: ${W}`),W}}static async deleteFileReferences(i,s){var g,r;s(`Deleting ${i.length} file references: ${i.join(", ")}`);const a=await ge();if(!a)throw s("No token available for deleting file references, aborting"),new Error("Authentication token not available");const d={deletedFileReferenceIds:i};s("GraphQL delete file references mutation variables:",d);try{s("Sending API request to delete file references");const o=await fetch(Ce,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({query:oi,variables:d})});s(`API response status: ${o.status}`);const l=await o.text();s(`API response raw text: ${l}`);const f=JSON.parse(l);if(s("API response JSON:",f),f.errors)throw console.error("File references deletion failed:",f.errors),s("File references deletion failed with errors:",f.errors),new Error("Failed to delete file references");return s(`Successfully deleted ${i.length} file references`),((r=(g=f.data)==null?void 0:g.changeFiles)==null?void 0:r.items)||[]}catch(o){throw console.error("Error in deleteFileReferences:",o),s(`Error in deleteFileReferences: ${o}`),o}}}const ni=(t,i,s,a,d,g,r,o,l,f,x,h,u,n)=>{const[$,W]=p.useState(null),[F,A]=p.useState(null),[Q,ee]=p.useState(!1),v=async k=>{n(`Initializing folder ID with username: ${k}`);try{const _=new URLSearchParams(window.location.search).get("folderId");if(n(`Folder ID from URL: ${_||"null"}`),_){t(_),n(`Using existing folder ID: ${_}`);try{n(`Fetching details for folder: ${_}`);const O=await Te.fetchFolderDetails(_,n);if(n("Folder details retrieved:",O),O){const K=`${k}_____${k}____Account`,G=O.creatorId===K;if(n(`User is creator of folder: ${G}, accountId: ${K}, creator: ${O.creatorId}`),s(G),G){n("User is creator, showing folder details"),a(!0),d(O.folderName),g(O.folderDescription),r(O.isOnPublicProfile),n(`Setting isOnPublicProfile: ${O.isOnPublicProfile}`),O.participantsCanAddItems!==void 0&&(o(O.participantsCanAddItems),n(`Setting participantsCanAddItems: ${O.participantsCanAddItems}`)),O.participantsCanDeleteItems!==void 0&&(u(O.participantsCanDeleteItems),n(`Setting participantsCanDeleteItems: ${O.participantsCanDeleteItems}`));const T=O.passwordPolicy;n(`Password policy from folder details: ${T}`),l(T),T!=="NoPassword"&&O.password&&f(O.password),n(`Set password protection option to: ${T}`)}else n("User is NOT the creator, hiding editable fields"),a(!1)}else n("No folder details retrieved, setting isCreator to true"),s(!0),a(!0)}catch(O){console.error("Error fetching folder details:",O),n(`Error fetching folder details: ${O}`),s(!1)}}else{const O=`${k}_____${ct()}____Folder`;n(`Creating new folder ID: ${O}`),t(O),n("Setting isCreator to true for new album"),s(!0),a(!0)}}catch(J){console.error("Folder ID initialization error:",J),n(`Folder ID initialization error: ${J}`),s(!1)}},L=()=>{n("Attempting to restore photos from localStorage");try{const k=localStorage.getItem(de.SELECTED_PHOTOS);if(n(`Found stored photos: ${k?"yes":"no"}`),k)try{const J=JSON.parse(k);n(`Parsed ${J.length} photos from localStorage`),Array.isArray(J)&&J.length>0&&(i(J),n(`Restored ${J.length} photos to state (including original filenames)`))}catch(J){console.error("Error parsing stored photos:",J),n(`Error parsing stored photos: ${J}`)}}catch(k){console.error("Error restoring photos from storage:",k),n(`Error restoring photos from storage: ${k}`)}},te=()=>{n("Testing S3 connection");try{Fs?n("S3 client is available"):(console.error("S3 client not available"),n("S3 client not available"))}catch(k){console.error("S3 connection test error:",k),n(`S3 connection test error: ${k}`)}},X=async()=>{var k;n("Starting component initialization");try{n("Checking login with refresh");const J=await ge();if(!J){n("No token returned from login check, aborting initialization");return}try{const _=localStorage.getItem(de.PUBLIC_USERNAME);n(`Retrieved public username from localStorage: ${_||"null"}`),A(_||null);const K=JSON.parse(atob(J.split(".")[1]))["cognito:username"];if(K){n(`Extracted Cognito username from token: ${K}`),W(K);const G=localStorage.getItem(de.SUB_ALBUM_DATA);if(n(`Sub-album data from localStorage: ${G||"null"}`),G)try{const T=JSON.parse(G);if(n("Parsed sub-album data:",T),T.isSubAlbum&&((k=T.selectedFileIds)==null?void 0:k.length)>0){n(`Valid sub-album data found with ${T.selectedFileIds.length} files`),x(!0),h(T.selectedFileIds),T.selectedPhotos&&T.selectedPhotos.length>0&&(n(`Found ${T.selectedPhotos.length} selected photos in sub-album data`),i(T.selectedPhotos)),a(!0),s(!0);const N=`${K}_____${ct()}____Folder`;n(`Generated new folder ID for sub-album: ${N}`),t(N)}else n("Invalid sub-album data, proceeding with normal initialization"),await v(K)}catch(T){console.error("Error parsing sub-album data:",T),n(`Error parsing sub-album data: ${T}`),await v(K)}else n("No sub-album data found, proceeding with normal folder initialization"),await v(K)}else n("No Cognito username found in token")}catch(_){console.error("User data initialization error:",_),n(`User data initialization error: ${_}`)}L(),te(),n("Component initialization completed")}catch(J){console.error("Initialization error:",J),n(`Initialization error: ${J}`)}finally{ee(!0)}};return p.useEffect(()=>{X()},[]),{cognitoUsername:$,publicUsername:F,setPublicUsername:A,isInitialized:Q}},Nt=t=>t.map(i=>({TagType:i.TagType,tagTitle:i.tagTitle,subtags:i.subtags.map(s=>({TagType:i.TagType,tagTitle:s.tagTitle,subtagTitle:s.subtagTitle}))})),Rt=t=>{const i=new Set;return t.filter(s=>i.has(s.fileId)?!1:(i.add(s.fileId),!0))},zt=(t,i)=>{const s=[];for(let a=0;a<t.length;a+=i)s.push(t.slice(a,a+i));return s},Ot=(t,i,s,a,d,g,r,o,l,f,x,h,u,n,$)=>{$("Creating folder position input WITHOUT folder-level tags"),$(`Profile visibility: ${g?"Public":"Only Me"}`);const W=g?[`${d}_____Public____Profile`]:["Only Me_____Only Me____Profile"];$(`Profile IDs: ${JSON.stringify(W)}`);let F=[];u&&n.length>0&&($(`Creating file reference IDs for ${n.length} sub-album files`),F=n.map(v=>{const L=v.split("_____");if(L.length>=2){const X=L[1].split("____")[0],k=`${s}_____${X}____FileReference`;return $(`Created file reference ID for sub-album: ${k}`),k}return $(`Using original fileId as fallback: ${v}`),v})),$(`Created ${F.length} acceptedFileReferenceIds`);const A=l!=="NoPassword"?f:null;if($(`Password protection: ${l}`),$(`Album password: ${A?"******":"null"}`),$(`Participants can add items: ${r}`),$(`Participants can delete items: ${o}`),!a)throw $("Error: folderId is null or undefined"),new Error("folderId is required to create folder position input");const Q=Es(a),ee=_s(Q);return{currentTime:t,folderId:a,profileIds:W,folderPositionPoints:1,acceptedFileReferenceIds:F,folderInput:{folderAboutContactIds:[i],albumNanoId:ee,folderName:x,folderDescription:h,folderPasswordInput:{password:A,policy:l},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:r,usingFolderInviteGrantsRightToRemoveItems:o,addedItemsNeedFolderCreatorApproval:!1}}}},Mt=(t,i,s,a,d,g,r)=>(r(`Creating file reference inputs with individual photo tags and original filenames for ${t.length} photos`),t.map((o,l)=>{var $;const f=g.get(l)||[],x=Nt(f),h=o.originalFileName||o.fileName;if(r(`Photo ${l} (${o.fileName}): ${f.length} tags applied, display name: ${h}`),o.fileId)return r(`Using existing fileId for photo: ${o.fileId}`),{fileReferencesHolderId:a,currentTime:i,points:1,hasBeenDeleted:!1,selectedTagInputs:x,fileId:o.fileId,fileDisplayName:h,fileInput:null};const u=o.type==="video"||($=o.type)!=null&&$.startsWith("video")?`Input/Video/${o.fileName}`:`Input/Image/${o.fileName}`,n=`${d}_____${o.fileName}____File`;return r(`Created file reference for ${o.fileName}:`),r(`  - dataKey: ${u}`),r(`  - fileId: ${n}`),r(`  - fileDisplayName: ${h}`),r(`  - thumbnailDataKey: ${o.thumbnailDataKey||"undefined"}`),r(`  - size: ${o.size}`),r(`  - thumbnailSize: ${o.thumbnailSize||0}`),r(`  - duration: ${o.duration||"undefined"}`),r(`  - tags: ${f.length} tags selected for this photo`),{fileReferencesHolderId:a,currentTime:i,points:1,hasBeenDeleted:!1,selectedTagInputs:x,fileId:n,fileDisplayName:h,fileInput:{fileId:n,ownerFileInput:{editorContactIds:[s],FileSharingOptionsEnum:"Anyone",dataKey:u,thumbnailDataKey:o.thumbnailDataKey,dataInBytes:o.size,thumbnailDataInBytes:o.thumbnailSize||0,s3UploadedAt:i,durationInSeconds:o.duration},editorFileInput:{aboutContactIds:[s],captionText:"",numericFilterInputs:[]}}}})),li=(t,i,s,a,d,g,r)=>{const o=[];return d.forEach(l=>{const f=g.get(l)||[];if(f.length>0){const x=a[l];if(x){const h=x.dataKey.split("/"),u=h[h.length-1],n=`${s}_____${u}____File`,$=x.fileName||u,W=Nt(f);r(`Creating file reference for existing file ${l} (${u}) with ${f.length} tags, display name: ${$}`),o.push({fileReferencesHolderId:i,currentTime:t,points:1,hasBeenDeleted:!1,selectedTagInputs:W,fileId:n,fileDisplayName:$,fileInput:null})}}}),r(`Created ${o.length} file references for existing files with tags and filenames`),o},ci=(t,i,s,a,d,g,r,o,l,f,x,h,u,n,$,W,F,A,Q,ee,v,L)=>{const te=K=>{v(`Save progress text: ${K}`);const G=document.getElementById("saveProgressText");G&&(G.innerText=K)},X=K=>{const G=document.getElementById("saveProgress");G?(G.style.width=`${K}%`,v(`Updated save progress bar: ${K}%`)):v("Progress bar element not found"),A(K)},k=()=>(v("Validating required data"),i?t?(v("All required data validated successfully"),!0):(v("No folder ID, validation failed"),!1):(v("No Cognito username, validation failed"),!1)),J=()=>{v("Handling successful save"),Ns(Q,ee,[de.SELECTED_PHOTOS,de.SUB_ALBUM_DATA],v),v("Album data cleared"),te(L("Album saved successfully!")),sessionStorage.setItem("album_just_saved","true"),v("Set 'album_just_saved' flag in sessionStorage"),v("Setting timeout for redirect to my-albums.html"),setTimeout(()=>{v("Redirecting to my-albums.html"),Fe("my-albums.html")},1e3)},_=async(K,G)=>{v("Starting chunked save process (individual photo tags with filenames, no folder tags, including existing files with tags)");try{te(L("Processing files in chunks..."));const T=48;if(G.length===0)v("No file references to process, saving only folder position (no folder tags)"),await Te.saveFolderOnly(K,v);else{const N=Rt(G);v(`After removing duplicates, processing ${N.length} unique file references`);const q=zt(N,T);v(`Split file references into ${q.length} chunks of max size ${T}`);for(let V=0;V<q.length;V++){const oe=q[V];v(`Processing chunk ${V+1} of ${q.length} with ${oe.length} file references`);const se=V/q.length*80;A(10+se),X(10+se),V<q.length-1?(te(L("Saving files: chunk {{chunkNumber}} of {{totalChunks}}...",{chunkNumber:V+1,totalChunks:q.length})),await Te.saveFileReferences(oe,v)):(te(L("Finalizing album...")),await Te.saveFinalChunkWithFolder(oe,K,v))}}A(100),X(100),te(L("Album saved successfully!")),J()}catch(T){console.error("Error in chunked save process:",T),v(`Error in chunked save process: ${T}`),te(L("Error: {{error}}",{error:String(T)})),F(!1)}};return{saveAlbumDirectly:async()=>{v("Starting direct album save with individual photo tagging, existing file tagging, and original filenames"),v(`Photo tags map: ${u.size} photos have tags applied`),v(`Existing file tags map: ${n.size} existing files have tags applied`),F(!0),A(5);try{if(v("Validating required data for save"),!k()){v("Required data validation failed, aborting save"),F(!1);return}const K=Math.floor(Date.now()/1e3),G=`${i}_____${i}____Account`,N=t.split("_____")[1].split("____")[0];v(`Save timestamp: ${K}`),v(`Account ID: ${G}`),v(`Folder ID: ${t}`),v(`Folder target item identifier: ${N}`),v("Creating folder position input (no folder tags)");const q=Ot(K,G,N,t,i,o,l,f,x,h,g,r,a,d,v);v("Folder position input created:",q);let V=[];const oe=s.filter(re=>re.status==="complete");if(v(`Found ${oe.length} valid photos with 'complete' status`),oe.length>0){const re=oe.filter(me=>!me.fileId);v(`Found ${re.length} new uploads to move from temp to public folder`),re.length>0&&(v("Moving files from temp to public folder"),await $t(re,X,v)),v("Creating file reference inputs for uploads with individual photo tags and original filenames");const ue=Mt(oe,K,G,t,i,u,v);v(`Created ${ue.length} file reference inputs for uploads`,ue),V=V.concat(ue)}const se=li(K,t,i,$,W,n,v);if(se.length>0&&(v(`Adding ${se.length} existing file references with tags and filenames`),V=V.concat(se)),a&&d.length>0){v(`Adding ${d.length} existing file references for sub-album`);const re=d.map(ue=>{v(`Creating file reference for existing sub-album file ID: ${ue}`);const me=[],xe=ue.split("_____"),$e=xe.length>=2?xe[1].split("____")[0]:ue;return{fileReferencesHolderId:t,currentTime:K,points:1,hasBeenDeleted:!1,selectedTagInputs:me,fileId:ue,fileDisplayName:$e,fileInput:null}});v(`Created ${re.length} file reference inputs for sub-album files`,re),V=V.concat(re)}v(`Total file reference inputs: ${V.length}`),v("Sending GraphQL mutations with chunked file references (individual photo tags, existing file tags, and original filenames)"),await _(q,V)}catch(K){console.error("Error in saveAlbumDirectly:",K),v(`Error in saveAlbumDirectly: ${K}`),F(!1)}}}},di=`
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
`,ui=`
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
`,pi=`
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
`,fi=`
  mutation DeleteTag($tagId: String!) {
    deleteTag(tagId: $tagId) {
      id
      hasBeenDeleted
    }
  }
`,gi=`
  mutation DeleteSubtag($subtagId: String!) {
    deleteSubtag(subtagId: $subtagId) {
      id
      hasBeenDeleted
    }
  }
`,Be=()=>typeof crypto<"u"&&crypto.randomUUID?crypto.randomUUID():"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){const i=Math.random()*16|0;return(t=="x"?i:i&3|8).toString(16)}),Bt=(t,i,s,a,d,g,r)=>{const[o,l]=p.useState([]),[f,x]=p.useState(null),[h,u]=p.useState(!1),[n,$]=p.useState(null),[W,F]=p.useState(null),[A,Q]=p.useState(!1),[ee,v]=p.useState(!1),[L,te]=p.useState(""),[X,k]=p.useState(""),[J,_]=p.useState(!1),[O,K]=p.useState(!1),G=p.useMemo(()=>({photoIndices:Array.from(d),existingIndices:Array.from(g)}),[d,g]),T=p.useCallback(()=>{const c=[];t.forEach(P=>{c.push(...P)}),s.forEach(P=>{c.push(...P)});const w=new Map;return c.forEach(P=>{if(w.has(P.tagTitle)){const U=w.get(P.tagTitle),j=[...U.subtags,...P.subtags],y=Array.from(new Map(j.map(m=>[m.subtagTitle,m])).values());w.set(P.tagTitle,{...U,subtags:y})}else w.set(P.tagTitle,P)}),Array.from(w.values())},[t,s]),N=p.useCallback((c,w)=>{const P=[],U=Math.floor(Date.now()/1e3);return w.forEach(j=>{const y=c.find(m=>m.tagTitle===j.tagTitle);if(y){const m=[];if(j.subtags.forEach(D=>{var R;if(!((R=y.subtags)==null?void 0:R.find(Z=>Z.subtagTitle===D.subtagTitle))){const Z={id:Be(),tagTitle:D.tagTitle,subtagTitle:D.subtagTitle,TagType:j.TagType||"File",points:1,createdAt:U,updatedAt:U,isCreatedFromApplied:!0};m.push(Z),r(`Created missing subtag from applied tags: ${D.subtagTitle} for tag ${D.tagTitle}`)}}),m.length>0){const D=c.findIndex(E=>E.id===y.id);D!==-1&&(c[D]={...y,subtags:[...y.subtags||[],...m]})}}else{const m={id:Be(),tagTitle:j.tagTitle,TagType:j.TagType||"File",points:1,createdAt:U,updatedAt:U,subtags:[],isCreatedFromApplied:!0};j.subtags&&j.subtags.length>0&&(m.subtags=j.subtags.map(D=>({id:Be(),tagTitle:D.tagTitle,subtagTitle:D.subtagTitle,TagType:j.TagType||"File",points:1,createdAt:U,updatedAt:U,isCreatedFromApplied:!0}))),P.push(m),r(`Created missing tag from applied tags: ${j.tagTitle} with ${j.subtags.length} subtags`)}}),P},[r]),q=p.useCallback(c=>{const{photoIndices:w,existingIndices:P}=G;if(w.length===0&&P.length===0)return!1;const U=w.length===0||w.every(m=>(t.get(m)||[]).some(E=>E.tagTitle===c.tagTitle)),j=P.length===0||P.every(m=>(s.get(m)||[]).some(E=>E.tagTitle===c.tagTitle)),y=U&&j;return(w.length>0||P.length>0)&&r(`Tag "${c.tagTitle}" applied to all selected? ${y} (photos: ${U}, existing: ${j})`),y},[G,t,s,r]),V=p.useCallback(c=>{const{photoIndices:w,existingIndices:P}=G;let U=0,j=0;w.forEach(R=>{const ie=(t.get(R)||[]).find(we=>we.tagTitle===c.tagTitle);ie&&(U++,ie.subtags.some(we=>we.subtagTitle===c.subtagTitle)&&j++)});let y=0,m=0;P.forEach(R=>{const ie=(s.get(R)||[]).find(we=>we.tagTitle===c.tagTitle);ie&&(y++,ie.subtags.some(we=>we.subtagTitle===c.subtagTitle)&&m++)});const D=U+y,E=j+m;return D>0&&E===D},[G,t,s]),oe=p.useCallback(c=>{const{photoIndices:w,existingIndices:P}=G;if(w.length===0&&P.length===0){r("No files selected for tag application");return}const U=q(c);r(`${U?"Removing":"Applying"} tag "${c.tagTitle}" ${U?"from":"to"} all selected files`),w.length>0&&i(j=>{const y=new Map(j);return w.forEach(m=>{const D=y.get(m)||[];if(U){const E=D.filter(R=>R.tagTitle!==c.tagTitle);y.set(m,E),r(`Removed tag "${c.tagTitle}" from photo ${m}`)}else if(!D.some(R=>R.tagTitle===c.tagTitle)){const R={tagTitle:c.tagTitle,TagType:c.TagType,subtags:[]};y.set(m,[...D,R]),r(`Added tag "${c.tagTitle}" to photo ${m}`)}}),y}),P.length>0&&a(j=>{const y=new Map(j);return P.forEach(m=>{const D=y.get(m)||[];if(U){const E=D.filter(R=>R.tagTitle!==c.tagTitle);y.set(m,E),r(`Removed tag "${c.tagTitle}" from existing file ${m}`)}else if(!D.some(R=>R.tagTitle===c.tagTitle)){const R={tagTitle:c.tagTitle,TagType:c.TagType,subtags:[]};y.set(m,[...D,R]),r(`Added tag "${c.tagTitle}" to existing file ${m}`)}}),y})},[G,q,i,a,r]),se=p.useCallback(c=>{const{photoIndices:w,existingIndices:P}=G;if(w.length===0&&P.length===0){r("No files selected for subtag application");return}const U=V(c);r(`${U?"Removing":"Applying"} subtag "${c.subtagTitle}" ${U?"from":"to"} all selected files with parent tag`),w.length>0&&i(j=>{const y=new Map(j);return w.forEach(m=>{const E=(y.get(m)||[]).map(R=>{if(R.tagTitle===c.tagTitle){if(U)return{...R,subtags:R.subtags.filter(Z=>Z.subtagTitle!==c.subtagTitle)};if(!R.subtags.some(ie=>ie.subtagTitle===c.subtagTitle))return{...R,subtags:[...R.subtags,{tagTitle:c.tagTitle,subtagTitle:c.subtagTitle}]}}return R});y.set(m,E)}),y}),P.length>0&&a(j=>{const y=new Map(j);return P.forEach(m=>{const E=(y.get(m)||[]).map(R=>{if(R.tagTitle===c.tagTitle){if(U)return{...R,subtags:R.subtags.filter(Z=>Z.subtagTitle!==c.subtagTitle)};if(!R.subtags.some(ie=>ie.subtagTitle===c.subtagTitle))return{...R,subtags:[...R.subtags,{tagTitle:c.tagTitle,subtagTitle:c.subtagTitle}]}}return R});y.set(m,E)}),y})},[G,V,i,a,r]),re=p.useCallback(()=>{const{photoIndices:c,existingIndices:w}=G,P=[];c.forEach(y=>{const m=t.get(y)||[];P.push(...m)}),w.forEach(y=>{const m=s.get(y)||[];P.push(...m)});const U=new Map;P.forEach(y=>{if(U.has(y.tagTitle)){const m=U.get(y.tagTitle),D=[...m.subtags,...y.subtags],E=Array.from(new Map(D.map(R=>[R.subtagTitle,R])).values());U.set(y.tagTitle,{...m,subtags:E})}else U.set(y.tagTitle,y)});const j=Array.from(U.values());return r(`getAppliedTagsForSelected: ${j.length} unique tags from ${c.length} photos + ${w.length} existing files`),j},[G,t,s,r]),ue=p.useCallback(()=>d.size>0||g.size>0,[d.size,g.size]),me=async()=>{var c,w;r("Fetching tags from API and checking for missing applied tags"),u(!0);try{const P=await ge();if(!P){r("No token available for fetching tags");return}const j=await(await fetch(Ce,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${P}`},body:JSON.stringify({query:di,variables:{fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(r("Tags API response:",j),j.errors){console.error("GraphQL errors:",j.errors),r(`GraphQL errors: ${JSON.stringify(j.errors)}`);return}let m=(((w=(c=j==null?void 0:j.data)==null?void 0:c.fetchRelations)==null?void 0:w.items)||[]).map(E=>{var R,Z;return{id:E.id,tagTitle:E.tagTitle,TagType:E.TagType,points:E.points,createdAt:E.createdAt,updatedAt:E.updatedAt,subtags:((Z=(R=E.subtags)==null?void 0:R.items)==null?void 0:Z.map(ie=>({id:ie.id,tagTitle:ie.tagTitle,subtagTitle:ie.subtagTitle,TagType:ie.TagType,points:ie.points,createdAt:ie.createdAt,updatedAt:ie.updatedAt})))||[]}});r(`Fetched ${m.length} tags from API`);const D=T();if(r(`Found ${D.length} unique applied tags in file maps`),D.length>0){const E=N(m,D);E.length>0&&(r(`Created ${E.length} missing tags from applied tags`),m=[...E,...m])}r(`Final tags list: ${m.length} tags (including ${m.filter(E=>E.isCreatedFromApplied).length} created from applied tags)`),l(m)}catch(P){console.error("Error fetching tags:",P),r(`Error fetching tags: ${P}`)}finally{u(!1)}},xe=p.useCallback(c=>{r(`Setting displayed tag: ${c}`),x(c)},[r]),$e=p.useCallback(()=>{if(!f)return[];const c=o.find(w=>w.id===f);return(c==null?void 0:c.subtags)||[]},[f,o]),ke=async(c,w)=>{if(r(`Adding new tag: ${c} of type: ${w}`),!c.trim())return r("Cannot add tag with empty title"),!1;_(!0);try{if(!await ge())return r("No token available for adding tag"),!1;if(await(async()=>(r("PLACEHOLDER: Would send GraphQL mutation to add tag",{mutation:ui,variables:{tagInput:{tagTitle:c.trim(),TagType:w,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(y=>setTimeout(y,500)),!0))()){const y={id:Be(),tagTitle:c.trim(),TagType:w,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3),subtags:[]};return l(m=>[y,...m]),oe(y),xe(y.id),te(""),Q(!1),r(`Successfully added and applied new tag: ${c}`),!0}return!1}catch(P){return console.error("Error adding new tag:",P),r(`Error adding new tag: ${P}`),!1}finally{_(!1)}},Pe=async(c,w,P)=>{if(r(`Adding new subtag: ${w} to tag: ${c}`),!w.trim())return r("Cannot add subtag with empty title"),!1;if(!f)return r("No displayed tag for adding subtag"),!1;K(!0);try{if(!await ge())return r("No token available for adding subtag"),!1;if(await(async()=>(r("PLACEHOLDER: Would send GraphQL mutation to add subtag",{mutation:pi,variables:{subtagInput:{tagTitle:c,subtagTitle:w.trim(),TagType:P,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(m=>setTimeout(m,500)),!0))()){const m={id:Be(),tagTitle:c,subtagTitle:w.trim(),TagType:P,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3)};return l(D=>D.map(E=>E.id===f?{...E,subtags:[m,...E.subtags||[]]}:E)),se(m),k(""),v(!1),r(`Successfully added and applied new subtag: ${w}`),!0}return!1}catch(U){return console.error("Error adding new subtag:",U),r(`Error adding new subtag: ${U}`),!1}finally{K(!1)}},le=async c=>{r(`Deleting tag: ${c}`),$(c);try{if(!await ge())return r("No token available for deleting tag"),!1;if(await(async()=>(r("PLACEHOLDER: Would send GraphQL mutation to delete tag",{mutation:fi,variables:{tagId:c}}),await new Promise(j=>setTimeout(j,500)),!0))()){const j=o.find(y=>y.id===c);return l(y=>y.filter(m=>m.id!==c)),j&&(i(y=>{const m=new Map(y);return y.forEach((D,E)=>{const R=D.filter(Z=>Z.tagTitle!==j.tagTitle);m.set(E,R)}),m}),a(y=>{const m=new Map(y);return y.forEach((D,E)=>{const R=D.filter(Z=>Z.tagTitle!==j.tagTitle);m.set(E,R)}),m})),f===c&&xe(null),r(`Successfully deleted tag: ${c}`),!0}return!1}catch(w){return console.error("Error deleting tag:",w),r(`Error deleting tag: ${w}`),!1}finally{$(null)}},De=async c=>{r(`Deleting subtag: ${c}`),F(c);try{if(!await ge())return r("No token available for deleting subtag"),!1;if(await(async()=>(r("PLACEHOLDER: Would send GraphQL mutation to delete subtag",{mutation:gi,variables:{subtagId:c}}),await new Promise(j=>setTimeout(j,500)),!0))()){let j=null;return l(y=>y.map(m=>{var E;const D=((E=m.subtags)==null?void 0:E.filter(R=>R.id===c?(j=R,!1):!0))||[];return{...m,subtags:D}})),j&&(i(y=>{const m=new Map(y);return y.forEach((D,E)=>{const R=D.map(Z=>Z.tagTitle===j.tagTitle?{...Z,subtags:Z.subtags.filter(ie=>ie.subtagTitle!==j.subtagTitle)}:Z);m.set(E,R)}),m}),a(y=>{const m=new Map(y);return y.forEach((D,E)=>{const R=D.map(Z=>Z.tagTitle===j.tagTitle?{...Z,subtags:Z.subtags.filter(ie=>ie.subtagTitle!==j.subtagTitle)}:Z);m.set(E,R)}),m})),r(`Successfully deleted subtag: ${c}`),!0}return!1}catch(w){return console.error("Error deleting subtag:",w),r(`Error deleting subtag: ${w}`),!1}finally{F(null)}},Ie=()=>{Q(!0),te("")},Ae=()=>{Q(!1),te("")},b=()=>{v(!0),k("")},z=()=>{v(!1),k("")},H=async()=>L.trim()?await ke(L,"File"):!1,B=async()=>{if(X.trim()&&f){const c=o.find(w=>w.id===f);if(c)return await Pe(c.tagTitle,X,c.TagType)}return!1};return p.useEffect(()=>{me()},[]),p.useEffect(()=>{const c=T();if(c.length>0&&o.length>0){const w=c.filter(P=>!o.some(U=>U.tagTitle===P.tagTitle));w.length>0&&(r(`Detected ${w.length} new applied tags, refreshing tags list`,w.map(P=>P.tagTitle)),me())}},[t,s,T,o,r]),p.useEffect(()=>{if(r(`Selection changed - Photos: ${d.size}, Existing: ${g.size}`),f){const c=o.find(w=>w.id===f);c&&!q(c)&&(r(`Clearing displayed tag "${c.tagTitle}" because it's no longer applied to all selected files`),x(null))}},[d.size,g.size,f,o,q,r]),p.useEffect(()=>{if(f){const c=o.find(w=>w.id===f);c&&!q(c)&&(r(`Clearing displayed tag "${c.tagTitle}" due to tag map changes`),x(null))}},[t,s,f,o,q,r]),{tags:o,displayedTagId:f,isLoadingTags:h,tagIdBeingDeleted:n,subtagIdBeingDeleted:W,isAddingNewTag:A,isAddingNewSubtag:ee,newTagTitle:L,newSubtagTitle:X,isSubmittingNewTag:J,isSubmittingNewSubtag:O,fetchTags:me,toggleTagOnSelectedFiles:oe,toggleSubtagOnSelectedFiles:se,setDisplayedTag:xe,isTagAppliedToSelected:q,isSubtagAppliedToSelected:V,getDisplayedTagSubtags:$e,getAppliedTagsForSelected:re,hasSelectedFiles:ue,addNewTag:ke,addNewSubtag:Pe,deleteTag:le,deleteSubtag:De,startAddingNewTag:Ie,cancelAddingNewTag:Ae,startAddingNewSubtag:b,cancelAddingNewSubtag:z,submitNewTag:H,submitNewSubtag:B,setNewTagTitle:te,setNewSubtagTitle:k,extractAllAppliedTags:T,createMissingAppliedTags:N}},mi=I.div`
  margin: 32px 0;
`,Ut=I.div`
  margin-bottom: 24px;
`,Gt=I.h3`
  margin: 0 0 16px 0;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  display: flex;
  align-items: center;
  gap: 12px;
`,Wt=I.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  min-height: 32px;
`,Kt=I.button`
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
`,hi=I(Kt)`
  font-size: 12px;
  padding: 6px 12px;
  border-radius: 16px;
`,Ht=I.button`
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
`,xi=I.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 16px;
`,qt=I.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 16px;
`,Jt=I.button`
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
`,bi=I.div`
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
`,wi=I.input`
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
`,ft=I.button`
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
`,Qt=()=>{const[t,i]=p.useState(!1);return p.useEffect(()=>{const s=()=>{const d="ontouchstart"in window||navigator.maxTouchPoints&&navigator.maxTouchPoints>0||navigator.msMaxTouchPoints&&navigator.msMaxTouchPoints>0;i(d)};s();const a=()=>{s()};return window.addEventListener("resize",a),()=>{window.removeEventListener("resize",a)}},[]),t},yi=he.memo(({tag:t,isApplied:i,isDisplayed:s,isBeingDeleted:a,disabled:d,onTagClick:g,onDeleteTag:r,getTagDisplayText:o})=>{const{t:l}=ce(),[f,x]=p.useState(!1),h=Qt(),u=h?s&&!d&&!a:f&&s&&!d&&!a;return e.jsxs(Kt,{$isApplied:i,$isDisplayed:s,$isBeingDeleted:a,disabled:d,onClick:()=>g(t),onMouseEnter:()=>!h&&s&&x(!0),onMouseLeave:()=>!h&&s&&x(!1),children:[e.jsx("span",{style:{paddingRight:u?"20px":"0"},children:o(t)}),u&&e.jsx(Ht,{$isMobile:h,onClick:n=>{n.stopPropagation(),r(t.id)},disabled:a,title:l("Delete tag"),children:"×"})]})}),vi=he.memo(({subtag:t,isApplied:i,isBeingDeleted:s,disabled:a,onSubtagClick:d,onDeleteSubtag:g})=>{const{t:r}=ce(),[o,l]=p.useState(!1),f=Qt(),x=f?i&&!a&&!s:o&&i&&!a&&!s;return e.jsxs(hi,{$isApplied:i,$isBeingDeleted:s,disabled:a,onClick:()=>d(t),onMouseEnter:()=>!f&&i&&l(!0),onMouseLeave:()=>!f&&i&&l(!1),children:[e.jsx("span",{style:{paddingRight:x?"20px":"0"},children:t.subtagTitle}),x&&e.jsx(Ht,{$isMobile:f,onClick:h=>{h.stopPropagation(),g(t.id)},disabled:s,title:r("Delete subtag"),children:"×"})]})}),Vt=({value:t,onChange:i,onSubmit:s,onCancel:a,isSubmitting:d,placeholder:g="Enter tag name..."})=>{const{t:r}=ce(),o=p.useRef(null);p.useEffect(()=>{o.current&&o.current.focus()},[]);const l=f=>{f.key==="Enter"?s():f.key==="Escape"&&a()};return e.jsxs(bi,{children:[e.jsx(wi,{ref:o,type:"text",value:t,onChange:f=>i(f.target.value),onKeyDown:l,placeholder:r(g),disabled:d}),e.jsx(ft,{onClick:s,disabled:!t.trim()||d,title:r("Add (Enter)"),children:d?"...":"✓"}),e.jsx(ft,{onClick:a,disabled:d,title:r("Cancel (Escape)"),children:"×"})]})},Yt=he.memo(({tagsManager:t,disabled:i=!1,enhancedLog:s})=>{const{t:a}=ce(),{tags:d,displayedTagId:g,isLoadingTags:r,tagIdBeingDeleted:o,isAddingNewTag:l,newTagTitle:f,isSubmittingNewTag:x,toggleTagOnSelectedFiles:h,setDisplayedTag:u,isTagAppliedToSelected:n,deleteTag:$,startAddingNewTag:W,cancelAddingNewTag:F,submitNewTag:A,setNewTagTitle:Q,getAppliedTagsForSelected:ee,hasSelectedFiles:v}=t;if(!v())return null;const L=he.useCallback(_=>{if(!n(_))return _.tagTitle;const G=ee().find(N=>N.tagTitle===_.tagTitle);if(!G||G.subtags.length===0)return _.tagTitle;const T=G.subtags.map(N=>N.subtagTitle).join(" || ");return a("{{tagTitle}}  |  {{subtags}}",{tagTitle:_.tagTitle,subtags:T})},[n,ee,a]);he.useEffect(()=>{const _=d.filter(K=>n(K)),O=ee();s(`TagsDisplay render - ${_.length} tags applied to all selected files`),s("Applied tags with subtags:",O)},[d,n,ee,s]);const te=_=>{if(i)return;const O=n(_);s(`Tag "${_.tagTitle}" clicked - current state: ${O?"applied to all":"not applied to all"}`),h(_),_.subtags&&_.subtags.length>0&&u(O?null:_.id),s(`After toggle - new state: ${O?"removed from all":"applied to all"}`)},X=async _=>{if(i)return;s(`Delete tag initiated: ${_}`);const O=await $(_);s(O?`Tag successfully deleted: ${_}`:`Failed to delete tag: ${_}`)},k=async()=>{await A()||s("Failed to submit new tag")},J=he.useMemo(()=>[...d].sort((_,O)=>_.points!==O.points?O.points-_.points:O.updatedAt-_.updatedAt),[d]);return e.jsxs(mi,{children:[e.jsxs(Ut,{children:[e.jsx(Gt,{children:a("Apply tags to selected files")}),e.jsx(Wt,{children:r?e.jsx(xi,{children:a("Loading tags...")}):e.jsxs(e.Fragment,{children:[J.map(_=>{const O=n(_);return e.jsx(yi,{tag:_,isApplied:O,isDisplayed:g===_.id,isBeingDeleted:o===_.id,disabled:i,onTagClick:te,onDeleteTag:X,getTagDisplayText:L},_.id)}),l?e.jsx(Vt,{value:f,onChange:Q,onSubmit:k,onCancel:F,isSubmitting:x,placeholder:a("Enter tag name...")}):e.jsx(Jt,{disabled:i,onClick:W,children:a("+ Add Tag")}),J.length===0&&!l&&e.jsx(qt,{children:a("No tags available")})]})})]}),g&&e.jsx(Ti,{tagsManager:t,disabled:i,enhancedLog:s}),e.jsx("div",{style:{marginTop:"24px",padding:"20px 24px",background:"linear-gradient(135deg, #e7f3ff 0%, #f0f8ff 100%)",borderRadius:"12px",fontSize:"13px",color:"#0c5aa6",border:"1px solid #b3d9ff",boxShadow:"0 4px 12px rgba(0, 123, 255, 0.08)"},children:e.jsxs("div",{style:{lineHeight:"2.2"},children:[e.jsxs("div",{style:{marginBottom:"8px"},children:[e.jsx("strong",{style:{color:"#28a745"},children:"🟢"}),"  ",a("Most recently clicked tag (showing subtags)")]}),e.jsxs("div",{style:{marginBottom:"8px"},children:[e.jsx("strong",{style:{color:"#333333"},children:"⚫"}),"  ",a("Applied to selected files")]}),e.jsxs("div",{children:[e.jsx("strong",{style:{color:"#6c757d"},children:"⚪"}),"  ",a("Available but not applied to all selected files")]})]})})]})}),Ti=he.memo(({tagsManager:t,disabled:i=!1,enhancedLog:s})=>{var X;const{t:a}=ce(),{displayedTagId:d,subtagIdBeingDeleted:g,isAddingNewSubtag:r,newSubtagTitle:o,isSubmittingNewSubtag:l,toggleSubtagOnSelectedFiles:f,isSubtagAppliedToSelected:x,deleteSubtag:h,startAddingNewSubtag:u,cancelAddingNewSubtag:n,submitNewSubtag:$,setNewSubtagTitle:W,tags:F}=t,A=d?((X=F.find(k=>k.id===d))==null?void 0:X.subtags)||[]:[],Q=F.find(k=>k.id===d),ee=k=>{i||(s(`Subtag "${k.subtagTitle}" clicked - current state: ${x(k)?"applied to all":"not applied to all"}`),f(k))},v=async k=>{if(i)return;s(`Delete subtag initiated: ${k}`);const J=await h(k);s(J?`Subtag successfully deleted: ${k}`:`Failed to delete subtag: ${k}`)},L=async()=>{await $()||s("Failed to submit new subtag")};if(!Q)return null;const te=he.useMemo(()=>[...A].sort((k,J)=>k.points!==J.points?J.points-k.points:J.updatedAt-k.updatedAt),[A]);return e.jsxs(Ut,{children:[e.jsx(Gt,{children:a('Subtags for "{{tagTitle}}"',{tagTitle:Q.tagTitle})}),e.jsxs(Wt,{children:[te.map(k=>e.jsx(vi,{subtag:k,isApplied:x(k),isBeingDeleted:g===k.id,disabled:i,onSubtagClick:ee,onDeleteSubtag:v},k.id)),r?e.jsx(Vt,{value:o,onChange:W,onSubmit:L,onCancel:n,isSubmitting:l,placeholder:a("Enter subtag name...")}):e.jsx(Jt,{disabled:i,onClick:u,children:a("+ Add Subtag")}),te.length===0&&!r&&e.jsx(qt,{children:a("No subtags available")})]})]})}),Si=({photoTags:t,isSelected:i=!1,onToggleSelection:s,fileName:a,showFileName:d=!1})=>{const{t:g}=ce();p.useEffect(()=>{const x="photo-tagging-animations";if(typeof document<"u"&&!document.getElementById(x)){const h=document.createElement("style");h.id=x,h.textContent=`
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
      `,document.head.appendChild(h)}},[]);const o=(x=>x.length===0?"":x.map(h=>{if(h.subtags.length>0){const u=h.subtags.map(n=>n.subtagTitle).join(", ");return g("{{tagTitle}}: {{subtags}}",{tagTitle:h.tagTitle,subtags:u})}return h.tagTitle}).join(" • "))(t),l=t.length>0;return d&&a||l||i?e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"4px"},children:[d&&a&&e.jsx("div",{style:{fontSize:"11px",fontWeight:"600",color:"#333",padding:"4px 8px",backgroundColor:i?"#e3f2fd":"#f8f9fa",borderRadius:"4px",border:`1px solid ${i?"#90caf9":"#e9ecef"}`,textAlign:"center",wordBreak:"break-word",lineHeight:"1.2",transition:"all 0.2s ease"},children:a}),e.jsx("div",{style:{background:l?"linear-gradient(135deg, rgba(0, 123, 255, 0.95) 0%, rgba(0, 123, 255, 0.85) 100%)":"transparent",color:"white",padding:l?"8px 12px":"6px 12px",borderRadius:l?"8px":"6px",fontSize:l?"11px":"10px",cursor:s?"pointer":"default",backdropFilter:l?"blur(6px)":"none",boxShadow:l?"0 4px 12px rgba(0, 123, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)":"none",border:l?"1px solid rgba(255, 255, 255, 0.2)":"none",transition:"all 0.3s ease",lineHeight:"1.3",minHeight:l?"32px":"auto",display:"flex",alignItems:"center",wordBreak:"break-word"},onClick:s,onMouseEnter:x=>{l&&(x.currentTarget.style.transform="translateY(-1px)",x.currentTarget.style.boxShadow="0 6px 16px rgba(0, 123, 255, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3)")},onMouseLeave:x=>{l&&(x.currentTarget.style.transform="translateY(0)",x.currentTarget.style.boxShadow="0 4px 12px rgba(0, 123, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)")},children:l?e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",width:"100%",flexWrap:"wrap"},children:[e.jsx("span",{style:{fontSize:"12px",opacity:.9,flexShrink:0},children:"🏷️"}),e.jsx("span",{style:{fontWeight:"600",textShadow:"0 1px 2px rgba(0, 0, 0, 0.3)",flex:1},children:o})]}):e.jsx("div",{style:{opacity:1,fontStyle:"normal",textAlign:"center",width:"100%",fontSize:i?"11px":"10px",fontWeight:i?"600":"normal",background:i?"white":"transparent",color:i?"#007bff":"white",borderRadius:i?"6px":"0",padding:i?"8px 12px":"0",border:i?"1px solid #007bff":"none",boxShadow:i?"0 2px 8px rgba(0, 123, 255, 0.2)":"none",animation:i?"subtlePulse 2.5s infinite":"none"},children:i?e.jsxs("span",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"4px"},children:[e.jsx("span",{children:"👇"})," ",g("Scroll down to select tags")]}):e.jsx("span",{style:{opacity:.8,fontStyle:"italic"},children:g("No tags applied")})})})]}):null},$i=()=>{p.useEffect(()=>{if(typeof document>"u")return;const t="photo-handler-styles";if(document.getElementById(t))return;const i=document.createElement("style");i.id=t,i.textContent=`
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
    `,document.head.appendChild(i)},[])},gt={traditional:{padding:"20px",border:"2px dashed #007bff",borderRadius:"12px",backgroundColor:"#fff",boxShadow:"0 2px 8px rgba(0, 0, 0, 0.04)"},horizontal:{display:"flex",overflowX:"auto",gap:"16px",padding:"20px",border:"2px dashed #007bff",borderRadius:"12px",backgroundColor:"#fff",boxShadow:"0 2px 8px rgba(0, 0, 0, 0.04)",scrollbarWidth:"thin",scrollbarColor:"#007bff #f8f9fa",scrollBehavior:"smooth",WebkitOverflowScrolling:"touch"}},mt={traditional:{display:"flex",flexDirection:"column",gap:"8px",minWidth:"0"},horizontal:{display:"flex",flexDirection:"column",gap:"8px",minWidth:"180px",maxWidth:"180px",flexShrink:0}},et=he.memo(({selectedPhotos:t,selectedPhotoIndices:i,isSavingAlbum:s,onRemovePhoto:a,onTogglePhotoSelection:d,photoTagsMap:g,columns:r="1",isMultipleAlbumMode:o=!1})=>{const{t:l}=ce();$i();const f=p.useMemo(()=>{if(o&&r==="horizontal")return gt.horizontal;const u=parseInt(r,10),n=isNaN(u)||u<1?1:Math.min(u,5);return{...gt.traditional,display:"grid",gridTemplateColumns:`repeat(${n}, 1fr)`,gap:"16px"}},[o,r]),x=p.useMemo(()=>o&&r==="horizontal"?mt.horizontal:mt.traditional,[o,r]),h=p.useMemo(()=>o&&r==="horizontal"?"photo-card-horizontal":"photo-card-traditional",[o,r]);return t.length===0?null:e.jsx(e.Fragment,{children:e.jsx("div",{style:f,className:"photo-grid",children:t.map((u,n)=>{var F,A;const $=i.has(n),W=g.get(n)||[];return e.jsxs("div",{style:x,children:[e.jsxs(Ws,{"data-selected":$?"true":"false",className:`${h} ${$?"selected":""}`,onClick:()=>d(n),children:[$&&!s&&e.jsx("button",{onClick:Q=>{Q.stopPropagation(),confirm(l("Are you sure you want to remove this photo?"))&&a(n)},className:"photo-delete-button",title:l("Remove photo"),children:"×"}),u.status!=="complete"&&e.jsx(Ks,{$status:u.status,children:u.status==="error"?"✕":u.status==="uploading"?"↑":u.status==="processing"?"⚙️":"•"}),e.jsxs(Hs,{className:`media-preview ${$?"selected":""}`,children:[u.type==="video"||(F=u.type)!=null&&F.startsWith("video")?e.jsx(qs,{src:u.s3PreviewUrl,controls:!0,className:"media-item"}):e.jsx(Js,{src:u.s3PreviewUrl,alt:u.fileName,className:"media-item"}),(u.status==="uploading"||u.status==="processing")&&e.jsx(At,{$bottom:"4px",$left:"4px",$right:"4px",$height:"4px",children:e.jsx(jt,{$progress:u.progress,$status:u.status})})]}),e.jsxs("div",{className:"file-info-overlay",children:[(A=u.type)!=null&&A.startsWith("video")?l("Video"):l("Image"),u.size&&l(" • {{size}} MB",{size:(u.size/1024/1024).toFixed(1)}),u.duration&&l(" • {{duration}}s",{duration:u.duration})]}),o&&r==="horizontal"&&$&&e.jsx("div",{className:"selection-indicator",children:l("SELECTED")}),u.status==="error"&&u.errorMessage&&e.jsx(Qs,{$type:"error",children:l("Error: {{message}}",{message:u.errorMessage.length>40?u.errorMessage.substring(0,37)+"...":u.errorMessage})})]}),e.jsx("div",{className:`photo-info ${o&&r==="horizontal"?"horizontal":"traditional"}`,children:e.jsx(Si,{photoTags:W,isSelected:$,onToggleSelection:()=>d(n),fileName:u.originalFileName||u.fileName,showFileName:!0})})]},n)})})})});et.displayName="PhotoHandler";const Xt=he.memo(({isSavingAlbum:t,savingProgress:i})=>{const{t:s}=ce();return t?e.jsxs(Ct,{children:[e.jsx(Vs,{children:s("Saving Album")}),e.jsx(Ys,{id:"saveProgressText",children:s("Moving files...")}),e.jsx(At,{children:e.jsx(jt,{id:"saveProgress",$progress:i/100})})]}):null});Xt.displayName="SavingProgressComponent";const Zt=he.memo(({showFolderDetails:t,isCreator:i,folderName:s,setFolderName:a,folderDescription:d,setFolderDescription:g,isSavingAlbum:r})=>{const{t:o}=ce();return!t||i!==!0?null:e.jsxs(Ct,{children:[e.jsxs(dt,{children:[e.jsx(ut,{htmlFor:"folderName",children:o("Album Name")}),e.jsx(Xs,{id:"folderName",type:"text",value:s,onChange:l=>a(l.target.value),placeholder:o("e.g. Family Vacation in Kyoto"),disabled:r})]}),e.jsxs(dt,{children:[e.jsx(ut,{htmlFor:"folderDescription",children:o("Album Description")}),e.jsx(Zs,{id:"folderDescription",value:d,onChange:l=>g(l.target.value),placeholder:o("e.g. what's special about this album"),rows:4,disabled:r})]})]})});Zt.displayName="FolderDetailsComponent";const Pi=()=>{p.useEffect(()=>{if(typeof document>"u")return;const t="existing-files-animations";if(document.getElementById(t))return;const i=document.createElement("style");i.id=t,i.textContent=`
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
    `,document.head.appendChild(i)},[])},Ii=({existingFiles:t,selectedExistingIndices:i,onToggleSelection:s,onSelectAll:a,onDeselectAll:d,onDeleteFile:g,disabled:r,isCreator:o,participantsCanDeleteItems:l,existingFileTagsMap:f,t:x,isRTL:h})=>(Pi(),t.length===0?null:e.jsxs("div",{style:{marginBottom:"32px",direction:h?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px",flexDirection:h?"row-reverse":"row"},children:[e.jsx("div",{children:e.jsx("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:x("Existing Files ({count})").replace("{count}",t.length.toString())})}),e.jsx("div",{style:{display:"flex",gap:"8px",flexDirection:h?"row-reverse":"row"},children:e.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:r?"#f8f9fa":"#fff",color:r?"#999":"#333",cursor:r?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:i.size>0?d:a,disabled:r,children:i.size>0?x("Done Tagging Selected"):x("Select All")})})]}),e.jsx("div",{className:"existing-files-grid",children:t.map((u,n)=>{const $=i.has(n),W=f.get(n)||[];return e.jsxs("div",{className:"existing-file-item",children:[e.jsxs("div",{className:`existing-file-card ${$?"selected":""}`,onClick:()=>!r&&s(n),children:[e.jsx(Gs,{thumbnailDataKey:u.thumbnailDataKey,dataKey:u.dataKey,alt:x("Existing file"),style:{width:"100%",height:"100%",objectFit:"cover"}}),$&&!r&&(o===!0||l)&&e.jsx("button",{onClick:F=>{F.stopPropagation(),confirm(x("Are you sure you want to remove this file?"))&&g(n)},className:"delete-button",title:x("Remove file"),children:"×"}),u.dataInBytes>0&&e.jsx("div",{className:"file-size",children:x("{size} MB").replace("{size}",(u.dataInBytes/(1024*1024)).toFixed(1))}),u.durationInSeconds&&e.jsx("div",{className:"file-duration",children:x("{minutes}:{seconds}").replace("{minutes}",Math.floor(u.durationInSeconds/60).toString()).replace("{seconds}",String(Math.floor(u.durationInSeconds%60)).padStart(2,"0"))})]}),e.jsxs("div",{className:"file-info",children:[u.fileName&&e.jsx("div",{className:`file-name ${$?"selected":""}`,children:u.fileName}),e.jsx("div",{className:"file-tags",children:W.length>0?e.jsx("div",{className:"tags-display",children:e.jsxs("div",{className:"tags-content",children:[e.jsx("span",{className:"tag-icon",children:"🏷️"}),e.jsx("span",{className:"tags-text",children:W.map(F=>{if(F.subtags.length>0){const A=F.subtags.map(Q=>Q.subtagTitle).join(", ");return x("{tagTitle}: {subtags}").replace("{tagTitle}",F.tagTitle).replace("{subtags}",A)}return F.tagTitle}).join(" • ")})]})}):$?e.jsx("div",{style:{background:"white",border:"1px solid #007bff",color:"#007bff",fontWeight:"600",fontSize:"11px",fontStyle:"normal",padding:"8px 12px",borderRadius:"6px",boxShadow:"0 2px 8px rgba(0, 123, 255, 0.2)",animation:"subtlePulse 2.5s infinite"},children:e.jsxs("span",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"4px"},children:[e.jsx("span",{children:"👇"})," ",x("Scroll down to select tags")]})}):null})]})]},`existing-${n}-${u.dataKey}`)})})]})),Ai=({selectedPhotos:t,selectedPhotoIndices:i,onToggleSelection:s,onSelectAll:a,onDeselectAll:d,onRemovePhoto:g,onDeleteAll:r,disabled:o,photoTagsMap:l,columns:f,setColumns:x,t:h,isRTL:u})=>t.length===0?null:e.jsxs("div",{style:{marginBottom:"32px",direction:u?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"16px",flexDirection:u?"row-reverse":"row"},children:[e.jsx("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:h("New Files ({count})").replace("{count}",t.length.toString())}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:u?"flex-start":"flex-end",gap:"8px"},children:[e.jsxs("div",{style:{display:"flex",gap:"8px",flexDirection:u?"row-reverse":"row"},children:[e.jsx("button",{className:"control-button",onClick:i.size>0?d:a,disabled:o,children:i.size>0?h("Done Tagging Selected"):h("Select All")}),i.size===0&&e.jsx("button",{className:"control-button danger",onClick:r,disabled:o,children:h("Delete All")})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",flexDirection:u?"row-reverse":"row"},children:[e.jsx("label",{className:"columns-label",children:h("Columns:")}),e.jsxs("select",{value:f,onChange:n=>x(n.target.value),className:"columns-select",children:[e.jsx("option",{value:"1",children:"1"}),e.jsx("option",{value:"2",children:"2"}),e.jsx("option",{value:"3",children:"3"}),e.jsx("option",{value:"4",children:"4"}),e.jsx("option",{value:"5",children:"5"})]})]})]})]}),e.jsx(et,{selectedPhotos:t,selectedPhotoIndices:i,isSavingAlbum:o,onRemovePhoto:g,onTogglePhotoSelection:s,onSelectAllPhotos:a,onDeselectAllPhotos:d,hideHeader:!0,photoTagsMap:l,columns:f})]}),ji=I.button`
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
`,Lt=I.div`
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
`,Ee=I.div`
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,es=I.h4`
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
`,_e=I.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 8px 0;
`,Ne=I.div`
  font-size: 14px;
  color: #333;
  line-height: 1.4;
`,Re=I.label`
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
`,ze=I.span`
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
`,ts=I.button`
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
`,Ci=I.button`
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
`,ki=({showGlobalGear:t,globalSettings:i,setGlobalSettings:s,onPasswordClick:a,onApplySettings:d})=>{const{t:g,language:r}=ce(),o=Se(r)==="rtl";return t?e.jsx(Lt,{$isRTL:o,children:e.jsxs(Ee,{children:[e.jsx(es,{children:g("Apply to All Albums")}),e.jsxs(Ee,{children:[e.jsxs(_e,{children:[e.jsx(Ne,{children:g("Public Profile")}),e.jsxs(Re,{children:[e.jsx("input",{type:"checkbox",checked:i.isOnPublicProfile,onChange:l=>s(f=>({...f,isOnPublicProfile:l.target.checked}))}),e.jsx(ze,{})]})]}),e.jsxs(_e,{children:[e.jsx(Ne,{children:g("Participants Can Add Items")}),e.jsxs(Re,{children:[e.jsx("input",{type:"checkbox",checked:i.participantsCanAddItems,onChange:l=>s(f=>({...f,participantsCanAddItems:l.target.checked}))}),e.jsx(ze,{})]})]}),e.jsxs(_e,{children:[e.jsx(Ne,{children:g("Participants Can Delete Items")}),e.jsxs(Re,{children:[e.jsx("input",{type:"checkbox",checked:i.participantsCanDeleteItems,onChange:l=>s(f=>({...f,participantsCanDeleteItems:l.target.checked}))}),e.jsx(ze,{})]})]})]}),e.jsx(Ee,{children:e.jsxs(ts,{$hasAnyPassword:i.passwordProtectionOption!=="NoPassword"&&!!i.albumPassword,onClick:a,children:[i.passwordProtectionOption!=="NoPassword"&&i.albumPassword?"🔒":"🔓",i.passwordProtectionOption!=="NoPassword"&&i.albumPassword?g("Password Set"):g("Set Password for All")]})}),e.jsx(Ci,{onClick:d,children:g("Apply to All Albums")})]})}):null},Di=({showGear:t,isOnPublicProfile:i,participantsCanAddItems:s,participantsCanDeleteItems:a,passwordProtectionOption:d,albumPassword:g,onTogglePublicProfile:r,onToggleParticipantsCanAdd:o,onToggleParticipantsCanDelete:l,onPasswordClick:f,disabled:x})=>{const{t:h,language:u}=ce(),n=Se(u)==="rtl";return t?e.jsx(Lt,{$isRTL:n,children:e.jsxs(Ee,{children:[e.jsx(es,{children:h("Album Settings")}),e.jsxs(Ee,{children:[e.jsxs(_e,{children:[e.jsx(Ne,{children:h("Public Profile")}),e.jsxs(Re,{children:[e.jsx("input",{type:"checkbox",checked:i,onChange:r,disabled:x}),e.jsx(ze,{})]})]}),e.jsxs(_e,{children:[e.jsx(Ne,{children:h("Participants Can Add Items")}),e.jsxs(Re,{children:[e.jsx("input",{type:"checkbox",checked:s,onChange:o,disabled:x}),e.jsx(ze,{})]})]}),e.jsxs(_e,{children:[e.jsx(Ne,{children:h("Participants Can Delete Items")}),e.jsxs(Re,{children:[e.jsx("input",{type:"checkbox",checked:a,onChange:l,disabled:x}),e.jsx(ze,{})]})]})]}),e.jsx(Ee,{children:e.jsxs(ts,{$hasAnyPassword:d!=="NoPassword"&&!!g,onClick:f,disabled:x,children:[d!=="NoPassword"&&g?"🔒":"🔓",h(d!=="NoPassword"&&g?"Password Set":"Set Password")]})})]})}):null},ss=({onClick:t,disabled:i,title:s})=>e.jsx(ji,{onClick:t,disabled:i,title:s,children:"⚙️"}),C={colors:{primary:"#007bff",primaryDark:"#0056b3",secondary:"#6c757d",success:"#4caf50",danger:"#e53935",warning:"#ff9800",white:"#fff",text:{primary:"#333",secondary:"#666",light:"#777"},background:{primary:"#f9fafb",highlight:"#f0f7ff"},border:"#ddd"},spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px"},borderRadius:{small:"4px",medium:"8px"},boxShadow:{lg:"0 4px 10px rgba(0,0,0,0.08)"}},Fi=I.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10000;
`,Ei=I.div`
  background-color: ${C.colors.white};
  border-radius: ${C.borderRadius.medium};
  box-shadow: ${C.boxShadow.lg};
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
  scrollbar-color: ${C.colors.border} transparent;
  
  /* Custom scrollbar for webkit browsers */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${C.colors.border};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${C.colors.secondary};
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
    border-radius: ${C.borderRadius.small};
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
`,_i=I.div`
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
`,Ni=I.div`
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
`,Ri=I.h3`
  font-size: 24px;
  font-weight: 600;
  color: ${C.colors.text.primary};
  margin: 0 0 ${C.spacing.lg} 0;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 22px;
    margin: 0 0 ${C.spacing.md} 0;
  }
  
  @media (max-height: 700px) {
    font-size: 20px;
    margin: 0 0 ${C.spacing.md} 0;
  }
  
  @media (max-width: 480px) {
    font-size: 18px;
  }
`,zi=I.p`
  margin-bottom: ${C.spacing.lg};
  font-size: 16px;
  color: ${C.colors.text.secondary};
  line-height: 1.5;
  
  @media (max-width: 768px) {
    margin-bottom: ${C.spacing.md};
    font-size: 15px;
  }
  
  @media (max-height: 700px) {
    margin-bottom: ${C.spacing.sm};
    font-size: 14px;
  }
`,ht=I.div`
  margin-bottom: ${C.spacing.lg};
`,xt=I.label`
  display: block;
  margin-bottom: ${C.spacing.sm};
  font-size: 14px;
  font-weight: 500;
  color: ${C.colors.text.primary};
`,Oi=I.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${C.colors.border};
  border-radius: ${C.borderRadius.small};
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${C.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  &::placeholder {
    color: ${C.colors.text.light};
  }
`,Mi=I.div`
  display: flex;
  flex-direction: column;
  gap: ${C.spacing.md};
  margin-bottom: ${C.spacing.xl};
`,Bi=I.div`
  border: 2px solid ${t=>t.$isSelected?C.colors.primary:C.colors.border};
  border-radius: ${C.borderRadius.medium};
  padding: ${C.spacing.lg};
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${t=>t.$isSelected?C.colors.background.highlight:C.colors.white};
  display: flex;
  align-items: center;
  gap: ${C.spacing.lg};
  
  @media (max-width: 768px) {
    padding: ${C.spacing.md};
    gap: ${C.spacing.md};
  }
  
  @media (max-width: 480px) {
    padding: ${C.spacing.sm};
    gap: ${C.spacing.sm};
  }
  
  @media (max-height: 700px) {
    padding: ${C.spacing.sm};
    gap: ${C.spacing.sm};
  }
`,Ui=I.div`
  flex: 1;
`,Gi=I.div`
  margin-bottom: ${C.spacing.xs};
`,Wi=I.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${C.colors.primary};
  flex-shrink: 0;
`,Ki=I.label`
  font-size: 16px;
  font-weight: 500;
  color: ${C.colors.text.primary};
  cursor: pointer;
  display: block;
`,Hi=I.div`
  font-size: 14px;
  color: ${C.colors.text.secondary};
  margin-top: ${C.spacing.xs};
`,qi=I.div`
  color: ${C.colors.warning};
  font-size: 12px;
  font-style: italic;
  margin-top: ${C.spacing.xs};
  font-weight: 500;
`,Ji=I.div`
  display: flex;
  gap: ${C.spacing.sm};
  justify-content: center;
  margin-top: ${C.spacing.xl};
`,bt=I.button`
  background-color: ${t=>t.$variant==="danger"?C.colors.danger:t.$variant==="secondary"?"transparent":t.$variant==="success"?C.colors.success:C.colors.primary};
  color: ${t=>t.$variant==="secondary"?C.colors.primary:C.colors.white};
  border: ${t=>t.$variant==="secondary"?`1px solid ${C.colors.primary}`:"none"};
  padding: ${t=>t.$size==="small"?"8px 16px":t.$size==="large"?"16px 32px":"12px 24px"};
  border-radius: ${C.borderRadius.medium};
  cursor: ${t=>t.disabled?"not-allowed":"pointer"};
  font-size: ${t=>t.$size==="small"?"14px":t.$size==="large"?"18px":"16px"};
  font-weight: 500;
  transition: all 0.2s ease;
  opacity: ${t=>t.disabled?.6:1};
  min-width: 100px;

  &:hover:not(:disabled) {
    background-color: ${t=>t.$variant==="danger"?"#c62828":t.$variant==="secondary"?C.colors.background.highlight:t.$variant==="success"?"#388e3c":C.colors.primaryDark};
  }
`,Qi=I.div`
  background-color: ${C.colors.background.primary};
  border-radius: ${C.borderRadius.medium};
  padding: ${C.spacing.md};
  margin: ${C.spacing.md} 0;
  border-left: 4px solid ${C.colors.primary};
  font-size: 14px;
  color: ${C.colors.text.secondary};
  line-height: 1.4;
  
  @media (max-width: 768px) {
    padding: ${C.spacing.sm};
    margin: ${C.spacing.sm} 0;
    font-size: 13px;
  }
  
  @media (max-height: 700px) {
    padding: ${C.spacing.xs};
    font-size: 12px;
  }
`,Vi=[{value:"NotVisible",titleKey:"Password Required To See Or Save",descriptionKey:"Album will be completely hidden until correct password is entered"},{value:"Watermark",titleKey:"Watermarked And No Saving Without Password",descriptionKey:"Photos will be visible with watermarks, password required to save"},{value:"CannotBeSaved",titleKey:"Password Required To Save",descriptionKey:"Photos are visible but password required to download or save"},{value:"NoPassword",titleKey:"No Password",descriptionKey:"Album is fully public with no restrictions"}],is=({isOpen:t,onClose:i,initialOption:s="NoPassword",initialPassword:a=""})=>{const{t:d,language:g}=ce(),r=Se(g)==="rtl",[o,l]=p.useState(!1),[f,x]=p.useState(s),[h,u]=p.useState(a);if(p.useEffect(()=>{l(!0)},[]),p.useEffect(()=>{t&&(x(s),u(a))},[t,s,a]),!t||!o)return null;const n=h.trim()==="",$=A=>{x(A)},W=A=>{A.target===A.currentTarget&&i()},F=A=>A!=="NoPassword";return e.jsxs(e.Fragment,{children:[e.jsx(Fi,{onClick:W}),e.jsx(Ei,{children:e.jsx(_i,{children:e.jsxs(Ni,{$isRTL:r,children:[e.jsx(Ri,{children:d("Album Password Policy")}),e.jsx(zi,{children:d("Configure password protection for your album. Choose how you want to restrict access to your photos.")}),e.jsxs(ht,{children:[e.jsx(xt,{children:d("Enter Password")}),e.jsx(Oi,{type:"text",placeholder:d("Enter password (optional)"),value:h,onChange:A=>u(A.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"})]}),e.jsxs(ht,{children:[e.jsx(xt,{children:d("Select Protection Level")}),e.jsx(Mi,{children:Vi.map(A=>e.jsxs(Bi,{$isSelected:f===A.value,onClick:()=>$(A.value),children:[e.jsx(Wi,{type:"radio",name:"protection",checked:f===A.value,onChange:()=>$(A.value)}),e.jsxs(Ui,{children:[e.jsx(Gi,{children:e.jsx(Ki,{children:d(A.titleKey)})}),e.jsx(Hi,{children:d(A.descriptionKey)}),n&&F(A.value)&&f===A.value&&e.jsx(qi,{children:d('⚠️ Will use "password" as default if left empty')})]})]},A.value))})]}),F(f)&&e.jsxs(Qi,{children:[e.jsx("strong",{children:d("💡 Password Protection Info:")}),e.jsx("br",{}),d('If you leave the password field empty, "password" will be used as the default password. You can change this anytime in album settings.')]}),e.jsxs(Ji,{children:[e.jsx(bt,{$variant:"secondary",onClick:()=>i(),children:d("Cancel")}),e.jsx(bt,{$variant:"primary",onClick:()=>{const A=n&&F(f)?"password":h;console.log(`Saving with option: ${f}, password: ${A.length>0?"********":"none"}`),i(f,A)},children:d("Save")})]})]})})})]})},Yi=({debugMessages:t,t:i,isRTL:s,textDirection:a})=>t.length===0?null:e.jsxs("div",{style:{marginTop:"40px",background:"#fff3cd",padding:"16px",borderRadius:"8px",border:"1px solid #ffeeba",maxWidth:900,margin:"0 auto",direction:a},children:[e.jsx("h3",{style:{marginTop:0,fontSize:"18px",color:"#856404",textAlign:s?"right":"left"},children:i("Debug Log")}),e.jsx("pre",{style:{fontSize:"14px",color:"#856404",whiteSpace:"pre-wrap",maxHeight:"400px",overflow:"auto",textAlign:s?"right":"left"},children:t.map((d,g)=>e.jsx("div",{style:{marginBottom:"8px"},children:d},g))})]}),Xi=()=>{const[t,i]=p.useState(!1);return p.useEffect(()=>{i(!0)},[]),{getItem:g=>{if(!t)return null;try{return localStorage.getItem(g)}catch{return null}},setItem:(g,r)=>{if(t)try{localStorage.setItem(g,r)}catch{}},removeItem:g=>{if(t)try{localStorage.removeItem(g)}catch{}},isClient:t}},Zi=()=>{const[t,i]=p.useState(new URLSearchParams),[s,a]=p.useState(!1);return p.useEffect(()=>{a(!0),typeof window<"u"&&i(new URLSearchParams(window.location.search))},[]),{urlParams:t,isClient:s}},wt=()=>{const{t,language:i}=ce(),s=Se(i)==="rtl",a=Xi(),{urlParams:d,isClient:g}=Zi(),[r,o]=p.useState({selectedPhotoIndices:new Set,photoTagsMap:new Map,selectedExistingIndices:new Set,existingFileTagsMap:new Map}),l=Pt(t),{setShowUsernamePrompt:f,setUsernameInput:x}=l,[h,u]=p.useState(null),[n,$]=p.useState(!1),[W,F]=p.useState(0),[A,Q]=p.useState(""),[ee,v]=p.useState(""),[L,te]=p.useState(!1),[X,k]=p.useState(!1),[J,_]=p.useState("NoPassword"),[O,K]=p.useState(""),[G,T]=p.useState(!1),[N,q]=p.useState(!0),[V,oe]=p.useState(!1),[se,re]=p.useState(null),[ue,me]=p.useState(!1),[xe,$e]=p.useState([]),[ke,Pe]=p.useState("2"),[le,De]=p.useState([]),[Ie,Ae]=p.useState(!1),[b,z]=p.useState(!1),[H,B]=p.useState(!1),c=p.useRef(null),w=(S,M)=>{const Y=new Date().toISOString();console.log(`[${Y}] ${S}`,M)};p.useEffect(()=>{if(!g)return;const S=M=>{c.current&&!c.current.contains(M.target)&&B(!1)};return document.addEventListener("mousedown",S),()=>{document.removeEventListener("mousedown",S)}},[g]);const U=Bs(S=>{!h&&S&&u(S)},!0),{fileInputRef:j,selectedPhotos:y,setSelectedPhotos:m,isUploading:D,progressTracker:E,setProgressTracker:R,debugMessages:Z,currentFolderId:ie,openFilePicker:we,handleFileSelection:rs,setOnSaveAlbumPage:Ge}=U,as=ni(u,m,re,te,Q,v,T,q,_,K,me,$e,oe,w),{cognitoUsername:tt,publicUsername:We,setPublicUsername:os}=as,ns=Bt(r.photoTagsMap,S=>{o(M=>({...M,photoTagsMap:typeof S=="function"?S(M.photoTagsMap):S}))},r.existingFileTagsMap,S=>{o(M=>({...M,existingFileTagsMap:typeof S=="function"?S(M.existingFileTagsMap):S}))},r.selectedPhotoIndices,r.selectedExistingIndices,w),ls=ci(h||ie,tt,y,ue,xe,A,ee,G,N,V,J,O,r.photoTagsMap,r.existingFileTagsMap,le,r.selectedExistingIndices,$,F,m,R,w,t),{saveAlbumDirectly:st}=ls;p.useEffect(()=>{if(!g)return;const S=a.getItem("save-album-columns")||"2";Pe(S)},[g,a]);const cs=S=>{Pe(S),a.setItem("save-album-columns",S)};p.useEffect(()=>(Ge(!0),()=>Ge(!1)),[Ge]),p.useEffect(()=>{(async()=>{try{await Rs()}catch(M){console.warn("Credential prewarming failed:",M)}})()},[]);const ds=async S=>{var M,Y,ae;if(S){Ae(!0);try{const ne=await ge();if(!ne)return;const fe=`
        mutation FetchRelations($fetchRelationsInput: FetchRelationsInput!) {
          fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
            items {
              ... on FolderPosition {
                ${Ms}
              }
            }
          }
        }
      `,pe={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}},Me=await(await fetch(Ce,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${ne}`},body:JSON.stringify({query:fe,variables:pe})})).json();if(Me.errors){console.error("GraphQL errors:",Me.errors);return}const it=(((Y=(M=Me==null?void 0:Me.data)==null?void 0:M.fetchRelations)==null?void 0:Y.items)||[]).find(be=>be&&be.folder&&be.folder.id===S);if(!it)return;const je=it.folder,ks=((ae=je==null?void 0:je.fileReferencesPage)==null?void 0:ae.items)||[],rt=[],at=new Map;ks.forEach((be,Ds)=>{const ve=be.file;if(ve&&ve.dataKey){let Ke=be.fileDisplayName;if(!Ke&&ve.dataKey){const Ue=ve.dataKey.split("/");Ke=Ue[Ue.length-1]}rt.push({fileReferenceId:be.id,dataKey:ve.dataKey,thumbnailDataKey:ve.thumbnailDataKey||null,durationInSeconds:ve.durationInSeconds||null,dataInBytes:ve.dataInBytes||0,fileName:Ke||void 0});const ot=be.selectedTags||[];if(ot.length>0){const Ue=ot.map(He=>{var nt;return{tagTitle:He.tagTitle,TagType:He.TagType,subtags:((nt=He.subtags)==null?void 0:nt.map(lt=>({tagTitle:lt.tagTitle,subtagTitle:lt.subtagTitle})))||[]}});at.set(Ds,Ue)}}}),De(rt),o(be=>({...be,existingFileTagsMap:at})),!A&&je.folderName&&Q(je.folderName),!ee&&je.folderDescription&&v(je.folderDescription)}catch(ne){console.error("Failed to fetch existing album data:",ne)}finally{Ae(!1)}}};p.useEffect(()=>{if(!g)return;const S=d.get("folderId");S&&(u(S),me(!1),a.removeItem(de.SUB_ALBUM_DATA),te(!0),re(!0))},[g,d,a]),p.useEffect(()=>{h&&ds(h)},[h]),p.useEffect(()=>{ie&&!h&&u(ie)},[ie,h]),p.useEffect(()=>{o(S=>{const M=new Set,Y=new Map;return S.selectedPhotoIndices.forEach(ae=>{ae<y.length&&M.add(ae)}),S.photoTagsMap.forEach((ae,ne)=>{ne<y.length&&Y.set(ne,ae)}),{...S,selectedPhotoIndices:M,photoTagsMap:Y}})},[y.length]),p.useEffect(()=>{o(S=>{const M=new Set,Y=new Map;return S.selectedExistingIndices.forEach(ae=>{ae<le.length&&M.add(ae)}),S.existingFileTagsMap.forEach((ae,ne)=>{ne<le.length&&Y.set(ne,ae)}),{...S,selectedExistingIndices:M,existingFileTagsMap:Y}})},[le.length]);const us=S=>{const M=y.filter((Y,ae)=>ae!==S);m(M),M.length>0?a.setItem(de.SELECTED_PHOTOS,JSON.stringify(M)):a.removeItem(de.SELECTED_PHOTOS),o(Y=>{const ae=new Set,ne=new Map;return Y.selectedPhotoIndices.forEach(fe=>{fe<S?ae.add(fe):fe>S&&ae.add(fe-1)}),Y.photoTagsMap.forEach((fe,pe)=>{pe<S?ne.set(pe,fe):pe>S&&ne.set(pe-1,fe)}),{...Y,selectedPhotoIndices:ae,photoTagsMap:ne}})},ps=async S=>{const M=le[S];if(!M){w(`No file found at index ${S}`);return}z(!0),w(`Starting deletion of file reference: ${M.fileReferenceId}`);try{await Te.deleteFileReferences([M.fileReferenceId],w),w(`Successfully deleted file reference: ${M.fileReferenceId}`);const Y=le.filter((ae,ne)=>ne!==S);De(Y),o(ae=>{const ne=new Set,fe=new Map;return ae.selectedExistingIndices.forEach(pe=>{pe<S?ne.add(pe):pe>S&&ne.add(pe-1)}),ae.existingFileTagsMap.forEach((pe,Oe)=>{Oe<S?fe.set(Oe,pe):Oe>S&&fe.set(Oe-1,pe)}),{...ae,selectedExistingIndices:ne,existingFileTagsMap:fe}}),w(`File removed from local state, ${Y.length} files remaining`)}catch(Y){console.error("Failed to delete file reference:",Y),w(`Failed to delete file reference: ${Y}`),alert(t("Failed to delete file. Please try again."))}finally{z(!1)}},fs=S=>{o(M=>{const Y=new Set(M.selectedExistingIndices);return Y.has(S)?Y.delete(S):Y.add(S),{...M,selectedExistingIndices:Y}})},gs=()=>{const S=new Set;for(let M=0;M<le.length;M++)S.add(M);o(M=>({...M,selectedExistingIndices:S}))},ms=()=>{o(S=>({...S,selectedExistingIndices:new Set}))},hs=S=>{o(M=>{const Y=new Set(M.selectedPhotoIndices);return Y.has(S)?Y.delete(S):Y.add(S),{...M,selectedPhotoIndices:Y}})},xs=()=>{const S=new Set;for(let M=0;M<y.length;M++)S.add(M);o(M=>({...M,selectedPhotoIndices:S}))},bs=()=>{o(S=>({...S,selectedPhotoIndices:new Set}))},ws=()=>{g&&confirm(t("Are you sure you want to delete all new files? This action cannot be undone."))&&(m([]),o({selectedPhotoIndices:new Set,photoTagsMap:new Map,selectedExistingIndices:new Set,existingFileTagsMap:new Map}),a.removeItem(de.SELECTED_PHOTOS))},ys=async()=>{$(!0);try{if(We!=null&&We.startsWith("Profile-")){x(""),f(!0),$(!1);return}st()}catch(S){console.error("Error in handleSaveAlbumSingle:",S),$(!1)}},vs=S=>{a.setItem(de.PUBLIC_USERNAME,S),os(S),f(!1),st()},Ts=(S,M)=>{S&&_(S),M!==void 0&&K(M),k(!1)},Ss=()=>{k(!0)},$s=()=>{T(!G)},Ps=()=>{q(!N)},Is=()=>{oe(!V)},As=()=>{we(h)},ye=n||D||Ie||b,js=y.length>0||le.length>0,Cs=r.selectedPhotoIndices.size>0||r.selectedExistingIndices.size>0;return e.jsxs(e.Fragment,{children:[e.jsx(kt,{}),e.jsx(Dt,{children:e.jsxs(Ft,{children:[e.jsx(Et,{href:"my-albums.html",children:t("Back to Albums")}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[L&&se===!0&&e.jsxs("div",{ref:c,style:{position:"relative"},children:[e.jsx(ss,{onClick:()=>B(!H),disabled:ye,title:t("Album Settings")}),e.jsx(Di,{showGear:H,isOnPublicProfile:G,participantsCanAddItems:N,participantsCanDeleteItems:V,passwordProtectionOption:J,albumPassword:O,onTogglePublicProfile:$s,onToggleParticipantsCanAdd:Ps,onToggleParticipantsCanDelete:Is,onPasswordClick:Ss,disabled:ye})]}),e.jsx(Le,{$primary:!0,onClick:ys,disabled:ye,style:{minWidth:"120px",fontSize:"14px",padding:"8px 16px"},children:t(n?"Saving...":"Save Album")})]})]})}),e.jsxs(_t,{$isRTL:s,children:[e.jsx("div",{style:{marginTop:L&&se===!0?"3px":"0"},children:e.jsx(Zt,{showFolderDetails:L,isCreator:se,folderName:A,setFolderName:Q,folderDescription:ee,setFolderDescription:v,isSavingAlbum:ye})}),(D||E.totalFiles>0&&(E.filesUploading>0||E.filesProcessing>0||E.filesComplete<E.totalFiles))&&e.jsx(Us,{progressTracker:E,isRTL:Se(i)==="rtl",variant:"detailed",context:"saving",isUploading:D,showSuccessMessage:!1,showErrorMessage:!0,customMessages:{error:t("Some photos could not be processed. You can continue with the successfully processed photos.")}}),b&&e.jsx("div",{style:{padding:"16px",marginBottom:"16px",backgroundColor:"#fff3cd",border:"1px solid #ffeaa7",borderRadius:"8px",color:"#856404",textAlign:"center",fontWeight:"500"},children:t("Deleting file...")}),Ie&&e.jsx("div",{style:{padding:"16px",marginBottom:"16px",backgroundColor:"#f8f9fa",border:"1px solid #dee2e6",borderRadius:"8px",color:"#6c757d",textAlign:"center",fontStyle:"italic"},children:t("Loading existing files...")}),e.jsx("input",{ref:j,id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:S=>rs(S,tt),style:{display:"none"}}),L&&se===!0&&js&&e.jsxs("div",{style:{padding:"32px",marginBottom:"32px",backgroundColor:"#f8f9fa",border:"2px solid #e9ecef",borderRadius:"12px",direction:s?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",fontSize:"18px",color:"#495057",fontWeight:"600",marginBottom:"24px",flexDirection:s?"row-reverse":"row"},children:[e.jsx("span",{style:{marginRight:s?"0":"12px",marginLeft:s?"12px":"0",fontSize:"20px"},children:"🏷️"}),t("Select files to start adding or removing tags")]}),le.length>0&&e.jsx(Ii,{existingFiles:le,selectedExistingIndices:r.selectedExistingIndices,onToggleSelection:fs,onSelectAll:gs,onDeselectAll:ms,onDeleteFile:ps,disabled:ye,isCreator:se,participantsCanDeleteItems:V,existingFileTagsMap:r.existingFileTagsMap,t,isRTL:s}),e.jsx(Ai,{selectedPhotos:y,selectedPhotoIndices:r.selectedPhotoIndices,onToggleSelection:hs,onSelectAll:xs,onDeselectAll:bs,onRemovePhoto:us,onDeleteAll:ws,disabled:ye,photoTagsMap:r.photoTagsMap,columns:ke,setColumns:cs,t,isRTL:s}),e.jsx("div",{style:{marginTop:Cs?"32px":"16px"},children:e.jsx(Yt,{tagsManager:ns,disabled:ye,enhancedLog:w})})]}),e.jsx(Xt,{isSavingAlbum:n,savingProgress:W}),e.jsx(Ls,{children:e.jsx(Le,{onClick:As,disabled:ye,children:t(D?"Uploading...":"Add More Photos")})}),e.jsx(It,{t,language:i,usernameManager:l,onSuccess:vs}),e.jsx(is,{isOpen:X,onClose:Ts,initialOption:J,initialPassword:O}),e.jsx(Yi,{debugMessages:Z,t,isRTL:s,textDirection:s?"rtl":"ltr"})]})]})},Li=I.div`
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
`,er=I.div`
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
`,tr=I.div`
  flex: 1;
`,sr=I.h3`
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
`,ir=I.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
`,rr=I.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: stretch;
  }
`,yt=I.button`
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
`,ar=I.button`
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
`,or=I.div`
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
`,Je=I.div`
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,Qe=I.h4`
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #333;
`,Ve=I.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  padding: 4px 0;
`,Ye=I.div`
  font-size: 13px;
  color: #333;
  line-height: 1.4;
`,Xe=I.label`
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
`,Ze=I.span`
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
`,nr=I.button`
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
`,vt=I.div`
  margin-bottom: 16px;
`,Tt=I.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #333;
  font-size: 14px;
`,lr=I.input`
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
`,cr=I.textarea`
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
`,dr=I.div`
  margin-top: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e9ecef;
`,ur=I.div`
  width: 100%;
  height: 6px;
  background: #e9ecef;
  border-radius: 3px;
  overflow: hidden;
  margin-top: 8px;
`,pr=I.div`
  height: 100%;
  background: linear-gradient(90deg, #007bff, #28a745);
  width: ${t=>t.$progress}%;
  transition: width 0.3s ease;
`,fr=I.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
  justify-content: flex-end;
  flex-direction: ${t=>t.$isRTL?"row-reverse":"row"};
`,St=I.button`
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
`,gr=({album:t,onUpdate:i,onSave:s,onRemove:a,onShowPasswordDialog:d,disabled:g,columns:r,enhancedLog:o})=>{const{t:l,language:f}=ce(),x=Se(f)==="rtl",[h,u]=p.useState(!1),[n,$]=p.useState(!1),W=p.useRef(null);p.useEffect(()=>{const N=q=>{W.current&&!W.current.contains(q.target)&&u(!1)};return document.addEventListener("mousedown",N),()=>{document.removeEventListener("mousedown",N)}},[]);const F=Bt(t.photoTagsMap,N=>{const q=typeof N=="function"?N(t.photoTagsMap):N;i({photoTagsMap:q})},new Map,()=>{},t.selectedPhotoIndices,new Set,o),A=N=>{i({name:N})},Q=N=>{i({description:N})},ee=N=>{const q=new Set(t.selectedPhotoIndices);q.has(N)?q.delete(N):q.add(N),i({selectedPhotoIndices:q})},v=()=>{const N=new Set;for(let q=0;q<t.photos.length;q++)N.add(q);i({selectedPhotoIndices:N})},L=()=>{i({selectedPhotoIndices:new Set})},te=()=>{confirm(l("Are you sure you want to delete all files from this album? This action cannot be undone."))&&i({photos:[],selectedPhotoIndices:new Set,photoTagsMap:new Map})},X=N=>{const q=t.photos.filter((se,re)=>re!==N),V=new Set;t.selectedPhotoIndices.forEach(se=>{se<N?V.add(se):se>N&&V.add(se-1)});const oe=new Map;t.photoTagsMap.forEach((se,re)=>{re<N?oe.set(re,se):re>N&&oe.set(re-1,se)}),i({photos:q,selectedPhotoIndices:V,photoTagsMap:oe})},k=()=>{i({isOnPublicProfile:!t.isOnPublicProfile})},J=()=>{i({participantsCanAddItems:!t.participantsCanAddItems})},_=()=>{i({participantsCanDeleteItems:!t.participantsCanDeleteItems})},O=()=>{d(t.id)},K=async()=>{if(!(n||g)){$(!0),o(`Starting save for album: ${t.name}`);try{const N=await s();o(`Save completed for album: ${t.name}, success: ${N}`),N||alert(l('Failed to save album "{{albumName}}". Please try again.',{albumName:t.name}))}catch(N){console.error("Error saving album:",N),o(`Error saving album ${t.name}: ${N}`),alert(l('Failed to save album "{{albumName}}". Please try again.',{albumName:t.name}))}finally{$(!1)}}},G=t.passwordProtectionOption!=="NoPassword"&&t.albumPassword,T=g||n||t.isSaving;return e.jsxs(Li,{children:[e.jsxs(er,{$isRTL:x,children:[e.jsxs(tr,{children:[e.jsxs(sr,{children:[e.jsx("span",{children:"📁"}),t.name,(t.isSaving||n)&&e.jsx("span",{style:{color:"#007bff"},children:"⏳"}),t.savingProgress===100&&e.jsx("span",{style:{color:"#28a745"},children:"✅"})]}),e.jsxs(ir,{children:[t.photos.length===1?l("1 file"):l("{{count}} files",{count:t.photos.length}),t.selectedPhotoIndices.size>0&&e.jsxs("span",{children:[" • ",l("{{count}} selected for tagging",{count:t.selectedPhotoIndices.size})]})]})]}),e.jsx(rr,{children:!t.isSaving&&!n&&t.savingProgress<100&&e.jsxs(e.Fragment,{children:[e.jsx(yt,{$variant:"primary",onClick:K,disabled:T,children:l(n?"Saving...":"Save")}),e.jsxs("div",{ref:W,style:{position:"relative"},children:[e.jsx(ar,{onClick:()=>u(!h),disabled:T,title:l("Album Settings"),children:"⚙️"}),h&&e.jsxs(or,{$isRTL:x,children:[e.jsxs(Je,{children:[e.jsx(Qe,{children:l("Visibility")}),e.jsxs(Ve,{children:[e.jsx(Ye,{children:l("Public Profile")}),e.jsxs(Xe,{children:[e.jsx("input",{type:"checkbox",checked:t.isOnPublicProfile,onChange:k,disabled:T}),e.jsx(Ze,{})]})]})]}),e.jsxs(Je,{children:[e.jsx(Qe,{children:l("Participant Permissions")}),e.jsxs(Ve,{children:[e.jsx(Ye,{children:l("Can Add Items")}),e.jsxs(Xe,{children:[e.jsx("input",{type:"checkbox",checked:t.participantsCanAddItems,onChange:J,disabled:T}),e.jsx(Ze,{})]})]}),e.jsxs(Ve,{children:[e.jsx(Ye,{children:l("Can Delete Items")}),e.jsxs(Xe,{children:[e.jsx("input",{type:"checkbox",checked:t.participantsCanDeleteItems,onChange:_,disabled:T}),e.jsx(Ze,{})]})]})]}),e.jsxs(Je,{children:[e.jsx(Qe,{children:l("Security")}),e.jsxs(nr,{$hasPassword:!!G,onClick:O,disabled:T,children:[G?"🔒":"🔓",l(G?"Password Set":"Set Password")]})]})]})]}),e.jsx(yt,{$variant:"danger",onClick:a,disabled:T,children:l("Remove")})]})})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",marginBottom:"20px"},children:[e.jsxs(vt,{children:[e.jsx(Tt,{children:l("Album Name")}),e.jsx(lr,{type:"text",value:t.name,onChange:N=>A(N.target.value),placeholder:l("e.g. Family Vacation in Kyoto"),disabled:T})]}),e.jsxs("div",{children:[e.jsxs(vt,{children:[e.jsx(Tt,{children:l("Album Description")}),e.jsx(cr,{value:t.description,onChange:N=>Q(N.target.value),placeholder:l("e.g. what's special about this album"),disabled:T,rows:3})]}),t.photos.length>0&&e.jsxs(fr,{$isRTL:x,children:[e.jsx(St,{onClick:t.selectedPhotoIndices.size>0?L:v,disabled:T,children:t.selectedPhotoIndices.size>0?l("Done Tagging Selected"):l("Select All")}),t.selectedPhotoIndices.size===0&&e.jsx(St,{$variant:"danger",onClick:te,disabled:T,children:l("Delete All")})]})]})]}),e.jsx(et,{selectedPhotos:t.photos,selectedPhotoIndices:t.selectedPhotoIndices,isSavingAlbum:T,onRemovePhoto:X,onTogglePhotoSelection:ee,onSelectAllPhotos:v,onDeselectAllPhotos:L,hideHeader:!1,photoTagsMap:t.photoTagsMap,columns:r,isMultipleAlbumMode:!0}),t.selectedPhotoIndices.size>0&&e.jsx(dr,{children:e.jsx(Yt,{tagsManager:F,disabled:T,enhancedLog:o})}),(t.isSaving||n)&&e.jsxs("div",{style:{marginTop:"16px"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},children:[e.jsx("span",{style:{fontSize:"14px",fontWeight:"600",color:"#333"},children:l(n?"Starting save...":"Saving album...")}),e.jsx("span",{style:{fontSize:"14px",color:"#666"},children:l("{{progress}}%",{progress:t.savingProgress})})]}),e.jsx(ur,{children:e.jsx(pr,{$progress:t.savingProgress})})]})]})},mr=I.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
`,hr=({albums:t,setAlbums:i,isSavingAny:s,onSaveAlbum:a,onRemoveAlbum:d,onShowPasswordDialog:g,columns:r,setColumns:o,enhancedLog:l})=>{const{language:f}=ce(),x=Se(f)==="rtl",h=p.useCallback((n,$)=>{i(W=>W.map(F=>F.id===n?{...F,...$}:F))},[i]),u=p.useCallback(async n=>{try{const $=await a(n);return l(`Album ${n} save result: ${$?"success":"failed"}`),$}catch($){return l(`Error saving album ${n}: ${$}`),!1}},[a,l]);return e.jsx("div",{children:e.jsx(mr,{$isRTL:x,children:t.map(n=>e.jsx(gr,{album:n,onUpdate:$=>h(n.id,$),onSave:()=>u(n.id),onRemove:()=>d(n.id),onShowPasswordDialog:g,disabled:s,columns:r,setColumns:o,enhancedLog:l},n.id))})})},xr=()=>{var Ie,Ae;const{t,language:i}=ce(),s=Se(i)==="rtl",[a,d]=p.useState([]),[g,r]=p.useState("2"),[o,l]=p.useState(!1),[f,x]=p.useState(!1),[h,u]=p.useState(null),[n,$]=p.useState(null),[W,F]=p.useState(!1),[A,Q]=p.useState(0),[ee,v]=p.useState(0),[L,te]=p.useState(""),[X,k]=p.useState({isOnPublicProfile:!1,participantsCanAddItems:!0,participantsCanDeleteItems:!1,passwordProtectionOption:"NoPassword",albumPassword:""}),J=Pt(t),{setShowUsernamePrompt:_,setUsernameInput:O}=J,[K,G]=p.useState(null);p.useEffect(()=>{const b=localStorage.getItem(de.PUBLIC_USERNAME);G(b||null)},[]);const T=(b,z)=>{const H=new Date().toISOString();console.log(`[${H}] ${b}`,z)};p.useEffect(()=>{(async()=>{try{const z=await ge();if(z){const B=JSON.parse(atob(z.split(".")[1]))["cognito:username"];B&&($(B),T(`Initialized Cognito username: ${B}`))}}catch(z){console.error("Error initializing username:",z)}})()},[]);const N=b=>{r(b),localStorage.setItem("save-album-columns",b),T(`Column setting changed to ${b} for all albums`)};p.useEffect(()=>{const b=localStorage.getItem(de.MULTI_ALBUM_DATA);if(b)try{const H=JSON.parse(b).filter(c=>{if(!c||!c.name||!Array.isArray(c.selectedPhotos))return!1;const w=c.selectedPhotos.filter(P=>P&&P.fileName&&P.originalFileName&&P.s3PreviewUrl&&P.s3PreviewUrl.includes("amazonaws.com"));return c.selectedPhotos=w,w.length>0});if(H.length===0){alert(t("No valid albums were found. Please try selecting your files again.")),Fe("my-albums.html");return}const B=H.map(c=>({id:pt(),name:c.name,description:"",photos:c.selectedPhotos,selectedPhotoIndices:new Set,photoTagsMap:new Map,isOnPublicProfile:!1,participantsCanAddItems:!0,participantsCanDeleteItems:!1,passwordProtectionOption:"NoPassword",albumPassword:"",isSaving:!1,savingProgress:0,folderId:""}));d(B),qe()}catch(z){console.error("Error parsing multi-album data:",z),alert(t("There was an error loading your albums. Please try selecting your files again.")),Fe("my-albums.html")}else alert(t("No album data was found. Please try selecting your files again.")),Fe("my-albums.html")},[t]),p.useEffect(()=>{const b=localStorage.getItem("save-album-columns")||"2";r(b)},[]);const q=(b,z)=>{T(`Album ${b} progress: ${z}`)},V=(b,z)=>{d(H=>H.map(B=>B.id===b?{...B,savingProgress:z}:B))},oe=async(b,z,H)=>{T(`Starting chunked save for album ${b}`),q(b,t("Processing files in chunks..."));const B=48;if(H.length===0)T(`No file references for album ${b}, saving only folder position`),await Te.saveFolderOnly(z,T);else{const c=Rt(H);T(`Album ${b}: Processing ${c.length} unique file references`);const w=zt(c,B);T(`Album ${b}: Split into ${w.length} chunks`);for(let P=0;P<w.length;P++){const U=w[P];T(`Album ${b}: Processing chunk ${P+1} of ${w.length}`);const j=P/w.length*80;V(b,10+j),P<w.length-1?(q(b,t("Saving files: chunk {{chunkNumber}} of {{totalChunks}}...",{chunkNumber:P+1,totalChunks:w.length})),await Te.saveFileReferences(U,T)):(q(b,t("Finalizing album...")),await Te.saveFinalChunkWithFolder(U,z,T))}}V(b,100),q(b,t("Album saved successfully!"))},se=async b=>{const z=a.find(H=>H.id===b);if(!z)return T(`Album ${b} not found`),!1;if(z.photos.length===0)return alert(t('The album "{{albumName}}" has no photos to save.',{albumName:z.name})),!1;if(!n)return T(`No Cognito username available for album ${b}`),!1;T(`Starting real save for album: ${z.name}`),d(H=>H.map(B=>B.id===b?{...B,isSaving:!0,savingProgress:5}:B));try{const H=Math.floor(Date.now()/1e3),B=`${n}_____${pt()}____Folder`,c=`${n}_____${n}____Account`,P=B.split("_____")[1].split("____")[0];T(`Album ${b} folder ID: ${B}`),d(m=>m.map(D=>D.id===b?{...D,folderId:B}:D));const U=Ot(H,c,P,B,n,z.isOnPublicProfile,z.participantsCanAddItems,z.participantsCanDeleteItems,z.passwordProtectionOption,z.albumPassword,z.name,z.description,!1,[],T),j=z.photos.filter(m=>m.status==="complete");T(`Album ${b}: ${j.length} valid photos`);let y=[];if(j.length>0){const m=j.filter(D=>!D.fileId);m.length>0&&(T(`Album ${b}: Moving ${m.length} files to public folder`),q(b,t("Moving files...")),await $t(m,D=>V(b,D),T)),T(`Album ${b}: Creating file reference inputs`),y=Mt(j,H,c,B,n,z.photoTagsMap,T)}return await oe(b,U,y),d(m=>m.map(D=>D.id===b?{...D,isSaving:!1,savingProgress:100}:D)),T(`Successfully saved album: ${z.name}`),!0}catch(H){return console.error(`Error saving album ${b}:`,H),T(`Error saving album ${b}: ${H}`),d(B=>B.map(c=>c.id===b?{...c,isSaving:!1,savingProgress:0}:c)),alert(t('Failed to save album "{{albumName}}". Please try again.',{albumName:z.name})),!1}},re=async()=>{if(K!=null&&K.startsWith("Profile-")){O(""),_(!0);return}if(!n){alert(t("Unable to determine user credentials. Please refresh and try again."));return}const b=a.filter(B=>B.savingProgress<100);if(b.length===0)return;T(`Starting save process for ${b.length} albums`),F(!0),v(b.length),Q(0);let z=0;const H=[];try{for(let B=0;B<b.length;B++){const c=b[B];Q(B+1),te(c.name),T(`Saving album ${B+1} of ${b.length}: ${c.name}`),await se(c.id)?z++:H.push(c.name),await new Promise(P=>setTimeout(P,200))}if(H.length===0)T("All albums saved successfully, cleaning up and redirecting"),setTimeout(()=>{localStorage.removeItem(de.MULTI_ALBUM_DATA),qe(),sessionStorage.setItem("album_just_saved","true"),Fe("my-albums.html")},1e3);else{const B=H.length===1?t('Failed to save album "{{albumName}}". Please try again.',{albumName:H[0]}):t("Failed to save {{count}} albums: {{albumNames}}. Please try again.",{count:H.length,albumNames:H.join(", ")});alert(B)}}catch(B){console.error("Error in save all albums:",B),alert(t("There was an error saving albums. Please try again."))}finally{F(!1),Q(0),v(0),te("")}},ue=b=>{localStorage.setItem(de.PUBLIC_USERNAME,b),G(b),_(!1),F(!1),Q(0),v(0),te(""),re()},me=b=>{const z=a.find(H=>H.id===b);z&&(u(b),k(H=>({...H,passwordProtectionOption:z.passwordProtectionOption,albumPassword:z.albumPassword})),x(!0))},xe=()=>{u(null),x(!0)},$e=(b,z)=>{b!==void 0&&z!==void 0&&(h?d(H=>H.map(B=>B.id===h?{...B,passwordProtectionOption:b,albumPassword:z}:B)):k(H=>({...H,passwordProtectionOption:b,albumPassword:z}))),x(!1),u(null)},ke=()=>{d(b=>b.map(z=>({...z,isOnPublicProfile:X.isOnPublicProfile,participantsCanAddItems:X.participantsCanAddItems,participantsCanDeleteItems:X.participantsCanDeleteItems,passwordProtectionOption:X.passwordProtectionOption,albumPassword:X.albumPassword}))),l(!1),T("Applied global settings to all albums",X)},Pe=b=>{const z=a.find(B=>B.id===b);if(z&&!confirm(t('Are you sure you want to remove the album "{{albumName}}"?',{albumName:z.name})))return;const H=a.filter(B=>B.id!==b);d(H),H.length===0&&(localStorage.removeItem(de.MULTI_ALBUM_DATA),qe(),Fe("my-albums.html"))},le=a.some(b=>b.isSaving)||W,De=a.some(b=>b.savingProgress<100);return e.jsxs(e.Fragment,{children:[e.jsx(kt,{}),e.jsx("style",{children:`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}),e.jsx(Dt,{children:e.jsxs(Ft,{children:[e.jsx(Et,{href:"my-albums.html",children:t("Back to Albums")}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx(ei,{children:t("Columns:")}),e.jsxs(ti,{value:g,onChange:b=>N(b.target.value),disabled:le,children:[e.jsx("option",{value:"1",children:"1"}),e.jsx("option",{value:"2",children:"2"}),e.jsx("option",{value:"3",children:"3"}),e.jsx("option",{value:"4",children:"4"}),e.jsx("option",{value:"5",children:"5"})]})]}),e.jsxs("div",{style:{position:"relative"},children:[e.jsx(ss,{onClick:()=>l(!o),disabled:le,title:t("Global Settings for All Albums")}),e.jsx(ki,{showGlobalGear:o,globalSettings:X,setGlobalSettings:k,onPasswordClick:xe,onApplySettings:ke})]}),De&&e.jsx(Le,{$primary:!0,onClick:re,disabled:le,style:{minWidth:"160px",fontSize:"14px",padding:"8px 16px"},children:W?t("Saving {{current}} of {{total}}...",{current:A,total:ee}):a.length===1?t("Save 1 Album"):t("Save {{count}} Albums",{count:a.filter(b=>b.savingProgress<100).length})})]})]})}),e.jsxs(_t,{$isRTL:s,children:[W&&e.jsxs("div",{style:{marginBottom:"24px",padding:"20px",backgroundColor:"#e3f2fd",border:"2px solid #2196f3",borderRadius:"12px",boxShadow:"0 4px 12px rgba(33, 150, 243, 0.1)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"16px",marginBottom:"16px"},children:[e.jsx("div",{style:{width:"24px",height:"24px",border:"3px solid #e3f2fd",borderTop:"3px solid #2196f3",borderRadius:"50%",animation:"spin 1s linear infinite"}}),e.jsxs("div",{children:[e.jsxs("div",{style:{fontSize:"16px",fontWeight:"600",color:"#1565c0",marginBottom:"4px"},children:[t("Saving Albums")," (",A," / ",ee,")"]}),e.jsx("div",{style:{fontSize:"14px",color:"#1976d2"},children:t("Currently saving: {{albumName}}",{albumName:L})})]})]}),e.jsx("div",{style:{width:"100%",height:"8px",backgroundColor:"#bbdefb",borderRadius:"4px",overflow:"hidden"},children:e.jsx("div",{style:{width:`${A/ee*100}%`,height:"100%",backgroundColor:"#2196f3",transition:"width 0.3s ease",borderRadius:"4px"}})}),e.jsx("div",{style:{marginTop:"8px",fontSize:"12px",color:"#1976d2",textAlign:"center"},children:t("Please wait while your albums are being saved...")})]}),e.jsx(hr,{albums:a,setAlbums:d,isSavingAny:le,onSaveAlbum:se,onRemoveAlbum:Pe,onShowPasswordDialog:me,columns:g,setColumns:N,enhancedLog:T})]}),e.jsx(is,{isOpen:f,onClose:$e,initialOption:h?((Ie=a.find(b=>b.id===h))==null?void 0:Ie.passwordProtectionOption)||"NoPassword":X.passwordProtectionOption,initialPassword:h?((Ae=a.find(b=>b.id===h))==null?void 0:Ae.albumPassword)||"":X.albumPassword}),e.jsx(It,{t,language:i,usernameManager:J,onSuccess:ue})]})},br=()=>{const[t,i]=p.useState(!1),[s,a]=p.useState(!1);return p.useEffect(()=>{const g=new URLSearchParams(window.location.search).get("mode");i(g==="multiple"),a(!0)},[]),s?t?e.jsx(xr,{}):e.jsx(wt,{}):e.jsx(wt,{})},wr=()=>e.jsx(Os,{children:e.jsx(br,{})});zs.createRoot(document.getElementById("root")).render(e.jsx(wr,{}));
