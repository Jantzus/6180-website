import{j as e,u as ot,a as f,w as N,c as it,h as rt,f as st,g as nt,d as l,S as E,H as _,b as at,L as F}from"./utils-DBhM6xd7.js";import{L as B}from"./LazyImage-BZj5n6Lr.js";import{R as lt,C as ct,Q as dt,D as pt}from"./DownloadModal-CFy7UOv4.js";import{af as ut,ag as z,ah as K,ai as ht,aj as xt}from"./styled-components-BLYKy1un.js";const gt=({isOpen:o,onClose:u,inviteLink:h,onCopy:x,t:s,isRTL:k})=>{if(!o)return null;const i={width:"100%",padding:"12px",margin:"8px 0",border:"1px solid #ddd",borderRadius:"6px",backgroundColor:"#fff",textAlign:"center",cursor:"pointer",fontSize:"14px",transition:"background-color 0.2s"},j=e.jsxs("div",{style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 0.5)",display:"flex",justifyContent:"center",alignItems:"center",zIndex:1e4,backdropFilter:"blur(4px)",WebkitBackdropFilter:"blur(4px)"},onClick:u,children:[e.jsxs("div",{style:{backgroundColor:"white",borderRadius:"12px",padding:"20px",width:"90%",maxWidth:"400px",boxShadow:"0 20px 60px rgba(0, 0, 0, 0.3)",direction:k?"rtl":"ltr",position:"relative",animation:"modalFadeIn 0.2s ease-out"},onClick:n=>n.stopPropagation(),children:[e.jsx("h3",{style:{marginTop:0,marginBottom:"16px",fontSize:"18px",color:"#333",fontWeight:"600",textAlign:k?"right":"left"},children:s("Choose an action")}),e.jsx("button",{style:i,onClick:n=>{n.stopPropagation(),x(h)},onMouseOver:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#f5f5f5"},onMouseOut:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#fff"},children:s("Link Only")}),e.jsx("button",{style:i,onClick:n=>{n.stopPropagation(),x(`${s("Here are photos from our event")}: ${h}`)},onMouseOver:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#f5f5f5"},onMouseOut:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#fff"},children:s("View Album Photos")}),e.jsx("button",{style:i,onClick:n=>{n.stopPropagation(),x(`${s("Please add any photos from our event here")}: ${h}`)},onMouseOver:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#f5f5f5"},onMouseOut:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#fff"},children:s("Add Photos To Album")}),e.jsx("button",{style:{...i,backgroundColor:"#f0f0f0",marginTop:"16px"},onClick:n=>{n.stopPropagation(),u()},onMouseOver:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#e0e0e0"},onMouseOut:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#f0f0f0"},children:s("Cancel")})]}),e.jsx("style",{children:`
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
        `})]});return lt.createPortal(j,document.body)},ft=({folder:o,cognitoUsername:u,updateProfileIds:h,onModalStateChange:x})=>{const{t:s,language:k}=ot(),i=nt(k)==="rtl",[j,n]=f.useState(!1),[d,R]=f.useState(!1),[C,S]=f.useState(!1),[v,A]=f.useState(!1),[P,$]=f.useState(o.profileIds||[]),I=u?`${u}_____Public____Profile`:"",t=P.includes(I),a=N(o.folderId,o.albumNanoId,o.creatorId&&o.contacts&&o.contacts[o.creatorId]?o.contacts[o.creatorId]:"album",o.folderName);f.useEffect(()=>{$(o.profileIds||[])},[o.profileIds]),f.useEffect(()=>{x&&x(j||d||C||v)},[j,d,C,v,x]);const p=c=>{navigator.clipboard.writeText(c).then(()=>{n(!1),R(!0)}).catch(w=>{console.error("Failed to copy link:",w),alert(s("Failed to copy link"))})},g=async c=>{if(c.preventDefault(),c.stopPropagation(),!await it()){alert(s("You must be logged in to download photos"));return}if(!o||!o.files||o.files.length===0){alert(s("No items to download"));return}A(!0)},b=async c=>{var w,D,T;if(c.preventDefault(),c.stopPropagation(),!u){alert(s("You must be logged in to perform this action"));return}try{const r=await rt();if(!r){console.error("Authentication failed");return}const m=[...P];if(t){const O=m.indexOf(I);O>-1&&m.splice(O,1)}else m.push(I);const L=await(await fetch(st,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({query:`
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
      `,variables:{folderPositionChangeProfileIdsInput:{folderId:o.folderId,profileIds:m}}})})).json();if(L.errors)throw new Error(((w=L.errors[0])==null?void 0:w.message)||"Unknown error");const M=(((T=(D=L==null?void 0:L.data)==null?void 0:D.changeFiles)==null?void 0:T.items)||[]).find(O=>O.id===o.folderPositionId);M&&M.profileIds&&($(M.profileIds),h&&h(M.profileIds),console.log("Album visibility updated successfully"))}catch(r){console.error("Failed to toggle album visibility:",r),alert(s("Failed to update album visibility. Please try again."))}},y={padding:"8px 12px",border:"none",borderRadius:6,cursor:"pointer",fontSize:14,textAlign:"center",whiteSpace:"nowrap",flexShrink:0};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:16,flexDirection:i?"row-reverse":"row"},children:[e.jsx("div",{style:{display:"flex",width:"100%",overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none",WebkitOverflowScrolling:"touch",flexDirection:i?"row-reverse":"row",gap:"10px"},children:e.jsxs("div",{style:{display:"flex",gap:"10px",flexDirection:i?"row-reverse":"row"},children:[e.jsx("button",{onClick:c=>{c.preventDefault(),c.stopPropagation(),S(!0)},style:{...y,backgroundColor:"#4caf50",color:"white"},children:s("Show QR Code")}),e.jsx("button",{onClick:g,style:{...y,backgroundColor:"#2196f3",color:"white"},children:s("Download")}),e.jsx("button",{onClick:c=>{c.preventDefault(),c.stopPropagation(),n(!0)},style:{...y,backgroundColor:"#e0e0e0"},children:s("Copy Link")}),e.jsxs("button",{onClick:b,style:{...y,backgroundColor:t?"#4caf50":"#e0e0e0",color:t?"white":"inherit",display:"flex",alignItems:"center",gap:"6px",position:"relative",border:t?"none":"1px solid #ccc",transition:"all 0.2s ease"},children:[e.jsx("div",{style:{width:"8px",height:"8px",backgroundColor:t?"rgba(255,255,255,0.8)":"#999",borderRadius:"50%",transition:"all 0.2s ease",flexShrink:0}}),e.jsx("span",{style:{flexShrink:0},children:s(t?"On Public Profile":"Not On Public Profile")})]})]})}),e.jsx("style",{children:`
            div::-webkit-scrollbar {
              display: none;
            }
          `})]}),e.jsx(gt,{isOpen:j,onClose:()=>n(!1),inviteLink:a,onCopy:p,t:s,isRTL:i}),e.jsx(ct,{isOpen:d,onClose:()=>R(!1),t:s,isRTL:i}),e.jsx(dt,{isOpen:C,onClose:()=>S(!1),albumLink:a,t:s,isRTL:i}),e.jsx(pt,{isOpen:v,folder:o,onClose:()=>A(!1)})]})},W=o=>{if(o===0)return"0 B";const u=1024,h=["B","KB","MB","GB","TB"],x=Math.floor(Math.log(o)/Math.log(u));return`${Math.round(o/Math.pow(u,x)*100)/100} ${h[x]}`},bt=o=>o.reduce((u,h)=>u+(h.dataInBytes||0),0),mt=()=>{localStorage.removeItem(F.SELECTED_PHOTOS),localStorage.removeItem(F.SUB_ALBUM_DATA),localStorage.removeItem(F.MULTI_ALBUM_DATA),localStorage.removeItem(F.ALBUM_GROUPS)},U=l.div`
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
`,yt=l.div`
  display: flex;
  flex-direction: column;
  align-items: ${o=>o.$isRTL?"flex-start":"flex-end"};
  justify-content: flex-end;
  gap: 8px;
`,wt=l.div`
  position: relative;
`,kt=l.button`
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
`,jt=l.button`
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
`,vt=l.div`
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
`,J=l.div`
  width: 100%;
  position: relative;
`,X=l.div`
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding-bottom: 8px;
  ms-overflow-style: none;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
  max-width: 100%;
  flex-direction: ${o=>o.$isRTL?"row-reverse":"row"};
`,Z=l.div`
  position: absolute;
  ${o=>o.$isRTL?"left":"right"}: 0;
  top: 0;
  bottom: 8px;
  width: 30px;
  background: ${o=>o.$isRTL?"linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))":"linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))"};
  pointer-events: none;
`,tt=l.div`
  display: flex;
  justify-content: ${o=>o.$isRTL?"flex-start":"flex-end"};
  margin-top: 8px;
  margin-bottom: 8px;
`,Ct=l.div`
  width: 100%;
  background-color: #f0f7ff;
  border-radius: 8px;
  padding: 12px 16px;
  margin-top: 16px;
  box-sizing: border-box;
  border: 1px solid #d0e1f9;
  direction: ${o=>o.$isRTL?"rtl":"ltr"};
`,Pt=l.p`
  margin: 0;
  font-size: 14px;
  color: #333;
  text-align: ${o=>o.$isRTL?"right":"left"};
`,et=l.div`
  width: 160px;
  height: 100px;
  flex-shrink: 0;
`,Dt=({folders:o,setFolders:u,handleDeleteClick:h,isUploading:x=!1,cognitoUsername:s,isProfileView:k=!1})=>{const{t:i,language:j}=ot(),n=nt(j)==="rtl",d=f.useRef(null),[R,C]=f.useState({});f.useEffect(()=>{function t(){d.current&&(d.current.style.display="none",d.current=null)}function a(){t()}return window.addEventListener("scroll",a,!0),()=>{window.removeEventListener("scroll",a,!0)}},[]);const S=(t,a)=>{t.preventDefault(),t.stopPropagation(),d.current&&d.current!==a&&(d.current.style.display="none");const p=a.style.display==="block";a.style.display=p?"none":"block",d.current=p?null:a},v=t=>{d.current&&(d.current.style.display="none",d.current=null),window.confirm(i("Are you sure you want to delete this album? This action cannot be undone."))&&h&&h(t,i)},A=(t,a)=>{u&&u(p=>p.map(g=>g.folderId===t?{...g,profileIds:a}:g))},P=t=>{switch(t){case"NotVisible":return i("Hidden");case"Watermark":return i("Watermarked");case"CannotBeSaved":return i("Cannot be saved");case"NoPassword":default:return i("No password")}},$=(t,a)=>{const p=d.current&&d.current.style.display==="block",g=R[a]||!1;!p&&!g&&(window.location.href=t)},I=(t,a)=>{C(p=>({...p,[t]:a}))};return o.length===0&&!x?e.jsx(ut,{$type:"empty",children:e.jsx("p",{children:i("No albums found")})}):k?e.jsx(e.Fragment,{children:o.map(t=>{var g;const a=((g=t.folderPassword)==null?void 0:g.policy)||"NoPassword",p=N(t.folderId,t.albumNanoId||null,t.creatorId&&t.contacts&&t.contacts[t.creatorId],t.folderName);return e.jsx(U,{$isRTL:n,children:e.jsx(Q,{onClick:()=>$(p,t.folderId),children:e.jsxs(V,{children:[e.jsx(G,{$isRTL:n,children:e.jsx(H,{$isRTL:n,children:e.jsx(Y,{children:t.folderName||""})})}),t.folderDescription&&t.folderDescription.length>1&&e.jsx(z,{$isRTL:n,children:t.folderDescription}),e.jsxs(J,{children:[e.jsx(X,{$isRTL:n,children:t.files.map((b,y)=>e.jsx(et,{children:e.jsx(B,{thumbnailDataKey:b.thumbnailDataKey,dataKey:b.dataKey,src:`${E}${b.thumbnailDataKey||b.dataKey}`,alt:i("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},y))}),t.files.length>3&&e.jsx(Z,{$isRTL:n})]}),e.jsx(tt,{$isRTL:n,children:a!=="NoPassword"&&e.jsx(K,{children:e.jsx("span",{children:P(a)})})})]})})},t.folderId)})}):e.jsx(e.Fragment,{children:o.map(t=>{var T;const a=t.createdAt!=null,p=t.updatedAt!=null&&t.createdAt!=null&&t.updatedAt!==t.createdAt,g=t.creatorId===`${s}_____${s}____Account`,b=((T=t.folderPassword)==null?void 0:T.policy)||"NoPassword",y=t.contacts||{},c=Object.values(y).filter(r=>r&&typeof r=="string"&&!r.toString().startsWith("Profile-")),w=bt(t.files),D=N(t.folderId,t.albumNanoId||null,t.creatorId&&t.contacts&&t.contacts[t.creatorId],t.folderName);return e.jsx(U,{$isRTL:n,children:e.jsx(Q,{onClick:()=>$(D,t.folderId),children:e.jsxs(V,{children:[e.jsxs(G,{$isRTL:n,children:[e.jsxs(H,{$isRTL:n,children:[e.jsx(Y,{children:t.folderName||""}),(a||p)&&e.jsxs(ht,{$isRTL:n,children:[a&&t.createdAt&&_(t.createdAt)&&e.jsxs("div",{children:[i("Created"),": ",_(t.createdAt)]}),p&&t.updatedAt&&_(t.updatedAt)&&e.jsxs("div",{children:[i("Updated"),": ",_(t.updatedAt)]})]})]}),e.jsx(yt,{$isRTL:n,children:g?e.jsxs(wt,{children:[e.jsx(kt,{onClick:r=>{const m=r.currentTarget.nextElementSibling;m&&S(r,m)},children:i("Edit Files")}),e.jsxs(vt,{$isRTL:n,onClick:r=>{r.stopPropagation()},children:[e.jsx(q,{$isRTL:n,onClick:r=>{r.stopPropagation(),mt(),window.location.href=at(`save-album.html?folderId=${encodeURIComponent(t.folderId)}`)},children:i("Edit Files or Album Settings")}),e.jsx(q,{$isRTL:n,$isDelete:!0,onClick:r=>{r.preventDefault(),r.stopPropagation(),t.folderPositionId&&v(t.folderPositionId)},children:i("Delete My Copy")})]})]}):e.jsx(jt,{onClick:r=>{r.preventDefault(),r.stopPropagation(),t.folderPositionId&&v(t.folderPositionId)},children:i("Delete My Copy")})})]}),t.folderDescription&&t.folderDescription.length>1&&e.jsx(z,{$isRTL:n,children:t.folderDescription}),e.jsx(xt,{$isRTL:n,children:t.files.length===1?`${i("{{count}} file",{count:t.files.length.toString()})} • ${W(w)}`:`${i("{{count}} files",{count:t.files.length.toString()})} • ${W(w)}`}),e.jsxs(J,{children:[e.jsx(X,{$isRTL:n,children:t.files.map((r,m)=>e.jsx(et,{children:e.jsx(B,{thumbnailDataKey:r.thumbnailDataKey,dataKey:r.dataKey,src:`${E}${r.thumbnailDataKey||r.dataKey}`,alt:i("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},m))}),t.files.length>3&&e.jsx(Z,{$isRTL:n})]}),e.jsx(tt,{$isRTL:n,children:b!=="NoPassword"&&e.jsx(K,{children:e.jsx("span",{children:P(b)})})}),k==!1&&e.jsx(ft,{folder:t,cognitoUsername:s,updateProfileIds:r=>A(t.folderId,r),onModalStateChange:r=>I(t.folderId,r)}),c.length>0&&e.jsx(Ct,{$isRTL:n,children:e.jsxs(Pt,{$isRTL:n,children:[i("Shared with"),": ",c.join(", ")]})})]})})},t.folderId)})})};export{Dt as A};
