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
  margin-bottom: 20px;
`,l=o.div`
  margin-bottom: 12px;
`,g=o.a`
  font-size: 16px;
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
`,b=o.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,f=o.div`
  font-size: 16px;
  color: #666;
`,m=o.div`
  margin-bottom: 24px;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,u=o.h3`
  font-size: 18px;
  margin: 0 0 12px 0;
`,h=o.div`
  margin-bottom: 12px;
`,w=o.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 6px;
`,v=o.div`
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`,k=o.div`
  height: 100%;
  background-color: #4caf50;
  border-radius: 4px;
  transition: width 0.3s ease;
  width: ${t=>t.progress*100}%;
`,y=o.div`
  display: flex;
  gap: 12px;
  font-size: 14px;
  color: #666;
`,z=o.div`
  color: ${t=>t.isError?"#e53935":"inherit"};
`,B=o.div`
  margin-bottom: 24px;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,P=o.h3`
  font-size: 18px;
  margin: 0 0 12px 0;
`,S=o.div`
  font-size: 14px;
  margin-bottom: 8px;
`,$=o.div`
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`,I=o.div`
  height: 100%;
  background-color: #2196f3;
  border-radius: 4px;
  transition: width 0.3s ease;
`,T=o.p`
  font-size: 16px;
  margin-bottom: 16px;
  color: #333;
`,U=o.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 32px;
`,C=o.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.03);
  width: 160px;
  position: relative;
`,F=o.div`
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
`,M=o.div`
  position: relative;
  margin-bottom: 8px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`,D=o.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 6px;
`,L=o.video`
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
`,A=o.div`
  height: 100%;
  background-color: ${t=>t.status==="processing"?"#ff9800":"#2196f3"};
  transition: width 0.3s ease;
  width: ${t=>t.progress*100}%;
`,R=o.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 6px;
`,E=o.div`
  font-size: 12px;
  color: #e53935;
  margin-bottom: 6px;
`,G=o.button`
  background-color: #e53935;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 8px;
  font-size: 12px;
  cursor: ${t=>t.disabled?"not-allowed":"pointer"};
  margin-top: auto;
  opacity: ${t=>t.disabled?.6:1};
`,H=o.div`
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
`,O=o(r)`
  background-color: #007bff;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
`,s=o(r)`
  background-color: #8c8c8c;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
`,V=o(s)`
  color: ${t=>t.passwordSet?"#000000":"white"};
  font-weight: ${t=>t.passwordSet?"bold":"normal"};
`,X=o.div`
  margin-top: 12px;
  margin-bottom: 12px;
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,q=o.div`
  margin-bottom: 16px;
`,J=o.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
`,K=o.input`
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-sizing: border-box;
`,N=o.textarea`
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  resize: vertical;
`,Q=o.div`
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
`,W=o.div`
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  ${t=>e(t.isRTL)}
`,Y=o.p`
  font-size: 16px;
  margin-bottom: 12px;
`,Z=o.p`
  font-size: 14px;
  margin-bottom: 16px;
  color: #666;
`,_=o.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
  text-align: ${t=>t.isRTL?"right":"left"};
`,oo=o.div`
  color: #e53935;
  margin-bottom: 12px;
`,to=o.button`
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
`,eo=o.button`
  width: 100%;
  padding: 12px;
  background-color: #6c757d;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: ${t=>t.disabled?"not-allowed":"pointer"};
  opacity: ${t=>t.disabled?.6:1};
`,ro=o.div`
  margin-top: 24px;
  padding: 16px;
  background-color: #f0f0f0;
  border-radius: 8px;
`,io=o.h3`
  margin: 0 0 12px 0;
  font-size: 16px;
`,ao=o.pre`
  margin: 0;
  font-size: 12px;
  white-space: pre-wrap;
  max-height: 200px;
  overflow-y: auto;
`,so=o.div`
  margin-bottom: 4px;
`,no=o.input`
  display: none;
`,po=o.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 4px 0;
  gap: 15px; /* Small gap for consistent spacing */
`,co=o.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  line-height: 24px; /* Added line-height to better align with taller toggle */
`,xo=o.label`
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
`,lo=o.span`
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
`;export{to as $,p as A,l as B,c as C,co as D,E,R as F,d as G,x as H,xo as I,lo as J,s as K,V as L,M,O as N,h as O,m as P,Q,G as R,B as S,po as T,b as U,L as V,W,Y as X,Z as Y,_ as Z,oo as _,g as a,eo as a0,ro as a1,io as a2,ao as a3,so as a4,f as b,u as c,w as d,v as e,k as f,y as g,z as h,P as i,S as j,$ as k,I as l,no as m,T as n,U as o,C as p,F as q,D as r,j as s,A as t,H as u,X as v,q as w,J as x,K as y,N as z};
