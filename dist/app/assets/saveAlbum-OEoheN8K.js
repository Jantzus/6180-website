import{d as Z,u as be,a as g,j as e,g as Me,h as xe,L as ge,i as Qe,s as Bt,m as Ut,f as je,k as Wt,l as Kt,n as Ht,r as Gt,o as we,R as qt,I as Jt,p as Qt}from"./utils-DjWiEyfK.js";import{C as Be,F as Ve,e as Ye,f as Vt,g as Yt,P as Xt,h as Zt,i as st,j as rt,k as Lt,l as es,S as ts,m as ss,V as rs,n as is,M as as,G as os,o as ns,p as ls,q as cs,D as ds,r as De,B as Xe,s as us,t as ps}from"./styled-components-DpOphtm_.js";import{u as fs,U as gs}from"./useUsernameManagement-clryAvQ9.js";import{u as ms,U as xs}from"./useFileUploadProcessor-BGoWtmEk.js";import{F as hs}from"./types-B2_92tNb.js";import{L as bs}from"./LazyImage-D9153Z1J.js";const w={colors:{primary:"#007bff",primaryDark:"#0056b3",secondary:"#6c757d",success:"#4caf50",danger:"#e53935",warning:"#ff9800",white:"#fff",text:{primary:"#333",secondary:"#666",light:"#777"},background:{primary:"#f9fafb",highlight:"#f0f7ff"},border:"#ddd"},spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px"},borderRadius:{small:"4px",medium:"8px"},boxShadow:{lg:"0 4px 10px rgba(0,0,0,0.08)"}},ys=Z.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10000;
`,ws=Z.div`
  background-color: ${w.colors.white};
  border-radius: ${w.borderRadius.medium};
  box-shadow: ${w.boxShadow.lg};
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
  scrollbar-color: ${w.colors.border} transparent;
  
  /* Custom scrollbar for webkit browsers */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${w.colors.border};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${w.colors.secondary};
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
    border-radius: ${w.borderRadius.small};
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
`,Ts=Z.div`
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
`,$s=Z.h3`
  font-size: 24px;
  font-weight: 600;
  color: ${w.colors.text.primary};
  margin: 0 0 ${w.spacing.lg} 0;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 22px;
    margin: 0 0 ${w.spacing.md} 0;
  }
  
  @media (max-height: 700px) {
    font-size: 20px;
    margin: 0 0 ${w.spacing.md} 0;
  }
  
  @media (max-width: 480px) {
    font-size: 18px;
  }
`,vs=Z.p`
  margin-bottom: ${w.spacing.lg};
  font-size: 16px;
  color: ${w.colors.text.secondary};
  line-height: 1.5;
  
  @media (max-width: 768px) {
    margin-bottom: ${w.spacing.md};
    font-size: 15px;
  }
  
  @media (max-height: 700px) {
    margin-bottom: ${w.spacing.sm};
    font-size: 14px;
  }
`,Ze=Z.div`
  margin-bottom: ${w.spacing.lg};
`,Le=Z.label`
  display: block;
  margin-bottom: ${w.spacing.sm};
  font-size: 14px;
  font-weight: 500;
  color: ${w.colors.text.primary};
`,Is=Z.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${w.colors.border};
  border-radius: ${w.borderRadius.small};
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${w.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  &::placeholder {
    color: ${w.colors.text.light};
  }
`,As=Z.div`
  display: flex;
  flex-direction: column;
  gap: ${w.spacing.md};
  margin-bottom: ${w.spacing.xl};
`,Ps=Z.div`
  border: 2px solid ${t=>t.$isSelected?w.colors.primary:w.colors.border};
  border-radius: ${w.borderRadius.medium};
  padding: ${w.spacing.lg};
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${t=>t.$isSelected?w.colors.background.highlight:w.colors.white};
  display: flex;
  align-items: center;
  gap: ${w.spacing.lg};
  
  @media (max-width: 768px) {
    padding: ${w.spacing.md};
    gap: ${w.spacing.md};
  }
  
  @media (max-width: 480px) {
    padding: ${w.spacing.sm};
    gap: ${w.spacing.sm};
  }
  
  @media (max-height: 700px) {
    padding: ${w.spacing.sm};
    gap: ${w.spacing.sm};
  }
`,js=Z.div`
  flex: 1;
`,ks=Z.div`
  margin-bottom: ${w.spacing.xs};
`,Cs=Z.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${w.colors.primary};
  flex-shrink: 0;
`,Ds=Z.label`
  font-size: 16px;
  font-weight: 500;
  color: ${w.colors.text.primary};
  cursor: pointer;
  display: block;
`,Es=Z.div`
  font-size: 14px;
  color: ${w.colors.text.secondary};
  margin-top: ${w.spacing.xs};
`,Fs=Z.div`
  color: ${w.colors.warning};
  font-size: 12px;
  font-style: italic;
  margin-top: ${w.spacing.xs};
  font-weight: 500;
`,_s=Z.div`
  display: flex;
  gap: ${w.spacing.sm};
  justify-content: center;
  margin-top: ${w.spacing.xl};
`,et=Z.button`
  background-color: ${t=>t.$variant==="danger"?w.colors.danger:t.$variant==="secondary"?"transparent":t.$variant==="success"?w.colors.success:w.colors.primary};
  color: ${t=>t.$variant==="secondary"?w.colors.primary:w.colors.white};
  border: ${t=>t.$variant==="secondary"?`1px solid ${w.colors.primary}`:"none"};
  padding: ${t=>t.$size==="small"?"8px 16px":t.$size==="large"?"16px 32px":"12px 24px"};
  border-radius: ${w.borderRadius.medium};
  cursor: ${t=>t.disabled?"not-allowed":"pointer"};
  font-size: ${t=>t.$size==="small"?"14px":t.$size==="large"?"18px":"16px"};
  font-weight: 500;
  transition: all 0.2s ease;
  opacity: ${t=>t.disabled?.6:1};
  min-width: 100px;

  &:hover:not(:disabled) {
    background-color: ${t=>t.$variant==="danger"?"#c62828":t.$variant==="secondary"?w.colors.background.highlight:t.$variant==="success"?"#388e3c":w.colors.primaryDark};
  }
`,Ns=Z.div`
  background-color: ${w.colors.background.primary};
  border-radius: ${w.borderRadius.medium};
  padding: ${w.spacing.md};
  margin: ${w.spacing.md} 0;
  border-left: 4px solid ${w.colors.primary};
  font-size: 14px;
  color: ${w.colors.text.secondary};
  line-height: 1.4;
  
  @media (max-width: 768px) {
    padding: ${w.spacing.sm};
    margin: ${w.spacing.sm} 0;
    font-size: 13px;
  }
  
  @media (max-height: 700px) {
    padding: ${w.spacing.xs};
    font-size: 12px;
  }
