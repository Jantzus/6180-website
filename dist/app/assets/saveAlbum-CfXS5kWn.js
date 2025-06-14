import{d as A,u as we,a as P,j as t,g as ae,h as L,L as Q,i as ce,s as Ee,m as Ne,f as re,k as Oe,l as Ue,n as ze,r as Me,R as Be,I as qe,p as Ke}from"./utils-CuQXS0Z6.js";import{C as ve,F as ue,e as fe,f as We,g as Ge,T as pe,h as me,i as ge,j as he,P as Je,k as He,S as Ve,l as Qe,V as Ye,m as Xe,n as ye,o as Ie,p as Ze,M as Le,R as et,q as tt,r as rt,G as st,A as it,H as ot,s as at,t as nt,B as oe}from"./styled-components-DxUUvbaG.js";import{u as lt,U as dt}from"./useUsernameManagement-BTXr6t1o.js";import{u as ct,U as ut}from"./useFileUploadProcessor-D1hsxDoX.js";import{L as ft,D as pt}from"./DebugLog-C1i-ocnz.js";const s={colors:{primary:"#007bff",primaryDark:"#0056b3",secondary:"#6c757d",success:"#4caf50",danger:"#e53935",warning:"#ff9800",white:"#fff",text:{primary:"#333",secondary:"#666",light:"#777"},background:{primary:"#f9fafb",highlight:"#f0f7ff"},border:"#ddd"},spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px"},borderRadius:{small:"4px",medium:"8px"},boxShadow:{lg:"0 4px 10px rgba(0,0,0,0.08)"}},mt=A.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
`,gt=A.div`
  background-color: ${s.colors.white};
  border-radius: ${s.borderRadius.medium};
  box-shadow: ${s.boxShadow.lg};
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
  scrollbar-color: ${s.colors.border} transparent;
  
  /* Custom scrollbar for webkit browsers */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${s.colors.border};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${s.colors.secondary};
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
    border-radius: ${s.borderRadius.small};
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
`,ht=A.div`
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
`,xt=A.div`
  direction: ${r=>r.$isRTL?"rtl":"ltr"};
`,bt=A.h3`
  font-size: 24px;
  font-weight: 600;
  color: ${s.colors.text.primary};
  margin: 0 0 ${s.spacing.lg} 0;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 22px;
    margin: 0 0 ${s.spacing.md} 0;
  }
  
  @media (max-height: 700px) {
    font-size: 20px;
    margin: 0 0 ${s.spacing.md} 0;
  }
  
  @media (max-width: 480px) {
    font-size: 18px;
  }
`,$t=A.p`
  margin-bottom: ${s.spacing.lg};
  font-size: 16px;
  color: ${s.colors.text.secondary};
  line-height: 1.5;
  
  @media (max-width: 768px) {
    margin-bottom: ${s.spacing.md};
    font-size: 15px;
  }
  
  @media (max-height: 700px) {
    margin-bottom: ${s.spacing.sm};
    font-size: 14px;
  }
`,xe=A.div`
  margin-bottom: ${s.spacing.lg};
`,be=A.label`
  display: block;
  margin-bottom: ${s.spacing.sm};
  font-size: 14px;
  font-weight: 500;
  color: ${s.colors.text.primary};
`,wt=A.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${s.colors.border};
  border-radius: ${s.borderRadius.small};
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${s.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  &::placeholder {
    color: ${s.colors.text.light};
  }
`,vt=A.div`
  display: flex;
  flex-direction: column;
  gap: ${s.spacing.md};
  margin-bottom: ${s.spacing.xl};
`,yt=A.div`
  border: 2px solid ${r=>r.$isSelected?s.colors.primary:s.colors.border};
  border-radius: ${s.borderRadius.medium};
  padding: ${s.spacing.lg};
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${r=>r.$isSelected?s.colors.background.highlight:s.colors.white};
  display: flex;
  align-items: center;
  gap: ${s.spacing.lg};
  
  @media (max-width: 768px) {
    padding: ${s.spacing.md};
    gap: ${s.spacing.md};
  }
  
  @media (max-width: 480px) {
    padding: ${s.spacing.sm};
    gap: ${s.spacing.sm};
  }
  
  @media (max-height: 700px) {
    padding: ${s.spacing.sm};
    gap: ${s.spacing.sm};
  }
`,It=A.div`
  flex: 1;
`,Pt=A.div`
  margin-bottom: ${s.spacing.xs};
`,St=A.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${s.colors.primary};
  flex-shrink: 0;
`,Ft=A.label`
  font-size: 16px;
  font-weight: 500;
  color: ${s.colors.text.primary};
  cursor: pointer;
  display: block;
