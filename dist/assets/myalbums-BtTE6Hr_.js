import{u as _,j as t,a2 as J,g as N,r as x,a8 as M,k as W,d as v,a9 as Y,aa as q,l as B,a as X,I as Z,G as ee,A as te}from"./styled-components-Cp5DMLPM.js";import{L as oe,D as se}from"./DebugLog-BIm_ehuz.js";import{A as ne,L as ie,S as re}from"./profile-styled-components-BZ3lmCGo.js";import{C as ae,a as le,d as de,U as ce,F as ue}from"./FileInput-ClGIE_Xr.js";import{j as H,c as pe,b as U,k as E,u as z,h as fe,f as he,g as ge,p as me,i as xe}from"./utils-BpX0p9KY.js";const be=({publicUsername:o,cognitoUsername:y})=>{const{t:d,language:P}=_(),f=N(P)==="rtl",w=y?encodeURIComponent(y):"";return t.jsx(t.Fragment,{children:t.jsx("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,width:"100%",direction:f?"rtl":"ltr"},children:o&&t.jsxs(t.Fragment,{children:[t.jsxs(J,{href:`profile.html?id=${w}`,children:[t.jsx("span",{style:{fontSize:"16px",lineHeight:1,marginRight:"6px"},children:"👤"}),o||d("Profile")]}),t.jsx(oe,{t:d})]})})})},ye=({isUploading:o,openFilePicker:y,t:d})=>t.jsx("div",{style:{display:"flex",alignItems:"center",marginBottom:24,width:"100%"},children:t.jsx("button",{onClick:()=>y(null),style:{fontSize:"14px",padding:"8px 16px",backgroundColor:"#007bff",color:"white",border:"none",borderRadius:"6px",cursor:"pointer",opacity:o?.6:1,pointerEvents:o?"none":"auto"},disabled:o,children:d(o?"Uploading...":"Create Album")})}),we=({folders:o,onFilterChange:y,resetFilter:d})=>{const{t:P,language:f}=_(),w=N(f)==="rtl",[u,A]=x.useState([]),[h,g]=x.useState([]),[k,S]=x.useState([]);x.useEffect(()=>{const e=new Map;o.forEach(p=>{if(p.contacts){const n=p.updatedAt?new Date(p.updatedAt).getTime():p.createdAt?new Date(p.createdAt).getTime():0;Object.values(p.contacts).forEach(c=>{if(typeof c=="string"&&!c.toString().startsWith("Profile-")){const r=e.get(c);(!r||n>r.timestamp)&&e.set(c,{name:c,timestamp:n})}})}});const a=Array.from(e.values()).sort((p,n)=>n.timestamp-p.timestamp).map(p=>p.name);A(a),S(a)},[o]);const D=e=>{let a;if(h.includes(e)?a=h.filter(p=>p!==e):a=[...h,e],g(a),a.length===0)d(),S(u);else{const p=o.filter(n=>{if(!n.contacts)return!1;const c=Object.values(n.contacts).filter(r=>typeof r=="string"&&!r.toString().startsWith("Profile-"));return a.every(r=>c.includes(r))});j(p),y(p)}},j=e=>{const a=new Set;e.forEach(n=>{n.contacts&&Object.values(n.contacts).forEach(c=>{typeof c=="string"&&!c.toString().startsWith("Profile-")&&a.add(c)})}),h.forEach(n=>{a.add(n)});const p=u.filter(n=>a.has(n));S(p)};return u.length===0?null:t.jsxs("div",{style:{width:"100%",marginBottom:24,direction:w?"rtl":"ltr"},children:[t.jsxs("div",{style:{display:"flex",flexDirection:w?"row-reverse":"row",gap:12,overflowX:"auto",paddingBottom:8,WebkitOverflowScrolling:"touch",flexWrap:"nowrap"},children:[t.jsxs("div",{style:{fontSize:14,color:"#555",whiteSpace:"nowrap",display:"flex",alignItems:"center",height:"40px",flexShrink:0,padding:w?"0 0 0 4px":"0 4px 0 0"},children:[P("Filter"),":"]}),k.map(e=>t.jsx("button",{onClick:()=>D(e),style:{padding:"6px 12px",borderRadius:16,fontSize:13,cursor:"pointer",border:"1px solid #ddd",backgroundColor:h.includes(e)?"#2196f3":"#fff",color:h.includes(e)?"#fff":"#333",whiteSpace:"nowrap",transition:"all 0.2s ease",flexShrink:0,height:"40px"},children:e},e))]}),h.length>1&&t.jsx("div",{style:{marginTop:8,fontSize:13,color:"#555",fontStyle:"italic",textAlign:w?"right":"left"},children:P("Showing albums with all selected contacts")}),t.jsx("style",{children:`
          div::-webkit-scrollbar {
            display: none;
          }
        `})]})},Ce=({folder:o,openFilePicker:y,cognitoUsername:d,updateProfileIds:P})=>{const{t:f,language:w}=_(),u=N(w)==="rtl",[A,h]=x.useState(!1),[g,k]=x.useState(!1),[S,D]=x.useState(o.profileIds||[]),j=d?`${d}_____Public____Profile`:"",e=S.includes(j),a=H(o.folderId,o.albumNanoId,o.folderName);x.useEffect(()=>{D(o.profileIds||[])},[o.profileIds]);const p=s=>{navigator.clipboard.writeText(s).then(()=>{h(!1),k(!0)}).catch(b=>{console.error("Failed to copy link:",b),alert(f("Failed to copy link"))})},n=async s=>{if(s.preventDefault(),s.stopPropagation(),!await pe()){alert(f("You must be logged in to download photos"));return}if(o&&o.files&&o.files.length>0){const m=o.files.map((C,F)=>{const l=C.dataKey.toLowerCase().endsWith(".mp4")?"video":"image";return{url:`${M}${C.dataKey}`,thumbnailUrl:C.thumbnailDataKey?`${M}${C.thumbnailDataKey}`:void 0,type:l,index:F,id:`file-${F}`,fileId:C.dataKey,loaded:!1}}),i={mediaItems:m,folderName:o.folderName||"Album"};de(i,f,C=>{window.open(m[C].url,"_blank")})}else alert(f("No items to download"))},c=async s=>{var b,m,i;if(s.preventDefault(),s.stopPropagation(),!d){alert(f("You must be logged in to perform this action"));return}try{const I=await U();if(!I){console.error("Authentication failed");return}const C=[...S];if(e){const $=C.indexOf(j);$>-1&&C.splice($,1)}else C.push(j);const R=await(await fetch(W,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${I}`},body:JSON.stringify({query:`
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
      `,variables:{folderPositionChangeProfileIdsInput:{folderId:o.folderId,profileIds:C}}})})).json();if(R.errors)throw new Error(((b=R.errors[0])==null?void 0:b.message)||"Unknown error");const T=(((i=(m=R==null?void 0:R.data)==null?void 0:m.changeFiles)==null?void 0:i.items)||[]).find($=>$.id===o.folderPositionId);T&&T.profileIds&&(D(T.profileIds),P&&P(T.profileIds),console.log("Album visibility updated successfully"))}catch(I){console.error("Failed to toggle album visibility:",I),alert(f("Failed to update album visibility. Please try again."))}},r={padding:"8px 12px",border:"none",borderRadius:6,cursor:"pointer",fontSize:14,textAlign:"center",whiteSpace:"nowrap",flexShrink:0};return t.jsx(t.Fragment,{children:t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:16,flexDirection:u?"row-reverse":"row"},children:[t.jsx("div",{style:{display:"flex",width:"100%",overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none",WebkitOverflowScrolling:"touch",flexDirection:u?"row-reverse":"row",gap:"10px"},children:t.jsxs("div",{style:{display:"flex",gap:"10px",flexDirection:u?"row-reverse":"row"},children:[t.jsx("button",{onClick:s=>{s.preventDefault(),s.stopPropagation(),y(o.folderId)},style:{...r,backgroundColor:"#4caf50",color:"white"},children:f("Add Photos")}),t.jsx("button",{onClick:n,style:{...r,backgroundColor:"#e0e0e0"},children:f("Download")}),t.jsx("button",{onClick:s=>{s.preventDefault(),s.stopPropagation(),h(!0)},style:{...r,backgroundColor:"#e0e0e0"},children:f("Copy Link")}),t.jsx("button",{onClick:c,style:{...r,backgroundColor:e?"#4caf50":"#e0e0e0",color:e?"white":"inherit"},children:f(e?"On Public Profile":"Not On Public Profile")})]})}),t.jsx(ae,{isOpen:A,onClose:()=>h(!1),inviteLink:a,onCopy:p,t:f,isRTL:u}),t.jsx(le,{isOpen:g,onClose:()=>k(!1),t:f,isRTL:u}),t.jsx("style",{children:`
            div::-webkit-scrollbar {
              display: none;
            }
          `})]})})},Ie=v.div`
  margin-bottom: 30px;
  width: 100%;
  direction: ${o=>o.isRTL?"rtl":"ltr"};
`,ve=v.a`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  overflow: hidden;
`,Pe=v.div`
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: box-shadow 0.2s ease;
  width: 100%;
  max-width: 100%;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;

  &:hover {
    box-shadow: 0 6px 16px rgba(0,0,0,0.08);
  }
`,Se=v.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
  flex-direction: ${o=>o.isRTL?"row-reverse":"row"};
`,je=v.div`
  display: flex;
  flex-direction: column;
  align-items: ${o=>o.isRTL?"flex-end":"flex-start"};
`,ke=v.h2`
  font-size: 20px;
  margin: 0;
  color: #222;
`,Fe=v.div`
  display: flex;
  flex-direction: column;
  align-items: ${o=>o.isRTL?"flex-start":"flex-end"};
  justify-content: flex-end;
  gap: 8px;
`,Ae=v.div`
  position: relative;
`,De=v.a`
  font-size: 13px;
  color: #2196f3;
  text-decoration: none;
`,Le=v.a`
  font-size: 13px;
  color: #d32f2f;
  text-decoration: none;
`,Re=v.div`
  display: none;
  position: absolute;
  top: 100%;
  right: ${o=>o.isRTL?"auto":0};
  left: ${o=>o.isRTL?0:"auto"};
  background-color: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-radius: 4px;
  z-index: 10;
  min-width: 150px;
  padding: 8px 0;
  margin-top: 5px;
  text-align: ${o=>o.isRTL?"right":"left"};
`,Q=v.a`
  display: block;
  padding: 8px 16px;
  color: ${o=>o.isDelete?"#d32f2f":"#2196f3"};
  text-decoration: none;
  font-size: 13px;
  white-space: nowrap;
`,Te=v.div`
  width: 100%;
  position: relative;
`,$e=v.div`
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding-bottom: 8px;
  ms-overflow-style: none;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
  max-width: 100%;
  flex-direction: ${o=>o.isRTL?"row-reverse":"row"};
`,_e=v.div`
  position: absolute;
  ${o=>o.isRTL?"left":"right"}: 0;
  top: 0;
  bottom: 8px;
  width: 30px;
  background: ${o=>o.isRTL?"linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))":"linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))"};
  pointer-events: none;
`,Ne=v.div`
  display: flex;
  justify-content: ${o=>o.isRTL?"flex-start":"flex-end"};
  margin-top: 8px;
  margin-bottom: 8px;
`,Ee=v.div`
  width: 100%;
  background-color: #f0f7ff;
  border-radius: 8px;
  padding: 12px 16px;
  margin-top: 16px;
  box-sizing: border-box;
  border: 1px solid #d0e1f9;
  direction: ${o=>o.isRTL?"rtl":"ltr"};
`,Ue=v.p`
  margin: 0;
  font-size: 14px;
  color: #333;
  text-align: ${o=>o.isRTL?"right":"left"};
`,Oe=v.p`
  font-size: 16px;
  color: #555;
  width: 100%;
`,ze=v.div`
  width: 160px;
  height: 100px;
  flex-shrink: 0;
`,Me=({folders:o,setFolders:y,handleDeleteClick:d,openFilePicker:P,isUploading:f,cognitoUsername:w})=>{const{t:u,language:A}=_(),h=N(A)==="rtl",g=x.useRef(null);x.useEffect(()=>{function e(){g.current&&(g.current.style.display="none",g.current=null)}function a(){e()}return window.addEventListener("scroll",a,!0),()=>{window.removeEventListener("scroll",a,!0)}},[]);const k=(e,a)=>{e.preventDefault(),e.stopPropagation(),g.current&&g.current!==a&&(g.current.style.display="none");const p=a.style.display==="block";a.style.display=p?"none":"block",g.current=p?null:a},S=e=>{g.current&&(g.current.style.display="none",g.current=null),window.confirm(u("Are you sure you want to delete this album? This action cannot be undone."))&&d(e)},D=(e,a)=>{y(p=>p.map(n=>n.folderId===e?{...n,profileIds:a}:n))},j=e=>{switch(e){case"NotVisible":return u("Hidden");case"Watermark":return u("Watermarked");case"CannotBeSaved":return u("Cannot be saved");case"NoPassword":default:return u("No password")}};return o.length===0&&!f?t.jsx(Oe,{children:u("No albums found")}):t.jsx(t.Fragment,{children:o.map(e=>{var m;const a=e.createdAt!=null,p=e.updatedAt!=null&&e.updatedAt!==e.createdAt,n=e.creatorId===`${w}_____${w}____Account`,c=((m=e.folderPassword)==null?void 0:m.policy)||"NoPassword",r=e.contacts||{},s=Object.values(r).filter(i=>i&&typeof i=="string"&&!i.toString().startsWith("Profile-")),b=H(e.folderId,e.albumNanoId,e.folderName);return t.jsx(Ie,{isRTL:h,children:t.jsx(ve,{href:b,children:t.jsxs(Pe,{children:[t.jsxs(Se,{isRTL:h,children:[t.jsxs(je,{isRTL:h,children:[t.jsx(ke,{children:e.folderName||""}),(a||p)&&t.jsxs(ne,{isRTL:h,children:[a&&e.createdAt&&E(e.createdAt)&&t.jsxs("div",{children:[u("Created"),": ",E(e.createdAt)]}),p&&e.updatedAt&&E(e.updatedAt)&&t.jsxs("div",{children:[u("Updated"),": ",E(e.updatedAt)]})]})]}),t.jsx(Fe,{isRTL:h,children:n?t.jsxs(Ae,{children:[t.jsx(De,{href:"#",onClick:i=>{const I=i.currentTarget.nextElementSibling;I&&k(i,I)},children:u("Edit")}),t.jsxs(Re,{isRTL:h,onClick:i=>{i.stopPropagation()},children:[t.jsx(Q,{href:`/save-album.html?folderId=${encodeURIComponent(e.folderId)}`,onClick:i=>{i.stopPropagation()},children:u("Edit Details")}),t.jsx(Q,{href:"#",isDelete:!0,onClick:i=>{i.preventDefault(),i.stopPropagation(),S(e.folderPositionId)},children:u("Delete My Copy")})]})]}):t.jsx(Le,{href:"#",onClick:i=>{i.preventDefault(),i.stopPropagation(),S(e.folderPositionId)},children:u("Delete")})})]}),e.folderDescription&&e.folderDescription.length>1&&t.jsx(Y,{isRTL:h,children:e.folderDescription}),t.jsxs(Te,{children:[t.jsx($e,{isRTL:h,children:e.files.map((i,I)=>t.jsx(ze,{children:t.jsx(ie,{thumbnailDataKey:i.thumbnailDataKey,dataKey:i.dataKey,src:`${M}${i.thumbnailDataKey||i.dataKey}`,alt:u("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},I))}),e.files.length>3&&t.jsx(_e,{isRTL:h})]}),t.jsx(Ne,{isRTL:h,children:c!=="NoPassword"&&t.jsx(q,{children:t.jsx("span",{children:j(c)})})}),t.jsx(Ce,{folder:e,openFilePicker:P,cognitoUsername:w,updateProfileIds:i=>D(e.folderId,i)}),s.length>0&&t.jsx(Ee,{isRTL:h,children:t.jsxs(Ue,{isRTL:h,children:[u("Shared with"),": ",s.join(", ")]})})]})})},e.folderId)})})},We=o=>{const y=x.useRef(null),[d,P]=x.useState([]),[f,w]=x.useState(!1),[u,A]=x.useState({totalFiles:0,filesComplete:0,filesUploading:0,filesProcessing:0,filesWithError:0,overallProgress:0}),[h,g]=x.useState([]),[k,S]=x.useState(null),[D,j]=x.useState(!1),e=fe(g);x.useEffect(()=>{z(d,A)},[d]),x.useEffect(()=>{if(D&&d.length>0){const r=d.filter(b=>b.status==="complete").length,s=d.filter(b=>b.status==="error").length;e(`✅ Upload complete: ${r} successful, ${s} failed`),setTimeout(()=>{k?window.location.href=`/save-album.html?folderId=${encodeURIComponent(k)}`:window.location.href="/save-album.html",a()},1e3)}},[D,d.length,k]);const a=()=>{he(P,A,[],e),w(!1),j(!1)},p=(r=null)=>{var s;S(r),P([]),j(!1),(s=y.current)==null||s.click()},n=xe(P);return{fileInputRef:y,selectedPhotos:d,isUploading:f,progressTracker:u,debugMessages:h,openFilePicker:p,handleFileSelection:async r=>{const s=Array.from(r.target.files||[]);if(!s.length)return;if(w(!0),j(!1),!await U()){e("❌ Authentication failed"),w(!1);return}if(!o){e("❌ Missing Cognito Username"),w(!1);return}try{const m=k||`${o}_____${ge()}____Folder`;e(`📁 Using folder ID: ${m}`),P(s.map(l=>({fileName:l.name,s3PreviewUrl:URL.createObjectURL(l),type:l.type,size:l.size,status:"pending",progress:0})));const i=setInterval(()=>{z(d,A)},500),I=await me(s,o,n,e);clearInterval(i),z(I,A),localStorage.setItem(B.SELECTED_PHOTOS,JSON.stringify(I)),e(`📸 Saved ${I.length} photos metadata to storage`);const C=I.every(l=>l.status==="complete"),F=I.some(l=>l.status==="error");if(C&&!F)e(`✅ All ${I.length} files successfully uploaded`);else if(F){const l=I.filter(R=>R.status==="error").length;e(`⚠️ Upload completed with ${l} errors`)}j(!0)}catch(m){e(`❌ Fatal error in handleFileSelection: ${String(m)}`),w(!1)}finally{r.target&&(r.target.value="")}},log:e}},Be=o=>{const[y,d]=x.useState([]),[P,f]=x.useState([]),[w,u]=x.useState(null),[A,h]=x.useState(null),[g,k]=x.useState(""),[S,D]=x.useState(!1);x.useEffect(()=>{u(localStorage.getItem(B.PUBLIC_USERNAME)||null),(async()=>{const c=await U();if(c){try{const s=JSON.parse(atob(c.split(".")[1]))["cognito:username"];h(s)}catch(r){console.error("Failed to decode token",r)}await a(c)}})()},[]),x.useEffect(()=>{S||f(y)},[y,S]),x.useEffect(()=>{if(g===""){S||f(y);return}const c=(S?P:y).filter(r=>{var m,i;const s=(m=r.folderName)==null?void 0:m.toLowerCase().includes(g.toLowerCase()),b=(i=r.folderDescription)==null?void 0:i.toLowerCase().includes(g.toLowerCase());return s||b});f(c)},[g,y,S]);const j=n=>{D(!0),f(n),g&&f(c=>c.filter(r=>{var m,i;const s=(m=r.folderName)==null?void 0:m.toLowerCase().includes(g.toLowerCase()),b=(i=r.folderDescription)==null?void 0:i.toLowerCase().includes(g.toLowerCase());return s||b}))},e=()=>{D(!1),f(g?y.filter(n=>{var s,b;const c=(s=n.folderName)==null?void 0:s.toLowerCase().includes(g.toLowerCase()),r=(b=n.folderDescription)==null?void 0:b.toLowerCase().includes(g.toLowerCase());return c||r}):y)},a=async n=>{var s,b;const c=`
      mutation FetchRelations($fetchRelationsInput: FetchRelationsInput!) {
        fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
          items {
            ... on FolderPosition {
              id
              profileIds
              folder {
                id
                albumNanoId                
                folderName
                folderDescription
                creatorId    
                createdAt
                updatedAt            
                folderPassword {
                  password
                  policy
                }
                fileReferencesPage {
                  items {
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
                }
              }
            }
          }
        }
      }
    `,r={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:50,scanIndexForward:!1}};try{const i=await(await fetch(W,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({query:c,variables:r})})).json(),C=(((b=(s=i==null?void 0:i.data)==null?void 0:s.fetchRelations)==null?void 0:b.items)||[]).map(F=>{var T,$,K,G;const l=F.folder,R=(($=(T=l==null?void 0:l.fileReferencesPage)==null?void 0:T.items)==null?void 0:$.map(L=>L.file))||[],O={};return(K=l==null?void 0:l.contactsUsingInvite)!=null&&K.items&&l.contactsUsingInvite.items.forEach(L=>{var V;L!=null&&L.id&&((V=L==null?void 0:L.item)!=null&&V.publicDisplayName)&&(O[L.id]=L.item.publicDisplayName)}),{folderPositionId:F.id,folderId:l.id,albumNanoId:l.albumNanoId,folderName:l.folderName,folderDescription:l.folderDescription,folderPassword:l.folderPassword,creatorId:l.creatorId,createdAt:l.createdAt,updatedAt:l.updatedAt,files:R.filter(L=>L&&L.dataKey),profileIds:F.profileIds||[],contacts:O,usingFolderInviteGrantsRightToAddItems:((G=l==null?void 0:l.folderInviteParameters)==null?void 0:G.usingFolderInviteGrantsRightToAddItems)||!1}});d(C)}catch(m){console.error("Failed to load folders:",m),o(`❌ Failed to fetch folders: ${String(m)}`)}};return{folders:y,filteredFolders:P,publicUsername:w,cognitoUsername:A,searchQuery:g,setSearchQuery:k,handleContactFilterChange:j,resetContactFilter:e,handleDeleteClick:async(n,c)=>{var r,s,b;try{console.log("Deleting album with id:",n);const m=await U();if(!m){console.error("Authentication failed");return}const C=await(await fetch(W,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${m}`},body:JSON.stringify({query:`
        mutation DeleteFolderPosition($deletedFolderPositionIds: [ID!]) {
          changeFiles(deletedFolderPositionIds: $deletedFolderPositionIds) {
            items {
              ... on IdObject {
                id
              }
            }
          }
        }
      `,variables:{deletedFolderPositionIds:[n]}})})).json();if((s=(r=C==null?void 0:C.data)==null?void 0:r.changeFiles)!=null&&s.items)o(`✅ Successfully deleted folder position ${n}`),d(F=>F.filter(l=>l.folderPositionId!==n));else if(C.errors){const F=((b=C.errors[0])==null?void 0:b.message)||"Unknown GraphQL error";throw o(`❌ Failed to delete folder: ${F}`),new Error(F)}}catch(m){o(`❌ Failed to delete folder: ${String(m)}`),console.error("Failed to delete folder:",m),alert(c("Failed to delete album. Please try again."))}},setFolders:d}},Ke=()=>{const{t:o,language:y}=_(),d=N(y)==="rtl",{folders:P,filteredFolders:f,publicUsername:w,cognitoUsername:u,searchQuery:A,setSearchQuery:h,handleContactFilterChange:g,resetContactFilter:k,handleDeleteClick:S,setFolders:D}=Be(s=>r(s)),{fileInputRef:j,isUploading:e,progressTracker:a,debugMessages:p,openFilePicker:n,handleFileSelection:c,log:r}=We(u);return t.jsxs(t.Fragment,{children:[t.jsx(ee,{}),t.jsxs(te,{isRTL:d,children:[t.jsxs("div",{style:{maxWidth:900,margin:"0 auto"},children:[t.jsx(be,{publicUsername:w,isUploading:e,openFilePicker:n,cognitoUsername:u}),t.jsx(ye,{isUploading:e,openFilePicker:n,t:o,isRTL:d}),t.jsx(re,{searchQuery:A,setSearchQuery:h,t:o,isRTL:d}),t.jsx(we,{folders:P,onFilterChange:g,resetFilter:k}),e&&t.jsxs("div",{style:{width:"100%",marginBottom:"20px"},children:[t.jsx(ce,{progressTracker:a,t:o,isRTL:d}),a.filesComplete>0&&a.filesComplete===a.totalFiles&&t.jsx("div",{style:{backgroundColor:"#e8f5e9",color:"#2e7d32",padding:"10px 16px",borderRadius:"6px",fontSize:"14px",marginTop:"10px",textAlign:"center"},children:o("Upload complete! Preparing to save your album...")}),a.filesWithError>0&&t.jsx("div",{style:{backgroundColor:"#ffebee",color:"#c62828",padding:"10px 16px",borderRadius:"6px",fontSize:"14px",marginTop:"10px",textAlign:"center"},children:o("Some files could not be uploaded. You can continue with the successfully uploaded files.")})]}),t.jsx(Me,{folders:f,setFolders:D,handleDeleteClick:s=>S(s,o),openFilePicker:n,isUploading:e,cognitoUsername:u}),t.jsx(ue,{onFileSelection:c,ref:j})]}),t.jsx(se,{debugMessages:p,t:o,isRTL:d,textDirection:d?"rtl":"ltr"})]})]})};X.createRoot(document.getElementById("root")).render(t.jsx(Z,{initialLanguage:localStorage.getItem(B.LANGUAGE)||"en",children:t.jsx(Ke,{})}));
