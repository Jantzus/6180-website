import{u as De,r as u,j as s,g as Te,R as ct,I as ut,b as T,a as ae}from"./config-C81kv4lT.js";import{G as ft,A as gt,C as pt,H as mt,B as ht,a as bt,P as Pt,b as xt,O as St,c as It,d as vt,e as wt,f as yt,g as J,S as $t,h as jt,i as Ct,j as _t,k as At,l as Ft,m as Dt,n as Tt,o as Ut,p as Et,M as kt,V as Nt,q as Ot,U as Bt,r as Rt,F as zt,E as Mt,R as Lt,s as Vt,t as qt,u as we,v as ye,w as Wt,x as Gt,T as $e,y as je,z as Ce,D as _e,I as Ht,J as Jt,K as Kt,L as Qt,N as Yt,Q as Zt,W as Xt,X as es,Y as ts,Z as ss,_ as rs,$ as os,a0 as as,a1 as ns,a2 as is}from"./styled-components-BCaeVUml.js";import{b as L,g as ne}from"./utils-BvimWbmh.js";import{d as b}from"./styled-components.browser.esm-DAVmpCtn.js";import{L as ls}from"./LogoutButton-BD-NNDV2.js";import{u as ds,s as cs,c as us,p as fs,a as gs,m as ps,b as ms}from"./file-upload-utils-CwNVKzun.js";import"./index-DFUfgcbK.js";const hs=b.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`,bs=b.div`
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`,Ps=b.div`
  font-size: 18px;
  font-weight: 500;
  color: white;
  background-color: #888;
  padding: 15px 20px;
  text-align: center;
`,xs=b.div`
  direction: ${a=>a.isRTL?"rtl":"ltr"};
  padding: 30px;
`,Ae=b.p`
  margin-bottom: 15px;
  font-size: 16px;
`,Ss=b.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 25px;
  margin-top: 20px;
  box-sizing: border-box;
`,Is=b.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
`,K=b.div`
  display: flex;
  align-items: center;
  cursor: ${a=>a.disabled?"not-allowed":"pointer"};
  opacity: ${a=>a.disabled?.7:1};
`,Q=b.input`
  margin-right: 10px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  
  &:disabled {
    cursor: not-allowed;
  }
`,Y=b.label`
  display: flex;
  cursor: ${a=>a.disabled?"not-allowed":"pointer"};
  font-size: 16px;
`,ie=b.span`
  color: #aaa;
  margin-left: 8px;
