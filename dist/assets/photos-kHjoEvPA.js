import{c as Vt,d as Kt,a as Qe,S as Xe,r as C,u as Ie,j as o,e as Ct,A as Jt,C as Ee,f as Yt,R as Xt,I as Zt,g as Re,b as Ze}from"./index-BQCoonNn.js";import{c as te,j as eo,k as to,l as oo,n as ro,o as no,q as io,r as so,t as ao,e as et,g as lo,d as co,u as tt,p as uo,v as re,w as be}from"./utils-MSJ8woNW.js";import{U as po,F as fo,d as ho}from"./FileInput-B9naD_EF.js";import{u as go,U as mo}from"./customHooks-BZkNMluP.js";import{d as b,l as Q,f as xo}from"./styled-components.browser.esm-CpMl8bPK.js";import{C as vo,S as yo,I as bo,R as wo}from"./SignUpCommand-BcArpizF.js";import{C as Co,a as Po}from"./Modals-DnhNNoZQ.js";import"./parseJsonBody-DJQpKj3E.js";const ot=`
  mutation FetchFolderPositions($fetchRelationsInput: FetchRelationsInput!) {
    fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
      items {
        ... on Folder {
          id
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
      nextToken
    }
  }
`,rt=(t,i)=>{var h,g,m,w,y;const n=((g=(h=t==null?void 0:t.data)==null?void 0:h.fetchRelations)==null?void 0:g.items)||[],d=[],f={};let s="Photos",l="",a,r=!1,e=!1,p,c=!1;const u=new Set;if(n.length>0){const x=n[0];i&&(x!=null&&x.id)&&i(x.id),x!=null&&x.folderName&&x.folderName.length>0&&(s=x.folderName),x!=null&&x.folderDescription&&x.folderDescription.length>0&&(l=x.folderDescription),x!=null&&x.folderPassword&&(x.folderPassword.policy&&(a=x.folderPassword.policy,r=a!=="NoPassword"),x.folderPassword.password&&a!=="NoPassword"&&(e=!0,p=x.folderPassword.password)),x!=null&&x.folderInviteParameters&&(c=!!x.folderInviteParameters.usingFolderInviteGrantsRightToAddItems),(((w=(m=n[0])==null?void 0:m.contactsUsingInvite)==null?void 0:w.items)||[]).forEach(T=>{var E;T!=null&&T.id&&((E=T==null?void 0:T.item)!=null&&E.publicDisplayName)&&(f[T.id]=T.item.publicDisplayName)}),(((y=x==null?void 0:x.fileReferencesPage)==null?void 0:y.items)||[]).forEach(T=>{const E=T==null?void 0:T.file;if(!(E!=null&&E.dataKey))return;const{id:N,dataKey:k,thumbnailDataKey:R,durationInSeconds:B,ownerContactId:M}=E;if(u.has(k))return;u.add(k);const D=`${Xe}${k}`,_=R?`${Xe}${R}`:void 0;k.startsWith("Input/Image/")?d.push({type:"image",fileId:N,url:D,thumbnailUrl:_||D,ownerContactId:M,loaded:!1}):k.startsWith("Input/Video/")&&d.push({type:"video",fileId:N,url:D,thumbnailUrl:_||D,duration:eo(B),ownerContactId:M,loaded:!1})})}return{mediaItems:d,folderName:s,folderDescription:l,contacts:f,passwordPolicy:a,passwordRequired:r,hasPassword:e,actualPassword:p,usingFolderInviteGrantsRightToAddItems:c}},So=async(t,i)=>{var n,d,f,s;try{const a={fetchRelationsInput:{targetItemIdentifier____RelationType:`${t}____Folder`,index:"targetItemIdentifier____RelationType",limit:1,scanIndexForward:!1,nextToken:null}},r=fetch(Vt,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":Kt},body:JSON.stringify({query:ot,variables:a})}).then(h=>h.json()),e=(async()=>{const h=await te();return h?fetch(Qe,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${h}`},body:JSON.stringify({query:ot,variables:a})}).then(g=>g.json()):null})(),p=await r;let c=rt(p,i);const u=await e;if(u){const h=(s=(f=(d=(n=u==null?void 0:u.data)==null?void 0:n.fetchRelations)==null?void 0:d.items)==null?void 0:f[0])==null?void 0:s.folderPosition;if(h){const g=rt(u,i);g.folderPositionId=h==null?void 0:h.id,g.profileIds=h==null?void 0:h.profileIds,c=g}}return c}catch(l){return console.error("Error fetching folder data:",l),null}},Io=b.div`
  font-family: Helvetica, Arial, sans-serif;
  max-width: 1200px;
  margin: auto;
  background: #f9fafb;
  color: #333;
  line-height: 1.5;
  padding: 20px;
  width: 100%;
  overflow-x: hidden;
  min-height: 100vh; // Use viewport height
  display: flex;
  flex-direction: column;
  
  @media (max-width: 767px) {
    padding: 10px;
  }
`,ko=b.div`
  position: sticky;
  top: 0;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0,0,0,0.06);
  z-index: 10;
  margin-bottom: 10px;
  width: 100%;
`,To=b.div`
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  
  @media (max-width: 767px) {
    padding: 16px 16px;
  }
`,jo=b.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 5px;
  gap: 10px;
  flex-wrap: wrap;
`,Eo=b.button`
  background: transparent;
  color: #006adc;
  border: 1px solid #006adc;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
  margin-right: auto; // This will push it to the left
  height: 36px; // Set a fixed height to match other buttons
  display: flex;
  align-items: center; // Center text vertically
`,Ro=b.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`,J=b.button`
  background: transparent;
  color: #006adc;
  border: 1px solid #006adc;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
`,Pt=b.button`
  background: transparent;
  color: #006adc;
  border: 1px solid #006adc;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
`,St=b.span`
  width: 18px;
  height: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`,ie=b.span`
  height: 2px;
  background: #006adc;
  width: 100%;
`,It=b.div`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 100;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-radius: 4px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 180px;
  margin-top: 4px;
`,Ce=b.button`
  background: transparent;
  color: #006adc;
  border: 1px solid #006adc;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  width: 100%;
  text-align: left;
`,Lo=b.h2`
  font-weight: 400;
  margin: 0 0 16px 0;
  font-size: 24px;
  padding: 0;
  
  @media (max-width: 767px) {
    padding: 0;
  }
`,Ao=b.strong`
  font-weight: 700;
`,_o=b.div`
  padding: 0 24px 20px;
  width: 100%;
  overflow: visible; // Allow content to flow naturally
  
  @media (max-width: 767px) {
    padding: 0 16px 15px;
    width: 100%;
  }
`,Bo=b.div`
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  width: 100%;
`,Mo=b.p`
  color: #333;
  margin: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  max-width: 100%;
`,Oo=b.div`
  display: grid;
  grid-gap: 20px;
  width: 100%;
  min-height: 0; // Allow proper sizing
  
  ${t=>{switch(t.columns){case"1":return Q`grid-template-columns: repeat(1, 1fr);`;case"2":return Q`grid-template-columns: repeat(2, 1fr);`;case"3":return Q`grid-template-columns: repeat(3, 1fr);`;case"4":return Q`grid-template-columns: repeat(4, 1fr);`;case"5":return Q`grid-template-columns: repeat(5, 1fr);`;default:return Q`grid-template-columns: repeat(1, 1fr);`}}}
  
  @media (max-width: 767px) {
    grid-gap: 8px;
    ${t=>{const i=parseInt(t.columns);return i>3?Q`grid-template-columns: repeat(3, minmax(0, 1fr));`:i>1?Q`grid-template-columns: repeat(${i}, minmax(0, 1fr));`:Q`grid-template-columns: repeat(1, minmax(0, 1fr));`}}
  }
`,No=b.div`
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: transform 0.2s;
  position: relative;
  height: auto; // Allow natural height
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  margin-bottom: 20px; // Add bottom margin for spacing
  
  ${t=>t.isHovered&&Q`
    transform: translateY(-2px);
  `}
  
  ${t=>t.isVideo&&Q`
    cursor: pointer;
  `}
  
  @media (max-width: 767px) {
    border-radius: 4px;
    margin-bottom: 10px; // Less margin on mobile
  }
`,Do=b.div`
  position: relative;
  overflow: hidden;
  background-color: #f0f0f0;
  width: 100%;
  padding-bottom: 75%; // Create a consistent aspect ratio (4:3)
  height: 0; // Use padding-bottom for aspect ratio
  
  @media (max-width: 767px) {
    padding-bottom: 100%; // Square aspect ratio on mobile
  }
`,nt=b.div`
  position: relative;
  overflow: hidden;
  background-color: #f0f0f0;
  width: 100%;
  min-height: 200px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 767px) {
    min-height: 120px;
    aspect-ratio: 1/1;
    height: 0;
    padding-bottom: 100%;
  }
`,zo=b.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  transition: opacity 0.3s;
  opacity: ${t=>t.isLoaded?1:0};
`,Uo=b.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading-animation 1.5s infinite;
  z-index: 0;
`,Fo=b.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: rgba(255,255,255,0.85);
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 500;
  z-index: 3;
  border-radius: 3px;
  
  @media (max-width: 767px) {
    padding: 3px 6px;
    font-size: 10px;
    bottom: 8px;
    right: 8px;
    max-width: 45%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`,$o=b.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background-color: rgba(0,0,0,0.7);
  border-radius: 50%;
  z-index: 2;
  
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 55%;
    transform: translate(-50%, -50%);
    border-style: solid;
    border-width: 15px 0 15px 25px;
    border-color: transparent transparent transparent white;
  }
  
  @media (max-width: 767px) {
    width: 40px;
    height: 40px;
    
    &::before {
      border-width: 10px 0 10px 16px;
    }
  }
