import{d as B,u as Ue,a as b,j as t,g as Pe,h as ue,L as xe,i as Fe,s as vt,m as It,f as we,k as Pt,l as At,n as jt,r as kt,R as Ct,I as Dt,p as Et}from"./utils-CPz2uLz2.js";import{C as Ae,F as _e,e as Ne,f as Ft,g as _t,P as Nt,h as Rt,i as We,j as Ke,k as zt,l as Ot,S as Mt,m as Bt,V as Ut,n as Wt,o as Kt,M as Gt,G as qt,p as Ht,q as Jt,r as Qt,B as Re,D as Vt,s as $e,t as Yt,u as Xt}from"./styled-components-BM8XXBbo.js";import{u as Zt,U as Lt}from"./useUsernameManagement-BEP9WXTC.js";import{u as es,U as ts}from"./useFileUploadProcessor-drmDlT1k.js";import{F as ss}from"./types-B2_92tNb.js";import{L as rs}from"./LazyImage-B9J00rxJ.js";const c={colors:{primary:"#007bff",primaryDark:"#0056b3",secondary:"#6c757d",success:"#4caf50",danger:"#e53935",warning:"#ff9800",white:"#fff",text:{primary:"#333",secondary:"#666",light:"#777"},background:{primary:"#f9fafb",highlight:"#f0f7ff"},border:"#ddd"},spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px"},borderRadius:{small:"4px",medium:"8px"},boxShadow:{lg:"0 4px 10px rgba(0,0,0,0.08)"}},is=B.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
`,os=B.div`
  background-color: ${c.colors.white};
  border-radius: ${c.borderRadius.medium};
  box-shadow: ${c.boxShadow.lg};
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
  scrollbar-color: ${c.colors.border} transparent;
  
  /* Custom scrollbar for webkit browsers */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${c.colors.border};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${c.colors.secondary};
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
    border-radius: ${c.borderRadius.small};
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
`,as=B.div`
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
`,ns=B.div`
  direction: ${e=>e.$isRTL?"rtl":"ltr"};
`,ls=B.h3`
  font-size: 24px;
  font-weight: 600;
  color: ${c.colors.text.primary};
  margin: 0 0 ${c.spacing.lg} 0;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 22px;
    margin: 0 0 ${c.spacing.md} 0;
  }
  
  @media (max-height: 700px) {
    font-size: 20px;
    margin: 0 0 ${c.spacing.md} 0;
  }
  
  @media (max-width: 480px) {
    font-size: 18px;
  }
`,ds=B.p`
  margin-bottom: ${c.spacing.lg};
  font-size: 16px;
  color: ${c.colors.text.secondary};
  line-height: 1.5;
  
  @media (max-width: 768px) {
    margin-bottom: ${c.spacing.md};
    font-size: 15px;
  }
  
  @media (max-height: 700px) {
    margin-bottom: ${c.spacing.sm};
    font-size: 14px;
  }
`,ze=B.div`
  margin-bottom: ${c.spacing.lg};
`,Oe=B.label`
  display: block;
  margin-bottom: ${c.spacing.sm};
  font-size: 14px;
  font-weight: 500;
  color: ${c.colors.text.primary};
`,cs=B.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${c.colors.border};
  border-radius: ${c.borderRadius.small};
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${c.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  &::placeholder {
    color: ${c.colors.text.light};
  }
`,us=B.div`
  display: flex;
  flex-direction: column;
  gap: ${c.spacing.md};
  margin-bottom: ${c.spacing.xl};
`,ps=B.div`
  border: 2px solid ${e=>e.$isSelected?c.colors.primary:c.colors.border};
  border-radius: ${c.borderRadius.medium};
  padding: ${c.spacing.lg};
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${e=>e.$isSelected?c.colors.background.highlight:c.colors.white};
  display: flex;
  align-items: center;
  gap: ${c.spacing.lg};
  
  @media (max-width: 768px) {
    padding: ${c.spacing.md};
    gap: ${c.spacing.md};
  }
  
  @media (max-width: 480px) {
    padding: ${c.spacing.sm};
    gap: ${c.spacing.sm};
  }
  
  @media (max-height: 700px) {
    padding: ${c.spacing.sm};
    gap: ${c.spacing.sm};
  }
`,fs=B.div`
  flex: 1;
`,gs=B.div`
  margin-bottom: ${c.spacing.xs};
`,ms=B.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${c.colors.primary};
  flex-shrink: 0;
`,xs=B.label`
  font-size: 16px;
  font-weight: 500;
  color: ${c.colors.text.primary};
  cursor: pointer;
  display: block;
`,hs=B.div`
  font-size: 14px;
  color: ${c.colors.text.secondary};
  margin-top: ${c.spacing.xs};
`,bs=B.div`
  color: ${c.colors.warning};
  font-size: 12px;
  font-style: italic;
  margin-top: ${c.spacing.xs};
  font-weight: 500;
`,ys=B.div`
  display: flex;
  gap: ${c.spacing.sm};
  justify-content: center;
  margin-top: ${c.spacing.xl};
`,Me=B.button`
  background-color: ${e=>e.$variant==="danger"?c.colors.danger:e.$variant==="secondary"?"transparent":e.$variant==="success"?c.colors.success:c.colors.primary};
  color: ${e=>e.$variant==="secondary"?c.colors.primary:c.colors.white};
  border: ${e=>e.$variant==="secondary"?`1px solid ${c.colors.primary}`:"none"};
  padding: ${e=>e.$size==="small"?"8px 16px":e.$size==="large"?"16px 32px":"12px 24px"};
  border-radius: ${c.borderRadius.medium};
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  font-size: ${e=>e.$size==="small"?"14px":e.$size==="large"?"18px":"16px"};
  font-weight: 500;
  transition: all 0.2s ease;
  opacity: ${e=>e.disabled?.6:1};
  min-width: 100px;

  &:hover:not(:disabled) {
    background-color: ${e=>e.$variant==="danger"?"#c62828":e.$variant==="secondary"?c.colors.background.highlight:e.$variant==="success"?"#388e3c":c.colors.primaryDark};
  }
`,ws=B.div`
  background-color: ${c.colors.background.primary};
  border-radius: ${c.borderRadius.medium};
  padding: ${c.spacing.md};
  margin: ${c.spacing.md} 0;
  border-left: 4px solid ${c.colors.primary};
  font-size: 14px;
  color: ${c.colors.text.secondary};
  line-height: 1.4;
  
  @media (max-width: 768px) {
    padding: ${c.spacing.sm};
    margin: ${c.spacing.sm} 0;
    font-size: 13px;
  }
  
  @media (max-height: 700px) {
    padding: ${c.spacing.xs};
    font-size: 12px;
  }
