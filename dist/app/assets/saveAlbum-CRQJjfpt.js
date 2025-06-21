import{d as N,u as me,a as g,j as t,g as De,h as Te,L as be,i as Ge,m as Gt,s as Jt,k as Qt,l as Yt,f as Ce,n as Vt,r as ke,o as $e,R as Xt,I as Zt,p as Lt}from"./utils-CWdzPvYe.js";import{P as es,S as ts,e as ss,V as is,f as rs,g as ot,h as nt,M as as,C as lt,i as os,j as ns,F as Je,k as Qe,l as ls,m as ds,G as dt,n as ct,o as ut,p as pt,q as cs,r as us,B as Ee,s as gt,t as ps}from"./styled-components-B6xIuogB.js";import{u as gs,U as fs}from"./useUsernameManagement-srNJ7Tox.js";import{u as ms,U as xs}from"./useFileUploadProcessor-CpX7IOHU.js";import{F as hs}from"./types-Cxncrjqw.js";import{L as bs}from"./LazyImage-BrSh01Xa.js";import{g as Ye,c as Me}from"./folderStructureUtils-BmdkosLC.js";const v={colors:{primary:"#007bff",primaryDark:"#0056b3",secondary:"#6c757d",success:"#4caf50",danger:"#e53935",warning:"#ff9800",white:"#fff",text:{primary:"#333",secondary:"#666",light:"#777"},background:{primary:"#f9fafb",highlight:"#f0f7ff"},border:"#ddd"},spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px"},borderRadius:{small:"4px",medium:"8px"},boxShadow:{lg:"0 4px 10px rgba(0,0,0,0.08)"}},ws=N.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10000;
`,ys=N.div`
  background-color: ${v.colors.white};
  border-radius: ${v.borderRadius.medium};
  box-shadow: ${v.boxShadow.lg};
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
  scrollbar-color: ${v.colors.border} transparent;
  
  /* Custom scrollbar for webkit browsers */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${v.colors.border};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${v.colors.secondary};
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
    border-radius: ${v.borderRadius.small};
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
`,Ts=N.div`
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
`,vs=N.div`
  direction: ${e=>e.$isRTL?"rtl":"ltr"};
`,$s=N.h3`
  font-size: 24px;
  font-weight: 600;
  color: ${v.colors.text.primary};
  margin: 0 0 ${v.spacing.lg} 0;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 22px;
    margin: 0 0 ${v.spacing.md} 0;
  }
  
  @media (max-height: 700px) {
    font-size: 20px;
    margin: 0 0 ${v.spacing.md} 0;
  }
  
  @media (max-width: 480px) {
    font-size: 18px;
  }
`,Ss=N.p`
  margin-bottom: ${v.spacing.lg};
  font-size: 16px;
  color: ${v.colors.text.secondary};
  line-height: 1.5;
  
  @media (max-width: 768px) {
    margin-bottom: ${v.spacing.md};
    font-size: 15px;
  }
  
  @media (max-height: 700px) {
    margin-bottom: ${v.spacing.sm};
    font-size: 14px;
  }
`,Ve=N.div`
  margin-bottom: ${v.spacing.lg};
`,Xe=N.label`
  display: block;
  margin-bottom: ${v.spacing.sm};
  font-size: 14px;
  font-weight: 500;
  color: ${v.colors.text.primary};
`,Is=N.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${v.colors.border};
  border-radius: ${v.borderRadius.small};
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${v.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  &::placeholder {
    color: ${v.colors.text.light};
  }
`,As=N.div`
  display: flex;
  flex-direction: column;
  gap: ${v.spacing.md};
  margin-bottom: ${v.spacing.xl};
`,Ps=N.div`
  border: 2px solid ${e=>e.$isSelected?v.colors.primary:v.colors.border};
  border-radius: ${v.borderRadius.medium};
  padding: ${v.spacing.lg};
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${e=>e.$isSelected?v.colors.background.highlight:v.colors.white};
  display: flex;
  align-items: center;
  gap: ${v.spacing.lg};
  
  @media (max-width: 768px) {
    padding: ${v.spacing.md};
    gap: ${v.spacing.md};
  }
  
  @media (max-width: 480px) {
    padding: ${v.spacing.sm};
    gap: ${v.spacing.sm};
  }
  
  @media (max-height: 700px) {
    padding: ${v.spacing.sm};
    gap: ${v.spacing.sm};
  }
`,js=N.div`
  flex: 1;
`,ks=N.div`
  margin-bottom: ${v.spacing.xs};
`,Cs=N.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${v.colors.primary};
  flex-shrink: 0;
`,Ds=N.label`
  font-size: 16px;
  font-weight: 500;
  color: ${v.colors.text.primary};
  cursor: pointer;
  display: block;
`,Fs=N.div`
  font-size: 14px;
  color: ${v.colors.text.secondary};
  margin-top: ${v.spacing.xs};
`,_s=N.div`
  color: ${v.colors.warning};
  font-size: 12px;
  font-style: italic;
  margin-top: ${v.spacing.xs};
  font-weight: 500;
`,Es=N.div`
  display: flex;
  gap: ${v.spacing.sm};
  justify-content: center;
  margin-top: ${v.spacing.xl};
`,Ze=N.button`
  background-color: ${e=>e.$variant==="danger"?v.colors.danger:e.$variant==="secondary"?"transparent":e.$variant==="success"?v.colors.success:v.colors.primary};
  color: ${e=>e.$variant==="secondary"?v.colors.primary:v.colors.white};
  border: ${e=>e.$variant==="secondary"?`1px solid ${v.colors.primary}`:"none"};
  padding: ${e=>e.$size==="small"?"8px 16px":e.$size==="large"?"16px 32px":"12px 24px"};
  border-radius: ${v.borderRadius.medium};
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  font-size: ${e=>e.$size==="small"?"14px":e.$size==="large"?"18px":"16px"};
  font-weight: 500;
  transition: all 0.2s ease;
  opacity: ${e=>e.disabled?.6:1};
  min-width: 100px;

  &:hover:not(:disabled) {
    background-color: ${e=>e.$variant==="danger"?"#c62828":e.$variant==="secondary"?v.colors.background.highlight:e.$variant==="success"?"#388e3c":v.colors.primaryDark};
  }
`,Ns=N.div`
  background-color: ${v.colors.background.primary};
  border-radius: ${v.borderRadius.medium};
  padding: ${v.spacing.md};
  margin: ${v.spacing.md} 0;
  border-left: 4px solid ${v.colors.primary};
  font-size: 14px;
  color: ${v.colors.text.secondary};
  line-height: 1.4;
  
  @media (max-width: 768px) {
    padding: ${v.spacing.sm};
    margin: ${v.spacing.sm} 0;
    font-size: 13px;
  }
  
  @media (max-height: 700px) {
    padding: ${v.spacing.xs};
    font-size: 12px;
  }
