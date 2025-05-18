import{u as F,r as t,j as e,bs as Y,bt as W,B as q,ao as J,ap as R,aq as V,ar as A,bu as z,a as Z,I as X,k as ee,i as te,Y as oe,Z as se,G as re,A as ne,bv as U,g as ae}from"./styled-components-BzyOSDMK.js";import{c as k,v as ie}from"./utils-DR8GYyMm.js";import{S as le,A as ce}from"./AlbumList-DrFX2ciy.js";import"./fileOperations-8JbVB6RI.js";const de=({username:f,isCurrentUser:j,isRTL:x})=>{const{t:r}=F(),[m,h]=t.useState(!1),I=t.useRef(null),w=d=>{d.preventDefault(),d.stopPropagation(),h(!m)};t.useEffect(()=>{const d=S=>{I.current&&!I.current.contains(S.target)&&h(!1)},p=()=>{h(!1)};return m&&(document.addEventListener("mousedown",d),window.addEventListener("scroll",p)),()=>{document.removeEventListener("mousedown",d),window.removeEventListener("scroll",p)}},[m]);const g=d=>{d(),h(!1)};return e.jsxs(Y,{isRTL:x,children:[e.jsx(W,{isRTL:x,children:e.jsxs("div",{ref:I,style:{position:"relative"},children:[e.jsxs(q,{onClick:w,"aria-label":r("Menu"),"aria-expanded":m,children:[e.jsxs(J,{children:[e.jsx(R,{}),e.jsx(R,{}),e.jsx(R,{})]}),f||r("User Profile")]}),m&&e.jsxs(V,{children:[e.jsx(A,{onClick:()=>g(()=>{alert(r("Bio feature is coming soon! Stay tuned for updates where you can share more about yourself."))}),children:r("Bio")}),e.jsx(A,{onClick:()=>g(()=>{alert(r("Email feature is coming soon! Soon you will be able to share your email with connections."))}),children:r("E-mail")}),e.jsx(A,{onClick:()=>g(()=>{alert(r("Add Contact feature is coming soon! You will be able to add this person as a contact on 6180."))}),children:r("Contact On 6180")})]})]})}),j&&e.jsx(z,{children:e.jsx("p",{children:r("This is how others see your public profile")})})]})},ue=()=>{const[f,j]=t.useState(""),[x,r]=t.useState(null),[m,h]=t.useState(!0),[I,w]=t.useState(null),[g,d]=t.useState([]),[p,S]=t.useState(""),[T,G]=t.useState(!1),[P,M]=t.useState(null),B=t.useMemo(()=>{if(!P||!f)return!1;const u=f.split("_____");return u.length>0?u[0]===P:!1},[P,f]),{t:_,language:H}=F(),L=ae(H)==="rtl";t.useEffect(()=>{const s=(()=>{let i=new URLSearchParams(window.location.search).get("id"),o=i==null?void 0:i.replace(/-/g,"");if((o==null?void 0:o.length)===32?(o=ie(o),console.log(o)):console.error("Invalid UUID format: must be 32 characters after removing dashes"),o)return o;const y=window.location.pathname.match(/\/persona\/([^\/]+)/);return y&&y[1]?y[1]:null})();if(s){j(s);const a=s.split("_____");a.length>0&&r(a[0])}else w(_("No profile ID provided")),h(!1)},[_]),t.useEffect(()=>{(async()=>{try{const s=await k();if(s){G(!0);try{const i=JSON.parse(atob(s.split(".")[1]))["cognito:username"];M(i)}catch(a){console.error("Failed to decode token",a)}}}catch(s){console.error("Error checking login:",s)}})()},[]),t.useEffect(()=>{f&&K()},[f]);const K=async()=>{var u,s,a,i,o;h(!0),w(null);try{const y={ownerItemId:f,rangeKeyPrefix:"Folder",index:"ownerItemId_____RelationType____sortParameter",limit:1e3,scanIndexForward:!1,nextToken:null},C={relationIds:[`${f}_____Public____Profile`],fetchRelationsInput:y},v=`
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
      `;let n;if(T)try{const l=await k();l&&(n=await(await fetch(te,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${l}`},body:JSON.stringify({query:v,variables:C})})).json())}catch(l){console.error("Error fetching private data:",l)}if(n||(n=await(await fetch(oe,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":se},body:JSON.stringify({query:v,variables:C})})).json()),(s=(u=n==null?void 0:n.data)==null?void 0:u.batchGetItems)!=null&&s.items&&n.data.batchGetItems.items.length>0){const l=n.data.batchGetItems.items[0];(a=l==null?void 0:l.item)!=null&&a.anyDisplayName&&r(l.item.anyDisplayName)}if((o=(i=n==null?void 0:n.data)==null?void 0:i.fetchRelations)!=null&&o.items){const D=n.data.fetchRelations.items.map(E=>{var N,O;const c=E.folder,Q=((O=(N=c==null?void 0:c.fileReferencesPage)==null?void 0:N.items)==null?void 0:O.map(b=>b.file))||[];return{folderPositionId:E.id,folderId:c.id,albumNanoId:c.albumNanoId,folderName:c.folderName,folderDescription:c.folderDescription,folderPassword:c.folderPassword,creatorId:c.creatorId,createdAt:c.createdAt,updatedAt:c.updatedAt,files:Q.filter(b=>b&&b.dataKey),profileIds:E.profileIds||[]}});d(D)}}catch(y){console.error("Error fetching folders:",y),w(_("Failed to fetch profile data"))}finally{h(!1)}},$=t.useMemo(()=>p?g.filter(u=>{var i,o;const s=(i=u.folderName)==null?void 0:i.toLowerCase().includes(p.toLowerCase()),a=(o=u.folderDescription)==null?void 0:o.toLowerCase().includes(p.toLowerCase());return s||a}):g,[g,p]);return e.jsxs(e.Fragment,{children:[e.jsx(re,{}),e.jsxs(ne,{isRTL:L,children:[e.jsx(de,{username:x||_("User"),isCurrentUser:B,isRTL:L}),e.jsx(le,{searchQuery:p,setSearchQuery:S,t:_,isRTL:L}),m&&e.jsx(U,{type:"empty",children:e.jsx("p",{children:_("Loading albums...")})}),I&&e.jsx(U,{type:"error",children:e.jsx("p",{children:I})}),!m&&!I&&e.jsx(ce,{folders:$,setFolders:d,cognitoUsername:P,isProfileView:!0})]})]})};Z.createRoot(document.getElementById("root")).render(e.jsx(X,{initialLanguage:localStorage.getItem(ee.LANGUAGE)||"en",children:e.jsx(ue,{})}));
