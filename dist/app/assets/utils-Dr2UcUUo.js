import{a as u,L as G,h as P,f as N}from"./utils-BJzWXlCI.js";import{a as J}from"./types-DVf3Qveq.js";const H=F=>{const[f,S]=u.useState([]),[b,I]=u.useState([]),[R,E]=u.useState(null),[U,M]=u.useState(null),[d,T]=u.useState(""),[h,w]=u.useState(!1),[$,v]=u.useState(null);u.useEffect(()=>{E(localStorage.getItem(G.PUBLIC_USERNAME)||null),(async()=>{const n=await P();if(n){try{const o=JSON.parse(atob(n.split(".")[1]))["cognito:username"];M(o)}catch(s){console.error("Failed to decode token",s)}await Q(n)}})()},[]),u.useEffect(()=>{h||I(f)},[f,h]),u.useEffect(()=>{if(d===""){h||I(f);return}const n=(h?b:f).filter(s=>{var r,l;const o=(r=s.folderName)==null?void 0:r.toLowerCase().includes(d.toLowerCase()),i=(l=s.folderDescription)==null?void 0:l.toLowerCase().includes(d.toLowerCase());return o||i});I(n)},[d,f,h]);const k=a=>{w(!0),I(a),d&&I(n=>n.filter(s=>{var r,l;const o=(r=s.folderName)==null?void 0:r.toLowerCase().includes(d.toLowerCase()),i=(l=s.folderDescription)==null?void 0:l.toLowerCase().includes(d.toLowerCase());return o||i}))},K=()=>{w(!1),I(d?f.filter(a=>{var o,i;const n=(o=a.folderName)==null?void 0:o.toLowerCase().includes(d.toLowerCase()),s=(i=a.folderDescription)==null?void 0:i.toLowerCase().includes(d.toLowerCase());return n||s}):f)},Q=async a=>{var o,i,r;const n=`
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
            ${J}
          }
        }
      }
    }
  `,s={relationIds:["myAccountOwnerItemId_____myAccountOwnerItemId____SubscriptionInfo"],fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}};try{const p=await(await fetch(N,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({query:n,variables:s})})).json(),c=(o=p==null?void 0:p.data)==null?void 0:o.changeMyAccountItem;c&&v({intNumberOfSubscriptions:c.intNumberOfSubscriptions||0,bytesOfDataUsed:c.bytesOfDataUsed||0,SubscriptionStatus:c.SubscriptionStatus});const x=(((r=(i=p==null?void 0:p.data)==null?void 0:i.fetchRelations)==null?void 0:r.items)||[]).filter(m=>m&&m.id&&m.folder&&m.folder.id).map(m=>{var _,A,D,L;const e=m.folder,B=(((A=(_=e==null?void 0:e.fileReferencesPage)==null?void 0:_.items)==null?void 0:A.map(t=>t.file))||[]).filter(t=>t&&t.dataKey).map(t=>({dataKey:t.dataKey,thumbnailDataKey:t.thumbnailDataKey||null,durationInSeconds:t.durationInSeconds||null,dataInBytes:t.dataInBytes||0})),C={};return(D=e==null?void 0:e.contactsUsingInvite)!=null&&D.items&&e.contactsUsingInvite.items.forEach(t=>{var O;t!=null&&t.id&&((O=t==null?void 0:t.item)!=null&&O.publicDisplayName)&&(C[t.id]=t.item.publicDisplayName)}),{folderPositionId:m.id,folderId:e.id,albumNanoId:e.albumNanoId,folderName:e.folderName,folderDescription:e.folderDescription,folderPassword:e.folderPassword,creatorId:e.creatorId,createdAt:e.createdAt,updatedAt:e.updatedAt,files:B,profileIds:m.profileIds||[],contacts:C,usingFolderInviteGrantsRightToAddItems:((L=e==null?void 0:e.folderInviteParameters)==null?void 0:L.usingFolderInviteGrantsRightToAddItems)||!1}});S(x)}catch(l){console.error("Failed to load folders:",l),F(`❌ Failed to fetch folders: ${String(l)}`)}};return{folders:f,filteredFolders:b,publicUsername:R,cognitoUsername:U,searchQuery:d,setSearchQuery:T,handleContactFilterChange:k,resetContactFilter:K,handleDeleteClick:async(a,n)=>{var s,o,i;try{console.log("Deleting album with id:",a);const r=await P();if(!r){console.error("Authentication failed");return}const c=await(await fetch(N,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({query:`
        mutation DeleteFolderPosition($deletedFolderPositionIds: [ID!]) {
          changeFiles(deletedFolderPositionIds: $deletedFolderPositionIds) {
            items {
              ... on IdObject {
                id
              }
            }
          }
        }
      `,variables:{deletedFolderPositionIds:[a]}})})).json();if((o=(s=c==null?void 0:c.data)==null?void 0:s.changeFiles)!=null&&o.items)F(`✅ Successfully deleted folder position ${a}`),S(y=>y.filter(g=>g.folderPositionId!==a));else if(c.errors){const y=((i=c.errors[0])==null?void 0:i.message)||"Unknown GraphQL error";throw F(`❌ Failed to delete folder: ${y}`),new Error(y)}}catch(r){F(`❌ Failed to delete folder: ${String(r)}`),console.error("Failed to delete folder:",r),alert(n("Failed to delete album. Please try again."))}},setFolders:S,subscriptionInfo:$}};export{H as u};