`,zs=[{value:"NotVisible",titleKey:"Password Required To See Or Save",descriptionKey:"Album will be completely hidden until correct password is entered"},{value:"Watermark",titleKey:"Watermarked And No Saving Without Password",descriptionKey:"Photos will be visible with watermarks, password required to save"},{value:"CannotBeSaved",titleKey:"Password Required To Save",descriptionKey:"Photos are visible but password required to download or save"},{value:"NoPassword",titleKey:"No Password",descriptionKey:"Album is fully public with no restrictions"}],Rs=({isOpen:e,onClose:c,initialOption:l="NoPassword",initialPassword:n=""})=>{const{t:o,language:B}=me(),i=De(B)==="rtl",[u,w]=g.useState(l),[S,A]=g.useState(n);if(g.useEffect(()=>{e&&(w(l),A(n))},[e,l,n]),!e)return null;const C=S.trim()==="",d=I=>{w(I)},a=I=>{I.target===I.currentTarget&&c()},f=I=>I!=="NoPassword";return t.jsxs(t.Fragment,{children:[t.jsx(ws,{onClick:a}),t.jsx(ys,{children:t.jsx(Ts,{children:t.jsxs(vs,{$isRTL:i,children:[t.jsx($s,{children:o("Album Password Policy")}),t.jsx(Ss,{children:o("Configure password protection for your album. Choose how you want to restrict access to your photos.")}),t.jsxs(Ve,{children:[t.jsx(Xe,{children:o("Enter Password")}),t.jsx(Is,{type:"text",placeholder:o("Enter password (optional)"),value:S,onChange:I=>A(I.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"})]}),t.jsxs(Ve,{children:[t.jsx(Xe,{children:o("Select Protection Level")}),t.jsx(As,{children:zs.map(I=>t.jsxs(Ps,{$isSelected:u===I.value,onClick:()=>d(I.value),children:[t.jsx(Cs,{type:"radio",name:"protection",checked:u===I.value,onChange:()=>d(I.value)}),t.jsxs(js,{children:[t.jsx(ks,{children:t.jsx(Ds,{children:o(I.titleKey)})}),t.jsx(Fs,{children:o(I.descriptionKey)}),C&&f(I.value)&&u===I.value&&t.jsx(_s,{children:o('⚠️ Will use "password" as default if left empty')})]})]},I.value))})]}),f(u)&&t.jsxs(Ns,{children:[t.jsx("strong",{children:o("💡 Password Protection Info:")}),t.jsx("br",{}),o('If you leave the password field empty, "password" will be used as the default password. You can change this anytime in album settings.')]}),t.jsxs(Es,{children:[t.jsx(Ze,{$variant:"secondary",onClick:()=>c(),children:o("Cancel")}),t.jsx(Ze,{$variant:"primary",onClick:()=>{const I=C&&f(u)?"password":S;console.log(`Saving with option: ${u}, password: ${I.length>0?"********":"none"}`),c(u,I)},children:o("Save")})]})]})})})]})},Ms=({debugMessages:e,t:c,isRTL:l,textDirection:n})=>e.length===0?null:t.jsxs("div",{style:{marginTop:"40px",background:"#fff3cd",padding:"16px",borderRadius:"8px",border:"1px solid #ffeeba",maxWidth:900,margin:"0 auto",direction:n},children:[t.jsx("h3",{style:{marginTop:0,fontSize:"18px",color:"#856404",textAlign:l?"right":"left"},children:c("Debug Log")}),t.jsx("pre",{style:{fontSize:"14px",color:"#856404",whiteSpace:"pre-wrap",maxHeight:"400px",overflow:"auto",textAlign:l?"right":"left"},children:e.map((o,B)=>t.jsx("div",{style:{marginBottom:"8px"},children:o},B))})]}),Os=`
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
`,Bs=(e,c,l,n,o,B,i,u,w,S,A,C,d,a)=>{const[f,I]=g.useState(null),[E,z]=g.useState(null),m=async O=>{a(`Initializing folder ID with username: ${O}`);try{const V=new URLSearchParams(window.location.search).get("folderId");if(a(`Folder ID from URL: ${V||"null"}`),V){e(V),a(`Using existing folder ID: ${V}`);try{a(`Fetching details for folder: ${V}`);const T=await J(V,a);if(a("Folder details retrieved:",T),T){const Q=`${O}_____${O}____Account`,oe=T.creatorId===Q;if(a(`User is creator of folder: ${oe}, accountId: ${Q}, creator: ${T.creatorId}`),l(oe),oe){a("User is creator, showing folder details"),n(!0),o(T.folderName),B(T.folderDescription),i(T.isOnPublicProfile),a(`Setting isOnPublicProfile: ${T.isOnPublicProfile}`),T.participantsCanAddItems!==void 0&&(u(T.participantsCanAddItems),a(`Setting participantsCanAddItems: ${T.participantsCanAddItems}`)),T.participantsCanDeleteItems!==void 0&&(d(T.participantsCanDeleteItems),a(`Setting participantsCanDeleteItems: ${T.participantsCanDeleteItems}`));const H=T.passwordPolicy;a(`Password policy from folder details: ${H}`),w(H),H!=="NoPassword"&&T.password&&S(T.password),a(`Set password protection option to: ${H}`)}else a("User is NOT the creator, hiding editable fields"),n(!1)}else a("No folder details retrieved, setting isCreator to true"),l(!0),n(!0)}catch(T){console.error("Error fetching folder details:",T),a(`Error fetching folder details: ${T}`),l(!1)}}else{const T=`${O}_____${Ge()}____Folder`;a(`Creating new folder ID: ${T}`),e(T),a("Setting isCreator to true for new album"),l(!0),n(!0)}}catch(y){console.error("Folder ID initialization error:",y),a(`Folder ID initialization error: ${y}`),l(!1)}},J=async(O,y)=>{var V,T,Q,oe,H,ne,ue,we,pe;y(`Fetching details for folder ID: ${O}`);try{const xe=await Te();if(!xe)return y("No token available for fetching folder details"),null;y("Sending GraphQL query to fetch folder details");const he=await(await fetch(Ce,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${xe}`},body:JSON.stringify({query:Os,variables:{folderIds:[O],fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(y("Folder details API response:",he),he.errors)return console.error("GraphQL errors:",he.errors),y(`GraphQL errors: ${JSON.stringify(he.errors)}`),null;const F=((T=(V=he==null?void 0:he.data)==null?void 0:V.fetchFolders)==null?void 0:T.items)||[];if(y(`Found ${F.length} folder items`),F.length===0)return y("No folder items found"),null;const P=F[0];y("Retrieved folder data:",P);const W=((oe=(Q=P.folderPosition)==null?void 0:Q.profileIds)==null?void 0:oe.some(U=>U.includes("Public____Profile")))||!1;y(`Folder is on public profile: ${W}`),y("Profile IDs:",(H=P.folderPosition)==null?void 0:H.profileIds);const $=(ne=P.folderInviteParameters)==null?void 0:ne.usingFolderInviteGrantsRightToAddItems;y(`Participants can add items: ${$}`);const q=(ue=P.folderInviteParameters)==null?void 0:ue.usingFolderInviteGrantsRightToRemoveItems;return y(`Participants can delete items: ${q}`),{creatorId:P.creatorId||"",folderName:P.folderName||"",folderDescription:P.folderDescription||"",passwordPolicy:((we=P.folderPassword)==null?void 0:we.policy)||"NoPassword",password:((pe=P.folderPassword)==null?void 0:pe.password)||"",isOnPublicProfile:W,participantsCanAddItems:$!==void 0?$:!0,participantsCanDeleteItems:q!==void 0?q:!1}}catch(xe){return console.error("Error in fetchFolderDetails:",xe),y(`Error in fetchFolderDetails: ${xe}`),null}},s=()=>{a("Attempting to restore photos from localStorage");try{const O=localStorage.getItem(be.SELECTED_PHOTOS);if(a(`Found stored photos: ${O?"yes":"no"}`),O)try{const y=JSON.parse(O);a(`Parsed ${y.length} photos from localStorage`),Array.isArray(y)&&y.length>0&&(c(y),a(`Restored ${y.length} photos to state (including original filenames)`))}catch(y){console.error("Error parsing stored photos:",y),a(`Error parsing stored photos: ${y}`)}}catch(O){console.error("Error restoring photos from storage:",O),a(`Error restoring photos from storage: ${O}`)}},ae=()=>{a("Testing S3 connection");try{Jt?a("S3 client is available"):(console.error("S3 client not available"),a("S3 client not available"))}catch(O){console.error("S3 connection test error:",O),a(`S3 connection test error: ${O}`)}},te=async()=>{var O;a("Starting component initialization");try{a("Checking login with refresh");const y=await Te();if(!y){a("No token returned from login check, aborting initialization");return}try{const V=localStorage.getItem(be.PUBLIC_USERNAME);a(`Retrieved public username from localStorage: ${V||"null"}`),z(V||null);const Q=JSON.parse(atob(y.split(".")[1]))["cognito:username"];if(Q){a(`Extracted Cognito username from token: ${Q}`),I(Q);const oe=localStorage.getItem(be.SUB_ALBUM_DATA);if(a(`Sub-album data from localStorage: ${oe||"null"}`),oe)try{const H=JSON.parse(oe);if(a("Parsed sub-album data:",H),H.isSubAlbum&&((O=H.selectedFileIds)==null?void 0:O.length)>0){a(`Valid sub-album data found with ${H.selectedFileIds.length} files`),A(!0),C(H.selectedFileIds),H.selectedPhotos&&H.selectedPhotos.length>0&&(a(`Found ${H.selectedPhotos.length} selected photos in sub-album data`),c(H.selectedPhotos)),n(!0),l(!0);const ne=`${Q}_____${Ge()}____Folder`;a(`Generated new folder ID for sub-album: ${ne}`),e(ne)}else a("Invalid sub-album data, proceeding with normal initialization"),await m(Q)}catch(H){console.error("Error parsing sub-album data:",H),a(`Error parsing sub-album data: ${H}`),await m(Q)}else a("No sub-album data found, proceeding with normal folder initialization"),await m(Q)}else a("No Cognito username found in token")}catch(V){console.error("User data initialization error:",V),a(`User data initialization error: ${V}`)}s(),ae(),a("Component initialization completed")}catch(y){console.error("Initialization error:",y),a(`Initialization error: ${y}`)}};return g.useEffect(()=>{te()},[]),{cognitoUsername:f,publicUsername:E,setPublicUsername:z}},Us=(e,c,l,n,o,B,i,u,w,S,A,C,d,a,f,I,E,z,m,J,s,ae)=>{const te=F=>(s(`Converting ${F.length} tags to API format`),F.map(P=>({TagType:P.TagType,tagTitle:P.tagTitle,subtags:P.subtags.map(W=>({TagType:P.TagType,tagTitle:W.tagTitle,subtagTitle:W.subtagTitle}))}))),O=F=>{s(`Save progress text: ${F}`);const P=document.getElementById("saveProgressText");P&&(P.innerText=F)},y=F=>{const P=document.getElementById("saveProgress");P?(P.style.width=`${F}%`,s(`Updated save progress bar: ${F}%`)):s("Progress bar element not found"),z(F)},V=(F,P)=>{s(`Splitting array of ${F.length} items into chunks of ${P}`);const W=[];for(let $=0;$<F.length;$+=P)W.push(F.slice($,$+P));return s(`Created ${W.length} chunks`),W},T=F=>{const P=new Set;return F.filter(W=>P.has(W.fileId)?(s(`Skipping duplicate file reference with ID: ${W.fileId}`),!1):(P.add(W.fileId),!0))},Q=(F,P,W)=>{s("Creating folder position input WITHOUT folder-level tags"),s(`Profile visibility: ${u?"Public":"Only Me"}`);const $=u?[`${c}_____Public____Profile`]:["Only Me_____Only Me____Profile"];s(`Profile IDs: ${JSON.stringify($)}`);let q=[];n&&o.length>0&&(s(`Creating file reference IDs for ${o.length} sub-album files`),q=o.map(Y=>{const Z=Y.split("_____");if(Z.length>=2){const se=Z[1].split("____")[0],fe=`${W}_____${se}____FileReference`;return s(`Created file reference ID for sub-album: ${fe}`),fe}return s(`Using original fileId as fallback: ${Y}`),Y})),s(`Created ${q.length} acceptedFileReferenceIds`);const U=A!=="NoPassword"?C:null;if(s(`Password protection: ${A}`),s(`Album password: ${U?"******":"null"}`),s(`Participants can add items: ${w}`),s(`Participants can delete items: ${S}`),!e)throw s("Error: folderId is null or undefined"),new Error("folderId is required to create folder position input");const G=Qt(e),X=Yt(G);return{currentTime:F,folderId:e,profileIds:$,folderPositionPoints:1,acceptedFileReferenceIds:q,folderInput:{folderAboutContactIds:[P],albumNanoId:X,folderName:B,folderDescription:i,folderPasswordInput:{password:U,policy:A},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:w,usingFolderInviteGrantsRightToRemoveItems:S,addedItemsNeedFolderCreatorApproval:!1}}}},oe=(F,P,W)=>(s(`Creating file reference inputs with individual photo tags and original filenames for ${F.length} photos`),F.map(($,q)=>{var de;const U=d.get(q)||[],G=te(U),X=$.originalFileName||$.fileName;if(s(`Photo ${q} (${$.fileName}): ${U.length} tags applied, display name: ${X}`),$.fileId)return s(`Using existing fileId for photo: ${$.fileId}`),{fileReferencesHolderId:e,currentTime:P,points:1,hasBeenDeleted:!1,selectedTagInputs:G,fileId:$.fileId,fileDisplayName:X,fileInput:null};const Y=$.type==="video"||(de=$.type)!=null&&de.startsWith("video")?`Input/Video/${$.fileName}`:`Input/Image/${$.fileName}`,Z=`${c}_____${$.fileName}____File`;return s(`Created file reference for ${$.fileName}:`),s(`  - dataKey: ${Y}`),s(`  - fileId: ${Z}`),s(`  - fileDisplayName: ${X}`),s(`  - thumbnailDataKey: ${$.thumbnailDataKey||"undefined"}`),s(`  - size: ${$.size}`),s(`  - thumbnailSize: ${$.thumbnailSize||0}`),s(`  - duration: ${$.duration||"undefined"}`),s(`  - tags: ${U.length} tags selected for this photo`),{fileReferencesHolderId:e,currentTime:P,points:1,hasBeenDeleted:!1,selectedTagInputs:G,fileId:Z,fileDisplayName:X,fileInput:{fileId:Z,ownerFileInput:{editorContactIds:[W],FileSharingOptionsEnum:"Anyone",dataKey:Y,thumbnailDataKey:$.thumbnailDataKey,dataInBytes:$.size,thumbnailDataInBytes:$.thumbnailSize||0,s3UploadedAt:P,durationInSeconds:$.duration},editorFileInput:{aboutContactIds:[W],captionText:"",numericFilterInputs:[]}}}})),H=F=>{const P=[];return I.forEach(W=>{const $=a.get(W)||[];if($.length>0){const q=f[W];if(q){const U=q.dataKey.split("/"),G=U[U.length-1],X=`${c}_____${G}____File`,Y=q.fileName||G,Z=te($);s(`Creating file reference for existing file ${W} (${G}) with ${$.length} tags, display name: ${Y}`),P.push({fileReferencesHolderId:e,currentTime:F,points:1,hasBeenDeleted:!1,selectedTagInputs:Z,fileId:X,fileDisplayName:Y,fileInput:null})}}}),s(`Created ${P.length} file references for existing files with tags and filenames`),P},ne=async F=>{var q,U;s("Sending folder-only mutation (no file references, no folder tags)");const P=await Te();if(!P)throw s("No token available for saving album, aborting"),new Error("Authentication token not available");const W=`
      mutation MyMutation($folderPositionInputs: [FolderPositionInput!]) {
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items {
            id
          }
        }
      }
    `,$={folderPositionInputs:[F]};s("GraphQL folder-only mutation variables:",$);try{s("Sending API request to save folder");const G=await fetch(Ce,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${P}`},body:JSON.stringify({query:W,variables:$})});s(`API response status: ${G.status}`);const X=await G.text();s(`API response raw text: ${X}`);const Y=JSON.parse(X);if(s("API response JSON:",Y),Y.errors)throw console.error("Folder save failed:",Y.errors),s("Folder save failed with errors:",Y.errors),new Error("Failed to save folder");return s("Folder saved successfully"),((U=(q=Y.data)==null?void 0:q.changeFiles)==null?void 0:U.items)||[]}catch(G){throw console.error("Error in sendFolderOnlyMutation:",G),s(`Error in sendFolderOnlyMutation: ${G}`),G}},ue=async F=>{var q,U,G,X,Y;s(`Sending file references-only mutation with ${F.length} items (each with individual tags and filenames)`);const P=await Te();if(!P)throw s("No token available for saving file references, aborting"),new Error("Authentication token not available");const W=`
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
    `,$={updatedFileReferenceInputs:F};s("GraphQL file references-only mutation variables (first item):",F.length>0?F[0]:"No items");try{s("Sending API request to save file references with individual tags and filenames");const Z=await fetch(Ce,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${P}`},body:JSON.stringify({query:W,variables:$})});s(`API response status: ${Z.status}`);const de=await Z.text();s(`API response raw text: ${de.substring(0,500)}...`);const se=JSON.parse(de);if(s("API response JSON items count:",((G=(U=(q=se.data)==null?void 0:q.changeFiles0)==null?void 0:U.items)==null?void 0:G.length)||0),se.errors)throw console.error("File references save failed:",se.errors),s("File references save failed with errors:",se.errors),new Error("Failed to save file references");return s("File references chunk saved successfully with individual photo tags and filenames"),((Y=(X=se.data)==null?void 0:X.changeFiles0)==null?void 0:Y.items)||[]}catch(Z){throw console.error("Error in sendFileReferencesOnlyMutation:",Z),s(`Error in sendFileReferencesOnlyMutation: ${Z}`),Z}},we=async(F,P)=>{var U,G,X,Y,Z,de,se,fe,ye;s(`Sending final chunk with folder mutation (${F.length} file references with filenames, no folder tags)`);const W=await Te();if(!W)throw s("No token available for saving final chunk, aborting"),new Error("Authentication token not available");const $=`
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
    `,q={folderPositionInputs:[P],updatedFileReferenceInputs:F};s("GraphQL final mutation variables (folder + last chunk with filenames, no folder tags)");try{s("Sending API request for final save with folder (no folder tags, with filenames)");const ge=await fetch(Ce,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${W}`},body:JSON.stringify({query:$,variables:q})});s(`API response status: ${ge.status}`);const r=await ge.text();s(`API response raw text: ${r.substring(0,500)}...`);const x=JSON.parse(r);if(s("API response JSON:",{fileReferencesCount:((X=(G=(U=x.data)==null?void 0:U.changeFiles0)==null?void 0:G.items)==null?void 0:X.length)||0,folderItems:((Z=(Y=x.data)==null?void 0:Y.changeFiles)==null?void 0:Z.items)||[]}),x.errors)throw console.error("Final save failed:",x.errors),s("Final save failed with errors:",x.errors),new Error("Failed to complete album save");return s("Final chunk and folder saved successfully (with individual photo tags and filenames)"),{fileReferences:((se=(de=x.data)==null?void 0:de.changeFiles0)==null?void 0:se.items)||[],folderPositions:((ye=(fe=x.data)==null?void 0:fe.changeFiles)==null?void 0:ye.items)||[]}}catch(ge){throw console.error("Error in sendFinalChunkWithFolderMutation:",ge),s(`Error in sendFinalChunkWithFolderMutation: ${ge}`),ge}},pe=async()=>(s("Validating required data"),await Te()?c?e?(s("All required data validated successfully"),!0):(s("No folder ID, validation failed"),!1):(s("No Cognito username, validation failed"),!1):(s("No token available, validation failed"),!1)),xe=()=>{s("Handling successful save"),Vt(m,J,[be.SELECTED_PHOTOS,be.SUB_ALBUM_DATA],s),s("Album data cleared"),O(ae("Album saved successfully!")),sessionStorage.setItem("album_just_saved","true"),s("Set 'album_just_saved' flag in sessionStorage"),s("Setting timeout for redirect to my-albums.html"),setTimeout(()=>{s("Redirecting to my-albums.html"),ke("my-albums.html")},1e3)},Ae=async(F,P)=>{s("Starting chunked save process (individual photo tags with filenames, no folder tags, including existing files with tags)");try{O(ae("Processing files in chunks..."));const W=48;if(P.length===0)s("No file references to process, saving only folder position (no folder tags)"),await ne(F);else{const $=T(P);s(`After removing duplicates, processing ${$.length} unique file references`);const q=V($,W);s(`Split file references into ${q.length} chunks of max size ${W}`);for(let U=0;U<q.length;U++){const G=q[U];s(`Processing chunk ${U+1} of ${q.length} with ${G.length} file references`);const X=U/q.length*80;z(10+X),y(10+X),U<q.length-1?(O(ae("Saving files: chunk {{chunkNumber}} of {{totalChunks}}...",{chunkNumber:U+1,totalChunks:q.length})),await ue(G)):(O(ae("Finalizing album...")),await we(G,F))}}z(100),y(100),O(ae("Album saved successfully!")),xe()}catch(W){console.error("Error in chunked save process:",W),s(`Error in chunked save process: ${W}`),O(ae("Error: {{error}}",{error:String(W)})),E(!1)}};return{saveAlbumDirectly:async()=>{s("Starting direct album save with individual photo tagging, existing file tagging, and original filenames"),s(`Photo tags map: ${d.size} photos have tags applied`),s(`Existing file tags map: ${a.size} existing files have tags applied`),E(!0),z(5);try{if(s("Validating required data for save"),!await pe()){s("Required data validation failed, aborting save"),E(!1);return}const F=Math.floor(Date.now()/1e3),P=`${c}_____${c}____Account`,$=e.split("_____")[1].split("____")[0];s(`Save timestamp: ${F}`),s(`Account ID: ${P}`),s(`Folder ID: ${e}`),s(`Folder target item identifier: ${$}`),s("Creating folder position input (no folder tags)");const q=Q(F,P,$);s("Folder position input created:",q);let U=[];const G=l.filter(Y=>Y.status==="complete");if(s(`Found ${G.length} valid photos with 'complete' status`),G.length>0){const Y=G.filter(de=>!de.fileId);s(`Found ${Y.length} new uploads to move from temp to public folder`),Y.length>0&&(s("Moving files from temp to public folder"),await Gt(Y,y,s)),s("Creating file reference inputs for uploads with individual photo tags and original filenames");const Z=oe(G,F,P);s(`Created ${Z.length} file reference inputs for uploads`,Z),U=U.concat(Z)}const X=H(F);if(X.length>0&&(s(`Adding ${X.length} existing file references with tags and filenames`),U=U.concat(X)),n&&o.length>0){s(`Adding ${o.length} existing file references for sub-album`);const Y=o.map(Z=>{s(`Creating file reference for existing sub-album file ID: ${Z}`);const de=[],se=Z.split("_____"),fe=se.length>=2?se[1].split("____")[0]:Z;return{fileReferencesHolderId:e,currentTime:F,points:1,hasBeenDeleted:!1,selectedTagInputs:de,fileId:Z,fileDisplayName:fe,fileInput:null}});s(`Created ${Y.length} file reference inputs for sub-album files`,Y),U=U.concat(Y)}s(`Total file reference inputs: ${U.length}`),s("Sending GraphQL mutations with chunked file references (individual photo tags, existing file tags, and original filenames)"),await Ae(q,U)}catch(F){console.error("Error in saveAlbumDirectly:",F),s(`Error in saveAlbumDirectly: ${F}`),E(!1)}}}},Ws=N.div`
  margin: 32px 0;
`,ft=N.div`
  margin-bottom: 24px;
`,mt=N.h3`
  margin: 0 0 16px 0;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  display: flex;
  align-items: center;
  gap: 12px;
`,xt=N.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  min-height: 32px;
`,ht=N.button`
  position: relative;
  padding: 8px 16px;
  border: 2px solid ${e=>e.$isDisplayed?"#28a745":e.$isApplied?"#333333":"#dee2e6"};
  border-radius: 20px;
  background: ${e=>e.$isDisplayed?"#28a745":e.$isApplied?"#333333":"#ffffff"};
  color: ${e=>e.$isDisplayed||e.$isApplied?"#ffffff":"#6c757d"};
  font-size: 13px;
  font-weight: ${e=>e.$isApplied||e.$isDisplayed?"600":"500"};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${e=>e.$isDisplayed?"0 0 0 3px rgba(40, 167, 69, 0.3), 0 4px 12px rgba(40, 167, 69, 0.15)":e.$isApplied?"0 0 0 2px rgba(51, 51, 51, 0.2), 0 4px 12px rgba(51, 51, 51, 0.15)":"0 2px 8px rgba(0, 0, 0, 0.04)"};

  ${e=>e.$isBeingDeleted&&`
    opacity: 0.5;
    pointer-events: none;
  `}

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${e=>e.$isDisplayed?"0 0 0 4px rgba(40, 167, 69, 0.4), 0 6px 16px rgba(40, 167, 69, 0.2)":e.$isApplied?"0 0 0 3px rgba(51, 51, 51, 0.3), 0 6px 16px rgba(51, 51, 51, 0.2)":"0 4px 12px rgba(0, 0, 0, 0.1)"};
    
    background: ${e=>e.$isDisplayed?"#1e7e34":e.$isApplied?"#1a1a1a":"#f8f9fa"};
    
    border-color: ${e=>e.$isDisplayed?"#1e7e34":e.$isApplied?"#1a1a1a":"#007bff"};
    
    color: ${e=>e.$isDisplayed||e.$isApplied?"#ffffff":"#007bff"};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`,Ks=N(ht)`
  font-size: 12px;
  padding: 6px 12px;
  border-radius: 16px;
`,bt=N.button`
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

  ${e=>e.$isMobile&&`
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
`,Hs=N.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 16px;
`,wt=N.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 16px;
`,yt=N.button`
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
`,qs=N.div`
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
`,Gs=N.input`
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
`,Le=N.button`
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
`,Js=$e.memo(({tag:e,isApplied:c,isDisplayed:l,isBeingDeleted:n,disabled:o,onTagClick:B,onDeleteTag:i,getTagDisplayText:u})=>{const{t:w}=me(),[S,A]=g.useState(!1),[C,d]=g.useState(!1);g.useEffect(()=>{const f=()=>{d("ontouchstart"in window||navigator.maxTouchPoints>0)};return f(),window.addEventListener("resize",f),()=>window.removeEventListener("resize",f)},[]);const a=C?l&&!o&&!n:S&&l&&!o&&!n;return t.jsxs(ht,{$isApplied:c,$isDisplayed:l,$isBeingDeleted:n,disabled:o,onClick:()=>B(e),onMouseEnter:()=>!C&&l&&A(!0),onMouseLeave:()=>!C&&l&&A(!1),children:[t.jsx("span",{style:{paddingRight:a?"20px":"0"},children:u(e)}),a&&t.jsx(bt,{$isMobile:C,onClick:f=>{f.stopPropagation(),i(e.id)},disabled:n,title:w("Delete tag"),children:"×"})]})}),Qs=$e.memo(({subtag:e,isApplied:c,isBeingDeleted:l,disabled:n,onSubtagClick:o,onDeleteSubtag:B})=>{const{t:i}=me(),[u,w]=g.useState(!1),[S,A]=g.useState(!1);g.useEffect(()=>{const d=()=>{A("ontouchstart"in window||navigator.maxTouchPoints>0)};return d(),window.addEventListener("resize",d),()=>window.removeEventListener("resize",d)},[]);const C=S?c&&!n&&!l:u&&c&&!n&&!l;return t.jsxs(Ks,{$isApplied:c,$isBeingDeleted:l,disabled:n,onClick:()=>o(e),onMouseEnter:()=>!S&&c&&w(!0),onMouseLeave:()=>!S&&c&&w(!1),children:[t.jsx("span",{style:{paddingRight:C?"20px":"0"},children:e.subtagTitle}),C&&t.jsx(bt,{$isMobile:S,onClick:d=>{d.stopPropagation(),B(e.id)},disabled:l,title:i("Delete subtag"),children:"×"})]})}),Tt=({value:e,onChange:c,onSubmit:l,onCancel:n,isSubmitting:o,placeholder:B="Enter tag name..."})=>{const{t:i}=me(),u=g.useRef(null);g.useEffect(()=>{u.current&&u.current.focus()},[]);const w=S=>{S.key==="Enter"?l():S.key==="Escape"&&n()};return t.jsxs(qs,{children:[t.jsx(Gs,{ref:u,type:"text",value:e,onChange:S=>c(S.target.value),onKeyDown:w,placeholder:i(B),disabled:o}),t.jsx(Le,{onClick:l,disabled:!e.trim()||o,title:i("Add (Enter)"),children:o?"...":"✓"}),t.jsx(Le,{onClick:n,disabled:o,title:i("Cancel (Escape)"),children:"×"})]})},vt=$e.memo(({tagsManager:e,disabled:c=!1,enhancedLog:l})=>{const{t:n}=me(),{tags:o,displayedTagId:B,isLoadingTags:i,tagIdBeingDeleted:u,isAddingNewTag:w,newTagTitle:S,isSubmittingNewTag:A,toggleTagOnSelectedFiles:C,setDisplayedTag:d,isTagAppliedToSelected:a,deleteTag:f,startAddingNewTag:I,cancelAddingNewTag:E,submitNewTag:z,setNewTagTitle:m,getAppliedTagsForSelected:J,hasSelectedFiles:s}=e;if(!s())return null;const ae=$e.useCallback(T=>{if(!a(T))return T.tagTitle;const H=J().find(ue=>ue.tagTitle===T.tagTitle);if(!H||H.subtags.length===0)return T.tagTitle;const ne=H.subtags.map(ue=>ue.subtagTitle).join(" || ");return`${T.tagTitle}  |  ${ne}`},[a,J]);$e.useEffect(()=>{const T=o.filter(oe=>a(oe)),Q=J();l(`TagsDisplay render - ${T.length} tags applied to all selected files`),l("Applied tags with subtags:",Q)},[o,a,J,l]);const te=T=>{if(c)return;const Q=a(T);l(`Tag "${T.tagTitle}" clicked - current state: ${Q?"applied to all":"not applied to all"}`),C(T),T.subtags&&T.subtags.length>0&&d(Q?null:T.id),l(`After toggle - new state: ${Q?"removed from all":"applied to all"}`)},O=async T=>{if(c)return;l(`Delete tag initiated: ${T}`);const Q=await f(T);l(Q?`Tag successfully deleted: ${T}`:`Failed to delete tag: ${T}`)},y=async()=>{await z()||l("Failed to submit new tag")},V=$e.useMemo(()=>[...o].sort((T,Q)=>T.points!==Q.points?Q.points-T.points:Q.updatedAt-T.updatedAt),[o]);return t.jsxs(Ws,{children:[t.jsxs(ft,{children:[t.jsx(mt,{children:n("Apply tags to selected files")}),t.jsx(xt,{children:i?t.jsx(Hs,{children:n("Loading tags...")}):t.jsxs(t.Fragment,{children:[V.map(T=>{const Q=a(T);return t.jsx(Js,{tag:T,isApplied:Q,isDisplayed:B===T.id,isBeingDeleted:u===T.id,disabled:c,onTagClick:te,onDeleteTag:O,getTagDisplayText:ae},T.id)}),w?t.jsx(Tt,{value:S,onChange:m,onSubmit:y,onCancel:E,isSubmitting:A,placeholder:n("Enter tag name...")}):t.jsx(yt,{disabled:c,onClick:I,children:n("+ Add Tag")}),V.length===0&&!w&&t.jsx(wt,{children:n("No tags available")})]})})]}),B&&t.jsx(Ys,{tagsManager:e,disabled:c,enhancedLog:l}),t.jsx("div",{style:{marginTop:"24px",padding:"20px 24px",background:"linear-gradient(135deg, #e7f3ff 0%, #f0f8ff 100%)",borderRadius:"12px",fontSize:"13px",color:"#0c5aa6",border:"1px solid #b3d9ff",boxShadow:"0 4px 12px rgba(0, 123, 255, 0.08)"},children:t.jsxs("div",{style:{lineHeight:"2.2"},children:[t.jsxs("div",{style:{marginBottom:"8px"},children:[t.jsx("strong",{style:{color:"#28a745"},children:"🟢"}),"  ",n("Most recently clicked tag (showing subtags)")]}),t.jsxs("div",{style:{marginBottom:"8px"},children:[t.jsx("strong",{style:{color:"#333333"},children:"⚫"}),"  ",n("Applied to selected files")]}),t.jsxs("div",{children:[t.jsx("strong",{style:{color:"#6c757d"},children:"⚪"}),"  ",n("Available but not applied to all selected files")]})]})})]})}),Ys=$e.memo(({tagsManager:e,disabled:c=!1,enhancedLog:l})=>{var O;const{t:n}=me(),{displayedTagId:o,subtagIdBeingDeleted:B,isAddingNewSubtag:i,newSubtagTitle:u,isSubmittingNewSubtag:w,toggleSubtagOnSelectedFiles:S,isSubtagAppliedToSelected:A,deleteSubtag:C,startAddingNewSubtag:d,cancelAddingNewSubtag:a,submitNewSubtag:f,setNewSubtagTitle:I,tags:E}=e,z=o?((O=E.find(y=>y.id===o))==null?void 0:O.subtags)||[]:[],m=E.find(y=>y.id===o),J=y=>{c||(l(`Subtag "${y.subtagTitle}" clicked - current state: ${A(y)?"applied to all":"not applied to all"}`),S(y))},s=async y=>{if(c)return;l(`Delete subtag initiated: ${y}`);const V=await C(y);l(V?`Subtag successfully deleted: ${y}`:`Failed to delete subtag: ${y}`)},ae=async()=>{await f()||l("Failed to submit new subtag")};if(!m)return null;const te=$e.useMemo(()=>[...z].sort((y,V)=>y.points!==V.points?V.points-y.points:V.updatedAt-y.updatedAt),[z]);return t.jsxs(ft,{children:[t.jsx(mt,{children:n('Subtags for "{{tagTitle}}"',{tagTitle:m.tagTitle})}),t.jsxs(xt,{children:[te.map(y=>t.jsx(Qs,{subtag:y,isApplied:A(y),isBeingDeleted:B===y.id,disabled:c,onSubtagClick:J,onDeleteSubtag:s},y.id)),i?t.jsx(Tt,{value:u,onChange:I,onSubmit:ae,onCancel:a,isSubmitting:w,placeholder:n("Enter subtag name...")}):t.jsx(yt,{disabled:c,onClick:d,children:n("+ Add Subtag")}),te.length===0&&!i&&t.jsx(wt,{children:n("No subtags available")})]})]})}),Vs=({photoTags:e,isSelected:c=!1,onToggleSelection:l,fileName:n,showFileName:o=!1})=>{const{t:B}=me(),u=(A=>A.length===0?"":A.map(C=>{if(C.subtags.length>0){const d=C.subtags.map(a=>a.subtagTitle).join(", ");return`${C.tagTitle}: ${d}`}return C.tagTitle}).join(" • "))(e),w=e.length>0;return o&&n||w||c?t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"4px"},children:[o&&n&&t.jsx("div",{style:{fontSize:"11px",fontWeight:"600",color:"#333",padding:"4px 8px",backgroundColor:c?"#e3f2fd":"#f8f9fa",borderRadius:"4px",border:`1px solid ${c?"#90caf9":"#e9ecef"}`,textAlign:"center",wordBreak:"break-word",lineHeight:"1.2",transition:"all 0.2s ease"},children:n}),t.jsx("div",{style:{background:w?"linear-gradient(135deg, rgba(0, 123, 255, 0.95) 0%, rgba(0, 123, 255, 0.85) 100%)":"rgba(108, 117, 125, 0.6)",color:"white",padding:w?"8px 12px":"6px 12px",borderRadius:w?"8px":"6px",fontSize:w?"11px":"10px",cursor:l?"pointer":"default",backdropFilter:"blur(6px)",boxShadow:w?"0 4px 12px rgba(0, 123, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)":"0 2px 8px rgba(0, 0, 0, 0.2)",border:w?"1px solid rgba(255, 255, 255, 0.2)":"none",transition:"all 0.3s ease",lineHeight:"1.3",minHeight:"32px",display:"flex",alignItems:"center",wordBreak:"break-word"},onClick:l,onMouseEnter:A=>{w&&(A.currentTarget.style.transform="translateY(-1px)",A.currentTarget.style.boxShadow="0 6px 16px rgba(0, 123, 255, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3)")},onMouseLeave:A=>{w&&(A.currentTarget.style.transform="translateY(0)",A.currentTarget.style.boxShadow="0 4px 12px rgba(0, 123, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)")},children:w?t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",width:"100%",flexWrap:"wrap"},children:[t.jsx("span",{style:{fontSize:"12px",opacity:.9,flexShrink:0},children:"🏷️"}),t.jsx("span",{style:{fontWeight:"600",textShadow:"0 1px 2px rgba(0, 0, 0, 0.3)",flex:1},children:u})]}):t.jsx("div",{style:{opacity:.8,fontStyle:"italic",textAlign:"center",width:"100%",fontSize:"10px"},children:B("No tags applied")})})]}):null},et={traditional:{padding:"20px",border:"2px dashed #007bff",borderRadius:"12px",backgroundColor:"#fff",boxShadow:"0 2px 8px rgba(0, 0, 0, 0.04)"},horizontal:{display:"flex",overflowX:"auto",gap:"16px",padding:"20px",border:"2px dashed #007bff",borderRadius:"12px",backgroundColor:"#fff",boxShadow:"0 2px 8px rgba(0, 0, 0, 0.04)",scrollbarWidth:"thin",scrollbarColor:"#007bff #f8f9fa",scrollBehavior:"smooth",WebkitOverflowScrolling:"touch"}},tt={traditional:{display:"flex",flexDirection:"column",gap:"8px",minWidth:"0"},horizontal:{display:"flex",flexDirection:"column",gap:"8px",minWidth:"180px",maxWidth:"180px",flexShrink:0}},Oe=$e.memo(({selectedPhotos:e,selectedPhotoIndices:c,isSavingAlbum:l,onRemovePhoto:n,onTogglePhotoSelection:o,photoTagsMap:B,columns:i="1",isMultipleAlbumMode:u=!1})=>{const{t:w}=me(),S=g.useMemo(()=>{if(u&&i==="horizontal")return et.horizontal;const d=parseInt(i,10),a=isNaN(d)||d<1?1:Math.min(d,5);return{...et.traditional,display:"grid",gridTemplateColumns:`repeat(${a}, 1fr)`,gap:"16px"}},[u,i]),A=g.useMemo(()=>u&&i==="horizontal"?tt.horizontal:tt.traditional,[u,i]),C=g.useMemo(()=>u&&i==="horizontal"?"photo-card-horizontal":"photo-card-traditional",[u,i]);return e.length===0?null:t.jsx(t.Fragment,{children:t.jsx("div",{style:S,className:"photo-grid",children:e.map((d,a)=>{var E,z;const f=c.has(a),I=B.get(a)||[];return t.jsxs("div",{style:A,children:[t.jsxs(es,{"data-selected":f?"true":"false",className:`${C} ${f?"selected":""}`,onClick:()=>o(a),children:[f&&!l&&t.jsx("button",{onClick:m=>{m.stopPropagation(),confirm(w("Are you sure you want to remove this photo?"))&&n(a)},className:"photo-delete-button",title:w("Remove photo"),children:"×"}),d.status!=="complete"&&t.jsx(ts,{$status:d.status,children:d.status==="error"?"✕":d.status==="uploading"?"↑":d.status==="processing"?"⚙️":"•"}),t.jsxs(ss,{className:`media-preview ${f?"selected":""}`,children:[d.type==="video"||(E=d.type)!=null&&E.startsWith("video")?t.jsx(is,{src:d.s3PreviewUrl,controls:!0,className:"media-item"}):t.jsx(rs,{src:d.s3PreviewUrl,alt:d.fileName,className:"media-item"}),(d.status==="uploading"||d.status==="processing")&&t.jsx(ot,{$bottom:"4px",$left:"4px",$right:"4px",$height:"4px",children:t.jsx(nt,{$progress:d.progress,$status:d.status})})]}),t.jsxs("div",{className:"file-info-overlay",children:[(z=d.type)!=null&&z.startsWith("video")?w("Video"):w("Image"),d.size&&` • ${(d.size/1024/1024).toFixed(1)} ${w("MB")}`,d.duration&&` • ${d.duration}${w("s")}`]}),u&&i==="horizontal"&&f&&t.jsx("div",{className:"selection-indicator",children:w("SELECTED")}),d.status==="error"&&d.errorMessage&&t.jsxs(as,{$type:"error",children:[w("Error"),": ",d.errorMessage.length>40?d.errorMessage.substring(0,37)+"...":d.errorMessage]})]}),t.jsx("div",{className:`photo-info ${u&&i==="horizontal"?"horizontal":"traditional"}`,children:t.jsx(Vs,{photoTags:I,isSelected:f,onToggleSelection:()=>o(a),fileName:d.originalFileName||d.fileName,showFileName:!0})})]},a)})})})});Oe.displayName="PhotoHandler";const $t=$e.memo(({isSavingAlbum:e,savingProgress:c})=>{const{t:l}=me();return e?t.jsxs(lt,{children:[t.jsx(os,{children:l("Saving Album")}),t.jsx(ns,{id:"saveProgressText",children:l("Moving files...")}),t.jsx(ot,{children:t.jsx(nt,{id:"saveProgress",$progress:c/100})})]}):null});$t.displayName="SavingProgressComponent";const St=$e.memo(({showFolderDetails:e,isCreator:c,folderName:l,setFolderName:n,folderDescription:o,setFolderDescription:B,isSavingAlbum:i})=>{const{t:u}=me();return!e||c!==!0?null:t.jsxs(lt,{children:[t.jsxs(Je,{children:[t.jsx(Qe,{htmlFor:"folderName",children:u("Album Name")}),t.jsx(ls,{id:"folderName",type:"text",value:l,onChange:w=>n(w.target.value),placeholder:u("e.g. Family Vacation in Kyoto"),disabled:i})]}),t.jsxs(Je,{children:[t.jsx(Qe,{htmlFor:"folderDescription",children:u("Album Description")}),t.jsx(ds,{id:"folderDescription",value:o,onChange:w=>B(w.target.value),placeholder:u("e.g. what's special about this album"),rows:4,disabled:i})]})]})});St.displayName="FolderDetailsComponent";if(typeof document<"u"){const e=document.createElement("style");e.textContent=`
    .photo-grid {
      position: relative;
      /* FIXED: Added transition for smooth column changes */
      transition: grid-template-columns 0.3s ease;
    }

    .photo-card-traditional {
      position: relative;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .photo-card-horizontal {
      position: relative;
      cursor: pointer;
      transition: all 0.3s ease;
      width: 180px;
      height: 180px;
    }

    .photo-card-horizontal.selected {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 123, 255, 0.3), 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .photo-delete-button {
      position: absolute;
      top: 6px;
      right: 6px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: none;
      background-color: rgba(220, 53, 69, 0.9);
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: bold;
      z-index: 15;
      opacity: 1;
      transition: all 0.2s ease;
      transform: scale(0.9);
      box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
    }

    .photo-delete-button:hover {
      background-color: rgba(200, 35, 51, 0.95);
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(220, 53, 69, 0.4);
    }

    .media-preview {
      transition: opacity 0.2s ease;
    }

    .media-preview.selected {
      opacity: 0.85;
    }

    .media-item {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .photo-card-horizontal .media-item {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .file-info-overlay {
      position: absolute;
      bottom: 32px;
      left: 8px;
      right: 8px;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 11px;
      text-align: center;
      backdrop-filter: blur(4px);
    }

    .selection-indicator {
      position: absolute;
      bottom: 4px;
      left: 4px;
      right: 4px;
      background: rgba(0, 123, 255, 0.9);
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 10px;
      font-weight: bold;
      text-align: center;
      backdrop-filter: blur(4px);
      box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);
    }

    .photo-info {
      min-height: 60px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .photo-info.horizontal {
      width: 180px;
    }

    /* Enhanced scrollbar styling for horizontal layout */
    .photo-grid::-webkit-scrollbar {
      height: 10px;
    }

    .photo-grid::-webkit-scrollbar-track {
      background: #f8f9fa;
      border-radius: 6px;
      margin: 0 8px;
    }

    .photo-grid::-webkit-scrollbar-thumb {
      background: linear-gradient(90deg, #007bff, #0056b3);
      border-radius: 6px;
      border: 2px solid #f8f9fa;
    }

    .photo-grid::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(90deg, #0056b3, #004085);
    }

    /* Enhanced selection animations for horizontal layout */
    .photo-card-horizontal.selected {
      animation: selectedPulse 2s infinite;
    }

    @keyframes selectedPulse {
      0%, 100% { 
        box-shadow: 0 8px 24px rgba(0, 123, 255, 0.3), 0 4px 12px rgba(0, 0, 0, 0.1); 
      }
      50% { 
        box-shadow: 0 12px 32px rgba(0, 123, 255, 0.4), 0 6px 16px rgba(0, 0, 0, 0.15); 
      }
    }

    /* Show delete button on hover for selected cards */
    .photo-card-traditional[data-selected="true"]:hover .photo-delete-button,
    .photo-card-horizontal[data-selected="true"]:hover .photo-delete-button {
      opacity: 1;
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(220, 53, 69, 0.4);
    }

    /* FIXED: Add smooth transitions for responsive grid changes */
    .photo-grid[style*="display: grid"] {
      transition: all 0.3s ease;
    }

    .photo-grid[style*="display: grid"] > div {
      transition: all 0.3s ease;
    }
  `,document.head.querySelector("#photo-handler-styles")||(e.id="photo-handler-styles",document.head.appendChild(e))}const Xs=`
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
`,Zs=`
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
`,Ls=`
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
`,ei=`
  mutation DeleteTag($tagId: String!) {
    deleteTag(tagId: $tagId) {
      id
      hasBeenDeleted
    }
  }
`,ti=`
  mutation DeleteSubtag($subtagId: String!) {
    deleteSubtag(subtagId: $subtagId) {
      id
      hasBeenDeleted
    }
  }
`,It=(e,c,l,n,o,B,i)=>{const[u,w]=g.useState([]),[S,A]=g.useState(null),[C,d]=g.useState(!1),[a,f]=g.useState(null),[I,E]=g.useState(null),[z,m]=g.useState(!1),[J,s]=g.useState(!1),[ae,te]=g.useState(""),[O,y]=g.useState(""),[V,T]=g.useState(!1),[Q,oe]=g.useState(!1),H=g.useMemo(()=>({photoIndices:Array.from(o),existingIndices:Array.from(B)}),[o,B]),ne=()=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(r){const x=Math.random()*16|0;return(r=="x"?x:x&3|8).toString(16)}),ue=g.useCallback(()=>{const r=[];e.forEach(j=>{r.push(...j)}),l.forEach(j=>{r.push(...j)});const x=new Map;return r.forEach(j=>{if(x.has(j.tagTitle)){const K=x.get(j.tagTitle),k=[...K.subtags,...j.subtags],h=Array.from(new Map(k.map(p=>[p.subtagTitle,p])).values());x.set(j.tagTitle,{...K,subtags:h})}else x.set(j.tagTitle,j)}),Array.from(x.values())},[e,l]),we=g.useCallback((r,x)=>{const j=[],K=Math.floor(Date.now()/1e3);return x.forEach(k=>{const h=r.find(p=>p.tagTitle===k.tagTitle);if(h){const p=[];if(k.subtags.forEach(M=>{var _;if(!((_=h.subtags)==null?void 0:_.find(L=>L.subtagTitle===M.subtagTitle))){const L={id:ne(),tagTitle:M.tagTitle,subtagTitle:M.subtagTitle,TagType:k.TagType||"File",points:1,createdAt:K,updatedAt:K,isCreatedFromApplied:!0};p.push(L),i(`Created missing subtag from applied tags: ${M.subtagTitle} for tag ${M.tagTitle}`)}}),p.length>0){const M=r.findIndex(D=>D.id===h.id);M!==-1&&(r[M]={...h,subtags:[...h.subtags||[],...p]})}}else{const p={id:ne(),tagTitle:k.tagTitle,TagType:k.TagType||"File",points:1,createdAt:K,updatedAt:K,subtags:[],isCreatedFromApplied:!0};k.subtags&&k.subtags.length>0&&(p.subtags=k.subtags.map(M=>({id:ne(),tagTitle:M.tagTitle,subtagTitle:M.subtagTitle,TagType:k.TagType||"File",points:1,createdAt:K,updatedAt:K,isCreatedFromApplied:!0}))),j.push(p),i(`Created missing tag from applied tags: ${k.tagTitle} with ${k.subtags.length} subtags`)}}),j},[ne,i]),pe=g.useCallback(r=>{const{photoIndices:x,existingIndices:j}=H;if(x.length===0&&j.length===0)return!1;const K=x.length===0||x.every(p=>(e.get(p)||[]).some(D=>D.tagTitle===r.tagTitle)),k=j.length===0||j.every(p=>(l.get(p)||[]).some(D=>D.tagTitle===r.tagTitle)),h=K&&k;return(x.length>0||j.length>0)&&i(`Tag "${r.tagTitle}" applied to all selected? ${h} (photos: ${K}, existing: ${k})`),h},[H,e,l,i]),xe=g.useCallback(r=>{const{photoIndices:x,existingIndices:j}=H;let K=0,k=0;x.forEach(_=>{const re=(e.get(_)||[]).find(Se=>Se.tagTitle===r.tagTitle);re&&(K++,re.subtags.some(Se=>Se.subtagTitle===r.subtagTitle)&&k++)});let h=0,p=0;j.forEach(_=>{const re=(l.get(_)||[]).find(Se=>Se.tagTitle===r.tagTitle);re&&(h++,re.subtags.some(Se=>Se.subtagTitle===r.subtagTitle)&&p++)});const M=K+h,D=k+p;return M>0&&D===M},[H,e,l]),Ae=g.useCallback(r=>{const{photoIndices:x,existingIndices:j}=H;if(x.length===0&&j.length===0){i("No files selected for tag application");return}const K=pe(r);i(`${K?"Removing":"Applying"} tag "${r.tagTitle}" ${K?"from":"to"} all selected files`),x.length>0&&c(k=>{const h=new Map(k);return x.forEach(p=>{const M=h.get(p)||[];if(K){const D=M.filter(_=>_.tagTitle!==r.tagTitle);h.set(p,D),i(`Removed tag "${r.tagTitle}" from photo ${p}`)}else if(!M.some(_=>_.tagTitle===r.tagTitle)){const _={tagTitle:r.tagTitle,TagType:r.TagType,subtags:[]};h.set(p,[...M,_]),i(`Added tag "${r.tagTitle}" to photo ${p}`)}}),h}),j.length>0&&n(k=>{const h=new Map(k);return j.forEach(p=>{const M=h.get(p)||[];if(K){const D=M.filter(_=>_.tagTitle!==r.tagTitle);h.set(p,D),i(`Removed tag "${r.tagTitle}" from existing file ${p}`)}else if(!M.some(_=>_.tagTitle===r.tagTitle)){const _={tagTitle:r.tagTitle,TagType:r.TagType,subtags:[]};h.set(p,[...M,_]),i(`Added tag "${r.tagTitle}" to existing file ${p}`)}}),h})},[H,pe,c,n,i]),he=g.useCallback(r=>{const{photoIndices:x,existingIndices:j}=H;if(x.length===0&&j.length===0){i("No files selected for subtag application");return}const K=xe(r);i(`${K?"Removing":"Applying"} subtag "${r.subtagTitle}" ${K?"from":"to"} all selected files with parent tag`),x.length>0&&c(k=>{const h=new Map(k);return x.forEach(p=>{const D=(h.get(p)||[]).map(_=>{if(_.tagTitle===r.tagTitle){if(K)return{..._,subtags:_.subtags.filter(L=>L.subtagTitle!==r.subtagTitle)};if(!_.subtags.some(re=>re.subtagTitle===r.subtagTitle))return{..._,subtags:[..._.subtags,{tagTitle:r.tagTitle,subtagTitle:r.subtagTitle}]}}return _});h.set(p,D)}),h}),j.length>0&&n(k=>{const h=new Map(k);return j.forEach(p=>{const D=(h.get(p)||[]).map(_=>{if(_.tagTitle===r.tagTitle){if(K)return{..._,subtags:_.subtags.filter(L=>L.subtagTitle!==r.subtagTitle)};if(!_.subtags.some(re=>re.subtagTitle===r.subtagTitle))return{..._,subtags:[..._.subtags,{tagTitle:r.tagTitle,subtagTitle:r.subtagTitle}]}}return _});h.set(p,D)}),h})},[H,xe,c,n,i]),F=g.useCallback(()=>{const{photoIndices:r,existingIndices:x}=H,j=[];r.forEach(h=>{const p=e.get(h)||[];j.push(...p)}),x.forEach(h=>{const p=l.get(h)||[];j.push(...p)});const K=new Map;j.forEach(h=>{if(K.has(h.tagTitle)){const p=K.get(h.tagTitle),M=[...p.subtags,...h.subtags],D=Array.from(new Map(M.map(_=>[_.subtagTitle,_])).values());K.set(h.tagTitle,{...p,subtags:D})}else K.set(h.tagTitle,h)});const k=Array.from(K.values());return i(`getAppliedTagsForSelected: ${k.length} unique tags from ${r.length} photos + ${x.length} existing files`),k},[H,e,l,i]),P=g.useCallback(()=>o.size>0||B.size>0,[o.size,B.size]),W=async()=>{var r,x;i("Fetching tags from API and checking for missing applied tags"),d(!0);try{const j=await Te();if(!j){i("No token available for fetching tags");return}const k=await(await fetch(Ce,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${j}`},body:JSON.stringify({query:Xs,variables:{fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(i("Tags API response:",k),k.errors){console.error("GraphQL errors:",k.errors),i(`GraphQL errors: ${JSON.stringify(k.errors)}`);return}let p=(((x=(r=k==null?void 0:k.data)==null?void 0:r.fetchRelations)==null?void 0:x.items)||[]).map(D=>{var _,L;return{id:D.id,tagTitle:D.tagTitle,TagType:D.TagType,points:D.points,createdAt:D.createdAt,updatedAt:D.updatedAt,subtags:((L=(_=D.subtags)==null?void 0:_.items)==null?void 0:L.map(re=>({id:re.id,tagTitle:re.tagTitle,subtagTitle:re.subtagTitle,TagType:re.TagType,points:re.points,createdAt:re.createdAt,updatedAt:re.updatedAt})))||[]}});i(`Fetched ${p.length} tags from API`);const M=ue();if(i(`Found ${M.length} unique applied tags in file maps`),M.length>0){const D=we(p,M);D.length>0&&(i(`Created ${D.length} missing tags from applied tags`),p=[...D,...p])}i(`Final tags list: ${p.length} tags (including ${p.filter(D=>D.isCreatedFromApplied).length} created from applied tags)`),w(p)}catch(j){console.error("Error fetching tags:",j),i(`Error fetching tags: ${j}`)}finally{d(!1)}},$=g.useCallback(r=>{i(`Setting displayed tag: ${r}`),A(r)},[i]),q=g.useCallback(()=>{if(!S)return[];const r=u.find(x=>x.id===S);return(r==null?void 0:r.subtags)||[]},[S,u]),U=async(r,x)=>{if(i(`Adding new tag: ${r} of type: ${x}`),!r.trim())return i("Cannot add tag with empty title"),!1;T(!0);try{if(!await Te())return i("No token available for adding tag"),!1;if(await(async()=>(i("PLACEHOLDER: Would send GraphQL mutation to add tag",{mutation:Zs,variables:{tagInput:{tagTitle:r.trim(),TagType:x,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(h=>setTimeout(h,500)),!0))()){const h={id:ne(),tagTitle:r.trim(),TagType:x,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3),subtags:[]};return w(p=>[h,...p]),Ae(h),$(h.id),te(""),m(!1),i(`Successfully added and applied new tag: ${r}`),!0}return!1}catch(j){return console.error("Error adding new tag:",j),i(`Error adding new tag: ${j}`),!1}finally{T(!1)}},G=async(r,x,j)=>{if(i(`Adding new subtag: ${x} to tag: ${r}`),!x.trim())return i("Cannot add subtag with empty title"),!1;if(!S)return i("No displayed tag for adding subtag"),!1;oe(!0);try{if(!await Te())return i("No token available for adding subtag"),!1;if(await(async()=>(i("PLACEHOLDER: Would send GraphQL mutation to add subtag",{mutation:Ls,variables:{subtagInput:{tagTitle:r,subtagTitle:x.trim(),TagType:j,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(p=>setTimeout(p,500)),!0))()){const p={id:ne(),tagTitle:r,subtagTitle:x.trim(),TagType:j,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3)};return w(M=>M.map(D=>D.id===S?{...D,subtags:[p,...D.subtags||[]]}:D)),he(p),y(""),s(!1),i(`Successfully added and applied new subtag: ${x}`),!0}return!1}catch(K){return console.error("Error adding new subtag:",K),i(`Error adding new subtag: ${K}`),!1}finally{oe(!1)}},X=async r=>{i(`Deleting tag: ${r}`),f(r);try{if(!await Te())return i("No token available for deleting tag"),!1;if(await(async()=>(i("PLACEHOLDER: Would send GraphQL mutation to delete tag",{mutation:ei,variables:{tagId:r}}),await new Promise(k=>setTimeout(k,500)),!0))()){const k=u.find(h=>h.id===r);return w(h=>h.filter(p=>p.id!==r)),k&&(c(h=>{const p=new Map(h);return h.forEach((M,D)=>{const _=M.filter(L=>L.tagTitle!==k.tagTitle);p.set(D,_)}),p}),n(h=>{const p=new Map(h);return h.forEach((M,D)=>{const _=M.filter(L=>L.tagTitle!==k.tagTitle);p.set(D,_)}),p})),S===r&&$(null),i(`Successfully deleted tag: ${r}`),!0}return!1}catch(x){return console.error("Error deleting tag:",x),i(`Error deleting tag: ${x}`),!1}finally{f(null)}},Y=async r=>{i(`Deleting subtag: ${r}`),E(r);try{if(!await Te())return i("No token available for deleting subtag"),!1;if(await(async()=>(i("PLACEHOLDER: Would send GraphQL mutation to delete subtag",{mutation:ti,variables:{subtagId:r}}),await new Promise(k=>setTimeout(k,500)),!0))()){let k=null;return w(h=>h.map(p=>{var D;const M=((D=p.subtags)==null?void 0:D.filter(_=>_.id===r?(k=_,!1):!0))||[];return{...p,subtags:M}})),k&&(c(h=>{const p=new Map(h);return h.forEach((M,D)=>{const _=M.map(L=>L.tagTitle===k.tagTitle?{...L,subtags:L.subtags.filter(re=>re.subtagTitle!==k.subtagTitle)}:L);p.set(D,_)}),p}),n(h=>{const p=new Map(h);return h.forEach((M,D)=>{const _=M.map(L=>L.tagTitle===k.tagTitle?{...L,subtags:L.subtags.filter(re=>re.subtagTitle!==k.subtagTitle)}:L);p.set(D,_)}),p})),i(`Successfully deleted subtag: ${r}`),!0}return!1}catch(x){return console.error("Error deleting subtag:",x),i(`Error deleting subtag: ${x}`),!1}finally{E(null)}},Z=()=>{m(!0),te("")},de=()=>{m(!1),te("")},se=()=>{s(!0),y("")},fe=()=>{s(!1),y("")},ye=async()=>ae.trim()?await U(ae,"File"):!1,ge=async()=>{if(O.trim()&&S){const r=u.find(x=>x.id===S);if(r)return await G(r.tagTitle,O,r.TagType)}return!1};return g.useEffect(()=>{W()},[]),g.useEffect(()=>{const r=ue();if(r.length>0&&u.length>0){const x=r.filter(j=>!u.some(K=>K.tagTitle===j.tagTitle));x.length>0&&(i(`Detected ${x.length} new applied tags, refreshing tags list`,x.map(j=>j.tagTitle)),W())}},[e,l,ue,u,i]),g.useEffect(()=>{if(i(`Selection changed - Photos: ${o.size}, Existing: ${B.size}`),S){const r=u.find(x=>x.id===S);r&&!pe(r)&&(i(`Clearing displayed tag "${r.tagTitle}" because it's no longer applied to all selected files`),A(null))}},[o.size,B.size,S,u,pe,i]),g.useEffect(()=>{if(S){const r=u.find(x=>x.id===S);r&&!pe(r)&&(i(`Clearing displayed tag "${r.tagTitle}" due to tag map changes`),A(null))}},[e,l,S,u,pe,i]),{tags:u,displayedTagId:S,isLoadingTags:C,tagIdBeingDeleted:a,subtagIdBeingDeleted:I,isAddingNewTag:z,isAddingNewSubtag:J,newTagTitle:ae,newSubtagTitle:O,isSubmittingNewTag:V,isSubmittingNewSubtag:Q,fetchTags:W,toggleTagOnSelectedFiles:Ae,toggleSubtagOnSelectedFiles:he,setDisplayedTag:$,isTagAppliedToSelected:pe,isSubtagAppliedToSelected:xe,getDisplayedTagSubtags:q,getAppliedTagsForSelected:F,hasSelectedFiles:P,addNewTag:U,addNewSubtag:G,deleteTag:X,deleteSubtag:Y,startAddingNewTag:Z,cancelAddingNewTag:de,startAddingNewSubtag:se,cancelAddingNewSubtag:fe,submitNewTag:ye,submitNewSubtag:ge,setNewTagTitle:te,setNewSubtagTitle:y,extractAllAppliedTags:ue,createMissingAppliedTags:we}},si=N.div`
  background: #fff;
  border: 2px solid #e9ecef;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    border-color: #007bff;
    box-shadow: 0 6px 20px rgba(0, 123, 255, 0.1);
  }
`,ii=N.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  direction: ${e=>e.$isRTL?"rtl":"ltr"};
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`,ri=N.div`
  flex: 1;
`,ai=N.h3`
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
`,oi=N.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
`,ni=N.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    justify-content: stretch;
  }
`,st=N.button`
  padding: 8px 16px;
  border: 1px solid ${e=>e.$variant==="primary"?"#007bff":e.$variant==="danger"?"#dc3545":"#6c757d"};
  border-radius: 6px;
  background: ${e=>e.$variant==="primary"?"#007bff":e.$variant==="danger"?"#dc3545":"transparent"};
  color: ${e=>e.$variant==="primary"||e.$variant==="danger"?"white":"#6c757d"};
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    background: ${e=>e.$variant==="primary"?"#0056b3":e.$variant==="danger"?"#c82333":"#6c757d"};
    color: white;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    flex: 1;
  }
`,it=N.div`
  margin-bottom: 16px;
`,rt=N.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #333;
  font-size: 14px;
`,li=N.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  &:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
  }
`,di=N.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  resize: vertical;
  min-height: 80px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  &:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
  }
`,ci=N.div`
  margin-top: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e9ecef;
`,ui=N.div`
  width: 100%;
  height: 6px;
  background: #e9ecef;
  border-radius: 3px;
  overflow: hidden;
  margin-top: 8px;
`,pi=N.div`
  height: 100%;
  background: linear-gradient(90deg, #007bff, #28a745);
  width: ${e=>e.$progress}%;
  transition: width 0.3s ease;
`,gi=N.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  direction: ${e=>e.$isRTL?"rtl":"ltr"};
  justify-content: flex-end;
  flex-direction: ${e=>e.$isRTL?"row-reverse":"row"};
`,at=N.button`
  padding: 6px 12px;
  font-size: 12px;
  border: 1px solid ${e=>e.$variant==="danger"?"#dc3545":"#ddd"};
  border-radius: 4px;
  background-color: ${e=>e.$variant==="danger"?"#dc3545":"#fff"};
  color: ${e=>e.$variant==="danger"?"white":"#333"};
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover:not(:disabled) {
    background-color: ${e=>e.$variant==="danger"?"#c82333":"#f8f9fa"};
    border-color: ${e=>e.$variant==="danger"?"#c82333":"#007bff"};
    color: ${e=>e.$variant==="danger"?"white":"#007bff"};
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: #f8f9fa;
    color: #999;
    cursor: not-allowed;
    transform: none;
  }
`,fi=({album:e,onUpdate:c,onSave:l,onRemove:n,disabled:o,columns:B,enhancedLog:i})=>{const{t:u,language:w}=me(),S=De(w)==="rtl",A=It(e.photoTagsMap,m=>{const J=typeof m=="function"?m(e.photoTagsMap):m;c({photoTagsMap:J})},new Map,()=>{},e.selectedPhotoIndices,new Set,i),C=m=>{c({name:m})},d=m=>{c({description:m})},a=m=>{const J=new Set(e.selectedPhotoIndices);J.has(m)?J.delete(m):J.add(m),c({selectedPhotoIndices:J})},f=()=>{const m=new Set;for(let J=0;J<e.photos.length;J++)m.add(J);c({selectedPhotoIndices:m})},I=()=>{c({selectedPhotoIndices:new Set})},E=()=>{confirm(u("Are you sure you want to delete all files from this album? This action cannot be undone."))&&c({photos:[],selectedPhotoIndices:new Set,photoTagsMap:new Map})},z=m=>{const J=e.photos.filter((te,O)=>O!==m),s=new Set;e.selectedPhotoIndices.forEach(te=>{te<m?s.add(te):te>m&&s.add(te-1)});const ae=new Map;e.photoTagsMap.forEach((te,O)=>{O<m?ae.set(O,te):O>m&&ae.set(O-1,te)}),c({photos:J,selectedPhotoIndices:s,photoTagsMap:ae})};return t.jsxs(si,{children:[t.jsxs(ii,{$isRTL:S,children:[t.jsxs(ri,{children:[t.jsxs(ai,{children:[t.jsx("span",{children:"📁"}),e.name,e.isSaving&&t.jsx("span",{style:{color:"#007bff"},children:"⏳"}),e.savingProgress===100&&t.jsx("span",{style:{color:"#28a745"},children:"✅"})]}),t.jsxs(oi,{children:[e.photos.length===1?u("{{count}} file",{count:e.photos.length.toString()}):u("{{count}} files",{count:e.photos.length.toString()}),e.selectedPhotoIndices.size>0&&t.jsxs("span",{children:[" • ",u("{{count}} selected for tagging",{count:e.selectedPhotoIndices.size})]})]})]}),t.jsx(ni,{children:!e.isSaving&&e.savingProgress<100&&t.jsxs(t.Fragment,{children:[t.jsx(st,{$variant:"primary",onClick:l,disabled:o,children:u("Save")}),t.jsx(st,{$variant:"danger",onClick:n,disabled:o,children:u("Remove")})]})})]}),t.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",marginBottom:"20px"},children:[t.jsxs(it,{children:[t.jsx(rt,{children:u("Album Name")}),t.jsx(li,{type:"text",value:e.name,onChange:m=>C(m.target.value),placeholder:u("e.g. Family Vacation in Kyoto"),disabled:e.isSaving||e.savingProgress===100})]}),t.jsxs("div",{children:[t.jsxs(it,{children:[t.jsx(rt,{children:u("Album Description")}),t.jsx(di,{value:e.description,onChange:m=>d(m.target.value),placeholder:u("e.g. what's special about this album"),disabled:e.isSaving||e.savingProgress===100,rows:3})]}),e.photos.length>0&&t.jsxs(gi,{$isRTL:S,children:[t.jsx(at,{onClick:e.selectedPhotoIndices.size>0?I:f,disabled:e.isSaving||e.savingProgress===100,children:e.selectedPhotoIndices.size>0?u("Done Tagging Selected"):u("Select All")}),e.selectedPhotoIndices.size===0&&t.jsx(at,{$variant:"danger",onClick:E,disabled:e.isSaving||e.savingProgress===100,children:u("Delete All")})]})]})]}),t.jsx(Oe,{selectedPhotos:e.photos,selectedPhotoIndices:e.selectedPhotoIndices,isSavingAlbum:e.isSaving||e.savingProgress===100,onRemovePhoto:z,onTogglePhotoSelection:a,onSelectAllPhotos:f,onDeselectAllPhotos:I,hideHeader:!1,photoTagsMap:e.photoTagsMap,columns:B,isMultipleAlbumMode:!0}),e.selectedPhotoIndices.size>0&&t.jsx(ci,{children:t.jsx(vt,{tagsManager:A,disabled:e.isSaving||e.savingProgress===100,enhancedLog:i})}),e.isSaving&&t.jsxs("div",{style:{marginTop:"16px"},children:[t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},children:[t.jsx("span",{style:{fontSize:"14px",fontWeight:"600",color:"#333"},children:u("Saving album...")}),t.jsxs("span",{style:{fontSize:"14px",color:"#666"},children:[e.savingProgress,"%"]})]}),t.jsx(ui,{children:t.jsx(pi,{$progress:e.savingProgress})})]})]})},mi=N.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  direction: ${e=>e.$isRTL?"rtl":"ltr"};
`,xi=({albums:e,setAlbums:c,isSavingAny:l,onSaveAlbum:n,onRemoveAlbum:o,columns:B,setColumns:i,enhancedLog:u})=>{const{language:w}=me(),S=De(w)==="rtl",A=g.useCallback((C,d)=>{c(a=>a.map(f=>f.id===C?{...f,...d}:f))},[c]);return t.jsx("div",{children:t.jsx(mi,{$isRTL:S,children:e.map(C=>t.jsx(fi,{album:C,onUpdate:d=>A(C.id,d),onSave:()=>n(C.id),onRemove:()=>o(C.id),disabled:l,columns:B,setColumns:i,enhancedLog:u},C.id))})})},hi=()=>{const{t:e,language:c}=me(),l=De(c)==="rtl",[n,o]=g.useState([]),[B,i]=g.useState("2"),u=(f,I)=>{const E=new Date().toISOString();console.log(`[${E}] ${f}`,I)},w=f=>{i(f),localStorage.setItem("save-album-columns",f),u(`Column setting changed to ${f} for all albums`)};g.useEffect(()=>{const f=localStorage.getItem(be.MULTI_ALBUM_DATA);if(f)try{const E=JSON.parse(f).filter(m=>{if(!m||!m.name||!Array.isArray(m.selectedPhotos))return!1;const J=m.selectedPhotos.filter(s=>s&&s.fileName&&s.originalFileName&&s.s3PreviewUrl&&s.s3PreviewUrl.includes("amazonaws.com"));return m.selectedPhotos=J,J.length>0});if(E.length===0){alert("No valid albums were found. Please try selecting your files again."),ke("my-albums.html");return}const z=E.map(m=>({id:Ye(),name:m.name,description:"",photos:m.selectedPhotos,selectedPhotoIndices:new Set,photoTagsMap:new Map,isOnPublicProfile:!1,participantsCanAddItems:!0,participantsCanDeleteItems:!1,passwordProtectionOption:"NoPassword",albumPassword:"",isSaving:!1,savingProgress:0,folderId:""}));o(z),Me()}catch(I){console.error("Error parsing multi-album data:",I),alert("There was an error loading your albums. Please try selecting your files again."),ke("my-albums.html")}else alert("No album data was found. Please try selecting your files again."),ke("my-albums.html")},[]),g.useEffect(()=>{const f=localStorage.getItem("save-album-columns")||"2";i(f)},[]);const S=async f=>{const I=n.find(E=>E.id===f);if(I){if(I.photos.length===0){alert(`The album "${I.name}" has no photos to save.`);return}o(E=>E.map(z=>z.id===f?{...z,isSaving:!0,savingProgress:0}:z));try{const E=`${Date.now()}_____${Ye()}____Folder`;o(z=>z.map(m=>m.id===f?{...m,folderId:E}:m));for(let z=10;z<=100;z+=20)o(m=>m.map(J=>J.id===f?{...J,savingProgress:z}:J)),await new Promise(m=>setTimeout(m,500));o(z=>z.map(m=>m.id===f?{...m,isSaving:!1,savingProgress:100}:m))}catch(E){console.error(`Error saving album ${f}:`,E),o(z=>z.map(m=>m.id===f?{...m,isSaving:!1,savingProgress:0}:m)),alert(`Failed to save album "${I.name}". Please try again.`)}}},A=async()=>{const f=n.filter(I=>I.savingProgress<100);if(f.length!==0)try{for(const E of f)await S(E.id),await new Promise(z=>setTimeout(z,200));n.filter(E=>f.some(z=>z.id===E.id)&&E.savingProgress<100).length===0&&setTimeout(()=>{localStorage.removeItem(be.MULTI_ALBUM_DATA),Me(),ke("my-albums.html")},1e3)}catch(I){console.error("Error saving all albums:",I),alert("There was an error saving some albums. Please try again.")}},C=f=>{const I=n.find(z=>z.id===f);if(I&&!confirm(`Are you sure you want to remove the album "${I.name}"?`))return;const E=n.filter(z=>z.id!==f);o(E),E.length===0&&(localStorage.removeItem(be.MULTI_ALBUM_DATA),Me(),ke("my-albums.html"))},d=n.some(f=>f.isSaving),a=n.some(f=>f.savingProgress<100);return t.jsxs(t.Fragment,{children:[t.jsx(dt,{}),t.jsx(ct,{children:t.jsxs(ut,{children:[t.jsx(pt,{href:"my-albums.html",children:e("Back to Albums")}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[t.jsx(cs,{children:e("Columns:")}),t.jsxs(us,{value:B,onChange:f=>w(f.target.value),disabled:d,children:[t.jsx("option",{value:"1",children:"1"}),t.jsx("option",{value:"2",children:"2"}),t.jsx("option",{value:"3",children:"3"}),t.jsx("option",{value:"4",children:"4"}),t.jsx("option",{value:"5",children:"5"})]}),a&&!d&&t.jsx(Ee,{$primary:!0,onClick:A,style:{minWidth:"120px",fontSize:"14px",padding:"8px 16px"},children:e("Save {{count}} Albums",{count:n.length})})]}),a&&!d&&t.jsx(Ee,{$primary:!0,onClick:A,style:{minWidth:"120px",fontSize:"14px",padding:"8px 16px"},children:e("Save {{count}} Albums",{count:n.length})})]})]})}),t.jsx(gt,{$isRTL:l,children:t.jsx(xi,{albums:n,setAlbums:o,isSavingAny:d,onSaveAlbum:S,onRemoveAlbum:C,columns:B,setColumns:w,enhancedLog:u})})]})},bi=()=>{const{t:e,language:c}=me(),l=De(c)==="rtl",[n,o]=g.useState({selectedPhotoIndices:new Set,photoTagsMap:new Map,selectedExistingIndices:new Set,existingFileTagsMap:new Map}),B=gs(e),{setShowUsernamePrompt:i,setUsernameInput:u}=B,[w,S]=g.useState(null),[A,C]=g.useState(!1),[d,a]=g.useState(0),[f,I]=g.useState(""),[E,z]=g.useState(""),[m,J]=g.useState(!1),[s,ae]=g.useState(!1),[te,O]=g.useState("NoPassword"),[y,V]=g.useState(""),[T,Q]=g.useState(!1),[oe,H]=g.useState(!0),[ne,ue]=g.useState(!1),[we,pe]=g.useState(null),[xe,Ae]=g.useState(!1),[he,F]=g.useState([]),[P,W]=g.useState("2"),[$,q]=g.useState([]),[U,G]=g.useState(!1),X=(b,R)=>{const ee=new Date().toISOString();console.log(`[${ee}] ${b}`,R)},Z=ms(b=>{!w&&b&&S(b)},!0),{fileInputRef:de,selectedPhotos:se,setSelectedPhotos:fe,isUploading:ye,progressTracker:ge,setProgressTracker:r,debugMessages:x,currentFolderId:j,openFilePicker:K,handleFileSelection:k,setOnSaveAlbumPage:h}=Z,p=Bs(S,fe,pe,J,I,z,Q,H,O,V,Ae,F,ue,X),{cognitoUsername:M,publicUsername:D,setPublicUsername:_}=p,L=It(n.photoTagsMap,b=>{o(R=>({...R,photoTagsMap:typeof b=="function"?b(R.photoTagsMap):b}))},n.existingFileTagsMap,b=>{o(R=>({...R,existingFileTagsMap:typeof b=="function"?b(R.existingFileTagsMap):b}))},n.selectedPhotoIndices,n.selectedExistingIndices,X),re=Us(w||j,M,se,xe,he,f,E,T,oe,ne,te,y,n.photoTagsMap,n.existingFileTagsMap,$,n.selectedExistingIndices,C,a,fe,r,X,e),{saveAlbumDirectly:Se}=re;g.useEffect(()=>{const b=localStorage.getItem("save-album-columns")||"2";W(b)},[]);const Pt=b=>{W(b),localStorage.setItem("save-album-columns",b)};g.useEffect(()=>(h(!0),()=>h(!1)),[h]),g.useEffect(()=>{(async()=>{try{await Lt()}catch(R){console.warn("Credential prewarming failed:",R)}})()},[]);const jt=async b=>{var R,ee,ie;if(b){G(!0);try{const le=await Te();if(!le)return;const ce=`
        mutation FetchRelations($fetchRelationsInput: FetchRelationsInput!) {
          fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
            items {
              ... on FolderPosition {
                ${hs}
              }
            }
          }
        }
      `,ve={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}},Fe=await(await fetch(Ce,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${le}`},body:JSON.stringify({query:ce,variables:ve})})).json();if(Fe.errors){console.error("GraphQL errors:",Fe.errors);return}const Be=(((ee=(R=Fe==null?void 0:Fe.data)==null?void 0:R.fetchRelations)==null?void 0:ee.items)||[]).find(Ie=>Ie&&Ie.folder&&Ie.folder.id===b);if(!Be)return;const je=Be.folder,Ht=((ie=je==null?void 0:je.fileReferencesPage)==null?void 0:ie.items)||[],Ue=[],We=new Map;Ht.forEach((Ie,qt)=>{const Pe=Ie.file;if(Pe&&Pe.dataKey){let ze=Ie.fileDisplayName;if(!ze&&Pe.dataKey){const _e=Pe.dataKey.split("/");ze=_e[_e.length-1]}Ue.push({dataKey:Pe.dataKey,thumbnailDataKey:Pe.thumbnailDataKey||null,durationInSeconds:Pe.durationInSeconds||null,dataInBytes:Pe.dataInBytes||0,fileName:ze||void 0});const Ke=Ie.selectedTags||[];if(Ke.length>0){const _e=Ke.map(Re=>{var He;return{tagTitle:Re.tagTitle,TagType:Re.TagType,subtags:((He=Re.subtags)==null?void 0:He.map(qe=>({tagTitle:qe.tagTitle,subtagTitle:qe.subtagTitle})))||[]}});We.set(qt,_e)}}}),q(Ue),o(Ie=>({...Ie,existingFileTagsMap:We})),!f&&je.folderName&&I(je.folderName),!E&&je.folderDescription&&z(je.folderDescription)}catch(le){console.error("Failed to fetch existing album data:",le)}finally{G(!1)}}};g.useEffect(()=>{const R=new URLSearchParams(window.location.search).get("folderId");R&&(S(R),Ae(!1),localStorage.removeItem(be.SUB_ALBUM_DATA),J(!0),pe(!0))},[]),g.useEffect(()=>{w&&jt(w)},[w]),g.useEffect(()=>{j&&!w&&S(j)},[j,w]),g.useEffect(()=>{o(b=>{const R=new Set,ee=new Map;return b.selectedPhotoIndices.forEach(ie=>{ie<se.length&&R.add(ie)}),b.photoTagsMap.forEach((ie,le)=>{le<se.length&&ee.set(le,ie)}),{...b,selectedPhotoIndices:R,photoTagsMap:ee}})},[se.length]),g.useEffect(()=>{o(b=>{const R=new Set,ee=new Map;return b.selectedExistingIndices.forEach(ie=>{ie<$.length&&R.add(ie)}),b.existingFileTagsMap.forEach((ie,le)=>{le<$.length&&ee.set(le,ie)}),{...b,selectedExistingIndices:R,existingFileTagsMap:ee}})},[$.length]);const kt=b=>{const R=se.filter((ee,ie)=>ie!==b);fe(R),R.length>0?localStorage.setItem(be.SELECTED_PHOTOS,JSON.stringify(R)):localStorage.removeItem(be.SELECTED_PHOTOS),o(ee=>{const ie=new Set,le=new Map;return ee.selectedPhotoIndices.forEach(ce=>{ce<b?ie.add(ce):ce>b&&ie.add(ce-1)}),ee.photoTagsMap.forEach((ce,ve)=>{ve<b?le.set(ve,ce):ve>b&&le.set(ve-1,ce)}),{...ee,selectedPhotoIndices:ie,photoTagsMap:le}})},Ct=b=>{const R=$.filter((ee,ie)=>ie!==b);q(R),o(ee=>{const ie=new Set,le=new Map;return ee.selectedExistingIndices.forEach(ce=>{ce<b?ie.add(ce):ce>b&&ie.add(ce-1)}),ee.existingFileTagsMap.forEach((ce,ve)=>{ve<b?le.set(ve,ce):ve>b&&le.set(ve-1,ce)}),{...ee,selectedExistingIndices:ie,existingFileTagsMap:le}})},Dt=b=>{o(R=>{const ee=new Set(R.selectedExistingIndices);return ee.has(b)?ee.delete(b):ee.add(b),{...R,selectedExistingIndices:ee}})},Ft=()=>{const b=new Set;for(let R=0;R<$.length;R++)b.add(R);o(R=>({...R,selectedExistingIndices:b}))},_t=()=>{o(b=>({...b,selectedExistingIndices:new Set}))},Et=b=>{o(R=>{const ee=new Set(R.selectedPhotoIndices);return ee.has(b)?ee.delete(b):ee.add(b),{...R,selectedPhotoIndices:ee}})},Nt=()=>{const b=new Set;for(let R=0;R<se.length;R++)b.add(R);o(R=>({...R,selectedPhotoIndices:b}))},zt=()=>{o(b=>({...b,selectedPhotoIndices:new Set}))},Rt=()=>{confirm(e("Are you sure you want to delete all new files? This action cannot be undone."))&&(fe([]),o({selectedPhotoIndices:new Set,photoTagsMap:new Map,selectedExistingIndices:new Set,existingFileTagsMap:new Map}),localStorage.removeItem(be.SELECTED_PHOTOS))},Mt=async()=>{C(!0);try{if(D!=null&&D.startsWith("Profile-")){u(""),i(!0),C(!1);return}Se()}catch(b){console.error("Error in handleSaveAlbumSingle:",b),C(!1)}},Ot=b=>{localStorage.setItem(be.PUBLIC_USERNAME,b),_(b),i(!1),Se()},Bt=(b,R)=>{b&&O(b),R!==void 0&&V(R),ae(!1)},Ut=()=>{K(w)},Ne=A||ye||U,Wt=se.length>0||$.length>0,Kt=n.selectedPhotoIndices.size>0||n.selectedExistingIndices.size>0;return t.jsxs(t.Fragment,{children:[t.jsx(dt,{}),t.jsx(ct,{children:t.jsxs(ut,{children:[t.jsx(pt,{href:"my-albums.html",children:e("Back to Albums")}),t.jsx("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:t.jsx(Ee,{$primary:!0,onClick:Mt,disabled:A||ye||U,style:{minWidth:"120px",fontSize:"14px",padding:"8px 16px"},children:e(A?"Saving...":"Save Album")})})]})}),t.jsxs(gt,{$isRTL:l,children:[t.jsx("div",{style:{marginTop:m&&we===!0?"3px":"0"},children:t.jsx(St,{showFolderDetails:m,isCreator:we,folderName:f,setFolderName:I,folderDescription:E,setFolderDescription:z,isSavingAlbum:A||ye})}),(ye||ge.totalFiles>0&&(ge.filesUploading>0||ge.filesProcessing>0||ge.filesComplete<ge.totalFiles))&&t.jsx(xs,{progressTracker:ge,isRTL:De(c)==="rtl",variant:"detailed",context:"saving",isUploading:ye,showSuccessMessage:!1,showErrorMessage:!0,customMessages:{error:e("Some photos could not be processed. You can continue with the successfully processed photos.")}}),U&&t.jsx("div",{style:{padding:"16px",marginBottom:"16px",backgroundColor:"#f8f9fa",border:"1px solid #dee2e6",borderRadius:"8px",color:"#6c757d",textAlign:"center",fontStyle:"italic"},children:e("Loading existing files...")}),t.jsx("input",{ref:de,id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:b=>k(b,M),style:{display:"none"}}),m&&we===!0&&Wt&&t.jsxs("div",{style:{padding:"32px",marginBottom:"32px",backgroundColor:"#f8f9fa",border:"2px solid #e9ecef",borderRadius:"12px",direction:l?"rtl":"ltr"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",fontSize:"18px",color:"#495057",fontWeight:"600",marginBottom:"24px",flexDirection:l?"row-reverse":"row"},children:[t.jsx("span",{style:{marginRight:l?"0":"12px",marginLeft:l?"12px":"0",fontSize:"20px"},children:"🏷️"}),e("Select files to start adding or removing tags")]}),$.length>0&&t.jsx(wi,{existingFiles:$,selectedExistingIndices:n.selectedExistingIndices,onToggleSelection:Dt,onSelectAll:Ft,onDeselectAll:_t,onDeleteFile:Ct,disabled:Ne,isCreator:we,participantsCanDeleteItems:ne,existingFileTagsMap:n.existingFileTagsMap,t:e,isRTL:l}),t.jsx(yi,{selectedPhotos:se,selectedPhotoIndices:n.selectedPhotoIndices,onToggleSelection:Et,onSelectAll:Nt,onDeselectAll:zt,onRemovePhoto:kt,onDeleteAll:Rt,disabled:Ne,photoTagsMap:n.photoTagsMap,columns:P,setColumns:Pt,t:e,isRTL:l}),t.jsx("div",{style:{marginTop:Kt?"32px":"16px"},children:t.jsx(vt,{tagsManager:L,disabled:Ne,enhancedLog:X})})]}),t.jsx($t,{isSavingAlbum:A,savingProgress:d}),t.jsx(ps,{children:t.jsx(Ee,{onClick:Ut,disabled:A||ye||U,children:e(ye?"Uploading...":"Add More Photos")})}),t.jsx(fs,{t:e,language:c,usernameManager:B,onSuccess:Ot}),t.jsx(Rs,{isOpen:s,onClose:Bt,initialOption:te,initialPassword:y}),t.jsx(Ms,{debugMessages:x,t:e,isRTL:l,textDirection:l?"rtl":"ltr"})]})]})},wi=({existingFiles:e,selectedExistingIndices:c,onToggleSelection:l,onSelectAll:n,onDeselectAll:o,onDeleteFile:B,disabled:i,isCreator:u,participantsCanDeleteItems:w,existingFileTagsMap:S,t:A,isRTL:C})=>e.length===0?null:t.jsxs("div",{style:{marginBottom:"32px",direction:C?"rtl":"ltr"},children:[t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px",flexDirection:C?"row-reverse":"row"},children:[t.jsx("div",{children:t.jsxs("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:[A("Existing Files")," (",e.length,")"]})}),t.jsx("div",{style:{display:"flex",gap:"8px",flexDirection:C?"row-reverse":"row"},children:t.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:i?"#f8f9fa":"#fff",color:i?"#999":"#333",cursor:i?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:c.size>0?o:n,disabled:i,children:c.size>0?A("Done Tagging Selected"):A("Select All")})})]}),t.jsx("div",{className:"existing-files-grid",children:e.map((d,a)=>{const f=c.has(a),I=S.get(a)||[];return t.jsxs("div",{className:"existing-file-item",children:[t.jsxs("div",{className:`existing-file-card ${f?"selected":""}`,onClick:()=>!i&&l(a),children:[t.jsx(bs,{thumbnailDataKey:d.thumbnailDataKey,dataKey:d.dataKey,alt:A("Existing file"),style:{width:"100%",height:"100%",objectFit:"cover"}}),f&&!i&&(u===!0||w)&&t.jsx("button",{onClick:E=>{E.stopPropagation(),confirm(A("Are you sure you want to remove this file?"))&&B(a)},className:"delete-button",title:A("Remove file"),children:"×"}),d.dataInBytes>0&&t.jsxs("div",{className:"file-size",children:[(d.dataInBytes/(1024*1024)).toFixed(1),A("MB")]}),d.durationInSeconds&&t.jsxs("div",{className:"file-duration",children:[Math.floor(d.durationInSeconds/60),":",String(Math.floor(d.durationInSeconds%60)).padStart(2,"0")]})]}),t.jsxs("div",{className:"file-info",children:[d.fileName&&t.jsx("div",{className:`file-name ${f?"selected":""}`,children:d.fileName}),t.jsx("div",{className:"file-tags",children:I.length>0?t.jsx("div",{className:"tags-display",children:t.jsxs("div",{className:"tags-content",children:[t.jsx("span",{className:"tag-icon",children:"🏷️"}),t.jsx("span",{className:"tags-text",children:I.map(E=>{if(E.subtags.length>0){const z=E.subtags.map(m=>m.subtagTitle).join(", ");return`${E.tagTitle}: ${z}`}return E.tagTitle}).join(" • ")})]})}):t.jsx("div",{className:"no-tags",children:A("No tags applied")})})]})]},`existing-${a}-${d.dataKey}`)})})]}),yi=({selectedPhotos:e,selectedPhotoIndices:c,onToggleSelection:l,onSelectAll:n,onDeselectAll:o,onRemovePhoto:B,onDeleteAll:i,disabled:u,photoTagsMap:w,columns:S,setColumns:A,t:C,isRTL:d})=>e.length===0?null:t.jsxs("div",{style:{marginBottom:"32px",direction:d?"rtl":"ltr"},children:[t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"16px",flexDirection:d?"row-reverse":"row"},children:[t.jsxs("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:[C("New Files")," (",e.length,")"]}),t.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:d?"flex-start":"flex-end",gap:"8px"},children:[t.jsxs("div",{style:{display:"flex",gap:"8px",flexDirection:d?"row-reverse":"row"},children:[t.jsx("button",{className:"control-button",onClick:c.size>0?o:n,disabled:u,children:c.size>0?C("Done Tagging Selected"):C("Select All")}),c.size===0&&t.jsx("button",{className:"control-button danger",onClick:i,disabled:u,children:C("Delete All")})]}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",flexDirection:d?"row-reverse":"row"},children:[t.jsx("label",{className:"columns-label",children:C("Columns:")}),t.jsxs("select",{value:S,onChange:a=>A(a.target.value),className:"columns-select",children:[t.jsx("option",{value:"1",children:"1"}),t.jsx("option",{value:"2",children:"2"}),t.jsx("option",{value:"3",children:"3"}),t.jsx("option",{value:"4",children:"4"}),t.jsx("option",{value:"5",children:"5"})]})]})]})]}),t.jsx(Oe,{selectedPhotos:e,selectedPhotoIndices:c,isSavingAlbum:u,onRemovePhoto:B,onTogglePhotoSelection:l,onSelectAllPhotos:n,onDeselectAllPhotos:o,hideHeader:!0,photoTagsMap:w,columns:S})]}),Ti=()=>new URLSearchParams(window.location.search).get("mode")==="multiple"?t.jsx(hi,{}):t.jsx(bi,{}),vi=()=>t.jsx(Zt,{children:t.jsx(Ti,{})}),$i=`
.existing-files-grid {
  display: flex;
  overflow-x: auto;
  gap: 16px;
  padding: 20px;
  border: 2px dashed #007bff;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  scrollbar-width: thin;
  scrollbar-color: #007bff #f8f9fa;
}

.existing-file-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 160px;
}

.existing-file-card {
  position: relative;
  width: 100%;
  height: 160px;
  flex-shrink: 0;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #ddd;
  cursor: pointer;
  opacity: 1;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transform: translateY(0);
}

.existing-file-card.selected {
  border-color: rgba(0, 123, 255, 0.6);
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.3), 0 4px 12px rgba(0, 123, 255, 0.15);
  transform: translateY(-2px);
}

.delete-button {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: none;
  background-color: rgba(220, 53, 69, 0.8);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  z-index: 15;
  opacity: 1;
  transition: all 0.2s ease;
  transform: scale(0.8);
}

.delete-button:hover {
  background-color: rgba(200, 35, 51, 0.95);
  transform: scale(1.05);
}

.file-size {
  position: absolute;
  bottom: 4px;
  left: 4px;
  background-color: rgba(0,0,0,0.7);
  color: white;
  font-size: 10px;
  padding: 2px 4px;
  border-radius: 4px;
}

.file-duration {
  position: absolute;
  bottom: 4px;
  right: 4px;
  background-color: rgba(0,0,0,0.7);
  color: white;
  font-size: 10px;
  padding: 2px 4px;
  border-radius: 4px;
}

.file-info {
  min-height: 60px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.file-name {
  font-size: 11px;
  font-weight: 600;
  color: #333;
  padding: 4px 8px;
  background-color: #f8f9fa;
  border-radius: 4px;
  border: 1px solid #e9ecef;
  text-align: center;
  word-break: break-word;
  line-height: 1.2;
  transition: all 0.2s ease;
}

.file-name.selected {
  background-color: #e3f2fd;
  border-color: #90caf9;
}

.file-tags {
  min-height: 32px;
}

.tags-display {
  background: linear-gradient(135deg, rgba(0, 123, 255, 0.95) 0%, rgba(0, 123, 255, 0.85) 100%);
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 11px;
  backdrop-filter: blur(6px);
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  line-height: 1.3;
  min-height: 32px;
  display: flex;
  align-items: center;
  word-break: break-word;
}

.tags-content {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  flex-wrap: wrap;
}

.tag-icon {
  font-size: 12px;
  opacity: 0.9;
  flex-shrink: 0;
}

.tags-text {
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  flex: 1;
}

.no-tags {
  font-size: 10px;
  color: #6c757d;
  font-style: italic;
  text-align: center;
  padding: 6px 8px;
  background-color: rgba(108, 117, 125, 0.1);
  border-radius: 4px;
  border: 1px solid rgba(108, 117, 125, 0.2);
}

.control-button {
  padding: 6px 12px;
  font-size: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
}

.control-button:disabled {
  background-color: #f8f9fa;
  color: #999;
  cursor: not-allowed;
}

.control-button.danger {
  border-color: #dc3545;
  color: #dc3545;
}

.control-button.danger:hover:not(:disabled) {
  background-color: #dc3545;
  color: white;
}

.columns-label {
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  color: #333;
}

.columns-select {
  font-size: 12px;
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
}
`,At=document.createElement("style");At.textContent=$i;document.head.appendChild(At);Xt.createRoot(document.getElementById("root")).render(t.jsx(vi,{}));