`,vs=b.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`,Fe=b.button`
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
`,ws=({isOpen:a,onClose:O,initialOption:D="noPassword",initialPassword:x=""})=>{const{t:p,language:m}=De(),C=Te(m)==="rtl",[w,V]=u.useState(D),[y,B]=u.useState(x);if(u.useEffect(()=>{a&&(V(D),B(x))},[a,D,x]),!a)return null;const f=y.trim()==="",U=S=>{S!=="noPassword"&&f||V(S)},Z=S=>{S.target===S.currentTarget&&O()};return s.jsx(hs,{onClick:Z,children:s.jsxs(bs,{children:[s.jsx(Ps,{children:p("Album Password Policy")}),s.jsxs(xs,{isRTL:C,children:[s.jsx(Ae,{children:p("Enter a password for this album.")}),s.jsx(Ss,{type:"text",placeholder:p("Enter password"),value:y,onChange:S=>B(S.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"}),s.jsx(Ae,{children:p("Select password restrictions.")}),s.jsxs(Is,{children:[s.jsxs(K,{disabled:f,children:[s.jsx(Q,{type:"radio",name:"protection",id:"notVisible",checked:w==="notVisible",onChange:()=>{},disabled:f,onClick:()=>!f&&U("notVisible")}),s.jsxs(Y,{htmlFor:"notVisible",disabled:f,children:[p("Password Required To See Or Save"),f&&s.jsx(ie,{children:p("Password required")})]})]}),s.jsxs(K,{disabled:f,children:[s.jsx(Q,{type:"radio",name:"protection",id:"watermark",checked:w==="watermark",onChange:()=>{},disabled:f,onClick:()=>!f&&U("watermark")}),s.jsxs(Y,{htmlFor:"watermark",disabled:f,children:[p("Password Required To Remove Watermark Or Save"),f&&s.jsx(ie,{children:p("Password required")})]})]}),s.jsxs(K,{disabled:f,children:[s.jsx(Q,{type:"radio",name:"protection",id:"cannotBeSaved",checked:w==="cannotBeSaved",onChange:()=>{},disabled:f,onClick:()=>!f&&U("cannotBeSaved")}),s.jsxs(Y,{htmlFor:"cannotBeSaved",disabled:f,children:[p("Password Required To Save"),f&&s.jsx(ie,{children:p("Password required")})]})]}),s.jsxs(K,{disabled:!1,children:[s.jsx(Q,{type:"radio",name:"protection",id:"noPassword",checked:w==="noPassword",onChange:()=>{},onClick:()=>U("noPassword")}),s.jsx(Y,{htmlFor:"noPassword",disabled:!1,children:p("No Password")})]})]}),s.jsxs(vs,{children:[s.jsx(Fe,{onClick:()=>O(),children:p("Cancel")}),s.jsx(Fe,{onClick:()=>{console.log(`Saving with option: ${w}, password: ${y.length>0?"********":"none"}`),O(w,y)},children:p("Save")})]})]})]})})};var Ue=(a=>(a.NotVisible="NotVisible",a.Watermark="Watermark",a.CannotBeSaved="CannotBeSaved",a.NoPassword="NoPassword",a))(Ue||{});const ys=`
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
`,$s=()=>{const{t:a,language:O}=De(),D=Te(O)==="rtl",[x,p]=u.useState(null),[m,C]=u.useState([]),[w,V]=u.useState([]),[y,B]=u.useState(null),[f,U]=u.useState(null),[Z,S]=u.useState(!1),[R,X]=u.useState(""),[le,ee]=u.useState(""),[Ee,ke]=u.useState(!1),[de,te]=u.useState(!1),[h,ce]=u.useState({totalFiles:0,filesComplete:0,filesUploading:0,filesProcessing:0,filesWithError:0,overallProgress:0}),[_,I]=u.useState(!1),[ue,fe]=u.useState(""),[ge,pe]=u.useState(""),[Ne,q]=u.useState(!1),[me,he]=u.useState(!1),[v,E]=u.useState("noPassword"),[W,G]=u.useState(""),[z,be]=u.useState(!0),[M,Pe]=u.useState(!0),[xe,k]=u.useState(null),[se,Oe]=u.useState(!1),[A,Be]=u.useState([]),H=us(V),Re=gs(C),e=(t,r)=>{let o=`[${new Date().toISOString()}] ${t}`;if(r!==void 0)try{const i=typeof r=="object"?JSON.stringify(r,null,2):String(r);o+=`
Data: ${i}`,console.log(o),console.log("Data object:",r)}catch(i){o+=` [Error stringifying data: ${i}]`,console.log(o),console.log("Raw data:",r)}else console.log(o);H(o)};u.useEffect(()=>{e("Component initializing"),ze()},[]),u.useEffect(()=>{m.length>0&&(localStorage.setItem(T.SELECTED_PHOTOS,JSON.stringify(m)),e(`Saved ${m.length} photos to localStorage`))},[m]),u.useEffect(()=>{ds(m,ce)},[m]);const ze=async()=>{var t;e("Starting component initialization"),I(!1);try{e("Checking login with refresh");const r=await L();if(!r){e("No token returned from login check, aborting initialization");return}try{const n=localStorage.getItem("publicUsername");e(`Retrieved public username from localStorage: ${n||"null"}`),B(n||null);const i=JSON.parse(atob(r.split(".")[1]))["cognito:username"];if(i){e(`Extracted Cognito username from token: ${i}`),U(i);const l=localStorage.getItem(T.SUB_ALBUM_DATA);if(e(`Sub-album data from localStorage: ${l||"null"}`),l)try{const d=JSON.parse(l);if(e("Parsed sub-album data:",d),d.isSubAlbum&&((t=d.selectedFileIds)==null?void 0:t.length)>0){e(`Valid sub-album data found with ${d.selectedFileIds.length} files`),Oe(!0),Be(d.selectedFileIds),q(!0),k(!0);const c=`${i}_____${ne()}____Folder`;e(`Generated new folder ID for sub-album: ${c}`),p(c)}else e("Invalid sub-album data, proceeding with normal initialization"),await re(i)}catch(d){console.error("Error parsing sub-album data:",d),e(`Error parsing sub-album data: ${d}`),await re(i)}else e("No sub-album data found, proceeding with normal folder initialization"),await re(i)}else e("No Cognito username found in token")}catch(n){console.error("User data initialization error:",n),e(`User data initialization error: ${n}`)}Le(),Ve(),e("Component initialization completed")}catch(r){console.error("Initialization error:",r),e(`Initialization error: ${r}`)}},re=async t=>{e(`Initializing folder ID with username: ${t}`);try{const n=new URLSearchParams(window.location.search).get("folderId");if(e(`Folder ID from URL: ${n||"null"}`),n){p(n),e(`Using existing folder ID: ${n}`);try{e(`Fetching details for folder: ${n}`);const o=await Me(n);if(e("Folder details retrieved:",o),o){const i=`${t}_____${t}____Account`,l=o.creatorId===i;if(e(`User is creator of folder: ${l}, accountId: ${i}, creator: ${o.creatorId}`),k(l),l){e("User is creator, showing folder details"),q(!0),fe(o.folderName),pe(o.folderDescription),be(o.isOnPublicProfile),e(`Setting isOnPublicProfile: ${o.isOnPublicProfile}`),o.participantsCanAddItems!==void 0&&(Pe(o.participantsCanAddItems),e(`Setting participantsCanAddItems: ${o.participantsCanAddItems}`));const d=o.passwordPolicy;switch(e(`Password policy from folder details: ${d}`),d){case"NoPassword":E("noPassword");break;case"NotVisible":E("notVisible"),G(o.password);break;case"Watermark":E("watermark"),G(o.password);break;case"CannotBeSaved":E("cannotBeSaved"),G(o.password);break;default:E("noPassword")}e(`Set password protection option to: ${v}`)}else e("User is NOT the creator, hiding editable fields"),q(!1)}else e("No folder details retrieved, setting isCreator to false"),k(!1)}catch(o){console.error("Error fetching folder details:",o),e(`Error fetching folder details: ${o}`),k(!1)}}else{const o=`${t}_____${ne()}____Folder`;e(`Creating new folder ID: ${o}`),p(o),e("Setting isCreator to true for new album"),k(!0),q(!0)}}catch(r){console.error("Folder ID initialization error:",r),e(`Folder ID initialization error: ${r}`),k(!1)}},Me=async t=>{var r,n,o,i,l,d,c,g;e(`Fetching details for folder ID: ${t}`);try{const P=await L();if(!P)return e("No token available for fetching folder details"),null;e("Sending GraphQL query to fetch folder details");const $=await(await fetch(ae,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${P}`},body:JSON.stringify({query:ys,variables:{folderIds:[t]}})})).json();if(e("Folder details API response:",$),$.errors)return console.error("GraphQL errors:",$.errors),e(`GraphQL errors: ${JSON.stringify($.errors)}`),null;const N=((n=(r=$==null?void 0:$.data)==null?void 0:r.fetchFolders)==null?void 0:n.items)||[];if(e(`Found ${N.length} folder items`),N.length===0)return e("No folder items found"),null;const j=N[0];e("Retrieved folder data:",j);const ve=((i=(o=j.folderPosition)==null?void 0:o.profileIds)==null?void 0:i.some(dt=>dt.includes("Public____Profile")))||!1;e(`Folder is on public profile: ${ve}`),e("Profile IDs:",(l=j.folderPosition)==null?void 0:l.profileIds);const oe=(d=j.folderInviteParameters)==null?void 0:d.usingFolderInviteGrantsRightToAddItems;return e(`Participants can add items: ${oe}`),{creatorId:j.creatorId||"",folderName:j.folderName||"",folderDescription:j.folderDescription||"",passwordPolicy:((c=j.folderPassword)==null?void 0:c.policy)||"NoPassword",password:((g=j.folderPassword)==null?void 0:g.password)||"",isOnPublicProfile:ve,participantsCanAddItems:oe!==void 0?oe:!0}}catch(P){return console.error("Error in fetchFolderDetails:",P),e(`Error in fetchFolderDetails: ${P}`),null}},Le=()=>{e("Attempting to restore photos from localStorage");try{const t=localStorage.getItem(T.SELECTED_PHOTOS);if(e(`Found stored photos: ${t?"yes":"no"}`),t)try{const r=JSON.parse(t);e(`Parsed ${r.length} photos from localStorage`),Array.isArray(r)&&r.length>0&&(C(r),e(`Restored ${r.length} photos to state`))}catch(r){console.error("Error parsing stored photos:",r),e(`Error parsing stored photos: ${r}`)}}catch(t){console.error("Error restoring photos from storage:",t),e(`Error restoring photos from storage: ${t}`)}},Ve=()=>{e("Testing S3 connection");try{cs?e("S3 client is available"):(console.error("S3 client not available"),e("S3 client not available"))}catch(t){console.error("S3 connection test error:",t),e(`S3 connection test error: ${t}`)}},qe=()=>{const t=!z;e(`Toggling isOnPublicProfile to: ${t}`),be(t)},We=()=>{const t=!M;e(`Toggling participantsCanAddItems to: ${t}`),Pe(t)},Ge=t=>{e(`Removing photo at index: ${t}`);const r=m.filter((n,o)=>o!==t);C(r),e(`New photos count: ${r.length}`),r.length>0?(localStorage.setItem(T.SELECTED_PHOTOS,JSON.stringify(r)),e(`Updated localStorage with ${r.length} photos`)):(localStorage.removeItem(T.SELECTED_PHOTOS),e("Removed photos from localStorage"))},He=async t=>{if(e("Add photos triggered from file input"),!f){e("No Cognito username available, cannot add photos");return}const r=Array.from(t.target.files||[]);if(e(`Selected ${r.length} files`),!!r.length)try{const n=Je(r);e(`Created ${n.length} initial photo objects`),C(l=>[...l,...n]);const o=m.length;e(`Starting processing at index: ${o}`);const i=await fs(r,f,(l,d,c,g)=>{Re(o+l,d,c,g),e(`Updated status for photo ${o+l}: ${d}, progress: ${c}`)},H);e(`Updating ${i.length} photos with processed info`),Ke(o,i)}catch(n){console.error("Error in handleAddPhotos:",n),e(`Error in handleAddPhotos: ${n}`)}finally{t.target.value="",e("Reset file input value")}},Je=t=>(e(`Creating initial photo objects for ${t.length} files`),t.map(r=>{const n=r.type,o=r.name.split(".").pop()||"jpg",i=`${ne()}.${o}`;return e(`Created initial photo object: ${i}, type: ${n}, size: ${r.size}`),{fileName:i,s3PreviewUrl:URL.createObjectURL(r),type:n,size:r.size,status:"pending",progress:0}})),Ke=(t,r)=>{e(`Updating photos with processed info, starting at index ${t}`),C(n=>{const o=[...n];return r.forEach((i,l)=>{const d=t+l;d<o.length&&(e(`Updating photo at index ${d} with processed info`),o[d]=i)}),o})},Qe=async()=>{e("Album save initiated"),I(!0);try{if(y!=null&&y.startsWith("Profile-")){e("Public username starts with 'Profile-', showing username prompt"),X(y),S(!0),I(!1);return}e("Valid username found, proceeding to save album directly"),Se()}catch(t){console.error("Error in handleSaveAlbum:",t),e(`Error in handleSaveAlbum: ${t}`),I(!1)}},Se=async()=>{e("Starting direct album save"),I(!0);try{if(e("Validating required data for save"),!await Ye()){e("Required data validation failed, aborting save"),I(!1);return}const t=Math.floor(Date.now()/1e3),r=`${f}_____${f}____Account`,o=x.split("_____")[1].split("____")[0];e(`Save timestamp: ${t}`),e(`Account ID: ${r}`),e(`Folder ID: ${x}`),e(`Folder target item identifier: ${o}`),e("Creating folder position input");const i=Xe(t,r,o);e("Folder position input created:",i);let l=[];const d=m.filter(c=>c.status==="complete");if(e(`Found ${d.length} valid photos with 'complete' status`),d.length>0){e("Moving files from temp to public folder"),await ps(d,Ze,H),e("Creating file reference inputs for new uploads");const c=et(d,t,r);e(`Created ${c.length} file reference inputs for new uploads`,c),l=l.concat(c)}if(se&&A.length>0){e(`Adding ${A.length} existing file references for sub-album`);const c=A.map(g=>(e(`Creating file reference for existing file ID: ${g}`),{fileReferencesHolderId:x,currentTime:t,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:g,fileInput:null}));e(`Created ${c.length} file reference inputs for existing files`,c),l=l.concat(c)}e(`Total file reference inputs: ${l.length}`),e("Sending GraphQL mutation to save album"),await tt(i,l)}catch(t){console.error("Error in saveAlbumDirectly:",t),e(`Error in saveAlbumDirectly: ${t}`),I(!1)}},Ye=async()=>(e("Validating required data"),await L()?f?x?(e("All required data validated successfully"),!0):(e("No folder ID, validation failed"),!1):(e("No Cognito username, validation failed"),!1):(e("No token available, validation failed"),!1)),Ze=t=>{const r=document.getElementById("saveProgress");r?(r.style.width=`${t}%`,e(`Updated save progress bar: ${t}%`)):e("Progress bar element not found")},Xe=(t,r,n,o)=>{e("Creating folder position input"),e(`Profile visibility: ${z?"Public":"Only Me"}`);const i=z?[`${f}_____Public____Profile`]:["Only Me_____Only Me____Profile"];e(`Profile IDs: ${JSON.stringify(i)}`);let l=[];se&&A.length>0&&(e(`Creating file reference IDs for ${A.length} sub-album files`),l=A.map(g=>{const P=g.split("_____");if(P.length>=2){const $=P[1].split("____")[0],N=`${n}_____${$}____FileReference`;return e(`Created file reference ID for sub-album: ${N}`),N}return e(`Using original fileId as fallback: ${g}`),g})),e(`Created ${l.length} acceptedFileReferenceIds`);const d=v!=="noPassword"?W:null,c=Ue[v.charAt(0).toUpperCase()+v.slice(1)];return e(`Password protection: ${v}`),e(`Password policy: ${c}`),e(`Album password: ${d?"******":"null"}`),e(`Participants can add items: ${M}`),{currentTime:t,folderId:x,profileIds:i,folderPositionSelectedTagInputs:[],folderPositionPoints:1,acceptedFileReferenceIds:l,hiddenFileReferenceIds:[],folderInput:{folderSelectedTagInputs:[],folderAboutContactIds:[r],folderName:ue,folderDescription:ge,folderPasswordInput:{password:d,policy:c},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,usingFolderInviteGrantsRightToRemoveItems:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:M,addedItemsNeedFolderCreatorApproval:!1}}}},et=(t,r,n)=>(e(`Creating file reference inputs for ${t.length} photos`),t.map(o=>{var d;const i=o.type==="video"||(d=o.type)!=null&&d.startsWith("video")?`Input/Video/${o.fileName}`:`Input/Image/${o.fileName}`,l=`${f}_____${o.fileName}____File`;return e(`Created file reference for ${o.fileName}:`),e(`  - dataKey: ${i}`),e(`  - fileId: ${l}`),e(`  - thumbnailDataKey: ${o.thumbnailDataKey||"undefined"}`),e(`  - size: ${o.size}`),e(`  - thumbnailSize: ${o.thumbnailSize||0}`),e(`  - duration: ${o.duration||"undefined"}`),{fileReferencesHolderId:x,currentTime:r,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:l,fileInput:{fileId:l,ownerFileInput:{editorContactIds:[n],FileSharingOptionsEnum:"Anyone",dataKey:i,thumbnailDataKey:o.thumbnailDataKey,dataInBytes:o.size,thumbnailDataInBytes:o.thumbnailSize||0,s3UploadedAt:r,durationInSeconds:o.duration},editorFileInput:{aboutContactIds:[n],captionText:"",numericFilterInputs:[]}}}})),tt=async(t,r)=>{var d,c;e("Sending album save mutation"),e("Folder position input:",t),e(`File reference inputs count: ${r.length}`),r.length>0&&(e("Sample file reference input:",r[0]),r.length>1&&e("Second sample file reference input:",r[1]));const n=document.getElementById("saveProgressText");n&&(n.innerText=a("Finalizing album..."),e("Updated progress text to 'Finalizing album...'"));const o=await L();if(!o){e("No token available for saving album, aborting"),I(!1);return}const i=`
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
    `,l={folderPositionInputs:[t],updatedFileReferenceInputs:r};e("GraphQL mutation variables:",l);try{e("Sending API request to save album");const g=await fetch(ae,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({query:i,variables:l})});e(`API response status: ${g.status}`);const P=await g.text();e(`API response raw text: ${P}`);const F=JSON.parse(P);e("API response JSON:",F),F.errors?(console.error("Upload failed:",F.errors),e("Upload failed with errors:",F.errors),I(!1)):(e("Album saved successfully"),e("changeFiles0 result:",(d=F.data)==null?void 0:d.changeFiles0),e("changeFiles result:",(c=F.data)==null?void 0:c.changeFiles),st())}catch(g){console.error("Fetch error in sendAlbumSaveMutation:",g),e(`Fetch error in sendAlbumSaveMutation: ${g}`),I(!1)}},st=()=>{e("Handling successful save"),ms(C,ce,[T.SELECTED_PHOTOS,T.SUB_ALBUM_DATA],H),e("Album data cleared");const t=document.getElementById("saveProgressText");t&&(t.innerText=a("Album saved successfully!"),e("Updated progress text to 'Album saved successfully!'")),sessionStorage.setItem("album_just_saved","true"),e("Set 'album_just_saved' flag in sessionStorage"),e("Setting timeout for redirect to my-albums.html"),setTimeout(()=>{e("Redirecting to my-albums.html"),window.location.href="/my-albums.html"},1e3)},rt=t=>{const r=/^[a-zA-Z0-9-]+$/.test(t);return e(`Username validation for '${t}': ${r}`),r},Ie=async t=>{var i,l;e(`Submitting username: ${t}`),te(!0),ee("");const r=await L();if(!r){e("No token available for username submission"),te(!1);return}const n=`
      mutation MyMutation($savePublicProfileDisplayNameInput: SavePublicProfileDisplayNameInput) {
        changeMyAccountItem(savePublicProfileDisplayNameInput: $savePublicProfileDisplayNameInput) {
          ... on Profile {
            anyDisplayName
          }
        }
      }
    `,o={savePublicProfileDisplayNameInput:{anyDisplayName:t}};e("Username mutation variables:",o);try{e("Sending API request to save username");const c=await(await fetch(ae,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({query:n,variables:o})})).json();e("Username API response:",c);const g=(l=(i=c==null?void 0:c.data)==null?void 0:i.changeMyAccountItem)==null?void 0:l.anyDisplayName;if(g)e(`Username successfully changed to: ${g}`),ot(g);else throw e("Username change failed - likely already taken"),new Error("Username taken")}catch(d){e(`Error submitting username: ${d}`),ee(a("Username is already taken. Please try a different one.")),ke(!0),te(!1)}},ot=t=>{e(`Handling successful username update to: ${t}`),localStorage.setItem("publicUsername",t),B(t),S(!1),e("Proceeding to save album after username update"),Se()},at=()=>{const t=Math.floor(1e5+Math.random()*9e5).toString(),r=`${R}${t}`;e(`Appending random digits to username: ${R} -> ${r}`),X(r),Ie(r)},nt=(t,r)=>{e(`Password dialog closed with option: ${t}, password: ${r?"******":"undefined"}`),t&&E(t),r!==void 0&&G(r),he(!1)},it=()=>v==="noPassword"?a("Album Password Policy"):`${a(v==="notVisible"?"Not Visible":v==="watermark"?"Watermark":"Cannot Be Saved")} ${W?`(${W})`:""}`,lt=()=>{e("Opening password dialog"),he(!0)};return s.jsxs(s.Fragment,{children:[s.jsx(ft,{}),s.jsxs(gt,{isRTL:D,children:[s.jsxs(pt,{children:[s.jsxs(mt,{children:[s.jsx(ht,{children:s.jsx(bt,{href:"/my-albums.html",children:a("My Albums")})}),s.jsx(ls,{t:a})]}),h.totalFiles>0&&s.jsxs(Pt,{children:[s.jsx(xt,{children:a("Upload Progress")}),s.jsxs(St,{children:[s.jsxs(It,{children:[s.jsxs("span",{children:[a("Overall Progress"),": ",Math.round(h.overallProgress*100),"%"]}),s.jsxs("span",{children:[h.filesComplete," ",a("of")," ",h.totalFiles," ",a("complete")]})]}),s.jsx(vt,{children:s.jsx(wt,{progress:h.overallProgress})})]}),s.jsxs(yt,{children:[h.filesUploading>0&&s.jsxs(J,{children:[a("Uploading"),": ",h.filesUploading]}),h.filesProcessing>0&&s.jsxs(J,{children:[a("Processing"),": ",h.filesProcessing]}),h.filesComplete>0&&s.jsxs(J,{children:[a("Complete"),": ",h.filesComplete]}),h.filesWithError>0&&s.jsxs(J,{isError:!0,children:[a("Failed"),": ",h.filesWithError]})]})]}),_&&s.jsxs($t,{children:[s.jsx(jt,{children:a("Saving Album")}),s.jsx(Ct,{id:"saveProgressText",children:a("Moving files...")}),s.jsx(_t,{children:s.jsx(At,{id:"saveProgress",style:{width:"5%"}})})]}),s.jsx(Ft,{id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:He}),se&&A.length>0&&s.jsxs("div",{style:{backgroundColor:"#e3f2fd",padding:"15px",borderRadius:"8px",marginBottom:"20px",fontSize:"16px"},children:[s.jsxs("p",{style:{margin:0},children:[a("Creating a new sub-album with")," ",s.jsx("strong",{children:A.length})," ",a("selected items")]}),s.jsx("p",{style:{margin:"10px 0 0 0",fontSize:"14px",color:"#0277bd"},children:a("You can add more photos or videos to this sub-album before saving")})]}),m.length>0&&s.jsxs(s.Fragment,{children:[s.jsxs(Dt,{children:[m.length," ",m.length>1?a("photos selected"):a("photo selected"),":"]}),s.jsx(Tt,{children:m.map((t,r)=>{var n,o;return s.jsxs(Ut,{children:[s.jsx(Et,{status:t.status,children:t.status==="complete"?"✓":t.status==="error"?"✕":t.status==="uploading"?"↑":t.status==="processing"?"⚙️":"•"}),s.jsxs(kt,{children:[t.type==="video"||(n=t.type)!=null&&n.startsWith("video")?s.jsx(Nt,{src:t.s3PreviewUrl,controls:!0}):s.jsx(Ot,{src:t.s3PreviewUrl,alt:t.fileName}),(t.status==="uploading"||t.status==="processing")&&s.jsx(Bt,{children:s.jsx(Rt,{progress:t.progress,status:t.status})})]}),s.jsxs(zt,{children:[(o=t.type)!=null&&o.startsWith("video")?a("Video"):a("Image"),t.size&&` • ${(t.size/1024/1024).toFixed(1)} MB`,t.duration&&` • ${t.duration}s`]}),t.status==="error"&&t.errorMessage&&s.jsxs(Mt,{children:[a("Error"),": ",t.errorMessage.length>40?t.errorMessage.substring(0,37)+"...":t.errorMessage]}),s.jsx(Lt,{onClick:()=>Ge(r),disabled:_,children:a("Remove")})]},r)})})]}),s.jsxs(Vt,{children:[Ne&&xe===!0&&s.jsxs(qt,{children:[s.jsxs(we,{children:[s.jsx(ye,{htmlFor:"folderName",children:a("Album Name (Optional)")}),s.jsx(Wt,{id:"folderName",type:"text",value:ue,onChange:t=>fe(t.target.value),placeholder:a("Enter album name")})]}),s.jsxs(we,{children:[s.jsx(ye,{htmlFor:"folderDescription",children:a("Album Description (Optional)")}),s.jsx(Gt,{id:"folderDescription",value:ge,onChange:t=>pe(t.target.value),placeholder:a("Enter album description"),rows:4})]}),s.jsxs($e,{children:[s.jsx(je,{children:a(z?"On Public Profile":"Not On Public Profile")}),s.jsxs(Ce,{children:[s.jsx("input",{type:"checkbox",checked:z,onChange:qe,disabled:_}),s.jsx(_e,{})]})]}),s.jsxs($e,{children:[s.jsx(je,{children:a(M?"Participants Can Add Items":"Participants Cannot Add Items")}),s.jsxs(Ce,{children:[s.jsx("input",{type:"checkbox",checked:M,onChange:We,disabled:_}),s.jsx(_e,{})]})]})]}),s.jsx(Ht,{onClick:()=>{const t=document.getElementById("file-input");t==null||t.click()},disabled:_,children:a("Add More Photos")}),xe===!0&&s.jsx(Jt,{passwordSet:v!=="noPassword",onClick:lt,disabled:_,children:it()}),s.jsx(Kt,{onClick:Qe,disabled:_,children:a(_?"Saving Album...":"Save Album")})]}),Z&&s.jsx(Qt,{children:s.jsxs(Yt,{isRTL:D,children:[s.jsx(Zt,{children:a("Enter Username")}),s.jsx(Xt,{children:a("Username should contain only letters, numbers and hyphens. Example: john-doe2")}),s.jsx(es,{value:R,onChange:t=>X(t.target.value),isRTL:D}),le&&s.jsx(ts,{children:le}),s.jsx(ss,{disabled:de,onClick:()=>{if(!rt(R)){ee(a("Username must contain only letters, numbers, and hyphens."));return}Ie(R)},children:a("Select Username")}),Ee&&s.jsx(rs,{disabled:de,onClick:at,children:a("Add Random Digits to Username")})]})}),me&&s.jsx(ws,{isOpen:me,onClose:nt,initialOption:v,initialPassword:W})]}),w.length>0&&s.jsxs(os,{children:[s.jsx(as,{children:a("Debug Log")}),s.jsx(ns,{children:w.map((t,r)=>s.jsx(is,{children:t},r))})]})]})]})},js=()=>s.jsx(ut,{children:s.jsx($s,{})});ct.createRoot(document.getElementById("root")).render(s.jsx(js,{}));
