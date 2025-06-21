import{t as Ge,v as He,c as oe,f as pe,S as Be,w as $t,a as n,x as qe,h as De,y as le,r as be,L as ae,j as t,d as W,u as fe,g as ue,A as Et,b as Qe,C as ve,o as Nt,R as Lt,I as Rt,z as Mt,p as Ft,B as _t}from"./utils-CWdzPvYe.js";import{u as Ut,U as Ot}from"./useFileUploadProcessor-CpX7IOHU.js";import{a as Se}from"./types-Cxncrjqw.js";import{C as Bt,a as zt,d as Wt}from"./fileOperations-Db84KpGJ.js";import{u as Yt,U as Jt}from"./useUsernameManagement-srNJ7Tox.js";import{u as Vt,v as Xt,N as Kt,B as H,O as ce,W as Ie,w as Gt,x as Ht,y as Ze,z as et,F as $e,l as Ee,T as tt,D as qt,I as Dt,E as Qt,J as ze,K as Zt,Q as ot,R as eo,U as to,M as xe,X as oo,Y as so,Z as no,C as ro,_ as io,$ as lo,a0 as ao,a1 as Pe,a2 as co,a3 as je,G as go,n as uo,o as po,a4 as fo,a5 as ho,a6 as mo,s as xo,a7 as yo,a8 as ke,a9 as We,aa as wo}from"./styled-components-B6xIuogB.js";import{C as bo,S as So,I as Io,R as To}from"./SignUpCommand-MXXNiX8m.js";import"./parseJsonBody-C7egCfwC.js";const Te=(e,r)=>{var S,A,k,I,O,K,V;console.log("🔄 processData called with raw JSON:",JSON.stringify(e,null,2));const l=((A=(S=e==null?void 0:e.data)==null?void 0:S.fetchRelations)==null?void 0:A.items)||[];console.log("📊 Items found:",l.length),console.log("📊 Items details:",JSON.stringify(l,null,2));const s=[],a={};let d="Photos",f,p,o="",h,y=!1,g=!1,w,u=!1;const c=new Set;if(l.length>0){const i=l[0];console.log("📁 Processing folder:",JSON.stringify(i,null,2)),r&&(i!=null&&i.id)&&(console.log("🆔 Setting folder ID:",i.id),r(i.id)),i!=null&&i.albumNanoId&&(f=i.albumNanoId,console.log("🏷️ Album nano ID found:",f)),i!=null&&i.folderName&&i.folderName.length>0&&(d=i.folderName,console.log("📝 Folder name found:",d)),i!=null&&i.creatorId&&i.creatorId.length>0&&(p=i.creatorId,console.log("👤 Creator ID found:",p)),i!=null&&i.folderDescription&&i.folderDescription.length>0&&(o=i.folderDescription,console.log("📄 Folder description found:",o)),i!=null&&i.folderPassword&&(console.log("🔐 Folder password object found:",JSON.stringify(i.folderPassword,null,2)),i.folderPassword.policy&&(h=i.folderPassword.policy,console.log("🔒 Password policy:",h),y=h!=="NoPassword",console.log("🔑 Password required:",y)),i.folderPassword.password&&h!=="NoPassword"&&(g=!0,w=i.folderPassword.password,console.log("🗝️ Actual password found (length):",w.length))),i!=null&&i.folderInviteParameters&&(console.log("📨 Folder invite parameters found:",JSON.stringify(i.folderInviteParameters,null,2)),u=!!i.folderInviteParameters.usingFolderInviteGrantsRightToAddItems,console.log("➕ Using folder invite grants right to add items:",u));const $=((I=(k=l[0])==null?void 0:k.contactsUsingInvite)==null?void 0:I.items)||[];console.log("👥 Processing contacts:",$.length),$.forEach((F,X)=>{var G;console.log(`👤 Contact ${X}:`,JSON.stringify(F,null,2)),F!=null&&F.id&&((G=F==null?void 0:F.item)!=null&&G.publicDisplayName)&&(a[F.id]=F.item.publicDisplayName,console.log(`✅ Added contact: ${F.id} -> ${F.item.publicDisplayName}`))});const E=((O=i==null?void 0:i.fileReferencesPage)==null?void 0:O.items)||[];console.log("📸 Processing file references:",E.length),E.forEach((F,X)=>{var B,Y,Q,Z;console.log(`📄 File reference ${X}:`,JSON.stringify(F,null,2));const G=F==null?void 0:F.file;if(!(G!=null&&G.dataKey)){console.log(`❌ Skipping file reference ${X} - no dataKey`);return}const{id:m,dataKey:T,thumbnailDataKey:P,durationInSeconds:C,ownerContactId:U}=G,_=F.fileDisplayName;if(console.log(`📂 Processing file: ID=${m}, dataKey=${T}, thumbnailDataKey=${P}, duration=${C}, owner=${U}, refFileDisplayName=${_}`),c.has(T)){console.log(`⚠️ Duplicate dataKey found, skipping: ${T}`);return}c.add(T),console.log(`🔍 Raw selectedTags for file ${m}:`,F.selectedTags);const L=((B=F.selectedTags)==null?void 0:B.map(J=>{var ee;return{TagType:J.TagType,tagTitle:J.tagTitle,subtags:((ee=J.subtags)==null?void 0:ee.map(te=>({TagType:te.TagType,tagTitle:te.tagTitle,subtagTitle:te.subtagTitle})))||[]}}))||[];console.log(`🏷️ Processed selectedTags for file ${m}:`,L),console.log("📊 Number of tags:",L.length);const v=_||((Y=T.split("/").pop())==null?void 0:Y.split(".")[0])||`file-${X}`;console.log(`📝 File display name: ${v}`);const j=`${Be}${T}`,R=P?`${Be}${P}`:void 0;if(T.startsWith("Input/Image/")){const J={type:"image",fileId:m,url:j,thumbnailUrl:R||j,ownerContactId:U,fileDisplayName:v,loaded:!1,selectedTags:L};console.log("🖼️ Complete image item with tags:",{fileId:J.fileId,type:J.type,fileDisplayName:J.fileDisplayName,tagCount:((Q=J.selectedTags)==null?void 0:Q.length)||0,tags:J.selectedTags}),s.push(J),console.log("✅ Successfully added image item to mediaItems array")}else if(T.startsWith("Input/Video/")){const J={type:"video",fileId:m,url:j,thumbnailUrl:R||j,duration:$t(C),ownerContactId:U,fileDisplayName:v,loaded:!1,selectedTags:L};console.log("🎥 Complete video item with tags:",{fileId:J.fileId,type:J.type,fileDisplayName:J.fileDisplayName,tagCount:((Z=J.selectedTags)==null?void 0:Z.length)||0,tags:J.selectedTags}),s.push(J),console.log("✅ Successfully added video item to mediaItems array")}else console.log(`❓ Unknown file type for dataKey: ${T}`)})}else console.log("❌ No items found in API response");const b={mediaItems:s,folderName:d,albumNanoId:f,creatorId:p,folderDescription:o,contacts:a,passwordPolicy:h,passwordRequired:y,hasPassword:g,actualPassword:w,usingFolderInviteGrantsRightToAddItems:u};return console.log("✅ processData final result summary:",{mediaItemsCount:b.mediaItems.length,mediaItemsWithTags:b.mediaItems.filter(i=>i.selectedTags&&i.selectedTags.length>0).length,firstItemTags:((V=(K=b.mediaItems[0])==null?void 0:K.selectedTags)==null?void 0:V.length)||0,totalTagsAcrossAllItems:b.mediaItems.reduce((i,$)=>{var E;return i+(((E=$.selectedTags)==null?void 0:E.length)||0)},0)}),b.mediaItems.slice(0,3).forEach((i,$)=>{var E,F;console.log(`📋 Item ${$} details:`,{fileId:i.fileId,fileDisplayName:i.fileDisplayName,tagCount:((E=i.selectedTags)==null?void 0:E.length)||0,tags:((F=i.selectedTags)==null?void 0:F.map(X=>`${X.tagTitle}(${X.subtags.length})`))||[]})}),console.log("✅ processData final result:",JSON.stringify(b,null,2)),b},Co=async(e,r)=>{var l,s,a,d;console.log("🔍 fetchFolderUsingTargetItemIdentifier called with:",e);try{const p={fetchRelationsInput:{targetItemIdentifier____RelationType:`${e}____Folder`,index:"targetItemIdentifier____RelationType",limit:1,scanIndexForward:!1,nextToken:null}};console.log("📤 Query variables:",JSON.stringify(p,null,2)),console.log("🌐 Making public API call...");const o=fetch(Ge,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":He},body:JSON.stringify({query:Se,variables:p})}).then(u=>u.json());console.log("🔒 Checking private API availability...");const h=(async()=>{const u=await oe();return console.log("🎫 Token available:",!!u),u?(console.log("🌐 Making private API call..."),fetch(pe,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${u}`},body:JSON.stringify({query:Se,variables:p})}).then(c=>c.json())):(console.log("❌ No token - skipping private API"),null)})();console.log("⏳ Waiting for public API response...");const y=await o;console.log("📥 Public API raw response:",JSON.stringify(y,null,2));let g=Te(y,r);console.log("🔄 Processed public data:",JSON.stringify(g,null,2)),console.log("⏳ Waiting for private API response...");const w=await h;if(w){console.log("📥 Private API raw response:",JSON.stringify(w,null,2));const u=(d=(a=(s=(l=w==null?void 0:w.data)==null?void 0:l.fetchRelations)==null?void 0:s.items)==null?void 0:a[0])==null?void 0:d.folderPosition;if(console.log("📍 Folder position found:",!!u),console.log("📍 Folder position details:",JSON.stringify(u,null,2)),u){const c=Te(w,r);console.log("🔄 Processed private data (before enhancement):",JSON.stringify(c,null,2)),c.folderPositionId=u==null?void 0:u.id,c.profileIds=u==null?void 0:u.profileIds,console.log("🔄 Enhanced private data:",JSON.stringify(c,null,2)),g=c}else console.log("❌ No folder position in private API response")}else console.log("❌ No private API response (user not logged in or API failed)");return console.log("✅ Final return data:",JSON.stringify(g,null,2)),g}catch(f){return console.error("💥 Error in fetchFolderUsingTargetItemIdentifier:",f),null}},vo=async(e,r)=>{var l,s,a,d;try{const p={fetchRelationsInput:{albumNanoId:e,index:"albumNanoId",limit:1,scanIndexForward:!1,nextToken:null}},o=fetch(Ge,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":He},body:JSON.stringify({query:Se,variables:p})}).then(u=>u.json()),h=(async()=>{const u=await oe();return u?fetch(pe,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${u}`},body:JSON.stringify({query:Se,variables:p})}).then(c=>c.json()):null})(),y=await o;let g=Te(y,r);const w=await h;if(w){const u=(d=(a=(s=(l=w==null?void 0:w.data)==null?void 0:l.fetchRelations)==null?void 0:s.items)==null?void 0:a[0])==null?void 0:d.folderPosition;if(u){const c=Te(w,r);c.folderPositionId=u==null?void 0:u.id,c.profileIds=u==null?void 0:u.profileIds,g=c}}return g}catch(f){return console.error("Error fetching folder data:",f),null}},ye=async(e,r,l)=>{console.log("Starting album registration");const s=document.createElement("div");s.style.position="fixed",s.style.top="0",s.style.left="0",s.style.width="100%",s.style.height="100%",s.style.backgroundColor="rgba(0, 0, 0, 0.5)",s.style.display="flex",s.style.justifyContent="center",s.style.alignItems="center",s.style.zIndex="2000";const a=document.createElement("div");a.style.backgroundColor="white",a.style.padding="30px",a.style.borderRadius="8px",a.style.textAlign="center";const d=document.createElement("p");d.id="saveProgressText",d.textContent=e("Registering album...");const f=document.createElement("div");f.style.backgroundColor="#f0f0f0",f.style.borderRadius="4px",f.style.overflow="hidden",f.style.height="8px",f.style.marginTop="10px";const p=document.createElement("div");p.id="saveProgress",p.style.backgroundColor="#4caf50",p.style.height="100%",p.style.width="5%",p.style.transition="width 0.3s ease";const o=document.createElement("p");o.id="saveErrorText",o.style.color="#f44336",o.style.display="none",o.style.marginTop="10px",o.style.fontSize="14px",f.appendChild(p),a.appendChild(d),a.appendChild(f),a.appendChild(o),s.appendChild(a),document.body.appendChild(s);try{const h=await De();if(!h){console.error("No token available for registering album"),document.body.removeChild(s);return}if(!JSON.parse(atob(h.split(".")[1]))["cognito:username"]){console.error("Missing username in token"),le(o,"Could not retrieve username from token",d,p);return}if(!r){console.error("No folder ID available"),le(o,"Folder ID is missing",d,p);return}if(!l||!l.mediaItems){console.error("No album data available"),le(o,"Album data is missing or incomplete",d,p);return}if(l.mediaItems.length===0){console.error("No media items to save"),le(o,"No media items in album to save",d,p);return}const w=Math.floor(Date.now()/1e3);we(30,d,p,e("Preparing album data..."));const u={currentTime:w,folderId:r,profileIds:["Only Me_____Only Me____Profile"],folderPositionSelectedTagInputs:[],folderPositionPoints:1};console.log("Folder position input:",u),we(50,d,p,e("Saving album..."));const c=`
      mutation SaveAlbum(
        $folderPositionInputs: [FolderPositionInput!]
      ) {
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items { id }
        }
      }
    `,b={folderPositionInputs:[u]};console.log("GraphQL mutation variables:",JSON.stringify(b));try{const S=await fetch(pe,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${h}`},body:JSON.stringify({query:c,variables:b})});if(we(80,d,p,e("Almost there...")),!S.ok)throw new Error(`HTTP error: ${S.status} ${S.statusText}`);const A=await S.text();let k;try{k=JSON.parse(A),console.log("API response:",k)}catch(I){const O=I instanceof Error?I.message:"Unknown JSON parse error";throw new Error(`Invalid JSON response: ${O}`)}if(k.errors&&k.errors.length>0){const I=k.errors.map(O=>(console.error("GraphQL error:",O),O.message||"Unknown GraphQL error")).join("; ");throw new Error(`GraphQL errors: ${I}`)}console.log("Album registered successfully"),we(100,d,p,e("Album registered successfully!")),sessionStorage.setItem("album_just_saved","true"),setTimeout(()=>{document.body.removeChild(s),be("my-albums.html")},2e3)}catch(S){const A=S instanceof Error?S.message:"Unknown API error";console.error("Error in API request:",S),le(o,A,d,p)}}catch(h){const y=h instanceof Error?h.message:"Unknown error";console.error("Error registering album:",h),le(o,y,d,p)}},Po=async(e,r,l)=>{if(l.size===0){console.log("[SubAlbum] Error: No items selected"),alert(e("Please select at least one item to share."));return}if(r)try{console.log("[SubAlbum] Creating loading modal");const s=document.createElement("div");s.style.position="fixed",s.style.top="0",s.style.left="0",s.style.width="100%",s.style.height="100%",s.style.backgroundColor="rgba(0, 0, 0, 0.5)",s.style.display="flex",s.style.justifyContent="center",s.style.alignItems="center",s.style.zIndex="2000";const a=document.createElement("div");a.style.backgroundColor="white",a.style.padding="30px",a.style.borderRadius="8px",a.style.textAlign="center";const d=document.createElement("p");d.textContent=e("Selecting files..."),a.appendChild(d),s.appendChild(a),document.body.appendChild(s),console.log("[SubAlbum] Loading modal added to DOM");const f=[],p=[];console.log("[SubAlbum] Starting to process selected items"),Array.from(l).forEach((h,y)=>{var w;console.log(`[SubAlbum] Processing item ${y+1}/${l.size}, index: ${h}`);const g=r.mediaItems[h];if(console.log("[SubAlbum] Media item found:",{hasMediaItem:!!g,fileId:g==null?void 0:g.fileId,type:g==null?void 0:g.type,hasUrl:!!(g!=null&&g.url),fileDisplayName:g==null?void 0:g.fileDisplayName}),g&&g.fileId){f.push(g.fileId);let u;if(g.fileDisplayName)u=g.fileDisplayName,console.log(`[SubAlbum] Using fileDisplayName: ${u}`);else{const b=g.fileId.split("_____");u=((w=b[1])==null?void 0:w.split("____")[0])||`file-${h}`,console.log("[SubAlbum] Extracted fileName from fileId:",{fileIdParts:b,fileName:u})}const c={fileName:u,s3PreviewUrl:g.type==="video"&&g.thumbnailUrl||g.url,type:g.type==="video"?"video":"image",size:0,status:"complete",progress:100,fileId:g.fileId,duration:g.type==="video"&&g.duration?parseFloat(g.duration.split(":").reduce((b,S)=>60*b+parseFloat(S),0).toString()):null};console.log("[SubAlbum] Created SelectedPhoto object:",c),p.push(c)}else console.warn(`[SubAlbum] Skipping invalid media item at index ${h}`)}),console.log("[SubAlbum] Processing complete. Summary:",{selectedFileIdsCount:f.length,selectedPhotosCount:p.length,fileIdsSample:f.slice(0,2)});const o={isSubAlbum:!0,selectedFileIds:f,selectedPhotos:p};console.log("[SubAlbum] Created subAlbumData:",{isSubAlbum:o.isSubAlbum,selectedFileIdsCount:o.selectedFileIds.length,selectedPhotosCount:o.selectedPhotos.length});try{console.log(`[SubAlbum] Saving to localStorage with key: ${ae.SUB_ALBUM_DATA}`);const h=JSON.stringify(o);console.log(`[SubAlbum] Serialized data length: ${h.length} characters`),localStorage.setItem(ae.SUB_ALBUM_DATA,h),console.log("[SubAlbum] Successfully saved to localStorage")}catch(h){if(console.error("[SubAlbum] Error saving to localStorage:",h),h instanceof DOMException&&(h.name==="QuotaExceededError"||h.name==="NS_ERROR_DOM_QUOTA_REACHED")){console.error("[SubAlbum] localStorage quota exceeded"),alert(e("Storage limit exceeded. The album may be too large to share this way.")),document.body.removeChild(s);return}throw h}console.log("[SubAlbum] Removing loading modal"),document.body.removeChild(s),console.log("[SubAlbum] Redirecting to save-album.html"),be("save-album.html")}catch(s){console.error("[SubAlbum] Error creating selection:",s),alert(e("There was an error creating the selection. Please try again."));try{const a=document.querySelector('div[style*="position: fixed"][style*="backgroundColor: rgba(0, 0, 0, 0.5)"]');a&&a.parentNode&&(console.log("[SubAlbum] Cleaning up loading modal after error"),a.parentNode.removeChild(a))}catch(a){console.error("[SubAlbum] Error cleaning up after main error:",a)}}else console.error("[SubAlbum] Error: Album data is null"),alert(e("Cannot create selection: Album data is missing."))},we=(e,r,l,s)=>{l.style.width=`${e}%`,s&&(r.textContent=s)},jo=()=>{const[e,r]=n.useState(void 0),[l,s]=n.useState(!1),[a,d]=n.useState(!1),[f,p]=n.useState(null),[o,h]=n.useState(!1),y=n.useCallback(()=>!e||l||e==="NoPassword"?!0:e==="NotVisible"?(f&&console.error("Password error:",f),!1):!0,[e,l,f]),g=n.useCallback(()=>{const c=(f==null?void 0:f.toLowerCase().includes("watermark"))??!1;return!l&&e==="Watermark"||c},[l,e,f]),w=n.useCallback(()=>!l&&e!==void 0&&e!=="NoPassword",[l,e]),u=n.useCallback(()=>{p(null),d(!0)},[]);return{passwordPolicy:e,setPasswordPolicy:r,isAuthorized:l,setIsAuthorized:s,showPasswordModal:a,setShowPasswordModal:d,passwordError:f,setPasswordError:p,passwordVerified:o,setPasswordVerified:h,shouldShowContent:y,shouldShowWatermark:g,showingEnterPassword:w,promptForPassword:u}},ko=()=>{const[e,r]=n.useState(!1),[l,s]=n.useState(new Set),a=n.useCallback((o,h)=>{h.stopPropagation(),s(y=>{const g=new Set(y);return g.has(o)?g.delete(o):g.add(o),g})},[]),d=n.useCallback(o=>{if(o<=0)return;const h=new Set(Array.from({length:o},(y,g)=>g));s(h)},[]),f=n.useCallback(()=>{s(new Set)},[]),p=n.useCallback(()=>{r(!1),s(new Set)},[]);return{isSelectionMode:e,setIsSelectionMode:r,selectedItems:l,setSelectedItems:s,toggleItemSelection:a,selectAll:d,unselectAll:f,cancelSelection:p}},Ao=(e,r,l,s)=>{const[a,d]=n.useState(!1),[f,p]=n.useState(!1),[o,h]=n.useState(!1),[y,g]=n.useState([]);n.useEffect(()=>{if(e&&e.profileIds&&l){const c=`${l}_____Public____Profile`;g(e.profileIds),h(e.profileIds.includes(c))}},[e,l]);const w=n.useCallback(()=>{const c=qe(r,e==null?void 0:e.albumNanoId,(e==null?void 0:e.creatorId)&&(e==null?void 0:e.contacts)&&(e==null?void 0:e.contacts[e==null?void 0:e.creatorId]),e==null?void 0:e.folderName);navigator.clipboard.writeText(c).then(()=>{d(!1),p(!0)}).catch(b=>{console.error("Failed to copy link:",b),alert(s("Failed to copy link"))})},[r,s]),u=n.useCallback(async()=>{var c,b,S;if(!l||!r){alert(s("You must be logged in to perform this action"));return}try{const A=await De();if(!A){console.error("Authentication failed");return}const k=`${l}_____Public____Profile`,I=[...y];if(o){const E=I.indexOf(k);E>-1&&I.splice(E,1)}else I.push(k);const V=await(await fetch(pe,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${A}`},body:JSON.stringify({query:`
        mutation ChangeAlbumVisibility($folderPositionChangeProfileIdsInput: FolderPositionChangeProfileIdsInput!) {
          changeFiles(folderPositionChangeProfileIdsInput: $folderPositionChangeProfileIdsInput) {
            items {
              ... on FolderPosition {
                id
                profileIds
              }
            }
          }
        }
      `,variables:{folderPositionChangeProfileIdsInput:{folderId:r,profileIds:I}}})})).json();if(V.errors)throw new Error(((c=V.errors[0])==null?void 0:c.message)||"Unknown error");const $=(((S=(b=V==null?void 0:V.data)==null?void 0:b.changeFiles)==null?void 0:S.items)||[]).find(E=>E.folderPositionId===(e==null?void 0:e.folderPositionId));$&&$.profileIds&&(g($.profileIds),h($.profileIds.includes(k)),console.log("Album visibility updated successfully"))}catch(A){console.error("Failed to toggle album visibility:",A),alert(s("Failed to update album visibility. Please try again."))}},[l,r,y,o,e,s]);return{showingCopyLinkAlert:a,setShowingCopyLinkAlert:d,showingCopiedLinkAlert:f,setShowingCopiedLinkAlert:p,isOnPublicProfile:o,handleCopy:w,handlePublicProfileToggle:u}},$o=({showSelectPhotosButton:e,albumData:r,openFilePicker:l,t:s})=>!e||!(r!=null&&r.usingFolderInviteGrantsRightToAddItems)?null:t.jsx("div",{style:{width:"100%",display:"flex",justifyContent:"center",marginBottom:"20px",marginTop:"10px"},children:t.jsx("button",{onClick:l,style:{backgroundColor:"#007bff",color:"white",border:"none",borderRadius:"6px",padding:"12px 20px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"8px",fontSize:"16px",boxShadow:"0 2px 4px rgba(0,0,0,0.1)"},children:t.jsx("span",{children:s("Select Photos To Add To Album")})})}),Eo=({isSelectionMode:e,t:r})=>e?t.jsx(Vt,{children:t.jsx("p",{children:r("Select photos and videos to share")})}):null,No=W.div`
  width: 100%;
  /* Remove gray background, padding, border, and border-radius */
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  direction: ${e=>e.$isRTL?"rtl":"ltr"};
`,Ye=W.div`
  margin-bottom: 8px; /* Reduced from 12px to 8px for tighter spacing */

  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 6px; /* Tighter mobile spacing */
  }
`,Je=W.div`
  display: flex;
  flex-direction: ${e=>e.$isRTL?"row-reverse":"row"};
  gap: 12px; /* Keep 12px horizontal spacing between tag buttons */
  overflow-x: auto;
  padding-bottom: 6px; /* Reduced from 8px to 6px */
  -webkit-overflow-scrolling: touch;
  flex-wrap: nowrap;
  align-items: center;

  /* Hide scrollbar for WebKit browsers */
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for Firefox */
  scrollbar-width: none;
  
  @media (max-width: 480px) {
    gap: 8px; /* Tighter mobile spacing */
    padding-bottom: 4px; /* Tighter mobile spacing */
  }
`,Lo=W.button`
  padding: 6px 12px; /* Keeping existing padding for good touch targets */
  border: 1px solid ${e=>e.$isDisplayed?"#28a745":e.$isSelected?"#000000":"#ced4da"};
  border-radius: 16px;
  background: ${e=>e.$isDisplayed?"#28a745":e.$isSelected?"#000000":"#ffffff"};
  color: ${e=>e.$isDisplayed||e.$isSelected?"#ffffff":"#495057"};
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
  height: 36px; /* Reduced from 40px to 36px */
  display: flex;
  align-items: center;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background: ${e=>e.$isDisplayed?"#1e7e34":e.$isSelected?"#333333":"#e9ecef"};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  @media (max-width: 480px) {
    padding: 5px 10px; /* Slightly tighter mobile padding */
    font-size: 12px;
    height: 32px; /* Reduced mobile height */
    max-width: 250px;
    border-radius: 12px;
  }
`,Ro=W.button`
  padding: 4px 8px;
  border: 1px solid ${e=>e.$isSelected?"#000000":"#ced4da"};  // Changed from #007bff to #000000 (black)
  border-radius: 12px;
  background: ${e=>e.$isSelected?"#000000":"#ffffff"};  // Changed from #007bff to #000000 (black)
  color: ${e=>e.$isSelected?"#ffffff":"#495057"};
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
  height: 28px; /* Reduced height for subtags */
  display: flex;
  align-items: center;

  &:hover {
    background: ${e=>e.$isSelected?"#333333":"#e9ecef"};  // Changed from #0056b3 to #333333 (dark gray)
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  @media (max-width: 480px) {
    padding: 3px 6px; /* Tighter mobile padding */
    font-size: 11px;
    height: 24px; /* Smaller mobile height */
    border-radius: 8px;
  }
`,Mo=W.div`
  margin-top: 6px; /* Reduced from 8px to 6px */
  font-size: 13px;
  color: #555;
  font-style: italic;
  text-align: ${e=>e.$isRTL?"right":"left"};
`,Fo=W.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 6px 0; /* Reduced from 8px to 6px */
`,_o=W.button`
  padding: 6px 12px;
  border: 1px solid #dc3545;
  border-radius: 16px;
  background: #ffffff;
  color: #dc3545;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
  height: 36px; /* Reduced from 40px to 36px */
  display: flex;
  align-items: center;

  &:hover {
    background: #dc3545;
    color: #ffffff;
    transform: translateY(-1px);
  }
  
  @media (max-width: 480px) {
    padding: 5px 10px; /* Tighter mobile padding */
    font-size: 12px;
    height: 32px; /* Reduced mobile height */
    border-radius: 12px;
  }
`,Uo=({mediaItems:e,onFilterChange:r,resetFilter:l})=>{var $,E,F,X,G;const{t:s,language:a}=fe(),d=ue(a)==="rtl";console.log("🎯 MediaTagsFilter received props:",{mediaItemsCount:e.length,mediaItemsWithTags:e.filter(m=>m.selectedTags&&m.selectedTags.length>0).length,firstItemHasTags:!!(($=e[0])!=null&&$.selectedTags),firstItemTagCount:((F=(E=e[0])==null?void 0:E.selectedTags)==null?void 0:F.length)||0,sampleTags:((G=(X=e[0])==null?void 0:X.selectedTags)==null?void 0:G.slice(0,2))||[]}),e.slice(0,3).forEach((m,T)=>{var P,C;console.log(`🎯 Filter received item ${T}:`,{fileId:m.fileId,hasSelectedTags:!!m.selectedTags,tagCount:((P=m.selectedTags)==null?void 0:P.length)||0,tags:((C=m.selectedTags)==null?void 0:C.map(U=>{var _;return`${U.tagTitle}(${((_=U.subtags)==null?void 0:_.length)||0})`}))||[]})});const[f,p]=n.useState([]),[o,h]=n.useState([]),[y,g]=n.useState(null),[w,u]=n.useState([]),c=m=>m.subtags.filter(T=>o.includes(T.key)),b=m=>{const T=c(m);if(T.length===0)return`${m.tagTitle} (${m.count})`;const P=T.map(C=>`${C.subtagTitle} (${C.count})`).join(", ");return`${m.tagTitle} (${P})`};n.useEffect(()=>{console.log("🏷️ MediaTagsFilter: Starting tag extraction from mediaItems:",e.length);const m=new Map;e.forEach((P,C)=>{var U,_;console.log(`🏷️ Processing mediaItem ${C}:`,{fileId:P.fileId,hasSelectedTags:!!P.selectedTags,selectedTagsLength:((U=P.selectedTags)==null?void 0:U.length)||0}),(_=P.selectedTags)==null||_.forEach((L,v)=>{var B;console.log(`  🏷️ Processing tag ${v}:`,L);const j=`${L.TagType}-${L.tagTitle}`;m.has(j)||(m.set(j,{tag:{key:j,TagType:L.TagType,tagTitle:L.tagTitle,count:0,subtags:[]},count:0}),console.log(`    ✅ Created new tag: ${j}`));const R=m.get(j);R.count++,R.tag.count=R.count,console.log(`    📊 Updated tag count: ${j} = ${R.count}`),(B=L.subtags)==null||B.forEach((Y,Q)=>{console.log(`    🏷️ Processing subtag ${Q}:`,Y);const Z=`${Y.TagType}-${Y.tagTitle}-${Y.subtagTitle}`,J=R.tag,ee=J.subtags.find(te=>te.key===Z);ee?(ee.count++,console.log(`      📊 Updated subtag count: ${Z} = ${ee.count}`)):(J.subtags.push({key:Z,TagType:Y.TagType,tagTitle:Y.tagTitle,subtagTitle:Y.subtagTitle,count:1}),console.log(`      ✅ Created new subtag: ${Z}`))})})});const T=Array.from(m.values()).sort((P,C)=>C.count-P.count).map(P=>(P.tag.subtags.sort((C,U)=>U.count-C.count),P.tag));console.log("🏷️ Final tags array:",{totalTags:T.length,tags:T.map(P=>({key:P.key,title:P.tagTitle,count:P.count,subtagsCount:P.subtags.length}))}),p(T),u(T)},[e]);const S=m=>{if(m.length===0){l(),u(f);return}const T=e.filter(P=>{var U;const C=new Set;return(U=P.selectedTags)==null||U.forEach(_=>{var L;C.add(`${_.TagType}-${_.tagTitle}`),(L=_.subtags)==null||L.forEach(v=>{C.add(`${v.TagType}-${v.tagTitle}-${v.subtagTitle}`)})}),m.every(_=>C.has(_))});O(T),r(T)},A=m=>{const T=o.includes(m.key),P=y===m.key;if(T){if(T&&!P)g(m.key);else if(T&&P){const C=o.filter(U=>U!==m.key&&!m.subtags.some(_=>_.key===U));h(C),g(null),S(C)}}else{const C=[...o,m.key];h(C),g(m.key),S(C)}},k=m=>{const T=o.includes(m.key);let P;T?P=o.filter(C=>C!==m.key):P=[...o,m.key],h(P),S(P)},I=()=>{h([]),g(null),l(),u(f)},O=m=>{const T=new Set;m.forEach(C=>{var U;(U=C.selectedTags)==null||U.forEach(_=>{T.add(`${_.TagType}-${_.tagTitle}`)})}),o.forEach(C=>{C.includes("-",C.indexOf("-")+1)||T.add(C)});const P=f.filter(C=>T.has(C.key));u(P)},K=y?f.find(m=>m.key===y):null,V=o.length,i=f.length>0;return console.log("🎯 MediaTagsFilter render decision:",{allTagsLength:f.length,hasTags:i,willRender:i}),i?(console.log("✅ MediaTagsFilter: Rendering with tags"),t.jsxs(No,{$isRTL:d,children:[t.jsx(Ye,{children:t.jsxs(Je,{$isRTL:d,children:[V>0&&t.jsx(_o,{onClick:I,children:s("Clear All")}),w.length>0?w.map(m=>{const T=c(m),P=T.length>0?s("{{tagType}}: {{tagTitle}} ({{subtags}})",{tagType:m.TagType,tagTitle:m.tagTitle,subtags:T.map(C=>C.subtagTitle).join(", ")}):s("Click to add/remove: {{tagType}}: {{tagTitle}}",{tagType:m.TagType,tagTitle:m.tagTitle});return t.jsx(Lo,{$isSelected:o.includes(m.key),$isDisplayed:y===m.key,onClick:()=>A(m),title:P,children:b(m)},m.key)}):t.jsx(Fo,{children:s("No tags available")})]})}),K&&K.subtags.length>0&&t.jsx(Ye,{children:t.jsx(Je,{$isRTL:d,children:K.subtags.map(m=>t.jsxs(Ro,{$isSelected:o.includes(m.key),onClick:()=>k(m),title:s("Click to add/remove: {{tagType}}: {{tagTitle}} → {{subtagTitle}}",{tagType:m.TagType,tagTitle:m.tagTitle,subtagTitle:m.subtagTitle}),children:[m.subtagTitle," (",m.count,")"]},m.key))})}),V>0&&t.jsx(Mo,{$isRTL:d,children:s("Showing photos with all selected tags")})]})):(console.log("❌ MediaTagsFilter: No tags found, returning null"),null)},Oo=W.div`
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
  position: relative;
`,Bo=W.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  z-index: 10;
  position: relative;
  gap: 8px;
`,zo=W.div`
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  max-width: 600px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 4px;
  opacity: 0.9;
`,Wo=W.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  &:hover {
    opacity: 0.8;
  }
`,Yo=W.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 10px;
  position: relative;
  touch-action: none; /* Prevent default touch behaviors */
`,Jo=W.div`
  transform: scale(${e=>e.$scale}) translate(${e=>e.$translateX}px, ${e=>e.$translateY}px);
  transition: transform 0.1s ease-out;
  transform-origin: center center;
  will-change: transform;
`,Ve=W.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  max-height: 100%;
`,Vo=W.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  opacity: ${e=>e.$isLoaded?1:0};
  transition: opacity 0.3s ease;
  user-select: none;
  pointer-events: none;
`,Xo=W.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  opacity: 0.8;
  filter: blur(2px);
  user-select: none;
  pointer-events: none;
`,Ko=W.video`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  user-select: none;
`,Go=W.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 14px;
  opacity: ${e=>e.$visible?1:0};
  transition: opacity 0.3s ease;
  z-index: 5;
  pointer-events: none;
`,Ho=({src:e,onLoadedData:r,t:l})=>t.jsxs(Ko,{controls:!0,autoPlay:!0,playsInline:!0,onLoadedData:r,children:[t.jsx("source",{src:e,type:"video/mp4"}),l("Your browser does not support the video tag.")]}),qo=({item:e,index:r,onClose:l,onPrev:s,onNext:a,hasNext:d,hasPrev:f,ownerName:p,showWatermark:o=!1})=>{const[h,y]=n.useState(!1),[g,w]=n.useState(!0),{t:u}=fe(),[c,b]=n.useState(1),[S,A]=n.useState(0),[k,I]=n.useState(0),[O,K]=n.useState(!1),V=n.useRef(null),i=n.useRef(null),$=n.useRef(0),E=n.useRef(!1),F=.5,X=4,G=300;n.useEffect(()=>{b(1),A(0),I(0),y(!1),w(!0)},[e.url]);const m=n.useCallback(()=>{K(!0),setTimeout(()=>K(!1),1500)},[]),T=n.useCallback((L,v,j)=>{if(!V.current)return{x:L,y:v};const R=V.current.getBoundingClientRect(),B=Math.max(0,R.width*(j-1)/2),Y=Math.max(0,R.height*(j-1)/2);return{x:Math.max(-B,Math.min(B,L)),y:Math.max(-Y,Math.min(Y,v))}},[]);n.useEffect(()=>{const L=v=>{v.key==="Escape"?l():v.key==="ArrowLeft"&&f&&c<=1?s():v.key==="ArrowRight"&&d&&c<=1&&a()};return window.addEventListener("keydown",L),()=>window.removeEventListener("keydown",L)},[l,a,s,d,f,c]);const P=(L,v)=>{const j=L.clientX-v.clientX,R=L.clientY-v.clientY;return Math.sqrt(j*j+R*R)},C=L=>{L.preventDefault();const v=L.touches,j=Date.now();if(v.length===1){const R=v[0];if(j-$.current<G){c>1?(b(1),A(0),I(0)):(b(2),A(0),I(0),m()),$.current=0;return}$.current=j,i.current={startX:R.clientX,startY:R.clientY,lastX:R.clientX,lastY:R.clientY,startDistance:0,startScale:c,startTranslateX:S,startTranslateY:k}}else if(v.length===2){const R=P(v[0],v[1]),B=(v[0].clientX+v[1].clientX)/2,Y=(v[0].clientY+v[1].clientY)/2;i.current={startX:B,startY:Y,lastX:B,lastY:Y,startDistance:R,startScale:c,startTranslateX:S,startTranslateY:k},E.current=!0}},U=L=>{if(L.preventDefault(),!i.current)return;const v=L.touches;if(v.length===1&&c>1){const j=v[0],R=j.clientX-i.current.lastX,B=j.clientY-i.current.lastY,Y=S+R/c,Q=k+B/c,Z=T(Y,Q,c);A(Z.x),I(Z.y),i.current.lastX=j.clientX,i.current.lastY=j.clientY,E.current=!0}else if(v.length===2){const R=P(v[0],v[1])/i.current.startDistance,B=Math.max(F,Math.min(X,i.current.startScale*R));if(b(B),B<=1)A(0),I(0);else{const Y=T(i.current.startTranslateX,i.current.startTranslateY,B);A(Y.x),I(Y.y)}B>1.1&&m(),E.current=!0}},_=L=>{if(!i.current)return;const v=L.touches;if(v.length===0&&!E.current&&c<=1){const j=i.current.lastX-i.current.startX,R=i.current.lastY-i.current.startY;Math.sqrt(j*j+R*R)>50&&Math.abs(j)>Math.abs(R)*2&&(j>0&&f?s():j<0&&d&&a())}if(v.length===0)i.current=null,E.current=!1;else if(v.length===1&&i.current){const j=v[0];i.current.lastX=j.clientX,i.current.lastY=j.clientY,E.current=!1}};return t.jsxs(Xt,{children:[t.jsxs(Oo,{children:[t.jsx(Wo,{onClick:l,children:"✕"}),t.jsxs(Kt,{children:[t.jsx(H,{onClick:f?s:void 0,disabled:!f||c>1,$isDisabled:!f||c>1,children:"←"}),t.jsx(H,{onClick:d?a:void 0,disabled:!d||c>1,$isDisabled:!d||c>1,children:"→"})]})]}),t.jsxs(Go,{$visible:O,children:[Math.round(c*100),"%"]}),t.jsxs(Yo,{ref:V,onTouchStart:C,onTouchMove:U,onTouchEnd:_,children:[t.jsx(Jo,{$scale:c,$translateX:S,$translateY:k,children:e.type==="image"?t.jsxs(Ve,{children:[t.jsx(Vo,{src:e.url,alt:u("Image {{index}}",{index:r+1}),$isLoaded:h,onLoad:()=>{y(!0),w(!1)},draggable:!1}),o&&t.jsx(ce,{$type:"watermark",children:t.jsx(Ie,{children:"6180 Watermarked"})}),!h&&e.thumbnailUrl&&t.jsx(Xo,{src:e.thumbnailUrl,alt:u("Thumbnail {{index}}",{index:r+1}),draggable:!1})]}):t.jsxs(Ve,{children:[t.jsx(Ho,{src:e.url,onLoadedData:()=>w(!1),t:u}),o&&t.jsx(ce,{$type:"watermark",children:t.jsx(Ie,{children:"6180 Watermarked"})})]})}),g&&t.jsx(Gt,{children:e.type==="image"?u("Loading full resolution..."):u("Loading video...")})]}),t.jsxs(Bo,{children:[e.fileDisplayName&&t.jsx(zo,{title:e.fileDisplayName,children:e.fileDisplayName}),e.ownerContactId&&p&&t.jsxs(Ht,{href:`https://6180.io/${p}`,children:[t.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[t.jsx("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),t.jsx("circle",{cx:"12",cy:"7",r:"4"})]}),p]})]})]})},Do=({isOpen:e,onClose:r,onSubmit:l,error:s,t:a})=>{const[d,f]=n.useState(""),[p,o]=n.useState(!1);if(!e)return null;const h=y=>{y.preventDefault(),o(!0),l(d),o(!1)};return t.jsx(Ze,{children:t.jsxs(et,{style:{maxWidth:"400px",textAlign:"center",padding:"32px"},children:[t.jsx("h3",{style:{margin:"0 0 24px 0"},children:a("Enter Password")}),t.jsxs("form",{onSubmit:h,style:{width:"100%"},children:[t.jsxs($e,{children:[t.jsx(Ee,{type:"password",value:d,onChange:y=>f(y.target.value),placeholder:a("Password"),style:{border:s?"1px solid #d32f2f":void 0,padding:"12px",width:"100%",boxSizing:"border-box"},required:!0}),s&&t.jsx("div",{style:{color:"#d32f2f",fontSize:"14px",marginTop:"8px",textAlign:"left"},children:s})]}),t.jsxs("div",{style:{display:"flex",gap:"12px",width:"100%"},children:[t.jsx(H,{type:"button",onClick:r,style:{backgroundColor:"#f3f4f6",color:"#333",flex:1},children:a("Cancel")}),t.jsx(H,{type:"submit",$primary:!0,disabled:p||!d,style:{flex:1},children:a(p?"Submitting...":"Submit")})]})]}),t.jsx(tt,{children:a("Two-Factor Authentication")})]})})},Ae=new bo({region:Et});function Xe(e){const r=e.trim().toLowerCase(),l="@gmail.com";return r.endsWith(l)?`${r.slice(0,-l.length).replace(/\./g,"")}${l}`:r}const Qo=({isOpen:e,onClose:r,onLoginSuccess:l,ownerName:s="the album owner",t:a})=>{const[d,f]=n.useState(""),[p,o]=n.useState(!1),[h,y]=n.useState(""),[g,w]=n.useState(""),[u,c]=n.useState("idle"),[b,S]=n.useState(""),A=n.useRef(null),k=n.useRef(null);n.useEffect(()=>{p&&k.current&&k.current.focus()},[p]),n.useEffect(()=>{e&&A.current&&!p&&A.current.focus()},[e,p]);function I(i){const $=i.target.value;/^\d*$/.test($)&&$.length<=6&&y($)}async function O(){var $;c("sending"),S("");const i=Xe(d);if(!i||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i)){c("error"),S(a("Please enter a valid email address"));return}try{const E=new So({ClientId:ve,Username:i,Password:crypto.randomUUID(),UserAttributes:[{Name:"email",Value:i}]});try{await Ae.send(E)}catch(G){if(!(($=G.name)!=null&&$.includes("UsernameExistsException")))throw G}const F=new Io({ClientId:ve,AuthFlow:"CUSTOM_AUTH",AuthParameters:{USERNAME:i}}),X=await Ae.send(F);if(X.Session)w(X.Session),o(!0),c("idle");else throw new Error("No session returned from InitiateAuth")}catch(E){console.error(E),c("error"),S(a("Unable to send verification code. Please try again later."))}}async function K(){var $,E,F,X,G,m;c("verifying"),S("");const i=Xe(d);try{const T=new To({ClientId:ve,ChallengeName:"CUSTOM_CHALLENGE",ChallengeResponses:{USERNAME:i,ANSWER:h},Session:g}),C=($=(await Ae.send(T)).AuthenticationResult)==null?void 0:$.IdToken;if(!C)throw new Error("No token received");localStorage.setItem("idToken",C);const L=`${JSON.parse(atob(C.split(".")[1]))["cognito:username"]}_____Public____Profile`,j=await(await fetch(pe,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${C}`},body:JSON.stringify({query:`
            mutation MyMutation($relationIds: [ID!]) {
              batchGetItems(relationIds: $relationIds) {
                items {
                  id
                  item {
                    ... on Profile {
                      anyDisplayName
                    }
                  }
                }
                nextToken
              }
            }
          `,variables:{relationIds:[L]}})})).json(),R=(m=(G=(X=(F=(E=j==null?void 0:j.data)==null?void 0:E.batchGetItems)==null?void 0:F.items)==null?void 0:X[0])==null?void 0:G.item)==null?void 0:m.anyDisplayName;R&&localStorage.setItem(ae.PUBLIC_USERNAME,R),c("idle"),l(),r()}catch(T){console.error(T),c("error"),S(a("Invalid or expired verification code. Please try again or request a new code."))}}function V(){o(!1),y(""),c("idle")}return e?t.jsx(Ze,{children:t.jsxs(et,{style:{maxWidth:"400px",textAlign:"center",padding:"32px"},children:[t.jsx("img",{src:Qe("images/logo_no_background.png"),alt:"6180 Logo",style:{height:"60px",marginBottom:"24px"}}),t.jsx("h3",{style:{margin:"0 0 24px 0",lineHeight:"1.6"},children:a("{ownerName} only shared this album with friends and family").replace("{ownerName}",s)}),b&&t.jsx("div",{style:{backgroundColor:"#f8d7da",color:"#721c24",padding:"12px",borderRadius:"8px",marginBottom:"16px",fontSize:"14px",textAlign:"left"},children:b}),p?t.jsxs("form",{style:{width:"100%"},children:[t.jsxs("p",{style:{marginBottom:"16px",color:"#555",textAlign:"left"},children:[a("Check your email for a 6-digit verification code sent to")," ",t.jsx("strong",{children:d})]}),t.jsx($e,{children:t.jsx(Ee,{ref:k,type:"tel",inputMode:"numeric",pattern:"[0-9]*",maxLength:6,value:h,onChange:I,placeholder:a("Enter 6-digit code"),style:{letterSpacing:"2px",textAlign:"center",padding:"12px",width:"100%",boxSizing:"border-box"}})}),t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px",width:"100%"},children:[t.jsx(H,{onClick:K,disabled:u==="verifying"||h.length!==6,$primary:!0,style:{width:"100%",backgroundColor:"#28a745"},children:a(u==="verifying"?"Verifying...":"Verify Code")}),t.jsxs("div",{style:{fontSize:"14px",color:"#666",display:"flex",justifyContent:"center",gap:"8px"},children:[t.jsx("span",{children:a("Didn't receive a code?")}),t.jsx("button",{onClick:V,style:{background:"none",border:"none",color:"#007bff",padding:0,cursor:"pointer",fontSize:"14px",textDecoration:"underline"},children:a("Send new code")})]}),t.jsx(H,{onClick:r,style:{width:"100%",backgroundColor:"#f8f9fa",color:"#555",border:"1px solid #ccc"},children:a("Cancel")})]})]}):t.jsxs("form",{style:{width:"100%"},children:[t.jsx($e,{children:t.jsx(Ee,{ref:A,type:"email",value:d,onChange:i=>f(i.target.value),placeholder:a("Email address..."),style:{padding:"12px",width:"100%",boxSizing:"border-box"}})}),t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px",width:"100%"},children:[t.jsx(H,{onClick:O,disabled:u==="sending"||!d.trim(),$primary:!0,style:{width:"100%"},children:a(u==="sending"?"Sending...":"Send Verification Code")}),t.jsx(H,{onClick:r,style:{width:"100%",backgroundColor:"#f8f9fa",color:"#555",border:"1px solid #ccc"},children:a("Cancel")})]})]}),t.jsx(tt,{children:a("Two-Factor Authentication")})]})}):null},Zo=W.div`
  display: none; /* Hidden by default, controlled by refs */
`,Ke=W.input`
  display: none;
`,st=n.forwardRef(({onFileSelection:e,accept:r="image/*,video/*",multiple:l=!0},s)=>t.jsxs(Zo,{children:[t.jsx(Ke,{ref:s,id:"file-input",type:"file",accept:r,multiple:l,onChange:e}),t.jsx(Ke,{id:"folder-input",type:"file",accept:r,multiple:l,webkitdirectory:"",directory:"",onChange:e})]}));st.displayName="FileInput";W.div`
  display: flex;
  gap: 8px;
  align-items: center;
  direction: ${e=>e.$isRTL?"rtl":"ltr"};
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }
`;W.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: 2px solid ${e=>e.$variant==="primary"?"#007bff":"#6c757d"};
  border-radius: 12px;
  background: ${e=>e.$variant==="primary"?"#007bff":"transparent"};
  color: ${e=>e.$variant==="primary"?"white":"#6c757d"};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background: ${e=>e.$variant==="primary"?"#0056b3":"#6c757d"};
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;W.span`
  font-size: 16px;
`;const Ne=({src:e,thumbnailSrc:r,alt:l,className:s="",loadFullResolution:a=!1,onFullResolutionLoaded:d,onClick:f,showWatermark:p=!1})=>{const[o,h]=n.useState(!1),[y,g]=n.useState(!1),[w,u]=n.useState(!1),[c,b]=n.useState("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E"),{t:S}=fe();n.useEffect(()=>{if(r){const I=new globalThis.Image;I.src=r,I.onload=()=>{b(r),h(!0)}}},[r]),n.useEffect(()=>{if(a&&!y){u(!0);const I=new globalThis.Image;I.src=e,I.onload=()=>{b(e),g(!0),u(!1),d&&d()}}},[a,e,y,d]);const A=n.useCallback(I=>(I.preventDefault(),!1),[]),k=n.useCallback(I=>(I.preventDefault(),!1),[]);return t.jsxs(qt,{onClick:f,children:[t.jsx(Dt,{src:c,alt:l,className:s,$isLoaded:o,$objectFit:"cover",onContextMenu:A,onDragStart:k,draggable:!1,style:{cursor:f?"pointer":"default"}}),!o&&t.jsx(Qt,{}),w&&t.jsx(ce,{$type:"loading",children:S("Loading full resolution...")}),p&&o&&t.jsx(ce,{$type:"watermark",children:t.jsx(Ie,{children:"6180 Watermarked"})})]})},es=({thumbnailUrl:e,videoUrl:r,duration:l,index:s,onFullResolutionLoaded:a,onClick:d,showWatermark:f=!1})=>{const[p,o]=n.useState(!1),[h,y]=n.useState(!1),[g,w]=n.useState(!1),u=Nt.useRef(null),{t:c}=fe(),b=()=>{if(d){d();return}g?o(!0):y(!0)},S=()=>{w(!0),o(!0),a&&a()};n.useEffect(()=>{if(h&&u.current&&!g){const I=u.current,O=()=>{S(),I.removeEventListener("canplaythrough",O)};return I.addEventListener("canplaythrough",O),I.load(),()=>{I.removeEventListener("canplaythrough",O)}}},[h,g]);const A=n.useCallback(I=>(I.preventDefault(),!1),[]),k=n.useCallback(I=>(I.preventDefault(),!1),[]);return p?t.jsxs("div",{style:{position:"relative",width:"100%",height:"100%"},children:[t.jsxs("video",{ref:u,controls:!0,style:{width:"100%",height:"100%",userSelect:"none",WebkitUserSelect:"none",MozUserSelect:"none",msUserSelect:"none",WebkitTouchCallout:"none"},onContextMenu:A,onDragStart:k,draggable:!1,children:[t.jsx("source",{src:r,type:"video/mp4"}),c("Your browser does not support the video tag.")]}),f&&t.jsx(ce,{$type:"watermark",children:t.jsx(Ie,{children:"6180 Watermarked"})})]}):h&&!g?t.jsxs(ze,{children:[t.jsx(Ne,{src:r,thumbnailSrc:e,alt:`Video thumbnail ${s+1}`,showWatermark:f}),t.jsx(ce,{$type:"loading",children:c("Loading video...")}),t.jsx("video",{ref:u,style:{display:"none",userSelect:"none",WebkitUserSelect:"none",MozUserSelect:"none",msUserSelect:"none",WebkitTouchCallout:"none"},preload:"auto",onContextMenu:A,onDragStart:k,draggable:!1,children:t.jsx("source",{src:r,type:"video/mp4"})})]}):t.jsxs(ze,{onClick:b,children:[t.jsx(Ne,{src:r,thumbnailSrc:e,alt:`Video thumbnail ${s+1}`,showWatermark:f}),t.jsx(Zt,{}),t.jsx(ot,{$position:"bottomLeft",children:l})]})},ts=({item:e,index:r,isSelectionMode:l,isSelected:s,toggleItemSelection:a,openFullscreenView:d,showWatermark:f,ownerName:p})=>t.jsxs("div",{style:{position:"relative",border:l&&s?"3px solid #006adc":void 0,borderRadius:"8px",overflow:"hidden",boxShadow:l&&s?"0 0 0 3px rgba(0, 106, 220, 0.3)":void 0},onClick:o=>l?a(r,o):d(r),children:[l&&t.jsx(eo,{$isSelected:s,onClick:o=>a(r,o),children:s&&t.jsx(to,{children:"✓"})}),e.type==="image"?t.jsx(Ne,{src:e.url,thumbnailSrc:e.thumbnailUrl,alt:`Album image ${r+1}`,loadFullResolution:!1,onFullResolutionLoaded:()=>{},onClick:()=>l?void 0:d(r),showWatermark:f}):t.jsx(es,{thumbnailUrl:e.thumbnailUrl||"",videoUrl:e.url,duration:e.duration||"0:00",index:r,onFullResolutionLoaded:()=>{},onClick:()=>l?void 0:d(r),showWatermark:f}),p&&t.jsx(ot,{$position:"bottomRight",$light:!0,children:p})]},r),os=({isLoading:e,error:r,albumData:l,columns:s,shouldShowContent:a,shouldShowWatermark:d,isSelectionMode:f,selectedItems:p,toggleItemSelection:o,openFullscreenView:h,t:y})=>e?t.jsx(xe,{$type:"loading",id:"loading-message",children:y("Loading album content...")}):r?t.jsx(xe,{$type:"error",children:r}):a()?!l||l.mediaItems.length===0?t.jsx(xe,{$type:"error",children:y("No media found in this album")}):t.jsx(oo,{id:"media-grid",$columns:s,children:l.mediaItems.map((g,w)=>{const u=g.ownerContactId&&l.contacts[g.ownerContactId]?l.contacts[g.ownerContactId]:"",c=p.has(w),b=d();return t.jsx(ts,{item:g,index:w,isSelectionMode:f,isSelected:c,toggleItemSelection:o,openFullscreenView:h,showWatermark:b,ownerName:u},w)})}):t.jsx("div",{style:{gridColumn:"1 / -1",textAlign:"center",padding:"40px 0"},children:t.jsx(xe,{$type:"error",children:y("Enter the password to view album contents")})}),ss=({albumData:e,t:r})=>e?t.jsxs(t.Fragment,{children:[e.folderName&&e.folderName!==r("Photos")&&e.folderName!=="Photos"&&e.folderName.trim()!==""&&t.jsx(so,{id:"album-title",children:t.jsx(no,{children:e.folderName})}),e.folderDescription&&e.folderDescription.trim()!==""&&t.jsx(ro,{id:"description-container",children:t.jsx(io,{children:e.folderDescription})})]}):null,ns=({addPhotosToAlbum:e,saveAlbum:r,promptForPassword:l,showingEnterPassword:s,passwordPolicy:a,usingFolderInviteGrantsRightToAddItems:d,buttonStyle:f={},t:p})=>{const[o,h]=n.useState(!1),[y,g]=n.useState(!1),w=n.useRef(null),u=840,c={padding:"8px 16px",height:"40px",display:"flex",alignItems:"center",justifyContent:"center",...f};n.useEffect(()=>{g(window.innerWidth<u);const k=()=>{g(window.innerWidth<u)};return window.addEventListener("resize",k),()=>window.removeEventListener("resize",k)},[]);const b=()=>{h(!o)},S=()=>{h(!1)},A=k=>{k(),S()};return n.useEffect(()=>{const k=O=>{w.current&&!w.current.contains(O.target)&&h(!1)},I=()=>{h(!1)};return o&&(document.addEventListener("mousedown",k),window.addEventListener("scroll",I)),()=>{document.removeEventListener("mousedown",k),window.removeEventListener("scroll",I)}},[o]),y?t.jsxs("div",{ref:w,style:{position:"relative",display:"flex",alignItems:"center",justifyContent:"flex-end",width:"100%",flexWrap:"nowrap"},children:[!s&&t.jsxs("div",{style:{flexShrink:0},children:[t.jsxs(lo,{onClick:b,"aria-label":p("Menu"),"aria-expanded":o,style:{...c,padding:"8px 12px",fontSize:"14px"},children:[t.jsxs(ao,{children:[t.jsx(Pe,{}),t.jsx(Pe,{}),t.jsx(Pe,{})]}),p("Add")]}),o&&t.jsxs(co,{style:{padding:"8px 0",gap:"4px"},children:[d&&t.jsx(je,{onClick:()=>A(e),style:{padding:"8px 16px"},children:p("Add Photos To Album")}),t.jsx(je,{onClick:()=>A(r),style:{padding:"8px 16px"},children:p("Save To Library")}),t.jsx(je,{onClick:()=>A(r),style:{padding:"8px 16px"},children:p("Download")})]})]}),s&&a&&a!=="NoPassword"&&t.jsx("div",{style:{flexShrink:0},children:t.jsx(H,{onClick:l,$passwordSet:!0,style:{...c,padding:"8px 12px",fontSize:"14px"},children:p("Enter Password")})})]}):t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"16px",justifyContent:"flex-end",flexWrap:"nowrap"},children:[!s&&t.jsxs("div",{style:{display:"flex",gap:"16px",flexWrap:"nowrap"},children:[d&&t.jsx(H,{onClick:e,style:c,children:p("Add Photos")}),t.jsx(H,{onClick:r,style:c,children:p("Save To Library")}),t.jsx(H,{onClick:r,style:c,children:p("Download")})]}),s&&t.jsx("div",{children:t.jsx(H,{onClick:l,$passwordSet:!0,style:c,children:p("Enter Password")})})]})},rs=({t:e,isSelectionMode:r,selectedItems:l=new Set,shareSelectPhotos:s,cancelSelection:a,selectAll:d,unselectAll:f,showingEnterPassword:p,promptForPassword:o,passwordPolicy:h,isAuthorized:y,addPhotosToAlbum:g,saveAlbumDirectly:w,handleDownloadPhotos:u,handleCopyLink:c,albumData:b})=>{var V;const S=((V=b==null?void 0:b.mediaItems)==null?void 0:V.length)||0,A=S>0&&l.size===S,k=()=>t.jsxs("div",{style:{display:"flex",gap:"16px",alignItems:"center",justifyContent:"flex-start",width:"100%",marginBottom:"24px",paddingLeft:"24px",paddingRight:"24px"},children:[s&&t.jsxs(H,{onClick:s,disabled:l.size===0,style:{opacity:l.size===0?.5:1,backgroundColor:l.size>0?"#006adc":void 0,color:l.size>0?"white":void 0,padding:"8px 16px",marginLeft:"0"},children:[e("Share")," (",l.size,")"]}),S>0&&(A?t.jsx(H,{onClick:f,style:{padding:"8px 16px",marginLeft:"0"},children:e("Unselect All")}):t.jsx(H,{onClick:d,style:{padding:"8px 16px",marginLeft:"0"},children:e("Select All")})),t.jsx(H,{onClick:a,style:{padding:"8px 16px",marginLeft:"0"},children:e("Cancel")})]}),I=()=>!r&&!y&&h&&h!=="NoPassword"&&t.jsx(H,{onClick:o,$passwordSet:!0,style:{padding:"8px 16px"},children:e("Enter Password")}),O=()=>t.jsx(H,{onClick:u,style:{padding:"8px 16px"},children:e("Download")});return r?k():t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",width:"100%",flexWrap:"nowrap",alignItems:"center",marginBottom:"24px",paddingLeft:"24px",paddingRight:"24px"},children:[t.jsx("div",{style:{flexShrink:0},children:!p()&&t.jsx(t.Fragment,{children:t.jsx(H,{onClick:c,style:{padding:"8px 16px",marginLeft:"0"},children:e("Share")})})}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[I(),!r&&!(!y&&h&&h!=="NoPassword")&&(b!=null&&b.folderPositionId?O():t.jsx(ns,{addPhotosToAlbum:g,saveAlbum:w,downloadPhotos:u,promptForPassword:o,showingEnterPassword:p(),passwordPolicy:h,usingFolderInviteGrantsRightToAddItems:b==null?void 0:b.usingFolderInviteGrantsRightToAddItems,t:e,buttonStyle:{padding:"8px 16px"}}))]})]})},is=()=>{var Oe;const{t:e,language:r}=fe(),l=Mt(),s=ko(),a=jo(),d=Yt(e),[f,p]=n.useState("1"),[o,h]=n.useState(null),[y,g]=n.useState(!0),[w,u]=n.useState(null),[c,b]=n.useState(null),[S,A]=n.useState([]),[k,I]=n.useState(!1),[O,K]=n.useState(!1),[V,i]=n.useState(!1),[$,E]=n.useState(null),[F,X]=n.useState(!1),[G,m]=n.useState(()=>Math.floor(Math.random()*6)),[T,P]=n.useState(!0),C=[e("Tag, save and find that performance — before it's lost."),e("Tag, save and find that smile — before it's lost."),e("Tag, save and find that birthday — before it's lost."),e("Tag, save and find that sunset — before it's lost."),e("Tag, save and find that party — before it's lost."),e("Tag, save and find that vacation — before it's lost.")],U=Ut(x=>{x?be(`save-album.html?folderId=${encodeURIComponent(x)}`):be("save-album.html")}),{passwordPolicy:_,setPasswordPolicy:L,isAuthorized:v,setIsAuthorized:j,showPasswordModal:R,setShowPasswordModal:B,passwordError:Y,setPasswordError:Q,passwordVerified:Z,setPasswordVerified:J,shouldShowContent:ee,shouldShowWatermark:te,showingEnterPassword:Le,promptForPassword:he}=a;console.log("Password protection state:",{passwordPolicy:_,isAuthorized:v,showPasswordModal:R,passwordVerified:Z,showingEnterPassword:Le}),console.log("shouldShowContent result:",ee),console.log("shouldShowWatermark result:",te);const{fileInputRef:nt,isUploading:rt,progressTracker:it,log:Re}=U,{fullscreenItem:ne,openFullscreenView:Me,closeFullscreenView:lt,goToPrevItem:at,goToNextItem:ct}=l,{isSelectionMode:me,setIsSelectionMode:dt,selectedItems:re,toggleItemSelection:gt,selectAll:ut,unselectAll:pt,cancelSelection:ft}=s,se=Ao(o,c,$,e),ht=()=>ut(S.length),mt=()=>pt(),Fe=((Oe=o==null?void 0:o.mediaItems)==null?void 0:Oe.some(x=>x.selectedTags&&x.selectedTags.length>0))||!1;n.useEffect(()=>{(async()=>{try{await Ft(),Re("🔥 Photos page S3 credentials prewarmed successfully")}catch(M){Re(`⚠️ Photos page credential prewarming failed: ${String(M)}`)}})()},[]),n.useEffect(()=>{const x=setInterval(()=>{P(!1),setTimeout(()=>{m(M=>(M+1)%C.length),P(!0)},1e3)},7e3);return()=>clearInterval(x)},[C.length]),n.useEffect(()=>{var x,M;o!=null&&o.mediaItems&&(console.log("🎯 photos.tsx: albumData updated, checking mediaItems tags:",{totalItems:o.mediaItems.length,itemsWithTags:o.mediaItems.filter(N=>N.selectedTags&&N.selectedTags.length>0).length,firstItemTagCount:((M=(x=o.mediaItems[0])==null?void 0:x.selectedTags)==null?void 0:M.length)||0}),o.mediaItems.slice(0,3).forEach((N,q)=>{var z,D;console.log(`🎯 photos.tsx item ${q}:`,{fileId:N.fileId.substring(0,50)+"...",hasSelectedTags:!!N.selectedTags,tagCount:((z=N.selectedTags)==null?void 0:z.length)||0,tags:((D=N.selectedTags)==null?void 0:D.map(ie=>{var ge;return{type:ie.TagType,title:ie.tagTitle,subtags:((ge=ie.subtags)==null?void 0:ge.length)||0}}))||[]})}),A(o.mediaItems),I(!1))},[o]);const xt=x=>{A(x),I(!0),re.clear()},yt=()=>{o!=null&&o.mediaItems&&(A(o.mediaItems),I(!1),re.clear())},wt=async x=>{if(Q(null),x.trim()===""){Q(e("Password cannot be empty"));return}const M=o==null?void 0:o.actualPassword;if(!M)if(o!=null&&o.hasPassword){Q(e("Unable to validate password. Please try again later."));return}else{j(!0),B(!1);return}if(x!==M){Q(e("Invalid password. Please try again."));return}const N=await oe();if(!N){B(!1),J(!0),K(!0);return}if(j(!0),B(!1),Q(null),!$)try{const D=JSON.parse(atob(N.split(".")[1]))["cognito:username"];E(D)}catch(z){console.error("Failed to decode token",z)}const q=localStorage.getItem(ae.PUBLIC_USERNAME);if(q!=null&&q.startsWith("Profile-")){console.log("Public username starts with 'Profile-', showing username prompt"),q&&d.setUsernameInput(""),d.setShowUsernamePrompt(!0);return}ye(e,c,o)},_e=x=>{p(x),localStorage.setItem("columns",x)},Ue=()=>{U.openFilePicker(c)},bt=async()=>{const x=await oe();if(!x){X(!0),K(!0);return}if(!$)try{const N=JSON.parse(atob(x.split(".")[1]))["cognito:username"];E(N)}catch(M){console.error("Failed to decode token",M)}Ue()},St=async()=>{K(!1);const x=await oe();if(x)try{const N=JSON.parse(atob(x.split(".")[1]))["cognito:username"];E(N),Z&&(j(!0),J(!1)),F&&(localStorage.setItem("selectPhotosButtonTimestamp",Date.now().toString()),X(!1));const q=localStorage.getItem(ae.PUBLIC_USERNAME);if(q!=null&&q.startsWith("Profile-")){console.log("Public username starts with 'Profile-', showing username prompt"),q&&d.setUsernameInput(""),d.setShowUsernamePrompt(!0);return}ye(e,c,o);return}catch(M){console.error("Failed to decode token",M)}},It=async x=>{if(!Array.from(x.target.files||[]).length)return;localStorage.removeItem("selectPhotosButtonTimestamp"),i(!1),await U.handleFileSelection(x,$)||K(!0)},Tt=async()=>{if(console.log("Starting album registration"),_==="CannotBeSaved"&&!v){he();return}const x=await oe();if(!x){console.log("User not logged in, showing OTP login"),K(!0);return}if(!$)try{const q=JSON.parse(atob(x.split(".")[1]))["cognito:username"];E(q)}catch(N){console.error("Failed to decode token",N)}const M=localStorage.getItem(ae.PUBLIC_USERNAME);if(M!=null&&M.startsWith("Profile-")){console.log("Public username starts with 'Profile-', showing username prompt"),M&&d.setUsernameInput(""),d.setShowUsernamePrompt(!0);return}ye(e,c,o)},Ct=async()=>{if((_==="NotVisible"||_==="CannotBeSaved")&&!v){he();return}dt(!me),re.clear()},vt=async()=>{Po(e,o,re)},Pt=async()=>{if(_==="CannotBeSaved"&&!v){he();return}if(!await oe()&&(c||_==="CannotBeSaved")){K(!0);return}o&&Wt(o,e,Me)},jt=()=>{se.setShowingCopyLinkAlert(!1),Ct()};n.useEffect(()=>{const x=localStorage.getItem("columns")||"1";p(x)},[]);const kt=()=>{console.log("getParametersFromUrl called"),console.log("window.location.pathname:",window.location.pathname);const x=window.location.pathname.split("/").filter(Boolean);return console.log("pathSegments:",x),x.length>0&&x[0]==="app"?(console.log("Traditional app path detected, returning null"),null):x.length===2?(console.log("Found parameters:",x[1]),x[1]):(console.log("No valid path format found, returning null"),null)};n.useEffect(()=>{(async()=>{console.log("initAlbum called");const M=kt();if(console.log("Extracted parameters:",M),!M){console.log("No parameters found, setting error"),u(e("Valid parameters not found in URL")),g(!1);return}let N,q=!1;if(console.log('Checking if parameters contain "id=":',M.includes("id=")),M.includes("id=")){console.log('Parameters contain "id=", extracting identifier');const D=M.indexOf("id=");if(D!==-1)N=M.substring(D+3),q=!0,console.log('Extracted identifier after "id=":',N),console.log("Will use fetchFolderUsingTargetItemIdentifier");else{console.log('Failed to find "id=" in parameters'),u(e("Invalid id parameter format")),g(!1);return}}else N=M,q=!1,console.log("Using entire parameters as identifier:",N),console.log("Will use fetchFolderUsingAlbumNanoId");if(N.includes("-")){const D=N.split("-"),ie=N;N=D[D.length-1],console.log('Identifier contained "-", stripped from:',ie,"to:",N)}else console.log('Identifier does not contain "-", keeping as is:',N);let z;if(q){console.log("Calling fetchFolderUsingTargetItemIdentifier with identifier:",N);let D=N;D.length===32?(D=_t(D),console.log(D)):console.error("Invalid UUID format: must be 32 characters after removing dashes"),z=await Co(D,b)}else console.log("Calling fetchFolderUsingAlbumNanoId with identifier:",N),z=await vo(N,b);console.log("API call result:",z?"Success":"Failed"),z?(console.log("Full album data received:",z),console.log("Media items count:",z.mediaItems?z.mediaItems.length:"No mediaItems property"),console.log("Password policy:",z.passwordPolicy),console.log("Folder position ID:",z.folderPositionId),h(z),z.passwordPolicy&&(L(z.passwordPolicy),console.log("Password policy set to:",z.passwordPolicy),z.passwordPolicy==="NoPassword"||z.folderPositionId?(j(!0),console.log("User automatically authorized")):console.log("User not automatically authorized, will need to enter password")),console.log("Album data set successfully")):(console.log("No data returned from API, setting error"),u(e("Album not found"))),g(!1),console.log("initAlbum completed")})()},[]),n.useEffect(()=>{(async()=>{const M=await oe();if(M)try{const q=JSON.parse(atob(M.split(".")[1]))["cognito:username"];E(q);const z=localStorage.getItem("selectPhotosButtonTimestamp");if(z){const D=parseInt(z,10),ge=(Date.now()-D)/(1e3*60);i(ge<10),ge>=10&&localStorage.removeItem("selectPhotosButtonTimestamp")}else i(!1)}catch(N){console.error("Failed to decode token",N)}})()},[]),n.useEffect(()=>{o!=null&&o.folderName?document.title=o.folderName:document.title=e("Photos")},[o,r]),n.useEffect(()=>{var x;console.log("AlbumMediaGrid props changed:",{isLoading:y,error:w,albumDataExists:!!o,mediaItemsCount:(x=o==null?void 0:o.mediaItems)==null?void 0:x.length,filteredMediaItemsCount:S==null?void 0:S.length,columns:f,shouldShowContent:ee,shouldShowWatermark:te,isMediaFiltered:k})},[y,w,o,S,f,ee,te,k]);const At=()=>o&&o.creatorId&&o.contacts[o.creatorId]?o.contacts[o.creatorId]:e("the album owner"),de=ue(r)==="rtl",Ce=o?{...o,mediaItems:S}:null;return t.jsxs(t.Fragment,{children:[t.jsx(go,{}),t.jsx(uo,{style:{padding:"12px 0"},children:t.jsxs(po,{style:{padding:"0 24px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[t.jsx(fo,{href:"https://6180.io",target:"_blank",rel:"noopener noreferrer","aria-label":e($?"Visit Home":"Visit 6180.io"),children:t.jsxs(ho,{$isRTL:de,children:[t.jsx(mo,{src:Qe("images/logo_no_background.png"),alt:e("6180 Logo")}),t.jsx("span",{style:{marginLeft:de?"0":"8px",marginRight:de?"8px":"0",fontSize:"20px",fontWeight:"700"},children:e($?"Home":"6180")})]})}),t.jsx("div",{style:{fontSize:"14px",fontStyle:"italic",color:"#666",textAlign:de?"left":"right",transition:"opacity 0.8s ease-in-out, transform 0.8s ease-in-out",opacity:T?1:0,transform:T?"translateY(0)":"translateY(-1px)",willChange:"opacity, transform"},children:e(C[G])})]})}),t.jsxs(xo,{$isRTL:de,style:{paddingTop:"88px"},children:[t.jsx(rs,{t:e,isSelectionMode:me,selectedItems:re,shareSelectPhotos:vt,cancelSelection:ft,selectAll:ht,unselectAll:mt,showingEnterPassword:Le,promptForPassword:he,passwordPolicy:_,isAuthorized:v,addPhotosToAlbum:bt,saveAlbumDirectly:Tt,handleDownloadPhotos:Pt,handleCopyLink:()=>se.setShowingCopyLinkAlert(!0),albumData:o}),t.jsxs(yo,{id:"media-container",style:{paddingTop:"12px",paddingBottom:"24px"},children:[t.jsx($o,{showSelectPhotosButton:V,albumData:o,openFilePicker:Ue,t:e}),rt&&t.jsx("div",{style:{width:"100%",marginBottom:"16px"},children:t.jsx(Ot,{progressTracker:it,isRTL:ue(r)==="rtl",style:{marginTop:"16px"},showSuccessMessage:!0,showErrorMessage:!0})}),t.jsx(Eo,{isSelectionMode:me,t:e}),t.jsx(ss,{albumData:o,t:e}),(o==null?void 0:o.mediaItems)&&o.mediaItems.length>0&&!Fe&&t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"16px"},children:[t.jsx(ke,{style:{margin:"0"},children:e("Columns:")}),t.jsxs(We,{value:f,onChange:x=>_e(x.target.value),children:[t.jsx("option",{value:"1",children:"1"}),t.jsx("option",{value:"2",children:"2"}),t.jsx("option",{value:"3",children:"3"}),t.jsx("option",{value:"4",children:"4"}),t.jsx("option",{value:"5",children:"5"})]})]}),(o==null?void 0:o.mediaItems)&&o.mediaItems.length>0&&Fe&&t.jsxs(wo,{style:{background:"rgba(248, 249, 250, 0.8)",border:"1px solid #e9ecef",borderRadius:"8px",padding:"16px",marginBottom:"16px",boxShadow:"0 1px 3px rgba(0, 0, 0, 0.1)"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"},children:[t.jsx(ke,{style:{margin:"0"},children:e("Columns:")}),t.jsxs(We,{value:f,onChange:x=>_e(x.target.value),children:[t.jsx("option",{value:"1",children:"1"}),t.jsx("option",{value:"2",children:"2"}),t.jsx("option",{value:"3",children:"3"}),t.jsx("option",{value:"4",children:"4"}),t.jsx("option",{value:"5",children:"5"})]})]}),t.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:"8px",flexWrap:"wrap"},children:[t.jsx(ke,{style:{margin:"0",paddingTop:"6px",flexShrink:0},children:e("Filter by:")}),t.jsx("div",{style:{flex:1,minWidth:0},children:t.jsx(Uo,{mediaItems:o.mediaItems,onFilterChange:xt,resetFilter:yt})})]})]}),t.jsx("div",{style:{marginTop:"16px"},children:t.jsx(os,{isLoading:y,error:w,albumData:Ce,columns:f,shouldShowContent:ee,shouldShowWatermark:te,isSelectionMode:me,selectedItems:re,toggleItemSelection:gt,openFullscreenView:Me,t:e})})]}),t.jsx(Do,{isOpen:R,onClose:()=>{B(!1),Q(null)},onSubmit:wt,error:Y,t:e}),t.jsx(Qo,{isOpen:O,onClose:()=>{K(!1)},onLoginSuccess:St,ownerName:At(),t:e}),t.jsx(st,{onFileSelection:It,ref:nt}),ne!==null&&Ce&&t.jsx(qo,{item:Ce.mediaItems[ne],index:ne,onClose:lt,onPrev:at,onNext:()=>ct(S.length),hasNext:ne<S.length-1,hasPrev:ne>0,showWatermark:te(),ownerName:(()=>{const x=S[ne].ownerContactId;if(!x)return"";if(o!=null&&o.contacts&&o.contacts[x])return o.contacts[x];const M=x.split("_____")[0]||"";return M===$?e("Me"):M})()}),t.jsx(Jt,{t:e,language:r,usernameManager:d,onSuccess:x=>{ye(e,c,o)}}),t.jsx(Bt,{isOpen:se.showingCopyLinkAlert,onClose:()=>se.setShowingCopyLinkAlert(!1),inviteLink:qe(c,o==null?void 0:o.albumNanoId,o!=null&&o.creatorId&&(o!=null&&o.contacts)&&(o!=null&&o.contacts[o==null?void 0:o.creatorId])?o==null?void 0:o.contacts[o==null?void 0:o.creatorId]:"album",o==null?void 0:o.folderName),onCopy:se.handleCopy,onCreateSubAlbum:jt,showCreateSubAlbum:!0,t:e,isRTL:ue(r)==="rtl"}),t.jsx(zt,{isOpen:se.showingCopiedLinkAlert,onClose:()=>se.setShowingCopiedLinkAlert(!1),t:e,isRTL:ue(r)==="rtl"})]})]})},ls=()=>t.jsx(Rt,{children:t.jsx(is,{})});Lt.createRoot(document.getElementById("root")).render(t.jsx(ls,{}));
