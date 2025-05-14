import{u as _,j as e,a2 as J,g as N,r as x,a8 as z,k as M,d as I,a9 as Y,aa as q,l as W,a as X,I as Z,G as ee,A as te}from"./styled-components-ClhTjOpj.js";import{L as oe,D as se}from"./DebugLog-BcCtoAMU.js";import{L as ne,S as ie}from"./LazyImage-BOp18nhI.js";import{d as re,U as ae,F as le}from"./FileInput-HiOq0C01.js";import{j as H,c as de,b as E,k as V,u as O,h as ce,f as pe,g as ue,p as fe,i as he}from"./utils-B7E7z9GF.js";import{C as ge,a as me}from"./Modals-DDNvyIYL.js";const xe=({publicUsername:t,cognitoUsername:y})=>{const{t:d,language:P}=_(),f=N(P)==="rtl",w=y?encodeURIComponent(y):"";return e.jsx(e.Fragment,{children:e.jsx("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,width:"100%",direction:f?"rtl":"ltr"},children:t&&e.jsxs(e.Fragment,{children:[e.jsxs(J,{href:`profile.html?id=${w}`,children:[e.jsx("span",{style:{fontSize:"16px",lineHeight:1,marginRight:"6px"},children:"👤"}),t||d("Profile")]}),e.jsx(oe,{t:d})]})})})},be=({isUploading:t,openFilePicker:y,t:d})=>e.jsx("div",{style:{display:"flex",alignItems:"center",marginBottom:24,width:"100%"},children:e.jsx("button",{onClick:()=>y(null),style:{fontSize:"14px",padding:"8px 16px",backgroundColor:"#007bff",color:"white",border:"none",borderRadius:"6px",cursor:"pointer",opacity:t?.6:1,pointerEvents:t?"none":"auto"},disabled:t,children:d(t?"Uploading...":"Create Album")})}),ye=({folders:t,onFilterChange:y,resetFilter:d})=>{const{t:P,language:f}=_(),w=N(f)==="rtl",[p,D]=x.useState([]),[h,g]=x.useState([]),[k,S]=x.useState([]);x.useEffect(()=>{const o=new Map;t.forEach(u=>{if(u.contacts){const n=u.updatedAt?new Date(u.updatedAt).getTime():u.createdAt?new Date(u.createdAt).getTime():0;Object.values(u.contacts).forEach(c=>{if(typeof c=="string"&&!c.toString().startsWith("Profile-")){const r=o.get(c);(!r||n>r.timestamp)&&o.set(c,{name:c,timestamp:n})}})}});const a=Array.from(o.values()).sort((u,n)=>n.timestamp-u.timestamp).map(u=>u.name);D(a),S(a)},[t]);const A=o=>{let a;if(h.includes(o)?a=h.filter(u=>u!==o):a=[...h,o],g(a),a.length===0)d(),S(p);else{const u=t.filter(n=>{if(!n.contacts)return!1;const c=Object.values(n.contacts).filter(r=>typeof r=="string"&&!r.toString().startsWith("Profile-"));return a.every(r=>c.includes(r))});j(u),y(u)}},j=o=>{const a=new Set;o.forEach(n=>{n.contacts&&Object.values(n.contacts).forEach(c=>{typeof c=="string"&&!c.toString().startsWith("Profile-")&&a.add(c)})}),h.forEach(n=>{a.add(n)});const u=p.filter(n=>a.has(n));S(u)};return p.length===0?null:e.jsxs("div",{style:{width:"100%",marginBottom:24,direction:w?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:w?"row-reverse":"row",gap:12,overflowX:"auto",paddingBottom:8,WebkitOverflowScrolling:"touch",flexWrap:"nowrap"},children:[e.jsxs("div",{style:{fontSize:14,color:"#555",whiteSpace:"nowrap",display:"flex",alignItems:"center",height:"40px",flexShrink:0,padding:w?"0 0 0 4px":"0 4px 0 0"},children:[P("Filter"),":"]}),k.map(o=>e.jsx("button",{onClick:()=>A(o),style:{padding:"6px 12px",borderRadius:16,fontSize:13,cursor:"pointer",border:"1px solid #ddd",backgroundColor:h.includes(o)?"#2196f3":"#fff",color:h.includes(o)?"#fff":"#333",whiteSpace:"nowrap",transition:"all 0.2s ease",flexShrink:0,height:"40px"},children:o},o))]}),h.length>1&&e.jsx("div",{style:{marginTop:8,fontSize:13,color:"#555",fontStyle:"italic",textAlign:w?"right":"left"},children:P("Showing albums with all selected contacts")}),e.jsx("style",{children:`
          div::-webkit-scrollbar {
            display: none;
          }
        `})]})},we=({folder:t,openFilePicker:y,cognitoUsername:d,updateProfileIds:P})=>{const{t:f,language:w}=_(),p=N(w)==="rtl",[D,h]=x.useState(!1),[g,k]=x.useState(!1),[S,A]=x.useState(t.profileIds||[]),j=d?`${d}_____Public____Profile`:"",o=S.includes(j),a=H(t.folderId,t.albumNanoId,t.folderName);x.useEffect(()=>{A(t.profileIds||[])},[t.profileIds]);const u=s=>{navigator.clipboard.writeText(s).then(()=>{h(!1),k(!0)}).catch(b=>{console.error("Failed to copy link:",b),alert(f("Failed to copy link"))})},n=async s=>{if(s.preventDefault(),s.stopPropagation(),!await de()){alert(f("You must be logged in to download photos"));return}if(t&&t.files&&t.files.length>0){const m=t.files.map((C,F)=>{const l=C.dataKey.toLowerCase().endsWith(".mp4")?"video":"image";return{url:`${z}${C.dataKey}`,thumbnailUrl:C.thumbnailDataKey?`${z}${C.thumbnailDataKey}`:void 0,type:l,index:F,id:`file-${F}`,fileId:C.dataKey,loaded:!1}}),i={mediaItems:m,folderName:t.folderName||"Album"};re(i,f,C=>{window.open(m[C].url,"_blank")})}else alert(f("No items to download"))},c=async s=>{var b,m,i;if(s.preventDefault(),s.stopPropagation(),!d){alert(f("You must be logged in to perform this action"));return}try{const v=await E();if(!v){console.error("Authentication failed");return}const C=[...S];if(o){const $=C.indexOf(j);$>-1&&C.splice($,1)}else C.push(j);const R=await(await fetch(M,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${v}`},body:JSON.stringify({query:`
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
      `,variables:{folderPositionChangeProfileIdsInput:{folderId:t.folderId,profileIds:C}}})})).json();if(R.errors)throw new Error(((b=R.errors[0])==null?void 0:b.message)||"Unknown error");const T=(((i=(m=R==null?void 0:R.data)==null?void 0:m.changeFiles)==null?void 0:i.items)||[]).find($=>$.id===t.folderPositionId);T&&T.profileIds&&(A(T.profileIds),P&&P(T.profileIds),console.log("Album visibility updated successfully"))}catch(v){console.error("Failed to toggle album visibility:",v),alert(f("Failed to update album visibility. Please try again."))}},r={padding:"8px 12px",border:"none",borderRadius:6,cursor:"pointer",fontSize:14,textAlign:"center",whiteSpace:"nowrap",flexShrink:0};return e.jsx(e.Fragment,{children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:16,flexDirection:p?"row-reverse":"row"},children:[e.jsx("div",{style:{display:"flex",width:"100%",overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none",WebkitOverflowScrolling:"touch",flexDirection:p?"row-reverse":"row",gap:"10px"},children:e.jsxs("div",{style:{display:"flex",gap:"10px",flexDirection:p?"row-reverse":"row"},children:[e.jsx("button",{onClick:s=>{s.preventDefault(),s.stopPropagation(),y(t.folderId)},style:{...r,backgroundColor:"#4caf50",color:"white"},children:f("Add Photos")}),e.jsx("button",{onClick:n,style:{...r,backgroundColor:"#e0e0e0"},children:f("Download")}),e.jsx("button",{onClick:s=>{s.preventDefault(),s.stopPropagation(),h(!0)},style:{...r,backgroundColor:"#e0e0e0"},children:f("Copy Link")}),e.jsx("button",{onClick:c,style:{...r,backgroundColor:o?"#4caf50":"#e0e0e0",color:o?"white":"inherit"},children:f(o?"On Public Profile":"Not On Public Profile")})]})}),e.jsx(ge,{isOpen:D,onClose:()=>h(!1),inviteLink:a,onCopy:u,t:f,isRTL:p}),e.jsx(me,{isOpen:g,onClose:()=>k(!1),t:f,isRTL:p}),e.jsx("style",{children:`
            div::-webkit-scrollbar {
              display: none;
            }
          `})]})})},Ce=I.div`
  margin-bottom: 30px;
  width: 100%;
  direction: ${t=>t.isRTL?"rtl":"ltr"};
`,Ie=I.a`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  overflow: hidden;
`,ve=I.div`
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
`,Pe=I.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
  flex-direction: ${t=>t.isRTL?"row-reverse":"row"};
`,Se=I.div`
  display: flex;
  flex-direction: column;
  align-items: ${t=>t.isRTL?"flex-end":"flex-start"};
`,je=I.h2`
  font-size: 20px;
  margin: 0;
  color: #222;
`,ke=I.div`
  font-size: 13px;
  color: #777;
  text-align: ${t=>t.isRTL?"right":"left"};
  margin-top: 4px;
`,Fe=I.div`
  display: flex;
  flex-direction: column;
  align-items: ${t=>t.isRTL?"flex-start":"flex-end"};
  justify-content: flex-end;
  gap: 8px;
`,De=I.div`
  position: relative;
`,Ae=I.a`
  font-size: 13px;
  color: #2196f3;
  text-decoration: none;
`,Le=I.a`
  font-size: 13px;
  color: #d32f2f;
  text-decoration: none;
`,Re=I.div`
  display: none;
  position: absolute;
  top: 100%;
  right: ${t=>t.isRTL?"auto":0};
  left: ${t=>t.isRTL?0:"auto"};
  background-color: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-radius: 4px;
  z-index: 10;
  min-width: 150px;
  padding: 8px 0;
  margin-top: 5px;
  text-align: ${t=>t.isRTL?"right":"left"};
`,Q=I.a`
  display: block;
  padding: 8px 16px;
  color: ${t=>t.isDelete?"#d32f2f":"#2196f3"};
  text-decoration: none;
  font-size: 13px;
  white-space: nowrap;
`,Te=I.div`
  width: 100%;
  position: relative;
`,$e=I.div`
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding-bottom: 8px;
  ms-overflow-style: none;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
  max-width: 100%;
  flex-direction: ${t=>t.isRTL?"row-reverse":"row"};
`,_e=I.div`
  position: absolute;
  ${t=>t.isRTL?"left":"right"}: 0;
  top: 0;
  bottom: 8px;
  width: 30px;
  background: ${t=>t.isRTL?"linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))":"linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))"};
  pointer-events: none;
`,Ne=I.div`
  display: flex;
  justify-content: ${t=>t.isRTL?"flex-start":"flex-end"};
  margin-top: 8px;
  margin-bottom: 8px;
`,Ee=I.div`
  width: 100%;
  background-color: #f0f7ff;
  border-radius: 8px;
  padding: 12px 16px;
  margin-top: 16px;
  box-sizing: border-box;
  border: 1px solid #d0e1f9;
  direction: ${t=>t.isRTL?"rtl":"ltr"};
`,Ue=I.p`
  margin: 0;
  font-size: 14px;
  color: #333;
  text-align: ${t=>t.isRTL?"right":"left"};
`,Oe=I.p`
  font-size: 16px;
  color: #555;
  width: 100%;
`,ze=I.div`
  width: 160px;
  height: 100px;
  flex-shrink: 0;
`,Me=({folders:t,setFolders:y,handleDeleteClick:d,openFilePicker:P,isUploading:f,cognitoUsername:w})=>{const{t:p,language:D}=_(),h=N(D)==="rtl",g=x.useRef(null);x.useEffect(()=>{function o(){g.current&&(g.current.style.display="none",g.current=null)}function a(){o()}return window.addEventListener("scroll",a,!0),()=>{window.removeEventListener("scroll",a,!0)}},[]);const k=(o,a)=>{o.preventDefault(),o.stopPropagation(),g.current&&g.current!==a&&(g.current.style.display="none");const u=a.style.display==="block";a.style.display=u?"none":"block",g.current=u?null:a},S=o=>{g.current&&(g.current.style.display="none",g.current=null),window.confirm(p("Are you sure you want to delete this album? This action cannot be undone."))&&d(o)},A=(o,a)=>{y(u=>u.map(n=>n.folderId===o?{...n,profileIds:a}:n))},j=o=>{switch(o){case"NotVisible":return p("Hidden");case"Watermark":return p("Watermarked");case"CannotBeSaved":return p("Cannot be saved");case"NoPassword":default:return p("No password")}};return t.length===0&&!f?e.jsx(Oe,{children:p("No albums found")}):e.jsx(e.Fragment,{children:t.map(o=>{var m;const a=o.createdAt!=null,u=o.updatedAt!=null&&o.updatedAt!==o.createdAt,n=o.creatorId===`${w}_____${w}____Account`,c=((m=o.folderPassword)==null?void 0:m.policy)||"NoPassword",r=o.contacts||{},s=Object.values(r).filter(i=>i&&typeof i=="string"&&!i.toString().startsWith("Profile-")),b=H(o.folderId,o.albumNanoId,o.folderName);return e.jsx(Ce,{isRTL:h,children:e.jsx(Ie,{href:b,children:e.jsxs(ve,{children:[e.jsxs(Pe,{isRTL:h,children:[e.jsxs(Se,{isRTL:h,children:[e.jsx(je,{children:o.folderName||""}),(a||u)&&e.jsxs(ke,{isRTL:h,children:[a&&e.jsxs("div",{children:[p("Created"),": ",V(o.createdAt)]}),u&&e.jsxs("div",{children:[p("Updated"),": ",V(o.updatedAt)]})]})]}),e.jsx(Fe,{isRTL:h,children:n?e.jsxs(De,{children:[e.jsx(Ae,{href:"#",onClick:i=>{const v=i.currentTarget.nextElementSibling;v&&k(i,v)},children:p("Edit")}),e.jsxs(Re,{isRTL:h,onClick:i=>{i.stopPropagation()},children:[e.jsx(Q,{href:`/save-album.html?folderId=${encodeURIComponent(o.folderId)}`,onClick:i=>{i.stopPropagation()},children:p("Edit Details")}),e.jsx(Q,{href:"#",isDelete:!0,onClick:i=>{i.preventDefault(),i.stopPropagation(),S(o.folderPositionId)},children:p("Delete My Copy")})]})]}):e.jsx(Le,{href:"#",onClick:i=>{i.preventDefault(),i.stopPropagation(),S(o.folderPositionId)},children:p("Delete")})})]}),o.folderDescription&&o.folderDescription.length>1&&e.jsx(Y,{isRTL:h,children:o.folderDescription}),e.jsxs(Te,{children:[e.jsx($e,{isRTL:h,children:o.files.map((i,v)=>e.jsx(ze,{children:e.jsx(ne,{thumbnailDataKey:i.thumbnailDataKey,dataKey:i.dataKey,src:`${z}${i.thumbnailDataKey||i.dataKey}`,alt:p("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},v))}),o.files.length>3&&e.jsx(_e,{isRTL:h})]}),e.jsx(Ne,{isRTL:h,children:c!=="NoPassword"&&e.jsx(q,{children:e.jsx("span",{children:j(c)})})}),e.jsx(we,{folder:o,openFilePicker:P,cognitoUsername:w,updateProfileIds:i=>A(o.folderId,i)}),s.length>0&&e.jsx(Ee,{isRTL:h,children:e.jsxs(Ue,{isRTL:h,children:[p("Shared with"),": ",s.join(", ")]})})]})})},o.folderId)})})},We=t=>{const y=x.useRef(null),[d,P]=x.useState([]),[f,w]=x.useState(!1),[p,D]=x.useState({totalFiles:0,filesComplete:0,filesUploading:0,filesProcessing:0,filesWithError:0,overallProgress:0}),[h,g]=x.useState([]),[k,S]=x.useState(null),[A,j]=x.useState(!1),o=ce(g);x.useEffect(()=>{O(d,D)},[d]),x.useEffect(()=>{if(A&&d.length>0){const r=d.filter(b=>b.status==="complete").length,s=d.filter(b=>b.status==="error").length;o(`✅ Upload complete: ${r} successful, ${s} failed`),setTimeout(()=>{k?window.location.href=`/save-album.html?folderId=${encodeURIComponent(k)}`:window.location.href="/save-album.html",a()},1e3)}},[A,d.length,k]);const a=()=>{pe(P,D,[],o),w(!1),j(!1)},u=(r=null)=>{var s;S(r),P([]),j(!1),(s=y.current)==null||s.click()},n=he(P);return{fileInputRef:y,selectedPhotos:d,isUploading:f,progressTracker:p,debugMessages:h,openFilePicker:u,handleFileSelection:async r=>{const s=Array.from(r.target.files||[]);if(!s.length)return;if(w(!0),j(!1),!await E()){o("❌ Authentication failed"),w(!1);return}if(!t){o("❌ Missing Cognito Username"),w(!1);return}try{const m=k||`${t}_____${ue()}____Folder`;o(`📁 Using folder ID: ${m}`),P(s.map(l=>({fileName:l.name,s3PreviewUrl:URL.createObjectURL(l),type:l.type,size:l.size,status:"pending",progress:0})));const i=setInterval(()=>{O(d,D)},500),v=await fe(s,t,n,o);clearInterval(i),O(v,D),localStorage.setItem(W.SELECTED_PHOTOS,JSON.stringify(v)),o(`📸 Saved ${v.length} photos metadata to storage`);const C=v.every(l=>l.status==="complete"),F=v.some(l=>l.status==="error");if(C&&!F)o(`✅ All ${v.length} files successfully uploaded`);else if(F){const l=v.filter(R=>R.status==="error").length;o(`⚠️ Upload completed with ${l} errors`)}j(!0)}catch(m){o(`❌ Fatal error in handleFileSelection: ${String(m)}`),w(!1)}finally{r.target&&(r.target.value="")}},log:o}},Be=t=>{const[y,d]=x.useState([]),[P,f]=x.useState([]),[w,p]=x.useState(null),[D,h]=x.useState(null),[g,k]=x.useState(""),[S,A]=x.useState(!1);x.useEffect(()=>{p(localStorage.getItem(W.PUBLIC_USERNAME)||null),(async()=>{const c=await E();if(c){try{const s=JSON.parse(atob(c.split(".")[1]))["cognito:username"];h(s)}catch(r){console.error("Failed to decode token",r)}await a(c)}})()},[]),x.useEffect(()=>{S||f(y)},[y,S]),x.useEffect(()=>{if(g===""){S||f(y);return}const c=(S?P:y).filter(r=>{var m,i;const s=(m=r.folderName)==null?void 0:m.toLowerCase().includes(g.toLowerCase()),b=(i=r.folderDescription)==null?void 0:i.toLowerCase().includes(g.toLowerCase());return s||b});f(c)},[g,y,S]);const j=n=>{A(!0),f(n),g&&f(c=>c.filter(r=>{var m,i;const s=(m=r.folderName)==null?void 0:m.toLowerCase().includes(g.toLowerCase()),b=(i=r.folderDescription)==null?void 0:i.toLowerCase().includes(g.toLowerCase());return s||b}))},o=()=>{A(!1),f(g?y.filter(n=>{var s,b;const c=(s=n.folderName)==null?void 0:s.toLowerCase().includes(g.toLowerCase()),r=(b=n.folderDescription)==null?void 0:b.toLowerCase().includes(g.toLowerCase());return c||r}):y)},a=async n=>{var s,b;const c=`
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
    `,r={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:50,scanIndexForward:!1}};try{const i=await(await fetch(M,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({query:c,variables:r})})).json(),C=(((b=(s=i==null?void 0:i.data)==null?void 0:s.fetchRelations)==null?void 0:b.items)||[]).map(F=>{var T,$,B,K;const l=F.folder,R=(($=(T=l==null?void 0:l.fileReferencesPage)==null?void 0:T.items)==null?void 0:$.map(L=>L.file))||[],U={};return(B=l==null?void 0:l.contactsUsingInvite)!=null&&B.items&&l.contactsUsingInvite.items.forEach(L=>{var G;L!=null&&L.id&&((G=L==null?void 0:L.item)!=null&&G.publicDisplayName)&&(U[L.id]=L.item.publicDisplayName)}),{folderPositionId:F.id,folderId:l.id,albumNanoId:l.albumNanoId,folderName:l.folderName,folderDescription:l.folderDescription,folderPassword:l.folderPassword,creatorId:l.creatorId,createdAt:l.createdAt,updatedAt:l.updatedAt,files:R.filter(L=>L&&L.dataKey),profileIds:F.profileIds||[],contacts:U,usingFolderInviteGrantsRightToAddItems:((K=l==null?void 0:l.folderInviteParameters)==null?void 0:K.usingFolderInviteGrantsRightToAddItems)||!1}});d(C)}catch(m){console.error("Failed to load folders:",m),t(`❌ Failed to fetch folders: ${String(m)}`)}};return{folders:y,filteredFolders:P,publicUsername:w,cognitoUsername:D,searchQuery:g,setSearchQuery:k,handleContactFilterChange:j,resetContactFilter:o,handleDeleteClick:async(n,c)=>{var r,s,b;try{console.log("Deleting album with id:",n);const m=await E();if(!m){console.error("Authentication failed");return}const C=await(await fetch(M,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${m}`},body:JSON.stringify({query:`
        mutation DeleteFolderPosition($deletedFolderPositionIds: [ID!]) {
          changeFiles(deletedFolderPositionIds: $deletedFolderPositionIds) {
            items {
              ... on IdObject {
                id
              }
            }
          }
        }
      `,variables:{deletedFolderPositionIds:[n]}})})).json();if((s=(r=C==null?void 0:C.data)==null?void 0:r.changeFiles)!=null&&s.items)t(`✅ Successfully deleted folder position ${n}`),d(F=>F.filter(l=>l.folderPositionId!==n));else if(C.errors){const F=((b=C.errors[0])==null?void 0:b.message)||"Unknown GraphQL error";throw t(`❌ Failed to delete folder: ${F}`),new Error(F)}}catch(m){t(`❌ Failed to delete folder: ${String(m)}`),console.error("Failed to delete folder:",m),alert(c("Failed to delete album. Please try again."))}},setFolders:d}},Ke=()=>{const{t,language:y}=_(),d=N(y)==="rtl",{folders:P,filteredFolders:f,publicUsername:w,cognitoUsername:p,searchQuery:D,setSearchQuery:h,handleContactFilterChange:g,resetContactFilter:k,handleDeleteClick:S,setFolders:A}=Be(s=>r(s)),{fileInputRef:j,isUploading:o,progressTracker:a,debugMessages:u,openFilePicker:n,handleFileSelection:c,log:r}=We(p);return e.jsxs(e.Fragment,{children:[e.jsx(ee,{}),e.jsxs(te,{isRTL:d,children:[e.jsxs("div",{style:{maxWidth:900,margin:"0 auto"},children:[e.jsx(xe,{publicUsername:w,isUploading:o,openFilePicker:n,cognitoUsername:p}),e.jsx(be,{isUploading:o,openFilePicker:n,t,isRTL:d}),e.jsx(ie,{searchQuery:D,setSearchQuery:h,t,isRTL:d}),e.jsx(ye,{folders:P,onFilterChange:g,resetFilter:k}),o&&e.jsxs("div",{style:{width:"100%",marginBottom:"20px"},children:[e.jsx(ae,{progressTracker:a,t,isRTL:d}),a.filesComplete>0&&a.filesComplete===a.totalFiles&&e.jsx("div",{style:{backgroundColor:"#e8f5e9",color:"#2e7d32",padding:"10px 16px",borderRadius:"6px",fontSize:"14px",marginTop:"10px",textAlign:"center"},children:t("Upload complete! Preparing to save your album...")}),a.filesWithError>0&&e.jsx("div",{style:{backgroundColor:"#ffebee",color:"#c62828",padding:"10px 16px",borderRadius:"6px",fontSize:"14px",marginTop:"10px",textAlign:"center"},children:t("Some files could not be uploaded. You can continue with the successfully uploaded files.")})]}),e.jsx(Me,{folders:f,setFolders:A,handleDeleteClick:s=>S(s,t),openFilePicker:n,isUploading:o,cognitoUsername:p}),e.jsx(le,{onFileSelection:c,ref:j})]}),e.jsx(se,{debugMessages:u,t,isRTL:d,textDirection:d?"rtl":"ltr"})]})]})};X.createRoot(document.getElementById("root")).render(e.jsx(Z,{initialLanguage:localStorage.getItem(W.LANGUAGE)||"en",children:e.jsx(Ke,{})}));
