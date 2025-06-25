import{h as me,f as ke,r as c,L as pe,i as dt,s as Ds,k as Es,l as _s,m as $t,n as Ns,a as De,d as A,o as xe,u as ue,j as e,g as Ie,p as Rs,R as zs,I as Os}from"./utils-Dg1WdiuL.js";import{F as Ms}from"./types-CyPfckSQ.js";import{u as Bs,U as Us}from"./UploadProgress-BbvDDDzm.js";import{u as Pt,U as It}from"./UsernamePrompt-CFi396Q_.js";import{L as Gs}from"./LazyImage-B-l0icNJ.js";import{P as Ws,S as Ks,e as Hs,V as qs,f as Js,g as At,h as jt,M as Qs,C as Ct,i as Vs,j as Ys,F as ct,k as ut,l as Xs,m as Zs,G as kt,n as Ft,o as Dt,p as Et,B as Le,q as _t,r as Ls,s as ei,t as ti}from"./styled-components-CkPYYn5H.js";import{g as pt,c as qe}from"./folderStructureUtils-BmdkosLC.js";const si=`
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
`;class Pe{static async fetchFolderDetails(i,s){var o,u,g,r,a,l,f,b,x;s(`Fetching details for folder ID: ${i}`);try{const p=await me();if(!p)return s("No token available for fetching folder details"),null;s("Sending GraphQL query to fetch folder details");const P=await(await fetch(ke,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${p}`},body:JSON.stringify({query:si,variables:{folderIds:[i],fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(s("Folder details API response:",P),P.errors)return console.error("GraphQL errors:",P.errors),s(`GraphQL errors: ${JSON.stringify(P.errors)}`),null;const W=((u=(o=P==null?void 0:P.data)==null?void 0:o.fetchFolders)==null?void 0:u.items)||[];if(s(`Found ${W.length} folder items`),W.length===0)return s("No folder items found"),null;const D=W[0];s("Retrieved folder data:",D);const j=((r=(g=D.folderPosition)==null?void 0:g.profileIds)==null?void 0:r.some(y=>y.includes("Public____Profile")))||!1;s(`Folder is on public profile: ${j}`),s("Profile IDs:",(a=D.folderPosition)==null?void 0:a.profileIds);const V=(l=D.folderInviteParameters)==null?void 0:l.usingFolderInviteGrantsRightToAddItems;s(`Participants can add items: ${V}`);const ee=(f=D.folderInviteParameters)==null?void 0:f.usingFolderInviteGrantsRightToRemoveItems;return s(`Participants can delete items: ${ee}`),{creatorId:D.creatorId||"",folderName:D.folderName||"",folderDescription:D.folderDescription||"",passwordPolicy:((b=D.folderPassword)==null?void 0:b.policy)||"NoPassword",password:((x=D.folderPassword)==null?void 0:x.password)||"",isOnPublicProfile:j,participantsCanAddItems:V!==void 0?V:!0,participantsCanDeleteItems:ee!==void 0?ee:!1}}catch(p){return console.error("Error in fetchFolderDetails:",p),s(`Error in fetchFolderDetails: ${p}`),null}}static async saveFolderOnly(i,s){var g,r;s("Sending folder-only mutation (no file references, no folder tags)");const o=await me();if(!o)throw s("No token available for saving album, aborting"),new Error("Authentication token not available");const u={folderPositionInputs:[i]};s("GraphQL folder-only mutation variables:",u);try{s("Sending API request to save folder");const a=await fetch(ke,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({query:ii,variables:u})});s(`API response status: ${a.status}`);const l=await a.text();s(`API response raw text: ${l}`);const f=JSON.parse(l);if(s("API response JSON:",f),f.errors)throw console.error("Folder save failed:",f.errors),s("Folder save failed with errors:",f.errors),new Error("Failed to save folder");return s("Folder saved successfully"),((r=(g=f.data)==null?void 0:g.changeFiles)==null?void 0:r.items)||[]}catch(a){throw console.error("Error in saveFolderOnly:",a),s(`Error in saveFolderOnly: ${a}`),a}}static async saveFileReferences(i,s){var g,r,a,l,f;s(`Sending file references-only mutation with ${i.length} items (each with individual tags and filenames)`);const o=await me();if(!o)throw s("No token available for saving file references, aborting"),new Error("Authentication token not available");const u={updatedFileReferenceInputs:i};s("GraphQL file references-only mutation variables (first item):",i.length>0?i[0]:"No items");try{s("Sending API request to save file references with individual tags and filenames");const b=await fetch(ke,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({query:ri,variables:u})});s(`API response status: ${b.status}`);const x=await b.text();s(`API response raw text: ${x.substring(0,500)}...`);const p=JSON.parse(x);if(s("API response JSON items count:",((a=(r=(g=p.data)==null?void 0:g.changeFiles0)==null?void 0:r.items)==null?void 0:a.length)||0),p.errors)throw console.error("File references save failed:",p.errors),s("File references save failed with errors:",p.errors),new Error("Failed to save file references");return s("File references chunk saved successfully with individual photo tags and filenames"),((f=(l=p.data)==null?void 0:l.changeFiles0)==null?void 0:f.items)||[]}catch(b){throw console.error("Error in saveFileReferences:",b),s(`Error in saveFileReferences: ${b}`),b}}static async saveFinalChunkWithFolder(i,s,o){var r,a,l,f,b,x,p,n,P;o(`Sending final chunk with folder mutation (${i.length} file references with filenames, no folder tags)`);const u=await me();if(!u)throw o("No token available for saving final chunk, aborting"),new Error("Authentication token not available");const g={folderPositionInputs:[s],updatedFileReferenceInputs:i};o("GraphQL final mutation variables (folder + last chunk with filenames, no folder tags)");try{o("Sending API request for final save with folder (no folder tags, with filenames)");const W=await fetch(ke,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${u}`},body:JSON.stringify({query:ai,variables:g})});o(`API response status: ${W.status}`);const D=await W.text();o(`API response raw text: ${D.substring(0,500)}...`);const j=JSON.parse(D);if(o("API response JSON:",{fileReferencesCount:((l=(a=(r=j.data)==null?void 0:r.changeFiles0)==null?void 0:a.items)==null?void 0:l.length)||0,folderItems:((b=(f=j.data)==null?void 0:f.changeFiles)==null?void 0:b.items)||[]}),j.errors)throw console.error("Final save failed:",j.errors),o("Final save failed with errors:",j.errors),new Error("Failed to complete album save");return o("Final chunk and folder saved successfully (with individual photo tags and filenames)"),{fileReferences:((p=(x=j.data)==null?void 0:x.changeFiles0)==null?void 0:p.items)||[],folderPositions:((P=(n=j.data)==null?void 0:n.changeFiles)==null?void 0:P.items)||[]}}catch(W){throw console.error("Error in saveFinalChunkWithFolder:",W),o(`Error in saveFinalChunkWithFolder: ${W}`),W}}static async deleteFileReferences(i,s){var g,r;s(`Deleting ${i.length} file references: ${i.join(", ")}`);const o=await me();if(!o)throw s("No token available for deleting file references, aborting"),new Error("Authentication token not available");const u={deletedFileReferenceIds:i};s("GraphQL delete file references mutation variables:",u);try{s("Sending API request to delete file references");const a=await fetch(ke,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({query:oi,variables:u})});s(`API response status: ${a.status}`);const l=await a.text();s(`API response raw text: ${l}`);const f=JSON.parse(l);if(s("API response JSON:",f),f.errors)throw console.error("File references deletion failed:",f.errors),s("File references deletion failed with errors:",f.errors),new Error("Failed to delete file references");return s(`Successfully deleted ${i.length} file references`),((r=(g=f.data)==null?void 0:g.changeFiles)==null?void 0:r.items)||[]}catch(a){throw console.error("Error in deleteFileReferences:",a),s(`Error in deleteFileReferences: ${a}`),a}}}const ni=(t,i,s,o,u,g,r,a,l,f,b,x,p,n)=>{const[P,W]=c.useState(null),[D,j]=c.useState(null),[V,ee]=c.useState(!1),[y,L]=c.useState(!1);c.useEffect(()=>{L(!0)},[]);const te=U=>{if(!y)return null;try{return localStorage.getItem(U)}catch{return null}},X=async U=>{n(`Initializing folder ID with username: ${U}`);try{if(!y)return;const q=new URLSearchParams(window.location.search).get("folderId");if(n(`Folder ID from URL: ${q||"null"}`),q){t(q),n(`Using existing folder ID: ${q}`);try{n(`Fetching details for folder: ${q}`);const m=await Pe.fetchFolderDetails(q,n);if(n("Folder details retrieved:",m),m){const $=`${U}_____${U}____Account`,B=m.creatorId===$;if(n(`User is creator of folder: ${B}, accountId: ${$}, creator: ${m.creatorId}`),s(B),B){n("User is creator, showing folder details"),o(!0),u(m.folderName),g(m.folderDescription),r(m.isOnPublicProfile),n(`Setting isOnPublicProfile: ${m.isOnPublicProfile}`),m.participantsCanAddItems!==void 0&&(a(m.participantsCanAddItems),n(`Setting participantsCanAddItems: ${m.participantsCanAddItems}`)),m.participantsCanDeleteItems!==void 0&&(p(m.participantsCanDeleteItems),n(`Setting participantsCanDeleteItems: ${m.participantsCanDeleteItems}`));const H=m.passwordPolicy;n(`Password policy from folder details: ${H}`),l(H),H!=="NoPassword"&&m.password&&f(m.password),n(`Set password protection option to: ${H}`)}else n("User is NOT the creator, hiding editable fields"),o(!1)}else n("No folder details retrieved, setting isCreator to true"),s(!0),o(!0)}catch(m){console.error("Error fetching folder details:",m),n(`Error fetching folder details: ${m}`),s(!1)}}else{const m=`${U}_____${dt()}____Folder`;n(`Creating new folder ID: ${m}`),t(m),n("Setting isCreator to true for new album"),s(!0),o(!0)}}catch(Q){console.error("Folder ID initialization error:",Q),n(`Folder ID initialization error: ${Q}`),s(!1)}},R=()=>{if(y){n("Attempting to restore photos from localStorage");try{const U=te(pe.SELECTED_PHOTOS);if(n(`Found stored photos: ${U?"yes":"no"}`),U)try{const Q=JSON.parse(U);n(`Parsed ${Q.length} photos from localStorage`),Array.isArray(Q)&&Q.length>0&&(i(Q),n(`Restored ${Q.length} photos to state (including original filenames)`))}catch(Q){console.error("Error parsing stored photos:",Q),n(`Error parsing stored photos: ${Q}`)}}catch(U){console.error("Error restoring photos from storage:",U),n(`Error restoring photos from storage: ${U}`)}}},ie=()=>{n("Testing S3 connection");try{Ds?n("S3 client is available"):(console.error("S3 client not available"),n("S3 client not available"))}catch(U){console.error("S3 connection test error:",U),n(`S3 connection test error: ${U}`)}},G=async()=>{var U;if(y){n("Starting component initialization");try{n("Checking login with refresh");const Q=await me();if(!Q){n("No token returned from login check, aborting initialization");return}try{const q=te(pe.PUBLIC_USERNAME);n(`Retrieved public username from localStorage: ${q||"null"}`),j(q||null);const $=JSON.parse(atob(Q.split(".")[1]))["cognito:username"];if($){n(`Extracted Cognito username from token: ${$}`),W($);const B=te(pe.SUB_ALBUM_DATA);if(n(`Sub-album data from localStorage: ${B||"null"}`),B)try{const H=JSON.parse(B);if(n("Parsed sub-album data:",H),H.isSubAlbum&&((U=H.selectedFileIds)==null?void 0:U.length)>0){n(`Valid sub-album data found with ${H.selectedFileIds.length} files`),b(!0),x(H.selectedFileIds),H.selectedPhotos&&H.selectedPhotos.length>0&&(n(`Found ${H.selectedPhotos.length} selected photos in sub-album data`),i(H.selectedPhotos)),o(!0),s(!0);const re=`${$}_____${dt()}____Folder`;n(`Generated new folder ID for sub-album: ${re}`),t(re)}else n("Invalid sub-album data, proceeding with normal initialization"),await X($)}catch(H){console.error("Error parsing sub-album data:",H),n(`Error parsing sub-album data: ${H}`),await X($)}else n("No sub-album data found, proceeding with normal folder initialization"),await X($)}else n("No Cognito username found in token")}catch(q){console.error("User data initialization error:",q),n(`User data initialization error: ${q}`)}R(),ie(),n("Component initialization completed")}catch(Q){console.error("Initialization error:",Q),n(`Initialization error: ${Q}`)}finally{ee(!0)}}};return c.useEffect(()=>{y&&G()},[y]),{cognitoUsername:P,publicUsername:D,setPublicUsername:j,isInitialized:V}},Nt=t=>t.map(i=>({TagType:i.TagType,tagTitle:i.tagTitle,subtags:i.subtags.map(s=>({TagType:i.TagType,tagTitle:s.tagTitle,subtagTitle:s.subtagTitle}))})),Rt=t=>{const i=new Set;return t.filter(s=>i.has(s.fileId)?!1:(i.add(s.fileId),!0))},zt=(t,i)=>{const s=[];for(let o=0;o<t.length;o+=i)s.push(t.slice(o,o+i));return s},Ot=(t,i,s,o,u,g,r,a,l,f,b,x,p,n,P)=>{P("Creating folder position input WITHOUT folder-level tags"),P(`Profile visibility: ${g?"Public":"Only Me"}`);const W=g?[`${u}_____Public____Profile`]:["Only Me_____Only Me____Profile"];P(`Profile IDs: ${JSON.stringify(W)}`);let D=[];p&&n.length>0&&(P(`Creating file reference IDs for ${n.length} sub-album files`),D=n.map(y=>{const L=y.split("_____");if(L.length>=2){const X=L[1].split("____")[0],R=`${s}_____${X}____FileReference`;return P(`Created file reference ID for sub-album: ${R}`),R}return P(`Using original fileId as fallback: ${y}`),y})),P(`Created ${D.length} acceptedFileReferenceIds`);const j=l!=="NoPassword"?f:null;if(P(`Password protection: ${l}`),P(`Album password: ${j?"******":"null"}`),P(`Participants can add items: ${r}`),P(`Participants can delete items: ${a}`),!o)throw P("Error: folderId is null or undefined"),new Error("folderId is required to create folder position input");const V=Es(o),ee=_s(V);return{currentTime:t,folderId:o,profileIds:W,folderPositionPoints:1,acceptedFileReferenceIds:D,folderInput:{folderAboutContactIds:[i],albumNanoId:ee,folderName:b,folderDescription:x,folderPasswordInput:{password:j,policy:l},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:r,usingFolderInviteGrantsRightToRemoveItems:a,addedItemsNeedFolderCreatorApproval:!1}}}},Mt=(t,i,s,o,u,g,r)=>(r(`Creating file reference inputs with individual photo tags and original filenames for ${t.length} photos`),t.map((a,l)=>{var P;const f=g.get(l)||[],b=Nt(f),x=a.originalFileName||a.fileName;if(r(`Photo ${l} (${a.fileName}): ${f.length} tags applied, display name: ${x}`),a.fileId)return r(`Using existing fileId for photo: ${a.fileId}`),{fileReferencesHolderId:o,currentTime:i,points:1,hasBeenDeleted:!1,selectedTagInputs:b,fileId:a.fileId,fileDisplayName:x,fileInput:null};const p=a.type==="video"||(P=a.type)!=null&&P.startsWith("video")?`Input/Video/${a.fileName}`:`Input/Image/${a.fileName}`,n=`${u}_____${a.fileName}____File`;return r(`Created file reference for ${a.fileName}:`),r(`  - dataKey: ${p}`),r(`  - fileId: ${n}`),r(`  - fileDisplayName: ${x}`),r(`  - thumbnailDataKey: ${a.thumbnailDataKey||"undefined"}`),r(`  - size: ${a.size}`),r(`  - thumbnailSize: ${a.thumbnailSize||0}`),r(`  - duration: ${a.duration||"undefined"}`),r(`  - tags: ${f.length} tags selected for this photo`),{fileReferencesHolderId:o,currentTime:i,points:1,hasBeenDeleted:!1,selectedTagInputs:b,fileId:n,fileDisplayName:x,fileInput:{fileId:n,ownerFileInput:{editorContactIds:[s],FileSharingOptionsEnum:"Anyone",dataKey:p,thumbnailDataKey:a.thumbnailDataKey,dataInBytes:a.size,thumbnailDataInBytes:a.thumbnailSize||0,s3UploadedAt:i,durationInSeconds:a.duration},editorFileInput:{aboutContactIds:[s],captionText:"",numericFilterInputs:[]}}}})),li=(t,i,s,o,u,g,r)=>{const a=[];return u.forEach(l=>{const f=g.get(l)||[];if(f.length>0){const b=o[l];if(b){const x=b.dataKey.split("/"),p=x[x.length-1],n=`${s}_____${p}____File`,P=b.fileName||p,W=Nt(f);r(`Creating file reference for existing file ${l} (${p}) with ${f.length} tags, display name: ${P}`),a.push({fileReferencesHolderId:i,currentTime:t,points:1,hasBeenDeleted:!1,selectedTagInputs:W,fileId:n,fileDisplayName:P,fileInput:null})}}}),r(`Created ${a.length} file references for existing files with tags and filenames`),a},di=(t,i,s,o,u,g,r,a,l,f,b,x,p,n,P,W,D,j,V,ee,y,L)=>{const[te,X]=c.useState(!1);c.useEffect(()=>{X(!0)},[]);const R=m=>{if(y(`Save progress text: ${m}`),!!te)try{const $=document.getElementById("saveProgressText");$&&($.innerText=m)}catch($){y(`Failed to update progress text in DOM: ${$}`)}},ie=m=>{if(te)try{const $=document.getElementById("saveProgress");$?($.style.width=`${m}%`,y(`Updated save progress bar: ${m}%`)):y("Progress bar element not found")}catch($){y(`Failed to update progress bar: ${$}`)}j(m)},G=()=>(y("Validating required data"),i?t?(y("All required data validated successfully"),!0):(y("No folder ID, validation failed"),!1):(y("No Cognito username, validation failed"),!1)),U=()=>{if(y("Handling successful save"),Ns(V,ee,[pe.SELECTED_PHOTOS,pe.SUB_ALBUM_DATA],y),y("Album data cleared"),R(L("Album saved successfully!")),te)try{sessionStorage.setItem("album_just_saved","true"),y("Set 'album_just_saved' flag in sessionStorage")}catch(m){y(`Failed to set sessionStorage flag: ${m}`)}y("Setting timeout for redirect to my-albums.html"),setTimeout(()=>{y("Redirecting to my-albums.html"),De("my-albums.html")},1e3)},Q=async(m,$)=>{y("Starting chunked save process (individual photo tags with filenames, no folder tags, including existing files with tags)");try{R(L("Processing files in chunks..."));const B=48;if($.length===0)y("No file references to process, saving only folder position (no folder tags)"),await Pe.saveFolderOnly(m,y);else{const H=Rt($);y(`After removing duplicates, processing ${H.length} unique file references`);const re=zt(H,B);y(`Split file references into ${re.length} chunks of max size ${B}`);for(let J=0;J<re.length;J++){const ae=re[J];y(`Processing chunk ${J+1} of ${re.length} with ${ae.length} file references`);const he=J/re.length*80;j(10+he),ie(10+he),J<re.length-1?(R(L("Saving files: chunk {{chunkNumber}} of {{totalChunks}}...",{chunkNumber:J+1,totalChunks:re.length})),await Pe.saveFileReferences(ae,y)):(R(L("Finalizing album...")),await Pe.saveFinalChunkWithFolder(ae,m,y))}}j(100),ie(100),R(L("Album saved successfully!")),U()}catch(B){console.error("Error in chunked save process:",B),y(`Error in chunked save process: ${B}`),R(L("Error: {{error}}",{error:String(B)})),D(!1)}};return{saveAlbumDirectly:async()=>{y("Starting direct album save with individual photo tagging, existing file tagging, and original filenames"),y(`Photo tags map: ${p.size} photos have tags applied`),y(`Existing file tags map: ${n.size} existing files have tags applied`),D(!0),j(5);try{if(y("Validating required data for save"),!G()){y("Required data validation failed, aborting save"),D(!1);return}const m=Math.floor(Date.now()/1e3),$=`${i}_____${i}____Account`,H=t.split("_____")[1].split("____")[0];y(`Save timestamp: ${m}`),y(`Account ID: ${$}`),y(`Folder ID: ${t}`),y(`Folder target item identifier: ${H}`),y("Creating folder position input (no folder tags)");const re=Ot(m,$,H,t,i,a,l,f,b,x,g,r,o,u,y);y("Folder position input created:",re);let J=[];const ae=s.filter(le=>le.status==="complete");if(y(`Found ${ae.length} valid photos with 'complete' status`),ae.length>0){const le=ae.filter(we=>!we.fileId);y(`Found ${le.length} new uploads to move from temp to public folder`),le.length>0&&(y("Moving files from temp to public folder"),await $t(le,ie,y)),y("Creating file reference inputs for uploads with individual photo tags and original filenames");const ce=Mt(ae,m,$,t,i,p,y);y(`Created ${ce.length} file reference inputs for uploads`,ce),J=J.concat(ce)}const he=li(m,t,i,P,W,n,y);if(he.length>0&&(y(`Adding ${he.length} existing file references with tags and filenames`),J=J.concat(he)),o&&u.length>0){y(`Adding ${u.length} existing file references for sub-album`);const le=u.map(ce=>{y(`Creating file reference for existing sub-album file ID: ${ce}`);const we=[],ye=ce.split("_____"),ve=ye.length>=2?ye[1].split("____")[0]:ce;return{fileReferencesHolderId:t,currentTime:m,points:1,hasBeenDeleted:!1,selectedTagInputs:we,fileId:ce,fileDisplayName:ve,fileInput:null}});y(`Created ${le.length} file reference inputs for sub-album files`,le),J=J.concat(le)}y(`Total file reference inputs: ${J.length}`),y("Sending GraphQL mutations with chunked file references (individual photo tags, existing file tags, and original filenames)"),await Q(re,J)}catch(m){console.error("Error in saveAlbumDirectly:",m),y(`Error in saveAlbumDirectly: ${m}`),D(!1)}}}},ci=`
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
`,Be=()=>typeof crypto<"u"&&crypto.randomUUID?crypto.randomUUID():"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){const i=Math.random()*16|0;return(t=="x"?i:i&3|8).toString(16)}),Bt=(t,i,s,o,u,g,r)=>{const[a,l]=c.useState([]),[f,b]=c.useState(null),[x,p]=c.useState(!1),[n,P]=c.useState(null),[W,D]=c.useState(null),[j,V]=c.useState(!1),[ee,y]=c.useState(!1),[L,te]=c.useState(""),[X,R]=c.useState(""),[ie,G]=c.useState(!1),[U,Q]=c.useState(!1),q=c.useMemo(()=>({photoIndices:Array.from(u),existingIndices:Array.from(g)}),[u,g]),m=c.useCallback(()=>{const d=[];t.forEach(I=>{d.push(...I)}),s.forEach(I=>{d.push(...I)});const v=new Map;return d.forEach(I=>{if(v.has(I.tagTitle)){const M=v.get(I.tagTitle),C=[...M.subtags,...I.subtags],T=Array.from(new Map(C.map(h=>[h.subtagTitle,h])).values());v.set(I.tagTitle,{...M,subtags:T})}else v.set(I.tagTitle,I)}),Array.from(v.values())},[t,s]),$=c.useCallback((d,v)=>{const I=[],M=Math.floor(Date.now()/1e3);return v.forEach(C=>{const T=d.find(h=>h.tagTitle===C.tagTitle);if(T){const h=[];if(C.subtags.forEach(F=>{var _;if(!((_=T.subtags)==null?void 0:_.find(Z=>Z.subtagTitle===F.subtagTitle))){const Z={id:Be(),tagTitle:F.tagTitle,subtagTitle:F.subtagTitle,TagType:C.TagType||"File",points:1,createdAt:M,updatedAt:M,isCreatedFromApplied:!0};h.push(Z),r(`Created missing subtag from applied tags: ${F.subtagTitle} for tag ${F.tagTitle}`)}}),h.length>0){const F=d.findIndex(E=>E.id===T.id);F!==-1&&(d[F]={...T,subtags:[...T.subtags||[],...h]})}}else{const h={id:Be(),tagTitle:C.tagTitle,TagType:C.TagType||"File",points:1,createdAt:M,updatedAt:M,subtags:[],isCreatedFromApplied:!0};C.subtags&&C.subtags.length>0&&(h.subtags=C.subtags.map(F=>({id:Be(),tagTitle:F.tagTitle,subtagTitle:F.subtagTitle,TagType:C.TagType||"File",points:1,createdAt:M,updatedAt:M,isCreatedFromApplied:!0}))),I.push(h),r(`Created missing tag from applied tags: ${C.tagTitle} with ${C.subtags.length} subtags`)}}),I},[r]),B=c.useCallback(d=>{const{photoIndices:v,existingIndices:I}=q;if(v.length===0&&I.length===0)return!1;const M=v.length===0||v.every(h=>(t.get(h)||[]).some(E=>E.tagTitle===d.tagTitle)),C=I.length===0||I.every(h=>(s.get(h)||[]).some(E=>E.tagTitle===d.tagTitle)),T=M&&C;return(v.length>0||I.length>0)&&r(`Tag "${d.tagTitle}" applied to all selected? ${T} (photos: ${M}, existing: ${C})`),T},[q,t,s,r]),H=c.useCallback(d=>{const{photoIndices:v,existingIndices:I}=q;let M=0,C=0;v.forEach(_=>{const se=(t.get(_)||[]).find(Te=>Te.tagTitle===d.tagTitle);se&&(M++,se.subtags.some(Te=>Te.subtagTitle===d.subtagTitle)&&C++)});let T=0,h=0;I.forEach(_=>{const se=(s.get(_)||[]).find(Te=>Te.tagTitle===d.tagTitle);se&&(T++,se.subtags.some(Te=>Te.subtagTitle===d.subtagTitle)&&h++)});const F=M+T,E=C+h;return F>0&&E===F},[q,t,s]),re=c.useCallback(d=>{const{photoIndices:v,existingIndices:I}=q;if(v.length===0&&I.length===0){r("No files selected for tag application");return}const M=B(d);r(`${M?"Removing":"Applying"} tag "${d.tagTitle}" ${M?"from":"to"} all selected files`),v.length>0&&i(C=>{const T=new Map(C);return v.forEach(h=>{const F=T.get(h)||[];if(M){const E=F.filter(_=>_.tagTitle!==d.tagTitle);T.set(h,E),r(`Removed tag "${d.tagTitle}" from photo ${h}`)}else if(!F.some(_=>_.tagTitle===d.tagTitle)){const _={tagTitle:d.tagTitle,TagType:d.TagType,subtags:[]};T.set(h,[...F,_]),r(`Added tag "${d.tagTitle}" to photo ${h}`)}}),T}),I.length>0&&o(C=>{const T=new Map(C);return I.forEach(h=>{const F=T.get(h)||[];if(M){const E=F.filter(_=>_.tagTitle!==d.tagTitle);T.set(h,E),r(`Removed tag "${d.tagTitle}" from existing file ${h}`)}else if(!F.some(_=>_.tagTitle===d.tagTitle)){const _={tagTitle:d.tagTitle,TagType:d.TagType,subtags:[]};T.set(h,[...F,_]),r(`Added tag "${d.tagTitle}" to existing file ${h}`)}}),T})},[q,B,i,o,r]),J=c.useCallback(d=>{const{photoIndices:v,existingIndices:I}=q;if(v.length===0&&I.length===0){r("No files selected for subtag application");return}const M=H(d);r(`${M?"Removing":"Applying"} subtag "${d.subtagTitle}" ${M?"from":"to"} all selected files with parent tag`),v.length>0&&i(C=>{const T=new Map(C);return v.forEach(h=>{const E=(T.get(h)||[]).map(_=>{if(_.tagTitle===d.tagTitle){if(M)return{..._,subtags:_.subtags.filter(Z=>Z.subtagTitle!==d.subtagTitle)};if(!_.subtags.some(se=>se.subtagTitle===d.subtagTitle))return{..._,subtags:[..._.subtags,{tagTitle:d.tagTitle,subtagTitle:d.subtagTitle}]}}return _});T.set(h,E)}),T}),I.length>0&&o(C=>{const T=new Map(C);return I.forEach(h=>{const E=(T.get(h)||[]).map(_=>{if(_.tagTitle===d.tagTitle){if(M)return{..._,subtags:_.subtags.filter(Z=>Z.subtagTitle!==d.subtagTitle)};if(!_.subtags.some(se=>se.subtagTitle===d.subtagTitle))return{..._,subtags:[..._.subtags,{tagTitle:d.tagTitle,subtagTitle:d.subtagTitle}]}}return _});T.set(h,E)}),T})},[q,H,i,o,r]),ae=c.useCallback(()=>{const{photoIndices:d,existingIndices:v}=q,I=[];d.forEach(T=>{const h=t.get(T)||[];I.push(...h)}),v.forEach(T=>{const h=s.get(T)||[];I.push(...h)});const M=new Map;I.forEach(T=>{if(M.has(T.tagTitle)){const h=M.get(T.tagTitle),F=[...h.subtags,...T.subtags],E=Array.from(new Map(F.map(_=>[_.subtagTitle,_])).values());M.set(T.tagTitle,{...h,subtags:E})}else M.set(T.tagTitle,T)});const C=Array.from(M.values());return r(`getAppliedTagsForSelected: ${C.length} unique tags from ${d.length} photos + ${v.length} existing files`),C},[q,t,s,r]),he=c.useCallback(()=>u.size>0||g.size>0,[u.size,g.size]),le=async()=>{var d,v;r("Fetching tags from API and checking for missing applied tags"),p(!0);try{const I=await me();if(!I){r("No token available for fetching tags");return}const C=await(await fetch(ke,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${I}`},body:JSON.stringify({query:ci,variables:{fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(r("Tags API response:",C),C.errors){console.error("GraphQL errors:",C.errors),r(`GraphQL errors: ${JSON.stringify(C.errors)}`);return}let h=(((v=(d=C==null?void 0:C.data)==null?void 0:d.fetchRelations)==null?void 0:v.items)||[]).map(E=>{var _,Z;return{id:E.id,tagTitle:E.tagTitle,TagType:E.TagType,points:E.points,createdAt:E.createdAt,updatedAt:E.updatedAt,subtags:((Z=(_=E.subtags)==null?void 0:_.items)==null?void 0:Z.map(se=>({id:se.id,tagTitle:se.tagTitle,subtagTitle:se.subtagTitle,TagType:se.TagType,points:se.points,createdAt:se.createdAt,updatedAt:se.updatedAt})))||[]}});r(`Fetched ${h.length} tags from API`);const F=m();if(r(`Found ${F.length} unique applied tags in file maps`),F.length>0){const E=$(h,F);E.length>0&&(r(`Created ${E.length} missing tags from applied tags`),h=[...E,...h])}r(`Final tags list: ${h.length} tags (including ${h.filter(E=>E.isCreatedFromApplied).length} created from applied tags)`),l(h)}catch(I){console.error("Error fetching tags:",I),r(`Error fetching tags: ${I}`)}finally{p(!1)}},ce=c.useCallback(d=>{r(`Setting displayed tag: ${d}`),b(d)},[r]),we=c.useCallback(()=>{if(!f)return[];const d=a.find(v=>v.id===f);return(d==null?void 0:d.subtags)||[]},[f,a]),ye=async(d,v)=>{if(r(`Adding new tag: ${d} of type: ${v}`),!d.trim())return r("Cannot add tag with empty title"),!1;G(!0);try{if(!await me())return r("No token available for adding tag"),!1;if(await(async()=>(r("PLACEHOLDER: Would send GraphQL mutation to add tag",{mutation:ui,variables:{tagInput:{tagTitle:d.trim(),TagType:v,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(T=>setTimeout(T,500)),!0))()){const T={id:Be(),tagTitle:d.trim(),TagType:v,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3),subtags:[]};return l(h=>[T,...h]),re(T),ce(T.id),te(""),V(!1),r(`Successfully added and applied new tag: ${d}`),!0}return!1}catch(I){return console.error("Error adding new tag:",I),r(`Error adding new tag: ${I}`),!1}finally{G(!1)}},ve=async(d,v,I)=>{if(r(`Adding new subtag: ${v} to tag: ${d}`),!v.trim())return r("Cannot add subtag with empty title"),!1;if(!f)return r("No displayed tag for adding subtag"),!1;Q(!0);try{if(!await me())return r("No token available for adding subtag"),!1;if(await(async()=>(r("PLACEHOLDER: Would send GraphQL mutation to add subtag",{mutation:pi,variables:{subtagInput:{tagTitle:d,subtagTitle:v.trim(),TagType:I,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(h=>setTimeout(h,500)),!0))()){const h={id:Be(),tagTitle:d,subtagTitle:v.trim(),TagType:I,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3)};return l(F=>F.map(E=>E.id===f?{...E,subtags:[h,...E.subtags||[]]}:E)),J(h),R(""),y(!1),r(`Successfully added and applied new subtag: ${v}`),!0}return!1}catch(M){return console.error("Error adding new subtag:",M),r(`Error adding new subtag: ${M}`),!1}finally{Q(!1)}},de=async d=>{r(`Deleting tag: ${d}`),P(d);try{if(!await me())return r("No token available for deleting tag"),!1;if(await(async()=>(r("PLACEHOLDER: Would send GraphQL mutation to delete tag",{mutation:fi,variables:{tagId:d}}),await new Promise(C=>setTimeout(C,500)),!0))()){const C=a.find(T=>T.id===d);return l(T=>T.filter(h=>h.id!==d)),C&&(i(T=>{const h=new Map(T);return T.forEach((F,E)=>{const _=F.filter(Z=>Z.tagTitle!==C.tagTitle);h.set(E,_)}),h}),o(T=>{const h=new Map(T);return T.forEach((F,E)=>{const _=F.filter(Z=>Z.tagTitle!==C.tagTitle);h.set(E,_)}),h})),f===d&&ce(null),r(`Successfully deleted tag: ${d}`),!0}return!1}catch(v){return console.error("Error deleting tag:",v),r(`Error deleting tag: ${v}`),!1}finally{P(null)}},Fe=async d=>{r(`Deleting subtag: ${d}`),D(d);try{if(!await me())return r("No token available for deleting subtag"),!1;if(await(async()=>(r("PLACEHOLDER: Would send GraphQL mutation to delete subtag",{mutation:gi,variables:{subtagId:d}}),await new Promise(C=>setTimeout(C,500)),!0))()){let C=null;return l(T=>T.map(h=>{var E;const F=((E=h.subtags)==null?void 0:E.filter(_=>_.id===d?(C=_,!1):!0))||[];return{...h,subtags:F}})),C&&(i(T=>{const h=new Map(T);return T.forEach((F,E)=>{const _=F.map(Z=>Z.tagTitle===C.tagTitle?{...Z,subtags:Z.subtags.filter(se=>se.subtagTitle!==C.subtagTitle)}:Z);h.set(E,_)}),h}),o(T=>{const h=new Map(T);return T.forEach((F,E)=>{const _=F.map(Z=>Z.tagTitle===C.tagTitle?{...Z,subtags:Z.subtags.filter(se=>se.subtagTitle!==C.subtagTitle)}:Z);h.set(E,_)}),h})),r(`Successfully deleted subtag: ${d}`),!0}return!1}catch(v){return console.error("Error deleting subtag:",v),r(`Error deleting subtag: ${v}`),!1}finally{D(null)}},Ae=()=>{V(!0),te("")},je=()=>{V(!1),te("")},w=()=>{y(!0),R("")},N=()=>{y(!1),R("")},K=async()=>L.trim()?await ye(L,"File"):!1,O=async()=>{if(X.trim()&&f){const d=a.find(v=>v.id===f);if(d)return await ve(d.tagTitle,X,d.TagType)}return!1};return c.useEffect(()=>{le()},[]),c.useEffect(()=>{const d=m();if(d.length>0&&a.length>0){const v=d.filter(I=>!a.some(M=>M.tagTitle===I.tagTitle));v.length>0&&(r(`Detected ${v.length} new applied tags, refreshing tags list`,v.map(I=>I.tagTitle)),le())}},[t,s,m,a,r]),c.useEffect(()=>{if(r(`Selection changed - Photos: ${u.size}, Existing: ${g.size}`),f){const d=a.find(v=>v.id===f);d&&!B(d)&&(r(`Clearing displayed tag "${d.tagTitle}" because it's no longer applied to all selected files`),b(null))}},[u.size,g.size,f,a,B,r]),c.useEffect(()=>{if(f){const d=a.find(v=>v.id===f);d&&!B(d)&&(r(`Clearing displayed tag "${d.tagTitle}" due to tag map changes`),b(null))}},[t,s,f,a,B,r]),{tags:a,displayedTagId:f,isLoadingTags:x,tagIdBeingDeleted:n,subtagIdBeingDeleted:W,isAddingNewTag:j,isAddingNewSubtag:ee,newTagTitle:L,newSubtagTitle:X,isSubmittingNewTag:ie,isSubmittingNewSubtag:U,fetchTags:le,toggleTagOnSelectedFiles:re,toggleSubtagOnSelectedFiles:J,setDisplayedTag:ce,isTagAppliedToSelected:B,isSubtagAppliedToSelected:H,getDisplayedTagSubtags:we,getAppliedTagsForSelected:ae,hasSelectedFiles:he,addNewTag:ye,addNewSubtag:ve,deleteTag:de,deleteSubtag:Fe,startAddingNewTag:Ae,cancelAddingNewTag:je,startAddingNewSubtag:w,cancelAddingNewSubtag:N,submitNewTag:K,submitNewSubtag:O,setNewTagTitle:te,setNewSubtagTitle:R,extractAllAppliedTags:m,createMissingAppliedTags:$}},mi=A.div`
  margin: 32px 0;
