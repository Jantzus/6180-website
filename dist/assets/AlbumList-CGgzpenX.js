import{j as t,r as y,aa as _,u as K,k as H,g as G,d as i,bm as M,bo as E,bp as O}from"./styled-components-C2kOizVL.js";import{t as F,c as Q,b as Y,w as N}from"./utils-Dg1pmrfX.js";import{C as q,a as J,d as X}from"./fileOperations-rkQXV-_p.js";const Ae=({searchQuery:e,setSearchQuery:v,t:b,isRTL:p})=>t.jsx("div",{style:{width:"100%",marginBottom:24,boxSizing:"border-box",direction:p?"rtl":"ltr"},children:t.jsx("input",{type:"text",placeholder:b("Search album title or description"),value:e,onChange:s=>v(s.target.value),style:{width:"100%",padding:"10px 16px",fontSize:"14px",border:"1px solid #ddd",borderRadius:"6px",outline:"none",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",boxSizing:"border-box"}})}),B=({src:e,alt:v,style:b,thumbnailDataKey:p,dataKey:s,bucketUrl:f=_,...g})=>{const[C,I]=y.useState(!1),[L,k]=y.useState(""),[l,P]=y.useState(!1);y.useEffect(()=>{I(!1);let w="",j=!1;p&&p.length>0?(w=`${f}${p}`,j=!0):s&&s.length>0?(w=`${f}${s}`,j=!0):e&&e.length>0&&(w=e,j=!0),k(w),P(j)},[p,s,e,f]);const a=()=>{I(!0)},d=w=>{console.error("Image load error:",w),p&&s&&p!==s&&L===`${f}${p}`?(console.log("Falling back to full image"),k(`${f}${s}`)):P(!1)};return l?t.jsx("img",{src:L,alt:v,style:{...b,opacity:C?1:.3,transition:"opacity 0.3s ease-in-out"},onLoad:a,onError:d,...g}):null},W=({folder:e,openFilePicker:v,cognitoUsername:b,updateProfileIds:p})=>{const{t:s,language:f}=K(),g=G(f)==="rtl",[C,I]=y.useState(!1),[L,k]=y.useState(!1),[l,P]=y.useState(e.profileIds||[]),a=b?`${b}_____Public____Profile`:"",d=l.includes(a),w=F(e.folderId,e.albumNanoId,e.folderName);y.useEffect(()=>{P(e.profileIds||[])},[e.profileIds]);const j=n=>{navigator.clipboard.writeText(n).then(()=>{I(!1),k(!0)}).catch(x=>{console.error("Failed to copy link:",x),alert(s("Failed to copy link"))})},z=async n=>{if(n.preventDefault(),n.stopPropagation(),!await Q()){alert(s("You must be logged in to download photos"));return}if(e&&e.files&&e.files.length>0){const u=e.files.map((c,$)=>{const T=c.dataKey.toLowerCase().endsWith(".mp4")?"video":"image";return{url:`${_}${c.dataKey}`,thumbnailUrl:c.thumbnailDataKey?`${_}${c.thumbnailDataKey}`:void 0,type:T,index:$,id:`file-${$}`,fileId:c.dataKey,loaded:!1}}),m={mediaItems:u,folderName:e.folderName||"Album"};X(m,s,c=>{window.open(u[c].url,"_blank")})}else alert(s("No items to download"))},A=async n=>{var x,u,m;if(n.preventDefault(),n.stopPropagation(),!b){alert(s("You must be logged in to perform this action"));return}try{const h=await Y();if(!h){console.error("Authentication failed");return}const c=[...l];if(d){const R=c.indexOf(a);R>-1&&c.splice(R,1)}else c.push(a);const r=await(await fetch(H,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${h}`},body:JSON.stringify({query:`
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
      `,variables:{folderPositionChangeProfileIdsInput:{folderId:e.folderId,profileIds:c}}})})).json();if(r.errors)throw new Error(((x=r.errors[0])==null?void 0:x.message)||"Unknown error");const D=(((m=(u=r==null?void 0:r.data)==null?void 0:u.changeFiles)==null?void 0:m.items)||[]).find(R=>R.id===e.folderPositionId);D&&D.profileIds&&(P(D.profileIds),p&&p(D.profileIds),console.log("Album visibility updated successfully"))}catch(h){console.error("Failed to toggle album visibility:",h),alert(s("Failed to update album visibility. Please try again."))}},o={padding:"8px 12px",border:"none",borderRadius:6,cursor:"pointer",fontSize:14,textAlign:"center",whiteSpace:"nowrap",flexShrink:0};return t.jsx(t.Fragment,{children:t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:16,flexDirection:g?"row-reverse":"row"},children:[t.jsx("div",{style:{display:"flex",width:"100%",overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none",WebkitOverflowScrolling:"touch",flexDirection:g?"row-reverse":"row",gap:"10px"},children:t.jsxs("div",{style:{display:"flex",gap:"10px",flexDirection:g?"row-reverse":"row"},children:[v&&t.jsx("button",{onClick:n=>{n.preventDefault(),n.stopPropagation(),v(e.folderId)},style:{...o,backgroundColor:"#4caf50",color:"white"},children:s("Add Photos")}),t.jsx("button",{onClick:z,style:{...o,backgroundColor:"#e0e0e0"},children:s("Download")}),t.jsx("button",{onClick:n=>{n.preventDefault(),n.stopPropagation(),I(!0)},style:{...o,backgroundColor:"#e0e0e0"},children:s("Copy Link")}),t.jsx("button",{onClick:A,style:{...o,backgroundColor:d?"#4caf50":"#e0e0e0",color:d?"white":"inherit"},children:s(d?"On Public Profile":"Not On Public Profile")})]})}),t.jsx(q,{isOpen:C,onClose:()=>I(!1),inviteLink:w,onCopy:j,t:s,isRTL:g}),t.jsx(J,{isOpen:L,onClose:()=>k(!1),t:s,isRTL:g}),t.jsx("style",{children:`
            div::-webkit-scrollbar {
              display: none;
            }
          `})]})})};i.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #555;
  margin-left: 8px;
`;i.div`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 100;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-radius: 4px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 180px;
  margin-top: 4px;
`;i.div`
  padding: 10px 16px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-bottom: ${e=>e.hasBorder?"1px solid #eee":"none"};
`;const De=i.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  flex-direction: ${e=>e.isRTL?"row-reverse":"row"};
`,Re=i.div`
  display: flex;
  width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
  flex-direction: ${e=>e.isRTL?"row-reverse":"row"};
  gap: 10px;
`,Ne=i.div`
  display: flex;
  gap: 10px;
  flex-direction: ${e=>e.isRTL?"row-reverse":"row"};
`,_e=i.button`
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  text-align: center;
  white-space: nowrap;
  flex-shrink: 0;
  
  background-color: ${e=>{switch(e.variant){case"primary":return"#2196f3";case"success":return"#4caf50";case"active":return"#4caf50";default:return"#e0e0e0"}}};
  
  color: ${e=>{switch(e.variant){case"primary":case"success":case"active":return"white";default:return"inherit"}}};
`,Z=i.div`
  margin-bottom: 30px;
  width: 100%;
  direction: ${e=>e.isRTL?"rtl":"ltr"};
`,U=i.a`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  overflow: hidden;
`,ee=i.div`
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
`,te=i.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
  flex-direction: ${e=>e.isRTL?"row-reverse":"row"};
`,oe=i.div`
  display: flex;
  flex-direction: column;
  align-items: ${e=>e.isRTL?"flex-end":"flex-start"};
`,ie=i.h2`
  font-size: 20px;
  margin: 0;
  color: #222;
`,ne=i.div`
  font-size: 13px;
  color: #777;
  text-align: ${e=>e.isRTL?"right":"left"};
  margin-top: 4px;
`,re=i.div`
  width: 100%;
  position: relative;
`,se=i.div`
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding-bottom: 8px;
  -ms-overflow-style: none;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
  max-width: 100%;
  flex-direction: ${e=>e.isRTL?"row-reverse":"row"};
`,ae=i.div`
  flex-shrink: 0;
`,le=i.div`
  position: absolute;
  ${e=>e.isRTL?"left":"right"}: 0;
  top: 0;
  bottom: 8px;
  width: 30px;
  background: ${e=>e.isRTL?"linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))":"linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))"};
  pointer-events: none;
`,de=i.div`
  display: flex;
  justify-content: ${e=>e.isRTL?"flex-start":"flex-end"};
  margin-top: 8px;
  margin-bottom: 8px;
`,ce=i.div`
  margin-bottom: 30px;
  width: 100%;
  direction: ${e=>e.isRTL?"rtl":"ltr"};
`,pe=i.a`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  overflow: hidden;
`,xe=i.div`
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
`,ue=i.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
  flex-direction: ${e=>e.isRTL?"row-reverse":"row"};
`,he=i.div`
  display: flex;
  flex-direction: column;
  align-items: ${e=>e.isRTL?"flex-end":"flex-start"};
`,fe=i.h2`
  font-size: 20px;
  margin: 0;
  color: #222;
`,ge=i.div`
  display: flex;
  flex-direction: column;
  align-items: ${e=>e.isRTL?"flex-start":"flex-end"};
  justify-content: flex-end;
  gap: 8px;
`,be=i.div`
  position: relative;
`,we=i.a`
  font-size: 13px;
  color: #2196f3;
  text-decoration: none;
`,me=i.a`
  font-size: 13px;
  color: #d32f2f;
  text-decoration: none;
`,ye=i.div`
  display: none;
  position: absolute;
  top: 100%;
  right: ${e=>e.isRTL?"auto":0};
  left: ${e=>e.isRTL?0:"auto"};
  background-color: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-radius: 4px;
  z-index: 10;
  min-width: 150px;
  padding: 8px 0;
  margin-top: 5px;
  text-align: ${e=>e.isRTL?"right":"left"};
`,V=i.a`
  display: block;
  padding: 8px 16px;
  color: ${e=>e.isDelete?"#d32f2f":"#2196f3"};
  text-decoration: none;
  font-size: 13px;
  white-space: nowrap;
`,ve=i.div`
  width: 100%;
  position: relative;
`,je=i.div`
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding-bottom: 8px;
  ms-overflow-style: none;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
  max-width: 100%;
  flex-direction: ${e=>e.isRTL?"row-reverse":"row"};
`,Ie=i.div`
  position: absolute;
  ${e=>e.isRTL?"left":"right"}: 0;
  top: 0;
  bottom: 8px;
  width: 30px;
  background: ${e=>e.isRTL?"linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))":"linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))"};
  pointer-events: none;
`,Pe=i.div`
  display: flex;
  justify-content: ${e=>e.isRTL?"flex-start":"flex-end"};
  margin-top: 8px;
  margin-bottom: 8px;
`,ke=i.div`
  width: 100%;
  background-color: #f0f7ff;
  border-radius: 8px;
  padding: 12px 16px;
  margin-top: 16px;
  box-sizing: border-box;
  border: 1px solid #d0e1f9;
  direction: ${e=>e.isRTL?"rtl":"ltr"};
`,Ce=i.p`
  margin: 0;
  font-size: 14px;
  color: #333;
  text-align: ${e=>e.isRTL?"right":"left"};
`,Le=i.div`
  width: 160px;
  height: 100px;
  flex-shrink: 0;
`,ze=({folders:e,setFolders:v,handleDeleteClick:b,openFilePicker:p,isUploading:s=!1,cognitoUsername:f,isProfileView:g=!1,footerComponent:C,isOwner:I=!1,hasAddPhotoPermission:L=!1,updateProfileIds:k})=>{const{t:l,language:P}=K(),a=G(P)==="rtl",d=y.useRef(null);y.useEffect(()=>{function o(){d.current&&(d.current.style.display="none",d.current=null)}function n(){o()}return window.addEventListener("scroll",n,!0),()=>{window.removeEventListener("scroll",n,!0)}},[]);const w=(o,n)=>{o.preventDefault(),o.stopPropagation(),d.current&&d.current!==n&&(d.current.style.display="none");const x=n.style.display==="block";n.style.display=x?"none":"block",d.current=x?null:n},j=o=>{d.current&&(d.current.style.display="none",d.current=null),window.confirm(l("Are you sure you want to delete this album? This action cannot be undone."))&&b&&b(o,l)},z=(o,n)=>{v&&v(x=>x.map(u=>u.folderId===o?{...u,profileIds:n}:u))},A=o=>{switch(o){case"NotVisible":return l("Hidden");case"Watermark":return l("Watermarked");case"CannotBeSaved":return l("Cannot be saved");case"NoPassword":default:return l("No password")}};return e.length===0&&!s?t.jsx(M,{children:t.jsx("p",{children:l(g?"No public albums found":"No albums found")})}):g?t.jsx(t.Fragment,{children:e.map(o=>{var m;const n=((m=o.folderPassword)==null?void 0:m.policy)||"NoPassword",x=F(o.folderId,o.albumNanoId||null,o.folderName),u=o.files.filter(h=>h.thumbnailDataKey&&h.thumbnailDataKey.length>0||h.dataKey&&h.dataKey.length>0);return t.jsx(Z,{isRTL:a,children:t.jsx(U,{href:x,children:t.jsxs(ee,{children:[t.jsx(te,{isRTL:a,children:t.jsx(oe,{isRTL:a,children:t.jsx(ie,{children:o.folderName||""})})}),u.length>0&&t.jsxs(re,{children:[t.jsx(se,{isRTL:a,children:u.map((h,c)=>t.jsx(ae,{children:t.jsx(B,{thumbnailDataKey:h.thumbnailDataKey,dataKey:h.dataKey,alt:l("Thumbnail"),style:{width:160,height:100,objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},c))}),u.length>3&&t.jsx(le,{isRTL:a})]}),t.jsx(de,{isRTL:a,children:n!=="NoPassword"&&t.jsx(E,{children:t.jsx("span",{children:A(n)})})}),o.folderDescription&&o.folderDescription.length>1&&t.jsx(O,{isRTL:a,children:o.folderDescription}),C&&t.jsx(C,{folder:o,isOwner:I,hasAddPhotoPermission:L,cognitoUsername:f,openFilePicker:p,updateProfileIds:k})]})})},o.folderId)})}):t.jsx(t.Fragment,{children:e.map(o=>{var T;const n=o.createdAt!=null,x=o.updatedAt!=null&&o.createdAt!=null&&o.updatedAt!==o.createdAt,u=o.creatorId===`${f}_____${f}____Account`,m=((T=o.folderPassword)==null?void 0:T.policy)||"NoPassword",h=o.contacts||{},c=Object.values(h).filter(r=>r&&typeof r=="string"&&!r.toString().startsWith("Profile-")),$=F(o.folderId,o.albumNanoId||null,o.folderName);return t.jsx(ce,{isRTL:a,children:t.jsx(pe,{href:$,children:t.jsxs(xe,{children:[t.jsxs(ue,{isRTL:a,children:[t.jsxs(he,{isRTL:a,children:[t.jsx(fe,{children:o.folderName||""}),(n||x)&&t.jsxs(ne,{isRTL:a,children:[n&&o.createdAt&&N(o.createdAt)&&t.jsxs("div",{children:[l("Created"),": ",N(o.createdAt)]}),x&&o.updatedAt&&N(o.updatedAt)&&t.jsxs("div",{children:[l("Updated"),": ",N(o.updatedAt)]})]})]}),t.jsx(ge,{isRTL:a,children:u?t.jsxs(be,{children:[t.jsx(we,{href:"#",onClick:r=>{const S=r.currentTarget.nextElementSibling;S&&w(r,S)},children:l("Edit")}),t.jsxs(ye,{isRTL:a,onClick:r=>{r.stopPropagation()},children:[t.jsx(V,{href:`/save-album.html?folderId=${encodeURIComponent(o.folderId)}`,onClick:r=>{r.stopPropagation()},children:l("Edit Details")}),t.jsx(V,{href:"#",isDelete:!0,onClick:r=>{r.preventDefault(),r.stopPropagation(),j(o.folderPositionId)},children:l("Delete My Copy")})]})]}):t.jsx(me,{href:"#",onClick:r=>{r.preventDefault(),r.stopPropagation(),j(o.folderPositionId)},children:l("Delete")})})]}),o.folderDescription&&o.folderDescription.length>1&&t.jsx(O,{isRTL:a,children:o.folderDescription}),t.jsxs(ve,{children:[t.jsx(je,{isRTL:a,children:o.files.map((r,S)=>t.jsx(Le,{children:t.jsx(B,{thumbnailDataKey:r.thumbnailDataKey,dataKey:r.dataKey,src:`${_}${r.thumbnailDataKey||r.dataKey}`,alt:l("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},S))}),o.files.length>3&&t.jsx(Ie,{isRTL:a})]}),t.jsx(Pe,{isRTL:a,children:m!=="NoPassword"&&t.jsx(E,{children:t.jsx("span",{children:A(m)})})}),g==!1&&W&&t.jsx(W,{folder:o,openFilePicker:p,cognitoUsername:f,updateProfileIds:r=>z(o.folderId,r)}),c.length>0&&t.jsx(ke,{isRTL:a,children:t.jsxs(Ce,{isRTL:a,children:[l("Shared with"),": ",c.join(", ")]})})]})})},o.folderId)})})};export{ze as A,Re as B,W as F,Ae as S,De as a,Ne as b,_e as c};
