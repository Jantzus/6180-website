import{j as e,u as te,a as w,x as M,c as ne,S as _,h as ie,f as re,g as oe,d as c,H as N,b as se}from"./utils-C1tD9cd2.js";import{L as O}from"./LazyImage-Clc6LocD.js";import{R as ae,C as le,a as de,d as ce}from"./fileOperations-CFgCk9GU.js";import{af as pe,ag as B,ah as K,ai as ue,aj as xe}from"./styled-components-CpuYabVd.js";const he=({isOpen:o,onClose:f,albumLink:b,t:d,isRTL:l})=>{if(!o)return null;const $=`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(b)}`,r=e.jsxs("div",{style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 0.5)",display:"flex",justifyContent:"center",alignItems:"center",zIndex:1e4,backdropFilter:"blur(4px)",WebkitBackdropFilter:"blur(4px)",padding:"20px"},onClick:f,children:[e.jsxs("div",{style:{backgroundColor:"white",borderRadius:"16px",padding:"32px",width:"90%",maxWidth:"400px",boxShadow:"0 20px 60px rgba(0, 0, 0, 0.3)",direction:l?"rtl":"ltr",textAlign:"center",position:"relative",animation:"modalFadeIn 0.3s ease-out"},onClick:p=>p.stopPropagation(),children:[e.jsx("h3",{style:{marginTop:0,marginBottom:"16px",fontSize:"20px",color:"#333",fontWeight:"600"},children:d("Share Album with QR Code")}),e.jsx("p",{style:{margin:"0 0 24px 0",fontSize:"14px",color:"#666",lineHeight:"1.5"},children:d("Let others scan this QR code with their phone camera to instantly access your album")}),e.jsx("div",{style:{display:"flex",justifyContent:"center",marginBottom:"24px",padding:"20px",backgroundColor:"#f8f9fa",borderRadius:"12px",border:"1px solid #e9ecef"},children:e.jsx("img",{src:$,alt:d("QR Code for album"),style:{width:"200px",height:"200px",border:"4px solid white",borderRadius:"8px",boxShadow:"0 2px 8px rgba(0,0,0,0.1)"},onError:p=>{p.currentTarget.style.display="none";const n=p.currentTarget.parentElement;n&&(n.innerHTML=`
                  <div style="
                    width: 200px; 
                    height: 200px; 
                    background: #f0f0f0; 
                    border-radius: 8px; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center;
                    color: #666;
                    font-size: 14px;
                    text-align: center;
                    padding: 20px;
                    box-sizing: border-box;
                  ">
                    ${d("QR Code could not be generated. Please use the link sharing option instead.")}
                  </div>
                `)}})}),e.jsxs("div",{style:{backgroundColor:"#e8f4f8",padding:"16px",borderRadius:"8px",marginBottom:"24px",border:"1px solid #b3e0f2"},children:[e.jsx("p",{style:{margin:"0 0 8px 0",fontSize:"13px",color:"#0c5460",fontWeight:"600"},children:d("How to scan:")}),e.jsxs("p",{style:{margin:0,fontSize:"12px",color:"#0c5460",lineHeight:"1.4",textAlign:l?"right":"left"},children:["• ",d("ppen your phone camera app (or use any QR code scanner app)"),e.jsx("br",{}),"• ",d("point camera at the QR code"),e.jsx("br",{}),"• ",d("tap the notification that appears"),e.jsx("br",{})]})]}),e.jsxs("div",{style:{backgroundColor:"#f8f9fa",padding:"12px",borderRadius:"6px",marginBottom:"20px",border:"1px solid #e9ecef"},children:[e.jsx("p",{style:{margin:"0 0 4px 0",fontSize:"11px",color:"#666",fontWeight:"600"},children:d("Album Link:")}),e.jsx("p",{style:{margin:0,fontSize:"11px",color:"#333",wordBreak:"break-all",fontFamily:"monospace"},children:b})]}),e.jsx("button",{style:{width:"100%",padding:"12px 24px",border:"none",borderRadius:"8px",backgroundColor:"#007bff",color:"white",fontSize:"14px",fontWeight:"600",cursor:"pointer",transition:"background-color 0.2s"},onClick:p=>{p.stopPropagation(),f()},onMouseOver:p=>{p.currentTarget.style.backgroundColor="#0056b3"},onMouseOut:p=>{p.currentTarget.style.backgroundColor="#007bff"},children:d("Close")})]}),e.jsx("style",{children:`
          @keyframes modalFadeIn {
            from {
              opacity: 0;
              transform: scale(0.9) translateY(-20px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
        `})]});return ae.createPortal(r,document.body)},ge=({folder:o,cognitoUsername:f,updateProfileIds:b,onModalStateChange:d})=>{const{t:l,language:$}=te(),r=oe($)==="rtl",[p,n]=w.useState(!1),[u,P]=w.useState(!1),[R,S]=w.useState(!1),[T,D]=w.useState(o.profileIds||[]),I=f?`${f}_____Public____Profile`:"",m=T.includes(I),A=M(o.folderId,o.albumNanoId,o.creatorId&&o.contacts&&o.contacts[o.creatorId]?o.contacts[o.creatorId]:"album",o.folderName);w.useEffect(()=>{D(o.profileIds||[])},[o.profileIds]),w.useEffect(()=>{d&&d(p||u||R)},[p,u,R,d]);const t=a=>{navigator.clipboard.writeText(a).then(()=>{n(!1),P(!0)}).catch(y=>{console.error("Failed to copy link:",y),alert(l("Failed to copy link"))})},s=async a=>{if(a.preventDefault(),a.stopPropagation(),!await ne()){alert(l("You must be logged in to download photos"));return}if(o&&o.files&&o.files.length>0){const j=o.files.map((g,i)=>{const C=g.dataKey.toLowerCase().endsWith(".mp4")?"video":"image";return{url:`${_}${g.dataKey}`,thumbnailUrl:g.thumbnailDataKey?`${_}${g.thumbnailDataKey}`:void 0,type:C,index:i,id:`file-${i}`,fileId:g.dataKey,loaded:!1}}),v={mediaItems:j,folderName:o.folderName||"Album"};ce(v,l,g=>{window.open(j[g].url,"_blank")})}else alert(l("No items to download"))},x=async a=>{var y,j,v;if(a.preventDefault(),a.stopPropagation(),!f){alert(l("You must be logged in to perform this action"));return}try{const k=await ie();if(!k){console.error("Authentication failed");return}const g=[...T];if(m){const F=g.indexOf(I);F>-1&&g.splice(F,1)}else g.push(I);const L=await(await fetch(re,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${k}`},body:JSON.stringify({query:`
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
      `,variables:{folderPositionChangeProfileIdsInput:{folderId:o.folderId,profileIds:g}}})})).json();if(L.errors)throw new Error(((y=L.errors[0])==null?void 0:y.message)||"Unknown error");const z=(((v=(j=L==null?void 0:L.data)==null?void 0:j.changeFiles)==null?void 0:v.items)||[]).find(F=>F.id===o.folderPositionId);z&&z.profileIds&&(D(z.profileIds),b&&b(z.profileIds),console.log("Album visibility updated successfully"))}catch(k){console.error("Failed to toggle album visibility:",k),alert(l("Failed to update album visibility. Please try again."))}},h={padding:"8px 12px",border:"none",borderRadius:6,cursor:"pointer",fontSize:14,textAlign:"center",whiteSpace:"nowrap",flexShrink:0};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:16,flexDirection:r?"row-reverse":"row"},children:[e.jsx("div",{style:{display:"flex",width:"100%",overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none",WebkitOverflowScrolling:"touch",flexDirection:r?"row-reverse":"row",gap:"10px"},children:e.jsxs("div",{style:{display:"flex",gap:"10px",flexDirection:r?"row-reverse":"row"},children:[e.jsx("button",{onClick:a=>{a.preventDefault(),a.stopPropagation(),S(!0)},style:{...h,backgroundColor:"#4caf50",color:"white"},children:l("Show QR Code")}),e.jsx("button",{onClick:a=>{a.preventDefault(),a.stopPropagation(),n(!0)},style:{...h,backgroundColor:"#e0e0e0"},children:l("Copy Link")}),e.jsx("button",{onClick:s,style:{...h,backgroundColor:"#e0e0e0"},children:l("Download")}),e.jsxs("button",{onClick:x,style:{...h,backgroundColor:m?"#4caf50":"#e0e0e0",color:m?"white":"inherit",display:"flex",alignItems:"center",gap:"6px",position:"relative",border:m?"none":"1px solid #ccc",transition:"all 0.2s ease"},children:[e.jsx("div",{style:{width:"8px",height:"8px",backgroundColor:m?"rgba(255,255,255,0.8)":"#999",borderRadius:"50%",transition:"all 0.2s ease",flexShrink:0}}),e.jsx("span",{style:{flexShrink:0},children:l(m?"On Public Profile":"Not On Public Profile")})]})]})}),e.jsx("style",{children:`
            div::-webkit-scrollbar {
              display: none;
            }
          `})]}),e.jsx(le,{isOpen:p,onClose:()=>n(!1),inviteLink:A,onCopy:t,t:l,isRTL:r}),e.jsx(de,{isOpen:u,onClose:()=>P(!1),t:l,isRTL:r}),e.jsx(he,{isOpen:R,onClose:()=>S(!1),albumLink:A,t:l,isRTL:r})]})},E=o=>{if(o===0)return"0 B";const f=1024,b=["B","KB","MB","GB","TB"],d=Math.floor(Math.log(o)/Math.log(f));return`${Math.round(o/Math.pow(f,d)*100)/100} ${b[d]}`},fe=o=>o.reduce((f,b)=>f+(b.dataInBytes||0),0),W=c.div`
  margin-bottom: 30px;
  width: 100%;
  direction: ${o=>o.$isRTL?"rtl":"ltr"};
`,Q=c.div`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  cursor: pointer;
`,V=c.div`
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
`,H=c.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
  flex-direction: ${o=>o.$isRTL?"row-reverse":"row"};
`,U=c.div`
  display: flex;
  flex-direction: column;
  align-items: ${o=>o.$isRTL?"flex-end":"flex-start"};
`,G=c.h2`
  font-size: 20px;
  margin: 0;
  color: #222;
`,be=c.div`
  display: flex;
  flex-direction: column;
  align-items: ${o=>o.$isRTL?"flex-start":"flex-end"};
  justify-content: flex-end;
  gap: 8px;
`,me=c.div`
  position: relative;
`,ye=c.button`
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
`,we=c.button`
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
`,je=c.div`
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
`,Y=c.button`
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
`,q=c.div`
  width: 100%;
  position: relative;
`,J=c.div`
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding-bottom: 8px;
  ms-overflow-style: none;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
  max-width: 100%;
  flex-direction: ${o=>o.$isRTL?"row-reverse":"row"};
`,X=c.div`
  position: absolute;
  ${o=>o.$isRTL?"left":"right"}: 0;
  top: 0;
  bottom: 8px;
  width: 30px;
  background: ${o=>o.$isRTL?"linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))":"linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))"};
  pointer-events: none;
`,Z=c.div`
  display: flex;
  justify-content: ${o=>o.$isRTL?"flex-start":"flex-end"};
  margin-top: 8px;
  margin-bottom: 8px;
`,ve=c.div`
  width: 100%;
  background-color: #f0f7ff;
  border-radius: 8px;
  padding: 12px 16px;
  margin-top: 16px;
  box-sizing: border-box;
  border: 1px solid #d0e1f9;
  direction: ${o=>o.$isRTL?"rtl":"ltr"};
`,ke=c.p`
  margin: 0;
  font-size: 14px;
  color: #333;
  text-align: ${o=>o.$isRTL?"right":"left"};
`,ee=c.div`
  width: 160px;
  height: 100px;
  flex-shrink: 0;
`,Le=({folders:o,setFolders:f,handleDeleteClick:b,isUploading:d=!1,cognitoUsername:l,isProfileView:$=!1})=>{const{t:r,language:p}=te(),n=oe(p)==="rtl",u=w.useRef(null),[P,R]=w.useState({});w.useEffect(()=>{function t(){u.current&&(u.current.style.display="none",u.current=null)}function s(){t()}return window.addEventListener("scroll",s,!0),()=>{window.removeEventListener("scroll",s,!0)}},[]);const S=(t,s)=>{t.preventDefault(),t.stopPropagation(),u.current&&u.current!==s&&(u.current.style.display="none");const x=s.style.display==="block";s.style.display=x?"none":"block",u.current=x?null:s},T=t=>{u.current&&(u.current.style.display="none",u.current=null),window.confirm(r("Are you sure you want to delete this album? This action cannot be undone."))&&b&&b(t,r)},D=(t,s)=>{f&&f(x=>x.map(h=>h.folderId===t?{...h,profileIds:s}:h))},I=t=>{switch(t){case"NotVisible":return r("Hidden");case"Watermark":return r("Watermarked");case"CannotBeSaved":return r("Cannot be saved");case"NoPassword":default:return r("No password")}},m=(t,s)=>{const x=u.current&&u.current.style.display==="block",h=P[s]||!1;!x&&!h&&(window.location.href=t)},A=(t,s)=>{R(x=>({...x,[t]:s}))};return o.length===0&&!d?e.jsx(pe,{$type:"empty",children:e.jsx("p",{children:r("No albums found")})}):$?e.jsx(e.Fragment,{children:o.map(t=>{var h;const s=((h=t.folderPassword)==null?void 0:h.policy)||"NoPassword",x=M(t.folderId,t.albumNanoId||null,t.creatorId&&t.contacts&&t.contacts[t.creatorId],t.folderName);return e.jsx(W,{$isRTL:n,children:e.jsx(Q,{onClick:()=>m(x,t.folderId),children:e.jsxs(V,{children:[e.jsx(H,{$isRTL:n,children:e.jsx(U,{$isRTL:n,children:e.jsx(G,{children:t.folderName||""})})}),t.folderDescription&&t.folderDescription.length>1&&e.jsx(B,{$isRTL:n,children:t.folderDescription}),e.jsxs(q,{children:[e.jsx(J,{$isRTL:n,children:t.files.map((a,y)=>e.jsx(ee,{children:e.jsx(O,{thumbnailDataKey:a.thumbnailDataKey,dataKey:a.dataKey,src:`${_}${a.thumbnailDataKey||a.dataKey}`,alt:r("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},y))}),t.files.length>3&&e.jsx(X,{$isRTL:n})]}),e.jsx(Z,{$isRTL:n,children:s!=="NoPassword"&&e.jsx(K,{children:e.jsx("span",{children:I(s)})})})]})})},t.folderId)})}):e.jsx(e.Fragment,{children:o.map(t=>{var g;const s=t.createdAt!=null,x=t.updatedAt!=null&&t.createdAt!=null&&t.updatedAt!==t.createdAt,h=t.creatorId===`${l}_____${l}____Account`,a=((g=t.folderPassword)==null?void 0:g.policy)||"NoPassword",y=t.contacts||{},j=Object.values(y).filter(i=>i&&typeof i=="string"&&!i.toString().startsWith("Profile-")),v=fe(t.files),k=M(t.folderId,t.albumNanoId||null,t.creatorId&&t.contacts&&t.contacts[t.creatorId],t.folderName);return e.jsx(W,{$isRTL:n,children:e.jsx(Q,{onClick:()=>m(k,t.folderId),children:e.jsxs(V,{children:[e.jsxs(H,{$isRTL:n,children:[e.jsxs(U,{$isRTL:n,children:[e.jsx(G,{children:t.folderName||""}),(s||x)&&e.jsxs(ue,{$isRTL:n,children:[s&&t.createdAt&&N(t.createdAt)&&e.jsxs("div",{children:[r("Created"),": ",N(t.createdAt)]}),x&&t.updatedAt&&N(t.updatedAt)&&e.jsxs("div",{children:[r("Updated"),": ",N(t.updatedAt)]})]})]}),e.jsx(be,{$isRTL:n,children:h?e.jsxs(me,{children:[e.jsx(ye,{onClick:i=>{const C=i.currentTarget.nextElementSibling;C&&S(i,C)},children:r("Edit")}),e.jsxs(je,{$isRTL:n,onClick:i=>{i.stopPropagation()},children:[e.jsx(Y,{$isRTL:n,onClick:i=>{i.stopPropagation(),window.location.href=se(`save-album.html?folderId=${encodeURIComponent(t.folderId)}`)},children:r("Edit Details")}),e.jsx(Y,{$isRTL:n,$isDelete:!0,onClick:i=>{i.preventDefault(),i.stopPropagation(),T(t.folderPositionId)},children:r("Delete My Copy")})]})]}):e.jsx(we,{onClick:i=>{i.preventDefault(),i.stopPropagation(),T(t.folderPositionId)},children:r("Delete My Copy")})})]}),t.folderDescription&&t.folderDescription.length>1&&e.jsx(B,{$isRTL:n,children:t.folderDescription}),e.jsx(xe,{$isRTL:n,children:t.files.length===1?`${r("{{count}} file",{count:t.files.length.toString()})} • ${E(v)}`:`${r("{{count}} files",{count:t.files.length.toString()})} • ${E(v)}`}),e.jsxs(q,{children:[e.jsx(J,{$isRTL:n,children:t.files.map((i,C)=>e.jsx(ee,{children:e.jsx(O,{thumbnailDataKey:i.thumbnailDataKey,dataKey:i.dataKey,src:`${_}${i.thumbnailDataKey||i.dataKey}`,alt:r("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},C))}),t.files.length>3&&e.jsx(X,{$isRTL:n})]}),e.jsx(Z,{$isRTL:n,children:a!=="NoPassword"&&e.jsx(K,{children:e.jsx("span",{children:I(a)})})}),$==!1&&e.jsx(ge,{folder:t,cognitoUsername:l,updateProfileIds:i=>D(t.folderId,i),onModalStateChange:i=>A(t.folderId,i)}),j.length>0&&e.jsx(ve,{$isRTL:n,children:e.jsxs(ke,{$isRTL:n,children:[r("Shared with"),": ",j.join(", ")]})})]})})},t.folderId)})})};export{Le as A};
