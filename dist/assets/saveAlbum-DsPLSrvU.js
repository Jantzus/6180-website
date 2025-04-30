import{u as ge,r as i,j as e,g as fe,R as He,I as qe,S as E,G as K}from"./config-DVBt75YP.js";import{f as Ge,d as s,l as Ke}from"./styled-components.browser.esm-BO2kX0lF.js";import{a as $,g as de}from"./utils-dfiwzYQD.js";import{u as Je,s as Qe,L as Ye,p as Ze,c as Xe,a as et,m as tt,b as ot}from"./file-upload-utils-DYmr0ckP.js";import"./index-DFUfgcbK.js";const st=Ge`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }
`,xe=o=>Ke`
  direction: ${o?"rtl":"ltr"};
`,rt=s.div`
  padding: 40px 20px;
  background-color: #f9fafb;
  min-height: 100vh;
  ${o=>xe(o.isRTL)}
`,nt=s.div`
  max-width: 900px;
  margin: 0 auto;
`,at=s.div`
  margin-bottom: 20px;
`,it=s.div`
  margin-bottom: 12px;
`,dt=s.a`
  font-size: 16px;
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
`,lt=s.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,ct=s.div`
  font-size: 16px;
  color: #666;
`,pt=s.div`
  margin-bottom: 24px;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,ut=s.h3`
  font-size: 18px;
  margin: 0 0 12px 0;
`,gt=s.div`
  margin-bottom: 12px;
`,ft=s.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 6px;
`,xt=s.div`
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`,mt=s.div`
  height: 100%;
  background-color: #4caf50;
  border-radius: 4px;
  transition: width 0.3s ease;
  width: ${o=>o.progress*100}%;
`,ht=s.div`
  display: flex;
  gap: 12px;
  font-size: 14px;
  color: #666;
`,N=s.div`
  color: ${o=>o.isError?"#e53935":"inherit"};
`,bt=s.div`
  margin-bottom: 24px;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,wt=s.h3`
  font-size: 18px;
  margin: 0 0 12px 0;
`,yt=s.div`
  font-size: 14px;
  margin-bottom: 8px;
`,vt=s.div`
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`,Pt=s.div`
  height: 100%;
  background-color: #2196f3;
  border-radius: 4px;
  transition: width 0.3s ease;
`,St=s.p`
  font-size: 16px;
  margin-bottom: 16px;
  color: #333;
`,jt=s.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 32px;
`,It=s.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.03);
  width: 160px;
  position: relative;
`,kt=s.div`
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
  background-color: ${o=>{switch(o.status){case"complete":return"#4caf50";case"error":return"#e53935";case"uploading":return"#2196f3";case"processing":return"#ff9800";default:return"#9e9e9e"}}};
`,Ct=s.div`
  position: relative;
  margin-bottom: 8px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`,_t=s.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 6px;
`,Ft=s.video`
  max-width: 100%;
  max-height: 100%;
  border-radius: 6px;
`,Dt=s.div`
  position: absolute;
  bottom: 4px;
  left: 4px;
  right: 4px;
  height: 4px;
  background-color: rgba(0,0,0,0.2);
  border-radius: 2px;
  overflow: hidden;
`,Tt=s.div`
  height: 100%;
  background-color: ${o=>o.status==="processing"?"#ff9800":"#2196f3"};
  transition: width 0.3s ease;
  width: ${o=>o.progress*100}%;
`,Et=s.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 6px;
`,$t=s.div`
  font-size: 12px;
  color: #e53935;
  margin-bottom: 6px;
`,Ut=s.button`
  background-color: #e53935;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 8px;
  font-size: 12px;
  cursor: ${o=>o.disabled?"not-allowed":"pointer"};
  margin-top: auto;
  opacity: ${o=>o.disabled?.6:1};
`,At=s.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`,me=s.button`
  padding: 14px 28px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  cursor: ${o=>o.disabled?"not-allowed":"pointer"};
  opacity: ${o=>o.disabled?.6:1};
`,zt=s(me)`
  background-color: #007bff;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
`,he=s(me)`
  background-color: #8c8c8c;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
`,Bt=s(he)`
  color: ${o=>o.passwordSet?"#000000":"white"};
  font-weight: ${o=>o.passwordSet?"bold":"normal"};
`,Nt=s.div`
  margin-top: 12px;
  margin-bottom: 12px;
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,le=s.div`
  margin-bottom: 16px;
