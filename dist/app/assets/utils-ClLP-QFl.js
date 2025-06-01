import{a as l,L as q,h as O,f as R}from"./utils-BzOvwzP3.js";import{a as z}from"./types-DVf3Qveq.js";const W=h=>h.reduce((i,y)=>{const b=y.files.reduce((f,w)=>f+(w.dataInBytes||0),0);return i+b},0),X=h=>{const[i,y]=l.useState([]),[b,f]=l.useState([]),[w,E]=l.useState(null),[U,T]=l.useState(null),[c,B]=l.useState(""),[F,g]=l.useState(!1),[M,$]=l.useState(null),[v,k]=l.useState(0);l.useEffect(()=>{const s=W(i);k(s)},[i]),l.useEffect(()=>{E(localStorage.getItem(q.PUBLIC_USERNAME)||null),(async()=>{const n=await O();if(n){try{const r=JSON.parse(atob(n.split(".")[1]))["cognito:username"];T(r)}catch(o){console.error("Failed to decode token",o)}await x(n)}})()},[]),l.useEffect(()=>{F||f(i)},[i,F]),l.useEffect(()=>{if(c===""){F||f(i);return}const n=(F?b:i).filter(o=>{var a,u;const r=(a=o.folderName)==null?void 0:a.toLowerCase().includes(c.toLowerCase()),d=(u=o.folderDescription)==null?void 0:u.toLowerCase().includes(c.toLowerCase());return r||d});f(n)},[c,i,F]);const K=s=>{g(!0),f(s),c&&f(n=>n.filter(o=>{var a,u;const r=(a=o.folderName)==null?void 0:a.toLowerCase().includes(c.toLowerCase()),d=(u=o.folderDescription)==null?void 0:u.toLowerCase().includes(c.toLowerCase());return r||d}))},Q=()=>{g(!1),f(c?i.filter(s=>{var r,d;const n=(r=s.folderName)==null?void 0:r.toLowerCase().includes(c.toLowerCase()),o=(d=s.folderDescription)==null?void 0:d.toLowerCase().includes(c.toLowerCase());return n||o}):i)},x=async s=>{var r,d,a;const n=`
    mutation FetchRelations($fetchRelationsInput: FetchRelationsInput!) {
      changeMyAccountItem(getSubscriptionInfoInput: true) {
        ... on SubscriptionInfo {
          id
          createdAt
          updatedAt
          stripeCustomerId
          SubscriptionStatus
          intNumberOfSubscriptions
        }
      }     
      fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
        items {
          ... on FolderPosition {
            ${z}
          }
        }
      }
    }
  `,o={relationIds:["myAccountOwnerItemId_____myAccountOwnerItemId____SubscriptionInfo"],fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}};try{const p=await(await fetch(R,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify({query:n,variables:o})})).json(),m=(r=p==null?void 0:p.data)==null?void 0:r.changeMyAccountItem;m&&$({intNumberOfSubscriptions:m.intNumberOfSubscriptions||0,bytesOfDataUsed:0,SubscriptionStatus:m.SubscriptionStatus});const G=(((a=(d=p==null?void 0:p.data)==null?void 0:d.fetchRelations)==null?void 0:a.items)||[]).filter(I=>I&&I.id&&I.folder&&I.folder.id).map(I=>{var A,L,P,D;const e=I.folder,J=(((L=(A=e==null?void 0:e.fileReferencesPage)==null?void 0:A.items)==null?void 0:L.map(t=>t.file))||[]).filter(t=>t&&t.dataKey).map(t=>({dataKey:t.dataKey,thumbnailDataKey:t.thumbnailDataKey||null,durationInSeconds:t.durationInSeconds||null,dataInBytes:t.dataInBytes||0})),_={};return(P=e==null?void 0:e.contactsUsingInvite)!=null&&P.items&&e.contactsUsingInvite.items.forEach(t=>{var N;t!=null&&t.id&&((N=t==null?void 0:t.item)!=null&&N.publicDisplayName)&&(_[t.id]=t.item.publicDisplayName)}),{folderPositionId:I.id,folderId:e.id,albumNanoId:e.albumNanoId,folderName:e.folderName,folderDescription:e.folderDescription,folderPassword:e.folderPassword,creatorId:e.creatorId,createdAt:e.createdAt,updatedAt:e.updatedAt,files:J,profileIds:I.profileIds||[],contacts:_,usingFolderInviteGrantsRightToAddItems:((D=e==null?void 0:e.folderInviteParameters)==null?void 0:D.usingFolderInviteGrantsRightToAddItems)||!1}});y(G)}catch(u){console.error("Failed to load folders:",u),h(`❌ Failed to fetch folders: ${String(u)}`)}};return{folders:i,filteredFolders:b,publicUsername:w,cognitoUsername:U,searchQuery:c,setSearchQuery:B,handleContactFilterChange:K,resetContactFilter:Q,handleDeleteClick:async(s,n)=>{var o,r,d;try{console.log("Deleting album with id:",s);const a=await O();if(!a){console.error("Authentication failed");return}const m=await(await fetch(R,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({query:`
        mutation DeleteFolderPosition($deletedFolderPositionIds: [ID!]) {
          changeFiles(deletedFolderPositionIds: $deletedFolderPositionIds) {
            items {
              ... on IdObject {
                id
              }
            }
          }
        }
      `,variables:{deletedFolderPositionIds:[s]}})})).json();if((r=(o=m==null?void 0:m.data)==null?void 0:o.changeFiles)!=null&&r.items)h(`✅ Successfully deleted folder position ${s}`),y(S=>S.filter(C=>C.folderPositionId!==s));else if(m.errors){const S=((d=m.errors[0])==null?void 0:d.message)||"Unknown GraphQL error";throw h(`❌ Failed to delete folder: ${S}`),new Error(S)}}catch(a){h(`❌ Failed to delete folder: ${String(a)}`),console.error("Failed to delete folder:",a),alert(n("Failed to delete album. Please try again."))}},setFolders:y,subscriptionInfo:M,calculatedBytesUsed:v}};export{X as u};
