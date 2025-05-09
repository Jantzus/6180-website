import{f as B,d as o,l as U}from"./styled-components.browser.esm-B-nO42Xh.js";import{r as e,a as A}from"./config-D7NgO2fe.js";import{b as D}from"./utils-D4k2i4Ex.js";const E=B`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }
`,f=t=>U`
  direction: ${t?"rtl":"ltr"};
`,L=o.div`
  padding: 40px 20px;
  background-color: #f9fafb;
  min-height: 100vh;
  ${t=>f(t.isRTL)}
`,R=o.div`
  max-width: 900px;
  margin: 0 auto;
`,j=o.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`,F=o.div`
  margin-bottom: 12px;
`,O=o.a`
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
`;const G=o.div`
  margin-bottom: 24px;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,H=o.h3`
  font-size: 18px;
  margin: 0 0 12px 0;
`,V=o.div`
  margin-bottom: 12px;
`,_=o.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 6px;
`,W=o.div`
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`,q=o.div`
  height: 100%;
  background-color: #4caf50;
  border-radius: 4px;
  transition: width 0.3s ease;
  width: ${t=>t.progress*100}%;
`,J=o.div`
  display: flex;
  gap: 12px;
  font-size: 14px;
  color: #666;
`,Q=o.div`
  color: ${t=>t.isError?"#e53935":"inherit"};
`,X=o.div`
  margin-bottom: 24px;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,Z=o.h3`
  font-size: 18px;
  margin: 0 0 12px 0;
`,K=o.div`
  font-size: 14px;
  margin-bottom: 8px;
`,Y=o.div`
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`,oo=o.div`
  height: 100%;
  background-color: #2196f3;
  border-radius: 4px;
  transition: width 0.3s ease;
`,to=o.p`
  font-size: 16px;
  margin-bottom: 16px;
  color: #333;
`,eo=o.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 32px;
`,ao=o.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.03);
  width: 160px;
  position: relative;
`,ro=o.div`
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
`,so=o.div`
  position: relative;
  margin-bottom: 8px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`,no=o.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 6px;
`,io=o.video`
  max-width: 100%;
  max-height: 100%;
  border-radius: 6px;
`,po=o.div`
  position: absolute;
  bottom: 4px;
  left: 4px;
  right: 4px;
  height: 4px;
  background-color: rgba(0,0,0,0.2);
  border-radius: 2px;
  overflow: hidden;
`,co=o.div`
  height: 100%;
  background-color: ${t=>t.status==="processing"?"#ff9800":"#2196f3"};
  transition: width 0.3s ease;
  width: ${t=>t.progress*100}%;
`,lo=o.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 6px;
`,xo=o.div`
  font-size: 12px;
  color: #e53935;
  margin-bottom: 6px;
`,go=o.button`
  background-color: #e53935;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 8px;
  font-size: 12px;
  cursor: ${t=>t.disabled?"not-allowed":"pointer"};
  margin-top: auto;
  opacity: ${t=>t.disabled?.6:1};
`,bo=o.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`,h=o.button`
  padding: 14px 28px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  cursor: ${t=>t.disabled?"not-allowed":"pointer"};
  opacity: ${t=>t.disabled?.6:1};
`,mo=o(h)`
  background-color: #007bff;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
`,T=o(h)`
  background-color: #8c8c8c;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
`,uo=o(T)`
  color: ${t=>t.passwordSet?"#000000":"white"};
  font-weight: ${t=>t.passwordSet?"bold":"normal"};
`,fo=o.div`
  margin-top: 12px;
  margin-bottom: 12px;
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,ho=o.div`
  margin-bottom: 16px;
`,wo=o.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
`,vo=o.input`
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-sizing: border-box;
`,yo=o.textarea`
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  resize: vertical;
`,ko=o.div`
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
`,Po=o.div`
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  ${t=>f(t.isRTL)}
`,So=o.p`
  font-size: 16px;
  margin-bottom: 12px;
