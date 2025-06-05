import{j as o,a as w,S as D,u as te,t as O,c as ne,h as ie,f as se,g as oe,d as c,F,b as re}from"./utils-D-8Cmpza.js";import{C as ae,a as le,d as de}from"./fileOperations-CI7xsVhT.js";import{aq as ce,ar as M,as as B,at as pe,au as ue}from"./styled-components-BbMxmMOK.js";const Le=({searchQuery:t,setSearchQuery:g,t:f,isRTL:p})=>o.jsx("div",{style:{width:"100%",marginBottom:24,boxSizing:"border-box",direction:p?"rtl":"ltr"},children:o.jsx("input",{type:"text",placeholder:f("Search album title or description"),value:t,onChange:h=>g(h.target.value),style:{width:"100%",padding:"10px 16px",fontSize:"14px",border:"1px solid #ddd",borderRadius:"6px",outline:"none",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",boxSizing:"border-box"}})}),E=({src:t,alt:g,style:f,thumbnailDataKey:p,dataKey:h,bucketUrl:l=D,...P})=>{const[r,$]=w.useState(!1),[i,d]=w.useState(""),[T,v]=w.useState(!1);w.useEffect(()=>{$(!1);let b="",y=!1;p&&p.length>0?(b=`${l}${p}`,y=!0):h&&h.length>0?(b=`${l}${h}`,y=!0):t&&t.length>0&&(b=t,y=!0),d(b),v(y)},[p,h,t,l]);const C=()=>{$(!0)},j=b=>{console.error("Image load error:",b),p&&h&&p!==h&&i===`${l}${p}`?(console.log("Falling back to full image"),d(`${l}${h}`)):v(!1)};return T?o.jsx("img",{src:i,alt:g,style:{...f,opacity:r?1:.3,transition:"opacity 0.3s ease-in-out"},onLoad:C,onError:j,...P}):null},he=({folder:t,openFilePicker:g,cognitoUsername:f,updateProfileIds:p,onModalStateChange:h})=>{const{t:l,language:P}=te(),r=oe(P)==="rtl",[$,i]=w.useState(!1),[d,T]=w.useState(!1),[v,C]=w.useState(t.profileIds||[]),j=f?`${f}_____Public____Profile`:"",b=v.includes(j),y=O(t.folderId,t.albumNanoId,t.creatorId&&t.contacts&&t.contacts[t.creatorId]?t.contacts[t.creatorId]:"album",t.folderName);w.useEffect(()=>{C(t.profileIds||[])},[t.profileIds]),w.useEffect(()=>{h&&h($||d)},[$,d,h]);const A=s=>{navigator.clipboard.writeText(s).then(()=>{i(!1),T(!0)}).catch(u=>{console.error("Failed to copy link:",u),alert(l("Failed to copy link"))})},z=async s=>{if(s.preventDefault(),s.stopPropagation(),!await ne()){alert(l("You must be logged in to download photos"));return}if(t&&t.files&&t.files.length>0){const m=t.files.map((x,k)=>{const R=x.dataKey.toLowerCase().endsWith(".mp4")?"video":"image";return{url:`${D}${x.dataKey}`,thumbnailUrl:x.thumbnailDataKey?`${D}${x.thumbnailDataKey}`:void 0,type:R,index:k,id:`file-${k}`,fileId:x.dataKey,loaded:!1}}),I={mediaItems:m,folderName:t.folderName||"Album"};de(I,l,x=>{window.open(m[x].url,"_blank")})}else alert(l("No items to download"))},e=async s=>{var u,m,I;if(s.preventDefault(),s.stopPropagation(),!f){alert(l("You must be logged in to perform this action"));return}try{const L=await ie();if(!L){console.error("Authentication failed");return}const x=[...v];if(b){const _=x.indexOf(j);_>-1&&x.splice(_,1)}else x.push(j);const n=await(await fetch(se,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${L}`},body:JSON.stringify({query:`
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
      `,variables:{folderPositionChangeProfileIdsInput:{folderId:t.folderId,profileIds:x}}})})).json();if(n.errors)throw new Error(((u=n.errors[0])==null?void 0:u.message)||"Unknown error");const N=(((I=(m=n==null?void 0:n.data)==null?void 0:m.changeFiles)==null?void 0:I.items)||[]).find(_=>_.id===t.folderPositionId);N&&N.profileIds&&(C(N.profileIds),p&&p(N.profileIds),console.log("Album visibility updated successfully"))}catch(L){console.error("Failed to toggle album visibility:",L),alert(l("Failed to update album visibility. Please try again."))}},a={padding:"8px 12px",border:"none",borderRadius:6,cursor:"pointer",fontSize:14,textAlign:"center",whiteSpace:"nowrap",flexShrink:0};return o.jsx(o.Fragment,{children:o.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:16,flexDirection:r?"row-reverse":"row"},children:[o.jsx("div",{style:{display:"flex",width:"100%",overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none",WebkitOverflowScrolling:"touch",flexDirection:r?"row-reverse":"row",gap:"10px"},children:o.jsxs("div",{style:{display:"flex",gap:"10px",flexDirection:r?"row-reverse":"row"},children:[g&&o.jsx("button",{onClick:s=>{s.preventDefault(),s.stopPropagation(),g(t.folderId)},style:{...a,backgroundColor:"#4caf50",color:"white"},children:l("Add Photos")}),o.jsx("button",{onClick:z,style:{...a,backgroundColor:"#e0e0e0"},children:l("Download")}),o.jsx("button",{onClick:s=>{s.preventDefault(),s.stopPropagation(),i(!0)},style:{...a,backgroundColor:"#e0e0e0"},children:l("Copy Link")}),o.jsx("button",{onClick:e,style:{...a,backgroundColor:b?"#4caf50":"#e0e0e0",color:b?"white":"inherit"},children:l(b?"On Public Profile":"Not On Public Profile")})]})}),o.jsx(ae,{isOpen:$,onClose:()=>i(!1),inviteLink:y,onCopy:A,t:l,isRTL:r}),o.jsx(le,{isOpen:d,onClose:()=>T(!1),t:l,isRTL:r}),o.jsx("style",{children:`
            div::-webkit-scrollbar {
              display: none;
            }
          `})]})})},V=t=>{if(t===0)return"0 B";const g=1024,f=["B","KB","MB","GB","TB"],p=Math.floor(Math.log(t)/Math.log(g));return`${Math.round(t/Math.pow(g,p)*100)/100} ${f[p]}`},xe=t=>t.reduce((g,f)=>g+(f.dataInBytes||0),0),W=c.div`
  margin-bottom: 30px;
  width: 100%;
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
`,K=c.div`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
`,G=c.div`
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
`,H=c.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
  flex-direction: ${t=>t.$isRTL?"row-reverse":"row"};
`,Q=c.div`
  display: flex;
  flex-direction: column;
  align-items: ${t=>t.$isRTL?"flex-end":"flex-start"};
`,q=c.h2`
  font-size: 20px;
  margin: 0;
  color: #222;
`,ge=c.div`
  display: flex;
  flex-direction: column;
  align-items: ${t=>t.$isRTL?"flex-start":"flex-end"};
  justify-content: flex-end;
  gap: 8px;
`,fe=c.div`
  position: relative;
`,be=c.button`
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
`,me=c.button`
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
`,we=c.div`
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
`,Y=c.button`
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
`,J=c.div`
  width: 100%;
  position: relative;
`,X=c.div`
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding-bottom: 8px;
  ms-overflow-style: none;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
  max-width: 100%;
  flex-direction: ${t=>t.$isRTL?"row-reverse":"row"};
`,U=c.div`
  position: absolute;
  ${t=>t.$isRTL?"left":"right"}: 0;
  top: 0;
  bottom: 8px;
  width: 30px;
  background: ${t=>t.$isRTL?"linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))":"linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))"};
  pointer-events: none;
`,Z=c.div`
  display: flex;
  justify-content: ${t=>t.$isRTL?"flex-start":"flex-end"};
  margin-top: 8px;
  margin-bottom: 8px;
`,ye=c.div`
  width: 100%;
  background-color: #f0f7ff;
  border-radius: 8px;
  padding: 12px 16px;
  margin-top: 16px;
  box-sizing: border-box;
  border: 1px solid #d0e1f9;
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
`,$e=c.p`
  margin: 0;
  font-size: 14px;
  color: #333;
  text-align: ${t=>t.$isRTL?"right":"left"};
`,ee=c.div`
  width: 160px;
  height: 100px;
  flex-shrink: 0;
`,Pe=({folders:t,setFolders:g,handleDeleteClick:f,openFilePicker:p,isUploading:h=!1,cognitoUsername:l,isProfileView:P=!1})=>{const{t:r,language:$}=te(),i=oe($)==="rtl",d=w.useRef(null),[T,v]=w.useState({});w.useEffect(()=>{function e(){d.current&&(d.current.style.display="none",d.current=null)}function a(){e()}return window.addEventListener("scroll",a,!0),()=>{window.removeEventListener("scroll",a,!0)}},[]);const C=(e,a)=>{e.preventDefault(),e.stopPropagation(),d.current&&d.current!==a&&(d.current.style.display="none");const s=a.style.display==="block";a.style.display=s?"none":"block",d.current=s?null:a},j=e=>{d.current&&(d.current.style.display="none",d.current=null),window.confirm(r("Are you sure you want to delete this album? This action cannot be undone."))&&f&&f(e,r)},b=(e,a)=>{g&&g(s=>s.map(u=>u.folderId===e?{...u,profileIds:a}:u))},y=e=>{switch(e){case"NotVisible":return r("Hidden");case"Watermark":return r("Watermarked");case"CannotBeSaved":return r("Cannot be saved");case"NoPassword":default:return r("No password")}},A=(e,a)=>{const s=d.current&&d.current.style.display==="block",u=T[a]||!1;!s&&!u&&(window.location.href=e)},z=(e,a)=>{v(s=>({...s,[e]:a}))};return t.length===0&&!h?o.jsx(ce,{$type:"empty",children:o.jsx("p",{children:r("No albums found")})}):P?o.jsx(o.Fragment,{children:t.map(e=>{var u;const a=((u=e.folderPassword)==null?void 0:u.policy)||"NoPassword",s=O(e.folderId,e.albumNanoId||null,e.creatorId&&e.contacts&&e.contacts[e.creatorId],e.folderName);return o.jsx(W,{$isRTL:i,children:o.jsx(K,{onClick:()=>A(s,e.folderId),children:o.jsxs(G,{children:[o.jsx(H,{$isRTL:i,children:o.jsx(Q,{$isRTL:i,children:o.jsx(q,{children:e.folderName||""})})}),e.folderDescription&&e.folderDescription.length>1&&o.jsx(M,{$isRTL:i,children:e.folderDescription}),o.jsxs(J,{children:[o.jsx(X,{$isRTL:i,children:e.files.map((m,I)=>o.jsx(ee,{children:o.jsx(E,{thumbnailDataKey:m.thumbnailDataKey,dataKey:m.dataKey,src:`${D}${m.thumbnailDataKey||m.dataKey}`,alt:r("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},I))}),e.files.length>3&&o.jsx(U,{$isRTL:i})]}),o.jsx(Z,{$isRTL:i,children:a!=="NoPassword"&&o.jsx(B,{children:o.jsx("span",{children:y(a)})})})]})})},e.folderId)})}):o.jsx(o.Fragment,{children:t.map(e=>{var R;const a=e.createdAt!=null,s=e.updatedAt!=null&&e.createdAt!=null&&e.updatedAt!==e.createdAt,u=e.creatorId===`${l}_____${l}____Account`,m=((R=e.folderPassword)==null?void 0:R.policy)||"NoPassword",I=e.contacts||{},L=Object.values(I).filter(n=>n&&typeof n=="string"&&!n.toString().startsWith("Profile-")),x=xe(e.files),k=O(e.folderId,e.albumNanoId||null,e.creatorId&&e.contacts&&e.contacts[e.creatorId],e.folderName);return o.jsx(W,{$isRTL:i,children:o.jsx(K,{onClick:()=>A(k,e.folderId),children:o.jsxs(G,{children:[o.jsxs(H,{$isRTL:i,children:[o.jsxs(Q,{$isRTL:i,children:[o.jsx(q,{children:e.folderName||""}),(a||s)&&o.jsxs(pe,{$isRTL:i,children:[a&&e.createdAt&&F(e.createdAt)&&o.jsxs("div",{children:[r("Created"),": ",F(e.createdAt)]}),s&&e.updatedAt&&F(e.updatedAt)&&o.jsxs("div",{children:[r("Updated"),": ",F(e.updatedAt)]})]})]}),o.jsx(ge,{$isRTL:i,children:u?o.jsxs(fe,{children:[o.jsx(be,{onClick:n=>{const S=n.currentTarget.nextElementSibling;S&&C(n,S)},children:r("Edit")}),o.jsxs(we,{$isRTL:i,onClick:n=>{n.stopPropagation()},children:[o.jsx(Y,{$isRTL:i,onClick:n=>{n.stopPropagation(),window.location.href=re(`save-album.html?folderId=${encodeURIComponent(e.folderId)}`)},children:r("Edit Details")}),o.jsx(Y,{$isRTL:i,$isDelete:!0,onClick:n=>{n.preventDefault(),n.stopPropagation(),j(e.folderPositionId)},children:r("Delete My Copy")})]})]}):o.jsx(me,{onClick:n=>{n.preventDefault(),n.stopPropagation(),j(e.folderPositionId)},children:r("Delete")})})]}),e.folderDescription&&e.folderDescription.length>1&&o.jsx(M,{$isRTL:i,children:e.folderDescription}),o.jsx(ue,{$isRTL:i,children:e.files.length===1?`${r("{{count}} file",{count:e.files.length.toString()})} • ${V(x)}`:`${r("{{count}} files",{count:e.files.length.toString()})} • ${V(x)}`}),o.jsxs(J,{children:[o.jsx(X,{$isRTL:i,children:e.files.map((n,S)=>o.jsx(ee,{children:o.jsx(E,{thumbnailDataKey:n.thumbnailDataKey,dataKey:n.dataKey,src:`${D}${n.thumbnailDataKey||n.dataKey}`,alt:r("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},S))}),e.files.length>3&&o.jsx(U,{$isRTL:i})]}),o.jsx(Z,{$isRTL:i,children:m!=="NoPassword"&&o.jsx(B,{children:o.jsx("span",{children:y(m)})})}),P==!1&&o.jsx(he,{folder:e,openFilePicker:p,cognitoUsername:l,updateProfileIds:n=>b(e.folderId,n),onModalStateChange:n=>z(e.folderId,n)}),L.length>0&&o.jsx(ye,{$isRTL:i,children:o.jsxs($e,{$isRTL:i,children:[r("Shared with"),": ",L.join(", ")]})})]})})},e.folderId)})})};export{Pe as A,E as L,Le as S};
