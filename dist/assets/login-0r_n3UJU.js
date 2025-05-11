import{i as q,d as o,a as J,j as e,I as Q,r,u as K,G as X,A as Y,f as Z,h as E,C as L,k as ee,b as te,B as ne}from"./styled-components-Dg1z4lLb.js";import{C as oe,S as se,I as re,R as ie}from"./SignUpCommand-DCj54Aon.js";import"./parseJsonBody-DU6D2g5Q.js";const R=new oe({region:q}),ae=o.div`
  max-width: 400px;
  width: 100%;
  background: #ffffff;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.06);
  text-align: center;
`,ce=o.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
`,de=o.div`
  margin-bottom: 24px;
`,le=o(te)`
  height: 60px;
  margin-bottom: 16px;
`,pe=o.div`
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
`,ue=o(O)`
  letter-spacing: 2px;
  text-align: center;
`,N=o.p`
  font-size: 13px;
  color: #666;
  margin-top: 16px;
  text-align: center;
`,me=o.div`
  margin-top: 16px;
  font-size: 14px;
  color: #666;
  display: flex;
  justify-content: center;
  gap: 8px;
`,ge=o.button`
  background: none;
  border: none;
  color: #007bff;
  padding: 0;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
`,M=o(ne)`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  opacity: ${s=>s.disabled?.7:1};
  cursor: ${s=>s.disabled?"not-allowed":"pointer"};
`,he=o.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  padding: 20px;
`,fe=o.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;function U(s){const u=s.trim().toLowerCase(),a="@gmail.com";return u.endsWith(a)?`${u.slice(0,-a.length).replace(/\./g,"")}${a}`:u}const xe=()=>{const[s,u]=r.useState(""),[a,C]=r.useState(!1),[b,P]=r.useState(""),[z,$]=r.useState(""),[f,c]=r.useState("idle"),[k,m]=r.useState(""),[v,d]=r.useState(null),{t,language:A}=K(),W=r.useRef(null),S=r.useRef(null),I=["ar","he","fa","ur","ps","sd"].includes(A.split("-")[0]);r.useEffect(()=>{document.documentElement.dir=I?"rtl":"ltr"},[A,I]),r.useEffect(()=>{a&&S.current&&S.current.focus()},[a]);const l=new URLSearchParams(location.search).get("redirect")||"/my-albums.html",B=(n=>n.startsWith("/")||n.startsWith(window.location.origin)||/^https?:\/\/([\w-]+\.)*6180\.app(\/.*)?$/.test(n))(l)?l.startsWith("http")||l.startsWith("/")?l:`/${l}`:"/my-albums.html";function D(n){const i=n.target.value;/^\d*$/.test(i)&&i.length<=6&&P(i)}async function G(){var i;c("sending"),m("");const n=U(s);if(!n||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n)){c("error"),m(t("Please enter a valid email address"));return}try{const p=new se({ClientId:L,Username:n,Password:crypto.randomUUID(),UserAttributes:[{Name:"email",Value:n}]});try{await R.send(p)}catch(h){if(!((i=h.name)!=null&&i.includes("UsernameExistsException")))throw h}const x=new re({ClientId:L,AuthFlow:"CUSTOM_AUTH",AuthParameters:{USERNAME:n}}),g=await R.send(x);if(g.Session)$(g.Session),C(!0),c("idle");else throw new Error("No session returned from InitiateAuth")}catch(p){console.error(p),c("error"),m(t("Unable to send verification code. Please try again later."))}}async function H(){var i,p,x,g,h,T;c("verifying"),m("");const n=U(s);try{const j=new ie({ClientId:L,ChallengeName:"CUSTOM_CHALLENGE",ChallengeResponses:{USERNAME:n,ANSWER:b},Session:z}),y=(i=(await R.send(j)).AuthenticationResult)==null?void 0:i.IdToken;if(!y)throw new Error("No token received");localStorage.setItem("idToken",y);const F=`${JSON.parse(atob(y.split(".")[1]))["cognito:username"]}_____Public____Profile`,w=await(await fetch(ee,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${y}`},body:JSON.stringify({query:`
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
          `,variables:{relationIds:[F]}})})).json(),_=(T=(h=(g=(x=(p=w==null?void 0:w.data)==null?void 0:p.batchGetItems)==null?void 0:x.items)==null?void 0:g[0])==null?void 0:h.item)==null?void 0:T.anyDisplayName;_&&localStorage.setItem("publicUsername",_),window.location.href=B}catch(j){console.error(j),c("error"),m(t("Invalid or expired verification code. Please try again or request a new code."))}}function V(){C(!1),P(""),c("idle")}return e.jsxs(e.Fragment,{children:[e.jsx(X,{}),e.jsx(Y,{isRTL:I,children:e.jsxs(he,{children:[e.jsx(fe,{children:e.jsxs(ae,{children:[e.jsxs(de,{children:[e.jsx(le,{src:"images/logo_no_background.png",alt:"6180 Logo"}),e.jsx(ce,{children:t("Sign in to 6180")})]}),k&&e.jsx(pe,{children:k}),a?e.jsxs(e.Fragment,{children:[e.jsxs(N,{style:{marginBottom:"16px",color:"#555"},children:[t("Check your email for a 6-digit verification code sent to")," ",e.jsx("strong",{children:s})]}),e.jsx(ue,{ref:S,type:"tel",inputMode:"numeric",pattern:"[0-9]*",maxLength:6,value:b,onChange:D,placeholder:t("Enter 6-digit code")}),e.jsx(M,{primary:!0,onClick:H,disabled:f==="verifying"||b.length!==6,style:{backgroundColor:"#28a745"},children:t(f==="verifying"?"Verifying...":"Verify Code")}),e.jsxs(me,{children:[e.jsx("span",{children:t("Didn't receive a code?")}),e.jsx(ge,{onClick:V,children:t("Send new code")})]})]}):e.jsxs(e.Fragment,{children:[e.jsx(O,{ref:W,type:"email",value:s,onChange:n=>u(n.target.value),placeholder:t("Enter your email")}),e.jsx(M,{primary:!0,onClick:G,disabled:f==="sending"||!s.trim(),children:t(f==="sending"?"Sending...":"Send Verification Code")}),e.jsx(N,{children:t("We'll send a secure verification code to your email")})]})]})}),e.jsxs(Z,{children:[e.jsx(E,{href:"terms.html",isHovered:v==="terms",onMouseEnter:()=>d("terms"),onMouseLeave:()=>d(null),children:t("Terms of Service")}),e.jsx(E,{href:"privacy.html",isHovered:v==="privacy",onMouseEnter:()=>d("privacy"),onMouseLeave:()=>d(null),children:t("Privacy Policy")}),e.jsx(E,{href:"support.html",isHovered:v==="support",onMouseEnter:()=>d("support"),onMouseLeave:()=>d(null),children:t("Support")})]})]})})]})},ye=()=>e.jsx(Q,{children:e.jsx(xe,{})});J.createRoot(document.getElementById("root")).render(e.jsx(ye,{}));
