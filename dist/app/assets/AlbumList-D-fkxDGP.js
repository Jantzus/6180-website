import{r as u,j as t,u as pe,O as Q,c as fe,m as he,k as xe,g as ue,d as p,t as W,w as V,l as _,ai as ge,aj as Y,a3 as H,ak as q,al as be,am as F,b as me}from"./buttons-DVLwyWsJ.js";import{L as J}from"./LazyImage-BWJG2LaE.js";import{R as ye,C as we,Q as Ce,D as ke}from"./DownloadModal-D-e_3f3W.js";const ve=({isOpen:o,onClose:f,inviteLink:h,onCopy:x,t:l,isRTL:v})=>{const[g,d]=u.useState(!1);if(u.useEffect(()=>{d(!0)},[]),!o||!g)return null;const C={width:"100%",padding:"12px",margin:"8px 0",border:"1px solid #ddd",borderRadius:"6px",backgroundColor:"#fff",textAlign:"center",cursor:"pointer",fontSize:"14px",transition:"background-color 0.2s"},a=t.jsxs("div",{style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 0.5)",display:"flex",justifyContent:"center",alignItems:"center",zIndex:1e4,backdropFilter:"blur(4px)",WebkitBackdropFilter:"blur(4px)"},onClick:f,children:[t.jsxs("div",{style:{backgroundColor:"white",borderRadius:"12px",padding:"20px",width:"90%",maxWidth:"400px",boxShadow:"0 20px 60px rgba(0, 0, 0, 0.3)",direction:v?"rtl":"ltr",position:"relative",animation:"modalFadeIn 0.2s ease-out"},onClick:n=>n.stopPropagation(),children:[t.jsx("h3",{style:{marginTop:0,marginBottom:"16px",fontSize:"18px",color:"#333",fontWeight:"600",textAlign:v?"right":"left"},children:l("Choose an action")}),t.jsx("button",{style:C,onClick:n=>{n.stopPropagation(),x(h)},onMouseOver:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#f5f5f5"},onMouseOut:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#fff"},children:l("Link Only")}),t.jsx("button",{style:C,onClick:n=>{n.stopPropagation(),x(`${l("Here are photos from our event")}: ${h}`)},onMouseOver:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#f5f5f5"},onMouseOut:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#fff"},children:l("View Album Photos")}),t.jsx("button",{style:C,onClick:n=>{n.stopPropagation(),x(`${l("Please add any photos from our event here")}: ${h}`)},onMouseOver:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#f5f5f5"},onMouseOut:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#fff"},children:l("Add Photos To Album")}),t.jsx("button",{style:{...C,backgroundColor:"#f0f0f0",marginTop:"16px"},onClick:n=>{n.stopPropagation(),f()},onMouseOver:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#e0e0e0"},onMouseOut:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#f0f0f0"},children:l("Cancel")})]}),t.jsx("style",{children:`
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
        `})]});return ye.createPortal(a,document.body)},je=({folder:o,cognitoUsername:f,updateProfileIds:h,onModalStateChange:x})=>{const{t:l,language:v}=pe(),g=ue(v)==="rtl",[d,C]=u.useState(!1),[a,n]=u.useState(!1),[L,j]=u.useState(!1),[m,T]=u.useState(!1),[R,D]=u.useState(!1),[A,O]=u.useState(o.profileIds||[]),S=f?`${f}_____Public____Profile`:"",y=A.includes(S),E=Q(o.folderId,o.albumNanoId,o.creatorId&&o.contacts&&o.contacts[o.creatorId]?o.contacts[o.creatorId]:"album",o.folderName);u.useEffect(()=>{C(!0)},[]),u.useEffect(()=>{O(o.profileIds||[])},[o.profileIds]),u.useEffect(()=>{x&&x(a||L||m||R)},[a,L,m,R,x]);const M=i=>{if(d)if(typeof navigator<"u"&&navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(i).then(()=>{n(!1),j(!0)}).catch(r=>{console.error("Failed to copy link:",r);try{const c=document.createElement("textarea");c.value=i,c.style.position="fixed",c.style.left="-999999px",c.style.top="-999999px",document.body.appendChild(c),c.focus(),c.select(),document.execCommand("copy"),document.body.removeChild(c),n(!1),j(!0)}catch(c){console.error("Fallback copy failed:",c),typeof alert<"u"&&alert(l("Failed to copy link"))}});else try{const r=document.createElement("textarea");r.value=i,r.style.position="fixed",r.style.left="-999999px",r.style.top="-999999px",document.body.appendChild(r),r.focus(),r.select(),document.execCommand("copy"),document.body.removeChild(r),n(!1),j(!0)}catch(r){console.error("Copy failed:",r),typeof alert<"u"&&alert(l("Failed to copy link"))}},$=i=>{d&&typeof alert<"u"&&alert(i)},N=async i=>{if(i.preventDefault(),i.stopPropagation(),!d)return;if(!await fe()){$(l("You must be logged in to download photos"));return}if(!o||!o.files||o.files.length===0){$(l("No items to download"));return}D(!0)},z=async i=>{var r,c,b;if(i.preventDefault(),i.stopPropagation(),!!d){if(!f){$(l("You must be logged in to perform this action"));return}try{const w=await he();if(!w){console.error("Authentication failed");return}const I=[...A];if(y){const P=I.indexOf(S);P>-1&&I.splice(P,1)}else I.push(S);const k=await(await fetch(xe,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${w}`},body:JSON.stringify({query:`
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
      `,variables:{folderPositionChangeProfileIdsInput:{folderId:o.folderId,profileIds:I}}})})).json();if(k.errors)throw new Error(((r=k.errors[0])==null?void 0:r.message)||"Unknown error");const s=(((b=(c=k==null?void 0:k.data)==null?void 0:c.changeFiles)==null?void 0:b.items)||[]).find(P=>P.id===o.folderPositionId);s&&s.profileIds&&(O(s.profileIds),h&&h(s.profileIds),console.log("Album visibility updated successfully"))}catch(w){console.error("Failed to toggle album visibility:",w),$(l("Failed to update album visibility. Please try again."))}}},e={padding:"8px 12px",border:"none",borderRadius:6,cursor:"pointer",fontSize:14,textAlign:"center",whiteSpace:"nowrap",flexShrink:0};return t.jsxs(t.Fragment,{children:[t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:16,flexDirection:g?"row-reverse":"row"},children:[t.jsx("div",{style:{display:"flex",width:"100%",overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none",WebkitOverflowScrolling:"touch",flexDirection:g?"row-reverse":"row",gap:"10px"},children:t.jsxs("div",{style:{display:"flex",gap:"10px",flexDirection:g?"row-reverse":"row"},children:[t.jsx("button",{onClick:i=>{i.preventDefault(),i.stopPropagation(),T(!0)},style:{...e,backgroundColor:"#4caf50",color:"white"},children:l("Show QR Code")}),t.jsx("button",{onClick:N,style:{...e,backgroundColor:"#2196f3",color:"white"},children:l("Download")}),t.jsx("button",{onClick:i=>{i.preventDefault(),i.stopPropagation(),n(!0)},style:{...e,backgroundColor:"#e0e0e0"},children:l("Copy Link")}),t.jsxs("button",{onClick:z,style:{...e,backgroundColor:y?"#4caf50":"#e0e0e0",color:y?"white":"inherit",display:"flex",alignItems:"center",gap:"6px",position:"relative",border:y?"none":"1px solid #ccc",transition:"all 0.2s ease"},children:[t.jsx("div",{style:{width:"8px",height:"8px",backgroundColor:y?"rgba(255,255,255,0.8)":"#999",borderRadius:"50%",transition:"all 0.2s ease",flexShrink:0}}),t.jsx("span",{style:{flexShrink:0},children:l(y?"On Public Profile":"Not On Public Profile")})]})]})}),t.jsx("style",{children:`
            div::-webkit-scrollbar {
              display: none;
            }
          `})]}),t.jsx(ve,{isOpen:a,onClose:()=>n(!1),inviteLink:E,onCopy:M,t:l,isRTL:g}),t.jsx(we,{isOpen:L,onClose:()=>j(!1),t:l,isRTL:g}),t.jsx(Ce,{isOpen:m,onClose:()=>T(!1),albumLink:E,t:l,isRTL:g}),t.jsx(ke,{isOpen:R,folder:o,onClose:()=>D(!1)})]})},X=o=>{if(o===0)return"0 B";const f=1024,h=["B","KB","MB","GB","TB"],x=Math.floor(Math.log(o)/Math.log(f));return`${Math.round(o/Math.pow(f,x)*100)/100} ${h[x]}`},$e=o=>o.reduce((f,h)=>f+(h.dataInBytes||0),0),Z=o=>{typeof window<"u"&&window.location&&(window.location.href=o)},Ie=o=>typeof window<"u"&&window.confirm?window.confirm(o):!1,ee=p.div`
  margin-bottom: 30px;
  width: 100%;
  direction: ${o=>o.$isRTL?"rtl":"ltr"};
`,te=p.div`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  cursor: pointer;
`,oe=p.div`
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
`,ne=p.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
  flex-direction: ${o=>o.$isRTL?"row-reverse":"row"};
`,ie=p.div`
  display: flex;
  flex-direction: column;
  align-items: ${o=>o.$isRTL?"flex-end":"flex-start"};
`,re=p.h2`
  font-size: 20px;
  margin: 0;
  color: #222;
`,Pe=p.div`
  display: flex;
  flex-direction: column;
  align-items: ${o=>o.$isRTL?"flex-start":"flex-end"};
  justify-content: flex-end;
  gap: 8px;
`,Le=p.div`
  position: relative;
`,Te=p.button`
  display: flex;
  align-items: center;
  gap: 6px;
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
`,Re=p.svg`
  width: 12px;
  height: 12px;
  transform: ${o=>o.$isOpen?"rotate(180deg)":"rotate(0deg)"};
  transition: transform 0.2s ease;
  opacity: 0.6;
`,Se=p.button`
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
`,De=p.div`
  display: ${o=>o.$isOpen?"block":"none"};
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
`,U=p.button`
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
`,Ae=p.div`
  font-size: ${W.fontSizes.xs};
  color: ${W.colors.text.lighter};
  text-align: ${o=>(o.$isRTL,"right")};
  /* Enhanced: Use consistent grid spacing */
  margin-bottom: ${W.spacing.lg};
  display: flex;
  justify-content: flex-end;
`,se=p.div`
  width: 100%;
  position: relative;
`,ae=p.div`
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding-bottom: 8px;
  ms-overflow-style: none;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
  max-width: 100%;
  flex-direction: ${o=>o.$isRTL?"row-reverse":"row"};
`,le=p.div`
  position: absolute;
  ${o=>o.$isRTL?"left":"right"}: 0;
  top: 0;
  bottom: 8px;
  width: 30px;
  background: ${o=>o.$isRTL?"linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))":"linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))"};
  pointer-events: none;
`,de=p.div`
  display: flex;
  justify-content: ${o=>o.$isRTL?"flex-start":"flex-end"};
  margin-top: 8px;
  margin-bottom: 8px;
`,Oe=p.div`
  width: 100%;
  background-color: #f0f7ff;
  border-radius: 8px;
  padding: 12px 16px;
  margin-top: 16px;
  box-sizing: border-box;
  border: 1px solid #d0e1f9;
  direction: ${o=>o.$isRTL?"rtl":"ltr"};
`,Ee=p.p`
  margin: 0;
  font-size: 14px;
  color: #333;
  text-align: ${o=>o.$isRTL?"right":"left"};
`,ce=p.div`
  width: 160px;
  height: 100px;
  flex-shrink: 0;
`,Ne=({folders:o,setFolders:f,handleDeleteClick:h,isUploading:x=!1,cognitoUsername:l,isProfileView:v=!1,onAddPhotos:g})=>{const{t:d,language:C}=pe(),a=ue(C)==="rtl",[n,L]=u.useState(!1),[j,m]=u.useState(null),T=u.useRef(null),[R,D]=u.useState({});u.useEffect(()=>{L(!0)},[]);const A=V.useCallback(()=>{if(typeof window<"u"&&typeof localStorage<"u")try{localStorage.removeItem(_.SELECTED_PHOTOS),localStorage.removeItem(_.SUB_ALBUM_DATA),localStorage.removeItem(_.MULTI_ALBUM_DATA),localStorage.removeItem(_.ALBUM_GROUPS)}catch(e){console.error("Failed to clear album storage data:",e)}},[]);u.useEffect(()=>{if(!n)return;function e(){m(null),T.current&&(T.current=null)}function i(){e()}function r(c){c.target.closest("[data-dropdown-container]")||e()}if(typeof window<"u")return window.addEventListener("scroll",i,!0),document.addEventListener("mousedown",r),()=>{window.removeEventListener("scroll",i,!0),document.removeEventListener("mousedown",r)}},[n]);const O=(e,i)=>{e.preventDefault(),e.stopPropagation(),n&&m(r=>r===i?null:i)},S=V.useCallback(e=>{n&&(m(null),g&&g(e))},[n,g]),y=e=>{if(!n)return;m(null),Ie(d("Are you sure you want to delete this album? This action cannot be undone."))&&h&&h(e,d)},E=(e,i)=>{f&&f(r=>r.map(c=>c.folderId===e?{...c,profileIds:i}:c))},M=e=>{switch(e){case"NotVisible":return d("Hidden");case"Watermark":return d("Watermarked");case"CannotBeSaved":return d("Cannot be saved");case"NoPassword":default:return d("No password")}},$=(e,i)=>{if(!n)return;const r=j===i,c=R[i]||!1;!r&&!c&&Z(e)},N=(e,i)=>{D(r=>({...r,[e]:i}))},z=e=>{n&&(m(null),A(),Z(me(`save-album.html?folderId=${encodeURIComponent(e)}`)))};return o.length===0&&!x?t.jsx(ge,{$type:"empty",children:t.jsx("p",{children:d("Loading albums....")})}):v?t.jsx(t.Fragment,{children:o.map(e=>{var c;const i=((c=e.folderPassword)==null?void 0:c.policy)||"NoPassword",r=Q(e.folderId,e.albumNanoId||null,e.creatorId&&e.contacts&&e.contacts[e.creatorId],e.folderName);return t.jsx(ee,{$isRTL:a,children:t.jsx(te,{onClick:()=>$(r,e.folderId),children:t.jsxs(oe,{children:[t.jsx(ne,{$isRTL:a,children:t.jsx(ie,{$isRTL:a,children:t.jsx(re,{children:e.folderName||""})})}),e.folderDescription&&e.folderDescription.length>1&&t.jsx(Y,{$isRTL:a,children:e.folderDescription}),t.jsxs(se,{children:[t.jsx(ae,{$isRTL:a,children:e.files.map((b,w)=>t.jsx(ce,{children:t.jsx(J,{thumbnailDataKey:b.thumbnailDataKey,dataKey:b.dataKey,src:`${H}${b.thumbnailDataKey||b.dataKey}`,alt:d("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},w))}),e.files.length>3&&t.jsx(le,{$isRTL:a})]}),t.jsx(de,{$isRTL:a,children:i!=="NoPassword"&&t.jsx(q,{children:t.jsx("span",{children:M(i)})})})]})})},e.folderId)})}):t.jsx(t.Fragment,{children:o.map(e=>{var K;const i=e.createdAt!=null,r=e.updatedAt!=null&&e.createdAt!=null&&e.updatedAt!==e.createdAt,c=e.creatorId===`${l}_____${l}____Account`,b=((K=e.folderPassword)==null?void 0:K.policy)||"NoPassword",w=e.contacts||{},I=Object.values(w).filter(s=>s&&typeof s=="string"&&!s.toString().startsWith("Profile-")),B=$e(e.files),G=Q(e.folderId,e.albumNanoId||null,e.creatorId&&e.contacts&&e.contacts[e.creatorId],e.folderName),k=j===e.folderId;return t.jsx(ee,{$isRTL:a,children:t.jsx(te,{onClick:()=>$(G,e.folderId),children:t.jsxs(oe,{children:[t.jsxs(ne,{$isRTL:a,children:[t.jsxs(ie,{$isRTL:a,children:[t.jsx(re,{children:e.folderName||""}),(i||r)&&t.jsxs(be,{$isRTL:a,children:[i&&e.createdAt&&F(e.createdAt)&&t.jsxs("div",{children:[d("Created"),": ",F(e.createdAt)]}),r&&e.updatedAt&&F(e.updatedAt)&&t.jsxs("div",{children:[d("Updated"),": ",F(e.updatedAt)]})]})]}),t.jsx(Pe,{$isRTL:a,children:c?t.jsxs(Le,{"data-dropdown-container":!0,children:[t.jsxs(Te,{onClick:s=>O(s,e.folderId),children:[d("Edit Album"),t.jsx(Re,{$isOpen:k,viewBox:"0 0 12 12",children:t.jsx("path",{d:"M2.5 4.5L6 8L9.5 4.5",stroke:"currentColor",strokeWidth:"1.5",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})})]}),t.jsxs(De,{$isRTL:a,$isOpen:k,onClick:s=>{s.stopPropagation()},children:[t.jsx(U,{$isRTL:a,onClick:s=>{s.preventDefault(),s.stopPropagation(),S(e.folderId)},children:d("Add Photos")}),t.jsx(U,{$isRTL:a,onClick:s=>{s.stopPropagation(),z(e.folderId)},children:d("Edit Album Settings")}),t.jsx(U,{$isRTL:a,$isDelete:!0,onClick:s=>{s.preventDefault(),s.stopPropagation(),e.folderPositionId&&y(e.folderPositionId)},children:d("Delete My Copy")})]})]}):t.jsx(Se,{onClick:s=>{s.preventDefault(),s.stopPropagation(),e.folderPositionId&&y(e.folderPositionId)},children:d("Delete My Copy")})})]}),e.folderDescription&&e.folderDescription.length>1&&t.jsx(Y,{$isRTL:a,children:e.folderDescription}),t.jsx(Ae,{$isRTL:a,children:e.files.length===1?`${d("{{count}} file",{count:e.files.length.toString()})} • ${X(B)}`:`${d("{{count}} files",{count:e.files.length.toString()})} • ${X(B)}`}),t.jsxs(se,{children:[t.jsx(ae,{$isRTL:a,children:e.files.map((s,P)=>t.jsx(ce,{children:t.jsx(J,{thumbnailDataKey:s.thumbnailDataKey,dataKey:s.dataKey,src:`${H}${s.thumbnailDataKey||s.dataKey}`,alt:d("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},P))}),e.files.length>3&&t.jsx(le,{$isRTL:a})]}),t.jsx(de,{$isRTL:a,children:b!=="NoPassword"&&t.jsx(q,{children:t.jsx("span",{children:M(b)})})}),v==!1&&t.jsx(je,{folder:e,cognitoUsername:l,updateProfileIds:s=>E(e.folderId,s),onModalStateChange:s=>N(e.folderId,s)}),I.length>0&&t.jsx(Oe,{$isRTL:a,children:t.jsxs(Ee,{$isRTL:a,children:[d("Shared with"),": ",I.join(", ")]})})]})})},e.folderId)})})};export{Ne as A};