`,zo=o.p`
  font-size: 14px;
  margin-bottom: 16px;
  color: #666;
`,$o=o.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
  text-align: ${t=>t.isRTL?"right":"left"};
`,Io=o.div`
  color: #e53935;
  margin-bottom: 12px;
`,Bo=o.button`
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
`,Uo=o.button`
  width: 100%;
  padding: 12px;
  background-color: #6c757d;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: ${t=>t.disabled?"not-allowed":"pointer"};
  opacity: ${t=>t.disabled?.6:1};
`,Ao=o.div`
  margin-top: 24px;
  padding: 16px;
  background-color: #f0f0f0;
  border-radius: 8px;
`,Do=o.h3`
  margin: 0 0 12px 0;
  font-size: 16px;
`,To=o.pre`
  margin: 0;
  font-size: 12px;
  white-space: pre-wrap;
  max-height: 200px;
  overflow-y: auto;
`,Co=o.div`
  margin-bottom: 4px;
`,Mo=o.input`
  display: none;
`,No=o.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 4px 0;
  gap: 15px; /* Small gap for consistent spacing */
`,Eo=o.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  line-height: 24px; /* Added line-height to better align with taller toggle */
`,Lo=o.label`
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
`,jo=t=>{const[w,v]=e.useState(!1),[n,l]=e.useState(""),[y,i]=e.useState(""),[k,x]=e.useState(!1),[P,d]=e.useState(!1),S=e.useCallback(a=>{const r=/^[a-zA-Z0-9-]+$/.test(a);return console.log(`Username validation for '${a}': ${r}`),r},[]),p=e.useCallback(async(a,r)=>{var g,b;console.log(`Submitting username: ${a}`),d(!0),i("");const s=await D();if(!s){i(t("Authentication error. Please try again.")),d(!1);return}const $=`
      mutation MyMutation($savePublicProfileDisplayNameInput: SavePublicProfileDisplayNameInput) {
        changeMyAccountItem(savePublicProfileDisplayNameInput: $savePublicProfileDisplayNameInput) {
          ... on Profile {
            anyDisplayName
          }
        }
      }
    `,I={savePublicProfileDisplayNameInput:{anyDisplayName:a}};try{const c=await(await fetch(A,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify({query:$,variables:I})})).json(),u=(b=(g=c==null?void 0:c.data)==null?void 0:g.changeMyAccountItem)==null?void 0:b.anyDisplayName;if(u)r(u);else throw new Error("Username taken")}catch(m){console.error(`Error submitting username: ${m}`),i(t("Username is already taken. Please try a different one.")),x(!0),d(!1)}},[t]),z=e.useCallback(a=>{const r=Math.floor(1e5+Math.random()*9e5).toString(),s=`${n}${r}`;console.log(`Appending random digits to username: ${n} -> ${s}`),l(s),p(s,a)},[n,p]);return{showUsernamePrompt:w,setShowUsernamePrompt:v,usernameInput:n,setUsernameInput:l,usernameError:y,setUsernameError:i,showAltButton:k,setShowAltButton:x,isSubmittingUsername:P,setIsSubmittingUsername:d,validateUsername:S,submitUsername:p,appendRandomDigits:z}};export{Uo as $,L as A,F as B,R as C,Lo as D,xo as E,lo as F,E as G,j as H,Ro as I,T as J,uo as K,mo as L,so as M,ko as N,V as O,G as P,Po as Q,go as R,X as S,No as T,po as U,io as V,So as W,zo as X,$o as Y,Io as Z,Bo as _,O as a,Ao as a0,Do as a1,To as a2,Co as a3,H as b,_ as c,W as d,q as e,J as f,Q as g,Z as h,K as i,Y as j,oo as k,Mo as l,to as m,eo as n,ao as o,ro as p,no as q,co as r,bo as s,fo as t,jo as u,ho as v,wo as w,vo as x,yo as y,Eo as z};
