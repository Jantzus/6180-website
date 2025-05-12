import{u as _,j as t,a2 as J,g as N,r as x,a8 as z,k as M,d as w,l as Q,a as Y,I as q,G as X,A as Z}from"./styled-components-TLcRmuEy.js";import{L as ee,D as te}from"./DebugLog-Ds6bRgIn.js";import{L as oe,S as se}from"./LazyImage-D1mw5-KI.js";import{d as ne,U as ie,F as re}from"./FileInput-B7S80cz_.js";import{j as H,c as le,b as E,k as G,u as O,h as ae,f as de,g as ce,p as pe,i as ue}from"./utils-BpVmj93w.js";import{C as fe,a as he}from"./Modals-ZMMoxRDS.js";const ge=({publicUsername:e,cognitoUsername:y})=>{const{t:d,language:P}=_(),f=N(P)==="rtl",C=y?encodeURIComponent(y):"";return t.jsx(t.Fragment,{children:t.jsx("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,width:"100%",direction:f?"rtl":"ltr"},children:e&&t.jsxs(t.Fragment,{children:[t.jsxs(J,{href:`profile.html?id=${C}`,children:[t.jsx("span",{style:{fontSize:"16px",lineHeight:1,marginRight:"6px"},children:"👤"}),e||d("Profile")]}),t.jsx(ee,{t:d})]})})})},me=({isUploading:e,openFilePicker:y,t:d})=>t.jsx("div",{style:{display:"flex",alignItems:"center",marginBottom:24,width:"100%"},children:t.jsx("button",{onClick:()=>y(null),style:{fontSize:"14px",padding:"8px 16px",backgroundColor:"#007bff",color:"white",border:"none",borderRadius:"6px",cursor:"pointer",opacity:e?.6:1,pointerEvents:e?"none":"auto"},disabled:e,children:d(e?"Uploading...":"Create Album")})}),xe=({folders:e,onFilterChange:y,resetFilter:d})=>{const{t:P,language:f}=_(),C=N(f)==="rtl",[p,D]=x.useState([]),[h,g]=x.useState([]),[k,S]=x.useState([]);x.useEffect(()=>{const o=new Map;e.forEach(u=>{if(u.contacts){const n=u.updatedAt?new Date(u.updatedAt).getTime():u.createdAt?new Date(u.createdAt).getTime():0;Object.values(u.contacts).forEach(c=>{if(typeof c=="string"&&!c.toString().startsWith("Profile-")){const r=o.get(c);(!r||n>r.timestamp)&&o.set(c,{name:c,timestamp:n})}})}});const l=Array.from(o.values()).sort((u,n)=>n.timestamp-u.timestamp).map(u=>u.name);D(l),S(l)},[e]);const L=o=>{let l;if(h.includes(o)?l=h.filter(u=>u!==o):l=[...h,o],g(l),l.length===0)d(),S(p);else{const u=e.filter(n=>{if(!n.contacts)return!1;const c=Object.values(n.contacts).filter(r=>typeof r=="string"&&!r.toString().startsWith("Profile-"));return l.every(r=>c.includes(r))});j(u),y(u)}},j=o=>{const l=new Set;o.forEach(n=>{n.contacts&&Object.values(n.contacts).forEach(c=>{typeof c=="string"&&!c.toString().startsWith("Profile-")&&l.add(c)})}),h.forEach(n=>{l.add(n)});const u=p.filter(n=>l.has(n));S(u)};return p.length===0?null:t.jsxs("div",{style:{width:"100%",marginBottom:24,direction:C?"rtl":"ltr"},children:[t.jsxs("div",{style:{display:"flex",flexDirection:C?"row-reverse":"row",gap:12,overflowX:"auto",paddingBottom:8,WebkitOverflowScrolling:"touch",flexWrap:"nowrap"},children:[t.jsxs("div",{style:{fontSize:14,color:"#555",whiteSpace:"nowrap",display:"flex",alignItems:"center",height:"40px",flexShrink:0,padding:C?"0 0 0 4px":"0 4px 0 0"},children:[P("Filter"),":"]}),k.map(o=>t.jsx("button",{onClick:()=>L(o),style:{padding:"6px 12px",borderRadius:16,fontSize:13,cursor:"pointer",border:"1px solid #ddd",backgroundColor:h.includes(o)?"#2196f3":"#fff",color:h.includes(o)?"#fff":"#333",whiteSpace:"nowrap",transition:"all 0.2s ease",flexShrink:0,height:"40px"},children:o},o))]}),h.length>1&&t.jsx("div",{style:{marginTop:8,fontSize:13,color:"#555",fontStyle:"italic",textAlign:C?"right":"left"},children:P("Showing albums with all selected contacts")}),t.jsx("style",{children:`
          div::-webkit-scrollbar {
            display: none;
          }
        `})]})},be=({folder:e,openFilePicker:y,cognitoUsername:d,updateProfileIds:P})=>{const{t:f,language:C}=_(),p=N(C)==="rtl",[D,h]=x.useState(!1),[g,k]=x.useState(!1),[S,L]=x.useState(e.profileIds||[]),j=d?`${d}_____Public____Profile`:"",o=S.includes(j),l=H(e.folderId,e.albumNanoId,e.folderName);x.useEffect(()=>{L(e.profileIds||[])},[e.profileIds]);const u=s=>{navigator.clipboard.writeText(s).then(()=>{h(!1),k(!0)}).catch(b=>{console.error("Failed to copy link:",b),alert(f("Failed to copy link"))})},n=async s=>{if(s.preventDefault(),s.stopPropagation(),!await le()){alert(f("You must be logged in to download photos"));return}if(e&&e.files&&e.files.length>0){const m=e.files.map((I,F)=>{const a=I.dataKey.toLowerCase().endsWith(".mp4")?"video":"image";return{url:`${z}${I.dataKey}`,thumbnailUrl:I.thumbnailDataKey?`${z}${I.thumbnailDataKey}`:void 0,type:a,index:F,id:`file-${F}`,fileId:I.dataKey,loaded:!1}}),i={mediaItems:m,folderName:e.folderName||"Album"};ne(i,f,I=>{window.open(m[I].url,"_blank")})}else alert(f("No items to download"))},c=async s=>{var b,m,i;if(s.preventDefault(),s.stopPropagation(),!d){alert(f("You must be logged in to perform this action"));return}try{const v=await E();if(!v){console.error("Authentication failed");return}const I=[...S];if(o){const $=I.indexOf(j);$>-1&&I.splice($,1)}else I.push(j);const T=await(await fetch(M,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${v}`},body:JSON.stringify({query:`
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
      `,variables:{folderPositionChangeProfileIdsInput:{folderId:e.folderId,profileIds:I}}})})).json();if(T.errors)throw new Error(((b=T.errors[0])==null?void 0:b.message)||"Unknown error");const R=(((i=(m=T==null?void 0:T.data)==null?void 0:m.changeFiles)==null?void 0:i.items)||[]).find($=>$.id===e.folderPositionId);R&&R.profileIds&&(L(R.profileIds),P&&P(R.profileIds),console.log("Album visibility updated successfully"))}catch(v){console.error("Failed to toggle album visibility:",v),alert(f("Failed to update album visibility. Please try again."))}},r={padding:"8px 12px",border:"none",borderRadius:6,cursor:"pointer",fontSize:14,textAlign:"center",whiteSpace:"nowrap",flexShrink:0};return t.jsx(t.Fragment,{children:t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:16,flexDirection:p?"row-reverse":"row"},children:[t.jsx("div",{style:{display:"flex",width:"100%",overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none",WebkitOverflowScrolling:"touch",flexDirection:p?"row-reverse":"row",gap:"10px"},children:t.jsxs("div",{style:{display:"flex",gap:"10px",flexDirection:p?"row-reverse":"row"},children:[t.jsx("button",{onClick:s=>{s.preventDefault(),s.stopPropagation(),y(e.folderId)},style:{...r,backgroundColor:"#4caf50",color:"white"},children:f("Add Photos")}),t.jsx("button",{onClick:n,style:{...r,backgroundColor:"#e0e0e0"},children:f("Download")}),t.jsx("button",{onClick:s=>{s.preventDefault(),s.stopPropagation(),h(!0)},style:{...r,backgroundColor:"#e0e0e0"},children:f("Copy Link")}),t.jsx("button",{onClick:c,style:{...r,backgroundColor:o?"#4caf50":"#e0e0e0",color:o?"white":"inherit"},children:f(o?"On Public Profile":"Not On Public Profile")})]})}),t.jsx(fe,{isOpen:D,onClose:()=>h(!1),inviteLink:l,onCopy:u,t:f,isRTL:p}),t.jsx(he,{isOpen:g,onClose:()=>k(!1),t:f,isRTL:p}),t.jsx("style",{children:`
            div::-webkit-scrollbar {
              display: none;
            }
          `})]})})},ye=w.div`
  margin-bottom: 30px;
  width: 100%;
  direction: ${e=>e.isRTL?"rtl":"ltr"};
`,we=w.a`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  overflow: hidden;
`,Ce=w.div`
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
`,Ie=w.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
  flex-direction: ${e=>e.isRTL?"row-reverse":"row"};
`,ve=w.div`
  display: flex;
  flex-direction: column;
  align-items: ${e=>e.isRTL?"flex-end":"flex-start"};
`,Pe=w.h2`
  font-size: 20px;
  margin: 0;
  color: #222;
`,Se=w.div`
  font-size: 13px;
  color: #777;
  text-align: ${e=>e.isRTL?"right":"left"};
  margin-top: 4px;
`,je=w.div`
  display: flex;
  flex-direction: column;
  align-items: ${e=>e.isRTL?"flex-start":"flex-end"};
  justify-content: flex-end;
  gap: 8px;
`,ke=w.div`
  position: relative;
`,Fe=w.a`
  font-size: 13px;
  color: #2196f3;
  text-decoration: none;
`,De=w.a`
  font-size: 13px;
  color: #d32f2f;
  text-decoration: none;
`,Le=w.div`
  display: none;
  position: absolute;
  top: 100%;
  right: ${e=>e.isRTL?"auto":0};
  left: ${e=>e.isRTL?0:"auto"};
  background-color: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-radius: 4px;
  z-index: 10;
  min-width: 150px;
  padding: 8px 0;
  margin-top: 5px;
  text-align: ${e=>e.isRTL?"right":"left"};
`,V=w.a`
  display: block;
  padding: 8px 16px;
  color: ${e=>e.isDelete?"#d32f2f":"#2196f3"};
  text-decoration: none;
  font-size: 13px;
  white-space: nowrap;
`,Ae=w.div`
  margin-top: 8px;
  margin-bottom: 16px;
  font-size: 12px;
  color: #555;
  line-height: 1.5;
  text-align: ${e=>e.isRTL?"right":"left"};
  white-space: pre-wrap;
`,Te=w.div`
  width: 100%;
  position: relative;
`,Re=w.div`
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding-bottom: 8px;
  ms-overflow-style: none;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
  max-width: 100%;
  flex-direction: ${e=>e.isRTL?"row-reverse":"row"};
`,$e=w.div`
  position: absolute;
  ${e=>e.isRTL?"left":"right"}: 0;
  top: 0;
  bottom: 8px;
  width: 30px;
  background: ${e=>e.isRTL?"linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))":"linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))"};
  pointer-events: none;
`,_e=w.div`
  display: flex;
  justify-content: ${e=>e.isRTL?"flex-start":"flex-end"};
  margin-top: 8px;
  margin-bottom: 8px;
`,Ne=w.div`
  display: flex;
  align-items: center;
  font-size: 10px;
  color: #555;
  font-style: italic;
`,Ee=w.div`
  width: 100%;
  background-color: #f0f7ff;
  border-radius: 8px;
  padding: 12px 16px;
  margin-top: 16px;
  box-sizing: border-box;
  border: 1px solid #d0e1f9;
  direction: ${e=>e.isRTL?"rtl":"ltr"};
`,Ue=w.p`
  margin: 0;
  font-size: 14px;
  color: #333;
  text-align: ${e=>e.isRTL?"right":"left"};
`,Oe=w.p`
  font-size: 16px;
  color: #555;
  width: 100%;
`,ze=w.div`
  width: 160px;
  height: 100px;
  flex-shrink: 0;
`,Me=({folders:e,setFolders:y,handleDeleteClick:d,openFilePicker:P,isUploading:f,cognitoUsername:C})=>{const{t:p,language:D}=_(),h=N(D)==="rtl",g=x.useRef(null);x.useEffect(()=>{function o(){g.current&&(g.current.style.display="none",g.current=null)}function l(){o()}return window.addEventListener("scroll",l,!0),()=>{window.removeEventListener("scroll",l,!0)}},[]);const k=(o,l)=>{o.preventDefault(),o.stopPropagation(),g.current&&g.current!==l&&(g.current.style.display="none");const u=l.style.display==="block";l.style.display=u?"none":"block",g.current=u?null:l},S=o=>{g.current&&(g.current.style.display="none",g.current=null),window.confirm(p("Are you sure you want to delete this album? This action cannot be undone."))&&d(o)},L=(o,l)=>{y(u=>u.map(n=>n.folderId===o?{...n,profileIds:l}:n))},j=o=>{switch(o){case"NotVisible":return p("Hidden");case"Watermark":return p("Watermarked");case"CannotBeSaved":return p("Cannot be saved");case"NoPassword":default:return p("No password")}};return e.length===0&&!f?t.jsx(Oe,{children:p("No albums found")}):t.jsx(t.Fragment,{children:e.map(o=>{var m;const l=o.createdAt!=null,u=o.updatedAt!=null&&o.updatedAt!==o.createdAt,n=o.creatorId===`${C}_____${C}____Account`,c=((m=o.folderPassword)==null?void 0:m.policy)||"NoPassword",r=o.contacts||{},s=Object.values(r).filter(i=>i&&typeof i=="string"&&!i.toString().startsWith("Profile-")),b=H(o.folderId,o.albumNanoId,o.folderName);return t.jsx(ye,{isRTL:h,children:t.jsx(we,{href:b,children:t.jsxs(Ce,{children:[t.jsxs(Ie,{isRTL:h,children:[t.jsxs(ve,{isRTL:h,children:[t.jsx(Pe,{children:o.folderName||""}),(l||u)&&t.jsxs(Se,{isRTL:h,children:[l&&t.jsxs("div",{children:[p("Created"),": ",G(o.createdAt)]}),u&&t.jsxs("div",{children:[p("Updated"),": ",G(o.updatedAt)]})]})]}),t.jsx(je,{isRTL:h,children:n?t.jsxs(ke,{children:[t.jsx(Fe,{href:"#",onClick:i=>{const v=i.currentTarget.nextElementSibling;v&&k(i,v)},children:p("Edit")}),t.jsxs(Le,{isRTL:h,onClick:i=>{i.stopPropagation()},children:[t.jsx(V,{href:`/save-album.html?folderId=${encodeURIComponent(o.folderId)}`,onClick:i=>{i.stopPropagation()},children:p("Edit Details")}),t.jsx(V,{href:"#",isDelete:!0,onClick:i=>{i.preventDefault(),i.stopPropagation(),S(o.folderPositionId)},children:p("Delete My Copy")})]})]}):t.jsx(De,{href:"#",onClick:i=>{i.preventDefault(),i.stopPropagation(),S(o.folderPositionId)},children:p("Delete")})})]}),o.folderDescription&&o.folderDescription.length>1&&t.jsx(Ae,{isRTL:h,children:o.folderDescription}),t.jsxs(Te,{children:[t.jsx(Re,{isRTL:h,children:o.files.map((i,v)=>t.jsx(ze,{children:t.jsx(oe,{thumbnailDataKey:i.thumbnailDataKey,dataKey:i.dataKey,src:`${z}${i.thumbnailDataKey||i.dataKey}`,alt:p("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},v))}),o.files.length>3&&t.jsx($e,{isRTL:h})]}),t.jsx(_e,{isRTL:h,children:c!=="NoPassword"&&t.jsx(Ne,{children:t.jsx("span",{children:j(c)})})}),t.jsx(be,{folder:o,openFilePicker:P,cognitoUsername:C,updateProfileIds:i=>L(o.folderId,i)}),s.length>0&&t.jsx(Ee,{isRTL:h,children:t.jsxs(Ue,{isRTL:h,children:[p("Shared with"),": ",s.join(", ")]})})]})})},o.folderId)})})},We=e=>{const y=x.useRef(null),[d,P]=x.useState([]),[f,C]=x.useState(!1),[p,D]=x.useState({totalFiles:0,filesComplete:0,filesUploading:0,filesProcessing:0,filesWithError:0,overallProgress:0}),[h,g]=x.useState([]),[k,S]=x.useState(null),[L,j]=x.useState(!1),o=ae(g);x.useEffect(()=>{O(d,D)},[d]),x.useEffect(()=>{if(L&&d.length>0){const r=d.filter(b=>b.status==="complete").length,s=d.filter(b=>b.status==="error").length;o(`✅ Upload complete: ${r} successful, ${s} failed`),setTimeout(()=>{k?window.location.href=`/save-album.html?folderId=${encodeURIComponent(k)}`:window.location.href="/save-album.html",l()},1e3)}},[L,d.length,k]);const l=()=>{de(P,D,[],o),C(!1),j(!1)},u=(r=null)=>{var s;S(r),P([]),j(!1),(s=y.current)==null||s.click()},n=ue(P);return{fileInputRef:y,selectedPhotos:d,isUploading:f,progressTracker:p,debugMessages:h,openFilePicker:u,handleFileSelection:async r=>{const s=Array.from(r.target.files||[]);if(!s.length)return;if(C(!0),j(!1),!await E()){o("❌ Authentication failed"),C(!1);return}if(!e){o("❌ Missing Cognito Username"),C(!1);return}try{const m=k||`${e}_____${ce()}____Folder`;o(`📁 Using folder ID: ${m}`),P(s.map(a=>({fileName:a.name,s3PreviewUrl:URL.createObjectURL(a),type:a.type,size:a.size,status:"pending",progress:0})));const i=setInterval(()=>{O(d,D)},500),v=await pe(s,e,n,o);clearInterval(i),O(v,D),localStorage.setItem(Q.SELECTED_PHOTOS,JSON.stringify(v)),o(`📸 Saved ${v.length} photos metadata to storage`);const I=v.every(a=>a.status==="complete"),F=v.some(a=>a.status==="error");if(I&&!F)o(`✅ All ${v.length} files successfully uploaded`);else if(F){const a=v.filter(T=>T.status==="error").length;o(`⚠️ Upload completed with ${a} errors`)}j(!0)}catch(m){o(`❌ Fatal error in handleFileSelection: ${String(m)}`),C(!1)}finally{r.target&&(r.target.value="")}},log:o}},Ke=e=>{const[y,d]=x.useState([]),[P,f]=x.useState([]),[C,p]=x.useState(null),[D,h]=x.useState(null),[g,k]=x.useState(""),[S,L]=x.useState(!1);x.useEffect(()=>{p(localStorage.getItem("publicUsername")||null),(async()=>{const c=await E();if(c){try{const s=JSON.parse(atob(c.split(".")[1]))["cognito:username"];h(s)}catch(r){console.error("Failed to decode token",r)}await l(c)}})()},[]),x.useEffect(()=>{S||f(y)},[y,S]),x.useEffect(()=>{if(g===""){S||f(y);return}const c=(S?P:y).filter(r=>{var m,i;const s=(m=r.folderName)==null?void 0:m.toLowerCase().includes(g.toLowerCase()),b=(i=r.folderDescription)==null?void 0:i.toLowerCase().includes(g.toLowerCase());return s||b});f(c)},[g,y,S]);const j=n=>{L(!0),f(n),g&&f(c=>c.filter(r=>{var m,i;const s=(m=r.folderName)==null?void 0:m.toLowerCase().includes(g.toLowerCase()),b=(i=r.folderDescription)==null?void 0:i.toLowerCase().includes(g.toLowerCase());return s||b}))},o=()=>{L(!1),f(g?y.filter(n=>{var s,b;const c=(s=n.folderName)==null?void 0:s.toLowerCase().includes(g.toLowerCase()),r=(b=n.folderDescription)==null?void 0:b.toLowerCase().includes(g.toLowerCase());return c||r}):y)},l=async n=>{var s,b;const c=`
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
    `,r={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:50,scanIndexForward:!1}};try{const i=await(await fetch(M,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({query:c,variables:r})})).json(),I=(((b=(s=i==null?void 0:i.data)==null?void 0:s.fetchRelations)==null?void 0:b.items)||[]).map(F=>{var R,$,W,K;const a=F.folder,T=(($=(R=a==null?void 0:a.fileReferencesPage)==null?void 0:R.items)==null?void 0:$.map(A=>A.file))||[],U={};return(W=a==null?void 0:a.contactsUsingInvite)!=null&&W.items&&a.contactsUsingInvite.items.forEach(A=>{var B;A!=null&&A.id&&((B=A==null?void 0:A.item)!=null&&B.publicDisplayName)&&(U[A.id]=A.item.publicDisplayName)}),{folderPositionId:F.id,folderId:a.id,albumNanoId:a.albumNanoId,folderName:a.folderName,folderDescription:a.folderDescription,folderPassword:a.folderPassword,creatorId:a.creatorId,createdAt:a.createdAt,updatedAt:a.updatedAt,files:T.filter(A=>A&&A.dataKey),profileIds:F.profileIds||[],contacts:U,usingFolderInviteGrantsRightToAddItems:((K=a==null?void 0:a.folderInviteParameters)==null?void 0:K.usingFolderInviteGrantsRightToAddItems)||!1}});d(I)}catch(m){console.error("Failed to load folders:",m),e(`❌ Failed to fetch folders: ${String(m)}`)}};return{folders:y,filteredFolders:P,publicUsername:C,cognitoUsername:D,searchQuery:g,setSearchQuery:k,handleContactFilterChange:j,resetContactFilter:o,handleDeleteClick:async(n,c)=>{var r,s,b;try{console.log("Deleting album with id:",n);const m=await E();if(!m){console.error("Authentication failed");return}const I=await(await fetch(M,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${m}`},body:JSON.stringify({query:`
        mutation DeleteFolderPosition($deletedFolderPositionIds: [ID!]) {
          changeFiles(deletedFolderPositionIds: $deletedFolderPositionIds) {
            items {
              ... on IdObject {
                id
              }
            }
          }
        }
      `,variables:{deletedFolderPositionIds:[n]}})})).json();if((s=(r=I==null?void 0:I.data)==null?void 0:r.changeFiles)!=null&&s.items)e(`✅ Successfully deleted folder position ${n}`),d(F=>F.filter(a=>a.folderPositionId!==n));else if(I.errors){const F=((b=I.errors[0])==null?void 0:b.message)||"Unknown GraphQL error";throw e(`❌ Failed to delete folder: ${F}`),new Error(F)}}catch(m){e(`❌ Failed to delete folder: ${String(m)}`),console.error("Failed to delete folder:",m),alert(c("Failed to delete album. Please try again."))}},setFolders:d}},Be=()=>{const{t:e,language:y}=_(),d=N(y)==="rtl",{folders:P,filteredFolders:f,publicUsername:C,cognitoUsername:p,searchQuery:D,setSearchQuery:h,handleContactFilterChange:g,resetContactFilter:k,handleDeleteClick:S,setFolders:L}=Ke(s=>r(s)),{fileInputRef:j,isUploading:o,progressTracker:l,debugMessages:u,openFilePicker:n,handleFileSelection:c,log:r}=We(p);return t.jsxs(t.Fragment,{children:[t.jsx(X,{}),t.jsxs(Z,{isRTL:d,children:[t.jsxs("div",{style:{maxWidth:900,margin:"0 auto"},children:[t.jsx(ge,{publicUsername:C,isUploading:o,openFilePicker:n,cognitoUsername:p}),t.jsx(me,{isUploading:o,openFilePicker:n,t:e,isRTL:d}),t.jsx(se,{searchQuery:D,setSearchQuery:h,t:e,isRTL:d}),t.jsx(xe,{folders:P,onFilterChange:g,resetFilter:k}),o&&t.jsxs("div",{style:{width:"100%",marginBottom:"20px"},children:[t.jsx(ie,{progressTracker:l,t:e,isRTL:d}),l.filesComplete>0&&l.filesComplete===l.totalFiles&&t.jsx("div",{style:{backgroundColor:"#e8f5e9",color:"#2e7d32",padding:"10px 16px",borderRadius:"6px",fontSize:"14px",marginTop:"10px",textAlign:"center"},children:e("Upload complete! Preparing to save your album...")}),l.filesWithError>0&&t.jsx("div",{style:{backgroundColor:"#ffebee",color:"#c62828",padding:"10px 16px",borderRadius:"6px",fontSize:"14px",marginTop:"10px",textAlign:"center"},children:e("Some files could not be uploaded. You can continue with the successfully uploaded files.")})]}),t.jsx(Me,{folders:f,setFolders:L,handleDeleteClick:s=>S(s,e),openFilePicker:n,isUploading:o,cognitoUsername:p}),t.jsx(re,{onFileSelection:c,ref:j})]}),t.jsx(te,{debugMessages:u,t:e,isRTL:d,textDirection:d?"rtl":"ltr"})]})]})};Y.createRoot(document.getElementById("root")).render(t.jsx(q,{initialLanguage:localStorage.getItem(Q.LANGUAGE)||"en",children:t.jsx(Be,{})}));
