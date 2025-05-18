import{u as F,r as t,j as e,bn as W,bo as Y,B as q,aj as J,ak as R,al as V,am as A,bp as z,a as X,I as Z,k as ee,i as te,Q as oe,U as se,G as re,A as ne,bq as k,g as ae}from"./styled-components-DL0uHAXq.js";import{c as v,o as ie}from"./utils-CzC9PFvy.js";import{S as le,A as ce}from"./AlbumList-4IjjomcE.js";import"./fileOperations-Cv5qw-6R.js";const de=({username:f,isCurrentUser:j,isRTL:x})=>{const{t:r}=F(),[m,h]=t.useState(!1),I=t.useRef(null),w=d=>{d.preventDefault(),d.stopPropagation(),h(!m)};t.useEffect(()=>{const d=S=>{I.current&&!I.current.contains(S.target)&&h(!1)},p=()=>{h(!1)};return m&&(document.addEventListener("mousedown",d),window.addEventListener("scroll",p)),()=>{document.removeEventListener("mousedown",d),window.removeEventListener("scroll",p)}},[m]);const g=d=>{d(),h(!1)};return e.jsxs(W,{isRTL:x,children:[e.jsx(Y,{isRTL:x,children:e.jsxs("div",{ref:I,style:{position:"relative"},children:[e.jsxs(q,{onClick:w,"aria-label":r("Menu"),"aria-expanded":m,children:[e.jsxs(J,{children:[e.jsx(R,{}),e.jsx(R,{}),e.jsx(R,{})]}),f||r("User Profile")]}),m&&e.jsxs(V,{children:[e.jsx(A,{onClick:()=>g(()=>{alert(r("Bio feature is coming soon! Stay tuned for updates where you can share more about yourself."))}),children:r("Bio")}),e.jsx(A,{onClick:()=>g(()=>{alert(r("Email feature is coming soon! Soon you will be able to share your email with connections."))}),children:r("E-mail")}),e.jsx(A,{onClick:()=>g(()=>{alert(r("Add Contact feature is coming soon! You will be able to add this person as a contact on 6180."))}),children:r("Contact On 6180")})]})]})}),j&&e.jsx(z,{children:e.jsx("p",{children:r("This is how others see your public profile")})})]})},ue=()=>{const[f,j]=t.useState(""),[x,r]=t.useState(null),[m,h]=t.useState(!0),[I,w]=t.useState(null),[g,d]=t.useState([]),[p,S]=t.useState(""),[T,G]=t.useState(!1),[P,M]=t.useState(null),B=t.useMemo(()=>{if(!P||!f)return!1;const u=f.split("_____");return u.length>0?u[0]===P:!1},[P,f]),{t:_,language:H}=F(),L=ae(H)==="rtl";t.useEffect(()=>{const s=(()=>{let i=new URLSearchParams(window.location.search).get("id"),o=i==null?void 0:i.replace(/-/g,"");if((o==null?void 0:o.length)===32?(o=ie(o),console.log(o)):console.error("Invalid UUID format: must be 32 characters after removing dashes"),o)return o;const y=window.location.pathname.match(/\/persona\/([^\/]+)/);return y&&y[1]?y[1]:null})();if(s){j(s);const a=s.split("_____");a.length>0&&r(a[0])}else w(_("No profile ID provided")),h(!1)},[_]),t.useEffect(()=>{(async()=>{try{const s=await v();if(s){G(!0);try{const i=JSON.parse(atob(s.split(".")[1]))["cognito:username"];M(i)}catch(a){console.error("Failed to decode token",a)}}}catch(s){console.error("Error checking login:",s)}})()},[]),t.useEffect(()=>{f&&K()},[f]);const K=async()=>{var u,s,a,i,o;h(!0),w(null);try{const y={ownerItemId:f,rangeKeyPrefix:"Folder",index:"ownerItemId_____RelationType____sortParameter",limit:1e3,scanIndexForward:!1,nextToken:null},C={relationIds:[`${f}_____Public____Profile`],fetchRelationsInput:y},D=`
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
      `;let n;if(T)try{const l=await v();l&&(n=await(await fetch(te,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${l}`},body:JSON.stringify({query:D,variables:C})})).json())}catch(l){console.error("Error fetching private data:",l)}if(n||(n=await(await fetch(oe,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":se},body:JSON.stringify({query:D,variables:C})})).json()),(s=(u=n==null?void 0:n.data)==null?void 0:u.batchGetItems)!=null&&s.items&&n.data.batchGetItems.items.length>0){const l=n.data.batchGetItems.items[0];(a=l==null?void 0:l.item)!=null&&a.anyDisplayName&&r(l.item.anyDisplayName)}if((o=(i=n==null?void 0:n.data)==null?void 0:i.fetchRelations)!=null&&o.items){const N=n.data.fetchRelations.items.map(E=>{var O,U;const c=E.folder,$=((U=(O=c==null?void 0:c.fileReferencesPage)==null?void 0:O.items)==null?void 0:U.map(b=>b.file))||[];return{folderPositionId:E.id,folderId:c.id,albumNanoId:c.albumNanoId,folderName:c.folderName,folderDescription:c.folderDescription,folderPassword:c.folderPassword,creatorId:c.creatorId,createdAt:c.createdAt,updatedAt:c.updatedAt,files:$.filter(b=>b&&b.dataKey),profileIds:E.profileIds||[]}});d(N)}}catch(y){console.error("Error fetching folders:",y),w(_("Failed to fetch profile data"))}finally{h(!1)}},Q=t.useMemo(()=>p?g.filter(u=>{var i,o;const s=(i=u.folderName)==null?void 0:i.toLowerCase().includes(p.toLowerCase()),a=(o=u.folderDescription)==null?void 0:o.toLowerCase().includes(p.toLowerCase());return s||a}):g,[g,p]);return e.jsxs(e.Fragment,{children:[e.jsx(re,{}),e.jsxs(ne,{isRTL:L,children:[e.jsx(de,{username:x||_("User"),isCurrentUser:B,isRTL:L}),e.jsx(le,{searchQuery:p,setSearchQuery:S,t:_,isRTL:L}),m&&e.jsx(k,{type:"empty",children:e.jsx("p",{children:_("Loading albums...")})}),I&&e.jsx(k,{type:"error",children:e.jsx("p",{children:I})}),!m&&!I&&e.jsx(ce,{folders:Q,setFolders:d,cognitoUsername:P,isProfileView:!0})]})]})};X.createRoot(document.getElementById("root")).render(e.jsx(Z,{initialLanguage:localStorage.getItem(ee.LANGUAGE)||"en",children:e.jsx(ue,{})}));
