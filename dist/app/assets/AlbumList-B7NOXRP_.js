import{j as t,a as w,a5 as $,u as Z,a7 as _,c as te,p as oe,m as ne,g as ee,l,bN as ie,bO as z,bP as E,bQ as se,bR as R,h as re,bS as ae}from"./styled-components-C8WHyvoU.js";import{C as le,b as de,d as ce}from"./types-CsP4rZjx.js";const je=({searchQuery:o,setSearchQuery:y,t:f,isRTL:u})=>t.jsx("div",{style:{width:"100%",marginBottom:24,boxSizing:"border-box",direction:u?"rtl":"ltr"},children:t.jsx("input",{type:"text",placeholder:f("Search album title or description"),value:o,onChange:i=>y(i.target.value),style:{width:"100%",padding:"10px 16px",fontSize:"14px",border:"1px solid #ddd",borderRadius:"6px",outline:"none",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",boxSizing:"border-box"}})}),O=({src:o,alt:y,style:f,thumbnailDataKey:u,dataKey:i,bucketUrl:x=$,...b})=>{const[a,I]=w.useState(!1),[s,p]=w.useState(""),[L,j]=w.useState(!1);w.useEffect(()=>{I(!1);let e="",r=!1;u&&u.length>0?(e=`${x}${u}`,r=!0):i&&i.length>0?(e=`${x}${i}`,r=!0):o&&o.length>0&&(e=o,r=!0),p(e),j(r)},[u,i,o,x]);const C=()=>{I(!0)},v=e=>{console.error("Image load error:",e),u&&i&&u!==i&&s===`${x}${u}`?(console.log("Falling back to full image"),p(`${x}${i}`)):j(!1)};return L?t.jsx("img",{src:s,alt:y,style:{...f,opacity:a?1:.3,transition:"opacity 0.3s ease-in-out"},onLoad:C,onError:v,...b}):null},V=({folder:o,openFilePicker:y,cognitoUsername:f,updateProfileIds:u})=>{const{t:i,language:x}=Z(),b=ee(x)==="rtl",[a,I]=w.useState(!1),[s,p]=w.useState(!1),[L,j]=w.useState(o.profileIds||[]),C=f?`${f}_____Public____Profile`:"",v=L.includes(C),e=_(o.folderId,o.albumNanoId,o.creatorId&&o.contacts&&o.contacts[o.creatorId]?o.contacts[o.creatorId]:"album",o.folderName);w.useEffect(()=>{j(o.profileIds||[])},[o.profileIds]);const r=d=>{navigator.clipboard.writeText(d).then(()=>{I(!1),p(!0)}).catch(P=>{console.error("Failed to copy link:",P),alert(i("Failed to copy link"))})},g=async d=>{if(d.preventDefault(),d.stopPropagation(),!await te()){alert(i("You must be logged in to download photos"));return}if(o&&o.files&&o.files.length>0){const k=o.files.map((c,N)=>{const F=c.dataKey.toLowerCase().endsWith(".mp4")?"video":"image";return{url:`${$}${c.dataKey}`,thumbnailUrl:c.thumbnailDataKey?`${$}${c.thumbnailDataKey}`:void 0,type:F,index:N,id:`file-${N}`,fileId:c.dataKey,loaded:!1}}),S={mediaItems:k,folderName:o.folderName||"Album"};ce(S,i,c=>{window.open(k[c].url,"_blank")})}else alert(i("No items to download"))},m=async d=>{var P,k,S;if(d.preventDefault(),d.stopPropagation(),!f){alert(i("You must be logged in to perform this action"));return}try{const n=await oe();if(!n){console.error("Authentication failed");return}const c=[...L];if(v){const T=c.indexOf(C);T>-1&&c.splice(T,1)}else c.push(C);const D=await(await fetch(ne,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({query:`
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
      `,variables:{folderPositionChangeProfileIdsInput:{folderId:o.folderId,profileIds:c}}})})).json();if(D.errors)throw new Error(((P=D.errors[0])==null?void 0:P.message)||"Unknown error");const A=(((S=(k=D==null?void 0:D.data)==null?void 0:k.changeFiles)==null?void 0:S.items)||[]).find(T=>T.id===o.folderPositionId);A&&A.profileIds&&(j(A.profileIds),u&&u(A.profileIds),console.log("Album visibility updated successfully"))}catch(n){console.error("Failed to toggle album visibility:",n),alert(i("Failed to update album visibility. Please try again."))}},h={padding:"8px 12px",border:"none",borderRadius:6,cursor:"pointer",fontSize:14,textAlign:"center",whiteSpace:"nowrap",flexShrink:0};return t.jsx(t.Fragment,{children:t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:16,flexDirection:b?"row-reverse":"row"},children:[t.jsx("div",{style:{display:"flex",width:"100%",overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none",WebkitOverflowScrolling:"touch",flexDirection:b?"row-reverse":"row",gap:"10px"},children:t.jsxs("div",{style:{display:"flex",gap:"10px",flexDirection:b?"row-reverse":"row"},children:[y&&t.jsx("button",{onClick:d=>{d.preventDefault(),d.stopPropagation(),y(o.folderId)},style:{...h,backgroundColor:"#4caf50",color:"white"},children:i("Add Photos")}),t.jsx("button",{onClick:g,style:{...h,backgroundColor:"#e0e0e0"},children:i("Download")}),t.jsx("button",{onClick:d=>{d.preventDefault(),d.stopPropagation(),I(!0)},style:{...h,backgroundColor:"#e0e0e0"},children:i("Copy Link")}),t.jsx("button",{onClick:m,style:{...h,backgroundColor:v?"#4caf50":"#e0e0e0",color:v?"white":"inherit"},children:i(v?"On Public Profile":"Not On Public Profile")})]})}),t.jsx(le,{isOpen:a,onClose:()=>I(!1),inviteLink:e,onCopy:r,t:i,isRTL:b}),t.jsx(de,{isOpen:s,onClose:()=>p(!1),t:i,isRTL:b}),t.jsx("style",{children:`
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
`,pe=l.div`
  display: flex;
  flex-direction: column;
  align-items: ${o=>o.isRTL?"flex-start":"flex-end"};
  justify-content: flex-end;
  gap: 8px;
`,ue=l.div`
  position: relative;
`,he=l.a`
  font-size: 13px;
  color: #2196f3;
  text-decoration: none;
`,xe=l.a`
  font-size: 13px;
  color: #d32f2f;
  text-decoration: none;
`,ge=l.div`
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
`,Y=l.div`
  width: 100%;
  position: relative;
`,q=l.div`
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding-bottom: 8px;
  ms-overflow-style: none;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
  max-width: 100%;
  flex-direction: ${o=>o.isRTL?"row-reverse":"row"};
`,J=l.div`
  position: absolute;
  ${o=>o.isRTL?"left":"right"}: 0;
  top: 0;
  bottom: 8px;
  width: 30px;
  background: ${o=>o.isRTL?"linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))":"linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))"};
  pointer-events: none;
`,X=l.div`
  display: flex;
  justify-content: ${o=>o.isRTL?"flex-start":"flex-end"};
  margin-top: 8px;
  margin-bottom: 8px;
`,fe=l.div`
  width: 100%;
  background-color: #f0f7ff;
  border-radius: 8px;
  padding: 12px 16px;
  margin-top: 16px;
  box-sizing: border-box;
  border: 1px solid #d0e1f9;
  direction: ${o=>o.isRTL?"rtl":"ltr"};
`,be=l.p`
  margin: 0;
  font-size: 14px;
  color: #333;
  text-align: ${o=>o.isRTL?"right":"left"};
`,U=l.div`
  width: 160px;
  height: 100px;
  flex-shrink: 0;
`,ve=({folders:o,setFolders:y,handleDeleteClick:f,openFilePicker:u,isUploading:i=!1,cognitoUsername:x,isProfileView:b=!1})=>{const{t:a,language:I}=Z(),s=ee(I)==="rtl",p=w.useRef(null);w.useEffect(()=>{function e(){p.current&&(p.current.style.display="none",p.current=null)}function r(){e()}return window.addEventListener("scroll",r,!0),()=>{window.removeEventListener("scroll",r,!0)}},[]);const L=(e,r)=>{e.preventDefault(),e.stopPropagation(),p.current&&p.current!==r&&(p.current.style.display="none");const g=r.style.display==="block";r.style.display=g?"none":"block",p.current=g?null:r},j=e=>{p.current&&(p.current.style.display="none",p.current=null),window.confirm(a("Are you sure you want to delete this album? This action cannot be undone."))&&f&&f(e,a)},C=(e,r)=>{y&&y(g=>g.map(m=>m.folderId===e?{...m,profileIds:r}:m))},v=e=>{switch(e){case"NotVisible":return a("Hidden");case"Watermark":return a("Watermarked");case"CannotBeSaved":return a("Cannot be saved");case"NoPassword":default:return a("No password")}};return o.length===0&&!i?t.jsx(ie,{type:"empty",children:t.jsx("p",{children:a("No albums found")})}):b?t.jsx(t.Fragment,{children:o.map(e=>{var m;const r=((m=e.folderPassword)==null?void 0:m.policy)||"NoPassword",g=_(e.folderId,e.albumNanoId||null,e.creatorId&&e.contacts&&e.contacts[e.creatorId],e.folderName);return t.jsx(W,{isRTL:s,children:t.jsx(B,{href:g,children:t.jsxs(K,{children:[t.jsx(M,{isRTL:s,children:t.jsx(G,{isRTL:s,children:t.jsx(H,{children:e.folderName||""})})}),e.folderDescription&&e.folderDescription.length>1&&t.jsx(z,{isRTL:s,children:e.folderDescription}),t.jsxs(Y,{children:[t.jsx(q,{isRTL:s,children:e.files.map((h,d)=>t.jsx(U,{children:t.jsx(O,{thumbnailDataKey:h.thumbnailDataKey,dataKey:h.dataKey,src:`${$}${h.thumbnailDataKey||h.dataKey}`,alt:a("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},d))}),e.files.length>3&&t.jsx(J,{isRTL:s})]}),t.jsx(X,{isRTL:s,children:r!=="NoPassword"&&t.jsx(E,{children:t.jsx("span",{children:v(r)})})})]})})},e.folderId)})}):t.jsx(t.Fragment,{children:o.map(e=>{var S;const r=e.createdAt!=null,g=e.updatedAt!=null&&e.createdAt!=null&&e.updatedAt!==e.createdAt,m=e.creatorId===`${x}_____${x}____Account`,h=((S=e.folderPassword)==null?void 0:S.policy)||"NoPassword",d=e.contacts||{},P=Object.values(d).filter(n=>n&&typeof n=="string"&&!n.toString().startsWith("Profile-")),k=_(e.folderId,e.albumNanoId||null,e.creatorId&&e.contacts&&e.contacts[e.creatorId],e.folderName);return t.jsx(W,{isRTL:s,children:t.jsx(B,{href:k,children:t.jsxs(K,{children:[t.jsxs(M,{isRTL:s,children:[t.jsxs(G,{isRTL:s,children:[t.jsx(H,{children:e.folderName||""}),(r||g)&&t.jsxs(se,{isRTL:s,children:[r&&e.createdAt&&R(e.createdAt)&&t.jsxs("div",{children:[a("Created"),": ",R(e.createdAt)]}),g&&e.updatedAt&&R(e.updatedAt)&&t.jsxs("div",{children:[a("Updated"),": ",R(e.updatedAt)]})]})]}),t.jsx(pe,{isRTL:s,children:m?t.jsxs(ue,{children:[t.jsx(he,{href:"#",onClick:n=>{const c=n.currentTarget.nextElementSibling;c&&L(n,c)},children:a("Edit")}),t.jsxs(ge,{isRTL:s,onClick:n=>{n.stopPropagation()},children:[t.jsx(Q,{href:re(`save-album.html?folderId=${encodeURIComponent(e.folderId)}`),onClick:n=>{n.stopPropagation()},children:a("Edit Details")}),t.jsx(Q,{href:"#",isDelete:!0,onClick:n=>{n.preventDefault(),n.stopPropagation(),j(e.folderPositionId)},children:a("Delete My Copy")})]})]}):t.jsx(xe,{href:"#",onClick:n=>{n.preventDefault(),n.stopPropagation(),j(e.folderPositionId)},children:a("Delete")})})]}),e.folderDescription&&e.folderDescription.length>1&&t.jsx(z,{isRTL:s,children:e.folderDescription}),t.jsx(ae,{isRTL:s,children:e.files.length===1?a("{count} file").replace("{count}",e.files.length.toString()):a("{count} files").replace("{count}",e.files.length.toString())}),t.jsxs(Y,{children:[t.jsx(q,{isRTL:s,children:e.files.map((n,c)=>t.jsx(U,{children:t.jsx(O,{thumbnailDataKey:n.thumbnailDataKey,dataKey:n.dataKey,src:`${$}${n.thumbnailDataKey||n.dataKey}`,alt:a("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},c))}),e.files.length>3&&t.jsx(J,{isRTL:s})]}),t.jsx(X,{isRTL:s,children:h!=="NoPassword"&&t.jsx(E,{children:t.jsx("span",{children:v(h)})})}),b==!1&&V&&t.jsx(V,{folder:e,openFilePicker:u,cognitoUsername:x,updateProfileIds:n=>C(e.folderId,n)}),P.length>0&&t.jsx(fe,{isRTL:s,children:t.jsxs(be,{isRTL:s,children:[a("Shared with"),": ",P.join(", ")]})})]})})},e.folderId)})})};export{ve as A,je as S};
