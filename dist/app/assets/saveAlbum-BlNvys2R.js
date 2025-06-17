import{d as B,u as Ke,a as b,j as t,g as je,h as ce,L as me,i as Ne,s as Pt,m as jt,f as we,k as Ct,l as kt,n as Dt,r as Ft,R as _t,I as Et,p as Nt}from"./utils-DWLWZiq9.js";import{C as Ce,F as Re,e as ze,f as Rt,g as zt,P as Ot,h as Mt,i as Ge,j as qe,k as Bt,l as Ut,S as Wt,m as Kt,V as Gt,n as qt,o as Ht,M as Jt,G as Qt,p as Vt,q as Yt,r as Xt,D as Zt,s as Te,B as Oe,t as Lt,u as es}from"./styled-components-BiBgUlVV.js";import{u as ts,U as ss}from"./useUsernameManagement-BfIuUNZ8.js";import{u as rs,U as is}from"./useFileUploadProcessor-mRvvJjs-.js";import{F as os}from"./types-B2_92tNb.js";import{L as as}from"./LazyImage-DKl7VXhz.js";const l={colors:{primary:"#007bff",primaryDark:"#0056b3",secondary:"#6c757d",success:"#4caf50",danger:"#e53935",warning:"#ff9800",white:"#fff",text:{primary:"#333",secondary:"#666",light:"#777"},background:{primary:"#f9fafb",highlight:"#f0f7ff"},border:"#ddd"},spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px"},borderRadius:{small:"4px",medium:"8px"},boxShadow:{lg:"0 4px 10px rgba(0,0,0,0.08)"}},ns=B.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10000;
`,ls=B.div`
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
`,ds=B.div`
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
`,cs=B.div`
  direction: ${e=>e.$isRTL?"rtl":"ltr"};
`,us=B.h3`
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
`,ps=B.p`
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
`,fs=B.input`
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
`,gs=B.div`
  display: flex;
  flex-direction: column;
  gap: ${l.spacing.md};
  margin-bottom: ${l.spacing.xl};
`,ms=B.div`
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
`,xs=B.div`
  flex: 1;
`,hs=B.div`
  margin-bottom: ${l.spacing.xs};
`,bs=B.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${l.colors.primary};
  flex-shrink: 0;
`,ys=B.label`
  font-size: 16px;
  font-weight: 500;
  color: ${l.colors.text.primary};
  cursor: pointer;
  display: block;
`,ws=B.div`
  font-size: 14px;
  color: ${l.colors.text.secondary};
  margin-top: ${l.spacing.xs};
`,Ss=B.div`
  color: ${l.colors.warning};
  font-size: 12px;
  font-style: italic;
  margin-top: ${l.spacing.xs};
  font-weight: 500;
`,$s=B.div`
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
`,Ts=B.div`
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
`,vs=[{value:"NotVisible",titleKey:"Password Required To See Or Save",descriptionKey:"Album will be completely hidden until correct password is entered"},{value:"Watermark",titleKey:"Watermarked And No Saving Without Password",descriptionKey:"Photos will be visible with watermarks, password required to save"},{value:"CannotBeSaved",titleKey:"Password Required To Save",descriptionKey:"Photos are visible but password required to download or save"},{value:"NoPassword",titleKey:"No Password",descriptionKey:"Album is fully public with no restrictions"}],Is=({isOpen:e,onClose:n,initialOption:o="NoPassword",initialPassword:S=""})=>{const{t:c,language:k}=Ke(),w=je(k)==="rtl",[p,u]=b.useState(o),[P,_]=b.useState(S);if(b.useEffect(()=>{e&&(u(o),_(S))},[e,o,S]),!e)return null;const $=P.trim()==="",M=E=>{u(E)},a=E=>{E.target===E.currentTarget&&n()},q=E=>E!=="NoPassword";return t.jsxs(t.Fragment,{children:[t.jsx(ns,{onClick:a}),t.jsx(ls,{children:t.jsx(ds,{children:t.jsxs(cs,{$isRTL:w,children:[t.jsx(us,{children:c("Album Password Policy")}),t.jsx(ps,{children:c("Configure password protection for your album. Choose how you want to restrict access to your photos.")}),t.jsxs(Me,{children:[t.jsx(Be,{children:c("Enter Password")}),t.jsx(fs,{type:"text",placeholder:c("Enter password (optional)"),value:P,onChange:E=>_(E.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"})]}),t.jsxs(Me,{children:[t.jsx(Be,{children:c("Select Protection Level")}),t.jsx(gs,{children:vs.map(E=>t.jsxs(ms,{$isSelected:p===E.value,onClick:()=>M(E.value),children:[t.jsx(bs,{type:"radio",name:"protection",checked:p===E.value,onChange:()=>M(E.value)}),t.jsxs(xs,{children:[t.jsx(hs,{children:t.jsx(ys,{children:c(E.titleKey)})}),t.jsx(ws,{children:c(E.descriptionKey)}),$&&q(E.value)&&p===E.value&&t.jsx(Ss,{children:c('⚠️ Will use "password" as default if left empty')})]})]},E.value))})]}),q(p)&&t.jsxs(Ts,{children:[t.jsx("strong",{children:c("💡 Password Protection Info:")}),t.jsx("br",{}),c('If you leave the password field empty, "password" will be used as the default password. You can change this anytime in album settings.')]}),t.jsxs($s,{children:[t.jsx(Ue,{$variant:"secondary",onClick:()=>n(),children:c("Cancel")}),t.jsx(Ue,{$variant:"primary",onClick:()=>{const E=$&&q(p)?"password":P;console.log(`Saving with option: ${p}, password: ${E.length>0?"********":"none"}`),n(p,E)},children:c("Save")})]})]})})})]})},As=({debugMessages:e,t:n,isRTL:o,textDirection:S})=>e.length===0?null:t.jsxs("div",{style:{marginTop:"40px",background:"#fff3cd",padding:"16px",borderRadius:"8px",border:"1px solid #ffeeba",maxWidth:900,margin:"0 auto",direction:S},children:[t.jsx("h3",{style:{marginTop:0,fontSize:"18px",color:"#856404",textAlign:o?"right":"left"},children:n("Debug Log")}),t.jsx("pre",{style:{fontSize:"14px",color:"#856404",whiteSpace:"pre-wrap",maxHeight:"400px",overflow:"auto",textAlign:o?"right":"left"},children:e.map((c,k)=>t.jsx("div",{style:{marginBottom:"8px"},children:c},k))})]}),Ps=`
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
`,js=(e,n,o,S,c,k,w,p,u,P,_,$,M,a)=>{const[q,E]=b.useState(null),[J,s]=b.useState(null),se=async m=>{a(`Initializing folder ID with username: ${m}`);try{const f=new URLSearchParams(window.location.search).get("folderId");if(a(`Folder ID from URL: ${f||"null"}`),f){e(f),a(`Using existing folder ID: ${f}`);try{a(`Fetching details for folder: ${f}`);const g=await ee(f,a);if(a("Folder details retrieved:",g),g){const U=`${m}_____${m}____Account`,Q=g.creatorId===U;if(a(`User is creator of folder: ${Q}, accountId: ${U}, creator: ${g.creatorId}`),o(Q),Q){a("User is creator, showing folder details"),S(!0),c(g.folderName),k(g.folderDescription),w(g.isOnPublicProfile),a(`Setting isOnPublicProfile: ${g.isOnPublicProfile}`),g.participantsCanAddItems!==void 0&&(p(g.participantsCanAddItems),a(`Setting participantsCanAddItems: ${g.participantsCanAddItems}`)),g.participantsCanDeleteItems!==void 0&&(M(g.participantsCanDeleteItems),a(`Setting participantsCanDeleteItems: ${g.participantsCanDeleteItems}`));const W=g.passwordPolicy;a(`Password policy from folder details: ${W}`),u(W),W!=="NoPassword"&&g.password&&P(g.password),a(`Set password protection option to: ${W}`)}else a("User is NOT the creator, hiding editable fields"),S(!1)}else a("No folder details retrieved, setting isCreator to true"),o(!0),S(!0)}catch(g){console.error("Error fetching folder details:",g),a(`Error fetching folder details: ${g}`),o(!1)}}else{const g=`${m}_____${Ne()}____Folder`;a(`Creating new folder ID: ${g}`),e(g),a("Setting isCreator to true for new album"),o(!0),S(!0)}}catch(x){console.error("Folder ID initialization error:",x),a(`Folder ID initialization error: ${x}`),o(!1)}},ee=async(m,x)=>{var f,g,U,Q,W,re,xe,h,T;x(`Fetching details for folder ID: ${m}`);try{const D=await ce();if(!D)return x("No token available for fetching folder details"),null;x("Sending GraphQL query to fetch folder details");const I=await(await fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${D}`},body:JSON.stringify({query:Ps,variables:{folderIds:[m],fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(x("Folder details API response:",I),I.errors)return console.error("GraphQL errors:",I.errors),x(`GraphQL errors: ${JSON.stringify(I.errors)}`),null;const j=((g=(f=I==null?void 0:I.data)==null?void 0:f.fetchFolders)==null?void 0:g.items)||[];if(x(`Found ${j.length} folder items`),j.length===0)return x("No folder items found"),null;const C=j[0];x("Retrieved folder data:",C);const N=((Q=(U=C.folderPosition)==null?void 0:U.profileIds)==null?void 0:Q.some(Z=>Z.includes("Public____Profile")))||!1;x(`Folder is on public profile: ${N}`),x("Profile IDs:",(W=C.folderPosition)==null?void 0:W.profileIds);const z=(re=C.folderInviteParameters)==null?void 0:re.usingFolderInviteGrantsRightToAddItems;x(`Participants can add items: ${z}`);const K=(xe=C.folderInviteParameters)==null?void 0:xe.usingFolderInviteGrantsRightToRemoveItems;return x(`Participants can delete items: ${K}`),{creatorId:C.creatorId||"",folderName:C.folderName||"",folderDescription:C.folderDescription||"",passwordPolicy:((h=C.folderPassword)==null?void 0:h.policy)||"NoPassword",password:((T=C.folderPassword)==null?void 0:T.password)||"",isOnPublicProfile:N,participantsCanAddItems:z!==void 0?z:!0,participantsCanDeleteItems:K!==void 0?K:!1}}catch(D){return console.error("Error in fetchFolderDetails:",D),x(`Error in fetchFolderDetails: ${D}`),null}},X=()=>{a("Attempting to restore photos from localStorage");try{const m=localStorage.getItem(me.SELECTED_PHOTOS);if(a(`Found stored photos: ${m?"yes":"no"}`),m)try{const x=JSON.parse(m);a(`Parsed ${x.length} photos from localStorage`),Array.isArray(x)&&x.length>0&&(n(x),a(`Restored ${x.length} photos to state`))}catch(x){console.error("Error parsing stored photos:",x),a(`Error parsing stored photos: ${x}`)}}catch(m){console.error("Error restoring photos from storage:",m),a(`Error restoring photos from storage: ${m}`)}},le=()=>{a("Testing S3 connection");try{Pt?a("S3 client is available"):(console.error("S3 client not available"),a("S3 client not available"))}catch(m){console.error("S3 connection test error:",m),a(`S3 connection test error: ${m}`)}},ae=async()=>{var m;a("Starting component initialization");try{a("Checking login with refresh");const x=await ce();if(!x){a("No token returned from login check, aborting initialization");return}try{const f=localStorage.getItem(me.PUBLIC_USERNAME);a(`Retrieved public username from localStorage: ${f||"null"}`),s(f||null);const U=JSON.parse(atob(x.split(".")[1]))["cognito:username"];if(U){a(`Extracted Cognito username from token: ${U}`),E(U);const Q=localStorage.getItem(me.SUB_ALBUM_DATA);if(a(`Sub-album data from localStorage: ${Q||"null"}`),Q)try{const W=JSON.parse(Q);if(a("Parsed sub-album data:",W),W.isSubAlbum&&((m=W.selectedFileIds)==null?void 0:m.length)>0){a(`Valid sub-album data found with ${W.selectedFileIds.length} files`),_(!0),$(W.selectedFileIds),W.selectedPhotos&&W.selectedPhotos.length>0&&(a(`Found ${W.selectedPhotos.length} selected photos in sub-album data`),n(W.selectedPhotos)),S(!0),o(!0);const re=`${U}_____${Ne()}____Folder`;a(`Generated new folder ID for sub-album: ${re}`),e(re)}else a("Invalid sub-album data, proceeding with normal initialization"),await se(U)}catch(W){console.error("Error parsing sub-album data:",W),a(`Error parsing sub-album data: ${W}`),await se(U)}else a("No sub-album data found, proceeding with normal folder initialization"),await se(U)}else a("No Cognito username found in token")}catch(f){console.error("User data initialization error:",f),a(`User data initialization error: ${f}`)}X(),le(),a("Component initialization completed")}catch(x){console.error("Initialization error:",x),a(`Initialization error: ${x}`)}};return b.useEffect(()=>{ae()},[]),{cognitoUsername:q,publicUsername:J,setPublicUsername:s}},Cs=(e,n,o,S,c,k,w,p,u,P,_,$,M,a,q,E,J,s)=>{const se=h=>(s(`Converting ${h.length} tags to API format`),h.map(T=>({TagType:T.TagType,tagTitle:T.tagTitle,selectedSubtagInputs:T.subtags.map(D=>({TagType:T.TagType,tagTitle:D.tagTitle,subtagTitle:D.subtagTitle}))}))),ee=h=>{s(`Save progress text: ${h}`);const T=document.getElementById("saveProgressText");T&&(T.innerText=h)},X=h=>{const T=document.getElementById("saveProgress");T?(T.style.width=`${h}%`,s(`Updated save progress bar: ${h}%`)):s("Progress bar element not found"),q(h)},le=(h,T)=>{s(`Splitting array of ${h.length} items into chunks of ${T}`);const D=[];for(let v=0;v<h.length;v+=T)D.push(h.slice(v,v+T));return s(`Created ${D.length} chunks`),D},ae=h=>{const T=new Set;return h.filter(D=>T.has(D.fileId)?(s(`Skipping duplicate file reference with ID: ${D.fileId}`),!1):(T.add(D.fileId),!0))},m=(h,T,D)=>{s("Creating folder position input WITHOUT folder-level tags"),s(`Profile visibility: ${p?"Public":"Only Me"}`);const v=p?[`${n}_____Public____Profile`]:["Only Me_____Only Me____Profile"];s(`Profile IDs: ${JSON.stringify(v)}`);let I=[];S&&c.length>0&&(s(`Creating file reference IDs for ${c.length} sub-album files`),I=c.map(z=>{const K=z.split("_____");if(K.length>=2){const ie=K[1].split("____")[0],ue=`${D}_____${ie}____FileReference`;return s(`Created file reference ID for sub-album: ${ue}`),ue}return s(`Using original fileId as fallback: ${z}`),z})),s(`Created ${I.length} acceptedFileReferenceIds`);const j=_!=="NoPassword"?$:null;if(s(`Password protection: ${_}`),s(`Album password: ${j?"******":"null"}`),s(`Participants can add items: ${u}`),s(`Participants can delete items: ${P}`),!e)throw s("Error: folderId is null or undefined"),new Error("folderId is required to create folder position input");const C=Ct(e),N=kt(C);return{currentTime:h,folderId:e,profileIds:v,folderPositionPoints:1,acceptedFileReferenceIds:I,folderInput:{folderAboutContactIds:[T],albumNanoId:N,folderName:k,folderDescription:w,folderPasswordInput:{password:j,policy:_},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:u,usingFolderInviteGrantsRightToRemoveItems:P,addedItemsNeedFolderCreatorApproval:!1}}}},x=(h,T,D)=>(s(`Creating file reference inputs with individual photo tags for ${h.length} photos`),h.map((v,I)=>{var K;const j=M.get(I)||[],C=se(j);if(s(`Photo ${I} (${v.fileName}): ${j.length} tags applied`),v.fileId)return s(`Using existing fileId for photo: ${v.fileId}`),{fileReferencesHolderId:e,currentTime:T,points:1,hasBeenDeleted:!1,selectedTagInputs:C,fileId:v.fileId,fileInput:null};const N=v.type==="video"||(K=v.type)!=null&&K.startsWith("video")?`Input/Video/${v.fileName}`:`Input/Image/${v.fileName}`,z=`${n}_____${v.fileName}____File`;return s(`Created file reference for ${v.fileName}:`),s(`  - dataKey: ${N}`),s(`  - fileId: ${z}`),s(`  - thumbnailDataKey: ${v.thumbnailDataKey||"undefined"}`),s(`  - size: ${v.size}`),s(`  - thumbnailSize: ${v.thumbnailSize||0}`),s(`  - duration: ${v.duration||"undefined"}`),s(`  - tags: ${j.length} tags selected for this photo`),{fileReferencesHolderId:e,currentTime:T,points:1,hasBeenDeleted:!1,selectedTagInputs:C,fileId:z,fileInput:{fileId:z,ownerFileInput:{editorContactIds:[D],FileSharingOptionsEnum:"Anyone",dataKey:N,thumbnailDataKey:v.thumbnailDataKey,dataInBytes:v.size,thumbnailDataInBytes:v.thumbnailSize||0,s3UploadedAt:T,durationInSeconds:v.duration},editorFileInput:{aboutContactIds:[D],captionText:"",numericFilterInputs:[]}}}})),f=async h=>{var I,j;s("Sending folder-only mutation (no file references, no folder tags)");const T=await ce();if(!T)throw s("No token available for saving album, aborting"),new Error("Authentication token not available");const D=`
      mutation MyMutation($folderPositionInputs: [FolderPositionInput!]) {
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items {
            id
          }
        }
      }
    `,v={folderPositionInputs:[h]};s("GraphQL folder-only mutation variables:",v);try{s("Sending API request to save folder");const C=await fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${T}`},body:JSON.stringify({query:D,variables:v})});s(`API response status: ${C.status}`);const N=await C.text();s(`API response raw text: ${N}`);const z=JSON.parse(N);if(s("API response JSON:",z),z.errors)throw console.error("Folder save failed:",z.errors),s("Folder save failed with errors:",z.errors),new Error("Failed to save folder");return s("Folder saved successfully"),((j=(I=z.data)==null?void 0:I.changeFiles)==null?void 0:j.items)||[]}catch(C){throw console.error("Error in sendFolderOnlyMutation:",C),s(`Error in sendFolderOnlyMutation: ${C}`),C}},g=async h=>{var I,j,C,N,z;s(`Sending file references-only mutation with ${h.length} items (each with individual tags)`);const T=await ce();if(!T)throw s("No token available for saving file references, aborting"),new Error("Authentication token not available");const D=`
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
    `,v={updatedFileReferenceInputs:h};s("GraphQL file references-only mutation variables (first item):",h.length>0?h[0]:"No items");try{s("Sending API request to save file references with individual tags");const K=await fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${T}`},body:JSON.stringify({query:D,variables:v})});s(`API response status: ${K.status}`);const Z=await K.text();s(`API response raw text: ${Z.substring(0,500)}...`);const ie=JSON.parse(Z);if(s("API response JSON items count:",((C=(j=(I=ie.data)==null?void 0:I.changeFiles0)==null?void 0:j.items)==null?void 0:C.length)||0),ie.errors)throw console.error("File references save failed:",ie.errors),s("File references save failed with errors:",ie.errors),new Error("Failed to save file references");return s("File references chunk saved successfully with individual photo tags"),((z=(N=ie.data)==null?void 0:N.changeFiles0)==null?void 0:z.items)||[]}catch(K){throw console.error("Error in sendFileReferencesOnlyMutation:",K),s(`Error in sendFileReferencesOnlyMutation: ${K}`),K}},U=async(h,T)=>{var j,C,N,z,K,Z,ie,ue,pe;s(`Sending final chunk with folder mutation (${h.length} file references, no folder tags)`);const D=await ce();if(!D)throw s("No token available for saving final chunk, aborting"),new Error("Authentication token not available");const v=`
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
    `,I={folderPositionInputs:[T],updatedFileReferenceInputs:h};s("GraphQL final mutation variables (folder + last chunk, no folder tags)");try{s("Sending API request for final save with folder (no folder tags)");const fe=await fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${D}`},body:JSON.stringify({query:v,variables:I})});s(`API response status: ${fe.status}`);const i=await fe.text();s(`API response raw text: ${i.substring(0,500)}...`);const d=JSON.parse(i);if(s("API response JSON:",{fileReferencesCount:((N=(C=(j=d.data)==null?void 0:j.changeFiles0)==null?void 0:C.items)==null?void 0:N.length)||0,folderItems:((K=(z=d.data)==null?void 0:z.changeFiles)==null?void 0:K.items)||[]}),d.errors)throw console.error("Final save failed:",d.errors),s("Final save failed with errors:",d.errors),new Error("Failed to complete album save");return s("Final chunk and folder saved successfully (with individual photo tags)"),{fileReferences:((ie=(Z=d.data)==null?void 0:Z.changeFiles0)==null?void 0:ie.items)||[],folderPositions:((pe=(ue=d.data)==null?void 0:ue.changeFiles)==null?void 0:pe.items)||[]}}catch(fe){throw console.error("Error in sendFinalChunkWithFolderMutation:",fe),s(`Error in sendFinalChunkWithFolderMutation: ${fe}`),fe}},Q=async()=>(s("Validating required data"),await ce()?n?e?(s("All required data validated successfully"),!0):(s("No folder ID, validation failed"),!1):(s("No Cognito username, validation failed"),!1):(s("No token available, validation failed"),!1)),W=()=>{s("Handling successful save"),Dt(E,J,[me.SELECTED_PHOTOS,me.SUB_ALBUM_DATA],s),s("Album data cleared");const h=document.getElementById("saveProgressText");h&&(h.innerText="Album saved successfully!",s("Updated progress text to 'Album saved successfully!'")),sessionStorage.setItem("album_just_saved","true"),s("Set 'album_just_saved' flag in sessionStorage"),s("Setting timeout for redirect to my-albums.html"),setTimeout(()=>{s("Redirecting to my-albums.html"),Ft("my-albums.html")},1e3)},re=async(h,T)=>{s("Starting chunked save process (individual photo tags, no folder tags)");try{ee("Processing files in chunks...");const D=48;if(T.length===0)s("No file references to process, saving only folder position (no folder tags)"),await f(h);else{const v=ae(T);s(`After removing duplicates, processing ${v.length} unique file references`);const I=le(v,D);s(`Split file references into ${I.length} chunks of max size ${D}`);for(let j=0;j<I.length;j++){const C=I[j];s(`Processing chunk ${j+1} of ${I.length} with ${C.length} file references`);const N=j/I.length*80;q(10+N),X(10+N),j<I.length-1?(ee(`Saving files: chunk ${j+1} of ${I.length}...`),await g(C)):(ee("Finalizing album..."),await U(C,h))}}q(100),X(100),ee("Album saved successfully!"),W()}catch(D){console.error("Error in chunked save process:",D),s(`Error in chunked save process: ${D}`),ee(`Error: ${D}`),a(!1)}};return{saveAlbumDirectly:async()=>{s("Starting direct album save with individual photo tagging"),s(`Photo tags map: ${M.size} photos have tags applied`),a(!0),q(5);try{if(s("Validating required data for save"),!await Q()){s("Required data validation failed, aborting save"),a(!1);return}const h=Math.floor(Date.now()/1e3),T=`${n}_____${n}____Account`,v=e.split("_____")[1].split("____")[0];s(`Save timestamp: ${h}`),s(`Account ID: ${T}`),s(`Folder ID: ${e}`),s(`Folder target item identifier: ${v}`),s("Creating folder position input (no folder tags)");const I=m(h,T,v);s("Folder position input created:",I);let j=[];const C=o.filter(N=>N.status==="complete");if(s(`Found ${C.length} valid photos with 'complete' status`),C.length>0){const N=C.filter(K=>!K.fileId);s(`Found ${N.length} new uploads to move from temp to public folder`),N.length>0&&(s("Moving files from temp to public folder"),await jt(N,X,s)),s("Creating file reference inputs for uploads with individual photo tags");const z=x(C,h,T);s(`Created ${z.length} file reference inputs for uploads`,z),j=j.concat(z)}if(S&&c.length>0){s(`Adding ${c.length} existing file references for sub-album`);const N=c.map(z=>(s(`Creating file reference for existing file ID: ${z}`),{fileReferencesHolderId:e,currentTime:h,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:z,fileInput:null}));s(`Created ${N.length} file reference inputs for existing files`,N),j=j.concat(N)}s(`Total file reference inputs: ${j.length}`),s("Sending GraphQL mutations with chunked file references (individual photo tags)"),await re(I,j)}catch(h){console.error("Error in saveAlbumDirectly:",h),s(`Error in saveAlbumDirectly: ${h}`),a(!1)}}}},ks=({selectedPhotos:e,selectedPhotoIndices:n,isSavingAlbum:o,onRemovePhoto:S,onTogglePhotoSelection:c,onSelectAllPhotos:k,onDeselectAllPhotos:w,hideHeader:p=!1})=>{const{t:u}=ke();if(e.length===0)return null;const P=n.size>0,_=n.size===e.length;return t.jsxs(t.Fragment,{children:[!p&&e.length>1&&t.jsx(Ce,{style:{marginBottom:"16px",border:"2px solid #007bff"},children:t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px"},children:[t.jsx("span",{style:{fontWeight:"bold",fontSize:"14px",color:"#007bff"},children:P?u("{{count}} file(s) selected for tagging",{count:n.size}):u("Click files below to select them for tagging")}),t.jsxs("div",{style:{display:"flex",gap:"8px",marginLeft:"auto"},children:[!_&&t.jsx("button",{onClick:k,disabled:o,style:{padding:"6px 12px",border:"1px solid #007bff",borderRadius:"4px",background:"#007bff",color:"white",fontSize:"12px",cursor:"pointer",fontWeight:"bold"},children:u("Select All")}),P&&t.jsx("button",{onClick:w,disabled:o,style:{padding:"6px 12px",border:"1px solid #6c757d",borderRadius:"4px",background:"transparent",color:"#6c757d",fontSize:"12px",cursor:"pointer"},children:u("Deselect All")})]})]})}),t.jsx(Bt,{children:e.map(($,M)=>{var q,E;const a=n.has(M);return t.jsxs(Ut,{"data-selected":a?"true":"false",style:{position:"relative",cursor:e.length>1?"pointer":"default"},onClick:()=>e.length>1&&c(M),children:[a&&!o&&t.jsx("button",{onClick:J=>{J.stopPropagation(),confirm(u("Are you sure you want to remove this photo?"))&&S(M)},style:{position:"absolute",top:"6px",right:"6px",width:"18px",height:"18px",borderRadius:"50%",border:"none",backgroundColor:"rgba(220, 53, 69, 0.8)",color:"white",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:"bold",zIndex:15,opacity:1,transition:"all 0.2s ease",transform:"scale(0.8)"},onMouseEnter:J=>{J.currentTarget.style.backgroundColor="rgba(200, 35, 51, 0.9)",J.currentTarget.style.transform="scale(1)",J.currentTarget.style.opacity="1"},onMouseLeave:J=>{J.currentTarget.style.backgroundColor="rgba(220, 53, 69, 0.8)",J.currentTarget.style.transform="scale(0.8)",J.currentTarget.style.opacity="0"},title:u("Remove photo"),children:"×"}),e.length>1&&a&&t.jsx("div",{style:{position:"absolute",bottom:"8px",left:"8px",right:"8px",background:"rgba(0, 123, 255, 0.9)",color:"white",padding:"4px 8px",borderRadius:"6px",fontSize:"11px",fontWeight:"600",textAlign:"center",zIndex:10,backdropFilter:"blur(4px)"},children:"SELECTED"}),$.status!=="complete"&&t.jsx(Wt,{$status:$.status,children:$.status==="error"?"✕":$.status==="uploading"?"↑":$.status==="processing"?"⚙️":"•"}),t.jsxs(Kt,{style:{opacity:e.length===1||!a?1:.85,transition:"opacity 0.2s ease"},children:[$.type==="video"||(q=$.type)!=null&&q.startsWith("video")?t.jsx(Gt,{src:$.s3PreviewUrl,controls:!0}):t.jsx(qt,{src:$.s3PreviewUrl,alt:$.fileName}),($.status==="uploading"||$.status==="processing")&&t.jsx(Ge,{$bottom:"4px",$left:"4px",$right:"4px",$height:"4px",children:t.jsx(qe,{$progress:$.progress,$status:$.status})})]}),t.jsxs(Ht,{children:[(E=$.type)!=null&&E.startsWith("video")?u("Video"):u("Image"),$.size&&` • ${($.size/1024/1024).toFixed(1)} MB`,$.duration&&` • ${$.duration}s`]}),$.status==="error"&&$.errorMessage&&t.jsxs(Jt,{$type:"error",children:[u("Error"),": ",$.errorMessage.length>40?$.errorMessage.substring(0,37)+"...":$.errorMessage]})]},M)})}),t.jsx("style",{children:`
          [data-selected="true"]:hover button {
            opacity: 1 !important;
            transform: scale(1) !important;
          }
        `})]})},Ds=({isSavingAlbum:e,savingProgress:n})=>{const{t:o}=ke();return e?t.jsxs(Ce,{children:[t.jsx(Ot,{children:o("Saving Album")}),t.jsx(Mt,{id:"saveProgressText",children:o("Moving files...")}),t.jsx(Ge,{children:t.jsx(qe,{id:"saveProgress",$progress:n/100})})]}):null},Fs=({showFolderDetails:e,isCreator:n,folderName:o,setFolderName:S,folderDescription:c,setFolderDescription:k,isSavingAlbum:w})=>{const{t:p}=ke();return!e||n!==!0?null:t.jsxs(Ce,{children:[t.jsxs(Re,{children:[t.jsx(ze,{htmlFor:"folderName",children:p("Album Name")}),t.jsx(Rt,{id:"folderName",type:"text",value:o,onChange:u=>S(u.target.value),placeholder:p("e.g. Family Vacation in Kyoto"),disabled:w})]}),t.jsxs(Re,{children:[t.jsx(ze,{htmlFor:"folderDescription",children:p("Album Description")}),t.jsx(zt,{id:"folderDescription",value:c,onChange:u=>k(u.target.value),placeholder:p("e.g. what's special about this album"),rows:4,disabled:w})]})]})},ke=()=>({t:(e,n)=>n&&typeof n=="object"&&"count"in n?e.replace("{{count}}",String(n.count)):e,language:"en"}),_s=`
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
`,Es=`
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
`,Ns=`
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
`,Rs=`
  mutation DeleteTag($tagId: String!) {
    deleteTag(tagId: $tagId) {
      id
      hasBeenDeleted
    }
  }
`,zs=`
  mutation DeleteSubtag($subtagId: String!) {
    deleteSubtag(subtagId: $subtagId) {
      id
      hasBeenDeleted
    }
  }
`,Os=e=>{const[n,o]=b.useState([]),[S,c]=b.useState([]),[k,w]=b.useState(null),[p,u]=b.useState(!1),[P,_]=b.useState(null),[$,M]=b.useState(null),[a,q]=b.useState(!1),[E,J]=b.useState(!1),[s,se]=b.useState(""),[ee,X]=b.useState(""),[le,ae]=b.useState(!1),[m,x]=b.useState(!1),f=async()=>{var i,d;e("Fetching tags from API"),u(!0);try{const F=await ce();if(!F){e("No token available for fetching tags");return}const V=await(await fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${F}`},body:JSON.stringify({query:_s,variables:{fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(e("Tags API response:",V),V.errors){console.error("GraphQL errors:",V.errors),e(`GraphQL errors: ${JSON.stringify(V.errors)}`);return}const L=(((d=(i=V==null?void 0:V.data)==null?void 0:i.fetchRelations)==null?void 0:d.items)||[]).map(H=>{var te,he;return{id:H.id,tagTitle:H.tagTitle,TagType:H.TagType,points:H.points,createdAt:H.createdAt,updatedAt:H.updatedAt,subtags:((he=(te=H.subtags)==null?void 0:te.items)==null?void 0:he.map(ge=>({id:ge.id,tagTitle:ge.tagTitle,subtagTitle:ge.subtagTitle,TagType:ge.TagType,points:ge.points,createdAt:ge.createdAt,updatedAt:ge.updatedAt})))||[]}});e(`Fetched ${L.length} tags`),o(L)}catch(F){console.error("Error fetching tags:",F),e(`Error fetching tags: ${F}`)}finally{u(!1)}},g=i=>{if(e(`Selecting tag for photo application: ${i.tagTitle}`),!S.find(F=>F.tagTitle===i.tagTitle)){const F={tagTitle:i.tagTitle,TagType:i.TagType,subtags:[]};c(ne=>[...ne,F]),e(`Tag ${i.tagTitle} added to selection for photo application`)}},U=i=>{e(`Unselecting tag from photo application: ${i.tagTitle}`),c(d=>d.filter(F=>F.tagTitle!==i.tagTitle)),k===i.id&&w(null)},Q=i=>{e(`Selecting subtag for photo application: ${i.subtagTitle} for tag: ${i.tagTitle}`),c(d=>d.map(F=>F.tagTitle===i.tagTitle&&!F.subtags.find(V=>V.subtagTitle===i.subtagTitle)?{...F,subtags:[...F.subtags,{TagType:i.TagType,tagTitle:i.tagTitle,subtagTitle:i.subtagTitle}]}:F))},W=i=>{e(`Unselecting subtag from photo application: ${i.subtagTitle} for tag: ${i.tagTitle}`),c(d=>d.map(F=>F.tagTitle===i.tagTitle?{...F,subtags:F.subtags.filter(ne=>ne.subtagTitle!==i.subtagTitle)}:F))},re=i=>{e(`Setting displayed tag: ${i}`),w(i)},xe=i=>S.some(d=>d.tagTitle===i.tagTitle),h=i=>{const d=S.find(F=>F.tagTitle===i.tagTitle);return(d==null?void 0:d.subtags.some(F=>F.subtagTitle===i.subtagTitle))||!1},T=()=>{if(!k)return[];const i=n.find(d=>d.id===k);return(i==null?void 0:i.subtags)||[]},D=()=>{e("Clearing all selected tags"),c([]),w(null)},v=()=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(i){const d=Math.random()*16|0;return(i=="x"?d:d&3|8).toString(16)}),I=async(i,d)=>{if(e(`Adding new tag: ${i} of type: ${d}`),!i.trim())return e("Cannot add tag with empty title"),!1;ae(!0);try{if(!await ce())return e("No token available for adding tag"),!1;if(await(async()=>(e("PLACEHOLDER: Would send GraphQL mutation to add tag",{mutation:Es,variables:{tagInput:{tagTitle:i.trim(),TagType:d,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(Y=>setTimeout(Y,500)),!0))()){const Y={id:v(),tagTitle:i.trim(),TagType:d,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3),subtags:[]};return o(L=>[Y,...L]),g(Y),re(Y.id),se(""),q(!1),e(`Successfully added new tag for photo application: ${i}`),!0}return!1}catch(F){return console.error("Error adding new tag:",F),e(`Error adding new tag: ${F}`),!1}finally{ae(!1)}},j=async(i,d,F)=>{if(e(`Adding new subtag: ${d} to tag: ${i}`),!d.trim())return e("Cannot add subtag with empty title"),!1;if(!k)return e("No displayed tag for adding subtag"),!1;x(!0);try{if(!await ce())return e("No token available for adding subtag"),!1;if(await(async()=>(e("PLACEHOLDER: Would send GraphQL mutation to add subtag",{mutation:Ns,variables:{subtagInput:{tagTitle:i,subtagTitle:d.trim(),TagType:F,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(L=>setTimeout(L,500)),!0))()){const L={id:v(),tagTitle:i,subtagTitle:d.trim(),TagType:F,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3)};return o(H=>H.map(te=>te.id===k?{...te,subtags:[L,...te.subtags||[]]}:te)),Q(L),X(""),J(!1),e(`Successfully added new subtag for photo application: ${d}`),!0}return!1}catch(ne){return console.error("Error adding new subtag:",ne),e(`Error adding new subtag: ${ne}`),!1}finally{x(!1)}},C=async i=>{e(`Deleting tag: ${i}`),_(i);try{if(!await ce())return e("No token available for deleting tag"),!1;if(await(async()=>(e("PLACEHOLDER: Would send GraphQL mutation to delete tag",{mutation:Rs,variables:{tagId:i}}),await new Promise(V=>setTimeout(V,500)),!0))()){o(Y=>Y.filter(L=>L.id!==i));const V=n.find(Y=>Y.id===i);return V&&U(V),k===i&&re(null),e(`Successfully deleted tag: ${i}`),!0}return!1}catch(d){return console.error("Error deleting tag:",d),e(`Error deleting tag: ${d}`),!1}finally{_(null)}},N=async i=>{e(`Deleting subtag: ${i}`),M(i);try{if(!await ce())return e("No token available for deleting subtag"),!1;if(await(async()=>(e("PLACEHOLDER: Would send GraphQL mutation to delete subtag",{mutation:zs,variables:{subtagId:i}}),await new Promise(V=>setTimeout(V,500)),!0))()){let V=null;return o(Y=>Y.map(L=>{var te;const H=((te=L.subtags)==null?void 0:te.filter(he=>he.id===i?(V=he,!1):!0))||[];return{...L,subtags:H}})),V&&W(V),e(`Successfully deleted subtag: ${i}`),!0}return!1}catch(d){return console.error("Error deleting subtag:",d),e(`Error deleting subtag: ${d}`),!1}finally{M(null)}},z=async(i,d)=>(e(`Placeholder: Updating tag points: ${i} to ${d}`),!1),K=()=>{q(!0),se("")},Z=()=>{q(!1),se("")},ie=()=>{J(!0),X("")},ue=()=>{J(!1),X("")},pe=async()=>s.trim()?await I(s,"File"):!1,fe=async()=>{if(ee.trim()&&k){const i=n.find(d=>d.id===k);if(i)return await j(i.tagTitle,ee,i.TagType)}return!1};return b.useEffect(()=>{f()},[]),{tags:n,selectedTags:S,displayedTagId:k,isLoadingTags:p,tagIdBeingDeleted:P,subtagIdBeingDeleted:$,isAddingNewTag:a,isAddingNewSubtag:E,newTagTitle:s,newSubtagTitle:ee,isSubmittingNewTag:le,isSubmittingNewSubtag:m,fetchTags:f,selectTag:g,unselectTag:U,selectSubtag:Q,unselectSubtag:W,setDisplayedTag:re,clearSelectedTags:D,isTagSelected:xe,isSubtagSelected:h,getDisplayedTagSubtags:T,setTagIdBeingDeleted:_,setSubtagIdBeingDeleted:M,addNewTag:I,addNewSubtag:j,deleteTag:C,deleteSubtag:N,updateTagPoints:z,startAddingNewTag:K,cancelAddingNewTag:Z,startAddingNewSubtag:ie,cancelAddingNewSubtag:ue,submitNewTag:pe,submitNewSubtag:fe,setNewTagTitle:se,setNewSubtagTitle:X}},Ms=B.div`
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
`,Bs=B(Ve)`
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
`,Us=B.div`
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
`,Ws=B.div`
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
`,Ks=B.input`
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
`,Gs=B.span`
  background: #6c757d;
  color: white;
  padding: 3px 8px; /* Increased padding */
  border-radius: 12px; /* More rounded */
  font-size: 10px;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Soft shadow */
`,qs=({tag:e,isSelected:n,isDisplayed:o,isBeingDeleted:S,disabled:c,onTagClick:k,onDeleteTag:w,getTagDisplayText:p})=>{const[u,P]=b.useState(!1);return t.jsxs(Ve,{$isSelected:n,$isDisplayed:o,$isBeingDeleted:S,disabled:c,onClick:()=>k(e),onMouseEnter:()=>P(!0),onMouseLeave:()=>P(!1),children:[p(e),u&&!c&&!S&&t.jsx(Ye,{onClick:_=>{_.stopPropagation(),w(e.id)},disabled:S,children:"×"})]})},Hs=({subtag:e,isSelected:n,isBeingDeleted:o,disabled:S,onSubtagClick:c,onDeleteSubtag:k})=>{const[w,p]=b.useState(!1);return t.jsxs(Bs,{$isSelected:n,$isBeingDeleted:o,disabled:S,onClick:()=>c(e),onMouseEnter:()=>p(!0),onMouseLeave:()=>p(!1),children:[e.subtagTitle,w&&!S&&!o&&t.jsx(Ye,{onClick:u=>{u.stopPropagation(),k(e.id)},disabled:o,children:"×"})]})},Le=({value:e,onChange:n,onSubmit:o,onCancel:S,isSubmitting:c,placeholder:k="Enter tag name..."})=>{const w=b.useRef(null);b.useEffect(()=>{w.current&&w.current.focus()},[]);const p=u=>{u.key==="Enter"?o():u.key==="Escape"&&S()};return t.jsxs(Ws,{children:[t.jsx(Ks,{ref:w,type:"text",value:e,onChange:u=>n(u.target.value),onKeyDown:p,placeholder:k,disabled:c}),t.jsx(We,{onClick:o,disabled:!e.trim()||c,title:"Add (Enter)",children:c?"...":"✓"}),t.jsx(We,{onClick:S,disabled:c,title:"Cancel (Escape)",children:"×"})]})},Js=({tagsManager:e,disabled:n=!1,enhancedLog:o})=>{const{tags:S,selectedTags:c,displayedTagId:k,isLoadingTags:w,tagIdBeingDeleted:p,isAddingNewTag:u,newTagTitle:P,isSubmittingNewTag:_,selectTag:$,unselectTag:M,setDisplayedTag:a,isTagSelected:q,deleteTag:E,startAddingNewTag:J,cancelAddingNewTag:s,submitNewTag:se,setNewTagTitle:ee}=e,X=f=>{if(n)return;const g=q(f),U=k===f.id;g?g&&!U?(a(f.id),o(`Displayed tag: ${f.tagTitle}`)):g&&U&&(M(f),a(null),o(`Unselected tag: ${f.tagTitle}`)):($(f),a(f.id),o(`Selected tag for photo application: ${f.tagTitle}`))},le=async f=>{if(n)return;o(`Delete tag initiated: ${f}`);const g=await E(f);o(g?`Tag successfully deleted: ${f}`:`Failed to delete tag: ${f}`)},ae=async()=>{await se()||o("Failed to submit new tag")},m=f=>{const g=c.find(Q=>Q.tagTitle===f.tagTitle);if(!g||g.subtags.length===0)return f.tagTitle;const U=g.subtags.map(Q=>Q.subtagTitle).join(" || ");return`${f.tagTitle}  |  ${U}`},x=[...S].sort((f,g)=>f.points!==g.points?g.points-f.points:g.updatedAt-f.updatedAt);return t.jsxs(Ms,{children:[t.jsxs(He,{children:[t.jsxs(Je,{children:["Tag the selected photos",c.length>0&&t.jsxs(Gs,{children:[c.length," selected"]})]}),t.jsx(Qe,{children:w?t.jsx(Us,{children:"Loading tags..."}):t.jsxs(t.Fragment,{children:[x.map(f=>t.jsx(qs,{tag:f,isSelected:q(f),isDisplayed:k===f.id,isBeingDeleted:p===f.id,disabled:n,onTagClick:X,onDeleteTag:le,getTagDisplayText:m},f.id)),u?t.jsx(Le,{value:P,onChange:ee,onSubmit:ae,onCancel:s,isSubmitting:_,placeholder:"Enter tag name..."}):t.jsx(Ze,{disabled:n,onClick:J,children:"+ Add Tag"}),x.length===0&&!u&&t.jsx(Xe,{children:"No tags available"})]})})]}),k&&t.jsx(Qs,{tagsManager:e,disabled:n,enhancedLog:o}),c.length>0&&t.jsxs("div",{style:{marginTop:"24px",padding:"20px 24px",background:"linear-gradient(135deg, #e7f3ff 0%, #f0f8ff 100%)",borderRadius:"12px",fontSize:"13px",color:"#0c5aa6",border:"1px solid #b3d9ff",boxShadow:"0 4px 12px rgba(0, 123, 255, 0.08)"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"12px"},children:[t.jsx("span",{style:{fontSize:"16px"},children:"✅"}),t.jsx("strong",{style:{fontSize:"14px"},children:"Tags Applied:"})]}),t.jsxs("div",{style:{lineHeight:"1.5"},children:["All selected files will have ",t.jsxs("strong",{children:[c.length," tag",c.length!==1?"s":""]})," applied to them when you save the album.",t.jsx("br",{}),t.jsx("strong",{children:"Selected tags:"})," ",c.map(f=>{const g=f.subtags.map(U=>U.subtagTitle);return g.length>0?`${f.tagTitle} (${g.join(", ")})`:f.tagTitle}).join(", ")]})]})]})},Qs=({tagsManager:e,disabled:n=!1,enhancedLog:o})=>{var ae;const{displayedTagId:S,subtagIdBeingDeleted:c,isAddingNewSubtag:k,newSubtagTitle:w,isSubmittingNewSubtag:p,selectSubtag:u,unselectSubtag:P,isSubtagSelected:_,deleteSubtag:$,startAddingNewSubtag:M,cancelAddingNewSubtag:a,submitNewSubtag:q,setNewSubtagTitle:E}=e,J=S?((ae=e.tags.find(m=>m.id===S))==null?void 0:ae.subtags)||[]:[],s=e.tags.find(m=>m.id===S),se=m=>{if(n)return;_(m)?(P(m),o(`Unselected subtag for photo application: ${m.subtagTitle}`)):(u(m),o(`Selected subtag for photo application: ${m.subtagTitle}`))},ee=async m=>{if(n)return;o(`Delete subtag initiated: ${m}`);const x=await $(m);o(x?`Subtag successfully deleted: ${m}`:`Failed to delete subtag: ${m}`)},X=async()=>{await q()||o("Failed to submit new subtag")};if(!s)return null;const le=[...J].sort((m,x)=>m.points!==x.points?x.points-m.points:x.updatedAt-m.updatedAt);return t.jsxs(He,{children:[t.jsxs(Je,{children:['Subtags for "',s.tagTitle,'"']}),t.jsxs(Qe,{children:[le.map(m=>t.jsx(Hs,{subtag:m,isSelected:_(m),isBeingDeleted:c===m.id,disabled:n,onSubtagClick:se,onDeleteSubtag:ee},m.id)),k?t.jsx(Le,{value:w,onChange:E,onSubmit:X,onCancel:a,isSubmitting:p,placeholder:"Enter subtag name..."}):t.jsx(Ze,{disabled:n,onClick:M,children:"+ Add Subtag"}),le.length===0&&!k&&t.jsx(Xe,{children:"No subtags available"})]})]})},Vs=({children:e,t:n,isRTL:o})=>t.jsxs("div",{style:{padding:"32px",marginBottom:"32px",backgroundColor:"#f8f9fa",border:"2px solid #e9ecef",borderRadius:"12px",direction:o?"rtl":"ltr"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",fontSize:"18px",color:"#495057",fontWeight:"600",marginBottom:"24px",flexDirection:o?"row-reverse":"row"},children:[t.jsx("span",{style:{marginRight:o?"0":"12px",marginLeft:o?"12px":"0",fontSize:"20px"},children:"🏷️"}),n("Click files below to select them for tagging")]}),e]}),Ys=({selectedPhotos:e,selectedPhotoIndices:n,onToggleSelection:o,onSelectAll:S,onDeselectAll:c,onRemovePhoto:k,onDeleteAll:w,disabled:p,t:u,isRTL:P})=>e.length===0?null:t.jsxs("div",{style:{marginBottom:"32px",direction:P?"rtl":"ltr"},children:[t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px",flexDirection:P?"row-reverse":"row"},children:[t.jsxs("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:[u("New Files")," (",e.length,")"]}),t.jsxs("div",{style:{display:"flex",gap:"8px",flexDirection:P?"row-reverse":"row"},children:[t.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:p?"#f8f9fa":"#fff",color:p?"#999":"#333",cursor:p?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:n.size===e.length?c:S,disabled:p,onMouseEnter:_=>{p||(_.currentTarget.style.backgroundColor="#f8f9fa")},onMouseLeave:_=>{p||(_.currentTarget.style.backgroundColor="#fff")},children:n.size===e.length?u("Deselect All"):u("Select All")}),t.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #dc3545",borderRadius:"4px",backgroundColor:p?"#f8f9fa":"#fff",color:p?"#999":"#dc3545",cursor:p?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:w,disabled:p,onMouseEnter:_=>{p||(_.currentTarget.style.backgroundColor="#dc3545",_.currentTarget.style.color="#fff")},onMouseLeave:_=>{p||(_.currentTarget.style.backgroundColor="#fff",_.currentTarget.style.color="#dc3545")},children:u("Delete All")})]})]}),t.jsx(ks,{selectedPhotos:e,selectedPhotoIndices:n,isSavingAlbum:p,onRemovePhoto:k,onTogglePhotoSelection:o,onSelectAllPhotos:S,onDeselectAllPhotos:c,hideHeader:!0})]}),Xs=({existingFiles:e,selectedExistingIndices:n,onToggleSelection:o,onSelectAll:S,onDeselectAll:c,onDeleteFile:k,disabled:w,t:p,isRTL:u})=>e.length===0?null:t.jsxs("div",{style:{marginBottom:"32px",direction:u?"rtl":"ltr"},children:[t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px",flexDirection:u?"row-reverse":"row"},children:[t.jsxs("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:[p("Existing Files")," (",e.length,")"]}),t.jsx("div",{style:{display:"flex",gap:"8px",flexDirection:u?"row-reverse":"row"},children:t.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:w?"#f8f9fa":"#fff",color:w?"#999":"#333",cursor:w?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:n.size===e.length?c:S,disabled:w,onMouseEnter:P=>{w||(P.currentTarget.style.backgroundColor="#f8f9fa")},onMouseLeave:P=>{w||(P.currentTarget.style.backgroundColor="#fff")},children:n.size===e.length?p("Deselect All"):p("Select All")})})]}),t.jsx("div",{style:{display:"flex",overflowX:"auto",gap:"16px",padding:"20px",border:"2px dashed #007bff",borderRadius:"12px",backgroundColor:"#fff",boxShadow:"0 2px 8px rgba(0, 0, 0, 0.04)",scrollbarWidth:"thin",scrollbarColor:"#007bff #f8f9fa"},children:e.map((P,_)=>{const $=n.has(_);return t.jsxs("div",{style:{position:"relative",width:"160px",height:"160px",flexShrink:0,borderRadius:"12px",overflow:"hidden",border:$?"2px solid rgba(0, 123, 255, 0.6)":"2px solid #ddd",cursor:w?"not-allowed":"pointer",opacity:w?.6:1,transition:"all 0.3s ease",boxShadow:$?"0 0 0 3px rgba(0, 123, 255, 0.3), 0 4px 12px rgba(0, 123, 255, 0.15)":"0 2px 8px rgba(0, 0, 0, 0.04)",transform:$?"translateY(-2px)":"translateY(0)"},onClick:()=>!w&&o(_),children:[t.jsx(as,{thumbnailDataKey:P.thumbnailDataKey,dataKey:P.dataKey,alt:p("Existing file"),style:{width:"100%",height:"100%",objectFit:"cover"}}),$&&t.jsx("div",{style:{position:"absolute",bottom:"8px",left:"8px",right:"8px",background:"rgba(0, 123, 255, 0.9)",color:"white",padding:"4px 8px",borderRadius:"6px",fontSize:"11px",fontWeight:"600",textAlign:"center",zIndex:10,backdropFilter:"blur(4px)"},children:"SELECTED"}),$&&!w&&t.jsx("button",{onClick:M=>{M.stopPropagation(),confirm(p("Are you sure you want to remove this file?"))&&k(_)},style:{position:"absolute",top:"6px",right:"6px",width:"18px",height:"18px",borderRadius:"50%",border:"none",backgroundColor:"rgba(220, 53, 69, 0.8)",color:"white",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:"bold",zIndex:15,opacity:1,transition:"all 0.2s ease",transform:"scale(0.8)"},onMouseEnter:M=>{M.currentTarget.style.backgroundColor="rgba(200, 35, 51, 0.9)",M.currentTarget.style.transform="scale(1)",M.currentTarget.style.opacity="1"},onMouseLeave:M=>{M.currentTarget.style.backgroundColor="rgba(220, 53, 69, 0.8)",M.currentTarget.style.transform="scale(0.8)",M.currentTarget.style.opacity="0"},title:p("Remove file"),children:"×"}),P.dataInBytes>0&&t.jsxs("div",{style:{position:"absolute",bottom:"4px",left:"4px",backgroundColor:"rgba(0,0,0,0.7)",color:"white",fontSize:"10px",padding:"2px 4px",borderRadius:"4px"},children:[(P.dataInBytes/(1024*1024)).toFixed(1),"MB"]}),P.durationInSeconds&&t.jsxs("div",{style:{position:"absolute",top:"8px",left:"8px",backgroundColor:"rgba(0,0,0,0.7)",color:"white",fontSize:"10px",padding:"2px 4px",borderRadius:"4px"},children:[Math.floor(P.durationInSeconds/60),":",String(Math.floor(P.durationInSeconds%60)).padStart(2,"0")]})]},`existing-${_}-${P.dataKey}`)})})]}),Zs=()=>{const{t:e,language:n}=Ke(),o=je(n)==="rtl",S=ts(e),{setShowUsernamePrompt:c,setUsernameInput:k}=S,[w,p]=b.useState(null),[u,P]=b.useState(!1),[_,$]=b.useState(0),[M,a]=b.useState(""),[q,E]=b.useState(""),[J,s]=b.useState(!1),[se,ee]=b.useState(!1),[X,le]=b.useState("NoPassword"),[ae,m]=b.useState(""),[x,f]=b.useState(!1),[g,U]=b.useState(!0),[Q,W]=b.useState(!1),[re,xe]=b.useState(null),[h,T]=b.useState(!1),[D,v]=b.useState([]),[I,j]=b.useState(!1),[C,N]=b.useState(new Set),[z,K]=b.useState(new Map),[Z,ie]=b.useState([]),[ue,pe]=b.useState(new Set),[fe,i]=b.useState(new Map),[d,F]=b.useState(!1),ne=r=>{!w&&r&&p(r)},{fileInputRef:V,selectedPhotos:Y,setSelectedPhotos:L,isUploading:H,progressTracker:te,setProgressTracker:he,debugMessages:ge,currentFolderId:Se,openFilePicker:et,handleFileSelection:tt,setOnSaveAlbumPage:ve,log:Ie}=rs(ne,!0);b.useEffect(()=>(ve(!0),A("🏠 Set isOnSaveAlbumPage to true - navigation disabled"),()=>{ve(!1),A("🏠 Set isOnSaveAlbumPage to false - navigation enabled")}),[ve]),b.useEffect(()=>{(async()=>{try{await Nt(),Ie("🔥 Save-album page S3 credentials prewarmed successfully")}catch(y){Ie(`⚠️ Save-album page credential prewarming failed: ${String(y)}`)}})()},[]);const A=(r,y)=>{let O=`[${new Date().toISOString()}] ${r}`;if(y!==void 0)try{const G=typeof y=="object"?JSON.stringify(y,null,2):String(y);O+=`
Data: ${G}`,console.log(O),console.log("Data object:",y)}catch(G){O+=` [Error stringifying data: ${G}]`,console.log(O),console.log("Raw data:",y)}else console.log(O);Ie(O)},st=async r=>{var y,R,O,G;if(r){F(!0),A(`Fetching existing album data for folder ID: ${r}`);try{const oe=await ce();if(!oe){A("❌ Authentication failed while fetching existing album data");return}const It=`
        mutation FetchRelations($fetchRelationsInput: FetchRelationsInput!) {
          fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
            items {
              ... on FolderPosition {
                ${os}
              }
            }
          }
        }
      `,At={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}},ye=await(await fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${oe}`},body:JSON.stringify({query:It,variables:At})})).json();if(ye.errors){console.error("GraphQL errors:",ye.errors),A(`❌ Failed to fetch existing album data: ${JSON.stringify(ye.errors)}`);return}const _e=(((R=(y=ye==null?void 0:ye.data)==null?void 0:y.fetchRelations)==null?void 0:R.items)||[]).find(de=>de&&de.folder&&de.folder.id===r);if(!_e)return;const be=_e.folder,Ee=(((G=(O=be==null?void 0:be.fileReferencesPage)==null?void 0:O.items)==null?void 0:G.map(de=>de.file))||[]).filter(de=>de&&de.dataKey).map(de=>({dataKey:de.dataKey,thumbnailDataKey:de.thumbnailDataKey||null,durationInSeconds:de.durationInSeconds||null,dataInBytes:de.dataInBytes||0}));ie(Ee),A(`✅ Successfully loaded ${Ee.length} existing files`),!M&&be.folderName&&a(be.folderName),!q&&be.folderDescription&&E(be.folderDescription)}catch(oe){console.error("Failed to fetch existing album data:",oe),A(`❌ Failed to fetch existing album data: ${String(oe)}`)}finally{F(!1)}}};b.useEffect(()=>{w&&(A(`Loading existing files for folder ID: ${w}`),st(w))},[w]);const rt=Os(A),{cognitoUsername:De,publicUsername:Ae,setPublicUsername:it}=js(p,L,xe,s,a,E,f,U,le,m,T,v,W,A),{saveAlbumDirectly:Fe}=Cs(w||Se,De,Y,h,D,M,q,x,g,Q,X,ae,z,P,$,L,he,A);b.useEffect(()=>{Se&&!w&&(p(Se),A(`Updated folder ID from upload processor: ${Se}`))},[Se,w]),b.useEffect(()=>{N(r=>{const y=new Set;return r.forEach(R=>{R<Y.length&&y.add(R)}),y}),K(r=>{const y=new Map(r),R=[];return r.forEach((O,G)=>{G>=Y.length&&R.push(G)}),R.forEach(O=>{y.delete(O)}),y})},[Y.length]),b.useEffect(()=>{pe(r=>{const y=new Set;return r.forEach(R=>{R<Z.length&&y.add(R)}),y}),i(r=>{const y=new Map(r),R=[];return r.forEach((O,G)=>{G>=Z.length&&R.push(G)}),R.forEach(O=>{y.delete(O)}),y})},[Z.length]);const ot=r=>{A(`Removing photo at index: ${r}`);const y=Y.filter((R,O)=>O!==r);L(y),A(`New files count: ${y.length}`),y.length>0?(localStorage.setItem(me.SELECTED_PHOTOS,JSON.stringify(y)),A(`Updated localStorage with ${y.length} photos`)):(localStorage.removeItem(me.SELECTED_PHOTOS),A("Removed photos from localStorage")),N(R=>{const O=new Set;return R.forEach(G=>{G<r?O.add(G):G>r&&O.add(G-1)}),O}),K(R=>{const O=new Map;return R.forEach((G,oe)=>{oe<r?O.set(oe,G):oe>r&&O.set(oe-1,G)}),O})},at=r=>{A(`Removing existing file at index: ${r}`);const y=Z.filter((R,O)=>O!==r);ie(y),A(`New existing files count: ${y.length}`),pe(R=>{const O=new Set;return R.forEach(G=>{G<r?O.add(G):G>r&&O.add(G-1)}),O}),i(R=>{const O=new Map;return R.forEach((G,oe)=>{oe<r?O.set(oe,G):oe>r&&O.set(oe-1,G)}),O})},nt=r=>{A(`Toggling selection for existing file at index: ${r}`),pe(y=>{const R=new Set(y);return R.has(r)?(R.delete(r),A(`Deselected existing file ${r}`)):(R.add(r),A(`Selected existing file ${r}`)),R})},lt=()=>{A("Selecting all existing files");const r=new Set;for(let y=0;y<Z.length;y++)r.add(y);pe(r)},dt=()=>{A("Deselecting all existing files"),pe(new Set)},ct=r=>{A(`Toggling selection for photo at index: ${r}`),N(y=>{const R=new Set(y);return R.has(r)?(R.delete(r),A(`Deselected photo ${r}`)):(R.add(r),A(`Selected photo ${r}`)),R})},ut=()=>{A("Selecting all photos");const r=new Set;for(let y=0;y<Y.length;y++)r.add(y);N(r)},pt=()=>{A("Deselecting all photos"),N(new Set)},ft=()=>{confirm(e("Are you sure you want to delete all new files? This action cannot be undone."))&&(A("Deleting all new photos"),L([]),N(new Set),K(new Map),localStorage.removeItem(me.SELECTED_PHOTOS),A("Cleared all photos from localStorage"))},gt=()=>{const r=!x;A(`Toggling isOnPublicProfile to: ${r}`),f(r)},mt=()=>{const r=!g;A(`Toggling participantsCanAddItems to: ${r}`),U(r)},xt=()=>{const r=!Q;A(`Toggling participantsCanDeleteItems to: ${r}`),W(r)},ht=async()=>{A("Album save initiated"),A("Photo tags applied:",Object.fromEntries(z)),A("Existing file tags applied:",Object.fromEntries(fe)),j(!1),P(!0);try{if(Ae!=null&&Ae.startsWith("Profile-")){A("Public username starts with 'Profile-', showing username prompt"),k(""),c(!0),P(!1);return}A("Valid username found, proceeding to save album directly with file-level tagging"),Fe()}catch(r){console.error("Error in handleSaveAlbum:",r),A(`Error in handleSaveAlbum: ${r}`),P(!1)}},bt=r=>{A(`Handling successful username update to: ${r}`),localStorage.setItem(me.PUBLIC_USERNAME,r),it(r),c(!1),A("Proceeding to save album after username update"),Fe()},yt=(r,y)=>{A(`Password dialog closed with option: ${r}, password: ${y?"******":"undefined"}`),r&&le(r),y!==void 0&&m(y),ee(!1)},wt=()=>{A("Opening password dialog"),ee(!0)},St=()=>{A("Add photos button clicked"),et(w)},$t=()=>{j(!I)},$e=r=>{r(),j(!1)};b.useEffect(()=>{const r=y=>{const R=y.target;I&&!R.closest(".settings-dropdown-container")&&j(!1)};return I&&document.addEventListener("mousedown",r),()=>{document.removeEventListener("mousedown",r)}},[I]);const Pe=u||H||d,Tt=Y.length>0||Z.length>0,vt=C.size>0||ue.size>0;return t.jsxs(t.Fragment,{children:[t.jsx(Qt,{}),t.jsx(Vt,{children:t.jsxs(Yt,{children:[t.jsx(Xt,{href:"my-albums.html",children:e("My Albums")}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[re===!0&&t.jsxs("div",{className:"settings-dropdown-container",style:{position:"relative",display:"flex",alignItems:"center"},children:[t.jsx("button",{onClick:$t,disabled:u||H||d,style:{background:"none",border:"none",cursor:u||H||d?"not-allowed":"pointer",padding:"8px",borderRadius:"4px",display:"flex",alignItems:"center",justifyContent:"center",color:u||H||d?"#ccc":"#666",fontSize:"18px",transition:"all 0.2s ease",backgroundColor:I?"#f0f0f0":"transparent",opacity:u||H||d?.5:1},onMouseEnter:r=>{!I&&!u&&!H&&!d&&(r.currentTarget.style.backgroundColor="#f8f9fa")},onMouseLeave:r=>{!I&&!u&&!H&&!d&&(r.currentTarget.style.backgroundColor="transparent")},title:e("Album Settings"),children:"⚙️"}),I&&!u&&!H&&!d&&t.jsxs(Zt,{children:[t.jsx(Te,{onClick:()=>$e(gt),children:t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[t.jsx("span",{children:e(x?"Remove From Public Profile":"Add To Public Profile")}),t.jsx("span",{style:{fontSize:"12px",color:x?"#28a745":"#6c757d",fontWeight:"bold"},children:x?"✓":"○"})]})}),t.jsx(Te,{onClick:()=>$e(mt),children:t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[t.jsx("span",{children:e(g?"Allow Additions":"Do Not Allow Additions")}),t.jsx("span",{style:{fontSize:"12px",color:g?"#28a745":"#6c757d",fontWeight:"bold"},children:g?"✓":"○"})]})}),t.jsx(Te,{onClick:()=>$e(xt),children:t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[t.jsx("span",{children:e(Q?"Allow Removals":"Do Not Allow Removals")}),t.jsx("span",{style:{fontSize:"12px",color:Q?"#28a745":"#6c757d",fontWeight:"bold"},children:Q?"✓":"○"})]})}),t.jsx(Te,{onClick:()=>$e(wt),children:t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[t.jsx("span",{children:e("Album Password Policy")}),t.jsx("span",{style:{fontSize:"12px",color:X!=="NoPassword"?"#28a745":"#6c757d",fontWeight:"bold"},children:X!=="NoPassword"?"✓":"○"})]})})]})]}),t.jsx(Oe,{$primary:!0,onClick:ht,disabled:u||H||d,style:{minWidth:"120px",fontSize:"14px",padding:"8px 16px"},children:e(u?"Saving...":"Save Album")})]})]})}),t.jsxs(Lt,{$isRTL:o,children:[t.jsx("div",{style:{marginTop:J&&re===!0?"32px":"0"},children:t.jsx(Fs,{showFolderDetails:J,isCreator:re,folderName:M,setFolderName:a,folderDescription:q,setFolderDescription:E,isSavingAlbum:u||H})}),(H||te.totalFiles>0&&(te.filesUploading>0||te.filesProcessing>0||te.filesComplete<te.totalFiles))&&t.jsx(is,{progressTracker:te,isRTL:je(n)==="rtl",variant:"detailed",context:"saving",isUploading:H,showSuccessMessage:!1,showErrorMessage:!0,customMessages:{error:e("Some photos could not be processed. You can continue with the successfully processed photos.")}}),t.jsx("input",{ref:V,id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:r=>tt(r,De),style:{display:"none"}}),J&&re===!0&&Tt&&t.jsxs(Vs,{t:e,isRTL:o,children:[Z.length>0&&t.jsx("div",{style:{marginBottom:"32px"},children:t.jsx(Xs,{existingFiles:Z,selectedExistingIndices:ue,onToggleSelection:nt,onSelectAll:lt,onDeselectAll:dt,onDeleteFile:at,disabled:Pe,t:e,isRTL:o})}),t.jsx(Ys,{selectedPhotos:Y,selectedPhotoIndices:C,onToggleSelection:ct,onSelectAll:ut,onDeselectAll:pt,onRemovePhoto:ot,onDeleteAll:ft,disabled:Pe,t:e,isRTL:o}),vt&&t.jsx("div",{style:{marginTop:"32px"},children:t.jsx(Js,{tagsManager:rt,disabled:Pe,enhancedLog:A})})]}),t.jsx(Ds,{isSavingAlbum:u,savingProgress:_}),t.jsx(es,{children:t.jsx(Oe,{onClick:St,disabled:u||H||d,children:e(H?"Uploading...":"Add More Photos")})}),t.jsx(ss,{t:e,language:n,usernameManager:S,onSuccess:bt}),t.jsx(Is,{isOpen:se,onClose:yt,initialOption:X,initialPassword:ae}),t.jsx(As,{debugMessages:ge,t:e,isRTL:o,textDirection:o?"rtl":"ltr"})]})]})},Ls=()=>t.jsx(Et,{children:t.jsx(Zs,{})});_t.createRoot(document.getElementById("root")).render(t.jsx(Ls,{}));
