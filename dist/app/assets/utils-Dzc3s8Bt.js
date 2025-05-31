import{a as u,L as B,h as P,f as N}from"./utils-BG1SNQS6.js";import{a as G}from"./types-DVf3Qveq.js";const j=y=>{const[f,F]=u.useState([]),[w,m]=u.useState([]),[R,E]=u.useState(null),[U,M]=u.useState(null),[d,T]=u.useState(""),[p,g]=u.useState(!1),[$,k]=u.useState(null);u.useEffect(()=>{E(localStorage.getItem(B.PUBLIC_USERNAME)||null),(async()=>{const n=await P();if(n){try{const o=JSON.parse(atob(n.split(".")[1]))["cognito:username"];M(o)}catch(s){console.error("Failed to decode token",s)}await Q(n)}})()},[]),u.useEffect(()=>{p||m(f)},[f,p]),u.useEffect(()=>{if(d===""){p||m(f);return}const n=(p?w:f).filter(s=>{var r,l;const o=(r=s.folderName)==null?void 0:r.toLowerCase().includes(d.toLowerCase()),i=(l=s.folderDescription)==null?void 0:l.toLowerCase().includes(d.toLowerCase());return o||i});m(n)},[d,f,p]);const v=a=>{g(!0),m(a),d&&m(n=>n.filter(s=>{var r,l;const o=(r=s.folderName)==null?void 0:r.toLowerCase().includes(d.toLowerCase()),i=(l=s.folderDescription)==null?void 0:l.toLowerCase().includes(d.toLowerCase());return o||i}))},K=()=>{g(!1),m(d?f.filter(a=>{var o,i;const n=(o=a.folderName)==null?void 0:o.toLowerCase().includes(d.toLowerCase()),s=(i=a.folderDescription)==null?void 0:i.toLowerCase().includes(d.toLowerCase());return n||s}):f)},Q=async a=>{var o,i,r;const n=`
      mutation FetchRelations($fetchRelationsInput: FetchRelationsInput!) {
        changeMyAccountItem(getSubscriptionInfoInput: true) {
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
        fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
          items {
            ... on FolderPosition {
              ${G}
            }
          }
        }
      }
    `,s={relationIds:["myAccountOwnerItemId_____myAccountOwnerItemId____SubscriptionInfo"],fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:50,scanIndexForward:!1}};try{const I=await(await fetch(N,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({query:n,variables:s})})).json(),c=(o=I==null?void 0:I.data)==null?void 0:o.changeMyAccountItem;c&&k({intNumberOfSubscriptions:c.intNumberOfSubscriptions||0,bytesOfDataUsed:c.bytesOfDataUsed||0,SubscriptionStatus:c.SubscriptionStatus});const S=(((r=(i=I==null?void 0:I.data)==null?void 0:i.fetchRelations)==null?void 0:r.items)||[]).map(b=>{var _,A,D,L;const e=b.folder,x=(((A=(_=e==null?void 0:e.fileReferencesPage)==null?void 0:_.items)==null?void 0:A.map(t=>t.file))||[]).filter(t=>t&&t.dataKey).map(t=>({dataKey:t.dataKey,thumbnailDataKey:t.thumbnailDataKey||null,durationInSeconds:t.durationInSeconds||null,dataInBytes:t.dataInBytes||0})),C={};return(D=e==null?void 0:e.contactsUsingInvite)!=null&&D.items&&e.contactsUsingInvite.items.forEach(t=>{var O;t!=null&&t.id&&((O=t==null?void 0:t.item)!=null&&O.publicDisplayName)&&(C[t.id]=t.item.publicDisplayName)}),{folderPositionId:b.id,folderId:e.id,albumNanoId:e.albumNanoId,folderName:e.folderName,folderDescription:e.folderDescription,folderPassword:e.folderPassword,creatorId:e.creatorId,createdAt:e.createdAt,updatedAt:e.updatedAt,files:x,profileIds:b.profileIds||[],contacts:C,usingFolderInviteGrantsRightToAddItems:((L=e==null?void 0:e.folderInviteParameters)==null?void 0:L.usingFolderInviteGrantsRightToAddItems)||!1}});F(S)}catch(l){console.error("Failed to load folders:",l),y(`❌ Failed to fetch folders: ${String(l)}`)}};return{folders:f,filteredFolders:w,publicUsername:R,cognitoUsername:U,searchQuery:d,setSearchQuery:T,handleContactFilterChange:v,resetContactFilter:K,handleDeleteClick:async(a,n)=>{var s,o,i;try{console.log("Deleting album with id:",a);const r=await P();if(!r){console.error("Authentication failed");return}const c=await(await fetch(N,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({query:`
        mutation DeleteFolderPosition($deletedFolderPositionIds: [ID!]) {
          changeFiles(deletedFolderPositionIds: $deletedFolderPositionIds) {
            items {
              ... on IdObject {
                id
              }
            }
          }
        }
      `,variables:{deletedFolderPositionIds:[a]}})})).json();if((o=(s=c==null?void 0:c.data)==null?void 0:s.changeFiles)!=null&&o.items)y(`✅ Successfully deleted folder position ${a}`),F(h=>h.filter(S=>S.folderPositionId!==a));else if(c.errors){const h=((i=c.errors[0])==null?void 0:i.message)||"Unknown GraphQL error";throw y(`❌ Failed to delete folder: ${h}`),new Error(h)}}catch(r){y(`❌ Failed to delete folder: ${String(r)}`),console.error("Failed to delete folder:",r),alert(n("Failed to delete album. Please try again."))}},setFolders:F,subscriptionInfo:$}};export{j as u};
