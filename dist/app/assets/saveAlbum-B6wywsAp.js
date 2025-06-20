import{d as L,u as Te,a as d,j as e,g as We,h as ye,L as be,i as Xe,s as Ht,m as qt,f as De,k as Gt,l as Jt,n as Qt,r as Vt,o as $e,R as Yt,I as Xt,p as Zt}from"./utils-kEhIe06W.js";import{C as Ke,F as Ze,e as Le,f as Lt,g as es,P as ts,h as ss,i as at,j as ot,k as rs,l as is,S as as,m as os,V as ns,n as ls,M as ds,G as cs,o as us,p as ps,q as fs,D as gs,r as ze,B as et,s as ms,t as xs,u as hs,v as bs}from"./styled-components-BqWomI2t.js";import{u as ys,U as ws}from"./useUsernameManagement-DbVtR3km.js";import{u as Ts,U as $s}from"./useFileUploadProcessor-B_xfvpBz.js";import{F as Ss}from"./types-Cxncrjqw.js";import{L as vs}from"./LazyImage-BuY-Ba_Q.js";const y={colors:{primary:"#007bff",primaryDark:"#0056b3",secondary:"#6c757d",success:"#4caf50",danger:"#e53935",warning:"#ff9800",white:"#fff",text:{primary:"#333",secondary:"#666",light:"#777"},background:{primary:"#f9fafb",highlight:"#f0f7ff"},border:"#ddd"},spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px"},borderRadius:{small:"4px",medium:"8px"},boxShadow:{lg:"0 4px 10px rgba(0,0,0,0.08)"}},Is=L.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10000;
`,As=L.div`
  background-color: ${y.colors.white};
  border-radius: ${y.borderRadius.medium};
  box-shadow: ${y.boxShadow.lg};
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
  scrollbar-color: ${y.colors.border} transparent;
  
  /* Custom scrollbar for webkit browsers */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${y.colors.border};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${y.colors.secondary};
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
    border-radius: ${y.borderRadius.small};
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
`,Cs=L.div`
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
`,Ps=L.div`
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
`,js=L.h3`
  font-size: 24px;
  font-weight: 600;
  color: ${y.colors.text.primary};
  margin: 0 0 ${y.spacing.lg} 0;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 22px;
    margin: 0 0 ${y.spacing.md} 0;
  }
  
  @media (max-height: 700px) {
    font-size: 20px;
    margin: 0 0 ${y.spacing.md} 0;
  }
  
  @media (max-width: 480px) {
    font-size: 18px;
  }
`,ks=L.p`
  margin-bottom: ${y.spacing.lg};
  font-size: 16px;
  color: ${y.colors.text.secondary};
  line-height: 1.5;
  
  @media (max-width: 768px) {
    margin-bottom: ${y.spacing.md};
    font-size: 15px;
  }
  
  @media (max-height: 700px) {
    margin-bottom: ${y.spacing.sm};
    font-size: 14px;
  }
`,tt=L.div`
  margin-bottom: ${y.spacing.lg};
`,st=L.label`
  display: block;
  margin-bottom: ${y.spacing.sm};
  font-size: 14px;
  font-weight: 500;
  color: ${y.colors.text.primary};
`,Ds=L.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${y.colors.border};
  border-radius: ${y.borderRadius.small};
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${y.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  &::placeholder {
    color: ${y.colors.text.light};
  }
`,Es=L.div`
  display: flex;
  flex-direction: column;
  gap: ${y.spacing.md};
  margin-bottom: ${y.spacing.xl};
`,Fs=L.div`
  border: 2px solid ${t=>t.$isSelected?y.colors.primary:y.colors.border};
  border-radius: ${y.borderRadius.medium};
  padding: ${y.spacing.lg};
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${t=>t.$isSelected?y.colors.background.highlight:y.colors.white};
  display: flex;
  align-items: center;
  gap: ${y.spacing.lg};
  
  @media (max-width: 768px) {
    padding: ${y.spacing.md};
    gap: ${y.spacing.md};
  }
  
  @media (max-width: 480px) {
    padding: ${y.spacing.sm};
    gap: ${y.spacing.sm};
  }
  
  @media (max-height: 700px) {
    padding: ${y.spacing.sm};
    gap: ${y.spacing.sm};
  }
`,_s=L.div`
  flex: 1;
`,Ns=L.div`
  margin-bottom: ${y.spacing.xs};
`,zs=L.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${y.colors.primary};
  flex-shrink: 0;
`,Rs=L.label`
  font-size: 16px;
  font-weight: 500;
  color: ${y.colors.text.primary};
  cursor: pointer;
  display: block;
`,Os=L.div`
  font-size: 14px;
  color: ${y.colors.text.secondary};
  margin-top: ${y.spacing.xs};
`,Ms=L.div`
  color: ${y.colors.warning};
  font-size: 12px;
  font-style: italic;
  margin-top: ${y.spacing.xs};
  font-weight: 500;
`,Bs=L.div`
  display: flex;
  gap: ${y.spacing.sm};
  justify-content: center;
  margin-top: ${y.spacing.xl};
`,rt=L.button`
  background-color: ${t=>t.$variant==="danger"?y.colors.danger:t.$variant==="secondary"?"transparent":t.$variant==="success"?y.colors.success:y.colors.primary};
  color: ${t=>t.$variant==="secondary"?y.colors.primary:y.colors.white};
  border: ${t=>t.$variant==="secondary"?`1px solid ${y.colors.primary}`:"none"};
  padding: ${t=>t.$size==="small"?"8px 16px":t.$size==="large"?"16px 32px":"12px 24px"};
  border-radius: ${y.borderRadius.medium};
  cursor: ${t=>t.disabled?"not-allowed":"pointer"};
  font-size: ${t=>t.$size==="small"?"14px":t.$size==="large"?"18px":"16px"};
  font-weight: 500;
  transition: all 0.2s ease;
  opacity: ${t=>t.disabled?.6:1};
  min-width: 100px;

  &:hover:not(:disabled) {
    background-color: ${t=>t.$variant==="danger"?"#c62828":t.$variant==="secondary"?y.colors.background.highlight:t.$variant==="success"?"#388e3c":y.colors.primaryDark};
  }
`,Us=L.div`
  background-color: ${y.colors.background.primary};
  border-radius: ${y.borderRadius.medium};
  padding: ${y.spacing.md};
  margin: ${y.spacing.md} 0;
  border-left: 4px solid ${y.colors.primary};
  font-size: 14px;
  color: ${y.colors.text.secondary};
  line-height: 1.4;
  
  @media (max-width: 768px) {
    padding: ${y.spacing.sm};
    margin: ${y.spacing.sm} 0;
    font-size: 13px;
  }
  
  @media (max-height: 700px) {
    padding: ${y.spacing.xs};
    font-size: 12px;
  }
