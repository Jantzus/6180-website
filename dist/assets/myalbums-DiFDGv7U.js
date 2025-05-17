import{u as E,j as s,a2 as W,g as T,r as f,l as _,k as G,a as Q,I as K,G as V,A as H}from"./styled-components-zUuOJ0l5.js";import{L as J,D as q}from"./DebugLog-B1HtYYTB.js";import{S as Y,A as X}from"./AlbumList-CvoBBed8.js";import{U as Z,F as ee}from"./FileInput-9UjXEbZz.js";import{u as U,h as te,f as se,b as k,g as oe,p as re,i as ne}from"./utils-D-KVaREQ.js";import"./fileOperations-DaQY6tDj.js";const ae=({publicUsername:n,cognitoUsername:u})=>{const{t:l,language:x}=E(),y=T(x)==="rtl",g=u?encodeURIComponent(u):"";return s.jsx(s.Fragment,{children:s.jsx("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,width:"100%",direction:y?"rtl":"ltr"},children:n&&s.jsxs(s.Fragment,{children:[s.jsxs(W,{href:`profile.html?id=${g}`,children:[s.jsx("span",{style:{fontSize:"16px",lineHeight:1,marginRight:"6px"},children:"👤"}),n||l("Profile")]}),s.jsx(J,{t:l})]})})})},le=({isUploading:n,openFilePicker:u,t:l})=>s.jsx("div",{style:{display:"flex",alignItems:"center",marginBottom:24,width:"100%"},children:s.jsx("button",{onClick:()=>u(null),style:{fontSize:"14px",padding:"8px 16px",backgroundColor:"#007bff",color:"white",border:"none",borderRadius:"6px",cursor:"pointer",opacity:n?.6:1,pointerEvents:n?"none":"auto"},disabled:n,children:l(n?"Uploading...":"Create Album")})}),ie=({folders:n,onFilterChange:u,resetFilter:l})=>{const{t:x,language:y}=E(),g=T(y)==="rtl",[F,P]=f.useState([]),[S,m]=f.useState([]),[A,C]=f.useState([]);f.useEffect(()=>{const e=new Map;n.forEach(d=>{if(d.contacts){const t=d.updatedAt?new Date(d.updatedAt).getTime():d.createdAt?new Date(d.createdAt).getTime():0;Object.values(d.contacts).forEach(a=>{if(typeof a=="string"&&!a.toString().startsWith("Profile-")){const o=e.get(a);(!o||t>o.timestamp)&&e.set(a,{name:a,timestamp:t})}})}});const c=Array.from(e.values()).sort((d,t)=>t.timestamp-d.timestamp).map(d=>d.name);P(c),C(c)},[n]);const j=e=>{let c;if(S.includes(e)?c=S.filter(d=>d!==e):c=[...S,e],m(c),c.length===0)l(),C(F);else{const d=n.filter(t=>{if(!t.contacts)return!1;const a=Object.values(t.contacts).filter(o=>typeof o=="string"&&!o.toString().startsWith("Profile-"));return c.every(o=>a.includes(o))});v(d),u(d)}},v=e=>{const c=new Set;e.forEach(t=>{t.contacts&&Object.values(t.contacts).forEach(a=>{typeof a=="string"&&!a.toString().startsWith("Profile-")&&c.add(a)})}),S.forEach(t=>{c.add(t)});const d=F.filter(t=>c.has(t));C(d)};return F.length===0?null:s.jsxs("div",{style:{width:"100%",marginBottom:24,direction:g?"rtl":"ltr"},children:[s.jsxs("div",{style:{display:"flex",flexDirection:g?"row-reverse":"row",gap:12,overflowX:"auto",paddingBottom:8,WebkitOverflowScrolling:"touch",flexWrap:"nowrap"},children:[s.jsxs("div",{style:{fontSize:14,color:"#555",whiteSpace:"nowrap",display:"flex",alignItems:"center",height:"40px",flexShrink:0,padding:g?"0 0 0 4px":"0 4px 0 0"},children:[x("Filter"),":"]}),A.map(e=>s.jsx("button",{onClick:()=>j(e),style:{padding:"6px 12px",borderRadius:16,fontSize:13,cursor:"pointer",border:"1px solid #ddd",backgroundColor:S.includes(e)?"#2196f3":"#fff",color:S.includes(e)?"#fff":"#333",whiteSpace:"nowrap",transition:"all 0.2s ease",flexShrink:0,height:"40px"},children:e},e))]}),S.length>1&&s.jsx("div",{style:{marginTop:8,fontSize:13,color:"#555",fontStyle:"italic",textAlign:g?"right":"left"},children:x("Showing albums with all selected contacts")}),s.jsx("style",{children:`
          div::-webkit-scrollbar {
            display: none;
          }
        `})]})},ce=n=>{const u=f.useRef(null),[l,x]=f.useState([]),[y,g]=f.useState(!1),[F,P]=f.useState({totalFiles:0,filesComplete:0,filesUploading:0,filesProcessing:0,filesWithError:0,overallProgress:0}),[S,m]=f.useState([]),[A,C]=f.useState(null),[j,v]=f.useState(!1),e=te(m);f.useEffect(()=>{U(l,P)},[l]),f.useEffect(()=>{if(j&&l.length>0){const o=l.filter(h=>h.status==="complete").length,i=l.filter(h=>h.status==="error").length;e(`✅ Upload complete: ${o} successful, ${i} failed`),setTimeout(()=>{A?window.location.href=`/save-album.html?folderId=${encodeURIComponent(A)}`:window.location.href="/save-album.html",c()},1e3)}},[j,l.length,A]);const c=()=>{se(x,P,[],e),g(!1),v(!1)},d=(o=null)=>{var i;C(o),x([]),v(!1),(i=u.current)==null||i.click()},t=ne(x);return{fileInputRef:u,selectedPhotos:l,isUploading:y,progressTracker:F,debugMessages:S,openFilePicker:d,handleFileSelection:async o=>{const i=Array.from(o.target.files||[]);if(!i.length)return;if(g(!0),v(!1),!await k()){e("❌ Authentication failed"),g(!1);return}if(!n){e("❌ Missing Cognito Username"),g(!1);return}try{const p=A||`${n}_____${oe()}____Folder`;e(`📁 Using folder ID: ${p}`),x(i.map(r=>({fileName:r.name,s3PreviewUrl:URL.createObjectURL(r),type:r.type,size:r.size,status:"pending",progress:0})));const I=setInterval(()=>{U(l,P)},500),R=await re(i,n,t,e);clearInterval(I),U(R,P),localStorage.setItem(_.SELECTED_PHOTOS,JSON.stringify(R)),e(`📸 Saved ${R.length} photos metadata to storage`);const L=R.every(r=>r.status==="complete"),b=R.some(r=>r.status==="error");if(L&&!b)e(`✅ All ${R.length} files successfully uploaded`);else if(b){const r=R.filter(D=>D.status==="error").length;e(`⚠️ Upload completed with ${r} errors`)}v(!0)}catch(p){e(`❌ Fatal error in handleFileSelection: ${String(p)}`),g(!1)}finally{o.target&&(o.target.value="")}},log:e}},de=n=>{const[u,l]=f.useState([]),[x,y]=f.useState([]),[g,F]=f.useState(null),[P,S]=f.useState(null),[m,A]=f.useState(""),[C,j]=f.useState(!1);f.useEffect(()=>{F(localStorage.getItem(_.PUBLIC_USERNAME)||null),(async()=>{const a=await k();if(a){try{const i=JSON.parse(atob(a.split(".")[1]))["cognito:username"];S(i)}catch(o){console.error("Failed to decode token",o)}await c(a)}})()},[]),f.useEffect(()=>{C||y(u)},[u,C]),f.useEffect(()=>{if(m===""){C||y(u);return}const a=(C?x:u).filter(o=>{var p,I;const i=(p=o.folderName)==null?void 0:p.toLowerCase().includes(m.toLowerCase()),h=(I=o.folderDescription)==null?void 0:I.toLowerCase().includes(m.toLowerCase());return i||h});y(a)},[m,u,C]);const v=t=>{j(!0),y(t),m&&y(a=>a.filter(o=>{var p,I;const i=(p=o.folderName)==null?void 0:p.toLowerCase().includes(m.toLowerCase()),h=(I=o.folderDescription)==null?void 0:I.toLowerCase().includes(m.toLowerCase());return i||h}))},e=()=>{j(!1),y(m?u.filter(t=>{var i,h;const a=(i=t.folderName)==null?void 0:i.toLowerCase().includes(m.toLowerCase()),o=(h=t.folderDescription)==null?void 0:h.toLowerCase().includes(m.toLowerCase());return a||o}):u)},c=async t=>{var i,h;const a=`
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
    `,o={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:50,scanIndexForward:!1}};try{const I=await(await fetch(G,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({query:a,variables:o})})).json(),L=(((h=(i=I==null?void 0:I.data)==null?void 0:i.fetchRelations)==null?void 0:h.items)||[]).map(b=>{var $,O,M,B;const r=b.folder,D=((O=($=r==null?void 0:r.fileReferencesPage)==null?void 0:$.items)==null?void 0:O.map(w=>w.file))||[],N={};return(M=r==null?void 0:r.contactsUsingInvite)!=null&&M.items&&r.contactsUsingInvite.items.forEach(w=>{var z;w!=null&&w.id&&((z=w==null?void 0:w.item)!=null&&z.publicDisplayName)&&(N[w.id]=w.item.publicDisplayName)}),{folderPositionId:b.id,folderId:r.id,albumNanoId:r.albumNanoId,folderName:r.folderName,folderDescription:r.folderDescription,folderPassword:r.folderPassword,creatorId:r.creatorId,createdAt:r.createdAt,updatedAt:r.updatedAt,files:D.filter(w=>w&&w.dataKey),profileIds:b.profileIds||[],contacts:N,usingFolderInviteGrantsRightToAddItems:((B=r==null?void 0:r.folderInviteParameters)==null?void 0:B.usingFolderInviteGrantsRightToAddItems)||!1}});l(L)}catch(p){console.error("Failed to load folders:",p),n(`❌ Failed to fetch folders: ${String(p)}`)}};return{folders:u,filteredFolders:x,publicUsername:g,cognitoUsername:P,searchQuery:m,setSearchQuery:A,handleContactFilterChange:v,resetContactFilter:e,handleDeleteClick:async(t,a)=>{var o,i,h;try{console.log("Deleting album with id:",t);const p=await k();if(!p){console.error("Authentication failed");return}const L=await(await fetch(G,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${p}`},body:JSON.stringify({query:`
        mutation DeleteFolderPosition($deletedFolderPositionIds: [ID!]) {
          changeFiles(deletedFolderPositionIds: $deletedFolderPositionIds) {
            items {
              ... on IdObject {
                id
              }
            }
          }
        }
      `,variables:{deletedFolderPositionIds:[t]}})})).json();if((i=(o=L==null?void 0:L.data)==null?void 0:o.changeFiles)!=null&&i.items)n(`✅ Successfully deleted folder position ${t}`),l(b=>b.filter(r=>r.folderPositionId!==t));else if(L.errors){const b=((h=L.errors[0])==null?void 0:h.message)||"Unknown GraphQL error";throw n(`❌ Failed to delete folder: ${b}`),new Error(b)}}catch(p){n(`❌ Failed to delete folder: ${String(p)}`),console.error("Failed to delete folder:",p),alert(a("Failed to delete album. Please try again."))}},setFolders:l}},fe=()=>{const{t:n,language:u}=E(),l=T(u)==="rtl",{folders:x,filteredFolders:y,publicUsername:g,cognitoUsername:F,searchQuery:P,setSearchQuery:S,handleContactFilterChange:m,resetContactFilter:A,handleDeleteClick:C,setFolders:j}=de(i=>o(i)),{fileInputRef:v,isUploading:e,progressTracker:c,debugMessages:d,openFilePicker:t,handleFileSelection:a,log:o}=ce(F);return s.jsxs(s.Fragment,{children:[s.jsx(V,{}),s.jsxs(H,{isRTL:l,children:[s.jsxs("div",{style:{maxWidth:900,margin:"0 auto"},children:[s.jsx(ae,{publicUsername:g,isUploading:e,openFilePicker:t,cognitoUsername:F}),s.jsx(le,{isUploading:e,openFilePicker:t,t:n,isRTL:l}),s.jsx(Y,{searchQuery:P,setSearchQuery:S,t:n,isRTL:l}),s.jsx(ie,{folders:x,onFilterChange:m,resetFilter:A}),e&&s.jsxs("div",{style:{width:"100%",marginBottom:"20px"},children:[s.jsx(Z,{progressTracker:c,t:n,isRTL:l}),c.filesComplete>0&&c.filesComplete===c.totalFiles&&s.jsx("div",{style:{backgroundColor:"#e8f5e9",color:"#2e7d32",padding:"10px 16px",borderRadius:"6px",fontSize:"14px",marginTop:"10px",textAlign:"center"},children:n("Upload complete! Preparing to save your album...")}),c.filesWithError>0&&s.jsx("div",{style:{backgroundColor:"#ffebee",color:"#c62828",padding:"10px 16px",borderRadius:"6px",fontSize:"14px",marginTop:"10px",textAlign:"center"},children:n("Some files could not be uploaded. You can continue with the successfully uploaded files.")})]}),s.jsx(X,{folders:y,setFolders:j,handleDeleteClick:i=>C(i,n),openFilePicker:t,isUploading:e,cognitoUsername:F,isProfileView:!1}),s.jsx(ee,{onFileSelection:a,ref:v})]}),s.jsx(q,{debugMessages:d,t:n,isRTL:l,textDirection:l?"rtl":"ltr"})]})]})};Q.createRoot(document.getElementById("root")).render(s.jsx(K,{initialLanguage:localStorage.getItem(_.LANGUAGE)||"en",children:s.jsx(fe,{})}));
