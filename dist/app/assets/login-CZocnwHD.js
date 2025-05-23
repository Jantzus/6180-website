import{i as Q,k as s,R as Y,j as e,I as X,a as o,u as Z,G as ee,A as te,M as ne,B as U,e as oe,f as R,g as se,C as P,l as re,m as ie,r as ae,n as le}from"./styled-components-B6oG4J13.js";import{T as n}from"./components-CSV0daSa.js";import{C as ce,S as de,I as me,R as pe}from"./SignUpCommand-CTmZ2GN1.js";import"./parseJsonBody-vQ78qSUK.js";const _=new ce({region:Q}),ge=s(le)`
  max-width: 400px;
  width: 100%;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.06);
  text-align: center;
`,ue=s.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
`,he=s.div`
  margin-bottom: 24px;
`,xe=s.img`
  height: 60px;
  margin-bottom: 16px;
`,z=s.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
  box-sizing: border-box;
`,fe=s(z)`
  letter-spacing: 2px;
  text-align: center;
`,O=s.p`
  font-size: 13px;
  color: #666;
  margin-top: 16px;
  text-align: center;
`,ye=s.div`
  margin-top: 16px;
  font-size: 14px;
  color: #666;
  display: flex;
  justify-content: center;
  gap: 8px;
`,je=s.button`
  background: none;
  border: none;
  color: #007bff;
  padding: 0;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
`,Ce=s.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  padding: 20px;
`,Se=s.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;function W(i){const p=i.trim().toLowerCase(),a="@gmail.com";return p.endsWith(a)?`${p.slice(0,-a.length).replace(/\./g,"")}${a}`:p}const Ie=()=>{const[i,p]=o.useState(""),[a,S]=o.useState(!1),[I,A]=o.useState(""),[$,D]=o.useState(""),[y,l]=o.useState("idle"),[T,g]=o.useState(""),[v,c]=o.useState(null),{t:u,language:E,loading:G}=Z(),B=o.useRef(null),w=o.useRef(null),b=se(E)==="rtl";o.useEffect(()=>{document.documentElement.lang=E,document.documentElement.dir=b?"rtl":"ltr"},[E,b]),o.useEffect(()=>{a&&w.current&&w.current.focus()},[a]);const d=new URLSearchParams(location.search).get("redirect")||"my-albums.html",h=(t=>t.startsWith("/")||t.startsWith(window.location.origin)||/^https?:\/\/([\w-]+\.)*6180\.app(\/.*)?$/.test(t))(d)?d.startsWith("http")||d.startsWith("/")?d:`/${d}`:"my-albums.html";function H(t){const r=t.target.value;/^\d*$/.test(r)&&r.length<=6&&A(r)}async function V(){var r;l("sending"),g("");const t=W(i);if(!t||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)){l("error"),g(u("Please enter a valid email address"));return}try{const m=new de({ClientId:P,Username:t,Password:crypto.randomUUID(),UserAttributes:[{Name:"email",Value:t}]});try{await _.send(m)}catch(f){if(!((r=f.name)!=null&&r.includes("UsernameExistsException")))throw f}const j=new me({ClientId:P,AuthFlow:"CUSTOM_AUTH",AuthParameters:{USERNAME:t}}),x=await _.send(j);if(x.Session)D(x.Session),S(!0),l("idle");else throw new Error("No session returned from InitiateAuth")}catch(m){console.error(m),l("error"),g(u("Unable to send verification code. Please try again later."))}}async function F(){var r,m,j,x,f,M;l("verifying"),g("");const t=W(i);try{const L=new pe({ClientId:P,ChallengeName:"CUSTOM_CHALLENGE",ChallengeResponses:{USERNAME:t,ANSWER:I},Session:$}),C=(r=(await _.send(L)).AuthenticationResult)==null?void 0:r.IdToken;if(!C)throw new Error("No token received");localStorage.setItem("idToken",C);const J=`${JSON.parse(atob(C.split(".")[1]))["cognito:username"]}_____Public____Profile`,k=await(await fetch(re,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${C}`},body:JSON.stringify({query:`
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
          `,variables:{relationIds:[J]}})})).json(),N=(M=(f=(x=(j=(m=k==null?void 0:k.data)==null?void 0:m.batchGetItems)==null?void 0:j.items)==null?void 0:x[0])==null?void 0:f.item)==null?void 0:M.anyDisplayName;if(N&&localStorage.setItem(ie.PUBLIC_USERNAME,N),h.startsWith("http"))window.location.href=h;else{const K=h.startsWith("/")?h.slice(1):h;ae(K)}}catch(L){console.error(L),l("error"),g(u("Invalid or expired verification code. Please try again or request a new code."))}}function q(){S(!1),A(""),l("idle")}return G?e.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"},children:"Loading..."}):e.jsxs(e.Fragment,{children:[e.jsx(ee,{}),e.jsx(te,{isRTL:b,children:e.jsxs(Ce,{children:[e.jsx(Se,{children:e.jsxs(ge,{children:[e.jsxs(he,{children:[e.jsx(xe,{src:"images/logo_no_background.png",alt:"6180 Logo"}),e.jsx(ue,{children:e.jsx(n,{k:"Sign in to 6180"})})]}),T&&e.jsx(ne,{type:"error",children:T}),a?e.jsxs(e.Fragment,{children:[e.jsxs(O,{style:{marginBottom:"16px",color:"#555"},children:[e.jsx(n,{k:"Check your email for a 6-digit verification code sent to"})," ",e.jsx("strong",{children:i})]}),e.jsx(fe,{ref:w,type:"tel",inputMode:"numeric",pattern:"[0-9]*",maxLength:6,value:I,onChange:H,placeholder:u("Enter 6-digit code")}),e.jsx(U,{primary:!0,onClick:F,disabled:y==="verifying"||I.length!==6,style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#28a745"},children:y==="verifying"?e.jsx(n,{k:"Verifying..."}):e.jsx(n,{k:"Verify Code"})}),e.jsxs(ye,{children:[e.jsx("span",{children:e.jsx(n,{k:"Didn't receive a code?"})}),e.jsx(je,{onClick:q,children:e.jsx(n,{k:"Send new code"})})]})]}):e.jsxs(e.Fragment,{children:[e.jsx(z,{ref:B,type:"email",value:i,onChange:t=>p(t.target.value),placeholder:u("Enter your email")}),e.jsx(U,{primary:!0,onClick:V,disabled:y==="sending"||!i.trim(),style:{width:"100%",padding:"12px",fontSize:"16px"},children:y==="sending"?e.jsx(n,{k:"Sending..."}):e.jsx(n,{k:"Send Verification Code"})}),e.jsx(O,{children:e.jsx(n,{k:"We'll send a secure verification code to your email"})})]})]})}),e.jsxs(oe,{children:[e.jsx(R,{href:"terms.html",isHovered:v==="terms",onMouseEnter:()=>c("terms"),onMouseLeave:()=>c(null),children:e.jsx(n,{k:"Terms of Service"})}),e.jsx(R,{href:"privacy.html",isHovered:v==="privacy",onMouseEnter:()=>c("privacy"),onMouseLeave:()=>c(null),children:e.jsx(n,{k:"Privacy Policy"})}),e.jsx(R,{href:"support.html",isHovered:v==="support",onMouseEnter:()=>c("support"),onMouseLeave:()=>c(null),children:e.jsx(n,{k:"Support"})})]})]})})]})},ve=localStorage.getItem("preferred-language")||localStorage.getItem("user_language")||"en";Y.createRoot(document.getElementById("root")).render(e.jsx(X,{initialLanguage:ve,preloadLanguages:["en"],children:e.jsx(Ie,{})}));
