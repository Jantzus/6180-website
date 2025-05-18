import{h as q,d as s,a as J,j as e,I as K,r as o,u as Q,G as Y,A as X,M as Z,B as N,e as ee,f as b,C as R,i as te,k as ne,l as oe}from"./styled-components-DXSpXGJF.js";import{C as se,S as re,I as ie,R as ae}from"./SignUpCommand-NsorJAPO.js";import"./parseJsonBody-D7clLPSW.js";const L=new se({region:q}),le=s(oe)`
  max-width: 400px;
  width: 100%;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.06);
  text-align: center;
`,ce=s.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
`,de=s.div`
  margin-bottom: 24px;
`,pe=s.img`
  height: 60px;
  margin-bottom: 16px;
`,O=s.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
  box-sizing: border-box;
`,me=s(O)`
  letter-spacing: 2px;
  text-align: center;
`,k=s.p`
  font-size: 13px;
  color: #666;
  margin-top: 16px;
  text-align: center;
`,ue=s.div`
  margin-top: 16px;
  font-size: 14px;
  color: #666;
  display: flex;
  justify-content: center;
  gap: 8px;
`,ge=s.button`
  background: none;
  border: none;
  color: #007bff;
  padding: 0;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
`,he=s.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  padding: 20px;
`,xe=s.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;function U(i){const m=i.trim().toLowerCase(),a="@gmail.com";return m.endsWith(a)?`${m.slice(0,-a.length).replace(/\./g,"")}${a}`:m}const fe=()=>{const[i,m]=o.useState(""),[a,C]=o.useState(!1),[S,A]=o.useState(""),[z,W]=o.useState(""),[x,l]=o.useState("idle"),[_,u]=o.useState(""),[v,c]=o.useState(null),{t,language:P}=Q(),$=o.useRef(null),I=o.useRef(null),j=["ar","he","fa","ur","ps","sd"].includes(P.split("-")[0]);o.useEffect(()=>{document.documentElement.dir=j?"rtl":"ltr"},[P,j]),o.useEffect(()=>{a&&I.current&&I.current.focus()},[a]);const d=new URLSearchParams(location.search).get("redirect")||"/my-albums.html",G=(n=>n.startsWith("/")||n.startsWith(window.location.origin)||/^https?:\/\/([\w-]+\.)*6180\.app(\/.*)?$/.test(n))(d)?d.startsWith("http")||d.startsWith("/")?d:`/${d}`:"/my-albums.html";function B(n){const r=n.target.value;/^\d*$/.test(r)&&r.length<=6&&A(r)}async function D(){var r;l("sending"),u("");const n=U(i);if(!n||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n)){l("error"),u(t("Please enter a valid email address"));return}try{const p=new re({ClientId:R,Username:n,Password:crypto.randomUUID(),UserAttributes:[{Name:"email",Value:n}]});try{await L.send(p)}catch(h){if(!((r=h.name)!=null&&r.includes("UsernameExistsException")))throw h}const f=new ie({ClientId:R,AuthFlow:"CUSTOM_AUTH",AuthParameters:{USERNAME:n}}),g=await L.send(f);if(g.Session)W(g.Session),C(!0),l("idle");else throw new Error("No session returned from InitiateAuth")}catch(p){console.error(p),l("error"),u(t("Unable to send verification code. Please try again later."))}}async function H(){var r,p,f,g,h,T;l("verifying"),u("");const n=U(i);try{const E=new ae({ClientId:R,ChallengeName:"CUSTOM_CHALLENGE",ChallengeResponses:{USERNAME:n,ANSWER:S},Session:z}),y=(r=(await L.send(E)).AuthenticationResult)==null?void 0:r.IdToken;if(!y)throw new Error("No token received");localStorage.setItem("idToken",y);const F=`${JSON.parse(atob(y.split(".")[1]))["cognito:username"]}_____Public____Profile`,w=await(await fetch(te,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${y}`},body:JSON.stringify({query:`
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
          `,variables:{relationIds:[F]}})})).json(),M=(T=(h=(g=(f=(p=w==null?void 0:w.data)==null?void 0:p.batchGetItems)==null?void 0:f.items)==null?void 0:g[0])==null?void 0:h.item)==null?void 0:T.anyDisplayName;M&&localStorage.setItem(ne.PUBLIC_USERNAME,M),window.location.href=G}catch(E){console.error(E),l("error"),u(t("Invalid or expired verification code. Please try again or request a new code."))}}function V(){C(!1),A(""),l("idle")}return e.jsxs(e.Fragment,{children:[e.jsx(Y,{}),e.jsx(X,{isRTL:j,children:e.jsxs(he,{children:[e.jsx(xe,{children:e.jsxs(le,{children:[e.jsxs(de,{children:[e.jsx(pe,{src:"images/logo_no_background.png",alt:"6180 Logo"}),e.jsx(ce,{children:t("Sign in to 6180")})]}),_&&e.jsx(Z,{type:"error",children:_}),a?e.jsxs(e.Fragment,{children:[e.jsxs(k,{style:{marginBottom:"16px",color:"#555"},children:[t("Check your email for a 6-digit verification code sent to")," ",e.jsx("strong",{children:i})]}),e.jsx(me,{ref:I,type:"tel",inputMode:"numeric",pattern:"[0-9]*",maxLength:6,value:S,onChange:B,placeholder:t("Enter 6-digit code")}),e.jsx(N,{primary:!0,onClick:H,disabled:x==="verifying"||S.length!==6,style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#28a745"},children:t(x==="verifying"?"Verifying...":"Verify Code")}),e.jsxs(ue,{children:[e.jsx("span",{children:t("Didn't receive a code?")}),e.jsx(ge,{onClick:V,children:t("Send new code")})]})]}):e.jsxs(e.Fragment,{children:[e.jsx(O,{ref:$,type:"email",value:i,onChange:n=>m(n.target.value),placeholder:t("Enter your email")}),e.jsx(N,{primary:!0,onClick:D,disabled:x==="sending"||!i.trim(),style:{width:"100%",padding:"12px",fontSize:"16px"},children:t(x==="sending"?"Sending...":"Send Verification Code")}),e.jsx(k,{children:t("We'll send a secure verification code to your email")})]})]})}),e.jsxs(ee,{children:[e.jsx(b,{href:"terms.html",isHovered:v==="terms",onMouseEnter:()=>c("terms"),onMouseLeave:()=>c(null),children:t("Terms of Service")}),e.jsx(b,{href:"privacy.html",isHovered:v==="privacy",onMouseEnter:()=>c("privacy"),onMouseLeave:()=>c(null),children:t("Privacy Policy")}),e.jsx(b,{href:"support.html",isHovered:v==="support",onMouseEnter:()=>c("support"),onMouseLeave:()=>c(null),children:t("Support")})]})]})})]})},ye=()=>e.jsx(K,{children:e.jsx(fe,{})});J.createRoot(document.getElementById("root")).render(e.jsx(ye,{}));
