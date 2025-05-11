import{d as o,R as te,j as e,u as z,r as d,g as G,k as Y,a as oe,I as re,l as q,a9 as ie,aa as ne,G as se,A as ae}from"./styled-components-Dg1z4lLb.js";import{h as X,i as N,c as M,v as le}from"./utils-xB7HQu6d.js";import{L as de,S as ce}from"./LazyImage-B-EcLXqG.js";import{C as pe,a as fe}from"./Modals-Iyq7hCXM.js";const ue=o.div`
  margin-bottom: 24px;
  text-align: center;
  direction: ${t=>t.isRTL?"rtl":"ltr"};
`,he=o.div`
  display: flex;
  align-items: center;
  justify-content: ${t=>t.isRTL?"flex-start":"flex-end"};
  margin-bottom: 8px;
  position: relative;
`,xe=o.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
`,ge=o.div`
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
`,me=o.h1`
  font-size: 18px;
  margin: 0;
  font-weight: 600;
`,be=o.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #555;
  margin-left: 8px;
`,we=o.div`
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
`,K=o.div`
  padding: 10px 16px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-bottom: ${t=>t.hasBorder?"1px solid #eee":"none"};
`,Ie=o.div`
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
`,ye=o.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  flex-direction: ${t=>t.isRTL?"row-reverse":"row"};
`,ve=o.div`
  display: flex;
  width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
  flex-direction: ${t=>t.isRTL?"row-reverse":"row"};
  gap: 10px;
`,Pe=o.div`
  display: flex;
  gap: 10px;
  flex-direction: ${t=>t.isRTL?"row-reverse":"row"};
`,U=o.button`
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
`,Z=o.div`
  text-align: center; 
  padding: 40px 20px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  
  p {
    font-size: 16px;
    color: #666;
  }
`,je=o.div`
  margin-bottom: 30px;
  width: 100%;
  direction: ${t=>t.isRTL?"rtl":"ltr"};
`,Ce=o.a`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  overflow: hidden;
`,_e=o.div`
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
`,Ae=o.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
  flex-direction: ${t=>t.isRTL?"row-reverse":"row"};
`,Le=o.div`
  display: flex;
  flex-direction: column;
  align-items: ${t=>t.isRTL?"flex-end":"flex-start"};
`,Re=o.h2`
  font-size: 20px;
  margin: 0;
  color: #222;
`,ke=o.div`
  font-size: 13px;
  color: #777;
  text-align: ${t=>t.isRTL?"right":"left"};
  margin-top: 4px;
`,Se=o.div`
  width: 100%;
  position: relative;
`,Te=o.div`
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding-bottom: 8px;
  -ms-overflow-style: none;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
  max-width: 100%;
  flex-direction: ${t=>t.isRTL?"row-reverse":"row"};
`,Fe=o.div`
  flex-shrink: 0;
`,De=o.div`
  position: absolute;
  ${t=>t.isRTL?"left":"right"}: 0;
  top: 0;
  bottom: 8px;
  width: 30px;
  background: ${t=>t.isRTL?"linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))":"linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))"};
  pointer-events: none;
`,Ee=o.div`
  display: flex;
  justify-content: ${t=>t.isRTL?"flex-start":"flex-end"};
  margin-top: 8px;
  margin-bottom: 8px;
`,$e=o.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #555;
`,Oe=o.div`
  margin-top: 8px;
  margin-bottom: 16px;
  font-size: 14px;
  color: #555;
  line-height: 1.5;
  text-align: ${t=>t.isRTL?"right":"left"};
