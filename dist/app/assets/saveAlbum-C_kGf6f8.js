import{d as J,u as Qe,a as u,j as e,g as Ee,h as ge,L as fe,i as Me,s as Dt,m as Ft,f as Ie,k as Et,l as _t,n as Nt,r as zt,o as $e,R as Rt,I as Ot,p as Bt}from"./utils-Bo1vI173.js";import{C as _e,F as Ue,e as We,f as Mt,g as Ut,P as Wt,h as Kt,i as Ve,j as Ye,k as Gt,l as Ht,S as qt,m as Jt,V as Qt,n as Vt,o as Yt,M as Xt,G as Zt,p as Lt,q as es,r as ts,D as ss,s as Ce,B as Ke,t as rs,u as is}from"./styled-components-DU9QD5Ho.js";import{u as os,U as as}from"./useUsernameManagement-DqvyQiEv.js";import{u as ns,U as ls}from"./useFileUploadProcessor-zq3li-q3.js";import{F as cs}from"./types-B2_92tNb.js";import{L as ds}from"./LazyImage-Ce_wn90j.js";const f={colors:{primary:"#007bff",primaryDark:"#0056b3",secondary:"#6c757d",success:"#4caf50",danger:"#e53935",warning:"#ff9800",white:"#fff",text:{primary:"#333",secondary:"#666",light:"#777"},background:{primary:"#f9fafb",highlight:"#f0f7ff"},border:"#ddd"},spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px"},borderRadius:{small:"4px",medium:"8px"},boxShadow:{lg:"0 4px 10px rgba(0,0,0,0.08)"}},us=J.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10000;
`,fs=J.div`
  background-color: ${f.colors.white};
  border-radius: ${f.borderRadius.medium};
  box-shadow: ${f.boxShadow.lg};
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
  scrollbar-color: ${f.colors.border} transparent;
  
  /* Custom scrollbar for webkit browsers */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${f.colors.border};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${f.colors.secondary};
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
    border-radius: ${f.borderRadius.small};
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
`,ps=J.div`
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
`,gs=J.div`
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
`,ms=J.h3`
  font-size: 24px;
  font-weight: 600;
  color: ${f.colors.text.primary};
  margin: 0 0 ${f.spacing.lg} 0;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 22px;
    margin: 0 0 ${f.spacing.md} 0;
  }
  
  @media (max-height: 700px) {
    font-size: 20px;
    margin: 0 0 ${f.spacing.md} 0;
  }
  
  @media (max-width: 480px) {
    font-size: 18px;
  }
`,xs=J.p`
  margin-bottom: ${f.spacing.lg};
  font-size: 16px;
  color: ${f.colors.text.secondary};
  line-height: 1.5;
  
  @media (max-width: 768px) {
    margin-bottom: ${f.spacing.md};
    font-size: 15px;
  }
  
  @media (max-height: 700px) {
    margin-bottom: ${f.spacing.sm};
    font-size: 14px;
  }
`,Ge=J.div`
  margin-bottom: ${f.spacing.lg};
`,He=J.label`
  display: block;
  margin-bottom: ${f.spacing.sm};
  font-size: 14px;
  font-weight: 500;
  color: ${f.colors.text.primary};
`,hs=J.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${f.colors.border};
  border-radius: ${f.borderRadius.small};
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${f.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  &::placeholder {
    color: ${f.colors.text.light};
  }
`,bs=J.div`
  display: flex;
  flex-direction: column;
  gap: ${f.spacing.md};
  margin-bottom: ${f.spacing.xl};
`,ys=J.div`
  border: 2px solid ${t=>t.$isSelected?f.colors.primary:f.colors.border};
  border-radius: ${f.borderRadius.medium};
  padding: ${f.spacing.lg};
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${t=>t.$isSelected?f.colors.background.highlight:f.colors.white};
  display: flex;
  align-items: center;
  gap: ${f.spacing.lg};
  
  @media (max-width: 768px) {
    padding: ${f.spacing.md};
    gap: ${f.spacing.md};
  }
  
  @media (max-width: 480px) {
    padding: ${f.spacing.sm};
    gap: ${f.spacing.sm};
  }
  
  @media (max-height: 700px) {
    padding: ${f.spacing.sm};
    gap: ${f.spacing.sm};
  }
`,ws=J.div`
  flex: 1;
`,Ss=J.div`
  margin-bottom: ${f.spacing.xs};
`,Ts=J.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${f.colors.primary};
  flex-shrink: 0;
`,$s=J.label`
  font-size: 16px;
  font-weight: 500;
  color: ${f.colors.text.primary};
  cursor: pointer;
  display: block;
`,vs=J.div`
  font-size: 14px;
  color: ${f.colors.text.secondary};
  margin-top: ${f.spacing.xs};
`,Is=J.div`
  color: ${f.colors.warning};
  font-size: 12px;
  font-style: italic;
  margin-top: ${f.spacing.xs};
  font-weight: 500;
`,As=J.div`
  display: flex;
  gap: ${f.spacing.sm};
  justify-content: center;
  margin-top: ${f.spacing.xl};
`,qe=J.button`
  background-color: ${t=>t.$variant==="danger"?f.colors.danger:t.$variant==="secondary"?"transparent":t.$variant==="success"?f.colors.success:f.colors.primary};
  color: ${t=>t.$variant==="secondary"?f.colors.primary:f.colors.white};
  border: ${t=>t.$variant==="secondary"?`1px solid ${f.colors.primary}`:"none"};
  padding: ${t=>t.$size==="small"?"8px 16px":t.$size==="large"?"16px 32px":"12px 24px"};
  border-radius: ${f.borderRadius.medium};
  cursor: ${t=>t.disabled?"not-allowed":"pointer"};
  font-size: ${t=>t.$size==="small"?"14px":t.$size==="large"?"18px":"16px"};
  font-weight: 500;
  transition: all 0.2s ease;
  opacity: ${t=>t.disabled?.6:1};
  min-width: 100px;

  &:hover:not(:disabled) {
    background-color: ${t=>t.$variant==="danger"?"#c62828":t.$variant==="secondary"?f.colors.background.highlight:t.$variant==="success"?"#388e3c":f.colors.primaryDark};
  }
`,Ps=J.div`
  background-color: ${f.colors.background.primary};
  border-radius: ${f.borderRadius.medium};
  padding: ${f.spacing.md};
  margin: ${f.spacing.md} 0;
  border-left: 4px solid ${f.colors.primary};
  font-size: 14px;
  color: ${f.colors.text.secondary};
  line-height: 1.4;
  
  @media (max-width: 768px) {
    padding: ${f.spacing.sm};
    margin: ${f.spacing.sm} 0;
    font-size: 13px;
  }
  
  @media (max-height: 700px) {
    padding: ${f.spacing.xs};
    font-size: 12px;
  }
