import{h as he,f as Ce,a as f,L as ue,i as nt,s as As,k as Is,l as js,m as vt,n as ks,r as Ee,d as $,o as me,u as ce,j as e,g as Pe,p as Cs,R as Ds,I as Fs}from"./utils-DBhM6xd7.js";import{F as Es}from"./types-CyPfckSQ.js";import{u as _s,U as Ns}from"./UploadProgress-x6H6U2g3.js";import{u as Tt,U as St}from"./UsernamePrompt-D5MfhDQZ.js";import{L as Rs}from"./LazyImage-BZj5n6Lr.js";import{P as zs,S as Os,e as Ms,V as Bs,f as Us,g as $t,h as Pt,M as Gs,C as At,i as Ws,j as Ks,F as lt,k as dt,l as Hs,m as qs,G as It,n as jt,o as kt,p as Ct,B as Ze,q as Dt,r as Js,s as Qs,t as Vs}from"./styled-components-BLYKy1un.js";import{g as ct,c as He}from"./folderStructureUtils-BmdkosLC.js";const Ys=`
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
`,Xs=`
  mutation MyMutation($folderPositionInputs: [FolderPositionInput!]) {
    changeFiles(folderPositionInputs: $folderPositionInputs) {
      items {
        id
      }
    }
  }
`,Zs=`
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
`,Ls=`
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
`,ei=`
  mutation DeleteFileReferences($deletedFileReferenceIds: [ID!]!) {
    changeFiles(deletedFileReferenceIds: $deletedFileReferenceIds) {
      items {
        id
      }
    }
  }
`;class $e{static async fetchFolderDetails(r,s){var a,d,w,i,l,o,p,m,b;s(`Fetching details for folder ID: ${r}`);try{const u=await he();if(!u)return s("No token available for fetching folder details"),null;s("Sending GraphQL query to fetch folder details");const y=await(await fetch(Ce,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${u}`},body:JSON.stringify({query:Ys,variables:{folderIds:[r],fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(s("Folder details API response:",y),y.errors)return console.error("GraphQL errors:",y.errors),s(`GraphQL errors: ${JSON.stringify(y.errors)}`),null;const P=((d=(a=y==null?void 0:y.data)==null?void 0:a.fetchFolders)==null?void 0:d.items)||[];if(s(`Found ${P.length} folder items`),P.length===0)return s("No folder items found"),null;const D=P[0];s("Retrieved folder data:",D);const q=((i=(w=D.folderPosition)==null?void 0:w.profileIds)==null?void 0:i.some(S=>S.includes("Public____Profile")))||!1;s(`Folder is on public profile: ${q}`),s("Profile IDs:",(l=D.folderPosition)==null?void 0:l.profileIds);const V=(o=D.folderInviteParameters)==null?void 0:o.usingFolderInviteGrantsRightToAddItems;s(`Participants can add items: ${V}`);const ee=(p=D.folderInviteParameters)==null?void 0:p.usingFolderInviteGrantsRightToRemoveItems;return s(`Participants can delete items: ${ee}`),{creatorId:D.creatorId||"",folderName:D.folderName||"",folderDescription:D.folderDescription||"",passwordPolicy:((m=D.folderPassword)==null?void 0:m.policy)||"NoPassword",password:((b=D.folderPassword)==null?void 0:b.password)||"",isOnPublicProfile:q,participantsCanAddItems:V!==void 0?V:!0,participantsCanDeleteItems:ee!==void 0?ee:!1}}catch(u){return console.error("Error in fetchFolderDetails:",u),s(`Error in fetchFolderDetails: ${u}`),null}}static async saveFolderOnly(r,s){var w,i;s("Sending folder-only mutation (no file references, no folder tags)");const a=await he();if(!a)throw s("No token available for saving album, aborting"),new Error("Authentication token not available");const d={folderPositionInputs:[r]};s("GraphQL folder-only mutation variables:",d);try{s("Sending API request to save folder");const l=await fetch(Ce,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({query:Xs,variables:d})});s(`API response status: ${l.status}`);const o=await l.text();s(`API response raw text: ${o}`);const p=JSON.parse(o);if(s("API response JSON:",p),p.errors)throw console.error("Folder save failed:",p.errors),s("Folder save failed with errors:",p.errors),new Error("Failed to save folder");return s("Folder saved successfully"),((i=(w=p.data)==null?void 0:w.changeFiles)==null?void 0:i.items)||[]}catch(l){throw console.error("Error in saveFolderOnly:",l),s(`Error in saveFolderOnly: ${l}`),l}}static async saveFileReferences(r,s){var w,i,l,o,p;s(`Sending file references-only mutation with ${r.length} items (each with individual tags and filenames)`);const a=await he();if(!a)throw s("No token available for saving file references, aborting"),new Error("Authentication token not available");const d={updatedFileReferenceInputs:r};s("GraphQL file references-only mutation variables (first item):",r.length>0?r[0]:"No items");try{s("Sending API request to save file references with individual tags and filenames");const m=await fetch(Ce,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({query:Zs,variables:d})});s(`API response status: ${m.status}`);const b=await m.text();s(`API response raw text: ${b.substring(0,500)}...`);const u=JSON.parse(b);if(s("API response JSON items count:",((l=(i=(w=u.data)==null?void 0:w.changeFiles0)==null?void 0:i.items)==null?void 0:l.length)||0),u.errors)throw console.error("File references save failed:",u.errors),s("File references save failed with errors:",u.errors),new Error("Failed to save file references");return s("File references chunk saved successfully with individual photo tags and filenames"),((p=(o=u.data)==null?void 0:o.changeFiles0)==null?void 0:p.items)||[]}catch(m){throw console.error("Error in saveFileReferences:",m),s(`Error in saveFileReferences: ${m}`),m}}static async saveFinalChunkWithFolder(r,s,a){var i,l,o,p,m,b,u,n,y;a(`Sending final chunk with folder mutation (${r.length} file references with filenames, no folder tags)`);const d=await he();if(!d)throw a("No token available for saving final chunk, aborting"),new Error("Authentication token not available");const w={folderPositionInputs:[s],updatedFileReferenceInputs:r};a("GraphQL final mutation variables (folder + last chunk with filenames, no folder tags)");try{a("Sending API request for final save with folder (no folder tags, with filenames)");const P=await fetch(Ce,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${d}`},body:JSON.stringify({query:Ls,variables:w})});a(`API response status: ${P.status}`);const D=await P.text();a(`API response raw text: ${D.substring(0,500)}...`);const q=JSON.parse(D);if(a("API response JSON:",{fileReferencesCount:((o=(l=(i=q.data)==null?void 0:i.changeFiles0)==null?void 0:l.items)==null?void 0:o.length)||0,folderItems:((m=(p=q.data)==null?void 0:p.changeFiles)==null?void 0:m.items)||[]}),q.errors)throw console.error("Final save failed:",q.errors),a("Final save failed with errors:",q.errors),new Error("Failed to complete album save");return a("Final chunk and folder saved successfully (with individual photo tags and filenames)"),{fileReferences:((u=(b=q.data)==null?void 0:b.changeFiles0)==null?void 0:u.items)||[],folderPositions:((y=(n=q.data)==null?void 0:n.changeFiles)==null?void 0:y.items)||[]}}catch(P){throw console.error("Error in saveFinalChunkWithFolder:",P),a(`Error in saveFinalChunkWithFolder: ${P}`),P}}static async deleteFileReferences(r,s){var w,i;s(`Deleting ${r.length} file references: ${r.join(", ")}`);const a=await he();if(!a)throw s("No token available for deleting file references, aborting"),new Error("Authentication token not available");const d={deletedFileReferenceIds:r};s("GraphQL delete file references mutation variables:",d);try{s("Sending API request to delete file references");const l=await fetch(Ce,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({query:ei,variables:d})});s(`API response status: ${l.status}`);const o=await l.text();s(`API response raw text: ${o}`);const p=JSON.parse(o);if(s("API response JSON:",p),p.errors)throw console.error("File references deletion failed:",p.errors),s("File references deletion failed with errors:",p.errors),new Error("Failed to delete file references");return s(`Successfully deleted ${r.length} file references`),((i=(w=p.data)==null?void 0:w.changeFiles)==null?void 0:i.items)||[]}catch(l){throw console.error("Error in deleteFileReferences:",l),s(`Error in deleteFileReferences: ${l}`),l}}}const ti=(t,r,s,a,d,w,i,l,o,p,m,b,u,n)=>{const[y,P]=f.useState(null),[D,q]=f.useState(null),V=async K=>{n(`Initializing folder ID with username: ${K}`);try{const C=new URLSearchParams(window.location.search).get("folderId");if(n(`Folder ID from URL: ${C||"null"}`),C){t(C),n(`Using existing folder ID: ${C}`);try{n(`Fetching details for folder: ${C}`);const H=await $e.fetchFolderDetails(C,n);if(n("Folder details retrieved:",H),H){const F=`${K}_____${K}____Account`,X=H.creatorId===F;if(n(`User is creator of folder: ${X}, accountId: ${F}, creator: ${H.creatorId}`),s(X),X){n("User is creator, showing folder details"),a(!0),d(H.folderName),w(H.folderDescription),i(H.isOnPublicProfile),n(`Setting isOnPublicProfile: ${H.isOnPublicProfile}`),H.participantsCanAddItems!==void 0&&(l(H.participantsCanAddItems),n(`Setting participantsCanAddItems: ${H.participantsCanAddItems}`)),H.participantsCanDeleteItems!==void 0&&(u(H.participantsCanDeleteItems),n(`Setting participantsCanDeleteItems: ${H.participantsCanDeleteItems}`));const O=H.passwordPolicy;n(`Password policy from folder details: ${O}`),o(O),O!=="NoPassword"&&H.password&&p(H.password),n(`Set password protection option to: ${O}`)}else n("User is NOT the creator, hiding editable fields"),a(!1)}else n("No folder details retrieved, setting isCreator to true"),s(!0),a(!0)}catch(H){console.error("Error fetching folder details:",H),n(`Error fetching folder details: ${H}`),s(!1)}}else{const H=`${K}_____${nt()}____Folder`;n(`Creating new folder ID: ${H}`),t(H),n("Setting isCreator to true for new album"),s(!0),a(!0)}}catch(G){console.error("Folder ID initialization error:",G),n(`Folder ID initialization error: ${G}`),s(!1)}},ee=()=>{n("Attempting to restore photos from localStorage");try{const K=localStorage.getItem(ue.SELECTED_PHOTOS);if(n(`Found stored photos: ${K?"yes":"no"}`),K)try{const G=JSON.parse(K);n(`Parsed ${G.length} photos from localStorage`),Array.isArray(G)&&G.length>0&&(r(G),n(`Restored ${G.length} photos to state (including original filenames)`))}catch(G){console.error("Error parsing stored photos:",G),n(`Error parsing stored photos: ${G}`)}}catch(K){console.error("Error restoring photos from storage:",K),n(`Error restoring photos from storage: ${K}`)}},S=()=>{n("Testing S3 connection");try{As?n("S3 client is available"):(console.error("S3 client not available"),n("S3 client not available"))}catch(K){console.error("S3 connection test error:",K),n(`S3 connection test error: ${K}`)}},te=async()=>{var K;n("Starting component initialization");try{n("Checking login with refresh");const G=await he();if(!G){n("No token returned from login check, aborting initialization");return}try{const C=localStorage.getItem(ue.PUBLIC_USERNAME);n(`Retrieved public username from localStorage: ${C||"null"}`),q(C||null);const F=JSON.parse(atob(G.split(".")[1]))["cognito:username"];if(F){n(`Extracted Cognito username from token: ${F}`),P(F);const X=localStorage.getItem(ue.SUB_ALBUM_DATA);if(n(`Sub-album data from localStorage: ${X||"null"}`),X)try{const O=JSON.parse(X);if(n("Parsed sub-album data:",O),O.isSubAlbum&&((K=O.selectedFileIds)==null?void 0:K.length)>0){n(`Valid sub-album data found with ${O.selectedFileIds.length} files`),m(!0),b(O.selectedFileIds),O.selectedPhotos&&O.selectedPhotos.length>0&&(n(`Found ${O.selectedPhotos.length} selected photos in sub-album data`),r(O.selectedPhotos)),a(!0),s(!0);const J=`${F}_____${nt()}____Folder`;n(`Generated new folder ID for sub-album: ${J}`),t(J)}else n("Invalid sub-album data, proceeding with normal initialization"),await V(F)}catch(O){console.error("Error parsing sub-album data:",O),n(`Error parsing sub-album data: ${O}`),await V(F)}else n("No sub-album data found, proceeding with normal folder initialization"),await V(F)}else n("No Cognito username found in token")}catch(C){console.error("User data initialization error:",C),n(`User data initialization error: ${C}`)}ee(),S(),n("Component initialization completed")}catch(G){console.error("Initialization error:",G),n(`Initialization error: ${G}`)}};return f.useEffect(()=>{te()},[]),{cognitoUsername:y,publicUsername:D,setPublicUsername:q}},Ft=t=>t.map(r=>({TagType:r.TagType,tagTitle:r.tagTitle,subtags:r.subtags.map(s=>({TagType:r.TagType,tagTitle:s.tagTitle,subtagTitle:s.subtagTitle}))})),Et=t=>{const r=new Set;return t.filter(s=>r.has(s.fileId)?!1:(r.add(s.fileId),!0))},_t=(t,r)=>{const s=[];for(let a=0;a<t.length;a+=r)s.push(t.slice(a,a+r));return s},Nt=(t,r,s,a,d,w,i,l,o,p,m,b,u,n,y)=>{y("Creating folder position input WITHOUT folder-level tags"),y(`Profile visibility: ${w?"Public":"Only Me"}`);const P=w?[`${d}_____Public____Profile`]:["Only Me_____Only Me____Profile"];y(`Profile IDs: ${JSON.stringify(P)}`);let D=[];u&&n.length>0&&(y(`Creating file reference IDs for ${n.length} sub-album files`),D=n.map(S=>{const te=S.split("_____");if(te.length>=2){const G=te[1].split("____")[0],C=`${s}_____${G}____FileReference`;return y(`Created file reference ID for sub-album: ${C}`),C}return y(`Using original fileId as fallback: ${S}`),S})),y(`Created ${D.length} acceptedFileReferenceIds`);const q=o!=="NoPassword"?p:null;if(y(`Password protection: ${o}`),y(`Album password: ${q?"******":"null"}`),y(`Participants can add items: ${i}`),y(`Participants can delete items: ${l}`),!a)throw y("Error: folderId is null or undefined"),new Error("folderId is required to create folder position input");const V=Is(a),ee=js(V);return{currentTime:t,folderId:a,profileIds:P,folderPositionPoints:1,acceptedFileReferenceIds:D,folderInput:{folderAboutContactIds:[r],albumNanoId:ee,folderName:m,folderDescription:b,folderPasswordInput:{password:q,policy:o},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:i,usingFolderInviteGrantsRightToRemoveItems:l,addedItemsNeedFolderCreatorApproval:!1}}}},Rt=(t,r,s,a,d,w,i)=>(i(`Creating file reference inputs with individual photo tags and original filenames for ${t.length} photos`),t.map((l,o)=>{var y;const p=w.get(o)||[],m=Ft(p),b=l.originalFileName||l.fileName;if(i(`Photo ${o} (${l.fileName}): ${p.length} tags applied, display name: ${b}`),l.fileId)return i(`Using existing fileId for photo: ${l.fileId}`),{fileReferencesHolderId:a,currentTime:r,points:1,hasBeenDeleted:!1,selectedTagInputs:m,fileId:l.fileId,fileDisplayName:b,fileInput:null};const u=l.type==="video"||(y=l.type)!=null&&y.startsWith("video")?`Input/Video/${l.fileName}`:`Input/Image/${l.fileName}`,n=`${d}_____${l.fileName}____File`;return i(`Created file reference for ${l.fileName}:`),i(`  - dataKey: ${u}`),i(`  - fileId: ${n}`),i(`  - fileDisplayName: ${b}`),i(`  - thumbnailDataKey: ${l.thumbnailDataKey||"undefined"}`),i(`  - size: ${l.size}`),i(`  - thumbnailSize: ${l.thumbnailSize||0}`),i(`  - duration: ${l.duration||"undefined"}`),i(`  - tags: ${p.length} tags selected for this photo`),{fileReferencesHolderId:a,currentTime:r,points:1,hasBeenDeleted:!1,selectedTagInputs:m,fileId:n,fileDisplayName:b,fileInput:{fileId:n,ownerFileInput:{editorContactIds:[s],FileSharingOptionsEnum:"Anyone",dataKey:u,thumbnailDataKey:l.thumbnailDataKey,dataInBytes:l.size,thumbnailDataInBytes:l.thumbnailSize||0,s3UploadedAt:r,durationInSeconds:l.duration},editorFileInput:{aboutContactIds:[s],captionText:"",numericFilterInputs:[]}}}})),si=(t,r,s,a,d,w,i)=>{const l=[];return d.forEach(o=>{const p=w.get(o)||[];if(p.length>0){const m=a[o];if(m){const b=m.dataKey.split("/"),u=b[b.length-1],n=`${s}_____${u}____File`,y=m.fileName||u,P=Ft(p);i(`Creating file reference for existing file ${o} (${u}) with ${p.length} tags, display name: ${y}`),l.push({fileReferencesHolderId:r,currentTime:t,points:1,hasBeenDeleted:!1,selectedTagInputs:P,fileId:n,fileDisplayName:y,fileInput:null})}}}),i(`Created ${l.length} file references for existing files with tags and filenames`),l},ii=(t,r,s,a,d,w,i,l,o,p,m,b,u,n,y,P,D,q,V,ee,S,te)=>{const K=O=>{S(`Save progress text: ${O}`);const J=document.getElementById("saveProgressText");J&&(J.innerText=O)},G=O=>{const J=document.getElementById("saveProgress");J?(J.style.width=`${O}%`,S(`Updated save progress bar: ${O}%`)):S("Progress bar element not found"),q(O)},C=()=>(S("Validating required data"),r?t?(S("All required data validated successfully"),!0):(S("No folder ID, validation failed"),!1):(S("No Cognito username, validation failed"),!1)),H=()=>{S("Handling successful save"),ks(V,ee,[ue.SELECTED_PHOTOS,ue.SUB_ALBUM_DATA],S),S("Album data cleared"),K(te("Album saved successfully!")),sessionStorage.setItem("album_just_saved","true"),S("Set 'album_just_saved' flag in sessionStorage"),S("Setting timeout for redirect to my-albums.html"),setTimeout(()=>{S("Redirecting to my-albums.html"),Ee("my-albums.html")},1e3)},F=async(O,J)=>{S("Starting chunked save process (individual photo tags with filenames, no folder tags, including existing files with tags)");try{K(te("Processing files in chunks..."));const I=48;if(J.length===0)S("No file references to process, saving only folder position (no folder tags)"),await $e.saveFolderOnly(O,S);else{const E=Et(J);S(`After removing duplicates, processing ${E.length} unique file references`);const Q=_t(E,I);S(`Split file references into ${Q.length} chunks of max size ${I}`);for(let Y=0;Y<Q.length;Y++){const ne=Q[Y];S(`Processing chunk ${Y+1} of ${Q.length} with ${ne.length} file references`);const ie=Y/Q.length*80;q(10+ie),G(10+ie),Y<Q.length-1?(K(te("Saving files: chunk {{chunkNumber}} of {{totalChunks}}...",{chunkNumber:Y+1,totalChunks:Q.length})),await $e.saveFileReferences(ne,S)):(K(te("Finalizing album...")),await $e.saveFinalChunkWithFolder(ne,O,S))}}q(100),G(100),K(te("Album saved successfully!")),H()}catch(I){console.error("Error in chunked save process:",I),S(`Error in chunked save process: ${I}`),K(te("Error: {{error}}",{error:String(I)})),D(!1)}};return{saveAlbumDirectly:async()=>{S("Starting direct album save with individual photo tagging, existing file tagging, and original filenames"),S(`Photo tags map: ${u.size} photos have tags applied`),S(`Existing file tags map: ${n.size} existing files have tags applied`),D(!0),q(5);try{if(S("Validating required data for save"),!C()){S("Required data validation failed, aborting save"),D(!1);return}const O=Math.floor(Date.now()/1e3),J=`${r}_____${r}____Account`,E=t.split("_____")[1].split("____")[0];S(`Save timestamp: ${O}`),S(`Account ID: ${J}`),S(`Folder ID: ${t}`),S(`Folder target item identifier: ${E}`),S("Creating folder position input (no folder tags)");const Q=Nt(O,J,E,t,r,l,o,p,m,b,w,i,a,d,S);S("Folder position input created:",Q);let Y=[];const ne=s.filter(re=>re.status==="complete");if(S(`Found ${ne.length} valid photos with 'complete' status`),ne.length>0){const re=ne.filter(ve=>!ve.fileId);S(`Found ${re.length} new uploads to move from temp to public folder`),re.length>0&&(S("Moving files from temp to public folder"),await vt(re,G,S)),S("Creating file reference inputs for uploads with individual photo tags and original filenames");const pe=Rt(ne,O,J,t,r,u,S);S(`Created ${pe.length} file reference inputs for uploads`,pe),Y=Y.concat(pe)}const ie=si(O,t,r,y,P,n,S);if(ie.length>0&&(S(`Adding ${ie.length} existing file references with tags and filenames`),Y=Y.concat(ie)),a&&d.length>0){S(`Adding ${d.length} existing file references for sub-album`);const re=d.map(pe=>{S(`Creating file reference for existing sub-album file ID: ${pe}`);const ve=[],xe=pe.split("_____"),de=xe.length>=2?xe[1].split("____")[0]:pe;return{fileReferencesHolderId:t,currentTime:O,points:1,hasBeenDeleted:!1,selectedTagInputs:ve,fileId:pe,fileDisplayName:de,fileInput:null}});S(`Created ${re.length} file reference inputs for sub-album files`,re),Y=Y.concat(re)}S(`Total file reference inputs: ${Y.length}`),S("Sending GraphQL mutations with chunked file references (individual photo tags, existing file tags, and original filenames)"),await F(Q,Y)}catch(O){console.error("Error in saveAlbumDirectly:",O),S(`Error in saveAlbumDirectly: ${O}`),D(!1)}}}},ri=`
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
`,ai=`
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
`,oi=`
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
`,ni=`
  mutation DeleteTag($tagId: String!) {
    deleteTag(tagId: $tagId) {
      id
      hasBeenDeleted
    }
  }
`,li=`
  mutation DeleteSubtag($subtagId: String!) {
    deleteSubtag(subtagId: $subtagId) {
      id
      hasBeenDeleted
    }
  }
`,zt=(t,r,s,a,d,w,i)=>{const[l,o]=f.useState([]),[p,m]=f.useState(null),[b,u]=f.useState(!1),[n,y]=f.useState(null),[P,D]=f.useState(null),[q,V]=f.useState(!1),[ee,S]=f.useState(!1),[te,K]=f.useState(""),[G,C]=f.useState(""),[H,F]=f.useState(!1),[X,O]=f.useState(!1),J=f.useMemo(()=>({photoIndices:Array.from(d),existingIndices:Array.from(w)}),[d,w]),I=()=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(c){const g=Math.random()*16|0;return(c=="x"?g:g&3|8).toString(16)}),E=f.useCallback(()=>{const c=[];t.forEach(k=>{c.push(...k)}),s.forEach(k=>{c.push(...k)});const g=new Map;return c.forEach(k=>{if(g.has(k.tagTitle)){const N=g.get(k.tagTitle),A=[...N.subtags,...k.subtags],v=Array.from(new Map(A.map(h=>[h.subtagTitle,h])).values());g.set(k.tagTitle,{...N,subtags:v})}else g.set(k.tagTitle,k)}),Array.from(g.values())},[t,s]),Q=f.useCallback((c,g)=>{const k=[],N=Math.floor(Date.now()/1e3);return g.forEach(A=>{const v=c.find(h=>h.tagTitle===A.tagTitle);if(v){const h=[];if(A.subtags.forEach(U=>{var R;if(!((R=v.subtags)==null?void 0:R.find(Z=>Z.subtagTitle===U.subtagTitle))){const Z={id:I(),tagTitle:U.tagTitle,subtagTitle:U.subtagTitle,TagType:A.TagType||"File",points:1,createdAt:N,updatedAt:N,isCreatedFromApplied:!0};h.push(Z),i(`Created missing subtag from applied tags: ${U.subtagTitle} for tag ${U.tagTitle}`)}}),h.length>0){const U=c.findIndex(M=>M.id===v.id);U!==-1&&(c[U]={...v,subtags:[...v.subtags||[],...h]})}}else{const h={id:I(),tagTitle:A.tagTitle,TagType:A.TagType||"File",points:1,createdAt:N,updatedAt:N,subtags:[],isCreatedFromApplied:!0};A.subtags&&A.subtags.length>0&&(h.subtags=A.subtags.map(U=>({id:I(),tagTitle:U.tagTitle,subtagTitle:U.subtagTitle,TagType:A.TagType||"File",points:1,createdAt:N,updatedAt:N,isCreatedFromApplied:!0}))),k.push(h),i(`Created missing tag from applied tags: ${A.tagTitle} with ${A.subtags.length} subtags`)}}),k},[I,i]),Y=f.useCallback(c=>{const{photoIndices:g,existingIndices:k}=J;if(g.length===0&&k.length===0)return!1;const N=g.length===0||g.every(h=>(t.get(h)||[]).some(M=>M.tagTitle===c.tagTitle)),A=k.length===0||k.every(h=>(s.get(h)||[]).some(M=>M.tagTitle===c.tagTitle)),v=N&&A;return(g.length>0||k.length>0)&&i(`Tag "${c.tagTitle}" applied to all selected? ${v} (photos: ${N}, existing: ${A})`),v},[J,t,s,i]),ne=f.useCallback(c=>{const{photoIndices:g,existingIndices:k}=J;let N=0,A=0;g.forEach(R=>{const ae=(t.get(R)||[]).find(we=>we.tagTitle===c.tagTitle);ae&&(N++,ae.subtags.some(we=>we.subtagTitle===c.subtagTitle)&&A++)});let v=0,h=0;k.forEach(R=>{const ae=(s.get(R)||[]).find(we=>we.tagTitle===c.tagTitle);ae&&(v++,ae.subtags.some(we=>we.subtagTitle===c.subtagTitle)&&h++)});const U=N+v,M=A+h;return U>0&&M===U},[J,t,s]),ie=f.useCallback(c=>{const{photoIndices:g,existingIndices:k}=J;if(g.length===0&&k.length===0){i("No files selected for tag application");return}const N=Y(c);i(`${N?"Removing":"Applying"} tag "${c.tagTitle}" ${N?"from":"to"} all selected files`),g.length>0&&r(A=>{const v=new Map(A);return g.forEach(h=>{const U=v.get(h)||[];if(N){const M=U.filter(R=>R.tagTitle!==c.tagTitle);v.set(h,M),i(`Removed tag "${c.tagTitle}" from photo ${h}`)}else if(!U.some(R=>R.tagTitle===c.tagTitle)){const R={tagTitle:c.tagTitle,TagType:c.TagType,subtags:[]};v.set(h,[...U,R]),i(`Added tag "${c.tagTitle}" to photo ${h}`)}}),v}),k.length>0&&a(A=>{const v=new Map(A);return k.forEach(h=>{const U=v.get(h)||[];if(N){const M=U.filter(R=>R.tagTitle!==c.tagTitle);v.set(h,M),i(`Removed tag "${c.tagTitle}" from existing file ${h}`)}else if(!U.some(R=>R.tagTitle===c.tagTitle)){const R={tagTitle:c.tagTitle,TagType:c.TagType,subtags:[]};v.set(h,[...U,R]),i(`Added tag "${c.tagTitle}" to existing file ${h}`)}}),v})},[J,Y,r,a,i]),re=f.useCallback(c=>{const{photoIndices:g,existingIndices:k}=J;if(g.length===0&&k.length===0){i("No files selected for subtag application");return}const N=ne(c);i(`${N?"Removing":"Applying"} subtag "${c.subtagTitle}" ${N?"from":"to"} all selected files with parent tag`),g.length>0&&r(A=>{const v=new Map(A);return g.forEach(h=>{const M=(v.get(h)||[]).map(R=>{if(R.tagTitle===c.tagTitle){if(N)return{...R,subtags:R.subtags.filter(Z=>Z.subtagTitle!==c.subtagTitle)};if(!R.subtags.some(ae=>ae.subtagTitle===c.subtagTitle))return{...R,subtags:[...R.subtags,{tagTitle:c.tagTitle,subtagTitle:c.subtagTitle}]}}return R});v.set(h,M)}),v}),k.length>0&&a(A=>{const v=new Map(A);return k.forEach(h=>{const M=(v.get(h)||[]).map(R=>{if(R.tagTitle===c.tagTitle){if(N)return{...R,subtags:R.subtags.filter(Z=>Z.subtagTitle!==c.subtagTitle)};if(!R.subtags.some(ae=>ae.subtagTitle===c.subtagTitle))return{...R,subtags:[...R.subtags,{tagTitle:c.tagTitle,subtagTitle:c.subtagTitle}]}}return R});v.set(h,M)}),v})},[J,ne,r,a,i]),pe=f.useCallback(()=>{const{photoIndices:c,existingIndices:g}=J,k=[];c.forEach(v=>{const h=t.get(v)||[];k.push(...h)}),g.forEach(v=>{const h=s.get(v)||[];k.push(...h)});const N=new Map;k.forEach(v=>{if(N.has(v.tagTitle)){const h=N.get(v.tagTitle),U=[...h.subtags,...v.subtags],M=Array.from(new Map(U.map(R=>[R.subtagTitle,R])).values());N.set(v.tagTitle,{...h,subtags:M})}else N.set(v.tagTitle,v)});const A=Array.from(N.values());return i(`getAppliedTagsForSelected: ${A.length} unique tags from ${c.length} photos + ${g.length} existing files`),A},[J,t,s,i]),ve=f.useCallback(()=>d.size>0||w.size>0,[d.size,w.size]),xe=async()=>{var c,g;i("Fetching tags from API and checking for missing applied tags"),u(!0);try{const k=await he();if(!k){i("No token available for fetching tags");return}const A=await(await fetch(Ce,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${k}`},body:JSON.stringify({query:ri,variables:{fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(i("Tags API response:",A),A.errors){console.error("GraphQL errors:",A.errors),i(`GraphQL errors: ${JSON.stringify(A.errors)}`);return}let h=(((g=(c=A==null?void 0:A.data)==null?void 0:c.fetchRelations)==null?void 0:g.items)||[]).map(M=>{var R,Z;return{id:M.id,tagTitle:M.tagTitle,TagType:M.TagType,points:M.points,createdAt:M.createdAt,updatedAt:M.updatedAt,subtags:((Z=(R=M.subtags)==null?void 0:R.items)==null?void 0:Z.map(ae=>({id:ae.id,tagTitle:ae.tagTitle,subtagTitle:ae.subtagTitle,TagType:ae.TagType,points:ae.points,createdAt:ae.createdAt,updatedAt:ae.updatedAt})))||[]}});i(`Fetched ${h.length} tags from API`);const U=E();if(i(`Found ${U.length} unique applied tags in file maps`),U.length>0){const M=Q(h,U);M.length>0&&(i(`Created ${M.length} missing tags from applied tags`),h=[...M,...h])}i(`Final tags list: ${h.length} tags (including ${h.filter(M=>M.isCreatedFromApplied).length} created from applied tags)`),o(h)}catch(k){console.error("Error fetching tags:",k),i(`Error fetching tags: ${k}`)}finally{u(!1)}},de=f.useCallback(c=>{i(`Setting displayed tag: ${c}`),m(c)},[i]),De=f.useCallback(()=>{if(!p)return[];const c=l.find(g=>g.id===p);return(c==null?void 0:c.subtags)||[]},[p,l]),Ae=async(c,g)=>{if(i(`Adding new tag: ${c} of type: ${g}`),!c.trim())return i("Cannot add tag with empty title"),!1;F(!0);try{if(!await he())return i("No token available for adding tag"),!1;if(await(async()=>(i("PLACEHOLDER: Would send GraphQL mutation to add tag",{mutation:ai,variables:{tagInput:{tagTitle:c.trim(),TagType:g,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(v=>setTimeout(v,500)),!0))()){const v={id:I(),tagTitle:c.trim(),TagType:g,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3),subtags:[]};return o(h=>[v,...h]),ie(v),de(v.id),K(""),V(!1),i(`Successfully added and applied new tag: ${c}`),!0}return!1}catch(k){return console.error("Error adding new tag:",k),i(`Error adding new tag: ${k}`),!1}finally{F(!1)}},be=async(c,g,k)=>{if(i(`Adding new subtag: ${g} to tag: ${c}`),!g.trim())return i("Cannot add subtag with empty title"),!1;if(!p)return i("No displayed tag for adding subtag"),!1;O(!0);try{if(!await he())return i("No token available for adding subtag"),!1;if(await(async()=>(i("PLACEHOLDER: Would send GraphQL mutation to add subtag",{mutation:oi,variables:{subtagInput:{tagTitle:c,subtagTitle:g.trim(),TagType:k,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(h=>setTimeout(h,500)),!0))()){const h={id:I(),tagTitle:c,subtagTitle:g.trim(),TagType:k,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3)};return o(U=>U.map(M=>M.id===p?{...M,subtags:[h,...M.subtags||[]]}:M)),re(h),C(""),S(!1),i(`Successfully added and applied new subtag: ${g}`),!0}return!1}catch(N){return console.error("Error adding new subtag:",N),i(`Error adding new subtag: ${N}`),!1}finally{O(!1)}},Fe=async c=>{i(`Deleting tag: ${c}`),y(c);try{if(!await he())return i("No token available for deleting tag"),!1;if(await(async()=>(i("PLACEHOLDER: Would send GraphQL mutation to delete tag",{mutation:ni,variables:{tagId:c}}),await new Promise(A=>setTimeout(A,500)),!0))()){const A=l.find(v=>v.id===c);return o(v=>v.filter(h=>h.id!==c)),A&&(r(v=>{const h=new Map(v);return v.forEach((U,M)=>{const R=U.filter(Z=>Z.tagTitle!==A.tagTitle);h.set(M,R)}),h}),a(v=>{const h=new Map(v);return v.forEach((U,M)=>{const R=U.filter(Z=>Z.tagTitle!==A.tagTitle);h.set(M,R)}),h})),p===c&&de(null),i(`Successfully deleted tag: ${c}`),!0}return!1}catch(g){return console.error("Error deleting tag:",g),i(`Error deleting tag: ${g}`),!1}finally{y(null)}},Ie=async c=>{i(`Deleting subtag: ${c}`),D(c);try{if(!await he())return i("No token available for deleting subtag"),!1;if(await(async()=>(i("PLACEHOLDER: Would send GraphQL mutation to delete subtag",{mutation:li,variables:{subtagId:c}}),await new Promise(A=>setTimeout(A,500)),!0))()){let A=null;return o(v=>v.map(h=>{var M;const U=((M=h.subtags)==null?void 0:M.filter(R=>R.id===c?(A=R,!1):!0))||[];return{...h,subtags:U}})),A&&(r(v=>{const h=new Map(v);return v.forEach((U,M)=>{const R=U.map(Z=>Z.tagTitle===A.tagTitle?{...Z,subtags:Z.subtags.filter(ae=>ae.subtagTitle!==A.subtagTitle)}:Z);h.set(M,R)}),h}),a(v=>{const h=new Map(v);return v.forEach((U,M)=>{const R=U.map(Z=>Z.tagTitle===A.tagTitle?{...Z,subtags:Z.subtags.filter(ae=>ae.subtagTitle!==A.subtagTitle)}:Z);h.set(M,R)}),h})),i(`Successfully deleted subtag: ${c}`),!0}return!1}catch(g){return console.error("Error deleting subtag:",g),i(`Error deleting subtag: ${g}`),!1}finally{D(null)}},je=()=>{V(!0),K("")},x=()=>{V(!1),K("")},_=()=>{S(!0),C("")},B=()=>{S(!1),C("")},W=async()=>te.trim()?await Ae(te,"File"):!1,se=async()=>{if(G.trim()&&p){const c=l.find(g=>g.id===p);if(c)return await be(c.tagTitle,G,c.TagType)}return!1};return f.useEffect(()=>{xe()},[]),f.useEffect(()=>{const c=E();if(c.length>0&&l.length>0){const g=c.filter(k=>!l.some(N=>N.tagTitle===k.tagTitle));g.length>0&&(i(`Detected ${g.length} new applied tags, refreshing tags list`,g.map(k=>k.tagTitle)),xe())}},[t,s,E,l,i]),f.useEffect(()=>{if(i(`Selection changed - Photos: ${d.size}, Existing: ${w.size}`),p){const c=l.find(g=>g.id===p);c&&!Y(c)&&(i(`Clearing displayed tag "${c.tagTitle}" because it's no longer applied to all selected files`),m(null))}},[d.size,w.size,p,l,Y,i]),f.useEffect(()=>{if(p){const c=l.find(g=>g.id===p);c&&!Y(c)&&(i(`Clearing displayed tag "${c.tagTitle}" due to tag map changes`),m(null))}},[t,s,p,l,Y,i]),{tags:l,displayedTagId:p,isLoadingTags:b,tagIdBeingDeleted:n,subtagIdBeingDeleted:P,isAddingNewTag:q,isAddingNewSubtag:ee,newTagTitle:te,newSubtagTitle:G,isSubmittingNewTag:H,isSubmittingNewSubtag:X,fetchTags:xe,toggleTagOnSelectedFiles:ie,toggleSubtagOnSelectedFiles:re,setDisplayedTag:de,isTagAppliedToSelected:Y,isSubtagAppliedToSelected:ne,getDisplayedTagSubtags:De,getAppliedTagsForSelected:pe,hasSelectedFiles:ve,addNewTag:Ae,addNewSubtag:be,deleteTag:Fe,deleteSubtag:Ie,startAddingNewTag:je,cancelAddingNewTag:x,startAddingNewSubtag:_,cancelAddingNewSubtag:B,submitNewTag:W,submitNewSubtag:se,setNewTagTitle:K,setNewSubtagTitle:C,extractAllAppliedTags:E,createMissingAppliedTags:Q}},di=$.div`
  margin: 32px 0;
`,Ot=$.div`
  margin-bottom: 24px;
`,Mt=$.h3`
  margin: 0 0 16px 0;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  display: flex;
  align-items: center;
  gap: 12px;
`,Bt=$.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  min-height: 32px;
`,Ut=$.button`
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
`,ci=$(Ut)`
  font-size: 12px;
  padding: 6px 12px;
  border-radius: 16px;
`,Gt=$.button`
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
`,ui=$.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 16px;
`,Wt=$.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 16px;
`,Kt=$.button`
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
`,pi=$.div`
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
`,fi=$.input`
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
`,ut=$.button`
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
`,gi=me.memo(({tag:t,isApplied:r,isDisplayed:s,isBeingDeleted:a,disabled:d,onTagClick:w,onDeleteTag:i,getTagDisplayText:l})=>{const{t:o}=ce(),[p,m]=f.useState(!1),[b,u]=f.useState(!1);f.useEffect(()=>{const y=()=>{u("ontouchstart"in window||navigator.maxTouchPoints>0)};return y(),window.addEventListener("resize",y),()=>window.removeEventListener("resize",y)},[]);const n=b?s&&!d&&!a:p&&s&&!d&&!a;return e.jsxs(Ut,{$isApplied:r,$isDisplayed:s,$isBeingDeleted:a,disabled:d,onClick:()=>w(t),onMouseEnter:()=>!b&&s&&m(!0),onMouseLeave:()=>!b&&s&&m(!1),children:[e.jsx("span",{style:{paddingRight:n?"20px":"0"},children:l(t)}),n&&e.jsx(Gt,{$isMobile:b,onClick:y=>{y.stopPropagation(),i(t.id)},disabled:a,title:o("Delete tag"),children:"×"})]})}),hi=me.memo(({subtag:t,isApplied:r,isBeingDeleted:s,disabled:a,onSubtagClick:d,onDeleteSubtag:w})=>{const{t:i}=ce(),[l,o]=f.useState(!1),[p,m]=f.useState(!1);f.useEffect(()=>{const u=()=>{m("ontouchstart"in window||navigator.maxTouchPoints>0)};return u(),window.addEventListener("resize",u),()=>window.removeEventListener("resize",u)},[]);const b=p?r&&!a&&!s:l&&r&&!a&&!s;return e.jsxs(ci,{$isApplied:r,$isBeingDeleted:s,disabled:a,onClick:()=>d(t),onMouseEnter:()=>!p&&r&&o(!0),onMouseLeave:()=>!p&&r&&o(!1),children:[e.jsx("span",{style:{paddingRight:b?"20px":"0"},children:t.subtagTitle}),b&&e.jsx(Gt,{$isMobile:p,onClick:u=>{u.stopPropagation(),w(t.id)},disabled:s,title:i("Delete subtag"),children:"×"})]})}),Ht=({value:t,onChange:r,onSubmit:s,onCancel:a,isSubmitting:d,placeholder:w="Enter tag name..."})=>{const{t:i}=ce(),l=f.useRef(null);f.useEffect(()=>{l.current&&l.current.focus()},[]);const o=p=>{p.key==="Enter"?s():p.key==="Escape"&&a()};return e.jsxs(pi,{children:[e.jsx(fi,{ref:l,type:"text",value:t,onChange:p=>r(p.target.value),onKeyDown:o,placeholder:i(w),disabled:d}),e.jsx(ut,{onClick:s,disabled:!t.trim()||d,title:i("Add (Enter)"),children:d?"...":"✓"}),e.jsx(ut,{onClick:a,disabled:d,title:i("Cancel (Escape)"),children:"×"})]})},qt=me.memo(({tagsManager:t,disabled:r=!1,enhancedLog:s})=>{const{t:a}=ce(),{tags:d,displayedTagId:w,isLoadingTags:i,tagIdBeingDeleted:l,isAddingNewTag:o,newTagTitle:p,isSubmittingNewTag:m,toggleTagOnSelectedFiles:b,setDisplayedTag:u,isTagAppliedToSelected:n,deleteTag:y,startAddingNewTag:P,cancelAddingNewTag:D,submitNewTag:q,setNewTagTitle:V,getAppliedTagsForSelected:ee,hasSelectedFiles:S}=t;if(!S())return null;const te=me.useCallback(F=>{if(!n(F))return F.tagTitle;const J=ee().find(E=>E.tagTitle===F.tagTitle);if(!J||J.subtags.length===0)return F.tagTitle;const I=J.subtags.map(E=>E.subtagTitle).join(" || ");return a("{{tagTitle}}  |  {{subtags}}",{tagTitle:F.tagTitle,subtags:I})},[n,ee,a]);me.useEffect(()=>{const F=d.filter(O=>n(O)),X=ee();s(`TagsDisplay render - ${F.length} tags applied to all selected files`),s("Applied tags with subtags:",X)},[d,n,ee,s]);const K=F=>{if(r)return;const X=n(F);s(`Tag "${F.tagTitle}" clicked - current state: ${X?"applied to all":"not applied to all"}`),b(F),F.subtags&&F.subtags.length>0&&u(X?null:F.id),s(`After toggle - new state: ${X?"removed from all":"applied to all"}`)},G=async F=>{if(r)return;s(`Delete tag initiated: ${F}`);const X=await y(F);s(X?`Tag successfully deleted: ${F}`:`Failed to delete tag: ${F}`)},C=async()=>{await q()||s("Failed to submit new tag")},H=me.useMemo(()=>[...d].sort((F,X)=>F.points!==X.points?X.points-F.points:X.updatedAt-F.updatedAt),[d]);return e.jsxs(di,{children:[e.jsxs(Ot,{children:[e.jsx(Mt,{children:a("Apply tags to selected files")}),e.jsx(Bt,{children:i?e.jsx(ui,{children:a("Loading tags...")}):e.jsxs(e.Fragment,{children:[H.map(F=>{const X=n(F);return e.jsx(gi,{tag:F,isApplied:X,isDisplayed:w===F.id,isBeingDeleted:l===F.id,disabled:r,onTagClick:K,onDeleteTag:G,getTagDisplayText:te},F.id)}),o?e.jsx(Ht,{value:p,onChange:V,onSubmit:C,onCancel:D,isSubmitting:m,placeholder:a("Enter tag name...")}):e.jsx(Kt,{disabled:r,onClick:P,children:a("+ Add Tag")}),H.length===0&&!o&&e.jsx(Wt,{children:a("No tags available")})]})})]}),w&&e.jsx(mi,{tagsManager:t,disabled:r,enhancedLog:s}),e.jsx("div",{style:{marginTop:"24px",padding:"20px 24px",background:"linear-gradient(135deg, #e7f3ff 0%, #f0f8ff 100%)",borderRadius:"12px",fontSize:"13px",color:"#0c5aa6",border:"1px solid #b3d9ff",boxShadow:"0 4px 12px rgba(0, 123, 255, 0.08)"},children:e.jsxs("div",{style:{lineHeight:"2.2"},children:[e.jsxs("div",{style:{marginBottom:"8px"},children:[e.jsx("strong",{style:{color:"#28a745"},children:"🟢"}),"  ",a("Most recently clicked tag (showing subtags)")]}),e.jsxs("div",{style:{marginBottom:"8px"},children:[e.jsx("strong",{style:{color:"#333333"},children:"⚫"}),"  ",a("Applied to selected files")]}),e.jsxs("div",{children:[e.jsx("strong",{style:{color:"#6c757d"},children:"⚪"}),"  ",a("Available but not applied to all selected files")]})]})})]})}),mi=me.memo(({tagsManager:t,disabled:r=!1,enhancedLog:s})=>{var G;const{t:a}=ce(),{displayedTagId:d,subtagIdBeingDeleted:w,isAddingNewSubtag:i,newSubtagTitle:l,isSubmittingNewSubtag:o,toggleSubtagOnSelectedFiles:p,isSubtagAppliedToSelected:m,deleteSubtag:b,startAddingNewSubtag:u,cancelAddingNewSubtag:n,submitNewSubtag:y,setNewSubtagTitle:P,tags:D}=t,q=d?((G=D.find(C=>C.id===d))==null?void 0:G.subtags)||[]:[],V=D.find(C=>C.id===d),ee=C=>{r||(s(`Subtag "${C.subtagTitle}" clicked - current state: ${m(C)?"applied to all":"not applied to all"}`),p(C))},S=async C=>{if(r)return;s(`Delete subtag initiated: ${C}`);const H=await b(C);s(H?`Subtag successfully deleted: ${C}`:`Failed to delete subtag: ${C}`)},te=async()=>{await y()||s("Failed to submit new subtag")};if(!V)return null;const K=me.useMemo(()=>[...q].sort((C,H)=>C.points!==H.points?H.points-C.points:H.updatedAt-C.updatedAt),[q]);return e.jsxs(Ot,{children:[e.jsx(Mt,{children:a('Subtags for "{{tagTitle}}"',{tagTitle:V.tagTitle})}),e.jsxs(Bt,{children:[K.map(C=>e.jsx(hi,{subtag:C,isApplied:m(C),isBeingDeleted:w===C.id,disabled:r,onSubtagClick:ee,onDeleteSubtag:S},C.id)),i?e.jsx(Ht,{value:l,onChange:P,onSubmit:te,onCancel:n,isSubmitting:o,placeholder:a("Enter subtag name...")}):e.jsx(Kt,{disabled:r,onClick:u,children:a("+ Add Subtag")}),K.length===0&&!i&&e.jsx(Wt,{children:a("No subtags available")})]})]})}),xi=({photoTags:t,isSelected:r=!1,onToggleSelection:s,fileName:a,showFileName:d=!1})=>{const{t:w}=ce();me.useEffect(()=>{const m="photo-tagging-animations";if(!document.getElementById(m)){const b=document.createElement("style");b.id=m,b.textContent=`
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
      `,document.head.appendChild(b)}},[]);const l=(m=>m.length===0?"":m.map(b=>{if(b.subtags.length>0){const u=b.subtags.map(n=>n.subtagTitle).join(", ");return w("{{tagTitle}}: {{subtags}}",{tagTitle:b.tagTitle,subtags:u})}return b.tagTitle}).join(" • "))(t),o=t.length>0;return d&&a||o||r?e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"4px"},children:[d&&a&&e.jsx("div",{style:{fontSize:"11px",fontWeight:"600",color:"#333",padding:"4px 8px",backgroundColor:r?"#e3f2fd":"#f8f9fa",borderRadius:"4px",border:`1px solid ${r?"#90caf9":"#e9ecef"}`,textAlign:"center",wordBreak:"break-word",lineHeight:"1.2",transition:"all 0.2s ease"},children:a}),e.jsx("div",{style:{background:o?"linear-gradient(135deg, rgba(0, 123, 255, 0.95) 0%, rgba(0, 123, 255, 0.85) 100%)":"transparent",color:"white",padding:o?"8px 12px":"6px 12px",borderRadius:o?"8px":"6px",fontSize:o?"11px":"10px",cursor:s?"pointer":"default",backdropFilter:o?"blur(6px)":"none",boxShadow:o?"0 4px 12px rgba(0, 123, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)":"none",border:o?"1px solid rgba(255, 255, 255, 0.2)":"none",transition:"all 0.3s ease",lineHeight:"1.3",minHeight:o?"32px":"auto",display:"flex",alignItems:"center",wordBreak:"break-word"},onClick:s,onMouseEnter:m=>{o&&(m.currentTarget.style.transform="translateY(-1px)",m.currentTarget.style.boxShadow="0 6px 16px rgba(0, 123, 255, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3)")},onMouseLeave:m=>{o&&(m.currentTarget.style.transform="translateY(0)",m.currentTarget.style.boxShadow="0 4px 12px rgba(0, 123, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)")},children:o?e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",width:"100%",flexWrap:"wrap"},children:[e.jsx("span",{style:{fontSize:"12px",opacity:.9,flexShrink:0},children:"🏷️"}),e.jsx("span",{style:{fontWeight:"600",textShadow:"0 1px 2px rgba(0, 0, 0, 0.3)",flex:1},children:l})]}):e.jsx("div",{style:{opacity:1,fontStyle:"normal",textAlign:"center",width:"100%",fontSize:r?"11px":"10px",fontWeight:r?"600":"normal",background:r?"white":"transparent",color:r?"#007bff":"white",borderRadius:r?"6px":"0",padding:r?"8px 12px":"0",border:r?"1px solid #007bff":"none",boxShadow:r?"0 2px 8px rgba(0, 123, 255, 0.2)":"none",animation:r?"subtlePulse 2.5s infinite":"none"},children:r?e.jsxs("span",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"4px"},children:[e.jsx("span",{children:"👇"})," ",w("Scroll down to select tags")]}):e.jsx("span",{style:{opacity:.8,fontStyle:"italic"},children:w("No tags applied")})})})]}):null},pt={traditional:{padding:"20px",border:"2px dashed #007bff",borderRadius:"12px",backgroundColor:"#fff",boxShadow:"0 2px 8px rgba(0, 0, 0, 0.04)"},horizontal:{display:"flex",overflowX:"auto",gap:"16px",padding:"20px",border:"2px dashed #007bff",borderRadius:"12px",backgroundColor:"#fff",boxShadow:"0 2px 8px rgba(0, 0, 0, 0.04)",scrollbarWidth:"thin",scrollbarColor:"#007bff #f8f9fa",scrollBehavior:"smooth",WebkitOverflowScrolling:"touch"}},ft={traditional:{display:"flex",flexDirection:"column",gap:"8px",minWidth:"0"},horizontal:{display:"flex",flexDirection:"column",gap:"8px",minWidth:"180px",maxWidth:"180px",flexShrink:0}},Le=me.memo(({selectedPhotos:t,selectedPhotoIndices:r,isSavingAlbum:s,onRemovePhoto:a,onTogglePhotoSelection:d,photoTagsMap:w,columns:i="1",isMultipleAlbumMode:l=!1})=>{const{t:o}=ce(),p=f.useMemo(()=>{if(l&&i==="horizontal")return pt.horizontal;const u=parseInt(i,10),n=isNaN(u)||u<1?1:Math.min(u,5);return{...pt.traditional,display:"grid",gridTemplateColumns:`repeat(${n}, 1fr)`,gap:"16px"}},[l,i]),m=f.useMemo(()=>l&&i==="horizontal"?ft.horizontal:ft.traditional,[l,i]),b=f.useMemo(()=>l&&i==="horizontal"?"photo-card-horizontal":"photo-card-traditional",[l,i]);return t.length===0?null:e.jsx(e.Fragment,{children:e.jsx("div",{style:p,className:"photo-grid",children:t.map((u,n)=>{var D,q;const y=r.has(n),P=w.get(n)||[];return e.jsxs("div",{style:m,children:[e.jsxs(zs,{"data-selected":y?"true":"false",className:`${b} ${y?"selected":""}`,onClick:()=>d(n),children:[y&&!s&&e.jsx("button",{onClick:V=>{V.stopPropagation(),confirm(o("Are you sure you want to remove this photo?"))&&a(n)},className:"photo-delete-button",title:o("Remove photo"),children:"×"}),u.status!=="complete"&&e.jsx(Os,{$status:u.status,children:u.status==="error"?"✕":u.status==="uploading"?"↑":u.status==="processing"?"⚙️":"•"}),e.jsxs(Ms,{className:`media-preview ${y?"selected":""}`,children:[u.type==="video"||(D=u.type)!=null&&D.startsWith("video")?e.jsx(Bs,{src:u.s3PreviewUrl,controls:!0,className:"media-item"}):e.jsx(Us,{src:u.s3PreviewUrl,alt:u.fileName,className:"media-item"}),(u.status==="uploading"||u.status==="processing")&&e.jsx($t,{$bottom:"4px",$left:"4px",$right:"4px",$height:"4px",children:e.jsx(Pt,{$progress:u.progress,$status:u.status})})]}),e.jsxs("div",{className:"file-info-overlay",children:[(q=u.type)!=null&&q.startsWith("video")?o("Video"):o("Image"),u.size&&o(" • {{size}} MB",{size:(u.size/1024/1024).toFixed(1)}),u.duration&&o(" • {{duration}}s",{duration:u.duration})]}),l&&i==="horizontal"&&y&&e.jsx("div",{className:"selection-indicator",children:o("SELECTED")}),u.status==="error"&&u.errorMessage&&e.jsx(Gs,{$type:"error",children:o("Error: {{message}}",{message:u.errorMessage.length>40?u.errorMessage.substring(0,37)+"...":u.errorMessage})})]}),e.jsx("div",{className:`photo-info ${l&&i==="horizontal"?"horizontal":"traditional"}`,children:e.jsx(xi,{photoTags:P,isSelected:y,onToggleSelection:()=>d(n),fileName:u.originalFileName||u.fileName,showFileName:!0})})]},n)})})})});Le.displayName="PhotoHandler";const Jt=me.memo(({isSavingAlbum:t,savingProgress:r})=>{const{t:s}=ce();return t?e.jsxs(At,{children:[e.jsx(Ws,{children:s("Saving Album")}),e.jsx(Ks,{id:"saveProgressText",children:s("Moving files...")}),e.jsx($t,{children:e.jsx(Pt,{id:"saveProgress",$progress:r/100})})]}):null});Jt.displayName="SavingProgressComponent";const Qt=me.memo(({showFolderDetails:t,isCreator:r,folderName:s,setFolderName:a,folderDescription:d,setFolderDescription:w,isSavingAlbum:i})=>{const{t:l}=ce();return!t||r!==!0?null:e.jsxs(At,{children:[e.jsxs(lt,{children:[e.jsx(dt,{htmlFor:"folderName",children:l("Album Name")}),e.jsx(Hs,{id:"folderName",type:"text",value:s,onChange:o=>a(o.target.value),placeholder:l("e.g. Family Vacation in Kyoto"),disabled:i})]}),e.jsxs(lt,{children:[e.jsx(dt,{htmlFor:"folderDescription",children:l("Album Description")}),e.jsx(qs,{id:"folderDescription",value:d,onChange:o=>w(o.target.value),placeholder:l("e.g. what's special about this album"),rows:4,disabled:i})]})]})});Qt.displayName="FolderDetailsComponent";if(typeof document<"u"){const t=document.createElement("style");t.textContent=`
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
  `,document.head.querySelector("#photo-handler-styles")||(t.id="photo-handler-styles",document.head.appendChild(t))}const bi=({existingFiles:t,selectedExistingIndices:r,onToggleSelection:s,onSelectAll:a,onDeselectAll:d,onDeleteFile:w,disabled:i,isCreator:l,participantsCanDeleteItems:o,existingFileTagsMap:p,t:m,isRTL:b})=>(me.useEffect(()=>{const u="existing-files-animations";if(!document.getElementById(u)){const n=document.createElement("style");n.id=u,n.textContent=`
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
      `,document.head.appendChild(n)}},[]),t.length===0?null:e.jsxs("div",{style:{marginBottom:"32px",direction:b?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px",flexDirection:b?"row-reverse":"row"},children:[e.jsx("div",{children:e.jsx("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:m("Existing Files ({count})").replace("{count}",t.length.toString())})}),e.jsx("div",{style:{display:"flex",gap:"8px",flexDirection:b?"row-reverse":"row"},children:e.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:i?"#f8f9fa":"#fff",color:i?"#999":"#333",cursor:i?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:r.size>0?d:a,disabled:i,children:r.size>0?m("Done Tagging Selected"):m("Select All")})})]}),e.jsx("div",{className:"existing-files-grid",children:t.map((u,n)=>{const y=r.has(n),P=p.get(n)||[];return e.jsxs("div",{className:"existing-file-item",children:[e.jsxs("div",{className:`existing-file-card ${y?"selected":""}`,onClick:()=>!i&&s(n),children:[e.jsx(Rs,{thumbnailDataKey:u.thumbnailDataKey,dataKey:u.dataKey,alt:m("Existing file"),style:{width:"100%",height:"100%",objectFit:"cover"}}),y&&!i&&(l===!0||o)&&e.jsx("button",{onClick:D=>{D.stopPropagation(),confirm(m("Are you sure you want to remove this file?"))&&w(n)},className:"delete-button",title:m("Remove file"),children:"×"}),u.dataInBytes>0&&e.jsx("div",{className:"file-size",children:m("{size} MB").replace("{size}",(u.dataInBytes/(1024*1024)).toFixed(1))}),u.durationInSeconds&&e.jsx("div",{className:"file-duration",children:m("{minutes}:{seconds}").replace("{minutes}",Math.floor(u.durationInSeconds/60).toString()).replace("{seconds}",String(Math.floor(u.durationInSeconds%60)).padStart(2,"0"))})]}),e.jsxs("div",{className:"file-info",children:[u.fileName&&e.jsx("div",{className:`file-name ${y?"selected":""}`,children:u.fileName}),e.jsx("div",{className:"file-tags",children:P.length>0?e.jsx("div",{className:"tags-display",children:e.jsxs("div",{className:"tags-content",children:[e.jsx("span",{className:"tag-icon",children:"🏷️"}),e.jsx("span",{className:"tags-text",children:P.map(D=>{if(D.subtags.length>0){const q=D.subtags.map(V=>V.subtagTitle).join(", ");return m("{tagTitle}: {subtags}").replace("{tagTitle}",D.tagTitle).replace("{subtags}",q)}return D.tagTitle}).join(" • ")})]})}):y?e.jsx("div",{style:{background:"white",border:"1px solid #007bff",color:"#007bff",fontWeight:"600",fontSize:"11px",fontStyle:"normal",padding:"8px 12px",borderRadius:"6px",boxShadow:"0 2px 8px rgba(0, 123, 255, 0.2)",animation:"subtlePulse 2.5s infinite"},children:e.jsxs("span",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"4px"},children:[e.jsx("span",{children:"👇"})," ",m("Scroll down to select tags")]})}):null})]})]},`existing-${n}-${u.dataKey}`)})})]})),wi=({selectedPhotos:t,selectedPhotoIndices:r,onToggleSelection:s,onSelectAll:a,onDeselectAll:d,onRemovePhoto:w,onDeleteAll:i,disabled:l,photoTagsMap:o,columns:p,setColumns:m,t:b,isRTL:u})=>t.length===0?null:e.jsxs("div",{style:{marginBottom:"32px",direction:u?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"16px",flexDirection:u?"row-reverse":"row"},children:[e.jsx("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:b("New Files ({count})").replace("{count}",t.length.toString())}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:u?"flex-start":"flex-end",gap:"8px"},children:[e.jsxs("div",{style:{display:"flex",gap:"8px",flexDirection:u?"row-reverse":"row"},children:[e.jsx("button",{className:"control-button",onClick:r.size>0?d:a,disabled:l,children:r.size>0?b("Done Tagging Selected"):b("Select All")}),r.size===0&&e.jsx("button",{className:"control-button danger",onClick:i,disabled:l,children:b("Delete All")})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",flexDirection:u?"row-reverse":"row"},children:[e.jsx("label",{className:"columns-label",children:b("Columns:")}),e.jsxs("select",{value:p,onChange:n=>m(n.target.value),className:"columns-select",children:[e.jsx("option",{value:"1",children:"1"}),e.jsx("option",{value:"2",children:"2"}),e.jsx("option",{value:"3",children:"3"}),e.jsx("option",{value:"4",children:"4"}),e.jsx("option",{value:"5",children:"5"})]})]})]})]}),e.jsx(Le,{selectedPhotos:t,selectedPhotoIndices:r,isSavingAlbum:l,onRemovePhoto:w,onTogglePhotoSelection:s,onSelectAllPhotos:a,onDeselectAllPhotos:d,hideHeader:!0,photoTagsMap:o,columns:p})]}),yi=$.button`
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
`,Vt=$.div`
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
`,_e=$.div`
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,Yt=$.h4`
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
`,Ne=$.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 8px 0;
`,Re=$.div`
  font-size: 14px;
  color: #333;
  line-height: 1.4;
`,ze=$.label`
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
`,Oe=$.span`
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
`,Xt=$.button`
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
`,vi=$.button`
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
`,Ti=({showGlobalGear:t,globalSettings:r,setGlobalSettings:s,onPasswordClick:a,onApplySettings:d})=>{const{t:w,language:i}=ce(),l=Pe(i)==="rtl";return t?e.jsx(Vt,{$isRTL:l,children:e.jsxs(_e,{children:[e.jsx(Yt,{children:w("Apply to All Albums")}),e.jsxs(_e,{children:[e.jsxs(Ne,{children:[e.jsx(Re,{children:w("Public Profile")}),e.jsxs(ze,{children:[e.jsx("input",{type:"checkbox",checked:r.isOnPublicProfile,onChange:o=>s(p=>({...p,isOnPublicProfile:o.target.checked}))}),e.jsx(Oe,{})]})]}),e.jsxs(Ne,{children:[e.jsx(Re,{children:w("Participants Can Add Items")}),e.jsxs(ze,{children:[e.jsx("input",{type:"checkbox",checked:r.participantsCanAddItems,onChange:o=>s(p=>({...p,participantsCanAddItems:o.target.checked}))}),e.jsx(Oe,{})]})]}),e.jsxs(Ne,{children:[e.jsx(Re,{children:w("Participants Can Delete Items")}),e.jsxs(ze,{children:[e.jsx("input",{type:"checkbox",checked:r.participantsCanDeleteItems,onChange:o=>s(p=>({...p,participantsCanDeleteItems:o.target.checked}))}),e.jsx(Oe,{})]})]})]}),e.jsx(_e,{children:e.jsxs(Xt,{$hasAnyPassword:r.passwordProtectionOption!=="NoPassword"&&!!r.albumPassword,onClick:a,children:[r.passwordProtectionOption!=="NoPassword"&&r.albumPassword?"🔒":"🔓",r.passwordProtectionOption!=="NoPassword"&&r.albumPassword?w("Password Set"):w("Set Password for All")]})}),e.jsx(vi,{onClick:d,children:w("Apply to All Albums")})]})}):null},Si=({showGear:t,isOnPublicProfile:r,participantsCanAddItems:s,participantsCanDeleteItems:a,passwordProtectionOption:d,albumPassword:w,onTogglePublicProfile:i,onToggleParticipantsCanAdd:l,onToggleParticipantsCanDelete:o,onPasswordClick:p,disabled:m})=>{const{t:b,language:u}=ce(),n=Pe(u)==="rtl";return t?e.jsx(Vt,{$isRTL:n,children:e.jsxs(_e,{children:[e.jsx(Yt,{children:b("Album Settings")}),e.jsxs(_e,{children:[e.jsxs(Ne,{children:[e.jsx(Re,{children:b("Public Profile")}),e.jsxs(ze,{children:[e.jsx("input",{type:"checkbox",checked:r,onChange:i,disabled:m}),e.jsx(Oe,{})]})]}),e.jsxs(Ne,{children:[e.jsx(Re,{children:b("Participants Can Add Items")}),e.jsxs(ze,{children:[e.jsx("input",{type:"checkbox",checked:s,onChange:l,disabled:m}),e.jsx(Oe,{})]})]}),e.jsxs(Ne,{children:[e.jsx(Re,{children:b("Participants Can Delete Items")}),e.jsxs(ze,{children:[e.jsx("input",{type:"checkbox",checked:a,onChange:o,disabled:m}),e.jsx(Oe,{})]})]})]}),e.jsx(_e,{children:e.jsxs(Xt,{$hasAnyPassword:d!=="NoPassword"&&!!w,onClick:p,disabled:m,children:[d!=="NoPassword"&&w?"🔒":"🔓",b(d!=="NoPassword"&&w?"Password Set":"Set Password")]})})]})}):null},Zt=({onClick:t,disabled:r,title:s})=>e.jsx(yi,{onClick:t,disabled:r,title:s,children:"⚙️"}),j={colors:{primary:"#007bff",primaryDark:"#0056b3",secondary:"#6c757d",success:"#4caf50",danger:"#e53935",warning:"#ff9800",white:"#fff",text:{primary:"#333",secondary:"#666",light:"#777"},background:{primary:"#f9fafb",highlight:"#f0f7ff"},border:"#ddd"},spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px"},borderRadius:{small:"4px",medium:"8px"},boxShadow:{lg:"0 4px 10px rgba(0,0,0,0.08)"}},$i=$.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10000;
`,Pi=$.div`
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
`,Ai=$.div`
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
`,Ii=$.div`
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
`,ji=$.h3`
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
`,ki=$.p`
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
`,gt=$.div`
  margin-bottom: ${j.spacing.lg};
`,ht=$.label`
  display: block;
  margin-bottom: ${j.spacing.sm};
  font-size: 14px;
  font-weight: 500;
  color: ${j.colors.text.primary};
`,Ci=$.input`
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
`,Di=$.div`
  display: flex;
  flex-direction: column;
  gap: ${j.spacing.md};
  margin-bottom: ${j.spacing.xl};
`,Fi=$.div`
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
`,Ei=$.div`
  flex: 1;
`,_i=$.div`
  margin-bottom: ${j.spacing.xs};
`,Ni=$.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${j.colors.primary};
  flex-shrink: 0;
`,Ri=$.label`
  font-size: 16px;
  font-weight: 500;
  color: ${j.colors.text.primary};
  cursor: pointer;
  display: block;
`,zi=$.div`
  font-size: 14px;
  color: ${j.colors.text.secondary};
  margin-top: ${j.spacing.xs};
`,Oi=$.div`
  color: ${j.colors.warning};
  font-size: 12px;
  font-style: italic;
  margin-top: ${j.spacing.xs};
  font-weight: 500;
`,Mi=$.div`
  display: flex;
  gap: ${j.spacing.sm};
  justify-content: center;
  margin-top: ${j.spacing.xl};
`,mt=$.button`
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
`,Bi=$.div`
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
`,Ui=[{value:"NotVisible",titleKey:"Password Required To See Or Save",descriptionKey:"Album will be completely hidden until correct password is entered"},{value:"Watermark",titleKey:"Watermarked And No Saving Without Password",descriptionKey:"Photos will be visible with watermarks, password required to save"},{value:"CannotBeSaved",titleKey:"Password Required To Save",descriptionKey:"Photos are visible but password required to download or save"},{value:"NoPassword",titleKey:"No Password",descriptionKey:"Album is fully public with no restrictions"}],Lt=({isOpen:t,onClose:r,initialOption:s="NoPassword",initialPassword:a=""})=>{const{t:d,language:w}=ce(),i=Pe(w)==="rtl",[l,o]=f.useState(s),[p,m]=f.useState(a);if(f.useEffect(()=>{t&&(o(s),m(a))},[t,s,a]),!t)return null;const b=p.trim()==="",u=P=>{o(P)},n=P=>{P.target===P.currentTarget&&r()},y=P=>P!=="NoPassword";return e.jsxs(e.Fragment,{children:[e.jsx($i,{onClick:n}),e.jsx(Pi,{children:e.jsx(Ai,{children:e.jsxs(Ii,{$isRTL:i,children:[e.jsx(ji,{children:d("Album Password Policy")}),e.jsx(ki,{children:d("Configure password protection for your album. Choose how you want to restrict access to your photos.")}),e.jsxs(gt,{children:[e.jsx(ht,{children:d("Enter Password")}),e.jsx(Ci,{type:"text",placeholder:d("Enter password (optional)"),value:p,onChange:P=>m(P.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"})]}),e.jsxs(gt,{children:[e.jsx(ht,{children:d("Select Protection Level")}),e.jsx(Di,{children:Ui.map(P=>e.jsxs(Fi,{$isSelected:l===P.value,onClick:()=>u(P.value),children:[e.jsx(Ni,{type:"radio",name:"protection",checked:l===P.value,onChange:()=>u(P.value)}),e.jsxs(Ei,{children:[e.jsx(_i,{children:e.jsx(Ri,{children:d(P.titleKey)})}),e.jsx(zi,{children:d(P.descriptionKey)}),b&&y(P.value)&&l===P.value&&e.jsx(Oi,{children:d('⚠️ Will use "password" as default if left empty')})]})]},P.value))})]}),y(l)&&e.jsxs(Bi,{children:[e.jsx("strong",{children:d("💡 Password Protection Info:")}),e.jsx("br",{}),d('If you leave the password field empty, "password" will be used as the default password. You can change this anytime in album settings.')]}),e.jsxs(Mi,{children:[e.jsx(mt,{$variant:"secondary",onClick:()=>r(),children:d("Cancel")}),e.jsx(mt,{$variant:"primary",onClick:()=>{const P=b&&y(l)?"password":p;console.log(`Saving with option: ${l}, password: ${P.length>0?"********":"none"}`),r(l,P)},children:d("Save")})]})]})})})]})},Gi=({debugMessages:t,t:r,isRTL:s,textDirection:a})=>t.length===0?null:e.jsxs("div",{style:{marginTop:"40px",background:"#fff3cd",padding:"16px",borderRadius:"8px",border:"1px solid #ffeeba",maxWidth:900,margin:"0 auto",direction:a},children:[e.jsx("h3",{style:{marginTop:0,fontSize:"18px",color:"#856404",textAlign:s?"right":"left"},children:r("Debug Log")}),e.jsx("pre",{style:{fontSize:"14px",color:"#856404",whiteSpace:"pre-wrap",maxHeight:"400px",overflow:"auto",textAlign:s?"right":"left"},children:t.map((d,w)=>e.jsx("div",{style:{marginBottom:"8px"},children:d},w))})]}),Wi=()=>{const{t,language:r}=ce(),s=Pe(r)==="rtl",[a,d]=f.useState({selectedPhotoIndices:new Set,photoTagsMap:new Map,selectedExistingIndices:new Set,existingFileTagsMap:new Map}),w=Tt(t),{setShowUsernamePrompt:i,setUsernameInput:l}=w,[o,p]=f.useState(null),[m,b]=f.useState(!1),[u,n]=f.useState(0),[y,P]=f.useState(""),[D,q]=f.useState(""),[V,ee]=f.useState(!1),[S,te]=f.useState(!1),[K,G]=f.useState("NoPassword"),[C,H]=f.useState(""),[F,X]=f.useState(!1),[O,J]=f.useState(!0),[I,E]=f.useState(!1),[Q,Y]=f.useState(null),[ne,ie]=f.useState(!1),[re,pe]=f.useState([]),[ve,xe]=f.useState("2"),[de,De]=f.useState([]),[Ae,be]=f.useState(!1),[Fe,Ie]=f.useState(!1),[je,x]=f.useState(!1),_=f.useRef(null),B=(T,z)=>{const L=new Date().toISOString();console.log(`[${L}] ${T}`,z)};f.useEffect(()=>{const T=z=>{_.current&&!_.current.contains(z.target)&&x(!1)};return document.addEventListener("mousedown",T),()=>{document.removeEventListener("mousedown",T)}},[]);const se=_s(T=>{!o&&T&&p(T)},!0),{fileInputRef:c,selectedPhotos:g,setSelectedPhotos:k,isUploading:N,progressTracker:A,setProgressTracker:v,debugMessages:h,currentFolderId:U,openFilePicker:M,handleFileSelection:R,setOnSaveAlbumPage:Z}=se,ae=ti(p,k,Y,ee,P,q,X,J,G,H,ie,pe,E,B),{cognitoUsername:we,publicUsername:Ge,setPublicUsername:es}=ae,ts=zt(a.photoTagsMap,T=>{d(z=>({...z,photoTagsMap:typeof T=="function"?T(z.photoTagsMap):T}))},a.existingFileTagsMap,T=>{d(z=>({...z,existingFileTagsMap:typeof T=="function"?T(z.existingFileTagsMap):T}))},a.selectedPhotoIndices,a.selectedExistingIndices,B),ss=ii(o||U,we,g,ne,re,y,D,F,O,I,K,C,a.photoTagsMap,a.existingFileTagsMap,de,a.selectedExistingIndices,b,n,k,v,B,t),{saveAlbumDirectly:et}=ss;f.useEffect(()=>{const T=localStorage.getItem("save-album-columns")||"2";xe(T)},[]);const is=T=>{xe(T),localStorage.setItem("save-album-columns",T)};f.useEffect(()=>(Z(!0),()=>Z(!1)),[Z]),f.useEffect(()=>{(async()=>{try{await Cs()}catch(z){console.warn("Credential prewarming failed:",z)}})()},[]);const rs=async T=>{var z,L,oe;if(T){be(!0);try{const le=await he();if(!le)return;const ge=`
        mutation FetchRelations($fetchRelationsInput: FetchRelationsInput!) {
          fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
            items {
              ... on FolderPosition {
                ${Es}
              }
            }
          }
        }
      `,fe={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}},Be=await(await fetch(Ce,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${le}`},body:JSON.stringify({query:ge,variables:fe})})).json();if(Be.errors){console.error("GraphQL errors:",Be.errors);return}const tt=(((L=(z=Be==null?void 0:Be.data)==null?void 0:z.fetchRelations)==null?void 0:L.items)||[]).find(ye=>ye&&ye.folder&&ye.folder.id===T);if(!tt)return;const ke=tt.folder,$s=((oe=ke==null?void 0:ke.fileReferencesPage)==null?void 0:oe.items)||[],st=[],it=new Map;$s.forEach((ye,Ps)=>{const Se=ye.file;if(Se&&Se.dataKey){let We=ye.fileDisplayName;if(!We&&Se.dataKey){const Ue=Se.dataKey.split("/");We=Ue[Ue.length-1]}st.push({fileReferenceId:ye.id,dataKey:Se.dataKey,thumbnailDataKey:Se.thumbnailDataKey||null,durationInSeconds:Se.durationInSeconds||null,dataInBytes:Se.dataInBytes||0,fileName:We||void 0});const rt=ye.selectedTags||[];if(rt.length>0){const Ue=rt.map(Ke=>{var at;return{tagTitle:Ke.tagTitle,TagType:Ke.TagType,subtags:((at=Ke.subtags)==null?void 0:at.map(ot=>({tagTitle:ot.tagTitle,subtagTitle:ot.subtagTitle})))||[]}});it.set(Ps,Ue)}}}),De(st),d(ye=>({...ye,existingFileTagsMap:it})),!y&&ke.folderName&&P(ke.folderName),!D&&ke.folderDescription&&q(ke.folderDescription)}catch(le){console.error("Failed to fetch existing album data:",le)}finally{be(!1)}}};f.useEffect(()=>{const z=new URLSearchParams(window.location.search).get("folderId");z&&(p(z),ie(!1),localStorage.removeItem(ue.SUB_ALBUM_DATA),ee(!0),Y(!0))},[]),f.useEffect(()=>{o&&rs(o)},[o]),f.useEffect(()=>{U&&!o&&p(U)},[U,o]),f.useEffect(()=>{d(T=>{const z=new Set,L=new Map;return T.selectedPhotoIndices.forEach(oe=>{oe<g.length&&z.add(oe)}),T.photoTagsMap.forEach((oe,le)=>{le<g.length&&L.set(le,oe)}),{...T,selectedPhotoIndices:z,photoTagsMap:L}})},[g.length]),f.useEffect(()=>{d(T=>{const z=new Set,L=new Map;return T.selectedExistingIndices.forEach(oe=>{oe<de.length&&z.add(oe)}),T.existingFileTagsMap.forEach((oe,le)=>{le<de.length&&L.set(le,oe)}),{...T,selectedExistingIndices:z,existingFileTagsMap:L}})},[de.length]);const as=T=>{const z=g.filter((L,oe)=>oe!==T);k(z),z.length>0?localStorage.setItem(ue.SELECTED_PHOTOS,JSON.stringify(z)):localStorage.removeItem(ue.SELECTED_PHOTOS),d(L=>{const oe=new Set,le=new Map;return L.selectedPhotoIndices.forEach(ge=>{ge<T?oe.add(ge):ge>T&&oe.add(ge-1)}),L.photoTagsMap.forEach((ge,fe)=>{fe<T?le.set(fe,ge):fe>T&&le.set(fe-1,ge)}),{...L,selectedPhotoIndices:oe,photoTagsMap:le}})},os=async T=>{const z=de[T];if(!z){B(`No file found at index ${T}`);return}Ie(!0),B(`Starting deletion of file reference: ${z.fileReferenceId}`);try{await $e.deleteFileReferences([z.fileReferenceId],B),B(`Successfully deleted file reference: ${z.fileReferenceId}`);const L=de.filter((oe,le)=>le!==T);De(L),d(oe=>{const le=new Set,ge=new Map;return oe.selectedExistingIndices.forEach(fe=>{fe<T?le.add(fe):fe>T&&le.add(fe-1)}),oe.existingFileTagsMap.forEach((fe,Me)=>{Me<T?ge.set(Me,fe):Me>T&&ge.set(Me-1,fe)}),{...oe,selectedExistingIndices:le,existingFileTagsMap:ge}}),B(`File removed from local state, ${L.length} files remaining`)}catch(L){console.error("Failed to delete file reference:",L),B(`Failed to delete file reference: ${L}`),alert(t("Failed to delete file. Please try again."))}finally{Ie(!1)}},ns=T=>{d(z=>{const L=new Set(z.selectedExistingIndices);return L.has(T)?L.delete(T):L.add(T),{...z,selectedExistingIndices:L}})},ls=()=>{const T=new Set;for(let z=0;z<de.length;z++)T.add(z);d(z=>({...z,selectedExistingIndices:T}))},ds=()=>{d(T=>({...T,selectedExistingIndices:new Set}))},cs=T=>{d(z=>{const L=new Set(z.selectedPhotoIndices);return L.has(T)?L.delete(T):L.add(T),{...z,selectedPhotoIndices:L}})},us=()=>{const T=new Set;for(let z=0;z<g.length;z++)T.add(z);d(z=>({...z,selectedPhotoIndices:T}))},ps=()=>{d(T=>({...T,selectedPhotoIndices:new Set}))},fs=()=>{confirm(t("Are you sure you want to delete all new files? This action cannot be undone."))&&(k([]),d({selectedPhotoIndices:new Set,photoTagsMap:new Map,selectedExistingIndices:new Set,existingFileTagsMap:new Map}),localStorage.removeItem(ue.SELECTED_PHOTOS))},gs=async()=>{b(!0);try{if(Ge!=null&&Ge.startsWith("Profile-")){l(""),i(!0),b(!1);return}et()}catch(T){console.error("Error in handleSaveAlbumSingle:",T),b(!1)}},hs=T=>{localStorage.setItem(ue.PUBLIC_USERNAME,T),es(T),i(!1),et()},ms=(T,z)=>{T&&G(T),z!==void 0&&H(z),te(!1)},xs=()=>{te(!0)},bs=()=>{X(!F)},ws=()=>{J(!O)},ys=()=>{E(!I)},vs=()=>{M(o)},Te=m||N||Ae||Fe,Ts=g.length>0||de.length>0,Ss=a.selectedPhotoIndices.size>0||a.selectedExistingIndices.size>0;return e.jsxs(e.Fragment,{children:[e.jsx(It,{}),e.jsx(jt,{children:e.jsxs(kt,{children:[e.jsx(Ct,{href:"my-albums.html",children:t("Back to Albums")}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[V&&Q===!0&&e.jsxs("div",{ref:_,style:{position:"relative"},children:[e.jsx(Zt,{onClick:()=>x(!je),disabled:Te,title:t("Album Settings")}),e.jsx(Si,{showGear:je,isOnPublicProfile:F,participantsCanAddItems:O,participantsCanDeleteItems:I,passwordProtectionOption:K,albumPassword:C,onTogglePublicProfile:bs,onToggleParticipantsCanAdd:ws,onToggleParticipantsCanDelete:ys,onPasswordClick:xs,disabled:Te})]}),e.jsx(Ze,{$primary:!0,onClick:gs,disabled:Te,style:{minWidth:"120px",fontSize:"14px",padding:"8px 16px"},children:t(m?"Saving...":"Save Album")})]})]})}),e.jsxs(Dt,{$isRTL:s,children:[e.jsx("div",{style:{marginTop:V&&Q===!0?"3px":"0"},children:e.jsx(Qt,{showFolderDetails:V,isCreator:Q,folderName:y,setFolderName:P,folderDescription:D,setFolderDescription:q,isSavingAlbum:Te})}),(N||A.totalFiles>0&&(A.filesUploading>0||A.filesProcessing>0||A.filesComplete<A.totalFiles))&&e.jsx(Ns,{progressTracker:A,isRTL:Pe(r)==="rtl",variant:"detailed",context:"saving",isUploading:N,showSuccessMessage:!1,showErrorMessage:!0,customMessages:{error:t("Some photos could not be processed. You can continue with the successfully processed photos.")}}),Fe&&e.jsx("div",{style:{padding:"16px",marginBottom:"16px",backgroundColor:"#fff3cd",border:"1px solid #ffeaa7",borderRadius:"8px",color:"#856404",textAlign:"center",fontWeight:"500"},children:t("Deleting file...")}),Ae&&e.jsx("div",{style:{padding:"16px",marginBottom:"16px",backgroundColor:"#f8f9fa",border:"1px solid #dee2e6",borderRadius:"8px",color:"#6c757d",textAlign:"center",fontStyle:"italic"},children:t("Loading existing files...")}),e.jsx("input",{ref:c,id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:T=>R(T,we),style:{display:"none"}}),V&&Q===!0&&Ts&&e.jsxs("div",{style:{padding:"32px",marginBottom:"32px",backgroundColor:"#f8f9fa",border:"2px solid #e9ecef",borderRadius:"12px",direction:s?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",fontSize:"18px",color:"#495057",fontWeight:"600",marginBottom:"24px",flexDirection:s?"row-reverse":"row"},children:[e.jsx("span",{style:{marginRight:s?"0":"12px",marginLeft:s?"12px":"0",fontSize:"20px"},children:"🏷️"}),t("Select files to start adding or removing tags")]}),de.length>0&&e.jsx(bi,{existingFiles:de,selectedExistingIndices:a.selectedExistingIndices,onToggleSelection:ns,onSelectAll:ls,onDeselectAll:ds,onDeleteFile:os,disabled:Te,isCreator:Q,participantsCanDeleteItems:I,existingFileTagsMap:a.existingFileTagsMap,t,isRTL:s}),e.jsx(wi,{selectedPhotos:g,selectedPhotoIndices:a.selectedPhotoIndices,onToggleSelection:cs,onSelectAll:us,onDeselectAll:ps,onRemovePhoto:as,onDeleteAll:fs,disabled:Te,photoTagsMap:a.photoTagsMap,columns:ve,setColumns:is,t,isRTL:s}),e.jsx("div",{style:{marginTop:Ss?"32px":"16px"},children:e.jsx(qt,{tagsManager:ts,disabled:Te,enhancedLog:B})})]}),e.jsx(Jt,{isSavingAlbum:m,savingProgress:u}),e.jsx(Js,{children:e.jsx(Ze,{onClick:vs,disabled:Te,children:t(N?"Uploading...":"Add More Photos")})}),e.jsx(St,{t,language:r,usernameManager:w,onSuccess:hs}),e.jsx(Lt,{isOpen:S,onClose:ms,initialOption:K,initialPassword:C}),e.jsx(Gi,{debugMessages:h,t,isRTL:s,textDirection:s?"rtl":"ltr"})]})]})},Ki=$.div`
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
`,Hi=$.div`
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
`,qi=$.div`
  flex: 1;
`,Ji=$.h3`
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
`,Qi=$.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
`,Vi=$.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: stretch;
  }
`,xt=$.button`
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
`,Yi=$.button`
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
`,Xi=$.div`
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
`,qe=$.div`
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,Je=$.h4`
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #333;
`,Qe=$.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  padding: 4px 0;
`,Ve=$.div`
  font-size: 13px;
  color: #333;
  line-height: 1.4;
`,Ye=$.label`
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
`,Xe=$.span`
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
`,Zi=$.button`
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
`,bt=$.div`
  margin-bottom: 16px;
`,wt=$.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #333;
  font-size: 14px;
`,Li=$.input`
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
`,er=$.textarea`
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
`,tr=$.div`
  margin-top: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e9ecef;
`,sr=$.div`
  width: 100%;
  height: 6px;
  background: #e9ecef;
  border-radius: 3px;
  overflow: hidden;
  margin-top: 8px;
`,ir=$.div`
  height: 100%;
  background: linear-gradient(90deg, #007bff, #28a745);
  width: ${t=>t.$progress}%;
  transition: width 0.3s ease;
`,rr=$.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
  justify-content: flex-end;
  flex-direction: ${t=>t.$isRTL?"row-reverse":"row"};
`,yt=$.button`
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
`,ar=({album:t,onUpdate:r,onSave:s,onRemove:a,onShowPasswordDialog:d,disabled:w,columns:i,enhancedLog:l})=>{const{t:o,language:p}=ce(),m=Pe(p)==="rtl",[b,u]=f.useState(!1),[n,y]=f.useState(!1),P=f.useRef(null);f.useEffect(()=>{const E=Q=>{P.current&&!P.current.contains(Q.target)&&u(!1)};return document.addEventListener("mousedown",E),()=>{document.removeEventListener("mousedown",E)}},[]);const D=zt(t.photoTagsMap,E=>{const Q=typeof E=="function"?E(t.photoTagsMap):E;r({photoTagsMap:Q})},new Map,()=>{},t.selectedPhotoIndices,new Set,l),q=E=>{r({name:E})},V=E=>{r({description:E})},ee=E=>{const Q=new Set(t.selectedPhotoIndices);Q.has(E)?Q.delete(E):Q.add(E),r({selectedPhotoIndices:Q})},S=()=>{const E=new Set;for(let Q=0;Q<t.photos.length;Q++)E.add(Q);r({selectedPhotoIndices:E})},te=()=>{r({selectedPhotoIndices:new Set})},K=()=>{confirm(o("Are you sure you want to delete all files from this album? This action cannot be undone."))&&r({photos:[],selectedPhotoIndices:new Set,photoTagsMap:new Map})},G=E=>{const Q=t.photos.filter((ie,re)=>re!==E),Y=new Set;t.selectedPhotoIndices.forEach(ie=>{ie<E?Y.add(ie):ie>E&&Y.add(ie-1)});const ne=new Map;t.photoTagsMap.forEach((ie,re)=>{re<E?ne.set(re,ie):re>E&&ne.set(re-1,ie)}),r({photos:Q,selectedPhotoIndices:Y,photoTagsMap:ne})},C=()=>{r({isOnPublicProfile:!t.isOnPublicProfile})},H=()=>{r({participantsCanAddItems:!t.participantsCanAddItems})},F=()=>{r({participantsCanDeleteItems:!t.participantsCanDeleteItems})},X=()=>{d(t.id)},O=async()=>{if(!(n||w)){y(!0),l(`Starting save for album: ${t.name}`);try{const E=await s();l(`Save completed for album: ${t.name}, success: ${E}`),E||alert(o('Failed to save album "{{albumName}}". Please try again.',{albumName:t.name}))}catch(E){console.error("Error saving album:",E),l(`Error saving album ${t.name}: ${E}`),alert(o('Failed to save album "{{albumName}}". Please try again.',{albumName:t.name}))}finally{y(!1)}}},J=t.passwordProtectionOption!=="NoPassword"&&t.albumPassword,I=w||n||t.isSaving;return e.jsxs(Ki,{children:[e.jsxs(Hi,{$isRTL:m,children:[e.jsxs(qi,{children:[e.jsxs(Ji,{children:[e.jsx("span",{children:"📁"}),t.name,(t.isSaving||n)&&e.jsx("span",{style:{color:"#007bff"},children:"⏳"}),t.savingProgress===100&&e.jsx("span",{style:{color:"#28a745"},children:"✅"})]}),e.jsxs(Qi,{children:[t.photos.length===1?o("1 file"):o("{{count}} files",{count:t.photos.length}),t.selectedPhotoIndices.size>0&&e.jsxs("span",{children:[" • ",o("{{count}} selected for tagging",{count:t.selectedPhotoIndices.size})]})]})]}),e.jsx(Vi,{children:!t.isSaving&&!n&&t.savingProgress<100&&e.jsxs(e.Fragment,{children:[e.jsx(xt,{$variant:"primary",onClick:O,disabled:I,children:o(n?"Saving...":"Save")}),e.jsxs("div",{ref:P,style:{position:"relative"},children:[e.jsx(Yi,{onClick:()=>u(!b),disabled:I,title:o("Album Settings"),children:"⚙️"}),b&&e.jsxs(Xi,{$isRTL:m,children:[e.jsxs(qe,{children:[e.jsx(Je,{children:o("Visibility")}),e.jsxs(Qe,{children:[e.jsx(Ve,{children:o("Public Profile")}),e.jsxs(Ye,{children:[e.jsx("input",{type:"checkbox",checked:t.isOnPublicProfile,onChange:C,disabled:I}),e.jsx(Xe,{})]})]})]}),e.jsxs(qe,{children:[e.jsx(Je,{children:o("Participant Permissions")}),e.jsxs(Qe,{children:[e.jsx(Ve,{children:o("Can Add Items")}),e.jsxs(Ye,{children:[e.jsx("input",{type:"checkbox",checked:t.participantsCanAddItems,onChange:H,disabled:I}),e.jsx(Xe,{})]})]}),e.jsxs(Qe,{children:[e.jsx(Ve,{children:o("Can Delete Items")}),e.jsxs(Ye,{children:[e.jsx("input",{type:"checkbox",checked:t.participantsCanDeleteItems,onChange:F,disabled:I}),e.jsx(Xe,{})]})]})]}),e.jsxs(qe,{children:[e.jsx(Je,{children:o("Security")}),e.jsxs(Zi,{$hasPassword:!!J,onClick:X,disabled:I,children:[J?"🔒":"🔓",o(J?"Password Set":"Set Password")]})]})]})]}),e.jsx(xt,{$variant:"danger",onClick:a,disabled:I,children:o("Remove")})]})})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",marginBottom:"20px"},children:[e.jsxs(bt,{children:[e.jsx(wt,{children:o("Album Name")}),e.jsx(Li,{type:"text",value:t.name,onChange:E=>q(E.target.value),placeholder:o("e.g. Family Vacation in Kyoto"),disabled:I})]}),e.jsxs("div",{children:[e.jsxs(bt,{children:[e.jsx(wt,{children:o("Album Description")}),e.jsx(er,{value:t.description,onChange:E=>V(E.target.value),placeholder:o("e.g. what's special about this album"),disabled:I,rows:3})]}),t.photos.length>0&&e.jsxs(rr,{$isRTL:m,children:[e.jsx(yt,{onClick:t.selectedPhotoIndices.size>0?te:S,disabled:I,children:t.selectedPhotoIndices.size>0?o("Done Tagging Selected"):o("Select All")}),t.selectedPhotoIndices.size===0&&e.jsx(yt,{$variant:"danger",onClick:K,disabled:I,children:o("Delete All")})]})]})]}),e.jsx(Le,{selectedPhotos:t.photos,selectedPhotoIndices:t.selectedPhotoIndices,isSavingAlbum:I,onRemovePhoto:G,onTogglePhotoSelection:ee,onSelectAllPhotos:S,onDeselectAllPhotos:te,hideHeader:!1,photoTagsMap:t.photoTagsMap,columns:i,isMultipleAlbumMode:!0}),t.selectedPhotoIndices.size>0&&e.jsx(tr,{children:e.jsx(qt,{tagsManager:D,disabled:I,enhancedLog:l})}),(t.isSaving||n)&&e.jsxs("div",{style:{marginTop:"16px"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},children:[e.jsx("span",{style:{fontSize:"14px",fontWeight:"600",color:"#333"},children:o(n?"Starting save...":"Saving album...")}),e.jsx("span",{style:{fontSize:"14px",color:"#666"},children:o("{{progress}}%",{progress:t.savingProgress})})]}),e.jsx(sr,{children:e.jsx(ir,{$progress:t.savingProgress})})]})]})},or=$.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
`,nr=({albums:t,setAlbums:r,isSavingAny:s,onSaveAlbum:a,onRemoveAlbum:d,onShowPasswordDialog:w,columns:i,setColumns:l,enhancedLog:o})=>{const{language:p}=ce(),m=Pe(p)==="rtl",b=f.useCallback((n,y)=>{r(P=>P.map(D=>D.id===n?{...D,...y}:D))},[r]),u=f.useCallback(async n=>{try{const y=await a(n);return o(`Album ${n} save result: ${y?"success":"failed"}`),y}catch(y){return o(`Error saving album ${n}: ${y}`),!1}},[a,o]);return e.jsx("div",{children:e.jsx(or,{$isRTL:m,children:t.map(n=>e.jsx(ar,{album:n,onUpdate:y=>b(n.id,y),onSave:()=>u(n.id),onRemove:()=>d(n.id),onShowPasswordDialog:w,disabled:s,columns:i,setColumns:l,enhancedLog:o},n.id))})})},lr=()=>{var Ie,je;const{t,language:r}=ce(),s=Pe(r)==="rtl",[a,d]=f.useState([]),[w,i]=f.useState("2"),[l,o]=f.useState(!1),[p,m]=f.useState(!1),[b,u]=f.useState(null),[n,y]=f.useState(null),[P,D]=f.useState(!1),[q,V]=f.useState(0),[ee,S]=f.useState(0),[te,K]=f.useState(""),[G,C]=f.useState({isOnPublicProfile:!1,participantsCanAddItems:!0,participantsCanDeleteItems:!1,passwordProtectionOption:"NoPassword",albumPassword:""}),H=Tt(t),{setShowUsernamePrompt:F,setUsernameInput:X}=H,[O,J]=f.useState(null);f.useEffect(()=>{const x=localStorage.getItem(ue.PUBLIC_USERNAME);J(x||null)},[]);const I=(x,_)=>{const B=new Date().toISOString();console.log(`[${B}] ${x}`,_)};f.useEffect(()=>{(async()=>{try{const _=await he();if(_){const W=JSON.parse(atob(_.split(".")[1]))["cognito:username"];W&&(y(W),I(`Initialized Cognito username: ${W}`))}}catch(_){console.error("Error initializing username:",_)}})()},[]);const E=x=>{i(x),localStorage.setItem("save-album-columns",x),I(`Column setting changed to ${x} for all albums`)};f.useEffect(()=>{const x=localStorage.getItem(ue.MULTI_ALBUM_DATA);if(x)try{const B=JSON.parse(x).filter(se=>{if(!se||!se.name||!Array.isArray(se.selectedPhotos))return!1;const c=se.selectedPhotos.filter(g=>g&&g.fileName&&g.originalFileName&&g.s3PreviewUrl&&g.s3PreviewUrl.includes("amazonaws.com"));return se.selectedPhotos=c,c.length>0});if(B.length===0){alert(t("No valid albums were found. Please try selecting your files again.")),Ee("my-albums.html");return}const W=B.map(se=>({id:ct(),name:se.name,description:"",photos:se.selectedPhotos,selectedPhotoIndices:new Set,photoTagsMap:new Map,isOnPublicProfile:!1,participantsCanAddItems:!0,participantsCanDeleteItems:!1,passwordProtectionOption:"NoPassword",albumPassword:"",isSaving:!1,savingProgress:0,folderId:""}));d(W),He()}catch(_){console.error("Error parsing multi-album data:",_),alert(t("There was an error loading your albums. Please try selecting your files again.")),Ee("my-albums.html")}else alert(t("No album data was found. Please try selecting your files again.")),Ee("my-albums.html")},[t]),f.useEffect(()=>{const x=localStorage.getItem("save-album-columns")||"2";i(x)},[]);const Q=(x,_)=>{I(`Album ${x} progress: ${_}`)},Y=(x,_)=>{d(B=>B.map(W=>W.id===x?{...W,savingProgress:_}:W))},ne=async(x,_,B)=>{I(`Starting chunked save for album ${x}`),Q(x,t("Processing files in chunks..."));const W=48;if(B.length===0)I(`No file references for album ${x}, saving only folder position`),await $e.saveFolderOnly(_,I);else{const se=Et(B);I(`Album ${x}: Processing ${se.length} unique file references`);const c=_t(se,W);I(`Album ${x}: Split into ${c.length} chunks`);for(let g=0;g<c.length;g++){const k=c[g];I(`Album ${x}: Processing chunk ${g+1} of ${c.length}`);const N=g/c.length*80;Y(x,10+N),g<c.length-1?(Q(x,t("Saving files: chunk {{chunkNumber}} of {{totalChunks}}...",{chunkNumber:g+1,totalChunks:c.length})),await $e.saveFileReferences(k,I)):(Q(x,t("Finalizing album...")),await $e.saveFinalChunkWithFolder(k,_,I))}}Y(x,100),Q(x,t("Album saved successfully!"))},ie=async x=>{const _=a.find(B=>B.id===x);if(!_)return I(`Album ${x} not found`),!1;if(_.photos.length===0)return alert(t('The album "{{albumName}}" has no photos to save.',{albumName:_.name})),!1;if(!n)return I(`No Cognito username available for album ${x}`),!1;I(`Starting real save for album: ${_.name}`),d(B=>B.map(W=>W.id===x?{...W,isSaving:!0,savingProgress:5}:W));try{const B=Math.floor(Date.now()/1e3),W=`${n}_____${ct()}____Folder`,se=`${n}_____${n}____Account`,g=W.split("_____")[1].split("____")[0];I(`Album ${x} folder ID: ${W}`),d(v=>v.map(h=>h.id===x?{...h,folderId:W}:h));const k=Nt(B,se,g,W,n,_.isOnPublicProfile,_.participantsCanAddItems,_.participantsCanDeleteItems,_.passwordProtectionOption,_.albumPassword,_.name,_.description,!1,[],I),N=_.photos.filter(v=>v.status==="complete");I(`Album ${x}: ${N.length} valid photos`);let A=[];if(N.length>0){const v=N.filter(h=>!h.fileId);v.length>0&&(I(`Album ${x}: Moving ${v.length} files to public folder`),Q(x,t("Moving files...")),await vt(v,h=>Y(x,h),I)),I(`Album ${x}: Creating file reference inputs`),A=Rt(N,B,se,W,n,_.photoTagsMap,I)}return await ne(x,k,A),d(v=>v.map(h=>h.id===x?{...h,isSaving:!1,savingProgress:100}:h)),I(`Successfully saved album: ${_.name}`),!0}catch(B){return console.error(`Error saving album ${x}:`,B),I(`Error saving album ${x}: ${B}`),d(W=>W.map(se=>se.id===x?{...se,isSaving:!1,savingProgress:0}:se)),alert(t('Failed to save album "{{albumName}}". Please try again.',{albumName:_.name})),!1}},re=async()=>{if(O!=null&&O.startsWith("Profile-")){X(""),F(!0);return}if(!n){alert(t("Unable to determine user credentials. Please refresh and try again."));return}const x=a.filter(W=>W.savingProgress<100);if(x.length===0)return;I(`Starting save process for ${x.length} albums`),D(!0),S(x.length),V(0);let _=0;const B=[];try{for(let W=0;W<x.length;W++){const se=x[W];V(W+1),K(se.name),I(`Saving album ${W+1} of ${x.length}: ${se.name}`),await ie(se.id)?_++:B.push(se.name),await new Promise(g=>setTimeout(g,200))}if(B.length===0)I("All albums saved successfully, cleaning up and redirecting"),setTimeout(()=>{localStorage.removeItem(ue.MULTI_ALBUM_DATA),He(),sessionStorage.setItem("album_just_saved","true"),Ee("my-albums.html")},1e3);else{const W=B.length===1?t('Failed to save album "{{albumName}}". Please try again.',{albumName:B[0]}):t("Failed to save {{count}} albums: {{albumNames}}. Please try again.",{count:B.length,albumNames:B.join(", ")});alert(W)}}catch(W){console.error("Error in save all albums:",W),alert(t("There was an error saving albums. Please try again."))}finally{D(!1),V(0),S(0),K("")}},pe=x=>{localStorage.setItem(ue.PUBLIC_USERNAME,x),J(x),F(!1),D(!1),V(0),S(0),K(""),re()},ve=x=>{const _=a.find(B=>B.id===x);_&&(u(x),C(B=>({...B,passwordProtectionOption:_.passwordProtectionOption,albumPassword:_.albumPassword})),m(!0))},xe=()=>{u(null),m(!0)},de=(x,_)=>{x!==void 0&&_!==void 0&&(b?d(B=>B.map(W=>W.id===b?{...W,passwordProtectionOption:x,albumPassword:_}:W)):C(B=>({...B,passwordProtectionOption:x,albumPassword:_}))),m(!1),u(null)},De=()=>{d(x=>x.map(_=>({..._,isOnPublicProfile:G.isOnPublicProfile,participantsCanAddItems:G.participantsCanAddItems,participantsCanDeleteItems:G.participantsCanDeleteItems,passwordProtectionOption:G.passwordProtectionOption,albumPassword:G.albumPassword}))),o(!1),I("Applied global settings to all albums",G)},Ae=x=>{const _=a.find(W=>W.id===x);if(_&&!confirm(t('Are you sure you want to remove the album "{{albumName}}"?',{albumName:_.name})))return;const B=a.filter(W=>W.id!==x);d(B),B.length===0&&(localStorage.removeItem(ue.MULTI_ALBUM_DATA),He(),Ee("my-albums.html"))},be=a.some(x=>x.isSaving)||P,Fe=a.some(x=>x.savingProgress<100);return e.jsxs(e.Fragment,{children:[e.jsx(It,{}),e.jsx("style",{children:`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}),e.jsx(jt,{children:e.jsxs(kt,{children:[e.jsx(Ct,{href:"my-albums.html",children:t("Back to Albums")}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx(Qs,{children:t("Columns:")}),e.jsxs(Vs,{value:w,onChange:x=>E(x.target.value),disabled:be,children:[e.jsx("option",{value:"1",children:"1"}),e.jsx("option",{value:"2",children:"2"}),e.jsx("option",{value:"3",children:"3"}),e.jsx("option",{value:"4",children:"4"}),e.jsx("option",{value:"5",children:"5"})]})]}),e.jsxs("div",{style:{position:"relative"},children:[e.jsx(Zt,{onClick:()=>o(!l),disabled:be,title:t("Global Settings for All Albums")}),e.jsx(Ti,{showGlobalGear:l,globalSettings:G,setGlobalSettings:C,onPasswordClick:xe,onApplySettings:De})]}),Fe&&e.jsx(Ze,{$primary:!0,onClick:re,disabled:be,style:{minWidth:"160px",fontSize:"14px",padding:"8px 16px"},children:P?t("Saving {{current}} of {{total}}...",{current:q,total:ee}):a.length===1?t("Save 1 Album"):t("Save {{count}} Albums",{count:a.filter(x=>x.savingProgress<100).length})})]})]})}),e.jsxs(Dt,{$isRTL:s,children:[P&&e.jsxs("div",{style:{marginBottom:"24px",padding:"20px",backgroundColor:"#e3f2fd",border:"2px solid #2196f3",borderRadius:"12px",boxShadow:"0 4px 12px rgba(33, 150, 243, 0.1)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"16px",marginBottom:"16px"},children:[e.jsx("div",{style:{width:"24px",height:"24px",border:"3px solid #e3f2fd",borderTop:"3px solid #2196f3",borderRadius:"50%",animation:"spin 1s linear infinite"}}),e.jsxs("div",{children:[e.jsxs("div",{style:{fontSize:"16px",fontWeight:"600",color:"#1565c0",marginBottom:"4px"},children:[t("Saving Albums")," (",q," / ",ee,")"]}),e.jsx("div",{style:{fontSize:"14px",color:"#1976d2"},children:t("Currently saving: {{albumName}}",{albumName:te})})]})]}),e.jsx("div",{style:{width:"100%",height:"8px",backgroundColor:"#bbdefb",borderRadius:"4px",overflow:"hidden"},children:e.jsx("div",{style:{width:`${q/ee*100}%`,height:"100%",backgroundColor:"#2196f3",transition:"width 0.3s ease",borderRadius:"4px"}})}),e.jsx("div",{style:{marginTop:"8px",fontSize:"12px",color:"#1976d2",textAlign:"center"},children:t("Please wait while your albums are being saved...")})]}),e.jsx(nr,{albums:a,setAlbums:d,isSavingAny:be,onSaveAlbum:ie,onRemoveAlbum:Ae,onShowPasswordDialog:ve,columns:w,setColumns:E,enhancedLog:I})]}),e.jsx(Lt,{isOpen:p,onClose:de,initialOption:b?((Ie=a.find(x=>x.id===b))==null?void 0:Ie.passwordProtectionOption)||"NoPassword":G.passwordProtectionOption,initialPassword:b?((je=a.find(x=>x.id===b))==null?void 0:je.albumPassword)||"":G.albumPassword}),e.jsx(St,{t,language:r,usernameManager:H,onSuccess:pe})]})},dr=()=>new URLSearchParams(window.location.search).get("mode")==="multiple"?e.jsx(lr,{}):e.jsx(Wi,{}),cr=()=>e.jsx(Fs,{children:e.jsx(dr,{})});Ds.createRoot(document.getElementById("root")).render(e.jsx(cr,{}));
