import{r as x,j as t,u as de,O as Q,c as ue,m as fe,k as he,g as pe,d as u,t as W,w as V,l as N,ai as xe,aj as G,a3 as Y,ak as H,al as ge,am as z,b as be}from"./buttons-DVLwyWsJ.js";import{L as q}from"./LazyImage-BWJG2LaE.js";import{R as ye,C as me,Q as we,D as Ce}from"./DownloadModal-D-e_3f3W.js";const ke=({isOpen:o,onClose:g,inviteLink:b,onCopy:y,t:a,isRTL:v})=>{const[m,l]=x.useState(!1);if(x.useEffect(()=>{l(!0)},[]),!o||!m)return null;const k={width:"100%",padding:"12px",margin:"8px 0",border:"1px solid #ddd",borderRadius:"6px",backgroundColor:"#fff",textAlign:"center",cursor:"pointer",fontSize:"14px",transition:"background-color 0.2s"},i=t.jsxs("div",{style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 0.5)",display:"flex",justifyContent:"center",alignItems:"center",zIndex:1e4,backdropFilter:"blur(4px)",WebkitBackdropFilter:"blur(4px)"},onClick:g,children:[t.jsxs("div",{style:{backgroundColor:"white",borderRadius:"12px",padding:"20px",width:"90%",maxWidth:"400px",boxShadow:"0 20px 60px rgba(0, 0, 0, 0.3)",direction:v?"rtl":"ltr",position:"relative",animation:"modalFadeIn 0.2s ease-out"},onClick:n=>n.stopPropagation(),children:[t.jsx("h3",{style:{marginTop:0,marginBottom:"16px",fontSize:"18px",color:"#333",fontWeight:"600",textAlign:v?"right":"left"},children:a("Choose an action")}),t.jsx("button",{style:k,onClick:n=>{n.stopPropagation(),y(b)},onMouseOver:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#f5f5f5"},onMouseOut:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#fff"},children:a("Link Only")}),t.jsx("button",{style:k,onClick:n=>{n.stopPropagation(),y(`${a("Here are photos from our event")}: ${b}`)},onMouseOver:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#f5f5f5"},onMouseOut:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#fff"},children:a("View Album Photos")}),t.jsx("button",{style:k,onClick:n=>{n.stopPropagation(),y(`${a("Please add any photos from our event here")}: ${b}`)},onMouseOver:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#f5f5f5"},onMouseOut:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#fff"},children:a("Add Photos To Album")}),t.jsx("button",{style:{...k,backgroundColor:"#f0f0f0",marginTop:"16px"},onClick:n=>{n.stopPropagation(),g()},onMouseOver:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#e0e0e0"},onMouseOut:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#f0f0f0"},children:a("Cancel")})]}),t.jsx("style",{children:`
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
        `})]});return ye.createPortal(i,document.body)},ve=({folder:o,cognitoUsername:g,updateProfileIds:b,onModalStateChange:y})=>{const{t:a,language:v}=de(),m=pe(v)==="rtl",[l,k]=x.useState(!1),[i,n]=x.useState(!1),[I,p]=x.useState(!1),[T,O]=x.useState(!1),[L,M]=x.useState(!1),[_,R]=x.useState(o.profileIds||[]),S=g?`${g}_____Public____Profile`:"",C=_.includes(S),A=Q(o.folderId,o.albumNanoId,o.creatorId&&o.contacts&&o.contacts[o.creatorId]?o.contacts[o.creatorId]:"album",o.folderName);x.useEffect(()=>{k(!0)},[]),x.useEffect(()=>{R(o.profileIds||[])},[o.profileIds]),x.useEffect(()=>{y&&y(i||I||T||L)},[i,I,T,L,y]);const B=r=>{if(l)if(typeof navigator<"u"&&navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(r).then(()=>{n(!1),p(!0)}).catch(c=>{console.error("Failed to copy link:",c);try{const h=document.createElement("textarea");h.value=r,h.style.position="fixed",h.style.left="-999999px",h.style.top="-999999px",document.body.appendChild(h),h.focus(),h.select(),document.execCommand("copy"),document.body.removeChild(h),n(!1),p(!0)}catch(h){console.error("Fallback copy failed:",h),typeof alert<"u"&&alert(a("Failed to copy link"))}});else try{const c=document.createElement("textarea");c.value=r,c.style.position="fixed",c.style.left="-999999px",c.style.top="-999999px",document.body.appendChild(c),c.focus(),c.select(),document.execCommand("copy"),document.body.removeChild(c),n(!1),p(!0)}catch(c){console.error("Copy failed:",c),typeof alert<"u"&&alert(a("Failed to copy link"))}},$=r=>{l&&typeof alert<"u"&&alert(r)},e=async r=>{if(r.preventDefault(),r.stopPropagation(),!l)return;if(!await ue()){$(a("You must be logged in to download photos"));return}if(!o||!o.files||o.files.length===0){$(a("No items to download"));return}M(!0)},d=async r=>{var c,h,D;if(r.preventDefault(),r.stopPropagation(),!!l){if(!g){$(a("You must be logged in to perform this action"));return}try{const j=await fe();if(!j){console.error("Authentication failed");return}const P=[..._];if(C){const F=P.indexOf(S);F>-1&&P.splice(F,1)}else P.push(S);const w=await(await fetch(he,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${j}`},body:JSON.stringify({query:`
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
      `,variables:{folderPositionChangeProfileIdsInput:{folderId:o.folderId,profileIds:P}}})})).json();if(w.errors)throw new Error(((c=w.errors[0])==null?void 0:c.message)||"Unknown error");const E=(((D=(h=w==null?void 0:w.data)==null?void 0:h.changeFiles)==null?void 0:D.items)||[]).find(F=>F.id===o.folderPositionId);E&&E.profileIds&&(R(E.profileIds),b&&b(E.profileIds),console.log("Album visibility updated successfully"))}catch(j){console.error("Failed to toggle album visibility:",j),$(a("Failed to update album visibility. Please try again."))}}},f={padding:"8px 12px",border:"none",borderRadius:6,cursor:"pointer",fontSize:14,textAlign:"center",whiteSpace:"nowrap",flexShrink:0};return t.jsxs(t.Fragment,{children:[t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:16,flexDirection:m?"row-reverse":"row"},children:[t.jsx("div",{style:{display:"flex",width:"100%",overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none",WebkitOverflowScrolling:"touch",flexDirection:m?"row-reverse":"row",gap:"10px"},children:t.jsxs("div",{style:{display:"flex",gap:"10px",flexDirection:m?"row-reverse":"row"},children:[t.jsx("button",{onClick:r=>{r.preventDefault(),r.stopPropagation(),O(!0)},style:{...f,backgroundColor:"#4caf50",color:"white"},children:a("Show QR Code")}),t.jsx("button",{onClick:e,style:{...f,backgroundColor:"#2196f3",color:"white"},children:a("Download")}),t.jsx("button",{onClick:r=>{r.preventDefault(),r.stopPropagation(),n(!0)},style:{...f,backgroundColor:"#e0e0e0"},children:a("Copy Link")}),t.jsxs("button",{onClick:d,style:{...f,backgroundColor:C?"#4caf50":"#e0e0e0",color:C?"white":"inherit",display:"flex",alignItems:"center",gap:"6px",position:"relative",border:C?"none":"1px solid #ccc",transition:"all 0.2s ease"},children:[t.jsx("div",{style:{width:"8px",height:"8px",backgroundColor:C?"rgba(255,255,255,0.8)":"#999",borderRadius:"50%",transition:"all 0.2s ease",flexShrink:0}}),t.jsx("span",{style:{flexShrink:0},children:a(C?"On Public Profile":"Not On Public Profile")})]})]})}),t.jsx("style",{children:`
            div::-webkit-scrollbar {
              display: none;
            }
          `})]}),t.jsx(ke,{isOpen:i,onClose:()=>n(!1),inviteLink:A,onCopy:B,t:a,isRTL:m}),t.jsx(me,{isOpen:I,onClose:()=>p(!1),t:a,isRTL:m}),t.jsx(we,{isOpen:T,onClose:()=>O(!1),albumLink:A,t:a,isRTL:m}),t.jsx(Ce,{isOpen:L,folder:o,onClose:()=>M(!1)})]})},J=o=>{if(o===0)return"0 B";const g=1024,b=["B","KB","MB","GB","TB"],y=Math.floor(Math.log(o)/Math.log(g));return`${Math.round(o/Math.pow(g,y)*100)/100} ${b[y]}`},je=o=>o.reduce((g,b)=>g+(b.dataInBytes||0),0),X=o=>{typeof window<"u"&&window.location&&(window.location.href=o)},$e=o=>typeof window<"u"&&window.confirm?window.confirm(o):!1,Z=u.div`
  margin-bottom: 30px;
  width: 100%;
  direction: ${o=>o.$isRTL?"rtl":"ltr"};
`,ee=u.div`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  cursor: pointer;
`,te=u.div`
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
`,oe=u.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
  flex-direction: ${o=>o.$isRTL?"row-reverse":"row"};
`,ne=u.div`
  display: flex;
  flex-direction: column;
  align-items: ${o=>o.$isRTL?"flex-end":"flex-start"};
`,ie=u.h2`
  font-size: 20px;
  margin: 0;
  color: #222;
`,Pe=u.div`
  display: flex;
  flex-direction: column;
  align-items: ${o=>o.$isRTL?"flex-start":"flex-end"};
  justify-content: flex-end;
  gap: 8px;
`,Ie=u.div`
  position: relative;
`,Te=u.button`
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
`,Le=u.button`
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
`,Re=u.div`
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
`,U=u.button`
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
`,Se=u.div`
  font-size: ${W.fontSizes.xs};
  color: ${W.colors.text.lighter};
  text-align: ${o=>(o.$isRTL,"right")};
  /* Enhanced: Use consistent grid spacing */
  margin-bottom: ${W.spacing.lg};
  display: flex;
  justify-content: flex-end;
`,re=u.div`
  width: 100%;
  position: relative;
`,se=u.div`
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding-bottom: 8px;
  ms-overflow-style: none;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
  max-width: 100%;
  flex-direction: ${o=>o.$isRTL?"row-reverse":"row"};
`,ae=u.div`
  position: absolute;
  ${o=>o.$isRTL?"left":"right"}: 0;
  top: 0;
  bottom: 8px;
  width: 30px;
  background: ${o=>o.$isRTL?"linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))":"linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))"};
  pointer-events: none;
`,le=u.div`
  display: flex;
  justify-content: ${o=>o.$isRTL?"flex-start":"flex-end"};
  margin-top: 8px;
  margin-bottom: 8px;
`,Ae=u.div`
  width: 100%;
  background-color: #f0f7ff;
  border-radius: 8px;
  padding: 12px 16px;
  margin-top: 16px;
  box-sizing: border-box;
  border: 1px solid #d0e1f9;
  direction: ${o=>o.$isRTL?"rtl":"ltr"};
`,De=u.p`
  margin: 0;
  font-size: 14px;
  color: #333;
  text-align: ${o=>o.$isRTL?"right":"left"};
`,ce=u.div`
  width: 160px;
  height: 100px;
  flex-shrink: 0;
`,Fe=({folders:o,setFolders:g,handleDeleteClick:b,isUploading:y=!1,cognitoUsername:a,isProfileView:v=!1,onAddPhotos:m})=>{const{t:l,language:k}=de(),i=pe(k)==="rtl",[n,I]=x.useState(!1),p=x.useRef(null),[T,O]=x.useState({});x.useEffect(()=>{I(!0)},[]);const L=V.useCallback(()=>{if(typeof window<"u"&&typeof localStorage<"u")try{localStorage.removeItem(N.SELECTED_PHOTOS),localStorage.removeItem(N.SUB_ALBUM_DATA),localStorage.removeItem(N.MULTI_ALBUM_DATA),localStorage.removeItem(N.ALBUM_GROUPS)}catch(e){console.error("Failed to clear album storage data:",e)}},[]);x.useEffect(()=>{if(!n)return;function e(){p.current&&(p.current.style.display="none",p.current=null)}function d(){e()}if(typeof window<"u")return window.addEventListener("scroll",d,!0),()=>{window.removeEventListener("scroll",d,!0)}},[n]);const M=(e,d)=>{if(e.preventDefault(),e.stopPropagation(),!n)return;p.current&&p.current!==d&&(p.current.style.display="none");const f=d.style.display==="block";d.style.display=f?"none":"block",p.current=f?null:d},_=V.useCallback(e=>{n&&(p.current&&(p.current.style.display="none",p.current=null),m&&m(e))},[n,m]),R=e=>{if(!n)return;p.current&&(p.current.style.display="none",p.current=null),$e(l("Are you sure you want to delete this album? This action cannot be undone."))&&b&&b(e,l)},S=(e,d)=>{g&&g(f=>f.map(r=>r.folderId===e?{...r,profileIds:d}:r))},C=e=>{switch(e){case"NotVisible":return l("Hidden");case"Watermark":return l("Watermarked");case"CannotBeSaved":return l("Cannot be saved");case"NoPassword":default:return l("No password")}},A=(e,d)=>{if(!n)return;const f=p.current&&p.current.style.display==="block",r=T[d]||!1;!f&&!r&&X(e)},B=(e,d)=>{O(f=>({...f,[e]:d}))},$=e=>{n&&(L(),X(be(`save-album.html?folderId=${encodeURIComponent(e)}`)))};return o.length===0&&!y?t.jsx(xe,{$type:"empty",children:t.jsx("p",{children:l("Loading albums....")})}):v?t.jsx(t.Fragment,{children:o.map(e=>{var r;const d=((r=e.folderPassword)==null?void 0:r.policy)||"NoPassword",f=Q(e.folderId,e.albumNanoId||null,e.creatorId&&e.contacts&&e.contacts[e.creatorId],e.folderName);return t.jsx(Z,{$isRTL:i,children:t.jsx(ee,{onClick:()=>A(f,e.folderId),children:t.jsxs(te,{children:[t.jsx(oe,{$isRTL:i,children:t.jsx(ne,{$isRTL:i,children:t.jsx(ie,{children:e.folderName||""})})}),e.folderDescription&&e.folderDescription.length>1&&t.jsx(G,{$isRTL:i,children:e.folderDescription}),t.jsxs(re,{children:[t.jsx(se,{$isRTL:i,children:e.files.map((c,h)=>t.jsx(ce,{children:t.jsx(q,{thumbnailDataKey:c.thumbnailDataKey,dataKey:c.dataKey,src:`${Y}${c.thumbnailDataKey||c.dataKey}`,alt:l("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},h))}),e.files.length>3&&t.jsx(ae,{$isRTL:i})]}),t.jsx(le,{$isRTL:i,children:d!=="NoPassword"&&t.jsx(H,{children:t.jsx("span",{children:C(d)})})})]})})},e.folderId)})}):t.jsx(t.Fragment,{children:o.map(e=>{var K;const d=e.createdAt!=null,f=e.updatedAt!=null&&e.createdAt!=null&&e.updatedAt!==e.createdAt,r=e.creatorId===`${a}_____${a}____Account`,c=((K=e.folderPassword)==null?void 0:K.policy)||"NoPassword",h=e.contacts||{},D=Object.values(h).filter(s=>s&&typeof s=="string"&&!s.toString().startsWith("Profile-")),j=je(e.files),P=Q(e.folderId,e.albumNanoId||null,e.creatorId&&e.contacts&&e.contacts[e.creatorId],e.folderName);return t.jsx(Z,{$isRTL:i,children:t.jsx(ee,{onClick:()=>A(P,e.folderId),children:t.jsxs(te,{children:[t.jsxs(oe,{$isRTL:i,children:[t.jsxs(ne,{$isRTL:i,children:[t.jsx(ie,{children:e.folderName||""}),(d||f)&&t.jsxs(ge,{$isRTL:i,children:[d&&e.createdAt&&z(e.createdAt)&&t.jsxs("div",{children:[l("Created"),": ",z(e.createdAt)]}),f&&e.updatedAt&&z(e.updatedAt)&&t.jsxs("div",{children:[l("Updated"),": ",z(e.updatedAt)]})]})]}),t.jsx(Pe,{$isRTL:i,children:r?t.jsxs(Ie,{children:[t.jsxs(Te,{onClick:s=>{const w=s.currentTarget.nextElementSibling;w&&M(s,w)},children:[l("Edit Album")," ▼"]}),t.jsxs(Re,{$isRTL:i,onClick:s=>{s.stopPropagation()},children:[t.jsx(U,{$isRTL:i,onClick:s=>{s.preventDefault(),s.stopPropagation(),_(e.folderId)},children:l("Add Photos")}),t.jsx(U,{$isRTL:i,onClick:s=>{s.stopPropagation(),$(e.folderId)},children:l("Edit Album Settings")}),t.jsx(U,{$isRTL:i,$isDelete:!0,onClick:s=>{s.preventDefault(),s.stopPropagation(),e.folderPositionId&&R(e.folderPositionId)},children:l("Delete My Copy")})]})]}):t.jsx(Le,{onClick:s=>{s.preventDefault(),s.stopPropagation(),e.folderPositionId&&R(e.folderPositionId)},children:l("Delete My Copy")})})]}),e.folderDescription&&e.folderDescription.length>1&&t.jsx(G,{$isRTL:i,children:e.folderDescription}),t.jsx(Se,{$isRTL:i,children:e.files.length===1?`${l("{{count}} file",{count:e.files.length.toString()})} • ${J(j)}`:`${l("{{count}} files",{count:e.files.length.toString()})} • ${J(j)}`}),t.jsxs(re,{children:[t.jsx(se,{$isRTL:i,children:e.files.map((s,w)=>t.jsx(ce,{children:t.jsx(q,{thumbnailDataKey:s.thumbnailDataKey,dataKey:s.dataKey,src:`${Y}${s.thumbnailDataKey||s.dataKey}`,alt:l("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},w))}),e.files.length>3&&t.jsx(ae,{$isRTL:i})]}),t.jsx(le,{$isRTL:i,children:c!=="NoPassword"&&t.jsx(H,{children:t.jsx("span",{children:C(c)})})}),v==!1&&t.jsx(ve,{folder:e,cognitoUsername:a,updateProfileIds:s=>S(e.folderId,s),onModalStateChange:s=>B(e.folderId,s)}),D.length>0&&t.jsx(Ae,{$isRTL:i,children:t.jsxs(De,{$isRTL:i,children:[l("Shared with"),": ",D.join(", ")]})})]})})},e.folderId)})})};export{Fe as A};
