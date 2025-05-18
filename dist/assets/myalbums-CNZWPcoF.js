import{u as L,j as e,U as z,g as D,r as x,k as B,i as _,a as Q,I as W,G as K,A as V}from"./styled-components-BY_VQSR_.js";import{u as H,U as J,F as q}from"./FileInput-CdE-IeBD.js";import{L as Y,D as X}from"./DebugLog-61hyfhvm.js";import{S as Z,A as ee}from"./AlbumList-CKfG7rjr.js";import{b as M}from"./utils-cyT_GYg3.js";import"./fileOperations-vBjux_1y.js";const te=({publicUsername:r,cognitoUsername:f})=>{const{t:c,language:F}=L(),h=D(F)==="rtl",C=f?encodeURIComponent(f):"";return e.jsx(e.Fragment,{children:e.jsx("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,width:"100%",direction:h?"rtl":"ltr"},children:r&&e.jsxs(e.Fragment,{children:[e.jsxs(z,{href:`profile.html?id=${C}`,children:[e.jsx("span",{style:{fontSize:"16px",lineHeight:1,marginRight:"6px"},children:"👤"}),r||c("Profile")]}),e.jsx(Y,{t:c})]})})})},se=({isUploading:r,openFilePicker:f,t:c})=>e.jsx("div",{style:{display:"flex",alignItems:"center",marginBottom:24,width:"100%"},children:e.jsx("button",{onClick:()=>f(null),style:{fontSize:"14px",padding:"8px 16px",backgroundColor:"#007bff",color:"white",border:"none",borderRadius:"6px",cursor:"pointer",opacity:r?.6:1,pointerEvents:r?"none":"auto"},disabled:r,children:c(r?"Uploading...":"Create Album")})}),oe=({folders:r,onFilterChange:f,resetFilter:c})=>{const{t:F,language:h}=L(),C=D(h)==="rtl",[I,v]=x.useState([]),[y,p]=x.useState([]),[R,w]=x.useState([]);x.useEffect(()=>{const l=new Map;r.forEach(n=>{if(n.contacts){const t=n.updatedAt?new Date(n.updatedAt).getTime():n.createdAt?new Date(n.createdAt).getTime():0;Object.values(n.contacts).forEach(s=>{if(typeof s=="string"&&!s.toString().startsWith("Profile-")){const o=l.get(s);(!o||t>o.timestamp)&&l.set(s,{name:s,timestamp:t})}})}});const d=Array.from(l.values()).sort((n,t)=>t.timestamp-n.timestamp).map(n=>n.name);v(d),w(d)},[r]);const P=l=>{let d;if(y.includes(l)?d=y.filter(n=>n!==l):d=[...y,l],p(d),d.length===0)c(),w(I);else{const n=r.filter(t=>{if(!t.contacts)return!1;const s=Object.values(t.contacts).filter(o=>typeof o=="string"&&!o.toString().startsWith("Profile-"));return d.every(o=>s.includes(o))});A(n),f(n)}},A=l=>{const d=new Set;l.forEach(t=>{t.contacts&&Object.values(t.contacts).forEach(s=>{typeof s=="string"&&!s.toString().startsWith("Profile-")&&d.add(s)})}),y.forEach(t=>{d.add(t)});const n=I.filter(t=>d.has(t));w(n)};return I.length===0?null:e.jsxs("div",{style:{width:"100%",marginBottom:24,direction:C?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:C?"row-reverse":"row",gap:12,overflowX:"auto",paddingBottom:8,WebkitOverflowScrolling:"touch",flexWrap:"nowrap"},children:[e.jsxs("div",{style:{fontSize:14,color:"#555",whiteSpace:"nowrap",display:"flex",alignItems:"center",height:"40px",flexShrink:0,padding:C?"0 0 0 4px":"0 4px 0 0"},children:[F("Filter"),":"]}),R.map(l=>e.jsx("button",{onClick:()=>P(l),style:{padding:"6px 12px",borderRadius:16,fontSize:13,cursor:"pointer",border:"1px solid #ddd",backgroundColor:y.includes(l)?"#2196f3":"#fff",color:y.includes(l)?"#fff":"#333",whiteSpace:"nowrap",transition:"all 0.2s ease",flexShrink:0,height:"40px"},children:l},l))]}),y.length>1&&e.jsx("div",{style:{marginTop:8,fontSize:13,color:"#555",fontStyle:"italic",textAlign:C?"right":"left"},children:F("Showing albums with all selected contacts")}),e.jsx("style",{children:`
          div::-webkit-scrollbar {
            display: none;
          }
        `})]})},re=r=>{const[f,c]=x.useState([]),[F,h]=x.useState([]),[C,I]=x.useState(null),[v,y]=x.useState(null),[p,R]=x.useState(""),[w,P]=x.useState(!1);x.useEffect(()=>{I(localStorage.getItem(B.PUBLIC_USERNAME)||null),(async()=>{const s=await M();if(s){try{const u=JSON.parse(atob(s.split(".")[1]))["cognito:username"];y(u)}catch(o){console.error("Failed to decode token",o)}await d(s)}})()},[]),x.useEffect(()=>{w||h(f)},[f,w]),x.useEffect(()=>{if(p===""){w||h(f);return}const s=(w?F:f).filter(o=>{var m,b;const u=(m=o.folderName)==null?void 0:m.toLowerCase().includes(p.toLowerCase()),i=(b=o.folderDescription)==null?void 0:b.toLowerCase().includes(p.toLowerCase());return u||i});h(s)},[p,f,w]);const A=t=>{P(!0),h(t),p&&h(s=>s.filter(o=>{var m,b;const u=(m=o.folderName)==null?void 0:m.toLowerCase().includes(p.toLowerCase()),i=(b=o.folderDescription)==null?void 0:b.toLowerCase().includes(p.toLowerCase());return u||i}))},l=()=>{P(!1),h(p?f.filter(t=>{var u,i;const s=(u=t.folderName)==null?void 0:u.toLowerCase().includes(p.toLowerCase()),o=(i=t.folderDescription)==null?void 0:i.toLowerCase().includes(p.toLowerCase());return s||o}):f)},d=async t=>{var u,i;const s=`
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
    `,o={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:50,scanIndexForward:!1}};try{const b=await(await fetch(_,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({query:s,variables:o})})).json(),j=(((i=(u=b==null?void 0:b.data)==null?void 0:u.fetchRelations)==null?void 0:i.items)||[]).map(S=>{var E,T,U,N;const a=S.folder,G=((T=(E=a==null?void 0:a.fileReferencesPage)==null?void 0:E.items)==null?void 0:T.map(g=>g.file))||[],k={};return(U=a==null?void 0:a.contactsUsingInvite)!=null&&U.items&&a.contactsUsingInvite.items.forEach(g=>{var O;g!=null&&g.id&&((O=g==null?void 0:g.item)!=null&&O.publicDisplayName)&&(k[g.id]=g.item.publicDisplayName)}),{folderPositionId:S.id,folderId:a.id,albumNanoId:a.albumNanoId,folderName:a.folderName,folderDescription:a.folderDescription,folderPassword:a.folderPassword,creatorId:a.creatorId,createdAt:a.createdAt,updatedAt:a.updatedAt,files:G.filter(g=>g&&g.dataKey),profileIds:S.profileIds||[],contacts:k,usingFolderInviteGrantsRightToAddItems:((N=a==null?void 0:a.folderInviteParameters)==null?void 0:N.usingFolderInviteGrantsRightToAddItems)||!1}});c(j)}catch(m){console.error("Failed to load folders:",m),r(`❌ Failed to fetch folders: ${String(m)}`)}};return{folders:f,filteredFolders:F,publicUsername:C,cognitoUsername:v,searchQuery:p,setSearchQuery:R,handleContactFilterChange:A,resetContactFilter:l,handleDeleteClick:async(t,s)=>{var o,u,i;try{console.log("Deleting album with id:",t);const m=await M();if(!m){console.error("Authentication failed");return}const j=await(await fetch(_,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${m}`},body:JSON.stringify({query:`
        mutation DeleteFolderPosition($deletedFolderPositionIds: [ID!]) {
          changeFiles(deletedFolderPositionIds: $deletedFolderPositionIds) {
            items {
              ... on IdObject {
                id
              }
            }
          }
        }
      `,variables:{deletedFolderPositionIds:[t]}})})).json();if((u=(o=j==null?void 0:j.data)==null?void 0:o.changeFiles)!=null&&u.items)r(`✅ Successfully deleted folder position ${t}`),c(S=>S.filter(a=>a.folderPositionId!==t));else if(j.errors){const S=((i=j.errors[0])==null?void 0:i.message)||"Unknown GraphQL error";throw r(`❌ Failed to delete folder: ${S}`),new Error(S)}}catch(m){r(`❌ Failed to delete folder: ${String(m)}`),console.error("Failed to delete folder:",m),alert(s("Failed to delete album. Please try again."))}},setFolders:c}},ne=()=>{const{t:r,language:f}=L(),c=D(f)==="rtl",{folders:F,filteredFolders:h,publicUsername:C,cognitoUsername:I,searchQuery:v,setSearchQuery:y,handleContactFilterChange:p,resetContactFilter:R,handleDeleteClick:w,setFolders:P}=re(i=>s(i)),A=H(i=>{i?window.location.href=`/save-album.html?folderId=${encodeURIComponent(i)}`:window.location.href="/save-album.html"}),{fileInputRef:l,isUploading:d,progressTracker:n,debugMessages:t,log:s}=A,o=(i=null)=>{A.openFilePicker(i)},u=async i=>await A.handleFileSelection(i,I);return e.jsxs(e.Fragment,{children:[e.jsx(K,{}),e.jsxs(V,{isRTL:c,children:[e.jsx(te,{publicUsername:C,isUploading:d,openFilePicker:o,cognitoUsername:I}),e.jsx(se,{isUploading:d,openFilePicker:o,t:r,isRTL:c}),e.jsx(Z,{searchQuery:v,setSearchQuery:y,t:r,isRTL:c}),e.jsx(oe,{folders:F,onFilterChange:p,resetFilter:R}),d&&e.jsxs("div",{style:{width:"100%",marginBottom:"20px"},children:[e.jsx(J,{progressTracker:n,t:r,isRTL:c}),n.filesComplete>0&&n.filesComplete===n.totalFiles&&e.jsx("div",{style:{backgroundColor:"#e8f5e9",color:"#2e7d32",padding:"10px 16px",borderRadius:"6px",fontSize:"14px",marginTop:"10px",textAlign:"center"},children:r("Upload complete! Preparing to save your album...")}),n.filesWithError>0&&e.jsx("div",{style:{backgroundColor:"#ffebee",color:"#c62828",padding:"10px 16px",borderRadius:"6px",fontSize:"14px",marginTop:"10px",textAlign:"center"},children:r("Some files could not be uploaded. You can continue with the successfully uploaded files.")})]}),e.jsx(ee,{folders:h,setFolders:P,handleDeleteClick:i=>w(i,r),openFilePicker:o,isUploading:d,cognitoUsername:I,isProfileView:!1}),e.jsx(q,{onFileSelection:u,ref:l}),e.jsx(X,{debugMessages:t,t:r,isRTL:c,textDirection:c?"rtl":"ltr"})]})]})};Q.createRoot(document.getElementById("root")).render(e.jsx(W,{initialLanguage:localStorage.getItem(B.LANGUAGE)||"en",children:e.jsx(ne,{})}));
