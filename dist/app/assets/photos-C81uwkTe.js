import{t as We,v as Ye,c as le,f as pe,S as Re,w as Ct,a as i,x as Ve,h as Je,y as ie,r as we,L as ae,j as t,d as Y,u as fe,g as ue,A as vt,b as Xe,C as Ce,o as Pt,R as jt,I as kt,z as At,p as $t,B as Et}from"./utils-CXMMENAx.js";import{u as Nt,U as Lt}from"./UploadProgress-qaN4Afg2.js";import{a as be}from"./types-Cxncrjqw.js";import{u as Rt,U as Ft}from"./UsernamePrompt-CeOz70ca.js";import{u as _t,v as Mt,N as Ut,B as Q,O as ce,W as Se,w as Ot,x as Bt,y as Ke,z as Ge,F as je,l as ke,T as qe,D as zt,I as Wt,E as Yt,J as Fe,K as Vt,Q as He,R as Jt,U as Xt,M as me,X as Kt,Y as Gt,Z as qt,C as Ht,_ as Dt,G as Qt,n as Zt,o as eo,$ as to,a0 as oo,a1 as so,q as no,a2 as ro,a3 as ve,a4 as _e,a5 as io}from"./styled-components-C-1szZci.js";import{C as lo,S as ao,I as co,R as go}from"./SignUpCommand-OZBAXGQi.js";import{C as uo,a as po}from"./ConfirmationModal-C728WNcx.js";import"./parseJsonBody-ComnscAu.js";const Ie=(e,r)=>{var T,$,F,w,X,q,K;console.log("🔄 processData called with raw JSON:",JSON.stringify(e,null,2));const l=(($=(T=e==null?void 0:e.data)==null?void 0:T.fetchRelations)==null?void 0:$.items)||[];console.log("📊 Items found:",l.length),console.log("📊 Items details:",JSON.stringify(l,null,2));const s=[],a={};let d="Photos",p,m,o="",h,y=!1,g=!1,S,c=!1;const u=new Set;if(l.length>0){const n=l[0];console.log("📁 Processing folder:",JSON.stringify(n,null,2)),r&&(n!=null&&n.id)&&(console.log("🆔 Setting folder ID:",n.id),r(n.id)),n!=null&&n.albumNanoId&&(p=n.albumNanoId,console.log("🏷️ Album nano ID found:",p)),n!=null&&n.folderName&&n.folderName.length>0&&(d=n.folderName,console.log("📝 Folder name found:",d)),n!=null&&n.creatorId&&n.creatorId.length>0&&(m=n.creatorId,console.log("👤 Creator ID found:",m)),n!=null&&n.folderDescription&&n.folderDescription.length>0&&(o=n.folderDescription,console.log("📄 Folder description found:",o)),n!=null&&n.folderPassword&&(console.log("🔐 Folder password object found:",JSON.stringify(n.folderPassword,null,2)),n.folderPassword.policy&&(h=n.folderPassword.policy,console.log("🔒 Password policy:",h),y=h!=="NoPassword",console.log("🔑 Password required:",y)),n.folderPassword.password&&h!=="NoPassword"&&(g=!0,S=n.folderPassword.password,console.log("🗝️ Actual password found (length):",S.length))),n!=null&&n.folderInviteParameters&&(console.log("📨 Folder invite parameters found:",JSON.stringify(n.folderInviteParameters,null,2)),c=!!n.folderInviteParameters.usingFolderInviteGrantsRightToAddItems,console.log("➕ Using folder invite grants right to add items:",c));const A=((w=(F=l[0])==null?void 0:F.contactsUsingInvite)==null?void 0:w.items)||[];console.log("👥 Processing contacts:",A.length),A.forEach((N,V)=>{var J;console.log(`👤 Contact ${V}:`,JSON.stringify(N,null,2)),N!=null&&N.id&&((J=N==null?void 0:N.item)!=null&&J.publicDisplayName)&&(a[N.id]=N.item.publicDisplayName,console.log(`✅ Added contact: ${N.id} -> ${N.item.publicDisplayName}`))});const E=((X=n==null?void 0:n.fileReferencesPage)==null?void 0:X.items)||[];console.log("📸 Processing file references:",E.length),E.forEach((N,V)=>{var U,z,Z,D;console.log(`📄 File reference ${V}:`,JSON.stringify(N,null,2));const J=N==null?void 0:N.file;if(!(J!=null&&J.dataKey)){console.log(`❌ Skipping file reference ${V} - no dataKey`);return}const{id:f,dataKey:I,thumbnailDataKey:C,durationInSeconds:b,ownerContactId:B}=J,M=N.fileDisplayName;if(console.log(`📂 Processing file: ID=${f}, dataKey=${I}, thumbnailDataKey=${C}, duration=${b}, owner=${B}, refFileDisplayName=${M}`),u.has(I)){console.log(`⚠️ Duplicate dataKey found, skipping: ${I}`);return}u.add(I),console.log(`🔍 Raw selectedTags for file ${f}:`,N.selectedTags);const k=((U=N.selectedTags)==null?void 0:U.map(O=>{var ee;return{TagType:O.TagType,tagTitle:O.tagTitle,subtags:((ee=O.subtags)==null?void 0:ee.map(te=>({TagType:te.TagType,tagTitle:te.tagTitle,subtagTitle:te.subtagTitle})))||[]}}))||[];console.log(`🏷️ Processed selectedTags for file ${f}:`,k),console.log("📊 Number of tags:",k.length);const v=M||((z=I.split("/").pop())==null?void 0:z.split(".")[0])||`file-${V}`;console.log(`📝 File display name: ${v}`);const P=`${Re}${I}`,L=C?`${Re}${C}`:void 0;if(I.startsWith("Input/Image/")){const O={type:"image",fileId:f,url:P,thumbnailUrl:L||P,ownerContactId:B,fileDisplayName:v,loaded:!1,selectedTags:k};console.log("🖼️ Complete image item with tags:",{fileId:O.fileId,type:O.type,fileDisplayName:O.fileDisplayName,tagCount:((Z=O.selectedTags)==null?void 0:Z.length)||0,tags:O.selectedTags}),s.push(O),console.log("✅ Successfully added image item to mediaItems array")}else if(I.startsWith("Input/Video/")){const O={type:"video",fileId:f,url:P,thumbnailUrl:L||P,duration:Ct(b),ownerContactId:B,fileDisplayName:v,loaded:!1,selectedTags:k};console.log("🎥 Complete video item with tags:",{fileId:O.fileId,type:O.type,fileDisplayName:O.fileDisplayName,tagCount:((D=O.selectedTags)==null?void 0:D.length)||0,tags:O.selectedTags}),s.push(O),console.log("✅ Successfully added video item to mediaItems array")}else console.log(`❓ Unknown file type for dataKey: ${I}`)})}else console.log("❌ No items found in API response");const j={mediaItems:s,folderName:d,albumNanoId:p,creatorId:m,folderDescription:o,contacts:a,passwordPolicy:h,passwordRequired:y,hasPassword:g,actualPassword:S,usingFolderInviteGrantsRightToAddItems:c};return console.log("✅ processData final result summary:",{mediaItemsCount:j.mediaItems.length,mediaItemsWithTags:j.mediaItems.filter(n=>n.selectedTags&&n.selectedTags.length>0).length,firstItemTags:((K=(q=j.mediaItems[0])==null?void 0:q.selectedTags)==null?void 0:K.length)||0,totalTagsAcrossAllItems:j.mediaItems.reduce((n,A)=>{var E;return n+(((E=A.selectedTags)==null?void 0:E.length)||0)},0)}),j.mediaItems.slice(0,3).forEach((n,A)=>{var E,N;console.log(`📋 Item ${A} details:`,{fileId:n.fileId,fileDisplayName:n.fileDisplayName,tagCount:((E=n.selectedTags)==null?void 0:E.length)||0,tags:((N=n.selectedTags)==null?void 0:N.map(V=>`${V.tagTitle}(${V.subtags.length})`))||[]})}),console.log("✅ processData final result:",JSON.stringify(j,null,2)),j},fo=async(e,r)=>{var l,s,a,d;console.log("🔍 fetchFolderUsingTargetItemIdentifier called with:",e);try{const m={fetchRelationsInput:{targetItemIdentifier____RelationType:`${e}____Folder`,index:"targetItemIdentifier____RelationType",limit:1,scanIndexForward:!1,nextToken:null}};console.log("📤 Query variables:",JSON.stringify(m,null,2)),console.log("🌐 Making public API call...");const o=fetch(We,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":Ye},body:JSON.stringify({query:be,variables:m})}).then(c=>c.json());console.log("🔒 Checking private API availability...");const h=(async()=>{const c=await le();return console.log("🎫 Token available:",!!c),c?(console.log("🌐 Making private API call..."),fetch(pe,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${c}`},body:JSON.stringify({query:be,variables:m})}).then(u=>u.json())):(console.log("❌ No token - skipping private API"),null)})();console.log("⏳ Waiting for public API response...");const y=await o;console.log("📥 Public API raw response:",JSON.stringify(y,null,2));let g=Ie(y,r);console.log("🔄 Processed public data:",JSON.stringify(g,null,2)),console.log("⏳ Waiting for private API response...");const S=await h;if(S){console.log("📥 Private API raw response:",JSON.stringify(S,null,2));const c=(d=(a=(s=(l=S==null?void 0:S.data)==null?void 0:l.fetchRelations)==null?void 0:s.items)==null?void 0:a[0])==null?void 0:d.folderPosition;if(console.log("📍 Folder position found:",!!c),console.log("📍 Folder position details:",JSON.stringify(c,null,2)),c){const u=Ie(S,r);console.log("🔄 Processed private data (before enhancement):",JSON.stringify(u,null,2)),u.folderPositionId=c==null?void 0:c.id,u.profileIds=c==null?void 0:c.profileIds,console.log("🔄 Enhanced private data:",JSON.stringify(u,null,2)),g=u}else console.log("❌ No folder position in private API response")}else console.log("❌ No private API response (user not logged in or API failed)");return console.log("✅ Final return data:",JSON.stringify(g,null,2)),g}catch(p){return console.error("💥 Error in fetchFolderUsingTargetItemIdentifier:",p),null}},ho=async(e,r)=>{var l,s,a,d;try{const m={fetchRelationsInput:{albumNanoId:e,index:"albumNanoId",limit:1,scanIndexForward:!1,nextToken:null}},o=fetch(We,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":Ye},body:JSON.stringify({query:be,variables:m})}).then(c=>c.json()),h=(async()=>{const c=await le();return c?fetch(pe,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${c}`},body:JSON.stringify({query:be,variables:m})}).then(u=>u.json()):null})(),y=await o;let g=Ie(y,r);const S=await h;if(S){const c=(d=(a=(s=(l=S==null?void 0:S.data)==null?void 0:l.fetchRelations)==null?void 0:s.items)==null?void 0:a[0])==null?void 0:d.folderPosition;if(c){const u=Ie(S,r);u.folderPositionId=c==null?void 0:c.id,u.profileIds=c==null?void 0:c.profileIds,g=u}}return g}catch(p){return console.error("Error fetching folder data:",p),null}},ye=async(e,r,l)=>{console.log("Starting album registration");const s=document.createElement("div");s.style.position="fixed",s.style.top="0",s.style.left="0",s.style.width="100%",s.style.height="100%",s.style.backgroundColor="rgba(0, 0, 0, 0.5)",s.style.display="flex",s.style.justifyContent="center",s.style.alignItems="center",s.style.zIndex="2000";const a=document.createElement("div");a.style.backgroundColor="white",a.style.padding="30px",a.style.borderRadius="8px",a.style.textAlign="center";const d=document.createElement("p");d.id="saveProgressText",d.textContent=e("Registering album...");const p=document.createElement("div");p.style.backgroundColor="#f0f0f0",p.style.borderRadius="4px",p.style.overflow="hidden",p.style.height="8px",p.style.marginTop="10px";const m=document.createElement("div");m.id="saveProgress",m.style.backgroundColor="#4caf50",m.style.height="100%",m.style.width="5%",m.style.transition="width 0.3s ease";const o=document.createElement("p");o.id="saveErrorText",o.style.color="#f44336",o.style.display="none",o.style.marginTop="10px",o.style.fontSize="14px",p.appendChild(m),a.appendChild(d),a.appendChild(p),a.appendChild(o),s.appendChild(a),document.body.appendChild(s);try{const h=await Je();if(!h){console.error("No token available for registering album"),document.body.removeChild(s);return}if(!JSON.parse(atob(h.split(".")[1]))["cognito:username"]){console.error("Missing username in token"),ie(o,"Could not retrieve username from token",d,m);return}if(!r){console.error("No folder ID available"),ie(o,"Folder ID is missing",d,m);return}if(!l||!l.mediaItems){console.error("No album data available"),ie(o,"Album data is missing or incomplete",d,m);return}if(l.mediaItems.length===0){console.error("No media items to save"),ie(o,"No media items in album to save",d,m);return}const S=Math.floor(Date.now()/1e3);xe(30,d,m,e("Preparing album data..."));const c={currentTime:S,folderId:r,profileIds:["Only Me_____Only Me____Profile"],folderPositionSelectedTagInputs:[],folderPositionPoints:1};console.log("Folder position input:",c),xe(50,d,m,e("Saving album..."));const u=`
      mutation SaveAlbum(
        $folderPositionInputs: [FolderPositionInput!]
      ) {
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items { id }
        }
      }
    `,j={folderPositionInputs:[c]};console.log("GraphQL mutation variables:",JSON.stringify(j));try{const T=await fetch(pe,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${h}`},body:JSON.stringify({query:u,variables:j})});if(xe(80,d,m,e("Almost there...")),!T.ok)throw new Error(`HTTP error: ${T.status} ${T.statusText}`);const $=await T.text();let F;try{F=JSON.parse($),console.log("API response:",F)}catch(w){const X=w instanceof Error?w.message:"Unknown JSON parse error";throw new Error(`Invalid JSON response: ${X}`)}if(F.errors&&F.errors.length>0){const w=F.errors.map(X=>(console.error("GraphQL error:",X),X.message||"Unknown GraphQL error")).join("; ");throw new Error(`GraphQL errors: ${w}`)}console.log("Album registered successfully"),xe(100,d,m,e("Album registered successfully!")),sessionStorage.setItem("album_just_saved","true"),setTimeout(()=>{document.body.removeChild(s),we("my-albums.html")},2e3)}catch(T){const $=T instanceof Error?T.message:"Unknown API error";console.error("Error in API request:",T),ie(o,$,d,m)}}catch(h){const y=h instanceof Error?h.message:"Unknown error";console.error("Error registering album:",h),ie(o,y,d,m)}},mo=async(e,r,l)=>{if(l.size===0){console.log("[SubAlbum] Error: No items selected"),alert(e("Please select at least one item to share."));return}if(r)try{console.log("[SubAlbum] Creating loading modal");const s=document.createElement("div");s.style.position="fixed",s.style.top="0",s.style.left="0",s.style.width="100%",s.style.height="100%",s.style.backgroundColor="rgba(0, 0, 0, 0.5)",s.style.display="flex",s.style.justifyContent="center",s.style.alignItems="center",s.style.zIndex="2000";const a=document.createElement("div");a.style.backgroundColor="white",a.style.padding="30px",a.style.borderRadius="8px",a.style.textAlign="center";const d=document.createElement("p");d.textContent=e("Selecting files..."),a.appendChild(d),s.appendChild(a),document.body.appendChild(s),console.log("[SubAlbum] Loading modal added to DOM");const p=[],m=[];console.log("[SubAlbum] Starting to process selected items"),Array.from(l).forEach((h,y)=>{var S;console.log(`[SubAlbum] Processing item ${y+1}/${l.size}, index: ${h}`);const g=r.mediaItems[h];if(console.log("[SubAlbum] Media item found:",{hasMediaItem:!!g,fileId:g==null?void 0:g.fileId,type:g==null?void 0:g.type,hasUrl:!!(g!=null&&g.url),fileDisplayName:g==null?void 0:g.fileDisplayName}),g&&g.fileId){p.push(g.fileId);let c;if(g.fileDisplayName)c=g.fileDisplayName,console.log(`[SubAlbum] Using fileDisplayName: ${c}`);else{const j=g.fileId.split("_____");c=((S=j[1])==null?void 0:S.split("____")[0])||`file-${h}`,console.log("[SubAlbum] Extracted fileName from fileId:",{fileIdParts:j,fileName:c})}const u={fileName:c,s3PreviewUrl:g.type==="video"&&g.thumbnailUrl||g.url,type:g.type==="video"?"video":"image",size:0,status:"complete",progress:100,fileId:g.fileId,duration:g.type==="video"&&g.duration?parseFloat(g.duration.split(":").reduce((j,T)=>60*j+parseFloat(T),0).toString()):null};console.log("[SubAlbum] Created SelectedPhoto object:",u),m.push(u)}else console.warn(`[SubAlbum] Skipping invalid media item at index ${h}`)}),console.log("[SubAlbum] Processing complete. Summary:",{selectedFileIdsCount:p.length,selectedPhotosCount:m.length,fileIdsSample:p.slice(0,2)});const o={isSubAlbum:!0,selectedFileIds:p,selectedPhotos:m};console.log("[SubAlbum] Created subAlbumData:",{isSubAlbum:o.isSubAlbum,selectedFileIdsCount:o.selectedFileIds.length,selectedPhotosCount:o.selectedPhotos.length});try{console.log(`[SubAlbum] Saving to localStorage with key: ${ae.SUB_ALBUM_DATA}`);const h=JSON.stringify(o);console.log(`[SubAlbum] Serialized data length: ${h.length} characters`),localStorage.setItem(ae.SUB_ALBUM_DATA,h),console.log("[SubAlbum] Successfully saved to localStorage")}catch(h){if(console.error("[SubAlbum] Error saving to localStorage:",h),h instanceof DOMException&&(h.name==="QuotaExceededError"||h.name==="NS_ERROR_DOM_QUOTA_REACHED")){console.error("[SubAlbum] localStorage quota exceeded"),alert(e("Storage limit exceeded. The album may be too large to share this way.")),document.body.removeChild(s);return}throw h}console.log("[SubAlbum] Removing loading modal"),document.body.removeChild(s),console.log("[SubAlbum] Redirecting to save-album.html"),we("save-album.html")}catch(s){console.error("[SubAlbum] Error creating selection:",s),alert(e("There was an error creating the selection. Please try again."));try{const a=document.querySelector('div[style*="position: fixed"][style*="backgroundColor: rgba(0, 0, 0, 0.5)"]');a&&a.parentNode&&(console.log("[SubAlbum] Cleaning up loading modal after error"),a.parentNode.removeChild(a))}catch(a){console.error("[SubAlbum] Error cleaning up after main error:",a)}}else console.error("[SubAlbum] Error: Album data is null"),alert(e("Cannot create selection: Album data is missing."))},xe=(e,r,l,s)=>{l.style.width=`${e}%`,s&&(r.textContent=s)},yo=()=>{const[e,r]=i.useState(void 0),[l,s]=i.useState(!1),[a,d]=i.useState(!1),[p,m]=i.useState(null),[o,h]=i.useState(!1),y=i.useCallback(()=>!e||l||e==="NoPassword"?!0:e==="NotVisible"?(p&&console.error("Password error:",p),!1):!0,[e,l,p]),g=i.useCallback(()=>{const u=(p==null?void 0:p.toLowerCase().includes("watermark"))??!1;return!l&&e==="Watermark"||u},[l,e,p]),S=i.useCallback(()=>!l&&e!==void 0&&e!=="NoPassword",[l,e]),c=i.useCallback(()=>{m(null),d(!0)},[]);return{passwordPolicy:e,setPasswordPolicy:r,isAuthorized:l,setIsAuthorized:s,showPasswordModal:a,setShowPasswordModal:d,passwordError:p,setPasswordError:m,passwordVerified:o,setPasswordVerified:h,shouldShowContent:y,shouldShowWatermark:g,showingEnterPassword:S,promptForPassword:c}},xo=()=>{const[e,r]=i.useState(!1),[l,s]=i.useState(new Set),a=i.useCallback((o,h)=>{h.stopPropagation(),s(y=>{const g=new Set(y);return g.has(o)?g.delete(o):g.add(o),g})},[]),d=i.useCallback(o=>{if(o<=0)return;const h=new Set(Array.from({length:o},(y,g)=>g));s(h)},[]),p=i.useCallback(()=>{s(new Set)},[]),m=i.useCallback(()=>{r(!1),s(new Set)},[]);return{isSelectionMode:e,setIsSelectionMode:r,selectedItems:l,setSelectedItems:s,toggleItemSelection:a,selectAll:d,unselectAll:p,cancelSelection:m}},wo=(e,r,l,s)=>{const[a,d]=i.useState(!1),[p,m]=i.useState(!1),[o,h]=i.useState(!1),[y,g]=i.useState([]);i.useEffect(()=>{if(e&&e.profileIds&&l){const u=`${l}_____Public____Profile`;g(e.profileIds),h(e.profileIds.includes(u))}},[e,l]);const S=i.useCallback(()=>{const u=Ve(r,e==null?void 0:e.albumNanoId,(e==null?void 0:e.creatorId)&&(e==null?void 0:e.contacts)&&(e==null?void 0:e.contacts[e==null?void 0:e.creatorId]),e==null?void 0:e.folderName);navigator.clipboard.writeText(u).then(()=>{d(!1),m(!0)}).catch(j=>{console.error("Failed to copy link:",j),alert(s("Failed to copy link"))})},[r,s]),c=i.useCallback(async()=>{var u,j,T;if(!l||!r){alert(s("You must be logged in to perform this action"));return}try{const $=await Je();if(!$){console.error("Authentication failed");return}const F=`${l}_____Public____Profile`,w=[...y];if(o){const E=w.indexOf(F);E>-1&&w.splice(E,1)}else w.push(F);const K=await(await fetch(pe,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${$}`},body:JSON.stringify({query:`
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
      `,variables:{folderPositionChangeProfileIdsInput:{folderId:r,profileIds:w}}})})).json();if(K.errors)throw new Error(((u=K.errors[0])==null?void 0:u.message)||"Unknown error");const A=(((T=(j=K==null?void 0:K.data)==null?void 0:j.changeFiles)==null?void 0:T.items)||[]).find(E=>E.folderPositionId===(e==null?void 0:e.folderPositionId));A&&A.profileIds&&(g(A.profileIds),h(A.profileIds.includes(F)),console.log("Album visibility updated successfully"))}catch($){console.error("Failed to toggle album visibility:",$),alert(s("Failed to update album visibility. Please try again."))}},[l,r,y,o,e,s]);return{showingCopyLinkAlert:a,setShowingCopyLinkAlert:d,showingCopiedLinkAlert:p,setShowingCopiedLinkAlert:m,isOnPublicProfile:o,handleCopy:S,handlePublicProfileToggle:c}},bo=({showSelectPhotosButton:e,albumData:r,openFilePicker:l,t:s})=>!e||!(r!=null&&r.usingFolderInviteGrantsRightToAddItems)?null:t.jsx("div",{style:{width:"100%",display:"flex",justifyContent:"center",marginBottom:"20px",marginTop:"10px"},children:t.jsx("button",{onClick:l,style:{backgroundColor:"#007bff",color:"white",border:"none",borderRadius:"6px",padding:"12px 20px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"8px",fontSize:"16px",boxShadow:"0 2px 4px rgba(0,0,0,0.1)"},children:t.jsx("span",{children:s("Select Photos To Add To Album")})})}),So=({isSelectionMode:e,t:r})=>e?t.jsx(_t,{children:t.jsx("p",{children:r("Select photos and videos to share")})}):null,Io=Y.div`
  width: 100%;
  /* Remove gray background, padding, border, and border-radius */
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  direction: ${e=>e.$isRTL?"rtl":"ltr"};
`,Me=Y.div`
  margin-bottom: 8px; /* Reduced from 12px to 8px for tighter spacing */

  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 6px; /* Tighter mobile spacing */
  }
`,Ue=Y.div`
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
`,To=Y.button`
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
`,Co=Y.button`
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
`,vo=Y.div`
  margin-top: 6px; /* Reduced from 8px to 6px */
  font-size: 13px;
  color: #555;
  font-style: italic;
  text-align: ${e=>e.$isRTL?"right":"left"};
`,Po=Y.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 6px 0; /* Reduced from 8px to 6px */
`,jo=Y.button`
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
`,ko=({mediaItems:e,onFilterChange:r,resetFilter:l})=>{var A,E,N,V,J;const{t:s,language:a}=fe(),d=ue(a)==="rtl";console.log("🎯 MediaTagsFilter received props:",{mediaItemsCount:e.length,mediaItemsWithTags:e.filter(f=>f.selectedTags&&f.selectedTags.length>0).length,firstItemHasTags:!!((A=e[0])!=null&&A.selectedTags),firstItemTagCount:((N=(E=e[0])==null?void 0:E.selectedTags)==null?void 0:N.length)||0,sampleTags:((J=(V=e[0])==null?void 0:V.selectedTags)==null?void 0:J.slice(0,2))||[]}),e.slice(0,3).forEach((f,I)=>{var C,b;console.log(`🎯 Filter received item ${I}:`,{fileId:f.fileId,hasSelectedTags:!!f.selectedTags,tagCount:((C=f.selectedTags)==null?void 0:C.length)||0,tags:((b=f.selectedTags)==null?void 0:b.map(B=>{var M;return`${B.tagTitle}(${((M=B.subtags)==null?void 0:M.length)||0})`}))||[]})});const[p,m]=i.useState([]),[o,h]=i.useState([]),[y,g]=i.useState(null),[S,c]=i.useState([]),u=f=>f.subtags.filter(I=>o.includes(I.key)),j=f=>{const I=u(f);if(I.length===0)return`${f.tagTitle} (${f.count})`;const C=I.map(b=>`${b.subtagTitle} (${b.count})`).join(", ");return`${f.tagTitle} (${C})`};i.useEffect(()=>{console.log("🏷️ MediaTagsFilter: Starting tag extraction from mediaItems:",e.length);const f=new Map;e.forEach((C,b)=>{var B,M;console.log(`🏷️ Processing mediaItem ${b}:`,{fileId:C.fileId,hasSelectedTags:!!C.selectedTags,selectedTagsLength:((B=C.selectedTags)==null?void 0:B.length)||0}),(M=C.selectedTags)==null||M.forEach((k,v)=>{var U;console.log(`  🏷️ Processing tag ${v}:`,k);const P=`${k.TagType}-${k.tagTitle}`;f.has(P)||(f.set(P,{tag:{key:P,TagType:k.TagType,tagTitle:k.tagTitle,count:0,subtags:[]},count:0}),console.log(`    ✅ Created new tag: ${P}`));const L=f.get(P);L.count++,L.tag.count=L.count,console.log(`    📊 Updated tag count: ${P} = ${L.count}`),(U=k.subtags)==null||U.forEach((z,Z)=>{console.log(`    🏷️ Processing subtag ${Z}:`,z);const D=`${z.TagType}-${z.tagTitle}-${z.subtagTitle}`,O=L.tag,ee=O.subtags.find(te=>te.key===D);ee?(ee.count++,console.log(`      📊 Updated subtag count: ${D} = ${ee.count}`)):(O.subtags.push({key:D,TagType:z.TagType,tagTitle:z.tagTitle,subtagTitle:z.subtagTitle,count:1}),console.log(`      ✅ Created new subtag: ${D}`))})})});const I=Array.from(f.values()).sort((C,b)=>b.count-C.count).map(C=>(C.tag.subtags.sort((b,B)=>B.count-b.count),C.tag));console.log("🏷️ Final tags array:",{totalTags:I.length,tags:I.map(C=>({key:C.key,title:C.tagTitle,count:C.count,subtagsCount:C.subtags.length}))}),m(I),c(I)},[e]);const T=f=>{if(f.length===0){l(),c(p);return}const I=e.filter(C=>{var B;const b=new Set;return(B=C.selectedTags)==null||B.forEach(M=>{var k;b.add(`${M.TagType}-${M.tagTitle}`),(k=M.subtags)==null||k.forEach(v=>{b.add(`${v.TagType}-${v.tagTitle}-${v.subtagTitle}`)})}),f.every(M=>b.has(M))});X(I),r(I)},$=f=>{const I=o.includes(f.key),C=y===f.key;if(I){if(I&&!C)g(f.key);else if(I&&C){const b=o.filter(B=>B!==f.key&&!f.subtags.some(M=>M.key===B));h(b),g(null),T(b)}}else{const b=[...o,f.key];h(b),g(f.key),T(b)}},F=f=>{const I=o.includes(f.key);let C;I?C=o.filter(b=>b!==f.key):C=[...o,f.key],h(C),T(C)},w=()=>{h([]),g(null),l(),c(p)},X=f=>{const I=new Set;f.forEach(b=>{var B;(B=b.selectedTags)==null||B.forEach(M=>{I.add(`${M.TagType}-${M.tagTitle}`)})}),o.forEach(b=>{b.includes("-",b.indexOf("-")+1)||I.add(b)});const C=p.filter(b=>I.has(b.key));c(C)},q=y?p.find(f=>f.key===y):null,K=o.length,n=p.length>0;return console.log("🎯 MediaTagsFilter render decision:",{allTagsLength:p.length,hasTags:n,willRender:n}),n?(console.log("✅ MediaTagsFilter: Rendering with tags"),t.jsxs(Io,{$isRTL:d,children:[t.jsx(Me,{children:t.jsxs(Ue,{$isRTL:d,children:[K>0&&t.jsx(jo,{onClick:w,children:s("Clear All")}),S.length>0?S.map(f=>{const I=u(f),C=I.length>0?s("{{tagType}}: {{tagTitle}} ({{subtags}})",{tagType:f.TagType,tagTitle:f.tagTitle,subtags:I.map(b=>b.subtagTitle).join(", ")}):s("Click to add/remove: {{tagType}}: {{tagTitle}}",{tagType:f.TagType,tagTitle:f.tagTitle});return t.jsx(To,{$isSelected:o.includes(f.key),$isDisplayed:y===f.key,onClick:()=>$(f),title:C,children:j(f)},f.key)}):t.jsx(Po,{children:s("No tags available")})]})}),q&&q.subtags.length>0&&t.jsx(Me,{children:t.jsx(Ue,{$isRTL:d,children:q.subtags.map(f=>t.jsxs(Co,{$isSelected:o.includes(f.key),onClick:()=>F(f),title:s("Click to add/remove: {{tagType}}: {{tagTitle}} → {{subtagTitle}}",{tagType:f.TagType,tagTitle:f.tagTitle,subtagTitle:f.subtagTitle}),children:[f.subtagTitle," (",f.count,")"]},f.key))})}),K>0&&t.jsx(vo,{$isRTL:d,children:s("Showing photos with all selected tags")})]})):(console.log("❌ MediaTagsFilter: No tags found, returning null"),null)},Ao=Y.div`
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
  position: relative;
`,$o=Y.div`
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
`,Eo=Y.div`
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
`,No=Y.button`
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
`,Lo=Y.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 10px;
  position: relative;
  touch-action: none; /* Prevent default touch behaviors */
`,Ro=Y.div`
  transform: scale(${e=>e.$scale}) translate(${e=>e.$translateX}px, ${e=>e.$translateY}px);
  transition: transform 0.1s ease-out;
  transform-origin: center center;
  will-change: transform;
`,Oe=Y.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  max-height: 100%;
`,Fo=Y.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  opacity: ${e=>e.$isLoaded?1:0};
  transition: opacity 0.3s ease;
  user-select: none;
  pointer-events: none;
`,_o=Y.img`
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
`,Mo=Y.video`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  user-select: none;
`,Uo=Y.div`
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
`,Oo=({src:e,onLoadedData:r,t:l})=>t.jsxs(Mo,{controls:!0,autoPlay:!0,playsInline:!0,onLoadedData:r,children:[t.jsx("source",{src:e,type:"video/mp4"}),l("Your browser does not support the video tag.")]}),Bo=({item:e,index:r,onClose:l,onPrev:s,onNext:a,hasNext:d,hasPrev:p,ownerName:m,showWatermark:o=!1})=>{const[h,y]=i.useState(!1),[g,S]=i.useState(!0),{t:c}=fe(),[u,j]=i.useState(1),[T,$]=i.useState(0),[F,w]=i.useState(0),[X,q]=i.useState(!1),K=i.useRef(null),n=i.useRef(null),A=i.useRef(0),E=i.useRef(!1),N=.5,V=4,J=300;i.useEffect(()=>{j(1),$(0),w(0),y(!1),S(!0)},[e.url]);const f=i.useCallback(()=>{q(!0),setTimeout(()=>q(!1),1500)},[]),I=i.useCallback((k,v,P)=>{if(!K.current)return{x:k,y:v};const L=K.current.getBoundingClientRect(),U=Math.max(0,L.width*(P-1)/2),z=Math.max(0,L.height*(P-1)/2);return{x:Math.max(-U,Math.min(U,k)),y:Math.max(-z,Math.min(z,v))}},[]);i.useEffect(()=>{const k=v=>{v.key==="Escape"?l():v.key==="ArrowLeft"&&p&&u<=1?s():v.key==="ArrowRight"&&d&&u<=1&&a()};return window.addEventListener("keydown",k),()=>window.removeEventListener("keydown",k)},[l,a,s,d,p,u]);const C=(k,v)=>{const P=k.clientX-v.clientX,L=k.clientY-v.clientY;return Math.sqrt(P*P+L*L)},b=k=>{k.preventDefault();const v=k.touches,P=Date.now();if(v.length===1){const L=v[0];if(P-A.current<J){u>1?(j(1),$(0),w(0)):(j(2),$(0),w(0),f()),A.current=0;return}A.current=P,n.current={startX:L.clientX,startY:L.clientY,lastX:L.clientX,lastY:L.clientY,startDistance:0,startScale:u,startTranslateX:T,startTranslateY:F}}else if(v.length===2){const L=C(v[0],v[1]),U=(v[0].clientX+v[1].clientX)/2,z=(v[0].clientY+v[1].clientY)/2;n.current={startX:U,startY:z,lastX:U,lastY:z,startDistance:L,startScale:u,startTranslateX:T,startTranslateY:F},E.current=!0}},B=k=>{if(k.preventDefault(),!n.current)return;const v=k.touches;if(v.length===1&&u>1){const P=v[0],L=P.clientX-n.current.lastX,U=P.clientY-n.current.lastY,z=T+L/u,Z=F+U/u,D=I(z,Z,u);$(D.x),w(D.y),n.current.lastX=P.clientX,n.current.lastY=P.clientY,E.current=!0}else if(v.length===2){const L=C(v[0],v[1])/n.current.startDistance,U=Math.max(N,Math.min(V,n.current.startScale*L));if(j(U),U<=1)$(0),w(0);else{const z=I(n.current.startTranslateX,n.current.startTranslateY,U);$(z.x),w(z.y)}U>1.1&&f(),E.current=!0}},M=k=>{if(!n.current)return;const v=k.touches;if(v.length===0&&!E.current&&u<=1){const P=n.current.lastX-n.current.startX,L=n.current.lastY-n.current.startY;Math.sqrt(P*P+L*L)>50&&Math.abs(P)>Math.abs(L)*2&&(P>0&&p?s():P<0&&d&&a())}if(v.length===0)n.current=null,E.current=!1;else if(v.length===1&&n.current){const P=v[0];n.current.lastX=P.clientX,n.current.lastY=P.clientY,E.current=!1}};return t.jsxs(Mt,{children:[t.jsxs(Ao,{children:[t.jsx(No,{onClick:l,children:"✕"}),t.jsxs(Ut,{children:[t.jsx(Q,{onClick:p?s:void 0,disabled:!p||u>1,$isDisabled:!p||u>1,children:"←"}),t.jsx(Q,{onClick:d?a:void 0,disabled:!d||u>1,$isDisabled:!d||u>1,children:"→"})]})]}),t.jsxs(Uo,{$visible:X,children:[Math.round(u*100),"%"]}),t.jsxs(Lo,{ref:K,onTouchStart:b,onTouchMove:B,onTouchEnd:M,children:[t.jsx(Ro,{$scale:u,$translateX:T,$translateY:F,children:e.type==="image"?t.jsxs(Oe,{children:[t.jsx(Fo,{src:e.url,alt:c("Image {{index}}",{index:r+1}),$isLoaded:h,onLoad:()=>{y(!0),S(!1)},draggable:!1}),o&&t.jsx(ce,{$type:"watermark",children:t.jsx(Se,{children:"6180 Watermarked"})}),!h&&e.thumbnailUrl&&t.jsx(_o,{src:e.thumbnailUrl,alt:c("Thumbnail {{index}}",{index:r+1}),draggable:!1})]}):t.jsxs(Oe,{children:[t.jsx(Oo,{src:e.url,onLoadedData:()=>S(!1),t:c}),o&&t.jsx(ce,{$type:"watermark",children:t.jsx(Se,{children:"6180 Watermarked"})})]})}),g&&t.jsx(Ot,{children:e.type==="image"?c("Loading full resolution..."):c("Loading video...")})]}),t.jsxs($o,{children:[e.fileDisplayName&&t.jsx(Eo,{title:e.fileDisplayName,children:e.fileDisplayName}),e.ownerContactId&&m&&t.jsxs(Bt,{href:`https://6180.io/${m}`,children:[t.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[t.jsx("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),t.jsx("circle",{cx:"12",cy:"7",r:"4"})]}),m]})]})]})},zo=({isOpen:e,onClose:r,onSubmit:l,error:s,t:a})=>{const[d,p]=i.useState(""),[m,o]=i.useState(!1);if(!e)return null;const h=y=>{y.preventDefault(),o(!0),l(d),o(!1)};return t.jsx(Ke,{children:t.jsxs(Ge,{style:{maxWidth:"400px",textAlign:"center",padding:"32px"},children:[t.jsx("h3",{style:{margin:"0 0 24px 0"},children:a("Enter Password")}),t.jsxs("form",{onSubmit:h,style:{width:"100%"},children:[t.jsxs(je,{children:[t.jsx(ke,{type:"password",value:d,onChange:y=>p(y.target.value),placeholder:a("Password"),style:{border:s?"1px solid #d32f2f":void 0,padding:"12px",width:"100%",boxSizing:"border-box"},required:!0}),s&&t.jsx("div",{style:{color:"#d32f2f",fontSize:"14px",marginTop:"8px",textAlign:"left"},children:s})]}),t.jsxs("div",{style:{display:"flex",gap:"12px",width:"100%"},children:[t.jsx(Q,{type:"button",onClick:r,style:{backgroundColor:"#f3f4f6",color:"#333",flex:1},children:a("Cancel")}),t.jsx(Q,{type:"submit",$primary:!0,disabled:m||!d,style:{flex:1},children:a(m?"Submitting...":"Submit")})]})]}),t.jsx(qe,{children:a("Two-Factor Authentication")})]})})},Pe=new lo({region:vt});function Be(e){const r=e.trim().toLowerCase(),l="@gmail.com";return r.endsWith(l)?`${r.slice(0,-l.length).replace(/\./g,"")}${l}`:r}const Wo=({isOpen:e,onClose:r,onLoginSuccess:l,ownerName:s="the album owner",t:a})=>{const[d,p]=i.useState(""),[m,o]=i.useState(!1),[h,y]=i.useState(""),[g,S]=i.useState(""),[c,u]=i.useState("idle"),[j,T]=i.useState(""),$=i.useRef(null),F=i.useRef(null);i.useEffect(()=>{m&&F.current&&F.current.focus()},[m]),i.useEffect(()=>{e&&$.current&&!m&&$.current.focus()},[e,m]);function w(n){const A=n.target.value;/^\d*$/.test(A)&&A.length<=6&&y(A)}async function X(){var A;u("sending"),T("");const n=Be(d);if(!n||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n)){u("error"),T(a("Please enter a valid email address"));return}try{const E=new ao({ClientId:Ce,Username:n,Password:crypto.randomUUID(),UserAttributes:[{Name:"email",Value:n}]});try{await Pe.send(E)}catch(J){if(!((A=J.name)!=null&&A.includes("UsernameExistsException")))throw J}const N=new co({ClientId:Ce,AuthFlow:"CUSTOM_AUTH",AuthParameters:{USERNAME:n}}),V=await Pe.send(N);if(V.Session)S(V.Session),o(!0),u("idle");else throw new Error("No session returned from InitiateAuth")}catch(E){console.error(E),u("error"),T(a("Unable to send verification code. Please try again later."))}}async function q(){var A,E,N,V,J,f;u("verifying"),T("");const n=Be(d);try{const I=new go({ClientId:Ce,ChallengeName:"CUSTOM_CHALLENGE",ChallengeResponses:{USERNAME:n,ANSWER:h},Session:g}),b=(A=(await Pe.send(I)).AuthenticationResult)==null?void 0:A.IdToken;if(!b)throw new Error("No token received");localStorage.setItem("idToken",b);const k=`${JSON.parse(atob(b.split(".")[1]))["cognito:username"]}_____Public____Profile`,P=await(await fetch(pe,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${b}`},body:JSON.stringify({query:`
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
          `,variables:{relationIds:[k]}})})).json(),L=(f=(J=(V=(N=(E=P==null?void 0:P.data)==null?void 0:E.batchGetItems)==null?void 0:N.items)==null?void 0:V[0])==null?void 0:J.item)==null?void 0:f.anyDisplayName;L&&localStorage.setItem(ae.PUBLIC_USERNAME,L),u("idle"),l(),r()}catch(I){console.error(I),u("error"),T(a("Invalid or expired verification code. Please try again or request a new code."))}}function K(){o(!1),y(""),u("idle")}return e?t.jsx(Ke,{children:t.jsxs(Ge,{style:{maxWidth:"400px",textAlign:"center",padding:"32px"},children:[t.jsx("img",{src:Xe("images/logo_no_background.png"),alt:"6180 Logo",style:{height:"60px",marginBottom:"24px"}}),t.jsx("h3",{style:{margin:"0 0 24px 0",lineHeight:"1.6"},children:a("{ownerName} only shared this album with friends and family").replace("{ownerName}",s)}),j&&t.jsx("div",{style:{backgroundColor:"#f8d7da",color:"#721c24",padding:"12px",borderRadius:"8px",marginBottom:"16px",fontSize:"14px",textAlign:"left"},children:j}),m?t.jsxs("form",{style:{width:"100%"},children:[t.jsxs("p",{style:{marginBottom:"16px",color:"#555",textAlign:"left"},children:[a("Check your email for a 6-digit verification code sent to")," ",t.jsx("strong",{children:d})]}),t.jsx(je,{children:t.jsx(ke,{ref:F,type:"tel",inputMode:"numeric",pattern:"[0-9]*",maxLength:6,value:h,onChange:w,placeholder:a("Enter 6-digit code"),style:{letterSpacing:"2px",textAlign:"center",padding:"12px",width:"100%",boxSizing:"border-box"}})}),t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px",width:"100%"},children:[t.jsx(Q,{onClick:q,disabled:c==="verifying"||h.length!==6,$primary:!0,style:{width:"100%",backgroundColor:"#28a745"},children:a(c==="verifying"?"Verifying...":"Verify Code")}),t.jsxs("div",{style:{fontSize:"14px",color:"#666",display:"flex",justifyContent:"center",gap:"8px"},children:[t.jsx("span",{children:a("Didn't receive a code?")}),t.jsx("button",{onClick:K,style:{background:"none",border:"none",color:"#007bff",padding:0,cursor:"pointer",fontSize:"14px",textDecoration:"underline"},children:a("Send new code")})]}),t.jsx(Q,{onClick:r,style:{width:"100%",backgroundColor:"#f8f9fa",color:"#555",border:"1px solid #ccc"},children:a("Cancel")})]})]}):t.jsxs("form",{style:{width:"100%"},children:[t.jsx(je,{children:t.jsx(ke,{ref:$,type:"email",value:d,onChange:n=>p(n.target.value),placeholder:a("Email address..."),style:{padding:"12px",width:"100%",boxSizing:"border-box"}})}),t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px",width:"100%"},children:[t.jsx(Q,{onClick:X,disabled:c==="sending"||!d.trim(),$primary:!0,style:{width:"100%"},children:a(c==="sending"?"Sending...":"Send Verification Code")}),t.jsx(Q,{onClick:r,style:{width:"100%",backgroundColor:"#f8f9fa",color:"#555",border:"1px solid #ccc"},children:a("Cancel")})]})]}),t.jsx(qe,{children:a("Two-Factor Authentication")})]})}):null},Yo=Y.div`
  display: none; /* Hidden by default, controlled by refs */
`,ze=Y.input`
  display: none;
`,De=i.forwardRef(({onFileSelection:e,accept:r="image/*,video/*",multiple:l=!0},s)=>t.jsxs(Yo,{children:[t.jsx(ze,{ref:s,id:"file-input",type:"file",accept:r,multiple:l,onChange:e}),t.jsx(ze,{id:"folder-input",type:"file",accept:r,multiple:l,webkitdirectory:"",directory:"",onChange:e})]}));De.displayName="FileInput";Y.div`
  display: flex;
  gap: 8px;
  align-items: center;
  direction: ${e=>e.$isRTL?"rtl":"ltr"};
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }
`;Y.button`
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
`;Y.span`
  font-size: 16px;
`;const Ae=({src:e,thumbnailSrc:r,alt:l,className:s="",loadFullResolution:a=!1,onFullResolutionLoaded:d,onClick:p,showWatermark:m=!1})=>{const[o,h]=i.useState(!1),[y,g]=i.useState(!1),[S,c]=i.useState(!1),[u,j]=i.useState("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E"),{t:T}=fe();i.useEffect(()=>{if(r){const w=new globalThis.Image;w.src=r,w.onload=()=>{j(r),h(!0)}}},[r]),i.useEffect(()=>{if(a&&!y){c(!0);const w=new globalThis.Image;w.src=e,w.onload=()=>{j(e),g(!0),c(!1),d&&d()}}},[a,e,y,d]);const $=i.useCallback(w=>(w.preventDefault(),!1),[]),F=i.useCallback(w=>(w.preventDefault(),!1),[]);return t.jsxs(zt,{onClick:p,children:[t.jsx(Wt,{src:u,alt:l,className:s,$isLoaded:o,$objectFit:"cover",onContextMenu:$,onDragStart:F,draggable:!1,style:{cursor:p?"pointer":"default"}}),!o&&t.jsx(Yt,{}),S&&t.jsx(ce,{$type:"loading",children:T("Loading full resolution...")}),m&&o&&t.jsx(ce,{$type:"watermark",children:t.jsx(Se,{children:"6180 Watermarked"})})]})},Vo=({thumbnailUrl:e,videoUrl:r,duration:l,index:s,onFullResolutionLoaded:a,onClick:d,showWatermark:p=!1})=>{const[m,o]=i.useState(!1),[h,y]=i.useState(!1),[g,S]=i.useState(!1),c=Pt.useRef(null),{t:u}=fe(),j=()=>{if(d){d();return}g?o(!0):y(!0)},T=()=>{S(!0),o(!0),a&&a()};i.useEffect(()=>{if(h&&c.current&&!g){const w=c.current,X=()=>{T(),w.removeEventListener("canplaythrough",X)};return w.addEventListener("canplaythrough",X),w.load(),()=>{w.removeEventListener("canplaythrough",X)}}},[h,g]);const $=i.useCallback(w=>(w.preventDefault(),!1),[]),F=i.useCallback(w=>(w.preventDefault(),!1),[]);return m?t.jsxs("div",{style:{position:"relative",width:"100%",height:"100%"},children:[t.jsxs("video",{ref:c,controls:!0,style:{width:"100%",height:"100%",userSelect:"none",WebkitUserSelect:"none",MozUserSelect:"none",msUserSelect:"none",WebkitTouchCallout:"none"},onContextMenu:$,onDragStart:F,draggable:!1,children:[t.jsx("source",{src:r,type:"video/mp4"}),u("Your browser does not support the video tag.")]}),p&&t.jsx(ce,{$type:"watermark",children:t.jsx(Se,{children:"6180 Watermarked"})})]}):h&&!g?t.jsxs(Fe,{children:[t.jsx(Ae,{src:r,thumbnailSrc:e,alt:`Video thumbnail ${s+1}`,showWatermark:p}),t.jsx(ce,{$type:"loading",children:u("Loading video...")}),t.jsx("video",{ref:c,style:{display:"none",userSelect:"none",WebkitUserSelect:"none",MozUserSelect:"none",msUserSelect:"none",WebkitTouchCallout:"none"},preload:"auto",onContextMenu:$,onDragStart:F,draggable:!1,children:t.jsx("source",{src:r,type:"video/mp4"})})]}):t.jsxs(Fe,{onClick:j,children:[t.jsx(Ae,{src:r,thumbnailSrc:e,alt:`Video thumbnail ${s+1}`,showWatermark:p}),t.jsx(Vt,{}),t.jsx(He,{$position:"bottomLeft",children:l})]})},Jo=({item:e,index:r,isSelectionMode:l,isSelected:s,toggleItemSelection:a,openFullscreenView:d,showWatermark:p,ownerName:m})=>t.jsxs("div",{style:{position:"relative",border:l&&s?"3px solid #006adc":void 0,borderRadius:"8px",overflow:"hidden",boxShadow:l&&s?"0 0 0 3px rgba(0, 106, 220, 0.3)":void 0},onClick:o=>l?a(r,o):d(r),children:[l&&t.jsx(Jt,{$isSelected:s,onClick:o=>a(r,o),children:s&&t.jsx(Xt,{children:"✓"})}),e.type==="image"?t.jsx(Ae,{src:e.url,thumbnailSrc:e.thumbnailUrl,alt:`Album image ${r+1}`,loadFullResolution:!1,onFullResolutionLoaded:()=>{},onClick:()=>l?void 0:d(r),showWatermark:p}):t.jsx(Vo,{thumbnailUrl:e.thumbnailUrl||"",videoUrl:e.url,duration:e.duration||"0:00",index:r,onFullResolutionLoaded:()=>{},onClick:()=>l?void 0:d(r),showWatermark:p}),m&&t.jsx(He,{$position:"bottomRight",$light:!0,children:m})]},r),Xo=({isLoading:e,error:r,albumData:l,columns:s,shouldShowContent:a,shouldShowWatermark:d,isSelectionMode:p,selectedItems:m,toggleItemSelection:o,openFullscreenView:h,t:y})=>e?t.jsx(me,{$type:"loading",id:"loading-message",children:y("Loading album content...")}):r?t.jsx(me,{$type:"error",children:r}):a()?!l||l.mediaItems.length===0?t.jsx(me,{$type:"error",children:y("No media found in this album")}):t.jsx(Kt,{id:"media-grid",$columns:s,children:l.mediaItems.map((g,S)=>{const c=g.ownerContactId&&l.contacts[g.ownerContactId]?l.contacts[g.ownerContactId]:"",u=m.has(S),j=d();return t.jsx(Jo,{item:g,index:S,isSelectionMode:p,isSelected:u,toggleItemSelection:o,openFullscreenView:h,showWatermark:j,ownerName:c},S)})}):t.jsx("div",{style:{gridColumn:"1 / -1",textAlign:"center",padding:"40px 0"},children:t.jsx(me,{$type:"error",children:y("Enter the password to view album contents")})}),Ko=({albumData:e,t:r})=>e?t.jsxs(t.Fragment,{children:[e.folderName&&e.folderName!==r("Photos")&&e.folderName!=="Photos"&&e.folderName.trim()!==""&&t.jsx(Gt,{id:"album-title",children:t.jsx(qt,{children:e.folderName})}),e.folderDescription&&e.folderDescription.trim()!==""&&t.jsx(Ht,{id:"description-container",children:t.jsx(Dt,{children:e.folderDescription})})]}):null,Go=({t:e,isSelectionMode:r,selectedItems:l=new Set,shareSelectPhotos:s,cancelSelection:a,selectAll:d,unselectAll:p,showingEnterPassword:m,promptForPassword:o,passwordPolicy:h,isAuthorized:y,saveAlbumDirectly:g,handleCopyLink:S,albumData:c})=>{var w;const u=((w=c==null?void 0:c.mediaItems)==null?void 0:w.length)||0,j=u>0&&l.size===u,T=()=>t.jsxs("div",{style:{display:"flex",gap:"16px",alignItems:"center",justifyContent:"flex-start",width:"100%",marginBottom:"24px",paddingLeft:"24px",paddingRight:"24px"},children:[s&&t.jsxs(Q,{onClick:s,disabled:l.size===0,style:{opacity:l.size===0?.5:1,backgroundColor:l.size>0?"#006adc":void 0,color:l.size>0?"white":void 0,padding:"8px 16px",marginLeft:"0"},children:[e("Share")," (",l.size,")"]}),u>0&&(j?t.jsx(Q,{onClick:p,style:{padding:"8px 16px",marginLeft:"0"},children:e("Unselect All")}):t.jsx(Q,{onClick:d,style:{padding:"8px 16px",marginLeft:"0"},children:e("Select All")})),t.jsx(Q,{onClick:a,style:{padding:"8px 16px",marginLeft:"0"},children:e("Cancel")})]}),$=()=>!r&&!y&&h&&h!=="NoPassword"&&t.jsx(Q,{onClick:o,$passwordSet:!0,style:{padding:"8px 16px"},children:e("Enter Password")});return r?T():t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",width:"100%",flexWrap:"nowrap",alignItems:"center",marginBottom:"24px",paddingLeft:"24px",paddingRight:"24px"},children:[t.jsx("div",{style:{flexShrink:0},children:!m()&&t.jsx(t.Fragment,{children:t.jsx(Q,{onClick:S,style:{padding:"8px 16px",marginLeft:"0"},children:e("Share")})})}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[$(),!r&&!(!y&&h&&h!=="NoPassword")&&!(c!=null&&c.folderPositionId)&&t.jsx(Q,{onClick:g,style:{padding:"8px 16px"},children:e("Save")})]})]})},qo=()=>{var Le;const{t:e,language:r}=fe(),l=At(),s=xo(),a=yo(),d=Rt(e),[p,m]=i.useState("1"),[o,h]=i.useState(null),[y,g]=i.useState(!0),[S,c]=i.useState(null),[u,j]=i.useState(null),[T,$]=i.useState([]),[F,w]=i.useState(!1),[X,q]=i.useState(!1),[K,n]=i.useState(!1),[A,E]=i.useState(null),[N,V]=i.useState(()=>Math.floor(Math.random()*6)),[J,f]=i.useState(!0),I=[e("Tag, save and find that performance — before it's lost."),e("Tag, save and find that smile — before it's lost."),e("Tag, save and find that birthday — before it's lost."),e("Tag, save and find that sunset — before it's lost."),e("Tag, save and find that party — before it's lost."),e("Tag, save and find that vacation — before it's lost.")],C=Nt(x=>{x?we(`save-album.html?folderId=${encodeURIComponent(x)}`):we("save-album.html")}),{passwordPolicy:b,setPasswordPolicy:B,isAuthorized:M,setIsAuthorized:k,showPasswordModal:v,setShowPasswordModal:P,passwordError:L,setPasswordError:U,passwordVerified:z,setPasswordVerified:Z,shouldShowContent:D,shouldShowWatermark:O,showingEnterPassword:ee,promptForPassword:te}=a;console.log("Password protection state:",{passwordPolicy:b,isAuthorized:M,showPasswordModal:v,passwordVerified:z,showingEnterPassword:ee}),console.log("shouldShowContent result:",D),console.log("shouldShowWatermark result:",O);const{fileInputRef:Qe,isUploading:Ze,progressTracker:et,log:$e}=C,{fullscreenItem:se,openFullscreenView:tt,closeFullscreenView:ot,goToPrevItem:st,goToNextItem:nt}=l,{isSelectionMode:he,setIsSelectionMode:rt,selectedItems:ne,toggleItemSelection:it,selectAll:lt,unselectAll:at,cancelSelection:ct}=s,oe=wo(o,u,A,e),dt=()=>lt(T.length),gt=()=>at(),Ee=((Le=o==null?void 0:o.mediaItems)==null?void 0:Le.some(x=>x.selectedTags&&x.selectedTags.length>0))||!1;i.useEffect(()=>{(async()=>{try{await $t(),$e("🔥 Photos page S3 credentials prewarmed successfully")}catch(_){$e(`⚠️ Photos page credential prewarming failed: ${String(_)}`)}})()},[]),i.useEffect(()=>{const x=setInterval(()=>{f(!1),setTimeout(()=>{V(_=>(_+1)%I.length),f(!0)},1e3)},7e3);return()=>clearInterval(x)},[I.length]),i.useEffect(()=>{var x,_;o!=null&&o.mediaItems&&(console.log("🎯 photos.tsx: albumData updated, checking mediaItems tags:",{totalItems:o.mediaItems.length,itemsWithTags:o.mediaItems.filter(R=>R.selectedTags&&R.selectedTags.length>0).length,firstItemTagCount:((_=(x=o.mediaItems[0])==null?void 0:x.selectedTags)==null?void 0:_.length)||0}),o.mediaItems.slice(0,3).forEach((R,G)=>{var W,H;console.log(`🎯 photos.tsx item ${G}:`,{fileId:R.fileId.substring(0,50)+"...",hasSelectedTags:!!R.selectedTags,tagCount:((W=R.selectedTags)==null?void 0:W.length)||0,tags:((H=R.selectedTags)==null?void 0:H.map(re=>{var ge;return{type:re.TagType,title:re.tagTitle,subtags:((ge=re.subtags)==null?void 0:ge.length)||0}}))||[]})}),$(o.mediaItems),w(!1))},[o]);const ut=x=>{$(x),w(!0),ne.clear()},pt=()=>{o!=null&&o.mediaItems&&($(o.mediaItems),w(!1),ne.clear())},ft=async x=>{if(U(null),x.trim()===""){U(e("Password cannot be empty"));return}const _=o==null?void 0:o.actualPassword;if(!_)if(o!=null&&o.hasPassword){U(e("Unable to validate password. Please try again later."));return}else{k(!0),P(!1);return}if(x!==_){U(e("Invalid password. Please try again."));return}const R=await le();if(!R){P(!1),Z(!0),q(!0);return}if(k(!0),P(!1),U(null),!A)try{const H=JSON.parse(atob(R.split(".")[1]))["cognito:username"];E(H)}catch(W){console.error("Failed to decode token",W)}const G=localStorage.getItem(ae.PUBLIC_USERNAME);if(G!=null&&G.startsWith("Profile-")){console.log("Public username starts with 'Profile-', showing username prompt"),G&&d.setUsernameInput(""),d.setShowUsernamePrompt(!0);return}ye(e,u,o)},Ne=x=>{m(x),localStorage.setItem("columns",x)},ht=()=>{C.openFilePicker(u)},mt=async()=>{q(!1);const x=await le();if(x)try{const R=JSON.parse(atob(x.split(".")[1]))["cognito:username"];E(R),z&&(k(!0),Z(!1));const G=localStorage.getItem(ae.PUBLIC_USERNAME);if(G!=null&&G.startsWith("Profile-")){console.log("Public username starts with 'Profile-', showing username prompt"),G&&d.setUsernameInput(""),d.setShowUsernamePrompt(!0);return}ye(e,u,o);return}catch(_){console.error("Failed to decode token",_)}},yt=async x=>{if(!Array.from(x.target.files||[]).length)return;localStorage.removeItem("selectPhotosButtonTimestamp"),n(!1),await C.handleFileSelection(x,A)||q(!0)},xt=async()=>{if(console.log("Starting album registration"),b==="CannotBeSaved"&&!M){te();return}const x=await le();if(!x){console.log("User not logged in, showing OTP login"),q(!0);return}if(!A)try{const G=JSON.parse(atob(x.split(".")[1]))["cognito:username"];E(G)}catch(R){console.error("Failed to decode token",R)}const _=localStorage.getItem(ae.PUBLIC_USERNAME);if(_!=null&&_.startsWith("Profile-")){console.log("Public username starts with 'Profile-', showing username prompt"),_&&d.setUsernameInput(""),d.setShowUsernamePrompt(!0);return}ye(e,u,o)},wt=async()=>{if((b==="NotVisible"||b==="CannotBeSaved")&&!M){te();return}rt(!he),ne.clear()},bt=async()=>{mo(e,o,ne)},St=()=>{oe.setShowingCopyLinkAlert(!1),wt()};i.useEffect(()=>{const x=localStorage.getItem("columns")||"1";m(x)},[]);const It=()=>{console.log("getParametersFromUrl called"),console.log("window.location.pathname:",window.location.pathname);const x=window.location.pathname.split("/").filter(Boolean);return console.log("pathSegments:",x),x.length>0&&x[0]==="app"?(console.log("Traditional app path detected, returning null"),null):x.length===2?(console.log("Found parameters:",x[1]),x[1]):(console.log("No valid path format found, returning null"),null)};i.useEffect(()=>{(async()=>{console.log("initAlbum called");const _=It();if(console.log("Extracted parameters:",_),!_){console.log("No parameters found, setting error"),c(e("Valid parameters not found in URL")),g(!1);return}let R,G=!1;if(console.log('Checking if parameters contain "id=":',_.includes("id=")),_.includes("id=")){console.log('Parameters contain "id=", extracting identifier');const H=_.indexOf("id=");if(H!==-1)R=_.substring(H+3),G=!0,console.log('Extracted identifier after "id=":',R),console.log("Will use fetchFolderUsingTargetItemIdentifier");else{console.log('Failed to find "id=" in parameters'),c(e("Invalid id parameter format")),g(!1);return}}else R=_,G=!1,console.log("Using entire parameters as identifier:",R),console.log("Will use fetchFolderUsingAlbumNanoId");if(R.includes("-")){const H=R.split("-"),re=R;R=H[H.length-1],console.log('Identifier contained "-", stripped from:',re,"to:",R)}else console.log('Identifier does not contain "-", keeping as is:',R);let W;if(G){console.log("Calling fetchFolderUsingTargetItemIdentifier with identifier:",R);let H=R;H.length===32?(H=Et(H),console.log(H)):console.error("Invalid UUID format: must be 32 characters after removing dashes"),W=await fo(H,j)}else console.log("Calling fetchFolderUsingAlbumNanoId with identifier:",R),W=await ho(R,j);console.log("API call result:",W?"Success":"Failed"),W?(console.log("Full album data received:",W),console.log("Media items count:",W.mediaItems?W.mediaItems.length:"No mediaItems property"),console.log("Password policy:",W.passwordPolicy),console.log("Folder position ID:",W.folderPositionId),h(W),W.passwordPolicy&&(B(W.passwordPolicy),console.log("Password policy set to:",W.passwordPolicy),W.passwordPolicy==="NoPassword"||W.folderPositionId?(k(!0),console.log("User automatically authorized")):console.log("User not automatically authorized, will need to enter password")),console.log("Album data set successfully")):(console.log("No data returned from API, setting error"),c(e("Album not found"))),g(!1),console.log("initAlbum completed")})()},[]),i.useEffect(()=>{(async()=>{const _=await le();if(_)try{const G=JSON.parse(atob(_.split(".")[1]))["cognito:username"];E(G);const W=localStorage.getItem("selectPhotosButtonTimestamp");if(W){const H=parseInt(W,10),ge=(Date.now()-H)/(1e3*60);n(ge<10),ge>=10&&localStorage.removeItem("selectPhotosButtonTimestamp")}else n(!1)}catch(R){console.error("Failed to decode token",R)}})()},[]),i.useEffect(()=>{o!=null&&o.folderName?document.title=o.folderName:document.title=e("Photos")},[o,r]),i.useEffect(()=>{var x;console.log("AlbumMediaGrid props changed:",{isLoading:y,error:S,albumDataExists:!!o,mediaItemsCount:(x=o==null?void 0:o.mediaItems)==null?void 0:x.length,filteredMediaItemsCount:T==null?void 0:T.length,columns:p,shouldShowContent:D,shouldShowWatermark:O,isMediaFiltered:F})},[y,S,o,T,p,D,O,F]);const Tt=()=>o&&o.creatorId&&o.contacts[o.creatorId]?o.contacts[o.creatorId]:e("the album owner"),de=ue(r)==="rtl",Te=o?{...o,mediaItems:T}:null;return t.jsxs(t.Fragment,{children:[t.jsx(Qt,{}),t.jsx(Zt,{style:{padding:"12px 0"},children:t.jsxs(eo,{style:{padding:"0 24px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[t.jsx(to,{href:"https://6180.io",target:"_blank",rel:"noopener noreferrer","aria-label":e(A?"Visit Home":"Visit 6180.io"),children:t.jsxs(oo,{$isRTL:de,children:[t.jsx(so,{src:Xe("images/logo_no_background.png"),alt:e("6180 Logo")}),t.jsx("span",{style:{marginLeft:de?"0":"8px",marginRight:de?"8px":"0",fontSize:"20px",fontWeight:"700"},children:e(A?"Home":"6180")})]})}),t.jsx("div",{style:{fontSize:"14px",fontStyle:"italic",color:"#666",textAlign:de?"left":"right",transition:"opacity 0.8s ease-in-out, transform 0.8s ease-in-out",opacity:J?1:0,transform:J?"translateY(0)":"translateY(-1px)",willChange:"opacity, transform"},children:e(I[N])})]})}),t.jsxs(no,{$isRTL:de,style:{paddingTop:"88px"},children:[t.jsx(Go,{t:e,isSelectionMode:he,selectedItems:ne,shareSelectPhotos:bt,cancelSelection:ct,selectAll:dt,unselectAll:gt,showingEnterPassword:ee,promptForPassword:te,passwordPolicy:b,isAuthorized:M,saveAlbumDirectly:xt,handleCopyLink:()=>oe.setShowingCopyLinkAlert(!0),albumData:o}),t.jsxs(ro,{id:"media-container",style:{paddingTop:"12px",paddingBottom:"24px"},children:[t.jsx(bo,{showSelectPhotosButton:K,albumData:o,openFilePicker:ht,t:e}),Ze&&t.jsx("div",{style:{width:"100%",marginBottom:"16px"},children:t.jsx(Lt,{progressTracker:et,isRTL:ue(r)==="rtl",style:{marginTop:"16px"},showSuccessMessage:!0,showErrorMessage:!0})}),t.jsx(So,{isSelectionMode:he,t:e}),t.jsx(Ko,{albumData:o,t:e}),(o==null?void 0:o.mediaItems)&&o.mediaItems.length>0&&!Ee&&t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"16px"},children:[t.jsx(ve,{style:{margin:"0"},children:e("Columns:")}),t.jsxs(_e,{value:p,onChange:x=>Ne(x.target.value),children:[t.jsx("option",{value:"1",children:"1"}),t.jsx("option",{value:"2",children:"2"}),t.jsx("option",{value:"3",children:"3"}),t.jsx("option",{value:"4",children:"4"}),t.jsx("option",{value:"5",children:"5"})]})]}),(o==null?void 0:o.mediaItems)&&o.mediaItems.length>0&&Ee&&t.jsxs(io,{style:{background:"rgba(248, 249, 250, 0.8)",border:"1px solid #e9ecef",borderRadius:"8px",padding:"16px",marginBottom:"16px",boxShadow:"0 1px 3px rgba(0, 0, 0, 0.1)"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"},children:[t.jsx(ve,{style:{margin:"0"},children:e("Columns:")}),t.jsxs(_e,{value:p,onChange:x=>Ne(x.target.value),children:[t.jsx("option",{value:"1",children:"1"}),t.jsx("option",{value:"2",children:"2"}),t.jsx("option",{value:"3",children:"3"}),t.jsx("option",{value:"4",children:"4"}),t.jsx("option",{value:"5",children:"5"})]})]}),t.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:"8px",flexWrap:"wrap"},children:[t.jsx(ve,{style:{margin:"0",paddingTop:"6px",flexShrink:0},children:e("Filter by:")}),t.jsx("div",{style:{flex:1,minWidth:0},children:t.jsx(ko,{mediaItems:o.mediaItems,onFilterChange:ut,resetFilter:pt})})]})]}),t.jsx("div",{style:{marginTop:"16px"},children:t.jsx(Xo,{isLoading:y,error:S,albumData:Te,columns:p,shouldShowContent:D,shouldShowWatermark:O,isSelectionMode:he,selectedItems:ne,toggleItemSelection:it,openFullscreenView:tt,t:e})})]}),t.jsx(zo,{isOpen:v,onClose:()=>{P(!1),U(null)},onSubmit:ft,error:L,t:e}),t.jsx(Wo,{isOpen:X,onClose:()=>{q(!1)},onLoginSuccess:mt,ownerName:Tt(),t:e}),t.jsx(De,{onFileSelection:yt,ref:Qe}),se!==null&&Te&&t.jsx(Bo,{item:Te.mediaItems[se],index:se,onClose:ot,onPrev:st,onNext:()=>nt(T.length),hasNext:se<T.length-1,hasPrev:se>0,showWatermark:O(),ownerName:(()=>{const x=T[se].ownerContactId;if(!x)return"";if(o!=null&&o.contacts&&o.contacts[x])return o.contacts[x];const _=x.split("_____")[0]||"";return _===A?e("Me"):_})()}),t.jsx(Ft,{t:e,language:r,usernameManager:d,onSuccess:x=>{ye(e,u,o)}}),t.jsx(uo,{isOpen:oe.showingCopyLinkAlert,onClose:()=>oe.setShowingCopyLinkAlert(!1),inviteLink:Ve(u,o==null?void 0:o.albumNanoId,o!=null&&o.creatorId&&(o!=null&&o.contacts)&&(o!=null&&o.contacts[o==null?void 0:o.creatorId])?o==null?void 0:o.contacts[o==null?void 0:o.creatorId]:"album",o==null?void 0:o.folderName),onCopy:oe.handleCopy,onCreateSubAlbum:St,showCreateSubAlbum:!0,t:e,isRTL:ue(r)==="rtl"}),t.jsx(po,{isOpen:oe.showingCopiedLinkAlert,onClose:()=>oe.setShowingCopiedLinkAlert(!1),t:e,isRTL:ue(r)==="rtl"})]})]})},Ho=()=>t.jsx(kt,{children:t.jsx(qo,{})});jt.createRoot(document.getElementById("root")).render(t.jsx(Ho,{}));
