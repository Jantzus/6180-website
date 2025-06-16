import{t as Oe,v as Be,c as D,f as ae,S as Ne,w as ut,a as n,x as We,h as ze,y as oe,r as ve,j as t,d as H,u as ce,g as le,A as gt,b as Ye,C as Se,L as pe,q as ft,R as pt,I as ht,z as mt,p as xt,B as yt}from"./utils-C1FUk2iD.js";import{u as wt,U as It}from"./useFileUploadProcessor-DFxO8lXR.js";import{a as he}from"./types-B2_92tNb.js";import{C as St,a as Tt,d as bt}from"./fileOperations-D53GWVzG.js";import{u as Ct,U as vt}from"./useUsernameManagement-DM17QAPX.js";import{v as Pt,w as jt,N as kt,B as q,O as ne,W as me,x as $t,y as At,z as Je,D as Ve,F as Pe,f as je,E as Xe,I as Et,J as Lt,K as Nt,Q as Re,R as Rt,U as Ke,X as Mt,Y as Ft,M as ue,Z as _t,_ as Ut,$ as Ot,C as Bt,a0 as Wt,a1 as zt,a2 as Yt,a3 as Te,a4 as Jt,a5 as be,a6 as Vt,a7 as Xt,a8 as Kt,a9 as Gt,aa as Ht,ab as qt,ac as Qt,G as Zt,ad as Dt,ae as es,af as ts,ag as ss,ah as os,ai as ns,aj as rs}from"./styled-components-3YNZ6KsQ.js";import{C as is,S as ls,I as as,R as cs}from"./SignUpCommand-6aY3Hezn.js";import{F as ds}from"./FileInput-BqmuSSY5.js";import"./parseJsonBody-DDQ2PJJC.js";const xe=(e,r)=>{var x,A,$,b,J,V,X;console.log("🔄 processData called with raw JSON:",JSON.stringify(e,null,2));const u=((A=(x=e==null?void 0:e.data)==null?void 0:x.fetchRelations)==null?void 0:A.items)||[];console.log("📊 Items found:",u.length),console.log("📊 Items details:",JSON.stringify(u,null,2));const a=[],g={};let i="Photos",l,p,s="",h,y=!1,m=!1,w,f=!1;const c=new Set;if(u.length>0){const o=u[0];console.log("📁 Processing folder:",JSON.stringify(o,null,2)),r&&(o!=null&&o.id)&&(console.log("🆔 Setting folder ID:",o.id),r(o.id)),o!=null&&o.albumNanoId&&(l=o.albumNanoId,console.log("🏷️ Album nano ID found:",l)),o!=null&&o.folderName&&o.folderName.length>0&&(i=o.folderName,console.log("📝 Folder name found:",i)),o!=null&&o.creatorId&&o.creatorId.length>0&&(p=o.creatorId,console.log("👤 Creator ID found:",p)),o!=null&&o.folderDescription&&o.folderDescription.length>0&&(s=o.folderDescription,console.log("📄 Folder description found:",s)),o!=null&&o.folderPassword&&(console.log("🔐 Folder password object found:",JSON.stringify(o.folderPassword,null,2)),o.folderPassword.policy&&(h=o.folderPassword.policy,console.log("🔒 Password policy:",h),y=h!=="NoPassword",console.log("🔑 Password required:",y)),o.folderPassword.password&&h!=="NoPassword"&&(m=!0,w=o.folderPassword.password,console.log("🗝️ Actual password found (length):",w.length))),o!=null&&o.folderInviteParameters&&(console.log("📨 Folder invite parameters found:",JSON.stringify(o.folderInviteParameters,null,2)),f=!!o.folderInviteParameters.usingFolderInviteGrantsRightToAddItems,console.log("➕ Using folder invite grants right to add items:",f));const N=((b=($=u[0])==null?void 0:$.contactsUsingInvite)==null?void 0:b.items)||[];console.log("👥 Processing contacts:",N.length),N.forEach((F,Y)=>{var z;console.log(`👤 Contact ${Y}:`,JSON.stringify(F,null,2)),F!=null&&F.id&&((z=F==null?void 0:F.item)!=null&&z.publicDisplayName)&&(g[F.id]=F.item.publicDisplayName,console.log(`✅ Added contact: ${F.id} -> ${F.item.publicDisplayName}`))});const E=((J=o==null?void 0:o.fileReferencesPage)==null?void 0:J.items)||[];console.log("📸 Processing file references:",E.length),E.forEach((F,Y)=>{var j,M,B;console.log(`📄 File reference ${Y}:`,JSON.stringify(F,null,2));const z=F==null?void 0:F.file;if(!(z!=null&&z.dataKey)){console.log(`❌ Skipping file reference ${Y} - no dataKey`);return}const{id:d,dataKey:v,thumbnailDataKey:C,durationInSeconds:I,ownerContactId:O}=z;if(console.log(`📂 Processing file: ID=${d}, dataKey=${v}, thumbnailDataKey=${C}, duration=${I}, owner=${O}`),c.has(v)){console.log(`⚠️ Duplicate dataKey found, skipping: ${v}`);return}c.add(v),console.log(`🔍 Raw selectedTags for file ${d}:`,F.selectedTags);const U=((j=F.selectedTags)==null?void 0:j.map(k=>{var Z;return{TagType:k.TagType,tagTitle:k.tagTitle,subtags:((Z=k.subtags)==null?void 0:Z.map(Q=>({TagType:Q.TagType,tagTitle:Q.tagTitle,subtagTitle:Q.subtagTitle})))||[]}}))||[];console.log(`🏷️ Processed selectedTags for file ${d}:`,U),console.log("📊 Number of tags:",U.length);const R=`${Ne}${v}`,S=C?`${Ne}${C}`:void 0;if(v.startsWith("Input/Image/")){const k={type:"image",fileId:d,url:R,thumbnailUrl:S||R,ownerContactId:O,loaded:!1,selectedTags:U};console.log("🖼️ Complete image item with tags:",{fileId:k.fileId,type:k.type,tagCount:((M=k.selectedTags)==null?void 0:M.length)||0,tags:k.selectedTags}),a.push(k),console.log("✅ Successfully added image item to mediaItems array")}else if(v.startsWith("Input/Video/")){const k={type:"video",fileId:d,url:R,thumbnailUrl:S||R,duration:ut(I),ownerContactId:O,loaded:!1,selectedTags:U};console.log("🎥 Complete video item with tags:",{fileId:k.fileId,type:k.type,tagCount:((B=k.selectedTags)==null?void 0:B.length)||0,tags:k.selectedTags}),a.push(k),console.log("✅ Successfully added video item to mediaItems array")}else console.log(`❓ Unknown file type for dataKey: ${v}`)})}else console.log("❌ No items found in API response");const P={mediaItems:a,folderName:i,albumNanoId:l,creatorId:p,folderDescription:s,contacts:g,passwordPolicy:h,passwordRequired:y,hasPassword:m,actualPassword:w,usingFolderInviteGrantsRightToAddItems:f};return console.log("✅ processData final result summary:",{mediaItemsCount:P.mediaItems.length,mediaItemsWithTags:P.mediaItems.filter(o=>o.selectedTags&&o.selectedTags.length>0).length,firstItemTags:((X=(V=P.mediaItems[0])==null?void 0:V.selectedTags)==null?void 0:X.length)||0,totalTagsAcrossAllItems:P.mediaItems.reduce((o,N)=>{var E;return o+(((E=N.selectedTags)==null?void 0:E.length)||0)},0)}),P.mediaItems.slice(0,3).forEach((o,N)=>{var E,F;console.log(`📋 Item ${N} tags:`,{fileId:o.fileId,tagCount:((E=o.selectedTags)==null?void 0:E.length)||0,tags:((F=o.selectedTags)==null?void 0:F.map(Y=>`${Y.tagTitle}(${Y.subtags.length})`))||[]})}),console.log("✅ processData final result:",JSON.stringify(P,null,2)),P},us=async(e,r)=>{var u,a,g,i;console.log("🔍 fetchFolderUsingTargetItemIdentifier called with:",e);try{const p={fetchRelationsInput:{targetItemIdentifier____RelationType:`${e}____Folder`,index:"targetItemIdentifier____RelationType",limit:1,scanIndexForward:!1,nextToken:null}};console.log("📤 Query variables:",JSON.stringify(p,null,2)),console.log("🌐 Making public API call...");const s=fetch(Oe,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":Be},body:JSON.stringify({query:he,variables:p})}).then(f=>f.json());console.log("🔒 Checking private API availability...");const h=(async()=>{const f=await D();return console.log("🎫 Token available:",!!f),f?(console.log("🌐 Making private API call..."),fetch(ae,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${f}`},body:JSON.stringify({query:he,variables:p})}).then(c=>c.json())):(console.log("❌ No token - skipping private API"),null)})();console.log("⏳ Waiting for public API response...");const y=await s;console.log("📥 Public API raw response:",JSON.stringify(y,null,2));let m=xe(y,r);console.log("🔄 Processed public data:",JSON.stringify(m,null,2)),console.log("⏳ Waiting for private API response...");const w=await h;if(w){console.log("📥 Private API raw response:",JSON.stringify(w,null,2));const f=(i=(g=(a=(u=w==null?void 0:w.data)==null?void 0:u.fetchRelations)==null?void 0:a.items)==null?void 0:g[0])==null?void 0:i.folderPosition;if(console.log("📍 Folder position found:",!!f),console.log("📍 Folder position details:",JSON.stringify(f,null,2)),f){const c=xe(w,r);console.log("🔄 Processed private data (before enhancement):",JSON.stringify(c,null,2)),c.folderPositionId=f==null?void 0:f.id,c.profileIds=f==null?void 0:f.profileIds,console.log("🔄 Enhanced private data:",JSON.stringify(c,null,2)),m=c}else console.log("❌ No folder position in private API response")}else console.log("❌ No private API response (user not logged in or API failed)");return console.log("✅ Final return data:",JSON.stringify(m,null,2)),m}catch(l){return console.error("💥 Error in fetchFolderUsingTargetItemIdentifier:",l),null}},gs=async(e,r)=>{var u,a,g,i;try{const p={fetchRelationsInput:{albumNanoId:e,index:"albumNanoId",limit:1,scanIndexForward:!1,nextToken:null}},s=fetch(Oe,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":Be},body:JSON.stringify({query:he,variables:p})}).then(f=>f.json()),h=(async()=>{const f=await D();return f?fetch(ae,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${f}`},body:JSON.stringify({query:he,variables:p})}).then(c=>c.json()):null})(),y=await s;let m=xe(y,r);const w=await h;if(w){const f=(i=(g=(a=(u=w==null?void 0:w.data)==null?void 0:u.fetchRelations)==null?void 0:a.items)==null?void 0:g[0])==null?void 0:i.folderPosition;if(f){const c=xe(w,r);c.folderPositionId=f==null?void 0:f.id,c.profileIds=f==null?void 0:f.profileIds,m=c}}return m}catch(l){return console.error("Error fetching folder data:",l),null}},ge=async(e,r,u)=>{console.log("Starting album registration");const a=document.createElement("div");a.style.position="fixed",a.style.top="0",a.style.left="0",a.style.width="100%",a.style.height="100%",a.style.backgroundColor="rgba(0, 0, 0, 0.5)",a.style.display="flex",a.style.justifyContent="center",a.style.alignItems="center",a.style.zIndex="2000";const g=document.createElement("div");g.style.backgroundColor="white",g.style.padding="30px",g.style.borderRadius="8px",g.style.textAlign="center";const i=document.createElement("p");i.id="saveProgressText",i.textContent=e("Registering album...");const l=document.createElement("div");l.style.backgroundColor="#f0f0f0",l.style.borderRadius="4px",l.style.overflow="hidden",l.style.height="8px",l.style.marginTop="10px";const p=document.createElement("div");p.id="saveProgress",p.style.backgroundColor="#4caf50",p.style.height="100%",p.style.width="5%",p.style.transition="width 0.3s ease";const s=document.createElement("p");s.id="saveErrorText",s.style.color="#f44336",s.style.display="none",s.style.marginTop="10px",s.style.fontSize="14px",l.appendChild(p),g.appendChild(i),g.appendChild(l),g.appendChild(s),a.appendChild(g),document.body.appendChild(a);try{const h=await ze();if(!h){console.error("No token available for registering album"),document.body.removeChild(a);return}if(!JSON.parse(atob(h.split(".")[1]))["cognito:username"]){console.error("Missing username in token"),oe(s,"Could not retrieve username from token",i,p);return}if(!r){console.error("No folder ID available"),oe(s,"Folder ID is missing",i,p);return}if(!u||!u.mediaItems){console.error("No album data available"),oe(s,"Album data is missing or incomplete",i,p);return}if(u.mediaItems.length===0){console.error("No media items to save"),oe(s,"No media items in album to save",i,p);return}const w=Math.floor(Date.now()/1e3);fe(30,i,p,e("Preparing album data..."));const f={currentTime:w,folderId:r,profileIds:["Only Me_____Only Me____Profile"],folderPositionSelectedTagInputs:[],folderPositionPoints:1};console.log("Folder position input:",f),fe(50,i,p,e("Saving album..."));const c=`
      mutation SaveAlbum(
        $folderPositionInputs: [FolderPositionInput!]
      ) {
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items { id }
        }
      }
    `,P={folderPositionInputs:[f]};console.log("GraphQL mutation variables:",JSON.stringify(P));try{const x=await fetch(ae,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${h}`},body:JSON.stringify({query:c,variables:P})});if(fe(80,i,p,e("Almost there...")),!x.ok)throw new Error(`HTTP error: ${x.status} ${x.statusText}`);const A=await x.text();let $;try{$=JSON.parse(A),console.log("API response:",$)}catch(b){const J=b instanceof Error?b.message:"Unknown JSON parse error";throw new Error(`Invalid JSON response: ${J}`)}if($.errors&&$.errors.length>0){const b=$.errors.map(J=>(console.error("GraphQL error:",J),J.message||"Unknown GraphQL error")).join("; ");throw new Error(`GraphQL errors: ${b}`)}console.log("Album registered successfully"),fe(100,i,p,e("Album registered successfully!")),sessionStorage.setItem("album_just_saved","true"),setTimeout(()=>{document.body.removeChild(a),ve("my-albums.html")},2e3)}catch(x){const A=x instanceof Error?x.message:"Unknown API error";console.error("Error in API request:",x),oe(s,A,i,p)}}catch(h){const y=h instanceof Error?h.message:"Unknown error";console.error("Error registering album:",h),oe(s,y,i,p)}},fe=(e,r,u,a)=>{u.style.width=`${e}%`,a&&(r.textContent=a)},fs=()=>{const[e,r]=n.useState(void 0),[u,a]=n.useState(!1),[g,i]=n.useState(!1),[l,p]=n.useState(null),[s,h]=n.useState(!1),y=n.useCallback(()=>!e||u||e==="NoPassword"?!0:e==="NotVisible"?(l&&console.error("Password error:",l),!1):!0,[e,u,l]),m=n.useCallback(()=>{const c=(l==null?void 0:l.toLowerCase().includes("watermark"))??!1;return!u&&e==="Watermark"||c},[u,e,l]),w=n.useCallback(()=>!u&&e!==void 0&&e!=="NoPassword",[u,e]),f=n.useCallback(()=>{p(null),i(!0)},[]);return{passwordPolicy:e,setPasswordPolicy:r,isAuthorized:u,setIsAuthorized:a,showPasswordModal:g,setShowPasswordModal:i,passwordError:l,setPasswordError:p,passwordVerified:s,setPasswordVerified:h,shouldShowContent:y,shouldShowWatermark:m,showingEnterPassword:w,promptForPassword:f}},ps=()=>{const[e,r]=n.useState(!1),[u,a]=n.useState(new Set),g=n.useCallback((l,p)=>{p.stopPropagation(),a(s=>{const h=new Set(s);return h.has(l)?h.delete(l):h.add(l),h})},[]),i=n.useCallback(()=>{r(!1),a(new Set)},[]);return{isSelectionMode:e,setIsSelectionMode:r,selectedItems:u,setSelectedItems:a,toggleItemSelection:g,cancelSelection:i}},hs=(e,r,u,a)=>{const[g,i]=n.useState(!1),[l,p]=n.useState(!1),[s,h]=n.useState(!1),[y,m]=n.useState([]);n.useEffect(()=>{if(e&&e.profileIds&&u){const c=`${u}_____Public____Profile`;m(e.profileIds),h(e.profileIds.includes(c))}},[e,u]);const w=n.useCallback(()=>{const c=We(r,e==null?void 0:e.albumNanoId,(e==null?void 0:e.creatorId)&&(e==null?void 0:e.contacts)&&(e==null?void 0:e.contacts[e==null?void 0:e.creatorId]),e==null?void 0:e.folderName);navigator.clipboard.writeText(c).then(()=>{i(!1),p(!0)}).catch(P=>{console.error("Failed to copy link:",P),alert(a("Failed to copy link"))})},[r,a]),f=n.useCallback(async()=>{var c,P,x;if(!u||!r){alert(a("You must be logged in to perform this action"));return}try{const A=await ze();if(!A){console.error("Authentication failed");return}const $=`${u}_____Public____Profile`,b=[...y];if(s){const E=b.indexOf($);E>-1&&b.splice(E,1)}else b.push($);const X=await(await fetch(ae,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${A}`},body:JSON.stringify({query:`
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
      `,variables:{folderPositionChangeProfileIdsInput:{folderId:r,profileIds:b}}})})).json();if(X.errors)throw new Error(((c=X.errors[0])==null?void 0:c.message)||"Unknown error");const N=(((x=(P=X==null?void 0:X.data)==null?void 0:P.changeFiles)==null?void 0:x.items)||[]).find(E=>E.folderPositionId===(e==null?void 0:e.folderPositionId));N&&N.profileIds&&(m(N.profileIds),h(N.profileIds.includes($)),console.log("Album visibility updated successfully"))}catch(A){console.error("Failed to toggle album visibility:",A),alert(a("Failed to update album visibility. Please try again."))}},[u,r,y,s,e,a]);return{showingCopyLinkAlert:g,setShowingCopyLinkAlert:i,showingCopiedLinkAlert:l,setShowingCopiedLinkAlert:p,isOnPublicProfile:s,handleCopy:w,handlePublicProfileToggle:f}},ms=({showSelectPhotosButton:e,albumData:r,openFilePicker:u,t:a})=>!e||!(r!=null&&r.usingFolderInviteGrantsRightToAddItems)?null:t.jsx("div",{style:{width:"100%",display:"flex",justifyContent:"center",marginBottom:"20px",marginTop:"10px"},children:t.jsx("button",{onClick:u,style:{backgroundColor:"#007bff",color:"white",border:"none",borderRadius:"6px",padding:"12px 20px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"8px",fontSize:"16px",boxShadow:"0 2px 4px rgba(0,0,0,0.1)"},children:t.jsx("span",{children:a("Select Photos To Add To Album")})})}),xs=({isSelectionMode:e,t:r})=>e?t.jsx(Pt,{children:t.jsx("p",{children:r("Select photos and videos to share")})}):null,ys=H.div`
  width: 100%;
  margin-top: 12px;
  margin-bottom: 16px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  direction: ${e=>e.$isRTL?"rtl":"ltr"};
  
  @media (max-width: 768px) {
    margin-top: 8px;    /* Reduced from 20px */
    padding: 16px;
  }
  
  @media (max-width: 480px) {
    margin-top: 4px;    /* Reduced from 24px */
    margin-bottom: 12px; /* Reduced from 16px */
    padding: 12px;
    border-radius: 8px;
  }
`,Me=H.div`
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 8px;
  }
`,Fe=H.div`
  display: flex;
  flex-direction: ${e=>e.$isRTL?"row-reverse":"row"};
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
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
    gap: 8px;
    padding-bottom: 6px;
  }
`,ws=H.button`
  padding: 6px 12px;
  border: 1px solid ${e=>e.$isDisplayed?"#28a745":e.$isSelected?"#007bff":"#ced4da"};
  border-radius: 16px;
  background: ${e=>e.$isDisplayed?"#28a745":e.$isSelected?"#007bff":"#ffffff"};
  color: ${e=>e.$isDisplayed||e.$isSelected?"#ffffff":"#495057"};
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
  height: 40px;
  display: flex;
  align-items: center;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background: ${e=>e.$isDisplayed?"#1e7e34":e.$isSelected?"#0056b3":"#e9ecef"};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 12px;
    height: 36px;
    max-width: 250px;
    border-radius: 12px;
  }
`,Is=H.button`
  padding: 4px 8px;
  border: 1px solid ${e=>e.$isSelected?"#007bff":"#ced4da"};
  border-radius: 12px;
  background: ${e=>e.$isSelected?"#007bff":"#ffffff"};
  color: ${e=>e.$isSelected?"#ffffff":"#495057"};
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    background: ${e=>e.$isSelected?"#0056b3":"#e9ecef"};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  @media (max-width: 480px) {
    padding: 4px 6px;
    font-size: 11px;
    border-radius: 8px;
  }
`,Ss=H.div`
  margin-top: 8px;
  font-size: 13px;
  color: #555;
  font-style: italic;
  text-align: ${e=>e.$isRTL?"right":"left"};
`,Ts=H.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 8px 0;
`,bs=H.button`
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
  height: 40px;
  display: flex;
  align-items: center;

  &:hover {
    background: #dc3545;
    color: #ffffff;
    transform: translateY(-1px);
  }
  
  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 12px;
    height: 36px;
    border-radius: 12px;
  }
`,Cs=({mediaItems:e,onFilterChange:r,resetFilter:u})=>{var N,E,F,Y,z;const{t:a,language:g}=ce(),i=le(g)==="rtl";console.log("🎯 EnhancedMediaTagsFilter received props:",{mediaItemsCount:e.length,mediaItemsWithTags:e.filter(d=>d.selectedTags&&d.selectedTags.length>0).length,firstItemHasTags:!!((N=e[0])!=null&&N.selectedTags),firstItemTagCount:((F=(E=e[0])==null?void 0:E.selectedTags)==null?void 0:F.length)||0,sampleTags:((z=(Y=e[0])==null?void 0:Y.selectedTags)==null?void 0:z.slice(0,2))||[]}),e.slice(0,3).forEach((d,v)=>{var C,I;console.log(`🎯 Filter received item ${v}:`,{fileId:d.fileId,hasSelectedTags:!!d.selectedTags,tagCount:((C=d.selectedTags)==null?void 0:C.length)||0,tags:((I=d.selectedTags)==null?void 0:I.map(O=>{var U;return`${O.tagTitle}(${((U=O.subtags)==null?void 0:U.length)||0})`}))||[]})});const[l,p]=n.useState([]),[s,h]=n.useState([]),[y,m]=n.useState(null),[w,f]=n.useState([]),c=d=>d.subtags.filter(v=>s.includes(v.key)),P=d=>{const v=c(d);if(v.length===0)return`${d.tagTitle} (${d.count})`;const C=v.map(I=>`${I.subtagTitle} (${I.count})`).join(", ");return`${d.tagTitle} (${C})`};n.useEffect(()=>{console.log("🏷️ EnhancedMediaTagsFilter: Starting tag extraction from mediaItems:",e.length);const d=new Map;e.forEach((C,I)=>{var O,U;console.log(`🏷️ Processing mediaItem ${I}:`,{fileId:C.fileId,hasSelectedTags:!!C.selectedTags,selectedTagsLength:((O=C.selectedTags)==null?void 0:O.length)||0}),(U=C.selectedTags)==null||U.forEach((R,S)=>{var B;console.log(`  🏷️ Processing tag ${S}:`,R);const j=`${R.TagType}-${R.tagTitle}`;d.has(j)||(d.set(j,{tag:{key:j,TagType:R.TagType,tagTitle:R.tagTitle,count:0,subtags:[]},count:0}),console.log(`    ✅ Created new tag: ${j}`));const M=d.get(j);M.count++,M.tag.count=M.count,console.log(`    📊 Updated tag count: ${j} = ${M.count}`),(B=R.subtags)==null||B.forEach((k,Z)=>{console.log(`    🏷️ Processing subtag ${Z}:`,k);const Q=`${k.TagType}-${k.tagTitle}-${k.subtagTitle}`,de=M.tag,re=de.subtags.find(ye=>ye.key===Q);re?(re.count++,console.log(`      📊 Updated subtag count: ${Q} = ${re.count}`)):(de.subtags.push({key:Q,TagType:k.TagType,tagTitle:k.tagTitle,subtagTitle:k.subtagTitle,count:1}),console.log(`      ✅ Created new subtag: ${Q}`))})})});const v=Array.from(d.values()).sort((C,I)=>I.count-C.count).map(C=>(C.tag.subtags.sort((I,O)=>O.count-I.count),C.tag));console.log("🏷️ Final tags array:",{totalTags:v.length,tags:v.map(C=>({key:C.key,title:C.tagTitle,count:C.count,subtagsCount:C.subtags.length}))}),p(v),f(v)},[e]);const x=d=>{if(d.length===0){u(),f(l);return}const v=e.filter(C=>{var O;const I=new Set;return(O=C.selectedTags)==null||O.forEach(U=>{var R;I.add(`${U.TagType}-${U.tagTitle}`),(R=U.subtags)==null||R.forEach(S=>{I.add(`${S.TagType}-${S.tagTitle}-${S.subtagTitle}`)})}),d.every(U=>I.has(U))});J(v),r(v)},A=d=>{const v=s.includes(d.key),C=y===d.key;if(v){if(v&&!C)m(d.key);else if(v&&C){const I=s.filter(O=>O!==d.key&&!d.subtags.some(U=>U.key===O));h(I),m(null),x(I)}}else{const I=[...s,d.key];h(I),m(d.key),x(I)}},$=d=>{const v=s.includes(d.key);let C;v?C=s.filter(I=>I!==d.key):C=[...s,d.key],h(C),x(C)},b=()=>{h([]),m(null),u(),f(l)},J=d=>{const v=new Set;d.forEach(I=>{var O;(O=I.selectedTags)==null||O.forEach(U=>{v.add(`${U.TagType}-${U.tagTitle}`)})}),s.forEach(I=>{I.includes("-",I.indexOf("-")+1)||v.add(I)});const C=l.filter(I=>v.has(I.key));f(C)},V=y?l.find(d=>d.key===y):null,X=s.length,o=l.length>0;return console.log("🎯 EnhancedMediaTagsFilter render decision:",{allTagsLength:l.length,hasTags:o,willRender:o}),o?(console.log("✅ EnhancedMediaTagsFilter: Rendering with tags"),t.jsxs(ys,{$isRTL:i,children:[t.jsx(Me,{children:t.jsxs(Fe,{$isRTL:i,children:[X>0&&t.jsx(bs,{onClick:b,children:a("Clear All")}),w.length>0?w.map(d=>{const v=c(d),C=v.length>0?`${d.TagType}: ${d.tagTitle} (${v.map(I=>I.subtagTitle).join(", ")})`:`Click to add/remove: ${d.TagType}: ${d.tagTitle}`;return t.jsx(ws,{$isSelected:s.includes(d.key),$isDisplayed:y===d.key,onClick:()=>A(d),title:C,children:P(d)},d.key)}):t.jsx(Ts,{children:a("No tags available")})]})}),V&&V.subtags.length>0&&t.jsx(Me,{children:t.jsx(Fe,{$isRTL:i,children:V.subtags.map(d=>t.jsxs(Is,{$isSelected:s.includes(d.key),onClick:()=>$(d),title:`Click to add/remove: ${d.TagType}: ${d.tagTitle} → ${d.subtagTitle}`,children:[d.subtagTitle," (",d.count,")"]},d.key))})}),X>0&&t.jsx(Ss,{$isRTL:i,children:a("Showing photos with all selected tags")})]})):(console.log("❌ EnhancedMediaTagsFilter: No tags found, returning null"),null)},vs=H.div`
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
  position: relative;
`,Ps=H.div`
  padding: 15px;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  z-index: 10;
  position: relative;
`,js=H.button`
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
`,ks=H.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 10px;
  position: relative;
  touch-action: none; /* Prevent default touch behaviors */
`,$s=H.div`
  transform: scale(${e=>e.$scale}) translate(${e=>e.$translateX}px, ${e=>e.$translateY}px);
  transition: transform 0.1s ease-out;
  transform-origin: center center;
  will-change: transform;
`,_e=H.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  max-height: 100%;
`,As=H.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  opacity: ${e=>e.$isLoaded?1:0};
  transition: opacity 0.3s ease;
  user-select: none;
  pointer-events: none;
`,Es=H.img`
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
`,Ls=H.video`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  user-select: none;
`,Ns=H.div`
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
`,Rs=({item:e,index:r,onClose:u,onPrev:a,onNext:g,hasNext:i,hasPrev:l,ownerName:p,showWatermark:s=!1})=>{const[h,y]=n.useState(!1),[m,w]=n.useState(!0),{t:f}=ce(),[c,P]=n.useState(1),[x,A]=n.useState(0),[$,b]=n.useState(0),[J,V]=n.useState(!1),X=n.useRef(null),o=n.useRef(null),N=n.useRef(0),E=n.useRef(!1),F=.5,Y=4,z=300;n.useEffect(()=>{P(1),A(0),b(0),y(!1),w(!0)},[e.url]);const d=n.useCallback(()=>{V(!0),setTimeout(()=>V(!1),1500)},[]),v=n.useCallback((R,S,j)=>{if(!X.current)return{x:R,y:S};const M=X.current.getBoundingClientRect(),B=Math.max(0,M.width*(j-1)/2),k=Math.max(0,M.height*(j-1)/2);return{x:Math.max(-B,Math.min(B,R)),y:Math.max(-k,Math.min(k,S))}},[]);n.useEffect(()=>{const R=S=>{S.key==="Escape"?u():S.key==="ArrowLeft"&&l&&c<=1?a():S.key==="ArrowRight"&&i&&c<=1&&g()};return window.addEventListener("keydown",R),()=>window.removeEventListener("keydown",R)},[u,g,a,i,l,c]);const C=(R,S)=>{const j=R.clientX-S.clientX,M=R.clientY-S.clientY;return Math.sqrt(j*j+M*M)},I=R=>{R.preventDefault();const S=R.touches,j=Date.now();if(S.length===1){const M=S[0];if(j-N.current<z){c>1?(P(1),A(0),b(0)):(P(2),A(0),b(0),d()),N.current=0;return}N.current=j,o.current={startX:M.clientX,startY:M.clientY,lastX:M.clientX,lastY:M.clientY,startDistance:0,startScale:c,startTranslateX:x,startTranslateY:$}}else if(S.length===2){const M=C(S[0],S[1]),B=(S[0].clientX+S[1].clientX)/2,k=(S[0].clientY+S[1].clientY)/2;o.current={startX:B,startY:k,lastX:B,lastY:k,startDistance:M,startScale:c,startTranslateX:x,startTranslateY:$},E.current=!0}},O=R=>{if(R.preventDefault(),!o.current)return;const S=R.touches;if(S.length===1&&c>1){const j=S[0],M=j.clientX-o.current.lastX,B=j.clientY-o.current.lastY,k=x+M/c,Z=$+B/c,Q=v(k,Z,c);A(Q.x),b(Q.y),o.current.lastX=j.clientX,o.current.lastY=j.clientY,E.current=!0}else if(S.length===2){const M=C(S[0],S[1])/o.current.startDistance,B=Math.max(F,Math.min(Y,o.current.startScale*M));if(P(B),B<=1)A(0),b(0);else{const k=v(o.current.startTranslateX,o.current.startTranslateY,B);A(k.x),b(k.y)}B>1.1&&d(),E.current=!0}},U=R=>{if(!o.current)return;const S=R.touches;if(S.length===0&&!E.current&&c<=1){const j=o.current.lastX-o.current.startX,M=o.current.lastY-o.current.startY;Math.sqrt(j*j+M*M)>50&&Math.abs(j)>Math.abs(M)*2&&(j>0&&l?a():j<0&&i&&g())}if(S.length===0)o.current=null,E.current=!1;else if(S.length===1&&o.current){const j=S[0];o.current.lastX=j.clientX,o.current.lastY=j.clientY,E.current=!1}};return t.jsxs(jt,{children:[t.jsxs(vs,{children:[t.jsx(js,{onClick:u,children:"✕"}),t.jsxs(kt,{children:[t.jsx(q,{onClick:l?a:void 0,disabled:!l||c>1,$isDisabled:!l||c>1,children:"←"}),t.jsx(q,{onClick:i?g:void 0,disabled:!i||c>1,$isDisabled:!i||c>1,children:"→"})]})]}),t.jsxs(Ns,{$visible:J,children:[Math.round(c*100),"%"]}),t.jsxs(ks,{ref:X,onTouchStart:I,onTouchMove:O,onTouchEnd:U,children:[t.jsx($s,{$scale:c,$translateX:x,$translateY:$,children:e.type==="image"?t.jsxs(_e,{children:[t.jsx(As,{src:e.url,alt:`Image ${r+1}`,$isLoaded:h,onLoad:()=>{y(!0),w(!1)},draggable:!1}),s&&t.jsx(ne,{$type:"watermark",children:t.jsx(me,{children:"6180 Watermarked"})}),!h&&e.thumbnailUrl&&t.jsx(Es,{src:e.thumbnailUrl,alt:`Thumbnail ${r+1}`,draggable:!1})]}):t.jsxs(_e,{children:[t.jsxs(Ls,{controls:!0,autoPlay:!0,onLoadedData:()=>w(!1),children:[t.jsx("source",{src:e.url,type:"video/mp4"}),f("Your browser does not support the video tag.")]}),s&&t.jsx(ne,{$type:"watermark",children:t.jsx(me,{children:"6180 Watermarked"})})]})}),m&&t.jsx($t,{children:e.type==="image"?f("Loading full resolution..."):f("Loading video...")})]}),t.jsx(Ps,{children:e.ownerContactId&&p&&t.jsxs(At,{href:`https://6180.io/${p}`,children:[t.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[t.jsx("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),t.jsx("circle",{cx:"12",cy:"7",r:"4"})]}),p]})})]})},Ms=({isOpen:e,onClose:r,onSubmit:u,error:a,t:g})=>{const[i,l]=n.useState(""),[p,s]=n.useState(!1);if(!e)return null;const h=y=>{y.preventDefault(),s(!0),u(i),s(!1)};return t.jsx(Je,{children:t.jsxs(Ve,{style:{maxWidth:"400px",textAlign:"center",padding:"32px"},children:[t.jsx("h3",{style:{margin:"0 0 24px 0"},children:g("Enter Password")}),t.jsxs("form",{onSubmit:h,style:{width:"100%"},children:[t.jsxs(Pe,{children:[t.jsx(je,{type:"password",value:i,onChange:y=>l(y.target.value),placeholder:g("Password"),style:{border:a?"1px solid #d32f2f":void 0,padding:"12px",width:"100%",boxSizing:"border-box"},required:!0}),a&&t.jsx("div",{style:{color:"#d32f2f",fontSize:"14px",marginTop:"8px",textAlign:"left"},children:a})]}),t.jsxs("div",{style:{display:"flex",gap:"12px",width:"100%"},children:[t.jsx(q,{type:"button",onClick:r,style:{backgroundColor:"#f3f4f6",color:"#333",flex:1},children:g("Cancel")}),t.jsx(q,{type:"submit",$primary:!0,disabled:p||!i,style:{flex:1},children:g(p?"Submitting...":"Submit")})]})]}),t.jsx(Xe,{children:g("Two-Factor Authentication")})]})})},Ce=new is({region:gt});function Ue(e){const r=e.trim().toLowerCase(),u="@gmail.com";return r.endsWith(u)?`${r.slice(0,-u.length).replace(/\./g,"")}${u}`:r}const Fs=({isOpen:e,onClose:r,onLoginSuccess:u,ownerName:a="the album owner",t:g})=>{const[i,l]=n.useState(""),[p,s]=n.useState(!1),[h,y]=n.useState(""),[m,w]=n.useState(""),[f,c]=n.useState("idle"),[P,x]=n.useState(""),A=n.useRef(null),$=n.useRef(null);n.useEffect(()=>{p&&$.current&&$.current.focus()},[p]),n.useEffect(()=>{e&&A.current&&!p&&A.current.focus()},[e,p]);function b(o){const N=o.target.value;/^\d*$/.test(N)&&N.length<=6&&y(N)}async function J(){var N;c("sending"),x("");const o=Ue(i);if(!o||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o)){c("error"),x(g("Please enter a valid email address"));return}try{const E=new ls({ClientId:Se,Username:o,Password:crypto.randomUUID(),UserAttributes:[{Name:"email",Value:o}]});try{await Ce.send(E)}catch(z){if(!((N=z.name)!=null&&N.includes("UsernameExistsException")))throw z}const F=new as({ClientId:Se,AuthFlow:"CUSTOM_AUTH",AuthParameters:{USERNAME:o}}),Y=await Ce.send(F);if(Y.Session)w(Y.Session),s(!0),c("idle");else throw new Error("No session returned from InitiateAuth")}catch(E){console.error(E),c("error"),x(g("Unable to send verification code. Please try again later."))}}async function V(){var N,E,F,Y,z,d;c("verifying"),x("");const o=Ue(i);try{const v=new cs({ClientId:Se,ChallengeName:"CUSTOM_CHALLENGE",ChallengeResponses:{USERNAME:o,ANSWER:h},Session:m}),I=(N=(await Ce.send(v)).AuthenticationResult)==null?void 0:N.IdToken;if(!I)throw new Error("No token received");localStorage.setItem("idToken",I);const R=`${JSON.parse(atob(I.split(".")[1]))["cognito:username"]}_____Public____Profile`,j=await(await fetch(ae,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${I}`},body:JSON.stringify({query:`
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
          `,variables:{relationIds:[R]}})})).json(),M=(d=(z=(Y=(F=(E=j==null?void 0:j.data)==null?void 0:E.batchGetItems)==null?void 0:F.items)==null?void 0:Y[0])==null?void 0:z.item)==null?void 0:d.anyDisplayName;M&&localStorage.setItem(pe.PUBLIC_USERNAME,M),c("idle"),u(),r()}catch(v){console.error(v),c("error"),x(g("Invalid or expired verification code. Please try again or request a new code."))}}function X(){s(!1),y(""),c("idle")}return e?t.jsx(Je,{children:t.jsxs(Ve,{style:{maxWidth:"400px",textAlign:"center",padding:"32px"},children:[t.jsx("img",{src:Ye("images/logo_no_background.png"),alt:"6180 Logo",style:{height:"60px",marginBottom:"24px"}}),t.jsx("h3",{style:{margin:"0 0 24px 0",lineHeight:"1.6"},children:g("{ownerName} only shared this album with friends and family").replace("{ownerName}",a)}),P&&t.jsx("div",{style:{backgroundColor:"#f8d7da",color:"#721c24",padding:"12px",borderRadius:"8px",marginBottom:"16px",fontSize:"14px",textAlign:"left"},children:P}),p?t.jsxs("form",{style:{width:"100%"},children:[t.jsxs("p",{style:{marginBottom:"16px",color:"#555",textAlign:"left"},children:[g("Check your email for a 6-digit verification code sent to")," ",t.jsx("strong",{children:i})]}),t.jsx(Pe,{children:t.jsx(je,{ref:$,type:"tel",inputMode:"numeric",pattern:"[0-9]*",maxLength:6,value:h,onChange:b,placeholder:g("Enter 6-digit code"),style:{letterSpacing:"2px",textAlign:"center",padding:"12px",width:"100%",boxSizing:"border-box"}})}),t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px",width:"100%"},children:[t.jsx(q,{onClick:V,disabled:f==="verifying"||h.length!==6,$primary:!0,style:{width:"100%",backgroundColor:"#28a745"},children:g(f==="verifying"?"Verifying...":"Verify Code")}),t.jsxs("div",{style:{fontSize:"14px",color:"#666",display:"flex",justifyContent:"center",gap:"8px"},children:[t.jsx("span",{children:g("Didn't receive a code?")}),t.jsx("button",{onClick:X,style:{background:"none",border:"none",color:"#007bff",padding:0,cursor:"pointer",fontSize:"14px",textDecoration:"underline"},children:g("Send new code")})]}),t.jsx(q,{onClick:r,style:{width:"100%",backgroundColor:"#f8f9fa",color:"#555",border:"1px solid #ccc"},children:g("Cancel")})]})]}):t.jsxs("form",{style:{width:"100%"},children:[t.jsx(Pe,{children:t.jsx(je,{ref:A,type:"email",value:i,onChange:o=>l(o.target.value),placeholder:g("Email address..."),style:{padding:"12px",width:"100%",boxSizing:"border-box"}})}),t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px",width:"100%"},children:[t.jsx(q,{onClick:J,disabled:f==="sending"||!i.trim(),$primary:!0,style:{width:"100%"},children:g(f==="sending"?"Sending...":"Send Verification Code")}),t.jsx(q,{onClick:r,style:{width:"100%",backgroundColor:"#f8f9fa",color:"#555",border:"1px solid #ccc"},children:g("Cancel")})]})]}),t.jsx(Xe,{children:g("Two-Factor Authentication")})]})}):null},ke=({src:e,thumbnailSrc:r,alt:u,className:a="",loadFullResolution:g=!1,onFullResolutionLoaded:i,onClick:l,showWatermark:p=!1})=>{const[s,h]=n.useState(!1),[y,m]=n.useState(!1),[w,f]=n.useState(!1),[c,P]=n.useState("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E"),{t:x}=ce();n.useEffect(()=>{if(r){const b=new globalThis.Image;b.src=r,b.onload=()=>{P(r),h(!0)}}},[r]),n.useEffect(()=>{if(g&&!y){f(!0);const b=new globalThis.Image;b.src=e,b.onload=()=>{P(e),m(!0),f(!1),i&&i()}}},[g,e,y,i]);const A=n.useCallback(b=>(b.preventDefault(),!1),[]),$=n.useCallback(b=>(b.preventDefault(),!1),[]);return t.jsxs(Et,{onClick:l,children:[t.jsx(Lt,{src:c,alt:u,className:a,$isLoaded:s,$objectFit:"cover",onContextMenu:A,onDragStart:$,draggable:!1,style:{cursor:l?"pointer":"default"}}),!s&&t.jsx(Nt,{}),w&&t.jsx(ne,{$type:"loading",children:x("Loading full resolution...")}),p&&s&&t.jsx(ne,{$type:"watermark",children:t.jsx(me,{children:"6180 Watermarked"})})]})},_s=({thumbnailUrl:e,videoUrl:r,duration:u,index:a,onFullResolutionLoaded:g,onClick:i,showWatermark:l=!1})=>{const[p,s]=n.useState(!1),[h,y]=n.useState(!1),[m,w]=n.useState(!1),f=ft.useRef(null),{t:c}=ce(),P=()=>{if(i){i();return}m?s(!0):y(!0)},x=()=>{w(!0),s(!0),g&&g()};n.useEffect(()=>{if(h&&f.current&&!m){const b=f.current,J=()=>{x(),b.removeEventListener("canplaythrough",J)};return b.addEventListener("canplaythrough",J),b.load(),()=>{b.removeEventListener("canplaythrough",J)}}},[h,m]);const A=n.useCallback(b=>(b.preventDefault(),!1),[]),$=n.useCallback(b=>(b.preventDefault(),!1),[]);return p?t.jsxs("div",{style:{position:"relative",width:"100%",height:"100%"},children:[t.jsxs("video",{ref:f,controls:!0,style:{width:"100%",height:"100%",userSelect:"none",WebkitUserSelect:"none",MozUserSelect:"none",msUserSelect:"none",WebkitTouchCallout:"none"},onContextMenu:A,onDragStart:$,draggable:!1,children:[t.jsx("source",{src:r,type:"video/mp4"}),c("Your browser does not support the video tag.")]}),l&&t.jsx(ne,{$type:"watermark",children:t.jsx(me,{children:"6180 Watermarked"})})]}):h&&!m?t.jsxs(Re,{children:[t.jsx(ke,{src:r,thumbnailSrc:e,alt:`Video thumbnail ${a+1}`,showWatermark:l}),t.jsx(ne,{$type:"loading",children:c("Loading video...")}),t.jsx("video",{ref:f,style:{display:"none",userSelect:"none",WebkitUserSelect:"none",MozUserSelect:"none",msUserSelect:"none",WebkitTouchCallout:"none"},preload:"auto",onContextMenu:A,onDragStart:$,draggable:!1,children:t.jsx("source",{src:r,type:"video/mp4"})})]}):t.jsxs(Re,{onClick:P,children:[t.jsx(ke,{src:r,thumbnailSrc:e,alt:`Video thumbnail ${a+1}`,showWatermark:l}),t.jsx(Rt,{}),t.jsx(Ke,{$position:"bottomLeft",children:u})]})},Us=({item:e,index:r,isSelectionMode:u,isSelected:a,toggleItemSelection:g,openFullscreenView:i,showWatermark:l,ownerName:p})=>t.jsxs("div",{style:{position:"relative",border:u&&a?"3px solid #006adc":void 0,borderRadius:"8px",overflow:"hidden",boxShadow:u&&a?"0 0 0 3px rgba(0, 106, 220, 0.3)":void 0},onClick:s=>u?g(r,s):i(r),children:[u&&t.jsx(Mt,{$isSelected:a,onClick:s=>g(r,s),children:a&&t.jsx(Ft,{children:"✓"})}),e.type==="image"?t.jsx(ke,{src:e.url,thumbnailSrc:e.thumbnailUrl,alt:`Album image ${r+1}`,loadFullResolution:!1,onFullResolutionLoaded:()=>{},onClick:()=>u?void 0:i(r),showWatermark:l}):t.jsx(_s,{thumbnailUrl:e.thumbnailUrl||"",videoUrl:e.url,duration:e.duration||"0:00",index:r,onFullResolutionLoaded:()=>{},onClick:()=>u?void 0:i(r),showWatermark:l}),p&&t.jsx(Ke,{$position:"bottomRight",$light:!0,children:p})]},r),Os=({isLoading:e,error:r,albumData:u,columns:a,shouldShowContent:g,shouldShowWatermark:i,isSelectionMode:l,selectedItems:p,toggleItemSelection:s,openFullscreenView:h,t:y})=>e?t.jsx(ue,{$type:"loading",id:"loading-message",children:y("Loading album content...")}):r?t.jsx(ue,{$type:"error",children:r}):g()?!u||u.mediaItems.length===0?t.jsx(ue,{$type:"error",children:y("No media found in this album")}):t.jsx(_t,{id:"media-grid",$columns:a,children:u.mediaItems.map((m,w)=>{const f=m.ownerContactId&&u.contacts[m.ownerContactId]?u.contacts[m.ownerContactId]:"",c=p.has(w),P=i();return t.jsx(Us,{item:m,index:w,isSelectionMode:l,isSelected:c,toggleItemSelection:s,openFullscreenView:h,showWatermark:P,ownerName:f},w)})}):t.jsx("div",{style:{gridColumn:"1 / -1",textAlign:"center",padding:"40px 0"},children:t.jsx(ue,{$type:"error",children:y("Enter the password to view album contents")})}),Bs=({albumData:e,t:r})=>e?t.jsxs(t.Fragment,{children:[e.folderName&&e.folderName!==r("Photos")&&e.folderName.trim()!==""&&t.jsx(Ut,{id:"album-title",children:t.jsx(Ot,{children:e.folderName})}),e.folderDescription&&e.folderDescription.trim()!==""&&t.jsx(Bt,{id:"description-container",children:t.jsx(Wt,{children:e.folderDescription})})]}):null,Ws=({addPhotosToAlbum:e,saveAlbum:r,promptForPassword:u,showingEnterPassword:a,passwordPolicy:g,usingFolderInviteGrantsRightToAddItems:i,t:l})=>{const[p,s]=n.useState(!1),[h,y]=n.useState(!1),m=n.useRef(null),w=840;n.useEffect(()=>{y(window.innerWidth<w);const x=()=>{y(window.innerWidth<w)};return window.addEventListener("resize",x),()=>window.removeEventListener("resize",x)},[]);const f=()=>{s(!p)},c=()=>{s(!1)},P=x=>{x(),c()};return n.useEffect(()=>{const x=$=>{m.current&&!m.current.contains($.target)&&s(!1)},A=()=>{s(!1)};return p&&(document.addEventListener("mousedown",x),window.addEventListener("scroll",A)),()=>{document.removeEventListener("mousedown",x),window.removeEventListener("scroll",A)}},[p]),h?t.jsxs("div",{ref:m,style:{position:"relative",display:"flex",alignItems:"center",justifyContent:"flex-end",width:"100%",flexWrap:"nowrap"},children:[!a&&t.jsxs("div",{style:{flexShrink:0},children:[t.jsxs(zt,{onClick:f,"aria-label":l("Menu"),"aria-expanded":p,children:[t.jsxs(Yt,{children:[t.jsx(Te,{}),t.jsx(Te,{}),t.jsx(Te,{})]}),l("Add")]}),p&&t.jsxs(Jt,{children:[i&&t.jsx(be,{onClick:()=>P(e),children:l("Add Photos To Album")}),t.jsx(be,{onClick:()=>P(r),children:l("Save To Library")}),t.jsx(be,{onClick:()=>P(r),children:l("Download")})]})]}),a&&g&&g!=="NoPassword"&&t.jsx("div",{style:{flexShrink:0},children:t.jsx(q,{onClick:u,$passwordSet:!0,children:l("Enter Password")})})]}):t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"20px",justifyContent:"flex-end",flexWrap:"nowrap"},children:[!a&&t.jsxs("div",{style:{display:"flex",gap:"20px",flexWrap:"nowrap"},children:[i&&t.jsx(q,{onClick:e,children:l("Add Photos")}),t.jsx(q,{onClick:r,children:l("Save To Library")}),t.jsx(q,{onClick:r,children:l("Download")})]}),a&&t.jsx("div",{children:t.jsx(q,{onClick:u,$passwordSet:!0,children:l("Enter Password")})})]})},zs=({t:e,isSelectionMode:r,cancelSelection:u,showingEnterPassword:a,promptForPassword:g,passwordPolicy:i,isAuthorized:l,addPhotosToAlbum:p,saveAlbumDirectly:s,handleDownloadPhotos:h,handleCopyLink:y,albumData:m,columns:w,changeColumns:f})=>{const c=()=>t.jsx("div",{style:{display:"flex",gap:"16px"},children:t.jsx(q,{onClick:u,children:e("Cancel")})}),P=()=>!r&&!l&&i&&i!=="NoPassword"&&t.jsx(q,{onClick:g,$passwordSet:!0,children:e("Enter Password")}),x=()=>t.jsx(q,{onClick:h,children:e("Download")}),A=()=>r?c():t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",width:"100%",flexWrap:"nowrap",alignItems:"center"},children:[t.jsx("div",{style:{flexShrink:0},children:!a()&&t.jsx(q,{onClick:y,children:e("Share")})}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[P(),!r&&!(!l&&i&&i!=="NoPassword")&&(m!=null&&m.folderPositionId?x():t.jsx(Ws,{addPhotosToAlbum:p,saveAlbum:s,downloadPhotos:h,promptForPassword:g,showingEnterPassword:a(),passwordPolicy:i,usingFolderInviteGrantsRightToAddItems:m==null?void 0:m.usingFolderInviteGrantsRightToAddItems,t:e}))]})]});return t.jsx(Vt,{children:t.jsxs(Xt,{children:[t.jsx(Kt,{$fullWidth:!0,children:A()}),t.jsxs(Gt,{children:[t.jsx(Ht,{htmlFor:"columns",id:"columns-label",children:t.jsx("strong",{children:e("Columns:")})}),t.jsx(qt,{id:"columns",value:w,onChange:$=>f($.target.value),children:[1,2,3,4,5].map($=>t.jsx("option",{value:$.toString(),children:$},$))})]})]})})},Ys=()=>{const{t:e,language:r}=ce(),u=mt(),a=ps(),g=fs(),i=Ct(e),[l,p]=n.useState("1"),[s,h]=n.useState(null),[y,m]=n.useState(!0),[w,f]=n.useState(null),[c,P]=n.useState(null),[x,A]=n.useState([]),[$,b]=n.useState(!1),[J,V]=n.useState(!1),[X,o]=n.useState(!1),[N,E]=n.useState(null),[F,Y]=n.useState(!1),z=wt(T=>{T?ve(`save-album.html?folderId=${encodeURIComponent(T)}`):ve("save-album.html")}),{passwordPolicy:d,setPasswordPolicy:v,isAuthorized:C,setIsAuthorized:I,showPasswordModal:O,setShowPasswordModal:U,passwordError:R,setPasswordError:S,passwordVerified:j,setPasswordVerified:M,shouldShowContent:B,shouldShowWatermark:k,showingEnterPassword:Z,promptForPassword:Q}=g;console.log("Password protection state:",{passwordPolicy:d,isAuthorized:C,showPasswordModal:O,passwordVerified:j,showingEnterPassword:Z}),console.log("shouldShowContent result:",B),console.log("shouldShowWatermark result:",k);const{fileInputRef:de,isUploading:re,progressTracker:ye,log:$e}=z,{fullscreenItem:ee,openFullscreenView:Ae,closeFullscreenView:Ge,goToPrevItem:He,goToNextItem:qe}=u,{isSelectionMode:we,selectedItems:Qe,toggleItemSelection:Ze,cancelSelection:De}=a,te=hs(s,c,N,e);n.useEffect(()=>{(async()=>{try{await xt(),$e("🔥 Photos page S3 credentials prewarmed successfully")}catch(_){$e(`⚠️ Photos page credential prewarming failed: ${String(_)}`)}})()},[]),n.useEffect(()=>{var T,_;s!=null&&s.mediaItems&&(console.log("🎯 photos.tsx: albumData updated, checking mediaItems tags:",{totalItems:s.mediaItems.length,itemsWithTags:s.mediaItems.filter(L=>L.selectedTags&&L.selectedTags.length>0).length,firstItemTagCount:((_=(T=s.mediaItems[0])==null?void 0:T.selectedTags)==null?void 0:_.length)||0}),s.mediaItems.slice(0,3).forEach((L,K)=>{var W,G;console.log(`🎯 photos.tsx item ${K}:`,{fileId:L.fileId.substring(0,50)+"...",hasSelectedTags:!!L.selectedTags,tagCount:((W=L.selectedTags)==null?void 0:W.length)||0,tags:((G=L.selectedTags)==null?void 0:G.map(se=>{var ie;return{type:se.TagType,title:se.tagTitle,subtags:((ie=se.subtags)==null?void 0:ie.length)||0}}))||[]})}),A(s.mediaItems),b(!1))},[s]);const et=T=>{A(T),b(!0)},tt=()=>{s!=null&&s.mediaItems&&(A(s.mediaItems),b(!1))},st=async T=>{if(S(null),T.trim()===""){S(e("Password cannot be empty"));return}const _=s==null?void 0:s.actualPassword;if(!_)if(s!=null&&s.hasPassword){S(e("Unable to validate password. Please try again later."));return}else{I(!0),U(!1);return}if(T!==_){S(e("Invalid password. Please try again."));return}const L=await D();if(!L){U(!1),M(!0),V(!0);return}if(I(!0),U(!1),S(null),!N)try{const G=JSON.parse(atob(L.split(".")[1]))["cognito:username"];E(G)}catch(W){console.error("Failed to decode token",W)}const K=localStorage.getItem(pe.PUBLIC_USERNAME);if(K!=null&&K.startsWith("Profile-")){console.log("Public username starts with 'Profile-', showing username prompt"),K&&i.setUsernameInput(""),i.setShowUsernamePrompt(!0);return}ge(e,c,s)},ot=T=>{p(T),localStorage.setItem("columns",T)},Ee=()=>{z.openFilePicker(c)},nt=async()=>{const T=await D();if(!T){Y(!0),V(!0);return}if(!N)try{const L=JSON.parse(atob(T.split(".")[1]))["cognito:username"];E(L)}catch(_){console.error("Failed to decode token",_)}Ee()},rt=async()=>{V(!1);const T=await D();if(T)try{const L=JSON.parse(atob(T.split(".")[1]))["cognito:username"];E(L),j&&(I(!0),M(!1)),F&&(localStorage.setItem("selectPhotosButtonTimestamp",Date.now().toString()),Y(!1));const K=localStorage.getItem(pe.PUBLIC_USERNAME);if(K!=null&&K.startsWith("Profile-")){console.log("Public username starts with 'Profile-', showing username prompt"),K&&i.setUsernameInput(""),i.setShowUsernamePrompt(!0);return}ge(e,c,s);return}catch(_){console.error("Failed to decode token",_)}},it=async T=>{if(!Array.from(T.target.files||[]).length)return;localStorage.removeItem("selectPhotosButtonTimestamp"),o(!1),await z.handleFileSelection(T,N)||V(!0)},lt=async()=>{if(console.log("Starting album registration"),d==="CannotBeSaved"&&!C){Q();return}const T=await D();if(!T){console.log("User not logged in, showing OTP login"),V(!0);return}if(!N)try{const K=JSON.parse(atob(T.split(".")[1]))["cognito:username"];E(K)}catch(L){console.error("Failed to decode token",L)}const _=localStorage.getItem(pe.PUBLIC_USERNAME);if(_!=null&&_.startsWith("Profile-")){console.log("Public username starts with 'Profile-', showing username prompt"),_&&i.setUsernameInput(""),i.setShowUsernamePrompt(!0);return}ge(e,c,s)},at=async()=>{if(d==="CannotBeSaved"&&!C){Q();return}if(!await D()&&(c||d==="CannotBeSaved")){V(!0);return}s&&bt(s,e,Ae)};n.useEffect(()=>{const T=localStorage.getItem("columns")||"1";p(T)},[]);const ct=()=>{console.log("getParametersFromUrl called"),console.log("window.location.pathname:",window.location.pathname);const T=window.location.pathname.split("/").filter(Boolean);return console.log("pathSegments:",T),T.length>0&&T[0]==="app"?(console.log("Traditional app path detected, returning null"),null):T.length===2?(console.log("Found parameters:",T[1]),T[1]):(console.log("No valid path format found, returning null"),null)};n.useEffect(()=>{(async()=>{console.log("initAlbum called");const _=ct();if(console.log("Extracted parameters:",_),!_){console.log("No parameters found, setting error"),f(e("Valid parameters not found in URL")),m(!1);return}let L,K=!1;if(console.log('Checking if parameters contain "id=":',_.includes("id=")),_.includes("id=")){console.log('Parameters contain "id=", extracting identifier');const G=_.indexOf("id=");if(G!==-1)L=_.substring(G+3),K=!0,console.log('Extracted identifier after "id=":',L),console.log("Will use fetchFolderUsingTargetItemIdentifier");else{console.log('Failed to find "id=" in parameters'),f(e("Invalid id parameter format")),m(!1);return}}else L=_,K=!1,console.log("Using entire parameters as identifier:",L),console.log("Will use fetchFolderUsingAlbumNanoId");if(L.includes("-")){const G=L.split("-"),se=L;L=G[G.length-1],console.log('Identifier contained "-", stripped from:',se,"to:",L)}else console.log('Identifier does not contain "-", keeping as is:',L);let W;if(K){console.log("Calling fetchFolderUsingTargetItemIdentifier with identifier:",L);let G=L;G.length===32?(G=yt(G),console.log(G)):console.error("Invalid UUID format: must be 32 characters after removing dashes"),W=await us(G,P)}else console.log("Calling fetchFolderUsingAlbumNanoId with identifier:",L),W=await gs(L,P);console.log("API call result:",W?"Success":"Failed"),W?(console.log("Full album data received:",W),console.log("Media items count:",W.mediaItems?W.mediaItems.length:"No mediaItems property"),console.log("Password policy:",W.passwordPolicy),console.log("Folder position ID:",W.folderPositionId),h(W),W.passwordPolicy&&(v(W.passwordPolicy),console.log("Password policy set to:",W.passwordPolicy),W.passwordPolicy==="NoPassword"||W.folderPositionId?(I(!0),console.log("User automatically authorized")):console.log("User not automatically authorized, will need to enter password")),console.log("Album data set successfully")):(console.log("No data returned from API, setting error"),f(e("Album not found"))),m(!1),console.log("initAlbum completed")})()},[]),n.useEffect(()=>{(async()=>{const _=await D();if(_)try{const K=JSON.parse(atob(_.split(".")[1]))["cognito:username"];E(K);const W=localStorage.getItem("selectPhotosButtonTimestamp");if(W){const G=parseInt(W,10),ie=(Date.now()-G)/(1e3*60);o(ie<10),ie>=10&&localStorage.removeItem("selectPhotosButtonTimestamp")}else o(!1)}catch(L){console.error("Failed to decode token",L)}})()},[]),n.useEffect(()=>{s!=null&&s.folderName?document.title=s.folderName:document.title=e("Photos")},[s,r]),n.useEffect(()=>{var T;console.log("AlbumMediaGrid props changed:",{isLoading:y,error:w,albumDataExists:!!s,mediaItemsCount:(T=s==null?void 0:s.mediaItems)==null?void 0:T.length,filteredMediaItemsCount:x==null?void 0:x.length,columns:l,shouldShowContent:B,shouldShowWatermark:k,isMediaFiltered:$})},[y,w,s,x,l,B,k,$]);const dt=()=>s&&s.creatorId&&s.contacts[s.creatorId]?s.contacts[s.creatorId]:"the album owner",Le=le(r)==="rtl",Ie=s?{...s,mediaItems:x}:null;return t.jsxs(Qt,{$isRTL:Le,children:[t.jsx(Zt,{}),t.jsx(Dt,{children:t.jsxs(es,{children:[t.jsx(ts,{href:"https://6180.io",target:"_blank",rel:"noopener noreferrer","aria-label":e("Visit 6180.io"),children:t.jsxs(ss,{$isRTL:Le,children:[t.jsx(os,{src:Ye("images/logo_no_background.png"),alt:"6180 Logo"}),t.jsx("span",{style:{marginLeft:"8px",fontSize:"18px",fontWeight:"bold"},children:e("Home")})]})}),t.jsx(ns,{href:"https://6180.io",target:"_blank",rel:"noopener noreferrer","aria-label":e("Create an album in 90 sec"),children:e("Create an album in 90 sec")})]})}),t.jsx(zs,{t:e,isSelectionMode:we,cancelSelection:De,showingEnterPassword:Z,promptForPassword:Q,passwordPolicy:d,isAuthorized:C,addPhotosToAlbum:nt,saveAlbumDirectly:lt,handleDownloadPhotos:at,handleCopyLink:()=>te.setShowingCopyLinkAlert(!0),albumData:s,columns:l,changeColumns:ot}),t.jsxs(rs,{id:"media-container",children:[t.jsx(ms,{showSelectPhotosButton:X,albumData:s,openFilePicker:Ee,t:e}),re&&t.jsx("div",{style:{width:"100%",marginBottom:"20px"},children:t.jsx(It,{progressTracker:ye,isRTL:le(r)==="rtl",style:{marginTop:"20px"},showSuccessMessage:!0,showErrorMessage:!0})}),t.jsx(xs,{isSelectionMode:we,t:e}),t.jsx(Bs,{albumData:s,t:e}),(s==null?void 0:s.mediaItems)&&s.mediaItems.length>0&&t.jsx(Cs,{mediaItems:s.mediaItems,onFilterChange:et,resetFilter:tt}),t.jsx(Os,{isLoading:y,error:w,albumData:Ie,columns:l,shouldShowContent:B,shouldShowWatermark:k,isSelectionMode:we,selectedItems:Qe,toggleItemSelection:Ze,openFullscreenView:Ae,t:e})]}),t.jsx(Ms,{isOpen:O,onClose:()=>{U(!1),S(null)},onSubmit:st,error:R,t:e}),t.jsx(Fs,{isOpen:J,onClose:()=>{V(!1)},onLoginSuccess:rt,ownerName:dt(),t:e}),t.jsx(ds,{onFileSelection:it,ref:de}),ee!==null&&Ie&&t.jsx(Rs,{item:Ie.mediaItems[ee],index:ee,onClose:Ge,onPrev:He,onNext:()=>qe(x.length),hasNext:ee<x.length-1,hasPrev:ee>0,showWatermark:k(),ownerName:(()=>{const T=x[ee].ownerContactId;if(!T)return"";if(s!=null&&s.contacts&&s.contacts[T])return s.contacts[T];const _=T.split("_____")[0]||"";return _===N?e("Me"):_})()}),t.jsx(vt,{t:e,language:r,usernameManager:i,onSuccess:T=>{ge(e,c,s)}}),t.jsx(St,{isOpen:te.showingCopyLinkAlert,onClose:()=>te.setShowingCopyLinkAlert(!1),inviteLink:We(c,s==null?void 0:s.albumNanoId,s!=null&&s.creatorId&&(s!=null&&s.contacts)&&(s!=null&&s.contacts[s==null?void 0:s.creatorId])?s==null?void 0:s.contacts[s==null?void 0:s.creatorId]:"album",s==null?void 0:s.folderName),onCopy:te.handleCopy,t:e,isRTL:le(r)==="rtl"}),t.jsx(Tt,{isOpen:te.showingCopiedLinkAlert,onClose:()=>te.setShowingCopiedLinkAlert(!1),t:e,isRTL:le(r)==="rtl"})]})},Js=()=>t.jsx(ht,{children:t.jsx(Ys,{})});pt.createRoot(document.getElementById("root")).render(t.jsx(Js,{}));
