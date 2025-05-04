import{u as me,r as a,j as e,g as be,R as Xe,I as Ze,b as $,a as Q}from"./config-Dg6ijVuE.js";import{f as et,d as s,l as tt}from"./styled-components.browser.esm-B4JBUJq3.js";import{a as A,g as ue}from"./utils-JMr7HDUP.js";import{L as ot}from"./LogoutButton-CY3f9el8.js";import{u as st,s as rt,p as nt,c as it,a as at,m as lt,b as dt}from"./file-upload-utils-Dyci4Mj_.js";import"./index-DFUfgcbK.js";const ct=et`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }
`,we=t=>tt`
  direction: ${t?"rtl":"ltr"};
`,pt=s.div`
  padding: 40px 20px;
  background-color: #f9fafb;
  min-height: 100vh;
  ${t=>we(t.isRTL)}
`,ut=s.div`
  max-width: 900px;
  margin: 0 auto;
`,gt=s.div`
  margin-bottom: 20px;
`,ft=s.div`
  margin-bottom: 12px;
`,xt=s.a`
  font-size: 16px;
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
`,ht=s.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,mt=s.div`
  font-size: 16px;
  color: #666;
`,bt=s.div`
  margin-bottom: 24px;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,wt=s.h3`
  font-size: 18px;
  margin: 0 0 12px 0;
`,Pt=s.div`
  margin-bottom: 12px;
`,yt=s.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 6px;
`,vt=s.div`
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`,St=s.div`
  height: 100%;
  background-color: #4caf50;
  border-radius: 4px;
  transition: width 0.3s ease;
  width: ${t=>t.progress*100}%;
`,It=s.div`
  display: flex;
  gap: 12px;
  font-size: 14px;
  color: #666;
`,R=s.div`
  color: ${t=>t.isError?"#e53935":"inherit"};
`,jt=s.div`
  margin-bottom: 24px;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,_t=s.h3`
  font-size: 18px;
  margin: 0 0 12px 0;
`,kt=s.div`
  font-size: 14px;
  margin-bottom: 8px;
`,Ct=s.div`
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`,Tt=s.div`
  height: 100%;
  background-color: #2196f3;
  border-radius: 4px;
  transition: width 0.3s ease;
`,Ft=s.p`
  font-size: 16px;
  margin-bottom: 16px;
  color: #333;
`,Dt=s.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 32px;
`,Et=s.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.03);
  width: 160px;
  position: relative;
`,$t=s.div`
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
`,At=s.div`
  position: relative;
  margin-bottom: 8px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`,Ut=s.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 6px;
`,zt=s.video`
  max-width: 100%;
  max-height: 100%;
  border-radius: 6px;
`,Bt=s.div`
  position: absolute;
  bottom: 4px;
  left: 4px;
  right: 4px;
  height: 4px;
  background-color: rgba(0,0,0,0.2);
  border-radius: 2px;
  overflow: hidden;
`,Ot=s.div`
  height: 100%;
  background-color: ${t=>t.status==="processing"?"#ff9800":"#2196f3"};
  transition: width 0.3s ease;
  width: ${t=>t.progress*100}%;
`,Nt=s.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 6px;
`,Rt=s.div`
  font-size: 12px;
  color: #e53935;
  margin-bottom: 6px;
`,Mt=s.button`
  background-color: #e53935;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 8px;
  font-size: 12px;
  cursor: ${t=>t.disabled?"not-allowed":"pointer"};
  margin-top: auto;
  opacity: ${t=>t.disabled?.6:1};
`,Lt=s.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`,Pe=s.button`
  padding: 14px 28px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  cursor: ${t=>t.disabled?"not-allowed":"pointer"};
  opacity: ${t=>t.disabled?.6:1};
`,Wt=s(Pe)`
  background-color: #007bff;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
`,ye=s(Pe)`
  background-color: #8c8c8c;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
`,Vt=s(ye)`
  color: ${t=>t.passwordSet?"#000000":"white"};
  font-weight: ${t=>t.passwordSet?"bold":"normal"};
`,Ht=s.div`
  margin-top: 12px;
  margin-bottom: 12px;
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,ge=s.div`
  margin-bottom: 16px;
