import{u as Oe,r as u,j as s,g as Ue,R as bt,I as Pt,b as O,a as G}from"./config-C81kv4lT.js";import{G as xt,A as St,C as vt,H as wt,B as It,a as yt,P as $t,b as jt,O as Ft,c as Ct,d as At,e as _t,f as kt,g as ee,S as Dt,h as Et,i as Tt,j as Ot,k as Ut,l as Nt,m as Rt,n as Bt,o as Mt,p as zt,M as Lt,V as qt,q as Wt,U as Vt,r as Jt,F as Gt,E as Ht,R as Kt,s as Qt,t as Yt,u as Fe,v as Ce,w as Zt,x as Xt,T as Ae,y as _e,z as ke,D as De,I as es,J as ts,K as ss,L as rs,N as os,Q as ns,W as as,X as is,Y as ls,Z as ds,_ as cs,$ as us,a0 as fs,a1 as gs,a2 as ps}from"./styled-components-BCaeVUml.js";import{b as U,g as ue}from"./utils-BMtZFOCn.js";import{d as x}from"./styled-components.browser.esm-DAVmpCtn.js";import{L as hs}from"./LogoutButton-BD-NNDV2.js";import{u as ms,s as bs,c as Ps,p as xs,a as Ss,m as vs,b as ws}from"./file-upload-utils-Pz9rjdMU.js";import"./index-DFUfgcbK.js";const Is=x.div`
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
`,ys=x.div`
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`,$s=x.div`
  font-size: 18px;
  font-weight: 500;
  color: white;
  background-color: #888;
  padding: 15px 20px;
  text-align: center;
`,js=x.div`
  direction: ${n=>n.isRTL?"rtl":"ltr"};
  padding: 30px;
`,Ee=x.p`
  margin-bottom: 15px;
  font-size: 16px;
`,Fs=x.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 25px;
  margin-top: 20px;
  box-sizing: border-box;
