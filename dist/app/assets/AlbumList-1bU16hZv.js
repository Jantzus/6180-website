import{j as e,u as et,a as b,w as N,c as nt,h as it,f as rt,g as ot,d,S as F,H as _,b as st}from"./utils-C9eagC26.js";import{L as z}from"./LazyImage-DL8fCKIe.js";import{R as at,C as lt,Q as dt,D as ct}from"./DownloadModal-DrfXHBPA.js";import{af as pt,ag as E,ah as B,ai as ut,aj as ht}from"./styled-components-oDqJgaSn.js";const xt=({isOpen:o,onClose:u,inviteLink:h,onCopy:x,t:a,isRTL:j})=>{if(!o)return null;const r=j?"right":"left",f={width:"100%",padding:"12px",margin:"8px 0",border:"1px solid #ddd",borderRadius:"6px",backgroundColor:"#fff",textAlign:r,cursor:"pointer",fontSize:"14px",transition:"background-color 0.2s"},s=e.jsxs("div",{style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 0.5)",display:"flex",justifyContent:"center",alignItems:"center",zIndex:1e4,backdropFilter:"blur(4px)",WebkitBackdropFilter:"blur(4px)"},onClick:u,children:[e.jsxs("div",{style:{backgroundColor:"white",borderRadius:"12px",padding:"20px",width:"90%",maxWidth:"400px",boxShadow:"0 20px 60px rgba(0, 0, 0, 0.3)",direction:j?"rtl":"ltr",textAlign:r,position:"relative",animation:"modalFadeIn 0.2s ease-out"},onClick:n=>n.stopPropagation(),children:[e.jsx("h3",{style:{marginTop:0,marginBottom:"16px",fontSize:"18px",color:"#333",fontWeight:"600"},children:a("Choose an action")}),e.jsx("button",{style:f,onClick:n=>{n.stopPropagation(),x(h)},onMouseOver:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#f5f5f5"},onMouseOut:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#fff"},children:a("Link Only")}),e.jsx("button",{style:f,onClick:n=>{n.stopPropagation(),x(`${a("Here are photos from our event")}: ${h}`)},onMouseOver:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#f5f5f5"},onMouseOut:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#fff"},children:a("View Album Photos")}),e.jsx("button",{style:f,onClick:n=>{n.stopPropagation(),x(`${a("Please add any photos from our event here")}: ${h}`)},onMouseOver:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#f5f5f5"},onMouseOut:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#fff"},children:a("Add Photos To Album")}),e.jsx("button",{style:{...f,backgroundColor:"#f0f0f0",marginTop:"16px"},onClick:n=>{n.stopPropagation(),u()},onMouseOver:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#e0e0e0"},onMouseOut:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#f0f0f0"},children:a("Cancel")})]}),e.jsx("style",{children:`
          @keyframes modalFadeIn {
            from {
              opacity: 0;
              transform: scale(0.9) translateY(-10px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
        `})]});return at.createPortal(s,document.body)},gt=({folder:o,cognitoUsername:u,updateProfileIds:h,onModalStateChange:x})=>{const{t:a,language:j}=et(),r=ot(j)==="rtl",[f,s]=b.useState(!1),[n,R]=b.useState(!1),[v,D]=b.useState(!1),[C,S]=b.useState(!1),[P,$]=b.useState(o.profileIds||[]),I=u?`${u}_____Public____Profile`:"",t=P.includes(I),l=N(o.folderId,o.albumNanoId,o.creatorId&&o.contacts&&o.contacts[o.creatorId]?o.contacts[o.creatorId]:"album",o.folderName);b.useEffect(()=>{$(o.profileIds||[])},[o.profileIds]),b.useEffect(()=>{x&&x(f||n||v||C)},[f,n,v,C,x]);const p=c=>{navigator.clipboard.writeText(c).then(()=>{s(!1),R(!0)}).catch(k=>{console.error("Failed to copy link:",k),alert(a("Failed to copy link"))})},g=async c=>{if(c.preventDefault(),c.stopPropagation(),!await nt()){alert(a("You must be logged in to download photos"));return}if(!o||!o.files||o.files.length===0){alert(a("No items to download"));return}S(!0)},y=async c=>{var k,A,T;if(c.preventDefault(),c.stopPropagation(),!u){alert(a("You must be logged in to perform this action"));return}try{const i=await it();if(!i){console.error("Authentication failed");return}const m=[...P];if(t){const O=m.indexOf(I);O>-1&&m.splice(O,1)}else m.push(I);const L=await(await fetch(rt,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({query:`
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
      `,variables:{folderPositionChangeProfileIdsInput:{folderId:o.folderId,profileIds:m}}})})).json();if(L.errors)throw new Error(((k=L.errors[0])==null?void 0:k.message)||"Unknown error");const M=(((T=(A=L==null?void 0:L.data)==null?void 0:A.changeFiles)==null?void 0:T.items)||[]).find(O=>O.id===o.folderPositionId);M&&M.profileIds&&($(M.profileIds),h&&h(M.profileIds),console.log("Album visibility updated successfully"))}catch(i){console.error("Failed to toggle album visibility:",i),alert(a("Failed to update album visibility. Please try again."))}},w={padding:"8px 12px",border:"none",borderRadius:6,cursor:"pointer",fontSize:14,textAlign:"center",whiteSpace:"nowrap",flexShrink:0};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:16,flexDirection:r?"row-reverse":"row"},children:[e.jsx("div",{style:{display:"flex",width:"100%",overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none",WebkitOverflowScrolling:"touch",flexDirection:r?"row-reverse":"row",gap:"10px"},children:e.jsxs("div",{style:{display:"flex",gap:"10px",flexDirection:r?"row-reverse":"row"},children:[e.jsx("button",{onClick:c=>{c.preventDefault(),c.stopPropagation(),D(!0)},style:{...w,backgroundColor:"#4caf50",color:"white"},children:a("Show QR Code")}),e.jsx("button",{onClick:g,style:{...w,backgroundColor:"#2196f3",color:"white"},children:a("Download")}),e.jsx("button",{onClick:c=>{c.preventDefault(),c.stopPropagation(),s(!0)},style:{...w,backgroundColor:"#e0e0e0"},children:a("Copy Link")}),e.jsxs("button",{onClick:y,style:{...w,backgroundColor:t?"#4caf50":"#e0e0e0",color:t?"white":"inherit",display:"flex",alignItems:"center",gap:"6px",position:"relative",border:t?"none":"1px solid #ccc",transition:"all 0.2s ease"},children:[e.jsx("div",{style:{width:"8px",height:"8px",backgroundColor:t?"rgba(255,255,255,0.8)":"#999",borderRadius:"50%",transition:"all 0.2s ease",flexShrink:0}}),e.jsx("span",{style:{flexShrink:0},children:a(t?"On Public Profile":"Not On Public Profile")})]})]})}),e.jsx("style",{children:`
            div::-webkit-scrollbar {
              display: none;
            }
          `})]}),e.jsx(xt,{isOpen:f,onClose:()=>s(!1),inviteLink:l,onCopy:p,t:a,isRTL:r}),e.jsx(lt,{isOpen:n,onClose:()=>R(!1),t:a,isRTL:r}),e.jsx(dt,{isOpen:v,onClose:()=>D(!1),albumLink:l,t:a,isRTL:r}),e.jsx(ct,{isOpen:C,folder:o,onClose:()=>S(!1)})]})},K=o=>{if(o===0)return"0 B";const u=1024,h=["B","KB","MB","GB","TB"],x=Math.floor(Math.log(o)/Math.log(u));return`${Math.round(o/Math.pow(u,x)*100)/100} ${h[x]}`},ft=o=>o.reduce((u,h)=>u+(h.dataInBytes||0),0),W=d.div`
  margin-bottom: 30px;
  width: 100%;
  direction: ${o=>o.$isRTL?"rtl":"ltr"};
`,V=d.div`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  cursor: pointer;
`,Q=d.div`
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  /* Enhanced shadow for more depth */
  box-shadow: 
    0 2px 4px rgba(0,0,0,0.04),
    0 8px 16px rgba(0,0,0,0.06);
  /* Subtle border for definition */
  border: 1px solid rgba(0,0,0,0.04);
  transition: all 0.3s ease;
  width: 100%;
  max-width: 100%;
  position: relative;
  box-sizing: border-box;
  /* REMOVED: overflow: hidden; - This was preventing modals from extending beyond the card */
  /* Very subtle backdrop effect */
  backdrop-filter: blur(1px);

  &:hover {
    /* Enhanced hover state */
    box-shadow: 
      0 4px 8px rgba(0,0,0,0.06),
      0 12px 24px rgba(0,0,0,0.1);
    border-color: rgba(0,0,0,0.08);
    /* Subtle lift effect */
    transform: translateY(-2px);
  }
`,G=d.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
  flex-direction: ${o=>o.$isRTL?"row-reverse":"row"};
`,H=d.div`
  display: flex;
  flex-direction: column;
  align-items: ${o=>o.$isRTL?"flex-end":"flex-start"};
`,Y=d.h2`
  font-size: 20px;
  margin: 0;
  color: #222;
`,bt=d.div`
  display: flex;
  flex-direction: column;
  align-items: ${o=>o.$isRTL?"flex-start":"flex-end"};
  justify-content: flex-end;
  gap: 8px;
`,yt=d.div`
  position: relative;
`,mt=d.button`
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
`,wt=d.button`
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
`,kt=d.div`
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
`,U=d.button`
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
`,q=d.div`
  width: 100%;
  position: relative;
`,J=d.div`
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding-bottom: 8px;
  ms-overflow-style: none;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
  max-width: 100%;
  flex-direction: ${o=>o.$isRTL?"row-reverse":"row"};
`,X=d.div`
  position: absolute;
  ${o=>o.$isRTL?"left":"right"}: 0;
  top: 0;
  bottom: 8px;
  width: 30px;
  background: ${o=>o.$isRTL?"linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))":"linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))"};
  pointer-events: none;
`,Z=d.div`
  display: flex;
  justify-content: ${o=>o.$isRTL?"flex-start":"flex-end"};
  margin-top: 8px;
  margin-bottom: 8px;
`,jt=d.div`
  width: 100%;
  background-color: #f0f7ff;
  border-radius: 8px;
  padding: 12px 16px;
  margin-top: 16px;
  box-sizing: border-box;
  border: 1px solid #d0e1f9;
  direction: ${o=>o.$isRTL?"rtl":"ltr"};
`,Ct=d.p`
  margin: 0;
  font-size: 14px;
  color: #333;
  text-align: ${o=>o.$isRTL?"right":"left"};
`,tt=d.div`
  width: 160px;
  height: 100px;
  flex-shrink: 0;
`,Dt=({folders:o,setFolders:u,handleDeleteClick:h,isUploading:x=!1,cognitoUsername:a,isProfileView:j=!1})=>{const{t:r,language:f}=et(),s=ot(f)==="rtl",n=b.useRef(null),[R,v]=b.useState({});b.useEffect(()=>{function t(){n.current&&(n.current.style.display="none",n.current=null)}function l(){t()}return window.addEventListener("scroll",l,!0),()=>{window.removeEventListener("scroll",l,!0)}},[]);const D=(t,l)=>{t.preventDefault(),t.stopPropagation(),n.current&&n.current!==l&&(n.current.style.display="none");const p=l.style.display==="block";l.style.display=p?"none":"block",n.current=p?null:l},C=t=>{n.current&&(n.current.style.display="none",n.current=null),window.confirm(r("Are you sure you want to delete this album? This action cannot be undone."))&&h&&h(t,r)},S=(t,l)=>{u&&u(p=>p.map(g=>g.folderId===t?{...g,profileIds:l}:g))},P=t=>{switch(t){case"NotVisible":return r("Hidden");case"Watermark":return r("Watermarked");case"CannotBeSaved":return r("Cannot be saved");case"NoPassword":default:return r("No password")}},$=(t,l)=>{const p=n.current&&n.current.style.display==="block",g=R[l]||!1;!p&&!g&&(window.location.href=t)},I=(t,l)=>{v(p=>({...p,[t]:l}))};return o.length===0&&!x?e.jsx(pt,{$type:"empty",children:e.jsx("p",{children:r("No albums found")})}):j?e.jsx(e.Fragment,{children:o.map(t=>{var g;const l=((g=t.folderPassword)==null?void 0:g.policy)||"NoPassword",p=N(t.folderId,t.albumNanoId||null,t.creatorId&&t.contacts&&t.contacts[t.creatorId],t.folderName);return e.jsx(W,{$isRTL:s,children:e.jsx(V,{onClick:()=>$(p,t.folderId),children:e.jsxs(Q,{children:[e.jsx(G,{$isRTL:s,children:e.jsx(H,{$isRTL:s,children:e.jsx(Y,{children:t.folderName||""})})}),t.folderDescription&&t.folderDescription.length>1&&e.jsx(E,{$isRTL:s,children:t.folderDescription}),e.jsxs(q,{children:[e.jsx(J,{$isRTL:s,children:t.files.map((y,w)=>e.jsx(tt,{children:e.jsx(z,{thumbnailDataKey:y.thumbnailDataKey,dataKey:y.dataKey,src:`${F}${y.thumbnailDataKey||y.dataKey}`,alt:r("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},w))}),t.files.length>3&&e.jsx(X,{$isRTL:s})]}),e.jsx(Z,{$isRTL:s,children:l!=="NoPassword"&&e.jsx(B,{children:e.jsx("span",{children:P(l)})})})]})})},t.folderId)})}):e.jsx(e.Fragment,{children:o.map(t=>{var T;const l=t.createdAt!=null,p=t.updatedAt!=null&&t.createdAt!=null&&t.updatedAt!==t.createdAt,g=t.creatorId===`${a}_____${a}____Account`,y=((T=t.folderPassword)==null?void 0:T.policy)||"NoPassword",w=t.contacts||{},c=Object.values(w).filter(i=>i&&typeof i=="string"&&!i.toString().startsWith("Profile-")),k=ft(t.files),A=N(t.folderId,t.albumNanoId||null,t.creatorId&&t.contacts&&t.contacts[t.creatorId],t.folderName);return e.jsx(W,{$isRTL:s,children:e.jsx(V,{onClick:()=>$(A,t.folderId),children:e.jsxs(Q,{children:[e.jsxs(G,{$isRTL:s,children:[e.jsxs(H,{$isRTL:s,children:[e.jsx(Y,{children:t.folderName||""}),(l||p)&&e.jsxs(ut,{$isRTL:s,children:[l&&t.createdAt&&_(t.createdAt)&&e.jsxs("div",{children:[r("Created"),": ",_(t.createdAt)]}),p&&t.updatedAt&&_(t.updatedAt)&&e.jsxs("div",{children:[r("Updated"),": ",_(t.updatedAt)]})]})]}),e.jsx(bt,{$isRTL:s,children:g?e.jsxs(yt,{children:[e.jsx(mt,{onClick:i=>{const m=i.currentTarget.nextElementSibling;m&&D(i,m)},children:r("Edit")}),e.jsxs(kt,{$isRTL:s,onClick:i=>{i.stopPropagation()},children:[e.jsx(U,{$isRTL:s,onClick:i=>{i.stopPropagation(),window.location.href=st(`save-album.html?folderId=${encodeURIComponent(t.folderId)}`)},children:r("Edit Details")}),e.jsx(U,{$isRTL:s,$isDelete:!0,onClick:i=>{i.preventDefault(),i.stopPropagation(),t.folderPositionId&&C(t.folderPositionId)},children:r("Delete My Copy")})]})]}):e.jsx(wt,{onClick:i=>{i.preventDefault(),i.stopPropagation(),t.folderPositionId&&C(t.folderPositionId)},children:r("Delete My Copy")})})]}),t.folderDescription&&t.folderDescription.length>1&&e.jsx(E,{$isRTL:s,children:t.folderDescription}),e.jsx(ht,{$isRTL:s,children:t.files.length===1?`${r("{{count}} file",{count:t.files.length.toString()})} • ${K(k)}`:`${r("{{count}} files",{count:t.files.length.toString()})} • ${K(k)}`}),e.jsxs(q,{children:[e.jsx(J,{$isRTL:s,children:t.files.map((i,m)=>e.jsx(tt,{children:e.jsx(z,{thumbnailDataKey:i.thumbnailDataKey,dataKey:i.dataKey,src:`${F}${i.thumbnailDataKey||i.dataKey}`,alt:r("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},m))}),t.files.length>3&&e.jsx(X,{$isRTL:s})]}),e.jsx(Z,{$isRTL:s,children:y!=="NoPassword"&&e.jsx(B,{children:e.jsx("span",{children:P(y)})})}),j==!1&&e.jsx(gt,{folder:t,cognitoUsername:a,updateProfileIds:i=>S(t.folderId,i),onModalStateChange:i=>I(t.folderId,i)}),c.length>0&&e.jsx(jt,{$isRTL:s,children:e.jsxs(Ct,{$isRTL:s,children:[r("Shared with"),": ",c.join(", ")]})})]})})},t.folderId)})})};export{Dt as A};
