import{u as H,j as e,g as J,r as a,a9 as ee,k as te,i as u,R as ge,I as me,l as ce,G as xe,A as ye}from"./styled-components-CN2E2_K9.js";import{h as pe,c as we,e as X,i as ae,b as be,u as Z,f as Ie,g as Ce,p as ve,d as Pe}from"./utils-BLSZNlK8.js";import{L as Se,D as je}from"./DebugLog-Dsu5GUny.js";import{L as ke,S as Fe}from"./LazyImage-C1hq5A2q.js";import{d as De,U as Le,F as Ae}from"./FileInput-B-kJZSED.js";import{C as Te,a as Re}from"./Modals-DPt9ZNEv.js";const $e=({publicUsername:t,cognitoUsername:k})=>{const{t:j,language:w}=H(),g=J(w)==="rtl",F=k?encodeURIComponent(k):"";return e.jsx(e.Fragment,{children:e.jsx("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:20,marginBottom:24,width:"100%",direction:g?"rtl":"ltr"},children:t&&e.jsxs(e.Fragment,{children:[e.jsxs("a",{href:`profile.html?id=${F}`,style:{fontSize:"14px",color:"#2196f3",textDecoration:"none",display:"flex",alignItems:"center",gap:"6px"},children:[e.jsx("span",{style:{fontSize:"16px",lineHeight:1},children:"👤"}),t||j("Profile")]}),e.jsx(Se,{t:j})]})})})},_e=({isUploading:t,openFilePicker:k,t:j})=>e.jsx("div",{style:{display:"flex",alignItems:"center",marginBottom:24,width:"100%"},children:e.jsx("button",{onClick:()=>k(null),style:{fontSize:"14px",padding:"8px 16px",backgroundColor:"#007bff",color:"white",border:"none",borderRadius:"6px",cursor:"pointer",opacity:t?.6:1,pointerEvents:t?"none":"auto"},disabled:t,children:j(t?"Uploading...":"Create Album")})}),Ee=({folders:t,onFilterChange:k,resetFilter:j})=>{const{t:w,language:g}=H(),F=J(g)==="rtl",[i,z]=a.useState([]),[l,h]=a.useState([]),[_,D]=a.useState([]);a.useEffect(()=>{const o=new Map;t.forEach(r=>{if(r.contacts){const d=r.updatedAt?new Date(r.updatedAt).getTime():r.createdAt?new Date(r.createdAt).getTime():0;Object.values(r.contacts).forEach(b=>{if(typeof b=="string"&&!b.toString().startsWith("Profile-")){const p=o.get(b);(!p||d>p.timestamp)&&o.set(b,{name:b,timestamp:d})}})}});const n=Array.from(o.values()).sort((r,d)=>d.timestamp-r.timestamp).map(r=>r.name);z(n),D(n)},[t]);const R=o=>{let n;if(l.includes(o)?n=l.filter(r=>r!==o):n=[...l,o],h(n),n.length===0)j(),D(i);else{const r=t.filter(d=>{if(!d.contacts)return!1;const b=Object.values(d.contacts).filter(p=>typeof p=="string"&&!p.toString().startsWith("Profile-"));return n.every(p=>b.includes(p))});A(r),k(r)}},A=o=>{const n=new Set;o.forEach(d=>{d.contacts&&Object.values(d.contacts).forEach(b=>{typeof b=="string"&&!b.toString().startsWith("Profile-")&&n.add(b)})}),l.forEach(d=>{n.add(d)});const r=i.filter(d=>n.has(d));D(r)};return i.length===0?null:e.jsxs("div",{style:{width:"100%",marginBottom:24,direction:F?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:F?"row-reverse":"row",gap:12,overflowX:"auto",paddingBottom:8,WebkitOverflowScrolling:"touch",flexWrap:"nowrap"},children:[e.jsxs("div",{style:{fontSize:14,color:"#555",whiteSpace:"nowrap",display:"flex",alignItems:"center",height:"40px",flexShrink:0,padding:F?"0 0 0 4px":"0 4px 0 0"},children:[w("Filter"),":"]}),_.map(o=>e.jsx("button",{onClick:()=>R(o),style:{padding:"6px 12px",borderRadius:16,fontSize:13,cursor:"pointer",border:"1px solid #ddd",backgroundColor:l.includes(o)?"#2196f3":"#fff",color:l.includes(o)?"#fff":"#333",whiteSpace:"nowrap",transition:"all 0.2s ease",flexShrink:0,height:"40px"},children:o},o))]}),l.length>1&&e.jsxs("div",{style:{marginTop:8,fontSize:13,color:"#555",fontStyle:"italic",textAlign:F?"right":"left"},children:[w("Showing albums with all")," ",l.length," ",w("selected contacts")]}),e.jsx("style",{children:`
          div::-webkit-scrollbar {
            display: none;
          }
        `})]})},Ne=({folder:t,openFilePicker:k,cognitoUsername:j,updateProfileIds:w})=>{const{t:g,language:F}=H(),i=J(F)==="rtl",[z,l]=a.useState(!1),[h,_]=a.useState(!1),[D,R]=a.useState(t.profileIds||[]),A=j?`${j}_____Public____Profile`:"",o=D.includes(A),r=`https://6180.io/photos.html?id=${pe(t.folderId).replace(/-/g,"")}`;a.useEffect(()=>{R(t.profileIds||[])},[t.profileIds]);const d=x=>{navigator.clipboard.writeText(x).then(()=>{l(!1),_(!0)}).catch(N=>{console.error("Failed to copy link:",N),alert(g("Failed to copy link"))})},b=async x=>{if(x.preventDefault(),x.stopPropagation(),!await we()){alert(g("You must be logged in to download photos"));return}if(t&&t.files&&t.files.length>0){const E=t.files.map((L,Q)=>{const Y=L.dataKey.toLowerCase().endsWith(".mp4")?"video":"image";return{url:`${ee}${L.dataKey}`,thumbnailUrl:L.thumbnailDataKey?`${ee}${L.thumbnailDataKey}`:void 0,type:Y,index:Q,id:`file-${Q}`,fileId:L.dataKey,loaded:!1}}),s={mediaItems:E,folderName:t.folderName||"Album"};De(s,g,L=>{window.open(E[L].url,"_blank")})}else alert(g("No items to download"))},p=async x=>{var N,E,s;if(x.preventDefault(),x.stopPropagation(),!j){alert(g("You must be logged in to perform this action"));return}try{const c=await X();if(!c){console.error("Authentication failed");return}const L=[...D];if(o){const G=L.indexOf(A);G>-1&&L.splice(G,1)}else L.push(A);const M=await(await fetch(te,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${c}`},body:JSON.stringify({query:`
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
      `,variables:{folderPositionChangeProfileIdsInput:{folderId:t.folderId,profileIds:L}}})})).json();if(M.errors)throw new Error(((N=M.errors[0])==null?void 0:N.message)||"Unknown error");const B=(((s=(E=M==null?void 0:M.data)==null?void 0:E.changeFiles)==null?void 0:s.items)||[]).find(G=>G.id===t.folderPositionId);B&&B.profileIds&&(R(B.profileIds),w&&w(B.profileIds),console.log("Album visibility updated successfully"))}catch(c){console.error("Failed to toggle album visibility:",c),alert(g("Failed to update album visibility. Please try again."))}},U={padding:"8px 12px",border:"none",borderRadius:6,cursor:"pointer",fontSize:14,textAlign:"center",whiteSpace:"nowrap",flexShrink:0};return e.jsx(e.Fragment,{children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginTop:16,flexDirection:i?"row-reverse":"row"},children:[e.jsx("div",{style:{display:"flex",width:"100%",overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none",WebkitOverflowScrolling:"touch",flexDirection:i?"row-reverse":"row",gap:"10px"},children:e.jsxs("div",{style:{display:"flex",gap:"10px",flexDirection:i?"row-reverse":"row"},children:[e.jsx("button",{onClick:x=>{x.preventDefault(),x.stopPropagation(),k(t.folderId)},style:{...U,backgroundColor:"#4caf50",color:"white"},children:g("Add Photos")}),e.jsx("button",{onClick:b,style:{...U,backgroundColor:"#e0e0e0"},children:g("Download")}),e.jsx("button",{onClick:x=>{x.preventDefault(),x.stopPropagation(),l(!0)},style:{...U,backgroundColor:"#e0e0e0"},children:g("Copy Link")}),e.jsx("button",{onClick:p,style:{...U,backgroundColor:o?"#4caf50":"#e0e0e0",color:o?"white":"inherit"},children:g(o?"On Public Profile":"Not On Public Profile")})]})}),e.jsx(Te,{isOpen:z,onClose:()=>l(!1),inviteLink:r,onCopy:d,t:g,isRTL:i}),e.jsx(Re,{isOpen:h,onClose:()=>_(!1),t:g,isRTL:i}),e.jsx("style",{children:`
            div::-webkit-scrollbar {
              display: none;
            }
          `})]})})},Ue=u.div`
  margin-bottom: 30px;
  width: 100%;
  direction: ${t=>t.isRTL?"rtl":"ltr"};
`,Oe=u.a`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  overflow: hidden;
`,ze=u.div`
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
`,Me=u.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
  flex-direction: ${t=>t.isRTL?"row-reverse":"row"};
`,We=u.div`
  display: flex;
  flex-direction: column;
  align-items: ${t=>t.isRTL?"flex-end":"flex-start"};
`,Ke=u.h2`
  font-size: 20px;
  margin: 0;
  color: #222;
`,Be=u.div`
  font-size: 13px;
  color: #777;
  text-align: ${t=>t.isRTL?"right":"left"};
  margin-top: 4px;
`,Ge=u.div`
  display: flex;
  flex-direction: column;
  align-items: ${t=>t.isRTL?"flex-start":"flex-end"};
  justify-content: flex-end;
  gap: 8px;
`,Ve=u.div`
  position: relative;
`,Qe=u.a`
  font-size: 13px;
  color: #2196f3;
  text-decoration: none;
`,He=u.a`
  font-size: 13px;
  color: #d32f2f;
  text-decoration: none;
`,Je=u.div`
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
`,de=u.a`
  display: block;
  padding: 8px 16px;
  color: ${t=>t.isDelete?"#d32f2f":"#2196f3"};
  text-decoration: none;
  font-size: 13px;
  white-space: nowrap;
`,Ye=u.div`
  margin-top: 8px;
  margin-bottom: 16px;
  font-size: 12px;
  color: #555;
  line-height: 1.5;
  text-align: ${t=>t.isRTL?"right":"left"};
  white-space: pre-wrap;
`,qe=u.div`
  width: 100%;
  position: relative;
`,Xe=u.div`
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding-bottom: 8px;
  ms-overflow-style: none;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
  max-width: 100%;
  flex-direction: ${t=>t.isRTL?"row-reverse":"row"};
`,Ze=u.div`
  position: absolute;
  ${t=>t.isRTL?"left":"right"}: 0;
  top: 0;
  bottom: 8px;
  width: 30px;
  background: ${t=>t.isRTL?"linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))":"linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))"};
  pointer-events: none;
`,et=u.div`
  display: flex;
  justify-content: ${t=>t.isRTL?"flex-start":"flex-end"};
  margin-top: 8px;
  margin-bottom: 8px;
`,tt=u.div`
  display: flex;
  align-items: center;
  font-size: 10px;
  color: #555;
  font-style: italic;
`,ot=u.div`
  width: 100%;
  background-color: #f0f7ff;
  border-radius: 8px;
  padding: 12px 16px;
  margin-top: 16px;
  box-sizing: border-box;
  border: 1px solid #d0e1f9;
  direction: ${t=>t.isRTL?"rtl":"ltr"};
`,st=u.p`
  margin: 0;
  font-size: 14px;
  color: #333;
  text-align: ${t=>t.isRTL?"right":"left"};
`,it=u.p`
  font-size: 16px;
  color: #555;
  width: 100%;
`,nt=u.div`
  width: 160px;
  height: 100px;
  flex-shrink: 0;
`,rt=({folders:t,setFolders:k,handleDeleteClick:j,openFilePicker:w,isUploading:g,cognitoUsername:F})=>{const{t:i,language:z}=H(),l=J(z)==="rtl",h=a.useRef(null);a.useEffect(()=>{function o(){h.current&&(h.current.style.display="none",h.current=null)}function n(){o()}return window.addEventListener("scroll",n,!0),()=>{window.removeEventListener("scroll",n,!0)}},[]);const _=(o,n)=>{o.preventDefault(),o.stopPropagation(),h.current&&h.current!==n&&(h.current.style.display="none");const r=n.style.display==="block";n.style.display=r?"none":"block",h.current=r?null:n},D=o=>{h.current&&(h.current.style.display="none",h.current=null),window.confirm(i("Are you sure you want to delete this album? This action cannot be undone."))&&j(o)},R=(o,n)=>{k(r=>r.map(d=>d.folderId===o?{...d,profileIds:n}:d))},A=o=>{switch(o){case"NotVisible":return i("Hidden");case"Watermark":return i("Watermarked");case"CannotBeSaved":return i("Cannot be saved");case"NoPassword":default:return i("No password")}};return t.length===0&&!g?e.jsx(it,{children:i("No albums found")}):e.jsx(e.Fragment,{children:t.map(o=>{var E;const n=o.createdAt!=null,r=o.updatedAt!=null&&o.updatedAt!==o.createdAt,d=o.creatorId===`${F}_____${F}____Account`,b=((E=o.folderPassword)==null?void 0:E.policy)||"NoPassword",p=o.contacts||{},U=Object.values(p).filter(s=>s&&typeof s=="string"&&!s.toString().startsWith("Profile-")),N=`https://6180.io/photos.html?id=${pe(o.folderId).replace(/-/g,"")}`;return e.jsx(Ue,{isRTL:l,children:e.jsx(Oe,{href:N,children:e.jsxs(ze,{children:[e.jsxs(Me,{isRTL:l,children:[e.jsxs(We,{isRTL:l,children:[e.jsx(Ke,{children:o.folderName||""}),(n||r)&&e.jsxs(Be,{isRTL:l,children:[n&&e.jsxs("div",{children:[i("Created"),": ",ae(o.createdAt)]}),r&&e.jsxs("div",{children:[i("Updated"),": ",ae(o.updatedAt)]})]})]}),e.jsx(Ge,{isRTL:l,children:d?e.jsxs(Ve,{children:[e.jsx(Qe,{href:"#",onClick:s=>{const c=s.currentTarget.nextElementSibling;c&&_(s,c)},children:i("Edit")}),e.jsxs(Je,{isRTL:l,onClick:s=>{s.stopPropagation()},children:[e.jsx(de,{href:`/save-album.html?folderId=${encodeURIComponent(o.folderId)}`,onClick:s=>{s.stopPropagation()},children:i("Edit Details")}),e.jsx(de,{href:"#",isDelete:!0,onClick:s=>{s.preventDefault(),s.stopPropagation(),D(o.folderPositionId)},children:i("Delete My Copy")})]})]}):e.jsx(He,{href:"#",onClick:s=>{s.preventDefault(),s.stopPropagation(),D(o.folderPositionId)},children:i("Delete")})})]}),o.folderDescription&&o.folderDescription.length>1&&e.jsx(Ye,{isRTL:l,children:o.folderDescription}),e.jsxs(qe,{children:[e.jsx(Xe,{isRTL:l,children:o.files.map((s,c)=>e.jsx(nt,{children:e.jsx(ke,{thumbnailDataKey:s.thumbnailDataKey,dataKey:s.dataKey,src:`${ee}${s.thumbnailDataKey||s.dataKey}`,alt:i("Thumbnail"),style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},c))}),o.files.length>3&&e.jsx(Ze,{isRTL:l})]}),e.jsx(et,{isRTL:l,children:b!=="NoPassword"&&e.jsx(tt,{children:e.jsx("span",{children:A(b)})})}),e.jsx(Ne,{folder:o,openFilePicker:w,cognitoUsername:F,updateProfileIds:s=>R(o.folderId,s)}),U.length>0&&e.jsx(ot,{isRTL:l,children:e.jsxs(st,{isRTL:l,children:[i("Shared with"),": ",U.join(", ")]})})]})})},o.folderId)})})},lt=()=>{const[t,k]=a.useState([]),[j,w]=a.useState([]),[g,F]=a.useState(null),[i,z]=a.useState(null),l=a.useRef(null),[h,_]=a.useState([]),[D,R]=a.useState(!1),[A,o]=a.useState({totalFiles:0,filesComplete:0,filesUploading:0,filesProcessing:0,filesWithError:0,overallProgress:0}),[n,r]=a.useState([]),[d,b]=a.useState(null),[p,U]=a.useState(""),[x,N]=a.useState(!1),[E,s]=a.useState(!1),c=be(r);a.useEffect(()=>{F(localStorage.getItem("publicUsername")||null),(async()=>{const f=await X();if(f){try{const I=JSON.parse(atob(f.split(".")[1]))["cognito:username"];z(I)}catch(y){console.error("Failed to decode token",y)}await Y(f)}})()},[]),a.useEffect(()=>{x||w(t)},[t,x]),a.useEffect(()=>{if(p===""){x||w(t);return}const f=(x?j:t).filter(y=>{var C,$;const I=(C=y.folderName)==null?void 0:C.toLowerCase().includes(p.toLowerCase()),v=($=y.folderDescription)==null?void 0:$.toLowerCase().includes(p.toLowerCase());return I||v});w(f)},[p,t,x]),a.useEffect(()=>{if(E&&h.length>0){const m=h.filter(y=>y.status==="complete").length,f=h.filter(y=>y.status==="error").length;c(`✅ Upload complete: ${m} successful, ${f} failed`),setTimeout(()=>{d?window.location.href=`/save-album.html?folderId=${encodeURIComponent(d)}`:window.location.href="/save-album.html",M()},1e3)}},[E,h.length,d]);const L=m=>{N(!0),w(m),p&&w(f=>f.filter(y=>{var C,$;const I=(C=y.folderName)==null?void 0:C.toLowerCase().includes(p.toLowerCase()),v=($=y.folderDescription)==null?void 0:$.toLowerCase().includes(p.toLowerCase());return I||v}))},Q=()=>{N(!1),w(p?t.filter(m=>{var I,v;const f=(I=m.folderName)==null?void 0:I.toLowerCase().includes(p.toLowerCase()),y=(v=m.folderDescription)==null?void 0:v.toLowerCase().includes(p.toLowerCase());return f||y}):t)},Y=async m=>{var I,v;const f=`
      mutation FetchRelations($fetchRelationsInput: FetchRelationsInput!) {
        fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
          items {
            ... on FolderPosition {
              id
              profileIds
              folder {
                id
                folderName
                folderDescription
                creatorId                
                folderPassword {
                  password
                  policy
                }
                fileReferencesPage {
                  items {
                    file {
                      ownerContactId
                      dataKey
                      thumbnailDataKey
                      durationInSeconds
                    }
                  }
                }
                contactsUsingInvite {
                  items {
                    id
                    item {
                      ... on Persona {
                        publicDisplayName
                      }
                    }
                  }
                }
                folderInviteParameters {
                  usingFolderInviteGrantsRightToAddItems
                }
              }
            }
          }
        }
      }
    `,y={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:50,scanIndexForward:!1}};try{const $=await(await fetch(te,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${m}`},body:JSON.stringify({query:f,variables:y})})).json(),P=(((v=(I=$==null?void 0:$.data)==null?void 0:I.fetchRelations)==null?void 0:v.items)||[]).map(K=>{var se,ie,ne,re;const S=K.folder,he=((ie=(se=S==null?void 0:S.fileReferencesPage)==null?void 0:se.items)==null?void 0:ie.map(T=>T.file))||[],oe={};return(ne=S==null?void 0:S.contactsUsingInvite)!=null&&ne.items&&S.contactsUsingInvite.items.forEach(T=>{var le;T!=null&&T.id&&((le=T==null?void 0:T.item)!=null&&le.publicDisplayName)&&(oe[T.id]=T.item.publicDisplayName)}),{folderPositionId:K.id,folderId:S.id,folderName:S.folderName,folderDescription:S.folderDescription,folderPassword:S.folderPassword,creatorId:S.creatorId,createdAt:S.createdAt,updatedAt:S.updatedAt,files:he.filter(T=>T&&T.dataKey),profileIds:K.profileIds||[],contacts:oe,usingFolderInviteGrantsRightToAddItems:((re=S==null?void 0:S.folderInviteParameters)==null?void 0:re.usingFolderInviteGrantsRightToAddItems)||!1}});k(P)}catch(C){console.error("Failed to load folders:",C),c(`❌ Failed to fetch folders: ${String(C)}`)}};a.useEffect(()=>{Z(h,o)},[h]);const M=()=>{Ie(_,o,[],c),R(!1),s(!1)},q=(m=null)=>{var f;b(m),_([]),s(!1),(f=l.current)==null||f.click()},B=Pe(_),G=async m=>{const f=Array.from(m.target.files||[]);if(!f.length)return;if(R(!0),s(!1),!await X()){c("❌ Authentication failed"),R(!1);return}if(!i){c("❌ Missing Cognito Username"),R(!1);return}try{const I=d||`${i}_____${Ce()}____Folder`;c(`📁 Using folder ID: ${I}`),_(f.map(P=>({fileName:P.name,s3PreviewUrl:URL.createObjectURL(P),type:P.type,size:P.size,status:"pending",progress:0})));const v=setInterval(()=>{Z(h,o)},500),C=await ve(f,i,B,c);clearInterval(v),Z(C,o),localStorage.setItem(ce.SELECTED_PHOTOS,JSON.stringify(C)),c(`📸 Saved ${C.length} photos metadata to storage`);const $=C.every(P=>P.status==="complete"),O=C.some(P=>P.status==="error");if($&&!O)c(`✅ All ${C.length} files successfully uploaded`);else if(O){const P=C.filter(K=>K.status==="error").length;c(`⚠️ Upload completed with ${P} errors`)}s(!0)}catch(I){c(`❌ Fatal error in handleFileSelection: ${String(I)}`),R(!1)}finally{m.target&&(m.target.value="")}},fe=async m=>{var f,y,I;try{console.log("Deleting album with id:",m);const v=await X();if(!v){console.error("Authentication failed");return}const O=await(await fetch(te,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${v}`},body:JSON.stringify({query:`
        mutation DeleteFolderPosition($deletedFolderPositionIds: [ID!]) {
          changeFiles(deletedFolderPositionIds: $deletedFolderPositionIds) {
            items {
              ... on IdObject {
                id
              }
            }
          }
        }
      `,variables:{deletedFolderPositionIds:[m]}})})).json();if((y=(f=O==null?void 0:O.data)==null?void 0:f.changeFiles)!=null&&y.items)c(`✅ Successfully deleted folder position ${m}`),k(P=>P.filter(K=>K.folderPositionId!==m));else if(O.errors){const P=((I=O.errors[0])==null?void 0:I.message)||"Unknown GraphQL error";throw c(`❌ Failed to delete folder: ${P}`),new Error(P)}}catch(v){c(`❌ Failed to delete folder: ${String(v)}`),console.error("Failed to delete folder:",v),alert(W("Failed to delete album. Please try again."))}},{t:W,language:ue}=H(),V=J(ue)==="rtl";return e.jsxs(e.Fragment,{children:[e.jsx(xe,{}),e.jsxs(ye,{isRTL:V,children:[e.jsx("div",{style:{maxWidth:900,margin:"0 auto"},children:e.jsxs("div",{style:{width:"100%"},children:[e.jsx($e,{publicUsername:g,isUploading:D,openFilePicker:q,cognitoUsername:i}),e.jsx(_e,{isUploading:D,openFilePicker:q,t:W,isRTL:V}),e.jsx(Fe,{searchQuery:p,setSearchQuery:U,t:W,isRTL:V}),e.jsx(Ee,{folders:t,onFilterChange:L,resetFilter:Q}),D&&e.jsxs("div",{style:{width:"100%",marginBottom:"20px"},children:[e.jsx(Le,{progressTracker:A,t:W,isRTL:V}),A.filesComplete>0&&A.filesComplete===A.totalFiles&&e.jsx("div",{style:{backgroundColor:"#e8f5e9",color:"#2e7d32",padding:"10px 16px",borderRadius:"6px",fontSize:"14px",marginTop:"10px",textAlign:"center"},children:W("Upload complete! Preparing to save your album...")}),A.filesWithError>0&&e.jsx("div",{style:{backgroundColor:"#ffebee",color:"#c62828",padding:"10px 16px",borderRadius:"6px",fontSize:"14px",marginTop:"10px",textAlign:"center"},children:W("Some files could not be uploaded. You can continue with the successfully uploaded files.")})]}),e.jsx(rt,{folders:j,setFolders:k,handleDeleteClick:fe,openFilePicker:q,isUploading:D,cognitoUsername:i}),e.jsx(Ae,{onFileSelection:G,ref:l})]})}),e.jsx(je,{debugMessages:n,t:W,isRTL:V,textDirection:V?"rtl":"ltr"})]})]})};ge.createRoot(document.getElementById("root")).render(e.jsx(me,{initialLanguage:localStorage.getItem(ce.LANGUAGE)||"en",children:e.jsx(lt,{})}));
