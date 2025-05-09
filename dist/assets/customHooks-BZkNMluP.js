import{j as n,g as S,r as a,a as j}from"./index-BQCoonNn.js";import{f as A,d as o,l as T}from"./styled-components.browser.esm-CpMl8bPK.js";import{e as C}from"./utils-MSJ8woNW.js";const q=A`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }
`,z=e=>T`
  direction: ${e?"rtl":"ltr"};
`,J=o.div`
  padding: 40px 20px;
  background-color: #f9fafb;
  min-height: 100vh;
  ${e=>z(e.isRTL)}
`,W=o.div`
  max-width: 900px;
  margin: 0 auto;
`,K=o.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`,Q=o.div`
  margin-bottom: 12px;
`,X=o.a`
  font-size: 16px;
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
`;o.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;o.div`
  font-size: 16px;
  color: #666;
`;const Z=o.div`
  margin-bottom: 24px;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,Y=o.h3`
  font-size: 18px;
  margin: 0 0 12px 0;
`,oo=o.div`
  margin-bottom: 12px;
`,eo=o.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 6px;
`,to=o.div`
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`,ro=o.div`
  height: 100%;
  background-color: #4caf50;
  border-radius: 4px;
  transition: width 0.3s ease;
  width: ${e=>e.progress*100}%;
`,so=o.div`
  display: flex;
  gap: 12px;
  font-size: 14px;
  color: #666;
`,no=o.div`
  color: ${e=>e.isError?"#e53935":"inherit"};
`,ao=o.div`
  margin-bottom: 24px;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,io=o.h3`
  font-size: 18px;
  margin: 0 0 12px 0;
`,po=o.div`
  font-size: 14px;
  margin-bottom: 8px;
`,co=o.div`
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`,lo=o.div`
  height: 100%;
  background-color: #2196f3;
  border-radius: 4px;
  transition: width 0.3s ease;
`,xo=o.p`
  font-size: 16px;
  margin-bottom: 16px;
  color: #333;
`,go=o.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 32px;
`,mo=o.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.03);
  width: 160px;
  position: relative;
`,uo=o.div`
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
  background-color: ${e=>{switch(e.status){case"complete":return"#4caf50";case"error":return"#e53935";case"uploading":return"#2196f3";case"processing":return"#ff9800";default:return"#9e9e9e"}}};
`,bo=o.div`
  position: relative;
  margin-bottom: 8px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`,fo=o.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 6px;
`,ho=o.video`
  max-width: 100%;
  max-height: 100%;
  border-radius: 6px;
`,wo=o.div`
  position: absolute;
  bottom: 4px;
  left: 4px;
  right: 4px;
  height: 4px;
  background-color: rgba(0,0,0,0.2);
  border-radius: 2px;
  overflow: hidden;
`,vo=o.div`
  height: 100%;
  background-color: ${e=>e.status==="processing"?"#ff9800":"#2196f3"};
  transition: width 0.3s ease;
  width: ${e=>e.progress*100}%;
`,yo=o.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 6px;
`,ko=o.div`
  font-size: 12px;
  color: #e53935;
  margin-bottom: 6px;
`,Po=o.button`
  background-color: #e53935;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 8px;
  font-size: 12px;
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  margin-top: auto;
  opacity: ${e=>e.disabled?.6:1};
`,Uo=o.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`,$=o.button`
  padding: 14px 28px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  opacity: ${e=>e.disabled?.6:1};
`,So=o($)`
  background-color: #007bff;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
`,D=o($)`
  background-color: #8c8c8c;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
`,zo=o(D)`
  color: ${e=>e.passwordSet?"#000000":"white"};
  font-weight: ${e=>e.passwordSet?"bold":"normal"};
`,$o=o.div`
  margin-top: 12px;
  margin-bottom: 12px;
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,Io=o.div`
  margin-bottom: 16px;
`,Bo=o.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
`,jo=o.input`
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-sizing: border-box;
`,Ao=o.textarea`
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  resize: vertical;
`,E=o.div`
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
`,R=o.div`
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  ${e=>z(e.isRTL)}
`,L=o.p`
  font-size: 16px;
  margin-bottom: 12px;
`,M=o.p`
  font-size: 14px;
  margin-bottom: 16px;
  color: #666;
`,N=o.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
  text-align: ${e=>e.isRTL?"right":"left"};
`,F=o.div`
  color: #e53935;
  margin-bottom: 12px;
`,O=o.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  margin-bottom: 10px;
  opacity: ${e=>e.disabled?.6:1};
