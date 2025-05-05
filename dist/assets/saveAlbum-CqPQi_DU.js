import{u as Se,r as a,j as e,g as je,R as it,I as at,b as E,a as Y}from"./config-Dg6ijVuE.js";import{f as dt,d as s,l as lt}from"./styled-components.browser.esm-B4JBUJq3.js";import{a as $,g as xe}from"./utils-ClnP9gPo.js";import{L as ct}from"./LogoutButton-CY3f9el8.js";import{u as pt,s as ut,p as gt,c as ft,a as xt,m as mt,b as ht}from"./file-upload-utils-Ckr1Pr0y.js";import"./index-DFUfgcbK.js";const bt=dt`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }
`,_e=t=>lt`
  direction: ${t?"rtl":"ltr"};
`,wt=s.div`
  padding: 40px 20px;
  background-color: #f9fafb;
  min-height: 100vh;
  ${t=>_e(t.isRTL)}
`,Pt=s.div`
  max-width: 900px;
  margin: 0 auto;
`,vt=s.div`
  margin-bottom: 20px;
`,yt=s.div`
  margin-bottom: 12px;
`,It=s.a`
  font-size: 16px;
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
`,St=s.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,jt=s.div`
  font-size: 16px;
  color: #666;
`,_t=s.div`
  margin-bottom: 24px;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,kt=s.h3`
  font-size: 18px;
  margin: 0 0 12px 0;
`,Ct=s.div`
  margin-bottom: 12px;
`,Tt=s.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 6px;
`,At=s.div`
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`,Ft=s.div`
  height: 100%;
  background-color: #4caf50;
  border-radius: 4px;
  transition: width 0.3s ease;
  width: ${t=>t.progress*100}%;
`,Dt=s.div`
  display: flex;
  gap: 12px;
  font-size: 14px;
  color: #666;
`,M=s.div`
  color: ${t=>t.isError?"#e53935":"inherit"};
`,Et=s.div`
  margin-bottom: 24px;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,$t=s.h3`
  font-size: 18px;
  margin: 0 0 12px 0;
`,Ut=s.div`
  font-size: 14px;
  margin-bottom: 8px;
`,zt=s.div`
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`,Bt=s.div`
  height: 100%;
  background-color: #2196f3;
  border-radius: 4px;
  transition: width 0.3s ease;
`,Ot=s.p`
  font-size: 16px;
  margin-bottom: 16px;
  color: #333;
`,Nt=s.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 32px;
`,Rt=s.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.03);
  width: 160px;
  position: relative;
`,Mt=s.div`
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
  background-color: ${t=>{switch(t.status){case"complete":return"#4caf50";case"error":return"#e53935";case"uploading":return"#2196f3";case"processing":return"#ff9800";default:return"#9e9e9e"}}};
`,Lt=s.div`
  position: relative;
  margin-bottom: 8px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`,Wt=s.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 6px;
`,Vt=s.video`
  max-width: 100%;
  max-height: 100%;
  border-radius: 6px;
`,Ht=s.div`
  position: absolute;
  bottom: 4px;
  left: 4px;
  right: 4px;
  height: 4px;
  background-color: rgba(0,0,0,0.2);
  border-radius: 2px;
  overflow: hidden;
`,qt=s.div`
  height: 100%;
  background-color: ${t=>t.status==="processing"?"#ff9800":"#2196f3"};
  transition: width 0.3s ease;
  width: ${t=>t.progress*100}%;
`,Gt=s.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 6px;
`,Kt=s.div`
  font-size: 12px;
  color: #e53935;
  margin-bottom: 6px;
`,Jt=s.button`
  background-color: #e53935;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 8px;
  font-size: 12px;
  cursor: ${t=>t.disabled?"not-allowed":"pointer"};
  margin-top: auto;
  opacity: ${t=>t.disabled?.6:1};
`,Qt=s.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`,ke=s.button`
  padding: 14px 28px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  cursor: ${t=>t.disabled?"not-allowed":"pointer"};
  opacity: ${t=>t.disabled?.6:1};
`,Yt=s(ke)`
  background-color: #007bff;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
`,Ce=s(ke)`
  background-color: #8c8c8c;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
`,Xt=s(Ce)`
  color: ${t=>t.passwordSet?"#000000":"white"};
  font-weight: ${t=>t.passwordSet?"bold":"normal"};
`,Zt=s.div`
  margin-top: 12px;
  margin-bottom: 12px;
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,me=s.div`
  margin-bottom: 16px;
