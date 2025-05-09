import{u as Ue,r as f,j as s,g as Re,R as mt,I as bt,b as T,a as se}from"./config-C81kv4lT.js";import{u as xt,G as Pt,A as vt,C as wt,H as It,B as St,a as yt,P as $t,b as jt,O as Ft,c as Ct,d as _t,e as At,f as kt,g as re,S as Dt,h as Tt,i as Et,j as Ot,k as Ut,l as Rt,m as Nt,n as Bt,o as Mt,p as zt,M as Lt,V as Wt,q as qt,U as Vt,r as Jt,F as Gt,E as Ht,R as Kt,s as Qt,t as Yt,v as Ce,w as _e,x as Xt,y as Zt,T as Ae,z as ke,D as De,I as Te,J as es,K as ts,L as ss,N as rs,Q as os,W as ns,X as as,Y as is,Z as ls,_ as ds,$ as cs,a0 as us,a1 as fs,a2 as gs,a3 as ps}from"./customHooks-BuRNMv0t.js";import{b as M,g as fe}from"./utils-BMtZFOCn.js";import{d as v}from"./styled-components.browser.esm-DAVmpCtn.js";import{L as hs}from"./LogoutButton-BD-NNDV2.js";import{u as ms,s as bs,c as xs,p as Ps,a as vs,m as ws,b as Is}from"./file-upload-utils-Pz9rjdMU.js";import"./index-DFUfgcbK.js";const Ss=v.div`
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
`,ys=v.div`
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`,$s=v.div`
  font-size: 18px;
  font-weight: 500;
  color: white;
  background-color: #888;
  padding: 15px 20px;
  text-align: center;
`,js=v.div`
  direction: ${n=>n.isRTL?"rtl":"ltr"};
  padding: 30px;
`,Ee=v.p`
  margin-bottom: 15px;
  font-size: 16px;
`,Fs=v.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 25px;
  margin-top: 20px;
  box-sizing: border-box;
