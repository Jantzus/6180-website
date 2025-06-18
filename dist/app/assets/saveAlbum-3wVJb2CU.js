import{d as V,u as Te,a as u,j as e,g as _e,h as me,L as fe,i as Me,s as jt,m as Dt,f as Pe,k as Ft,l as Et,n as _t,r as Nt,o as ve,R as zt,I as Rt,p as Ot}from"./utils--6iex9oF.js";import{C as Ne,F as Ue,e as We,f as Bt,g as Mt,P as Ut,h as Wt,i as Qe,j as Ve,k as Kt,l as Gt,S as Ht,m as qt,V as Jt,n as Qt,o as Vt,M as Yt,G as Xt,p as Zt,q as Lt,r as es,D as ts,s as ke,B as Ke,t as ss,u as rs}from"./styled-components-5L_zwx_8.js";import{u as is,U as os}from"./useUsernameManagement-D_awM3Zo.js";import{u as as,U as ns}from"./useFileUploadProcessor-CXPCVP_z.js";import{F as ls}from"./types-B2_92tNb.js";import{L as cs}from"./LazyImage-DBbSXN1I.js";const p={colors:{primary:"#007bff",primaryDark:"#0056b3",secondary:"#6c757d",success:"#4caf50",danger:"#e53935",warning:"#ff9800",white:"#fff",text:{primary:"#333",secondary:"#666",light:"#777"},background:{primary:"#f9fafb",highlight:"#f0f7ff"},border:"#ddd"},spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px"},borderRadius:{small:"4px",medium:"8px"},boxShadow:{lg:"0 4px 10px rgba(0,0,0,0.08)"}},ds=V.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10000;
`,us=V.div`
  background-color: ${p.colors.white};
  border-radius: ${p.borderRadius.medium};
  box-shadow: ${p.boxShadow.lg};
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
  scrollbar-color: ${p.colors.border} transparent;
  
  /* Custom scrollbar for webkit browsers */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${p.colors.border};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${p.colors.secondary};
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
    border-radius: ${p.borderRadius.small};
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
`,ps=V.div`
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
`,fs=V.div`
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
`,gs=V.h3`
  font-size: 24px;
  font-weight: 600;
  color: ${p.colors.text.primary};
  margin: 0 0 ${p.spacing.lg} 0;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 22px;
    margin: 0 0 ${p.spacing.md} 0;
  }
  
  @media (max-height: 700px) {
    font-size: 20px;
    margin: 0 0 ${p.spacing.md} 0;
  }
  
  @media (max-width: 480px) {
    font-size: 18px;
  }
`,ms=V.p`
  margin-bottom: ${p.spacing.lg};
  font-size: 16px;
  color: ${p.colors.text.secondary};
  line-height: 1.5;
  
  @media (max-width: 768px) {
    margin-bottom: ${p.spacing.md};
    font-size: 15px;
  }
  
  @media (max-height: 700px) {
    margin-bottom: ${p.spacing.sm};
    font-size: 14px;
  }
`,Ge=V.div`
  margin-bottom: ${p.spacing.lg};
`,He=V.label`
  display: block;
  margin-bottom: ${p.spacing.sm};
  font-size: 14px;
  font-weight: 500;
  color: ${p.colors.text.primary};
`,xs=V.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${p.colors.border};
  border-radius: ${p.borderRadius.small};
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${p.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  &::placeholder {
    color: ${p.colors.text.light};
  }
`,hs=V.div`
  display: flex;
  flex-direction: column;
  gap: ${p.spacing.md};
  margin-bottom: ${p.spacing.xl};
`,bs=V.div`
  border: 2px solid ${t=>t.$isSelected?p.colors.primary:p.colors.border};
  border-radius: ${p.borderRadius.medium};
  padding: ${p.spacing.lg};
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${t=>t.$isSelected?p.colors.background.highlight:p.colors.white};
  display: flex;
  align-items: center;
  gap: ${p.spacing.lg};
  
  @media (max-width: 768px) {
    padding: ${p.spacing.md};
    gap: ${p.spacing.md};
  }
  
  @media (max-width: 480px) {
    padding: ${p.spacing.sm};
    gap: ${p.spacing.sm};
  }
  
  @media (max-height: 700px) {
    padding: ${p.spacing.sm};
    gap: ${p.spacing.sm};
  }
`,ys=V.div`
  flex: 1;
`,ws=V.div`
  margin-bottom: ${p.spacing.xs};
`,Ss=V.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${p.colors.primary};
  flex-shrink: 0;
`,Ts=V.label`
  font-size: 16px;
  font-weight: 500;
  color: ${p.colors.text.primary};
  cursor: pointer;
  display: block;
`,$s=V.div`
  font-size: 14px;
  color: ${p.colors.text.secondary};
  margin-top: ${p.spacing.xs};
`,vs=V.div`
  color: ${p.colors.warning};
  font-size: 12px;
  font-style: italic;
  margin-top: ${p.spacing.xs};
  font-weight: 500;
`,Is=V.div`
  display: flex;
  gap: ${p.spacing.sm};
  justify-content: center;
  margin-top: ${p.spacing.xl};
`,qe=V.button`
  background-color: ${t=>t.$variant==="danger"?p.colors.danger:t.$variant==="secondary"?"transparent":t.$variant==="success"?p.colors.success:p.colors.primary};
  color: ${t=>t.$variant==="secondary"?p.colors.primary:p.colors.white};
  border: ${t=>t.$variant==="secondary"?`1px solid ${p.colors.primary}`:"none"};
  padding: ${t=>t.$size==="small"?"8px 16px":t.$size==="large"?"16px 32px":"12px 24px"};
  border-radius: ${p.borderRadius.medium};
  cursor: ${t=>t.disabled?"not-allowed":"pointer"};
  font-size: ${t=>t.$size==="small"?"14px":t.$size==="large"?"18px":"16px"};
  font-weight: 500;
  transition: all 0.2s ease;
  opacity: ${t=>t.disabled?.6:1};
  min-width: 100px;

  &:hover:not(:disabled) {
    background-color: ${t=>t.$variant==="danger"?"#c62828":t.$variant==="secondary"?p.colors.background.highlight:t.$variant==="success"?"#388e3c":p.colors.primaryDark};
  }
`,As=V.div`
  background-color: ${p.colors.background.primary};
  border-radius: ${p.borderRadius.medium};
  padding: ${p.spacing.md};
  margin: ${p.spacing.md} 0;
  border-left: 4px solid ${p.colors.primary};
  font-size: 14px;
  color: ${p.colors.text.secondary};
  line-height: 1.4;
  
  @media (max-width: 768px) {
    padding: ${p.spacing.sm};
    margin: ${p.spacing.sm} 0;
    font-size: 13px;
  }
  
  @media (max-height: 700px) {
    padding: ${p.spacing.xs};
    font-size: 12px;
  }
