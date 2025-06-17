import{A as Y,d as s,R as K,j as e,I as Q,a as o,u as X,b as C,g as Z,C as R,f as ee,L as te,r as ne}from"./utils-DWLWZiq9.js";import{G as oe,A as se,M as re,B as U,c as ie,d as A,C as ae}from"./styled-components-B0YI4FuM.js";import{C as le,S as ce,I as de,R as me}from"./SignUpCommand-DPm2yBNf.js";import"./parseJsonBody-DFMhQrBX.js";const P=new le({region:Y}),pe=s(ae)`
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
`,ge=s.div`
  margin-bottom: 24px;
`,he=s.img`
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
`,xe=s(O)`
  letter-spacing: 2px;
  text-align: center;
`,$=s.p`
  font-size: 13px;
  color: #666;
  margin-top: 16px;
  text-align: center;
`,fe=s.div`
  margin-top: 16px;
  font-size: 14px;
  color: #666;
  display: flex;
  justify-content: center;
  gap: 8px;
`,ye=s.button`
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
`;function k(i){const p=i.trim().toLowerCase(),a="@gmail.com";return p.endsWith(a)?`${p.slice(0,-a.length).replace(/\./g,"")}${a}`:p}const Ie=()=>{const[i,p]=o.useState(""),[a,S]=o.useState(!1),[I,_]=o.useState(""),[z,W]=o.useState(""),[x,l]=o.useState("idle"),[T,u]=o.useState(""),[v,c]=o.useState(null),{t,language:j,loading:D}=X(),G=o.useRef(null),E=o.useRef(null),b=Z(j)==="rtl";o.useEffect(()=>{document.documentElement.lang=j,document.documentElement.dir=b?"rtl":"ltr"},[j,b]),o.useEffect(()=>{a&&E.current&&E.current.focus()},[a]);const d=new URLSearchParams(location.search).get("redirect")||"my-albums.html",B=(n=>n.startsWith("/")||n.startsWith(window.location.origin)||/^https?:\/\/([\w-]+\.)*6180\.app(\/.*)?$/.test(n))(d)?d.startsWith("http")||d.startsWith("/")?d:`/${d}`:"my-albums.html";function H(n){const r=n.target.value;/^\d*$/.test(r)&&r.length<=6&&_(r)}async function V(){var r;l("sending"),u("");const n=k(i);if(!n||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n)){l("error"),u(t("Please enter a valid email address"));return}try{const m=new ce({ClientId:R,Username:n,Password:crypto.randomUUID(),UserAttributes:[{Name:"email",Value:n}]});try{await P.send(m)}catch(h){if(!((r=h.name)!=null&&r.includes("UsernameExistsException")))throw h}const f=new de({ClientId:R,AuthFlow:"CUSTOM_AUTH",AuthParameters:{USERNAME:n}}),g=await P.send(f);if(g.Session)W(g.Session),S(!0),l("idle");else throw new Error("No session returned from InitiateAuth")}catch(m){console.error(m),l("error"),u(t("Unable to send verification code. Please try again later."))}}async function F(){var r,m,f,g,h,M;l("verifying"),u("");const n=k(i);try{const L=new me({ClientId:R,ChallengeName:"CUSTOM_CHALLENGE",ChallengeResponses:{USERNAME:n,ANSWER:I},Session:z}),y=(r=(await P.send(L)).AuthenticationResult)==null?void 0:r.IdToken;if(!y)throw new Error("No token received");localStorage.setItem("idToken",y);const J=`${JSON.parse(atob(y.split(".")[1]))["cognito:username"]}_____Public____Profile`,w=await(await fetch(ee,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${y}`},body:JSON.stringify({query:`
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
          `,variables:{relationIds:[J]}})})).json(),N=(M=(h=(g=(f=(m=w==null?void 0:w.data)==null?void 0:m.batchGetItems)==null?void 0:f.items)==null?void 0:g[0])==null?void 0:h.item)==null?void 0:M.anyDisplayName;N&&localStorage.setItem(te.PUBLIC_USERNAME,N),ne(B)}catch(L){console.error(L),l("error"),u(t("Invalid or expired verification code. Please try again or request a new code."))}}function q(){S(!1),_(""),l("idle")}return D?e.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"},children:t("Loading...")}):e.jsxs(e.Fragment,{children:[e.jsx(oe,{}),e.jsx(se,{$isRTL:b,children:e.jsxs(Ce,{children:[e.jsx(Se,{children:e.jsxs(pe,{children:[e.jsxs(ge,{children:[e.jsx(he,{src:C("images/logo_no_background.png"),alt:"6180 Logo"}),e.jsx(ue,{children:t("Revisit Your Albums")})]}),T&&e.jsx(re,{$type:"error",children:T}),a?e.jsxs(e.Fragment,{children:[e.jsxs($,{style:{marginBottom:"16px",color:"#555"},children:[t("We sent a 6-digit code to")," ",e.jsx("strong",{children:i})]}),e.jsx(xe,{ref:E,type:"tel",inputMode:"numeric",pattern:"[0-9]*",maxLength:6,value:I,onChange:H,placeholder:t("Enter 6-digit code")}),e.jsx(U,{$primary:!0,onClick:F,disabled:x==="verifying"||I.length!==6,style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#28a745"},children:t(x==="verifying"?"Verifying...":"Verify Code")}),e.jsxs(fe,{children:[e.jsx("span",{children:t("Didn't receive a code?")}),e.jsx(ye,{onClick:q,children:t("Send new code")})]})]}):e.jsxs(e.Fragment,{children:[e.jsx(O,{ref:G,type:"email",value:i,onChange:n=>p(n.target.value),placeholder:t("Enter your email")}),e.jsx(U,{$primary:!0,onClick:V,disabled:x==="sending"||!i.trim(),style:{width:"100%",padding:"12px",fontSize:"16px"},children:t(x==="sending"?"Sending...":"Send Verification Code")}),e.jsx($,{children:t("We'll email you a one-time code to verify it's really you")})]})]})}),e.jsxs(ie,{children:[e.jsx(A,{href:C("terms.html"),$isHovered:v==="terms",onMouseEnter:()=>c("terms"),onMouseLeave:()=>c(null),children:t("Terms of Service")}),e.jsx(A,{href:C("privacy.html"),$isHovered:v==="privacy",onMouseEnter:()=>c("privacy"),onMouseLeave:()=>c(null),children:t("Privacy Policy")}),e.jsx(A,{href:C("support.html"),$isHovered:v==="support",onMouseEnter:()=>c("support"),onMouseLeave:()=>c(null),children:t("Support")})]})]})})]})},ve=localStorage.getItem("preferred-language")||localStorage.getItem("user_language")||"en";K.createRoot(document.getElementById("root")).render(e.jsx(Q,{initialLanguage:ve,preloadLanguages:["en"],children:e.jsx(Ie,{})}));
