import{A as X,d as c,R as Z,j as e,I as ee,r as n,u as te,b as S,g as ne,C as P,f as oe,L as se,a as re}from"./utils-BM__RYiI.js";import{G as ae,A as ie,M as ce,B as $,c as le,d as k,C as de}from"./styled-components-BL7UYftG.js";import{C as ue,S as me,I as pe,R as ge}from"./SignUpCommand-CJlj2wXS.js";import"./parseJsonBody-CYlBkFPg.js";const _=new ue({region:X}),xe=()=>{const[t,a]=n.useState(!1),[o,l]=n.useState(null);n.useEffect(()=>{a(!0),typeof document<"u"&&l(document)},[]);const r=n.useCallback(x=>{t&&o&&(o.documentElement.lang=x)},[t,o]),u=n.useCallback(x=>{t&&o&&(o.documentElement.dir=x)},[t,o]);return{setDocumentLang:r,setDocumentDir:u,isClient:t}},fe=()=>{const[t,a]=n.useState(!1);n.useEffect(()=>{a(!0)},[]);const o=n.useCallback((r,u)=>{if(!(!t||typeof localStorage>"u"))try{localStorage.setItem(r,u)}catch{console.warn("localStorage not available")}},[t]),l=n.useCallback(r=>{if(!t||typeof localStorage>"u")return null;try{return localStorage.getItem(r)}catch{return null}},[t]);return{setItem:o,getItem:l,isClient:t}},he=()=>{const[t,a]=n.useState(!1);return n.useEffect(()=>{a(!0)},[]),{generateUUID:n.useCallback(()=>t&&typeof crypto<"u"&&crypto.randomUUID?crypto.randomUUID():"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(l){const r=Math.random()*16|0;return(l==="x"?r:r&3|8).toString(16)}),[t]),isClient:t}},ye=c(de)`
  max-width: 450px;
  width: 100%;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.06);
  text-align: center;
`,Ce=c.div`
  margin-bottom: 24px;
`,Se=c.img`
  height: 60px;
  margin-bottom: 16px;
`,H=c.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
  box-sizing: border-box;
`,Ie=c(H)`
  letter-spacing: 2px;
  text-align: center;
`,z=c.p`
  font-size: 13px;
  color: #666;
  margin-top: 16px;
  text-align: center;
`,be=c.div`
  margin-top: 16px;
  font-size: 14px;
  color: #666;
  display: flex;
  justify-content: center;
  gap: 8px;
`,ve=c.button`
  background: none;
  border: none;
  color: #007bff;
  padding: 0;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
`,Ee=c.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  padding: 20px;
`,je=c.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;function B(t){const a=t.trim().toLowerCase(),o="@gmail.com";return a.endsWith(o)?`${a.slice(0,-o.length).replace(/\./g,"")}${o}`:a}const Le=()=>{const[t,a]=n.useState(""),[o,l]=n.useState(!1),[r,u]=n.useState(""),[x,G]=n.useState(""),[I,m]=n.useState("idle"),[D,f]=n.useState(""),[v,p]=n.useState(null),{t:s,language:E}=te(),{setDocumentLang:M,setDocumentDir:N}=xe(),T=fe(),{generateUUID:F}=he(),W=n.useRef(null),j=n.useRef(null),L=ne(E)==="rtl";n.useEffect(()=>{M(E),N(L?"rtl":"ltr")},[E,L,M,N]),n.useEffect(()=>{o&&j.current&&j.current.focus()},[o]);const q="storage/manage.html";function V(i){const d=i.target.value;/^\d*$/.test(d)&&d.length<=6&&u(d)}async function J(){var d;m("sending"),f("");const i=B(t);if(!i||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i)){m("error"),f(s("Please enter a valid email address"));return}try{const g=new me({ClientId:P,Username:i,Password:F(),UserAttributes:[{Name:"email",Value:i}]});try{await _.send(g)}catch(y){if(!((d=y.name)!=null&&d.includes("UsernameExistsException")))throw y}const b=new pe({ClientId:P,AuthFlow:"CUSTOM_AUTH",AuthParameters:{USERNAME:i}}),h=await _.send(b);if(h.Session)G(h.Session),l(!0),m("idle");else throw new Error("No session returned from InitiateAuth")}catch(g){console.error(g),m("error"),f(s("Unable to send verification code. Please try again later."))}}async function K(){var d,g,b,h,y,w;m("verifying"),f("");const i=B(t);try{const R=new ge({ClientId:P,ChallengeName:"CUSTOM_CHALLENGE",ChallengeResponses:{USERNAME:i,ANSWER:r},Session:x}),C=(d=(await _.send(R)).AuthenticationResult)==null?void 0:d.IdToken;if(!C)throw new Error("No token received");T.setItem("idToken",C);let A;try{typeof atob<"u"?A=JSON.parse(atob(C.split(".")[1])):A=JSON.parse(Buffer.from(C.split(".")[1],"base64").toString())}catch{throw new Error("Failed to parse token")}const Y=`${A["cognito:username"]}_____Public____Profile`,U=await(await fetch(oe,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${C}`},body:JSON.stringify({query:`
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
          `,variables:{relationIds:[Y]}})})).json(),O=(w=(y=(h=(b=(g=U==null?void 0:U.data)==null?void 0:g.batchGetItems)==null?void 0:b.items)==null?void 0:h[0])==null?void 0:y.item)==null?void 0:w.anyDisplayName;O&&T.setItem(se.PUBLIC_USERNAME,O),re(S(q))}catch(R){console.error(R),m("error"),f(s("Invalid or expired verification code. Please try again or request a new code."))}}function Q(){l(!1),u(""),m("idle")}return e.jsxs(e.Fragment,{children:[e.jsx(ae,{}),e.jsx(ie,{$isRTL:L,children:e.jsxs(Ee,{children:[e.jsx(je,{children:e.jsxs(ye,{children:[e.jsxs(Ce,{children:[e.jsx(Se,{src:S("images/logo_no_background.png"),alt:"6180 Logo"}),e.jsx("div",{style:{fontSize:"18px",color:"#333",lineHeight:"1.5",marginBottom:"24px",textAlign:"center"},children:s("Upgrade your subscription to continue uploading files.")})]}),D&&e.jsx(ce,{$type:"error",children:D}),o?e.jsxs(e.Fragment,{children:[e.jsxs(z,{style:{marginBottom:"16px",color:"#555"},children:[s("Check your email for a 6-digit verification code sent to")," ",e.jsx("strong",{children:t})]}),e.jsx(Ie,{ref:j,type:"tel",inputMode:"numeric",pattern:"[0-9]*",maxLength:6,value:r,onChange:V,placeholder:s("Enter 6-digit code")}),e.jsx($,{$primary:!0,onClick:K,disabled:I==="verifying"||r.length!==6,style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#28a745"},children:s(I==="verifying"?"Verifying...":"Storage Management")}),e.jsxs(be,{children:[e.jsx("span",{children:s("Didn't receive a code?")}),e.jsx(ve,{onClick:Q,children:s("Send new code")})]})]}):e.jsxs(e.Fragment,{children:[e.jsx(H,{ref:W,type:"email",value:t,onChange:i=>a(i.target.value),placeholder:s("Enter your email")}),e.jsx($,{$primary:!0,onClick:J,disabled:I==="sending"||!t.trim(),style:{width:"100%",padding:"12px",fontSize:"16px"},children:s(I==="sending"?"Sending...":"Send Verification Code")}),e.jsx(z,{children:s("We'll send a secure verification code to your email")})]})]})}),e.jsxs(le,{children:[e.jsx(k,{href:S("terms.html"),$isHovered:v==="terms",onMouseEnter:()=>p("terms"),onMouseLeave:()=>p(null),children:s("Terms of Service")}),e.jsx(k,{href:S("privacy.html"),$isHovered:v==="privacy",onMouseEnter:()=>p("privacy"),onMouseLeave:()=>p(null),children:s("Privacy Policy")}),e.jsx(k,{href:S("support.html"),$isHovered:v==="support",onMouseEnter:()=>p("support"),onMouseLeave:()=>p(null),children:s("Support")})]})]})})]})},we=()=>e.jsx(ee,{children:e.jsx(Le,{})});if(typeof document<"u"){const t=document.getElementById("root");t&&Z.createRoot(t).render(e.jsx(we,{}))}
