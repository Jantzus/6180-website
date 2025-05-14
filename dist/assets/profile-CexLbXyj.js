import{d as u,R as oe,j as e,u as B,r as s,bn as re,bo as ne,ag as se,ah as ie,ai as M,aj as ae,ak as z,bp as le,bq as q,aa as de,a9 as ce,g as G,k as X,a as ue,I as pe,l as Z,ab as fe,ac as he,G as me,A as ge,br as xe}from"./styled-components-BaNm_kET.js";import{j as ee,k as $,c as H,w as be}from"./utils-IiT-_NTh.js";import{L as we,S as Ie}from"./LazyImage-BwdylVis.js";import{C as ye,a as ve}from"./Modals-CIKTPGld.js";u.div`
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
`;const Pe=u.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  flex-direction: ${t=>t.isRTL?"row-reverse":"row"};
`,je=u.div`
  display: flex;
  width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
  flex-direction: ${t=>t.isRTL?"row-reverse":"row"};
  gap: 10px;
`,_e=u.div`
  display: flex;
  gap: 10px;
  flex-direction: ${t=>t.isRTL?"row-reverse":"row"};
`,U=u.button`
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
`,Ce=u.div`
  margin-bottom: 30px;
  width: 100%;
  direction: ${t=>t.isRTL?"rtl":"ltr"};
