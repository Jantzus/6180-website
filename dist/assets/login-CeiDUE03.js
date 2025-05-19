import{e as Q,f as s,R as Y,j as e,I as X,r as n,u as Z,h as ee,G as te,A as ne,M as oe,B as U,c as se,d as L,C as R,i as re,k as ie,l as ae}from"./styled-components-CsRi_P85.js";import{T as le,a as o,A as ce}from"./components-OMtG7iOJ.js";import{C as de,S as pe,I as ue,R as me}from"./SignUpCommand-DOmriQUl.js";import"./parseJsonBody-Cyelqa0u.js";const T=new de({region:Q}),ge=s(ae)`
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
`,z=s.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
  box-sizing: border-box;
`,ye=s(z)`
  letter-spacing: 2px;
  text-align: center;
`,O=s.p`
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
`,ve=s.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;function W(r){const u=r.trim().toLowerCase(),a="@gmail.com";return u.endsWith(a)?`${u.slice(0,-a.length).replace(/\./g,"")}${a}`:u}const Ie=()=>{const[r,u]=n.useState(""),[a,C]=n.useState(!1),[S,A]=n.useState(""),[$,G]=n.useState(""),[f,l]=n.useState("idle"),[_,m]=n.useState(""),[v,c]=n.useState(null),{t:g,language:P,loading:I}=Z(),{translation:B}=ee("We'll send a secure verification code to your email"),D=n.useRef(null),E=n.useRef(null),b=["ar","he","fa","ur","ps","sd"].includes(P.split("-")[0]);n.useEffect(()=>{document.documentElement.dir=b?"rtl":"ltr"},[P,b]),n.useEffect(()=>{a&&E.current&&E.current.focus()},[a]);const d=new URLSearchParams(location.search).get("redirect")||"/my-albums.html",H=(t=>t.startsWith("/")||t.startsWith(window.location.origin)||/^https?:\/\/([\w-]+\.)*6180\.app(\/.*)?$/.test(t))(d)?d.startsWith("http")||d.startsWith("/")?d:`/${d}`:"/my-albums.html";function V(t){const i=t.target.value;/^\d*$/.test(i)&&i.length<=6&&A(i)}async function F(){var i;l("sending"),m("");const t=W(r);if(!t||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)){l("error"),m(g("Please enter a valid email address"));return}try{const p=new pe({ClientId:R,Username:t,Password:crypto.randomUUID(),UserAttributes:[{Name:"email",Value:t}]});try{await T.send(p)}catch(x){if(!((i=x.name)!=null&&i.includes("UsernameExistsException")))throw x}const y=new ue({ClientId:R,AuthFlow:"CUSTOM_AUTH",AuthParameters:{USERNAME:t}}),h=await T.send(y);if(h.Session)G(h.Session),C(!0),l("idle");else throw new Error("No session returned from InitiateAuth")}catch(p){console.error(p),l("error"),m(g("Unable to send verification code. Please try again later."))}}async function q(){var i,p,y,h,x,M;l("verifying"),m("");const t=W(r);try{const w=new me({ClientId:R,ChallengeName:"CUSTOM_CHALLENGE",ChallengeResponses:{USERNAME:t,ANSWER:S},Session:$}),j=(i=(await T.send(w)).AuthenticationResult)==null?void 0:i.IdToken;if(!j)throw new Error("No token received");localStorage.setItem("idToken",j);const K=`${JSON.parse(atob(j.split(".")[1]))["cognito:username"]}_____Public____Profile`,k=await(await fetch(re,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${j}`},body:JSON.stringify({query:`
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
          `,variables:{relationIds:[K]}})})).json(),N=(M=(x=(h=(y=(p=k==null?void 0:k.data)==null?void 0:p.batchGetItems)==null?void 0:y.items)==null?void 0:h[0])==null?void 0:x.item)==null?void 0:M.anyDisplayName;N&&localStorage.setItem(ie.PUBLIC_USERNAME,N),window.location.href=H}catch(w){console.error(w),l("error"),m(g("Invalid or expired verification code. Please try again or request a new code."))}}function J(){C(!1),A(""),l("idle")}return e.jsxs(e.Fragment,{children:[e.jsx(te,{}),e.jsx(ne,{isRTL:b,children:e.jsxs(Se,{children:[e.jsx(ve,{children:e.jsxs(ge,{children:[e.jsxs(xe,{children:[e.jsx(fe,{src:"images/logo_no_background.png",alt:"6180 Logo"}),e.jsx(he,{children:e.jsx(o,{k:"Sign in to 6180"})})]}),_&&e.jsx(oe,{type:"error",children:_}),a?e.jsxs(e.Fragment,{children:[e.jsxs(O,{style:{marginBottom:"16px",color:"#555"},children:[e.jsx(o,{k:"Check your email for a 6-digit verification code sent to"})," ",e.jsx("strong",{children:r})]}),e.jsx(ye,{ref:E,type:"tel",inputMode:"numeric",pattern:"[0-9]*",maxLength:6,value:S,onChange:V,placeholder:g("Enter 6-digit code")}),e.jsx(U,{primary:!0,onClick:q,disabled:f==="verifying"||S.length!==6||I,style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#28a745"},children:f==="verifying"?e.jsx(o,{k:"Verifying..."}):e.jsx(o,{k:"Verify Code"})}),e.jsxs(je,{children:[e.jsx("span",{children:e.jsx(o,{k:"Didn't receive a code?"})}),e.jsx(Ce,{onClick:J,children:e.jsx(o,{k:"Send new code"})})]})]}):e.jsxs(e.Fragment,{children:[e.jsx(z,{ref:D,type:"email",value:r,onChange:t=>u(t.target.value),placeholder:g("Enter your email"),disabled:I}),e.jsx(U,{primary:!0,onClick:F,disabled:f==="sending"||!r.trim()||I,style:{width:"100%",padding:"12px",fontSize:"16px"},children:f==="sending"?e.jsx(o,{k:"Sending..."}):e.jsx(o,{k:"Send Verification Code"})}),e.jsx(O,{children:e.jsx(ce,{k:"We'll send a secure verification code to your email",fallback:B||"We'll send a secure verification code to your email"})})]})]})}),e.jsxs(se,{children:[e.jsx(L,{href:"terms.html",isHovered:v==="terms",onMouseEnter:()=>c("terms"),onMouseLeave:()=>c(null),children:e.jsx(o,{k:"Terms of Service"})}),e.jsx(L,{href:"privacy.html",isHovered:v==="privacy",onMouseEnter:()=>c("privacy"),onMouseLeave:()=>c(null),children:e.jsx(o,{k:"Privacy Policy"})}),e.jsx(L,{href:"support.html",isHovered:v==="support",onMouseEnter:()=>c("support"),onMouseLeave:()=>c(null),children:e.jsx(o,{k:"Support"})})]})]})})]})},Ee=()=>{const r=localStorage.getItem("preferred-language")||localStorage.getItem("user_language")||"en";return e.jsx(X,{initialLanguage:r,preloadLanguages:["en"],children:e.jsx(le,{fallback:e.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"},children:"Loading..."}),children:e.jsx(Ie,{})})})};Y.createRoot(document.getElementById("root")).render(e.jsx(Ee,{}));