`,Ss=[{value:"NotVisible",titleKey:"Password Required To See Or Save",descriptionKey:"Album will be completely hidden until correct password is entered"},{value:"Watermark",titleKey:"Watermarked And No Saving Without Password",descriptionKey:"Photos will be visible with watermarks, password required to save"},{value:"CannotBeSaved",titleKey:"Password Required To Save",descriptionKey:"Photos are visible but password required to download or save"},{value:"NoPassword",titleKey:"No Password",descriptionKey:"Album is fully public with no restrictions"}],$s=({isOpen:e,onClose:d,initialOption:a="NoPassword",initialPassword:w=""})=>{const{t:u,language:P}=Ue(),x=Pe(P)==="rtl",[g,p]=b.useState(a),[v,F]=b.useState(w);if(b.useEffect(()=>{e&&(p(a),F(w))},[e,a,w]),!e)return null;const T=v.trim()==="",o=k=>{p(k)},H=k=>{k.target===k.currentTarget&&d()},Q=k=>k!=="NoPassword";return t.jsxs(t.Fragment,{children:[t.jsx(is,{onClick:H}),t.jsx(os,{children:t.jsx(as,{children:t.jsxs(ns,{$isRTL:x,children:[t.jsx(ls,{children:u("Album Password Policy")}),t.jsx(ds,{children:u("Configure password protection for your album. Choose how you want to restrict access to your photos.")}),t.jsxs(ze,{children:[t.jsx(Oe,{children:u("Enter Password")}),t.jsx(cs,{type:"text",placeholder:u("Enter password (optional)"),value:v,onChange:k=>F(k.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"})]}),t.jsxs(ze,{children:[t.jsx(Oe,{children:u("Select Protection Level")}),t.jsx(us,{children:Ss.map(k=>t.jsxs(ps,{$isSelected:g===k.value,onClick:()=>o(k.value),children:[t.jsx(ms,{type:"radio",name:"protection",checked:g===k.value,onChange:()=>o(k.value)}),t.jsxs(fs,{children:[t.jsx(gs,{children:t.jsx(xs,{children:u(k.titleKey)})}),t.jsx(hs,{children:u(k.descriptionKey)}),T&&Q(k.value)&&g===k.value&&t.jsx(bs,{children:u('⚠️ Will use "password" as default if left empty')})]})]},k.value))})]}),Q(g)&&t.jsxs(ws,{children:[t.jsx("strong",{children:u("💡 Password Protection Info:")}),t.jsx("br",{}),u('If you leave the password field empty, "password" will be used as the default password. You can change this anytime in album settings.')]}),t.jsxs(ys,{children:[t.jsx(Me,{$variant:"secondary",onClick:()=>d(),children:u("Cancel")}),t.jsx(Me,{$variant:"primary",onClick:()=>{const k=T&&Q(g)?"password":v;console.log(`Saving with option: ${g}, password: ${k.length>0?"********":"none"}`),d(g,k)},children:u("Save Settings")})]})]})})})]})},Ts=({debugMessages:e,t:d,isRTL:a,textDirection:w})=>e.length===0?null:t.jsxs("div",{style:{marginTop:"40px",background:"#fff3cd",padding:"16px",borderRadius:"8px",border:"1px solid #ffeeba",maxWidth:900,margin:"0 auto",direction:w},children:[t.jsx("h3",{style:{marginTop:0,fontSize:"18px",color:"#856404",textAlign:a?"right":"left"},children:d("Debug Log")}),t.jsx("pre",{style:{fontSize:"14px",color:"#856404",whiteSpace:"pre-wrap",maxHeight:"400px",overflow:"auto",textAlign:a?"right":"left"},children:e.map((u,P)=>t.jsx("div",{style:{marginBottom:"8px"},children:u},P))})]}),vs=`
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
`,Is=(e,d,a,w,u,P,x,g,p,v,F,T,o)=>{const[H,Q]=b.useState(null),[k,s]=b.useState(null),L=async U=>{o(`Initializing folder ID with username: ${U}`);try{const _=new URLSearchParams(window.location.search).get("folderId");if(o(`Folder ID from URL: ${_||"null"}`),_){e(_),o(`Using existing folder ID: ${_}`);try{o(`Fetching details for folder: ${_}`);const n=await X(_,o);if(o("Folder details retrieved:",n),n){const A=`${U}_____${U}____Account`,J=n.creatorId===A;if(o(`User is creator of folder: ${J}, accountId: ${A}, creator: ${n.creatorId}`),a(J),J){o("User is creator, showing folder details"),w(!0),u(n.folderName),P(n.folderDescription),x(n.isOnPublicProfile),o(`Setting isOnPublicProfile: ${n.isOnPublicProfile}`),n.participantsCanAddItems!==void 0&&(g(n.participantsCanAddItems),o(`Setting participantsCanAddItems: ${n.participantsCanAddItems}`));const O=n.passwordPolicy;o(`Password policy from folder details: ${O}`),p(O),O!=="NoPassword"&&n.password&&v(n.password),o(`Set password protection option to: ${O}`)}else o("User is NOT the creator, hiding editable fields"),w(!1)}else o("No folder details retrieved, setting isCreator to true"),a(!0),w(!0)}catch(n){console.error("Error fetching folder details:",n),o(`Error fetching folder details: ${n}`),a(!1)}}else{const n=`${U}_____${Fe()}____Folder`;o(`Creating new folder ID: ${n}`),e(n),o("Setting isCreator to true for new album"),a(!0),w(!0)}}catch(l){console.error("Folder ID initialization error:",l),o(`Folder ID initialization error: ${l}`),a(!1)}},X=async(U,l)=>{var _,n,A,J,O,de,ge,m;l(`Fetching details for folder ID: ${U}`);try{const y=await ue();if(!y)return l("No token available for fetching folder details"),null;l("Sending GraphQL query to fetch folder details");const f=await(await fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${y}`},body:JSON.stringify({query:vs,variables:{folderIds:[U],fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(l("Folder details API response:",f),f.errors)return console.error("GraphQL errors:",f.errors),l(`GraphQL errors: ${JSON.stringify(f.errors)}`),null;const D=((n=(_=f==null?void 0:f.data)==null?void 0:_.fetchFolders)==null?void 0:n.items)||[];if(l(`Found ${D.length} folder items`),D.length===0)return l("No folder items found"),null;const S=D[0];l("Retrieved folder data:",S);const j=((J=(A=S.folderPosition)==null?void 0:A.profileIds)==null?void 0:J.some(M=>M.includes("Public____Profile")))||!1;l(`Folder is on public profile: ${j}`),l("Profile IDs:",(O=S.folderPosition)==null?void 0:O.profileIds);const R=(de=S.folderInviteParameters)==null?void 0:de.usingFolderInviteGrantsRightToAddItems;return l(`Participants can add items: ${R}`),{creatorId:S.creatorId||"",folderName:S.folderName||"",folderDescription:S.folderDescription||"",passwordPolicy:((ge=S.folderPassword)==null?void 0:ge.policy)||"NoPassword",password:((m=S.folderPassword)==null?void 0:m.password)||"",isOnPublicProfile:j,participantsCanAddItems:R!==void 0?R:!0}}catch(y){return console.error("Error in fetchFolderDetails:",y),l(`Error in fetchFolderDetails: ${y}`),null}},ee=()=>{o("Attempting to restore photos from localStorage");try{const U=localStorage.getItem(xe.SELECTED_PHOTOS);if(o(`Found stored photos: ${U?"yes":"no"}`),U)try{const l=JSON.parse(U);o(`Parsed ${l.length} photos from localStorage`),Array.isArray(l)&&l.length>0&&(d(l),o(`Restored ${l.length} photos to state`))}catch(l){console.error("Error parsing stored photos:",l),o(`Error parsing stored photos: ${l}`)}}catch(U){console.error("Error restoring photos from storage:",U),o(`Error restoring photos from storage: ${U}`)}},Z=()=>{o("Testing S3 connection");try{vt?o("S3 client is available"):(console.error("S3 client not available"),o("S3 client not available"))}catch(U){console.error("S3 connection test error:",U),o(`S3 connection test error: ${U}`)}},ie=async()=>{var U;o("Starting component initialization");try{o("Checking login with refresh");const l=await ue();if(!l){o("No token returned from login check, aborting initialization");return}try{const _=localStorage.getItem(xe.PUBLIC_USERNAME);o(`Retrieved public username from localStorage: ${_||"null"}`),s(_||null);const A=JSON.parse(atob(l.split(".")[1]))["cognito:username"];if(A){o(`Extracted Cognito username from token: ${A}`),Q(A);const J=localStorage.getItem(xe.SUB_ALBUM_DATA);if(o(`Sub-album data from localStorage: ${J||"null"}`),J)try{const O=JSON.parse(J);if(o("Parsed sub-album data:",O),O.isSubAlbum&&((U=O.selectedFileIds)==null?void 0:U.length)>0){o(`Valid sub-album data found with ${O.selectedFileIds.length} files`),F(!0),T(O.selectedFileIds),O.selectedPhotos&&O.selectedPhotos.length>0&&(o(`Found ${O.selectedPhotos.length} selected photos in sub-album data`),d(O.selectedPhotos)),w(!0),a(!0);const de=`${A}_____${Fe()}____Folder`;o(`Generated new folder ID for sub-album: ${de}`),e(de)}else o("Invalid sub-album data, proceeding with normal initialization"),await L(A)}catch(O){console.error("Error parsing sub-album data:",O),o(`Error parsing sub-album data: ${O}`),await L(A)}else o("No sub-album data found, proceeding with normal folder initialization"),await L(A)}else o("No Cognito username found in token")}catch(_){console.error("User data initialization error:",_),o(`User data initialization error: ${_}`)}ee(),Z(),o("Component initialization completed")}catch(l){console.error("Initialization error:",l),o(`Initialization error: ${l}`)}};return b.useEffect(()=>{ie()},[]),{cognitoUsername:H,publicUsername:k,setPublicUsername:s}},Ps=(e,d,a,w,u,P,x,g,p,v,F,T,o,H,Q,k,s)=>{const L=m=>(s(`Converting ${m.length} tags to API format`),m.map(y=>({TagType:y.TagType,tagTitle:y.tagTitle,selectedSubtagInputs:y.subtags.map(N=>({TagType:y.TagType,tagTitle:N.tagTitle,subtagTitle:N.subtagTitle}))}))),X=m=>{s(`Save progress text: ${m}`);const y=document.getElementById("saveProgressText");y&&(y.innerText=m)},ee=m=>{const y=document.getElementById("saveProgress");y?(y.style.width=`${m}%`,s(`Updated save progress bar: ${m}%`)):s("Progress bar element not found"),H(m)},Z=(m,y)=>{s(`Splitting array of ${m.length} items into chunks of ${y}`);const N=[];for(let f=0;f<m.length;f+=y)N.push(m.slice(f,f+y));return s(`Created ${N.length} chunks`),N},ie=m=>{const y=new Set;return m.filter(N=>y.has(N.fileId)?(s(`Skipping duplicate file reference with ID: ${N.fileId}`),!1):(y.add(N.fileId),!0))},U=(m,y,N)=>{s("Creating folder position input WITHOUT folder-level tags"),s(`Profile visibility: ${g?"Public":"Only Me"}`);const f=g?[`${d}_____Public____Profile`]:["Only Me_____Only Me____Profile"];s(`Profile IDs: ${JSON.stringify(f)}`);let D=[];w&&u.length>0&&(s(`Creating file reference IDs for ${u.length} sub-album files`),D=u.map(M=>{const W=M.split("_____");if(W.length>=2){const te=W[1].split("____")[0],oe=`${N}_____${te}____FileReference`;return s(`Created file reference ID for sub-album: ${oe}`),oe}return s(`Using original fileId as fallback: ${M}`),M})),s(`Created ${D.length} acceptedFileReferenceIds`);const S=v!=="NoPassword"?F:null;if(s(`Password protection: ${v}`),s(`Album password: ${S?"******":"null"}`),s(`Participants can add items: ${p}`),!e)throw s("Error: folderId is null or undefined"),new Error("folderId is required to create folder position input");const j=Pt(e),R=At(j);return{currentTime:m,folderId:e,profileIds:f,folderPositionPoints:1,acceptedFileReferenceIds:D,folderInput:{folderAboutContactIds:[y],albumNanoId:R,folderName:P,folderDescription:x,folderPasswordInput:{password:S,policy:v},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,usingFolderInviteGrantsRightToRemoveItems:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:p,addedItemsNeedFolderCreatorApproval:!1}}}},l=(m,y,N)=>(s(`Creating file reference inputs with individual photo tags for ${m.length} photos`),m.map((f,D)=>{var W;const S=T.get(D)||[],j=L(S);if(s(`Photo ${D} (${f.fileName}): ${S.length} tags applied`),f.fileId)return s(`Using existing fileId for photo: ${f.fileId}`),{fileReferencesHolderId:e,currentTime:y,points:1,hasBeenDeleted:!1,selectedTagInputs:j,fileId:f.fileId,fileInput:null};const R=f.type==="video"||(W=f.type)!=null&&W.startsWith("video")?`Input/Video/${f.fileName}`:`Input/Image/${f.fileName}`,M=`${d}_____${f.fileName}____File`;return s(`Created file reference for ${f.fileName}:`),s(`  - dataKey: ${R}`),s(`  - fileId: ${M}`),s(`  - thumbnailDataKey: ${f.thumbnailDataKey||"undefined"}`),s(`  - size: ${f.size}`),s(`  - thumbnailSize: ${f.thumbnailSize||0}`),s(`  - duration: ${f.duration||"undefined"}`),s(`  - tags: ${S.length} tags selected for this photo`),{fileReferencesHolderId:e,currentTime:y,points:1,hasBeenDeleted:!1,selectedTagInputs:j,fileId:M,fileInput:{fileId:M,ownerFileInput:{editorContactIds:[N],FileSharingOptionsEnum:"Anyone",dataKey:R,thumbnailDataKey:f.thumbnailDataKey,dataInBytes:f.size,thumbnailDataInBytes:f.thumbnailSize||0,s3UploadedAt:y,durationInSeconds:f.duration},editorFileInput:{aboutContactIds:[N],captionText:"",numericFilterInputs:[]}}}})),_=async m=>{var D,S;s("Sending folder-only mutation (no file references, no folder tags)");const y=await ue();if(!y)throw s("No token available for saving album, aborting"),new Error("Authentication token not available");const N=`
      mutation MyMutation($folderPositionInputs: [FolderPositionInput!]) {
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items {
            id
          }
        }
      }
    `,f={folderPositionInputs:[m]};s("GraphQL folder-only mutation variables:",f);try{s("Sending API request to save folder");const j=await fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${y}`},body:JSON.stringify({query:N,variables:f})});s(`API response status: ${j.status}`);const R=await j.text();s(`API response raw text: ${R}`);const M=JSON.parse(R);if(s("API response JSON:",M),M.errors)throw console.error("Folder save failed:",M.errors),s("Folder save failed with errors:",M.errors),new Error("Failed to save folder");return s("Folder saved successfully"),((S=(D=M.data)==null?void 0:D.changeFiles)==null?void 0:S.items)||[]}catch(j){throw console.error("Error in sendFolderOnlyMutation:",j),s(`Error in sendFolderOnlyMutation: ${j}`),j}},n=async m=>{var D,S,j,R,M;s(`Sending file references-only mutation with ${m.length} items (each with individual tags)`);const y=await ue();if(!y)throw s("No token available for saving file references, aborting"),new Error("Authentication token not available");const N=`
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
    `,f={updatedFileReferenceInputs:m};s("GraphQL file references-only mutation variables (first item):",m.length>0?m[0]:"No items");try{s("Sending API request to save file references with individual tags");const W=await fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${y}`},body:JSON.stringify({query:N,variables:f})});s(`API response status: ${W.status}`);const pe=await W.text();s(`API response raw text: ${pe.substring(0,500)}...`);const te=JSON.parse(pe);if(s("API response JSON items count:",((j=(S=(D=te.data)==null?void 0:D.changeFiles0)==null?void 0:S.items)==null?void 0:j.length)||0),te.errors)throw console.error("File references save failed:",te.errors),s("File references save failed with errors:",te.errors),new Error("Failed to save file references");return s("File references chunk saved successfully with individual photo tags"),((M=(R=te.data)==null?void 0:R.changeFiles0)==null?void 0:M.items)||[]}catch(W){throw console.error("Error in sendFileReferencesOnlyMutation:",W),s(`Error in sendFileReferencesOnlyMutation: ${W}`),W}},A=async(m,y)=>{var S,j,R,M,W,pe,te,oe,be;s(`Sending final chunk with folder mutation (${m.length} file references, no folder tags)`);const N=await ue();if(!N)throw s("No token available for saving final chunk, aborting"),new Error("Authentication token not available");const f=`
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
    `,D={folderPositionInputs:[y],updatedFileReferenceInputs:m};s("GraphQL final mutation variables (folder + last chunk, no folder tags)");try{s("Sending API request for final save with folder (no folder tags)");const fe=await fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${N}`},body:JSON.stringify({query:f,variables:D})});s(`API response status: ${fe.status}`);const se=await fe.text();s(`API response raw text: ${se.substring(0,500)}...`);const i=JSON.parse(se);if(s("API response JSON:",{fileReferencesCount:((R=(j=(S=i.data)==null?void 0:S.changeFiles0)==null?void 0:j.items)==null?void 0:R.length)||0,folderItems:((W=(M=i.data)==null?void 0:M.changeFiles)==null?void 0:W.items)||[]}),i.errors)throw console.error("Final save failed:",i.errors),s("Final save failed with errors:",i.errors),new Error("Failed to complete album save");return s("Final chunk and folder saved successfully (with individual photo tags)"),{fileReferences:((te=(pe=i.data)==null?void 0:pe.changeFiles0)==null?void 0:te.items)||[],folderPositions:((be=(oe=i.data)==null?void 0:oe.changeFiles)==null?void 0:be.items)||[]}}catch(fe){throw console.error("Error in sendFinalChunkWithFolderMutation:",fe),s(`Error in sendFinalChunkWithFolderMutation: ${fe}`),fe}},J=async()=>(s("Validating required data"),await ue()?d?e?(s("All required data validated successfully"),!0):(s("No folder ID, validation failed"),!1):(s("No Cognito username, validation failed"),!1):(s("No token available, validation failed"),!1)),O=()=>{s("Handling successful save"),jt(Q,k,[xe.SELECTED_PHOTOS,xe.SUB_ALBUM_DATA],s),s("Album data cleared");const m=document.getElementById("saveProgressText");m&&(m.innerText="Album saved successfully!",s("Updated progress text to 'Album saved successfully!'")),sessionStorage.setItem("album_just_saved","true"),s("Set 'album_just_saved' flag in sessionStorage"),s("Setting timeout for redirect to my-albums.html"),setTimeout(()=>{s("Redirecting to my-albums.html"),kt("my-albums.html")},1e3)},de=async(m,y)=>{s("Starting chunked save process (individual photo tags, no folder tags)");try{X("Processing files in chunks...");const N=48;if(y.length===0)s("No file references to process, saving only folder position (no folder tags)"),await _(m);else{const f=ie(y);s(`After removing duplicates, processing ${f.length} unique file references`);const D=Z(f,N);s(`Split file references into ${D.length} chunks of max size ${N}`);for(let S=0;S<D.length;S++){const j=D[S];s(`Processing chunk ${S+1} of ${D.length} with ${j.length} file references`);const R=S/D.length*80;H(10+R),ee(10+R),S<D.length-1?(X(`Saving files: chunk ${S+1} of ${D.length}...`),await n(j)):(X("Finalizing album..."),await A(j,m))}}H(100),ee(100),X("Album saved successfully!"),O()}catch(N){console.error("Error in chunked save process:",N),s(`Error in chunked save process: ${N}`),X(`Error: ${N}`),o(!1)}};return{saveAlbumDirectly:async()=>{s("Starting direct album save with individual photo tagging"),s(`Photo tags map: ${T.size} photos have tags applied`),o(!0),H(5);try{if(s("Validating required data for save"),!await J()){s("Required data validation failed, aborting save"),o(!1);return}const m=Math.floor(Date.now()/1e3),y=`${d}_____${d}____Account`,f=e.split("_____")[1].split("____")[0];s(`Save timestamp: ${m}`),s(`Account ID: ${y}`),s(`Folder ID: ${e}`),s(`Folder target item identifier: ${f}`),s("Creating folder position input (no folder tags)");const D=U(m,y,f);s("Folder position input created:",D);let S=[];const j=a.filter(R=>R.status==="complete");if(s(`Found ${j.length} valid photos with 'complete' status`),j.length>0){const R=j.filter(W=>!W.fileId);s(`Found ${R.length} new uploads to move from temp to public folder`),R.length>0&&(s("Moving files from temp to public folder"),await It(R,ee,s)),s("Creating file reference inputs for uploads with individual photo tags");const M=l(j,m,y);s(`Created ${M.length} file reference inputs for uploads`,M),S=S.concat(M)}if(w&&u.length>0){s(`Adding ${u.length} existing file references for sub-album`);const R=u.map(M=>(s(`Creating file reference for existing file ID: ${M}`),{fileReferencesHolderId:e,currentTime:m,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:M,fileInput:null}));s(`Created ${R.length} file reference inputs for existing files`,R),S=S.concat(R)}s(`Total file reference inputs: ${S.length}`),s("Sending GraphQL mutations with chunked file references (individual photo tags)"),await de(D,S)}catch(m){console.error("Error in saveAlbumDirectly:",m),s(`Error in saveAlbumDirectly: ${m}`),o(!1)}}}},As=({selectedPhotos:e,selectedPhotoIndices:d,isSavingAlbum:a,onRemovePhoto:w,onTogglePhotoSelection:u,onSelectAllPhotos:P,onDeselectAllPhotos:x,hideHeader:g=!1})=>{const{t:p}=je();if(e.length===0)return null;const v=d.size>0,F=d.size===e.length;return t.jsxs(t.Fragment,{children:[!g&&e.length>1&&t.jsx(Ae,{style:{marginBottom:"16px",border:"2px solid #007bff"},children:t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px"},children:[t.jsx("span",{style:{fontWeight:"bold",fontSize:"14px",color:"#007bff"},children:v?p("{{count}} file(s) selected for tagging",{count:d.size}):p("Click files below to select them for tagging")}),t.jsxs("div",{style:{display:"flex",gap:"8px",marginLeft:"auto"},children:[!F&&t.jsx("button",{onClick:P,disabled:a,style:{padding:"6px 12px",border:"1px solid #007bff",borderRadius:"4px",background:"#007bff",color:"white",fontSize:"12px",cursor:"pointer",fontWeight:"bold"},children:p("Select All")}),v&&t.jsx("button",{onClick:x,disabled:a,style:{padding:"6px 12px",border:"1px solid #6c757d",borderRadius:"4px",background:"transparent",color:"#6c757d",fontSize:"12px",cursor:"pointer"},children:p("Deselect All")})]})]})}),t.jsx(zt,{children:e.map((T,o)=>{var Q,k;const H=d.has(o);return t.jsxs(Ot,{style:{position:"relative",cursor:e.length>1?"pointer":"default",border:H?"3px solid #007bff":"1px solid #e9ecef",borderRadius:"8px",overflow:"hidden"},onClick:()=>e.length>1&&u(o),children:[H&&!a&&t.jsx("button",{onClick:s=>{s.stopPropagation(),confirm(p("Are you sure you want to remove this photo?"))&&w(o)},style:{position:"absolute",top:"8px",right:"8px",width:"24px",height:"24px",borderRadius:"50%",border:"none",backgroundColor:"rgba(220, 53, 69, 0.9)",color:"white",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px",fontWeight:"900",zIndex:20,transition:"all 0.2s ease",boxShadow:"0 2px 4px rgba(0,0,0,0.3)",lineHeight:"1"},onMouseEnter:s=>{s.currentTarget.style.backgroundColor="rgba(200, 35, 51, 1)",s.currentTarget.style.transform="scale(1.1)"},onMouseLeave:s=>{s.currentTarget.style.backgroundColor="rgba(220, 53, 69, 0.9)",s.currentTarget.style.transform="scale(1)"},title:p("Remove photo"),children:"×"}),e.length>1&&H&&t.jsx("div",{style:{position:"absolute",bottom:"8px",left:"8px",right:"8px",background:"rgba(0, 123, 255, 0.9)",color:"white",padding:"4px 8px",borderRadius:"4px",fontSize:"11px",fontWeight:"bold",textAlign:"center",zIndex:10},children:"SELECTED"}),T.status!=="complete"&&t.jsx(Mt,{$status:T.status,children:T.status==="error"?"✕":T.status==="uploading"?"↑":T.status==="processing"?"⚙️":"•"}),t.jsxs(Bt,{style:{opacity:e.length===1||!H?1:.85,transition:"opacity 0.2s ease"},children:[T.type==="video"||(Q=T.type)!=null&&Q.startsWith("video")?t.jsx(Ut,{src:T.s3PreviewUrl,controls:!0}):t.jsx(Wt,{src:T.s3PreviewUrl,alt:T.fileName}),(T.status==="uploading"||T.status==="processing")&&t.jsx(We,{$bottom:"4px",$left:"4px",$right:"4px",$height:"4px",children:t.jsx(Ke,{$progress:T.progress,$status:T.status})})]}),t.jsxs(Kt,{children:[(k=T.type)!=null&&k.startsWith("video")?p("Video"):p("Image"),T.size&&` • ${(T.size/1024/1024).toFixed(1)} MB`,T.duration&&` • ${T.duration}s`]}),T.status==="error"&&T.errorMessage&&t.jsxs(Gt,{$type:"error",children:[p("Error"),": ",T.errorMessage.length>40?T.errorMessage.substring(0,37)+"...":T.errorMessage]})]},o)})})]})},js=({isSavingAlbum:e,savingProgress:d})=>{const{t:a}=je();return e?t.jsxs(Ae,{children:[t.jsx(Nt,{children:a("Saving Album")}),t.jsx(Rt,{id:"saveProgressText",children:a("Moving files...")}),t.jsx(We,{children:t.jsx(Ke,{id:"saveProgress",$progress:d/100})})]}):null},ks=({showFolderDetails:e,isCreator:d,folderName:a,setFolderName:w,folderDescription:u,setFolderDescription:P,isSavingAlbum:x})=>{const{t:g}=je();return!e||d!==!0?null:t.jsxs(Ae,{children:[t.jsxs(_e,{children:[t.jsx(Ne,{htmlFor:"folderName",children:g("Album Name")}),t.jsx(Ft,{id:"folderName",type:"text",value:a,onChange:p=>w(p.target.value),placeholder:g("Enter album name (optional)"),disabled:x})]}),t.jsxs(_e,{children:[t.jsx(Ne,{htmlFor:"folderDescription",children:g("Album Description")}),t.jsx(_t,{id:"folderDescription",value:u,onChange:p=>P(p.target.value),placeholder:g("Enter album description (optional)"),rows:4,disabled:x})]})]})},je=()=>({t:(e,d)=>d&&typeof d=="object"&&"count"in d?e.replace("{{count}}",String(d.count)):e,language:"en"}),Cs=`
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
`,Ds=`
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
`,Es=`
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
`,Fs=`
  mutation DeleteTag($tagId: String!) {
    deleteTag(tagId: $tagId) {
      id
      hasBeenDeleted
    }
  }
`,_s=`
  mutation DeleteSubtag($subtagId: String!) {
    deleteSubtag(subtagId: $subtagId) {
      id
      hasBeenDeleted
    }
  }
`,Ns=e=>{const[d,a]=b.useState([]),[w,u]=b.useState([]),[P,x]=b.useState(null),[g,p]=b.useState(!1),[v,F]=b.useState(null),[T,o]=b.useState(null),[H,Q]=b.useState(!1),[k,s]=b.useState(!1),[L,X]=b.useState(""),[ee,Z]=b.useState(""),[ie,U]=b.useState(!1),[l,_]=b.useState(!1),n=async()=>{var i,$;e("Fetching tags from API"),p(!0);try{const C=await ue();if(!C){e("No token available for fetching tags");return}const q=await(await fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${C}`},body:JSON.stringify({query:Cs,variables:{fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(e("Tags API response:",q),q.errors){console.error("GraphQL errors:",q.errors),e(`GraphQL errors: ${JSON.stringify(q.errors)}`);return}const Y=((($=(i=q==null?void 0:q.data)==null?void 0:i.fetchRelations)==null?void 0:$.items)||[]).map(ae=>{var ce,ne;return{id:ae.id,tagTitle:ae.tagTitle,TagType:ae.TagType,points:ae.points,createdAt:ae.createdAt,updatedAt:ae.updatedAt,subtags:((ne=(ce=ae.subtags)==null?void 0:ce.items)==null?void 0:ne.map(me=>({id:me.id,tagTitle:me.tagTitle,subtagTitle:me.subtagTitle,TagType:me.TagType,points:me.points,createdAt:me.createdAt,updatedAt:me.updatedAt})))||[]}});e(`Fetched ${Y.length} tags`),a(Y)}catch(C){console.error("Error fetching tags:",C),e(`Error fetching tags: ${C}`)}finally{p(!1)}},A=i=>{if(e(`Selecting tag for photo application: ${i.tagTitle}`),!w.find(C=>C.tagTitle===i.tagTitle)){const C={tagTitle:i.tagTitle,TagType:i.TagType,subtags:[]};u(V=>[...V,C]),e(`Tag ${i.tagTitle} added to selection for photo application`)}},J=i=>{e(`Unselecting tag from photo application: ${i.tagTitle}`),u($=>$.filter(C=>C.tagTitle!==i.tagTitle)),P===i.id&&x(null)},O=i=>{e(`Selecting subtag for photo application: ${i.subtagTitle} for tag: ${i.tagTitle}`),u($=>$.map(C=>C.tagTitle===i.tagTitle&&!C.subtags.find(q=>q.subtagTitle===i.subtagTitle)?{...C,subtags:[...C.subtags,{TagType:i.TagType,tagTitle:i.tagTitle,subtagTitle:i.subtagTitle}]}:C))},de=i=>{e(`Unselecting subtag from photo application: ${i.subtagTitle} for tag: ${i.tagTitle}`),u($=>$.map(C=>C.tagTitle===i.tagTitle?{...C,subtags:C.subtags.filter(V=>V.subtagTitle!==i.subtagTitle)}:C))},ge=i=>{e(`Setting displayed tag: ${i}`),x(i)},m=i=>w.some($=>$.tagTitle===i.tagTitle),y=i=>{const $=w.find(C=>C.tagTitle===i.tagTitle);return($==null?void 0:$.subtags.some(C=>C.subtagTitle===i.subtagTitle))||!1},N=()=>{if(!P)return[];const i=d.find($=>$.id===P);return(i==null?void 0:i.subtags)||[]},f=()=>{e("Clearing all selected tags"),u([]),x(null)},D=()=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(i){const $=Math.random()*16|0;return(i=="x"?$:$&3|8).toString(16)}),S=async(i,$)=>{if(e(`Adding new tag: ${i} of type: ${$}`),!i.trim())return e("Cannot add tag with empty title"),!1;U(!0);try{if(!await ue())return e("No token available for adding tag"),!1;if(await(async()=>(e("PLACEHOLDER: Would send GraphQL mutation to add tag",{mutation:Ds,variables:{tagInput:{tagTitle:i.trim(),TagType:$,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(K=>setTimeout(K,500)),!0))()){const K={id:D(),tagTitle:i.trim(),TagType:$,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3),subtags:[]};return a(Y=>[K,...Y]),A(K),ge(K.id),X(""),Q(!1),e(`Successfully added new tag for photo application: ${i}`),!0}return!1}catch(C){return console.error("Error adding new tag:",C),e(`Error adding new tag: ${C}`),!1}finally{U(!1)}},j=async(i,$,C)=>{if(e(`Adding new subtag: ${$} to tag: ${i}`),!$.trim())return e("Cannot add subtag with empty title"),!1;if(!P)return e("No displayed tag for adding subtag"),!1;_(!0);try{if(!await ue())return e("No token available for adding subtag"),!1;if(await(async()=>(e("PLACEHOLDER: Would send GraphQL mutation to add subtag",{mutation:Es,variables:{subtagInput:{tagTitle:i,subtagTitle:$.trim(),TagType:C,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(Y=>setTimeout(Y,500)),!0))()){const Y={id:D(),tagTitle:i,subtagTitle:$.trim(),TagType:C,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3)};return a(ae=>ae.map(ce=>ce.id===P?{...ce,subtags:[Y,...ce.subtags||[]]}:ce)),O(Y),Z(""),s(!1),e(`Successfully added new subtag for photo application: ${$}`),!0}return!1}catch(V){return console.error("Error adding new subtag:",V),e(`Error adding new subtag: ${V}`),!1}finally{_(!1)}},R=async i=>{e(`Deleting tag: ${i}`),F(i);try{if(!await ue())return e("No token available for deleting tag"),!1;if(await(async()=>(e("PLACEHOLDER: Would send GraphQL mutation to delete tag",{mutation:Fs,variables:{tagId:i}}),await new Promise(q=>setTimeout(q,500)),!0))()){a(K=>K.filter(Y=>Y.id!==i));const q=d.find(K=>K.id===i);return q&&J(q),P===i&&ge(null),e(`Successfully deleted tag: ${i}`),!0}return!1}catch($){return console.error("Error deleting tag:",$),e(`Error deleting tag: ${$}`),!1}finally{F(null)}},M=async i=>{e(`Deleting subtag: ${i}`),o(i);try{if(!await ue())return e("No token available for deleting subtag"),!1;if(await(async()=>(e("PLACEHOLDER: Would send GraphQL mutation to delete subtag",{mutation:_s,variables:{subtagId:i}}),await new Promise(q=>setTimeout(q,500)),!0))()){let q=null;return a(K=>K.map(Y=>{var ce;const ae=((ce=Y.subtags)==null?void 0:ce.filter(ne=>ne.id===i?(q=ne,!1):!0))||[];return{...Y,subtags:ae}})),q&&de(q),e(`Successfully deleted subtag: ${i}`),!0}return!1}catch($){return console.error("Error deleting subtag:",$),e(`Error deleting subtag: ${$}`),!1}finally{o(null)}},W=async(i,$)=>(e(`Placeholder: Updating tag points: ${i} to ${$}`),!1),pe=()=>{Q(!0),X("")},te=()=>{Q(!1),X("")},oe=()=>{s(!0),Z("")},be=()=>{s(!1),Z("")},fe=async()=>L.trim()?await S(L,"File"):!1,se=async()=>{if(ee.trim()&&P){const i=d.find($=>$.id===P);if(i)return await j(i.tagTitle,ee,i.TagType)}return!1};return b.useEffect(()=>{n()},[]),{tags:d,selectedTags:w,displayedTagId:P,isLoadingTags:g,tagIdBeingDeleted:v,subtagIdBeingDeleted:T,isAddingNewTag:H,isAddingNewSubtag:k,newTagTitle:L,newSubtagTitle:ee,isSubmittingNewTag:ie,isSubmittingNewSubtag:l,fetchTags:n,selectTag:A,unselectTag:J,selectSubtag:O,unselectSubtag:de,setDisplayedTag:ge,clearSelectedTags:f,isTagSelected:m,isSubtagSelected:y,getDisplayedTagSubtags:N,setTagIdBeingDeleted:F,setSubtagIdBeingDeleted:o,addNewTag:S,addNewSubtag:j,deleteTag:R,deleteSubtag:M,updateTagPoints:W,startAddingNewTag:pe,cancelAddingNewTag:te,startAddingNewSubtag:oe,cancelAddingNewSubtag:be,submitNewTag:fe,submitNewSubtag:se,setNewTagTitle:X,setNewSubtagTitle:Z}},Rs=B.div`
  margin: 16px 0;
`,Ge=B.div`
  margin-bottom: 12px;
`,qe=B.h3`
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  display: flex;
  align-items: center;
  gap: 8px;
`,He=B.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  min-height: 32px;
`,Je=B.button`
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
`,zs=B(Je)`
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
`,Qe=B.button`
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
`,Os=B.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
`,Ve=B.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
`,Ye=B.button`
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
`,Ms=B.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border: 1px solid #007bff;
  border-radius: 12px;
  background: white;
`,Bs=B.input`
  border: none;
  outline: none;
  font-size: 12px;
  background: transparent;
  min-width: 80px;
  max-width: 200px;

  &::placeholder {
    color: #999;
  }
`,Be=B.button`
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
`,Us=B.span`
  background: #6c757d;
  color: white;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: bold;
`,Ws=({tag:e,isSelected:d,isDisplayed:a,isBeingDeleted:w,disabled:u,onTagClick:P,onDeleteTag:x,getTagDisplayText:g})=>{const[p,v]=b.useState(!1);return t.jsxs(Je,{$isSelected:d,$isDisplayed:a,$isBeingDeleted:w,disabled:u,onClick:()=>P(e),onMouseEnter:()=>v(!0),onMouseLeave:()=>v(!1),children:[g(e),p&&!u&&!w&&t.jsx(Qe,{onClick:F=>{F.stopPropagation(),x(e.id)},disabled:w,children:"×"})]})},Ks=({subtag:e,isSelected:d,isBeingDeleted:a,disabled:w,onSubtagClick:u,onDeleteSubtag:P})=>{const[x,g]=b.useState(!1);return t.jsxs(zs,{$isSelected:d,$isBeingDeleted:a,disabled:w,onClick:()=>u(e),onMouseEnter:()=>g(!0),onMouseLeave:()=>g(!1),children:[e.subtagTitle,x&&!w&&!a&&t.jsx(Qe,{onClick:p=>{p.stopPropagation(),P(e.id)},disabled:a,children:"×"})]})},Xe=({value:e,onChange:d,onSubmit:a,onCancel:w,isSubmitting:u,placeholder:P="Enter tag name..."})=>{const x=b.useRef(null);b.useEffect(()=>{x.current&&x.current.focus()},[]);const g=p=>{p.key==="Enter"?a():p.key==="Escape"&&w()};return t.jsxs(Ms,{children:[t.jsx(Bs,{ref:x,type:"text",value:e,onChange:p=>d(p.target.value),onKeyDown:g,placeholder:P,disabled:u}),t.jsx(Be,{onClick:a,disabled:!e.trim()||u,title:"Add (Enter)",children:u?"...":"✓"}),t.jsx(Be,{onClick:w,disabled:u,title:"Cancel (Escape)",children:"×"})]})},Gs=({tagsManager:e,disabled:d=!1,enhancedLog:a})=>{const{tags:w,selectedTags:u,displayedTagId:P,isLoadingTags:x,tagIdBeingDeleted:g,isAddingNewTag:p,newTagTitle:v,isSubmittingNewTag:F,selectTag:T,unselectTag:o,setDisplayedTag:H,isTagSelected:Q,deleteTag:k,startAddingNewTag:s,cancelAddingNewTag:L,submitNewTag:X,setNewTagTitle:ee}=e,Z=n=>{if(d)return;const A=Q(n),J=P===n.id;A?A&&!J?(H(n.id),a(`Displayed tag: ${n.tagTitle}`)):A&&J&&(o(n),H(null),a(`Unselected tag: ${n.tagTitle}`)):(T(n),H(n.id),a(`Selected tag for photo application: ${n.tagTitle}`))},ie=async n=>{if(d)return;a(`Delete tag initiated: ${n}`);const A=await k(n);a(A?`Tag successfully deleted: ${n}`:`Failed to delete tag: ${n}`)},U=async()=>{await X()||a("Failed to submit new tag")},l=n=>{const A=u.find(O=>O.tagTitle===n.tagTitle);if(!A||A.subtags.length===0)return n.tagTitle;const J=A.subtags.map(O=>O.subtagTitle).join(" || ");return`${n.tagTitle}  |  ${J}`},_=[...w].sort((n,A)=>n.points!==A.points?A.points-n.points:A.updatedAt-n.updatedAt);return t.jsxs(Rs,{children:[t.jsxs(Ge,{children:[t.jsxs(qe,{children:["Tag the selected photos",u.length>0&&t.jsxs(Us,{children:[u.length," selected"]})]}),t.jsx(He,{children:x?t.jsx(Os,{children:"Loading tags..."}):t.jsxs(t.Fragment,{children:[_.map(n=>t.jsx(Ws,{tag:n,isSelected:Q(n),isDisplayed:P===n.id,isBeingDeleted:g===n.id,disabled:d,onTagClick:Z,onDeleteTag:ie,getTagDisplayText:l},n.id)),p?t.jsx(Xe,{value:v,onChange:ee,onSubmit:U,onCancel:L,isSubmitting:F,placeholder:"Enter tag name..."}):t.jsx(Ye,{disabled:d,onClick:s,children:"+ Add Tag"}),_.length===0&&!p&&t.jsx(Ve,{children:"No tags available"})]})})]}),P&&t.jsx(qs,{tagsManager:e,disabled:d,enhancedLog:a}),u.length>0&&t.jsxs("div",{style:{marginTop:"12px",padding:"12px 16px",background:"#e7f3ff",borderRadius:"6px",fontSize:"13px",color:"#0c5aa6",border:"1px solid #b3d9ff"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"6px"},children:[t.jsx("span",{children:"✅"}),t.jsx("strong",{children:"Tags Applied:"})]}),"All selected files will have ",t.jsxs("strong",{children:[u.length," tag",u.length!==1?"s":""]})," applied to them when you save the album.",t.jsx("br",{}),t.jsx("strong",{children:"Selected tags:"})," ",u.map(n=>{const A=n.subtags.map(J=>J.subtagTitle);return A.length>0?`${n.tagTitle} (${A.join(", ")})`:n.tagTitle}).join(", ")]})]})},qs=({tagsManager:e,disabled:d=!1,enhancedLog:a})=>{var U;const{displayedTagId:w,subtagIdBeingDeleted:u,isAddingNewSubtag:P,newSubtagTitle:x,isSubmittingNewSubtag:g,selectSubtag:p,unselectSubtag:v,isSubtagSelected:F,deleteSubtag:T,startAddingNewSubtag:o,cancelAddingNewSubtag:H,submitNewSubtag:Q,setNewSubtagTitle:k}=e,s=w?((U=e.tags.find(l=>l.id===w))==null?void 0:U.subtags)||[]:[],L=e.tags.find(l=>l.id===w),X=l=>{if(d)return;F(l)?(v(l),a(`Unselected subtag for photo application: ${l.subtagTitle}`)):(p(l),a(`Selected subtag for photo application: ${l.subtagTitle}`))},ee=async l=>{if(d)return;a(`Delete subtag initiated: ${l}`);const _=await T(l);a(_?`Subtag successfully deleted: ${l}`:`Failed to delete subtag: ${l}`)},Z=async()=>{await Q()||a("Failed to submit new subtag")};if(!L)return null;const ie=[...s].sort((l,_)=>l.points!==_.points?_.points-l.points:_.updatedAt-l.updatedAt);return t.jsxs(Ge,{children:[t.jsxs(qe,{children:['Subtags for "',L.tagTitle,'"']}),t.jsxs(He,{children:[ie.map(l=>t.jsx(Ks,{subtag:l,isSelected:F(l),isBeingDeleted:u===l.id,disabled:d,onSubtagClick:X,onDeleteSubtag:ee},l.id)),P?t.jsx(Xe,{value:x,onChange:k,onSubmit:Z,onCancel:H,isSubmitting:g,placeholder:"Enter subtag name..."}):t.jsx(Ye,{disabled:d,onClick:o,children:"+ Add Subtag"}),ie.length===0&&!P&&t.jsx(Ve,{children:"No subtags available"})]})]})},Hs=({children:e,t:d,isRTL:a})=>t.jsxs("div",{style:{padding:"24px",marginBottom:"24px",backgroundColor:"#f8f9fa",border:"2px solid #e9ecef",borderRadius:"12px",direction:a?"rtl":"ltr"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",fontSize:"18px",color:"#495057",fontWeight:"600",marginBottom:"20px",flexDirection:a?"row-reverse":"row"},children:[t.jsx("span",{style:{marginRight:a?"0":"12px",marginLeft:a?"12px":"0",fontSize:"20px"},children:"🏷️"}),d("Click files below to select them for tagging")]}),e]}),Js=({selectedPhotos:e,selectedPhotoIndices:d,onToggleSelection:a,onSelectAll:w,onDeselectAll:u,onRemovePhoto:P,onDeleteAll:x,disabled:g,t:p,isRTL:v})=>e.length===0?null:t.jsxs("div",{style:{marginBottom:"24px",direction:v?"rtl":"ltr"},children:[t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",flexDirection:v?"row-reverse":"row"},children:[t.jsxs("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:[p("New Files")," (",e.length,")"]}),t.jsxs("div",{style:{display:"flex",gap:"8px",flexDirection:v?"row-reverse":"row"},children:[t.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:g?"#f8f9fa":"#fff",color:g?"#999":"#333",cursor:g?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:d.size===e.length?u:w,disabled:g,onMouseEnter:F=>{g||(F.currentTarget.style.backgroundColor="#f8f9fa")},onMouseLeave:F=>{g||(F.currentTarget.style.backgroundColor="#fff")},children:d.size===e.length?p("Deselect All"):p("Select All")}),t.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #dc3545",borderRadius:"4px",backgroundColor:g?"#f8f9fa":"#fff",color:g?"#999":"#dc3545",cursor:g?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:x,disabled:g,onMouseEnter:F=>{g||(F.currentTarget.style.backgroundColor="#dc3545",F.currentTarget.style.color="#fff")},onMouseLeave:F=>{g||(F.currentTarget.style.backgroundColor="#fff",F.currentTarget.style.color="#dc3545")},children:p("Delete All")})]})]}),t.jsx(As,{selectedPhotos:e,selectedPhotoIndices:d,isSavingAlbum:g,onRemovePhoto:P,onTogglePhotoSelection:a,onSelectAllPhotos:w,onDeselectAllPhotos:u,hideHeader:!0})]}),Qs=({existingFiles:e,selectedExistingIndices:d,onToggleSelection:a,onSelectAll:w,onDeselectAll:u,onDeleteFile:P,disabled:x,t:g,isRTL:p})=>e.length===0?null:t.jsxs("div",{style:{marginBottom:"24px",direction:p?"rtl":"ltr"},children:[t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",flexDirection:p?"row-reverse":"row"},children:[t.jsxs("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:[g("Existing Files")," (",e.length,")"]}),t.jsx("div",{style:{display:"flex",gap:"8px",flexDirection:p?"row-reverse":"row"},children:t.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:x?"#f8f9fa":"#fff",color:x?"#999":"#333",cursor:x?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:d.size===e.length?u:w,disabled:x,onMouseEnter:v=>{x||(v.currentTarget.style.backgroundColor="#f8f9fa")},onMouseLeave:v=>{x||(v.currentTarget.style.backgroundColor="#fff")},children:d.size===e.length?g("Deselect All"):g("Select All")})})]}),t.jsx("div",{style:{display:"flex",overflowX:"auto",gap:"12px",padding:"16px",border:"2px dashed #007bff",borderRadius:"8px",backgroundColor:"#fff",scrollbarWidth:"thin",scrollbarColor:"#007bff #f8f9fa"},children:e.map((v,F)=>{const T=d.has(F);return t.jsxs("div",{style:{position:"relative",width:"160px",height:"160px",flexShrink:0,borderRadius:"8px",overflow:"hidden",border:T?"3px solid #007bff":"2px solid #ddd",cursor:x?"not-allowed":"pointer",opacity:x?.6:1,transition:"all 0.2s ease"},onClick:()=>!x&&a(F),children:[t.jsx(rs,{thumbnailDataKey:v.thumbnailDataKey,dataKey:v.dataKey,alt:g("Existing file"),style:{width:"100%",height:"100%",objectFit:"cover"}}),T&&t.jsx("div",{style:{position:"absolute",bottom:"8px",left:"8px",right:"8px",background:"rgba(0, 123, 255, 0.9)",color:"white",padding:"4px 8px",borderRadius:"4px",fontSize:"11px",fontWeight:"bold",textAlign:"center",zIndex:10},children:"SELECTED"}),T&&!x&&t.jsx("button",{onClick:o=>{o.stopPropagation(),confirm(g("Are you sure you want to remove this file?"))&&P(F)},style:{position:"absolute",top:"8px",right:"8px",width:"24px",height:"24px",borderRadius:"50%",border:"none",backgroundColor:"rgba(220, 53, 69, 0.9)",color:"white",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px",fontWeight:"900",zIndex:20,transition:"all 0.2s ease",boxShadow:"0 2px 4px rgba(0,0,0,0.3)",lineHeight:"1"},onMouseEnter:o=>{o.currentTarget.style.backgroundColor="rgba(200, 35, 51, 1)",o.currentTarget.style.transform="scale(1.1)"},onMouseLeave:o=>{o.currentTarget.style.backgroundColor="rgba(220, 53, 69, 0.9)",o.currentTarget.style.transform="scale(1)"},title:g("Remove file"),children:"×"}),v.dataInBytes>0&&t.jsxs("div",{style:{position:"absolute",bottom:"4px",left:"4px",backgroundColor:"rgba(0,0,0,0.7)",color:"white",fontSize:"10px",padding:"2px 4px",borderRadius:"4px"},children:[(v.dataInBytes/(1024*1024)).toFixed(1),"MB"]}),v.durationInSeconds&&t.jsxs("div",{style:{position:"absolute",top:"8px",left:"8px",backgroundColor:"rgba(0,0,0,0.7)",color:"white",fontSize:"10px",padding:"2px 4px",borderRadius:"4px"},children:[Math.floor(v.durationInSeconds/60),":",String(Math.floor(v.durationInSeconds%60)).padStart(2,"0")]})]},`existing-${F}-${v.dataKey}`)})})]}),Vs=()=>{const{t:e,language:d}=Ue(),a=Pe(d)==="rtl",w=Zt(e),{setShowUsernamePrompt:u,setUsernameInput:P}=w,[x,g]=b.useState(null),[p,v]=b.useState(!1),[F,T]=b.useState(0),[o,H]=b.useState(""),[Q,k]=b.useState(""),[s,L]=b.useState(!1),[X,ee]=b.useState(!1),[Z,ie]=b.useState("NoPassword"),[U,l]=b.useState(""),[_,n]=b.useState(!1),[A,J]=b.useState(!0),[O,de]=b.useState(null),[ge,m]=b.useState(!1),[y,N]=b.useState([]),[f,D]=b.useState(!1),[S,j]=b.useState(new Set),[R,M]=b.useState(new Map),[W,pe]=b.useState([]),[te,oe]=b.useState(new Set),[be,fe]=b.useState(new Map),[se,i]=b.useState(!1),$=r=>{!x&&r&&g(r)},{fileInputRef:C,selectedPhotos:V,setSelectedPhotos:q,isUploading:K,progressTracker:Y,setProgressTracker:ae,debugMessages:ce,currentFolderId:ne,openFilePicker:me,handleFileSelection:Ze,setEditingExistingAlbum:Le,log:Te}=es($,!0);b.useEffect(()=>{(async()=>{try{await Et(),Te("🔥 Save-album page S3 credentials prewarmed successfully")}catch(h){Te(`⚠️ Save-album page credential prewarming failed: ${String(h)}`)}})()},[]);const I=(r,h)=>{let z=`[${new Date().toISOString()}] ${r}`;if(h!==void 0)try{const G=typeof h=="object"?JSON.stringify(h,null,2):String(h);z+=`
Data: ${G}`,console.log(z),console.log("Data object:",h)}catch(G){z+=` [Error stringifying data: ${G}]`,console.log(z),console.log("Raw data:",h)}else console.log(z);Te(z)},et=async r=>{var h,E,z,G;if(r){i(!0),I(`Fetching existing album data for folder ID: ${r}`);try{const re=await ue();if(!re){I("❌ Authentication failed while fetching existing album data");return}const $t=`
        mutation FetchRelations($fetchRelationsInput: FetchRelationsInput!) {
          fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
            items {
              ... on FolderPosition {
                ${ss}
              }
            }
          }
        }
      `,Tt={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}},ye=await(await fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${re}`},body:JSON.stringify({query:$t,variables:Tt})})).json();if(ye.errors){console.error("GraphQL errors:",ye.errors),I(`❌ Failed to fetch existing album data: ${JSON.stringify(ye.errors)}`);return}const De=(((E=(h=ye==null?void 0:ye.data)==null?void 0:h.fetchRelations)==null?void 0:E.items)||[]).find(le=>le&&le.folder&&le.folder.id===r);if(!De)return;const he=De.folder,Ee=(((G=(z=he==null?void 0:he.fileReferencesPage)==null?void 0:z.items)==null?void 0:G.map(le=>le.file))||[]).filter(le=>le&&le.dataKey).map(le=>({dataKey:le.dataKey,thumbnailDataKey:le.thumbnailDataKey||null,durationInSeconds:le.durationInSeconds||null,dataInBytes:le.dataInBytes||0}));pe(Ee),I(`✅ Successfully loaded ${Ee.length} existing files`),!o&&he.folderName&&H(he.folderName),!Q&&he.folderDescription&&k(he.folderDescription),Le(r)}catch(re){console.error("Failed to fetch existing album data:",re),I(`❌ Failed to fetch existing album data: ${String(re)}`)}finally{i(!1)}}};b.useEffect(()=>{x&&x!==ne&&(I(`Loading existing files for folder ID: ${x}`),et(x))},[x,ne]);const tt=Ns(I),{cognitoUsername:ke,publicUsername:ve,setPublicUsername:st}=Is(g,q,de,L,H,k,n,J,ie,l,m,N,I),{saveAlbumDirectly:Ce}=Ps(x||ne,ke,V,ge,y,o,Q,_,A,Z,U,R,v,T,q,ae,I);b.useEffect(()=>{ne&&!x&&(g(ne),I(`Updated folder ID from upload processor: ${ne}`))},[ne,x]),b.useEffect(()=>{j(r=>{const h=new Set;return r.forEach(E=>{E<V.length&&h.add(E)}),h}),M(r=>{const h=new Map(r),E=[];return r.forEach((z,G)=>{G>=V.length&&E.push(G)}),E.forEach(z=>{h.delete(z)}),h})},[V.length]),b.useEffect(()=>{oe(r=>{const h=new Set;return r.forEach(E=>{E<W.length&&h.add(E)}),h}),fe(r=>{const h=new Map(r),E=[];return r.forEach((z,G)=>{G>=W.length&&E.push(G)}),E.forEach(z=>{h.delete(z)}),h})},[W.length]);const rt=r=>{I(`Removing photo at index: ${r}`);const h=V.filter((E,z)=>z!==r);q(h),I(`New files count: ${h.length}`),h.length>0?(localStorage.setItem(xe.SELECTED_PHOTOS,JSON.stringify(h)),I(`Updated localStorage with ${h.length} photos`)):(localStorage.removeItem(xe.SELECTED_PHOTOS),I("Removed photos from localStorage")),j(E=>{const z=new Set;return E.forEach(G=>{G<r?z.add(G):G>r&&z.add(G-1)}),z}),M(E=>{const z=new Map;return E.forEach((G,re)=>{re<r?z.set(re,G):re>r&&z.set(re-1,G)}),z})},it=r=>{I(`Removing existing file at index: ${r}`);const h=W.filter((E,z)=>z!==r);pe(h),I(`New existing files count: ${h.length}`),oe(E=>{const z=new Set;return E.forEach(G=>{G<r?z.add(G):G>r&&z.add(G-1)}),z}),fe(E=>{const z=new Map;return E.forEach((G,re)=>{re<r?z.set(re,G):re>r&&z.set(re-1,G)}),z})},ot=r=>{I(`Toggling selection for existing file at index: ${r}`),oe(h=>{const E=new Set(h);return E.has(r)?(E.delete(r),I(`Deselected existing file ${r}`)):(E.add(r),I(`Selected existing file ${r}`)),E})},at=()=>{I("Selecting all existing files");const r=new Set;for(let h=0;h<W.length;h++)r.add(h);oe(r)},nt=()=>{I("Deselecting all existing files"),oe(new Set)},lt=r=>{I(`Toggling selection for photo at index: ${r}`),j(h=>{const E=new Set(h);return E.has(r)?(E.delete(r),I(`Deselected photo ${r}`)):(E.add(r),I(`Selected photo ${r}`)),E})},dt=()=>{I("Selecting all photos");const r=new Set;for(let h=0;h<V.length;h++)r.add(h);j(r)},ct=()=>{I("Deselecting all photos"),j(new Set)},ut=()=>{confirm(e("Are you sure you want to delete all new files? This action cannot be undone."))&&(I("Deleting all new photos"),q([]),j(new Set),M(new Map),localStorage.removeItem(xe.SELECTED_PHOTOS),I("Cleared all photos from localStorage"))},pt=()=>{const r=!_;I(`Toggling isOnPublicProfile to: ${r}`),n(r)},ft=()=>{const r=!A;I(`Toggling participantsCanAddItems to: ${r}`),J(r)},gt=async()=>{I("Album save initiated"),I("Photo tags applied:",Object.fromEntries(R)),I("Existing file tags applied:",Object.fromEntries(be)),D(!1),v(!0);try{if(ve!=null&&ve.startsWith("Profile-")){I("Public username starts with 'Profile-', showing username prompt"),P(""),u(!0),v(!1);return}I("Valid username found, proceeding to save album directly with file-level tagging"),Ce()}catch(r){console.error("Error in handleSaveAlbum:",r),I(`Error in handleSaveAlbum: ${r}`),v(!1)}},mt=r=>{I(`Handling successful username update to: ${r}`),localStorage.setItem(xe.PUBLIC_USERNAME,r),st(r),u(!1),I("Proceeding to save album after username update"),Ce()},xt=(r,h)=>{I(`Password dialog closed with option: ${r}, password: ${h?"******":"undefined"}`),r&&ie(r),h!==void 0&&l(h),ee(!1)},ht=()=>{I("Opening password dialog"),ee(!0)},bt=()=>{I("Add photos button clicked"),me(x)},yt=()=>{D(!f)},Se=r=>{r(),D(!1)};b.useEffect(()=>{const r=h=>{const E=h.target;f&&!E.closest(".settings-dropdown-container")&&D(!1)};return f&&document.addEventListener("mousedown",r),()=>{document.removeEventListener("mousedown",r)}},[f]);const Ie=p||K||se,wt=V.length>0||W.length>0,St=S.size>0||te.size>0;return t.jsxs(t.Fragment,{children:[t.jsx(qt,{}),t.jsx(Ht,{children:t.jsxs(Jt,{children:[t.jsx(Qt,{href:"my-albums.html",children:e("My Albums")}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[t.jsx(Re,{$primary:!0,onClick:gt,disabled:p||K||se,style:{minWidth:"120px",fontSize:"14px",padding:"8px 16px"},children:e(p?"Saving...":"Save Album")}),O===!0&&t.jsxs("div",{className:"settings-dropdown-container",style:{position:"relative",display:"flex",alignItems:"center"},children:[t.jsx("button",{onClick:yt,disabled:p||K||se,style:{background:"none",border:"none",cursor:p||K||se?"not-allowed":"pointer",padding:"8px",borderRadius:"4px",display:"flex",alignItems:"center",justifyContent:"center",color:p||K||se?"#ccc":"#666",fontSize:"18px",transition:"all 0.2s ease",backgroundColor:f?"#f0f0f0":"transparent",opacity:p||K||se?.5:1},onMouseEnter:r=>{!f&&!p&&!K&&!se&&(r.currentTarget.style.backgroundColor="#f8f9fa")},onMouseLeave:r=>{!f&&!p&&!K&&!se&&(r.currentTarget.style.backgroundColor="transparent")},title:e("Album Settings"),children:"⚙️"}),f&&!p&&!K&&!se&&t.jsxs(Vt,{style:{minWidth:"280px"},children:[t.jsx($e,{onClick:()=>Se(pt),children:t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[t.jsx("span",{children:e(_?"Remove From Public Profile":"Add To Public Profile")}),t.jsx("span",{style:{fontSize:"12px",color:_?"#28a745":"#6c757d",fontWeight:"bold"},children:_?"✓":"○"})]})}),t.jsx($e,{onClick:()=>Se(ft),children:t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[t.jsx("span",{children:e("Participants Can Add Items")}),t.jsx("span",{style:{fontSize:"12px",color:A?"#28a745":"#6c757d",fontWeight:"bold"},children:A?"✓":"○"})]})}),t.jsx($e,{onClick:()=>Se(()=>{I("Participants Can Delete Items clicked - functionality not yet implemented")}),style:{opacity:.6},children:t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[t.jsx("span",{children:e("Participants Can Delete Items")}),t.jsx("span",{style:{fontSize:"12px",color:"#6c757d",fontWeight:"bold"},children:"○"})]})}),t.jsx($e,{onClick:()=>Se(ht),children:t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[t.jsx("span",{children:e("Album Password Policy")}),t.jsx("span",{style:{fontSize:"12px",color:Z!=="NoPassword"?"#28a745":"#6c757d",fontWeight:"bold"},children:Z!=="NoPassword"?"✓":"○"})]})})]})]})]})]})}),t.jsxs(Yt,{$isRTL:a,children:[t.jsx("div",{style:{marginTop:s&&O===!0?"24px":"0"},children:t.jsx(ks,{showFolderDetails:s,isCreator:O,folderName:o,setFolderName:H,folderDescription:Q,setFolderDescription:k,isSavingAlbum:p||K})}),(K||Y.totalFiles>0&&(Y.filesUploading>0||Y.filesProcessing>0||Y.filesComplete<Y.totalFiles))&&t.jsx(ts,{progressTracker:Y,isRTL:Pe(d)==="rtl",variant:"detailed",context:"saving",isUploading:K,showSuccessMessage:!1,showErrorMessage:!0,customMessages:{error:e("Some photos could not be processed. You can continue with the successfully processed photos.")}}),t.jsx("input",{ref:C,id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:r=>Ze(r,ke),style:{display:"none"}}),s&&O===!0&&wt&&t.jsxs(Hs,{t:e,isRTL:a,children:[W.length>0&&t.jsx("div",{style:{marginBottom:"24px"},children:t.jsx(Qs,{existingFiles:W,selectedExistingIndices:te,onToggleSelection:ot,onSelectAll:at,onDeselectAll:nt,onDeleteFile:it,disabled:Ie,t:e,isRTL:a})}),t.jsx(Js,{selectedPhotos:V,selectedPhotoIndices:S,onToggleSelection:lt,onSelectAll:dt,onDeselectAll:ct,onRemovePhoto:rt,onDeleteAll:ut,disabled:Ie,t:e,isRTL:a}),St&&t.jsx("div",{style:{marginTop:"24px"},children:t.jsx(Gs,{tagsManager:tt,disabled:Ie,enhancedLog:I})})]}),t.jsx(js,{isSavingAlbum:p,savingProgress:F}),t.jsx(Xt,{children:t.jsx(Re,{onClick:bt,disabled:p||K||se,children:e(K?"Uploading...":"Add More Photos")})}),t.jsx(Lt,{t:e,language:d,usernameManager:w,onSuccess:mt}),t.jsx($s,{isOpen:X,onClose:xt,initialOption:Z,initialPassword:U}),t.jsx(Ts,{debugMessages:ce,t:e,isRTL:a,textDirection:a?"rtl":"ltr"})]})]})},Ys=()=>t.jsx(Dt,{children:t.jsx(Vs,{})});Ct.createRoot(document.getElementById("root")).render(t.jsx(Ys,{}));
