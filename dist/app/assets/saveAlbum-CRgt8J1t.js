import{d as v,u as xe,a as u,j as e,g as ze,h as we,L as be,i as rt,m as hs,s as xs,k as ms,l as bs,f as Ce,n as ws,r as ke,o as ve,R as ys,I as Ts,p as vs}from"./utils-D_vKTXxl.js";import{P as Ss,S as $s,e as Ps,V as Is,f as As,g as bt,h as wt,M as js,C as yt,i as ks,j as Cs,F as ot,k as at,l as Ds,m as Fs,G as Tt,n as vt,o as St,p as $t,q as Es,r as _s,B as Qe,s as Pt,t as Ns}from"./styled-components-CJQVslbX.js";import{u as zs,U as Rs}from"./useUsernameManagement-Dn9s11nt.js";import{u as Os,U as Ms}from"./useFileUploadProcessor-DuuZRp-o.js";import{F as Bs}from"./types-Cxncrjqw.js";import{L as Us}from"./LazyImage-CcXXPPp3.js";import{g as nt,c as Ge}from"./folderStructureUtils-BmdkosLC.js";const P={colors:{primary:"#007bff",primaryDark:"#0056b3",secondary:"#6c757d",success:"#4caf50",danger:"#e53935",warning:"#ff9800",white:"#fff",text:{primary:"#333",secondary:"#666",light:"#777"},background:{primary:"#f9fafb",highlight:"#f0f7ff"},border:"#ddd"},spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px"},borderRadius:{small:"4px",medium:"8px"},boxShadow:{lg:"0 4px 10px rgba(0,0,0,0.08)"}},Gs=v.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10000;
`,Ws=v.div`
  background-color: ${P.colors.white};
  border-radius: ${P.borderRadius.medium};
  box-shadow: ${P.boxShadow.lg};
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
  scrollbar-color: ${P.colors.border} transparent;
  
  /* Custom scrollbar for webkit browsers */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${P.colors.border};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${P.colors.secondary};
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
    border-radius: ${P.borderRadius.small};
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
`,Ks=v.div`
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
`,Hs=v.div`
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
`,qs=v.h3`
  font-size: 24px;
  font-weight: 600;
  color: ${P.colors.text.primary};
  margin: 0 0 ${P.spacing.lg} 0;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 22px;
    margin: 0 0 ${P.spacing.md} 0;
  }
  
  @media (max-height: 700px) {
    font-size: 20px;
    margin: 0 0 ${P.spacing.md} 0;
  }
  
  @media (max-width: 480px) {
    font-size: 18px;
  }
`,Js=v.p`
  margin-bottom: ${P.spacing.lg};
  font-size: 16px;
  color: ${P.colors.text.secondary};
  line-height: 1.5;
  
  @media (max-width: 768px) {
    margin-bottom: ${P.spacing.md};
    font-size: 15px;
  }
  
  @media (max-height: 700px) {
    margin-bottom: ${P.spacing.sm};
    font-size: 14px;
  }
`,lt=v.div`
  margin-bottom: ${P.spacing.lg};
`,dt=v.label`
  display: block;
  margin-bottom: ${P.spacing.sm};
  font-size: 14px;
  font-weight: 500;
  color: ${P.colors.text.primary};
`,Ys=v.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${P.colors.border};
  border-radius: ${P.borderRadius.small};
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${P.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  &::placeholder {
    color: ${P.colors.text.light};
  }
`,Qs=v.div`
  display: flex;
  flex-direction: column;
  gap: ${P.spacing.md};
  margin-bottom: ${P.spacing.xl};
`,Vs=v.div`
  border: 2px solid ${t=>t.$isSelected?P.colors.primary:P.colors.border};
  border-radius: ${P.borderRadius.medium};
  padding: ${P.spacing.lg};
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${t=>t.$isSelected?P.colors.background.highlight:P.colors.white};
  display: flex;
  align-items: center;
  gap: ${P.spacing.lg};
  
  @media (max-width: 768px) {
    padding: ${P.spacing.md};
    gap: ${P.spacing.md};
  }
  
  @media (max-width: 480px) {
    padding: ${P.spacing.sm};
    gap: ${P.spacing.sm};
  }
  
  @media (max-height: 700px) {
    padding: ${P.spacing.sm};
    gap: ${P.spacing.sm};
  }
`,Xs=v.div`
  flex: 1;
`,Zs=v.div`
  margin-bottom: ${P.spacing.xs};
`,Ls=v.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${P.colors.primary};
  flex-shrink: 0;
`,ei=v.label`
  font-size: 16px;
  font-weight: 500;
  color: ${P.colors.text.primary};
  cursor: pointer;
  display: block;
`,ti=v.div`
  font-size: 14px;
  color: ${P.colors.text.secondary};
  margin-top: ${P.spacing.xs};
`,si=v.div`
  color: ${P.colors.warning};
  font-size: 12px;
  font-style: italic;
  margin-top: ${P.spacing.xs};
  font-weight: 500;
`,ii=v.div`
  display: flex;
  gap: ${P.spacing.sm};
  justify-content: center;
  margin-top: ${P.spacing.xl};
`,ct=v.button`
  background-color: ${t=>t.$variant==="danger"?P.colors.danger:t.$variant==="secondary"?"transparent":t.$variant==="success"?P.colors.success:P.colors.primary};
  color: ${t=>t.$variant==="secondary"?P.colors.primary:P.colors.white};
  border: ${t=>t.$variant==="secondary"?`1px solid ${P.colors.primary}`:"none"};
  padding: ${t=>t.$size==="small"?"8px 16px":t.$size==="large"?"16px 32px":"12px 24px"};
  border-radius: ${P.borderRadius.medium};
  cursor: ${t=>t.disabled?"not-allowed":"pointer"};
  font-size: ${t=>t.$size==="small"?"14px":t.$size==="large"?"18px":"16px"};
  font-weight: 500;
  transition: all 0.2s ease;
  opacity: ${t=>t.disabled?.6:1};
  min-width: 100px;

  &:hover:not(:disabled) {
    background-color: ${t=>t.$variant==="danger"?"#c62828":t.$variant==="secondary"?P.colors.background.highlight:t.$variant==="success"?"#388e3c":P.colors.primaryDark};
  }
`,ri=v.div`
  background-color: ${P.colors.background.primary};
  border-radius: ${P.borderRadius.medium};
  padding: ${P.spacing.md};
  margin: ${P.spacing.md} 0;
  border-left: 4px solid ${P.colors.primary};
  font-size: 14px;
  color: ${P.colors.text.secondary};
  line-height: 1.4;
  
  @media (max-width: 768px) {
    padding: ${P.spacing.sm};
    margin: ${P.spacing.sm} 0;
    font-size: 13px;
  }
  
  @media (max-height: 700px) {
    padding: ${P.spacing.xs};
    font-size: 12px;
  }
