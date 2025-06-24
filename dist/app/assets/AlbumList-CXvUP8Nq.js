import{j as e,u as et,a as f,w as N,c as nt,h as it,f as rt,g as ot,d as l,S as F,H as _,b as st}from"./utils-BR5Tkj09.js";import{L as z}from"./LazyImage-CX-6wHVd.js";import{R as at,C as lt,Q as dt,D as ct}from"./DownloadModal-C8Mb1Z2U.js";import{af as pt,ag as E,ah as B,ai as ut,aj as ht}from"./styled-components-D8vhGa_p.js";const xt=({isOpen:o,onClose:u,inviteLink:h,onCopy:x,t:s,isRTL:k})=>{if(!o)return null;const i={width:"100%",padding:"12px",margin:"8px 0",border:"1px solid #ddd",borderRadius:"6px",backgroundColor:"#fff",textAlign:"center",cursor:"pointer",fontSize:"14px",transition:"background-color 0.2s"},j=e.jsxs("div",{style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 0.5)",display:"flex",justifyContent:"center",alignItems:"center",zIndex:1e4,backdropFilter:"blur(4px)",WebkitBackdropFilter:"blur(4px)"},onClick:u,children:[e.jsxs("div",{style:{backgroundColor:"white",borderRadius:"12px",padding:"20px",width:"90%",maxWidth:"400px",boxShadow:"0 20px 60px rgba(0, 0, 0, 0.3)",direction:k?"rtl":"ltr",position:"relative",animation:"modalFadeIn 0.2s ease-out"},onClick:n=>n.stopPropagation(),children:[e.jsx("h3",{style:{marginTop:0,marginBottom:"16px",fontSize:"18px",color:"#333",fontWeight:"600",textAlign:k?"right":"left"},children:s("Choose an action")}),e.jsx("button",{style:i,onClick:n=>{n.stopPropagation(),x(h)},onMouseOver:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#f5f5f5"},onMouseOut:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#fff"},children:s("Link Only")}),e.jsx("button",{style:i,onClick:n=>{n.stopPropagation(),x(`${s("Here are photos from our event")}: ${h}`)},onMouseOver:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#f5f5f5"},onMouseOut:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#fff"},children:s("View Album Photos")}),e.jsx("button",{style:i,onClick:n=>{n.stopPropagation(),x(`${s("Please add any photos from our event here")}: ${h}`)},onMouseOver:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#f5f5f5"},onMouseOut:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#fff"},children:s("Add Photos To Album")}),e.jsx("button",{style:{...i,backgroundColor:"#f0f0f0",marginTop:"16px"},onClick:n=>{n.stopPropagation(),u()},onMouseOver:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#e0e0e0"},onMouseOut:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#f0f0f0"},children:s("Cancel")})]}),e.jsx("style",{children:`
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
        `})]});return at.createPortal(j,document.body)},gt=({folder:o,cognitoUsername:u,updateProfileIds:h,onModalStateChange:x})=>{const{t:s,language:k}=et(),i=ot(k)==="rtl",[j,n]=f.useState(!1),[c,R]=f.useState(!1),[v,D]=f.useState(!1),[C,S]=f.useState(!1),[P,$]=f.useState(o.profileIds||[]),I=u?`${u}_____Public____Profile`:"",t=P.includes(I),a=N(o.folderId,o.albumNanoId,o.creatorId&&o.contacts&&o.contacts[o.creatorId]?o.contacts[o.creatorId]:"album",o.folderName);f.useEffect(()=>{$(o.profileIds||[])},[o.profileIds]),f.useEffect(()=>{x&&x(j||c||v||C)},[j,c,v,C,x]);const p=d=>{navigator.clipboard.writeText(d).then(()=>{n(!1),R(!0)}).catch(w=>{console.error("Failed to copy link:",w),alert(s("Failed to copy link"))})},g=async d=>{if(d.preventDefault(),d.stopPropagation(),!await nt()){alert(s("You must be logged in to download photos"));return}if(!o||!o.files||o.files.length===0){alert(s("No items to download"));return}S(!0)},b=async d=>{var w,A,T;if(d.preventDefault(),d.stopPropagation(),!u){alert(s("You must be logged in to perform this action"));return}try{const r=await it();if(!r){console.error("Authentication failed");return}const y=[...P];if(t){const O=y.indexOf(I);O>-1&&y.splice(O,1)}else y.push(I);const L=await(await fetch(rt,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({query:`
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
      `,variables:{folderPositionChangeProfileIdsInput:{folderId:o.folderId,profileIds:y}}})})).json();if(L.errors)throw new Error(((w=L.errors[0])==null?void 0:w.message)||"Unknown error");const M=(((T=(A=L==null?void 0:L.data)==null?void 0:A.changeFiles)==null?void 0:T.items)||[]).find(O=>O.id===o.folderPositionId);M&&M.profileIds&&($(M.profileIds),h&&h(M.profileIds),console.log("Album visibility updated successfully"))}catch(r){console.error("Failed to toggle album visibility:",r),alert(s("Failed to update album visibility. Please try again."))}},m={padding:"8px 12px",border:"none",borderRadius:6,cursor:"pointer",fontSize:14,textAlign:"center",whiteSpace:"nowrap",flexShrink:0};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:16,flexDirection:i?"row-reverse":"row"},children:[e.jsx("div",{style:{display:"flex",width:"100%",overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none",WebkitOverflowScrolling:"touch",flexDirection:i?"row-reverse":"row",gap:"10px"},children:e.jsxs("div",{style:{display:"flex",gap:"10px",flexDirection:i?"row-reverse":"row"},children:[e.jsx("button",{onClick:d=>{d.preventDefault(),d.stopPropagation(),D(!0)},style:{...m,backgroundColor:"#4caf50",color:"white"},children:s("Show QR Code")}),e.jsx("button",{onClick:g,style:{...m,backgroundColor:"#2196f3",color:"white"},children:s("Download")}),e.jsx("button",{onClick:d=>{d.preventDefault(),d.stopPropagation(),n(!0)},style:{...m,backgroundColor:"#e0e0e0"},children:s("Copy Link")}),e.jsxs("button",{onClick:b,style:{...m,backgroundColor:t?"#4caf50":"#e0e0e0",color:t?"white":"inherit",display:"flex",alignItems:"center",gap:"6px",position:"relative",border:t?"none":"1px solid #ccc",transition:"all 0.2s ease"},children:[e.jsx("div",{style:{width:"8px",height:"8px",backgroundColor:t?"rgba(255,255,255,0.8)":"#999",borderRadius:"50%",transition:"all 0.2s ease",flexShrink:0}}),e.jsx("span",{style:{flexShrink:0},children:s(t?"On Public Profile":"Not On Public Profile")})]})]})}),e.jsx("style",{children:`
            div::-webkit-scrollbar {
              display: none;
            }
          `})]}),e.jsx(xt,{isOpen:j,onClose:()=>n(!1),inviteLink:a,onCopy:p,t:s,isRTL:i}),e.jsx(lt,{isOpen:c,onClose:()=>R(!1),t:s,isRTL:i}),e.jsx(dt,{isOpen:v,onClose:()=>D(!1),albumLink:a,t:s,isRTL:i}),e.jsx(ct,{isOpen:C,folder:o,onClose:()=>S(!1)})]})},K=o=>{if(o===0)return"0 B";const u=1024,h=["B","KB","MB","GB","TB"],x=Math.floor(Math.log(o)/Math.log(u));return`${Math.round(o/Math.pow(u,x)*100)/100} ${h[x]}`},ft=o=>o.reduce((u,h)=>u+(h.dataInBytes||0),0),W=l.div`
  margin-bottom: 30px;
  width: 100%;
  direction: ${o=>o.$isRTL?"rtl":"ltr"};
`,Q=l.div`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  cursor: pointer;
`,V=l.div`
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
`,G=l.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
  flex-direction: ${o=>o.$isRTL?"row-reverse":"row"};
`,H=l.div`
  display: flex;
  flex-direction: column;
  align-items: ${o=>o.$isRTL?"flex-end":"flex-start"};
`,Y=l.h2`
  font-size: 20px;
  margin: 0;
  color: #222;
`,bt=l.div`
  display: flex;
  flex-direction: column;
  align-items: ${o=>o.$isRTL?"flex-start":"flex-end"};
  justify-content: flex-end;
  gap: 8px;
`,yt=l.div`
  position: relative;
`,mt=l.button`
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
`,wt=l.button`
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
`,kt=l.div`
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
`,U=l.button`
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
`,q=l.div`
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
`,jt=l.div`
  width: 100%;
  background-color: #f0f7ff;
  border-radius: 8px;
  padding: 12px 16px;
  margin-top: 16px;
  box-sizing: border-box;
  border: 1px solid #d0e1f9;
  direction: ${o=>o.$isRTL?"rtl":"ltr"};
`,Ct=l.p`
  margin: 0;
  font-size: 14px;
  color: #333;
  text-align: ${o=>o.$isRTL?"right":"left"};
`,tt=l.div`
  width: 160px;
  height: 100px;
  flex-shrink: 0;
`,Dt=({folders:o,setFolders:u,handleDeleteClick:h,isUploading:x=!1,cognitoUsername:s,isProfileView:k=!1})=>{const{t:i,language:j}=et(),n=ot(j)==="rtl",c=f.useRef(null),[R,v]=f.useState({});f.useEffect(()=>{function t(){c.current&&(c.current.style.display="none",c.current=null)}function a(){t()}return window.addEventListener("scroll",a,!0),()=>{window.removeEventListener("scroll",a,!0)}},[]);const D=(t,a)=>{t.preventDefault(),t.stopPropagation(),c.current&&c.current!==a&&(c.current.style.display="none");const p=a.style.display==="block";a.style.display=p?"none":"block",c.current=p?null:a},C=t=>{c.current&&(c.current.style.display="none",c.current=null),window.confirm(i("Are you sure you want to delete this album? This action cannot be undone."))&&h&&h(t,i)},S=(t,a)=>{u&&u(p=>p.map(g=>g.folderId===t?{...g,profileIds:a}:g))},P=t=>{switch(t){case"NotVisible":return i("Hidden");case"Watermark":return i("Watermarked");case"CannotBeSaved":return i("Cannot be saved");case"NoPassword":default:return i("No password")}},$=(t,a)=>{const p=c.current&&c.current.style.display==="block",g=R[a]||!1;!p&&!g&&(window.location.href=t)},I=(t,a)=>{v(p=>({...p,[t]:a}))};return o.length===0&&!x?e.jsx(pt,{$type:"empty",children:e.jsx("p",{children:i("No albums found")})}):k?e.jsx(e.Fragment,{children:o.map(t=>{var g;const a=((g=t.folderPassword)==null?void 0:g.policy)||"NoPassword",p=N(t.folderId,t.albumNanoId||null,t.creatorId&&t.contacts&&t.contacts[t.creatorId],t.folderName);return e.jsx(W,{$isRTL:n,children:e.jsx(Q,{onClick:()=>$(p,t.folderId),children:e.jsxs(V,{children:[e.jsx(G,{$isRTL:n,children:e.jsx(H,{$isRTL:n,children:e.jsx(Y,{children:t.folderName||""})})}),t.folderDescription&&t.folderDescription.length>1&&e.jsx(E,{$isRTL:n,children:t.folderDescription}),e.jsxs(q,{children:[e.jsx(J,{$isRTL:n,children:t.files.map((b,m)=>e.jsx(tt,{children:e.jsx(z,{thumbnailDataKey:b.thumbnailDataKey,dataKey:b.dataKey,src:`${F}${b.thumbnailDataKey||b.dataKey}`,alt:i("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},m))}),t.files.length>3&&e.jsx(X,{$isRTL:n})]}),e.jsx(Z,{$isRTL:n,children:a!=="NoPassword"&&e.jsx(B,{children:e.jsx("span",{children:P(a)})})})]})})},t.folderId)})}):e.jsx(e.Fragment,{children:o.map(t=>{var T;const a=t.createdAt!=null,p=t.updatedAt!=null&&t.createdAt!=null&&t.updatedAt!==t.createdAt,g=t.creatorId===`${s}_____${s}____Account`,b=((T=t.folderPassword)==null?void 0:T.policy)||"NoPassword",m=t.contacts||{},d=Object.values(m).filter(r=>r&&typeof r=="string"&&!r.toString().startsWith("Profile-")),w=ft(t.files),A=N(t.folderId,t.albumNanoId||null,t.creatorId&&t.contacts&&t.contacts[t.creatorId],t.folderName);return e.jsx(W,{$isRTL:n,children:e.jsx(Q,{onClick:()=>$(A,t.folderId),children:e.jsxs(V,{children:[e.jsxs(G,{$isRTL:n,children:[e.jsxs(H,{$isRTL:n,children:[e.jsx(Y,{children:t.folderName||""}),(a||p)&&e.jsxs(ut,{$isRTL:n,children:[a&&t.createdAt&&_(t.createdAt)&&e.jsxs("div",{children:[i("Created"),": ",_(t.createdAt)]}),p&&t.updatedAt&&_(t.updatedAt)&&e.jsxs("div",{children:[i("Updated"),": ",_(t.updatedAt)]})]})]}),e.jsx(bt,{$isRTL:n,children:g?e.jsxs(yt,{children:[e.jsx(mt,{onClick:r=>{const y=r.currentTarget.nextElementSibling;y&&D(r,y)},children:i("Edit")}),e.jsxs(kt,{$isRTL:n,onClick:r=>{r.stopPropagation()},children:[e.jsx(U,{$isRTL:n,onClick:r=>{r.stopPropagation(),window.location.href=st(`save-album.html?folderId=${encodeURIComponent(t.folderId)}`)},children:i("Edit Details")}),e.jsx(U,{$isRTL:n,$isDelete:!0,onClick:r=>{r.preventDefault(),r.stopPropagation(),t.folderPositionId&&C(t.folderPositionId)},children:i("Delete My Copy")})]})]}):e.jsx(wt,{onClick:r=>{r.preventDefault(),r.stopPropagation(),t.folderPositionId&&C(t.folderPositionId)},children:i("Delete My Copy")})})]}),t.folderDescription&&t.folderDescription.length>1&&e.jsx(E,{$isRTL:n,children:t.folderDescription}),e.jsx(ht,{$isRTL:n,children:t.files.length===1?`${i("{{count}} file",{count:t.files.length.toString()})} • ${K(w)}`:`${i("{{count}} files",{count:t.files.length.toString()})} • ${K(w)}`}),e.jsxs(q,{children:[e.jsx(J,{$isRTL:n,children:t.files.map((r,y)=>e.jsx(tt,{children:e.jsx(z,{thumbnailDataKey:r.thumbnailDataKey,dataKey:r.dataKey,src:`${F}${r.thumbnailDataKey||r.dataKey}`,alt:i("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},y))}),t.files.length>3&&e.jsx(X,{$isRTL:n})]}),e.jsx(Z,{$isRTL:n,children:b!=="NoPassword"&&e.jsx(B,{children:e.jsx("span",{children:P(b)})})}),k==!1&&e.jsx(gt,{folder:t,cognitoUsername:s,updateProfileIds:r=>S(t.folderId,r),onModalStateChange:r=>I(t.folderId,r)}),d.length>0&&e.jsx(jt,{$isRTL:n,children:e.jsxs(Ct,{$isRTL:n,children:[i("Shared with"),": ",d.join(", ")]})})]})})},t.folderId)})})};export{Dt as A};
