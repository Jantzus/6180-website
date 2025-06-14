import{d as _,u as Ie,a as A,j as t,g as ne,h as te,L,i as me,s as Ke,m as Ge,f as re,k as We,l as Je,n as He,r as Ve,R as Qe,I as Ye,p as Xe}from"./utils-CuQXS0Z6.js";import{C as Pe,F as xe,e as he,f as Ze,g as Le,T as be,h as $e,i as ye,j as we,P as et,k as tt,S as st,l as rt,V as it,m as ot,n as Ae,o as _e,p as at,M as nt,R as lt,q as dt,r as ct,G as ut,A as pt,H as ft,s as gt,t as mt,B as ae}from"./styled-components-BoQ3gU80.js";import{u as xt,U as ht}from"./useUsernameManagement-CIMgJf9K.js";import{u as bt,U as $t}from"./useFileUploadProcessor-D1hsxDoX.js";import{L as yt,D as wt}from"./DebugLog-xSXl2FHh.js";const i={colors:{primary:"#007bff",primaryDark:"#0056b3",secondary:"#6c757d",success:"#4caf50",danger:"#e53935",warning:"#ff9800",white:"#fff",text:{primary:"#333",secondary:"#666",light:"#777"},background:{primary:"#f9fafb",highlight:"#f0f7ff"},border:"#ddd"},spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px"},borderRadius:{small:"4px",medium:"8px"},boxShadow:{lg:"0 4px 10px rgba(0,0,0,0.08)"}},Tt=_.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
`,vt=_.div`
  background-color: ${i.colors.white};
  border-radius: ${i.borderRadius.medium};
  box-shadow: ${i.boxShadow.lg};
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
  scrollbar-color: ${i.colors.border} transparent;
  
  /* Custom scrollbar for webkit browsers */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${i.colors.border};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${i.colors.secondary};
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
    border-radius: ${i.borderRadius.small};
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
`,St=_.div`
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
`,It=_.div`
  direction: ${s=>s.$isRTL?"rtl":"ltr"};
`,Pt=_.h3`
  font-size: 24px;
  font-weight: 600;
  color: ${i.colors.text.primary};
  margin: 0 0 ${i.spacing.lg} 0;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 22px;
    margin: 0 0 ${i.spacing.md} 0;
  }
  
  @media (max-height: 700px) {
    font-size: 20px;
    margin: 0 0 ${i.spacing.md} 0;
  }
  
  @media (max-width: 480px) {
    font-size: 18px;
  }
`,At=_.p`
  margin-bottom: ${i.spacing.lg};
  font-size: 16px;
  color: ${i.colors.text.secondary};
  line-height: 1.5;
  
  @media (max-width: 768px) {
    margin-bottom: ${i.spacing.md};
    font-size: 15px;
  }
  
  @media (max-height: 700px) {
    margin-bottom: ${i.spacing.sm};
    font-size: 14px;
  }
`,Te=_.div`
  margin-bottom: ${i.spacing.lg};
`,ve=_.label`
  display: block;
  margin-bottom: ${i.spacing.sm};
  font-size: 14px;
  font-weight: 500;
  color: ${i.colors.text.primary};
`,_t=_.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${i.colors.border};
  border-radius: ${i.borderRadius.small};
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${i.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  &::placeholder {
    color: ${i.colors.text.light};
  }
`,Ft=_.div`
  display: flex;
  flex-direction: column;
  gap: ${i.spacing.md};
  margin-bottom: ${i.spacing.xl};
`,jt=_.div`
  border: 2px solid ${s=>s.$isSelected?i.colors.primary:i.colors.border};
  border-radius: ${i.borderRadius.medium};
  padding: ${i.spacing.lg};
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${s=>s.$isSelected?i.colors.background.highlight:i.colors.white};
  display: flex;
  align-items: center;
  gap: ${i.spacing.lg};
  
  @media (max-width: 768px) {
    padding: ${i.spacing.md};
    gap: ${i.spacing.md};
  }
  
  @media (max-width: 480px) {
    padding: ${i.spacing.sm};
    gap: ${i.spacing.sm};
  }
  
  @media (max-height: 700px) {
    padding: ${i.spacing.sm};
    gap: ${i.spacing.sm};
  }
`,kt=_.div`
  flex: 1;
`,Ct=_.div`
  margin-bottom: ${i.spacing.xs};
`,Dt=_.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${i.colors.primary};
  flex-shrink: 0;
`,Rt=_.label`
  font-size: 16px;
  font-weight: 500;
  color: ${i.colors.text.primary};
  cursor: pointer;
  display: block;
`,Et=_.div`
  font-size: 14px;
  color: ${i.colors.text.secondary};
  margin-top: ${i.spacing.xs};
`,Nt=_.div`
  color: ${i.colors.warning};
  font-size: 12px;
  font-style: italic;
  margin-top: ${i.spacing.xs};
  font-weight: 500;
`,Ot=_.div`
  display: flex;
  gap: ${i.spacing.sm};
  justify-content: center;
  margin-top: ${i.spacing.xl};
`,Se=_.button`
  background-color: ${s=>s.$variant==="danger"?i.colors.danger:s.$variant==="secondary"?"transparent":s.$variant==="success"?i.colors.success:i.colors.primary};
  color: ${s=>s.$variant==="secondary"?i.colors.primary:i.colors.white};
  border: ${s=>s.$variant==="secondary"?`1px solid ${i.colors.primary}`:"none"};
  padding: ${s=>s.$size==="small"?"8px 16px":s.$size==="large"?"16px 32px":"12px 24px"};
  border-radius: ${i.borderRadius.medium};
  cursor: ${s=>s.disabled?"not-allowed":"pointer"};
  font-size: ${s=>s.$size==="small"?"14px":s.$size==="large"?"18px":"16px"};
  font-weight: 500;
  transition: all 0.2s ease;
  opacity: ${s=>s.disabled?.6:1};
  min-width: 100px;

  &:hover:not(:disabled) {
    background-color: ${s=>s.$variant==="danger"?"#c62828":s.$variant==="secondary"?i.colors.background.highlight:s.$variant==="success"?"#388e3c":i.colors.primaryDark};
  }
