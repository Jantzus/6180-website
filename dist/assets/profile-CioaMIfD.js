import{a as B,j as s,I as Q,k as H,r,u as W,i as Y,Y as J,Z as V,G as q,A as z,bs as Z,bt as j,g as X}from"./styled-components-WbEdUEGX.js";import{c as D,v as ee}from"./utils-CUEafdQF.js";import{S as te,A as re}from"./AlbumList-xZSE5EOo.js";import"./fileOperations-CczqjMOI.js";const se=()=>{const[d,F]=r.useState(""),[U,R]=r.useState(null),[S,I]=r.useState(!0),[g,_]=r.useState(null),[y,L]=r.useState([]),[m,O]=r.useState(""),[T,C]=r.useState(!1),[p,k]=r.useState(null),G=r.useMemo(()=>{if(!p||!d)return!1;const c=d.split("_____");return c.length>0?c[0]===p:!1},[p,d]),{t:u,language:v}=W(),P=X(v)==="rtl";r.useEffect(()=>{const t=(()=>{let n=new URLSearchParams(window.location.search).get("id"),e=n==null?void 0:n.replace(/-/g,"");if((e==null?void 0:e.length)===32?(e=ee(e),console.log(e)):console.error("Invalid UUID format: must be 32 characters after removing dashes"),e)return e;const f=window.location.pathname.match(/\/persona\/([^\/]+)/);return f&&f[1]?f[1]:null})();if(t){F(t);const a=t.split("_____");a.length>0&&R(a[0])}else _(u("No profile ID provided")),I(!1)},[u]),r.useEffect(()=>{(async()=>{try{const t=await D();if(t){C(!0);try{const n=JSON.parse(atob(t.split(".")[1]))["cognito:username"];k(n)}catch(a){console.error("Failed to decode token",a)}}}catch(t){console.error("Error checking login:",t)}})()},[]),r.useEffect(()=>{d&&K()},[d]);const K=async()=>{var c,t,a,n,e;I(!0),_(null);try{const f={ownerItemId:d,rangeKeyPrefix:"Folder",index:"ownerItemId_____RelationType____sortParameter",limit:1e3,scanIndexForward:!1,nextToken:null},x={relationIds:[`${d}_____Public____Profile`],fetchRelationsInput:f},A=`
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
      `;let o;if(T)try{const i=await D();i&&(o=await(await fetch(Y,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({query:A,variables:x})})).json())}catch(i){console.error("Error fetching private data:",i)}if(o||(o=await(await fetch(J,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":V},body:JSON.stringify({query:A,variables:x})})).json()),(t=(c=o==null?void 0:o.data)==null?void 0:c.batchGetItems)!=null&&t.items&&o.data.batchGetItems.items.length>0){const i=o.data.batchGetItems.items[0];(a=i==null?void 0:i.item)!=null&&a.anyDisplayName&&R(i.item.anyDisplayName)}if((e=(n=o==null?void 0:o.data)==null?void 0:n.fetchRelations)!=null&&e.items){const b=o.data.fetchRelations.items.map(w=>{var E,N;const l=w.folder,$=((N=(E=l==null?void 0:l.fileReferencesPage)==null?void 0:E.items)==null?void 0:N.map(h=>h.file))||[];return{folderPositionId:w.id,folderId:l.id,albumNanoId:l.albumNanoId,folderName:l.folderName,folderDescription:l.folderDescription,folderPassword:l.folderPassword,creatorId:l.creatorId,createdAt:l.createdAt,updatedAt:l.updatedAt,files:$.filter(h=>h&&h.dataKey),profileIds:w.profileIds||[]}});L(b)}}catch(f){console.error("Error fetching folders:",f),_(u("Failed to fetch profile data"))}finally{I(!1)}},M=r.useMemo(()=>m?y.filter(c=>{var n,e;const t=(n=c.folderName)==null?void 0:n.toLowerCase().includes(m.toLowerCase()),a=(e=c.folderDescription)==null?void 0:e.toLowerCase().includes(m.toLowerCase());return t||a}):y,[y,m]);return s.jsxs(s.Fragment,{children:[s.jsx(q,{}),s.jsxs(z,{isRTL:P,children:[s.jsx(Z,{username:U||u("User"),isCurrentUser:G,isRTL:P}),s.jsx(te,{searchQuery:m,setSearchQuery:O,t:u,isRTL:P}),S&&s.jsx(j,{type:"empty",children:s.jsx("p",{children:u("Loading albums...")})}),g&&s.jsx(j,{type:"error",children:s.jsx("p",{children:g})}),!S&&!g&&s.jsx(re,{folders:M,setFolders:L,cognitoUsername:p,isProfileView:!0})]})]})};B.createRoot(document.getElementById("root")).render(s.jsx(Q,{initialLanguage:localStorage.getItem(H.LANGUAGE)||"en",children:s.jsx(se,{})}));
