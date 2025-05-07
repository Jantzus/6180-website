import{f as i,d as o,l as a}from"./styled-components.browser.esm-DAVmpCtn.js";const d=i`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }
`,e=t=>a`
  direction: ${t?"rtl":"ltr"};
`,p=o.div`
  padding: 40px 20px;
  background-color: #f9fafb;
  min-height: 100vh;
  ${t=>e(t.isRTL)}
`,c=o.div`
  max-width: 900px;
  margin: 0 auto;
`,x=o.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`,l=o.div`
  margin-bottom: 12px;
`,g=o.a`
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
`;const b=o.div`
  margin-bottom: 24px;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,f=o.h3`
  font-size: 18px;
  margin: 0 0 12px 0;
`,m=o.div`
  margin-bottom: 12px;
`,u=o.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 6px;
`,h=o.div`
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`,w=o.div`
  height: 100%;
  background-color: #4caf50;
  border-radius: 4px;
  transition: width 0.3s ease;
  width: ${t=>t.progress*100}%;
`,v=o.div`
  display: flex;
  gap: 12px;
  font-size: 14px;
  color: #666;
`,y=o.div`
  color: ${t=>t.isError?"#e53935":"inherit"};
`,k=o.div`
  margin-bottom: 24px;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,z=o.h3`
  font-size: 18px;
  margin: 0 0 12px 0;
`,B=o.div`
  font-size: 14px;
  margin-bottom: 8px;
`,P=o.div`
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`,$=o.div`
  height: 100%;
  background-color: #2196f3;
  border-radius: 4px;
  transition: width 0.3s ease;
`,S=o.p`
  font-size: 16px;
  margin-bottom: 16px;
  color: #333;
`,T=o.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 32px;
`,I=o.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.03);
  width: 160px;
  position: relative;
`,C=o.div`
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
`,U=o.div`
  position: relative;
  margin-bottom: 8px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`,F=o.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 6px;
`,M=o.video`
  max-width: 100%;
  max-height: 100%;
  border-radius: 6px;
`,j=o.div`
  position: absolute;
  bottom: 4px;
  left: 4px;
  right: 4px;
  height: 4px;
  background-color: rgba(0,0,0,0.2);
  border-radius: 2px;
  overflow: hidden;
`,D=o.div`
  height: 100%;
  background-color: ${t=>t.status==="processing"?"#ff9800":"#2196f3"};
  transition: width 0.3s ease;
  width: ${t=>t.progress*100}%;
`,L=o.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 6px;
`,A=o.div`
  font-size: 12px;
  color: #e53935;
  margin-bottom: 6px;
`,R=o.button`
  background-color: #e53935;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 8px;
  font-size: 12px;
  cursor: ${t=>t.disabled?"not-allowed":"pointer"};
  margin-top: auto;
  opacity: ${t=>t.disabled?.6:1};
`,E=o.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`,r=o.button`
  padding: 14px 28px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  cursor: ${t=>t.disabled?"not-allowed":"pointer"};
  opacity: ${t=>t.disabled?.6:1};
`,G=o(r)`
  background-color: #007bff;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
`,s=o(r)`
  background-color: #8c8c8c;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
`,H=o(s)`
  color: ${t=>t.passwordSet?"#000000":"white"};
  font-weight: ${t=>t.passwordSet?"bold":"normal"};
`,O=o.div`
  margin-top: 12px;
  margin-bottom: 12px;
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,V=o.div`
  margin-bottom: 16px;
`,X=o.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
`,q=o.input`
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-sizing: border-box;
`,J=o.textarea`
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  resize: vertical;
`,K=o.div`
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
`,N=o.div`
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  ${t=>e(t.isRTL)}
`,Q=o.p`
  font-size: 16px;
  margin-bottom: 12px;
`,W=o.p`
  font-size: 14px;
  margin-bottom: 16px;
  color: #666;
`,Y=o.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
  text-align: ${t=>t.isRTL?"right":"left"};
`,Z=o.div`
  color: #e53935;
  margin-bottom: 12px;
`,_=o.button`
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
`,oo=o.button`
  width: 100%;
  padding: 12px;
  background-color: #6c757d;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: ${t=>t.disabled?"not-allowed":"pointer"};
  opacity: ${t=>t.disabled?.6:1};
`,to=o.div`
  margin-top: 24px;
  padding: 16px;
  background-color: #f0f0f0;
  border-radius: 8px;
`,eo=o.h3`
  margin: 0 0 12px 0;
  font-size: 16px;
`,ro=o.pre`
  margin: 0;
  font-size: 12px;
  white-space: pre-wrap;
  max-height: 200px;
  overflow-y: auto;
`,io=o.div`
  margin-bottom: 4px;
`,ao=o.input`
  display: none;
`,so=o.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 4px 0;
  gap: 15px; /* Small gap for consistent spacing */
`,no=o.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  line-height: 24px; /* Added line-height to better align with taller toggle */
`,po=o.label`
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
`,co=o.span`
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
`;export{to as $,p as A,l as B,c as C,co as D,A as E,L as F,d as G,x as H,s as I,H as J,G as K,K as L,U as M,N,m as O,b as P,Q,R,k as S,so as T,j as U,M as V,W,Y as X,Z as Y,_ as Z,oo as _,g as a,eo as a0,ro as a1,io as a2,f as b,u as c,h as d,w as e,v as f,y as g,z as h,B as i,P as j,$ as k,ao as l,S as m,T as n,I as o,C as p,F as q,D as r,E as s,O as t,V as u,X as v,q as w,J as x,no as y,po as z};
