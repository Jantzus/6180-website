import{u as Ue,r as f,j as s,g as Oe,R as xt,I as Pt,b as E,a as G}from"./config-C81kv4lT.js";import{G as vt,A as It,C as St,H as wt,B as yt,a as $t,P as jt,b as Ft,O as Ct,c as At,d as _t,e as kt,f as Dt,g as ee,S as Tt,h as Et,i as Ut,j as Ot,k as Nt,l as Rt,m as Bt,n as Mt,o as zt,p as Lt,M as qt,V as Wt,q as Vt,U as Jt,r as Gt,F as Ht,E as Kt,R as Qt,s as Yt,t as Zt,u as Fe,v as Ce,w as Xt,x as es,T as Ae,y as _e,z as ke,D as De,I as ts,J as ss,K as rs,L as os,N as ns,Q as as,W as is,X as ls,Y as ds,Z as cs,_ as us,$ as fs,a0 as gs,a1 as ps,a2 as hs}from"./styled-components-BCaeVUml.js";import{b as U,g as ue}from"./utils-BMtZFOCn.js";import{d as P}from"./styled-components.browser.esm-DAVmpCtn.js";import{L as ms}from"./LogoutButton-BD-NNDV2.js";import{u as bs,s as xs,c as Ps,p as vs,a as Is,m as Ss,b as ws}from"./file-upload-utils-Pz9rjdMU.js";import"./index-DFUfgcbK.js";const ys=P.div`
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
`,$s=P.div`
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`,js=P.div`
  font-size: 18px;
  font-weight: 500;
  color: white;
  background-color: #888;
  padding: 15px 20px;
  text-align: center;
`,Fs=P.div`
  direction: ${n=>n.isRTL?"rtl":"ltr"};
  padding: 30px;
`,Te=P.p`
  margin-bottom: 15px;
  font-size: 16px;
`,Cs=P.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 25px;
  margin-top: 20px;
  box-sizing: border-box;
