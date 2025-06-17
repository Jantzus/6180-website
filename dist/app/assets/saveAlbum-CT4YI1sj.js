import{d as B,u as Ke,a as x,j as t,g as je,h as ge,L as fe,i as Ne,s as Ct,m as kt,f as we,k as Dt,l as Ft,n as Et,r as _t,R as Nt,I as Rt,p as zt}from"./utils-DWLWZiq9.js";import{C as Ce,F as Re,e as ze,f as Ot,g as Mt,P as Bt,h as Ut,i as Ge,j as qe,k as Wt,l as Kt,S as Gt,m as qt,V as Ht,n as Jt,o as Qt,M as Vt,G as Yt,p as Xt,q as Zt,r as Lt,D as es,s as $e,B as Oe,t as ts,u as ss}from"./styled-components-AIkn2xQW.js";import{u as rs,U as os}from"./useUsernameManagement-COYBkc8_.js";import{u as is,U as as}from"./useFileUploadProcessor-mRvvJjs-.js";import{F as ns}from"./types-B2_92tNb.js";import{L as ls}from"./LazyImage-DKl7VXhz.js";const l={colors:{primary:"#007bff",primaryDark:"#0056b3",secondary:"#6c757d",success:"#4caf50",danger:"#e53935",warning:"#ff9800",white:"#fff",text:{primary:"#333",secondary:"#666",light:"#777"},background:{primary:"#f9fafb",highlight:"#f0f7ff"},border:"#ddd"},spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px"},borderRadius:{small:"4px",medium:"8px"},boxShadow:{lg:"0 4px 10px rgba(0,0,0,0.08)"}},ds=B.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10000;
`,cs=B.div`
  background-color: ${l.colors.white};
  border-radius: ${l.borderRadius.medium};
  box-shadow: ${l.boxShadow.lg};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10001;
  width: min(500px, calc(100vw - 64px));
  max-height: calc(100vh - 64px);
  overflow-y: auto;
  overflow-x: hidden;
  
  /* Ensure smooth scrolling */
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: ${l.colors.border} transparent;
  
  /* Custom scrollbar for webkit browsers */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${l.colors.border};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${l.colors.secondary};
  }
  
  @media (max-width: 480px) {
    width: calc(100vw - 20px);
    /* Account for mobile browser UI - more conservative approach */
    max-height: calc(100vh - 160px);
    /* Support for newer browsers with dynamic viewport */
    max-height: calc(100dvh - 60px);
    top: 10px;
    left: 10px;
    transform: none;
    border-radius: ${l.borderRadius.small};
  }
  
  @media (max-height: 700px) {
    max-height: calc(100vh - 80px);
    max-height: calc(100dvh - 40px);
    top: 20px;
    transform: translateX(-50%);
    
    @media (max-width: 480px) {
      top: 10px;
      left: 10px;
      transform: none;
      max-height: calc(100vh - 160px);
      max-height: calc(100dvh - 60px);
    }
  }
  
  @media (max-height: 600px) {
    max-height: calc(100vh - 100px);
    max-height: calc(100dvh - 40px);
    top: 10px;
    transform: translateX(-50%);
    
    @media (max-width: 480px) {
      top: 10px;
      left: 10px;
      transform: none;
      max-height: calc(100vh - 160px);
      max-height: calc(100dvh - 60px);
    }
  }
  
  /* For very small screens - prioritize fitting content */
  @media (max-height: 500px) {
    max-height: calc(100vh - 60px);
    max-height: calc(100dvh - 20px);
    top: 5px;
    transform: translateX(-50%);
    
    @media (max-width: 480px) {
      top: 5px;
      left: 10px;
      transform: none;
      max-height: calc(100vh - 140px);
      max-height: calc(100dvh - 40px);
    }
  }
`,us=B.div`
  padding: 40px;
  
  @media (max-width: 768px) {
    padding: 30px;
  }
  
  @media (max-width: 480px) {
    padding: 20px;
  }
  
  @media (max-height: 700px) {
    padding: 24px;
  }
  
  @media (max-height: 600px) {
    padding: 20px;
  }
`,ps=B.div`
  direction: ${e=>e.$isRTL?"rtl":"ltr"};
`,fs=B.h3`
  font-size: 24px;
  font-weight: 600;
  color: ${l.colors.text.primary};
  margin: 0 0 ${l.spacing.lg} 0;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 22px;
    margin: 0 0 ${l.spacing.md} 0;
  }
  
  @media (max-height: 700px) {
    font-size: 20px;
    margin: 0 0 ${l.spacing.md} 0;
  }
  
  @media (max-width: 480px) {
    font-size: 18px;
  }
`,gs=B.p`
  margin-bottom: ${l.spacing.lg};
  font-size: 16px;
  color: ${l.colors.text.secondary};
  line-height: 1.5;
  
  @media (max-width: 768px) {
    margin-bottom: ${l.spacing.md};
    font-size: 15px;
  }
  
  @media (max-height: 700px) {
    margin-bottom: ${l.spacing.sm};
    font-size: 14px;
  }
`,Me=B.div`
  margin-bottom: ${l.spacing.lg};
`,Be=B.label`
  display: block;
  margin-bottom: ${l.spacing.sm};
  font-size: 14px;
  font-weight: 500;
  color: ${l.colors.text.primary};
`,ms=B.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${l.colors.border};
  border-radius: ${l.borderRadius.small};
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${l.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  &::placeholder {
    color: ${l.colors.text.light};
  }
`,xs=B.div`
  display: flex;
  flex-direction: column;
  gap: ${l.spacing.md};
  margin-bottom: ${l.spacing.xl};
`,hs=B.div`
  border: 2px solid ${e=>e.$isSelected?l.colors.primary:l.colors.border};
  border-radius: ${l.borderRadius.medium};
  padding: ${l.spacing.lg};
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${e=>e.$isSelected?l.colors.background.highlight:l.colors.white};
  display: flex;
  align-items: center;
  gap: ${l.spacing.lg};
  
  @media (max-width: 768px) {
    padding: ${l.spacing.md};
    gap: ${l.spacing.md};
  }
  
  @media (max-width: 480px) {
    padding: ${l.spacing.sm};
    gap: ${l.spacing.sm};
  }
  
  @media (max-height: 700px) {
    padding: ${l.spacing.sm};
    gap: ${l.spacing.sm};
  }
`,bs=B.div`
  flex: 1;
`,ys=B.div`
  margin-bottom: ${l.spacing.xs};
`,ws=B.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${l.colors.primary};
  flex-shrink: 0;
`,Ss=B.label`
  font-size: 16px;
  font-weight: 500;
  color: ${l.colors.text.primary};
  cursor: pointer;
  display: block;
`,Ts=B.div`
  font-size: 14px;
  color: ${l.colors.text.secondary};
  margin-top: ${l.spacing.xs};
`,$s=B.div`
  color: ${l.colors.warning};
  font-size: 12px;
  font-style: italic;
  margin-top: ${l.spacing.xs};
  font-weight: 500;
`,vs=B.div`
  display: flex;
  gap: ${l.spacing.sm};
  justify-content: center;
  margin-top: ${l.spacing.xl};
`,Ue=B.button`
  background-color: ${e=>e.$variant==="danger"?l.colors.danger:e.$variant==="secondary"?"transparent":e.$variant==="success"?l.colors.success:l.colors.primary};
  color: ${e=>e.$variant==="secondary"?l.colors.primary:l.colors.white};
  border: ${e=>e.$variant==="secondary"?`1px solid ${l.colors.primary}`:"none"};
  padding: ${e=>e.$size==="small"?"8px 16px":e.$size==="large"?"16px 32px":"12px 24px"};
  border-radius: ${l.borderRadius.medium};
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  font-size: ${e=>e.$size==="small"?"14px":e.$size==="large"?"18px":"16px"};
  font-weight: 500;
  transition: all 0.2s ease;
  opacity: ${e=>e.disabled?.6:1};
  min-width: 100px;

  &:hover:not(:disabled) {
    background-color: ${e=>e.$variant==="danger"?"#c62828":e.$variant==="secondary"?l.colors.background.highlight:e.$variant==="success"?"#388e3c":l.colors.primaryDark};
  }
`,Is=B.div`
  background-color: ${l.colors.background.primary};
  border-radius: ${l.borderRadius.medium};
  padding: ${l.spacing.md};
  margin: ${l.spacing.md} 0;
  border-left: 4px solid ${l.colors.primary};
  font-size: 14px;
  color: ${l.colors.text.secondary};
  line-height: 1.4;
  
  @media (max-width: 768px) {
    padding: ${l.spacing.sm};
    margin: ${l.spacing.sm} 0;
    font-size: 13px;
  }
  
  @media (max-height: 700px) {
    padding: ${l.spacing.xs};
    font-size: 12px;
  }
