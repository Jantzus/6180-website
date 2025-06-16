import{d as z,u as Ke,a as w,j as t,g as Ie,r as Ge,h as de,L as me,i as Fe,s as Tt,m as vt,f as we,k as It,l as Pt,n as At,R as kt,I as jt,p as Ct}from"./utils-C1FUk2iD.js";import{S as Dt,C as Pe,F as _e,e as Ee,f as Ft,g as _t,T as Ne,h as Re,i as Oe,j as ze,P as Et,k as Nt,l as qe,m as He,n as Rt,o as Ot,p as zt,q as Bt,V as Mt,r as Ut,s as Wt,M as Kt,G as Gt,A as qt,H as Ht,t as Jt,u as Qt,B as ve}from"./styled-components-3YNZ6KsQ.js";import{u as Vt,U as Yt}from"./useUsernameManagement-DM17QAPX.js";import{u as Xt,U as Zt}from"./useFileUploadProcessor-DFxO8lXR.js";import{F as Lt}from"./types-B2_92tNb.js";import{L as es}from"./LazyImage-CPKlzoGh.js";const d={colors:{primary:"#007bff",primaryDark:"#0056b3",secondary:"#6c757d",success:"#4caf50",danger:"#e53935",warning:"#ff9800",white:"#fff",text:{primary:"#333",secondary:"#666",light:"#777"},background:{primary:"#f9fafb",highlight:"#f0f7ff"},border:"#ddd"},spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px"},borderRadius:{small:"4px",medium:"8px"},boxShadow:{lg:"0 4px 10px rgba(0,0,0,0.08)"}},ts=z.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
`,ss=z.div`
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
`,rs=z.div`
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
`,is=z.div`
  direction: ${e=>e.$isRTL?"rtl":"ltr"};
`,os=z.h3`
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
`,as=z.p`
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
`,Be=z.div`
  margin-bottom: ${d.spacing.lg};
`,Me=z.label`
  display: block;
  margin-bottom: ${d.spacing.sm};
  font-size: 14px;
  font-weight: 500;
  color: ${d.colors.text.primary};
`,ns=z.input`
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
`,ls=z.div`
  display: flex;
  flex-direction: column;
  gap: ${d.spacing.md};
  margin-bottom: ${d.spacing.xl};
`,ds=z.div`
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
`,cs=z.div`
  flex: 1;
`,us=z.div`
  margin-bottom: ${d.spacing.xs};
`,ps=z.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${d.colors.primary};
  flex-shrink: 0;
`,fs=z.label`
  font-size: 16px;
  font-weight: 500;
  color: ${d.colors.text.primary};
  cursor: pointer;
  display: block;
`,gs=z.div`
  font-size: 14px;
  color: ${d.colors.text.secondary};
  margin-top: ${d.spacing.xs};
`,ms=z.div`
  color: ${d.colors.warning};
  font-size: 12px;
  font-style: italic;
  margin-top: ${d.spacing.xs};
  font-weight: 500;
`,xs=z.div`
  display: flex;
  gap: ${d.spacing.sm};
  justify-content: center;
  margin-top: ${d.spacing.xl};
`,Ue=z.button`
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
`,hs=z.div`
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
`,bs=[{value:"NotVisible",titleKey:"Password Required To See Or Save",descriptionKey:"Album will be completely hidden until correct password is entered"},{value:"Watermark",titleKey:"Watermarked And No Saving Without Password",descriptionKey:"Photos will be visible with watermarks, password required to save"},{value:"CannotBeSaved",titleKey:"Password Required To Save",descriptionKey:"Photos are visible but password required to download or save"},{value:"NoPassword",titleKey:"No Password",descriptionKey:"Album is fully public with no restrictions"}],ys=({isOpen:e,onClose:n,initialOption:i="NoPassword",initialPassword:S=""})=>{const{t:p,language:I}=Ke(),c=Ie(I)==="rtl",[v,g]=w.useState(i),[$,W]=w.useState(S);if(w.useEffect(()=>{e&&(g(i),W(S))},[e,i,S]),!e)return null;const u=$.trim()==="",o=j=>{g(j)},H=j=>{j.target===j.currentTarget&&n()},q=j=>j!=="NoPassword";return t.jsxs(t.Fragment,{children:[t.jsx(ts,{onClick:H}),t.jsx(ss,{children:t.jsx(rs,{children:t.jsxs(is,{$isRTL:c,children:[t.jsx(os,{children:p("Album Password Policy")}),t.jsx(as,{children:p("Configure password protection for your album. Choose how you want to restrict access to your photos.")}),t.jsxs(Be,{children:[t.jsx(Me,{children:p("Enter Password")}),t.jsx(ns,{type:"text",placeholder:p("Enter password (optional)"),value:$,onChange:j=>W(j.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"})]}),t.jsxs(Be,{children:[t.jsx(Me,{children:p("Select Protection Level")}),t.jsx(ls,{children:bs.map(j=>t.jsxs(ds,{$isSelected:v===j.value,onClick:()=>o(j.value),children:[t.jsx(ps,{type:"radio",name:"protection",checked:v===j.value,onChange:()=>o(j.value)}),t.jsxs(cs,{children:[t.jsx(us,{children:t.jsx(fs,{children:p(j.titleKey)})}),t.jsx(gs,{children:p(j.descriptionKey)}),u&&q(j.value)&&v===j.value&&t.jsx(ms,{children:p('⚠️ Will use "password" as default if left empty')})]})]},j.value))})]}),q(v)&&t.jsxs(hs,{children:[t.jsx("strong",{children:p("💡 Password Protection Info:")}),t.jsx("br",{}),p('If you leave the password field empty, "password" will be used as the default password. You can change this anytime in album settings.')]}),t.jsxs(xs,{children:[t.jsx(Ue,{$variant:"secondary",onClick:()=>n(),children:p("Cancel")}),t.jsx(Ue,{$variant:"primary",onClick:()=>{const j=u&&q(v)?"password":$;console.log(`Saving with option: ${v}, password: ${j.length>0?"********":"none"}`),n(v,j)},children:p("Save Settings")})]})]})})})]})},ws=({t:e})=>{const n=i=>{i.preventDefault(),localStorage.clear(),Ge("index.html")};return t.jsx(Dt,{href:"#",onClick:n,children:e("Log Out")})},Ss=({debugMessages:e,t:n,isRTL:i,textDirection:S})=>e.length===0?null:t.jsxs("div",{style:{marginTop:"40px",background:"#fff3cd",padding:"16px",borderRadius:"8px",border:"1px solid #ffeeba",maxWidth:900,margin:"0 auto",direction:S},children:[t.jsx("h3",{style:{marginTop:0,fontSize:"18px",color:"#856404",textAlign:i?"right":"left"},children:n("Debug Log")}),t.jsx("pre",{style:{fontSize:"14px",color:"#856404",whiteSpace:"pre-wrap",maxHeight:"400px",overflow:"auto",textAlign:i?"right":"left"},children:e.map((p,I)=>t.jsx("div",{style:{marginBottom:"8px"},children:p},I))})]}),$s=`
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
`,Ts=(e,n,i,S,p,I,c,v,g,$,W,u,o)=>{const[H,q]=w.useState(null),[j,s]=w.useState(null),Z=async D=>{o(`Initializing folder ID with username: ${D}`);try{const B=new URLSearchParams(window.location.search).get("folderId");if(o(`Folder ID from URL: ${B||"null"}`),B){e(B),o(`Using existing folder ID: ${B}`);try{o(`Fetching details for folder: ${B}`);const F=await X(B,o);if(o("Folder details retrieved:",F),F){const m=`${D}_____${D}____Account`,U=F.creatorId===m;if(o(`User is creator of folder: ${U}, accountId: ${m}, creator: ${F.creatorId}`),i(U),U){o("User is creator, showing folder details"),S(!0),p(F.folderName),I(F.folderDescription),c(F.isOnPublicProfile),o(`Setting isOnPublicProfile: ${F.isOnPublicProfile}`),F.participantsCanAddItems!==void 0&&(v(F.participantsCanAddItems),o(`Setting participantsCanAddItems: ${F.participantsCanAddItems}`));const O=F.passwordPolicy;o(`Password policy from folder details: ${O}`),g(O),O!=="NoPassword"&&F.password&&$(F.password),o(`Set password protection option to: ${O}`)}else o("User is NOT the creator, hiding editable fields"),S(!1)}else o("No folder details retrieved, setting isCreator to true"),i(!0),S(!0)}catch(F){console.error("Error fetching folder details:",F),o(`Error fetching folder details: ${F}`),i(!1)}}else{const F=`${D}_____${Fe()}____Folder`;o(`Creating new folder ID: ${F}`),e(F),o("Setting isCreator to true for new album"),i(!0),S(!0)}}catch(l){console.error("Folder ID initialization error:",l),o(`Folder ID initialization error: ${l}`),i(!1)}},X=async(D,l)=>{var B,F,m,U,O,ee,fe,x;l(`Fetching details for folder ID: ${D}`);try{const b=await de();if(!b)return l("No token available for fetching folder details"),null;l("Sending GraphQL query to fetch folder details");const h=await(await fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${b}`},body:JSON.stringify({query:$s,variables:{folderIds:[D],fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(l("Folder details API response:",h),h.errors)return console.error("GraphQL errors:",h.errors),l(`GraphQL errors: ${JSON.stringify(h.errors)}`),null;const C=((F=(B=h==null?void 0:h.data)==null?void 0:B.fetchFolders)==null?void 0:F.items)||[];if(l(`Found ${C.length} folder items`),C.length===0)return l("No folder items found"),null;const T=C[0];l("Retrieved folder data:",T);const E=((U=(m=T.folderPosition)==null?void 0:m.profileIds)==null?void 0:U.some(M=>M.includes("Public____Profile")))||!1;l(`Folder is on public profile: ${E}`),l("Profile IDs:",(O=T.folderPosition)==null?void 0:O.profileIds);const P=(ee=T.folderInviteParameters)==null?void 0:ee.usingFolderInviteGrantsRightToAddItems;return l(`Participants can add items: ${P}`),{creatorId:T.creatorId||"",folderName:T.folderName||"",folderDescription:T.folderDescription||"",passwordPolicy:((fe=T.folderPassword)==null?void 0:fe.policy)||"NoPassword",password:((x=T.folderPassword)==null?void 0:x.password)||"",isOnPublicProfile:E,participantsCanAddItems:P!==void 0?P:!0}}catch(b){return console.error("Error in fetchFolderDetails:",b),l(`Error in fetchFolderDetails: ${b}`),null}},L=()=>{o("Attempting to restore photos from localStorage");try{const D=localStorage.getItem(me.SELECTED_PHOTOS);if(o(`Found stored photos: ${D?"yes":"no"}`),D)try{const l=JSON.parse(D);o(`Parsed ${l.length} photos from localStorage`),Array.isArray(l)&&l.length>0&&(n(l),o(`Restored ${l.length} photos to state`))}catch(l){console.error("Error parsing stored photos:",l),o(`Error parsing stored photos: ${l}`)}}catch(D){console.error("Error restoring photos from storage:",D),o(`Error restoring photos from storage: ${D}`)}},V=()=>{o("Testing S3 connection");try{Tt?o("S3 client is available"):(console.error("S3 client not available"),o("S3 client not available"))}catch(D){console.error("S3 connection test error:",D),o(`S3 connection test error: ${D}`)}},ae=async()=>{var D;o("Starting component initialization");try{o("Checking login with refresh");const l=await de();if(!l){o("No token returned from login check, aborting initialization");return}try{const B=localStorage.getItem(me.PUBLIC_USERNAME);o(`Retrieved public username from localStorage: ${B||"null"}`),s(B||null);const m=JSON.parse(atob(l.split(".")[1]))["cognito:username"];if(m){o(`Extracted Cognito username from token: ${m}`),q(m);const U=localStorage.getItem(me.SUB_ALBUM_DATA);if(o(`Sub-album data from localStorage: ${U||"null"}`),U)try{const O=JSON.parse(U);if(o("Parsed sub-album data:",O),O.isSubAlbum&&((D=O.selectedFileIds)==null?void 0:D.length)>0){o(`Valid sub-album data found with ${O.selectedFileIds.length} files`),W(!0),u(O.selectedFileIds),O.selectedPhotos&&O.selectedPhotos.length>0&&(o(`Found ${O.selectedPhotos.length} selected photos in sub-album data`),n(O.selectedPhotos)),S(!0),i(!0);const ee=`${m}_____${Fe()}____Folder`;o(`Generated new folder ID for sub-album: ${ee}`),e(ee)}else o("Invalid sub-album data, proceeding with normal initialization"),await Z(m)}catch(O){console.error("Error parsing sub-album data:",O),o(`Error parsing sub-album data: ${O}`),await Z(m)}else o("No sub-album data found, proceeding with normal folder initialization"),await Z(m)}else o("No Cognito username found in token")}catch(B){console.error("User data initialization error:",B),o(`User data initialization error: ${B}`)}L(),V(),o("Component initialization completed")}catch(l){console.error("Initialization error:",l),o(`Initialization error: ${l}`)}};return w.useEffect(()=>{ae()},[]),{cognitoUsername:H,publicUsername:j,setPublicUsername:s}},vs=(e,n,i,S,p,I,c,v,g,$,W,u,o,H,q,j,s)=>{const Z=x=>(s(`Converting ${x.length} tags to API format`),x.map(b=>({TagType:b.TagType,tagTitle:b.tagTitle,selectedSubtagInputs:b.subtags.map(_=>({TagType:b.TagType,tagTitle:_.tagTitle,subtagTitle:_.subtagTitle}))}))),X=x=>{s(`Save progress text: ${x}`);const b=document.getElementById("saveProgressText");b&&(b.innerText=x)},L=x=>{const b=document.getElementById("saveProgress");b?(b.style.width=`${x}%`,s(`Updated save progress bar: ${x}%`)):s("Progress bar element not found"),H(x)},V=(x,b)=>{s(`Splitting array of ${x.length} items into chunks of ${b}`);const _=[];for(let h=0;h<x.length;h+=b)_.push(x.slice(h,h+b));return s(`Created ${_.length} chunks`),_},ae=x=>{const b=new Set;return x.filter(_=>b.has(_.fileId)?(s(`Skipping duplicate file reference with ID: ${_.fileId}`),!1):(b.add(_.fileId),!0))},D=(x,b,_)=>{s("Creating folder position input WITHOUT folder-level tags"),s(`Profile visibility: ${v?"Public":"Only Me"}`);const h=v?[`${n}_____Public____Profile`]:["Only Me_____Only Me____Profile"];s(`Profile IDs: ${JSON.stringify(h)}`);let C=[];S&&p.length>0&&(s(`Creating file reference IDs for ${p.length} sub-album files`),C=p.map(M=>{const J=M.split("_____");if(J.length>=2){const oe=J[1].split("____")[0],pe=`${_}_____${oe}____FileReference`;return s(`Created file reference ID for sub-album: ${pe}`),pe}return s(`Using original fileId as fallback: ${M}`),M})),s(`Created ${C.length} acceptedFileReferenceIds`);const T=$!=="NoPassword"?W:null;if(s(`Password protection: ${$}`),s(`Album password: ${T?"******":"null"}`),s(`Participants can add items: ${g}`),!e)throw s("Error: folderId is null or undefined"),new Error("folderId is required to create folder position input");const E=It(e),P=Pt(E);return{currentTime:x,folderId:e,profileIds:h,folderPositionPoints:1,acceptedFileReferenceIds:C,folderInput:{folderAboutContactIds:[b],albumNanoId:P,folderName:I,folderDescription:c,folderPasswordInput:{password:T,policy:$},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,usingFolderInviteGrantsRightToRemoveItems:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:g,addedItemsNeedFolderCreatorApproval:!1}}}},l=(x,b,_)=>(s(`Creating file reference inputs with individual photo tags for ${x.length} photos`),x.map((h,C)=>{var J;const T=u.get(C)||[],E=Z(T);if(s(`Photo ${C} (${h.fileName}): ${T.length} tags applied`),h.fileId)return s(`Using existing fileId for photo: ${h.fileId}`),{fileReferencesHolderId:e,currentTime:b,points:1,hasBeenDeleted:!1,selectedTagInputs:E,fileId:h.fileId,fileInput:null};const P=h.type==="video"||(J=h.type)!=null&&J.startsWith("video")?`Input/Video/${h.fileName}`:`Input/Image/${h.fileName}`,M=`${n}_____${h.fileName}____File`;return s(`Created file reference for ${h.fileName}:`),s(`  - dataKey: ${P}`),s(`  - fileId: ${M}`),s(`  - thumbnailDataKey: ${h.thumbnailDataKey||"undefined"}`),s(`  - size: ${h.size}`),s(`  - thumbnailSize: ${h.thumbnailSize||0}`),s(`  - duration: ${h.duration||"undefined"}`),s(`  - tags: ${T.length} tags selected for this photo`),{fileReferencesHolderId:e,currentTime:b,points:1,hasBeenDeleted:!1,selectedTagInputs:E,fileId:M,fileInput:{fileId:M,ownerFileInput:{editorContactIds:[_],FileSharingOptionsEnum:"Anyone",dataKey:P,thumbnailDataKey:h.thumbnailDataKey,dataInBytes:h.size,thumbnailDataInBytes:h.thumbnailSize||0,s3UploadedAt:b,durationInSeconds:h.duration},editorFileInput:{aboutContactIds:[_],captionText:"",numericFilterInputs:[]}}}})),B=async x=>{var C,T;s("Sending folder-only mutation (no file references, no folder tags)");const b=await de();if(!b)throw s("No token available for saving album, aborting"),new Error("Authentication token not available");const _=`
      mutation MyMutation($folderPositionInputs: [FolderPositionInput!]) {
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items {
            id
          }
        }
      }
    `,h={folderPositionInputs:[x]};s("GraphQL folder-only mutation variables:",h);try{s("Sending API request to save folder");const E=await fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${b}`},body:JSON.stringify({query:_,variables:h})});s(`API response status: ${E.status}`);const P=await E.text();s(`API response raw text: ${P}`);const M=JSON.parse(P);if(s("API response JSON:",M),M.errors)throw console.error("Folder save failed:",M.errors),s("Folder save failed with errors:",M.errors),new Error("Failed to save folder");return s("Folder saved successfully"),((T=(C=M.data)==null?void 0:C.changeFiles)==null?void 0:T.items)||[]}catch(E){throw console.error("Error in sendFolderOnlyMutation:",E),s(`Error in sendFolderOnlyMutation: ${E}`),E}},F=async x=>{var C,T,E,P,M;s(`Sending file references-only mutation with ${x.length} items (each with individual tags)`);const b=await de();if(!b)throw s("No token available for saving file references, aborting"),new Error("Authentication token not available");const _=`
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
    `,h={updatedFileReferenceInputs:x};s("GraphQL file references-only mutation variables (first item):",x.length>0?x[0]:"No items");try{s("Sending API request to save file references with individual tags");const J=await fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${b}`},body:JSON.stringify({query:_,variables:h})});s(`API response status: ${J.status}`);const ie=await J.text();s(`API response raw text: ${ie.substring(0,500)}...`);const oe=JSON.parse(ie);if(s("API response JSON items count:",((E=(T=(C=oe.data)==null?void 0:C.changeFiles0)==null?void 0:T.items)==null?void 0:E.length)||0),oe.errors)throw console.error("File references save failed:",oe.errors),s("File references save failed with errors:",oe.errors),new Error("Failed to save file references");return s("File references chunk saved successfully with individual photo tags"),((M=(P=oe.data)==null?void 0:P.changeFiles0)==null?void 0:M.items)||[]}catch(J){throw console.error("Error in sendFileReferencesOnlyMutation:",J),s(`Error in sendFileReferencesOnlyMutation: ${J}`),J}},m=async(x,b)=>{var T,E,P,M,J,ie,oe,pe,ce;s(`Sending final chunk with folder mutation (${x.length} file references, no folder tags)`);const _=await de();if(!_)throw s("No token available for saving final chunk, aborting"),new Error("Authentication token not available");const h=`
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
    `,C={folderPositionInputs:[b],updatedFileReferenceInputs:x};s("GraphQL final mutation variables (folder + last chunk, no folder tags)");try{s("Sending API request for final save with folder (no folder tags)");const ue=await fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${_}`},body:JSON.stringify({query:h,variables:C})});s(`API response status: ${ue.status}`);const be=await ue.text();s(`API response raw text: ${be.substring(0,500)}...`);const r=JSON.parse(be);if(s("API response JSON:",{fileReferencesCount:((P=(E=(T=r.data)==null?void 0:T.changeFiles0)==null?void 0:E.items)==null?void 0:P.length)||0,folderItems:((J=(M=r.data)==null?void 0:M.changeFiles)==null?void 0:J.items)||[]}),r.errors)throw console.error("Final save failed:",r.errors),s("Final save failed with errors:",r.errors),new Error("Failed to complete album save");return s("Final chunk and folder saved successfully (with individual photo tags)"),{fileReferences:((oe=(ie=r.data)==null?void 0:ie.changeFiles0)==null?void 0:oe.items)||[],folderPositions:((ce=(pe=r.data)==null?void 0:pe.changeFiles)==null?void 0:ce.items)||[]}}catch(ue){throw console.error("Error in sendFinalChunkWithFolderMutation:",ue),s(`Error in sendFinalChunkWithFolderMutation: ${ue}`),ue}},U=async()=>(s("Validating required data"),await de()?n?e?(s("All required data validated successfully"),!0):(s("No folder ID, validation failed"),!1):(s("No Cognito username, validation failed"),!1):(s("No token available, validation failed"),!1)),O=()=>{s("Handling successful save"),At(q,j,[me.SELECTED_PHOTOS,me.SUB_ALBUM_DATA],s),s("Album data cleared");const x=document.getElementById("saveProgressText");x&&(x.innerText="Album saved successfully!",s("Updated progress text to 'Album saved successfully!'")),sessionStorage.setItem("album_just_saved","true"),s("Set 'album_just_saved' flag in sessionStorage"),s("Setting timeout for redirect to my-albums.html"),setTimeout(()=>{s("Redirecting to my-albums.html"),Ge("my-albums.html")},1e3)},ee=async(x,b)=>{s("Starting chunked save process (individual photo tags, no folder tags)");try{X("Processing files in chunks...");const _=48;if(b.length===0)s("No file references to process, saving only folder position (no folder tags)"),await B(x);else{const h=ae(b);s(`After removing duplicates, processing ${h.length} unique file references`);const C=V(h,_);s(`Split file references into ${C.length} chunks of max size ${_}`);for(let T=0;T<C.length;T++){const E=C[T];s(`Processing chunk ${T+1} of ${C.length} with ${E.length} file references`);const P=T/C.length*80;H(10+P),L(10+P),T<C.length-1?(X(`Saving files: chunk ${T+1} of ${C.length}...`),await F(E)):(X("Finalizing album..."),await m(E,x))}}H(100),L(100),X("Album saved successfully!"),O()}catch(_){console.error("Error in chunked save process:",_),s(`Error in chunked save process: ${_}`),X(`Error: ${_}`),o(!1)}};return{saveAlbumDirectly:async()=>{s("Starting direct album save with individual photo tagging"),s(`Photo tags map: ${u.size} photos have tags applied`),o(!0),H(5);try{if(s("Validating required data for save"),!await U()){s("Required data validation failed, aborting save"),o(!1);return}const x=Math.floor(Date.now()/1e3),b=`${n}_____${n}____Account`,h=e.split("_____")[1].split("____")[0];s(`Save timestamp: ${x}`),s(`Account ID: ${b}`),s(`Folder ID: ${e}`),s(`Folder target item identifier: ${h}`),s("Creating folder position input (no folder tags)");const C=D(x,b,h);s("Folder position input created:",C);let T=[];const E=i.filter(P=>P.status==="complete");if(s(`Found ${E.length} valid photos with 'complete' status`),E.length>0){const P=E.filter(J=>!J.fileId);s(`Found ${P.length} new uploads to move from temp to public folder`),P.length>0&&(s("Moving files from temp to public folder"),await vt(P,L,s)),s("Creating file reference inputs for uploads with individual photo tags");const M=l(E,x,b);s(`Created ${M.length} file reference inputs for uploads`,M),T=T.concat(M)}if(S&&p.length>0){s(`Adding ${p.length} existing file references for sub-album`);const P=p.map(M=>(s(`Creating file reference for existing file ID: ${M}`),{fileReferencesHolderId:e,currentTime:x,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:M,fileInput:null}));s(`Created ${P.length} file reference inputs for existing files`,P),T=T.concat(P)}s(`Total file reference inputs: ${T.length}`),s("Sending GraphQL mutations with chunked file references (individual photo tags)"),await ee(C,T)}catch(x){console.error("Error in saveAlbumDirectly:",x),s(`Error in saveAlbumDirectly: ${x}`),o(!1)}}}},Is=({selectedPhotos:e,selectedPhotoIndices:n,isSavingAlbum:i,onRemovePhoto:S,onTogglePhotoSelection:p,onSelectAllPhotos:I,onDeselectAllPhotos:c,hideHeader:v=!1})=>{const{t:g}=Ae();if(e.length===0)return null;const $=n.size>0,W=n.size===e.length;return t.jsxs(t.Fragment,{children:[!v&&e.length>1&&t.jsx(Pe,{style:{marginBottom:"16px",border:"2px solid #007bff"},children:t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px"},children:[t.jsx("span",{style:{fontWeight:"bold",fontSize:"14px",color:"#007bff"},children:$?g("{{count}} file(s) selected for tagging",{count:n.size}):g("Click files below to select them for tagging")}),t.jsxs("div",{style:{display:"flex",gap:"8px",marginLeft:"auto"},children:[!W&&t.jsx("button",{onClick:I,disabled:i,style:{padding:"6px 12px",border:"1px solid #007bff",borderRadius:"4px",background:"#007bff",color:"white",fontSize:"12px",cursor:"pointer",fontWeight:"bold"},children:g("Select All")}),$&&t.jsx("button",{onClick:c,disabled:i,style:{padding:"6px 12px",border:"1px solid #6c757d",borderRadius:"4px",background:"transparent",color:"#6c757d",fontSize:"12px",cursor:"pointer"},children:g("Deselect All")})]})]})}),t.jsx(Rt,{children:e.map((u,o)=>{var q,j;const H=n.has(o);return t.jsxs(Ot,{style:{position:"relative",cursor:e.length>1?"pointer":"default",border:H?"3px solid #007bff":"1px solid #e9ecef",borderRadius:"8px",overflow:"hidden"},onClick:()=>e.length>1&&p(o),children:[t.jsx("button",{onClick:s=>{s.stopPropagation(),!i&&confirm(g("Are you sure you want to remove this photo?"))&&S(o)},disabled:i,style:{position:"absolute",top:"8px",right:"8px",width:"24px",height:"24px",borderRadius:"50%",border:"none",backgroundColor:"rgba(220, 53, 69, 0.9)",color:"white",cursor:i?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px",fontWeight:"900",zIndex:20,opacity:i?.5:1,transition:"all 0.2s ease",boxShadow:"0 2px 4px rgba(0,0,0,0.3)",lineHeight:"1"},onMouseEnter:s=>{i||(s.currentTarget.style.backgroundColor="rgba(200, 35, 51, 1)",s.currentTarget.style.transform="scale(1.1)")},onMouseLeave:s=>{i||(s.currentTarget.style.backgroundColor="rgba(220, 53, 69, 0.9)",s.currentTarget.style.transform="scale(1)")},title:g("Remove photo"),children:"×"}),e.length>1&&H&&t.jsx("div",{style:{position:"absolute",bottom:"8px",left:"8px",right:"8px",background:"rgba(0, 123, 255, 0.9)",color:"white",padding:"4px 8px",borderRadius:"4px",fontSize:"11px",fontWeight:"bold",textAlign:"center",zIndex:10},children:"SELECTED FOR TAGGING"}),u.status!=="complete"&&t.jsx(zt,{$status:u.status,children:u.status==="error"?"✕":u.status==="uploading"?"↑":u.status==="processing"?"⚙️":"•"}),t.jsxs(Bt,{style:{opacity:e.length===1||!H?1:.85,transition:"opacity 0.2s ease"},children:[u.type==="video"||(q=u.type)!=null&&q.startsWith("video")?t.jsx(Mt,{src:u.s3PreviewUrl,controls:!0}):t.jsx(Ut,{src:u.s3PreviewUrl,alt:u.fileName}),(u.status==="uploading"||u.status==="processing")&&t.jsx(qe,{$bottom:"4px",$left:"4px",$right:"4px",$height:"4px",children:t.jsx(He,{$progress:u.progress,$status:u.status})})]}),t.jsxs(Wt,{children:[(j=u.type)!=null&&j.startsWith("video")?g("Video"):g("Image"),u.size&&` • ${(u.size/1024/1024).toFixed(1)} MB`,u.duration&&` • ${u.duration}s`]}),u.status==="error"&&u.errorMessage&&t.jsxs(Kt,{$type:"error",children:[g("Error"),": ",u.errorMessage.length>40?u.errorMessage.substring(0,37)+"...":u.errorMessage]})]},o)})})]})},Ps=({isSavingAlbum:e,savingProgress:n})=>{const{t:i}=Ae();return e?t.jsxs(Pe,{children:[t.jsx(Et,{children:i("Saving Album")}),t.jsx(Nt,{id:"saveProgressText",children:i("Moving files...")}),t.jsx(qe,{children:t.jsx(He,{id:"saveProgress",$progress:n/100})})]}):null},As=({showFolderDetails:e,isCreator:n,folderName:i,setFolderName:S,folderDescription:p,setFolderDescription:I,isOnPublicProfile:c,handlePublicProfileToggle:v,participantsCanAddItems:g,handleParticipantsCanAddItemsToggle:$,isSavingAlbum:W})=>{const{t:u}=Ae();return!e||n!==!0?null:t.jsxs(Pe,{children:[t.jsxs(_e,{children:[t.jsx(Ee,{htmlFor:"folderName",children:u("Album Name (Optional)")}),t.jsx(Ft,{id:"folderName",type:"text",value:i,onChange:o=>S(o.target.value),placeholder:u("Enter album name")})]}),t.jsxs(_e,{children:[t.jsx(Ee,{htmlFor:"folderDescription",children:u("Album Description (Optional)")}),t.jsx(_t,{id:"folderDescription",value:p,onChange:o=>I(o.target.value),placeholder:u("Enter album description"),rows:4})]}),t.jsxs(Ne,{children:[t.jsx(Re,{children:u(c?"On Public Profile":"Not On Public Profile")}),t.jsxs(Oe,{children:[t.jsx("input",{type:"checkbox",checked:c,onChange:v,disabled:W}),t.jsx(ze,{})]})]}),t.jsxs(Ne,{children:[t.jsx(Re,{children:u(g?"Participants Can Add Items":"Participants Cannot Add Items")}),t.jsxs(Oe,{children:[t.jsx("input",{type:"checkbox",checked:g,onChange:$,disabled:W}),t.jsx(ze,{})]})]})]})},Ae=()=>({t:(e,n)=>n&&typeof n=="object"&&"count"in n?e.replace("{{count}}",String(n.count)):e,language:"en"}),ks=`
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
`,js=`
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
`,Cs=`
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
`,Ds=`
  mutation DeleteTag($tagId: String!) {
    deleteTag(tagId: $tagId) {
      id
      hasBeenDeleted
    }
  }
`,Fs=`
  mutation DeleteSubtag($subtagId: String!) {
    deleteSubtag(subtagId: $subtagId) {
      id
      hasBeenDeleted
    }
  }
`,_s=e=>{const[n,i]=w.useState([]),[S,p]=w.useState([]),[I,c]=w.useState(null),[v,g]=w.useState(!1),[$,W]=w.useState(null),[u,o]=w.useState(null),[H,q]=w.useState(!1),[j,s]=w.useState(!1),[Z,X]=w.useState(""),[L,V]=w.useState(""),[ae,D]=w.useState(!1),[l,B]=w.useState(!1),F=async()=>{var r,f;e("Fetching tags from API"),g(!0);try{const A=await de();if(!A){e("No token available for fetching tags");return}const K=await(await fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${A}`},body:JSON.stringify({query:ks,variables:{fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(e("Tags API response:",K),K.errors){console.error("GraphQL errors:",K.errors),e(`GraphQL errors: ${JSON.stringify(K.errors)}`);return}const te=(((f=(r=K==null?void 0:K.data)==null?void 0:r.fetchRelations)==null?void 0:f.items)||[]).map(Y=>{var le,xe;return{id:Y.id,tagTitle:Y.tagTitle,TagType:Y.TagType,points:Y.points,createdAt:Y.createdAt,updatedAt:Y.updatedAt,subtags:((xe=(le=Y.subtags)==null?void 0:le.items)==null?void 0:xe.map(ge=>({id:ge.id,tagTitle:ge.tagTitle,subtagTitle:ge.subtagTitle,TagType:ge.TagType,points:ge.points,createdAt:ge.createdAt,updatedAt:ge.updatedAt})))||[]}});e(`Fetched ${te.length} tags`),i(te)}catch(A){console.error("Error fetching tags:",A),e(`Error fetching tags: ${A}`)}finally{g(!1)}},m=r=>{if(e(`Selecting tag for photo application: ${r.tagTitle}`),!S.find(A=>A.tagTitle===r.tagTitle)){const A={tagTitle:r.tagTitle,TagType:r.TagType,subtags:[]};p(Q=>[...Q,A]),e(`Tag ${r.tagTitle} added to selection for photo application`)}},U=r=>{e(`Unselecting tag from photo application: ${r.tagTitle}`),p(f=>f.filter(A=>A.tagTitle!==r.tagTitle)),I===r.id&&c(null)},O=r=>{e(`Selecting subtag for photo application: ${r.subtagTitle} for tag: ${r.tagTitle}`),p(f=>f.map(A=>A.tagTitle===r.tagTitle&&!A.subtags.find(K=>K.subtagTitle===r.subtagTitle)?{...A,subtags:[...A.subtags,{TagType:r.TagType,tagTitle:r.tagTitle,subtagTitle:r.subtagTitle}]}:A))},ee=r=>{e(`Unselecting subtag from photo application: ${r.subtagTitle} for tag: ${r.tagTitle}`),p(f=>f.map(A=>A.tagTitle===r.tagTitle?{...A,subtags:A.subtags.filter(Q=>Q.subtagTitle!==r.subtagTitle)}:A))},fe=r=>{e(`Setting displayed tag: ${r}`),c(r)},x=r=>S.some(f=>f.tagTitle===r.tagTitle),b=r=>{const f=S.find(A=>A.tagTitle===r.tagTitle);return(f==null?void 0:f.subtags.some(A=>A.subtagTitle===r.subtagTitle))||!1},_=()=>{if(!I)return[];const r=n.find(f=>f.id===I);return(r==null?void 0:r.subtags)||[]},h=()=>{e("Clearing all selected tags"),p([]),c(null)},C=()=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(r){const f=Math.random()*16|0;return(r=="x"?f:f&3|8).toString(16)}),T=async(r,f)=>{if(e(`Adding new tag: ${r} of type: ${f}`),!r.trim())return e("Cannot add tag with empty title"),!1;D(!0);try{if(!await de())return e("No token available for adding tag"),!1;if(await(async()=>(e("PLACEHOLDER: Would send GraphQL mutation to add tag",{mutation:js,variables:{tagInput:{tagTitle:r.trim(),TagType:f,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(se=>setTimeout(se,500)),!0))()){const se={id:C(),tagTitle:r.trim(),TagType:f,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3),subtags:[]};return i(te=>[se,...te]),m(se),fe(se.id),X(""),q(!1),e(`Successfully added new tag for photo application: ${r}`),!0}return!1}catch(A){return console.error("Error adding new tag:",A),e(`Error adding new tag: ${A}`),!1}finally{D(!1)}},E=async(r,f,A)=>{if(e(`Adding new subtag: ${f} to tag: ${r}`),!f.trim())return e("Cannot add subtag with empty title"),!1;if(!I)return e("No displayed tag for adding subtag"),!1;B(!0);try{if(!await de())return e("No token available for adding subtag"),!1;if(await(async()=>(e("PLACEHOLDER: Would send GraphQL mutation to add subtag",{mutation:Cs,variables:{subtagInput:{tagTitle:r,subtagTitle:f.trim(),TagType:A,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(te=>setTimeout(te,500)),!0))()){const te={id:C(),tagTitle:r,subtagTitle:f.trim(),TagType:A,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3)};return i(Y=>Y.map(le=>le.id===I?{...le,subtags:[te,...le.subtags||[]]}:le)),O(te),V(""),s(!1),e(`Successfully added new subtag for photo application: ${f}`),!0}return!1}catch(Q){return console.error("Error adding new subtag:",Q),e(`Error adding new subtag: ${Q}`),!1}finally{B(!1)}},P=async r=>{e(`Deleting tag: ${r}`),W(r);try{if(!await de())return e("No token available for deleting tag"),!1;if(await(async()=>(e("PLACEHOLDER: Would send GraphQL mutation to delete tag",{mutation:Ds,variables:{tagId:r}}),await new Promise(K=>setTimeout(K,500)),!0))()){i(se=>se.filter(te=>te.id!==r));const K=n.find(se=>se.id===r);return K&&U(K),I===r&&fe(null),e(`Successfully deleted tag: ${r}`),!0}return!1}catch(f){return console.error("Error deleting tag:",f),e(`Error deleting tag: ${f}`),!1}finally{W(null)}},M=async r=>{e(`Deleting subtag: ${r}`),o(r);try{if(!await de())return e("No token available for deleting subtag"),!1;if(await(async()=>(e("PLACEHOLDER: Would send GraphQL mutation to delete subtag",{mutation:Fs,variables:{subtagId:r}}),await new Promise(K=>setTimeout(K,500)),!0))()){let K=null;return i(se=>se.map(te=>{var le;const Y=((le=te.subtags)==null?void 0:le.filter(xe=>xe.id===r?(K=xe,!1):!0))||[];return{...te,subtags:Y}})),K&&ee(K),e(`Successfully deleted subtag: ${r}`),!0}return!1}catch(f){return console.error("Error deleting subtag:",f),e(`Error deleting subtag: ${f}`),!1}finally{o(null)}},J=async(r,f)=>(e(`Placeholder: Updating tag points: ${r} to ${f}`),!1),ie=()=>{q(!0),X("")},oe=()=>{q(!1),X("")},pe=()=>{s(!0),V("")},ce=()=>{s(!1),V("")},ue=async()=>Z.trim()?await T(Z,"File"):!1,be=async()=>{if(L.trim()&&I){const r=n.find(f=>f.id===I);if(r)return await E(r.tagTitle,L,r.TagType)}return!1};return w.useEffect(()=>{F()},[]),{tags:n,selectedTags:S,displayedTagId:I,isLoadingTags:v,tagIdBeingDeleted:$,subtagIdBeingDeleted:u,isAddingNewTag:H,isAddingNewSubtag:j,newTagTitle:Z,newSubtagTitle:L,isSubmittingNewTag:ae,isSubmittingNewSubtag:l,fetchTags:F,selectTag:m,unselectTag:U,selectSubtag:O,unselectSubtag:ee,setDisplayedTag:fe,clearSelectedTags:h,isTagSelected:x,isSubtagSelected:b,getDisplayedTagSubtags:_,setTagIdBeingDeleted:W,setSubtagIdBeingDeleted:o,addNewTag:T,addNewSubtag:E,deleteTag:P,deleteSubtag:M,updateTagPoints:J,startAddingNewTag:ie,cancelAddingNewTag:oe,startAddingNewSubtag:pe,cancelAddingNewSubtag:ce,submitNewTag:ue,submitNewSubtag:be,setNewTagTitle:X,setNewSubtagTitle:V}},Es=z.div`
  margin: 16px 0;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
`,Je=z.div`
  margin-bottom: 12px;
`,Qe=z.h3`
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  display: flex;
  align-items: center;
  gap: 8px;
`,Ve=z.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  min-height: 32px;
`,Ye=z.button`
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
`,Ns=z(Ye)`
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
`,Xe=z.button`
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
`,Rs=z.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
`,Ze=z.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
`,Le=z.button`
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
`,Os=z.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border: 1px solid #007bff;
  border-radius: 12px;
  background: white;
`,zs=z.input`
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
`,Bs=z.span`
  background: #6c757d;
  color: white;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: bold;
`,Ms=({tag:e,isSelected:n,isDisplayed:i,isBeingDeleted:S,disabled:p,onTagClick:I,onDeleteTag:c,getTagDisplayText:v})=>{const[g,$]=w.useState(!1);return t.jsxs(Ye,{$isSelected:n,$isDisplayed:i,$isBeingDeleted:S,disabled:p,onClick:()=>I(e),onMouseEnter:()=>$(!0),onMouseLeave:()=>$(!1),children:[v(e),g&&!p&&!S&&t.jsx(Xe,{onClick:W=>{W.stopPropagation(),c(e.id)},disabled:S,children:"×"})]})},Us=({subtag:e,isSelected:n,isBeingDeleted:i,disabled:S,onSubtagClick:p,onDeleteSubtag:I})=>{const[c,v]=w.useState(!1);return t.jsxs(Ns,{$isSelected:n,$isBeingDeleted:i,disabled:S,onClick:()=>p(e),onMouseEnter:()=>v(!0),onMouseLeave:()=>v(!1),children:[e.subtagTitle,c&&!S&&!i&&t.jsx(Xe,{onClick:g=>{g.stopPropagation(),I(e.id)},disabled:i,children:"×"})]})},et=({value:e,onChange:n,onSubmit:i,onCancel:S,isSubmitting:p,placeholder:I="Enter tag name..."})=>{const c=w.useRef(null);w.useEffect(()=>{c.current&&c.current.focus()},[]);const v=g=>{g.key==="Enter"?i():g.key==="Escape"&&S()};return t.jsxs(Os,{children:[t.jsx(zs,{ref:c,type:"text",value:e,onChange:g=>n(g.target.value),onKeyDown:v,placeholder:I,disabled:p}),t.jsx(We,{onClick:i,disabled:!e.trim()||p,title:"Add (Enter)",children:p?"...":"✓"}),t.jsx(We,{onClick:S,disabled:p,title:"Cancel (Escape)",children:"×"})]})},Ws=({tagsManager:e,disabled:n=!1,enhancedLog:i,photoCount:S=1})=>{const{tags:p,selectedTags:I,displayedTagId:c,isLoadingTags:v,tagIdBeingDeleted:g,isAddingNewTag:$,newTagTitle:W,isSubmittingNewTag:u,selectTag:o,unselectTag:H,setDisplayedTag:q,isTagSelected:j,deleteTag:s,startAddingNewTag:Z,cancelAddingNewTag:X,submitNewTag:L,setNewTagTitle:V}=e,ae=m=>{if(n)return;const U=j(m),O=c===m.id;U?U&&!O?(q(m.id),i(`Displayed tag: ${m.tagTitle}`)):U&&O&&(H(m),q(null),i(`Unselected tag: ${m.tagTitle}`)):(o(m),q(m.id),i(`Selected tag for photo application: ${m.tagTitle}`))},D=async m=>{if(n)return;i(`Delete tag initiated: ${m}`);const U=await s(m);i(U?`Tag successfully deleted: ${m}`:`Failed to delete tag: ${m}`)},l=async()=>{await L()||i("Failed to submit new tag")},B=m=>{const U=I.find(ee=>ee.tagTitle===m.tagTitle);if(!U||U.subtags.length===0)return m.tagTitle;const O=U.subtags.map(ee=>ee.subtagTitle).join(" || ");return`${m.tagTitle}  |  ${O}`},F=[...p].sort((m,U)=>m.points!==U.points?U.points-m.points:U.updatedAt-m.updatedAt);return t.jsxs(Es,{children:[t.jsxs(Je,{children:[t.jsxs(Qe,{children:["Select Tags to Apply to Photos",I.length>0&&t.jsxs(Bs,{children:[I.length," selected"]})]}),t.jsx(Ve,{children:v?t.jsx(Rs,{children:"Loading tags..."}):t.jsxs(t.Fragment,{children:[F.map(m=>t.jsx(Ms,{tag:m,isSelected:j(m),isDisplayed:c===m.id,isBeingDeleted:g===m.id,disabled:n,onTagClick:ae,onDeleteTag:D,getTagDisplayText:B},m.id)),$?t.jsx(et,{value:W,onChange:V,onSubmit:l,onCancel:X,isSubmitting:u,placeholder:"Enter tag name..."}):t.jsx(Le,{disabled:n,onClick:Z,children:"+ Add Tag"}),F.length===0&&!$&&t.jsx(Ze,{children:"No tags available"})]})})]}),c&&t.jsx(Ks,{tagsManager:e,disabled:n,enhancedLog:i}),I.length>0&&t.jsxs("div",{style:{marginTop:"12px",padding:"12px 16px",background:"#e7f3ff",borderRadius:"6px",fontSize:"13px",color:"#0c5aa6",border:"1px solid #b3d9ff"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"6px"},children:[t.jsx("span",{children:"🎯"}),t.jsx("strong",{children:"Ready to Apply Tags:"})]}),"You have selected ",t.jsxs("strong",{children:[I.length," tag",I.length!==1?"s":""]})," to apply to photos.",t.jsx("br",{}),t.jsx("strong",{children:"Next:"})," ",S===1?'Click "Apply Selected Tags to Photo" above to tag your photo.':`Select photos above (they'll show blue borders), then click "Apply Selected Tags to Photos".`]})]})},Ks=({tagsManager:e,disabled:n=!1,enhancedLog:i})=>{var D;const{displayedTagId:S,subtagIdBeingDeleted:p,isAddingNewSubtag:I,newSubtagTitle:c,isSubmittingNewSubtag:v,selectSubtag:g,unselectSubtag:$,isSubtagSelected:W,deleteSubtag:u,startAddingNewSubtag:o,cancelAddingNewSubtag:H,submitNewSubtag:q,setNewSubtagTitle:j}=e,s=S?((D=e.tags.find(l=>l.id===S))==null?void 0:D.subtags)||[]:[],Z=e.tags.find(l=>l.id===S),X=l=>{if(n)return;W(l)?($(l),i(`Unselected subtag for photo application: ${l.subtagTitle}`)):(g(l),i(`Selected subtag for photo application: ${l.subtagTitle}`))},L=async l=>{if(n)return;i(`Delete subtag initiated: ${l}`);const B=await u(l);i(B?`Subtag successfully deleted: ${l}`:`Failed to delete subtag: ${l}`)},V=async()=>{await q()||i("Failed to submit new subtag")};if(!Z)return null;const ae=[...s].sort((l,B)=>l.points!==B.points?B.points-l.points:B.updatedAt-l.updatedAt);return t.jsxs(Je,{children:[t.jsxs(Qe,{children:['Subtags for "',Z.tagTitle,'"']}),t.jsxs(Ve,{children:[ae.map(l=>t.jsx(Us,{subtag:l,isSelected:W(l),isBeingDeleted:p===l.id,disabled:n,onSubtagClick:X,onDeleteSubtag:L},l.id)),I?t.jsx(et,{value:c,onChange:j,onSubmit:V,onCancel:H,isSubmitting:v,placeholder:"Enter subtag name..."}):t.jsx(Le,{disabled:n,onClick:o,children:"+ Add Subtag"}),ae.length===0&&!I&&t.jsx(Ze,{children:"No subtags available"})]})]})},Gs=({children:e,t:n,isRTL:i})=>t.jsxs("div",{style:{padding:"24px",marginBottom:"24px",backgroundColor:"#f8f9fa",border:"2px solid #e9ecef",borderRadius:"12px",direction:i?"rtl":"ltr"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",fontSize:"18px",color:"#495057",fontWeight:"600",marginBottom:"20px",flexDirection:i?"row-reverse":"row"},children:[t.jsx("span",{style:{marginRight:i?"0":"12px",marginLeft:i?"12px":"0",fontSize:"20px"},children:"📷"}),n("Click files below to select them for tagging")]}),e]}),qs=({selectedPhotos:e,selectedPhotoIndices:n,onToggleSelection:i,onSelectAll:S,onDeselectAll:p,onRemovePhoto:I,disabled:c,t:v,isRTL:g})=>e.length===0?null:t.jsxs("div",{style:{marginBottom:"24px",direction:g?"rtl":"ltr"},children:[t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",flexDirection:g?"row-reverse":"row"},children:[t.jsxs("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:[v("New Files")," (",e.length,")"]}),t.jsx("div",{style:{display:"flex",gap:"8px",flexDirection:g?"row-reverse":"row"},children:t.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:c?"#f8f9fa":"#fff",color:c?"#999":"#333",cursor:c?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:n.size===e.length?p:S,disabled:c,onMouseEnter:$=>{c||($.currentTarget.style.backgroundColor="#f8f9fa")},onMouseLeave:$=>{c||($.currentTarget.style.backgroundColor="#fff")},children:n.size===e.length?v("Deselect All"):v("Select All")})})]}),t.jsx(Is,{selectedPhotos:e,selectedPhotoIndices:n,isSavingAlbum:c,onRemovePhoto:I,onTogglePhotoSelection:i,onSelectAllPhotos:S,onDeselectAllPhotos:p,hideHeader:!0})]}),Hs=({existingFiles:e,selectedExistingIndices:n,onToggleSelection:i,onSelectAll:S,onDeselectAll:p,onDeleteFile:I,disabled:c,t:v,isRTL:g})=>e.length===0?null:t.jsxs("div",{style:{marginBottom:"24px",direction:g?"rtl":"ltr"},children:[t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",flexDirection:g?"row-reverse":"row"},children:[t.jsxs("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:[v("Existing Files")," (",e.length,")"]}),t.jsx("div",{style:{display:"flex",gap:"8px",flexDirection:g?"row-reverse":"row"},children:t.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:c?"#f8f9fa":"#fff",color:c?"#999":"#333",cursor:c?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:n.size===e.length?p:S,disabled:c,onMouseEnter:$=>{c||($.currentTarget.style.backgroundColor="#f8f9fa")},onMouseLeave:$=>{c||($.currentTarget.style.backgroundColor="#fff")},children:n.size===e.length?v("Deselect All"):v("Select All")})})]}),t.jsx("div",{style:{display:"flex",overflowX:"auto",gap:"12px",padding:"16px",border:"2px dashed #007bff",borderRadius:"8px",backgroundColor:"#fff",scrollbarWidth:"thin",scrollbarColor:"#007bff #f8f9fa"},children:e.map(($,W)=>t.jsxs("div",{style:{position:"relative",width:"160px",height:"160px",flexShrink:0,borderRadius:"8px",overflow:"hidden",border:n.has(W)?"3px solid #007bff":"2px solid #ddd",cursor:c?"not-allowed":"pointer",opacity:c?.6:1,transition:"all 0.2s ease"},onClick:()=>!c&&i(W),children:[t.jsx(es,{thumbnailDataKey:$.thumbnailDataKey,dataKey:$.dataKey,alt:v("Existing file"),style:{width:"100%",height:"100%",objectFit:"cover"}}),n.has(W)&&t.jsx("div",{style:{position:"absolute",bottom:"8px",left:"8px",right:"8px",background:"rgba(0, 123, 255, 0.9)",color:"white",padding:"4px 8px",borderRadius:"4px",fontSize:"11px",fontWeight:"bold",textAlign:"center",zIndex:10},children:"SELECTED FOR TAGGING"}),t.jsx("button",{onClick:u=>{u.stopPropagation(),!c&&confirm(v("Are you sure you want to remove this file?"))&&I(W)},disabled:c,style:{position:"absolute",top:"8px",right:"8px",width:"24px",height:"24px",borderRadius:"50%",border:"none",backgroundColor:"rgba(220, 53, 69, 0.9)",color:"white",cursor:c?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px",fontWeight:"900",zIndex:20,opacity:c?.5:1,transition:"all 0.2s ease",boxShadow:"0 2px 4px rgba(0,0,0,0.3)",lineHeight:"1"},onMouseEnter:u=>{c||(u.currentTarget.style.backgroundColor="rgba(200, 35, 51, 1)",u.currentTarget.style.transform="scale(1.1)")},onMouseLeave:u=>{c||(u.currentTarget.style.backgroundColor="rgba(220, 53, 69, 0.9)",u.currentTarget.style.transform="scale(1)")},title:v("Remove file"),children:"×"}),$.dataInBytes>0&&t.jsxs("div",{style:{position:"absolute",bottom:"4px",left:"4px",backgroundColor:"rgba(0,0,0,0.7)",color:"white",fontSize:"10px",padding:"2px 4px",borderRadius:"4px"},children:[($.dataInBytes/(1024*1024)).toFixed(1),"MB"]}),$.durationInSeconds&&t.jsxs("div",{style:{position:"absolute",top:"8px",left:"8px",backgroundColor:"rgba(0,0,0,0.7)",color:"white",fontSize:"10px",padding:"2px 4px",borderRadius:"4px"},children:[Math.floor($.durationInSeconds/60),":",String(Math.floor($.durationInSeconds%60)).padStart(2,"0")]})]},`existing-${W}-${$.dataKey}`))})]}),Js=()=>{const{t:e,language:n}=Ke(),i=Ie(n)==="rtl",S=Vt(e),{setShowUsernamePrompt:p,setUsernameInput:I}=S,[c,v]=w.useState(null),[g,$]=w.useState(!1),[W,u]=w.useState(0),[o,H]=w.useState(""),[q,j]=w.useState(""),[s,Z]=w.useState(!1),[X,L]=w.useState(!1),[V,ae]=w.useState("NoPassword"),[D,l]=w.useState(""),[B,F]=w.useState(!1),[m,U]=w.useState(!0),[O,ee]=w.useState(null),[fe,x]=w.useState(!1),[b,_]=w.useState([]),[h,C]=w.useState(new Set),[T,E]=w.useState(new Map),[P,M]=w.useState([]),[J,ie]=w.useState(new Set),[oe,pe]=w.useState(new Map),[ce,ue]=w.useState(!1),be=a=>{!c&&a&&v(a)},{fileInputRef:r,selectedPhotos:f,setSelectedPhotos:A,isUploading:Q,progressTracker:K,setProgressTracker:se,debugMessages:te,currentFolderId:Y,openFilePicker:le,handleFileSelection:xe,setEditingExistingAlbum:ge,log:Se}=Xt(be,!0);w.useEffect(()=>{(async()=>{try{await Ct(),Se("🔥 Save-album page S3 credentials prewarmed successfully")}catch(y){Se(`⚠️ Save-album page credential prewarming failed: ${String(y)}`)}})()},[]);const k=(a,y)=>{let R=`[${new Date().toISOString()}] ${a}`;if(y!==void 0)try{const G=typeof y=="object"?JSON.stringify(y,null,2):String(y);R+=`
Data: ${G}`,console.log(R),console.log("Data object:",y)}catch(G){R+=` [Error stringifying data: ${G}]`,console.log(R),console.log("Raw data:",y)}else console.log(R);Se(R)},tt=async a=>{var y,N,R,G;if(a){ue(!0),k(`Fetching existing album data for folder ID: ${a}`);try{const re=await de();if(!re){k("❌ Authentication failed while fetching existing album data");return}const St=`
        mutation FetchRelations($fetchRelationsInput: FetchRelationsInput!) {
          fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
            items {
              ... on FolderPosition {
                ${Lt}
              }
            }
          }
        }
      `,$t={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}},ye=await(await fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${re}`},body:JSON.stringify({query:St,variables:$t})})).json();if(ye.errors){console.error("GraphQL errors:",ye.errors),k(`❌ Failed to fetch existing album data: ${JSON.stringify(ye.errors)}`);return}const Ce=(((N=(y=ye==null?void 0:ye.data)==null?void 0:y.fetchRelations)==null?void 0:N.items)||[]).find(ne=>ne&&ne.folder&&ne.folder.id===a);if(!Ce)return;const he=Ce.folder,De=(((G=(R=he==null?void 0:he.fileReferencesPage)==null?void 0:R.items)==null?void 0:G.map(ne=>ne.file))||[]).filter(ne=>ne&&ne.dataKey).map(ne=>({dataKey:ne.dataKey,thumbnailDataKey:ne.thumbnailDataKey||null,durationInSeconds:ne.durationInSeconds||null,dataInBytes:ne.dataInBytes||0}));M(De),k(`✅ Successfully loaded ${De.length} existing files`),!o&&he.folderName&&H(he.folderName),!q&&he.folderDescription&&j(he.folderDescription),ge(a)}catch(re){console.error("Failed to fetch existing album data:",re),k(`❌ Failed to fetch existing album data: ${String(re)}`)}finally{ue(!1)}}};w.useEffect(()=>{c&&c!==Y&&(k(`Loading existing files for folder ID: ${c}`),tt(c))},[c,Y]);const st=_s(k),{cognitoUsername:ke,publicUsername:$e,setPublicUsername:rt}=Ts(v,A,ee,Z,H,j,F,U,ae,l,x,_,k),{saveAlbumDirectly:je}=vs(c||Y,ke,f,fe,b,o,q,B,m,V,D,T,$,u,A,se,k);w.useEffect(()=>{Y&&!c&&(v(Y),k(`Updated folder ID from upload processor: ${Y}`))},[Y,c]),w.useEffect(()=>{C(a=>{const y=new Set;return a.forEach(N=>{N<f.length&&y.add(N)}),y}),E(a=>{const y=new Map(a),N=[];return a.forEach((R,G)=>{G>=f.length&&N.push(G)}),N.forEach(R=>{y.delete(R)}),y})},[f.length]),w.useEffect(()=>{ie(a=>{const y=new Set;return a.forEach(N=>{N<P.length&&y.add(N)}),y}),pe(a=>{const y=new Map(a),N=[];return a.forEach((R,G)=>{G>=P.length&&N.push(G)}),N.forEach(R=>{y.delete(R)}),y})},[P.length]);const it=a=>{k(`Removing photo at index: ${a}`);const y=f.filter((N,R)=>R!==a);A(y),k(`New files count: ${y.length}`),y.length>0?(localStorage.setItem(me.SELECTED_PHOTOS,JSON.stringify(y)),k(`Updated localStorage with ${y.length} photos`)):(localStorage.removeItem(me.SELECTED_PHOTOS),k("Removed photos from localStorage")),C(N=>{const R=new Set;return N.forEach(G=>{G<a?R.add(G):G>a&&R.add(G-1)}),R}),E(N=>{const R=new Map;return N.forEach((G,re)=>{re<a?R.set(re,G):re>a&&R.set(re-1,G)}),R})},ot=a=>{k(`Removing existing file at index: ${a}`);const y=P.filter((N,R)=>R!==a);M(y),k(`New existing files count: ${y.length}`),ie(N=>{const R=new Set;return N.forEach(G=>{G<a?R.add(G):G>a&&R.add(G-1)}),R}),pe(N=>{const R=new Map;return N.forEach((G,re)=>{re<a?R.set(re,G):re>a&&R.set(re-1,G)}),R})},at=a=>{k(`Toggling selection for existing file at index: ${a}`),ie(y=>{const N=new Set(y);return N.has(a)?(N.delete(a),k(`Deselected existing file ${a}`)):(N.add(a),k(`Selected existing file ${a}`)),N})},nt=()=>{k("Selecting all existing files");const a=new Set;for(let y=0;y<P.length;y++)a.add(y);ie(a)},lt=()=>{k("Deselecting all existing files"),ie(new Set)},dt=a=>{k(`Toggling selection for photo at index: ${a}`),C(y=>{const N=new Set(y);return N.has(a)?(N.delete(a),k(`Deselected photo ${a}`)):(N.add(a),k(`Selected photo ${a}`)),N})},ct=()=>{k("Selecting all photos");const a=new Set;for(let y=0;y<f.length;y++)a.add(y);C(a)},ut=()=>{k("Deselecting all photos"),C(new Set)},pt=()=>{const a=!B;k(`Toggling isOnPublicProfile to: ${a}`),F(a)},ft=()=>{const a=!m;k(`Toggling participantsCanAddItems to: ${a}`),U(a)},gt=async()=>{k("Album save initiated"),k("Photo tags applied:",Object.fromEntries(T)),k("Existing file tags applied:",Object.fromEntries(oe)),$(!0);try{if($e!=null&&$e.startsWith("Profile-")){k("Public username starts with 'Profile-', showing username prompt"),I(""),p(!0),$(!1);return}k("Valid username found, proceeding to save album directly with file-level tagging"),je()}catch(a){console.error("Error in handleSaveAlbum:",a),k(`Error in handleSaveAlbum: ${a}`),$(!1)}},mt=a=>{k(`Handling successful username update to: ${a}`),localStorage.setItem(me.PUBLIC_USERNAME,a),rt(a),p(!1),k("Proceeding to save album after username update"),je()},xt=(a,y)=>{k(`Password dialog closed with option: ${a}, password: ${y?"******":"undefined"}`),a&&ae(a),y!==void 0&&l(y),L(!1)},ht=()=>V==="NoPassword"?e("Album Password Policy"):`${e(V==="NotVisible"?"Password Required To See Or Save":V==="Watermark"?"Watermarked And No Saving Without Password":"Password Required To Save")} ${D?`(${D})`:""}`,bt=()=>{k("Opening password dialog"),L(!0)},yt=()=>{k("Add photos button clicked"),le(c)},Te=g||Q||ce,wt=f.length>0||P.length>0;return t.jsxs(t.Fragment,{children:[t.jsx(Gt,{}),t.jsxs(qt,{$isRTL:i,children:[t.jsxs("div",{style:{maxWidth:"900px",margin:"0 auto"},children:[t.jsxs(Ht,{children:[t.jsx(Jt,{href:"my-albums.html",children:e("My Albums")}),t.jsx(ws,{t:e})]}),t.jsx(As,{showFolderDetails:s,isCreator:O,folderName:o,setFolderName:H,folderDescription:q,setFolderDescription:j,isOnPublicProfile:B,handlePublicProfileToggle:pt,participantsCanAddItems:m,handleParticipantsCanAddItemsToggle:ft,isSavingAlbum:g||Q}),(Q||K.totalFiles>0&&(K.filesUploading>0||K.filesProcessing>0||K.filesComplete<K.totalFiles))&&t.jsx(Zt,{progressTracker:K,isRTL:Ie(n)==="rtl",variant:"detailed",context:"saving",isUploading:Q,showSuccessMessage:!1,showErrorMessage:!0,customMessages:{error:e("Some photos could not be processed. You can continue with the successfully processed photos.")}}),t.jsx("input",{ref:r,id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:a=>xe(a,ke),style:{display:"none"}}),s&&O===!0&&wt&&t.jsxs(Gs,{t:e,isRTL:i,children:[(P.length>0||ce)&&t.jsx("div",{style:{marginBottom:"24px"},children:ce?t.jsx("div",{style:{padding:"20px",textAlign:"center",color:"#666",fontSize:"14px"},children:e("Loading existing files...")}):t.jsx(Hs,{existingFiles:P,selectedExistingIndices:J,onToggleSelection:at,onSelectAll:nt,onDeselectAll:lt,onDeleteFile:ot,disabled:Te,t:e,isRTL:i})}),t.jsx(qs,{selectedPhotos:f,selectedPhotoIndices:h,onToggleSelection:dt,onSelectAll:ct,onDeselectAll:ut,onRemovePhoto:it,disabled:Te,t:e,isRTL:i}),t.jsx("div",{style:{marginTop:"24px"},children:t.jsx(Ws,{tagsManager:st,disabled:Te,enhancedLog:k,photoCount:f.length+P.length})})]}),t.jsx(Ps,{isSavingAlbum:g,savingProgress:W}),t.jsxs(Qt,{children:[t.jsx(ve,{onClick:yt,disabled:g||Q||ce,children:e(Q?"Uploading...":"Add More Photos")}),O===!0&&t.jsx(ve,{$passwordSet:V!=="NoPassword",onClick:bt,disabled:g||Q||ce,children:ht()}),t.jsx(ve,{$primary:!0,onClick:gt,disabled:g||Q||ce,children:e(g?"Saving Album...":"Save Album")})]}),t.jsx(Yt,{t:e,language:n,usernameManager:S,onSuccess:mt}),t.jsx(ys,{isOpen:X,onClose:xt,initialOption:V,initialPassword:D})]}),t.jsx(Ss,{debugMessages:te,t:e,isRTL:i,textDirection:i?"rtl":"ltr"})]})]})},Qs=()=>t.jsx(jt,{children:t.jsx(Js,{})});kt.createRoot(document.getElementById("root")).render(t.jsx(Qs,{}));