`,Cs=x.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
`,te=x.div`
  display: flex;
  align-items: center;
  cursor: ${n=>n.disabled?"not-allowed":"pointer"};
  opacity: ${n=>n.disabled?.7:1};
`,se=x.input`
  margin-right: 10px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  
  &:disabled {
    cursor: not-allowed;
  }
`,re=x.label`
  display: flex;
  cursor: ${n=>n.disabled?"not-allowed":"pointer"};
  font-size: 16px;
`,fe=x.span`
  color: #aaa;
  margin-left: 8px;
`,As=x.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`,Te=x.button`
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
`,_s=({isOpen:n,onClose:z,initialOption:E="noPassword",initialPassword:v=""})=>{const{t:m,language:b}=Oe(),A=Ue(b)==="rtl",[y,H]=u.useState(E),[$,L]=u.useState(v);if(u.useEffect(()=>{n&&(H(E),L(v))},[n,E,v]),!n)return null;const g=$.trim()==="",N=w=>{w!=="noPassword"&&g||H(w)},oe=w=>{w.target===w.currentTarget&&z()};return s.jsx(Is,{onClick:oe,children:s.jsxs(ys,{children:[s.jsx($s,{children:m("Album Password Policy")}),s.jsxs(js,{isRTL:A,children:[s.jsx(Ee,{children:m("Enter a password for this album.")}),s.jsx(Fs,{type:"text",placeholder:m("Enter password"),value:$,onChange:w=>L(w.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"}),s.jsx(Ee,{children:m("Select password restrictions.")}),s.jsxs(Cs,{children:[s.jsxs(te,{disabled:g,children:[s.jsx(se,{type:"radio",name:"protection",id:"notVisible",checked:y==="notVisible",onChange:()=>{},disabled:g,onClick:()=>!g&&N("notVisible")}),s.jsxs(re,{htmlFor:"notVisible",disabled:g,children:[m("Password Required To See Or Save"),g&&s.jsx(fe,{children:m("Password required")})]})]}),s.jsxs(te,{disabled:g,children:[s.jsx(se,{type:"radio",name:"protection",id:"watermark",checked:y==="watermark",onChange:()=>{},disabled:g,onClick:()=>!g&&N("watermark")}),s.jsxs(re,{htmlFor:"watermark",disabled:g,children:[m("Password Required To Remove Watermark Or Save"),g&&s.jsx(fe,{children:m("Password required")})]})]}),s.jsxs(te,{disabled:g,children:[s.jsx(se,{type:"radio",name:"protection",id:"cannotBeSaved",checked:y==="cannotBeSaved",onChange:()=>{},disabled:g,onClick:()=>!g&&N("cannotBeSaved")}),s.jsxs(re,{htmlFor:"cannotBeSaved",disabled:g,children:[m("Password Required To Save"),g&&s.jsx(fe,{children:m("Password required")})]})]}),s.jsxs(te,{disabled:!1,children:[s.jsx(se,{type:"radio",name:"protection",id:"noPassword",checked:y==="noPassword",onChange:()=>{},onClick:()=>N("noPassword")}),s.jsx(re,{htmlFor:"noPassword",disabled:!1,children:m("No Password")})]})]}),s.jsxs(As,{children:[s.jsx(Te,{onClick:()=>z(),children:m("Cancel")}),s.jsx(Te,{onClick:()=>{console.log(`Saving with option: ${y}, password: ${$.length>0?"********":"none"}`),z(y,$)},children:m("Save")})]})]})]})})};var Ne=(n=>(n.NotVisible="NotVisible",n.Watermark="Watermark",n.CannotBeSaved="CannotBeSaved",n.NoPassword="NoPassword",n))(Ne||{});const ks=`
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
`,Ds=()=>{const{t:n,language:z}=Oe(),E=Ue(z)==="rtl",[v,m]=u.useState(null),[b,A]=u.useState([]),[y,H]=u.useState([]),[$,L]=u.useState(null),[g,N]=u.useState(null),[oe,w]=u.useState(!1),[q,ne]=u.useState(""),[ge,ae]=u.useState(""),[Re,Be]=u.useState(!1),[pe,ie]=u.useState(!1),[P,he]=u.useState({totalFiles:0,filesComplete:0,filesUploading:0,filesProcessing:0,filesWithError:0,overallProgress:0}),[_,k]=u.useState(!1),[Me,K]=u.useState(0),[me,be]=u.useState(""),[Pe,xe]=u.useState(""),[ze,Q]=u.useState(!1),[Se,ve]=u.useState(!1),[I,R]=u.useState("noPassword"),[Y,Z]=u.useState(""),[W,we]=u.useState(!0),[V,Ie]=u.useState(!0),[ye,B]=u.useState(null),[le,Le]=u.useState(!1),[D,qe]=u.useState([]),X=Ps(H),We=Ss(A),e=(t,r)=>{let o=`[${new Date().toISOString()}] ${t}`;if(r!==void 0)try{const i=typeof r=="object"?JSON.stringify(r,null,2):String(r);o+=`
Data: ${i}`,console.log(o),console.log("Data object:",r)}catch(i){o+=` [Error stringifying data: ${i}]`,console.log(o),console.log("Raw data:",r)}else console.log(o);X(o)};u.useEffect(()=>{e("Component initializing"),Ve()},[]),u.useEffect(()=>{b.length>0&&(localStorage.setItem(O.SELECTED_PHOTOS,JSON.stringify(b)),e(`Saved ${b.length} photos to localStorage`))},[b]),u.useEffect(()=>{ms(b,he)},[b]);const Ve=async()=>{var t;e("Starting component initialization"),k(!1);try{e("Checking login with refresh");const r=await U();if(!r){e("No token returned from login check, aborting initialization");return}try{const a=localStorage.getItem("publicUsername");e(`Retrieved public username from localStorage: ${a||"null"}`),L(a||null);const i=JSON.parse(atob(r.split(".")[1]))["cognito:username"];if(i){e(`Extracted Cognito username from token: ${i}`),N(i);const d=localStorage.getItem(O.SUB_ALBUM_DATA);if(e(`Sub-album data from localStorage: ${d||"null"}`),d)try{const l=JSON.parse(d);if(e("Parsed sub-album data:",l),l.isSubAlbum&&((t=l.selectedFileIds)==null?void 0:t.length)>0){e(`Valid sub-album data found with ${l.selectedFileIds.length} files`),Le(!0),qe(l.selectedFileIds),Q(!0),B(!0);const c=`${i}_____${ue()}____Folder`;e(`Generated new folder ID for sub-album: ${c}`),m(c)}else e("Invalid sub-album data, proceeding with normal initialization"),await de(i)}catch(l){console.error("Error parsing sub-album data:",l),e(`Error parsing sub-album data: ${l}`),await de(i)}else e("No sub-album data found, proceeding with normal folder initialization"),await de(i)}else e("No Cognito username found in token")}catch(a){console.error("User data initialization error:",a),e(`User data initialization error: ${a}`)}Ge(),He(),e("Component initialization completed")}catch(r){console.error("Initialization error:",r),e(`Initialization error: ${r}`)}},de=async t=>{e(`Initializing folder ID with username: ${t}`);try{const a=new URLSearchParams(window.location.search).get("folderId");if(e(`Folder ID from URL: ${a||"null"}`),a){m(a),e(`Using existing folder ID: ${a}`);try{e(`Fetching details for folder: ${a}`);const o=await Je(a);if(e("Folder details retrieved:",o),o){const i=`${t}_____${t}____Account`,d=o.creatorId===i;if(e(`User is creator of folder: ${d}, accountId: ${i}, creator: ${o.creatorId}`),B(d),d){e("User is creator, showing folder details"),Q(!0),be(o.folderName),xe(o.folderDescription),we(o.isOnPublicProfile),e(`Setting isOnPublicProfile: ${o.isOnPublicProfile}`),o.participantsCanAddItems!==void 0&&(Ie(o.participantsCanAddItems),e(`Setting participantsCanAddItems: ${o.participantsCanAddItems}`));const l=o.passwordPolicy;switch(e(`Password policy from folder details: ${l}`),l){case"NoPassword":R("noPassword");break;case"NotVisible":R("notVisible"),Z(o.password);break;case"Watermark":R("watermark"),Z(o.password);break;case"CannotBeSaved":R("cannotBeSaved"),Z(o.password);break;default:R("noPassword")}e(`Set password protection option to: ${I}`)}else e("User is NOT the creator, hiding editable fields"),Q(!1)}else e("No folder details retrieved, setting isCreator to false"),B(!1)}catch(o){console.error("Error fetching folder details:",o),e(`Error fetching folder details: ${o}`),B(!1)}}else{const o=`${t}_____${ue()}____Folder`;e(`Creating new folder ID: ${o}`),m(o),e("Setting isCreator to true for new album"),B(!0),Q(!0)}}catch(r){console.error("Folder ID initialization error:",r),e(`Folder ID initialization error: ${r}`),B(!1)}},Je=async t=>{var r,a,o,i,d,l,c,f;e(`Fetching details for folder ID: ${t}`);try{const p=await U();if(!p)return e("No token available for fetching folder details"),null;e("Sending GraphQL query to fetch folder details");const h=await(await fetch(G,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${p}`},body:JSON.stringify({query:ks,variables:{folderIds:[t]}})})).json();if(e("Folder details API response:",h),h.errors)return console.error("GraphQL errors:",h.errors),e(`GraphQL errors: ${JSON.stringify(h.errors)}`),null;const j=((a=(r=h==null?void 0:h.data)==null?void 0:r.fetchFolders)==null?void 0:a.items)||[];if(e(`Found ${j.length} folder items`),j.length===0)return e("No folder items found"),null;const S=j[0];e("Retrieved folder data:",S);const F=((i=(o=S.folderPosition)==null?void 0:o.profileIds)==null?void 0:i.some(C=>C.includes("Public____Profile")))||!1;e(`Folder is on public profile: ${F}`),e("Profile IDs:",(d=S.folderPosition)==null?void 0:d.profileIds);const M=(l=S.folderInviteParameters)==null?void 0:l.usingFolderInviteGrantsRightToAddItems;return e(`Participants can add items: ${M}`),{creatorId:S.creatorId||"",folderName:S.folderName||"",folderDescription:S.folderDescription||"",passwordPolicy:((c=S.folderPassword)==null?void 0:c.policy)||"NoPassword",password:((f=S.folderPassword)==null?void 0:f.password)||"",isOnPublicProfile:F,participantsCanAddItems:M!==void 0?M:!0}}catch(p){return console.error("Error in fetchFolderDetails:",p),e(`Error in fetchFolderDetails: ${p}`),null}},Ge=()=>{e("Attempting to restore photos from localStorage");try{const t=localStorage.getItem(O.SELECTED_PHOTOS);if(e(`Found stored photos: ${t?"yes":"no"}`),t)try{const r=JSON.parse(t);e(`Parsed ${r.length} photos from localStorage`),Array.isArray(r)&&r.length>0&&(A(r),e(`Restored ${r.length} photos to state`))}catch(r){console.error("Error parsing stored photos:",r),e(`Error parsing stored photos: ${r}`)}}catch(t){console.error("Error restoring photos from storage:",t),e(`Error restoring photos from storage: ${t}`)}},He=()=>{e("Testing S3 connection");try{bs?e("S3 client is available"):(console.error("S3 client not available"),e("S3 client not available"))}catch(t){console.error("S3 connection test error:",t),e(`S3 connection test error: ${t}`)}},Ke=()=>{const t=!W;e(`Toggling isOnPublicProfile to: ${t}`),we(t)},Qe=()=>{const t=!V;e(`Toggling participantsCanAddItems to: ${t}`),Ie(t)},Ye=t=>{e(`Removing photo at index: ${t}`);const r=b.filter((a,o)=>o!==t);A(r),e(`New photos count: ${r.length}`),r.length>0?(localStorage.setItem(O.SELECTED_PHOTOS,JSON.stringify(r)),e(`Updated localStorage with ${r.length} photos`)):(localStorage.removeItem(O.SELECTED_PHOTOS),e("Removed photos from localStorage"))},Ze=async t=>{if(e("Add photos triggered from file input"),!g){e("No Cognito username available, cannot add photos");return}const r=Array.from(t.target.files||[]);if(e(`Selected ${r.length} files`),!!r.length)try{const a=Xe(r);e(`Created ${a.length} initial photo objects`),A(d=>[...d,...a]);const o=b.length;e(`Starting processing at index: ${o}`);const i=await xs(r,g,(d,l,c,f)=>{We(o+d,l,c,f),e(`Updated status for photo ${o+d}: ${l}, progress: ${c}`)},X);e(`Updating ${i.length} photos with processed info`),et(o,i)}catch(a){console.error("Error in handleAddPhotos:",a),e(`Error in handleAddPhotos: ${a}`)}finally{t.target.value="",e("Reset file input value")}},Xe=t=>(e(`Creating initial photo objects for ${t.length} files`),t.map(r=>{const a=r.type,o=r.name.split(".").pop()||"jpg",i=`${ue()}.${o}`;return e(`Created initial photo object: ${i}, type: ${a}, size: ${r.size}`),{fileName:i,s3PreviewUrl:URL.createObjectURL(r),type:a,size:r.size,status:"pending",progress:0}})),et=(t,r)=>{e(`Updating photos with processed info, starting at index ${t}`),A(a=>{const o=[...a];return r.forEach((i,d)=>{const l=t+d;l<o.length&&(e(`Updating photo at index ${l} with processed info`),o[l]=i)}),o})},tt=async()=>{e("Album save initiated"),k(!0);try{if($!=null&&$.startsWith("Profile-")){e("Public username starts with 'Profile-', showing username prompt"),ne($),w(!0),k(!1);return}e("Valid username found, proceeding to save album directly"),$e()}catch(t){console.error("Error in handleSaveAlbum:",t),e(`Error in handleSaveAlbum: ${t}`),k(!1)}},st=(t,r)=>{e(`Splitting array of ${t.length} items into chunks of ${r}`);const a=[];for(let o=0;o<t.length;o+=r)a.push(t.slice(o,o+r));return e(`Created ${a.length} chunks`),a},$e=async()=>{e("Starting direct album save"),k(!0),K(5);try{if(e("Validating required data for save"),!await it()){e("Required data validation failed, aborting save"),k(!1);return}const t=Math.floor(Date.now()/1e3),r=`${g}_____${g}____Account`,o=v.split("_____")[1].split("____")[0];e(`Save timestamp: ${t}`),e(`Account ID: ${r}`),e(`Folder ID: ${v}`),e(`Folder target item identifier: ${o}`),e("Creating folder position input");const i=lt(t,r,o);e("Folder position input created:",i);let d=[];const l=b.filter(c=>c.status==="complete");if(e(`Found ${l.length} valid photos with 'complete' status`),l.length>0){e("Moving files from temp to public folder"),await vs(l,ce,X),e("Creating file reference inputs for new uploads");const c=dt(l,t,r);e(`Created ${c.length} file reference inputs for new uploads`,c),d=d.concat(c)}if(le&&D.length>0){e(`Adding ${D.length} existing file references for sub-album`);const c=D.map(f=>(e(`Creating file reference for existing file ID: ${f}`),{fileReferencesHolderId:v,currentTime:t,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:f,fileInput:null}));e(`Created ${c.length} file reference inputs for existing files`,c),d=d.concat(c)}e(`Total file reference inputs: ${d.length}`),e("Sending GraphQL mutations with chunked file references"),await rt(i,d)}catch(t){console.error("Error in saveAlbumDirectly:",t),e(`Error in saveAlbumDirectly: ${t}`),k(!1)}},rt=async(t,r)=>{e("Starting chunked save process");try{J("Processing files in chunks...");const a=48;if(r.length===0)e("No file references to process, saving only folder position"),await ot(t);else{const o=st(r,a);e(`Split file references into ${o.length} chunks of max size ${a}`);for(let i=0;i<o.length;i++){const d=o[i];e(`Processing chunk ${i+1} of ${o.length} with ${d.length} file references`);const l=i/o.length*80;K(10+l),ce(10+l),i<o.length-1?(J(`Saving files: chunk ${i+1} of ${o.length}...`),await nt(d)):(J("Finalizing album..."),await at(d,t))}}K(100),ce(100),J("Album saved successfully!"),ct()}catch(a){console.error("Error in chunked save process:",a),e(`Error in chunked save process: ${a}`),J(`Error: ${a}`),k(!1)}},J=t=>{e(`Save progress text: ${t}`);const r=document.getElementById("saveProgressText");r&&(r.innerText=n(t))},ot=async t=>{var i,d;e("Sending folder-only mutation (no file references)");const r=await U();if(!r)throw e("No token available for saving album, aborting"),new Error("Authentication token not available");const a=`
      mutation MyMutation($folderPositionInputs: [FolderPositionInput!]) {
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items {
            id
          }
        }
      }
    `,o={folderPositionInputs:[t]};e("GraphQL folder-only mutation variables:",o);try{e("Sending API request to save folder");const l=await fetch(G,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({query:a,variables:o})});e(`API response status: ${l.status}`);const c=await l.text();e(`API response raw text: ${c}`);const f=JSON.parse(c);if(e("API response JSON:",f),f.errors)throw console.error("Folder save failed:",f.errors),e("Folder save failed with errors:",f.errors),new Error("Failed to save folder");return e("Folder saved successfully"),((d=(i=f.data)==null?void 0:i.changeFiles)==null?void 0:d.items)||[]}catch(l){throw console.error("Error in sendFolderOnlyMutation:",l),e(`Error in sendFolderOnlyMutation: ${l}`),l}},nt=async t=>{var i,d,l,c,f;e(`Sending file references-only mutation with ${t.length} items`);const r=await U();if(!r)throw e("No token available for saving file references, aborting"),new Error("Authentication token not available");const a=`
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
    `,o={updatedFileReferenceInputs:t};e("GraphQL file references-only mutation variables (first item):",t.length>0?t[0]:"No items");try{e("Sending API request to save file references");const p=await fetch(G,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({query:a,variables:o})});e(`API response status: ${p.status}`);const T=await p.text();e(`API response raw text: ${T.substring(0,500)}...`);const h=JSON.parse(T);if(e("API response JSON items count:",((l=(d=(i=h.data)==null?void 0:i.changeFiles0)==null?void 0:d.items)==null?void 0:l.length)||0),h.errors)throw console.error("File references save failed:",h.errors),e("File references save failed with errors:",h.errors),new Error("Failed to save file references");return e("File references chunk saved successfully"),((f=(c=h.data)==null?void 0:c.changeFiles0)==null?void 0:f.items)||[]}catch(p){throw console.error("Error in sendFileReferencesOnlyMutation:",p),e(`Error in sendFileReferencesOnlyMutation: ${p}`),p}},at=async(t,r)=>{var d,l,c,f,p,T,h,j,S;e(`Sending final chunk with folder mutation (${t.length} file references)`);const a=await U();if(!a)throw e("No token available for saving final chunk, aborting"),new Error("Authentication token not available");const o=`
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
    `,i={folderPositionInputs:[r],updatedFileReferenceInputs:t};e("GraphQL final mutation variables (folder + last chunk)");try{e("Sending API request for final save with folder");const F=await fetch(G,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({query:o,variables:i})});e(`API response status: ${F.status}`);const M=await F.text();e(`API response raw text: ${M.substring(0,500)}...`);const C=JSON.parse(M);if(e("API response JSON:",{fileReferencesCount:((c=(l=(d=C.data)==null?void 0:d.changeFiles0)==null?void 0:l.items)==null?void 0:c.length)||0,folderItems:((p=(f=C.data)==null?void 0:f.changeFiles)==null?void 0:p.items)||[]}),C.errors)throw console.error("Final save failed:",C.errors),e("Final save failed with errors:",C.errors),new Error("Failed to complete album save");return e("Final chunk and folder saved successfully"),{fileReferences:((h=(T=C.data)==null?void 0:T.changeFiles0)==null?void 0:h.items)||[],folderPositions:((S=(j=C.data)==null?void 0:j.changeFiles)==null?void 0:S.items)||[]}}catch(F){throw console.error("Error in sendFinalChunkWithFolderMutation:",F),e(`Error in sendFinalChunkWithFolderMutation: ${F}`),F}},it=async()=>(e("Validating required data"),await U()?g?v?(e("All required data validated successfully"),!0):(e("No folder ID, validation failed"),!1):(e("No Cognito username, validation failed"),!1):(e("No token available, validation failed"),!1)),ce=t=>{const r=document.getElementById("saveProgress");r?(r.style.width=`${t}%`,e(`Updated save progress bar: ${t}%`)):e("Progress bar element not found"),K(t)},lt=(t,r,a,o)=>{e("Creating folder position input"),e(`Profile visibility: ${W?"Public":"Only Me"}`);const i=W?[`${g}_____Public____Profile`]:["Only Me_____Only Me____Profile"];e(`Profile IDs: ${JSON.stringify(i)}`);let d=[];le&&D.length>0&&(e(`Creating file reference IDs for ${D.length} sub-album files`),d=D.map(f=>{const p=f.split("_____");if(p.length>=2){const h=p[1].split("____")[0],j=`${a}_____${h}____FileReference`;return e(`Created file reference ID for sub-album: ${j}`),j}return e(`Using original fileId as fallback: ${f}`),f})),e(`Created ${d.length} acceptedFileReferenceIds`);const l=I!=="noPassword"?Y:null,c=Ne[I.charAt(0).toUpperCase()+I.slice(1)];return e(`Password protection: ${I}`),e(`Password policy: ${c}`),e(`Album password: ${l?"******":"null"}`),e(`Participants can add items: ${V}`),{currentTime:t,folderId:v,profileIds:i,folderPositionSelectedTagInputs:[],folderPositionPoints:1,acceptedFileReferenceIds:d,hiddenFileReferenceIds:[],folderInput:{folderSelectedTagInputs:[],folderAboutContactIds:[r],folderName:me,folderDescription:Pe,folderPasswordInput:{password:l,policy:c},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,usingFolderInviteGrantsRightToRemoveItems:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:V,addedItemsNeedFolderCreatorApproval:!1}}}},dt=(t,r,a)=>(e(`Creating file reference inputs for ${t.length} photos`),t.map(o=>{var l;const i=o.type==="video"||(l=o.type)!=null&&l.startsWith("video")?`Input/Video/${o.fileName}`:`Input/Image/${o.fileName}`,d=`${g}_____${o.fileName}____File`;return e(`Created file reference for ${o.fileName}:`),e(`  - dataKey: ${i}`),e(`  - fileId: ${d}`),e(`  - thumbnailDataKey: ${o.thumbnailDataKey||"undefined"}`),e(`  - size: ${o.size}`),e(`  - thumbnailSize: ${o.thumbnailSize||0}`),e(`  - duration: ${o.duration||"undefined"}`),{fileReferencesHolderId:v,currentTime:r,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:d,fileInput:{fileId:d,ownerFileInput:{editorContactIds:[a],FileSharingOptionsEnum:"Anyone",dataKey:i,thumbnailDataKey:o.thumbnailDataKey,dataInBytes:o.size,thumbnailDataInBytes:o.thumbnailSize||0,s3UploadedAt:r,durationInSeconds:o.duration},editorFileInput:{aboutContactIds:[a],captionText:"",numericFilterInputs:[]}}}})),ct=()=>{e("Handling successful save"),ws(A,he,[O.SELECTED_PHOTOS,O.SUB_ALBUM_DATA],X),e("Album data cleared");const t=document.getElementById("saveProgressText");t&&(t.innerText=n("Album saved successfully!"),e("Updated progress text to 'Album saved successfully!'")),sessionStorage.setItem("album_just_saved","true"),e("Set 'album_just_saved' flag in sessionStorage"),e("Setting timeout for redirect to my-albums.html"),setTimeout(()=>{e("Redirecting to my-albums.html"),window.location.href="/my-albums.html"},1e3)},ut=t=>{const r=/^[a-zA-Z0-9-]+$/.test(t);return e(`Username validation for '${t}': ${r}`),r},je=async t=>{var i,d;e(`Submitting username: ${t}`),ie(!0),ae("");const r=await U();if(!r){e("No token available for username submission"),ie(!1);return}const a=`
      mutation MyMutation($savePublicProfileDisplayNameInput: SavePublicProfileDisplayNameInput) {
        changeMyAccountItem(savePublicProfileDisplayNameInput: $savePublicProfileDisplayNameInput) {
          ... on Profile {
            anyDisplayName
          }
        }
      }
    `,o={savePublicProfileDisplayNameInput:{anyDisplayName:t}};e("Username mutation variables:",o);try{e("Sending API request to save username");const c=await(await fetch(G,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({query:a,variables:o})})).json();e("Username API response:",c);const f=(d=(i=c==null?void 0:c.data)==null?void 0:i.changeMyAccountItem)==null?void 0:d.anyDisplayName;if(f)e(`Username successfully changed to: ${f}`),ft(f);else throw e("Username change failed - likely already taken"),new Error("Username taken")}catch(l){e(`Error submitting username: ${l}`),ae(n("Username is already taken. Please try a different one.")),Be(!0),ie(!1)}},ft=t=>{e(`Handling successful username update to: ${t}`),localStorage.setItem("publicUsername",t),L(t),w(!1),e("Proceeding to save album after username update"),$e()},gt=()=>{const t=Math.floor(1e5+Math.random()*9e5).toString(),r=`${q}${t}`;e(`Appending random digits to username: ${q} -> ${r}`),ne(r),je(r)},pt=(t,r)=>{e(`Password dialog closed with option: ${t}, password: ${r?"******":"undefined"}`),t&&R(t),r!==void 0&&Z(r),ve(!1)},ht=()=>I==="noPassword"?n("Album Password Policy"):`${n(I==="notVisible"?"Not Visible":I==="watermark"?"Watermark":"Cannot Be Saved")} ${Y?`(${Y})`:""}`,mt=()=>{e("Opening password dialog"),ve(!0)};return s.jsxs(s.Fragment,{children:[s.jsx(xt,{}),s.jsxs(St,{isRTL:E,children:[s.jsxs(vt,{children:[s.jsxs(wt,{children:[s.jsx(It,{children:s.jsx(yt,{href:"/my-albums.html",children:n("My Albums")})}),s.jsx(hs,{t:n})]}),P.totalFiles>0&&s.jsxs($t,{children:[s.jsx(jt,{children:n("Upload Progress")}),s.jsxs(Ft,{children:[s.jsxs(Ct,{children:[s.jsxs("span",{children:[n("Overall Progress"),": ",Math.round(P.overallProgress*100),"%"]}),s.jsxs("span",{children:[P.filesComplete," ",n("of")," ",P.totalFiles," ",n("complete")]})]}),s.jsx(At,{children:s.jsx(_t,{progress:P.overallProgress})})]}),s.jsxs(kt,{children:[P.filesUploading>0&&s.jsxs(ee,{children:[n("Uploading"),": ",P.filesUploading]}),P.filesProcessing>0&&s.jsxs(ee,{children:[n("Processing"),": ",P.filesProcessing]}),P.filesComplete>0&&s.jsxs(ee,{children:[n("Complete"),": ",P.filesComplete]}),P.filesWithError>0&&s.jsxs(ee,{isError:!0,children:[n("Failed"),": ",P.filesWithError]})]})]}),_&&s.jsxs(Dt,{children:[s.jsx(Et,{children:n("Saving Album")}),s.jsx(Tt,{id:"saveProgressText",children:n("Moving files...")}),s.jsx(Ot,{children:s.jsx(Ut,{id:"saveProgress",style:{width:`${Me}%`}})})]}),s.jsx(Nt,{id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:Ze}),le&&D.length>0&&s.jsxs("div",{style:{backgroundColor:"#e3f2fd",padding:"15px",borderRadius:"8px",marginBottom:"20px",fontSize:"16px"},children:[s.jsxs("p",{style:{margin:0},children:[n("Creating a new sub-album with")," ",s.jsx("strong",{children:D.length})," ",n("selected items")]}),s.jsx("p",{style:{margin:"10px 0 0 0",fontSize:"14px",color:"#0277bd"},children:n("You can add more photos or videos to this sub-album before saving")})]}),b.length>0&&s.jsxs(s.Fragment,{children:[s.jsxs(Rt,{children:[b.length," ",b.length>1?n("photos selected"):n("photo selected"),":"]}),s.jsx(Bt,{children:b.map((t,r)=>{var a,o;return s.jsxs(Mt,{children:[s.jsx(zt,{status:t.status,children:t.status==="complete"?"✓":t.status==="error"?"✕":t.status==="uploading"?"↑":t.status==="processing"?"⚙️":"•"}),s.jsxs(Lt,{children:[t.type==="video"||(a=t.type)!=null&&a.startsWith("video")?s.jsx(qt,{src:t.s3PreviewUrl,controls:!0}):s.jsx(Wt,{src:t.s3PreviewUrl,alt:t.fileName}),(t.status==="uploading"||t.status==="processing")&&s.jsx(Vt,{children:s.jsx(Jt,{progress:t.progress,status:t.status})})]}),s.jsxs(Gt,{children:[(o=t.type)!=null&&o.startsWith("video")?n("Video"):n("Image"),t.size&&` • ${(t.size/1024/1024).toFixed(1)} MB`,t.duration&&` • ${t.duration}s`]}),t.status==="error"&&t.errorMessage&&s.jsxs(Ht,{children:[n("Error"),": ",t.errorMessage.length>40?t.errorMessage.substring(0,37)+"...":t.errorMessage]}),s.jsx(Kt,{onClick:()=>Ye(r),disabled:_,children:n("Remove")})]},r)})})]}),s.jsxs(Qt,{children:[ze&&ye===!0&&s.jsxs(Yt,{children:[s.jsxs(Fe,{children:[s.jsx(Ce,{htmlFor:"folderName",children:n("Album Name (Optional)")}),s.jsx(Zt,{id:"folderName",type:"text",value:me,onChange:t=>be(t.target.value),placeholder:n("Enter album name")})]}),s.jsxs(Fe,{children:[s.jsx(Ce,{htmlFor:"folderDescription",children:n("Album Description (Optional)")}),s.jsx(Xt,{id:"folderDescription",value:Pe,onChange:t=>xe(t.target.value),placeholder:n("Enter album description"),rows:4})]}),s.jsxs(Ae,{children:[s.jsx(_e,{children:n(W?"On Public Profile":"Not On Public Profile")}),s.jsxs(ke,{children:[s.jsx("input",{type:"checkbox",checked:W,onChange:Ke,disabled:_}),s.jsx(De,{})]})]}),s.jsxs(Ae,{children:[s.jsx(_e,{children:n(V?"Participants Can Add Items":"Participants Cannot Add Items")}),s.jsxs(ke,{children:[s.jsx("input",{type:"checkbox",checked:V,onChange:Qe,disabled:_}),s.jsx(De,{})]})]})]}),s.jsx(es,{onClick:()=>{const t=document.getElementById("file-input");t==null||t.click()},disabled:_,children:n("Add More Photos")}),ye===!0&&s.jsx(ts,{passwordSet:I!=="noPassword",onClick:mt,disabled:_,children:ht()}),s.jsx(ss,{onClick:tt,disabled:_,children:n(_?"Saving Album...":"Save Album")})]}),oe&&s.jsx(rs,{children:s.jsxs(os,{isRTL:E,children:[s.jsx(ns,{children:n("Enter Username")}),s.jsx(as,{children:n("Username should contain only letters, numbers and hyphens. Example: john-doe2")}),s.jsx(is,{value:q,onChange:t=>ne(t.target.value),isRTL:E}),ge&&s.jsx(ls,{children:ge}),s.jsx(ds,{disabled:pe,onClick:()=>{if(!ut(q)){ae(n("Username must contain only letters, numbers, and hyphens."));return}je(q)},children:n("Select Username")}),Re&&s.jsx(cs,{disabled:pe,onClick:gt,children:n("Add Random Digits to Username")})]})}),Se&&s.jsx(_s,{isOpen:Se,onClose:pt,initialOption:I,initialPassword:Y})]}),y.length>0&&s.jsxs(us,{children:[s.jsx(fs,{children:n("Debug Log")}),s.jsx(gs,{children:y.map((t,r)=>s.jsx(ps,{children:t},r))})]})]})]})},Es=()=>s.jsx(Pt,{children:s.jsx(Ds,{})});bt.createRoot(document.getElementById("root")).render(s.jsx(Es,{}));
