import{h as we,f as _e,r as c,L as me,i as ut,s as Ds,k as Es,l as _s,m as It,n as Ns,a as Re,d as I,o as ve,u as fe,j as e,g as De,p as Rs,R as zs,I as Os}from"./utils-DTlE70TL.js";import{F as Ms}from"./types-CyPfckSQ.js";import{u as Bs,U as Us}from"./UploadProgress-DDmy_ReW.js";import{u as At,U as jt}from"./UsernamePrompt-CudMErCx.js";import{L as Gs}from"./LazyImage-C_AG4_7a.js";import{P as Ws,S as Ks,e as Hs,V as qs,f as Js,g as Ct,h as kt,M as Qs,C as Ft,i as Vs,j as Ys,F as pt,k as ft,l as Xs,m as Zs,G as Dt,n as Et,o as _t,p as Nt,B as st,q as Rt,r as Ls,s as ei,t as ti}from"./styled-components-BVvaUXgh.js";import{g as gt,c as Ve}from"./folderStructureUtils-BmdkosLC.js";const si=`
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
`;class Fe{static async fetchFolderDetails(i,s){var a,d,f,r,n,l,g,x,h;s(`Fetching details for folder ID: ${i}`);try{const u=await we();if(!u)return s("No token available for fetching folder details"),null;s("Sending GraphQL query to fetch folder details");const T=await(await fetch(_e,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${u}`},body:JSON.stringify({query:si,variables:{folderIds:[i],fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(s("Folder details API response:",T),T.errors)return console.error("GraphQL errors:",T.errors),s(`GraphQL errors: ${JSON.stringify(T.errors)}`),null;const B=((d=(a=T==null?void 0:T.data)==null?void 0:a.fetchFolders)==null?void 0:d.items)||[];if(s(`Found ${B.length} folder items`),B.length===0)return s("No folder items found"),null;const D=B[0];s("Retrieved folder data:",D);const C=((r=(f=D.folderPosition)==null?void 0:f.profileIds)==null?void 0:r.some(w=>w.includes("Public____Profile")))||!1;s(`Folder is on public profile: ${C}`),s("Profile IDs:",(n=D.folderPosition)==null?void 0:n.profileIds);const Q=(l=D.folderInviteParameters)==null?void 0:l.usingFolderInviteGrantsRightToAddItems;s(`Participants can add items: ${Q}`);const ee=(g=D.folderInviteParameters)==null?void 0:g.usingFolderInviteGrantsRightToRemoveItems;return s(`Participants can delete items: ${ee}`),{creatorId:D.creatorId||"",folderName:D.folderName||"",folderDescription:D.folderDescription||"",passwordPolicy:((x=D.folderPassword)==null?void 0:x.policy)||"NoPassword",password:((h=D.folderPassword)==null?void 0:h.password)||"",isOnPublicProfile:C,participantsCanAddItems:Q!==void 0?Q:!0,participantsCanDeleteItems:ee!==void 0?ee:!1}}catch(u){return console.error("Error in fetchFolderDetails:",u),s(`Error in fetchFolderDetails: ${u}`),null}}static async saveFolderOnly(i,s){var f,r;s("Sending folder-only mutation (no file references, no folder tags)");const a=await we();if(!a)throw s("No token available for saving album, aborting"),new Error("Authentication token not available");const d={folderPositionInputs:[i]};s("GraphQL folder-only mutation variables:",d);try{s("Sending API request to save folder");const n=await fetch(_e,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({query:ii,variables:d})});s(`API response status: ${n.status}`);const l=await n.text();s(`API response raw text: ${l}`);const g=JSON.parse(l);if(s("API response JSON:",g),g.errors)throw console.error("Folder save failed:",g.errors),s("Folder save failed with errors:",g.errors),new Error("Failed to save folder");return s("Folder saved successfully"),((r=(f=g.data)==null?void 0:f.changeFiles)==null?void 0:r.items)||[]}catch(n){throw console.error("Error in saveFolderOnly:",n),s(`Error in saveFolderOnly: ${n}`),n}}static async saveFileReferences(i,s){var f,r,n,l,g;s(`Sending file references-only mutation with ${i.length} items (each with individual tags and filenames)`);const a=await we();if(!a)throw s("No token available for saving file references, aborting"),new Error("Authentication token not available");const d={updatedFileReferenceInputs:i};s("GraphQL file references-only mutation variables (first item):",i.length>0?i[0]:"No items");try{s("Sending API request to save file references with individual tags and filenames");const x=await fetch(_e,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({query:ri,variables:d})});s(`API response status: ${x.status}`);const h=await x.text();s(`API response raw text: ${h.substring(0,500)}...`);const u=JSON.parse(h);if(s("API response JSON items count:",((n=(r=(f=u.data)==null?void 0:f.changeFiles0)==null?void 0:r.items)==null?void 0:n.length)||0),u.errors)throw console.error("File references save failed:",u.errors),s("File references save failed with errors:",u.errors),new Error("Failed to save file references");return s("File references chunk saved successfully with individual photo tags and filenames"),((g=(l=u.data)==null?void 0:l.changeFiles0)==null?void 0:g.items)||[]}catch(x){throw console.error("Error in saveFileReferences:",x),s(`Error in saveFileReferences: ${x}`),x}}static async saveFinalChunkWithFolder(i,s,a){var r,n,l,g,x,h,u,o,T;a(`Sending final chunk with folder mutation (${i.length} file references with filenames, no folder tags)`);const d=await we();if(!d)throw a("No token available for saving final chunk, aborting"),new Error("Authentication token not available");const f={folderPositionInputs:[s],updatedFileReferenceInputs:i};a("GraphQL final mutation variables (folder + last chunk with filenames, no folder tags)");try{a("Sending API request for final save with folder (no folder tags, with filenames)");const B=await fetch(_e,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${d}`},body:JSON.stringify({query:ai,variables:f})});a(`API response status: ${B.status}`);const D=await B.text();a(`API response raw text: ${D.substring(0,500)}...`);const C=JSON.parse(D);if(a("API response JSON:",{fileReferencesCount:((l=(n=(r=C.data)==null?void 0:r.changeFiles0)==null?void 0:n.items)==null?void 0:l.length)||0,folderItems:((x=(g=C.data)==null?void 0:g.changeFiles)==null?void 0:x.items)||[]}),C.errors)throw console.error("Final save failed:",C.errors),a("Final save failed with errors:",C.errors),new Error("Failed to complete album save");return a("Final chunk and folder saved successfully (with individual photo tags and filenames)"),{fileReferences:((u=(h=C.data)==null?void 0:h.changeFiles0)==null?void 0:u.items)||[],folderPositions:((T=(o=C.data)==null?void 0:o.changeFiles)==null?void 0:T.items)||[]}}catch(B){throw console.error("Error in saveFinalChunkWithFolder:",B),a(`Error in saveFinalChunkWithFolder: ${B}`),B}}static async deleteFileReferences(i,s){var f,r;s(`Deleting ${i.length} file references: ${i.join(", ")}`);const a=await we();if(!a)throw s("No token available for deleting file references, aborting"),new Error("Authentication token not available");const d={deletedFileReferenceIds:i};s("GraphQL delete file references mutation variables:",d);try{s("Sending API request to delete file references");const n=await fetch(_e,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({query:oi,variables:d})});s(`API response status: ${n.status}`);const l=await n.text();s(`API response raw text: ${l}`);const g=JSON.parse(l);if(s("API response JSON:",g),g.errors)throw console.error("File references deletion failed:",g.errors),s("File references deletion failed with errors:",g.errors),new Error("Failed to delete file references");return s(`Successfully deleted ${i.length} file references`),((r=(f=g.data)==null?void 0:f.changeFiles)==null?void 0:r.items)||[]}catch(n){throw console.error("Error in deleteFileReferences:",n),s(`Error in deleteFileReferences: ${n}`),n}}}const ni=(t,i,s,a,d,f,r,n,l,g,x,h,u,o)=>{const[T,B]=c.useState(null),[D,C]=c.useState(null),[Q,ee]=c.useState(!1),[w,se]=c.useState(!1);c.useEffect(()=>{se(!0)},[]);const ae=W=>{if(!w)return null;try{return localStorage.getItem(W)}catch{return null}},X=async W=>{o(`Initializing folder ID with username: ${W}`);try{if(!w)return;const Z=new URLSearchParams(window.location.search).get("folderId");if(o(`Folder ID from URL: ${Z||"null"}`),Z){t(Z),o(`Using existing folder ID: ${Z}`);try{o(`Fetching details for folder: ${Z}`);const m=await Fe.fetchFolderDetails(Z,o);if(o("Folder details retrieved:",m),m){const v=`${W}_____${W}____Account`,H=m.creatorId===v;if(o(`User is creator of folder: ${H}, accountId: ${v}, creator: ${m.creatorId}`),s(H),H){o("User is creator, showing folder details"),a(!0),d(m.folderName),f(m.folderDescription),r(m.isOnPublicProfile),o(`Setting isOnPublicProfile: ${m.isOnPublicProfile}`),m.participantsCanAddItems!==void 0&&(n(m.participantsCanAddItems),o(`Setting participantsCanAddItems: ${m.participantsCanAddItems}`)),m.participantsCanDeleteItems!==void 0&&(u(m.participantsCanDeleteItems),o(`Setting participantsCanDeleteItems: ${m.participantsCanDeleteItems}`));const G=m.passwordPolicy;o(`Password policy from folder details: ${G}`),l(G),G!=="NoPassword"&&m.password&&g(m.password),o(`Set password protection option to: ${G}`)}else o("User is NOT the creator, hiding editable fields"),a(!1)}else o("No folder details retrieved, setting isCreator to true"),s(!0),a(!0)}catch(m){console.error("Error fetching folder details:",m),o(`Error fetching folder details: ${m}`),s(!1)}}else{const m=`${W}_____${ut()}____Folder`;o(`Creating new folder ID: ${m}`),t(m),o("Setting isCreator to true for new album"),s(!0),a(!0)}}catch(J){console.error("Folder ID initialization error:",J),o(`Folder ID initialization error: ${J}`),s(!1)}},R=()=>{if(w){o("Attempting to restore photos from localStorage");try{const W=ae(me.SELECTED_PHOTOS);if(o(`Found stored photos: ${W?"yes":"no"}`),W)try{const J=JSON.parse(W);o(`Parsed ${J.length} photos from localStorage`),Array.isArray(J)&&J.length>0&&(i(J),o(`Restored ${J.length} photos to state (including original filenames)`))}catch(J){console.error("Error parsing stored photos:",J),o(`Error parsing stored photos: ${J}`)}}catch(W){console.error("Error restoring photos from storage:",W),o(`Error restoring photos from storage: ${W}`)}}},ie=()=>{o("Testing S3 connection");try{Ds?o("S3 client is available"):(console.error("S3 client not available"),o("S3 client not available"))}catch(W){console.error("S3 connection test error:",W),o(`S3 connection test error: ${W}`)}},U=async()=>{var W;if(w){o("Starting component initialization");try{o("Checking login with refresh");const J=await we();if(!J){o("No token returned from login check, aborting initialization");return}try{const Z=ae(me.PUBLIC_USERNAME);o(`Retrieved public username from localStorage: ${Z||"null"}`),C(Z||null);const v=JSON.parse(atob(J.split(".")[1]))["cognito:username"];if(v){o(`Extracted Cognito username from token: ${v}`),B(v);const H=ae(me.SUB_ALBUM_DATA);if(o(`Sub-album data from localStorage: ${H||"null"}`),H)try{const G=JSON.parse(H);if(o("Parsed sub-album data:",G),G.isSubAlbum&&((W=G.selectedFileIds)==null?void 0:W.length)>0){o(`Valid sub-album data found with ${G.selectedFileIds.length} files`),x(!0),h(G.selectedFileIds),G.selectedPhotos&&G.selectedPhotos.length>0&&(o(`Found ${G.selectedPhotos.length} selected photos in sub-album data`),i(G.selectedPhotos)),a(!0),s(!0);const te=`${v}_____${ut()}____Folder`;o(`Generated new folder ID for sub-album: ${te}`),t(te)}else o("Invalid sub-album data, proceeding with normal initialization"),await X(v)}catch(G){console.error("Error parsing sub-album data:",G),o(`Error parsing sub-album data: ${G}`),await X(v)}else o("No sub-album data found, proceeding with normal folder initialization"),await X(v)}else o("No Cognito username found in token")}catch(Z){console.error("User data initialization error:",Z),o(`User data initialization error: ${Z}`)}R(),ie(),o("Component initialization completed")}catch(J){console.error("Initialization error:",J),o(`Initialization error: ${J}`)}finally{ee(!0)}}};return c.useEffect(()=>{w&&U()},[w]),{cognitoUsername:T,publicUsername:D,setPublicUsername:C,isInitialized:Q}},zt=t=>t.map(i=>({TagType:i.TagType,tagTitle:i.tagTitle,subtags:i.subtags.map(s=>({TagType:i.TagType,tagTitle:s.tagTitle,subtagTitle:s.subtagTitle}))})),Ot=t=>{const i=new Set;return t.filter(s=>i.has(s.fileId)?!1:(i.add(s.fileId),!0))},Mt=(t,i)=>{const s=[];for(let a=0;a<t.length;a+=i)s.push(t.slice(a,a+i));return s},Bt=(t,i,s,a,d,f,r,n,l,g,x,h,u,o,T)=>{T("Creating folder position input WITHOUT folder-level tags"),T(`Profile visibility: ${f?"Public":"Only Me"}`);const B=f?[`${d}_____Public____Profile`]:["Only Me_____Only Me____Profile"];T(`Profile IDs: ${JSON.stringify(B)}`);let D=[];u&&o.length>0&&(T(`Creating file reference IDs for ${o.length} sub-album files`),D=o.map(w=>{const se=w.split("_____");if(se.length>=2){const X=se[1].split("____")[0],R=`${s}_____${X}____FileReference`;return T(`Created file reference ID for sub-album: ${R}`),R}return T(`Using original fileId as fallback: ${w}`),w})),T(`Created ${D.length} acceptedFileReferenceIds`);const C=l!=="NoPassword"?g:null;if(T(`Password protection: ${l}`),T(`Album password: ${C?"******":"null"}`),T(`Participants can add items: ${r}`),T(`Participants can delete items: ${n}`),!a)throw T("Error: folderId is null or undefined"),new Error("folderId is required to create folder position input");const Q=Es(a),ee=_s(Q);return{currentTime:t,folderId:a,profileIds:B,folderPositionPoints:1,acceptedFileReferenceIds:D,folderInput:{folderAboutContactIds:[i],albumNanoId:ee,folderName:x,folderDescription:h,folderPasswordInput:{password:C,policy:l},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:r,usingFolderInviteGrantsRightToRemoveItems:n,addedItemsNeedFolderCreatorApproval:!1}}}},Ut=(t,i,s,a,d,f,r)=>(r(`Creating file reference inputs with individual photo tags and original filenames for ${t.length} photos`),t.map((n,l)=>{var B;const g=f.get(l)||[],x=zt(g),h=n.originalFileName||n.fileName;if(r(`Photo ${l} (${n.fileName}): ${g.length} tags applied, display name: ${h}`),n.fileId)return r(`Using existing fileId for photo: ${n.fileId}`),{fileReferencesHolderId:a,currentTime:i,points:1,hasBeenDeleted:!1,selectedTagInputs:x,fileId:n.fileId,fileDisplayName:h,fileInput:null};const u=n.type==="video"||(B=n.type)!=null&&B.startsWith("video")?`Input/Video/${n.fileName}`:`Input/Image/${n.fileName}`,o=`${d}_____${n.fileName}____File`;r(`Created file reference for ${n.fileName}:`),r(`  - dataKey: ${u}`),r(`  - fileId: ${o}`),r(`  - fileDisplayName: ${h}`),r(`  - thumbnailDataKey: ${n.thumbnailDataKey||"undefined"}`),r(`  - size: ${n.size}`),r(`  - thumbnailSize: ${n.thumbnailSize||0}`),r(`  - duration: ${n.duration||"undefined"}`),r(`  - tags: ${g.length} tags selected for this photo`);const T={fileId:o,ownerFileInput:{editorContactIds:[s],FileSharingOptionsEnum:"Anyone",dataKey:u,thumbnailDataKey:n.thumbnailDataKey,dataInBytes:n.size,thumbnailDataInBytes:n.thumbnailSize||0,s3UploadedAt:i,durationInSeconds:n.duration},editorFileInput:{aboutContactIds:[s],captionText:"",numericFilterInputs:[]}};return{fileReferencesHolderId:a,currentTime:i,points:1,hasBeenDeleted:!1,selectedTagInputs:x,fileId:o,fileDisplayName:h,fileInput:T}})),li=(t,i,s,a,d,f,r)=>{const n=[];return d.forEach(l=>{const g=f.get(l)||[];if(g.length>0){const x=a[l];if(x){const h=x.dataKey.split("/"),u=h[h.length-1],o=`${s}_____${u}____File`,T=x.fileName||u,B=zt(g);r(`Creating file reference for existing file ${l} (${u}) with ${g.length} tags, display name: ${T}`),n.push({fileReferencesHolderId:i,currentTime:t,points:1,hasBeenDeleted:!1,selectedTagInputs:B,fileId:o,fileDisplayName:T,fileInput:null})}}}),r(`Created ${n.length} file references for existing files with tags and filenames`),n},ci=(t,i,s,a,d,f,r,n,l,g,x,h,u,o,T,B,D,C,Q,ee,w,se)=>{const[ae,X]=c.useState(!1);c.useEffect(()=>{X(!0)},[]);const R=m=>{if(w(`Save progress text: ${m}`),!!ae)try{const v=document.getElementById("saveProgressText");v&&(v.innerText=m)}catch(v){w(`Failed to update progress text in DOM: ${v}`)}},ie=m=>{if(ae)try{const v=document.getElementById("saveProgress");v?(v.style.width=`${m}%`,w(`Updated save progress bar: ${m}%`)):w("Progress bar element not found")}catch(v){w(`Failed to update progress bar: ${v}`)}C(m)},U=()=>(w("Validating required data"),i?t?(w("All required data validated successfully"),!0):(w("No folder ID, validation failed"),!1):(w("No Cognito username, validation failed"),!1)),W=()=>{if(w("Handling successful save"),Ns(Q,ee,[me.SELECTED_PHOTOS,me.SUB_ALBUM_DATA],w),w("Album data cleared"),R(se("Album saved successfully!")),ae)try{sessionStorage.setItem("album_just_saved","true"),w("Set 'album_just_saved' flag in sessionStorage")}catch(m){w(`Failed to set sessionStorage flag: ${m}`)}w("Setting timeout for redirect to my-albums.html"),setTimeout(()=>{w("Redirecting to my-albums.html"),Re("my-albums.html")},1e3)},J=async(m,v)=>{w("Starting chunked save process (individual photo tags with filenames, no folder tags, including existing files with tags)");try{R(se("Processing files in chunks..."));const H=48;if(v.length===0)w("No file references to process, saving only folder position (no folder tags)"),await Fe.saveFolderOnly(m,w);else{const G=Ot(v);w(`After removing duplicates, processing ${G.length} unique file references`);const te=Mt(G,H);w(`Split file references into ${te.length} chunks of max size ${H}`);for(let q=0;q<te.length;q++){const re=te[q];w(`Processing chunk ${q+1} of ${te.length} with ${re.length} file references`);const he=q/te.length*80;C(10+he),ie(10+he),q<te.length-1?(R(se("Saving files: chunk {{chunkNumber}} of {{totalChunks}}...",{chunkNumber:q+1,totalChunks:te.length})),await Fe.saveFileReferences(re,w)):(R(se("Finalizing album...")),await Fe.saveFinalChunkWithFolder(re,m,w))}}C(100),ie(100),R(se("Album saved successfully!")),W()}catch(H){console.error("Error in chunked save process:",H),w(`Error in chunked save process: ${H}`),R(se("Error: {{error}}",{error:String(H)})),D(!1)}};return{saveAlbumDirectly:async()=>{w("Starting direct album save with individual photo tagging, existing file tagging, and original filenames"),w(`Photo tags map: ${u.size} photos have tags applied`),w(`Existing file tags map: ${o.size} existing files have tags applied`),D(!0),C(5);try{if(w("Validating required data for save"),!U()){w("Required data validation failed, aborting save"),D(!1);return}const m=Math.floor(Date.now()/1e3),v=`${i}_____${i}____Account`,G=t.split("_____")[1].split("____")[0];w(`Save timestamp: ${m}`),w(`Account ID: ${v}`),w(`Folder ID: ${t}`),w(`Folder target item identifier: ${G}`),w("Creating folder position input (no folder tags)");const te=Bt(m,v,G,t,i,n,l,g,x,h,f,r,a,d,w);w("Folder position input created:",te);let q=[];const re=s.filter(pe=>pe.status==="complete");if(w(`Found ${re.length} valid photos with 'complete' status`),re.length>0){const pe=re.filter($e=>!$e.fileId);w(`Found ${pe.length} new uploads to move from temp to public folder`),pe.length>0&&(w("Moving files from temp to public folder"),await It(pe,ie,w)),w("Creating file reference inputs for uploads with individual photo tags and original filenames");const ge=Ut(re,m,v,t,i,u,w);w(`Created ${ge.length} file reference inputs for uploads`,ge),q=q.concat(ge)}const he=li(m,t,i,T,B,o,w);if(he.length>0&&(w(`Adding ${he.length} existing file references with tags and filenames`),q=q.concat(he)),a&&d.length>0){w(`Adding ${d.length} existing file references for sub-album`);const pe=d.map(ge=>{w(`Creating file reference for existing sub-album file ID: ${ge}`);const $e=[],Pe=ge.split("_____"),ye=Pe.length>=2?Pe[1].split("____")[0]:ge;return{fileReferencesHolderId:t,currentTime:m,points:1,hasBeenDeleted:!1,selectedTagInputs:$e,fileId:ge,fileDisplayName:ye,fileInput:null}});w(`Created ${pe.length} file reference inputs for sub-album files`,pe),q=q.concat(pe)}w(`Total file reference inputs: ${q.length}`),w("Sending GraphQL mutations with chunked file references (individual photo tags, existing file tags, and original filenames)"),await J(te,q)}catch(m){console.error("Error in saveAlbumDirectly:",m),w(`Error in saveAlbumDirectly: ${m}`),D(!1)}}}},di=`
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
`,Ke=()=>typeof crypto<"u"&&crypto.randomUUID?crypto.randomUUID():"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){const i=Math.random()*16|0;return(t=="x"?i:i&3|8).toString(16)}),Gt=(t,i,s,a,d,f,r)=>{const[n,l]=c.useState([]),[g,x]=c.useState(null),[h,u]=c.useState(!1),[o,T]=c.useState(null),[B,D]=c.useState(null),[C,Q]=c.useState(null),[ee,w]=c.useState(!1),[se,ae]=c.useState(!1),[X,R]=c.useState(""),[ie,U]=c.useState(""),[W,J]=c.useState(!1),[Z,m]=c.useState(!1),v=c.useRef(!1),H=c.useRef(""),G=c.useMemo(()=>({photoIndices:Array.from(d),existingIndices:Array.from(f)}),[d,f]),te=c.useCallback(()=>{const p=[];t.forEach($=>{p.push(...$)}),s.forEach($=>{p.push(...$)});const j=new Map;return p.forEach($=>{if(j.has($.tagTitle)){const k=j.get($.tagTitle),S=[...k.subtags,...$.subtags],A=Array.from(new Map(S.map(P=>[P.subtagTitle,P])).values());j.set($.tagTitle,{...k,subtags:A})}else j.set($.tagTitle,$)}),Array.from(j.values())},[t,s]),q=c.useCallback((p,j)=>{const $=[],k=Math.floor(Date.now()/1e3);return j.forEach(S=>{const A=p.find(P=>P.tagTitle===S.tagTitle);if(A){const P=[];if(S.subtags.forEach(_=>{var z;if(!((z=A.subtags)==null?void 0:z.find(V=>V.subtagTitle===_.subtagTitle))){const V={id:Ke(),tagTitle:_.tagTitle,subtagTitle:_.subtagTitle,TagType:S.TagType||"File",points:1,createdAt:k,updatedAt:k,isCreatedFromApplied:!0};P.push(V),r(`Created missing subtag from applied tags: ${_.subtagTitle} for tag ${_.tagTitle}`)}}),P.length>0){const _=p.findIndex(N=>N.id===A.id);_!==-1&&(p[_]={...A,subtags:[...A.subtags||[],...P]})}}else{const P={id:Ke(),tagTitle:S.tagTitle,TagType:S.TagType||"File",points:1,createdAt:k,updatedAt:k,subtags:[],isCreatedFromApplied:!0};S.subtags&&S.subtags.length>0&&(P.subtags=S.subtags.map(_=>({id:Ke(),tagTitle:_.tagTitle,subtagTitle:_.subtagTitle,TagType:S.TagType||"File",points:1,createdAt:k,updatedAt:k,isCreatedFromApplied:!0}))),$.push(P),r(`Created missing tag from applied tags: ${S.tagTitle} with ${S.subtags.length} subtags`)}}),$},[r]),re=c.useCallback(p=>{const{photoIndices:j,existingIndices:$}=G;if(j.length===0&&$.length===0)return!1;const k=j.length===0||j.every(A=>(t.get(A)||[]).some(_=>_.tagTitle===p.tagTitle)),S=$.length===0||$.every(A=>(s.get(A)||[]).some(_=>_.tagTitle===p.tagTitle));return k&&S},[G,t,s]),he=c.useCallback(p=>{const{photoIndices:j,existingIndices:$}=G;let k=0,S=0;j.forEach(z=>{const ne=(t.get(z)||[]).find(Te=>Te.tagTitle===p.tagTitle);ne&&(k++,ne.subtags.some(Te=>Te.subtagTitle===p.subtagTitle)&&S++)});let A=0,P=0;$.forEach(z=>{const ne=(s.get(z)||[]).find(Te=>Te.tagTitle===p.tagTitle);ne&&(A++,ne.subtags.some(Te=>Te.subtagTitle===p.subtagTitle)&&P++)});const _=k+A,N=S+P;return _>0&&N===_},[G,t,s]),pe=c.useCallback(p=>{const{photoIndices:j,existingIndices:$}=G;if(j.length===0&&$.length===0){r("No files selected for tag application");return}const k=re(p);r(`${k?"Removing":"Applying"} tag "${p.tagTitle}" ${k?"from":"to"} all selected files`),j.length>0&&i(S=>{const A=new Map(S);return j.forEach(P=>{const _=A.get(P)||[];if(k){const N=_.filter(z=>z.tagTitle!==p.tagTitle);A.set(P,N),r(`Removed tag "${p.tagTitle}" from photo ${P}`)}else if(!_.some(z=>z.tagTitle===p.tagTitle)){const z={tagTitle:p.tagTitle,TagType:p.TagType,subtags:[]};A.set(P,[..._,z]),r(`Added tag "${p.tagTitle}" to photo ${P}`)}}),A}),$.length>0&&a(S=>{const A=new Map(S);return $.forEach(P=>{const _=A.get(P)||[];if(k){const N=_.filter(z=>z.tagTitle!==p.tagTitle);A.set(P,N),r(`Removed tag "${p.tagTitle}" from existing file ${P}`)}else if(!_.some(z=>z.tagTitle===p.tagTitle)){const z={tagTitle:p.tagTitle,TagType:p.TagType,subtags:[]};A.set(P,[..._,z]),r(`Added tag "${p.tagTitle}" to existing file ${P}`)}}),A})},[G,re,i,a,r]),ge=c.useCallback(p=>{const{photoIndices:j,existingIndices:$}=G;if(j.length===0&&$.length===0){r("No files selected for subtag application");return}const k=he(p);r(`${k?"Removing":"Applying"} subtag "${p.subtagTitle}" ${k?"from":"to"} all selected files with parent tag`),j.length>0&&i(S=>{const A=new Map(S);return j.forEach(P=>{const N=(A.get(P)||[]).map(z=>{if(z.tagTitle===p.tagTitle){if(k)return{...z,subtags:z.subtags.filter(V=>V.subtagTitle!==p.subtagTitle)};if(!z.subtags.some(ne=>ne.subtagTitle===p.subtagTitle))return{...z,subtags:[...z.subtags,{tagTitle:p.tagTitle,subtagTitle:p.subtagTitle}]}}return z});A.set(P,N)}),A}),$.length>0&&a(S=>{const A=new Map(S);return $.forEach(P=>{const N=(A.get(P)||[]).map(z=>{if(z.tagTitle===p.tagTitle){if(k)return{...z,subtags:z.subtags.filter(V=>V.subtagTitle!==p.subtagTitle)};if(!z.subtags.some(ne=>ne.subtagTitle===p.subtagTitle))return{...z,subtags:[...z.subtags,{tagTitle:p.tagTitle,subtagTitle:p.subtagTitle}]}}return z});A.set(P,N)}),A})},[G,he,i,a,r]),$e=c.useCallback(()=>{const{photoIndices:p,existingIndices:j}=G,$=[];p.forEach(S=>{const A=t.get(S)||[];$.push(...A)}),j.forEach(S=>{const A=s.get(S)||[];$.push(...A)});const k=new Map;return $.forEach(S=>{if(k.has(S.tagTitle)){const A=k.get(S.tagTitle),P=[...A.subtags,...S.subtags],_=Array.from(new Map(P.map(N=>[N.subtagTitle,N])).values());k.set(S.tagTitle,{...A,subtags:_})}else k.set(S.tagTitle,S)}),Array.from(k.values())},[G,t,s]),Pe=c.useCallback(()=>d.size>0||f.size>0,[d.size,f.size]),ye=c.useCallback(async()=>{var p,j;if(h){r("Tags already loading, skipping duplicate fetch");return}r("Fetching tags from API and checking for missing applied tags"),u(!0),Q(null);try{const $=await we();if(!$){r("No token available for fetching tags"),Q("Authentication token not available");return}const k=await fetch(_e,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${$}`},body:JSON.stringify({query:di,variables:{fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})});if(!k.ok)throw new Error(`HTTP error! status: ${k.status}`);const S=await k.json();if(r("Tags API response:",S),S.errors){console.error("GraphQL errors:",S.errors),r(`GraphQL errors: ${JSON.stringify(S.errors)}`),Q(`GraphQL errors: ${S.errors.map(N=>N.message).join(", ")}`);return}let P=(((j=(p=S==null?void 0:S.data)==null?void 0:p.fetchRelations)==null?void 0:j.items)||[]).map(N=>{var z,V;return{id:N.id,tagTitle:N.tagTitle,TagType:N.TagType,points:N.points,createdAt:N.createdAt,updatedAt:N.updatedAt,subtags:((V=(z=N.subtags)==null?void 0:z.items)==null?void 0:V.map(ne=>({id:ne.id,tagTitle:ne.tagTitle,subtagTitle:ne.subtagTitle,TagType:ne.TagType,points:ne.points,createdAt:ne.createdAt,updatedAt:ne.updatedAt})))||[]}});r(`Fetched ${P.length} tags from API`);const _=te();if(r(`Found ${_.length} unique applied tags in file maps`),_.length>0){const N=q(P,_);N.length>0&&(r(`Created ${N.length} missing tags from applied tags`),P=[...N,...P])}r(`Final tags list: ${P.length} tags (including ${P.filter(N=>N.isCreatedFromApplied).length} created from applied tags)`),l(P),v.current=!0}catch($){console.error("Error fetching tags:",$),r(`Error fetching tags: ${$}`),Q($ instanceof Error?$.message:"Unknown error occurred")}finally{u(!1)}},[h,r,te,q]),ue=c.useCallback(p=>{r(`Setting displayed tag: ${p}`),x(p)},[r]),Ne=c.useCallback(()=>{if(!g)return[];const p=n.find(j=>j.id===g);return(p==null?void 0:p.subtags)||[]},[g,n]),Ie=async(p,j)=>{if(r(`Adding new tag: ${p} of type: ${j}`),!p.trim())return r("Cannot add tag with empty title"),!1;J(!0);try{if(!await we())return r("No token available for adding tag"),!1;if(await(async()=>(r("PLACEHOLDER: Would send GraphQL mutation to add tag",{mutation:ui,variables:{tagInput:{tagTitle:p.trim(),TagType:j,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(A=>setTimeout(A,500)),!0))()){const A={id:Ke(),tagTitle:p.trim(),TagType:j,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3),subtags:[]};return l(P=>[A,...P]),pe(A),ue(A.id),R(""),w(!1),r(`Successfully added and applied new tag: ${p}`),!0}return!1}catch($){return console.error("Error adding new tag:",$),r(`Error adding new tag: ${$}`),!1}finally{J(!1)}},Ae=async(p,j,$)=>{if(r(`Adding new subtag: ${j} to tag: ${p}`),!j.trim())return r("Cannot add subtag with empty title"),!1;if(!g)return r("No displayed tag for adding subtag"),!1;m(!0);try{if(!await we())return r("No token available for adding subtag"),!1;if(await(async()=>(r("PLACEHOLDER: Would send GraphQL mutation to add subtag",{mutation:pi,variables:{subtagInput:{tagTitle:p,subtagTitle:j.trim(),TagType:$,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(P=>setTimeout(P,500)),!0))()){const P={id:Ke(),tagTitle:p,subtagTitle:j.trim(),TagType:$,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3)};return l(_=>_.map(N=>N.id===g?{...N,subtags:[P,...N.subtags||[]]}:N)),ge(P),U(""),ae(!1),r(`Successfully added and applied new subtag: ${j}`),!0}return!1}catch(k){return console.error("Error adding new subtag:",k),r(`Error adding new subtag: ${k}`),!1}finally{m(!1)}},b=async p=>{r(`Deleting tag: ${p}`),T(p);try{if(!await we())return r("No token available for deleting tag"),!1;if(await(async()=>(r("PLACEHOLDER: Would send GraphQL mutation to delete tag",{mutation:fi,variables:{tagId:p}}),await new Promise(S=>setTimeout(S,500)),!0))()){const S=n.find(A=>A.id===p);return l(A=>A.filter(P=>P.id!==p)),S&&(i(A=>{const P=new Map(A);return A.forEach((_,N)=>{const z=_.filter(V=>V.tagTitle!==S.tagTitle);P.set(N,z)}),P}),a(A=>{const P=new Map(A);return A.forEach((_,N)=>{const z=_.filter(V=>V.tagTitle!==S.tagTitle);P.set(N,z)}),P})),g===p&&ue(null),r(`Successfully deleted tag: ${p}`),!0}return!1}catch(j){return console.error("Error deleting tag:",j),r(`Error deleting tag: ${j}`),!1}finally{T(null)}},E=async p=>{r(`Deleting subtag: ${p}`),D(p);try{if(!await we())return r("No token available for deleting subtag"),!1;if(await(async()=>(r("PLACEHOLDER: Would send GraphQL mutation to delete subtag",{mutation:gi,variables:{subtagId:p}}),await new Promise(S=>setTimeout(S,500)),!0))()){let S=null;return l(A=>A.map(P=>{var N;const _=((N=P.subtags)==null?void 0:N.filter(z=>z.id===p?(S=z,!1):!0))||[];return{...P,subtags:_}})),S&&(i(A=>{const P=new Map(A);return A.forEach((_,N)=>{const z=_.map(V=>V.tagTitle===S.tagTitle?{...V,subtags:V.subtags.filter(ne=>ne.subtagTitle!==S.subtagTitle)}:V);P.set(N,z)}),P}),a(A=>{const P=new Map(A);return A.forEach((_,N)=>{const z=_.map(V=>V.tagTitle===S.tagTitle?{...V,subtags:V.subtags.filter(ne=>ne.subtagTitle!==S.subtagTitle)}:V);P.set(N,z)}),P})),r(`Successfully deleted subtag: ${p}`),!0}return!1}catch(j){return console.error("Error deleting subtag:",j),r(`Error deleting subtag: ${j}`),!1}finally{D(null)}},K=()=>{w(!0),R("")},M=()=>{w(!1),R("")},L=()=>{ae(!0),U("")},oe=()=>{ae(!1),U("")},ce=async()=>X.trim()?await Ie(X,"File"):!1,je=async()=>{if(ie.trim()&&g){const p=n.find(j=>j.id===g);if(p)return await Ae(p.tagTitle,ie,p.TagType)}return!1};return c.useEffect(()=>{v.current||ye()},[]),c.useEffect(()=>{if(!v.current)return;const p=te(),j=JSON.stringify(p.map($=>({title:$.tagTitle,subtags:$.subtags.map(k=>k.subtagTitle).sort()})));if(j!==H.current){H.current=j;const $=p.filter(k=>!n.some(S=>S.tagTitle===k.tagTitle));$.length>0&&(r(`Detected ${$.length} new applied tags, refreshing tags list`,$.map(k=>k.tagTitle)),ye())}},[t,s,n,te,r,ye]),c.useEffect(()=>{if(g){const p=n.find(j=>j.id===g);p&&!re(p)&&(r(`Clearing displayed tag "${p.tagTitle}" because it's no longer applied to all selected files`),x(null))}},[d.size,f.size,g,n,re,r]),{tags:n,displayedTagId:g,isLoadingTags:h,tagIdBeingDeleted:o,subtagIdBeingDeleted:B,fetchError:C,isAddingNewTag:ee,isAddingNewSubtag:se,newTagTitle:X,newSubtagTitle:ie,isSubmittingNewTag:W,isSubmittingNewSubtag:Z,fetchTags:ye,toggleTagOnSelectedFiles:pe,toggleSubtagOnSelectedFiles:ge,setDisplayedTag:ue,isTagAppliedToSelected:re,isSubtagAppliedToSelected:he,getDisplayedTagSubtags:Ne,getAppliedTagsForSelected:$e,hasSelectedFiles:Pe,addNewTag:Ie,addNewSubtag:Ae,deleteTag:b,deleteSubtag:E,startAddingNewTag:K,cancelAddingNewTag:M,startAddingNewSubtag:L,cancelAddingNewSubtag:oe,submitNewTag:ce,submitNewSubtag:je,setNewTagTitle:R,setNewSubtagTitle:U,extractAllAppliedTags:te,createMissingAppliedTags:q}},mi=I.div`
  margin: 32px 0;
