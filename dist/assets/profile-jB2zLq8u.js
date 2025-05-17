import{R as ee,j as e,u as D,r as o,bn as te,bo as ae,ag as se,ah as ne,ai as A,aj as re,ak as C,bp as oe,bq as G,aa as ie,a9 as le,g as H,a as ce,I as de,l as M,k as ue,ab as me,ac as fe,G as he,A as pe,br as ge}from"./styled-components-Cp5DMLPM.js";import{j as Ie,c as K,w as ye}from"./utils-BpX0p9KY.js";import{a as xe,b as be,c as we,d as je,e as Pe,f as Se,I as _e,g as Le,h as Re,L as Ee,i as Ae,P as Ce,S as De}from"./profile-styled-components-BZ3lmCGo.js";const Ne=({username:y,isCurrentUser:n,isRTL:j})=>{const{t:a}=D(),[g,t]=o.useState(!1),I=o.useRef(null),b=l=>{l.preventDefault(),l.stopPropagation(),t(!g)};o.useEffect(()=>{const l=x=>{I.current&&!I.current.contains(x.target)&&t(!1)},u=()=>{t(!1)};return g&&(document.addEventListener("mousedown",l),window.addEventListener("scroll",u)),()=>{document.removeEventListener("mousedown",l),window.removeEventListener("scroll",u)}},[g]);const f=l=>{l(),t(!1)};return e.jsxs(te,{isRTL:j,children:[e.jsx(ae,{isRTL:j,children:e.jsxs("div",{ref:I,style:{position:"relative"},children:[e.jsxs(se,{onClick:b,"aria-label":a("Menu"),"aria-expanded":g,children:[e.jsxs(ne,{children:[e.jsx(A,{}),e.jsx(A,{}),e.jsx(A,{})]}),y||a("User Profile")]}),g&&e.jsxs(re,{children:[e.jsx(C,{onClick:()=>f(()=>{alert(a("Bio feature is coming soon! Stay tuned for updates where you can share more about yourself."))}),children:a("Bio")}),e.jsx(C,{onClick:()=>f(()=>{alert(a("Email feature is coming soon! Soon you will be able to share your email with connections."))}),children:a("E-mail")}),e.jsx(C,{onClick:()=>f(()=>{alert(a("Add Contact feature is coming soon! You will be able to add this person as a contact on 6180."))}),children:a("Contact On 6180")})]})]})}),n&&e.jsx(oe,{children:e.jsx("p",{children:a("This is how others see your public profile")})})]})},ve=({folders:y})=>{const{t:n,language:j}=D(),a=H(j)==="rtl";if(y.length===0)return e.jsx(G,{children:e.jsx("p",{children:n("No public albums found")})});const g=t=>{switch(t){case"NotVisible":return n("Hidden");case"Watermark":return n("Watermarked");case"CannotBeSaved":return n("Cannot be saved");case"NoPassword":default:return n("No password")}};return e.jsx(e.Fragment,{children:y.map(t=>{var l;const I=((l=t.folderPassword)==null?void 0:l.policy)||"NoPassword",b=Ie(t.folderId,t.albumNanoId,t.folderName),f=t.files.filter(u=>u.thumbnailDataKey&&u.thumbnailDataKey.length>0||u.dataKey&&u.dataKey.length>0);return e.jsx(xe,{isRTL:a,children:e.jsx(be,{href:b,children:e.jsxs(we,{children:[e.jsx(je,{isRTL:a,children:e.jsx(Pe,{isRTL:a,children:e.jsx(Se,{children:t.folderName||""})})}),f.length>0&&e.jsxs(_e,{children:[e.jsx(Le,{isRTL:a,children:f.map((u,x)=>e.jsx(Re,{children:e.jsx(Ee,{thumbnailDataKey:u.thumbnailDataKey,dataKey:u.dataKey,alt:n("Thumbnail"),style:{width:160,height:100,objectFit:"cover",borderRadius:6,border:"1px solid #ddd"}})},x))}),f.length>3&&e.jsx(Ae,{isRTL:a})]}),e.jsx(Ce,{isRTL:a,children:I!=="NoPassword"&&e.jsx(ie,{children:e.jsx("span",{children:g(I)})})}),t.folderDescription&&t.folderDescription.length>1&&e.jsx(le,{isRTL:a,children:t.folderDescription})]})})},t.folderId)})})},Fe=ee.forwardRef(({onFileSelection:y},n)=>e.jsx("input",{type:"file",accept:"image/*,video/*",onChange:y,multiple:!0,style:{display:"none"},ref:n})),ke=()=>{const y=o.useRef(null),[n,j]=o.useState(""),[a,g]=o.useState(null),[t,I]=o.useState(!0),[b,f]=o.useState(null),[l,u]=o.useState([]),[x,B]=o.useState(""),[L,$]=o.useState(!1),[S,W]=o.useState(null),[N,Q]=o.useState(null),v=o.useMemo(()=>{if(!S||!n)return!1;const r=n.split("_____");return r.length>0?r[0]===S:!1},[S,n]),{t:P,language:z}=D(),R=H(z)==="rtl";o.useEffect(()=>{const s=(()=>{let i=new URLSearchParams(window.location.search).get("id"),d=i==null?void 0:i.replace(/-/g,"");if((d==null?void 0:d.length)===32?(d=ye(d),console.log(d)):console.error("Invalid UUID format: must be 32 characters after removing dashes"),d)return d;const w=window.location.pathname.match(/\/persona\/([^\/]+)/);return w&&w[1]?w[1]:null})();if(s){j(s);const c=s.split("_____");c.length>0&&g(c[0])}else f(P("No profile ID provided")),I(!1)},[P]),o.useEffect(()=>{(async()=>{try{const s=await K();if(s){$(!0);try{const i=JSON.parse(atob(s.split(".")[1]))["cognito:username"];W(i)}catch(c){console.error("Failed to decode token",c)}}}catch(s){console.error("Error checking login:",s)}})()},[]),o.useEffect(()=>{n&&J()},[n]);const J=async()=>{var r,s,c,i,d;I(!0),f(null);try{const w={ownerItemId:n,rangeKeyPrefix:"Folder",index:"ownerItemId_____RelationType____sortParameter",limit:1e3,scanIndexForward:!1,nextToken:null},F={relationIds:[`${n}_____Public____Profile`],fetchRelationsInput:w},k=`
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
      `;let m;if(L)try{const h=await K();h&&(m=await(await fetch(ue,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${h}`},body:JSON.stringify({query:k,variables:F})})).json())}catch(h){console.error("Error fetching private data:",h)}if(m||(m=await(await fetch(me,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":fe},body:JSON.stringify({query:k,variables:F})})).json()),(s=(r=m==null?void 0:m.data)==null?void 0:r.batchGetItems)!=null&&s.items&&m.data.batchGetItems.items.length>0){const h=m.data.batchGetItems.items[0];(c=h==null?void 0:h.item)!=null&&c.anyDisplayName&&g(h.item.anyDisplayName)}if((d=(i=m==null?void 0:m.data)==null?void 0:i.fetchRelations)!=null&&d.items){const O=m.data.fetchRelations.items.map(E=>{var T,U;const p=E.folder,Z=((U=(T=p==null?void 0:p.fileReferencesPage)==null?void 0:T.items)==null?void 0:U.map(_=>_.file))||[];return{folderPositionId:E.id,folderId:p.id,albumNanoId:p.albumNanoId,folderName:p.folderName,folderDescription:p.folderDescription,folderPassword:p.folderPassword,creatorId:p.creatorId,createdAt:p.createdAt,updatedAt:p.updatedAt,files:Z.filter(_=>_&&_.dataKey),profileIds:E.profileIds||[]}});u(O)}}catch(w){console.error("Error fetching folders:",w),f(P("Failed to fetch profile data"))}finally{I(!1)}},Y=r=>{var c;const s=Array.from(r.target.files||[]);s.length&&(r.target.value&&((c=r.target.files)!=null&&c.length)&&(localStorage.setItem(M.SELECTED_PHOTOS,JSON.stringify(s.map(i=>({name:i.name,size:i.size,type:i.type})))),N?window.location.href=`/save-album.html?folderId=${encodeURIComponent(N)}`:window.location.href="/save-album.html"),r.target&&(r.target.value=""))},q=r=>{var s;Q(r),(s=y.current)==null||s.click()},V=o.useMemo(()=>x?l.filter(r=>{var i,d;const s=(i=r.folderName)==null?void 0:i.toLowerCase().includes(x.toLowerCase()),c=(d=r.folderDescription)==null?void 0:d.toLowerCase().includes(x.toLowerCase());return s||c}):l,[l,x]),X=L;return e.jsxs(e.Fragment,{children:[e.jsx(he,{}),e.jsxs(pe,{isRTL:R,children:[e.jsx(Ne,{username:a||P("User"),isCurrentUser:v,isRTL:R}),e.jsx(De,{searchQuery:x,setSearchQuery:B,t:P,isRTL:R}),t&&e.jsx(G,{children:e.jsx("p",{children:P("Loading albums...")})}),b&&e.jsx(ge,{children:e.jsx("p",{children:b})}),!t&&!b&&e.jsx(ve,{folders:V,setFolders:u,isOwner:v,hasAddPhotoPermission:X,cognitoUsername:S,openFilePicker:q}),L&&e.jsx(Fe,{onFileSelection:Y,ref:y})]})]})};ce.createRoot(document.getElementById("root")).render(e.jsx(de,{initialLanguage:localStorage.getItem(M.LANGUAGE)||"en",children:e.jsx(ke,{})}));
