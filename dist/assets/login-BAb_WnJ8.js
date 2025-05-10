import{A as G,d as s,R as q,j as e,I as H,r,u as J,C as j,a as Q}from"./index-BpJK0BhY.js";import{A as K,a as X}from"./styled-components-DlUsOz2L.js";import{C as Y,F as Z,b as E,a as ee}from"./index-styled-components-fD46IMng.js";import{C as te,S as ne,I as oe,R as se}from"./SignUpCommand-tmhgra8m.js";import"./parseJsonBody-Ci8sH3aq.js";const R=new te({region:G}),re=s.div`
  max-width: 400px;
  width: 100%;
  background: #ffffff;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.06);
  text-align: center;
`,ie=s.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
`,ae=s.div`
  margin-bottom: 24px;
`,ce=s(X)`
  height: 60px;
  margin-bottom: 16px;
`,de=s.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 16px;
  font-size: 14px;
`,U=s.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
  box-sizing: border-box;
`,le=s(U)`
  letter-spacing: 2px;
  text-align: center;
`,L=s.p`
  font-size: 13px;
  color: #666;
  margin-top: 16px;
  text-align: center;
`,me=s.div`
  margin-top: 16px;
  font-size: 14px;
  color: #666;
  display: flex;
  justify-content: center;
  gap: 8px;
`,pe=s.button`
  background: none;
  border: none;
  color: #007bff;
  padding: 0;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
`,N=s(ee)`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  opacity: ${o=>o.disabled?.7:1};
  cursor: ${o=>o.disabled?"not-allowed":"pointer"};
`;function k(o){const m=o.trim().toLowerCase(),a="@gmail.com";return m.endsWith(a)?`${m.slice(0,-a.length).replace(/\./g,"")}${a}`:m}const ue=()=>{const[o,m]=r.useState(""),[a,y]=r.useState(!1),[C,v]=r.useState(""),[O,z]=r.useState(""),[h,c]=r.useState("idle"),[A,p]=r.useState(""),{t:n,language:P}=J(),$=r.useRef(null),b=r.useRef(null),I=["ar","he","fa","ur","ps","sd"].includes(P.split("-")[0]);r.useEffect(()=>{document.documentElement.dir=I?"rtl":"ltr"},[P,I]),r.useEffect(()=>{a&&b.current&&b.current.focus()},[a]);const d=new URLSearchParams(location.search).get("redirect")||"/my-albums.html",M=(t=>t.startsWith("/")||t.startsWith(window.location.origin)||/^https?:\/\/([\w-]+\.)*6180\.app(\/.*)?$/.test(t))(d)?d.startsWith("http")||d.startsWith("/")?d:`/${d}`:"/my-albums.html";function W(t){const i=t.target.value;/^\d*$/.test(i)&&i.length<=6&&v(i)}async function D(){var i;c("sending"),p("");const t=k(o);if(!t||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)){c("error"),p(n("Please enter a valid email address"));return}try{const l=new ne({ClientId:j,Username:t,Password:crypto.randomUUID(),UserAttributes:[{Name:"email",Value:t}]});try{await R.send(l)}catch(g){if(!((i=g.name)!=null&&i.includes("UsernameExistsException")))throw g}const f=new oe({ClientId:j,AuthFlow:"CUSTOM_AUTH",AuthParameters:{USERNAME:t}}),u=await R.send(f);if(u.Session)z(u.Session),y(!0),c("idle");else throw new Error("No session returned from InitiateAuth")}catch(l){console.error(l),c("error"),p(n("Unable to send verification code. Please try again later."))}}async function V(){var i,l,f,u,g,T;c("verifying"),p("");const t=k(o);try{const S=new se({ClientId:j,ChallengeName:"CUSTOM_CHALLENGE",ChallengeResponses:{USERNAME:t,ANSWER:C},Session:O}),x=(i=(await R.send(S)).AuthenticationResult)==null?void 0:i.IdToken;if(!x)throw new Error("No token received");localStorage.setItem("idToken",x);const F=`${JSON.parse(atob(x.split(".")[1]))["cognito:username"]}_____Public____Profile`,w=await(await fetch(Q,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${x}`},body:JSON.stringify({query:`
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
          `,variables:{relationIds:[F]}})})).json(),_=(T=(g=(u=(f=(l=w==null?void 0:w.data)==null?void 0:l.batchGetItems)==null?void 0:f.items)==null?void 0:u[0])==null?void 0:g.item)==null?void 0:T.anyDisplayName;_&&localStorage.setItem("publicUsername",_),window.location.href=M}catch(S){console.error(S),c("error"),p(n("Invalid or expired verification code. Please try again or request a new code."))}}function B(){y(!1),v(""),c("idle")}return e.jsxs(K,{isRTL:I,children:[e.jsx(Y,{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsxs(re,{children:[e.jsxs(ae,{children:[e.jsx(ce,{src:"images/logo_no_background.png",alt:"6180 Logo"}),e.jsx(ie,{children:n("Sign in to 6180")})]}),A&&e.jsx(de,{children:A}),a?e.jsxs(e.Fragment,{children:[e.jsxs(L,{style:{marginBottom:"16px",color:"#555"},children:[n("Check your email for a 6-digit verification code sent to")," ",e.jsx("strong",{children:o})]}),e.jsx(le,{ref:b,type:"tel",inputMode:"numeric",pattern:"[0-9]*",maxLength:6,value:C,onChange:W,placeholder:n("Enter 6-digit code")}),e.jsx(N,{primary:!0,onClick:V,disabled:h==="verifying"||C.length!==6,style:{backgroundColor:"#28a745"},children:n(h==="verifying"?"Verifying...":"Verify Code")}),e.jsxs(me,{children:[e.jsx("span",{children:n("Didn't receive a code?")}),e.jsx(pe,{onClick:B,children:n("Send new code")})]})]}):e.jsxs(e.Fragment,{children:[e.jsx(U,{ref:$,type:"email",value:o,onChange:t=>m(t.target.value),placeholder:n("Enter your email")}),e.jsx(N,{primary:!0,onClick:D,disabled:h==="sending"||!o.trim(),children:n(h==="sending"?"Sending...":"Send Verification Code")}),e.jsx(L,{children:n("We'll send a secure verification code to your email")})]})]})}),e.jsxs(Z,{children:[e.jsx(E,{href:"terms.html",children:"Terms of Service"}),e.jsx(E,{href:"privacy.html",children:"Privacy Policy"}),e.jsx(E,{href:"support.html",children:"Support"})]})]})},ge=()=>e.jsx(H,{children:e.jsx(ue,{})});q.createRoot(document.getElementById("root")).render(e.jsx(ge,{}));
