import{j as e,u as et,a as y,w as F,c as nt,S as K,h as it,f as st,g as ot,d as l,G as _,b as rt}from"./utils-CuQXS0Z6.js";import{L as M}from"./LazyImage-CwZnuvnu.js";import{C as at,a as lt,d as dt}from"./fileOperations-DT_2RMWX.js";import{ao as ct,ap as O,aq as B,ar as pt,as as ut}from"./styled-components-C-fYuu40.js";const Pt=({searchQuery:o,setSearchQuery:x,t:b,isRTL:g})=>e.jsx("div",{style:{width:"100%",marginBottom:24,boxSizing:"border-box",direction:g?"rtl":"ltr"},children:e.jsx("input",{type:"text",placeholder:b("Search album title or description"),value:o,onChange:w=>x(w.target.value),style:{width:"100%",padding:"10px 16px",fontSize:"14px",border:"1px solid #ddd",borderRadius:"6px",outline:"none",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",boxSizing:"border-box"}})}),ht=({folder:o,openFilePicker:x,cognitoUsername:b,updateProfileIds:g,onModalStateChange:w})=>{const{t:d,language:T}=et(),a=ot(T)==="rtl",[j,s]=y.useState(!1),[c,k]=y.useState(!1),[C,R]=y.useState(o.profileIds||[]),$=b?`${b}_____Public____Profile`:"",v=C.includes($),D=F(o.folderId,o.albumNanoId,o.creatorId&&o.contacts&&o.contacts[o.creatorId]?o.contacts[o.creatorId]:"album",o.folderName);y.useEffect(()=>{R(o.profileIds||[])},[o.profileIds]),y.useEffect(()=>{w&&w(j||c)},[j,c,w]);const S=i=>{navigator.clipboard.writeText(i).then(()=>{s(!1),k(!0)}).catch(p=>{console.error("Failed to copy link:",p),alert(d("Failed to copy link"))})},z=async i=>{if(i.preventDefault(),i.stopPropagation(),!await nt()){alert(d("You must be logged in to download photos"));return}if(o&&o.files&&o.files.length>0){const h=o.files.map((u,I)=>{const L=u.dataKey.toLowerCase().endsWith(".mp4")?"video":"image";return{url:`${K}${u.dataKey}`,thumbnailUrl:u.thumbnailDataKey?`${K}${u.thumbnailDataKey}`:void 0,type:L,index:I,id:`file-${I}`,fileId:u.dataKey,loaded:!1}}),f={mediaItems:h,folderName:o.folderName||"Album"};dt(f,d,u=>{window.open(h[u].url,"_blank")})}else alert(d("No items to download"))},t=async i=>{var p,h,f;if(i.preventDefault(),i.stopPropagation(),!b){alert(d("You must be logged in to perform this action"));return}try{const m=await it();if(!m){console.error("Authentication failed");return}const u=[...C];if(v){const N=u.indexOf($);N>-1&&u.splice(N,1)}else u.push($);const n=await(await fetch(st,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${m}`},body:JSON.stringify({query:`
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
      `,variables:{folderPositionChangeProfileIdsInput:{folderId:o.folderId,profileIds:u}}})})).json();if(n.errors)throw new Error(((p=n.errors[0])==null?void 0:p.message)||"Unknown error");const A=(((f=(h=n==null?void 0:n.data)==null?void 0:h.changeFiles)==null?void 0:f.items)||[]).find(N=>N.id===o.folderPositionId);A&&A.profileIds&&(R(A.profileIds),g&&g(A.profileIds),console.log("Album visibility updated successfully"))}catch(m){console.error("Failed to toggle album visibility:",m),alert(d("Failed to update album visibility. Please try again."))}},r={padding:"8px 12px",border:"none",borderRadius:6,cursor:"pointer",fontSize:14,textAlign:"center",whiteSpace:"nowrap",flexShrink:0};return e.jsx(e.Fragment,{children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:16,flexDirection:a?"row-reverse":"row"},children:[e.jsx("div",{style:{display:"flex",width:"100%",overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none",WebkitOverflowScrolling:"touch",flexDirection:a?"row-reverse":"row",gap:"10px"},children:e.jsxs("div",{style:{display:"flex",gap:"10px",flexDirection:a?"row-reverse":"row"},children:[x&&e.jsx("button",{onClick:i=>{i.preventDefault(),i.stopPropagation(),x(o.folderId)},style:{...r,backgroundColor:"#4caf50",color:"white"},children:d("Add Photos")}),e.jsx("button",{onClick:i=>{i.preventDefault(),i.stopPropagation(),s(!0)},style:{...r,backgroundColor:"#e0e0e0"},children:d("Copy Link")}),e.jsx("button",{onClick:z,style:{...r,backgroundColor:"#e0e0e0"},children:d("Download")}),e.jsx("button",{onClick:t,style:{...r,backgroundColor:v?"#4caf50":"#e0e0e0",color:v?"white":"inherit"},children:d(v?"On Public Profile":"Not On Public Profile")})]})}),e.jsx(at,{isOpen:j,onClose:()=>s(!1),inviteLink:D,onCopy:S,t:d,isRTL:a}),e.jsx(lt,{isOpen:c,onClose:()=>k(!1),t:d,isRTL:a}),e.jsx("style",{children:`
            div::-webkit-scrollbar {
              display: none;
            }
          `})]})})},E=o=>{if(o===0)return"0 B";const x=1024,b=["B","KB","MB","GB","TB"],g=Math.floor(Math.log(o)/Math.log(x));return`${Math.round(o/Math.pow(x,g)*100)/100} ${b[g]}`},xt=o=>o.reduce((x,b)=>x+(b.dataInBytes||0),0),W=l.div`
  margin-bottom: 30px;
  width: 100%;
  direction: ${o=>o.$isRTL?"rtl":"ltr"};
`,V=l.div`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
`,G=l.div`
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
`,U=l.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
  flex-direction: ${o=>o.$isRTL?"row-reverse":"row"};
`,H=l.div`
  display: flex;
  flex-direction: column;
  align-items: ${o=>o.$isRTL?"flex-end":"flex-start"};
`,Q=l.h2`
  font-size: 20px;
  margin: 0;
  color: #222;
`,bt=l.div`
  display: flex;
  flex-direction: column;
  align-items: ${o=>o.$isRTL?"flex-start":"flex-end"};
  justify-content: flex-end;
  gap: 8px;
`,gt=l.div`
  position: relative;
`,ft=l.button`
  font-size: 12px;
  color: #2196f3;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  
  &:hover {
    text-decoration: underline;
  }
`,mt=l.button`
  font-size: 12px;
  color: #d32f2f;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  
  &:hover {
    text-decoration: underline;
  }
`,yt=l.div`
  display: none;
  position: absolute;
  top: 100%;
  right: ${o=>o.$isRTL?"auto":0};
  left: ${o=>o.$isRTL?0:"auto"};
  background-color: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-radius: 4px;
  z-index: 10;
  min-width: 150px;
  padding: 8px 0;
  margin-top: 5px;
  text-align: ${o=>o.$isRTL?"right":"left"};
`,q=l.button`
  display: block;
  width: 100%;
  padding: 8px 16px;
  color: ${o=>o.$isDelete?"#d32f2f":"#2196f3"};
  text-decoration: none;
  font-size: 12px;
  white-space: nowrap;
  background: none;
  border: none;
  cursor: pointer;
  text-align: ${o=>o.$isRTL?"right":"left"};
  
  &:hover {
    background-color: #f5f5f5;
  }
`,Y=l.div`
  width: 100%;
  position: relative;
`,J=l.div`
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding-bottom: 8px;
  ms-overflow-style: none;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
  max-width: 100%;
  flex-direction: ${o=>o.$isRTL?"row-reverse":"row"};
`,X=l.div`
  position: absolute;
  ${o=>o.$isRTL?"left":"right"}: 0;
  top: 0;
  bottom: 8px;
  width: 30px;
  background: ${o=>o.$isRTL?"linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))":"linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))"};
  pointer-events: none;
`,Z=l.div`
  display: flex;
  justify-content: ${o=>o.$isRTL?"flex-start":"flex-end"};
  margin-top: 8px;
  margin-bottom: 8px;
`,wt=l.div`
  width: 100%;
  background-color: #f0f7ff;
  border-radius: 8px;
  padding: 12px 16px;
  margin-top: 16px;
  box-sizing: border-box;
  border: 1px solid #d0e1f9;
  direction: ${o=>o.$isRTL?"rtl":"ltr"};
`,$t=l.p`
  margin: 0;
  font-size: 14px;
  color: #333;
  text-align: ${o=>o.$isRTL?"right":"left"};
`,tt=l.div`
  width: 160px;
  height: 100px;
  flex-shrink: 0;
`,Tt=({folders:o,setFolders:x,handleDeleteClick:b,openFilePicker:g,isUploading:w=!1,cognitoUsername:d,isProfileView:T=!1})=>{const{t:a,language:j}=et(),s=ot(j)==="rtl",c=y.useRef(null),[k,C]=y.useState({});y.useEffect(()=>{function t(){c.current&&(c.current.style.display="none",c.current=null)}function r(){t()}return window.addEventListener("scroll",r,!0),()=>{window.removeEventListener("scroll",r,!0)}},[]);const R=(t,r)=>{t.preventDefault(),t.stopPropagation(),c.current&&c.current!==r&&(c.current.style.display="none");const i=r.style.display==="block";r.style.display=i?"none":"block",c.current=i?null:r},$=t=>{c.current&&(c.current.style.display="none",c.current=null),window.confirm(a("Are you sure you want to delete this album? This action cannot be undone."))&&b&&b(t,a)},v=(t,r)=>{x&&x(i=>i.map(p=>p.folderId===t?{...p,profileIds:r}:p))},D=t=>{switch(t){case"NotVisible":return a("Hidden");case"Watermark":return a("Watermarked");case"CannotBeSaved":return a("Cannot be saved");case"NoPassword":default:return a("No password")}},S=(t,r)=>{const i=c.current&&c.current.style.display==="block",p=k[r]||!1;!i&&!p&&(window.location.href=t)},z=(t,r)=>{C(i=>({...i,[t]:r}))};return o.length===0&&!w?e.jsx(ct,{$type:"empty",children:e.jsx("p",{children:a("No albums found")})}):T?e.jsx(e.Fragment,{children:o.map(t=>{var p;const r=((p=t.folderPassword)==null?void 0:p.policy)||"NoPassword",i=F(t.folderId,t.albumNanoId||null,t.creatorId&&t.contacts&&t.contacts[t.creatorId],t.folderName);return e.jsx(W,{$isRTL:s,children:e.jsx(V,{onClick:()=>S(i,t.folderId),children:e.jsxs(G,{children:[e.jsx(U,{$isRTL:s,children:e.jsx(H,{$isRTL:s,children:e.jsx(Q,{children:t.folderName||""})})}),t.folderDescription&&t.folderDescription.length>1&&e.jsx(O,{$isRTL:s,children:t.folderDescription}),e.jsxs(Y,{children:[e.jsx(J,{$isRTL:s,children:t.files.map((h,f)=>e.jsx(tt,{children:e.jsx(M,{thumbnailDataKey:h.thumbnailDataKey,dataKey:h.dataKey,src:`${K}${h.thumbnailDataKey||h.dataKey}`,alt:a("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},f))}),t.files.length>3&&e.jsx(X,{$isRTL:s})]}),e.jsx(Z,{$isRTL:s,children:r!=="NoPassword"&&e.jsx(B,{children:e.jsx("span",{children:D(r)})})})]})})},t.folderId)})}):e.jsx(e.Fragment,{children:o.map(t=>{var L;const r=t.createdAt!=null,i=t.updatedAt!=null&&t.createdAt!=null&&t.updatedAt!==t.createdAt,p=t.creatorId===`${d}_____${d}____Account`,h=((L=t.folderPassword)==null?void 0:L.policy)||"NoPassword",f=t.contacts||{},m=Object.values(f).filter(n=>n&&typeof n=="string"&&!n.toString().startsWith("Profile-")),u=xt(t.files),I=F(t.folderId,t.albumNanoId||null,t.creatorId&&t.contacts&&t.contacts[t.creatorId],t.folderName);return e.jsx(W,{$isRTL:s,children:e.jsx(V,{onClick:()=>S(I,t.folderId),children:e.jsxs(G,{children:[e.jsxs(U,{$isRTL:s,children:[e.jsxs(H,{$isRTL:s,children:[e.jsx(Q,{children:t.folderName||""}),(r||i)&&e.jsxs(pt,{$isRTL:s,children:[r&&t.createdAt&&_(t.createdAt)&&e.jsxs("div",{children:[a("Created"),": ",_(t.createdAt)]}),i&&t.updatedAt&&_(t.updatedAt)&&e.jsxs("div",{children:[a("Updated"),": ",_(t.updatedAt)]})]})]}),e.jsx(bt,{$isRTL:s,children:p?e.jsxs(gt,{children:[e.jsx(ft,{onClick:n=>{const P=n.currentTarget.nextElementSibling;P&&R(n,P)},children:a("Edit")}),e.jsxs(yt,{$isRTL:s,onClick:n=>{n.stopPropagation()},children:[e.jsx(q,{$isRTL:s,onClick:n=>{n.stopPropagation(),window.location.href=rt(`save-album.html?folderId=${encodeURIComponent(t.folderId)}`)},children:a("Edit Details")}),e.jsx(q,{$isRTL:s,$isDelete:!0,onClick:n=>{n.preventDefault(),n.stopPropagation(),$(t.folderPositionId)},children:a("Delete My Copy")})]})]}):e.jsx(mt,{onClick:n=>{n.preventDefault(),n.stopPropagation(),$(t.folderPositionId)},children:a("Delete My Copy")})})]}),t.folderDescription&&t.folderDescription.length>1&&e.jsx(O,{$isRTL:s,children:t.folderDescription}),e.jsx(ut,{$isRTL:s,children:t.files.length===1?`${a("{{count}} file",{count:t.files.length.toString()})} • ${E(u)}`:`${a("{{count}} files",{count:t.files.length.toString()})} • ${E(u)}`}),e.jsxs(Y,{children:[e.jsx(J,{$isRTL:s,children:t.files.map((n,P)=>e.jsx(tt,{children:e.jsx(M,{thumbnailDataKey:n.thumbnailDataKey,dataKey:n.dataKey,src:`${K}${n.thumbnailDataKey||n.dataKey}`,alt:a("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},P))}),t.files.length>3&&e.jsx(X,{$isRTL:s})]}),e.jsx(Z,{$isRTL:s,children:h!=="NoPassword"&&e.jsx(B,{children:e.jsx("span",{children:D(h)})})}),T==!1&&e.jsx(ht,{folder:t,openFilePicker:g,cognitoUsername:d,updateProfileIds:n=>v(t.folderId,n),onModalStateChange:n=>z(t.folderId,n)}),m.length>0&&e.jsx(wt,{$isRTL:s,children:e.jsxs($t,{$isRTL:s,children:[a("Shared with"),": ",m.join(", ")]})})]})})},t.folderId)})})};export{Tt as A,Pt as S};
