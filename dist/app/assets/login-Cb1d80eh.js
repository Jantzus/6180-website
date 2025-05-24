import{k as Y,l as s,R as X,j as e,I as Z,a as o,u as ee,G as te,A as ne,M as oe,B as O,e as se,f as R,h as P,g as re,C as _,m as ie,n as ae,r as le,o as ce}from"./styled-components-C8WHyvoU.js";import{T as n}from"./components-9OpJRiOh.js";import{C as de,S as me,I as pe,R as ge}from"./SignUpCommand-Di9Pgkqu.js";import"./parseJsonBody-DIfvFOKw.js";const A=new de({region:Y}),ue=s(ce)`
  max-width: 400px;
  width: 100%;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.06);
  text-align: center;
`,he=s.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
`,xe=s.div`
  margin-bottom: 24px;
`,fe=s.img`
  height: 60px;
  margin-bottom: 16px;
`,$=s.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
  box-sizing: border-box;
`,ye=s($)`
  letter-spacing: 2px;
  text-align: center;
`,W=s.p`
  font-size: 13px;
  color: #666;
  margin-top: 16px;
  text-align: center;
`,je=s.div`
  margin-top: 16px;
  font-size: 14px;
  color: #666;
  display: flex;
  justify-content: center;
  gap: 8px;
`,Ce=s.button`
  background: none;
  border: none;
  color: #007bff;
  padding: 0;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
`,Se=s.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  padding: 20px;
`,Ie=s.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;function z(i){const p=i.trim().toLowerCase(),a="@gmail.com";return p.endsWith(a)?`${p.slice(0,-a.length).replace(/\./g,"")}${a}`:p}const ve=()=>{const[i,p]=o.useState(""),[a,S]=o.useState(!1),[I,T]=o.useState(""),[D,G]=o.useState(""),[y,l]=o.useState("idle"),[M,g]=o.useState(""),[v,c]=o.useState(null),{t:u,language:E,loading:B}=ee(),H=o.useRef(null),w=o.useRef(null),b=re(E)==="rtl";o.useEffect(()=>{document.documentElement.lang=E,document.documentElement.dir=b?"rtl":"ltr"},[E,b]),o.useEffect(()=>{a&&w.current&&w.current.focus()},[a]);const d=new URLSearchParams(location.search).get("redirect")||"my-albums.html",h=(t=>t.startsWith("/")||t.startsWith(window.location.origin)||/^https?:\/\/([\w-]+\.)*6180\.app(\/.*)?$/.test(t))(d)?d.startsWith("http")||d.startsWith("/")?d:`/${d}`:"my-albums.html";function V(t){const r=t.target.value;/^\d*$/.test(r)&&r.length<=6&&T(r)}async function F(){var r;l("sending"),g("");const t=z(i);if(!t||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)){l("error"),g(u("Please enter a valid email address"));return}try{const m=new me({ClientId:_,Username:t,Password:crypto.randomUUID(),UserAttributes:[{Name:"email",Value:t}]});try{await A.send(m)}catch(f){if(!((r=f.name)!=null&&r.includes("UsernameExistsException")))throw f}const j=new pe({ClientId:_,AuthFlow:"CUSTOM_AUTH",AuthParameters:{USERNAME:t}}),x=await A.send(j);if(x.Session)G(x.Session),S(!0),l("idle");else throw new Error("No session returned from InitiateAuth")}catch(m){console.error(m),l("error"),g(u("Unable to send verification code. Please try again later."))}}async function q(){var r,m,j,x,f,N;l("verifying"),g("");const t=z(i);try{const L=new ge({ClientId:_,ChallengeName:"CUSTOM_CHALLENGE",ChallengeResponses:{USERNAME:t,ANSWER:I},Session:D}),C=(r=(await A.send(L)).AuthenticationResult)==null?void 0:r.IdToken;if(!C)throw new Error("No token received");localStorage.setItem("idToken",C);const K=`${JSON.parse(atob(C.split(".")[1]))["cognito:username"]}_____Public____Profile`,k=await(await fetch(ie,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${C}`},body:JSON.stringify({query:`
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
          `,variables:{relationIds:[K]}})})).json(),U=(N=(f=(x=(j=(m=k==null?void 0:k.data)==null?void 0:m.batchGetItems)==null?void 0:j.items)==null?void 0:x[0])==null?void 0:f.item)==null?void 0:N.anyDisplayName;if(U&&localStorage.setItem(ae.PUBLIC_USERNAME,U),h.startsWith("http"))window.location.href=h;else{const Q=h.startsWith("/")?h.slice(1):h;le(Q)}}catch(L){console.error(L),l("error"),g(u("Invalid or expired verification code. Please try again or request a new code."))}}function J(){S(!1),T(""),l("idle")}return B?e.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"},children:"Loading..."}):e.jsxs(e.Fragment,{children:[e.jsx(te,{}),e.jsx(ne,{isRTL:b,children:e.jsxs(Se,{children:[e.jsx(Ie,{children:e.jsxs(ue,{children:[e.jsxs(xe,{children:[e.jsx(fe,{src:"images/logo_no_background.png",alt:"6180 Logo"}),e.jsx(he,{children:e.jsx(n,{k:"Sign in to 6180"})})]}),M&&e.jsx(oe,{type:"error",children:M}),a?e.jsxs(e.Fragment,{children:[e.jsxs(W,{style:{marginBottom:"16px",color:"#555"},children:[e.jsx(n,{k:"Check your email for a 6-digit verification code sent to"})," ",e.jsx("strong",{children:i})]}),e.jsx(ye,{ref:w,type:"tel",inputMode:"numeric",pattern:"[0-9]*",maxLength:6,value:I,onChange:V,placeholder:u("Enter 6-digit code")}),e.jsx(O,{primary:!0,onClick:q,disabled:y==="verifying"||I.length!==6,style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#28a745"},children:y==="verifying"?e.jsx(n,{k:"Verifying..."}):e.jsx(n,{k:"Verify Code"})}),e.jsxs(je,{children:[e.jsx("span",{children:e.jsx(n,{k:"Didn't receive a code?"})}),e.jsx(Ce,{onClick:J,children:e.jsx(n,{k:"Send new code"})})]})]}):e.jsxs(e.Fragment,{children:[e.jsx($,{ref:H,type:"email",value:i,onChange:t=>p(t.target.value),placeholder:u("Enter your email")}),e.jsx(O,{primary:!0,onClick:F,disabled:y==="sending"||!i.trim(),style:{width:"100%",padding:"12px",fontSize:"16px"},children:y==="sending"?e.jsx(n,{k:"Sending..."}):e.jsx(n,{k:"Send Verification Code"})}),e.jsx(W,{children:e.jsx(n,{k:"We'll send a secure verification code to your email"})})]})]})}),e.jsxs(se,{children:[e.jsx(R,{href:P("terms.html"),isHovered:v==="terms",onMouseEnter:()=>c("terms"),onMouseLeave:()=>c(null),children:e.jsx(n,{k:"Terms of Service"})}),e.jsx(R,{href:P("privacy.html"),isHovered:v==="privacy",onMouseEnter:()=>c("privacy"),onMouseLeave:()=>c(null),children:e.jsx(n,{k:"Privacy Policy"})}),e.jsx(R,{href:P("support.html"),isHovered:v==="support",onMouseEnter:()=>c("support"),onMouseLeave:()=>c(null),children:e.jsx(n,{k:"Support"})})]})]})})]})},Ee=localStorage.getItem("preferred-language")||localStorage.getItem("user_language")||"en";X.createRoot(document.getElementById("root")).render(e.jsx(Z,{initialLanguage:Ee,preloadLanguages:["en"],children:e.jsx(ve,{})}));
