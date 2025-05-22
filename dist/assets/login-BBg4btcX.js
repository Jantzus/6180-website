import{e as K,f as s,R as Q,j as e,I as Y,r as o,u as X,G as Z,A as ee,M as te,B as N,c as ne,d as k,g as oe,C as R,h as se,i as re,k as ie}from"./styled-components-D3YG4vsi.js";import{T as n}from"./components-DpHccgqE.js";import{C as ae,S as le,I as ce,R as de}from"./SignUpCommand-xXXTZ0sq.js";import"./parseJsonBody-B_rPtYL-.js";const _=new ae({region:K}),me=s(ie)`
  max-width: 400px;
  width: 100%;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.06);
  text-align: center;
`,pe=s.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
`,ge=s.div`
  margin-bottom: 24px;
`,ue=s.img`
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
`,he=s(z)`
  letter-spacing: 2px;
  text-align: center;
`,U=s.p`
  font-size: 13px;
  color: #666;
  margin-top: 16px;
  text-align: center;
`,xe=s.div`
  margin-top: 16px;
  font-size: 14px;
  color: #666;
  display: flex;
  justify-content: center;
  gap: 8px;
`,fe=s.button`
  background: none;
  border: none;
  color: #007bff;
  padding: 0;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
`,ye=s.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  padding: 20px;
`,je=s.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;function O(i){const p=i.trim().toLowerCase(),a="@gmail.com";return p.endsWith(a)?`${p.slice(0,-a.length).replace(/\./g,"")}${a}`:p}const Ce=()=>{const[i,p]=o.useState(""),[a,C]=o.useState(!1),[S,A]=o.useState(""),[W,$]=o.useState(""),[f,l]=o.useState("idle"),[P,g]=o.useState(""),[I,c]=o.useState(null),{t:u,language:v,loading:D}=X(),G=o.useRef(null),E=o.useRef(null),w=oe(v)==="rtl";o.useEffect(()=>{document.documentElement.lang=v,document.documentElement.dir=w?"rtl":"ltr"},[v,w]),o.useEffect(()=>{a&&E.current&&E.current.focus()},[a]);const d=new URLSearchParams(location.search).get("redirect")||"my-albums.html",B=(t=>t.startsWith("/")||t.startsWith(window.location.origin)||/^https?:\/\/([\w-]+\.)*6180\.app(\/.*)?$/.test(t))(d)?d.startsWith("http")||d.startsWith("/")?d:`/${d}`:"my-albums.html";function H(t){const r=t.target.value;/^\d*$/.test(r)&&r.length<=6&&A(r)}async function V(){var r;l("sending"),g("");const t=O(i);if(!t||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)){l("error"),g(u("Please enter a valid email address"));return}try{const m=new le({ClientId:R,Username:t,Password:crypto.randomUUID(),UserAttributes:[{Name:"email",Value:t}]});try{await _.send(m)}catch(x){if(!((r=x.name)!=null&&r.includes("UsernameExistsException")))throw x}const y=new ce({ClientId:R,AuthFlow:"CUSTOM_AUTH",AuthParameters:{USERNAME:t}}),h=await _.send(y);if(h.Session)$(h.Session),C(!0),l("idle");else throw new Error("No session returned from InitiateAuth")}catch(m){console.error(m),l("error"),g(u("Unable to send verification code. Please try again later."))}}async function F(){var r,m,y,h,x,T;l("verifying"),g("");const t=O(i);try{const b=new de({ClientId:R,ChallengeName:"CUSTOM_CHALLENGE",ChallengeResponses:{USERNAME:t,ANSWER:S},Session:W}),j=(r=(await _.send(b)).AuthenticationResult)==null?void 0:r.IdToken;if(!j)throw new Error("No token received");localStorage.setItem("idToken",j);const J=`${JSON.parse(atob(j.split(".")[1]))["cognito:username"]}_____Public____Profile`,L=await(await fetch(se,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${j}`},body:JSON.stringify({query:`
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
          `,variables:{relationIds:[J]}})})).json(),M=(T=(x=(h=(y=(m=L==null?void 0:L.data)==null?void 0:m.batchGetItems)==null?void 0:y.items)==null?void 0:h[0])==null?void 0:x.item)==null?void 0:T.anyDisplayName;M&&localStorage.setItem(re.PUBLIC_USERNAME,M),window.location.href=B}catch(b){console.error(b),l("error"),g(u("Invalid or expired verification code. Please try again or request a new code."))}}function q(){C(!1),A(""),l("idle")}return D?e.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"},children:"Loading..."}):e.jsxs(e.Fragment,{children:[e.jsx(Z,{}),e.jsx(ee,{isRTL:w,children:e.jsxs(ye,{children:[e.jsx(je,{children:e.jsxs(me,{children:[e.jsxs(ge,{children:[e.jsx(ue,{src:"images/logo_no_background.png",alt:"6180 Logo"}),e.jsx(pe,{children:e.jsx(n,{k:"Sign in to 6180"})})]}),P&&e.jsx(te,{type:"error",children:P}),a?e.jsxs(e.Fragment,{children:[e.jsxs(U,{style:{marginBottom:"16px",color:"#555"},children:[e.jsx(n,{k:"Check your email for a 6-digit verification code sent to"})," ",e.jsx("strong",{children:i})]}),e.jsx(he,{ref:E,type:"tel",inputMode:"numeric",pattern:"[0-9]*",maxLength:6,value:S,onChange:H,placeholder:u("Enter 6-digit code")}),e.jsx(N,{primary:!0,onClick:F,disabled:f==="verifying"||S.length!==6,style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#28a745"},children:f==="verifying"?e.jsx(n,{k:"Verifying..."}):e.jsx(n,{k:"Verify Code"})}),e.jsxs(xe,{children:[e.jsx("span",{children:e.jsx(n,{k:"Didn't receive a code?"})}),e.jsx(fe,{onClick:q,children:e.jsx(n,{k:"Send new code"})})]})]}):e.jsxs(e.Fragment,{children:[e.jsx(z,{ref:G,type:"email",value:i,onChange:t=>p(t.target.value),placeholder:u("Enter your email")}),e.jsx(N,{primary:!0,onClick:V,disabled:f==="sending"||!i.trim(),style:{width:"100%",padding:"12px",fontSize:"16px"},children:f==="sending"?e.jsx(n,{k:"Sending..."}):e.jsx(n,{k:"Send Verification Code"})}),e.jsx(U,{children:e.jsx(n,{k:"We'll send a secure verification code to your email"})})]})]})}),e.jsxs(ne,{children:[e.jsx(k,{href:"terms.html",isHovered:I==="terms",onMouseEnter:()=>c("terms"),onMouseLeave:()=>c(null),children:e.jsx(n,{k:"Terms of Service"})}),e.jsx(k,{href:"privacy.html",isHovered:I==="privacy",onMouseEnter:()=>c("privacy"),onMouseLeave:()=>c(null),children:e.jsx(n,{k:"Privacy Policy"})}),e.jsx(k,{href:"support.html",isHovered:I==="support",onMouseEnter:()=>c("support"),onMouseLeave:()=>c(null),children:e.jsx(n,{k:"Support"})})]})]})})]})},Se=localStorage.getItem("preferred-language")||localStorage.getItem("user_language")||"en";Q.createRoot(document.getElementById("root")).render(e.jsx(Y,{initialLanguage:Se,preloadLanguages:["en"],children:e.jsx(Ce,{})}));