`,Ws=[{value:"NotVisible",titleKey:"Password Required To See Or Save",descriptionKey:"Album will be completely hidden until correct password is entered"},{value:"Watermark",titleKey:"Watermarked And No Saving Without Password",descriptionKey:"Photos will be visible with watermarks, password required to save"},{value:"CannotBeSaved",titleKey:"Password Required To Save",descriptionKey:"Photos are visible but password required to download or save"},{value:"NoPassword",titleKey:"No Password",descriptionKey:"Album is fully public with no restrictions"}],Ks=({isOpen:t,onClose:f,initialOption:l="NoPassword",initialPassword:w=""})=>{const{t:x,language:J}=Te(),i=We(J)==="rtl",[m,T]=d.useState(l),[j,v]=d.useState(w);if(d.useEffect(()=>{t&&(T(l),v(w))},[t,l,w]),!t)return null;const B=j.trim()==="",D=O=>{T(O)},o=O=>{O.target===O.currentTarget&&f()},$=O=>O!=="NoPassword";return e.jsxs(e.Fragment,{children:[e.jsx(Is,{onClick:o}),e.jsx(As,{children:e.jsx(Cs,{children:e.jsxs(Ps,{$isRTL:i,children:[e.jsx(js,{children:x("Album Password Policy")}),e.jsx(ks,{children:x("Configure password protection for your album. Choose how you want to restrict access to your photos.")}),e.jsxs(tt,{children:[e.jsx(st,{children:x("Enter Password")}),e.jsx(Ds,{type:"text",placeholder:x("Enter password (optional)"),value:j,onChange:O=>v(O.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"})]}),e.jsxs(tt,{children:[e.jsx(st,{children:x("Select Protection Level")}),e.jsx(Es,{children:Ws.map(O=>e.jsxs(Fs,{$isSelected:m===O.value,onClick:()=>D(O.value),children:[e.jsx(zs,{type:"radio",name:"protection",checked:m===O.value,onChange:()=>D(O.value)}),e.jsxs(_s,{children:[e.jsx(Ns,{children:e.jsx(Rs,{children:x(O.titleKey)})}),e.jsx(Os,{children:x(O.descriptionKey)}),B&&$(O.value)&&m===O.value&&e.jsx(Ms,{children:x('⚠️ Will use "password" as default if left empty')})]})]},O.value))})]}),$(m)&&e.jsxs(Us,{children:[e.jsx("strong",{children:x("💡 Password Protection Info:")}),e.jsx("br",{}),x('If you leave the password field empty, "password" will be used as the default password. You can change this anytime in album settings.')]}),e.jsxs(Bs,{children:[e.jsx(rt,{$variant:"secondary",onClick:()=>f(),children:x("Cancel")}),e.jsx(rt,{$variant:"primary",onClick:()=>{const O=B&&$(m)?"password":j;console.log(`Saving with option: ${m}, password: ${O.length>0?"********":"none"}`),f(m,O)},children:x("Save")})]})]})})})]})},Hs=({debugMessages:t,t:f,isRTL:l,textDirection:w})=>t.length===0?null:e.jsxs("div",{style:{marginTop:"40px",background:"#fff3cd",padding:"16px",borderRadius:"8px",border:"1px solid #ffeeba",maxWidth:900,margin:"0 auto",direction:w},children:[e.jsx("h3",{style:{marginTop:0,fontSize:"18px",color:"#856404",textAlign:l?"right":"left"},children:f("Debug Log")}),e.jsx("pre",{style:{fontSize:"14px",color:"#856404",whiteSpace:"pre-wrap",maxHeight:"400px",overflow:"auto",textAlign:l?"right":"left"},children:t.map((x,J)=>e.jsx("div",{style:{marginBottom:"8px"},children:x},J))})]}),qs=`
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
            fileDisplayName
            selectedTags {
              TagType
              tagTitle
              subtags {
                  TagType
                  tagTitle
                  subtagTitle
              }
            }          
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
`,Gs=(t,f,l,w,x,J,i,m,T,j,v,B,D,o)=>{const[$,O]=d.useState(null),[X,oe]=d.useState(null),ne=async H=>{o(`Initializing folder ID with username: ${H}`);try{const ee=new URLSearchParams(window.location.search).get("folderId");if(o(`Folder ID from URL: ${ee||"null"}`),ee){t(ee),o(`Using existing folder ID: ${ee}`);try{o(`Fetching details for folder: ${ee}`);const g=await le(ee,o);if(o("Folder details retrieved:",g),g){const V=`${H}_____${H}____Account`,te=g.creatorId===V;if(o(`User is creator of folder: ${te}, accountId: ${V}, creator: ${g.creatorId}`),l(te),te){o("User is creator, showing folder details"),w(!0),x(g.folderName),J(g.folderDescription),i(g.isOnPublicProfile),o(`Setting isOnPublicProfile: ${g.isOnPublicProfile}`),g.participantsCanAddItems!==void 0&&(m(g.participantsCanAddItems),o(`Setting participantsCanAddItems: ${g.participantsCanAddItems}`)),g.participantsCanDeleteItems!==void 0&&(D(g.participantsCanDeleteItems),o(`Setting participantsCanDeleteItems: ${g.participantsCanDeleteItems}`));const U=g.passwordPolicy;o(`Password policy from folder details: ${U}`),T(U),U!=="NoPassword"&&g.password&&j(g.password),o(`Set password protection option to: ${U}`)}else o("User is NOT the creator, hiding editable fields"),w(!1)}else o("No folder details retrieved, setting isCreator to true"),l(!0),w(!0)}catch(g){console.error("Error fetching folder details:",g),o(`Error fetching folder details: ${g}`),l(!1)}}else{const g=`${H}_____${Xe()}____Folder`;o(`Creating new folder ID: ${g}`),t(g),o("Setting isCreator to true for new album"),l(!0),w(!0)}}catch(p){console.error("Folder ID initialization error:",p),o(`Folder ID initialization error: ${p}`),l(!1)}},le=async(H,p)=>{var ee,g,V,te,U,ie,pe,Se,fe;p(`Fetching details for folder ID: ${H}`);try{const xe=await ye();if(!xe)return p("No token available for fetching folder details"),null;p("Sending GraphQL query to fetch folder details");const ue=await(await fetch(De,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${xe}`},body:JSON.stringify({query:qs,variables:{folderIds:[H],fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(p("Folder details API response:",ue),ue.errors)return console.error("GraphQL errors:",ue.errors),p(`GraphQL errors: ${JSON.stringify(ue.errors)}`),null;const C=((g=(ee=ue==null?void 0:ue.data)==null?void 0:ee.fetchFolders)==null?void 0:g.items)||[];if(p(`Found ${C.length} folder items`),C.length===0)return p("No folder items found"),null;const b=C[0];p("Retrieved folder data:",b);const R=((te=(V=b.folderPosition)==null?void 0:V.profileIds)==null?void 0:te.some(_=>_.includes("Public____Profile")))||!1;p(`Folder is on public profile: ${R}`),p("Profile IDs:",(U=b.folderPosition)==null?void 0:U.profileIds);const A=(ie=b.folderInviteParameters)==null?void 0:ie.usingFolderInviteGrantsRightToAddItems;p(`Participants can add items: ${A}`);const q=(pe=b.folderInviteParameters)==null?void 0:pe.usingFolderInviteGrantsRightToRemoveItems;return p(`Participants can delete items: ${q}`),{creatorId:b.creatorId||"",folderName:b.folderName||"",folderDescription:b.folderDescription||"",passwordPolicy:((Se=b.folderPassword)==null?void 0:Se.policy)||"NoPassword",password:((fe=b.folderPassword)==null?void 0:fe.password)||"",isOnPublicProfile:R,participantsCanAddItems:A!==void 0?A:!0,participantsCanDeleteItems:q!==void 0?q:!1}}catch(xe){return console.error("Error in fetchFolderDetails:",xe),p(`Error in fetchFolderDetails: ${xe}`),null}},s=()=>{o("Attempting to restore photos from localStorage");try{const H=localStorage.getItem(be.SELECTED_PHOTOS);if(o(`Found stored photos: ${H?"yes":"no"}`),H)try{const p=JSON.parse(H);o(`Parsed ${p.length} photos from localStorage`),Array.isArray(p)&&p.length>0&&(f(p),o(`Restored ${p.length} photos to state (including original filenames)`))}catch(p){console.error("Error parsing stored photos:",p),o(`Error parsing stored photos: ${p}`)}}catch(H){console.error("Error restoring photos from storage:",H),o(`Error restoring photos from storage: ${H}`)}},ae=()=>{o("Testing S3 connection");try{Ht?o("S3 client is available"):(console.error("S3 client not available"),o("S3 client not available"))}catch(H){console.error("S3 connection test error:",H),o(`S3 connection test error: ${H}`)}},ce=async()=>{var H;o("Starting component initialization");try{o("Checking login with refresh");const p=await ye();if(!p){o("No token returned from login check, aborting initialization");return}try{const ee=localStorage.getItem(be.PUBLIC_USERNAME);o(`Retrieved public username from localStorage: ${ee||"null"}`),oe(ee||null);const V=JSON.parse(atob(p.split(".")[1]))["cognito:username"];if(V){o(`Extracted Cognito username from token: ${V}`),O(V);const te=localStorage.getItem(be.SUB_ALBUM_DATA);if(o(`Sub-album data from localStorage: ${te||"null"}`),te)try{const U=JSON.parse(te);if(o("Parsed sub-album data:",U),U.isSubAlbum&&((H=U.selectedFileIds)==null?void 0:H.length)>0){o(`Valid sub-album data found with ${U.selectedFileIds.length} files`),v(!0),B(U.selectedFileIds),U.selectedPhotos&&U.selectedPhotos.length>0&&(o(`Found ${U.selectedPhotos.length} selected photos in sub-album data`),f(U.selectedPhotos)),w(!0),l(!0);const ie=`${V}_____${Xe()}____Folder`;o(`Generated new folder ID for sub-album: ${ie}`),t(ie)}else o("Invalid sub-album data, proceeding with normal initialization"),await ne(V)}catch(U){console.error("Error parsing sub-album data:",U),o(`Error parsing sub-album data: ${U}`),await ne(V)}else o("No sub-album data found, proceeding with normal folder initialization"),await ne(V)}else o("No Cognito username found in token")}catch(ee){console.error("User data initialization error:",ee),o(`User data initialization error: ${ee}`)}s(),ae(),o("Component initialization completed")}catch(p){console.error("Initialization error:",p),o(`Initialization error: ${p}`)}};return d.useEffect(()=>{ce()},[]),{cognitoUsername:$,publicUsername:X,setPublicUsername:oe}},Js=(t,f,l,w,x,J,i,m,T,j,v,B,D,o,$,O,X,oe,ne,le,s,ae)=>{const ce=C=>(s(`Converting ${C.length} tags to API format`),C.map(b=>({TagType:b.TagType,tagTitle:b.tagTitle,subtags:b.subtags.map(R=>({TagType:b.TagType,tagTitle:R.tagTitle,subtagTitle:R.subtagTitle}))}))),H=C=>{s(`Save progress text: ${C}`);const b=document.getElementById("saveProgressText");b&&(b.innerText=C)},p=C=>{const b=document.getElementById("saveProgress");b?(b.style.width=`${C}%`,s(`Updated save progress bar: ${C}%`)):s("Progress bar element not found"),oe(C)},ee=(C,b)=>{s(`Splitting array of ${C.length} items into chunks of ${b}`);const R=[];for(let A=0;A<C.length;A+=b)R.push(C.slice(A,A+b));return s(`Created ${R.length} chunks`),R},g=C=>{const b=new Set;return C.filter(R=>b.has(R.fileId)?(s(`Skipping duplicate file reference with ID: ${R.fileId}`),!1):(b.add(R.fileId),!0))},V=(C,b,R)=>{s("Creating folder position input WITHOUT folder-level tags"),s(`Profile visibility: ${m?"Public":"Only Me"}`);const A=m?[`${f}_____Public____Profile`]:["Only Me_____Only Me____Profile"];s(`Profile IDs: ${JSON.stringify(A)}`);let q=[];w&&x.length>0&&(s(`Creating file reference IDs for ${x.length} sub-album files`),q=x.map(G=>{const K=G.split("_____");if(K.length>=2){const se=K[1].split("____")[0],ge=`${R}_____${se}____FileReference`;return s(`Created file reference ID for sub-album: ${ge}`),ge}return s(`Using original fileId as fallback: ${G}`),G})),s(`Created ${q.length} acceptedFileReferenceIds`);const _=v!=="NoPassword"?B:null;if(s(`Password protection: ${v}`),s(`Album password: ${_?"******":"null"}`),s(`Participants can add items: ${T}`),s(`Participants can delete items: ${j}`),!t)throw s("Error: folderId is null or undefined"),new Error("folderId is required to create folder position input");const W=Gt(t),Z=Jt(W);return{currentTime:C,folderId:t,profileIds:A,folderPositionPoints:1,acceptedFileReferenceIds:q,folderInput:{folderAboutContactIds:[b],albumNanoId:Z,folderName:J,folderDescription:i,folderPasswordInput:{password:_,policy:v},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:T,usingFolderInviteGrantsRightToRemoveItems:j,addedItemsNeedFolderCreatorApproval:!1}}}},te=(C,b,R)=>(s(`Creating file reference inputs with individual photo tags and original filenames for ${C.length} photos`),C.map((A,q)=>{var de;const _=D.get(q)||[],W=ce(_),Z=A.originalFileName||A.fileName;if(s(`Photo ${q} (${A.fileName}): ${_.length} tags applied, display name: ${Z}`),A.fileId)return s(`Using existing fileId for photo: ${A.fileId}`),{fileReferencesHolderId:t,currentTime:b,points:1,hasBeenDeleted:!1,selectedTagInputs:W,fileId:A.fileId,fileDisplayName:Z,fileInput:null};const G=A.type==="video"||(de=A.type)!=null&&de.startsWith("video")?`Input/Video/${A.fileName}`:`Input/Image/${A.fileName}`,K=`${f}_____${A.fileName}____File`;return s(`Created file reference for ${A.fileName}:`),s(`  - dataKey: ${G}`),s(`  - fileId: ${K}`),s(`  - fileDisplayName: ${Z}`),s(`  - thumbnailDataKey: ${A.thumbnailDataKey||"undefined"}`),s(`  - size: ${A.size}`),s(`  - thumbnailSize: ${A.thumbnailSize||0}`),s(`  - duration: ${A.duration||"undefined"}`),s(`  - tags: ${_.length} tags selected for this photo`),{fileReferencesHolderId:t,currentTime:b,points:1,hasBeenDeleted:!1,selectedTagInputs:W,fileId:K,fileDisplayName:Z,fileInput:{fileId:K,ownerFileInput:{editorContactIds:[R],FileSharingOptionsEnum:"Anyone",dataKey:G,thumbnailDataKey:A.thumbnailDataKey,dataInBytes:A.size,thumbnailDataInBytes:A.thumbnailSize||0,s3UploadedAt:b,durationInSeconds:A.duration},editorFileInput:{aboutContactIds:[R],captionText:"",numericFilterInputs:[]}}}})),U=C=>{const b=[];return O.forEach(R=>{const A=o.get(R)||[];if(A.length>0){const q=$[R];if(q){const _=q.dataKey.split("/"),W=_[_.length-1],Z=`${f}_____${W}____File`,G=q.fileName||W,K=ce(A);s(`Creating file reference for existing file ${R} (${W}) with ${A.length} tags, display name: ${G}`),b.push({fileReferencesHolderId:t,currentTime:C,points:1,hasBeenDeleted:!1,selectedTagInputs:K,fileId:Z,fileDisplayName:G,fileInput:null})}}}),s(`Created ${b.length} file references for existing files with tags and filenames`),b},ie=async C=>{var q,_;s("Sending folder-only mutation (no file references, no folder tags)");const b=await ye();if(!b)throw s("No token available for saving album, aborting"),new Error("Authentication token not available");const R=`
      mutation MyMutation($folderPositionInputs: [FolderPositionInput!]) {
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items {
            id
          }
        }
      }
    `,A={folderPositionInputs:[C]};s("GraphQL folder-only mutation variables:",A);try{s("Sending API request to save folder");const W=await fetch(De,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${b}`},body:JSON.stringify({query:R,variables:A})});s(`API response status: ${W.status}`);const Z=await W.text();s(`API response raw text: ${Z}`);const G=JSON.parse(Z);if(s("API response JSON:",G),G.errors)throw console.error("Folder save failed:",G.errors),s("Folder save failed with errors:",G.errors),new Error("Failed to save folder");return s("Folder saved successfully"),((_=(q=G.data)==null?void 0:q.changeFiles)==null?void 0:_.items)||[]}catch(W){throw console.error("Error in sendFolderOnlyMutation:",W),s(`Error in sendFolderOnlyMutation: ${W}`),W}},pe=async C=>{var q,_,W,Z,G;s(`Sending file references-only mutation with ${C.length} items (each with individual tags and filenames)`);const b=await ye();if(!b)throw s("No token available for saving file references, aborting"),new Error("Authentication token not available");const R=`
      mutation MyMutation($updatedFileReferenceInputs: [UpdatedFileReferenceInput!]) {
        changeFiles0(updatedFileReferenceInputs: $updatedFileReferenceInputs) {
          items {
            ... on FileReference {
              id
              createdAt
              updatedAt
              fileId
              fileDisplayName
              file {
                dataKey
                thumbnailDataKey
              }
            }
          }
        }
      }
    `,A={updatedFileReferenceInputs:C};s("GraphQL file references-only mutation variables (first item):",C.length>0?C[0]:"No items");try{s("Sending API request to save file references with individual tags and filenames");const K=await fetch(De,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${b}`},body:JSON.stringify({query:R,variables:A})});s(`API response status: ${K.status}`);const de=await K.text();s(`API response raw text: ${de.substring(0,500)}...`);const se=JSON.parse(de);if(s("API response JSON items count:",((W=(_=(q=se.data)==null?void 0:q.changeFiles0)==null?void 0:_.items)==null?void 0:W.length)||0),se.errors)throw console.error("File references save failed:",se.errors),s("File references save failed with errors:",se.errors),new Error("Failed to save file references");return s("File references chunk saved successfully with individual photo tags and filenames"),((G=(Z=se.data)==null?void 0:Z.changeFiles0)==null?void 0:G.items)||[]}catch(K){throw console.error("Error in sendFileReferencesOnlyMutation:",K),s(`Error in sendFileReferencesOnlyMutation: ${K}`),K}},Se=async(C,b)=>{var _,W,Z,G,K,de,se,ge,we;s(`Sending final chunk with folder mutation (${C.length} file references with filenames, no folder tags)`);const R=await ye();if(!R)throw s("No token available for saving final chunk, aborting"),new Error("Authentication token not available");const A=`
      mutation MyMutation(
        $folderPositionInputs: [FolderPositionInput!],
        $updatedFileReferenceInputs: [UpdatedFileReferenceInput!]
      ) {
        changeFiles0(updatedFileReferenceInputs: $updatedFileReferenceInputs) {
          items {
            ... on FileReference { 
              id 
              createdAt 
              updatedAt 
              fileId 
              fileDisplayName
              file { 
                dataKey 
                thumbnailDataKey 
              } 
            }
          }
        }
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items { id }
        }
      }
    `,q={folderPositionInputs:[b],updatedFileReferenceInputs:C};s("GraphQL final mutation variables (folder + last chunk with filenames, no folder tags)");try{s("Sending API request for final save with folder (no folder tags, with filenames)");const he=await fetch(De,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${R}`},body:JSON.stringify({query:A,variables:q})});s(`API response status: ${he.status}`);const r=await he.text();s(`API response raw text: ${r.substring(0,500)}...`);const c=JSON.parse(r);if(s("API response JSON:",{fileReferencesCount:((Z=(W=(_=c.data)==null?void 0:_.changeFiles0)==null?void 0:W.items)==null?void 0:Z.length)||0,folderItems:((K=(G=c.data)==null?void 0:G.changeFiles)==null?void 0:K.items)||[]}),c.errors)throw console.error("Final save failed:",c.errors),s("Final save failed with errors:",c.errors),new Error("Failed to complete album save");return s("Final chunk and folder saved successfully (with individual photo tags and filenames)"),{fileReferences:((se=(de=c.data)==null?void 0:de.changeFiles0)==null?void 0:se.items)||[],folderPositions:((we=(ge=c.data)==null?void 0:ge.changeFiles)==null?void 0:we.items)||[]}}catch(he){throw console.error("Error in sendFinalChunkWithFolderMutation:",he),s(`Error in sendFinalChunkWithFolderMutation: ${he}`),he}},fe=async()=>(s("Validating required data"),await ye()?f?t?(s("All required data validated successfully"),!0):(s("No folder ID, validation failed"),!1):(s("No Cognito username, validation failed"),!1):(s("No token available, validation failed"),!1)),xe=()=>{s("Handling successful save"),Qt(ne,le,[be.SELECTED_PHOTOS,be.SUB_ALBUM_DATA],s),s("Album data cleared"),H(ae("Album saved successfully!")),sessionStorage.setItem("album_just_saved","true"),s("Set 'album_just_saved' flag in sessionStorage"),s("Setting timeout for redirect to my-albums.html"),setTimeout(()=>{s("Redirecting to my-albums.html"),Vt("my-albums.html")},1e3)},Ce=async(C,b)=>{s("Starting chunked save process (individual photo tags with filenames, no folder tags, including existing files with tags)");try{H(ae("Processing files in chunks..."));const R=48;if(b.length===0)s("No file references to process, saving only folder position (no folder tags)"),await ie(C);else{const A=g(b);s(`After removing duplicates, processing ${A.length} unique file references`);const q=ee(A,R);s(`Split file references into ${q.length} chunks of max size ${R}`);for(let _=0;_<q.length;_++){const W=q[_];s(`Processing chunk ${_+1} of ${q.length} with ${W.length} file references`);const Z=_/q.length*80;oe(10+Z),p(10+Z),_<q.length-1?(H(ae("Saving files: chunk {{chunkNumber}} of {{totalChunks}}...",{chunkNumber:_+1,totalChunks:q.length})),await pe(W)):(H(ae("Finalizing album...")),await Se(W,C))}}oe(100),p(100),H(ae("Album saved successfully!")),xe()}catch(R){console.error("Error in chunked save process:",R),s(`Error in chunked save process: ${R}`),H(ae("Error: {{error}}",{error:String(R)})),X(!1)}};return{saveAlbumDirectly:async()=>{s("Starting direct album save with individual photo tagging, existing file tagging, and original filenames"),s(`Photo tags map: ${D.size} photos have tags applied`),s(`Existing file tags map: ${o.size} existing files have tags applied`),X(!0),oe(5);try{if(s("Validating required data for save"),!await fe()){s("Required data validation failed, aborting save"),X(!1);return}const C=Math.floor(Date.now()/1e3),b=`${f}_____${f}____Account`,A=t.split("_____")[1].split("____")[0];s(`Save timestamp: ${C}`),s(`Account ID: ${b}`),s(`Folder ID: ${t}`),s(`Folder target item identifier: ${A}`),s("Creating folder position input (no folder tags)");const q=V(C,b,A);s("Folder position input created:",q);let _=[];const W=l.filter(G=>G.status==="complete");if(s(`Found ${W.length} valid photos with 'complete' status`),W.length>0){const G=W.filter(de=>!de.fileId);s(`Found ${G.length} new uploads to move from temp to public folder`),G.length>0&&(s("Moving files from temp to public folder"),await qt(G,p,s)),s("Creating file reference inputs for uploads with individual photo tags and original filenames");const K=te(W,C,b);s(`Created ${K.length} file reference inputs for uploads`,K),_=_.concat(K)}const Z=U(C);if(Z.length>0&&(s(`Adding ${Z.length} existing file references with tags and filenames`),_=_.concat(Z)),w&&x.length>0){s(`Adding ${x.length} existing file references for sub-album`);const G=x.map(K=>{s(`Creating file reference for existing sub-album file ID: ${K}`);const de=[],se=K.split("_____"),ge=se.length>=2?se[1].split("____")[0]:K;return{fileReferencesHolderId:t,currentTime:C,points:1,hasBeenDeleted:!1,selectedTagInputs:de,fileId:K,fileDisplayName:ge,fileInput:null}});s(`Created ${G.length} file reference inputs for sub-album files`,G),_=_.concat(G)}s(`Total file reference inputs: ${_.length}`),s("Sending GraphQL mutations with chunked file references (individual photo tags, existing file tags, and original filenames)"),await Ce(q,_)}catch(C){console.error("Error in saveAlbumDirectly:",C),s(`Error in saveAlbumDirectly: ${C}`),X(!1)}}}},Qs=L.div`
  margin: 32px 0;
`,nt=L.div`
  margin-bottom: 24px;
`,lt=L.h3`
  margin: 0 0 16px 0;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  display: flex;
  align-items: center;
  gap: 12px;
`,dt=L.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  min-height: 32px;
`,ct=L.button`
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
`,Vs=L(ct)`
  font-size: 12px;
  padding: 6px 12px;
  border-radius: 16px;
`,ut=L.button`
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

  ${t=>t.$isMobile&&`
    width: 20px;
    height: 20px;
    font-size: 12px;
    box-shadow: 0 3px 10px rgba(220, 53, 69, 0.4);
    background: rgba(220, 53, 69, 0.95);
  `}

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
`,Ys=L.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 16px;
`,pt=L.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 16px;
`,ft=L.button`
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
`,Xs=L.div`
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
`,Zs=L.input`
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
`,it=L.button`
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
`,Ls=$e.memo(({tag:t,isApplied:f,isDisplayed:l,isBeingDeleted:w,disabled:x,onTagClick:J,onDeleteTag:i,getTagDisplayText:m})=>{const{t:T}=Te(),[j,v]=d.useState(!1),[B,D]=d.useState(!1);d.useEffect(()=>{const $=()=>{D("ontouchstart"in window||navigator.maxTouchPoints>0)};return $(),window.addEventListener("resize",$),()=>window.removeEventListener("resize",$)},[]);const o=B?l&&!x&&!w:j&&l&&!x&&!w;return e.jsxs(ct,{$isApplied:f,$isDisplayed:l,$isBeingDeleted:w,disabled:x,onClick:()=>J(t),onMouseEnter:()=>!B&&l&&v(!0),onMouseLeave:()=>!B&&l&&v(!1),children:[e.jsx("span",{style:{paddingRight:o?"20px":"0"},children:m(t)}),o&&e.jsx(ut,{$isMobile:B,onClick:$=>{$.stopPropagation(),i(t.id)},disabled:w,title:T("Delete tag"),children:"×"})]})}),er=$e.memo(({subtag:t,isApplied:f,isBeingDeleted:l,disabled:w,onSubtagClick:x,onDeleteSubtag:J})=>{const{t:i}=Te(),[m,T]=d.useState(!1),[j,v]=d.useState(!1);d.useEffect(()=>{const D=()=>{v("ontouchstart"in window||navigator.maxTouchPoints>0)};return D(),window.addEventListener("resize",D),()=>window.removeEventListener("resize",D)},[]);const B=j?f&&!w&&!l:m&&f&&!w&&!l;return e.jsxs(Vs,{$isApplied:f,$isBeingDeleted:l,disabled:w,onClick:()=>x(t),onMouseEnter:()=>!j&&f&&T(!0),onMouseLeave:()=>!j&&f&&T(!1),children:[e.jsx("span",{style:{paddingRight:B?"20px":"0"},children:t.subtagTitle}),B&&e.jsx(ut,{$isMobile:j,onClick:D=>{D.stopPropagation(),J(t.id)},disabled:l,title:i("Delete subtag"),children:"×"})]})}),gt=({value:t,onChange:f,onSubmit:l,onCancel:w,isSubmitting:x,placeholder:J="Enter tag name..."})=>{const{t:i}=Te(),m=d.useRef(null);d.useEffect(()=>{m.current&&m.current.focus()},[]);const T=j=>{j.key==="Enter"?l():j.key==="Escape"&&w()};return e.jsxs(Xs,{children:[e.jsx(Zs,{ref:m,type:"text",value:t,onChange:j=>f(j.target.value),onKeyDown:T,placeholder:i(J),disabled:x}),e.jsx(it,{onClick:l,disabled:!t.trim()||x,title:i("Add (Enter)"),children:x?"...":"✓"}),e.jsx(it,{onClick:w,disabled:x,title:i("Cancel (Escape)"),children:"×"})]})},tr=$e.memo(({tagsManager:t,disabled:f=!1,enhancedLog:l})=>{const{t:w}=Te(),{tags:x,displayedTagId:J,isLoadingTags:i,tagIdBeingDeleted:m,isAddingNewTag:T,newTagTitle:j,isSubmittingNewTag:v,toggleTagOnSelectedFiles:B,setDisplayedTag:D,isTagAppliedToSelected:o,deleteTag:$,startAddingNewTag:O,cancelAddingNewTag:X,submitNewTag:oe,setNewTagTitle:ne,getAppliedTagsForSelected:le,hasSelectedFiles:s}=t;if(!s())return null;const ae=$e.useCallback(g=>{if(!o(g))return g.tagTitle;const U=le().find(pe=>pe.tagTitle===g.tagTitle);if(!U||U.subtags.length===0)return g.tagTitle;const ie=U.subtags.map(pe=>pe.subtagTitle).join(" || ");return`${g.tagTitle}  |  ${ie}`},[o,le]);$e.useEffect(()=>{const g=x.filter(te=>o(te)),V=le();l(`TagsDisplay render - ${g.length} tags applied to all selected files:`,g.map(te=>`${te.tagTitle} (display: "${ae(te)}")`)),l("Applied tags with subtags:",V)},[x,o,le,ae,l]);const ce=g=>{if(f)return;const V=o(g);l(`Tag "${g.tagTitle}" clicked - current state: ${V?"applied to all":"not applied to all"}`),B(g),g.subtags&&g.subtags.length>0&&D(V?null:g.id),l(`After toggle - new state: ${V?"removed from all":"applied to all"}`)},H=async g=>{if(f)return;l(`Delete tag initiated: ${g}`);const V=await $(g);l(V?`Tag successfully deleted: ${g}`:`Failed to delete tag: ${g}`)},p=async()=>{await oe()||l("Failed to submit new tag")},ee=$e.useMemo(()=>[...x].sort((g,V)=>g.points!==V.points?V.points-g.points:V.updatedAt-g.updatedAt),[x]);return e.jsxs(Qs,{children:[e.jsxs(nt,{children:[e.jsx(lt,{children:w("Apply tags to selected files")}),e.jsx(dt,{children:i?e.jsx(Ys,{children:w("Loading tags...")}):e.jsxs(e.Fragment,{children:[ee.map(g=>{const V=o(g);return e.jsx(Ls,{tag:g,isApplied:V,isDisplayed:J===g.id,isBeingDeleted:m===g.id,disabled:f,onTagClick:ce,onDeleteTag:H,getTagDisplayText:ae},g.id)}),T?e.jsx(gt,{value:j,onChange:ne,onSubmit:p,onCancel:X,isSubmitting:v,placeholder:w("Enter tag name...")}):e.jsx(ft,{disabled:f,onClick:O,children:w("+ Add Tag")}),ee.length===0&&!T&&e.jsx(pt,{children:w("No tags available")})]})})]}),J&&e.jsx(sr,{tagsManager:t,disabled:f,enhancedLog:l}),e.jsx("div",{style:{marginTop:"24px",padding:"20px 24px",background:"linear-gradient(135deg, #e7f3ff 0%, #f0f8ff 100%)",borderRadius:"12px",fontSize:"13px",color:"#0c5aa6",border:"1px solid #b3d9ff",boxShadow:"0 4px 12px rgba(0, 123, 255, 0.08)"},children:e.jsxs("div",{style:{lineHeight:"2.2"},children:[e.jsxs("div",{style:{marginBottom:"8px"},children:[e.jsx("strong",{style:{color:"#28a745"},children:"🟢"}),"  ",w("Most recently clicked tag (showing subtags)")]}),e.jsxs("div",{style:{marginBottom:"8px"},children:[e.jsx("strong",{style:{color:"#333333"},children:"⚫"}),"  ",w("Applied to selected files")]}),e.jsxs("div",{children:[e.jsx("strong",{style:{color:"#6c757d"},children:"⚪"}),"  ",w("Available but not applied to all selected files")]})]})})]})}),sr=$e.memo(({tagsManager:t,disabled:f=!1,enhancedLog:l})=>{var H;const{t:w}=Te(),{displayedTagId:x,subtagIdBeingDeleted:J,isAddingNewSubtag:i,newSubtagTitle:m,isSubmittingNewSubtag:T,toggleSubtagOnSelectedFiles:j,isSubtagAppliedToSelected:v,deleteSubtag:B,startAddingNewSubtag:D,cancelAddingNewSubtag:o,submitNewSubtag:$,setNewSubtagTitle:O,tags:X}=t,oe=x?((H=X.find(p=>p.id===x))==null?void 0:H.subtags)||[]:[],ne=X.find(p=>p.id===x),le=p=>{f||(l(`Subtag "${p.subtagTitle}" clicked - current state: ${v(p)?"applied to all":"not applied to all"}`),j(p))},s=async p=>{if(f)return;l(`Delete subtag initiated: ${p}`);const ee=await B(p);l(ee?`Subtag successfully deleted: ${p}`:`Failed to delete subtag: ${p}`)},ae=async()=>{await $()||l("Failed to submit new subtag")};if(!ne)return null;const ce=$e.useMemo(()=>[...oe].sort((p,ee)=>p.points!==ee.points?ee.points-p.points:ee.updatedAt-p.updatedAt),[oe]);return e.jsxs(nt,{children:[e.jsx(lt,{children:w('Subtags for "{{tagTitle}}"',{tagTitle:ne.tagTitle})}),e.jsxs(dt,{children:[ce.map(p=>e.jsx(er,{subtag:p,isApplied:v(p),isBeingDeleted:J===p.id,disabled:f,onSubtagClick:le,onDeleteSubtag:s},p.id)),i?e.jsx(gt,{value:m,onChange:O,onSubmit:ae,onCancel:o,isSubmitting:T,placeholder:w("Enter subtag name...")}):e.jsx(ft,{disabled:f,onClick:D,children:w("+ Add Subtag")}),ce.length===0&&!i&&e.jsx(pt,{children:w("No subtags available")})]})]})}),mt=({photoTags:t,isSelected:f=!1,onToggleSelection:l,fileName:w,showFileName:x=!1})=>{const{t:J}=Te(),m=(v=>v.length===0?"":v.map(B=>{if(B.subtags.length>0){const D=B.subtags.map(o=>o.subtagTitle).join(", ");return`${B.tagTitle}: ${D}`}return B.tagTitle}).join(" • "))(t),T=t.length>0;return x&&w||T||f?e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"4px"},children:[x&&w&&e.jsx("div",{style:{fontSize:"11px",fontWeight:"600",color:"#333",padding:"4px 8px",backgroundColor:f?"#e3f2fd":"#f8f9fa",borderRadius:"4px",border:`1px solid ${f?"#90caf9":"#e9ecef"}`,textAlign:"center",wordBreak:"break-word",lineHeight:"1.2",transition:"all 0.2s ease"},children:w}),e.jsx("div",{style:{background:T?"linear-gradient(135deg, rgba(0, 123, 255, 0.95) 0%, rgba(0, 123, 255, 0.85) 100%)":"rgba(108, 117, 125, 0.6)",color:"white",padding:T?"8px 12px":"6px 12px",borderRadius:T?"8px":"6px",fontSize:T?"11px":"10px",cursor:l?"pointer":"default",backdropFilter:"blur(6px)",boxShadow:T?"0 4px 12px rgba(0, 123, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)":"0 2px 8px rgba(0, 0, 0, 0.2)",border:T?"1px solid rgba(255, 255, 255, 0.2)":"none",transition:"all 0.3s ease",lineHeight:"1.3",minHeight:"32px",display:"flex",alignItems:"center",wordBreak:"break-word"},onClick:l,onMouseEnter:v=>{T&&(v.currentTarget.style.transform="translateY(-1px)",v.currentTarget.style.boxShadow="0 6px 16px rgba(0, 123, 255, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3)")},onMouseLeave:v=>{T&&(v.currentTarget.style.transform="translateY(0)",v.currentTarget.style.boxShadow="0 4px 12px rgba(0, 123, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)")},children:T?e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",width:"100%",flexWrap:"wrap"},children:[e.jsx("span",{style:{fontSize:"12px",opacity:.9,flexShrink:0},children:"🏷️"}),e.jsx("span",{style:{fontWeight:"600",textShadow:"0 1px 2px rgba(0, 0, 0, 0.3)",flex:1},children:m})]}):e.jsx("div",{style:{opacity:.8,fontStyle:"italic",textAlign:"center",width:"100%",fontSize:"10px"},children:J("No tags applied")})})]}):null},rr=({selectedPhotos:t,selectedPhotoIndices:f,isSavingAlbum:l,onRemovePhoto:w,onTogglePhotoSelection:x,onSelectAllPhotos:J,onDeselectAllPhotos:i,hideHeader:m=!1,photoTagsMap:T,columns:j="1"})=>{const{t:v}=Te();if(t.length===0)return null;const B=f.size>0,D=f.size===t.length,o=()=>`repeat(${parseInt(j,10)}, 1fr)`;return e.jsxs(e.Fragment,{children:[!m&&e.jsx(Ke,{style:{marginBottom:"16px",border:"2px solid #007bff"},children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px"},children:[e.jsx("span",{style:{fontWeight:"bold",fontSize:"14px",color:"#007bff"},children:B?v("{{count}} file(s) selected for tagging",{count:f.size}):v("Select files with blue borders for tagging")}),e.jsxs("div",{style:{display:"flex",gap:"8px",marginLeft:"auto"},children:[!D&&e.jsx("button",{onClick:J,disabled:l,style:{padding:"6px 12px",border:"1px solid #007bff",borderRadius:"4px",background:"#007bff",color:"white",fontSize:"12px",cursor:"pointer",fontWeight:"bold"},children:v("Select All")}),B&&e.jsx("button",{onClick:i,disabled:l,style:{padding:"6px 12px",border:"1px solid #6c757d",borderRadius:"4px",background:"transparent",color:"#6c757d",fontSize:"12px",cursor:"pointer"},children:v("Deselect All")})]})]})}),e.jsx(rs,{style:{display:"grid",gridTemplateColumns:o(),gap:"16px",padding:"20px",border:"2px dashed #007bff",borderRadius:"12px",backgroundColor:"#fff",boxShadow:"0 2px 8px rgba(0, 0, 0, 0.04)"},children:t.map(($,O)=>{var ne,le;const X=f.has(O),oe=T.get(O)||[];return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"8px",minWidth:"0"},children:[e.jsxs(is,{"data-selected":X?"true":"false",style:{position:"relative",cursor:"pointer"},onClick:()=>x(O),children:[X&&!l&&e.jsx("button",{onClick:s=>{s.stopPropagation(),confirm(v("Are you sure you want to remove this photo?"))&&w(O)},style:{position:"absolute",top:"6px",right:"6px",width:"18px",height:"18px",borderRadius:"50%",border:"none",backgroundColor:"rgba(220, 53, 69, 0.8)",color:"white",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:"bold",zIndex:15,opacity:1,transition:"all 0.2s ease",transform:"scale(0.8)"},onMouseEnter:s=>{s.currentTarget.style.backgroundColor="rgba(200, 35, 51, 0.9)",s.currentTarget.style.transform="scale(1)",s.currentTarget.style.opacity="1"},onMouseLeave:s=>{s.currentTarget.style.backgroundColor="rgba(220, 53, 69, 0.8)",s.currentTarget.style.transform="scale(0.8)",s.currentTarget.style.opacity="0"},title:v("Remove photo"),children:"×"}),$.status!=="complete"&&e.jsx(as,{$status:$.status,children:$.status==="error"?"✕":$.status==="uploading"?"↑":$.status==="processing"?"⚙️":"•"}),e.jsxs(os,{style:{opacity:t.length===1||!X?1:.85,transition:"opacity 0.2s ease"},children:[$.type==="video"||(ne=$.type)!=null&&ne.startsWith("video")?e.jsx(ns,{src:$.s3PreviewUrl,controls:!0}):e.jsx(ls,{src:$.s3PreviewUrl,alt:$.fileName}),($.status==="uploading"||$.status==="processing")&&e.jsx(at,{$bottom:"4px",$left:"4px",$right:"4px",$height:"4px",children:e.jsx(ot,{$progress:$.progress,$status:$.status})})]}),e.jsxs("div",{style:{position:"absolute",bottom:"32px",left:"8px",right:"8px",background:"rgba(0, 0, 0, 0.7)",color:"white",padding:"4px 8px",borderRadius:"4px",fontSize:"11px",textAlign:"center",backdropFilter:"blur(4px)"},children:[(le=$.type)!=null&&le.startsWith("video")?v("Video"):v("Image"),$.size&&` • ${($.size/1024/1024).toFixed(1)} ${v("MB")}`,$.duration&&` • ${$.duration}${v("s")}`]}),$.status==="error"&&$.errorMessage&&e.jsxs(ds,{$type:"error",children:[v("Error"),": ",$.errorMessage.length>40?$.errorMessage.substring(0,37)+"...":$.errorMessage]})]}),e.jsx("div",{style:{minHeight:"60px",display:"flex",flexDirection:"column",gap:"4px"},children:e.jsx(mt,{photoTags:oe,isSelected:X,onToggleSelection:()=>x(O),fileName:$.originalFileName||$.fileName,showFileName:!0})})]},O)})}),e.jsx("style",{children:`
          [data-selected="true"]:hover button {
            opacity: 1 !important;
            transform: scale(1) !important;
          }
        `})]})},ir=({isSavingAlbum:t,savingProgress:f})=>{const{t:l}=Te();return t?e.jsxs(Ke,{children:[e.jsx(ts,{children:l("Saving Album")}),e.jsx(ss,{id:"saveProgressText",children:l("Moving files...")}),e.jsx(at,{children:e.jsx(ot,{id:"saveProgress",$progress:f/100})})]}):null},ar=({showFolderDetails:t,isCreator:f,folderName:l,setFolderName:w,folderDescription:x,setFolderDescription:J,isSavingAlbum:i})=>{const{t:m}=Te();return!t||f!==!0?null:e.jsxs(Ke,{children:[e.jsxs(Ze,{children:[e.jsx(Le,{htmlFor:"folderName",children:m("Album Name")}),e.jsx(Lt,{id:"folderName",type:"text",value:l,onChange:T=>w(T.target.value),placeholder:m("e.g. Family Vacation in Kyoto"),disabled:i})]}),e.jsxs(Ze,{children:[e.jsx(Le,{htmlFor:"folderDescription",children:m("Album Description")}),e.jsx(es,{id:"folderDescription",value:x,onChange:T=>J(T.target.value),placeholder:m("e.g. what's special about this album"),rows:4,disabled:i})]})]})},or=`
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
`,nr=`
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
`,lr=`
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
`,dr=`
  mutation DeleteTag($tagId: String!) {
    deleteTag(tagId: $tagId) {
      id
      hasBeenDeleted
    }
  }
`,cr=`
  mutation DeleteSubtag($subtagId: String!) {
    deleteSubtag(subtagId: $subtagId) {
      id
      hasBeenDeleted
    }
  }
`,ur=(t,f,l,w,x,J,i)=>{const[m,T]=d.useState([]),[j,v]=d.useState(null),[B,D]=d.useState(!1),[o,$]=d.useState(null),[O,X]=d.useState(null),[oe,ne]=d.useState(!1),[le,s]=d.useState(!1),[ae,ce]=d.useState(""),[H,p]=d.useState(""),[ee,g]=d.useState(!1),[V,te]=d.useState(!1),U=d.useMemo(()=>({photoIndices:Array.from(x),existingIndices:Array.from(J)}),[x,J]),ie=()=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(r){const c=Math.random()*16|0;return(r=="x"?c:c&3|8).toString(16)}),pe=d.useCallback(()=>{const r=[];t.forEach(P=>{r.push(...P)}),l.forEach(P=>{r.push(...P)});const c=new Map;return r.forEach(P=>{if(c.has(P.tagTitle)){const M=c.get(P.tagTitle),h=[...M.subtags,...P.subtags],u=Array.from(new Map(h.map(n=>[n.subtagTitle,n])).values());c.set(P.tagTitle,{...M,subtags:u})}else c.set(P.tagTitle,P)}),Array.from(c.values())},[t,l]),Se=d.useCallback((r,c)=>{const P=[],M=Math.floor(Date.now()/1e3);return c.forEach(h=>{const u=r.find(n=>n.tagTitle===h.tagTitle);if(u){const n=[];if(h.subtags.forEach(F=>{var k;if(!((k=u.subtags)==null?void 0:k.find(Y=>Y.subtagTitle===F.subtagTitle))){const Y={id:ie(),tagTitle:F.tagTitle,subtagTitle:F.subtagTitle,TagType:h.TagType||"File",points:1,createdAt:M,updatedAt:M,isCreatedFromApplied:!0};n.push(Y),i(`Created missing subtag from applied tags: ${F.subtagTitle} for tag ${F.tagTitle}`)}}),n.length>0){const F=r.findIndex(E=>E.id===u.id);F!==-1&&(r[F]={...u,subtags:[...u.subtags||[],...n]})}}else{const n={id:ie(),tagTitle:h.tagTitle,TagType:h.TagType||"File",points:1,createdAt:M,updatedAt:M,subtags:[],isCreatedFromApplied:!0};h.subtags&&h.subtags.length>0&&(n.subtags=h.subtags.map(F=>({id:ie(),tagTitle:F.tagTitle,subtagTitle:F.subtagTitle,TagType:h.TagType||"File",points:1,createdAt:M,updatedAt:M,isCreatedFromApplied:!0}))),P.push(n),i(`Created missing tag from applied tags: ${h.tagTitle} with ${h.subtags.length} subtags`)}}),P},[ie,i]),fe=d.useCallback(r=>{const{photoIndices:c,existingIndices:P}=U;if(c.length===0&&P.length===0)return!1;const M=c.length===0||c.every(n=>(t.get(n)||[]).some(E=>E.tagTitle===r.tagTitle)),h=P.length===0||P.every(n=>(l.get(n)||[]).some(E=>E.tagTitle===r.tagTitle)),u=M&&h;return(c.length>0||P.length>0)&&i(`Tag "${r.tagTitle}" applied to all selected? ${u} (photos: ${M}, existing: ${h})`),u},[U,t,l,i]),xe=d.useCallback(r=>{const{photoIndices:c,existingIndices:P}=U;let M=0,h=0;c.forEach(k=>{const re=(t.get(k)||[]).find(ve=>ve.tagTitle===r.tagTitle);re&&(M++,re.subtags.some(ve=>ve.subtagTitle===r.subtagTitle)&&h++)});let u=0,n=0;P.forEach(k=>{const re=(l.get(k)||[]).find(ve=>ve.tagTitle===r.tagTitle);re&&(u++,re.subtags.some(ve=>ve.subtagTitle===r.subtagTitle)&&n++)});const F=M+u,E=h+n;return F>0&&E===F},[U,t,l]),Ce=d.useCallback(r=>{const{photoIndices:c,existingIndices:P}=U;if(c.length===0&&P.length===0){i("No files selected for tag application");return}const M=fe(r);i(`${M?"Removing":"Applying"} tag "${r.tagTitle}" ${M?"from":"to"} all selected files`),c.length>0&&f(h=>{const u=new Map(h);return c.forEach(n=>{const F=u.get(n)||[];if(M){const E=F.filter(k=>k.tagTitle!==r.tagTitle);u.set(n,E),i(`Removed tag "${r.tagTitle}" from photo ${n}`)}else if(!F.some(k=>k.tagTitle===r.tagTitle)){const k={tagTitle:r.tagTitle,TagType:r.TagType,subtags:[]};u.set(n,[...F,k]),i(`Added tag "${r.tagTitle}" to photo ${n}`)}}),u}),P.length>0&&w(h=>{const u=new Map(h);return P.forEach(n=>{const F=u.get(n)||[];if(M){const E=F.filter(k=>k.tagTitle!==r.tagTitle);u.set(n,E),i(`Removed tag "${r.tagTitle}" from existing file ${n}`)}else if(!F.some(k=>k.tagTitle===r.tagTitle)){const k={tagTitle:r.tagTitle,TagType:r.TagType,subtags:[]};u.set(n,[...F,k]),i(`Added tag "${r.tagTitle}" to existing file ${n}`)}}),u})},[U,fe,f,w,i]),ue=d.useCallback(r=>{const{photoIndices:c,existingIndices:P}=U;if(c.length===0&&P.length===0){i("No files selected for subtag application");return}const M=xe(r);i(`${M?"Removing":"Applying"} subtag "${r.subtagTitle}" ${M?"from":"to"} all selected files with parent tag`),c.length>0&&f(h=>{const u=new Map(h);return c.forEach(n=>{const E=(u.get(n)||[]).map(k=>{if(k.tagTitle===r.tagTitle){if(M)return{...k,subtags:k.subtags.filter(Y=>Y.subtagTitle!==r.subtagTitle)};if(!k.subtags.some(re=>re.subtagTitle===r.subtagTitle))return{...k,subtags:[...k.subtags,{tagTitle:r.tagTitle,subtagTitle:r.subtagTitle}]}}return k});u.set(n,E)}),u}),P.length>0&&w(h=>{const u=new Map(h);return P.forEach(n=>{const E=(u.get(n)||[]).map(k=>{if(k.tagTitle===r.tagTitle){if(M)return{...k,subtags:k.subtags.filter(Y=>Y.subtagTitle!==r.subtagTitle)};if(!k.subtags.some(re=>re.subtagTitle===r.subtagTitle))return{...k,subtags:[...k.subtags,{tagTitle:r.tagTitle,subtagTitle:r.subtagTitle}]}}return k});u.set(n,E)}),u})},[U,xe,f,w,i]),C=d.useCallback(()=>{const{photoIndices:r,existingIndices:c}=U,P=[];r.forEach(u=>{const n=t.get(u)||[];P.push(...n)}),c.forEach(u=>{const n=l.get(u)||[];P.push(...n)});const M=new Map;P.forEach(u=>{if(M.has(u.tagTitle)){const n=M.get(u.tagTitle),F=[...n.subtags,...u.subtags],E=Array.from(new Map(F.map(k=>[k.subtagTitle,k])).values());M.set(u.tagTitle,{...n,subtags:E})}else M.set(u.tagTitle,u)});const h=Array.from(M.values());return i(`getAppliedTagsForSelected: ${h.length} unique tags from ${r.length} photos + ${c.length} existing files`),h},[U,t,l,i]),b=d.useCallback(()=>x.size>0||J.size>0,[x.size,J.size]),R=async()=>{var r,c;i("Fetching tags from API and checking for missing applied tags"),D(!0);try{const P=await ye();if(!P){i("No token available for fetching tags");return}const h=await(await fetch(De,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${P}`},body:JSON.stringify({query:or,variables:{fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(i("Tags API response:",h),h.errors){console.error("GraphQL errors:",h.errors),i(`GraphQL errors: ${JSON.stringify(h.errors)}`);return}let n=(((c=(r=h==null?void 0:h.data)==null?void 0:r.fetchRelations)==null?void 0:c.items)||[]).map(E=>{var k,Y;return{id:E.id,tagTitle:E.tagTitle,TagType:E.TagType,points:E.points,createdAt:E.createdAt,updatedAt:E.updatedAt,subtags:((Y=(k=E.subtags)==null?void 0:k.items)==null?void 0:Y.map(re=>({id:re.id,tagTitle:re.tagTitle,subtagTitle:re.subtagTitle,TagType:re.TagType,points:re.points,createdAt:re.createdAt,updatedAt:re.updatedAt})))||[]}});i(`Fetched ${n.length} tags from API`);const F=pe();if(i(`Found ${F.length} unique applied tags in file maps`),F.length>0){const E=Se(n,F);E.length>0&&(i(`Created ${E.length} missing tags from applied tags`),n=[...E,...n])}i(`Final tags list: ${n.length} tags (including ${n.filter(E=>E.isCreatedFromApplied).length} created from applied tags)`),T(n)}catch(P){console.error("Error fetching tags:",P),i(`Error fetching tags: ${P}`)}finally{D(!1)}},A=d.useCallback(r=>{i(`Setting displayed tag: ${r}`),v(r)},[i]),q=d.useCallback(()=>{if(!j)return[];const r=m.find(c=>c.id===j);return(r==null?void 0:r.subtags)||[]},[j,m]),_=async(r,c)=>{if(i(`Adding new tag: ${r} of type: ${c}`),!r.trim())return i("Cannot add tag with empty title"),!1;g(!0);try{if(!await ye())return i("No token available for adding tag"),!1;if(await(async()=>(i("PLACEHOLDER: Would send GraphQL mutation to add tag",{mutation:nr,variables:{tagInput:{tagTitle:r.trim(),TagType:c,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(u=>setTimeout(u,500)),!0))()){const u={id:ie(),tagTitle:r.trim(),TagType:c,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3),subtags:[]};return T(n=>[u,...n]),Ce(u),A(u.id),ce(""),ne(!1),i(`Successfully added and applied new tag: ${r}`),!0}return!1}catch(P){return console.error("Error adding new tag:",P),i(`Error adding new tag: ${P}`),!1}finally{g(!1)}},W=async(r,c,P)=>{if(i(`Adding new subtag: ${c} to tag: ${r}`),!c.trim())return i("Cannot add subtag with empty title"),!1;if(!j)return i("No displayed tag for adding subtag"),!1;te(!0);try{if(!await ye())return i("No token available for adding subtag"),!1;if(await(async()=>(i("PLACEHOLDER: Would send GraphQL mutation to add subtag",{mutation:lr,variables:{subtagInput:{tagTitle:r,subtagTitle:c.trim(),TagType:P,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(n=>setTimeout(n,500)),!0))()){const n={id:ie(),tagTitle:r,subtagTitle:c.trim(),TagType:P,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3)};return T(F=>F.map(E=>E.id===j?{...E,subtags:[n,...E.subtags||[]]}:E)),ue(n),p(""),s(!1),i(`Successfully added and applied new subtag: ${c}`),!0}return!1}catch(M){return console.error("Error adding new subtag:",M),i(`Error adding new subtag: ${M}`),!1}finally{te(!1)}},Z=async r=>{i(`Deleting tag: ${r}`),$(r);try{if(!await ye())return i("No token available for deleting tag"),!1;if(await(async()=>(i("PLACEHOLDER: Would send GraphQL mutation to delete tag",{mutation:dr,variables:{tagId:r}}),await new Promise(h=>setTimeout(h,500)),!0))()){const h=m.find(u=>u.id===r);return T(u=>u.filter(n=>n.id!==r)),h&&(f(u=>{const n=new Map(u);return u.forEach((F,E)=>{const k=F.filter(Y=>Y.tagTitle!==h.tagTitle);n.set(E,k)}),n}),w(u=>{const n=new Map(u);return u.forEach((F,E)=>{const k=F.filter(Y=>Y.tagTitle!==h.tagTitle);n.set(E,k)}),n})),j===r&&A(null),i(`Successfully deleted tag: ${r}`),!0}return!1}catch(c){return console.error("Error deleting tag:",c),i(`Error deleting tag: ${c}`),!1}finally{$(null)}},G=async r=>{i(`Deleting subtag: ${r}`),X(r);try{if(!await ye())return i("No token available for deleting subtag"),!1;if(await(async()=>(i("PLACEHOLDER: Would send GraphQL mutation to delete subtag",{mutation:cr,variables:{subtagId:r}}),await new Promise(h=>setTimeout(h,500)),!0))()){let h=null;return T(u=>u.map(n=>{var E;const F=((E=n.subtags)==null?void 0:E.filter(k=>k.id===r?(h=k,!1):!0))||[];return{...n,subtags:F}})),h&&(f(u=>{const n=new Map(u);return u.forEach((F,E)=>{const k=F.map(Y=>Y.tagTitle===h.tagTitle?{...Y,subtags:Y.subtags.filter(re=>re.subtagTitle!==h.subtagTitle)}:Y);n.set(E,k)}),n}),w(u=>{const n=new Map(u);return u.forEach((F,E)=>{const k=F.map(Y=>Y.tagTitle===h.tagTitle?{...Y,subtags:Y.subtags.filter(re=>re.subtagTitle!==h.subtagTitle)}:Y);n.set(E,k)}),n})),i(`Successfully deleted subtag: ${r}`),!0}return!1}catch(c){return console.error("Error deleting subtag:",c),i(`Error deleting subtag: ${c}`),!1}finally{X(null)}},K=()=>{ne(!0),ce("")},de=()=>{ne(!1),ce("")},se=()=>{s(!0),p("")},ge=()=>{s(!1),p("")},we=async()=>ae.trim()?await _(ae,"File"):!1,he=async()=>{if(H.trim()&&j){const r=m.find(c=>c.id===j);if(r)return await W(r.tagTitle,H,r.TagType)}return!1};return d.useEffect(()=>{R()},[]),d.useEffect(()=>{const r=pe();if(r.length>0&&m.length>0){const c=r.filter(P=>!m.some(M=>M.tagTitle===P.tagTitle));c.length>0&&(i(`Detected ${c.length} new applied tags, refreshing tags list`,c.map(P=>P.tagTitle)),R())}},[t,l,pe,m,i]),d.useEffect(()=>{if(i(`Selection changed - Photos: ${x.size}, Existing: ${J.size}`),j){const r=m.find(c=>c.id===j);r&&!fe(r)&&(i(`Clearing displayed tag "${r.tagTitle}" because it's no longer applied to all selected files`),v(null))}},[x.size,J.size,j,m,fe,i]),d.useEffect(()=>{if(j){const r=m.find(c=>c.id===j);r&&!fe(r)&&(i(`Clearing displayed tag "${r.tagTitle}" due to tag map changes`),v(null))}},[t,l,j,m,fe,i]),{tags:m,displayedTagId:j,isLoadingTags:B,tagIdBeingDeleted:o,subtagIdBeingDeleted:O,isAddingNewTag:oe,isAddingNewSubtag:le,newTagTitle:ae,newSubtagTitle:H,isSubmittingNewTag:ee,isSubmittingNewSubtag:V,fetchTags:R,toggleTagOnSelectedFiles:Ce,toggleSubtagOnSelectedFiles:ue,setDisplayedTag:A,isTagAppliedToSelected:fe,isSubtagAppliedToSelected:xe,getDisplayedTagSubtags:q,getAppliedTagsForSelected:C,hasSelectedFiles:b,addNewTag:_,addNewSubtag:W,deleteTag:Z,deleteSubtag:G,startAddingNewTag:K,cancelAddingNewTag:de,startAddingNewSubtag:se,cancelAddingNewSubtag:ge,submitNewTag:we,submitNewSubtag:he,setNewTagTitle:ce,setNewSubtagTitle:p,extractAllAppliedTags:pe,createMissingAppliedTags:Se}},pr=({children:t,t:f,isRTL:l})=>e.jsxs("div",{style:{padding:"32px",marginBottom:"32px",backgroundColor:"#f8f9fa",border:"2px solid #e9ecef",borderRadius:"12px",direction:l?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",fontSize:"18px",color:"#495057",fontWeight:"600",marginBottom:"24px",flexDirection:l?"row-reverse":"row"},children:[e.jsx("span",{style:{marginRight:l?"0":"12px",marginLeft:l?"12px":"0",fontSize:"20px"},children:"🏷️"}),f("Select files to start adding or removing tags")]}),t]}),fr=({selectedPhotos:t,selectedPhotoIndices:f,onToggleSelection:l,onSelectAll:w,onDeselectAll:x,onRemovePhoto:J,onDeleteAll:i,disabled:m,photoTagsMap:T,columns:j,setColumns:v,t:B,isRTL:D})=>t.length===0?null:e.jsxs("div",{style:{marginBottom:"32px",direction:D?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"16px",flexDirection:D?"row-reverse":"row"},children:[e.jsxs("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:[B("New Files")," (",t.length,")"]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:D?"flex-start":"flex-end",gap:"8px"},children:[e.jsxs("div",{style:{display:"flex",gap:"8px",flexDirection:D?"row-reverse":"row"},children:[e.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:m?"#f8f9fa":"#fff",color:m?"#999":"#333",cursor:m?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:f.size>0?x:w,disabled:m,onMouseEnter:o=>{m||(o.currentTarget.style.backgroundColor="#f8f9fa")},onMouseLeave:o=>{m||(o.currentTarget.style.backgroundColor="#fff")},children:f.size>0?B("Done Tagging Selected"):B("Select All")}),f.size===0&&e.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #dc3545",borderRadius:"4px",backgroundColor:m?"#f8f9fa":"#fff",color:m?"#999":"#dc3545",cursor:m?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:i,disabled:m,onMouseEnter:o=>{m||(o.currentTarget.style.backgroundColor="#dc3545",o.currentTarget.style.color="#fff")},onMouseLeave:o=>{m||(o.currentTarget.style.backgroundColor="#fff",o.currentTarget.style.color="#dc3545")},children:B("Delete All")})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",flexDirection:D?"row-reverse":"row"},children:[e.jsx(hs,{style:{margin:"0",fontSize:"12px"},children:B("Columns:")}),e.jsxs(bs,{value:j,onChange:o=>v(o.target.value),style:{fontSize:"12px"},children:[e.jsx("option",{value:"1",children:"1"}),e.jsx("option",{value:"2",children:"2"}),e.jsx("option",{value:"3",children:"3"}),e.jsx("option",{value:"4",children:"4"}),e.jsx("option",{value:"5",children:"5"})]})]})]})]}),e.jsx(rr,{selectedPhotos:t,selectedPhotoIndices:f,isSavingAlbum:m,onRemovePhoto:J,onTogglePhotoSelection:l,onSelectAllPhotos:w,onDeselectAllPhotos:x,hideHeader:!0,photoTagsMap:T,columns:j})]}),gr=({existingFiles:t,selectedExistingIndices:f,onToggleSelection:l,onSelectAll:w,onDeselectAll:x,onDeleteFile:J,disabled:i,isCreator:m,participantsCanDeleteItems:T,existingFileTagsMap:j,t:v,isRTL:B})=>t.length===0?null:e.jsxs("div",{style:{marginBottom:"32px",direction:B?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px",flexDirection:B?"row-reverse":"row"},children:[e.jsx("div",{children:e.jsxs("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:[v("Existing Files")," (",t.length,")"]})}),e.jsx("div",{style:{display:"flex",gap:"8px",flexDirection:B?"row-reverse":"row"},children:e.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:i?"#f8f9fa":"#fff",color:i?"#999":"#333",cursor:i?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:f.size>0?x:w,disabled:i,onMouseEnter:D=>{i||(D.currentTarget.style.backgroundColor="#f8f9fa")},onMouseLeave:D=>{i||(D.currentTarget.style.backgroundColor="#fff")},children:f.size>0?v("Done Tagging Selected"):v("Select All")})})]}),e.jsx("div",{style:{display:"flex",overflowX:"auto",gap:"16px",padding:"20px",border:"2px dashed #007bff",borderRadius:"12px",backgroundColor:"#fff",boxShadow:"0 2px 8px rgba(0, 0, 0, 0.04)",scrollbarWidth:"thin",scrollbarColor:"#007bff #f8f9fa"},children:t.map((D,o)=>{const $=f.has(o),O=j.get(o)||[];return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"8px",minWidth:"160px"},children:[e.jsxs("div",{style:{position:"relative",width:"100%",height:"160px",flexShrink:0,borderRadius:"12px",overflow:"hidden",border:$?"2px solid rgba(0, 123, 255, 0.6)":"2px solid #ddd",cursor:i?"not-allowed":"pointer",opacity:i?.6:1,transition:"all 0.3s ease",boxShadow:$?"0 0 0 3px rgba(0, 123, 255, 0.3), 0 4px 12px rgba(0, 123, 255, 0.15)":"0 2px 8px rgba(0, 0, 0, 0.04)",transform:$?"translateY(-2px)":"translateY(0)"},onClick:()=>!i&&l(o),children:[e.jsx(vs,{thumbnailDataKey:D.thumbnailDataKey,dataKey:D.dataKey,alt:v("Existing file"),style:{width:"100%",height:"100%",objectFit:"cover"}}),$&&!i&&(m===!0||T)&&e.jsx("button",{onClick:X=>{X.stopPropagation(),confirm(v("Are you sure you want to remove this file?"))&&J(o)},style:{position:"absolute",top:"6px",right:"6px",width:"18px",height:"18px",borderRadius:"50%",border:"none",backgroundColor:"rgba(220, 53, 69, 0.8)",color:"white",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:"bold",zIndex:15,opacity:1,transition:"all 0.2s ease",transform:"scale(0.8)"},onMouseEnter:X=>{X.currentTarget.style.backgroundColor="rgba(200, 35, 51, 0.9)",X.currentTarget.style.transform="scale(1)",X.currentTarget.style.opacity="1"},onMouseLeave:X=>{X.currentTarget.style.backgroundColor="rgba(220, 53, 69, 0.8)",X.currentTarget.style.transform="scale(0.8)",X.currentTarget.style.opacity="0"},title:v("Remove file"),children:"×"}),D.dataInBytes>0&&e.jsxs("div",{style:{position:"absolute",bottom:"4px",left:"4px",backgroundColor:"rgba(0,0,0,0.7)",color:"white",fontSize:"10px",padding:"2px 4px",borderRadius:"4px"},children:[(D.dataInBytes/(1024*1024)).toFixed(1),v("MB")]}),D.durationInSeconds&&e.jsxs("div",{style:{position:"absolute",bottom:"4px",right:"4px",backgroundColor:"rgba(0,0,0,0.7)",color:"white",fontSize:"10px",padding:"2px 4px",borderRadius:"4px"},children:[Math.floor(D.durationInSeconds/60),":",String(Math.floor(D.durationInSeconds%60)).padStart(2,"0")]})]}),e.jsxs("div",{style:{minHeight:"60px",display:"flex",flexDirection:"column",gap:"4px"},children:[D.fileName&&e.jsx("div",{style:{fontSize:"11px",fontWeight:"600",color:"#333",padding:"4px 8px",backgroundColor:$?"#e3f2fd":"#f8f9fa",borderRadius:"4px",border:`1px solid ${$?"#90caf9":"#e9ecef"}`,textAlign:"center",wordBreak:"break-word",lineHeight:"1.2",transition:"all 0.2s ease"},children:D.fileName}),e.jsx("div",{style:{minHeight:"32px"},children:O.length>0?e.jsx(mt,{photoTags:O,isSelected:$,onToggleSelection:()=>!i&&l(o)}):e.jsx("div",{style:{fontSize:"10px",color:"#6c757d",fontStyle:"italic",textAlign:"center",padding:"6px 8px",backgroundColor:"rgba(108, 117, 125, 0.1)",borderRadius:"4px",border:"1px solid rgba(108, 117, 125, 0.2)"},children:v("No tags applied")})})]})]},`existing-${o}-${D.dataKey}`)})})]}),mr=()=>{const{t,language:f}=Te(),l=We(f)==="rtl",w=ys(t),{setShowUsernamePrompt:x,setUsernameInput:J}=w,[i,m]=d.useState(null),[T,j]=d.useState(!1),[v,B]=d.useState(0),[D,o]=d.useState(""),[$,O]=d.useState(""),[X,oe]=d.useState(!1),[ne,le]=d.useState(!1),[s,ae]=d.useState("NoPassword"),[ce,H]=d.useState(""),[p,ee]=d.useState(!1),[g,V]=d.useState(!0),[te,U]=d.useState(!1),[ie,pe]=d.useState(null),[Se,fe]=d.useState(!1),[xe,Ce]=d.useState([]),[ue,C]=d.useState(!1),[b,R]=d.useState(!1),[A,q]=d.useState("2"),[_,W]=d.useState(new Set),[Z,G]=d.useState(new Map),[K,de]=d.useState([]),[se,ge]=d.useState(new Set),[we,he]=d.useState(new Map),[r,c]=d.useState(!1),P=a=>{!i&&a&&m(a)},{fileInputRef:M,selectedPhotos:h,setSelectedPhotos:u,isUploading:n,progressTracker:F,setProgressTracker:E,debugMessages:k,currentFolderId:Y,openFilePicker:re,handleFileSelection:ve,setOnSaveAlbumPage:Re,log:Oe}=Ts(P,!0);d.useEffect(()=>{const a=localStorage.getItem("save-album-columns")||"2";q(a)},[]);const xt=a=>{q(a),localStorage.setItem("save-album-columns",a)};d.useEffect(()=>(Re(!0),S("🏠 Set isOnSaveAlbumPage to true - navigation disabled"),()=>{Re(!1),S("🏠 Set isOnSaveAlbumPage to false - navigation enabled")}),[Re]),d.useEffect(()=>{(async()=>{try{await Zt(),Oe("🔥 Save-album page S3 credentials prewarmed successfully")}catch(I){Oe(`⚠️ Save-album page credential prewarming failed: ${String(I)}`)}})()},[]);const S=(a,I)=>{let z=`[${new Date().toISOString()}] ${a}`;if(I!==void 0)try{const Q=typeof I=="object"?JSON.stringify(I,null,2):String(I);z+=`
Data: ${Q}`,console.log(z),console.log("Data object:",I)}catch(Q){z+=` [Error stringifying data: ${Q}]`,console.log(z),console.log("Raw data:",I)}else console.log(z);Oe(z)},ht=async a=>{var I,N,z;if(a){c(!0),S(`Fetching existing album data for folder ID: ${a}`);try{const Q=await ye();if(!Q){S("❌ Authentication failed while fetching existing album data");return}const me=`
        mutation FetchRelations($fetchRelationsInput: FetchRelationsInput!) {
          fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
            items {
              ... on FolderPosition {
                ${Ss}
              }
            }
          }
        }
      `,Wt={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}},je=await(await fetch(De,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${Q}`},body:JSON.stringify({query:me,variables:Wt})})).json();if(je.errors){console.error("GraphQL errors:",je.errors),S(`❌ Failed to fetch existing album data: ${JSON.stringify(je.errors)}`);return}const Ge=(((N=(I=je==null?void 0:je.data)==null?void 0:I.fetchRelations)==null?void 0:N.items)||[]).find(Ie=>Ie&&Ie.folder&&Ie.folder.id===a);if(!Ge)return;const Pe=Ge.folder,Kt=((z=Pe==null?void 0:Pe.fileReferencesPage)==null?void 0:z.items)||[],Ne=[],Ue=new Map;Kt.forEach((Ie,Je)=>{const Ae=Ie.file;if(Ae&&Ae.dataKey){let Ee=Ie.fileDisplayName;if(!Ee&&Ae.dataKey){const ke=Ae.dataKey.split("/");Ee=ke[ke.length-1],S(`Using dataKey fallback filename for existing file: ${Ee}`)}Ne.push({dataKey:Ae.dataKey,thumbnailDataKey:Ae.thumbnailDataKey||null,durationInSeconds:Ae.durationInSeconds||null,dataInBytes:Ae.dataInBytes||0,fileName:Ee||null});const Qe=Ie.selectedTags||[];if(Qe.length>0){const ke=Qe.map(Fe=>{var Ve;return{tagTitle:Fe.tagTitle,TagType:Fe.TagType,subtags:((Ve=Fe.subtags)==null?void 0:Ve.map(Ye=>({tagTitle:Ye.tagTitle,subtagTitle:Ye.subtagTitle})))||[]}});Ue.set(Je,ke),S(`Existing file ${Je} (${Ee||"unnamed"}) has ${ke.length} tags applied:`,ke.map(Fe=>Fe.tagTitle))}}}),de(Ne),he(Ue),S(`✅ Successfully loaded ${Ne.length} existing files with ${Ue.size} files having existing tags and ${Ne.filter(Ie=>Ie.fileName).length} files with names (including fallback from dataKey)`),!D&&Pe.folderName&&o(Pe.folderName),!$&&Pe.folderDescription&&O(Pe.folderDescription)}catch(Q){console.error("Failed to fetch existing album data:",Q),S(`❌ Failed to fetch existing album data: ${String(Q)}`)}finally{c(!1)}}};d.useEffect(()=>{const I=new URLSearchParams(window.location.search).get("folderId");if(I){S(`Found folderId query parameter: ${I} - loading existing album`),C(!0),m(I),fe(!1),localStorage.removeItem(be.SUB_ALBUM_DATA),S("Cleared sub-album data from localStorage - loading existing album from query parameter");const N=localStorage.getItem(be.SELECTED_PHOTOS);if(!N)S("No stored photos found - proceeding with existing album load");else try{const z=JSON.parse(N);Array.isArray(z)&&z.length>0?S(`Found ${z.length} stored photos - these may be newly uploaded for this album, preserving them`):(localStorage.removeItem(be.SELECTED_PHOTOS),S("Cleared empty photos array from localStorage"))}catch(z){S(`Error parsing stored photos: ${z}`),localStorage.removeItem(be.SELECTED_PHOTOS)}oe(!0),pe(!0)}else S("No folderId query parameter found, will proceed with normal initialization"),C(!1)},[]);const{cognitoUsername:He,publicUsername:Me,setPublicUsername:bt}=Gs(ue?()=>{}:m,u,ue?()=>{}:pe,ue?()=>{}:oe,o,O,ee,V,ae,H,ue?()=>{}:fe,ue?()=>{}:Ce,U,S);d.useEffect(()=>{i&&(S(`Loading existing files for folder ID: ${i}`),ht(i))},[i]);const yt=ur(Z,G,we,he,_,se,S),{saveAlbumDirectly:qe}=Js(i||Y,He,h,Se,xe,D,$,p,g,te,s,ce,Z,we,K,se,j,B,u,E,S,t);d.useEffect(()=>{Y&&!i&&(m(Y),S(`Updated folder ID from upload processor: ${Y}`))},[Y,i]),d.useEffect(()=>{W(a=>{const I=new Set;return a.forEach(N=>{N<h.length&&I.add(N)}),I}),G(a=>{const I=new Map(a),N=[];return a.forEach((z,Q)=>{Q>=h.length&&N.push(Q)}),N.forEach(z=>{I.delete(z)}),I})},[h.length]),d.useEffect(()=>{ge(a=>{const I=new Set;return a.forEach(N=>{N<K.length&&I.add(N)}),I}),he(a=>{const I=new Map(a),N=[];return a.forEach((z,Q)=>{Q>=K.length&&N.push(Q)}),N.forEach(z=>{I.delete(z)}),I})},[K.length]);const wt=a=>{S(`Removing photo at index: ${a}`);const I=h.filter((N,z)=>z!==a);u(I),S(`New files count: ${I.length}`),I.length>0?(localStorage.setItem(be.SELECTED_PHOTOS,JSON.stringify(I)),S(`Updated localStorage with ${I.length} photos`)):(localStorage.removeItem(be.SELECTED_PHOTOS),S("Removed photos from localStorage")),W(N=>{const z=new Set;return N.forEach(Q=>{Q<a?z.add(Q):Q>a&&z.add(Q-1)}),z}),G(N=>{const z=new Map;return N.forEach((Q,me)=>{me<a?z.set(me,Q):me>a&&z.set(me-1,Q)}),z})},Tt=a=>{S(`Removing existing file at index: ${a}`);const I=K.filter((N,z)=>z!==a);de(I),S(`New existing files count: ${I.length}`),ge(N=>{const z=new Set;return N.forEach(Q=>{Q<a?z.add(Q):Q>a&&z.add(Q-1)}),z}),he(N=>{const z=new Map;return N.forEach((Q,me)=>{me<a?z.set(me,Q):me>a&&z.set(me-1,Q)}),z})},$t=a=>{S(`Toggling selection for existing file at index: ${a}`),ge(I=>{const N=new Set(I);return N.has(a)?(N.delete(a),S(`Deselected existing file ${a} - remaining selected: ${N.size}`)):(N.add(a),S(`Selected existing file ${a} - total selected: ${N.size}`)),N})},St=()=>{S(`Selecting all ${K.length} existing files`);const a=new Set;for(let I=0;I<K.length;I++)a.add(I);ge(a),S(`Selected all existing files - total: ${a.size}`)},vt=()=>{S("Deselecting all existing files"),ge(new Set)},It=a=>{S(`Toggling selection for photo at index: ${a}`),W(I=>{const N=new Set(I);return N.has(a)?(N.delete(a),S(`Deselected photo ${a} - remaining selected: ${N.size}`)):(N.add(a),S(`Selected photo ${a} - total selected: ${N.size}`)),N})},At=()=>{S(`Selecting all ${h.length} photos`);const a=new Set;for(let I=0;I<h.length;I++)a.add(I);W(a),S(`Selected all photos - total: ${a.size}`)},Ct=()=>{S("Deselecting all photos"),W(new Set)},Pt=()=>{confirm(t("Are you sure you want to delete all new files? This action cannot be undone."))&&(S("Deleting all new photos"),u([]),W(new Set),G(new Map),localStorage.removeItem(be.SELECTED_PHOTOS),S("Cleared all photos from localStorage"))};d.useEffect(()=>{S("Selection state changed:",{selectedPhotos:Array.from(_),selectedExistingFiles:Array.from(se),totalSelected:_.size+se.size})},[_,se,S]);const jt=()=>{const a=!p;S(`Toggling isOnPublicProfile to: ${a}`),ee(a)},kt=()=>{const a=!g;S(`Toggling participantsCanAddItems to: ${a}`),V(a)},Dt=()=>{const a=!te;S(`Toggling participantsCanDeleteItems to: ${a}`),U(a)},Et=async()=>{S("Album save initiated"),S("Photo tags applied:",Object.fromEntries(Z)),S("Existing file tags applied:",Object.fromEntries(we)),R(!1),j(!0);try{if(Me!=null&&Me.startsWith("Profile-")){S("Public username starts with 'Profile-', showing username prompt"),J(""),x(!0),j(!1);return}S("Valid username found, proceeding to save album directly with file-level tagging"),qe()}catch(a){console.error("Error in handleSaveAlbum:",a),S(`Error in handleSaveAlbum: ${a}`),j(!1)}},Ft=a=>{S(`Handling successful username update to: ${a}`),localStorage.setItem(be.PUBLIC_USERNAME,a),bt(a),x(!1),S("Proceeding to save album after username update"),qe()},_t=(a,I)=>{S(`Password dialog closed with option: ${a}, password: ${I?"******":"undefined"}`),a&&ae(a),I!==void 0&&H(I),le(!1)},Nt=()=>{S("Opening password dialog"),le(!0)},zt=()=>{S("Add photos button clicked"),re(i)},Rt=()=>{R(!b)},_e=a=>{a(),R(!1)};d.useEffect(()=>{const a=I=>{const N=I.target;b&&!N.closest(".settings-dropdown-container")&&R(!1)};return b&&document.addEventListener("mousedown",a),()=>{document.removeEventListener("mousedown",a)}},[b]);const Be=T||n||r,Ot=h.length>0||K.length>0,Mt=_.size>0||se.size>0,Bt=$e.useMemo(()=>{const a=_.size+se.size;return S(`Total selected files count updated: ${a}`),a},[_.size,se.size,S]),Ut=$e.useMemo(()=>{const a=Array.from(Z.entries()).map(([N,z])=>`${N}:${z.map(Q=>`${Q.tagTitle}(${Q.subtags.map(me=>me.subtagTitle).join(",")})`).join("|")}`).join(";"),I=Array.from(we.entries()).map(([N,z])=>`${N}:${z.map(Q=>`${Q.tagTitle}(${Q.subtags.map(me=>me.subtagTitle).join(",")})`).join("|")}`).join(";");return`${a}||${I}`},[Z,we]);return e.jsxs(e.Fragment,{children:[e.jsx(cs,{}),e.jsx(us,{children:e.jsxs(ps,{children:[e.jsx(fs,{href:"my-albums.html",children:t("My Albums")}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[ie===!0&&e.jsxs("div",{className:"settings-dropdown-container",style:{position:"relative",display:"flex",alignItems:"center"},children:[e.jsx("button",{onClick:Rt,disabled:T||n||r,style:{background:"none",border:"none",cursor:T||n||r?"not-allowed":"pointer",padding:"8px",borderRadius:"4px",display:"flex",alignItems:"center",justifyContent:"center",color:T||n||r?"#ccc":"#666",fontSize:"18px",transition:"all 0.2s ease",backgroundColor:b?"#f0f0f0":"transparent",opacity:T||n||r?.5:1},onMouseEnter:a=>{!b&&!T&&!n&&!r&&(a.currentTarget.style.backgroundColor="#f8f9fa")},onMouseLeave:a=>{!b&&!T&&!n&&!r&&(a.currentTarget.style.backgroundColor="transparent")},title:t("Album Settings"),children:"⚙️"}),b&&!T&&!n&&!r&&e.jsxs(gs,{children:[e.jsx(ze,{onClick:()=>_e(jt),children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[e.jsx("span",{children:t(p?"Remove From Public Profile":"Add To Public Profile")}),e.jsx("span",{style:{fontSize:"12px",color:p?"#28a745":"#6c757d",fontWeight:"bold"},children:p?"✓":"○"})]})}),e.jsx(ze,{onClick:()=>_e(kt),children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[e.jsx("span",{children:t(g?"Allow Additions":"Do Not Allow Additions")}),e.jsx("span",{style:{fontSize:"12px",color:g?"#28a745":"#6c757d",fontWeight:"bold"},children:g?"✓":"○"})]})}),e.jsx(ze,{onClick:()=>_e(Dt),children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[e.jsx("span",{children:t(te?"Allow Removals":"Do Not Allow Removals")}),e.jsx("span",{style:{fontSize:"12px",color:te?"#28a745":"#6c757d",fontWeight:"bold"},children:te?"✓":"○"})]})}),e.jsx(ze,{onClick:()=>_e(Nt),children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[e.jsx("span",{children:t("Album Password Policy")}),e.jsx("span",{style:{fontSize:"12px",color:s!=="NoPassword"?"#28a745":"#6c757d",fontWeight:"bold"},children:s!=="NoPassword"?"✓":"○"})]})})]})]}),e.jsx(et,{$primary:!0,onClick:Et,disabled:T||n||r,style:{minWidth:"120px",fontSize:"14px",padding:"8px 16px"},children:t(T?"Saving...":"Save Album")})]})]})}),e.jsxs(ms,{$isRTL:l,children:[e.jsx("div",{style:{marginTop:X&&ie===!0?"3px":"0"},children:e.jsx(ar,{showFolderDetails:X,isCreator:ie,folderName:D,setFolderName:o,folderDescription:$,setFolderDescription:O,isSavingAlbum:T||n})}),(n||F.totalFiles>0&&(F.filesUploading>0||F.filesProcessing>0||F.filesComplete<F.totalFiles))&&e.jsx($s,{progressTracker:F,isRTL:We(f)==="rtl",variant:"detailed",context:"saving",isUploading:n,showSuccessMessage:!1,showErrorMessage:!0,customMessages:{error:t("Some photos could not be processed. You can continue with the successfully processed photos.")}}),r&&e.jsx("div",{style:{padding:"16px",marginBottom:"16px",backgroundColor:"#f8f9fa",border:"1px solid #dee2e6",borderRadius:"8px",color:"#6c757d",textAlign:"center",fontStyle:"italic"},children:t("Loading existing files...")}),e.jsx("input",{ref:M,id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:a=>ve(a,He),style:{display:"none"}}),X&&ie===!0&&Ot&&e.jsxs(pr,{t,isRTL:l,children:[K.length>0&&e.jsx("div",{style:{marginBottom:"32px"},children:e.jsx(gr,{existingFiles:K,selectedExistingIndices:se,onToggleSelection:$t,onSelectAll:St,onDeselectAll:vt,onDeleteFile:Tt,disabled:Be,isCreator:ie,participantsCanDeleteItems:te,existingFileTagsMap:we,t,isRTL:l})}),e.jsx(fr,{selectedPhotos:h,selectedPhotoIndices:_,onToggleSelection:It,onSelectAll:At,onDeselectAll:Ct,onRemovePhoto:wt,onDeleteAll:Pt,disabled:Be,photoTagsMap:Z,columns:A,setColumns:xt,t,isRTL:l}),e.jsx("div",{style:{marginTop:Mt?"32px":"16px"},children:e.jsx(tr,{tagsManager:yt,disabled:Be,enhancedLog:S},`tags-${Bt}-${Ut.slice(0,20)}`)})]}),e.jsx(ir,{isSavingAlbum:T,savingProgress:v}),e.jsx(xs,{children:e.jsx(et,{onClick:zt,disabled:T||n||r,children:t(n?"Uploading...":"Add More Photos")})}),e.jsx(ws,{t,language:f,usernameManager:w,onSuccess:Ft}),e.jsx(Ks,{isOpen:ne,onClose:_t,initialOption:s,initialPassword:ce}),e.jsx(Hs,{debugMessages:k,t,isRTL:l,textDirection:l?"rtl":"ltr"})]})]})},xr=()=>e.jsx(Xt,{children:e.jsx(mr,{})});Yt.createRoot(document.getElementById("root")).render(e.jsx(xr,{}));