`,Ut=A.div`
  margin-bottom: 24px;
`,Gt=A.h3`
  margin: 0 0 16px 0;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  display: flex;
  align-items: center;
  gap: 12px;
`,Wt=A.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  min-height: 32px;
`,Kt=A.button`
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
`,hi=A(Kt)`
  font-size: 12px;
  padding: 6px 12px;
  border-radius: 16px;
`,Ht=A.button`
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
`,xi=A.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 16px;
`,qt=A.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 16px;
`,Jt=A.button`
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
`,bi=A.div`
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
`,wi=A.input`
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
`,ft=A.button`
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
`,Qt=()=>{const[t,i]=c.useState(!1);return c.useEffect(()=>{const s=()=>{const u="ontouchstart"in window||navigator.maxTouchPoints&&navigator.maxTouchPoints>0||navigator.msMaxTouchPoints&&navigator.msMaxTouchPoints>0;i(u)};s();const o=()=>{s()};return window.addEventListener("resize",o),()=>{window.removeEventListener("resize",o)}},[]),t},yi=xe.memo(({tag:t,isApplied:i,isDisplayed:s,isBeingDeleted:o,disabled:u,onTagClick:g,onDeleteTag:r,getTagDisplayText:a})=>{const{t:l}=ue(),[f,b]=c.useState(!1),x=Qt(),p=x?s&&!u&&!o:f&&s&&!u&&!o;return e.jsxs(Kt,{$isApplied:i,$isDisplayed:s,$isBeingDeleted:o,disabled:u,onClick:()=>g(t),onMouseEnter:()=>!x&&s&&b(!0),onMouseLeave:()=>!x&&s&&b(!1),children:[e.jsx("span",{style:{paddingRight:p?"20px":"0"},children:a(t)}),p&&e.jsx(Ht,{$isMobile:x,onClick:n=>{n.stopPropagation(),r(t.id)},disabled:o,title:l("Delete tag"),children:"×"})]})}),vi=xe.memo(({subtag:t,isApplied:i,isBeingDeleted:s,disabled:o,onSubtagClick:u,onDeleteSubtag:g})=>{const{t:r}=ue(),[a,l]=c.useState(!1),f=Qt(),b=f?i&&!o&&!s:a&&i&&!o&&!s;return e.jsxs(hi,{$isApplied:i,$isBeingDeleted:s,disabled:o,onClick:()=>u(t),onMouseEnter:()=>!f&&i&&l(!0),onMouseLeave:()=>!f&&i&&l(!1),children:[e.jsx("span",{style:{paddingRight:b?"20px":"0"},children:t.subtagTitle}),b&&e.jsx(Ht,{$isMobile:f,onClick:x=>{x.stopPropagation(),g(t.id)},disabled:s,title:r("Delete subtag"),children:"×"})]})}),Vt=({value:t,onChange:i,onSubmit:s,onCancel:o,isSubmitting:u,placeholder:g="Enter tag name..."})=>{const{t:r}=ue(),a=c.useRef(null);c.useEffect(()=>{a.current&&a.current.focus()},[]);const l=f=>{f.key==="Enter"?s():f.key==="Escape"&&o()};return e.jsxs(bi,{children:[e.jsx(wi,{ref:a,type:"text",value:t,onChange:f=>i(f.target.value),onKeyDown:l,placeholder:r(g),disabled:u}),e.jsx(ft,{onClick:s,disabled:!t.trim()||u,title:r("Add (Enter)"),children:u?"...":"✓"}),e.jsx(ft,{onClick:o,disabled:u,title:r("Cancel (Escape)"),children:"×"})]})},Yt=xe.memo(({tagsManager:t,disabled:i=!1,enhancedLog:s})=>{const{t:o}=ue(),{tags:u,displayedTagId:g,isLoadingTags:r,tagIdBeingDeleted:a,isAddingNewTag:l,newTagTitle:f,isSubmittingNewTag:b,toggleTagOnSelectedFiles:x,setDisplayedTag:p,isTagAppliedToSelected:n,deleteTag:P,startAddingNewTag:W,cancelAddingNewTag:D,submitNewTag:j,setNewTagTitle:V,getAppliedTagsForSelected:ee,hasSelectedFiles:y}=t;if(!y())return null;const L=xe.useCallback(G=>{if(!n(G))return G.tagTitle;const q=ee().find($=>$.tagTitle===G.tagTitle);if(!q||q.subtags.length===0)return G.tagTitle;const m=q.subtags.map($=>$.subtagTitle).join(" || ");return o("{{tagTitle}}  |  {{subtags}}",{tagTitle:G.tagTitle,subtags:m})},[n,ee,o]);xe.useEffect(()=>{const G=u.filter(Q=>n(Q)),U=ee();s(`TagsDisplay render - ${G.length} tags applied to all selected files`),s("Applied tags with subtags:",U)},[u,n,ee,s]);const te=G=>{if(i)return;const U=n(G);s(`Tag "${G.tagTitle}" clicked - current state: ${U?"applied to all":"not applied to all"}`),x(G),G.subtags&&G.subtags.length>0&&p(U?null:G.id),s(`After toggle - new state: ${U?"removed from all":"applied to all"}`)},X=async G=>{if(i)return;s(`Delete tag initiated: ${G}`);const U=await P(G);s(U?`Tag successfully deleted: ${G}`:`Failed to delete tag: ${G}`)},R=async()=>{await j()||s("Failed to submit new tag")},ie=xe.useMemo(()=>[...u].sort((G,U)=>G.points!==U.points?U.points-G.points:U.updatedAt-G.updatedAt),[u]);return e.jsxs(mi,{children:[e.jsxs(Ut,{children:[e.jsx(Gt,{children:o("Apply tags to selected files")}),e.jsx(Wt,{children:r?e.jsx(xi,{children:o("Loading tags...")}):e.jsxs(e.Fragment,{children:[ie.map(G=>{const U=n(G);return e.jsx(yi,{tag:G,isApplied:U,isDisplayed:g===G.id,isBeingDeleted:a===G.id,disabled:i,onTagClick:te,onDeleteTag:X,getTagDisplayText:L},G.id)}),l?e.jsx(Vt,{value:f,onChange:V,onSubmit:R,onCancel:D,isSubmitting:b,placeholder:o("Enter tag name...")}):e.jsx(Jt,{disabled:i,onClick:W,children:o("+ Add Tag")}),ie.length===0&&!l&&e.jsx(qt,{children:o("No tags available")})]})})]}),g&&e.jsx(Ti,{tagsManager:t,disabled:i,enhancedLog:s}),e.jsx("div",{style:{marginTop:"24px",padding:"20px 24px",background:"linear-gradient(135deg, #e7f3ff 0%, #f0f8ff 100%)",borderRadius:"12px",fontSize:"13px",color:"#0c5aa6",border:"1px solid #b3d9ff",boxShadow:"0 4px 12px rgba(0, 123, 255, 0.08)"},children:e.jsxs("div",{style:{lineHeight:"2.2"},children:[e.jsxs("div",{style:{marginBottom:"8px"},children:[e.jsx("strong",{style:{color:"#28a745"},children:"🟢"}),"  ",o("Most recently clicked tag (showing subtags)")]}),e.jsxs("div",{style:{marginBottom:"8px"},children:[e.jsx("strong",{style:{color:"#333333"},children:"⚫"}),"  ",o("Applied to selected files")]}),e.jsxs("div",{children:[e.jsx("strong",{style:{color:"#6c757d"},children:"⚪"}),"  ",o("Available but not applied to all selected files")]})]})})]})}),Ti=xe.memo(({tagsManager:t,disabled:i=!1,enhancedLog:s})=>{var X;const{t:o}=ue(),{displayedTagId:u,subtagIdBeingDeleted:g,isAddingNewSubtag:r,newSubtagTitle:a,isSubmittingNewSubtag:l,toggleSubtagOnSelectedFiles:f,isSubtagAppliedToSelected:b,deleteSubtag:x,startAddingNewSubtag:p,cancelAddingNewSubtag:n,submitNewSubtag:P,setNewSubtagTitle:W,tags:D}=t,j=u?((X=D.find(R=>R.id===u))==null?void 0:X.subtags)||[]:[],V=D.find(R=>R.id===u),ee=R=>{i||(s(`Subtag "${R.subtagTitle}" clicked - current state: ${b(R)?"applied to all":"not applied to all"}`),f(R))},y=async R=>{if(i)return;s(`Delete subtag initiated: ${R}`);const ie=await x(R);s(ie?`Subtag successfully deleted: ${R}`:`Failed to delete subtag: ${R}`)},L=async()=>{await P()||s("Failed to submit new subtag")};if(!V)return null;const te=xe.useMemo(()=>[...j].sort((R,ie)=>R.points!==ie.points?ie.points-R.points:ie.updatedAt-R.updatedAt),[j]);return e.jsxs(Ut,{children:[e.jsx(Gt,{children:o('Subtags for "{{tagTitle}}"',{tagTitle:V.tagTitle})}),e.jsxs(Wt,{children:[te.map(R=>e.jsx(vi,{subtag:R,isApplied:b(R),isBeingDeleted:g===R.id,disabled:i,onSubtagClick:ee,onDeleteSubtag:y},R.id)),r?e.jsx(Vt,{value:a,onChange:W,onSubmit:L,onCancel:n,isSubmitting:l,placeholder:o("Enter subtag name...")}):e.jsx(Jt,{disabled:i,onClick:p,children:o("+ Add Subtag")}),te.length===0&&!r&&e.jsx(qt,{children:o("No subtags available")})]})]})}),Si=({photoTags:t,isSelected:i=!1,onToggleSelection:s,fileName:o,showFileName:u=!1})=>{const{t:g}=ue();c.useEffect(()=>{const b="photo-tagging-animations";if(typeof document<"u"&&!document.getElementById(b)){const x=document.createElement("style");x.id=b,x.textContent=`
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
      `,document.head.appendChild(x)}},[]);const a=(b=>b.length===0?"":b.map(x=>{if(x.subtags.length>0){const p=x.subtags.map(n=>n.subtagTitle).join(", ");return g("{{tagTitle}}: {{subtags}}",{tagTitle:x.tagTitle,subtags:p})}return x.tagTitle}).join(" • "))(t),l=t.length>0;return u&&o||l||i?e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"4px"},children:[u&&o&&e.jsx("div",{style:{fontSize:"11px",fontWeight:"600",color:"#333",padding:"4px 8px",backgroundColor:i?"#e3f2fd":"#f8f9fa",borderRadius:"4px",border:`1px solid ${i?"#90caf9":"#e9ecef"}`,textAlign:"center",wordBreak:"break-word",lineHeight:"1.2",transition:"all 0.2s ease"},children:o}),e.jsx("div",{style:{background:l?"linear-gradient(135deg, rgba(0, 123, 255, 0.95) 0%, rgba(0, 123, 255, 0.85) 100%)":"transparent",color:"white",padding:l?"8px 12px":"6px 12px",borderRadius:l?"8px":"6px",fontSize:l?"11px":"10px",cursor:s?"pointer":"default",backdropFilter:l?"blur(6px)":"none",boxShadow:l?"0 4px 12px rgba(0, 123, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)":"none",border:l?"1px solid rgba(255, 255, 255, 0.2)":"none",transition:"all 0.3s ease",lineHeight:"1.3",minHeight:l?"32px":"auto",display:"flex",alignItems:"center",wordBreak:"break-word"},onClick:s,onMouseEnter:b=>{l&&(b.currentTarget.style.transform="translateY(-1px)",b.currentTarget.style.boxShadow="0 6px 16px rgba(0, 123, 255, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3)")},onMouseLeave:b=>{l&&(b.currentTarget.style.transform="translateY(0)",b.currentTarget.style.boxShadow="0 4px 12px rgba(0, 123, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)")},children:l?e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",width:"100%",flexWrap:"wrap"},children:[e.jsx("span",{style:{fontSize:"12px",opacity:.9,flexShrink:0},children:"🏷️"}),e.jsx("span",{style:{fontWeight:"600",textShadow:"0 1px 2px rgba(0, 0, 0, 0.3)",flex:1},children:a})]}):e.jsx("div",{style:{opacity:1,fontStyle:"normal",textAlign:"center",width:"100%",fontSize:i?"11px":"10px",fontWeight:i?"600":"normal",background:i?"white":"transparent",color:i?"#007bff":"white",borderRadius:i?"6px":"0",padding:i?"8px 12px":"0",border:i?"1px solid #007bff":"none",boxShadow:i?"0 2px 8px rgba(0, 123, 255, 0.2)":"none",animation:i?"subtlePulse 2.5s infinite":"none"},children:i?e.jsxs("span",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"4px"},children:[e.jsx("span",{children:"👇"})," ",g("Scroll down to select tags")]}):e.jsx("span",{style:{opacity:.8,fontStyle:"italic"},children:g("No tags applied")})})})]}):null},$i=()=>{c.useEffect(()=>{if(typeof document>"u")return;const t="photo-handler-styles";if(document.getElementById(t))return;const i=document.createElement("style");i.id=t,i.textContent=`
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
    `,document.head.appendChild(i)},[])},gt={traditional:{padding:"20px",border:"2px dashed #007bff",borderRadius:"12px",backgroundColor:"#fff",boxShadow:"0 2px 8px rgba(0, 0, 0, 0.04)"},horizontal:{display:"flex",overflowX:"auto",gap:"16px",padding:"20px",border:"2px dashed #007bff",borderRadius:"12px",backgroundColor:"#fff",boxShadow:"0 2px 8px rgba(0, 0, 0, 0.04)",scrollbarWidth:"thin",scrollbarColor:"#007bff #f8f9fa",scrollBehavior:"smooth",WebkitOverflowScrolling:"touch"}},mt={traditional:{display:"flex",flexDirection:"column",gap:"8px",minWidth:"0"},horizontal:{display:"flex",flexDirection:"column",gap:"8px",minWidth:"180px",maxWidth:"180px",flexShrink:0}},et=xe.memo(({selectedPhotos:t,selectedPhotoIndices:i,isSavingAlbum:s,onRemovePhoto:o,onTogglePhotoSelection:u,photoTagsMap:g,columns:r="1",isMultipleAlbumMode:a=!1})=>{const{t:l}=ue();$i();const f=c.useMemo(()=>{if(a&&r==="horizontal")return gt.horizontal;const p=parseInt(r,10),n=isNaN(p)||p<1?1:Math.min(p,5);return{...gt.traditional,display:"grid",gridTemplateColumns:`repeat(${n}, 1fr)`,gap:"16px"}},[a,r]),b=c.useMemo(()=>a&&r==="horizontal"?mt.horizontal:mt.traditional,[a,r]),x=c.useMemo(()=>a&&r==="horizontal"?"photo-card-horizontal":"photo-card-traditional",[a,r]);return t.length===0?null:e.jsx(e.Fragment,{children:e.jsx("div",{style:f,className:"photo-grid",children:t.map((p,n)=>{var D,j;const P=i.has(n),W=g.get(n)||[];return e.jsxs("div",{style:b,children:[e.jsxs(Ws,{"data-selected":P?"true":"false",className:`${x} ${P?"selected":""}`,onClick:()=>u(n),children:[P&&!s&&e.jsx("button",{onClick:V=>{V.stopPropagation(),confirm(l("Are you sure you want to remove this photo?"))&&o(n)},className:"photo-delete-button",title:l("Remove photo"),children:"×"}),p.status!=="complete"&&e.jsx(Ks,{$status:p.status,children:p.status==="error"?"✕":p.status==="uploading"?"↑":p.status==="processing"?"⚙️":"•"}),e.jsxs(Hs,{className:`media-preview ${P?"selected":""}`,children:[p.type==="video"||(D=p.type)!=null&&D.startsWith("video")?e.jsx(qs,{src:p.s3PreviewUrl,controls:!0,className:"media-item"}):e.jsx(Js,{src:p.s3PreviewUrl,alt:p.fileName,className:"media-item"}),(p.status==="uploading"||p.status==="processing")&&e.jsx(At,{$bottom:"4px",$left:"4px",$right:"4px",$height:"4px",children:e.jsx(jt,{$progress:p.progress,$status:p.status})})]}),e.jsxs("div",{className:"file-info-overlay",children:[(j=p.type)!=null&&j.startsWith("video")?l("Video"):l("Image"),p.size&&l(" • {{size}} MB",{size:(p.size/1024/1024).toFixed(1)}),p.duration&&l(" • {{duration}}s",{duration:p.duration})]}),a&&r==="horizontal"&&P&&e.jsx("div",{className:"selection-indicator",children:l("SELECTED")}),p.status==="error"&&p.errorMessage&&e.jsx(Qs,{$type:"error",children:l("Error: {{message}}",{message:p.errorMessage.length>40?p.errorMessage.substring(0,37)+"...":p.errorMessage})})]}),e.jsx("div",{className:`photo-info ${a&&r==="horizontal"?"horizontal":"traditional"}`,children:e.jsx(Si,{photoTags:W,isSelected:P,onToggleSelection:()=>u(n),fileName:p.originalFileName||p.fileName,showFileName:!0})})]},n)})})})});et.displayName="PhotoHandler";const Xt=xe.memo(({isSavingAlbum:t,savingProgress:i})=>{const{t:s}=ue();return t?e.jsxs(Ct,{children:[e.jsx(Vs,{children:s("Saving Album")}),e.jsx(Ys,{id:"saveProgressText",children:s("Moving files...")}),e.jsx(At,{children:e.jsx(jt,{id:"saveProgress",$progress:i/100})})]}):null});Xt.displayName="SavingProgressComponent";const Zt=xe.memo(({showFolderDetails:t,isCreator:i,folderName:s,setFolderName:o,folderDescription:u,setFolderDescription:g,isSavingAlbum:r})=>{const{t:a}=ue();return!t||i!==!0?null:e.jsxs(Ct,{children:[e.jsxs(ct,{children:[e.jsx(ut,{htmlFor:"folderName",children:a("Album Name")}),e.jsx(Xs,{id:"folderName",type:"text",value:s,onChange:l=>o(l.target.value),placeholder:a("e.g. Family Vacation in Kyoto"),disabled:r})]}),e.jsxs(ct,{children:[e.jsx(ut,{htmlFor:"folderDescription",children:a("Album Description")}),e.jsx(Zs,{id:"folderDescription",value:u,onChange:l=>g(l.target.value),placeholder:a("e.g. what's special about this album"),rows:4,disabled:r})]})]})});Zt.displayName="FolderDetailsComponent";const Pi=()=>{c.useEffect(()=>{if(typeof document>"u")return;const t="existing-files-animations";if(document.getElementById(t))return;const i=document.createElement("style");i.id=t,i.textContent=`
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
    `,document.head.appendChild(i)},[])},Ii=({existingFiles:t,selectedExistingIndices:i,onToggleSelection:s,onSelectAll:o,onDeselectAll:u,onDeleteFile:g,disabled:r,isCreator:a,participantsCanDeleteItems:l,existingFileTagsMap:f,t:b,isRTL:x})=>(Pi(),t.length===0?null:e.jsxs("div",{style:{marginBottom:"32px",direction:x?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px",flexDirection:x?"row-reverse":"row"},children:[e.jsx("div",{children:e.jsx("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:b("Existing Files ({count})").replace("{count}",t.length.toString())})}),e.jsx("div",{style:{display:"flex",gap:"8px",flexDirection:x?"row-reverse":"row"},children:e.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:r?"#f8f9fa":"#fff",color:r?"#999":"#333",cursor:r?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:i.size>0?u:o,disabled:r,children:i.size>0?b("Done Tagging Selected"):b("Select All")})})]}),e.jsx("div",{className:"existing-files-grid",children:t.map((p,n)=>{const P=i.has(n),W=f.get(n)||[];return e.jsxs("div",{className:"existing-file-item",children:[e.jsxs("div",{className:`existing-file-card ${P?"selected":""}`,onClick:()=>!r&&s(n),children:[e.jsx(Gs,{thumbnailDataKey:p.thumbnailDataKey,dataKey:p.dataKey,alt:b("Existing file"),style:{width:"100%",height:"100%",objectFit:"cover"}}),P&&!r&&(a===!0||l)&&e.jsx("button",{onClick:D=>{D.stopPropagation(),confirm(b("Are you sure you want to remove this file?"))&&g(n)},className:"delete-button",title:b("Remove file"),children:"×"}),p.dataInBytes>0&&e.jsx("div",{className:"file-size",children:b("{size} MB").replace("{size}",(p.dataInBytes/(1024*1024)).toFixed(1))}),p.durationInSeconds&&e.jsx("div",{className:"file-duration",children:b("{minutes}:{seconds}").replace("{minutes}",Math.floor(p.durationInSeconds/60).toString()).replace("{seconds}",String(Math.floor(p.durationInSeconds%60)).padStart(2,"0"))})]}),e.jsxs("div",{className:"file-info",children:[p.fileName&&e.jsx("div",{className:`file-name ${P?"selected":""}`,children:p.fileName}),e.jsx("div",{className:"file-tags",children:W.length>0?e.jsx("div",{className:"tags-display",children:e.jsxs("div",{className:"tags-content",children:[e.jsx("span",{className:"tag-icon",children:"🏷️"}),e.jsx("span",{className:"tags-text",children:W.map(D=>{if(D.subtags.length>0){const j=D.subtags.map(V=>V.subtagTitle).join(", ");return b("{tagTitle}: {subtags}").replace("{tagTitle}",D.tagTitle).replace("{subtags}",j)}return D.tagTitle}).join(" • ")})]})}):P?e.jsx("div",{style:{background:"white",border:"1px solid #007bff",color:"#007bff",fontWeight:"600",fontSize:"11px",fontStyle:"normal",padding:"8px 12px",borderRadius:"6px",boxShadow:"0 2px 8px rgba(0, 123, 255, 0.2)",animation:"subtlePulse 2.5s infinite"},children:e.jsxs("span",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"4px"},children:[e.jsx("span",{children:"👇"})," ",b("Scroll down to select tags")]})}):null})]})]},`existing-${n}-${p.dataKey}`)})})]})),Ai=({selectedPhotos:t,selectedPhotoIndices:i,onToggleSelection:s,onSelectAll:o,onDeselectAll:u,onRemovePhoto:g,onDeleteAll:r,disabled:a,photoTagsMap:l,columns:f,setColumns:b,t:x,isRTL:p})=>t.length===0?null:e.jsxs("div",{style:{marginBottom:"32px",direction:p?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"16px",flexDirection:p?"row-reverse":"row"},children:[e.jsx("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:x("New Files ({count})").replace("{count}",t.length.toString())}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:p?"flex-start":"flex-end",gap:"8px"},children:[e.jsxs("div",{style:{display:"flex",gap:"8px",flexDirection:p?"row-reverse":"row"},children:[e.jsx("button",{className:"control-button",onClick:i.size>0?u:o,disabled:a,children:i.size>0?x("Done Tagging Selected"):x("Select All")}),i.size===0&&e.jsx("button",{className:"control-button danger",onClick:r,disabled:a,children:x("Delete All")})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",flexDirection:p?"row-reverse":"row"},children:[e.jsx("label",{className:"columns-label",children:x("Columns:")}),e.jsxs("select",{value:f,onChange:n=>b(n.target.value),className:"columns-select",children:[e.jsx("option",{value:"1",children:"1"}),e.jsx("option",{value:"2",children:"2"}),e.jsx("option",{value:"3",children:"3"}),e.jsx("option",{value:"4",children:"4"}),e.jsx("option",{value:"5",children:"5"})]})]})]})]}),e.jsx(et,{selectedPhotos:t,selectedPhotoIndices:i,isSavingAlbum:a,onRemovePhoto:g,onTogglePhotoSelection:s,onSelectAllPhotos:o,onDeselectAllPhotos:u,hideHeader:!0,photoTagsMap:l,columns:f})]}),ji=A.button`
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
`,Lt=A.div`
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
`,Ee=A.div`
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,es=A.h4`
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
`,_e=A.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 8px 0;
`,Ne=A.div`
  font-size: 14px;
  color: #333;
  line-height: 1.4;
`,Re=A.label`
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
`,ze=A.span`
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
`,ts=A.button`
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
`,Ci=A.button`
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
`,ki=({showGlobalGear:t,globalSettings:i,setGlobalSettings:s,onPasswordClick:o,onApplySettings:u})=>{const{t:g,language:r}=ue(),a=Ie(r)==="rtl";return t?e.jsx(Lt,{$isRTL:a,children:e.jsxs(Ee,{children:[e.jsx(es,{children:g("Apply to All Albums")}),e.jsxs(Ee,{children:[e.jsxs(_e,{children:[e.jsx(Ne,{children:g("Public Profile")}),e.jsxs(Re,{children:[e.jsx("input",{type:"checkbox",checked:i.isOnPublicProfile,onChange:l=>s(f=>({...f,isOnPublicProfile:l.target.checked}))}),e.jsx(ze,{})]})]}),e.jsxs(_e,{children:[e.jsx(Ne,{children:g("Participants Can Add Items")}),e.jsxs(Re,{children:[e.jsx("input",{type:"checkbox",checked:i.participantsCanAddItems,onChange:l=>s(f=>({...f,participantsCanAddItems:l.target.checked}))}),e.jsx(ze,{})]})]}),e.jsxs(_e,{children:[e.jsx(Ne,{children:g("Participants Can Delete Items")}),e.jsxs(Re,{children:[e.jsx("input",{type:"checkbox",checked:i.participantsCanDeleteItems,onChange:l=>s(f=>({...f,participantsCanDeleteItems:l.target.checked}))}),e.jsx(ze,{})]})]})]}),e.jsx(Ee,{children:e.jsxs(ts,{$hasAnyPassword:i.passwordProtectionOption!=="NoPassword"&&!!i.albumPassword,onClick:o,children:[i.passwordProtectionOption!=="NoPassword"&&i.albumPassword?"🔒":"🔓",i.passwordProtectionOption!=="NoPassword"&&i.albumPassword?g("Password Set"):g("Set Password for All")]})}),e.jsx(Ci,{onClick:u,children:g("Apply to All Albums")})]})}):null},Fi=({showGear:t,isOnPublicProfile:i,participantsCanAddItems:s,participantsCanDeleteItems:o,passwordProtectionOption:u,albumPassword:g,onTogglePublicProfile:r,onToggleParticipantsCanAdd:a,onToggleParticipantsCanDelete:l,onPasswordClick:f,disabled:b})=>{const{t:x,language:p}=ue(),n=Ie(p)==="rtl";return t?e.jsx(Lt,{$isRTL:n,children:e.jsxs(Ee,{children:[e.jsx(es,{children:x("Album Settings")}),e.jsxs(Ee,{children:[e.jsxs(_e,{children:[e.jsx(Ne,{children:x("Public Profile")}),e.jsxs(Re,{children:[e.jsx("input",{type:"checkbox",checked:i,onChange:r,disabled:b}),e.jsx(ze,{})]})]}),e.jsxs(_e,{children:[e.jsx(Ne,{children:x("Participants Can Add Items")}),e.jsxs(Re,{children:[e.jsx("input",{type:"checkbox",checked:s,onChange:a,disabled:b}),e.jsx(ze,{})]})]}),e.jsxs(_e,{children:[e.jsx(Ne,{children:x("Participants Can Delete Items")}),e.jsxs(Re,{children:[e.jsx("input",{type:"checkbox",checked:o,onChange:l,disabled:b}),e.jsx(ze,{})]})]})]}),e.jsx(Ee,{children:e.jsxs(ts,{$hasAnyPassword:u!=="NoPassword"&&!!g,onClick:f,disabled:b,children:[u!=="NoPassword"&&g?"🔒":"🔓",x(u!=="NoPassword"&&g?"Password Set":"Set Password")]})})]})}):null},ss=({onClick:t,disabled:i,title:s})=>e.jsx(ji,{onClick:t,disabled:i,title:s,children:"⚙️"}),k={colors:{primary:"#007bff",primaryDark:"#0056b3",secondary:"#6c757d",success:"#4caf50",danger:"#e53935",warning:"#ff9800",white:"#fff",text:{primary:"#333",secondary:"#666",light:"#777"},background:{primary:"#f9fafb",highlight:"#f0f7ff"},border:"#ddd"},spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px"},borderRadius:{small:"4px",medium:"8px"},boxShadow:{lg:"0 4px 10px rgba(0,0,0,0.08)"}},Di=A.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10000;
`,Ei=A.div`
  background-color: ${k.colors.white};
  border-radius: ${k.borderRadius.medium};
  box-shadow: ${k.boxShadow.lg};
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
  scrollbar-color: ${k.colors.border} transparent;
  
  /* Custom scrollbar for webkit browsers */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${k.colors.border};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${k.colors.secondary};
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
    border-radius: ${k.borderRadius.small};
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
`,_i=A.div`
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
`,Ni=A.div`
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
`,Ri=A.h3`
  font-size: 24px;
  font-weight: 600;
  color: ${k.colors.text.primary};
  margin: 0 0 ${k.spacing.lg} 0;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 22px;
    margin: 0 0 ${k.spacing.md} 0;
  }
  
  @media (max-height: 700px) {
    font-size: 20px;
    margin: 0 0 ${k.spacing.md} 0;
  }
  
  @media (max-width: 480px) {
    font-size: 18px;
  }
`,zi=A.p`
  margin-bottom: ${k.spacing.lg};
  font-size: 16px;
  color: ${k.colors.text.secondary};
  line-height: 1.5;
  
  @media (max-width: 768px) {
    margin-bottom: ${k.spacing.md};
    font-size: 15px;
  }
  
  @media (max-height: 700px) {
    margin-bottom: ${k.spacing.sm};
    font-size: 14px;
  }
`,ht=A.div`
  margin-bottom: ${k.spacing.lg};
`,xt=A.label`
  display: block;
  margin-bottom: ${k.spacing.sm};
  font-size: 14px;
  font-weight: 500;
  color: ${k.colors.text.primary};
`,Oi=A.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${k.colors.border};
  border-radius: ${k.borderRadius.small};
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${k.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  &::placeholder {
    color: ${k.colors.text.light};
  }
`,Mi=A.div`
  display: flex;
  flex-direction: column;
  gap: ${k.spacing.md};
  margin-bottom: ${k.spacing.xl};
`,Bi=A.div`
  border: 2px solid ${t=>t.$isSelected?k.colors.primary:k.colors.border};
  border-radius: ${k.borderRadius.medium};
  padding: ${k.spacing.lg};
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${t=>t.$isSelected?k.colors.background.highlight:k.colors.white};
  display: flex;
  align-items: center;
  gap: ${k.spacing.lg};
  
  @media (max-width: 768px) {
    padding: ${k.spacing.md};
    gap: ${k.spacing.md};
  }
  
  @media (max-width: 480px) {
    padding: ${k.spacing.sm};
    gap: ${k.spacing.sm};
  }
  
  @media (max-height: 700px) {
    padding: ${k.spacing.sm};
    gap: ${k.spacing.sm};
  }
`,Ui=A.div`
  flex: 1;
`,Gi=A.div`
  margin-bottom: ${k.spacing.xs};
`,Wi=A.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${k.colors.primary};
  flex-shrink: 0;
`,Ki=A.label`
  font-size: 16px;
  font-weight: 500;
  color: ${k.colors.text.primary};
  cursor: pointer;
  display: block;
`,Hi=A.div`
  font-size: 14px;
  color: ${k.colors.text.secondary};
  margin-top: ${k.spacing.xs};
`,qi=A.div`
  color: ${k.colors.warning};
  font-size: 12px;
  font-style: italic;
  margin-top: ${k.spacing.xs};
  font-weight: 500;
`,Ji=A.div`
  display: flex;
  gap: ${k.spacing.sm};
  justify-content: center;
  margin-top: ${k.spacing.xl};
`,bt=A.button`
  background-color: ${t=>t.$variant==="danger"?k.colors.danger:t.$variant==="secondary"?"transparent":t.$variant==="success"?k.colors.success:k.colors.primary};
  color: ${t=>t.$variant==="secondary"?k.colors.primary:k.colors.white};
  border: ${t=>t.$variant==="secondary"?`1px solid ${k.colors.primary}`:"none"};
  padding: ${t=>t.$size==="small"?"8px 16px":t.$size==="large"?"16px 32px":"12px 24px"};
  border-radius: ${k.borderRadius.medium};
  cursor: ${t=>t.disabled?"not-allowed":"pointer"};
  font-size: ${t=>t.$size==="small"?"14px":t.$size==="large"?"18px":"16px"};
  font-weight: 500;
  transition: all 0.2s ease;
  opacity: ${t=>t.disabled?.6:1};
  min-width: 100px;

  &:hover:not(:disabled) {
    background-color: ${t=>t.$variant==="danger"?"#c62828":t.$variant==="secondary"?k.colors.background.highlight:t.$variant==="success"?"#388e3c":k.colors.primaryDark};
  }
`,Qi=A.div`
  background-color: ${k.colors.background.primary};
  border-radius: ${k.borderRadius.medium};
  padding: ${k.spacing.md};
  margin: ${k.spacing.md} 0;
  border-left: 4px solid ${k.colors.primary};
  font-size: 14px;
  color: ${k.colors.text.secondary};
  line-height: 1.4;
  
  @media (max-width: 768px) {
    padding: ${k.spacing.sm};
    margin: ${k.spacing.sm} 0;
    font-size: 13px;
  }
  
  @media (max-height: 700px) {
    padding: ${k.spacing.xs};
    font-size: 12px;
  }
`,Vi=[{value:"NotVisible",titleKey:"Password Required To See Or Save",descriptionKey:"Album will be completely hidden until correct password is entered"},{value:"Watermark",titleKey:"Watermarked And No Saving Without Password",descriptionKey:"Photos will be visible with watermarks, password required to save"},{value:"CannotBeSaved",titleKey:"Password Required To Save",descriptionKey:"Photos are visible but password required to download or save"},{value:"NoPassword",titleKey:"No Password",descriptionKey:"Album is fully public with no restrictions"}],is=({isOpen:t,onClose:i,initialOption:s="NoPassword",initialPassword:o=""})=>{const{t:u,language:g}=ue(),r=Ie(g)==="rtl",[a,l]=c.useState(!1),[f,b]=c.useState(s),[x,p]=c.useState(o);if(c.useEffect(()=>{l(!0)},[]),c.useEffect(()=>{t&&(b(s),p(o))},[t,s,o]),!t||!a)return null;const n=x.trim()==="",P=j=>{b(j)},W=j=>{j.target===j.currentTarget&&i()},D=j=>j!=="NoPassword";return e.jsxs(e.Fragment,{children:[e.jsx(Di,{onClick:W}),e.jsx(Ei,{children:e.jsx(_i,{children:e.jsxs(Ni,{$isRTL:r,children:[e.jsx(Ri,{children:u("Album Password Policy")}),e.jsx(zi,{children:u("Configure password protection for your album. Choose how you want to restrict access to your photos.")}),e.jsxs(ht,{children:[e.jsx(xt,{children:u("Enter Password")}),e.jsx(Oi,{type:"text",placeholder:u("Enter password (optional)"),value:x,onChange:j=>p(j.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"})]}),e.jsxs(ht,{children:[e.jsx(xt,{children:u("Select Protection Level")}),e.jsx(Mi,{children:Vi.map(j=>e.jsxs(Bi,{$isSelected:f===j.value,onClick:()=>P(j.value),children:[e.jsx(Wi,{type:"radio",name:"protection",checked:f===j.value,onChange:()=>P(j.value)}),e.jsxs(Ui,{children:[e.jsx(Gi,{children:e.jsx(Ki,{children:u(j.titleKey)})}),e.jsx(Hi,{children:u(j.descriptionKey)}),n&&D(j.value)&&f===j.value&&e.jsx(qi,{children:u('⚠️ Will use "password" as default if left empty')})]})]},j.value))})]}),D(f)&&e.jsxs(Qi,{children:[e.jsx("strong",{children:u("💡 Password Protection Info:")}),e.jsx("br",{}),u('If you leave the password field empty, "password" will be used as the default password. You can change this anytime in album settings.')]}),e.jsxs(Ji,{children:[e.jsx(bt,{$variant:"secondary",onClick:()=>i(),children:u("Cancel")}),e.jsx(bt,{$variant:"primary",onClick:()=>{const j=n&&D(f)?"password":x;console.log(`Saving with option: ${f}, password: ${j.length>0?"********":"none"}`),i(f,j)},children:u("Save")})]})]})})})]})},Yi=({debugMessages:t,t:i,isRTL:s,textDirection:o})=>t.length===0?null:e.jsxs("div",{style:{marginTop:"40px",background:"#fff3cd",padding:"16px",borderRadius:"8px",border:"1px solid #ffeeba",maxWidth:900,margin:"0 auto",direction:o},children:[e.jsx("h3",{style:{marginTop:0,fontSize:"18px",color:"#856404",textAlign:s?"right":"left"},children:i("Debug Log")}),e.jsx("pre",{style:{fontSize:"14px",color:"#856404",whiteSpace:"pre-wrap",maxHeight:"400px",overflow:"auto",textAlign:s?"right":"left"},children:t.map((u,g)=>e.jsx("div",{style:{marginBottom:"8px"},children:u},g))})]}),Xi=()=>{const[t,i]=c.useState(!1);return c.useEffect(()=>{i(!0)},[]),{getItem:g=>{if(!t||typeof window>"u")return null;try{return window.localStorage.getItem(g)}catch{return null}},setItem:(g,r)=>{if(!(!t||typeof window>"u"))try{window.localStorage.setItem(g,r)}catch{}},removeItem:g=>{if(!(!t||typeof window>"u"))try{window.localStorage.removeItem(g)}catch{}},isClient:t}},Zi=()=>{const[t,i]=c.useState(new URLSearchParams),[s,o]=c.useState(!1);return c.useEffect(()=>{o(!0),typeof window<"u"&&i(new URLSearchParams(window.location.search))},[]),{urlParams:t,isClient:s}},wt=()=>{const{t,language:i}=ue(),s=Ie(i)==="rtl",o=Xi(),{urlParams:u,isClient:g}=Zi(),[r,a]=c.useState({selectedPhotoIndices:new Set,photoTagsMap:new Map,selectedExistingIndices:new Set,existingFileTagsMap:new Map}),l=Pt(t),{setShowUsernamePrompt:f,setUsernameInput:b}=l,[x,p]=c.useState(null),[n,P]=c.useState(!1),[W,D]=c.useState(0),[j,V]=c.useState(""),[ee,y]=c.useState(""),[L,te]=c.useState(!1),[X,R]=c.useState(!1),[ie,G]=c.useState("NoPassword"),[U,Q]=c.useState(""),[q,m]=c.useState(!1),[$,B]=c.useState(!0),[H,re]=c.useState(!1),[J,ae]=c.useState(null),[he,le]=c.useState(!1),[ce,we]=c.useState([]),[ye,ve]=c.useState("2"),[de,Fe]=c.useState([]),[Ae,je]=c.useState(!1),[w,N]=c.useState(!1),[K,O]=c.useState(!1),d=c.useRef(null),v=(S,z)=>{const Y=new Date().toISOString();console.log(`[${Y}] ${S}`,z)};c.useEffect(()=>{if(!g)return;const S=z=>{d.current&&!d.current.contains(z.target)&&O(!1)};return document.addEventListener("mousedown",S),()=>{document.removeEventListener("mousedown",S)}},[g]);const M=Bs(S=>{!x&&S&&p(S)},!0),{fileInputRef:C,selectedPhotos:T,setSelectedPhotos:h,isUploading:F,progressTracker:E,setProgressTracker:_,debugMessages:Z,currentFolderId:se,openFilePicker:Te,handleFileSelection:rs,setOnSaveAlbumPage:Ge}=M,as=ni(p,h,ae,te,V,y,m,B,G,Q,le,we,re,v),{cognitoUsername:tt,publicUsername:We,setPublicUsername:os}=as,ns=Bt(r.photoTagsMap,S=>{a(z=>({...z,photoTagsMap:typeof S=="function"?S(z.photoTagsMap):S}))},r.existingFileTagsMap,S=>{a(z=>({...z,existingFileTagsMap:typeof S=="function"?S(z.existingFileTagsMap):S}))},r.selectedPhotoIndices,r.selectedExistingIndices,v),ls=di(x||se,tt,T,he,ce,j,ee,q,$,H,ie,U,r.photoTagsMap,r.existingFileTagsMap,de,r.selectedExistingIndices,P,D,h,_,v,t),{saveAlbumDirectly:st}=ls;c.useEffect(()=>{if(!g)return;const S=o.getItem("save-album-columns")||"2";ve(S)},[g]);const ds=S=>{ve(S),g&&o.setItem("save-album-columns",S)};c.useEffect(()=>(Ge(!0),()=>Ge(!1)),[Ge]),c.useEffect(()=>{(async()=>{try{await Rs()}catch(z){console.warn("Credential prewarming failed:",z)}})()},[]);const cs=async S=>{var z,Y,oe;if(S){je(!0);try{const ne=await me();if(!ne)return;const ge=`
        mutation FetchRelations($fetchRelationsInput: FetchRelationsInput!) {
          fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
            items {
              ... on FolderPosition {
                ${Ms}
              }
            }
          }
        }
      `,fe={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}},Me=await(await fetch(ke,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${ne}`},body:JSON.stringify({query:ge,variables:fe})})).json();if(Me.errors){console.error("GraphQL errors:",Me.errors);return}const it=(((Y=(z=Me==null?void 0:Me.data)==null?void 0:z.fetchRelations)==null?void 0:Y.items)||[]).find(be=>be&&be.folder&&be.folder.id===S);if(!it)return;const Ce=it.folder,ks=((oe=Ce==null?void 0:Ce.fileReferencesPage)==null?void 0:oe.items)||[],rt=[],at=new Map;ks.forEach((be,Fs)=>{const $e=be.file;if($e&&$e.dataKey){let Ke=be.fileDisplayName;if(!Ke&&$e.dataKey){const Ue=$e.dataKey.split("/");Ke=Ue[Ue.length-1]}rt.push({fileReferenceId:be.id,dataKey:$e.dataKey,thumbnailDataKey:$e.thumbnailDataKey||null,durationInSeconds:$e.durationInSeconds||null,dataInBytes:$e.dataInBytes||0,fileName:Ke||void 0});const ot=be.selectedTags||[];if(ot.length>0){const Ue=ot.map(He=>{var nt;return{tagTitle:He.tagTitle,TagType:He.TagType,subtags:((nt=He.subtags)==null?void 0:nt.map(lt=>({tagTitle:lt.tagTitle,subtagTitle:lt.subtagTitle})))||[]}});at.set(Fs,Ue)}}}),Fe(rt),a(be=>({...be,existingFileTagsMap:at})),!j&&Ce.folderName&&V(Ce.folderName),!ee&&Ce.folderDescription&&y(Ce.folderDescription)}catch(ne){console.error("Failed to fetch existing album data:",ne)}finally{je(!1)}}};c.useEffect(()=>{if(!g)return;const S=u.get("folderId");if(S){if(p(S),le(!1),typeof window<"u")try{window.localStorage.removeItem(pe.SUB_ALBUM_DATA)}catch{}te(!0),ae(!0)}},[g,u]),c.useEffect(()=>{x&&cs(x)},[x]),c.useEffect(()=>{se&&!x&&p(se)},[se,x]),c.useEffect(()=>{a(S=>{const z=new Set,Y=new Map;return S.selectedPhotoIndices.forEach(oe=>{oe<T.length&&z.add(oe)}),S.photoTagsMap.forEach((oe,ne)=>{ne<T.length&&Y.set(ne,oe)}),{...S,selectedPhotoIndices:z,photoTagsMap:Y}})},[T.length]),c.useEffect(()=>{a(S=>{const z=new Set,Y=new Map;return S.selectedExistingIndices.forEach(oe=>{oe<de.length&&z.add(oe)}),S.existingFileTagsMap.forEach((oe,ne)=>{ne<de.length&&Y.set(ne,oe)}),{...S,selectedExistingIndices:z,existingFileTagsMap:Y}})},[de.length]);const us=S=>{const z=T.filter((Y,oe)=>oe!==S);if(h(z),g&&typeof window<"u")try{z.length>0?window.localStorage.setItem(pe.SELECTED_PHOTOS,JSON.stringify(z)):window.localStorage.removeItem(pe.SELECTED_PHOTOS)}catch{}a(Y=>{const oe=new Set,ne=new Map;return Y.selectedPhotoIndices.forEach(ge=>{ge<S?oe.add(ge):ge>S&&oe.add(ge-1)}),Y.photoTagsMap.forEach((ge,fe)=>{fe<S?ne.set(fe,ge):fe>S&&ne.set(fe-1,ge)}),{...Y,selectedPhotoIndices:oe,photoTagsMap:ne}})},ps=async S=>{const z=de[S];if(!z){v(`No file found at index ${S}`);return}N(!0),v(`Starting deletion of file reference: ${z.fileReferenceId}`);try{await Pe.deleteFileReferences([z.fileReferenceId],v),v(`Successfully deleted file reference: ${z.fileReferenceId}`);const Y=de.filter((oe,ne)=>ne!==S);Fe(Y),a(oe=>{const ne=new Set,ge=new Map;return oe.selectedExistingIndices.forEach(fe=>{fe<S?ne.add(fe):fe>S&&ne.add(fe-1)}),oe.existingFileTagsMap.forEach((fe,Oe)=>{Oe<S?ge.set(Oe,fe):Oe>S&&ge.set(Oe-1,fe)}),{...oe,selectedExistingIndices:ne,existingFileTagsMap:ge}}),v(`File removed from local state, ${Y.length} files remaining`)}catch(Y){console.error("Failed to delete file reference:",Y),v(`Failed to delete file reference: ${Y}`),alert(t("Failed to delete file. Please try again."))}finally{N(!1)}},fs=S=>{a(z=>{const Y=new Set(z.selectedExistingIndices);return Y.has(S)?Y.delete(S):Y.add(S),{...z,selectedExistingIndices:Y}})},gs=()=>{const S=new Set;for(let z=0;z<de.length;z++)S.add(z);a(z=>({...z,selectedExistingIndices:S}))},ms=()=>{a(S=>({...S,selectedExistingIndices:new Set}))},hs=S=>{a(z=>{const Y=new Set(z.selectedPhotoIndices);return Y.has(S)?Y.delete(S):Y.add(S),{...z,selectedPhotoIndices:Y}})},xs=()=>{const S=new Set;for(let z=0;z<T.length;z++)S.add(z);a(z=>({...z,selectedPhotoIndices:S}))},bs=()=>{a(S=>({...S,selectedPhotoIndices:new Set}))},ws=()=>{if(g&&confirm(t("Are you sure you want to delete all new files? This action cannot be undone."))&&(h([]),a({selectedPhotoIndices:new Set,photoTagsMap:new Map,selectedExistingIndices:new Set,existingFileTagsMap:new Map}),g&&typeof window<"u"))try{window.localStorage.removeItem(pe.SELECTED_PHOTOS)}catch{}},ys=async()=>{P(!0);try{if(We!=null&&We.startsWith("Profile-")){b(""),f(!0),P(!1);return}st()}catch(S){console.error("Error in handleSaveAlbumSingle:",S),P(!1)}},vs=S=>{if(g&&typeof window<"u")try{window.localStorage.setItem(pe.PUBLIC_USERNAME,S)}catch{}os(S),f(!1),st()},Ts=(S,z)=>{S&&G(S),z!==void 0&&Q(z),R(!1)},Ss=()=>{R(!0)},$s=()=>{m(!q)},Ps=()=>{B(!$)},Is=()=>{re(!H)},As=()=>{Te(x)},Se=n||F||Ae||w,js=T.length>0||de.length>0,Cs=r.selectedPhotoIndices.size>0||r.selectedExistingIndices.size>0;return e.jsxs(e.Fragment,{children:[e.jsx(kt,{}),e.jsx(Ft,{children:e.jsxs(Dt,{children:[e.jsx(Et,{href:"my-albums.html",children:t("Back to Albums")}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[L&&J===!0&&e.jsxs("div",{ref:d,style:{position:"relative"},children:[e.jsx(ss,{onClick:()=>O(!K),disabled:Se,title:t("Album Settings")}),e.jsx(Fi,{showGear:K,isOnPublicProfile:q,participantsCanAddItems:$,participantsCanDeleteItems:H,passwordProtectionOption:ie,albumPassword:U,onTogglePublicProfile:$s,onToggleParticipantsCanAdd:Ps,onToggleParticipantsCanDelete:Is,onPasswordClick:Ss,disabled:Se})]}),e.jsx(Le,{$primary:!0,onClick:ys,disabled:Se,style:{minWidth:"120px",fontSize:"14px",padding:"8px 16px"},children:t(n?"Saving...":"Save Album")})]})]})}),e.jsxs(_t,{$isRTL:s,children:[e.jsx("div",{style:{marginTop:L&&J===!0?"3px":"0"},children:e.jsx(Zt,{showFolderDetails:L,isCreator:J,folderName:j,setFolderName:V,folderDescription:ee,setFolderDescription:y,isSavingAlbum:Se})}),(F||E.totalFiles>0&&(E.filesUploading>0||E.filesProcessing>0||E.filesComplete<E.totalFiles))&&e.jsx(Us,{progressTracker:E,isRTL:Ie(i)==="rtl",variant:"detailed",context:"saving",isUploading:F,showSuccessMessage:!1,showErrorMessage:!0,customMessages:{error:t("Some photos could not be processed. You can continue with the successfully processed photos.")}}),w&&e.jsx("div",{style:{padding:"16px",marginBottom:"16px",backgroundColor:"#fff3cd",border:"1px solid #ffeaa7",borderRadius:"8px",color:"#856404",textAlign:"center",fontWeight:"500"},children:t("Deleting file...")}),Ae&&e.jsx("div",{style:{padding:"16px",marginBottom:"16px",backgroundColor:"#f8f9fa",border:"1px solid #dee2e6",borderRadius:"8px",color:"#6c757d",textAlign:"center",fontStyle:"italic"},children:t("Loading existing files...")}),e.jsx("input",{ref:C,id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:S=>rs(S,tt),style:{display:"none"}}),L&&J===!0&&js&&e.jsxs("div",{style:{padding:"32px",marginBottom:"32px",backgroundColor:"#f8f9fa",border:"2px solid #e9ecef",borderRadius:"12px",direction:s?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",fontSize:"18px",color:"#495057",fontWeight:"600",marginBottom:"24px",flexDirection:s?"row-reverse":"row"},children:[e.jsx("span",{style:{marginRight:s?"0":"12px",marginLeft:s?"12px":"0",fontSize:"20px"},children:"🏷️"}),t("Select files to start adding or removing tags")]}),de.length>0&&e.jsx(Ii,{existingFiles:de,selectedExistingIndices:r.selectedExistingIndices,onToggleSelection:fs,onSelectAll:gs,onDeselectAll:ms,onDeleteFile:ps,disabled:Se,isCreator:J,participantsCanDeleteItems:H,existingFileTagsMap:r.existingFileTagsMap,t,isRTL:s}),e.jsx(Ai,{selectedPhotos:T,selectedPhotoIndices:r.selectedPhotoIndices,onToggleSelection:hs,onSelectAll:xs,onDeselectAll:bs,onRemovePhoto:us,onDeleteAll:ws,disabled:Se,photoTagsMap:r.photoTagsMap,columns:ye,setColumns:ds,t,isRTL:s}),e.jsx("div",{style:{marginTop:Cs?"32px":"16px"},children:e.jsx(Yt,{tagsManager:ns,disabled:Se,enhancedLog:v})})]}),e.jsx(Xt,{isSavingAlbum:n,savingProgress:W}),e.jsx(Ls,{children:e.jsx(Le,{onClick:As,disabled:Se,children:t(F?"Uploading...":"Add More Photos")})}),e.jsx(It,{t,language:i,usernameManager:l,onSuccess:vs}),e.jsx(is,{isOpen:X,onClose:Ts,initialOption:ie,initialPassword:U}),e.jsx(Yi,{debugMessages:Z,t,isRTL:s,textDirection:s?"rtl":"ltr"})]})]})},Li=A.div`
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
`,er=A.div`
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
`,tr=A.div`
  flex: 1;
`,sr=A.h3`
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
`,ir=A.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
`,rr=A.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: stretch;
  }
`,yt=A.button`
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
`,ar=A.button`
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
`,or=A.div`
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
`,Je=A.div`
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,Qe=A.h4`
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #333;
`,Ve=A.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  padding: 4px 0;
`,Ye=A.div`
  font-size: 13px;
  color: #333;
  line-height: 1.4;
`,Xe=A.label`
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
`,Ze=A.span`
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
`,nr=A.button`
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
`,vt=A.div`
  margin-bottom: 16px;
`,Tt=A.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #333;
  font-size: 14px;
`,lr=A.input`
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
`,dr=A.textarea`
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
`,cr=A.div`
  margin-top: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e9ecef;
`,ur=A.div`
  width: 100%;
  height: 6px;
  background: #e9ecef;
  border-radius: 3px;
  overflow: hidden;
  margin-top: 8px;
`,pr=A.div`
  height: 100%;
  background: linear-gradient(90deg, #007bff, #28a745);
  width: ${t=>t.$progress}%;
  transition: width 0.3s ease;
`,fr=A.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
  justify-content: flex-end;
  flex-direction: ${t=>t.$isRTL?"row-reverse":"row"};
`,St=A.button`
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
`,gr=({album:t,onUpdate:i,onSave:s,onRemove:o,onShowPasswordDialog:u,disabled:g,columns:r,enhancedLog:a})=>{const{t:l,language:f}=ue(),b=Ie(f)==="rtl",[x,p]=c.useState(!1),[n,P]=c.useState(!1),W=c.useRef(null);c.useEffect(()=>{const $=B=>{W.current&&!W.current.contains(B.target)&&p(!1)};return document.addEventListener("mousedown",$),()=>{document.removeEventListener("mousedown",$)}},[]);const D=Bt(t.photoTagsMap,$=>{const B=typeof $=="function"?$(t.photoTagsMap):$;i({photoTagsMap:B})},new Map,()=>{},t.selectedPhotoIndices,new Set,a),j=$=>{i({name:$})},V=$=>{i({description:$})},ee=$=>{const B=new Set(t.selectedPhotoIndices);B.has($)?B.delete($):B.add($),i({selectedPhotoIndices:B})},y=()=>{const $=new Set;for(let B=0;B<t.photos.length;B++)$.add(B);i({selectedPhotoIndices:$})},L=()=>{i({selectedPhotoIndices:new Set})},te=()=>{confirm(l("Are you sure you want to delete all files from this album? This action cannot be undone."))&&i({photos:[],selectedPhotoIndices:new Set,photoTagsMap:new Map})},X=$=>{const B=t.photos.filter((J,ae)=>ae!==$),H=new Set;t.selectedPhotoIndices.forEach(J=>{J<$?H.add(J):J>$&&H.add(J-1)});const re=new Map;t.photoTagsMap.forEach((J,ae)=>{ae<$?re.set(ae,J):ae>$&&re.set(ae-1,J)}),i({photos:B,selectedPhotoIndices:H,photoTagsMap:re})},R=()=>{i({isOnPublicProfile:!t.isOnPublicProfile})},ie=()=>{i({participantsCanAddItems:!t.participantsCanAddItems})},G=()=>{i({participantsCanDeleteItems:!t.participantsCanDeleteItems})},U=()=>{u(t.id)},Q=async()=>{if(!(n||g)){P(!0),a(`Starting save for album: ${t.name}`);try{const $=await s();a(`Save completed for album: ${t.name}, success: ${$}`),$||alert(l('Failed to save album "{{albumName}}". Please try again.',{albumName:t.name}))}catch($){console.error("Error saving album:",$),a(`Error saving album ${t.name}: ${$}`),alert(l('Failed to save album "{{albumName}}". Please try again.',{albumName:t.name}))}finally{P(!1)}}},q=t.passwordProtectionOption!=="NoPassword"&&t.albumPassword,m=g||n||t.isSaving;return e.jsxs(Li,{children:[e.jsxs(er,{$isRTL:b,children:[e.jsxs(tr,{children:[e.jsxs(sr,{children:[e.jsx("span",{children:"📁"}),t.name,(t.isSaving||n)&&e.jsx("span",{style:{color:"#007bff"},children:"⏳"}),t.savingProgress===100&&e.jsx("span",{style:{color:"#28a745"},children:"✅"})]}),e.jsxs(ir,{children:[t.photos.length===1?l("1 file"):l("{{count}} files",{count:t.photos.length}),t.selectedPhotoIndices.size>0&&e.jsxs("span",{children:[" • ",l("{{count}} selected for tagging",{count:t.selectedPhotoIndices.size})]})]})]}),e.jsx(rr,{children:!t.isSaving&&!n&&t.savingProgress<100&&e.jsxs(e.Fragment,{children:[e.jsx(yt,{$variant:"primary",onClick:Q,disabled:m,children:l(n?"Saving...":"Save")}),e.jsxs("div",{ref:W,style:{position:"relative"},children:[e.jsx(ar,{onClick:()=>p(!x),disabled:m,title:l("Album Settings"),children:"⚙️"}),x&&e.jsxs(or,{$isRTL:b,children:[e.jsxs(Je,{children:[e.jsx(Qe,{children:l("Visibility")}),e.jsxs(Ve,{children:[e.jsx(Ye,{children:l("Public Profile")}),e.jsxs(Xe,{children:[e.jsx("input",{type:"checkbox",checked:t.isOnPublicProfile,onChange:R,disabled:m}),e.jsx(Ze,{})]})]})]}),e.jsxs(Je,{children:[e.jsx(Qe,{children:l("Participant Permissions")}),e.jsxs(Ve,{children:[e.jsx(Ye,{children:l("Can Add Items")}),e.jsxs(Xe,{children:[e.jsx("input",{type:"checkbox",checked:t.participantsCanAddItems,onChange:ie,disabled:m}),e.jsx(Ze,{})]})]}),e.jsxs(Ve,{children:[e.jsx(Ye,{children:l("Can Delete Items")}),e.jsxs(Xe,{children:[e.jsx("input",{type:"checkbox",checked:t.participantsCanDeleteItems,onChange:G,disabled:m}),e.jsx(Ze,{})]})]})]}),e.jsxs(Je,{children:[e.jsx(Qe,{children:l("Security")}),e.jsxs(nr,{$hasPassword:!!q,onClick:U,disabled:m,children:[q?"🔒":"🔓",l(q?"Password Set":"Set Password")]})]})]})]}),e.jsx(yt,{$variant:"danger",onClick:o,disabled:m,children:l("Remove")})]})})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",marginBottom:"20px"},children:[e.jsxs(vt,{children:[e.jsx(Tt,{children:l("Album Name")}),e.jsx(lr,{type:"text",value:t.name,onChange:$=>j($.target.value),placeholder:l("e.g. Family Vacation in Kyoto"),disabled:m})]}),e.jsxs("div",{children:[e.jsxs(vt,{children:[e.jsx(Tt,{children:l("Album Description")}),e.jsx(dr,{value:t.description,onChange:$=>V($.target.value),placeholder:l("e.g. what's special about this album"),disabled:m,rows:3})]}),t.photos.length>0&&e.jsxs(fr,{$isRTL:b,children:[e.jsx(St,{onClick:t.selectedPhotoIndices.size>0?L:y,disabled:m,children:t.selectedPhotoIndices.size>0?l("Done Tagging Selected"):l("Select All")}),t.selectedPhotoIndices.size===0&&e.jsx(St,{$variant:"danger",onClick:te,disabled:m,children:l("Delete All")})]})]})]}),e.jsx(et,{selectedPhotos:t.photos,selectedPhotoIndices:t.selectedPhotoIndices,isSavingAlbum:m,onRemovePhoto:X,onTogglePhotoSelection:ee,onSelectAllPhotos:y,onDeselectAllPhotos:L,hideHeader:!1,photoTagsMap:t.photoTagsMap,columns:r,isMultipleAlbumMode:!0}),t.selectedPhotoIndices.size>0&&e.jsx(cr,{children:e.jsx(Yt,{tagsManager:D,disabled:m,enhancedLog:a})}),(t.isSaving||n)&&e.jsxs("div",{style:{marginTop:"16px"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},children:[e.jsx("span",{style:{fontSize:"14px",fontWeight:"600",color:"#333"},children:l(n?"Starting save...":"Saving album...")}),e.jsx("span",{style:{fontSize:"14px",color:"#666"},children:l("{{progress}}%",{progress:t.savingProgress})})]}),e.jsx(ur,{children:e.jsx(pr,{$progress:t.savingProgress})})]})]})},mr=A.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
`,hr=({albums:t,setAlbums:i,isSavingAny:s,onSaveAlbum:o,onRemoveAlbum:u,onShowPasswordDialog:g,columns:r,setColumns:a,enhancedLog:l})=>{const{language:f}=ue(),b=Ie(f)==="rtl",x=c.useCallback((n,P)=>{i(W=>W.map(D=>D.id===n?{...D,...P}:D))},[i]),p=c.useCallback(async n=>{try{const P=await o(n);return l(`Album ${n} save result: ${P?"success":"failed"}`),P}catch(P){return l(`Error saving album ${n}: ${P}`),!1}},[o,l]);return e.jsx("div",{children:e.jsx(mr,{$isRTL:b,children:t.map(n=>e.jsx(gr,{album:n,onUpdate:P=>x(n.id,P),onSave:()=>p(n.id),onRemove:()=>u(n.id),onShowPasswordDialog:g,disabled:s,columns:r,setColumns:a,enhancedLog:l},n.id))})})},xr=()=>{var Ae,je;const{t,language:i}=ue(),s=Ie(i)==="rtl",[o,u]=c.useState([]),[g,r]=c.useState("2"),[a,l]=c.useState(!1),[f,b]=c.useState(!1),[x,p]=c.useState(null),[n,P]=c.useState(null),[W,D]=c.useState(!1),[j,V]=c.useState(0),[ee,y]=c.useState(0),[L,te]=c.useState(""),[X,R]=c.useState({isOnPublicProfile:!1,participantsCanAddItems:!0,participantsCanDeleteItems:!1,passwordProtectionOption:"NoPassword",albumPassword:""}),ie=Pt(t),{setShowUsernamePrompt:G,setUsernameInput:U}=ie,[Q,q]=c.useState(null);c.useEffect(()=>{const w=localStorage.getItem(pe.PUBLIC_USERNAME);q(w||null)},[]);const m=(w,N)=>{const K=new Date().toISOString();console.log(`[${K}] ${w}`,N)};c.useEffect(()=>{(async()=>{try{const N=await me();if(N){const O=JSON.parse(atob(N.split(".")[1]))["cognito:username"];O&&(P(O),m(`Initialized Cognito username: ${O}`))}}catch(N){console.error("Error initializing username:",N)}})()},[]);const $=w=>{r(w),localStorage.setItem("save-album-columns",w),m(`Column setting changed to ${w} for all albums`)};c.useEffect(()=>{const w=localStorage.getItem(pe.MULTI_ALBUM_DATA);if(w)try{const K=JSON.parse(w).filter(d=>{if(!d||!d.name||!Array.isArray(d.selectedPhotos))return!1;const v=d.selectedPhotos.filter(I=>I&&I.fileName&&I.originalFileName&&I.s3PreviewUrl&&I.s3PreviewUrl.includes("amazonaws.com"));return d.selectedPhotos=v,v.length>0});if(K.length===0){alert(t("No valid albums were found. Please try selecting your files again.")),De("my-albums.html");return}const O=K.map(d=>({id:pt(),name:d.name,description:"",photos:d.selectedPhotos,selectedPhotoIndices:new Set,photoTagsMap:new Map,isOnPublicProfile:!1,participantsCanAddItems:!0,participantsCanDeleteItems:!1,passwordProtectionOption:"NoPassword",albumPassword:"",isSaving:!1,savingProgress:0,folderId:""}));u(O),qe()}catch(N){console.error("Error parsing multi-album data:",N),alert(t("There was an error loading your albums. Please try selecting your files again.")),De("my-albums.html")}else alert(t("No album data was found. Please try selecting your files again.")),De("my-albums.html")},[t]),c.useEffect(()=>{const w=localStorage.getItem("save-album-columns")||"2";r(w)},[]);const B=(w,N)=>{m(`Album ${w} progress: ${N}`)},H=(w,N)=>{u(K=>K.map(O=>O.id===w?{...O,savingProgress:N}:O))},re=async(w,N,K)=>{m(`Starting chunked save for album ${w}`),B(w,t("Processing files in chunks..."));const O=48;if(K.length===0)m(`No file references for album ${w}, saving only folder position`),await Pe.saveFolderOnly(N,m);else{const d=Rt(K);m(`Album ${w}: Processing ${d.length} unique file references`);const v=zt(d,O);m(`Album ${w}: Split into ${v.length} chunks`);for(let I=0;I<v.length;I++){const M=v[I];m(`Album ${w}: Processing chunk ${I+1} of ${v.length}`);const C=I/v.length*80;H(w,10+C),I<v.length-1?(B(w,t("Saving files: chunk {{chunkNumber}} of {{totalChunks}}...",{chunkNumber:I+1,totalChunks:v.length})),await Pe.saveFileReferences(M,m)):(B(w,t("Finalizing album...")),await Pe.saveFinalChunkWithFolder(M,N,m))}}H(w,100),B(w,t("Album saved successfully!"))},J=async w=>{const N=o.find(K=>K.id===w);if(!N)return m(`Album ${w} not found`),!1;if(N.photos.length===0)return alert(t('The album "{{albumName}}" has no photos to save.',{albumName:N.name})),!1;if(!n)return m(`No Cognito username available for album ${w}`),!1;m(`Starting real save for album: ${N.name}`),u(K=>K.map(O=>O.id===w?{...O,isSaving:!0,savingProgress:5}:O));try{const K=Math.floor(Date.now()/1e3),O=`${n}_____${pt()}____Folder`,d=`${n}_____${n}____Account`,I=O.split("_____")[1].split("____")[0];m(`Album ${w} folder ID: ${O}`),u(h=>h.map(F=>F.id===w?{...F,folderId:O}:F));const M=Ot(K,d,I,O,n,N.isOnPublicProfile,N.participantsCanAddItems,N.participantsCanDeleteItems,N.passwordProtectionOption,N.albumPassword,N.name,N.description,!1,[],m),C=N.photos.filter(h=>h.status==="complete");m(`Album ${w}: ${C.length} valid photos`);let T=[];if(C.length>0){const h=C.filter(F=>!F.fileId);h.length>0&&(m(`Album ${w}: Moving ${h.length} files to public folder`),B(w,t("Moving files...")),await $t(h,F=>H(w,F),m)),m(`Album ${w}: Creating file reference inputs`),T=Mt(C,K,d,O,n,N.photoTagsMap,m)}return await re(w,M,T),u(h=>h.map(F=>F.id===w?{...F,isSaving:!1,savingProgress:100}:F)),m(`Successfully saved album: ${N.name}`),!0}catch(K){return console.error(`Error saving album ${w}:`,K),m(`Error saving album ${w}: ${K}`),u(O=>O.map(d=>d.id===w?{...d,isSaving:!1,savingProgress:0}:d)),alert(t('Failed to save album "{{albumName}}". Please try again.',{albumName:N.name})),!1}},ae=async()=>{if(Q!=null&&Q.startsWith("Profile-")){U(""),G(!0);return}if(!n){alert(t("Unable to determine user credentials. Please refresh and try again."));return}const w=o.filter(O=>O.savingProgress<100);if(w.length===0)return;m(`Starting save process for ${w.length} albums`),D(!0),y(w.length),V(0);let N=0;const K=[];try{for(let O=0;O<w.length;O++){const d=w[O];V(O+1),te(d.name),m(`Saving album ${O+1} of ${w.length}: ${d.name}`),await J(d.id)?N++:K.push(d.name),await new Promise(I=>setTimeout(I,200))}if(K.length===0)m("All albums saved successfully, cleaning up and redirecting"),setTimeout(()=>{localStorage.removeItem(pe.MULTI_ALBUM_DATA),qe(),sessionStorage.setItem("album_just_saved","true"),De("my-albums.html")},1e3);else{const O=K.length===1?t('Failed to save album "{{albumName}}". Please try again.',{albumName:K[0]}):t("Failed to save {{count}} albums: {{albumNames}}. Please try again.",{count:K.length,albumNames:K.join(", ")});alert(O)}}catch(O){console.error("Error in save all albums:",O),alert(t("There was an error saving albums. Please try again."))}finally{D(!1),V(0),y(0),te("")}},he=w=>{localStorage.setItem(pe.PUBLIC_USERNAME,w),q(w),G(!1),D(!1),V(0),y(0),te(""),ae()},le=w=>{const N=o.find(K=>K.id===w);N&&(p(w),R(K=>({...K,passwordProtectionOption:N.passwordProtectionOption,albumPassword:N.albumPassword})),b(!0))},ce=()=>{p(null),b(!0)},we=(w,N)=>{w!==void 0&&N!==void 0&&(x?u(K=>K.map(O=>O.id===x?{...O,passwordProtectionOption:w,albumPassword:N}:O)):R(K=>({...K,passwordProtectionOption:w,albumPassword:N}))),b(!1),p(null)},ye=()=>{u(w=>w.map(N=>({...N,isOnPublicProfile:X.isOnPublicProfile,participantsCanAddItems:X.participantsCanAddItems,participantsCanDeleteItems:X.participantsCanDeleteItems,passwordProtectionOption:X.passwordProtectionOption,albumPassword:X.albumPassword}))),l(!1),m("Applied global settings to all albums",X)},ve=w=>{const N=o.find(O=>O.id===w);if(N&&!confirm(t('Are you sure you want to remove the album "{{albumName}}"?',{albumName:N.name})))return;const K=o.filter(O=>O.id!==w);u(K),K.length===0&&(localStorage.removeItem(pe.MULTI_ALBUM_DATA),qe(),De("my-albums.html"))},de=o.some(w=>w.isSaving)||W,Fe=o.some(w=>w.savingProgress<100);return e.jsxs(e.Fragment,{children:[e.jsx(kt,{}),e.jsx("style",{children:`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}),e.jsx(Ft,{children:e.jsxs(Dt,{children:[e.jsx(Et,{href:"my-albums.html",children:t("Back to Albums")}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx(ei,{children:t("Columns:")}),e.jsxs(ti,{value:g,onChange:w=>$(w.target.value),disabled:de,children:[e.jsx("option",{value:"1",children:"1"}),e.jsx("option",{value:"2",children:"2"}),e.jsx("option",{value:"3",children:"3"}),e.jsx("option",{value:"4",children:"4"}),e.jsx("option",{value:"5",children:"5"})]})]}),e.jsxs("div",{style:{position:"relative"},children:[e.jsx(ss,{onClick:()=>l(!a),disabled:de,title:t("Global Settings for All Albums")}),e.jsx(ki,{showGlobalGear:a,globalSettings:X,setGlobalSettings:R,onPasswordClick:ce,onApplySettings:ye})]}),Fe&&e.jsx(Le,{$primary:!0,onClick:ae,disabled:de,style:{minWidth:"160px",fontSize:"14px",padding:"8px 16px"},children:W?t("Saving {{current}} of {{total}}...",{current:j,total:ee}):o.length===1?t("Save 1 Album"):t("Save {{count}} Albums",{count:o.filter(w=>w.savingProgress<100).length})})]})]})}),e.jsxs(_t,{$isRTL:s,children:[W&&e.jsxs("div",{style:{marginBottom:"24px",padding:"20px",backgroundColor:"#e3f2fd",border:"2px solid #2196f3",borderRadius:"12px",boxShadow:"0 4px 12px rgba(33, 150, 243, 0.1)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"16px",marginBottom:"16px"},children:[e.jsx("div",{style:{width:"24px",height:"24px",border:"3px solid #e3f2fd",borderTop:"3px solid #2196f3",borderRadius:"50%",animation:"spin 1s linear infinite"}}),e.jsxs("div",{children:[e.jsxs("div",{style:{fontSize:"16px",fontWeight:"600",color:"#1565c0",marginBottom:"4px"},children:[t("Saving Albums")," (",j," / ",ee,")"]}),e.jsx("div",{style:{fontSize:"14px",color:"#1976d2"},children:t("Currently saving: {{albumName}}",{albumName:L})})]})]}),e.jsx("div",{style:{width:"100%",height:"8px",backgroundColor:"#bbdefb",borderRadius:"4px",overflow:"hidden"},children:e.jsx("div",{style:{width:`${j/ee*100}%`,height:"100%",backgroundColor:"#2196f3",transition:"width 0.3s ease",borderRadius:"4px"}})}),e.jsx("div",{style:{marginTop:"8px",fontSize:"12px",color:"#1976d2",textAlign:"center"},children:t("Please wait while your albums are being saved...")})]}),e.jsx(hr,{albums:o,setAlbums:u,isSavingAny:de,onSaveAlbum:J,onRemoveAlbum:ve,onShowPasswordDialog:le,columns:g,setColumns:$,enhancedLog:m})]}),e.jsx(is,{isOpen:f,onClose:we,initialOption:x?((Ae=o.find(w=>w.id===x))==null?void 0:Ae.passwordProtectionOption)||"NoPassword":X.passwordProtectionOption,initialPassword:x?((je=o.find(w=>w.id===x))==null?void 0:je.albumPassword)||"":X.albumPassword}),e.jsx(It,{t,language:i,usernameManager:ie,onSuccess:he})]})},br=()=>{const[t,i]=c.useState(!1),[s,o]=c.useState(!1);return c.useEffect(()=>{if(typeof window<"u"){const g=new URLSearchParams(window.location.search).get("mode");i(g==="multiple"),o(!0)}},[]),s?t?e.jsx(xr,{}):e.jsx(wt,{}):e.jsx(wt,{})},wr=()=>e.jsx(Os,{children:e.jsx(br,{})});if(typeof document<"u"){const t=document.getElementById("root");t&&zs.createRoot(t).render(e.jsx(wr,{}))}
