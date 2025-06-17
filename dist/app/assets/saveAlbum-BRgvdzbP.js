import{d as B,u as Ue,a as b,j as e,g as Pe,h as ue,L as xe,i as Ee,s as vt,m as It,f as we,k as Pt,l as At,n as jt,r as kt,R as Ct,I as Dt,p as Ft}from"./utils-DWLWZiq9.js";import{C as Ae,F as _e,e as Ne,f as Et,g as _t,P as Nt,h as Rt,i as We,j as Ke,k as zt,l as Ot,S as Mt,m as Bt,V as Ut,n as Wt,o as Kt,M as Gt,G as qt,p as Ht,q as Jt,r as Qt,D as Vt,s as $e,B as Re,t as Yt,u as Xt}from"./styled-components-B0YI4FuM.js";import{u as Zt,U as Lt}from"./useUsernameManagement-BJxP8BDN.js";import{u as es,U as ts}from"./useFileUploadProcessor-BqbxkK04.js";import{F as ss}from"./types-B2_92tNb.js";import{L as rs}from"./LazyImage-DKl7VXhz.js";const c={colors:{primary:"#007bff",primaryDark:"#0056b3",secondary:"#6c757d",success:"#4caf50",danger:"#e53935",warning:"#ff9800",white:"#fff",text:{primary:"#333",secondary:"#666",light:"#777"},background:{primary:"#f9fafb",highlight:"#f0f7ff"},border:"#ddd"},spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px"},borderRadius:{small:"4px",medium:"8px"},boxShadow:{lg:"0 4px 10px rgba(0,0,0,0.08)"}},is=B.div`
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
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
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
  border: 2px solid ${t=>t.$isSelected?c.colors.primary:c.colors.border};
  border-radius: ${c.borderRadius.medium};
  padding: ${c.spacing.lg};
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${t=>t.$isSelected?c.colors.background.highlight:c.colors.white};
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
  background-color: ${t=>t.$variant==="danger"?c.colors.danger:t.$variant==="secondary"?"transparent":t.$variant==="success"?c.colors.success:c.colors.primary};
  color: ${t=>t.$variant==="secondary"?c.colors.primary:c.colors.white};
  border: ${t=>t.$variant==="secondary"?`1px solid ${c.colors.primary}`:"none"};
  padding: ${t=>t.$size==="small"?"8px 16px":t.$size==="large"?"16px 32px":"12px 24px"};
  border-radius: ${c.borderRadius.medium};
  cursor: ${t=>t.disabled?"not-allowed":"pointer"};
  font-size: ${t=>t.$size==="small"?"14px":t.$size==="large"?"18px":"16px"};
  font-weight: 500;
  transition: all 0.2s ease;
  opacity: ${t=>t.disabled?.6:1};
  min-width: 100px;

  &:hover:not(:disabled) {
    background-color: ${t=>t.$variant==="danger"?"#c62828":t.$variant==="secondary"?c.colors.background.highlight:t.$variant==="success"?"#388e3c":c.colors.primaryDark};
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
`,Ss=[{value:"NotVisible",titleKey:"Password Required To See Or Save",descriptionKey:"Album will be completely hidden until correct password is entered"},{value:"Watermark",titleKey:"Watermarked And No Saving Without Password",descriptionKey:"Photos will be visible with watermarks, password required to save"},{value:"CannotBeSaved",titleKey:"Password Required To Save",descriptionKey:"Photos are visible but password required to download or save"},{value:"NoPassword",titleKey:"No Password",descriptionKey:"Album is fully public with no restrictions"}],$s=({isOpen:t,onClose:d,initialOption:a="NoPassword",initialPassword:w=""})=>{const{t:u,language:P}=Ue(),x=Pe(P)==="rtl",[g,p]=b.useState(a),[v,E]=b.useState(w);if(b.useEffect(()=>{t&&(p(a),E(w))},[t,a,w]),!t)return null;const S=v.trim()==="",o=k=>{p(k)},H=k=>{k.target===k.currentTarget&&d()},Q=k=>k!=="NoPassword";return e.jsxs(e.Fragment,{children:[e.jsx(is,{onClick:H}),e.jsx(os,{children:e.jsx(as,{children:e.jsxs(ns,{$isRTL:x,children:[e.jsx(ls,{children:u("Album Password Policy")}),e.jsx(ds,{children:u("Configure password protection for your album. Choose how you want to restrict access to your photos.")}),e.jsxs(ze,{children:[e.jsx(Oe,{children:u("Enter Password")}),e.jsx(cs,{type:"text",placeholder:u("Enter password (optional)"),value:v,onChange:k=>E(k.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"})]}),e.jsxs(ze,{children:[e.jsx(Oe,{children:u("Select Protection Level")}),e.jsx(us,{children:Ss.map(k=>e.jsxs(ps,{$isSelected:g===k.value,onClick:()=>o(k.value),children:[e.jsx(ms,{type:"radio",name:"protection",checked:g===k.value,onChange:()=>o(k.value)}),e.jsxs(fs,{children:[e.jsx(gs,{children:e.jsx(xs,{children:u(k.titleKey)})}),e.jsx(hs,{children:u(k.descriptionKey)}),S&&Q(k.value)&&g===k.value&&e.jsx(bs,{children:u('⚠️ Will use "password" as default if left empty')})]})]},k.value))})]}),Q(g)&&e.jsxs(ws,{children:[e.jsx("strong",{children:u("💡 Password Protection Info:")}),e.jsx("br",{}),u('If you leave the password field empty, "password" will be used as the default password. You can change this anytime in album settings.')]}),e.jsxs(ys,{children:[e.jsx(Me,{$variant:"secondary",onClick:()=>d(),children:u("Cancel")}),e.jsx(Me,{$variant:"primary",onClick:()=>{const k=S&&Q(g)?"password":v;console.log(`Saving with option: ${g}, password: ${k.length>0?"********":"none"}`),d(g,k)},children:u("Save Settings")})]})]})})})]})},Ts=({debugMessages:t,t:d,isRTL:a,textDirection:w})=>t.length===0?null:e.jsxs("div",{style:{marginTop:"40px",background:"#fff3cd",padding:"16px",borderRadius:"8px",border:"1px solid #ffeeba",maxWidth:900,margin:"0 auto",direction:w},children:[e.jsx("h3",{style:{marginTop:0,fontSize:"18px",color:"#856404",textAlign:a?"right":"left"},children:d("Debug Log")}),e.jsx("pre",{style:{fontSize:"14px",color:"#856404",whiteSpace:"pre-wrap",maxHeight:"400px",overflow:"auto",textAlign:a?"right":"left"},children:t.map((u,P)=>e.jsx("div",{style:{marginBottom:"8px"},children:u},P))})]}),vs=`
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
`,Is=(t,d,a,w,u,P,x,g,p,v,E,S,o)=>{const[H,Q]=b.useState(null),[k,s]=b.useState(null),L=async U=>{o(`Initializing folder ID with username: ${U}`);try{const _=new URLSearchParams(window.location.search).get("folderId");if(o(`Folder ID from URL: ${_||"null"}`),_){t(_),o(`Using existing folder ID: ${_}`);try{o(`Fetching details for folder: ${_}`);const n=await X(_,o);if(o("Folder details retrieved:",n),n){const A=`${U}_____${U}____Account`,J=n.creatorId===A;if(o(`User is creator of folder: ${J}, accountId: ${A}, creator: ${n.creatorId}`),a(J),J){o("User is creator, showing folder details"),w(!0),u(n.folderName),P(n.folderDescription),x(n.isOnPublicProfile),o(`Setting isOnPublicProfile: ${n.isOnPublicProfile}`),n.participantsCanAddItems!==void 0&&(g(n.participantsCanAddItems),o(`Setting participantsCanAddItems: ${n.participantsCanAddItems}`));const O=n.passwordPolicy;o(`Password policy from folder details: ${O}`),p(O),O!=="NoPassword"&&n.password&&v(n.password),o(`Set password protection option to: ${O}`)}else o("User is NOT the creator, hiding editable fields"),w(!1)}else o("No folder details retrieved, setting isCreator to true"),a(!0),w(!0)}catch(n){console.error("Error fetching folder details:",n),o(`Error fetching folder details: ${n}`),a(!1)}}else{const n=`${U}_____${Ee()}____Folder`;o(`Creating new folder ID: ${n}`),t(n),o("Setting isCreator to true for new album"),a(!0),w(!0)}}catch(l){console.error("Folder ID initialization error:",l),o(`Folder ID initialization error: ${l}`),a(!1)}},X=async(U,l)=>{var _,n,A,J,O,de,ge,m;l(`Fetching details for folder ID: ${U}`);try{const y=await ue();if(!y)return l("No token available for fetching folder details"),null;l("Sending GraphQL query to fetch folder details");const f=await(await fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${y}`},body:JSON.stringify({query:vs,variables:{folderIds:[U],fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(l("Folder details API response:",f),f.errors)return console.error("GraphQL errors:",f.errors),l(`GraphQL errors: ${JSON.stringify(f.errors)}`),null;const D=((n=(_=f==null?void 0:f.data)==null?void 0:_.fetchFolders)==null?void 0:n.items)||[];if(l(`Found ${D.length} folder items`),D.length===0)return l("No folder items found"),null;const $=D[0];l("Retrieved folder data:",$);const j=((J=(A=$.folderPosition)==null?void 0:A.profileIds)==null?void 0:J.some(M=>M.includes("Public____Profile")))||!1;l(`Folder is on public profile: ${j}`),l("Profile IDs:",(O=$.folderPosition)==null?void 0:O.profileIds);const R=(de=$.folderInviteParameters)==null?void 0:de.usingFolderInviteGrantsRightToAddItems;return l(`Participants can add items: ${R}`),{creatorId:$.creatorId||"",folderName:$.folderName||"",folderDescription:$.folderDescription||"",passwordPolicy:((ge=$.folderPassword)==null?void 0:ge.policy)||"NoPassword",password:((m=$.folderPassword)==null?void 0:m.password)||"",isOnPublicProfile:j,participantsCanAddItems:R!==void 0?R:!0}}catch(y){return console.error("Error in fetchFolderDetails:",y),l(`Error in fetchFolderDetails: ${y}`),null}},ee=()=>{o("Attempting to restore photos from localStorage");try{const U=localStorage.getItem(xe.SELECTED_PHOTOS);if(o(`Found stored photos: ${U?"yes":"no"}`),U)try{const l=JSON.parse(U);o(`Parsed ${l.length} photos from localStorage`),Array.isArray(l)&&l.length>0&&(d(l),o(`Restored ${l.length} photos to state`))}catch(l){console.error("Error parsing stored photos:",l),o(`Error parsing stored photos: ${l}`)}}catch(U){console.error("Error restoring photos from storage:",U),o(`Error restoring photos from storage: ${U}`)}},Z=()=>{o("Testing S3 connection");try{vt?o("S3 client is available"):(console.error("S3 client not available"),o("S3 client not available"))}catch(U){console.error("S3 connection test error:",U),o(`S3 connection test error: ${U}`)}},ie=async()=>{var U;o("Starting component initialization");try{o("Checking login with refresh");const l=await ue();if(!l){o("No token returned from login check, aborting initialization");return}try{const _=localStorage.getItem(xe.PUBLIC_USERNAME);o(`Retrieved public username from localStorage: ${_||"null"}`),s(_||null);const A=JSON.parse(atob(l.split(".")[1]))["cognito:username"];if(A){o(`Extracted Cognito username from token: ${A}`),Q(A);const J=localStorage.getItem(xe.SUB_ALBUM_DATA);if(o(`Sub-album data from localStorage: ${J||"null"}`),J)try{const O=JSON.parse(J);if(o("Parsed sub-album data:",O),O.isSubAlbum&&((U=O.selectedFileIds)==null?void 0:U.length)>0){o(`Valid sub-album data found with ${O.selectedFileIds.length} files`),E(!0),S(O.selectedFileIds),O.selectedPhotos&&O.selectedPhotos.length>0&&(o(`Found ${O.selectedPhotos.length} selected photos in sub-album data`),d(O.selectedPhotos)),w(!0),a(!0);const de=`${A}_____${Ee()}____Folder`;o(`Generated new folder ID for sub-album: ${de}`),t(de)}else o("Invalid sub-album data, proceeding with normal initialization"),await L(A)}catch(O){console.error("Error parsing sub-album data:",O),o(`Error parsing sub-album data: ${O}`),await L(A)}else o("No sub-album data found, proceeding with normal folder initialization"),await L(A)}else o("No Cognito username found in token")}catch(_){console.error("User data initialization error:",_),o(`User data initialization error: ${_}`)}ee(),Z(),o("Component initialization completed")}catch(l){console.error("Initialization error:",l),o(`Initialization error: ${l}`)}};return b.useEffect(()=>{ie()},[]),{cognitoUsername:H,publicUsername:k,setPublicUsername:s}},Ps=(t,d,a,w,u,P,x,g,p,v,E,S,o,H,Q,k,s)=>{const L=m=>(s(`Converting ${m.length} tags to API format`),m.map(y=>({TagType:y.TagType,tagTitle:y.tagTitle,selectedSubtagInputs:y.subtags.map(N=>({TagType:y.TagType,tagTitle:N.tagTitle,subtagTitle:N.subtagTitle}))}))),X=m=>{s(`Save progress text: ${m}`);const y=document.getElementById("saveProgressText");y&&(y.innerText=m)},ee=m=>{const y=document.getElementById("saveProgress");y?(y.style.width=`${m}%`,s(`Updated save progress bar: ${m}%`)):s("Progress bar element not found"),H(m)},Z=(m,y)=>{s(`Splitting array of ${m.length} items into chunks of ${y}`);const N=[];for(let f=0;f<m.length;f+=y)N.push(m.slice(f,f+y));return s(`Created ${N.length} chunks`),N},ie=m=>{const y=new Set;return m.filter(N=>y.has(N.fileId)?(s(`Skipping duplicate file reference with ID: ${N.fileId}`),!1):(y.add(N.fileId),!0))},U=(m,y,N)=>{s("Creating folder position input WITHOUT folder-level tags"),s(`Profile visibility: ${g?"Public":"Only Me"}`);const f=g?[`${d}_____Public____Profile`]:["Only Me_____Only Me____Profile"];s(`Profile IDs: ${JSON.stringify(f)}`);let D=[];w&&u.length>0&&(s(`Creating file reference IDs for ${u.length} sub-album files`),D=u.map(M=>{const W=M.split("_____");if(W.length>=2){const te=W[1].split("____")[0],oe=`${N}_____${te}____FileReference`;return s(`Created file reference ID for sub-album: ${oe}`),oe}return s(`Using original fileId as fallback: ${M}`),M})),s(`Created ${D.length} acceptedFileReferenceIds`);const $=v!=="NoPassword"?E:null;if(s(`Password protection: ${v}`),s(`Album password: ${$?"******":"null"}`),s(`Participants can add items: ${p}`),!t)throw s("Error: folderId is null or undefined"),new Error("folderId is required to create folder position input");const j=Pt(t),R=At(j);return{currentTime:m,folderId:t,profileIds:f,folderPositionPoints:1,acceptedFileReferenceIds:D,folderInput:{folderAboutContactIds:[y],albumNanoId:R,folderName:P,folderDescription:x,folderPasswordInput:{password:$,policy:v},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,usingFolderInviteGrantsRightToRemoveItems:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:p,addedItemsNeedFolderCreatorApproval:!1}}}},l=(m,y,N)=>(s(`Creating file reference inputs with individual photo tags for ${m.length} photos`),m.map((f,D)=>{var W;const $=S.get(D)||[],j=L($);if(s(`Photo ${D} (${f.fileName}): ${$.length} tags applied`),f.fileId)return s(`Using existing fileId for photo: ${f.fileId}`),{fileReferencesHolderId:t,currentTime:y,points:1,hasBeenDeleted:!1,selectedTagInputs:j,fileId:f.fileId,fileInput:null};const R=f.type==="video"||(W=f.type)!=null&&W.startsWith("video")?`Input/Video/${f.fileName}`:`Input/Image/${f.fileName}`,M=`${d}_____${f.fileName}____File`;return s(`Created file reference for ${f.fileName}:`),s(`  - dataKey: ${R}`),s(`  - fileId: ${M}`),s(`  - thumbnailDataKey: ${f.thumbnailDataKey||"undefined"}`),s(`  - size: ${f.size}`),s(`  - thumbnailSize: ${f.thumbnailSize||0}`),s(`  - duration: ${f.duration||"undefined"}`),s(`  - tags: ${$.length} tags selected for this photo`),{fileReferencesHolderId:t,currentTime:y,points:1,hasBeenDeleted:!1,selectedTagInputs:j,fileId:M,fileInput:{fileId:M,ownerFileInput:{editorContactIds:[N],FileSharingOptionsEnum:"Anyone",dataKey:R,thumbnailDataKey:f.thumbnailDataKey,dataInBytes:f.size,thumbnailDataInBytes:f.thumbnailSize||0,s3UploadedAt:y,durationInSeconds:f.duration},editorFileInput:{aboutContactIds:[N],captionText:"",numericFilterInputs:[]}}}})),_=async m=>{var D,$;s("Sending folder-only mutation (no file references, no folder tags)");const y=await ue();if(!y)throw s("No token available for saving album, aborting"),new Error("Authentication token not available");const N=`
      mutation MyMutation($folderPositionInputs: [FolderPositionInput!]) {
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items {
            id
          }
        }
      }
    `,f={folderPositionInputs:[m]};s("GraphQL folder-only mutation variables:",f);try{s("Sending API request to save folder");const j=await fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${y}`},body:JSON.stringify({query:N,variables:f})});s(`API response status: ${j.status}`);const R=await j.text();s(`API response raw text: ${R}`);const M=JSON.parse(R);if(s("API response JSON:",M),M.errors)throw console.error("Folder save failed:",M.errors),s("Folder save failed with errors:",M.errors),new Error("Failed to save folder");return s("Folder saved successfully"),(($=(D=M.data)==null?void 0:D.changeFiles)==null?void 0:$.items)||[]}catch(j){throw console.error("Error in sendFolderOnlyMutation:",j),s(`Error in sendFolderOnlyMutation: ${j}`),j}},n=async m=>{var D,$,j,R,M;s(`Sending file references-only mutation with ${m.length} items (each with individual tags)`);const y=await ue();if(!y)throw s("No token available for saving file references, aborting"),new Error("Authentication token not available");const N=`
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
    `,f={updatedFileReferenceInputs:m};s("GraphQL file references-only mutation variables (first item):",m.length>0?m[0]:"No items");try{s("Sending API request to save file references with individual tags");const W=await fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${y}`},body:JSON.stringify({query:N,variables:f})});s(`API response status: ${W.status}`);const pe=await W.text();s(`API response raw text: ${pe.substring(0,500)}...`);const te=JSON.parse(pe);if(s("API response JSON items count:",((j=($=(D=te.data)==null?void 0:D.changeFiles0)==null?void 0:$.items)==null?void 0:j.length)||0),te.errors)throw console.error("File references save failed:",te.errors),s("File references save failed with errors:",te.errors),new Error("Failed to save file references");return s("File references chunk saved successfully with individual photo tags"),((M=(R=te.data)==null?void 0:R.changeFiles0)==null?void 0:M.items)||[]}catch(W){throw console.error("Error in sendFileReferencesOnlyMutation:",W),s(`Error in sendFileReferencesOnlyMutation: ${W}`),W}},A=async(m,y)=>{var $,j,R,M,W,pe,te,oe,be;s(`Sending final chunk with folder mutation (${m.length} file references, no folder tags)`);const N=await ue();if(!N)throw s("No token available for saving final chunk, aborting"),new Error("Authentication token not available");const f=`
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
    `,D={folderPositionInputs:[y],updatedFileReferenceInputs:m};s("GraphQL final mutation variables (folder + last chunk, no folder tags)");try{s("Sending API request for final save with folder (no folder tags)");const fe=await fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${N}`},body:JSON.stringify({query:f,variables:D})});s(`API response status: ${fe.status}`);const se=await fe.text();s(`API response raw text: ${se.substring(0,500)}...`);const i=JSON.parse(se);if(s("API response JSON:",{fileReferencesCount:((R=(j=($=i.data)==null?void 0:$.changeFiles0)==null?void 0:j.items)==null?void 0:R.length)||0,folderItems:((W=(M=i.data)==null?void 0:M.changeFiles)==null?void 0:W.items)||[]}),i.errors)throw console.error("Final save failed:",i.errors),s("Final save failed with errors:",i.errors),new Error("Failed to complete album save");return s("Final chunk and folder saved successfully (with individual photo tags)"),{fileReferences:((te=(pe=i.data)==null?void 0:pe.changeFiles0)==null?void 0:te.items)||[],folderPositions:((be=(oe=i.data)==null?void 0:oe.changeFiles)==null?void 0:be.items)||[]}}catch(fe){throw console.error("Error in sendFinalChunkWithFolderMutation:",fe),s(`Error in sendFinalChunkWithFolderMutation: ${fe}`),fe}},J=async()=>(s("Validating required data"),await ue()?d?t?(s("All required data validated successfully"),!0):(s("No folder ID, validation failed"),!1):(s("No Cognito username, validation failed"),!1):(s("No token available, validation failed"),!1)),O=()=>{s("Handling successful save"),jt(Q,k,[xe.SELECTED_PHOTOS,xe.SUB_ALBUM_DATA],s),s("Album data cleared");const m=document.getElementById("saveProgressText");m&&(m.innerText="Album saved successfully!",s("Updated progress text to 'Album saved successfully!'")),sessionStorage.setItem("album_just_saved","true"),s("Set 'album_just_saved' flag in sessionStorage"),s("Setting timeout for redirect to my-albums.html"),setTimeout(()=>{s("Redirecting to my-albums.html"),kt("my-albums.html")},1e3)},de=async(m,y)=>{s("Starting chunked save process (individual photo tags, no folder tags)");try{X("Processing files in chunks...");const N=48;if(y.length===0)s("No file references to process, saving only folder position (no folder tags)"),await _(m);else{const f=ie(y);s(`After removing duplicates, processing ${f.length} unique file references`);const D=Z(f,N);s(`Split file references into ${D.length} chunks of max size ${N}`);for(let $=0;$<D.length;$++){const j=D[$];s(`Processing chunk ${$+1} of ${D.length} with ${j.length} file references`);const R=$/D.length*80;H(10+R),ee(10+R),$<D.length-1?(X(`Saving files: chunk ${$+1} of ${D.length}...`),await n(j)):(X("Finalizing album..."),await A(j,m))}}H(100),ee(100),X("Album saved successfully!"),O()}catch(N){console.error("Error in chunked save process:",N),s(`Error in chunked save process: ${N}`),X(`Error: ${N}`),o(!1)}};return{saveAlbumDirectly:async()=>{s("Starting direct album save with individual photo tagging"),s(`Photo tags map: ${S.size} photos have tags applied`),o(!0),H(5);try{if(s("Validating required data for save"),!await J()){s("Required data validation failed, aborting save"),o(!1);return}const m=Math.floor(Date.now()/1e3),y=`${d}_____${d}____Account`,f=t.split("_____")[1].split("____")[0];s(`Save timestamp: ${m}`),s(`Account ID: ${y}`),s(`Folder ID: ${t}`),s(`Folder target item identifier: ${f}`),s("Creating folder position input (no folder tags)");const D=U(m,y,f);s("Folder position input created:",D);let $=[];const j=a.filter(R=>R.status==="complete");if(s(`Found ${j.length} valid photos with 'complete' status`),j.length>0){const R=j.filter(W=>!W.fileId);s(`Found ${R.length} new uploads to move from temp to public folder`),R.length>0&&(s("Moving files from temp to public folder"),await It(R,ee,s)),s("Creating file reference inputs for uploads with individual photo tags");const M=l(j,m,y);s(`Created ${M.length} file reference inputs for uploads`,M),$=$.concat(M)}if(w&&u.length>0){s(`Adding ${u.length} existing file references for sub-album`);const R=u.map(M=>(s(`Creating file reference for existing file ID: ${M}`),{fileReferencesHolderId:t,currentTime:m,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:M,fileInput:null}));s(`Created ${R.length} file reference inputs for existing files`,R),$=$.concat(R)}s(`Total file reference inputs: ${$.length}`),s("Sending GraphQL mutations with chunked file references (individual photo tags)"),await de(D,$)}catch(m){console.error("Error in saveAlbumDirectly:",m),s(`Error in saveAlbumDirectly: ${m}`),o(!1)}}}},As=({selectedPhotos:t,selectedPhotoIndices:d,isSavingAlbum:a,onRemovePhoto:w,onTogglePhotoSelection:u,onSelectAllPhotos:P,onDeselectAllPhotos:x,hideHeader:g=!1})=>{const{t:p}=je();if(t.length===0)return null;const v=d.size>0,E=d.size===t.length;return e.jsxs(e.Fragment,{children:[!g&&t.length>1&&e.jsx(Ae,{style:{marginBottom:"16px",border:"2px solid #007bff"},children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px"},children:[e.jsx("span",{style:{fontWeight:"bold",fontSize:"14px",color:"#007bff"},children:v?p("{{count}} file(s) selected for tagging",{count:d.size}):p("Click files below to select them for tagging")}),e.jsxs("div",{style:{display:"flex",gap:"8px",marginLeft:"auto"},children:[!E&&e.jsx("button",{onClick:P,disabled:a,style:{padding:"6px 12px",border:"1px solid #007bff",borderRadius:"4px",background:"#007bff",color:"white",fontSize:"12px",cursor:"pointer",fontWeight:"bold"},children:p("Select All")}),v&&e.jsx("button",{onClick:x,disabled:a,style:{padding:"6px 12px",border:"1px solid #6c757d",borderRadius:"4px",background:"transparent",color:"#6c757d",fontSize:"12px",cursor:"pointer"},children:p("Deselect All")})]})]})}),e.jsx(zt,{children:t.map((S,o)=>{var Q,k;const H=d.has(o);return e.jsxs(Ot,{"data-selected":H?"true":"false",style:{position:"relative",cursor:t.length>1?"pointer":"default"},onClick:()=>t.length>1&&u(o),children:[H&&!a&&e.jsx("button",{onClick:s=>{s.stopPropagation(),confirm(p("Are you sure you want to remove this photo?"))&&w(o)},style:{position:"absolute",top:"6px",right:"6px",width:"18px",height:"18px",borderRadius:"50%",border:"none",backgroundColor:"rgba(220, 53, 69, 0.8)",color:"white",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:"bold",zIndex:15,opacity:0,transition:"all 0.2s ease",transform:"scale(0.8)"},onMouseEnter:s=>{s.currentTarget.style.backgroundColor="rgba(200, 35, 51, 0.9)",s.currentTarget.style.transform="scale(1)",s.currentTarget.style.opacity="1"},onMouseLeave:s=>{s.currentTarget.style.backgroundColor="rgba(220, 53, 69, 0.8)",s.currentTarget.style.transform="scale(0.8)",s.currentTarget.style.opacity="0"},title:p("Remove photo"),children:"×"}),t.length>1&&H&&e.jsx("div",{style:{position:"absolute",bottom:"8px",left:"8px",right:"8px",background:"rgba(0, 123, 255, 0.9)",color:"white",padding:"4px 8px",borderRadius:"6px",fontSize:"11px",fontWeight:"600",textAlign:"center",zIndex:10,backdropFilter:"blur(4px)"},children:"SELECTED"}),S.status!=="complete"&&e.jsx(Mt,{$status:S.status,children:S.status==="error"?"✕":S.status==="uploading"?"↑":S.status==="processing"?"⚙️":"•"}),e.jsxs(Bt,{style:{opacity:t.length===1||!H?1:.85,transition:"opacity 0.2s ease"},children:[S.type==="video"||(Q=S.type)!=null&&Q.startsWith("video")?e.jsx(Ut,{src:S.s3PreviewUrl,controls:!0}):e.jsx(Wt,{src:S.s3PreviewUrl,alt:S.fileName}),(S.status==="uploading"||S.status==="processing")&&e.jsx(We,{$bottom:"4px",$left:"4px",$right:"4px",$height:"4px",children:e.jsx(Ke,{$progress:S.progress,$status:S.status})})]}),e.jsxs(Kt,{children:[(k=S.type)!=null&&k.startsWith("video")?p("Video"):p("Image"),S.size&&` • ${(S.size/1024/1024).toFixed(1)} MB`,S.duration&&` • ${S.duration}s`]}),S.status==="error"&&S.errorMessage&&e.jsxs(Gt,{$type:"error",children:[p("Error"),": ",S.errorMessage.length>40?S.errorMessage.substring(0,37)+"...":S.errorMessage]})]},o)})}),e.jsx("style",{children:`
          [data-selected="true"]:hover button {
            opacity: 1 !important;
            transform: scale(1) !important;
          }
        `})]})},js=({isSavingAlbum:t,savingProgress:d})=>{const{t:a}=je();return t?e.jsxs(Ae,{children:[e.jsx(Nt,{children:a("Saving Album")}),e.jsx(Rt,{id:"saveProgressText",children:a("Moving files...")}),e.jsx(We,{children:e.jsx(Ke,{id:"saveProgress",$progress:d/100})})]}):null},ks=({showFolderDetails:t,isCreator:d,folderName:a,setFolderName:w,folderDescription:u,setFolderDescription:P,isSavingAlbum:x})=>{const{t:g}=je();return!t||d!==!0?null:e.jsxs(Ae,{children:[e.jsxs(_e,{children:[e.jsx(Ne,{htmlFor:"folderName",children:g("Album Name")}),e.jsx(Et,{id:"folderName",type:"text",value:a,onChange:p=>w(p.target.value),placeholder:g("e.g. Family Vacation in Kyoto"),disabled:x})]}),e.jsxs(_e,{children:[e.jsx(Ne,{htmlFor:"folderDescription",children:g("Album Description")}),e.jsx(_t,{id:"folderDescription",value:u,onChange:p=>P(p.target.value),placeholder:g("e.g. what's special about this album"),rows:4,disabled:x})]})]})},je=()=>({t:(t,d)=>d&&typeof d=="object"&&"count"in d?t.replace("{{count}}",String(d.count)):t,language:"en"}),Cs=`
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
`,Fs=`
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
`,Es=`
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
`,Ns=t=>{const[d,a]=b.useState([]),[w,u]=b.useState([]),[P,x]=b.useState(null),[g,p]=b.useState(!1),[v,E]=b.useState(null),[S,o]=b.useState(null),[H,Q]=b.useState(!1),[k,s]=b.useState(!1),[L,X]=b.useState(""),[ee,Z]=b.useState(""),[ie,U]=b.useState(!1),[l,_]=b.useState(!1),n=async()=>{var i,T;t("Fetching tags from API"),p(!0);try{const C=await ue();if(!C){t("No token available for fetching tags");return}const q=await(await fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${C}`},body:JSON.stringify({query:Cs,variables:{fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(t("Tags API response:",q),q.errors){console.error("GraphQL errors:",q.errors),t(`GraphQL errors: ${JSON.stringify(q.errors)}`);return}const Y=(((T=(i=q==null?void 0:q.data)==null?void 0:i.fetchRelations)==null?void 0:T.items)||[]).map(ae=>{var ce,ne;return{id:ae.id,tagTitle:ae.tagTitle,TagType:ae.TagType,points:ae.points,createdAt:ae.createdAt,updatedAt:ae.updatedAt,subtags:((ne=(ce=ae.subtags)==null?void 0:ce.items)==null?void 0:ne.map(me=>({id:me.id,tagTitle:me.tagTitle,subtagTitle:me.subtagTitle,TagType:me.TagType,points:me.points,createdAt:me.createdAt,updatedAt:me.updatedAt})))||[]}});t(`Fetched ${Y.length} tags`),a(Y)}catch(C){console.error("Error fetching tags:",C),t(`Error fetching tags: ${C}`)}finally{p(!1)}},A=i=>{if(t(`Selecting tag for photo application: ${i.tagTitle}`),!w.find(C=>C.tagTitle===i.tagTitle)){const C={tagTitle:i.tagTitle,TagType:i.TagType,subtags:[]};u(V=>[...V,C]),t(`Tag ${i.tagTitle} added to selection for photo application`)}},J=i=>{t(`Unselecting tag from photo application: ${i.tagTitle}`),u(T=>T.filter(C=>C.tagTitle!==i.tagTitle)),P===i.id&&x(null)},O=i=>{t(`Selecting subtag for photo application: ${i.subtagTitle} for tag: ${i.tagTitle}`),u(T=>T.map(C=>C.tagTitle===i.tagTitle&&!C.subtags.find(q=>q.subtagTitle===i.subtagTitle)?{...C,subtags:[...C.subtags,{TagType:i.TagType,tagTitle:i.tagTitle,subtagTitle:i.subtagTitle}]}:C))},de=i=>{t(`Unselecting subtag from photo application: ${i.subtagTitle} for tag: ${i.tagTitle}`),u(T=>T.map(C=>C.tagTitle===i.tagTitle?{...C,subtags:C.subtags.filter(V=>V.subtagTitle!==i.subtagTitle)}:C))},ge=i=>{t(`Setting displayed tag: ${i}`),x(i)},m=i=>w.some(T=>T.tagTitle===i.tagTitle),y=i=>{const T=w.find(C=>C.tagTitle===i.tagTitle);return(T==null?void 0:T.subtags.some(C=>C.subtagTitle===i.subtagTitle))||!1},N=()=>{if(!P)return[];const i=d.find(T=>T.id===P);return(i==null?void 0:i.subtags)||[]},f=()=>{t("Clearing all selected tags"),u([]),x(null)},D=()=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(i){const T=Math.random()*16|0;return(i=="x"?T:T&3|8).toString(16)}),$=async(i,T)=>{if(t(`Adding new tag: ${i} of type: ${T}`),!i.trim())return t("Cannot add tag with empty title"),!1;U(!0);try{if(!await ue())return t("No token available for adding tag"),!1;if(await(async()=>(t("PLACEHOLDER: Would send GraphQL mutation to add tag",{mutation:Ds,variables:{tagInput:{tagTitle:i.trim(),TagType:T,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(K=>setTimeout(K,500)),!0))()){const K={id:D(),tagTitle:i.trim(),TagType:T,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3),subtags:[]};return a(Y=>[K,...Y]),A(K),ge(K.id),X(""),Q(!1),t(`Successfully added new tag for photo application: ${i}`),!0}return!1}catch(C){return console.error("Error adding new tag:",C),t(`Error adding new tag: ${C}`),!1}finally{U(!1)}},j=async(i,T,C)=>{if(t(`Adding new subtag: ${T} to tag: ${i}`),!T.trim())return t("Cannot add subtag with empty title"),!1;if(!P)return t("No displayed tag for adding subtag"),!1;_(!0);try{if(!await ue())return t("No token available for adding subtag"),!1;if(await(async()=>(t("PLACEHOLDER: Would send GraphQL mutation to add subtag",{mutation:Fs,variables:{subtagInput:{tagTitle:i,subtagTitle:T.trim(),TagType:C,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(Y=>setTimeout(Y,500)),!0))()){const Y={id:D(),tagTitle:i,subtagTitle:T.trim(),TagType:C,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3)};return a(ae=>ae.map(ce=>ce.id===P?{...ce,subtags:[Y,...ce.subtags||[]]}:ce)),O(Y),Z(""),s(!1),t(`Successfully added new subtag for photo application: ${T}`),!0}return!1}catch(V){return console.error("Error adding new subtag:",V),t(`Error adding new subtag: ${V}`),!1}finally{_(!1)}},R=async i=>{t(`Deleting tag: ${i}`),E(i);try{if(!await ue())return t("No token available for deleting tag"),!1;if(await(async()=>(t("PLACEHOLDER: Would send GraphQL mutation to delete tag",{mutation:Es,variables:{tagId:i}}),await new Promise(q=>setTimeout(q,500)),!0))()){a(K=>K.filter(Y=>Y.id!==i));const q=d.find(K=>K.id===i);return q&&J(q),P===i&&ge(null),t(`Successfully deleted tag: ${i}`),!0}return!1}catch(T){return console.error("Error deleting tag:",T),t(`Error deleting tag: ${T}`),!1}finally{E(null)}},M=async i=>{t(`Deleting subtag: ${i}`),o(i);try{if(!await ue())return t("No token available for deleting subtag"),!1;if(await(async()=>(t("PLACEHOLDER: Would send GraphQL mutation to delete subtag",{mutation:_s,variables:{subtagId:i}}),await new Promise(q=>setTimeout(q,500)),!0))()){let q=null;return a(K=>K.map(Y=>{var ce;const ae=((ce=Y.subtags)==null?void 0:ce.filter(ne=>ne.id===i?(q=ne,!1):!0))||[];return{...Y,subtags:ae}})),q&&de(q),t(`Successfully deleted subtag: ${i}`),!0}return!1}catch(T){return console.error("Error deleting subtag:",T),t(`Error deleting subtag: ${T}`),!1}finally{o(null)}},W=async(i,T)=>(t(`Placeholder: Updating tag points: ${i} to ${T}`),!1),pe=()=>{Q(!0),X("")},te=()=>{Q(!1),X("")},oe=()=>{s(!0),Z("")},be=()=>{s(!1),Z("")},fe=async()=>L.trim()?await $(L,"File"):!1,se=async()=>{if(ee.trim()&&P){const i=d.find(T=>T.id===P);if(i)return await j(i.tagTitle,ee,i.TagType)}return!1};return b.useEffect(()=>{n()},[]),{tags:d,selectedTags:w,displayedTagId:P,isLoadingTags:g,tagIdBeingDeleted:v,subtagIdBeingDeleted:S,isAddingNewTag:H,isAddingNewSubtag:k,newTagTitle:L,newSubtagTitle:ee,isSubmittingNewTag:ie,isSubmittingNewSubtag:l,fetchTags:n,selectTag:A,unselectTag:J,selectSubtag:O,unselectSubtag:de,setDisplayedTag:ge,clearSelectedTags:f,isTagSelected:m,isSubtagSelected:y,getDisplayedTagSubtags:N,setTagIdBeingDeleted:E,setSubtagIdBeingDeleted:o,addNewTag:$,addNewSubtag:j,deleteTag:R,deleteSubtag:M,updateTagPoints:W,startAddingNewTag:pe,cancelAddingNewTag:te,startAddingNewSubtag:oe,cancelAddingNewSubtag:be,submitNewTag:fe,submitNewSubtag:se,setNewTagTitle:X,setNewSubtagTitle:Z}},Rs=B.div`
  margin: 32px 0; /* Increased spacing */
`,Ge=B.div`
  margin-bottom: 24px; /* Increased spacing */
`,qe=B.h3`
  margin: 0 0 16px 0; /* Increased spacing */
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  display: flex;
  align-items: center;
  gap: 12px; /* Increased spacing */
`,He=B.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px; /* Increased spacing */
  align-items: center;
  min-height: 32px;
`,Je=B.button`
  position: relative;
  padding: 8px 16px; /* Increased padding */
  border: 1px solid ${t=>t.$isSelected?"#007bff":"#ced4da"};
  border-radius: 20px; /* More rounded for modern look */
  background: ${t=>t.$isSelected?"#007bff":"#ffffff"};
  color: ${t=>t.$isSelected?"#ffffff":"#495057"};
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s ease; /* Smoother transition */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04); /* Soft shadow */
  
  ${t=>t.$isDisplayed&&`
    border-color: #28a745;
    background: #28a745;
    color: white;
    box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.3), 0 4px 12px rgba(40, 167, 69, 0.15);
  `}

  ${t=>t.$isBeingDeleted&&`
    opacity: 0.5;
    pointer-events: none;
  `}

  &:hover {
    background: ${t=>t.$isSelected?"#0056b3":"#f8f9fa"};
    transform: translateY(-1px); /* Subtle lift effect */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    
    ${t=>t.$isDisplayed&&`
      background: #1e7e34;
      box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.4), 0 6px 16px rgba(40, 167, 69, 0.2);
    `}
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`,zs=B(Je)`
  font-size: 12px;
  padding: 6px 12px; /* Adjusted padding */
  border-radius: 16px; /* Slightly less rounded */
`,Qe=B.button`
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
`,Os=B.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 16px; /* Added padding */
`,Ve=B.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 16px; /* Added padding */
`,Ye=B.button`
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
`,Ms=B.div`
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
`,Bs=B.input`
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
`,Be=B.button`
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
`,Us=B.span`
  background: #6c757d;
  color: white;
  padding: 3px 8px; /* Increased padding */
  border-radius: 12px; /* More rounded */
  font-size: 10px;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Soft shadow */
`,Ws=({tag:t,isSelected:d,isDisplayed:a,isBeingDeleted:w,disabled:u,onTagClick:P,onDeleteTag:x,getTagDisplayText:g})=>{const[p,v]=b.useState(!1);return e.jsxs(Je,{$isSelected:d,$isDisplayed:a,$isBeingDeleted:w,disabled:u,onClick:()=>P(t),onMouseEnter:()=>v(!0),onMouseLeave:()=>v(!1),children:[g(t),p&&!u&&!w&&e.jsx(Qe,{onClick:E=>{E.stopPropagation(),x(t.id)},disabled:w,children:"×"})]})},Ks=({subtag:t,isSelected:d,isBeingDeleted:a,disabled:w,onSubtagClick:u,onDeleteSubtag:P})=>{const[x,g]=b.useState(!1);return e.jsxs(zs,{$isSelected:d,$isBeingDeleted:a,disabled:w,onClick:()=>u(t),onMouseEnter:()=>g(!0),onMouseLeave:()=>g(!1),children:[t.subtagTitle,x&&!w&&!a&&e.jsx(Qe,{onClick:p=>{p.stopPropagation(),P(t.id)},disabled:a,children:"×"})]})},Xe=({value:t,onChange:d,onSubmit:a,onCancel:w,isSubmitting:u,placeholder:P="Enter tag name..."})=>{const x=b.useRef(null);b.useEffect(()=>{x.current&&x.current.focus()},[]);const g=p=>{p.key==="Enter"?a():p.key==="Escape"&&w()};return e.jsxs(Ms,{children:[e.jsx(Bs,{ref:x,type:"text",value:t,onChange:p=>d(p.target.value),onKeyDown:g,placeholder:P,disabled:u}),e.jsx(Be,{onClick:a,disabled:!t.trim()||u,title:"Add (Enter)",children:u?"...":"✓"}),e.jsx(Be,{onClick:w,disabled:u,title:"Cancel (Escape)",children:"×"})]})},Gs=({tagsManager:t,disabled:d=!1,enhancedLog:a})=>{const{tags:w,selectedTags:u,displayedTagId:P,isLoadingTags:x,tagIdBeingDeleted:g,isAddingNewTag:p,newTagTitle:v,isSubmittingNewTag:E,selectTag:S,unselectTag:o,setDisplayedTag:H,isTagSelected:Q,deleteTag:k,startAddingNewTag:s,cancelAddingNewTag:L,submitNewTag:X,setNewTagTitle:ee}=t,Z=n=>{if(d)return;const A=Q(n),J=P===n.id;A?A&&!J?(H(n.id),a(`Displayed tag: ${n.tagTitle}`)):A&&J&&(o(n),H(null),a(`Unselected tag: ${n.tagTitle}`)):(S(n),H(n.id),a(`Selected tag for photo application: ${n.tagTitle}`))},ie=async n=>{if(d)return;a(`Delete tag initiated: ${n}`);const A=await k(n);a(A?`Tag successfully deleted: ${n}`:`Failed to delete tag: ${n}`)},U=async()=>{await X()||a("Failed to submit new tag")},l=n=>{const A=u.find(O=>O.tagTitle===n.tagTitle);if(!A||A.subtags.length===0)return n.tagTitle;const J=A.subtags.map(O=>O.subtagTitle).join(" || ");return`${n.tagTitle}  |  ${J}`},_=[...w].sort((n,A)=>n.points!==A.points?A.points-n.points:A.updatedAt-n.updatedAt);return e.jsxs(Rs,{children:[e.jsxs(Ge,{children:[e.jsxs(qe,{children:["Tag the selected photos",u.length>0&&e.jsxs(Us,{children:[u.length," selected"]})]}),e.jsx(He,{children:x?e.jsx(Os,{children:"Loading tags..."}):e.jsxs(e.Fragment,{children:[_.map(n=>e.jsx(Ws,{tag:n,isSelected:Q(n),isDisplayed:P===n.id,isBeingDeleted:g===n.id,disabled:d,onTagClick:Z,onDeleteTag:ie,getTagDisplayText:l},n.id)),p?e.jsx(Xe,{value:v,onChange:ee,onSubmit:U,onCancel:L,isSubmitting:E,placeholder:"Enter tag name..."}):e.jsx(Ye,{disabled:d,onClick:s,children:"+ Add Tag"}),_.length===0&&!p&&e.jsx(Ve,{children:"No tags available"})]})})]}),P&&e.jsx(qs,{tagsManager:t,disabled:d,enhancedLog:a}),u.length>0&&e.jsxs("div",{style:{marginTop:"24px",padding:"20px 24px",background:"linear-gradient(135deg, #e7f3ff 0%, #f0f8ff 100%)",borderRadius:"12px",fontSize:"13px",color:"#0c5aa6",border:"1px solid #b3d9ff",boxShadow:"0 4px 12px rgba(0, 123, 255, 0.08)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"12px"},children:[e.jsx("span",{style:{fontSize:"16px"},children:"✅"}),e.jsx("strong",{style:{fontSize:"14px"},children:"Tags Applied:"})]}),e.jsxs("div",{style:{lineHeight:"1.5"},children:["All selected files will have ",e.jsxs("strong",{children:[u.length," tag",u.length!==1?"s":""]})," applied to them when you save the album.",e.jsx("br",{}),e.jsx("strong",{children:"Selected tags:"})," ",u.map(n=>{const A=n.subtags.map(J=>J.subtagTitle);return A.length>0?`${n.tagTitle} (${A.join(", ")})`:n.tagTitle}).join(", ")]})]})]})},qs=({tagsManager:t,disabled:d=!1,enhancedLog:a})=>{var U;const{displayedTagId:w,subtagIdBeingDeleted:u,isAddingNewSubtag:P,newSubtagTitle:x,isSubmittingNewSubtag:g,selectSubtag:p,unselectSubtag:v,isSubtagSelected:E,deleteSubtag:S,startAddingNewSubtag:o,cancelAddingNewSubtag:H,submitNewSubtag:Q,setNewSubtagTitle:k}=t,s=w?((U=t.tags.find(l=>l.id===w))==null?void 0:U.subtags)||[]:[],L=t.tags.find(l=>l.id===w),X=l=>{if(d)return;E(l)?(v(l),a(`Unselected subtag for photo application: ${l.subtagTitle}`)):(p(l),a(`Selected subtag for photo application: ${l.subtagTitle}`))},ee=async l=>{if(d)return;a(`Delete subtag initiated: ${l}`);const _=await S(l);a(_?`Subtag successfully deleted: ${l}`:`Failed to delete subtag: ${l}`)},Z=async()=>{await Q()||a("Failed to submit new subtag")};if(!L)return null;const ie=[...s].sort((l,_)=>l.points!==_.points?_.points-l.points:_.updatedAt-l.updatedAt);return e.jsxs(Ge,{children:[e.jsxs(qe,{children:['Subtags for "',L.tagTitle,'"']}),e.jsxs(He,{children:[ie.map(l=>e.jsx(Ks,{subtag:l,isSelected:E(l),isBeingDeleted:u===l.id,disabled:d,onSubtagClick:X,onDeleteSubtag:ee},l.id)),P?e.jsx(Xe,{value:x,onChange:k,onSubmit:Z,onCancel:H,isSubmitting:g,placeholder:"Enter subtag name..."}):e.jsx(Ye,{disabled:d,onClick:o,children:"+ Add Subtag"}),ie.length===0&&!P&&e.jsx(Ve,{children:"No subtags available"})]})]})},Hs=({children:t,t:d,isRTL:a})=>e.jsxs("div",{style:{padding:"32px",marginBottom:"32px",backgroundColor:"#f8f9fa",border:"2px solid #e9ecef",borderRadius:"12px",direction:a?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",fontSize:"18px",color:"#495057",fontWeight:"600",marginBottom:"24px",flexDirection:a?"row-reverse":"row"},children:[e.jsx("span",{style:{marginRight:a?"0":"12px",marginLeft:a?"12px":"0",fontSize:"20px"},children:"🏷️"}),d("Click files below to select them for tagging")]}),t]}),Js=({selectedPhotos:t,selectedPhotoIndices:d,onToggleSelection:a,onSelectAll:w,onDeselectAll:u,onRemovePhoto:P,onDeleteAll:x,disabled:g,t:p,isRTL:v})=>t.length===0?null:e.jsxs("div",{style:{marginBottom:"32px",direction:v?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px",flexDirection:v?"row-reverse":"row"},children:[e.jsxs("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:[p("New Files")," (",t.length,")"]}),e.jsxs("div",{style:{display:"flex",gap:"8px",flexDirection:v?"row-reverse":"row"},children:[e.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:g?"#f8f9fa":"#fff",color:g?"#999":"#333",cursor:g?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:d.size===t.length?u:w,disabled:g,onMouseEnter:E=>{g||(E.currentTarget.style.backgroundColor="#f8f9fa")},onMouseLeave:E=>{g||(E.currentTarget.style.backgroundColor="#fff")},children:d.size===t.length?p("Deselect All"):p("Select All")}),e.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #dc3545",borderRadius:"4px",backgroundColor:g?"#f8f9fa":"#fff",color:g?"#999":"#dc3545",cursor:g?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:x,disabled:g,onMouseEnter:E=>{g||(E.currentTarget.style.backgroundColor="#dc3545",E.currentTarget.style.color="#fff")},onMouseLeave:E=>{g||(E.currentTarget.style.backgroundColor="#fff",E.currentTarget.style.color="#dc3545")},children:p("Delete All")})]})]}),e.jsx(As,{selectedPhotos:t,selectedPhotoIndices:d,isSavingAlbum:g,onRemovePhoto:P,onTogglePhotoSelection:a,onSelectAllPhotos:w,onDeselectAllPhotos:u,hideHeader:!0})]}),Qs=({existingFiles:t,selectedExistingIndices:d,onToggleSelection:a,onSelectAll:w,onDeselectAll:u,onDeleteFile:P,disabled:x,t:g,isRTL:p})=>t.length===0?null:e.jsxs("div",{style:{marginBottom:"32px",direction:p?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px",flexDirection:p?"row-reverse":"row"},children:[e.jsxs("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:[g("Existing Files")," (",t.length,")"]}),e.jsx("div",{style:{display:"flex",gap:"8px",flexDirection:p?"row-reverse":"row"},children:e.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:x?"#f8f9fa":"#fff",color:x?"#999":"#333",cursor:x?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:d.size===t.length?u:w,disabled:x,onMouseEnter:v=>{x||(v.currentTarget.style.backgroundColor="#f8f9fa")},onMouseLeave:v=>{x||(v.currentTarget.style.backgroundColor="#fff")},children:d.size===t.length?g("Deselect All"):g("Select All")})})]}),e.jsx("div",{style:{display:"flex",overflowX:"auto",gap:"16px",padding:"20px",border:"2px dashed #007bff",borderRadius:"12px",backgroundColor:"#fff",boxShadow:"0 2px 8px rgba(0, 0, 0, 0.04)",scrollbarWidth:"thin",scrollbarColor:"#007bff #f8f9fa"},children:t.map((v,E)=>{const S=d.has(E);return e.jsxs("div",{style:{position:"relative",width:"160px",height:"160px",flexShrink:0,borderRadius:"12px",overflow:"hidden",border:S?"2px solid rgba(0, 123, 255, 0.6)":"2px solid #ddd",cursor:x?"not-allowed":"pointer",opacity:x?.6:1,transition:"all 0.3s ease",boxShadow:S?"0 0 0 3px rgba(0, 123, 255, 0.3), 0 4px 12px rgba(0, 123, 255, 0.15)":"0 2px 8px rgba(0, 0, 0, 0.04)",transform:S?"translateY(-2px)":"translateY(0)"},onClick:()=>!x&&a(E),children:[e.jsx(rs,{thumbnailDataKey:v.thumbnailDataKey,dataKey:v.dataKey,alt:g("Existing file"),style:{width:"100%",height:"100%",objectFit:"cover"}}),S&&e.jsx("div",{style:{position:"absolute",bottom:"8px",left:"8px",right:"8px",background:"rgba(0, 123, 255, 0.9)",color:"white",padding:"4px 8px",borderRadius:"6px",fontSize:"11px",fontWeight:"600",textAlign:"center",zIndex:10,backdropFilter:"blur(4px)"},children:"SELECTED"}),S&&!x&&e.jsx("button",{onClick:o=>{o.stopPropagation(),confirm(g("Are you sure you want to remove this file?"))&&P(E)},style:{position:"absolute",top:"6px",right:"6px",width:"18px",height:"18px",borderRadius:"50%",border:"none",backgroundColor:"rgba(220, 53, 69, 0.8)",color:"white",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:"bold",zIndex:15,opacity:0,transition:"all 0.2s ease",transform:"scale(0.8)"},onMouseEnter:o=>{o.currentTarget.style.backgroundColor="rgba(200, 35, 51, 0.9)",o.currentTarget.style.transform="scale(1)",o.currentTarget.style.opacity="1"},onMouseLeave:o=>{o.currentTarget.style.backgroundColor="rgba(220, 53, 69, 0.8)",o.currentTarget.style.transform="scale(0.8)",o.currentTarget.style.opacity="0"},title:g("Remove file"),children:"×"}),v.dataInBytes>0&&e.jsxs("div",{style:{position:"absolute",bottom:"4px",left:"4px",backgroundColor:"rgba(0,0,0,0.7)",color:"white",fontSize:"10px",padding:"2px 4px",borderRadius:"4px"},children:[(v.dataInBytes/(1024*1024)).toFixed(1),"MB"]}),v.durationInSeconds&&e.jsxs("div",{style:{position:"absolute",top:"8px",left:"8px",backgroundColor:"rgba(0,0,0,0.7)",color:"white",fontSize:"10px",padding:"2px 4px",borderRadius:"4px"},children:[Math.floor(v.durationInSeconds/60),":",String(Math.floor(v.durationInSeconds%60)).padStart(2,"0")]})]},`existing-${E}-${v.dataKey}`)})})]}),Vs=()=>{const{t,language:d}=Ue(),a=Pe(d)==="rtl",w=Zt(t),{setShowUsernamePrompt:u,setUsernameInput:P}=w,[x,g]=b.useState(null),[p,v]=b.useState(!1),[E,S]=b.useState(0),[o,H]=b.useState(""),[Q,k]=b.useState(""),[s,L]=b.useState(!1),[X,ee]=b.useState(!1),[Z,ie]=b.useState("NoPassword"),[U,l]=b.useState(""),[_,n]=b.useState(!1),[A,J]=b.useState(!0),[O,de]=b.useState(null),[ge,m]=b.useState(!1),[y,N]=b.useState([]),[f,D]=b.useState(!1),[$,j]=b.useState(new Set),[R,M]=b.useState(new Map),[W,pe]=b.useState([]),[te,oe]=b.useState(new Set),[be,fe]=b.useState(new Map),[se,i]=b.useState(!1),T=r=>{!x&&r&&g(r)},{fileInputRef:C,selectedPhotos:V,setSelectedPhotos:q,isUploading:K,progressTracker:Y,setProgressTracker:ae,debugMessages:ce,currentFolderId:ne,openFilePicker:me,handleFileSelection:Ze,setEditingExistingAlbum:Le,log:Te}=es(T,!0);b.useEffect(()=>{(async()=>{try{await Ft(),Te("🔥 Save-album page S3 credentials prewarmed successfully")}catch(h){Te(`⚠️ Save-album page credential prewarming failed: ${String(h)}`)}})()},[]);const I=(r,h)=>{let z=`[${new Date().toISOString()}] ${r}`;if(h!==void 0)try{const G=typeof h=="object"?JSON.stringify(h,null,2):String(h);z+=`
Data: ${G}`,console.log(z),console.log("Data object:",h)}catch(G){z+=` [Error stringifying data: ${G}]`,console.log(z),console.log("Raw data:",h)}else console.log(z);Te(z)},et=async r=>{var h,F,z,G;if(r){i(!0),I(`Fetching existing album data for folder ID: ${r}`);try{const re=await ue();if(!re){I("❌ Authentication failed while fetching existing album data");return}const $t=`
        mutation FetchRelations($fetchRelationsInput: FetchRelationsInput!) {
          fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
            items {
              ... on FolderPosition {
                ${ss}
              }
            }
          }
        }
      `,Tt={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}},ye=await(await fetch(we,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${re}`},body:JSON.stringify({query:$t,variables:Tt})})).json();if(ye.errors){console.error("GraphQL errors:",ye.errors),I(`❌ Failed to fetch existing album data: ${JSON.stringify(ye.errors)}`);return}const De=(((F=(h=ye==null?void 0:ye.data)==null?void 0:h.fetchRelations)==null?void 0:F.items)||[]).find(le=>le&&le.folder&&le.folder.id===r);if(!De)return;const he=De.folder,Fe=(((G=(z=he==null?void 0:he.fileReferencesPage)==null?void 0:z.items)==null?void 0:G.map(le=>le.file))||[]).filter(le=>le&&le.dataKey).map(le=>({dataKey:le.dataKey,thumbnailDataKey:le.thumbnailDataKey||null,durationInSeconds:le.durationInSeconds||null,dataInBytes:le.dataInBytes||0}));pe(Fe),I(`✅ Successfully loaded ${Fe.length} existing files`),!o&&he.folderName&&H(he.folderName),!Q&&he.folderDescription&&k(he.folderDescription),Le(r)}catch(re){console.error("Failed to fetch existing album data:",re),I(`❌ Failed to fetch existing album data: ${String(re)}`)}finally{i(!1)}}};b.useEffect(()=>{x&&x!==ne&&(I(`Loading existing files for folder ID: ${x}`),et(x))},[x,ne]);const tt=Ns(I),{cognitoUsername:ke,publicUsername:ve,setPublicUsername:st}=Is(g,q,de,L,H,k,n,J,ie,l,m,N,I),{saveAlbumDirectly:Ce}=Ps(x||ne,ke,V,ge,y,o,Q,_,A,Z,U,R,v,S,q,ae,I);b.useEffect(()=>{ne&&!x&&(g(ne),I(`Updated folder ID from upload processor: ${ne}`))},[ne,x]),b.useEffect(()=>{j(r=>{const h=new Set;return r.forEach(F=>{F<V.length&&h.add(F)}),h}),M(r=>{const h=new Map(r),F=[];return r.forEach((z,G)=>{G>=V.length&&F.push(G)}),F.forEach(z=>{h.delete(z)}),h})},[V.length]),b.useEffect(()=>{oe(r=>{const h=new Set;return r.forEach(F=>{F<W.length&&h.add(F)}),h}),fe(r=>{const h=new Map(r),F=[];return r.forEach((z,G)=>{G>=W.length&&F.push(G)}),F.forEach(z=>{h.delete(z)}),h})},[W.length]);const rt=r=>{I(`Removing photo at index: ${r}`);const h=V.filter((F,z)=>z!==r);q(h),I(`New files count: ${h.length}`),h.length>0?(localStorage.setItem(xe.SELECTED_PHOTOS,JSON.stringify(h)),I(`Updated localStorage with ${h.length} photos`)):(localStorage.removeItem(xe.SELECTED_PHOTOS),I("Removed photos from localStorage")),j(F=>{const z=new Set;return F.forEach(G=>{G<r?z.add(G):G>r&&z.add(G-1)}),z}),M(F=>{const z=new Map;return F.forEach((G,re)=>{re<r?z.set(re,G):re>r&&z.set(re-1,G)}),z})},it=r=>{I(`Removing existing file at index: ${r}`);const h=W.filter((F,z)=>z!==r);pe(h),I(`New existing files count: ${h.length}`),oe(F=>{const z=new Set;return F.forEach(G=>{G<r?z.add(G):G>r&&z.add(G-1)}),z}),fe(F=>{const z=new Map;return F.forEach((G,re)=>{re<r?z.set(re,G):re>r&&z.set(re-1,G)}),z})},ot=r=>{I(`Toggling selection for existing file at index: ${r}`),oe(h=>{const F=new Set(h);return F.has(r)?(F.delete(r),I(`Deselected existing file ${r}`)):(F.add(r),I(`Selected existing file ${r}`)),F})},at=()=>{I("Selecting all existing files");const r=new Set;for(let h=0;h<W.length;h++)r.add(h);oe(r)},nt=()=>{I("Deselecting all existing files"),oe(new Set)},lt=r=>{I(`Toggling selection for photo at index: ${r}`),j(h=>{const F=new Set(h);return F.has(r)?(F.delete(r),I(`Deselected photo ${r}`)):(F.add(r),I(`Selected photo ${r}`)),F})},dt=()=>{I("Selecting all photos");const r=new Set;for(let h=0;h<V.length;h++)r.add(h);j(r)},ct=()=>{I("Deselecting all photos"),j(new Set)},ut=()=>{confirm(t("Are you sure you want to delete all new files? This action cannot be undone."))&&(I("Deleting all new photos"),q([]),j(new Set),M(new Map),localStorage.removeItem(xe.SELECTED_PHOTOS),I("Cleared all photos from localStorage"))},pt=()=>{const r=!_;I(`Toggling isOnPublicProfile to: ${r}`),n(r)},ft=()=>{const r=!A;I(`Toggling participantsCanAddItems to: ${r}`),J(r)},gt=async()=>{I("Album save initiated"),I("Photo tags applied:",Object.fromEntries(R)),I("Existing file tags applied:",Object.fromEntries(be)),D(!1),v(!0);try{if(ve!=null&&ve.startsWith("Profile-")){I("Public username starts with 'Profile-', showing username prompt"),P(""),u(!0),v(!1);return}I("Valid username found, proceeding to save album directly with file-level tagging"),Ce()}catch(r){console.error("Error in handleSaveAlbum:",r),I(`Error in handleSaveAlbum: ${r}`),v(!1)}},mt=r=>{I(`Handling successful username update to: ${r}`),localStorage.setItem(xe.PUBLIC_USERNAME,r),st(r),u(!1),I("Proceeding to save album after username update"),Ce()},xt=(r,h)=>{I(`Password dialog closed with option: ${r}, password: ${h?"******":"undefined"}`),r&&ie(r),h!==void 0&&l(h),ee(!1)},ht=()=>{I("Opening password dialog"),ee(!0)},bt=()=>{I("Add photos button clicked"),me(x)},yt=()=>{D(!f)},Se=r=>{r(),D(!1)};b.useEffect(()=>{const r=h=>{const F=h.target;f&&!F.closest(".settings-dropdown-container")&&D(!1)};return f&&document.addEventListener("mousedown",r),()=>{document.removeEventListener("mousedown",r)}},[f]);const Ie=p||K||se,wt=V.length>0||W.length>0,St=$.size>0||te.size>0;return e.jsxs(e.Fragment,{children:[e.jsx(qt,{}),e.jsx(Ht,{children:e.jsxs(Jt,{children:[e.jsx(Qt,{href:"my-albums.html",children:t("My Albums")}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[O===!0&&e.jsxs("div",{className:"settings-dropdown-container",style:{position:"relative",display:"flex",alignItems:"center"},children:[e.jsx("button",{onClick:yt,disabled:p||K||se,style:{background:"none",border:"none",cursor:p||K||se?"not-allowed":"pointer",padding:"8px",borderRadius:"4px",display:"flex",alignItems:"center",justifyContent:"center",color:p||K||se?"#ccc":"#666",fontSize:"18px",transition:"all 0.2s ease",backgroundColor:f?"#f0f0f0":"transparent",opacity:p||K||se?.5:1},onMouseEnter:r=>{!f&&!p&&!K&&!se&&(r.currentTarget.style.backgroundColor="#f8f9fa")},onMouseLeave:r=>{!f&&!p&&!K&&!se&&(r.currentTarget.style.backgroundColor="transparent")},title:t("Album Settings"),children:"⚙️"}),f&&!p&&!K&&!se&&e.jsxs(Vt,{style:{minWidth:"280px"},children:[e.jsx($e,{onClick:()=>Se(pt),children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[e.jsx("span",{children:t(_?"Remove From Public Profile":"Add To Public Profile")}),e.jsx("span",{style:{fontSize:"12px",color:_?"#28a745":"#6c757d",fontWeight:"bold"},children:_?"✓":"○"})]})}),e.jsx($e,{onClick:()=>Se(ft),children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[e.jsx("span",{children:t("Participants Can Add Items")}),e.jsx("span",{style:{fontSize:"12px",color:A?"#28a745":"#6c757d",fontWeight:"bold"},children:A?"✓":"○"})]})}),e.jsx($e,{onClick:()=>Se(()=>{I("Participants Can Delete Items clicked - functionality not yet implemented")}),style:{opacity:.6},children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[e.jsx("span",{children:t("Participants Can Delete Items")}),e.jsx("span",{style:{fontSize:"12px",color:"#6c757d",fontWeight:"bold"},children:"○"})]})}),e.jsx($e,{onClick:()=>Se(ht),children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[e.jsx("span",{children:t("Album Password Policy")}),e.jsx("span",{style:{fontSize:"12px",color:Z!=="NoPassword"?"#28a745":"#6c757d",fontWeight:"bold"},children:Z!=="NoPassword"?"✓":"○"})]})})]})]}),e.jsx(Re,{$primary:!0,onClick:gt,disabled:p||K||se,style:{minWidth:"120px",fontSize:"14px",padding:"8px 16px"},children:t(p?"Saving...":"Save Album")})]})]})}),e.jsxs(Yt,{$isRTL:a,children:[e.jsx("div",{style:{marginTop:s&&O===!0?"32px":"0"},children:e.jsx(ks,{showFolderDetails:s,isCreator:O,folderName:o,setFolderName:H,folderDescription:Q,setFolderDescription:k,isSavingAlbum:p||K})}),(K||Y.totalFiles>0&&(Y.filesUploading>0||Y.filesProcessing>0||Y.filesComplete<Y.totalFiles))&&e.jsx(ts,{progressTracker:Y,isRTL:Pe(d)==="rtl",variant:"detailed",context:"saving",isUploading:K,showSuccessMessage:!1,showErrorMessage:!0,customMessages:{error:t("Some photos could not be processed. You can continue with the successfully processed photos.")}}),e.jsx("input",{ref:C,id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:r=>Ze(r,ke),style:{display:"none"}}),s&&O===!0&&wt&&e.jsxs(Hs,{t,isRTL:a,children:[W.length>0&&e.jsx("div",{style:{marginBottom:"32px"},children:e.jsx(Qs,{existingFiles:W,selectedExistingIndices:te,onToggleSelection:ot,onSelectAll:at,onDeselectAll:nt,onDeleteFile:it,disabled:Ie,t,isRTL:a})}),e.jsx(Js,{selectedPhotos:V,selectedPhotoIndices:$,onToggleSelection:lt,onSelectAll:dt,onDeselectAll:ct,onRemovePhoto:rt,onDeleteAll:ut,disabled:Ie,t,isRTL:a}),St&&e.jsx("div",{style:{marginTop:"32px"},children:e.jsx(Gs,{tagsManager:tt,disabled:Ie,enhancedLog:I})})]}),e.jsx(js,{isSavingAlbum:p,savingProgress:E}),e.jsx(Xt,{children:e.jsx(Re,{onClick:bt,disabled:p||K||se,children:t(K?"Uploading...":"Add More Photos")})}),e.jsx(Lt,{t,language:d,usernameManager:w,onSuccess:mt}),e.jsx($s,{isOpen:X,onClose:xt,initialOption:Z,initialPassword:U}),e.jsx(Ts,{debugMessages:ce,t,isRTL:a,textDirection:a?"rtl":"ltr"})]})]})},Ys=()=>e.jsx(Dt,{children:e.jsx(Vs,{})});Ct.createRoot(document.getElementById("root")).render(e.jsx(Ys,{}));
