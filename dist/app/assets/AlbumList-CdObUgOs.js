import{j as o,r as w,S as A,u as ee,t as _,c as oe,h as ne,f as ie,g as te,d as l,F as N,b as se}from"./utils-D99WuR6c.js";import{C as re,b as ae,d as le}from"./types-BmQezC3u.js";import{at as ce,au as z,av as E,aw as de,ax as pe}from"./styled-components-zBaijokq.js";const Pe=({searchQuery:t,setSearchQuery:u,t:h,isRTL:c})=>o.jsx("div",{style:{width:"100%",marginBottom:24,boxSizing:"border-box",direction:c?"rtl":"ltr"},children:o.jsx("input",{type:"text",placeholder:h("Search album title or description"),value:t,onChange:i=>u(i.target.value),style:{width:"100%",padding:"10px 16px",fontSize:"14px",border:"1px solid #ddd",borderRadius:"6px",outline:"none",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",boxSizing:"border-box"}})}),B=({src:t,alt:u,style:h,thumbnailDataKey:c,dataKey:i,bucketUrl:g=A,...b})=>{const[a,v]=w.useState(!1),[s,p]=w.useState(""),[$,y]=w.useState(!1);w.useEffect(()=>{v(!1);let e="",r=!1;c&&c.length>0?(e=`${g}${c}`,r=!0):i&&i.length>0?(e=`${g}${i}`,r=!0):t&&t.length>0&&(e=t,r=!0),p(e),y(r)},[c,i,t,g]);const S=()=>{v(!0)},j=e=>{console.error("Image load error:",e),c&&i&&c!==i&&s===`${g}${c}`?(console.log("Falling back to full image"),p(`${g}${i}`)):y(!1)};return $?o.jsx("img",{src:s,alt:u,style:{...h,opacity:a?1:.3,transition:"opacity 0.3s ease-in-out"},onLoad:S,onError:j,...b}):null},O=({folder:t,openFilePicker:u,cognitoUsername:h,updateProfileIds:c})=>{const{t:i,language:g}=ee(),b=te(g)==="rtl",[a,v]=w.useState(!1),[s,p]=w.useState(!1),[$,y]=w.useState(t.profileIds||[]),S=h?`${h}_____Public____Profile`:"",j=$.includes(S),e=_(t.folderId,t.albumNanoId,t.creatorId&&t.contacts&&t.contacts[t.creatorId]?t.contacts[t.creatorId]:"album",t.folderName);w.useEffect(()=>{y(t.profileIds||[])},[t.profileIds]);const r=d=>{navigator.clipboard.writeText(d).then(()=>{v(!1),p(!0)}).catch(I=>{console.error("Failed to copy link:",I),alert(i("Failed to copy link"))})},f=async d=>{if(d.preventDefault(),d.stopPropagation(),!await oe()){alert(i("You must be logged in to download photos"));return}if(t&&t.files&&t.files.length>0){const P=t.files.map((n,k)=>{const F=n.dataKey.toLowerCase().endsWith(".mp4")?"video":"image";return{url:`${A}${n.dataKey}`,thumbnailUrl:n.thumbnailDataKey?`${A}${n.thumbnailDataKey}`:void 0,type:F,index:k,id:`file-${k}`,fileId:n.dataKey,loaded:!1}}),L={mediaItems:P,folderName:t.folderName||"Album"};le(L,i,n=>{window.open(P[n].url,"_blank")})}else alert(i("No items to download"))},m=async d=>{var I,P,L;if(d.preventDefault(),d.stopPropagation(),!h){alert(i("You must be logged in to perform this action"));return}try{const C=await ne();if(!C){console.error("Authentication failed");return}const n=[...$];if(j){const R=n.indexOf(S);R>-1&&n.splice(R,1)}else n.push(S);const D=await(await fetch(ie,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${C}`},body:JSON.stringify({query:`
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
      `,variables:{folderPositionChangeProfileIdsInput:{folderId:t.folderId,profileIds:n}}})})).json();if(D.errors)throw new Error(((I=D.errors[0])==null?void 0:I.message)||"Unknown error");const T=(((L=(P=D==null?void 0:D.data)==null?void 0:P.changeFiles)==null?void 0:L.items)||[]).find(R=>R.id===t.folderPositionId);T&&T.profileIds&&(y(T.profileIds),c&&c(T.profileIds),console.log("Album visibility updated successfully"))}catch(C){console.error("Failed to toggle album visibility:",C),alert(i("Failed to update album visibility. Please try again."))}},x={padding:"8px 12px",border:"none",borderRadius:6,cursor:"pointer",fontSize:14,textAlign:"center",whiteSpace:"nowrap",flexShrink:0};return o.jsx(o.Fragment,{children:o.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:16,flexDirection:b?"row-reverse":"row"},children:[o.jsx("div",{style:{display:"flex",width:"100%",overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none",WebkitOverflowScrolling:"touch",flexDirection:b?"row-reverse":"row",gap:"10px"},children:o.jsxs("div",{style:{display:"flex",gap:"10px",flexDirection:b?"row-reverse":"row"},children:[u&&o.jsx("button",{onClick:d=>{d.preventDefault(),d.stopPropagation(),u(t.folderId)},style:{...x,backgroundColor:"#4caf50",color:"white"},children:i("Add Photos")}),o.jsx("button",{onClick:f,style:{...x,backgroundColor:"#e0e0e0"},children:i("Download")}),o.jsx("button",{onClick:d=>{d.preventDefault(),d.stopPropagation(),v(!0)},style:{...x,backgroundColor:"#e0e0e0"},children:i("Copy Link")}),o.jsx("button",{onClick:m,style:{...x,backgroundColor:j?"#4caf50":"#e0e0e0",color:j?"white":"inherit"},children:i(j?"On Public Profile":"Not On Public Profile")})]})}),o.jsx(re,{isOpen:a,onClose:()=>v(!1),inviteLink:e,onCopy:r,t:i,isRTL:b}),o.jsx(ae,{isOpen:s,onClose:()=>p(!1),t:i,isRTL:b}),o.jsx("style",{children:`
            div::-webkit-scrollbar {
              display: none;
            }
          `})]})})},M=t=>{if(t===0)return"0 B";const u=1024,h=["B","KB","MB","GB","TB"],c=Math.floor(Math.log(t)/Math.log(u));return`${Math.round(t/Math.pow(u,c)*100)/100} ${h[c]}`},ue=t=>t.reduce((u,h)=>u+(h.dataInBytes||0),0),V=l.div`
  margin-bottom: 30px;
  width: 100%;
  direction: ${t=>t.isRTL?"rtl":"ltr"};
`,W=l.a`
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
`,G=l.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
  flex-direction: ${t=>t.isRTL?"row-reverse":"row"};
`,H=l.div`
  display: flex;
  flex-direction: column;
  align-items: ${t=>t.isRTL?"flex-end":"flex-start"};
`,Q=l.h2`
  font-size: 20px;
  margin: 0;
  color: #222;
`,he=l.div`
  display: flex;
  flex-direction: column;
  align-items: ${t=>t.isRTL?"flex-start":"flex-end"};
  justify-content: flex-end;
  gap: 8px;
`,xe=l.div`
  position: relative;
`,ge=l.a`
  font-size: 13px;
  color: #2196f3;
  text-decoration: none;
`,fe=l.a`
  font-size: 13px;
  color: #d32f2f;
  text-decoration: none;
`,be=l.div`
  display: none;
  position: absolute;
  top: 100%;
  right: ${t=>t.isRTL?"auto":0};
  left: ${t=>t.isRTL?0:"auto"};
  background-color: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-radius: 4px;
  z-index: 10;
  min-width: 150px;
  padding: 8px 0;
  margin-top: 5px;
  text-align: ${t=>t.isRTL?"right":"left"};
`,Y=l.a`
  display: block;
  padding: 8px 16px;
  color: ${t=>t.isDelete?"#d32f2f":"#2196f3"};
  text-decoration: none;
  font-size: 13px;
  white-space: nowrap;
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
  flex-direction: ${t=>t.isRTL?"row-reverse":"row"};
`,X=l.div`
  position: absolute;
  ${t=>t.isRTL?"left":"right"}: 0;
  top: 0;
  bottom: 8px;
  width: 30px;
  background: ${t=>t.isRTL?"linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))":"linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))"};
  pointer-events: none;
`,U=l.div`
  display: flex;
  justify-content: ${t=>t.isRTL?"flex-start":"flex-end"};
  margin-top: 8px;
  margin-bottom: 8px;
`,me=l.div`
  width: 100%;
  background-color: #f0f7ff;
  border-radius: 8px;
  padding: 12px 16px;
  margin-top: 16px;
  box-sizing: border-box;
  border: 1px solid #d0e1f9;
  direction: ${t=>t.isRTL?"rtl":"ltr"};
`,we=l.p`
  margin: 0;
  font-size: 14px;
  color: #333;
  text-align: ${t=>t.isRTL?"right":"left"};
`,Z=l.div`
  width: 160px;
  height: 100px;
  flex-shrink: 0;
`,Ce=({folders:t,setFolders:u,handleDeleteClick:h,openFilePicker:c,isUploading:i=!1,cognitoUsername:g,isProfileView:b=!1})=>{const{t:a,language:v}=ee(),s=te(v)==="rtl",p=w.useRef(null);w.useEffect(()=>{function e(){p.current&&(p.current.style.display="none",p.current=null)}function r(){e()}return window.addEventListener("scroll",r,!0),()=>{window.removeEventListener("scroll",r,!0)}},[]);const $=(e,r)=>{e.preventDefault(),e.stopPropagation(),p.current&&p.current!==r&&(p.current.style.display="none");const f=r.style.display==="block";r.style.display=f?"none":"block",p.current=f?null:r},y=e=>{p.current&&(p.current.style.display="none",p.current=null),window.confirm(a("Are you sure you want to delete this album? This action cannot be undone."))&&h&&h(e,a)},S=(e,r)=>{u&&u(f=>f.map(m=>m.folderId===e?{...m,profileIds:r}:m))},j=e=>{switch(e){case"NotVisible":return a("Hidden");case"Watermark":return a("Watermarked");case"CannotBeSaved":return a("Cannot be saved");case"NoPassword":default:return a("No password")}};return t.length===0&&!i?o.jsx(ce,{type:"empty",children:o.jsx("p",{children:a("No albums found")})}):b?o.jsx(o.Fragment,{children:t.map(e=>{var m;const r=((m=e.folderPassword)==null?void 0:m.policy)||"NoPassword",f=_(e.folderId,e.albumNanoId||null,e.creatorId&&e.contacts&&e.contacts[e.creatorId],e.folderName);return o.jsx(V,{isRTL:s,children:o.jsx(W,{href:f,children:o.jsxs(K,{children:[o.jsx(G,{isRTL:s,children:o.jsx(H,{isRTL:s,children:o.jsx(Q,{children:e.folderName||""})})}),e.folderDescription&&e.folderDescription.length>1&&o.jsx(z,{isRTL:s,children:e.folderDescription}),o.jsxs(q,{children:[o.jsx(J,{isRTL:s,children:e.files.map((x,d)=>o.jsx(Z,{children:o.jsx(B,{thumbnailDataKey:x.thumbnailDataKey,dataKey:x.dataKey,src:`${A}${x.thumbnailDataKey||x.dataKey}`,alt:a("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},d))}),e.files.length>3&&o.jsx(X,{isRTL:s})]}),o.jsx(U,{isRTL:s,children:r!=="NoPassword"&&o.jsx(E,{children:o.jsx("span",{children:j(r)})})})]})})},e.folderId)})}):o.jsx(o.Fragment,{children:t.map(e=>{var C;const r=e.createdAt!=null,f=e.updatedAt!=null&&e.createdAt!=null&&e.updatedAt!==e.createdAt,m=e.creatorId===`${g}_____${g}____Account`,x=((C=e.folderPassword)==null?void 0:C.policy)||"NoPassword",d=e.contacts||{},I=Object.values(d).filter(n=>n&&typeof n=="string"&&!n.toString().startsWith("Profile-")),P=ue(e.files),L=_(e.folderId,e.albumNanoId||null,e.creatorId&&e.contacts&&e.contacts[e.creatorId],e.folderName);return o.jsx(V,{isRTL:s,children:o.jsx(W,{href:L,children:o.jsxs(K,{children:[o.jsxs(G,{isRTL:s,children:[o.jsxs(H,{isRTL:s,children:[o.jsx(Q,{children:e.folderName||""}),(r||f)&&o.jsxs(de,{isRTL:s,children:[r&&e.createdAt&&N(e.createdAt)&&o.jsxs("div",{children:[a("Created"),": ",N(e.createdAt)]}),f&&e.updatedAt&&N(e.updatedAt)&&o.jsxs("div",{children:[a("Updated"),": ",N(e.updatedAt)]})]})]}),o.jsx(he,{isRTL:s,children:m?o.jsxs(xe,{children:[o.jsx(ge,{href:"#",onClick:n=>{const k=n.currentTarget.nextElementSibling;k&&$(n,k)},children:a("Edit")}),o.jsxs(be,{isRTL:s,onClick:n=>{n.stopPropagation()},children:[o.jsx(Y,{href:se(`save-album.html?folderId=${encodeURIComponent(e.folderId)}`),onClick:n=>{n.stopPropagation()},children:a("Edit Details")}),o.jsx(Y,{href:"#",isDelete:!0,onClick:n=>{n.preventDefault(),n.stopPropagation(),y(e.folderPositionId)},children:a("Delete My Copy")})]})]}):o.jsx(fe,{href:"#",onClick:n=>{n.preventDefault(),n.stopPropagation(),y(e.folderPositionId)},children:a("Delete")})})]}),e.folderDescription&&e.folderDescription.length>1&&o.jsx(z,{isRTL:s,children:e.folderDescription}),o.jsx(pe,{isRTL:s,children:e.files.length===1?`${a("{count} file").replace("{count}",e.files.length.toString())} • ${M(P)}`:`${a("{count} files").replace("{count}",e.files.length.toString())} • ${M(P)}`}),o.jsxs(q,{children:[o.jsx(J,{isRTL:s,children:e.files.map((n,k)=>o.jsx(Z,{children:o.jsx(B,{thumbnailDataKey:n.thumbnailDataKey,dataKey:n.dataKey,src:`${A}${n.thumbnailDataKey||n.dataKey}`,alt:a("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},k))}),e.files.length>3&&o.jsx(X,{isRTL:s})]}),o.jsx(U,{isRTL:s,children:x!=="NoPassword"&&o.jsx(E,{children:o.jsx("span",{children:j(x)})})}),b==!1&&O&&o.jsx(O,{folder:e,openFilePicker:c,cognitoUsername:g,updateProfileIds:n=>S(e.folderId,n)}),I.length>0&&o.jsx(me,{isRTL:s,children:o.jsxs(we,{isRTL:s,children:[a("Shared with"),": ",I.join(", ")]})})]})})},e.folderId)})})};export{Ce as A,B as L,Pe as S};
