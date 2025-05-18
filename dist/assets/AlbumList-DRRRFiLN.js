import{j as e,r as w,X as $,u as U,i as te,g as ee,d as l,br as oe,bs as z,bt as E,bu as ie}from"./styled-components-Bdgp8EQy.js";import{n as _,c as ne,b as se,v as R}from"./utils-BdaD-hP1.js";import{C as re,b as ae,d as le}from"./types-Dp6gM866.js";const ye=({searchQuery:o,setSearchQuery:y,t:g,isRTL:u})=>e.jsx("div",{style:{width:"100%",marginBottom:24,boxSizing:"border-box",direction:u?"rtl":"ltr"},children:e.jsx("input",{type:"text",placeholder:g("Search album title or description"),value:o,onChange:n=>y(n.target.value),style:{width:"100%",padding:"10px 16px",fontSize:"14px",border:"1px solid #ddd",borderRadius:"6px",outline:"none",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",boxSizing:"border-box"}})}),O=({src:o,alt:y,style:g,thumbnailDataKey:u,dataKey:n,bucketUrl:x=$,...b})=>{const[a,P]=w.useState(!1),[s,p]=w.useState(""),[S,j]=w.useState(!1);w.useEffect(()=>{P(!1);let t="",r=!1;u&&u.length>0?(t=`${x}${u}`,r=!0):n&&n.length>0?(t=`${x}${n}`,r=!0):o&&o.length>0&&(t=o,r=!0),p(t),j(r)},[u,n,o,x]);const C=()=>{P(!0)},v=t=>{console.error("Image load error:",t),u&&n&&u!==n&&s===`${x}${u}`?(console.log("Falling back to full image"),p(`${x}${n}`)):j(!1)};return S?e.jsx("img",{src:s,alt:y,style:{...g,opacity:a?1:.3,transition:"opacity 0.3s ease-in-out"},onLoad:C,onError:v,...b}):null},V=({folder:o,openFilePicker:y,cognitoUsername:g,updateProfileIds:u})=>{const{t:n,language:x}=U(),b=ee(x)==="rtl",[a,P]=w.useState(!1),[s,p]=w.useState(!1),[S,j]=w.useState(o.profileIds||[]),C=g?`${g}_____Public____Profile`:"",v=S.includes(C),t=_(o.folderId,o.albumNanoId,o.folderName);w.useEffect(()=>{j(o.profileIds||[])},[o.profileIds]);const r=d=>{navigator.clipboard.writeText(d).then(()=>{P(!1),p(!0)}).catch(I=>{console.error("Failed to copy link:",I),alert(n("Failed to copy link"))})},f=async d=>{if(d.preventDefault(),d.stopPropagation(),!await ne()){alert(n("You must be logged in to download photos"));return}if(o&&o.files&&o.files.length>0){const k=o.files.map((c,N)=>{const F=c.dataKey.toLowerCase().endsWith(".mp4")?"video":"image";return{url:`${$}${c.dataKey}`,thumbnailUrl:c.thumbnailDataKey?`${$}${c.thumbnailDataKey}`:void 0,type:F,index:N,id:`file-${N}`,fileId:c.dataKey,loaded:!1}}),L={mediaItems:k,folderName:o.folderName||"Album"};le(L,n,c=>{window.open(k[c].url,"_blank")})}else alert(n("No items to download"))},m=async d=>{var I,k,L;if(d.preventDefault(),d.stopPropagation(),!g){alert(n("You must be logged in to perform this action"));return}try{const i=await se();if(!i){console.error("Authentication failed");return}const c=[...S];if(v){const T=c.indexOf(C);T>-1&&c.splice(T,1)}else c.push(C);const D=await(await fetch(te,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({query:`
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
      `,variables:{folderPositionChangeProfileIdsInput:{folderId:o.folderId,profileIds:c}}})})).json();if(D.errors)throw new Error(((I=D.errors[0])==null?void 0:I.message)||"Unknown error");const A=(((L=(k=D==null?void 0:D.data)==null?void 0:k.changeFiles)==null?void 0:L.items)||[]).find(T=>T.id===o.folderPositionId);A&&A.profileIds&&(j(A.profileIds),u&&u(A.profileIds),console.log("Album visibility updated successfully"))}catch(i){console.error("Failed to toggle album visibility:",i),alert(n("Failed to update album visibility. Please try again."))}},h={padding:"8px 12px",border:"none",borderRadius:6,cursor:"pointer",fontSize:14,textAlign:"center",whiteSpace:"nowrap",flexShrink:0};return e.jsx(e.Fragment,{children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:16,flexDirection:b?"row-reverse":"row"},children:[e.jsx("div",{style:{display:"flex",width:"100%",overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none",WebkitOverflowScrolling:"touch",flexDirection:b?"row-reverse":"row",gap:"10px"},children:e.jsxs("div",{style:{display:"flex",gap:"10px",flexDirection:b?"row-reverse":"row"},children:[y&&e.jsx("button",{onClick:d=>{d.preventDefault(),d.stopPropagation(),y(o.folderId)},style:{...h,backgroundColor:"#4caf50",color:"white"},children:n("Add Photos")}),e.jsx("button",{onClick:f,style:{...h,backgroundColor:"#e0e0e0"},children:n("Download")}),e.jsx("button",{onClick:d=>{d.preventDefault(),d.stopPropagation(),P(!0)},style:{...h,backgroundColor:"#e0e0e0"},children:n("Copy Link")}),e.jsx("button",{onClick:m,style:{...h,backgroundColor:v?"#4caf50":"#e0e0e0",color:v?"white":"inherit"},children:n(v?"On Public Profile":"Not On Public Profile")})]})}),e.jsx(re,{isOpen:a,onClose:()=>P(!1),inviteLink:t,onCopy:r,t:n,isRTL:b}),e.jsx(ae,{isOpen:s,onClose:()=>p(!1),t:n,isRTL:b}),e.jsx("style",{children:`
            div::-webkit-scrollbar {
              display: none;
            }
          `})]})})},W=l.div`
  margin-bottom: 30px;
  width: 100%;
  direction: ${o=>o.isRTL?"rtl":"ltr"};
`,B=l.a`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  overflow: hidden;
`,K=l.div`
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
`,M=l.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
  flex-direction: ${o=>o.isRTL?"row-reverse":"row"};
`,G=l.div`
  display: flex;
  flex-direction: column;
  align-items: ${o=>o.isRTL?"flex-end":"flex-start"};
`,H=l.h2`
  font-size: 20px;
  margin: 0;
  color: #222;
`,de=l.div`
  display: flex;
  flex-direction: column;
  align-items: ${o=>o.isRTL?"flex-start":"flex-end"};
  justify-content: flex-end;
  gap: 8px;
`,ce=l.div`
  position: relative;
`,pe=l.a`
  font-size: 13px;
  color: #2196f3;
  text-decoration: none;
`,ue=l.a`
  font-size: 13px;
  color: #d32f2f;
  text-decoration: none;
`,he=l.div`
  display: none;
  position: absolute;
  top: 100%;
  right: ${o=>o.isRTL?"auto":0};
  left: ${o=>o.isRTL?0:"auto"};
  background-color: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-radius: 4px;
  z-index: 10;
  min-width: 150px;
  padding: 8px 0;
  margin-top: 5px;
  text-align: ${o=>o.isRTL?"right":"left"};
`,Q=l.a`
  display: block;
  padding: 8px 16px;
  color: ${o=>o.isDelete?"#d32f2f":"#2196f3"};
  text-decoration: none;
  font-size: 13px;
  white-space: nowrap;
`,X=l.div`
  width: 100%;
  position: relative;
`,Y=l.div`
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding-bottom: 8px;
  ms-overflow-style: none;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
  max-width: 100%;
  flex-direction: ${o=>o.isRTL?"row-reverse":"row"};
`,q=l.div`
  position: absolute;
  ${o=>o.isRTL?"left":"right"}: 0;
  top: 0;
  bottom: 8px;
  width: 30px;
  background: ${o=>o.isRTL?"linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))":"linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))"};
  pointer-events: none;
`,J=l.div`
  display: flex;
  justify-content: ${o=>o.isRTL?"flex-start":"flex-end"};
  margin-top: 8px;
  margin-bottom: 8px;
`,xe=l.div`
  width: 100%;
  background-color: #f0f7ff;
  border-radius: 8px;
  padding: 12px 16px;
  margin-top: 16px;
  box-sizing: border-box;
  border: 1px solid #d0e1f9;
  direction: ${o=>o.isRTL?"rtl":"ltr"};
`,fe=l.p`
  margin: 0;
  font-size: 14px;
  color: #333;
  text-align: ${o=>o.isRTL?"right":"left"};
`,Z=l.div`
  width: 160px;
  height: 100px;
  flex-shrink: 0;
`,je=({folders:o,setFolders:y,handleDeleteClick:g,openFilePicker:u,isUploading:n=!1,cognitoUsername:x,isProfileView:b=!1})=>{const{t:a,language:P}=U(),s=ee(P)==="rtl",p=w.useRef(null);w.useEffect(()=>{function t(){p.current&&(p.current.style.display="none",p.current=null)}function r(){t()}return window.addEventListener("scroll",r,!0),()=>{window.removeEventListener("scroll",r,!0)}},[]);const S=(t,r)=>{t.preventDefault(),t.stopPropagation(),p.current&&p.current!==r&&(p.current.style.display="none");const f=r.style.display==="block";r.style.display=f?"none":"block",p.current=f?null:r},j=t=>{p.current&&(p.current.style.display="none",p.current=null),window.confirm(a("Are you sure you want to delete this album? This action cannot be undone."))&&g&&g(t,a)},C=(t,r)=>{y&&y(f=>f.map(m=>m.folderId===t?{...m,profileIds:r}:m))},v=t=>{switch(t){case"NotVisible":return a("Hidden");case"Watermark":return a("Watermarked");case"CannotBeSaved":return a("Cannot be saved");case"NoPassword":default:return a("No password")}};return o.length===0&&!n?e.jsx(oe,{type:"empty",children:e.jsx("p",{children:a("No albums found")})}):b?e.jsx(e.Fragment,{children:o.map(t=>{var m;const r=((m=t.folderPassword)==null?void 0:m.policy)||"NoPassword",f=_(t.folderId,t.albumNanoId||null,t.folderName);return e.jsx(W,{isRTL:s,children:e.jsx(B,{href:f,children:e.jsxs(K,{children:[e.jsx(M,{isRTL:s,children:e.jsx(G,{isRTL:s,children:e.jsx(H,{children:t.folderName||""})})}),t.folderDescription&&t.folderDescription.length>1&&e.jsx(z,{isRTL:s,children:t.folderDescription}),e.jsxs(X,{children:[e.jsx(Y,{isRTL:s,children:t.files.map((h,d)=>e.jsx(Z,{children:e.jsx(O,{thumbnailDataKey:h.thumbnailDataKey,dataKey:h.dataKey,src:`${$}${h.thumbnailDataKey||h.dataKey}`,alt:a("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},d))}),t.files.length>3&&e.jsx(q,{isRTL:s})]}),e.jsx(J,{isRTL:s,children:r!=="NoPassword"&&e.jsx(E,{children:e.jsx("span",{children:v(r)})})})]})})},t.folderId)})}):e.jsx(e.Fragment,{children:o.map(t=>{var L;const r=t.createdAt!=null,f=t.updatedAt!=null&&t.createdAt!=null&&t.updatedAt!==t.createdAt,m=t.creatorId===`${x}_____${x}____Account`,h=((L=t.folderPassword)==null?void 0:L.policy)||"NoPassword",d=t.contacts||{},I=Object.values(d).filter(i=>i&&typeof i=="string"&&!i.toString().startsWith("Profile-")),k=_(t.folderId,t.albumNanoId||null,t.folderName);return e.jsx(W,{isRTL:s,children:e.jsx(B,{href:k,children:e.jsxs(K,{children:[e.jsxs(M,{isRTL:s,children:[e.jsxs(G,{isRTL:s,children:[e.jsx(H,{children:t.folderName||""}),(r||f)&&e.jsxs(ie,{isRTL:s,children:[r&&t.createdAt&&R(t.createdAt)&&e.jsxs("div",{children:[a("Created"),": ",R(t.createdAt)]}),f&&t.updatedAt&&R(t.updatedAt)&&e.jsxs("div",{children:[a("Updated"),": ",R(t.updatedAt)]})]})]}),e.jsx(de,{isRTL:s,children:m?e.jsxs(ce,{children:[e.jsx(pe,{href:"#",onClick:i=>{const c=i.currentTarget.nextElementSibling;c&&S(i,c)},children:a("Edit")}),e.jsxs(he,{isRTL:s,onClick:i=>{i.stopPropagation()},children:[e.jsx(Q,{href:`/save-album.html?folderId=${encodeURIComponent(t.folderId)}`,onClick:i=>{i.stopPropagation()},children:a("Edit Details")}),e.jsx(Q,{href:"#",isDelete:!0,onClick:i=>{i.preventDefault(),i.stopPropagation(),j(t.folderPositionId)},children:a("Delete My Copy")})]})]}):e.jsx(ue,{href:"#",onClick:i=>{i.preventDefault(),i.stopPropagation(),j(t.folderPositionId)},children:a("Delete")})})]}),t.folderDescription&&t.folderDescription.length>1&&e.jsx(z,{isRTL:s,children:t.folderDescription}),e.jsxs(X,{children:[e.jsx(Y,{isRTL:s,children:t.files.map((i,c)=>e.jsx(Z,{children:e.jsx(O,{thumbnailDataKey:i.thumbnailDataKey,dataKey:i.dataKey,src:`${$}${i.thumbnailDataKey||i.dataKey}`,alt:a("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},c))}),t.files.length>3&&e.jsx(q,{isRTL:s})]}),e.jsx(J,{isRTL:s,children:h!=="NoPassword"&&e.jsx(E,{children:e.jsx("span",{children:v(h)})})}),b==!1&&V&&e.jsx(V,{folder:t,openFilePicker:u,cognitoUsername:x,updateProfileIds:i=>C(t.folderId,i)}),I.length>0&&e.jsx(xe,{isRTL:s,children:e.jsxs(fe,{isRTL:s,children:[a("Shared with"),": ",I.join(", ")]})})]})})},t.folderId)})})};export{je as A,ye as S};