`,Ae=u.a`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  overflow: hidden;
`,Le=u.div`
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
`,Re=u.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
  flex-direction: ${t=>t.isRTL?"row-reverse":"row"};
`,ke=u.div`
  display: flex;
  flex-direction: column;
  align-items: ${t=>t.isRTL?"flex-end":"flex-start"};
`,Se=u.h2`
  font-size: 20px;
  margin: 0;
  color: #222;
`,Fe=u.div`
  font-size: 13px;
  color: #777;
  text-align: ${t=>t.isRTL?"right":"left"};
  margin-top: 4px;
`,Te=u.div`
  width: 100%;
  position: relative;
`,Ee=u.div`
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding-bottom: 8px;
  -ms-overflow-style: none;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
  max-width: 100%;
  flex-direction: ${t=>t.isRTL?"row-reverse":"row"};
`,De=u.div`
  flex-shrink: 0;
`,Ne=u.div`
  position: absolute;
  ${t=>t.isRTL?"left":"right"}: 0;
  top: 0;
  bottom: 8px;
  width: 30px;
  background: ${t=>t.isRTL?"linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))":"linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))"};
  pointer-events: none;
`,Oe=u.div`
  display: flex;
  justify-content: ${t=>t.isRTL?"flex-start":"flex-end"};
  margin-top: 8px;
  margin-bottom: 8px;
`,$e=({username:t,isCurrentUser:f,isRTL:C})=>{const{t:l}=B(),[w,d]=s.useState(!1),i=s.useRef(null),h=p=>{p.preventDefault(),p.stopPropagation(),d(!w)};s.useEffect(()=>{const p=x=>{i.current&&!i.current.contains(x.target)&&d(!1)},o=()=>{d(!1)};return w&&(document.addEventListener("mousedown",p),window.addEventListener("scroll",o)),()=>{document.removeEventListener("mousedown",p),window.removeEventListener("scroll",o)}},[w]);const m=p=>{p(),d(!1)};return e.jsxs(re,{isRTL:C,children:[e.jsx(ne,{isRTL:C,children:e.jsxs("div",{ref:i,style:{position:"relative"},children:[e.jsxs(se,{onClick:h,"aria-label":l("Menu"),"aria-expanded":w,children:[e.jsxs(ie,{children:[e.jsx(M,{}),e.jsx(M,{}),e.jsx(M,{})]}),t||l("User Profile")]}),w&&e.jsxs(ae,{children:[e.jsx(z,{onClick:()=>m(()=>{alert(l("Bio feature is coming soon! Stay tuned for updates where you can share more about yourself."))}),children:l("Bio")}),e.jsx(z,{onClick:()=>m(()=>{alert(l("Email feature is coming soon! Soon you will be able to share your email with connections."))}),children:l("E-mail")}),e.jsx(z,{onClick:()=>m(()=>{alert(l("Add Contact feature is coming soon! You will be able to add this person as a contact on 6180."))}),children:l("Contact On 6180")})]})]})}),f&&e.jsx(le,{children:e.jsx("p",{children:l("This is how others see your public profile")})})]})},Ue=({folder:t,isOwner:f,hasAddPhotoPermission:C,cognitoUsername:l,openFilePicker:w,updateProfileIds:d})=>{const{t:i,language:h}=B(),m=G(h)==="rtl",[p,o]=s.useState((t.profileIds||[]).includes(`${l}_____Public____Profile`)),[x,P]=s.useState(!1),[I,L]=s.useState(!1),j=ee(t.folderId,t.albumNanoId,t.folderName),R=()=>{navigator.clipboard.writeText(j).then(()=>{P(!1),L(!0)}).catch(r=>{console.error("Failed to copy link:",r),alert(i("Failed to copy link"))})},k=async r=>{var S,_,D;if(r.preventDefault(),r.stopPropagation(),!l){alert(i("You must be logged in to perform this action"));return}try{const A=await H();if(!A){console.error("Authentication failed");return}const N=`${l}_____Public____Profile`,T=[...t.profileIds||[]];if(p){const a=T.indexOf(N);a>-1&&T.splice(a,1)}else T.push(N);const F=await(await fetch(X,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${A}`},body:JSON.stringify({query:`
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
      `,variables:{folderPositionChangeProfileIdsInput:{folderId:t.folderId,profileIds:T}}})})).json();if(F.errors)throw new Error(((S=F.errors[0])==null?void 0:S.message)||"Unknown error");const n=(((D=(_=F==null?void 0:F.data)==null?void 0:_.changeFiles)==null?void 0:D.items)||[]).find(a=>a.id===t.folderPositionId);n&&n.profileIds&&(o(!p),d&&d(t.folderId,n.profileIds),console.log("Album visibility updated successfully"))}catch(A){console.error("Failed to toggle album visibility:",A),alert(i("Failed to update album visibility. Please try again."))}};return e.jsxs(e.Fragment,{children:[e.jsx(Pe,{isRTL:m,children:e.jsx(je,{isRTL:m,children:e.jsxs(_e,{isRTL:m,children:[C&&w&&e.jsx(U,{variant:"success",onClick:r=>{r.preventDefault(),r.stopPropagation(),w(t.folderId)},children:i("Add Photos")}),e.jsx(U,{onClick:r=>{r.preventDefault(),r.stopPropagation(),P(!0)},children:i("Copy Link")}),f&&e.jsxs(e.Fragment,{children:[e.jsx(U,{variant:"primary",onClick:r=>{r.preventDefault(),r.stopPropagation(),window.location.href=`/save-album.html?folderId=${encodeURIComponent(t.folderId)}`},children:i("Edit Album")}),e.jsx(U,{variant:p?"active":"default",onClick:k,children:i(p?"Remove From Public Profile":"Add To Public Profile")})]})]})})}),e.jsx(ye,{isOpen:x,onClose:()=>P(!1),inviteLink:j,onCopy:()=>R(),t:i,isRTL:m}),e.jsx(ve,{isOpen:I,onClose:()=>L(!1),t:i,isRTL:m})]})},Be=({folders:t,setFolders:f,hasAddPhotoPermission:C,cognitoUsername:l,openFilePicker:w})=>{const{t:d,language:i}=B(),h=G(i)==="rtl";if(t.length===0)return e.jsx(q,{children:e.jsx("p",{children:d("No public albums found")})});const m=o=>{switch(o){case"NotVisible":return d("Hidden");case"Watermark":return d("Watermarked");case"CannotBeSaved":return d("Cannot be saved");case"NoPassword":default:return d("No password")}},p=(o,x)=>{f(P=>P.map(I=>I.folderId===o?{...I,profileIds:x}:I))};return e.jsx(e.Fragment,{children:t.map(o=>{var k;const x=o.createdAt!=null,P=o.updatedAt!=null&&o.updatedAt!==o.createdAt,I=o.creatorId===`${l}_____${l}____Account`,L=((k=o.folderPassword)==null?void 0:k.policy)||"NoPassword",j=ee(o.folderId,o.albumNanoId,o.folderName),R=o.files.filter(r=>r.thumbnailDataKey&&r.thumbnailDataKey.length>0||r.dataKey&&r.dataKey.length>0);return e.jsx(Ce,{isRTL:h,children:e.jsx(Ae,{href:j,children:e.jsxs(Le,{children:[e.jsx(Re,{isRTL:h,children:e.jsxs(ke,{isRTL:h,children:[e.jsx(Se,{children:o.folderName||""}),(x||P)&&e.jsxs(Fe,{isRTL:h,children:[x&&o.createdAt&&$(o.createdAt)&&e.jsxs("div",{children:[d("Created"),": ",$(o.createdAt)]}),P&&o.updatedAt&&$(o.updatedAt)&&e.jsxs("div",{children:[d("Updated"),": ",$(o.updatedAt)]})]})]})}),R.length>0&&e.jsxs(Te,{children:[e.jsx(Ee,{isRTL:h,children:R.map((r,S)=>e.jsx(De,{children:e.jsx(we,{thumbnailDataKey:r.thumbnailDataKey,dataKey:r.dataKey,alt:d("Thumbnail"),style:{width:160,height:100,objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},S))}),R.length>3&&e.jsx(Ne,{isRTL:h})]}),e.jsx(Oe,{isRTL:h,children:L!=="NoPassword"&&e.jsx(de,{children:e.jsx("span",{children:m(L)})})}),e.jsx(ce,{isRTL:h,children:o.folderDescription&&o.folderDescription.length>1?o.folderDescription:""}),e.jsx(Ue,{folder:o,isOwner:I,hasAddPhotoPermission:C,cognitoUsername:l,openFilePicker:w,updateProfileIds:p})]})})},o.folderId)})})},Ke=oe.forwardRef(({onFileSelection:t},f)=>e.jsx("input",{type:"file",accept:"image/*,video/*",onChange:t,multiple:!0,style:{display:"none"},ref:f})),Me=()=>{const t=s.useRef(null),[f,C]=s.useState(""),[l,w]=s.useState(null),[d,i]=s.useState(!0),[h,m]=s.useState(null),[p,o]=s.useState([]),[x,P]=s.useState(""),[I,L]=s.useState(!1),[j,R]=s.useState(null),[k,r]=s.useState(null),S=s.useMemo(()=>{if(!j||!f)return!1;const c=f.split("_____");return c.length>0?c[0]===j:!1},[j,f]),{t:_,language:D}=B(),A=G(D)==="rtl";s.useEffect(()=>{const n=(()=>{let g=new URLSearchParams(window.location.search).get("id"),b=g==null?void 0:g.replace(/-/g,"");if((b==null?void 0:b.length)===32?(b=be(b),console.log(b)):console.error("Invalid UUID format: must be 32 characters after removing dashes"),b)return b;const y=window.location.pathname.match(/\/persona\/([^\/]+)/);return y&&y[1]?y[1]:null})();if(n){C(n);const a=n.split("_____");a.length>0&&w(a[0])}else m(_("No profile ID provided")),i(!1)},[_]),s.useEffect(()=>{(async()=>{try{const n=await H();if(n){L(!0);try{const g=JSON.parse(atob(n.split(".")[1]))["cognito:username"];R(g)}catch(a){console.error("Failed to decode token",a)}}}catch(n){console.error("Error checking login:",n)}})()},[]),s.useEffect(()=>{f&&N()},[f]);const N=async()=>{var c,n;i(!0),m(null);try{const a={ownerItemId:f,rangeKeyPrefix:"Folder",index:"ownerItemId_____RelationType____sortParameter",limit:1e3,scanIndexForward:!1,nextToken:null},g={relationIds:[`'${f}_____${f}____Account`],fetchRelationsInput:a},b=`
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
      `;let y;if(I)try{const E=await H();E&&(y=await(await fetch(X,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${E}`},body:JSON.stringify({query:b,variables:g})})).json())}catch(E){console.error("Error fetching private data:",E)}if(y||(y=await(await fetch(fe,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":he},body:JSON.stringify({query:b,variables:g})})).json()),(n=(c=y==null?void 0:y.data)==null?void 0:c.fetchRelations)!=null&&n.items){const W=y.data.fetchRelations.items.map(K=>{var J,Y;const v=K.folder,te=((Y=(J=v==null?void 0:v.fileReferencesPage)==null?void 0:J.items)==null?void 0:Y.map(O=>O.file))||[];return{folderPositionId:K.id,folderId:v.id,albumNanoId:v.albumNanoId,folderName:v.folderName,folderDescription:v.folderDescription,folderPassword:v.folderPassword,creatorId:v.creatorId,createdAt:v.createdAt,updatedAt:v.updatedAt,files:te.filter(O=>O&&O.dataKey),profileIds:K.profileIds||[]}});o(W)}}catch(a){console.error("Error fetching folders:",a),m(_("Failed to fetch profile data"))}finally{i(!1)}},T=c=>{var a;const n=Array.from(c.target.files||[]);n.length&&(c.target.value&&((a=c.target.files)!=null&&a.length)&&(localStorage.setItem(Z.SELECTED_PHOTOS,JSON.stringify(n.map(g=>({name:g.name,size:g.size,type:g.type})))),k?window.location.href=`/save-album.html?folderId=${encodeURIComponent(k)}`:window.location.href="/save-album.html"),c.target&&(c.target.value=""))},Q=c=>{var n;r(c),(n=t.current)==null||n.click()},V=s.useMemo(()=>x?p.filter(c=>{var g,b;const n=(g=c.folderName)==null?void 0:g.toLowerCase().includes(x.toLowerCase()),a=(b=c.folderDescription)==null?void 0:b.toLowerCase().includes(x.toLowerCase());return n||a}):p,[p,x]),F=I;return e.jsxs(e.Fragment,{children:[e.jsx(me,{}),e.jsxs(ge,{isRTL:A,children:[e.jsx($e,{username:l||_("User"),isCurrentUser:S,isRTL:A}),e.jsx(Ie,{searchQuery:x,setSearchQuery:P,t:_,isRTL:A}),d&&e.jsx(q,{children:e.jsx("p",{children:_("Loading albums...")})}),h&&e.jsx(xe,{children:e.jsx("p",{children:h})}),!d&&!h&&e.jsx(Be,{folders:V,setFolders:o,isOwner:S,hasAddPhotoPermission:F,cognitoUsername:j,openFilePicker:Q}),I&&e.jsx(Ke,{onFileSelection:T,ref:t})]})]})};ue.createRoot(document.getElementById("root")).render(e.jsx(pe,{initialLanguage:localStorage.getItem(Z.LANGUAGE)||"en",children:e.jsx(Me,{})}));
