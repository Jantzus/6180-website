import{r as f,l as V,m as M,k as D}from"./buttons-DmOL7fFv.js";import{F as Y}from"./types-CyPfckSQ.js";const X=h=>h.reduce((c,g)=>{const F=g.files.reduce((d,w)=>d+(w.dataInBytes||0),0);return c+F},0),ne=h=>{const[c,g]=f.useState([]),[F,d]=f.useState([]),[w,U]=f.useState(null),[v,B]=f.useState(null),[n,Q]=f.useState(""),[S,C]=f.useState(!1),[b,T]=f.useState(!1),[G,k]=f.useState(null),[K,j]=f.useState(0);f.useEffect(()=>{const e=X(c);j(e)},[c]);const x=async e=>{var r;try{const s=await(await fetch(D,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({query:`
        mutation GetSubscriptionInfo {
          changeMySubscription(getSubscriptionInfoInput: true) {
            ... on SubscriptionInfo {
              id
              createdAt
              updatedAt
              stripeCustomerId
              SubscriptionStatus
              intNumberOfSubscriptions
            }
          }
        }
      `})})).json();if(s.errors){console.error("Subscription GraphQL errors:",s.errors),h(`⚠️ Warning: Failed to fetch subscription info: ${JSON.stringify(s.errors)}`);return}const i=(r=s==null?void 0:s.data)==null?void 0:r.changeMySubscription;i&&(k({intNumberOfSubscriptions:i.intNumberOfSubscriptions||0,bytesOfDataUsed:0,SubscriptionStatus:i.SubscriptionStatus}),h("✅ Successfully fetched subscription info"))}catch(t){console.error("Failed to load subscription info:",t),h(`⚠️ Warning: Failed to fetch subscription info: ${String(t)}`)}},W=async e=>{var r,t;try{const o=`
        mutation FetchRelations($fetchRelationsInput: FetchRelationsInput!) {
          fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
            items {
              ... on FolderPosition {
                ${Y}
              }
            }
          }
        }
      `,s={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}},u=await(await fetch(D,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({query:o,variables:s})})).json();if(u.errors){console.error("Folders GraphQL errors:",u.errors),h(`❌ Failed to fetch folders: ${JSON.stringify(u.errors)}`);return}const m=(((t=(r=u==null?void 0:u.data)==null?void 0:r.fetchRelations)==null?void 0:t.items)||[]).filter(p=>p&&p.id&&p.folder&&p.folder.id).map(p=>{var P,O,$;const a=p.folder,z=(((P=a==null?void 0:a.fileReferencesPage)==null?void 0:P.items)||[]).filter(l=>l&&l.file&&l.file.dataKey).map(l=>{var _;const y=l.file,H=((_=l.selectedTags)==null?void 0:_.map(N=>{var E;return{TagType:N.TagType,tagTitle:N.tagTitle,subtags:((E=N.subtags)==null?void 0:E.map(R=>({TagType:R.TagType,tagTitle:R.tagTitle,subtagTitle:R.subtagTitle})))||[]}}))||[];return{dataKey:y.dataKey,thumbnailDataKey:y.thumbnailDataKey||void 0,durationInSeconds:y.durationInSeconds||void 0,dataInBytes:y.dataInBytes||0,selectedTags:H,fileDisplayName:l.fileDisplayName||void 0}}),A={};return(O=a==null?void 0:a.contactsUsingInvite)!=null&&O.items&&a.contactsUsingInvite.items.forEach(l=>{var y;l!=null&&l.id&&((y=l==null?void 0:l.item)!=null&&y.publicDisplayName)&&(A[l.id]=l.item.publicDisplayName)}),{folderPositionId:p.id,folderId:a.id,albumNanoId:a.albumNanoId,folderName:a.folderName,folderDescription:a.folderDescription,folderPassword:a.folderPassword,creatorId:a.creatorId,createdAt:a.createdAt,updatedAt:a.updatedAt,files:z,profileIds:p.profileIds||[],contacts:A,usingFolderInviteGrantsRightToAddItems:(($=a==null?void 0:a.folderInviteParameters)==null?void 0:$.usingFolderInviteGrantsRightToAddItems)||!1}});g(m);const L=m.length,q=m.filter(p=>p.files.some(a=>a.selectedTags&&a.selectedTags.length>0)).length;h(`✅ Successfully fetched ${L} folders, ${q} have tags`),await x(e)}catch(o){console.error("Failed to load folders:",o),h(`❌ Failed to fetch folders: ${String(o)}`)}};return f.useEffect(()=>{U(localStorage.getItem(V.PUBLIC_USERNAME)||null),(async()=>{const r=await M();if(r){try{const o=JSON.parse(atob(r.split(".")[1]))["cognito:username"];B(o)}catch(t){console.error("Failed to decode token",t)}await W(r)}})()},[]),f.useEffect(()=>{!S&&!b&&d(c)},[c,S,b]),f.useEffect(()=>{if(n===""){!S&&!b&&d(c);return}const e=c.filter(r=>{var s,i;const t=(s=r.folderName)==null?void 0:s.toLowerCase().includes(n.toLowerCase()),o=(i=r.folderDescription)==null?void 0:i.toLowerCase().includes(n.toLowerCase());return t||o});!S&&!b&&d(e)},[n,c]),{folders:c,filteredFolders:F,publicUsername:w,cognitoUsername:v,searchQuery:n,setSearchQuery:Q,handleContactFilterChange:e=>{if(C(!0),T(!1),n){const r=e.filter(t=>{var i,u;const o=(i=t.folderName)==null?void 0:i.toLowerCase().includes(n.toLowerCase()),s=(u=t.folderDescription)==null?void 0:u.toLowerCase().includes(n.toLowerCase());return o||s});d(r)}else d(e)},resetContactFilter:()=>{C(!1),d(n?c.filter(e=>{var o,s;const r=(o=e.folderName)==null?void 0:o.toLowerCase().includes(n.toLowerCase()),t=(s=e.folderDescription)==null?void 0:s.toLowerCase().includes(n.toLowerCase());return r||t}):c)},handleTagFilterChange:e=>{if(T(!0),C(!1),n){const r=e.filter(t=>{var i,u;const o=(i=t.folderName)==null?void 0:i.toLowerCase().includes(n.toLowerCase()),s=(u=t.folderDescription)==null?void 0:u.toLowerCase().includes(n.toLowerCase());return o||s});d(r)}else d(e)},resetTagFilter:()=>{T(!1),d(n?c.filter(e=>{var o,s;const r=(o=e.folderName)==null?void 0:o.toLowerCase().includes(n.toLowerCase()),t=(s=e.folderDescription)==null?void 0:s.toLowerCase().includes(n.toLowerCase());return r||t}):c)},handleDeleteClick:async(e,r)=>{var t,o,s;try{console.log("Deleting album with id:",e);const i=await M();if(!i){console.error("Authentication failed");return}const I=await(await fetch(D,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({query:`
        mutation DeleteFolderPosition($deletedFolderPositionIds: [ID!]) {
          changeFiles(deletedFolderPositionIds: $deletedFolderPositionIds) {
            items {
              ... on IdObject {
                id
              }
            }
          }
        }
      `,variables:{deletedFolderPositionIds:[e]}})})).json();if((o=(t=I==null?void 0:I.data)==null?void 0:t.changeFiles)!=null&&o.items)h(`✅ Successfully deleted folder position ${e}`),g(m=>m.filter(L=>L.folderPositionId!==e));else if(I.errors){const m=((s=I.errors[0])==null?void 0:s.message)||"Unknown GraphQL error";throw h(`❌ Failed to delete folder: ${m}`),new Error(m)}}catch(i){h(`❌ Failed to delete folder: ${String(i)}`),console.error("Failed to delete folder:",i),alert(r("Failed to delete album. Please try again."))}},setFolders:g,subscriptionInfo:G,calculatedBytesUsed:K}};export{ne as u};
