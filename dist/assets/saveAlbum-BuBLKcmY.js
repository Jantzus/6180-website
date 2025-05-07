import{u as Fe,r as u,j as o,g as De,R as gt,I as ft,b as D,a as ne}from"./config-C81kv4lT.js";import{f as mt,d as i,l as ht}from"./styled-components.browser.esm-DAVmpCtn.js";import{b as L,g as ie}from"./utils-BvimWbmh.js";import{L as bt}from"./LogoutButton-BD-NNDV2.js";import{u as xt,s as wt,c as vt,p as Pt,a as St,m as yt,b as It}from"./file-upload-utils-CwNVKzun.js";import"./index-DFUfgcbK.js";const $t=mt`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }
`,Te=r=>ht`
  direction: ${r?"rtl":"ltr"};
`,jt=i.div`
  padding: 40px 20px;
  background-color: #f9fafb;
  min-height: 100vh;
  ${r=>Te(r.isRTL)}
`,Ct=i.div`
  max-width: 900px;
  margin: 0 auto;
`,_t=i.div`
  margin-bottom: 20px;
`,At=i.div`
  margin-bottom: 12px;
`,kt=i.a`
  font-size: 16px;
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
`,Ft=i.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,Dt=i.div`
  font-size: 16px;
  color: #666;
`,Tt=i.div`
  margin-bottom: 24px;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,Ut=i.h3`
  font-size: 18px;
  margin: 0 0 12px 0;
`,Et=i.div`
  margin-bottom: 12px;
`,zt=i.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 6px;
`,Nt=i.div`
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`,Ot=i.div`
  height: 100%;
  background-color: #4caf50;
  border-radius: 4px;
  transition: width 0.3s ease;
  width: ${r=>r.progress*100}%;
`,Rt=i.div`
  display: flex;
  gap: 12px;
  font-size: 14px;
  color: #666;
`,J=i.div`
  color: ${r=>r.isError?"#e53935":"inherit"};
`,Bt=i.div`
  margin-bottom: 24px;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,Mt=i.h3`
  font-size: 18px;
  margin: 0 0 12px 0;
`,Lt=i.div`
  font-size: 14px;
  margin-bottom: 8px;
`,Vt=i.div`
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`,qt=i.div`
  height: 100%;
  background-color: #2196f3;
  border-radius: 4px;
  transition: width 0.3s ease;
`,Wt=i.p`
  font-size: 16px;
  margin-bottom: 16px;
  color: #333;
`,Gt=i.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 32px;
`,Ht=i.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.03);
  width: 160px;
  position: relative;
`,Jt=i.div`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: white;
  z-index: 1;
  background-color: ${r=>{switch(r.status){case"complete":return"#4caf50";case"error":return"#e53935";case"uploading":return"#2196f3";case"processing":return"#ff9800";default:return"#9e9e9e"}}};
`,Kt=i.div`
  position: relative;
  margin-bottom: 8px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`,Qt=i.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 6px;
`,Yt=i.video`
  max-width: 100%;
  max-height: 100%;
  border-radius: 6px;
`,Xt=i.div`
  position: absolute;
  bottom: 4px;
  left: 4px;
  right: 4px;
  height: 4px;
  background-color: rgba(0,0,0,0.2);
  border-radius: 2px;
  overflow: hidden;
`,Zt=i.div`
  height: 100%;
  background-color: ${r=>r.status==="processing"?"#ff9800":"#2196f3"};
  transition: width 0.3s ease;
  width: ${r=>r.progress*100}%;
`,eo=i.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 6px;
`,to=i.div`
  font-size: 12px;
  color: #e53935;
  margin-bottom: 6px;
`,oo=i.button`
  background-color: #e53935;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 8px;
  font-size: 12px;
  cursor: ${r=>r.disabled?"not-allowed":"pointer"};
  margin-top: auto;
  opacity: ${r=>r.disabled?.6:1};
`,ro=i.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`,Ue=i.button`
  padding: 14px 28px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  cursor: ${r=>r.disabled?"not-allowed":"pointer"};
  opacity: ${r=>r.disabled?.6:1};
`,so=i(Ue)`
  background-color: #007bff;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
`,Ee=i(Ue)`
  background-color: #8c8c8c;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
`,no=i(Ee)`
  color: ${r=>r.passwordSet?"#000000":"white"};
  font-weight: ${r=>r.passwordSet?"bold":"normal"};
`,io=i.div`
  margin-top: 12px;
  margin-bottom: 12px;
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,ye=i.div`
  margin-bottom: 16px;
