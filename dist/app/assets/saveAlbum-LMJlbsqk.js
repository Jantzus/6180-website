import{d as z,u as Ke,a as y,j as t,g as Ie,h as de,L as me,i as Fe,s as $t,m as Tt,f as ye,k as vt,l as It,n as Pt,r as At,R as kt,I as jt,p as Ct}from"./utils-CuQXS0Z6.js";import{C as Pe,F as _e,e as Ee,f as Dt,g as Ft,T as Ne,h as Re,i as Oe,j as ze,P as _t,k as Et,l as Ge,m as qe,n as Nt,o as Rt,S as Ot,p as zt,V as Bt,q as Mt,r as Ut,M as Wt,G as Kt,A as Gt,H as qt,s as Ht,t as Jt,B as ve}from"./styled-components-C-fYuu40.js";import{u as Qt,U as Vt}from"./useUsernameManagement-CaNuQ_Uq.js";import{u as Yt,U as Xt}from"./useFileUploadProcessor-Bear7N4c.js";import{F as Zt}from"./types-B1wTo9j4.js";import{L as Lt,D as es}from"./DebugLog-CmFnIt6X.js";import{L as ts}from"./LazyImage-CwZnuvnu.js";const l={colors:{primary:"#007bff",primaryDark:"#0056b3",secondary:"#6c757d",success:"#4caf50",danger:"#e53935",warning:"#ff9800",white:"#fff",text:{primary:"#333",secondary:"#666",light:"#777"},background:{primary:"#f9fafb",highlight:"#f0f7ff"},border:"#ddd"},spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px"},borderRadius:{small:"4px",medium:"8px"},boxShadow:{lg:"0 4px 10px rgba(0,0,0,0.08)"}},ss=z.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
`,rs=z.div`
  background-color: ${l.colors.white};
  border-radius: ${l.borderRadius.medium};
  box-shadow: ${l.boxShadow.lg};
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
`,is=z.div`
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
`,os=z.div`
  direction: ${e=>e.$isRTL?"rtl":"ltr"};
`,as=z.h3`
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
`,ns=z.p`
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
`,Be=z.div`
  margin-bottom: ${l.spacing.lg};
`,Me=z.label`
  display: block;
  margin-bottom: ${l.spacing.sm};
  font-size: 14px;
  font-weight: 500;
  color: ${l.colors.text.primary};
`,ls=z.input`
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
`,ds=z.div`
  display: flex;
  flex-direction: column;
  gap: ${l.spacing.md};
  margin-bottom: ${l.spacing.xl};
`,cs=z.div`
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
`,us=z.div`
  flex: 1;
`,ps=z.div`
  margin-bottom: ${l.spacing.xs};
`,fs=z.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${l.colors.primary};
  flex-shrink: 0;
`,gs=z.label`
  font-size: 16px;
  font-weight: 500;
  color: ${l.colors.text.primary};
  cursor: pointer;
  display: block;
`,ms=z.div`
  font-size: 14px;
  color: ${l.colors.text.secondary};
  margin-top: ${l.spacing.xs};
`,xs=z.div`
  color: ${l.colors.warning};
  font-size: 12px;
  font-style: italic;
  margin-top: ${l.spacing.xs};
  font-weight: 500;
`,hs=z.div`
  display: flex;
  gap: ${l.spacing.sm};
  justify-content: center;
  margin-top: ${l.spacing.xl};
`,Ue=z.button`
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
`,bs=z.div`
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
`,ws=[{value:"NotVisible",titleKey:"Password Required To See Or Save",descriptionKey:"Album will be completely hidden until correct password is entered"},{value:"Watermark",titleKey:"Watermarked And No Saving Without Password",descriptionKey:"Photos will be visible with watermarks, password required to save"},{value:"CannotBeSaved",titleKey:"Password Required To Save",descriptionKey:"Photos are visible but password required to download or save"},{value:"NoPassword",titleKey:"No Password",descriptionKey:"Album is fully public with no restrictions"}],ys=({isOpen:e,onClose:d,initialOption:a="NoPassword",initialPassword:T=""})=>{const{t:p,language:P}=Ke(),c=Ie(P)==="rtl",[v,g]=y.useState(a),[S,W]=y.useState(T);if(y.useEffect(()=>{e&&(g(a),W(T))},[e,a,T]),!e)return null;const u=S.trim()==="",o=j=>{g(j)},H=j=>{j.target===j.currentTarget&&d()},q=j=>j!=="NoPassword";return t.jsxs(t.Fragment,{children:[t.jsx(ss,{onClick:H}),t.jsx(rs,{children:t.jsx(is,{children:t.jsxs(os,{$isRTL:c,children:[t.jsx(as,{children:p("Album Password Policy")}),t.jsx(ns,{children:p("Configure password protection for your album. Choose how you want to restrict access to your photos.")}),t.jsxs(Be,{children:[t.jsx(Me,{children:p("Enter Password")}),t.jsx(ls,{type:"text",placeholder:p("Enter password (optional)"),value:S,onChange:j=>W(j.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"})]}),t.jsxs(Be,{children:[t.jsx(Me,{children:p("Select Protection Level")}),t.jsx(ds,{children:ws.map(j=>t.jsxs(cs,{$isSelected:v===j.value,onClick:()=>o(j.value),children:[t.jsx(fs,{type:"radio",name:"protection",checked:v===j.value,onChange:()=>o(j.value)}),t.jsxs(us,{children:[t.jsx(ps,{children:t.jsx(gs,{children:p(j.titleKey)})}),t.jsx(ms,{children:p(j.descriptionKey)}),u&&q(j.value)&&v===j.value&&t.jsx(xs,{children:p('⚠️ Will use "password" as default if left empty')})]})]},j.value))})]}),q(v)&&t.jsxs(bs,{children:[t.jsx("strong",{children:p("💡 Password Protection Info:")}),t.jsx("br",{}),p('If you leave the password field empty, "password" will be used as the default password. You can change this anytime in album settings.')]}),t.jsxs(hs,{children:[t.jsx(Ue,{$variant:"secondary",onClick:()=>d(),children:p("Cancel")}),t.jsx(Ue,{$variant:"primary",onClick:()=>{const j=u&&q(v)?"password":S;console.log(`Saving with option: ${v}, password: ${j.length>0?"********":"none"}`),d(v,j)},children:p("Save Settings")})]})]})})})]})},Ss=`
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
`,$s=(e,d,a,T,p,P,c,v,g,S,W,u,o)=>{const[H,q]=y.useState(null),[j,s]=y.useState(null),Z=async D=>{o(`Initializing folder ID with username: ${D}`);try{const B=new URLSearchParams(window.location.search).get("folderId");if(o(`Folder ID from URL: ${B||"null"}`),B){e(B),o(`Using existing folder ID: ${B}`);try{o(`Fetching details for folder: ${B}`);const F=await X(B,o);if(o("Folder details retrieved:",F),F){const m=`${D}_____${D}____Account`,U=F.creatorId===m;if(o(`User is creator of folder: ${U}, accountId: ${m}, creator: ${F.creatorId}`),a(U),U){o("User is creator, showing folder details"),T(!0),p(F.folderName),P(F.folderDescription),c(F.isOnPublicProfile),o(`Setting isOnPublicProfile: ${F.isOnPublicProfile}`),F.participantsCanAddItems!==void 0&&(v(F.participantsCanAddItems),o(`Setting participantsCanAddItems: ${F.participantsCanAddItems}`));const O=F.passwordPolicy;o(`Password policy from folder details: ${O}`),g(O),O!=="NoPassword"&&F.password&&S(F.password),o(`Set password protection option to: ${O}`)}else o("User is NOT the creator, hiding editable fields"),T(!1)}else o("No folder details retrieved, setting isCreator to true"),a(!0),T(!0)}catch(F){console.error("Error fetching folder details:",F),o(`Error fetching folder details: ${F}`),a(!1)}}else{const F=`${D}_____${Fe()}____Folder`;o(`Creating new folder ID: ${F}`),e(F),o("Setting isCreator to true for new album"),a(!0),T(!0)}}catch(n){console.error("Folder ID initialization error:",n),o(`Folder ID initialization error: ${n}`),a(!1)}},X=async(D,n)=>{var B,F,m,U,O,ee,fe,x;n(`Fetching details for folder ID: ${D}`);try{const b=await de();if(!b)return n("No token available for fetching folder details"),null;n("Sending GraphQL query to fetch folder details");const h=await(await fetch(ye,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${b}`},body:JSON.stringify({query:Ss,variables:{folderIds:[D],fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(n("Folder details API response:",h),h.errors)return console.error("GraphQL errors:",h.errors),n(`GraphQL errors: ${JSON.stringify(h.errors)}`),null;const C=((F=(B=h==null?void 0:h.data)==null?void 0:B.fetchFolders)==null?void 0:F.items)||[];if(n(`Found ${C.length} folder items`),C.length===0)return n("No folder items found"),null;const $=C[0];n("Retrieved folder data:",$);const E=((U=(m=$.folderPosition)==null?void 0:m.profileIds)==null?void 0:U.some(M=>M.includes("Public____Profile")))||!1;n(`Folder is on public profile: ${E}`),n("Profile IDs:",(O=$.folderPosition)==null?void 0:O.profileIds);const I=(ee=$.folderInviteParameters)==null?void 0:ee.usingFolderInviteGrantsRightToAddItems;return n(`Participants can add items: ${I}`),{creatorId:$.creatorId||"",folderName:$.folderName||"",folderDescription:$.folderDescription||"",passwordPolicy:((fe=$.folderPassword)==null?void 0:fe.policy)||"NoPassword",password:((x=$.folderPassword)==null?void 0:x.password)||"",isOnPublicProfile:E,participantsCanAddItems:I!==void 0?I:!0}}catch(b){return console.error("Error in fetchFolderDetails:",b),n(`Error in fetchFolderDetails: ${b}`),null}},L=()=>{o("Attempting to restore photos from localStorage");try{const D=localStorage.getItem(me.SELECTED_PHOTOS);if(o(`Found stored photos: ${D?"yes":"no"}`),D)try{const n=JSON.parse(D);o(`Parsed ${n.length} photos from localStorage`),Array.isArray(n)&&n.length>0&&(d(n),o(`Restored ${n.length} photos to state`))}catch(n){console.error("Error parsing stored photos:",n),o(`Error parsing stored photos: ${n}`)}}catch(D){console.error("Error restoring photos from storage:",D),o(`Error restoring photos from storage: ${D}`)}},V=()=>{o("Testing S3 connection");try{$t?o("S3 client is available"):(console.error("S3 client not available"),o("S3 client not available"))}catch(D){console.error("S3 connection test error:",D),o(`S3 connection test error: ${D}`)}},ae=async()=>{var D;o("Starting component initialization");try{o("Checking login with refresh");const n=await de();if(!n){o("No token returned from login check, aborting initialization");return}try{const B=localStorage.getItem(me.PUBLIC_USERNAME);o(`Retrieved public username from localStorage: ${B||"null"}`),s(B||null);const m=JSON.parse(atob(n.split(".")[1]))["cognito:username"];if(m){o(`Extracted Cognito username from token: ${m}`),q(m);const U=localStorage.getItem(me.SUB_ALBUM_DATA);if(o(`Sub-album data from localStorage: ${U||"null"}`),U)try{const O=JSON.parse(U);if(o("Parsed sub-album data:",O),O.isSubAlbum&&((D=O.selectedFileIds)==null?void 0:D.length)>0){o(`Valid sub-album data found with ${O.selectedFileIds.length} files`),W(!0),u(O.selectedFileIds),O.selectedPhotos&&O.selectedPhotos.length>0&&(o(`Found ${O.selectedPhotos.length} selected photos in sub-album data`),d(O.selectedPhotos)),T(!0),a(!0);const ee=`${m}_____${Fe()}____Folder`;o(`Generated new folder ID for sub-album: ${ee}`),e(ee)}else o("Invalid sub-album data, proceeding with normal initialization"),await Z(m)}catch(O){console.error("Error parsing sub-album data:",O),o(`Error parsing sub-album data: ${O}`),await Z(m)}else o("No sub-album data found, proceeding with normal folder initialization"),await Z(m)}else o("No Cognito username found in token")}catch(B){console.error("User data initialization error:",B),o(`User data initialization error: ${B}`)}L(),V(),o("Component initialization completed")}catch(n){console.error("Initialization error:",n),o(`Initialization error: ${n}`)}};return y.useEffect(()=>{ae()},[]),{cognitoUsername:H,publicUsername:j,setPublicUsername:s}},Ts=(e,d,a,T,p,P,c,v,g,S,W,u,o,H,q,j,s)=>{const Z=x=>(s(`Converting ${x.length} tags to API format`),x.map(b=>({TagType:b.TagType,tagTitle:b.tagTitle,selectedSubtagInputs:b.subtags.map(_=>({TagType:b.TagType,tagTitle:_.tagTitle,subtagTitle:_.subtagTitle}))}))),X=x=>{s(`Save progress text: ${x}`);const b=document.getElementById("saveProgressText");b&&(b.innerText=x)},L=x=>{const b=document.getElementById("saveProgress");b?(b.style.width=`${x}%`,s(`Updated save progress bar: ${x}%`)):s("Progress bar element not found"),H(x)},V=(x,b)=>{s(`Splitting array of ${x.length} items into chunks of ${b}`);const _=[];for(let h=0;h<x.length;h+=b)_.push(x.slice(h,h+b));return s(`Created ${_.length} chunks`),_},ae=x=>{const b=new Set;return x.filter(_=>b.has(_.fileId)?(s(`Skipping duplicate file reference with ID: ${_.fileId}`),!1):(b.add(_.fileId),!0))},D=(x,b,_)=>{s("Creating folder position input WITHOUT folder-level tags"),s(`Profile visibility: ${v?"Public":"Only Me"}`);const h=v?[`${d}_____Public____Profile`]:["Only Me_____Only Me____Profile"];s(`Profile IDs: ${JSON.stringify(h)}`);let C=[];T&&p.length>0&&(s(`Creating file reference IDs for ${p.length} sub-album files`),C=p.map(M=>{const J=M.split("_____");if(J.length>=2){const oe=J[1].split("____")[0],pe=`${_}_____${oe}____FileReference`;return s(`Created file reference ID for sub-album: ${pe}`),pe}return s(`Using original fileId as fallback: ${M}`),M})),s(`Created ${C.length} acceptedFileReferenceIds`);const $=S!=="NoPassword"?W:null;if(s(`Password protection: ${S}`),s(`Album password: ${$?"******":"null"}`),s(`Participants can add items: ${g}`),!e)throw s("Error: folderId is null or undefined"),new Error("folderId is required to create folder position input");const E=vt(e),I=It(E);return{currentTime:x,folderId:e,profileIds:h,folderPositionPoints:1,acceptedFileReferenceIds:C,folderInput:{folderAboutContactIds:[b],albumNanoId:I,folderName:P,folderDescription:c,folderPasswordInput:{password:$,policy:S},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,usingFolderInviteGrantsRightToRemoveItems:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:g,addedItemsNeedFolderCreatorApproval:!1}}}},n=(x,b,_)=>(s(`Creating file reference inputs with individual photo tags for ${x.length} photos`),x.map((h,C)=>{var J;const $=u.get(C)||[],E=Z($);if(s(`Photo ${C} (${h.fileName}): ${$.length} tags applied`),h.fileId)return s(`Using existing fileId for photo: ${h.fileId}`),{fileReferencesHolderId:e,currentTime:b,points:1,hasBeenDeleted:!1,selectedTagInputs:E,fileId:h.fileId,fileInput:null};const I=h.type==="video"||(J=h.type)!=null&&J.startsWith("video")?`Input/Video/${h.fileName}`:`Input/Image/${h.fileName}`,M=`${d}_____${h.fileName}____File`;return s(`Created file reference for ${h.fileName}:`),s(`  - dataKey: ${I}`),s(`  - fileId: ${M}`),s(`  - thumbnailDataKey: ${h.thumbnailDataKey||"undefined"}`),s(`  - size: ${h.size}`),s(`  - thumbnailSize: ${h.thumbnailSize||0}`),s(`  - duration: ${h.duration||"undefined"}`),s(`  - tags: ${$.length} tags selected for this photo`),{fileReferencesHolderId:e,currentTime:b,points:1,hasBeenDeleted:!1,selectedTagInputs:E,fileId:M,fileInput:{fileId:M,ownerFileInput:{editorContactIds:[_],FileSharingOptionsEnum:"Anyone",dataKey:I,thumbnailDataKey:h.thumbnailDataKey,dataInBytes:h.size,thumbnailDataInBytes:h.thumbnailSize||0,s3UploadedAt:b,durationInSeconds:h.duration},editorFileInput:{aboutContactIds:[_],captionText:"",numericFilterInputs:[]}}}})),B=async x=>{var C,$;s("Sending folder-only mutation (no file references, no folder tags)");const b=await de();if(!b)throw s("No token available for saving album, aborting"),new Error("Authentication token not available");const _=`
      mutation MyMutation($folderPositionInputs: [FolderPositionInput!]) {
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items {
            id
          }
        }
      }
    `,h={folderPositionInputs:[x]};s("GraphQL folder-only mutation variables:",h);try{s("Sending API request to save folder");const E=await fetch(ye,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${b}`},body:JSON.stringify({query:_,variables:h})});s(`API response status: ${E.status}`);const I=await E.text();s(`API response raw text: ${I}`);const M=JSON.parse(I);if(s("API response JSON:",M),M.errors)throw console.error("Folder save failed:",M.errors),s("Folder save failed with errors:",M.errors),new Error("Failed to save folder");return s("Folder saved successfully"),(($=(C=M.data)==null?void 0:C.changeFiles)==null?void 0:$.items)||[]}catch(E){throw console.error("Error in sendFolderOnlyMutation:",E),s(`Error in sendFolderOnlyMutation: ${E}`),E}},F=async x=>{var C,$,E,I,M;s(`Sending file references-only mutation with ${x.length} items (each with individual tags)`);const b=await de();if(!b)throw s("No token available for saving file references, aborting"),new Error("Authentication token not available");const _=`
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
    `,h={updatedFileReferenceInputs:x};s("GraphQL file references-only mutation variables (first item):",x.length>0?x[0]:"No items");try{s("Sending API request to save file references with individual tags");const J=await fetch(ye,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${b}`},body:JSON.stringify({query:_,variables:h})});s(`API response status: ${J.status}`);const ie=await J.text();s(`API response raw text: ${ie.substring(0,500)}...`);const oe=JSON.parse(ie);if(s("API response JSON items count:",((E=($=(C=oe.data)==null?void 0:C.changeFiles0)==null?void 0:$.items)==null?void 0:E.length)||0),oe.errors)throw console.error("File references save failed:",oe.errors),s("File references save failed with errors:",oe.errors),new Error("Failed to save file references");return s("File references chunk saved successfully with individual photo tags"),((M=(I=oe.data)==null?void 0:I.changeFiles0)==null?void 0:M.items)||[]}catch(J){throw console.error("Error in sendFileReferencesOnlyMutation:",J),s(`Error in sendFileReferencesOnlyMutation: ${J}`),J}},m=async(x,b)=>{var $,E,I,M,J,ie,oe,pe,ce;s(`Sending final chunk with folder mutation (${x.length} file references, no folder tags)`);const _=await de();if(!_)throw s("No token available for saving final chunk, aborting"),new Error("Authentication token not available");const h=`
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
    `,C={folderPositionInputs:[b],updatedFileReferenceInputs:x};s("GraphQL final mutation variables (folder + last chunk, no folder tags)");try{s("Sending API request for final save with folder (no folder tags)");const ue=await fetch(ye,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${_}`},body:JSON.stringify({query:h,variables:C})});s(`API response status: ${ue.status}`);const be=await ue.text();s(`API response raw text: ${be.substring(0,500)}...`);const r=JSON.parse(be);if(s("API response JSON:",{fileReferencesCount:((I=(E=($=r.data)==null?void 0:$.changeFiles0)==null?void 0:E.items)==null?void 0:I.length)||0,folderItems:((J=(M=r.data)==null?void 0:M.changeFiles)==null?void 0:J.items)||[]}),r.errors)throw console.error("Final save failed:",r.errors),s("Final save failed with errors:",r.errors),new Error("Failed to complete album save");return s("Final chunk and folder saved successfully (with individual photo tags)"),{fileReferences:((oe=(ie=r.data)==null?void 0:ie.changeFiles0)==null?void 0:oe.items)||[],folderPositions:((ce=(pe=r.data)==null?void 0:pe.changeFiles)==null?void 0:ce.items)||[]}}catch(ue){throw console.error("Error in sendFinalChunkWithFolderMutation:",ue),s(`Error in sendFinalChunkWithFolderMutation: ${ue}`),ue}},U=async()=>(s("Validating required data"),await de()?d?e?(s("All required data validated successfully"),!0):(s("No folder ID, validation failed"),!1):(s("No Cognito username, validation failed"),!1):(s("No token available, validation failed"),!1)),O=()=>{s("Handling successful save"),Pt(q,j,[me.SELECTED_PHOTOS,me.SUB_ALBUM_DATA],s),s("Album data cleared");const x=document.getElementById("saveProgressText");x&&(x.innerText="Album saved successfully!",s("Updated progress text to 'Album saved successfully!'")),sessionStorage.setItem("album_just_saved","true"),s("Set 'album_just_saved' flag in sessionStorage"),s("Setting timeout for redirect to my-albums.html"),setTimeout(()=>{s("Redirecting to my-albums.html"),At("my-albums.html")},1e3)},ee=async(x,b)=>{s("Starting chunked save process (individual photo tags, no folder tags)");try{X("Processing files in chunks...");const _=48;if(b.length===0)s("No file references to process, saving only folder position (no folder tags)"),await B(x);else{const h=ae(b);s(`After removing duplicates, processing ${h.length} unique file references`);const C=V(h,_);s(`Split file references into ${C.length} chunks of max size ${_}`);for(let $=0;$<C.length;$++){const E=C[$];s(`Processing chunk ${$+1} of ${C.length} with ${E.length} file references`);const I=$/C.length*80;H(10+I),L(10+I),$<C.length-1?(X(`Saving files: chunk ${$+1} of ${C.length}...`),await F(E)):(X("Finalizing album..."),await m(E,x))}}H(100),L(100),X("Album saved successfully!"),O()}catch(_){console.error("Error in chunked save process:",_),s(`Error in chunked save process: ${_}`),X(`Error: ${_}`),o(!1)}};return{saveAlbumDirectly:async()=>{s("Starting direct album save with individual photo tagging"),s(`Photo tags map: ${u.size} photos have tags applied`),o(!0),H(5);try{if(s("Validating required data for save"),!await U()){s("Required data validation failed, aborting save"),o(!1);return}const x=Math.floor(Date.now()/1e3),b=`${d}_____${d}____Account`,h=e.split("_____")[1].split("____")[0];s(`Save timestamp: ${x}`),s(`Account ID: ${b}`),s(`Folder ID: ${e}`),s(`Folder target item identifier: ${h}`),s("Creating folder position input (no folder tags)");const C=D(x,b,h);s("Folder position input created:",C);let $=[];const E=a.filter(I=>I.status==="complete");if(s(`Found ${E.length} valid photos with 'complete' status`),E.length>0){const I=E.filter(J=>!J.fileId);s(`Found ${I.length} new uploads to move from temp to public folder`),I.length>0&&(s("Moving files from temp to public folder"),await Tt(I,L,s)),s("Creating file reference inputs for uploads with individual photo tags");const M=n(E,x,b);s(`Created ${M.length} file reference inputs for uploads`,M),$=$.concat(M)}if(T&&p.length>0){s(`Adding ${p.length} existing file references for sub-album`);const I=p.map(M=>(s(`Creating file reference for existing file ID: ${M}`),{fileReferencesHolderId:e,currentTime:x,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:M,fileInput:null}));s(`Created ${I.length} file reference inputs for existing files`,I),$=$.concat(I)}s(`Total file reference inputs: ${$.length}`),s("Sending GraphQL mutations with chunked file references (individual photo tags)"),await ee(C,$)}catch(x){console.error("Error in saveAlbumDirectly:",x),s(`Error in saveAlbumDirectly: ${x}`),o(!1)}}}},vs=({selectedPhotos:e,selectedPhotoIndices:d,isSavingAlbum:a,onRemovePhoto:T,onTogglePhotoSelection:p,onSelectAllPhotos:P,onDeselectAllPhotos:c,hideHeader:v=!1})=>{const{t:g}=Ae();if(e.length===0)return null;const S=d.size>0,W=d.size===e.length;return t.jsxs(t.Fragment,{children:[!v&&e.length>1&&t.jsx(Pe,{style:{marginBottom:"16px",border:"2px solid #007bff"},children:t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px"},children:[t.jsx("span",{style:{fontWeight:"bold",fontSize:"14px",color:"#007bff"},children:S?g("{{count}} file(s) selected for tagging",{count:d.size}):g("Click files below to select them for tagging")}),t.jsxs("div",{style:{display:"flex",gap:"8px",marginLeft:"auto"},children:[!W&&t.jsx("button",{onClick:P,disabled:a,style:{padding:"6px 12px",border:"1px solid #007bff",borderRadius:"4px",background:"#007bff",color:"white",fontSize:"12px",cursor:"pointer",fontWeight:"bold"},children:g("Select All")}),S&&t.jsx("button",{onClick:c,disabled:a,style:{padding:"6px 12px",border:"1px solid #6c757d",borderRadius:"4px",background:"transparent",color:"#6c757d",fontSize:"12px",cursor:"pointer"},children:g("Deselect All")})]})]})}),t.jsx(Nt,{children:e.map((u,o)=>{var q,j;const H=d.has(o);return t.jsxs(Rt,{style:{position:"relative",cursor:e.length>1?"pointer":"default",border:H?"3px solid #007bff":"1px solid #e9ecef",borderRadius:"8px",overflow:"hidden"},onClick:()=>e.length>1&&p(o),children:[t.jsx("button",{onClick:s=>{s.stopPropagation(),!a&&confirm(g("Are you sure you want to remove this photo?"))&&T(o)},disabled:a,style:{position:"absolute",top:"8px",right:"8px",width:"24px",height:"24px",borderRadius:"50%",border:"none",backgroundColor:"rgba(220, 53, 69, 0.9)",color:"white",cursor:a?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px",fontWeight:"900",zIndex:20,opacity:a?.5:1,transition:"all 0.2s ease",boxShadow:"0 2px 4px rgba(0,0,0,0.3)",lineHeight:"1"},onMouseEnter:s=>{a||(s.currentTarget.style.backgroundColor="rgba(200, 35, 51, 1)",s.currentTarget.style.transform="scale(1.1)")},onMouseLeave:s=>{a||(s.currentTarget.style.backgroundColor="rgba(220, 53, 69, 0.9)",s.currentTarget.style.transform="scale(1)")},title:g("Remove photo"),children:"×"}),e.length>1&&H&&t.jsx("div",{style:{position:"absolute",bottom:"8px",left:"8px",right:"8px",background:"rgba(0, 123, 255, 0.9)",color:"white",padding:"4px 8px",borderRadius:"4px",fontSize:"11px",fontWeight:"bold",textAlign:"center",zIndex:10},children:"SELECTED FOR TAGGING"}),u.status!=="complete"&&t.jsx(Ot,{$status:u.status,children:u.status==="error"?"✕":u.status==="uploading"?"↑":u.status==="processing"?"⚙️":"•"}),t.jsxs(zt,{style:{opacity:e.length===1||!H?1:.85,transition:"opacity 0.2s ease"},children:[u.type==="video"||(q=u.type)!=null&&q.startsWith("video")?t.jsx(Bt,{src:u.s3PreviewUrl,controls:!0}):t.jsx(Mt,{src:u.s3PreviewUrl,alt:u.fileName}),(u.status==="uploading"||u.status==="processing")&&t.jsx(Ge,{$bottom:"4px",$left:"4px",$right:"4px",$height:"4px",children:t.jsx(qe,{$progress:u.progress,$status:u.status})})]}),t.jsxs(Ut,{children:[(j=u.type)!=null&&j.startsWith("video")?g("Video"):g("Image"),u.size&&` • ${(u.size/1024/1024).toFixed(1)} MB`,u.duration&&` • ${u.duration}s`]}),u.status==="error"&&u.errorMessage&&t.jsxs(Wt,{$type:"error",children:[g("Error"),": ",u.errorMessage.length>40?u.errorMessage.substring(0,37)+"...":u.errorMessage]})]},o)})})]})},Is=({isSavingAlbum:e,savingProgress:d})=>{const{t:a}=Ae();return e?t.jsxs(Pe,{children:[t.jsx(_t,{children:a("Saving Album")}),t.jsx(Et,{id:"saveProgressText",children:a("Moving files...")}),t.jsx(Ge,{children:t.jsx(qe,{id:"saveProgress",$progress:d/100})})]}):null},Ps=({showFolderDetails:e,isCreator:d,folderName:a,setFolderName:T,folderDescription:p,setFolderDescription:P,isOnPublicProfile:c,handlePublicProfileToggle:v,participantsCanAddItems:g,handleParticipantsCanAddItemsToggle:S,isSavingAlbum:W})=>{const{t:u}=Ae();return!e||d!==!0?null:t.jsxs(Pe,{children:[t.jsxs(_e,{children:[t.jsx(Ee,{htmlFor:"folderName",children:u("Album Name (Optional)")}),t.jsx(Dt,{id:"folderName",type:"text",value:a,onChange:o=>T(o.target.value),placeholder:u("Enter album name")})]}),t.jsxs(_e,{children:[t.jsx(Ee,{htmlFor:"folderDescription",children:u("Album Description (Optional)")}),t.jsx(Ft,{id:"folderDescription",value:p,onChange:o=>P(o.target.value),placeholder:u("Enter album description"),rows:4})]}),t.jsxs(Ne,{children:[t.jsx(Re,{children:u(c?"On Public Profile":"Not On Public Profile")}),t.jsxs(Oe,{children:[t.jsx("input",{type:"checkbox",checked:c,onChange:v,disabled:W}),t.jsx(ze,{})]})]}),t.jsxs(Ne,{children:[t.jsx(Re,{children:u(g?"Participants Can Add Items":"Participants Cannot Add Items")}),t.jsxs(Oe,{children:[t.jsx("input",{type:"checkbox",checked:g,onChange:S,disabled:W}),t.jsx(ze,{})]})]})]})},Ae=()=>({t:(e,d)=>d&&typeof d=="object"&&"count"in d?e.replace("{{count}}",String(d.count)):e,language:"en"}),As=`
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
`,ks=`
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
`,js=`
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
`,Cs=`
  mutation DeleteTag($tagId: String!) {
    deleteTag(tagId: $tagId) {
      id
      hasBeenDeleted
    }
  }
`,Ds=`
  mutation DeleteSubtag($subtagId: String!) {
    deleteSubtag(subtagId: $subtagId) {
      id
      hasBeenDeleted
    }
  }
`,Fs=e=>{const[d,a]=y.useState([]),[T,p]=y.useState([]),[P,c]=y.useState(null),[v,g]=y.useState(!1),[S,W]=y.useState(null),[u,o]=y.useState(null),[H,q]=y.useState(!1),[j,s]=y.useState(!1),[Z,X]=y.useState(""),[L,V]=y.useState(""),[ae,D]=y.useState(!1),[n,B]=y.useState(!1),F=async()=>{var r,f;e("Fetching tags from API"),g(!0);try{const k=await de();if(!k){e("No token available for fetching tags");return}const K=await(await fetch(ye,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${k}`},body:JSON.stringify({query:As,variables:{fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(e("Tags API response:",K),K.errors){console.error("GraphQL errors:",K.errors),e(`GraphQL errors: ${JSON.stringify(K.errors)}`);return}const te=(((f=(r=K==null?void 0:K.data)==null?void 0:r.fetchRelations)==null?void 0:f.items)||[]).map(Y=>{var le,xe;return{id:Y.id,tagTitle:Y.tagTitle,TagType:Y.TagType,points:Y.points,createdAt:Y.createdAt,updatedAt:Y.updatedAt,subtags:((xe=(le=Y.subtags)==null?void 0:le.items)==null?void 0:xe.map(ge=>({id:ge.id,tagTitle:ge.tagTitle,subtagTitle:ge.subtagTitle,TagType:ge.TagType,points:ge.points,createdAt:ge.createdAt,updatedAt:ge.updatedAt})))||[]}});e(`Fetched ${te.length} tags`),a(te)}catch(k){console.error("Error fetching tags:",k),e(`Error fetching tags: ${k}`)}finally{g(!1)}},m=r=>{if(e(`Selecting tag for photo application: ${r.tagTitle}`),!T.find(k=>k.tagTitle===r.tagTitle)){const k={tagTitle:r.tagTitle,TagType:r.TagType,subtags:[]};p(Q=>[...Q,k]),e(`Tag ${r.tagTitle} added to selection for photo application`)}},U=r=>{e(`Unselecting tag from photo application: ${r.tagTitle}`),p(f=>f.filter(k=>k.tagTitle!==r.tagTitle)),P===r.id&&c(null)},O=r=>{e(`Selecting subtag for photo application: ${r.subtagTitle} for tag: ${r.tagTitle}`),p(f=>f.map(k=>k.tagTitle===r.tagTitle&&!k.subtags.find(K=>K.subtagTitle===r.subtagTitle)?{...k,subtags:[...k.subtags,{tagTitle:r.tagTitle,subtagTitle:r.subtagTitle}]}:k))},ee=r=>{e(`Unselecting subtag from photo application: ${r.subtagTitle} for tag: ${r.tagTitle}`),p(f=>f.map(k=>k.tagTitle===r.tagTitle?{...k,subtags:k.subtags.filter(Q=>Q.subtagTitle!==r.subtagTitle)}:k))},fe=r=>{e(`Setting displayed tag: ${r}`),c(r)},x=r=>T.some(f=>f.tagTitle===r.tagTitle),b=r=>{const f=T.find(k=>k.tagTitle===r.tagTitle);return(f==null?void 0:f.subtags.some(k=>k.subtagTitle===r.subtagTitle))||!1},_=()=>{if(!P)return[];const r=d.find(f=>f.id===P);return(r==null?void 0:r.subtags)||[]},h=()=>{e("Clearing all selected tags"),p([]),c(null)},C=()=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(r){const f=Math.random()*16|0;return(r=="x"?f:f&3|8).toString(16)}),$=async(r,f)=>{if(e(`Adding new tag: ${r} of type: ${f}`),!r.trim())return e("Cannot add tag with empty title"),!1;D(!0);try{if(!await de())return e("No token available for adding tag"),!1;if(await(async()=>(e("PLACEHOLDER: Would send GraphQL mutation to add tag",{mutation:ks,variables:{tagInput:{tagTitle:r.trim(),TagType:f,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(se=>setTimeout(se,500)),!0))()){const se={id:C(),tagTitle:r.trim(),TagType:f,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3),subtags:[]};return a(te=>[se,...te]),m(se),fe(se.id),X(""),q(!1),e(`Successfully added new tag for photo application: ${r}`),!0}return!1}catch(k){return console.error("Error adding new tag:",k),e(`Error adding new tag: ${k}`),!1}finally{D(!1)}},E=async(r,f,k)=>{if(e(`Adding new subtag: ${f} to tag: ${r}`),!f.trim())return e("Cannot add subtag with empty title"),!1;if(!P)return e("No displayed tag for adding subtag"),!1;B(!0);try{if(!await de())return e("No token available for adding subtag"),!1;if(await(async()=>(e("PLACEHOLDER: Would send GraphQL mutation to add subtag",{mutation:js,variables:{subtagInput:{tagTitle:r,subtagTitle:f.trim(),TagType:k,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(te=>setTimeout(te,500)),!0))()){const te={id:C(),tagTitle:r,subtagTitle:f.trim(),TagType:k,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3)};return a(Y=>Y.map(le=>le.id===P?{...le,subtags:[te,...le.subtags||[]]}:le)),O(te),V(""),s(!1),e(`Successfully added new subtag for photo application: ${f}`),!0}return!1}catch(Q){return console.error("Error adding new subtag:",Q),e(`Error adding new subtag: ${Q}`),!1}finally{B(!1)}},I=async r=>{e(`Deleting tag: ${r}`),W(r);try{if(!await de())return e("No token available for deleting tag"),!1;if(await(async()=>(e("PLACEHOLDER: Would send GraphQL mutation to delete tag",{mutation:Cs,variables:{tagId:r}}),await new Promise(K=>setTimeout(K,500)),!0))()){a(se=>se.filter(te=>te.id!==r));const K=d.find(se=>se.id===r);return K&&U(K),P===r&&fe(null),e(`Successfully deleted tag: ${r}`),!0}return!1}catch(f){return console.error("Error deleting tag:",f),e(`Error deleting tag: ${f}`),!1}finally{W(null)}},M=async r=>{e(`Deleting subtag: ${r}`),o(r);try{if(!await de())return e("No token available for deleting subtag"),!1;if(await(async()=>(e("PLACEHOLDER: Would send GraphQL mutation to delete subtag",{mutation:Ds,variables:{subtagId:r}}),await new Promise(K=>setTimeout(K,500)),!0))()){let K=null;return a(se=>se.map(te=>{var le;const Y=((le=te.subtags)==null?void 0:le.filter(xe=>xe.id===r?(K=xe,!1):!0))||[];return{...te,subtags:Y}})),K&&ee(K),e(`Successfully deleted subtag: ${r}`),!0}return!1}catch(f){return console.error("Error deleting subtag:",f),e(`Error deleting subtag: ${f}`),!1}finally{o(null)}},J=async(r,f)=>(e(`Placeholder: Updating tag points: ${r} to ${f}`),!1),ie=()=>{q(!0),X("")},oe=()=>{q(!1),X("")},pe=()=>{s(!0),V("")},ce=()=>{s(!1),V("")},ue=async()=>Z.trim()?await $(Z,"File"):!1,be=async()=>{if(L.trim()&&P){const r=d.find(f=>f.id===P);if(r)return await E(r.tagTitle,L,r.TagType)}return!1};return y.useEffect(()=>{F()},[]),{tags:d,selectedTags:T,displayedTagId:P,isLoadingTags:v,tagIdBeingDeleted:S,subtagIdBeingDeleted:u,isAddingNewTag:H,isAddingNewSubtag:j,newTagTitle:Z,newSubtagTitle:L,isSubmittingNewTag:ae,isSubmittingNewSubtag:n,fetchTags:F,selectTag:m,unselectTag:U,selectSubtag:O,unselectSubtag:ee,setDisplayedTag:fe,clearSelectedTags:h,isTagSelected:x,isSubtagSelected:b,getDisplayedTagSubtags:_,setTagIdBeingDeleted:W,setSubtagIdBeingDeleted:o,addNewTag:$,addNewSubtag:E,deleteTag:I,deleteSubtag:M,updateTagPoints:J,startAddingNewTag:ie,cancelAddingNewTag:oe,startAddingNewSubtag:pe,cancelAddingNewSubtag:ce,submitNewTag:ue,submitNewSubtag:be,setNewTagTitle:X,setNewSubtagTitle:V}},_s=z.div`
  margin: 16px 0;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
`,He=z.div`
  margin-bottom: 12px;
`,Je=z.h3`
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  display: flex;
  align-items: center;
  gap: 8px;
`,Qe=z.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  min-height: 32px;
`,Ve=z.button`
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
`,Es=z(Ve)`
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
`,Ye=z.button`
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
`,Ns=z.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
`,Xe=z.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
`,Ze=z.button`
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
`,Rs=z.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border: 1px solid #007bff;
  border-radius: 12px;
  background: white;
`,Os=z.input`
  border: none;
  outline: none;
  font-size: 12px;
  background: transparent;
  min-width: 80px;
  max-width: 200px;

  &::placeholder {
    color: #999;
  }
`,We=z.button`
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
`,zs=z.span`
  background: #6c757d;
  color: white;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: bold;
`,Bs=({tag:e,isSelected:d,isDisplayed:a,isBeingDeleted:T,disabled:p,onTagClick:P,onDeleteTag:c,getTagDisplayText:v})=>{const[g,S]=y.useState(!1);return t.jsxs(Ve,{$isSelected:d,$isDisplayed:a,$isBeingDeleted:T,disabled:p,onClick:()=>P(e),onMouseEnter:()=>S(!0),onMouseLeave:()=>S(!1),children:[v(e),g&&!p&&!T&&t.jsx(Ye,{onClick:W=>{W.stopPropagation(),c(e.id)},disabled:T,children:"×"})]})},Ms=({subtag:e,isSelected:d,isBeingDeleted:a,disabled:T,onSubtagClick:p,onDeleteSubtag:P})=>{const[c,v]=y.useState(!1);return t.jsxs(Es,{$isSelected:d,$isBeingDeleted:a,disabled:T,onClick:()=>p(e),onMouseEnter:()=>v(!0),onMouseLeave:()=>v(!1),children:[e.subtagTitle,c&&!T&&!a&&t.jsx(Ye,{onClick:g=>{g.stopPropagation(),P(e.id)},disabled:a,children:"×"})]})},Le=({value:e,onChange:d,onSubmit:a,onCancel:T,isSubmitting:p,placeholder:P="Enter tag name..."})=>{const c=y.useRef(null);y.useEffect(()=>{c.current&&c.current.focus()},[]);const v=g=>{g.key==="Enter"?a():g.key==="Escape"&&T()};return t.jsxs(Rs,{children:[t.jsx(Os,{ref:c,type:"text",value:e,onChange:g=>d(g.target.value),onKeyDown:v,placeholder:P,disabled:p}),t.jsx(We,{onClick:a,disabled:!e.trim()||p,title:"Add (Enter)",children:p?"...":"✓"}),t.jsx(We,{onClick:T,disabled:p,title:"Cancel (Escape)",children:"×"})]})},Us=({tagsManager:e,disabled:d=!1,enhancedLog:a,photoCount:T=1})=>{const{tags:p,selectedTags:P,displayedTagId:c,isLoadingTags:v,tagIdBeingDeleted:g,isAddingNewTag:S,newTagTitle:W,isSubmittingNewTag:u,selectTag:o,unselectTag:H,setDisplayedTag:q,isTagSelected:j,deleteTag:s,startAddingNewTag:Z,cancelAddingNewTag:X,submitNewTag:L,setNewTagTitle:V}=e,ae=m=>{if(d)return;const U=j(m),O=c===m.id;U?U&&!O?(q(m.id),a(`Displayed tag: ${m.tagTitle}`)):U&&O&&(H(m),q(null),a(`Unselected tag: ${m.tagTitle}`)):(o(m),q(m.id),a(`Selected tag for photo application: ${m.tagTitle}`))},D=async m=>{if(d)return;a(`Delete tag initiated: ${m}`);const U=await s(m);a(U?`Tag successfully deleted: ${m}`:`Failed to delete tag: ${m}`)},n=async()=>{await L()||a("Failed to submit new tag")},B=m=>{const U=P.find(ee=>ee.tagTitle===m.tagTitle);if(!U||U.subtags.length===0)return m.tagTitle;const O=U.subtags.map(ee=>ee.subtagTitle).join(" || ");return`${m.tagTitle}  |  ${O}`},F=[...p].sort((m,U)=>m.points!==U.points?U.points-m.points:U.updatedAt-m.updatedAt);return t.jsxs(_s,{children:[t.jsxs(He,{children:[t.jsxs(Je,{children:["Select Tags to Apply to Photos",P.length>0&&t.jsxs(zs,{children:[P.length," selected"]})]}),t.jsx(Qe,{children:v?t.jsx(Ns,{children:"Loading tags..."}):t.jsxs(t.Fragment,{children:[F.map(m=>t.jsx(Bs,{tag:m,isSelected:j(m),isDisplayed:c===m.id,isBeingDeleted:g===m.id,disabled:d,onTagClick:ae,onDeleteTag:D,getTagDisplayText:B},m.id)),S?t.jsx(Le,{value:W,onChange:V,onSubmit:n,onCancel:X,isSubmitting:u,placeholder:"Enter tag name..."}):t.jsx(Ze,{disabled:d,onClick:Z,children:"+ Add Tag"}),F.length===0&&!S&&t.jsx(Xe,{children:"No tags available"})]})})]}),c&&t.jsx(Ws,{tagsManager:e,disabled:d,enhancedLog:a}),P.length>0&&t.jsxs("div",{style:{marginTop:"12px",padding:"12px 16px",background:"#e7f3ff",borderRadius:"6px",fontSize:"13px",color:"#0c5aa6",border:"1px solid #b3d9ff"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"6px"},children:[t.jsx("span",{children:"🎯"}),t.jsx("strong",{children:"Ready to Apply Tags:"})]}),"You have selected ",t.jsxs("strong",{children:[P.length," tag",P.length!==1?"s":""]})," to apply to photos.",t.jsx("br",{}),t.jsx("strong",{children:"Next:"})," ",T===1?'Click "Apply Selected Tags to Photo" above to tag your photo.':`Select photos above (they'll show blue borders), then click "Apply Selected Tags to Photos".`]})]})},Ws=({tagsManager:e,disabled:d=!1,enhancedLog:a})=>{var D;const{displayedTagId:T,subtagIdBeingDeleted:p,isAddingNewSubtag:P,newSubtagTitle:c,isSubmittingNewSubtag:v,selectSubtag:g,unselectSubtag:S,isSubtagSelected:W,deleteSubtag:u,startAddingNewSubtag:o,cancelAddingNewSubtag:H,submitNewSubtag:q,setNewSubtagTitle:j}=e,s=T?((D=e.tags.find(n=>n.id===T))==null?void 0:D.subtags)||[]:[],Z=e.tags.find(n=>n.id===T),X=n=>{if(d)return;W(n)?(S(n),a(`Unselected subtag for photo application: ${n.subtagTitle}`)):(g(n),a(`Selected subtag for photo application: ${n.subtagTitle}`))},L=async n=>{if(d)return;a(`Delete subtag initiated: ${n}`);const B=await u(n);a(B?`Subtag successfully deleted: ${n}`:`Failed to delete subtag: ${n}`)},V=async()=>{await q()||a("Failed to submit new subtag")};if(!Z)return null;const ae=[...s].sort((n,B)=>n.points!==B.points?B.points-n.points:B.updatedAt-n.updatedAt);return t.jsxs(He,{children:[t.jsxs(Je,{children:['Subtags for "',Z.tagTitle,'"']}),t.jsxs(Qe,{children:[ae.map(n=>t.jsx(Ms,{subtag:n,isSelected:W(n),isBeingDeleted:p===n.id,disabled:d,onSubtagClick:X,onDeleteSubtag:L},n.id)),P?t.jsx(Le,{value:c,onChange:j,onSubmit:V,onCancel:H,isSubmitting:v,placeholder:"Enter subtag name..."}):t.jsx(Ze,{disabled:d,onClick:o,children:"+ Add Subtag"}),ae.length===0&&!P&&t.jsx(Xe,{children:"No subtags available"})]})]})},Ks=({children:e,t:d,isRTL:a})=>t.jsxs("div",{style:{padding:"24px",marginBottom:"24px",backgroundColor:"#f8f9fa",border:"2px solid #e9ecef",borderRadius:"12px",direction:a?"rtl":"ltr"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",fontSize:"18px",color:"#495057",fontWeight:"600",marginBottom:"20px",flexDirection:a?"row-reverse":"row"},children:[t.jsx("span",{style:{marginRight:a?"0":"12px",marginLeft:a?"12px":"0",fontSize:"20px"},children:"📷"}),d("Click files below to select them for tagging")]}),e]}),Gs=({selectedPhotos:e,selectedPhotoIndices:d,onToggleSelection:a,onSelectAll:T,onDeselectAll:p,onRemovePhoto:P,disabled:c,t:v,isRTL:g})=>e.length===0?null:t.jsxs("div",{style:{marginBottom:"24px",direction:g?"rtl":"ltr"},children:[t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",flexDirection:g?"row-reverse":"row"},children:[t.jsxs("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:[v("New Files")," (",e.length,")"]}),t.jsx("div",{style:{display:"flex",gap:"8px",flexDirection:g?"row-reverse":"row"},children:t.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:c?"#f8f9fa":"#fff",color:c?"#999":"#333",cursor:c?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:d.size===e.length?p:T,disabled:c,onMouseEnter:S=>{c||(S.currentTarget.style.backgroundColor="#f8f9fa")},onMouseLeave:S=>{c||(S.currentTarget.style.backgroundColor="#fff")},children:d.size===e.length?v("Deselect All"):v("Select All")})})]}),t.jsx(vs,{selectedPhotos:e,selectedPhotoIndices:d,isSavingAlbum:c,onRemovePhoto:P,onTogglePhotoSelection:a,onSelectAllPhotos:T,onDeselectAllPhotos:p,hideHeader:!0})]}),qs=({existingFiles:e,selectedExistingIndices:d,onToggleSelection:a,onSelectAll:T,onDeselectAll:p,onDeleteFile:P,disabled:c,t:v,isRTL:g})=>e.length===0?null:t.jsxs("div",{style:{marginBottom:"24px",direction:g?"rtl":"ltr"},children:[t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",flexDirection:g?"row-reverse":"row"},children:[t.jsxs("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:[v("Existing Files")," (",e.length,")"]}),t.jsx("div",{style:{display:"flex",gap:"8px",flexDirection:g?"row-reverse":"row"},children:t.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:c?"#f8f9fa":"#fff",color:c?"#999":"#333",cursor:c?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:d.size===e.length?p:T,disabled:c,onMouseEnter:S=>{c||(S.currentTarget.style.backgroundColor="#f8f9fa")},onMouseLeave:S=>{c||(S.currentTarget.style.backgroundColor="#fff")},children:d.size===e.length?v("Deselect All"):v("Select All")})})]}),t.jsx("div",{style:{display:"flex",overflowX:"auto",gap:"12px",padding:"16px",border:"2px dashed #007bff",borderRadius:"8px",backgroundColor:"#fff",scrollbarWidth:"thin",scrollbarColor:"#007bff #f8f9fa"},children:e.map((S,W)=>t.jsxs("div",{style:{position:"relative",width:"160px",height:"160px",flexShrink:0,borderRadius:"8px",overflow:"hidden",border:d.has(W)?"3px solid #007bff":"2px solid #ddd",cursor:c?"not-allowed":"pointer",opacity:c?.6:1,transition:"all 0.2s ease"},onClick:()=>!c&&a(W),children:[t.jsx(ts,{thumbnailDataKey:S.thumbnailDataKey,dataKey:S.dataKey,alt:v("Existing file"),style:{width:"100%",height:"100%",objectFit:"cover"}}),d.has(W)&&t.jsx("div",{style:{position:"absolute",bottom:"8px",left:"8px",right:"8px",background:"rgba(0, 123, 255, 0.9)",color:"white",padding:"4px 8px",borderRadius:"4px",fontSize:"11px",fontWeight:"bold",textAlign:"center",zIndex:10},children:"SELECTED FOR TAGGING"}),t.jsx("button",{onClick:u=>{u.stopPropagation(),!c&&confirm(v("Are you sure you want to remove this file?"))&&P(W)},disabled:c,style:{position:"absolute",top:"8px",right:"8px",width:"24px",height:"24px",borderRadius:"50%",border:"none",backgroundColor:"rgba(220, 53, 69, 0.9)",color:"white",cursor:c?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px",fontWeight:"900",zIndex:20,opacity:c?.5:1,transition:"all 0.2s ease",boxShadow:"0 2px 4px rgba(0,0,0,0.3)",lineHeight:"1"},onMouseEnter:u=>{c||(u.currentTarget.style.backgroundColor="rgba(200, 35, 51, 1)",u.currentTarget.style.transform="scale(1.1)")},onMouseLeave:u=>{c||(u.currentTarget.style.backgroundColor="rgba(220, 53, 69, 0.9)",u.currentTarget.style.transform="scale(1)")},title:v("Remove file"),children:"×"}),S.dataInBytes>0&&t.jsxs("div",{style:{position:"absolute",bottom:"4px",left:"4px",backgroundColor:"rgba(0,0,0,0.7)",color:"white",fontSize:"10px",padding:"2px 4px",borderRadius:"4px"},children:[(S.dataInBytes/(1024*1024)).toFixed(1),"MB"]}),S.durationInSeconds&&t.jsxs("div",{style:{position:"absolute",top:"8px",left:"8px",backgroundColor:"rgba(0,0,0,0.7)",color:"white",fontSize:"10px",padding:"2px 4px",borderRadius:"4px"},children:[Math.floor(S.durationInSeconds/60),":",String(Math.floor(S.durationInSeconds%60)).padStart(2,"0")]})]},`existing-${W}-${S.dataKey}`))})]}),Hs=()=>{const{t:e,language:d}=Ke(),a=Ie(d)==="rtl",T=Qt(e),{setShowUsernamePrompt:p,setUsernameInput:P}=T,[c,v]=y.useState(null),[g,S]=y.useState(!1),[W,u]=y.useState(0),[o,H]=y.useState(""),[q,j]=y.useState(""),[s,Z]=y.useState(!1),[X,L]=y.useState(!1),[V,ae]=y.useState("NoPassword"),[D,n]=y.useState(""),[B,F]=y.useState(!1),[m,U]=y.useState(!0),[O,ee]=y.useState(null),[fe,x]=y.useState(!1),[b,_]=y.useState([]),[h,C]=y.useState(new Set),[$,E]=y.useState(new Map),[I,M]=y.useState([]),[J,ie]=y.useState(new Set),[oe,pe]=y.useState(new Map),[ce,ue]=y.useState(!1),be=i=>{!c&&i&&v(i)},{fileInputRef:r,selectedPhotos:f,setSelectedPhotos:k,isUploading:Q,progressTracker:K,setProgressTracker:se,debugMessages:te,currentFolderId:Y,openFilePicker:le,handleFileSelection:xe,setEditingExistingAlbum:ge,log:Se}=Yt(be,!0);y.useEffect(()=>{(async()=>{try{await Ct(),Se("🔥 Save-album page S3 credentials prewarmed successfully")}catch(w){Se(`⚠️ Save-album page credential prewarming failed: ${String(w)}`)}})()},[]);const A=(i,w)=>{let R=`[${new Date().toISOString()}] ${i}`;if(w!==void 0)try{const G=typeof w=="object"?JSON.stringify(w,null,2):String(w);R+=`
Data: ${G}`,console.log(R),console.log("Data object:",w)}catch(G){R+=` [Error stringifying data: ${G}]`,console.log(R),console.log("Raw data:",w)}else console.log(R);Se(R)},et=async i=>{var w,N,R,G;if(i){ue(!0),A(`Fetching existing album data for folder ID: ${i}`);try{const re=await de();if(!re){A("❌ Authentication failed while fetching existing album data");return}const yt=`
        mutation FetchRelations($fetchRelationsInput: FetchRelationsInput!) {
          fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
            items {
              ... on FolderPosition {
                ${Zt}
              }
            }
          }
        }
      `,St={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}},we=await(await fetch(ye,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${re}`},body:JSON.stringify({query:yt,variables:St})})).json();if(we.errors){console.error("GraphQL errors:",we.errors),A(`❌ Failed to fetch existing album data: ${JSON.stringify(we.errors)}`);return}const Ce=(((N=(w=we==null?void 0:we.data)==null?void 0:w.fetchRelations)==null?void 0:N.items)||[]).find(ne=>ne&&ne.folder&&ne.folder.id===i);if(!Ce){A(`⚠️ Folder with ID ${i} not found`);return}const he=Ce.folder,De=(((G=(R=he==null?void 0:he.fileReferencesPage)==null?void 0:R.items)==null?void 0:G.map(ne=>ne.file))||[]).filter(ne=>ne&&ne.dataKey).map(ne=>({dataKey:ne.dataKey,thumbnailDataKey:ne.thumbnailDataKey||null,durationInSeconds:ne.durationInSeconds||null,dataInBytes:ne.dataInBytes||0}));M(De),A(`✅ Successfully loaded ${De.length} existing files`),!o&&he.folderName&&H(he.folderName),!q&&he.folderDescription&&j(he.folderDescription),ge(i)}catch(re){console.error("Failed to fetch existing album data:",re),A(`❌ Failed to fetch existing album data: ${String(re)}`)}finally{ue(!1)}}};y.useEffect(()=>{c&&c!==Y&&(A(`Loading existing files for folder ID: ${c}`),et(c))},[c,Y]);const tt=Fs(A),{cognitoUsername:ke,publicUsername:$e,setPublicUsername:st}=$s(v,k,ee,Z,H,j,F,U,ae,n,x,_,A),{saveAlbumDirectly:je}=Ts(c||Y,ke,f,fe,b,o,q,B,m,V,D,$,S,u,k,se,A);y.useEffect(()=>{Y&&!c&&(v(Y),A(`Updated folder ID from upload processor: ${Y}`))},[Y,c]),y.useEffect(()=>{C(i=>{const w=new Set;return i.forEach(N=>{N<f.length&&w.add(N)}),w}),E(i=>{const w=new Map(i),N=[];return i.forEach((R,G)=>{G>=f.length&&N.push(G)}),N.forEach(R=>{w.delete(R)}),w})},[f.length]),y.useEffect(()=>{ie(i=>{const w=new Set;return i.forEach(N=>{N<I.length&&w.add(N)}),w}),pe(i=>{const w=new Map(i),N=[];return i.forEach((R,G)=>{G>=I.length&&N.push(G)}),N.forEach(R=>{w.delete(R)}),w})},[I.length]);const rt=i=>{A(`Removing photo at index: ${i}`);const w=f.filter((N,R)=>R!==i);k(w),A(`New files count: ${w.length}`),w.length>0?(localStorage.setItem(me.SELECTED_PHOTOS,JSON.stringify(w)),A(`Updated localStorage with ${w.length} photos`)):(localStorage.removeItem(me.SELECTED_PHOTOS),A("Removed photos from localStorage")),C(N=>{const R=new Set;return N.forEach(G=>{G<i?R.add(G):G>i&&R.add(G-1)}),R}),E(N=>{const R=new Map;return N.forEach((G,re)=>{re<i?R.set(re,G):re>i&&R.set(re-1,G)}),R})},it=i=>{A(`Removing existing file at index: ${i}`);const w=I.filter((N,R)=>R!==i);M(w),A(`New existing files count: ${w.length}`),ie(N=>{const R=new Set;return N.forEach(G=>{G<i?R.add(G):G>i&&R.add(G-1)}),R}),pe(N=>{const R=new Map;return N.forEach((G,re)=>{re<i?R.set(re,G):re>i&&R.set(re-1,G)}),R})},ot=i=>{A(`Toggling selection for existing file at index: ${i}`),ie(w=>{const N=new Set(w);return N.has(i)?(N.delete(i),A(`Deselected existing file ${i}`)):(N.add(i),A(`Selected existing file ${i}`)),N})},at=()=>{A("Selecting all existing files");const i=new Set;for(let w=0;w<I.length;w++)i.add(w);ie(i)},nt=()=>{A("Deselecting all existing files"),ie(new Set)},lt=i=>{A(`Toggling selection for photo at index: ${i}`),C(w=>{const N=new Set(w);return N.has(i)?(N.delete(i),A(`Deselected photo ${i}`)):(N.add(i),A(`Selected photo ${i}`)),N})},dt=()=>{A("Selecting all photos");const i=new Set;for(let w=0;w<f.length;w++)i.add(w);C(i)},ct=()=>{A("Deselecting all photos"),C(new Set)},ut=()=>{const i=!B;A(`Toggling isOnPublicProfile to: ${i}`),F(i)},pt=()=>{const i=!m;A(`Toggling participantsCanAddItems to: ${i}`),U(i)},ft=async()=>{A("Album save initiated"),A("Photo tags applied:",Object.fromEntries($)),A("Existing file tags applied:",Object.fromEntries(oe)),S(!0);try{if($e!=null&&$e.startsWith("Profile-")){A("Public username starts with 'Profile-', showing username prompt"),P(""),p(!0),S(!1);return}A("Valid username found, proceeding to save album directly with file-level tagging"),je()}catch(i){console.error("Error in handleSaveAlbum:",i),A(`Error in handleSaveAlbum: ${i}`),S(!1)}},gt=i=>{A(`Handling successful username update to: ${i}`),localStorage.setItem(me.PUBLIC_USERNAME,i),st(i),p(!1),A("Proceeding to save album after username update"),je()},mt=(i,w)=>{A(`Password dialog closed with option: ${i}, password: ${w?"******":"undefined"}`),i&&ae(i),w!==void 0&&n(w),L(!1)},xt=()=>V==="NoPassword"?e("Album Password Policy"):`${e(V==="NotVisible"?"Password Required To See Or Save":V==="Watermark"?"Watermarked And No Saving Without Password":"Password Required To Save")} ${D?`(${D})`:""}`,ht=()=>{A("Opening password dialog"),L(!0)},bt=()=>{A("Add photos button clicked"),le(c)},Te=g||Q||ce,wt=f.length>0||I.length>0;return t.jsxs(t.Fragment,{children:[t.jsx(Kt,{}),t.jsxs(Gt,{$isRTL:a,children:[t.jsxs("div",{style:{maxWidth:"900px",margin:"0 auto"},children:[t.jsxs(qt,{children:[t.jsx(Ht,{href:"my-albums.html",children:e("My Albums")}),t.jsx(Lt,{t:e})]}),t.jsx(Ps,{showFolderDetails:s,isCreator:O,folderName:o,setFolderName:H,folderDescription:q,setFolderDescription:j,isOnPublicProfile:B,handlePublicProfileToggle:ut,participantsCanAddItems:m,handleParticipantsCanAddItemsToggle:pt,isSavingAlbum:g||Q}),(Q||K.totalFiles>0&&(K.filesUploading>0||K.filesProcessing>0||K.filesComplete<K.totalFiles))&&t.jsx(Xt,{progressTracker:K,isRTL:Ie(d)==="rtl",variant:"detailed",context:"saving",isUploading:Q,showSuccessMessage:!1,showErrorMessage:!0,customMessages:{error:e("Some photos could not be processed. You can continue with the successfully processed photos.")}}),t.jsx("input",{ref:r,id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:i=>xe(i,ke),style:{display:"none"}}),s&&O===!0&&wt&&t.jsxs(Ks,{t:e,isRTL:a,children:[(I.length>0||ce)&&t.jsx("div",{style:{marginBottom:"24px"},children:ce?t.jsx("div",{style:{padding:"20px",textAlign:"center",color:"#666",fontSize:"14px"},children:e("Loading existing files...")}):t.jsx(qs,{existingFiles:I,selectedExistingIndices:J,onToggleSelection:ot,onSelectAll:at,onDeselectAll:nt,onDeleteFile:it,disabled:Te,t:e,isRTL:a})}),t.jsx(Gs,{selectedPhotos:f,selectedPhotoIndices:h,onToggleSelection:lt,onSelectAll:dt,onDeselectAll:ct,onRemovePhoto:rt,disabled:Te,t:e,isRTL:a}),t.jsx("div",{style:{marginTop:"24px"},children:t.jsx(Us,{tagsManager:tt,disabled:Te,enhancedLog:A,photoCount:f.length+I.length})})]}),t.jsx(Is,{isSavingAlbum:g,savingProgress:W}),t.jsxs(Jt,{children:[t.jsx(ve,{onClick:bt,disabled:g||Q||ce,children:e(Q?"Uploading...":"Add More Photos")}),O===!0&&t.jsx(ve,{$passwordSet:V!=="NoPassword",onClick:ht,disabled:g||Q||ce,children:xt()}),t.jsx(ve,{$primary:!0,onClick:ft,disabled:g||Q||ce,children:e(g?"Saving Album...":"Save Album")})]}),t.jsx(Vt,{t:e,language:d,usernameManager:T,onSuccess:gt}),t.jsx(ys,{isOpen:X,onClose:mt,initialOption:V,initialPassword:D})]}),t.jsx(es,{debugMessages:te,t:e,isRTL:a,textDirection:a?"rtl":"ltr"})]})]})},Js=()=>t.jsx(jt,{children:t.jsx(Hs,{})});kt.createRoot(document.getElementById("root")).render(t.jsx(Js,{}));