`,ce=s.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
`,Ot=s.input`
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-sizing: border-box;
`,Rt=s.textarea`
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  resize: vertical;
`,Mt=s.div`
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
`,Lt=s.div`
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  ${o=>xe(o.isRTL)}
`,Wt=s.p`
  font-size: 16px;
  margin-bottom: 12px;
`,Vt=s.p`
  font-size: 14px;
  margin-bottom: 16px;
  color: #666;
`,Ht=s.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
  text-align: ${o=>o.isRTL?"right":"left"};
`,qt=s.div`
  color: #e53935;
  margin-bottom: 12px;
`,Gt=s.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: ${o=>o.disabled?"not-allowed":"pointer"};
  margin-bottom: 10px;
  opacity: ${o=>o.disabled?.6:1};
`,Kt=s.button`
  width: 100%;
  padding: 12px;
  background-color: #6c757d;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: ${o=>o.disabled?"not-allowed":"pointer"};
  opacity: ${o=>o.disabled?.6:1};
`,Jt=s.div`
  margin-top: 24px;
  padding: 16px;
  background-color: #f0f0f0;
  border-radius: 8px;
`,Qt=s.h3`
  margin: 0 0 12px 0;
  font-size: 16px;
`,Yt=s.pre`
  margin: 0;
  font-size: 12px;
  white-space: pre-wrap;
  max-height: 200px;
  overflow-y: auto;
`,Zt=s.div`
  margin-bottom: 4px;
`,Xt=s.input`
  display: none;
`,eo=s.div`
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
`,to=s.div`
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`,oo=s.div`
  font-size: 18px;
  font-weight: 500;
  color: white;
  background-color: #888;
  padding: 15px 20px;
  text-align: center;
`,so=s.div`
  direction: ${o=>o.isRTL?"rtl":"ltr"};
  padding: 30px;
`,pe=s.p`
  margin-bottom: 15px;
  font-size: 16px;
`,ro=s.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 25px;
  margin-top: 20px;
  box-sizing: border-box;
`,no=s.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
`,O=s.div`
  display: flex;
  align-items: center;
  cursor: ${o=>o.disabled?"not-allowed":"pointer"};
  opacity: ${o=>o.disabled?.7:1};
`,R=s.input`
  margin-right: 10px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  
  &:disabled {
    cursor: not-allowed;
  }
`,M=s.label`
  display: flex;
  cursor: ${o=>o.disabled?"not-allowed":"pointer"};
  font-size: 16px;
`,J=s.span`
  color: #aaa;
  margin-left: 8px;
`,ao=s.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`,ue=s.button`
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
`,io=({isOpen:o,onClose:_,initialOption:S="noPassword",initialPassword:y=""})=>{const{t:p,language:g}=ge(),v=fe(g)==="rtl",[b,U]=i.useState(S),[m,F]=i.useState(y);if(i.useEffect(()=>{o&&(U(S),F(y))},[o,S,y]),!o)return null;const d=m.trim()==="",I=h=>{h!=="noPassword"&&d||U(h)},L=h=>{h.target===h.currentTarget&&_()};return e.jsx(eo,{onClick:L,children:e.jsxs(to,{children:[e.jsx(oo,{children:p("Album Password Policy")}),e.jsxs(so,{isRTL:v,children:[e.jsx(pe,{children:p("Enter a password for this album.")}),e.jsx(pe,{children:p("Select what can be done with photos and videos without a password.")}),e.jsx(ro,{type:"text",placeholder:p("Enter password"),value:m,onChange:h=>F(h.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"}),e.jsxs(no,{children:[e.jsxs(O,{disabled:d,children:[e.jsx(R,{type:"radio",name:"protection",id:"notVisible",checked:b==="notVisible",onChange:()=>{},disabled:d,onClick:()=>!d&&I("notVisible")}),e.jsxs(M,{htmlFor:"notVisible",disabled:d,children:[p("Not Visible"),d&&e.jsx(J,{children:p("Password required")})]})]}),e.jsxs(O,{disabled:d,children:[e.jsx(R,{type:"radio",name:"protection",id:"watermark",checked:b==="watermark",onChange:()=>{},disabled:d,onClick:()=>!d&&I("watermark")}),e.jsxs(M,{htmlFor:"watermark",disabled:d,children:[p("Watermark"),d&&e.jsx(J,{children:p("Password required")})]})]}),e.jsxs(O,{disabled:d,children:[e.jsx(R,{type:"radio",name:"protection",id:"cannotBeSaved",checked:b==="cannotBeSaved",onChange:()=>{},disabled:d,onClick:()=>!d&&I("cannotBeSaved")}),e.jsxs(M,{htmlFor:"cannotBeSaved",disabled:d,children:[p("Cannot Be Saved"),d&&e.jsx(J,{children:p("Password required")})]})]}),e.jsxs(O,{disabled:!1,children:[e.jsx(R,{type:"radio",name:"protection",id:"noPassword",checked:b==="noPassword",onChange:()=>{},onClick:()=>I("noPassword")}),e.jsx(M,{htmlFor:"noPassword",disabled:!1,children:p("No Password")})]})]}),e.jsxs(ao,{children:[e.jsx(ue,{onClick:()=>_(),children:p("Cancel")}),e.jsx(ue,{onClick:()=>{console.log(`Saving with option: ${b}, password: ${m.length>0?"********":"none"}`),_(b,m)},children:p("Save")})]})]})]})})};var be=(o=>(o.NotVisible="NotVisible",o.Watermark="Watermark",o.CannotBeSaved="CannotBeSaved",o.NoPassword="NoPassword",o))(be||{});const lo=`
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
        folderPosition {
          id
        }          
      }
    }
  }
