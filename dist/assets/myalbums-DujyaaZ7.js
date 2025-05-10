import{u as E,j as e,a2 as J,g as U,r as x,a8 as M,k as W,d as C,l as Q,a as Y,I as q,G as X,A as Z}from"./styled-components-DeF80woq.js";import{L as ee,D as te}from"./DebugLog-BNpFKV4o.js";import{L as oe,S as se}from"./LazyImage-Dzo2IYlW.js";import{d as ie,U as ne,F as re}from"./FileInput-vuellcgE.js";import{h as H,c as le,b as N,i as G,u as z,e as ae,d as de,g as ce,p as pe,f as fe}from"./utils-BuxFU1vl.js";import{C as ue,a as he}from"./Modals-WUDzHFdc.js";const ge=({publicUsername:t,cognitoUsername:b})=>{const{t:d,language:P}=E(),h=U(P)==="rtl",I=b?encodeURIComponent(b):"";return e.jsx(e.Fragment,{children:e.jsx("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,width:"100%",direction:h?"rtl":"ltr"},children:t&&e.jsxs(e.Fragment,{children:[e.jsxs(J,{href:`profile.html?id=${I}`,children:[e.jsx("span",{style:{fontSize:"16px",lineHeight:1,marginRight:"6px"},children:"👤"}),t||d("Profile")]}),e.jsx(ee,{t:d})]})})})},me=({isUploading:t,openFilePicker:b,t:d})=>e.jsx("div",{style:{display:"flex",alignItems:"center",marginBottom:24,width:"100%"},children:e.jsx("button",{onClick:()=>b(null),style:{fontSize:"14px",padding:"8px 16px",backgroundColor:"#007bff",color:"white",border:"none",borderRadius:"6px",cursor:"pointer",opacity:t?.6:1,pointerEvents:t?"none":"auto"},disabled:t,children:d(t?"Uploading...":"Create Album")})}),xe=({folders:t,onFilterChange:b,resetFilter:d})=>{const{t:P,language:h}=E(),I=U(h)==="rtl",[p,D]=x.useState([]),[g,m]=x.useState([]),[k,j]=x.useState([]);x.useEffect(()=>{const o=new Map;t.forEach(f=>{if(f.contacts){const s=f.updatedAt?new Date(f.updatedAt).getTime():f.createdAt?new Date(f.createdAt).getTime():0;Object.values(f.contacts).forEach(c=>{if(typeof c=="string"&&!c.toString().startsWith("Profile-")){const r=o.get(c);(!r||s>r.timestamp)&&o.set(c,{name:c,timestamp:s})}})}});const n=Array.from(o.values()).sort((f,s)=>s.timestamp-f.timestamp).map(f=>f.name);D(n),j(n)},[t]);const L=o=>{let n;if(g.includes(o)?n=g.filter(f=>f!==o):n=[...g,o],m(n),n.length===0)d(),j(p);else{const f=t.filter(s=>{if(!s.contacts)return!1;const c=Object.values(s.contacts).filter(r=>typeof r=="string"&&!r.toString().startsWith("Profile-"));return n.every(r=>c.includes(r))});F(f),b(f)}},F=o=>{const n=new Set;o.forEach(s=>{s.contacts&&Object.values(s.contacts).forEach(c=>{typeof c=="string"&&!c.toString().startsWith("Profile-")&&n.add(c)})}),g.forEach(s=>{n.add(s)});const f=p.filter(s=>n.has(s));j(f)};return p.length===0?null:e.jsxs("div",{style:{width:"100%",marginBottom:24,direction:I?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:I?"row-reverse":"row",gap:12,overflowX:"auto",paddingBottom:8,WebkitOverflowScrolling:"touch",flexWrap:"nowrap"},children:[e.jsxs("div",{style:{fontSize:14,color:"#555",whiteSpace:"nowrap",display:"flex",alignItems:"center",height:"40px",flexShrink:0,padding:I?"0 0 0 4px":"0 4px 0 0"},children:[P("Filter"),":"]}),k.map(o=>e.jsx("button",{onClick:()=>L(o),style:{padding:"6px 12px",borderRadius:16,fontSize:13,cursor:"pointer",border:"1px solid #ddd",backgroundColor:g.includes(o)?"#2196f3":"#fff",color:g.includes(o)?"#fff":"#333",whiteSpace:"nowrap",transition:"all 0.2s ease",flexShrink:0,height:"40px"},children:o},o))]}),g.length>1&&e.jsxs("div",{style:{marginTop:8,fontSize:13,color:"#555",fontStyle:"italic",textAlign:I?"right":"left"},children:[P("Showing albums with all")," ",g.length," ",P("selected contacts")]}),e.jsx("style",{children:`
          div::-webkit-scrollbar {
            display: none;
          }
        `})]})},ye=({folder:t,openFilePicker:b,cognitoUsername:d,updateProfileIds:P})=>{const{t:h,language:I}=E(),p=U(I)==="rtl",[D,g]=x.useState(!1),[m,k]=x.useState(!1),[j,L]=x.useState(t.profileIds||[]),F=d?`${d}_____Public____Profile`:"",o=j.includes(F),f=`https://6180.io/photos.html?id=${H(t.folderId).replace(/-/g,"")}`;x.useEffect(()=>{L(t.profileIds||[])},[t.profileIds]);const s=u=>{navigator.clipboard.writeText(u).then(()=>{g(!1),k(!0)}).catch(y=>{console.error("Failed to copy link:",y),alert(h("Failed to copy link"))})},c=async u=>{if(u.preventDefault(),u.stopPropagation(),!await le()){alert(h("You must be logged in to download photos"));return}if(t&&t.files&&t.files.length>0){const v=t.files.map((w,a)=>{const _=w.dataKey.toLowerCase().endsWith(".mp4")?"video":"image";return{url:`${M}${w.dataKey}`,thumbnailUrl:w.thumbnailDataKey?`${M}${w.thumbnailDataKey}`:void 0,type:_,index:a,id:`file-${a}`,fileId:w.dataKey,loaded:!1}}),i={mediaItems:v,folderName:t.folderName||"Album"};ie(i,h,w=>{window.open(v[w].url,"_blank")})}else alert(h("No items to download"))},r=async u=>{var y,v,i;if(u.preventDefault(),u.stopPropagation(),!d){alert(h("You must be logged in to perform this action"));return}try{const S=await N();if(!S){console.error("Authentication failed");return}const w=[...j];if(o){const $=w.indexOf(F);$>-1&&w.splice($,1)}else w.push(F);const T=await(await fetch(W,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${S}`},body:JSON.stringify({query:`
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
      `,variables:{folderPositionChangeProfileIdsInput:{folderId:t.folderId,profileIds:w}}})})).json();if(T.errors)throw new Error(((y=T.errors[0])==null?void 0:y.message)||"Unknown error");const R=(((i=(v=T==null?void 0:T.data)==null?void 0:v.changeFiles)==null?void 0:i.items)||[]).find($=>$.id===t.folderPositionId);R&&R.profileIds&&(L(R.profileIds),P&&P(R.profileIds),console.log("Album visibility updated successfully"))}catch(S){console.error("Failed to toggle album visibility:",S),alert(h("Failed to update album visibility. Please try again."))}},l={padding:"8px 12px",border:"none",borderRadius:6,cursor:"pointer",fontSize:14,textAlign:"center",whiteSpace:"nowrap",flexShrink:0};return e.jsx(e.Fragment,{children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:16,flexDirection:p?"row-reverse":"row"},children:[e.jsx("div",{style:{display:"flex",width:"100%",overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none",WebkitOverflowScrolling:"touch",flexDirection:p?"row-reverse":"row",gap:"10px"},children:e.jsxs("div",{style:{display:"flex",gap:"10px",flexDirection:p?"row-reverse":"row"},children:[e.jsx("button",{onClick:u=>{u.preventDefault(),u.stopPropagation(),b(t.folderId)},style:{...l,backgroundColor:"#4caf50",color:"white"},children:h("Add Photos")}),e.jsx("button",{onClick:c,style:{...l,backgroundColor:"#e0e0e0"},children:h("Download")}),e.jsx("button",{onClick:u=>{u.preventDefault(),u.stopPropagation(),g(!0)},style:{...l,backgroundColor:"#e0e0e0"},children:h("Copy Link")}),e.jsx("button",{onClick:r,style:{...l,backgroundColor:o?"#4caf50":"#e0e0e0",color:o?"white":"inherit"},children:h(o?"On Public Profile":"Not On Public Profile")})]})}),e.jsx(ue,{isOpen:D,onClose:()=>g(!1),inviteLink:f,onCopy:s,t:h,isRTL:p}),e.jsx(he,{isOpen:m,onClose:()=>k(!1),t:h,isRTL:p}),e.jsx("style",{children:`
            div::-webkit-scrollbar {
              display: none;
            }
          `})]})})},be=C.div`
  margin-bottom: 30px;
  width: 100%;
  direction: ${t=>t.isRTL?"rtl":"ltr"};
`,we=C.a`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  overflow: hidden;
`,Ce=C.div`
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
`,Ie=C.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
  flex-direction: ${t=>t.isRTL?"row-reverse":"row"};
`,ve=C.div`
  display: flex;
  flex-direction: column;
  align-items: ${t=>t.isRTL?"flex-end":"flex-start"};
`,Pe=C.h2`
  font-size: 20px;
  margin: 0;
  color: #222;
`,Se=C.div`
  font-size: 13px;
  color: #777;
  text-align: ${t=>t.isRTL?"right":"left"};
  margin-top: 4px;
`,je=C.div`
  display: flex;
  flex-direction: column;
  align-items: ${t=>t.isRTL?"flex-start":"flex-end"};
  justify-content: flex-end;
  gap: 8px;
`,Fe=C.div`
  position: relative;
`,ke=C.a`
  font-size: 13px;
  color: #2196f3;
  text-decoration: none;
`,De=C.a`
  font-size: 13px;
  color: #d32f2f;
  text-decoration: none;
`,Le=C.div`
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
`,V=C.a`
  display: block;
  padding: 8px 16px;
  color: ${t=>t.isDelete?"#d32f2f":"#2196f3"};
  text-decoration: none;
  font-size: 13px;
  white-space: nowrap;
`,Ae=C.div`
  margin-top: 8px;
  margin-bottom: 16px;
  font-size: 12px;
  color: #555;
  line-height: 1.5;
  text-align: ${t=>t.isRTL?"right":"left"};
  white-space: pre-wrap;
`,Te=C.div`
  width: 100%;
  position: relative;
`,Re=C.div`
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding-bottom: 8px;
  ms-overflow-style: none;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
  max-width: 100%;
  flex-direction: ${t=>t.isRTL?"row-reverse":"row"};
`,$e=C.div`
  position: absolute;
  ${t=>t.isRTL?"left":"right"}: 0;
  top: 0;
  bottom: 8px;
  width: 30px;
  background: ${t=>t.isRTL?"linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))":"linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))"};
  pointer-events: none;
`,_e=C.div`
  display: flex;
  justify-content: ${t=>t.isRTL?"flex-start":"flex-end"};
  margin-top: 8px;
  margin-bottom: 8px;
`,Ee=C.div`
  display: flex;
  align-items: center;
  font-size: 10px;
  color: #555;
  font-style: italic;
`,Ue=C.div`
  width: 100%;
  background-color: #f0f7ff;
  border-radius: 8px;
  padding: 12px 16px;
  margin-top: 16px;
  box-sizing: border-box;
  border: 1px solid #d0e1f9;
  direction: ${t=>t.isRTL?"rtl":"ltr"};
`,Ne=C.p`
  margin: 0;
  font-size: 14px;
  color: #333;
  text-align: ${t=>t.isRTL?"right":"left"};
`,Oe=C.p`
  font-size: 16px;
  color: #555;
  width: 100%;
`,ze=C.div`
  width: 160px;
  height: 100px;
  flex-shrink: 0;
`,Me=({folders:t,setFolders:b,handleDeleteClick:d,openFilePicker:P,isUploading:h,cognitoUsername:I})=>{const{t:p,language:D}=E(),g=U(D)==="rtl",m=x.useRef(null);x.useEffect(()=>{function o(){m.current&&(m.current.style.display="none",m.current=null)}function n(){o()}return window.addEventListener("scroll",n,!0),()=>{window.removeEventListener("scroll",n,!0)}},[]);const k=(o,n)=>{o.preventDefault(),o.stopPropagation(),m.current&&m.current!==n&&(m.current.style.display="none");const f=n.style.display==="block";n.style.display=f?"none":"block",m.current=f?null:n},j=o=>{m.current&&(m.current.style.display="none",m.current=null),window.confirm(p("Are you sure you want to delete this album? This action cannot be undone."))&&d(o)},L=(o,n)=>{b(f=>f.map(s=>s.folderId===o?{...s,profileIds:n}:s))},F=o=>{switch(o){case"NotVisible":return p("Hidden");case"Watermark":return p("Watermarked");case"CannotBeSaved":return p("Cannot be saved");case"NoPassword":default:return p("No password")}};return t.length===0&&!h?e.jsx(Oe,{children:p("No albums found")}):e.jsx(e.Fragment,{children:t.map(o=>{var v;const n=o.createdAt!=null,f=o.updatedAt!=null&&o.updatedAt!==o.createdAt,s=o.creatorId===`${I}_____${I}____Account`,c=((v=o.folderPassword)==null?void 0:v.policy)||"NoPassword",r=o.contacts||{},l=Object.values(r).filter(i=>i&&typeof i=="string"&&!i.toString().startsWith("Profile-")),y=`https://6180.io/photos.html?id=${H(o.folderId).replace(/-/g,"")}`;return e.jsx(be,{isRTL:g,children:e.jsx(we,{href:y,children:e.jsxs(Ce,{children:[e.jsxs(Ie,{isRTL:g,children:[e.jsxs(ve,{isRTL:g,children:[e.jsx(Pe,{children:o.folderName||""}),(n||f)&&e.jsxs(Se,{isRTL:g,children:[n&&e.jsxs("div",{children:[p("Created"),": ",G(o.createdAt)]}),f&&e.jsxs("div",{children:[p("Updated"),": ",G(o.updatedAt)]})]})]}),e.jsx(je,{isRTL:g,children:s?e.jsxs(Fe,{children:[e.jsx(ke,{href:"#",onClick:i=>{const S=i.currentTarget.nextElementSibling;S&&k(i,S)},children:p("Edit")}),e.jsxs(Le,{isRTL:g,onClick:i=>{i.stopPropagation()},children:[e.jsx(V,{href:`/save-album.html?folderId=${encodeURIComponent(o.folderId)}`,onClick:i=>{i.stopPropagation()},children:p("Edit Details")}),e.jsx(V,{href:"#",isDelete:!0,onClick:i=>{i.preventDefault(),i.stopPropagation(),j(o.folderPositionId)},children:p("Delete My Copy")})]})]}):e.jsx(De,{href:"#",onClick:i=>{i.preventDefault(),i.stopPropagation(),j(o.folderPositionId)},children:p("Delete")})})]}),o.folderDescription&&o.folderDescription.length>1&&e.jsx(Ae,{isRTL:g,children:o.folderDescription}),e.jsxs(Te,{children:[e.jsx(Re,{isRTL:g,children:o.files.map((i,S)=>e.jsx(ze,{children:e.jsx(oe,{thumbnailDataKey:i.thumbnailDataKey,dataKey:i.dataKey,src:`${M}${i.thumbnailDataKey||i.dataKey}`,alt:p("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},S))}),o.files.length>3&&e.jsx($e,{isRTL:g})]}),e.jsx(_e,{isRTL:g,children:c!=="NoPassword"&&e.jsx(Ee,{children:e.jsx("span",{children:F(c)})})}),e.jsx(ye,{folder:o,openFilePicker:P,cognitoUsername:I,updateProfileIds:i=>L(o.folderId,i)}),l.length>0&&e.jsx(Ue,{isRTL:g,children:e.jsxs(Ne,{isRTL:g,children:[p("Shared with"),": ",l.join(", ")]})})]})})},o.folderId)})})},We=t=>{const b=x.useRef(null),[d,P]=x.useState([]),[h,I]=x.useState(!1),[p,D]=x.useState({totalFiles:0,filesComplete:0,filesUploading:0,filesProcessing:0,filesWithError:0,overallProgress:0}),[g,m]=x.useState([]),[k,j]=x.useState(null),[L,F]=x.useState(!1),o=ae(m);x.useEffect(()=>{z(d,D)},[d]),x.useEffect(()=>{if(L&&d.length>0){const r=d.filter(u=>u.status==="complete").length,l=d.filter(u=>u.status==="error").length;o(`✅ Upload complete: ${r} successful, ${l} failed`),setTimeout(()=>{k?window.location.href=`/save-album.html?folderId=${encodeURIComponent(k)}`:window.location.href="/save-album.html",n()},1e3)}},[L,d.length,k]);const n=()=>{de(P,D,[],o),I(!1),F(!1)},f=(r=null)=>{var l;j(r),P([]),F(!1),(l=b.current)==null||l.click()},s=fe(P);return{fileInputRef:b,selectedPhotos:d,isUploading:h,progressTracker:p,debugMessages:g,openFilePicker:f,handleFileSelection:async r=>{const l=Array.from(r.target.files||[]);if(!l.length)return;if(I(!0),F(!1),!await N()){o("❌ Authentication failed"),I(!1);return}if(!t){o("❌ Missing Cognito Username"),I(!1);return}try{const y=k||`${t}_____${ce()}____Folder`;o(`📁 Using folder ID: ${y}`),P(l.map(a=>({fileName:a.name,s3PreviewUrl:URL.createObjectURL(a),type:a.type,size:a.size,status:"pending",progress:0})));const v=setInterval(()=>{z(d,D)},500),i=await pe(l,t,s,o);clearInterval(v),z(i,D),localStorage.setItem(Q.SELECTED_PHOTOS,JSON.stringify(i)),o(`📸 Saved ${i.length} photos metadata to storage`);const S=i.every(a=>a.status==="complete"),w=i.some(a=>a.status==="error");if(S&&!w)o(`✅ All ${i.length} files successfully uploaded`);else if(w){const a=i.filter(_=>_.status==="error").length;o(`⚠️ Upload completed with ${a} errors`)}F(!0)}catch(y){o(`❌ Fatal error in handleFileSelection: ${String(y)}`),I(!1)}finally{r.target&&(r.target.value="")}},log:o}},Ke=t=>{const[b,d]=x.useState([]),[P,h]=x.useState([]),[I,p]=x.useState(null),[D,g]=x.useState(null),[m,k]=x.useState(""),[j,L]=x.useState(!1);x.useEffect(()=>{p(localStorage.getItem("publicUsername")||null),(async()=>{const c=await N();if(c){try{const l=JSON.parse(atob(c.split(".")[1]))["cognito:username"];g(l)}catch(r){console.error("Failed to decode token",r)}await n(c)}})()},[]),x.useEffect(()=>{j||h(b)},[b,j]),x.useEffect(()=>{if(m===""){j||h(b);return}const c=(j?P:b).filter(r=>{var y,v;const l=(y=r.folderName)==null?void 0:y.toLowerCase().includes(m.toLowerCase()),u=(v=r.folderDescription)==null?void 0:v.toLowerCase().includes(m.toLowerCase());return l||u});h(c)},[m,b,j]);const F=s=>{L(!0),h(s),m&&h(c=>c.filter(r=>{var y,v;const l=(y=r.folderName)==null?void 0:y.toLowerCase().includes(m.toLowerCase()),u=(v=r.folderDescription)==null?void 0:v.toLowerCase().includes(m.toLowerCase());return l||u}))},o=()=>{L(!1),h(m?b.filter(s=>{var l,u;const c=(l=s.folderName)==null?void 0:l.toLowerCase().includes(m.toLowerCase()),r=(u=s.folderDescription)==null?void 0:u.toLowerCase().includes(m.toLowerCase());return c||r}):b)},n=async s=>{var l,u;const c=`
      mutation FetchRelations($fetchRelationsInput: FetchRelationsInput!) {
        fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
          items {
            ... on FolderPosition {
              id
              profileIds
              folder {
                id
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
    `,r={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:50,scanIndexForward:!1}};try{const v=await(await fetch(W,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify({query:c,variables:r})})).json(),S=(((u=(l=v==null?void 0:v.data)==null?void 0:l.fetchRelations)==null?void 0:u.items)||[]).map(w=>{var O,R,$,K;const a=w.folder,_=((R=(O=a==null?void 0:a.fileReferencesPage)==null?void 0:O.items)==null?void 0:R.map(A=>A.file))||[],T={};return($=a==null?void 0:a.contactsUsingInvite)!=null&&$.items&&a.contactsUsingInvite.items.forEach(A=>{var B;A!=null&&A.id&&((B=A==null?void 0:A.item)!=null&&B.publicDisplayName)&&(T[A.id]=A.item.publicDisplayName)}),{folderPositionId:w.id,folderId:a.id,folderName:a.folderName,folderDescription:a.folderDescription,folderPassword:a.folderPassword,creatorId:a.creatorId,createdAt:a.createdAt,updatedAt:a.updatedAt,files:_.filter(A=>A&&A.dataKey),profileIds:w.profileIds||[],contacts:T,usingFolderInviteGrantsRightToAddItems:((K=a==null?void 0:a.folderInviteParameters)==null?void 0:K.usingFolderInviteGrantsRightToAddItems)||!1}});d(S)}catch(y){console.error("Failed to load folders:",y),t(`❌ Failed to fetch folders: ${String(y)}`)}};return{folders:b,filteredFolders:P,publicUsername:I,cognitoUsername:D,searchQuery:m,setSearchQuery:k,handleContactFilterChange:F,resetContactFilter:o,handleDeleteClick:async(s,c)=>{var r,l,u;try{console.log("Deleting album with id:",s);const y=await N();if(!y){console.error("Authentication failed");return}const S=await(await fetch(W,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${y}`},body:JSON.stringify({query:`
        mutation DeleteFolderPosition($deletedFolderPositionIds: [ID!]) {
          changeFiles(deletedFolderPositionIds: $deletedFolderPositionIds) {
            items {
              ... on IdObject {
                id
              }
            }
          }
        }
      `,variables:{deletedFolderPositionIds:[s]}})})).json();if((l=(r=S==null?void 0:S.data)==null?void 0:r.changeFiles)!=null&&l.items)t(`✅ Successfully deleted folder position ${s}`),d(w=>w.filter(a=>a.folderPositionId!==s));else if(S.errors){const w=((u=S.errors[0])==null?void 0:u.message)||"Unknown GraphQL error";throw t(`❌ Failed to delete folder: ${w}`),new Error(w)}}catch(y){t(`❌ Failed to delete folder: ${String(y)}`),console.error("Failed to delete folder:",y),alert(c("Failed to delete album. Please try again."))}},setFolders:d}},Be=()=>{const{t,language:b}=E(),d=U(b)==="rtl",{folders:P,filteredFolders:h,publicUsername:I,cognitoUsername:p,searchQuery:D,setSearchQuery:g,handleContactFilterChange:m,resetContactFilter:k,handleDeleteClick:j,setFolders:L}=Ke(l=>r(l)),{fileInputRef:F,isUploading:o,progressTracker:n,debugMessages:f,openFilePicker:s,handleFileSelection:c,log:r}=We(p);return e.jsxs(e.Fragment,{children:[e.jsx(X,{}),e.jsxs(Z,{isRTL:d,children:[e.jsx("div",{style:{maxWidth:900,margin:"0 auto"},children:e.jsxs("div",{style:{width:"100%"},children:[e.jsx(ge,{publicUsername:I,isUploading:o,openFilePicker:s,cognitoUsername:p}),e.jsx(me,{isUploading:o,openFilePicker:s,t,isRTL:d}),e.jsx(se,{searchQuery:D,setSearchQuery:g,t,isRTL:d}),e.jsx(xe,{folders:P,onFilterChange:m,resetFilter:k}),o&&e.jsxs("div",{style:{width:"100%",marginBottom:"20px"},children:[e.jsx(ne,{progressTracker:n,t,isRTL:d}),n.filesComplete>0&&n.filesComplete===n.totalFiles&&e.jsx("div",{style:{backgroundColor:"#e8f5e9",color:"#2e7d32",padding:"10px 16px",borderRadius:"6px",fontSize:"14px",marginTop:"10px",textAlign:"center"},children:t("Upload complete! Preparing to save your album...")}),n.filesWithError>0&&e.jsx("div",{style:{backgroundColor:"#ffebee",color:"#c62828",padding:"10px 16px",borderRadius:"6px",fontSize:"14px",marginTop:"10px",textAlign:"center"},children:t("Some files could not be uploaded. You can continue with the successfully uploaded files.")})]}),e.jsx(Me,{folders:h,setFolders:L,handleDeleteClick:l=>j(l,t),openFilePicker:s,isUploading:o,cognitoUsername:p}),e.jsx(re,{onFileSelection:c,ref:F})]})}),e.jsx(te,{debugMessages:f,t,isRTL:d,textDirection:d?"rtl":"ltr"})]})]})};Y.createRoot(document.getElementById("root")).render(e.jsx(q,{initialLanguage:localStorage.getItem(Q.LANGUAGE)||"en",children:e.jsx(Be,{})}));