`,Cs=[{value:"NotVisible",titleKey:"Password Required To See Or Save",descriptionKey:"Album will be completely hidden until correct password is entered"},{value:"Watermark",titleKey:"Watermarked And No Saving Without Password",descriptionKey:"Photos will be visible with watermarks, password required to save"},{value:"CannotBeSaved",titleKey:"Password Required To Save",descriptionKey:"Photos are visible but password required to download or save"},{value:"NoPassword",titleKey:"No Password",descriptionKey:"Album is fully public with no restrictions"}],js=({isOpen:t,onClose:n,initialOption:a="NoPassword",initialPassword:P=""})=>{const{t:x,language:K}=Qe(),o=Ee(K)==="rtl",[p,g]=u.useState(a),[I,G]=u.useState(P);if(u.useEffect(()=>{t&&(g(a),G(P))},[t,a,P]),!t)return null;const F=I.trim()==="",q=M=>{g(M)},l=M=>{M.target===M.currentTarget&&n()},te=M=>M!=="NoPassword";return e.jsxs(e.Fragment,{children:[e.jsx(us,{onClick:l}),e.jsx(fs,{children:e.jsx(ps,{children:e.jsxs(gs,{$isRTL:o,children:[e.jsx(ms,{children:x("Album Password Policy")}),e.jsx(xs,{children:x("Configure password protection for your album. Choose how you want to restrict access to your photos.")}),e.jsxs(Ge,{children:[e.jsx(He,{children:x("Enter Password")}),e.jsx(hs,{type:"text",placeholder:x("Enter password (optional)"),value:I,onChange:M=>G(M.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"})]}),e.jsxs(Ge,{children:[e.jsx(He,{children:x("Select Protection Level")}),e.jsx(bs,{children:Cs.map(M=>e.jsxs(ys,{$isSelected:p===M.value,onClick:()=>q(M.value),children:[e.jsx(Ts,{type:"radio",name:"protection",checked:p===M.value,onChange:()=>q(M.value)}),e.jsxs(ws,{children:[e.jsx(Ss,{children:e.jsx($s,{children:x(M.titleKey)})}),e.jsx(vs,{children:x(M.descriptionKey)}),F&&te(M.value)&&p===M.value&&e.jsx(Is,{children:x('⚠️ Will use "password" as default if left empty')})]})]},M.value))})]}),te(p)&&e.jsxs(Ps,{children:[e.jsx("strong",{children:x("💡 Password Protection Info:")}),e.jsx("br",{}),x('If you leave the password field empty, "password" will be used as the default password. You can change this anytime in album settings.')]}),e.jsxs(As,{children:[e.jsx(qe,{$variant:"secondary",onClick:()=>n(),children:x("Cancel")}),e.jsx(qe,{$variant:"primary",onClick:()=>{const M=F&&te(p)?"password":I;console.log(`Saving with option: ${p}, password: ${M.length>0?"********":"none"}`),n(p,M)},children:x("Save")})]})]})})})]})},ks=({debugMessages:t,t:n,isRTL:a,textDirection:P})=>t.length===0?null:e.jsxs("div",{style:{marginTop:"40px",background:"#fff3cd",padding:"16px",borderRadius:"8px",border:"1px solid #ffeeba",maxWidth:900,margin:"0 auto",direction:P},children:[e.jsx("h3",{style:{marginTop:0,fontSize:"18px",color:"#856404",textAlign:a?"right":"left"},children:n("Debug Log")}),e.jsx("pre",{style:{fontSize:"14px",color:"#856404",whiteSpace:"pre-wrap",maxHeight:"400px",overflow:"auto",textAlign:a?"right":"left"},children:t.map((x,K)=>e.jsx("div",{style:{marginBottom:"8px"},children:x},K))})]}),Ds=`
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
`,Fs=(t,n,a,P,x,K,o,p,g,I,G,F,q,l)=>{const[te,M]=u.useState(null),[V,oe]=u.useState(null),le=async h=>{l(`Initializing folder ID with username: ${h}`);try{const j=new URLSearchParams(window.location.search).get("folderId");if(l(`Folder ID from URL: ${j||"null"}`),j){t(j),l(`Using existing folder ID: ${j}`);try{l(`Fetching details for folder: ${j}`);const A=await pe(j,l);if(l("Folder details retrieved:",A),A){const L=`${h}_____${h}____Account`,ee=A.creatorId===L;if(l(`User is creator of folder: ${ee}, accountId: ${L}, creator: ${A.creatorId}`),a(ee),ee){l("User is creator, showing folder details"),P(!0),x(A.folderName),K(A.folderDescription),o(A.isOnPublicProfile),l(`Setting isOnPublicProfile: ${A.isOnPublicProfile}`),A.participantsCanAddItems!==void 0&&(p(A.participantsCanAddItems),l(`Setting participantsCanAddItems: ${A.participantsCanAddItems}`)),A.participantsCanDeleteItems!==void 0&&(q(A.participantsCanDeleteItems),l(`Setting participantsCanDeleteItems: ${A.participantsCanDeleteItems}`));const B=A.passwordPolicy;l(`Password policy from folder details: ${B}`),g(B),B!=="NoPassword"&&A.password&&I(A.password),l(`Set password protection option to: ${B}`)}else l("User is NOT the creator, hiding editable fields"),P(!1)}else l("No folder details retrieved, setting isCreator to true"),a(!0),P(!0)}catch(A){console.error("Error fetching folder details:",A),l(`Error fetching folder details: ${A}`),a(!1)}}else{const A=`${h}_____${Me()}____Folder`;l(`Creating new folder ID: ${A}`),t(A),l("Setting isCreator to true for new album"),a(!0),P(!0)}}catch(w){console.error("Folder ID initialization error:",w),l(`Folder ID initialization error: ${w}`),a(!1)}},pe=async(h,w)=>{var j,A,L,ee,B,ne,me,ye,be;w(`Fetching details for folder ID: ${h}`);try{const xe=await ge();if(!xe)return w("No token available for fetching folder details"),null;w("Sending GraphQL query to fetch folder details");const d=await(await fetch(Ie,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${xe}`},body:JSON.stringify({query:Ds,variables:{folderIds:[h],fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(w("Folder details API response:",d),d.errors)return console.error("GraphQL errors:",d.errors),w(`GraphQL errors: ${JSON.stringify(d.errors)}`),null;const v=((A=(j=d==null?void 0:d.data)==null?void 0:j.fetchFolders)==null?void 0:A.items)||[];if(w(`Found ${v.length} folder items`),v.length===0)return w("No folder items found"),null;const b=v[0];w("Retrieved folder data:",b);const S=((ee=(L=b.folderPosition)==null?void 0:L.profileIds)==null?void 0:ee.some(U=>U.includes("Public____Profile")))||!1;w(`Folder is on public profile: ${S}`),w("Profile IDs:",(B=b.folderPosition)==null?void 0:B.profileIds);const E=(ne=b.folderInviteParameters)==null?void 0:ne.usingFolderInviteGrantsRightToAddItems;w(`Participants can add items: ${E}`);const k=(me=b.folderInviteParameters)==null?void 0:me.usingFolderInviteGrantsRightToRemoveItems;return w(`Participants can delete items: ${k}`),{creatorId:b.creatorId||"",folderName:b.folderName||"",folderDescription:b.folderDescription||"",passwordPolicy:((ye=b.folderPassword)==null?void 0:ye.policy)||"NoPassword",password:((be=b.folderPassword)==null?void 0:be.password)||"",isOnPublicProfile:S,participantsCanAddItems:E!==void 0?E:!0,participantsCanDeleteItems:k!==void 0?k:!1}}catch(xe){return console.error("Error in fetchFolderDetails:",xe),w(`Error in fetchFolderDetails: ${xe}`),null}},s=()=>{l("Attempting to restore photos from localStorage");try{const h=localStorage.getItem(fe.SELECTED_PHOTOS);if(l(`Found stored photos: ${h?"yes":"no"}`),h)try{const w=JSON.parse(h);l(`Parsed ${w.length} photos from localStorage`),Array.isArray(w)&&w.length>0&&(n(w),l(`Restored ${w.length} photos to state`))}catch(w){console.error("Error parsing stored photos:",w),l(`Error parsing stored photos: ${w}`)}}catch(h){console.error("Error restoring photos from storage:",h),l(`Error restoring photos from storage: ${h}`)}},ae=()=>{l("Testing S3 connection");try{Dt?l("S3 client is available"):(console.error("S3 client not available"),l("S3 client not available"))}catch(h){console.error("S3 connection test error:",h),l(`S3 connection test error: ${h}`)}},re=async()=>{var h;l("Starting component initialization");try{l("Checking login with refresh");const w=await ge();if(!w){l("No token returned from login check, aborting initialization");return}try{const j=localStorage.getItem(fe.PUBLIC_USERNAME);l(`Retrieved public username from localStorage: ${j||"null"}`),oe(j||null);const L=JSON.parse(atob(w.split(".")[1]))["cognito:username"];if(L){l(`Extracted Cognito username from token: ${L}`),M(L);const ee=localStorage.getItem(fe.SUB_ALBUM_DATA);if(l(`Sub-album data from localStorage: ${ee||"null"}`),ee)try{const B=JSON.parse(ee);if(l("Parsed sub-album data:",B),B.isSubAlbum&&((h=B.selectedFileIds)==null?void 0:h.length)>0){l(`Valid sub-album data found with ${B.selectedFileIds.length} files`),G(!0),F(B.selectedFileIds),B.selectedPhotos&&B.selectedPhotos.length>0&&(l(`Found ${B.selectedPhotos.length} selected photos in sub-album data`),n(B.selectedPhotos)),P(!0),a(!0);const ne=`${L}_____${Me()}____Folder`;l(`Generated new folder ID for sub-album: ${ne}`),t(ne)}else l("Invalid sub-album data, proceeding with normal initialization"),await le(L)}catch(B){console.error("Error parsing sub-album data:",B),l(`Error parsing sub-album data: ${B}`),await le(L)}else l("No sub-album data found, proceeding with normal folder initialization"),await le(L)}else l("No Cognito username found in token")}catch(j){console.error("User data initialization error:",j),l(`User data initialization error: ${j}`)}s(),ae(),l("Component initialization completed")}catch(w){console.error("Initialization error:",w),l(`Initialization error: ${w}`)}};return u.useEffect(()=>{re()},[]),{cognitoUsername:te,publicUsername:V,setPublicUsername:oe}},Es=(t,n,a,P,x,K,o,p,g,I,G,F,q,l,te,M,V,oe,le,pe,s)=>{const ae=d=>(s(`Converting ${d.length} tags to API format`),d.map(v=>({TagType:v.TagType,tagTitle:v.tagTitle,selectedSubtagInputs:v.subtags.map(b=>({TagType:v.TagType,tagTitle:b.tagTitle,subtagTitle:b.subtagTitle}))}))),re=d=>{s(`Save progress text: ${d}`);const v=document.getElementById("saveProgressText");v&&(v.innerText=d)},h=d=>{const v=document.getElementById("saveProgress");v?(v.style.width=`${d}%`,s(`Updated save progress bar: ${d}%`)):s("Progress bar element not found"),oe(d)},w=(d,v)=>{s(`Splitting array of ${d.length} items into chunks of ${v}`);const b=[];for(let S=0;S<d.length;S+=v)b.push(d.slice(S,S+v));return s(`Created ${b.length} chunks`),b},j=d=>{const v=new Set;return d.filter(b=>v.has(b.fileId)?(s(`Skipping duplicate file reference with ID: ${b.fileId}`),!1):(v.add(b.fileId),!0))},A=(d,v,b)=>{s("Creating folder position input WITHOUT folder-level tags"),s(`Profile visibility: ${p?"Public":"Only Me"}`);const S=p?[`${n}_____Public____Profile`]:["Only Me_____Only Me____Profile"];s(`Profile IDs: ${JSON.stringify(S)}`);let E=[];P&&x.length>0&&(s(`Creating file reference IDs for ${x.length} sub-album files`),E=x.map(_=>{const X=_.split("_____");if(X.length>=2){const ie=X[1].split("____")[0],he=`${b}_____${ie}____FileReference`;return s(`Created file reference ID for sub-album: ${he}`),he}return s(`Using original fileId as fallback: ${_}`),_})),s(`Created ${E.length} acceptedFileReferenceIds`);const k=G!=="NoPassword"?F:null;if(s(`Password protection: ${G}`),s(`Album password: ${k?"******":"null"}`),s(`Participants can add items: ${g}`),s(`Participants can delete items: ${I}`),!t)throw s("Error: folderId is null or undefined"),new Error("folderId is required to create folder position input");const U=Et(t),Q=_t(U);return{currentTime:d,folderId:t,profileIds:S,folderPositionPoints:1,acceptedFileReferenceIds:E,folderInput:{folderAboutContactIds:[v],albumNanoId:Q,folderName:K,folderDescription:o,folderPasswordInput:{password:k,policy:G},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:g,usingFolderInviteGrantsRightToRemoveItems:I,addedItemsNeedFolderCreatorApproval:!1}}}},L=(d,v,b)=>(s(`Creating file reference inputs with individual photo tags for ${d.length} photos`),d.map((S,E)=>{var X;const k=q.get(E)||[],U=ae(k);if(s(`Photo ${E} (${S.fileName}): ${k.length} tags applied`),S.fileId)return s(`Using existing fileId for photo: ${S.fileId}`),{fileReferencesHolderId:t,currentTime:v,points:1,hasBeenDeleted:!1,selectedTagInputs:U,fileId:S.fileId,fileInput:null};const Q=S.type==="video"||(X=S.type)!=null&&X.startsWith("video")?`Input/Video/${S.fileName}`:`Input/Image/${S.fileName}`,_=`${n}_____${S.fileName}____File`;return s(`Created file reference for ${S.fileName}:`),s(`  - dataKey: ${Q}`),s(`  - fileId: ${_}`),s(`  - thumbnailDataKey: ${S.thumbnailDataKey||"undefined"}`),s(`  - size: ${S.size}`),s(`  - thumbnailSize: ${S.thumbnailSize||0}`),s(`  - duration: ${S.duration||"undefined"}`),s(`  - tags: ${k.length} tags selected for this photo`),{fileReferencesHolderId:t,currentTime:v,points:1,hasBeenDeleted:!1,selectedTagInputs:U,fileId:_,fileInput:{fileId:_,ownerFileInput:{editorContactIds:[b],FileSharingOptionsEnum:"Anyone",dataKey:Q,thumbnailDataKey:S.thumbnailDataKey,dataInBytes:S.size,thumbnailDataInBytes:S.thumbnailSize||0,s3UploadedAt:v,durationInSeconds:S.duration},editorFileInput:{aboutContactIds:[b],captionText:"",numericFilterInputs:[]}}}})),ee=d=>{const v=[];return M.forEach(b=>{const S=l.get(b)||[];if(S.length>0){const E=te[b];if(E){const k=E.dataKey.split("/"),U=k[k.length-1],Q=`${n}_____${U}____File`,_=ae(S);s(`Creating file reference for existing file ${b} (${U}) with ${S.length} tags`),v.push({fileReferencesHolderId:t,currentTime:d,points:1,hasBeenDeleted:!1,selectedTagInputs:_,fileId:Q,fileInput:null})}}}),s(`Created ${v.length} file references for existing files with tags`),v},B=async d=>{var E,k;s("Sending folder-only mutation (no file references, no folder tags)");const v=await ge();if(!v)throw s("No token available for saving album, aborting"),new Error("Authentication token not available");const b=`
      mutation MyMutation($folderPositionInputs: [FolderPositionInput!]) {
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items {
            id
          }
        }
      }
    `,S={folderPositionInputs:[d]};s("GraphQL folder-only mutation variables:",S);try{s("Sending API request to save folder");const U=await fetch(Ie,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${v}`},body:JSON.stringify({query:b,variables:S})});s(`API response status: ${U.status}`);const Q=await U.text();s(`API response raw text: ${Q}`);const _=JSON.parse(Q);if(s("API response JSON:",_),_.errors)throw console.error("Folder save failed:",_.errors),s("Folder save failed with errors:",_.errors),new Error("Failed to save folder");return s("Folder saved successfully"),((k=(E=_.data)==null?void 0:E.changeFiles)==null?void 0:k.items)||[]}catch(U){throw console.error("Error in sendFolderOnlyMutation:",U),s(`Error in sendFolderOnlyMutation: ${U}`),U}},ne=async d=>{var E,k,U,Q,_;s(`Sending file references-only mutation with ${d.length} items (each with individual tags)`);const v=await ge();if(!v)throw s("No token available for saving file references, aborting"),new Error("Authentication token not available");const b=`
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
    `,S={updatedFileReferenceInputs:d};s("GraphQL file references-only mutation variables (first item):",d.length>0?d[0]:"No items");try{s("Sending API request to save file references with individual tags");const X=await fetch(Ie,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${v}`},body:JSON.stringify({query:b,variables:S})});s(`API response status: ${X.status}`);const se=await X.text();s(`API response raw text: ${se.substring(0,500)}...`);const ie=JSON.parse(se);if(s("API response JSON items count:",((U=(k=(E=ie.data)==null?void 0:E.changeFiles0)==null?void 0:k.items)==null?void 0:U.length)||0),ie.errors)throw console.error("File references save failed:",ie.errors),s("File references save failed with errors:",ie.errors),new Error("Failed to save file references");return s("File references chunk saved successfully with individual photo tags"),((_=(Q=ie.data)==null?void 0:Q.changeFiles0)==null?void 0:_.items)||[]}catch(X){throw console.error("Error in sendFileReferencesOnlyMutation:",X),s(`Error in sendFileReferencesOnlyMutation: ${X}`),X}},me=async(d,v)=>{var k,U,Q,_,X,se,ie,he,Se;s(`Sending final chunk with folder mutation (${d.length} file references, no folder tags)`);const b=await ge();if(!b)throw s("No token available for saving final chunk, aborting"),new Error("Authentication token not available");const S=`
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
    `,E={folderPositionInputs:[v],updatedFileReferenceInputs:d};s("GraphQL final mutation variables (folder + last chunk, no folder tags)");try{s("Sending API request for final save with folder (no folder tags)");const r=await fetch(Ie,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${b}`},body:JSON.stringify({query:S,variables:E})});s(`API response status: ${r.status}`);const C=await r.text();s(`API response raw text: ${C.substring(0,500)}...`);const z=JSON.parse(C);if(s("API response JSON:",{fileReferencesCount:((Q=(U=(k=z.data)==null?void 0:k.changeFiles0)==null?void 0:U.items)==null?void 0:Q.length)||0,folderItems:((X=(_=z.data)==null?void 0:_.changeFiles)==null?void 0:X.items)||[]}),z.errors)throw console.error("Final save failed:",z.errors),s("Final save failed with errors:",z.errors),new Error("Failed to complete album save");return s("Final chunk and folder saved successfully (with individual photo tags)"),{fileReferences:((ie=(se=z.data)==null?void 0:se.changeFiles0)==null?void 0:ie.items)||[],folderPositions:((Se=(he=z.data)==null?void 0:he.changeFiles)==null?void 0:Se.items)||[]}}catch(r){throw console.error("Error in sendFinalChunkWithFolderMutation:",r),s(`Error in sendFinalChunkWithFolderMutation: ${r}`),r}},ye=async()=>(s("Validating required data"),await ge()?n?t?(s("All required data validated successfully"),!0):(s("No folder ID, validation failed"),!1):(s("No Cognito username, validation failed"),!1):(s("No token available, validation failed"),!1)),be=()=>{s("Handling successful save"),Nt(le,pe,[fe.SELECTED_PHOTOS,fe.SUB_ALBUM_DATA],s),s("Album data cleared");const d=document.getElementById("saveProgressText");d&&(d.innerText="Album saved successfully!",s("Updated progress text to 'Album saved successfully!'")),sessionStorage.setItem("album_just_saved","true"),s("Set 'album_just_saved' flag in sessionStorage"),s("Setting timeout for redirect to my-albums.html"),setTimeout(()=>{s("Redirecting to my-albums.html"),zt("my-albums.html")},1e3)},xe=async(d,v)=>{s("Starting chunked save process (individual photo tags, no folder tags, including existing files with tags)");try{re("Processing files in chunks...");const b=48;if(v.length===0)s("No file references to process, saving only folder position (no folder tags)"),await B(d);else{const S=j(v);s(`After removing duplicates, processing ${S.length} unique file references`);const E=w(S,b);s(`Split file references into ${E.length} chunks of max size ${b}`);for(let k=0;k<E.length;k++){const U=E[k];s(`Processing chunk ${k+1} of ${E.length} with ${U.length} file references`);const Q=k/E.length*80;oe(10+Q),h(10+Q),k<E.length-1?(re(`Saving files: chunk ${k+1} of ${E.length}...`),await ne(U)):(re("Finalizing album..."),await me(U,d))}}oe(100),h(100),re("Album saved successfully!"),be()}catch(b){console.error("Error in chunked save process:",b),s(`Error in chunked save process: ${b}`),re(`Error: ${b}`),V(!1)}};return{saveAlbumDirectly:async()=>{s("Starting direct album save with individual photo tagging and existing file tagging"),s(`Photo tags map: ${q.size} photos have tags applied`),s(`Existing file tags map: ${l.size} existing files have tags applied`),V(!0),oe(5);try{if(s("Validating required data for save"),!await ye()){s("Required data validation failed, aborting save"),V(!1);return}const d=Math.floor(Date.now()/1e3),v=`${n}_____${n}____Account`,S=t.split("_____")[1].split("____")[0];s(`Save timestamp: ${d}`),s(`Account ID: ${v}`),s(`Folder ID: ${t}`),s(`Folder target item identifier: ${S}`),s("Creating folder position input (no folder tags)");const E=A(d,v,S);s("Folder position input created:",E);let k=[];const U=a.filter(_=>_.status==="complete");if(s(`Found ${U.length} valid photos with 'complete' status`),U.length>0){const _=U.filter(se=>!se.fileId);s(`Found ${_.length} new uploads to move from temp to public folder`),_.length>0&&(s("Moving files from temp to public folder"),await Ft(_,h,s)),s("Creating file reference inputs for uploads with individual photo tags");const X=L(U,d,v);s(`Created ${X.length} file reference inputs for uploads`,X),k=k.concat(X)}const Q=ee(d);if(Q.length>0&&(s(`Adding ${Q.length} existing file references with tags`),k=k.concat(Q)),P&&x.length>0){s(`Adding ${x.length} existing file references for sub-album`);const _=x.map(X=>(s(`Creating file reference for existing sub-album file ID: ${X}`),{fileReferencesHolderId:t,currentTime:d,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:X,fileInput:null}));s(`Created ${_.length} file reference inputs for sub-album files`,_),k=k.concat(_)}s(`Total file reference inputs: ${k.length}`),s("Sending GraphQL mutations with chunked file references (individual photo tags and existing file tags)"),await xe(E,k)}catch(d){console.error("Error in saveAlbumDirectly:",d),s(`Error in saveAlbumDirectly: ${d}`),V(!1)}}}},_s=({selectedPhotos:t,selectedPhotoIndices:n,isSavingAlbum:a,onRemovePhoto:P,onTogglePhotoSelection:x,onSelectAllPhotos:K,onDeselectAllPhotos:o,hideHeader:p=!1})=>{const{t:g}=Ne();if(t.length===0)return null;const I=n.size>0,G=n.size===t.length;return e.jsxs(e.Fragment,{children:[!p&&t.length>1&&e.jsx(_e,{style:{marginBottom:"16px",border:"2px solid #007bff"},children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px"},children:[e.jsx("span",{style:{fontWeight:"bold",fontSize:"14px",color:"#007bff"},children:I?g("{{count}} file(s) selected for tagging",{count:n.size}):g("Click files below to select them for tagging")}),e.jsxs("div",{style:{display:"flex",gap:"8px",marginLeft:"auto"},children:[!G&&e.jsx("button",{onClick:K,disabled:a,style:{padding:"6px 12px",border:"1px solid #007bff",borderRadius:"4px",background:"#007bff",color:"white",fontSize:"12px",cursor:"pointer",fontWeight:"bold"},children:g("Select All")}),I&&e.jsx("button",{onClick:o,disabled:a,style:{padding:"6px 12px",border:"1px solid #6c757d",borderRadius:"4px",background:"transparent",color:"#6c757d",fontSize:"12px",cursor:"pointer"},children:g("Deselect All")})]})]})}),e.jsx(Gt,{children:t.map((F,q)=>{var te,M;const l=n.has(q);return e.jsxs(Ht,{"data-selected":l?"true":"false",style:{position:"relative",cursor:t.length>1?"pointer":"default"},onClick:()=>t.length>1&&x(q),children:[l&&!a&&e.jsx("button",{onClick:V=>{V.stopPropagation(),confirm(g("Are you sure you want to remove this photo?"))&&P(q)},style:{position:"absolute",top:"6px",right:"6px",width:"18px",height:"18px",borderRadius:"50%",border:"none",backgroundColor:"rgba(220, 53, 69, 0.8)",color:"white",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:"bold",zIndex:15,opacity:1,transition:"all 0.2s ease",transform:"scale(0.8)"},onMouseEnter:V=>{V.currentTarget.style.backgroundColor="rgba(200, 35, 51, 0.9)",V.currentTarget.style.transform="scale(1)",V.currentTarget.style.opacity="1"},onMouseLeave:V=>{V.currentTarget.style.backgroundColor="rgba(220, 53, 69, 0.8)",V.currentTarget.style.transform="scale(0.8)",V.currentTarget.style.opacity="0"},title:g("Remove photo"),children:"×"}),t.length>1&&l&&e.jsx("div",{style:{position:"absolute",bottom:"8px",left:"8px",right:"8px",background:"rgba(0, 123, 255, 0.9)",color:"white",padding:"4px 8px",borderRadius:"6px",fontSize:"11px",fontWeight:"600",textAlign:"center",zIndex:10,backdropFilter:"blur(4px)"},children:"SELECTED"}),F.status!=="complete"&&e.jsx(qt,{$status:F.status,children:F.status==="error"?"✕":F.status==="uploading"?"↑":F.status==="processing"?"⚙️":"•"}),e.jsxs(Jt,{style:{opacity:t.length===1||!l?1:.85,transition:"opacity 0.2s ease"},children:[F.type==="video"||(te=F.type)!=null&&te.startsWith("video")?e.jsx(Qt,{src:F.s3PreviewUrl,controls:!0}):e.jsx(Vt,{src:F.s3PreviewUrl,alt:F.fileName}),(F.status==="uploading"||F.status==="processing")&&e.jsx(Ve,{$bottom:"4px",$left:"4px",$right:"4px",$height:"4px",children:e.jsx(Ye,{$progress:F.progress,$status:F.status})})]}),e.jsxs(Yt,{children:[(M=F.type)!=null&&M.startsWith("video")?g("Video"):g("Image"),F.size&&` • ${(F.size/1024/1024).toFixed(1)} MB`,F.duration&&` • ${F.duration}s`]}),F.status==="error"&&F.errorMessage&&e.jsxs(Xt,{$type:"error",children:[g("Error"),": ",F.errorMessage.length>40?F.errorMessage.substring(0,37)+"...":F.errorMessage]})]},q)})}),e.jsx("style",{children:`
          [data-selected="true"]:hover button {
            opacity: 1 !important;
            transform: scale(1) !important;
          }
        `})]})},Ns=({isSavingAlbum:t,savingProgress:n})=>{const{t:a}=Ne();return t?e.jsxs(_e,{children:[e.jsx(Wt,{children:a("Saving Album")}),e.jsx(Kt,{id:"saveProgressText",children:a("Moving files...")}),e.jsx(Ve,{children:e.jsx(Ye,{id:"saveProgress",$progress:n/100})})]}):null},zs=({showFolderDetails:t,isCreator:n,folderName:a,setFolderName:P,folderDescription:x,setFolderDescription:K,isSavingAlbum:o})=>{const{t:p}=Ne();return!t||n!==!0?null:e.jsxs(_e,{children:[e.jsxs(Ue,{children:[e.jsx(We,{htmlFor:"folderName",children:p("Album Name")}),e.jsx(Mt,{id:"folderName",type:"text",value:a,onChange:g=>P(g.target.value),placeholder:p("e.g. Family Vacation in Kyoto"),disabled:o})]}),e.jsxs(Ue,{children:[e.jsx(We,{htmlFor:"folderDescription",children:p("Album Description")}),e.jsx(Ut,{id:"folderDescription",value:x,onChange:g=>K(g.target.value),placeholder:p("e.g. what's special about this album"),rows:4,disabled:o})]})]})},Ne=()=>({t:(t,n)=>n&&typeof n=="object"&&"count"in n?t.replace("{{count}}",String(n.count)):t,language:"en"}),Rs=`
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
`,Os=`
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
`,Bs=`
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
`,Ms=`
  mutation DeleteTag($tagId: String!) {
    deleteTag(tagId: $tagId) {
      id
      hasBeenDeleted
    }
  }
`,Us=`
  mutation DeleteSubtag($subtagId: String!) {
    deleteSubtag(subtagId: $subtagId) {
      id
      hasBeenDeleted
    }
  }
`,Ws=(t,n,a,P,x,K,o)=>{const[p,g]=u.useState([]),[I,G]=u.useState(null),[F,q]=u.useState(!1),[l,te]=u.useState(null),[M,V]=u.useState(null),[oe,le]=u.useState(!1),[pe,s]=u.useState(!1),[ae,re]=u.useState(""),[h,w]=u.useState(""),[j,A]=u.useState(!1),[L,ee]=u.useState(!1),B=u.useMemo(()=>({photoIndices:Array.from(x),existingIndices:Array.from(K)}),[x,K]),ne=u.useCallback(r=>{const{photoIndices:C,existingIndices:z}=B;if(C.length===0&&z.length===0)return!1;const Z=C.length===0||C.every(c=>(t.get(c)||[]).some(W=>W.tagTitle===r.tagTitle)),T=z.length===0||z.every(c=>(a.get(c)||[]).some(W=>W.tagTitle===r.tagTitle));return Z&&T},[B,t,a]),me=u.useCallback(r=>{const{photoIndices:C,existingIndices:z}=B;let Z=0,T=0;C.forEach(D=>{const ce=(t.get(D)||[]).find(we=>we.tagTitle===r.tagTitle);ce&&(Z++,ce.subtags.some(we=>we.subtagTitle===r.subtagTitle)&&T++)});let y=0,c=0;z.forEach(D=>{const ce=(a.get(D)||[]).find(we=>we.tagTitle===r.tagTitle);ce&&(y++,ce.subtags.some(we=>we.subtagTitle===r.subtagTitle)&&c++)});const O=Z+y,W=T+c;return O>0&&W===O},[B,t,a]),ye=u.useCallback(r=>{const{photoIndices:C,existingIndices:z}=B;if(C.length===0&&z.length===0){o("No files selected for tag application");return}const Z=ne(r);o(`${Z?"Removing":"Applying"} tag "${r.tagTitle}" ${Z?"from":"to"} all selected files`),C.length>0&&n(T=>{const y=new Map(T);return C.forEach(c=>{const O=y.get(c)||[];if(Z){const W=O.filter(D=>D.tagTitle!==r.tagTitle);y.set(c,W),o(`Removed tag "${r.tagTitle}" from photo ${c}`)}else if(!O.some(D=>D.tagTitle===r.tagTitle)){const D={tagTitle:r.tagTitle,TagType:r.TagType,subtags:[]};y.set(c,[...O,D]),o(`Added tag "${r.tagTitle}" to photo ${c}`)}}),y}),z.length>0&&P(T=>{const y=new Map(T);return z.forEach(c=>{const O=y.get(c)||[];if(Z){const W=O.filter(D=>D.tagTitle!==r.tagTitle);y.set(c,W),o(`Removed tag "${r.tagTitle}" from existing file ${c}`)}else if(!O.some(D=>D.tagTitle===r.tagTitle)){const D={tagTitle:r.tagTitle,TagType:r.TagType,subtags:[]};y.set(c,[...O,D]),o(`Added tag "${r.tagTitle}" to existing file ${c}`)}}),y})},[B,ne,n,P,o]),be=u.useCallback(r=>{const{photoIndices:C,existingIndices:z}=B;if(C.length===0&&z.length===0){o("No files selected for subtag application");return}const Z=me(r);o(`${Z?"Removing":"Applying"} subtag "${r.subtagTitle}" ${Z?"from":"to"} all selected files with parent tag`),C.length>0&&n(T=>{const y=new Map(T);return C.forEach(c=>{const W=(y.get(c)||[]).map(D=>{if(D.tagTitle===r.tagTitle){if(Z)return{...D,subtags:D.subtags.filter(H=>H.subtagTitle!==r.subtagTitle)};if(!D.subtags.some(ce=>ce.subtagTitle===r.subtagTitle))return{...D,subtags:[...D.subtags,{tagTitle:r.tagTitle,subtagTitle:r.subtagTitle}]}}return D});y.set(c,W)}),y}),z.length>0&&P(T=>{const y=new Map(T);return z.forEach(c=>{const W=(y.get(c)||[]).map(D=>{if(D.tagTitle===r.tagTitle){if(Z)return{...D,subtags:D.subtags.filter(H=>H.subtagTitle!==r.subtagTitle)};if(!D.subtags.some(ce=>ce.subtagTitle===r.subtagTitle))return{...D,subtags:[...D.subtags,{tagTitle:r.tagTitle,subtagTitle:r.subtagTitle}]}}return D});y.set(c,W)}),y})},[B,me,n,P,o]),xe=u.useCallback(()=>{const{photoIndices:r,existingIndices:C}=B,z=[];r.forEach(T=>{const y=t.get(T)||[];z.push(...y)}),C.forEach(T=>{const y=a.get(T)||[];z.push(...y)});const Z=new Map;return z.forEach(T=>{Z.set(T.tagTitle,T)}),Array.from(Z.values())},[B,t,a]),Ae=u.useCallback(()=>x.size>0||K.size>0,[x.size,K.size]),d=async()=>{var r,C;o("Fetching tags from API"),q(!0);try{const z=await ge();if(!z){o("No token available for fetching tags");return}const T=await(await fetch(Ie,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${z}`},body:JSON.stringify({query:Rs,variables:{fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(o("Tags API response:",T),T.errors){console.error("GraphQL errors:",T.errors),o(`GraphQL errors: ${JSON.stringify(T.errors)}`);return}const c=(((C=(r=T==null?void 0:T.data)==null?void 0:r.fetchRelations)==null?void 0:C.items)||[]).map(O=>{var W,D;return{id:O.id,tagTitle:O.tagTitle,TagType:O.TagType,points:O.points,createdAt:O.createdAt,updatedAt:O.updatedAt,subtags:((D=(W=O.subtags)==null?void 0:W.items)==null?void 0:D.map(H=>({id:H.id,tagTitle:H.tagTitle,subtagTitle:H.subtagTitle,TagType:H.TagType,points:H.points,createdAt:H.createdAt,updatedAt:H.updatedAt})))||[]}});o(`Fetched ${c.length} tags`),g(c)}catch(z){console.error("Error fetching tags:",z),o(`Error fetching tags: ${z}`)}finally{q(!1)}},v=u.useCallback(r=>{o(`Setting displayed tag: ${r}`),G(r)},[o]),b=u.useCallback(()=>{if(!I)return[];const r=p.find(C=>C.id===I);return(r==null?void 0:r.subtags)||[]},[I,p]),S=()=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(r){const C=Math.random()*16|0;return(r=="x"?C:C&3|8).toString(16)}),E=async(r,C)=>{if(o(`Adding new tag: ${r} of type: ${C}`),!r.trim())return o("Cannot add tag with empty title"),!1;A(!0);try{if(!await ge())return o("No token available for adding tag"),!1;if(await(async()=>(o("PLACEHOLDER: Would send GraphQL mutation to add tag",{mutation:Os,variables:{tagInput:{tagTitle:r.trim(),TagType:C,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(y=>setTimeout(y,500)),!0))()){const y={id:S(),tagTitle:r.trim(),TagType:C,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3),subtags:[]};return g(c=>[y,...c]),ye(y),v(y.id),re(""),le(!1),o(`Successfully added and applied new tag: ${r}`),!0}return!1}catch(z){return console.error("Error adding new tag:",z),o(`Error adding new tag: ${z}`),!1}finally{A(!1)}},k=async(r,C,z)=>{if(o(`Adding new subtag: ${C} to tag: ${r}`),!C.trim())return o("Cannot add subtag with empty title"),!1;if(!I)return o("No displayed tag for adding subtag"),!1;ee(!0);try{if(!await ge())return o("No token available for adding subtag"),!1;if(await(async()=>(o("PLACEHOLDER: Would send GraphQL mutation to add subtag",{mutation:Bs,variables:{subtagInput:{tagTitle:r,subtagTitle:C.trim(),TagType:z,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(c=>setTimeout(c,500)),!0))()){const c={id:S(),tagTitle:r,subtagTitle:C.trim(),TagType:z,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3)};return g(O=>O.map(W=>W.id===I?{...W,subtags:[c,...W.subtags||[]]}:W)),be(c),w(""),s(!1),o(`Successfully added and applied new subtag: ${C}`),!0}return!1}catch(Z){return console.error("Error adding new subtag:",Z),o(`Error adding new subtag: ${Z}`),!1}finally{ee(!1)}},U=async r=>{o(`Deleting tag: ${r}`),te(r);try{if(!await ge())return o("No token available for deleting tag"),!1;if(await(async()=>(o("PLACEHOLDER: Would send GraphQL mutation to delete tag",{mutation:Ms,variables:{tagId:r}}),await new Promise(T=>setTimeout(T,500)),!0))()){const T=p.find(y=>y.id===r);return g(y=>y.filter(c=>c.id!==r)),T&&(n(y=>{const c=new Map(y);return y.forEach((O,W)=>{const D=O.filter(H=>H.tagTitle!==T.tagTitle);c.set(W,D)}),c}),P(y=>{const c=new Map(y);return y.forEach((O,W)=>{const D=O.filter(H=>H.tagTitle!==T.tagTitle);c.set(W,D)}),c})),I===r&&v(null),o(`Successfully deleted tag: ${r}`),!0}return!1}catch(C){return console.error("Error deleting tag:",C),o(`Error deleting tag: ${C}`),!1}finally{te(null)}},Q=async r=>{o(`Deleting subtag: ${r}`),V(r);try{if(!await ge())return o("No token available for deleting subtag"),!1;if(await(async()=>(o("PLACEHOLDER: Would send GraphQL mutation to delete subtag",{mutation:Us,variables:{subtagId:r}}),await new Promise(T=>setTimeout(T,500)),!0))()){let T=null;return g(y=>y.map(c=>{var W;const O=((W=c.subtags)==null?void 0:W.filter(D=>D.id===r?(T=D,!1):!0))||[];return{...c,subtags:O}})),T&&(n(y=>{const c=new Map(y);return y.forEach((O,W)=>{const D=O.map(H=>H.tagTitle===T.tagTitle?{...H,subtags:H.subtags.filter(ce=>ce.subtagTitle!==T.subtagTitle)}:H);c.set(W,D)}),c}),P(y=>{const c=new Map(y);return y.forEach((O,W)=>{const D=O.map(H=>H.tagTitle===T.tagTitle?{...H,subtags:H.subtags.filter(ce=>ce.subtagTitle!==T.subtagTitle)}:H);c.set(W,D)}),c})),o(`Successfully deleted subtag: ${r}`),!0}return!1}catch(C){return console.error("Error deleting subtag:",C),o(`Error deleting subtag: ${C}`),!1}finally{V(null)}},_=()=>{le(!0),re("")},X=()=>{le(!1),re("")},se=()=>{s(!0),w("")},ie=()=>{s(!1),w("")},he=async()=>ae.trim()?await E(ae,"File"):!1,Se=async()=>{if(h.trim()&&I){const r=p.find(C=>C.id===I);if(r)return await k(r.tagTitle,h,r.TagType)}return!1};return u.useEffect(()=>{d()},[]),u.useEffect(()=>{o(`Selection changed - Photos: ${x.size}, Existing: ${K.size}`)},[x.size,K.size,o]),{tags:p,displayedTagId:I,isLoadingTags:F,tagIdBeingDeleted:l,subtagIdBeingDeleted:M,isAddingNewTag:oe,isAddingNewSubtag:pe,newTagTitle:ae,newSubtagTitle:h,isSubmittingNewTag:j,isSubmittingNewSubtag:L,fetchTags:d,toggleTagOnSelectedFiles:ye,toggleSubtagOnSelectedFiles:be,setDisplayedTag:v,isTagAppliedToSelected:ne,isSubtagAppliedToSelected:me,getDisplayedTagSubtags:b,getAppliedTagsForSelected:xe,hasSelectedFiles:Ae,addNewTag:E,addNewSubtag:k,deleteTag:U,deleteSubtag:Q,startAddingNewTag:_,cancelAddingNewTag:X,startAddingNewSubtag:se,cancelAddingNewSubtag:ie,submitNewTag:he,submitNewSubtag:Se,setNewTagTitle:re,setNewSubtagTitle:w}},Ks=J.div`
  margin: 32px 0;
`,Xe=J.div`
  margin-bottom: 24px;
`,Ze=J.h3`
  margin: 0 0 16px 0;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  display: flex;
  align-items: center;
  gap: 12px;
`,Le=J.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  min-height: 32px;
`,et=J.button`
  position: relative;
  padding: 8px 16px;
  border: 2px solid ${t=>t.$isDisplayed?"#28a745":t.$isApplied?"#333333":"#dee2e6"};
  border-radius: 20px;
  background: ${t=>t.$isDisplayed?"#28a745":t.$isApplied?"#333333":"#ffffff"};
  color: ${t=>t.$isDisplayed||t.$isApplied?"#ffffff":"#6c757d"};
  font-size: 13px;
  font-weight: ${t=>t.$isApplied||t.$isDisplayed?"600":"500"};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${t=>t.$isDisplayed?"0 0 0 3px rgba(40, 167, 69, 0.3), 0 4px 12px rgba(40, 167, 69, 0.15)":t.$isApplied?"0 0 0 2px rgba(51, 51, 51, 0.2), 0 4px 12px rgba(51, 51, 51, 0.15)":"0 2px 8px rgba(0, 0, 0, 0.04)"};

  ${t=>t.$isBeingDeleted&&`
    opacity: 0.5;
    pointer-events: none;
  `}

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${t=>t.$isDisplayed?"0 0 0 4px rgba(40, 167, 69, 0.4), 0 6px 16px rgba(40, 167, 69, 0.2)":t.$isApplied?"0 0 0 3px rgba(51, 51, 51, 0.3), 0 6px 16px rgba(51, 51, 51, 0.2)":"0 4px 12px rgba(0, 0, 0, 0.1)"};
    
    background: ${t=>t.$isDisplayed?"#1e7e34":t.$isApplied?"#1a1a1a":"#f8f9fa"};
    
    border-color: ${t=>t.$isDisplayed?"#1e7e34":t.$isApplied?"#1a1a1a":"#007bff"};
    
    color: ${t=>t.$isDisplayed||t.$isApplied?"#ffffff":"#007bff"};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`,Gs=J(et)`
  font-size: 12px;
  padding: 6px 12px;
  border-radius: 16px;
`,tt=J.button`
  position: absolute;
  top: -6px;
  right: -6px;
  width: 18px;
  height: 18px;
  border: none;
  border-radius: 50%;
  background: rgba(220, 53, 69, 0.9);
  color: white;
  font-size: 11px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);

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
`,Hs=J.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 16px;
`,st=J.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 16px;
`,rt=J.button`
  padding: 8px 16px;
  border: 1px solid #6c757d;
  border-radius: 16px;
  background: transparent;
  color: #6c757d;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  &:hover {
    background: #6c757d;
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`,qs=J.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 1px solid #007bff;
  border-radius: 16px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.1);
  transition: all 0.2s ease;
  
  &:focus-within {
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.3), 0 4px 12px rgba(0, 123, 255, 0.15);
  }
`,Js=J.input`
  border: none;
  outline: none;
  font-size: 12px;
  background: transparent;
  min-width: 100px;
  max-width: 200px;

  &::placeholder {
    color: #999;
    opacity: 0.7;
  }
`,Je=J.button`
  border: none;
  background: transparent;
  color: #007bff;
  font-size: 11px;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: #007bff;
    color: white;
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`,Qs=$e.memo(({tag:t,isApplied:n,isDisplayed:a,isBeingDeleted:P,disabled:x,onTagClick:K,onDeleteTag:o,getTagDisplayText:p})=>{const[g,I]=u.useState(!1);return e.jsxs(et,{$isApplied:n,$isDisplayed:a,$isBeingDeleted:P,disabled:x,onClick:()=>K(t),onMouseEnter:()=>I(!0),onMouseLeave:()=>I(!1),children:[e.jsx("span",{children:p(t)}),g&&!x&&!P&&e.jsx(tt,{onClick:G=>{G.stopPropagation(),o(t.id)},disabled:P,children:"×"})]})}),Vs=$e.memo(({subtag:t,isApplied:n,isBeingDeleted:a,disabled:P,onSubtagClick:x,onDeleteSubtag:K})=>{const[o,p]=u.useState(!1);return e.jsxs(Gs,{$isApplied:n,$isBeingDeleted:a,disabled:P,onClick:()=>x(t),onMouseEnter:()=>p(!0),onMouseLeave:()=>p(!1),children:[t.subtagTitle,o&&!P&&!a&&e.jsx(tt,{onClick:g=>{g.stopPropagation(),K(t.id)},disabled:a,children:"×"})]})}),it=({value:t,onChange:n,onSubmit:a,onCancel:P,isSubmitting:x,placeholder:K="Enter tag name..."})=>{const o=u.useRef(null);u.useEffect(()=>{o.current&&o.current.focus()},[]);const p=g=>{g.key==="Enter"?a():g.key==="Escape"&&P()};return e.jsxs(qs,{children:[e.jsx(Js,{ref:o,type:"text",value:t,onChange:g=>n(g.target.value),onKeyDown:p,placeholder:K,disabled:x}),e.jsx(Je,{onClick:a,disabled:!t.trim()||x,title:"Add (Enter)",children:x?"...":"✓"}),e.jsx(Je,{onClick:P,disabled:x,title:"Cancel (Escape)",children:"×"})]})},Ys=$e.memo(({tagsManager:t,disabled:n=!1,enhancedLog:a})=>{const{tags:P,displayedTagId:x,isLoadingTags:K,tagIdBeingDeleted:o,isAddingNewTag:p,newTagTitle:g,isSubmittingNewTag:I,toggleTagOnSelectedFiles:G,setDisplayedTag:F,isTagAppliedToSelected:q,deleteTag:l,startAddingNewTag:te,cancelAddingNewTag:M,submitNewTag:V,setNewTagTitle:oe,getAppliedTagsForSelected:le,hasSelectedFiles:pe}=t;if(!pe())return null;const s=j=>{if(n)return;const A=q(j);a(`Tag "${j.tagTitle}" clicked - current state: ${A?"applied to all":"not applied to all"}`),G(j),j.subtags&&j.subtags.length>0&&F(A?null:j.id),a(`After toggle - new state: ${A?"removed from all":"applied to all"}`)},ae=async j=>{if(n)return;a(`Delete tag initiated: ${j}`);const A=await l(j);a(A?`Tag successfully deleted: ${j}`:`Failed to delete tag: ${j}`)},re=async()=>{await V()||a("Failed to submit new tag")},h=j=>{const L=le().find(B=>B.tagTitle===j.tagTitle);if(!L||L.subtags.length===0)return j.tagTitle;const ee=L.subtags.map(B=>B.subtagTitle).join(" || ");return`${j.tagTitle}  |  ${ee}`},w=$e.useMemo(()=>[...P].sort((j,A)=>j.points!==A.points?A.points-j.points:A.updatedAt-j.updatedAt),[P]);return e.jsxs(Ks,{children:[e.jsxs(Xe,{children:[e.jsx(Ze,{children:"Apply tags to selected files"}),e.jsx(Le,{children:K?e.jsx(Hs,{children:"Loading tags..."}):e.jsxs(e.Fragment,{children:[w.map(j=>{const A=q(j);return e.jsx(Qs,{tag:j,isApplied:A,isDisplayed:x===j.id,isBeingDeleted:o===j.id,disabled:n,onTagClick:s,onDeleteTag:ae,getTagDisplayText:h},j.id)}),p?e.jsx(it,{value:g,onChange:oe,onSubmit:re,onCancel:M,isSubmitting:I,placeholder:"Enter tag name..."}):e.jsx(rt,{disabled:n,onClick:te,children:"+ Add Tag"}),w.length===0&&!p&&e.jsx(st,{children:"No tags available"})]})})]}),x&&e.jsx(Xs,{tagsManager:t,disabled:n,enhancedLog:a}),e.jsxs("div",{style:{marginTop:"24px",padding:"20px 24px",background:"linear-gradient(135deg, #e7f3ff 0%, #f0f8ff 100%)",borderRadius:"12px",fontSize:"13px",color:"#0c5aa6",border:"1px solid #b3d9ff",boxShadow:"0 4px 12px rgba(0, 123, 255, 0.08)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"12px"},children:[e.jsx("span",{style:{fontSize:"16px"},children:"🏷️"}),e.jsx("strong",{style:{fontSize:"14px"},children:"Tag States:"})]}),e.jsxs("div",{style:{lineHeight:"1.5"},children:[e.jsx("strong",{children:"Click any tag once to apply/remove it from ALL selected files"}),e.jsx("br",{}),"• ",e.jsx("strong",{style:{color:"#333333"},children:"⚫ Black tags:"})," Applied to selected files",e.jsx("br",{}),"• ",e.jsx("strong",{style:{color:"#28a745"},children:"🟢 Green tags:"})," Most recently clicked tag (showing subtags)",e.jsx("br",{}),"• ",e.jsx("strong",{style:{color:"#6c757d"},children:"⚪ Gray tags:"})," Available but not applied",e.jsx("br",{})]})]})]})}),Xs=$e.memo(({tagsManager:t,disabled:n=!1,enhancedLog:a})=>{var re;const{displayedTagId:P,subtagIdBeingDeleted:x,isAddingNewSubtag:K,newSubtagTitle:o,isSubmittingNewSubtag:p,toggleSubtagOnSelectedFiles:g,isSubtagAppliedToSelected:I,deleteSubtag:G,startAddingNewSubtag:F,cancelAddingNewSubtag:q,submitNewSubtag:l,setNewSubtagTitle:te,tags:M}=t,V=P?((re=M.find(h=>h.id===P))==null?void 0:re.subtags)||[]:[],oe=M.find(h=>h.id===P),le=h=>{n||(a(`Subtag "${h.subtagTitle}" clicked - current state: ${I(h)?"applied to all":"not applied to all"}`),g(h))},pe=async h=>{if(n)return;a(`Delete subtag initiated: ${h}`);const w=await G(h);a(w?`Subtag successfully deleted: ${h}`:`Failed to delete subtag: ${h}`)},s=async()=>{await l()||a("Failed to submit new subtag")};if(!oe)return null;const ae=$e.useMemo(()=>[...V].sort((h,w)=>h.points!==w.points?w.points-h.points:w.updatedAt-h.updatedAt),[V]);return e.jsxs(Xe,{children:[e.jsxs(Ze,{children:['Subtags for "',oe.tagTitle,'"']}),e.jsxs(Le,{children:[ae.map(h=>e.jsx(Vs,{subtag:h,isApplied:I(h),isBeingDeleted:x===h.id,disabled:n,onSubtagClick:le,onDeleteSubtag:pe},h.id)),K?e.jsx(it,{value:o,onChange:te,onSubmit:s,onCancel:q,isSubmitting:p,placeholder:"Enter subtag name..."}):e.jsx(rt,{disabled:n,onClick:F,children:"+ Add Subtag"}),ae.length===0&&!K&&e.jsx(st,{children:"No subtags available"})]})]})}),Zs=({children:t,t:n,isRTL:a})=>e.jsxs("div",{style:{padding:"32px",marginBottom:"32px",backgroundColor:"#f8f9fa",border:"2px solid #e9ecef",borderRadius:"12px",direction:a?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",fontSize:"18px",color:"#495057",fontWeight:"600",marginBottom:"24px",flexDirection:a?"row-reverse":"row"},children:[e.jsx("span",{style:{marginRight:a?"0":"12px",marginLeft:a?"12px":"0",fontSize:"20px"},children:"🏷️"}),n("Click files below to select them for tagging")]}),t]}),Ls=({selectedPhotos:t,selectedPhotoIndices:n,onToggleSelection:a,onSelectAll:P,onDeselectAll:x,onRemovePhoto:K,onDeleteAll:o,disabled:p,t:g,isRTL:I})=>t.length===0?null:e.jsxs("div",{style:{marginBottom:"32px",direction:I?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px",flexDirection:I?"row-reverse":"row"},children:[e.jsxs("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:[g("New Files")," (",t.length,")"]}),e.jsxs("div",{style:{display:"flex",gap:"8px",flexDirection:I?"row-reverse":"row"},children:[e.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:p?"#f8f9fa":"#fff",color:p?"#999":"#333",cursor:p?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:n.size===t.length?x:P,disabled:p,onMouseEnter:G=>{p||(G.currentTarget.style.backgroundColor="#f8f9fa")},onMouseLeave:G=>{p||(G.currentTarget.style.backgroundColor="#fff")},children:n.size===t.length?g("Deselect All"):g("Select All")}),e.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #dc3545",borderRadius:"4px",backgroundColor:p?"#f8f9fa":"#fff",color:p?"#999":"#dc3545",cursor:p?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:o,disabled:p,onMouseEnter:G=>{p||(G.currentTarget.style.backgroundColor="#dc3545",G.currentTarget.style.color="#fff")},onMouseLeave:G=>{p||(G.currentTarget.style.backgroundColor="#fff",G.currentTarget.style.color="#dc3545")},children:g("Delete All")})]})]}),e.jsx(_s,{selectedPhotos:t,selectedPhotoIndices:n,isSavingAlbum:p,onRemovePhoto:K,onTogglePhotoSelection:a,onSelectAllPhotos:P,onDeselectAllPhotos:x,hideHeader:!0})]}),er=({existingFiles:t,selectedExistingIndices:n,onToggleSelection:a,onSelectAll:P,onDeselectAll:x,onDeleteFile:K,disabled:o,t:p,isRTL:g})=>t.length===0?null:e.jsxs("div",{style:{marginBottom:"32px",direction:g?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px",flexDirection:g?"row-reverse":"row"},children:[e.jsxs("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:[p("Existing Files")," (",t.length,")"]}),e.jsx("div",{style:{display:"flex",gap:"8px",flexDirection:g?"row-reverse":"row"},children:e.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:o?"#f8f9fa":"#fff",color:o?"#999":"#333",cursor:o?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:n.size===t.length?x:P,disabled:o,onMouseEnter:I=>{o||(I.currentTarget.style.backgroundColor="#f8f9fa")},onMouseLeave:I=>{o||(I.currentTarget.style.backgroundColor="#fff")},children:n.size===t.length?p("Deselect All"):p("Select All")})})]}),e.jsx("div",{style:{display:"flex",overflowX:"auto",gap:"16px",padding:"20px",border:"2px dashed #007bff",borderRadius:"12px",backgroundColor:"#fff",boxShadow:"0 2px 8px rgba(0, 0, 0, 0.04)",scrollbarWidth:"thin",scrollbarColor:"#007bff #f8f9fa"},children:t.map((I,G)=>{const F=n.has(G);return e.jsxs("div",{style:{position:"relative",width:"160px",height:"160px",flexShrink:0,borderRadius:"12px",overflow:"hidden",border:F?"2px solid rgba(0, 123, 255, 0.6)":"2px solid #ddd",cursor:o?"not-allowed":"pointer",opacity:o?.6:1,transition:"all 0.3s ease",boxShadow:F?"0 0 0 3px rgba(0, 123, 255, 0.3), 0 4px 12px rgba(0, 123, 255, 0.15)":"0 2px 8px rgba(0, 0, 0, 0.04)",transform:F?"translateY(-2px)":"translateY(0)"},onClick:()=>!o&&a(G),children:[e.jsx(ds,{thumbnailDataKey:I.thumbnailDataKey,dataKey:I.dataKey,alt:p("Existing file"),style:{width:"100%",height:"100%",objectFit:"cover"}}),F&&e.jsx("div",{style:{position:"absolute",bottom:"8px",left:"8px",right:"8px",background:"rgba(0, 123, 255, 0.9)",color:"white",padding:"4px 8px",borderRadius:"6px",fontSize:"11px",fontWeight:"600",textAlign:"center",zIndex:10,backdropFilter:"blur(4px)"},children:"SELECTED"}),F&&!o&&e.jsx("button",{onClick:q=>{q.stopPropagation(),confirm(p("Are you sure you want to remove this file?"))&&K(G)},style:{position:"absolute",top:"6px",right:"6px",width:"18px",height:"18px",borderRadius:"50%",border:"none",backgroundColor:"rgba(220, 53, 69, 0.8)",color:"white",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:"bold",zIndex:15,opacity:1,transition:"all 0.2s ease",transform:"scale(0.8)"},onMouseEnter:q=>{q.currentTarget.style.backgroundColor="rgba(200, 35, 51, 0.9)",q.currentTarget.style.transform="scale(1)",q.currentTarget.style.opacity="1"},onMouseLeave:q=>{q.currentTarget.style.backgroundColor="rgba(220, 53, 69, 0.8)",q.currentTarget.style.transform="scale(0.8)",q.currentTarget.style.opacity="0"},title:p("Remove file"),children:"×"}),I.dataInBytes>0&&e.jsxs("div",{style:{position:"absolute",bottom:"4px",left:"4px",backgroundColor:"rgba(0,0,0,0.7)",color:"white",fontSize:"10px",padding:"2px 4px",borderRadius:"4px"},children:[(I.dataInBytes/(1024*1024)).toFixed(1),"MB"]}),I.durationInSeconds&&e.jsxs("div",{style:{position:"absolute",top:"8px",left:"8px",backgroundColor:"rgba(0,0,0,0.7)",color:"white",fontSize:"10px",padding:"2px 4px",borderRadius:"4px"},children:[Math.floor(I.durationInSeconds/60),":",String(Math.floor(I.durationInSeconds%60)).padStart(2,"0")]})]},`existing-${G}-${I.dataKey}`)})})]}),tr=()=>{const{t,language:n}=Qe(),a=Ee(n)==="rtl",P=os(t),{setShowUsernamePrompt:x,setUsernameInput:K}=P,[o,p]=u.useState(null),[g,I]=u.useState(!1),[G,F]=u.useState(0),[q,l]=u.useState(""),[te,M]=u.useState(""),[V,oe]=u.useState(!1),[le,pe]=u.useState(!1),[s,ae]=u.useState("NoPassword"),[re,h]=u.useState(""),[w,j]=u.useState(!1),[A,L]=u.useState(!0),[ee,B]=u.useState(!1),[ne,me]=u.useState(null),[ye,be]=u.useState(!1),[xe,Ae]=u.useState([]),[d,v]=u.useState(!1),[b,S]=u.useState(!1),[E,k]=u.useState(new Set),[U,Q]=u.useState(new Map),[_,X]=u.useState([]),[se,ie]=u.useState(new Set),[he,Se]=u.useState(new Map),[r,C]=u.useState(!1),z=i=>{!o&&i&&p(i)},{fileInputRef:Z,selectedPhotos:T,setSelectedPhotos:y,isUploading:c,progressTracker:O,setProgressTracker:W,debugMessages:D,currentFolderId:H,openFilePicker:ce,handleFileSelection:we,setOnSaveAlbumPage:je,log:ke}=ns(z,!0);u.useEffect(()=>(je(!0),m("🏠 Set isOnSaveAlbumPage to true - navigation disabled"),()=>{je(!1),m("🏠 Set isOnSaveAlbumPage to false - navigation enabled")}),[je]),u.useEffect(()=>{(async()=>{try{await Bt(),ke("🔥 Save-album page S3 credentials prewarmed successfully")}catch($){ke(`⚠️ Save-album page credential prewarming failed: ${String($)}`)}})()},[]);const m=(i,$)=>{let R=`[${new Date().toISOString()}] ${i}`;if($!==void 0)try{const Y=typeof $=="object"?JSON.stringify($,null,2):String($);R+=`
Data: ${Y}`,console.log(R),console.log("Data object:",$)}catch(Y){R+=` [Error stringifying data: ${Y}]`,console.log(R),console.log("Raw data:",$)}else console.log(R);ke(R)},ot=async i=>{var $,N,R,Y;if(i){C(!0),m(`Fetching existing album data for folder ID: ${i}`);try{const de=await ge();if(!de){m("❌ Authentication failed while fetching existing album data");return}const jt=`
        mutation FetchRelations($fetchRelationsInput: FetchRelationsInput!) {
          fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
            items {
              ... on FolderPosition {
                ${cs}
              }
            }
          }
        }
      `,kt={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}},ve=await(await fetch(Ie,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${de}`},body:JSON.stringify({query:jt,variables:kt})})).json();if(ve.errors){console.error("GraphQL errors:",ve.errors),m(`❌ Failed to fetch existing album data: ${JSON.stringify(ve.errors)}`);return}const Oe=(((N=($=ve==null?void 0:ve.data)==null?void 0:$.fetchRelations)==null?void 0:N.items)||[]).find(ue=>ue&&ue.folder&&ue.folder.id===i);if(!Oe)return;const Te=Oe.folder,Be=(((Y=(R=Te==null?void 0:Te.fileReferencesPage)==null?void 0:R.items)==null?void 0:Y.map(ue=>ue.file))||[]).filter(ue=>ue&&ue.dataKey).map(ue=>({dataKey:ue.dataKey,thumbnailDataKey:ue.thumbnailDataKey||null,durationInSeconds:ue.durationInSeconds||null,dataInBytes:ue.dataInBytes||0}));X(Be),m(`✅ Successfully loaded ${Be.length} existing files`),!q&&Te.folderName&&l(Te.folderName),!te&&Te.folderDescription&&M(Te.folderDescription)}catch(de){console.error("Failed to fetch existing album data:",de),m(`❌ Failed to fetch existing album data: ${String(de)}`)}finally{C(!1)}}};u.useEffect(()=>{const $=new URLSearchParams(window.location.search).get("folderId");if($){m(`Found folderId query parameter: ${$} - loading existing album`),v(!0),p($),be(!1),localStorage.removeItem(fe.SUB_ALBUM_DATA),m("Cleared sub-album data from localStorage - loading existing album from query parameter");const N=localStorage.getItem(fe.SELECTED_PHOTOS);if(!N)m("No stored photos found - proceeding with existing album load");else try{const R=JSON.parse(N);Array.isArray(R)&&R.length>0?m(`Found ${R.length} stored photos - these may be newly uploaded for this album, preserving them`):(localStorage.removeItem(fe.SELECTED_PHOTOS),m("Cleared empty photos array from localStorage"))}catch(R){m(`Error parsing stored photos: ${R}`),localStorage.removeItem(fe.SELECTED_PHOTOS)}oe(!0),me(!0)}else m("No folderId query parameter found, will proceed with normal initialization"),v(!1)},[]);const{cognitoUsername:ze,publicUsername:De,setPublicUsername:at}=Fs(d?()=>{}:p,y,d?()=>{}:me,d?()=>{}:oe,l,M,j,L,ae,h,d?()=>{}:be,d?()=>{}:Ae,B,m);u.useEffect(()=>{o&&(m(`Loading existing files for folder ID: ${o}`),ot(o))},[o]);const nt=Ws(U,Q,he,Se,E,se,m),{saveAlbumDirectly:Re}=Es(o||H,ze,T,ye,xe,q,te,w,A,ee,s,re,U,he,_,se,I,F,y,W,m);u.useEffect(()=>{H&&!o&&(p(H),m(`Updated folder ID from upload processor: ${H}`))},[H,o]),u.useEffect(()=>{k(i=>{const $=new Set;return i.forEach(N=>{N<T.length&&$.add(N)}),$}),Q(i=>{const $=new Map(i),N=[];return i.forEach((R,Y)=>{Y>=T.length&&N.push(Y)}),N.forEach(R=>{$.delete(R)}),$})},[T.length]),u.useEffect(()=>{ie(i=>{const $=new Set;return i.forEach(N=>{N<_.length&&$.add(N)}),$}),Se(i=>{const $=new Map(i),N=[];return i.forEach((R,Y)=>{Y>=_.length&&N.push(Y)}),N.forEach(R=>{$.delete(R)}),$})},[_.length]);const lt=i=>{m(`Removing photo at index: ${i}`);const $=T.filter((N,R)=>R!==i);y($),m(`New files count: ${$.length}`),$.length>0?(localStorage.setItem(fe.SELECTED_PHOTOS,JSON.stringify($)),m(`Updated localStorage with ${$.length} photos`)):(localStorage.removeItem(fe.SELECTED_PHOTOS),m("Removed photos from localStorage")),k(N=>{const R=new Set;return N.forEach(Y=>{Y<i?R.add(Y):Y>i&&R.add(Y-1)}),R}),Q(N=>{const R=new Map;return N.forEach((Y,de)=>{de<i?R.set(de,Y):de>i&&R.set(de-1,Y)}),R})},ct=i=>{m(`Removing existing file at index: ${i}`);const $=_.filter((N,R)=>R!==i);X($),m(`New existing files count: ${$.length}`),ie(N=>{const R=new Set;return N.forEach(Y=>{Y<i?R.add(Y):Y>i&&R.add(Y-1)}),R}),Se(N=>{const R=new Map;return N.forEach((Y,de)=>{de<i?R.set(de,Y):de>i&&R.set(de-1,Y)}),R})},dt=i=>{m(`Toggling selection for existing file at index: ${i}`),ie($=>{const N=new Set($);return N.has(i)?(N.delete(i),m(`Deselected existing file ${i} - remaining selected: ${N.size}`)):(N.add(i),m(`Selected existing file ${i} - total selected: ${N.size}`)),N})},ut=()=>{m(`Selecting all ${_.length} existing files`);const i=new Set;for(let $=0;$<_.length;$++)i.add($);ie(i),m(`Selected all existing files - total: ${i.size}`)},ft=()=>{m("Deselecting all existing files"),ie(new Set)},pt=i=>{m(`Toggling selection for photo at index: ${i}`),k($=>{const N=new Set($);return N.has(i)?(N.delete(i),m(`Deselected photo ${i} - remaining selected: ${N.size}`)):(N.add(i),m(`Selected photo ${i} - total selected: ${N.size}`)),N})},gt=()=>{m(`Selecting all ${T.length} photos`);const i=new Set;for(let $=0;$<T.length;$++)i.add($);k(i),m(`Selected all photos - total: ${i.size}`)},mt=()=>{m("Deselecting all photos"),k(new Set)},xt=()=>{confirm(t("Are you sure you want to delete all new files? This action cannot be undone."))&&(m("Deleting all new photos"),y([]),k(new Set),Q(new Map),localStorage.removeItem(fe.SELECTED_PHOTOS),m("Cleared all photos from localStorage"))};u.useEffect(()=>{m("Selection state changed:",{selectedPhotos:Array.from(E),selectedExistingFiles:Array.from(se),totalSelected:E.size+se.size})},[E,se,m]);const ht=()=>{const i=!w;m(`Toggling isOnPublicProfile to: ${i}`),j(i)},bt=()=>{const i=!A;m(`Toggling participantsCanAddItems to: ${i}`),L(i)},yt=()=>{const i=!ee;m(`Toggling participantsCanDeleteItems to: ${i}`),B(i)},wt=async()=>{m("Album save initiated"),m("Photo tags applied:",Object.fromEntries(U)),m("Existing file tags applied:",Object.fromEntries(he)),S(!1),I(!0);try{if(De!=null&&De.startsWith("Profile-")){m("Public username starts with 'Profile-', showing username prompt"),K(""),x(!0),I(!1);return}m("Valid username found, proceeding to save album directly with file-level tagging"),Re()}catch(i){console.error("Error in handleSaveAlbum:",i),m(`Error in handleSaveAlbum: ${i}`),I(!1)}},St=i=>{m(`Handling successful username update to: ${i}`),localStorage.setItem(fe.PUBLIC_USERNAME,i),at(i),x(!1),m("Proceeding to save album after username update"),Re()},Tt=(i,$)=>{m(`Password dialog closed with option: ${i}, password: ${$?"******":"undefined"}`),i&&ae(i),$!==void 0&&h($),pe(!1)},$t=()=>{m("Opening password dialog"),pe(!0)},vt=()=>{m("Add photos button clicked"),ce(o)},It=()=>{S(!b)},Pe=i=>{i(),S(!1)};u.useEffect(()=>{const i=$=>{const N=$.target;b&&!N.closest(".settings-dropdown-container")&&S(!1)};return b&&document.addEventListener("mousedown",i),()=>{document.removeEventListener("mousedown",i)}},[b]);const Fe=g||c||r,At=T.length>0||_.length>0,Pt=E.size>0||se.size>0,Ct=$e.useMemo(()=>{const i=E.size+se.size;return m(`Total selected files count updated: ${i}`),i},[E.size,se.size,m]);return e.jsxs(e.Fragment,{children:[e.jsx(Zt,{}),e.jsx(Lt,{children:e.jsxs(es,{children:[e.jsx(ts,{href:"my-albums.html",children:t("My Albums")}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[ne===!0&&e.jsxs("div",{className:"settings-dropdown-container",style:{position:"relative",display:"flex",alignItems:"center"},children:[e.jsx("button",{onClick:It,disabled:g||c||r,style:{background:"none",border:"none",cursor:g||c||r?"not-allowed":"pointer",padding:"8px",borderRadius:"4px",display:"flex",alignItems:"center",justifyContent:"center",color:g||c||r?"#ccc":"#666",fontSize:"18px",transition:"all 0.2s ease",backgroundColor:b?"#f0f0f0":"transparent",opacity:g||c||r?.5:1},onMouseEnter:i=>{!b&&!g&&!c&&!r&&(i.currentTarget.style.backgroundColor="#f8f9fa")},onMouseLeave:i=>{!b&&!g&&!c&&!r&&(i.currentTarget.style.backgroundColor="transparent")},title:t("Album Settings"),children:"⚙️"}),b&&!g&&!c&&!r&&e.jsxs(ss,{children:[e.jsx(Ce,{onClick:()=>Pe(ht),children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[e.jsx("span",{children:t(w?"Remove From Public Profile":"Add To Public Profile")}),e.jsx("span",{style:{fontSize:"12px",color:w?"#28a745":"#6c757d",fontWeight:"bold"},children:w?"✓":"○"})]})}),e.jsx(Ce,{onClick:()=>Pe(bt),children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[e.jsx("span",{children:t(A?"Allow Additions":"Do Not Allow Additions")}),e.jsx("span",{style:{fontSize:"12px",color:A?"#28a745":"#6c757d",fontWeight:"bold"},children:A?"✓":"○"})]})}),e.jsx(Ce,{onClick:()=>Pe(yt),children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[e.jsx("span",{children:t(ee?"Allow Removals":"Do Not Allow Removals")}),e.jsx("span",{style:{fontSize:"12px",color:ee?"#28a745":"#6c757d",fontWeight:"bold"},children:ee?"✓":"○"})]})}),e.jsx(Ce,{onClick:()=>Pe($t),children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[e.jsx("span",{children:t("Album Password Policy")}),e.jsx("span",{style:{fontSize:"12px",color:s!=="NoPassword"?"#28a745":"#6c757d",fontWeight:"bold"},children:s!=="NoPassword"?"✓":"○"})]})})]})]}),e.jsx(Ke,{$primary:!0,onClick:wt,disabled:g||c||r,style:{minWidth:"120px",fontSize:"14px",padding:"8px 16px"},children:t(g?"Saving...":"Save Album")})]})]})}),e.jsxs(rs,{$isRTL:a,children:[e.jsx("div",{style:{marginTop:V&&ne===!0?"3px":"0"},children:e.jsx(zs,{showFolderDetails:V,isCreator:ne,folderName:q,setFolderName:l,folderDescription:te,setFolderDescription:M,isSavingAlbum:g||c})}),(c||O.totalFiles>0&&(O.filesUploading>0||O.filesProcessing>0||O.filesComplete<O.totalFiles))&&e.jsx(ls,{progressTracker:O,isRTL:Ee(n)==="rtl",variant:"detailed",context:"saving",isUploading:c,showSuccessMessage:!1,showErrorMessage:!0,customMessages:{error:t("Some photos could not be processed. You can continue with the successfully processed photos.")}}),e.jsx("input",{ref:Z,id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:i=>we(i,ze),style:{display:"none"}}),V&&ne===!0&&At&&e.jsxs(Zs,{t,isRTL:a,children:[_.length>0&&e.jsx("div",{style:{marginBottom:"32px"},children:e.jsx(er,{existingFiles:_,selectedExistingIndices:se,onToggleSelection:dt,onSelectAll:ut,onDeselectAll:ft,onDeleteFile:ct,disabled:Fe,t,isRTL:a})}),e.jsx(Ls,{selectedPhotos:T,selectedPhotoIndices:E,onToggleSelection:pt,onSelectAll:gt,onDeselectAll:mt,onRemovePhoto:lt,onDeleteAll:xt,disabled:Fe,t,isRTL:a}),e.jsx("div",{style:{marginTop:Pt?"32px":"16px"},children:e.jsx(Ys,{tagsManager:nt,disabled:Fe,enhancedLog:m},`tags-${Ct}`)})]}),e.jsx(Ns,{isSavingAlbum:g,savingProgress:G}),e.jsx(is,{children:e.jsx(Ke,{onClick:vt,disabled:g||c||r,children:t(c?"Uploading...":"Add More Photos")})}),e.jsx(as,{t,language:n,usernameManager:P,onSuccess:St}),e.jsx(js,{isOpen:le,onClose:Tt,initialOption:s,initialPassword:re}),e.jsx(ks,{debugMessages:D,t,isRTL:a,textDirection:a?"rtl":"ltr"})]})]})},sr=()=>e.jsx(Ot,{children:e.jsx(tr,{})});Rt.createRoot(document.getElementById("root")).render(e.jsx(sr,{}));