`,Ps=[{value:"NotVisible",titleKey:"Password Required To See Or Save",descriptionKey:"Album will be completely hidden until correct password is entered"},{value:"Watermark",titleKey:"Watermarked And No Saving Without Password",descriptionKey:"Photos will be visible with watermarks, password required to save"},{value:"CannotBeSaved",titleKey:"Password Required To Save",descriptionKey:"Photos are visible but password required to download or save"},{value:"NoPassword",titleKey:"No Password",descriptionKey:"Album is fully public with no restrictions"}],Cs=({isOpen:t,onClose:g,initialOption:l="NoPassword",initialPassword:h=""})=>{const{t:b,language:W}=Te(),o=_e(W)==="rtl",[y,x]=u.useState(l),[P,K]=u.useState(h);if(u.useEffect(()=>{t&&(x(l),K(h))},[t,l,h]),!t)return null;const A=P.trim()==="",Z=N=>{x(N)},a=N=>{N.target===N.currentTarget&&g()},Y=N=>N!=="NoPassword";return e.jsxs(e.Fragment,{children:[e.jsx(ds,{onClick:a}),e.jsx(us,{children:e.jsx(ps,{children:e.jsxs(fs,{$isRTL:o,children:[e.jsx(gs,{children:b("Album Password Policy")}),e.jsx(ms,{children:b("Configure password protection for your album. Choose how you want to restrict access to your photos.")}),e.jsxs(Ge,{children:[e.jsx(He,{children:b("Enter Password")}),e.jsx(xs,{type:"text",placeholder:b("Enter password (optional)"),value:P,onChange:N=>K(N.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"})]}),e.jsxs(Ge,{children:[e.jsx(He,{children:b("Select Protection Level")}),e.jsx(hs,{children:Ps.map(N=>e.jsxs(bs,{$isSelected:y===N.value,onClick:()=>Z(N.value),children:[e.jsx(Ss,{type:"radio",name:"protection",checked:y===N.value,onChange:()=>Z(N.value)}),e.jsxs(ys,{children:[e.jsx(ws,{children:e.jsx(Ts,{children:b(N.titleKey)})}),e.jsx($s,{children:b(N.descriptionKey)}),A&&Y(N.value)&&y===N.value&&e.jsx(vs,{children:b('⚠️ Will use "password" as default if left empty')})]})]},N.value))})]}),Y(y)&&e.jsxs(As,{children:[e.jsx("strong",{children:b("💡 Password Protection Info:")}),e.jsx("br",{}),b('If you leave the password field empty, "password" will be used as the default password. You can change this anytime in album settings.')]}),e.jsxs(Is,{children:[e.jsx(qe,{$variant:"secondary",onClick:()=>g(),children:b("Cancel")}),e.jsx(qe,{$variant:"primary",onClick:()=>{const N=A&&Y(y)?"password":P;console.log(`Saving with option: ${y}, password: ${N.length>0?"********":"none"}`),g(y,N)},children:b("Save")})]})]})})})]})},ks=({debugMessages:t,t:g,isRTL:l,textDirection:h})=>t.length===0?null:e.jsxs("div",{style:{marginTop:"40px",background:"#fff3cd",padding:"16px",borderRadius:"8px",border:"1px solid #ffeeba",maxWidth:900,margin:"0 auto",direction:h},children:[e.jsx("h3",{style:{marginTop:0,fontSize:"18px",color:"#856404",textAlign:l?"right":"left"},children:g("Debug Log")}),e.jsx("pre",{style:{fontSize:"14px",color:"#856404",whiteSpace:"pre-wrap",maxHeight:"400px",overflow:"auto",textAlign:l?"right":"left"},children:t.map((b,W)=>e.jsx("div",{style:{marginBottom:"8px"},children:b},W))})]}),js=`
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
`,Ds=(t,g,l,h,b,W,o,y,x,P,K,A,Z,a)=>{const[Y,N]=u.useState(null),[L,re]=u.useState(null),ne=async z=>{a(`Initializing folder ID with username: ${z}`);try{const X=new URLSearchParams(window.location.search).get("folderId");if(a(`Folder ID from URL: ${X||"null"}`),X){t(X),a(`Using existing folder ID: ${X}`);try{a(`Fetching details for folder: ${X}`);const d=await ge(X,a);if(a("Folder details retrieved:",d),d){const Q=`${z}_____${z}____Account`,te=d.creatorId===Q;if(a(`User is creator of folder: ${te}, accountId: ${Q}, creator: ${d.creatorId}`),l(te),te){a("User is creator, showing folder details"),h(!0),b(d.folderName),W(d.folderDescription),o(d.isOnPublicProfile),a(`Setting isOnPublicProfile: ${d.isOnPublicProfile}`),d.participantsCanAddItems!==void 0&&(y(d.participantsCanAddItems),a(`Setting participantsCanAddItems: ${d.participantsCanAddItems}`)),d.participantsCanDeleteItems!==void 0&&(Z(d.participantsCanDeleteItems),a(`Setting participantsCanDeleteItems: ${d.participantsCanDeleteItems}`));const R=d.passwordPolicy;a(`Password policy from folder details: ${R}`),x(R),R!=="NoPassword"&&d.password&&P(d.password),a(`Set password protection option to: ${R}`)}else a("User is NOT the creator, hiding editable fields"),h(!1)}else a("No folder details retrieved, setting isCreator to true"),l(!0),h(!0)}catch(d){console.error("Error fetching folder details:",d),a(`Error fetching folder details: ${d}`),l(!1)}}else{const d=`${z}_____${Me()}____Folder`;a(`Creating new folder ID: ${d}`),t(d),a("Setting isCreator to true for new album"),l(!0),h(!0)}}catch(n){console.error("Folder ID initialization error:",n),a(`Folder ID initialization error: ${n}`),l(!1)}},ge=async(z,n)=>{var X,d,Q,te,R,se,xe,we,ye;n(`Fetching details for folder ID: ${z}`);try{const he=await me();if(!he)return n("No token available for fetching folder details"),null;n("Sending GraphQL query to fetch folder details");const oe=await(await fetch(Pe,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${he}`},body:JSON.stringify({query:js,variables:{folderIds:[z],fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(n("Folder details API response:",oe),oe.errors)return console.error("GraphQL errors:",oe.errors),n(`GraphQL errors: ${JSON.stringify(oe.errors)}`),null;const w=((d=(X=oe==null?void 0:oe.data)==null?void 0:X.fetchFolders)==null?void 0:d.items)||[];if(n(`Found ${w.length} folder items`),w.length===0)return n("No folder items found"),null;const f=w[0];n("Retrieved folder data:",f);const C=((te=(Q=f.folderPosition)==null?void 0:Q.profileIds)==null?void 0:te.some(D=>D.includes("Public____Profile")))||!1;n(`Folder is on public profile: ${C}`),n("Profile IDs:",(R=f.folderPosition)==null?void 0:R.profileIds);const m=(se=f.folderInviteParameters)==null?void 0:se.usingFolderInviteGrantsRightToAddItems;n(`Participants can add items: ${m}`);const E=(xe=f.folderInviteParameters)==null?void 0:xe.usingFolderInviteGrantsRightToRemoveItems;return n(`Participants can delete items: ${E}`),{creatorId:f.creatorId||"",folderName:f.folderName||"",folderDescription:f.folderDescription||"",passwordPolicy:((we=f.folderPassword)==null?void 0:we.policy)||"NoPassword",password:((ye=f.folderPassword)==null?void 0:ye.password)||"",isOnPublicProfile:C,participantsCanAddItems:m!==void 0?m:!0,participantsCanDeleteItems:E!==void 0?E:!1}}catch(he){return console.error("Error in fetchFolderDetails:",he),n(`Error in fetchFolderDetails: ${he}`),null}},s=()=>{a("Attempting to restore photos from localStorage");try{const z=localStorage.getItem(fe.SELECTED_PHOTOS);if(a(`Found stored photos: ${z?"yes":"no"}`),z)try{const n=JSON.parse(z);a(`Parsed ${n.length} photos from localStorage`),Array.isArray(n)&&n.length>0&&(g(n),a(`Restored ${n.length} photos to state`))}catch(n){console.error("Error parsing stored photos:",n),a(`Error parsing stored photos: ${n}`)}}catch(z){console.error("Error restoring photos from storage:",z),a(`Error restoring photos from storage: ${z}`)}},ce=()=>{a("Testing S3 connection");try{jt?a("S3 client is available"):(console.error("S3 client not available"),a("S3 client not available"))}catch(z){console.error("S3 connection test error:",z),a(`S3 connection test error: ${z}`)}},ie=async()=>{var z;a("Starting component initialization");try{a("Checking login with refresh");const n=await me();if(!n){a("No token returned from login check, aborting initialization");return}try{const X=localStorage.getItem(fe.PUBLIC_USERNAME);a(`Retrieved public username from localStorage: ${X||"null"}`),re(X||null);const Q=JSON.parse(atob(n.split(".")[1]))["cognito:username"];if(Q){a(`Extracted Cognito username from token: ${Q}`),N(Q);const te=localStorage.getItem(fe.SUB_ALBUM_DATA);if(a(`Sub-album data from localStorage: ${te||"null"}`),te)try{const R=JSON.parse(te);if(a("Parsed sub-album data:",R),R.isSubAlbum&&((z=R.selectedFileIds)==null?void 0:z.length)>0){a(`Valid sub-album data found with ${R.selectedFileIds.length} files`),K(!0),A(R.selectedFileIds),R.selectedPhotos&&R.selectedPhotos.length>0&&(a(`Found ${R.selectedPhotos.length} selected photos in sub-album data`),g(R.selectedPhotos)),h(!0),l(!0);const se=`${Q}_____${Me()}____Folder`;a(`Generated new folder ID for sub-album: ${se}`),t(se)}else a("Invalid sub-album data, proceeding with normal initialization"),await ne(Q)}catch(R){console.error("Error parsing sub-album data:",R),a(`Error parsing sub-album data: ${R}`),await ne(Q)}else a("No sub-album data found, proceeding with normal folder initialization"),await ne(Q)}else a("No Cognito username found in token")}catch(X){console.error("User data initialization error:",X),a(`User data initialization error: ${X}`)}s(),ce(),a("Component initialization completed")}catch(n){console.error("Initialization error:",n),a(`Initialization error: ${n}`)}};return u.useEffect(()=>{ie()},[]),{cognitoUsername:Y,publicUsername:L,setPublicUsername:re}},Fs=(t,g,l,h,b,W,o,y,x,P,K,A,Z,a,Y,N,L,re,ne,ge,s,ce)=>{const ie=w=>(s(`Converting ${w.length} tags to API format`),w.map(f=>({TagType:f.TagType,tagTitle:f.tagTitle,subtags:f.subtags.map(C=>({TagType:f.TagType,tagTitle:C.tagTitle,subtagTitle:C.subtagTitle}))}))),z=(w,f)=>{const C=ce(w,f);s(`Save progress text: ${C}`);const m=document.getElementById("saveProgressText");m&&(m.innerText=C)},n=w=>{const f=document.getElementById("saveProgress");f?(f.style.width=`${w}%`,s(`Updated save progress bar: ${w}%`)):s("Progress bar element not found"),re(w)},X=(w,f)=>{s(`Splitting array of ${w.length} items into chunks of ${f}`);const C=[];for(let m=0;m<w.length;m+=f)C.push(w.slice(m,m+f));return s(`Created ${C.length} chunks`),C},d=w=>{const f=new Set;return w.filter(C=>f.has(C.fileId)?(s(`Skipping duplicate file reference with ID: ${C.fileId}`),!1):(f.add(C.fileId),!0))},Q=(w,f,C)=>{s("Creating folder position input WITHOUT folder-level tags"),s(`Profile visibility: ${y?"Public":"Only Me"}`);const m=y?[`${g}_____Public____Profile`]:["Only Me_____Only Me____Profile"];s(`Profile IDs: ${JSON.stringify(m)}`);let E=[];h&&b.length>0&&(s(`Creating file reference IDs for ${b.length} sub-album files`),E=b.map(M=>{const J=M.split("_____");if(J.length>=2){const le=J[1].split("____")[0],be=`${C}_____${le}____FileReference`;return s(`Created file reference ID for sub-album: ${be}`),be}return s(`Using original fileId as fallback: ${M}`),M})),s(`Created ${E.length} acceptedFileReferenceIds`);const D=K!=="NoPassword"?A:null;if(s(`Password protection: ${K}`),s(`Album password: ${D?"******":"null"}`),s(`Participants can add items: ${x}`),s(`Participants can delete items: ${P}`),!t)throw s("Error: folderId is null or undefined"),new Error("folderId is required to create folder position input");const B=Ft(t),G=Et(B);return{currentTime:w,folderId:t,profileIds:m,folderPositionPoints:1,acceptedFileReferenceIds:E,folderInput:{folderAboutContactIds:[f],albumNanoId:G,folderName:W,folderDescription:o,folderPasswordInput:{password:D,policy:K},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:x,usingFolderInviteGrantsRightToRemoveItems:P,addedItemsNeedFolderCreatorApproval:!1}}}},te=(w,f,C)=>(s(`Creating file reference inputs with individual photo tags for ${w.length} photos`),w.map((m,E)=>{var J;const D=Z.get(E)||[],B=ie(D);if(s(`Photo ${E} (${m.fileName}): ${D.length} tags applied`),m.fileId)return s(`Using existing fileId for photo: ${m.fileId}`),{fileReferencesHolderId:t,currentTime:f,points:1,hasBeenDeleted:!1,selectedTagInputs:B,fileId:m.fileId,fileInput:null};const G=m.type==="video"||(J=m.type)!=null&&J.startsWith("video")?`Input/Video/${m.fileName}`:`Input/Image/${m.fileName}`,M=`${g}_____${m.fileName}____File`;return s(`Created file reference for ${m.fileName}:`),s(`  - dataKey: ${G}`),s(`  - fileId: ${M}`),s(`  - thumbnailDataKey: ${m.thumbnailDataKey||"undefined"}`),s(`  - size: ${m.size}`),s(`  - thumbnailSize: ${m.thumbnailSize||0}`),s(`  - duration: ${m.duration||"undefined"}`),s(`  - tags: ${D.length} tags selected for this photo`),{fileReferencesHolderId:t,currentTime:f,points:1,hasBeenDeleted:!1,selectedTagInputs:B,fileId:M,fileInput:{fileId:M,ownerFileInput:{editorContactIds:[C],FileSharingOptionsEnum:"Anyone",dataKey:G,thumbnailDataKey:m.thumbnailDataKey,dataInBytes:m.size,thumbnailDataInBytes:m.thumbnailSize||0,s3UploadedAt:f,durationInSeconds:m.duration},editorFileInput:{aboutContactIds:[C],captionText:"",numericFilterInputs:[]}}}})),R=w=>{const f=[];return N.forEach(C=>{const m=a.get(C)||[];if(m.length>0){const E=Y[C];if(E){const D=E.dataKey.split("/"),B=D[D.length-1],G=`${g}_____${B}____File`,M=ie(m);s(`Creating file reference for existing file ${C} (${B}) with ${m.length} tags`),f.push({fileReferencesHolderId:t,currentTime:w,points:1,hasBeenDeleted:!1,selectedTagInputs:M,fileId:G,fileInput:null})}}}),s(`Created ${f.length} file references for existing files with tags`),f},se=async w=>{var E,D;s("Sending folder-only mutation (no file references, no folder tags)");const f=await me();if(!f)throw s("No token available for saving album, aborting"),new Error("Authentication token not available");const C=`
      mutation MyMutation($folderPositionInputs: [FolderPositionInput!]) {
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items {
            id
          }
        }
      }
    `,m={folderPositionInputs:[w]};s("GraphQL folder-only mutation variables:",m);try{s("Sending API request to save folder");const B=await fetch(Pe,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${f}`},body:JSON.stringify({query:C,variables:m})});s(`API response status: ${B.status}`);const G=await B.text();s(`API response raw text: ${G}`);const M=JSON.parse(G);if(s("API response JSON:",M),M.errors)throw console.error("Folder save failed:",M.errors),s("Folder save failed with errors:",M.errors),new Error("Failed to save folder");return s("Folder saved successfully"),((D=(E=M.data)==null?void 0:E.changeFiles)==null?void 0:D.items)||[]}catch(B){throw console.error("Error in sendFolderOnlyMutation:",B),s(`Error in sendFolderOnlyMutation: ${B}`),B}},xe=async w=>{var E,D,B,G,M;s(`Sending file references-only mutation with ${w.length} items (each with individual tags)`);const f=await me();if(!f)throw s("No token available for saving file references, aborting"),new Error("Authentication token not available");const C=`
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
    `,m={updatedFileReferenceInputs:w};s("GraphQL file references-only mutation variables (first item):",w.length>0?w[0]:"No items");try{s("Sending API request to save file references with individual tags");const J=await fetch(Pe,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${f}`},body:JSON.stringify({query:C,variables:m})});s(`API response status: ${J.status}`);const ae=await J.text();s(`API response raw text: ${ae.substring(0,500)}...`);const le=JSON.parse(ae);if(s("API response JSON items count:",((B=(D=(E=le.data)==null?void 0:E.changeFiles0)==null?void 0:D.items)==null?void 0:B.length)||0),le.errors)throw console.error("File references save failed:",le.errors),s("File references save failed with errors:",le.errors),new Error("Failed to save file references");return s("File references chunk saved successfully with individual photo tags"),((M=(G=le.data)==null?void 0:G.changeFiles0)==null?void 0:M.items)||[]}catch(J){throw console.error("Error in sendFileReferencesOnlyMutation:",J),s(`Error in sendFileReferencesOnlyMutation: ${J}`),J}},we=async(w,f)=>{var D,B,G,M,J,ae,le,be,r;s(`Sending final chunk with folder mutation (${w.length} file references, no folder tags)`);const C=await me();if(!C)throw s("No token available for saving final chunk, aborting"),new Error("Authentication token not available");const m=`
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
    `,E={folderPositionInputs:[f],updatedFileReferenceInputs:w};s("GraphQL final mutation variables (folder + last chunk, no folder tags)");try{s("Sending API request for final save with folder (no folder tags)");const $=await fetch(Pe,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${C}`},body:JSON.stringify({query:m,variables:E})});s(`API response status: ${$.status}`);const O=await $.text();s(`API response raw text: ${O.substring(0,500)}...`);const H=JSON.parse(O);if(s("API response JSON:",{fileReferencesCount:((G=(B=(D=H.data)==null?void 0:D.changeFiles0)==null?void 0:B.items)==null?void 0:G.length)||0,folderItems:((J=(M=H.data)==null?void 0:M.changeFiles)==null?void 0:J.items)||[]}),H.errors)throw console.error("Final save failed:",H.errors),s("Final save failed with errors:",H.errors),new Error("Failed to complete album save");return s("Final chunk and folder saved successfully (with individual photo tags)"),{fileReferences:((le=(ae=H.data)==null?void 0:ae.changeFiles0)==null?void 0:le.items)||[],folderPositions:((r=(be=H.data)==null?void 0:be.changeFiles)==null?void 0:r.items)||[]}}catch($){throw console.error("Error in sendFinalChunkWithFolderMutation:",$),s(`Error in sendFinalChunkWithFolderMutation: ${$}`),$}},ye=async()=>(s("Validating required data"),await me()?g?t?(s("All required data validated successfully"),!0):(s("No folder ID, validation failed"),!1):(s("No Cognito username, validation failed"),!1):(s("No token available, validation failed"),!1)),he=()=>{s("Handling successful save"),_t(ne,ge,[fe.SELECTED_PHOTOS,fe.SUB_ALBUM_DATA],s),s("Album data cleared");const w=document.getElementById("saveProgressText");w&&(w.innerText=ce("Album saved successfully!"),s("Updated progress text to 'Album saved successfully!'")),sessionStorage.setItem("album_just_saved","true"),s("Set 'album_just_saved' flag in sessionStorage"),s("Setting timeout for redirect to my-albums.html"),setTimeout(()=>{s("Redirecting to my-albums.html"),Nt("my-albums.html")},1e3)},Ie=async(w,f)=>{s("Starting chunked save process (individual photo tags, no folder tags, including existing files with tags)");try{z("Processing files in chunks...");const C=48;if(f.length===0)s("No file references to process, saving only folder position (no folder tags)"),await se(w);else{const m=d(f);s(`After removing duplicates, processing ${m.length} unique file references`);const E=X(m,C);s(`Split file references into ${E.length} chunks of max size ${C}`);for(let D=0;D<E.length;D++){const B=E[D];s(`Processing chunk ${D+1} of ${E.length} with ${B.length} file references`);const G=D/E.length*80;re(10+G),n(10+G),D<E.length-1?(z("Saving files: chunk {{chunkNumber}} of {{totalChunks}}...",{chunkNumber:D+1,totalChunks:E.length}),await xe(B)):(z("Finalizing album..."),await we(B,w))}}re(100),n(100),z("Album saved successfully!"),he()}catch(C){console.error("Error in chunked save process:",C),s(`Error in chunked save process: ${C}`),z(`Error: ${C}`),L(!1)}};return{saveAlbumDirectly:async()=>{s("Starting direct album save with individual photo tagging and existing file tagging"),s(`Photo tags map: ${Z.size} photos have tags applied`),s(`Existing file tags map: ${a.size} existing files have tags applied`),L(!0),re(5);try{if(s("Validating required data for save"),!await ye()){s("Required data validation failed, aborting save"),L(!1);return}const w=Math.floor(Date.now()/1e3),f=`${g}_____${g}____Account`,m=t.split("_____")[1].split("____")[0];s(`Save timestamp: ${w}`),s(`Account ID: ${f}`),s(`Folder ID: ${t}`),s(`Folder target item identifier: ${m}`),s("Creating folder position input (no folder tags)");const E=Q(w,f,m);s("Folder position input created:",E);let D=[];const B=l.filter(M=>M.status==="complete");if(s(`Found ${B.length} valid photos with 'complete' status`),B.length>0){const M=B.filter(ae=>!ae.fileId);s(`Found ${M.length} new uploads to move from temp to public folder`),M.length>0&&(s("Moving files from temp to public folder"),await Dt(M,n,s)),s("Creating file reference inputs for uploads with individual photo tags");const J=te(B,w,f);s(`Created ${J.length} file reference inputs for uploads`,J),D=D.concat(J)}const G=R(w);if(G.length>0&&(s(`Adding ${G.length} existing file references with tags`),D=D.concat(G)),h&&b.length>0){s(`Adding ${b.length} existing file references for sub-album`);const M=b.map(J=>(s(`Creating file reference for existing sub-album file ID: ${J}`),{fileReferencesHolderId:t,currentTime:w,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:J,fileInput:null}));s(`Created ${M.length} file reference inputs for sub-album files`,M),D=D.concat(M)}s(`Total file reference inputs: ${D.length}`),s("Sending GraphQL mutations with chunked file references (individual photo tags and existing file tags)"),await Ie(E,D)}catch(w){console.error("Error in saveAlbumDirectly:",w),s(`Error in saveAlbumDirectly: ${w}`),L(!1)}}}},Es=({selectedPhotos:t,selectedPhotoIndices:g,isSavingAlbum:l,onRemovePhoto:h,onTogglePhotoSelection:b,onSelectAllPhotos:W,onDeselectAllPhotos:o,hideHeader:y=!1})=>{const{t:x}=Te();if(t.length===0)return null;const P=g.size>0,K=g.size===t.length;return e.jsxs(e.Fragment,{children:[!y&&e.jsx(Ne,{style:{marginBottom:"16px",border:"2px solid #007bff"},children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px"},children:[e.jsx("span",{style:{fontWeight:"bold",fontSize:"14px",color:"#007bff"},children:P?x("{{count}} file(s) selected for tagging",{count:g.size}):x("Click files below to select them for tagging")}),e.jsxs("div",{style:{display:"flex",gap:"8px",marginLeft:"auto"},children:[!K&&e.jsx("button",{onClick:W,disabled:l,style:{padding:"6px 12px",border:"1px solid #007bff",borderRadius:"4px",background:"#007bff",color:"white",fontSize:"12px",cursor:"pointer",fontWeight:"bold"},children:x("Select All")}),P&&e.jsx("button",{onClick:o,disabled:l,style:{padding:"6px 12px",border:"1px solid #6c757d",borderRadius:"4px",background:"transparent",color:"#6c757d",fontSize:"12px",cursor:"pointer"},children:x("Deselect All")})]})]})}),e.jsx(Kt,{children:t.map((A,Z)=>{var Y,N;const a=g.has(Z);return e.jsxs(Gt,{"data-selected":a?"true":"false",style:{position:"relative",cursor:"pointer"},onClick:()=>b(Z),children:[a&&!l&&e.jsx("button",{onClick:L=>{L.stopPropagation(),confirm(x("Are you sure you want to remove this photo?"))&&h(Z)},style:{position:"absolute",top:"6px",right:"6px",width:"18px",height:"18px",borderRadius:"50%",border:"none",backgroundColor:"rgba(220, 53, 69, 0.8)",color:"white",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:"bold",zIndex:15,opacity:1,transition:"all 0.2s ease",transform:"scale(0.8)"},onMouseEnter:L=>{L.currentTarget.style.backgroundColor="rgba(200, 35, 51, 0.9)",L.currentTarget.style.transform="scale(1)",L.currentTarget.style.opacity="1"},onMouseLeave:L=>{L.currentTarget.style.backgroundColor="rgba(220, 53, 69, 0.8)",L.currentTarget.style.transform="scale(0.8)",L.currentTarget.style.opacity="0"},title:x("Remove photo"),children:"×"}),a&&e.jsx("div",{style:{position:"absolute",bottom:"8px",left:"8px",right:"8px",background:"rgba(0, 123, 255, 0.9)",color:"white",padding:"4px 8px",borderRadius:"6px",fontSize:"11px",fontWeight:"600",textAlign:"center",zIndex:10,backdropFilter:"blur(4px)"},children:x("SELECTED")}),A.status!=="complete"&&e.jsx(Ht,{$status:A.status,children:A.status==="error"?"✕":A.status==="uploading"?"↑":A.status==="processing"?"⚙️":"•"}),e.jsxs(qt,{style:{opacity:t.length===1||!a?1:.85,transition:"opacity 0.2s ease"},children:[A.type==="video"||(Y=A.type)!=null&&Y.startsWith("video")?e.jsx(Jt,{src:A.s3PreviewUrl,controls:!0}):e.jsx(Qt,{src:A.s3PreviewUrl,alt:A.fileName}),(A.status==="uploading"||A.status==="processing")&&e.jsx(Qe,{$bottom:"4px",$left:"4px",$right:"4px",$height:"4px",children:e.jsx(Ve,{$progress:A.progress,$status:A.status})})]}),e.jsxs(Vt,{children:[(N=A.type)!=null&&N.startsWith("video")?x("Video"):x("Image"),A.size&&` • ${(A.size/1024/1024).toFixed(1)} MB`,A.duration&&` • ${A.duration}s`]}),A.status==="error"&&A.errorMessage&&e.jsxs(Yt,{$type:"error",children:[x("Error"),": ",A.errorMessage.length>40?A.errorMessage.substring(0,37)+"...":A.errorMessage]})]},Z)})}),e.jsx("style",{children:`
          [data-selected="true"]:hover button {
            opacity: 1 !important;
            transform: scale(1) !important;
          }
        `})]})},_s=({isSavingAlbum:t,savingProgress:g})=>{const{t:l}=Te();return t?e.jsxs(Ne,{children:[e.jsx(Ut,{children:l("Saving Album")}),e.jsx(Wt,{id:"saveProgressText",children:l("Moving files...")}),e.jsx(Qe,{children:e.jsx(Ve,{id:"saveProgress",$progress:g/100})})]}):null},Ns=({showFolderDetails:t,isCreator:g,folderName:l,setFolderName:h,folderDescription:b,setFolderDescription:W,isSavingAlbum:o})=>{const{t:y}=Te();return!t||g!==!0?null:e.jsxs(Ne,{children:[e.jsxs(Ue,{children:[e.jsx(We,{htmlFor:"folderName",children:y("Album Name")}),e.jsx(Bt,{id:"folderName",type:"text",value:l,onChange:x=>h(x.target.value),placeholder:y("e.g. Family Vacation in Kyoto"),disabled:o})]}),e.jsxs(Ue,{children:[e.jsx(We,{htmlFor:"folderDescription",children:y("Album Description")}),e.jsx(Mt,{id:"folderDescription",value:b,onChange:x=>W(x.target.value),placeholder:y("e.g. what's special about this album"),rows:4,disabled:o})]})]})},zs=`
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
`,Rs=`
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
`,Os=`
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
`,Bs=`
  mutation DeleteTag($tagId: String!) {
    deleteTag(tagId: $tagId) {
      id
      hasBeenDeleted
    }
  }
`,Ms=`
  mutation DeleteSubtag($subtagId: String!) {
    deleteSubtag(subtagId: $subtagId) {
      id
      hasBeenDeleted
    }
  }
`,Us=(t,g,l,h,b,W,o)=>{const[y,x]=u.useState([]),[P,K]=u.useState(null),[A,Z]=u.useState(!1),[a,Y]=u.useState(null),[N,L]=u.useState(null),[re,ne]=u.useState(!1),[ge,s]=u.useState(!1),[ce,ie]=u.useState(""),[z,n]=u.useState(""),[X,d]=u.useState(!1),[Q,te]=u.useState(!1),R=u.useMemo(()=>({photoIndices:Array.from(b),existingIndices:Array.from(W)}),[b,W]),se=u.useCallback(r=>{const{photoIndices:$,existingIndices:O}=R;if($.length===0&&O.length===0)return!1;const H=$.length===0||$.every(c=>(t.get(c)||[]).some(U=>U.tagTitle===r.tagTitle)),v=O.length===0||O.every(c=>(l.get(c)||[]).some(U=>U.tagTitle===r.tagTitle));return H&&v},[R,t,l]),xe=u.useCallback(r=>{const{photoIndices:$,existingIndices:O}=R;let H=0,v=0;$.forEach(k=>{const de=(t.get(k)||[]).find(Se=>Se.tagTitle===r.tagTitle);de&&(H++,de.subtags.some(Se=>Se.subtagTitle===r.subtagTitle)&&v++)});let T=0,c=0;O.forEach(k=>{const de=(l.get(k)||[]).find(Se=>Se.tagTitle===r.tagTitle);de&&(T++,de.subtags.some(Se=>Se.subtagTitle===r.subtagTitle)&&c++)});const _=H+T,U=v+c;return _>0&&U===_},[R,t,l]),we=u.useCallback(r=>{const{photoIndices:$,existingIndices:O}=R;if($.length===0&&O.length===0){o("No files selected for tag application");return}const H=se(r);o(`${H?"Removing":"Applying"} tag "${r.tagTitle}" ${H?"from":"to"} all selected files`),$.length>0&&g(v=>{const T=new Map(v);return $.forEach(c=>{const _=T.get(c)||[];if(H){const U=_.filter(k=>k.tagTitle!==r.tagTitle);T.set(c,U),o(`Removed tag "${r.tagTitle}" from photo ${c}`)}else if(!_.some(k=>k.tagTitle===r.tagTitle)){const k={tagTitle:r.tagTitle,TagType:r.TagType,subtags:[]};T.set(c,[..._,k]),o(`Added tag "${r.tagTitle}" to photo ${c}`)}}),T}),O.length>0&&h(v=>{const T=new Map(v);return O.forEach(c=>{const _=T.get(c)||[];if(H){const U=_.filter(k=>k.tagTitle!==r.tagTitle);T.set(c,U),o(`Removed tag "${r.tagTitle}" from existing file ${c}`)}else if(!_.some(k=>k.tagTitle===r.tagTitle)){const k={tagTitle:r.tagTitle,TagType:r.TagType,subtags:[]};T.set(c,[..._,k]),o(`Added tag "${r.tagTitle}" to existing file ${c}`)}}),T})},[R,se,g,h,o]),ye=u.useCallback(r=>{const{photoIndices:$,existingIndices:O}=R;if($.length===0&&O.length===0){o("No files selected for subtag application");return}const H=xe(r);o(`${H?"Removing":"Applying"} subtag "${r.subtagTitle}" ${H?"from":"to"} all selected files with parent tag`),$.length>0&&g(v=>{const T=new Map(v);return $.forEach(c=>{const U=(T.get(c)||[]).map(k=>{if(k.tagTitle===r.tagTitle){if(H)return{...k,subtags:k.subtags.filter(q=>q.subtagTitle!==r.subtagTitle)};if(!k.subtags.some(de=>de.subtagTitle===r.subtagTitle))return{...k,subtags:[...k.subtags,{tagTitle:r.tagTitle,subtagTitle:r.subtagTitle}]}}return k});T.set(c,U)}),T}),O.length>0&&h(v=>{const T=new Map(v);return O.forEach(c=>{const U=(T.get(c)||[]).map(k=>{if(k.tagTitle===r.tagTitle){if(H)return{...k,subtags:k.subtags.filter(q=>q.subtagTitle!==r.subtagTitle)};if(!k.subtags.some(de=>de.subtagTitle===r.subtagTitle))return{...k,subtags:[...k.subtags,{tagTitle:r.tagTitle,subtagTitle:r.subtagTitle}]}}return k});T.set(c,U)}),T})},[R,xe,g,h,o]),he=u.useCallback(()=>{const{photoIndices:r,existingIndices:$}=R,O=[];r.forEach(v=>{const T=t.get(v)||[];O.push(...T)}),$.forEach(v=>{const T=l.get(v)||[];O.push(...T)});const H=new Map;return O.forEach(v=>{H.set(v.tagTitle,v)}),Array.from(H.values())},[R,t,l]),Ie=u.useCallback(()=>b.size>0||W.size>0,[b.size,W.size]),oe=async()=>{var r,$;o("Fetching tags from API"),Z(!0);try{const O=await me();if(!O){o("No token available for fetching tags");return}const v=await(await fetch(Pe,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${O}`},body:JSON.stringify({query:zs,variables:{fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(o("Tags API response:",v),v.errors){console.error("GraphQL errors:",v.errors),o(`GraphQL errors: ${JSON.stringify(v.errors)}`);return}const c=((($=(r=v==null?void 0:v.data)==null?void 0:r.fetchRelations)==null?void 0:$.items)||[]).map(_=>{var U,k;return{id:_.id,tagTitle:_.tagTitle,TagType:_.TagType,points:_.points,createdAt:_.createdAt,updatedAt:_.updatedAt,subtags:((k=(U=_.subtags)==null?void 0:U.items)==null?void 0:k.map(q=>({id:q.id,tagTitle:q.tagTitle,subtagTitle:q.subtagTitle,TagType:q.TagType,points:q.points,createdAt:q.createdAt,updatedAt:q.updatedAt})))||[]}});o(`Fetched ${c.length} tags`),x(c)}catch(O){console.error("Error fetching tags:",O),o(`Error fetching tags: ${O}`)}finally{Z(!1)}},w=u.useCallback(r=>{o(`Setting displayed tag: ${r}`),K(r)},[o]),f=u.useCallback(()=>{if(!P)return[];const r=y.find($=>$.id===P);return(r==null?void 0:r.subtags)||[]},[P,y]),C=()=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(r){const $=Math.random()*16|0;return(r=="x"?$:$&3|8).toString(16)}),m=async(r,$)=>{if(o(`Adding new tag: ${r} of type: ${$}`),!r.trim())return o("Cannot add tag with empty title"),!1;d(!0);try{if(!await me())return o("No token available for adding tag"),!1;if(await(async()=>(o("PLACEHOLDER: Would send GraphQL mutation to add tag",{mutation:Rs,variables:{tagInput:{tagTitle:r.trim(),TagType:$,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(T=>setTimeout(T,500)),!0))()){const T={id:C(),tagTitle:r.trim(),TagType:$,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3),subtags:[]};return x(c=>[T,...c]),we(T),w(T.id),ie(""),ne(!1),o(`Successfully added and applied new tag: ${r}`),!0}return!1}catch(O){return console.error("Error adding new tag:",O),o(`Error adding new tag: ${O}`),!1}finally{d(!1)}},E=async(r,$,O)=>{if(o(`Adding new subtag: ${$} to tag: ${r}`),!$.trim())return o("Cannot add subtag with empty title"),!1;if(!P)return o("No displayed tag for adding subtag"),!1;te(!0);try{if(!await me())return o("No token available for adding subtag"),!1;if(await(async()=>(o("PLACEHOLDER: Would send GraphQL mutation to add subtag",{mutation:Os,variables:{subtagInput:{tagTitle:r,subtagTitle:$.trim(),TagType:O,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(c=>setTimeout(c,500)),!0))()){const c={id:C(),tagTitle:r,subtagTitle:$.trim(),TagType:O,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3)};return x(_=>_.map(U=>U.id===P?{...U,subtags:[c,...U.subtags||[]]}:U)),ye(c),n(""),s(!1),o(`Successfully added and applied new subtag: ${$}`),!0}return!1}catch(H){return console.error("Error adding new subtag:",H),o(`Error adding new subtag: ${H}`),!1}finally{te(!1)}},D=async r=>{o(`Deleting tag: ${r}`),Y(r);try{if(!await me())return o("No token available for deleting tag"),!1;if(await(async()=>(o("PLACEHOLDER: Would send GraphQL mutation to delete tag",{mutation:Bs,variables:{tagId:r}}),await new Promise(v=>setTimeout(v,500)),!0))()){const v=y.find(T=>T.id===r);return x(T=>T.filter(c=>c.id!==r)),v&&(g(T=>{const c=new Map(T);return T.forEach((_,U)=>{const k=_.filter(q=>q.tagTitle!==v.tagTitle);c.set(U,k)}),c}),h(T=>{const c=new Map(T);return T.forEach((_,U)=>{const k=_.filter(q=>q.tagTitle!==v.tagTitle);c.set(U,k)}),c})),P===r&&w(null),o(`Successfully deleted tag: ${r}`),!0}return!1}catch($){return console.error("Error deleting tag:",$),o(`Error deleting tag: ${$}`),!1}finally{Y(null)}},B=async r=>{o(`Deleting subtag: ${r}`),L(r);try{if(!await me())return o("No token available for deleting subtag"),!1;if(await(async()=>(o("PLACEHOLDER: Would send GraphQL mutation to delete subtag",{mutation:Ms,variables:{subtagId:r}}),await new Promise(v=>setTimeout(v,500)),!0))()){let v=null;return x(T=>T.map(c=>{var U;const _=((U=c.subtags)==null?void 0:U.filter(k=>k.id===r?(v=k,!1):!0))||[];return{...c,subtags:_}})),v&&(g(T=>{const c=new Map(T);return T.forEach((_,U)=>{const k=_.map(q=>q.tagTitle===v.tagTitle?{...q,subtags:q.subtags.filter(de=>de.subtagTitle!==v.subtagTitle)}:q);c.set(U,k)}),c}),h(T=>{const c=new Map(T);return T.forEach((_,U)=>{const k=_.map(q=>q.tagTitle===v.tagTitle?{...q,subtags:q.subtags.filter(de=>de.subtagTitle!==v.subtagTitle)}:q);c.set(U,k)}),c})),o(`Successfully deleted subtag: ${r}`),!0}return!1}catch($){return console.error("Error deleting subtag:",$),o(`Error deleting subtag: ${$}`),!1}finally{L(null)}},G=()=>{ne(!0),ie("")},M=()=>{ne(!1),ie("")},J=()=>{s(!0),n("")},ae=()=>{s(!1),n("")},le=async()=>ce.trim()?await m(ce,"File"):!1,be=async()=>{if(z.trim()&&P){const r=y.find($=>$.id===P);if(r)return await E(r.tagTitle,z,r.TagType)}return!1};return u.useEffect(()=>{oe()},[]),u.useEffect(()=>{o(`Selection changed - Photos: ${b.size}, Existing: ${W.size}`)},[b.size,W.size,o]),{tags:y,displayedTagId:P,isLoadingTags:A,tagIdBeingDeleted:a,subtagIdBeingDeleted:N,isAddingNewTag:re,isAddingNewSubtag:ge,newTagTitle:ce,newSubtagTitle:z,isSubmittingNewTag:X,isSubmittingNewSubtag:Q,fetchTags:oe,toggleTagOnSelectedFiles:we,toggleSubtagOnSelectedFiles:ye,setDisplayedTag:w,isTagAppliedToSelected:se,isSubtagAppliedToSelected:xe,getDisplayedTagSubtags:f,getAppliedTagsForSelected:he,hasSelectedFiles:Ie,addNewTag:m,addNewSubtag:E,deleteTag:D,deleteSubtag:B,startAddingNewTag:G,cancelAddingNewTag:M,startAddingNewSubtag:J,cancelAddingNewSubtag:ae,submitNewTag:le,submitNewSubtag:be,setNewTagTitle:ie,setNewSubtagTitle:n}},Ws=V.div`
  margin: 32px 0;
`,Ye=V.div`
  margin-bottom: 24px;
`,Xe=V.h3`
  margin: 0 0 16px 0;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  display: flex;
  align-items: center;
  gap: 12px;
`,Ze=V.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  min-height: 32px;
`,Le=V.button`
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
`,Ks=V(Le)`
  font-size: 12px;
  padding: 6px 12px;
  border-radius: 16px;
`,et=V.button`
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
`,Gs=V.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 16px;
`,tt=V.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 16px;
`,st=V.button`
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
`,Hs=V.div`
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
`,qs=V.input`
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
`,Je=V.button`
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
`,Js=ve.memo(({tag:t,isApplied:g,isDisplayed:l,isBeingDeleted:h,disabled:b,onTagClick:W,onDeleteTag:o,getTagDisplayText:y})=>{const[x,P]=u.useState(!1);return e.jsxs(Le,{$isApplied:g,$isDisplayed:l,$isBeingDeleted:h,disabled:b,onClick:()=>W(t),onMouseEnter:()=>P(!0),onMouseLeave:()=>P(!1),children:[e.jsx("span",{children:y(t)}),x&&!b&&!h&&e.jsx(et,{onClick:K=>{K.stopPropagation(),o(t.id)},disabled:h,children:"×"})]})}),Qs=ve.memo(({subtag:t,isApplied:g,isBeingDeleted:l,disabled:h,onSubtagClick:b,onDeleteSubtag:W})=>{const[o,y]=u.useState(!1);return e.jsxs(Ks,{$isApplied:g,$isBeingDeleted:l,disabled:h,onClick:()=>b(t),onMouseEnter:()=>y(!0),onMouseLeave:()=>y(!1),children:[t.subtagTitle,o&&!h&&!l&&e.jsx(et,{onClick:x=>{x.stopPropagation(),W(t.id)},disabled:l,children:"×"})]})}),rt=({value:t,onChange:g,onSubmit:l,onCancel:h,isSubmitting:b,placeholder:W="Enter tag name..."})=>{const{t:o}=Te(),y=u.useRef(null);u.useEffect(()=>{y.current&&y.current.focus()},[]);const x=P=>{P.key==="Enter"?l():P.key==="Escape"&&h()};return e.jsxs(Hs,{children:[e.jsx(qs,{ref:y,type:"text",value:t,onChange:P=>g(P.target.value),onKeyDown:x,placeholder:W,disabled:b}),e.jsx(Je,{onClick:l,disabled:!t.trim()||b,title:o("Add (Enter)"),children:b?"...":"✓"}),e.jsx(Je,{onClick:h,disabled:b,title:o("Cancel (Escape)"),children:"×"})]})},Vs=ve.memo(({tagsManager:t,disabled:g=!1,enhancedLog:l})=>{const{t:h}=Te(),{tags:b,displayedTagId:W,isLoadingTags:o,tagIdBeingDeleted:y,isAddingNewTag:x,newTagTitle:P,isSubmittingNewTag:K,toggleTagOnSelectedFiles:A,setDisplayedTag:Z,isTagAppliedToSelected:a,deleteTag:Y,startAddingNewTag:N,cancelAddingNewTag:L,submitNewTag:re,setNewTagTitle:ne,getAppliedTagsForSelected:ge,hasSelectedFiles:s}=t;if(!s())return null;const ce=d=>{if(g)return;const Q=a(d);l(`Tag "${d.tagTitle}" clicked - current state: ${Q?"applied to all":"not applied to all"}`),A(d),d.subtags&&d.subtags.length>0&&Z(Q?null:d.id),l(`After toggle - new state: ${Q?"removed from all":"applied to all"}`)},ie=async d=>{if(g)return;l(`Delete tag initiated: ${d}`);const Q=await Y(d);l(Q?`Tag successfully deleted: ${d}`:`Failed to delete tag: ${d}`)},z=async()=>{await re()||l("Failed to submit new tag")},n=d=>{const te=ge().find(se=>se.tagTitle===d.tagTitle);if(!te||te.subtags.length===0)return d.tagTitle;const R=te.subtags.map(se=>se.subtagTitle).join(" || ");return`${d.tagTitle}  |  ${R}`},X=ve.useMemo(()=>[...b].sort((d,Q)=>d.points!==Q.points?Q.points-d.points:Q.updatedAt-d.updatedAt),[b]);return e.jsxs(Ws,{children:[e.jsxs(Ye,{children:[e.jsx(Xe,{children:h("Apply tags to selected files")}),e.jsx(Ze,{children:o?e.jsx(Gs,{children:h("Loading tags...")}):e.jsxs(e.Fragment,{children:[X.map(d=>{const Q=a(d);return e.jsx(Js,{tag:d,isApplied:Q,isDisplayed:W===d.id,isBeingDeleted:y===d.id,disabled:g,onTagClick:ce,onDeleteTag:ie,getTagDisplayText:n},d.id)}),x?e.jsx(rt,{value:P,onChange:ne,onSubmit:z,onCancel:L,isSubmitting:K,placeholder:h("Enter tag name...")}):e.jsx(st,{disabled:g,onClick:N,children:h("+ Add Tag")}),X.length===0&&!x&&e.jsx(tt,{children:h("No tags available")})]})})]}),W&&e.jsx(Ys,{tagsManager:t,disabled:g,enhancedLog:l}),e.jsxs("div",{style:{marginTop:"24px",padding:"20px 24px",background:"linear-gradient(135deg, #e7f3ff 0%, #f0f8ff 100%)",borderRadius:"12px",fontSize:"13px",color:"#0c5aa6",border:"1px solid #b3d9ff",boxShadow:"0 4px 12px rgba(0, 123, 255, 0.08)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"12px"},children:[e.jsx("span",{style:{fontSize:"16px"},children:"🏷️"}),e.jsx("strong",{style:{fontSize:"14px"},children:h("Tag States:")})]}),e.jsxs("div",{style:{lineHeight:"1.5"},children:[e.jsx("strong",{children:h("Click any tag once to apply/remove it from ALL selected files")}),e.jsx("br",{}),"• ",e.jsx("strong",{style:{color:"#333333"},children:"⚫"})," ",h("Black tags: Applied to selected files"),e.jsx("br",{}),"• ",e.jsx("strong",{style:{color:"#28a745"},children:"🟢"})," ",h("Green tags: Most recently clicked tag (showing subtags)"),e.jsx("br",{}),"• ",e.jsx("strong",{style:{color:"#6c757d"},children:"⚪"})," ",h("Gray tags: Available but not applied"),e.jsx("br",{})]})]})]})}),Ys=ve.memo(({tagsManager:t,disabled:g=!1,enhancedLog:l})=>{var z;const{t:h}=Te(),{displayedTagId:b,subtagIdBeingDeleted:W,isAddingNewSubtag:o,newSubtagTitle:y,isSubmittingNewSubtag:x,toggleSubtagOnSelectedFiles:P,isSubtagAppliedToSelected:K,deleteSubtag:A,startAddingNewSubtag:Z,cancelAddingNewSubtag:a,submitNewSubtag:Y,setNewSubtagTitle:N,tags:L}=t,re=b?((z=L.find(n=>n.id===b))==null?void 0:z.subtags)||[]:[],ne=L.find(n=>n.id===b),ge=n=>{g||(l(`Subtag "${n.subtagTitle}" clicked - current state: ${K(n)?"applied to all":"not applied to all"}`),P(n))},s=async n=>{if(g)return;l(`Delete subtag initiated: ${n}`);const X=await A(n);l(X?`Subtag successfully deleted: ${n}`:`Failed to delete subtag: ${n}`)},ce=async()=>{await Y()||l("Failed to submit new subtag")};if(!ne)return null;const ie=ve.useMemo(()=>[...re].sort((n,X)=>n.points!==X.points?X.points-n.points:X.updatedAt-n.updatedAt),[re]);return e.jsxs(Ye,{children:[e.jsx(Xe,{children:h('Subtags for "{{tagTitle}}"',{tagTitle:ne.tagTitle})}),e.jsxs(Ze,{children:[ie.map(n=>e.jsx(Qs,{subtag:n,isApplied:K(n),isBeingDeleted:W===n.id,disabled:g,onSubtagClick:ge,onDeleteSubtag:s},n.id)),o?e.jsx(rt,{value:y,onChange:N,onSubmit:ce,onCancel:a,isSubmitting:x,placeholder:h("Enter subtag name...")}):e.jsx(st,{disabled:g,onClick:Z,children:h("+ Add Subtag")}),ie.length===0&&!o&&e.jsx(tt,{children:h("No subtags available")})]})]})}),Xs=({children:t,t:g,isRTL:l})=>e.jsxs("div",{style:{padding:"32px",marginBottom:"32px",backgroundColor:"#f8f9fa",border:"2px solid #e9ecef",borderRadius:"12px",direction:l?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",fontSize:"18px",color:"#495057",fontWeight:"600",marginBottom:"24px",flexDirection:l?"row-reverse":"row"},children:[e.jsx("span",{style:{marginRight:l?"0":"12px",marginLeft:l?"12px":"0",fontSize:"20px"},children:"🏷️"}),g("Click files below to select them for tagging")]}),t]}),Zs=({selectedPhotos:t,selectedPhotoIndices:g,onToggleSelection:l,onSelectAll:h,onDeselectAll:b,onRemovePhoto:W,onDeleteAll:o,disabled:y,t:x,isRTL:P})=>t.length===0?null:e.jsxs("div",{style:{marginBottom:"32px",direction:P?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px",flexDirection:P?"row-reverse":"row"},children:[e.jsxs("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:[x("New Files")," (",t.length,")"]}),e.jsxs("div",{style:{display:"flex",gap:"8px",flexDirection:P?"row-reverse":"row"},children:[e.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:y?"#f8f9fa":"#fff",color:y?"#999":"#333",cursor:y?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:g.size===t.length?b:h,disabled:y,onMouseEnter:K=>{y||(K.currentTarget.style.backgroundColor="#f8f9fa")},onMouseLeave:K=>{y||(K.currentTarget.style.backgroundColor="#fff")},children:g.size===t.length?x("Deselect All"):x("Select All")}),e.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #dc3545",borderRadius:"4px",backgroundColor:y?"#f8f9fa":"#fff",color:y?"#999":"#dc3545",cursor:y?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:o,disabled:y,onMouseEnter:K=>{y||(K.currentTarget.style.backgroundColor="#dc3545",K.currentTarget.style.color="#fff")},onMouseLeave:K=>{y||(K.currentTarget.style.backgroundColor="#fff",K.currentTarget.style.color="#dc3545")},children:x("Delete All")})]})]}),e.jsx(Es,{selectedPhotos:t,selectedPhotoIndices:g,isSavingAlbum:y,onRemovePhoto:W,onTogglePhotoSelection:l,onSelectAllPhotos:h,onDeselectAllPhotos:b,hideHeader:!0})]}),Ls=({existingFiles:t,selectedExistingIndices:g,onToggleSelection:l,onSelectAll:h,onDeselectAll:b,onDeleteFile:W,disabled:o,isCreator:y,participantsCanDeleteItems:x,t:P,isRTL:K})=>t.length===0?null:e.jsxs("div",{style:{marginBottom:"32px",direction:K?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px",flexDirection:K?"row-reverse":"row"},children:[e.jsxs("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:[P("Existing Files")," (",t.length,")"]}),e.jsx("div",{style:{display:"flex",gap:"8px",flexDirection:K?"row-reverse":"row"},children:e.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:o?"#f8f9fa":"#fff",color:o?"#999":"#333",cursor:o?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:g.size===t.length?b:h,disabled:o,onMouseEnter:A=>{o||(A.currentTarget.style.backgroundColor="#f8f9fa")},onMouseLeave:A=>{o||(A.currentTarget.style.backgroundColor="#fff")},children:g.size===t.length?P("Deselect All"):P("Select All")})})]}),e.jsx("div",{style:{display:"flex",overflowX:"auto",gap:"16px",padding:"20px",border:"2px dashed #007bff",borderRadius:"12px",backgroundColor:"#fff",boxShadow:"0 2px 8px rgba(0, 0, 0, 0.04)",scrollbarWidth:"thin",scrollbarColor:"#007bff #f8f9fa"},children:t.map((A,Z)=>{const a=g.has(Z);return e.jsxs("div",{style:{position:"relative",width:"160px",height:"160px",flexShrink:0,borderRadius:"12px",overflow:"hidden",border:a?"2px solid rgba(0, 123, 255, 0.6)":"2px solid #ddd",cursor:o?"not-allowed":"pointer",opacity:o?.6:1,transition:"all 0.3s ease",boxShadow:a?"0 0 0 3px rgba(0, 123, 255, 0.3), 0 4px 12px rgba(0, 123, 255, 0.15)":"0 2px 8px rgba(0, 0, 0, 0.04)",transform:a?"translateY(-2px)":"translateY(0)"},onClick:()=>!o&&l(Z),children:[e.jsx(cs,{thumbnailDataKey:A.thumbnailDataKey,dataKey:A.dataKey,alt:P("Existing file"),style:{width:"100%",height:"100%",objectFit:"cover"}}),a&&e.jsx("div",{style:{position:"absolute",bottom:"8px",left:"8px",right:"8px",background:"rgba(0, 123, 255, 0.9)",color:"white",padding:"4px 8px",borderRadius:"6px",fontSize:"11px",fontWeight:"600",textAlign:"center",zIndex:10,backdropFilter:"blur(4px)"},children:"SELECTED"}),a&&!o&&(y===!0||x)&&e.jsx("button",{onClick:Y=>{Y.stopPropagation(),confirm(P("Are you sure you want to remove this file?"))&&W(Z)},style:{position:"absolute",top:"6px",right:"6px",width:"18px",height:"18px",borderRadius:"50%",border:"none",backgroundColor:"rgba(220, 53, 69, 0.8)",color:"white",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:"bold",zIndex:15,opacity:1,transition:"all 0.2s ease",transform:"scale(0.8)"},onMouseEnter:Y=>{Y.currentTarget.style.backgroundColor="rgba(200, 35, 51, 0.9)",Y.currentTarget.style.transform="scale(1)",Y.currentTarget.style.opacity="1"},onMouseLeave:Y=>{Y.currentTarget.style.backgroundColor="rgba(220, 53, 69, 0.8)",Y.currentTarget.style.transform="scale(0.8)",Y.currentTarget.style.opacity="0"},title:P("Remove file"),children:"×"}),A.dataInBytes>0&&e.jsxs("div",{style:{position:"absolute",bottom:"4px",left:"4px",backgroundColor:"rgba(0,0,0,0.7)",color:"white",fontSize:"10px",padding:"2px 4px",borderRadius:"4px"},children:[(A.dataInBytes/(1024*1024)).toFixed(1),"MB"]}),A.durationInSeconds&&e.jsxs("div",{style:{position:"absolute",top:"8px",left:"8px",backgroundColor:"rgba(0,0,0,0.7)",color:"white",fontSize:"10px",padding:"2px 4px",borderRadius:"4px"},children:[Math.floor(A.durationInSeconds/60),":",String(Math.floor(A.durationInSeconds%60)).padStart(2,"0")]})]},`existing-${Z}-${A.dataKey}`)})})]}),er=()=>{const{t,language:g}=Te(),l=_e(g)==="rtl",h=is(t),{setShowUsernamePrompt:b,setUsernameInput:W}=h,[o,y]=u.useState(null),[x,P]=u.useState(!1),[K,A]=u.useState(0),[Z,a]=u.useState(""),[Y,N]=u.useState(""),[L,re]=u.useState(!1),[ne,ge]=u.useState(!1),[s,ce]=u.useState("NoPassword"),[ie,z]=u.useState(""),[n,X]=u.useState(!1),[d,Q]=u.useState(!0),[te,R]=u.useState(!1),[se,xe]=u.useState(null),[we,ye]=u.useState(!1),[he,Ie]=u.useState([]),[oe,w]=u.useState(!1),[f,C]=u.useState(!1),[m,E]=u.useState(new Set),[D,B]=u.useState(new Map),[G,M]=u.useState([]),[J,ae]=u.useState(new Set),[le,be]=u.useState(new Map),[r,$]=u.useState(!1),O=i=>{!o&&i&&y(i)},{fileInputRef:H,selectedPhotos:v,setSelectedPhotos:T,isUploading:c,progressTracker:_,setProgressTracker:U,debugMessages:k,currentFolderId:q,openFilePicker:de,handleFileSelection:Se,setOnSaveAlbumPage:je,log:De}=as(O,!0);u.useEffect(()=>(je(!0),S("🏠 Set isOnSaveAlbumPage to true - navigation disabled"),()=>{je(!1),S("🏠 Set isOnSaveAlbumPage to false - navigation enabled")}),[je]),u.useEffect(()=>{(async()=>{try{await Ot(),De("🔥 Save-album page S3 credentials prewarmed successfully")}catch(I){De(`⚠️ Save-album page credential prewarming failed: ${String(I)}`)}})()},[]);const S=(i,I)=>{let F=`[${new Date().toISOString()}] ${i}`;if(I!==void 0)try{const ee=typeof I=="object"?JSON.stringify(I,null,2):String(I);F+=`
Data: ${ee}`,console.log(F),console.log("Data object:",I)}catch(ee){F+=` [Error stringifying data: ${ee}]`,console.log(F),console.log("Raw data:",I)}else console.log(F);De(F)},it=async i=>{var I,j,F,ee;if(i){$(!0),S(`Fetching existing album data for folder ID: ${i}`);try{const ue=await me();if(!ue){S("❌ Authentication failed while fetching existing album data");return}const Ct=`
        mutation FetchRelations($fetchRelationsInput: FetchRelationsInput!) {
          fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
            items {
              ... on FolderPosition {
                ${ls}
              }
            }
          }
        }
      `,kt={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}},Ae=await(await fetch(Pe,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${ue}`},body:JSON.stringify({query:Ct,variables:kt})})).json();if(Ae.errors){console.error("GraphQL errors:",Ae.errors),S(`❌ Failed to fetch existing album data: ${JSON.stringify(Ae.errors)}`);return}const Oe=(((j=(I=Ae==null?void 0:Ae.data)==null?void 0:I.fetchRelations)==null?void 0:j.items)||[]).find(pe=>pe&&pe.folder&&pe.folder.id===i);if(!Oe)return;const $e=Oe.folder,Be=(((ee=(F=$e==null?void 0:$e.fileReferencesPage)==null?void 0:F.items)==null?void 0:ee.map(pe=>pe.file))||[]).filter(pe=>pe&&pe.dataKey).map(pe=>({dataKey:pe.dataKey,thumbnailDataKey:pe.thumbnailDataKey||null,durationInSeconds:pe.durationInSeconds||null,dataInBytes:pe.dataInBytes||0}));M(Be),S(`✅ Successfully loaded ${Be.length} existing files`),!Z&&$e.folderName&&a($e.folderName),!Y&&$e.folderDescription&&N($e.folderDescription)}catch(ue){console.error("Failed to fetch existing album data:",ue),S(`❌ Failed to fetch existing album data: ${String(ue)}`)}finally{$(!1)}}};u.useEffect(()=>{const I=new URLSearchParams(window.location.search).get("folderId");if(I){S(`Found folderId query parameter: ${I} - loading existing album`),w(!0),y(I),ye(!1),localStorage.removeItem(fe.SUB_ALBUM_DATA),S("Cleared sub-album data from localStorage - loading existing album from query parameter");const j=localStorage.getItem(fe.SELECTED_PHOTOS);if(!j)S("No stored photos found - proceeding with existing album load");else try{const F=JSON.parse(j);Array.isArray(F)&&F.length>0?S(`Found ${F.length} stored photos - these may be newly uploaded for this album, preserving them`):(localStorage.removeItem(fe.SELECTED_PHOTOS),S("Cleared empty photos array from localStorage"))}catch(F){S(`Error parsing stored photos: ${F}`),localStorage.removeItem(fe.SELECTED_PHOTOS)}re(!0),xe(!0)}else S("No folderId query parameter found, will proceed with normal initialization"),w(!1)},[]);const{cognitoUsername:ze,publicUsername:Fe,setPublicUsername:ot}=Ds(oe?()=>{}:y,T,oe?()=>{}:xe,oe?()=>{}:re,a,N,X,Q,ce,z,oe?()=>{}:ye,oe?()=>{}:Ie,R,S);u.useEffect(()=>{o&&(S(`Loading existing files for folder ID: ${o}`),it(o))},[o]);const at=Us(D,B,le,be,m,J,S),{saveAlbumDirectly:Re}=Fs(o||q,ze,v,we,he,Z,Y,n,d,te,s,ie,D,le,G,J,P,A,T,U,S,t);u.useEffect(()=>{q&&!o&&(y(q),S(`Updated folder ID from upload processor: ${q}`))},[q,o]),u.useEffect(()=>{E(i=>{const I=new Set;return i.forEach(j=>{j<v.length&&I.add(j)}),I}),B(i=>{const I=new Map(i),j=[];return i.forEach((F,ee)=>{ee>=v.length&&j.push(ee)}),j.forEach(F=>{I.delete(F)}),I})},[v.length]),u.useEffect(()=>{ae(i=>{const I=new Set;return i.forEach(j=>{j<G.length&&I.add(j)}),I}),be(i=>{const I=new Map(i),j=[];return i.forEach((F,ee)=>{ee>=G.length&&j.push(ee)}),j.forEach(F=>{I.delete(F)}),I})},[G.length]);const nt=i=>{S(`Removing photo at index: ${i}`);const I=v.filter((j,F)=>F!==i);T(I),S(`New files count: ${I.length}`),I.length>0?(localStorage.setItem(fe.SELECTED_PHOTOS,JSON.stringify(I)),S(`Updated localStorage with ${I.length} photos`)):(localStorage.removeItem(fe.SELECTED_PHOTOS),S("Removed photos from localStorage")),E(j=>{const F=new Set;return j.forEach(ee=>{ee<i?F.add(ee):ee>i&&F.add(ee-1)}),F}),B(j=>{const F=new Map;return j.forEach((ee,ue)=>{ue<i?F.set(ue,ee):ue>i&&F.set(ue-1,ee)}),F})},lt=i=>{S(`Removing existing file at index: ${i}`);const I=G.filter((j,F)=>F!==i);M(I),S(`New existing files count: ${I.length}`),ae(j=>{const F=new Set;return j.forEach(ee=>{ee<i?F.add(ee):ee>i&&F.add(ee-1)}),F}),be(j=>{const F=new Map;return j.forEach((ee,ue)=>{ue<i?F.set(ue,ee):ue>i&&F.set(ue-1,ee)}),F})},ct=i=>{S(`Toggling selection for existing file at index: ${i}`),ae(I=>{const j=new Set(I);return j.has(i)?(j.delete(i),S(`Deselected existing file ${i} - remaining selected: ${j.size}`)):(j.add(i),S(`Selected existing file ${i} - total selected: ${j.size}`)),j})},dt=()=>{S(`Selecting all ${G.length} existing files`);const i=new Set;for(let I=0;I<G.length;I++)i.add(I);ae(i),S(`Selected all existing files - total: ${i.size}`)},ut=()=>{S("Deselecting all existing files"),ae(new Set)},pt=i=>{S(`Toggling selection for photo at index: ${i}`),E(I=>{const j=new Set(I);return j.has(i)?(j.delete(i),S(`Deselected photo ${i} - remaining selected: ${j.size}`)):(j.add(i),S(`Selected photo ${i} - total selected: ${j.size}`)),j})},ft=()=>{S(`Selecting all ${v.length} photos`);const i=new Set;for(let I=0;I<v.length;I++)i.add(I);E(i),S(`Selected all photos - total: ${i.size}`)},gt=()=>{S("Deselecting all photos"),E(new Set)},mt=()=>{confirm(t("Are you sure you want to delete all new files? This action cannot be undone."))&&(S("Deleting all new photos"),T([]),E(new Set),B(new Map),localStorage.removeItem(fe.SELECTED_PHOTOS),S("Cleared all photos from localStorage"))};u.useEffect(()=>{S("Selection state changed:",{selectedPhotos:Array.from(m),selectedExistingFiles:Array.from(J),totalSelected:m.size+J.size})},[m,J,S]);const xt=()=>{const i=!n;S(`Toggling isOnPublicProfile to: ${i}`),X(i)},ht=()=>{const i=!d;S(`Toggling participantsCanAddItems to: ${i}`),Q(i)},bt=()=>{const i=!te;S(`Toggling participantsCanDeleteItems to: ${i}`),R(i)},yt=async()=>{S("Album save initiated"),S("Photo tags applied:",Object.fromEntries(D)),S("Existing file tags applied:",Object.fromEntries(le)),C(!1),P(!0);try{if(Fe!=null&&Fe.startsWith("Profile-")){S("Public username starts with 'Profile-', showing username prompt"),W(""),b(!0),P(!1);return}S("Valid username found, proceeding to save album directly with file-level tagging"),Re()}catch(i){console.error("Error in handleSaveAlbum:",i),S(`Error in handleSaveAlbum: ${i}`),P(!1)}},wt=i=>{S(`Handling successful username update to: ${i}`),localStorage.setItem(fe.PUBLIC_USERNAME,i),ot(i),b(!1),S("Proceeding to save album after username update"),Re()},St=(i,I)=>{S(`Password dialog closed with option: ${i}, password: ${I?"******":"undefined"}`),i&&ce(i),I!==void 0&&z(I),ge(!1)},Tt=()=>{S("Opening password dialog"),ge(!0)},$t=()=>{S("Add photos button clicked"),de(o)},vt=()=>{C(!f)},Ce=i=>{i(),C(!1)};u.useEffect(()=>{const i=I=>{const j=I.target;f&&!j.closest(".settings-dropdown-container")&&C(!1)};return f&&document.addEventListener("mousedown",i),()=>{document.removeEventListener("mousedown",i)}},[f]);const Ee=x||c||r,It=v.length>0||G.length>0,At=m.size>0||J.size>0,Pt=ve.useMemo(()=>{const i=m.size+J.size;return S(`Total selected files count updated: ${i}`),i},[m.size,J.size,S]);return e.jsxs(e.Fragment,{children:[e.jsx(Xt,{}),e.jsx(Zt,{children:e.jsxs(Lt,{children:[e.jsx(es,{href:"my-albums.html",children:t("My Albums")}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[se===!0&&e.jsxs("div",{className:"settings-dropdown-container",style:{position:"relative",display:"flex",alignItems:"center"},children:[e.jsx("button",{onClick:vt,disabled:x||c||r,style:{background:"none",border:"none",cursor:x||c||r?"not-allowed":"pointer",padding:"8px",borderRadius:"4px",display:"flex",alignItems:"center",justifyContent:"center",color:x||c||r?"#ccc":"#666",fontSize:"18px",transition:"all 0.2s ease",backgroundColor:f?"#f0f0f0":"transparent",opacity:x||c||r?.5:1},onMouseEnter:i=>{!f&&!x&&!c&&!r&&(i.currentTarget.style.backgroundColor="#f8f9fa")},onMouseLeave:i=>{!f&&!x&&!c&&!r&&(i.currentTarget.style.backgroundColor="transparent")},title:t("Album Settings"),children:"⚙️"}),f&&!x&&!c&&!r&&e.jsxs(ts,{children:[e.jsx(ke,{onClick:()=>Ce(xt),children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[e.jsx("span",{children:t(n?"Remove From Public Profile":"Add To Public Profile")}),e.jsx("span",{style:{fontSize:"12px",color:n?"#28a745":"#6c757d",fontWeight:"bold"},children:n?"✓":"○"})]})}),e.jsx(ke,{onClick:()=>Ce(ht),children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[e.jsx("span",{children:t(d?"Allow Additions":"Do Not Allow Additions")}),e.jsx("span",{style:{fontSize:"12px",color:d?"#28a745":"#6c757d",fontWeight:"bold"},children:d?"✓":"○"})]})}),e.jsx(ke,{onClick:()=>Ce(bt),children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[e.jsx("span",{children:t(te?"Allow Removals":"Do Not Allow Removals")}),e.jsx("span",{style:{fontSize:"12px",color:te?"#28a745":"#6c757d",fontWeight:"bold"},children:te?"✓":"○"})]})}),e.jsx(ke,{onClick:()=>Ce(Tt),children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[e.jsx("span",{children:t("Album Password Policy")}),e.jsx("span",{style:{fontSize:"12px",color:s!=="NoPassword"?"#28a745":"#6c757d",fontWeight:"bold"},children:s!=="NoPassword"?"✓":"○"})]})})]})]}),e.jsx(Ke,{$primary:!0,onClick:yt,disabled:x||c||r,style:{minWidth:"120px",fontSize:"14px",padding:"8px 16px"},children:t(x?"Saving...":"Save Album")})]})]})}),e.jsxs(ss,{$isRTL:l,children:[e.jsx("div",{style:{marginTop:L&&se===!0?"3px":"0"},children:e.jsx(Ns,{showFolderDetails:L,isCreator:se,folderName:Z,setFolderName:a,folderDescription:Y,setFolderDescription:N,isSavingAlbum:x||c})}),(c||_.totalFiles>0&&(_.filesUploading>0||_.filesProcessing>0||_.filesComplete<_.totalFiles))&&e.jsx(ns,{progressTracker:_,isRTL:_e(g)==="rtl",variant:"detailed",context:"saving",isUploading:c,showSuccessMessage:!1,showErrorMessage:!0,customMessages:{error:t("Some photos could not be processed. You can continue with the successfully processed photos.")}}),e.jsx("input",{ref:H,id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:i=>Se(i,ze),style:{display:"none"}}),L&&se===!0&&It&&e.jsxs(Xs,{t,isRTL:l,children:[G.length>0&&e.jsx("div",{style:{marginBottom:"32px"},children:e.jsx(Ls,{existingFiles:G,selectedExistingIndices:J,onToggleSelection:ct,onSelectAll:dt,onDeselectAll:ut,onDeleteFile:lt,disabled:Ee,isCreator:se,participantsCanDeleteItems:te,t,isRTL:l})}),e.jsx(Zs,{selectedPhotos:v,selectedPhotoIndices:m,onToggleSelection:pt,onSelectAll:ft,onDeselectAll:gt,onRemovePhoto:nt,onDeleteAll:mt,disabled:Ee,t,isRTL:l}),e.jsx("div",{style:{marginTop:At?"32px":"16px"},children:e.jsx(Vs,{tagsManager:at,disabled:Ee,enhancedLog:S},`tags-${Pt}`)})]}),e.jsx(_s,{isSavingAlbum:x,savingProgress:K}),e.jsx(rs,{children:e.jsx(Ke,{onClick:$t,disabled:x||c||r,children:t(c?"Uploading...":"Add More Photos")})}),e.jsx(os,{t,language:g,usernameManager:h,onSuccess:wt}),e.jsx(Cs,{isOpen:ne,onClose:St,initialOption:s,initialPassword:ie}),e.jsx(ks,{debugMessages:k,t,isRTL:l,textDirection:l?"rtl":"ltr"})]})]})},tr=()=>e.jsx(Rt,{children:e.jsx(er,{})});zt.createRoot(document.getElementById("root")).render(e.jsx(tr,{}));
