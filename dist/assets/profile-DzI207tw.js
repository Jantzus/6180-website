import{a as $,j as s,I as B,l as Q,r,u as W,k as H,a8 as V,a9 as J,G as Y,A as q,bV as z,bW as X,bX as Z,g as ee}from"./styled-components-DkYxFBSZ.js";import{c as j,v as te}from"./utils-hueEu8Lu.js";import{S as re,A as se}from"./AlbumList-g_3SaCHg.js";import"./fileOperations-0w6loW-L.js";const ae=()=>{const[d,D]=r.useState(""),[F,S]=r.useState(null),[R,I]=r.useState(!0),[g,_]=r.useState(null),[y,L]=r.useState([]),[m,U]=r.useState(""),[O,T]=r.useState(!1),[p,C]=r.useState(null),k=r.useMemo(()=>{if(!p||!d)return!1;const c=d.split("_____");return c.length>0?c[0]===p:!1},[p,d]),{t:u,language:G}=W(),P=ee(G)==="rtl";r.useEffect(()=>{const t=(()=>{let n=new URLSearchParams(window.location.search).get("id"),e=n==null?void 0:n.replace(/-/g,"");if((e==null?void 0:e.length)===32?(e=te(e),console.log(e)):console.error("Invalid UUID format: must be 32 characters after removing dashes"),e)return e;const f=window.location.pathname.match(/\/persona\/([^\/]+)/);return f&&f[1]?f[1]:null})();if(t){D(t);const o=t.split("_____");o.length>0&&S(o[0])}else _(u("No profile ID provided")),I(!1)},[u]),r.useEffect(()=>{(async()=>{try{const t=await j();if(t){T(!0);try{const n=JSON.parse(atob(t.split(".")[1]))["cognito:username"];C(n)}catch(o){console.error("Failed to decode token",o)}}}catch(t){console.error("Error checking login:",t)}})()},[]),r.useEffect(()=>{d&&v()},[d]);const v=async()=>{var c,t,o,n,e;I(!0),_(null);try{const f={ownerItemId:d,rangeKeyPrefix:"Folder",index:"ownerItemId_____RelationType____sortParameter",limit:1e3,scanIndexForward:!1,nextToken:null},b={relationIds:[`${d}_____Public____Profile`],fetchRelationsInput:f},x=`
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
      `;let a;if(O)try{const i=await j();i&&(a=await(await fetch(H,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({query:x,variables:b})})).json())}catch(i){console.error("Error fetching private data:",i)}if(a||(a=await(await fetch(V,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":J},body:JSON.stringify({query:x,variables:b})})).json()),(t=(c=a==null?void 0:a.data)==null?void 0:c.batchGetItems)!=null&&t.items&&a.data.batchGetItems.items.length>0){const i=a.data.batchGetItems.items[0];(o=i==null?void 0:i.item)!=null&&o.anyDisplayName&&S(i.item.anyDisplayName)}if((e=(n=a==null?void 0:a.data)==null?void 0:n.fetchRelations)!=null&&e.items){const A=a.data.fetchRelations.items.map(w=>{var E,N;const l=w.folder,M=((N=(E=l==null?void 0:l.fileReferencesPage)==null?void 0:E.items)==null?void 0:N.map(h=>h.file))||[];return{folderPositionId:w.id,folderId:l.id,albumNanoId:l.albumNanoId,folderName:l.folderName,folderDescription:l.folderDescription,folderPassword:l.folderPassword,creatorId:l.creatorId,createdAt:l.createdAt,updatedAt:l.updatedAt,files:M.filter(h=>h&&h.dataKey),profileIds:w.profileIds||[]}});L(A)}}catch(f){console.error("Error fetching folders:",f),_(u("Failed to fetch profile data"))}finally{I(!1)}},K=r.useMemo(()=>m?y.filter(c=>{var n,e;const t=(n=c.folderName)==null?void 0:n.toLowerCase().includes(m.toLowerCase()),o=(e=c.folderDescription)==null?void 0:e.toLowerCase().includes(m.toLowerCase());return t||o}):y,[y,m]);return s.jsxs(s.Fragment,{children:[s.jsx(Y,{}),s.jsxs(q,{isRTL:P,children:[s.jsx(z,{username:F||u("User"),isCurrentUser:k,isRTL:P}),s.jsx(re,{searchQuery:m,setSearchQuery:U,t:u,isRTL:P}),R&&s.jsx(X,{children:s.jsx("p",{children:u("Loading albums...")})}),g&&s.jsx(Z,{children:s.jsx("p",{children:g})}),!R&&!g&&s.jsx(se,{folders:K,setFolders:L,cognitoUsername:p,isProfileView:!0})]})]})};$.createRoot(document.getElementById("root")).render(s.jsx(B,{initialLanguage:localStorage.getItem(Q.LANGUAGE)||"en",children:s.jsx(ae,{})}));