`,Ne=o(Z)``,Ue=o.div`
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
`;o.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
`;const ze=({username:t,isCurrentUser:h,isRTL:C})=>{const{t:u}=z(),[m,f]=d.useState(!1),c=s=>{s.preventDefault(),s.stopPropagation(),f(!m)};return d.useEffect(()=>{const s=()=>{m&&f(!1)};return document.addEventListener("click",s),()=>{document.removeEventListener("click",s)}},[m]),e.jsxs(ue,{isRTL:C,children:[e.jsxs(he,{isRTL:C,children:[e.jsxs(xe,{onClick:c,children:[e.jsx(ge,{children:t?t.charAt(0).toUpperCase():"?"}),e.jsx(me,{children:t||u("User Profile")}),e.jsx(be,{})]}),m&&e.jsxs(we,{children:[e.jsx(K,{hasBorder:!0,onClick:()=>{alert(u("Bio feature is coming soon! Stay tuned for updates where you can share more about yourself."))},children:e.jsx("span",{children:"Bio"})}),e.jsx(K,{hasBorder:!0,onClick:()=>{alert(u("Email feature is coming soon! Soon you will be able to share your email with connections."))},children:e.jsx("span",{children:"E-mail"})}),e.jsx(K,{onClick:()=>{alert(u("Add Contact feature is coming soon! You will be able to add this person as a contact on 6180."))},children:e.jsx("span",{children:"Contact On 6180"})})]})]}),h&&e.jsx(Ie,{children:e.jsx("p",{children:u("This is how others see your public profile")})})]})},Be=({folder:t,isOwner:h,hasAddPhotoPermission:C,cognitoUsername:u,openFilePicker:m,updateProfileIds:f})=>{const{t:c,language:s}=z(),b=G(s)==="rtl",[v,r]=d.useState((t.profileIds||[]).includes(`${u}_____Public____Profile`)),[g,P]=d.useState(!1),[w,A]=d.useState(!1),R=`https://6180.io/photos.html?id=${X(t.folderId).replace(/-/g,"")}`,_=()=>{navigator.clipboard.writeText(R).then(()=>{P(!1),A(!0)}).catch(i=>{console.error("Failed to copy link:",i),alert(c("Failed to copy link"))})},k=async i=>{var I,E,S;if(i.preventDefault(),i.stopPropagation(),!u){alert(c("You must be logged in to perform this action"));return}try{const T=await M();if(!T){console.error("Authentication failed");return}const $=`${u}_____Public____Profile`,F=[...t.profileIds||[]];if(v){const l=F.indexOf($);l>-1&&F.splice(l,1)}else F.push($);const n=await(await fetch(Y,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${T}`},body:JSON.stringify({query:`
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
      `,variables:{folderPositionChangeProfileIdsInput:{folderId:t.folderId,profileIds:F}}})})).json();if(n.errors)throw new Error(((I=n.errors[0])==null?void 0:I.message)||"Unknown error");const p=(((S=(E=n==null?void 0:n.data)==null?void 0:E.changeFiles)==null?void 0:S.items)||[]).find(l=>l.id===t.folderPositionId);p&&p.profileIds&&(r(!v),f&&f(t.folderId,p.profileIds),console.log("Album visibility updated successfully"))}catch(T){console.error("Failed to toggle album visibility:",T),alert(c("Failed to update album visibility. Please try again."))}};return e.jsxs(e.Fragment,{children:[e.jsx(ye,{isRTL:b,children:e.jsx(ve,{isRTL:b,children:e.jsxs(Pe,{isRTL:b,children:[C&&m&&e.jsx(U,{variant:"success",onClick:i=>{i.preventDefault(),i.stopPropagation(),m(t.folderId)},children:c("Add Photos")}),e.jsx(U,{onClick:i=>{i.preventDefault(),i.stopPropagation(),P(!0)},children:c("Copy Link")}),h&&e.jsxs(e.Fragment,{children:[e.jsx(U,{variant:"primary",onClick:i=>{i.preventDefault(),i.stopPropagation(),window.location.href=`/save-album.html?folderId=${encodeURIComponent(t.folderId)}`},children:c("Edit Album")}),e.jsx(U,{variant:v?"active":"default",onClick:k,children:c(v?"Remove From Public Profile":"Add To Public Profile")})]})]})})}),e.jsx(pe,{isOpen:g,onClose:()=>P(!1),inviteLink:R,onCopy:()=>_(),t:c,isRTL:b}),e.jsx(fe,{isOpen:w,onClose:()=>A(!1),t:c,isRTL:b})]})},Ke=({folders:t,setFolders:h,hasAddPhotoPermission:C,cognitoUsername:u,openFilePicker:m})=>{const{t:f,language:c}=z(),s=G(c)==="rtl";if(t.length===0)return e.jsx(Z,{children:e.jsx("p",{children:f("No public albums found")})});const b=r=>{switch(r){case"NotVisible":return f("Hidden");case"Watermark":return f("Watermarked");case"CannotBeSaved":return f("Cannot be saved");case"NoPassword":default:return f("No password")}},v=(r,g)=>{h(P=>P.map(w=>w.folderId===r?{...w,profileIds:g}:w))};return e.jsx(e.Fragment,{children:t.map(r=>{var k;const g=r.createdAt!=null,P=r.updatedAt!=null&&r.updatedAt!==r.createdAt,w=r.creatorId===`${u}_____${u}____Account`,A=((k=r.folderPassword)==null?void 0:k.policy)||"NoPassword",R=`https://6180.io/photos.html?id=${X(r.folderId).replace(/-/g,"")}`,_=r.files.filter(i=>i.thumbnailDataKey&&i.thumbnailDataKey.length>0||i.dataKey&&i.dataKey.length>0);return e.jsx(je,{isRTL:s,children:e.jsx(Ce,{href:R,children:e.jsxs(_e,{children:[e.jsx(Ae,{isRTL:s,children:e.jsxs(Le,{isRTL:s,children:[e.jsx(Re,{children:r.folderName||""}),(g||P)&&e.jsxs(ke,{isRTL:s,children:[g&&r.createdAt&&N(r.createdAt)&&e.jsxs("div",{children:[f("Created"),": ",N(r.createdAt)]}),P&&r.updatedAt&&N(r.updatedAt)&&e.jsxs("div",{children:[f("Updated"),": ",N(r.updatedAt)]})]})]})}),_.length>0&&e.jsxs(Se,{children:[e.jsx(Te,{isRTL:s,children:_.map((i,I)=>e.jsx(Fe,{children:e.jsx(de,{thumbnailDataKey:i.thumbnailDataKey,dataKey:i.dataKey,alt:f("Thumbnail"),style:{width:160,height:100,objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},I))}),_.length>3&&e.jsx(De,{isRTL:s})]}),e.jsx(Ee,{isRTL:s,children:A!=="NoPassword"&&e.jsx($e,{children:e.jsx("span",{children:b(A)})})}),e.jsx(Oe,{isRTL:s,children:r.folderDescription&&r.folderDescription.length>1?r.folderDescription:""}),e.jsx(Be,{folder:r,isOwner:w,hasAddPhotoPermission:C,cognitoUsername:u,openFilePicker:m,updateProfileIds:v})]})})},r.folderId)})})},Me=te.forwardRef(({onFileSelection:t},h)=>e.jsx("input",{type:"file",accept:"image/*,video/*",onChange:t,multiple:!0,style:{display:"none"},ref:h})),Ge=()=>{const t=d.useRef(null),[h,C]=d.useState(""),[u,m]=d.useState(null),[f,c]=d.useState(!0),[s,b]=d.useState(null),[v,r]=d.useState([]),[g,P]=d.useState(""),[w,A]=d.useState(!1),[L,R]=d.useState(null),[_,k]=d.useState(null),i=d.useMemo(()=>{if(!L||!h)return!1;const n=h.split("_____");return n.length>0?n[0]===L:!1},[L,h]),{t:I,language:E}=z(),S=G(E)==="rtl";d.useEffect(()=>{const a=(()=>{let l=new URLSearchParams(window.location.search).get("id"),x=l==null?void 0:l.replace(/-/g,"");if((x==null?void 0:x.length)===32?(x=le(x),console.log(x)):console.error("Invalid UUID format: must be 32 characters after removing dashes"),x)return x;const y=window.location.pathname.match(/\/persona\/([^\/]+)/);return y&&y[1]?y[1]:null})();if(a){C(a);const p=a.split("_____");p.length>0&&m(p[0])}else b(I("No profile ID provided")),c(!1)},[I]),d.useEffect(()=>{(async()=>{try{const a=await M();if(a){A(!0);try{const l=JSON.parse(atob(a.split(".")[1]))["cognito:username"];R(l)}catch(p){console.error("Failed to decode token",p)}}}catch(a){console.error("Error checking login:",a)}})()},[]),d.useEffect(()=>{h&&T()},[h]);const T=async()=>{var n,a;c(!0),b(null);try{const l={fetchRelationsInput:{ownerItemId:h,rangeKeyPrefix:"Folder",index:"ownerItemId_____RelationType____sortParameter",limit:1e3,scanIndexForward:!1,nextToken:null}},x=`
        mutation FetchFolderPositions($fetchRelationsInput: FetchRelationsInput!) {
          fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
            items {
              ... on FolderPosition {
                id
                profileIds
                folder {
                  id
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
      `;let y;if(w)try{const D=await M();D&&(y=await(await fetch(Y,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${D}`},body:JSON.stringify({query:x,variables:l})})).json())}catch(D){console.error("Error fetching private data:",D)}if(y||(y=await(await fetch(ie,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":ne},body:JSON.stringify({query:x,variables:l})})).json()),(a=(n=y==null?void 0:y.data)==null?void 0:n.fetchRelations)!=null&&a.items){const V=y.data.fetchRelations.items.map(B=>{var W,J;const j=B.folder,ee=((J=(W=j==null?void 0:j.fileReferencesPage)==null?void 0:W.items)==null?void 0:J.map(O=>O.file))||[];return{folderPositionId:B.id,folderId:j.id,folderName:j.folderName,folderDescription:j.folderDescription,folderPassword:j.folderPassword,creatorId:j.creatorId,createdAt:j.createdAt,updatedAt:j.updatedAt,files:ee.filter(O=>O&&O.dataKey),profileIds:B.profileIds||[]}});r(V)}}catch(p){console.error("Error fetching folders:",p),b(I("Failed to fetch profile data"))}finally{c(!1)}},$=n=>{var p;const a=Array.from(n.target.files||[]);a.length&&(n.target.value&&((p=n.target.files)!=null&&p.length)&&(localStorage.setItem(q.SELECTED_PHOTOS,JSON.stringify(a.map(l=>({name:l.name,size:l.size,type:l.type})))),_?window.location.href=`/save-album.html?folderId=${encodeURIComponent(_)}`:window.location.href="/save-album.html"),n.target&&(n.target.value=""))},F=n=>{var a;k(n),(a=t.current)==null||a.click()},H=d.useMemo(()=>g?v.filter(n=>{var l,x;const a=(l=n.folderName)==null?void 0:l.toLowerCase().includes(g.toLowerCase()),p=(x=n.folderDescription)==null?void 0:x.toLowerCase().includes(g.toLowerCase());return a||p}):v,[v,g]),Q=w;return e.jsxs(e.Fragment,{children:[e.jsx(se,{}),e.jsxs(ae,{isRTL:S,children:[e.jsx(ze,{username:u||I("User"),isCurrentUser:i,isRTL:S}),e.jsx(ce,{searchQuery:g,setSearchQuery:P,t:I,isRTL:S}),f&&e.jsx(Ne,{children:e.jsx("p",{children:I("Loading albums...")})}),s&&e.jsx(Ue,{children:e.jsx("p",{children:s})}),!f&&!s&&e.jsx(Ke,{folders:H,setFolders:r,isOwner:i,hasAddPhotoPermission:Q,cognitoUsername:L,openFilePicker:F}),w&&e.jsx(Me,{onFileSelection:$,ref:t})]})]})};oe.createRoot(document.getElementById("root")).render(e.jsx(re,{initialLanguage:localStorage.getItem(q.LANGUAGE)||"en",children:e.jsx(Ge,{})}));