`,Wt=I.div`
  margin-bottom: 24px;
`,Kt=I.h3`
  margin: 0 0 16px 0;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  display: flex;
  align-items: center;
  gap: 12px;
`,Ht=I.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  min-height: 32px;
`,qt=I.button`
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
`,hi=I(qt)`
  font-size: 12px;
  padding: 6px 12px;
  border-radius: 16px;
`,Jt=I.button`
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
`,Qt=I.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 16px;
`,Vt=I.button`
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
`,mt=I.button`
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
`,Yt=()=>{const[t,i]=c.useState(!1);return c.useEffect(()=>{const s=()=>{const d="ontouchstart"in window||navigator.maxTouchPoints&&navigator.maxTouchPoints>0||navigator.msMaxTouchPoints&&navigator.msMaxTouchPoints>0;i(d)};s();const a=()=>{s()};return window.addEventListener("resize",a),()=>{window.removeEventListener("resize",a)}},[]),t},yi=ve.memo(({tag:t,isApplied:i,isDisplayed:s,isBeingDeleted:a,disabled:d,onTagClick:f,onDeleteTag:r,getTagDisplayText:n})=>{const{t:l}=fe(),[g,x]=c.useState(!1),h=Yt(),u=h?s&&!d&&!a:g&&s&&!d&&!a;return e.jsxs(qt,{$isApplied:i,$isDisplayed:s,$isBeingDeleted:a,disabled:d,onClick:()=>f(t),onMouseEnter:()=>!h&&s&&x(!0),onMouseLeave:()=>!h&&s&&x(!1),children:[e.jsx("span",{style:{paddingRight:u?"20px":"0"},children:n(t)}),u&&e.jsx(Jt,{$isMobile:h,onClick:o=>{o.stopPropagation(),r(t.id)},disabled:a,title:l("Delete tag"),children:"×"})]})}),vi=ve.memo(({subtag:t,isApplied:i,isBeingDeleted:s,disabled:a,onSubtagClick:d,onDeleteSubtag:f})=>{const{t:r}=fe(),[n,l]=c.useState(!1),g=Yt(),x=g?i&&!a&&!s:n&&i&&!a&&!s;return e.jsxs(hi,{$isApplied:i,$isBeingDeleted:s,disabled:a,onClick:()=>d(t),onMouseEnter:()=>!g&&i&&l(!0),onMouseLeave:()=>!g&&i&&l(!1),children:[e.jsx("span",{style:{paddingRight:x?"20px":"0"},children:t.subtagTitle}),x&&e.jsx(Jt,{$isMobile:g,onClick:h=>{h.stopPropagation(),f(t.id)},disabled:s,title:r("Delete subtag"),children:"×"})]})}),Xt=({value:t,onChange:i,onSubmit:s,onCancel:a,isSubmitting:d,placeholder:f="Enter tag name..."})=>{const{t:r}=fe(),n=c.useRef(null);c.useEffect(()=>{n.current&&n.current.focus()},[]);const l=g=>{g.key==="Enter"?s():g.key==="Escape"&&a()};return e.jsxs(bi,{children:[e.jsx(wi,{ref:n,type:"text",value:t,onChange:g=>i(g.target.value),onKeyDown:l,placeholder:r(f),disabled:d}),e.jsx(mt,{onClick:s,disabled:!t.trim()||d,title:r("Add (Enter)"),children:d?"...":"✓"}),e.jsx(mt,{onClick:a,disabled:d,title:r("Cancel (Escape)"),children:"×"})]})},Zt=ve.memo(({tagsManager:t,disabled:i=!1,enhancedLog:s})=>{const{t:a}=fe(),{tags:d,displayedTagId:f,isLoadingTags:r,tagIdBeingDeleted:n,isAddingNewTag:l,newTagTitle:g,isSubmittingNewTag:x,toggleTagOnSelectedFiles:h,setDisplayedTag:u,isTagAppliedToSelected:o,deleteTag:T,startAddingNewTag:B,cancelAddingNewTag:D,submitNewTag:C,setNewTagTitle:Q,getAppliedTagsForSelected:ee,hasSelectedFiles:w}=t;if(!w())return null;const se=ve.useCallback(U=>{if(!o(U))return U.tagTitle;const Z=ee().find(v=>v.tagTitle===U.tagTitle);if(!Z||Z.subtags.length===0)return U.tagTitle;const m=Z.subtags.map(v=>v.subtagTitle).join(" || ");return a("{{tagTitle}}  |  {{subtags}}",{tagTitle:U.tagTitle,subtags:m})},[o,ee,a]);ve.useEffect(()=>{const U=d.filter(J=>o(J)),W=ee();s(`TagsDisplay render - ${U.length} tags applied to all selected files`),s("Applied tags with subtags:",W)},[d,o,ee,s]);const ae=U=>{if(i)return;const W=o(U);s(`Tag "${U.tagTitle}" clicked - current state: ${W?"applied to all":"not applied to all"}`),h(U),U.subtags&&U.subtags.length>0&&u(W?null:U.id),s(`After toggle - new state: ${W?"removed from all":"applied to all"}`)},X=async U=>{if(i)return;s(`Delete tag initiated: ${U}`);const W=await T(U);s(W?`Tag successfully deleted: ${U}`:`Failed to delete tag: ${U}`)},R=async()=>{await C()||s("Failed to submit new tag")},ie=ve.useMemo(()=>[...d].sort((U,W)=>U.points!==W.points?W.points-U.points:W.updatedAt-U.updatedAt),[d]);return e.jsxs(mi,{children:[e.jsxs(Wt,{children:[e.jsx(Kt,{children:a("Apply tags to selected files")}),e.jsx(Ht,{children:r?e.jsx(xi,{children:a("Loading tags...")}):e.jsxs(e.Fragment,{children:[ie.map(U=>{const W=o(U);return e.jsx(yi,{tag:U,isApplied:W,isDisplayed:f===U.id,isBeingDeleted:n===U.id,disabled:i,onTagClick:ae,onDeleteTag:X,getTagDisplayText:se},U.id)}),l?e.jsx(Xt,{value:g,onChange:Q,onSubmit:R,onCancel:D,isSubmitting:x,placeholder:a("Enter tag name...")}):e.jsx(Vt,{disabled:i,onClick:B,children:a("+ Add Tag")}),ie.length===0&&!l&&e.jsx(Qt,{children:a("No tags available")})]})})]}),f&&e.jsx(Ti,{tagsManager:t,disabled:i,enhancedLog:s}),e.jsx("div",{style:{marginTop:"24px",padding:"20px 24px",background:"linear-gradient(135deg, #e7f3ff 0%, #f0f8ff 100%)",borderRadius:"12px",fontSize:"13px",color:"#0c5aa6",border:"1px solid #b3d9ff",boxShadow:"0 4px 12px rgba(0, 123, 255, 0.08)"},children:e.jsxs("div",{style:{lineHeight:"2.2"},children:[e.jsxs("div",{style:{marginBottom:"8px"},children:[e.jsx("strong",{style:{color:"#28a745"},children:"🟢"}),"  ",a("Most recently clicked tag (showing subtags)")]}),e.jsxs("div",{style:{marginBottom:"8px"},children:[e.jsx("strong",{style:{color:"#333333"},children:"⚫"}),"  ",a("Applied to selected files")]}),e.jsxs("div",{children:[e.jsx("strong",{style:{color:"#6c757d"},children:"⚪"}),"  ",a("Available but not applied to all selected files")]})]})})]})}),Ti=ve.memo(({tagsManager:t,disabled:i=!1,enhancedLog:s})=>{var X;const{t:a}=fe(),{displayedTagId:d,subtagIdBeingDeleted:f,isAddingNewSubtag:r,newSubtagTitle:n,isSubmittingNewSubtag:l,toggleSubtagOnSelectedFiles:g,isSubtagAppliedToSelected:x,deleteSubtag:h,startAddingNewSubtag:u,cancelAddingNewSubtag:o,submitNewSubtag:T,setNewSubtagTitle:B,tags:D}=t,C=d?((X=D.find(R=>R.id===d))==null?void 0:X.subtags)||[]:[],Q=D.find(R=>R.id===d),ee=R=>{i||(s(`Subtag "${R.subtagTitle}" clicked - current state: ${x(R)?"applied to all":"not applied to all"}`),g(R))},w=async R=>{if(i)return;s(`Delete subtag initiated: ${R}`);const ie=await h(R);s(ie?`Subtag successfully deleted: ${R}`:`Failed to delete subtag: ${R}`)},se=async()=>{await T()||s("Failed to submit new subtag")};if(!Q)return null;const ae=ve.useMemo(()=>[...C].sort((R,ie)=>R.points!==ie.points?ie.points-R.points:ie.updatedAt-R.updatedAt),[C]);return e.jsxs(Wt,{children:[e.jsx(Kt,{children:a('Subtags for "{{tagTitle}}"',{tagTitle:Q.tagTitle})}),e.jsxs(Ht,{children:[ae.map(R=>e.jsx(vi,{subtag:R,isApplied:x(R),isBeingDeleted:f===R.id,disabled:i,onSubtagClick:ee,onDeleteSubtag:w},R.id)),r?e.jsx(Xt,{value:n,onChange:B,onSubmit:se,onCancel:o,isSubmitting:l,placeholder:a("Enter subtag name...")}):e.jsx(Vt,{disabled:i,onClick:u,children:a("+ Add Subtag")}),ae.length===0&&!r&&e.jsx(Qt,{children:a("No subtags available")})]})]})}),Si=({photoTags:t,isSelected:i=!1,onToggleSelection:s,fileName:a,showFileName:d=!1})=>{const{t:f}=fe();c.useEffect(()=>{const x="photo-tagging-animations";if(typeof document<"u"&&!document.getElementById(x)){const h=document.createElement("style");h.id=x,h.textContent=`
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
      `,document.head.appendChild(h)}},[]);const n=(x=>x.length===0?"":x.map(h=>{if(h.subtags.length>0){const u=h.subtags.map(o=>o.subtagTitle).join(", ");return f("{{tagTitle}}: {{subtags}}",{tagTitle:h.tagTitle,subtags:u})}return h.tagTitle}).join(" • "))(t),l=t.length>0;return d&&a||l||i?e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"4px"},children:[d&&a&&e.jsx("div",{style:{fontSize:"11px",fontWeight:"600",color:"#333",padding:"4px 8px",backgroundColor:i?"#e3f2fd":"#f8f9fa",borderRadius:"4px",border:`1px solid ${i?"#90caf9":"#e9ecef"}`,textAlign:"center",wordBreak:"break-word",lineHeight:"1.2",transition:"all 0.2s ease"},children:a}),e.jsx("div",{style:{background:l?"linear-gradient(135deg, rgba(0, 123, 255, 0.95) 0%, rgba(0, 123, 255, 0.85) 100%)":"transparent",color:"white",padding:l?"8px 12px":"6px 12px",borderRadius:l?"8px":"6px",fontSize:l?"11px":"10px",cursor:s?"pointer":"default",backdropFilter:l?"blur(6px)":"none",boxShadow:l?"0 4px 12px rgba(0, 123, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)":"none",border:l?"1px solid rgba(255, 255, 255, 0.2)":"none",transition:"all 0.3s ease",lineHeight:"1.3",minHeight:l?"32px":"auto",display:"flex",alignItems:"center",wordBreak:"break-word"},onClick:s,onMouseEnter:x=>{l&&(x.currentTarget.style.transform="translateY(-1px)",x.currentTarget.style.boxShadow="0 6px 16px rgba(0, 123, 255, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3)")},onMouseLeave:x=>{l&&(x.currentTarget.style.transform="translateY(0)",x.currentTarget.style.boxShadow="0 4px 12px rgba(0, 123, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)")},children:l?e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",width:"100%",flexWrap:"wrap"},children:[e.jsx("span",{style:{fontSize:"12px",opacity:.9,flexShrink:0},children:"🏷️"}),e.jsx("span",{style:{fontWeight:"600",textShadow:"0 1px 2px rgba(0, 0, 0, 0.3)",flex:1},children:n})]}):e.jsx("div",{style:{opacity:1,fontStyle:"normal",textAlign:"center",width:"100%",fontSize:i?"11px":"10px",fontWeight:i?"600":"normal",background:i?"white":"transparent",color:i?"#007bff":"white",borderRadius:i?"6px":"0",padding:i?"8px 12px":"0",border:i?"1px solid #007bff":"none",boxShadow:i?"0 2px 8px rgba(0, 123, 255, 0.2)":"none",animation:i?"subtlePulse 2.5s infinite":"none"},children:i?e.jsxs("span",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"4px"},children:[e.jsx("span",{children:"👇"})," ",f("Scroll down to select tags")]}):e.jsx("span",{style:{opacity:.8,fontStyle:"italic"},children:f("No tags applied")})})})]}):null},$i=()=>{c.useEffect(()=>{if(typeof document>"u")return;const t="photo-handler-styles";if(document.getElementById(t))return;const i=document.createElement("style");i.id=t,i.textContent=`
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
    `,document.head.appendChild(i)},[])},ht={traditional:{padding:"20px",border:"2px dashed #007bff",borderRadius:"12px",backgroundColor:"#fff",boxShadow:"0 2px 8px rgba(0, 0, 0, 0.04)"},horizontal:{display:"flex",overflowX:"auto",gap:"16px",padding:"20px",border:"2px dashed #007bff",borderRadius:"12px",backgroundColor:"#fff",boxShadow:"0 2px 8px rgba(0, 0, 0, 0.04)",scrollbarWidth:"thin",scrollbarColor:"#007bff #f8f9fa",scrollBehavior:"smooth",WebkitOverflowScrolling:"touch"}},xt={traditional:{display:"flex",flexDirection:"column",gap:"8px",minWidth:"0"},horizontal:{display:"flex",flexDirection:"column",gap:"8px",minWidth:"180px",maxWidth:"180px",flexShrink:0}},it=ve.memo(({selectedPhotos:t,selectedPhotoIndices:i,isSavingAlbum:s,onRemovePhoto:a,onTogglePhotoSelection:d,photoTagsMap:f,columns:r="1",isMultipleAlbumMode:n=!1})=>{const{t:l}=fe();$i();const g=c.useMemo(()=>{if(n&&r==="horizontal")return ht.horizontal;const u=parseInt(r,10),o=isNaN(u)||u<1?1:Math.min(u,5);return{...ht.traditional,display:"grid",gridTemplateColumns:`repeat(${o}, 1fr)`,gap:"16px"}},[n,r]),x=c.useMemo(()=>n&&r==="horizontal"?xt.horizontal:xt.traditional,[n,r]),h=c.useMemo(()=>n&&r==="horizontal"?"photo-card-horizontal":"photo-card-traditional",[n,r]);return t.length===0?null:e.jsx(e.Fragment,{children:e.jsx("div",{style:g,className:"photo-grid",children:t.map((u,o)=>{var D,C;const T=i.has(o),B=f.get(o)||[];return e.jsxs("div",{style:x,children:[e.jsxs(Ws,{"data-selected":T?"true":"false",className:`${h} ${T?"selected":""}`,onClick:()=>d(o),children:[T&&!s&&e.jsx("button",{onClick:Q=>{Q.stopPropagation(),confirm(l("Are you sure you want to remove this photo?"))&&a(o)},className:"photo-delete-button",title:l("Remove photo"),children:"×"}),u.status!=="complete"&&e.jsx(Ks,{$status:u.status,children:u.status==="error"?"✕":u.status==="uploading"?"↑":u.status==="processing"?"⚙️":"•"}),e.jsxs(Hs,{className:`media-preview ${T?"selected":""}`,children:[u.type==="video"||(D=u.type)!=null&&D.startsWith("video")?e.jsx(qs,{src:u.s3PreviewUrl,controls:!0,className:"media-item"}):e.jsx(Js,{src:u.s3PreviewUrl,alt:u.fileName,className:"media-item"}),(u.status==="uploading"||u.status==="processing")&&e.jsx(Ct,{$bottom:"4px",$left:"4px",$right:"4px",$height:"4px",children:e.jsx(kt,{$progress:u.progress,$status:u.status})})]}),e.jsxs("div",{className:"file-info-overlay",children:[(C=u.type)!=null&&C.startsWith("video")?l("Video"):l("Image"),u.size&&l(" • {{size}} MB",{size:(u.size/1024/1024).toFixed(1)}),u.duration&&l(" • {{duration}}s",{duration:u.duration})]}),n&&r==="horizontal"&&T&&e.jsx("div",{className:"selection-indicator",children:l("SELECTED")}),u.status==="error"&&u.errorMessage&&e.jsx(Qs,{$type:"error",children:l("Error: {{message}}",{message:u.errorMessage.length>40?u.errorMessage.substring(0,37)+"...":u.errorMessage})})]}),e.jsx("div",{className:`photo-info ${n&&r==="horizontal"?"horizontal":"traditional"}`,children:e.jsx(Si,{photoTags:B,isSelected:T,onToggleSelection:()=>d(o),fileName:u.originalFileName||u.fileName,showFileName:!0})})]},o)})})})});it.displayName="PhotoHandler";const Lt=ve.memo(({isSavingAlbum:t,savingProgress:i})=>{const{t:s}=fe();return t?e.jsxs(Ft,{children:[e.jsx(Vs,{children:s("Saving Album")}),e.jsx(Ys,{id:"saveProgressText",children:s("Moving files...")}),e.jsx(Ct,{children:e.jsx(kt,{id:"saveProgress",$progress:i/100})})]}):null});Lt.displayName="SavingProgressComponent";const es=ve.memo(({showFolderDetails:t,isCreator:i,folderName:s,setFolderName:a,folderDescription:d,setFolderDescription:f,isSavingAlbum:r})=>{const{t:n}=fe();return!t||i!==!0?null:e.jsxs(Ft,{children:[e.jsxs(pt,{children:[e.jsx(ft,{htmlFor:"folderName",children:n("Album Name")}),e.jsx(Xs,{id:"folderName",type:"text",value:s,onChange:l=>a(l.target.value),placeholder:n("e.g. Family Vacation in Kyoto"),disabled:r})]}),e.jsxs(pt,{children:[e.jsx(ft,{htmlFor:"folderDescription",children:n("Album Description")}),e.jsx(Zs,{id:"folderDescription",value:d,onChange:l=>f(l.target.value),placeholder:n("e.g. what's special about this album"),rows:4,disabled:r})]})]})});es.displayName="FolderDetailsComponent";const Pi=()=>{c.useEffect(()=>{if(typeof document>"u")return;const t="existing-files-animations";if(document.getElementById(t))return;const i=document.createElement("style");i.id=t,i.textContent=`
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
    `,document.head.appendChild(i)},[])},Ii=({existingFiles:t,selectedExistingIndices:i,onToggleSelection:s,onSelectAll:a,onDeselectAll:d,onDeleteFile:f,disabled:r,isCreator:n,participantsCanDeleteItems:l,existingFileTagsMap:g,t:x,isRTL:h})=>(Pi(),t.length===0?null:e.jsxs("div",{style:{marginBottom:"32px",direction:h?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px",flexDirection:h?"row-reverse":"row"},children:[e.jsx("div",{children:e.jsx("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:x("Existing Files ({count})").replace("{count}",t.length.toString())})}),e.jsx("div",{style:{display:"flex",gap:"8px",flexDirection:h?"row-reverse":"row"},children:e.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:r?"#f8f9fa":"#fff",color:r?"#999":"#333",cursor:r?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:i.size>0?d:a,disabled:r,children:i.size>0?x("Done Tagging Selected"):x("Select All")})})]}),e.jsx("div",{className:"existing-files-grid",children:t.map((u,o)=>{const T=i.has(o),B=g.get(o)||[];return e.jsxs("div",{className:"existing-file-item",children:[e.jsxs("div",{className:`existing-file-card ${T?"selected":""}`,onClick:()=>!r&&s(o),children:[e.jsx(Gs,{thumbnailDataKey:u.thumbnailDataKey,dataKey:u.dataKey,alt:x("Existing file"),style:{width:"100%",height:"100%",objectFit:"cover"}}),T&&!r&&(n===!0||l)&&e.jsx("button",{onClick:D=>{D.stopPropagation(),confirm(x("Are you sure you want to remove this file?"))&&f(o)},className:"delete-button",title:x("Remove file"),children:"×"}),u.dataInBytes>0&&e.jsx("div",{className:"file-size",children:x("{size} MB").replace("{size}",(u.dataInBytes/(1024*1024)).toFixed(1))}),u.durationInSeconds&&e.jsx("div",{className:"file-duration",children:x("{minutes}:{seconds}").replace("{minutes}",Math.floor(u.durationInSeconds/60).toString()).replace("{seconds}",String(Math.floor(u.durationInSeconds%60)).padStart(2,"0"))})]}),e.jsxs("div",{className:"file-info",children:[u.fileName&&e.jsx("div",{className:`file-name ${T?"selected":""}`,children:u.fileName}),e.jsx("div",{className:"file-tags",children:B.length>0?e.jsx("div",{className:"tags-display",children:e.jsxs("div",{className:"tags-content",children:[e.jsx("span",{className:"tag-icon",children:"🏷️"}),e.jsx("span",{className:"tags-text",children:B.map(D=>{if(D.subtags.length>0){const C=D.subtags.map(Q=>Q.subtagTitle).join(", ");return x("{tagTitle}: {subtags}").replace("{tagTitle}",D.tagTitle).replace("{subtags}",C)}return D.tagTitle}).join(" • ")})]})}):T?e.jsx("div",{style:{background:"white",border:"1px solid #007bff",color:"#007bff",fontWeight:"600",fontSize:"11px",fontStyle:"normal",padding:"8px 12px",borderRadius:"6px",boxShadow:"0 2px 8px rgba(0, 123, 255, 0.2)",animation:"subtlePulse 2.5s infinite"},children:e.jsxs("span",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"4px"},children:[e.jsx("span",{children:"👇"})," ",x("Scroll down to select tags")]})}):null})]})]},`existing-${o}-${u.dataKey}`)})})]})),Ai=({selectedPhotos:t,selectedPhotoIndices:i,onToggleSelection:s,onSelectAll:a,onDeselectAll:d,onRemovePhoto:f,onDeleteAll:r,disabled:n,photoTagsMap:l,columns:g,setColumns:x,t:h,isRTL:u})=>t.length===0?null:e.jsxs("div",{style:{marginBottom:"32px",direction:u?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"16px",flexDirection:u?"row-reverse":"row"},children:[e.jsx("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:h("New Files ({count})").replace("{count}",t.length.toString())}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:u?"flex-start":"flex-end",gap:"8px"},children:[e.jsxs("div",{style:{display:"flex",gap:"8px",flexDirection:u?"row-reverse":"row"},children:[e.jsx("button",{className:"control-button",onClick:i.size>0?d:a,disabled:n,children:i.size>0?h("Done Tagging Selected"):h("Select All")}),i.size===0&&e.jsx("button",{className:"control-button danger",onClick:r,disabled:n,children:h("Delete All")})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",flexDirection:u?"row-reverse":"row"},children:[e.jsx("label",{className:"columns-label",children:h("Columns:")}),e.jsxs("select",{value:g,onChange:o=>x(o.target.value),className:"columns-select",children:[e.jsx("option",{value:"1",children:"1"}),e.jsx("option",{value:"2",children:"2"}),e.jsx("option",{value:"3",children:"3"}),e.jsx("option",{value:"4",children:"4"}),e.jsx("option",{value:"5",children:"5"})]})]})]})]}),e.jsx(it,{selectedPhotos:t,selectedPhotoIndices:i,isSavingAlbum:n,onRemovePhoto:f,onTogglePhotoSelection:s,onSelectAllPhotos:a,onDeselectAllPhotos:d,hideHeader:!0,photoTagsMap:l,columns:g})]}),ji=I.button`
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
`,ts=I.div`
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
`,ze=I.div`
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,ss=I.h4`
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
`,Oe=I.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 8px 0;
`,Me=I.div`
  font-size: 14px;
  color: #333;
  line-height: 1.4;
