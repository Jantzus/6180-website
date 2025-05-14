import{d as u,R as se,j as e,u as K,r as s,bn as ie,bo as ae,ag as le,ah as de,ai as G,aj as ce,ak as z,bp as ue,bq as ee,aa as pe,a9 as fe,g as Q,k as te,a as he,I as me,l as oe,ab as ge,ac as xe,G as be,A as we,br as Ie}from"./styled-components-Cp5DMLPM.js";import{j as re,k as U,c as H,w as ye}from"./utils-BpX0p9KY.js";import{L as Pe,S as ve}from"./LazyImage-BQiJat-O.js";import{C as je,a as _e}from"./Modals-LqSWXRje.js";u.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #555;
  margin-left: 8px;
`;u.div`
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
`;u.div`
  padding: 10px 16px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-bottom: ${t=>t.hasBorder?"1px solid #eee":"none"};
`;const Ce=u.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  flex-direction: ${t=>t.isRTL?"row-reverse":"row"};
`,Ae=u.div`
  display: flex;
  width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
  flex-direction: ${t=>t.isRTL?"row-reverse":"row"};
  gap: 10px;
`,Le=u.div`
  display: flex;
  gap: 10px;
  flex-direction: ${t=>t.isRTL?"row-reverse":"row"};
`,B=u.button`
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
`,Re=u.div`
  margin-bottom: 30px;
  width: 100%;
  direction: ${t=>t.isRTL?"rtl":"ltr"};
`,ke=u.a`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  overflow: hidden;
`,Se=u.div`
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
`,Fe=u.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
  flex-direction: ${t=>t.isRTL?"row-reverse":"row"};
`,Te=u.div`
  display: flex;
  flex-direction: column;
  align-items: ${t=>t.isRTL?"flex-end":"flex-start"};
`,De=u.h2`
  font-size: 20px;
  margin: 0;
  color: #222;
`,Ee=u.div`
  font-size: 13px;
  color: #777;
  text-align: ${t=>t.isRTL?"right":"left"};
  margin-top: 4px;
`,Ne=u.div`
  width: 100%;
  position: relative;
`,Oe=u.div`
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding-bottom: 8px;
  -ms-overflow-style: none;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
  max-width: 100%;
  flex-direction: ${t=>t.isRTL?"row-reverse":"row"};
`,$e=u.div`
  flex-shrink: 0;
`,Ue=u.div`
  position: absolute;
  ${t=>t.isRTL?"left":"right"}: 0;
  top: 0;
  bottom: 8px;
  width: 30px;
  background: ${t=>t.isRTL?"linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))":"linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))"};
  pointer-events: none;
`,Be=u.div`
  display: flex;
  justify-content: ${t=>t.isRTL?"flex-start":"flex-end"};
  margin-top: 8px;
  margin-bottom: 8px;
