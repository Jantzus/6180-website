import{t as ze,v as Be,c as oe,f as pe,S as Ne,w as xt,a,x as We,h as Ye,y as re,r as xe,L as ie,j as t,d as z,u as ae,g as ge,A as wt,b as Je,C as be,o as St,z as It,p as Tt,B as bt,R as Ct,I as vt}from"./utils-CXMMENAx.js";import{a as we}from"./types-Cxncrjqw.js";import{u as Pt,U as jt}from"./UploadProgress-qaN4Afg2.js";import{u as kt,U as At}from"./UsernamePrompt-CeOz70ca.js";import{u as $t,v as Et,N as Nt,B as G,O as le,W as Se,w as Lt,x as Rt,y as Ve,z as Xe,F as Pe,l as je,T as Ke,D as Ft,I as _t,E as Mt,J as Le,K as Ut,Q as Ge,R as Ot,U as zt,M as he,X as Bt,Y as Wt,Z as Yt,C as Jt,_ as Vt,G as Xt,n as Kt,o as Gt,$ as qt,a0 as Ht,a1 as Qt,q as Zt,a2 as Dt,a3 as Ce,a4 as Re,a5 as eo}from"./styled-components-C-1szZci.js";import{C as to,S as oo,I as so,R as no}from"./SignUpCommand-OZBAXGQi.js";import{C as ro,a as io}from"./ConfirmationModal-C728WNcx.js";import"./parseJsonBody-ComnscAu.js";const Ie=(e,l)=>{var x,C,N,S,B,q,V;console.log("🔄 processData called with raw JSON:",JSON.stringify(e,null,2));const c=((C=(x=e==null?void 0:e.data)==null?void 0:x.fetchRelations)==null?void 0:C.items)||[];console.log("📊 Items found:",c.length),console.log("📊 Items details:",JSON.stringify(c,null,2));const o=[],n={};let p="Photos",h,m,g="",u,w=!1,d=!1,y,r=!1;const s=new Set;if(c.length>0){const i=c[0];console.log("📁 Processing folder:",JSON.stringify(i,null,2)),l&&(i!=null&&i.id)&&(console.log("🆔 Setting folder ID:",i.id),l(i.id)),i!=null&&i.albumNanoId&&(h=i.albumNanoId,console.log("🏷️ Album nano ID found:",h)),i!=null&&i.folderName&&i.folderName.length>0&&(p=i.folderName,console.log("📝 Folder name found:",p)),i!=null&&i.creatorId&&i.creatorId.length>0&&(m=i.creatorId,console.log("👤 Creator ID found:",m)),i!=null&&i.folderDescription&&i.folderDescription.length>0&&(g=i.folderDescription,console.log("📄 Folder description found:",g)),i!=null&&i.folderPassword&&(console.log("🔐 Folder password object found:",JSON.stringify(i.folderPassword,null,2)),i.folderPassword.policy&&(u=i.folderPassword.policy,console.log("🔒 Password policy:",u),w=u!=="NoPassword",console.log("🔑 Password required:",w)),i.folderPassword.password&&u!=="NoPassword"&&(d=!0,y=i.folderPassword.password,console.log("🗝️ Actual password found (length):",y.length))),i!=null&&i.folderInviteParameters&&(console.log("📨 Folder invite parameters found:",JSON.stringify(i.folderInviteParameters,null,2)),r=!!i.folderInviteParameters.usingFolderInviteGrantsRightToAddItems,console.log("➕ Using folder invite grants right to add items:",r));const R=((S=(N=c[0])==null?void 0:N.contactsUsingInvite)==null?void 0:S.items)||[];console.log("👥 Processing contacts:",R.length),R.forEach(($,_)=>{var J;console.log(`👤 Contact ${_}:`,JSON.stringify($,null,2)),$!=null&&$.id&&((J=$==null?void 0:$.item)!=null&&J.publicDisplayName)&&(n[$.id]=$.item.publicDisplayName,console.log(`✅ Added contact: ${$.id} -> ${$.item.publicDisplayName}`))});const L=((B=i==null?void 0:i.fileReferencesPage)==null?void 0:B.items)||[];console.log("📸 Processing file references:",L.length),L.forEach(($,_)=>{var W,U,D,H;console.log(`📄 File reference ${_}:`,JSON.stringify($,null,2));const J=$==null?void 0:$.file;if(!(J!=null&&J.dataKey)){console.log(`❌ Skipping file reference ${_} - no dataKey`);return}const{id:f,dataKey:I,thumbnailDataKey:v,durationInSeconds:T,ownerContactId:M}=J,F=$.fileDisplayName;if(console.log(`📂 Processing file: ID=${f}, dataKey=${I}, thumbnailDataKey=${v}, duration=${T}, owner=${M}, refFileDisplayName=${F}`),s.has(I)){console.log(`⚠️ Duplicate dataKey found, skipping: ${I}`);return}s.add(I),console.log(`🔍 Raw selectedTags for file ${f}:`,$.selectedTags);const E=((W=$.selectedTags)==null?void 0:W.map(Y=>{var Z;return{TagType:Y.TagType,tagTitle:Y.tagTitle,subtags:((Z=Y.subtags)==null?void 0:Z.map(Q=>({TagType:Q.TagType,tagTitle:Q.tagTitle,subtagTitle:Q.subtagTitle})))||[]}}))||[];console.log(`🏷️ Processed selectedTags for file ${f}:`,E),console.log("📊 Number of tags:",E.length);const P=F||((U=I.split("/").pop())==null?void 0:U.split(".")[0])||`file-${_}`;console.log(`📝 File display name: ${P}`);const j=`${Ne}${I}`,A=v?`${Ne}${v}`:void 0;if(I.startsWith("Input/Image/")){const Y={type:"image",fileId:f,url:j,thumbnailUrl:A||j,ownerContactId:M,fileDisplayName:P,loaded:!1,selectedTags:E};console.log("🖼️ Complete image item with tags:",{fileId:Y.fileId,type:Y.type,fileDisplayName:Y.fileDisplayName,tagCount:((D=Y.selectedTags)==null?void 0:D.length)||0,tags:Y.selectedTags}),o.push(Y),console.log("✅ Successfully added image item to mediaItems array")}else if(I.startsWith("Input/Video/")){const Y={type:"video",fileId:f,url:j,thumbnailUrl:A||j,duration:xt(T),ownerContactId:M,fileDisplayName:P,loaded:!1,selectedTags:E};console.log("🎥 Complete video item with tags:",{fileId:Y.fileId,type:Y.type,fileDisplayName:Y.fileDisplayName,tagCount:((H=Y.selectedTags)==null?void 0:H.length)||0,tags:Y.selectedTags}),o.push(Y),console.log("✅ Successfully added video item to mediaItems array")}else console.log(`❓ Unknown file type for dataKey: ${I}`)})}else console.log("❌ No items found in API response");const b={mediaItems:o,folderName:p,albumNanoId:h,creatorId:m,folderDescription:g,contacts:n,passwordPolicy:u,passwordRequired:w,hasPassword:d,actualPassword:y,usingFolderInviteGrantsRightToAddItems:r};return console.log("✅ processData final result summary:",{mediaItemsCount:b.mediaItems.length,mediaItemsWithTags:b.mediaItems.filter(i=>i.selectedTags&&i.selectedTags.length>0).length,firstItemTags:((V=(q=b.mediaItems[0])==null?void 0:q.selectedTags)==null?void 0:V.length)||0,totalTagsAcrossAllItems:b.mediaItems.reduce((i,R)=>{var L;return i+(((L=R.selectedTags)==null?void 0:L.length)||0)},0)}),b.mediaItems.slice(0,3).forEach((i,R)=>{var L,$;console.log(`📋 Item ${R} details:`,{fileId:i.fileId,fileDisplayName:i.fileDisplayName,tagCount:((L=i.selectedTags)==null?void 0:L.length)||0,tags:(($=i.selectedTags)==null?void 0:$.map(_=>`${_.tagTitle}(${_.subtags.length})`))||[]})}),console.log("✅ processData final result:",JSON.stringify(b,null,2)),b},lo=async(e,l)=>{var c,o,n,p;console.log("🔍 fetchFolderUsingTargetItemIdentifier called with:",e);try{const m={fetchRelationsInput:{targetItemIdentifier____RelationType:`${e}____Folder`,index:"targetItemIdentifier____RelationType",limit:1,scanIndexForward:!1,nextToken:null}};console.log("📤 Query variables:",JSON.stringify(m,null,2)),console.log("🌐 Making public API call...");const g=fetch(ze,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":Be},body:JSON.stringify({query:we,variables:m})}).then(r=>r.json());console.log("🔒 Checking private API availability...");const u=(async()=>{const r=await oe();return console.log("🎫 Token available:",!!r),r?(console.log("🌐 Making private API call..."),fetch(pe,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({query:we,variables:m})}).then(s=>s.json())):(console.log("❌ No token - skipping private API"),null)})();console.log("⏳ Waiting for public API response...");const w=await g;console.log("📥 Public API raw response:",JSON.stringify(w,null,2));let d=Ie(w,l);console.log("🔄 Processed public data:",JSON.stringify(d,null,2)),console.log("⏳ Waiting for private API response...");const y=await u;if(y){console.log("📥 Private API raw response:",JSON.stringify(y,null,2));const r=(p=(n=(o=(c=y==null?void 0:y.data)==null?void 0:c.fetchRelations)==null?void 0:o.items)==null?void 0:n[0])==null?void 0:p.folderPosition;if(console.log("📍 Folder position found:",!!r),console.log("📍 Folder position details:",JSON.stringify(r,null,2)),r){const s=Ie(y,l);console.log("🔄 Processed private data (before enhancement):",JSON.stringify(s,null,2)),s.folderPositionId=r==null?void 0:r.id,s.profileIds=r==null?void 0:r.profileIds,console.log("🔄 Enhanced private data:",JSON.stringify(s,null,2)),d=s}else console.log("❌ No folder position in private API response")}else console.log("❌ No private API response (user not logged in or API failed)");return console.log("✅ Final return data:",JSON.stringify(d,null,2)),d}catch(h){return console.error("💥 Error in fetchFolderUsingTargetItemIdentifier:",h),null}},ao=async(e,l)=>{var c,o,n,p;try{const m={fetchRelationsInput:{albumNanoId:e,index:"albumNanoId",limit:1,scanIndexForward:!1,nextToken:null}},g=fetch(ze,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":Be},body:JSON.stringify({query:we,variables:m})}).then(r=>r.json()),u=(async()=>{const r=await oe();return r?fetch(pe,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({query:we,variables:m})}).then(s=>s.json()):null})(),w=await g;let d=Ie(w,l);const y=await u;if(y){const r=(p=(n=(o=(c=y==null?void 0:y.data)==null?void 0:c.fetchRelations)==null?void 0:o.items)==null?void 0:n[0])==null?void 0:p.folderPosition;if(r){const s=Ie(y,l);s.folderPositionId=r==null?void 0:r.id,s.profileIds=r==null?void 0:r.profileIds,d=s}}return d}catch(h){return console.error("Error fetching folder data:",h),null}},me=async(e,l,c)=>{console.log("Starting album registration");const o=document.createElement("div");o.style.position="fixed",o.style.top="0",o.style.left="0",o.style.width="100%",o.style.height="100%",o.style.backgroundColor="rgba(0, 0, 0, 0.5)",o.style.display="flex",o.style.justifyContent="center",o.style.alignItems="center",o.style.zIndex="2000";const n=document.createElement("div");n.style.backgroundColor="white",n.style.padding="30px",n.style.borderRadius="8px",n.style.textAlign="center";const p=document.createElement("p");p.id="saveProgressText",p.textContent=e("Registering album...");const h=document.createElement("div");h.style.backgroundColor="#f0f0f0",h.style.borderRadius="4px",h.style.overflow="hidden",h.style.height="8px",h.style.marginTop="10px";const m=document.createElement("div");m.id="saveProgress",m.style.backgroundColor="#4caf50",m.style.height="100%",m.style.width="5%",m.style.transition="width 0.3s ease";const g=document.createElement("p");g.id="saveErrorText",g.style.color="#f44336",g.style.display="none",g.style.marginTop="10px",g.style.fontSize="14px",h.appendChild(m),n.appendChild(p),n.appendChild(h),n.appendChild(g),o.appendChild(n),document.body.appendChild(o);try{const u=await Ye();if(!u){console.error("No token available for registering album"),document.body.removeChild(o);return}if(!JSON.parse(atob(u.split(".")[1]))["cognito:username"]){console.error("Missing username in token"),re(g,"Could not retrieve username from token",p,m);return}if(!l){console.error("No folder ID available"),re(g,"Folder ID is missing",p,m);return}if(!c||!c.mediaItems){console.error("No album data available"),re(g,"Album data is missing or incomplete",p,m);return}if(c.mediaItems.length===0){console.error("No media items to save"),re(g,"No media items in album to save",p,m);return}const y=Math.floor(Date.now()/1e3);ye(30,p,m,e("Preparing album data..."));const r={currentTime:y,folderId:l,profileIds:["Only Me_____Only Me____Profile"],folderPositionSelectedTagInputs:[],folderPositionPoints:1};console.log("Folder position input:",r),ye(50,p,m,e("Saving album..."));const s=`
      mutation SaveAlbum(
        $folderPositionInputs: [FolderPositionInput!]
      ) {
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items { id }
        }
      }
    `,b={folderPositionInputs:[r]};console.log("GraphQL mutation variables:",JSON.stringify(b));try{const x=await fetch(pe,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${u}`},body:JSON.stringify({query:s,variables:b})});if(ye(80,p,m,e("Almost there...")),!x.ok)throw new Error(`HTTP error: ${x.status} ${x.statusText}`);const C=await x.text();let N;try{N=JSON.parse(C),console.log("API response:",N)}catch(S){const B=S instanceof Error?S.message:"Unknown JSON parse error";throw new Error(`Invalid JSON response: ${B}`)}if(N.errors&&N.errors.length>0){const S=N.errors.map(B=>(console.error("GraphQL error:",B),B.message||"Unknown GraphQL error")).join("; ");throw new Error(`GraphQL errors: ${S}`)}console.log("Album registered successfully"),ye(100,p,m,e("Album registered successfully!")),sessionStorage.setItem("album_just_saved","true"),setTimeout(()=>{document.body.removeChild(o),xe("my-albums.html")},2e3)}catch(x){const C=x instanceof Error?x.message:"Unknown API error";console.error("Error in API request:",x),re(g,C,p,m)}}catch(u){const w=u instanceof Error?u.message:"Unknown error";console.error("Error registering album:",u),re(g,w,p,m)}},co=async(e,l,c)=>{if(c.size===0){console.log("[SubAlbum] Error: No items selected"),alert(e("Please select at least one item to share."));return}if(l)try{console.log("[SubAlbum] Creating loading modal");const o=document.createElement("div");o.style.position="fixed",o.style.top="0",o.style.left="0",o.style.width="100%",o.style.height="100%",o.style.backgroundColor="rgba(0, 0, 0, 0.5)",o.style.display="flex",o.style.justifyContent="center",o.style.alignItems="center",o.style.zIndex="2000";const n=document.createElement("div");n.style.backgroundColor="white",n.style.padding="30px",n.style.borderRadius="8px",n.style.textAlign="center";const p=document.createElement("p");p.textContent=e("Selecting files..."),n.appendChild(p),o.appendChild(n),document.body.appendChild(o),console.log("[SubAlbum] Loading modal added to DOM");const h=[],m=[];console.log("[SubAlbum] Starting to process selected items"),Array.from(c).forEach((u,w)=>{var y;console.log(`[SubAlbum] Processing item ${w+1}/${c.size}, index: ${u}`);const d=l.mediaItems[u];if(console.log("[SubAlbum] Media item found:",{hasMediaItem:!!d,fileId:d==null?void 0:d.fileId,type:d==null?void 0:d.type,hasUrl:!!(d!=null&&d.url),fileDisplayName:d==null?void 0:d.fileDisplayName}),d&&d.fileId){h.push(d.fileId);let r;if(d.fileDisplayName)r=d.fileDisplayName,console.log(`[SubAlbum] Using fileDisplayName: ${r}`);else{const b=d.fileId.split("_____");r=((y=b[1])==null?void 0:y.split("____")[0])||`file-${u}`,console.log("[SubAlbum] Extracted fileName from fileId:",{fileIdParts:b,fileName:r})}const s={fileName:r,s3PreviewUrl:d.type==="video"&&d.thumbnailUrl||d.url,type:d.type==="video"?"video":"image",size:0,status:"complete",progress:100,fileId:d.fileId,duration:d.type==="video"&&d.duration?parseFloat(d.duration.split(":").reduce((b,x)=>60*b+parseFloat(x),0).toString()):null};console.log("[SubAlbum] Created SelectedPhoto object:",s),m.push(s)}else console.warn(`[SubAlbum] Skipping invalid media item at index ${u}`)}),console.log("[SubAlbum] Processing complete. Summary:",{selectedFileIdsCount:h.length,selectedPhotosCount:m.length,fileIdsSample:h.slice(0,2)});const g={isSubAlbum:!0,selectedFileIds:h,selectedPhotos:m};console.log("[SubAlbum] Created subAlbumData:",{isSubAlbum:g.isSubAlbum,selectedFileIdsCount:g.selectedFileIds.length,selectedPhotosCount:g.selectedPhotos.length});try{console.log(`[SubAlbum] Saving to localStorage with key: ${ie.SUB_ALBUM_DATA}`);const u=JSON.stringify(g);console.log(`[SubAlbum] Serialized data length: ${u.length} characters`),localStorage.setItem(ie.SUB_ALBUM_DATA,u),console.log("[SubAlbum] Successfully saved to localStorage")}catch(u){if(console.error("[SubAlbum] Error saving to localStorage:",u),u instanceof DOMException&&(u.name==="QuotaExceededError"||u.name==="NS_ERROR_DOM_QUOTA_REACHED")){console.error("[SubAlbum] localStorage quota exceeded"),alert(e("Storage limit exceeded. The album may be too large to share this way.")),document.body.removeChild(o);return}throw u}console.log("[SubAlbum] Removing loading modal"),document.body.removeChild(o),console.log("[SubAlbum] Redirecting to save-album.html"),xe("save-album.html")}catch(o){console.error("[SubAlbum] Error creating selection:",o),alert(e("There was an error creating the selection. Please try again."));try{const n=document.querySelector('div[style*="position: fixed"][style*="backgroundColor: rgba(0, 0, 0, 0.5)"]');n&&n.parentNode&&(console.log("[SubAlbum] Cleaning up loading modal after error"),n.parentNode.removeChild(n))}catch(n){console.error("[SubAlbum] Error cleaning up after main error:",n)}}else console.error("[SubAlbum] Error: Album data is null"),alert(e("Cannot create selection: Album data is missing."))},ye=(e,l,c,o)=>{c.style.width=`${e}%`,o&&(l.textContent=o)},go=()=>{const[e,l]=a.useState(void 0),[c,o]=a.useState(!1),[n,p]=a.useState(!1),[h,m]=a.useState(null),[g,u]=a.useState(!1),w=a.useCallback(()=>!e||c||e==="NoPassword"?!0:e==="NotVisible"?(h&&console.error("Password error:",h),!1):!0,[e,c,h]),d=a.useCallback(()=>{const s=(h==null?void 0:h.toLowerCase().includes("watermark"))??!1;return!c&&e==="Watermark"||s},[c,e,h]),y=a.useCallback(()=>!c&&e!==void 0&&e!=="NoPassword",[c,e]),r=a.useCallback(()=>{m(null),p(!0)},[]);return{passwordPolicy:e,setPasswordPolicy:l,isAuthorized:c,setIsAuthorized:o,showPasswordModal:n,setShowPasswordModal:p,passwordError:h,setPasswordError:m,passwordVerified:g,setPasswordVerified:u,shouldShowContent:w,shouldShowWatermark:d,showingEnterPassword:y,promptForPassword:r}},po=()=>{const[e,l]=a.useState(!1),[c,o]=a.useState(new Set),n=a.useCallback((g,u)=>{u.stopPropagation(),o(w=>{const d=new Set(w);return d.has(g)?d.delete(g):d.add(g),d})},[]),p=a.useCallback(g=>{if(g<=0)return;const u=new Set(Array.from({length:g},(w,d)=>d));o(u)},[]),h=a.useCallback(()=>{o(new Set)},[]),m=a.useCallback(()=>{l(!1),o(new Set)},[]);return{isSelectionMode:e,setIsSelectionMode:l,selectedItems:c,setSelectedItems:o,toggleItemSelection:n,selectAll:p,unselectAll:h,cancelSelection:m}},uo=(e,l,c,o)=>{const[n,p]=a.useState(!1),[h,m]=a.useState(!1),[g,u]=a.useState(!1),[w,d]=a.useState([]);a.useEffect(()=>{if(e&&e.profileIds&&c){const s=`${c}_____Public____Profile`;d(e.profileIds),u(e.profileIds.includes(s))}},[e,c]);const y=a.useCallback(()=>{const s=We(l,e==null?void 0:e.albumNanoId,(e==null?void 0:e.creatorId)&&(e==null?void 0:e.contacts)&&(e==null?void 0:e.contacts[e==null?void 0:e.creatorId]),e==null?void 0:e.folderName);navigator.clipboard.writeText(s).then(()=>{p(!1),m(!0)}).catch(b=>{console.error("Failed to copy link:",b),alert(o("Failed to copy link"))})},[l,o]),r=a.useCallback(async()=>{var s,b,x;if(!c||!l){alert(o("You must be logged in to perform this action"));return}try{const C=await Ye();if(!C){console.error("Authentication failed");return}const N=`${c}_____Public____Profile`,S=[...w];if(g){const L=S.indexOf(N);L>-1&&S.splice(L,1)}else S.push(N);const V=await(await fetch(pe,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${C}`},body:JSON.stringify({query:`
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
      `,variables:{folderPositionChangeProfileIdsInput:{folderId:l,profileIds:S}}})})).json();if(V.errors)throw new Error(((s=V.errors[0])==null?void 0:s.message)||"Unknown error");const R=(((x=(b=V==null?void 0:V.data)==null?void 0:b.changeFiles)==null?void 0:x.items)||[]).find(L=>L.folderPositionId===(e==null?void 0:e.folderPositionId));R&&R.profileIds&&(d(R.profileIds),u(R.profileIds.includes(N)),console.log("Album visibility updated successfully"))}catch(C){console.error("Failed to toggle album visibility:",C),alert(o("Failed to update album visibility. Please try again."))}},[c,l,w,g,e,o]);return{showingCopyLinkAlert:n,setShowingCopyLinkAlert:p,showingCopiedLinkAlert:h,setShowingCopiedLinkAlert:m,isOnPublicProfile:g,handleCopy:y,handlePublicProfileToggle:r}},fo=({showSelectPhotosButton:e,albumData:l,openFilePicker:c,t:o})=>!e||!(l!=null&&l.usingFolderInviteGrantsRightToAddItems)?null:t.jsx("div",{style:{width:"100%",display:"flex",justifyContent:"center",marginBottom:"20px",marginTop:"10px"},children:t.jsx("button",{onClick:c,style:{backgroundColor:"#007bff",color:"white",border:"none",borderRadius:"6px",padding:"12px 20px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"8px",fontSize:"16px",boxShadow:"0 2px 4px rgba(0,0,0,0.1)"},children:t.jsx("span",{children:o("Select Photos To Add To Album")})})}),ho=({isSelectionMode:e,t:l})=>e?t.jsx($t,{children:t.jsx("p",{children:l("Select photos and videos to share")})}):null,mo=z.div`
  width: 100%;
  /* Remove gray background, padding, border, and border-radius */
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  direction: ${e=>e.$isRTL?"rtl":"ltr"};
`,Fe=z.div`
  margin-bottom: 8px; /* Reduced from 12px to 8px for tighter spacing */

  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 6px; /* Tighter mobile spacing */
  }
`,_e=z.div`
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
`,yo=z.button`
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
`,xo=z.button`
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
`,wo=z.div`
  margin-top: 6px; /* Reduced from 8px to 6px */
  font-size: 13px;
  color: #555;
  font-style: italic;
  text-align: ${e=>e.$isRTL?"right":"left"};
`,So=z.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 6px 0; /* Reduced from 8px to 6px */
`,Io=z.button`
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
`,To=({mediaItems:e,onFilterChange:l,resetFilter:c})=>{var R,L,$,_,J;const{t:o,language:n}=ae(),p=ge(n)==="rtl";console.log("🎯 MediaTagsFilter received props:",{mediaItemsCount:e.length,mediaItemsWithTags:e.filter(f=>f.selectedTags&&f.selectedTags.length>0).length,firstItemHasTags:!!((R=e[0])!=null&&R.selectedTags),firstItemTagCount:(($=(L=e[0])==null?void 0:L.selectedTags)==null?void 0:$.length)||0,sampleTags:((J=(_=e[0])==null?void 0:_.selectedTags)==null?void 0:J.slice(0,2))||[]}),e.slice(0,3).forEach((f,I)=>{var v,T;console.log(`🎯 Filter received item ${I}:`,{fileId:f.fileId,hasSelectedTags:!!f.selectedTags,tagCount:((v=f.selectedTags)==null?void 0:v.length)||0,tags:((T=f.selectedTags)==null?void 0:T.map(M=>{var F;return`${M.tagTitle}(${((F=M.subtags)==null?void 0:F.length)||0})`}))||[]})});const[h,m]=a.useState([]),[g,u]=a.useState([]),[w,d]=a.useState(null),[y,r]=a.useState([]),s=f=>f.subtags.filter(I=>g.includes(I.key)),b=f=>{const I=s(f);if(I.length===0)return`${f.tagTitle} (${f.count})`;const v=I.map(T=>`${T.subtagTitle} (${T.count})`).join(", ");return`${f.tagTitle} (${v})`};a.useEffect(()=>{console.log("🏷️ MediaTagsFilter: Starting tag extraction from mediaItems:",e.length);const f=new Map;e.forEach((v,T)=>{var M,F;console.log(`🏷️ Processing mediaItem ${T}:`,{fileId:v.fileId,hasSelectedTags:!!v.selectedTags,selectedTagsLength:((M=v.selectedTags)==null?void 0:M.length)||0}),(F=v.selectedTags)==null||F.forEach((E,P)=>{var W;console.log(`  🏷️ Processing tag ${P}:`,E);const j=`${E.TagType}-${E.tagTitle}`;f.has(j)||(f.set(j,{tag:{key:j,TagType:E.TagType,tagTitle:E.tagTitle,count:0,subtags:[]},count:0}),console.log(`    ✅ Created new tag: ${j}`));const A=f.get(j);A.count++,A.tag.count=A.count,console.log(`    📊 Updated tag count: ${j} = ${A.count}`),(W=E.subtags)==null||W.forEach((U,D)=>{console.log(`    🏷️ Processing subtag ${D}:`,U);const H=`${U.TagType}-${U.tagTitle}-${U.subtagTitle}`,Y=A.tag,Z=Y.subtags.find(Q=>Q.key===H);Z?(Z.count++,console.log(`      📊 Updated subtag count: ${H} = ${Z.count}`)):(Y.subtags.push({key:H,TagType:U.TagType,tagTitle:U.tagTitle,subtagTitle:U.subtagTitle,count:1}),console.log(`      ✅ Created new subtag: ${H}`))})})});const I=Array.from(f.values()).sort((v,T)=>T.count-v.count).map(v=>(v.tag.subtags.sort((T,M)=>M.count-T.count),v.tag));console.log("🏷️ Final tags array:",{totalTags:I.length,tags:I.map(v=>({key:v.key,title:v.tagTitle,count:v.count,subtagsCount:v.subtags.length}))}),m(I),r(I)},[e]);const x=f=>{if(f.length===0){c(),r(h);return}const I=e.filter(v=>{var M;const T=new Set;return(M=v.selectedTags)==null||M.forEach(F=>{var E;T.add(`${F.TagType}-${F.tagTitle}`),(E=F.subtags)==null||E.forEach(P=>{T.add(`${P.TagType}-${P.tagTitle}-${P.subtagTitle}`)})}),f.every(F=>T.has(F))});B(I),l(I)},C=f=>{const I=g.includes(f.key),v=w===f.key;if(I){if(I&&!v)d(f.key);else if(I&&v){const T=g.filter(M=>M!==f.key&&!f.subtags.some(F=>F.key===M));u(T),d(null),x(T)}}else{const T=[...g,f.key];u(T),d(f.key),x(T)}},N=f=>{const I=g.includes(f.key);let v;I?v=g.filter(T=>T!==f.key):v=[...g,f.key],u(v),x(v)},S=()=>{u([]),d(null),c(),r(h)},B=f=>{const I=new Set;f.forEach(T=>{var M;(M=T.selectedTags)==null||M.forEach(F=>{I.add(`${F.TagType}-${F.tagTitle}`)})}),g.forEach(T=>{T.includes("-",T.indexOf("-")+1)||I.add(T)});const v=h.filter(T=>I.has(T.key));r(v)},q=w?h.find(f=>f.key===w):null,V=g.length,i=h.length>0;return console.log("🎯 MediaTagsFilter render decision:",{allTagsLength:h.length,hasTags:i,willRender:i}),i?(console.log("✅ MediaTagsFilter: Rendering with tags"),t.jsxs(mo,{$isRTL:p,children:[t.jsx(Fe,{children:t.jsxs(_e,{$isRTL:p,children:[V>0&&t.jsx(Io,{onClick:S,children:o("Clear All")}),y.length>0?y.map(f=>{const I=s(f),v=I.length>0?o("{{tagType}}: {{tagTitle}} ({{subtags}})",{tagType:f.TagType,tagTitle:f.tagTitle,subtags:I.map(T=>T.subtagTitle).join(", ")}):o("Click to add/remove: {{tagType}}: {{tagTitle}}",{tagType:f.TagType,tagTitle:f.tagTitle});return t.jsx(yo,{$isSelected:g.includes(f.key),$isDisplayed:w===f.key,onClick:()=>C(f),title:v,children:b(f)},f.key)}):t.jsx(So,{children:o("No tags available")})]})}),q&&q.subtags.length>0&&t.jsx(Fe,{children:t.jsx(_e,{$isRTL:p,children:q.subtags.map(f=>t.jsxs(xo,{$isSelected:g.includes(f.key),onClick:()=>N(f),title:o("Click to add/remove: {{tagType}}: {{tagTitle}} → {{subtagTitle}}",{tagType:f.TagType,tagTitle:f.tagTitle,subtagTitle:f.subtagTitle}),children:[f.subtagTitle," (",f.count,")"]},f.key))})}),V>0&&t.jsx(wo,{$isRTL:p,children:o("Showing photos with all selected tags")})]})):(console.log("❌ MediaTagsFilter: No tags found, returning null"),null)},bo=z.div`
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
  position: relative;
`,Co=z.div`
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
`,vo=z.div`
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
`,Po=z.button`
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
`,jo=z.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 10px;
  position: relative;
  touch-action: none; /* Prevent default touch behaviors */
`,ko=z.div`
  transform: scale(${e=>e.$scale}) translate(${e=>e.$translateX}px, ${e=>e.$translateY}px);
  transition: transform 0.1s ease-out;
  transform-origin: center center;
  will-change: transform;
`,Me=z.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  max-height: 100%;
`,Ao=z.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  opacity: ${e=>e.$isLoaded?1:0};
  transition: opacity 0.3s ease;
  user-select: none;
  pointer-events: none;
`,$o=z.img`
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
`,Eo=z.video`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  user-select: none;
`,No=z.div`
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
`,Lo=({src:e,onLoadedData:l,t:c})=>t.jsxs(Eo,{controls:!0,autoPlay:!0,playsInline:!0,onLoadedData:l,children:[t.jsx("source",{src:e,type:"video/mp4"}),c("Your browser does not support the video tag.")]}),Ro=({item:e,index:l,onClose:c,onPrev:o,onNext:n,hasNext:p,hasPrev:h,ownerName:m,showWatermark:g=!1})=>{const[u,w]=a.useState(!1),[d,y]=a.useState(!0),{t:r}=ae(),[s,b]=a.useState(1),[x,C]=a.useState(0),[N,S]=a.useState(0),[B,q]=a.useState(!1),V=a.useRef(null),i=a.useRef(null),R=a.useRef(0),L=a.useRef(!1),$=.5,_=4,J=300;a.useEffect(()=>{b(1),C(0),S(0),w(!1),y(!0)},[e.url]);const f=a.useCallback(()=>{q(!0),setTimeout(()=>q(!1),1500)},[]),I=a.useCallback((E,P,j)=>{if(!V.current)return{x:E,y:P};const A=V.current.getBoundingClientRect(),W=Math.max(0,A.width*(j-1)/2),U=Math.max(0,A.height*(j-1)/2);return{x:Math.max(-W,Math.min(W,E)),y:Math.max(-U,Math.min(U,P))}},[]);a.useEffect(()=>{const E=P=>{P.key==="Escape"?c():P.key==="ArrowLeft"&&h&&s<=1?o():P.key==="ArrowRight"&&p&&s<=1&&n()};return window.addEventListener("keydown",E),()=>window.removeEventListener("keydown",E)},[c,n,o,p,h,s]);const v=(E,P)=>{const j=E.clientX-P.clientX,A=E.clientY-P.clientY;return Math.sqrt(j*j+A*A)},T=E=>{E.preventDefault();const P=E.touches,j=Date.now();if(P.length===1){const A=P[0];if(j-R.current<J){s>1?(b(1),C(0),S(0)):(b(2),C(0),S(0),f()),R.current=0;return}R.current=j,i.current={startX:A.clientX,startY:A.clientY,lastX:A.clientX,lastY:A.clientY,startDistance:0,startScale:s,startTranslateX:x,startTranslateY:N}}else if(P.length===2){const A=v(P[0],P[1]),W=(P[0].clientX+P[1].clientX)/2,U=(P[0].clientY+P[1].clientY)/2;i.current={startX:W,startY:U,lastX:W,lastY:U,startDistance:A,startScale:s,startTranslateX:x,startTranslateY:N},L.current=!0}},M=E=>{if(E.preventDefault(),!i.current)return;const P=E.touches;if(P.length===1&&s>1){const j=P[0],A=j.clientX-i.current.lastX,W=j.clientY-i.current.lastY,U=x+A/s,D=N+W/s,H=I(U,D,s);C(H.x),S(H.y),i.current.lastX=j.clientX,i.current.lastY=j.clientY,L.current=!0}else if(P.length===2){const A=v(P[0],P[1])/i.current.startDistance,W=Math.max($,Math.min(_,i.current.startScale*A));if(b(W),W<=1)C(0),S(0);else{const U=I(i.current.startTranslateX,i.current.startTranslateY,W);C(U.x),S(U.y)}W>1.1&&f(),L.current=!0}},F=E=>{if(!i.current)return;const P=E.touches;if(P.length===0&&!L.current&&s<=1){const j=i.current.lastX-i.current.startX,A=i.current.lastY-i.current.startY;Math.sqrt(j*j+A*A)>50&&Math.abs(j)>Math.abs(A)*2&&(j>0&&h?o():j<0&&p&&n())}if(P.length===0)i.current=null,L.current=!1;else if(P.length===1&&i.current){const j=P[0];i.current.lastX=j.clientX,i.current.lastY=j.clientY,L.current=!1}};return t.jsxs(Et,{children:[t.jsxs(bo,{children:[t.jsx(Po,{onClick:c,children:"✕"}),t.jsxs(Nt,{children:[t.jsx(G,{onClick:h?o:void 0,disabled:!h||s>1,$isDisabled:!h||s>1,children:"←"}),t.jsx(G,{onClick:p?n:void 0,disabled:!p||s>1,$isDisabled:!p||s>1,children:"→"})]})]}),t.jsxs(No,{$visible:B,children:[Math.round(s*100),"%"]}),t.jsxs(jo,{ref:V,onTouchStart:T,onTouchMove:M,onTouchEnd:F,children:[t.jsx(ko,{$scale:s,$translateX:x,$translateY:N,children:e.type==="image"?t.jsxs(Me,{children:[t.jsx(Ao,{src:e.url,alt:r("Image {{index}}",{index:l+1}),$isLoaded:u,onLoad:()=>{w(!0),y(!1)},draggable:!1}),g&&t.jsx(le,{$type:"watermark",children:t.jsx(Se,{children:"6180 Watermarked"})}),!u&&e.thumbnailUrl&&t.jsx($o,{src:e.thumbnailUrl,alt:r("Thumbnail {{index}}",{index:l+1}),draggable:!1})]}):t.jsxs(Me,{children:[t.jsx(Lo,{src:e.url,onLoadedData:()=>y(!1),t:r}),g&&t.jsx(le,{$type:"watermark",children:t.jsx(Se,{children:"6180 Watermarked"})})]})}),d&&t.jsx(Lt,{children:e.type==="image"?r("Loading full resolution..."):r("Loading video...")})]}),t.jsxs(Co,{children:[e.fileDisplayName&&t.jsx(vo,{title:e.fileDisplayName,children:e.fileDisplayName}),e.ownerContactId&&m&&t.jsxs(Rt,{href:`https://6180.io/${m}`,children:[t.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[t.jsx("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),t.jsx("circle",{cx:"12",cy:"7",r:"4"})]}),m]})]})]})},Fo=({isOpen:e,onClose:l,onSubmit:c,error:o,t:n})=>{const[p,h]=a.useState(""),[m,g]=a.useState(!1);if(!e)return null;const u=w=>{w.preventDefault(),g(!0),c(p),g(!1)};return t.jsx(Ve,{children:t.jsxs(Xe,{style:{maxWidth:"400px",textAlign:"center",padding:"32px"},children:[t.jsx("h3",{style:{margin:"0 0 24px 0"},children:n("Enter Password")}),t.jsxs("form",{onSubmit:u,style:{width:"100%"},children:[t.jsxs(Pe,{children:[t.jsx(je,{type:"password",value:p,onChange:w=>h(w.target.value),placeholder:n("Password"),style:{border:o?"1px solid #d32f2f":void 0,padding:"12px",width:"100%",boxSizing:"border-box"},required:!0}),o&&t.jsx("div",{style:{color:"#d32f2f",fontSize:"14px",marginTop:"8px",textAlign:"left"},children:o})]}),t.jsxs("div",{style:{display:"flex",gap:"12px",width:"100%"},children:[t.jsx(G,{type:"button",onClick:l,style:{backgroundColor:"#f3f4f6",color:"#333",flex:1},children:n("Cancel")}),t.jsx(G,{type:"submit",$primary:!0,disabled:m||!p,style:{flex:1},children:n(m?"Submitting...":"Submit")})]})]}),t.jsx(Ke,{children:n("Two-Factor Authentication")})]})})},ve=new to({region:wt});function Ue(e){const l=e.trim().toLowerCase(),c="@gmail.com";return l.endsWith(c)?`${l.slice(0,-c.length).replace(/\./g,"")}${c}`:l}const _o=({isOpen:e,onClose:l,onLoginSuccess:c,ownerName:o="the album owner",t:n})=>{const[p,h]=a.useState(""),[m,g]=a.useState(!1),[u,w]=a.useState(""),[d,y]=a.useState(""),[r,s]=a.useState("idle"),[b,x]=a.useState(""),C=a.useRef(null),N=a.useRef(null);a.useEffect(()=>{m&&N.current&&N.current.focus()},[m]),a.useEffect(()=>{e&&C.current&&!m&&C.current.focus()},[e,m]);function S(i){const R=i.target.value;/^\d*$/.test(R)&&R.length<=6&&w(R)}async function B(){var R;s("sending"),x("");const i=Ue(p);if(!i||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i)){s("error"),x(n("Please enter a valid email address"));return}try{const L=new oo({ClientId:be,Username:i,Password:crypto.randomUUID(),UserAttributes:[{Name:"email",Value:i}]});try{await ve.send(L)}catch(J){if(!((R=J.name)!=null&&R.includes("UsernameExistsException")))throw J}const $=new so({ClientId:be,AuthFlow:"CUSTOM_AUTH",AuthParameters:{USERNAME:i}}),_=await ve.send($);if(_.Session)y(_.Session),g(!0),s("idle");else throw new Error("No session returned from InitiateAuth")}catch(L){console.error(L),s("error"),x(n("Unable to send verification code. Please try again later."))}}async function q(){var R,L,$,_,J,f;s("verifying"),x("");const i=Ue(p);try{const I=new no({ClientId:be,ChallengeName:"CUSTOM_CHALLENGE",ChallengeResponses:{USERNAME:i,ANSWER:u},Session:d}),T=(R=(await ve.send(I)).AuthenticationResult)==null?void 0:R.IdToken;if(!T)throw new Error("No token received");localStorage.setItem("idToken",T);const E=`${JSON.parse(atob(T.split(".")[1]))["cognito:username"]}_____Public____Profile`,j=await(await fetch(pe,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${T}`},body:JSON.stringify({query:`
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
          `,variables:{relationIds:[E]}})})).json(),A=(f=(J=(_=($=(L=j==null?void 0:j.data)==null?void 0:L.batchGetItems)==null?void 0:$.items)==null?void 0:_[0])==null?void 0:J.item)==null?void 0:f.anyDisplayName;A&&localStorage.setItem(ie.PUBLIC_USERNAME,A),s("idle"),c(),l()}catch(I){console.error(I),s("error"),x(n("Invalid or expired verification code. Please try again or request a new code."))}}function V(){g(!1),w(""),s("idle")}return e?t.jsx(Ve,{children:t.jsxs(Xe,{style:{maxWidth:"400px",textAlign:"center",padding:"32px"},children:[t.jsx("img",{src:Je("images/logo_no_background.png"),alt:"6180 Logo",style:{height:"60px",marginBottom:"24px"}}),t.jsx("h3",{style:{margin:"0 0 24px 0",lineHeight:"1.6"},children:n("{ownerName} only shared this album with friends and family").replace("{ownerName}",o)}),b&&t.jsx("div",{style:{backgroundColor:"#f8d7da",color:"#721c24",padding:"12px",borderRadius:"8px",marginBottom:"16px",fontSize:"14px",textAlign:"left"},children:b}),m?t.jsxs("form",{style:{width:"100%"},children:[t.jsxs("p",{style:{marginBottom:"16px",color:"#555",textAlign:"left"},children:[n("Check your email for a 6-digit verification code sent to")," ",t.jsx("strong",{children:p})]}),t.jsx(Pe,{children:t.jsx(je,{ref:N,type:"tel",inputMode:"numeric",pattern:"[0-9]*",maxLength:6,value:u,onChange:S,placeholder:n("Enter 6-digit code"),style:{letterSpacing:"2px",textAlign:"center",padding:"12px",width:"100%",boxSizing:"border-box"}})}),t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px",width:"100%"},children:[t.jsx(G,{onClick:q,disabled:r==="verifying"||u.length!==6,$primary:!0,style:{width:"100%",backgroundColor:"#28a745"},children:n(r==="verifying"?"Verifying...":"Verify Code")}),t.jsxs("div",{style:{fontSize:"14px",color:"#666",display:"flex",justifyContent:"center",gap:"8px"},children:[t.jsx("span",{children:n("Didn't receive a code?")}),t.jsx("button",{onClick:V,style:{background:"none",border:"none",color:"#007bff",padding:0,cursor:"pointer",fontSize:"14px",textDecoration:"underline"},children:n("Send new code")})]}),t.jsx(G,{onClick:l,style:{width:"100%",backgroundColor:"#f8f9fa",color:"#555",border:"1px solid #ccc"},children:n("Cancel")})]})]}):t.jsxs("form",{style:{width:"100%"},children:[t.jsx(Pe,{children:t.jsx(je,{ref:C,type:"email",value:p,onChange:i=>h(i.target.value),placeholder:n("Email address..."),style:{padding:"12px",width:"100%",boxSizing:"border-box"}})}),t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px",width:"100%"},children:[t.jsx(G,{onClick:B,disabled:r==="sending"||!p.trim(),$primary:!0,style:{width:"100%"},children:n(r==="sending"?"Sending...":"Send Verification Code")}),t.jsx(G,{onClick:l,style:{width:"100%",backgroundColor:"#f8f9fa",color:"#555",border:"1px solid #ccc"},children:n("Cancel")})]})]}),t.jsx(Ke,{children:n("Two-Factor Authentication")})]})}):null},Mo=z.div`
  display: none; /* Hidden by default, controlled by refs */
`,Oe=z.input`
  display: none;
`,qe=a.forwardRef(({onFileSelection:e,accept:l="image/*,video/*",multiple:c=!0},o)=>t.jsxs(Mo,{children:[t.jsx(Oe,{ref:o,id:"file-input",type:"file",accept:l,multiple:c,onChange:e}),t.jsx(Oe,{id:"folder-input",type:"file",accept:l,multiple:c,webkitdirectory:"",directory:"",onChange:e})]}));qe.displayName="FileInput";z.div`
  display: flex;
  gap: 8px;
  align-items: center;
  direction: ${e=>e.$isRTL?"rtl":"ltr"};
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }
`;z.button`
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
`;z.span`
  font-size: 16px;
`;const ke=({src:e,thumbnailSrc:l,alt:c,className:o="",loadFullResolution:n=!1,onFullResolutionLoaded:p,onClick:h,showWatermark:m=!1})=>{const[g,u]=a.useState(!1),[w,d]=a.useState(!1),[y,r]=a.useState(!1),[s,b]=a.useState("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E"),{t:x}=ae();a.useEffect(()=>{if(l){const S=new globalThis.Image;S.src=l,S.onload=()=>{b(l),u(!0)}}},[l]),a.useEffect(()=>{if(n&&!w){r(!0);const S=new globalThis.Image;S.src=e,S.onload=()=>{b(e),d(!0),r(!1),p&&p()}}},[n,e,w,p]);const C=a.useCallback(S=>(S.preventDefault(),!1),[]),N=a.useCallback(S=>(S.preventDefault(),!1),[]);return t.jsxs(Ft,{onClick:h,children:[t.jsx(_t,{src:s,alt:c,className:o,$isLoaded:g,$objectFit:"cover",onContextMenu:C,onDragStart:N,draggable:!1,style:{cursor:h?"pointer":"default"}}),!g&&t.jsx(Mt,{}),y&&t.jsx(le,{$type:"loading",children:x("Loading full resolution...")}),m&&g&&t.jsx(le,{$type:"watermark",children:t.jsx(Se,{children:"6180 Watermarked"})})]})},Uo=({thumbnailUrl:e,videoUrl:l,duration:c,index:o,onFullResolutionLoaded:n,onClick:p,showWatermark:h=!1})=>{const[m,g]=a.useState(!1),[u,w]=a.useState(!1),[d,y]=a.useState(!1),r=St.useRef(null),{t:s}=ae(),b=()=>{if(p){p();return}d?g(!0):w(!0)},x=()=>{y(!0),g(!0),n&&n()};a.useEffect(()=>{if(u&&r.current&&!d){const S=r.current,B=()=>{x(),S.removeEventListener("canplaythrough",B)};return S.addEventListener("canplaythrough",B),S.load(),()=>{S.removeEventListener("canplaythrough",B)}}},[u,d]);const C=a.useCallback(S=>(S.preventDefault(),!1),[]),N=a.useCallback(S=>(S.preventDefault(),!1),[]);return m?t.jsxs("div",{style:{position:"relative",width:"100%",height:"100%"},children:[t.jsxs("video",{ref:r,controls:!0,style:{width:"100%",height:"100%",userSelect:"none",WebkitUserSelect:"none",MozUserSelect:"none",msUserSelect:"none",WebkitTouchCallout:"none"},onContextMenu:C,onDragStart:N,draggable:!1,children:[t.jsx("source",{src:l,type:"video/mp4"}),s("Your browser does not support the video tag.")]}),h&&t.jsx(le,{$type:"watermark",children:t.jsx(Se,{children:"6180 Watermarked"})})]}):u&&!d?t.jsxs(Le,{children:[t.jsx(ke,{src:l,thumbnailSrc:e,alt:`Video thumbnail ${o+1}`,showWatermark:h}),t.jsx(le,{$type:"loading",children:s("Loading video...")}),t.jsx("video",{ref:r,style:{display:"none",userSelect:"none",WebkitUserSelect:"none",MozUserSelect:"none",msUserSelect:"none",WebkitTouchCallout:"none"},preload:"auto",onContextMenu:C,onDragStart:N,draggable:!1,children:t.jsx("source",{src:l,type:"video/mp4"})})]}):t.jsxs(Le,{onClick:b,children:[t.jsx(ke,{src:l,thumbnailSrc:e,alt:`Video thumbnail ${o+1}`,showWatermark:h}),t.jsx(Ut,{}),t.jsx(Ge,{$position:"bottomLeft",children:c})]})},Oo=({item:e,index:l,isSelectionMode:c,isSelected:o,toggleItemSelection:n,openFullscreenView:p,showWatermark:h,ownerName:m})=>t.jsxs("div",{style:{position:"relative",border:c&&o?"3px solid #006adc":void 0,borderRadius:"8px",overflow:"hidden",boxShadow:c&&o?"0 0 0 3px rgba(0, 106, 220, 0.3)":void 0},onClick:g=>c?n(l,g):p(l),children:[c&&t.jsx(Ot,{$isSelected:o,onClick:g=>n(l,g),children:o&&t.jsx(zt,{children:"✓"})}),e.type==="image"?t.jsx(ke,{src:e.url,thumbnailSrc:e.thumbnailUrl,alt:`Album image ${l+1}`,loadFullResolution:!1,onFullResolutionLoaded:()=>{},onClick:()=>c?void 0:p(l),showWatermark:h}):t.jsx(Uo,{thumbnailUrl:e.thumbnailUrl||"",videoUrl:e.url,duration:e.duration||"0:00",index:l,onFullResolutionLoaded:()=>{},onClick:()=>c?void 0:p(l),showWatermark:h}),m&&t.jsx(Ge,{$position:"bottomRight",$light:!0,children:m})]},l),zo=({isLoading:e,error:l,albumData:c,columns:o,shouldShowContent:n,shouldShowWatermark:p,isSelectionMode:h,selectedItems:m,toggleItemSelection:g,openFullscreenView:u,t:w})=>e?t.jsx(he,{$type:"loading",id:"loading-message",children:w("Loading album content...")}):l?t.jsx(he,{$type:"error",children:l}):n()?!c||c.mediaItems.length===0?t.jsx(he,{$type:"error",children:w("No media found in this album")}):t.jsx(Bt,{id:"media-grid",$columns:o,children:c.mediaItems.map((d,y)=>{const r=d.ownerContactId&&c.contacts[d.ownerContactId]?c.contacts[d.ownerContactId]:"",s=m.has(y),b=p();return t.jsx(Oo,{item:d,index:y,isSelectionMode:h,isSelected:s,toggleItemSelection:g,openFullscreenView:u,showWatermark:b,ownerName:r},y)})}):t.jsx("div",{style:{gridColumn:"1 / -1",textAlign:"center",padding:"40px 0"},children:t.jsx(he,{$type:"error",children:w("Enter the password to view album contents")})}),Bo=({albumData:e,t:l})=>e?t.jsxs(t.Fragment,{children:[e.folderName&&e.folderName!==l("Photos")&&e.folderName!=="Photos"&&e.folderName.trim()!==""&&t.jsx(Wt,{id:"album-title",children:t.jsx(Yt,{children:e.folderName})}),e.folderDescription&&e.folderDescription.trim()!==""&&t.jsx(Jt,{id:"description-container",children:t.jsx(Vt,{children:e.folderDescription})})]}):null,Wo=({t:e,isSelectionMode:l,selectedItems:c=new Set,shareSelectPhotos:o,cancelSelection:n,selectAll:p,unselectAll:h,showingEnterPassword:m,promptForPassword:g,passwordPolicy:u,isAuthorized:w,saveAlbumDirectly:d,handleCopyLink:y,albumData:r})=>{var S;const s=((S=r==null?void 0:r.mediaItems)==null?void 0:S.length)||0,b=s>0&&c.size===s,x=()=>t.jsxs("div",{style:{display:"flex",gap:"16px",alignItems:"center",justifyContent:"flex-start",width:"100%",marginBottom:"24px",paddingLeft:"24px",paddingRight:"24px"},children:[o&&t.jsxs(G,{onClick:o,disabled:c.size===0,style:{opacity:c.size===0?.5:1,backgroundColor:c.size>0?"#006adc":void 0,color:c.size>0?"white":void 0,padding:"8px 16px",marginLeft:"0"},children:[e("Share")," (",c.size,")"]}),s>0&&(b?t.jsx(G,{onClick:h,style:{padding:"8px 16px",marginLeft:"0"},children:e("Unselect All")}):t.jsx(G,{onClick:p,style:{padding:"8px 16px",marginLeft:"0"},children:e("Select All")})),t.jsx(G,{onClick:n,style:{padding:"8px 16px",marginLeft:"0"},children:e("Cancel")})]}),C=()=>!l&&!w&&u&&u!=="NoPassword"&&t.jsx(G,{onClick:g,$passwordSet:!0,style:{padding:"8px 16px"},children:e("Enter Password")});return l?x():t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",width:"100%",flexWrap:"nowrap",alignItems:"center",marginBottom:"24px",paddingLeft:"24px",paddingRight:"24px"},children:[t.jsx("div",{style:{flexShrink:0},children:!m()&&t.jsx(t.Fragment,{children:t.jsx(G,{onClick:y,style:{padding:"8px 16px",marginLeft:"0"},children:e("Share")})})}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[C(),!l&&!(!w&&u&&u!=="NoPassword")&&!(r!=null&&r.folderPositionId)&&t.jsx(G,{onClick:d,style:{padding:"8px 16px"},children:e("Download")})]})]})},Yo=({albumData:e,folderId:l,cognitoUsername:c})=>{var Ee;const{t:o,language:n}=ae(),p=It(),h=po(),m=go(),g=kt(o),[u,w]=a.useState("1"),[d,y]=a.useState([]),[r,s]=a.useState(!1),[b,x]=a.useState(!1),[C,N]=a.useState(!1),[S,B]=a.useState(c),[q,V]=a.useState(()=>Math.floor(Math.random()*6)),[i,R]=a.useState(!0),L=[o("Tag, save and find that performance — before it's lost."),o("Tag, save and find that smile — before it's lost."),o("Tag, save and find that birthday — before it's lost."),o("Tag, save and find that sunset — before it's lost."),o("Tag, save and find that party — before it's lost."),o("Tag, save and find that vacation — before it's lost.")],$=Pt(k=>{k?xe(`save-album.html?folderId=${encodeURIComponent(k)}`):xe("save-album.html")}),{passwordPolicy:_,setPasswordPolicy:J,isAuthorized:f,setIsAuthorized:I,showPasswordModal:v,setShowPasswordModal:T,passwordError:M,setPasswordError:F,passwordVerified:E,setPasswordVerified:P,shouldShowContent:j,shouldShowWatermark:A,showingEnterPassword:W,promptForPassword:U}=m;console.log("Password protection state:",{passwordPolicy:_,isAuthorized:f,showPasswordModal:v,passwordVerified:E,showingEnterPassword:W}),console.log("shouldShowContent result:",j),console.log("shouldShowWatermark result:",A);const{fileInputRef:D,isUploading:H,progressTracker:Y,log:Z}=$,{fullscreenItem:Q,openFullscreenView:He,closeFullscreenView:Qe,goToPrevItem:Ze,goToNextItem:De}=p,{isSelectionMode:ue,setIsSelectionMode:et,selectedItems:se,toggleItemSelection:tt,selectAll:ot,unselectAll:st,cancelSelection:nt}=h,te=uo(e,l,S,o),rt=()=>ot(d.length),it=()=>st(),Ae=((Ee=e==null?void 0:e.mediaItems)==null?void 0:Ee.some(k=>k.selectedTags&&k.selectedTags.length>0))||!1;a.useEffect(()=>{(async()=>{try{await Tt(),Z("🔥 Photos page S3 credentials prewarmed successfully")}catch(O){Z(`⚠️ Photos page credential prewarming failed: ${String(O)}`)}})()},[]),a.useEffect(()=>{const k=setInterval(()=>{R(!1),setTimeout(()=>{V(O=>(O+1)%L.length),R(!0)},1e3)},7e3);return()=>clearInterval(k)},[L.length]),a.useEffect(()=>{var k,O;e!=null&&e.mediaItems&&(console.log("🎯 AlbumPageStatic: albumData updated, checking mediaItems tags:",{totalItems:e.mediaItems.length,itemsWithTags:e.mediaItems.filter(X=>X.selectedTags&&X.selectedTags.length>0).length,firstItemTagCount:((O=(k=e.mediaItems[0])==null?void 0:k.selectedTags)==null?void 0:O.length)||0}),e.mediaItems.slice(0,3).forEach((X,K)=>{var ee,ne;console.log(`🎯 AlbumPageStatic item ${K}:`,{fileId:X.fileId.substring(0,50)+"...",hasSelectedTags:!!X.selectedTags,tagCount:((ee=X.selectedTags)==null?void 0:ee.length)||0,tags:((ne=X.selectedTags)==null?void 0:ne.map(fe=>{var de;return{type:fe.TagType,title:fe.tagTitle,subtags:((de=fe.subtags)==null?void 0:de.length)||0}}))||[]})}),y(e.mediaItems),s(!1))},[e]),a.useEffect(()=>{e&&e.passwordPolicy&&(J(e.passwordPolicy),console.log("Password policy set to:",e.passwordPolicy),e.passwordPolicy==="NoPassword"||e.folderPositionId?(I(!0),console.log("User automatically authorized")):console.log("User not automatically authorized, will need to enter password"))},[e,J,I]);const lt=k=>{y(k),s(!0),se.clear()},at=()=>{e!=null&&e.mediaItems&&(y(e.mediaItems),s(!1),se.clear())},ct=async k=>{if(F(null),k.trim()===""){F(o("Password cannot be empty"));return}const O=e==null?void 0:e.actualPassword;if(!O)if(e!=null&&e.hasPassword){F(o("Unable to validate password. Please try again later."));return}else{I(!0),T(!1);return}if(k!==O){F(o("Invalid password. Please try again."));return}const X=await oe();if(!X){T(!1),P(!0),x(!0);return}if(I(!0),T(!1),F(null),!S)try{const ne=JSON.parse(atob(X.split(".")[1]))["cognito:username"];B(ne)}catch(ee){console.error("Failed to decode token",ee)}const K=localStorage.getItem(ie.PUBLIC_USERNAME);if(K!=null&&K.startsWith("Profile-")){console.log("Public username starts with 'Profile-', showing username prompt"),K&&g.setUsernameInput(""),g.setShowUsernamePrompt(!0);return}me(o,l,e)},$e=k=>{w(k),localStorage.setItem("columns",k)},dt=()=>{$.openFilePicker(l)},gt=async()=>{x(!1);const k=await oe();if(k)try{const X=JSON.parse(atob(k.split(".")[1]))["cognito:username"];B(X),E&&(I(!0),P(!1));const K=localStorage.getItem(ie.PUBLIC_USERNAME);if(K!=null&&K.startsWith("Profile-")){console.log("Public username starts with 'Profile-', showing username prompt"),K&&g.setUsernameInput(""),g.setShowUsernamePrompt(!0);return}me(o,l,e);return}catch(O){console.error("Failed to decode token",O)}},pt=async k=>{if(!Array.from(k.target.files||[]).length)return;localStorage.removeItem("selectPhotosButtonTimestamp"),N(!1),await $.handleFileSelection(k,S)||x(!0)},ut=async()=>{if(console.log("Starting album registration"),_==="CannotBeSaved"&&!f){U();return}const k=await oe();if(!k){console.log("User not logged in, showing OTP login"),x(!0);return}if(!S)try{const K=JSON.parse(atob(k.split(".")[1]))["cognito:username"];B(K)}catch(X){console.error("Failed to decode token",X)}const O=localStorage.getItem(ie.PUBLIC_USERNAME);if(O!=null&&O.startsWith("Profile-")){console.log("Public username starts with 'Profile-', showing username prompt"),O&&g.setUsernameInput(""),g.setShowUsernamePrompt(!0);return}me(o,l,e)},ft=async()=>{if((_==="NotVisible"||_==="CannotBeSaved")&&!f){U();return}et(!ue),se.clear()},ht=async()=>{co(o,e,se)},mt=()=>{te.setShowingCopyLinkAlert(!1),ft()};a.useEffect(()=>{const k=localStorage.getItem("columns")||"1";w(k)},[]),a.useEffect(()=>{(async()=>{const O=await oe();if(O)try{const K=JSON.parse(atob(O.split(".")[1]))["cognito:username"];B(K);const ee=localStorage.getItem("selectPhotosButtonTimestamp");if(ee){const ne=parseInt(ee,10),de=(Date.now()-ne)/(1e3*60);N(de<10),de>=10&&localStorage.removeItem("selectPhotosButtonTimestamp")}else N(!1)}catch(X){console.error("Failed to decode token",X)}})()},[]),a.useEffect(()=>{e!=null&&e.folderName?document.title=e.folderName:document.title=o("Photos")},[e,n]),a.useEffect(()=>{var k;console.log("AlbumMediaGrid props changed:",{albumDataExists:!!e,mediaItemsCount:(k=e==null?void 0:e.mediaItems)==null?void 0:k.length,filteredMediaItemsCount:d==null?void 0:d.length,columns:u,shouldShowContent:j,shouldShowWatermark:A,isMediaFiltered:r})},[e,d,u,j,A,r]);const yt=()=>e&&e.creatorId&&e.contacts[e.creatorId]?e.contacts[e.creatorId]:o("the album owner"),ce=ge(n)==="rtl",Te=e?{...e,mediaItems:d}:null;return t.jsxs(t.Fragment,{children:[t.jsx(Xt,{}),t.jsx(Kt,{style:{padding:"12px 0"},children:t.jsxs(Gt,{style:{padding:"0 24px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[t.jsx(qt,{href:"https://6180.io",target:"_blank",rel:"noopener noreferrer","aria-label":o(S?"Visit Home":"Visit 6180.io"),children:t.jsxs(Ht,{$isRTL:ce,children:[t.jsx(Qt,{src:Je("images/logo_no_background.png"),alt:o("6180 Logo")}),t.jsx("span",{style:{marginLeft:ce?"0":"8px",marginRight:ce?"8px":"0",fontSize:"20px",fontWeight:"700"},children:o(S?"Home":"6180")})]})}),t.jsx("div",{style:{fontSize:"14px",fontStyle:"italic",color:"#666",textAlign:ce?"left":"right",transition:"opacity 0.8s ease-in-out, transform 0.8s ease-in-out",opacity:i?1:0,transform:i?"translateY(0)":"translateY(-1px)",willChange:"opacity, transform"},children:o(L[q])})]})}),t.jsxs(Zt,{$isRTL:ce,style:{paddingTop:"88px"},children:[t.jsx(Wo,{t:o,isSelectionMode:ue,selectedItems:se,shareSelectPhotos:ht,cancelSelection:nt,selectAll:rt,unselectAll:it,showingEnterPassword:W,promptForPassword:U,passwordPolicy:_,isAuthorized:f,saveAlbumDirectly:ut,handleCopyLink:()=>te.setShowingCopyLinkAlert(!0),albumData:e}),t.jsxs(Dt,{id:"media-container",style:{paddingTop:"12px",paddingBottom:"24px"},children:[t.jsx(fo,{showSelectPhotosButton:C,albumData:e,openFilePicker:dt,t:o}),H&&t.jsx("div",{style:{width:"100%",marginBottom:"16px"},children:t.jsx(jt,{progressTracker:Y,isRTL:ge(n)==="rtl",style:{marginTop:"16px"},showSuccessMessage:!0,showErrorMessage:!0})}),t.jsx(ho,{isSelectionMode:ue,t:o}),t.jsx(Bo,{albumData:e,t:o}),(e==null?void 0:e.mediaItems)&&e.mediaItems.length>0&&!Ae&&t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"16px"},children:[t.jsx(Ce,{style:{margin:"0"},children:o("Columns:")}),t.jsxs(Re,{value:u,onChange:k=>$e(k.target.value),children:[t.jsx("option",{value:"1",children:"1"}),t.jsx("option",{value:"2",children:"2"}),t.jsx("option",{value:"3",children:"3"}),t.jsx("option",{value:"4",children:"4"}),t.jsx("option",{value:"5",children:"5"})]})]}),(e==null?void 0:e.mediaItems)&&e.mediaItems.length>0&&Ae&&t.jsxs(eo,{style:{background:"rgba(248, 249, 250, 0.8)",border:"1px solid #e9ecef",borderRadius:"8px",padding:"16px",marginBottom:"16px",boxShadow:"0 1px 3px rgba(0, 0, 0, 0.1)"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"},children:[t.jsx(Ce,{style:{margin:"0"},children:o("Columns:")}),t.jsxs(Re,{value:u,onChange:k=>$e(k.target.value),children:[t.jsx("option",{value:"1",children:"1"}),t.jsx("option",{value:"2",children:"2"}),t.jsx("option",{value:"3",children:"3"}),t.jsx("option",{value:"4",children:"4"}),t.jsx("option",{value:"5",children:"5"})]})]}),t.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:"8px",flexWrap:"wrap"},children:[t.jsx(Ce,{style:{margin:"0",paddingTop:"6px",flexShrink:0},children:o("Filter by:")}),t.jsx("div",{style:{flex:1,minWidth:0},children:t.jsx(To,{mediaItems:e.mediaItems,onFilterChange:lt,resetFilter:at})})]})]}),t.jsx("div",{style:{marginTop:"16px"},children:t.jsx(zo,{isLoading:!1,error:null,albumData:Te,columns:u,shouldShowContent:j,shouldShowWatermark:A,isSelectionMode:ue,selectedItems:se,toggleItemSelection:tt,openFullscreenView:He,t:o})})]}),t.jsx(Fo,{isOpen:v,onClose:()=>{T(!1),F(null)},onSubmit:ct,error:M,t:o}),t.jsx(_o,{isOpen:b,onClose:()=>{x(!1)},onLoginSuccess:gt,ownerName:yt(),t:o}),t.jsx(qe,{onFileSelection:pt,ref:D}),Q!==null&&Te&&t.jsx(Ro,{item:Te.mediaItems[Q],index:Q,onClose:Qe,onPrev:Ze,onNext:()=>De(d.length),hasNext:Q<d.length-1,hasPrev:Q>0,showWatermark:A(),ownerName:(()=>{const k=d[Q].ownerContactId;if(!k)return"";if(e!=null&&e.contacts&&e.contacts[k])return e.contacts[k];const O=k.split("_____")[0]||"";return O===S?o("Me"):O})()}),t.jsx(At,{t:o,language:n,usernameManager:g,onSuccess:k=>{me(o,l,e)}}),t.jsx(ro,{isOpen:te.showingCopyLinkAlert,onClose:()=>te.setShowingCopyLinkAlert(!1),inviteLink:We(l,e==null?void 0:e.albumNanoId,e!=null&&e.creatorId&&(e!=null&&e.contacts)&&(e!=null&&e.contacts[e==null?void 0:e.creatorId])?e==null?void 0:e.contacts[e==null?void 0:e.creatorId]:"album",e==null?void 0:e.folderName),onCopy:te.handleCopy,onCreateSubAlbum:mt,showCreateSubAlbum:!0,t:o,isRTL:ge(n)==="rtl"}),t.jsx(io,{isOpen:te.showingCopiedLinkAlert,onClose:()=>te.setShowingCopiedLinkAlert(!1),t:o,isRTL:ge(n)==="rtl"})]})]})},Jo=()=>{const{t:e}=ae(),[l,c]=a.useState(null),[o,n]=a.useState(!0),[p,h]=a.useState(null),[m,g]=a.useState(null),[u,w]=a.useState(null),d=()=>{console.log("getParametersFromUrl called"),console.log("window.location.pathname:",window.location.pathname);const y=window.location.pathname.split("/").filter(Boolean);return console.log("pathSegments:",y),y.length>0&&y[0]==="app"?(console.log("Traditional app path detected, returning null"),null):y.length===2?(console.log("Found parameters:",y[1]),y[1]):(console.log("No valid path format found, returning null"),null)};return a.useEffect(()=>{(async()=>{console.log("initAlbum called");const r=d();if(console.log("Extracted parameters:",r),!r){console.log("No parameters found, setting error"),h(e("Valid parameters not found in URL")),n(!1);return}let s,b=!1;if(console.log('Checking if parameters contain "id=":',r.includes("id=")),r.includes("id=")){console.log('Parameters contain "id=", extracting identifier');const C=r.indexOf("id=");if(C!==-1)s=r.substring(C+3),b=!0,console.log('Extracted identifier after "id=":',s),console.log("Will use fetchFolderUsingTargetItemIdentifier");else{console.log('Failed to find "id=" in parameters'),h(e("Invalid id parameter format")),n(!1);return}}else s=r,b=!1,console.log("Using entire parameters as identifier:",s),console.log("Will use fetchFolderUsingAlbumNanoId");if(s.includes("-")){const C=s.split("-"),N=s;s=C[C.length-1],console.log('Identifier contained "-", stripped from:',N,"to:",s)}else console.log('Identifier does not contain "-", keeping as is:',s);let x;if(b){console.log("Calling fetchFolderUsingTargetItemIdentifier with identifier:",s);let C=s;C.length===32?(C=bt(C),console.log(C)):console.error("Invalid UUID format: must be 32 characters after removing dashes"),x=await lo(C,g)}else console.log("Calling fetchFolderUsingAlbumNanoId with identifier:",s),x=await ao(s,g);console.log("API call result:",x?"Success":"Failed"),x?(console.log("Full album data received:",x),console.log("Media items count:",x.mediaItems?x.mediaItems.length:"No mediaItems property"),console.log("Password policy:",x.passwordPolicy),console.log("Folder position ID:",x.folderPositionId),c(x),console.log("Album data set successfully")):(console.log("No data returned from API, setting error"),h(e("Album not found"))),n(!1),console.log("initAlbum completed")})()},[e]),a.useEffect(()=>{(async()=>{const r=await oe();if(r)try{const b=JSON.parse(atob(r.split(".")[1]))["cognito:username"];w(b)}catch(s){console.error("Failed to decode token",s)}})()},[]),o?t.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",fontSize:"18px"},children:e("Loading album...")}):p?t.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",fontSize:"18px",color:"#d32f2f"},children:p}):t.jsx(Yo,{albumData:l,folderId:m,cognitoUsername:u})},Vo=()=>t.jsx(vt,{children:t.jsx(Jo,{})});Ct.createRoot(document.getElementById("root")).render(t.jsx(Vo,{}));
