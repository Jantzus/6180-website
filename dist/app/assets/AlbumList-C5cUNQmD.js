import{j as o,o as ne,a as u,S as N,u as te,w as F,c as ie,h as se,f as re,g as oe,d,G as z,b as ae}from"./utils-CuQXS0Z6.js";import{C as le,a as ce,d as de}from"./fileOperations-DT_2RMWX.js";import{ap as ue,aq as O,ar as B,as as pe,at as he}from"./styled-components-DxUUvbaG.js";const ke=({searchQuery:t,setSearchQuery:g,t:b,isRTL:p})=>o.jsx("div",{style:{width:"100%",marginBottom:24,boxSizing:"border-box",direction:p?"rtl":"ltr"},children:o.jsx("input",{type:"text",placeholder:b("Search album title or description"),value:t,onChange:h=>g(h.target.value),style:{width:"100%",padding:"10px 16px",fontSize:"14px",border:"1px solid #ddd",borderRadius:"6px",outline:"none",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",boxSizing:"border-box"}})}),E=ne.memo(({src:t,alt:g,style:b,thumbnailDataKey:p,dataKey:h,bucketUrl:l=N,...C})=>{const[a,y]=u.useState(!1),[s,c]=u.useState(!1),[$,k]=u.useState(!1),v=u.useMemo(()=>p&&p.length>0?`${l}${p}`:h&&h.length>0?`${l}${h}`:t&&t.length>0?t:"",[p,h,t,l]),w=u.useMemo(()=>p&&h&&p!==h?`${l}${h}`:null,[p,h,l]);u.useEffect(()=>{v&&(y(!1),c(!1),k(!1))},[v]);const j=u.useCallback(()=>{y(!0),c(!1)},[]),P=u.useCallback(n=>{console.error("Image load error:",n),w&&!$?(console.log("Attempting fallback to full image"),k(!0)):(c(!0),y(!1))},[w,$]),T=u.useCallback(n=>(n.preventDefault(),!1),[]),S=u.useCallback(n=>(n.preventDefault(),!1),[]);if(!v||s&&(!w||$))return null;const e=$&&w?w:v;return o.jsx("img",{src:e,alt:g,style:{...b,opacity:a?1:.3,transition:"opacity 0.3s ease-in-out",userSelect:"none",WebkitUserSelect:"none",MozUserSelect:"none",msUserSelect:"none",WebkitTouchCallout:"none",pointerEvents:"auto"},onLoad:j,onError:P,onContextMenu:T,onDragStart:S,draggable:!1,loading:"lazy",decoding:"async",...C})});E.displayName="LazyImage";const xe=({folder:t,openFilePicker:g,cognitoUsername:b,updateProfileIds:p,onModalStateChange:h})=>{const{t:l,language:C}=te(),a=oe(C)==="rtl",[y,s]=u.useState(!1),[c,$]=u.useState(!1),[k,v]=u.useState(t.profileIds||[]),w=b?`${b}_____Public____Profile`:"",j=k.includes(w),P=F(t.folderId,t.albumNanoId,t.creatorId&&t.contacts&&t.contacts[t.creatorId]?t.contacts[t.creatorId]:"album",t.folderName);u.useEffect(()=>{v(t.profileIds||[])},[t.profileIds]),u.useEffect(()=>{h&&h(y||c)},[y,c,h]);const T=r=>{navigator.clipboard.writeText(r).then(()=>{s(!1),$(!0)}).catch(x=>{console.error("Failed to copy link:",x),alert(l("Failed to copy link"))})},S=async r=>{if(r.preventDefault(),r.stopPropagation(),!await ie()){alert(l("You must be logged in to download photos"));return}if(t&&t.files&&t.files.length>0){const m=t.files.map((f,R)=>{const D=f.dataKey.toLowerCase().endsWith(".mp4")?"video":"image";return{url:`${N}${f.dataKey}`,thumbnailUrl:f.thumbnailDataKey?`${N}${f.thumbnailDataKey}`:void 0,type:D,index:R,id:`file-${R}`,fileId:f.dataKey,loaded:!1}}),I={mediaItems:m,folderName:t.folderName||"Album"};de(I,l,f=>{window.open(m[f].url,"_blank")})}else alert(l("No items to download"))},e=async r=>{var x,m,I;if(r.preventDefault(),r.stopPropagation(),!b){alert(l("You must be logged in to perform this action"));return}try{const L=await se();if(!L){console.error("Authentication failed");return}const f=[...k];if(j){const M=f.indexOf(w);M>-1&&f.splice(M,1)}else f.push(w);const i=await(await fetch(re,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${L}`},body:JSON.stringify({query:`
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
      `,variables:{folderPositionChangeProfileIdsInput:{folderId:t.folderId,profileIds:f}}})})).json();if(i.errors)throw new Error(((x=i.errors[0])==null?void 0:x.message)||"Unknown error");const _=(((I=(m=i==null?void 0:i.data)==null?void 0:m.changeFiles)==null?void 0:I.items)||[]).find(M=>M.id===t.folderPositionId);_&&_.profileIds&&(v(_.profileIds),p&&p(_.profileIds),console.log("Album visibility updated successfully"))}catch(L){console.error("Failed to toggle album visibility:",L),alert(l("Failed to update album visibility. Please try again."))}},n={padding:"8px 12px",border:"none",borderRadius:6,cursor:"pointer",fontSize:14,textAlign:"center",whiteSpace:"nowrap",flexShrink:0};return o.jsx(o.Fragment,{children:o.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:16,flexDirection:a?"row-reverse":"row"},children:[o.jsx("div",{style:{display:"flex",width:"100%",overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none",WebkitOverflowScrolling:"touch",flexDirection:a?"row-reverse":"row",gap:"10px"},children:o.jsxs("div",{style:{display:"flex",gap:"10px",flexDirection:a?"row-reverse":"row"},children:[g&&o.jsx("button",{onClick:r=>{r.preventDefault(),r.stopPropagation(),g(t.folderId)},style:{...n,backgroundColor:"#4caf50",color:"white"},children:l("Add Photos")}),o.jsx("button",{onClick:r=>{r.preventDefault(),r.stopPropagation(),s(!0)},style:{...n,backgroundColor:"#e0e0e0"},children:l("Copy Link")}),o.jsx("button",{onClick:S,style:{...n,backgroundColor:"#e0e0e0"},children:l("Download")}),o.jsx("button",{onClick:e,style:{...n,backgroundColor:j?"#4caf50":"#e0e0e0",color:j?"white":"inherit"},children:l(j?"On Public Profile":"Not On Public Profile")})]})}),o.jsx(le,{isOpen:y,onClose:()=>s(!1),inviteLink:P,onCopy:T,t:l,isRTL:a}),o.jsx(ce,{isOpen:c,onClose:()=>$(!1),t:l,isRTL:a}),o.jsx("style",{children:`
            div::-webkit-scrollbar {
              display: none;
            }
          `})]})})},W=t=>{if(t===0)return"0 B";const g=1024,b=["B","KB","MB","GB","TB"],p=Math.floor(Math.log(t)/Math.log(g));return`${Math.round(t/Math.pow(g,p)*100)/100} ${b[p]}`},fe=t=>t.reduce((g,b)=>g+(b.dataInBytes||0),0),V=d.div`
  margin-bottom: 30px;
  width: 100%;
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
`,G=d.div`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
`,K=d.div`
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
`,H=d.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
  flex-direction: ${t=>t.$isRTL?"row-reverse":"row"};
`,Q=d.div`
  display: flex;
  flex-direction: column;
  align-items: ${t=>t.$isRTL?"flex-end":"flex-start"};
`,U=d.h2`
  font-size: 20px;
  margin: 0;
  color: #222;
`,ge=d.div`
  display: flex;
  flex-direction: column;
  align-items: ${t=>t.$isRTL?"flex-start":"flex-end"};
  justify-content: flex-end;
  gap: 8px;
`,be=d.div`
  position: relative;
`,me=d.button`
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
`,we=d.button`
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
`,ye=d.div`
  display: none;
  position: absolute;
  top: 100%;
  right: ${t=>t.$isRTL?"auto":0};
  left: ${t=>t.$isRTL?0:"auto"};
  background-color: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-radius: 4px;
  z-index: 10;
  min-width: 150px;
  padding: 8px 0;
  margin-top: 5px;
  text-align: ${t=>t.$isRTL?"right":"left"};
`,q=d.button`
  display: block;
  width: 100%;
  padding: 8px 16px;
  color: ${t=>t.$isDelete?"#d32f2f":"#2196f3"};
  text-decoration: none;
  font-size: 12px;
  white-space: nowrap;
  background: none;
  border: none;
  cursor: pointer;
  text-align: ${t=>t.$isRTL?"right":"left"};
  
  &:hover {
    background-color: #f5f5f5;
  }
`,Y=d.div`
  width: 100%;
  position: relative;
`,J=d.div`
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding-bottom: 8px;
  ms-overflow-style: none;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
  max-width: 100%;
  flex-direction: ${t=>t.$isRTL?"row-reverse":"row"};
`,X=d.div`
  position: absolute;
  ${t=>t.$isRTL?"left":"right"}: 0;
  top: 0;
  bottom: 8px;
  width: 30px;
  background: ${t=>t.$isRTL?"linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))":"linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))"};
  pointer-events: none;
`,Z=d.div`
  display: flex;
  justify-content: ${t=>t.$isRTL?"flex-start":"flex-end"};
  margin-top: 8px;
  margin-bottom: 8px;
`,$e=d.div`
  width: 100%;
  background-color: #f0f7ff;
  border-radius: 8px;
  padding: 12px 16px;
  margin-top: 16px;
  box-sizing: border-box;
  border: 1px solid #d0e1f9;
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
`,ve=d.p`
  margin: 0;
  font-size: 14px;
  color: #333;
  text-align: ${t=>t.$isRTL?"right":"left"};
`,ee=d.div`
  width: 160px;
  height: 100px;
  flex-shrink: 0;
`,Ce=({folders:t,setFolders:g,handleDeleteClick:b,openFilePicker:p,isUploading:h=!1,cognitoUsername:l,isProfileView:C=!1})=>{const{t:a,language:y}=te(),s=oe(y)==="rtl",c=u.useRef(null),[$,k]=u.useState({});u.useEffect(()=>{function e(){c.current&&(c.current.style.display="none",c.current=null)}function n(){e()}return window.addEventListener("scroll",n,!0),()=>{window.removeEventListener("scroll",n,!0)}},[]);const v=(e,n)=>{e.preventDefault(),e.stopPropagation(),c.current&&c.current!==n&&(c.current.style.display="none");const r=n.style.display==="block";n.style.display=r?"none":"block",c.current=r?null:n},w=e=>{c.current&&(c.current.style.display="none",c.current=null),window.confirm(a("Are you sure you want to delete this album? This action cannot be undone."))&&b&&b(e,a)},j=(e,n)=>{g&&g(r=>r.map(x=>x.folderId===e?{...x,profileIds:n}:x))},P=e=>{switch(e){case"NotVisible":return a("Hidden");case"Watermark":return a("Watermarked");case"CannotBeSaved":return a("Cannot be saved");case"NoPassword":default:return a("No password")}},T=(e,n)=>{const r=c.current&&c.current.style.display==="block",x=$[n]||!1;!r&&!x&&(window.location.href=e)},S=(e,n)=>{k(r=>({...r,[e]:n}))};return t.length===0&&!h?o.jsx(ue,{$type:"empty",children:o.jsx("p",{children:a("No albums found")})}):C?o.jsx(o.Fragment,{children:t.map(e=>{var x;const n=((x=e.folderPassword)==null?void 0:x.policy)||"NoPassword",r=F(e.folderId,e.albumNanoId||null,e.creatorId&&e.contacts&&e.contacts[e.creatorId],e.folderName);return o.jsx(V,{$isRTL:s,children:o.jsx(G,{onClick:()=>T(r,e.folderId),children:o.jsxs(K,{children:[o.jsx(H,{$isRTL:s,children:o.jsx(Q,{$isRTL:s,children:o.jsx(U,{children:e.folderName||""})})}),e.folderDescription&&e.folderDescription.length>1&&o.jsx(O,{$isRTL:s,children:e.folderDescription}),o.jsxs(Y,{children:[o.jsx(J,{$isRTL:s,children:e.files.map((m,I)=>o.jsx(ee,{children:o.jsx(E,{thumbnailDataKey:m.thumbnailDataKey,dataKey:m.dataKey,src:`${N}${m.thumbnailDataKey||m.dataKey}`,alt:a("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},I))}),e.files.length>3&&o.jsx(X,{$isRTL:s})]}),o.jsx(Z,{$isRTL:s,children:n!=="NoPassword"&&o.jsx(B,{children:o.jsx("span",{children:P(n)})})})]})})},e.folderId)})}):o.jsx(o.Fragment,{children:t.map(e=>{var D;const n=e.createdAt!=null,r=e.updatedAt!=null&&e.createdAt!=null&&e.updatedAt!==e.createdAt,x=e.creatorId===`${l}_____${l}____Account`,m=((D=e.folderPassword)==null?void 0:D.policy)||"NoPassword",I=e.contacts||{},L=Object.values(I).filter(i=>i&&typeof i=="string"&&!i.toString().startsWith("Profile-")),f=fe(e.files),R=F(e.folderId,e.albumNanoId||null,e.creatorId&&e.contacts&&e.contacts[e.creatorId],e.folderName);return o.jsx(V,{$isRTL:s,children:o.jsx(G,{onClick:()=>T(R,e.folderId),children:o.jsxs(K,{children:[o.jsxs(H,{$isRTL:s,children:[o.jsxs(Q,{$isRTL:s,children:[o.jsx(U,{children:e.folderName||""}),(n||r)&&o.jsxs(pe,{$isRTL:s,children:[n&&e.createdAt&&z(e.createdAt)&&o.jsxs("div",{children:[a("Created"),": ",z(e.createdAt)]}),r&&e.updatedAt&&z(e.updatedAt)&&o.jsxs("div",{children:[a("Updated"),": ",z(e.updatedAt)]})]})]}),o.jsx(ge,{$isRTL:s,children:x?o.jsxs(be,{children:[o.jsx(me,{onClick:i=>{const A=i.currentTarget.nextElementSibling;A&&v(i,A)},children:a("Edit")}),o.jsxs(ye,{$isRTL:s,onClick:i=>{i.stopPropagation()},children:[o.jsx(q,{$isRTL:s,onClick:i=>{i.stopPropagation(),window.location.href=ae(`save-album.html?folderId=${encodeURIComponent(e.folderId)}`)},children:a("Edit Details")}),o.jsx(q,{$isRTL:s,$isDelete:!0,onClick:i=>{i.preventDefault(),i.stopPropagation(),w(e.folderPositionId)},children:a("Delete My Copy")})]})]}):o.jsx(we,{onClick:i=>{i.preventDefault(),i.stopPropagation(),w(e.folderPositionId)},children:a("Delete My Copy")})})]}),e.folderDescription&&e.folderDescription.length>1&&o.jsx(O,{$isRTL:s,children:e.folderDescription}),o.jsx(he,{$isRTL:s,children:e.files.length===1?`${a("{{count}} file",{count:e.files.length.toString()})} • ${W(f)}`:`${a("{{count}} files",{count:e.files.length.toString()})} • ${W(f)}`}),o.jsxs(Y,{children:[o.jsx(J,{$isRTL:s,children:e.files.map((i,A)=>o.jsx(ee,{children:o.jsx(E,{thumbnailDataKey:i.thumbnailDataKey,dataKey:i.dataKey,src:`${N}${i.thumbnailDataKey||i.dataKey}`,alt:a("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},A))}),e.files.length>3&&o.jsx(X,{$isRTL:s})]}),o.jsx(Z,{$isRTL:s,children:m!=="NoPassword"&&o.jsx(B,{children:o.jsx("span",{children:P(m)})})}),C==!1&&o.jsx(xe,{folder:e,openFilePicker:p,cognitoUsername:l,updateProfileIds:i=>j(e.folderId,i),onModalStateChange:i=>S(e.folderId,i)}),L.length>0&&o.jsx($e,{$isRTL:s,children:o.jsxs(ve,{$isRTL:s,children:[a("Shared with"),": ",L.join(", ")]})})]})})},e.folderId)})})};export{Ce as A,E as L,ke as S};