`,Cs=v.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
`,oe=v.div`
  display: flex;
  align-items: center;
  cursor: ${n=>n.disabled?"not-allowed":"pointer"};
  opacity: ${n=>n.disabled?.7:1};
`,ne=v.input`
  margin-right: 10px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  
  &:disabled {
    cursor: not-allowed;
  }
`,ae=v.label`
  display: flex;
  cursor: ${n=>n.disabled?"not-allowed":"pointer"};
  font-size: 16px;
`,ge=v.span`
  color: #aaa;
  margin-left: 8px;
`,_s=v.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`,Oe=v.button`
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
`,As=({isOpen:n,onClose:z,initialOption:A="noPassword",initialPassword:L=""})=>{const{t:b,language:W}=Ue(),H=Re(W)==="rtl",[S,K]=f.useState(A),[E,q]=f.useState(L);if(f.useEffect(()=>{n&&(K(A),q(L))},[n,A,L]),!n)return null;const p=E.trim()==="",O=x=>{x!=="noPassword"&&p||K(x)},ie=x=>{x.target===x.currentTarget&&z()};return s.jsx(Ss,{onClick:ie,children:s.jsxs(ys,{children:[s.jsx($s,{children:b("Album Password Policy")}),s.jsxs(js,{isRTL:H,children:[s.jsx(Ee,{children:b("Enter a password for this album.")}),s.jsx(Fs,{type:"text",placeholder:b("Enter password"),value:E,onChange:x=>q(x.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"}),s.jsx(Ee,{children:b("Select password restrictions.")}),s.jsxs(Cs,{children:[s.jsxs(oe,{disabled:p,children:[s.jsx(ne,{type:"radio",name:"protection",id:"notVisible",checked:S==="notVisible",onChange:()=>{},disabled:p,onClick:()=>!p&&O("notVisible")}),s.jsxs(ae,{htmlFor:"notVisible",disabled:p,children:[b("Password Required To See Or Save"),p&&s.jsx(ge,{children:b("Password required")})]})]}),s.jsxs(oe,{disabled:p,children:[s.jsx(ne,{type:"radio",name:"protection",id:"watermark",checked:S==="watermark",onChange:()=>{},disabled:p,onClick:()=>!p&&O("watermark")}),s.jsxs(ae,{htmlFor:"watermark",disabled:p,children:[b("Password Required To Remove Watermark Or Save"),p&&s.jsx(ge,{children:b("Password required")})]})]}),s.jsxs(oe,{disabled:p,children:[s.jsx(ne,{type:"radio",name:"protection",id:"cannotBeSaved",checked:S==="cannotBeSaved",onChange:()=>{},disabled:p,onClick:()=>!p&&O("cannotBeSaved")}),s.jsxs(ae,{htmlFor:"cannotBeSaved",disabled:p,children:[b("Password Required To Save"),p&&s.jsx(ge,{children:b("Password required")})]})]}),s.jsxs(oe,{disabled:!1,children:[s.jsx(ne,{type:"radio",name:"protection",id:"noPassword",checked:S==="noPassword",onChange:()=>{},onClick:()=>O("noPassword")}),s.jsx(ae,{htmlFor:"noPassword",disabled:!1,children:b("No Password")})]})]}),s.jsxs(_s,{children:[s.jsx(Oe,{onClick:()=>z(),children:b("Cancel")}),s.jsx(Oe,{onClick:()=>{console.log(`Saving with option: ${S}, password: ${E.length>0?"********":"none"}`),z(S,E)},children:b("Save")})]})]})]})})};var Ne=(n=>(n.NotVisible="NotVisible",n.Watermark="Watermark",n.CannotBeSaved="CannotBeSaved",n.NoPassword="NoPassword",n))(Ne||{});const ks=`
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
`,Ds=()=>{const{t:n,language:z}=Ue(),A=Re(z)==="rtl",{showUsernamePrompt:L,setShowUsernamePrompt:b,usernameInput:W,setUsernameInput:H,usernameError:S,setUsernameError:K,showAltButton:E,isSubmittingUsername:q,validateUsername:p,submitUsername:O,appendRandomDigits:ie}=xt(n),[x,le]=f.useState(null),[h,k]=f.useState([]),[pe,Be]=f.useState([]),[Q,he]=f.useState(null),[D,Me]=f.useState(null),[P,me]=f.useState({totalFiles:0,filesComplete:0,filesUploading:0,filesProcessing:0,filesWithError:0,overallProgress:0}),[j,F]=f.useState(!1),[ze,Y]=f.useState(0),[be,xe]=f.useState(""),[Pe,ve]=f.useState(""),[Le,X]=f.useState(!1),[we,Ie]=f.useState(!1),[I,U]=f.useState("noPassword"),[Z,ee]=f.useState(""),[V,Se]=f.useState(!1),[J,ye]=f.useState(!0),[$e,R]=f.useState(null),[de,We]=f.useState(!1),[C,qe]=f.useState([]),te=xs(Be),Ve=vs(k),e=(t,r)=>{let o=`[${new Date().toISOString()}] ${t}`;if(r!==void 0)try{const l=typeof r=="object"?JSON.stringify(r,null,2):String(r);o+=`
Data: ${l}`,console.log(o),console.log("Data object:",r)}catch(l){o+=` [Error stringifying data: ${l}]`,console.log(o),console.log("Raw data:",r)}else console.log(o);te(o)};f.useEffect(()=>{e("Component initializing"),Je()},[]),f.useEffect(()=>{h.length>0&&(localStorage.setItem(T.SELECTED_PHOTOS,JSON.stringify(h)),e(`Saved ${h.length} photos to localStorage`))},[h]),f.useEffect(()=>{ms(h,me)},[h]);const Je=async()=>{var t;e("Starting component initialization"),F(!1);try{e("Checking login with refresh");const r=await M();if(!r){e("No token returned from login check, aborting initialization");return}try{const a=localStorage.getItem("publicUsername");e(`Retrieved public username from localStorage: ${a||"null"}`),he(a||null);const l=JSON.parse(atob(r.split(".")[1]))["cognito:username"];if(l){e(`Extracted Cognito username from token: ${l}`),Me(l);const d=localStorage.getItem(T.SUB_ALBUM_DATA);if(e(`Sub-album data from localStorage: ${d||"null"}`),d)try{const i=JSON.parse(d);if(e("Parsed sub-album data:",i),i.isSubAlbum&&((t=i.selectedFileIds)==null?void 0:t.length)>0){e(`Valid sub-album data found with ${i.selectedFileIds.length} files`),We(!0),qe(i.selectedFileIds),i.selectedPhotos&&i.selectedPhotos.length>0&&(e(`Found ${i.selectedPhotos.length} selected photos in sub-album data`),k(i.selectedPhotos)),X(!0),R(!0);const c=`${l}_____${fe()}____Folder`;e(`Generated new folder ID for sub-album: ${c}`),le(c)}else e("Invalid sub-album data, proceeding with normal initialization"),await ce(l)}catch(i){console.error("Error parsing sub-album data:",i),e(`Error parsing sub-album data: ${i}`),await ce(l)}else e("No sub-album data found, proceeding with normal folder initialization"),await ce(l)}else e("No Cognito username found in token")}catch(a){console.error("User data initialization error:",a),e(`User data initialization error: ${a}`)}He(),Ke(),e("Component initialization completed")}catch(r){console.error("Initialization error:",r),e(`Initialization error: ${r}`)}},ce=async t=>{e(`Initializing folder ID with username: ${t}`);try{const a=new URLSearchParams(window.location.search).get("folderId");if(e(`Folder ID from URL: ${a||"null"}`),a){le(a),e(`Using existing folder ID: ${a}`);try{e(`Fetching details for folder: ${a}`);const o=await Ge(a);if(e("Folder details retrieved:",o),o){const l=`${t}_____${t}____Account`,d=o.creatorId===l;if(e(`User is creator of folder: ${d}, accountId: ${l}, creator: ${o.creatorId}`),R(d),d){e("User is creator, showing folder details"),X(!0),xe(o.folderName),ve(o.folderDescription),Se(o.isOnPublicProfile),e(`Setting isOnPublicProfile: ${o.isOnPublicProfile}`),o.participantsCanAddItems!==void 0&&(ye(o.participantsCanAddItems),e(`Setting participantsCanAddItems: ${o.participantsCanAddItems}`));const i=o.passwordPolicy;switch(e(`Password policy from folder details: ${i}`),i){case"NoPassword":U("noPassword");break;case"NotVisible":U("notVisible"),ee(o.password);break;case"Watermark":U("watermark"),ee(o.password);break;case"CannotBeSaved":U("cannotBeSaved"),ee(o.password);break;default:U("noPassword")}e(`Set password protection option to: ${I}`)}else e("User is NOT the creator, hiding editable fields"),X(!1)}else e("No folder details retrieved, setting isCreator to false"),R(!1)}catch(o){console.error("Error fetching folder details:",o),e(`Error fetching folder details: ${o}`),R(!1)}}else{const o=`${t}_____${fe()}____Folder`;e(`Creating new folder ID: ${o}`),le(o),e("Setting isCreator to true for new album"),R(!0),X(!0)}}catch(r){console.error("Folder ID initialization error:",r),e(`Folder ID initialization error: ${r}`),R(!1)}},Ge=async t=>{var r,a,o,l,d,i,c,u;e(`Fetching details for folder ID: ${t}`);try{const m=await M();if(!m)return e("No token available for fetching folder details"),null;e("Sending GraphQL query to fetch folder details");const g=await(await fetch(se,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${m}`},body:JSON.stringify({query:ks,variables:{folderIds:[t]}})})).json();if(e("Folder details API response:",g),g.errors)return console.error("GraphQL errors:",g.errors),e(`GraphQL errors: ${JSON.stringify(g.errors)}`),null;const N=((a=(r=g==null?void 0:g.data)==null?void 0:r.fetchFolders)==null?void 0:a.items)||[];if(e(`Found ${N.length} folder items`),N.length===0)return e("No folder items found"),null;const w=N[0];e("Retrieved folder data:",w);const y=((l=(o=w.folderPosition)==null?void 0:o.profileIds)==null?void 0:l.some($=>$.includes("Public____Profile")))||!1;e(`Folder is on public profile: ${y}`),e("Profile IDs:",(d=w.folderPosition)==null?void 0:d.profileIds);const B=(i=w.folderInviteParameters)==null?void 0:i.usingFolderInviteGrantsRightToAddItems;return e(`Participants can add items: ${B}`),{creatorId:w.creatorId||"",folderName:w.folderName||"",folderDescription:w.folderDescription||"",passwordPolicy:((c=w.folderPassword)==null?void 0:c.policy)||"NoPassword",password:((u=w.folderPassword)==null?void 0:u.password)||"",isOnPublicProfile:y,participantsCanAddItems:B!==void 0?B:!0}}catch(m){return console.error("Error in fetchFolderDetails:",m),e(`Error in fetchFolderDetails: ${m}`),null}},He=()=>{e("Attempting to restore photos from localStorage");try{const t=localStorage.getItem(T.SELECTED_PHOTOS);if(e(`Found stored photos: ${t?"yes":"no"}`),t)try{const r=JSON.parse(t);e(`Parsed ${r.length} photos from localStorage`),Array.isArray(r)&&r.length>0&&(k(r),e(`Restored ${r.length} photos to state`))}catch(r){console.error("Error parsing stored photos:",r),e(`Error parsing stored photos: ${r}`)}}catch(t){console.error("Error restoring photos from storage:",t),e(`Error restoring photos from storage: ${t}`)}},Ke=()=>{e("Testing S3 connection");try{bs?e("S3 client is available"):(console.error("S3 client not available"),e("S3 client not available"))}catch(t){console.error("S3 connection test error:",t),e(`S3 connection test error: ${t}`)}},Qe=()=>{const t=!V;e(`Toggling isOnPublicProfile to: ${t}`),Se(t)},Ye=()=>{const t=!J;e(`Toggling participantsCanAddItems to: ${t}`),ye(t)},Xe=t=>{e(`Removing photo at index: ${t}`);const r=h.filter((a,o)=>o!==t);k(r),e(`New photos count: ${r.length}`),r.length>0?(localStorage.setItem(T.SELECTED_PHOTOS,JSON.stringify(r)),e(`Updated localStorage with ${r.length} photos`)):(localStorage.removeItem(T.SELECTED_PHOTOS),e("Removed photos from localStorage"))},Ze=async t=>{if(e("Add photos triggered from file input"),!D){e("No Cognito username available, cannot add photos");return}const r=Array.from(t.target.files||[]);if(e(`Selected ${r.length} files`),!!r.length)try{const a=et(r);e(`Created ${a.length} initial photo objects`),k(d=>[...d,...a]);const o=h.length;e(`Starting processing at index: ${o}`);const l=await Ps(r,D,(d,i,c,u)=>{Ve(o+d,i,c,u),e(`Updated status for photo ${o+d}: ${i}, progress: ${c}`)},te);e(`Updating ${l.length} photos with processed info`),tt(o,l)}catch(a){console.error("Error in handleAddPhotos:",a),e(`Error in handleAddPhotos: ${a}`)}finally{t.target.value="",e("Reset file input value")}},et=t=>(e(`Creating initial photo objects for ${t.length} files`),t.map(r=>{const a=r.type,o=r.name.split(".").pop()||"jpg",l=`${fe()}.${o}`;return e(`Created initial photo object: ${l}, type: ${a}, size: ${r.size}`),{fileName:l,s3PreviewUrl:URL.createObjectURL(r),type:a,size:r.size,status:"pending",progress:0}})),tt=(t,r)=>{e(`Updating photos with processed info, starting at index ${t}`),k(a=>{const o=[...a];return r.forEach((l,d)=>{const i=t+d;i<o.length&&(e(`Updating photo at index ${i} with processed info`),o[i]=l)}),o})},st=async()=>{e("Album save initiated"),F(!0);try{if(Q!=null&&Q.startsWith("Profile-")){e("Public username starts with 'Profile-', showing username prompt"),H(Q),b(!0),F(!1);return}e("Valid username found, proceeding to save album directly"),Fe()}catch(t){console.error("Error in handleSaveAlbum:",t),e(`Error in handleSaveAlbum: ${t}`),F(!1)}},je=t=>{e(`Handling successful username update to: ${t}`),localStorage.setItem("publicUsername",t),he(t),b(!1),e("Proceeding to save album after username update"),Fe()},rt=(t,r)=>{e(`Splitting array of ${t.length} items into chunks of ${r}`);const a=[];for(let o=0;o<t.length;o+=r)a.push(t.slice(o,o+r));return e(`Created ${a.length} chunks`),a},Fe=async()=>{e("Starting direct album save"),F(!0),Y(5);try{if(e("Validating required data for save"),!await dt()){e("Required data validation failed, aborting save"),F(!1);return}const t=Math.floor(Date.now()/1e3),r=`${D}_____${D}____Account`,o=x.split("_____")[1].split("____")[0];e(`Save timestamp: ${t}`),e(`Account ID: ${r}`),e(`Folder ID: ${x}`),e(`Folder target item identifier: ${o}`),e("Creating folder position input");const l=ct(t,r,o);e("Folder position input created:",l);let d=[];const i=h.filter(c=>c.status==="complete");if(e(`Found ${i.length} valid photos with 'complete' status`),i.length>0){const c=i.filter(m=>!m.fileId);e(`Found ${c.length} new uploads to move from temp to public folder`),c.length>0&&(e("Moving files from temp to public folder"),await ws(c,ue,te)),e("Creating file reference inputs for uploads");const u=ut(i,t,r);e(`Created ${u.length} file reference inputs for uploads`,u),d=d.concat(u)}if(de&&C.length>0){e(`Adding ${C.length} existing file references for sub-album`);const c=C.map(u=>(e(`Creating file reference for existing file ID: ${u}`),{fileReferencesHolderId:x,currentTime:t,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:u,fileInput:null}));e(`Created ${c.length} file reference inputs for existing files`,c),d=d.concat(c)}e(`Total file reference inputs: ${d.length}`),e("Sending GraphQL mutations with chunked file references"),await nt(l,d)}catch(t){console.error("Error in saveAlbumDirectly:",t),e(`Error in saveAlbumDirectly: ${t}`),F(!1)}},ot=t=>{const r=new Set;return t.filter(a=>r.has(a.fileId)?(e(`Skipping duplicate file reference with ID: ${a.fileId}`),!1):(r.add(a.fileId),!0))},nt=async(t,r)=>{e("Starting chunked save process");try{G("Processing files in chunks...");const a=48;if(r.length===0)e("No file references to process, saving only folder position"),await at(t);else{const o=ot(r);e(`After removing duplicates, processing ${o.length} unique file references`);const l=rt(o,a);e(`Split file references into ${l.length} chunks of max size ${a}`);for(let d=0;d<l.length;d++){const i=l[d];e(`Processing chunk ${d+1} of ${l.length} with ${i.length} file references`);const c=d/l.length*80;Y(10+c),ue(10+c),d<l.length-1?(G(`Saving files: chunk ${d+1} of ${l.length}...`),await it(i)):(G("Finalizing album..."),await lt(i,t))}}Y(100),ue(100),G("Album saved successfully!"),ft()}catch(a){console.error("Error in chunked save process:",a),e(`Error in chunked save process: ${a}`),G(`Error: ${a}`),F(!1)}},G=t=>{e(`Save progress text: ${t}`);const r=document.getElementById("saveProgressText");r&&(r.innerText=n(t))},at=async t=>{var l,d;e("Sending folder-only mutation (no file references)");const r=await M();if(!r)throw e("No token available for saving album, aborting"),new Error("Authentication token not available");const a=`
      mutation MyMutation($folderPositionInputs: [FolderPositionInput!]) {
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items {
            id
          }
        }
      }
    `,o={folderPositionInputs:[t]};e("GraphQL folder-only mutation variables:",o);try{e("Sending API request to save folder");const i=await fetch(se,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({query:a,variables:o})});e(`API response status: ${i.status}`);const c=await i.text();e(`API response raw text: ${c}`);const u=JSON.parse(c);if(e("API response JSON:",u),u.errors)throw console.error("Folder save failed:",u.errors),e("Folder save failed with errors:",u.errors),new Error("Failed to save folder");return e("Folder saved successfully"),((d=(l=u.data)==null?void 0:l.changeFiles)==null?void 0:d.items)||[]}catch(i){throw console.error("Error in sendFolderOnlyMutation:",i),e(`Error in sendFolderOnlyMutation: ${i}`),i}},it=async t=>{var l,d,i,c,u;e(`Sending file references-only mutation with ${t.length} items`);const r=await M();if(!r)throw e("No token available for saving file references, aborting"),new Error("Authentication token not available");const a=`
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
    `,o={updatedFileReferenceInputs:t};e("GraphQL file references-only mutation variables (first item):",t.length>0?t[0]:"No items");try{e("Sending API request to save file references");const m=await fetch(se,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({query:a,variables:o})});e(`API response status: ${m.status}`);const _=await m.text();e(`API response raw text: ${_.substring(0,500)}...`);const g=JSON.parse(_);if(e("API response JSON items count:",((i=(d=(l=g.data)==null?void 0:l.changeFiles0)==null?void 0:d.items)==null?void 0:i.length)||0),g.errors)throw console.error("File references save failed:",g.errors),e("File references save failed with errors:",g.errors),new Error("Failed to save file references");return e("File references chunk saved successfully"),((u=(c=g.data)==null?void 0:c.changeFiles0)==null?void 0:u.items)||[]}catch(m){throw console.error("Error in sendFileReferencesOnlyMutation:",m),e(`Error in sendFileReferencesOnlyMutation: ${m}`),m}},lt=async(t,r)=>{var d,i,c,u,m,_,g,N,w;e(`Sending final chunk with folder mutation (${t.length} file references)`);const a=await M();if(!a)throw e("No token available for saving final chunk, aborting"),new Error("Authentication token not available");const o=`
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
    `,l={folderPositionInputs:[r],updatedFileReferenceInputs:t};e("GraphQL final mutation variables (folder + last chunk)");try{e("Sending API request for final save with folder");const y=await fetch(se,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({query:o,variables:l})});e(`API response status: ${y.status}`);const B=await y.text();e(`API response raw text: ${B.substring(0,500)}...`);const $=JSON.parse(B);if(e("API response JSON:",{fileReferencesCount:((c=(i=(d=$.data)==null?void 0:d.changeFiles0)==null?void 0:i.items)==null?void 0:c.length)||0,folderItems:((m=(u=$.data)==null?void 0:u.changeFiles)==null?void 0:m.items)||[]}),$.errors)throw console.error("Final save failed:",$.errors),e("Final save failed with errors:",$.errors),new Error("Failed to complete album save");return e("Final chunk and folder saved successfully"),{fileReferences:((g=(_=$.data)==null?void 0:_.changeFiles0)==null?void 0:g.items)||[],folderPositions:((w=(N=$.data)==null?void 0:N.changeFiles)==null?void 0:w.items)||[]}}catch(y){throw console.error("Error in sendFinalChunkWithFolderMutation:",y),e(`Error in sendFinalChunkWithFolderMutation: ${y}`),y}},dt=async()=>(e("Validating required data"),await M()?D?x?(e("All required data validated successfully"),!0):(e("No folder ID, validation failed"),!1):(e("No Cognito username, validation failed"),!1):(e("No token available, validation failed"),!1)),ue=t=>{const r=document.getElementById("saveProgress");r?(r.style.width=`${t}%`,e(`Updated save progress bar: ${t}%`)):e("Progress bar element not found"),Y(t)},ct=(t,r,a)=>{e("Creating folder position input"),e(`Profile visibility: ${V?"Public":"Only Me"}`);const o=V?[`${D}_____Public____Profile`]:["Only Me_____Only Me____Profile"];e(`Profile IDs: ${JSON.stringify(o)}`);let l=[];de&&C.length>0&&(e(`Creating file reference IDs for ${C.length} sub-album files`),l=C.map(c=>{const u=c.split("_____");if(u.length>=2){const _=u[1].split("____")[0],g=`${a}_____${_}____FileReference`;return e(`Created file reference ID for sub-album: ${g}`),g}return e(`Using original fileId as fallback: ${c}`),c})),e(`Created ${l.length} acceptedFileReferenceIds`);const d=I!=="noPassword"?Z:null,i=Ne[I.charAt(0).toUpperCase()+I.slice(1)];return e(`Password protection: ${I}`),e(`Password policy: ${i}`),e(`Album password: ${d?"******":"null"}`),e(`Participants can add items: ${J}`),{currentTime:t,folderId:x,profileIds:o,folderPositionSelectedTagInputs:[],folderPositionPoints:1,acceptedFileReferenceIds:l,folderInput:{folderSelectedTagInputs:[],folderAboutContactIds:[r],folderName:be,folderDescription:Pe,folderPasswordInput:{password:d,policy:i},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,usingFolderInviteGrantsRightToRemoveItems:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:J,addedItemsNeedFolderCreatorApproval:!1}}}},ut=(t,r,a)=>(e(`Creating file reference inputs for ${t.length} photos`),t.map(o=>{var i;if(o.fileId)return e(`Using existing fileId for photo: ${o.fileId}`),{fileReferencesHolderId:x,currentTime:r,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:o.fileId,fileInput:null};const l=o.type==="video"||(i=o.type)!=null&&i.startsWith("video")?`Input/Video/${o.fileName}`:`Input/Image/${o.fileName}`,d=`${D}_____${o.fileName}____File`;return e(`Created file reference for ${o.fileName}:`),e(`  - dataKey: ${l}`),e(`  - fileId: ${d}`),e(`  - thumbnailDataKey: ${o.thumbnailDataKey||"undefined"}`),e(`  - size: ${o.size}`),e(`  - thumbnailSize: ${o.thumbnailSize||0}`),e(`  - duration: ${o.duration||"undefined"}`),{fileReferencesHolderId:x,currentTime:r,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:d,fileInput:{fileId:d,ownerFileInput:{editorContactIds:[a],FileSharingOptionsEnum:"Anyone",dataKey:l,thumbnailDataKey:o.thumbnailDataKey,dataInBytes:o.size,thumbnailDataInBytes:o.thumbnailSize||0,s3UploadedAt:r,durationInSeconds:o.duration},editorFileInput:{aboutContactIds:[a],captionText:"",numericFilterInputs:[]}}}})),ft=()=>{e("Handling successful save"),Is(k,me,[T.SELECTED_PHOTOS,T.SUB_ALBUM_DATA],te),e("Album data cleared");const t=document.getElementById("saveProgressText");t&&(t.innerText=n("Album saved successfully!"),e("Updated progress text to 'Album saved successfully!'")),sessionStorage.setItem("album_just_saved","true"),e("Set 'album_just_saved' flag in sessionStorage"),e("Setting timeout for redirect to my-albums.html"),setTimeout(()=>{e("Redirecting to my-albums.html"),window.location.href="/my-albums.html"},1e3)},gt=(t,r)=>{e(`Password dialog closed with option: ${t}, password: ${r?"******":"undefined"}`),t&&U(t),r!==void 0&&ee(r),Ie(!1)},pt=()=>I==="noPassword"?n("Album Password Policy"):`${n(I==="notVisible"?"Not Visible":I==="watermark"?"Watermark":"Cannot Be Saved")} ${Z?`(${Z})`:""}`,ht=()=>{e("Opening password dialog"),Ie(!0)};return s.jsxs(s.Fragment,{children:[s.jsx(Pt,{}),s.jsxs(vt,{isRTL:A,children:[s.jsxs(wt,{children:[s.jsxs(It,{children:[s.jsx(St,{children:s.jsx(yt,{href:"/my-albums.html",children:n("My Albums")})}),s.jsx(hs,{t:n})]}),P.totalFiles>0&&s.jsxs($t,{children:[s.jsx(jt,{children:n("Upload Progress")}),s.jsxs(Ft,{children:[s.jsxs(Ct,{children:[s.jsxs("span",{children:[n("Overall Progress"),": ",Math.round(P.overallProgress*100),"%"]}),s.jsxs("span",{children:[P.filesComplete," ",n("of")," ",P.totalFiles," ",n("complete")]})]}),s.jsx(_t,{children:s.jsx(At,{progress:P.overallProgress})})]}),s.jsxs(kt,{children:[P.filesUploading>0&&s.jsxs(re,{children:[n("Uploading"),": ",P.filesUploading]}),P.filesProcessing>0&&s.jsxs(re,{children:[n("Processing"),": ",P.filesProcessing]}),P.filesComplete>0&&s.jsxs(re,{children:[n("Complete"),": ",P.filesComplete]}),P.filesWithError>0&&s.jsxs(re,{isError:!0,children:[n("Failed"),": ",P.filesWithError]})]})]}),j&&s.jsxs(Dt,{children:[s.jsx(Tt,{children:n("Saving Album")}),s.jsx(Et,{id:"saveProgressText",children:n("Moving files...")}),s.jsx(Ot,{children:s.jsx(Ut,{id:"saveProgress",style:{width:`${ze}%`}})})]}),s.jsx(Rt,{id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:Ze}),de&&(h.length>0||C.length>0)&&s.jsxs("div",{style:{backgroundColor:"#e3f2fd",padding:"15px",borderRadius:"8px",marginBottom:"20px",fontSize:"16px"},children:[s.jsxs("p",{style:{margin:0},children:[n("Creating a new sub-album with")," ",s.jsx("strong",{children:C.length})," ",n("selected items")]}),s.jsx("p",{style:{margin:"10px 0 0 0",fontSize:"14px",color:"#0277bd"},children:n("You can add more photos or videos to this sub-album before saving")}),h.length>0&&s.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:"10px",marginTop:"15px",justifyContent:"flex-start"},children:[h.slice(0,5).map((t,r)=>s.jsxs("div",{style:{width:"80px",height:"80px",position:"relative",borderRadius:"4px",overflow:"hidden",boxShadow:"0 1px 3px rgba(0,0,0,0.12)"},children:[s.jsx("img",{src:t.s3PreviewUrl,alt:t.fileName,style:{width:"100%",height:"100%",objectFit:"cover"}}),t.type==="video"&&s.jsx("div",{style:{position:"absolute",bottom:"5px",right:"5px",backgroundColor:"rgba(0,0,0,0.7)",color:"white",fontSize:"10px",padding:"2px 4px",borderRadius:"2px"},children:t.duration?`${Math.floor(t.duration)}s`:"Video"})]},r)),h.length>5&&s.jsxs("div",{style:{width:"80px",height:"80px",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"#bbdefb",borderRadius:"4px",color:"#0d47a1",fontWeight:"bold"},children:["+",h.length-5," ",n("more")]})]})]}),h.length>0&&s.jsxs(s.Fragment,{children:[s.jsxs(Nt,{children:[h.length," ",h.length>1?n("photos selected"):n("photo selected"),":"]}),s.jsx(Bt,{children:h.map((t,r)=>{var a,o;return s.jsxs(Mt,{children:[s.jsx(zt,{status:t.status,children:t.status==="complete"?"✓":t.status==="error"?"✕":t.status==="uploading"?"↑":t.status==="processing"?"⚙️":"•"}),s.jsxs(Lt,{children:[t.type==="video"||(a=t.type)!=null&&a.startsWith("video")?s.jsx(Wt,{src:t.s3PreviewUrl,controls:!0}):s.jsx(qt,{src:t.s3PreviewUrl,alt:t.fileName}),(t.status==="uploading"||t.status==="processing")&&s.jsx(Vt,{children:s.jsx(Jt,{progress:t.progress,status:t.status})})]}),s.jsxs(Gt,{children:[(o=t.type)!=null&&o.startsWith("video")?n("Video"):n("Image"),t.size&&` • ${(t.size/1024/1024).toFixed(1)} MB`,t.duration&&` • ${t.duration}s`]}),t.status==="error"&&t.errorMessage&&s.jsxs(Ht,{children:[n("Error"),": ",t.errorMessage.length>40?t.errorMessage.substring(0,37)+"...":t.errorMessage]}),s.jsx(Kt,{onClick:()=>Xe(r),disabled:j,children:n("Remove")})]},r)})})]}),s.jsxs(Qt,{children:[Le&&$e===!0&&s.jsxs(Yt,{children:[s.jsxs(Ce,{children:[s.jsx(_e,{htmlFor:"folderName",children:n("Album Name (Optional)")}),s.jsx(Xt,{id:"folderName",type:"text",value:be,onChange:t=>xe(t.target.value),placeholder:n("Enter album name")})]}),s.jsxs(Ce,{children:[s.jsx(_e,{htmlFor:"folderDescription",children:n("Album Description (Optional)")}),s.jsx(Zt,{id:"folderDescription",value:Pe,onChange:t=>ve(t.target.value),placeholder:n("Enter album description"),rows:4})]}),s.jsxs(Ae,{children:[s.jsx(ke,{children:n(V?"On Public Profile":"Not On Public Profile")}),s.jsxs(De,{children:[s.jsx("input",{type:"checkbox",checked:V,onChange:Qe,disabled:j}),s.jsx(Te,{})]})]}),s.jsxs(Ae,{children:[s.jsx(ke,{children:n(J?"Participants Can Add Items":"Participants Cannot Add Items")}),s.jsxs(De,{children:[s.jsx("input",{type:"checkbox",checked:J,onChange:Ye,disabled:j}),s.jsx(Te,{})]})]})]}),s.jsx(es,{onClick:()=>{const t=document.getElementById("file-input");t==null||t.click()},disabled:j,children:n("Add More Photos")}),$e===!0&&s.jsx(ts,{passwordSet:I!=="noPassword",onClick:ht,disabled:j,children:pt()}),s.jsx(ss,{onClick:st,disabled:j,children:n(j?"Saving Album...":"Save Album")})]}),L&&s.jsx(rs,{children:s.jsxs(os,{isRTL:A,children:[s.jsx(ns,{children:n("Enter Username")}),s.jsx(as,{children:n("Username should contain only letters, numbers and hyphens. Example: john-doe2")}),s.jsx(is,{value:W,onChange:t=>H(t.target.value),isRTL:A}),S&&s.jsx(ls,{children:S}),s.jsx(ds,{disabled:q,onClick:()=>{if(!p(W)){K(n("Username must contain only letters, numbers, and hyphens."));return}O(W,je)},children:n("Select Username")}),E&&s.jsx(cs,{disabled:q,onClick:()=>ie(je),children:n("Add Random Digits to Username")})]})}),we&&s.jsx(As,{isOpen:we,onClose:gt,initialOption:I,initialPassword:Z})]}),pe.length>0&&s.jsxs(us,{children:[s.jsx(fs,{children:n("Debug Log")}),s.jsx(gs,{children:pe.map((t,r)=>s.jsx(ps,{children:t},r))})]})]})]})},Ts=()=>s.jsx(bt,{children:s.jsx(Ds,{})});mt.createRoot(document.getElementById("root")).render(s.jsx(Ts,{}));
