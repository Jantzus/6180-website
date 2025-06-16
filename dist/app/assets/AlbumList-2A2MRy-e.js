import{u as te,a as y,x as M,j as t,c as ne,S as K,h as ie,f as se,g as oe,d as l,H as _,b as re}from"./utils-C1FUk2iD.js";import{L as O}from"./LazyImage-CPKlzoGh.js";import{C as ae,a as le,d as de}from"./fileOperations-D53GWVzG.js";import{ao as ce,ap as z,aq as E,ar as pe,as as ue}from"./styled-components-BlKL9vJ2.js";const he=({folder:o,openFilePicker:x,cognitoUsername:f,updateProfileIds:w,onModalStateChange:v})=>{const{t:d,language:P}=te(),a=oe(P)==="rtl",[j,s]=y.useState(!1),[c,T]=y.useState(!1),[C,R]=y.useState(o.profileIds||[]),$=f?`${f}_____Public____Profile`:"",b=C.includes($),D=M(o.folderId,o.albumNanoId,o.creatorId&&o.contacts&&o.contacts[o.creatorId]?o.contacts[o.creatorId]:"album",o.folderName);y.useEffect(()=>{R(o.profileIds||[])},[o.profileIds]),y.useEffect(()=>{v&&v(j||c)},[j,c,v]);const A=i=>{navigator.clipboard.writeText(i).then(()=>{s(!1),T(!0)}).catch(p=>{console.error("Failed to copy link:",p),alert(d("Failed to copy link"))})},F=async i=>{if(i.preventDefault(),i.stopPropagation(),!await ne()){alert(d("You must be logged in to download photos"));return}if(o&&o.files&&o.files.length>0){const h=o.files.map((u,I)=>{const k=u.dataKey.toLowerCase().endsWith(".mp4")?"video":"image";return{url:`${K}${u.dataKey}`,thumbnailUrl:u.thumbnailDataKey?`${K}${u.thumbnailDataKey}`:void 0,type:k,index:I,id:`file-${I}`,fileId:u.dataKey,loaded:!1}}),g={mediaItems:h,folderName:o.folderName||"Album"};de(g,d,u=>{window.open(h[u].url,"_blank")})}else alert(d("No items to download"))},e=async i=>{var p,h,g;if(i.preventDefault(),i.stopPropagation(),!f){alert(d("You must be logged in to perform this action"));return}try{const m=await ie();if(!m){console.error("Authentication failed");return}const u=[...C];if(b){const N=u.indexOf($);N>-1&&u.splice(N,1)}else u.push($);const n=await(await fetch(se,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${m}`},body:JSON.stringify({query:`
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
      `,variables:{folderPositionChangeProfileIdsInput:{folderId:o.folderId,profileIds:u}}})})).json();if(n.errors)throw new Error(((p=n.errors[0])==null?void 0:p.message)||"Unknown error");const S=(((g=(h=n==null?void 0:n.data)==null?void 0:h.changeFiles)==null?void 0:g.items)||[]).find(N=>N.id===o.folderPositionId);S&&S.profileIds&&(R(S.profileIds),w&&w(S.profileIds),console.log("Album visibility updated successfully"))}catch(m){console.error("Failed to toggle album visibility:",m),alert(d("Failed to update album visibility. Please try again."))}},r={padding:"8px 12px",border:"none",borderRadius:6,cursor:"pointer",fontSize:14,textAlign:"center",whiteSpace:"nowrap",flexShrink:0};return t.jsx(t.Fragment,{children:t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:16,flexDirection:a?"row-reverse":"row"},children:[t.jsx("div",{style:{display:"flex",width:"100%",overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none",WebkitOverflowScrolling:"touch",flexDirection:a?"row-reverse":"row",gap:"10px"},children:t.jsxs("div",{style:{display:"flex",gap:"10px",flexDirection:a?"row-reverse":"row"},children:[x&&t.jsx("button",{onClick:i=>{i.preventDefault(),i.stopPropagation(),x(o.folderId)},style:{...r,backgroundColor:"#4caf50",color:"white"},children:d("Add Photos")}),t.jsx("button",{onClick:i=>{i.preventDefault(),i.stopPropagation(),s(!0)},style:{...r,backgroundColor:"#e0e0e0"},children:d("Copy Link")}),t.jsx("button",{onClick:F,style:{...r,backgroundColor:"#e0e0e0"},children:d("Download")}),t.jsxs("button",{onClick:e,style:{...r,backgroundColor:b?"#4caf50":"#e0e0e0",color:b?"white":"inherit",display:"flex",alignItems:"center",gap:"6px",position:"relative",border:b?"none":"1px solid #ccc",transition:"all 0.2s ease"},children:[t.jsx("div",{style:{width:"8px",height:"8px",backgroundColor:b?"rgba(255,255,255,0.8)":"#999",borderRadius:"50%",transition:"all 0.2s ease",flexShrink:0}}),t.jsx("span",{style:{flexShrink:0},children:d(b?"On Public Profile":"Not On Public Profile")})]})]})}),t.jsx(ae,{isOpen:j,onClose:()=>s(!1),inviteLink:D,onCopy:A,t:d,isRTL:a}),t.jsx(le,{isOpen:c,onClose:()=>T(!1),t:d,isRTL:a}),t.jsx("style",{children:`
            div::-webkit-scrollbar {
              display: none;
            }
          `})]})})},B=o=>{if(o===0)return"0 B";const x=1024,f=["B","KB","MB","GB","TB"],w=Math.floor(Math.log(o)/Math.log(x));return`${Math.round(o/Math.pow(x,w)*100)/100} ${f[w]}`},xe=o=>o.reduce((x,f)=>x+(f.dataInBytes||0),0),W=l.div`
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
  overflow: hidden;
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
`,H=l.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
  flex-direction: ${o=>o.$isRTL?"row-reverse":"row"};
`,U=l.div`
  display: flex;
  flex-direction: column;
  align-items: ${o=>o.$isRTL?"flex-end":"flex-start"};
`,Q=l.h2`
  font-size: 20px;
  margin: 0;
  color: #222;
`,fe=l.div`
  display: flex;
  flex-direction: column;
  align-items: ${o=>o.$isRTL?"flex-start":"flex-end"};
  justify-content: flex-end;
  gap: 8px;
`,be=l.div`
  position: relative;
`,ge=l.button`
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
`,me=l.button`
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
`,ye=l.div`
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
`,Y=l.button`
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
`,we=l.div`
  width: 100%;
  background-color: #f0f7ff;
  border-radius: 8px;
  padding: 12px 16px;
  margin-top: 16px;
  box-sizing: border-box;
  border: 1px solid #d0e1f9;
  direction: ${o=>o.$isRTL?"rtl":"ltr"};
`,$e=l.p`
  margin: 0;
  font-size: 14px;
  color: #333;
  text-align: ${o=>o.$isRTL?"right":"left"};
`,ee=l.div`
  width: 160px;
  height: 100px;
  flex-shrink: 0;
`,Le=({folders:o,setFolders:x,handleDeleteClick:f,openFilePicker:w,isUploading:v=!1,cognitoUsername:d,isProfileView:P=!1})=>{const{t:a,language:j}=te(),s=oe(j)==="rtl",c=y.useRef(null),[T,C]=y.useState({});y.useEffect(()=>{function e(){c.current&&(c.current.style.display="none",c.current=null)}function r(){e()}return window.addEventListener("scroll",r,!0),()=>{window.removeEventListener("scroll",r,!0)}},[]);const R=(e,r)=>{e.preventDefault(),e.stopPropagation(),c.current&&c.current!==r&&(c.current.style.display="none");const i=r.style.display==="block";r.style.display=i?"none":"block",c.current=i?null:r},$=e=>{c.current&&(c.current.style.display="none",c.current=null),window.confirm(a("Are you sure you want to delete this album? This action cannot be undone."))&&f&&f(e,a)},b=(e,r)=>{x&&x(i=>i.map(p=>p.folderId===e?{...p,profileIds:r}:p))},D=e=>{switch(e){case"NotVisible":return a("Hidden");case"Watermark":return a("Watermarked");case"CannotBeSaved":return a("Cannot be saved");case"NoPassword":default:return a("No password")}},A=(e,r)=>{const i=c.current&&c.current.style.display==="block",p=T[r]||!1;!i&&!p&&(window.location.href=e)},F=(e,r)=>{C(i=>({...i,[e]:r}))};return o.length===0&&!v?t.jsx(ce,{$type:"empty",children:t.jsx("p",{children:a("No albums found")})}):P?t.jsx(t.Fragment,{children:o.map(e=>{var p;const r=((p=e.folderPassword)==null?void 0:p.policy)||"NoPassword",i=M(e.folderId,e.albumNanoId||null,e.creatorId&&e.contacts&&e.contacts[e.creatorId],e.folderName);return t.jsx(W,{$isRTL:s,children:t.jsx(V,{onClick:()=>A(i,e.folderId),children:t.jsxs(G,{children:[t.jsx(H,{$isRTL:s,children:t.jsx(U,{$isRTL:s,children:t.jsx(Q,{children:e.folderName||""})})}),e.folderDescription&&e.folderDescription.length>1&&t.jsx(z,{$isRTL:s,children:e.folderDescription}),t.jsxs(q,{children:[t.jsx(J,{$isRTL:s,children:e.files.map((h,g)=>t.jsx(ee,{children:t.jsx(O,{thumbnailDataKey:h.thumbnailDataKey,dataKey:h.dataKey,src:`${K}${h.thumbnailDataKey||h.dataKey}`,alt:a("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},g))}),e.files.length>3&&t.jsx(X,{$isRTL:s})]}),t.jsx(Z,{$isRTL:s,children:r!=="NoPassword"&&t.jsx(E,{children:t.jsx("span",{children:D(r)})})})]})})},e.folderId)})}):t.jsx(t.Fragment,{children:o.map(e=>{var k;const r=e.createdAt!=null,i=e.updatedAt!=null&&e.createdAt!=null&&e.updatedAt!==e.createdAt,p=e.creatorId===`${d}_____${d}____Account`,h=((k=e.folderPassword)==null?void 0:k.policy)||"NoPassword",g=e.contacts||{},m=Object.values(g).filter(n=>n&&typeof n=="string"&&!n.toString().startsWith("Profile-")),u=xe(e.files),I=M(e.folderId,e.albumNanoId||null,e.creatorId&&e.contacts&&e.contacts[e.creatorId],e.folderName);return t.jsx(W,{$isRTL:s,children:t.jsx(V,{onClick:()=>A(I,e.folderId),children:t.jsxs(G,{children:[t.jsxs(H,{$isRTL:s,children:[t.jsxs(U,{$isRTL:s,children:[t.jsx(Q,{children:e.folderName||""}),(r||i)&&t.jsxs(pe,{$isRTL:s,children:[r&&e.createdAt&&_(e.createdAt)&&t.jsxs("div",{children:[a("Created"),": ",_(e.createdAt)]}),i&&e.updatedAt&&_(e.updatedAt)&&t.jsxs("div",{children:[a("Updated"),": ",_(e.updatedAt)]})]})]}),t.jsx(fe,{$isRTL:s,children:p?t.jsxs(be,{children:[t.jsx(ge,{onClick:n=>{const L=n.currentTarget.nextElementSibling;L&&R(n,L)},children:a("Edit")}),t.jsxs(ye,{$isRTL:s,onClick:n=>{n.stopPropagation()},children:[t.jsx(Y,{$isRTL:s,onClick:n=>{n.stopPropagation(),window.location.href=re(`save-album.html?folderId=${encodeURIComponent(e.folderId)}`)},children:a("Edit Details")}),t.jsx(Y,{$isRTL:s,$isDelete:!0,onClick:n=>{n.preventDefault(),n.stopPropagation(),$(e.folderPositionId)},children:a("Delete My Copy")})]})]}):t.jsx(me,{onClick:n=>{n.preventDefault(),n.stopPropagation(),$(e.folderPositionId)},children:a("Delete My Copy")})})]}),e.folderDescription&&e.folderDescription.length>1&&t.jsx(z,{$isRTL:s,children:e.folderDescription}),t.jsx(ue,{$isRTL:s,children:e.files.length===1?`${a("{{count}} file",{count:e.files.length.toString()})} • ${B(u)}`:`${a("{{count}} files",{count:e.files.length.toString()})} • ${B(u)}`}),t.jsxs(q,{children:[t.jsx(J,{$isRTL:s,children:e.files.map((n,L)=>t.jsx(ee,{children:t.jsx(O,{thumbnailDataKey:n.thumbnailDataKey,dataKey:n.dataKey,src:`${K}${n.thumbnailDataKey||n.dataKey}`,alt:a("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},L))}),e.files.length>3&&t.jsx(X,{$isRTL:s})]}),t.jsx(Z,{$isRTL:s,children:h!=="NoPassword"&&t.jsx(E,{children:t.jsx("span",{children:D(h)})})}),P==!1&&t.jsx(he,{folder:e,openFilePicker:w,cognitoUsername:d,updateProfileIds:n=>b(e.folderId,n),onModalStateChange:n=>F(e.folderId,n)}),m.length>0&&t.jsx(we,{$isRTL:s,children:t.jsxs($e,{$isRTL:s,children:[a("Shared with"),": ",m.join(", ")]})})]})})},e.folderId)})})};export{Le as A};
