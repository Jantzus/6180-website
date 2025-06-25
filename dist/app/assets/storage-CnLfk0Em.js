import{A as Y,d as c,R as X,j as e,I as Z,r as n,u as ee,b as y,g as te,C as A,f as ne,L as oe,a as se}from"./utils-Dg1WdiuL.js";import{G as re,A as ae,M as ie,B as O,c as ce,d as U,C as le}from"./styled-components-CkPYYn5H.js";import{C as de,S as ue,I as me,R as pe}from"./SignUpCommand-vrui1KgE.js";import"./parseJsonBody-f1bxRLBK.js";const P=new de({region:Y}),ge=()=>{const[t,a]=n.useState(!1),[o,l]=n.useState(null);n.useEffect(()=>{a(!0),l(document)},[]);const r=n.useCallback(x=>{t&&o&&(o.documentElement.lang=x)},[t,o]),u=n.useCallback(x=>{t&&o&&(o.documentElement.dir=x)},[t,o]);return{setDocumentLang:r,setDocumentDir:u,isClient:t}},xe=()=>{const[t,a]=n.useState(!1);n.useEffect(()=>{a(!0)},[]);const o=n.useCallback((r,u)=>{if(t)try{localStorage.setItem(r,u)}catch{console.warn("localStorage not available")}},[t]),l=n.useCallback(r=>{if(!t)return null;try{return localStorage.getItem(r)}catch{return null}},[t]);return{setItem:o,getItem:l,isClient:t}},fe=()=>{const[t,a]=n.useState(!1);return n.useEffect(()=>{a(!0)},[]),{generateUUID:n.useCallback(()=>t&&typeof crypto<"u"&&crypto.randomUUID?crypto.randomUUID():"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(l){const r=Math.random()*16|0;return(l==="x"?r:r&3|8).toString(16)}),[t]),isClient:t}},he=c(le)`
  max-width: 450px;
  width: 100%;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.06);
  text-align: center;
`,Ce=c.div`
  margin-bottom: 24px;
`,ye=c.img`
  height: 60px;
  margin-bottom: 16px;
`,B=c.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
  box-sizing: border-box;
`,Se=c(B)`
  letter-spacing: 2px;
  text-align: center;
`,$=c.p`
  font-size: 13px;
  color: #666;
  margin-top: 16px;
  text-align: center;
`,Ie=c.div`
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
`,be=c.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  padding: 20px;
`,Ee=c.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;function z(t){const a=t.trim().toLowerCase(),o="@gmail.com";return a.endsWith(o)?`${a.slice(0,-o.length).replace(/\./g,"")}${o}`:a}const je=()=>{const[t,a]=n.useState(""),[o,l]=n.useState(!1),[r,u]=n.useState(""),[x,G]=n.useState(""),[S,m]=n.useState("idle"),[_,f]=n.useState(""),[b,p]=n.useState(null),{t:s,language:E}=ee(),{setDocumentLang:k,setDocumentDir:D}=ge(),M=xe(),{generateUUID:H}=fe(),W=n.useRef(null),j=n.useRef(null),L=te(E)==="rtl";n.useEffect(()=>{k(E),D(L?"rtl":"ltr")},[E,L,k,D]),n.useEffect(()=>{o&&j.current&&j.current.focus()},[o]);const F="storage/manage.html";function q(i){const d=i.target.value;/^\d*$/.test(d)&&d.length<=6&&u(d)}async function V(){var d;m("sending"),f("");const i=z(t);if(!i||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i)){m("error"),f(s("Please enter a valid email address"));return}try{const g=new ue({ClientId:A,Username:i,Password:H(),UserAttributes:[{Name:"email",Value:i}]});try{await P.send(g)}catch(C){if(!((d=C.name)!=null&&d.includes("UsernameExistsException")))throw C}const I=new me({ClientId:A,AuthFlow:"CUSTOM_AUTH",AuthParameters:{USERNAME:i}}),h=await P.send(I);if(h.Session)G(h.Session),l(!0),m("idle");else throw new Error("No session returned from InitiateAuth")}catch(g){console.error(g),m("error"),f(s("Unable to send verification code. Please try again later."))}}async function J(){var d,g,I,h,C,T;m("verifying"),f("");const i=z(t);try{const w=new pe({ClientId:A,ChallengeName:"CUSTOM_CHALLENGE",ChallengeResponses:{USERNAME:i,ANSWER:r},Session:x}),v=(d=(await P.send(w)).AuthenticationResult)==null?void 0:d.IdToken;if(!v)throw new Error("No token received");M.setItem("idToken",v);const Q=`${JSON.parse(atob(v.split(".")[1]))["cognito:username"]}_____Public____Profile`,R=await(await fetch(ne,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${v}`},body:JSON.stringify({query:`
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
          `,variables:{relationIds:[Q]}})})).json(),N=(T=(C=(h=(I=(g=R==null?void 0:R.data)==null?void 0:g.batchGetItems)==null?void 0:I.items)==null?void 0:h[0])==null?void 0:C.item)==null?void 0:T.anyDisplayName;N&&M.setItem(oe.PUBLIC_USERNAME,N),se(y(F))}catch(w){console.error(w),m("error"),f(s("Invalid or expired verification code. Please try again or request a new code."))}}function K(){l(!1),u(""),m("idle")}return e.jsxs(e.Fragment,{children:[e.jsx(re,{}),e.jsx(ae,{$isRTL:L,children:e.jsxs(be,{children:[e.jsx(Ee,{children:e.jsxs(he,{children:[e.jsxs(Ce,{children:[e.jsx(ye,{src:y("images/logo_no_background.png"),alt:"6180 Logo"}),e.jsx("div",{style:{fontSize:"18px",color:"#333",lineHeight:"1.5",marginBottom:"24px",textAlign:"center"},children:s("Upgrade your subscription to continue uploading files.")})]}),_&&e.jsx(ie,{$type:"error",children:_}),o?e.jsxs(e.Fragment,{children:[e.jsxs($,{style:{marginBottom:"16px",color:"#555"},children:[s("Check your email for a 6-digit verification code sent to")," ",e.jsx("strong",{children:t})]}),e.jsx(Se,{ref:j,type:"tel",inputMode:"numeric",pattern:"[0-9]*",maxLength:6,value:r,onChange:q,placeholder:s("Enter 6-digit code")}),e.jsx(O,{$primary:!0,onClick:J,disabled:S==="verifying"||r.length!==6,style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#28a745"},children:s(S==="verifying"?"Verifying...":"Storage Management")}),e.jsxs(Ie,{children:[e.jsx("span",{children:s("Didn't receive a code?")}),e.jsx(ve,{onClick:K,children:s("Send new code")})]})]}):e.jsxs(e.Fragment,{children:[e.jsx(B,{ref:W,type:"email",value:t,onChange:i=>a(i.target.value),placeholder:s("Enter your email")}),e.jsx(O,{$primary:!0,onClick:V,disabled:S==="sending"||!t.trim(),style:{width:"100%",padding:"12px",fontSize:"16px"},children:s(S==="sending"?"Sending...":"Send Verification Code")}),e.jsx($,{children:s("We'll send a secure verification code to your email")})]})]})}),e.jsxs(ce,{children:[e.jsx(U,{href:y("terms.html"),$isHovered:b==="terms",onMouseEnter:()=>p("terms"),onMouseLeave:()=>p(null),children:s("Terms of Service")}),e.jsx(U,{href:y("privacy.html"),$isHovered:b==="privacy",onMouseEnter:()=>p("privacy"),onMouseLeave:()=>p(null),children:s("Privacy Policy")}),e.jsx(U,{href:y("support.html"),$isHovered:b==="support",onMouseEnter:()=>p("support"),onMouseLeave:()=>p(null),children:s("Support")})]})]})})]})},Le=()=>e.jsx(Z,{children:e.jsx(je,{})});X.createRoot(document.getElementById("root")).render(e.jsx(Le,{}));
