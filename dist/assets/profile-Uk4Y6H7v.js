import{d as r,R as te,j as e,u as z,r as a,g as G,k as Y,a as oe,I as re,l as q,a9 as ie,aa as ne,G as se,A as ae}from"./styled-components-TLcRmuEy.js";import{j as X,k as $,c as M,w as le}from"./utils-BpVmj93w.js";import{L as de,S as ce}from"./LazyImage-D1mw5-KI.js";import{C as pe,a as ue}from"./Modals-ZMMoxRDS.js";const fe=r.div`
  margin-bottom: 24px;
  text-align: center;
  direction: ${t=>t.isRTL?"rtl":"ltr"};
`,he=r.div`
  display: flex;
  align-items: center;
  justify-content: ${t=>t.isRTL?"flex-start":"flex-end"};
  margin-bottom: 8px;
  position: relative;
`,xe=r.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
`,ge=r.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #555;
  margin-right: 12px;
`,me=r.h1`
  font-size: 18px;
  margin: 0;
  font-weight: 600;
`,be=r.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #555;
  margin-left: 8px;
`,we=r.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 100;
  min-width: 180px;
  padding: 8px 0;
`,K=r.div`
  padding: 10px 16px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-bottom: ${t=>t.hasBorder?"1px solid #eee":"none"};
`,ye=r.div`
  margin-top: 12px;
  padding: 8px 12px;
  background-color: #f0f7ff;
  border-radius: 8px;
  border: 1px solid #cce0ff;
  max-width: 500px;
  font-size: 13px;
  margin: 0 auto;
  
  p {
    margin: 0;
  }
`,Ie=r.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  flex-direction: ${t=>t.isRTL?"row-reverse":"row"};
`,ve=r.div`
  display: flex;
  width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
  flex-direction: ${t=>t.isRTL?"row-reverse":"row"};
  gap: 10px;
`,Pe=r.div`
  display: flex;
  gap: 10px;
  flex-direction: ${t=>t.isRTL?"row-reverse":"row"};
`,U=r.button`
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  text-align: center;
  white-space: nowrap;
  flex-shrink: 0;
  
  background-color: ${t=>{switch(t.variant){case"primary":return"#2196f3";case"success":return"#4caf50";case"active":return"#4caf50";default:return"#e0e0e0"}}};
  
  color: ${t=>{switch(t.variant){case"primary":case"success":case"active":return"white";default:return"inherit"}}};
`,Z=r.div`
  text-align: center; 
  padding: 40px 20px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  
  p {
    font-size: 16px;
    color: #666;
  }
`,je=r.div`
  margin-bottom: 30px;
  width: 100%;
  direction: ${t=>t.isRTL?"rtl":"ltr"};
`,Ce=r.a`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  overflow: hidden;
`,_e=r.div`
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
`,Ae=r.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
  flex-direction: ${t=>t.isRTL?"row-reverse":"row"};
`,Le=r.div`
  display: flex;
  flex-direction: column;
  align-items: ${t=>t.isRTL?"flex-end":"flex-start"};
`,ke=r.h2`
  font-size: 20px;
  margin: 0;
  color: #222;
`,Re=r.div`
  font-size: 13px;
  color: #777;
  text-align: ${t=>t.isRTL?"right":"left"};
  margin-top: 4px;
`,Se=r.div`
  width: 100%;
  position: relative;
`,Fe=r.div`
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding-bottom: 8px;
  -ms-overflow-style: none;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
  max-width: 100%;
  flex-direction: ${t=>t.isRTL?"row-reverse":"row"};
`,Te=r.div`
  flex-shrink: 0;
`,De=r.div`
  position: absolute;
  ${t=>t.isRTL?"left":"right"}: 0;
  top: 0;
  bottom: 8px;
  width: 30px;
  background: ${t=>t.isRTL?"linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))":"linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))"};
  pointer-events: none;
`,Ee=r.div`
  display: flex;
  justify-content: ${t=>t.isRTL?"flex-start":"flex-end"};
  margin-top: 8px;
  margin-bottom: 8px;
`,Ne=r.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #555;
`,Oe=r.div`
  margin-top: 8px;
  margin-bottom: 16px;
  font-size: 14px;
  color: #555;
  line-height: 1.5;
  text-align: ${t=>t.isRTL?"right":"left"};