`,Be=I.label`
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
`,Ue=I.span`
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
`,is=I.button`
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
`,ki=({showGlobalGear:t,globalSettings:i,setGlobalSettings:s,onPasswordClick:a,onApplySettings:d})=>{const{t:f,language:r}=fe(),n=De(r)==="rtl";return t?e.jsx(ts,{$isRTL:n,children:e.jsxs(ze,{children:[e.jsx(ss,{children:f("Apply to All Albums")}),e.jsxs(ze,{children:[e.jsxs(Oe,{children:[e.jsx(Me,{children:f("Public Profile")}),e.jsxs(Be,{children:[e.jsx("input",{type:"checkbox",checked:i.isOnPublicProfile,onChange:l=>s(g=>({...g,isOnPublicProfile:l.target.checked}))}),e.jsx(Ue,{})]})]}),e.jsxs(Oe,{children:[e.jsx(Me,{children:f("Participants Can Add Items")}),e.jsxs(Be,{children:[e.jsx("input",{type:"checkbox",checked:i.participantsCanAddItems,onChange:l=>s(g=>({...g,participantsCanAddItems:l.target.checked}))}),e.jsx(Ue,{})]})]}),e.jsxs(Oe,{children:[e.jsx(Me,{children:f("Participants Can Delete Items")}),e.jsxs(Be,{children:[e.jsx("input",{type:"checkbox",checked:i.participantsCanDeleteItems,onChange:l=>s(g=>({...g,participantsCanDeleteItems:l.target.checked}))}),e.jsx(Ue,{})]})]})]}),e.jsx(ze,{children:e.jsxs(is,{$hasAnyPassword:i.passwordProtectionOption!=="NoPassword"&&!!i.albumPassword,onClick:a,children:[i.passwordProtectionOption!=="NoPassword"&&i.albumPassword?"🔒":"🔓",i.passwordProtectionOption!=="NoPassword"&&i.albumPassword?f("Password Set"):f("Set Password for All")]})}),e.jsx(Ci,{onClick:d,children:f("Apply to All Albums")})]})}):null},Fi=({showGear:t,isOnPublicProfile:i,participantsCanAddItems:s,participantsCanDeleteItems:a,passwordProtectionOption:d,albumPassword:f,onTogglePublicProfile:r,onToggleParticipantsCanAdd:n,onToggleParticipantsCanDelete:l,onPasswordClick:g,disabled:x})=>{const{t:h,language:u}=fe(),o=De(u)==="rtl";return t?e.jsx(ts,{$isRTL:o,children:e.jsxs(ze,{children:[e.jsx(ss,{children:h("Album Settings")}),e.jsxs(ze,{children:[e.jsxs(Oe,{children:[e.jsx(Me,{children:h("Public Profile")}),e.jsxs(Be,{children:[e.jsx("input",{type:"checkbox",checked:i,onChange:r,disabled:x}),e.jsx(Ue,{})]})]}),e.jsxs(Oe,{children:[e.jsx(Me,{children:h("Participants Can Add Items")}),e.jsxs(Be,{children:[e.jsx("input",{type:"checkbox",checked:s,onChange:n,disabled:x}),e.jsx(Ue,{})]})]}),e.jsxs(Oe,{children:[e.jsx(Me,{children:h("Participants Can Delete Items")}),e.jsxs(Be,{children:[e.jsx("input",{type:"checkbox",checked:a,onChange:l,disabled:x}),e.jsx(Ue,{})]})]})]}),e.jsx(ze,{children:e.jsxs(is,{$hasAnyPassword:d!=="NoPassword"&&!!f,onClick:g,disabled:x,children:[d!=="NoPassword"&&f?"🔒":"🔓",h(d!=="NoPassword"&&f?"Password Set":"Set Password")]})})]})}):null},rs=({onClick:t,disabled:i,title:s})=>e.jsx(ji,{onClick:t,disabled:i,title:s,children:"⚙️"}),F={colors:{primary:"#007bff",primaryDark:"#0056b3",secondary:"#6c757d",success:"#4caf50",danger:"#e53935",warning:"#ff9800",white:"#fff",text:{primary:"#333",secondary:"#666",light:"#777"},background:{primary:"#f9fafb",highlight:"#f0f7ff"},border:"#ddd"},spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px"},borderRadius:{small:"4px",medium:"8px"},boxShadow:{lg:"0 4px 10px rgba(0,0,0,0.08)"}},Di=I.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10000;
`,Ei=I.div`
  background-color: ${F.colors.white};
  border-radius: ${F.borderRadius.medium};
  box-shadow: ${F.boxShadow.lg};
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
  scrollbar-color: ${F.colors.border} transparent;
  
  /* Custom scrollbar for webkit browsers */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${F.colors.border};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${F.colors.secondary};
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
    border-radius: ${F.borderRadius.small};
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
  color: ${F.colors.text.primary};
  margin: 0 0 ${F.spacing.lg} 0;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 22px;
    margin: 0 0 ${F.spacing.md} 0;
  }
  
  @media (max-height: 700px) {
    font-size: 20px;
    margin: 0 0 ${F.spacing.md} 0;
  }
  
  @media (max-width: 480px) {
    font-size: 18px;
  }
`,zi=I.p`
  margin-bottom: ${F.spacing.lg};
  font-size: 16px;
  color: ${F.colors.text.secondary};
  line-height: 1.5;
  
  @media (max-width: 768px) {
    margin-bottom: ${F.spacing.md};
    font-size: 15px;
  }
  
  @media (max-height: 700px) {
    margin-bottom: ${F.spacing.sm};
    font-size: 14px;
  }
`,bt=I.div`
  margin-bottom: ${F.spacing.lg};
`,wt=I.label`
  display: block;
  margin-bottom: ${F.spacing.sm};
  font-size: 14px;
  font-weight: 500;
  color: ${F.colors.text.primary};
`,Oi=I.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${F.colors.border};
  border-radius: ${F.borderRadius.small};
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${F.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  &::placeholder {
    color: ${F.colors.text.light};
  }
`,Mi=I.div`
  display: flex;
  flex-direction: column;
  gap: ${F.spacing.md};
  margin-bottom: ${F.spacing.xl};
`,Bi=I.div`
  border: 2px solid ${t=>t.$isSelected?F.colors.primary:F.colors.border};
  border-radius: ${F.borderRadius.medium};
  padding: ${F.spacing.lg};
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${t=>t.$isSelected?F.colors.background.highlight:F.colors.white};
  display: flex;
  align-items: center;
  gap: ${F.spacing.lg};
  
  @media (max-width: 768px) {
    padding: ${F.spacing.md};
    gap: ${F.spacing.md};
  }
  
  @media (max-width: 480px) {
    padding: ${F.spacing.sm};
    gap: ${F.spacing.sm};
  }
  
  @media (max-height: 700px) {
    padding: ${F.spacing.sm};
    gap: ${F.spacing.sm};
  }
`,Ui=I.div`
  flex: 1;
`,Gi=I.div`
  margin-bottom: ${F.spacing.xs};
`,Wi=I.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${F.colors.primary};
  flex-shrink: 0;
`,Ki=I.label`
  font-size: 16px;
  font-weight: 500;
  color: ${F.colors.text.primary};
  cursor: pointer;
  display: block;
`,Hi=I.div`
  font-size: 14px;
  color: ${F.colors.text.secondary};
  margin-top: ${F.spacing.xs};
`,qi=I.div`
  color: ${F.colors.warning};
  font-size: 12px;
  font-style: italic;
  margin-top: ${F.spacing.xs};
  font-weight: 500;
`,Ji=I.div`
  display: flex;
  gap: ${F.spacing.sm};
  justify-content: center;
  margin-top: ${F.spacing.xl};
`,yt=I.button`
  background-color: ${t=>t.$variant==="danger"?F.colors.danger:t.$variant==="secondary"?"transparent":t.$variant==="success"?F.colors.success:F.colors.primary};
  color: ${t=>t.$variant==="secondary"?F.colors.primary:F.colors.white};
  border: ${t=>t.$variant==="secondary"?`1px solid ${F.colors.primary}`:"none"};
  padding: ${t=>t.$size==="small"?"8px 16px":t.$size==="large"?"16px 32px":"12px 24px"};
  border-radius: ${F.borderRadius.medium};
  cursor: ${t=>t.disabled?"not-allowed":"pointer"};
  font-size: ${t=>t.$size==="small"?"14px":t.$size==="large"?"18px":"16px"};
  font-weight: 500;
  transition: all 0.2s ease;
  opacity: ${t=>t.disabled?.6:1};
  min-width: 100px;

  &:hover:not(:disabled) {
    background-color: ${t=>t.$variant==="danger"?"#c62828":t.$variant==="secondary"?F.colors.background.highlight:t.$variant==="success"?"#388e3c":F.colors.primaryDark};
  }
`,Qi=I.div`
  background-color: ${F.colors.background.primary};
  border-radius: ${F.borderRadius.medium};
  padding: ${F.spacing.md};
  margin: ${F.spacing.md} 0;
  border-left: 4px solid ${F.colors.primary};
  font-size: 14px;
  color: ${F.colors.text.secondary};
  line-height: 1.4;
  
  @media (max-width: 768px) {
    padding: ${F.spacing.sm};
    margin: ${F.spacing.sm} 0;
    font-size: 13px;
  }
  
  @media (max-height: 700px) {
    padding: ${F.spacing.xs};
    font-size: 12px;
  }
`,Vi=[{value:"NotVisible",titleKey:"Password Required To See Or Save",descriptionKey:"Album will be completely hidden until correct password is entered"},{value:"Watermark",titleKey:"Watermarked And No Saving Without Password",descriptionKey:"Photos will be visible with watermarks, password required to save"},{value:"CannotBeSaved",titleKey:"Password Required To Save",descriptionKey:"Photos are visible but password required to download or save"},{value:"NoPassword",titleKey:"No Password",descriptionKey:"Album is fully public with no restrictions"}],as=({isOpen:t,onClose:i,initialOption:s="NoPassword",initialPassword:a=""})=>{const{t:d,language:f}=fe(),r=De(f)==="rtl",[n,l]=c.useState(!1),[g,x]=c.useState(s),[h,u]=c.useState(a);if(c.useEffect(()=>{l(!0)},[]),c.useEffect(()=>{t&&(x(s),u(a))},[t,s,a]),!t||!n)return null;const o=h.trim()==="",T=C=>{x(C)},B=C=>{C.target===C.currentTarget&&i()},D=C=>C!=="NoPassword";return e.jsxs(e.Fragment,{children:[e.jsx(Di,{onClick:B}),e.jsx(Ei,{children:e.jsx(_i,{children:e.jsxs(Ni,{$isRTL:r,children:[e.jsx(Ri,{children:d("Album Password Policy")}),e.jsx(zi,{children:d("Configure password protection for your album. Choose how you want to restrict access to your photos.")}),e.jsxs(bt,{children:[e.jsx(wt,{children:d("Enter Password")}),e.jsx(Oi,{type:"text",placeholder:d("Enter password (optional)"),value:h,onChange:C=>u(C.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"})]}),e.jsxs(bt,{children:[e.jsx(wt,{children:d("Select Protection Level")}),e.jsx(Mi,{children:Vi.map(C=>e.jsxs(Bi,{$isSelected:g===C.value,onClick:()=>T(C.value),children:[e.jsx(Wi,{type:"radio",name:"protection",checked:g===C.value,onChange:()=>T(C.value)}),e.jsxs(Ui,{children:[e.jsx(Gi,{children:e.jsx(Ki,{children:d(C.titleKey)})}),e.jsx(Hi,{children:d(C.descriptionKey)}),o&&D(C.value)&&g===C.value&&e.jsx(qi,{children:d('⚠️ Will use "password" as default if left empty')})]})]},C.value))})]}),D(g)&&e.jsxs(Qi,{children:[e.jsx("strong",{children:d("💡 Password Protection Info:")}),e.jsx("br",{}),d('If you leave the password field empty, "password" will be used as the default password. You can change this anytime in album settings.')]}),e.jsxs(Ji,{children:[e.jsx(yt,{$variant:"secondary",onClick:()=>i(),children:d("Cancel")}),e.jsx(yt,{$variant:"primary",onClick:()=>{const C=o&&D(g)?"password":h;console.log(`Saving with option: ${g}, password: ${C.length>0?"********":"none"}`),i(g,C)},children:d("Save")})]})]})})})]})},Yi=({debugMessages:t,t:i,isRTL:s,textDirection:a})=>t.length===0?null:e.jsxs("div",{style:{marginTop:"40px",background:"#fff3cd",padding:"16px",borderRadius:"8px",border:"1px solid #ffeeba",maxWidth:900,margin:"0 auto",direction:a},children:[e.jsx("h3",{style:{marginTop:0,fontSize:"18px",color:"#856404",textAlign:s?"right":"left"},children:i("Debug Log")}),e.jsx("pre",{style:{fontSize:"14px",color:"#856404",whiteSpace:"pre-wrap",maxHeight:"400px",overflow:"auto",textAlign:s?"right":"left"},children:t.map((d,f)=>e.jsx("div",{style:{marginBottom:"8px"},children:d},f))})]}),Xi=()=>{const[t,i]=c.useState(!1);return c.useEffect(()=>{i(!0)},[]),{getItem:f=>{if(!t||typeof window>"u")return null;try{return window.localStorage.getItem(f)}catch{return null}},setItem:(f,r)=>{if(!(!t||typeof window>"u"))try{window.localStorage.setItem(f,r)}catch{}},removeItem:f=>{if(!(!t||typeof window>"u"))try{window.localStorage.removeItem(f)}catch{}},isClient:t}},Zi=()=>{const[t,i]=c.useState(new URLSearchParams),[s,a]=c.useState(!1);return c.useEffect(()=>{a(!0),typeof window<"u"&&i(new URLSearchParams(window.location.search))},[]),{urlParams:t,isClient:s}},vt=()=>{const{t,language:i}=fe(),s=De(i)==="rtl",a=Xi(),{urlParams:d,isClient:f}=Zi(),[r,n]=c.useState({selectedPhotoIndices:new Set,photoTagsMap:new Map,selectedExistingIndices:new Set,existingFileTagsMap:new Map}),l=At(t),{setShowUsernamePrompt:g,setUsernameInput:x}=l,[h,u]=c.useState(null),[o,T]=c.useState(!1),[B,D]=c.useState(0),[C,Q]=c.useState(""),[ee,w]=c.useState(""),[se,ae]=c.useState(!1),[X,R]=c.useState(!1),[ie,U]=c.useState("NoPassword"),[W,J]=c.useState(""),[Z,m]=c.useState(!1),[v,H]=c.useState(!0),[G,te]=c.useState(!1),[q,re]=c.useState(null),[he,pe]=c.useState(!1),[ge,$e]=c.useState([]),[Pe,ye]=c.useState("2"),[ue,Ne]=c.useState([]),[Ie,Ae]=c.useState(!1),[b,E]=c.useState(!1),[K,M]=c.useState(!1),L=c.useRef(null),oe=(y,O)=>{const Y=new Date().toISOString();console.log(`[${Y}] ${y}`,O)};c.useEffect(()=>{if(!f)return;const y=O=>{L.current&&!L.current.contains(O.target)&&M(!1)};return document.addEventListener("mousedown",y),()=>{document.removeEventListener("mousedown",y)}},[f]);const je=Bs(y=>{!h&&y&&u(y)},!0),{fileInputRef:p,selectedPhotos:j,setSelectedPhotos:$,isUploading:k,progressTracker:S,setProgressTracker:A,debugMessages:P,currentFolderId:_,openFilePicker:N,handleFileSelection:z,setOnSaveAlbumPage:V}=je,ne=ni(u,$,re,ae,Q,w,m,H,U,J,pe,$e,te,oe),{cognitoUsername:Te,publicUsername:qe,setPublicUsername:os}=ne,ns=Gt(r.photoTagsMap,y=>{n(O=>({...O,photoTagsMap:typeof y=="function"?y(O.photoTagsMap):y}))},r.existingFileTagsMap,y=>{n(O=>({...O,existingFileTagsMap:typeof y=="function"?y(O.existingFileTagsMap):y}))},r.selectedPhotoIndices,r.selectedExistingIndices,oe),ls=ci(h||_,Te,j,he,ge,C,ee,Z,v,G,ie,W,r.photoTagsMap,r.existingFileTagsMap,ue,r.selectedExistingIndices,T,D,$,A,oe,t),{saveAlbumDirectly:rt}=ls;c.useEffect(()=>{if(!f)return;const y=a.getItem("save-album-columns")||"2";ye(y)},[f]);const cs=y=>{ye(y),f&&a.setItem("save-album-columns",y)};c.useEffect(()=>(V(!0),()=>V(!1)),[V]),c.useEffect(()=>{(async()=>{try{await Rs()}catch(O){console.warn("Credential prewarming failed:",O)}})()},[]);const ds=async y=>{var O,Y,le;if(y){Ae(!0);try{const de=await we();if(!de)return;const be=`
        mutation FetchRelations($fetchRelationsInput: FetchRelationsInput!) {
          fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
            items {
              ... on FolderPosition {
                ${Ms}
              }
            }
          }
        }
      `,xe={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}},We=await(await fetch(_e,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${de}`},body:JSON.stringify({query:be,variables:xe})})).json();if(We.errors){console.error("GraphQL errors:",We.errors);return}const at=(((Y=(O=We==null?void 0:We.data)==null?void 0:O.fetchRelations)==null?void 0:Y.items)||[]).find(Se=>Se&&Se.folder&&Se.folder.id===y);if(!at)return;const Ee=at.folder,ks=((le=Ee==null?void 0:Ee.fileReferencesPage)==null?void 0:le.items)||[],ot=[],nt=new Map;ks.forEach((Se,Fs)=>{const ke=Se.file;if(ke&&ke.dataKey){let Je=Se.fileDisplayName;if(!Je&&ke.dataKey){const He=ke.dataKey.split("/");Je=He[He.length-1]}ot.push({fileReferenceId:Se.id,dataKey:ke.dataKey,thumbnailDataKey:ke.thumbnailDataKey||null,durationInSeconds:ke.durationInSeconds||null,dataInBytes:ke.dataInBytes||0,fileName:Je||void 0});const lt=Se.selectedTags||[];if(lt.length>0){const He=lt.map(Qe=>{var ct;return{tagTitle:Qe.tagTitle,TagType:Qe.TagType,subtags:((ct=Qe.subtags)==null?void 0:ct.map(dt=>({tagTitle:dt.tagTitle,subtagTitle:dt.subtagTitle})))||[]}});nt.set(Fs,He)}}}),Ne(ot),n(Se=>({...Se,existingFileTagsMap:nt})),!C&&Ee.folderName&&Q(Ee.folderName),!ee&&Ee.folderDescription&&w(Ee.folderDescription)}catch(de){console.error("Failed to fetch existing album data:",de)}finally{Ae(!1)}}};c.useEffect(()=>{if(!f)return;const y=d.get("folderId");if(y){if(u(y),pe(!1),typeof window<"u")try{window.localStorage.removeItem(me.SUB_ALBUM_DATA)}catch{}ae(!0),re(!0)}},[f,d]),c.useEffect(()=>{h&&ds(h)},[h]),c.useEffect(()=>{_&&!h&&u(_)},[_,h]),c.useEffect(()=>{n(y=>{const O=new Set,Y=new Map;return y.selectedPhotoIndices.forEach(le=>{le<j.length&&O.add(le)}),y.photoTagsMap.forEach((le,de)=>{de<j.length&&Y.set(de,le)}),{...y,selectedPhotoIndices:O,photoTagsMap:Y}})},[j.length]),c.useEffect(()=>{n(y=>{const O=new Set,Y=new Map;return y.selectedExistingIndices.forEach(le=>{le<ue.length&&O.add(le)}),y.existingFileTagsMap.forEach((le,de)=>{de<ue.length&&Y.set(de,le)}),{...y,selectedExistingIndices:O,existingFileTagsMap:Y}})},[ue.length]);const us=y=>{const O=j.filter((Y,le)=>le!==y);if($(O),f&&typeof window<"u")try{O.length>0?window.localStorage.setItem(me.SELECTED_PHOTOS,JSON.stringify(O)):window.localStorage.removeItem(me.SELECTED_PHOTOS)}catch{}n(Y=>{const le=new Set,de=new Map;return Y.selectedPhotoIndices.forEach(be=>{be<y?le.add(be):be>y&&le.add(be-1)}),Y.photoTagsMap.forEach((be,xe)=>{xe<y?de.set(xe,be):xe>y&&de.set(xe-1,be)}),{...Y,selectedPhotoIndices:le,photoTagsMap:de}})},ps=async y=>{const O=ue[y];if(!O){oe(`No file found at index ${y}`);return}E(!0),oe(`Starting deletion of file reference: ${O.fileReferenceId}`);try{await Fe.deleteFileReferences([O.fileReferenceId],oe),oe(`Successfully deleted file reference: ${O.fileReferenceId}`);const Y=ue.filter((le,de)=>de!==y);Ne(Y),n(le=>{const de=new Set,be=new Map;return le.selectedExistingIndices.forEach(xe=>{xe<y?de.add(xe):xe>y&&de.add(xe-1)}),le.existingFileTagsMap.forEach((xe,Ge)=>{Ge<y?be.set(Ge,xe):Ge>y&&be.set(Ge-1,xe)}),{...le,selectedExistingIndices:de,existingFileTagsMap:be}}),oe(`File removed from local state, ${Y.length} files remaining`)}catch(Y){console.error("Failed to delete file reference:",Y),oe(`Failed to delete file reference: ${Y}`),alert(t("Failed to delete file. Please try again."))}finally{E(!1)}},fs=y=>{n(O=>{const Y=new Set(O.selectedExistingIndices);return Y.has(y)?Y.delete(y):Y.add(y),{...O,selectedExistingIndices:Y}})},gs=()=>{const y=new Set;for(let O=0;O<ue.length;O++)y.add(O);n(O=>({...O,selectedExistingIndices:y}))},ms=()=>{n(y=>({...y,selectedExistingIndices:new Set}))},hs=y=>{n(O=>{const Y=new Set(O.selectedPhotoIndices);return Y.has(y)?Y.delete(y):Y.add(y),{...O,selectedPhotoIndices:Y}})},xs=()=>{const y=new Set;for(let O=0;O<j.length;O++)y.add(O);n(O=>({...O,selectedPhotoIndices:y}))},bs=()=>{n(y=>({...y,selectedPhotoIndices:new Set}))},ws=()=>{if(f&&confirm(t("Are you sure you want to delete all new files? This action cannot be undone."))&&($([]),n({selectedPhotoIndices:new Set,photoTagsMap:new Map,selectedExistingIndices:new Set,existingFileTagsMap:new Map}),f&&typeof window<"u"))try{window.localStorage.removeItem(me.SELECTED_PHOTOS)}catch{}},ys=async()=>{T(!0);try{if(qe!=null&&qe.startsWith("Profile-")){x(""),g(!0),T(!1);return}rt()}catch(y){console.error("Error in handleSaveAlbumSingle:",y),T(!1)}},vs=y=>{if(f&&typeof window<"u")try{window.localStorage.setItem(me.PUBLIC_USERNAME,y)}catch{}os(y),g(!1),rt()},Ts=(y,O)=>{y&&U(y),O!==void 0&&J(O),R(!1)},Ss=()=>{R(!0)},$s=()=>{m(!Z)},Ps=()=>{H(!v)},Is=()=>{te(!G)},As=()=>{N(h)},Ce=o||k||Ie||b,js=j.length>0||ue.length>0,Cs=r.selectedPhotoIndices.size>0||r.selectedExistingIndices.size>0;return e.jsxs(e.Fragment,{children:[e.jsx(Dt,{}),e.jsx(Et,{children:e.jsxs(_t,{children:[e.jsx(Nt,{href:"my-albums.html",children:t("Back to Albums")}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[se&&q===!0&&e.jsxs("div",{ref:L,style:{position:"relative"},children:[e.jsx(rs,{onClick:()=>M(!K),disabled:Ce,title:t("Album Settings")}),e.jsx(Fi,{showGear:K,isOnPublicProfile:Z,participantsCanAddItems:v,participantsCanDeleteItems:G,passwordProtectionOption:ie,albumPassword:W,onTogglePublicProfile:$s,onToggleParticipantsCanAdd:Ps,onToggleParticipantsCanDelete:Is,onPasswordClick:Ss,disabled:Ce})]}),e.jsx(st,{$primary:!0,onClick:ys,disabled:Ce,style:{minWidth:"120px",fontSize:"14px",padding:"8px 16px"},children:t(o?"Saving...":"Save Album")})]})]})}),e.jsxs(Rt,{$isRTL:s,children:[e.jsx("div",{style:{marginTop:se&&q===!0?"3px":"0"},children:e.jsx(es,{showFolderDetails:se,isCreator:q,folderName:C,setFolderName:Q,folderDescription:ee,setFolderDescription:w,isSavingAlbum:Ce})}),(k||S.totalFiles>0&&(S.filesUploading>0||S.filesProcessing>0||S.filesComplete<S.totalFiles))&&e.jsx(Us,{progressTracker:S,isRTL:De(i)==="rtl",variant:"detailed",context:"saving",isUploading:k,showSuccessMessage:!1,showErrorMessage:!0,customMessages:{error:t("Some photos could not be processed. You can continue with the successfully processed photos.")}}),b&&e.jsx("div",{style:{padding:"16px",marginBottom:"16px",backgroundColor:"#fff3cd",border:"1px solid #ffeaa7",borderRadius:"8px",color:"#856404",textAlign:"center",fontWeight:"500"},children:t("Deleting file...")}),Ie&&e.jsx("div",{style:{padding:"16px",marginBottom:"16px",backgroundColor:"#f8f9fa",border:"1px solid #dee2e6",borderRadius:"8px",color:"#6c757d",textAlign:"center",fontStyle:"italic"},children:t("Loading existing files...")}),e.jsx("input",{ref:p,id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:y=>z(y,Te),style:{display:"none"}}),se&&q===!0&&js&&e.jsxs("div",{style:{padding:"32px",marginBottom:"32px",backgroundColor:"#f8f9fa",border:"2px solid #e9ecef",borderRadius:"12px",direction:s?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",fontSize:"18px",color:"#495057",fontWeight:"600",marginBottom:"24px",flexDirection:s?"row-reverse":"row"},children:[e.jsx("span",{style:{marginRight:s?"0":"12px",marginLeft:s?"12px":"0",fontSize:"20px"},children:"🏷️"}),t("Select files to start adding or removing tags")]}),ue.length>0&&e.jsx(Ii,{existingFiles:ue,selectedExistingIndices:r.selectedExistingIndices,onToggleSelection:fs,onSelectAll:gs,onDeselectAll:ms,onDeleteFile:ps,disabled:Ce,isCreator:q,participantsCanDeleteItems:G,existingFileTagsMap:r.existingFileTagsMap,t,isRTL:s}),e.jsx(Ai,{selectedPhotos:j,selectedPhotoIndices:r.selectedPhotoIndices,onToggleSelection:hs,onSelectAll:xs,onDeselectAll:bs,onRemovePhoto:us,onDeleteAll:ws,disabled:Ce,photoTagsMap:r.photoTagsMap,columns:Pe,setColumns:cs,t,isRTL:s}),e.jsx("div",{style:{marginTop:Cs?"32px":"16px"},children:e.jsx(Zt,{tagsManager:ns,disabled:Ce,enhancedLog:oe})})]}),e.jsx(Lt,{isSavingAlbum:o,savingProgress:B}),e.jsx(Ls,{children:e.jsx(st,{onClick:As,disabled:Ce,children:t(k?"Uploading...":"Add More Photos")})}),e.jsx(jt,{t,language:i,usernameManager:l,onSuccess:vs}),e.jsx(as,{isOpen:X,onClose:Ts,initialOption:ie,initialPassword:W}),e.jsx(Yi,{debugMessages:P,t,isRTL:s,textDirection:s?"rtl":"ltr"})]})]})},Li=I.div`
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
`,Tt=I.button`
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
`,Ye=I.div`
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,Xe=I.h4`
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #333;
`,Ze=I.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  padding: 4px 0;
`,Le=I.div`
  font-size: 13px;
  color: #333;
  line-height: 1.4;
`,et=I.label`
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
`,tt=I.span`
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
`,St=I.div`
  margin-bottom: 16px;
`,$t=I.label`
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
`,Pt=I.button`
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
`,gr=({album:t,onUpdate:i,onSave:s,onRemove:a,onShowPasswordDialog:d,disabled:f,columns:r,enhancedLog:n})=>{const{t:l,language:g}=fe(),x=De(g)==="rtl",[h,u]=c.useState(!1),[o,T]=c.useState(!1),B=c.useRef(null);c.useEffect(()=>{const v=H=>{B.current&&!B.current.contains(H.target)&&u(!1)};return document.addEventListener("mousedown",v),()=>{document.removeEventListener("mousedown",v)}},[]);const D=Gt(t.photoTagsMap,v=>{const H=typeof v=="function"?v(t.photoTagsMap):v;i({photoTagsMap:H})},new Map,()=>{},t.selectedPhotoIndices,new Set,n),C=v=>{i({name:v})},Q=v=>{i({description:v})},ee=v=>{const H=new Set(t.selectedPhotoIndices);H.has(v)?H.delete(v):H.add(v),i({selectedPhotoIndices:H})},w=()=>{const v=new Set;for(let H=0;H<t.photos.length;H++)v.add(H);i({selectedPhotoIndices:v})},se=()=>{i({selectedPhotoIndices:new Set})},ae=()=>{confirm(l("Are you sure you want to delete all files from this album? This action cannot be undone."))&&i({photos:[],selectedPhotoIndices:new Set,photoTagsMap:new Map})},X=v=>{const H=t.photos.filter((q,re)=>re!==v),G=new Set;t.selectedPhotoIndices.forEach(q=>{q<v?G.add(q):q>v&&G.add(q-1)});const te=new Map;t.photoTagsMap.forEach((q,re)=>{re<v?te.set(re,q):re>v&&te.set(re-1,q)}),i({photos:H,selectedPhotoIndices:G,photoTagsMap:te})},R=()=>{i({isOnPublicProfile:!t.isOnPublicProfile})},ie=()=>{i({participantsCanAddItems:!t.participantsCanAddItems})},U=()=>{i({participantsCanDeleteItems:!t.participantsCanDeleteItems})},W=()=>{d(t.id)},J=async()=>{if(!(o||f)){T(!0),n(`Starting save for album: ${t.name}`);try{const v=await s();n(`Save completed for album: ${t.name}, success: ${v}`),v||alert(l('Failed to save album "{{albumName}}". Please try again.',{albumName:t.name}))}catch(v){console.error("Error saving album:",v),n(`Error saving album ${t.name}: ${v}`),alert(l('Failed to save album "{{albumName}}". Please try again.',{albumName:t.name}))}finally{T(!1)}}},Z=t.passwordProtectionOption!=="NoPassword"&&t.albumPassword,m=f||o||t.isSaving;return e.jsxs(Li,{children:[e.jsxs(er,{$isRTL:x,children:[e.jsxs(tr,{children:[e.jsxs(sr,{children:[e.jsx("span",{children:"📁"}),t.name,(t.isSaving||o)&&e.jsx("span",{style:{color:"#007bff"},children:"⏳"}),t.savingProgress===100&&e.jsx("span",{style:{color:"#28a745"},children:"✅"})]}),e.jsxs(ir,{children:[t.photos.length===1?l("1 file"):l("{{count}} files",{count:t.photos.length}),t.selectedPhotoIndices.size>0&&e.jsxs("span",{children:[" • ",l("{{count}} selected for tagging",{count:t.selectedPhotoIndices.size})]})]})]}),e.jsx(rr,{children:!t.isSaving&&!o&&t.savingProgress<100&&e.jsxs(e.Fragment,{children:[e.jsx(Tt,{$variant:"primary",onClick:J,disabled:m,children:l(o?"Saving...":"Save")}),e.jsxs("div",{ref:B,style:{position:"relative"},children:[e.jsx(ar,{onClick:()=>u(!h),disabled:m,title:l("Album Settings"),children:"⚙️"}),h&&e.jsxs(or,{$isRTL:x,children:[e.jsxs(Ye,{children:[e.jsx(Xe,{children:l("Visibility")}),e.jsxs(Ze,{children:[e.jsx(Le,{children:l("Public Profile")}),e.jsxs(et,{children:[e.jsx("input",{type:"checkbox",checked:t.isOnPublicProfile,onChange:R,disabled:m}),e.jsx(tt,{})]})]})]}),e.jsxs(Ye,{children:[e.jsx(Xe,{children:l("Participant Permissions")}),e.jsxs(Ze,{children:[e.jsx(Le,{children:l("Can Add Items")}),e.jsxs(et,{children:[e.jsx("input",{type:"checkbox",checked:t.participantsCanAddItems,onChange:ie,disabled:m}),e.jsx(tt,{})]})]}),e.jsxs(Ze,{children:[e.jsx(Le,{children:l("Can Delete Items")}),e.jsxs(et,{children:[e.jsx("input",{type:"checkbox",checked:t.participantsCanDeleteItems,onChange:U,disabled:m}),e.jsx(tt,{})]})]})]}),e.jsxs(Ye,{children:[e.jsx(Xe,{children:l("Security")}),e.jsxs(nr,{$hasPassword:!!Z,onClick:W,disabled:m,children:[Z?"🔒":"🔓",l(Z?"Password Set":"Set Password")]})]})]})]}),e.jsx(Tt,{$variant:"danger",onClick:a,disabled:m,children:l("Remove")})]})})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",marginBottom:"20px"},children:[e.jsxs(St,{children:[e.jsx($t,{children:l("Album Name")}),e.jsx(lr,{type:"text",value:t.name,onChange:v=>C(v.target.value),placeholder:l("e.g. Family Vacation in Kyoto"),disabled:m})]}),e.jsxs("div",{children:[e.jsxs(St,{children:[e.jsx($t,{children:l("Album Description")}),e.jsx(cr,{value:t.description,onChange:v=>Q(v.target.value),placeholder:l("e.g. what's special about this album"),disabled:m,rows:3})]}),t.photos.length>0&&e.jsxs(fr,{$isRTL:x,children:[e.jsx(Pt,{onClick:t.selectedPhotoIndices.size>0?se:w,disabled:m,children:t.selectedPhotoIndices.size>0?l("Done Tagging Selected"):l("Select All")}),t.selectedPhotoIndices.size===0&&e.jsx(Pt,{$variant:"danger",onClick:ae,disabled:m,children:l("Delete All")})]})]})]}),e.jsx(it,{selectedPhotos:t.photos,selectedPhotoIndices:t.selectedPhotoIndices,isSavingAlbum:m,onRemovePhoto:X,onTogglePhotoSelection:ee,onSelectAllPhotos:w,onDeselectAllPhotos:se,hideHeader:!1,photoTagsMap:t.photoTagsMap,columns:r,isMultipleAlbumMode:!0}),t.selectedPhotoIndices.size>0&&e.jsx(dr,{children:e.jsx(Zt,{tagsManager:D,disabled:m,enhancedLog:n})}),(t.isSaving||o)&&e.jsxs("div",{style:{marginTop:"16px"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},children:[e.jsx("span",{style:{fontSize:"14px",fontWeight:"600",color:"#333"},children:l(o?"Starting save...":"Saving album...")}),e.jsx("span",{style:{fontSize:"14px",color:"#666"},children:l("{{progress}}%",{progress:t.savingProgress})})]}),e.jsx(ur,{children:e.jsx(pr,{$progress:t.savingProgress})})]})]})},mr=I.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
`,hr=({albums:t,setAlbums:i,isSavingAny:s,onSaveAlbum:a,onRemoveAlbum:d,onShowPasswordDialog:f,columns:r,setColumns:n,enhancedLog:l})=>{const{language:g}=fe(),x=De(g)==="rtl",h=c.useCallback((o,T)=>{i(B=>B.map(D=>D.id===o?{...D,...T}:D))},[i]),u=c.useCallback(async o=>{try{const T=await a(o);return l(`Album ${o} save result: ${T?"success":"failed"}`),T}catch(T){return l(`Error saving album ${o}: ${T}`),!1}},[a,l]);return e.jsx("div",{children:e.jsx(mr,{$isRTL:x,children:t.map(o=>e.jsx(gr,{album:o,onUpdate:T=>h(o.id,T),onSave:()=>u(o.id),onRemove:()=>d(o.id),onShowPasswordDialog:f,disabled:s,columns:r,setColumns:n,enhancedLog:l},o.id))})})},xr=()=>{var Ie,Ae;const{t,language:i}=fe(),s=De(i)==="rtl",[a,d]=c.useState([]),[f,r]=c.useState("2"),[n,l]=c.useState(!1),[g,x]=c.useState(!1),[h,u]=c.useState(null),[o,T]=c.useState(null),[B,D]=c.useState(!1),[C,Q]=c.useState(0),[ee,w]=c.useState(0),[se,ae]=c.useState(""),[X,R]=c.useState({isOnPublicProfile:!1,participantsCanAddItems:!0,participantsCanDeleteItems:!1,passwordProtectionOption:"NoPassword",albumPassword:""}),ie=At(t),{setShowUsernamePrompt:U,setUsernameInput:W}=ie,[J,Z]=c.useState(null);c.useEffect(()=>{const b=localStorage.getItem(me.PUBLIC_USERNAME);Z(b||null)},[]);const m=(b,E)=>{const K=new Date().toISOString();console.log(`[${K}] ${b}`,E)};c.useEffect(()=>{(async()=>{try{const E=await we();if(E){const M=JSON.parse(atob(E.split(".")[1]))["cognito:username"];M&&(T(M),m(`Initialized Cognito username: ${M}`))}}catch(E){console.error("Error initializing username:",E)}})()},[]);const v=b=>{r(b),localStorage.setItem("save-album-columns",b),m(`Column setting changed to ${b} for all albums`)};c.useEffect(()=>{const b=localStorage.getItem(me.MULTI_ALBUM_DATA);if(b)try{const K=JSON.parse(b).filter(L=>{if(!L||!L.name||!Array.isArray(L.selectedPhotos))return!1;const oe=L.selectedPhotos.filter(ce=>ce&&ce.fileName&&ce.originalFileName&&ce.s3PreviewUrl&&ce.s3PreviewUrl.includes("amazonaws.com"));return L.selectedPhotos=oe,oe.length>0});if(K.length===0){alert(t("No valid albums were found. Please try selecting your files again.")),Re("my-albums.html");return}const M=K.map(L=>({id:gt(),name:L.name,description:"",photos:L.selectedPhotos,selectedPhotoIndices:new Set,photoTagsMap:new Map,isOnPublicProfile:!1,participantsCanAddItems:!0,participantsCanDeleteItems:!1,passwordProtectionOption:"NoPassword",albumPassword:"",isSaving:!1,savingProgress:0,folderId:""}));d(M),Ve()}catch(E){console.error("Error parsing multi-album data:",E),alert(t("There was an error loading your albums. Please try selecting your files again.")),Re("my-albums.html")}else alert(t("No album data was found. Please try selecting your files again.")),Re("my-albums.html")},[t]),c.useEffect(()=>{const b=localStorage.getItem("save-album-columns")||"2";r(b)},[]);const H=(b,E)=>{m(`Album ${b} progress: ${E}`)},G=(b,E)=>{d(K=>K.map(M=>M.id===b?{...M,savingProgress:E}:M))},te=async(b,E,K)=>{m(`Starting chunked save for album ${b}`),H(b,t("Processing files in chunks..."));const M=48;if(K.length===0)m(`No file references for album ${b}, saving only folder position`),await Fe.saveFolderOnly(E,m);else{const L=Ot(K);m(`Album ${b}: Processing ${L.length} unique file references`);const oe=Mt(L,M);m(`Album ${b}: Split into ${oe.length} chunks`);for(let ce=0;ce<oe.length;ce++){const je=oe[ce];m(`Album ${b}: Processing chunk ${ce+1} of ${oe.length}`);const p=ce/oe.length*80;G(b,10+p),ce<oe.length-1?(H(b,t("Saving files: chunk {{chunkNumber}} of {{totalChunks}}...",{chunkNumber:ce+1,totalChunks:oe.length})),await Fe.saveFileReferences(je,m)):(H(b,t("Finalizing album...")),await Fe.saveFinalChunkWithFolder(je,E,m))}}G(b,100),H(b,t("Album saved successfully!"))},q=async b=>{const E=a.find(K=>K.id===b);if(!E)return m(`Album ${b} not found`),!1;if(E.photos.length===0)return alert(t('The album "{{albumName}}" has no photos to save.',{albumName:E.name})),!1;if(!o)return m(`No Cognito username available for album ${b}`),!1;m(`Starting real save for album: ${E.name}`),d(K=>K.map(M=>M.id===b?{...M,isSaving:!0,savingProgress:5}:M));try{const K=Math.floor(Date.now()/1e3),M=`${o}_____${gt()}____Folder`,L=`${o}_____${o}____Account`,ce=M.split("_____")[1].split("____")[0];m(`Album ${b} folder ID: ${M}`),d($=>$.map(k=>k.id===b?{...k,folderId:M}:k));const je=Bt(K,L,ce,M,o,E.isOnPublicProfile,E.participantsCanAddItems,E.participantsCanDeleteItems,E.passwordProtectionOption,E.albumPassword,E.name,E.description,!1,[],m),p=E.photos.filter($=>$.status==="complete");m(`Album ${b}: ${p.length} valid photos`);let j=[];if(p.length>0){const $=p.filter(k=>!k.fileId);$.length>0&&(m(`Album ${b}: Moving ${$.length} files to public folder`),H(b,t("Moving files...")),await It($,k=>G(b,k),m)),m(`Album ${b}: Creating file reference inputs`),j=Ut(p,K,L,M,o,E.photoTagsMap,m)}return await te(b,je,j),d($=>$.map(k=>k.id===b?{...k,isSaving:!1,savingProgress:100}:k)),m(`Successfully saved album: ${E.name}`),!0}catch(K){return console.error(`Error saving album ${b}:`,K),m(`Error saving album ${b}: ${K}`),d(M=>M.map(L=>L.id===b?{...L,isSaving:!1,savingProgress:0}:L)),alert(t('Failed to save album "{{albumName}}". Please try again.',{albumName:E.name})),!1}},re=async()=>{if(J!=null&&J.startsWith("Profile-")){W(""),U(!0);return}if(!o){alert(t("Unable to determine user credentials. Please refresh and try again."));return}const b=a.filter(M=>M.savingProgress<100);if(b.length===0)return;m(`Starting save process for ${b.length} albums`),D(!0),w(b.length),Q(0);let E=0;const K=[];try{for(let M=0;M<b.length;M++){const L=b[M];Q(M+1),ae(L.name),m(`Saving album ${M+1} of ${b.length}: ${L.name}`),await q(L.id)?E++:K.push(L.name),await new Promise(ce=>setTimeout(ce,200))}if(K.length===0)m("All albums saved successfully, cleaning up and redirecting"),setTimeout(()=>{localStorage.removeItem(me.MULTI_ALBUM_DATA),Ve(),sessionStorage.setItem("album_just_saved","true"),Re("my-albums.html")},1e3);else{const M=K.length===1?t('Failed to save album "{{albumName}}". Please try again.',{albumName:K[0]}):t("Failed to save {{count}} albums: {{albumNames}}. Please try again.",{count:K.length,albumNames:K.join(", ")});alert(M)}}catch(M){console.error("Error in save all albums:",M),alert(t("There was an error saving albums. Please try again."))}finally{D(!1),Q(0),w(0),ae("")}},he=b=>{localStorage.setItem(me.PUBLIC_USERNAME,b),Z(b),U(!1),D(!1),Q(0),w(0),ae(""),re()},pe=b=>{const E=a.find(K=>K.id===b);E&&(u(b),R(K=>({...K,passwordProtectionOption:E.passwordProtectionOption,albumPassword:E.albumPassword})),x(!0))},ge=()=>{u(null),x(!0)},$e=(b,E)=>{b!==void 0&&E!==void 0&&(h?d(K=>K.map(M=>M.id===h?{...M,passwordProtectionOption:b,albumPassword:E}:M)):R(K=>({...K,passwordProtectionOption:b,albumPassword:E}))),x(!1),u(null)},Pe=()=>{d(b=>b.map(E=>({...E,isOnPublicProfile:X.isOnPublicProfile,participantsCanAddItems:X.participantsCanAddItems,participantsCanDeleteItems:X.participantsCanDeleteItems,passwordProtectionOption:X.passwordProtectionOption,albumPassword:X.albumPassword}))),l(!1),m("Applied global settings to all albums",X)},ye=b=>{const E=a.find(M=>M.id===b);if(E&&!confirm(t('Are you sure you want to remove the album "{{albumName}}"?',{albumName:E.name})))return;const K=a.filter(M=>M.id!==b);d(K),K.length===0&&(localStorage.removeItem(me.MULTI_ALBUM_DATA),Ve(),Re("my-albums.html"))},ue=a.some(b=>b.isSaving)||B,Ne=a.some(b=>b.savingProgress<100);return e.jsxs(e.Fragment,{children:[e.jsx(Dt,{}),e.jsx("style",{children:`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}),e.jsx(Et,{children:e.jsxs(_t,{children:[e.jsx(Nt,{href:"my-albums.html",children:t("Back to Albums")}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx(ei,{children:t("Columns:")}),e.jsxs(ti,{value:f,onChange:b=>v(b.target.value),disabled:ue,children:[e.jsx("option",{value:"1",children:"1"}),e.jsx("option",{value:"2",children:"2"}),e.jsx("option",{value:"3",children:"3"}),e.jsx("option",{value:"4",children:"4"}),e.jsx("option",{value:"5",children:"5"})]})]}),e.jsxs("div",{style:{position:"relative"},children:[e.jsx(rs,{onClick:()=>l(!n),disabled:ue,title:t("Global Settings for All Albums")}),e.jsx(ki,{showGlobalGear:n,globalSettings:X,setGlobalSettings:R,onPasswordClick:ge,onApplySettings:Pe})]}),Ne&&e.jsx(st,{$primary:!0,onClick:re,disabled:ue,style:{minWidth:"160px",fontSize:"14px",padding:"8px 16px"},children:B?t("Saving {{current}} of {{total}}...",{current:C,total:ee}):a.length===1?t("Save 1 Album"):t("Save {{count}} Albums",{count:a.filter(b=>b.savingProgress<100).length})})]})]})}),e.jsxs(Rt,{$isRTL:s,children:[B&&e.jsxs("div",{style:{marginBottom:"24px",padding:"20px",backgroundColor:"#e3f2fd",border:"2px solid #2196f3",borderRadius:"12px",boxShadow:"0 4px 12px rgba(33, 150, 243, 0.1)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"16px",marginBottom:"16px"},children:[e.jsx("div",{style:{width:"24px",height:"24px",border:"3px solid #e3f2fd",borderTop:"3px solid #2196f3",borderRadius:"50%",animation:"spin 1s linear infinite"}}),e.jsxs("div",{children:[e.jsxs("div",{style:{fontSize:"16px",fontWeight:"600",color:"#1565c0",marginBottom:"4px"},children:[t("Saving Albums")," (",C," / ",ee,")"]}),e.jsx("div",{style:{fontSize:"14px",color:"#1976d2"},children:t("Currently saving: {{albumName}}",{albumName:se})})]})]}),e.jsx("div",{style:{width:"100%",height:"8px",backgroundColor:"#bbdefb",borderRadius:"4px",overflow:"hidden"},children:e.jsx("div",{style:{width:`${C/ee*100}%`,height:"100%",backgroundColor:"#2196f3",transition:"width 0.3s ease",borderRadius:"4px"}})}),e.jsx("div",{style:{marginTop:"8px",fontSize:"12px",color:"#1976d2",textAlign:"center"},children:t("Please wait while your albums are being saved...")})]}),e.jsx(hr,{albums:a,setAlbums:d,isSavingAny:ue,onSaveAlbum:q,onRemoveAlbum:ye,onShowPasswordDialog:pe,columns:f,setColumns:v,enhancedLog:m})]}),e.jsx(as,{isOpen:g,onClose:$e,initialOption:h?((Ie=a.find(b=>b.id===h))==null?void 0:Ie.passwordProtectionOption)||"NoPassword":X.passwordProtectionOption,initialPassword:h?((Ae=a.find(b=>b.id===h))==null?void 0:Ae.albumPassword)||"":X.albumPassword}),e.jsx(jt,{t,language:i,usernameManager:ie,onSuccess:he})]})},br=()=>{const[t,i]=c.useState(!1),[s,a]=c.useState(!1);return c.useEffect(()=>{if(typeof window<"u"){const f=new URLSearchParams(window.location.search).get("mode");i(f==="multiple"),a(!0)}},[]),s?t?e.jsx(xr,{}):e.jsx(vt,{}):e.jsx(vt,{})},wr=()=>e.jsx(Os,{children:e.jsx(br,{})});if(typeof document<"u"){const t=document.getElementById("root");t&&zs.createRoot(t).render(e.jsx(wr,{}))}