`,As=P.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
`,te=P.div`
  display: flex;
  align-items: center;
  cursor: ${n=>n.disabled?"not-allowed":"pointer"};
  opacity: ${n=>n.disabled?.7:1};
`,se=P.input`
  margin-right: 10px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  
  &:disabled {
    cursor: not-allowed;
  }
`,re=P.label`
  display: flex;
  cursor: ${n=>n.disabled?"not-allowed":"pointer"};
  font-size: 16px;
`,fe=P.span`
  color: #aaa;
  margin-left: 8px;
`,_s=P.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`,Ee=P.button`
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
`,ks=({isOpen:n,onClose:z,initialOption:T="noPassword",initialPassword:I=""})=>{const{t:b,language:p}=Ue(),y=Oe(p)==="rtl",[$,H]=f.useState(T),[j,L]=f.useState(I);if(f.useEffect(()=>{n&&(H(T),L(I))},[n,T,I]),!n)return null;const g=j.trim()==="",O=S=>{S!=="noPassword"&&g||H(S)},oe=S=>{S.target===S.currentTarget&&z()};return s.jsx(ys,{onClick:oe,children:s.jsxs($s,{children:[s.jsx(js,{children:b("Album Password Policy")}),s.jsxs(Fs,{isRTL:y,children:[s.jsx(Te,{children:b("Enter a password for this album.")}),s.jsx(Cs,{type:"text",placeholder:b("Enter password"),value:j,onChange:S=>L(S.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"}),s.jsx(Te,{children:b("Select password restrictions.")}),s.jsxs(As,{children:[s.jsxs(te,{disabled:g,children:[s.jsx(se,{type:"radio",name:"protection",id:"notVisible",checked:$==="notVisible",onChange:()=>{},disabled:g,onClick:()=>!g&&O("notVisible")}),s.jsxs(re,{htmlFor:"notVisible",disabled:g,children:[b("Password Required To See Or Save"),g&&s.jsx(fe,{children:b("Password required")})]})]}),s.jsxs(te,{disabled:g,children:[s.jsx(se,{type:"radio",name:"protection",id:"watermark",checked:$==="watermark",onChange:()=>{},disabled:g,onClick:()=>!g&&O("watermark")}),s.jsxs(re,{htmlFor:"watermark",disabled:g,children:[b("Password Required To Remove Watermark Or Save"),g&&s.jsx(fe,{children:b("Password required")})]})]}),s.jsxs(te,{disabled:g,children:[s.jsx(se,{type:"radio",name:"protection",id:"cannotBeSaved",checked:$==="cannotBeSaved",onChange:()=>{},disabled:g,onClick:()=>!g&&O("cannotBeSaved")}),s.jsxs(re,{htmlFor:"cannotBeSaved",disabled:g,children:[b("Password Required To Save"),g&&s.jsx(fe,{children:b("Password required")})]})]}),s.jsxs(te,{disabled:!1,children:[s.jsx(se,{type:"radio",name:"protection",id:"noPassword",checked:$==="noPassword",onChange:()=>{},onClick:()=>O("noPassword")}),s.jsx(re,{htmlFor:"noPassword",disabled:!1,children:b("No Password")})]})]}),s.jsxs(_s,{children:[s.jsx(Ee,{onClick:()=>z(),children:b("Cancel")}),s.jsx(Ee,{onClick:()=>{console.log(`Saving with option: ${$}, password: ${j.length>0?"********":"none"}`),z($,j)},children:b("Save")})]})]})]})})};var Ne=(n=>(n.NotVisible="NotVisible",n.Watermark="Watermark",n.CannotBeSaved="CannotBeSaved",n.NoPassword="NoPassword",n))(Ne||{});const Ds=`
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
`,Ts=()=>{const{t:n,language:z}=Ue(),T=Oe(z)==="rtl",[I,b]=f.useState(null),[p,y]=f.useState([]),[$,H]=f.useState([]),[j,L]=f.useState(null),[g,O]=f.useState(null),[oe,S]=f.useState(!1),[q,ne]=f.useState(""),[ge,ae]=f.useState(""),[Re,Be]=f.useState(!1),[pe,ie]=f.useState(!1),[x,he]=f.useState({totalFiles:0,filesComplete:0,filesUploading:0,filesProcessing:0,filesWithError:0,overallProgress:0}),[A,_]=f.useState(!1),[Me,K]=f.useState(0),[me,be]=f.useState(""),[xe,Pe]=f.useState(""),[ze,Q]=f.useState(!1),[ve,Ie]=f.useState(!1),[w,N]=f.useState("noPassword"),[Y,Z]=f.useState(""),[W,Se]=f.useState(!1),[V,we]=f.useState(!0),[ye,R]=f.useState(null),[le,Le]=f.useState(!1),[k,qe]=f.useState([]),X=Ps(H),We=Is(y),e=(t,r)=>{let o=`[${new Date().toISOString()}] ${t}`;if(r!==void 0)try{const l=typeof r=="object"?JSON.stringify(r,null,2):String(r);o+=`
Data: ${l}`,console.log(o),console.log("Data object:",r)}catch(l){o+=` [Error stringifying data: ${l}]`,console.log(o),console.log("Raw data:",r)}else console.log(o);X(o)};f.useEffect(()=>{e("Component initializing"),Ve()},[]),f.useEffect(()=>{p.length>0&&(localStorage.setItem(E.SELECTED_PHOTOS,JSON.stringify(p)),e(`Saved ${p.length} photos to localStorage`))},[p]),f.useEffect(()=>{bs(p,he)},[p]);const Ve=async()=>{var t;e("Starting component initialization"),_(!1);try{e("Checking login with refresh");const r=await U();if(!r){e("No token returned from login check, aborting initialization");return}try{const a=localStorage.getItem("publicUsername");e(`Retrieved public username from localStorage: ${a||"null"}`),L(a||null);const l=JSON.parse(atob(r.split(".")[1]))["cognito:username"];if(l){e(`Extracted Cognito username from token: ${l}`),O(l);const d=localStorage.getItem(E.SUB_ALBUM_DATA);if(e(`Sub-album data from localStorage: ${d||"null"}`),d)try{const i=JSON.parse(d);if(e("Parsed sub-album data:",i),i.isSubAlbum&&((t=i.selectedFileIds)==null?void 0:t.length)>0){e(`Valid sub-album data found with ${i.selectedFileIds.length} files`),Le(!0),qe(i.selectedFileIds),i.selectedPhotos&&i.selectedPhotos.length>0&&(e(`Found ${i.selectedPhotos.length} selected photos in sub-album data`),y(i.selectedPhotos)),Q(!0),R(!0);const c=`${l}_____${ue()}____Folder`;e(`Generated new folder ID for sub-album: ${c}`),b(c)}else e("Invalid sub-album data, proceeding with normal initialization"),await de(l)}catch(i){console.error("Error parsing sub-album data:",i),e(`Error parsing sub-album data: ${i}`),await de(l)}else e("No sub-album data found, proceeding with normal folder initialization"),await de(l)}else e("No Cognito username found in token")}catch(a){console.error("User data initialization error:",a),e(`User data initialization error: ${a}`)}Ge(),He(),e("Component initialization completed")}catch(r){console.error("Initialization error:",r),e(`Initialization error: ${r}`)}},de=async t=>{e(`Initializing folder ID with username: ${t}`);try{const a=new URLSearchParams(window.location.search).get("folderId");if(e(`Folder ID from URL: ${a||"null"}`),a){b(a),e(`Using existing folder ID: ${a}`);try{e(`Fetching details for folder: ${a}`);const o=await Je(a);if(e("Folder details retrieved:",o),o){const l=`${t}_____${t}____Account`,d=o.creatorId===l;if(e(`User is creator of folder: ${d}, accountId: ${l}, creator: ${o.creatorId}`),R(d),d){e("User is creator, showing folder details"),Q(!0),be(o.folderName),Pe(o.folderDescription),Se(o.isOnPublicProfile),e(`Setting isOnPublicProfile: ${o.isOnPublicProfile}`),o.participantsCanAddItems!==void 0&&(we(o.participantsCanAddItems),e(`Setting participantsCanAddItems: ${o.participantsCanAddItems}`));const i=o.passwordPolicy;switch(e(`Password policy from folder details: ${i}`),i){case"NoPassword":N("noPassword");break;case"NotVisible":N("notVisible"),Z(o.password);break;case"Watermark":N("watermark"),Z(o.password);break;case"CannotBeSaved":N("cannotBeSaved"),Z(o.password);break;default:N("noPassword")}e(`Set password protection option to: ${w}`)}else e("User is NOT the creator, hiding editable fields"),Q(!1)}else e("No folder details retrieved, setting isCreator to false"),R(!1)}catch(o){console.error("Error fetching folder details:",o),e(`Error fetching folder details: ${o}`),R(!1)}}else{const o=`${t}_____${ue()}____Folder`;e(`Creating new folder ID: ${o}`),b(o),e("Setting isCreator to true for new album"),R(!0),Q(!0)}}catch(r){console.error("Folder ID initialization error:",r),e(`Folder ID initialization error: ${r}`),R(!1)}},Je=async t=>{var r,a,o,l,d,i,c,u;e(`Fetching details for folder ID: ${t}`);try{const m=await U();if(!m)return e("No token available for fetching folder details"),null;e("Sending GraphQL query to fetch folder details");const h=await(await fetch(G,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${m}`},body:JSON.stringify({query:Ds,variables:{folderIds:[t]}})})).json();if(e("Folder details API response:",h),h.errors)return console.error("GraphQL errors:",h.errors),e(`GraphQL errors: ${JSON.stringify(h.errors)}`),null;const B=((a=(r=h==null?void 0:h.data)==null?void 0:r.fetchFolders)==null?void 0:a.items)||[];if(e(`Found ${B.length} folder items`),B.length===0)return e("No folder items found"),null;const v=B[0];e("Retrieved folder data:",v);const F=((l=(o=v.folderPosition)==null?void 0:o.profileIds)==null?void 0:l.some(C=>C.includes("Public____Profile")))||!1;e(`Folder is on public profile: ${F}`),e("Profile IDs:",(d=v.folderPosition)==null?void 0:d.profileIds);const M=(i=v.folderInviteParameters)==null?void 0:i.usingFolderInviteGrantsRightToAddItems;return e(`Participants can add items: ${M}`),{creatorId:v.creatorId||"",folderName:v.folderName||"",folderDescription:v.folderDescription||"",passwordPolicy:((c=v.folderPassword)==null?void 0:c.policy)||"NoPassword",password:((u=v.folderPassword)==null?void 0:u.password)||"",isOnPublicProfile:F,participantsCanAddItems:M!==void 0?M:!0}}catch(m){return console.error("Error in fetchFolderDetails:",m),e(`Error in fetchFolderDetails: ${m}`),null}},Ge=()=>{e("Attempting to restore photos from localStorage");try{const t=localStorage.getItem(E.SELECTED_PHOTOS);if(e(`Found stored photos: ${t?"yes":"no"}`),t)try{const r=JSON.parse(t);e(`Parsed ${r.length} photos from localStorage`),Array.isArray(r)&&r.length>0&&(y(r),e(`Restored ${r.length} photos to state`))}catch(r){console.error("Error parsing stored photos:",r),e(`Error parsing stored photos: ${r}`)}}catch(t){console.error("Error restoring photos from storage:",t),e(`Error restoring photos from storage: ${t}`)}},He=()=>{e("Testing S3 connection");try{xs?e("S3 client is available"):(console.error("S3 client not available"),e("S3 client not available"))}catch(t){console.error("S3 connection test error:",t),e(`S3 connection test error: ${t}`)}},Ke=()=>{const t=!W;e(`Toggling isOnPublicProfile to: ${t}`),Se(t)},Qe=()=>{const t=!V;e(`Toggling participantsCanAddItems to: ${t}`),we(t)},Ye=t=>{e(`Removing photo at index: ${t}`);const r=p.filter((a,o)=>o!==t);y(r),e(`New photos count: ${r.length}`),r.length>0?(localStorage.setItem(E.SELECTED_PHOTOS,JSON.stringify(r)),e(`Updated localStorage with ${r.length} photos`)):(localStorage.removeItem(E.SELECTED_PHOTOS),e("Removed photos from localStorage"))},Ze=async t=>{if(e("Add photos triggered from file input"),!g){e("No Cognito username available, cannot add photos");return}const r=Array.from(t.target.files||[]);if(e(`Selected ${r.length} files`),!!r.length)try{const a=Xe(r);e(`Created ${a.length} initial photo objects`),y(d=>[...d,...a]);const o=p.length;e(`Starting processing at index: ${o}`);const l=await vs(r,g,(d,i,c,u)=>{We(o+d,i,c,u),e(`Updated status for photo ${o+d}: ${i}, progress: ${c}`)},X);e(`Updating ${l.length} photos with processed info`),et(o,l)}catch(a){console.error("Error in handleAddPhotos:",a),e(`Error in handleAddPhotos: ${a}`)}finally{t.target.value="",e("Reset file input value")}},Xe=t=>(e(`Creating initial photo objects for ${t.length} files`),t.map(r=>{const a=r.type,o=r.name.split(".").pop()||"jpg",l=`${ue()}.${o}`;return e(`Created initial photo object: ${l}, type: ${a}, size: ${r.size}`),{fileName:l,s3PreviewUrl:URL.createObjectURL(r),type:a,size:r.size,status:"pending",progress:0}})),et=(t,r)=>{e(`Updating photos with processed info, starting at index ${t}`),y(a=>{const o=[...a];return r.forEach((l,d)=>{const i=t+d;i<o.length&&(e(`Updating photo at index ${i} with processed info`),o[i]=l)}),o})},tt=async()=>{e("Album save initiated"),_(!0);try{if(j!=null&&j.startsWith("Profile-")){e("Public username starts with 'Profile-', showing username prompt"),ne(j),S(!0),_(!1);return}e("Valid username found, proceeding to save album directly"),$e()}catch(t){console.error("Error in handleSaveAlbum:",t),e(`Error in handleSaveAlbum: ${t}`),_(!1)}},st=(t,r)=>{e(`Splitting array of ${t.length} items into chunks of ${r}`);const a=[];for(let o=0;o<t.length;o+=r)a.push(t.slice(o,o+r));return e(`Created ${a.length} chunks`),a},$e=async()=>{e("Starting direct album save"),_(!0),K(5);try{if(e("Validating required data for save"),!await lt()){e("Required data validation failed, aborting save"),_(!1);return}const t=Math.floor(Date.now()/1e3),r=`${g}_____${g}____Account`,o=I.split("_____")[1].split("____")[0];e(`Save timestamp: ${t}`),e(`Account ID: ${r}`),e(`Folder ID: ${I}`),e(`Folder target item identifier: ${o}`),e("Creating folder position input");const l=dt(t,r,o);e("Folder position input created:",l);let d=[];const i=p.filter(c=>c.status==="complete");if(e(`Found ${i.length} valid photos with 'complete' status`),i.length>0){const c=i.filter(m=>!m.fileId);e(`Found ${c.length} new uploads to move from temp to public folder`),c.length>0&&(e("Moving files from temp to public folder"),await Ss(c,ce,X)),e("Creating file reference inputs for uploads");const u=ct(i,t,r);e(`Created ${u.length} file reference inputs for uploads`,u),d=d.concat(u)}if(le&&k.length>0){e(`Adding ${k.length} existing file references for sub-album`);const c=k.map(u=>(e(`Creating file reference for existing file ID: ${u}`),{fileReferencesHolderId:I,currentTime:t,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:u,fileInput:null}));e(`Created ${c.length} file reference inputs for existing files`,c),d=d.concat(c)}e(`Total file reference inputs: ${d.length}`),e("Sending GraphQL mutations with chunked file references"),await ot(l,d)}catch(t){console.error("Error in saveAlbumDirectly:",t),e(`Error in saveAlbumDirectly: ${t}`),_(!1)}},rt=t=>{const r=new Set;return t.filter(a=>r.has(a.fileId)?(e(`Skipping duplicate file reference with ID: ${a.fileId}`),!1):(r.add(a.fileId),!0))},ot=async(t,r)=>{e("Starting chunked save process");try{J("Processing files in chunks...");const a=48;if(r.length===0)e("No file references to process, saving only folder position"),await nt(t);else{const o=rt(r);e(`After removing duplicates, processing ${o.length} unique file references`);const l=st(o,a);e(`Split file references into ${l.length} chunks of max size ${a}`);for(let d=0;d<l.length;d++){const i=l[d];e(`Processing chunk ${d+1} of ${l.length} with ${i.length} file references`);const c=d/l.length*80;K(10+c),ce(10+c),d<l.length-1?(J(`Saving files: chunk ${d+1} of ${l.length}...`),await at(i)):(J("Finalizing album..."),await it(i,t))}}K(100),ce(100),J("Album saved successfully!"),ut()}catch(a){console.error("Error in chunked save process:",a),e(`Error in chunked save process: ${a}`),J(`Error: ${a}`),_(!1)}},J=t=>{e(`Save progress text: ${t}`);const r=document.getElementById("saveProgressText");r&&(r.innerText=n(t))},nt=async t=>{var l,d;e("Sending folder-only mutation (no file references)");const r=await U();if(!r)throw e("No token available for saving album, aborting"),new Error("Authentication token not available");const a=`
      mutation MyMutation($folderPositionInputs: [FolderPositionInput!]) {
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items {
            id
          }
        }
      }
    `,o={folderPositionInputs:[t]};e("GraphQL folder-only mutation variables:",o);try{e("Sending API request to save folder");const i=await fetch(G,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({query:a,variables:o})});e(`API response status: ${i.status}`);const c=await i.text();e(`API response raw text: ${c}`);const u=JSON.parse(c);if(e("API response JSON:",u),u.errors)throw console.error("Folder save failed:",u.errors),e("Folder save failed with errors:",u.errors),new Error("Failed to save folder");return e("Folder saved successfully"),((d=(l=u.data)==null?void 0:l.changeFiles)==null?void 0:d.items)||[]}catch(i){throw console.error("Error in sendFolderOnlyMutation:",i),e(`Error in sendFolderOnlyMutation: ${i}`),i}},at=async t=>{var l,d,i,c,u;e(`Sending file references-only mutation with ${t.length} items`);const r=await U();if(!r)throw e("No token available for saving file references, aborting"),new Error("Authentication token not available");const a=`
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
    `,o={updatedFileReferenceInputs:t};e("GraphQL file references-only mutation variables (first item):",t.length>0?t[0]:"No items");try{e("Sending API request to save file references");const m=await fetch(G,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({query:a,variables:o})});e(`API response status: ${m.status}`);const D=await m.text();e(`API response raw text: ${D.substring(0,500)}...`);const h=JSON.parse(D);if(e("API response JSON items count:",((i=(d=(l=h.data)==null?void 0:l.changeFiles0)==null?void 0:d.items)==null?void 0:i.length)||0),h.errors)throw console.error("File references save failed:",h.errors),e("File references save failed with errors:",h.errors),new Error("Failed to save file references");return e("File references chunk saved successfully"),((u=(c=h.data)==null?void 0:c.changeFiles0)==null?void 0:u.items)||[]}catch(m){throw console.error("Error in sendFileReferencesOnlyMutation:",m),e(`Error in sendFileReferencesOnlyMutation: ${m}`),m}},it=async(t,r)=>{var d,i,c,u,m,D,h,B,v;e(`Sending final chunk with folder mutation (${t.length} file references)`);const a=await U();if(!a)throw e("No token available for saving final chunk, aborting"),new Error("Authentication token not available");const o=`
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
    `,l={folderPositionInputs:[r],updatedFileReferenceInputs:t};e("GraphQL final mutation variables (folder + last chunk)");try{e("Sending API request for final save with folder");const F=await fetch(G,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({query:o,variables:l})});e(`API response status: ${F.status}`);const M=await F.text();e(`API response raw text: ${M.substring(0,500)}...`);const C=JSON.parse(M);if(e("API response JSON:",{fileReferencesCount:((c=(i=(d=C.data)==null?void 0:d.changeFiles0)==null?void 0:i.items)==null?void 0:c.length)||0,folderItems:((m=(u=C.data)==null?void 0:u.changeFiles)==null?void 0:m.items)||[]}),C.errors)throw console.error("Final save failed:",C.errors),e("Final save failed with errors:",C.errors),new Error("Failed to complete album save");return e("Final chunk and folder saved successfully"),{fileReferences:((h=(D=C.data)==null?void 0:D.changeFiles0)==null?void 0:h.items)||[],folderPositions:((v=(B=C.data)==null?void 0:B.changeFiles)==null?void 0:v.items)||[]}}catch(F){throw console.error("Error in sendFinalChunkWithFolderMutation:",F),e(`Error in sendFinalChunkWithFolderMutation: ${F}`),F}},lt=async()=>(e("Validating required data"),await U()?g?I?(e("All required data validated successfully"),!0):(e("No folder ID, validation failed"),!1):(e("No Cognito username, validation failed"),!1):(e("No token available, validation failed"),!1)),ce=t=>{const r=document.getElementById("saveProgress");r?(r.style.width=`${t}%`,e(`Updated save progress bar: ${t}%`)):e("Progress bar element not found"),K(t)},dt=(t,r,a)=>{e("Creating folder position input"),e(`Profile visibility: ${W?"Public":"Only Me"}`);const o=W?[`${g}_____Public____Profile`]:["Only Me_____Only Me____Profile"];e(`Profile IDs: ${JSON.stringify(o)}`);let l=[];le&&k.length>0&&(e(`Creating file reference IDs for ${k.length} sub-album files`),l=k.map(c=>{const u=c.split("_____");if(u.length>=2){const D=u[1].split("____")[0],h=`${a}_____${D}____FileReference`;return e(`Created file reference ID for sub-album: ${h}`),h}return e(`Using original fileId as fallback: ${c}`),c})),e(`Created ${l.length} acceptedFileReferenceIds`);const d=w!=="noPassword"?Y:null,i=Ne[w.charAt(0).toUpperCase()+w.slice(1)];return e(`Password protection: ${w}`),e(`Password policy: ${i}`),e(`Album password: ${d?"******":"null"}`),e(`Participants can add items: ${V}`),{currentTime:t,folderId:I,profileIds:o,folderPositionSelectedTagInputs:[],folderPositionPoints:1,acceptedFileReferenceIds:l,folderInput:{folderSelectedTagInputs:[],folderAboutContactIds:[r],folderName:me,folderDescription:xe,folderPasswordInput:{password:d,policy:i},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,usingFolderInviteGrantsRightToRemoveItems:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:V,addedItemsNeedFolderCreatorApproval:!1}}}},ct=(t,r,a)=>(e(`Creating file reference inputs for ${t.length} photos`),t.map(o=>{var i;if(o.fileId)return e(`Using existing fileId for photo: ${o.fileId}`),{fileReferencesHolderId:I,currentTime:r,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:o.fileId,fileInput:null};const l=o.type==="video"||(i=o.type)!=null&&i.startsWith("video")?`Input/Video/${o.fileName}`:`Input/Image/${o.fileName}`,d=`${g}_____${o.fileName}____File`;return e(`Created file reference for ${o.fileName}:`),e(`  - dataKey: ${l}`),e(`  - fileId: ${d}`),e(`  - thumbnailDataKey: ${o.thumbnailDataKey||"undefined"}`),e(`  - size: ${o.size}`),e(`  - thumbnailSize: ${o.thumbnailSize||0}`),e(`  - duration: ${o.duration||"undefined"}`),{fileReferencesHolderId:I,currentTime:r,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:d,fileInput:{fileId:d,ownerFileInput:{editorContactIds:[a],FileSharingOptionsEnum:"Anyone",dataKey:l,thumbnailDataKey:o.thumbnailDataKey,dataInBytes:o.size,thumbnailDataInBytes:o.thumbnailSize||0,s3UploadedAt:r,durationInSeconds:o.duration},editorFileInput:{aboutContactIds:[a],captionText:"",numericFilterInputs:[]}}}})),ut=()=>{e("Handling successful save"),ws(y,he,[E.SELECTED_PHOTOS,E.SUB_ALBUM_DATA],X),e("Album data cleared");const t=document.getElementById("saveProgressText");t&&(t.innerText=n("Album saved successfully!"),e("Updated progress text to 'Album saved successfully!'")),sessionStorage.setItem("album_just_saved","true"),e("Set 'album_just_saved' flag in sessionStorage"),e("Setting timeout for redirect to my-albums.html"),setTimeout(()=>{e("Redirecting to my-albums.html"),window.location.href="/my-albums.html"},1e3)},ft=t=>{const r=/^[a-zA-Z0-9-]+$/.test(t);return e(`Username validation for '${t}': ${r}`),r},je=async t=>{var l,d;e(`Submitting username: ${t}`),ie(!0),ae("");const r=await U();if(!r){e("No token available for username submission"),ie(!1);return}const a=`
      mutation MyMutation($savePublicProfileDisplayNameInput: SavePublicProfileDisplayNameInput) {
        changeMyAccountItem(savePublicProfileDisplayNameInput: $savePublicProfileDisplayNameInput) {
          ... on Profile {
            anyDisplayName
          }
        }
      }
    `,o={savePublicProfileDisplayNameInput:{anyDisplayName:t}};e("Username mutation variables:",o);try{e("Sending API request to save username");const c=await(await fetch(G,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({query:a,variables:o})})).json();e("Username API response:",c);const u=(d=(l=c==null?void 0:c.data)==null?void 0:l.changeMyAccountItem)==null?void 0:d.anyDisplayName;if(u)e(`Username successfully changed to: ${u}`),gt(u);else throw e("Username change failed - likely already taken"),new Error("Username taken")}catch(i){e(`Error submitting username: ${i}`),ae(n("Username is already taken. Please try a different one.")),Be(!0),ie(!1)}},gt=t=>{e(`Handling successful username update to: ${t}`),localStorage.setItem("publicUsername",t),L(t),S(!1),e("Proceeding to save album after username update"),$e()},pt=()=>{const t=Math.floor(1e5+Math.random()*9e5).toString(),r=`${q}${t}`;e(`Appending random digits to username: ${q} -> ${r}`),ne(r),je(r)},ht=(t,r)=>{e(`Password dialog closed with option: ${t}, password: ${r?"******":"undefined"}`),t&&N(t),r!==void 0&&Z(r),Ie(!1)},mt=()=>w==="noPassword"?n("Album Password Policy"):`${n(w==="notVisible"?"Not Visible":w==="watermark"?"Watermark":"Cannot Be Saved")} ${Y?`(${Y})`:""}`,bt=()=>{e("Opening password dialog"),Ie(!0)};return s.jsxs(s.Fragment,{children:[s.jsx(vt,{}),s.jsxs(It,{isRTL:T,children:[s.jsxs(St,{children:[s.jsxs(wt,{children:[s.jsx(yt,{children:s.jsx($t,{href:"/my-albums.html",children:n("My Albums")})}),s.jsx(ms,{t:n})]}),x.totalFiles>0&&s.jsxs(jt,{children:[s.jsx(Ft,{children:n("Upload Progress")}),s.jsxs(Ct,{children:[s.jsxs(At,{children:[s.jsxs("span",{children:[n("Overall Progress"),": ",Math.round(x.overallProgress*100),"%"]}),s.jsxs("span",{children:[x.filesComplete," ",n("of")," ",x.totalFiles," ",n("complete")]})]}),s.jsx(_t,{children:s.jsx(kt,{progress:x.overallProgress})})]}),s.jsxs(Dt,{children:[x.filesUploading>0&&s.jsxs(ee,{children:[n("Uploading"),": ",x.filesUploading]}),x.filesProcessing>0&&s.jsxs(ee,{children:[n("Processing"),": ",x.filesProcessing]}),x.filesComplete>0&&s.jsxs(ee,{children:[n("Complete"),": ",x.filesComplete]}),x.filesWithError>0&&s.jsxs(ee,{isError:!0,children:[n("Failed"),": ",x.filesWithError]})]})]}),A&&s.jsxs(Tt,{children:[s.jsx(Et,{children:n("Saving Album")}),s.jsx(Ut,{id:"saveProgressText",children:n("Moving files...")}),s.jsx(Ot,{children:s.jsx(Nt,{id:"saveProgress",style:{width:`${Me}%`}})})]}),s.jsx(Rt,{id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:Ze}),le&&(p.length>0||k.length>0)&&s.jsxs("div",{style:{backgroundColor:"#e3f2fd",padding:"15px",borderRadius:"8px",marginBottom:"20px",fontSize:"16px"},children:[s.jsxs("p",{style:{margin:0},children:[n("Creating a new sub-album with")," ",s.jsx("strong",{children:k.length})," ",n("selected items")]}),s.jsx("p",{style:{margin:"10px 0 0 0",fontSize:"14px",color:"#0277bd"},children:n("You can add more photos or videos to this sub-album before saving")}),p.length>0&&s.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:"10px",marginTop:"15px",justifyContent:"flex-start"},children:[p.slice(0,5).map((t,r)=>s.jsxs("div",{style:{width:"80px",height:"80px",position:"relative",borderRadius:"4px",overflow:"hidden",boxShadow:"0 1px 3px rgba(0,0,0,0.12)"},children:[s.jsx("img",{src:t.s3PreviewUrl,alt:t.fileName,style:{width:"100%",height:"100%",objectFit:"cover"}}),t.type==="video"&&s.jsx("div",{style:{position:"absolute",bottom:"5px",right:"5px",backgroundColor:"rgba(0,0,0,0.7)",color:"white",fontSize:"10px",padding:"2px 4px",borderRadius:"2px"},children:t.duration?`${Math.floor(t.duration)}s`:"Video"})]},r)),p.length>5&&s.jsxs("div",{style:{width:"80px",height:"80px",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"#bbdefb",borderRadius:"4px",color:"#0d47a1",fontWeight:"bold"},children:["+",p.length-5," ",n("more")]})]})]}),p.length>0&&s.jsxs(s.Fragment,{children:[s.jsxs(Bt,{children:[p.length," ",p.length>1?n("photos selected"):n("photo selected"),":"]}),s.jsx(Mt,{children:p.map((t,r)=>{var a,o;return s.jsxs(zt,{children:[s.jsx(Lt,{status:t.status,children:t.status==="complete"?"✓":t.status==="error"?"✕":t.status==="uploading"?"↑":t.status==="processing"?"⚙️":"•"}),s.jsxs(qt,{children:[t.type==="video"||(a=t.type)!=null&&a.startsWith("video")?s.jsx(Wt,{src:t.s3PreviewUrl,controls:!0}):s.jsx(Vt,{src:t.s3PreviewUrl,alt:t.fileName}),(t.status==="uploading"||t.status==="processing")&&s.jsx(Jt,{children:s.jsx(Gt,{progress:t.progress,status:t.status})})]}),s.jsxs(Ht,{children:[(o=t.type)!=null&&o.startsWith("video")?n("Video"):n("Image"),t.size&&` • ${(t.size/1024/1024).toFixed(1)} MB`,t.duration&&` • ${t.duration}s`]}),t.status==="error"&&t.errorMessage&&s.jsxs(Kt,{children:[n("Error"),": ",t.errorMessage.length>40?t.errorMessage.substring(0,37)+"...":t.errorMessage]}),s.jsx(Qt,{onClick:()=>Ye(r),disabled:A,children:n("Remove")})]},r)})})]}),s.jsxs(Yt,{children:[ze&&ye===!0&&s.jsxs(Zt,{children:[s.jsxs(Fe,{children:[s.jsx(Ce,{htmlFor:"folderName",children:n("Album Name (Optional)")}),s.jsx(Xt,{id:"folderName",type:"text",value:me,onChange:t=>be(t.target.value),placeholder:n("Enter album name")})]}),s.jsxs(Fe,{children:[s.jsx(Ce,{htmlFor:"folderDescription",children:n("Album Description (Optional)")}),s.jsx(es,{id:"folderDescription",value:xe,onChange:t=>Pe(t.target.value),placeholder:n("Enter album description"),rows:4})]}),s.jsxs(Ae,{children:[s.jsx(_e,{children:n(W?"On Public Profile":"Not On Public Profile")}),s.jsxs(ke,{children:[s.jsx("input",{type:"checkbox",checked:W,onChange:Ke,disabled:A}),s.jsx(De,{})]})]}),s.jsxs(Ae,{children:[s.jsx(_e,{children:n(V?"Participants Can Add Items":"Participants Cannot Add Items")}),s.jsxs(ke,{children:[s.jsx("input",{type:"checkbox",checked:V,onChange:Qe,disabled:A}),s.jsx(De,{})]})]})]}),s.jsx(ts,{onClick:()=>{const t=document.getElementById("file-input");t==null||t.click()},disabled:A,children:n("Add More Photos")}),ye===!0&&s.jsx(ss,{passwordSet:w!=="noPassword",onClick:bt,disabled:A,children:mt()}),s.jsx(rs,{onClick:tt,disabled:A,children:n(A?"Saving Album...":"Save Album")})]}),oe&&s.jsx(os,{children:s.jsxs(ns,{isRTL:T,children:[s.jsx(as,{children:n("Enter Username")}),s.jsx(is,{children:n("Username should contain only letters, numbers and hyphens. Example: john-doe2")}),s.jsx(ls,{value:q,onChange:t=>ne(t.target.value),isRTL:T}),ge&&s.jsx(ds,{children:ge}),s.jsx(cs,{disabled:pe,onClick:()=>{if(!ft(q)){ae(n("Username must contain only letters, numbers, and hyphens."));return}je(q)},children:n("Select Username")}),Re&&s.jsx(us,{disabled:pe,onClick:pt,children:n("Add Random Digits to Username")})]})}),ve&&s.jsx(ks,{isOpen:ve,onClose:ht,initialOption:w,initialPassword:Y})]}),$.length>0&&s.jsxs(fs,{children:[s.jsx(gs,{children:n("Debug Log")}),s.jsx(ps,{children:$.map((t,r)=>s.jsx(hs,{children:t},r))})]})]})]})},Es=()=>s.jsx(Pt,{children:s.jsx(Ts,{})});xt.createRoot(document.getElementById("root")).render(s.jsx(Es,{}));