`,co=()=>{const{t:o,language:_}=ge(),S=fe(_)==="rtl",[y,p]=i.useState(null),[g,v]=i.useState([]),[b,U]=i.useState([]),[m,F]=i.useState(null),[d,I]=i.useState(null),[L,h]=i.useState(!1),[A,W]=i.useState(""),[Q,V]=i.useState(""),[we,ye]=i.useState(!1),[Y,H]=i.useState(!1),[x,Z]=i.useState({totalFiles:0,filesComplete:0,filesUploading:0,filesProcessing:0,filesWithError:0,overallProgress:0}),[k,w]=i.useState(!1),[X,ee]=i.useState(""),[te,oe]=i.useState(""),[ve,q]=i.useState(!1),[se,re]=i.useState(!1),[P,C]=i.useState("noPassword"),[z,B]=i.useState(""),[ne,D]=i.useState(null),G=et(U),Pe=Xe(v);i.useEffect(()=>{Se()},[]),i.useEffect(()=>{g.length>0&&localStorage.setItem(E.SELECTED_PHOTOS,JSON.stringify(g))},[g]),i.useEffect(()=>{Je(g,Z)},[g]);const Se=async()=>{w(!1);try{const t=await $();if(!t)return;try{const r=localStorage.getItem("publicUsername");F(r||null);const n=JSON.parse(atob(t.split(".")[1]))["cognito:username"];n&&(I(n),await je(n))}catch(r){console.error("User data initialization error:",r)}ke(),Ce()}catch(t){console.error("Initialization error:",t)}},je=async t=>{try{const a=new URLSearchParams(window.location.search).get("folderId");if(a){p(a);try{const n=await Ie(a);if(n){const c=`${t}_____${t}____Account`,l=n.creatorId===c;if(D(l),l)switch(q(!0),ee(n.folderName),oe(n.folderDescription),n.passwordPolicy){case"NoPassword":C("noPassword");break;case"NotVisible":C("notVisible"),B(n.password);break;case"Watermark":C("watermark"),B(n.password);break;case"CannotBeSaved":C("cannotBeSaved"),B(n.password);break;default:C("noPassword")}else q(!1)}else D(!1)}catch(n){console.error("Error fetching folder details:",n),D(!1)}}else{const n=`${t}_____${de()}____Folder`;p(n),D(!0),q(!0)}}catch(r){console.error("Folder ID initialization error:",r),D(!1)}},Ie=async t=>{var r,a,n,c;try{const l=await $();if(!l)return null;const u=await(await fetch(K,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${l}`},body:JSON.stringify({query:lo,variables:{folderIds:[t]}})})).json();if(u.errors)return console.error("GraphQL errors:",u.errors),null;const j=((a=(r=u==null?void 0:u.data)==null?void 0:r.fetchFolders)==null?void 0:a.items)||[];if(j.length===0)return null;const T=j[0];return{creatorId:T.creatorId||"",folderName:T.folderName||"",folderDescription:T.folderDescription||"",passwordPolicy:((n=T.folderPassword)==null?void 0:n.policy)||"NoPassword",password:((c=T.folderPassword)==null?void 0:c.password)||""}}catch(l){return console.error("Error in fetchFolderDetails:",l),null}},ke=()=>{try{const t=localStorage.getItem(E.SELECTED_PHOTOS);if(t)try{const r=JSON.parse(t);Array.isArray(r)&&r.length>0&&v(r)}catch(r){console.error("Error parsing stored photos:",r)}}catch(t){console.error("Error restoring photos from storage:",t)}},Ce=()=>{try{Qe||console.error("S3 client not available")}catch(t){console.error("S3 connection test error:",t)}},_e=t=>{const r=g.filter((a,n)=>n!==t);v(r),r.length>0?localStorage.setItem(E.SELECTED_PHOTOS,JSON.stringify(r)):localStorage.removeItem(E.SELECTED_PHOTOS)},Fe=async t=>{if(!d)return;const r=Array.from(t.target.files||[]);if(r.length)try{const a=De(r);v(l=>[...l,...a]);const n=g.length,c=await Ze(r,d,(l,f,u,j)=>{Pe(n+l,f,u,j)},G);Te(n,c)}catch(a){console.error("Error in handleAddPhotos:",a)}finally{t.target.value=""}},De=t=>t.map(r=>{const a=r.type,n=r.name.split(".").pop()||"jpg";return{fileName:`${de()}.${n}`,s3PreviewUrl:URL.createObjectURL(r),type:a,size:r.size,status:"pending",progress:0}}),Te=(t,r)=>{v(a=>{const n=[...a];return r.forEach((c,l)=>{const f=t+l;f<n.length&&(n[f]=c)}),n})},Ee=async()=>{w(!0);try{if(m!=null&&m.startsWith("Profile-")){W(m),h(!0),w(!1);return}ae()}catch(t){console.error("Error in handleSaveAlbum:",t),w(!1)}},ae=async()=>{w(!0);try{if(!await $e()){w(!1);return}const t=g.filter(u=>u.status==="complete"),r=Math.floor(Date.now()/1e3),a=`${d}_____${d}____Account`,c=y.split("_____")[1].split("____")[0];await tt(t,Ue,G);const l=Ae(r,a,c,t),f=ze(t,r,a);await Be(l,f)}catch(t){console.error("Error in saveAlbumDirectly:",t),w(!1)}},$e=async()=>!(!await $()||!d||!y),Ue=t=>{const r=document.getElementById("saveProgress");r&&(r.style.width=`${t}%`)},Ae=(t,r,a,n)=>({currentTime:t,folderId:y,profileIds:["Only Me_____Only Me____Profile"],folderPositionSelectedTagInputs:[],folderPositionPoints:1,acceptedFileReferenceIds:n.map(c=>`${a}_____${c.fileName}____FileReference`),hiddenFileReferenceIds:[],folderInput:{folderSelectedTagInputs:[],folderAboutContactIds:[r],folderName:X,folderDescription:te,folderPasswordInput:{password:P!=="noPassword"?z:null,policy:be[P.charAt(0).toUpperCase()+P.slice(1)]},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,usingFolderInviteGrantsRightToRemoveItems:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:!0,addedItemsNeedFolderCreatorApproval:!1}}}),ze=(t,r,a)=>t.map(n=>{var f;const c=n.type==="video"||(f=n.type)!=null&&f.startsWith("video")?`Input/Video/${n.fileName}`:`Input/Image/${n.fileName}`,l=`${d}_____${n.fileName}____File`;return{fileReferencesHolderId:y,currentTime:r,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:l,fileInput:{fileId:l,ownerFileInput:{editorContactIds:[a],FileSharingOptionsEnum:"Anyone",dataKey:c,thumbnailDataKey:n.thumbnailDataKey,dataInBytes:n.size,thumbnailDataInBytes:n.thumbnailSize||0,s3UploadedAt:r,durationInSeconds:n.duration},editorFileInput:{aboutContactIds:[a],captionText:"",numericFilterInputs:[]}}}}),Be=async(t,r)=>{const a=document.getElementById("saveProgressText");a&&(a.innerText=o("Finalizing album..."));const n=await $();if(!n){w(!1);return}const c=`
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
    `,l={folderPositionInputs:[t],updatedFileReferenceInputs:r},u=await(await fetch(K,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({query:c,variables:l})})).json();u.errors?(console.error("Upload failed:",u.errors),w(!1)):Ne()},Ne=()=>{ot(v,Z,[E.SELECTED_PHOTOS],G);const t=document.getElementById("saveProgressText");t&&(t.innerText=o("Album saved successfully!")),sessionStorage.setItem("album_just_saved","true"),setTimeout(()=>{window.location.href="/my-albums.html"},1e3)},Oe=t=>/^[a-zA-Z0-9-]+$/.test(t),ie=async t=>{var c,l;H(!0),V("");const r=await $();if(!r){H(!1);return}const a=`
      mutation MyMutation($savePublicProfileDisplayNameInput: SavePublicProfileDisplayNameInput) {
        changeMyAccountItem(savePublicProfileDisplayNameInput: $savePublicProfileDisplayNameInput) {
          ... on Profile {
            anyDisplayName
          }
        }
      }
    `,n={savePublicProfileDisplayNameInput:{anyDisplayName:t}};try{const u=await(await fetch(K,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({query:a,variables:n})})).json(),j=(l=(c=u==null?void 0:u.data)==null?void 0:c.changeMyAccountItem)==null?void 0:l.anyDisplayName;if(j)Re(j);else throw new Error("Username taken")}catch{V(o("Username is already taken. Please try a different one.")),ye(!0),H(!1)}},Re=t=>{localStorage.setItem("publicUsername",t),F(t),h(!1),ae()},Me=()=>{const t=Math.floor(1e5+Math.random()*9e5).toString(),r=`${A}${t}`;W(r),ie(r)},Le=(t,r)=>{t&&C(t),r!==void 0&&B(r),re(!1)},We=()=>P==="noPassword"?o("Album Password Policy"):`${o(P==="notVisible"?"Not Visible":P==="watermark"?"Watermark":"Cannot Be Saved")} ${z?`(${z})`:""}`,Ve=()=>{re(!0)};return e.jsxs(e.Fragment,{children:[e.jsx(st,{}),e.jsxs(rt,{isRTL:S,children:[e.jsxs(nt,{children:[e.jsxs(at,{children:[e.jsx(it,{children:e.jsx(dt,{href:"/my-albums.html",children:o("My Albums")})}),m&&e.jsxs(lt,{children:[e.jsx(ct,{children:m}),e.jsx(Ye,{t:o})]})]}),x.totalFiles>0&&e.jsxs(pt,{children:[e.jsx(ut,{children:o("Upload Progress")}),e.jsxs(gt,{children:[e.jsxs(ft,{children:[e.jsxs("span",{children:[o("Overall Progress"),": ",Math.round(x.overallProgress*100),"%"]}),e.jsxs("span",{children:[x.filesComplete," ",o("of")," ",x.totalFiles," ",o("complete")]})]}),e.jsx(xt,{children:e.jsx(mt,{progress:x.overallProgress})})]}),e.jsxs(ht,{children:[x.filesUploading>0&&e.jsxs(N,{children:[o("Uploading"),": ",x.filesUploading]}),x.filesProcessing>0&&e.jsxs(N,{children:[o("Processing"),": ",x.filesProcessing]}),x.filesComplete>0&&e.jsxs(N,{children:[o("Complete"),": ",x.filesComplete]}),x.filesWithError>0&&e.jsxs(N,{isError:!0,children:[o("Failed"),": ",x.filesWithError]})]})]}),k&&e.jsxs(bt,{children:[e.jsx(wt,{children:o("Saving Album")}),e.jsx(yt,{id:"saveProgressText",children:o("Moving files...")}),e.jsx(vt,{children:e.jsx(Pt,{id:"saveProgress",style:{width:"5%"}})})]}),e.jsx(Xt,{id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:Fe}),g.length>0&&e.jsxs(e.Fragment,{children:[e.jsxs(St,{children:[g.length," ",g.length>1?o("photos selected"):o("photo selected"),":"]}),e.jsx(jt,{children:g.map((t,r)=>{var a,n;return e.jsxs(It,{children:[e.jsx(kt,{status:t.status,children:t.status==="complete"?"✓":t.status==="error"?"✕":t.status==="uploading"?"↑":t.status==="processing"?"⚙️":"•"}),e.jsxs(Ct,{children:[t.type==="video"||(a=t.type)!=null&&a.startsWith("video")?e.jsx(Ft,{src:t.s3PreviewUrl,controls:!0}):e.jsx(_t,{src:t.s3PreviewUrl,alt:t.fileName}),(t.status==="uploading"||t.status==="processing")&&e.jsx(Dt,{children:e.jsx(Tt,{progress:t.progress,status:t.status})})]}),e.jsxs(Et,{children:[(n=t.type)!=null&&n.startsWith("video")?o("Video"):o("Image"),t.size&&` • ${(t.size/1024/1024).toFixed(1)} MB`,t.duration&&` • ${t.duration}s`]}),t.status==="error"&&t.errorMessage&&e.jsxs($t,{children:[o("Error"),": ",t.errorMessage.length>40?t.errorMessage.substring(0,37)+"...":t.errorMessage]}),e.jsx(Ut,{onClick:()=>_e(r),disabled:k,children:o("Remove")})]},r)})})]}),e.jsxs(At,{children:[ve&&ne===!0&&e.jsxs(Nt,{children:[e.jsxs(le,{children:[e.jsx(ce,{htmlFor:"folderName",children:o("Album Name (Optional)")}),e.jsx(Ot,{id:"folderName",type:"text",value:X,onChange:t=>ee(t.target.value),placeholder:o("Enter album name")})]}),e.jsxs(le,{children:[e.jsx(ce,{htmlFor:"folderDescription",children:o("Album Description (Optional)")}),e.jsx(Rt,{id:"folderDescription",value:te,onChange:t=>oe(t.target.value),placeholder:o("Enter album description"),rows:4})]})]}),e.jsx(he,{onClick:()=>{const t=document.getElementById("file-input");t==null||t.click()},disabled:k,children:o("Add More Photos")}),ne===!0&&e.jsx(Bt,{passwordSet:P!=="noPassword",onClick:Ve,disabled:k,children:We()}),e.jsx(zt,{onClick:Ee,disabled:k,children:o(k?"Saving Album...":"Save Album")})]}),L&&e.jsx(Mt,{children:e.jsxs(Lt,{isRTL:S,children:[e.jsx(Wt,{children:o("Enter Username")}),e.jsx(Vt,{children:o("Username should contain only letters, numbers and hyphens. Example: john-doe2")}),e.jsx(Ht,{value:A,onChange:t=>W(t.target.value),isRTL:S}),Q&&e.jsx(qt,{children:Q}),e.jsx(Gt,{disabled:Y,onClick:()=>{if(!Oe(A)){V(o("Username must contain only letters, numbers, and hyphens."));return}ie(A)},children:o("Select Username")}),we&&e.jsx(Kt,{disabled:Y,onClick:Me,children:o("Add Random Digits to Username")})]})}),se&&e.jsx(io,{isOpen:se,onClose:Le,initialOption:P,initialPassword:z})]}),b.length>0&&e.jsxs(Jt,{children:[e.jsx(Qt,{children:o("Debug Log")}),e.jsx(Yt,{children:b.map((t,r)=>e.jsx(Zt,{children:t},r))})]})]})]})},po=()=>e.jsx(qe,{children:e.jsx(co,{})});He.createRoot(document.getElementById("root")).render(e.jsx(po,{}));
