import{d as F,u as Ce,a as b,j as t,g as be,h as ne,L as pe,i as ye,s as et,m as tt,f as me,k as st,l as rt,n as it,r as ot,R as at,I as nt,p as lt}from"./utils-CuQXS0Z6.js";import{C as De,F as $e,e as Se,f as dt,g as ct,T as Te,h as ve,i as Ie,j as Pe,P as ut,k as pt,l as Fe,m as Ee,n as ft,o as gt,S as mt,p as xt,V as ht,q as bt,r as wt,M as yt,R as $t,G as St,A as Tt,H as vt,s as It,t as Pt,B as he}from"./styled-components-jXMFfxCi.js";import{u as At,U as kt}from"./useUsernameManagement-BrEWQIvF.js";import{u as jt,U as _t}from"./useFileUploadProcessor-Do-xp2_7.js";import{L as Ct,D as Dt}from"./DebugLog-C9PtWCJN.js";const a={colors:{primary:"#007bff",primaryDark:"#0056b3",secondary:"#6c757d",success:"#4caf50",danger:"#e53935",warning:"#ff9800",white:"#fff",text:{primary:"#333",secondary:"#666",light:"#777"},background:{primary:"#f9fafb",highlight:"#f0f7ff"},border:"#ddd"},spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px"},borderRadius:{small:"4px",medium:"8px"},boxShadow:{lg:"0 4px 10px rgba(0,0,0,0.08)"}},Ft=F.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
`,Et=F.div`
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
`,Nt=F.div`
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
`,Rt=F.div`
  direction: ${e=>e.$isRTL?"rtl":"ltr"};
`,Ot=F.h3`
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
`,zt=F.p`
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
`,Ae=F.div`
  margin-bottom: ${a.spacing.lg};
`,ke=F.label`
  display: block;
  margin-bottom: ${a.spacing.sm};
  font-size: 14px;
  font-weight: 500;
  color: ${a.colors.text.primary};
`,Ut=F.input`
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
`,Bt=F.div`
  display: flex;
  flex-direction: column;
  gap: ${a.spacing.md};
  margin-bottom: ${a.spacing.xl};
`,Mt=F.div`
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
`,Wt=F.div`
  flex: 1;
`,Gt=F.div`
  margin-bottom: ${a.spacing.xs};
`,Kt=F.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${a.colors.primary};
  flex-shrink: 0;
`,qt=F.label`
  font-size: 16px;
  font-weight: 500;
  color: ${a.colors.text.primary};
  cursor: pointer;
  display: block;
`,Ht=F.div`
  font-size: 14px;
  color: ${a.colors.text.secondary};
  margin-top: ${a.spacing.xs};
`,Jt=F.div`
  color: ${a.colors.warning};
  font-size: 12px;
  font-style: italic;
  margin-top: ${a.spacing.xs};
  font-weight: 500;
`,Qt=F.div`
  display: flex;
  gap: ${a.spacing.sm};
  justify-content: center;
  margin-top: ${a.spacing.xl};
`,je=F.button`
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
`,Vt=F.div`
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
`,Yt=[{value:"NotVisible",titleKey:"Password Required To See Or Save",descriptionKey:"Album will be completely hidden until correct password is entered"},{value:"Watermark",titleKey:"Watermarked And No Saving Without Password",descriptionKey:"Photos will be visible with watermarks, password required to save"},{value:"CannotBeSaved",titleKey:"Password Required To Save",descriptionKey:"Photos are visible but password required to download or save"},{value:"NoPassword",titleKey:"No Password",descriptionKey:"Album is fully public with no restrictions"}],Xt=({isOpen:e,onClose:d,initialOption:n="NoPassword",initialPassword:w=""})=>{const{t:p,language:I}=Ce(),C=be(I)==="rtl",[y,T]=b.useState(n),[M,g]=b.useState(w);if(b.useEffect(()=>{e&&(T(n),g(w))},[e,n,w]),!e)return null;const B=M.trim()==="",i=P=>{T(P)},q=P=>{P.target===P.currentTarget&&d()},G=P=>P!=="NoPassword";return t.jsxs(t.Fragment,{children:[t.jsx(Ft,{onClick:q}),t.jsx(Et,{children:t.jsx(Nt,{children:t.jsxs(Rt,{$isRTL:C,children:[t.jsx(Ot,{children:p("Album Password Policy")}),t.jsx(zt,{children:p("Configure password protection for your album. Choose how you want to restrict access to your photos.")}),t.jsxs(Ae,{children:[t.jsx(ke,{children:p("Enter Password")}),t.jsx(Ut,{type:"text",placeholder:p("Enter password (optional)"),value:M,onChange:P=>g(P.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"})]}),t.jsxs(Ae,{children:[t.jsx(ke,{children:p("Select Protection Level")}),t.jsx(Bt,{children:Yt.map(P=>t.jsxs(Mt,{$isSelected:y===P.value,onClick:()=>i(P.value),children:[t.jsx(Kt,{type:"radio",name:"protection",checked:y===P.value,onChange:()=>i(P.value)}),t.jsxs(Wt,{children:[t.jsx(Gt,{children:t.jsx(qt,{children:p(P.titleKey)})}),t.jsx(Ht,{children:p(P.descriptionKey)}),B&&G(P.value)&&y===P.value&&t.jsx(Jt,{children:p('⚠️ Will use "password" as default if left empty')})]})]},P.value))})]}),G(y)&&t.jsxs(Vt,{children:[t.jsx("strong",{children:p("💡 Password Protection Info:")}),t.jsx("br",{}),p('If you leave the password field empty, "password" will be used as the default password. You can change this anytime in album settings.')]}),t.jsxs(Qt,{children:[t.jsx(je,{$variant:"secondary",onClick:()=>d(),children:p("Cancel")}),t.jsx(je,{$variant:"primary",onClick:()=>{const P=B&&G(y)?"password":M;console.log(`Saving with option: ${y}, password: ${P.length>0?"********":"none"}`),d(y,P)},children:p("Save Settings")})]})]})})})]})},Zt=`
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
`,Lt=(e,d,n,w,p,I,C,y,T,M,g,B,i)=>{const[q,G]=b.useState(null),[P,s]=b.useState(null),Y=async E=>{i(`Initializing folder ID with username: ${E}`);try{const N=new URLSearchParams(window.location.search).get("folderId");if(i(`Folder ID from URL: ${N||"null"}`),N){e(N),i(`Using existing folder ID: ${N}`);try{i(`Fetching details for folder: ${N}`);const A=await Q(N,i);if(i("Folder details retrieved:",A),A){const c=`${E}_____${E}____Account`,R=A.creatorId===c;if(i(`User is creator of folder: ${R}, accountId: ${c}, creator: ${A.creatorId}`),n(R),R){i("User is creator, showing folder details"),w(!0),p(A.folderName),I(A.folderDescription),C(A.isOnPublicProfile),i(`Setting isOnPublicProfile: ${A.isOnPublicProfile}`),A.participantsCanAddItems!==void 0&&(y(A.participantsCanAddItems),i(`Setting participantsCanAddItems: ${A.participantsCanAddItems}`));const k=A.passwordPolicy;i(`Password policy from folder details: ${k}`),T(k),k!=="NoPassword"&&A.password&&M(A.password),i(`Set password protection option to: ${k}`)}else i("User is NOT the creator, hiding editable fields"),w(!1)}else i("No folder details retrieved, setting isCreator to true"),n(!0),w(!0)}catch(A){console.error("Error fetching folder details:",A),i(`Error fetching folder details: ${A}`),n(!1)}}else{const A=`${E}_____${ye()}____Folder`;i(`Creating new folder ID: ${A}`),e(A),i("Setting isCreator to true for new album"),n(!0),w(!0)}}catch(o){console.error("Folder ID initialization error:",o),i(`Folder ID initialization error: ${o}`),n(!1)}},Q=async(E,o)=>{var N,A,c,R,k,Z,ce,u;o(`Fetching details for folder ID: ${E}`);try{const f=await ne();if(!f)return o("No token available for fetching folder details"),null;o("Sending GraphQL query to fetch folder details");const l=await(await fetch(me,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${f}`},body:JSON.stringify({query:Zt,variables:{folderIds:[E],fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(o("Folder details API response:",l),l.errors)return console.error("GraphQL errors:",l.errors),o(`GraphQL errors: ${JSON.stringify(l.errors)}`),null;const v=((A=(N=l==null?void 0:l.data)==null?void 0:N.fetchFolders)==null?void 0:A.items)||[];if(o(`Found ${v.length} folder items`),v.length===0)return o("No folder items found"),null;const m=v[0];o("Retrieved folder data:",m);const _=((R=(c=m.folderPosition)==null?void 0:c.profileIds)==null?void 0:R.some(O=>O.includes("Public____Profile")))||!1;o(`Folder is on public profile: ${_}`),o("Profile IDs:",(k=m.folderPosition)==null?void 0:k.profileIds);const D=(Z=m.folderInviteParameters)==null?void 0:Z.usingFolderInviteGrantsRightToAddItems;return o(`Participants can add items: ${D}`),{creatorId:m.creatorId||"",folderName:m.folderName||"",folderDescription:m.folderDescription||"",passwordPolicy:((ce=m.folderPassword)==null?void 0:ce.policy)||"NoPassword",password:((u=m.folderPassword)==null?void 0:u.password)||"",isOnPublicProfile:_,participantsCanAddItems:D!==void 0?D:!0}}catch(f){return console.error("Error in fetchFolderDetails:",f),o(`Error in fetchFolderDetails: ${f}`),null}},X=()=>{i("Attempting to restore photos from localStorage");try{const E=localStorage.getItem(pe.SELECTED_PHOTOS);if(i(`Found stored photos: ${E?"yes":"no"}`),E)try{const o=JSON.parse(E);i(`Parsed ${o.length} photos from localStorage`),Array.isArray(o)&&o.length>0&&(d(o),i(`Restored ${o.length} photos to state`))}catch(o){console.error("Error parsing stored photos:",o),i(`Error parsing stored photos: ${o}`)}}catch(E){console.error("Error restoring photos from storage:",E),i(`Error restoring photos from storage: ${E}`)}},H=()=>{i("Testing S3 connection");try{et?i("S3 client is available"):(console.error("S3 client not available"),i("S3 client not available"))}catch(E){console.error("S3 connection test error:",E),i(`S3 connection test error: ${E}`)}},re=async()=>{var E;i("Starting component initialization");try{i("Checking login with refresh");const o=await ne();if(!o){i("No token returned from login check, aborting initialization");return}try{const N=localStorage.getItem(pe.PUBLIC_USERNAME);i(`Retrieved public username from localStorage: ${N||"null"}`),s(N||null);const c=JSON.parse(atob(o.split(".")[1]))["cognito:username"];if(c){i(`Extracted Cognito username from token: ${c}`),G(c);const R=localStorage.getItem(pe.SUB_ALBUM_DATA);if(i(`Sub-album data from localStorage: ${R||"null"}`),R)try{const k=JSON.parse(R);if(i("Parsed sub-album data:",k),k.isSubAlbum&&((E=k.selectedFileIds)==null?void 0:E.length)>0){i(`Valid sub-album data found with ${k.selectedFileIds.length} files`),g(!0),B(k.selectedFileIds),k.selectedPhotos&&k.selectedPhotos.length>0&&(i(`Found ${k.selectedPhotos.length} selected photos in sub-album data`),d(k.selectedPhotos)),w(!0),n(!0);const Z=`${c}_____${ye()}____Folder`;i(`Generated new folder ID for sub-album: ${Z}`),e(Z)}else i("Invalid sub-album data, proceeding with normal initialization"),await Y(c)}catch(k){console.error("Error parsing sub-album data:",k),i(`Error parsing sub-album data: ${k}`),await Y(c)}else i("No sub-album data found, proceeding with normal folder initialization"),await Y(c)}else i("No Cognito username found in token")}catch(N){console.error("User data initialization error:",N),i(`User data initialization error: ${N}`)}X(),H(),i("Component initialization completed")}catch(o){console.error("Initialization error:",o),i(`Initialization error: ${o}`)}};return b.useEffect(()=>{re()},[]),{cognitoUsername:q,publicUsername:P,setPublicUsername:s}},es=(e,d,n,w,p,I,C,y,T,M,g,B,i,q,G,P,s)=>{const Y=u=>(s(`Converting ${u.length} tags to API format`),u.map(f=>({TagType:f.TagType,tagTitle:f.tagTitle,selectedSubtagInputs:f.subtags.map(j=>({TagType:f.TagType,tagTitle:j.tagTitle,subtagTitle:j.subtagTitle}))}))),Q=u=>{s(`Save progress text: ${u}`);const f=document.getElementById("saveProgressText");f&&(f.innerText=u)},X=u=>{const f=document.getElementById("saveProgress");f?(f.style.width=`${u}%`,s(`Updated save progress bar: ${u}%`)):s("Progress bar element not found"),q(u)},H=(u,f)=>{s(`Splitting array of ${u.length} items into chunks of ${f}`);const j=[];for(let l=0;l<u.length;l+=f)j.push(u.slice(l,l+f));return s(`Created ${j.length} chunks`),j},re=u=>{const f=new Set;return u.filter(j=>f.has(j.fileId)?(s(`Skipping duplicate file reference with ID: ${j.fileId}`),!1):(f.add(j.fileId),!0))},E=(u,f,j)=>{s("Creating folder position input WITHOUT folder-level tags"),s(`Profile visibility: ${y?"Public":"Only Me"}`);const l=y?[`${d}_____Public____Profile`]:["Only Me_____Only Me____Profile"];s(`Profile IDs: ${JSON.stringify(l)}`);let v=[];w&&p.length>0&&(s(`Creating file reference IDs for ${p.length} sub-album files`),v=p.map(O=>{const z=O.split("_____");if(z.length>=2){const K=z[1].split("____")[0],te=`${j}_____${K}____FileReference`;return s(`Created file reference ID for sub-album: ${te}`),te}return s(`Using original fileId as fallback: ${O}`),O})),s(`Created ${v.length} acceptedFileReferenceIds`);const m=M!=="NoPassword"?g:null;if(s(`Password protection: ${M}`),s(`Album password: ${m?"******":"null"}`),s(`Participants can add items: ${T}`),!e)throw s("Error: folderId is null or undefined"),new Error("folderId is required to create folder position input");const _=st(e),D=rt(_);return{currentTime:u,folderId:e,profileIds:l,folderPositionPoints:1,acceptedFileReferenceIds:v,folderInput:{folderAboutContactIds:[f],albumNanoId:D,folderName:I,folderDescription:C,folderPasswordInput:{password:m,policy:M},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,usingFolderInviteGrantsRightToRemoveItems:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:T,addedItemsNeedFolderCreatorApproval:!1}}}},o=(u,f,j)=>(s(`Creating file reference inputs with individual photo tags for ${u.length} photos`),u.map((l,v)=>{var z;const m=B.get(v)||[],_=Y(m);if(s(`Photo ${v} (${l.fileName}): ${m.length} tags applied`),l.fileId)return s(`Using existing fileId for photo: ${l.fileId}`),{fileReferencesHolderId:e,currentTime:f,points:1,hasBeenDeleted:!1,selectedTagInputs:_,fileId:l.fileId,fileInput:null};const D=l.type==="video"||(z=l.type)!=null&&z.startsWith("video")?`Input/Video/${l.fileName}`:`Input/Image/${l.fileName}`,O=`${d}_____${l.fileName}____File`;return s(`Created file reference for ${l.fileName}:`),s(`  - dataKey: ${D}`),s(`  - fileId: ${O}`),s(`  - thumbnailDataKey: ${l.thumbnailDataKey||"undefined"}`),s(`  - size: ${l.size}`),s(`  - thumbnailSize: ${l.thumbnailSize||0}`),s(`  - duration: ${l.duration||"undefined"}`),s(`  - tags: ${m.length} tags selected for this photo`),{fileReferencesHolderId:e,currentTime:f,points:1,hasBeenDeleted:!1,selectedTagInputs:_,fileId:O,fileInput:{fileId:O,ownerFileInput:{editorContactIds:[j],FileSharingOptionsEnum:"Anyone",dataKey:D,thumbnailDataKey:l.thumbnailDataKey,dataInBytes:l.size,thumbnailDataInBytes:l.thumbnailSize||0,s3UploadedAt:f,durationInSeconds:l.duration},editorFileInput:{aboutContactIds:[j],captionText:"",numericFilterInputs:[]}}}})),N=async u=>{var v,m;s("Sending folder-only mutation (no file references, no folder tags)");const f=await ne();if(!f)throw s("No token available for saving album, aborting"),new Error("Authentication token not available");const j=`
      mutation MyMutation($folderPositionInputs: [FolderPositionInput!]) {
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items {
            id
          }
        }
      }
    `,l={folderPositionInputs:[u]};s("GraphQL folder-only mutation variables:",l);try{s("Sending API request to save folder");const _=await fetch(me,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${f}`},body:JSON.stringify({query:j,variables:l})});s(`API response status: ${_.status}`);const D=await _.text();s(`API response raw text: ${D}`);const O=JSON.parse(D);if(s("API response JSON:",O),O.errors)throw console.error("Folder save failed:",O.errors),s("Folder save failed with errors:",O.errors),new Error("Failed to save folder");return s("Folder saved successfully"),((m=(v=O.data)==null?void 0:v.changeFiles)==null?void 0:m.items)||[]}catch(_){throw console.error("Error in sendFolderOnlyMutation:",_),s(`Error in sendFolderOnlyMutation: ${_}`),_}},A=async u=>{var v,m,_,D,O;s(`Sending file references-only mutation with ${u.length} items (each with individual tags)`);const f=await ne();if(!f)throw s("No token available for saving file references, aborting"),new Error("Authentication token not available");const j=`
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
    `,l={updatedFileReferenceInputs:u};s("GraphQL file references-only mutation variables (first item):",u.length>0?u[0]:"No items");try{s("Sending API request to save file references with individual tags");const z=await fetch(me,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${f}`},body:JSON.stringify({query:j,variables:l})});s(`API response status: ${z.status}`);const ae=await z.text();s(`API response raw text: ${ae.substring(0,500)}...`);const K=JSON.parse(ae);if(s("API response JSON items count:",((_=(m=(v=K.data)==null?void 0:v.changeFiles0)==null?void 0:m.items)==null?void 0:_.length)||0),K.errors)throw console.error("File references save failed:",K.errors),s("File references save failed with errors:",K.errors),new Error("Failed to save file references");return s("File references chunk saved successfully with individual photo tags"),((O=(D=K.data)==null?void 0:D.changeFiles0)==null?void 0:O.items)||[]}catch(z){throw console.error("Error in sendFileReferencesOnlyMutation:",z),s(`Error in sendFileReferencesOnlyMutation: ${z}`),z}},c=async(u,f)=>{var m,_,D,O,z,ae,K,te,ge;s(`Sending final chunk with folder mutation (${u.length} file references, no folder tags)`);const j=await ne();if(!j)throw s("No token available for saving final chunk, aborting"),new Error("Authentication token not available");const l=`
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
    `,v={folderPositionInputs:[f],updatedFileReferenceInputs:u};s("GraphQL final mutation variables (folder + last chunk, no folder tags)");try{s("Sending API request for final save with folder (no folder tags)");const le=await fetch(me,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${j}`},body:JSON.stringify({query:l,variables:v})});s(`API response status: ${le.status}`);const de=await le.text();s(`API response raw text: ${de.substring(0,500)}...`);const r=JSON.parse(de);if(s("API response JSON:",{fileReferencesCount:((D=(_=(m=r.data)==null?void 0:m.changeFiles0)==null?void 0:_.items)==null?void 0:D.length)||0,folderItems:((z=(O=r.data)==null?void 0:O.changeFiles)==null?void 0:z.items)||[]}),r.errors)throw console.error("Final save failed:",r.errors),s("Final save failed with errors:",r.errors),new Error("Failed to complete album save");return s("Final chunk and folder saved successfully (with individual photo tags)"),{fileReferences:((K=(ae=r.data)==null?void 0:ae.changeFiles0)==null?void 0:K.items)||[],folderPositions:((ge=(te=r.data)==null?void 0:te.changeFiles)==null?void 0:ge.items)||[]}}catch(le){throw console.error("Error in sendFinalChunkWithFolderMutation:",le),s(`Error in sendFinalChunkWithFolderMutation: ${le}`),le}},R=async()=>(s("Validating required data"),await ne()?d?e?(s("All required data validated successfully"),!0):(s("No folder ID, validation failed"),!1):(s("No Cognito username, validation failed"),!1):(s("No token available, validation failed"),!1)),k=()=>{s("Handling successful save"),it(G,P,[pe.SELECTED_PHOTOS,pe.SUB_ALBUM_DATA],s),s("Album data cleared");const u=document.getElementById("saveProgressText");u&&(u.innerText="Album saved successfully!",s("Updated progress text to 'Album saved successfully!'")),sessionStorage.setItem("album_just_saved","true"),s("Set 'album_just_saved' flag in sessionStorage"),s("Setting timeout for redirect to my-albums.html"),setTimeout(()=>{s("Redirecting to my-albums.html"),ot("my-albums.html")},1e3)},Z=async(u,f)=>{s("Starting chunked save process (individual photo tags, no folder tags)");try{Q("Processing files in chunks...");const j=48;if(f.length===0)s("No file references to process, saving only folder position (no folder tags)"),await N(u);else{const l=re(f);s(`After removing duplicates, processing ${l.length} unique file references`);const v=H(l,j);s(`Split file references into ${v.length} chunks of max size ${j}`);for(let m=0;m<v.length;m++){const _=v[m];s(`Processing chunk ${m+1} of ${v.length} with ${_.length} file references`);const D=m/v.length*80;q(10+D),X(10+D),m<v.length-1?(Q(`Saving files: chunk ${m+1} of ${v.length}...`),await A(_)):(Q("Finalizing album..."),await c(_,u))}}q(100),X(100),Q("Album saved successfully!"),k()}catch(j){console.error("Error in chunked save process:",j),s(`Error in chunked save process: ${j}`),Q(`Error: ${j}`),i(!1)}};return{saveAlbumDirectly:async()=>{s("Starting direct album save with individual photo tagging"),s(`Photo tags map: ${B.size} photos have tags applied`),i(!0),q(5);try{if(s("Validating required data for save"),!await R()){s("Required data validation failed, aborting save"),i(!1);return}const u=Math.floor(Date.now()/1e3),f=`${d}_____${d}____Account`,l=e.split("_____")[1].split("____")[0];s(`Save timestamp: ${u}`),s(`Account ID: ${f}`),s(`Folder ID: ${e}`),s(`Folder target item identifier: ${l}`),s("Creating folder position input (no folder tags)");const v=E(u,f,l);s("Folder position input created:",v);let m=[];const _=n.filter(D=>D.status==="complete");if(s(`Found ${_.length} valid photos with 'complete' status`),_.length>0){const D=_.filter(z=>!z.fileId);s(`Found ${D.length} new uploads to move from temp to public folder`),D.length>0&&(s("Moving files from temp to public folder"),await tt(D,X,s)),s("Creating file reference inputs for uploads with individual photo tags");const O=o(_,u,f);s(`Created ${O.length} file reference inputs for uploads`,O),m=m.concat(O)}if(w&&p.length>0){s(`Adding ${p.length} existing file references for sub-album`);const D=p.map(O=>(s(`Creating file reference for existing file ID: ${O}`),{fileReferencesHolderId:e,currentTime:u,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:O,fileInput:null}));s(`Created ${D.length} file reference inputs for existing files`,D),m=m.concat(D)}s(`Total file reference inputs: ${m.length}`),s("Sending GraphQL mutations with chunked file references (individual photo tags)"),await Z(v,m)}catch(u){console.error("Error in saveAlbumDirectly:",u),s(`Error in saveAlbumDirectly: ${u}`),i(!1)}}}},ts=({selectedPhotos:e,selectedPhotoIndices:d,isSavingAlbum:n,onRemovePhoto:w,onTogglePhotoSelection:p,onSelectAllPhotos:I,onDeselectAllPhotos:C})=>{const{t:y}=we();if(e.length===0)return null;const T=d.size>0,M=d.size===e.length;return t.jsxs(t.Fragment,{children:[e.length>1&&t.jsx("div",{style:{marginBottom:"16px",padding:"12px 16px",backgroundColor:"#f8f9fa",borderRadius:"8px",border:"1px solid #e9ecef"},children:t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[t.jsxs("span",{style:{fontWeight:"500",fontSize:"14px",color:"#495057",display:"flex",alignItems:"center",gap:"8px"},children:[t.jsx("span",{style:{fontSize:"16px"},children:"📷"}),T?y("{{count}} photo(s) selected for tagging",{count:d.size}):y("Click photos below to select them for tagging")]}),t.jsxs("div",{style:{display:"flex",gap:"8px",marginLeft:"auto"},children:[!M&&t.jsx("button",{onClick:I,disabled:n,style:{padding:"6px 12px",border:"1px solid #007bff",borderRadius:"6px",background:"#007bff",color:"white",fontSize:"12px",cursor:"pointer",fontWeight:"500",transition:"all 0.2s ease"},children:y("Select All")}),T&&t.jsx("button",{onClick:C,disabled:n,style:{padding:"6px 12px",border:"1px solid #6c757d",borderRadius:"6px",background:"#fff",color:"#6c757d",fontSize:"12px",cursor:"pointer",fontWeight:"500",transition:"all 0.2s ease"},children:y("Deselect All")})]})]})}),t.jsx(ft,{children:e.map((g,B)=>{var q,G;const i=d.has(B);return t.jsxs(gt,{style:{position:"relative",cursor:e.length>1?"pointer":"default",border:i?"3px solid #007bff":"1px solid #e9ecef",borderRadius:"8px",overflow:"hidden",transition:"all 0.2s ease"},onClick:()=>e.length>1&&p(B),children:[e.length>1&&t.jsx("div",{style:{position:"absolute",top:"8px",right:"8px",width:"24px",height:"24px",borderRadius:"50%",border:`2px solid ${i?"#007bff":"#ffffff"}`,background:i?"#007bff":"rgba(255, 255, 255, 0.95)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:10,boxShadow:"0 2px 6px rgba(0,0,0,0.15)",transition:"all 0.2s ease"},children:i?t.jsx("span",{style:{color:"white",fontSize:"14px",fontWeight:"bold"},children:"✓"}):null}),e.length>1&&i&&t.jsx("div",{style:{position:"absolute",bottom:"8px",left:"8px",right:"8px",background:"linear-gradient(135deg, rgba(0, 123, 255, 0.9), rgba(0, 123, 255, 0.8))",color:"white",padding:"4px 8px",borderRadius:"4px",fontSize:"10px",fontWeight:"600",textAlign:"center",zIndex:10,letterSpacing:"0.5px"},children:"SELECTED"}),g.status!=="complete"&&t.jsx(mt,{$status:g.status,children:g.status==="error"?"✕":g.status==="uploading"?"↑":g.status==="processing"?"⚙️":"•"}),t.jsxs(xt,{style:{opacity:e.length===1||!i?1:.9,transition:"opacity 0.2s ease"},children:[g.type==="video"||(q=g.type)!=null&&q.startsWith("video")?t.jsx(ht,{src:g.s3PreviewUrl,controls:!0}):t.jsx(bt,{src:g.s3PreviewUrl,alt:g.fileName}),(g.status==="uploading"||g.status==="processing")&&t.jsx(Fe,{$bottom:"4px",$left:"4px",$right:"4px",$height:"4px",children:t.jsx(Ee,{$progress:g.progress,$status:g.status})})]}),t.jsxs(wt,{children:[(G=g.type)!=null&&G.startsWith("video")?y("Video"):y("Image"),g.size&&` • ${(g.size/1024/1024).toFixed(1)} MB`,g.duration&&` • ${g.duration}s`]}),g.status==="error"&&g.errorMessage&&t.jsxs(yt,{$type:"error",children:[y("Error"),": ",g.errorMessage.length>40?g.errorMessage.substring(0,37)+"...":g.errorMessage]}),t.jsx($t,{onClick:()=>w(B),disabled:n,children:y("Remove")})]},B)})})]})},ss=({isSavingAlbum:e,savingProgress:d})=>{const{t:n}=we();return e?t.jsxs(De,{children:[t.jsx(ut,{children:n("Saving Album")}),t.jsx(pt,{id:"saveProgressText",children:n("Moving files...")}),t.jsx(Fe,{children:t.jsx(Ee,{id:"saveProgress",$progress:d/100})})]}):null},rs=({showFolderDetails:e,isCreator:d,folderName:n,setFolderName:w,folderDescription:p,setFolderDescription:I,isOnPublicProfile:C,handlePublicProfileToggle:y,participantsCanAddItems:T,handleParticipantsCanAddItemsToggle:M,isSavingAlbum:g})=>{const{t:B}=we();return!e||d!==!0?null:t.jsxs(De,{children:[t.jsxs($e,{children:[t.jsx(Se,{htmlFor:"folderName",children:B("Album Name (Optional)")}),t.jsx(dt,{id:"folderName",type:"text",value:n,onChange:i=>w(i.target.value),placeholder:B("Enter album name")})]}),t.jsxs($e,{children:[t.jsx(Se,{htmlFor:"folderDescription",children:B("Album Description (Optional)")}),t.jsx(ct,{id:"folderDescription",value:p,onChange:i=>I(i.target.value),placeholder:B("Enter album description"),rows:4})]}),t.jsxs(Te,{children:[t.jsx(ve,{children:B(C?"On Public Profile":"Not On Public Profile")}),t.jsxs(Ie,{children:[t.jsx("input",{type:"checkbox",checked:C,onChange:y,disabled:g}),t.jsx(Pe,{})]})]}),t.jsxs(Te,{children:[t.jsx(ve,{children:B(T?"Participants Can Add Items":"Participants Cannot Add Items")}),t.jsxs(Ie,{children:[t.jsx("input",{type:"checkbox",checked:T,onChange:M,disabled:g}),t.jsx(Pe,{})]})]})]})},we=()=>({t:(e,d)=>d&&typeof d=="object"&&"count"in d?e.replace("{{count}}",String(d.count)):e,language:"en"}),is=`
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
`,ds=e=>{const[d,n]=b.useState([]),[w,p]=b.useState([]),[I,C]=b.useState(null),[y,T]=b.useState(!1),[M,g]=b.useState(null),[B,i]=b.useState(null),[q,G]=b.useState(!1),[P,s]=b.useState(!1),[Y,Q]=b.useState(""),[X,H]=b.useState(""),[re,E]=b.useState(!1),[o,N]=b.useState(!1),A=async()=>{var r,h;e("Fetching tags from API"),T(!0);try{const $=await ne();if(!$){e("No token available for fetching tags");return}const W=await(await fetch(me,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${$}`},body:JSON.stringify({query:is,variables:{fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(e("Tags API response:",W),W.errors){console.error("GraphQL errors:",W.errors),e(`GraphQL errors: ${JSON.stringify(W.errors)}`);return}const V=(((h=(r=W==null?void 0:W.data)==null?void 0:r.fetchRelations)==null?void 0:h.items)||[]).map(ie=>{var oe,fe;return{id:ie.id,tagTitle:ie.tagTitle,TagType:ie.TagType,points:ie.points,createdAt:ie.createdAt,updatedAt:ie.updatedAt,subtags:((fe=(oe=ie.subtags)==null?void 0:oe.items)==null?void 0:fe.map(ue=>({id:ue.id,tagTitle:ue.tagTitle,subtagTitle:ue.subtagTitle,TagType:ue.TagType,points:ue.points,createdAt:ue.createdAt,updatedAt:ue.updatedAt})))||[]}});e(`Fetched ${V.length} tags`),n(V)}catch($){console.error("Error fetching tags:",$),e(`Error fetching tags: ${$}`)}finally{T(!1)}},c=r=>{if(e(`Selecting tag for photo application: ${r.tagTitle}`),!w.find($=>$.tagTitle===r.tagTitle)){const $={tagTitle:r.tagTitle,TagType:r.TagType,subtags:[]};p(S=>[...S,$]),e(`Tag ${r.tagTitle} added to selection for photo application`)}},R=r=>{e(`Unselecting tag from photo application: ${r.tagTitle}`),p(h=>h.filter($=>$.tagTitle!==r.tagTitle)),I===r.id&&C(null)},k=r=>{e(`Selecting subtag for photo application: ${r.subtagTitle} for tag: ${r.tagTitle}`),p(h=>h.map($=>$.tagTitle===r.tagTitle&&!$.subtags.find(W=>W.subtagTitle===r.subtagTitle)?{...$,subtags:[...$.subtags,{tagTitle:r.tagTitle,subtagTitle:r.subtagTitle}]}:$))},Z=r=>{e(`Unselecting subtag from photo application: ${r.subtagTitle} for tag: ${r.tagTitle}`),p(h=>h.map($=>$.tagTitle===r.tagTitle?{...$,subtags:$.subtags.filter(S=>S.subtagTitle!==r.subtagTitle)}:$))},ce=r=>{e(`Setting displayed tag: ${r}`),C(r)},u=r=>w.some(h=>h.tagTitle===r.tagTitle),f=r=>{const h=w.find($=>$.tagTitle===r.tagTitle);return(h==null?void 0:h.subtags.some($=>$.subtagTitle===r.subtagTitle))||!1},j=()=>{if(!I)return[];const r=d.find(h=>h.id===I);return(r==null?void 0:r.subtags)||[]},l=()=>{e("Clearing all selected tags"),p([]),C(null)},v=()=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(r){const h=Math.random()*16|0;return(r=="x"?h:h&3|8).toString(16)}),m=async(r,h)=>{if(e(`Adding new tag: ${r} of type: ${h}`),!r.trim())return e("Cannot add tag with empty title"),!1;E(!0);try{if(!await ne())return e("No token available for adding tag"),!1;if(await(async()=>(e("PLACEHOLDER: Would send GraphQL mutation to add tag",{mutation:os,variables:{tagInput:{tagTitle:r.trim(),TagType:h,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(L=>setTimeout(L,500)),!0))()){const L={id:v(),tagTitle:r.trim(),TagType:h,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3),subtags:[]};return n(V=>[L,...V]),c(L),ce(L.id),Q(""),G(!1),e(`Successfully added new tag for photo application: ${r}`),!0}return!1}catch($){return console.error("Error adding new tag:",$),e(`Error adding new tag: ${$}`),!1}finally{E(!1)}},_=async(r,h,$)=>{if(e(`Adding new subtag: ${h} to tag: ${r}`),!h.trim())return e("Cannot add subtag with empty title"),!1;if(!I)return e("No displayed tag for adding subtag"),!1;N(!0);try{if(!await ne())return e("No token available for adding subtag"),!1;if(await(async()=>(e("PLACEHOLDER: Would send GraphQL mutation to add subtag",{mutation:as,variables:{subtagInput:{tagTitle:r,subtagTitle:h.trim(),TagType:$,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(V=>setTimeout(V,500)),!0))()){const V={id:v(),tagTitle:r,subtagTitle:h.trim(),TagType:$,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3)};return n(ie=>ie.map(oe=>oe.id===I?{...oe,subtags:[V,...oe.subtags||[]]}:oe)),k(V),H(""),s(!1),e(`Successfully added new subtag for photo application: ${h}`),!0}return!1}catch(S){return console.error("Error adding new subtag:",S),e(`Error adding new subtag: ${S}`),!1}finally{N(!1)}},D=async r=>{e(`Deleting tag: ${r}`),g(r);try{if(!await ne())return e("No token available for deleting tag"),!1;if(await(async()=>(e("PLACEHOLDER: Would send GraphQL mutation to delete tag",{mutation:ns,variables:{tagId:r}}),await new Promise(W=>setTimeout(W,500)),!0))()){n(L=>L.filter(V=>V.id!==r));const W=d.find(L=>L.id===r);return W&&R(W),I===r&&ce(null),e(`Successfully deleted tag: ${r}`),!0}return!1}catch(h){return console.error("Error deleting tag:",h),e(`Error deleting tag: ${h}`),!1}finally{g(null)}},O=async r=>{e(`Deleting subtag: ${r}`),i(r);try{if(!await ne())return e("No token available for deleting subtag"),!1;if(await(async()=>(e("PLACEHOLDER: Would send GraphQL mutation to delete subtag",{mutation:ls,variables:{subtagId:r}}),await new Promise(W=>setTimeout(W,500)),!0))()){let W=null;return n(L=>L.map(V=>{var oe;const ie=((oe=V.subtags)==null?void 0:oe.filter(fe=>fe.id===r?(W=fe,!1):!0))||[];return{...V,subtags:ie}})),W&&Z(W),e(`Successfully deleted subtag: ${r}`),!0}return!1}catch(h){return console.error("Error deleting subtag:",h),e(`Error deleting subtag: ${h}`),!1}finally{i(null)}},z=async(r,h)=>(e(`Placeholder: Updating tag points: ${r} to ${h}`),!1),ae=()=>{G(!0),Q("")},K=()=>{G(!1),Q("")},te=()=>{s(!0),H("")},ge=()=>{s(!1),H("")},le=async()=>Y.trim()?await m(Y,"File"):!1,de=async()=>{if(X.trim()&&I){const r=d.find(h=>h.id===I);if(r)return await _(r.tagTitle,X,r.TagType)}return!1};return b.useEffect(()=>{A()},[]),{tags:d,selectedTags:w,displayedTagId:I,isLoadingTags:y,tagIdBeingDeleted:M,subtagIdBeingDeleted:B,isAddingNewTag:q,isAddingNewSubtag:P,newTagTitle:Y,newSubtagTitle:X,isSubmittingNewTag:re,isSubmittingNewSubtag:o,fetchTags:A,selectTag:c,unselectTag:R,selectSubtag:k,unselectSubtag:Z,setDisplayedTag:ce,clearSelectedTags:l,isTagSelected:u,isSubtagSelected:f,getDisplayedTagSubtags:j,setTagIdBeingDeleted:g,setSubtagIdBeingDeleted:i,addNewTag:m,addNewSubtag:_,deleteTag:D,deleteSubtag:O,updateTagPoints:z,startAddingNewTag:ae,cancelAddingNewTag:K,startAddingNewSubtag:te,cancelAddingNewSubtag:ge,submitNewTag:le,submitNewSubtag:de,setNewTagTitle:Q,setNewSubtagTitle:H}},cs=F.div`
  margin: 16px 0;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
`,Ne=F.div`
  margin-bottom: 12px;
`,Re=F.h3`
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  display: flex;
  align-items: center;
  gap: 8px;
`,Oe=F.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  min-height: 32px;
`,ze=F.button`
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
`,us=F(ze)`
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
`,Ue=F.button`
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
`,ps=F.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
`,Be=F.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
`,Me=F.button`
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
`,fs=F.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border: 1px solid #007bff;
  border-radius: 12px;
  background: white;
`,gs=F.input`
  border: none;
  outline: none;
  font-size: 12px;
  background: transparent;
  min-width: 80px;
  max-width: 200px;

  &::placeholder {
    color: #999;
  }
`,_e=F.button`
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
`,ms=F.span`
  background: #6c757d;
  color: white;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: bold;
`,xs=({tag:e,isSelected:d,isDisplayed:n,isBeingDeleted:w,disabled:p,onTagClick:I,onDeleteTag:C,getTagDisplayText:y})=>{const[T,M]=b.useState(!1);return t.jsxs(ze,{$isSelected:d,$isDisplayed:n,$isBeingDeleted:w,disabled:p,onClick:()=>I(e),onMouseEnter:()=>M(!0),onMouseLeave:()=>M(!1),children:[y(e),T&&!p&&!w&&t.jsx(Ue,{onClick:g=>{g.stopPropagation(),C(e.id)},disabled:w,children:"×"})]})},hs=({subtag:e,isSelected:d,isBeingDeleted:n,disabled:w,onSubtagClick:p,onDeleteSubtag:I})=>{const[C,y]=b.useState(!1);return t.jsxs(us,{$isSelected:d,$isBeingDeleted:n,disabled:w,onClick:()=>p(e),onMouseEnter:()=>y(!0),onMouseLeave:()=>y(!1),children:[e.subtagTitle,C&&!w&&!n&&t.jsx(Ue,{onClick:T=>{T.stopPropagation(),I(e.id)},disabled:n,children:"×"})]})},We=({value:e,onChange:d,onSubmit:n,onCancel:w,isSubmitting:p,placeholder:I="Enter tag name..."})=>{const C=b.useRef(null);b.useEffect(()=>{C.current&&C.current.focus()},[]);const y=T=>{T.key==="Enter"?n():T.key==="Escape"&&w()};return t.jsxs(fs,{children:[t.jsx(gs,{ref:C,type:"text",value:e,onChange:T=>d(T.target.value),onKeyDown:y,placeholder:I,disabled:p}),t.jsx(_e,{onClick:n,disabled:!e.trim()||p,title:"Add (Enter)",children:p?"...":"✓"}),t.jsx(_e,{onClick:w,disabled:p,title:"Cancel (Escape)",children:"×"})]})},bs=({tagsManager:e,disabled:d=!1,enhancedLog:n,photoCount:w=1})=>{const{tags:p,selectedTags:I,displayedTagId:C,isLoadingTags:y,tagIdBeingDeleted:T,isAddingNewTag:M,newTagTitle:g,isSubmittingNewTag:B,selectTag:i,unselectTag:q,setDisplayedTag:G,isTagSelected:P,deleteTag:s,startAddingNewTag:Y,cancelAddingNewTag:Q,submitNewTag:X,setNewTagTitle:H}=e,re=c=>{if(d)return;const R=P(c),k=C===c.id;R?R&&!k?(G(c.id),n(`Displayed tag: ${c.tagTitle}`)):R&&k&&(q(c),G(null),n(`Unselected tag: ${c.tagTitle}`)):(i(c),G(c.id),n(`Selected tag for photo application: ${c.tagTitle}`))},E=async c=>{if(d)return;n(`Delete tag initiated: ${c}`);const R=await s(c);n(R?`Tag successfully deleted: ${c}`:`Failed to delete tag: ${c}`)},o=async()=>{await X()||n("Failed to submit new tag")},N=c=>{const R=I.find(Z=>Z.tagTitle===c.tagTitle);if(!R||R.subtags.length===0)return c.tagTitle;const k=R.subtags.map(Z=>Z.subtagTitle).join(" || ");return`${c.tagTitle}  |  ${k}`},A=[...p].sort((c,R)=>c.points!==R.points?R.points-c.points:R.updatedAt-c.updatedAt);return t.jsxs(cs,{children:[t.jsxs(Ne,{children:[t.jsxs(Re,{children:["Select Tags to Apply to Photos",I.length>0&&t.jsxs(ms,{children:[I.length," selected"]})]}),t.jsx(Oe,{children:y?t.jsx(ps,{children:"Loading tags..."}):t.jsxs(t.Fragment,{children:[A.map(c=>t.jsx(xs,{tag:c,isSelected:P(c),isDisplayed:C===c.id,isBeingDeleted:T===c.id,disabled:d,onTagClick:re,onDeleteTag:E,getTagDisplayText:N},c.id)),M?t.jsx(We,{value:g,onChange:H,onSubmit:o,onCancel:Q,isSubmitting:B,placeholder:"Enter tag name..."}):t.jsx(Me,{disabled:d,onClick:Y,children:"+ Add Tag"}),A.length===0&&!M&&t.jsx(Be,{children:"No tags available"})]})})]}),C&&t.jsx(ws,{tagsManager:e,disabled:d,enhancedLog:n}),I.length>0&&t.jsxs("div",{style:{marginTop:"12px",padding:"12px 16px",background:"#e7f3ff",borderRadius:"6px",fontSize:"13px",color:"#0c5aa6",border:"1px solid #b3d9ff"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"6px"},children:[t.jsx("span",{children:"🎯"}),t.jsx("strong",{children:"Ready to Apply Tags:"})]}),"You have selected ",t.jsxs("strong",{children:[I.length," tag",I.length!==1?"s":""]})," to apply to photos.",t.jsx("br",{}),t.jsx("strong",{children:"Next:"})," ",w===1?'Click "Apply Selected Tags to Photo" above to tag your photo.':`Select photos above (they'll show blue borders), then click "Apply Selected Tags to Photos".`]})]})},ws=({tagsManager:e,disabled:d=!1,enhancedLog:n})=>{var E;const{displayedTagId:w,subtagIdBeingDeleted:p,isAddingNewSubtag:I,newSubtagTitle:C,isSubmittingNewSubtag:y,selectSubtag:T,unselectSubtag:M,isSubtagSelected:g,deleteSubtag:B,startAddingNewSubtag:i,cancelAddingNewSubtag:q,submitNewSubtag:G,setNewSubtagTitle:P}=e,s=w?((E=e.tags.find(o=>o.id===w))==null?void 0:E.subtags)||[]:[],Y=e.tags.find(o=>o.id===w),Q=o=>{if(d)return;g(o)?(M(o),n(`Unselected subtag for photo application: ${o.subtagTitle}`)):(T(o),n(`Selected subtag for photo application: ${o.subtagTitle}`))},X=async o=>{if(d)return;n(`Delete subtag initiated: ${o}`);const N=await B(o);n(N?`Subtag successfully deleted: ${o}`:`Failed to delete subtag: ${o}`)},H=async()=>{await G()||n("Failed to submit new subtag")};if(!Y)return null;const re=[...s].sort((o,N)=>o.points!==N.points?N.points-o.points:N.updatedAt-o.updatedAt);return t.jsxs(Ne,{children:[t.jsxs(Re,{children:['Subtags for "',Y.tagTitle,'"']}),t.jsxs(Oe,{children:[re.map(o=>t.jsx(hs,{subtag:o,isSelected:g(o),isBeingDeleted:p===o.id,disabled:d,onSubtagClick:Q,onDeleteSubtag:X},o.id)),I?t.jsx(We,{value:C,onChange:P,onSubmit:H,onCancel:q,isSubmitting:y,placeholder:"Enter subtag name..."}):t.jsx(Me,{disabled:d,onClick:i,children:"+ Add Subtag"}),re.length===0&&!I&&t.jsx(Be,{children:"No subtags available"})]})]})},ys=()=>{const{t:e,language:d}=Ce(),n=be(d)==="rtl",w=At(e),{setShowUsernamePrompt:p,setUsernameInput:I}=w,[C,y]=b.useState(null),[T,M]=b.useState(!1),[g,B]=b.useState(0),[i,q]=b.useState(""),[G,P]=b.useState(""),[s,Y]=b.useState(!1),[Q,X]=b.useState(!1),[H,re]=b.useState("NoPassword"),[E,o]=b.useState(""),[N,A]=b.useState(!1),[c,R]=b.useState(!0),[k,Z]=b.useState(null),[ce,u]=b.useState(!1),[f,j]=b.useState([]),[l,v]=b.useState(new Set),[m,_]=b.useState(new Map),D=x=>{!C&&x&&y(x)},{fileInputRef:O,selectedPhotos:z,setSelectedPhotos:ae,isUploading:K,progressTracker:te,setProgressTracker:ge,debugMessages:le,currentFolderId:de,openFilePicker:r,handleFileSelection:h,log:$}=jt(D);b.useEffect(()=>{(async()=>{try{await lt(),$("🔥 Save-album page S3 credentials prewarmed successfully")}catch(U){$(`⚠️ Save-album page credential prewarming failed: ${String(U)}`)}})()},[]);const S=(x,U)=>{let J=`[${new Date().toISOString()}] ${x}`;if(U!==void 0)try{const se=typeof U=="object"?JSON.stringify(U,null,2):String(U);J+=`
Data: ${se}`,console.log(J),console.log("Data object:",U)}catch(se){J+=` [Error stringifying data: ${se}]`,console.log(J),console.log("Raw data:",U)}else console.log(J);$(J)},W=ds(S),{cognitoUsername:L,publicUsername:V,setPublicUsername:ie}=Lt(y,ae,Z,Y,q,P,A,R,re,o,u,j,S),{saveAlbumDirectly:oe}=es(C||de,L,z,ce,f,i,G,N,c,H,E,m,M,B,ae,ge,S);b.useEffect(()=>{de&&!C&&(y(de),S(`Updated folder ID from upload processor: ${de}`))},[de,C]),b.useEffect(()=>{v(x=>{const U=new Set;return x.forEach(ee=>{ee<z.length&&U.add(ee)}),U}),_(x=>{const U=new Map(x),ee=[];return x.forEach((J,se)=>{se>=z.length&&ee.push(se)}),ee.forEach(J=>{U.delete(J)}),U})},[z.length]);const fe=x=>{S(`Removing photo at index: ${x}`);const U=z.filter((ee,J)=>J!==x);ae(U),S(`New photos count: ${U.length}`),U.length>0?(localStorage.setItem(pe.SELECTED_PHOTOS,JSON.stringify(U)),S(`Updated localStorage with ${U.length} photos`)):(localStorage.removeItem(pe.SELECTED_PHOTOS),S("Removed photos from localStorage")),v(ee=>{const J=new Set;return ee.forEach(se=>{se<x?J.add(se):se>x&&J.add(se-1)}),J}),_(ee=>{const J=new Map;return ee.forEach((se,xe)=>{xe<x?J.set(xe,se):xe>x&&J.set(xe-1,se)}),J})},ue=x=>{S(`Toggling selection for photo at index: ${x}`),v(U=>{const ee=new Set(U);return ee.has(x)?(ee.delete(x),S(`Deselected photo ${x}`)):(ee.add(x),S(`Selected photo ${x}`)),ee})},Ge=()=>{S("Selecting all photos");const x=new Set;for(let U=0;U<z.length;U++)x.add(U);v(x)},Ke=()=>{S("Deselecting all photos"),v(new Set)},qe=()=>{const x=!N;S(`Toggling isOnPublicProfile to: ${x}`),A(x)},He=()=>{const x=!c;S(`Toggling participantsCanAddItems to: ${x}`),R(x)},Je=async()=>{S("Album save initiated"),S("Photo tags applied:",Object.fromEntries(m)),M(!0);try{if(V!=null&&V.startsWith("Profile-")){S("Public username starts with 'Profile-', showing username prompt"),I(""),p(!0),M(!1);return}S("Valid username found, proceeding to save album directly with file-level tagging"),oe()}catch(x){console.error("Error in handleSaveAlbum:",x),S(`Error in handleSaveAlbum: ${x}`),M(!1)}},Qe=x=>{S(`Handling successful username update to: ${x}`),localStorage.setItem(pe.PUBLIC_USERNAME,x),ie(x),p(!1),S("Proceeding to save album after username update"),oe()},Ve=(x,U)=>{S(`Password dialog closed with option: ${x}, password: ${U?"******":"undefined"}`),x&&re(x),U!==void 0&&o(U),X(!1)},Ye=()=>e(H==="NoPassword"?"Add Password":"Password Set"),Xe=()=>{S("Opening password dialog"),X(!0)},Ze=()=>{S("Add photos button clicked"),r(C)},Le=T||K;return t.jsxs(t.Fragment,{children:[t.jsx(St,{}),t.jsxs(Tt,{$isRTL:n,children:[t.jsxs("div",{style:{maxWidth:"900px",margin:"0 auto"},children:[t.jsxs(vt,{children:[t.jsx(It,{href:"my-albums.html",children:e("My Albums")}),t.jsx(Ct,{t:e})]}),s&&k===!0&&t.jsx("div",{style:{marginBottom:"24px"},children:t.jsx(rs,{showFolderDetails:s,isCreator:k,folderName:i,setFolderName:q,folderDescription:G,setFolderDescription:P,isOnPublicProfile:N,handlePublicProfileToggle:qe,participantsCanAddItems:c,handleParticipantsCanAddItemsToggle:He,isSavingAlbum:T||K})}),(K||te.totalFiles>0&&(te.filesUploading>0||te.filesProcessing>0||te.filesComplete<te.totalFiles))&&t.jsx("div",{style:{marginBottom:"16px"},children:t.jsx(_t,{progressTracker:te,isRTL:be(d)==="rtl",variant:"detailed",context:"saving",isUploading:K,showSuccessMessage:!1,showErrorMessage:!0,customMessages:{error:e("Some photos could not be processed. You can continue with the successfully processed photos.")}})}),t.jsx(ss,{isSavingAlbum:T,savingProgress:g}),t.jsxs("div",{style:{marginBottom:"24px"},children:[t.jsx("input",{ref:O,id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:x=>h(x,L),style:{display:"none"}}),t.jsx(ts,{selectedPhotos:z,selectedPhotoIndices:l,isSavingAlbum:T||K,onRemovePhoto:fe,onTogglePhotoSelection:ue,onSelectAllPhotos:Ge,onDeselectAllPhotos:Ke}),s&&k===!0&&l.size>0&&t.jsxs("div",{style:{marginTop:"16px",padding:"16px",backgroundColor:"#f8f9fa",borderRadius:"8px",border:"1px solid #e9ecef"},children:[t.jsxs("div",{style:{marginBottom:"12px",fontSize:"14px",fontWeight:"600",color:"#495057",display:"flex",alignItems:"center",gap:"8px"},children:[t.jsx("span",{children:"🏷️"}),e("Tag Selected Photos")," (",l.size,")"]}),t.jsx(bs,{tagsManager:W,disabled:Le,enhancedLog:S,photoCount:z.length})]})]}),t.jsx("div",{style:{position:"sticky",bottom:"20px",zIndex:100,backgroundColor:"#fff",padding:"16px",borderRadius:"12px",boxShadow:"0 4px 20px rgba(0,0,0,0.1)",border:"1px solid #e9ecef"},children:t.jsxs(Pt,{children:[t.jsx(he,{onClick:Ze,disabled:T||K,style:{background:"#28a745",borderColor:"#28a745"},children:t.jsxs("span",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[t.jsx("span",{children:"📷"}),e(K?"Uploading...":"Add More Photos")]})}),k===!0&&t.jsx(he,{$passwordSet:H!=="NoPassword",onClick:Xe,disabled:T||K,style:{background:H!=="NoPassword"?"#ffc107":"#6c757d",borderColor:H!=="NoPassword"?"#ffc107":"#6c757d",color:H!=="NoPassword"?"#000":"#fff"},children:t.jsxs("span",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[t.jsx("span",{children:"🔒"}),Ye()]})}),t.jsx(he,{$primary:!0,onClick:Je,disabled:T||K||z.length===0,style:{background:"#007bff",borderColor:"#007bff",fontWeight:"600",fontSize:"16px",padding:"12px 24px"},children:t.jsxs("span",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[t.jsx("span",{children:"💾"}),e(T?"Saving Album...":"Save Album")]})})]})}),t.jsx(kt,{t:e,language:d,usernameManager:w,onSuccess:Qe}),t.jsx(Xt,{isOpen:Q,onClose:Ve,initialOption:H,initialPassword:E})]}),t.jsx(Dt,{debugMessages:le,t:e,isRTL:n,textDirection:n?"rtl":"ltr"})]})]})},$s=()=>t.jsx(nt,{children:t.jsx(ys,{})});at.createRoot(document.getElementById("root")).render(t.jsx($s,{}));