`,zs=[{value:"NotVisible",titleKey:"Password Required To See Or Save",descriptionKey:"Album will be completely hidden until correct password is entered"},{value:"Watermark",titleKey:"Watermarked And No Saving Without Password",descriptionKey:"Photos will be visible with watermarks, password required to save"},{value:"CannotBeSaved",titleKey:"Password Required To Save",descriptionKey:"Photos are visible but password required to download or save"},{value:"NoPassword",titleKey:"No Password",descriptionKey:"Album is fully public with no restrictions"}],Rs=({isOpen:t,onClose:f,initialOption:o="NoPassword",initialPassword:u=""})=>{const{t:b,language:K}=be(),r=Me(K)==="rtl",[d,A]=g.useState(o),[m,N]=g.useState(u);if(g.useEffect(()=>{t&&(A(o),N(u))},[t,o,u]),!t)return null;const U=m.trim()==="",x=R=>{A(R)},n=R=>{R.target===R.currentTarget&&f()},J=R=>R!=="NoPassword";return e.jsxs(e.Fragment,{children:[e.jsx(ys,{onClick:n}),e.jsx(ws,{children:e.jsx(Ts,{children:e.jsxs(Ss,{$isRTL:r,children:[e.jsx($s,{children:b("Album Password Policy")}),e.jsx(vs,{children:b("Configure password protection for your album. Choose how you want to restrict access to your photos.")}),e.jsxs(Ze,{children:[e.jsx(Le,{children:b("Enter Password")}),e.jsx(Is,{type:"text",placeholder:b("Enter password (optional)"),value:m,onChange:R=>N(R.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"})]}),e.jsxs(Ze,{children:[e.jsx(Le,{children:b("Select Protection Level")}),e.jsx(As,{children:zs.map(R=>e.jsxs(Ps,{$isSelected:d===R.value,onClick:()=>x(R.value),children:[e.jsx(Cs,{type:"radio",name:"protection",checked:d===R.value,onChange:()=>x(R.value)}),e.jsxs(js,{children:[e.jsx(ks,{children:e.jsx(Ds,{children:b(R.titleKey)})}),e.jsx(Es,{children:b(R.descriptionKey)}),U&&J(R.value)&&d===R.value&&e.jsx(Fs,{children:b('⚠️ Will use "password" as default if left empty')})]})]},R.value))})]}),J(d)&&e.jsxs(Ns,{children:[e.jsx("strong",{children:b("💡 Password Protection Info:")}),e.jsx("br",{}),b('If you leave the password field empty, "password" will be used as the default password. You can change this anytime in album settings.')]}),e.jsxs(_s,{children:[e.jsx(et,{$variant:"secondary",onClick:()=>f(),children:b("Cancel")}),e.jsx(et,{$variant:"primary",onClick:()=>{const R=U&&J(d)?"password":m;console.log(`Saving with option: ${d}, password: ${R.length>0?"********":"none"}`),f(d,R)},children:b("Save")})]})]})})})]})},Os=({debugMessages:t,t:f,isRTL:o,textDirection:u})=>t.length===0?null:e.jsxs("div",{style:{marginTop:"40px",background:"#fff3cd",padding:"16px",borderRadius:"8px",border:"1px solid #ffeeba",maxWidth:900,margin:"0 auto",direction:u},children:[e.jsx("h3",{style:{marginTop:0,fontSize:"18px",color:"#856404",textAlign:o?"right":"left"},children:f("Debug Log")}),e.jsx("pre",{style:{fontSize:"14px",color:"#856404",whiteSpace:"pre-wrap",maxHeight:"400px",overflow:"auto",textAlign:o?"right":"left"},children:t.map((b,K)=>e.jsx("div",{style:{marginBottom:"8px"},children:b},K))})]}),Ms=`
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
`,Bs=(t,f,o,u,b,K,r,d,A,m,N,U,x,n)=>{const[J,R]=g.useState(null),[L,ae]=g.useState(null),se=async O=>{n(`Initializing folder ID with username: ${O}`);try{const ee=new URLSearchParams(window.location.search).get("folderId");if(n(`Folder ID from URL: ${ee||"null"}`),ee){t(ee),n(`Using existing folder ID: ${ee}`);try{n(`Fetching details for folder: ${ee}`);const p=await de(ee,n);if(n("Folder details retrieved:",p),p){const Q=`${O}_____${O}____Account`,te=p.creatorId===Q;if(n(`User is creator of folder: ${te}, accountId: ${Q}, creator: ${p.creatorId}`),o(te),te){n("User is creator, showing folder details"),u(!0),b(p.folderName),K(p.folderDescription),r(p.isOnPublicProfile),n(`Setting isOnPublicProfile: ${p.isOnPublicProfile}`),p.participantsCanAddItems!==void 0&&(d(p.participantsCanAddItems),n(`Setting participantsCanAddItems: ${p.participantsCanAddItems}`)),p.participantsCanDeleteItems!==void 0&&(x(p.participantsCanDeleteItems),n(`Setting participantsCanDeleteItems: ${p.participantsCanDeleteItems}`));const z=p.passwordPolicy;n(`Password policy from folder details: ${z}`),A(z),z!=="NoPassword"&&p.password&&m(p.password),n(`Set password protection option to: ${z}`)}else n("User is NOT the creator, hiding editable fields"),u(!1)}else n("No folder details retrieved, setting isCreator to true"),o(!0),u(!0)}catch(p){console.error("Error fetching folder details:",p),n(`Error fetching folder details: ${p}`),o(!1)}}else{const p=`${O}_____${Qe()}____Folder`;n(`Creating new folder ID: ${p}`),t(p),n("Setting isCreator to true for new album"),o(!0),u(!0)}}catch(c){console.error("Folder ID initialization error:",c),n(`Folder ID initialization error: ${c}`),o(!1)}},de=async(O,c)=>{var ee,p,Q,te,z,re,ue,Te,ye;c(`Fetching details for folder ID: ${O}`);try{const he=await xe();if(!he)return c("No token available for fetching folder details"),null;c("Sending GraphQL query to fetch folder details");const le=await(await fetch(je,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${he}`},body:JSON.stringify({query:Ms,variables:{folderIds:[O],fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(c("Folder details API response:",le),le.errors)return console.error("GraphQL errors:",le.errors),c(`GraphQL errors: ${JSON.stringify(le.errors)}`),null;const v=((p=(ee=le==null?void 0:le.data)==null?void 0:ee.fetchFolders)==null?void 0:p.items)||[];if(c(`Found ${v.length} folder items`),v.length===0)return c("No folder items found"),null;const y=v[0];c("Retrieved folder data:",y);const E=((te=(Q=y.folderPosition)==null?void 0:Q.profileIds)==null?void 0:te.some(D=>D.includes("Public____Profile")))||!1;c(`Folder is on public profile: ${E}`),c("Profile IDs:",(z=y.folderPosition)==null?void 0:z.profileIds);const S=(re=y.folderInviteParameters)==null?void 0:re.usingFolderInviteGrantsRightToAddItems;c(`Participants can add items: ${S}`);const _=(ue=y.folderInviteParameters)==null?void 0:ue.usingFolderInviteGrantsRightToRemoveItems;return c(`Participants can delete items: ${_}`),{creatorId:y.creatorId||"",folderName:y.folderName||"",folderDescription:y.folderDescription||"",passwordPolicy:((Te=y.folderPassword)==null?void 0:Te.policy)||"NoPassword",password:((ye=y.folderPassword)==null?void 0:ye.password)||"",isOnPublicProfile:E,participantsCanAddItems:S!==void 0?S:!0,participantsCanDeleteItems:_!==void 0?_:!1}}catch(he){return console.error("Error in fetchFolderDetails:",he),c(`Error in fetchFolderDetails: ${he}`),null}},s=()=>{n("Attempting to restore photos from localStorage");try{const O=localStorage.getItem(ge.SELECTED_PHOTOS);if(n(`Found stored photos: ${O?"yes":"no"}`),O)try{const c=JSON.parse(O);n(`Parsed ${c.length} photos from localStorage`),Array.isArray(c)&&c.length>0&&(f(c),n(`Restored ${c.length} photos to state`))}catch(c){console.error("Error parsing stored photos:",c),n(`Error parsing stored photos: ${c}`)}}catch(O){console.error("Error restoring photos from storage:",O),n(`Error restoring photos from storage: ${O}`)}},ie=()=>{n("Testing S3 connection");try{Bt?n("S3 client is available"):(console.error("S3 client not available"),n("S3 client not available"))}catch(O){console.error("S3 connection test error:",O),n(`S3 connection test error: ${O}`)}},ne=async()=>{var O;n("Starting component initialization");try{n("Checking login with refresh");const c=await xe();if(!c){n("No token returned from login check, aborting initialization");return}try{const ee=localStorage.getItem(ge.PUBLIC_USERNAME);n(`Retrieved public username from localStorage: ${ee||"null"}`),ae(ee||null);const Q=JSON.parse(atob(c.split(".")[1]))["cognito:username"];if(Q){n(`Extracted Cognito username from token: ${Q}`),R(Q);const te=localStorage.getItem(ge.SUB_ALBUM_DATA);if(n(`Sub-album data from localStorage: ${te||"null"}`),te)try{const z=JSON.parse(te);if(n("Parsed sub-album data:",z),z.isSubAlbum&&((O=z.selectedFileIds)==null?void 0:O.length)>0){n(`Valid sub-album data found with ${z.selectedFileIds.length} files`),N(!0),U(z.selectedFileIds),z.selectedPhotos&&z.selectedPhotos.length>0&&(n(`Found ${z.selectedPhotos.length} selected photos in sub-album data`),f(z.selectedPhotos)),u(!0),o(!0);const re=`${Q}_____${Qe()}____Folder`;n(`Generated new folder ID for sub-album: ${re}`),t(re)}else n("Invalid sub-album data, proceeding with normal initialization"),await se(Q)}catch(z){console.error("Error parsing sub-album data:",z),n(`Error parsing sub-album data: ${z}`),await se(Q)}else n("No sub-album data found, proceeding with normal folder initialization"),await se(Q)}else n("No Cognito username found in token")}catch(ee){console.error("User data initialization error:",ee),n(`User data initialization error: ${ee}`)}s(),ie(),n("Component initialization completed")}catch(c){console.error("Initialization error:",c),n(`Initialization error: ${c}`)}};return g.useEffect(()=>{ne()},[]),{cognitoUsername:J,publicUsername:L,setPublicUsername:ae}},Us=(t,f,o,u,b,K,r,d,A,m,N,U,x,n,J,R,L,ae,se,de,s,ie)=>{const ne=v=>(s(`Converting ${v.length} tags to API format`),v.map(y=>({TagType:y.TagType,tagTitle:y.tagTitle,subtags:y.subtags.map(E=>({TagType:y.TagType,tagTitle:E.tagTitle,subtagTitle:E.subtagTitle}))}))),O=v=>{s(`Save progress text: ${v}`);const y=document.getElementById("saveProgressText");y&&(y.innerText=v)},c=v=>{const y=document.getElementById("saveProgress");y?(y.style.width=`${v}%`,s(`Updated save progress bar: ${v}%`)):s("Progress bar element not found"),ae(v)},ee=(v,y)=>{s(`Splitting array of ${v.length} items into chunks of ${y}`);const E=[];for(let S=0;S<v.length;S+=y)E.push(v.slice(S,S+y));return s(`Created ${E.length} chunks`),E},p=v=>{const y=new Set;return v.filter(E=>y.has(E.fileId)?(s(`Skipping duplicate file reference with ID: ${E.fileId}`),!1):(y.add(E.fileId),!0))},Q=(v,y,E)=>{s("Creating folder position input WITHOUT folder-level tags"),s(`Profile visibility: ${d?"Public":"Only Me"}`);const S=d?[`${f}_____Public____Profile`]:["Only Me_____Only Me____Profile"];s(`Profile IDs: ${JSON.stringify(S)}`);let _=[];u&&b.length>0&&(s(`Creating file reference IDs for ${b.length} sub-album files`),_=b.map(q=>{const X=q.split("_____");if(X.length>=2){const oe=X[1].split("____")[0],me=`${E}_____${oe}____FileReference`;return s(`Created file reference ID for sub-album: ${me}`),me}return s(`Using original fileId as fallback: ${q}`),q})),s(`Created ${_.length} acceptedFileReferenceIds`);const D=N!=="NoPassword"?U:null;if(s(`Password protection: ${N}`),s(`Album password: ${D?"******":"null"}`),s(`Participants can add items: ${A}`),s(`Participants can delete items: ${m}`),!t)throw s("Error: folderId is null or undefined"),new Error("folderId is required to create folder position input");const G=Wt(t),V=Kt(G);return{currentTime:v,folderId:t,profileIds:S,folderPositionPoints:1,acceptedFileReferenceIds:_,folderInput:{folderAboutContactIds:[y],albumNanoId:V,folderName:K,folderDescription:r,folderPasswordInput:{password:D,policy:N},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:A,usingFolderInviteGrantsRightToRemoveItems:m,addedItemsNeedFolderCreatorApproval:!1}}}},te=(v,y,E)=>(s(`Creating file reference inputs with individual photo tags for ${v.length} photos`),v.map((S,_)=>{var X;const D=x.get(_)||[],G=ne(D);if(s(`Photo ${_} (${S.fileName}): ${D.length} tags applied`),S.fileId)return s(`Using existing fileId for photo: ${S.fileId}`),{fileReferencesHolderId:t,currentTime:y,points:1,hasBeenDeleted:!1,selectedTagInputs:G,fileId:S.fileId,fileInput:null};const V=S.type==="video"||(X=S.type)!=null&&X.startsWith("video")?`Input/Video/${S.fileName}`:`Input/Image/${S.fileName}`,q=`${f}_____${S.fileName}____File`;return s(`Created file reference for ${S.fileName}:`),s(`  - dataKey: ${V}`),s(`  - fileId: ${q}`),s(`  - thumbnailDataKey: ${S.thumbnailDataKey||"undefined"}`),s(`  - size: ${S.size}`),s(`  - thumbnailSize: ${S.thumbnailSize||0}`),s(`  - duration: ${S.duration||"undefined"}`),s(`  - tags: ${D.length} tags selected for this photo`),{fileReferencesHolderId:t,currentTime:y,points:1,hasBeenDeleted:!1,selectedTagInputs:G,fileId:q,fileInput:{fileId:q,ownerFileInput:{editorContactIds:[E],FileSharingOptionsEnum:"Anyone",dataKey:V,thumbnailDataKey:S.thumbnailDataKey,dataInBytes:S.size,thumbnailDataInBytes:S.thumbnailSize||0,s3UploadedAt:y,durationInSeconds:S.duration},editorFileInput:{aboutContactIds:[E],captionText:"",numericFilterInputs:[]}}}})),z=v=>{const y=[];return R.forEach(E=>{const S=n.get(E)||[];if(S.length>0){const _=J[E];if(_){const D=_.dataKey.split("/"),G=D[D.length-1],V=`${f}_____${G}____File`,q=ne(S);s(`Creating file reference for existing file ${E} (${G}) with ${S.length} tags`),y.push({fileReferencesHolderId:t,currentTime:v,points:1,hasBeenDeleted:!1,selectedTagInputs:q,fileId:V,fileInput:null})}}}),s(`Created ${y.length} file references for existing files with tags`),y},re=async v=>{var _,D;s("Sending folder-only mutation (no file references, no folder tags)");const y=await xe();if(!y)throw s("No token available for saving album, aborting"),new Error("Authentication token not available");const E=`
      mutation MyMutation($folderPositionInputs: [FolderPositionInput!]) {
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items {
            id
          }
        }
      }
    `,S={folderPositionInputs:[v]};s("GraphQL folder-only mutation variables:",S);try{s("Sending API request to save folder");const G=await fetch(je,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${y}`},body:JSON.stringify({query:E,variables:S})});s(`API response status: ${G.status}`);const V=await G.text();s(`API response raw text: ${V}`);const q=JSON.parse(V);if(s("API response JSON:",q),q.errors)throw console.error("Folder save failed:",q.errors),s("Folder save failed with errors:",q.errors),new Error("Failed to save folder");return s("Folder saved successfully"),((D=(_=q.data)==null?void 0:_.changeFiles)==null?void 0:D.items)||[]}catch(G){throw console.error("Error in sendFolderOnlyMutation:",G),s(`Error in sendFolderOnlyMutation: ${G}`),G}},ue=async v=>{var _,D,G,V,q;s(`Sending file references-only mutation with ${v.length} items (each with individual tags)`);const y=await xe();if(!y)throw s("No token available for saving file references, aborting"),new Error("Authentication token not available");const E=`
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
    `,S={updatedFileReferenceInputs:v};s("GraphQL file references-only mutation variables (first item):",v.length>0?v[0]:"No items");try{s("Sending API request to save file references with individual tags");const X=await fetch(je,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${y}`},body:JSON.stringify({query:E,variables:S})});s(`API response status: ${X.status}`);const ce=await X.text();s(`API response raw text: ${ce.substring(0,500)}...`);const oe=JSON.parse(ce);if(s("API response JSON items count:",((G=(D=(_=oe.data)==null?void 0:_.changeFiles0)==null?void 0:D.items)==null?void 0:G.length)||0),oe.errors)throw console.error("File references save failed:",oe.errors),s("File references save failed with errors:",oe.errors),new Error("Failed to save file references");return s("File references chunk saved successfully with individual photo tags"),((q=(V=oe.data)==null?void 0:V.changeFiles0)==null?void 0:q.items)||[]}catch(X){throw console.error("Error in sendFileReferencesOnlyMutation:",X),s(`Error in sendFileReferencesOnlyMutation: ${X}`),X}},Te=async(v,y)=>{var D,G,V,q,X,ce,oe,me,i;s(`Sending final chunk with folder mutation (${v.length} file references, no folder tags)`);const E=await xe();if(!E)throw s("No token available for saving final chunk, aborting"),new Error("Authentication token not available");const S=`
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
    `,_={folderPositionInputs:[y],updatedFileReferenceInputs:v};s("GraphQL final mutation variables (folder + last chunk, no folder tags)");try{s("Sending API request for final save with folder (no folder tags)");const T=await fetch(je,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${E}`},body:JSON.stringify({query:S,variables:_})});s(`API response status: ${T.status}`);const M=await T.text();s(`API response raw text: ${M.substring(0,500)}...`);const B=JSON.parse(M);if(s("API response JSON:",{fileReferencesCount:((V=(G=(D=B.data)==null?void 0:D.changeFiles0)==null?void 0:G.items)==null?void 0:V.length)||0,folderItems:((X=(q=B.data)==null?void 0:q.changeFiles)==null?void 0:X.items)||[]}),B.errors)throw console.error("Final save failed:",B.errors),s("Final save failed with errors:",B.errors),new Error("Failed to complete album save");return s("Final chunk and folder saved successfully (with individual photo tags)"),{fileReferences:((oe=(ce=B.data)==null?void 0:ce.changeFiles0)==null?void 0:oe.items)||[],folderPositions:((i=(me=B.data)==null?void 0:me.changeFiles)==null?void 0:i.items)||[]}}catch(T){throw console.error("Error in sendFinalChunkWithFolderMutation:",T),s(`Error in sendFinalChunkWithFolderMutation: ${T}`),T}},ye=async()=>(s("Validating required data"),await xe()?f?t?(s("All required data validated successfully"),!0):(s("No folder ID, validation failed"),!1):(s("No Cognito username, validation failed"),!1):(s("No token available, validation failed"),!1)),he=()=>{s("Handling successful save"),Ht(se,de,[ge.SELECTED_PHOTOS,ge.SUB_ALBUM_DATA],s),s("Album data cleared"),O(ie("Album saved successfully!")),sessionStorage.setItem("album_just_saved","true"),s("Set 'album_just_saved' flag in sessionStorage"),s("Setting timeout for redirect to my-albums.html"),setTimeout(()=>{s("Redirecting to my-albums.html"),Gt("my-albums.html")},1e3)},ve=async(v,y)=>{s("Starting chunked save process (individual photo tags, no folder tags, including existing files with tags)");try{O(ie("Processing files in chunks..."));const E=48;if(y.length===0)s("No file references to process, saving only folder position (no folder tags)"),await re(v);else{const S=p(y);s(`After removing duplicates, processing ${S.length} unique file references`);const _=ee(S,E);s(`Split file references into ${_.length} chunks of max size ${E}`);for(let D=0;D<_.length;D++){const G=_[D];s(`Processing chunk ${D+1} of ${_.length} with ${G.length} file references`);const V=D/_.length*80;ae(10+V),c(10+V),D<_.length-1?(O(ie("Saving files: chunk {{chunkNumber}} of {{totalChunks}}...",{chunkNumber:D+1,totalChunks:_.length})),await ue(G)):(O(ie("Finalizing album...")),await Te(G,v))}}ae(100),c(100),O(ie("Album saved successfully!")),he()}catch(E){console.error("Error in chunked save process:",E),s(`Error in chunked save process: ${E}`),O(ie("Error: {{error}}",{error:String(E)})),L(!1)}};return{saveAlbumDirectly:async()=>{s("Starting direct album save with individual photo tagging and existing file tagging"),s(`Photo tags map: ${x.size} photos have tags applied`),s(`Existing file tags map: ${n.size} existing files have tags applied`),L(!0),ae(5);try{if(s("Validating required data for save"),!await ye()){s("Required data validation failed, aborting save"),L(!1);return}const v=Math.floor(Date.now()/1e3),y=`${f}_____${f}____Account`,S=t.split("_____")[1].split("____")[0];s(`Save timestamp: ${v}`),s(`Account ID: ${y}`),s(`Folder ID: ${t}`),s(`Folder target item identifier: ${S}`),s("Creating folder position input (no folder tags)");const _=Q(v,y,S);s("Folder position input created:",_);let D=[];const G=o.filter(q=>q.status==="complete");if(s(`Found ${G.length} valid photos with 'complete' status`),G.length>0){const q=G.filter(ce=>!ce.fileId);s(`Found ${q.length} new uploads to move from temp to public folder`),q.length>0&&(s("Moving files from temp to public folder"),await Ut(q,c,s)),s("Creating file reference inputs for uploads with individual photo tags");const X=te(G,v,y);s(`Created ${X.length} file reference inputs for uploads`,X),D=D.concat(X)}const V=z(v);if(V.length>0&&(s(`Adding ${V.length} existing file references with tags`),D=D.concat(V)),u&&b.length>0){s(`Adding ${b.length} existing file references for sub-album`);const q=b.map(X=>(s(`Creating file reference for existing sub-album file ID: ${X}`),{fileReferencesHolderId:t,currentTime:v,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:X,fileInput:null}));s(`Created ${q.length} file reference inputs for sub-album files`,q),D=D.concat(q)}s(`Total file reference inputs: ${D.length}`),s("Sending GraphQL mutations with chunked file references (individual photo tags and existing file tags)"),await ve(_,D)}catch(v){console.error("Error in saveAlbumDirectly:",v),s(`Error in saveAlbumDirectly: ${v}`),L(!1)}}}},Ws=Z.div`
  margin: 32px 0;
`,it=Z.div`
  margin-bottom: 24px;
`,at=Z.h3`
  margin: 0 0 16px 0;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  display: flex;
  align-items: center;
  gap: 12px;
`,ot=Z.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  min-height: 32px;
`,nt=Z.button`
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
`,Ks=Z(nt)`
  font-size: 12px;
  padding: 6px 12px;
  border-radius: 16px;
`,lt=Z.button`
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
`,Hs=Z.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 16px;
`,ct=Z.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 16px;
`,dt=Z.button`
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
`,qs=Z.input`
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
`,tt=Z.button`
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
`,Js=we.memo(({tag:t,isApplied:f,isDisplayed:o,isBeingDeleted:u,disabled:b,onTagClick:K,onDeleteTag:r,getTagDisplayText:d})=>{const{t:A}=be(),[m,N]=g.useState(!1),[U,x]=g.useState(!1);g.useEffect(()=>{const J=()=>{x("ontouchstart"in window||navigator.maxTouchPoints>0)};return J(),window.addEventListener("resize",J),()=>window.removeEventListener("resize",J)},[]);const n=U?o&&!b&&!u:m&&o&&!b&&!u;return e.jsxs(nt,{$isApplied:f,$isDisplayed:o,$isBeingDeleted:u,disabled:b,onClick:()=>K(t),onMouseEnter:()=>!U&&o&&N(!0),onMouseLeave:()=>!U&&o&&N(!1),children:[e.jsx("span",{style:{paddingRight:n?"20px":"0"},children:d(t)}),n&&e.jsx(lt,{$isMobile:U,onClick:J=>{J.stopPropagation(),r(t.id)},disabled:u,title:A("Delete tag"),children:"×"})]})}),Qs=we.memo(({subtag:t,isApplied:f,isBeingDeleted:o,disabled:u,onSubtagClick:b,onDeleteSubtag:K})=>{const{t:r}=be(),[d,A]=g.useState(!1),[m,N]=g.useState(!1);g.useEffect(()=>{const x=()=>{N("ontouchstart"in window||navigator.maxTouchPoints>0)};return x(),window.addEventListener("resize",x),()=>window.removeEventListener("resize",x)},[]);const U=m?f&&!u&&!o:d&&f&&!u&&!o;return e.jsxs(Ks,{$isApplied:f,$isBeingDeleted:o,disabled:u,onClick:()=>b(t),onMouseEnter:()=>!m&&f&&A(!0),onMouseLeave:()=>!m&&f&&A(!1),children:[e.jsx("span",{style:{paddingRight:U?"20px":"0"},children:t.subtagTitle}),U&&e.jsx(lt,{$isMobile:m,onClick:x=>{x.stopPropagation(),K(t.id)},disabled:o,title:r("Delete subtag"),children:"×"})]})}),ut=({value:t,onChange:f,onSubmit:o,onCancel:u,isSubmitting:b,placeholder:K="Enter tag name..."})=>{const{t:r}=be(),d=g.useRef(null);g.useEffect(()=>{d.current&&d.current.focus()},[]);const A=m=>{m.key==="Enter"?o():m.key==="Escape"&&u()};return e.jsxs(Gs,{children:[e.jsx(qs,{ref:d,type:"text",value:t,onChange:m=>f(m.target.value),onKeyDown:A,placeholder:r(K),disabled:b}),e.jsx(tt,{onClick:o,disabled:!t.trim()||b,title:r("Add (Enter)"),children:b?"...":"✓"}),e.jsx(tt,{onClick:u,disabled:b,title:r("Cancel (Escape)"),children:"×"})]})},Vs=we.memo(({tagsManager:t,disabled:f=!1,enhancedLog:o})=>{const{t:u}=be(),{tags:b,displayedTagId:K,isLoadingTags:r,tagIdBeingDeleted:d,isAddingNewTag:A,newTagTitle:m,isSubmittingNewTag:N,toggleTagOnSelectedFiles:U,setDisplayedTag:x,isTagAppliedToSelected:n,deleteTag:J,startAddingNewTag:R,cancelAddingNewTag:L,submitNewTag:ae,setNewTagTitle:se,getAppliedTagsForSelected:de,hasSelectedFiles:s}=t;if(!s())return null;const ie=we.useCallback(p=>{if(!n(p))return p.tagTitle;const z=de().find(ue=>ue.tagTitle===p.tagTitle);if(!z||z.subtags.length===0)return p.tagTitle;const re=z.subtags.map(ue=>ue.subtagTitle).join(" || ");return`${p.tagTitle}  |  ${re}`},[n,de]);we.useEffect(()=>{const p=b.filter(te=>n(te)),Q=de();o(`TagsDisplay render - ${p.length} tags applied to all selected files:`,p.map(te=>`${te.tagTitle} (display: "${ie(te)}")`)),o("Applied tags with subtags:",Q)},[b,n,de,ie,o]);const ne=p=>{if(f)return;const Q=n(p);o(`Tag "${p.tagTitle}" clicked - current state: ${Q?"applied to all":"not applied to all"}`),U(p),p.subtags&&p.subtags.length>0&&x(Q?null:p.id),o(`After toggle - new state: ${Q?"removed from all":"applied to all"}`)},O=async p=>{if(f)return;o(`Delete tag initiated: ${p}`);const Q=await J(p);o(Q?`Tag successfully deleted: ${p}`:`Failed to delete tag: ${p}`)},c=async()=>{await ae()||o("Failed to submit new tag")},ee=we.useMemo(()=>[...b].sort((p,Q)=>p.points!==Q.points?Q.points-p.points:Q.updatedAt-p.updatedAt),[b]);return e.jsxs(Ws,{children:[e.jsxs(it,{children:[e.jsx(at,{children:u("Apply tags to selected files")}),e.jsx(ot,{children:r?e.jsx(Hs,{children:u("Loading tags...")}):e.jsxs(e.Fragment,{children:[ee.map(p=>{const Q=n(p);return e.jsx(Js,{tag:p,isApplied:Q,isDisplayed:K===p.id,isBeingDeleted:d===p.id,disabled:f,onTagClick:ne,onDeleteTag:O,getTagDisplayText:ie},p.id)}),A?e.jsx(ut,{value:m,onChange:se,onSubmit:c,onCancel:L,isSubmitting:N,placeholder:u("Enter tag name...")}):e.jsx(dt,{disabled:f,onClick:R,children:u("+ Add Tag")}),ee.length===0&&!A&&e.jsx(ct,{children:u("No tags available")})]})})]}),K&&e.jsx(Ys,{tagsManager:t,disabled:f,enhancedLog:o}),e.jsxs("div",{style:{marginTop:"24px",padding:"20px 24px",background:"linear-gradient(135deg, #e7f3ff 0%, #f0f8ff 100%)",borderRadius:"12px",fontSize:"13px",color:"#0c5aa6",border:"1px solid #b3d9ff",boxShadow:"0 4px 12px rgba(0, 123, 255, 0.08)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"12px"},children:[e.jsx("span",{style:{fontSize:"16px"},children:"🏷️"}),e.jsx("strong",{style:{fontSize:"14px"},children:u("Tag States:")})]}),e.jsxs("div",{style:{lineHeight:"1.5",marginBottom:"12px"},children:[e.jsx("strong",{children:u("Click any tag once to apply/remove it from ALL selected files")}),e.jsx("br",{}),"• ",e.jsx("strong",{style:{color:"#333333"},children:"⚫"})," ",u("Black tags: Applied to selected files (shows subtags if any)"),e.jsx("br",{}),"• ",e.jsx("strong",{style:{color:"#28a745"},children:"🟢"})," ",u("Green tags: Most recently clicked tag (showing subtags) - can be deleted"),e.jsx("br",{}),"• ",e.jsx("strong",{style:{color:"#6c757d"},children:"⚪"})," ",u("Gray tags: Available but not applied to all selected files"),e.jsx("br",{})]}),e.jsxs("div",{style:{lineHeight:"1.5",fontSize:"12px",opacity:.9},children:[e.jsx("strong",{children:u("Delete Tags:")}),e.jsx("br",{}),"• ",e.jsx("strong",{children:u("Desktop:")})," ",u("Hover over green tags to see delete button (×)"),e.jsx("br",{}),"• ",e.jsx("strong",{children:u("Mobile:")})," ",u("Delete button (×) is always visible on green tags"),e.jsx("br",{}),e.jsx("em",{style:{fontSize:"11px",opacity:.8},children:u("Tip: Click a tag to make it green and reveal the delete option")}),e.jsx("br",{}),e.jsx("em",{style:{fontSize:"11px",opacity:.8},children:u("Note: Selecting files without tags will clear all tag states")})]})]})]})}),Ys=we.memo(({tagsManager:t,disabled:f=!1,enhancedLog:o})=>{var O;const{t:u}=be(),{displayedTagId:b,subtagIdBeingDeleted:K,isAddingNewSubtag:r,newSubtagTitle:d,isSubmittingNewSubtag:A,toggleSubtagOnSelectedFiles:m,isSubtagAppliedToSelected:N,deleteSubtag:U,startAddingNewSubtag:x,cancelAddingNewSubtag:n,submitNewSubtag:J,setNewSubtagTitle:R,tags:L}=t,ae=b?((O=L.find(c=>c.id===b))==null?void 0:O.subtags)||[]:[],se=L.find(c=>c.id===b),de=c=>{f||(o(`Subtag "${c.subtagTitle}" clicked - current state: ${N(c)?"applied to all":"not applied to all"}`),m(c))},s=async c=>{if(f)return;o(`Delete subtag initiated: ${c}`);const ee=await U(c);o(ee?`Subtag successfully deleted: ${c}`:`Failed to delete subtag: ${c}`)},ie=async()=>{await J()||o("Failed to submit new subtag")};if(!se)return null;const ne=we.useMemo(()=>[...ae].sort((c,ee)=>c.points!==ee.points?ee.points-c.points:ee.updatedAt-c.updatedAt),[ae]);return e.jsxs(it,{children:[e.jsx(at,{children:u('Subtags for "{{tagTitle}}"',{tagTitle:se.tagTitle})}),e.jsxs(ot,{children:[ne.map(c=>e.jsx(Qs,{subtag:c,isApplied:N(c),isBeingDeleted:K===c.id,disabled:f,onSubtagClick:de,onDeleteSubtag:s},c.id)),r?e.jsx(ut,{value:d,onChange:R,onSubmit:ie,onCancel:n,isSubmitting:A,placeholder:u("Enter subtag name...")}):e.jsx(dt,{disabled:f,onClick:x,children:u("+ Add Subtag")}),ne.length===0&&!r&&e.jsx(ct,{children:u("No subtags available")})]})]})}),pt=({photoTags:t,isSelected:f=!1,onToggleSelection:o})=>{const{t:u}=be(),K=(d=>d.length===0?"":d.map(A=>{if(A.subtags.length>0){const m=A.subtags.map(N=>N.subtagTitle).join(", ");return`${A.tagTitle}: ${m}`}return A.tagTitle}).join(" • "))(t),r=t.length>0;return!r&&!f?null:e.jsx("div",{style:{background:r?"linear-gradient(135deg, rgba(0, 123, 255, 0.95) 0%, rgba(0, 123, 255, 0.85) 100%)":"rgba(108, 117, 125, 0.6)",color:"white",padding:r?"8px 12px":"6px 12px",borderRadius:r?"8px":"6px",fontSize:r?"11px":"10px",cursor:o?"pointer":"default",backdropFilter:"blur(6px)",boxShadow:r?"0 4px 12px rgba(0, 123, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)":"0 2px 8px rgba(0, 0, 0, 0.2)",border:r?"1px solid rgba(255, 255, 255, 0.2)":"none",transition:"all 0.3s ease",lineHeight:"1.3",minHeight:"32px",display:"flex",alignItems:"center",wordBreak:"break-word"},onClick:o,onMouseEnter:d=>{r&&(d.currentTarget.style.transform="translateY(-1px)",d.currentTarget.style.boxShadow="0 6px 16px rgba(0, 123, 255, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3)")},onMouseLeave:d=>{r&&(d.currentTarget.style.transform="translateY(0)",d.currentTarget.style.boxShadow="0 4px 12px rgba(0, 123, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)")},children:r?e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",width:"100%",flexWrap:"wrap"},children:[e.jsx("span",{style:{fontSize:"12px",opacity:.9,flexShrink:0},children:"🏷️"}),e.jsx("span",{style:{fontWeight:"600",textShadow:"0 1px 2px rgba(0, 0, 0, 0.3)",flex:1},children:K})]}):e.jsx("div",{style:{opacity:.8,fontStyle:"italic",textAlign:"center",width:"100%",fontSize:"10px"},children:u("No tags applied")})})},Xs=({selectedPhotos:t,selectedPhotoIndices:f,isSavingAlbum:o,onRemovePhoto:u,onTogglePhotoSelection:b,onSelectAllPhotos:K,onDeselectAllPhotos:r,hideHeader:d=!1,photoTagsMap:A})=>{const{t:m}=be();if(t.length===0)return null;const N=f.size>0,U=f.size===t.length;return e.jsxs(e.Fragment,{children:[!d&&e.jsx(Be,{style:{marginBottom:"16px",border:"2px solid #007bff"},children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px"},children:[e.jsx("span",{style:{fontWeight:"bold",fontSize:"14px",color:"#007bff"},children:N?m("{{count}} file(s) selected for tagging",{count:f.size}):m("Select files with blue borders for tagging")}),e.jsxs("div",{style:{display:"flex",gap:"8px",marginLeft:"auto"},children:[!U&&e.jsx("button",{onClick:K,disabled:o,style:{padding:"6px 12px",border:"1px solid #007bff",borderRadius:"4px",background:"#007bff",color:"white",fontSize:"12px",cursor:"pointer",fontWeight:"bold"},children:m("Select All")}),N&&e.jsx("button",{onClick:r,disabled:o,style:{padding:"6px 12px",border:"1px solid #6c757d",borderRadius:"4px",background:"transparent",color:"#6c757d",fontSize:"12px",cursor:"pointer"},children:m("Deselect All")})]})]})}),e.jsx(Lt,{children:t.map((x,n)=>{var L,ae;const J=f.has(n),R=A.get(n)||[];return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:[e.jsxs(es,{"data-selected":J?"true":"false",style:{position:"relative",cursor:"pointer"},onClick:()=>b(n),children:[J&&!o&&e.jsx("button",{onClick:se=>{se.stopPropagation(),confirm(m("Are you sure you want to remove this photo?"))&&u(n)},style:{position:"absolute",top:"6px",right:"6px",width:"18px",height:"18px",borderRadius:"50%",border:"none",backgroundColor:"rgba(220, 53, 69, 0.8)",color:"white",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:"bold",zIndex:15,opacity:1,transition:"all 0.2s ease",transform:"scale(0.8)"},onMouseEnter:se=>{se.currentTarget.style.backgroundColor="rgba(200, 35, 51, 0.9)",se.currentTarget.style.transform="scale(1)",se.currentTarget.style.opacity="1"},onMouseLeave:se=>{se.currentTarget.style.backgroundColor="rgba(220, 53, 69, 0.8)",se.currentTarget.style.transform="scale(0.8)",se.currentTarget.style.opacity="0"},title:m("Remove photo"),children:"×"}),x.status!=="complete"&&e.jsx(ts,{$status:x.status,children:x.status==="error"?"✕":x.status==="uploading"?"↑":x.status==="processing"?"⚙️":"•"}),e.jsxs(ss,{style:{opacity:t.length===1||!J?1:.85,transition:"opacity 0.2s ease"},children:[x.type==="video"||(L=x.type)!=null&&L.startsWith("video")?e.jsx(rs,{src:x.s3PreviewUrl,controls:!0}):e.jsx(is,{src:x.s3PreviewUrl,alt:x.fileName}),(x.status==="uploading"||x.status==="processing")&&e.jsx(st,{$bottom:"4px",$left:"4px",$right:"4px",$height:"4px",children:e.jsx(rt,{$progress:x.progress,$status:x.status})})]}),e.jsxs("div",{style:{position:"absolute",bottom:"32px",left:"8px",right:"8px",background:"rgba(0, 0, 0, 0.7)",color:"white",padding:"4px 8px",borderRadius:"4px",fontSize:"11px",textAlign:"center",backdropFilter:"blur(4px)"},children:[(ae=x.type)!=null&&ae.startsWith("video")?m("Video"):m("Image"),x.size&&` • ${(x.size/1024/1024).toFixed(1)} ${m("MB")}`,x.duration&&` • ${x.duration}${m("s")}`]}),x.status==="error"&&x.errorMessage&&e.jsxs(as,{$type:"error",children:[m("Error"),": ",x.errorMessage.length>40?x.errorMessage.substring(0,37)+"...":x.errorMessage]})]}),e.jsx(pt,{photoTags:R,isSelected:J,onToggleSelection:()=>b(n)})]},n)})}),e.jsx("style",{children:`
          [data-selected="true"]:hover button {
            opacity: 1 !important;
            transform: scale(1) !important;
          }
        `})]})},Zs=({isSavingAlbum:t,savingProgress:f})=>{const{t:o}=be();return t?e.jsxs(Be,{children:[e.jsx(Xt,{children:o("Saving Album")}),e.jsx(Zt,{id:"saveProgressText",children:o("Moving files...")}),e.jsx(st,{children:e.jsx(rt,{id:"saveProgress",$progress:f/100})})]}):null},Ls=({showFolderDetails:t,isCreator:f,folderName:o,setFolderName:u,folderDescription:b,setFolderDescription:K,isSavingAlbum:r})=>{const{t:d}=be();return!t||f!==!0?null:e.jsxs(Be,{children:[e.jsxs(Ve,{children:[e.jsx(Ye,{htmlFor:"folderName",children:d("Album Name")}),e.jsx(Vt,{id:"folderName",type:"text",value:o,onChange:A=>u(A.target.value),placeholder:d("e.g. Family Vacation in Kyoto"),disabled:r})]}),e.jsxs(Ve,{children:[e.jsx(Ye,{htmlFor:"folderDescription",children:d("Album Description")}),e.jsx(Yt,{id:"folderDescription",value:b,onChange:A=>K(A.target.value),placeholder:d("e.g. what's special about this album"),rows:4,disabled:r})]})]})},er=`
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
`,tr=`
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
`,sr=`
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
`,rr=`
  mutation DeleteTag($tagId: String!) {
    deleteTag(tagId: $tagId) {
      id
      hasBeenDeleted
    }
  }
`,ir=`
  mutation DeleteSubtag($subtagId: String!) {
    deleteSubtag(subtagId: $subtagId) {
      id
      hasBeenDeleted
    }
  }
`,ar=(t,f,o,u,b,K,r)=>{const[d,A]=g.useState([]),[m,N]=g.useState(null),[U,x]=g.useState(!1),[n,J]=g.useState(null),[R,L]=g.useState(null),[ae,se]=g.useState(!1),[de,s]=g.useState(!1),[ie,ne]=g.useState(""),[O,c]=g.useState(""),[ee,p]=g.useState(!1),[Q,te]=g.useState(!1),z=g.useMemo(()=>({photoIndices:Array.from(b),existingIndices:Array.from(K)}),[b,K]),re=g.useCallback(i=>{const{photoIndices:T,existingIndices:M}=z;if(T.length===0&&M.length===0)return!1;const B=T.length===0||T.every(l=>(t.get(l)||[]).some(W=>W.tagTitle===i.tagTitle)),P=M.length===0||M.every(l=>(o.get(l)||[]).some(W=>W.tagTitle===i.tagTitle)),h=B&&P;return(T.length>0||M.length>0)&&r(`Tag "${i.tagTitle}" applied to all selected? ${h} (photos: ${B}, existing: ${P})`),h},[z,t,o,r]),ue=g.useCallback(i=>{const{photoIndices:T,existingIndices:M}=z;let B=0,P=0;T.forEach(j=>{const pe=(t.get(j)||[]).find(Se=>Se.tagTitle===i.tagTitle);pe&&(B++,pe.subtags.some(Se=>Se.subtagTitle===i.subtagTitle)&&P++)});let h=0,l=0;M.forEach(j=>{const pe=(o.get(j)||[]).find(Se=>Se.tagTitle===i.tagTitle);pe&&(h++,pe.subtags.some(Se=>Se.subtagTitle===i.subtagTitle)&&l++)});const F=B+h,W=P+l;return F>0&&W===F},[z,t,o]),Te=g.useCallback(i=>{const{photoIndices:T,existingIndices:M}=z;if(T.length===0&&M.length===0){r("No files selected for tag application");return}const B=re(i);r(`${B?"Removing":"Applying"} tag "${i.tagTitle}" ${B?"from":"to"} all selected files`),T.length>0&&f(P=>{const h=new Map(P);return T.forEach(l=>{const F=h.get(l)||[];if(B){const W=F.filter(j=>j.tagTitle!==i.tagTitle);h.set(l,W),r(`Removed tag "${i.tagTitle}" from photo ${l}`)}else if(!F.some(j=>j.tagTitle===i.tagTitle)){const j={tagTitle:i.tagTitle,TagType:i.TagType,subtags:[]};h.set(l,[...F,j]),r(`Added tag "${i.tagTitle}" to photo ${l}`)}}),h}),M.length>0&&u(P=>{const h=new Map(P);return M.forEach(l=>{const F=h.get(l)||[];if(B){const W=F.filter(j=>j.tagTitle!==i.tagTitle);h.set(l,W),r(`Removed tag "${i.tagTitle}" from existing file ${l}`)}else if(!F.some(j=>j.tagTitle===i.tagTitle)){const j={tagTitle:i.tagTitle,TagType:i.TagType,subtags:[]};h.set(l,[...F,j]),r(`Added tag "${i.tagTitle}" to existing file ${l}`)}}),h})},[z,re,f,u,r]),ye=g.useCallback(i=>{const{photoIndices:T,existingIndices:M}=z;if(T.length===0&&M.length===0){r("No files selected for subtag application");return}const B=ue(i);r(`${B?"Removing":"Applying"} subtag "${i.subtagTitle}" ${B?"from":"to"} all selected files with parent tag`),T.length>0&&f(P=>{const h=new Map(P);return T.forEach(l=>{const W=(h.get(l)||[]).map(j=>{if(j.tagTitle===i.tagTitle){if(B)return{...j,subtags:j.subtags.filter(Y=>Y.subtagTitle!==i.subtagTitle)};if(!j.subtags.some(pe=>pe.subtagTitle===i.subtagTitle))return{...j,subtags:[...j.subtags,{tagTitle:i.tagTitle,subtagTitle:i.subtagTitle}]}}return j});h.set(l,W)}),h}),M.length>0&&u(P=>{const h=new Map(P);return M.forEach(l=>{const W=(h.get(l)||[]).map(j=>{if(j.tagTitle===i.tagTitle){if(B)return{...j,subtags:j.subtags.filter(Y=>Y.subtagTitle!==i.subtagTitle)};if(!j.subtags.some(pe=>pe.subtagTitle===i.subtagTitle))return{...j,subtags:[...j.subtags,{tagTitle:i.tagTitle,subtagTitle:i.subtagTitle}]}}return j});h.set(l,W)}),h})},[z,ue,f,u,r]),he=g.useCallback(()=>{const{photoIndices:i,existingIndices:T}=z,M=[];i.forEach(h=>{const l=t.get(h)||[];M.push(...l)}),T.forEach(h=>{const l=o.get(h)||[];M.push(...l)});const B=new Map;M.forEach(h=>{if(B.has(h.tagTitle)){const l=B.get(h.tagTitle),F=[...l.subtags,...h.subtags],W=Array.from(new Map(F.map(j=>[j.subtagTitle,j])).values());B.set(h.tagTitle,{...l,subtags:W})}else B.set(h.tagTitle,h)});const P=Array.from(B.values());return r(`getAppliedTagsForSelected: ${P.length} unique tags from ${i.length} photos + ${T.length} existing files`),P},[z,t,o,r]),ve=g.useCallback(()=>b.size>0||K.size>0,[b.size,K.size]),le=async()=>{var i,T;r("Fetching tags from API"),x(!0);try{const M=await xe();if(!M){r("No token available for fetching tags");return}const P=await(await fetch(je,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${M}`},body:JSON.stringify({query:er,variables:{fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(r("Tags API response:",P),P.errors){console.error("GraphQL errors:",P.errors),r(`GraphQL errors: ${JSON.stringify(P.errors)}`);return}const l=(((T=(i=P==null?void 0:P.data)==null?void 0:i.fetchRelations)==null?void 0:T.items)||[]).map(F=>{var W,j;return{id:F.id,tagTitle:F.tagTitle,TagType:F.TagType,points:F.points,createdAt:F.createdAt,updatedAt:F.updatedAt,subtags:((j=(W=F.subtags)==null?void 0:W.items)==null?void 0:j.map(Y=>({id:Y.id,tagTitle:Y.tagTitle,subtagTitle:Y.subtagTitle,TagType:Y.TagType,points:Y.points,createdAt:Y.createdAt,updatedAt:Y.updatedAt})))||[]}});r(`Fetched ${l.length} tags`),A(l)}catch(M){console.error("Error fetching tags:",M),r(`Error fetching tags: ${M}`)}finally{x(!1)}},v=g.useCallback(i=>{r(`Setting displayed tag: ${i}`),N(i)},[r]),y=g.useCallback(()=>{if(!m)return[];const i=d.find(T=>T.id===m);return(i==null?void 0:i.subtags)||[]},[m,d]),E=()=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(i){const T=Math.random()*16|0;return(i=="x"?T:T&3|8).toString(16)}),S=async(i,T)=>{if(r(`Adding new tag: ${i} of type: ${T}`),!i.trim())return r("Cannot add tag with empty title"),!1;p(!0);try{if(!await xe())return r("No token available for adding tag"),!1;if(await(async()=>(r("PLACEHOLDER: Would send GraphQL mutation to add tag",{mutation:tr,variables:{tagInput:{tagTitle:i.trim(),TagType:T,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(h=>setTimeout(h,500)),!0))()){const h={id:E(),tagTitle:i.trim(),TagType:T,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3),subtags:[]};return A(l=>[h,...l]),Te(h),v(h.id),ne(""),se(!1),r(`Successfully added and applied new tag: ${i}`),!0}return!1}catch(M){return console.error("Error adding new tag:",M),r(`Error adding new tag: ${M}`),!1}finally{p(!1)}},_=async(i,T,M)=>{if(r(`Adding new subtag: ${T} to tag: ${i}`),!T.trim())return r("Cannot add subtag with empty title"),!1;if(!m)return r("No displayed tag for adding subtag"),!1;te(!0);try{if(!await xe())return r("No token available for adding subtag"),!1;if(await(async()=>(r("PLACEHOLDER: Would send GraphQL mutation to add subtag",{mutation:sr,variables:{subtagInput:{tagTitle:i,subtagTitle:T.trim(),TagType:M,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(l=>setTimeout(l,500)),!0))()){const l={id:E(),tagTitle:i,subtagTitle:T.trim(),TagType:M,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3)};return A(F=>F.map(W=>W.id===m?{...W,subtags:[l,...W.subtags||[]]}:W)),ye(l),c(""),s(!1),r(`Successfully added and applied new subtag: ${T}`),!0}return!1}catch(B){return console.error("Error adding new subtag:",B),r(`Error adding new subtag: ${B}`),!1}finally{te(!1)}},D=async i=>{r(`Deleting tag: ${i}`),J(i);try{if(!await xe())return r("No token available for deleting tag"),!1;if(await(async()=>(r("PLACEHOLDER: Would send GraphQL mutation to delete tag",{mutation:rr,variables:{tagId:i}}),await new Promise(P=>setTimeout(P,500)),!0))()){const P=d.find(h=>h.id===i);return A(h=>h.filter(l=>l.id!==i)),P&&(f(h=>{const l=new Map(h);return h.forEach((F,W)=>{const j=F.filter(Y=>Y.tagTitle!==P.tagTitle);l.set(W,j)}),l}),u(h=>{const l=new Map(h);return h.forEach((F,W)=>{const j=F.filter(Y=>Y.tagTitle!==P.tagTitle);l.set(W,j)}),l})),m===i&&v(null),r(`Successfully deleted tag: ${i}`),!0}return!1}catch(T){return console.error("Error deleting tag:",T),r(`Error deleting tag: ${T}`),!1}finally{J(null)}},G=async i=>{r(`Deleting subtag: ${i}`),L(i);try{if(!await xe())return r("No token available for deleting subtag"),!1;if(await(async()=>(r("PLACEHOLDER: Would send GraphQL mutation to delete subtag",{mutation:ir,variables:{subtagId:i}}),await new Promise(P=>setTimeout(P,500)),!0))()){let P=null;return A(h=>h.map(l=>{var W;const F=((W=l.subtags)==null?void 0:W.filter(j=>j.id===i?(P=j,!1):!0))||[];return{...l,subtags:F}})),P&&(f(h=>{const l=new Map(h);return h.forEach((F,W)=>{const j=F.map(Y=>Y.tagTitle===P.tagTitle?{...Y,subtags:Y.subtags.filter(pe=>pe.subtagTitle!==P.subtagTitle)}:Y);l.set(W,j)}),l}),u(h=>{const l=new Map(h);return h.forEach((F,W)=>{const j=F.map(Y=>Y.tagTitle===P.tagTitle?{...Y,subtags:Y.subtags.filter(pe=>pe.subtagTitle!==P.subtagTitle)}:Y);l.set(W,j)}),l})),r(`Successfully deleted subtag: ${i}`),!0}return!1}catch(T){return console.error("Error deleting subtag:",T),r(`Error deleting subtag: ${T}`),!1}finally{L(null)}},V=()=>{se(!0),ne("")},q=()=>{se(!1),ne("")},X=()=>{s(!0),c("")},ce=()=>{s(!1),c("")},oe=async()=>ie.trim()?await S(ie,"File"):!1,me=async()=>{if(O.trim()&&m){const i=d.find(T=>T.id===m);if(i)return await _(i.tagTitle,O,i.TagType)}return!1};return g.useEffect(()=>{le()},[]),g.useEffect(()=>{if(r(`Selection changed - Photos: ${b.size}, Existing: ${K.size}`),m){const i=d.find(T=>T.id===m);i&&!re(i)&&(r(`Clearing displayed tag "${i.tagTitle}" because it's no longer applied to all selected files`),N(null))}},[b.size,K.size,m,d,re,r]),g.useEffect(()=>{if(m){const i=d.find(T=>T.id===m);i&&!re(i)&&(r(`Clearing displayed tag "${i.tagTitle}" due to tag map changes`),N(null))}},[t,o,m,d,re,r]),{tags:d,displayedTagId:m,isLoadingTags:U,tagIdBeingDeleted:n,subtagIdBeingDeleted:R,isAddingNewTag:ae,isAddingNewSubtag:de,newTagTitle:ie,newSubtagTitle:O,isSubmittingNewTag:ee,isSubmittingNewSubtag:Q,fetchTags:le,toggleTagOnSelectedFiles:Te,toggleSubtagOnSelectedFiles:ye,setDisplayedTag:v,isTagAppliedToSelected:re,isSubtagAppliedToSelected:ue,getDisplayedTagSubtags:y,getAppliedTagsForSelected:he,hasSelectedFiles:ve,addNewTag:S,addNewSubtag:_,deleteTag:D,deleteSubtag:G,startAddingNewTag:V,cancelAddingNewTag:q,startAddingNewSubtag:X,cancelAddingNewSubtag:ce,submitNewTag:oe,submitNewSubtag:me,setNewTagTitle:ne,setNewSubtagTitle:c}},or=({children:t,t:f,isRTL:o})=>e.jsxs("div",{style:{padding:"32px",marginBottom:"32px",backgroundColor:"#f8f9fa",border:"2px solid #e9ecef",borderRadius:"12px",direction:o?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",fontSize:"18px",color:"#495057",fontWeight:"600",marginBottom:"24px",flexDirection:o?"row-reverse":"row"},children:[e.jsx("span",{style:{marginRight:o?"0":"12px",marginLeft:o?"12px":"0",fontSize:"20px"},children:"🏷️"}),f("Select files to start tagging")]}),t]}),nr=({selectedPhotos:t,selectedPhotoIndices:f,onToggleSelection:o,onSelectAll:u,onDeselectAll:b,onRemovePhoto:K,onDeleteAll:r,disabled:d,photoTagsMap:A,t:m,isRTL:N})=>t.length===0?null:e.jsxs("div",{style:{marginBottom:"32px",direction:N?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px",flexDirection:N?"row-reverse":"row"},children:[e.jsxs("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:[m("New Files")," (",t.length,")"]}),e.jsxs("div",{style:{display:"flex",gap:"8px",flexDirection:N?"row-reverse":"row"},children:[e.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:d?"#f8f9fa":"#fff",color:d?"#999":"#333",cursor:d?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:f.size>0?b:u,disabled:d,onMouseEnter:U=>{d||(U.currentTarget.style.backgroundColor="#f8f9fa")},onMouseLeave:U=>{d||(U.currentTarget.style.backgroundColor="#fff")},children:f.size>0?m("Done Tagging Selected"):m("Select All")}),f.size===0&&e.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #dc3545",borderRadius:"4px",backgroundColor:d?"#f8f9fa":"#fff",color:d?"#999":"#dc3545",cursor:d?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:r,disabled:d,onMouseEnter:U=>{d||(U.currentTarget.style.backgroundColor="#dc3545",U.currentTarget.style.color="#fff")},onMouseLeave:U=>{d||(U.currentTarget.style.backgroundColor="#fff",U.currentTarget.style.color="#dc3545")},children:m("Delete All")})]})]}),e.jsx(Xs,{selectedPhotos:t,selectedPhotoIndices:f,isSavingAlbum:d,onRemovePhoto:K,onTogglePhotoSelection:o,onSelectAllPhotos:u,onDeselectAllPhotos:b,hideHeader:!0,photoTagsMap:A})]}),lr=({existingFiles:t,selectedExistingIndices:f,onToggleSelection:o,onSelectAll:u,onDeselectAll:b,onDeleteFile:K,disabled:r,isCreator:d,participantsCanDeleteItems:A,existingFileTagsMap:m,t:N,isRTL:U})=>t.length===0?null:e.jsxs("div",{style:{marginBottom:"32px",direction:U?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px",flexDirection:U?"row-reverse":"row"},children:[e.jsx("div",{children:e.jsxs("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:[N("Existing Files")," (",t.length,")"]})}),e.jsx("div",{style:{display:"flex",gap:"8px",flexDirection:U?"row-reverse":"row"},children:e.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:r?"#f8f9fa":"#fff",color:r?"#999":"#333",cursor:r?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:f.size>0?b:u,disabled:r,onMouseEnter:x=>{r||(x.currentTarget.style.backgroundColor="#f8f9fa")},onMouseLeave:x=>{r||(x.currentTarget.style.backgroundColor="#fff")},children:f.size>0?N("Done Tagging Selected"):N("Select All")})})]}),e.jsx("div",{style:{display:"flex",overflowX:"auto",gap:"16px",padding:"20px",border:"2px dashed #007bff",borderRadius:"12px",backgroundColor:"#fff",boxShadow:"0 2px 8px rgba(0, 0, 0, 0.04)",scrollbarWidth:"thin",scrollbarColor:"#007bff #f8f9fa"},children:t.map((x,n)=>{const J=f.has(n),R=m.get(n)||[];return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"8px",minWidth:"160px"},children:[e.jsxs("div",{style:{position:"relative",width:"160px",height:"160px",flexShrink:0,borderRadius:"12px",overflow:"hidden",border:J?"2px solid rgba(0, 123, 255, 0.6)":"2px solid #ddd",cursor:r?"not-allowed":"pointer",opacity:r?.6:1,transition:"all 0.3s ease",boxShadow:J?"0 0 0 3px rgba(0, 123, 255, 0.3), 0 4px 12px rgba(0, 123, 255, 0.15)":"0 2px 8px rgba(0, 0, 0, 0.04)",transform:J?"translateY(-2px)":"translateY(0)"},onClick:()=>!r&&o(n),children:[e.jsx(bs,{thumbnailDataKey:x.thumbnailDataKey,dataKey:x.dataKey,alt:N("Existing file"),style:{width:"100%",height:"100%",objectFit:"cover"}}),J&&!r&&(d===!0||A)&&e.jsx("button",{onClick:L=>{L.stopPropagation(),confirm(N("Are you sure you want to remove this file?"))&&K(n)},style:{position:"absolute",top:"6px",right:"6px",width:"18px",height:"18px",borderRadius:"50%",border:"none",backgroundColor:"rgba(220, 53, 69, 0.8)",color:"white",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:"bold",zIndex:15,opacity:1,transition:"all 0.2s ease",transform:"scale(0.8)"},onMouseEnter:L=>{L.currentTarget.style.backgroundColor="rgba(200, 35, 51, 0.9)",L.currentTarget.style.transform="scale(1)",L.currentTarget.style.opacity="1"},onMouseLeave:L=>{L.currentTarget.style.backgroundColor="rgba(220, 53, 69, 0.8)",L.currentTarget.style.transform="scale(0.8)",L.currentTarget.style.opacity="0"},title:N("Remove file"),children:"×"}),x.dataInBytes>0&&e.jsxs("div",{style:{position:"absolute",bottom:"4px",left:"4px",backgroundColor:"rgba(0,0,0,0.7)",color:"white",fontSize:"10px",padding:"2px 4px",borderRadius:"4px"},children:[(x.dataInBytes/(1024*1024)).toFixed(1),N("MB")]}),x.durationInSeconds&&e.jsxs("div",{style:{position:"absolute",bottom:"4px",right:"4px",backgroundColor:"rgba(0,0,0,0.7)",color:"white",fontSize:"10px",padding:"2px 4px",borderRadius:"4px"},children:[Math.floor(x.durationInSeconds/60),":",String(Math.floor(x.durationInSeconds%60)).padStart(2,"0")]})]}),e.jsxs("div",{style:{minHeight:"44px"},children:[" ",e.jsx(pt,{photoTags:R,isSelected:J,onToggleSelection:()=>!r&&o(n)})]})]},`existing-${n}-${x.dataKey}`)})})]}),cr=()=>{const{t,language:f}=be(),o=Me(f)==="rtl",u=fs(t),{setShowUsernamePrompt:b,setUsernameInput:K}=u,[r,d]=g.useState(null),[A,m]=g.useState(!1),[N,U]=g.useState(0),[x,n]=g.useState(""),[J,R]=g.useState(""),[L,ae]=g.useState(!1),[se,de]=g.useState(!1),[s,ie]=g.useState("NoPassword"),[ne,O]=g.useState(""),[c,ee]=g.useState(!1),[p,Q]=g.useState(!0),[te,z]=g.useState(!1),[re,ue]=g.useState(null),[Te,ye]=g.useState(!1),[he,ve]=g.useState([]),[le,v]=g.useState(!1),[y,E]=g.useState(!1),[S,_]=g.useState(new Set),[D,G]=g.useState(new Map),[V,q]=g.useState([]),[X,ce]=g.useState(new Set),[oe,me]=g.useState(new Map),[i,T]=g.useState(!1),M=a=>{!r&&a&&d(a)},{fileInputRef:B,selectedPhotos:P,setSelectedPhotos:h,isUploading:l,progressTracker:F,setProgressTracker:W,debugMessages:j,currentFolderId:Y,openFilePicker:pe,handleFileSelection:Se,setOnSaveAlbumPage:Ee,log:Fe}=ms(M,!0);g.useEffect(()=>(Ee(!0),$("🏠 Set isOnSaveAlbumPage to true - navigation disabled"),()=>{Ee(!1),$("🏠 Set isOnSaveAlbumPage to false - navigation enabled")}),[Ee]),g.useEffect(()=>{(async()=>{try{await Qt(),Fe("🔥 Save-album page S3 credentials prewarmed successfully")}catch(I){Fe(`⚠️ Save-album page credential prewarming failed: ${String(I)}`)}})()},[]);const $=(a,I)=>{let C=`[${new Date().toISOString()}] ${a}`;if(I!==void 0)try{const H=typeof I=="object"?JSON.stringify(I,null,2):String(I);C+=`
Data: ${H}`,console.log(C),console.log("Data object:",I)}catch(H){C+=` [Error stringifying data: ${H}]`,console.log(C),console.log("Raw data:",I)}else console.log(C);Fe(C)},ft=async a=>{var I,k,C;if(a){T(!0),$(`Fetching existing album data for folder ID: ${a}`);try{const H=await xe();if(!H){$("❌ Authentication failed while fetching existing album data");return}const fe=`
        mutation FetchRelations($fetchRelationsInput: FetchRelationsInput!) {
          fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
            items {
              ... on FolderPosition {
                ${hs}
              }
            }
          }
        }
      `,Ot={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}},Ie=await(await fetch(je,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${H}`},body:JSON.stringify({query:fe,variables:Ot})})).json();if(Ie.errors){console.error("GraphQL errors:",Ie.errors),$(`❌ Failed to fetch existing album data: ${JSON.stringify(Ie.errors)}`);return}const Ke=(((k=(I=Ie==null?void 0:Ie.data)==null?void 0:I.fetchRelations)==null?void 0:k.items)||[]).find(Ae=>Ae&&Ae.folder&&Ae.folder.id===a);if(!Ke)return;const $e=Ke.folder,Mt=((C=$e==null?void 0:$e.fileReferencesPage)==null?void 0:C.items)||[],ze=[],Re=new Map;Mt.forEach((Ae,He)=>{const Pe=Ae.file;if(Pe&&Pe.dataKey){ze.push({dataKey:Pe.dataKey,thumbnailDataKey:Pe.thumbnailDataKey||null,durationInSeconds:Pe.durationInSeconds||null,dataInBytes:Pe.dataInBytes||0});const Ge=Ae.selectedTags||[];if(Ge.length>0){const Oe=Ge.map(ke=>{var qe;return{tagTitle:ke.tagTitle,TagType:ke.TagType,subtags:((qe=ke.subtags)==null?void 0:qe.map(Je=>({tagTitle:Je.tagTitle,subtagTitle:Je.subtagTitle})))||[]}});Re.set(He,Oe),$(`Existing file ${He} has ${Oe.length} tags applied:`,Oe.map(ke=>ke.tagTitle))}}}),q(ze),me(Re),$(`✅ Successfully loaded ${ze.length} existing files with ${Re.size} files having existing tags`),!x&&$e.folderName&&n($e.folderName),!J&&$e.folderDescription&&R($e.folderDescription)}catch(H){console.error("Failed to fetch existing album data:",H),$(`❌ Failed to fetch existing album data: ${String(H)}`)}finally{T(!1)}}};g.useEffect(()=>{const I=new URLSearchParams(window.location.search).get("folderId");if(I){$(`Found folderId query parameter: ${I} - loading existing album`),v(!0),d(I),ye(!1),localStorage.removeItem(ge.SUB_ALBUM_DATA),$("Cleared sub-album data from localStorage - loading existing album from query parameter");const k=localStorage.getItem(ge.SELECTED_PHOTOS);if(!k)$("No stored photos found - proceeding with existing album load");else try{const C=JSON.parse(k);Array.isArray(C)&&C.length>0?$(`Found ${C.length} stored photos - these may be newly uploaded for this album, preserving them`):(localStorage.removeItem(ge.SELECTED_PHOTOS),$("Cleared empty photos array from localStorage"))}catch(C){$(`Error parsing stored photos: ${C}`),localStorage.removeItem(ge.SELECTED_PHOTOS)}ae(!0),ue(!0)}else $("No folderId query parameter found, will proceed with normal initialization"),v(!1)},[]);const{cognitoUsername:Ue,publicUsername:_e,setPublicUsername:gt}=Bs(le?()=>{}:d,h,le?()=>{}:ue,le?()=>{}:ae,n,R,ee,Q,ie,O,le?()=>{}:ye,le?()=>{}:ve,z,$);g.useEffect(()=>{r&&($(`Loading existing files for folder ID: ${r}`),ft(r))},[r]);const mt=ar(D,G,oe,me,S,X,$),{saveAlbumDirectly:We}=Us(r||Y,Ue,P,Te,he,x,J,c,p,te,s,ne,D,oe,V,X,m,U,h,W,$,t);g.useEffect(()=>{Y&&!r&&(d(Y),$(`Updated folder ID from upload processor: ${Y}`))},[Y,r]),g.useEffect(()=>{_(a=>{const I=new Set;return a.forEach(k=>{k<P.length&&I.add(k)}),I}),G(a=>{const I=new Map(a),k=[];return a.forEach((C,H)=>{H>=P.length&&k.push(H)}),k.forEach(C=>{I.delete(C)}),I})},[P.length]),g.useEffect(()=>{ce(a=>{const I=new Set;return a.forEach(k=>{k<V.length&&I.add(k)}),I}),me(a=>{const I=new Map(a),k=[];return a.forEach((C,H)=>{H>=V.length&&k.push(H)}),k.forEach(C=>{I.delete(C)}),I})},[V.length]);const xt=a=>{$(`Removing photo at index: ${a}`);const I=P.filter((k,C)=>C!==a);h(I),$(`New files count: ${I.length}`),I.length>0?(localStorage.setItem(ge.SELECTED_PHOTOS,JSON.stringify(I)),$(`Updated localStorage with ${I.length} photos`)):(localStorage.removeItem(ge.SELECTED_PHOTOS),$("Removed photos from localStorage")),_(k=>{const C=new Set;return k.forEach(H=>{H<a?C.add(H):H>a&&C.add(H-1)}),C}),G(k=>{const C=new Map;return k.forEach((H,fe)=>{fe<a?C.set(fe,H):fe>a&&C.set(fe-1,H)}),C})},ht=a=>{$(`Removing existing file at index: ${a}`);const I=V.filter((k,C)=>C!==a);q(I),$(`New existing files count: ${I.length}`),ce(k=>{const C=new Set;return k.forEach(H=>{H<a?C.add(H):H>a&&C.add(H-1)}),C}),me(k=>{const C=new Map;return k.forEach((H,fe)=>{fe<a?C.set(fe,H):fe>a&&C.set(fe-1,H)}),C})},bt=a=>{$(`Toggling selection for existing file at index: ${a}`),ce(I=>{const k=new Set(I);return k.has(a)?(k.delete(a),$(`Deselected existing file ${a} - remaining selected: ${k.size}`)):(k.add(a),$(`Selected existing file ${a} - total selected: ${k.size}`)),k})},yt=()=>{$(`Selecting all ${V.length} existing files`);const a=new Set;for(let I=0;I<V.length;I++)a.add(I);ce(a),$(`Selected all existing files - total: ${a.size}`)},wt=()=>{$("Deselecting all existing files"),ce(new Set)},Tt=a=>{$(`Toggling selection for photo at index: ${a}`),_(I=>{const k=new Set(I);return k.has(a)?(k.delete(a),$(`Deselected photo ${a} - remaining selected: ${k.size}`)):(k.add(a),$(`Selected photo ${a} - total selected: ${k.size}`)),k})},St=()=>{$(`Selecting all ${P.length} photos`);const a=new Set;for(let I=0;I<P.length;I++)a.add(I);_(a),$(`Selected all photos - total: ${a.size}`)},$t=()=>{$("Deselecting all photos"),_(new Set)},vt=()=>{confirm(t("Are you sure you want to delete all new files? This action cannot be undone."))&&($("Deleting all new photos"),h([]),_(new Set),G(new Map),localStorage.removeItem(ge.SELECTED_PHOTOS),$("Cleared all photos from localStorage"))};g.useEffect(()=>{$("Selection state changed:",{selectedPhotos:Array.from(S),selectedExistingFiles:Array.from(X),totalSelected:S.size+X.size})},[S,X,$]);const It=()=>{const a=!c;$(`Toggling isOnPublicProfile to: ${a}`),ee(a)},At=()=>{const a=!p;$(`Toggling participantsCanAddItems to: ${a}`),Q(a)},Pt=()=>{const a=!te;$(`Toggling participantsCanDeleteItems to: ${a}`),z(a)},jt=async()=>{$("Album save initiated"),$("Photo tags applied:",Object.fromEntries(D)),$("Existing file tags applied:",Object.fromEntries(oe)),E(!1),m(!0);try{if(_e!=null&&_e.startsWith("Profile-")){$("Public username starts with 'Profile-', showing username prompt"),K(""),b(!0),m(!1);return}$("Valid username found, proceeding to save album directly with file-level tagging"),We()}catch(a){console.error("Error in handleSaveAlbum:",a),$(`Error in handleSaveAlbum: ${a}`),m(!1)}},kt=a=>{$(`Handling successful username update to: ${a}`),localStorage.setItem(ge.PUBLIC_USERNAME,a),gt(a),b(!1),$("Proceeding to save album after username update"),We()},Ct=(a,I)=>{$(`Password dialog closed with option: ${a}, password: ${I?"******":"undefined"}`),a&&ie(a),I!==void 0&&O(I),de(!1)},Dt=()=>{$("Opening password dialog"),de(!0)},Et=()=>{$("Add photos button clicked"),pe(r)},Ft=()=>{E(!y)},Ce=a=>{a(),E(!1)};g.useEffect(()=>{const a=I=>{const k=I.target;y&&!k.closest(".settings-dropdown-container")&&E(!1)};return y&&document.addEventListener("mousedown",a),()=>{document.removeEventListener("mousedown",a)}},[y]);const Ne=A||l||i,_t=P.length>0||V.length>0,Nt=S.size>0||X.size>0,zt=we.useMemo(()=>{const a=S.size+X.size;return $(`Total selected files count updated: ${a}`),a},[S.size,X.size,$]),Rt=we.useMemo(()=>{const a=Array.from(D.entries()).map(([k,C])=>`${k}:${C.map(H=>`${H.tagTitle}(${H.subtags.map(fe=>fe.subtagTitle).join(",")})`).join("|")}`).join(";"),I=Array.from(oe.entries()).map(([k,C])=>`${k}:${C.map(H=>`${H.tagTitle}(${H.subtags.map(fe=>fe.subtagTitle).join(",")})`).join("|")}`).join(";");return`${a}||${I}`},[D,oe]);return e.jsxs(e.Fragment,{children:[e.jsx(os,{}),e.jsx(ns,{children:e.jsxs(ls,{children:[e.jsx(cs,{href:"my-albums.html",children:t("My Albums")}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[re===!0&&e.jsxs("div",{className:"settings-dropdown-container",style:{position:"relative",display:"flex",alignItems:"center"},children:[e.jsx("button",{onClick:Ft,disabled:A||l||i,style:{background:"none",border:"none",cursor:A||l||i?"not-allowed":"pointer",padding:"8px",borderRadius:"4px",display:"flex",alignItems:"center",justifyContent:"center",color:A||l||i?"#ccc":"#666",fontSize:"18px",transition:"all 0.2s ease",backgroundColor:y?"#f0f0f0":"transparent",opacity:A||l||i?.5:1},onMouseEnter:a=>{!y&&!A&&!l&&!i&&(a.currentTarget.style.backgroundColor="#f8f9fa")},onMouseLeave:a=>{!y&&!A&&!l&&!i&&(a.currentTarget.style.backgroundColor="transparent")},title:t("Album Settings"),children:"⚙️"}),y&&!A&&!l&&!i&&e.jsxs(ds,{children:[e.jsx(De,{onClick:()=>Ce(It),children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[e.jsx("span",{children:t(c?"Remove From Public Profile":"Add To Public Profile")}),e.jsx("span",{style:{fontSize:"12px",color:c?"#28a745":"#6c757d",fontWeight:"bold"},children:c?"✓":"○"})]})}),e.jsx(De,{onClick:()=>Ce(At),children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[e.jsx("span",{children:t(p?"Allow Additions":"Do Not Allow Additions")}),e.jsx("span",{style:{fontSize:"12px",color:p?"#28a745":"#6c757d",fontWeight:"bold"},children:p?"✓":"○"})]})}),e.jsx(De,{onClick:()=>Ce(Pt),children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[e.jsx("span",{children:t(te?"Allow Removals":"Do Not Allow Removals")}),e.jsx("span",{style:{fontSize:"12px",color:te?"#28a745":"#6c757d",fontWeight:"bold"},children:te?"✓":"○"})]})}),e.jsx(De,{onClick:()=>Ce(Dt),children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[e.jsx("span",{children:t("Album Password Policy")}),e.jsx("span",{style:{fontSize:"12px",color:s!=="NoPassword"?"#28a745":"#6c757d",fontWeight:"bold"},children:s!=="NoPassword"?"✓":"○"})]})})]})]}),e.jsx(Xe,{$primary:!0,onClick:jt,disabled:A||l||i,style:{minWidth:"120px",fontSize:"14px",padding:"8px 16px"},children:t(A?"Saving...":"Save Album")})]})]})}),e.jsxs(us,{$isRTL:o,children:[e.jsx("div",{style:{marginTop:L&&re===!0?"3px":"0"},children:e.jsx(Ls,{showFolderDetails:L,isCreator:re,folderName:x,setFolderName:n,folderDescription:J,setFolderDescription:R,isSavingAlbum:A||l})}),(l||F.totalFiles>0&&(F.filesUploading>0||F.filesProcessing>0||F.filesComplete<F.totalFiles))&&e.jsx(xs,{progressTracker:F,isRTL:Me(f)==="rtl",variant:"detailed",context:"saving",isUploading:l,showSuccessMessage:!1,showErrorMessage:!0,customMessages:{error:t("Some photos could not be processed. You can continue with the successfully processed photos.")}}),i&&e.jsx("div",{style:{padding:"16px",marginBottom:"16px",backgroundColor:"#f8f9fa",border:"1px solid #dee2e6",borderRadius:"8px",color:"#6c757d",textAlign:"center",fontStyle:"italic"},children:t("Loading existing files...")}),e.jsx("input",{ref:B,id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:a=>Se(a,Ue),style:{display:"none"}}),L&&re===!0&&_t&&e.jsxs(or,{t,isRTL:o,children:[V.length>0&&e.jsx("div",{style:{marginBottom:"32px"},children:e.jsx(lr,{existingFiles:V,selectedExistingIndices:X,onToggleSelection:bt,onSelectAll:yt,onDeselectAll:wt,onDeleteFile:ht,disabled:Ne,isCreator:re,participantsCanDeleteItems:te,existingFileTagsMap:oe,t,isRTL:o})}),e.jsx(nr,{selectedPhotos:P,selectedPhotoIndices:S,onToggleSelection:Tt,onSelectAll:St,onDeselectAll:$t,onRemovePhoto:xt,onDeleteAll:vt,disabled:Ne,photoTagsMap:D,t,isRTL:o}),e.jsx("div",{style:{marginTop:Nt?"32px":"16px"},children:e.jsx(Vs,{tagsManager:mt,disabled:Ne,enhancedLog:$},`tags-${zt}-${Rt.slice(0,20)}`)})]}),e.jsx(Zs,{isSavingAlbum:A,savingProgress:N}),e.jsx(ps,{children:e.jsx(Xe,{onClick:Et,disabled:A||l||i,children:t(l?"Uploading...":"Add More Photos")})}),e.jsx(gs,{t,language:f,usernameManager:u,onSuccess:kt}),e.jsx(Rs,{isOpen:se,onClose:Ct,initialOption:s,initialPassword:ne}),e.jsx(Os,{debugMessages:j,t,isRTL:o,textDirection:o?"rtl":"ltr"})]})]})},dr=()=>e.jsx(Jt,{children:e.jsx(cr,{})});qt.createRoot(document.getElementById("root")).render(e.jsx(dr,{}));