`,Wo=b.div`
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 4px 8px;
  font-size: 14px;
  border-radius: 4px;
  font-weight: 500;
  z-index: 2;
  
  @media (max-width: 767px) {
    padding: 2px 6px;
    font-size: 12px;
  }
`,Le=b.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #d32f2f;
  grid-column: 1 / -1;
  width: 100%;
`,Ho=b.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
  grid-column: 1 / -1;
  width: 100%;
`,qo=b.label`
  margin-right: 8px;
  font-size: 14px;
  color: #555;
  font-weight: normal;
`,Go=b.select`
  padding: 5px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  font-size: 14px;
  min-width: 50px;
`,Qo=b.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`,Vo=b.div`
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 767px) {
    padding: 16px;
    width: 90%;
  }
`;b.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;b.div`
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
`;b.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
  
  @media (max-width: 767px) {
    font-size: 18px;
  }
`;b.ol`
  list-style-type: decimal;
  padding-left: 20px;
`;b.li`
  margin-bottom: 12px;
  font-size: 16px;
  
  @media (max-width: 767px) {
    font-size: 14px;
  }
`;b.button`
  margin-top: 16px;
  padding: 8px 16px;
  background-color: #006adc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;const kt=b.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 4;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 500;
  text-align: center;
  padding: 0 10px;
`;b.p`
  font-style: italic;
  margin-top: 12px;
  margin-bottom: 12px;
  text-align: center;
  
  @media (max-width: 767px) {
    font-size: 14px;
  }
`;const Ko=xo`
  @keyframes loading-animation {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  
  /* Added to ensure proper display on mobile */
  * {
    box-sizing: border-box;
    -webkit-text-size-adjust: 100%;
  }
  
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }
  
  #root {
    width: 100%;
    overflow-x: hidden;
  }
`,Jo=b(jo)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  
  > div {
    width: auto;
    display: flex;
    align-items: center;
  }
`;b(No)`
  ${t=>t.isSelected&&`
    border: 3px solid #006adc;
    box-shadow: 0 0 0 3px rgba(0, 106, 220, 0.3);
  `}
`;const Yo=b.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${t=>t.isSelected?"#006adc":"rgba(255, 255, 255, 0.8)"};
  border: ${t=>t.isSelected?"none":"2px solid #006adc"};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`,Xo=b.div`
  padding: 10px 20px;
  background-color: #f0f7ff;
  border-radius: 4px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`,Zo=b.div`
  color: white;
  font-size: 14px;
  font-weight: bold;
`,Pe=b.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 5;
`,Se=b.div`
  color: white;
  font-size: 24px;
  font-weight: bold;
  transform: rotate(-30deg);
  opacity: 0.7;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
  user-select: none;
  white-space: nowrap;
`,it=b(J)`
  background-color: #4caf50;
  color: white;
  &:hover {
    background-color: #45a049;
  }
`,er=b.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 2000;
  display: flex;
  flex-direction: column;
`,qe=b.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 16px;
  padding: 5px 10px;
  cursor: ${t=>t.isDisabled?"not-allowed":"pointer"};
  opacity: ${t=>t.isDisabled?.5:1};
`,tr=b(qe)``,or=b.div`
  display: flex;
  gap: 10px;
`,rr=b.a`
  text-decoration: none;
  color: white;
  background-color: #006adc;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
`,nr=b.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  opacity: ${t=>t.isLoaded?1:0};
  transition: opacity 0.3s;
`,ir=b.img`
  position: absolute;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  opacity: 0.5;
`,sr=b.video`
  max-width: 100%;
  max-height: 100%;
`,ar=b.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  z-index: 10;
`,st=b.div`
  position: relative;
`,lr=b.div`
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
`,dr=b.div`
  padding: 15px;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
`,cr=b.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  padding: 10px;
  position: relative;