`,Ut=_.div`
  background-color: ${i.colors.background.primary};
  border-radius: ${i.borderRadius.medium};
  padding: ${i.spacing.md};
  margin: ${i.spacing.md} 0;
  border-left: 4px solid ${i.colors.primary};
  font-size: 14px;
  color: ${i.colors.text.secondary};
  line-height: 1.4;
  
  @media (max-width: 768px) {
    padding: ${i.spacing.sm};
    margin: ${i.spacing.sm} 0;
    font-size: 13px;
  }
  
  @media (max-height: 700px) {
    padding: ${i.spacing.xs};
    font-size: 12px;
  }
`,zt=[{value:"NotVisible",titleKey:"Password Required To See Or Save",descriptionKey:"Album will be completely hidden until correct password is entered"},{value:"Watermark",titleKey:"Watermarked And No Saving Without Password",descriptionKey:"Photos will be visible with watermarks, password required to save"},{value:"CannotBeSaved",titleKey:"Password Required To Save",descriptionKey:"Photos are visible but password required to download or save"},{value:"NoPassword",titleKey:"No Password",descriptionKey:"Album is fully public with no restrictions"}],Bt=({isOpen:s,onClose:$,initialOption:w="NoPassword",initialPassword:T=""})=>{const{t:a,language:E}=Ie(),k=ne(E)==="rtl",[F,I]=A.useState(w),[D,B]=A.useState(T);if(A.useEffect(()=>{s&&(I(w),B(T))},[s,w,T]),!s)return null;const C=D.trim()==="",r=f=>{I(f)},O=f=>{f.target===f.currentTarget&&$()},b=f=>f!=="NoPassword";return t.jsxs(t.Fragment,{children:[t.jsx(Tt,{onClick:O}),t.jsx(vt,{children:t.jsx(St,{children:t.jsxs(It,{$isRTL:k,children:[t.jsx(Pt,{children:a("Album Password Policy")}),t.jsx(At,{children:a("Configure password protection for your album. Choose how you want to restrict access to your photos.")}),t.jsxs(Te,{children:[t.jsx(ve,{children:a("Enter Password")}),t.jsx(_t,{type:"text",placeholder:a("Enter password (optional)"),value:D,onChange:f=>B(f.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"})]}),t.jsxs(Te,{children:[t.jsx(ve,{children:a("Select Protection Level")}),t.jsx(Ft,{children:zt.map(f=>t.jsxs(jt,{$isSelected:F===f.value,onClick:()=>r(f.value),children:[t.jsx(Dt,{type:"radio",name:"protection",checked:F===f.value,onChange:()=>r(f.value)}),t.jsxs(kt,{children:[t.jsx(Ct,{children:t.jsx(Rt,{children:a(f.titleKey)})}),t.jsx(Et,{children:a(f.descriptionKey)}),C&&b(f.value)&&F===f.value&&t.jsx(Nt,{children:a('⚠️ Will use "password" as default if left empty')})]})]},f.value))})]}),b(F)&&t.jsxs(Ut,{children:[t.jsx("strong",{children:a("💡 Password Protection Info:")}),t.jsx("br",{}),a('If you leave the password field empty, "password" will be used as the default password. You can change this anytime in album settings.')]}),t.jsxs(Ot,{children:[t.jsx(Se,{$variant:"secondary",onClick:()=>$(),children:a("Cancel")}),t.jsx(Se,{$variant:"primary",onClick:()=>{const f=C&&b(F)?"password":D;console.log(`Saving with option: ${F}, password: ${f.length>0?"********":"none"}`),$(F,f)},children:a("Save Settings")})]})]})})})]})},Mt=`
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
`,qt=(s,$,w,T,a,E,k,F,I,D,B,C,r)=>{const[O,b]=A.useState(null),[f,e]=A.useState(null),K=async P=>{r(`Initializing folder ID with username: ${P}`);try{const N=new URLSearchParams(window.location.search).get("folderId");if(r(`Folder ID from URL: ${N||"null"}`),N){s(N),r(`Using existing folder ID: ${N}`);try{r(`Fetching details for folder: ${N}`);const S=await J(N,r);if(r("Folder details retrieved:",S),S){const z=`${P}_____${P}____Account`,o=S.creatorId===z;if(r(`User is creator of folder: ${o}, accountId: ${z}, creator: ${S.creatorId}`),w(o),o){r("User is creator, showing folder details"),T(!0),a(S.folderName),E(S.folderDescription),k(S.isOnPublicProfile),r(`Setting isOnPublicProfile: ${S.isOnPublicProfile}`),S.participantsCanAddItems!==void 0&&(F(S.participantsCanAddItems),r(`Setting participantsCanAddItems: ${S.participantsCanAddItems}`));const l=S.passwordPolicy;r(`Password policy from folder details: ${l}`),I(l),l!=="NoPassword"&&S.password&&D(S.password),r(`Set password protection option to: ${l}`)}else r("User is NOT the creator, hiding editable fields"),T(!1)}else r("No folder details retrieved, setting isCreator to true"),w(!0),T(!0)}catch(S){console.error("Error fetching folder details:",S),r(`Error fetching folder details: ${S}`),w(!1)}}else{const S=`${P}_____${me()}____Folder`;r(`Creating new folder ID: ${S}`),s(S),r("Setting isCreator to true for new album"),w(!0),T(!0)}}catch(x){console.error("Folder ID initialization error:",x),r(`Folder ID initialization error: ${x}`),w(!1)}},J=async(P,x)=>{var N,S,z,o,l,h,H,n;x(`Fetching details for folder ID: ${P}`);try{const d=await te();if(!d)return x("No token available for fetching folder details"),null;x("Sending GraphQL query to fetch folder details");const g=await(await fetch(re,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${d}`},body:JSON.stringify({query:Mt,variables:{folderIds:[P],fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(x("Folder details API response:",g),g.errors)return console.error("GraphQL errors:",g.errors),x(`GraphQL errors: ${JSON.stringify(g.errors)}`),null;const c=((S=(N=g==null?void 0:g.data)==null?void 0:N.fetchFolders)==null?void 0:S.items)||[];if(x(`Found ${c.length} folder items`),c.length===0)return x("No folder items found"),null;const p=c[0];x("Retrieved folder data:",p);const u=((o=(z=p.folderPosition)==null?void 0:z.profileIds)==null?void 0:o.some(v=>v.includes("Public____Profile")))||!1;x(`Folder is on public profile: ${u}`),x("Profile IDs:",(l=p.folderPosition)==null?void 0:l.profileIds);const y=(h=p.folderInviteParameters)==null?void 0:h.usingFolderInviteGrantsRightToAddItems;return x(`Participants can add items: ${y}`),{creatorId:p.creatorId||"",folderName:p.folderName||"",folderDescription:p.folderDescription||"",passwordPolicy:((H=p.folderPassword)==null?void 0:H.policy)||"NoPassword",password:((n=p.folderPassword)==null?void 0:n.password)||"",isOnPublicProfile:u,participantsCanAddItems:y!==void 0?y:!0}}catch(d){return console.error("Error in fetchFolderDetails:",d),x(`Error in fetchFolderDetails: ${d}`),null}},Q=()=>{r("Attempting to restore photos from localStorage");try{const P=localStorage.getItem(L.SELECTED_PHOTOS);if(r(`Found stored photos: ${P?"yes":"no"}`),P)try{const x=JSON.parse(P);r(`Parsed ${x.length} photos from localStorage`),Array.isArray(x)&&x.length>0&&($(x),r(`Restored ${x.length} photos to state`))}catch(x){console.error("Error parsing stored photos:",x),r(`Error parsing stored photos: ${x}`)}}catch(P){console.error("Error restoring photos from storage:",P),r(`Error restoring photos from storage: ${P}`)}},G=()=>{r("Testing S3 connection");try{Ke?r("S3 client is available"):(console.error("S3 client not available"),r("S3 client not available"))}catch(P){console.error("S3 connection test error:",P),r(`S3 connection test error: ${P}`)}},X=async()=>{var P;r("Starting component initialization");try{r("Checking login with refresh");const x=await te();if(!x){r("No token returned from login check, aborting initialization");return}try{const N=localStorage.getItem(L.PUBLIC_USERNAME);r(`Retrieved public username from localStorage: ${N||"null"}`),e(N||null);const z=JSON.parse(atob(x.split(".")[1]))["cognito:username"];if(z){r(`Extracted Cognito username from token: ${z}`),b(z);const o=localStorage.getItem(L.SUB_ALBUM_DATA);if(r(`Sub-album data from localStorage: ${o||"null"}`),o)try{const l=JSON.parse(o);if(r("Parsed sub-album data:",l),l.isSubAlbum&&((P=l.selectedFileIds)==null?void 0:P.length)>0){r(`Valid sub-album data found with ${l.selectedFileIds.length} files`),B(!0),C(l.selectedFileIds),l.selectedPhotos&&l.selectedPhotos.length>0&&(r(`Found ${l.selectedPhotos.length} selected photos in sub-album data`),$(l.selectedPhotos)),T(!0),w(!0);const h=`${z}_____${me()}____Folder`;r(`Generated new folder ID for sub-album: ${h}`),s(h)}else r("Invalid sub-album data, proceeding with normal initialization"),await K(z)}catch(l){console.error("Error parsing sub-album data:",l),r(`Error parsing sub-album data: ${l}`),await K(z)}else r("No sub-album data found, proceeding with normal folder initialization"),await K(z)}else r("No Cognito username found in token")}catch(N){console.error("User data initialization error:",N),r(`User data initialization error: ${N}`)}Q(),G(),r("Component initialization completed")}catch(x){console.error("Initialization error:",x),r(`Initialization error: ${x}`)}};return A.useEffect(()=>{X()},[]),{cognitoUsername:O,publicUsername:f,setPublicUsername:e}},Kt=(s,$,w,T,a,E,k,F,I,D,B,C=[],r,O,b,f,e)=>{const K=n=>(e(`Converting ${n.length} tags to API format`),n.map(d=>({TagType:d.TagType,tagTitle:d.tagTitle,selectedSubtagInputs:d.subtags.map(m=>({TagType:d.TagType,tagTitle:m.tagTitle,subtagTitle:m.subtagTitle}))}))),J=n=>{e(`Save progress text: ${n}`);const d=document.getElementById("saveProgressText");d&&(d.innerText=n)},Q=n=>{const d=document.getElementById("saveProgress");d?(d.style.width=`${n}%`,e(`Updated save progress bar: ${n}%`)):e("Progress bar element not found"),O(n)},G=(n,d)=>{e(`Splitting array of ${n.length} items into chunks of ${d}`);const m=[];for(let g=0;g<n.length;g+=d)m.push(n.slice(g,g+d));return e(`Created ${m.length} chunks`),m},X=n=>{const d=new Set;return n.filter(m=>d.has(m.fileId)?(e(`Skipping duplicate file reference with ID: ${m.fileId}`),!1):(d.add(m.fileId),!0))},P=(n,d,m,g=[])=>{e("Creating folder position input with tags"),e(`Profile visibility: ${F?"Public":"Only Me"}`),e(`Album-level tags: ${g.length} tags selected`);const c=F?[`${$}_____Public____Profile`]:["Only Me_____Only Me____Profile"];e(`Profile IDs: ${JSON.stringify(c)}`);let p=[];T&&a.length>0&&(e(`Creating file reference IDs for ${a.length} sub-album files`),p=a.map(U=>{const W=U.split("_____");if(W.length>=2){const se=W[1].split("____")[0],ee=`${m}_____${se}____FileReference`;return e(`Created file reference ID for sub-album: ${ee}`),ee}return e(`Using original fileId as fallback: ${U}`),U})),e(`Created ${p.length} acceptedFileReferenceIds`);const u=D!=="NoPassword"?B:null;if(e(`Password protection: ${D}`),e(`Album password: ${u?"******":"null"}`),e(`Participants can add items: ${I}`),!s)throw e("Error: folderId is null or undefined"),new Error("folderId is required to create folder position input");const y=We(s),v=Je(y);return{currentTime:n,folderId:s,profileIds:c,folderPositionSelectedTagInputs:g,folderPositionPoints:1,acceptedFileReferenceIds:p,folderInput:{folderSelectedTagInputs:g,folderAboutContactIds:[d],albumNanoId:v,folderName:E,folderDescription:k,folderPasswordInput:{password:u,policy:D},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,usingFolderInviteGrantsRightToRemoveItems:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:I,addedItemsNeedFolderCreatorApproval:!1}}}},x=(n,d,m,g=[])=>(e(`Creating file reference inputs with tags for ${n.length} photos`),n.map(c=>{var y;if(c.fileId)return e(`Using existing fileId for photo: ${c.fileId}`),{fileReferencesHolderId:s,currentTime:d,points:1,hasBeenDeleted:!1,selectedTagInputs:g,fileId:c.fileId,fileInput:null};const p=c.type==="video"||(y=c.type)!=null&&y.startsWith("video")?`Input/Video/${c.fileName}`:`Input/Image/${c.fileName}`,u=`${$}_____${c.fileName}____File`;return e(`Created file reference for ${c.fileName}:`),e(`  - dataKey: ${p}`),e(`  - fileId: ${u}`),e(`  - thumbnailDataKey: ${c.thumbnailDataKey||"undefined"}`),e(`  - size: ${c.size}`),e(`  - thumbnailSize: ${c.thumbnailSize||0}`),e(`  - duration: ${c.duration||"undefined"}`),e(`  - tags: ${g.length} tags selected`),{fileReferencesHolderId:s,currentTime:d,points:1,hasBeenDeleted:!1,selectedTagInputs:g,fileId:u,fileInput:{fileId:u,ownerFileInput:{editorContactIds:[m],FileSharingOptionsEnum:"Anyone",dataKey:p,thumbnailDataKey:c.thumbnailDataKey,dataInBytes:c.size,thumbnailDataInBytes:c.thumbnailSize||0,s3UploadedAt:d,durationInSeconds:c.duration},editorFileInput:{aboutContactIds:[m],captionText:"",numericFilterInputs:[]}}}})),N=async n=>{var c,p;e("Sending folder-only mutation (no file references)");const d=await te();if(!d)throw e("No token available for saving album, aborting"),new Error("Authentication token not available");const m=`
      mutation MyMutation($folderPositionInputs: [FolderPositionInput!]) {
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items {
            id
          }
        }
      }
    `,g={folderPositionInputs:[n]};e("GraphQL folder-only mutation variables:",g);try{e("Sending API request to save folder");const u=await fetch(re,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${d}`},body:JSON.stringify({query:m,variables:g})});e(`API response status: ${u.status}`);const y=await u.text();e(`API response raw text: ${y}`);const v=JSON.parse(y);if(e("API response JSON:",v),v.errors)throw console.error("Folder save failed:",v.errors),e("Folder save failed with errors:",v.errors),new Error("Failed to save folder");return e("Folder saved successfully"),((p=(c=v.data)==null?void 0:c.changeFiles)==null?void 0:p.items)||[]}catch(u){throw console.error("Error in sendFolderOnlyMutation:",u),e(`Error in sendFolderOnlyMutation: ${u}`),u}},S=async n=>{var c,p,u,y,v;e(`Sending file references-only mutation with ${n.length} items`);const d=await te();if(!d)throw e("No token available for saving file references, aborting"),new Error("Authentication token not available");const m=`
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
    `,g={updatedFileReferenceInputs:n};e("GraphQL file references-only mutation variables (first item):",n.length>0?n[0]:"No items");try{e("Sending API request to save file references");const U=await fetch(re,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${d}`},body:JSON.stringify({query:m,variables:g})});e(`API response status: ${U.status}`);const W=await U.text();e(`API response raw text: ${W.substring(0,500)}...`);const q=JSON.parse(W);if(e("API response JSON items count:",((u=(p=(c=q.data)==null?void 0:c.changeFiles0)==null?void 0:p.items)==null?void 0:u.length)||0),q.errors)throw console.error("File references save failed:",q.errors),e("File references save failed with errors:",q.errors),new Error("Failed to save file references");return e("File references chunk saved successfully"),((v=(y=q.data)==null?void 0:y.changeFiles0)==null?void 0:v.items)||[]}catch(U){throw console.error("Error in sendFileReferencesOnlyMutation:",U),e(`Error in sendFileReferencesOnlyMutation: ${U}`),U}},z=async(n,d)=>{var p,u,y,v,U,W,q,se,ee;e(`Sending final chunk with folder mutation (${n.length} file references)`);const m=await te();if(!m)throw e("No token available for saving final chunk, aborting"),new Error("Authentication token not available");const g=`
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
    `,c={folderPositionInputs:[d],updatedFileReferenceInputs:n};e("GraphQL final mutation variables (folder + last chunk)");try{e("Sending API request for final save with folder");const Y=await fetch(re,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${m}`},body:JSON.stringify({query:g,variables:c})});e(`API response status: ${Y.status}`);const R=await Y.text();e(`API response raw text: ${R.substring(0,500)}...`);const V=JSON.parse(R);if(e("API response JSON:",{fileReferencesCount:((y=(u=(p=V.data)==null?void 0:p.changeFiles0)==null?void 0:u.items)==null?void 0:y.length)||0,folderItems:((U=(v=V.data)==null?void 0:v.changeFiles)==null?void 0:U.items)||[]}),V.errors)throw console.error("Final save failed:",V.errors),e("Final save failed with errors:",V.errors),new Error("Failed to complete album save");return e("Final chunk and folder saved successfully"),{fileReferences:((q=(W=V.data)==null?void 0:W.changeFiles0)==null?void 0:q.items)||[],folderPositions:((ee=(se=V.data)==null?void 0:se.changeFiles)==null?void 0:ee.items)||[]}}catch(Y){throw console.error("Error in sendFinalChunkWithFolderMutation:",Y),e(`Error in sendFinalChunkWithFolderMutation: ${Y}`),Y}},o=async()=>(e("Validating required data"),await te()?$?s?(e("All required data validated successfully"),!0):(e("No folder ID, validation failed"),!1):(e("No Cognito username, validation failed"),!1):(e("No token available, validation failed"),!1)),l=()=>{e("Handling successful save"),He(b,f,[L.SELECTED_PHOTOS,L.SUB_ALBUM_DATA],e),e("Album data cleared");const n=document.getElementById("saveProgressText");n&&(n.innerText="Album saved successfully!",e("Updated progress text to 'Album saved successfully!'")),sessionStorage.setItem("album_just_saved","true"),e("Set 'album_just_saved' flag in sessionStorage"),e("Setting timeout for redirect to my-albums.html"),setTimeout(()=>{e("Redirecting to my-albums.html"),Ve("my-albums.html")},1e3)},h=async(n,d)=>{e("Starting chunked save process");try{J("Processing files in chunks...");const m=48;if(d.length===0)e("No file references to process, saving only folder position"),await N(n);else{const g=X(d);e(`After removing duplicates, processing ${g.length} unique file references`);const c=G(g,m);e(`Split file references into ${c.length} chunks of max size ${m}`);for(let p=0;p<c.length;p++){const u=c[p];e(`Processing chunk ${p+1} of ${c.length} with ${u.length} file references`);const y=p/c.length*80;O(10+y),Q(10+y),p<c.length-1?(J(`Saving files: chunk ${p+1} of ${c.length}...`),await S(u)):(J("Finalizing album..."),await z(u,n))}}O(100),Q(100),J("Album saved successfully!"),l()}catch(m){console.error("Error in chunked save process:",m),e(`Error in chunked save process: ${m}`),J(`Error: ${m}`),r(!1)}};return{saveAlbumDirectly:async()=>{e("Starting direct album save"),e(`Selected tags for album: ${C.length} tags`),r(!0),O(5);try{if(e("Validating required data for save"),!await o()){e("Required data validation failed, aborting save"),r(!1);return}const n=K(C);e("Converted tags for API:",n);const d=Math.floor(Date.now()/1e3),m=`${$}_____${$}____Account`,c=s.split("_____")[1].split("____")[0];e(`Save timestamp: ${d}`),e(`Account ID: ${m}`),e(`Folder ID: ${s}`),e(`Folder target item identifier: ${c}`),e("Creating folder position input");const p=P(d,m,c,n);e("Folder position input created:",p);let u=[];const y=w.filter(v=>v.status==="complete");if(e(`Found ${y.length} valid photos with 'complete' status`),y.length>0){const v=y.filter(W=>!W.fileId);e(`Found ${v.length} new uploads to move from temp to public folder`),v.length>0&&(e("Moving files from temp to public folder"),await Ge(v,Q,e)),e("Creating file reference inputs for uploads");const U=x(y,d,m,n);e(`Created ${U.length} file reference inputs for uploads`,U),u=u.concat(U)}if(T&&a.length>0){e(`Adding ${a.length} existing file references for sub-album`);const v=a.map(U=>(e(`Creating file reference for existing file ID: ${U}`),{fileReferencesHolderId:s,currentTime:d,points:1,hasBeenDeleted:!1,selectedTagInputs:n,fileId:U,fileInput:null}));e(`Created ${v.length} file reference inputs for existing files`,v),u=u.concat(v)}e(`Total file reference inputs: ${u.length}`),e("Sending GraphQL mutations with chunked file references"),await h(p,u)}catch(n){console.error("Error in saveAlbumDirectly:",n),e(`Error in saveAlbumDirectly: ${n}`),r(!1)}}}},Gt=({selectedPhotos:s,isSavingAlbum:$,onRemovePhoto:w})=>{const{t:T}=pe();return s.length===0?null:t.jsx(t.Fragment,{children:t.jsx(et,{children:s.map((a,E)=>{var k,F;return t.jsxs(tt,{children:[t.jsx(st,{$status:a.status,children:a.status==="complete"?"✓":a.status==="error"?"✕":a.status==="uploading"?"↑":a.status==="processing"?"⚙️":"•"}),t.jsxs(rt,{children:[a.type==="video"||(k=a.type)!=null&&k.startsWith("video")?t.jsx(it,{src:a.s3PreviewUrl,controls:!0}):t.jsx(ot,{src:a.s3PreviewUrl,alt:a.fileName}),(a.status==="uploading"||a.status==="processing")&&t.jsx(Ae,{$bottom:"4px",$left:"4px",$right:"4px",$height:"4px",children:t.jsx(_e,{$progress:a.progress,$status:a.status})})]}),t.jsxs(at,{children:[(F=a.type)!=null&&F.startsWith("video")?T("Video"):T("Image"),a.size&&` • ${(a.size/1024/1024).toFixed(1)} MB`,a.duration&&` • ${a.duration}s`]}),a.status==="error"&&a.errorMessage&&t.jsxs(nt,{$type:"error",children:[T("Error"),": ",a.errorMessage.length>40?a.errorMessage.substring(0,37)+"...":a.errorMessage]}),t.jsx(lt,{onClick:()=>w(E),disabled:$,children:T("Remove")})]},E)})})})},Wt=({isSavingAlbum:s,savingProgress:$})=>{const{t:w}=pe();return s?t.jsxs(Pe,{children:[t.jsx(dt,{children:w("Saving Album")}),t.jsx(ct,{id:"saveProgressText",children:w("Moving files...")}),t.jsx(Ae,{children:t.jsx(_e,{id:"saveProgress",$progress:$/100})})]}):null},Jt=({showFolderDetails:s,isCreator:$,folderName:w,setFolderName:T,folderDescription:a,setFolderDescription:E,isOnPublicProfile:k,handlePublicProfileToggle:F,participantsCanAddItems:I,handleParticipantsCanAddItemsToggle:D,isSavingAlbum:B})=>{const{t:C}=pe();return!s||$!==!0?null:t.jsxs(Pe,{children:[t.jsxs(xe,{children:[t.jsx(he,{htmlFor:"folderName",children:C("Album Name (Optional)")}),t.jsx(Ze,{id:"folderName",type:"text",value:w,onChange:r=>T(r.target.value),placeholder:C("Enter album name")})]}),t.jsxs(xe,{children:[t.jsx(he,{htmlFor:"folderDescription",children:C("Album Description (Optional)")}),t.jsx(Le,{id:"folderDescription",value:a,onChange:r=>E(r.target.value),placeholder:C("Enter album description"),rows:4})]}),t.jsxs(be,{children:[t.jsx($e,{children:C(k?"On Public Profile":"Not On Public Profile")}),t.jsxs(ye,{children:[t.jsx("input",{type:"checkbox",checked:k,onChange:F,disabled:B}),t.jsx(we,{})]})]}),t.jsxs(be,{children:[t.jsx($e,{children:C(I?"Participants Can Add Items":"Participants Cannot Add Items")}),t.jsxs(ye,{children:[t.jsx("input",{type:"checkbox",checked:I,onChange:D,disabled:B}),t.jsx(we,{})]})]})]})},pe=()=>({t:s=>s,language:"en"}),Ht=`
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
`,Vt=s=>{const[$,w]=A.useState([]),[T,a]=A.useState([]),[E,k]=A.useState(null),[F,I]=A.useState(!1),[D,B]=A.useState(null),[C,r]=A.useState(null),O=async()=>{var o,l;s("Fetching tags from API"),I(!0);try{const h=await te();if(!h){s("No token available for fetching tags");return}const n=await(await fetch(re,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${h}`},body:JSON.stringify({query:Ht,variables:{fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"Tag____File",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(s("Tags API response:",n),n.errors){console.error("GraphQL errors:",n.errors),s(`GraphQL errors: ${JSON.stringify(n.errors)}`);return}const m=(((l=(o=n==null?void 0:n.data)==null?void 0:o.fetchRelations)==null?void 0:l.items)||[]).map(g=>{var c,p;return{id:g.id,tagTitle:g.tagTitle,TagType:g.TagType,points:g.points,createdAt:g.createdAt,updatedAt:g.updatedAt,subtags:((p=(c=g.subtags)==null?void 0:c.items)==null?void 0:p.map(u=>({id:u.id,tagTitle:u.tagTitle,subtagTitle:u.subtagTitle,TagType:u.TagType,points:u.points,createdAt:u.createdAt,updatedAt:u.updatedAt})))||[]}});s(`Fetched ${m.length} tags`),w(m)}catch(h){console.error("Error fetching tags:",h),s(`Error fetching tags: ${h}`)}finally{I(!1)}},b=o=>{if(s(`Selecting tag: ${o.tagTitle}`),!T.find(h=>h.tagTitle===o.tagTitle)){const h={tagTitle:o.tagTitle,TagType:o.TagType,subtags:[]};a(H=>[...H,h]),s(`Tag ${o.tagTitle} added to selection`)}},f=o=>{s(`Unselecting tag: ${o.tagTitle}`),a(l=>l.filter(h=>h.tagTitle!==o.tagTitle)),E===o.id&&k(null)},e=o=>{s(`Selecting subtag: ${o.subtagTitle} for tag: ${o.tagTitle}`),a(l=>l.map(h=>h.tagTitle===o.tagTitle&&!h.subtags.find(n=>n.subtagTitle===o.subtagTitle)?{...h,subtags:[...h.subtags,{tagTitle:o.tagTitle,subtagTitle:o.subtagTitle}]}:h))},K=o=>{s(`Unselecting subtag: ${o.subtagTitle} for tag: ${o.tagTitle}`),a(l=>l.map(h=>h.tagTitle===o.tagTitle?{...h,subtags:h.subtags.filter(H=>H.subtagTitle!==o.subtagTitle)}:h))},J=o=>{s(`Setting displayed tag: ${o}`),k(o)},Q=o=>T.some(l=>l.tagTitle===o.tagTitle),G=o=>{const l=T.find(h=>h.tagTitle===o.tagTitle);return(l==null?void 0:l.subtags.some(h=>h.subtagTitle===o.subtagTitle))||!1},X=()=>{if(!E)return[];const o=$.find(l=>l.id===E);return(o==null?void 0:o.subtags)||[]},P=async(o,l)=>(s(`Placeholder: Adding new tag: ${o} of type: ${l}`),!1),x=async(o,l,h)=>(s(`Placeholder: Adding new subtag: ${l} to tag: ${o}`),!1),N=async o=>(s(`Placeholder: Deleting tag: ${o}`),!1),S=async o=>(s(`Placeholder: Deleting subtag: ${o}`),!1),z=async(o,l)=>(s(`Placeholder: Updating tag points: ${o} to ${l}`),!1);return A.useEffect(()=>{O()},[]),{tags:$,selectedTags:T,displayedTagId:E,isLoadingTags:F,tagIdBeingDeleted:D,subtagIdBeingDeleted:C,fetchTags:O,selectTag:b,unselectTag:f,selectSubtag:e,unselectSubtag:K,setDisplayedTag:J,isTagSelected:Q,isSubtagSelected:G,getDisplayedTagSubtags:X,setTagIdBeingDeleted:B,setSubtagIdBeingDeleted:r,addNewTag:P,addNewSubtag:x,deleteTag:N,deleteSubtag:S,updateTagPoints:z}},Qt=_.div`
  margin: 16px 0;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
`,le=_.div`
  margin-bottom: 12px;
`,de=_.h3`
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
`,ce=_.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  min-height: 32px;
`,Fe=_.button`
  padding: 6px 12px;
  border: 1px solid ${s=>s.$isSelected?"#007bff":"#ced4da"};
  border-radius: 16px;
  background: ${s=>s.$isSelected?"#007bff":"#ffffff"};
  color: ${s=>s.$isSelected?"#ffffff":"#495057"};
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  
  ${s=>s.$isDisplayed&&`
    border-color: #28a745;
    background: #28a745;
    color: white;
  `}

  &:hover {
    background: ${s=>s.$isSelected?"#0056b3":"#e9ecef"};
    ${s=>s.$isDisplayed&&`
      background: #1e7e34;
    `}
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`,Yt=_(Fe)`
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
`,Xt=_.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
`,je=_.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
`,ue=_.button`
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
`,Zt=({tagsManager:s,disabled:$=!1,enhancedLog:w})=>{const{tags:T,selectedTags:a,displayedTagId:E,isLoadingTags:k,selectTag:F,unselectTag:I,setDisplayedTag:D,isTagSelected:B}=s,C=b=>{if($)return;const f=B(b),e=E===b.id;f?f&&!e?(D(b.id),w(`Displayed tag: ${b.tagTitle}`)):f&&e&&(I(b),D(null),w(`Unselected tag: ${b.tagTitle}`)):(F(b),D(b.id),w(`Selected and displayed tag: ${b.tagTitle}`))},r=b=>{const f=a.find(K=>K.tagTitle===b.tagTitle);if(!f||f.subtags.length===0)return b.tagTitle;const e=f.subtags.map(K=>K.subtagTitle).join(" || ");return`${b.tagTitle}  |  ${e}`},O=[...T].sort((b,f)=>b.points!==f.points?f.points-b.points:f.updatedAt-b.updatedAt);return t.jsxs(Qt,{children:[t.jsxs(le,{children:[t.jsx(de,{children:"Tags"}),t.jsx(ce,{children:k?t.jsx(Xt,{children:"Loading tags..."}):O.length===0?t.jsx(je,{children:"No tags available"}):t.jsxs(t.Fragment,{children:[O.map(b=>t.jsx(Fe,{$isSelected:B(b),$isDisplayed:E===b.id,disabled:$,onClick:()=>C(b),children:r(b)},b.id)),t.jsx(ue,{disabled:$,children:"+ Add Tag"})]})})]}),E&&t.jsx(Lt,{tagsManager:s,disabled:$,enhancedLog:w})]})},Lt=({tagsManager:s,disabled:$=!1,enhancedLog:w})=>{var C;const{displayedTagId:T,selectSubtag:a,unselectSubtag:E,isSubtagSelected:k}=s,F=T?((C=s.tags.find(r=>r.id===T))==null?void 0:C.subtags)||[]:[],I=s.tags.find(r=>r.id===T),D=r=>{if($)return;k(r)?(E(r),w(`Unselected subtag: ${r.subtagTitle}`)):(a(r),w(`Selected subtag: ${r.subtagTitle}`))};if(!I||F.length===0)return t.jsxs(le,{children:[t.jsxs(de,{children:['Subtags for "',I==null?void 0:I.tagTitle,'"']}),t.jsxs(ce,{children:[t.jsx(je,{children:"No subtags available"}),t.jsx(ue,{disabled:$,children:"+ Add Subtag"})]})]});const B=[...F].sort((r,O)=>r.points!==O.points?O.points-r.points:O.updatedAt-r.updatedAt);return t.jsxs(le,{children:[t.jsxs(de,{children:['Subtags for "',I.tagTitle,'"']}),t.jsxs(ce,{children:[B.map(r=>t.jsx(Yt,{$isSelected:k(r),disabled:$,onClick:()=>D(r),children:r.subtagTitle},r.id)),t.jsx(ue,{disabled:$,children:"+ Add Subtag"})]})]})},es=()=>{const{t:s,language:$}=Ie(),w=ne($)==="rtl",T=xt(s),{setShowUsernamePrompt:a,setUsernameInput:E}=T,[k,F]=A.useState(null),[I,D]=A.useState(!1),[B,C]=A.useState(0),[r,O]=A.useState(""),[b,f]=A.useState(""),[e,K]=A.useState(!1),[J,Q]=A.useState(!1),[G,X]=A.useState("NoPassword"),[P,x]=A.useState(""),[N,S]=A.useState(!1),[z,o]=A.useState(!0),[l,h]=A.useState(null),[H,n]=A.useState(!1),[d,m]=A.useState([]),g=j=>{!k&&j&&F(j)},{fileInputRef:c,selectedPhotos:p,setSelectedPhotos:u,isUploading:y,progressTracker:v,setProgressTracker:U,debugMessages:W,currentFolderId:q,openFilePicker:se,handleFileSelection:ee,log:Y}=bt(g);A.useEffect(()=>{(async()=>{try{await Xe(),Y("🔥 Save-album page S3 credentials prewarmed successfully")}catch(M){Y(`⚠️ Save-album page credential prewarming failed: ${String(M)}`)}})()},[]);const R=(j,M)=>{let Z=`[${new Date().toISOString()}] ${j}`;if(M!==void 0)try{const oe=typeof M=="object"?JSON.stringify(M,null,2):String(M);Z+=`
Data: ${oe}`,console.log(Z),console.log("Data object:",M)}catch(oe){Z+=` [Error stringifying data: ${oe}]`,console.log(Z),console.log("Raw data:",M)}else console.log(Z);Y(Z)},V=Vt(R),{cognitoUsername:fe,publicUsername:ie,setPublicUsername:ke}=qt(F,u,h,K,O,f,S,o,X,x,n,m,R),{saveAlbumDirectly:ge}=Kt(k||q,fe,p,H,d,r,b,N,z,G,P,V.selectedTags,D,C,u,U,R);A.useEffect(()=>{q&&!k&&(F(q),R(`Updated folder ID from upload processor: ${q}`))},[q,k]);const Ce=j=>{R(`Removing photo at index: ${j}`);const M=p.filter((qe,Z)=>Z!==j);u(M),R(`New photos count: ${M.length}`),M.length>0?(localStorage.setItem(L.SELECTED_PHOTOS,JSON.stringify(M)),R(`Updated localStorage with ${M.length} photos`)):(localStorage.removeItem(L.SELECTED_PHOTOS),R("Removed photos from localStorage"))},De=()=>{const j=!N;R(`Toggling isOnPublicProfile to: ${j}`),S(j)},Re=()=>{const j=!z;R(`Toggling participantsCanAddItems to: ${j}`),o(j)},Ee=async()=>{R("Album save initiated"),R("Selected tags for album:",V.selectedTags),D(!0);try{if(ie!=null&&ie.startsWith("Profile-")){R("Public username starts with 'Profile-', showing username prompt"),E(""),a(!0),D(!1);return}R("Valid username found, proceeding to save album directly"),ge()}catch(j){console.error("Error in handleSaveAlbum:",j),R(`Error in handleSaveAlbum: ${j}`),D(!1)}},Ne=j=>{R(`Handling successful username update to: ${j}`),localStorage.setItem(L.PUBLIC_USERNAME,j),ke(j),a(!1),R("Proceeding to save album after username update"),ge()},Oe=(j,M)=>{R(`Password dialog closed with option: ${j}, password: ${M?"******":"undefined"}`),j&&X(j),M!==void 0&&x(M),Q(!1)},Ue=()=>G==="NoPassword"?s("Album Password Policy"):`${s(G==="NotVisible"?"Password Required To See Or Save":G==="Watermark"?"Watermarked And No Saving Without Password":"Password Required To Save")} ${P?`(${P})`:""}`,ze=()=>{R("Opening password dialog"),Q(!0)},Be=()=>{R("Add photos button clicked"),se(k)},Me=I||y;return t.jsxs(t.Fragment,{children:[t.jsx(ut,{}),t.jsxs(pt,{$isRTL:w,children:[t.jsxs("div",{style:{maxWidth:"900px",margin:"0 auto"},children:[t.jsxs(ft,{children:[t.jsx(gt,{href:"my-albums.html",children:s("My Albums")}),t.jsx(yt,{t:s})]}),t.jsx(Jt,{showFolderDetails:e,isCreator:l,folderName:r,setFolderName:O,folderDescription:b,setFolderDescription:f,isOnPublicProfile:N,handlePublicProfileToggle:De,participantsCanAddItems:z,handleParticipantsCanAddItemsToggle:Re,isSavingAlbum:I||y}),e&&l===!0&&t.jsx(Zt,{tagsManager:V,disabled:Me,enhancedLog:R}),(y||v.totalFiles>0&&(v.filesUploading>0||v.filesProcessing>0||v.filesComplete<v.totalFiles))&&t.jsx($t,{progressTracker:v,isRTL:ne($)==="rtl",variant:"detailed",context:"saving",isUploading:y,showSuccessMessage:!1,showErrorMessage:!0,customMessages:{error:s("Some photos could not be processed. You can continue with the successfully processed photos.")}}),t.jsx("input",{ref:c,id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:j=>ee(j,fe),style:{display:"none"}}),t.jsx(Gt,{selectedPhotos:p,isSavingAlbum:I||y,onRemovePhoto:Ce}),t.jsx(Wt,{isSavingAlbum:I,savingProgress:B}),t.jsxs(mt,{children:[t.jsx(ae,{onClick:Be,disabled:I||y,children:s(y?"Uploading...":"Add More Photos")}),l===!0&&t.jsx(ae,{$passwordSet:G!=="NoPassword",onClick:ze,disabled:I||y,children:Ue()}),t.jsx(ae,{$primary:!0,onClick:Ee,disabled:I||y,children:s(I?"Saving Album...":"Save Album")})]}),t.jsx(ht,{t:s,language:$,usernameManager:T,onSuccess:Ne}),t.jsx(Bt,{isOpen:J,onClose:Oe,initialOption:G,initialPassword:P})]}),t.jsx(wt,{debugMessages:W,t:s,isRTL:w,textDirection:w?"rtl":"ltr"})]})]})},ts=()=>t.jsx(Ye,{children:t.jsx(es,{})});Qe.createRoot(document.getElementById("root")).render(t.jsx(ts,{}));