`,G=o.button`
  width: 100%;
  padding: 12px;
  background-color: #6c757d;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  opacity: ${e=>e.disabled?.6:1};
`;o.div`
  margin-top: 24px;
  padding: 16px;
  background-color: #f0f0f0;
  border-radius: 8px;
`;o.h3`
  margin: 0 0 12px 0;
  font-size: 16px;
`;o.pre`
  margin: 0;
  font-size: 12px;
  white-space: pre-wrap;
  max-height: 200px;
  overflow-y: auto;
`;o.div`
  margin-bottom: 4px;
`;const To=o.input`
  display: none;
`,Co=o.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 4px 0;
  gap: 15px; /* Small gap for consistent spacing */
`,Do=o.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  line-height: 24px; /* Added line-height to better align with taller toggle */
`,Eo=o.label`
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
`,Ro=o.span`
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
`,Lo=({t:e,language:x,usernameManager:g,onSuccess:i})=>{const{showUsernamePrompt:m,setShowUsernamePrompt:b,usernameInput:s,setUsernameInput:f,usernameError:c,validateUsername:h,submitUsername:d,showAltButton:w,appendRandomDigits:l,isSubmittingUsername:u}=g,r=t=>{console.log(`Username successfully updated to: ${t}`),localStorage.setItem("publicUsername",t),b(!1),i(t)};return m?n.jsx(E,{children:n.jsxs(R,{isRTL:S(x)==="rtl",children:[n.jsx(L,{children:e("Enter Username")}),n.jsx(M,{children:e("Username should contain only letters, numbers and hyphens. Example: john-doe2")}),n.jsx(N,{value:s,onChange:t=>f(t.target.value),isRTL:S(x)==="rtl"}),c&&n.jsx(F,{children:c}),n.jsx(O,{disabled:u,onClick:()=>{if(!h(s)){g.setUsernameError(e("Username must contain only letters, numbers, and hyphens."));return}d(s,r)},children:e("Select Username")}),w&&n.jsx(G,{disabled:u,onClick:()=>l(r),children:e("Add Random Digits to Username")})]})}):null},Mo=e=>{const[x,g]=a.useState(!1),[i,m]=a.useState(""),[b,s]=a.useState(""),[f,c]=a.useState(!1),[h,d]=a.useState(!1),w=a.useCallback(r=>{const t=/^[a-zA-Z0-9-]+$/.test(r);return console.log(`Username validation for '${r}': ${t}`),t},[]),l=a.useCallback(async(r,t)=>{var y,k;console.log(`Submitting username: ${r}`),d(!0),s("");const p=await C();if(!p){s(e("Authentication error. Please try again.")),d(!1);return}const I=`
      mutation MyMutation($savePublicProfileDisplayNameInput: SavePublicProfileDisplayNameInput) {
        changeMyAccountItem(savePublicProfileDisplayNameInput: $savePublicProfileDisplayNameInput) {
          ... on Profile {
            anyDisplayName
          }
        }
      }
    `,B={savePublicProfileDisplayNameInput:{anyDisplayName:r}};try{const v=await(await fetch(j,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${p}`},body:JSON.stringify({query:I,variables:B})})).json(),U=(k=(y=v==null?void 0:v.data)==null?void 0:y.changeMyAccountItem)==null?void 0:k.anyDisplayName;if(U)t(U);else throw new Error("Username taken")}catch(P){console.error(`Error submitting username: ${P}`),s(e("Username is already taken. Please try a different one.")),c(!0),d(!1)}},[e]),u=a.useCallback(r=>{const t=Math.floor(1e5+Math.random()*9e5).toString(),p=`${i}${t}`;console.log(`Appending random digits to username: ${i} -> ${p}`),m(p),l(p,r)},[i,l]);return{showUsernamePrompt:x,setShowUsernamePrompt:g,usernameInput:i,setUsernameInput:m,usernameError:b,setUsernameError:s,showAltButton:f,setShowAltButton:c,isSubmittingUsername:h,setIsSubmittingUsername:d,validateUsername:w,submitUsername:l,appendRandomDigits:u}};export{J as A,Q as B,W as C,Bo as D,ko as E,yo as F,q as G,K as H,jo as I,Ao as J,Do as K,Eo as L,bo as M,Ro as N,oo as O,zo as P,Po as R,D as S,Co as T,Lo as U,ho as V,X as a,To as b,Uo as c,So as d,Z as e,Y as f,eo as g,to as h,ro as i,so as j,no as k,ao as l,io as m,po as n,co as o,lo as p,xo as q,go as r,mo as s,uo as t,Mo as u,fo as v,wo as w,vo as x,$o as y,Io as z};