`,Ie=i.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
`,ao=i.input`
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-sizing: border-box;
`,lo=i.textarea`
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  resize: vertical;
`,co=i.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`,po=i.div`
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  ${r=>Te(r.isRTL)}
`,uo=i.p`
  font-size: 16px;
  margin-bottom: 12px;
`,go=i.p`
  font-size: 14px;
  margin-bottom: 16px;
  color: #666;
`,fo=i.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
  text-align: ${r=>r.isRTL?"right":"left"};
`,mo=i.div`
  color: #e53935;
  margin-bottom: 12px;
`,ho=i.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: ${r=>r.disabled?"not-allowed":"pointer"};
  margin-bottom: 10px;
  opacity: ${r=>r.disabled?.6:1};
`,bo=i.button`
  width: 100%;
  padding: 12px;
  background-color: #6c757d;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: ${r=>r.disabled?"not-allowed":"pointer"};
  opacity: ${r=>r.disabled?.6:1};
`,xo=i.div`
  margin-top: 24px;
  padding: 16px;
  background-color: #f0f0f0;
  border-radius: 8px;
`,wo=i.h3`
  margin: 0 0 12px 0;
  font-size: 16px;
`,vo=i.pre`
  margin: 0;
  font-size: 12px;
  white-space: pre-wrap;
  max-height: 200px;
  overflow-y: auto;
`,Po=i.div`
  margin-bottom: 4px;
`,So=i.input`
  display: none;
