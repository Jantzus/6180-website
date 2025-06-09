import{d as A,u as we,a as I,j as t,g as ae,h as L,L as Q,i as ce,s as Re,m as Ne,f as re,k as Oe,l as Ue,n as ze,r as Me,R as Be,I as qe,p as Ke}from"./utils-CuQXS0Z6.js";import{S as We,P as Ge,e as Je,f as He,g as Ve,V as Qe,h as Ye,i as ve,j as ye,F as Xe,M as Ze,R as Le,C as Pe,k as et,l as tt,m as ue,n as fe,o as rt,p as st,T as pe,q as me,r as ge,s as he,G as it,A as ot,H as at,t as nt,u as lt,B as oe}from"./styled-components-D8vdsHoZ.js";import{u as dt,U as ct}from"./useUsernameManagement-CFSyL8v9.js";import{u as ut,U as ft}from"./useFileUploadProcessor-D1hsxDoX.js";import{L as pt,D as mt}from"./DebugLog-CF4m3i-m.js";const s={colors:{primary:"#007bff",primaryDark:"#0056b3",secondary:"#6c757d",success:"#4caf50",danger:"#e53935",warning:"#ff9800",white:"#fff",text:{primary:"#333",secondary:"#666",light:"#777"},background:{primary:"#f9fafb",highlight:"#f0f7ff"},border:"#ddd"},spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px"},borderRadius:{small:"4px",medium:"8px"},boxShadow:{lg:"0 4px 10px rgba(0,0,0,0.08)"}},gt=A.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
`,ht=A.div`
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
`,xt=A.div`
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
`,bt=A.div`
  direction: ${r=>r.$isRTL?"rtl":"ltr"};
`,$t=A.h3`
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
`,wt=A.p`
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
`,vt=A.input`
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
`,yt=A.div`
  display: flex;
  flex-direction: column;
  gap: ${s.spacing.md};
  margin-bottom: ${s.spacing.xl};
`,Pt=A.div`
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
`,St=A.div`
  margin-bottom: ${s.spacing.xs};
`,Ft=A.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${s.colors.primary};
  flex-shrink: 0;
`,_t=A.label`
  font-size: 16px;
  font-weight: 500;
  color: ${s.colors.text.primary};
  cursor: pointer;
  display: block;
`,At=A.div`
  font-size: 14px;
  color: ${s.colors.text.secondary};
  margin-top: ${s.spacing.xs};
`,Ct=A.div`
  color: ${s.colors.warning};
  font-size: 12px;
  font-style: italic;
  margin-top: ${s.spacing.xs};
  font-weight: 500;
`,jt=A.div`
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
`,Tt=[{value:"NotVisible",titleKey:"Password Required To See Or Save",descriptionKey:"Album will be completely hidden until correct password is entered"},{value:"Watermark",titleKey:"Watermarked And No Saving Without Password",descriptionKey:"Photos will be visible with watermarks, password required to save"},{value:"CannotBeSaved",titleKey:"Password Required To Save",descriptionKey:"Photos are visible but password required to download or save"},{value:"NoPassword",titleKey:"No Password",descriptionKey:"Album is fully public with no restrictions"}],Dt=({isOpen:r,onClose:P,initialOption:y="NoPassword",initialPassword:w=""})=>{const{t:o,language:O}=we(),D=ae(O)==="rtl",[S,j]=I.useState(y),[E,z]=I.useState(w);if(I.useEffect(()=>{r&&(j(y),z(w))},[r,y,w]),!r)return null;const _=E.trim()==="",i=e=>{j(e)},G=e=>{e.target===e.currentTarget&&P()},B=e=>e!=="NoPassword";return t.jsxs(t.Fragment,{children:[t.jsx(gt,{onClick:G}),t.jsx(ht,{children:t.jsx(xt,{children:t.jsxs(bt,{$isRTL:D,children:[t.jsx($t,{children:o("Album Password Policy")}),t.jsx(wt,{children:o("Configure password protection for your album. Choose how you want to restrict access to your photos.")}),t.jsxs(xe,{children:[t.jsx(be,{children:o("Enter Password")}),t.jsx(vt,{type:"text",placeholder:o("Enter password (optional)"),value:E,onChange:e=>z(e.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"})]}),t.jsxs(xe,{children:[t.jsx(be,{children:o("Select Protection Level")}),t.jsx(yt,{children:Tt.map(e=>t.jsxs(Pt,{$isSelected:S===e.value,onClick:()=>i(e.value),children:[t.jsx(Ft,{type:"radio",name:"protection",checked:S===e.value,onChange:()=>i(e.value)}),t.jsxs(It,{children:[t.jsx(St,{children:t.jsx(_t,{children:o(e.titleKey)})}),t.jsx(At,{children:o(e.descriptionKey)}),_&&B(e.value)&&S===e.value&&t.jsx(Ct,{children:o('⚠️ Will use "password" as default if left empty')})]})]},e.value))})]}),B(S)&&t.jsxs(kt,{children:[t.jsx("strong",{children:o("💡 Password Protection Info:")}),t.jsx("br",{}),o('If you leave the password field empty, "password" will be used as the default password. You can change this anytime in album settings.')]}),t.jsxs(jt,{children:[t.jsx($e,{$variant:"secondary",onClick:()=>P(),children:o("Cancel")}),t.jsx($e,{$variant:"primary",onClick:()=>{const e=_&&B(S)?"password":E;console.log(`Saving with option: ${S}, password: ${e.length>0?"********":"none"}`),P(S,e)},children:o("Save Settings")})]})]})})})]})},Et=`
  query FetchFolders($folderIds: [String!]!) {
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
`,Rt=(r,P,y,w,o,O,D,S,j,E,z,_,i)=>{const[G,B]=I.useState(null),[e,q]=I.useState(null),W=async b=>{i(`Initializing folder ID with username: ${b}`);try{const F=new URLSearchParams(window.location.search).get("folderId");if(i(`Folder ID from URL: ${F||"null"}`),F){r(F),i(`Using existing folder ID: ${F}`);try{i(`Fetching details for folder: ${F}`);const m=await ee(F,i);if(i("Folder details retrieved:",m),m){const C=`${b}_____${b}____Account`,R=m.creatorId===C;if(i(`User is creator of folder: ${R}, accountId: ${C}, creator: ${m.creatorId}`),y(R),R){i("User is creator, showing folder details"),w(!0),o(m.folderName),O(m.folderDescription),D(m.isOnPublicProfile),i(`Setting isOnPublicProfile: ${m.isOnPublicProfile}`),m.participantsCanAddItems!==void 0&&(S(m.participantsCanAddItems),i(`Setting participantsCanAddItems: ${m.participantsCanAddItems}`));const v=m.passwordPolicy;i(`Password policy from folder details: ${v}`),j(v),v!=="NoPassword"&&m.password&&E(m.password),i(`Set password protection option to: ${v}`)}else i("User is NOT the creator, hiding editable fields"),w(!1)}else i("No folder details retrieved, setting isCreator to true"),y(!0),w(!0)}catch(m){console.error("Error fetching folder details:",m),i(`Error fetching folder details: ${m}`),y(!1)}}else{const m=`${b}_____${ce()}____Folder`;i(`Creating new folder ID: ${m}`),r(m),i("Setting isCreator to true for new album"),y(!0),w(!0)}}catch(u){console.error("Folder ID initialization error:",u),i(`Folder ID initialization error: ${u}`),y(!1)}},ee=async(b,u)=>{var F,m,C,R,v,a,d,f;u(`Fetching details for folder ID: ${b}`);try{const n=await L();if(!n)return u("No token available for fetching folder details"),null;u("Sending GraphQL query to fetch folder details");const l=await(await fetch(re,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({query:Et,variables:{folderIds:[b]}})})).json();if(u("Folder details API response:",l),l.errors)return console.error("GraphQL errors:",l.errors),u(`GraphQL errors: ${JSON.stringify(l.errors)}`),null;const p=((m=(F=l==null?void 0:l.data)==null?void 0:F.fetchFolders)==null?void 0:m.items)||[];if(u(`Found ${p.length} folder items`),p.length===0)return u("No folder items found"),null;const c=p[0];u("Retrieved folder data:",c);const g=((R=(C=c.folderPosition)==null?void 0:C.profileIds)==null?void 0:R.some(N=>N.includes("Public____Profile")))||!1;u(`Folder is on public profile: ${g}`),u("Profile IDs:",(v=c.folderPosition)==null?void 0:v.profileIds);const $=(a=c.folderInviteParameters)==null?void 0:a.usingFolderInviteGrantsRightToAddItems;return u(`Participants can add items: ${$}`),{creatorId:c.creatorId||"",folderName:c.folderName||"",folderDescription:c.folderDescription||"",passwordPolicy:((d=c.folderPassword)==null?void 0:d.policy)||"NoPassword",password:((f=c.folderPassword)==null?void 0:f.password)||"",isOnPublicProfile:g,participantsCanAddItems:$!==void 0?$:!0}}catch(n){return console.error("Error in fetchFolderDetails:",n),u(`Error in fetchFolderDetails: ${n}`),null}},X=()=>{i("Attempting to restore photos from localStorage");try{const b=localStorage.getItem(Q.SELECTED_PHOTOS);if(i(`Found stored photos: ${b?"yes":"no"}`),b)try{const u=JSON.parse(b);i(`Parsed ${u.length} photos from localStorage`),Array.isArray(u)&&u.length>0&&(P(u),i(`Restored ${u.length} photos to state`))}catch(u){console.error("Error parsing stored photos:",u),i(`Error parsing stored photos: ${u}`)}}catch(b){console.error("Error restoring photos from storage:",b),i(`Error restoring photos from storage: ${b}`)}},K=()=>{i("Testing S3 connection");try{Re?i("S3 client is available"):(console.error("S3 client not available"),i("S3 client not available"))}catch(b){console.error("S3 connection test error:",b),i(`S3 connection test error: ${b}`)}},Z=async()=>{var b;i("Starting component initialization");try{i("Checking login with refresh");const u=await L();if(!u){i("No token returned from login check, aborting initialization");return}try{const F=localStorage.getItem(Q.PUBLIC_USERNAME);i(`Retrieved public username from localStorage: ${F||"null"}`),q(F||null);const C=JSON.parse(atob(u.split(".")[1]))["cognito:username"];if(C){i(`Extracted Cognito username from token: ${C}`),B(C);const R=localStorage.getItem(Q.SUB_ALBUM_DATA);if(i(`Sub-album data from localStorage: ${R||"null"}`),R)try{const v=JSON.parse(R);if(i("Parsed sub-album data:",v),v.isSubAlbum&&((b=v.selectedFileIds)==null?void 0:b.length)>0){i(`Valid sub-album data found with ${v.selectedFileIds.length} files`),z(!0),_(v.selectedFileIds),v.selectedPhotos&&v.selectedPhotos.length>0&&(i(`Found ${v.selectedPhotos.length} selected photos in sub-album data`),P(v.selectedPhotos)),w(!0),y(!0);const a=`${C}_____${ce()}____Folder`;i(`Generated new folder ID for sub-album: ${a}`),r(a)}else i("Invalid sub-album data, proceeding with normal initialization"),await W(C)}catch(v){console.error("Error parsing sub-album data:",v),i(`Error parsing sub-album data: ${v}`),await W(C)}else i("No sub-album data found, proceeding with normal folder initialization"),await W(C)}else i("No Cognito username found in token")}catch(F){console.error("User data initialization error:",F),i(`User data initialization error: ${F}`)}X(),K(),i("Component initialization completed")}catch(u){console.error("Initialization error:",u),i(`Initialization error: ${u}`)}};return I.useEffect(()=>{Z()},[]),{cognitoUsername:G,publicUsername:e,setPublicUsername:q}},Nt=(r,P,y,w,o,O,D,S,j,E,z,_,i,G,B,e)=>{const q=a=>{e(`Save progress text: ${a}`);const d=document.getElementById("saveProgressText");d&&(d.innerText=a)},W=a=>{const d=document.getElementById("saveProgress");d?(d.style.width=`${a}%`,e(`Updated save progress bar: ${a}%`)):e("Progress bar element not found"),i(a)},ee=(a,d)=>{e(`Splitting array of ${a.length} items into chunks of ${d}`);const f=[];for(let n=0;n<a.length;n+=d)f.push(a.slice(n,n+d));return e(`Created ${f.length} chunks`),f},X=a=>{const d=new Set;return a.filter(f=>d.has(f.fileId)?(e(`Skipping duplicate file reference with ID: ${f.fileId}`),!1):(d.add(f.fileId),!0))},K=(a,d,f)=>{e("Creating folder position input"),e(`Profile visibility: ${S?"Public":"Only Me"}`);const n=S?[`${P}_____Public____Profile`]:["Only Me_____Only Me____Profile"];e(`Profile IDs: ${JSON.stringify(n)}`);let h=[];w&&o.length>0&&(e(`Creating file reference IDs for ${o.length} sub-album files`),h=o.map(g=>{const $=g.split("_____");if($.length>=2){const U=$[1].split("____")[0],Y=`${f}_____${U}____FileReference`;return e(`Created file reference ID for sub-album: ${Y}`),Y}return e(`Using original fileId as fallback: ${g}`),g})),e(`Created ${h.length} acceptedFileReferenceIds`);const l=E!=="NoPassword"?z:null;if(e(`Password protection: ${E}`),e(`Album password: ${l?"******":"null"}`),e(`Participants can add items: ${j}`),!r)throw e("Error: folderId is null or undefined"),new Error("folderId is required to create folder position input");const p=Oe(r),c=Ue(p);return{currentTime:a,folderId:r,profileIds:n,folderPositionSelectedTagInputs:[],folderPositionPoints:1,acceptedFileReferenceIds:h,folderInput:{folderSelectedTagInputs:[],folderAboutContactIds:[d],albumNanoId:c,folderName:O,folderDescription:D,folderPasswordInput:{password:l,policy:E},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,usingFolderInviteGrantsRightToRemoveItems:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:j,addedItemsNeedFolderCreatorApproval:!1}}}},Z=(a,d,f)=>(e(`Creating file reference inputs for ${a.length} photos`),a.map(n=>{var p;if(n.fileId)return e(`Using existing fileId for photo: ${n.fileId}`),{fileReferencesHolderId:r,currentTime:d,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:n.fileId,fileInput:null};const h=n.type==="video"||(p=n.type)!=null&&p.startsWith("video")?`Input/Video/${n.fileName}`:`Input/Image/${n.fileName}`,l=`${P}_____${n.fileName}____File`;return e(`Created file reference for ${n.fileName}:`),e(`  - dataKey: ${h}`),e(`  - fileId: ${l}`),e(`  - thumbnailDataKey: ${n.thumbnailDataKey||"undefined"}`),e(`  - size: ${n.size}`),e(`  - thumbnailSize: ${n.thumbnailSize||0}`),e(`  - duration: ${n.duration||"undefined"}`),{fileReferencesHolderId:r,currentTime:d,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:l,fileInput:{fileId:l,ownerFileInput:{editorContactIds:[f],FileSharingOptionsEnum:"Anyone",dataKey:h,thumbnailDataKey:n.thumbnailDataKey,dataInBytes:n.size,thumbnailDataInBytes:n.thumbnailSize||0,s3UploadedAt:d,durationInSeconds:n.duration},editorFileInput:{aboutContactIds:[f],captionText:"",numericFilterInputs:[]}}}})),b=async a=>{var h,l;e("Sending folder-only mutation (no file references)");const d=await L();if(!d)throw e("No token available for saving album, aborting"),new Error("Authentication token not available");const f=`
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
    `,h={folderPositionInputs:[d],updatedFileReferenceInputs:a};e("GraphQL final mutation variables (folder + last chunk)");try{e("Sending API request for final save with folder");const H=await fetch(re,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${f}`},body:JSON.stringify({query:n,variables:h})});e(`API response status: ${H.status}`);const te=await H.text();e(`API response raw text: ${te.substring(0,500)}...`);const M=JSON.parse(te);if(e("API response JSON:",{fileReferencesCount:((c=(p=(l=M.data)==null?void 0:l.changeFiles0)==null?void 0:p.items)==null?void 0:c.length)||0,folderItems:(($=(g=M.data)==null?void 0:g.changeFiles)==null?void 0:$.items)||[]}),M.errors)throw console.error("Final save failed:",M.errors),e("Final save failed with errors:",M.errors),new Error("Failed to complete album save");return e("Final chunk and folder saved successfully"),{fileReferences:((U=(N=M.data)==null?void 0:N.changeFiles0)==null?void 0:U.items)||[],folderPositions:((J=(Y=M.data)==null?void 0:Y.changeFiles)==null?void 0:J.items)||[]}}catch(H){throw console.error("Error in sendFinalChunkWithFolderMutation:",H),e(`Error in sendFinalChunkWithFolderMutation: ${H}`),H}},m=async()=>(e("Validating required data"),await L()?P?r?(e("All required data validated successfully"),!0):(e("No folder ID, validation failed"),!1):(e("No Cognito username, validation failed"),!1):(e("No token available, validation failed"),!1)),C=()=>{e("Handling successful save"),ze(G,B,[Q.SELECTED_PHOTOS,Q.SUB_ALBUM_DATA],e),e("Album data cleared");const a=document.getElementById("saveProgressText");a&&(a.innerText="Album saved successfully!",e("Updated progress text to 'Album saved successfully!'")),sessionStorage.setItem("album_just_saved","true"),e("Set 'album_just_saved' flag in sessionStorage"),e("Setting timeout for redirect to my-albums.html"),setTimeout(()=>{e("Redirecting to my-albums.html"),Me("my-albums.html")},1e3)},R=async(a,d)=>{e("Starting chunked save process");try{q("Processing files in chunks...");const f=48;if(d.length===0)e("No file references to process, saving only folder position"),await b(a);else{const n=X(d);e(`After removing duplicates, processing ${n.length} unique file references`);const h=ee(n,f);e(`Split file references into ${h.length} chunks of max size ${f}`);for(let l=0;l<h.length;l++){const p=h[l];e(`Processing chunk ${l+1} of ${h.length} with ${p.length} file references`);const c=l/h.length*80;i(10+c),W(10+c),l<h.length-1?(q(`Saving files: chunk ${l+1} of ${h.length}...`),await u(p)):(q("Finalizing album..."),await F(p,a))}}i(100),W(100),q("Album saved successfully!"),C()}catch(f){console.error("Error in chunked save process:",f),e(`Error in chunked save process: ${f}`),q(`Error: ${f}`),_(!1)}};return{saveAlbumDirectly:async()=>{e("Starting direct album save"),_(!0),i(5);try{if(e("Validating required data for save"),!await m()){e("Required data validation failed, aborting save"),_(!1);return}const a=Math.floor(Date.now()/1e3),d=`${P}_____${P}____Account`,n=r.split("_____")[1].split("____")[0];e(`Save timestamp: ${a}`),e(`Account ID: ${d}`),e(`Folder ID: ${r}`),e(`Folder target item identifier: ${n}`),e("Creating folder position input");const h=K(a,d,n);e("Folder position input created:",h);let l=[];const p=y.filter(c=>c.status==="complete");if(e(`Found ${p.length} valid photos with 'complete' status`),p.length>0){const c=p.filter($=>!$.fileId);e(`Found ${c.length} new uploads to move from temp to public folder`),c.length>0&&(e("Moving files from temp to public folder"),await Ne(c,W,e)),e("Creating file reference inputs for uploads");const g=Z(p,a,d);e(`Created ${g.length} file reference inputs for uploads`,g),l=l.concat(g)}if(w&&o.length>0){e(`Adding ${o.length} existing file references for sub-album`);const c=o.map(g=>(e(`Creating file reference for existing file ID: ${g}`),{fileReferencesHolderId:r,currentTime:a,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:g,fileInput:null}));e(`Created ${c.length} file reference inputs for existing files`,c),l=l.concat(c)}e(`Total file reference inputs: ${l.length}`),e("Sending GraphQL mutations with chunked file references"),await R(h,l)}catch(a){console.error("Error in saveAlbumDirectly:",a),e(`Error in saveAlbumDirectly: ${a}`),_(!1)}}}},Ot=({selectedPhotos:r,isSavingAlbum:P,onRemovePhoto:y})=>{const{t:w}=ne();return r.length===0?null:t.jsxs(t.Fragment,{children:[t.jsxs(We,{children:[r.length," ",r.length>1?w("photos selected"):w("photo selected"),":"]}),t.jsx(Ge,{children:r.map((o,O)=>{var D,S;return t.jsxs(Je,{children:[t.jsx(He,{$status:o.status,children:o.status==="complete"?"✓":o.status==="error"?"✕":o.status==="uploading"?"↑":o.status==="processing"?"⚙️":"•"}),t.jsxs(Ve,{children:[o.type==="video"||(D=o.type)!=null&&D.startsWith("video")?t.jsx(Qe,{src:o.s3PreviewUrl,controls:!0}):t.jsx(Ye,{src:o.s3PreviewUrl,alt:o.fileName}),(o.status==="uploading"||o.status==="processing")&&t.jsx(ve,{$bottom:"4px",$left:"4px",$right:"4px",$height:"4px",children:t.jsx(ye,{$progress:o.progress,$status:o.status})})]}),t.jsxs(Xe,{children:[(S=o.type)!=null&&S.startsWith("video")?w("Video"):w("Image"),o.size&&` • ${(o.size/1024/1024).toFixed(1)} MB`,o.duration&&` • ${o.duration}s`]}),o.status==="error"&&o.errorMessage&&t.jsxs(Ze,{$type:"error",children:[w("Error"),": ",o.errorMessage.length>40?o.errorMessage.substring(0,37)+"...":o.errorMessage]}),t.jsx(Le,{onClick:()=>y(O),disabled:P,children:w("Remove")})]},O)})})]})},Ut=({isSavingAlbum:r,savingProgress:P})=>{const{t:y}=ne();return r?t.jsxs(Pe,{children:[t.jsx(et,{children:y("Saving Album")}),t.jsx(tt,{id:"saveProgressText",children:y("Moving files...")}),t.jsx(ve,{children:t.jsx(ye,{id:"saveProgress",$progress:P/100})})]}):null},zt=({showFolderDetails:r,isCreator:P,folderName:y,setFolderName:w,folderDescription:o,setFolderDescription:O,isOnPublicProfile:D,handlePublicProfileToggle:S,participantsCanAddItems:j,handleParticipantsCanAddItemsToggle:E,isSavingAlbum:z})=>{const{t:_}=ne();return!r||P!==!0?null:t.jsxs(Pe,{children:[t.jsxs(ue,{children:[t.jsx(fe,{htmlFor:"folderName",children:_("Album Name (Optional)")}),t.jsx(rt,{id:"folderName",type:"text",value:y,onChange:i=>w(i.target.value),placeholder:_("Enter album name")})]}),t.jsxs(ue,{children:[t.jsx(fe,{htmlFor:"folderDescription",children:_("Album Description (Optional)")}),t.jsx(st,{id:"folderDescription",value:o,onChange:i=>O(i.target.value),placeholder:_("Enter album description"),rows:4})]}),t.jsxs(pe,{children:[t.jsx(me,{children:_(D?"On Public Profile":"Not On Public Profile")}),t.jsxs(ge,{children:[t.jsx("input",{type:"checkbox",checked:D,onChange:S,disabled:z}),t.jsx(he,{})]})]}),t.jsxs(pe,{children:[t.jsx(me,{children:_(j?"Participants Can Add Items":"Participants Cannot Add Items")}),t.jsxs(ge,{children:[t.jsx("input",{type:"checkbox",checked:j,onChange:E,disabled:z}),t.jsx(he,{})]})]})]})},ne=()=>({t:r=>r,language:"en"}),Mt=()=>{const{t:r,language:P}=we(),y=ae(P)==="rtl",w=dt(r),{setShowUsernamePrompt:o,setUsernameInput:O}=w,[D,S]=I.useState(null),[j,E]=I.useState(!1),[z,_]=I.useState(0),[i,G]=I.useState(""),[B,e]=I.useState(""),[q,W]=I.useState(!1),[ee,X]=I.useState(!1),[K,Z]=I.useState("NoPassword"),[b,u]=I.useState(""),[F,m]=I.useState(!1),[C,R]=I.useState(!0),[v,a]=I.useState(null),[d,f]=I.useState(!1),[n,h]=I.useState([]),l=x=>{!D&&x&&S(x)},{fileInputRef:p,selectedPhotos:c,setSelectedPhotos:g,isUploading:$,progressTracker:N,setProgressTracker:U,debugMessages:Y,currentFolderId:J,openFilePicker:H,handleFileSelection:te,log:M}=ut(l);I.useEffect(()=>{(async()=>{try{await Ke(),M("🔥 Save-album page S3 credentials prewarmed successfully")}catch(T){M(`⚠️ Save-album page credential prewarming failed: ${String(T)}`)}})()},[]);const k=(x,T)=>{let V=`[${new Date().toISOString()}] ${x}`;if(T!==void 0)try{const ie=typeof T=="object"?JSON.stringify(T,null,2):String(T);V+=`
Data: ${ie}`,console.log(V),console.log("Data object:",T)}catch(ie){V+=` [Error stringifying data: ${ie}]`,console.log(V),console.log("Raw data:",T)}else console.log(V);M(V)},{cognitoUsername:le,publicUsername:se,setPublicUsername:Ie}=Rt(S,g,a,W,G,e,m,R,Z,u,f,h,k),{saveAlbumDirectly:de}=Nt(D||J,le,c,d,n,i,B,F,C,K,b,E,_,g,U,k);I.useEffect(()=>{J&&!D&&(S(J),k(`Updated folder ID from upload processor: ${J}`))},[J,D]);const Se=x=>{k(`Removing photo at index: ${x}`);const T=c.filter((Ee,V)=>V!==x);g(T),k(`New photos count: ${T.length}`),T.length>0?(localStorage.setItem(Q.SELECTED_PHOTOS,JSON.stringify(T)),k(`Updated localStorage with ${T.length} photos`)):(localStorage.removeItem(Q.SELECTED_PHOTOS),k("Removed photos from localStorage"))},Fe=()=>{const x=!F;k(`Toggling isOnPublicProfile to: ${x}`),m(x)},_e=()=>{const x=!C;k(`Toggling participantsCanAddItems to: ${x}`),R(x)},Ae=async()=>{k("Album save initiated"),E(!0);try{if(se!=null&&se.startsWith("Profile-")){k("Public username starts with 'Profile-', showing username prompt"),O(""),o(!0),E(!1);return}k("Valid username found, proceeding to save album directly"),de()}catch(x){console.error("Error in handleSaveAlbum:",x),k(`Error in handleSaveAlbum: ${x}`),E(!1)}},Ce=x=>{k(`Handling successful username update to: ${x}`),localStorage.setItem(Q.PUBLIC_USERNAME,x),Ie(x),o(!1),k("Proceeding to save album after username update"),de()},je=(x,T)=>{k(`Password dialog closed with option: ${x}, password: ${T?"******":"undefined"}`),x&&Z(x),T!==void 0&&u(T),X(!1)},ke=()=>K==="NoPassword"?r("Album Password Policy"):`${r(K==="NotVisible"?"Password Required To See Or Save":K==="Watermark"?"Watermarked And No Saving Without Password":"Password Required To Save")} ${b?`(${b})`:""}`,Te=()=>{k("Opening password dialog"),X(!0)},De=()=>{k("Add photos button clicked"),H(D)};return t.jsxs(t.Fragment,{children:[t.jsx(it,{}),t.jsxs(ot,{$isRTL:y,children:[t.jsxs("div",{style:{maxWidth:"900px",margin:"0 auto"},children:[t.jsxs(at,{children:[t.jsx(nt,{href:"my-albums.html",children:r("My Albums")}),t.jsx(pt,{t:r})]}),($||N.totalFiles>0&&(N.filesUploading>0||N.filesProcessing>0||N.filesComplete<N.totalFiles))&&t.jsx(ft,{progressTracker:N,isRTL:ae(P)==="rtl",variant:"detailed",context:"saving",isUploading:$,showSuccessMessage:!1,showErrorMessage:!0,customMessages:{error:r("Some photos could not be processed. You can continue with the successfully processed photos.")}}),t.jsx("input",{ref:p,id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:x=>te(x,le),style:{display:"none"}}),t.jsx(Ot,{selectedPhotos:c,isSavingAlbum:j||$,onRemovePhoto:Se}),t.jsx(Ut,{isSavingAlbum:j,savingProgress:z}),t.jsxs(lt,{children:[t.jsx(zt,{showFolderDetails:q,isCreator:v,folderName:i,setFolderName:G,folderDescription:B,setFolderDescription:e,isOnPublicProfile:F,handlePublicProfileToggle:Fe,participantsCanAddItems:C,handleParticipantsCanAddItemsToggle:_e,isSavingAlbum:j||$}),t.jsx(oe,{onClick:De,disabled:j||$,children:r($?"Uploading...":"Add More Photos")}),v===!0&&t.jsx(oe,{$passwordSet:K!=="NoPassword",onClick:Te,disabled:j||$,children:ke()}),t.jsx(oe,{$primary:!0,onClick:Ae,disabled:j||$,children:r(j?"Saving Album...":"Save Album")})]}),t.jsx(ct,{t:r,language:P,usernameManager:w,onSuccess:Ce}),t.jsx(Dt,{isOpen:ee,onClose:je,initialOption:K,initialPassword:b})]}),t.jsx(mt,{debugMessages:Y,t:r,isRTL:y,textDirection:y?"rtl":"ltr"})]})]})},Bt=()=>t.jsx(qe,{children:t.jsx(Mt,{})});Be.createRoot(document.getElementById("root")).render(t.jsx(Bt,{}));
