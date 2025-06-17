import{d as M,u as Ke,a as S,j as t,g as Ie,r as Ge,h as de,L as me,i as Fe,s as vt,m as It,f as we,k as Pt,l as At,n as kt,R as jt,I as Ct,p as Dt}from"./utils-CPz2uLz2.js";import{S as Ft,C as Pe,F as _e,e as Ee,f as _t,g as Et,T as Ne,h as Re,i as Oe,j as ze,P as Nt,k as Rt,l as qe,m as He,n as Ot,o as zt,p as Mt,q as Bt,V as Ut,r as Wt,s as Kt,M as Gt,G as qt,A as Ht,H as Jt,t as Qt,u as Vt,B as ve}from"./styled-components-yAnH_Qbi.js";import{u as Yt,U as Xt}from"./useUsernameManagement-KaBJTto3.js";import{u as Zt,U as Lt}from"./useFileUploadProcessor-drmDlT1k.js";import{F as er}from"./types-B2_92tNb.js";import{L as tr}from"./LazyImage-B9J00rxJ.js";const d={colors:{primary:"#007bff",primaryDark:"#0056b3",secondary:"#6c757d",success:"#4caf50",danger:"#e53935",warning:"#ff9800",white:"#fff",text:{primary:"#333",secondary:"#666",light:"#777"},background:{primary:"#f9fafb",highlight:"#f0f7ff"},border:"#ddd"},spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px"},borderRadius:{small:"4px",medium:"8px"},boxShadow:{lg:"0 4px 10px rgba(0,0,0,0.08)"}},rr=M.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
`,sr=M.div`
  background-color: ${d.colors.white};
  border-radius: ${d.borderRadius.medium};
  box-shadow: ${d.boxShadow.lg};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  width: min(500px, calc(100vw - 64px));
  max-height: calc(100vh - 64px);
  overflow-y: auto;
  overflow-x: hidden;
  
  /* Ensure smooth scrolling */
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: ${d.colors.border} transparent;
  
  /* Custom scrollbar for webkit browsers */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${d.colors.border};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${d.colors.secondary};
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
    border-radius: ${d.borderRadius.small};
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
`,or=M.div`
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
`,ir=M.div`
  direction: ${e=>e.$isRTL?"rtl":"ltr"};
`,ar=M.h3`
  font-size: 24px;
  font-weight: 600;
  color: ${d.colors.text.primary};
  margin: 0 0 ${d.spacing.lg} 0;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 22px;
    margin: 0 0 ${d.spacing.md} 0;
  }
  
  @media (max-height: 700px) {
    font-size: 20px;
    margin: 0 0 ${d.spacing.md} 0;
  }
  
  @media (max-width: 480px) {
    font-size: 18px;
  }
`,nr=M.p`
  margin-bottom: ${d.spacing.lg};
  font-size: 16px;
  color: ${d.colors.text.secondary};
  line-height: 1.5;
  
  @media (max-width: 768px) {
    margin-bottom: ${d.spacing.md};
    font-size: 15px;
  }
  
  @media (max-height: 700px) {
    margin-bottom: ${d.spacing.sm};
    font-size: 14px;
  }
`,Me=M.div`
  margin-bottom: ${d.spacing.lg};
`,Be=M.label`
  display: block;
  margin-bottom: ${d.spacing.sm};
  font-size: 14px;
  font-weight: 500;
  color: ${d.colors.text.primary};
`,lr=M.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${d.colors.border};
  border-radius: ${d.borderRadius.small};
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${d.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  &::placeholder {
    color: ${d.colors.text.light};
  }
`,dr=M.div`
  display: flex;
  flex-direction: column;
  gap: ${d.spacing.md};
  margin-bottom: ${d.spacing.xl};
`,cr=M.div`
  border: 2px solid ${e=>e.$isSelected?d.colors.primary:d.colors.border};
  border-radius: ${d.borderRadius.medium};
  padding: ${d.spacing.lg};
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${e=>e.$isSelected?d.colors.background.highlight:d.colors.white};
  display: flex;
  align-items: center;
  gap: ${d.spacing.lg};
  
  @media (max-width: 768px) {
    padding: ${d.spacing.md};
    gap: ${d.spacing.md};
  }
  
  @media (max-width: 480px) {
    padding: ${d.spacing.sm};
    gap: ${d.spacing.sm};
  }
  
  @media (max-height: 700px) {
    padding: ${d.spacing.sm};
    gap: ${d.spacing.sm};
  }
`,ur=M.div`
  flex: 1;
`,pr=M.div`
  margin-bottom: ${d.spacing.xs};
`,fr=M.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${d.colors.primary};
  flex-shrink: 0;
`,gr=M.label`
  font-size: 16px;
  font-weight: 500;
  color: ${d.colors.text.primary};
  cursor: pointer;
  display: block;
`,mr=M.div`
  font-size: 14px;
  color: ${d.colors.text.secondary};
  margin-top: ${d.spacing.xs};
`,xr=M.div`
  color: ${d.colors.warning};
  font-size: 12px;
  font-style: italic;
  margin-top: ${d.spacing.xs};
  font-weight: 500;
`,hr=M.div`
  display: flex;
  gap: ${d.spacing.sm};
  justify-content: center;
  margin-top: ${d.spacing.xl};
`,Ue=M.button`
  background-color: ${e=>e.$variant==="danger"?d.colors.danger:e.$variant==="secondary"?"transparent":e.$variant==="success"?d.colors.success:d.colors.primary};
  color: ${e=>e.$variant==="secondary"?d.colors.primary:d.colors.white};
  border: ${e=>e.$variant==="secondary"?`1px solid ${d.colors.primary}`:"none"};
  padding: ${e=>e.$size==="small"?"8px 16px":e.$size==="large"?"16px 32px":"12px 24px"};
  border-radius: ${d.borderRadius.medium};
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  font-size: ${e=>e.$size==="small"?"14px":e.$size==="large"?"18px":"16px"};
  font-weight: 500;
  transition: all 0.2s ease;
  opacity: ${e=>e.disabled?.6:1};
  min-width: 100px;

  &:hover:not(:disabled) {
    background-color: ${e=>e.$variant==="danger"?"#c62828":e.$variant==="secondary"?d.colors.background.highlight:e.$variant==="success"?"#388e3c":d.colors.primaryDark};
  }
`,br=M.div`
  background-color: ${d.colors.background.primary};
  border-radius: ${d.borderRadius.medium};
  padding: ${d.spacing.md};
  margin: ${d.spacing.md} 0;
  border-left: 4px solid ${d.colors.primary};
  font-size: 14px;
  color: ${d.colors.text.secondary};
  line-height: 1.4;
  
  @media (max-width: 768px) {
    padding: ${d.spacing.sm};
    margin: ${d.spacing.sm} 0;
    font-size: 13px;
  }
  
  @media (max-height: 700px) {
    padding: ${d.spacing.xs};
    font-size: 12px;
  }
`,yr=[{value:"NotVisible",titleKey:"Password Required To See Or Save",descriptionKey:"Album will be completely hidden until correct password is entered"},{value:"Watermark",titleKey:"Watermarked And No Saving Without Password",descriptionKey:"Photos will be visible with watermarks, password required to save"},{value:"CannotBeSaved",titleKey:"Password Required To Save",descriptionKey:"Photos are visible but password required to download or save"},{value:"NoPassword",titleKey:"No Password",descriptionKey:"Album is fully public with no restrictions"}],wr=({isOpen:e,onClose:n,initialOption:o="NoPassword",initialPassword:$=""})=>{const{t:p,language:I}=Ke(),c=Ie(I)==="rtl",[f,g]=S.useState(o),[T,j]=S.useState($);if(S.useEffect(()=>{e&&(g(o),j($))},[e,o,$]),!e)return null;const u=T.trim()==="",i=C=>{g(C)},H=C=>{C.target===C.currentTarget&&n()},q=C=>C!=="NoPassword";return t.jsxs(t.Fragment,{children:[t.jsx(rr,{onClick:H}),t.jsx(sr,{children:t.jsx(or,{children:t.jsxs(ir,{$isRTL:c,children:[t.jsx(ar,{children:p("Album Password Policy")}),t.jsx(nr,{children:p("Configure password protection for your album. Choose how you want to restrict access to your photos.")}),t.jsxs(Me,{children:[t.jsx(Be,{children:p("Enter Password")}),t.jsx(lr,{type:"text",placeholder:p("Enter password (optional)"),value:T,onChange:C=>j(C.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"})]}),t.jsxs(Me,{children:[t.jsx(Be,{children:p("Select Protection Level")}),t.jsx(dr,{children:yr.map(C=>t.jsxs(cr,{$isSelected:f===C.value,onClick:()=>i(C.value),children:[t.jsx(fr,{type:"radio",name:"protection",checked:f===C.value,onChange:()=>i(C.value)}),t.jsxs(ur,{children:[t.jsx(pr,{children:t.jsx(gr,{children:p(C.titleKey)})}),t.jsx(mr,{children:p(C.descriptionKey)}),u&&q(C.value)&&f===C.value&&t.jsx(xr,{children:p('⚠️ Will use "password" as default if left empty')})]})]},C.value))})]}),q(f)&&t.jsxs(br,{children:[t.jsx("strong",{children:p("💡 Password Protection Info:")}),t.jsx("br",{}),p('If you leave the password field empty, "password" will be used as the default password. You can change this anytime in album settings.')]}),t.jsxs(hr,{children:[t.jsx(Ue,{$variant:"secondary",onClick:()=>n(),children:p("Cancel")}),t.jsx(Ue,{$variant:"primary",onClick:()=>{const C=u&&q(f)?"password":T;console.log(`Saving with option: ${f}, password: ${C.length>0?"********":"none"}`),n(f,C)},children:p("Save Settings")})]})]})})})]})},Sr=({t:e})=>{const n=o=>{o.preventDefault(),localStorage.clear(),Ge("index.html")};return t.jsx(Ft,{href:"#",onClick:n,children:e("Log Out")})},$r=({debugMessages:e,t:n,isRTL:o,textDirection:$})=>e.length===0?null:t.jsxs("div",{style:{marginTop:"40px",background:"#fff3cd",padding:"16px",borderRadius:"8px",border:"1px solid #ffeeba",maxWidth:900,margin:"0 auto",direction:$},children:[t.jsx("h3",{style:{marginTop:0,fontSize:"18px",color:"#856404",textAlign:o?"right":"left"},children:n("Debug Log")}),t.jsx("pre",{style:{fontSize:"14px",color:"#856404",whiteSpace:"pre-wrap",maxHeight:"400px",overflow:"auto",textAlign:o?"right":"left"},children:e.map((p,I)=>t.jsx("div",{style:{marginBottom:"8px"},children:p},I))})]}),Tr=`
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
        }
        folderPosition {
          id
          profileIds
        }          
      }
    }
  }