`,he=s.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
`,eo=s.input`
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-sizing: border-box;
`,to=s.textarea`
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  resize: vertical;
`,oo=s.div`
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
`,so=s.div`
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  ${t=>_e(t.isRTL)}
`,ro=s.p`
  font-size: 16px;
  margin-bottom: 12px;
`,no=s.p`
  font-size: 14px;
  margin-bottom: 16px;
  color: #666;
`,io=s.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
  text-align: ${t=>t.isRTL?"right":"left"};
`,ao=s.div`
  color: #e53935;
  margin-bottom: 12px;
`,lo=s.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: ${t=>t.disabled?"not-allowed":"pointer"};
  margin-bottom: 10px;
  opacity: ${t=>t.disabled?.6:1};
`,co=s.button`
  width: 100%;
  padding: 12px;
  background-color: #6c757d;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: ${t=>t.disabled?"not-allowed":"pointer"};
  opacity: ${t=>t.disabled?.6:1};
`,po=s.div`
  margin-top: 24px;
  padding: 16px;
  background-color: #f0f0f0;
  border-radius: 8px;
`,uo=s.h3`
  margin: 0 0 12px 0;
  font-size: 16px;
`,go=s.pre`
  margin: 0;
  font-size: 12px;
  white-space: pre-wrap;
  max-height: 200px;
  overflow-y: auto;
`,fo=s.div`
  margin-bottom: 4px;
`,xo=s.input`
  display: none;
`,be=s.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 4px 0;
  gap: 15px; /* Small gap for consistent spacing */
`,we=s.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  line-height: 24px; /* Added line-height to better align with taller toggle */
`,Pe=s.label`
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
`,ve=s.span`
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
`,mo=s.div`
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
`,ho=s.div`
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`,bo=s.div`
  font-size: 18px;
  font-weight: 500;
  color: white;
  background-color: #888;
  padding: 15px 20px;
  text-align: center;
`,wo=s.div`
  direction: ${t=>t.isRTL?"rtl":"ltr"};
  padding: 30px;
`,ye=s.p`
  margin-bottom: 15px;
  font-size: 16px;
`,Po=s.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 25px;
  margin-top: 20px;
  box-sizing: border-box;
