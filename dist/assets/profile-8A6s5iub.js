import{R as oe,j as e,u as H,r as n,bj as ne,bk as se,ae as re,af as ie,ag as M,ah as ae,ai as $,bl as le,g as X,k as Z,a as ce,I as de,l as ee,a8 as ue,a9 as fe,G as pe,A as me,bm as he,bn as ge}from"./styled-components-C2kOizVL.js";import{t as Ie,c as G,v as Pe}from"./utils-Dg1pmrfX.js";import{a as ye,B as be,b as we,c as T,S as _e,A as xe}from"./AlbumList-CGgzpenX.js";import{C as Ce,a as je}from"./fileOperations-rkQXV-_p.js";const Se=({username:i,isCurrentUser:f,isRTL:v})=>{const{t:c}=H(),[h,P]=n.useState(!1),r=n.useRef(null),x=a=>{a.preventDefault(),a.stopPropagation(),P(!h)};n.useEffect(()=>{const a=y=>{r.current&&!r.current.contains(y.target)&&P(!1)},w=()=>{P(!1)};return h&&(document.addEventListener("mousedown",a),window.addEventListener("scroll",w)),()=>{document.removeEventListener("mousedown",a),window.removeEventListener("scroll",w)}},[h]);const p=a=>{a(),P(!1)};return e.jsxs(ne,{isRTL:v,children:[e.jsx(se,{isRTL:v,children:e.jsxs("div",{ref:r,style:{position:"relative"},children:[e.jsxs(re,{onClick:x,"aria-label":c("Menu"),"aria-expanded":h,children:[e.jsxs(ie,{children:[e.jsx(M,{}),e.jsx(M,{}),e.jsx(M,{})]}),i||c("User Profile")]}),h&&e.jsxs(ae,{children:[e.jsx($,{onClick:()=>p(()=>{alert(c("Bio feature is coming soon! Stay tuned for updates where you can share more about yourself."))}),children:c("Bio")}),e.jsx($,{onClick:()=>p(()=>{alert(c("Email feature is coming soon! Soon you will be able to share your email with connections."))}),children:c("E-mail")}),e.jsx($,{onClick:()=>p(()=>{alert(c("Add Contact feature is coming soon! You will be able to add this person as a contact on 6180."))}),children:c("Contact On 6180")})]})]})}),f&&e.jsx(le,{children:e.jsx("p",{children:c("This is how others see your public profile")})})]})},ve=({folder:i,isOwner:f,hasAddPhotoPermission:v,cognitoUsername:c,openFilePicker:h,updateProfileIds:P})=>{const{t:r,language:x}=H(),p=X(x)==="rtl",[a,w]=n.useState((i.profileIds||[]).includes(`${c}_____Public____Profile`)),[y,A]=n.useState(!1),[R,E]=n.useState(!1),C=Ie(i.folderId,i.albumNanoId,i.folderName),U=()=>{navigator.clipboard.writeText(C).then(()=>{A(!1),E(!0)}).catch(d=>{console.error("Failed to copy link:",d),alert(r("Failed to copy link"))})},F=async d=>{var k,b,O;if(d.preventDefault(),d.stopPropagation(),!c){alert(r("You must be logged in to perform this action"));return}try{const _=await G();if(!_){console.error("Authentication failed");return}const D=`${c}_____Public____Profile`,L=[...i.profileIds||[]];if(a){const t=L.indexOf(D);t>-1&&L.splice(t,1)}else L.push(D);const j=await(await fetch(Z,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${_}`},body:JSON.stringify({query:`
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
      `,variables:{folderPositionChangeProfileIdsInput:{folderId:i.folderId,profileIds:L}}})})).json();if(j.errors)throw new Error(((k=j.errors[0])==null?void 0:k.message)||"Unknown error");const o=(((O=(b=j==null?void 0:j.data)==null?void 0:b.changeFiles)==null?void 0:O.items)||[]).find(t=>t.id===i.folderPositionId);o&&o.profileIds&&(w(!a),P&&P(i.folderId,o.profileIds),console.log("Album visibility updated successfully"))}catch(_){console.error("Failed to toggle album visibility:",_),alert(r("Failed to update album visibility. Please try again."))}};return e.jsxs(e.Fragment,{children:[e.jsx(ye,{isRTL:p,children:e.jsx(be,{isRTL:p,children:e.jsxs(we,{isRTL:p,children:[v&&h&&e.jsx(T,{variant:"success",onClick:d=>{d.preventDefault(),d.stopPropagation(),h(i.folderId)},children:r("Add Photos")}),e.jsx(T,{onClick:d=>{d.preventDefault(),d.stopPropagation(),A(!0)},children:r("Copy Link")}),f&&e.jsxs(e.Fragment,{children:[e.jsx(T,{variant:"primary",onClick:d=>{d.preventDefault(),d.stopPropagation(),window.location.href=`/save-album.html?folderId=${encodeURIComponent(i.folderId)}`},children:r("Edit Album")}),e.jsx(T,{variant:a?"active":"default",onClick:F,children:r(a?"Remove From Public Profile":"Add To Public Profile")})]})]})})}),e.jsx(Ce,{isOpen:y,onClose:()=>A(!1),inviteLink:C,onCopy:()=>U(),t:r,isRTL:p}),e.jsx(je,{isOpen:R,onClose:()=>E(!1),t:r,isRTL:p})]})},Le=oe.forwardRef(({onFileSelection:i},f)=>e.jsx("input",{type:"file",accept:"image/*,video/*",onChange:i,multiple:!0,style:{display:"none"},ref:f})),Ae=()=>{const i=n.useRef(null),[f,v]=n.useState(""),[c,h]=n.useState(null),[P,r]=n.useState(!0),[x,p]=n.useState(null),[a,w]=n.useState([]),[y,A]=n.useState(""),[R,E]=n.useState(!1),[C,U]=n.useState(null),[F,d]=n.useState(null),k=n.useMemo(()=>{if(!C||!f)return!1;const o=f.split("_____");return o.length>0?o[0]===C:!1},[C,f]),{t:b,language:O}=H(),_=X(O)==="rtl";n.useEffect(()=>{const t=(()=>{let s=new URLSearchParams(window.location.search).get("id"),u=s==null?void 0:s.replace(/-/g,"");if((u==null?void 0:u.length)===32?(u=Pe(u),console.log(u)):console.error("Invalid UUID format: must be 32 characters after removing dashes"),u)return u;const S=window.location.pathname.match(/\/persona\/([^\/]+)/);return S&&S[1]?S[1]:null})();if(t){v(t);const l=t.split("_____");l.length>0&&h(l[0])}else p(b("No profile ID provided")),r(!1)},[b]),n.useEffect(()=>{(async()=>{try{const t=await G();if(t){E(!0);try{const s=JSON.parse(atob(t.split(".")[1]))["cognito:username"];U(s)}catch(l){console.error("Failed to decode token",l)}}}catch(t){console.error("Error checking login:",t)}})()},[]),n.useEffect(()=>{f&&D()},[f]);const D=async()=>{var o,t,l,s,u;r(!0),p(null);try{const S={ownerItemId:f,rangeKeyPrefix:"Folder",index:"ownerItemId_____RelationType____sortParameter",limit:1e3,scanIndexForward:!1,nextToken:null},J={relationIds:[`${f}_____Public____Profile`],fetchRelationsInput:S},Y=`
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
      `;let m;if(R)try{const g=await G();g&&(m=await(await fetch(Z,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${g}`},body:JSON.stringify({query:Y,variables:J})})).json())}catch(g){console.error("Error fetching private data:",g)}if(m||(m=await(await fetch(ue,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":fe},body:JSON.stringify({query:Y,variables:J})})).json()),(t=(o=m==null?void 0:m.data)==null?void 0:o.batchGetItems)!=null&&t.items&&m.data.batchGetItems.items.length>0){const g=m.data.batchGetItems.items[0];(l=g==null?void 0:g.item)!=null&&l.anyDisplayName&&h(g.item.anyDisplayName)}if((u=(s=m==null?void 0:m.data)==null?void 0:s.fetchRelations)!=null&&u.items){const z=m.data.fetchRelations.items.map(B=>{var W,q;const I=B.folder,te=((q=(W=I==null?void 0:I.fileReferencesPage)==null?void 0:W.items)==null?void 0:q.map(N=>N.file))||[];return{folderPositionId:B.id,folderId:I.id,albumNanoId:I.albumNanoId,folderName:I.folderName,folderDescription:I.folderDescription,folderPassword:I.folderPassword,creatorId:I.creatorId,createdAt:I.createdAt,updatedAt:I.updatedAt,files:te.filter(N=>N&&N.dataKey),profileIds:B.profileIds||[]}});w(z)}}catch(S){console.error("Error fetching folders:",S),p(b("Failed to fetch profile data"))}finally{r(!1)}},L=o=>{var l;const t=Array.from(o.target.files||[]);t.length&&(o.target.value&&((l=o.target.files)!=null&&l.length)&&(localStorage.setItem(ee.SELECTED_PHOTOS,JSON.stringify(t.map(s=>({name:s.name,size:s.size,type:s.type})))),F?window.location.href=`/save-album.html?folderId=${encodeURIComponent(F)}`:window.location.href="/save-album.html"),o.target&&(o.target.value=""))},Q=o=>{var t;o&&(d(o),(t=i.current)==null||t.click())},K=n.useMemo(()=>y?a.filter(o=>{var s,u;const t=(s=o.folderName)==null?void 0:s.toLowerCase().includes(y.toLowerCase()),l=(u=o.folderDescription)==null?void 0:u.toLowerCase().includes(y.toLowerCase());return t||l}):a,[a,y]),j=R,V=(o,t)=>{w(l=>l.map(s=>s.folderId===o?{...s,profileIds:t}:s))};return e.jsxs(e.Fragment,{children:[e.jsx(pe,{}),e.jsxs(me,{isRTL:_,children:[e.jsx(Se,{username:c||b("User"),isCurrentUser:k,isRTL:_}),e.jsx(_e,{searchQuery:y,setSearchQuery:A,t:b,isRTL:_}),P&&e.jsx(he,{children:e.jsx("p",{children:b("Loading albums...")})}),x&&e.jsx(ge,{children:e.jsx("p",{children:x})}),!P&&!x&&e.jsx(xe,{folders:K,setFolders:w,isOwner:k,hasAddPhotoPermission:j,cognitoUsername:C,openFilePicker:Q,isProfileView:!0,updateProfileIds:V,footerComponent:ve}),R&&e.jsx(Le,{onFileSelection:L,ref:i})]})]})};ce.createRoot(document.getElementById("root")).render(e.jsx(de,{initialLanguage:localStorage.getItem(ee.LANGUAGE)||"en",children:e.jsx(Ae,{})}));
