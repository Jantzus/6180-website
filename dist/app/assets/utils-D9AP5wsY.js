import{a as c,L as B,h as N,f as R}from"./utils-BG1SNQS6.js";import{a as J}from"./types-DVf3Qveq.js";const V=b=>{const[m,F]=c.useState([]),[w,p]=c.useState([]),[U,E]=c.useState(null),[$,T]=c.useState(null),[d,M]=c.useState(""),[h,g]=c.useState(!1),[k,C]=c.useState(null);c.useEffect(()=>{E(localStorage.getItem(B.PUBLIC_USERNAME)||null),(async()=>{const n=await N();if(n){try{const o=JSON.parse(atob(n.split(".")[1]))["cognito:username"];T(o)}catch(s){console.error("Failed to decode token",s)}await K(n)}})()},[]),c.useEffect(()=>{h||p(m)},[m,h]),c.useEffect(()=>{if(d===""){h||p(m);return}const n=(h?w:m).filter(s=>{var r,u;const o=(r=s.folderName)==null?void 0:r.toLowerCase().includes(d.toLowerCase()),i=(u=s.folderDescription)==null?void 0:u.toLowerCase().includes(d.toLowerCase());return o||i});p(n)},[d,m,h]);const v=a=>{g(!0),p(a),d&&p(n=>n.filter(s=>{var r,u;const o=(r=s.folderName)==null?void 0:r.toLowerCase().includes(d.toLowerCase()),i=(u=s.folderDescription)==null?void 0:u.toLowerCase().includes(d.toLowerCase());return o||i}))},G=()=>{g(!1),p(d?m.filter(a=>{var o,i;const n=(o=a.folderName)==null?void 0:o.toLowerCase().includes(d.toLowerCase()),s=(i=a.folderDescription)==null?void 0:i.toLowerCase().includes(d.toLowerCase());return n||s}):m)},K=async a=>{var o,i,r,u,S;const n=`
      mutation FetchRelations($relationIds: [ID!], $fetchRelationsInput: FetchRelationsInput!) {
        batchGetItems(relationIds: $relationIds) {
            items {
                id
                item {
                    ... on SubscriptionInfo {
                      id
                      createdAt
                      updatedAt
                      stripeCustomerId
                      SubscriptionStatus
                      intNumberOfSubscriptions
                      bytesOfDataUsed
                    }
                }
            }
            nextToken
        }      
        fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
          items {
            ... on FolderPosition {
              ${J}
            }
          }
        }
      }
    `,s={relationIds:["myAccountOwnerItemId_____myAccountOwnerItemId____SubscriptionInfo"],fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:50,scanIndexForward:!1}};try{const l=await(await fetch(R,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({query:n,variables:s})})).json(),y=((i=(o=l==null?void 0:l.data)==null?void 0:o.batchGetItems)==null?void 0:i.items)||[];if(y.length>0){const I=(r=y[0])==null?void 0:r.item;I&&C({intNumberOfSubscriptions:I.intNumberOfSubscriptions||0,bytesOfDataUsed:I.bytesOfDataUsed||0,SubscriptionStatus:I.SubscriptionStatus})}else C({intNumberOfSubscriptions:0,bytesOfDataUsed:0});const x=(((S=(u=l==null?void 0:l.data)==null?void 0:u.fetchRelations)==null?void 0:S.items)||[]).map(I=>{var D,O,A,L;const e=I.folder,Q=(((O=(D=e==null?void 0:e.fileReferencesPage)==null?void 0:D.items)==null?void 0:O.map(t=>t.file))||[]).filter(t=>t&&t.dataKey).map(t=>({dataKey:t.dataKey,thumbnailDataKey:t.thumbnailDataKey||null,durationInSeconds:t.durationInSeconds||null,dataInBytes:t.dataInBytes||0})),_={};return(A=e==null?void 0:e.contactsUsingInvite)!=null&&A.items&&e.contactsUsingInvite.items.forEach(t=>{var P;t!=null&&t.id&&((P=t==null?void 0:t.item)!=null&&P.publicDisplayName)&&(_[t.id]=t.item.publicDisplayName)}),{folderPositionId:I.id,folderId:e.id,albumNanoId:e.albumNanoId,folderName:e.folderName,folderDescription:e.folderDescription,folderPassword:e.folderPassword,creatorId:e.creatorId,createdAt:e.createdAt,updatedAt:e.updatedAt,files:Q,profileIds:I.profileIds||[],contacts:_,usingFolderInviteGrantsRightToAddItems:((L=e==null?void 0:e.folderInviteParameters)==null?void 0:L.usingFolderInviteGrantsRightToAddItems)||!1}});F(x)}catch(f){console.error("Failed to load folders:",f),b(`❌ Failed to fetch folders: ${String(f)}`)}};return{folders:m,filteredFolders:w,publicUsername:U,cognitoUsername:$,searchQuery:d,setSearchQuery:M,handleContactFilterChange:v,resetContactFilter:G,handleDeleteClick:async(a,n)=>{var s,o,i;try{console.log("Deleting album with id:",a);const r=await N();if(!r){console.error("Authentication failed");return}const f=await(await fetch(R,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({query:`
        mutation DeleteFolderPosition($deletedFolderPositionIds: [ID!]) {
          changeFiles(deletedFolderPositionIds: $deletedFolderPositionIds) {
            items {
              ... on IdObject {
                id
              }
            }
          }
        }
      `,variables:{deletedFolderPositionIds:[a]}})})).json();if((o=(s=f==null?void 0:f.data)==null?void 0:s.changeFiles)!=null&&o.items)b(`✅ Successfully deleted folder position ${a}`),F(l=>l.filter(y=>y.folderPositionId!==a));else if(f.errors){const l=((i=f.errors[0])==null?void 0:i.message)||"Unknown GraphQL error";throw b(`❌ Failed to delete folder: ${l}`),new Error(l)}}catch(r){b(`❌ Failed to delete folder: ${String(r)}`),console.error("Failed to delete folder:",r),alert(n("Failed to delete album. Please try again."))}},setFolders:F,subscriptionInfo:k}};export{V as u};