`,ur=({item:t,index:i,onClose:n,onPrev:d,onNext:f,hasNext:s,hasPrev:l,ownerName:a,showWatermark:r=!1})=>{const[e,p]=C.useState(!1),[c,u]=C.useState(!0),{t:h}=Ie();C.useEffect(()=>{const m=w=>{w.key==="Escape"?n():w.key==="ArrowLeft"&&l?d():w.key==="ArrowRight"&&s&&f()};return window.addEventListener("keydown",m),()=>window.removeEventListener("keydown",m)},[n,f,d,s,l]);const g=m=>(m==null?void 0:m.split("_____")[0])||"";return o.jsxs(er,{children:[o.jsxs(lr,{children:[o.jsx(tr,{onClick:n,children:h("Back")}),o.jsxs(or,{children:[o.jsx(qe,{onClick:l?d:void 0,disabled:!l,isDisabled:!l,children:"←"}),o.jsx(qe,{onClick:s?f:void 0,disabled:!s,isDisabled:!s,children:"→"})]})]}),o.jsxs(cr,{children:[t.type==="image"?o.jsxs(st,{children:[o.jsx(nr,{src:t.url,alt:`Image ${i+1}`,isLoaded:e,onLoad:()=>{p(!0),u(!1)}}),r&&o.jsx(Pe,{children:o.jsx(Se,{children:"6180 Watermarked"})}),!e&&t.thumbnailUrl&&o.jsx(ir,{src:t.thumbnailUrl,alt:`Thumbnail ${i+1}`})]}):o.jsxs(st,{children:[o.jsxs(sr,{controls:!0,autoPlay:!0,onLoadedData:()=>u(!1),children:[o.jsx("source",{src:t.url,type:"video/mp4"}),h("Your browser does not support the video tag.")]}),r&&o.jsx(Pe,{children:o.jsx(Se,{children:"6180 Watermarked"})})]}),c&&o.jsx(ar,{children:t.type==="image"?h("Loading full resolution..."):h("Loading video...")})]}),o.jsx(dr,{children:t.ownerContactId&&o.jsxs(rr,{href:`/profile.html?id=${g(t.ownerContactId)}`,children:[o.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[o.jsx("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),o.jsx("circle",{cx:"12",cy:"7",r:"4"})]}),a]})})]})};var ne={},Ae={exports:{}},_e,at;function pr(){if(at)return _e;at=1;var t="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";return _e=t,_e}var Be,lt;function fr(){if(lt)return Be;lt=1;var t=pr();function i(){}function n(){}return n.resetWarningCache=i,Be=function(){function d(l,a,r,e,p,c){if(c!==t){var u=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw u.name="Invariant Violation",u}}d.isRequired=d;function f(){return d}var s={array:d,bigint:d,bool:d,func:d,number:d,object:d,string:d,symbol:d,any:d,arrayOf:f,element:d,elementType:d,instanceOf:f,node:d,objectOf:f,oneOf:f,oneOfType:f,shape:f,exact:f,checkPropTypes:n,resetWarningCache:i};return s.PropTypes=s,s},Be}var dt;function Tt(){return dt||(dt=1,Ae.exports=fr()()),Ae.exports}var Me,ct;function jt(){return ct||(ct=1,Me={L:1,M:0,Q:3,H:2}),Me}var Oe,ut;function Et(){return ut||(ut=1,Oe={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8}),Oe}var Ne,pt;function hr(){if(pt)return Ne;pt=1;var t=Et();function i(n){this.mode=t.MODE_8BIT_BYTE,this.data=n}return i.prototype={getLength:function(n){return this.data.length},write:function(n){for(var d=0;d<this.data.length;d++)n.put(this.data.charCodeAt(d),8)}},Ne=i,Ne}var De,ft;function gr(){if(ft)return De;ft=1;var t=jt();function i(n,d){this.totalCount=n,this.dataCount=d}return i.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],i.getRSBlocks=function(n,d){var f=i.getRsBlockTable(n,d);if(f==null)throw new Error("bad rs block @ typeNumber:"+n+"/errorCorrectLevel:"+d);for(var s=f.length/3,l=new Array,a=0;a<s;a++)for(var r=f[a*3+0],e=f[a*3+1],p=f[a*3+2],c=0;c<r;c++)l.push(new i(e,p));return l},i.getRsBlockTable=function(n,d){switch(d){case t.L:return i.RS_BLOCK_TABLE[(n-1)*4+0];case t.M:return i.RS_BLOCK_TABLE[(n-1)*4+1];case t.Q:return i.RS_BLOCK_TABLE[(n-1)*4+2];case t.H:return i.RS_BLOCK_TABLE[(n-1)*4+3];default:return}},De=i,De}var ze,ht;function mr(){if(ht)return ze;ht=1;function t(){this.buffer=new Array,this.length=0}return t.prototype={get:function(i){var n=Math.floor(i/8);return(this.buffer[n]>>>7-i%8&1)==1},put:function(i,n){for(var d=0;d<n;d++)this.putBit((i>>>n-d-1&1)==1)},getLengthInBits:function(){return this.length},putBit:function(i){var n=Math.floor(this.length/8);this.buffer.length<=n&&this.buffer.push(0),i&&(this.buffer[n]|=128>>>this.length%8),this.length++}},ze=t,ze}var Ue,gt;function Rt(){if(gt)return Ue;gt=1;for(var t={glog:function(n){if(n<1)throw new Error("glog("+n+")");return t.LOG_TABLE[n]},gexp:function(n){for(;n<0;)n+=255;for(;n>=256;)n-=255;return t.EXP_TABLE[n]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},i=0;i<8;i++)t.EXP_TABLE[i]=1<<i;for(var i=8;i<256;i++)t.EXP_TABLE[i]=t.EXP_TABLE[i-4]^t.EXP_TABLE[i-5]^t.EXP_TABLE[i-6]^t.EXP_TABLE[i-8];for(var i=0;i<255;i++)t.LOG_TABLE[t.EXP_TABLE[i]]=i;return Ue=t,Ue}var Fe,mt;function Lt(){if(mt)return Fe;mt=1;var t=Rt();function i(n,d){if(n.length==null)throw new Error(n.length+"/"+d);for(var f=0;f<n.length&&n[f]==0;)f++;this.num=new Array(n.length-f+d);for(var s=0;s<n.length-f;s++)this.num[s]=n[s+f]}return i.prototype={get:function(n){return this.num[n]},getLength:function(){return this.num.length},multiply:function(n){for(var d=new Array(this.getLength()+n.getLength()-1),f=0;f<this.getLength();f++)for(var s=0;s<n.getLength();s++)d[f+s]^=t.gexp(t.glog(this.get(f))+t.glog(n.get(s)));return new i(d,0)},mod:function(n){if(this.getLength()-n.getLength()<0)return this;for(var d=t.glog(this.get(0))-t.glog(n.get(0)),f=new Array(this.getLength()),s=0;s<this.getLength();s++)f[s]=this.get(s);for(var s=0;s<n.getLength();s++)f[s]^=t.gexp(t.glog(n.get(s))+d);return new i(f,0).mod(n)}},Fe=i,Fe}var $e,xt;function xr(){if(xt)return $e;xt=1;var t=Et(),i=Lt(),n=Rt(),d={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},f={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(s){for(var l=s<<10;f.getBCHDigit(l)-f.getBCHDigit(f.G15)>=0;)l^=f.G15<<f.getBCHDigit(l)-f.getBCHDigit(f.G15);return(s<<10|l)^f.G15_MASK},getBCHTypeNumber:function(s){for(var l=s<<12;f.getBCHDigit(l)-f.getBCHDigit(f.G18)>=0;)l^=f.G18<<f.getBCHDigit(l)-f.getBCHDigit(f.G18);return s<<12|l},getBCHDigit:function(s){for(var l=0;s!=0;)l++,s>>>=1;return l},getPatternPosition:function(s){return f.PATTERN_POSITION_TABLE[s-1]},getMask:function(s,l,a){switch(s){case d.PATTERN000:return(l+a)%2==0;case d.PATTERN001:return l%2==0;case d.PATTERN010:return a%3==0;case d.PATTERN011:return(l+a)%3==0;case d.PATTERN100:return(Math.floor(l/2)+Math.floor(a/3))%2==0;case d.PATTERN101:return l*a%2+l*a%3==0;case d.PATTERN110:return(l*a%2+l*a%3)%2==0;case d.PATTERN111:return(l*a%3+(l+a)%2)%2==0;default:throw new Error("bad maskPattern:"+s)}},getErrorCorrectPolynomial:function(s){for(var l=new i([1],0),a=0;a<s;a++)l=l.multiply(new i([1,n.gexp(a)],0));return l},getLengthInBits:function(s,l){if(1<=l&&l<10)switch(s){case t.MODE_NUMBER:return 10;case t.MODE_ALPHA_NUM:return 9;case t.MODE_8BIT_BYTE:return 8;case t.MODE_KANJI:return 8;default:throw new Error("mode:"+s)}else if(l<27)switch(s){case t.MODE_NUMBER:return 12;case t.MODE_ALPHA_NUM:return 11;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 10;default:throw new Error("mode:"+s)}else if(l<41)switch(s){case t.MODE_NUMBER:return 14;case t.MODE_ALPHA_NUM:return 13;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 12;default:throw new Error("mode:"+s)}else throw new Error("type:"+l)},getLostPoint:function(s){for(var l=s.getModuleCount(),a=0,r=0;r<l;r++)for(var e=0;e<l;e++){for(var p=0,c=s.isDark(r,e),u=-1;u<=1;u++)if(!(r+u<0||l<=r+u))for(var h=-1;h<=1;h++)e+h<0||l<=e+h||u==0&&h==0||c==s.isDark(r+u,e+h)&&p++;p>5&&(a+=3+p-5)}for(var r=0;r<l-1;r++)for(var e=0;e<l-1;e++){var g=0;s.isDark(r,e)&&g++,s.isDark(r+1,e)&&g++,s.isDark(r,e+1)&&g++,s.isDark(r+1,e+1)&&g++,(g==0||g==4)&&(a+=3)}for(var r=0;r<l;r++)for(var e=0;e<l-6;e++)s.isDark(r,e)&&!s.isDark(r,e+1)&&s.isDark(r,e+2)&&s.isDark(r,e+3)&&s.isDark(r,e+4)&&!s.isDark(r,e+5)&&s.isDark(r,e+6)&&(a+=40);for(var e=0;e<l;e++)for(var r=0;r<l-6;r++)s.isDark(r,e)&&!s.isDark(r+1,e)&&s.isDark(r+2,e)&&s.isDark(r+3,e)&&s.isDark(r+4,e)&&!s.isDark(r+5,e)&&s.isDark(r+6,e)&&(a+=40);for(var m=0,e=0;e<l;e++)for(var r=0;r<l;r++)s.isDark(r,e)&&m++;var w=Math.abs(100*m/l/l-50)/5;return a+=w*10,a}};return $e=f,$e}var We,vt;function vr(){if(vt)return We;vt=1;var t=hr(),i=gr(),n=mr(),d=xr(),f=Lt();function s(a,r){this.typeNumber=a,this.errorCorrectLevel=r,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}var l=s.prototype;return l.addData=function(a){var r=new t(a);this.dataList.push(r),this.dataCache=null},l.isDark=function(a,r){if(a<0||this.moduleCount<=a||r<0||this.moduleCount<=r)throw new Error(a+","+r);return this.modules[a][r]},l.getModuleCount=function(){return this.moduleCount},l.make=function(){if(this.typeNumber<1){var a=1;for(a=1;a<40;a++){for(var r=i.getRSBlocks(a,this.errorCorrectLevel),e=new n,p=0,c=0;c<r.length;c++)p+=r[c].dataCount;for(var c=0;c<this.dataList.length;c++){var u=this.dataList[c];e.put(u.mode,4),e.put(u.getLength(),d.getLengthInBits(u.mode,a)),u.write(e)}if(e.getLengthInBits()<=p*8)break}this.typeNumber=a}this.makeImpl(!1,this.getBestMaskPattern())},l.makeImpl=function(a,r){this.moduleCount=this.typeNumber*4+17,this.modules=new Array(this.moduleCount);for(var e=0;e<this.moduleCount;e++){this.modules[e]=new Array(this.moduleCount);for(var p=0;p<this.moduleCount;p++)this.modules[e][p]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(a,r),this.typeNumber>=7&&this.setupTypeNumber(a),this.dataCache==null&&(this.dataCache=s.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,r)},l.setupPositionProbePattern=function(a,r){for(var e=-1;e<=7;e++)if(!(a+e<=-1||this.moduleCount<=a+e))for(var p=-1;p<=7;p++)r+p<=-1||this.moduleCount<=r+p||(0<=e&&e<=6&&(p==0||p==6)||0<=p&&p<=6&&(e==0||e==6)||2<=e&&e<=4&&2<=p&&p<=4?this.modules[a+e][r+p]=!0:this.modules[a+e][r+p]=!1)},l.getBestMaskPattern=function(){for(var a=0,r=0,e=0;e<8;e++){this.makeImpl(!0,e);var p=d.getLostPoint(this);(e==0||a>p)&&(a=p,r=e)}return r},l.createMovieClip=function(a,r,e){var p=a.createEmptyMovieClip(r,e),c=1;this.make();for(var u=0;u<this.modules.length;u++)for(var h=u*c,g=0;g<this.modules[u].length;g++){var m=g*c,w=this.modules[u][g];w&&(p.beginFill(0,100),p.moveTo(m,h),p.lineTo(m+c,h),p.lineTo(m+c,h+c),p.lineTo(m,h+c),p.endFill())}return p},l.setupTimingPattern=function(){for(var a=8;a<this.moduleCount-8;a++)this.modules[a][6]==null&&(this.modules[a][6]=a%2==0);for(var r=8;r<this.moduleCount-8;r++)this.modules[6][r]==null&&(this.modules[6][r]=r%2==0)},l.setupPositionAdjustPattern=function(){for(var a=d.getPatternPosition(this.typeNumber),r=0;r<a.length;r++)for(var e=0;e<a.length;e++){var p=a[r],c=a[e];if(this.modules[p][c]==null)for(var u=-2;u<=2;u++)for(var h=-2;h<=2;h++)u==-2||u==2||h==-2||h==2||u==0&&h==0?this.modules[p+u][c+h]=!0:this.modules[p+u][c+h]=!1}},l.setupTypeNumber=function(a){for(var r=d.getBCHTypeNumber(this.typeNumber),e=0;e<18;e++){var p=!a&&(r>>e&1)==1;this.modules[Math.floor(e/3)][e%3+this.moduleCount-8-3]=p}for(var e=0;e<18;e++){var p=!a&&(r>>e&1)==1;this.modules[e%3+this.moduleCount-8-3][Math.floor(e/3)]=p}},l.setupTypeInfo=function(a,r){for(var e=this.errorCorrectLevel<<3|r,p=d.getBCHTypeInfo(e),c=0;c<15;c++){var u=!a&&(p>>c&1)==1;c<6?this.modules[c][8]=u:c<8?this.modules[c+1][8]=u:this.modules[this.moduleCount-15+c][8]=u}for(var c=0;c<15;c++){var u=!a&&(p>>c&1)==1;c<8?this.modules[8][this.moduleCount-c-1]=u:c<9?this.modules[8][15-c-1+1]=u:this.modules[8][15-c-1]=u}this.modules[this.moduleCount-8][8]=!a},l.mapData=function(a,r){for(var e=-1,p=this.moduleCount-1,c=7,u=0,h=this.moduleCount-1;h>0;h-=2)for(h==6&&h--;;){for(var g=0;g<2;g++)if(this.modules[p][h-g]==null){var m=!1;u<a.length&&(m=(a[u]>>>c&1)==1);var w=d.getMask(r,p,h-g);w&&(m=!m),this.modules[p][h-g]=m,c--,c==-1&&(u++,c=7)}if(p+=e,p<0||this.moduleCount<=p){p-=e,e=-e;break}}},s.PAD0=236,s.PAD1=17,s.createData=function(a,r,e){for(var p=i.getRSBlocks(a,r),c=new n,u=0;u<e.length;u++){var h=e[u];c.put(h.mode,4),c.put(h.getLength(),d.getLengthInBits(h.mode,a)),h.write(c)}for(var g=0,u=0;u<p.length;u++)g+=p[u].dataCount;if(c.getLengthInBits()>g*8)throw new Error("code length overflow. ("+c.getLengthInBits()+">"+g*8+")");for(c.getLengthInBits()+4<=g*8&&c.put(0,4);c.getLengthInBits()%8!=0;)c.putBit(!1);for(;!(c.getLengthInBits()>=g*8||(c.put(s.PAD0,8),c.getLengthInBits()>=g*8));)c.put(s.PAD1,8);return s.createBytes(c,p)},s.createBytes=function(a,r){for(var e=0,p=0,c=0,u=new Array(r.length),h=new Array(r.length),g=0;g<r.length;g++){var m=r[g].dataCount,w=r[g].totalCount-m;p=Math.max(p,m),c=Math.max(c,w),u[g]=new Array(m);for(var y=0;y<u[g].length;y++)u[g][y]=255&a.buffer[y+e];e+=m;var x=d.getErrorCorrectPolynomial(w),T=new f(u[g],x.getLength()-1),E=T.mod(x);h[g]=new Array(x.getLength()-1);for(var y=0;y<h[g].length;y++){var N=y+E.getLength()-h[g].length;h[g][y]=N>=0?E.get(N):0}}for(var k=0,y=0;y<r.length;y++)k+=r[y].totalCount;for(var R=new Array(k),B=0,y=0;y<p;y++)for(var g=0;g<r.length;g++)y<u[g].length&&(R[B++]=u[g][y]);for(var y=0;y<c;y++)for(var g=0;g<r.length;g++)y<h[g].length&&(R[B++]=h[g][y]);return R},We=s,We}var we={},yt;function yr(){if(yt)return we;yt=1,Object.defineProperty(we,"__esModule",{value:!0});var t=Object.assign||function(e){for(var p=1;p<arguments.length;p++){var c=arguments[p];for(var u in c)Object.prototype.hasOwnProperty.call(c,u)&&(e[u]=c[u])}return e},i=Tt(),n=s(i),d=Ct(),f=s(d);function s(e){return e&&e.__esModule?e:{default:e}}function l(e,p){var c={};for(var u in e)p.indexOf(u)>=0||Object.prototype.hasOwnProperty.call(e,u)&&(c[u]=e[u]);return c}var a={bgColor:n.default.oneOfType([n.default.object,n.default.string]).isRequired,bgD:n.default.string.isRequired,fgColor:n.default.oneOfType([n.default.object,n.default.string]).isRequired,fgD:n.default.string.isRequired,size:n.default.number.isRequired,title:n.default.string,viewBoxSize:n.default.number.isRequired,xmlns:n.default.string},r=(0,d.forwardRef)(function(e,p){var c=e.bgColor,u=e.bgD,h=e.fgD,g=e.fgColor,m=e.size,w=e.title,y=e.viewBoxSize,x=e.xmlns,T=x===void 0?"http://www.w3.org/2000/svg":x,E=l(e,["bgColor","bgD","fgD","fgColor","size","title","viewBoxSize","xmlns"]);return f.default.createElement("svg",t({},E,{height:m,ref:p,viewBox:"0 0 "+y+" "+y,width:m,xmlns:T}),w?f.default.createElement("title",null,w):null,f.default.createElement("path",{d:u,fill:c}),f.default.createElement("path",{d:h,fill:g}))});return r.displayName="QRCodeSvg",r.propTypes=a,we.default=r,we}var bt;function br(){if(bt)return ne;bt=1,Object.defineProperty(ne,"__esModule",{value:!0}),ne.QRCode=void 0;var t=Object.assign||function(m){for(var w=1;w<arguments.length;w++){var y=arguments[w];for(var x in y)Object.prototype.hasOwnProperty.call(y,x)&&(m[x]=y[x])}return m},i=Tt(),n=c(i),d=jt(),f=c(d),s=vr(),l=c(s),a=Ct(),r=c(a),e=yr(),p=c(e);function c(m){return m&&m.__esModule?m:{default:m}}function u(m,w){var y={};for(var x in m)w.indexOf(x)>=0||Object.prototype.hasOwnProperty.call(m,x)&&(y[x]=m[x]);return y}var h={bgColor:n.default.oneOfType([n.default.object,n.default.string]),fgColor:n.default.oneOfType([n.default.object,n.default.string]),level:n.default.string,size:n.default.number,value:n.default.string.isRequired},g=(0,a.forwardRef)(function(m,w){var y=m.bgColor,x=y===void 0?"#FFFFFF":y,T=m.fgColor,E=T===void 0?"#000000":T,N=m.level,k=N===void 0?"L":N,R=m.size,B=R===void 0?256:R,M=m.value,D=u(m,["bgColor","fgColor","level","size","value"]),_=new l.default(-1,f.default[k]);_.addData(M),_.make();var z=_.modules;return r.default.createElement(p.default,t({},D,{bgColor:x,bgD:z.map(function(H,q){return H.map(function(F,$){return F?"":"M "+$+" "+q+" l 1 0 0 1 -1 0 Z"}).join(" ")}).join(" "),fgColor:E,fgD:z.map(function(H,q){return H.map(function(F,$){return F?"M "+$+" "+q+" l 1 0 0 1 -1 0 Z":""}).join(" ")}).join(" "),ref:w,size:B,viewBoxSize:z.length}))});return ne.QRCode=g,g.displayName="QRCode",g.propTypes=h,ne.default=g,ne}br();const wr=({isOpen:t,onClose:i,onSubmit:n,error:d,t:f})=>{const[s,l]=C.useState(""),[a,r]=C.useState(!1);if(!t)return null;const e=p=>{p.preventDefault(),r(!0),n(s),r(!1)};return o.jsx(Qo,{children:o.jsx(Vo,{style:{maxWidth:"400px"},children:o.jsxs("div",{style:{padding:"20px"},children:[o.jsx("h3",{style:{margin:"0 0 20px 0",textAlign:"center"},children:f("Enter Password")}),o.jsxs("form",{onSubmit:e,children:[o.jsxs("div",{style:{marginBottom:"20px"},children:[o.jsx("input",{type:"password",value:s,onChange:p=>l(p.target.value),placeholder:f("Password"),style:{width:"100%",padding:"10px",borderRadius:"4px",border:d?"1px solid #d32f2f":"1px solid #ccc",fontSize:"16px"},required:!0}),d&&o.jsx("div",{style:{color:"#d32f2f",fontSize:"14px",marginTop:"5px",padding:"5px"},children:d})]}),o.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[o.jsx("button",{type:"button",onClick:i,style:{padding:"10px 16px",backgroundColor:"#f3f4f6",border:"none",borderRadius:"4px",cursor:"pointer",fontSize:"14px"},children:f("Cancel")}),o.jsx("button",{type:"submit",disabled:a||!s,style:{padding:"10px 16px",backgroundColor:"#006adc",color:"white",border:"none",borderRadius:"4px",cursor:s?"pointer":"not-allowed",opacity:s?1:.7,fontSize:"14px"},children:f(a?"Submitting...":"Submit")})]})]})]})})})},He=new vo({region:Jt});function wt(t){const i=t.trim().toLowerCase(),n="@gmail.com";return i.endsWith(n)?`${i.slice(0,-n.length).replace(/\./g,"")}${n}`:i}const Cr=({isOpen:t,onClose:i,onLoginSuccess:n,t:d})=>{const[f,s]=C.useState(""),[l,a]=C.useState(!1),[r,e]=C.useState(""),[p,c]=C.useState(""),[u,h]=C.useState("idle"),[g,m]=C.useState(""),w=C.useRef(null),y=C.useRef(null);C.useEffect(()=>{l&&y.current&&y.current.focus()},[l]),C.useEffect(()=>{t&&w.current&&!l&&w.current.focus()},[t,l]);function x(k){const R=k.target.value;/^\d*$/.test(R)&&R.length<=6&&e(R)}async function T(){var R;h("sending"),m("");const k=wt(f);if(!k||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(k)){h("error"),m(d("Please enter a valid email address"));return}try{const B=new yo({ClientId:Ee,Username:k,Password:crypto.randomUUID(),UserAttributes:[{Name:"email",Value:k}]});try{await He.send(B)}catch(_){if(!((R=_.name)!=null&&R.includes("UsernameExistsException")))throw _}const M=new bo({ClientId:Ee,AuthFlow:"CUSTOM_AUTH",AuthParameters:{USERNAME:k}}),D=await He.send(M);if(D.Session)c(D.Session),a(!0),h("idle");else throw new Error("No session returned from InitiateAuth")}catch(B){console.error(B),h("error"),m(d("Unable to send verification code. Please try again later."))}}async function E(){var R,B,M,D,_,z;h("verifying"),m("");const k=wt(f);try{const H=new wo({ClientId:Ee,ChallengeName:"CUSTOM_CHALLENGE",ChallengeResponses:{USERNAME:k,ANSWER:r},Session:p}),F=(R=(await He.send(H)).AuthenticationResult)==null?void 0:R.IdToken;if(!F)throw new Error("No token received");localStorage.setItem("idToken",F);const j=`${JSON.parse(atob(F.split(".")[1]))["cognito:username"]}_____Public____Profile`,Y=await(await fetch(Qe,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${F}`},body:JSON.stringify({query:`
            mutation MyMutation($relationIds: [ID!]) {
              batchGetItems(relationIds: $relationIds) {
                items {
                  id
                  item {
                    ... on Profile {
                      anyDisplayName
                    }
                  }
                }
                nextToken
              }
            }
          `,variables:{relationIds:[j]}})})).json(),fe=(z=(_=(D=(M=(B=Y==null?void 0:Y.data)==null?void 0:B.batchGetItems)==null?void 0:M.items)==null?void 0:D[0])==null?void 0:_.item)==null?void 0:z.anyDisplayName;fe&&localStorage.setItem("publicUsername",fe),h("idle"),n(),i()}catch(H){console.error(H),h("error"),m(d("Invalid or expired verification code. Please try again or request a new code."))}}function N(){a(!1),e(""),h("idle")}return t?o.jsx("div",{style:{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',backgroundColor:"rgba(0, 0, 0, 0.5)",position:"fixed",top:0,left:0,right:0,bottom:0,display:"flex",alignItems:"center",justifyContent:"center",zIndex:1e3},children:o.jsxs("div",{style:{maxWidth:400,width:"100%",background:"#ffffff",padding:"32px",borderRadius:"12px",boxShadow:"0 6px 20px rgba(0,0,0,0.06)",textAlign:"center"},children:[o.jsxs("div",{style:{marginBottom:"24px"},children:[o.jsx("img",{src:"images/logo_no_background.png",alt:"6180 Logo",style:{height:"60px",marginBottom:"16px"}}),o.jsx("h2",{style:{fontSize:"24px",fontWeight:600,color:"#333"},children:d("Sign in to 6180")})]}),g&&o.jsx("div",{style:{backgroundColor:"#f8d7da",color:"#721c24",padding:"10px",borderRadius:"6px",marginBottom:"16px",fontSize:"14px"},children:g}),l?o.jsxs(o.Fragment,{children:[o.jsxs("p",{style:{marginBottom:"16px",color:"#555"},children:[d("Check your email for a 6-digit verification code sent to")," ",o.jsx("strong",{children:f})]}),o.jsx("input",{ref:y,type:"tel",inputMode:"numeric",pattern:"[0-9]*",maxLength:6,value:r,onChange:x,placeholder:d("Enter 6-digit code"),style:{width:"100%",padding:"12px",marginBottom:"16px",borderRadius:"6px",border:"1px solid #ccc",fontSize:"16px",boxSizing:"border-box",letterSpacing:"2px",textAlign:"center"}}),o.jsx("button",{onClick:E,disabled:u==="verifying"||r.length!==6,style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#28a745",color:"#fff",border:"none",borderRadius:"6px",cursor:u==="verifying"||r.length!==6?"not-allowed":"pointer",opacity:u==="verifying"||r.length!==6?.7:1},children:d(u==="verifying"?"Verifying...":"Verify Code")}),o.jsxs("div",{style:{marginTop:"16px",fontSize:"14px",color:"#666",display:"flex",justifyContent:"center",gap:"8px"},children:[o.jsx("span",{children:d("Didn't receive a code?")}),o.jsx("button",{onClick:N,style:{background:"none",border:"none",color:"#007bff",padding:0,cursor:"pointer",fontSize:"14px",textDecoration:"underline"},children:d("Send new code")})]}),o.jsx("button",{onClick:i,style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#f8f9fa",color:"#555",border:"1px solid #ccc",borderRadius:"6px",cursor:"pointer",marginTop:"12px"},children:d("Cancel")})]}):o.jsxs(o.Fragment,{children:[o.jsx("input",{ref:w,type:"email",value:f,onChange:k=>s(k.target.value),placeholder:d("Enter your email"),style:{width:"100%",padding:"12px",marginBottom:"16px",borderRadius:"6px",border:"1px solid #ccc",fontSize:"16px",boxSizing:"border-box"}}),o.jsx("button",{onClick:T,disabled:u==="sending"||!f.trim(),style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#007bff",color:"#fff",border:"none",borderRadius:"6px",cursor:u==="sending"||!f.trim()?"not-allowed":"pointer",opacity:u==="sending"||!f.trim()?.7:1},children:d(u==="sending"?"Sending...":"Send Verification Code")}),o.jsx("p",{style:{fontSize:"13px",color:"#666",marginTop:"16px",textAlign:"center"},children:d("We'll send a secure verification code to your email")}),o.jsx("button",{onClick:i,style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#f8f9fa",color:"#555",border:"1px solid #ccc",borderRadius:"6px",cursor:"pointer",marginTop:"12px"},children:d("Cancel")})]})]})}):null},Pr=({albumData:t,t:i})=>!t||Object.keys(t.contacts).length===0?null:o.jsx("div",{style:{width:"100%",backgroundColor:"#f0f7ff",borderRadius:"8px",padding:"16px",marginBottom:"20px",boxShadow:"0 2px 4px rgba(0,0,0,0.1)",border:"1px solid #d0e1f9"},children:o.jsxs("p",{style:{margin:"0",fontSize:"15px",color:"#333",textAlign:"left"},children:[i('Click "Save" to create a memory with '),o.jsx("strong",{children:Object.values(t.contacts).filter(n=>!n.toString().startsWith("Profile-")).join(", ")}),i(" that you can filter for later")]})}),Ge=({src:t,thumbnailSrc:i,alt:n,className:d="",loadFullResolution:f=!1,onFullResolutionLoaded:s,onClick:l,showWatermark:a=!1})=>{const[r,e]=C.useState(!1),[p,c]=C.useState(!1),[u,h]=C.useState(!1),[g,m]=C.useState("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E"),{t:w}=Ie();return C.useEffect(()=>{if(i){const y=new Image;y.src=i,y.onload=()=>{m(i),e(!0)}}},[i]),C.useEffect(()=>{if(f&&!p){h(!0);const y=new Image;y.src=t,y.onload=()=>{m(t),c(!0),h(!1),s&&s()}}},[f,t,p,s]),o.jsxs(Do,{onClick:l,children:[o.jsx(zo,{src:g,alt:n,className:d,isLoaded:r,style:{cursor:l?"pointer":"default"}}),!r&&o.jsx(Uo,{}),u&&o.jsx(kt,{children:w("Loading full resolution...")}),a&&r&&o.jsx(Pe,{children:o.jsx(Se,{children:"6180 Watermarked"})})]})},Sr=({thumbnailUrl:t,videoUrl:i,duration:n,index:d,onFullResolutionLoaded:f,onClick:s,showWatermark:l=!1})=>{const[a,r]=C.useState(!1),[e,p]=C.useState(!1),[c,u]=C.useState(!1),h=Yt.useRef(null),{t:g}=Ie(),m=()=>{if(s){s();return}c?r(!0):p(!0)},w=()=>{u(!0),r(!0),f&&f()};return C.useEffect(()=>{if(e&&h.current&&!c){const y=h.current,x=()=>{w(),y.removeEventListener("canplaythrough",x)};return y.addEventListener("canplaythrough",x),y.load(),()=>{y.removeEventListener("canplaythrough",x)}}},[e,c]),a?o.jsxs("div",{style:{position:"relative",width:"100%",height:"100%"},children:[o.jsxs("video",{ref:h,controls:!0,style:{width:"100%",height:"100%"},children:[o.jsx("source",{src:i,type:"video/mp4"}),g("Your browser does not support the video tag.")]}),l&&o.jsx(Pe,{children:o.jsx(Se,{children:"6180 Watermarked"})})]}):e&&!c?o.jsxs(nt,{children:[o.jsx(Ge,{src:i,thumbnailSrc:t,alt:`Video thumbnail ${d+1}`,showWatermark:l}),o.jsx(kt,{children:g("Loading video...")}),o.jsx("video",{ref:h,style:{display:"none"},preload:"auto",children:o.jsx("source",{src:i,type:"video/mp4"})})]}):o.jsxs(nt,{onClick:m,children:[o.jsx(Ge,{src:i,thumbnailSrc:t,alt:`Video thumbnail ${d+1}`,showWatermark:l}),o.jsx($o,{}),o.jsx(Wo,{children:n})]})},Ir=({item:t,index:i,isSelectionMode:n,isSelected:d,toggleItemSelection:f,openFullscreenView:s,showWatermark:l,ownerName:a})=>o.jsxs("div",{style:{position:"relative",border:n&&d?"3px solid #006adc":void 0,borderRadius:"8px",overflow:"hidden",boxShadow:n&&d?"0 0 0 3px rgba(0, 106, 220, 0.3)":void 0},onClick:r=>n?f(i,r):s(i),children:[n&&o.jsx(Yo,{isSelected:d,onClick:r=>f(i,r),children:d&&o.jsx(Zo,{children:"✓"})}),t.type==="image"?o.jsx(Ge,{src:t.url,thumbnailSrc:t.thumbnailUrl,alt:`Album image ${i+1}`,loadFullResolution:!1,onFullResolutionLoaded:()=>{},onClick:()=>n?void 0:s(i),showWatermark:l}):o.jsx(Sr,{thumbnailUrl:t.thumbnailUrl||"",videoUrl:t.url,duration:t.duration||"0:00",index:i,onFullResolutionLoaded:()=>{},onClick:()=>n?void 0:s(i),showWatermark:l}),a&&o.jsx(Fo,{children:a})]},i),kr=({isLoading:t,error:i,albumData:n,columns:d,shouldShowContent:f,shouldShowWatermark:s,isSelectionMode:l,selectedItems:a,toggleItemSelection:r,openFullscreenView:e,t:p})=>t?o.jsx(Ho,{id:"loading-message",children:p("Loading album content...")}):i?o.jsx(Le,{children:i}):f()?!n||n.mediaItems.length===0?o.jsx(Le,{children:p("No media found in this album")}):o.jsx(Oo,{id:"media-grid",columns:d,children:n.mediaItems.map((c,u)=>{const h=c.ownerContactId&&n.contacts[c.ownerContactId]?n.contacts[c.ownerContactId]:"",g=a.has(u),m=s();return o.jsx(Ir,{item:c,index:u,isSelectionMode:l,isSelected:g,toggleItemSelection:r,openFullscreenView:e,showWatermark:m,ownerName:h},u)})}):o.jsx("div",{style:{gridColumn:"1 / -1",textAlign:"center",padding:"40px 0"},children:o.jsx(Le,{children:p("Enter the password to view album contents")})}),Tr=({albumData:t,t:i})=>t?o.jsxs(o.Fragment,{children:[t.folderName&&t.folderName!==i("Photos")&&t.folderName.trim()!==""&&o.jsx(Lo,{id:"album-title",children:o.jsx(Ao,{children:t.folderName})}),t.folderDescription&&t.folderDescription.trim()!==""&&o.jsx(Bo,{id:"description-container",children:o.jsx(Mo,{children:t.folderDescription})})]}):null,jr=({addPhotosToAlbum:t,saveAlbum:i,promptForPassword:n,showingEnterPassword:d,passwordPolicy:f,usingFolderInviteGrantsRightToAddItems:s,t:l})=>{const[a,r]=C.useState(!1),[e,p]=C.useState(!1),c=C.useRef(null),u=840;C.useEffect(()=>{p(window.innerWidth<u);const w=()=>{p(window.innerWidth<u)};return window.addEventListener("resize",w),()=>window.removeEventListener("resize",w)},[]);const h=()=>{r(!a)},g=()=>{r(!1)},m=w=>{w(),g()};return C.useEffect(()=>{const w=x=>{c.current&&!c.current.contains(x.target)&&r(!1)},y=()=>{r(!1)};return a&&(document.addEventListener("mousedown",w),window.addEventListener("scroll",y)),()=>{document.removeEventListener("mousedown",w),window.removeEventListener("scroll",y)}},[a]),e?o.jsxs("div",{ref:c,style:{position:"relative",display:"flex",alignItems:"center",justifyContent:"flex-end",width:"100%",flexWrap:"nowrap"},children:[!d&&o.jsxs("div",{style:{flexShrink:0},children:[o.jsxs(Pt,{onClick:h,"aria-label":l("Menu"),"aria-expanded":a,children:[o.jsxs(St,{children:[o.jsx(ie,{}),o.jsx(ie,{}),o.jsx(ie,{})]}),l("Save")]}),a&&o.jsxs(It,{children:[s&&o.jsx(Ce,{onClick:()=>m(t),children:l("Add Photos To Album")}),o.jsx(Ce,{onClick:()=>m(i),children:l("Save To My Library")}),o.jsx(Ce,{onClick:()=>m(i),children:l("Download To My Device")})]})]}),d&&f&&f!=="NoPassword"&&o.jsx("div",{style:{flexShrink:0},children:o.jsx(it,{onClick:n,children:l("Enter Password")})})]}):o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"20px",justifyContent:"flex-end",flexWrap:"nowrap"},children:[!d&&o.jsxs("div",{style:{display:"flex",gap:"20px",flexWrap:"nowrap"},children:[s&&o.jsx(J,{onClick:t,children:l("Add Photos")}),o.jsx(J,{onClick:i,children:l("Save To My Library")}),o.jsx(J,{onClick:i,children:l("Download To My Device")})]}),d&&o.jsx("div",{children:o.jsx(it,{onClick:n,children:l("Enter Password")})})]})},Er=({t,isSelectionMode:i,selectedItems:n,shareSelection:d,cancelSelection:f,createSubalbum:s,showingEnterPassword:l,promptForPassword:a,passwordPolicy:r,isAuthorized:e,addPhotosToAlbum:p,saveAlbumDirectly:c,handleDownloadPhotos:u,handleCopyLink:h,handlePublicProfileToggle:g,isOnPublicProfile:m,albumData:w,columns:y,changeColumns:x})=>{const[T,E]=C.useState(!1),[N,k]=C.useState(!1),R=C.useRef(null),B=840;C.useEffect(()=>{k(window.innerWidth<B);const j=()=>{k(window.innerWidth<B)};return window.addEventListener("resize",j),()=>window.removeEventListener("resize",j)},[]);const M=()=>{E(!T)},D=()=>{E(!1)},_=j=>{j(),D()};C.useEffect(()=>{const j=Y=>{R.current&&!R.current.contains(Y.target)&&E(!1)},V=()=>{E(!1)};return T&&(document.addEventListener("mousedown",j),window.addEventListener("scroll",V)),()=>{document.removeEventListener("mousedown",j),window.removeEventListener("scroll",V)}},[T]);const z=()=>[{label:t("Add Photos"),onClick:p},{label:t("Download"),onClick:u},{label:t("Copy Link"),onClick:h},{label:t(m?"On Public Profile":"Not On Public Profile"),onClick:g,style:{backgroundColor:m?"#4caf50":"#e0e0e0",color:m?"white":"inherit"}}],H=()=>o.jsxs("div",{style:{display:"flex",gap:"16px"},children:[o.jsxs(J,{onClick:d,disabled:n.size===0,style:{opacity:n.size===0?.5:1,backgroundColor:n.size>0?"#006adc":void 0,color:n.size>0?"white":void 0},children:[t("Create Sub-album")," (",n.size,")"]}),o.jsx(J,{onClick:f,children:t("Cancel")})]}),q=()=>!i&&!e&&r&&r!=="NoPassword"&&o.jsx(J,{onClick:a,children:t("Enter Password")}),F=()=>o.jsxs(o.Fragment,{children:[o.jsxs(Pt,{onClick:M,"aria-label":t("Menu"),"aria-expanded":T,children:[o.jsxs(St,{children:[o.jsx(ie,{}),o.jsx(ie,{}),o.jsx(ie,{})]}),t("Actions")]}),T&&o.jsx(It,{children:z().map((j,V)=>o.jsx(Ce,{onClick:()=>_(j.onClick),style:j.style,disabled:j.disabled,children:j.label},V))})]}),$=()=>o.jsx("div",{style:{display:"flex",gap:"10px",flexWrap:"nowrap"},children:z().map((j,V)=>o.jsx(J,{onClick:j.onClick,style:j.style,disabled:j.disabled,children:j.label},V))}),pe=()=>i?H():o.jsxs("div",{style:{display:"flex",justifyContent:"space-between",width:"100%",flexWrap:"nowrap",alignItems:"center"},children:[o.jsx("div",{style:{flexShrink:0},children:!l()&&o.jsx(Eo,{onClick:s,children:t("Create Sub-album")})}),o.jsxs("div",{style:{marginLeft:"auto",display:"flex",alignItems:"center"},children:[q(),!i&&!(!e&&r&&r!=="NoPassword")&&(w!=null&&w.folderPositionId?o.jsx("div",{ref:R,style:{position:"relative",display:"flex",alignItems:"center",justifyContent:"flex-end",flexWrap:"nowrap"},children:N?F():$()}):o.jsx(jr,{addPhotosToAlbum:p,saveAlbum:c,downloadPhotos:u,promptForPassword:a,showingEnterPassword:l(),passwordPolicy:r,usingFolderInviteGrantsRightToAddItems:w==null?void 0:w.usingFolderInviteGrantsRightToAddItems,t}))]})]});return o.jsx(ko,{children:o.jsxs(To,{children:[o.jsx(Jo,{children:pe()}),o.jsxs(Ro,{children:[o.jsx(qo,{htmlFor:"columns",id:"columns-label",children:o.jsx("strong",{children:t("Columns:")})}),o.jsx(Go,{id:"columns",value:y,onChange:j=>x(j.target.value),children:[1,2,3,4,5].map(j=>o.jsx("option",{value:j.toString(),children:j},j))})]})]})})},Rr=({showSelectPhotosButton:t,albumData:i,openFilePicker:n,t:d})=>!t||!(i!=null&&i.usingFolderInviteGrantsRightToAddItems)?null:o.jsx("div",{style:{width:"100%",display:"flex",justifyContent:"center",marginBottom:"20px",marginTop:"10px"},children:o.jsx("button",{onClick:n,style:{backgroundColor:"#007bff",color:"white",border:"none",borderRadius:"6px",padding:"12px 20px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"8px",fontSize:"16px",boxShadow:"0 2px 4px rgba(0,0,0,0.1)"},children:o.jsx("span",{children:d("Select Photos To Add To Album")})})}),Lr=({isAuthorized:t,passwordPolicy:i,passwordError:n,promptForPassword:d,t:f})=>t||i!=="NotVisible"?null:o.jsxs("div",{style:{padding:"20px",backgroundColor:"#f3f4f6",borderRadius:"8px",textAlign:"center",marginBottom:"20px"},children:[o.jsx("h3",{children:f("This album is password protected")}),o.jsx("p",{children:f("Please enter the password to view the contents")}),n&&o.jsx("div",{style:{color:"#d32f2f",fontSize:"14px",margin:"10px 0",padding:"5px",backgroundColor:"rgba(211, 47, 47, 0.1)",borderRadius:"4px"},children:n}),o.jsx("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"10px"},children:o.jsx(J,{onClick:d,children:f("Enter Password")})})]}),Ar=({isSelectionMode:t,t:i})=>t?o.jsx(Xo,{children:o.jsx("p",{children:i("Select photos and videos to create a sub-album to share")})}):null,_r=()=>{const{t,language:i}=Ie(),n=to(),d=oo(),f=ro(),s=no(),l=go(t),[a,r]=C.useState("1"),[e,p]=C.useState(null),[c,u]=C.useState(!0),[h,g]=C.useState(null),[m,w]=C.useState(null),[y,x]=C.useState(!1),[T,E]=C.useState(!1),[N,k]=C.useState(null),[R,B]=C.useState(!1),{passwordPolicy:M,setPasswordPolicy:D,isAuthorized:_,setIsAuthorized:z,showPasswordModal:H,setShowPasswordModal:q,passwordError:F,setPasswordError:$,passwordVerified:pe,setPasswordVerified:j,shouldShowContent:V,shouldShowWatermark:Y,showingEnterPassword:fe,promptForPassword:se}=s,{fileInputRef:ke,selectedPhotos:ae,setSelectedPhotos:Ve,isUploading:At,setIsUploading:he,fileProcessingComplete:Ke,setFileProcessingComplete:Te,progressTracker:le,log:X}=n,{fullscreenItem:oe,openFullscreenView:Je,closeFullscreenView:_t,goToPrevItem:Bt,goToNextItem:Mt}=d,{isSelectionMode:ge,setIsSelectionMode:Ot,selectedItems:de,toggleItemSelection:Nt,cancelSelection:Dt}=f,K=io(e,m,N,t),zt=async v=>{if($(null),v.trim()===""){$(t("Password cannot be empty"));return}const P=e==null?void 0:e.actualPassword;if(!P)if(e!=null&&e.hasPassword){$(t("Unable to validate password. Please try again later."));return}else{z(!0),q(!1);return}if(v!==P){$(t("Invalid password. Please try again."));return}if(!await te()){q(!1),j(!0),x(!0);return}z(!0),q(!1),$(null),me()},Ut=v=>{r(v),localStorage.setItem("columns",v)},Ye=()=>{ke.current&&ke.current.click()},Ft=async()=>{const v=await te();if(!v){B(!0),x(!0);return}if(!N)try{const S=JSON.parse(atob(v.split(".")[1]))["cognito:username"];k(S)}catch(P){console.error("Failed to decode token",P)}Te(!1),Ye()},$t=async()=>{x(!1);const v=await te();if(v)try{const S=JSON.parse(atob(v.split(".")[1]))["cognito:username"];k(S),pe&&(z(!0),j(!1)),R&&(localStorage.setItem("selectPhotosButtonTimestamp",Date.now().toString()),B(!1)),me();return}catch(P){console.error("Failed to decode token",P)}},Wt=async v=>{const P=Array.from(v.target.files||[]);if(!P.length)return;localStorage.removeItem("selectPhotosButtonTimestamp"),E(!1),he(!0),Te(!1);const S=await et();if(!S){X("❌ Authentication failed"),he(!1),x(!0);return}try{const I=JSON.parse(atob(S.split(".")[1]))["cognito:username"];if(!I){X("❌ Missing Cognito Username"),he(!1);return}k(I);const O=m||`${I}_____${lo()}____Folder`;X(`📁 Using folder ID: ${O}`),Ve(P.map(U=>({fileName:U.name,s3PreviewUrl:URL.createObjectURL(U),type:U.type,size:U.size,status:"pending",progress:0})));const W=co(Ve),A=setInterval(()=>{tt(ae,n.setProgressTracker)},500),G=await uo(P,I,W,X);clearInterval(A),tt(G,n.setProgressTracker),localStorage.setItem(Ze.SELECTED_PHOTOS,JSON.stringify(G)),X(`📸 Saved ${G.length} photos metadata to storage`);const ce=G.every(U=>U.status==="complete"),ee=G.some(U=>U.status==="error");if(ce&&!ee)X(`✅ All ${G.length} files successfully uploaded`);else if(ee){const U=G.filter(xe=>xe.status==="error").length;X(`⚠️ Upload completed with ${U} errors`)}setTimeout(()=>{Te(!0)},1e3)}catch(L){X(`❌ Fatal error in handleFileSelection: ${String(L)}`),he(!1)}finally{v.target&&(v.target.value="")}},me=async()=>{console.log("Starting album registration");const v=document.createElement("div");v.style.position="fixed",v.style.top="0",v.style.left="0",v.style.width="100%",v.style.height="100%",v.style.backgroundColor="rgba(0, 0, 0, 0.5)",v.style.display="flex",v.style.justifyContent="center",v.style.alignItems="center",v.style.zIndex="2000";const P=document.createElement("div");P.style.backgroundColor="white",P.style.padding="30px",P.style.borderRadius="8px",P.style.textAlign="center";const S=document.createElement("p");S.id="saveProgressText",S.textContent=t("Registering album...");const L=document.createElement("div");L.style.backgroundColor="#f0f0f0",L.style.borderRadius="4px",L.style.overflow="hidden",L.style.height="8px",L.style.marginTop="10px";const I=document.createElement("div");I.id="saveProgress",I.style.backgroundColor="#4caf50",I.style.height="100%",I.style.width="5%",I.style.transition="width 0.3s ease";const O=document.createElement("p");O.id="saveErrorText",O.style.color="#f44336",O.style.display="none",O.style.marginTop="10px",O.style.fontSize="14px",L.appendChild(I),P.appendChild(S),P.appendChild(L),P.appendChild(O),v.appendChild(P),document.body.appendChild(v);try{const W=await et();if(!W){console.error("No token available for registering album"),document.body.removeChild(v);return}if(!JSON.parse(atob(W.split(".")[1]))["cognito:username"]){console.error("Missing username in token"),re(O,"Could not retrieve username from token",S,I);return}if(!m){console.error("No folder ID available"),re(O,"Folder ID is missing",S,I);return}if(!e||!e.mediaItems){console.error("No album data available"),re(O,"Album data is missing or incomplete",S,I);return}if(e.mediaItems.length===0){console.error("No media items to save"),re(O,"No media items in album to save",S,I);return}const ce=Math.floor(Date.now()/1e3);be(30,S,I,t("Preparing album data..."));const ee={currentTime:ce,folderId:m,profileIds:["Only Me_____Only Me____Profile"],folderPositionSelectedTagInputs:[],folderPositionPoints:1};console.log("Folder position input:",ee),be(50,S,I,t("Saving album..."));const U=`
        mutation SaveAlbum(
          $folderPositionInputs: [FolderPositionInput!]
        ) {
          changeFiles(folderPositionInputs: $folderPositionInputs) {
            items { id }
          }
        }
      `,xe={folderPositionInputs:[ee]};console.log("GraphQL mutation variables:",JSON.stringify(xe));try{const Z=await fetch(Qe,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${W}`},body:JSON.stringify({query:U,variables:xe})});if(be(80,S,I,t("Almost there...")),!Z.ok)throw new Error(`HTTP error: ${Z.status} ${Z.statusText}`);const je=await Z.text();let ue;try{ue=JSON.parse(je),console.log("API response:",ue)}catch(ve){const ye=ve instanceof Error?ve.message:"Unknown JSON parse error";throw new Error(`Invalid JSON response: ${ye}`)}if(ue.errors&&ue.errors.length>0){const ve=ue.errors.map(ye=>(console.error("GraphQL error:",ye),ye.message||"Unknown GraphQL error")).join("; ");throw new Error(`GraphQL errors: ${ve}`)}console.log("Album registered successfully"),be(100,S,I,t("Album registered successfully!")),sessionStorage.setItem("album_just_saved","true"),setTimeout(()=>{document.body.removeChild(v),window.location.href="/my-albums.html"},2e3)}catch(Z){const je=Z instanceof Error?Z.message:"Unknown API error";console.error("Error in API request:",Z),re(O,je,S,I)}}catch(W){const A=W instanceof Error?W.message:"Unknown error";console.error("Error registering album:",W),re(O,A,S,I)}},Ht=async()=>{if(console.log("Starting album registration"),M==="CannotBeSaved"&&!_){se();return}const v=await te();if(!v){console.log("User not logged in, showing OTP login"),x(!0);return}if(!N)try{const L=JSON.parse(atob(v.split(".")[1]))["cognito:username"];k(L)}catch(S){console.error("Failed to decode token",S)}const P=localStorage.getItem("publicUsername");if(P!=null&&P.startsWith("Profile-")){console.log("Public username starts with 'Profile-', showing username prompt"),l.setUsernameInput(P),l.setShowUsernamePrompt(!0);return}me()},qt=async()=>{if((M==="NotVisible"||M==="CannotBeSaved")&&!_){se();return}Ot(!ge),de.clear()},Gt=async()=>{if(de.size===0){alert(t("Please select at least one item to share."));return}if(e)try{const v=document.createElement("div");v.style.position="fixed",v.style.top="0",v.style.left="0",v.style.width="100%",v.style.height="100%",v.style.backgroundColor="rgba(0, 0, 0, 0.5)",v.style.display="flex",v.style.justifyContent="center",v.style.alignItems="center",v.style.zIndex="2000";const P=document.createElement("div");P.style.backgroundColor="white",P.style.padding="30px",P.style.borderRadius="8px",P.style.textAlign="center";const S=document.createElement("p");S.textContent=t("Creating sub-album..."),P.appendChild(S),v.appendChild(P),document.body.appendChild(v);const L=[],I=[];Array.from(de).forEach(W=>{var G;const A=e.mediaItems[W];if(A&&A.fileId){L.push(A.fileId);const ce={fileName:((G=A.fileId.split("_____")[1])==null?void 0:G.split("____")[0])||`file-${W}`,s3PreviewUrl:A.type==="video"&&A.thumbnailUrl||A.url,type:A.type==="video"?"video":"image",size:0,status:"complete",progress:100,fileId:A.fileId,duration:A.type==="video"&&A.duration?parseFloat(A.duration.split(":").reduce((ee,U)=>60*ee+parseFloat(U),0).toString()):null};I.push(ce)}});const O={isSubAlbum:!0,selectedFileIds:L,selectedPhotos:I};localStorage.setItem(Ze.SUB_ALBUM_DATA,JSON.stringify(O)),document.body.removeChild(v),window.location.href="/save-album.html"}catch(v){console.error("Error creating sub-album:",v),alert(t("There was an error creating the sub-album. Please try again."))}},Qt=async()=>{if(M==="CannotBeSaved"&&!_){se();return}if(!await te()&&(m||M==="CannotBeSaved")){x(!0);return}e&&ho(e,t,Je)};return C.useEffect(()=>{const v=localStorage.getItem("columns")||"1";r(v)},[]),C.useEffect(()=>{(async()=>{const P=so();if(!P){g(t("Valid ID not obtained from query parameter.")),u(!1);return}const S=P.split("_");let L=S[S.length-1].replace(/-/g,"");L.length===32?(L=ao(L),console.log(L)):console.error("Invalid UUID format: must be 32 characters after removing dashes");const I=await So(L,w);I&&(p(I),I.passwordPolicy&&(D(I.passwordPolicy),(I.passwordPolicy==="NoPassword"||I.folderPositionId)&&z(!0))),u(!1)})()},[]),C.useEffect(()=>{(async()=>{const P=await te();if(P)try{const L=JSON.parse(atob(P.split(".")[1]))["cognito:username"];k(L);const I=localStorage.getItem("selectPhotosButtonTimestamp");if(I){const O=parseInt(I,10),A=(Date.now()-O)/(1e3*60);E(A<10),A>=10&&localStorage.removeItem("selectPhotosButtonTimestamp")}else E(!1)}catch(S){console.error("Failed to decode token",S)}})()},[]),C.useEffect(()=>{if(Ke&&ae.length>0){const v=ae.filter(S=>S.status==="complete").length,P=ae.filter(S=>S.status==="error").length;console.log(`Upload complete: ${v} successful, ${P} failed`),m?window.location.href=`/save-album.html?folderId=${encodeURIComponent(m)}`:window.location.href="/save-album.html"}},[Ke,ae.length,m]),C.useEffect(()=>{e!=null&&e.folderName?document.title=e.folderName:document.title=t("Photos")},[e,i]),o.jsxs(Io,{children:[o.jsx(Ko,{}),o.jsx(Er,{t,isSelectionMode:ge,selectedItems:de,shareSelection:Gt,cancelSelection:Dt,createSubalbum:qt,showingEnterPassword:fe,promptForPassword:se,passwordPolicy:M,isAuthorized:_,addPhotosToAlbum:Ft,saveAlbumDirectly:Ht,handleDownloadPhotos:Qt,handleCopyLink:()=>K.setShowingCopyLinkAlert(!0),handlePublicProfileToggle:K.handlePublicProfileToggle,isOnPublicProfile:K.isOnPublicProfile,albumData:e,columns:a,changeColumns:Ut}),o.jsxs(_o,{id:"media-container",children:[o.jsx(Rr,{showSelectPhotosButton:T,albumData:e,openFilePicker:Ye,t}),o.jsx(Pr,{albumData:e,t}),At&&o.jsxs("div",{style:{width:"100%",marginBottom:"20px"},children:[o.jsx(po,{progressTracker:le,t,isRTL:Re(i)==="rtl",style:{marginTop:"20px"}}),le.filesComplete>0&&le.filesComplete===le.totalFiles&&o.jsx("div",{style:{backgroundColor:"#e8f5e9",color:"#2e7d32",padding:"10px 16px",borderRadius:"6px",fontSize:"14px",marginTop:"10px",textAlign:"center"},children:t("Upload complete! Preparing to save your album...")}),le.filesWithError>0&&o.jsx("div",{style:{backgroundColor:"#ffebee",color:"#c62828",padding:"10px 16px",borderRadius:"6px",fontSize:"14px",marginTop:"10px",textAlign:"center"},children:t("Some files could not be uploaded. You can continue with the successfully uploaded files.")})]}),o.jsx(Lr,{isAuthorized:_,passwordPolicy:M,passwordError:F,promptForPassword:se,t}),o.jsx(Ar,{isSelectionMode:ge,t}),o.jsx(Tr,{albumData:e,t}),o.jsx(kr,{isLoading:c,error:h,albumData:e,columns:a,shouldShowContent:V,shouldShowWatermark:Y,isSelectionMode:ge,selectedItems:de,toggleItemSelection:Nt,openFullscreenView:Je,t})]}),o.jsx(wr,{isOpen:H,onClose:()=>{q(!1),$(null)},onSubmit:zt,error:F,t}),o.jsx(Cr,{isOpen:y,onClose:()=>{x(!1)},onLoginSuccess:$t,t}),o.jsx(fo,{onFileSelection:Wt,ref:ke}),oe!==null&&e&&o.jsx(ur,{item:e.mediaItems[oe],index:oe,onClose:_t,onPrev:Bt,onNext:()=>Mt(e.mediaItems.length),hasNext:oe<e.mediaItems.length-1,hasPrev:oe>0,showWatermark:Y(),ownerName:(()=>{const v=e.mediaItems[oe].ownerContactId;if(!v)return"";if(e.contacts&&e.contacts[v])return e.contacts[v];const P=v.split("_____")[0]||"";return P===N?t("Me"):P})()}),o.jsx(mo,{t,language:i,usernameManager:l,onSuccess:v=>{me()}}),o.jsx(Co,{isOpen:K.showingCopyLinkAlert,onClose:()=>K.setShowingCopyLinkAlert(!1),inviteLink:K.generateInviteLink(),onCopy:K.handleCopy,t,isRTL:Re(i)==="rtl"}),o.jsx(Po,{isOpen:K.showingCopiedLinkAlert,onClose:()=>K.setShowingCopiedLinkAlert(!1),t,isRTL:Re(i)==="rtl"})]})},Br=()=>o.jsx(Zt,{children:o.jsx(_r,{})});Xt.createRoot(document.getElementById("root")).render(o.jsx(Br,{}));
