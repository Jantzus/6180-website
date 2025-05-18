import{u as D,j as e,N as Q,g as L,r as w,k as B,i as O,a as z,I as W,G as K,A as V}from"./styled-components-DL0uHAXq.js";import{u as H,U as J}from"./useFileUploadProcessor-DeO4ttjl.js";import{L as q,D as X}from"./DebugLog-D9H_xZ4a.js";import{S as Y,A as Z}from"./AlbumList-4IjjomcE.js";import{F as ee}from"./FileInput-D8_v1FBW.js";import{b as _}from"./utils-CzC9PFvy.js";import"./fileOperations-Cv5qw-6R.js";const te=({publicUsername:n,cognitoUsername:d})=>{const{t:f,language:C}=D(),p=L(C)==="rtl",F=d?encodeURIComponent(d):"";return e.jsx(e.Fragment,{children:e.jsx("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,width:"100%",direction:p?"rtl":"ltr"},children:n&&e.jsxs(e.Fragment,{children:[e.jsxs(Q,{href:`profile.html?id=${F}`,children:[e.jsx("span",{style:{fontSize:"16px",lineHeight:1,marginRight:"6px"},children:"👤"}),n||f("Profile")]}),e.jsx(q,{t:f})]})})})},se=({isUploading:n,openFilePicker:d,t:f})=>e.jsx("div",{style:{display:"flex",alignItems:"center",marginBottom:24,width:"100%"},children:e.jsx("button",{onClick:()=>d(null),style:{fontSize:"14px",padding:"8px 16px",backgroundColor:"#007bff",color:"white",border:"none",borderRadius:"6px",cursor:"pointer",opacity:n?.6:1,pointerEvents:n?"none":"auto"},disabled:n,children:f(n?"Uploading...":"Create Album")})}),oe=({folders:n,onFilterChange:d,resetFilter:f})=>{const{t:C,language:p}=D(),F=L(p)==="rtl",[S,R]=w.useState([]),[y,m]=w.useState([]),[v,x]=w.useState([]);w.useEffect(()=>{const l=new Map;n.forEach(i=>{if(i.contacts){const t=i.updatedAt?new Date(i.updatedAt).getTime():i.createdAt?new Date(i.createdAt).getTime():0;Object.values(i.contacts).forEach(s=>{if(typeof s=="string"&&!s.toString().startsWith("Profile-")){const o=l.get(s);(!o||t>o.timestamp)&&l.set(s,{name:s,timestamp:t})}})}});const c=Array.from(l.values()).sort((i,t)=>t.timestamp-i.timestamp).map(i=>i.name);R(c),x(c)},[n]);const P=l=>{let c;if(y.includes(l)?c=y.filter(i=>i!==l):c=[...y,l],m(c),c.length===0)f(),x(S);else{const i=n.filter(t=>{if(!t.contacts)return!1;const s=Object.values(t.contacts).filter(o=>typeof o=="string"&&!o.toString().startsWith("Profile-"));return c.every(o=>s.includes(o))});A(i),d(i)}},A=l=>{const c=new Set;l.forEach(t=>{t.contacts&&Object.values(t.contacts).forEach(s=>{typeof s=="string"&&!s.toString().startsWith("Profile-")&&c.add(s)})}),y.forEach(t=>{c.add(t)});const i=S.filter(t=>c.has(t));x(i)};return S.length===0?null:e.jsxs("div",{style:{width:"100%",marginBottom:24,direction:F?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:F?"row-reverse":"row",gap:12,overflowX:"auto",paddingBottom:8,WebkitOverflowScrolling:"touch",flexWrap:"nowrap"},children:[e.jsxs("div",{style:{fontSize:14,color:"#555",whiteSpace:"nowrap",display:"flex",alignItems:"center",height:"40px",flexShrink:0,padding:F?"0 0 0 4px":"0 4px 0 0"},children:[C("Filter"),":"]}),v.map(l=>e.jsx("button",{onClick:()=>P(l),style:{padding:"6px 12px",borderRadius:16,fontSize:13,cursor:"pointer",border:"1px solid #ddd",backgroundColor:y.includes(l)?"#2196f3":"#fff",color:y.includes(l)?"#fff":"#333",whiteSpace:"nowrap",transition:"all 0.2s ease",flexShrink:0,height:"40px"},children:l},l))]}),y.length>1&&e.jsx("div",{style:{marginTop:8,fontSize:13,color:"#555",fontStyle:"italic",textAlign:F?"right":"left"},children:C("Showing albums with all selected contacts")}),e.jsx("style",{children:`
          div::-webkit-scrollbar {
            display: none;
          }
        `})]})},re=n=>{const[d,f]=w.useState([]),[C,p]=w.useState([]),[F,S]=w.useState(null),[R,y]=w.useState(null),[m,v]=w.useState(""),[x,P]=w.useState(!1);w.useEffect(()=>{S(localStorage.getItem(B.PUBLIC_USERNAME)||null),(async()=>{const s=await _();if(s){try{const u=JSON.parse(atob(s.split(".")[1]))["cognito:username"];y(u)}catch(o){console.error("Failed to decode token",o)}await c(s)}})()},[]),w.useEffect(()=>{x||p(d)},[d,x]),w.useEffect(()=>{if(m===""){x||p(d);return}const s=(x?C:d).filter(o=>{var h,I;const u=(h=o.folderName)==null?void 0:h.toLowerCase().includes(m.toLowerCase()),r=(I=o.folderDescription)==null?void 0:I.toLowerCase().includes(m.toLowerCase());return u||r});p(s)},[m,d,x]);const A=t=>{P(!0),p(t),m&&p(s=>s.filter(o=>{var h,I;const u=(h=o.folderName)==null?void 0:h.toLowerCase().includes(m.toLowerCase()),r=(I=o.folderDescription)==null?void 0:I.toLowerCase().includes(m.toLowerCase());return u||r}))},l=()=>{P(!1),p(m?d.filter(t=>{var u,r;const s=(u=t.folderName)==null?void 0:u.toLowerCase().includes(m.toLowerCase()),o=(r=t.folderDescription)==null?void 0:r.toLowerCase().includes(m.toLowerCase());return s||o}):d)},c=async t=>{var u,r;const s=`
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
    `,o={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:50,scanIndexForward:!1}};try{const I=await(await fetch(O,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({query:s,variables:o})})).json(),j=(((r=(u=I==null?void 0:I.data)==null?void 0:u.fetchRelations)==null?void 0:r.items)||[]).map(b=>{var k,T,N,U;const a=b.folder,G=((T=(k=a==null?void 0:a.fileReferencesPage)==null?void 0:k.items)==null?void 0:T.map(g=>g.file))||[],E={};return(N=a==null?void 0:a.contactsUsingInvite)!=null&&N.items&&a.contactsUsingInvite.items.forEach(g=>{var M;g!=null&&g.id&&((M=g==null?void 0:g.item)!=null&&M.publicDisplayName)&&(E[g.id]=g.item.publicDisplayName)}),{folderPositionId:b.id,folderId:a.id,albumNanoId:a.albumNanoId,folderName:a.folderName,folderDescription:a.folderDescription,folderPassword:a.folderPassword,creatorId:a.creatorId,createdAt:a.createdAt,updatedAt:a.updatedAt,files:G.filter(g=>g&&g.dataKey),profileIds:b.profileIds||[],contacts:E,usingFolderInviteGrantsRightToAddItems:((U=a==null?void 0:a.folderInviteParameters)==null?void 0:U.usingFolderInviteGrantsRightToAddItems)||!1}});f(j)}catch(h){console.error("Failed to load folders:",h),n(`❌ Failed to fetch folders: ${String(h)}`)}};return{folders:d,filteredFolders:C,publicUsername:F,cognitoUsername:R,searchQuery:m,setSearchQuery:v,handleContactFilterChange:A,resetContactFilter:l,handleDeleteClick:async(t,s)=>{var o,u,r;try{console.log("Deleting album with id:",t);const h=await _();if(!h){console.error("Authentication failed");return}const j=await(await fetch(O,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${h}`},body:JSON.stringify({query:`
        mutation DeleteFolderPosition($deletedFolderPositionIds: [ID!]) {
          changeFiles(deletedFolderPositionIds: $deletedFolderPositionIds) {
            items {
              ... on IdObject {
                id
              }
            }
          }
        }
      `,variables:{deletedFolderPositionIds:[t]}})})).json();if((u=(o=j==null?void 0:j.data)==null?void 0:o.changeFiles)!=null&&u.items)n(`✅ Successfully deleted folder position ${t}`),f(b=>b.filter(a=>a.folderPositionId!==t));else if(j.errors){const b=((r=j.errors[0])==null?void 0:r.message)||"Unknown GraphQL error";throw n(`❌ Failed to delete folder: ${b}`),new Error(b)}}catch(h){n(`❌ Failed to delete folder: ${String(h)}`),console.error("Failed to delete folder:",h),alert(s("Failed to delete album. Please try again."))}},setFolders:f}},ne=()=>{const{t:n,language:d}=D(),f=L(d)==="rtl",{folders:C,filteredFolders:p,publicUsername:F,cognitoUsername:S,searchQuery:R,setSearchQuery:y,handleContactFilterChange:m,resetContactFilter:v,handleDeleteClick:x,setFolders:P}=re(r=>s(r)),A=H(r=>{r?window.location.href=`/save-album.html?folderId=${encodeURIComponent(r)}`:window.location.href="/save-album.html"}),{fileInputRef:l,isUploading:c,progressTracker:i,debugMessages:t,log:s}=A,o=(r=null)=>{A.openFilePicker(r)},u=async r=>await A.handleFileSelection(r,S);return e.jsxs(e.Fragment,{children:[e.jsx(K,{}),e.jsxs(V,{isRTL:f,children:[e.jsx(te,{publicUsername:F,isUploading:c,openFilePicker:o,cognitoUsername:S}),e.jsx(se,{isUploading:c,openFilePicker:o,t:n,isRTL:f}),e.jsx(Y,{searchQuery:R,setSearchQuery:y,t:n,isRTL:f}),e.jsx(oe,{folders:C,onFilterChange:m,resetFilter:v}),c&&e.jsx("div",{style:{width:"100%",marginBottom:"20px"},children:e.jsx(J,{progressTracker:i,t:n,isRTL:L(d)==="rtl",style:{marginTop:"20px"},showSuccessMessage:!0,showErrorMessage:!0})}),e.jsx(Z,{folders:p,setFolders:P,handleDeleteClick:r=>x(r,n),openFilePicker:o,isUploading:c,cognitoUsername:S,isProfileView:!1}),e.jsx(ee,{onFileSelection:u,ref:l}),e.jsx(X,{debugMessages:t,t:n,isRTL:f,textDirection:f?"rtl":"ltr"})]})]})};z.createRoot(document.getElementById("root")).render(e.jsx(W,{initialLanguage:localStorage.getItem(B.LANGUAGE)||"en",children:e.jsx(ne,{})}));