`,$e=i.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 4px 0;
  gap: 15px; /* Small gap for consistent spacing */
`,je=i.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  line-height: 24px; /* Added line-height to better align with taller toggle */
`,Ce=i.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px; /* Increased from 20px to 24px */
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
    
    &:checked + span {
      background-color: #007bff;
    }
    
    &:focus + span {
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
    
    &:checked + span:before {
      transform: translateX(16px); /* Adjusted for new dimensions */
    }
    
    &:disabled + span {
      background-color: #e6e6e6;
      cursor: not-allowed;
    }
  }
`,_e=i.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e0e0e0;
  transition: .2s;
  border-radius: 24px; /* Updated to match height */
  
  &:before {
    position: absolute;
    content: "";
    height: 20px; /* Increased from 16px to 20px */
    width: 20px; /* Increased from 16px to 20px */
    left: 2px;
    top: 2px;
    background-color: white;
    transition: .2s;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`,yo=i.div`
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
`,Io=i.div`
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`,$o=i.div`
  font-size: 18px;
  font-weight: 500;
  color: white;
  background-color: #888;
  padding: 15px 20px;
  text-align: center;
`,jo=i.div`
  direction: ${r=>r.isRTL?"rtl":"ltr"};
  padding: 30px;
`,Ae=i.p`
  margin-bottom: 15px;
  font-size: 16px;
`,Co=i.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 25px;
  margin-top: 20px;
  box-sizing: border-box;
`,_o=i.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
`,K=i.div`
  display: flex;
  align-items: center;
  cursor: ${r=>r.disabled?"not-allowed":"pointer"};
  opacity: ${r=>r.disabled?.7:1};
`,Q=i.input`
  margin-right: 10px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  
  &:disabled {
    cursor: not-allowed;
  }
`,Y=i.label`
  display: flex;
  cursor: ${r=>r.disabled?"not-allowed":"pointer"};
  font-size: 16px;
`,ae=i.span`
  color: #aaa;
  margin-left: 8px;
`,Ao=i.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`,ke=i.button`
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
`,ko=({isOpen:r,onClose:N,initialOption:F="noPassword",initialPassword:v=""})=>{const{t:m,language:h}=Fe(),C=De(h)==="rtl",[I,V]=u.useState(F),[x,O]=u.useState(v);if(u.useEffect(()=>{r&&(V(F),O(v))},[r,F,v]),!r)return null;const g=x.trim()==="",T=P=>{P!=="noPassword"&&g||V(P)},X=P=>{P.target===P.currentTarget&&N()};return o.jsx(yo,{onClick:X,children:o.jsxs(Io,{children:[o.jsx($o,{children:m("Album Password Policy")}),o.jsxs(jo,{isRTL:C,children:[o.jsx(Ae,{children:m("Enter a password for this album.")}),o.jsx(Co,{type:"text",placeholder:m("Enter password"),value:x,onChange:P=>O(P.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"}),o.jsx(Ae,{children:m("Select password restrictions.")}),o.jsxs(_o,{children:[o.jsxs(K,{disabled:g,children:[o.jsx(Q,{type:"radio",name:"protection",id:"notVisible",checked:I==="notVisible",onChange:()=>{},disabled:g,onClick:()=>!g&&T("notVisible")}),o.jsxs(Y,{htmlFor:"notVisible",disabled:g,children:[m("Password Required To See Or Save"),g&&o.jsx(ae,{children:m("Password required")})]})]}),o.jsxs(K,{disabled:g,children:[o.jsx(Q,{type:"radio",name:"protection",id:"watermark",checked:I==="watermark",onChange:()=>{},disabled:g,onClick:()=>!g&&T("watermark")}),o.jsxs(Y,{htmlFor:"watermark",disabled:g,children:[m("Password Required To Remove Watermark Or Save"),g&&o.jsx(ae,{children:m("Password required")})]})]}),o.jsxs(K,{disabled:g,children:[o.jsx(Q,{type:"radio",name:"protection",id:"cannotBeSaved",checked:I==="cannotBeSaved",onChange:()=>{},disabled:g,onClick:()=>!g&&T("cannotBeSaved")}),o.jsxs(Y,{htmlFor:"cannotBeSaved",disabled:g,children:[m("Password Required To Save"),g&&o.jsx(ae,{children:m("Password required")})]})]}),o.jsxs(K,{disabled:!1,children:[o.jsx(Q,{type:"radio",name:"protection",id:"noPassword",checked:I==="noPassword",onChange:()=>{},onClick:()=>T("noPassword")}),o.jsx(Y,{htmlFor:"noPassword",disabled:!1,children:m("No Password")})]})]}),o.jsxs(Ao,{children:[o.jsx(ke,{onClick:()=>N(),children:m("Cancel")}),o.jsx(ke,{onClick:()=>{console.log(`Saving with option: ${I}, password: ${x.length>0?"********":"none"}`),N(I,x)},children:m("Save")})]})]})]})})};var ze=(r=>(r.NotVisible="NotVisible",r.Watermark="Watermark",r.CannotBeSaved="CannotBeSaved",r.NoPassword="NoPassword",r))(ze||{});const Fo=`
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
`,Do=()=>{const{t:r,language:N}=Fe(),F=De(N)==="rtl",[v,m]=u.useState(null),[h,C]=u.useState([]),[I,V]=u.useState([]),[x,O]=u.useState(null),[g,T]=u.useState(null),[X,P]=u.useState(!1),[R,Z]=u.useState(""),[le,ee]=u.useState(""),[Ne,Oe]=u.useState(!1),[de,te]=u.useState(!1),[b,ce]=u.useState({totalFiles:0,filesComplete:0,filesUploading:0,filesProcessing:0,filesWithError:0,overallProgress:0}),[_,S]=u.useState(!1),[pe,ue]=u.useState(""),[ge,fe]=u.useState(""),[Re,q]=u.useState(!1),[me,he]=u.useState(!1),[y,U]=u.useState("noPassword"),[W,G]=u.useState(""),[B,be]=u.useState(!0),[M,xe]=u.useState(!0),[we,E]=u.useState(null),[oe,Be]=u.useState(!1),[A,Me]=u.useState([]),H=vt(V),Le=St(C),e=(t,s)=>{let n=`[${new Date().toISOString()}] ${t}`;if(s!==void 0)try{const l=typeof s=="object"?JSON.stringify(s,null,2):String(s);n+=`
Data: ${l}`,console.log(n),console.log("Data object:",s)}catch(l){n+=` [Error stringifying data: ${l}]`,console.log(n),console.log("Raw data:",s)}else console.log(n);H(n)};u.useEffect(()=>{e("Component initializing"),Ve()},[]),u.useEffect(()=>{h.length>0&&(localStorage.setItem(D.SELECTED_PHOTOS,JSON.stringify(h)),e(`Saved ${h.length} photos to localStorage`))},[h]),u.useEffect(()=>{xt(h,ce)},[h]);const Ve=async()=>{var t;e("Starting component initialization"),S(!1);try{e("Checking login with refresh");const s=await L();if(!s){e("No token returned from login check, aborting initialization");return}try{const a=localStorage.getItem("publicUsername");e(`Retrieved public username from localStorage: ${a||"null"}`),O(a||null);const l=JSON.parse(atob(s.split(".")[1]))["cognito:username"];if(l){e(`Extracted Cognito username from token: ${l}`),T(l);const d=localStorage.getItem(D.SUB_ALBUM_DATA);if(e(`Sub-album data from localStorage: ${d||"null"}`),d)try{const c=JSON.parse(d);if(e("Parsed sub-album data:",c),c.isSubAlbum&&((t=c.selectedFileIds)==null?void 0:t.length)>0){e(`Valid sub-album data found with ${c.selectedFileIds.length} files`),Be(!0),Me(c.selectedFileIds),q(!0),E(!0);const p=`${l}_____${ie()}____Folder`;e(`Generated new folder ID for sub-album: ${p}`),m(p)}else e("Invalid sub-album data, proceeding with normal initialization"),await re(l)}catch(c){console.error("Error parsing sub-album data:",c),e(`Error parsing sub-album data: ${c}`),await re(l)}else e("No sub-album data found, proceeding with normal folder initialization"),await re(l)}else e("No Cognito username found in token")}catch(a){console.error("User data initialization error:",a),e(`User data initialization error: ${a}`)}We(),Ge(),e("Component initialization completed")}catch(s){console.error("Initialization error:",s),e(`Initialization error: ${s}`)}},re=async t=>{e(`Initializing folder ID with username: ${t}`);try{const a=new URLSearchParams(window.location.search).get("folderId");if(e(`Folder ID from URL: ${a||"null"}`),a){m(a),e(`Using existing folder ID: ${a}`);try{e(`Fetching details for folder: ${a}`);const n=await qe(a);if(e("Folder details retrieved:",n),n){const l=`${t}_____${t}____Account`,d=n.creatorId===l;if(e(`User is creator of folder: ${d}, accountId: ${l}, creator: ${n.creatorId}`),E(d),d){e("User is creator, showing folder details"),q(!0),ue(n.folderName),fe(n.folderDescription),be(n.isOnPublicProfile),e(`Setting isOnPublicProfile: ${n.isOnPublicProfile}`),n.participantsCanAddItems!==void 0&&(xe(n.participantsCanAddItems),e(`Setting participantsCanAddItems: ${n.participantsCanAddItems}`));const c=n.passwordPolicy;switch(e(`Password policy from folder details: ${c}`),c){case"NoPassword":U("noPassword");break;case"NotVisible":U("notVisible"),G(n.password);break;case"Watermark":U("watermark"),G(n.password);break;case"CannotBeSaved":U("cannotBeSaved"),G(n.password);break;default:U("noPassword")}e(`Set password protection option to: ${y}`)}else e("User is NOT the creator, hiding editable fields"),q(!1)}else e("No folder details retrieved, setting isCreator to false"),E(!1)}catch(n){console.error("Error fetching folder details:",n),e(`Error fetching folder details: ${n}`),E(!1)}}else{const n=`${t}_____${ie()}____Folder`;e(`Creating new folder ID: ${n}`),m(n),e("Setting isCreator to true for new album"),E(!0),q(!0)}}catch(s){console.error("Folder ID initialization error:",s),e(`Folder ID initialization error: ${s}`),E(!1)}},qe=async t=>{var s,a,n,l,d,c,p,f;e(`Fetching details for folder ID: ${t}`);try{const w=await L();if(!w)return e("No token available for fetching folder details"),null;e("Sending GraphQL query to fetch folder details");const $=await(await fetch(ne,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${w}`},body:JSON.stringify({query:Fo,variables:{folderIds:[t]}})})).json();if(e("Folder details API response:",$),$.errors)return console.error("GraphQL errors:",$.errors),e(`GraphQL errors: ${JSON.stringify($.errors)}`),null;const z=((a=(s=$==null?void 0:$.data)==null?void 0:s.fetchFolders)==null?void 0:a.items)||[];if(e(`Found ${z.length} folder items`),z.length===0)return e("No folder items found"),null;const j=z[0];e("Retrieved folder data:",j);const Se=((l=(n=j.folderPosition)==null?void 0:n.profileIds)==null?void 0:l.some(ut=>ut.includes("Public____Profile")))||!1;e(`Folder is on public profile: ${Se}`),e("Profile IDs:",(d=j.folderPosition)==null?void 0:d.profileIds);const se=(c=j.folderInviteParameters)==null?void 0:c.usingFolderInviteGrantsRightToAddItems;return e(`Participants can add items: ${se}`),{creatorId:j.creatorId||"",folderName:j.folderName||"",folderDescription:j.folderDescription||"",passwordPolicy:((p=j.folderPassword)==null?void 0:p.policy)||"NoPassword",password:((f=j.folderPassword)==null?void 0:f.password)||"",isOnPublicProfile:Se,participantsCanAddItems:se!==void 0?se:!0}}catch(w){return console.error("Error in fetchFolderDetails:",w),e(`Error in fetchFolderDetails: ${w}`),null}},We=()=>{e("Attempting to restore photos from localStorage");try{const t=localStorage.getItem(D.SELECTED_PHOTOS);if(e(`Found stored photos: ${t?"yes":"no"}`),t)try{const s=JSON.parse(t);e(`Parsed ${s.length} photos from localStorage`),Array.isArray(s)&&s.length>0&&(C(s),e(`Restored ${s.length} photos to state`))}catch(s){console.error("Error parsing stored photos:",s),e(`Error parsing stored photos: ${s}`)}}catch(t){console.error("Error restoring photos from storage:",t),e(`Error restoring photos from storage: ${t}`)}},Ge=()=>{e("Testing S3 connection");try{wt?e("S3 client is available"):(console.error("S3 client not available"),e("S3 client not available"))}catch(t){console.error("S3 connection test error:",t),e(`S3 connection test error: ${t}`)}},He=()=>{const t=!B;e(`Toggling isOnPublicProfile to: ${t}`),be(t)},Je=()=>{const t=!M;e(`Toggling participantsCanAddItems to: ${t}`),xe(t)},Ke=t=>{e(`Removing photo at index: ${t}`);const s=h.filter((a,n)=>n!==t);C(s),e(`New photos count: ${s.length}`),s.length>0?(localStorage.setItem(D.SELECTED_PHOTOS,JSON.stringify(s)),e(`Updated localStorage with ${s.length} photos`)):(localStorage.removeItem(D.SELECTED_PHOTOS),e("Removed photos from localStorage"))},Qe=async t=>{if(e("Add photos triggered from file input"),!g){e("No Cognito username available, cannot add photos");return}const s=Array.from(t.target.files||[]);if(e(`Selected ${s.length} files`),!!s.length)try{const a=Ye(s);e(`Created ${a.length} initial photo objects`),C(d=>[...d,...a]);const n=h.length;e(`Starting processing at index: ${n}`);const l=await Pt(s,g,(d,c,p,f)=>{Le(n+d,c,p,f),e(`Updated status for photo ${n+d}: ${c}, progress: ${p}`)},H);e(`Updating ${l.length} photos with processed info`),Xe(n,l)}catch(a){console.error("Error in handleAddPhotos:",a),e(`Error in handleAddPhotos: ${a}`)}finally{t.target.value="",e("Reset file input value")}},Ye=t=>(e(`Creating initial photo objects for ${t.length} files`),t.map(s=>{const a=s.type,n=s.name.split(".").pop()||"jpg",l=`${ie()}.${n}`;return e(`Created initial photo object: ${l}, type: ${a}, size: ${s.size}`),{fileName:l,s3PreviewUrl:URL.createObjectURL(s),type:a,size:s.size,status:"pending",progress:0}})),Xe=(t,s)=>{e(`Updating photos with processed info, starting at index ${t}`),C(a=>{const n=[...a];return s.forEach((l,d)=>{const c=t+d;c<n.length&&(e(`Updating photo at index ${c} with processed info`),n[c]=l)}),n})},Ze=async()=>{e("Album save initiated"),S(!0);try{if(x!=null&&x.startsWith("Profile-")){e("Public username starts with 'Profile-', showing username prompt"),Z(x),P(!0),S(!1);return}e("Valid username found, proceeding to save album directly"),ve()}catch(t){console.error("Error in handleSaveAlbum:",t),e(`Error in handleSaveAlbum: ${t}`),S(!1)}},ve=async()=>{e("Starting direct album save"),S(!0);try{if(e("Validating required data for save"),!await et()){e("Required data validation failed, aborting save"),S(!1);return}const t=Math.floor(Date.now()/1e3),s=`${g}_____${g}____Account`,n=v.split("_____")[1].split("____")[0];e(`Save timestamp: ${t}`),e(`Account ID: ${s}`),e(`Folder ID: ${v}`),e(`Folder target item identifier: ${n}`),e("Creating folder position input");const l=ot(t,s,n);e("Folder position input created:",l);let d=[];const c=h.filter(p=>p.status==="complete");if(e(`Found ${c.length} valid photos with 'complete' status`),c.length>0){e("Moving files from temp to public folder"),await yt(c,tt,H),e("Creating file reference inputs for new uploads");const p=rt(c,t,s);e(`Created ${p.length} file reference inputs for new uploads`,p),d=d.concat(p)}if(oe&&A.length>0){e(`Adding ${A.length} existing file references for sub-album`);const p=A.map(f=>(e(`Creating file reference for existing file ID: ${f}`),{fileReferencesHolderId:v,currentTime:t,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:f,fileInput:null}));e(`Created ${p.length} file reference inputs for existing files`,p),d=d.concat(p)}e(`Total file reference inputs: ${d.length}`),e("Sending GraphQL mutation to save album"),await st(l,d)}catch(t){console.error("Error in saveAlbumDirectly:",t),e(`Error in saveAlbumDirectly: ${t}`),S(!1)}},et=async()=>(e("Validating required data"),await L()?g?v?(e("All required data validated successfully"),!0):(e("No folder ID, validation failed"),!1):(e("No Cognito username, validation failed"),!1):(e("No token available, validation failed"),!1)),tt=t=>{const s=document.getElementById("saveProgress");s?(s.style.width=`${t}%`,e(`Updated save progress bar: ${t}%`)):e("Progress bar element not found")},ot=(t,s,a,n)=>{e("Creating folder position input"),e(`Profile visibility: ${B?"Public":"Only Me"}`);const l=B?[`${g}_____Public____Profile`]:["Only Me_____Only Me____Profile"];e(`Profile IDs: ${JSON.stringify(l)}`);let d=[];oe&&A.length>0&&(e(`Creating file reference IDs for ${A.length} sub-album files`),d=A.map(f=>{const w=f.split("_____");if(w.length>=2){const $=w[1].split("____")[0],z=`${a}_____${$}____FileReference`;return e(`Created file reference ID for sub-album: ${z}`),z}return e(`Using original fileId as fallback: ${f}`),f})),e(`Created ${d.length} acceptedFileReferenceIds`);const c=y!=="noPassword"?W:null,p=ze[y.charAt(0).toUpperCase()+y.slice(1)];return e(`Password protection: ${y}`),e(`Password policy: ${p}`),e(`Album password: ${c?"******":"null"}`),e(`Participants can add items: ${M}`),{currentTime:t,folderId:v,profileIds:l,folderPositionSelectedTagInputs:[],folderPositionPoints:1,acceptedFileReferenceIds:d,hiddenFileReferenceIds:[],folderInput:{folderSelectedTagInputs:[],folderAboutContactIds:[s],folderName:pe,folderDescription:ge,folderPasswordInput:{password:c,policy:p},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,usingFolderInviteGrantsRightToRemoveItems:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:M,addedItemsNeedFolderCreatorApproval:!1}}}},rt=(t,s,a)=>(e(`Creating file reference inputs for ${t.length} photos`),t.map(n=>{var c;const l=n.type==="video"||(c=n.type)!=null&&c.startsWith("video")?`Input/Video/${n.fileName}`:`Input/Image/${n.fileName}`,d=`${g}_____${n.fileName}____File`;return e(`Created file reference for ${n.fileName}:`),e(`  - dataKey: ${l}`),e(`  - fileId: ${d}`),e(`  - thumbnailDataKey: ${n.thumbnailDataKey||"undefined"}`),e(`  - size: ${n.size}`),e(`  - thumbnailSize: ${n.thumbnailSize||0}`),e(`  - duration: ${n.duration||"undefined"}`),{fileReferencesHolderId:v,currentTime:s,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:d,fileInput:{fileId:d,ownerFileInput:{editorContactIds:[a],FileSharingOptionsEnum:"Anyone",dataKey:l,thumbnailDataKey:n.thumbnailDataKey,dataInBytes:n.size,thumbnailDataInBytes:n.thumbnailSize||0,s3UploadedAt:s,durationInSeconds:n.duration},editorFileInput:{aboutContactIds:[a],captionText:"",numericFilterInputs:[]}}}})),st=async(t,s)=>{var c,p;e("Sending album save mutation"),e("Folder position input:",t),e(`File reference inputs count: ${s.length}`),s.length>0&&(e("Sample file reference input:",s[0]),s.length>1&&e("Second sample file reference input:",s[1]));const a=document.getElementById("saveProgressText");a&&(a.innerText=r("Finalizing album..."),e("Updated progress text to 'Finalizing album...'"));const n=await L();if(!n){e("No token available for saving album, aborting"),S(!1);return}const l=`
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
    `,d={folderPositionInputs:[t],updatedFileReferenceInputs:s};e("GraphQL mutation variables:",d);try{e("Sending API request to save album");const f=await fetch(ne,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({query:l,variables:d})});e(`API response status: ${f.status}`);const w=await f.text();e(`API response raw text: ${w}`);const k=JSON.parse(w);e("API response JSON:",k),k.errors?(console.error("Upload failed:",k.errors),e("Upload failed with errors:",k.errors),S(!1)):(e("Album saved successfully"),e("changeFiles0 result:",(c=k.data)==null?void 0:c.changeFiles0),e("changeFiles result:",(p=k.data)==null?void 0:p.changeFiles),nt())}catch(f){console.error("Fetch error in sendAlbumSaveMutation:",f),e(`Fetch error in sendAlbumSaveMutation: ${f}`),S(!1)}},nt=()=>{e("Handling successful save"),It(C,ce,[D.SELECTED_PHOTOS,D.SUB_ALBUM_DATA],H),e("Album data cleared");const t=document.getElementById("saveProgressText");t&&(t.innerText=r("Album saved successfully!"),e("Updated progress text to 'Album saved successfully!'")),sessionStorage.setItem("album_just_saved","true"),e("Set 'album_just_saved' flag in sessionStorage"),e("Setting timeout for redirect to my-albums.html"),setTimeout(()=>{e("Redirecting to my-albums.html"),window.location.href="/my-albums.html"},1e3)},it=t=>{const s=/^[a-zA-Z0-9-]+$/.test(t);return e(`Username validation for '${t}': ${s}`),s},Pe=async t=>{var l,d;e(`Submitting username: ${t}`),te(!0),ee("");const s=await L();if(!s){e("No token available for username submission"),te(!1);return}const a=`
      mutation MyMutation($savePublicProfileDisplayNameInput: SavePublicProfileDisplayNameInput) {
        changeMyAccountItem(savePublicProfileDisplayNameInput: $savePublicProfileDisplayNameInput) {
          ... on Profile {
            anyDisplayName
          }
        }
      }
    `,n={savePublicProfileDisplayNameInput:{anyDisplayName:t}};e("Username mutation variables:",n);try{e("Sending API request to save username");const p=await(await fetch(ne,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify({query:a,variables:n})})).json();e("Username API response:",p);const f=(d=(l=p==null?void 0:p.data)==null?void 0:l.changeMyAccountItem)==null?void 0:d.anyDisplayName;if(f)e(`Username successfully changed to: ${f}`),at(f);else throw e("Username change failed - likely already taken"),new Error("Username taken")}catch(c){e(`Error submitting username: ${c}`),ee(r("Username is already taken. Please try a different one.")),Oe(!0),te(!1)}},at=t=>{e(`Handling successful username update to: ${t}`),localStorage.setItem("publicUsername",t),O(t),P(!1),e("Proceeding to save album after username update"),ve()},lt=()=>{const t=Math.floor(1e5+Math.random()*9e5).toString(),s=`${R}${t}`;e(`Appending random digits to username: ${R} -> ${s}`),Z(s),Pe(s)},dt=(t,s)=>{e(`Password dialog closed with option: ${t}, password: ${s?"******":"undefined"}`),t&&U(t),s!==void 0&&G(s),he(!1)},ct=()=>y==="noPassword"?r("Album Password Policy"):`${r(y==="notVisible"?"Not Visible":y==="watermark"?"Watermark":"Cannot Be Saved")} ${W?`(${W})`:""}`,pt=()=>{e("Opening password dialog"),he(!0)};return o.jsxs(o.Fragment,{children:[o.jsx($t,{}),o.jsxs(jt,{isRTL:F,children:[o.jsxs(Ct,{children:[o.jsxs(_t,{children:[o.jsx(At,{children:o.jsx(kt,{href:"/my-albums.html",children:r("My Albums")})}),x&&o.jsxs(Ft,{children:[o.jsx(Dt,{children:x}),o.jsx(bt,{t:r})]})]}),b.totalFiles>0&&o.jsxs(Tt,{children:[o.jsx(Ut,{children:r("Upload Progress")}),o.jsxs(Et,{children:[o.jsxs(zt,{children:[o.jsxs("span",{children:[r("Overall Progress"),": ",Math.round(b.overallProgress*100),"%"]}),o.jsxs("span",{children:[b.filesComplete," ",r("of")," ",b.totalFiles," ",r("complete")]})]}),o.jsx(Nt,{children:o.jsx(Ot,{progress:b.overallProgress})})]}),o.jsxs(Rt,{children:[b.filesUploading>0&&o.jsxs(J,{children:[r("Uploading"),": ",b.filesUploading]}),b.filesProcessing>0&&o.jsxs(J,{children:[r("Processing"),": ",b.filesProcessing]}),b.filesComplete>0&&o.jsxs(J,{children:[r("Complete"),": ",b.filesComplete]}),b.filesWithError>0&&o.jsxs(J,{isError:!0,children:[r("Failed"),": ",b.filesWithError]})]})]}),_&&o.jsxs(Bt,{children:[o.jsx(Mt,{children:r("Saving Album")}),o.jsx(Lt,{id:"saveProgressText",children:r("Moving files...")}),o.jsx(Vt,{children:o.jsx(qt,{id:"saveProgress",style:{width:"5%"}})})]}),o.jsx(So,{id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:Qe}),oe&&A.length>0&&o.jsxs("div",{style:{backgroundColor:"#e3f2fd",padding:"15px",borderRadius:"8px",marginBottom:"20px",fontSize:"16px"},children:[o.jsxs("p",{style:{margin:0},children:[r("Creating a new sub-album with")," ",o.jsx("strong",{children:A.length})," ",r("selected items")]}),o.jsx("p",{style:{margin:"10px 0 0 0",fontSize:"14px",color:"#0277bd"},children:r("You can add more photos or videos to this sub-album before saving")})]}),h.length>0&&o.jsxs(o.Fragment,{children:[o.jsxs(Wt,{children:[h.length," ",h.length>1?r("photos selected"):r("photo selected"),":"]}),o.jsx(Gt,{children:h.map((t,s)=>{var a,n;return o.jsxs(Ht,{children:[o.jsx(Jt,{status:t.status,children:t.status==="complete"?"✓":t.status==="error"?"✕":t.status==="uploading"?"↑":t.status==="processing"?"⚙️":"•"}),o.jsxs(Kt,{children:[t.type==="video"||(a=t.type)!=null&&a.startsWith("video")?o.jsx(Yt,{src:t.s3PreviewUrl,controls:!0}):o.jsx(Qt,{src:t.s3PreviewUrl,alt:t.fileName}),(t.status==="uploading"||t.status==="processing")&&o.jsx(Xt,{children:o.jsx(Zt,{progress:t.progress,status:t.status})})]}),o.jsxs(eo,{children:[(n=t.type)!=null&&n.startsWith("video")?r("Video"):r("Image"),t.size&&` • ${(t.size/1024/1024).toFixed(1)} MB`,t.duration&&` • ${t.duration}s`]}),t.status==="error"&&t.errorMessage&&o.jsxs(to,{children:[r("Error"),": ",t.errorMessage.length>40?t.errorMessage.substring(0,37)+"...":t.errorMessage]}),o.jsx(oo,{onClick:()=>Ke(s),disabled:_,children:r("Remove")})]},s)})})]}),o.jsxs(ro,{children:[Re&&we===!0&&o.jsxs(io,{children:[o.jsxs(ye,{children:[o.jsx(Ie,{htmlFor:"folderName",children:r("Album Name (Optional)")}),o.jsx(ao,{id:"folderName",type:"text",value:pe,onChange:t=>ue(t.target.value),placeholder:r("Enter album name")})]}),o.jsxs(ye,{children:[o.jsx(Ie,{htmlFor:"folderDescription",children:r("Album Description (Optional)")}),o.jsx(lo,{id:"folderDescription",value:ge,onChange:t=>fe(t.target.value),placeholder:r("Enter album description"),rows:4})]}),o.jsxs($e,{children:[o.jsx(je,{children:r(B?"On Public Profile":"Not On Public Profile")}),o.jsxs(Ce,{children:[o.jsx("input",{type:"checkbox",checked:B,onChange:He,disabled:_}),o.jsx(_e,{})]})]}),o.jsxs($e,{children:[o.jsx(je,{children:r(M?"Participants Can Add Items":"Participants Cannot Add Items")}),o.jsxs(Ce,{children:[o.jsx("input",{type:"checkbox",checked:M,onChange:Je,disabled:_}),o.jsx(_e,{})]})]})]}),o.jsx(Ee,{onClick:()=>{const t=document.getElementById("file-input");t==null||t.click()},disabled:_,children:r("Add More Photos")}),we===!0&&o.jsx(no,{passwordSet:y!=="noPassword",onClick:pt,disabled:_,children:ct()}),o.jsx(so,{onClick:Ze,disabled:_,children:r(_?"Saving Album...":"Save Album")})]}),X&&o.jsx(co,{children:o.jsxs(po,{isRTL:F,children:[o.jsx(uo,{children:r("Enter Username")}),o.jsx(go,{children:r("Username should contain only letters, numbers and hyphens. Example: john-doe2")}),o.jsx(fo,{value:R,onChange:t=>Z(t.target.value),isRTL:F}),le&&o.jsx(mo,{children:le}),o.jsx(ho,{disabled:de,onClick:()=>{if(!it(R)){ee(r("Username must contain only letters, numbers, and hyphens."));return}Pe(R)},children:r("Select Username")}),Ne&&o.jsx(bo,{disabled:de,onClick:lt,children:r("Add Random Digits to Username")})]})}),me&&o.jsx(ko,{isOpen:me,onClose:dt,initialOption:y,initialPassword:W})]}),I.length>0&&o.jsxs(xo,{children:[o.jsx(wo,{children:r("Debug Log")}),o.jsx(vo,{children:I.map((t,s)=>o.jsx(Po,{children:t},s))})]})]})]})},To=()=>o.jsx(ft,{children:o.jsx(Do,{})});gt.createRoot(document.getElementById("root")).render(o.jsx(To,{}));
