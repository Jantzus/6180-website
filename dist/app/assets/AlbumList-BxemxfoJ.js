import{r as h,j as t,u as ae,w as K,c as ce,h as de,f as pe,g as le,d as p,o as ue,L as B,S as W,H as z,b as fe}from"./utils-Dg1WdiuL.js";import{L as U}from"./LazyImage-B-l0icNJ.js";import{R as he,C as xe,Q as ge,D as be}from"./DownloadModal-DD8rxzYd.js";import{af as ye,ag as Q,ah as V,ai as me,aj as we}from"./styled-components-CkPYYn5H.js";const Ce=({isOpen:o,onClose:g,inviteLink:b,onCopy:y,t:a,isRTL:j})=>{const[s,v]=h.useState(!1);if(h.useEffect(()=>{v(!0)},[]),!o||!s)return null;const r={width:"100%",padding:"12px",margin:"8px 0",border:"1px solid #ddd",borderRadius:"6px",backgroundColor:"#fff",textAlign:"center",cursor:"pointer",fontSize:"14px",transition:"background-color 0.2s"},m=t.jsxs("div",{style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 0.5)",display:"flex",justifyContent:"center",alignItems:"center",zIndex:1e4,backdropFilter:"blur(4px)",WebkitBackdropFilter:"blur(4px)"},onClick:g,children:[t.jsxs("div",{style:{backgroundColor:"white",borderRadius:"12px",padding:"20px",width:"90%",maxWidth:"400px",boxShadow:"0 20px 60px rgba(0, 0, 0, 0.3)",direction:j?"rtl":"ltr",position:"relative",animation:"modalFadeIn 0.2s ease-out"},onClick:n=>n.stopPropagation(),children:[t.jsx("h3",{style:{marginTop:0,marginBottom:"16px",fontSize:"18px",color:"#333",fontWeight:"600",textAlign:j?"right":"left"},children:a("Choose an action")}),t.jsx("button",{style:r,onClick:n=>{n.stopPropagation(),y(b)},onMouseOver:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#f5f5f5"},onMouseOut:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#fff"},children:a("Link Only")}),t.jsx("button",{style:r,onClick:n=>{n.stopPropagation(),y(`${a("Here are photos from our event")}: ${b}`)},onMouseOver:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#f5f5f5"},onMouseOut:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#fff"},children:a("View Album Photos")}),t.jsx("button",{style:r,onClick:n=>{n.stopPropagation(),y(`${a("Please add any photos from our event here")}: ${b}`)},onMouseOver:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#f5f5f5"},onMouseOut:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#fff"},children:a("Add Photos To Album")}),t.jsx("button",{style:{...r,backgroundColor:"#f0f0f0",marginTop:"16px"},onClick:n=>{n.stopPropagation(),g()},onMouseOver:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#e0e0e0"},onMouseOut:n=>{n.stopPropagation(),n.currentTarget.style.backgroundColor="#f0f0f0"},children:a("Cancel")})]}),t.jsx("style",{children:`
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
        `})]});return he.createPortal(m,document.body)},ve=({folder:o,cognitoUsername:g,updateProfileIds:b,onModalStateChange:y})=>{const{t:a,language:j}=ae(),s=le(j)==="rtl",[v,r]=h.useState(!1),[m,n]=h.useState(!1),[u,I]=h.useState(!1),[T,M]=h.useState(!1),[L,S]=h.useState(!1),[O,R]=h.useState(o.profileIds||[]),$=g?`${g}_____Public____Profile`:"",k=O.includes($),_=K(o.folderId,o.albumNanoId,o.creatorId&&o.contacts&&o.contacts[o.creatorId]?o.contacts[o.creatorId]:"album",o.folderName);h.useEffect(()=>{r(!0)},[]),h.useEffect(()=>{R(o.profileIds||[])},[o.profileIds]),h.useEffect(()=>{y&&y(m||u||T||L)},[m,u,T,L,y]);const e=c=>{if(v)if(typeof navigator<"u"&&navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(c).then(()=>{n(!1),I(!0)}).catch(d=>{console.error("Failed to copy link:",d);try{const f=document.createElement("textarea");f.value=c,f.style.position="fixed",f.style.left="-999999px",f.style.top="-999999px",document.body.appendChild(f),f.focus(),f.select(),document.execCommand("copy"),document.body.removeChild(f),n(!1),I(!0)}catch(f){console.error("Fallback copy failed:",f),typeof alert<"u"&&alert(a("Failed to copy link"))}});else try{const d=document.createElement("textarea");d.value=c,d.style.position="fixed",d.style.left="-999999px",d.style.top="-999999px",document.body.appendChild(d),d.focus(),d.select(),document.execCommand("copy"),document.body.removeChild(d),n(!1),I(!0)}catch(d){console.error("Copy failed:",d),typeof alert<"u"&&alert(a("Failed to copy link"))}},l=c=>{v&&typeof alert<"u"&&alert(c)},x=async c=>{if(c.preventDefault(),c.stopPropagation(),!v)return;if(!await ce()){l(a("You must be logged in to download photos"));return}if(!o||!o.files||o.files.length===0){l(a("No items to download"));return}S(!0)},w=async c=>{var d,f,E;if(c.preventDefault(),c.stopPropagation(),!!v){if(!g){l(a("You must be logged in to perform this action"));return}try{const P=await de();if(!P){console.error("Authentication failed");return}const i=[...O];if(k){const N=i.indexOf($);N>-1&&i.splice(N,1)}else i.push($);const D=await(await fetch(pe,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${P}`},body:JSON.stringify({query:`
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
      `,variables:{folderPositionChangeProfileIdsInput:{folderId:o.folderId,profileIds:i}}})})).json();if(D.errors)throw new Error(((d=D.errors[0])==null?void 0:d.message)||"Unknown error");const F=(((E=(f=D==null?void 0:D.data)==null?void 0:f.changeFiles)==null?void 0:E.items)||[]).find(N=>N.id===o.folderPositionId);F&&F.profileIds&&(R(F.profileIds),b&&b(F.profileIds),console.log("Album visibility updated successfully"))}catch(P){console.error("Failed to toggle album visibility:",P),l(a("Failed to update album visibility. Please try again."))}}},C={padding:"8px 12px",border:"none",borderRadius:6,cursor:"pointer",fontSize:14,textAlign:"center",whiteSpace:"nowrap",flexShrink:0};return t.jsxs(t.Fragment,{children:[t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:16,flexDirection:s?"row-reverse":"row"},children:[t.jsx("div",{style:{display:"flex",width:"100%",overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none",WebkitOverflowScrolling:"touch",flexDirection:s?"row-reverse":"row",gap:"10px"},children:t.jsxs("div",{style:{display:"flex",gap:"10px",flexDirection:s?"row-reverse":"row"},children:[t.jsx("button",{onClick:c=>{c.preventDefault(),c.stopPropagation(),M(!0)},style:{...C,backgroundColor:"#4caf50",color:"white"},children:a("Show QR Code")}),t.jsx("button",{onClick:x,style:{...C,backgroundColor:"#2196f3",color:"white"},children:a("Download")}),t.jsx("button",{onClick:c=>{c.preventDefault(),c.stopPropagation(),n(!0)},style:{...C,backgroundColor:"#e0e0e0"},children:a("Copy Link")}),t.jsxs("button",{onClick:w,style:{...C,backgroundColor:k?"#4caf50":"#e0e0e0",color:k?"white":"inherit",display:"flex",alignItems:"center",gap:"6px",position:"relative",border:k?"none":"1px solid #ccc",transition:"all 0.2s ease"},children:[t.jsx("div",{style:{width:"8px",height:"8px",backgroundColor:k?"rgba(255,255,255,0.8)":"#999",borderRadius:"50%",transition:"all 0.2s ease",flexShrink:0}}),t.jsx("span",{style:{flexShrink:0},children:a(k?"On Public Profile":"Not On Public Profile")})]})]})}),t.jsx("style",{children:`
            div::-webkit-scrollbar {
              display: none;
            }
          `})]}),t.jsx(Ce,{isOpen:m,onClose:()=>n(!1),inviteLink:_,onCopy:e,t:a,isRTL:s}),t.jsx(xe,{isOpen:u,onClose:()=>I(!1),t:a,isRTL:s}),t.jsx(ge,{isOpen:T,onClose:()=>M(!1),albumLink:_,t:a,isRTL:s}),t.jsx(be,{isOpen:L,folder:o,onClose:()=>S(!1)})]})},G=o=>{if(o===0)return"0 B";const g=1024,b=["B","KB","MB","GB","TB"],y=Math.floor(Math.log(o)/Math.log(g));return`${Math.round(o/Math.pow(g,y)*100)/100} ${b[y]}`},ke=o=>o.reduce((g,b)=>g+(b.dataInBytes||0),0),H=o=>{typeof window<"u"&&window.location&&(window.location.href=o)},je=o=>typeof window<"u"&&window.confirm?window.confirm(o):!1,Y=p.div`
  margin-bottom: 30px;
  width: 100%;
  direction: ${o=>o.$isRTL?"rtl":"ltr"};
`,q=p.div`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  cursor: pointer;
`,J=p.div`
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
`,X=p.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
  flex-direction: ${o=>o.$isRTL?"row-reverse":"row"};
`,Z=p.div`
  display: flex;
  flex-direction: column;
  align-items: ${o=>o.$isRTL?"flex-end":"flex-start"};
`,ee=p.h2`
  font-size: 20px;
  margin: 0;
  color: #222;
`,Pe=p.div`
  display: flex;
  flex-direction: column;
  align-items: ${o=>o.$isRTL?"flex-start":"flex-end"};
  justify-content: flex-end;
  gap: 8px;
`,Ie=p.div`
  position: relative;
`,$e=p.button`
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
`,Te=p.button`
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
`,Le=p.div`
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
`,te=p.button`
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
`,oe=p.div`
  width: 100%;
  position: relative;
`,ne=p.div`
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding-bottom: 8px;
  ms-overflow-style: none;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
  max-width: 100%;
  flex-direction: ${o=>o.$isRTL?"row-reverse":"row"};
`,ie=p.div`
  position: absolute;
  ${o=>o.$isRTL?"left":"right"}: 0;
  top: 0;
  bottom: 8px;
  width: 30px;
  background: ${o=>o.$isRTL?"linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))":"linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))"};
  pointer-events: none;
`,re=p.div`
  display: flex;
  justify-content: ${o=>o.$isRTL?"flex-start":"flex-end"};
  margin-top: 8px;
  margin-bottom: 8px;
`,Se=p.div`
  width: 100%;
  background-color: #f0f7ff;
  border-radius: 8px;
  padding: 12px 16px;
  margin-top: 16px;
  box-sizing: border-box;
  border: 1px solid #d0e1f9;
  direction: ${o=>o.$isRTL?"rtl":"ltr"};
`,Re=p.p`
  margin: 0;
  font-size: 14px;
  color: #333;
  text-align: ${o=>o.$isRTL?"right":"left"};
`,se=p.div`
  width: 160px;
  height: 100px;
  flex-shrink: 0;
`,Fe=({folders:o,setFolders:g,handleDeleteClick:b,isUploading:y=!1,cognitoUsername:a,isProfileView:j=!1})=>{const{t:s,language:v}=ae(),r=le(v)==="rtl",[m,n]=h.useState(!1),u=h.useRef(null),[I,T]=h.useState({});h.useEffect(()=>{n(!0)},[]);const M=ue.useCallback(()=>{if(typeof window<"u"&&typeof localStorage<"u")try{localStorage.removeItem(B.SELECTED_PHOTOS),localStorage.removeItem(B.SUB_ALBUM_DATA),localStorage.removeItem(B.MULTI_ALBUM_DATA),localStorage.removeItem(B.ALBUM_GROUPS)}catch(e){console.error("Failed to clear album storage data:",e)}},[]);h.useEffect(()=>{if(!m)return;function e(){u.current&&(u.current.style.display="none",u.current=null)}function l(){e()}if(typeof window<"u")return window.addEventListener("scroll",l,!0),()=>{window.removeEventListener("scroll",l,!0)}},[m]);const L=(e,l)=>{if(e.preventDefault(),e.stopPropagation(),!m)return;u.current&&u.current!==l&&(u.current.style.display="none");const x=l.style.display==="block";l.style.display=x?"none":"block",u.current=x?null:l},S=e=>{if(!m)return;u.current&&(u.current.style.display="none",u.current=null),je(s("Are you sure you want to delete this album? This action cannot be undone."))&&b&&b(e,s)},O=(e,l)=>{g&&g(x=>x.map(w=>w.folderId===e?{...w,profileIds:l}:w))},R=e=>{switch(e){case"NotVisible":return s("Hidden");case"Watermark":return s("Watermarked");case"CannotBeSaved":return s("Cannot be saved");case"NoPassword":default:return s("No password")}},$=(e,l)=>{if(!m)return;const x=u.current&&u.current.style.display==="block",w=I[l]||!1;!x&&!w&&H(e)},k=(e,l)=>{T(x=>({...x,[e]:l}))},_=e=>{m&&(M(),H(fe(`save-album.html?folderId=${encodeURIComponent(e)}`)))};return o.length===0&&!y?t.jsx(ye,{$type:"empty",children:t.jsx("p",{children:s("Loading albums....")})}):j?t.jsx(t.Fragment,{children:o.map(e=>{var w;const l=((w=e.folderPassword)==null?void 0:w.policy)||"NoPassword",x=K(e.folderId,e.albumNanoId||null,e.creatorId&&e.contacts&&e.contacts[e.creatorId],e.folderName);return t.jsx(Y,{$isRTL:r,children:t.jsx(q,{onClick:()=>$(x,e.folderId),children:t.jsxs(J,{children:[t.jsx(X,{$isRTL:r,children:t.jsx(Z,{$isRTL:r,children:t.jsx(ee,{children:e.folderName||""})})}),e.folderDescription&&e.folderDescription.length>1&&t.jsx(Q,{$isRTL:r,children:e.folderDescription}),t.jsxs(oe,{children:[t.jsx(ne,{$isRTL:r,children:e.files.map((C,c)=>t.jsx(se,{children:t.jsx(U,{thumbnailDataKey:C.thumbnailDataKey,dataKey:C.dataKey,src:`${W}${C.thumbnailDataKey||C.dataKey}`,alt:s("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},c))}),e.files.length>3&&t.jsx(ie,{$isRTL:r})]}),t.jsx(re,{$isRTL:r,children:l!=="NoPassword"&&t.jsx(V,{children:t.jsx("span",{children:R(l)})})})]})})},e.folderId)})}):t.jsx(t.Fragment,{children:o.map(e=>{var P;const l=e.createdAt!=null,x=e.updatedAt!=null&&e.createdAt!=null&&e.updatedAt!==e.createdAt,w=e.creatorId===`${a}_____${a}____Account`,C=((P=e.folderPassword)==null?void 0:P.policy)||"NoPassword",c=e.contacts||{},d=Object.values(c).filter(i=>i&&typeof i=="string"&&!i.toString().startsWith("Profile-")),f=ke(e.files),E=K(e.folderId,e.albumNanoId||null,e.creatorId&&e.contacts&&e.contacts[e.creatorId],e.folderName);return t.jsx(Y,{$isRTL:r,children:t.jsx(q,{onClick:()=>$(E,e.folderId),children:t.jsxs(J,{children:[t.jsxs(X,{$isRTL:r,children:[t.jsxs(Z,{$isRTL:r,children:[t.jsx(ee,{children:e.folderName||""}),(l||x)&&t.jsxs(me,{$isRTL:r,children:[l&&e.createdAt&&z(e.createdAt)&&t.jsxs("div",{children:[s("Created"),": ",z(e.createdAt)]}),x&&e.updatedAt&&z(e.updatedAt)&&t.jsxs("div",{children:[s("Updated"),": ",z(e.updatedAt)]})]})]}),t.jsx(Pe,{$isRTL:r,children:w?t.jsxs(Ie,{children:[t.jsx($e,{onClick:i=>{const A=i.currentTarget.nextElementSibling;A&&L(i,A)},children:s("Edit Files")}),t.jsxs(Le,{$isRTL:r,onClick:i=>{i.stopPropagation()},children:[t.jsx(te,{$isRTL:r,onClick:i=>{i.stopPropagation(),_(e.folderId)},children:s("Edit Files or Album Settings")}),t.jsx(te,{$isRTL:r,$isDelete:!0,onClick:i=>{i.preventDefault(),i.stopPropagation(),e.folderPositionId&&S(e.folderPositionId)},children:s("Delete My Copy")})]})]}):t.jsx(Te,{onClick:i=>{i.preventDefault(),i.stopPropagation(),e.folderPositionId&&S(e.folderPositionId)},children:s("Delete My Copy")})})]}),e.folderDescription&&e.folderDescription.length>1&&t.jsx(Q,{$isRTL:r,children:e.folderDescription}),t.jsx(we,{$isRTL:r,children:e.files.length===1?`${s("{{count}} file",{count:e.files.length.toString()})} • ${G(f)}`:`${s("{{count}} files",{count:e.files.length.toString()})} • ${G(f)}`}),t.jsxs(oe,{children:[t.jsx(ne,{$isRTL:r,children:e.files.map((i,A)=>t.jsx(se,{children:t.jsx(U,{thumbnailDataKey:i.thumbnailDataKey,dataKey:i.dataKey,src:`${W}${i.thumbnailDataKey||i.dataKey}`,alt:s("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},A))}),e.files.length>3&&t.jsx(ie,{$isRTL:r})]}),t.jsx(re,{$isRTL:r,children:C!=="NoPassword"&&t.jsx(V,{children:t.jsx("span",{children:R(C)})})}),j==!1&&t.jsx(ve,{folder:e,cognitoUsername:a,updateProfileIds:i=>O(e.folderId,i),onModalStateChange:i=>k(e.folderId,i)}),d.length>0&&t.jsx(Se,{$isRTL:r,children:t.jsxs(Re,{$isRTL:r,children:[s("Shared with"),": ",d.join(", ")]})})]})})},e.folderId)})})};export{Fe as A};