`,Ps=[{value:"NotVisible",titleKey:"Password Required To See Or Save",descriptionKey:"Album will be completely hidden until correct password is entered"},{value:"Watermark",titleKey:"Watermarked And No Saving Without Password",descriptionKey:"Photos will be visible with watermarks, password required to save"},{value:"CannotBeSaved",titleKey:"Password Required To Save",descriptionKey:"Photos are visible but password required to download or save"},{value:"NoPassword",titleKey:"No Password",descriptionKey:"Album is fully public with no restrictions"}],As=({isOpen:e,onClose:n,initialOption:i="NoPassword",initialPassword:$=""})=>{const{t:d,language:k}=Ke(),S=je(k)==="rtl",[u,c]=x.useState(i),[A,N]=x.useState($);if(x.useEffect(()=>{e&&(c(i),N($))},[e,i,$]),!e)return null;const I=A.trim()==="",M=R=>{c(R)},a=R=>{R.target===R.currentTarget&&n()},q=R=>R!=="NoPassword";return t.jsxs(t.Fragment,{children:[t.jsx(ds,{onClick:a}),t.jsx(cs,{children:t.jsx(us,{children:t.jsxs(ps,{$isRTL:S,children:[t.jsx(fs,{children:d("Album Password Policy")}),t.jsx(gs,{children:d("Configure password protection for your album. Choose how you want to restrict access to your photos.")}),t.jsxs(Me,{children:[t.jsx(Be,{children:d("Enter Password")}),t.jsx(ms,{type:"text",placeholder:d("Enter password (optional)"),value:A,onChange:R=>N(R.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"})]}),t.jsxs(Me,{children:[t.jsx(Be,{children:d("Select Protection Level")}),t.jsx(xs,{children:Ps.map(R=>t.jsxs(hs,{$isSelected:u===R.value,onClick:()=>M(R.value),children:[t.jsx(ws,{type:"radio",name:"protection",checked:u===R.value,onChange:()=>M(R.value)}),t.jsxs(bs,{children:[t.jsx(ys,{children:t.jsx(Ss,{children:d(R.titleKey)})}),t.jsx(Ts,{children:d(R.descriptionKey)}),I&&q(R.value)&&u===R.value&&t.jsx($s,{children:d('⚠️ Will use "password" as default if left empty')})]})]},R.value))})]}),q(u)&&t.jsxs(Is,{children:[t.jsx("strong",{children:d("💡 Password Protection Info:")}),t.jsx("br",{}),d('If you leave the password field empty, "password" will be used as the default password. You can change this anytime in album settings.')]}),t.jsxs(vs,{children:[t.jsx(Ue,{$variant:"secondary",onClick:()=>n(),children:d("Cancel")}),t.jsx(Ue,{$variant:"primary",onClick:()=>{const R=I&&q(u)?"password":A;console.log(`Saving with option: ${u}, password: ${R.length>0?"********":"none"}`),n(u,R)},children:d("Save")})]})]})})})]})},js=({debugMessages:e,t:n,isRTL:i,textDirection:$})=>e.length===0?null:t.jsxs("div",{style:{marginTop:"40px",background:"#fff3cd",padding:"16px",borderRadius:"8px",border:"1px solid #ffeeba",maxWidth:900,margin:"0 auto",direction:$},children:[t.jsx("h3",{style:{marginTop:0,fontSize:"18px",color:"#856404",textAlign:i?"right":"left"},children:n("Debug Log")}),t.jsx("pre",{style:{fontSize:"14px",color:"#856404",whiteSpace:"pre-wrap",maxHeight:"400px",overflow:"auto",textAlign:i?"right":"left"},children:e.map((d,k)=>t.jsx("div",{style:{marginBottom:"8px"},children:d},k))})]}),Cs=`
  query FetchFolders($folderIds: [String!]!, $fetchRelationsInput: FetchRelationsInput!) {
    fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
      items {
        ... on Tag {
          id
          createdAt
          updatedAt
          TagType
          tagTitle
          points
          subtags {
            items {
              id
              createdAt
              updatedAt
              TagType
              tagTitle
              subtagTitle
              points
            }
            nextToken
          }
        }
      }
      nextToken
    }
    fetchFolders(folderIds: $folderIds) {
      items {
        creatorId      
        folderName
        folderDescription
        folderPassword {
          password
          policy
        }
        fileReferencesPage {
          items {
            file {
              ownerContactId
              dataKey
              thumbnailDataKey
              durationInSeconds
            }
          }
        }
        contactsUsingInvite {
          items {
            id
            item {
              ... on Persona {
                publicDisplayName
              }
            }
          }
        }
        folderInviteParameters {
          usingFolderInviteGrantsRightToAddItems
          usingFolderInviteGrantsRightToRemoveItems
        }
        folderPosition {
          id
          profileIds
        }          
      }
    }
  }
