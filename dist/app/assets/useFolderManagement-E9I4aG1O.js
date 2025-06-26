import{r as f,L as ee,h as M,f as D}from"./utils-2qV3otm0.js";import{F as te}from"./types-CyPfckSQ.js";const se=p=>p.reduce((d,b)=>{const F=b.files.reduce((u,w)=>u+(w.dataInBytes||0),0);return d+F},0),ne=p=>{const[d,b]=f.useState([]),[F,u]=f.useState([]),[w,U]=f.useState(null),[v,B]=f.useState(null),[n,Q]=f.useState(""),[g,T]=f.useState(!1),[S,C]=f.useState(!1),[G,K]=f.useState(null),[j,k]=f.useState(0);f.useEffect(()=>{const t=se(d);k(t)},[d]),f.useEffect(()=>{U(localStorage.getItem(ee.PUBLIC_USERNAME)||null),(async()=>{const r=await M();if(r){try{const o=JSON.parse(atob(r.split(".")[1]))["cognito:username"];B(o)}catch(e){console.error("Failed to decode token",e)}await z(r)}})()},[]),f.useEffect(()=>{!g&&!S&&u(d)},[d,g,S]),f.useEffect(()=>{if(n===""){!g&&!S&&u(d);return}const r=(g||S?F:d).filter(e=>{var i,l;const o=(i=e.folderName)==null?void 0:i.toLowerCase().includes(n.toLowerCase()),s=(l=e.folderDescription)==null?void 0:l.toLowerCase().includes(n.toLowerCase());return o||s});u(r)},[n,d,g,S]);const x=t=>{T(!0),C(!1),u(t),n&&u(r=>r.filter(e=>{var i,l;const o=(i=e.folderName)==null?void 0:i.toLowerCase().includes(n.toLowerCase()),s=(l=e.folderDescription)==null?void 0:l.toLowerCase().includes(n.toLowerCase());return o||s}))},W=()=>{T(!1),u(n?d.filter(t=>{var o,s;const r=(o=t.folderName)==null?void 0:o.toLowerCase().includes(n.toLowerCase()),e=(s=t.folderDescription)==null?void 0:s.toLowerCase().includes(n.toLowerCase());return r||e}):d)},J=t=>{C(!0),T(!1),u(t),n&&u(r=>r.filter(e=>{var i,l;const o=(i=e.folderName)==null?void 0:i.toLowerCase().includes(n.toLowerCase()),s=(l=e.folderDescription)==null?void 0:l.toLowerCase().includes(n.toLowerCase());return o||s}))},q=()=>{C(!1),u(n?d.filter(t=>{var o,s;const r=(o=t.folderName)==null?void 0:o.toLowerCase().includes(n.toLowerCase()),e=(s=t.folderDescription)==null?void 0:s.toLowerCase().includes(n.toLowerCase());return r||e}):d)},z=async t=>{var r,e;try{const o=`
        mutation FetchRelations($fetchRelationsInput: FetchRelationsInput!) {
          fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
            items {
              ... on FolderPosition {
                ${te}
              }
            }
          }
        }
      `,s={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}},l=await(await fetch(D,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({query:o,variables:s})})).json();if(l.errors){console.error("Folders GraphQL errors:",l.errors),p(`❌ Failed to fetch folders: ${JSON.stringify(l.errors)}`);return}const m=(((e=(r=l==null?void 0:l.data)==null?void 0:r.fetchRelations)==null?void 0:e.items)||[]).filter(h=>h&&h.id&&h.folder&&h.folder.id).map(h=>{var P,O,$;const a=h.folder,X=(((P=a==null?void 0:a.fileReferencesPage)==null?void 0:P.items)||[]).filter(c=>c&&c.file&&c.file.dataKey).map(c=>{var _;const y=c.file,Z=((_=c.selectedTags)==null?void 0:_.map(N=>{var E;return{TagType:N.TagType,tagTitle:N.tagTitle,subtags:((E=N.subtags)==null?void 0:E.map(R=>({TagType:R.TagType,tagTitle:R.tagTitle,subtagTitle:R.subtagTitle})))||[]}}))||[];return{dataKey:y.dataKey,thumbnailDataKey:y.thumbnailDataKey||void 0,durationInSeconds:y.durationInSeconds||void 0,dataInBytes:y.dataInBytes||0,selectedTags:Z,fileDisplayName:c.fileDisplayName||void 0}}),A={};return(O=a==null?void 0:a.contactsUsingInvite)!=null&&O.items&&a.contactsUsingInvite.items.forEach(c=>{var y;c!=null&&c.id&&((y=c==null?void 0:c.item)!=null&&y.publicDisplayName)&&(A[c.id]=c.item.publicDisplayName)}),{folderPositionId:h.id,folderId:a.id,albumNanoId:a.albumNanoId,folderName:a.folderName,folderDescription:a.folderDescription,folderPassword:a.folderPassword,creatorId:a.creatorId,createdAt:a.createdAt,updatedAt:a.updatedAt,files:X,profileIds:h.profileIds||[],contacts:A,usingFolderInviteGrantsRightToAddItems:(($=a==null?void 0:a.folderInviteParameters)==null?void 0:$.usingFolderInviteGrantsRightToAddItems)||!1}});b(m);const L=m.length,Y=m.filter(h=>h.files.some(a=>a.selectedTags&&a.selectedTags.length>0)).length;p(`✅ Successfully fetched ${L} folders, ${Y} have tags`),await H(t)}catch(o){console.error("Failed to load folders:",o),p(`❌ Failed to fetch folders: ${String(o)}`)}},H=async t=>{var r;try{const s=await(await fetch(D,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({query:`
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
      `})})).json();if(s.errors){console.error("Subscription GraphQL errors:",s.errors),p(`⚠️ Warning: Failed to fetch subscription info: ${JSON.stringify(s.errors)}`);return}const i=(r=s==null?void 0:s.data)==null?void 0:r.changeMySubscription;i&&(K({intNumberOfSubscriptions:i.intNumberOfSubscriptions||0,bytesOfDataUsed:0,SubscriptionStatus:i.SubscriptionStatus}),p("✅ Successfully fetched subscription info"))}catch(e){console.error("Failed to load subscription info:",e),p(`⚠️ Warning: Failed to fetch subscription info: ${String(e)}`)}};return{folders:d,filteredFolders:F,publicUsername:w,cognitoUsername:v,searchQuery:n,setSearchQuery:Q,handleContactFilterChange:x,resetContactFilter:W,handleTagFilterChange:J,resetTagFilter:q,handleDeleteClick:async(t,r)=>{var e,o,s;try{console.log("Deleting album with id:",t);const i=await M();if(!i){console.error("Authentication failed");return}const I=await(await fetch(D,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({query:`
        mutation DeleteFolderPosition($deletedFolderPositionIds: [ID!]) {
          changeFiles(deletedFolderPositionIds: $deletedFolderPositionIds) {
            items {
              ... on IdObject {
                id
              }
            }
          }
        }
      `,variables:{deletedFolderPositionIds:[t]}})})).json();if((o=(e=I==null?void 0:I.data)==null?void 0:e.changeFiles)!=null&&o.items)p(`✅ Successfully deleted folder position ${t}`),b(m=>m.filter(L=>L.folderPositionId!==t));else if(I.errors){const m=((s=I.errors[0])==null?void 0:s.message)||"Unknown GraphQL error";throw p(`❌ Failed to delete folder: ${m}`),new Error(m)}}catch(i){p(`❌ Failed to delete folder: ${String(i)}`),console.error("Failed to delete folder:",i),alert(r("Failed to delete album. Please try again."))}},setFolders:b,subscriptionInfo:G,calculatedBytesUsed:j}};export{ne as u};