`,_t=A.div`
  font-size: 14px;
  color: ${s.colors.text.secondary};
  margin-top: ${s.spacing.xs};
`,At=A.div`
  color: ${s.colors.warning};
  font-size: 12px;
  font-style: italic;
  margin-top: ${s.spacing.xs};
  font-weight: 500;
`,Ct=A.div`
  display: flex;
  gap: ${s.spacing.sm};
  justify-content: center;
  margin-top: ${s.spacing.xl};
`,$e=A.button`
  background-color: ${r=>r.$variant==="danger"?s.colors.danger:r.$variant==="secondary"?"transparent":r.$variant==="success"?s.colors.success:s.colors.primary};
  color: ${r=>r.$variant==="secondary"?s.colors.primary:s.colors.white};
  border: ${r=>r.$variant==="secondary"?`1px solid ${s.colors.primary}`:"none"};
  padding: ${r=>r.$size==="small"?"8px 16px":r.$size==="large"?"16px 32px":"12px 24px"};
  border-radius: ${s.borderRadius.medium};
  cursor: ${r=>r.disabled?"not-allowed":"pointer"};
  font-size: ${r=>r.$size==="small"?"14px":r.$size==="large"?"18px":"16px"};
  font-weight: 500;
  transition: all 0.2s ease;
  opacity: ${r=>r.disabled?.6:1};
  min-width: 100px;

  &:hover:not(:disabled) {
    background-color: ${r=>r.$variant==="danger"?"#c62828":r.$variant==="secondary"?s.colors.background.highlight:r.$variant==="success"?"#388e3c":s.colors.primaryDark};
  }
`,kt=A.div`
  background-color: ${s.colors.background.primary};
  border-radius: ${s.borderRadius.medium};
  padding: ${s.spacing.md};
  margin: ${s.spacing.md} 0;
  border-left: 4px solid ${s.colors.primary};
  font-size: 14px;
  color: ${s.colors.text.secondary};
  line-height: 1.4;
  
  @media (max-width: 768px) {
    padding: ${s.spacing.sm};
    margin: ${s.spacing.sm} 0;
    font-size: 13px;
  }
  
  @media (max-height: 700px) {
    padding: ${s.spacing.xs};
    font-size: 12px;
  }
