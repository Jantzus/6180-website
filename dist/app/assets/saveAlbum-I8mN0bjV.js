import{d as E,u as De,a as b,j as t,g as be,h as ne,L as pe,i as $e,s as et,m as tt,f as me,k as st,l as rt,n as it,r as ot,R as at,I as nt,p as lt}from"./utils-CuQXS0Z6.js";import{C as we,F as Se,e as Te,f as dt,g as ct,T as ve,h as Ie,i as Pe,j as Ae,P as ut,k as pt,S as ft,l as gt,V as mt,m as xt,n as Fe,o as Ee,p as ht,M as bt,R as wt,q as yt,r as $t,G as St,A as Tt,H as vt,s as It,t as Pt,B as he}from"./styled-components-BoQ3gU80.js";import{u as At,U as kt}from"./useUsernameManagement-CIMgJf9K.js";import{u as _t,U as jt}from"./useFileUploadProcessor-D1hsxDoX.js";import{L as Ct,D as Dt}from"./DebugLog-xSXl2FHh.js";const a={colors:{primary:"#007bff",primaryDark:"#0056b3",secondary:"#6c757d",success:"#4caf50",danger:"#e53935",warning:"#ff9800",white:"#fff",text:{primary:"#333",secondary:"#666",light:"#777"},background:{primary:"#f9fafb",highlight:"#f0f7ff"},border:"#ddd"},spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px"},borderRadius:{small:"4px",medium:"8px"},boxShadow:{lg:"0 4px 10px rgba(0,0,0,0.08)"}},Ft=E.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
`,Et=E.div`
  background-color: ${a.colors.white};
  border-radius: ${a.borderRadius.medium};
  box-shadow: ${a.boxShadow.lg};
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
  scrollbar-color: ${a.colors.border} transparent;
  
  /* Custom scrollbar for webkit browsers */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${a.colors.border};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${a.colors.secondary};
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
    border-radius: ${a.borderRadius.small};
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
`,Nt=E.div`
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
`,Rt=E.div`
  direction: ${e=>e.$isRTL?"rtl":"ltr"};
`,Ot=E.h3`
  font-size: 24px;
  font-weight: 600;
  color: ${a.colors.text.primary};
  margin: 0 0 ${a.spacing.lg} 0;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 22px;
    margin: 0 0 ${a.spacing.md} 0;
  }
  
  @media (max-height: 700px) {
    font-size: 20px;
    margin: 0 0 ${a.spacing.md} 0;
  }
  
  @media (max-width: 480px) {
    font-size: 18px;
  }
`,zt=E.p`
  margin-bottom: ${a.spacing.lg};
  font-size: 16px;
  color: ${a.colors.text.secondary};
  line-height: 1.5;
  
  @media (max-width: 768px) {
    margin-bottom: ${a.spacing.md};
    font-size: 15px;
  }
  
  @media (max-height: 700px) {
    margin-bottom: ${a.spacing.sm};
    font-size: 14px;
  }
`,ke=E.div`
  margin-bottom: ${a.spacing.lg};
`,_e=E.label`
  display: block;
  margin-bottom: ${a.spacing.sm};
  font-size: 14px;
  font-weight: 500;
  color: ${a.colors.text.primary};
`,Ut=E.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${a.colors.border};
  border-radius: ${a.borderRadius.small};
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${a.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  &::placeholder {
    color: ${a.colors.text.light};
  }
`,Bt=E.div`
  display: flex;
  flex-direction: column;
  gap: ${a.spacing.md};
  margin-bottom: ${a.spacing.xl};
`,Mt=E.div`
  border: 2px solid ${e=>e.$isSelected?a.colors.primary:a.colors.border};
  border-radius: ${a.borderRadius.medium};
  padding: ${a.spacing.lg};
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${e=>e.$isSelected?a.colors.background.highlight:a.colors.white};
  display: flex;
  align-items: center;
  gap: ${a.spacing.lg};
  
  @media (max-width: 768px) {
    padding: ${a.spacing.md};
    gap: ${a.spacing.md};
  }
  
  @media (max-width: 480px) {
    padding: ${a.spacing.sm};
    gap: ${a.spacing.sm};
  }
  
  @media (max-height: 700px) {
    padding: ${a.spacing.sm};
    gap: ${a.spacing.sm};
  }
`,Gt=E.div`
  flex: 1;
`,Wt=E.div`
  margin-bottom: ${a.spacing.xs};
`,qt=E.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${a.colors.primary};
  flex-shrink: 0;
`,Kt=E.label`
  font-size: 16px;
  font-weight: 500;
  color: ${a.colors.text.primary};
  cursor: pointer;
  display: block;
`,Ht=E.div`
  font-size: 14px;
  color: ${a.colors.text.secondary};
  margin-top: ${a.spacing.xs};
`,Jt=E.div`
  color: ${a.colors.warning};
  font-size: 12px;
  font-style: italic;
  margin-top: ${a.spacing.xs};
  font-weight: 500;
`,Qt=E.div`
  display: flex;
  gap: ${a.spacing.sm};
  justify-content: center;
  margin-top: ${a.spacing.xl};
`,je=E.button`
  background-color: ${e=>e.$variant==="danger"?a.colors.danger:e.$variant==="secondary"?"transparent":e.$variant==="success"?a.colors.success:a.colors.primary};
  color: ${e=>e.$variant==="secondary"?a.colors.primary:a.colors.white};
  border: ${e=>e.$variant==="secondary"?`1px solid ${a.colors.primary}`:"none"};
  padding: ${e=>e.$size==="small"?"8px 16px":e.$size==="large"?"16px 32px":"12px 24px"};
  border-radius: ${a.borderRadius.medium};
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  font-size: ${e=>e.$size==="small"?"14px":e.$size==="large"?"18px":"16px"};
  font-weight: 500;
  transition: all 0.2s ease;
  opacity: ${e=>e.disabled?.6:1};
  min-width: 100px;

  &:hover:not(:disabled) {
    background-color: ${e=>e.$variant==="danger"?"#c62828":e.$variant==="secondary"?a.colors.background.highlight:e.$variant==="success"?"#388e3c":a.colors.primaryDark};
  }
`,Vt=E.div`
  background-color: ${a.colors.background.primary};
  border-radius: ${a.borderRadius.medium};
  padding: ${a.spacing.md};
  margin: ${a.spacing.md} 0;
  border-left: 4px solid ${a.colors.primary};
  font-size: 14px;
  color: ${a.colors.text.secondary};
  line-height: 1.4;
  
  @media (max-width: 768px) {
    padding: ${a.spacing.sm};
    margin: ${a.spacing.sm} 0;
    font-size: 13px;
  }
  
  @media (max-height: 700px) {
    padding: ${a.spacing.xs};
    font-size: 12px;
  }
