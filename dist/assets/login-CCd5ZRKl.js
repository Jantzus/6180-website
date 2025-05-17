import{i as q,d as o,a as J,j as e,I as K,r,u as Q,G as Y,A as X,f as Z,h as w,C as L,k as ee,l as te,b as ne,B as oe}from"./styled-components-BDjSWUyR.js";import{C as se,S as re,I as ie,R as ae}from"./SignUpCommand-DnPF4gli.js";import"./parseJsonBody-BYBwnPsq.js";const R=new se({region:q}),ce=o.div`
  max-width: 400px;
  width: 100%;
  background: #ffffff;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.06);
  text-align: center;
`,de=o.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
`,le=o.div`
  margin-bottom: 24px;
`,pe=o(ne)`
  height: 60px;
  margin-bottom: 16px;
`,ue=o.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 16px;
  font-size: 14px;
`,O=o.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
  box-sizing: border-box;
`,me=o(O)`
  letter-spacing: 2px;
  text-align: center;
`,N=o.p`
  font-size: 13px;
  color: #666;
  margin-top: 16px;
  text-align: center;
`,ge=o.div`
  margin-top: 16px;
  font-size: 14px;
  color: #666;
  display: flex;
  justify-content: center;
  gap: 8px;
`,he=o.button`
  background: none;
  border: none;
  color: #007bff;
  padding: 0;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
`,M=o(oe)`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  opacity: ${s=>s.disabled?.7:1};
  cursor: ${s=>s.disabled?"not-allowed":"pointer"};
`,fe=o.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  padding: 20px;
`,xe=o.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;function U(s){const u=s.trim().toLowerCase(),a="@gmail.com";return u.endsWith(a)?`${u.slice(0,-a.length).replace(/\./g,"")}${a}`:u}const ye=()=>{const[s,u]=r.useState(""),[a,C]=r.useState(!1),[S,A]=r.useState(""),[z,$]=r.useState(""),[f,c]=r.useState("idle"),[_,m]=r.useState(""),[v,d]=r.useState(null),{t,language:P}=Q(),W=r.useRef(null),b=r.useRef(null),I=["ar","he","fa","ur","ps","sd"].includes(P.split("-")[0]);r.useEffect(()=>{document.documentElement.dir=I?"rtl":"ltr"},[P,I]),r.useEffect(()=>{a&&b.current&&b.current.focus()},[a]);const l=new URLSearchParams(location.search).get("redirect")||"/my-albums.html",B=(n=>n.startsWith("/")||n.startsWith(window.location.origin)||/^https?:\/\/([\w-]+\.)*6180\.app(\/.*)?$/.test(n))(l)?l.startsWith("http")||l.startsWith("/")?l:`/${l}`:"/my-albums.html";function G(n){const i=n.target.value;/^\d*$/.test(i)&&i.length<=6&&A(i)}async function D(){var i;c("sending"),m("");const n=U(s);if(!n||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n)){c("error"),m(t("Please enter a valid email address"));return}try{const p=new re({ClientId:L,Username:n,Password:crypto.randomUUID(),UserAttributes:[{Name:"email",Value:n}]});try{await R.send(p)}catch(h){if(!((i=h.name)!=null&&i.includes("UsernameExistsException")))throw h}const x=new ie({ClientId:L,AuthFlow:"CUSTOM_AUTH",AuthParameters:{USERNAME:n}}),g=await R.send(x);if(g.Session)$(g.Session),C(!0),c("idle");else throw new Error("No session returned from InitiateAuth")}catch(p){console.error(p),c("error"),m(t("Unable to send verification code. Please try again later."))}}async function H(){var i,p,x,g,h,T;c("verifying"),m("");const n=U(s);try{const E=new ae({ClientId:L,ChallengeName:"CUSTOM_CHALLENGE",ChallengeResponses:{USERNAME:n,ANSWER:S},Session:z}),y=(i=(await R.send(E)).AuthenticationResult)==null?void 0:i.IdToken;if(!y)throw new Error("No token received");localStorage.setItem("idToken",y);const F=`${JSON.parse(atob(y.split(".")[1]))["cognito:username"]}_____Public____Profile`,j=await(await fetch(ee,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${y}`},body:JSON.stringify({query:`
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
          `,variables:{relationIds:[F]}})})).json(),k=(T=(h=(g=(x=(p=j==null?void 0:j.data)==null?void 0:p.batchGetItems)==null?void 0:x.items)==null?void 0:g[0])==null?void 0:h.item)==null?void 0:T.anyDisplayName;k&&localStorage.setItem(te.PUBLIC_USERNAME,k),window.location.href=B}catch(E){console.error(E),c("error"),m(t("Invalid or expired verification code. Please try again or request a new code."))}}function V(){C(!1),A(""),c("idle")}return e.jsxs(e.Fragment,{children:[e.jsx(Y,{}),e.jsx(X,{isRTL:I,children:e.jsxs(fe,{children:[e.jsx(xe,{children:e.jsxs(ce,{children:[e.jsxs(le,{children:[e.jsx(pe,{src:"images/logo_no_background.png",alt:"6180 Logo"}),e.jsx(de,{children:t("Sign in to 6180")})]}),_&&e.jsx(ue,{children:_}),a?e.jsxs(e.Fragment,{children:[e.jsxs(N,{style:{marginBottom:"16px",color:"#555"},children:[t("Check your email for a 6-digit verification code sent to")," ",e.jsx("strong",{children:s})]}),e.jsx(me,{ref:b,type:"tel",inputMode:"numeric",pattern:"[0-9]*",maxLength:6,value:S,onChange:G,placeholder:t("Enter 6-digit code")}),e.jsx(M,{primary:!0,onClick:H,disabled:f==="verifying"||S.length!==6,style:{backgroundColor:"#28a745"},children:t(f==="verifying"?"Verifying...":"Verify Code")}),e.jsxs(ge,{children:[e.jsx("span",{children:t("Didn't receive a code?")}),e.jsx(he,{onClick:V,children:t("Send new code")})]})]}):e.jsxs(e.Fragment,{children:[e.jsx(O,{ref:W,type:"email",value:s,onChange:n=>u(n.target.value),placeholder:t("Enter your email")}),e.jsx(M,{primary:!0,onClick:D,disabled:f==="sending"||!s.trim(),children:t(f==="sending"?"Sending...":"Send Verification Code")}),e.jsx(N,{children:t("We'll send a secure verification code to your email")})]})]})}),e.jsxs(Z,{children:[e.jsx(w,{href:"terms.html",isHovered:v==="terms",onMouseEnter:()=>d("terms"),onMouseLeave:()=>d(null),children:t("Terms of Service")}),e.jsx(w,{href:"privacy.html",isHovered:v==="privacy",onMouseEnter:()=>d("privacy"),onMouseLeave:()=>d(null),children:t("Privacy Policy")}),e.jsx(w,{href:"support.html",isHovered:v==="support",onMouseEnter:()=>d("support"),onMouseLeave:()=>d(null),children:t("Support")})]})]})})]})},Ce=()=>e.jsx(K,{children:e.jsx(ye,{})});J.createRoot(document.getElementById("root")).render(e.jsx(Ce,{}));