`,Ke=({username:t,isCurrentUser:h,isRTL:A})=>{const{t:a}=K(),[w,l]=s.useState(!1),i=s.useRef(null),f=p=>{p.preventDefault(),p.stopPropagation(),l(!w)};s.useEffect(()=>{const p=x=>{i.current&&!i.current.contains(x.target)&&l(!1)},o=()=>{l(!1)};return w&&(document.addEventListener("mousedown",p),window.addEventListener("scroll",o)),()=>{document.removeEventListener("mousedown",p),window.removeEventListener("scroll",o)}},[w]);const m=p=>{p(),l(!1)};return e.jsxs(ie,{isRTL:A,children:[e.jsx(ae,{isRTL:A,children:e.jsxs("div",{ref:i,style:{position:"relative"},children:[e.jsxs(le,{onClick:f,"aria-label":a("Menu"),"aria-expanded":w,children:[e.jsxs(de,{children:[e.jsx(G,{}),e.jsx(G,{}),e.jsx(G,{})]}),t||a("User Profile")]}),w&&e.jsxs(ce,{children:[e.jsx(z,{onClick:()=>m(()=>{alert(a("Bio feature is coming soon! Stay tuned for updates where you can share more about yourself."))}),children:a("Bio")}),e.jsx(z,{onClick:()=>m(()=>{alert(a("Email feature is coming soon! Soon you will be able to share your email with connections."))}),children:a("E-mail")}),e.jsx(z,{onClick:()=>m(()=>{alert(a("Add Contact feature is coming soon! You will be able to add this person as a contact on 6180."))}),children:a("Contact On 6180")})]})]})}),h&&e.jsx(ue,{children:e.jsx("p",{children:a("This is how others see your public profile")})})]})},Me=({folder:t,isOwner:h,hasAddPhotoPermission:A,cognitoUsername:a,openFilePicker:w,updateProfileIds:l})=>{const{t:i,language:f}=K(),m=Q(f)==="rtl",[p,o]=s.useState((t.profileIds||[]).includes(`${a}_____Public____Profile`)),[x,j]=s.useState(!1),[y,R]=s.useState(!1),_=re(t.folderId,t.albumNanoId,t.folderName),k=()=>{navigator.clipboard.writeText(_).then(()=>{j(!1),R(!0)}).catch(r=>{console.error("Failed to copy link:",r),alert(i("Failed to copy link"))})},S=async r=>{var F,C,N;if(r.preventDefault(),r.stopPropagation(),!a){alert(i("You must be logged in to perform this action"));return}try{const L=await H();if(!L){console.error("Authentication failed");return}const O=`${a}_____Public____Profile`,E=[...t.profileIds||[]];if(p){const c=E.indexOf(O);c>-1&&E.splice(c,1)}else E.push(O);const T=await(await fetch(te,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${L}`},body:JSON.stringify({query:`
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
      `,variables:{folderPositionChangeProfileIdsInput:{folderId:t.folderId,profileIds:E}}})})).json();if(T.errors)throw new Error(((F=T.errors[0])==null?void 0:F.message)||"Unknown error");const n=(((N=(C=T==null?void 0:T.data)==null?void 0:C.changeFiles)==null?void 0:N.items)||[]).find(c=>c.id===t.folderPositionId);n&&n.profileIds&&(o(!p),l&&l(t.folderId,n.profileIds),console.log("Album visibility updated successfully"))}catch(L){console.error("Failed to toggle album visibility:",L),alert(i("Failed to update album visibility. Please try again."))}};return e.jsxs(e.Fragment,{children:[e.jsx(Ce,{isRTL:m,children:e.jsx(Ae,{isRTL:m,children:e.jsxs(Le,{isRTL:m,children:[A&&w&&e.jsx(B,{variant:"success",onClick:r=>{r.preventDefault(),r.stopPropagation(),w(t.folderId)},children:i("Add Photos")}),e.jsx(B,{onClick:r=>{r.preventDefault(),r.stopPropagation(),j(!0)},children:i("Copy Link")}),h&&e.jsxs(e.Fragment,{children:[e.jsx(B,{variant:"primary",onClick:r=>{r.preventDefault(),r.stopPropagation(),window.location.href=`/save-album.html?folderId=${encodeURIComponent(t.folderId)}`},children:i("Edit Album")}),e.jsx(B,{variant:p?"active":"default",onClick:S,children:i(p?"Remove From Public Profile":"Add To Public Profile")})]})]})})}),e.jsx(je,{isOpen:x,onClose:()=>j(!1),inviteLink:_,onCopy:()=>k(),t:i,isRTL:m}),e.jsx(_e,{isOpen:y,onClose:()=>R(!1),t:i,isRTL:m})]})},Ge=({folders:t,setFolders:h,hasAddPhotoPermission:A,cognitoUsername:a,openFilePicker:w})=>{const{t:l,language:i}=K(),f=Q(i)==="rtl";if(t.length===0)return e.jsx(ee,{children:e.jsx("p",{children:l("No public albums found")})});const m=o=>{switch(o){case"NotVisible":return l("Hidden");case"Watermark":return l("Watermarked");case"CannotBeSaved":return l("Cannot be saved");case"NoPassword":default:return l("No password")}},p=(o,x)=>{h(j=>j.map(y=>y.folderId===o?{...y,profileIds:x}:y))};return e.jsx(e.Fragment,{children:t.map(o=>{var S;const x=o.createdAt!=null,j=o.updatedAt!=null&&o.updatedAt!==o.createdAt,y=o.creatorId===`${a}_____${a}____Account`,R=((S=o.folderPassword)==null?void 0:S.policy)||"NoPassword",_=re(o.folderId,o.albumNanoId,o.folderName),k=o.files.filter(r=>r.thumbnailDataKey&&r.thumbnailDataKey.length>0||r.dataKey&&r.dataKey.length>0);return e.jsx(Re,{isRTL:f,children:e.jsx(ke,{href:_,children:e.jsxs(Se,{children:[e.jsx(Fe,{isRTL:f,children:e.jsxs(Te,{isRTL:f,children:[e.jsx(De,{children:o.folderName||""}),(x||j)&&e.jsxs(Ee,{isRTL:f,children:[x&&o.createdAt&&U(o.createdAt)&&e.jsxs("div",{children:[l("Created"),": ",U(o.createdAt)]}),j&&o.updatedAt&&U(o.updatedAt)&&e.jsxs("div",{children:[l("Updated"),": ",U(o.updatedAt)]})]})]})}),k.length>0&&e.jsxs(Ne,{children:[e.jsx(Oe,{isRTL:f,children:k.map((r,F)=>e.jsx($e,{children:e.jsx(Pe,{thumbnailDataKey:r.thumbnailDataKey,dataKey:r.dataKey,alt:l("Thumbnail"),style:{width:160,height:100,objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},F))}),k.length>3&&e.jsx(Ue,{isRTL:f})]}),e.jsx(Be,{isRTL:f,children:R!=="NoPassword"&&e.jsx(pe,{children:e.jsx("span",{children:m(R)})})}),e.jsx(fe,{isRTL:f,children:o.folderDescription&&o.folderDescription.length>1?o.folderDescription:""}),e.jsx(Me,{folder:o,isOwner:y,hasAddPhotoPermission:A,cognitoUsername:a,openFilePicker:w,updateProfileIds:p})]})})},o.folderId)})})},ze=se.forwardRef(({onFileSelection:t},h)=>e.jsx("input",{type:"file",accept:"image/*,video/*",onChange:t,multiple:!0,style:{display:"none"},ref:h})),He=()=>{const t=s.useRef(null),[h,A]=s.useState(""),[a,w]=s.useState(null),[l,i]=s.useState(!0),[f,m]=s.useState(null),[p,o]=s.useState([]),[x,j]=s.useState(""),[y,R]=s.useState(!1),[_,k]=s.useState(null),[S,r]=s.useState(null),F=s.useMemo(()=>{if(!_||!h)return!1;const d=h.split("_____");return d.length>0?d[0]===_:!1},[_,h]),{t:C,language:N}=K(),L=Q(N)==="rtl";s.useEffect(()=>{const n=(()=>{let g=new URLSearchParams(window.location.search).get("id"),b=g==null?void 0:g.replace(/-/g,"");if((b==null?void 0:b.length)===32?(b=ye(b),console.log(b)):console.error("Invalid UUID format: must be 32 characters after removing dashes"),b)return b;const D=window.location.pathname.match(/\/persona\/([^\/]+)/);return D&&D[1]?D[1]:null})();if(n){A(n);const c=n.split("_____");c.length>0&&w(c[0])}else m(C("No profile ID provided")),i(!1)},[C]),s.useEffect(()=>{(async()=>{try{const n=await H();if(n){R(!0);try{const g=JSON.parse(atob(n.split(".")[1]))["cognito:username"];k(g)}catch(c){console.error("Failed to decode token",c)}}}catch(n){console.error("Error checking login:",n)}})()},[]),s.useEffect(()=>{h&&O()},[h]);const O=async()=>{var d,n,c,g,b;i(!0),m(null);try{const D={ownerItemId:h,rangeKeyPrefix:"Folder",index:"ownerItemId_____RelationType____sortParameter",limit:1e3,scanIndexForward:!1,nextToken:null},J={relationIds:[`${h}_____Public____Profile`],fetchRelationsInput:D},Y=`
        mutation FetchFolderPositions($relationIds: [ID!], $fetchRelationsInput: FetchRelationsInput!) {
          batchGetItems(relationIds: $relationIds) {
              items {
                  id
                  item {
                      ... on Profile {
                        anyDisplayName
                      }
                  }
              }
              nextToken
          }        
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
      `;let I;if(y)try{const P=await H();P&&(I=await(await fetch(te,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${P}`},body:JSON.stringify({query:Y,variables:J})})).json())}catch(P){console.error("Error fetching private data:",P)}if(I||(I=await(await fetch(ge,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":xe},body:JSON.stringify({query:Y,variables:J})})).json()),(n=(d=I==null?void 0:I.data)==null?void 0:d.batchGetItems)!=null&&n.items&&I.data.batchGetItems.items.length>0){const P=I.data.batchGetItems.items[0];(c=P==null?void 0:P.item)!=null&&c.anyDisplayName&&w(P.item.anyDisplayName)}if((b=(g=I==null?void 0:I.data)==null?void 0:g.fetchRelations)!=null&&b.items){const q=I.data.fetchRelations.items.map(M=>{var X,Z;const v=M.folder,ne=((Z=(X=v==null?void 0:v.fileReferencesPage)==null?void 0:X.items)==null?void 0:Z.map($=>$.file))||[];return{folderPositionId:M.id,folderId:v.id,albumNanoId:v.albumNanoId,folderName:v.folderName,folderDescription:v.folderDescription,folderPassword:v.folderPassword,creatorId:v.creatorId,createdAt:v.createdAt,updatedAt:v.updatedAt,files:ne.filter($=>$&&$.dataKey),profileIds:M.profileIds||[]}});o(q)}}catch(D){console.error("Error fetching folders:",D),m(C("Failed to fetch profile data"))}finally{i(!1)}},E=d=>{var c;const n=Array.from(d.target.files||[]);n.length&&(d.target.value&&((c=d.target.files)!=null&&c.length)&&(localStorage.setItem(oe.SELECTED_PHOTOS,JSON.stringify(n.map(g=>({name:g.name,size:g.size,type:g.type})))),S?window.location.href=`/save-album.html?folderId=${encodeURIComponent(S)}`:window.location.href="/save-album.html"),d.target&&(d.target.value=""))},V=d=>{var n;r(d),(n=t.current)==null||n.click()},W=s.useMemo(()=>x?p.filter(d=>{var g,b;const n=(g=d.folderName)==null?void 0:g.toLowerCase().includes(x.toLowerCase()),c=(b=d.folderDescription)==null?void 0:b.toLowerCase().includes(x.toLowerCase());return n||c}):p,[p,x]),T=y;return e.jsxs(e.Fragment,{children:[e.jsx(be,{}),e.jsxs(we,{isRTL:L,children:[e.jsx(Ke,{username:a||C("User"),isCurrentUser:F,isRTL:L}),e.jsx(ve,{searchQuery:x,setSearchQuery:j,t:C,isRTL:L}),l&&e.jsx(ee,{children:e.jsx("p",{children:C("Loading albums...")})}),f&&e.jsx(Ie,{children:e.jsx("p",{children:f})}),!l&&!f&&e.jsx(Ge,{folders:W,setFolders:o,isOwner:F,hasAddPhotoPermission:T,cognitoUsername:_,openFilePicker:V}),y&&e.jsx(ze,{onFileSelection:E,ref:t})]})]})};he.createRoot(document.getElementById("root")).render(e.jsx(me,{initialLanguage:localStorage.getItem(oe.LANGUAGE)||"en",children:e.jsx(He,{})}));