`,vo=s.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
`,L=s.div`
  display: flex;
  align-items: center;
  cursor: ${t=>t.disabled?"not-allowed":"pointer"};
  opacity: ${t=>t.disabled?.7:1};
`,W=s.input`
  margin-right: 10px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  
  &:disabled {
    cursor: not-allowed;
  }
`,V=s.label`
  display: flex;
  cursor: ${t=>t.disabled?"not-allowed":"pointer"};
  font-size: 16px;
`,X=s.span`
  color: #aaa;
  margin-left: 8px;
`,yo=s.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`,Ie=s.button`
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
`,Io=({isOpen:t,onClose:T,initialOption:j="noPassword",initialPassword:v=""})=>{const{t:p,language:g}=Se(),y=je(g)==="rtl",[b,U]=a.useState(j),[m,A]=a.useState(v);if(a.useEffect(()=>{t&&(U(j),A(v))},[t,j,v]),!t)return null;const d=m.trim()==="",k=h=>{h!=="noPassword"&&d||U(h)},H=h=>{h.target===h.currentTarget&&T()};return e.jsx(mo,{onClick:H,children:e.jsxs(ho,{children:[e.jsx(bo,{children:p("Album Password Policy")}),e.jsxs(wo,{isRTL:y,children:[e.jsx(ye,{children:p("Enter a password for this album.")}),e.jsx(ye,{children:p("Select what can be done with photos and videos without a password.")}),e.jsx(Po,{type:"text",placeholder:p("Enter password"),value:m,onChange:h=>A(h.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"}),e.jsxs(vo,{children:[e.jsxs(L,{disabled:d,children:[e.jsx(W,{type:"radio",name:"protection",id:"notVisible",checked:b==="notVisible",onChange:()=>{},disabled:d,onClick:()=>!d&&k("notVisible")}),e.jsxs(V,{htmlFor:"notVisible",disabled:d,children:[p("Not Visible"),d&&e.jsx(X,{children:p("Password required")})]})]}),e.jsxs(L,{disabled:d,children:[e.jsx(W,{type:"radio",name:"protection",id:"watermark",checked:b==="watermark",onChange:()=>{},disabled:d,onClick:()=>!d&&k("watermark")}),e.jsxs(V,{htmlFor:"watermark",disabled:d,children:[p("Watermark"),d&&e.jsx(X,{children:p("Password required")})]})]}),e.jsxs(L,{disabled:d,children:[e.jsx(W,{type:"radio",name:"protection",id:"cannotBeSaved",checked:b==="cannotBeSaved",onChange:()=>{},disabled:d,onClick:()=>!d&&k("cannotBeSaved")}),e.jsxs(V,{htmlFor:"cannotBeSaved",disabled:d,children:[p("Cannot Be Saved"),d&&e.jsx(X,{children:p("Password required")})]})]}),e.jsxs(L,{disabled:!1,children:[e.jsx(W,{type:"radio",name:"protection",id:"noPassword",checked:b==="noPassword",onChange:()=>{},onClick:()=>k("noPassword")}),e.jsx(V,{htmlFor:"noPassword",disabled:!1,children:p("No Password")})]})]}),e.jsxs(yo,{children:[e.jsx(Ie,{onClick:()=>T(),children:p("Cancel")}),e.jsx(Ie,{onClick:()=>{console.log(`Saving with option: ${b}, password: ${m.length>0?"********":"none"}`),T(b,m)},children:p("Save")})]})]})]})})};var Te=(t=>(t.NotVisible="NotVisible",t.Watermark="Watermark",t.CannotBeSaved="CannotBeSaved",t.NoPassword="NoPassword",t))(Te||{});const So=`
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
`,jo=()=>{const{t,language:T}=Se(),j=je(T)==="rtl",[v,p]=a.useState(null),[g,y]=a.useState([]),[b,U]=a.useState([]),[m,A]=a.useState(null),[d,k]=a.useState(null),[H,h]=a.useState(!1),[z,q]=a.useState(""),[Z,G]=a.useState(""),[Ae,Fe]=a.useState(!1),[ee,K]=a.useState(!1),[f,te]=a.useState({totalFiles:0,filesComplete:0,filesUploading:0,filesProcessing:0,filesWithError:0,overallProgress:0}),[I,w]=a.useState(!1),[oe,se]=a.useState(""),[re,ne]=a.useState(""),[De,J]=a.useState(!1),[ie,ae]=a.useState(!1),[S,C]=a.useState("noPassword"),[B,O]=a.useState(""),[N,de]=a.useState(!0),[R,le]=a.useState(!0),[ce,F]=a.useState(null),Q=xt(U),Ee=ft(y);a.useEffect(()=>{$e()},[]),a.useEffect(()=>{g.length>0&&localStorage.setItem(E.SELECTED_PHOTOS,JSON.stringify(g))},[g]),a.useEffect(()=>{pt(g,te)},[g]);const $e=async()=>{w(!1);try{const o=await $();if(!o)return;try{const r=localStorage.getItem("publicUsername");A(r||null);const n=JSON.parse(atob(o.split(".")[1]))["cognito:username"];n&&(k(n),await Ue(n))}catch(r){console.error("User data initialization error:",r)}Be(),Oe()}catch(o){console.error("Initialization error:",o)}},Ue=async o=>{try{const i=new URLSearchParams(window.location.search).get("folderId");if(i){p(i);try{const n=await ze(i);if(n){const c=`${o}_____${o}____Account`,l=n.creatorId===c;if(F(l),l)switch(J(!0),se(n.folderName),ne(n.folderDescription),de(n.isOnPublicProfile),n.participantsCanAddItems!==void 0&&(le(n.participantsCanAddItems),console.log("Setting participants can add items:",n.participantsCanAddItems)),n.passwordPolicy){case"NoPassword":C("noPassword");break;case"NotVisible":C("notVisible"),O(n.password);break;case"Watermark":C("watermark"),O(n.password);break;case"CannotBeSaved":C("cannotBeSaved"),O(n.password);break;default:C("noPassword")}else J(!1)}else F(!1)}catch(n){console.error("Error fetching folder details:",n),F(!1)}}else{const n=`${o}_____${xe()}____Folder`;p(n),F(!0),J(!0)}}catch(r){console.error("Folder ID initialization error:",r),F(!1)}},ze=async o=>{var r,i,n,c,l,u,x;try{const P=await $();if(!P)return null;const D=await(await fetch(Y,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${P}`},body:JSON.stringify({query:So,variables:{folderIds:[o]}})})).json();if(D.errors)return console.error("GraphQL errors:",D.errors),null;const ge=((i=(r=D==null?void 0:D.data)==null?void 0:r.fetchFolders)==null?void 0:i.items)||[];if(ge.length===0)return null;const _=ge[0],rt=((c=(n=_.folderPosition)==null?void 0:n.profileIds)==null?void 0:c.some(nt=>nt.includes("Public____Profile")))||!1,fe=(l=_.folderInviteParameters)==null?void 0:l.usingFolderInviteGrantsRightToAddItems;return{creatorId:_.creatorId||"",folderName:_.folderName||"",folderDescription:_.folderDescription||"",passwordPolicy:((u=_.folderPassword)==null?void 0:u.policy)||"NoPassword",password:((x=_.folderPassword)==null?void 0:x.password)||"",isOnPublicProfile:rt,participantsCanAddItems:fe!==void 0?fe:!0}}catch(P){return console.error("Error in fetchFolderDetails:",P),null}},Be=()=>{try{const o=localStorage.getItem(E.SELECTED_PHOTOS);if(o)try{const r=JSON.parse(o);Array.isArray(r)&&r.length>0&&y(r)}catch(r){console.error("Error parsing stored photos:",r)}}catch(o){console.error("Error restoring photos from storage:",o)}},Oe=()=>{try{ut||console.error("S3 client not available")}catch(o){console.error("S3 connection test error:",o)}},Ne=()=>{de(!N)},Re=()=>{le(!R)},Me=o=>{const r=g.filter((i,n)=>n!==o);y(r),r.length>0?localStorage.setItem(E.SELECTED_PHOTOS,JSON.stringify(r)):localStorage.removeItem(E.SELECTED_PHOTOS)},Le=async o=>{if(!d)return;const r=Array.from(o.target.files||[]);if(r.length)try{const i=We(r);y(l=>[...l,...i]);const n=g.length,c=await gt(r,d,(l,u,x,P)=>{Ee(n+l,u,x,P)},Q);Ve(n,c)}catch(i){console.error("Error in handleAddPhotos:",i)}finally{o.target.value=""}},We=o=>o.map(r=>{const i=r.type,n=r.name.split(".").pop()||"jpg";return{fileName:`${xe()}.${n}`,s3PreviewUrl:URL.createObjectURL(r),type:i,size:r.size,status:"pending",progress:0}}),Ve=(o,r)=>{y(i=>{const n=[...i];return r.forEach((c,l)=>{const u=o+l;u<n.length&&(n[u]=c)}),n})},He=async()=>{w(!0);try{if(m!=null&&m.startsWith("Profile-")){q(m),h(!0),w(!1);return}pe()}catch(o){console.error("Error in handleSaveAlbum:",o),w(!1)}},pe=async()=>{w(!0);try{if(!await qe()){w(!1);return}const o=g.filter(x=>x.status==="complete"),r=Math.floor(Date.now()/1e3),i=`${d}_____${d}____Account`,c=v.split("_____")[1].split("____")[0];await mt(o,Ge,Q);const l=Ke(r,i,c,o),u=Je(o,r,i);await Qe(l,u)}catch(o){console.error("Error in saveAlbumDirectly:",o),w(!1)}},qe=async()=>!(!await $()||!d||!v),Ge=o=>{const r=document.getElementById("saveProgress");r&&(r.style.width=`${o}%`)},Ke=(o,r,i,n)=>{const c=N?[`${d}_____Public____Profile`]:["Only Me_____Only Me____Profile"];return{currentTime:o,folderId:v,profileIds:c,folderPositionSelectedTagInputs:[],folderPositionPoints:1,acceptedFileReferenceIds:n.map(l=>`${i}_____${l.fileName}____FileReference`),hiddenFileReferenceIds:[],folderInput:{folderSelectedTagInputs:[],folderAboutContactIds:[r],folderName:oe,folderDescription:re,folderPasswordInput:{password:S!=="noPassword"?B:null,policy:Te[S.charAt(0).toUpperCase()+S.slice(1)]},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,usingFolderInviteGrantsRightToRemoveItems:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:R,addedItemsNeedFolderCreatorApproval:!1}}}},Je=(o,r,i)=>o.map(n=>{var u;const c=n.type==="video"||(u=n.type)!=null&&u.startsWith("video")?`Input/Video/${n.fileName}`:`Input/Image/${n.fileName}`,l=`${d}_____${n.fileName}____File`;return{fileReferencesHolderId:v,currentTime:r,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:l,fileInput:{fileId:l,ownerFileInput:{editorContactIds:[i],FileSharingOptionsEnum:"Anyone",dataKey:c,thumbnailDataKey:n.thumbnailDataKey,dataInBytes:n.size,thumbnailDataInBytes:n.thumbnailSize||0,s3UploadedAt:r,durationInSeconds:n.duration},editorFileInput:{aboutContactIds:[i],captionText:"",numericFilterInputs:[]}}}}),Qe=async(o,r)=>{const i=document.getElementById("saveProgressText");i&&(i.innerText=t("Finalizing album..."));const n=await $();if(!n){w(!1);return}const c=`
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
    `,l={folderPositionInputs:[o],updatedFileReferenceInputs:r},x=await(await fetch(Y,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({query:c,variables:l})})).json();x.errors?(console.error("Upload failed:",x.errors),w(!1)):Ye()},Ye=()=>{ht(y,te,[E.SELECTED_PHOTOS],Q);const o=document.getElementById("saveProgressText");o&&(o.innerText=t("Album saved successfully!")),sessionStorage.setItem("album_just_saved","true"),setTimeout(()=>{window.location.href="/my-albums.html"},1e3)},Xe=o=>/^[a-zA-Z0-9-]+$/.test(o),ue=async o=>{var c,l;K(!0),G("");const r=await $();if(!r){K(!1);return}const i=`
      mutation MyMutation($savePublicProfileDisplayNameInput: SavePublicProfileDisplayNameInput) {
        changeMyAccountItem(savePublicProfileDisplayNameInput: $savePublicProfileDisplayNameInput) {
          ... on Profile {
            anyDisplayName
          }
        }
      }
    `,n={savePublicProfileDisplayNameInput:{anyDisplayName:o}};try{const x=await(await fetch(Y,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({query:i,variables:n})})).json(),P=(l=(c=x==null?void 0:x.data)==null?void 0:c.changeMyAccountItem)==null?void 0:l.anyDisplayName;if(P)Ze(P);else throw new Error("Username taken")}catch{G(t("Username is already taken. Please try a different one.")),Fe(!0),K(!1)}},Ze=o=>{localStorage.setItem("publicUsername",o),A(o),h(!1),pe()},et=()=>{const o=Math.floor(1e5+Math.random()*9e5).toString(),r=`${z}${o}`;q(r),ue(r)},tt=(o,r)=>{o&&C(o),r!==void 0&&O(r),ae(!1)},ot=()=>S==="noPassword"?t("Album Password Policy"):`${t(S==="notVisible"?"Not Visible":S==="watermark"?"Watermark":"Cannot Be Saved")} ${B?`(${B})`:""}`,st=()=>{ae(!0)};return e.jsxs(e.Fragment,{children:[e.jsx(bt,{}),e.jsxs(wt,{isRTL:j,children:[e.jsxs(Pt,{children:[e.jsxs(vt,{children:[e.jsx(yt,{children:e.jsx(It,{href:"/my-albums.html",children:t("My Albums")})}),m&&e.jsxs(St,{children:[e.jsx(jt,{children:m}),e.jsx(ct,{t})]})]}),f.totalFiles>0&&e.jsxs(_t,{children:[e.jsx(kt,{children:t("Upload Progress")}),e.jsxs(Ct,{children:[e.jsxs(Tt,{children:[e.jsxs("span",{children:[t("Overall Progress"),": ",Math.round(f.overallProgress*100),"%"]}),e.jsxs("span",{children:[f.filesComplete," ",t("of")," ",f.totalFiles," ",t("complete")]})]}),e.jsx(At,{children:e.jsx(Ft,{progress:f.overallProgress})})]}),e.jsxs(Dt,{children:[f.filesUploading>0&&e.jsxs(M,{children:[t("Uploading"),": ",f.filesUploading]}),f.filesProcessing>0&&e.jsxs(M,{children:[t("Processing"),": ",f.filesProcessing]}),f.filesComplete>0&&e.jsxs(M,{children:[t("Complete"),": ",f.filesComplete]}),f.filesWithError>0&&e.jsxs(M,{isError:!0,children:[t("Failed"),": ",f.filesWithError]})]})]}),I&&e.jsxs(Et,{children:[e.jsx($t,{children:t("Saving Album")}),e.jsx(Ut,{id:"saveProgressText",children:t("Moving files...")}),e.jsx(zt,{children:e.jsx(Bt,{id:"saveProgress",style:{width:"5%"}})})]}),e.jsx(xo,{id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:Le}),g.length>0&&e.jsxs(e.Fragment,{children:[e.jsxs(Ot,{children:[g.length," ",g.length>1?t("photos selected"):t("photo selected"),":"]}),e.jsx(Nt,{children:g.map((o,r)=>{var i,n;return e.jsxs(Rt,{children:[e.jsx(Mt,{status:o.status,children:o.status==="complete"?"✓":o.status==="error"?"✕":o.status==="uploading"?"↑":o.status==="processing"?"⚙️":"•"}),e.jsxs(Lt,{children:[o.type==="video"||(i=o.type)!=null&&i.startsWith("video")?e.jsx(Vt,{src:o.s3PreviewUrl,controls:!0}):e.jsx(Wt,{src:o.s3PreviewUrl,alt:o.fileName}),(o.status==="uploading"||o.status==="processing")&&e.jsx(Ht,{children:e.jsx(qt,{progress:o.progress,status:o.status})})]}),e.jsxs(Gt,{children:[(n=o.type)!=null&&n.startsWith("video")?t("Video"):t("Image"),o.size&&` • ${(o.size/1024/1024).toFixed(1)} MB`,o.duration&&` • ${o.duration}s`]}),o.status==="error"&&o.errorMessage&&e.jsxs(Kt,{children:[t("Error"),": ",o.errorMessage.length>40?o.errorMessage.substring(0,37)+"...":o.errorMessage]}),e.jsx(Jt,{onClick:()=>Me(r),disabled:I,children:t("Remove")})]},r)})})]}),e.jsxs(Qt,{children:[De&&ce===!0&&e.jsxs(Zt,{children:[e.jsxs(me,{children:[e.jsx(he,{htmlFor:"folderName",children:t("Album Name (Optional)")}),e.jsx(eo,{id:"folderName",type:"text",value:oe,onChange:o=>se(o.target.value),placeholder:t("Enter album name")})]}),e.jsxs(me,{children:[e.jsx(he,{htmlFor:"folderDescription",children:t("Album Description (Optional)")}),e.jsx(to,{id:"folderDescription",value:re,onChange:o=>ne(o.target.value),placeholder:t("Enter album description"),rows:4})]}),e.jsxs(be,{children:[e.jsx(we,{children:t(N?"On Public Profile":"Not On Public Profile")}),e.jsxs(Pe,{children:[e.jsx("input",{type:"checkbox",checked:N,onChange:Ne,disabled:I}),e.jsx(ve,{})]})]}),e.jsxs(be,{children:[e.jsx(we,{children:t(R?"Participants Can Add Items":"Participants Cannot Add Items")}),e.jsxs(Pe,{children:[e.jsx("input",{type:"checkbox",checked:R,onChange:Re,disabled:I}),e.jsx(ve,{})]})]})]}),e.jsx(Ce,{onClick:()=>{const o=document.getElementById("file-input");o==null||o.click()},disabled:I,children:t("Add More Photos")}),ce===!0&&e.jsx(Xt,{passwordSet:S!=="noPassword",onClick:st,disabled:I,children:ot()}),e.jsx(Yt,{onClick:He,disabled:I,children:t(I?"Saving Album...":"Save Album")})]}),H&&e.jsx(oo,{children:e.jsxs(so,{isRTL:j,children:[e.jsx(ro,{children:t("Enter Username")}),e.jsx(no,{children:t("Username should contain only letters, numbers and hyphens. Example: john-doe2")}),e.jsx(io,{value:z,onChange:o=>q(o.target.value),isRTL:j}),Z&&e.jsx(ao,{children:Z}),e.jsx(lo,{disabled:ee,onClick:()=>{if(!Xe(z)){G(t("Username must contain only letters, numbers, and hyphens."));return}ue(z)},children:t("Select Username")}),Ae&&e.jsx(co,{disabled:ee,onClick:et,children:t("Add Random Digits to Username")})]})}),ie&&e.jsx(Io,{isOpen:ie,onClose:tt,initialOption:S,initialPassword:B})]}),b.length>0&&e.jsxs(po,{children:[e.jsx(uo,{children:t("Debug Log")}),e.jsx(go,{children:b.map((o,r)=>e.jsx(fo,{children:o},r))})]})]})]})},_o=()=>e.jsx(at,{children:e.jsx(jo,{})});it.createRoot(document.getElementById("root")).render(e.jsx(_o,{}));
