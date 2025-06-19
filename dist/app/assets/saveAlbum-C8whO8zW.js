import{d as Z,u as be,a as f,j as e,g as Be,h as xe,L as me,i as Ve,s as Ut,m as Wt,f as ke,k as Kt,l as Ht,n as qt,r as Gt,o as we,R as Jt,I as Qt,p as Vt}from"./utils-D6u1sJO5.js";import{C as Ue,F as Ye,e as Xe,f as Yt,g as Xt,P as Zt,h as Lt,i as rt,j as it,k as es,l as ts,S as ss,m as rs,V as is,n as as,M as os,G as ns,o as ls,p as ds,q as cs,D as us,r as _e,B as Ze,s as ps,t as fs}from"./styled-components-D7Fpy89O.js";import{u as gs,U as ms}from"./useUsernameManagement-RvRoETSe.js";import{u as xs,U as hs}from"./useFileUploadProcessor-DVBQoJxr.js";import{F as bs}from"./types-Cxncrjqw.js";import{L as ys}from"./LazyImage-CEkBUlqy.js";const y={colors:{primary:"#007bff",primaryDark:"#0056b3",secondary:"#6c757d",success:"#4caf50",danger:"#e53935",warning:"#ff9800",white:"#fff",text:{primary:"#333",secondary:"#666",light:"#777"},background:{primary:"#f9fafb",highlight:"#f0f7ff"},border:"#ddd"},spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px"},borderRadius:{small:"4px",medium:"8px"},boxShadow:{lg:"0 4px 10px rgba(0,0,0,0.08)"}},ws=Z.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10000;
`,Ts=Z.div`
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
`,$s=Z.div`
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
`,Ss=Z.div`
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
`,vs=Z.h3`
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
`,Is=Z.p`
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
`,Le=Z.div`
  margin-bottom: ${y.spacing.lg};
`,et=Z.label`
  display: block;
  margin-bottom: ${y.spacing.sm};
  font-size: 14px;
  font-weight: 500;
  color: ${y.colors.text.primary};
`,As=Z.input`
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
`,Ps=Z.div`
  display: flex;
  flex-direction: column;
  gap: ${y.spacing.md};
  margin-bottom: ${y.spacing.xl};
`,js=Z.div`
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
`,ks=Z.div`
  flex: 1;
`,Ds=Z.div`
  margin-bottom: ${y.spacing.xs};
`,Cs=Z.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${y.colors.primary};
  flex-shrink: 0;
`,Es=Z.label`
  font-size: 16px;
  font-weight: 500;
  color: ${y.colors.text.primary};
  cursor: pointer;
  display: block;
`,Fs=Z.div`
  font-size: 14px;
  color: ${y.colors.text.secondary};
  margin-top: ${y.spacing.xs};
`,_s=Z.div`
  color: ${y.colors.warning};
  font-size: 12px;
  font-style: italic;
  margin-top: ${y.spacing.xs};
  font-weight: 500;
`,Ns=Z.div`
  display: flex;
  gap: ${y.spacing.sm};
  justify-content: center;
  margin-top: ${y.spacing.xl};
`,tt=Z.button`
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
`,zs=Z.div`
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
`,Rs=[{value:"NotVisible",titleKey:"Password Required To See Or Save",descriptionKey:"Album will be completely hidden until correct password is entered"},{value:"Watermark",titleKey:"Watermarked And No Saving Without Password",descriptionKey:"Photos will be visible with watermarks, password required to save"},{value:"CannotBeSaved",titleKey:"Password Required To Save",descriptionKey:"Photos are visible but password required to download or save"},{value:"NoPassword",titleKey:"No Password",descriptionKey:"Album is fully public with no restrictions"}],Os=({isOpen:t,onClose:c,initialOption:n="NoPassword",initialPassword:w=""})=>{const{t:g,language:H}=be(),i=Be(H)==="rtl",[h,$]=f.useState(n),[m,k]=f.useState(w);if(f.useEffect(()=>{t&&($(n),k(w))},[t,n,w]),!t)return null;const _=m.trim()==="",u=R=>{$(R)},o=R=>{R.target===R.currentTarget&&c()},q=R=>R!=="NoPassword";return e.jsxs(e.Fragment,{children:[e.jsx(ws,{onClick:o}),e.jsx(Ts,{children:e.jsx($s,{children:e.jsxs(Ss,{$isRTL:i,children:[e.jsx(vs,{children:g("Album Password Policy")}),e.jsx(Is,{children:g("Configure password protection for your album. Choose how you want to restrict access to your photos.")}),e.jsxs(Le,{children:[e.jsx(et,{children:g("Enter Password")}),e.jsx(As,{type:"text",placeholder:g("Enter password (optional)"),value:m,onChange:R=>k(R.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"})]}),e.jsxs(Le,{children:[e.jsx(et,{children:g("Select Protection Level")}),e.jsx(Ps,{children:Rs.map(R=>e.jsxs(js,{$isSelected:h===R.value,onClick:()=>u(R.value),children:[e.jsx(Cs,{type:"radio",name:"protection",checked:h===R.value,onChange:()=>u(R.value)}),e.jsxs(ks,{children:[e.jsx(Ds,{children:e.jsx(Es,{children:g(R.titleKey)})}),e.jsx(Fs,{children:g(R.descriptionKey)}),_&&q(R.value)&&h===R.value&&e.jsx(_s,{children:g('⚠️ Will use "password" as default if left empty')})]})]},R.value))})]}),q(h)&&e.jsxs(zs,{children:[e.jsx("strong",{children:g("💡 Password Protection Info:")}),e.jsx("br",{}),g('If you leave the password field empty, "password" will be used as the default password. You can change this anytime in album settings.')]}),e.jsxs(Ns,{children:[e.jsx(tt,{$variant:"secondary",onClick:()=>c(),children:g("Cancel")}),e.jsx(tt,{$variant:"primary",onClick:()=>{const R=_&&q(h)?"password":m;console.log(`Saving with option: ${h}, password: ${R.length>0?"********":"none"}`),c(h,R)},children:g("Save")})]})]})})})]})},Ms=({debugMessages:t,t:c,isRTL:n,textDirection:w})=>t.length===0?null:e.jsxs("div",{style:{marginTop:"40px",background:"#fff3cd",padding:"16px",borderRadius:"8px",border:"1px solid #ffeeba",maxWidth:900,margin:"0 auto",direction:w},children:[e.jsx("h3",{style:{marginTop:0,fontSize:"18px",color:"#856404",textAlign:n?"right":"left"},children:c("Debug Log")}),e.jsx("pre",{style:{fontSize:"14px",color:"#856404",whiteSpace:"pre-wrap",maxHeight:"400px",overflow:"auto",textAlign:n?"right":"left"},children:t.map((g,H)=>e.jsx("div",{style:{marginBottom:"8px"},children:g},H))})]}),Bs=`
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
`,Us=(t,c,n,w,g,H,i,h,$,m,k,_,u,o)=>{const[q,R]=f.useState(null),[L,ne]=f.useState(null),se=async M=>{o(`Initializing folder ID with username: ${M}`);try{const ee=new URLSearchParams(window.location.search).get("folderId");if(o(`Folder ID from URL: ${ee||"null"}`),ee){t(ee),o(`Using existing folder ID: ${ee}`);try{o(`Fetching details for folder: ${ee}`);const p=await ce(ee,o);if(o("Folder details retrieved:",p),p){const Y=`${M}_____${M}____Account`,te=p.creatorId===Y;if(o(`User is creator of folder: ${te}, accountId: ${Y}, creator: ${p.creatorId}`),n(te),te){o("User is creator, showing folder details"),w(!0),g(p.folderName),H(p.folderDescription),i(p.isOnPublicProfile),o(`Setting isOnPublicProfile: ${p.isOnPublicProfile}`),p.participantsCanAddItems!==void 0&&(h(p.participantsCanAddItems),o(`Setting participantsCanAddItems: ${p.participantsCanAddItems}`)),p.participantsCanDeleteItems!==void 0&&(u(p.participantsCanDeleteItems),o(`Setting participantsCanDeleteItems: ${p.participantsCanDeleteItems}`));const O=p.passwordPolicy;o(`Password policy from folder details: ${O}`),$(O),O!=="NoPassword"&&p.password&&m(p.password),o(`Set password protection option to: ${O}`)}else o("User is NOT the creator, hiding editable fields"),w(!1)}else o("No folder details retrieved, setting isCreator to true"),n(!0),w(!0)}catch(p){console.error("Error fetching folder details:",p),o(`Error fetching folder details: ${p}`),n(!1)}}else{const p=`${M}_____${Ve()}____Folder`;o(`Creating new folder ID: ${p}`),t(p),o("Setting isCreator to true for new album"),n(!0),w(!0)}}catch(d){console.error("Folder ID initialization error:",d),o(`Folder ID initialization error: ${d}`),n(!1)}},ce=async(M,d)=>{var ee,p,Y,te,O,re,ue,Te,ye;d(`Fetching details for folder ID: ${M}`);try{const he=await xe();if(!he)return d("No token available for fetching folder details"),null;d("Sending GraphQL query to fetch folder details");const de=await(await fetch(ke,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${he}`},body:JSON.stringify({query:Bs,variables:{folderIds:[M],fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(d("Folder details API response:",de),de.errors)return console.error("GraphQL errors:",de.errors),d(`GraphQL errors: ${JSON.stringify(de.errors)}`),null;const I=((p=(ee=de==null?void 0:de.data)==null?void 0:ee.fetchFolders)==null?void 0:p.items)||[];if(d(`Found ${I.length} folder items`),I.length===0)return d("No folder items found"),null;const b=I[0];d("Retrieved folder data:",b);const F=((te=(Y=b.folderPosition)==null?void 0:Y.profileIds)==null?void 0:te.some(E=>E.includes("Public____Profile")))||!1;d(`Folder is on public profile: ${F}`),d("Profile IDs:",(O=b.folderPosition)==null?void 0:O.profileIds);const T=(re=b.folderInviteParameters)==null?void 0:re.usingFolderInviteGrantsRightToAddItems;d(`Participants can add items: ${T}`);const N=(ue=b.folderInviteParameters)==null?void 0:ue.usingFolderInviteGrantsRightToRemoveItems;return d(`Participants can delete items: ${N}`),{creatorId:b.creatorId||"",folderName:b.folderName||"",folderDescription:b.folderDescription||"",passwordPolicy:((Te=b.folderPassword)==null?void 0:Te.policy)||"NoPassword",password:((ye=b.folderPassword)==null?void 0:ye.password)||"",isOnPublicProfile:F,participantsCanAddItems:T!==void 0?T:!0,participantsCanDeleteItems:N!==void 0?N:!1}}catch(he){return console.error("Error in fetchFolderDetails:",he),d(`Error in fetchFolderDetails: ${he}`),null}},s=()=>{o("Attempting to restore photos from localStorage");try{const M=localStorage.getItem(me.SELECTED_PHOTOS);if(o(`Found stored photos: ${M?"yes":"no"}`),M)try{const d=JSON.parse(M);o(`Parsed ${d.length} photos from localStorage`),Array.isArray(d)&&d.length>0&&(c(d),o(`Restored ${d.length} photos to state (including original filenames)`))}catch(d){console.error("Error parsing stored photos:",d),o(`Error parsing stored photos: ${d}`)}}catch(M){console.error("Error restoring photos from storage:",M),o(`Error restoring photos from storage: ${M}`)}},ae=()=>{o("Testing S3 connection");try{Ut?o("S3 client is available"):(console.error("S3 client not available"),o("S3 client not available"))}catch(M){console.error("S3 connection test error:",M),o(`S3 connection test error: ${M}`)}},le=async()=>{var M;o("Starting component initialization");try{o("Checking login with refresh");const d=await xe();if(!d){o("No token returned from login check, aborting initialization");return}try{const ee=localStorage.getItem(me.PUBLIC_USERNAME);o(`Retrieved public username from localStorage: ${ee||"null"}`),ne(ee||null);const Y=JSON.parse(atob(d.split(".")[1]))["cognito:username"];if(Y){o(`Extracted Cognito username from token: ${Y}`),R(Y);const te=localStorage.getItem(me.SUB_ALBUM_DATA);if(o(`Sub-album data from localStorage: ${te||"null"}`),te)try{const O=JSON.parse(te);if(o("Parsed sub-album data:",O),O.isSubAlbum&&((M=O.selectedFileIds)==null?void 0:M.length)>0){o(`Valid sub-album data found with ${O.selectedFileIds.length} files`),k(!0),_(O.selectedFileIds),O.selectedPhotos&&O.selectedPhotos.length>0&&(o(`Found ${O.selectedPhotos.length} selected photos in sub-album data`),c(O.selectedPhotos)),w(!0),n(!0);const re=`${Y}_____${Ve()}____Folder`;o(`Generated new folder ID for sub-album: ${re}`),t(re)}else o("Invalid sub-album data, proceeding with normal initialization"),await se(Y)}catch(O){console.error("Error parsing sub-album data:",O),o(`Error parsing sub-album data: ${O}`),await se(Y)}else o("No sub-album data found, proceeding with normal folder initialization"),await se(Y)}else o("No Cognito username found in token")}catch(ee){console.error("User data initialization error:",ee),o(`User data initialization error: ${ee}`)}s(),ae(),o("Component initialization completed")}catch(d){console.error("Initialization error:",d),o(`Initialization error: ${d}`)}};return f.useEffect(()=>{le()},[]),{cognitoUsername:q,publicUsername:L,setPublicUsername:ne}},Ws=(t,c,n,w,g,H,i,h,$,m,k,_,u,o,q,R,L,ne,se,ce,s,ae)=>{const le=I=>(s(`Converting ${I.length} tags to API format`),I.map(b=>({TagType:b.TagType,tagTitle:b.tagTitle,subtags:b.subtags.map(F=>({TagType:b.TagType,tagTitle:F.tagTitle,subtagTitle:F.subtagTitle}))}))),M=I=>{s(`Save progress text: ${I}`);const b=document.getElementById("saveProgressText");b&&(b.innerText=I)},d=I=>{const b=document.getElementById("saveProgress");b?(b.style.width=`${I}%`,s(`Updated save progress bar: ${I}%`)):s("Progress bar element not found"),ne(I)},ee=(I,b)=>{s(`Splitting array of ${I.length} items into chunks of ${b}`);const F=[];for(let T=0;T<I.length;T+=b)F.push(I.slice(T,T+b));return s(`Created ${F.length} chunks`),F},p=I=>{const b=new Set;return I.filter(F=>b.has(F.fileId)?(s(`Skipping duplicate file reference with ID: ${F.fileId}`),!1):(b.add(F.fileId),!0))},Y=(I,b,F)=>{s("Creating folder position input WITHOUT folder-level tags"),s(`Profile visibility: ${h?"Public":"Only Me"}`);const T=h?[`${c}_____Public____Profile`]:["Only Me_____Only Me____Profile"];s(`Profile IDs: ${JSON.stringify(T)}`);let N=[];w&&g.length>0&&(s(`Creating file reference IDs for ${g.length} sub-album files`),N=g.map(V=>{const B=V.split("_____");if(B.length>=2){const ie=B[1].split("____")[0],ge=`${F}_____${ie}____FileReference`;return s(`Created file reference ID for sub-album: ${ge}`),ge}return s(`Using original fileId as fallback: ${V}`),V})),s(`Created ${N.length} acceptedFileReferenceIds`);const E=k!=="NoPassword"?_:null;if(s(`Password protection: ${k}`),s(`Album password: ${E?"******":"null"}`),s(`Participants can add items: ${$}`),s(`Participants can delete items: ${m}`),!t)throw s("Error: folderId is null or undefined"),new Error("folderId is required to create folder position input");const G=Kt(t),J=Ht(G);return{currentTime:I,folderId:t,profileIds:T,folderPositionPoints:1,acceptedFileReferenceIds:N,folderInput:{folderAboutContactIds:[b],albumNanoId:J,folderName:H,folderDescription:i,folderPasswordInput:{password:E,policy:k},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:$,usingFolderInviteGrantsRightToRemoveItems:m,addedItemsNeedFolderCreatorApproval:!1}}}},te=(I,b,F)=>(s(`Creating file reference inputs with individual photo tags and original filenames for ${I.length} photos`),I.map((T,N)=>{var oe;const E=u.get(N)||[],G=le(E),J=T.originalFileName||T.fileName;if(s(`Photo ${N} (${T.fileName}): ${E.length} tags applied, display name: ${J}`),T.fileId)return s(`Using existing fileId for photo: ${T.fileId}`),{fileReferencesHolderId:t,currentTime:b,points:1,hasBeenDeleted:!1,selectedTagInputs:G,fileId:T.fileId,fileDisplayName:J,fileInput:null};const V=T.type==="video"||(oe=T.type)!=null&&oe.startsWith("video")?`Input/Video/${T.fileName}`:`Input/Image/${T.fileName}`,B=`${c}_____${T.fileName}____File`;return s(`Created file reference for ${T.fileName}:`),s(`  - dataKey: ${V}`),s(`  - fileId: ${B}`),s(`  - fileDisplayName: ${J}`),s(`  - thumbnailDataKey: ${T.thumbnailDataKey||"undefined"}`),s(`  - size: ${T.size}`),s(`  - thumbnailSize: ${T.thumbnailSize||0}`),s(`  - duration: ${T.duration||"undefined"}`),s(`  - tags: ${E.length} tags selected for this photo`),{fileReferencesHolderId:t,currentTime:b,points:1,hasBeenDeleted:!1,selectedTagInputs:G,fileId:B,fileDisplayName:J,fileInput:{fileId:B,ownerFileInput:{editorContactIds:[F],FileSharingOptionsEnum:"Anyone",dataKey:V,thumbnailDataKey:T.thumbnailDataKey,dataInBytes:T.size,thumbnailDataInBytes:T.thumbnailSize||0,s3UploadedAt:b,durationInSeconds:T.duration},editorFileInput:{aboutContactIds:[F],captionText:"",numericFilterInputs:[]}}}})),O=I=>{const b=[];return R.forEach(F=>{const T=o.get(F)||[];if(T.length>0){const N=q[F];if(N){const E=N.dataKey.split("/"),G=E[E.length-1],J=`${c}_____${G}____File`,V=N.fileName||G,B=le(T);s(`Creating file reference for existing file ${F} (${G}) with ${T.length} tags, display name: ${V}`),b.push({fileReferencesHolderId:t,currentTime:I,points:1,hasBeenDeleted:!1,selectedTagInputs:B,fileId:J,fileDisplayName:V,fileInput:null})}}}),s(`Created ${b.length} file references for existing files with tags and filenames`),b},re=async I=>{var N,E;s("Sending folder-only mutation (no file references, no folder tags)");const b=await xe();if(!b)throw s("No token available for saving album, aborting"),new Error("Authentication token not available");const F=`
      mutation MyMutation($folderPositionInputs: [FolderPositionInput!]) {
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items {
            id
          }
        }
      }
    `,T={folderPositionInputs:[I]};s("GraphQL folder-only mutation variables:",T);try{s("Sending API request to save folder");const G=await fetch(ke,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${b}`},body:JSON.stringify({query:F,variables:T})});s(`API response status: ${G.status}`);const J=await G.text();s(`API response raw text: ${J}`);const V=JSON.parse(J);if(s("API response JSON:",V),V.errors)throw console.error("Folder save failed:",V.errors),s("Folder save failed with errors:",V.errors),new Error("Failed to save folder");return s("Folder saved successfully"),((E=(N=V.data)==null?void 0:N.changeFiles)==null?void 0:E.items)||[]}catch(G){throw console.error("Error in sendFolderOnlyMutation:",G),s(`Error in sendFolderOnlyMutation: ${G}`),G}},ue=async I=>{var N,E,G,J,V;s(`Sending file references-only mutation with ${I.length} items (each with individual tags and filenames)`);const b=await xe();if(!b)throw s("No token available for saving file references, aborting"),new Error("Authentication token not available");const F=`
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
    `,T={updatedFileReferenceInputs:I};s("GraphQL file references-only mutation variables (first item):",I.length>0?I[0]:"No items");try{s("Sending API request to save file references with individual tags and filenames");const B=await fetch(ke,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${b}`},body:JSON.stringify({query:F,variables:T})});s(`API response status: ${B.status}`);const oe=await B.text();s(`API response raw text: ${oe.substring(0,500)}...`);const ie=JSON.parse(oe);if(s("API response JSON items count:",((G=(E=(N=ie.data)==null?void 0:N.changeFiles0)==null?void 0:E.items)==null?void 0:G.length)||0),ie.errors)throw console.error("File references save failed:",ie.errors),s("File references save failed with errors:",ie.errors),new Error("Failed to save file references");return s("File references chunk saved successfully with individual photo tags and filenames"),((V=(J=ie.data)==null?void 0:J.changeFiles0)==null?void 0:V.items)||[]}catch(B){throw console.error("Error in sendFileReferencesOnlyMutation:",B),s(`Error in sendFileReferencesOnlyMutation: ${B}`),B}},Te=async(I,b)=>{var E,G,J,V,B,oe,ie,ge,r;s(`Sending final chunk with folder mutation (${I.length} file references with filenames, no folder tags)`);const F=await xe();if(!F)throw s("No token available for saving final chunk, aborting"),new Error("Authentication token not available");const T=`
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
    `,N={folderPositionInputs:[b],updatedFileReferenceInputs:I};s("GraphQL final mutation variables (folder + last chunk with filenames, no folder tags)");try{s("Sending API request for final save with folder (no folder tags, with filenames)");const S=await fetch(ke,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${F}`},body:JSON.stringify({query:T,variables:N})});s(`API response status: ${S.status}`);const U=await S.text();s(`API response raw text: ${U.substring(0,500)}...`);const W=JSON.parse(U);if(s("API response JSON:",{fileReferencesCount:((J=(G=(E=W.data)==null?void 0:E.changeFiles0)==null?void 0:G.items)==null?void 0:J.length)||0,folderItems:((B=(V=W.data)==null?void 0:V.changeFiles)==null?void 0:B.items)||[]}),W.errors)throw console.error("Final save failed:",W.errors),s("Final save failed with errors:",W.errors),new Error("Failed to complete album save");return s("Final chunk and folder saved successfully (with individual photo tags and filenames)"),{fileReferences:((ie=(oe=W.data)==null?void 0:oe.changeFiles0)==null?void 0:ie.items)||[],folderPositions:((r=(ge=W.data)==null?void 0:ge.changeFiles)==null?void 0:r.items)||[]}}catch(S){throw console.error("Error in sendFinalChunkWithFolderMutation:",S),s(`Error in sendFinalChunkWithFolderMutation: ${S}`),S}},ye=async()=>(s("Validating required data"),await xe()?c?t?(s("All required data validated successfully"),!0):(s("No folder ID, validation failed"),!1):(s("No Cognito username, validation failed"),!1):(s("No token available, validation failed"),!1)),he=()=>{s("Handling successful save"),qt(se,ce,[me.SELECTED_PHOTOS,me.SUB_ALBUM_DATA],s),s("Album data cleared"),M(ae("Album saved successfully!")),sessionStorage.setItem("album_just_saved","true"),s("Set 'album_just_saved' flag in sessionStorage"),s("Setting timeout for redirect to my-albums.html"),setTimeout(()=>{s("Redirecting to my-albums.html"),Gt("my-albums.html")},1e3)},Ae=async(I,b)=>{s("Starting chunked save process (individual photo tags with filenames, no folder tags, including existing files with tags)");try{M(ae("Processing files in chunks..."));const F=48;if(b.length===0)s("No file references to process, saving only folder position (no folder tags)"),await re(I);else{const T=p(b);s(`After removing duplicates, processing ${T.length} unique file references`);const N=ee(T,F);s(`Split file references into ${N.length} chunks of max size ${F}`);for(let E=0;E<N.length;E++){const G=N[E];s(`Processing chunk ${E+1} of ${N.length} with ${G.length} file references`);const J=E/N.length*80;ne(10+J),d(10+J),E<N.length-1?(M(ae("Saving files: chunk {{chunkNumber}} of {{totalChunks}}...",{chunkNumber:E+1,totalChunks:N.length})),await ue(G)):(M(ae("Finalizing album...")),await Te(G,I))}}ne(100),d(100),M(ae("Album saved successfully!")),he()}catch(F){console.error("Error in chunked save process:",F),s(`Error in chunked save process: ${F}`),M(ae("Error: {{error}}",{error:String(F)})),L(!1)}};return{saveAlbumDirectly:async()=>{s("Starting direct album save with individual photo tagging, existing file tagging, and original filenames"),s(`Photo tags map: ${u.size} photos have tags applied`),s(`Existing file tags map: ${o.size} existing files have tags applied`),L(!0),ne(5);try{if(s("Validating required data for save"),!await ye()){s("Required data validation failed, aborting save"),L(!1);return}const I=Math.floor(Date.now()/1e3),b=`${c}_____${c}____Account`,T=t.split("_____")[1].split("____")[0];s(`Save timestamp: ${I}`),s(`Account ID: ${b}`),s(`Folder ID: ${t}`),s(`Folder target item identifier: ${T}`),s("Creating folder position input (no folder tags)");const N=Y(I,b,T);s("Folder position input created:",N);let E=[];const G=n.filter(V=>V.status==="complete");if(s(`Found ${G.length} valid photos with 'complete' status`),G.length>0){const V=G.filter(oe=>!oe.fileId);s(`Found ${V.length} new uploads to move from temp to public folder`),V.length>0&&(s("Moving files from temp to public folder"),await Wt(V,d,s)),s("Creating file reference inputs for uploads with individual photo tags and original filenames");const B=te(G,I,b);s(`Created ${B.length} file reference inputs for uploads`,B),E=E.concat(B)}const J=O(I);if(J.length>0&&(s(`Adding ${J.length} existing file references with tags and filenames`),E=E.concat(J)),w&&g.length>0){s(`Adding ${g.length} existing file references for sub-album`);const V=g.map(B=>{s(`Creating file reference for existing sub-album file ID: ${B}`);const oe=[],ie=B.split("_____"),ge=ie.length>=2?ie[1].split("____")[0]:B;return{fileReferencesHolderId:t,currentTime:I,points:1,hasBeenDeleted:!1,selectedTagInputs:oe,fileId:B,fileDisplayName:ge,fileInput:null}});s(`Created ${V.length} file reference inputs for sub-album files`,V),E=E.concat(V)}s(`Total file reference inputs: ${E.length}`),s("Sending GraphQL mutations with chunked file references (individual photo tags, existing file tags, and original filenames)"),await Ae(N,E)}catch(I){console.error("Error in saveAlbumDirectly:",I),s(`Error in saveAlbumDirectly: ${I}`),L(!1)}}}},Ks=Z.div`
  margin: 32px 0;
`,at=Z.div`
  margin-bottom: 24px;
`,ot=Z.h3`
  margin: 0 0 16px 0;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  display: flex;
  align-items: center;
  gap: 12px;
`,nt=Z.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  min-height: 32px;
`,lt=Z.button`
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
`,Hs=Z(lt)`
  font-size: 12px;
  padding: 6px 12px;
  border-radius: 16px;
`,dt=Z.button`
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
`,qs=Z.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 16px;
`,ct=Z.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 16px;
`,ut=Z.button`
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
`,Gs=Z.div`
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
`,Js=Z.input`
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
`,st=Z.button`
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
`,Qs=we.memo(({tag:t,isApplied:c,isDisplayed:n,isBeingDeleted:w,disabled:g,onTagClick:H,onDeleteTag:i,getTagDisplayText:h})=>{const{t:$}=be(),[m,k]=f.useState(!1),[_,u]=f.useState(!1);f.useEffect(()=>{const q=()=>{u("ontouchstart"in window||navigator.maxTouchPoints>0)};return q(),window.addEventListener("resize",q),()=>window.removeEventListener("resize",q)},[]);const o=_?n&&!g&&!w:m&&n&&!g&&!w;return e.jsxs(lt,{$isApplied:c,$isDisplayed:n,$isBeingDeleted:w,disabled:g,onClick:()=>H(t),onMouseEnter:()=>!_&&n&&k(!0),onMouseLeave:()=>!_&&n&&k(!1),children:[e.jsx("span",{style:{paddingRight:o?"20px":"0"},children:h(t)}),o&&e.jsx(dt,{$isMobile:_,onClick:q=>{q.stopPropagation(),i(t.id)},disabled:w,title:$("Delete tag"),children:"×"})]})}),Vs=we.memo(({subtag:t,isApplied:c,isBeingDeleted:n,disabled:w,onSubtagClick:g,onDeleteSubtag:H})=>{const{t:i}=be(),[h,$]=f.useState(!1),[m,k]=f.useState(!1);f.useEffect(()=>{const u=()=>{k("ontouchstart"in window||navigator.maxTouchPoints>0)};return u(),window.addEventListener("resize",u),()=>window.removeEventListener("resize",u)},[]);const _=m?c&&!w&&!n:h&&c&&!w&&!n;return e.jsxs(Hs,{$isApplied:c,$isBeingDeleted:n,disabled:w,onClick:()=>g(t),onMouseEnter:()=>!m&&c&&$(!0),onMouseLeave:()=>!m&&c&&$(!1),children:[e.jsx("span",{style:{paddingRight:_?"20px":"0"},children:t.subtagTitle}),_&&e.jsx(dt,{$isMobile:m,onClick:u=>{u.stopPropagation(),H(t.id)},disabled:n,title:i("Delete subtag"),children:"×"})]})}),pt=({value:t,onChange:c,onSubmit:n,onCancel:w,isSubmitting:g,placeholder:H="Enter tag name..."})=>{const{t:i}=be(),h=f.useRef(null);f.useEffect(()=>{h.current&&h.current.focus()},[]);const $=m=>{m.key==="Enter"?n():m.key==="Escape"&&w()};return e.jsxs(Gs,{children:[e.jsx(Js,{ref:h,type:"text",value:t,onChange:m=>c(m.target.value),onKeyDown:$,placeholder:i(H),disabled:g}),e.jsx(st,{onClick:n,disabled:!t.trim()||g,title:i("Add (Enter)"),children:g?"...":"✓"}),e.jsx(st,{onClick:w,disabled:g,title:i("Cancel (Escape)"),children:"×"})]})},Ys=we.memo(({tagsManager:t,disabled:c=!1,enhancedLog:n})=>{const{t:w}=be(),{tags:g,displayedTagId:H,isLoadingTags:i,tagIdBeingDeleted:h,isAddingNewTag:$,newTagTitle:m,isSubmittingNewTag:k,toggleTagOnSelectedFiles:_,setDisplayedTag:u,isTagAppliedToSelected:o,deleteTag:q,startAddingNewTag:R,cancelAddingNewTag:L,submitNewTag:ne,setNewTagTitle:se,getAppliedTagsForSelected:ce,hasSelectedFiles:s}=t;if(!s())return null;const ae=we.useCallback(p=>{if(!o(p))return p.tagTitle;const O=ce().find(ue=>ue.tagTitle===p.tagTitle);if(!O||O.subtags.length===0)return p.tagTitle;const re=O.subtags.map(ue=>ue.subtagTitle).join(" || ");return`${p.tagTitle}  |  ${re}`},[o,ce]);we.useEffect(()=>{const p=g.filter(te=>o(te)),Y=ce();n(`TagsDisplay render - ${p.length} tags applied to all selected files:`,p.map(te=>`${te.tagTitle} (display: "${ae(te)}")`)),n("Applied tags with subtags:",Y)},[g,o,ce,ae,n]);const le=p=>{if(c)return;const Y=o(p);n(`Tag "${p.tagTitle}" clicked - current state: ${Y?"applied to all":"not applied to all"}`),_(p),p.subtags&&p.subtags.length>0&&u(Y?null:p.id),n(`After toggle - new state: ${Y?"removed from all":"applied to all"}`)},M=async p=>{if(c)return;n(`Delete tag initiated: ${p}`);const Y=await q(p);n(Y?`Tag successfully deleted: ${p}`:`Failed to delete tag: ${p}`)},d=async()=>{await ne()||n("Failed to submit new tag")},ee=we.useMemo(()=>[...g].sort((p,Y)=>p.points!==Y.points?Y.points-p.points:Y.updatedAt-p.updatedAt),[g]);return e.jsxs(Ks,{children:[e.jsxs(at,{children:[e.jsx(ot,{children:w("Apply tags to selected files")}),e.jsx(nt,{children:i?e.jsx(qs,{children:w("Loading tags...")}):e.jsxs(e.Fragment,{children:[ee.map(p=>{const Y=o(p);return e.jsx(Qs,{tag:p,isApplied:Y,isDisplayed:H===p.id,isBeingDeleted:h===p.id,disabled:c,onTagClick:le,onDeleteTag:M,getTagDisplayText:ae},p.id)}),$?e.jsx(pt,{value:m,onChange:se,onSubmit:d,onCancel:L,isSubmitting:k,placeholder:w("Enter tag name...")}):e.jsx(ut,{disabled:c,onClick:R,children:w("+ Add Tag")}),ee.length===0&&!$&&e.jsx(ct,{children:w("No tags available")})]})})]}),H&&e.jsx(Xs,{tagsManager:t,disabled:c,enhancedLog:n}),e.jsx("div",{style:{marginTop:"24px",padding:"20px 24px",background:"linear-gradient(135deg, #e7f3ff 0%, #f0f8ff 100%)",borderRadius:"12px",fontSize:"13px",color:"#0c5aa6",border:"1px solid #b3d9ff",boxShadow:"0 4px 12px rgba(0, 123, 255, 0.08)"},children:e.jsxs("div",{style:{lineHeight:"2.2"},children:[e.jsxs("div",{style:{marginBottom:"8px"},children:[e.jsx("strong",{style:{color:"#28a745"},children:"🟢"}),"  ",w("Most recently clicked tag (showing subtags)")]}),e.jsxs("div",{style:{marginBottom:"8px"},children:[e.jsx("strong",{style:{color:"#333333"},children:"⚫"}),"  ",w("Applied to selected files")]}),e.jsxs("div",{children:[e.jsx("strong",{style:{color:"#6c757d"},children:"⚪"}),"  ",w("Available but not applied to all selected files")]})]})})]})}),Xs=we.memo(({tagsManager:t,disabled:c=!1,enhancedLog:n})=>{var M;const{t:w}=be(),{displayedTagId:g,subtagIdBeingDeleted:H,isAddingNewSubtag:i,newSubtagTitle:h,isSubmittingNewSubtag:$,toggleSubtagOnSelectedFiles:m,isSubtagAppliedToSelected:k,deleteSubtag:_,startAddingNewSubtag:u,cancelAddingNewSubtag:o,submitNewSubtag:q,setNewSubtagTitle:R,tags:L}=t,ne=g?((M=L.find(d=>d.id===g))==null?void 0:M.subtags)||[]:[],se=L.find(d=>d.id===g),ce=d=>{c||(n(`Subtag "${d.subtagTitle}" clicked - current state: ${k(d)?"applied to all":"not applied to all"}`),m(d))},s=async d=>{if(c)return;n(`Delete subtag initiated: ${d}`);const ee=await _(d);n(ee?`Subtag successfully deleted: ${d}`:`Failed to delete subtag: ${d}`)},ae=async()=>{await q()||n("Failed to submit new subtag")};if(!se)return null;const le=we.useMemo(()=>[...ne].sort((d,ee)=>d.points!==ee.points?ee.points-d.points:ee.updatedAt-d.updatedAt),[ne]);return e.jsxs(at,{children:[e.jsx(ot,{children:w('Subtags for "{{tagTitle}}"',{tagTitle:se.tagTitle})}),e.jsxs(nt,{children:[le.map(d=>e.jsx(Vs,{subtag:d,isApplied:k(d),isBeingDeleted:H===d.id,disabled:c,onSubtagClick:ce,onDeleteSubtag:s},d.id)),i?e.jsx(pt,{value:h,onChange:R,onSubmit:ae,onCancel:o,isSubmitting:$,placeholder:w("Enter subtag name...")}):e.jsx(ut,{disabled:c,onClick:u,children:w("+ Add Subtag")}),le.length===0&&!i&&e.jsx(ct,{children:w("No subtags available")})]})]})}),ft=({photoTags:t,isSelected:c=!1,onToggleSelection:n,fileName:w,showFileName:g=!1})=>{const{t:H}=be(),h=(k=>k.length===0?"":k.map(_=>{if(_.subtags.length>0){const u=_.subtags.map(o=>o.subtagTitle).join(", ");return`${_.tagTitle}: ${u}`}return _.tagTitle}).join(" • "))(t),$=t.length>0;return g&&w||$||c?e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"4px"},children:[g&&w&&e.jsx("div",{style:{fontSize:"11px",fontWeight:"600",color:"#333",padding:"4px 8px",backgroundColor:c?"#e3f2fd":"#f8f9fa",borderRadius:"4px",border:`1px solid ${c?"#90caf9":"#e9ecef"}`,textAlign:"center",wordBreak:"break-word",lineHeight:"1.2",transition:"all 0.2s ease"},children:w}),e.jsx("div",{style:{background:$?"linear-gradient(135deg, rgba(0, 123, 255, 0.95) 0%, rgba(0, 123, 255, 0.85) 100%)":"rgba(108, 117, 125, 0.6)",color:"white",padding:$?"8px 12px":"6px 12px",borderRadius:$?"8px":"6px",fontSize:$?"11px":"10px",cursor:n?"pointer":"default",backdropFilter:"blur(6px)",boxShadow:$?"0 4px 12px rgba(0, 123, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)":"0 2px 8px rgba(0, 0, 0, 0.2)",border:$?"1px solid rgba(255, 255, 255, 0.2)":"none",transition:"all 0.3s ease",lineHeight:"1.3",minHeight:"32px",display:"flex",alignItems:"center",wordBreak:"break-word"},onClick:n,onMouseEnter:k=>{$&&(k.currentTarget.style.transform="translateY(-1px)",k.currentTarget.style.boxShadow="0 6px 16px rgba(0, 123, 255, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3)")},onMouseLeave:k=>{$&&(k.currentTarget.style.transform="translateY(0)",k.currentTarget.style.boxShadow="0 4px 12px rgba(0, 123, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)")},children:$?e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",width:"100%",flexWrap:"wrap"},children:[e.jsx("span",{style:{fontSize:"12px",opacity:.9,flexShrink:0},children:"🏷️"}),e.jsx("span",{style:{fontWeight:"600",textShadow:"0 1px 2px rgba(0, 0, 0, 0.3)",flex:1},children:h})]}):e.jsx("div",{style:{opacity:.8,fontStyle:"italic",textAlign:"center",width:"100%",fontSize:"10px"},children:H("No tags applied")})})]}):null},Zs=({selectedPhotos:t,selectedPhotoIndices:c,isSavingAlbum:n,onRemovePhoto:w,onTogglePhotoSelection:g,onSelectAllPhotos:H,onDeselectAllPhotos:i,hideHeader:h=!1,photoTagsMap:$})=>{const{t:m}=be();if(t.length===0)return null;const k=c.size>0,_=c.size===t.length;return e.jsxs(e.Fragment,{children:[!h&&e.jsx(Ue,{style:{marginBottom:"16px",border:"2px solid #007bff"},children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px"},children:[e.jsx("span",{style:{fontWeight:"bold",fontSize:"14px",color:"#007bff"},children:k?m("{{count}} file(s) selected for tagging",{count:c.size}):m("Select files with blue borders for tagging")}),e.jsxs("div",{style:{display:"flex",gap:"8px",marginLeft:"auto"},children:[!_&&e.jsx("button",{onClick:H,disabled:n,style:{padding:"6px 12px",border:"1px solid #007bff",borderRadius:"4px",background:"#007bff",color:"white",fontSize:"12px",cursor:"pointer",fontWeight:"bold"},children:m("Select All")}),k&&e.jsx("button",{onClick:i,disabled:n,style:{padding:"6px 12px",border:"1px solid #6c757d",borderRadius:"4px",background:"transparent",color:"#6c757d",fontSize:"12px",cursor:"pointer"},children:m("Deselect All")})]})]})}),e.jsx(es,{children:t.map((u,o)=>{var L,ne;const q=c.has(o),R=$.get(o)||[];return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:[e.jsxs(ts,{"data-selected":q?"true":"false",style:{position:"relative",cursor:"pointer"},onClick:()=>g(o),children:[q&&!n&&e.jsx("button",{onClick:se=>{se.stopPropagation(),confirm(m("Are you sure you want to remove this photo?"))&&w(o)},style:{position:"absolute",top:"6px",right:"6px",width:"18px",height:"18px",borderRadius:"50%",border:"none",backgroundColor:"rgba(220, 53, 69, 0.8)",color:"white",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:"bold",zIndex:15,opacity:1,transition:"all 0.2s ease",transform:"scale(0.8)"},onMouseEnter:se=>{se.currentTarget.style.backgroundColor="rgba(200, 35, 51, 0.9)",se.currentTarget.style.transform="scale(1)",se.currentTarget.style.opacity="1"},onMouseLeave:se=>{se.currentTarget.style.backgroundColor="rgba(220, 53, 69, 0.8)",se.currentTarget.style.transform="scale(0.8)",se.currentTarget.style.opacity="0"},title:m("Remove photo"),children:"×"}),u.status!=="complete"&&e.jsx(ss,{$status:u.status,children:u.status==="error"?"✕":u.status==="uploading"?"↑":u.status==="processing"?"⚙️":"•"}),e.jsxs(rs,{style:{opacity:t.length===1||!q?1:.85,transition:"opacity 0.2s ease"},children:[u.type==="video"||(L=u.type)!=null&&L.startsWith("video")?e.jsx(is,{src:u.s3PreviewUrl,controls:!0}):e.jsx(as,{src:u.s3PreviewUrl,alt:u.fileName}),(u.status==="uploading"||u.status==="processing")&&e.jsx(rt,{$bottom:"4px",$left:"4px",$right:"4px",$height:"4px",children:e.jsx(it,{$progress:u.progress,$status:u.status})})]}),e.jsxs("div",{style:{position:"absolute",bottom:"32px",left:"8px",right:"8px",background:"rgba(0, 0, 0, 0.7)",color:"white",padding:"4px 8px",borderRadius:"4px",fontSize:"11px",textAlign:"center",backdropFilter:"blur(4px)"},children:[(ne=u.type)!=null&&ne.startsWith("video")?m("Video"):m("Image"),u.size&&` • ${(u.size/1024/1024).toFixed(1)} ${m("MB")}`,u.duration&&` • ${u.duration}${m("s")}`]}),u.status==="error"&&u.errorMessage&&e.jsxs(os,{$type:"error",children:[m("Error"),": ",u.errorMessage.length>40?u.errorMessage.substring(0,37)+"...":u.errorMessage]})]}),e.jsx("div",{style:{minHeight:"60px",display:"flex",flexDirection:"column",gap:"4px"},children:e.jsx(ft,{photoTags:R,isSelected:q,onToggleSelection:()=>g(o),fileName:u.originalFileName||u.fileName,showFileName:!0})})]},o)})}),e.jsx("style",{children:`
          [data-selected="true"]:hover button {
            opacity: 1 !important;
            transform: scale(1) !important;
          }
        `})]})},Ls=({isSavingAlbum:t,savingProgress:c})=>{const{t:n}=be();return t?e.jsxs(Ue,{children:[e.jsx(Zt,{children:n("Saving Album")}),e.jsx(Lt,{id:"saveProgressText",children:n("Moving files...")}),e.jsx(rt,{children:e.jsx(it,{id:"saveProgress",$progress:c/100})})]}):null},er=({showFolderDetails:t,isCreator:c,folderName:n,setFolderName:w,folderDescription:g,setFolderDescription:H,isSavingAlbum:i})=>{const{t:h}=be();return!t||c!==!0?null:e.jsxs(Ue,{children:[e.jsxs(Ye,{children:[e.jsx(Xe,{htmlFor:"folderName",children:h("Album Name")}),e.jsx(Yt,{id:"folderName",type:"text",value:n,onChange:$=>w($.target.value),placeholder:h("e.g. Family Vacation in Kyoto"),disabled:i})]}),e.jsxs(Ye,{children:[e.jsx(Xe,{htmlFor:"folderDescription",children:h("Album Description")}),e.jsx(Xt,{id:"folderDescription",value:g,onChange:$=>H($.target.value),placeholder:h("e.g. what's special about this album"),rows:4,disabled:i})]})]})},tr=`
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
`,sr=`
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
`,rr=`
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
`,ir=`
  mutation DeleteTag($tagId: String!) {
    deleteTag(tagId: $tagId) {
      id
      hasBeenDeleted
    }
  }
`,ar=`
  mutation DeleteSubtag($subtagId: String!) {
    deleteSubtag(subtagId: $subtagId) {
      id
      hasBeenDeleted
    }
  }
`,or=(t,c,n,w,g,H,i)=>{const[h,$]=f.useState([]),[m,k]=f.useState(null),[_,u]=f.useState(!1),[o,q]=f.useState(null),[R,L]=f.useState(null),[ne,se]=f.useState(!1),[ce,s]=f.useState(!1),[ae,le]=f.useState(""),[M,d]=f.useState(""),[ee,p]=f.useState(!1),[Y,te]=f.useState(!1),O=f.useMemo(()=>({photoIndices:Array.from(g),existingIndices:Array.from(H)}),[g,H]),re=f.useCallback(r=>{const{photoIndices:S,existingIndices:U}=O;if(S.length===0&&U.length===0)return!1;const W=S.length===0||S.every(l=>(t.get(l)||[]).some(K=>K.tagTitle===r.tagTitle)),P=U.length===0||U.every(l=>(n.get(l)||[]).some(K=>K.tagTitle===r.tagTitle)),x=W&&P;return(S.length>0||U.length>0)&&i(`Tag "${r.tagTitle}" applied to all selected? ${x} (photos: ${W}, existing: ${P})`),x},[O,t,n,i]),ue=f.useCallback(r=>{const{photoIndices:S,existingIndices:U}=O;let W=0,P=0;S.forEach(j=>{const pe=(t.get(j)||[]).find($e=>$e.tagTitle===r.tagTitle);pe&&(W++,pe.subtags.some($e=>$e.subtagTitle===r.subtagTitle)&&P++)});let x=0,l=0;U.forEach(j=>{const pe=(n.get(j)||[]).find($e=>$e.tagTitle===r.tagTitle);pe&&(x++,pe.subtags.some($e=>$e.subtagTitle===r.subtagTitle)&&l++)});const z=W+x,K=P+l;return z>0&&K===z},[O,t,n]),Te=f.useCallback(r=>{const{photoIndices:S,existingIndices:U}=O;if(S.length===0&&U.length===0){i("No files selected for tag application");return}const W=re(r);i(`${W?"Removing":"Applying"} tag "${r.tagTitle}" ${W?"from":"to"} all selected files`),S.length>0&&c(P=>{const x=new Map(P);return S.forEach(l=>{const z=x.get(l)||[];if(W){const K=z.filter(j=>j.tagTitle!==r.tagTitle);x.set(l,K),i(`Removed tag "${r.tagTitle}" from photo ${l}`)}else if(!z.some(j=>j.tagTitle===r.tagTitle)){const j={tagTitle:r.tagTitle,TagType:r.TagType,subtags:[]};x.set(l,[...z,j]),i(`Added tag "${r.tagTitle}" to photo ${l}`)}}),x}),U.length>0&&w(P=>{const x=new Map(P);return U.forEach(l=>{const z=x.get(l)||[];if(W){const K=z.filter(j=>j.tagTitle!==r.tagTitle);x.set(l,K),i(`Removed tag "${r.tagTitle}" from existing file ${l}`)}else if(!z.some(j=>j.tagTitle===r.tagTitle)){const j={tagTitle:r.tagTitle,TagType:r.TagType,subtags:[]};x.set(l,[...z,j]),i(`Added tag "${r.tagTitle}" to existing file ${l}`)}}),x})},[O,re,c,w,i]),ye=f.useCallback(r=>{const{photoIndices:S,existingIndices:U}=O;if(S.length===0&&U.length===0){i("No files selected for subtag application");return}const W=ue(r);i(`${W?"Removing":"Applying"} subtag "${r.subtagTitle}" ${W?"from":"to"} all selected files with parent tag`),S.length>0&&c(P=>{const x=new Map(P);return S.forEach(l=>{const K=(x.get(l)||[]).map(j=>{if(j.tagTitle===r.tagTitle){if(W)return{...j,subtags:j.subtags.filter(X=>X.subtagTitle!==r.subtagTitle)};if(!j.subtags.some(pe=>pe.subtagTitle===r.subtagTitle))return{...j,subtags:[...j.subtags,{tagTitle:r.tagTitle,subtagTitle:r.subtagTitle}]}}return j});x.set(l,K)}),x}),U.length>0&&w(P=>{const x=new Map(P);return U.forEach(l=>{const K=(x.get(l)||[]).map(j=>{if(j.tagTitle===r.tagTitle){if(W)return{...j,subtags:j.subtags.filter(X=>X.subtagTitle!==r.subtagTitle)};if(!j.subtags.some(pe=>pe.subtagTitle===r.subtagTitle))return{...j,subtags:[...j.subtags,{tagTitle:r.tagTitle,subtagTitle:r.subtagTitle}]}}return j});x.set(l,K)}),x})},[O,ue,c,w,i]),he=f.useCallback(()=>{const{photoIndices:r,existingIndices:S}=O,U=[];r.forEach(x=>{const l=t.get(x)||[];U.push(...l)}),S.forEach(x=>{const l=n.get(x)||[];U.push(...l)});const W=new Map;U.forEach(x=>{if(W.has(x.tagTitle)){const l=W.get(x.tagTitle),z=[...l.subtags,...x.subtags],K=Array.from(new Map(z.map(j=>[j.subtagTitle,j])).values());W.set(x.tagTitle,{...l,subtags:K})}else W.set(x.tagTitle,x)});const P=Array.from(W.values());return i(`getAppliedTagsForSelected: ${P.length} unique tags from ${r.length} photos + ${S.length} existing files`),P},[O,t,n,i]),Ae=f.useCallback(()=>g.size>0||H.size>0,[g.size,H.size]),de=async()=>{var r,S;i("Fetching tags from API"),u(!0);try{const U=await xe();if(!U){i("No token available for fetching tags");return}const P=await(await fetch(ke,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${U}`},body:JSON.stringify({query:tr,variables:{fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(i("Tags API response:",P),P.errors){console.error("GraphQL errors:",P.errors),i(`GraphQL errors: ${JSON.stringify(P.errors)}`);return}const l=(((S=(r=P==null?void 0:P.data)==null?void 0:r.fetchRelations)==null?void 0:S.items)||[]).map(z=>{var K,j;return{id:z.id,tagTitle:z.tagTitle,TagType:z.TagType,points:z.points,createdAt:z.createdAt,updatedAt:z.updatedAt,subtags:((j=(K=z.subtags)==null?void 0:K.items)==null?void 0:j.map(X=>({id:X.id,tagTitle:X.tagTitle,subtagTitle:X.subtagTitle,TagType:X.TagType,points:X.points,createdAt:X.createdAt,updatedAt:X.updatedAt})))||[]}});i(`Fetched ${l.length} tags`),$(l)}catch(U){console.error("Error fetching tags:",U),i(`Error fetching tags: ${U}`)}finally{u(!1)}},I=f.useCallback(r=>{i(`Setting displayed tag: ${r}`),k(r)},[i]),b=f.useCallback(()=>{if(!m)return[];const r=h.find(S=>S.id===m);return(r==null?void 0:r.subtags)||[]},[m,h]),F=()=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(r){const S=Math.random()*16|0;return(r=="x"?S:S&3|8).toString(16)}),T=async(r,S)=>{if(i(`Adding new tag: ${r} of type: ${S}`),!r.trim())return i("Cannot add tag with empty title"),!1;p(!0);try{if(!await xe())return i("No token available for adding tag"),!1;if(await(async()=>(i("PLACEHOLDER: Would send GraphQL mutation to add tag",{mutation:sr,variables:{tagInput:{tagTitle:r.trim(),TagType:S,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(x=>setTimeout(x,500)),!0))()){const x={id:F(),tagTitle:r.trim(),TagType:S,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3),subtags:[]};return $(l=>[x,...l]),Te(x),I(x.id),le(""),se(!1),i(`Successfully added and applied new tag: ${r}`),!0}return!1}catch(U){return console.error("Error adding new tag:",U),i(`Error adding new tag: ${U}`),!1}finally{p(!1)}},N=async(r,S,U)=>{if(i(`Adding new subtag: ${S} to tag: ${r}`),!S.trim())return i("Cannot add subtag with empty title"),!1;if(!m)return i("No displayed tag for adding subtag"),!1;te(!0);try{if(!await xe())return i("No token available for adding subtag"),!1;if(await(async()=>(i("PLACEHOLDER: Would send GraphQL mutation to add subtag",{mutation:rr,variables:{subtagInput:{tagTitle:r,subtagTitle:S.trim(),TagType:U,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(l=>setTimeout(l,500)),!0))()){const l={id:F(),tagTitle:r,subtagTitle:S.trim(),TagType:U,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3)};return $(z=>z.map(K=>K.id===m?{...K,subtags:[l,...K.subtags||[]]}:K)),ye(l),d(""),s(!1),i(`Successfully added and applied new subtag: ${S}`),!0}return!1}catch(W){return console.error("Error adding new subtag:",W),i(`Error adding new subtag: ${W}`),!1}finally{te(!1)}},E=async r=>{i(`Deleting tag: ${r}`),q(r);try{if(!await xe())return i("No token available for deleting tag"),!1;if(await(async()=>(i("PLACEHOLDER: Would send GraphQL mutation to delete tag",{mutation:ir,variables:{tagId:r}}),await new Promise(P=>setTimeout(P,500)),!0))()){const P=h.find(x=>x.id===r);return $(x=>x.filter(l=>l.id!==r)),P&&(c(x=>{const l=new Map(x);return x.forEach((z,K)=>{const j=z.filter(X=>X.tagTitle!==P.tagTitle);l.set(K,j)}),l}),w(x=>{const l=new Map(x);return x.forEach((z,K)=>{const j=z.filter(X=>X.tagTitle!==P.tagTitle);l.set(K,j)}),l})),m===r&&I(null),i(`Successfully deleted tag: ${r}`),!0}return!1}catch(S){return console.error("Error deleting tag:",S),i(`Error deleting tag: ${S}`),!1}finally{q(null)}},G=async r=>{i(`Deleting subtag: ${r}`),L(r);try{if(!await xe())return i("No token available for deleting subtag"),!1;if(await(async()=>(i("PLACEHOLDER: Would send GraphQL mutation to delete subtag",{mutation:ar,variables:{subtagId:r}}),await new Promise(P=>setTimeout(P,500)),!0))()){let P=null;return $(x=>x.map(l=>{var K;const z=((K=l.subtags)==null?void 0:K.filter(j=>j.id===r?(P=j,!1):!0))||[];return{...l,subtags:z}})),P&&(c(x=>{const l=new Map(x);return x.forEach((z,K)=>{const j=z.map(X=>X.tagTitle===P.tagTitle?{...X,subtags:X.subtags.filter(pe=>pe.subtagTitle!==P.subtagTitle)}:X);l.set(K,j)}),l}),w(x=>{const l=new Map(x);return x.forEach((z,K)=>{const j=z.map(X=>X.tagTitle===P.tagTitle?{...X,subtags:X.subtags.filter(pe=>pe.subtagTitle!==P.subtagTitle)}:X);l.set(K,j)}),l})),i(`Successfully deleted subtag: ${r}`),!0}return!1}catch(S){return console.error("Error deleting subtag:",S),i(`Error deleting subtag: ${S}`),!1}finally{L(null)}},J=()=>{se(!0),le("")},V=()=>{se(!1),le("")},B=()=>{s(!0),d("")},oe=()=>{s(!1),d("")},ie=async()=>ae.trim()?await T(ae,"File"):!1,ge=async()=>{if(M.trim()&&m){const r=h.find(S=>S.id===m);if(r)return await N(r.tagTitle,M,r.TagType)}return!1};return f.useEffect(()=>{de()},[]),f.useEffect(()=>{if(i(`Selection changed - Photos: ${g.size}, Existing: ${H.size}`),m){const r=h.find(S=>S.id===m);r&&!re(r)&&(i(`Clearing displayed tag "${r.tagTitle}" because it's no longer applied to all selected files`),k(null))}},[g.size,H.size,m,h,re,i]),f.useEffect(()=>{if(m){const r=h.find(S=>S.id===m);r&&!re(r)&&(i(`Clearing displayed tag "${r.tagTitle}" due to tag map changes`),k(null))}},[t,n,m,h,re,i]),{tags:h,displayedTagId:m,isLoadingTags:_,tagIdBeingDeleted:o,subtagIdBeingDeleted:R,isAddingNewTag:ne,isAddingNewSubtag:ce,newTagTitle:ae,newSubtagTitle:M,isSubmittingNewTag:ee,isSubmittingNewSubtag:Y,fetchTags:de,toggleTagOnSelectedFiles:Te,toggleSubtagOnSelectedFiles:ye,setDisplayedTag:I,isTagAppliedToSelected:re,isSubtagAppliedToSelected:ue,getDisplayedTagSubtags:b,getAppliedTagsForSelected:he,hasSelectedFiles:Ae,addNewTag:T,addNewSubtag:N,deleteTag:E,deleteSubtag:G,startAddingNewTag:J,cancelAddingNewTag:V,startAddingNewSubtag:B,cancelAddingNewSubtag:oe,submitNewTag:ie,submitNewSubtag:ge,setNewTagTitle:le,setNewSubtagTitle:d}},nr=({children:t,t:c,isRTL:n})=>e.jsxs("div",{style:{padding:"32px",marginBottom:"32px",backgroundColor:"#f8f9fa",border:"2px solid #e9ecef",borderRadius:"12px",direction:n?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",fontSize:"18px",color:"#495057",fontWeight:"600",marginBottom:"24px",flexDirection:n?"row-reverse":"row"},children:[e.jsx("span",{style:{marginRight:n?"0":"12px",marginLeft:n?"12px":"0",fontSize:"20px"},children:"🏷️"}),c("Select files to start tagging")]}),t]}),lr=({selectedPhotos:t,selectedPhotoIndices:c,onToggleSelection:n,onSelectAll:w,onDeselectAll:g,onRemovePhoto:H,onDeleteAll:i,disabled:h,photoTagsMap:$,t:m,isRTL:k})=>t.length===0?null:e.jsxs("div",{style:{marginBottom:"32px",direction:k?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px",flexDirection:k?"row-reverse":"row"},children:[e.jsxs("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:[m("New Files")," (",t.length,")"]}),e.jsxs("div",{style:{display:"flex",gap:"8px",flexDirection:k?"row-reverse":"row"},children:[e.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:h?"#f8f9fa":"#fff",color:h?"#999":"#333",cursor:h?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:c.size>0?g:w,disabled:h,onMouseEnter:_=>{h||(_.currentTarget.style.backgroundColor="#f8f9fa")},onMouseLeave:_=>{h||(_.currentTarget.style.backgroundColor="#fff")},children:c.size>0?m("Done Tagging Selected"):m("Select All")}),c.size===0&&e.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #dc3545",borderRadius:"4px",backgroundColor:h?"#f8f9fa":"#fff",color:h?"#999":"#dc3545",cursor:h?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:i,disabled:h,onMouseEnter:_=>{h||(_.currentTarget.style.backgroundColor="#dc3545",_.currentTarget.style.color="#fff")},onMouseLeave:_=>{h||(_.currentTarget.style.backgroundColor="#fff",_.currentTarget.style.color="#dc3545")},children:m("Delete All")})]})]}),e.jsx(Zs,{selectedPhotos:t,selectedPhotoIndices:c,isSavingAlbum:h,onRemovePhoto:H,onTogglePhotoSelection:n,onSelectAllPhotos:w,onDeselectAllPhotos:g,hideHeader:!0,photoTagsMap:$})]}),dr=({existingFiles:t,selectedExistingIndices:c,onToggleSelection:n,onSelectAll:w,onDeselectAll:g,onDeleteFile:H,disabled:i,isCreator:h,participantsCanDeleteItems:$,existingFileTagsMap:m,t:k,isRTL:_})=>t.length===0?null:e.jsxs("div",{style:{marginBottom:"32px",direction:_?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px",flexDirection:_?"row-reverse":"row"},children:[e.jsx("div",{children:e.jsxs("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:[k("Existing Files")," (",t.length,")"]})}),e.jsx("div",{style:{display:"flex",gap:"8px",flexDirection:_?"row-reverse":"row"},children:e.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:i?"#f8f9fa":"#fff",color:i?"#999":"#333",cursor:i?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:c.size>0?g:w,disabled:i,onMouseEnter:u=>{i||(u.currentTarget.style.backgroundColor="#f8f9fa")},onMouseLeave:u=>{i||(u.currentTarget.style.backgroundColor="#fff")},children:c.size>0?k("Done Tagging Selected"):k("Select All")})})]}),e.jsx("div",{style:{display:"flex",overflowX:"auto",gap:"16px",padding:"20px",border:"2px dashed #007bff",borderRadius:"12px",backgroundColor:"#fff",boxShadow:"0 2px 8px rgba(0, 0, 0, 0.04)",scrollbarWidth:"thin",scrollbarColor:"#007bff #f8f9fa"},children:t.map((u,o)=>{const q=c.has(o),R=m.get(o)||[];return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"8px",minWidth:"160px"},children:[e.jsxs("div",{style:{position:"relative",width:"160px",height:"160px",flexShrink:0,borderRadius:"12px",overflow:"hidden",border:q?"2px solid rgba(0, 123, 255, 0.6)":"2px solid #ddd",cursor:i?"not-allowed":"pointer",opacity:i?.6:1,transition:"all 0.3s ease",boxShadow:q?"0 0 0 3px rgba(0, 123, 255, 0.3), 0 4px 12px rgba(0, 123, 255, 0.15)":"0 2px 8px rgba(0, 0, 0, 0.04)",transform:q?"translateY(-2px)":"translateY(0)"},onClick:()=>!i&&n(o),children:[e.jsx(ys,{thumbnailDataKey:u.thumbnailDataKey,dataKey:u.dataKey,alt:k("Existing file"),style:{width:"100%",height:"100%",objectFit:"cover"}}),q&&!i&&(h===!0||$)&&e.jsx("button",{onClick:L=>{L.stopPropagation(),confirm(k("Are you sure you want to remove this file?"))&&H(o)},style:{position:"absolute",top:"6px",right:"6px",width:"18px",height:"18px",borderRadius:"50%",border:"none",backgroundColor:"rgba(220, 53, 69, 0.8)",color:"white",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:"bold",zIndex:15,opacity:1,transition:"all 0.2s ease",transform:"scale(0.8)"},onMouseEnter:L=>{L.currentTarget.style.backgroundColor="rgba(200, 35, 51, 0.9)",L.currentTarget.style.transform="scale(1)",L.currentTarget.style.opacity="1"},onMouseLeave:L=>{L.currentTarget.style.backgroundColor="rgba(220, 53, 69, 0.8)",L.currentTarget.style.transform="scale(0.8)",L.currentTarget.style.opacity="0"},title:k("Remove file"),children:"×"}),u.dataInBytes>0&&e.jsxs("div",{style:{position:"absolute",bottom:"4px",left:"4px",backgroundColor:"rgba(0,0,0,0.7)",color:"white",fontSize:"10px",padding:"2px 4px",borderRadius:"4px"},children:[(u.dataInBytes/(1024*1024)).toFixed(1),k("MB")]}),u.durationInSeconds&&e.jsxs("div",{style:{position:"absolute",bottom:"4px",right:"4px",backgroundColor:"rgba(0,0,0,0.7)",color:"white",fontSize:"10px",padding:"2px 4px",borderRadius:"4px"},children:[Math.floor(u.durationInSeconds/60),":",String(Math.floor(u.durationInSeconds%60)).padStart(2,"0")]})]}),e.jsxs("div",{style:{minHeight:"60px",display:"flex",flexDirection:"column",gap:"4px"},children:[u.fileName&&e.jsx("div",{style:{fontSize:"11px",fontWeight:"600",color:"#333",padding:"4px 8px",backgroundColor:q?"#e3f2fd":"#f8f9fa",borderRadius:"4px",border:`1px solid ${q?"#90caf9":"#e9ecef"}`,textAlign:"center",wordBreak:"break-word",lineHeight:"1.2",transition:"all 0.2s ease"},children:u.fileName}),e.jsx("div",{style:{minHeight:"32px"},children:R.length>0?e.jsx(ft,{photoTags:R,isSelected:q,onToggleSelection:()=>!i&&n(o)}):e.jsx("div",{style:{fontSize:"10px",color:"#6c757d",fontStyle:"italic",textAlign:"center",padding:"6px 8px",backgroundColor:"rgba(108, 117, 125, 0.1)",borderRadius:"4px",border:"1px solid rgba(108, 117, 125, 0.2)"},children:k("No tags applied")})})]})]},`existing-${o}-${u.dataKey}`)})})]}),cr=()=>{const{t,language:c}=be(),n=Be(c)==="rtl",w=gs(t),{setShowUsernamePrompt:g,setUsernameInput:H}=w,[i,h]=f.useState(null),[$,m]=f.useState(!1),[k,_]=f.useState(0),[u,o]=f.useState(""),[q,R]=f.useState(""),[L,ne]=f.useState(!1),[se,ce]=f.useState(!1),[s,ae]=f.useState("NoPassword"),[le,M]=f.useState(""),[d,ee]=f.useState(!1),[p,Y]=f.useState(!0),[te,O]=f.useState(!1),[re,ue]=f.useState(null),[Te,ye]=f.useState(!1),[he,Ae]=f.useState([]),[de,I]=f.useState(!1),[b,F]=f.useState(!1),[T,N]=f.useState(new Set),[E,G]=f.useState(new Map),[J,V]=f.useState([]),[B,oe]=f.useState(new Set),[ie,ge]=f.useState(new Map),[r,S]=f.useState(!1),U=a=>{!i&&a&&h(a)},{fileInputRef:W,selectedPhotos:P,setSelectedPhotos:x,isUploading:l,progressTracker:z,setProgressTracker:K,debugMessages:j,currentFolderId:X,openFilePicker:pe,handleFileSelection:$e,setOnSaveAlbumPage:Ne,log:ze}=xs(U,!0);f.useEffect(()=>(Ne(!0),v("🏠 Set isOnSaveAlbumPage to true - navigation disabled"),()=>{Ne(!1),v("🏠 Set isOnSaveAlbumPage to false - navigation enabled")}),[Ne]),f.useEffect(()=>{(async()=>{try{await Vt(),ze("🔥 Save-album page S3 credentials prewarmed successfully")}catch(A){ze(`⚠️ Save-album page credential prewarming failed: ${String(A)}`)}})()},[]);const v=(a,A)=>{let C=`[${new Date().toISOString()}] ${a}`;if(A!==void 0)try{const Q=typeof A=="object"?JSON.stringify(A,null,2):String(A);C+=`
Data: ${Q}`,console.log(C),console.log("Data object:",A)}catch(Q){C+=` [Error stringifying data: ${Q}]`,console.log(C),console.log("Raw data:",A)}else console.log(C);ze(C)},gt=async a=>{var A,D,C;if(a){S(!0),v(`Fetching existing album data for folder ID: ${a}`);try{const Q=await xe();if(!Q){v("❌ Authentication failed while fetching existing album data");return}const fe=`
        mutation FetchRelations($fetchRelationsInput: FetchRelationsInput!) {
          fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
            items {
              ... on FolderPosition {
                ${bs}
              }
            }
          }
        }
      `,Mt={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}},Pe=await(await fetch(ke,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${Q}`},body:JSON.stringify({query:fe,variables:Mt})})).json();if(Pe.errors){console.error("GraphQL errors:",Pe.errors),v(`❌ Failed to fetch existing album data: ${JSON.stringify(Pe.errors)}`);return}const He=(((D=(A=Pe==null?void 0:Pe.data)==null?void 0:A.fetchRelations)==null?void 0:D.items)||[]).find(Se=>Se&&Se.folder&&Se.folder.id===a);if(!He)return;const Ie=He.folder,Bt=((C=Ie==null?void 0:Ie.fileReferencesPage)==null?void 0:C.items)||[],Fe=[],Me=new Map;Bt.forEach((Se,qe)=>{const ve=Se.file;if(ve&&ve.dataKey){let De=Se.fileDisplayName;if(!De&&ve.dataKey){const je=ve.dataKey.split("/");De=je[je.length-1],v(`Using dataKey fallback filename for existing file: ${De}`)}Fe.push({dataKey:ve.dataKey,thumbnailDataKey:ve.thumbnailDataKey||null,durationInSeconds:ve.durationInSeconds||null,dataInBytes:ve.dataInBytes||0,fileName:De||null});const Ge=Se.selectedTags||[];if(Ge.length>0){const je=Ge.map(Ce=>{var Je;return{tagTitle:Ce.tagTitle,TagType:Ce.TagType,subtags:((Je=Ce.subtags)==null?void 0:Je.map(Qe=>({tagTitle:Qe.tagTitle,subtagTitle:Qe.subtagTitle})))||[]}});Me.set(qe,je),v(`Existing file ${qe} (${De||"unnamed"}) has ${je.length} tags applied:`,je.map(Ce=>Ce.tagTitle))}}}),V(Fe),ge(Me),v(`✅ Successfully loaded ${Fe.length} existing files with ${Me.size} files having existing tags and ${Fe.filter(Se=>Se.fileName).length} files with names (including fallback from dataKey)`),!u&&Ie.folderName&&o(Ie.folderName),!q&&Ie.folderDescription&&R(Ie.folderDescription)}catch(Q){console.error("Failed to fetch existing album data:",Q),v(`❌ Failed to fetch existing album data: ${String(Q)}`)}finally{S(!1)}}};f.useEffect(()=>{const A=new URLSearchParams(window.location.search).get("folderId");if(A){v(`Found folderId query parameter: ${A} - loading existing album`),I(!0),h(A),ye(!1),localStorage.removeItem(me.SUB_ALBUM_DATA),v("Cleared sub-album data from localStorage - loading existing album from query parameter");const D=localStorage.getItem(me.SELECTED_PHOTOS);if(!D)v("No stored photos found - proceeding with existing album load");else try{const C=JSON.parse(D);Array.isArray(C)&&C.length>0?v(`Found ${C.length} stored photos - these may be newly uploaded for this album, preserving them`):(localStorage.removeItem(me.SELECTED_PHOTOS),v("Cleared empty photos array from localStorage"))}catch(C){v(`Error parsing stored photos: ${C}`),localStorage.removeItem(me.SELECTED_PHOTOS)}ne(!0),ue(!0)}else v("No folderId query parameter found, will proceed with normal initialization"),I(!1)},[]);const{cognitoUsername:We,publicUsername:Re,setPublicUsername:mt}=Us(de?()=>{}:h,x,de?()=>{}:ue,de?()=>{}:ne,o,R,ee,Y,ae,M,de?()=>{}:ye,de?()=>{}:Ae,O,v);f.useEffect(()=>{i&&(v(`Loading existing files for folder ID: ${i}`),gt(i))},[i]);const xt=or(E,G,ie,ge,T,B,v),{saveAlbumDirectly:Ke}=Ws(i||X,We,P,Te,he,u,q,d,p,te,s,le,E,ie,J,B,m,_,x,K,v,t);f.useEffect(()=>{X&&!i&&(h(X),v(`Updated folder ID from upload processor: ${X}`))},[X,i]),f.useEffect(()=>{N(a=>{const A=new Set;return a.forEach(D=>{D<P.length&&A.add(D)}),A}),G(a=>{const A=new Map(a),D=[];return a.forEach((C,Q)=>{Q>=P.length&&D.push(Q)}),D.forEach(C=>{A.delete(C)}),A})},[P.length]),f.useEffect(()=>{oe(a=>{const A=new Set;return a.forEach(D=>{D<J.length&&A.add(D)}),A}),ge(a=>{const A=new Map(a),D=[];return a.forEach((C,Q)=>{Q>=J.length&&D.push(Q)}),D.forEach(C=>{A.delete(C)}),A})},[J.length]);const ht=a=>{v(`Removing photo at index: ${a}`);const A=P.filter((D,C)=>C!==a);x(A),v(`New files count: ${A.length}`),A.length>0?(localStorage.setItem(me.SELECTED_PHOTOS,JSON.stringify(A)),v(`Updated localStorage with ${A.length} photos`)):(localStorage.removeItem(me.SELECTED_PHOTOS),v("Removed photos from localStorage")),N(D=>{const C=new Set;return D.forEach(Q=>{Q<a?C.add(Q):Q>a&&C.add(Q-1)}),C}),G(D=>{const C=new Map;return D.forEach((Q,fe)=>{fe<a?C.set(fe,Q):fe>a&&C.set(fe-1,Q)}),C})},bt=a=>{v(`Removing existing file at index: ${a}`);const A=J.filter((D,C)=>C!==a);V(A),v(`New existing files count: ${A.length}`),oe(D=>{const C=new Set;return D.forEach(Q=>{Q<a?C.add(Q):Q>a&&C.add(Q-1)}),C}),ge(D=>{const C=new Map;return D.forEach((Q,fe)=>{fe<a?C.set(fe,Q):fe>a&&C.set(fe-1,Q)}),C})},yt=a=>{v(`Toggling selection for existing file at index: ${a}`),oe(A=>{const D=new Set(A);return D.has(a)?(D.delete(a),v(`Deselected existing file ${a} - remaining selected: ${D.size}`)):(D.add(a),v(`Selected existing file ${a} - total selected: ${D.size}`)),D})},wt=()=>{v(`Selecting all ${J.length} existing files`);const a=new Set;for(let A=0;A<J.length;A++)a.add(A);oe(a),v(`Selected all existing files - total: ${a.size}`)},Tt=()=>{v("Deselecting all existing files"),oe(new Set)},$t=a=>{v(`Toggling selection for photo at index: ${a}`),N(A=>{const D=new Set(A);return D.has(a)?(D.delete(a),v(`Deselected photo ${a} - remaining selected: ${D.size}`)):(D.add(a),v(`Selected photo ${a} - total selected: ${D.size}`)),D})},St=()=>{v(`Selecting all ${P.length} photos`);const a=new Set;for(let A=0;A<P.length;A++)a.add(A);N(a),v(`Selected all photos - total: ${a.size}`)},vt=()=>{v("Deselecting all photos"),N(new Set)},It=()=>{confirm(t("Are you sure you want to delete all new files? This action cannot be undone."))&&(v("Deleting all new photos"),x([]),N(new Set),G(new Map),localStorage.removeItem(me.SELECTED_PHOTOS),v("Cleared all photos from localStorage"))};f.useEffect(()=>{v("Selection state changed:",{selectedPhotos:Array.from(T),selectedExistingFiles:Array.from(B),totalSelected:T.size+B.size})},[T,B,v]);const At=()=>{const a=!d;v(`Toggling isOnPublicProfile to: ${a}`),ee(a)},Pt=()=>{const a=!p;v(`Toggling participantsCanAddItems to: ${a}`),Y(a)},jt=()=>{const a=!te;v(`Toggling participantsCanDeleteItems to: ${a}`),O(a)},kt=async()=>{v("Album save initiated"),v("Photo tags applied:",Object.fromEntries(E)),v("Existing file tags applied:",Object.fromEntries(ie)),F(!1),m(!0);try{if(Re!=null&&Re.startsWith("Profile-")){v("Public username starts with 'Profile-', showing username prompt"),H(""),g(!0),m(!1);return}v("Valid username found, proceeding to save album directly with file-level tagging"),Ke()}catch(a){console.error("Error in handleSaveAlbum:",a),v(`Error in handleSaveAlbum: ${a}`),m(!1)}},Dt=a=>{v(`Handling successful username update to: ${a}`),localStorage.setItem(me.PUBLIC_USERNAME,a),mt(a),g(!1),v("Proceeding to save album after username update"),Ke()},Ct=(a,A)=>{v(`Password dialog closed with option: ${a}, password: ${A?"******":"undefined"}`),a&&ae(a),A!==void 0&&M(A),ce(!1)},Et=()=>{v("Opening password dialog"),ce(!0)},Ft=()=>{v("Add photos button clicked"),pe(i)},_t=()=>{F(!b)},Ee=a=>{a(),F(!1)};f.useEffect(()=>{const a=A=>{const D=A.target;b&&!D.closest(".settings-dropdown-container")&&F(!1)};return b&&document.addEventListener("mousedown",a),()=>{document.removeEventListener("mousedown",a)}},[b]);const Oe=$||l||r,Nt=P.length>0||J.length>0,zt=T.size>0||B.size>0,Rt=we.useMemo(()=>{const a=T.size+B.size;return v(`Total selected files count updated: ${a}`),a},[T.size,B.size,v]),Ot=we.useMemo(()=>{const a=Array.from(E.entries()).map(([D,C])=>`${D}:${C.map(Q=>`${Q.tagTitle}(${Q.subtags.map(fe=>fe.subtagTitle).join(",")})`).join("|")}`).join(";"),A=Array.from(ie.entries()).map(([D,C])=>`${D}:${C.map(Q=>`${Q.tagTitle}(${Q.subtags.map(fe=>fe.subtagTitle).join(",")})`).join("|")}`).join(";");return`${a}||${A}`},[E,ie]);return e.jsxs(e.Fragment,{children:[e.jsx(ns,{}),e.jsx(ls,{children:e.jsxs(ds,{children:[e.jsx(cs,{href:"my-albums.html",children:t("My Albums")}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[re===!0&&e.jsxs("div",{className:"settings-dropdown-container",style:{position:"relative",display:"flex",alignItems:"center"},children:[e.jsx("button",{onClick:_t,disabled:$||l||r,style:{background:"none",border:"none",cursor:$||l||r?"not-allowed":"pointer",padding:"8px",borderRadius:"4px",display:"flex",alignItems:"center",justifyContent:"center",color:$||l||r?"#ccc":"#666",fontSize:"18px",transition:"all 0.2s ease",backgroundColor:b?"#f0f0f0":"transparent",opacity:$||l||r?.5:1},onMouseEnter:a=>{!b&&!$&&!l&&!r&&(a.currentTarget.style.backgroundColor="#f8f9fa")},onMouseLeave:a=>{!b&&!$&&!l&&!r&&(a.currentTarget.style.backgroundColor="transparent")},title:t("Album Settings"),children:"⚙️"}),b&&!$&&!l&&!r&&e.jsxs(us,{children:[e.jsx(_e,{onClick:()=>Ee(At),children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[e.jsx("span",{children:t(d?"Remove From Public Profile":"Add To Public Profile")}),e.jsx("span",{style:{fontSize:"12px",color:d?"#28a745":"#6c757d",fontWeight:"bold"},children:d?"✓":"○"})]})}),e.jsx(_e,{onClick:()=>Ee(Pt),children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[e.jsx("span",{children:t(p?"Allow Additions":"Do Not Allow Additions")}),e.jsx("span",{style:{fontSize:"12px",color:p?"#28a745":"#6c757d",fontWeight:"bold"},children:p?"✓":"○"})]})}),e.jsx(_e,{onClick:()=>Ee(jt),children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[e.jsx("span",{children:t(te?"Allow Removals":"Do Not Allow Removals")}),e.jsx("span",{style:{fontSize:"12px",color:te?"#28a745":"#6c757d",fontWeight:"bold"},children:te?"✓":"○"})]})}),e.jsx(_e,{onClick:()=>Ee(Et),children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[e.jsx("span",{children:t("Album Password Policy")}),e.jsx("span",{style:{fontSize:"12px",color:s!=="NoPassword"?"#28a745":"#6c757d",fontWeight:"bold"},children:s!=="NoPassword"?"✓":"○"})]})})]})]}),e.jsx(Ze,{$primary:!0,onClick:kt,disabled:$||l||r,style:{minWidth:"120px",fontSize:"14px",padding:"8px 16px"},children:t($?"Saving...":"Save Album")})]})]})}),e.jsxs(ps,{$isRTL:n,children:[e.jsx("div",{style:{marginTop:L&&re===!0?"3px":"0"},children:e.jsx(er,{showFolderDetails:L,isCreator:re,folderName:u,setFolderName:o,folderDescription:q,setFolderDescription:R,isSavingAlbum:$||l})}),(l||z.totalFiles>0&&(z.filesUploading>0||z.filesProcessing>0||z.filesComplete<z.totalFiles))&&e.jsx(hs,{progressTracker:z,isRTL:Be(c)==="rtl",variant:"detailed",context:"saving",isUploading:l,showSuccessMessage:!1,showErrorMessage:!0,customMessages:{error:t("Some photos could not be processed. You can continue with the successfully processed photos.")}}),r&&e.jsx("div",{style:{padding:"16px",marginBottom:"16px",backgroundColor:"#f8f9fa",border:"1px solid #dee2e6",borderRadius:"8px",color:"#6c757d",textAlign:"center",fontStyle:"italic"},children:t("Loading existing files...")}),e.jsx("input",{ref:W,id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:a=>$e(a,We),style:{display:"none"}}),L&&re===!0&&Nt&&e.jsxs(nr,{t,isRTL:n,children:[J.length>0&&e.jsx("div",{style:{marginBottom:"32px"},children:e.jsx(dr,{existingFiles:J,selectedExistingIndices:B,onToggleSelection:yt,onSelectAll:wt,onDeselectAll:Tt,onDeleteFile:bt,disabled:Oe,isCreator:re,participantsCanDeleteItems:te,existingFileTagsMap:ie,t,isRTL:n})}),e.jsx(lr,{selectedPhotos:P,selectedPhotoIndices:T,onToggleSelection:$t,onSelectAll:St,onDeselectAll:vt,onRemovePhoto:ht,onDeleteAll:It,disabled:Oe,photoTagsMap:E,t,isRTL:n}),e.jsx("div",{style:{marginTop:zt?"32px":"16px"},children:e.jsx(Ys,{tagsManager:xt,disabled:Oe,enhancedLog:v},`tags-${Rt}-${Ot.slice(0,20)}`)})]}),e.jsx(Ls,{isSavingAlbum:$,savingProgress:k}),e.jsx(fs,{children:e.jsx(Ze,{onClick:Ft,disabled:$||l||r,children:t(l?"Uploading...":"Add More Photos")})}),e.jsx(ms,{t,language:c,usernameManager:w,onSuccess:Dt}),e.jsx(Os,{isOpen:se,onClose:Ct,initialOption:s,initialPassword:le}),e.jsx(Ms,{debugMessages:j,t,isRTL:n,textDirection:n?"rtl":"ltr"})]})]})},ur=()=>e.jsx(Qt,{children:e.jsx(cr,{})});Jt.createRoot(document.getElementById("root")).render(e.jsx(ur,{}));
