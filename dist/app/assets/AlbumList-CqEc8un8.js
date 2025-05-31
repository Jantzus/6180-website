import{j as o,a as w,S,u as ee,t as _,c as oe,h as ne,f as ie,g as te,d as l,F as N,b as se}from"./utils-BJzWXlCI.js";import{C as re,a as ae,d as le}from"./fileOperations-Bfkiib7P.js";import{at as de,au as z,av as B,aw as ce,ax as pe}from"./styled-components-B1w7c1Rq.js";const Ie=({searchQuery:t,setSearchQuery:u,t:h,isRTL:d})=>o.jsx("div",{style:{width:"100%",marginBottom:24,boxSizing:"border-box",direction:d?"rtl":"ltr"},children:o.jsx("input",{type:"text",placeholder:h("Search album title or description"),value:t,onChange:s=>u(s.target.value),style:{width:"100%",padding:"10px 16px",fontSize:"14px",border:"1px solid #ddd",borderRadius:"6px",outline:"none",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",boxSizing:"border-box"}})}),E=({src:t,alt:u,style:h,thumbnailDataKey:d,dataKey:s,bucketUrl:g=S,...b})=>{const[a,v]=w.useState(!1),[i,p]=w.useState(""),[C,y]=w.useState(!1);w.useEffect(()=>{v(!1);let e="",r=!1;d&&d.length>0?(e=`${g}${d}`,r=!0):s&&s.length>0?(e=`${g}${s}`,r=!0):t&&t.length>0&&(e=t,r=!0),p(e),y(r)},[d,s,t,g]);const T=()=>{v(!0)},$=e=>{console.error("Image load error:",e),d&&s&&d!==s&&i===`${g}${d}`?(console.log("Falling back to full image"),p(`${g}${s}`)):y(!1)};return C?o.jsx("img",{src:i,alt:u,style:{...h,opacity:a?1:.3,transition:"opacity 0.3s ease-in-out"},onLoad:T,onError:$,...b}):null},O=({folder:t,openFilePicker:u,cognitoUsername:h,updateProfileIds:d})=>{const{t:s,language:g}=ee(),b=te(g)==="rtl",[a,v]=w.useState(!1),[i,p]=w.useState(!1),[C,y]=w.useState(t.profileIds||[]),T=h?`${h}_____Public____Profile`:"",$=C.includes(T),e=_(t.folderId,t.albumNanoId,t.creatorId&&t.contacts&&t.contacts[t.creatorId]?t.contacts[t.creatorId]:"album",t.folderName);w.useEffect(()=>{y(t.profileIds||[])},[t.profileIds]);const r=c=>{navigator.clipboard.writeText(c).then(()=>{v(!1),p(!0)}).catch(j=>{console.error("Failed to copy link:",j),alert(s("Failed to copy link"))})},f=async c=>{if(c.preventDefault(),c.stopPropagation(),!await oe()){alert(s("You must be logged in to download photos"));return}if(t&&t.files&&t.files.length>0){const I=t.files.map((n,P)=>{const F=n.dataKey.toLowerCase().endsWith(".mp4")?"video":"image";return{url:`${S}${n.dataKey}`,thumbnailUrl:n.thumbnailDataKey?`${S}${n.thumbnailDataKey}`:void 0,type:F,index:P,id:`file-${P}`,fileId:n.dataKey,loaded:!1}}),R={mediaItems:I,folderName:t.folderName||"Album"};le(R,s,n=>{window.open(I[n].url,"_blank")})}else alert(s("No items to download"))},m=async c=>{var j,I,R;if(c.preventDefault(),c.stopPropagation(),!h){alert(s("You must be logged in to perform this action"));return}try{const L=await ne();if(!L){console.error("Authentication failed");return}const n=[...C];if($){const A=n.indexOf(T);A>-1&&n.splice(A,1)}else n.push(T);const k=await(await fetch(ie,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${L}`},body:JSON.stringify({query:`
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
      `,variables:{folderPositionChangeProfileIdsInput:{folderId:t.folderId,profileIds:n}}})})).json();if(k.errors)throw new Error(((j=k.errors[0])==null?void 0:j.message)||"Unknown error");const D=(((R=(I=k==null?void 0:k.data)==null?void 0:I.changeFiles)==null?void 0:R.items)||[]).find(A=>A.id===t.folderPositionId);D&&D.profileIds&&(y(D.profileIds),d&&d(D.profileIds),console.log("Album visibility updated successfully"))}catch(L){console.error("Failed to toggle album visibility:",L),alert(s("Failed to update album visibility. Please try again."))}},x={padding:"8px 12px",border:"none",borderRadius:6,cursor:"pointer",fontSize:14,textAlign:"center",whiteSpace:"nowrap",flexShrink:0};return o.jsx(o.Fragment,{children:o.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:16,flexDirection:b?"row-reverse":"row"},children:[o.jsx("div",{style:{display:"flex",width:"100%",overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none",WebkitOverflowScrolling:"touch",flexDirection:b?"row-reverse":"row",gap:"10px"},children:o.jsxs("div",{style:{display:"flex",gap:"10px",flexDirection:b?"row-reverse":"row"},children:[u&&o.jsx("button",{onClick:c=>{c.preventDefault(),c.stopPropagation(),u(t.folderId)},style:{...x,backgroundColor:"#4caf50",color:"white"},children:s("Add Photos")}),o.jsx("button",{onClick:f,style:{...x,backgroundColor:"#e0e0e0"},children:s("Download")}),o.jsx("button",{onClick:c=>{c.preventDefault(),c.stopPropagation(),v(!0)},style:{...x,backgroundColor:"#e0e0e0"},children:s("Copy Link")}),o.jsx("button",{onClick:m,style:{...x,backgroundColor:$?"#4caf50":"#e0e0e0",color:$?"white":"inherit"},children:s($?"On Public Profile":"Not On Public Profile")})]})}),o.jsx(re,{isOpen:a,onClose:()=>v(!1),inviteLink:e,onCopy:r,t:s,isRTL:b}),o.jsx(ae,{isOpen:i,onClose:()=>p(!1),t:s,isRTL:b}),o.jsx("style",{children:`
            div::-webkit-scrollbar {
              display: none;
            }
          `})]})})},M=t=>{if(t===0)return"0 B";const u=1024,h=["B","KB","MB","GB","TB"],d=Math.floor(Math.log(t)/Math.log(u));return`${Math.round(t/Math.pow(u,d)*100)/100} ${h[d]}`},ue=t=>t.reduce((u,h)=>u+(h.dataInBytes||0),0),V=l.div`
  margin-bottom: 30px;
  width: 100%;
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
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
  flex-direction: ${t=>t.$isRTL?"row-reverse":"row"};
`,H=l.div`
  display: flex;
  flex-direction: column;
  align-items: ${t=>t.$isRTL?"flex-end":"flex-start"};
`,Q=l.h2`
  font-size: 20px;
  margin: 0;
  color: #222;
`,he=l.div`
  display: flex;
  flex-direction: column;
  align-items: ${t=>t.$isRTL?"flex-start":"flex-end"};
  justify-content: flex-end;
  gap: 8px;
`,xe=l.div`
  position: relative;
`,ge=l.button`
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
`,fe=l.button`
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
`,be=l.div`
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
`,Y=l.button`
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
  flex-direction: ${t=>t.$isRTL?"row-reverse":"row"};
`,X=l.div`
  position: absolute;
  ${t=>t.$isRTL?"left":"right"}: 0;
  top: 0;
  bottom: 8px;
  width: 30px;
  background: ${t=>t.$isRTL?"linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))":"linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))"};
  pointer-events: none;
`,U=l.div`
  display: flex;
  justify-content: ${t=>t.$isRTL?"flex-start":"flex-end"};
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
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
`,we=l.p`
  margin: 0;
  font-size: 14px;
  color: #333;
  text-align: ${t=>t.$isRTL?"right":"left"};
`,Z=l.div`
  width: 160px;
  height: 100px;
  flex-shrink: 0;
`,Le=({folders:t,setFolders:u,handleDeleteClick:h,openFilePicker:d,isUploading:s=!1,cognitoUsername:g,isProfileView:b=!1})=>{const{t:a,language:v}=ee(),i=te(v)==="rtl",p=w.useRef(null);w.useEffect(()=>{function e(){p.current&&(p.current.style.display="none",p.current=null)}function r(){e()}return window.addEventListener("scroll",r,!0),()=>{window.removeEventListener("scroll",r,!0)}},[]);const C=(e,r)=>{e.preventDefault(),e.stopPropagation(),p.current&&p.current!==r&&(p.current.style.display="none");const f=r.style.display==="block";r.style.display=f?"none":"block",p.current=f?null:r},y=e=>{p.current&&(p.current.style.display="none",p.current=null),window.confirm(a("Are you sure you want to delete this album? This action cannot be undone."))&&h&&h(e,a)},T=(e,r)=>{u&&u(f=>f.map(m=>m.folderId===e?{...m,profileIds:r}:m))},$=e=>{switch(e){case"NotVisible":return a("Hidden");case"Watermark":return a("Watermarked");case"CannotBeSaved":return a("Cannot be saved");case"NoPassword":default:return a("No password")}};return t.length===0&&!s?o.jsx(de,{$type:"empty",children:o.jsx("p",{children:a("No albums found")})}):b?o.jsx(o.Fragment,{children:t.map(e=>{var m;const r=((m=e.folderPassword)==null?void 0:m.policy)||"NoPassword",f=_(e.folderId,e.albumNanoId||null,e.creatorId&&e.contacts&&e.contacts[e.creatorId],e.folderName);return o.jsx(V,{$isRTL:i,children:o.jsx(W,{href:f,children:o.jsxs(K,{children:[o.jsx(G,{$isRTL:i,children:o.jsx(H,{$isRTL:i,children:o.jsx(Q,{children:e.folderName||""})})}),e.folderDescription&&e.folderDescription.length>1&&o.jsx(z,{$isRTL:i,children:e.folderDescription}),o.jsxs(q,{children:[o.jsx(J,{$isRTL:i,children:e.files.map((x,c)=>o.jsx(Z,{children:o.jsx(E,{thumbnailDataKey:x.thumbnailDataKey,dataKey:x.dataKey,src:`${S}${x.thumbnailDataKey||x.dataKey}`,alt:a("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},c))}),e.files.length>3&&o.jsx(X,{$isRTL:i})]}),o.jsx(U,{$isRTL:i,children:r!=="NoPassword"&&o.jsx(B,{children:o.jsx("span",{children:$(r)})})})]})})},e.folderId)})}):o.jsx(o.Fragment,{children:t.map(e=>{var L;const r=e.createdAt!=null,f=e.updatedAt!=null&&e.createdAt!=null&&e.updatedAt!==e.createdAt,m=e.creatorId===`${g}_____${g}____Account`,x=((L=e.folderPassword)==null?void 0:L.policy)||"NoPassword",c=e.contacts||{},j=Object.values(c).filter(n=>n&&typeof n=="string"&&!n.toString().startsWith("Profile-")),I=ue(e.files),R=_(e.folderId,e.albumNanoId||null,e.creatorId&&e.contacts&&e.contacts[e.creatorId],e.folderName);return o.jsx(V,{$isRTL:i,children:o.jsx(W,{href:R,children:o.jsxs(K,{children:[o.jsxs(G,{$isRTL:i,children:[o.jsxs(H,{$isRTL:i,children:[o.jsx(Q,{children:e.folderName||""}),(r||f)&&o.jsxs(ce,{$isRTL:i,children:[r&&e.createdAt&&N(e.createdAt)&&o.jsxs("div",{children:[a("Created"),": ",N(e.createdAt)]}),f&&e.updatedAt&&N(e.updatedAt)&&o.jsxs("div",{children:[a("Updated"),": ",N(e.updatedAt)]})]})]}),o.jsx(he,{$isRTL:i,children:m?o.jsxs(xe,{children:[o.jsx(ge,{onClick:n=>{const P=n.currentTarget.nextElementSibling;P&&C(n,P)},children:a("Edit")}),o.jsxs(be,{$isRTL:i,onClick:n=>{n.stopPropagation()},children:[o.jsx(Y,{$isRTL:i,onClick:n=>{n.stopPropagation(),window.location.href=se(`save-album.html?folderId=${encodeURIComponent(e.folderId)}`)},children:a("Edit Details")}),o.jsx(Y,{$isRTL:i,$isDelete:!0,onClick:n=>{n.preventDefault(),n.stopPropagation(),y(e.folderPositionId)},children:a("Delete My Copy")})]})]}):o.jsx(fe,{onClick:n=>{n.preventDefault(),n.stopPropagation(),y(e.folderPositionId)},children:a("Delete")})})]}),e.folderDescription&&e.folderDescription.length>1&&o.jsx(z,{$isRTL:i,children:e.folderDescription}),o.jsx(pe,{$isRTL:i,children:e.files.length===1?`${a("{{count}} file",{count:e.files.length.toString()})} • ${M(I)}`:`${a("{{count}} files",{count:e.files.length.toString()})} • ${M(I)}`}),o.jsxs(q,{children:[o.jsx(J,{$isRTL:i,children:e.files.map((n,P)=>o.jsx(Z,{children:o.jsx(E,{thumbnailDataKey:n.thumbnailDataKey,dataKey:n.dataKey,src:`${S}${n.thumbnailDataKey||n.dataKey}`,alt:a("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},P))}),e.files.length>3&&o.jsx(X,{$isRTL:i})]}),o.jsx(U,{$isRTL:i,children:x!=="NoPassword"&&o.jsx(B,{children:o.jsx("span",{children:$(x)})})}),b==!1&&O&&o.jsx(O,{folder:e,openFilePicker:d,cognitoUsername:g,updateProfileIds:n=>T(e.folderId,n)}),j.length>0&&o.jsx(me,{$isRTL:i,children:o.jsxs(we,{$isRTL:i,children:[a("Shared with"),": ",j.join(", ")]})})]})})},e.folderId)})})};export{Le as A,E as L,Ie as S};
