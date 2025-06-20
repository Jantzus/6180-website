import{a as f,L as ee,h as M,f as A}from"./utils-kEhIe06W.js";import{F as te}from"./types-Cxncrjqw.js";const se=p=>p.reduce((d,b)=>{const F=b.files.reduce((u,w)=>u+(w.dataInBytes||0),0);return d+F},0),ie=p=>{const[d,b]=f.useState([]),[F,u]=f.useState([]),[w,U]=f.useState(null),[B,Q]=f.useState(null),[i,v]=f.useState(""),[g,T]=f.useState(!1),[S,C]=f.useState(!1),[G,K]=f.useState(null),[j,k]=f.useState(0);f.useEffect(()=>{const t=se(d);k(t)},[d]),f.useEffect(()=>{U(localStorage.getItem(ee.PUBLIC_USERNAME)||null),(async()=>{const o=await M();if(o){try{const r=JSON.parse(atob(o.split(".")[1]))["cognito:username"];Q(r)}catch(e){console.error("Failed to decode token",e)}await z(o)}})()},[]),f.useEffect(()=>{!g&&!S&&u(d)},[d,g,S]),f.useEffect(()=>{if(i===""){!g&&!S&&u(d);return}const o=(g||S?F:d).filter(e=>{var n,l;const r=(n=e.folderName)==null?void 0:n.toLowerCase().includes(i.toLowerCase()),s=(l=e.folderDescription)==null?void 0:l.toLowerCase().includes(i.toLowerCase());return r||s});u(o)},[i,d,g,S]);const x=t=>{T(!0),C(!1),u(t),i&&u(o=>o.filter(e=>{var n,l;const r=(n=e.folderName)==null?void 0:n.toLowerCase().includes(i.toLowerCase()),s=(l=e.folderDescription)==null?void 0:l.toLowerCase().includes(i.toLowerCase());return r||s}))},W=()=>{T(!1),u(i?d.filter(t=>{var r,s;const o=(r=t.folderName)==null?void 0:r.toLowerCase().includes(i.toLowerCase()),e=(s=t.folderDescription)==null?void 0:s.toLowerCase().includes(i.toLowerCase());return o||e}):d)},J=t=>{C(!0),T(!1),u(t),i&&u(o=>o.filter(e=>{var n,l;const r=(n=e.folderName)==null?void 0:n.toLowerCase().includes(i.toLowerCase()),s=(l=e.folderDescription)==null?void 0:l.toLowerCase().includes(i.toLowerCase());return r||s}))},q=()=>{C(!1),u(i?d.filter(t=>{var r,s;const o=(r=t.folderName)==null?void 0:r.toLowerCase().includes(i.toLowerCase()),e=(s=t.folderDescription)==null?void 0:s.toLowerCase().includes(i.toLowerCase());return o||e}):d)},z=async t=>{var o,e;try{const r=`
        mutation FetchRelations($fetchRelationsInput: FetchRelationsInput!) {
          fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
            items {
              ... on FolderPosition {
                ${te}
              }
            }
          }
        }
      `,s={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}},l=await(await fetch(A,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({query:r,variables:s})})).json();if(l.errors){console.error("Folders GraphQL errors:",l.errors),p(`❌ Failed to fetch folders: ${JSON.stringify(l.errors)}`);return}const m=(((e=(o=l==null?void 0:l.data)==null?void 0:o.fetchRelations)==null?void 0:e.items)||[]).filter(h=>h&&h.id&&h.folder&&h.folder.id).map(h=>{var D,O,$;const a=h.folder,X=(((D=a==null?void 0:a.fileReferencesPage)==null?void 0:D.items)||[]).filter(c=>c&&c.file&&c.file.dataKey).map(c=>{var _;const y=c.file,Z=((_=c.selectedTags)==null?void 0:_.map(N=>{var E;return{TagType:N.TagType,tagTitle:N.tagTitle,subtags:((E=N.subtags)==null?void 0:E.map(R=>({TagType:R.TagType,tagTitle:R.tagTitle,subtagTitle:R.subtagTitle})))||[]}}))||[];return{dataKey:y.dataKey,thumbnailDataKey:y.thumbnailDataKey||null,durationInSeconds:y.durationInSeconds||null,dataInBytes:y.dataInBytes||0,selectedTags:Z}}),P={};return(O=a==null?void 0:a.contactsUsingInvite)!=null&&O.items&&a.contactsUsingInvite.items.forEach(c=>{var y;c!=null&&c.id&&((y=c==null?void 0:c.item)!=null&&y.publicDisplayName)&&(P[c.id]=c.item.publicDisplayName)}),{folderPositionId:h.id,folderId:a.id,albumNanoId:a.albumNanoId,folderName:a.folderName,folderDescription:a.folderDescription,folderPassword:a.folderPassword,creatorId:a.creatorId,createdAt:a.createdAt,updatedAt:a.updatedAt,files:X,profileIds:h.profileIds||[],contacts:P,usingFolderInviteGrantsRightToAddItems:(($=a==null?void 0:a.folderInviteParameters)==null?void 0:$.usingFolderInviteGrantsRightToAddItems)||!1}});b(m);const L=m.length,Y=m.filter(h=>h.files.some(a=>a.selectedTags&&a.selectedTags.length>0)).length;p(`✅ Successfully fetched ${L} folders, ${Y} have tags`),await H(t)}catch(r){console.error("Failed to load folders:",r),p(`❌ Failed to fetch folders: ${String(r)}`)}},H=async t=>{var o;try{const s=await(await fetch(A,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({query:`
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
      `})})).json();if(s.errors){console.error("Subscription GraphQL errors:",s.errors),p(`⚠️ Warning: Failed to fetch subscription info: ${JSON.stringify(s.errors)}`);return}const n=(o=s==null?void 0:s.data)==null?void 0:o.changeMySubscription;n&&(K({intNumberOfSubscriptions:n.intNumberOfSubscriptions||0,bytesOfDataUsed:0,SubscriptionStatus:n.SubscriptionStatus}),p("✅ Successfully fetched subscription info"))}catch(e){console.error("Failed to load subscription info:",e),p(`⚠️ Warning: Failed to fetch subscription info: ${String(e)}`)}};return{folders:d,filteredFolders:F,publicUsername:w,cognitoUsername:B,searchQuery:i,setSearchQuery:v,handleContactFilterChange:x,resetContactFilter:W,handleTagFilterChange:J,resetTagFilter:q,handleDeleteClick:async(t,o)=>{var e,r,s;try{console.log("Deleting album with id:",t);const n=await M();if(!n){console.error("Authentication failed");return}const I=await(await fetch(A,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({query:`
        mutation DeleteFolderPosition($deletedFolderPositionIds: [ID!]) {
          changeFiles(deletedFolderPositionIds: $deletedFolderPositionIds) {
            items {
              ... on IdObject {
                id
              }
            }
          }
        }
      `,variables:{deletedFolderPositionIds:[t]}})})).json();if((r=(e=I==null?void 0:I.data)==null?void 0:e.changeFiles)!=null&&r.items)p(`✅ Successfully deleted folder position ${t}`),b(m=>m.filter(L=>L.folderPositionId!==t));else if(I.errors){const m=((s=I.errors[0])==null?void 0:s.message)||"Unknown GraphQL error";throw p(`❌ Failed to delete folder: ${m}`),new Error(m)}}catch(n){p(`❌ Failed to delete folder: ${String(n)}`),console.error("Failed to delete folder:",n),alert(o("Failed to delete album. Please try again."))}},setFolders:b,subscriptionInfo:G,calculatedBytesUsed:j}};export{ie as u};