`,jt=[{value:"NotVisible",titleKey:"Password Required To See Or Save",descriptionKey:"Album will be completely hidden until correct password is entered"},{value:"Watermark",titleKey:"Watermarked And No Saving Without Password",descriptionKey:"Photos will be visible with watermarks, password required to save"},{value:"CannotBeSaved",titleKey:"Password Required To Save",descriptionKey:"Photos are visible but password required to download or save"},{value:"NoPassword",titleKey:"No Password",descriptionKey:"Album is fully public with no restrictions"}],Tt=({isOpen:r,onClose:y,initialOption:v="NoPassword",initialPassword:I=""})=>{const{t:o,language:O}=we(),D=ae(O)==="rtl",[S,k]=P.useState(v),[R,z]=P.useState(I);if(P.useEffect(()=>{r&&(k(v),z(I))},[r,v,I]),!r)return null;const _=R.trim()==="",i=e=>{k(e)},G=e=>{e.target===e.currentTarget&&y()},B=e=>e!=="NoPassword";return t.jsxs(t.Fragment,{children:[t.jsx(mt,{onClick:G}),t.jsx(gt,{children:t.jsx(ht,{children:t.jsxs(xt,{$isRTL:D,children:[t.jsx(bt,{children:o("Album Password Policy")}),t.jsx($t,{children:o("Configure password protection for your album. Choose how you want to restrict access to your photos.")}),t.jsxs(xe,{children:[t.jsx(be,{children:o("Enter Password")}),t.jsx(wt,{type:"text",placeholder:o("Enter password (optional)"),value:R,onChange:e=>z(e.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"})]}),t.jsxs(xe,{children:[t.jsx(be,{children:o("Select Protection Level")}),t.jsx(vt,{children:jt.map(e=>t.jsxs(yt,{$isSelected:S===e.value,onClick:()=>i(e.value),children:[t.jsx(St,{type:"radio",name:"protection",checked:S===e.value,onChange:()=>i(e.value)}),t.jsxs(It,{children:[t.jsx(Pt,{children:t.jsx(Ft,{children:o(e.titleKey)})}),t.jsx(_t,{children:o(e.descriptionKey)}),_&&B(e.value)&&S===e.value&&t.jsx(At,{children:o('⚠️ Will use "password" as default if left empty')})]})]},e.value))})]}),B(S)&&t.jsxs(kt,{children:[t.jsx("strong",{children:o("💡 Password Protection Info:")}),t.jsx("br",{}),o('If you leave the password field empty, "password" will be used as the default password. You can change this anytime in album settings.')]}),t.jsxs(Ct,{children:[t.jsx($e,{$variant:"secondary",onClick:()=>y(),children:o("Cancel")}),t.jsx($e,{$variant:"primary",onClick:()=>{const e=_&&B(S)?"password":R;console.log(`Saving with option: ${S}, password: ${e.length>0?"********":"none"}`),y(S,e)},children:o("Save Settings")})]})]})})})]})},Dt=`
  query FetchFolders($folderIds: [String!]!) {
    fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
      items {
        ... on Folder {
          id
          albumNanoId
          folderName
          folderDescription
          creatorId
          createdAt
          updatedAt
          folderPassword {
            password
            policy
          }
          fileReferencesPage {
            items {
              file {
                id
                ownerContactId
                dataKey
                thumbnailDataKey
                durationInSeconds
                dataInBytes
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
`,Rt=(r,y,v,I,o,O,D,S,k,R,z,_,i)=>{const[G,B]=P.useState(null),[e,q]=P.useState(null),W=async b=>{i(`Initializing folder ID with username: ${b}`);try{const F=new URLSearchParams(window.location.search).get("folderId");if(i(`Folder ID from URL: ${F||"null"}`),F){r(F),i(`Using existing folder ID: ${F}`);try{i(`Fetching details for folder: ${F}`);const m=await ee(F,i);if(i("Folder details retrieved:",m),m){const C=`${b}_____${b}____Account`,E=m.creatorId===C;if(i(`User is creator of folder: ${E}, accountId: ${C}, creator: ${m.creatorId}`),v(E),E){i("User is creator, showing folder details"),I(!0),o(m.folderName),O(m.folderDescription),D(m.isOnPublicProfile),i(`Setting isOnPublicProfile: ${m.isOnPublicProfile}`),m.participantsCanAddItems!==void 0&&(S(m.participantsCanAddItems),i(`Setting participantsCanAddItems: ${m.participantsCanAddItems}`));const w=m.passwordPolicy;i(`Password policy from folder details: ${w}`),k(w),w!=="NoPassword"&&m.password&&R(m.password),i(`Set password protection option to: ${w}`)}else i("User is NOT the creator, hiding editable fields"),I(!1)}else i("No folder details retrieved, setting isCreator to true"),v(!0),I(!0)}catch(m){console.error("Error fetching folder details:",m),i(`Error fetching folder details: ${m}`),v(!1)}}else{const m=`${b}_____${ce()}____Folder`;i(`Creating new folder ID: ${m}`),r(m),i("Setting isCreator to true for new album"),v(!0),I(!0)}}catch(u){console.error("Folder ID initialization error:",u),i(`Folder ID initialization error: ${u}`),v(!1)}},ee=async(b,u)=>{var F,m,C,E,w,a,d,f;u(`Fetching details for folder ID: ${b}`);try{const n=await L();if(!n)return u("No token available for fetching folder details"),null;u("Sending GraphQL query to fetch folder details");const l=await(await fetch(re,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({query:Dt,variables:{folderIds:[b],fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:2e3,scanIndexForward:!1}}})})).json();if(u("Folder details API response:",l),l.errors)return console.error("GraphQL errors:",l.errors),u(`GraphQL errors: ${JSON.stringify(l.errors)}`),null;const p=((m=(F=l==null?void 0:l.data)==null?void 0:F.fetchFolders)==null?void 0:m.items)||[];if(u(`Found ${p.length} folder items`),p.length===0)return u("No folder items found"),null;const c=p[0];u("Retrieved folder data:",c);const g=((E=(C=c.folderPosition)==null?void 0:C.profileIds)==null?void 0:E.some(N=>N.includes("Public____Profile")))||!1;u(`Folder is on public profile: ${g}`),u("Profile IDs:",(w=c.folderPosition)==null?void 0:w.profileIds);const $=(a=c.folderInviteParameters)==null?void 0:a.usingFolderInviteGrantsRightToAddItems;return u(`Participants can add items: ${$}`),{creatorId:c.creatorId||"",folderName:c.folderName||"",folderDescription:c.folderDescription||"",passwordPolicy:((d=c.folderPassword)==null?void 0:d.policy)||"NoPassword",password:((f=c.folderPassword)==null?void 0:f.password)||"",isOnPublicProfile:g,participantsCanAddItems:$!==void 0?$:!0}}catch(n){return console.error("Error in fetchFolderDetails:",n),u(`Error in fetchFolderDetails: ${n}`),null}},X=()=>{i("Attempting to restore photos from localStorage");try{const b=localStorage.getItem(Q.SELECTED_PHOTOS);if(i(`Found stored photos: ${b?"yes":"no"}`),b)try{const u=JSON.parse(b);i(`Parsed ${u.length} photos from localStorage`),Array.isArray(u)&&u.length>0&&(y(u),i(`Restored ${u.length} photos to state`))}catch(u){console.error("Error parsing stored photos:",u),i(`Error parsing stored photos: ${u}`)}}catch(b){console.error("Error restoring photos from storage:",b),i(`Error restoring photos from storage: ${b}`)}},K=()=>{i("Testing S3 connection");try{Ee?i("S3 client is available"):(console.error("S3 client not available"),i("S3 client not available"))}catch(b){console.error("S3 connection test error:",b),i(`S3 connection test error: ${b}`)}},Z=async()=>{var b;i("Starting component initialization");try{i("Checking login with refresh");const u=await L();if(!u){i("No token returned from login check, aborting initialization");return}try{const F=localStorage.getItem(Q.PUBLIC_USERNAME);i(`Retrieved public username from localStorage: ${F||"null"}`),q(F||null);const C=JSON.parse(atob(u.split(".")[1]))["cognito:username"];if(C){i(`Extracted Cognito username from token: ${C}`),B(C);const E=localStorage.getItem(Q.SUB_ALBUM_DATA);if(i(`Sub-album data from localStorage: ${E||"null"}`),E)try{const w=JSON.parse(E);if(i("Parsed sub-album data:",w),w.isSubAlbum&&((b=w.selectedFileIds)==null?void 0:b.length)>0){i(`Valid sub-album data found with ${w.selectedFileIds.length} files`),z(!0),_(w.selectedFileIds),w.selectedPhotos&&w.selectedPhotos.length>0&&(i(`Found ${w.selectedPhotos.length} selected photos in sub-album data`),y(w.selectedPhotos)),I(!0),v(!0);const a=`${C}_____${ce()}____Folder`;i(`Generated new folder ID for sub-album: ${a}`),r(a)}else i("Invalid sub-album data, proceeding with normal initialization"),await W(C)}catch(w){console.error("Error parsing sub-album data:",w),i(`Error parsing sub-album data: ${w}`),await W(C)}else i("No sub-album data found, proceeding with normal folder initialization"),await W(C)}else i("No Cognito username found in token")}catch(F){console.error("User data initialization error:",F),i(`User data initialization error: ${F}`)}X(),K(),i("Component initialization completed")}catch(u){console.error("Initialization error:",u),i(`Initialization error: ${u}`)}};return P.useEffect(()=>{Z()},[]),{cognitoUsername:G,publicUsername:e,setPublicUsername:q}},Et=(r,y,v,I,o,O,D,S,k,R,z,_,i,G,B,e)=>{const q=a=>{e(`Save progress text: ${a}`);const d=document.getElementById("saveProgressText");d&&(d.innerText=a)},W=a=>{const d=document.getElementById("saveProgress");d?(d.style.width=`${a}%`,e(`Updated save progress bar: ${a}%`)):e("Progress bar element not found"),i(a)},ee=(a,d)=>{e(`Splitting array of ${a.length} items into chunks of ${d}`);const f=[];for(let n=0;n<a.length;n+=d)f.push(a.slice(n,n+d));return e(`Created ${f.length} chunks`),f},X=a=>{const d=new Set;return a.filter(f=>d.has(f.fileId)?(e(`Skipping duplicate file reference with ID: ${f.fileId}`),!1):(d.add(f.fileId),!0))},K=(a,d,f)=>{e("Creating folder position input"),e(`Profile visibility: ${S?"Public":"Only Me"}`);const n=S?[`${y}_____Public____Profile`]:["Only Me_____Only Me____Profile"];e(`Profile IDs: ${JSON.stringify(n)}`);let h=[];I&&o.length>0&&(e(`Creating file reference IDs for ${o.length} sub-album files`),h=o.map(g=>{const $=g.split("_____");if($.length>=2){const U=$[1].split("____")[0],Y=`${f}_____${U}____FileReference`;return e(`Created file reference ID for sub-album: ${Y}`),Y}return e(`Using original fileId as fallback: ${g}`),g})),e(`Created ${h.length} acceptedFileReferenceIds`);const l=R!=="NoPassword"?z:null;if(e(`Password protection: ${R}`),e(`Album password: ${l?"******":"null"}`),e(`Participants can add items: ${k}`),!r)throw e("Error: folderId is null or undefined"),new Error("folderId is required to create folder position input");const p=Oe(r),c=Ue(p);return{currentTime:a,folderId:r,profileIds:n,folderPositionSelectedTagInputs:[],folderPositionPoints:1,acceptedFileReferenceIds:h,folderInput:{folderSelectedTagInputs:[],folderAboutContactIds:[d],albumNanoId:c,folderName:O,folderDescription:D,folderPasswordInput:{password:l,policy:R},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,usingFolderInviteGrantsRightToRemoveItems:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:k,addedItemsNeedFolderCreatorApproval:!1}}}},Z=(a,d,f)=>(e(`Creating file reference inputs for ${a.length} photos`),a.map(n=>{var p;if(n.fileId)return e(`Using existing fileId for photo: ${n.fileId}`),{fileReferencesHolderId:r,currentTime:d,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:n.fileId,fileInput:null};const h=n.type==="video"||(p=n.type)!=null&&p.startsWith("video")?`Input/Video/${n.fileName}`:`Input/Image/${n.fileName}`,l=`${y}_____${n.fileName}____File`;return e(`Created file reference for ${n.fileName}:`),e(`  - dataKey: ${h}`),e(`  - fileId: ${l}`),e(`  - thumbnailDataKey: ${n.thumbnailDataKey||"undefined"}`),e(`  - size: ${n.size}`),e(`  - thumbnailSize: ${n.thumbnailSize||0}`),e(`  - duration: ${n.duration||"undefined"}`),{fileReferencesHolderId:r,currentTime:d,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:l,fileInput:{fileId:l,ownerFileInput:{editorContactIds:[f],FileSharingOptionsEnum:"Anyone",dataKey:h,thumbnailDataKey:n.thumbnailDataKey,dataInBytes:n.size,thumbnailDataInBytes:n.thumbnailSize||0,s3UploadedAt:d,durationInSeconds:n.duration},editorFileInput:{aboutContactIds:[f],captionText:"",numericFilterInputs:[]}}}})),b=async a=>{var h,l;e("Sending folder-only mutation (no file references)");const d=await L();if(!d)throw e("No token available for saving album, aborting"),new Error("Authentication token not available");const f=`
      mutation MyMutation($folderPositionInputs: [FolderPositionInput!]) {
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items {
            id
          }
        }
      }
    `,n={folderPositionInputs:[a]};e("GraphQL folder-only mutation variables:",n);try{e("Sending API request to save folder");const p=await fetch(re,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${d}`},body:JSON.stringify({query:f,variables:n})});e(`API response status: ${p.status}`);const c=await p.text();e(`API response raw text: ${c}`);const g=JSON.parse(c);if(e("API response JSON:",g),g.errors)throw console.error("Folder save failed:",g.errors),e("Folder save failed with errors:",g.errors),new Error("Failed to save folder");return e("Folder saved successfully"),((l=(h=g.data)==null?void 0:h.changeFiles)==null?void 0:l.items)||[]}catch(p){throw console.error("Error in sendFolderOnlyMutation:",p),e(`Error in sendFolderOnlyMutation: ${p}`),p}},u=async a=>{var h,l,p,c,g;e(`Sending file references-only mutation with ${a.length} items`);const d=await L();if(!d)throw e("No token available for saving file references, aborting"),new Error("Authentication token not available");const f=`
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
    `,n={updatedFileReferenceInputs:a};e("GraphQL file references-only mutation variables (first item):",a.length>0?a[0]:"No items");try{e("Sending API request to save file references");const $=await fetch(re,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${d}`},body:JSON.stringify({query:f,variables:n})});e(`API response status: ${$.status}`);const N=await $.text();e(`API response raw text: ${N.substring(0,500)}...`);const U=JSON.parse(N);if(e("API response JSON items count:",((p=(l=(h=U.data)==null?void 0:h.changeFiles0)==null?void 0:l.items)==null?void 0:p.length)||0),U.errors)throw console.error("File references save failed:",U.errors),e("File references save failed with errors:",U.errors),new Error("Failed to save file references");return e("File references chunk saved successfully"),((g=(c=U.data)==null?void 0:c.changeFiles0)==null?void 0:g.items)||[]}catch($){throw console.error("Error in sendFileReferencesOnlyMutation:",$),e(`Error in sendFileReferencesOnlyMutation: ${$}`),$}},F=async(a,d)=>{var l,p,c,g,$,N,U,Y,J;e(`Sending final chunk with folder mutation (${a.length} file references)`);const f=await L();if(!f)throw e("No token available for saving final chunk, aborting"),new Error("Authentication token not available");const n=`
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
    `,h={folderPositionInputs:[d],updatedFileReferenceInputs:a};e("GraphQL final mutation variables (folder + last chunk)");try{e("Sending API request for final save with folder");const H=await fetch(re,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${f}`},body:JSON.stringify({query:n,variables:h})});e(`API response status: ${H.status}`);const te=await H.text();e(`API response raw text: ${te.substring(0,500)}...`);const M=JSON.parse(te);if(e("API response JSON:",{fileReferencesCount:((c=(p=(l=M.data)==null?void 0:l.changeFiles0)==null?void 0:p.items)==null?void 0:c.length)||0,folderItems:(($=(g=M.data)==null?void 0:g.changeFiles)==null?void 0:$.items)||[]}),M.errors)throw console.error("Final save failed:",M.errors),e("Final save failed with errors:",M.errors),new Error("Failed to complete album save");return e("Final chunk and folder saved successfully"),{fileReferences:((U=(N=M.data)==null?void 0:N.changeFiles0)==null?void 0:U.items)||[],folderPositions:((J=(Y=M.data)==null?void 0:Y.changeFiles)==null?void 0:J.items)||[]}}catch(H){throw console.error("Error in sendFinalChunkWithFolderMutation:",H),e(`Error in sendFinalChunkWithFolderMutation: ${H}`),H}},m=async()=>(e("Validating required data"),await L()?y?r?(e("All required data validated successfully"),!0):(e("No folder ID, validation failed"),!1):(e("No Cognito username, validation failed"),!1):(e("No token available, validation failed"),!1)),C=()=>{e("Handling successful save"),ze(G,B,[Q.SELECTED_PHOTOS,Q.SUB_ALBUM_DATA],e),e("Album data cleared");const a=document.getElementById("saveProgressText");a&&(a.innerText="Album saved successfully!",e("Updated progress text to 'Album saved successfully!'")),sessionStorage.setItem("album_just_saved","true"),e("Set 'album_just_saved' flag in sessionStorage"),e("Setting timeout for redirect to my-albums.html"),setTimeout(()=>{e("Redirecting to my-albums.html"),Me("my-albums.html")},1e3)},E=async(a,d)=>{e("Starting chunked save process");try{q("Processing files in chunks...");const f=48;if(d.length===0)e("No file references to process, saving only folder position"),await b(a);else{const n=X(d);e(`After removing duplicates, processing ${n.length} unique file references`);const h=ee(n,f);e(`Split file references into ${h.length} chunks of max size ${f}`);for(let l=0;l<h.length;l++){const p=h[l];e(`Processing chunk ${l+1} of ${h.length} with ${p.length} file references`);const c=l/h.length*80;i(10+c),W(10+c),l<h.length-1?(q(`Saving files: chunk ${l+1} of ${h.length}...`),await u(p)):(q("Finalizing album..."),await F(p,a))}}i(100),W(100),q("Album saved successfully!"),C()}catch(f){console.error("Error in chunked save process:",f),e(`Error in chunked save process: ${f}`),q(`Error: ${f}`),_(!1)}};return{saveAlbumDirectly:async()=>{e("Starting direct album save"),_(!0),i(5);try{if(e("Validating required data for save"),!await m()){e("Required data validation failed, aborting save"),_(!1);return}const a=Math.floor(Date.now()/1e3),d=`${y}_____${y}____Account`,n=r.split("_____")[1].split("____")[0];e(`Save timestamp: ${a}`),e(`Account ID: ${d}`),e(`Folder ID: ${r}`),e(`Folder target item identifier: ${n}`),e("Creating folder position input");const h=K(a,d,n);e("Folder position input created:",h);let l=[];const p=v.filter(c=>c.status==="complete");if(e(`Found ${p.length} valid photos with 'complete' status`),p.length>0){const c=p.filter($=>!$.fileId);e(`Found ${c.length} new uploads to move from temp to public folder`),c.length>0&&(e("Moving files from temp to public folder"),await Ne(c,W,e)),e("Creating file reference inputs for uploads");const g=Z(p,a,d);e(`Created ${g.length} file reference inputs for uploads`,g),l=l.concat(g)}if(I&&o.length>0){e(`Adding ${o.length} existing file references for sub-album`);const c=o.map(g=>(e(`Creating file reference for existing file ID: ${g}`),{fileReferencesHolderId:r,currentTime:a,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:g,fileInput:null}));e(`Created ${c.length} file reference inputs for existing files`,c),l=l.concat(c)}e(`Total file reference inputs: ${l.length}`),e("Sending GraphQL mutations with chunked file references"),await E(h,l)}catch(a){console.error("Error in saveAlbumDirectly:",a),e(`Error in saveAlbumDirectly: ${a}`),_(!1)}}}},Nt=({selectedPhotos:r,isSavingAlbum:y,onRemovePhoto:v})=>{const{t:I}=ne();return r.length===0?null:t.jsx(t.Fragment,{children:t.jsx(Je,{children:r.map((o,O)=>{var D,S;return t.jsxs(He,{children:[t.jsx(Ve,{$status:o.status,children:o.status==="complete"?"✓":o.status==="error"?"✕":o.status==="uploading"?"↑":o.status==="processing"?"⚙️":"•"}),t.jsxs(Qe,{children:[o.type==="video"||(D=o.type)!=null&&D.startsWith("video")?t.jsx(Ye,{src:o.s3PreviewUrl,controls:!0}):t.jsx(Xe,{src:o.s3PreviewUrl,alt:o.fileName}),(o.status==="uploading"||o.status==="processing")&&t.jsx(ye,{$bottom:"4px",$left:"4px",$right:"4px",$height:"4px",children:t.jsx(Ie,{$progress:o.progress,$status:o.status})})]}),t.jsxs(Ze,{children:[(S=o.type)!=null&&S.startsWith("video")?I("Video"):I("Image"),o.size&&` • ${(o.size/1024/1024).toFixed(1)} MB`,o.duration&&` • ${o.duration}s`]}),o.status==="error"&&o.errorMessage&&t.jsxs(Le,{$type:"error",children:[I("Error"),": ",o.errorMessage.length>40?o.errorMessage.substring(0,37)+"...":o.errorMessage]}),t.jsx(et,{onClick:()=>v(O),disabled:y,children:I("Remove")})]},O)})})})},Ot=({isSavingAlbum:r,savingProgress:y})=>{const{t:v}=ne();return r?t.jsxs(ve,{children:[t.jsx(tt,{children:v("Saving Album")}),t.jsx(rt,{id:"saveProgressText",children:v("Moving files...")}),t.jsx(ye,{children:t.jsx(Ie,{id:"saveProgress",$progress:y/100})})]}):null},Ut=({showFolderDetails:r,isCreator:y,folderName:v,setFolderName:I,folderDescription:o,setFolderDescription:O,isOnPublicProfile:D,handlePublicProfileToggle:S,participantsCanAddItems:k,handleParticipantsCanAddItemsToggle:R,isSavingAlbum:z})=>{const{t:_}=ne();return!r||y!==!0?null:t.jsxs(ve,{children:[t.jsxs(ue,{children:[t.jsx(fe,{htmlFor:"folderName",children:_("Album Name (Optional)")}),t.jsx(We,{id:"folderName",type:"text",value:v,onChange:i=>I(i.target.value),placeholder:_("Enter album name")})]}),t.jsxs(ue,{children:[t.jsx(fe,{htmlFor:"folderDescription",children:_("Album Description (Optional)")}),t.jsx(Ge,{id:"folderDescription",value:o,onChange:i=>O(i.target.value),placeholder:_("Enter album description"),rows:4})]}),t.jsxs(pe,{children:[t.jsx(me,{children:_(D?"On Public Profile":"Not On Public Profile")}),t.jsxs(ge,{children:[t.jsx("input",{type:"checkbox",checked:D,onChange:S,disabled:z}),t.jsx(he,{})]})]}),t.jsxs(pe,{children:[t.jsx(me,{children:_(k?"Participants Can Add Items":"Participants Cannot Add Items")}),t.jsxs(ge,{children:[t.jsx("input",{type:"checkbox",checked:k,onChange:R,disabled:z}),t.jsx(he,{})]})]})]})},ne=()=>({t:r=>r,language:"en"}),zt=()=>{const{t:r,language:y}=we(),v=ae(y)==="rtl",I=lt(r),{setShowUsernamePrompt:o,setUsernameInput:O}=I,[D,S]=P.useState(null),[k,R]=P.useState(!1),[z,_]=P.useState(0),[i,G]=P.useState(""),[B,e]=P.useState(""),[q,W]=P.useState(!1),[ee,X]=P.useState(!1),[K,Z]=P.useState("NoPassword"),[b,u]=P.useState(""),[F,m]=P.useState(!1),[C,E]=P.useState(!0),[w,a]=P.useState(null),[d,f]=P.useState(!1),[n,h]=P.useState([]),l=x=>{!D&&x&&S(x)},{fileInputRef:p,selectedPhotos:c,setSelectedPhotos:g,isUploading:$,progressTracker:N,setProgressTracker:U,debugMessages:Y,currentFolderId:J,openFilePicker:H,handleFileSelection:te,log:M}=ct(l);P.useEffect(()=>{(async()=>{try{await Ke(),M("🔥 Save-album page S3 credentials prewarmed successfully")}catch(T){M(`⚠️ Save-album page credential prewarming failed: ${String(T)}`)}})()},[]);const j=(x,T)=>{let V=`[${new Date().toISOString()}] ${x}`;if(T!==void 0)try{const ie=typeof T=="object"?JSON.stringify(T,null,2):String(T);V+=`
Data: ${ie}`,console.log(V),console.log("Data object:",T)}catch(ie){V+=` [Error stringifying data: ${ie}]`,console.log(V),console.log("Raw data:",T)}else console.log(V);M(V)},{cognitoUsername:le,publicUsername:se,setPublicUsername:Pe}=Rt(S,g,a,W,G,e,m,E,Z,u,f,h,j),{saveAlbumDirectly:de}=Et(D||J,le,c,d,n,i,B,F,C,K,b,R,_,g,U,j);P.useEffect(()=>{J&&!D&&(S(J),j(`Updated folder ID from upload processor: ${J}`))},[J,D]);const Se=x=>{j(`Removing photo at index: ${x}`);const T=c.filter((Re,V)=>V!==x);g(T),j(`New photos count: ${T.length}`),T.length>0?(localStorage.setItem(Q.SELECTED_PHOTOS,JSON.stringify(T)),j(`Updated localStorage with ${T.length} photos`)):(localStorage.removeItem(Q.SELECTED_PHOTOS),j("Removed photos from localStorage"))},Fe=()=>{const x=!F;j(`Toggling isOnPublicProfile to: ${x}`),m(x)},_e=()=>{const x=!C;j(`Toggling participantsCanAddItems to: ${x}`),E(x)},Ae=async()=>{j("Album save initiated"),R(!0);try{if(se!=null&&se.startsWith("Profile-")){j("Public username starts with 'Profile-', showing username prompt"),O(""),o(!0),R(!1);return}j("Valid username found, proceeding to save album directly"),de()}catch(x){console.error("Error in handleSaveAlbum:",x),j(`Error in handleSaveAlbum: ${x}`),R(!1)}},Ce=x=>{j(`Handling successful username update to: ${x}`),localStorage.setItem(Q.PUBLIC_USERNAME,x),Pe(x),o(!1),j("Proceeding to save album after username update"),de()},ke=(x,T)=>{j(`Password dialog closed with option: ${x}, password: ${T?"******":"undefined"}`),x&&Z(x),T!==void 0&&u(T),X(!1)},je=()=>K==="NoPassword"?r("Album Password Policy"):`${r(K==="NotVisible"?"Password Required To See Or Save":K==="Watermark"?"Watermarked And No Saving Without Password":"Password Required To Save")} ${b?`(${b})`:""}`,Te=()=>{j("Opening password dialog"),X(!0)},De=()=>{j("Add photos button clicked"),H(D)};return t.jsxs(t.Fragment,{children:[t.jsx(st,{}),t.jsxs(it,{$isRTL:v,children:[t.jsxs("div",{style:{maxWidth:"900px",margin:"0 auto"},children:[t.jsxs(ot,{children:[t.jsx(at,{href:"my-albums.html",children:r("My Albums")}),t.jsx(ft,{t:r})]}),t.jsx(Ut,{showFolderDetails:q,isCreator:w,folderName:i,setFolderName:G,folderDescription:B,setFolderDescription:e,isOnPublicProfile:F,handlePublicProfileToggle:Fe,participantsCanAddItems:C,handleParticipantsCanAddItemsToggle:_e,isSavingAlbum:k||$}),($||N.totalFiles>0&&(N.filesUploading>0||N.filesProcessing>0||N.filesComplete<N.totalFiles))&&t.jsx(ut,{progressTracker:N,isRTL:ae(y)==="rtl",variant:"detailed",context:"saving",isUploading:$,showSuccessMessage:!1,showErrorMessage:!0,customMessages:{error:r("Some photos could not be processed. You can continue with the successfully processed photos.")}}),t.jsx("input",{ref:p,id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:x=>te(x,le),style:{display:"none"}}),t.jsx(Nt,{selectedPhotos:c,isSavingAlbum:k||$,onRemovePhoto:Se}),t.jsx(Ot,{isSavingAlbum:k,savingProgress:z}),t.jsxs(nt,{children:[t.jsx(oe,{onClick:De,disabled:k||$,children:r($?"Uploading...":"Add More Photos")}),w===!0&&t.jsx(oe,{$passwordSet:K!=="NoPassword",onClick:Te,disabled:k||$,children:je()}),t.jsx(oe,{$primary:!0,onClick:Ae,disabled:k||$,children:r(k?"Saving Album...":"Save Album")})]}),t.jsx(dt,{t:r,language:y,usernameManager:I,onSuccess:Ce}),t.jsx(Tt,{isOpen:ee,onClose:ke,initialOption:K,initialPassword:b})]}),t.jsx(pt,{debugMessages:Y,t:r,isRTL:v,textDirection:v?"rtl":"ltr"})]})]})},Mt=()=>t.jsx(qe,{children:t.jsx(zt,{})});Be.createRoot(document.getElementById("root")).render(t.jsx(Mt,{}));