`,ks=(e,n,i,$,d,k,S,u,c,A,N,I,M,a)=>{const[q,R]=x.useState(null),[H,s]=x.useState(null),ee=async g=>{a(`Initializing folder ID with username: ${g}`);try{const p=new URLSearchParams(window.location.search).get("folderId");if(a(`Folder ID from URL: ${p||"null"}`),p){e(p),a(`Using existing folder ID: ${p}`);try{a(`Fetching details for folder: ${p}`);const f=await L(p,a);if(a("Folder details retrieved:",f),f){const W=`${g}_____${g}____Account`,J=f.creatorId===W;if(a(`User is creator of folder: ${J}, accountId: ${W}, creator: ${f.creatorId}`),i(J),J){a("User is creator, showing folder details"),$(!0),d(f.folderName),k(f.folderDescription),S(f.isOnPublicProfile),a(`Setting isOnPublicProfile: ${f.isOnPublicProfile}`),f.participantsCanAddItems!==void 0&&(u(f.participantsCanAddItems),a(`Setting participantsCanAddItems: ${f.participantsCanAddItems}`)),f.participantsCanDeleteItems!==void 0&&(M(f.participantsCanDeleteItems),a(`Setting participantsCanDeleteItems: ${f.participantsCanDeleteItems}`));const K=f.passwordPolicy;a(`Password policy from folder details: ${K}`),c(K),K!=="NoPassword"&&f.password&&A(f.password),a(`Set password protection option to: ${K}`)}else a("User is NOT the creator, hiding editable fields"),$(!1)}else a("No folder details retrieved, setting isCreator to true"),i(!0),$(!0)}catch(f){console.error("Error fetching folder details:",f),a(`Error fetching folder details: ${f}`),i(!1)}}else{const f=`${g}_____${Ne()}____Folder`;a(`Creating new folder ID: ${f}`),e(f),a("Setting isCreator to true for new album"),i(!0),$(!0)}}catch(h){console.error("Folder ID initialization error:",h),a(`Folder ID initialization error: ${h}`),i(!1)}},L=async(g,h)=>{var p,f,W,J,K,te,xe,y,v;h(`Fetching details for folder ID: ${g}`);try{const D=await ge();if(!D)return h("No token available for fetching folder details"),null;h("Sending GraphQL query to fetch folder details");const j=await(await fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${D}`},body:JSON.stringify({query:Cs,variables:{folderIds:[g],fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(h("Folder details API response:",j),j.errors)return console.error("GraphQL errors:",j.errors),h(`GraphQL errors: ${JSON.stringify(j.errors)}`),null;const F=((f=(p=j==null?void 0:j.data)==null?void 0:p.fetchFolders)==null?void 0:f.items)||[];if(h(`Found ${F.length} folder items`),F.length===0)return h("No folder items found"),null;const T=F[0];h("Retrieved folder data:",T);const z=((J=(W=T.folderPosition)==null?void 0:W.profileIds)==null?void 0:J.some(ue=>ue.includes("Public____Profile")))||!1;h(`Folder is on public profile: ${z}`),h("Profile IDs:",(K=T.folderPosition)==null?void 0:K.profileIds);const O=(te=T.folderInviteParameters)==null?void 0:te.usingFolderInviteGrantsRightToAddItems;h(`Participants can add items: ${O}`);const U=(xe=T.folderInviteParameters)==null?void 0:xe.usingFolderInviteGrantsRightToRemoveItems;return h(`Participants can delete items: ${U}`),{creatorId:T.creatorId||"",folderName:T.folderName||"",folderDescription:T.folderDescription||"",passwordPolicy:((y=T.folderPassword)==null?void 0:y.policy)||"NoPassword",password:((v=T.folderPassword)==null?void 0:v.password)||"",isOnPublicProfile:z,participantsCanAddItems:O!==void 0?O:!0,participantsCanDeleteItems:U!==void 0?U:!1}}catch(D){return console.error("Error in fetchFolderDetails:",D),h(`Error in fetchFolderDetails: ${D}`),null}},Z=()=>{a("Attempting to restore photos from localStorage");try{const g=localStorage.getItem(fe.SELECTED_PHOTOS);if(a(`Found stored photos: ${g?"yes":"no"}`),g)try{const h=JSON.parse(g);a(`Parsed ${h.length} photos from localStorage`),Array.isArray(h)&&h.length>0&&(n(h),a(`Restored ${h.length} photos to state`))}catch(h){console.error("Error parsing stored photos:",h),a(`Error parsing stored photos: ${h}`)}}catch(g){console.error("Error restoring photos from storage:",g),a(`Error restoring photos from storage: ${g}`)}},ce=()=>{a("Testing S3 connection");try{Ct?a("S3 client is available"):(console.error("S3 client not available"),a("S3 client not available"))}catch(g){console.error("S3 connection test error:",g),a(`S3 connection test error: ${g}`)}},le=async()=>{var g;a("Starting component initialization");try{a("Checking login with refresh");const h=await ge();if(!h){a("No token returned from login check, aborting initialization");return}try{const p=localStorage.getItem(fe.PUBLIC_USERNAME);a(`Retrieved public username from localStorage: ${p||"null"}`),s(p||null);const W=JSON.parse(atob(h.split(".")[1]))["cognito:username"];if(W){a(`Extracted Cognito username from token: ${W}`),R(W);const J=localStorage.getItem(fe.SUB_ALBUM_DATA);if(a(`Sub-album data from localStorage: ${J||"null"}`),J)try{const K=JSON.parse(J);if(a("Parsed sub-album data:",K),K.isSubAlbum&&((g=K.selectedFileIds)==null?void 0:g.length)>0){a(`Valid sub-album data found with ${K.selectedFileIds.length} files`),N(!0),I(K.selectedFileIds),K.selectedPhotos&&K.selectedPhotos.length>0&&(a(`Found ${K.selectedPhotos.length} selected photos in sub-album data`),n(K.selectedPhotos)),$(!0),i(!0);const te=`${W}_____${Ne()}____Folder`;a(`Generated new folder ID for sub-album: ${te}`),e(te)}else a("Invalid sub-album data, proceeding with normal initialization"),await ee(W)}catch(K){console.error("Error parsing sub-album data:",K),a(`Error parsing sub-album data: ${K}`),await ee(W)}else a("No sub-album data found, proceeding with normal folder initialization"),await ee(W)}else a("No Cognito username found in token")}catch(p){console.error("User data initialization error:",p),a(`User data initialization error: ${p}`)}Z(),ce(),a("Component initialization completed")}catch(h){console.error("Initialization error:",h),a(`Initialization error: ${h}`)}};return x.useEffect(()=>{le()},[]),{cognitoUsername:q,publicUsername:H,setPublicUsername:s}},Ds=(e,n,i,$,d,k,S,u,c,A,N,I,M,a,q,R,H,s)=>{const ee=y=>(s(`Converting ${y.length} tags to API format`),y.map(v=>({TagType:v.TagType,tagTitle:v.tagTitle,selectedSubtagInputs:v.subtags.map(D=>({TagType:v.TagType,tagTitle:D.tagTitle,subtagTitle:D.subtagTitle}))}))),L=y=>{s(`Save progress text: ${y}`);const v=document.getElementById("saveProgressText");v&&(v.innerText=y)},Z=y=>{const v=document.getElementById("saveProgress");v?(v.style.width=`${y}%`,s(`Updated save progress bar: ${y}%`)):s("Progress bar element not found"),q(y)},ce=(y,v)=>{s(`Splitting array of ${y.length} items into chunks of ${v}`);const D=[];for(let P=0;P<y.length;P+=v)D.push(y.slice(P,P+v));return s(`Created ${D.length} chunks`),D},le=y=>{const v=new Set;return y.filter(D=>v.has(D.fileId)?(s(`Skipping duplicate file reference with ID: ${D.fileId}`),!1):(v.add(D.fileId),!0))},g=(y,v,D)=>{s("Creating folder position input WITHOUT folder-level tags"),s(`Profile visibility: ${u?"Public":"Only Me"}`);const P=u?[`${n}_____Public____Profile`]:["Only Me_____Only Me____Profile"];s(`Profile IDs: ${JSON.stringify(P)}`);let j=[];$&&d.length>0&&(s(`Creating file reference IDs for ${d.length} sub-album files`),j=d.map(O=>{const U=O.split("_____");if(U.length>=2){const se=U[1].split("____")[0],re=`${D}_____${se}____FileReference`;return s(`Created file reference ID for sub-album: ${re}`),re}return s(`Using original fileId as fallback: ${O}`),O})),s(`Created ${j.length} acceptedFileReferenceIds`);const F=N!=="NoPassword"?I:null;if(s(`Password protection: ${N}`),s(`Album password: ${F?"******":"null"}`),s(`Participants can add items: ${c}`),s(`Participants can delete items: ${A}`),!e)throw s("Error: folderId is null or undefined"),new Error("folderId is required to create folder position input");const T=Dt(e),z=Ft(T);return{currentTime:y,folderId:e,profileIds:P,folderPositionPoints:1,acceptedFileReferenceIds:j,folderInput:{folderAboutContactIds:[v],albumNanoId:z,folderName:k,folderDescription:S,folderPasswordInput:{password:F,policy:N},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:c,usingFolderInviteGrantsRightToRemoveItems:A,addedItemsNeedFolderCreatorApproval:!1}}}},h=(y,v,D)=>(s(`Creating file reference inputs with individual photo tags for ${y.length} photos`),y.map((P,j)=>{var U;const F=M.get(j)||[],T=ee(F);if(s(`Photo ${j} (${P.fileName}): ${F.length} tags applied`),P.fileId)return s(`Using existing fileId for photo: ${P.fileId}`),{fileReferencesHolderId:e,currentTime:v,points:1,hasBeenDeleted:!1,selectedTagInputs:T,fileId:P.fileId,fileInput:null};const z=P.type==="video"||(U=P.type)!=null&&U.startsWith("video")?`Input/Video/${P.fileName}`:`Input/Image/${P.fileName}`,O=`${n}_____${P.fileName}____File`;return s(`Created file reference for ${P.fileName}:`),s(`  - dataKey: ${z}`),s(`  - fileId: ${O}`),s(`  - thumbnailDataKey: ${P.thumbnailDataKey||"undefined"}`),s(`  - size: ${P.size}`),s(`  - thumbnailSize: ${P.thumbnailSize||0}`),s(`  - duration: ${P.duration||"undefined"}`),s(`  - tags: ${F.length} tags selected for this photo`),{fileReferencesHolderId:e,currentTime:v,points:1,hasBeenDeleted:!1,selectedTagInputs:T,fileId:O,fileInput:{fileId:O,ownerFileInput:{editorContactIds:[D],FileSharingOptionsEnum:"Anyone",dataKey:z,thumbnailDataKey:P.thumbnailDataKey,dataInBytes:P.size,thumbnailDataInBytes:P.thumbnailSize||0,s3UploadedAt:v,durationInSeconds:P.duration},editorFileInput:{aboutContactIds:[D],captionText:"",numericFilterInputs:[]}}}})),p=async y=>{var j,F;s("Sending folder-only mutation (no file references, no folder tags)");const v=await ge();if(!v)throw s("No token available for saving album, aborting"),new Error("Authentication token not available");const D=`
      mutation MyMutation($folderPositionInputs: [FolderPositionInput!]) {
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items {
            id
          }
        }
      }
    `,P={folderPositionInputs:[y]};s("GraphQL folder-only mutation variables:",P);try{s("Sending API request to save folder");const T=await fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${v}`},body:JSON.stringify({query:D,variables:P})});s(`API response status: ${T.status}`);const z=await T.text();s(`API response raw text: ${z}`);const O=JSON.parse(z);if(s("API response JSON:",O),O.errors)throw console.error("Folder save failed:",O.errors),s("Folder save failed with errors:",O.errors),new Error("Failed to save folder");return s("Folder saved successfully"),((F=(j=O.data)==null?void 0:j.changeFiles)==null?void 0:F.items)||[]}catch(T){throw console.error("Error in sendFolderOnlyMutation:",T),s(`Error in sendFolderOnlyMutation: ${T}`),T}},f=async y=>{var j,F,T,z,O;s(`Sending file references-only mutation with ${y.length} items (each with individual tags)`);const v=await ge();if(!v)throw s("No token available for saving file references, aborting"),new Error("Authentication token not available");const D=`
      mutation MyMutation($updatedFileReferenceInputs: [UpdatedFileReferenceInput!]) {
        changeFiles0(updatedFileReferenceInputs: $updatedFileReferenceInputs) {
          items {
            ... on FileReference {
              id
              createdAt
              updatedAt
              fileId
              file {
                dataKey
                thumbnailDataKey
              }
            }
          }
        }
      }
    `,P={updatedFileReferenceInputs:y};s("GraphQL file references-only mutation variables (first item):",y.length>0?y[0]:"No items");try{s("Sending API request to save file references with individual tags");const U=await fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${v}`},body:JSON.stringify({query:D,variables:P})});s(`API response status: ${U.status}`);const ue=await U.text();s(`API response raw text: ${ue.substring(0,500)}...`);const se=JSON.parse(ue);if(s("API response JSON items count:",((T=(F=(j=se.data)==null?void 0:j.changeFiles0)==null?void 0:F.items)==null?void 0:T.length)||0),se.errors)throw console.error("File references save failed:",se.errors),s("File references save failed with errors:",se.errors),new Error("Failed to save file references");return s("File references chunk saved successfully with individual photo tags"),((O=(z=se.data)==null?void 0:z.changeFiles0)==null?void 0:O.items)||[]}catch(U){throw console.error("Error in sendFileReferencesOnlyMutation:",U),s(`Error in sendFileReferencesOnlyMutation: ${U}`),U}},W=async(y,v)=>{var F,T,z,O,U,ue,se,re,he;s(`Sending final chunk with folder mutation (${y.length} file references, no folder tags)`);const D=await ge();if(!D)throw s("No token available for saving final chunk, aborting"),new Error("Authentication token not available");const P=`
      mutation MyMutation(
        $folderPositionInputs: [FolderPositionInput!],
        $updatedFileReferenceInputs: [UpdatedFileReferenceInput!]
      ) {
        changeFiles0(updatedFileReferenceInputs: $updatedFileReferenceInputs) {
          items {
            ... on FileReference { id createdAt updatedAt fileId file { dataKey thumbnailDataKey } }
          }
        }
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items { id }
        }
      }
    `,j={folderPositionInputs:[v],updatedFileReferenceInputs:y};s("GraphQL final mutation variables (folder + last chunk, no folder tags)");try{s("Sending API request for final save with folder (no folder tags)");const me=await fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${D}`},body:JSON.stringify({query:P,variables:j})});s(`API response status: ${me.status}`);const o=await me.text();s(`API response raw text: ${o.substring(0,500)}...`);const b=JSON.parse(o);if(s("API response JSON:",{fileReferencesCount:((z=(T=(F=b.data)==null?void 0:F.changeFiles0)==null?void 0:T.items)==null?void 0:z.length)||0,folderItems:((U=(O=b.data)==null?void 0:O.changeFiles)==null?void 0:U.items)||[]}),b.errors)throw console.error("Final save failed:",b.errors),s("Final save failed with errors:",b.errors),new Error("Failed to complete album save");return s("Final chunk and folder saved successfully (with individual photo tags)"),{fileReferences:((se=(ue=b.data)==null?void 0:ue.changeFiles0)==null?void 0:se.items)||[],folderPositions:((he=(re=b.data)==null?void 0:re.changeFiles)==null?void 0:he.items)||[]}}catch(me){throw console.error("Error in sendFinalChunkWithFolderMutation:",me),s(`Error in sendFinalChunkWithFolderMutation: ${me}`),me}},J=async()=>(s("Validating required data"),await ge()?n?e?(s("All required data validated successfully"),!0):(s("No folder ID, validation failed"),!1):(s("No Cognito username, validation failed"),!1):(s("No token available, validation failed"),!1)),K=()=>{s("Handling successful save"),Et(R,H,[fe.SELECTED_PHOTOS,fe.SUB_ALBUM_DATA],s),s("Album data cleared");const y=document.getElementById("saveProgressText");y&&(y.innerText="Album saved successfully!",s("Updated progress text to 'Album saved successfully!'")),sessionStorage.setItem("album_just_saved","true"),s("Set 'album_just_saved' flag in sessionStorage"),s("Setting timeout for redirect to my-albums.html"),setTimeout(()=>{s("Redirecting to my-albums.html"),_t("my-albums.html")},1e3)},te=async(y,v)=>{s("Starting chunked save process (individual photo tags, no folder tags)");try{L("Processing files in chunks...");const D=48;if(v.length===0)s("No file references to process, saving only folder position (no folder tags)"),await p(y);else{const P=le(v);s(`After removing duplicates, processing ${P.length} unique file references`);const j=ce(P,D);s(`Split file references into ${j.length} chunks of max size ${D}`);for(let F=0;F<j.length;F++){const T=j[F];s(`Processing chunk ${F+1} of ${j.length} with ${T.length} file references`);const z=F/j.length*80;q(10+z),Z(10+z),F<j.length-1?(L(`Saving files: chunk ${F+1} of ${j.length}...`),await f(T)):(L("Finalizing album..."),await W(T,y))}}q(100),Z(100),L("Album saved successfully!"),K()}catch(D){console.error("Error in chunked save process:",D),s(`Error in chunked save process: ${D}`),L(`Error: ${D}`),a(!1)}};return{saveAlbumDirectly:async()=>{s("Starting direct album save with individual photo tagging"),s(`Photo tags map: ${M.size} photos have tags applied`),a(!0),q(5);try{if(s("Validating required data for save"),!await J()){s("Required data validation failed, aborting save"),a(!1);return}const y=Math.floor(Date.now()/1e3),v=`${n}_____${n}____Account`,P=e.split("_____")[1].split("____")[0];s(`Save timestamp: ${y}`),s(`Account ID: ${v}`),s(`Folder ID: ${e}`),s(`Folder target item identifier: ${P}`),s("Creating folder position input (no folder tags)");const j=g(y,v,P);s("Folder position input created:",j);let F=[];const T=i.filter(z=>z.status==="complete");if(s(`Found ${T.length} valid photos with 'complete' status`),T.length>0){const z=T.filter(U=>!U.fileId);s(`Found ${z.length} new uploads to move from temp to public folder`),z.length>0&&(s("Moving files from temp to public folder"),await kt(z,Z,s)),s("Creating file reference inputs for uploads with individual photo tags");const O=h(T,y,v);s(`Created ${O.length} file reference inputs for uploads`,O),F=F.concat(O)}if($&&d.length>0){s(`Adding ${d.length} existing file references for sub-album`);const z=d.map(O=>(s(`Creating file reference for existing file ID: ${O}`),{fileReferencesHolderId:e,currentTime:y,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:O,fileInput:null}));s(`Created ${z.length} file reference inputs for existing files`,z),F=F.concat(z)}s(`Total file reference inputs: ${F.length}`),s("Sending GraphQL mutations with chunked file references (individual photo tags)"),await te(j,F)}catch(y){console.error("Error in saveAlbumDirectly:",y),s(`Error in saveAlbumDirectly: ${y}`),a(!1)}}}},Fs=({selectedPhotos:e,selectedPhotoIndices:n,isSavingAlbum:i,onRemovePhoto:$,onTogglePhotoSelection:d,onSelectAllPhotos:k,onDeselectAllPhotos:S,hideHeader:u=!1})=>{const{t:c}=ke();if(e.length===0)return null;const A=n.size>0,N=n.size===e.length;return t.jsxs(t.Fragment,{children:[!u&&e.length>1&&t.jsx(Ce,{style:{marginBottom:"16px",border:"2px solid #007bff"},children:t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px"},children:[t.jsx("span",{style:{fontWeight:"bold",fontSize:"14px",color:"#007bff"},children:A?c("{{count}} file(s) selected for tagging",{count:n.size}):c("Click files below to select them for tagging")}),t.jsxs("div",{style:{display:"flex",gap:"8px",marginLeft:"auto"},children:[!N&&t.jsx("button",{onClick:k,disabled:i,style:{padding:"6px 12px",border:"1px solid #007bff",borderRadius:"4px",background:"#007bff",color:"white",fontSize:"12px",cursor:"pointer",fontWeight:"bold"},children:c("Select All")}),A&&t.jsx("button",{onClick:S,disabled:i,style:{padding:"6px 12px",border:"1px solid #6c757d",borderRadius:"4px",background:"transparent",color:"#6c757d",fontSize:"12px",cursor:"pointer"},children:c("Deselect All")})]})]})}),t.jsx(Wt,{children:e.map((I,M)=>{var q,R;const a=n.has(M);return t.jsxs(Kt,{"data-selected":a?"true":"false",style:{position:"relative",cursor:e.length>1?"pointer":"default"},onClick:()=>e.length>1&&d(M),children:[a&&!i&&t.jsx("button",{onClick:H=>{H.stopPropagation(),confirm(c("Are you sure you want to remove this photo?"))&&$(M)},style:{position:"absolute",top:"6px",right:"6px",width:"18px",height:"18px",borderRadius:"50%",border:"none",backgroundColor:"rgba(220, 53, 69, 0.8)",color:"white",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:"bold",zIndex:15,opacity:1,transition:"all 0.2s ease",transform:"scale(0.8)"},onMouseEnter:H=>{H.currentTarget.style.backgroundColor="rgba(200, 35, 51, 0.9)",H.currentTarget.style.transform="scale(1)",H.currentTarget.style.opacity="1"},onMouseLeave:H=>{H.currentTarget.style.backgroundColor="rgba(220, 53, 69, 0.8)",H.currentTarget.style.transform="scale(0.8)",H.currentTarget.style.opacity="0"},title:c("Remove photo"),children:"×"}),e.length>1&&a&&t.jsx("div",{style:{position:"absolute",bottom:"8px",left:"8px",right:"8px",background:"rgba(0, 123, 255, 0.9)",color:"white",padding:"4px 8px",borderRadius:"6px",fontSize:"11px",fontWeight:"600",textAlign:"center",zIndex:10,backdropFilter:"blur(4px)"},children:"SELECTED"}),I.status!=="complete"&&t.jsx(Gt,{$status:I.status,children:I.status==="error"?"✕":I.status==="uploading"?"↑":I.status==="processing"?"⚙️":"•"}),t.jsxs(qt,{style:{opacity:e.length===1||!a?1:.85,transition:"opacity 0.2s ease"},children:[I.type==="video"||(q=I.type)!=null&&q.startsWith("video")?t.jsx(Ht,{src:I.s3PreviewUrl,controls:!0}):t.jsx(Jt,{src:I.s3PreviewUrl,alt:I.fileName}),(I.status==="uploading"||I.status==="processing")&&t.jsx(Ge,{$bottom:"4px",$left:"4px",$right:"4px",$height:"4px",children:t.jsx(qe,{$progress:I.progress,$status:I.status})})]}),t.jsxs(Qt,{children:[(R=I.type)!=null&&R.startsWith("video")?c("Video"):c("Image"),I.size&&` • ${(I.size/1024/1024).toFixed(1)} MB`,I.duration&&` • ${I.duration}s`]}),I.status==="error"&&I.errorMessage&&t.jsxs(Vt,{$type:"error",children:[c("Error"),": ",I.errorMessage.length>40?I.errorMessage.substring(0,37)+"...":I.errorMessage]})]},M)})}),t.jsx("style",{children:`
          [data-selected="true"]:hover button {
            opacity: 1 !important;
            transform: scale(1) !important;
          }
        `})]})},Es=({isSavingAlbum:e,savingProgress:n})=>{const{t:i}=ke();return e?t.jsxs(Ce,{children:[t.jsx(Bt,{children:i("Saving Album")}),t.jsx(Ut,{id:"saveProgressText",children:i("Moving files...")}),t.jsx(Ge,{children:t.jsx(qe,{id:"saveProgress",$progress:n/100})})]}):null},_s=({showFolderDetails:e,isCreator:n,folderName:i,setFolderName:$,folderDescription:d,setFolderDescription:k,isSavingAlbum:S})=>{const{t:u}=ke();return!e||n!==!0?null:t.jsxs(Ce,{children:[t.jsxs(Re,{children:[t.jsx(ze,{htmlFor:"folderName",children:u("Album Name")}),t.jsx(Ot,{id:"folderName",type:"text",value:i,onChange:c=>$(c.target.value),placeholder:u("e.g. Family Vacation in Kyoto"),disabled:S})]}),t.jsxs(Re,{children:[t.jsx(ze,{htmlFor:"folderDescription",children:u("Album Description")}),t.jsx(Mt,{id:"folderDescription",value:d,onChange:c=>k(c.target.value),placeholder:u("e.g. what's special about this album"),rows:4,disabled:S})]})]})},ke=()=>({t:(e,n)=>n&&typeof n=="object"&&"count"in n?e.replace("{{count}}",String(n.count)):e,language:"en"}),Ns=`
  query FetchTags($fetchRelationsInput: FetchRelationsInput!) {
    fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
      items {
        ... on Tag {
          id
          createdAt
          updatedAt
          TagType
          tagTitle
          points
          subtags {
            items {
              id
              createdAt
              updatedAt
              TagType
              tagTitle
              subtagTitle
              points
            }
            nextToken
          }
        }
      }
      nextToken
    }
  }
`,Rs=`
  mutation AddTag($tagInput: TagInput!) {
    addTag(tagInput: $tagInput) {
      id
      createdAt
      updatedAt
      TagType
      tagTitle
      points
    }
  }
`,zs=`
  mutation AddSubtag($subtagInput: SubtagInput!) {
    addSubtag(subtagInput: $subtagInput) {
      id
      createdAt
      updatedAt
      TagType
      tagTitle
      subtagTitle
      points
    }
  }
`,Os=`
  mutation DeleteTag($tagId: String!) {
    deleteTag(tagId: $tagId) {
      id
      hasBeenDeleted
    }
  }
`,Ms=`
  mutation DeleteSubtag($subtagId: String!) {
    deleteSubtag(subtagId: $subtagId) {
      id
      hasBeenDeleted
    }
  }
`,Bs=e=>{const[n,i]=x.useState([]),[$,d]=x.useState([]),[k,S]=x.useState(null),[u,c]=x.useState(!1),[A,N]=x.useState(null),[I,M]=x.useState(null),[a,q]=x.useState(!1),[R,H]=x.useState(!1),[s,ee]=x.useState(""),[L,Z]=x.useState(""),[ce,le]=x.useState(!1),[g,h]=x.useState(!1),p=async()=>{var o,b;e("Fetching tags from API"),c(!0);try{const _=await ge();if(!_){e("No token available for fetching tags");return}const Q=await(await fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${_}`},body:JSON.stringify({query:Ns,variables:{fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(e("Tags API response:",Q),Q.errors){console.error("GraphQL errors:",Q.errors),e(`GraphQL errors: ${JSON.stringify(Q.errors)}`);return}const oe=(((b=(o=Q==null?void 0:Q.data)==null?void 0:o.fetchRelations)==null?void 0:b.items)||[]).map(Y=>{var ae,X;return{id:Y.id,tagTitle:Y.tagTitle,TagType:Y.TagType,points:Y.points,createdAt:Y.createdAt,updatedAt:Y.updatedAt,subtags:((X=(ae=Y.subtags)==null?void 0:ae.items)==null?void 0:X.map(de=>({id:de.id,tagTitle:de.tagTitle,subtagTitle:de.subtagTitle,TagType:de.TagType,points:de.points,createdAt:de.createdAt,updatedAt:de.updatedAt})))||[]}});e(`Fetched ${oe.length} tags`),i(oe)}catch(_){console.error("Error fetching tags:",_),e(`Error fetching tags: ${_}`)}finally{c(!1)}},f=o=>{if(e(`Selecting tag for photo application: ${o.tagTitle}`),!$.find(_=>_.tagTitle===o.tagTitle)){const _={tagTitle:o.tagTitle,TagType:o.TagType,subtags:[]};d(V=>[...V,_]),e(`Tag ${o.tagTitle} added to selection for photo application`)}},W=o=>{e(`Unselecting tag from photo application: ${o.tagTitle}`),d(b=>b.filter(_=>_.tagTitle!==o.tagTitle)),k===o.id&&S(null)},J=o=>{e(`Selecting subtag for photo application: ${o.subtagTitle} for tag: ${o.tagTitle}`),d(b=>b.map(_=>_.tagTitle===o.tagTitle&&!_.subtags.find(Q=>Q.subtagTitle===o.subtagTitle)?{..._,subtags:[..._.subtags,{TagType:o.TagType,tagTitle:o.tagTitle,subtagTitle:o.subtagTitle}]}:_))},K=o=>{e(`Unselecting subtag from photo application: ${o.subtagTitle} for tag: ${o.tagTitle}`),d(b=>b.map(_=>_.tagTitle===o.tagTitle?{..._,subtags:_.subtags.filter(V=>V.subtagTitle!==o.subtagTitle)}:_))},te=o=>{e(`Setting displayed tag: ${o}`),S(o)},xe=o=>$.some(b=>b.tagTitle===o.tagTitle),y=o=>{const b=$.find(_=>_.tagTitle===o.tagTitle);return(b==null?void 0:b.subtags.some(_=>_.subtagTitle===o.subtagTitle))||!1},v=()=>{if(!k)return[];const o=n.find(b=>b.id===k);return(o==null?void 0:o.subtags)||[]},D=()=>{e("Clearing all selected tags"),d([]),S(null)},P=()=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(o){const b=Math.random()*16|0;return(o=="x"?b:b&3|8).toString(16)}),j=async(o,b)=>{if(e(`Adding new tag: ${o} of type: ${b}`),!o.trim())return e("Cannot add tag with empty title"),!1;le(!0);try{if(!await ge())return e("No token available for adding tag"),!1;if(await(async()=>(e("PLACEHOLDER: Would send GraphQL mutation to add tag",{mutation:Rs,variables:{tagInput:{tagTitle:o.trim(),TagType:b,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(ie=>setTimeout(ie,500)),!0))()){const ie={id:P(),tagTitle:o.trim(),TagType:b,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3),subtags:[]};return i(oe=>[ie,...oe]),f(ie),te(ie.id),ee(""),q(!1),e(`Successfully added new tag for photo application: ${o}`),!0}return!1}catch(_){return console.error("Error adding new tag:",_),e(`Error adding new tag: ${_}`),!1}finally{le(!1)}},F=async(o,b,_)=>{if(e(`Adding new subtag: ${b} to tag: ${o}`),!b.trim())return e("Cannot add subtag with empty title"),!1;if(!k)return e("No displayed tag for adding subtag"),!1;h(!0);try{if(!await ge())return e("No token available for adding subtag"),!1;if(await(async()=>(e("PLACEHOLDER: Would send GraphQL mutation to add subtag",{mutation:zs,variables:{subtagInput:{tagTitle:o,subtagTitle:b.trim(),TagType:_,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(oe=>setTimeout(oe,500)),!0))()){const oe={id:P(),tagTitle:o,subtagTitle:b.trim(),TagType:_,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3)};return i(Y=>Y.map(ae=>ae.id===k?{...ae,subtags:[oe,...ae.subtags||[]]}:ae)),J(oe),Z(""),H(!1),e(`Successfully added new subtag for photo application: ${b}`),!0}return!1}catch(V){return console.error("Error adding new subtag:",V),e(`Error adding new subtag: ${V}`),!1}finally{h(!1)}},T=async o=>{e(`Deleting tag: ${o}`),N(o);try{if(!await ge())return e("No token available for deleting tag"),!1;if(await(async()=>(e("PLACEHOLDER: Would send GraphQL mutation to delete tag",{mutation:Os,variables:{tagId:o}}),await new Promise(Q=>setTimeout(Q,500)),!0))()){i(ie=>ie.filter(oe=>oe.id!==o));const Q=n.find(ie=>ie.id===o);return Q&&W(Q),k===o&&te(null),e(`Successfully deleted tag: ${o}`),!0}return!1}catch(b){return console.error("Error deleting tag:",b),e(`Error deleting tag: ${b}`),!1}finally{N(null)}},z=async o=>{e(`Deleting subtag: ${o}`),M(o);try{if(!await ge())return e("No token available for deleting subtag"),!1;if(await(async()=>(e("PLACEHOLDER: Would send GraphQL mutation to delete subtag",{mutation:Ms,variables:{subtagId:o}}),await new Promise(Q=>setTimeout(Q,500)),!0))()){let Q=null;return i(ie=>ie.map(oe=>{var ae;const Y=((ae=oe.subtags)==null?void 0:ae.filter(X=>X.id===o?(Q=X,!1):!0))||[];return{...oe,subtags:Y}})),Q&&K(Q),e(`Successfully deleted subtag: ${o}`),!0}return!1}catch(b){return console.error("Error deleting subtag:",b),e(`Error deleting subtag: ${b}`),!1}finally{M(null)}},O=async(o,b)=>(e(`Placeholder: Updating tag points: ${o} to ${b}`),!1),U=()=>{q(!0),ee("")},ue=()=>{q(!1),ee("")},se=()=>{H(!0),Z("")},re=()=>{H(!1),Z("")},he=async()=>s.trim()?await j(s,"File"):!1,me=async()=>{if(L.trim()&&k){const o=n.find(b=>b.id===k);if(o)return await F(o.tagTitle,L,o.TagType)}return!1};return x.useEffect(()=>{p()},[]),{tags:n,selectedTags:$,displayedTagId:k,isLoadingTags:u,tagIdBeingDeleted:A,subtagIdBeingDeleted:I,isAddingNewTag:a,isAddingNewSubtag:R,newTagTitle:s,newSubtagTitle:L,isSubmittingNewTag:ce,isSubmittingNewSubtag:g,fetchTags:p,selectTag:f,unselectTag:W,selectSubtag:J,unselectSubtag:K,setDisplayedTag:te,clearSelectedTags:D,isTagSelected:xe,isSubtagSelected:y,getDisplayedTagSubtags:v,setTagIdBeingDeleted:N,setSubtagIdBeingDeleted:M,addNewTag:j,addNewSubtag:F,deleteTag:T,deleteSubtag:z,updateTagPoints:O,startAddingNewTag:U,cancelAddingNewTag:ue,startAddingNewSubtag:se,cancelAddingNewSubtag:re,submitNewTag:he,submitNewSubtag:me,setNewTagTitle:ee,setNewSubtagTitle:Z}},Us=B.div`
  margin: 32px 0; /* Increased spacing */
`,He=B.div`
  margin-bottom: 24px; /* Increased spacing */
`,Je=B.h3`
  margin: 0 0 16px 0; /* Increased spacing */
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  display: flex;
  align-items: center;
  gap: 12px; /* Increased spacing */
`,Qe=B.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px; /* Increased spacing */
  align-items: center;
  min-height: 32px;
`,Ve=B.button`
  position: relative;
  padding: 8px 16px; /* Increased padding */
  border: 1px solid ${e=>e.$isSelected?"#007bff":"#ced4da"};
  border-radius: 20px; /* More rounded for modern look */
  background: ${e=>e.$isSelected?"#007bff":"#ffffff"};
  color: ${e=>e.$isSelected?"#ffffff":"#495057"};
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s ease; /* Smoother transition */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04); /* Soft shadow */
  
  ${e=>e.$isDisplayed&&`
    border-color: #28a745;
    background: #28a745;
    color: white;
    box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.3), 0 4px 12px rgba(40, 167, 69, 0.15);
  `}

  ${e=>e.$isBeingDeleted&&`
    opacity: 0.5;
    pointer-events: none;
  `}

  &:hover {
    background: ${e=>e.$isSelected?"#0056b3":"#f8f9fa"};
    transform: translateY(-1px); /* Subtle lift effect */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    
    ${e=>e.$isDisplayed&&`
      background: #1e7e34;
      box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.4), 0 6px 16px rgba(40, 167, 69, 0.2);
    `}
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`,Ws=B(Ve)`
  font-size: 12px;
  padding: 6px 12px; /* Adjusted padding */
  border-radius: 16px; /* Slightly less rounded */
`,Ye=B.button`
  position: absolute;
  top: -6px; /* Adjusted position */
  right: -6px;
  width: 18px; /* Slightly larger */
  height: 18px;
  border: none;
  border-radius: 50%;
  background: rgba(220, 53, 69, 0.9); /* More opaque */
  color: white;
  font-size: 11px; /* Slightly larger */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3); /* Soft shadow */

  &:hover {
    background: #c82333;
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(220, 53, 69, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`,Ks=B.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 16px; /* Added padding */
`,Xe=B.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 16px; /* Added padding */
`,Ze=B.button`
  padding: 8px 16px; /* Increased padding */
  border: 1px solid #6c757d;
  border-radius: 16px; /* More rounded */
  background: transparent;
  color: #6c757d;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease; /* Smoother transition */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04); /* Soft shadow */

  &:hover {
    background: #6c757d;
    color: white;
    transform: translateY(-1px); /* Subtle lift effect */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`,Gs=B.div`
  display: flex;
  align-items: center;
  gap: 6px; /* Increased gap */
  padding: 6px 12px; /* Increased padding */
  border: 1px solid #007bff;
  border-radius: 16px; /* More rounded */
  background: white;
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.1); /* Soft shadow */
  transition: all 0.2s ease;
  
  &:focus-within {
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.3), 0 4px 12px rgba(0, 123, 255, 0.15);
  }
`,qs=B.input`
  border: none;
  outline: none;
  font-size: 12px;
  background: transparent;
  min-width: 100px; /* Increased min-width */
  max-width: 200px;

  &::placeholder {
    color: #999;
    opacity: 0.7;
  }
`,We=B.button`
  border: none;
  background: transparent;
  color: #007bff;
  font-size: 11px; /* Slightly larger */
  cursor: pointer;
  padding: 4px 6px; /* Increased padding */
  border-radius: 6px; /* More rounded */
  transition: all 0.2s ease;

  &:hover {
    background: #007bff;
    color: white;
    transform: scale(1.05); /* Subtle scale effect */
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`,Hs=B.span`
  background: #6c757d;
  color: white;
  padding: 3px 8px; /* Increased padding */
  border-radius: 12px; /* More rounded */
  font-size: 10px;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Soft shadow */
`,Js=({tag:e,isSelected:n,isDisplayed:i,isBeingDeleted:$,disabled:d,onTagClick:k,onDeleteTag:S,getTagDisplayText:u})=>{const[c,A]=x.useState(!1);return t.jsxs(Ve,{$isSelected:n,$isDisplayed:i,$isBeingDeleted:$,disabled:d,onClick:()=>k(e),onMouseEnter:()=>A(!0),onMouseLeave:()=>A(!1),children:[u(e),c&&!d&&!$&&t.jsx(Ye,{onClick:N=>{N.stopPropagation(),S(e.id)},disabled:$,children:"×"})]})},Qs=({subtag:e,isSelected:n,isBeingDeleted:i,disabled:$,onSubtagClick:d,onDeleteSubtag:k})=>{const[S,u]=x.useState(!1);return t.jsxs(Ws,{$isSelected:n,$isBeingDeleted:i,disabled:$,onClick:()=>d(e),onMouseEnter:()=>u(!0),onMouseLeave:()=>u(!1),children:[e.subtagTitle,S&&!$&&!i&&t.jsx(Ye,{onClick:c=>{c.stopPropagation(),k(e.id)},disabled:i,children:"×"})]})},Le=({value:e,onChange:n,onSubmit:i,onCancel:$,isSubmitting:d,placeholder:k="Enter tag name..."})=>{const S=x.useRef(null);x.useEffect(()=>{S.current&&S.current.focus()},[]);const u=c=>{c.key==="Enter"?i():c.key==="Escape"&&$()};return t.jsxs(Gs,{children:[t.jsx(qs,{ref:S,type:"text",value:e,onChange:c=>n(c.target.value),onKeyDown:u,placeholder:k,disabled:d}),t.jsx(We,{onClick:i,disabled:!e.trim()||d,title:"Add (Enter)",children:d?"...":"✓"}),t.jsx(We,{onClick:$,disabled:d,title:"Cancel (Escape)",children:"×"})]})},Vs=({tagsManager:e,disabled:n=!1,enhancedLog:i})=>{const{tags:$,selectedTags:d,displayedTagId:k,isLoadingTags:S,tagIdBeingDeleted:u,isAddingNewTag:c,newTagTitle:A,isSubmittingNewTag:N,selectTag:I,unselectTag:M,setDisplayedTag:a,isTagSelected:q,deleteTag:R,startAddingNewTag:H,cancelAddingNewTag:s,submitNewTag:ee,setNewTagTitle:L}=e,Z=p=>{if(n)return;const f=q(p),W=k===p.id;f?f&&!W?(a(p.id),i(`Displayed tag: ${p.tagTitle}`)):f&&W&&(M(p),a(null),i(`Unselected tag: ${p.tagTitle}`)):(I(p),a(p.id),i(`Selected tag for photo application: ${p.tagTitle}`))},ce=async p=>{if(n)return;i(`Delete tag initiated: ${p}`);const f=await R(p);i(f?`Tag successfully deleted: ${p}`:`Failed to delete tag: ${p}`)},le=async()=>{await ee()||i("Failed to submit new tag")},g=p=>{const f=d.find(J=>J.tagTitle===p.tagTitle);if(!f||f.subtags.length===0)return p.tagTitle;const W=f.subtags.map(J=>J.subtagTitle).join(" || ");return`${p.tagTitle}  |  ${W}`},h=[...$].sort((p,f)=>p.points!==f.points?f.points-p.points:f.updatedAt-p.updatedAt);return t.jsxs(Us,{children:[t.jsxs(He,{children:[t.jsxs(Je,{children:["Tag the selected photos",d.length>0&&t.jsxs(Hs,{children:[d.length," selected"]})]}),t.jsx(Qe,{children:S?t.jsx(Ks,{children:"Loading tags..."}):t.jsxs(t.Fragment,{children:[h.map(p=>t.jsx(Js,{tag:p,isSelected:q(p),isDisplayed:k===p.id,isBeingDeleted:u===p.id,disabled:n,onTagClick:Z,onDeleteTag:ce,getTagDisplayText:g},p.id)),c?t.jsx(Le,{value:A,onChange:L,onSubmit:le,onCancel:s,isSubmitting:N,placeholder:"Enter tag name..."}):t.jsx(Ze,{disabled:n,onClick:H,children:"+ Add Tag"}),h.length===0&&!c&&t.jsx(Xe,{children:"No tags available"})]})})]}),k&&t.jsx(Ys,{tagsManager:e,disabled:n,enhancedLog:i}),d.length>0&&t.jsxs("div",{style:{marginTop:"24px",padding:"20px 24px",background:"linear-gradient(135deg, #e7f3ff 0%, #f0f8ff 100%)",borderRadius:"12px",fontSize:"13px",color:"#0c5aa6",border:"1px solid #b3d9ff",boxShadow:"0 4px 12px rgba(0, 123, 255, 0.08)"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"12px"},children:[t.jsx("span",{style:{fontSize:"16px"},children:"✅"}),t.jsx("strong",{style:{fontSize:"14px"},children:"Tags Applied:"})]}),t.jsxs("div",{style:{lineHeight:"1.5"},children:["All selected files will have ",t.jsxs("strong",{children:[d.length," tag",d.length!==1?"s":""]})," applied to them when you save the album.",t.jsx("br",{}),t.jsx("strong",{children:"Selected tags:"})," ",d.map(p=>{const f=p.subtags.map(W=>W.subtagTitle);return f.length>0?`${p.tagTitle} (${f.join(", ")})`:p.tagTitle}).join(", ")]})]})]})},Ys=({tagsManager:e,disabled:n=!1,enhancedLog:i})=>{var le;const{displayedTagId:$,subtagIdBeingDeleted:d,isAddingNewSubtag:k,newSubtagTitle:S,isSubmittingNewSubtag:u,selectSubtag:c,unselectSubtag:A,isSubtagSelected:N,deleteSubtag:I,startAddingNewSubtag:M,cancelAddingNewSubtag:a,submitNewSubtag:q,setNewSubtagTitle:R}=e,H=$?((le=e.tags.find(g=>g.id===$))==null?void 0:le.subtags)||[]:[],s=e.tags.find(g=>g.id===$),ee=g=>{if(n)return;N(g)?(A(g),i(`Unselected subtag for photo application: ${g.subtagTitle}`)):(c(g),i(`Selected subtag for photo application: ${g.subtagTitle}`))},L=async g=>{if(n)return;i(`Delete subtag initiated: ${g}`);const h=await I(g);i(h?`Subtag successfully deleted: ${g}`:`Failed to delete subtag: ${g}`)},Z=async()=>{await q()||i("Failed to submit new subtag")};if(!s)return null;const ce=[...H].sort((g,h)=>g.points!==h.points?h.points-g.points:h.updatedAt-g.updatedAt);return t.jsxs(He,{children:[t.jsxs(Je,{children:['Subtags for "',s.tagTitle,'"']}),t.jsxs(Qe,{children:[ce.map(g=>t.jsx(Qs,{subtag:g,isSelected:N(g),isBeingDeleted:d===g.id,disabled:n,onSubtagClick:ee,onDeleteSubtag:L},g.id)),k?t.jsx(Le,{value:S,onChange:R,onSubmit:Z,onCancel:a,isSubmitting:u,placeholder:"Enter subtag name..."}):t.jsx(Ze,{disabled:n,onClick:M,children:"+ Add Subtag"}),ce.length===0&&!k&&t.jsx(Xe,{children:"No subtags available"})]})]})},Xs=({children:e,t:n,isRTL:i})=>t.jsxs("div",{style:{padding:"32px",marginBottom:"32px",backgroundColor:"#f8f9fa",border:"2px solid #e9ecef",borderRadius:"12px",direction:i?"rtl":"ltr"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",fontSize:"18px",color:"#495057",fontWeight:"600",marginBottom:"24px",flexDirection:i?"row-reverse":"row"},children:[t.jsx("span",{style:{marginRight:i?"0":"12px",marginLeft:i?"12px":"0",fontSize:"20px"},children:"🏷️"}),n("Click files below to select them for tagging")]}),e]}),Zs=({selectedPhotos:e,selectedPhotoIndices:n,onToggleSelection:i,onSelectAll:$,onDeselectAll:d,onRemovePhoto:k,onDeleteAll:S,disabled:u,t:c,isRTL:A})=>e.length===0?null:t.jsxs("div",{style:{marginBottom:"32px",direction:A?"rtl":"ltr"},children:[t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px",flexDirection:A?"row-reverse":"row"},children:[t.jsxs("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:[c("New Files")," (",e.length,")"]}),t.jsxs("div",{style:{display:"flex",gap:"8px",flexDirection:A?"row-reverse":"row"},children:[t.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:u?"#f8f9fa":"#fff",color:u?"#999":"#333",cursor:u?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:n.size===e.length?d:$,disabled:u,onMouseEnter:N=>{u||(N.currentTarget.style.backgroundColor="#f8f9fa")},onMouseLeave:N=>{u||(N.currentTarget.style.backgroundColor="#fff")},children:n.size===e.length?c("Deselect All"):c("Select All")}),t.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #dc3545",borderRadius:"4px",backgroundColor:u?"#f8f9fa":"#fff",color:u?"#999":"#dc3545",cursor:u?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:S,disabled:u,onMouseEnter:N=>{u||(N.currentTarget.style.backgroundColor="#dc3545",N.currentTarget.style.color="#fff")},onMouseLeave:N=>{u||(N.currentTarget.style.backgroundColor="#fff",N.currentTarget.style.color="#dc3545")},children:c("Delete All")})]})]}),t.jsx(Fs,{selectedPhotos:e,selectedPhotoIndices:n,isSavingAlbum:u,onRemovePhoto:k,onTogglePhotoSelection:i,onSelectAllPhotos:$,onDeselectAllPhotos:d,hideHeader:!0})]}),Ls=({existingFiles:e,selectedExistingIndices:n,onToggleSelection:i,onSelectAll:$,onDeselectAll:d,onDeleteFile:k,disabled:S,t:u,isRTL:c})=>e.length===0?null:t.jsxs("div",{style:{marginBottom:"32px",direction:c?"rtl":"ltr"},children:[t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px",flexDirection:c?"row-reverse":"row"},children:[t.jsxs("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:[u("Existing Files")," (",e.length,")"]}),t.jsx("div",{style:{display:"flex",gap:"8px",flexDirection:c?"row-reverse":"row"},children:t.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:S?"#f8f9fa":"#fff",color:S?"#999":"#333",cursor:S?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:n.size===e.length?d:$,disabled:S,onMouseEnter:A=>{S||(A.currentTarget.style.backgroundColor="#f8f9fa")},onMouseLeave:A=>{S||(A.currentTarget.style.backgroundColor="#fff")},children:n.size===e.length?u("Deselect All"):u("Select All")})})]}),t.jsx("div",{style:{display:"flex",overflowX:"auto",gap:"16px",padding:"20px",border:"2px dashed #007bff",borderRadius:"12px",backgroundColor:"#fff",boxShadow:"0 2px 8px rgba(0, 0, 0, 0.04)",scrollbarWidth:"thin",scrollbarColor:"#007bff #f8f9fa"},children:e.map((A,N)=>{const I=n.has(N);return t.jsxs("div",{style:{position:"relative",width:"160px",height:"160px",flexShrink:0,borderRadius:"12px",overflow:"hidden",border:I?"2px solid rgba(0, 123, 255, 0.6)":"2px solid #ddd",cursor:S?"not-allowed":"pointer",opacity:S?.6:1,transition:"all 0.3s ease",boxShadow:I?"0 0 0 3px rgba(0, 123, 255, 0.3), 0 4px 12px rgba(0, 123, 255, 0.15)":"0 2px 8px rgba(0, 0, 0, 0.04)",transform:I?"translateY(-2px)":"translateY(0)"},onClick:()=>!S&&i(N),children:[t.jsx(ls,{thumbnailDataKey:A.thumbnailDataKey,dataKey:A.dataKey,alt:u("Existing file"),style:{width:"100%",height:"100%",objectFit:"cover"}}),I&&t.jsx("div",{style:{position:"absolute",bottom:"8px",left:"8px",right:"8px",background:"rgba(0, 123, 255, 0.9)",color:"white",padding:"4px 8px",borderRadius:"6px",fontSize:"11px",fontWeight:"600",textAlign:"center",zIndex:10,backdropFilter:"blur(4px)"},children:"SELECTED"}),I&&!S&&t.jsx("button",{onClick:M=>{M.stopPropagation(),confirm(u("Are you sure you want to remove this file?"))&&k(N)},style:{position:"absolute",top:"6px",right:"6px",width:"18px",height:"18px",borderRadius:"50%",border:"none",backgroundColor:"rgba(220, 53, 69, 0.8)",color:"white",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:"bold",zIndex:15,opacity:1,transition:"all 0.2s ease",transform:"scale(0.8)"},onMouseEnter:M=>{M.currentTarget.style.backgroundColor="rgba(200, 35, 51, 0.9)",M.currentTarget.style.transform="scale(1)",M.currentTarget.style.opacity="1"},onMouseLeave:M=>{M.currentTarget.style.backgroundColor="rgba(220, 53, 69, 0.8)",M.currentTarget.style.transform="scale(0.8)",M.currentTarget.style.opacity="0"},title:u("Remove file"),children:"×"}),A.dataInBytes>0&&t.jsxs("div",{style:{position:"absolute",bottom:"4px",left:"4px",backgroundColor:"rgba(0,0,0,0.7)",color:"white",fontSize:"10px",padding:"2px 4px",borderRadius:"4px"},children:[(A.dataInBytes/(1024*1024)).toFixed(1),"MB"]}),A.durationInSeconds&&t.jsxs("div",{style:{position:"absolute",top:"8px",left:"8px",backgroundColor:"rgba(0,0,0,0.7)",color:"white",fontSize:"10px",padding:"2px 4px",borderRadius:"4px"},children:[Math.floor(A.durationInSeconds/60),":",String(Math.floor(A.durationInSeconds%60)).padStart(2,"0")]})]},`existing-${N}-${A.dataKey}`)})})]}),er=()=>{const{t:e,language:n}=Ke(),i=je(n)==="rtl",$=rs(e),{setShowUsernamePrompt:d,setUsernameInput:k}=$,[S,u]=x.useState(null),[c,A]=x.useState(!1),[N,I]=x.useState(0),[M,a]=x.useState(""),[q,R]=x.useState(""),[H,s]=x.useState(!1),[ee,L]=x.useState(!1),[Z,ce]=x.useState("NoPassword"),[le,g]=x.useState(""),[h,p]=x.useState(!1),[f,W]=x.useState(!0),[J,K]=x.useState(!1),[te,xe]=x.useState(null),[y,v]=x.useState(!1),[D,P]=x.useState([]),[j,F]=x.useState(!1),[T,z]=x.useState(!1),[O,U]=x.useState(new Set),[ue,se]=x.useState(new Map),[re,he]=x.useState([]),[me,o]=x.useState(new Set),[b,_]=x.useState(new Map),[V,Q]=x.useState(!1),ie=r=>{!S&&r&&u(r)},{fileInputRef:oe,selectedPhotos:Y,setSelectedPhotos:ae,isUploading:X,progressTracker:de,setProgressTracker:et,debugMessages:tt,currentFolderId:Se,openFilePicker:st,handleFileSelection:rt,setOnSaveAlbumPage:ve,log:Ie}=is(ie,!0);x.useEffect(()=>(ve(!0),w("🏠 Set isOnSaveAlbumPage to true - navigation disabled"),()=>{ve(!1),w("🏠 Set isOnSaveAlbumPage to false - navigation enabled")}),[ve]),x.useEffect(()=>{(async()=>{try{await zt(),Ie("🔥 Save-album page S3 credentials prewarmed successfully")}catch(m){Ie(`⚠️ Save-album page credential prewarming failed: ${String(m)}`)}})()},[]);const w=(r,m)=>{let C=`[${new Date().toISOString()}] ${r}`;if(m!==void 0)try{const G=typeof m=="object"?JSON.stringify(m,null,2):String(m);C+=`
Data: ${G}`,console.log(C),console.log("Data object:",m)}catch(G){C+=` [Error stringifying data: ${G}]`,console.log(C),console.log("Raw data:",m)}else console.log(C);Ie(C)},ot=async r=>{var m,E,C,G;if(r){Q(!0),w(`Fetching existing album data for folder ID: ${r}`);try{const ne=await ge();if(!ne){w("❌ Authentication failed while fetching existing album data");return}const At=`
        mutation FetchRelations($fetchRelationsInput: FetchRelationsInput!) {
          fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
            items {
              ... on FolderPosition {
                ${ns}
              }
            }
          }
        }
      `,jt={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}},ye=await(await fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${ne}`},body:JSON.stringify({query:At,variables:jt})})).json();if(ye.errors){console.error("GraphQL errors:",ye.errors),w(`❌ Failed to fetch existing album data: ${JSON.stringify(ye.errors)}`);return}const Ee=(((E=(m=ye==null?void 0:ye.data)==null?void 0:m.fetchRelations)==null?void 0:E.items)||[]).find(pe=>pe&&pe.folder&&pe.folder.id===r);if(!Ee)return;const be=Ee.folder,_e=(((G=(C=be==null?void 0:be.fileReferencesPage)==null?void 0:C.items)==null?void 0:G.map(pe=>pe.file))||[]).filter(pe=>pe&&pe.dataKey).map(pe=>({dataKey:pe.dataKey,thumbnailDataKey:pe.thumbnailDataKey||null,durationInSeconds:pe.durationInSeconds||null,dataInBytes:pe.dataInBytes||0}));he(_e),w(`✅ Successfully loaded ${_e.length} existing files`),!M&&be.folderName&&a(be.folderName),!q&&be.folderDescription&&R(be.folderDescription)}catch(ne){console.error("Failed to fetch existing album data:",ne),w(`❌ Failed to fetch existing album data: ${String(ne)}`)}finally{Q(!1)}}};x.useEffect(()=>{const m=new URLSearchParams(window.location.search).get("folderId");if(m){w(`Found folderId query parameter: ${m} - loading existing album`),F(!0),u(m),v(!1),localStorage.removeItem(fe.SUB_ALBUM_DATA),w("Cleared sub-album data from localStorage - loading existing album from query parameter");const E=localStorage.getItem(fe.SELECTED_PHOTOS);if(!E)w("No stored photos found - proceeding with existing album load");else try{const C=JSON.parse(E);Array.isArray(C)&&C.length>0?w(`Found ${C.length} stored photos - these may be newly uploaded for this album, preserving them`):(localStorage.removeItem(fe.SELECTED_PHOTOS),w("Cleared empty photos array from localStorage"))}catch(C){w(`Error parsing stored photos: ${C}`),localStorage.removeItem(fe.SELECTED_PHOTOS)}s(!0),xe(!0)}else w("No folderId query parameter found, will proceed with normal initialization"),F(!1)},[]);const{cognitoUsername:De,publicUsername:Pe,setPublicUsername:it}=ks(j?()=>{}:u,ae,j?()=>{}:xe,j?()=>{}:s,a,R,p,W,ce,g,j?()=>{}:v,j?()=>{}:P,K,w);x.useEffect(()=>{S&&(w(`Loading existing files for folder ID: ${S}`),ot(S))},[S]);const at=Bs(w),{saveAlbumDirectly:Fe}=Ds(S||Se,De,Y,y,D,M,q,h,f,J,Z,le,ue,A,I,ae,et,w);x.useEffect(()=>{Se&&!S&&(u(Se),w(`Updated folder ID from upload processor: ${Se}`))},[Se,S]),x.useEffect(()=>{U(r=>{const m=new Set;return r.forEach(E=>{E<Y.length&&m.add(E)}),m}),se(r=>{const m=new Map(r),E=[];return r.forEach((C,G)=>{G>=Y.length&&E.push(G)}),E.forEach(C=>{m.delete(C)}),m})},[Y.length]),x.useEffect(()=>{o(r=>{const m=new Set;return r.forEach(E=>{E<re.length&&m.add(E)}),m}),_(r=>{const m=new Map(r),E=[];return r.forEach((C,G)=>{G>=re.length&&E.push(G)}),E.forEach(C=>{m.delete(C)}),m})},[re.length]);const nt=r=>{w(`Removing photo at index: ${r}`);const m=Y.filter((E,C)=>C!==r);ae(m),w(`New files count: ${m.length}`),m.length>0?(localStorage.setItem(fe.SELECTED_PHOTOS,JSON.stringify(m)),w(`Updated localStorage with ${m.length} photos`)):(localStorage.removeItem(fe.SELECTED_PHOTOS),w("Removed photos from localStorage")),U(E=>{const C=new Set;return E.forEach(G=>{G<r?C.add(G):G>r&&C.add(G-1)}),C}),se(E=>{const C=new Map;return E.forEach((G,ne)=>{ne<r?C.set(ne,G):ne>r&&C.set(ne-1,G)}),C})},lt=r=>{w(`Removing existing file at index: ${r}`);const m=re.filter((E,C)=>C!==r);he(m),w(`New existing files count: ${m.length}`),o(E=>{const C=new Set;return E.forEach(G=>{G<r?C.add(G):G>r&&C.add(G-1)}),C}),_(E=>{const C=new Map;return E.forEach((G,ne)=>{ne<r?C.set(ne,G):ne>r&&C.set(ne-1,G)}),C})},dt=r=>{w(`Toggling selection for existing file at index: ${r}`),o(m=>{const E=new Set(m);return E.has(r)?(E.delete(r),w(`Deselected existing file ${r}`)):(E.add(r),w(`Selected existing file ${r}`)),E})},ct=()=>{w("Selecting all existing files");const r=new Set;for(let m=0;m<re.length;m++)r.add(m);o(r)},ut=()=>{w("Deselecting all existing files"),o(new Set)},pt=r=>{w(`Toggling selection for photo at index: ${r}`),U(m=>{const E=new Set(m);return E.has(r)?(E.delete(r),w(`Deselected photo ${r}`)):(E.add(r),w(`Selected photo ${r}`)),E})},ft=()=>{w("Selecting all photos");const r=new Set;for(let m=0;m<Y.length;m++)r.add(m);U(r)},gt=()=>{w("Deselecting all photos"),U(new Set)},mt=()=>{confirm(e("Are you sure you want to delete all new files? This action cannot be undone."))&&(w("Deleting all new photos"),ae([]),U(new Set),se(new Map),localStorage.removeItem(fe.SELECTED_PHOTOS),w("Cleared all photos from localStorage"))},xt=()=>{const r=!h;w(`Toggling isOnPublicProfile to: ${r}`),p(r)},ht=()=>{const r=!f;w(`Toggling participantsCanAddItems to: ${r}`),W(r)},bt=()=>{const r=!J;w(`Toggling participantsCanDeleteItems to: ${r}`),K(r)},yt=async()=>{w("Album save initiated"),w("Photo tags applied:",Object.fromEntries(ue)),w("Existing file tags applied:",Object.fromEntries(b)),z(!1),A(!0);try{if(Pe!=null&&Pe.startsWith("Profile-")){w("Public username starts with 'Profile-', showing username prompt"),k(""),d(!0),A(!1);return}w("Valid username found, proceeding to save album directly with file-level tagging"),Fe()}catch(r){console.error("Error in handleSaveAlbum:",r),w(`Error in handleSaveAlbum: ${r}`),A(!1)}},wt=r=>{w(`Handling successful username update to: ${r}`),localStorage.setItem(fe.PUBLIC_USERNAME,r),it(r),d(!1),w("Proceeding to save album after username update"),Fe()},St=(r,m)=>{w(`Password dialog closed with option: ${r}, password: ${m?"******":"undefined"}`),r&&ce(r),m!==void 0&&g(m),L(!1)},Tt=()=>{w("Opening password dialog"),L(!0)},$t=()=>{w("Add photos button clicked"),st(S)},vt=()=>{z(!T)},Te=r=>{r(),z(!1)};x.useEffect(()=>{const r=m=>{const E=m.target;T&&!E.closest(".settings-dropdown-container")&&z(!1)};return T&&document.addEventListener("mousedown",r),()=>{document.removeEventListener("mousedown",r)}},[T]);const Ae=c||X||V,It=Y.length>0||re.length>0,Pt=O.size>0||me.size>0;return t.jsxs(t.Fragment,{children:[t.jsx(Yt,{}),t.jsx(Xt,{children:t.jsxs(Zt,{children:[t.jsx(Lt,{href:"my-albums.html",children:e("My Albums")}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[te===!0&&t.jsxs("div",{className:"settings-dropdown-container",style:{position:"relative",display:"flex",alignItems:"center"},children:[t.jsx("button",{onClick:vt,disabled:c||X||V,style:{background:"none",border:"none",cursor:c||X||V?"not-allowed":"pointer",padding:"8px",borderRadius:"4px",display:"flex",alignItems:"center",justifyContent:"center",color:c||X||V?"#ccc":"#666",fontSize:"18px",transition:"all 0.2s ease",backgroundColor:T?"#f0f0f0":"transparent",opacity:c||X||V?.5:1},onMouseEnter:r=>{!T&&!c&&!X&&!V&&(r.currentTarget.style.backgroundColor="#f8f9fa")},onMouseLeave:r=>{!T&&!c&&!X&&!V&&(r.currentTarget.style.backgroundColor="transparent")},title:e("Album Settings"),children:"⚙️"}),T&&!c&&!X&&!V&&t.jsxs(es,{children:[t.jsx($e,{onClick:()=>Te(xt),children:t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[t.jsx("span",{children:e(h?"Remove From Public Profile":"Add To Public Profile")}),t.jsx("span",{style:{fontSize:"12px",color:h?"#28a745":"#6c757d",fontWeight:"bold"},children:h?"✓":"○"})]})}),t.jsx($e,{onClick:()=>Te(ht),children:t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[t.jsx("span",{children:e(f?"Allow Additions":"Do Not Allow Additions")}),t.jsx("span",{style:{fontSize:"12px",color:f?"#28a745":"#6c757d",fontWeight:"bold"},children:f?"✓":"○"})]})}),t.jsx($e,{onClick:()=>Te(bt),children:t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[t.jsx("span",{children:e(J?"Allow Removals":"Do Not Allow Removals")}),t.jsx("span",{style:{fontSize:"12px",color:J?"#28a745":"#6c757d",fontWeight:"bold"},children:J?"✓":"○"})]})}),t.jsx($e,{onClick:()=>Te(Tt),children:t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[t.jsx("span",{children:e("Album Password Policy")}),t.jsx("span",{style:{fontSize:"12px",color:Z!=="NoPassword"?"#28a745":"#6c757d",fontWeight:"bold"},children:Z!=="NoPassword"?"✓":"○"})]})})]})]}),t.jsx(Oe,{$primary:!0,onClick:yt,disabled:c||X||V,style:{minWidth:"120px",fontSize:"14px",padding:"8px 16px"},children:e(c?"Saving...":"Save Album")})]})]})}),t.jsxs(ts,{$isRTL:i,children:[t.jsx("div",{style:{marginTop:H&&te===!0?"32px":"0"},children:t.jsx(_s,{showFolderDetails:H,isCreator:te,folderName:M,setFolderName:a,folderDescription:q,setFolderDescription:R,isSavingAlbum:c||X})}),(X||de.totalFiles>0&&(de.filesUploading>0||de.filesProcessing>0||de.filesComplete<de.totalFiles))&&t.jsx(as,{progressTracker:de,isRTL:je(n)==="rtl",variant:"detailed",context:"saving",isUploading:X,showSuccessMessage:!1,showErrorMessage:!0,customMessages:{error:e("Some photos could not be processed. You can continue with the successfully processed photos.")}}),t.jsx("input",{ref:oe,id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:r=>rt(r,De),style:{display:"none"}}),H&&te===!0&&It&&t.jsxs(Xs,{t:e,isRTL:i,children:[re.length>0&&t.jsx("div",{style:{marginBottom:"32px"},children:t.jsx(Ls,{existingFiles:re,selectedExistingIndices:me,onToggleSelection:dt,onSelectAll:ct,onDeselectAll:ut,onDeleteFile:lt,disabled:Ae,t:e,isRTL:i})}),t.jsx(Zs,{selectedPhotos:Y,selectedPhotoIndices:O,onToggleSelection:pt,onSelectAll:ft,onDeselectAll:gt,onRemovePhoto:nt,onDeleteAll:mt,disabled:Ae,t:e,isRTL:i}),Pt&&t.jsx("div",{style:{marginTop:"32px"},children:t.jsx(Vs,{tagsManager:at,disabled:Ae,enhancedLog:w})})]}),t.jsx(Es,{isSavingAlbum:c,savingProgress:N}),t.jsx(ss,{children:t.jsx(Oe,{onClick:$t,disabled:c||X||V,children:e(X?"Uploading...":"Add More Photos")})}),t.jsx(os,{t:e,language:n,usernameManager:$,onSuccess:wt}),t.jsx(As,{isOpen:ee,onClose:St,initialOption:Z,initialPassword:le}),t.jsx(js,{debugMessages:tt,t:e,isRTL:i,textDirection:i?"rtl":"ltr"})]})]})},tr=()=>t.jsx(Rt,{children:t.jsx(er,{})});Nt.createRoot(document.getElementById("root")).render(t.jsx(tr,{}));