`,$e=r(Z)``,Ue=r.div`
  text-align: center;
  padding: 40px 20px;
  background-color: #fdeded;
  border-radius: 12px;
  border: 1px solid #f7d0d0;
  margin-bottom: 20px;
  
  p {
    font-size: 16px;
    color: #d32f2f;
  }
`;r.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
`;const ze=({username:t,isCurrentUser:h,isRTL:_})=>{const{t:u}=z(),[m,p]=a.useState(!1),c=s=>{s.preventDefault(),s.stopPropagation(),p(!m)};return a.useEffect(()=>{const s=()=>{m&&p(!1)};return document.addEventListener("click",s),()=>{document.removeEventListener("click",s)}},[m]),e.jsxs(fe,{isRTL:_,children:[e.jsxs(he,{isRTL:_,children:[e.jsxs(xe,{onClick:c,children:[e.jsx(ge,{children:t?t.charAt(0).toUpperCase():"?"}),e.jsx(me,{children:t||u("User Profile")}),e.jsx(be,{})]}),m&&e.jsxs(we,{children:[e.jsx(K,{hasBorder:!0,onClick:()=>{alert(u("Bio feature is coming soon! Stay tuned for updates where you can share more about yourself."))},children:e.jsx("span",{children:"Bio"})}),e.jsx(K,{hasBorder:!0,onClick:()=>{alert(u("Email feature is coming soon! Soon you will be able to share your email with connections."))},children:e.jsx("span",{children:"E-mail"})}),e.jsx(K,{onClick:()=>{alert(u("Add Contact feature is coming soon! You will be able to add this person as a contact on 6180."))},children:e.jsx("span",{children:"Contact On 6180"})})]})]}),h&&e.jsx(ye,{children:e.jsx("p",{children:u("This is how others see your public profile")})})]})},Be=({folder:t,isOwner:h,hasAddPhotoPermission:_,cognitoUsername:u,openFilePicker:m,updateProfileIds:p})=>{const{t:c,language:s}=z(),b=G(s)==="rtl",[v,o]=a.useState((t.profileIds||[]).includes(`${u}_____Public____Profile`)),[g,P]=a.useState(!1),[w,L]=a.useState(!1),j=X(t.folderId,t.albumNanoId,t.folderName),k=()=>{navigator.clipboard.writeText(j).then(()=>{P(!1),L(!0)}).catch(i=>{console.error("Failed to copy link:",i),alert(c("Failed to copy link"))})},R=async i=>{var S,C,E;if(i.preventDefault(),i.stopPropagation(),!u){alert(c("You must be logged in to perform this action"));return}try{const A=await M();if(!A){console.error("Authentication failed");return}const N=`${u}_____Public____Profile`,T=[...t.profileIds||[]];if(v){const d=T.indexOf(N);d>-1&&T.splice(d,1)}else T.push(N);const F=await(await fetch(Y,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${A}`},body:JSON.stringify({query:`
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
      `,variables:{folderPositionChangeProfileIdsInput:{folderId:t.folderId,profileIds:T}}})})).json();if(F.errors)throw new Error(((S=F.errors[0])==null?void 0:S.message)||"Unknown error");const n=(((E=(C=F==null?void 0:F.data)==null?void 0:C.changeFiles)==null?void 0:E.items)||[]).find(d=>d.id===t.folderPositionId);n&&n.profileIds&&(o(!v),p&&p(t.folderId,n.profileIds),console.log("Album visibility updated successfully"))}catch(A){console.error("Failed to toggle album visibility:",A),alert(c("Failed to update album visibility. Please try again."))}};return e.jsxs(e.Fragment,{children:[e.jsx(Ie,{isRTL:b,children:e.jsx(ve,{isRTL:b,children:e.jsxs(Pe,{isRTL:b,children:[_&&m&&e.jsx(U,{variant:"success",onClick:i=>{i.preventDefault(),i.stopPropagation(),m(t.folderId)},children:c("Add Photos")}),e.jsx(U,{onClick:i=>{i.preventDefault(),i.stopPropagation(),P(!0)},children:c("Copy Link")}),h&&e.jsxs(e.Fragment,{children:[e.jsx(U,{variant:"primary",onClick:i=>{i.preventDefault(),i.stopPropagation(),window.location.href=`/save-album.html?folderId=${encodeURIComponent(t.folderId)}`},children:c("Edit Album")}),e.jsx(U,{variant:v?"active":"default",onClick:R,children:c(v?"Remove From Public Profile":"Add To Public Profile")})]})]})})}),e.jsx(pe,{isOpen:g,onClose:()=>P(!1),inviteLink:j,onCopy:()=>k(),t:c,isRTL:b}),e.jsx(ue,{isOpen:w,onClose:()=>L(!1),t:c,isRTL:b})]})},Ke=({folders:t,setFolders:h,hasAddPhotoPermission:_,cognitoUsername:u,openFilePicker:m})=>{const{t:p,language:c}=z(),s=G(c)==="rtl";if(t.length===0)return e.jsx(Z,{children:e.jsx("p",{children:p("No public albums found")})});const b=o=>{switch(o){case"NotVisible":return p("Hidden");case"Watermark":return p("Watermarked");case"CannotBeSaved":return p("Cannot be saved");case"NoPassword":default:return p("No password")}},v=(o,g)=>{h(P=>P.map(w=>w.folderId===o?{...w,profileIds:g}:w))};return e.jsx(e.Fragment,{children:t.map(o=>{var R;const g=o.createdAt!=null,P=o.updatedAt!=null&&o.updatedAt!==o.createdAt,w=o.creatorId===`${u}_____${u}____Account`,L=((R=o.folderPassword)==null?void 0:R.policy)||"NoPassword",j=X(o.folderId,o.albumNanoId,o.folderName),k=o.files.filter(i=>i.thumbnailDataKey&&i.thumbnailDataKey.length>0||i.dataKey&&i.dataKey.length>0);return e.jsx(je,{isRTL:s,children:e.jsx(Ce,{href:j,children:e.jsxs(_e,{children:[e.jsx(Ae,{isRTL:s,children:e.jsxs(Le,{isRTL:s,children:[e.jsx(ke,{children:o.folderName||""}),(g||P)&&e.jsxs(Re,{isRTL:s,children:[g&&o.createdAt&&$(o.createdAt)&&e.jsxs("div",{children:[p("Created"),": ",$(o.createdAt)]}),P&&o.updatedAt&&$(o.updatedAt)&&e.jsxs("div",{children:[p("Updated"),": ",$(o.updatedAt)]})]})]})}),k.length>0&&e.jsxs(Se,{children:[e.jsx(Fe,{isRTL:s,children:k.map((i,S)=>e.jsx(Te,{children:e.jsx(de,{thumbnailDataKey:i.thumbnailDataKey,dataKey:i.dataKey,alt:p("Thumbnail"),style:{width:160,height:100,objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},S))}),k.length>3&&e.jsx(De,{isRTL:s})]}),e.jsx(Ee,{isRTL:s,children:L!=="NoPassword"&&e.jsx(Ne,{children:e.jsx("span",{children:b(L)})})}),e.jsx(Oe,{isRTL:s,children:o.folderDescription&&o.folderDescription.length>1?o.folderDescription:""}),e.jsx(Be,{folder:o,isOwner:w,hasAddPhotoPermission:_,cognitoUsername:u,openFilePicker:m,updateProfileIds:v})]})})},o.folderId)})})},Me=te.forwardRef(({onFileSelection:t},h)=>e.jsx("input",{type:"file",accept:"image/*,video/*",onChange:t,multiple:!0,style:{display:"none"},ref:h})),Ge=()=>{const t=a.useRef(null),[h,_]=a.useState(""),[u,m]=a.useState(null),[p,c]=a.useState(!0),[s,b]=a.useState(null),[v,o]=a.useState([]),[g,P]=a.useState(""),[w,L]=a.useState(!1),[j,k]=a.useState(null),[R,i]=a.useState(null),S=a.useMemo(()=>{if(!j||!h)return!1;const l=h.split("_____");return l.length>0?l[0]===j:!1},[j,h]),{t:C,language:E}=z(),A=G(E)==="rtl";a.useEffect(()=>{const n=(()=>{let f=new URLSearchParams(window.location.search).get("id"),x=f==null?void 0:f.replace(/-/g,"");if((x==null?void 0:x.length)===32?(x=le(x),console.log(x)):console.error("Invalid UUID format: must be 32 characters after removing dashes"),x)return x;const y=window.location.pathname.match(/\/persona\/([^\/]+)/);return y&&y[1]?y[1]:null})();if(n){_(n);const d=n.split("_____");d.length>0&&m(d[0])}else b(C("No profile ID provided")),c(!1)},[C]),a.useEffect(()=>{(async()=>{try{const n=await M();if(n){L(!0);try{const f=JSON.parse(atob(n.split(".")[1]))["cognito:username"];k(f)}catch(d){console.error("Failed to decode token",d)}}}catch(n){console.error("Error checking login:",n)}})()},[]),a.useEffect(()=>{h&&N()},[h]);const N=async()=>{var l,n;c(!0),b(null);try{const f={fetchRelationsInput:{ownerItemId:h,rangeKeyPrefix:"Folder",index:"ownerItemId_____RelationType____sortParameter",limit:1e3,scanIndexForward:!1,nextToken:null}},x=`
        mutation FetchFolderPositions($fetchRelationsInput: FetchRelationsInput!) {
          fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
            items {
              ... on FolderPosition {
                id
                profileIds
                folder {
                  id
                  albumNanoId
                  folderName
                  folderDescription
                  folderPassword {
                    password
                    policy
                  }
                  creatorId
                  createdAt
                  updatedAt
                  fileReferencesPage {
                    items {
                      file {
                        dataKey
                        thumbnailDataKey
                        durationInSeconds
                      }
                    }
                  }
                }
              }
            }
            nextToken
          }
        }
      `;let y;if(w)try{const D=await M();D&&(y=await(await fetch(Y,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${D}`},body:JSON.stringify({query:x,variables:f})})).json())}catch(D){console.error("Error fetching private data:",D)}if(y||(y=await(await fetch(ie,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":ne},body:JSON.stringify({query:x,variables:f})})).json()),(n=(l=y==null?void 0:y.data)==null?void 0:l.fetchRelations)!=null&&n.items){const V=y.data.fetchRelations.items.map(B=>{var W,J;const I=B.folder,ee=((J=(W=I==null?void 0:I.fileReferencesPage)==null?void 0:W.items)==null?void 0:J.map(O=>O.file))||[];return{folderPositionId:B.id,folderId:I.id,albumNanoId:I.albumNanoId,folderName:I.folderName,folderDescription:I.folderDescription,folderPassword:I.folderPassword,creatorId:I.creatorId,createdAt:I.createdAt,updatedAt:I.updatedAt,files:ee.filter(O=>O&&O.dataKey),profileIds:B.profileIds||[]}});o(V)}}catch(d){console.error("Error fetching folders:",d),b(C("Failed to fetch profile data"))}finally{c(!1)}},T=l=>{var d;const n=Array.from(l.target.files||[]);n.length&&(l.target.value&&((d=l.target.files)!=null&&d.length)&&(localStorage.setItem(q.SELECTED_PHOTOS,JSON.stringify(n.map(f=>({name:f.name,size:f.size,type:f.type})))),R?window.location.href=`/save-album.html?folderId=${encodeURIComponent(R)}`:window.location.href="/save-album.html"),l.target&&(l.target.value=""))},H=l=>{var n;i(l),(n=t.current)==null||n.click()},Q=a.useMemo(()=>g?v.filter(l=>{var f,x;const n=(f=l.folderName)==null?void 0:f.toLowerCase().includes(g.toLowerCase()),d=(x=l.folderDescription)==null?void 0:x.toLowerCase().includes(g.toLowerCase());return n||d}):v,[v,g]),F=w;return e.jsxs(e.Fragment,{children:[e.jsx(se,{}),e.jsxs(ae,{isRTL:A,children:[e.jsx(ze,{username:u||C("User"),isCurrentUser:S,isRTL:A}),e.jsx(ce,{searchQuery:g,setSearchQuery:P,t:C,isRTL:A}),p&&e.jsx($e,{children:e.jsx("p",{children:C("Loading albums...")})}),s&&e.jsx(Ue,{children:e.jsx("p",{children:s})}),!p&&!s&&e.jsx(Ke,{folders:Q,setFolders:o,isOwner:S,hasAddPhotoPermission:F,cognitoUsername:j,openFilePicker:H}),w&&e.jsx(Me,{onFileSelection:T,ref:t})]})]})};oe.createRoot(document.getElementById("root")).render(e.jsx(re,{initialLanguage:localStorage.getItem(q.LANGUAGE)||"en",children:e.jsx(Ge,{})}));