`,vr=(e,n,o,$,p,I,c,f,g,T,j,u,i)=>{const[H,q]=S.useState(null),[C,r]=S.useState(null),Z=async _=>{i(`Initializing folder ID with username: ${_}`);try{const B=new URLSearchParams(window.location.search).get("folderId");if(i(`Folder ID from URL: ${B||"null"}`),B){e(B),i(`Using existing folder ID: ${B}`);try{i(`Fetching details for folder: ${B}`);const E=await X(B,i);if(i("Folder details retrieved:",E),E){const x=`${_}_____${_}____Account`,W=E.creatorId===x;if(i(`User is creator of folder: ${W}, accountId: ${x}, creator: ${E.creatorId}`),o(W),W){i("User is creator, showing folder details"),$(!0),p(E.folderName),I(E.folderDescription),c(E.isOnPublicProfile),i(`Setting isOnPublicProfile: ${E.isOnPublicProfile}`),E.participantsCanAddItems!==void 0&&(f(E.participantsCanAddItems),i(`Setting participantsCanAddItems: ${E.participantsCanAddItems}`));const z=E.passwordPolicy;i(`Password policy from folder details: ${z}`),g(z),z!=="NoPassword"&&E.password&&T(E.password),i(`Set password protection option to: ${z}`)}else i("User is NOT the creator, hiding editable fields"),$(!1)}else i("No folder details retrieved, setting isCreator to true"),o(!0),$(!0)}catch(E){console.error("Error fetching folder details:",E),i(`Error fetching folder details: ${E}`),o(!1)}}else{const E=`${_}_____${Fe()}____Folder`;i(`Creating new folder ID: ${E}`),e(E),i("Setting isCreator to true for new album"),o(!0),$(!0)}}catch(l){console.error("Folder ID initialization error:",l),i(`Folder ID initialization error: ${l}`),o(!1)}},X=async(_,l)=>{var B,E,x,W,z,ee,fe,h;l(`Fetching details for folder ID: ${_}`);try{const y=await de();if(!y)return l("No token available for fetching folder details"),null;l("Sending GraphQL query to fetch folder details");const b=await(await fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${y}`},body:JSON.stringify({query:Tr,variables:{folderIds:[_],fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(l("Folder details API response:",b),b.errors)return console.error("GraphQL errors:",b.errors),l(`GraphQL errors: ${JSON.stringify(b.errors)}`),null;const D=((E=(B=b==null?void 0:b.data)==null?void 0:B.fetchFolders)==null?void 0:E.items)||[];if(l(`Found ${D.length} folder items`),D.length===0)return l("No folder items found"),null;const v=D[0];l("Retrieved folder data:",v);const F=((W=(x=v.folderPosition)==null?void 0:x.profileIds)==null?void 0:W.some(U=>U.includes("Public____Profile")))||!1;l(`Folder is on public profile: ${F}`),l("Profile IDs:",(z=v.folderPosition)==null?void 0:z.profileIds);const P=(ee=v.folderInviteParameters)==null?void 0:ee.usingFolderInviteGrantsRightToAddItems;return l(`Participants can add items: ${P}`),{creatorId:v.creatorId||"",folderName:v.folderName||"",folderDescription:v.folderDescription||"",passwordPolicy:((fe=v.folderPassword)==null?void 0:fe.policy)||"NoPassword",password:((h=v.folderPassword)==null?void 0:h.password)||"",isOnPublicProfile:F,participantsCanAddItems:P!==void 0?P:!0}}catch(y){return console.error("Error in fetchFolderDetails:",y),l(`Error in fetchFolderDetails: ${y}`),null}},L=()=>{i("Attempting to restore photos from localStorage");try{const _=localStorage.getItem(me.SELECTED_PHOTOS);if(i(`Found stored photos: ${_?"yes":"no"}`),_)try{const l=JSON.parse(_);i(`Parsed ${l.length} photos from localStorage`),Array.isArray(l)&&l.length>0&&(n(l),i(`Restored ${l.length} photos to state`))}catch(l){console.error("Error parsing stored photos:",l),i(`Error parsing stored photos: ${l}`)}}catch(_){console.error("Error restoring photos from storage:",_),i(`Error restoring photos from storage: ${_}`)}},V=()=>{i("Testing S3 connection");try{vt?i("S3 client is available"):(console.error("S3 client not available"),i("S3 client not available"))}catch(_){console.error("S3 connection test error:",_),i(`S3 connection test error: ${_}`)}},ae=async()=>{var _;i("Starting component initialization");try{i("Checking login with refresh");const l=await de();if(!l){i("No token returned from login check, aborting initialization");return}try{const B=localStorage.getItem(me.PUBLIC_USERNAME);i(`Retrieved public username from localStorage: ${B||"null"}`),r(B||null);const x=JSON.parse(atob(l.split(".")[1]))["cognito:username"];if(x){i(`Extracted Cognito username from token: ${x}`),q(x);const W=localStorage.getItem(me.SUB_ALBUM_DATA);if(i(`Sub-album data from localStorage: ${W||"null"}`),W)try{const z=JSON.parse(W);if(i("Parsed sub-album data:",z),z.isSubAlbum&&((_=z.selectedFileIds)==null?void 0:_.length)>0){i(`Valid sub-album data found with ${z.selectedFileIds.length} files`),j(!0),u(z.selectedFileIds),z.selectedPhotos&&z.selectedPhotos.length>0&&(i(`Found ${z.selectedPhotos.length} selected photos in sub-album data`),n(z.selectedPhotos)),$(!0),o(!0);const ee=`${x}_____${Fe()}____Folder`;i(`Generated new folder ID for sub-album: ${ee}`),e(ee)}else i("Invalid sub-album data, proceeding with normal initialization"),await Z(x)}catch(z){console.error("Error parsing sub-album data:",z),i(`Error parsing sub-album data: ${z}`),await Z(x)}else i("No sub-album data found, proceeding with normal folder initialization"),await Z(x)}else i("No Cognito username found in token")}catch(B){console.error("User data initialization error:",B),i(`User data initialization error: ${B}`)}L(),V(),i("Component initialization completed")}catch(l){console.error("Initialization error:",l),i(`Initialization error: ${l}`)}};return S.useEffect(()=>{ae()},[]),{cognitoUsername:H,publicUsername:C,setPublicUsername:r}},Ir=(e,n,o,$,p,I,c,f,g,T,j,u,i,H,q,C,r)=>{const Z=h=>(r(`Converting ${h.length} tags to API format`),h.map(y=>({TagType:y.TagType,tagTitle:y.tagTitle,selectedSubtagInputs:y.subtags.map(N=>({TagType:y.TagType,tagTitle:N.tagTitle,subtagTitle:N.subtagTitle}))}))),X=h=>{r(`Save progress text: ${h}`);const y=document.getElementById("saveProgressText");y&&(y.innerText=h)},L=h=>{const y=document.getElementById("saveProgress");y?(y.style.width=`${h}%`,r(`Updated save progress bar: ${h}%`)):r("Progress bar element not found"),H(h)},V=(h,y)=>{r(`Splitting array of ${h.length} items into chunks of ${y}`);const N=[];for(let b=0;b<h.length;b+=y)N.push(h.slice(b,b+y));return r(`Created ${N.length} chunks`),N},ae=h=>{const y=new Set;return h.filter(N=>y.has(N.fileId)?(r(`Skipping duplicate file reference with ID: ${N.fileId}`),!1):(y.add(N.fileId),!0))},_=(h,y,N)=>{r("Creating folder position input WITHOUT folder-level tags"),r(`Profile visibility: ${f?"Public":"Only Me"}`);const b=f?[`${n}_____Public____Profile`]:["Only Me_____Only Me____Profile"];r(`Profile IDs: ${JSON.stringify(b)}`);let D=[];$&&p.length>0&&(r(`Creating file reference IDs for ${p.length} sub-album files`),D=p.map(U=>{const J=U.split("_____");if(J.length>=2){const ie=J[1].split("____")[0],pe=`${N}_____${ie}____FileReference`;return r(`Created file reference ID for sub-album: ${pe}`),pe}return r(`Using original fileId as fallback: ${U}`),U})),r(`Created ${D.length} acceptedFileReferenceIds`);const v=T!=="NoPassword"?j:null;if(r(`Password protection: ${T}`),r(`Album password: ${v?"******":"null"}`),r(`Participants can add items: ${g}`),!e)throw r("Error: folderId is null or undefined"),new Error("folderId is required to create folder position input");const F=Pt(e),P=At(F);return{currentTime:h,folderId:e,profileIds:b,folderPositionPoints:1,acceptedFileReferenceIds:D,folderInput:{folderAboutContactIds:[y],albumNanoId:P,folderName:I,folderDescription:c,folderPasswordInput:{password:v,policy:T},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,usingFolderInviteGrantsRightToRemoveItems:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:g,addedItemsNeedFolderCreatorApproval:!1}}}},l=(h,y,N)=>(r(`Creating file reference inputs with individual photo tags for ${h.length} photos`),h.map((b,D)=>{var J;const v=u.get(D)||[],F=Z(v);if(r(`Photo ${D} (${b.fileName}): ${v.length} tags applied`),b.fileId)return r(`Using existing fileId for photo: ${b.fileId}`),{fileReferencesHolderId:e,currentTime:y,points:1,hasBeenDeleted:!1,selectedTagInputs:F,fileId:b.fileId,fileInput:null};const P=b.type==="video"||(J=b.type)!=null&&J.startsWith("video")?`Input/Video/${b.fileName}`:`Input/Image/${b.fileName}`,U=`${n}_____${b.fileName}____File`;return r(`Created file reference for ${b.fileName}:`),r(`  - dataKey: ${P}`),r(`  - fileId: ${U}`),r(`  - thumbnailDataKey: ${b.thumbnailDataKey||"undefined"}`),r(`  - size: ${b.size}`),r(`  - thumbnailSize: ${b.thumbnailSize||0}`),r(`  - duration: ${b.duration||"undefined"}`),r(`  - tags: ${v.length} tags selected for this photo`),{fileReferencesHolderId:e,currentTime:y,points:1,hasBeenDeleted:!1,selectedTagInputs:F,fileId:U,fileInput:{fileId:U,ownerFileInput:{editorContactIds:[N],FileSharingOptionsEnum:"Anyone",dataKey:P,thumbnailDataKey:b.thumbnailDataKey,dataInBytes:b.size,thumbnailDataInBytes:b.thumbnailSize||0,s3UploadedAt:y,durationInSeconds:b.duration},editorFileInput:{aboutContactIds:[N],captionText:"",numericFilterInputs:[]}}}})),B=async h=>{var D,v;r("Sending folder-only mutation (no file references, no folder tags)");const y=await de();if(!y)throw r("No token available for saving album, aborting"),new Error("Authentication token not available");const N=`
      mutation MyMutation($folderPositionInputs: [FolderPositionInput!]) {
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items {
            id
          }
        }
      }
    `,b={folderPositionInputs:[h]};r("GraphQL folder-only mutation variables:",b);try{r("Sending API request to save folder");const F=await fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${y}`},body:JSON.stringify({query:N,variables:b})});r(`API response status: ${F.status}`);const P=await F.text();r(`API response raw text: ${P}`);const U=JSON.parse(P);if(r("API response JSON:",U),U.errors)throw console.error("Folder save failed:",U.errors),r("Folder save failed with errors:",U.errors),new Error("Failed to save folder");return r("Folder saved successfully"),((v=(D=U.data)==null?void 0:D.changeFiles)==null?void 0:v.items)||[]}catch(F){throw console.error("Error in sendFolderOnlyMutation:",F),r(`Error in sendFolderOnlyMutation: ${F}`),F}},E=async h=>{var D,v,F,P,U;r(`Sending file references-only mutation with ${h.length} items (each with individual tags)`);const y=await de();if(!y)throw r("No token available for saving file references, aborting"),new Error("Authentication token not available");const N=`
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
    `,b={updatedFileReferenceInputs:h};r("GraphQL file references-only mutation variables (first item):",h.length>0?h[0]:"No items");try{r("Sending API request to save file references with individual tags");const J=await fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${y}`},body:JSON.stringify({query:N,variables:b})});r(`API response status: ${J.status}`);const oe=await J.text();r(`API response raw text: ${oe.substring(0,500)}...`);const ie=JSON.parse(oe);if(r("API response JSON items count:",((F=(v=(D=ie.data)==null?void 0:D.changeFiles0)==null?void 0:v.items)==null?void 0:F.length)||0),ie.errors)throw console.error("File references save failed:",ie.errors),r("File references save failed with errors:",ie.errors),new Error("Failed to save file references");return r("File references chunk saved successfully with individual photo tags"),((U=(P=ie.data)==null?void 0:P.changeFiles0)==null?void 0:U.items)||[]}catch(J){throw console.error("Error in sendFileReferencesOnlyMutation:",J),r(`Error in sendFileReferencesOnlyMutation: ${J}`),J}},x=async(h,y)=>{var v,F,P,U,J,oe,ie,pe,ce;r(`Sending final chunk with folder mutation (${h.length} file references, no folder tags)`);const N=await de();if(!N)throw r("No token available for saving final chunk, aborting"),new Error("Authentication token not available");const b=`
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
    `,D={folderPositionInputs:[y],updatedFileReferenceInputs:h};r("GraphQL final mutation variables (folder + last chunk, no folder tags)");try{r("Sending API request for final save with folder (no folder tags)");const ue=await fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${N}`},body:JSON.stringify({query:b,variables:D})});r(`API response status: ${ue.status}`);const be=await ue.text();r(`API response raw text: ${be.substring(0,500)}...`);const s=JSON.parse(be);if(r("API response JSON:",{fileReferencesCount:((P=(F=(v=s.data)==null?void 0:v.changeFiles0)==null?void 0:F.items)==null?void 0:P.length)||0,folderItems:((J=(U=s.data)==null?void 0:U.changeFiles)==null?void 0:J.items)||[]}),s.errors)throw console.error("Final save failed:",s.errors),r("Final save failed with errors:",s.errors),new Error("Failed to complete album save");return r("Final chunk and folder saved successfully (with individual photo tags)"),{fileReferences:((ie=(oe=s.data)==null?void 0:oe.changeFiles0)==null?void 0:ie.items)||[],folderPositions:((ce=(pe=s.data)==null?void 0:pe.changeFiles)==null?void 0:ce.items)||[]}}catch(ue){throw console.error("Error in sendFinalChunkWithFolderMutation:",ue),r(`Error in sendFinalChunkWithFolderMutation: ${ue}`),ue}},W=async()=>(r("Validating required data"),await de()?n?e?(r("All required data validated successfully"),!0):(r("No folder ID, validation failed"),!1):(r("No Cognito username, validation failed"),!1):(r("No token available, validation failed"),!1)),z=()=>{r("Handling successful save"),kt(q,C,[me.SELECTED_PHOTOS,me.SUB_ALBUM_DATA],r),r("Album data cleared");const h=document.getElementById("saveProgressText");h&&(h.innerText="Album saved successfully!",r("Updated progress text to 'Album saved successfully!'")),sessionStorage.setItem("album_just_saved","true"),r("Set 'album_just_saved' flag in sessionStorage"),r("Setting timeout for redirect to my-albums.html"),setTimeout(()=>{r("Redirecting to my-albums.html"),Ge("my-albums.html")},1e3)},ee=async(h,y)=>{r("Starting chunked save process (individual photo tags, no folder tags)");try{X("Processing files in chunks...");const N=48;if(y.length===0)r("No file references to process, saving only folder position (no folder tags)"),await B(h);else{const b=ae(y);r(`After removing duplicates, processing ${b.length} unique file references`);const D=V(b,N);r(`Split file references into ${D.length} chunks of max size ${N}`);for(let v=0;v<D.length;v++){const F=D[v];r(`Processing chunk ${v+1} of ${D.length} with ${F.length} file references`);const P=v/D.length*80;H(10+P),L(10+P),v<D.length-1?(X(`Saving files: chunk ${v+1} of ${D.length}...`),await E(F)):(X("Finalizing album..."),await x(F,h))}}H(100),L(100),X("Album saved successfully!"),z()}catch(N){console.error("Error in chunked save process:",N),r(`Error in chunked save process: ${N}`),X(`Error: ${N}`),i(!1)}};return{saveAlbumDirectly:async()=>{r("Starting direct album save with individual photo tagging"),r(`Photo tags map: ${u.size} photos have tags applied`),i(!0),H(5);try{if(r("Validating required data for save"),!await W()){r("Required data validation failed, aborting save"),i(!1);return}const h=Math.floor(Date.now()/1e3),y=`${n}_____${n}____Account`,b=e.split("_____")[1].split("____")[0];r(`Save timestamp: ${h}`),r(`Account ID: ${y}`),r(`Folder ID: ${e}`),r(`Folder target item identifier: ${b}`),r("Creating folder position input (no folder tags)");const D=_(h,y,b);r("Folder position input created:",D);let v=[];const F=o.filter(P=>P.status==="complete");if(r(`Found ${F.length} valid photos with 'complete' status`),F.length>0){const P=F.filter(J=>!J.fileId);r(`Found ${P.length} new uploads to move from temp to public folder`),P.length>0&&(r("Moving files from temp to public folder"),await It(P,L,r)),r("Creating file reference inputs for uploads with individual photo tags");const U=l(F,h,y);r(`Created ${U.length} file reference inputs for uploads`,U),v=v.concat(U)}if($&&p.length>0){r(`Adding ${p.length} existing file references for sub-album`);const P=p.map(U=>(r(`Creating file reference for existing file ID: ${U}`),{fileReferencesHolderId:e,currentTime:h,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:U,fileInput:null}));r(`Created ${P.length} file reference inputs for existing files`,P),v=v.concat(P)}r(`Total file reference inputs: ${v.length}`),r("Sending GraphQL mutations with chunked file references (individual photo tags)"),await ee(D,v)}catch(h){console.error("Error in saveAlbumDirectly:",h),r(`Error in saveAlbumDirectly: ${h}`),i(!1)}}}},Pr=({selectedPhotos:e,selectedPhotoIndices:n,isSavingAlbum:o,onRemovePhoto:$,onTogglePhotoSelection:p,onSelectAllPhotos:I,onDeselectAllPhotos:c,hideHeader:f=!1})=>{const{t:g}=Ae();if(e.length===0)return null;const T=n.size>0,j=n.size===e.length;return t.jsxs(t.Fragment,{children:[!f&&e.length>1&&t.jsx(Pe,{style:{marginBottom:"16px",border:"2px solid #007bff"},children:t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px"},children:[t.jsx("span",{style:{fontWeight:"bold",fontSize:"14px",color:"#007bff"},children:T?g("{{count}} file(s) selected for tagging",{count:n.size}):g("Click files below to select them for tagging")}),t.jsxs("div",{style:{display:"flex",gap:"8px",marginLeft:"auto"},children:[!j&&t.jsx("button",{onClick:I,disabled:o,style:{padding:"6px 12px",border:"1px solid #007bff",borderRadius:"4px",background:"#007bff",color:"white",fontSize:"12px",cursor:"pointer",fontWeight:"bold"},children:g("Select All")}),T&&t.jsx("button",{onClick:c,disabled:o,style:{padding:"6px 12px",border:"1px solid #6c757d",borderRadius:"4px",background:"transparent",color:"#6c757d",fontSize:"12px",cursor:"pointer"},children:g("Deselect All")})]})]})}),t.jsx(Ot,{children:e.map((u,i)=>{var q,C;const H=n.has(i);return t.jsxs(zt,{style:{position:"relative",cursor:e.length>1?"pointer":"default",border:H?"3px solid #007bff":"1px solid #e9ecef",borderRadius:"8px",overflow:"hidden"},onClick:()=>e.length>1&&p(i),children:[t.jsx("button",{onClick:r=>{r.stopPropagation(),!o&&confirm(g("Are you sure you want to remove this photo?"))&&$(i)},disabled:o,style:{position:"absolute",top:"8px",right:"8px",width:"24px",height:"24px",borderRadius:"50%",border:"none",backgroundColor:"rgba(220, 53, 69, 0.9)",color:"white",cursor:o?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px",fontWeight:"900",zIndex:20,opacity:o?.5:1,transition:"all 0.2s ease",boxShadow:"0 2px 4px rgba(0,0,0,0.3)",lineHeight:"1"},onMouseEnter:r=>{o||(r.currentTarget.style.backgroundColor="rgba(200, 35, 51, 1)",r.currentTarget.style.transform="scale(1.1)")},onMouseLeave:r=>{o||(r.currentTarget.style.backgroundColor="rgba(220, 53, 69, 0.9)",r.currentTarget.style.transform="scale(1)")},title:g("Remove photo"),children:"×"}),e.length>1&&H&&t.jsx("div",{style:{position:"absolute",bottom:"8px",left:"8px",right:"8px",background:"rgba(0, 123, 255, 0.9)",color:"white",padding:"4px 8px",borderRadius:"4px",fontSize:"11px",fontWeight:"bold",textAlign:"center",zIndex:10},children:"SELECTED FOR TAGGING"}),u.status!=="complete"&&t.jsx(Mt,{$status:u.status,children:u.status==="error"?"✕":u.status==="uploading"?"↑":u.status==="processing"?"⚙️":"•"}),t.jsxs(Bt,{style:{opacity:e.length===1||!H?1:.85,transition:"opacity 0.2s ease"},children:[u.type==="video"||(q=u.type)!=null&&q.startsWith("video")?t.jsx(Ut,{src:u.s3PreviewUrl,controls:!0}):t.jsx(Wt,{src:u.s3PreviewUrl,alt:u.fileName}),(u.status==="uploading"||u.status==="processing")&&t.jsx(qe,{$bottom:"4px",$left:"4px",$right:"4px",$height:"4px",children:t.jsx(He,{$progress:u.progress,$status:u.status})})]}),t.jsxs(Kt,{children:[(C=u.type)!=null&&C.startsWith("video")?g("Video"):g("Image"),u.size&&` • ${(u.size/1024/1024).toFixed(1)} MB`,u.duration&&` • ${u.duration}s`]}),u.status==="error"&&u.errorMessage&&t.jsxs(Gt,{$type:"error",children:[g("Error"),": ",u.errorMessage.length>40?u.errorMessage.substring(0,37)+"...":u.errorMessage]})]},i)})})]})},Ar=({isSavingAlbum:e,savingProgress:n})=>{const{t:o}=Ae();return e?t.jsxs(Pe,{children:[t.jsx(Nt,{children:o("Saving Album")}),t.jsx(Rt,{id:"saveProgressText",children:o("Moving files...")}),t.jsx(qe,{children:t.jsx(He,{id:"saveProgress",$progress:n/100})})]}):null},kr=({showFolderDetails:e,isCreator:n,folderName:o,setFolderName:$,folderDescription:p,setFolderDescription:I,isOnPublicProfile:c,handlePublicProfileToggle:f,participantsCanAddItems:g,handleParticipantsCanAddItemsToggle:T,isSavingAlbum:j})=>{const{t:u}=Ae();return!e||n!==!0?null:t.jsxs(Pe,{children:[t.jsxs(_e,{children:[t.jsx(Ee,{htmlFor:"folderName",children:u("Album Name (Optional)")}),t.jsx(_t,{id:"folderName",type:"text",value:o,onChange:i=>$(i.target.value),placeholder:u("Enter album name")})]}),t.jsxs(_e,{children:[t.jsx(Ee,{htmlFor:"folderDescription",children:u("Album Description (Optional)")}),t.jsx(Et,{id:"folderDescription",value:p,onChange:i=>I(i.target.value),placeholder:u("Enter album description"),rows:4})]}),t.jsxs(Ne,{children:[t.jsx(Re,{children:u(c?"On Public Profile":"Not On Public Profile")}),t.jsxs(Oe,{children:[t.jsx("input",{type:"checkbox",checked:c,onChange:f,disabled:j}),t.jsx(ze,{})]})]}),t.jsxs(Ne,{children:[t.jsx(Re,{children:u(g?"Participants Can Add Items":"Participants Cannot Add Items")}),t.jsxs(Oe,{children:[t.jsx("input",{type:"checkbox",checked:g,onChange:T,disabled:j}),t.jsx(ze,{})]})]})]})},Ae=()=>({t:(e,n)=>n&&typeof n=="object"&&"count"in n?e.replace("{{count}}",String(n.count)):e,language:"en"}),jr=`
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
`,Cr=`
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
`,Dr=`
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
`,Fr=`
  mutation DeleteTag($tagId: String!) {
    deleteTag(tagId: $tagId) {
      id
      hasBeenDeleted
    }
  }
`,_r=`
  mutation DeleteSubtag($subtagId: String!) {
    deleteSubtag(subtagId: $subtagId) {
      id
      hasBeenDeleted
    }
  }
`,Er=e=>{const[n,o]=S.useState([]),[$,p]=S.useState([]),[I,c]=S.useState(null),[f,g]=S.useState(!1),[T,j]=S.useState(null),[u,i]=S.useState(null),[H,q]=S.useState(!1),[C,r]=S.useState(!1),[Z,X]=S.useState(""),[L,V]=S.useState(""),[ae,_]=S.useState(!1),[l,B]=S.useState(!1),E=async()=>{var s,m;e("Fetching tags from API"),g(!0);try{const k=await de();if(!k){e("No token available for fetching tags");return}const K=await(await fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${k}`},body:JSON.stringify({query:jr,variables:{fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(e("Tags API response:",K),K.errors){console.error("GraphQL errors:",K.errors),e(`GraphQL errors: ${JSON.stringify(K.errors)}`);return}const te=(((m=(s=K==null?void 0:K.data)==null?void 0:s.fetchRelations)==null?void 0:m.items)||[]).map(Y=>{var le,xe;return{id:Y.id,tagTitle:Y.tagTitle,TagType:Y.TagType,points:Y.points,createdAt:Y.createdAt,updatedAt:Y.updatedAt,subtags:((xe=(le=Y.subtags)==null?void 0:le.items)==null?void 0:xe.map(ge=>({id:ge.id,tagTitle:ge.tagTitle,subtagTitle:ge.subtagTitle,TagType:ge.TagType,points:ge.points,createdAt:ge.createdAt,updatedAt:ge.updatedAt})))||[]}});e(`Fetched ${te.length} tags`),o(te)}catch(k){console.error("Error fetching tags:",k),e(`Error fetching tags: ${k}`)}finally{g(!1)}},x=s=>{if(e(`Selecting tag for photo application: ${s.tagTitle}`),!$.find(k=>k.tagTitle===s.tagTitle)){const k={tagTitle:s.tagTitle,TagType:s.TagType,subtags:[]};p(Q=>[...Q,k]),e(`Tag ${s.tagTitle} added to selection for photo application`)}},W=s=>{e(`Unselecting tag from photo application: ${s.tagTitle}`),p(m=>m.filter(k=>k.tagTitle!==s.tagTitle)),I===s.id&&c(null)},z=s=>{e(`Selecting subtag for photo application: ${s.subtagTitle} for tag: ${s.tagTitle}`),p(m=>m.map(k=>k.tagTitle===s.tagTitle&&!k.subtags.find(K=>K.subtagTitle===s.subtagTitle)?{...k,subtags:[...k.subtags,{TagType:s.TagType,tagTitle:s.tagTitle,subtagTitle:s.subtagTitle}]}:k))},ee=s=>{e(`Unselecting subtag from photo application: ${s.subtagTitle} for tag: ${s.tagTitle}`),p(m=>m.map(k=>k.tagTitle===s.tagTitle?{...k,subtags:k.subtags.filter(Q=>Q.subtagTitle!==s.subtagTitle)}:k))},fe=s=>{e(`Setting displayed tag: ${s}`),c(s)},h=s=>$.some(m=>m.tagTitle===s.tagTitle),y=s=>{const m=$.find(k=>k.tagTitle===s.tagTitle);return(m==null?void 0:m.subtags.some(k=>k.subtagTitle===s.subtagTitle))||!1},N=()=>{if(!I)return[];const s=n.find(m=>m.id===I);return(s==null?void 0:s.subtags)||[]},b=()=>{e("Clearing all selected tags"),p([]),c(null)},D=()=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(s){const m=Math.random()*16|0;return(s=="x"?m:m&3|8).toString(16)}),v=async(s,m)=>{if(e(`Adding new tag: ${s} of type: ${m}`),!s.trim())return e("Cannot add tag with empty title"),!1;_(!0);try{if(!await de())return e("No token available for adding tag"),!1;if(await(async()=>(e("PLACEHOLDER: Would send GraphQL mutation to add tag",{mutation:Cr,variables:{tagInput:{tagTitle:s.trim(),TagType:m,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(re=>setTimeout(re,500)),!0))()){const re={id:D(),tagTitle:s.trim(),TagType:m,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3),subtags:[]};return o(te=>[re,...te]),x(re),fe(re.id),X(""),q(!1),e(`Successfully added new tag for photo application: ${s}`),!0}return!1}catch(k){return console.error("Error adding new tag:",k),e(`Error adding new tag: ${k}`),!1}finally{_(!1)}},F=async(s,m,k)=>{if(e(`Adding new subtag: ${m} to tag: ${s}`),!m.trim())return e("Cannot add subtag with empty title"),!1;if(!I)return e("No displayed tag for adding subtag"),!1;B(!0);try{if(!await de())return e("No token available for adding subtag"),!1;if(await(async()=>(e("PLACEHOLDER: Would send GraphQL mutation to add subtag",{mutation:Dr,variables:{subtagInput:{tagTitle:s,subtagTitle:m.trim(),TagType:k,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(te=>setTimeout(te,500)),!0))()){const te={id:D(),tagTitle:s,subtagTitle:m.trim(),TagType:k,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3)};return o(Y=>Y.map(le=>le.id===I?{...le,subtags:[te,...le.subtags||[]]}:le)),z(te),V(""),r(!1),e(`Successfully added new subtag for photo application: ${m}`),!0}return!1}catch(Q){return console.error("Error adding new subtag:",Q),e(`Error adding new subtag: ${Q}`),!1}finally{B(!1)}},P=async s=>{e(`Deleting tag: ${s}`),j(s);try{if(!await de())return e("No token available for deleting tag"),!1;if(await(async()=>(e("PLACEHOLDER: Would send GraphQL mutation to delete tag",{mutation:Fr,variables:{tagId:s}}),await new Promise(K=>setTimeout(K,500)),!0))()){o(re=>re.filter(te=>te.id!==s));const K=n.find(re=>re.id===s);return K&&W(K),I===s&&fe(null),e(`Successfully deleted tag: ${s}`),!0}return!1}catch(m){return console.error("Error deleting tag:",m),e(`Error deleting tag: ${m}`),!1}finally{j(null)}},U=async s=>{e(`Deleting subtag: ${s}`),i(s);try{if(!await de())return e("No token available for deleting subtag"),!1;if(await(async()=>(e("PLACEHOLDER: Would send GraphQL mutation to delete subtag",{mutation:_r,variables:{subtagId:s}}),await new Promise(K=>setTimeout(K,500)),!0))()){let K=null;return o(re=>re.map(te=>{var le;const Y=((le=te.subtags)==null?void 0:le.filter(xe=>xe.id===s?(K=xe,!1):!0))||[];return{...te,subtags:Y}})),K&&ee(K),e(`Successfully deleted subtag: ${s}`),!0}return!1}catch(m){return console.error("Error deleting subtag:",m),e(`Error deleting subtag: ${m}`),!1}finally{i(null)}},J=async(s,m)=>(e(`Placeholder: Updating tag points: ${s} to ${m}`),!1),oe=()=>{q(!0),X("")},ie=()=>{q(!1),X("")},pe=()=>{r(!0),V("")},ce=()=>{r(!1),V("")},ue=async()=>Z.trim()?await v(Z,"File"):!1,be=async()=>{if(L.trim()&&I){const s=n.find(m=>m.id===I);if(s)return await F(s.tagTitle,L,s.TagType)}return!1};return S.useEffect(()=>{E()},[]),{tags:n,selectedTags:$,displayedTagId:I,isLoadingTags:f,tagIdBeingDeleted:T,subtagIdBeingDeleted:u,isAddingNewTag:H,isAddingNewSubtag:C,newTagTitle:Z,newSubtagTitle:L,isSubmittingNewTag:ae,isSubmittingNewSubtag:l,fetchTags:E,selectTag:x,unselectTag:W,selectSubtag:z,unselectSubtag:ee,setDisplayedTag:fe,clearSelectedTags:b,isTagSelected:h,isSubtagSelected:y,getDisplayedTagSubtags:N,setTagIdBeingDeleted:j,setSubtagIdBeingDeleted:i,addNewTag:v,addNewSubtag:F,deleteTag:P,deleteSubtag:U,updateTagPoints:J,startAddingNewTag:oe,cancelAddingNewTag:ie,startAddingNewSubtag:pe,cancelAddingNewSubtag:ce,submitNewTag:ue,submitNewSubtag:be,setNewTagTitle:X,setNewSubtagTitle:V}},Nr=M.div`
  margin: 16px 0;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
`,Je=M.div`
  margin-bottom: 12px;
`,Qe=M.h3`
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  display: flex;
  align-items: center;
  gap: 8px;
`,Ve=M.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  min-height: 32px;
`,Ye=M.button`
  position: relative;
  padding: 6px 12px;
  border: 1px solid ${e=>e.$isSelected?"#007bff":"#ced4da"};
  border-radius: 16px;
  background: ${e=>e.$isSelected?"#007bff":"#ffffff"};
  color: ${e=>e.$isSelected?"#ffffff":"#495057"};
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  
  ${e=>e.$isDisplayed&&`
    border-color: #28a745;
    background: #28a745;
    color: white;
  `}

  ${e=>e.$isBeingDeleted&&`
    opacity: 0.5;
    pointer-events: none;
  `}

  &:hover {
    background: ${e=>e.$isSelected?"#0056b3":"#e9ecef"};
    ${e=>e.$isDisplayed&&`
      background: #1e7e34;
    `}
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`,Rr=M(Ye)`
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
`,Xe=M.button`
  position: absolute;
  top: -4px;
  right: -4px;
  width: 16px;
  height: 16px;
  border: none;
  border-radius: 50%;
  background: #dc3545;
  color: white;
  font-size: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: #c82333;
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`,Or=M.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
`,Ze=M.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
`,Le=M.button`
  padding: 4px 8px;
  border: 1px solid #6c757d;
  border-radius: 12px;
  background: transparent;
  color: #6c757d;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #6c757d;
    color: white;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`,zr=M.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border: 1px solid #007bff;
  border-radius: 12px;
  background: white;
`,Mr=M.input`
  border: none;
  outline: none;
  font-size: 12px;
  background: transparent;
  min-width: 80px;
  max-width: 200px;

  &::placeholder {
    color: #999;
  }
`,We=M.button`
  border: none;
  background: transparent;
  color: #007bff;
  font-size: 10px;
  cursor: pointer;
  padding: 2px 4px;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background: #007bff;
    color: white;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`,Br=M.span`
  background: #6c757d;
  color: white;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: bold;
`,Ur=({tag:e,isSelected:n,isDisplayed:o,isBeingDeleted:$,disabled:p,onTagClick:I,onDeleteTag:c,getTagDisplayText:f})=>{const[g,T]=S.useState(!1);return t.jsxs(Ye,{$isSelected:n,$isDisplayed:o,$isBeingDeleted:$,disabled:p,onClick:()=>I(e),onMouseEnter:()=>T(!0),onMouseLeave:()=>T(!1),children:[f(e),g&&!p&&!$&&t.jsx(Xe,{onClick:j=>{j.stopPropagation(),c(e.id)},disabled:$,children:"×"})]})},Wr=({subtag:e,isSelected:n,isBeingDeleted:o,disabled:$,onSubtagClick:p,onDeleteSubtag:I})=>{const[c,f]=S.useState(!1);return t.jsxs(Rr,{$isSelected:n,$isBeingDeleted:o,disabled:$,onClick:()=>p(e),onMouseEnter:()=>f(!0),onMouseLeave:()=>f(!1),children:[e.subtagTitle,c&&!$&&!o&&t.jsx(Xe,{onClick:g=>{g.stopPropagation(),I(e.id)},disabled:o,children:"×"})]})},et=({value:e,onChange:n,onSubmit:o,onCancel:$,isSubmitting:p,placeholder:I="Enter tag name..."})=>{const c=S.useRef(null);S.useEffect(()=>{c.current&&c.current.focus()},[]);const f=g=>{g.key==="Enter"?o():g.key==="Escape"&&$()};return t.jsxs(zr,{children:[t.jsx(Mr,{ref:c,type:"text",value:e,onChange:g=>n(g.target.value),onKeyDown:f,placeholder:I,disabled:p}),t.jsx(We,{onClick:o,disabled:!e.trim()||p,title:"Add (Enter)",children:p?"...":"✓"}),t.jsx(We,{onClick:$,disabled:p,title:"Cancel (Escape)",children:"×"})]})},Kr=({tagsManager:e,disabled:n=!1,enhancedLog:o,photoCount:$=1})=>{const{tags:p,selectedTags:I,displayedTagId:c,isLoadingTags:f,tagIdBeingDeleted:g,isAddingNewTag:T,newTagTitle:j,isSubmittingNewTag:u,selectTag:i,unselectTag:H,setDisplayedTag:q,isTagSelected:C,deleteTag:r,startAddingNewTag:Z,cancelAddingNewTag:X,submitNewTag:L,setNewTagTitle:V}=e,ae=x=>{if(n)return;const W=C(x),z=c===x.id;W?W&&!z?(q(x.id),o(`Displayed tag: ${x.tagTitle}`)):W&&z&&(H(x),q(null),o(`Unselected tag: ${x.tagTitle}`)):(i(x),q(x.id),o(`Selected tag for photo application: ${x.tagTitle}`))},_=async x=>{if(n)return;o(`Delete tag initiated: ${x}`);const W=await r(x);o(W?`Tag successfully deleted: ${x}`:`Failed to delete tag: ${x}`)},l=async()=>{await L()||o("Failed to submit new tag")},B=x=>{const W=I.find(ee=>ee.tagTitle===x.tagTitle);if(!W||W.subtags.length===0)return x.tagTitle;const z=W.subtags.map(ee=>ee.subtagTitle).join(" || ");return`${x.tagTitle}  |  ${z}`},E=[...p].sort((x,W)=>x.points!==W.points?W.points-x.points:W.updatedAt-x.updatedAt);return t.jsxs(Nr,{children:[t.jsxs(Je,{children:[t.jsxs(Qe,{children:["Select Tags to Apply to Photos",I.length>0&&t.jsxs(Br,{children:[I.length," selected"]})]}),t.jsx(Ve,{children:f?t.jsx(Or,{children:"Loading tags..."}):t.jsxs(t.Fragment,{children:[E.map(x=>t.jsx(Ur,{tag:x,isSelected:C(x),isDisplayed:c===x.id,isBeingDeleted:g===x.id,disabled:n,onTagClick:ae,onDeleteTag:_,getTagDisplayText:B},x.id)),T?t.jsx(et,{value:j,onChange:V,onSubmit:l,onCancel:X,isSubmitting:u,placeholder:"Enter tag name..."}):t.jsx(Le,{disabled:n,onClick:Z,children:"+ Add Tag"}),E.length===0&&!T&&t.jsx(Ze,{children:"No tags available"})]})})]}),c&&t.jsx(Gr,{tagsManager:e,disabled:n,enhancedLog:o}),I.length>0&&t.jsxs("div",{style:{marginTop:"12px",padding:"12px 16px",background:"#e7f3ff",borderRadius:"6px",fontSize:"13px",color:"#0c5aa6",border:"1px solid #b3d9ff"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"6px"},children:[t.jsx("span",{children:"🎯"}),t.jsx("strong",{children:"Ready to Apply Tags:"})]}),"You have selected ",t.jsxs("strong",{children:[I.length," tag",I.length!==1?"s":""]})," to apply to photos.",t.jsx("br",{}),t.jsx("strong",{children:"Next:"})," ",$===1?'Click "Apply Selected Tags to Photo" above to tag your photo.':`Select photos above (they'll show blue borders), then click "Apply Selected Tags to Photos".`]})]})},Gr=({tagsManager:e,disabled:n=!1,enhancedLog:o})=>{var _;const{displayedTagId:$,subtagIdBeingDeleted:p,isAddingNewSubtag:I,newSubtagTitle:c,isSubmittingNewSubtag:f,selectSubtag:g,unselectSubtag:T,isSubtagSelected:j,deleteSubtag:u,startAddingNewSubtag:i,cancelAddingNewSubtag:H,submitNewSubtag:q,setNewSubtagTitle:C}=e,r=$?((_=e.tags.find(l=>l.id===$))==null?void 0:_.subtags)||[]:[],Z=e.tags.find(l=>l.id===$),X=l=>{if(n)return;j(l)?(T(l),o(`Unselected subtag for photo application: ${l.subtagTitle}`)):(g(l),o(`Selected subtag for photo application: ${l.subtagTitle}`))},L=async l=>{if(n)return;o(`Delete subtag initiated: ${l}`);const B=await u(l);o(B?`Subtag successfully deleted: ${l}`:`Failed to delete subtag: ${l}`)},V=async()=>{await q()||o("Failed to submit new subtag")};if(!Z)return null;const ae=[...r].sort((l,B)=>l.points!==B.points?B.points-l.points:B.updatedAt-l.updatedAt);return t.jsxs(Je,{children:[t.jsxs(Qe,{children:['Subtags for "',Z.tagTitle,'"']}),t.jsxs(Ve,{children:[ae.map(l=>t.jsx(Wr,{subtag:l,isSelected:j(l),isBeingDeleted:p===l.id,disabled:n,onSubtagClick:X,onDeleteSubtag:L},l.id)),I?t.jsx(et,{value:c,onChange:C,onSubmit:V,onCancel:H,isSubmitting:f,placeholder:"Enter subtag name..."}):t.jsx(Le,{disabled:n,onClick:i,children:"+ Add Subtag"}),ae.length===0&&!I&&t.jsx(Ze,{children:"No subtags available"})]})]})},qr=({children:e,t:n,isRTL:o})=>t.jsxs("div",{style:{padding:"24px",marginBottom:"24px",backgroundColor:"#f8f9fa",border:"2px solid #e9ecef",borderRadius:"12px",direction:o?"rtl":"ltr"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",fontSize:"18px",color:"#495057",fontWeight:"600",marginBottom:"20px",flexDirection:o?"row-reverse":"row"},children:[t.jsx("span",{style:{marginRight:o?"0":"12px",marginLeft:o?"12px":"0",fontSize:"20px"},children:"📷"}),n("Click files below to select them for tagging")]}),e]}),Hr=({selectedPhotos:e,selectedPhotoIndices:n,onToggleSelection:o,onSelectAll:$,onDeselectAll:p,onRemovePhoto:I,onDeleteAll:c,disabled:f,t:g,isRTL:T})=>e.length===0?null:t.jsxs("div",{style:{marginBottom:"24px",direction:T?"rtl":"ltr"},children:[t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",flexDirection:T?"row-reverse":"row"},children:[t.jsxs("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:[g("New Files")," (",e.length,")"]}),t.jsxs("div",{style:{display:"flex",gap:"8px",flexDirection:T?"row-reverse":"row"},children:[t.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:f?"#f8f9fa":"#fff",color:f?"#999":"#333",cursor:f?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:n.size===e.length?p:$,disabled:f,onMouseEnter:j=>{f||(j.currentTarget.style.backgroundColor="#f8f9fa")},onMouseLeave:j=>{f||(j.currentTarget.style.backgroundColor="#fff")},children:n.size===e.length?g("Deselect All"):g("Select All")}),t.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #dc3545",borderRadius:"4px",backgroundColor:f?"#f8f9fa":"#fff",color:f?"#999":"#dc3545",cursor:f?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:c,disabled:f,onMouseEnter:j=>{f||(j.currentTarget.style.backgroundColor="#dc3545",j.currentTarget.style.color="#fff")},onMouseLeave:j=>{f||(j.currentTarget.style.backgroundColor="#fff",j.currentTarget.style.color="#dc3545")},children:g("Delete All")})]})]}),t.jsx(Pr,{selectedPhotos:e,selectedPhotoIndices:n,isSavingAlbum:f,onRemovePhoto:I,onTogglePhotoSelection:o,onSelectAllPhotos:$,onDeselectAllPhotos:p,hideHeader:!0})]}),Jr=({existingFiles:e,selectedExistingIndices:n,onToggleSelection:o,onSelectAll:$,onDeselectAll:p,onDeleteFile:I,disabled:c,t:f,isRTL:g})=>e.length===0?null:t.jsxs("div",{style:{marginBottom:"24px",direction:g?"rtl":"ltr"},children:[t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",flexDirection:g?"row-reverse":"row"},children:[t.jsxs("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:[f("Existing Files")," (",e.length,")"]}),t.jsx("div",{style:{display:"flex",gap:"8px",flexDirection:g?"row-reverse":"row"},children:t.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:c?"#f8f9fa":"#fff",color:c?"#999":"#333",cursor:c?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:n.size===e.length?p:$,disabled:c,onMouseEnter:T=>{c||(T.currentTarget.style.backgroundColor="#f8f9fa")},onMouseLeave:T=>{c||(T.currentTarget.style.backgroundColor="#fff")},children:n.size===e.length?f("Deselect All"):f("Select All")})})]}),t.jsx("div",{style:{display:"flex",overflowX:"auto",gap:"12px",padding:"16px",border:"2px dashed #007bff",borderRadius:"8px",backgroundColor:"#fff",scrollbarWidth:"thin",scrollbarColor:"#007bff #f8f9fa"},children:e.map((T,j)=>t.jsxs("div",{style:{position:"relative",width:"160px",height:"160px",flexShrink:0,borderRadius:"8px",overflow:"hidden",border:n.has(j)?"3px solid #007bff":"2px solid #ddd",cursor:c?"not-allowed":"pointer",opacity:c?.6:1,transition:"all 0.2s ease"},onClick:()=>!c&&o(j),children:[t.jsx(tr,{thumbnailDataKey:T.thumbnailDataKey,dataKey:T.dataKey,alt:f("Existing file"),style:{width:"100%",height:"100%",objectFit:"cover"}}),n.has(j)&&t.jsx("div",{style:{position:"absolute",bottom:"8px",left:"8px",right:"8px",background:"rgba(0, 123, 255, 0.9)",color:"white",padding:"4px 8px",borderRadius:"4px",fontSize:"11px",fontWeight:"bold",textAlign:"center",zIndex:10},children:"SELECTED FOR TAGGING"}),t.jsx("button",{onClick:u=>{u.stopPropagation(),!c&&confirm(f("Are you sure you want to remove this file?"))&&I(j)},disabled:c,style:{position:"absolute",top:"8px",right:"8px",width:"24px",height:"24px",borderRadius:"50%",border:"none",backgroundColor:"rgba(220, 53, 69, 0.9)",color:"white",cursor:c?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px",fontWeight:"900",zIndex:20,opacity:c?.5:1,transition:"all 0.2s ease",boxShadow:"0 2px 4px rgba(0,0,0,0.3)",lineHeight:"1"},onMouseEnter:u=>{c||(u.currentTarget.style.backgroundColor="rgba(200, 35, 51, 1)",u.currentTarget.style.transform="scale(1.1)")},onMouseLeave:u=>{c||(u.currentTarget.style.backgroundColor="rgba(220, 53, 69, 0.9)",u.currentTarget.style.transform="scale(1)")},title:f("Remove file"),children:"×"}),T.dataInBytes>0&&t.jsxs("div",{style:{position:"absolute",bottom:"4px",left:"4px",backgroundColor:"rgba(0,0,0,0.7)",color:"white",fontSize:"10px",padding:"2px 4px",borderRadius:"4px"},children:[(T.dataInBytes/(1024*1024)).toFixed(1),"MB"]}),T.durationInSeconds&&t.jsxs("div",{style:{position:"absolute",top:"8px",left:"8px",backgroundColor:"rgba(0,0,0,0.7)",color:"white",fontSize:"10px",padding:"2px 4px",borderRadius:"4px"},children:[Math.floor(T.durationInSeconds/60),":",String(Math.floor(T.durationInSeconds%60)).padStart(2,"0")]})]},`existing-${j}-${T.dataKey}`))})]}),Qr=()=>{const{t:e,language:n}=Ke(),o=Ie(n)==="rtl",$=Yt(e),{setShowUsernamePrompt:p,setUsernameInput:I}=$,[c,f]=S.useState(null),[g,T]=S.useState(!1),[j,u]=S.useState(0),[i,H]=S.useState(""),[q,C]=S.useState(""),[r,Z]=S.useState(!1),[X,L]=S.useState(!1),[V,ae]=S.useState("NoPassword"),[_,l]=S.useState(""),[B,E]=S.useState(!1),[x,W]=S.useState(!0),[z,ee]=S.useState(null),[fe,h]=S.useState(!1),[y,N]=S.useState([]),[b,D]=S.useState(new Set),[v,F]=S.useState(new Map),[P,U]=S.useState([]),[J,oe]=S.useState(new Set),[ie,pe]=S.useState(new Map),[ce,ue]=S.useState(!1),be=a=>{!c&&a&&f(a)},{fileInputRef:s,selectedPhotos:m,setSelectedPhotos:k,isUploading:Q,progressTracker:K,setProgressTracker:re,debugMessages:te,currentFolderId:Y,openFilePicker:le,handleFileSelection:xe,setEditingExistingAlbum:ge,log:Se}=Zt(be,!0);S.useEffect(()=>{(async()=>{try{await Dt(),Se("🔥 Save-album page S3 credentials prewarmed successfully")}catch(w){Se(`⚠️ Save-album page credential prewarming failed: ${String(w)}`)}})()},[]);const A=(a,w)=>{let O=`[${new Date().toISOString()}] ${a}`;if(w!==void 0)try{const G=typeof w=="object"?JSON.stringify(w,null,2):String(w);O+=`
Data: ${G}`,console.log(O),console.log("Data object:",w)}catch(G){O+=` [Error stringifying data: ${G}]`,console.log(O),console.log("Raw data:",w)}else console.log(O);Se(O)},tt=async a=>{var w,R,O,G;if(a){ue(!0),A(`Fetching existing album data for folder ID: ${a}`);try{const se=await de();if(!se){A("❌ Authentication failed while fetching existing album data");return}const $t=`
        mutation FetchRelations($fetchRelationsInput: FetchRelationsInput!) {
          fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
            items {
              ... on FolderPosition {
                ${er}
              }
            }
          }
        }
      `,Tt={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}},ye=await(await fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${se}`},body:JSON.stringify({query:$t,variables:Tt})})).json();if(ye.errors){console.error("GraphQL errors:",ye.errors),A(`❌ Failed to fetch existing album data: ${JSON.stringify(ye.errors)}`);return}const Ce=(((R=(w=ye==null?void 0:ye.data)==null?void 0:w.fetchRelations)==null?void 0:R.items)||[]).find(ne=>ne&&ne.folder&&ne.folder.id===a);if(!Ce)return;const he=Ce.folder,De=(((G=(O=he==null?void 0:he.fileReferencesPage)==null?void 0:O.items)==null?void 0:G.map(ne=>ne.file))||[]).filter(ne=>ne&&ne.dataKey).map(ne=>({dataKey:ne.dataKey,thumbnailDataKey:ne.thumbnailDataKey||null,durationInSeconds:ne.durationInSeconds||null,dataInBytes:ne.dataInBytes||0}));U(De),A(`✅ Successfully loaded ${De.length} existing files`),!i&&he.folderName&&H(he.folderName),!q&&he.folderDescription&&C(he.folderDescription),ge(a)}catch(se){console.error("Failed to fetch existing album data:",se),A(`❌ Failed to fetch existing album data: ${String(se)}`)}finally{ue(!1)}}};S.useEffect(()=>{c&&c!==Y&&(A(`Loading existing files for folder ID: ${c}`),tt(c))},[c,Y]);const rt=Er(A),{cognitoUsername:ke,publicUsername:$e,setPublicUsername:st}=vr(f,k,ee,Z,H,C,E,W,ae,l,h,N,A),{saveAlbumDirectly:je}=Ir(c||Y,ke,m,fe,y,i,q,B,x,V,_,v,T,u,k,re,A);S.useEffect(()=>{Y&&!c&&(f(Y),A(`Updated folder ID from upload processor: ${Y}`))},[Y,c]),S.useEffect(()=>{D(a=>{const w=new Set;return a.forEach(R=>{R<m.length&&w.add(R)}),w}),F(a=>{const w=new Map(a),R=[];return a.forEach((O,G)=>{G>=m.length&&R.push(G)}),R.forEach(O=>{w.delete(O)}),w})},[m.length]),S.useEffect(()=>{oe(a=>{const w=new Set;return a.forEach(R=>{R<P.length&&w.add(R)}),w}),pe(a=>{const w=new Map(a),R=[];return a.forEach((O,G)=>{G>=P.length&&R.push(G)}),R.forEach(O=>{w.delete(O)}),w})},[P.length]);const ot=a=>{A(`Removing photo at index: ${a}`);const w=m.filter((R,O)=>O!==a);k(w),A(`New files count: ${w.length}`),w.length>0?(localStorage.setItem(me.SELECTED_PHOTOS,JSON.stringify(w)),A(`Updated localStorage with ${w.length} photos`)):(localStorage.removeItem(me.SELECTED_PHOTOS),A("Removed photos from localStorage")),D(R=>{const O=new Set;return R.forEach(G=>{G<a?O.add(G):G>a&&O.add(G-1)}),O}),F(R=>{const O=new Map;return R.forEach((G,se)=>{se<a?O.set(se,G):se>a&&O.set(se-1,G)}),O})},it=a=>{A(`Removing existing file at index: ${a}`);const w=P.filter((R,O)=>O!==a);U(w),A(`New existing files count: ${w.length}`),oe(R=>{const O=new Set;return R.forEach(G=>{G<a?O.add(G):G>a&&O.add(G-1)}),O}),pe(R=>{const O=new Map;return R.forEach((G,se)=>{se<a?O.set(se,G):se>a&&O.set(se-1,G)}),O})},at=a=>{A(`Toggling selection for existing file at index: ${a}`),oe(w=>{const R=new Set(w);return R.has(a)?(R.delete(a),A(`Deselected existing file ${a}`)):(R.add(a),A(`Selected existing file ${a}`)),R})},nt=()=>{A("Selecting all existing files");const a=new Set;for(let w=0;w<P.length;w++)a.add(w);oe(a)},lt=()=>{A("Deselecting all existing files"),oe(new Set)},dt=a=>{A(`Toggling selection for photo at index: ${a}`),D(w=>{const R=new Set(w);return R.has(a)?(R.delete(a),A(`Deselected photo ${a}`)):(R.add(a),A(`Selected photo ${a}`)),R})},ct=()=>{A("Selecting all photos");const a=new Set;for(let w=0;w<m.length;w++)a.add(w);D(a)},ut=()=>{A("Deselecting all photos"),D(new Set)},pt=()=>{confirm(e("Are you sure you want to delete all new files? This action cannot be undone."))&&(A("Deleting all new photos"),k([]),D(new Set),F(new Map),localStorage.removeItem(me.SELECTED_PHOTOS),A("Cleared all photos from localStorage"))},ft=()=>{const a=!B;A(`Toggling isOnPublicProfile to: ${a}`),E(a)},gt=()=>{const a=!x;A(`Toggling participantsCanAddItems to: ${a}`),W(a)},mt=async()=>{A("Album save initiated"),A("Photo tags applied:",Object.fromEntries(v)),A("Existing file tags applied:",Object.fromEntries(ie)),T(!0);try{if($e!=null&&$e.startsWith("Profile-")){A("Public username starts with 'Profile-', showing username prompt"),I(""),p(!0),T(!1);return}A("Valid username found, proceeding to save album directly with file-level tagging"),je()}catch(a){console.error("Error in handleSaveAlbum:",a),A(`Error in handleSaveAlbum: ${a}`),T(!1)}},xt=a=>{A(`Handling successful username update to: ${a}`),localStorage.setItem(me.PUBLIC_USERNAME,a),st(a),p(!1),A("Proceeding to save album after username update"),je()},ht=(a,w)=>{A(`Password dialog closed with option: ${a}, password: ${w?"******":"undefined"}`),a&&ae(a),w!==void 0&&l(w),L(!1)},bt=()=>V==="NoPassword"?e("Album Password Policy"):`${e(V==="NotVisible"?"Password Required To See Or Save":V==="Watermark"?"Watermarked And No Saving Without Password":"Password Required To Save")} ${_?`(${_})`:""}`,yt=()=>{A("Opening password dialog"),L(!0)},wt=()=>{A("Add photos button clicked"),le(c)},Te=g||Q||ce,St=m.length>0||P.length>0;return t.jsxs(t.Fragment,{children:[t.jsx(qt,{}),t.jsxs(Ht,{$isRTL:o,children:[t.jsxs("div",{style:{maxWidth:"900px",margin:"0 auto"},children:[t.jsxs(Jt,{children:[t.jsx(Qt,{href:"my-albums.html",children:e("My Albums")}),t.jsx(Sr,{t:e})]}),t.jsx(kr,{showFolderDetails:r,isCreator:z,folderName:i,setFolderName:H,folderDescription:q,setFolderDescription:C,isOnPublicProfile:B,handlePublicProfileToggle:ft,participantsCanAddItems:x,handleParticipantsCanAddItemsToggle:gt,isSavingAlbum:g||Q}),(Q||K.totalFiles>0&&(K.filesUploading>0||K.filesProcessing>0||K.filesComplete<K.totalFiles))&&t.jsx(Lt,{progressTracker:K,isRTL:Ie(n)==="rtl",variant:"detailed",context:"saving",isUploading:Q,showSuccessMessage:!1,showErrorMessage:!0,customMessages:{error:e("Some photos could not be processed. You can continue with the successfully processed photos.")}}),t.jsx("input",{ref:s,id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:a=>xe(a,ke),style:{display:"none"}}),r&&z===!0&&St&&t.jsxs(qr,{t:e,isRTL:o,children:[(P.length>0||ce)&&t.jsx("div",{style:{marginBottom:"24px"},children:ce?t.jsx("div",{style:{padding:"20px",textAlign:"center",color:"#666",fontSize:"14px"},children:e("Loading existing files...")}):t.jsx(Jr,{existingFiles:P,selectedExistingIndices:J,onToggleSelection:at,onSelectAll:nt,onDeselectAll:lt,onDeleteFile:it,disabled:Te,t:e,isRTL:o})}),t.jsx(Hr,{selectedPhotos:m,selectedPhotoIndices:b,onToggleSelection:dt,onSelectAll:ct,onDeselectAll:ut,onRemovePhoto:ot,onDeleteAll:pt,disabled:Te,t:e,isRTL:o}),t.jsx("div",{style:{marginTop:"24px"},children:t.jsx(Kr,{tagsManager:rt,disabled:Te,enhancedLog:A,photoCount:m.length+P.length})})]}),t.jsx(Ar,{isSavingAlbum:g,savingProgress:j}),t.jsxs(Vt,{children:[t.jsx(ve,{onClick:wt,disabled:g||Q||ce,children:e(Q?"Uploading...":"Add More Photos")}),z===!0&&t.jsx(ve,{$passwordSet:V!=="NoPassword",onClick:yt,disabled:g||Q||ce,children:bt()}),t.jsx(ve,{$primary:!0,onClick:mt,disabled:g||Q||ce,children:e(g?"Saving Album...":"Save Album")})]}),t.jsx(Xt,{t:e,language:n,usernameManager:$,onSuccess:xt}),t.jsx(wr,{isOpen:X,onClose:ht,initialOption:V,initialPassword:_})]}),t.jsx($r,{debugMessages:te,t:e,isRTL:o,textDirection:o?"rtl":"ltr"})]})]})},Vr=()=>t.jsx(Ct,{children:t.jsx(Qr,{})});jt.createRoot(document.getElementById("root")).render(t.jsx(Vr,{}));