`,oi=[{value:"NotVisible",titleKey:"Password Required To See Or Save",descriptionKey:"Album will be completely hidden until correct password is entered"},{value:"Watermark",titleKey:"Watermarked And No Saving Without Password",descriptionKey:"Photos will be visible with watermarks, password required to save"},{value:"CannotBeSaved",titleKey:"Password Required To Save",descriptionKey:"Photos are visible but password required to download or save"},{value:"NoPassword",titleKey:"No Password",descriptionKey:"Album is fully public with no restrictions"}],It=({isOpen:t,onClose:g,initialOption:c="NoPassword",initialPassword:n=""})=>{const{t:a,language:B}=xe(),r=ze(B)==="rtl",[T,l]=u.useState(c),[A,S]=u.useState(n);if(u.useEffect(()=>{t&&(l(c),S(n))},[t,c,n]),!t)return null;const D=A.trim()==="",d=R=>{l(R)},i=R=>{R.target===R.currentTarget&&g()},G=R=>R!=="NoPassword";return e.jsxs(e.Fragment,{children:[e.jsx(Gs,{onClick:i}),e.jsx(Ws,{children:e.jsx(Ks,{children:e.jsxs(Hs,{$isRTL:r,children:[e.jsx(qs,{children:a("Album Password Policy")}),e.jsx(Js,{children:a("Configure password protection for your album. Choose how you want to restrict access to your photos.")}),e.jsxs(lt,{children:[e.jsx(dt,{children:a("Enter Password")}),e.jsx(Ys,{type:"text",placeholder:a("Enter password (optional)"),value:A,onChange:R=>S(R.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"})]}),e.jsxs(lt,{children:[e.jsx(dt,{children:a("Select Protection Level")}),e.jsx(Qs,{children:oi.map(R=>e.jsxs(Vs,{$isSelected:T===R.value,onClick:()=>d(R.value),children:[e.jsx(Ls,{type:"radio",name:"protection",checked:T===R.value,onChange:()=>d(R.value)}),e.jsxs(Xs,{children:[e.jsx(Zs,{children:e.jsx(ei,{children:a(R.titleKey)})}),e.jsx(ti,{children:a(R.descriptionKey)}),D&&G(R.value)&&T===R.value&&e.jsx(si,{children:a('⚠️ Will use "password" as default if left empty')})]})]},R.value))})]}),G(T)&&e.jsxs(ri,{children:[e.jsx("strong",{children:a("💡 Password Protection Info:")}),e.jsx("br",{}),a('If you leave the password field empty, "password" will be used as the default password. You can change this anytime in album settings.')]}),e.jsxs(ii,{children:[e.jsx(ct,{$variant:"secondary",onClick:()=>g(),children:a("Cancel")}),e.jsx(ct,{$variant:"primary",onClick:()=>{const R=D&&G(T)?"password":A;console.log(`Saving with option: ${T}, password: ${R.length>0?"********":"none"}`),g(T,R)},children:a("Save")})]})]})})})]})},ai=({debugMessages:t,t:g,isRTL:c,textDirection:n})=>t.length===0?null:e.jsxs("div",{style:{marginTop:"40px",background:"#fff3cd",padding:"16px",borderRadius:"8px",border:"1px solid #ffeeba",maxWidth:900,margin:"0 auto",direction:n},children:[e.jsx("h3",{style:{marginTop:0,fontSize:"18px",color:"#856404",textAlign:c?"right":"left"},children:g("Debug Log")}),e.jsx("pre",{style:{fontSize:"14px",color:"#856404",whiteSpace:"pre-wrap",maxHeight:"400px",overflow:"auto",textAlign:c?"right":"left"},children:t.map((a,B)=>e.jsx("div",{style:{marginBottom:"8px"},children:a},B))})]}),ni=`
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
`,li=(t,g,c,n,a,B,r,T,l,A,S,D,d,i)=>{const[G,R]=u.useState(null),[X,ie]=u.useState(null),se=async H=>{i(`Initializing folder ID with username: ${H}`);try{const V=new URLSearchParams(window.location.search).get("folderId");if(i(`Folder ID from URL: ${V||"null"}`),V){t(V),i(`Using existing folder ID: ${V}`);try{i(`Fetching details for folder: ${V}`);const b=await de(V,i);if(i("Folder details retrieved:",b),b){const $=`${H}_____${H}____Account`,p=b.creatorId===$;if(i(`User is creator of folder: ${p}, accountId: ${$}, creator: ${b.creatorId}`),c(p),p){i("User is creator, showing folder details"),n(!0),a(b.folderName),B(b.folderDescription),r(b.isOnPublicProfile),i(`Setting isOnPublicProfile: ${b.isOnPublicProfile}`),b.participantsCanAddItems!==void 0&&(T(b.participantsCanAddItems),i(`Setting participantsCanAddItems: ${b.participantsCanAddItems}`)),b.participantsCanDeleteItems!==void 0&&(d(b.participantsCanDeleteItems),i(`Setting participantsCanDeleteItems: ${b.participantsCanDeleteItems}`));const x=b.passwordPolicy;i(`Password policy from folder details: ${x}`),l(x),x!=="NoPassword"&&b.password&&A(b.password),i(`Set password protection option to: ${x}`)}else i("User is NOT the creator, hiding editable fields"),n(!1)}else i("No folder details retrieved, setting isCreator to true"),c(!0),n(!0)}catch(b){console.error("Error fetching folder details:",b),i(`Error fetching folder details: ${b}`),c(!1)}}else{const b=`${H}_____${rt()}____Folder`;i(`Creating new folder ID: ${b}`),t(b),i("Setting isCreator to true for new album"),c(!0),n(!0)}}catch(h){console.error("Folder ID initialization error:",h),i(`Folder ID initialization error: ${h}`),c(!1)}},de=async(H,h)=>{var V,b,$,p,x,F,_,W,le;h(`Fetching details for folder ID: ${H}`);try{const pe=await we();if(!pe)return h("No token available for fetching folder details"),null;h("Sending GraphQL query to fetch folder details");const me=await(await fetch(Ce,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${pe}`},body:JSON.stringify({query:ni,variables:{folderIds:[H],fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(h("Folder details API response:",me),me.errors)return console.error("GraphQL errors:",me.errors),h(`GraphQL errors: ${JSON.stringify(me.errors)}`),null;const N=((b=(V=me==null?void 0:me.data)==null?void 0:V.fetchFolders)==null?void 0:b.items)||[];if(h(`Found ${N.length} folder items`),N.length===0)return h("No folder items found"),null;const k=N[0];h("Retrieved folder data:",k);const K=((p=($=k.folderPosition)==null?void 0:$.profileIds)==null?void 0:p.some(O=>O.includes("Public____Profile")))||!1;h(`Folder is on public profile: ${K}`),h("Profile IDs:",(x=k.folderPosition)==null?void 0:x.profileIds);const I=(F=k.folderInviteParameters)==null?void 0:F.usingFolderInviteGrantsRightToAddItems;h(`Participants can add items: ${I}`);const J=(_=k.folderInviteParameters)==null?void 0:_.usingFolderInviteGrantsRightToRemoveItems;return h(`Participants can delete items: ${J}`),{creatorId:k.creatorId||"",folderName:k.folderName||"",folderDescription:k.folderDescription||"",passwordPolicy:((W=k.folderPassword)==null?void 0:W.policy)||"NoPassword",password:((le=k.folderPassword)==null?void 0:le.password)||"",isOnPublicProfile:K,participantsCanAddItems:I!==void 0?I:!0,participantsCanDeleteItems:J!==void 0?J:!1}}catch(pe){return console.error("Error in fetchFolderDetails:",pe),h(`Error in fetchFolderDetails: ${pe}`),null}},s=()=>{i("Attempting to restore photos from localStorage");try{const H=localStorage.getItem(be.SELECTED_PHOTOS);if(i(`Found stored photos: ${H?"yes":"no"}`),H)try{const h=JSON.parse(H);i(`Parsed ${h.length} photos from localStorage`),Array.isArray(h)&&h.length>0&&(g(h),i(`Restored ${h.length} photos to state (including original filenames)`))}catch(h){console.error("Error parsing stored photos:",h),i(`Error parsing stored photos: ${h}`)}}catch(H){console.error("Error restoring photos from storage:",H),i(`Error restoring photos from storage: ${H}`)}},oe=()=>{i("Testing S3 connection");try{xs?i("S3 client is available"):(console.error("S3 client not available"),i("S3 client not available"))}catch(H){console.error("S3 connection test error:",H),i(`S3 connection test error: ${H}`)}},ae=async()=>{var H;i("Starting component initialization");try{i("Checking login with refresh");const h=await we();if(!h){i("No token returned from login check, aborting initialization");return}try{const V=localStorage.getItem(be.PUBLIC_USERNAME);i(`Retrieved public username from localStorage: ${V||"null"}`),ie(V||null);const $=JSON.parse(atob(h.split(".")[1]))["cognito:username"];if($){i(`Extracted Cognito username from token: ${$}`),R($);const p=localStorage.getItem(be.SUB_ALBUM_DATA);if(i(`Sub-album data from localStorage: ${p||"null"}`),p)try{const x=JSON.parse(p);if(i("Parsed sub-album data:",x),x.isSubAlbum&&((H=x.selectedFileIds)==null?void 0:H.length)>0){i(`Valid sub-album data found with ${x.selectedFileIds.length} files`),S(!0),D(x.selectedFileIds),x.selectedPhotos&&x.selectedPhotos.length>0&&(i(`Found ${x.selectedPhotos.length} selected photos in sub-album data`),g(x.selectedPhotos)),n(!0),c(!0);const F=`${$}_____${rt()}____Folder`;i(`Generated new folder ID for sub-album: ${F}`),t(F)}else i("Invalid sub-album data, proceeding with normal initialization"),await se($)}catch(x){console.error("Error parsing sub-album data:",x),i(`Error parsing sub-album data: ${x}`),await se($)}else i("No sub-album data found, proceeding with normal folder initialization"),await se($)}else i("No Cognito username found in token")}catch(V){console.error("User data initialization error:",V),i(`User data initialization error: ${V}`)}s(),oe(),i("Component initialization completed")}catch(h){console.error("Initialization error:",h),i(`Initialization error: ${h}`)}};return u.useEffect(()=>{ae()},[]),{cognitoUsername:G,publicUsername:X,setPublicUsername:ie}},di=(t,g,c,n,a,B,r,T,l,A,S,D,d,i,G,R,X,ie,se,de,s,oe)=>{const ae=N=>(s(`Converting ${N.length} tags to API format`),N.map(k=>({TagType:k.TagType,tagTitle:k.tagTitle,subtags:k.subtags.map(K=>({TagType:k.TagType,tagTitle:K.tagTitle,subtagTitle:K.subtagTitle}))}))),H=N=>{s(`Save progress text: ${N}`);const k=document.getElementById("saveProgressText");k&&(k.innerText=N)},h=N=>{const k=document.getElementById("saveProgress");k?(k.style.width=`${N}%`,s(`Updated save progress bar: ${N}%`)):s("Progress bar element not found"),ie(N)},V=(N,k)=>{s(`Splitting array of ${N.length} items into chunks of ${k}`);const K=[];for(let I=0;I<N.length;I+=k)K.push(N.slice(I,I+k));return s(`Created ${K.length} chunks`),K},b=N=>{const k=new Set;return N.filter(K=>k.has(K.fileId)?(s(`Skipping duplicate file reference with ID: ${K.fileId}`),!1):(k.add(K.fileId),!0))},$=(N,k,K)=>{s("Creating folder position input WITHOUT folder-level tags"),s(`Profile visibility: ${T?"Public":"Only Me"}`);const I=T?[`${g}_____Public____Profile`]:["Only Me_____Only Me____Profile"];s(`Profile IDs: ${JSON.stringify(I)}`);let J=[];n&&a.length>0&&(s(`Creating file reference IDs for ${a.length} sub-album files`),J=a.map(Q=>{const Z=Q.split("_____");if(Z.length>=2){const he=Z[1].split("____")[0],ye=`${K}_____${he}____FileReference`;return s(`Created file reference ID for sub-album: ${ye}`),ye}return s(`Using original fileId as fallback: ${Q}`),Q})),s(`Created ${J.length} acceptedFileReferenceIds`);const O=S!=="NoPassword"?D:null;if(s(`Password protection: ${S}`),s(`Album password: ${O?"******":"null"}`),s(`Participants can add items: ${l}`),s(`Participants can delete items: ${A}`),!t)throw s("Error: folderId is null or undefined"),new Error("folderId is required to create folder position input");const Y=ms(t),te=bs(Y);return{currentTime:N,folderId:t,profileIds:I,folderPositionPoints:1,acceptedFileReferenceIds:J,folderInput:{folderAboutContactIds:[k],albumNanoId:te,folderName:B,folderDescription:r,folderPasswordInput:{password:O,policy:S},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:l,usingFolderInviteGrantsRightToRemoveItems:A,addedItemsNeedFolderCreatorApproval:!1}}}},p=(N,k,K)=>(s(`Creating file reference inputs with individual photo tags and original filenames for ${N.length} photos`),N.map((I,J)=>{var ce;const O=d.get(J)||[],Y=ae(O),te=I.originalFileName||I.fileName;if(s(`Photo ${J} (${I.fileName}): ${O.length} tags applied, display name: ${te}`),I.fileId)return s(`Using existing fileId for photo: ${I.fileId}`),{fileReferencesHolderId:t,currentTime:k,points:1,hasBeenDeleted:!1,selectedTagInputs:Y,fileId:I.fileId,fileDisplayName:te,fileInput:null};const Q=I.type==="video"||(ce=I.type)!=null&&ce.startsWith("video")?`Input/Video/${I.fileName}`:`Input/Image/${I.fileName}`,Z=`${g}_____${I.fileName}____File`;return s(`Created file reference for ${I.fileName}:`),s(`  - dataKey: ${Q}`),s(`  - fileId: ${Z}`),s(`  - fileDisplayName: ${te}`),s(`  - thumbnailDataKey: ${I.thumbnailDataKey||"undefined"}`),s(`  - size: ${I.size}`),s(`  - thumbnailSize: ${I.thumbnailSize||0}`),s(`  - duration: ${I.duration||"undefined"}`),s(`  - tags: ${O.length} tags selected for this photo`),{fileReferencesHolderId:t,currentTime:k,points:1,hasBeenDeleted:!1,selectedTagInputs:Y,fileId:Z,fileDisplayName:te,fileInput:{fileId:Z,ownerFileInput:{editorContactIds:[K],FileSharingOptionsEnum:"Anyone",dataKey:Q,thumbnailDataKey:I.thumbnailDataKey,dataInBytes:I.size,thumbnailDataInBytes:I.thumbnailSize||0,s3UploadedAt:k,durationInSeconds:I.duration},editorFileInput:{aboutContactIds:[K],captionText:"",numericFilterInputs:[]}}}})),x=N=>{const k=[];return R.forEach(K=>{const I=i.get(K)||[];if(I.length>0){const J=G[K];if(J){const O=J.dataKey.split("/"),Y=O[O.length-1],te=`${g}_____${Y}____File`,Q=J.fileName||Y,Z=ae(I);s(`Creating file reference for existing file ${K} (${Y}) with ${I.length} tags, display name: ${Q}`),k.push({fileReferencesHolderId:t,currentTime:N,points:1,hasBeenDeleted:!1,selectedTagInputs:Z,fileId:te,fileDisplayName:Q,fileInput:null})}}}),s(`Created ${k.length} file references for existing files with tags and filenames`),k},F=async N=>{var J,O;s("Sending folder-only mutation (no file references, no folder tags)");const k=await we();if(!k)throw s("No token available for saving album, aborting"),new Error("Authentication token not available");const K=`
      mutation MyMutation($folderPositionInputs: [FolderPositionInput!]) {
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items {
            id
          }
        }
      }
    `,I={folderPositionInputs:[N]};s("GraphQL folder-only mutation variables:",I);try{s("Sending API request to save folder");const Y=await fetch(Ce,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${k}`},body:JSON.stringify({query:K,variables:I})});s(`API response status: ${Y.status}`);const te=await Y.text();s(`API response raw text: ${te}`);const Q=JSON.parse(te);if(s("API response JSON:",Q),Q.errors)throw console.error("Folder save failed:",Q.errors),s("Folder save failed with errors:",Q.errors),new Error("Failed to save folder");return s("Folder saved successfully"),((O=(J=Q.data)==null?void 0:J.changeFiles)==null?void 0:O.items)||[]}catch(Y){throw console.error("Error in sendFolderOnlyMutation:",Y),s(`Error in sendFolderOnlyMutation: ${Y}`),Y}},_=async N=>{var J,O,Y,te,Q;s(`Sending file references-only mutation with ${N.length} items (each with individual tags and filenames)`);const k=await we();if(!k)throw s("No token available for saving file references, aborting"),new Error("Authentication token not available");const K=`
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
    `,I={updatedFileReferenceInputs:N};s("GraphQL file references-only mutation variables (first item):",N.length>0?N[0]:"No items");try{s("Sending API request to save file references with individual tags and filenames");const Z=await fetch(Ce,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${k}`},body:JSON.stringify({query:K,variables:I})});s(`API response status: ${Z.status}`);const ce=await Z.text();s(`API response raw text: ${ce.substring(0,500)}...`);const he=JSON.parse(ce);if(s("API response JSON items count:",((Y=(O=(J=he.data)==null?void 0:J.changeFiles0)==null?void 0:O.items)==null?void 0:Y.length)||0),he.errors)throw console.error("File references save failed:",he.errors),s("File references save failed with errors:",he.errors),new Error("Failed to save file references");return s("File references chunk saved successfully with individual photo tags and filenames"),((Q=(te=he.data)==null?void 0:te.changeFiles0)==null?void 0:Q.items)||[]}catch(Z){throw console.error("Error in sendFileReferencesOnlyMutation:",Z),s(`Error in sendFileReferencesOnlyMutation: ${Z}`),Z}},W=async(N,k)=>{var O,Y,te,Q,Z,ce,he,ye,je;s(`Sending final chunk with folder mutation (${N.length} file references with filenames, no folder tags)`);const K=await we();if(!K)throw s("No token available for saving final chunk, aborting"),new Error("Authentication token not available");const I=`
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
    `,J={folderPositionInputs:[k],updatedFileReferenceInputs:N};s("GraphQL final mutation variables (folder + last chunk with filenames, no folder tags)");try{s("Sending API request for final save with folder (no folder tags, with filenames)");const ge=await fetch(Ce,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${K}`},body:JSON.stringify({query:I,variables:J})});s(`API response status: ${ge.status}`);const o=await ge.text();s(`API response raw text: ${o.substring(0,500)}...`);const f=JSON.parse(o);if(s("API response JSON:",{fileReferencesCount:((te=(Y=(O=f.data)==null?void 0:O.changeFiles0)==null?void 0:Y.items)==null?void 0:te.length)||0,folderItems:((Z=(Q=f.data)==null?void 0:Q.changeFiles)==null?void 0:Z.items)||[]}),f.errors)throw console.error("Final save failed:",f.errors),s("Final save failed with errors:",f.errors),new Error("Failed to complete album save");return s("Final chunk and folder saved successfully (with individual photo tags and filenames)"),{fileReferences:((he=(ce=f.data)==null?void 0:ce.changeFiles0)==null?void 0:he.items)||[],folderPositions:((je=(ye=f.data)==null?void 0:ye.changeFiles)==null?void 0:je.items)||[]}}catch(ge){throw console.error("Error in sendFinalChunkWithFolderMutation:",ge),s(`Error in sendFinalChunkWithFolderMutation: ${ge}`),ge}},le=async()=>(s("Validating required data"),await we()?g?t?(s("All required data validated successfully"),!0):(s("No folder ID, validation failed"),!1):(s("No Cognito username, validation failed"),!1):(s("No token available, validation failed"),!1)),pe=()=>{s("Handling successful save"),ws(se,de,[be.SELECTED_PHOTOS,be.SUB_ALBUM_DATA],s),s("Album data cleared"),H(oe("Album saved successfully!")),sessionStorage.setItem("album_just_saved","true"),s("Set 'album_just_saved' flag in sessionStorage"),s("Setting timeout for redirect to my-albums.html"),setTimeout(()=>{s("Redirecting to my-albums.html"),ke("my-albums.html")},1e3)},Pe=async(N,k)=>{s("Starting chunked save process (individual photo tags with filenames, no folder tags, including existing files with tags)");try{H(oe("Processing files in chunks..."));const K=48;if(k.length===0)s("No file references to process, saving only folder position (no folder tags)"),await F(N);else{const I=b(k);s(`After removing duplicates, processing ${I.length} unique file references`);const J=V(I,K);s(`Split file references into ${J.length} chunks of max size ${K}`);for(let O=0;O<J.length;O++){const Y=J[O];s(`Processing chunk ${O+1} of ${J.length} with ${Y.length} file references`);const te=O/J.length*80;ie(10+te),h(10+te),O<J.length-1?(H(oe("Saving files: chunk {{chunkNumber}} of {{totalChunks}}...",{chunkNumber:O+1,totalChunks:J.length})),await _(Y)):(H(oe("Finalizing album...")),await W(Y,N))}}ie(100),h(100),H(oe("Album saved successfully!")),pe()}catch(K){console.error("Error in chunked save process:",K),s(`Error in chunked save process: ${K}`),H(oe("Error: {{error}}",{error:String(K)})),X(!1)}};return{saveAlbumDirectly:async()=>{s("Starting direct album save with individual photo tagging, existing file tagging, and original filenames"),s(`Photo tags map: ${d.size} photos have tags applied`),s(`Existing file tags map: ${i.size} existing files have tags applied`),X(!0),ie(5);try{if(s("Validating required data for save"),!await le()){s("Required data validation failed, aborting save"),X(!1);return}const N=Math.floor(Date.now()/1e3),k=`${g}_____${g}____Account`,I=t.split("_____")[1].split("____")[0];s(`Save timestamp: ${N}`),s(`Account ID: ${k}`),s(`Folder ID: ${t}`),s(`Folder target item identifier: ${I}`),s("Creating folder position input (no folder tags)");const J=$(N,k,I);s("Folder position input created:",J);let O=[];const Y=c.filter(Q=>Q.status==="complete");if(s(`Found ${Y.length} valid photos with 'complete' status`),Y.length>0){const Q=Y.filter(ce=>!ce.fileId);s(`Found ${Q.length} new uploads to move from temp to public folder`),Q.length>0&&(s("Moving files from temp to public folder"),await hs(Q,h,s)),s("Creating file reference inputs for uploads with individual photo tags and original filenames");const Z=p(Y,N,k);s(`Created ${Z.length} file reference inputs for uploads`,Z),O=O.concat(Z)}const te=x(N);if(te.length>0&&(s(`Adding ${te.length} existing file references with tags and filenames`),O=O.concat(te)),n&&a.length>0){s(`Adding ${a.length} existing file references for sub-album`);const Q=a.map(Z=>{s(`Creating file reference for existing sub-album file ID: ${Z}`);const ce=[],he=Z.split("_____"),ye=he.length>=2?he[1].split("____")[0]:Z;return{fileReferencesHolderId:t,currentTime:N,points:1,hasBeenDeleted:!1,selectedTagInputs:ce,fileId:Z,fileDisplayName:ye,fileInput:null}});s(`Created ${Q.length} file reference inputs for sub-album files`,Q),O=O.concat(Q)}s(`Total file reference inputs: ${O.length}`),s("Sending GraphQL mutations with chunked file references (individual photo tags, existing file tags, and original filenames)"),await Pe(J,O)}catch(N){console.error("Error in saveAlbumDirectly:",N),s(`Error in saveAlbumDirectly: ${N}`),X(!1)}}}},ci=v.div`
  margin: 32px 0;
`,At=v.div`
  margin-bottom: 24px;
`,jt=v.h3`
  margin: 0 0 16px 0;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  display: flex;
  align-items: center;
  gap: 12px;
`,kt=v.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  min-height: 32px;
`,Ct=v.button`
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
`,pi=v(Ct)`
  font-size: 12px;
  padding: 6px 12px;
  border-radius: 16px;
`,Dt=v.button`
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
`,ui=v.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 16px;
`,Ft=v.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 16px;
`,Et=v.button`
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
`,gi=v.div`
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
`,fi=v.input`
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
`,pt=v.button`
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
`,hi=ve.memo(({tag:t,isApplied:g,isDisplayed:c,isBeingDeleted:n,disabled:a,onTagClick:B,onDeleteTag:r,getTagDisplayText:T})=>{const{t:l}=xe(),[A,S]=u.useState(!1),[D,d]=u.useState(!1);u.useEffect(()=>{const G=()=>{d("ontouchstart"in window||navigator.maxTouchPoints>0)};return G(),window.addEventListener("resize",G),()=>window.removeEventListener("resize",G)},[]);const i=D?c&&!a&&!n:A&&c&&!a&&!n;return e.jsxs(Ct,{$isApplied:g,$isDisplayed:c,$isBeingDeleted:n,disabled:a,onClick:()=>B(t),onMouseEnter:()=>!D&&c&&S(!0),onMouseLeave:()=>!D&&c&&S(!1),children:[e.jsx("span",{style:{paddingRight:i?"20px":"0"},children:T(t)}),i&&e.jsx(Dt,{$isMobile:D,onClick:G=>{G.stopPropagation(),r(t.id)},disabled:n,title:l("Delete tag"),children:"×"})]})}),xi=ve.memo(({subtag:t,isApplied:g,isBeingDeleted:c,disabled:n,onSubtagClick:a,onDeleteSubtag:B})=>{const{t:r}=xe(),[T,l]=u.useState(!1),[A,S]=u.useState(!1);u.useEffect(()=>{const d=()=>{S("ontouchstart"in window||navigator.maxTouchPoints>0)};return d(),window.addEventListener("resize",d),()=>window.removeEventListener("resize",d)},[]);const D=A?g&&!n&&!c:T&&g&&!n&&!c;return e.jsxs(pi,{$isApplied:g,$isBeingDeleted:c,disabled:n,onClick:()=>a(t),onMouseEnter:()=>!A&&g&&l(!0),onMouseLeave:()=>!A&&g&&l(!1),children:[e.jsx("span",{style:{paddingRight:D?"20px":"0"},children:t.subtagTitle}),D&&e.jsx(Dt,{$isMobile:A,onClick:d=>{d.stopPropagation(),B(t.id)},disabled:c,title:r("Delete subtag"),children:"×"})]})}),_t=({value:t,onChange:g,onSubmit:c,onCancel:n,isSubmitting:a,placeholder:B="Enter tag name..."})=>{const{t:r}=xe(),T=u.useRef(null);u.useEffect(()=>{T.current&&T.current.focus()},[]);const l=A=>{A.key==="Enter"?c():A.key==="Escape"&&n()};return e.jsxs(gi,{children:[e.jsx(fi,{ref:T,type:"text",value:t,onChange:A=>g(A.target.value),onKeyDown:l,placeholder:r(B),disabled:a}),e.jsx(pt,{onClick:c,disabled:!t.trim()||a,title:r("Add (Enter)"),children:a?"...":"✓"}),e.jsx(pt,{onClick:n,disabled:a,title:r("Cancel (Escape)"),children:"×"})]})},Nt=ve.memo(({tagsManager:t,disabled:g=!1,enhancedLog:c})=>{const{t:n}=xe(),{tags:a,displayedTagId:B,isLoadingTags:r,tagIdBeingDeleted:T,isAddingNewTag:l,newTagTitle:A,isSubmittingNewTag:S,toggleTagOnSelectedFiles:D,setDisplayedTag:d,isTagAppliedToSelected:i,deleteTag:G,startAddingNewTag:R,cancelAddingNewTag:X,submitNewTag:ie,setNewTagTitle:se,getAppliedTagsForSelected:de,hasSelectedFiles:s}=t;if(!s())return null;const oe=ve.useCallback(b=>{if(!i(b))return b.tagTitle;const x=de().find(_=>_.tagTitle===b.tagTitle);if(!x||x.subtags.length===0)return b.tagTitle;const F=x.subtags.map(_=>_.subtagTitle).join(" || ");return`${b.tagTitle}  |  ${F}`},[i,de]);ve.useEffect(()=>{const b=a.filter(p=>i(p)),$=de();c(`TagsDisplay render - ${b.length} tags applied to all selected files`),c("Applied tags with subtags:",$)},[a,i,de,c]);const ae=b=>{if(g)return;const $=i(b);c(`Tag "${b.tagTitle}" clicked - current state: ${$?"applied to all":"not applied to all"}`),D(b),b.subtags&&b.subtags.length>0&&d($?null:b.id),c(`After toggle - new state: ${$?"removed from all":"applied to all"}`)},H=async b=>{if(g)return;c(`Delete tag initiated: ${b}`);const $=await G(b);c($?`Tag successfully deleted: ${b}`:`Failed to delete tag: ${b}`)},h=async()=>{await ie()||c("Failed to submit new tag")},V=ve.useMemo(()=>[...a].sort((b,$)=>b.points!==$.points?$.points-b.points:$.updatedAt-b.updatedAt),[a]);return e.jsxs(ci,{children:[e.jsxs(At,{children:[e.jsx(jt,{children:n("Apply tags to selected files")}),e.jsx(kt,{children:r?e.jsx(ui,{children:n("Loading tags...")}):e.jsxs(e.Fragment,{children:[V.map(b=>{const $=i(b);return e.jsx(hi,{tag:b,isApplied:$,isDisplayed:B===b.id,isBeingDeleted:T===b.id,disabled:g,onTagClick:ae,onDeleteTag:H,getTagDisplayText:oe},b.id)}),l?e.jsx(_t,{value:A,onChange:se,onSubmit:h,onCancel:X,isSubmitting:S,placeholder:n("Enter tag name...")}):e.jsx(Et,{disabled:g,onClick:R,children:n("+ Add Tag")}),V.length===0&&!l&&e.jsx(Ft,{children:n("No tags available")})]})})]}),B&&e.jsx(mi,{tagsManager:t,disabled:g,enhancedLog:c}),e.jsx("div",{style:{marginTop:"24px",padding:"20px 24px",background:"linear-gradient(135deg, #e7f3ff 0%, #f0f8ff 100%)",borderRadius:"12px",fontSize:"13px",color:"#0c5aa6",border:"1px solid #b3d9ff",boxShadow:"0 4px 12px rgba(0, 123, 255, 0.08)"},children:e.jsxs("div",{style:{lineHeight:"2.2"},children:[e.jsxs("div",{style:{marginBottom:"8px"},children:[e.jsx("strong",{style:{color:"#28a745"},children:"🟢"}),"  ",n("Most recently clicked tag (showing subtags)")]}),e.jsxs("div",{style:{marginBottom:"8px"},children:[e.jsx("strong",{style:{color:"#333333"},children:"⚫"}),"  ",n("Applied to selected files")]}),e.jsxs("div",{children:[e.jsx("strong",{style:{color:"#6c757d"},children:"⚪"}),"  ",n("Available but not applied to all selected files")]})]})})]})}),mi=ve.memo(({tagsManager:t,disabled:g=!1,enhancedLog:c})=>{var H;const{t:n}=xe(),{displayedTagId:a,subtagIdBeingDeleted:B,isAddingNewSubtag:r,newSubtagTitle:T,isSubmittingNewSubtag:l,toggleSubtagOnSelectedFiles:A,isSubtagAppliedToSelected:S,deleteSubtag:D,startAddingNewSubtag:d,cancelAddingNewSubtag:i,submitNewSubtag:G,setNewSubtagTitle:R,tags:X}=t,ie=a?((H=X.find(h=>h.id===a))==null?void 0:H.subtags)||[]:[],se=X.find(h=>h.id===a),de=h=>{g||(c(`Subtag "${h.subtagTitle}" clicked - current state: ${S(h)?"applied to all":"not applied to all"}`),A(h))},s=async h=>{if(g)return;c(`Delete subtag initiated: ${h}`);const V=await D(h);c(V?`Subtag successfully deleted: ${h}`:`Failed to delete subtag: ${h}`)},oe=async()=>{await G()||c("Failed to submit new subtag")};if(!se)return null;const ae=ve.useMemo(()=>[...ie].sort((h,V)=>h.points!==V.points?V.points-h.points:V.updatedAt-h.updatedAt),[ie]);return e.jsxs(At,{children:[e.jsx(jt,{children:n('Subtags for "{{tagTitle}}"',{tagTitle:se.tagTitle})}),e.jsxs(kt,{children:[ae.map(h=>e.jsx(xi,{subtag:h,isApplied:S(h),isBeingDeleted:B===h.id,disabled:g,onSubtagClick:de,onDeleteSubtag:s},h.id)),r?e.jsx(_t,{value:T,onChange:R,onSubmit:oe,onCancel:i,isSubmitting:l,placeholder:n("Enter subtag name...")}):e.jsx(Et,{disabled:g,onClick:d,children:n("+ Add Subtag")}),ae.length===0&&!r&&e.jsx(Ft,{children:n("No subtags available")})]})]})}),bi=({photoTags:t,isSelected:g=!1,onToggleSelection:c,fileName:n,showFileName:a=!1})=>{const{t:B}=xe(),T=(S=>S.length===0?"":S.map(D=>{if(D.subtags.length>0){const d=D.subtags.map(i=>i.subtagTitle).join(", ");return`${D.tagTitle}: ${d}`}return D.tagTitle}).join(" • "))(t),l=t.length>0;return a&&n||l||g?e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"4px"},children:[a&&n&&e.jsx("div",{style:{fontSize:"11px",fontWeight:"600",color:"#333",padding:"4px 8px",backgroundColor:g?"#e3f2fd":"#f8f9fa",borderRadius:"4px",border:`1px solid ${g?"#90caf9":"#e9ecef"}`,textAlign:"center",wordBreak:"break-word",lineHeight:"1.2",transition:"all 0.2s ease"},children:n}),e.jsx("div",{style:{background:l?"linear-gradient(135deg, rgba(0, 123, 255, 0.95) 0%, rgba(0, 123, 255, 0.85) 100%)":"rgba(108, 117, 125, 0.6)",color:"white",padding:l?"8px 12px":"6px 12px",borderRadius:l?"8px":"6px",fontSize:l?"11px":"10px",cursor:c?"pointer":"default",backdropFilter:"blur(6px)",boxShadow:l?"0 4px 12px rgba(0, 123, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)":"0 2px 8px rgba(0, 0, 0, 0.2)",border:l?"1px solid rgba(255, 255, 255, 0.2)":"none",transition:"all 0.3s ease",lineHeight:"1.3",minHeight:"32px",display:"flex",alignItems:"center",wordBreak:"break-word"},onClick:c,onMouseEnter:S=>{l&&(S.currentTarget.style.transform="translateY(-1px)",S.currentTarget.style.boxShadow="0 6px 16px rgba(0, 123, 255, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3)")},onMouseLeave:S=>{l&&(S.currentTarget.style.transform="translateY(0)",S.currentTarget.style.boxShadow="0 4px 12px rgba(0, 123, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)")},children:l?e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",width:"100%",flexWrap:"wrap"},children:[e.jsx("span",{style:{fontSize:"12px",opacity:.9,flexShrink:0},children:"🏷️"}),e.jsx("span",{style:{fontWeight:"600",textShadow:"0 1px 2px rgba(0, 0, 0, 0.3)",flex:1},children:T})]}):e.jsx("div",{style:{opacity:.8,fontStyle:"italic",textAlign:"center",width:"100%",fontSize:"10px"},children:B("No tags applied")})})]}):null},ut={traditional:{padding:"20px",border:"2px dashed #007bff",borderRadius:"12px",backgroundColor:"#fff",boxShadow:"0 2px 8px rgba(0, 0, 0, 0.04)"},horizontal:{display:"flex",overflowX:"auto",gap:"16px",padding:"20px",border:"2px dashed #007bff",borderRadius:"12px",backgroundColor:"#fff",boxShadow:"0 2px 8px rgba(0, 0, 0, 0.04)",scrollbarWidth:"thin",scrollbarColor:"#007bff #f8f9fa",scrollBehavior:"smooth",WebkitOverflowScrolling:"touch"}},gt={traditional:{display:"flex",flexDirection:"column",gap:"8px",minWidth:"0"},horizontal:{display:"flex",flexDirection:"column",gap:"8px",minWidth:"180px",maxWidth:"180px",flexShrink:0}},Ve=ve.memo(({selectedPhotos:t,selectedPhotoIndices:g,isSavingAlbum:c,onRemovePhoto:n,onTogglePhotoSelection:a,photoTagsMap:B,columns:r="1",isMultipleAlbumMode:T=!1})=>{const{t:l}=xe(),A=u.useMemo(()=>{if(T&&r==="horizontal")return ut.horizontal;const d=parseInt(r,10),i=isNaN(d)||d<1?1:Math.min(d,5);return{...ut.traditional,display:"grid",gridTemplateColumns:`repeat(${i}, 1fr)`,gap:"16px"}},[T,r]),S=u.useMemo(()=>T&&r==="horizontal"?gt.horizontal:gt.traditional,[T,r]),D=u.useMemo(()=>T&&r==="horizontal"?"photo-card-horizontal":"photo-card-traditional",[T,r]);return t.length===0?null:e.jsx(e.Fragment,{children:e.jsx("div",{style:A,className:"photo-grid",children:t.map((d,i)=>{var X,ie;const G=g.has(i),R=B.get(i)||[];return e.jsxs("div",{style:S,children:[e.jsxs(Ss,{"data-selected":G?"true":"false",className:`${D} ${G?"selected":""}`,onClick:()=>a(i),children:[G&&!c&&e.jsx("button",{onClick:se=>{se.stopPropagation(),confirm(l("Are you sure you want to remove this photo?"))&&n(i)},className:"photo-delete-button",title:l("Remove photo"),children:"×"}),d.status!=="complete"&&e.jsx($s,{$status:d.status,children:d.status==="error"?"✕":d.status==="uploading"?"↑":d.status==="processing"?"⚙️":"•"}),e.jsxs(Ps,{className:`media-preview ${G?"selected":""}`,children:[d.type==="video"||(X=d.type)!=null&&X.startsWith("video")?e.jsx(Is,{src:d.s3PreviewUrl,controls:!0,className:"media-item"}):e.jsx(As,{src:d.s3PreviewUrl,alt:d.fileName,className:"media-item"}),(d.status==="uploading"||d.status==="processing")&&e.jsx(bt,{$bottom:"4px",$left:"4px",$right:"4px",$height:"4px",children:e.jsx(wt,{$progress:d.progress,$status:d.status})})]}),e.jsxs("div",{className:"file-info-overlay",children:[(ie=d.type)!=null&&ie.startsWith("video")?l("Video"):l("Image"),d.size&&` • ${(d.size/1024/1024).toFixed(1)} ${l("MB")}`,d.duration&&` • ${d.duration}${l("s")}`]}),T&&r==="horizontal"&&G&&e.jsx("div",{className:"selection-indicator",children:l("SELECTED")}),d.status==="error"&&d.errorMessage&&e.jsxs(js,{$type:"error",children:[l("Error"),": ",d.errorMessage.length>40?d.errorMessage.substring(0,37)+"...":d.errorMessage]})]}),e.jsx("div",{className:`photo-info ${T&&r==="horizontal"?"horizontal":"traditional"}`,children:e.jsx(bi,{photoTags:R,isSelected:G,onToggleSelection:()=>a(i),fileName:d.originalFileName||d.fileName,showFileName:!0})})]},i)})})})});Ve.displayName="PhotoHandler";const zt=ve.memo(({isSavingAlbum:t,savingProgress:g})=>{const{t:c}=xe();return t?e.jsxs(yt,{children:[e.jsx(ks,{children:c("Saving Album")}),e.jsx(Cs,{id:"saveProgressText",children:c("Moving files...")}),e.jsx(bt,{children:e.jsx(wt,{id:"saveProgress",$progress:g/100})})]}):null});zt.displayName="SavingProgressComponent";const Rt=ve.memo(({showFolderDetails:t,isCreator:g,folderName:c,setFolderName:n,folderDescription:a,setFolderDescription:B,isSavingAlbum:r})=>{const{t:T}=xe();return!t||g!==!0?null:e.jsxs(yt,{children:[e.jsxs(ot,{children:[e.jsx(at,{htmlFor:"folderName",children:T("Album Name")}),e.jsx(Ds,{id:"folderName",type:"text",value:c,onChange:l=>n(l.target.value),placeholder:T("e.g. Family Vacation in Kyoto"),disabled:r})]}),e.jsxs(ot,{children:[e.jsx(at,{htmlFor:"folderDescription",children:T("Album Description")}),e.jsx(Fs,{id:"folderDescription",value:a,onChange:l=>B(l.target.value),placeholder:T("e.g. what's special about this album"),rows:4,disabled:r})]})]})});Rt.displayName="FolderDetailsComponent";if(typeof document<"u"){const t=document.createElement("style");t.textContent=`
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
  `,document.head.querySelector("#photo-handler-styles")||(t.id="photo-handler-styles",document.head.appendChild(t))}const wi=`
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
`,yi=`
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
`,Ti=`
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
`,vi=`
  mutation DeleteTag($tagId: String!) {
    deleteTag(tagId: $tagId) {
      id
      hasBeenDeleted
    }
  }
`,Si=`
  mutation DeleteSubtag($subtagId: String!) {
    deleteSubtag(subtagId: $subtagId) {
      id
      hasBeenDeleted
    }
  }
`,Ot=(t,g,c,n,a,B,r)=>{const[T,l]=u.useState([]),[A,S]=u.useState(null),[D,d]=u.useState(!1),[i,G]=u.useState(null),[R,X]=u.useState(null),[ie,se]=u.useState(!1),[de,s]=u.useState(!1),[oe,ae]=u.useState(""),[H,h]=u.useState(""),[V,b]=u.useState(!1),[$,p]=u.useState(!1),x=u.useMemo(()=>({photoIndices:Array.from(a),existingIndices:Array.from(B)}),[a,B]),F=()=>"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(o){const f=Math.random()*16|0;return(o=="x"?f:f&3|8).toString(16)}),_=u.useCallback(()=>{const o=[];t.forEach(j=>{o.push(...j)}),c.forEach(j=>{o.push(...j)});const f=new Map;return o.forEach(j=>{if(f.has(j.tagTitle)){const q=f.get(j.tagTitle),C=[...q.subtags,...j.subtags],w=Array.from(new Map(C.map(m=>[m.subtagTitle,m])).values());f.set(j.tagTitle,{...q,subtags:w})}else f.set(j.tagTitle,j)}),Array.from(f.values())},[t,c]),W=u.useCallback((o,f)=>{const j=[],q=Math.floor(Date.now()/1e3);return f.forEach(C=>{const w=o.find(m=>m.tagTitle===C.tagTitle);if(w){const m=[];if(C.subtags.forEach(U=>{var z;if(!((z=w.subtags)==null?void 0:z.find(L=>L.subtagTitle===U.subtagTitle))){const L={id:F(),tagTitle:U.tagTitle,subtagTitle:U.subtagTitle,TagType:C.TagType||"File",points:1,createdAt:q,updatedAt:q,isCreatedFromApplied:!0};m.push(L),r(`Created missing subtag from applied tags: ${U.subtagTitle} for tag ${U.tagTitle}`)}}),m.length>0){const U=o.findIndex(E=>E.id===w.id);U!==-1&&(o[U]={...w,subtags:[...w.subtags||[],...m]})}}else{const m={id:F(),tagTitle:C.tagTitle,TagType:C.TagType||"File",points:1,createdAt:q,updatedAt:q,subtags:[],isCreatedFromApplied:!0};C.subtags&&C.subtags.length>0&&(m.subtags=C.subtags.map(U=>({id:F(),tagTitle:U.tagTitle,subtagTitle:U.subtagTitle,TagType:C.TagType||"File",points:1,createdAt:q,updatedAt:q,isCreatedFromApplied:!0}))),j.push(m),r(`Created missing tag from applied tags: ${C.tagTitle} with ${C.subtags.length} subtags`)}}),j},[F,r]),le=u.useCallback(o=>{const{photoIndices:f,existingIndices:j}=x;if(f.length===0&&j.length===0)return!1;const q=f.length===0||f.every(m=>(t.get(m)||[]).some(E=>E.tagTitle===o.tagTitle)),C=j.length===0||j.every(m=>(c.get(m)||[]).some(E=>E.tagTitle===o.tagTitle)),w=q&&C;return(f.length>0||j.length>0)&&r(`Tag "${o.tagTitle}" applied to all selected? ${w} (photos: ${q}, existing: ${C})`),w},[x,t,c,r]),pe=u.useCallback(o=>{const{photoIndices:f,existingIndices:j}=x;let q=0,C=0;f.forEach(z=>{const re=(t.get(z)||[]).find(Se=>Se.tagTitle===o.tagTitle);re&&(q++,re.subtags.some(Se=>Se.subtagTitle===o.subtagTitle)&&C++)});let w=0,m=0;j.forEach(z=>{const re=(c.get(z)||[]).find(Se=>Se.tagTitle===o.tagTitle);re&&(w++,re.subtags.some(Se=>Se.subtagTitle===o.subtagTitle)&&m++)});const U=q+w,E=C+m;return U>0&&E===U},[x,t,c]),Pe=u.useCallback(o=>{const{photoIndices:f,existingIndices:j}=x;if(f.length===0&&j.length===0){r("No files selected for tag application");return}const q=le(o);r(`${q?"Removing":"Applying"} tag "${o.tagTitle}" ${q?"from":"to"} all selected files`),f.length>0&&g(C=>{const w=new Map(C);return f.forEach(m=>{const U=w.get(m)||[];if(q){const E=U.filter(z=>z.tagTitle!==o.tagTitle);w.set(m,E),r(`Removed tag "${o.tagTitle}" from photo ${m}`)}else if(!U.some(z=>z.tagTitle===o.tagTitle)){const z={tagTitle:o.tagTitle,TagType:o.TagType,subtags:[]};w.set(m,[...U,z]),r(`Added tag "${o.tagTitle}" to photo ${m}`)}}),w}),j.length>0&&n(C=>{const w=new Map(C);return j.forEach(m=>{const U=w.get(m)||[];if(q){const E=U.filter(z=>z.tagTitle!==o.tagTitle);w.set(m,E),r(`Removed tag "${o.tagTitle}" from existing file ${m}`)}else if(!U.some(z=>z.tagTitle===o.tagTitle)){const z={tagTitle:o.tagTitle,TagType:o.TagType,subtags:[]};w.set(m,[...U,z]),r(`Added tag "${o.tagTitle}" to existing file ${m}`)}}),w})},[x,le,g,n,r]),me=u.useCallback(o=>{const{photoIndices:f,existingIndices:j}=x;if(f.length===0&&j.length===0){r("No files selected for subtag application");return}const q=pe(o);r(`${q?"Removing":"Applying"} subtag "${o.subtagTitle}" ${q?"from":"to"} all selected files with parent tag`),f.length>0&&g(C=>{const w=new Map(C);return f.forEach(m=>{const E=(w.get(m)||[]).map(z=>{if(z.tagTitle===o.tagTitle){if(q)return{...z,subtags:z.subtags.filter(L=>L.subtagTitle!==o.subtagTitle)};if(!z.subtags.some(re=>re.subtagTitle===o.subtagTitle))return{...z,subtags:[...z.subtags,{tagTitle:o.tagTitle,subtagTitle:o.subtagTitle}]}}return z});w.set(m,E)}),w}),j.length>0&&n(C=>{const w=new Map(C);return j.forEach(m=>{const E=(w.get(m)||[]).map(z=>{if(z.tagTitle===o.tagTitle){if(q)return{...z,subtags:z.subtags.filter(L=>L.subtagTitle!==o.subtagTitle)};if(!z.subtags.some(re=>re.subtagTitle===o.subtagTitle))return{...z,subtags:[...z.subtags,{tagTitle:o.tagTitle,subtagTitle:o.subtagTitle}]}}return z});w.set(m,E)}),w})},[x,pe,g,n,r]),N=u.useCallback(()=>{const{photoIndices:o,existingIndices:f}=x,j=[];o.forEach(w=>{const m=t.get(w)||[];j.push(...m)}),f.forEach(w=>{const m=c.get(w)||[];j.push(...m)});const q=new Map;j.forEach(w=>{if(q.has(w.tagTitle)){const m=q.get(w.tagTitle),U=[...m.subtags,...w.subtags],E=Array.from(new Map(U.map(z=>[z.subtagTitle,z])).values());q.set(w.tagTitle,{...m,subtags:E})}else q.set(w.tagTitle,w)});const C=Array.from(q.values());return r(`getAppliedTagsForSelected: ${C.length} unique tags from ${o.length} photos + ${f.length} existing files`),C},[x,t,c,r]),k=u.useCallback(()=>a.size>0||B.size>0,[a.size,B.size]),K=async()=>{var o,f;r("Fetching tags from API and checking for missing applied tags"),d(!0);try{const j=await we();if(!j){r("No token available for fetching tags");return}const C=await(await fetch(Ce,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${j}`},body:JSON.stringify({query:wi,variables:{fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(r("Tags API response:",C),C.errors){console.error("GraphQL errors:",C.errors),r(`GraphQL errors: ${JSON.stringify(C.errors)}`);return}let m=(((f=(o=C==null?void 0:C.data)==null?void 0:o.fetchRelations)==null?void 0:f.items)||[]).map(E=>{var z,L;return{id:E.id,tagTitle:E.tagTitle,TagType:E.TagType,points:E.points,createdAt:E.createdAt,updatedAt:E.updatedAt,subtags:((L=(z=E.subtags)==null?void 0:z.items)==null?void 0:L.map(re=>({id:re.id,tagTitle:re.tagTitle,subtagTitle:re.subtagTitle,TagType:re.TagType,points:re.points,createdAt:re.createdAt,updatedAt:re.updatedAt})))||[]}});r(`Fetched ${m.length} tags from API`);const U=_();if(r(`Found ${U.length} unique applied tags in file maps`),U.length>0){const E=W(m,U);E.length>0&&(r(`Created ${E.length} missing tags from applied tags`),m=[...E,...m])}r(`Final tags list: ${m.length} tags (including ${m.filter(E=>E.isCreatedFromApplied).length} created from applied tags)`),l(m)}catch(j){console.error("Error fetching tags:",j),r(`Error fetching tags: ${j}`)}finally{d(!1)}},I=u.useCallback(o=>{r(`Setting displayed tag: ${o}`),S(o)},[r]),J=u.useCallback(()=>{if(!A)return[];const o=T.find(f=>f.id===A);return(o==null?void 0:o.subtags)||[]},[A,T]),O=async(o,f)=>{if(r(`Adding new tag: ${o} of type: ${f}`),!o.trim())return r("Cannot add tag with empty title"),!1;b(!0);try{if(!await we())return r("No token available for adding tag"),!1;if(await(async()=>(r("PLACEHOLDER: Would send GraphQL mutation to add tag",{mutation:yi,variables:{tagInput:{tagTitle:o.trim(),TagType:f,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(w=>setTimeout(w,500)),!0))()){const w={id:F(),tagTitle:o.trim(),TagType:f,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3),subtags:[]};return l(m=>[w,...m]),Pe(w),I(w.id),ae(""),se(!1),r(`Successfully added and applied new tag: ${o}`),!0}return!1}catch(j){return console.error("Error adding new tag:",j),r(`Error adding new tag: ${j}`),!1}finally{b(!1)}},Y=async(o,f,j)=>{if(r(`Adding new subtag: ${f} to tag: ${o}`),!f.trim())return r("Cannot add subtag with empty title"),!1;if(!A)return r("No displayed tag for adding subtag"),!1;p(!0);try{if(!await we())return r("No token available for adding subtag"),!1;if(await(async()=>(r("PLACEHOLDER: Would send GraphQL mutation to add subtag",{mutation:Ti,variables:{subtagInput:{tagTitle:o,subtagTitle:f.trim(),TagType:j,points:1,myAccountOwnerItemId:"myAccountOwnerItemId"}}}),await new Promise(m=>setTimeout(m,500)),!0))()){const m={id:F(),tagTitle:o,subtagTitle:f.trim(),TagType:j,points:1,createdAt:Math.floor(Date.now()/1e3),updatedAt:Math.floor(Date.now()/1e3)};return l(U=>U.map(E=>E.id===A?{...E,subtags:[m,...E.subtags||[]]}:E)),me(m),h(""),s(!1),r(`Successfully added and applied new subtag: ${f}`),!0}return!1}catch(q){return console.error("Error adding new subtag:",q),r(`Error adding new subtag: ${q}`),!1}finally{p(!1)}},te=async o=>{r(`Deleting tag: ${o}`),G(o);try{if(!await we())return r("No token available for deleting tag"),!1;if(await(async()=>(r("PLACEHOLDER: Would send GraphQL mutation to delete tag",{mutation:vi,variables:{tagId:o}}),await new Promise(C=>setTimeout(C,500)),!0))()){const C=T.find(w=>w.id===o);return l(w=>w.filter(m=>m.id!==o)),C&&(g(w=>{const m=new Map(w);return w.forEach((U,E)=>{const z=U.filter(L=>L.tagTitle!==C.tagTitle);m.set(E,z)}),m}),n(w=>{const m=new Map(w);return w.forEach((U,E)=>{const z=U.filter(L=>L.tagTitle!==C.tagTitle);m.set(E,z)}),m})),A===o&&I(null),r(`Successfully deleted tag: ${o}`),!0}return!1}catch(f){return console.error("Error deleting tag:",f),r(`Error deleting tag: ${f}`),!1}finally{G(null)}},Q=async o=>{r(`Deleting subtag: ${o}`),X(o);try{if(!await we())return r("No token available for deleting subtag"),!1;if(await(async()=>(r("PLACEHOLDER: Would send GraphQL mutation to delete subtag",{mutation:Si,variables:{subtagId:o}}),await new Promise(C=>setTimeout(C,500)),!0))()){let C=null;return l(w=>w.map(m=>{var E;const U=((E=m.subtags)==null?void 0:E.filter(z=>z.id===o?(C=z,!1):!0))||[];return{...m,subtags:U}})),C&&(g(w=>{const m=new Map(w);return w.forEach((U,E)=>{const z=U.map(L=>L.tagTitle===C.tagTitle?{...L,subtags:L.subtags.filter(re=>re.subtagTitle!==C.subtagTitle)}:L);m.set(E,z)}),m}),n(w=>{const m=new Map(w);return w.forEach((U,E)=>{const z=U.map(L=>L.tagTitle===C.tagTitle?{...L,subtags:L.subtags.filter(re=>re.subtagTitle!==C.subtagTitle)}:L);m.set(E,z)}),m})),r(`Successfully deleted subtag: ${o}`),!0}return!1}catch(f){return console.error("Error deleting subtag:",f),r(`Error deleting subtag: ${f}`),!1}finally{X(null)}},Z=()=>{se(!0),ae("")},ce=()=>{se(!1),ae("")},he=()=>{s(!0),h("")},ye=()=>{s(!1),h("")},je=async()=>oe.trim()?await O(oe,"File"):!1,ge=async()=>{if(H.trim()&&A){const o=T.find(f=>f.id===A);if(o)return await Y(o.tagTitle,H,o.TagType)}return!1};return u.useEffect(()=>{K()},[]),u.useEffect(()=>{const o=_();if(o.length>0&&T.length>0){const f=o.filter(j=>!T.some(q=>q.tagTitle===j.tagTitle));f.length>0&&(r(`Detected ${f.length} new applied tags, refreshing tags list`,f.map(j=>j.tagTitle)),K())}},[t,c,_,T,r]),u.useEffect(()=>{if(r(`Selection changed - Photos: ${a.size}, Existing: ${B.size}`),A){const o=T.find(f=>f.id===A);o&&!le(o)&&(r(`Clearing displayed tag "${o.tagTitle}" because it's no longer applied to all selected files`),S(null))}},[a.size,B.size,A,T,le,r]),u.useEffect(()=>{if(A){const o=T.find(f=>f.id===A);o&&!le(o)&&(r(`Clearing displayed tag "${o.tagTitle}" due to tag map changes`),S(null))}},[t,c,A,T,le,r]),{tags:T,displayedTagId:A,isLoadingTags:D,tagIdBeingDeleted:i,subtagIdBeingDeleted:R,isAddingNewTag:ie,isAddingNewSubtag:de,newTagTitle:oe,newSubtagTitle:H,isSubmittingNewTag:V,isSubmittingNewSubtag:$,fetchTags:K,toggleTagOnSelectedFiles:Pe,toggleSubtagOnSelectedFiles:me,setDisplayedTag:I,isTagAppliedToSelected:le,isSubtagAppliedToSelected:pe,getDisplayedTagSubtags:J,getAppliedTagsForSelected:N,hasSelectedFiles:k,addNewTag:O,addNewSubtag:Y,deleteTag:te,deleteSubtag:Q,startAddingNewTag:Z,cancelAddingNewTag:ce,startAddingNewSubtag:he,cancelAddingNewSubtag:ye,submitNewTag:je,submitNewSubtag:ge,setNewTagTitle:ae,setNewSubtagTitle:h,extractAllAppliedTags:_,createMissingAppliedTags:W}},$i=v.div`
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
`,Pi=v.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`,Ii=v.div`
  flex: 1;
`,Ai=v.h3`
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
`,ji=v.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
`,ki=v.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: stretch;
  }
`,ft=v.button`
  padding: 8px 16px;
  border: 1px solid ${t=>t.$variant==="primary"?"#007bff":t.$variant==="danger"?"#dc3545":"#6c757d"};
  border-radius: 6px;
  background: ${t=>t.$variant==="primary"?"#007bff":t.$variant==="danger"?"#dc3545":"transparent"};
  color: ${t=>t.$variant==="primary"||t.$variant==="danger"?"white":"#6c757d"};
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    background: ${t=>t.$variant==="primary"?"#0056b3":t.$variant==="danger"?"#c82333":"#6c757d"};
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
`,Ci=v.button`
  padding: 8px;
  border: 1px solid #6c757d;
  border-radius: 6px;
  background: transparent;
  color: #6c757d;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  position: relative;

  &:hover {
    background: #6c757d;
    color: white;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`,Di=v.div`
  position: absolute;
  top: 100%;
  ${t=>t.$isRTL?"left: 0;":"right: 0;"}
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 280px;
  padding: 16px;
  margin-top: 4px;
`,We=v.div`
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,Ke=v.h4`
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #333;
`,He=v.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  padding: 4px 0;
`,qe=v.div`
  font-size: 13px;
  color: #333;
  line-height: 1.4;
`,Je=v.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
    
    &:checked + span {
      background-color: #007bff;
    }
    
    &:checked + span:before {
      transform: translateX(16px);
    }
    
    &:disabled + span {
      background-color: #e6e6e6;
      cursor: not-allowed;
    }
  }
`,Ye=v.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .2s;
  border-radius: 24px;
  
  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 2px;
    top: 2px;
    background-color: white;
    transition: .2s;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`,Fi=v.button`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid ${t=>t.$hasPassword?"#28a745":"#dee2e6"};
  border-radius: 6px;
  background: ${t=>t.$hasPassword?"#28a745":"#f8f9fa"};
  color: ${t=>t.$hasPassword?"white":"#6c757d"};
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &:hover {
    background: ${t=>t.$hasPassword?"#218838":"#e9ecef"};
    border-color: ${t=>t.$hasPassword?"#218838":"#adb5bd"};
  }
`,ht=v.div`
  margin-bottom: 16px;
`,xt=v.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #333;
  font-size: 14px;
`,Ei=v.input`
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
`,_i=v.textarea`
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
`,Ni=v.div`
  margin-top: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e9ecef;
`,zi=v.div`
  width: 100%;
  height: 6px;
  background: #e9ecef;
  border-radius: 3px;
  overflow: hidden;
  margin-top: 8px;
`,Ri=v.div`
  height: 100%;
  background: linear-gradient(90deg, #007bff, #28a745);
  width: ${t=>t.$progress}%;
  transition: width 0.3s ease;
`,Oi=v.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
  justify-content: flex-end;
  flex-direction: ${t=>t.$isRTL?"row-reverse":"row"};
`,mt=v.button`
  padding: 6px 12px;
  font-size: 12px;
  border: 1px solid ${t=>t.$variant==="danger"?"#dc3545":"#ddd"};
  border-radius: 4px;
  background-color: ${t=>t.$variant==="danger"?"#dc3545":"#fff"};
  color: ${t=>t.$variant==="danger"?"white":"#333"};
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover:not(:disabled) {
    background-color: ${t=>t.$variant==="danger"?"#c82333":"#f8f9fa"};
    border-color: ${t=>t.$variant==="danger"?"#c82333":"#007bff"};
    color: ${t=>t.$variant==="danger"?"white":"#007bff"};
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: #f8f9fa;
    color: #999;
    cursor: not-allowed;
    transform: none;
  }
`,Mi=({album:t,onUpdate:g,onSave:c,onRemove:n,onShowPasswordDialog:a,disabled:B,columns:r,enhancedLog:T})=>{const{t:l,language:A}=xe(),S=ze(A)==="rtl",[D,d]=u.useState(!1),i=u.useRef(null);u.useEffect(()=>{const $=p=>{i.current&&!i.current.contains(p.target)&&d(!1)};return document.addEventListener("mousedown",$),()=>{document.removeEventListener("mousedown",$)}},[]);const G=Ot(t.photoTagsMap,$=>{const p=typeof $=="function"?$(t.photoTagsMap):$;g({photoTagsMap:p})},new Map,()=>{},t.selectedPhotoIndices,new Set,T),R=$=>{g({name:$})},X=$=>{g({description:$})},ie=$=>{const p=new Set(t.selectedPhotoIndices);p.has($)?p.delete($):p.add($),g({selectedPhotoIndices:p})},se=()=>{const $=new Set;for(let p=0;p<t.photos.length;p++)$.add(p);g({selectedPhotoIndices:$})},de=()=>{g({selectedPhotoIndices:new Set})},s=()=>{confirm(l("Are you sure you want to delete all files from this album? This action cannot be undone."))&&g({photos:[],selectedPhotoIndices:new Set,photoTagsMap:new Map})},oe=$=>{const p=t.photos.filter((_,W)=>W!==$),x=new Set;t.selectedPhotoIndices.forEach(_=>{_<$?x.add(_):_>$&&x.add(_-1)});const F=new Map;t.photoTagsMap.forEach((_,W)=>{W<$?F.set(W,_):W>$&&F.set(W-1,_)}),g({photos:p,selectedPhotoIndices:x,photoTagsMap:F})},ae=()=>{g({isOnPublicProfile:!t.isOnPublicProfile})},H=()=>{g({participantsCanAddItems:!t.participantsCanAddItems})},h=()=>{g({participantsCanDeleteItems:!t.participantsCanDeleteItems})},V=()=>{a(t.id)},b=t.passwordProtectionOption!=="NoPassword"&&t.albumPassword;return e.jsxs($i,{children:[e.jsxs(Pi,{$isRTL:S,children:[e.jsxs(Ii,{children:[e.jsxs(Ai,{children:[e.jsx("span",{children:"📁"}),t.name,t.isSaving&&e.jsx("span",{style:{color:"#007bff"},children:"⏳"}),t.savingProgress===100&&e.jsx("span",{style:{color:"#28a745"},children:"✅"})]}),e.jsxs(ji,{children:[t.photos.length===1?l("{{count}} file",{count:t.photos.length.toString()}):l("{{count}} files",{count:t.photos.length.toString()}),t.selectedPhotoIndices.size>0&&e.jsxs("span",{children:[" • ",l("{{count}} selected for tagging",{count:t.selectedPhotoIndices.size})]})]})]}),e.jsx(ki,{children:!t.isSaving&&t.savingProgress<100&&e.jsxs(e.Fragment,{children:[e.jsx(ft,{$variant:"primary",onClick:c,disabled:B,children:l("Save")}),e.jsxs("div",{ref:i,style:{position:"relative"},children:[e.jsx(Ci,{onClick:()=>d(!D),disabled:B,title:l("Album Settings"),children:"⚙️"}),D&&e.jsxs(Di,{$isRTL:S,children:[e.jsxs(We,{children:[e.jsx(Ke,{children:l("Visibility")}),e.jsxs(He,{children:[e.jsx(qe,{children:l("Public Profile")}),e.jsxs(Je,{children:[e.jsx("input",{type:"checkbox",checked:t.isOnPublicProfile,onChange:ae,disabled:t.isSaving}),e.jsx(Ye,{})]})]})]}),e.jsxs(We,{children:[e.jsx(Ke,{children:l("Participant Permissions")}),e.jsxs(He,{children:[e.jsx(qe,{children:l("Can Add Items")}),e.jsxs(Je,{children:[e.jsx("input",{type:"checkbox",checked:t.participantsCanAddItems,onChange:H,disabled:t.isSaving}),e.jsx(Ye,{})]})]}),e.jsxs(He,{children:[e.jsx(qe,{children:l("Can Delete Items")}),e.jsxs(Je,{children:[e.jsx("input",{type:"checkbox",checked:t.participantsCanDeleteItems,onChange:h,disabled:t.isSaving}),e.jsx(Ye,{})]})]})]}),e.jsxs(We,{children:[e.jsx(Ke,{children:l("Security")}),e.jsxs(Fi,{$hasPassword:!!b,onClick:V,disabled:t.isSaving,children:[b?"🔒":"🔓",l(b?"Password Set":"Set Password")]})]})]})]}),e.jsx(ft,{$variant:"danger",onClick:n,disabled:B,children:l("Remove")})]})})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",marginBottom:"20px"},children:[e.jsxs(ht,{children:[e.jsx(xt,{children:l("Album Name")}),e.jsx(Ei,{type:"text",value:t.name,onChange:$=>R($.target.value),placeholder:l("e.g. Family Vacation in Kyoto"),disabled:t.isSaving||t.savingProgress===100})]}),e.jsxs("div",{children:[e.jsxs(ht,{children:[e.jsx(xt,{children:l("Album Description")}),e.jsx(_i,{value:t.description,onChange:$=>X($.target.value),placeholder:l("e.g. what's special about this album"),disabled:t.isSaving||t.savingProgress===100,rows:3})]}),t.photos.length>0&&e.jsxs(Oi,{$isRTL:S,children:[e.jsx(mt,{onClick:t.selectedPhotoIndices.size>0?de:se,disabled:t.isSaving||t.savingProgress===100,children:t.selectedPhotoIndices.size>0?l("Done Tagging Selected"):l("Select All")}),t.selectedPhotoIndices.size===0&&e.jsx(mt,{$variant:"danger",onClick:s,disabled:t.isSaving||t.savingProgress===100,children:l("Delete All")})]})]})]}),e.jsx(Ve,{selectedPhotos:t.photos,selectedPhotoIndices:t.selectedPhotoIndices,isSavingAlbum:t.isSaving||t.savingProgress===100,onRemovePhoto:oe,onTogglePhotoSelection:ie,onSelectAllPhotos:se,onDeselectAllPhotos:de,hideHeader:!1,photoTagsMap:t.photoTagsMap,columns:r,isMultipleAlbumMode:!0}),t.selectedPhotoIndices.size>0&&e.jsx(Ni,{children:e.jsx(Nt,{tagsManager:G,disabled:t.isSaving||t.savingProgress===100,enhancedLog:T})}),t.isSaving&&e.jsxs("div",{style:{marginTop:"16px"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},children:[e.jsx("span",{style:{fontSize:"14px",fontWeight:"600",color:"#333"},children:l("Saving album...")}),e.jsxs("span",{style:{fontSize:"14px",color:"#666"},children:[t.savingProgress,"%"]})]}),e.jsx(zi,{children:e.jsx(Ri,{$progress:t.savingProgress})})]})]})},Bi=v.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  direction: ${t=>t.$isRTL?"rtl":"ltr"};
`,Ui=({albums:t,setAlbums:g,isSavingAny:c,onSaveAlbum:n,onRemoveAlbum:a,onShowPasswordDialog:B,columns:r,setColumns:T,enhancedLog:l})=>{const{language:A}=xe(),S=ze(A)==="rtl",D=u.useCallback((d,i)=>{g(G=>G.map(R=>R.id===d?{...R,...i}:R))},[g]);return e.jsx("div",{children:e.jsx(Bi,{$isRTL:S,children:t.map(d=>e.jsx(Mi,{album:d,onUpdate:i=>D(d.id,i),onSave:()=>n(d.id),onRemove:()=>a(d.id),onShowPasswordDialog:B,disabled:c,columns:r,setColumns:T,enhancedLog:l},d.id))})})},Mt=v.button`
  padding: 8px;
  border: 1px solid #6c757d;
  border-radius: 6px;
  background: transparent;
  color: #6c757d;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  position: relative;

  &:hover {
    background: #6c757d;
    color: white;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`,Bt=v.div`
  position: absolute;
  top: 100%;
  ${t=>t.$isRTL?"left: 0;":"right: 0;"}
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 300px;
  padding: 20px;
  margin-top: 4px;
`,De=v.div`
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,Ut=v.h4`
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
`,Fe=v.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 8px 0;
`,Ee=v.div`
  font-size: 14px;
  color: #333;
  line-height: 1.4;
`,_e=v.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 26px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
    
    &:checked + span {
      background-color: #007bff;
    }
    
    &:checked + span:before {
      transform: translateX(18px);
    }
    
    &:disabled + span {
      background-color: #e6e6e6;
      cursor: not-allowed;
    }
  }
`,Ne=v.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .2s;
  border-radius: 26px;
  
  &:before {
    position: absolute;
    content: "";
    height: 22px;
    width: 22px;
    left: 2px;
    top: 2px;
    background-color: white;
    transition: .2s;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`,Gt=v.button`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${t=>t.$hasAnyPassword?"#28a745":"#dee2e6"};
  border-radius: 8px;
  background: ${t=>t.$hasAnyPassword?"#28a745":"#f8f9fa"};
  color: ${t=>t.$hasAnyPassword?"white":"#6c757d"};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: ${t=>t.$hasAnyPassword?"#218838":"#e9ecef"};
    border-color: ${t=>t.$hasAnyPassword?"#218838":"#adb5bd"};
  }
`,Gi=v.button`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #007bff;
  border-radius: 8px;
  background: #007bff;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 8px;

  &:hover {
    background: #0056b3;
    border-color: #0056b3;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`,Wi=()=>{var b,$;const{t,language:g}=xe(),c=ze(g)==="rtl",[n,a]=u.useState([]),[B,r]=u.useState("2"),[T,l]=u.useState(!1),[A,S]=u.useState(!1),[D,d]=u.useState(null),[i,G]=u.useState({isOnPublicProfile:!1,participantsCanAddItems:!0,participantsCanDeleteItems:!1,passwordProtectionOption:"NoPassword",albumPassword:""}),R=(p,x)=>{const F=new Date().toISOString();console.log(`[${F}] ${p}`,x)},X=p=>{r(p),localStorage.setItem("save-album-columns",p),R(`Column setting changed to ${p} for all albums`)};u.useEffect(()=>{const p=localStorage.getItem(be.MULTI_ALBUM_DATA);if(p)try{const F=JSON.parse(p).filter(W=>{if(!W||!W.name||!Array.isArray(W.selectedPhotos))return!1;const le=W.selectedPhotos.filter(pe=>pe&&pe.fileName&&pe.originalFileName&&pe.s3PreviewUrl&&pe.s3PreviewUrl.includes("amazonaws.com"));return W.selectedPhotos=le,le.length>0});if(F.length===0){alert("No valid albums were found. Please try selecting your files again."),ke("my-albums.html");return}const _=F.map(W=>({id:nt(),name:W.name,description:"",photos:W.selectedPhotos,selectedPhotoIndices:new Set,photoTagsMap:new Map,isOnPublicProfile:!1,participantsCanAddItems:!0,participantsCanDeleteItems:!1,passwordProtectionOption:"NoPassword",albumPassword:"",isSaving:!1,savingProgress:0,folderId:""}));a(_),Ge()}catch(x){console.error("Error parsing multi-album data:",x),alert("There was an error loading your albums. Please try selecting your files again."),ke("my-albums.html")}else alert("No album data was found. Please try selecting your files again."),ke("my-albums.html")},[]),u.useEffect(()=>{const p=localStorage.getItem("save-album-columns")||"2";r(p)},[]);const ie=p=>{const x=n.find(F=>F.id===p);x&&(d(p),G(F=>({...F,passwordProtectionOption:x.passwordProtectionOption,albumPassword:x.albumPassword})),S(!0))},se=()=>{d(null),S(!0)},de=(p,x)=>{p!==void 0&&x!==void 0&&(D?a(F=>F.map(_=>_.id===D?{..._,passwordProtectionOption:p,albumPassword:x}:_)):G(F=>({...F,passwordProtectionOption:p,albumPassword:x}))),S(!1),d(null)},s=()=>{a(p=>p.map(x=>({...x,isOnPublicProfile:i.isOnPublicProfile,participantsCanAddItems:i.participantsCanAddItems,participantsCanDeleteItems:i.participantsCanDeleteItems,passwordProtectionOption:i.passwordProtectionOption,albumPassword:i.albumPassword}))),l(!1),R("Applied global settings to all albums",i)},oe=async p=>{const x=n.find(F=>F.id===p);if(x){if(x.photos.length===0){alert(`The album "${x.name}" has no photos to save.`);return}a(F=>F.map(_=>_.id===p?{..._,isSaving:!0,savingProgress:0}:_));try{const F=`${Date.now()}_____${nt()}____Folder`;a(_=>_.map(W=>W.id===p?{...W,folderId:F}:W));for(let _=10;_<=100;_+=20)a(W=>W.map(le=>le.id===p?{...le,savingProgress:_}:le)),await new Promise(W=>setTimeout(W,500));a(_=>_.map(W=>W.id===p?{...W,isSaving:!1,savingProgress:100}:W))}catch(F){console.error(`Error saving album ${p}:`,F),a(_=>_.map(W=>W.id===p?{...W,isSaving:!1,savingProgress:0}:W)),alert(`Failed to save album "${x.name}". Please try again.`)}}},ae=async()=>{const p=n.filter(x=>x.savingProgress<100);if(p.length!==0)try{for(const F of p)await oe(F.id),await new Promise(_=>setTimeout(_,200));n.filter(F=>p.some(_=>_.id===F.id)&&F.savingProgress<100).length===0&&setTimeout(()=>{localStorage.removeItem(be.MULTI_ALBUM_DATA),Ge(),ke("my-albums.html")},1e3)}catch(x){console.error("Error saving all albums:",x),alert("There was an error saving some albums. Please try again.")}},H=p=>{const x=n.find(_=>_.id===p);if(x&&!confirm(`Are you sure you want to remove the album "${x.name}"?`))return;const F=n.filter(_=>_.id!==p);a(F),F.length===0&&(localStorage.removeItem(be.MULTI_ALBUM_DATA),Ge(),ke("my-albums.html"))},h=n.some(p=>p.isSaving),V=n.some(p=>p.savingProgress<100);return e.jsxs(e.Fragment,{children:[e.jsx(Tt,{}),e.jsx(vt,{children:e.jsxs(St,{children:[e.jsx($t,{href:"my-albums.html",children:t("Back to Albums")}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx(Es,{children:t("Columns:")}),e.jsxs(_s,{value:B,onChange:p=>X(p.target.value),disabled:h,children:[e.jsx("option",{value:"1",children:"1"}),e.jsx("option",{value:"2",children:"2"}),e.jsx("option",{value:"3",children:"3"}),e.jsx("option",{value:"4",children:"4"}),e.jsx("option",{value:"5",children:"5"})]})]}),e.jsxs("div",{style:{position:"relative"},children:[e.jsx(Mt,{onClick:()=>l(!T),disabled:h,title:t("Global Settings for All Albums"),children:"⚙️"}),T&&e.jsx(Bt,{$isRTL:c,children:e.jsxs(De,{children:[e.jsx(Ut,{children:t("Apply to All Albums")}),e.jsxs(De,{children:[e.jsxs(Fe,{children:[e.jsx(Ee,{children:t("Public Profile")}),e.jsxs(_e,{children:[e.jsx("input",{type:"checkbox",checked:i.isOnPublicProfile,onChange:p=>G(x=>({...x,isOnPublicProfile:p.target.checked}))}),e.jsx(Ne,{})]})]}),e.jsxs(Fe,{children:[e.jsx(Ee,{children:t("Participants Can Add Items")}),e.jsxs(_e,{children:[e.jsx("input",{type:"checkbox",checked:i.participantsCanAddItems,onChange:p=>G(x=>({...x,participantsCanAddItems:p.target.checked}))}),e.jsx(Ne,{})]})]}),e.jsxs(Fe,{children:[e.jsx(Ee,{children:t("Participants Can Delete Items")}),e.jsxs(_e,{children:[e.jsx("input",{type:"checkbox",checked:i.participantsCanDeleteItems,onChange:p=>G(x=>({...x,participantsCanDeleteItems:p.target.checked}))}),e.jsx(Ne,{})]})]})]}),e.jsx(De,{children:e.jsxs(Gt,{$hasAnyPassword:i.passwordProtectionOption!=="NoPassword"&&!!i.albumPassword,onClick:se,children:[i.passwordProtectionOption!=="NoPassword"&&i.albumPassword?"🔒":"🔓",i.passwordProtectionOption!=="NoPassword"&&i.albumPassword?t("Password Set"):t("Set Password for All")]})}),e.jsx(Gi,{onClick:s,children:t("Apply to All Albums")})]})})]}),V&&!h&&e.jsx(Qe,{$primary:!0,onClick:ae,style:{minWidth:"120px",fontSize:"14px",padding:"8px 16px"},children:t("Save {{count}} Albums",{count:n.length})})]})]})}),e.jsx(Pt,{$isRTL:c,children:e.jsx(Ui,{albums:n,setAlbums:a,isSavingAny:h,onSaveAlbum:oe,onRemoveAlbum:H,onShowPasswordDialog:ie,columns:B,setColumns:X,enhancedLog:R})}),e.jsx(It,{isOpen:A,onClose:de,initialOption:D?((b=n.find(p=>p.id===D))==null?void 0:b.passwordProtectionOption)||"NoPassword":i.passwordProtectionOption,initialPassword:D?(($=n.find(p=>p.id===D))==null?void 0:$.albumPassword)||"":i.albumPassword})]})},Ki=()=>{const{t,language:g}=xe(),c=ze(g)==="rtl",[n,a]=u.useState({selectedPhotoIndices:new Set,photoTagsMap:new Map,selectedExistingIndices:new Set,existingFileTagsMap:new Map}),B=zs(t),{setShowUsernamePrompt:r,setUsernameInput:T}=B,[l,A]=u.useState(null),[S,D]=u.useState(!1),[d,i]=u.useState(0),[G,R]=u.useState(""),[X,ie]=u.useState(""),[se,de]=u.useState(!1),[s,oe]=u.useState(!1),[ae,H]=u.useState("NoPassword"),[h,V]=u.useState(""),[b,$]=u.useState(!1),[p,x]=u.useState(!0),[F,_]=u.useState(!1),[W,le]=u.useState(null),[pe,Pe]=u.useState(!1),[me,N]=u.useState([]),[k,K]=u.useState("2"),[I,J]=u.useState([]),[O,Y]=u.useState(!1),[te,Q]=u.useState(!1),Z=u.useRef(null),ce=(y,M)=>{const ee=new Date().toISOString();console.log(`[${ee}] ${y}`,M)};u.useEffect(()=>{const y=M=>{Z.current&&!Z.current.contains(M.target)&&Q(!1)};return document.addEventListener("mousedown",y),()=>{document.removeEventListener("mousedown",y)}},[]);const ye=Os(y=>{!l&&y&&A(y)},!0),{fileInputRef:je,selectedPhotos:ge,setSelectedPhotos:o,isUploading:f,progressTracker:j,setProgressTracker:q,debugMessages:C,currentFolderId:w,openFilePicker:m,handleFileSelection:U,setOnSaveAlbumPage:E}=ye,z=li(A,o,le,de,R,ie,$,x,H,V,Pe,N,_,ce),{cognitoUsername:L,publicUsername:re,setPublicUsername:Se}=z,Kt=Ot(n.photoTagsMap,y=>{a(M=>({...M,photoTagsMap:typeof y=="function"?y(M.photoTagsMap):y}))},n.existingFileTagsMap,y=>{a(M=>({...M,existingFileTagsMap:typeof y=="function"?y(M.existingFileTagsMap):y}))},n.selectedPhotoIndices,n.selectedExistingIndices,ce),Ht=di(l||w,L,ge,pe,me,G,X,b,p,F,ae,h,n.photoTagsMap,n.existingFileTagsMap,I,n.selectedExistingIndices,D,i,o,q,ce,t),{saveAlbumDirectly:Xe}=Ht;u.useEffect(()=>{const y=localStorage.getItem("save-album-columns")||"2";K(y)},[]);const qt=y=>{K(y),localStorage.setItem("save-album-columns",y)};u.useEffect(()=>(E(!0),()=>E(!1)),[E]),u.useEffect(()=>{(async()=>{try{await vs()}catch(M){console.warn("Credential prewarming failed:",M)}})()},[]);const Jt=async y=>{var M,ee,ne;if(y){Y(!0);try{const ue=await we();if(!ue)return;const fe=`
        mutation FetchRelations($fetchRelationsInput: FetchRelationsInput!) {
          fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
            items {
              ... on FolderPosition {
                ${Bs}
              }
            }
          }
        }
      `,Te={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}},Re=await(await fetch(Ce,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${ue}`},body:JSON.stringify({query:fe,variables:Te})})).json();if(Re.errors){console.error("GraphQL errors:",Re.errors);return}const Ze=(((ee=(M=Re==null?void 0:Re.data)==null?void 0:M.fetchRelations)==null?void 0:ee.items)||[]).find($e=>$e&&$e.folder&&$e.folder.id===y);if(!Ze)return;const Ae=Ze.folder,gs=((ne=Ae==null?void 0:Ae.fileReferencesPage)==null?void 0:ne.items)||[],Le=[],et=new Map;gs.forEach(($e,fs)=>{const Ie=$e.file;if(Ie&&Ie.dataKey){let Be=$e.fileDisplayName;if(!Be&&Ie.dataKey){const Oe=Ie.dataKey.split("/");Be=Oe[Oe.length-1]}Le.push({dataKey:Ie.dataKey,thumbnailDataKey:Ie.thumbnailDataKey||null,durationInSeconds:Ie.durationInSeconds||null,dataInBytes:Ie.dataInBytes||0,fileName:Be||void 0});const tt=$e.selectedTags||[];if(tt.length>0){const Oe=tt.map(Ue=>{var st;return{tagTitle:Ue.tagTitle,TagType:Ue.TagType,subtags:((st=Ue.subtags)==null?void 0:st.map(it=>({tagTitle:it.tagTitle,subtagTitle:it.subtagTitle})))||[]}});et.set(fs,Oe)}}}),J(Le),a($e=>({...$e,existingFileTagsMap:et})),!G&&Ae.folderName&&R(Ae.folderName),!X&&Ae.folderDescription&&ie(Ae.folderDescription)}catch(ue){console.error("Failed to fetch existing album data:",ue)}finally{Y(!1)}}};u.useEffect(()=>{const M=new URLSearchParams(window.location.search).get("folderId");M&&(A(M),Pe(!1),localStorage.removeItem(be.SUB_ALBUM_DATA),de(!0),le(!0))},[]),u.useEffect(()=>{l&&Jt(l)},[l]),u.useEffect(()=>{w&&!l&&A(w)},[w,l]),u.useEffect(()=>{a(y=>{const M=new Set,ee=new Map;return y.selectedPhotoIndices.forEach(ne=>{ne<ge.length&&M.add(ne)}),y.photoTagsMap.forEach((ne,ue)=>{ue<ge.length&&ee.set(ue,ne)}),{...y,selectedPhotoIndices:M,photoTagsMap:ee}})},[ge.length]),u.useEffect(()=>{a(y=>{const M=new Set,ee=new Map;return y.selectedExistingIndices.forEach(ne=>{ne<I.length&&M.add(ne)}),y.existingFileTagsMap.forEach((ne,ue)=>{ue<I.length&&ee.set(ue,ne)}),{...y,selectedExistingIndices:M,existingFileTagsMap:ee}})},[I.length]);const Yt=y=>{const M=ge.filter((ee,ne)=>ne!==y);o(M),M.length>0?localStorage.setItem(be.SELECTED_PHOTOS,JSON.stringify(M)):localStorage.removeItem(be.SELECTED_PHOTOS),a(ee=>{const ne=new Set,ue=new Map;return ee.selectedPhotoIndices.forEach(fe=>{fe<y?ne.add(fe):fe>y&&ne.add(fe-1)}),ee.photoTagsMap.forEach((fe,Te)=>{Te<y?ue.set(Te,fe):Te>y&&ue.set(Te-1,fe)}),{...ee,selectedPhotoIndices:ne,photoTagsMap:ue}})},Qt=y=>{const M=I.filter((ee,ne)=>ne!==y);J(M),a(ee=>{const ne=new Set,ue=new Map;return ee.selectedExistingIndices.forEach(fe=>{fe<y?ne.add(fe):fe>y&&ne.add(fe-1)}),ee.existingFileTagsMap.forEach((fe,Te)=>{Te<y?ue.set(Te,fe):Te>y&&ue.set(Te-1,fe)}),{...ee,selectedExistingIndices:ne,existingFileTagsMap:ue}})},Vt=y=>{a(M=>{const ee=new Set(M.selectedExistingIndices);return ee.has(y)?ee.delete(y):ee.add(y),{...M,selectedExistingIndices:ee}})},Xt=()=>{const y=new Set;for(let M=0;M<I.length;M++)y.add(M);a(M=>({...M,selectedExistingIndices:y}))},Zt=()=>{a(y=>({...y,selectedExistingIndices:new Set}))},Lt=y=>{a(M=>{const ee=new Set(M.selectedPhotoIndices);return ee.has(y)?ee.delete(y):ee.add(y),{...M,selectedPhotoIndices:ee}})},es=()=>{const y=new Set;for(let M=0;M<ge.length;M++)y.add(M);a(M=>({...M,selectedPhotoIndices:y}))},ts=()=>{a(y=>({...y,selectedPhotoIndices:new Set}))},ss=()=>{confirm(t("Are you sure you want to delete all new files? This action cannot be undone."))&&(o([]),a({selectedPhotoIndices:new Set,photoTagsMap:new Map,selectedExistingIndices:new Set,existingFileTagsMap:new Map}),localStorage.removeItem(be.SELECTED_PHOTOS))},is=async()=>{D(!0);try{if(re!=null&&re.startsWith("Profile-")){T(""),r(!0),D(!1);return}Xe()}catch(y){console.error("Error in handleSaveAlbumSingle:",y),D(!1)}},rs=y=>{localStorage.setItem(be.PUBLIC_USERNAME,y),Se(y),r(!1),Xe()},os=(y,M)=>{y&&H(y),M!==void 0&&V(M),oe(!1)},as=()=>{oe(!0)},ns=()=>{$(!b)},ls=()=>{x(!p)},ds=()=>{_(!F)},cs=()=>{m(l)},Me=S||f||O,ps=ge.length>0||I.length>0,us=n.selectedPhotoIndices.size>0||n.selectedExistingIndices.size>0;return e.jsxs(e.Fragment,{children:[e.jsx(Tt,{}),e.jsx(vt,{children:e.jsxs(St,{children:[e.jsx($t,{href:"my-albums.html",children:t("Back to Albums")}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[se&&W===!0&&e.jsxs("div",{ref:Z,style:{position:"relative"},children:[e.jsx(Mt,{onClick:()=>Q(!te),disabled:S||f||O,title:t("Album Settings"),children:"⚙️"}),te&&e.jsx(Bt,{$isRTL:c,children:e.jsxs(De,{children:[e.jsx(Ut,{children:t("Album Settings")}),e.jsxs(De,{children:[e.jsxs(Fe,{children:[e.jsx(Ee,{children:t("Public Profile")}),e.jsxs(_e,{children:[e.jsx("input",{type:"checkbox",checked:b,onChange:ns,disabled:S||f||O}),e.jsx(Ne,{})]})]}),e.jsxs(Fe,{children:[e.jsx(Ee,{children:t("Participants Can Add Items")}),e.jsxs(_e,{children:[e.jsx("input",{type:"checkbox",checked:p,onChange:ls,disabled:S||f||O}),e.jsx(Ne,{})]})]}),e.jsxs(Fe,{children:[e.jsx(Ee,{children:t("Participants Can Delete Items")}),e.jsxs(_e,{children:[e.jsx("input",{type:"checkbox",checked:F,onChange:ds,disabled:S||f||O}),e.jsx(Ne,{})]})]})]}),e.jsx(De,{children:e.jsxs(Gt,{$hasAnyPassword:ae!=="NoPassword"&&!!h,onClick:as,disabled:S||f||O,children:[ae!=="NoPassword"&&h?"🔒":"🔓",t(ae!=="NoPassword"&&h?"Password Set":"Set Password")]})})]})})]}),e.jsx(Qe,{$primary:!0,onClick:is,disabled:S||f||O,style:{minWidth:"120px",fontSize:"14px",padding:"8px 16px"},children:t(S?"Saving...":"Save Album")})]})]})}),e.jsxs(Pt,{$isRTL:c,children:[e.jsx("div",{style:{marginTop:se&&W===!0?"3px":"0"},children:e.jsx(Rt,{showFolderDetails:se,isCreator:W,folderName:G,setFolderName:R,folderDescription:X,setFolderDescription:ie,isSavingAlbum:S||f})}),(f||j.totalFiles>0&&(j.filesUploading>0||j.filesProcessing>0||j.filesComplete<j.totalFiles))&&e.jsx(Ms,{progressTracker:j,isRTL:ze(g)==="rtl",variant:"detailed",context:"saving",isUploading:f,showSuccessMessage:!1,showErrorMessage:!0,customMessages:{error:t("Some photos could not be processed. You can continue with the successfully processed photos.")}}),O&&e.jsx("div",{style:{padding:"16px",marginBottom:"16px",backgroundColor:"#f8f9fa",border:"1px solid #dee2e6",borderRadius:"8px",color:"#6c757d",textAlign:"center",fontStyle:"italic"},children:t("Loading existing files...")}),e.jsx("input",{ref:je,id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:y=>U(y,L),style:{display:"none"}}),se&&W===!0&&ps&&e.jsxs("div",{style:{padding:"32px",marginBottom:"32px",backgroundColor:"#f8f9fa",border:"2px solid #e9ecef",borderRadius:"12px",direction:c?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",fontSize:"18px",color:"#495057",fontWeight:"600",marginBottom:"24px",flexDirection:c?"row-reverse":"row"},children:[e.jsx("span",{style:{marginRight:c?"0":"12px",marginLeft:c?"12px":"0",fontSize:"20px"},children:"🏷️"}),t("Select files to start adding or removing tags")]}),I.length>0&&e.jsx(Hi,{existingFiles:I,selectedExistingIndices:n.selectedExistingIndices,onToggleSelection:Vt,onSelectAll:Xt,onDeselectAll:Zt,onDeleteFile:Qt,disabled:Me,isCreator:W,participantsCanDeleteItems:F,existingFileTagsMap:n.existingFileTagsMap,t,isRTL:c}),e.jsx(qi,{selectedPhotos:ge,selectedPhotoIndices:n.selectedPhotoIndices,onToggleSelection:Lt,onSelectAll:es,onDeselectAll:ts,onRemovePhoto:Yt,onDeleteAll:ss,disabled:Me,photoTagsMap:n.photoTagsMap,columns:k,setColumns:qt,t,isRTL:c}),e.jsx("div",{style:{marginTop:us?"32px":"16px"},children:e.jsx(Nt,{tagsManager:Kt,disabled:Me,enhancedLog:ce})})]}),e.jsx(zt,{isSavingAlbum:S,savingProgress:d}),e.jsx(Ns,{children:e.jsx(Qe,{onClick:cs,disabled:S||f||O,children:t(f?"Uploading...":"Add More Photos")})}),e.jsx(Rs,{t,language:g,usernameManager:B,onSuccess:rs}),e.jsx(It,{isOpen:s,onClose:os,initialOption:ae,initialPassword:h}),e.jsx(ai,{debugMessages:C,t,isRTL:c,textDirection:c?"rtl":"ltr"})]})]})},Hi=({existingFiles:t,selectedExistingIndices:g,onToggleSelection:c,onSelectAll:n,onDeselectAll:a,onDeleteFile:B,disabled:r,isCreator:T,participantsCanDeleteItems:l,existingFileTagsMap:A,t:S,isRTL:D})=>t.length===0?null:e.jsxs("div",{style:{marginBottom:"32px",direction:D?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px",flexDirection:D?"row-reverse":"row"},children:[e.jsx("div",{children:e.jsxs("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:[S("Existing Files")," (",t.length,")"]})}),e.jsx("div",{style:{display:"flex",gap:"8px",flexDirection:D?"row-reverse":"row"},children:e.jsx("button",{style:{padding:"6px 12px",fontSize:"12px",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:r?"#f8f9fa":"#fff",color:r?"#999":"#333",cursor:r?"not-allowed":"pointer",transition:"all 0.2s ease"},onClick:g.size>0?a:n,disabled:r,children:g.size>0?S("Done Tagging Selected"):S("Select All")})})]}),e.jsx("div",{className:"existing-files-grid",children:t.map((d,i)=>{const G=g.has(i),R=A.get(i)||[];return e.jsxs("div",{className:"existing-file-item",children:[e.jsxs("div",{className:`existing-file-card ${G?"selected":""}`,onClick:()=>!r&&c(i),children:[e.jsx(Us,{thumbnailDataKey:d.thumbnailDataKey,dataKey:d.dataKey,alt:S("Existing file"),style:{width:"100%",height:"100%",objectFit:"cover"}}),G&&!r&&(T===!0||l)&&e.jsx("button",{onClick:X=>{X.stopPropagation(),confirm(S("Are you sure you want to remove this file?"))&&B(i)},className:"delete-button",title:S("Remove file"),children:"×"}),d.dataInBytes>0&&e.jsxs("div",{className:"file-size",children:[(d.dataInBytes/(1024*1024)).toFixed(1),S("MB")]}),d.durationInSeconds&&e.jsxs("div",{className:"file-duration",children:[Math.floor(d.durationInSeconds/60),":",String(Math.floor(d.durationInSeconds%60)).padStart(2,"0")]})]}),e.jsxs("div",{className:"file-info",children:[d.fileName&&e.jsx("div",{className:`file-name ${G?"selected":""}`,children:d.fileName}),e.jsx("div",{className:"file-tags",children:R.length>0?e.jsx("div",{className:"tags-display",children:e.jsxs("div",{className:"tags-content",children:[e.jsx("span",{className:"tag-icon",children:"🏷️"}),e.jsx("span",{className:"tags-text",children:R.map(X=>{if(X.subtags.length>0){const ie=X.subtags.map(se=>se.subtagTitle).join(", ");return`${X.tagTitle}: ${ie}`}return X.tagTitle}).join(" • ")})]})}):e.jsx("div",{className:"no-tags",children:S("No tags applied")})})]})]},`existing-${i}-${d.dataKey}`)})})]}),qi=({selectedPhotos:t,selectedPhotoIndices:g,onToggleSelection:c,onSelectAll:n,onDeselectAll:a,onRemovePhoto:B,onDeleteAll:r,disabled:T,photoTagsMap:l,columns:A,setColumns:S,t:D,isRTL:d})=>t.length===0?null:e.jsxs("div",{style:{marginBottom:"32px",direction:d?"rtl":"ltr"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"16px",flexDirection:d?"row-reverse":"row"},children:[e.jsxs("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#333",margin:0},children:[D("New Files")," (",t.length,")"]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:d?"flex-start":"flex-end",gap:"8px"},children:[e.jsxs("div",{style:{display:"flex",gap:"8px",flexDirection:d?"row-reverse":"row"},children:[e.jsx("button",{className:"control-button",onClick:g.size>0?a:n,disabled:T,children:g.size>0?D("Done Tagging Selected"):D("Select All")}),g.size===0&&e.jsx("button",{className:"control-button danger",onClick:r,disabled:T,children:D("Delete All")})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",flexDirection:d?"row-reverse":"row"},children:[e.jsx("label",{className:"columns-label",children:D("Columns:")}),e.jsxs("select",{value:A,onChange:i=>S(i.target.value),className:"columns-select",children:[e.jsx("option",{value:"1",children:"1"}),e.jsx("option",{value:"2",children:"2"}),e.jsx("option",{value:"3",children:"3"}),e.jsx("option",{value:"4",children:"4"}),e.jsx("option",{value:"5",children:"5"})]})]})]})]}),e.jsx(Ve,{selectedPhotos:t,selectedPhotoIndices:g,isSavingAlbum:T,onRemovePhoto:B,onTogglePhotoSelection:c,onSelectAllPhotos:n,onDeselectAllPhotos:a,hideHeader:!0,photoTagsMap:l,columns:A})]}),Ji=()=>new URLSearchParams(window.location.search).get("mode")==="multiple"?e.jsx(Wi,{}):e.jsx(Ki,{}),Yi=()=>e.jsx(Ts,{children:e.jsx(Ji,{})}),Qi=`
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
`,Wt=document.createElement("style");Wt.textContent=Qi;document.head.appendChild(Wt);ys.createRoot(document.getElementById("root")).render(e.jsx(Yi,{}));
