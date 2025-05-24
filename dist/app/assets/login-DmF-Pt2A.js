import{k as Q,l as s,R as Y,j as e,I as X,a as o,u as Z,G as ee,A as te,d as C,M as ne,B as U,f as oe,h as R,g as se,C as P,m as re,n as ie,r as ae,o as le}from"./styled-components-BAlEjcON.js";import{T as n}from"./components-B8TfEkiw.js";import{C as ce,S as de,I as me,R as pe}from"./SignUpCommand-B3Vtav3_.js";import"./parseJsonBody-DYxX0SAc.js";const _=new ce({region:Q}),ge=s(le)`
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
`,W=s.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
  box-sizing: border-box;
`,fe=s(W)`
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
`;function z(i){const p=i.trim().toLowerCase(),a="@gmail.com";return p.endsWith(a)?`${p.slice(0,-a.length).replace(/\./g,"")}${a}`:p}const Ie=()=>{const[i,p]=o.useState(""),[a,S]=o.useState(!1),[I,A]=o.useState(""),[$,D]=o.useState(""),[f,l]=o.useState("idle"),[T,g]=o.useState(""),[v,c]=o.useState(null),{t:u,language:E,loading:G}=Z(),B=o.useRef(null),b=o.useRef(null),w=se(E)==="rtl";o.useEffect(()=>{document.documentElement.lang=E,document.documentElement.dir=w?"rtl":"ltr"},[E,w]),o.useEffect(()=>{a&&b.current&&b.current.focus()},[a]);const d=new URLSearchParams(location.search).get("redirect")||"my-albums.html",H=(t=>t.startsWith("/")||t.startsWith(window.location.origin)||/^https?:\/\/([\w-]+\.)*6180\.app(\/.*)?$/.test(t))(d)?d.startsWith("http")||d.startsWith("/")?d:`/${d}`:"my-albums.html";function V(t){const r=t.target.value;/^\d*$/.test(r)&&r.length<=6&&A(r)}async function F(){var r;l("sending"),g("");const t=z(i);if(!t||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)){l("error"),g(u("Please enter a valid email address"));return}try{const m=new de({ClientId:P,Username:t,Password:crypto.randomUUID(),UserAttributes:[{Name:"email",Value:t}]});try{await _.send(m)}catch(x){if(!((r=x.name)!=null&&r.includes("UsernameExistsException")))throw x}const y=new me({ClientId:P,AuthFlow:"CUSTOM_AUTH",AuthParameters:{USERNAME:t}}),h=await _.send(y);if(h.Session)D(h.Session),S(!0),l("idle");else throw new Error("No session returned from InitiateAuth")}catch(m){console.error(m),l("error"),g(u("Unable to send verification code. Please try again later."))}}async function q(){var r,m,y,h,x,M;l("verifying"),g("");const t=z(i);try{const L=new pe({ClientId:P,ChallengeName:"CUSTOM_CHALLENGE",ChallengeResponses:{USERNAME:t,ANSWER:I},Session:$}),j=(r=(await _.send(L)).AuthenticationResult)==null?void 0:r.IdToken;if(!j)throw new Error("No token received");localStorage.setItem("idToken",j);const K=`${JSON.parse(atob(j.split(".")[1]))["cognito:username"]}_____Public____Profile`,k=await(await fetch(re,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${j}`},body:JSON.stringify({query:`
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
          `,variables:{relationIds:[K]}})})).json(),N=(M=(x=(h=(y=(m=k==null?void 0:k.data)==null?void 0:m.batchGetItems)==null?void 0:y.items)==null?void 0:h[0])==null?void 0:x.item)==null?void 0:M.anyDisplayName;N&&localStorage.setItem(ie.PUBLIC_USERNAME,N),ae(H)}catch(L){console.error(L),l("error"),g(u("Invalid or expired verification code. Please try again or request a new code."))}}function J(){S(!1),A(""),l("idle")}return G?e.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"},children:"Loading..."}):e.jsxs(e.Fragment,{children:[e.jsx(ee,{}),e.jsx(te,{isRTL:w,children:e.jsxs(Ce,{children:[e.jsx(Se,{children:e.jsxs(ge,{children:[e.jsxs(he,{children:[e.jsx(xe,{src:C("images/logo_no_background.png"),alt:"6180 Logo"}),e.jsx(ue,{children:e.jsx(n,{k:"Sign in to 6180"})})]}),T&&e.jsx(ne,{type:"error",children:T}),a?e.jsxs(e.Fragment,{children:[e.jsxs(O,{style:{marginBottom:"16px",color:"#555"},children:[e.jsx(n,{k:"Check your email for a 6-digit verification code sent to"})," ",e.jsx("strong",{children:i})]}),e.jsx(fe,{ref:b,type:"tel",inputMode:"numeric",pattern:"[0-9]*",maxLength:6,value:I,onChange:V,placeholder:u("Enter 6-digit code")}),e.jsx(U,{primary:!0,onClick:q,disabled:f==="verifying"||I.length!==6,style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#28a745"},children:f==="verifying"?e.jsx(n,{k:"Verifying..."}):e.jsx(n,{k:"Verify Code"})}),e.jsxs(ye,{children:[e.jsx("span",{children:e.jsx(n,{k:"Didn't receive a code?"})}),e.jsx(je,{onClick:J,children:e.jsx(n,{k:"Send new code"})})]})]}):e.jsxs(e.Fragment,{children:[e.jsx(W,{ref:B,type:"email",value:i,onChange:t=>p(t.target.value),placeholder:u("Enter your email")}),e.jsx(U,{primary:!0,onClick:F,disabled:f==="sending"||!i.trim(),style:{width:"100%",padding:"12px",fontSize:"16px"},children:f==="sending"?e.jsx(n,{k:"Sending..."}):e.jsx(n,{k:"Send Verification Code"})}),e.jsx(O,{children:e.jsx(n,{k:"We'll send a secure verification code to your email"})})]})]})}),e.jsxs(oe,{children:[e.jsx(R,{href:C("terms.html"),isHovered:v==="terms",onMouseEnter:()=>c("terms"),onMouseLeave:()=>c(null),children:e.jsx(n,{k:"Terms of Service"})}),e.jsx(R,{href:C("privacy.html"),isHovered:v==="privacy",onMouseEnter:()=>c("privacy"),onMouseLeave:()=>c(null),children:e.jsx(n,{k:"Privacy Policy"})}),e.jsx(R,{href:C("support.html"),isHovered:v==="support",onMouseEnter:()=>c("support"),onMouseLeave:()=>c(null),children:e.jsx(n,{k:"Support"})})]})]})})]})},ve=localStorage.getItem("preferred-language")||localStorage.getItem("user_language")||"en";Y.createRoot(document.getElementById("root")).render(e.jsx(X,{initialLanguage:ve,preloadLanguages:["en"],children:e.jsx(Ie,{})}));