`,fe=s.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
`,qt=s.input`
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-sizing: border-box;
`,Gt=s.textarea`
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  resize: vertical;
`,Kt=s.div`
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
`,Jt=s.div`
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  ${t=>we(t.isRTL)}
`,Qt=s.p`
  font-size: 16px;
  margin-bottom: 12px;
`,Yt=s.p`
  font-size: 14px;
  margin-bottom: 16px;
  color: #666;
`,Xt=s.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
  text-align: ${t=>t.isRTL?"right":"left"};
`,Zt=s.div`
  color: #e53935;
  margin-bottom: 12px;
`,eo=s.button`
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
`,to=s.button`
  width: 100%;
  padding: 12px;
  background-color: #6c757d;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: ${t=>t.disabled?"not-allowed":"pointer"};
  opacity: ${t=>t.disabled?.6:1};
`,oo=s.div`
  margin-top: 24px;
  padding: 16px;
  background-color: #f0f0f0;
  border-radius: 8px;
`,so=s.h3`
  margin: 0 0 12px 0;
  font-size: 16px;
`,ro=s.pre`
  margin: 0;
  font-size: 12px;
  white-space: pre-wrap;
  max-height: 200px;
  overflow-y: auto;
`,no=s.div`
  margin-bottom: 4px;
`,io=s.input`
  display: none;
`,ao=s.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 4px 0;
  gap: 15px; /* Small gap for consistent spacing */
`,lo=s.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  line-height: 24px; /* Added line-height to better align with taller toggle */
`,co=s.label`
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
`,po=s.span`
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
`,uo=s.div`
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
`,go=s.div`
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`,fo=s.div`
  font-size: 18px;
  font-weight: 500;
  color: white;
  background-color: #888;
  padding: 15px 20px;
  text-align: center;
`,xo=s.div`
  direction: ${t=>t.isRTL?"rtl":"ltr"};
  padding: 30px;
`,xe=s.p`
  margin-bottom: 15px;
  font-size: 16px;
`,ho=s.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 25px;
  margin-top: 20px;
  box-sizing: border-box;
`,mo=s.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
`,M=s.div`
  display: flex;
  align-items: center;
  cursor: ${t=>t.disabled?"not-allowed":"pointer"};
  opacity: ${t=>t.disabled?.7:1};
`,L=s.input`
  margin-right: 10px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  
  &:disabled {
    cursor: not-allowed;
  }
`,W=s.label`
  display: flex;
  cursor: ${t=>t.disabled?"not-allowed":"pointer"};
  font-size: 16px;
`,Y=s.span`
  color: #aaa;
  margin-left: 8px;
