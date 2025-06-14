import{a as l,L as x,h as O,f as w}from"./utils-CuQXS0Z6.js";import{F as J}from"./types-B1wTo9j4.js";const W=u=>u.reduce((d,I)=>{const b=I.files.reduce((h,F)=>h+(F.dataInBytes||0),0);return d+b},0),Y=u=>{const[d,I]=l.useState([]),[b,h]=l.useState([]),[F,D]=l.useState(null),[_,$]=l.useState(null),[f,E]=l.useState(""),[S,g]=l.useState(!1),[U,T]=l.useState(null),[B,M]=l.useState(0);l.useEffect(()=>{const t=W(d);M(t)},[d]),l.useEffect(()=>{D(localStorage.getItem(x.PUBLIC_USERNAME)||null),(async()=>{const n=await O();if(n){try{const i=JSON.parse(atob(n.split(".")[1]))["cognito:username"];$(i)}catch(e){console.error("Failed to decode token",e)}await G(n)}})()},[]),l.useEffect(()=>{S||h(d)},[d,S]),l.useEffect(()=>{if(f===""){S||h(d);return}const n=(S?b:d).filter(e=>{var a,c;const i=(a=e.folderName)==null?void 0:a.toLowerCase().includes(f.toLowerCase()),s=(c=e.folderDescription)==null?void 0:c.toLowerCase().includes(f.toLowerCase());return i||s});h(n)},[f,d,S]);const Q=t=>{g(!0),h(t),f&&h(n=>n.filter(e=>{var a,c;const i=(a=e.folderName)==null?void 0:a.toLowerCase().includes(f.toLowerCase()),s=(c=e.folderDescription)==null?void 0:c.toLowerCase().includes(f.toLowerCase());return i||s}))},v=()=>{g(!1),h(f?d.filter(t=>{var i,s;const n=(i=t.folderName)==null?void 0:i.toLowerCase().includes(f.toLowerCase()),e=(s=t.folderDescription)==null?void 0:s.toLowerCase().includes(f.toLowerCase());return n||e}):d)},G=async t=>{var n,e;try{const i=`
        mutation FetchRelations($fetchRelationsInput: FetchRelationsInput!) {
          fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
            items {
              ... on FolderPosition {
                ${J}
              }
            }
          }
        }
      `,s={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}},c=await(await fetch(w,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({query:i,variables:s})})).json();if(c.errors){console.error("Folders GraphQL errors:",c.errors),u(`❌ Failed to fetch folders: ${JSON.stringify(c.errors)}`);return}const m=(((e=(n=c==null?void 0:c.data)==null?void 0:n.fetchRelations)==null?void 0:e.items)||[]).filter(p=>p&&p.id&&p.folder&&p.folder.id).map(p=>{var L,N,P,R;const r=p.folder,k=(((N=(L=r==null?void 0:r.fileReferencesPage)==null?void 0:L.items)==null?void 0:N.map(o=>o.file))||[]).filter(o=>o&&o.dataKey).map(o=>({dataKey:o.dataKey,thumbnailDataKey:o.thumbnailDataKey||null,durationInSeconds:o.durationInSeconds||null,dataInBytes:o.dataInBytes||0})),C={};return(P=r==null?void 0:r.contactsUsingInvite)!=null&&P.items&&r.contactsUsingInvite.items.forEach(o=>{var A;o!=null&&o.id&&((A=o==null?void 0:o.item)!=null&&A.publicDisplayName)&&(C[o.id]=o.item.publicDisplayName)}),{folderPositionId:p.id,folderId:r.id,albumNanoId:r.albumNanoId,folderName:r.folderName,folderDescription:r.folderDescription,folderPassword:r.folderPassword,creatorId:r.creatorId,createdAt:r.createdAt,updatedAt:r.updatedAt,files:k,profileIds:p.profileIds||[],contacts:C,usingFolderInviteGrantsRightToAddItems:((R=r==null?void 0:r.folderInviteParameters)==null?void 0:R.usingFolderInviteGrantsRightToAddItems)||!1}});I(m),u(`✅ Successfully fetched ${m.length} folders`),await K(t)}catch(i){console.error("Failed to load folders:",i),u(`❌ Failed to fetch folders: ${String(i)}`)}},K=async t=>{var n;try{const s=await(await fetch(w,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({query:`
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
      `})})).json();if(s.errors){console.error("Subscription GraphQL errors:",s.errors),u(`⚠️ Warning: Failed to fetch subscription info: ${JSON.stringify(s.errors)}`);return}const a=(n=s==null?void 0:s.data)==null?void 0:n.changeMySubscription;a&&(T({intNumberOfSubscriptions:a.intNumberOfSubscriptions||0,bytesOfDataUsed:0,SubscriptionStatus:a.SubscriptionStatus}),u("✅ Successfully fetched subscription info"))}catch(e){console.error("Failed to load subscription info:",e),u(`⚠️ Warning: Failed to fetch subscription info: ${String(e)}`)}};return{folders:d,filteredFolders:b,publicUsername:F,cognitoUsername:_,searchQuery:f,setSearchQuery:E,handleContactFilterChange:Q,resetContactFilter:v,handleDeleteClick:async(t,n)=>{var e,i,s;try{console.log("Deleting album with id:",t);const a=await O();if(!a){console.error("Authentication failed");return}const y=await(await fetch(w,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({query:`
        mutation DeleteFolderPosition($deletedFolderPositionIds: [ID!]) {
          changeFiles(deletedFolderPositionIds: $deletedFolderPositionIds) {
            items {
              ... on IdObject {
                id
              }
            }
          }
        }
      `,variables:{deletedFolderPositionIds:[t]}})})).json();if((i=(e=y==null?void 0:y.data)==null?void 0:e.changeFiles)!=null&&i.items)u(`✅ Successfully deleted folder position ${t}`),I(m=>m.filter(p=>p.folderPositionId!==t));else if(y.errors){const m=((s=y.errors[0])==null?void 0:s.message)||"Unknown GraphQL error";throw u(`❌ Failed to delete folder: ${m}`),new Error(m)}}catch(a){u(`❌ Failed to delete folder: ${String(a)}`),console.error("Failed to delete folder:",a),alert(n("Failed to delete album. Please try again."))}},setFolders:I,subscriptionInfo:U,calculatedBytesUsed:B}};export{Y as u};