`,Yt=[{value:"NotVisible",titleKey:"Password Required To See Or Save",descriptionKey:"Album will be completely hidden until correct password is entered"},{value:"Watermark",titleKey:"Watermarked And No Saving Without Password",descriptionKey:"Photos will be visible with watermarks, password required to save"},{value:"CannotBeSaved",titleKey:"Password Required To Save",descriptionKey:"Photos are visible but password required to download or save"},{value:"NoPassword",titleKey:"No Password",descriptionKey:"Album is fully public with no restrictions"}],Xt=({isOpen:e,onClose:l,initialOption:n="NoPassword",initialPassword:w=""})=>{const{t:p,language:I}=De(),C=be(I)==="rtl",[y,S]=b.useState(n),[M,g]=b.useState(w);if(b.useEffect(()=>{e&&(S(n),g(w))},[e,n,w]),!e)return null;const U=M.trim()==="",i=P=>{S(P)},K=P=>{P.target===P.currentTarget&&l()},W=P=>P!=="NoPassword";return t.jsxs(t.Fragment,{children:[t.jsx(Ft,{onClick:K}),t.jsx(Et,{children:t.jsx(Nt,{children:t.jsxs(Rt,{$isRTL:C,children:[t.jsx(Ot,{children:p("Album Password Policy")}),t.jsx(zt,{children:p("Configure password protection for your album. Choose how you want to restrict access to your photos.")}),t.jsxs(ke,{children:[t.jsx(_e,{children:p("Enter Password")}),t.jsx(Ut,{type:"text",placeholder:p("Enter password (optional)"),value:M,onChange:P=>g(P.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"})]}),t.jsxs(ke,{children:[t.jsx(_e,{children:p("Select Protection Level")}),t.jsx(Bt,{children:Yt.map(P=>t.jsxs(Mt,{$isSelected:y===P.value,onClick:()=>i(P.value),children:[t.jsx(qt,{type:"radio",name:"protection",checked:y===P.value,onChange:()=>i(P.value)}),t.jsxs(Gt,{children:[t.jsx(Wt,{children:t.jsx(Kt,{children:p(P.titleKey)})}),t.jsx(Ht,{children:p(P.descriptionKey)}),U&&W(P.value)&&y===P.value&&t.jsx(Jt,{children:p('⚠️ Will use "password" as default if left empty')})]})]},P.value))})]}),W(y)&&t.jsxs(Vt,{children:[t.jsx("strong",{children:p("💡 Password Protection Info:")}),t.jsx("br",{}),p('If you leave the password field empty, "password" will be used as the default password. You can change this anytime in album settings.')]}),t.jsxs(Qt,{children:[t.jsx(je,{$variant:"secondary",onClick:()=>l(),children:p("Cancel")}),t.jsx(je,{$variant:"primary",onClick:()=>{const P=U&&W(y)?"password":M;console.log(`Saving with option: ${y}, password: ${P.length>0?"********":"none"}`),l(y,P)},children:p("Save Settings")})]})]})})})]})},Zt=`
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
`,Lt=(e,l,n,w,p,I,C,y,S,M,g,U,i)=>{const[K,W]=b.useState(null),[P,s]=b.useState(null),Y=async A=>{i(`Initializing folder ID with username: ${A}`);try{const N=new URLSearchParams(window.location.search).get("folderId");if(i(`Folder ID from URL: ${N||"null"}`),N){e(N),i(`Using existing folder ID: ${N}`);try{i(`Fetching details for folder: ${N}`);const k=await Q(N,i);if(i("Folder details retrieved:",k),k){const d=`${A}_____${A}____Account`,R=k.creatorId===d;if(i(`User is creator of folder: ${R}, accountId: ${d}, creator: ${k.creatorId}`),n(R),R){i("User is creator, showing folder details"),w(!0),p(k.folderName),I(k.folderDescription),C(k.isOnPublicProfile),i(`Setting isOnPublicProfile: ${k.isOnPublicProfile}`),k.participantsCanAddItems!==void 0&&(y(k.participantsCanAddItems),i(`Setting participantsCanAddItems: ${k.participantsCanAddItems}`));const D=k.passwordPolicy;i(`Password policy from folder details: ${D}`),S(D),D!=="NoPassword"&&k.password&&M(k.password),i(`Set password protection option to: ${D}`)}else i("User is NOT the creator, hiding editable fields"),w(!1)}else i("No folder details retrieved, setting isCreator to true"),n(!0),w(!0)}catch(k){console.error("Error fetching folder details:",k),i(`Error fetching folder details: ${k}`),n(!1)}}else{const k=`${A}_____${$e()}____Folder`;i(`Creating new folder ID: ${k}`),e(k),i("Setting isCreator to true for new album"),n(!0),w(!0)}}catch(o){console.error("Folder ID initialization error:",o),i(`Folder ID initialization error: ${o}`),n(!1)}},Q=async(A,o)=>{var N,k,d,R,D,Z,ce,c;o(`Fetching details for folder ID: ${A}`);try{const f=await ne();if(!f)return o("No token available for fetching folder details"),null;o("Sending GraphQL query to fetch folder details");const u=await(await fetch(me,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${f}`},body:JSON.stringify({query:Zt,variables:{folderIds:[A],fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(o("Folder details API response:",u),u.errors)return console.error("GraphQL errors:",u.errors),o(`GraphQL errors: ${JSON.stringify(u.errors)}`),null;const v=((k=(N=u==null?void 0:u.data)==null?void 0:N.fetchFolders)==null?void 0:k.items)||[];if(o(`Found ${v.length} folder items`),v.length===0)return o("No folder items found"),null;const x=v[0];o("Retrieved folder data:",x);const j=((R=(d=x.folderPosition)==null?void 0:d.profileIds)==null?void 0:R.some(O=>O.includes("Public____Profile")))||!1;o(`Folder is on public profile: ${j}`),o("Profile IDs:",(D=x.folderPosition)==null?void 0:D.profileIds);const F=(Z=x.folderInviteParameters)==null?void 0:Z.usingFolderInviteGrantsRightToAddItems;return o(`Participants can add items: ${F}`),{creatorId:x.creatorId||"",folderName:x.folderName||"",folderDescription:x.folderDescription||"",passwordPolicy:((ce=x.folderPassword)==null?void 0:ce.policy)||"NoPassword",password:((c=x.folderPassword)==null?void 0:c.password)||"",isOnPublicProfile:j,participantsCanAddItems:F!==void 0?F:!0}}catch(f){return console.error("Error in fetchFolderDetails:",f),o(`Error in fetchFolderDetails: ${f}`),null}},X=()=>{i("Attempting to restore photos from localStorage");try{const A=localStorage.getItem(pe.SELECTED_PHOTOS);if(i(`Found stored photos: ${A?"yes":"no"}`),A)try{const o=JSON.parse(A);i(`Parsed ${o.length} photos from localStorage`),Array.isArray(o)&&o.length>0&&(l(o),i(`Restored ${o.length} photos to state`))}catch(o){console.error("Error parsing stored photos:",o),i(`Error parsing stored photos: ${o}`)}}catch(A){console.error("Error restoring photos from storage:",A),i(`Error restoring photos from storage: ${A}`)}},H=()=>{i("Testing S3 connection");try{et?i("S3 client is available"):(console.error("S3 client not available"),i("S3 client not available"))}catch(A){console.error("S3 connection test error:",A),i(`S3 connection test error: ${A}`)}},re=async()=>{var A;i("Starting component initialization");try{i("Checking login with refresh");const o=await ne();if(!o){i("No token returned from login check, aborting initialization");return}try{const N=localStorage.getItem(pe.PUBLIC_USERNAME);i(`Retrieved public username from localStorage: ${N||"null"}`),s(N||null);const d=JSON.parse(atob(o.split(".")[1]))["cognito:username"];if(d){i(`Extracted Cognito username from token: ${d}`),W(d);const R=localStorage.getItem(pe.SUB_ALBUM_DATA);if(i(`Sub-album data from localStorage: ${R||"null"}`),R)try{const D=JSON.parse(R);if(i("Parsed sub-album data:",D),D.isSubAlbum&&((A=D.selectedFileIds)==null?void 0:A.length)>0){i(`Valid sub-album data found with ${D.selectedFileIds.length} files`),g(!0),U(D.selectedFileIds),D.selectedPhotos&&D.selectedPhotos.length>0&&(i(`Found ${D.selectedPhotos.length} selected photos in sub-album data`),l(D.selectedPhotos)),w(!0),n(!0);const Z=`${d}_____${$e()}____Folder`;i(`Generated new folder ID for sub-album: ${Z}`),e(Z)}else i("Invalid sub-album data, proceeding with normal initialization"),await Y(d)}catch(D){console.error("Error parsing sub-album data:",D),i(`Error parsing sub-album data: ${D}`),await Y(d)}else i("No sub-album data found, proceeding with normal folder initialization"),await Y(d)}else i("No Cognito username found in token")}catch(N){console.error("User data initialization error:",N),i(`User data initialization error: ${N}`)}X(),H(),i("Component initialization completed")}catch(o){console.error("Initialization error:",o),i(`Initialization error: ${o}`)}};return b.useEffect(()=>{re()},[]),{cognitoUsername:K,publicUsername:P,setPublicUsername:s}},es=(e,l,n,w,p,I,C,y,S,M,g,U,i,K,W,P,s)=>{const Y=c=>(s(`Converting ${c.length} tags to API format`),c.map(f=>({TagType:f.TagType,tagTitle:f.tagTitle,selectedSubtagInputs:f.subtags.map(_=>({TagType:f.TagType,tagTitle:_.tagTitle,subtagTitle:_.subtagTitle}))}))),Q=c=>{s(`Save progress text: ${c}`);const f=document.getElementById("saveProgressText");f&&(f.innerText=c)},X=c=>{const f=document.getElementById("saveProgress");f?(f.style.width=`${c}%`,s(`Updated save progress bar: ${c}%`)):s("Progress bar element not found"),K(c)},H=(c,f)=>{s(`Splitting array of ${c.length} items into chunks of ${f}`);const _=[];for(let u=0;u<c.length;u+=f)_.push(c.slice(u,u+f));return s(`Created ${_.length} chunks`),_},re=c=>{const f=new Set;return c.filter(_=>f.has(_.fileId)?(s(`Skipping duplicate file reference with ID: ${_.fileId}`),!1):(f.add(_.fileId),!0))},A=(c,f,_)=>{s("Creating folder position input WITHOUT folder-level tags"),s(`Profile visibility: ${y?"Public":"Only Me"}`);const u=y?[`${l}_____Public____Profile`]:["Only Me_____Only Me____Profile"];s(`Profile IDs: ${JSON.stringify(u)}`);let v=[];w&&p.length>0&&(s(`Creating file reference IDs for ${p.length} sub-album files`),v=p.map(O=>{const B=O.split("_____");if(B.length>=2){const q=B[1].split("____")[0],te=`${_}_____${q}____FileReference`;return s(`Created file reference ID for sub-album: ${te}`),te}return s(`Using original fileId as fallback: ${O}`),O})),s(`Created ${v.length} acceptedFileReferenceIds`);const x=M!=="NoPassword"?g:null;if(s(`Password protection: ${M}`),s(`Album password: ${x?"******":"null"}`),s(`Participants can add items: ${S}`),!e)throw s("Error: folderId is null or undefined"),new Error("folderId is required to create folder position input");const j=st(e),F=rt(j);return{currentTime:c,folderId:e,profileIds:u,folderPositionPoints:1,acceptedFileReferenceIds:v,folderInput:{folderAboutContactIds:[f],albumNanoId:F,folderName:I,folderDescription:C,folderPasswordInput:{password:x,policy:M},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,usingFolderInviteGrantsRightToRemoveItems:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:S,addedItemsNeedFolderCreatorApproval:!1}}}},o=(c,f,_)=>(s(`Creating file reference inputs with individual photo tags for ${c.length} photos`),c.map((u,v)=>{var B;const x=U.get(v)||[],j=Y(x);if(s(`Photo ${v} (${u.fileName}): ${x.length} tags applied`),u.fileId)return s(`Using existing fileId for photo: ${u.fileId}`),{fileReferencesHolderId:e,currentTime:f,points:1,hasBeenDeleted:!1,selectedTagInputs:j,fileId:u.fileId,fileInput:null};const F=u.type==="video"||(B=u.type)!=null&&B.startsWith("video")?`Input/Video/${u.fileName}`:`Input/Image/${u.fileName}`,O=`${l}_____${u.fileName}____File`;return s(`Created file reference for ${u.fileName}:`),s(`  - dataKey: ${F}`),s(`  - fileId: ${O}`),s(`  - thumbnailDataKey: ${u.thumbnailDataKey||"undefined"}`),s(`  - size: ${u.size}`),s(`  - thumbnailSize: ${u.thumbnailSize||0}`),s(`  - duration: ${u.duration||"undefined"}`),s(`  - tags: ${x.length} tags selected for this photo`),{fileReferencesHolderId:e,currentTime:f,points:1,hasBeenDeleted:!1,selectedTagInputs:j,fileId:O,fileInput:{fileId:O,ownerFileInput:{editorContactIds:[_],FileSharingOptionsEnum:"Anyone",dataKey:F,thumbnailDataKey:u.thumbnailDataKey,dataInBytes:u.size,thumbnailDataInBytes:u.thumbnailSize||0,s3UploadedAt:f,durationInSeconds:u.duration},editorFileInput:{aboutContactIds:[_],captionText:"",numericFilterInputs:[]}}}})),N=async c=>{var v,x;s("Sending folder-only mutation (no file references, no folder tags)");const f=await ne();if(!f)throw s("No token available for saving album, aborting"),new Error("Authentication token not available");const _=`
      mutation MyMutation($folderPositionInputs: [FolderPositionInput!]) {
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items {
            id
          }
        }
      }
    `,u={folderPositionInputs:[c]};s("GraphQL folder-only mutation variables:",u);try{s("Sending API request to save folder");const j=await fetch(me,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${f}`},body:JSON.stringify({query:_,variables:u})});s(`API response status: ${j.status}`);const F=await j.text();s(`API response raw text: ${F}`);const O=JSON.parse(F);if(s("API response JSON:",O),O.errors)throw console.error("Folder save failed:",O.errors),s("Folder save failed with errors:",O.errors),new Error("Failed to save folder");return s("Folder saved successfully"),((x=(v=O.data)==null?void 0:v.changeFiles)==null?void 0:x.items)||[]}catch(j){throw console.error("Error in sendFolderOnlyMutation:",j),s(`Error in sendFolderOnlyMutation: ${j}`),j}},k=async c=>{var v,x,j,F,O;s(`Sending file references-only mutation with ${c.length} items (each with individual tags)`);const f=await ne();if(!f)throw s("No token available for saving file references, aborting"),new Error("Authentication token not available");const _=`
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
    `,u={updatedFileReferenceInputs:c};s("GraphQL file references-only mutation variables (first item):",c.length>0?c[0]:"No items");try{s("Sending API request to save file references with individual tags");const B=await fetch(me,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${f}`},body:JSON.stringify({query:_,variables:u})});s(`API response status: ${B.status}`);const ae=await B.text();s(`API response raw text: ${ae.substring(0,500)}...`);const q=JSON.parse(ae);if(s("API response JSON items count:",((j=(x=(v=q.data)==null?void 0:v.changeFiles0)==null?void 0:x.items)==null?void 0:j.length)||0),q.errors)throw console.error("File references save failed:",q.errors),s("File references save failed with errors:",q.errors),new Error("Failed to save file references");return s("File references chunk saved successfully with individual photo tags"),((O=(F=q.data)==null?void 0:F.changeFiles0)==null?void 0:O.items)||[]}catch(B){throw console.error("Error in sendFileReferencesOnlyMutation:",B),s(`Error in sendFileReferencesOnlyMutation: ${B}`),B}},d=async(c,f)=>{var x,j,F,O,B,ae,q,te,ge;s(`Sending final chunk with folder mutation (${c.length} file references, no folder tags)`);const _=await ne();if(!_)throw s("No token available for saving final chunk, aborting"),new Error("Authentication token not available");const u=`
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
    `,v={folderPositionInputs:[f],updatedFileReferenceInputs:c};s("GraphQL final mutation variables (folder + last chunk, no folder tags)");try{s("Sending API request for final save with folder (no folder tags)");const le=await fetch(me,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${_}`},body:JSON.stringify({query:u,variables:v})});s(`API response status: ${le.status}`);const de=await le.text();s(`API response raw text: ${de.substring(0,500)}...`);const r=JSON.parse(de);if(s("API response JSON:",{fileReferencesCount:((F=(j=(x=r.data)==null?void 0:x.changeFiles0)==null?void 0:j.items)==null?void 0:F.length)||0,folderItems:((B=(O=r.data)==null?void 0:O.changeFiles)==null?void 0:B.items)||[]}),r.errors)throw console.error("Final save failed:",r.errors),s("Final save failed with errors:",r.errors),new Error("Failed to complete album save");return s("Final chunk and folder saved successfully (with individual photo tags)"),{fileReferences:((q=(ae=r.data)==null?void 0:ae.changeFiles0)==null?void 0:q.items)||[],folderPositions:((ge=(te=r.data)==null?void 0:te.changeFiles)==null?void 0:ge.items)||[]}}catch(le){throw console.error("Error in sendFinalChunkWithFolderMutation:",le),s(`Error in sendFinalChunkWithFolderMutation: ${le}`),le}},R=async()=>(s("Validating required data"),await ne()?l?e?(s("All required data validated successfully"),!0):(s("No folder ID, validation failed"),!1):(s("No Cognito username, validation failed"),!1):(s("No token available, validation failed"),!1)),D=()=>{s("Handling successful save"),it(W,P,[pe.SELECTED_PHOTOS,pe.SUB_ALBUM_DATA],s),s("Album data cleared");const c=document.getElementById("saveProgressText");c&&(c.innerText="Album saved successfully!",s("Updated progress text to 'Album saved successfully!'")),sessionStorage.setItem("album_just_saved","true"),s("Set 'album_just_saved' flag in sessionStorage"),s("Setting timeout for redirect to my-albums.html"),setTimeout(()=>{s("Redirecting to my-albums.html"),ot("my-albums.html")},1e3)},Z=async(c,f)=>{s("Starting chunked save process (individual photo tags, no folder tags)");try{Q("Processing files in chunks...");const _=48;if(f.length===0)s("No file references to process, saving only folder position (no folder tags)"),await N(c);else{const u=re(f);s(`After removing duplicates, processing ${u.length} unique file references`);const v=H(u,_);s(`Split file references into ${v.length} chunks of max size ${_}`);for(let x=0;x<v.length;x++){const j=v[x];s(`Processing chunk ${x+1} of ${v.length} with ${j.length} file references`);const F=x/v.length*80;K(10+F),X(10+F),x<v.length-1?(Q(`Saving files: chunk ${x+1} of ${v.length}...`),await k(j)):(Q("Finalizing album..."),await d(j,c))}}K(100),X(100),Q("Album saved successfully!"),D()}catch(_){console.error("Error in chunked save process:",_),s(`Error in chunked save process: ${_}`),Q(`Error: ${_}`),i(!1)}};return{saveAlbumDirectly:async()=>{s("Starting direct album save with individual photo tagging"),s(`Photo tags map: ${U.size} photos have tags applied`),i(!0),K(5);try{if(s("Validating required data for save"),!await R()){s("Required data validation failed, aborting save"),i(!1);return}const c=Math.floor(Date.now()/1e3),f=`${l}_____${l}____Account`,u=e.split("_____")[1].split("____")[0];s(`Save timestamp: ${c}`),s(`Account ID: ${f}`),s(`Folder ID: ${e}`),s(`Folder target item identifier: ${u}`),s("Creating folder position input (no folder tags)");const v=A(c,f,u);s("Folder position input created:",v);let x=[];const j=n.filter(F=>F.status==="complete");if(s(`Found ${j.length} valid photos with 'complete' status`),j.length>0){const F=j.filter(B=>!B.fileId);s(`Found ${F.length} new uploads to move from temp to public folder`),F.length>0&&(s("Moving files from temp to public folder"),await tt(F,X,s)),s("Creating file reference inputs for uploads with individual photo tags");const O=o(j,c,f);s(`Created ${O.length} file reference inputs for uploads`,O),x=x.concat(O)}if(w&&p.length>0){s(`Adding ${p.length} existing file references for sub-album`);const F=p.map(O=>(s(`Creating file reference for existing file ID: ${O}`),{fileReferencesHolderId:e,currentTime:c,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:O,fileInput:null}));s(`Created ${F.length} file reference inputs for existing files`,F),x=x.concat(F)}s(`Total file reference inputs: ${x.length}`),s("Sending GraphQL mutations with chunked file references (individual photo tags)"),await Z(v,x)}catch(c){console.error("Error in saveAlbumDirectly:",c),s(`Error in saveAlbumDirectly: ${c}`),i(!1)}}}},ts=({selectedPhotos:e,selectedPhotoIndices:l,isSavingAlbum:n,onRemovePhoto:w,onTogglePhotoSelection:p,onSelectAllPhotos:I,onDeselectAllPhotos:C})=>{const{t:y}=ye();if(e.length===0)return null;const S=l.size>0,M=l.size===e.length;return t.jsxs(t.Fragment,{children:[e.length>1&&t.jsxs(we,{style:{marginBottom:"16px",border:"2px solid #007bff"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px"},children:[t.jsxs("span",{style:{fontWeight:"bold",fontSize:"14px",color:"#007bff"},children:["📷 ",S?y("{{count}} photo(s) selected for tagging",{count:l.size}):y("Click photos below to select them for tagging")]}),t.jsxs("div",{style:{display:"flex",gap:"8px",marginLeft:"auto"},children:[!M&&t.jsx("button",{onClick:I,disabled:n,style:{padding:"6px 12px",border:"1px solid #007bff",borderRadius:"4px",background:"#007bff",color:"white",fontSize:"12px",cursor:"pointer",fontWeight:"bold"},children:y("Select All")}),S&&t.jsx("button",{onClick:C,disabled:n,style:{padding:"6px 12px",border:"1px solid #6c757d",borderRadius:"4px",background:"transparent",color:"#6c757d",fontSize:"12px",cursor:"pointer"},children:y("Deselect All")})]})]}),!S&&t.jsx("div",{style:{padding:"0 12px 12px 12px",fontSize:"12px",color:"#6c757d",fontStyle:"italic"},children:"💡 Click on any photo to select it for tagging. Selected photos will show a blue border and checkmark."})]}),t.jsx(ut,{children:e.map((g,U)=>{var K,W;const i=l.has(U);return t.jsxs(pt,{style:{position:"relative",cursor:e.length>1?"pointer":"default",border:i?"3px solid #007bff":"1px solid #e9ecef",borderRadius:"8px",overflow:"hidden"},onClick:()=>e.length>1&&p(U),children:[e.length>1&&t.jsx("div",{style:{position:"absolute",top:"8px",right:"8px",width:"28px",height:"28px",borderRadius:"50%",border:`3px solid ${i?"#007bff":"#ffffff"}`,background:i?"#007bff":"rgba(255, 255, 255, 0.9)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:10,boxShadow:"0 2px 4px rgba(0,0,0,0.2)",transition:"all 0.2s ease"},children:i?t.jsx("span",{style:{color:"white",fontSize:"16px",fontWeight:"bold"},children:"✓"}):t.jsx("span",{style:{color:"#6c757d",fontSize:"12px"},children:"+"})}),e.length>1&&i&&t.jsx("div",{style:{position:"absolute",bottom:"8px",left:"8px",right:"8px",background:"rgba(0, 123, 255, 0.9)",color:"white",padding:"4px 8px",borderRadius:"4px",fontSize:"11px",fontWeight:"bold",textAlign:"center",zIndex:10},children:"SELECTED FOR TAGGING"}),g.status!=="complete"&&t.jsx(ft,{$status:g.status,children:g.status==="error"?"✕":g.status==="uploading"?"↑":g.status==="processing"?"⚙️":"•"}),t.jsxs(gt,{style:{opacity:e.length===1||!i?1:.85,transition:"opacity 0.2s ease"},children:[g.type==="video"||(K=g.type)!=null&&K.startsWith("video")?t.jsx(mt,{src:g.s3PreviewUrl,controls:!0}):t.jsx(xt,{src:g.s3PreviewUrl,alt:g.fileName}),(g.status==="uploading"||g.status==="processing")&&t.jsx(Fe,{$bottom:"4px",$left:"4px",$right:"4px",$height:"4px",children:t.jsx(Ee,{$progress:g.progress,$status:g.status})})]}),t.jsxs(ht,{children:[(W=g.type)!=null&&W.startsWith("video")?y("Video"):y("Image"),g.size&&` • ${(g.size/1024/1024).toFixed(1)} MB`,g.duration&&` • ${g.duration}s`]}),g.status==="error"&&g.errorMessage&&t.jsxs(bt,{$type:"error",children:[y("Error"),": ",g.errorMessage.length>40?g.errorMessage.substring(0,37)+"...":g.errorMessage]}),t.jsx(wt,{onClick:()=>w(U),disabled:n,children:y("Remove")})]},U)})})]})},ss=({isSavingAlbum:e,savingProgress:l})=>{const{t:n}=ye();return e?t.jsxs(we,{children:[t.jsx(yt,{children:n("Saving Album")}),t.jsx($t,{id:"saveProgressText",children:n("Moving files...")}),t.jsx(Fe,{children:t.jsx(Ee,{id:"saveProgress",$progress:l/100})})]}):null},rs=({showFolderDetails:e,isCreator:l,folderName:n,setFolderName:w,folderDescription:p,setFolderDescription:I,isOnPublicProfile:C,handlePublicProfileToggle:y,participantsCanAddItems:S,handleParticipantsCanAddItemsToggle:M,isSavingAlbum:g})=>{const{t:U}=ye();return!e||l!==!0?null:t.jsxs(we,{children:[t.jsxs(Se,{children:[t.jsx(Te,{htmlFor:"folderName",children:U("Album Name (Optional)")}),t.jsx(dt,{id:"folderName",type:"text",value:n,onChange:i=>w(i.target.value),placeholder:U("Enter album name")})]}),t.jsxs(Se,{children:[t.jsx(Te,{htmlFor:"folderDescription",children:U("Album Description (Optional)")}),t.jsx(ct,{id:"folderDescription",value:p,onChange:i=>I(i.target.value),placeholder:U("Enter album description"),rows:4})]}),t.jsxs(ve,{children:[t.jsx(Ie,{children:U(C?"On Public Profile":"Not On Public Profile")}),t.jsxs(Pe,{children:[t.jsx("input",{type:"checkbox",checked:C,onChange:y,disabled:g}),t.jsx(Ae,{})]})]}),t.jsxs(ve,{children:[t.jsx(Ie,{children:U(S?"Participants Can Add Items":"Participants Cannot Add Items")}),t.jsxs(Pe,{children:[t.jsx("input",{type:"checkbox",checked:S,onChange:M,disabled:g}),t.jsx(Ae,{})]})]})]})},ye=()=>({t:(e,l)=>l&&typeof l=="object"&&"count"in l?e.replace("{{count}}",String(l.count)):e,language:"en"}),is=`
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
`,os=`
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
`,as=`
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
`,ns=`
  mutation DeleteTag($tagId: String!) {
    deleteTag(tagId: $tagId) {
      id
      hasBeenDeleted
    }
  }
`,ls=`
  mutation DeleteSubtag($subtagId: String!) {
    deleteSubtag(subtagId: $subtagId) {
      id
      hasBeenDeleted
    }
  }
`,ds=e=>{const[l,n]=b.useState([]),[w,p]=b.useState([]),[I,C]=b.useState(null),[y,S]=b.useState(!1),[M,g]=b.useState(null),[U,i]=b.useState(null),[K,W]=b.useState(!1),[P,s]=b.useState(!1),[Y,Q]=b.useState(""),[X,H]=b.useState(""),[re,A]=b.useState(!1),[o,N]=b.useState(!1),k=async()=>{var r,h;e("Fetching tags from API"),S(!0);try{const $=await ne();if(!$){e("No token available for fetching tags");return}const G=await(await fetch(me,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${$}`},body:JSON.stringify({query:is,variables:{fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(e("Tags API response:",G),G.errors){console.error("GraphQL errors:",G.errors),e(`GraphQL errors: ${JSON.stringify(G.errors)}`);return}const V=(((h=(r=G==null?void 0:G.data)==null?void 0:r.fetchRelations)==null?void 0:h.items)||[]).map(ie=>{var oe,fe;return{id:ie.id,tagTitle:ie.tagTitle,TagType:ie.TagType,points:ie.points,createdAt:ie.createdAt,updatedAt:ie.updatedAt,subtags:((fe=(oe=ie.subtags)==null?void 0:oe.items)==null?void 0:fe.map(ue=>({id:ue.id,tagTitle:ue.tagTitle,subtagTitle:ue.subtagTitle,TagType:ue.TagType,points:ue.points,createdAt:ue.createdAt,updatedAt:ue.updatedAt})))||[]}});e(`Fetched ${V.length} tags`),n(V)}catch($){console.error("Error fetching tags:",$),e(`Error fetching tags: ${$}`)}finally{S(!1)}},d=r=>{if(e(`Selecting tag for photo application: ${r.tagTitle}`),!w.find($=>$.tagTitle===r.tagTitle)){const $={tagTitle:r.tagTitle,TagType:r.TagType,subtags:[]};p(T=>[...T,$]),e(`Tag ${r.tagTitle} added to selection for photo application`)}},R=r=>{e(`Unselecting tag from photo application: ${r.tagTitle}`),p(h=>h.filter($=>$.tagTitle!==r.tagTitle)),I===r.id&&C(null)},D=r=>{e(`Selecting subtag for photo application: ${r.subtagTitle} for tag: ${r.tagTitle}`),p(h=>h.map($=>$.tagTitle===r.tagTitle&&!$.subtags.find(G=>G.subtagTitle===r.subtagTitle)?{...$,subtags:[...$.subtags,{tagTitle:r.tagTitle,subtagTitle:r.subtagTitle}]}:$))},Z=r=>{e(`Unselecting subtag from photo application: ${r.subtagTitle} for tag: ${r.tagTitle}`),p(h=>h.map($=>$.tagTitle===r.tagTitle?{...$,subtags:$.subtags.filter(T=>T.subtagTitle!==r.subtagTitle)}:$))},ce=r=>{e(`Setting displayed tag: ${r}`),C(r)},c=r=>w.some(h=>h.tagTitle===r.tagTitle),f=r=>{const h=w.find($=>$.tagTitle===r.tagTitle);return(h==null?void 0:h.subtags.some($=>$.subtagTitle===r.subtagTitle))||!1},_=()=>{if(!I)return[];const r=l.find(h=>h.id===I);return(r==null?void 0:r.subtags)||[]},u=()=>{e("Clearing all selected tags"),p([]),C(null)},v=()=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(r){const h=Math.random()*16|0;return(r=="x"?h:h&3|8).toString(16)}),x=async(r,h)=>{if(e(`Adding new tag: ${r} of type: ${h}`),!r.trim())return e("Cannot add tag with empty title"),!1;A(!0);try{if(!await ne())return e("No token available for adding tag"),!1;if(await(async()=>(e("PLACEHOLDER: Would send GraphQL mutation to add tag",{mutation:os,variables:{tagInput:{tagTitle:r.trim(),TagType:h,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(L=>setTimeout(L,500)),!0))()){const L={id:v(),tagTitle:r.trim(),TagType:h,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3),subtags:[]};return n(V=>[L,...V]),d(L),ce(L.id),Q(""),W(!1),e(`Successfully added new tag for photo application: ${r}`),!0}return!1}catch($){return console.error("Error adding new tag:",$),e(`Error adding new tag: ${$}`),!1}finally{A(!1)}},j=async(r,h,$)=>{if(e(`Adding new subtag: ${h} to tag: ${r}`),!h.trim())return e("Cannot add subtag with empty title"),!1;if(!I)return e("No displayed tag for adding subtag"),!1;N(!0);try{if(!await ne())return e("No token available for adding subtag"),!1;if(await(async()=>(e("PLACEHOLDER: Would send GraphQL mutation to add subtag",{mutation:as,variables:{subtagInput:{tagTitle:r,subtagTitle:h.trim(),TagType:$,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(V=>setTimeout(V,500)),!0))()){const V={id:v(),tagTitle:r,subtagTitle:h.trim(),TagType:$,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3)};return n(ie=>ie.map(oe=>oe.id===I?{...oe,subtags:[V,...oe.subtags||[]]}:oe)),D(V),H(""),s(!1),e(`Successfully added new subtag for photo application: ${h}`),!0}return!1}catch(T){return console.error("Error adding new subtag:",T),e(`Error adding new subtag: ${T}`),!1}finally{N(!1)}},F=async r=>{e(`Deleting tag: ${r}`),g(r);try{if(!await ne())return e("No token available for deleting tag"),!1;if(await(async()=>(e("PLACEHOLDER: Would send GraphQL mutation to delete tag",{mutation:ns,variables:{tagId:r}}),await new Promise(G=>setTimeout(G,500)),!0))()){n(L=>L.filter(V=>V.id!==r));const G=l.find(L=>L.id===r);return G&&R(G),I===r&&ce(null),e(`Successfully deleted tag: ${r}`),!0}return!1}catch(h){return console.error("Error deleting tag:",h),e(`Error deleting tag: ${h}`),!1}finally{g(null)}},O=async r=>{e(`Deleting subtag: ${r}`),i(r);try{if(!await ne())return e("No token available for deleting subtag"),!1;if(await(async()=>(e("PLACEHOLDER: Would send GraphQL mutation to delete subtag",{mutation:ls,variables:{subtagId:r}}),await new Promise(G=>setTimeout(G,500)),!0))()){let G=null;return n(L=>L.map(V=>{var oe;const ie=((oe=V.subtags)==null?void 0:oe.filter(fe=>fe.id===r?(G=fe,!1):!0))||[];return{...V,subtags:ie}})),G&&Z(G),e(`Successfully deleted subtag: ${r}`),!0}return!1}catch(h){return console.error("Error deleting subtag:",h),e(`Error deleting subtag: ${h}`),!1}finally{i(null)}},B=async(r,h)=>(e(`Placeholder: Updating tag points: ${r} to ${h}`),!1),ae=()=>{W(!0),Q("")},q=()=>{W(!1),Q("")},te=()=>{s(!0),H("")},ge=()=>{s(!1),H("")},le=async()=>Y.trim()?await x(Y,"File"):!1,de=async()=>{if(X.trim()&&I){const r=l.find(h=>h.id===I);if(r)return await j(r.tagTitle,X,r.TagType)}return!1};return b.useEffect(()=>{k()},[]),{tags:l,selectedTags:w,displayedTagId:I,isLoadingTags:y,tagIdBeingDeleted:M,subtagIdBeingDeleted:U,isAddingNewTag:K,isAddingNewSubtag:P,newTagTitle:Y,newSubtagTitle:X,isSubmittingNewTag:re,isSubmittingNewSubtag:o,fetchTags:k,selectTag:d,unselectTag:R,selectSubtag:D,unselectSubtag:Z,setDisplayedTag:ce,clearSelectedTags:u,isTagSelected:c,isSubtagSelected:f,getDisplayedTagSubtags:_,setTagIdBeingDeleted:g,setSubtagIdBeingDeleted:i,addNewTag:x,addNewSubtag:j,deleteTag:F,deleteSubtag:O,updateTagPoints:B,startAddingNewTag:ae,cancelAddingNewTag:q,startAddingNewSubtag:te,cancelAddingNewSubtag:ge,submitNewTag:le,submitNewSubtag:de,setNewTagTitle:Q,setNewSubtagTitle:H}},cs=E.div`
  margin: 16px 0;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
`,Ne=E.div`
  margin-bottom: 12px;
`,Re=E.h3`
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  display: flex;
  align-items: center;
  gap: 8px;
`,Oe=E.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  min-height: 32px;
`,ze=E.button`
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
`,us=E(ze)`
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
`,Ue=E.button`
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
`,ps=E.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
`,Be=E.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
`,Me=E.button`
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
`,fs=E.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border: 1px solid #007bff;
  border-radius: 12px;
  background: white;
`,gs=E.input`
  border: none;
  outline: none;
  font-size: 12px;
  background: transparent;
  min-width: 80px;
  max-width: 200px;

  &::placeholder {
    color: #999;
  }
`,Ce=E.button`
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
`,ms=E.span`
  background: #6c757d;
  color: white;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: bold;
`,xs=({tag:e,isSelected:l,isDisplayed:n,isBeingDeleted:w,disabled:p,onTagClick:I,onDeleteTag:C,getTagDisplayText:y})=>{const[S,M]=b.useState(!1);return t.jsxs(ze,{$isSelected:l,$isDisplayed:n,$isBeingDeleted:w,disabled:p,onClick:()=>I(e),onMouseEnter:()=>M(!0),onMouseLeave:()=>M(!1),children:[y(e),S&&!p&&!w&&t.jsx(Ue,{onClick:g=>{g.stopPropagation(),C(e.id)},disabled:w,children:"×"})]})},hs=({subtag:e,isSelected:l,isBeingDeleted:n,disabled:w,onSubtagClick:p,onDeleteSubtag:I})=>{const[C,y]=b.useState(!1);return t.jsxs(us,{$isSelected:l,$isBeingDeleted:n,disabled:w,onClick:()=>p(e),onMouseEnter:()=>y(!0),onMouseLeave:()=>y(!1),children:[e.subtagTitle,C&&!w&&!n&&t.jsx(Ue,{onClick:S=>{S.stopPropagation(),I(e.id)},disabled:n,children:"×"})]})},Ge=({value:e,onChange:l,onSubmit:n,onCancel:w,isSubmitting:p,placeholder:I="Enter tag name..."})=>{const C=b.useRef(null);b.useEffect(()=>{C.current&&C.current.focus()},[]);const y=S=>{S.key==="Enter"?n():S.key==="Escape"&&w()};return t.jsxs(fs,{children:[t.jsx(gs,{ref:C,type:"text",value:e,onChange:S=>l(S.target.value),onKeyDown:y,placeholder:I,disabled:p}),t.jsx(Ce,{onClick:n,disabled:!e.trim()||p,title:"Add (Enter)",children:p?"...":"✓"}),t.jsx(Ce,{onClick:w,disabled:p,title:"Cancel (Escape)",children:"×"})]})},bs=({tagsManager:e,disabled:l=!1,enhancedLog:n,photoCount:w=1})=>{const{tags:p,selectedTags:I,displayedTagId:C,isLoadingTags:y,tagIdBeingDeleted:S,isAddingNewTag:M,newTagTitle:g,isSubmittingNewTag:U,selectTag:i,unselectTag:K,setDisplayedTag:W,isTagSelected:P,deleteTag:s,startAddingNewTag:Y,cancelAddingNewTag:Q,submitNewTag:X,setNewTagTitle:H}=e,re=d=>{if(l)return;const R=P(d),D=C===d.id;R?R&&!D?(W(d.id),n(`Displayed tag: ${d.tagTitle}`)):R&&D&&(K(d),W(null),n(`Unselected tag: ${d.tagTitle}`)):(i(d),W(d.id),n(`Selected tag for photo application: ${d.tagTitle}`))},A=async d=>{if(l)return;n(`Delete tag initiated: ${d}`);const R=await s(d);n(R?`Tag successfully deleted: ${d}`:`Failed to delete tag: ${d}`)},o=async()=>{await X()||n("Failed to submit new tag")},N=d=>{const R=I.find(Z=>Z.tagTitle===d.tagTitle);if(!R||R.subtags.length===0)return d.tagTitle;const D=R.subtags.map(Z=>Z.subtagTitle).join(" || ");return`${d.tagTitle}  |  ${D}`},k=[...p].sort((d,R)=>d.points!==R.points?R.points-d.points:R.updatedAt-d.updatedAt);return t.jsxs(cs,{children:[t.jsxs(Ne,{children:[t.jsxs(Re,{children:["Select Tags to Apply to Photos",I.length>0&&t.jsxs(ms,{children:[I.length," selected"]})]}),t.jsx(Oe,{children:y?t.jsx(ps,{children:"Loading tags..."}):t.jsxs(t.Fragment,{children:[k.map(d=>t.jsx(xs,{tag:d,isSelected:P(d),isDisplayed:C===d.id,isBeingDeleted:S===d.id,disabled:l,onTagClick:re,onDeleteTag:A,getTagDisplayText:N},d.id)),M?t.jsx(Ge,{value:g,onChange:H,onSubmit:o,onCancel:Q,isSubmitting:U,placeholder:"Enter tag name..."}):t.jsx(Me,{disabled:l,onClick:Y,children:"+ Add Tag"}),k.length===0&&!M&&t.jsx(Be,{children:"No tags available"})]})})]}),C&&t.jsx(ws,{tagsManager:e,disabled:l,enhancedLog:n}),I.length>0&&t.jsxs("div",{style:{marginTop:"12px",padding:"12px 16px",background:"#e7f3ff",borderRadius:"6px",fontSize:"13px",color:"#0c5aa6",border:"1px solid #b3d9ff"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"6px"},children:[t.jsx("span",{children:"🎯"}),t.jsx("strong",{children:"Ready to Apply Tags:"})]}),"You have selected ",t.jsxs("strong",{children:[I.length," tag",I.length!==1?"s":""]})," to apply to photos.",t.jsx("br",{}),t.jsx("strong",{children:"Next:"})," ",w===1?'Click "Apply Selected Tags to Photo" above to tag your photo.':`Select photos above (they'll show blue borders), then click "Apply Selected Tags to Photos".`]})]})},ws=({tagsManager:e,disabled:l=!1,enhancedLog:n})=>{var A;const{displayedTagId:w,subtagIdBeingDeleted:p,isAddingNewSubtag:I,newSubtagTitle:C,isSubmittingNewSubtag:y,selectSubtag:S,unselectSubtag:M,isSubtagSelected:g,deleteSubtag:U,startAddingNewSubtag:i,cancelAddingNewSubtag:K,submitNewSubtag:W,setNewSubtagTitle:P}=e,s=w?((A=e.tags.find(o=>o.id===w))==null?void 0:A.subtags)||[]:[],Y=e.tags.find(o=>o.id===w),Q=o=>{if(l)return;g(o)?(M(o),n(`Unselected subtag for photo application: ${o.subtagTitle}`)):(S(o),n(`Selected subtag for photo application: ${o.subtagTitle}`))},X=async o=>{if(l)return;n(`Delete subtag initiated: ${o}`);const N=await U(o);n(N?`Subtag successfully deleted: ${o}`:`Failed to delete subtag: ${o}`)},H=async()=>{await W()||n("Failed to submit new subtag")};if(!Y)return null;const re=[...s].sort((o,N)=>o.points!==N.points?N.points-o.points:N.updatedAt-o.updatedAt);return t.jsxs(Ne,{children:[t.jsxs(Re,{children:['Subtags for "',Y.tagTitle,'"']}),t.jsxs(Oe,{children:[re.map(o=>t.jsx(hs,{subtag:o,isSelected:g(o),isBeingDeleted:p===o.id,disabled:l,onSubtagClick:Q,onDeleteSubtag:X},o.id)),I?t.jsx(Ge,{value:C,onChange:P,onSubmit:H,onCancel:K,isSubmitting:y,placeholder:"Enter subtag name..."}):t.jsx(Me,{disabled:l,onClick:i,children:"+ Add Subtag"}),re.length===0&&!I&&t.jsx(Be,{children:"No subtags available"})]})]})},ys=()=>{const{t:e,language:l}=De(),n=be(l)==="rtl",w=At(e),{setShowUsernamePrompt:p,setUsernameInput:I}=w,[C,y]=b.useState(null),[S,M]=b.useState(!1),[g,U]=b.useState(0),[i,K]=b.useState(""),[W,P]=b.useState(""),[s,Y]=b.useState(!1),[Q,X]=b.useState(!1),[H,re]=b.useState("NoPassword"),[A,o]=b.useState(""),[N,k]=b.useState(!1),[d,R]=b.useState(!0),[D,Z]=b.useState(null),[ce,c]=b.useState(!1),[f,_]=b.useState([]),[u,v]=b.useState(new Set),[x,j]=b.useState(new Map),F=m=>{!C&&m&&y(m)},{fileInputRef:O,selectedPhotos:B,setSelectedPhotos:ae,isUploading:q,progressTracker:te,setProgressTracker:ge,debugMessages:le,currentFolderId:de,openFilePicker:r,handleFileSelection:h,log:$}=_t(F);b.useEffect(()=>{(async()=>{try{await lt(),$("🔥 Save-album page S3 credentials prewarmed successfully")}catch(z){$(`⚠️ Save-album page credential prewarming failed: ${String(z)}`)}})()},[]);const T=(m,z)=>{let J=`[${new Date().toISOString()}] ${m}`;if(z!==void 0)try{const se=typeof z=="object"?JSON.stringify(z,null,2):String(z);J+=`
Data: ${se}`,console.log(J),console.log("Data object:",z)}catch(se){J+=` [Error stringifying data: ${se}]`,console.log(J),console.log("Raw data:",z)}else console.log(J);$(J)},G=ds(T),{cognitoUsername:L,publicUsername:V,setPublicUsername:ie}=Lt(y,ae,Z,Y,K,P,k,R,re,o,c,_,T),{saveAlbumDirectly:oe}=es(C||de,L,B,ce,f,i,W,N,d,H,A,x,M,U,ae,ge,T);b.useEffect(()=>{de&&!C&&(y(de),T(`Updated folder ID from upload processor: ${de}`))},[de,C]),b.useEffect(()=>{v(m=>{const z=new Set;return m.forEach(ee=>{ee<B.length&&z.add(ee)}),z}),j(m=>{const z=new Map(m),ee=[];return m.forEach((J,se)=>{se>=B.length&&ee.push(se)}),ee.forEach(J=>{z.delete(J)}),z})},[B.length]);const fe=m=>{T(`Removing photo at index: ${m}`);const z=B.filter((ee,J)=>J!==m);ae(z),T(`New photos count: ${z.length}`),z.length>0?(localStorage.setItem(pe.SELECTED_PHOTOS,JSON.stringify(z)),T(`Updated localStorage with ${z.length} photos`)):(localStorage.removeItem(pe.SELECTED_PHOTOS),T("Removed photos from localStorage")),v(ee=>{const J=new Set;return ee.forEach(se=>{se<m?J.add(se):se>m&&J.add(se-1)}),J}),j(ee=>{const J=new Map;return ee.forEach((se,xe)=>{xe<m?J.set(xe,se):xe>m&&J.set(xe-1,se)}),J})},ue=m=>{T(`Toggling selection for photo at index: ${m}`),v(z=>{const ee=new Set(z);return ee.has(m)?(ee.delete(m),T(`Deselected photo ${m}`)):(ee.add(m),T(`Selected photo ${m}`)),ee})},We=()=>{T("Selecting all photos");const m=new Set;for(let z=0;z<B.length;z++)m.add(z);v(m)},qe=()=>{T("Deselecting all photos"),v(new Set)},Ke=()=>{const m=!N;T(`Toggling isOnPublicProfile to: ${m}`),k(m)},He=()=>{const m=!d;T(`Toggling participantsCanAddItems to: ${m}`),R(m)},Je=async()=>{T("Album save initiated"),T("Photo tags applied:",Object.fromEntries(x)),M(!0);try{if(V!=null&&V.startsWith("Profile-")){T("Public username starts with 'Profile-', showing username prompt"),I(""),p(!0),M(!1);return}T("Valid username found, proceeding to save album directly with file-level tagging"),oe()}catch(m){console.error("Error in handleSaveAlbum:",m),T(`Error in handleSaveAlbum: ${m}`),M(!1)}},Qe=m=>{T(`Handling successful username update to: ${m}`),localStorage.setItem(pe.PUBLIC_USERNAME,m),ie(m),p(!1),T("Proceeding to save album after username update"),oe()},Ve=(m,z)=>{T(`Password dialog closed with option: ${m}, password: ${z?"******":"undefined"}`),m&&re(m),z!==void 0&&o(z),X(!1)},Ye=()=>H==="NoPassword"?e("Album Password Policy"):`${e(H==="NotVisible"?"Password Required To See Or Save":H==="Watermark"?"Watermarked And No Saving Without Password":"Password Required To Save")} ${A?`(${A})`:""}`,Xe=()=>{T("Opening password dialog"),X(!0)},Ze=()=>{T("Add photos button clicked"),r(C)},Le=S||q;return t.jsxs(t.Fragment,{children:[t.jsx(St,{}),t.jsxs(Tt,{$isRTL:n,children:[t.jsxs("div",{style:{maxWidth:"900px",margin:"0 auto"},children:[t.jsxs(vt,{children:[t.jsx(It,{href:"my-albums.html",children:e("My Albums")}),t.jsx(Ct,{t:e})]}),t.jsx(rs,{showFolderDetails:s,isCreator:D,folderName:i,setFolderName:K,folderDescription:W,setFolderDescription:P,isOnPublicProfile:N,handlePublicProfileToggle:Ke,participantsCanAddItems:d,handleParticipantsCanAddItemsToggle:He,isSavingAlbum:S||q}),(q||te.totalFiles>0&&(te.filesUploading>0||te.filesProcessing>0||te.filesComplete<te.totalFiles))&&t.jsx(jt,{progressTracker:te,isRTL:be(l)==="rtl",variant:"detailed",context:"saving",isUploading:q,showSuccessMessage:!1,showErrorMessage:!0,customMessages:{error:e("Some photos could not be processed. You can continue with the successfully processed photos.")}}),t.jsx("input",{ref:O,id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:m=>h(m,L),style:{display:"none"}}),t.jsx(ts,{selectedPhotos:B,selectedPhotoIndices:u,isSavingAlbum:S||q,onRemovePhoto:fe,onTogglePhotoSelection:ue,onSelectAllPhotos:We,onDeselectAllPhotos:qe}),s&&D===!0&&t.jsx("div",{style:{margin:"16px 0"},children:t.jsx(bs,{tagsManager:G,disabled:Le,enhancedLog:T,photoCount:B.length})}),t.jsx(ss,{isSavingAlbum:S,savingProgress:g}),t.jsxs(Pt,{children:[t.jsx(he,{onClick:Ze,disabled:S||q,children:e(q?"Uploading...":"Add More Photos")}),D===!0&&t.jsx(he,{$passwordSet:H!=="NoPassword",onClick:Xe,disabled:S||q,children:Ye()}),t.jsx(he,{$primary:!0,onClick:Je,disabled:S||q,children:e(S?"Saving Album...":"Save Album")})]}),t.jsx(kt,{t:e,language:l,usernameManager:w,onSuccess:Qe}),t.jsx(Xt,{isOpen:Q,onClose:Ve,initialOption:H,initialPassword:A})]}),t.jsx(Dt,{debugMessages:le,t:e,isRTL:n,textDirection:n?"rtl":"ltr"})]})]})},$s=()=>t.jsx(nt,{children:t.jsx(ys,{})});at.createRoot(document.getElementById("root")).render(t.jsx($s,{}));