`,bo=s.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`,he=s.button`
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
`,wo=({isOpen:t,onClose:C,initialOption:S="noPassword",initialPassword:P=""})=>{const{t:p,language:f}=me(),y=be(f)==="rtl",[b,U]=a.useState(S),[h,T]=a.useState(P);if(a.useEffect(()=>{t&&(U(S),T(P))},[t,S,P]),!t)return null;const l=h.trim()==="",j=m=>{m!=="noPassword"&&l||U(m)},V=m=>{m.target===m.currentTarget&&C()};return e.jsx(uo,{onClick:V,children:e.jsxs(go,{children:[e.jsx(fo,{children:p("Album Password Policy")}),e.jsxs(xo,{isRTL:y,children:[e.jsx(xe,{children:p("Enter a password for this album.")}),e.jsx(xe,{children:p("Select what can be done with photos and videos without a password.")}),e.jsx(ho,{type:"text",placeholder:p("Enter password"),value:h,onChange:m=>T(m.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"}),e.jsxs(mo,{children:[e.jsxs(M,{disabled:l,children:[e.jsx(L,{type:"radio",name:"protection",id:"notVisible",checked:b==="notVisible",onChange:()=>{},disabled:l,onClick:()=>!l&&j("notVisible")}),e.jsxs(W,{htmlFor:"notVisible",disabled:l,children:[p("Not Visible"),l&&e.jsx(Y,{children:p("Password required")})]})]}),e.jsxs(M,{disabled:l,children:[e.jsx(L,{type:"radio",name:"protection",id:"watermark",checked:b==="watermark",onChange:()=>{},disabled:l,onClick:()=>!l&&j("watermark")}),e.jsxs(W,{htmlFor:"watermark",disabled:l,children:[p("Watermark"),l&&e.jsx(Y,{children:p("Password required")})]})]}),e.jsxs(M,{disabled:l,children:[e.jsx(L,{type:"radio",name:"protection",id:"cannotBeSaved",checked:b==="cannotBeSaved",onChange:()=>{},disabled:l,onClick:()=>!l&&j("cannotBeSaved")}),e.jsxs(W,{htmlFor:"cannotBeSaved",disabled:l,children:[p("Cannot Be Saved"),l&&e.jsx(Y,{children:p("Password required")})]})]}),e.jsxs(M,{disabled:!1,children:[e.jsx(L,{type:"radio",name:"protection",id:"noPassword",checked:b==="noPassword",onChange:()=>{},onClick:()=>j("noPassword")}),e.jsx(W,{htmlFor:"noPassword",disabled:!1,children:p("No Password")})]})]}),e.jsxs(bo,{children:[e.jsx(he,{onClick:()=>C(),children:p("Cancel")}),e.jsx(he,{onClick:()=>{console.log(`Saving with option: ${b}, password: ${h.length>0?"********":"none"}`),C(b,h)},children:p("Save")})]})]})]})})};var ve=(t=>(t.NotVisible="NotVisible",t.Watermark="Watermark",t.CannotBeSaved="CannotBeSaved",t.NoPassword="NoPassword",t))(ve||{});const Po=`
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
          profileIds
        }          
      }
    }
  }
`,yo=()=>{const{t,language:C}=me(),S=be(C)==="rtl",[P,p]=a.useState(null),[f,y]=a.useState([]),[b,U]=a.useState([]),[h,T]=a.useState(null),[l,j]=a.useState(null),[V,m]=a.useState(!1),[z,H]=a.useState(""),[X,q]=a.useState(""),[Se,Ie]=a.useState(!1),[Z,G]=a.useState(!1),[x,ee]=a.useState({totalFiles:0,filesComplete:0,filesUploading:0,filesProcessing:0,filesWithError:0,overallProgress:0}),[I,w]=a.useState(!1),[te,oe]=a.useState(""),[se,re]=a.useState(""),[je,K]=a.useState(!1),[ne,ie]=a.useState(!1),[v,_]=a.useState("noPassword"),[B,O]=a.useState(""),[N,ae]=a.useState(!0),[le,F]=a.useState(null),J=at(U),_e=it(y);a.useEffect(()=>{ke()},[]),a.useEffect(()=>{f.length>0&&localStorage.setItem($.SELECTED_PHOTOS,JSON.stringify(f))},[f]),a.useEffect(()=>{st(f,ee)},[f]);const ke=async()=>{w(!1);try{const o=await A();if(!o)return;try{const r=localStorage.getItem("publicUsername");T(r||null);const n=JSON.parse(atob(o.split(".")[1]))["cognito:username"];n&&(j(n),await Ce(n))}catch(r){console.error("User data initialization error:",r)}Fe(),De()}catch(o){console.error("Initialization error:",o)}},Ce=async o=>{try{const i=new URLSearchParams(window.location.search).get("folderId");if(i){p(i);try{const n=await Te(i);if(n){const c=`${o}_____${o}____Account`,d=n.creatorId===c;if(F(d),d)switch(K(!0),oe(n.folderName),re(n.folderDescription),ae(n.isOnPublicProfile),n.passwordPolicy){case"NoPassword":_("noPassword");break;case"NotVisible":_("notVisible"),O(n.password);break;case"Watermark":_("watermark"),O(n.password);break;case"CannotBeSaved":_("cannotBeSaved"),O(n.password);break;default:_("noPassword")}else K(!1)}else F(!1)}catch(n){console.error("Error fetching folder details:",n),F(!1)}}else{const n=`${o}_____${ue()}____Folder`;p(n),F(!0),K(!0)}}catch(r){console.error("Folder ID initialization error:",r),F(!1)}},Te=async o=>{var r,i,n,c,d,u;try{const g=await A();if(!g)return null;const E=await(await fetch(Q,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${g}`},body:JSON.stringify({query:Po,variables:{folderIds:[o]}})})).json();if(E.errors)return console.error("GraphQL errors:",E.errors),null;const pe=((i=(r=E==null?void 0:E.data)==null?void 0:r.fetchFolders)==null?void 0:i.items)||[];if(pe.length===0)return null;const k=pe[0],Qe=((c=(n=k.folderPosition)==null?void 0:n.profileIds)==null?void 0:c.some(Ye=>Ye.includes("Public____Profile")))||!1;return{creatorId:k.creatorId||"",folderName:k.folderName||"",folderDescription:k.folderDescription||"",passwordPolicy:((d=k.folderPassword)==null?void 0:d.policy)||"NoPassword",password:((u=k.folderPassword)==null?void 0:u.password)||"",isOnPublicProfile:Qe}}catch(g){return console.error("Error in fetchFolderDetails:",g),null}},Fe=()=>{try{const o=localStorage.getItem($.SELECTED_PHOTOS);if(o)try{const r=JSON.parse(o);Array.isArray(r)&&r.length>0&&y(r)}catch(r){console.error("Error parsing stored photos:",r)}}catch(o){console.error("Error restoring photos from storage:",o)}},De=()=>{try{rt||console.error("S3 client not available")}catch(o){console.error("S3 connection test error:",o)}},Ee=()=>{ae(!N)},$e=o=>{const r=f.filter((i,n)=>n!==o);y(r),r.length>0?localStorage.setItem($.SELECTED_PHOTOS,JSON.stringify(r)):localStorage.removeItem($.SELECTED_PHOTOS)},Ae=async o=>{if(!l)return;const r=Array.from(o.target.files||[]);if(r.length)try{const i=Ue(r);y(d=>[...d,...i]);const n=f.length,c=await nt(r,l,(d,u,g,D)=>{_e(n+d,u,g,D)},J);ze(n,c)}catch(i){console.error("Error in handleAddPhotos:",i)}finally{o.target.value=""}},Ue=o=>o.map(r=>{const i=r.type,n=r.name.split(".").pop()||"jpg";return{fileName:`${ue()}.${n}`,s3PreviewUrl:URL.createObjectURL(r),type:i,size:r.size,status:"pending",progress:0}}),ze=(o,r)=>{y(i=>{const n=[...i];return r.forEach((c,d)=>{const u=o+d;u<n.length&&(n[u]=c)}),n})},Be=async()=>{w(!0);try{if(h!=null&&h.startsWith("Profile-")){H(h),m(!0),w(!1);return}de()}catch(o){console.error("Error in handleSaveAlbum:",o),w(!1)}},de=async()=>{w(!0);try{if(!await Oe()){w(!1);return}const o=f.filter(g=>g.status==="complete"),r=Math.floor(Date.now()/1e3),i=`${l}_____${l}____Account`,c=P.split("_____")[1].split("____")[0];await lt(o,Ne,J);const d=Re(r,i,c,o),u=Me(o,r,i);await Le(d,u)}catch(o){console.error("Error in saveAlbumDirectly:",o),w(!1)}},Oe=async()=>!(!await A()||!l||!P),Ne=o=>{const r=document.getElementById("saveProgress");r&&(r.style.width=`${o}%`)},Re=(o,r,i,n)=>{const c=N?[`${l}_____Public____Profile`]:["Only Me_____Only Me____Profile"];return{currentTime:o,folderId:P,profileIds:c,folderPositionSelectedTagInputs:[],folderPositionPoints:1,acceptedFileReferenceIds:n.map(d=>`${i}_____${d.fileName}____FileReference`),hiddenFileReferenceIds:[],folderInput:{folderSelectedTagInputs:[],folderAboutContactIds:[r],folderName:te,folderDescription:se,folderPasswordInput:{password:v!=="noPassword"?B:null,policy:ve[v.charAt(0).toUpperCase()+v.slice(1)]},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,usingFolderInviteGrantsRightToRemoveItems:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:!0,addedItemsNeedFolderCreatorApproval:!1}}}},Me=(o,r,i)=>o.map(n=>{var u;const c=n.type==="video"||(u=n.type)!=null&&u.startsWith("video")?`Input/Video/${n.fileName}`:`Input/Image/${n.fileName}`,d=`${l}_____${n.fileName}____File`;return{fileReferencesHolderId:P,currentTime:r,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:d,fileInput:{fileId:d,ownerFileInput:{editorContactIds:[i],FileSharingOptionsEnum:"Anyone",dataKey:c,thumbnailDataKey:n.thumbnailDataKey,dataInBytes:n.size,thumbnailDataInBytes:n.thumbnailSize||0,s3UploadedAt:r,durationInSeconds:n.duration},editorFileInput:{aboutContactIds:[i],captionText:"",numericFilterInputs:[]}}}}),Le=async(o,r)=>{const i=document.getElementById("saveProgressText");i&&(i.innerText=t("Finalizing album..."));const n=await A();if(!n){w(!1);return}const c=`
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
    `,d={folderPositionInputs:[o],updatedFileReferenceInputs:r},g=await(await fetch(Q,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({query:c,variables:d})})).json();g.errors?(console.error("Upload failed:",g.errors),w(!1)):We()},We=()=>{dt(y,ee,[$.SELECTED_PHOTOS],J);const o=document.getElementById("saveProgressText");o&&(o.innerText=t("Album saved successfully!")),sessionStorage.setItem("album_just_saved","true"),setTimeout(()=>{window.location.href="/my-albums.html"},1e3)},Ve=o=>/^[a-zA-Z0-9-]+$/.test(o),ce=async o=>{var c,d;G(!0),q("");const r=await A();if(!r){G(!1);return}const i=`
      mutation MyMutation($savePublicProfileDisplayNameInput: SavePublicProfileDisplayNameInput) {
        changeMyAccountItem(savePublicProfileDisplayNameInput: $savePublicProfileDisplayNameInput) {
          ... on Profile {
            anyDisplayName
          }
        }
      }
    `,n={savePublicProfileDisplayNameInput:{anyDisplayName:o}};try{const g=await(await fetch(Q,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({query:i,variables:n})})).json(),D=(d=(c=g==null?void 0:g.data)==null?void 0:c.changeMyAccountItem)==null?void 0:d.anyDisplayName;if(D)He(D);else throw new Error("Username taken")}catch{q(t("Username is already taken. Please try a different one.")),Ie(!0),G(!1)}},He=o=>{localStorage.setItem("publicUsername",o),T(o),m(!1),de()},qe=()=>{const o=Math.floor(1e5+Math.random()*9e5).toString(),r=`${z}${o}`;H(r),ce(r)},Ge=(o,r)=>{o&&_(o),r!==void 0&&O(r),ie(!1)},Ke=()=>v==="noPassword"?t("Album Password Policy"):`${t(v==="notVisible"?"Not Visible":v==="watermark"?"Watermark":"Cannot Be Saved")} ${B?`(${B})`:""}`,Je=()=>{ie(!0)};return e.jsxs(e.Fragment,{children:[e.jsx(ct,{}),e.jsxs(pt,{isRTL:S,children:[e.jsxs(ut,{children:[e.jsxs(gt,{children:[e.jsx(ft,{children:e.jsx(xt,{href:"/my-albums.html",children:t("My Albums")})}),h&&e.jsxs(ht,{children:[e.jsx(mt,{children:h}),e.jsx(ot,{t})]})]}),x.totalFiles>0&&e.jsxs(bt,{children:[e.jsx(wt,{children:t("Upload Progress")}),e.jsxs(Pt,{children:[e.jsxs(yt,{children:[e.jsxs("span",{children:[t("Overall Progress"),": ",Math.round(x.overallProgress*100),"%"]}),e.jsxs("span",{children:[x.filesComplete," ",t("of")," ",x.totalFiles," ",t("complete")]})]}),e.jsx(vt,{children:e.jsx(St,{progress:x.overallProgress})})]}),e.jsxs(It,{children:[x.filesUploading>0&&e.jsxs(R,{children:[t("Uploading"),": ",x.filesUploading]}),x.filesProcessing>0&&e.jsxs(R,{children:[t("Processing"),": ",x.filesProcessing]}),x.filesComplete>0&&e.jsxs(R,{children:[t("Complete"),": ",x.filesComplete]}),x.filesWithError>0&&e.jsxs(R,{isError:!0,children:[t("Failed"),": ",x.filesWithError]})]})]}),I&&e.jsxs(jt,{children:[e.jsx(_t,{children:t("Saving Album")}),e.jsx(kt,{id:"saveProgressText",children:t("Moving files...")}),e.jsx(Ct,{children:e.jsx(Tt,{id:"saveProgress",style:{width:"5%"}})})]}),e.jsx(io,{id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:Ae}),f.length>0&&e.jsxs(e.Fragment,{children:[e.jsxs(Ft,{children:[f.length," ",f.length>1?t("photos selected"):t("photo selected"),":"]}),e.jsx(Dt,{children:f.map((o,r)=>{var i,n;return e.jsxs(Et,{children:[e.jsx($t,{status:o.status,children:o.status==="complete"?"✓":o.status==="error"?"✕":o.status==="uploading"?"↑":o.status==="processing"?"⚙️":"•"}),e.jsxs(At,{children:[o.type==="video"||(i=o.type)!=null&&i.startsWith("video")?e.jsx(zt,{src:o.s3PreviewUrl,controls:!0}):e.jsx(Ut,{src:o.s3PreviewUrl,alt:o.fileName}),(o.status==="uploading"||o.status==="processing")&&e.jsx(Bt,{children:e.jsx(Ot,{progress:o.progress,status:o.status})})]}),e.jsxs(Nt,{children:[(n=o.type)!=null&&n.startsWith("video")?t("Video"):t("Image"),o.size&&` • ${(o.size/1024/1024).toFixed(1)} MB`,o.duration&&` • ${o.duration}s`]}),o.status==="error"&&o.errorMessage&&e.jsxs(Rt,{children:[t("Error"),": ",o.errorMessage.length>40?o.errorMessage.substring(0,37)+"...":o.errorMessage]}),e.jsx(Mt,{onClick:()=>$e(r),disabled:I,children:t("Remove")})]},r)})})]}),e.jsxs(Lt,{children:[je&&le===!0&&e.jsxs(Ht,{children:[e.jsxs(ge,{children:[e.jsx(fe,{htmlFor:"folderName",children:t("Album Name (Optional)")}),e.jsx(qt,{id:"folderName",type:"text",value:te,onChange:o=>oe(o.target.value),placeholder:t("Enter album name")})]}),e.jsxs(ge,{children:[e.jsx(fe,{htmlFor:"folderDescription",children:t("Album Description (Optional)")}),e.jsx(Gt,{id:"folderDescription",value:se,onChange:o=>re(o.target.value),placeholder:t("Enter album description"),rows:4})]}),e.jsxs(ao,{children:[e.jsx(lo,{children:t(N?"On Public Profile":"Not On Public Profile")}),e.jsxs(co,{children:[e.jsx("input",{type:"checkbox",checked:N,onChange:Ee,disabled:I}),e.jsx(po,{})]})]})]}),e.jsx(ye,{onClick:()=>{const o=document.getElementById("file-input");o==null||o.click()},disabled:I,children:t("Add More Photos")}),le===!0&&e.jsx(Vt,{passwordSet:v!=="noPassword",onClick:Je,disabled:I,children:Ke()}),e.jsx(Wt,{onClick:Be,disabled:I,children:t(I?"Saving Album...":"Save Album")})]}),V&&e.jsx(Kt,{children:e.jsxs(Jt,{isRTL:S,children:[e.jsx(Qt,{children:t("Enter Username")}),e.jsx(Yt,{children:t("Username should contain only letters, numbers and hyphens. Example: john-doe2")}),e.jsx(Xt,{value:z,onChange:o=>H(o.target.value),isRTL:S}),X&&e.jsx(Zt,{children:X}),e.jsx(eo,{disabled:Z,onClick:()=>{if(!Ve(z)){q(t("Username must contain only letters, numbers, and hyphens."));return}ce(z)},children:t("Select Username")}),Se&&e.jsx(to,{disabled:Z,onClick:qe,children:t("Add Random Digits to Username")})]})}),ne&&e.jsx(wo,{isOpen:ne,onClose:Ge,initialOption:v,initialPassword:B})]}),b.length>0&&e.jsxs(oo,{children:[e.jsx(so,{children:t("Debug Log")}),e.jsx(ro,{children:b.map((o,r)=>e.jsx(no,{children:o},r))})]})]})]})},vo=()=>e.jsx(Ze,{children:e.jsx(yo,{})});Xe.createRoot(document.getElementById("root")).render(e.jsx(vo,{}));
