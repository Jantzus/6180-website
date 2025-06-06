import{j as o,o as ne,a as x,S as N,u as te,v as M,c as ie,h as se,f as re,g as oe,d,F,b as ae}from"./utils-CF8TLIZ8.js";import{C as le,a as ce,d as de}from"./fileOperations-vBnzyeaE.js";import{aq as ue,ar as O,as as B,at as pe,au as he}from"./styled-components-B3GAttaU.js";const ke=({searchQuery:t,setSearchQuery:g,t:b,isRTL:u})=>o.jsx("div",{style:{width:"100%",marginBottom:24,boxSizing:"border-box",direction:u?"rtl":"ltr"},children:o.jsx("input",{type:"text",placeholder:b("Search album title or description"),value:t,onChange:p=>g(p.target.value),style:{width:"100%",padding:"10px 16px",fontSize:"14px",border:"1px solid #ddd",borderRadius:"6px",outline:"none",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",boxSizing:"border-box"}})}),E=ne.memo(({src:t,alt:g,style:b,thumbnailDataKey:u,dataKey:p,bucketUrl:l=N,...P})=>{const[r,y]=x.useState(!1),[i,c]=x.useState(!1),[$,k]=x.useState(!1),v=x.useMemo(()=>u&&u.length>0?`${l}${u}`:p&&p.length>0?`${l}${p}`:t&&t.length>0?t:"",[u,p,t,l]),w=x.useMemo(()=>u&&p&&u!==p?`${l}${p}`:null,[u,p,l]);x.useEffect(()=>{v&&(y(!1),c(!1),k(!1))},[v]);const j=x.useCallback(()=>{y(!0),c(!1)},[]),T=x.useCallback(R=>{console.error("Image load error:",R),w&&!$?(console.log("Attempting fallback to full image"),k(!0)):(c(!0),y(!1))},[w,$]);if(!v||i&&(!w||$))return null;const C=$&&w?w:v;return o.jsx("img",{src:C,alt:g,style:{...b,opacity:r?1:.3,transition:"opacity 0.3s ease-in-out"},onLoad:j,onError:T,loading:"lazy",decoding:"async",...P})});E.displayName="LazyImage";const xe=({folder:t,openFilePicker:g,cognitoUsername:b,updateProfileIds:u,onModalStateChange:p})=>{const{t:l,language:P}=te(),r=oe(P)==="rtl",[y,i]=x.useState(!1),[c,$]=x.useState(!1),[k,v]=x.useState(t.profileIds||[]),w=b?`${b}_____Public____Profile`:"",j=k.includes(w),T=M(t.folderId,t.albumNanoId,t.creatorId&&t.contacts&&t.contacts[t.creatorId]?t.contacts[t.creatorId]:"album",t.folderName);x.useEffect(()=>{v(t.profileIds||[])},[t.profileIds]),x.useEffect(()=>{p&&p(y||c)},[y,c,p]);const C=s=>{navigator.clipboard.writeText(s).then(()=>{i(!1),$(!0)}).catch(h=>{console.error("Failed to copy link:",h),alert(l("Failed to copy link"))})},R=async s=>{if(s.preventDefault(),s.stopPropagation(),!await ie()){alert(l("You must be logged in to download photos"));return}if(t&&t.files&&t.files.length>0){const m=t.files.map((f,S)=>{const A=f.dataKey.toLowerCase().endsWith(".mp4")?"video":"image";return{url:`${N}${f.dataKey}`,thumbnailUrl:f.thumbnailDataKey?`${N}${f.thumbnailDataKey}`:void 0,type:A,index:S,id:`file-${S}`,fileId:f.dataKey,loaded:!1}}),I={mediaItems:m,folderName:t.folderName||"Album"};de(I,l,f=>{window.open(m[f].url,"_blank")})}else alert(l("No items to download"))},e=async s=>{var h,m,I;if(s.preventDefault(),s.stopPropagation(),!b){alert(l("You must be logged in to perform this action"));return}try{const L=await se();if(!L){console.error("Authentication failed");return}const f=[...k];if(j){const z=f.indexOf(w);z>-1&&f.splice(z,1)}else f.push(w);const n=await(await fetch(re,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${L}`},body:JSON.stringify({query:`
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
      `,variables:{folderPositionChangeProfileIdsInput:{folderId:t.folderId,profileIds:f}}})})).json();if(n.errors)throw new Error(((h=n.errors[0])==null?void 0:h.message)||"Unknown error");const _=(((I=(m=n==null?void 0:n.data)==null?void 0:m.changeFiles)==null?void 0:I.items)||[]).find(z=>z.id===t.folderPositionId);_&&_.profileIds&&(v(_.profileIds),u&&u(_.profileIds),console.log("Album visibility updated successfully"))}catch(L){console.error("Failed to toggle album visibility:",L),alert(l("Failed to update album visibility. Please try again."))}},a={padding:"8px 12px",border:"none",borderRadius:6,cursor:"pointer",fontSize:14,textAlign:"center",whiteSpace:"nowrap",flexShrink:0};return o.jsx(o.Fragment,{children:o.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:16,flexDirection:r?"row-reverse":"row"},children:[o.jsx("div",{style:{display:"flex",width:"100%",overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none",WebkitOverflowScrolling:"touch",flexDirection:r?"row-reverse":"row",gap:"10px"},children:o.jsxs("div",{style:{display:"flex",gap:"10px",flexDirection:r?"row-reverse":"row"},children:[g&&o.jsx("button",{onClick:s=>{s.preventDefault(),s.stopPropagation(),g(t.folderId)},style:{...a,backgroundColor:"#4caf50",color:"white"},children:l("Add Photos")}),o.jsx("button",{onClick:R,style:{...a,backgroundColor:"#e0e0e0"},children:l("Download")}),o.jsx("button",{onClick:s=>{s.preventDefault(),s.stopPropagation(),i(!0)},style:{...a,backgroundColor:"#e0e0e0"},children:l("Copy Link")}),o.jsx("button",{onClick:e,style:{...a,backgroundColor:j?"#4caf50":"#e0e0e0",color:j?"white":"inherit"},children:l(j?"On Public Profile":"Not On Public Profile")})]})}),o.jsx(le,{isOpen:y,onClose:()=>i(!1),inviteLink:T,onCopy:C,t:l,isRTL:r}),o.jsx(ce,{isOpen:c,onClose:()=>$(!1),t:l,isRTL:r}),o.jsx("style",{children:`
            div::-webkit-scrollbar {
              display: none;
            }
          `})]})})},W=t=>{if(t===0)return"0 B";const g=1024,b=["B","KB","MB","GB","TB"],u=Math.floor(Math.log(t)/Math.log(g));return`${Math.round(t/Math.pow(g,u)*100)/100} ${b[u]}`},fe=t=>t.reduce((g,b)=>g+(b.dataInBytes||0),0),V=d.div`
  margin-bottom: 30px;
  width: 100%;
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
`,K=d.div`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
`,G=d.div`
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
`,q=d.h2`
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
  font-size: 13px;
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
  font-size: 13px;
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
`,Y=d.button`
  display: block;
  width: 100%;
  padding: 8px 16px;
  color: ${t=>t.$isDelete?"#d32f2f":"#2196f3"};
  text-decoration: none;
  font-size: 13px;
  white-space: nowrap;
  background: none;
  border: none;
  cursor: pointer;
  text-align: ${t=>t.$isRTL?"right":"left"};
  
  &:hover {
    background-color: #f5f5f5;
  }
`,J=d.div`
  width: 100%;
  position: relative;
`,X=d.div`
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding-bottom: 8px;
  ms-overflow-style: none;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
  max-width: 100%;
  flex-direction: ${t=>t.$isRTL?"row-reverse":"row"};
`,U=d.div`
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
`,Pe=({folders:t,setFolders:g,handleDeleteClick:b,openFilePicker:u,isUploading:p=!1,cognitoUsername:l,isProfileView:P=!1})=>{const{t:r,language:y}=te(),i=oe(y)==="rtl",c=x.useRef(null),[$,k]=x.useState({});x.useEffect(()=>{function e(){c.current&&(c.current.style.display="none",c.current=null)}function a(){e()}return window.addEventListener("scroll",a,!0),()=>{window.removeEventListener("scroll",a,!0)}},[]);const v=(e,a)=>{e.preventDefault(),e.stopPropagation(),c.current&&c.current!==a&&(c.current.style.display="none");const s=a.style.display==="block";a.style.display=s?"none":"block",c.current=s?null:a},w=e=>{c.current&&(c.current.style.display="none",c.current=null),window.confirm(r("Are you sure you want to delete this album? This action cannot be undone."))&&b&&b(e,r)},j=(e,a)=>{g&&g(s=>s.map(h=>h.folderId===e?{...h,profileIds:a}:h))},T=e=>{switch(e){case"NotVisible":return r("Hidden");case"Watermark":return r("Watermarked");case"CannotBeSaved":return r("Cannot be saved");case"NoPassword":default:return r("No password")}},C=(e,a)=>{const s=c.current&&c.current.style.display==="block",h=$[a]||!1;!s&&!h&&(window.location.href=e)},R=(e,a)=>{k(s=>({...s,[e]:a}))};return t.length===0&&!p?o.jsx(ue,{$type:"empty",children:o.jsx("p",{children:r("No albums found")})}):P?o.jsx(o.Fragment,{children:t.map(e=>{var h;const a=((h=e.folderPassword)==null?void 0:h.policy)||"NoPassword",s=M(e.folderId,e.albumNanoId||null,e.creatorId&&e.contacts&&e.contacts[e.creatorId],e.folderName);return o.jsx(V,{$isRTL:i,children:o.jsx(K,{onClick:()=>C(s,e.folderId),children:o.jsxs(G,{children:[o.jsx(H,{$isRTL:i,children:o.jsx(Q,{$isRTL:i,children:o.jsx(q,{children:e.folderName||""})})}),e.folderDescription&&e.folderDescription.length>1&&o.jsx(O,{$isRTL:i,children:e.folderDescription}),o.jsxs(J,{children:[o.jsx(X,{$isRTL:i,children:e.files.map((m,I)=>o.jsx(ee,{children:o.jsx(E,{thumbnailDataKey:m.thumbnailDataKey,dataKey:m.dataKey,src:`${N}${m.thumbnailDataKey||m.dataKey}`,alt:r("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},I))}),e.files.length>3&&o.jsx(U,{$isRTL:i})]}),o.jsx(Z,{$isRTL:i,children:a!=="NoPassword"&&o.jsx(B,{children:o.jsx("span",{children:T(a)})})})]})})},e.folderId)})}):o.jsx(o.Fragment,{children:t.map(e=>{var A;const a=e.createdAt!=null,s=e.updatedAt!=null&&e.createdAt!=null&&e.updatedAt!==e.createdAt,h=e.creatorId===`${l}_____${l}____Account`,m=((A=e.folderPassword)==null?void 0:A.policy)||"NoPassword",I=e.contacts||{},L=Object.values(I).filter(n=>n&&typeof n=="string"&&!n.toString().startsWith("Profile-")),f=fe(e.files),S=M(e.folderId,e.albumNanoId||null,e.creatorId&&e.contacts&&e.contacts[e.creatorId],e.folderName);return o.jsx(V,{$isRTL:i,children:o.jsx(K,{onClick:()=>C(S,e.folderId),children:o.jsxs(G,{children:[o.jsxs(H,{$isRTL:i,children:[o.jsxs(Q,{$isRTL:i,children:[o.jsx(q,{children:e.folderName||""}),(a||s)&&o.jsxs(pe,{$isRTL:i,children:[a&&e.createdAt&&F(e.createdAt)&&o.jsxs("div",{children:[r("Created"),": ",F(e.createdAt)]}),s&&e.updatedAt&&F(e.updatedAt)&&o.jsxs("div",{children:[r("Updated"),": ",F(e.updatedAt)]})]})]}),o.jsx(ge,{$isRTL:i,children:h?o.jsxs(be,{children:[o.jsx(me,{onClick:n=>{const D=n.currentTarget.nextElementSibling;D&&v(n,D)},children:r("Edit")}),o.jsxs(ye,{$isRTL:i,onClick:n=>{n.stopPropagation()},children:[o.jsx(Y,{$isRTL:i,onClick:n=>{n.stopPropagation(),window.location.href=ae(`save-album.html?folderId=${encodeURIComponent(e.folderId)}`)},children:r("Edit Details")}),o.jsx(Y,{$isRTL:i,$isDelete:!0,onClick:n=>{n.preventDefault(),n.stopPropagation(),w(e.folderPositionId)},children:r("Delete My Copy")})]})]}):o.jsx(we,{onClick:n=>{n.preventDefault(),n.stopPropagation(),w(e.folderPositionId)},children:r("Delete")})})]}),e.folderDescription&&e.folderDescription.length>1&&o.jsx(O,{$isRTL:i,children:e.folderDescription}),o.jsx(he,{$isRTL:i,children:e.files.length===1?`${r("{{count}} file",{count:e.files.length.toString()})} • ${W(f)}`:`${r("{{count}} files",{count:e.files.length.toString()})} • ${W(f)}`}),o.jsxs(J,{children:[o.jsx(X,{$isRTL:i,children:e.files.map((n,D)=>o.jsx(ee,{children:o.jsx(E,{thumbnailDataKey:n.thumbnailDataKey,dataKey:n.dataKey,src:`${N}${n.thumbnailDataKey||n.dataKey}`,alt:r("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},D))}),e.files.length>3&&o.jsx(U,{$isRTL:i})]}),o.jsx(Z,{$isRTL:i,children:m!=="NoPassword"&&o.jsx(B,{children:o.jsx("span",{children:T(m)})})}),P==!1&&o.jsx(xe,{folder:e,openFilePicker:u,cognitoUsername:l,updateProfileIds:n=>j(e.folderId,n),onModalStateChange:n=>R(e.folderId,n)}),L.length>0&&o.jsx($e,{$isRTL:i,children:o.jsxs(ve,{$isRTL:i,children:[r("Shared with"),": ",L.join(", ")]})})]})})},e.folderId)})})};export{Pe as A,E as L,ke as S};
