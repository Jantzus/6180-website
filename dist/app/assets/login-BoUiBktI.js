import{i as J,d as A,R as K,j as e,r as s,I as Q,u as Y,G as X,A as Z,b as y,M as ee,B as N,e as te,f as R,g as ne,C as P,k as se,l as oe,a as re}from"./layout-CDsPc4Yx.js";import{C as ae,L as ie,a as le,b as de,I as U,O as ce,R as ue,c as me}from"./loginStyles-BTnpdQbK.js";import{C as ge,S as pe,I as he,R as fe}from"./SignUpCommand-BWeAMmVY.js";import"./forms-BkfdZfzd.js";import"./parseJsonBody-Cpz94Mjs.js";const b=new ge({region:J}),ye=A.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
  box-sizing: border-box;
`,xe=A.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
`,Ce=A.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;function $(r){const d=r.trim().toLowerCase(),a="@gmail.com";return d.endsWith(a)?`${d.slice(0,-a.length).replace(/\./g,"")}${a}`:d}const Se=()=>{const[r,d]=s.useState(""),[a,x]=s.useState(!1),[C,_]=s.useState(""),[O,k]=s.useState(""),[h,c]=s.useState("idle"),[T,m]=s.useState(""),[S,u]=s.useState(null),[W,D]=s.useState("my-albums.html"),{t:n,language:I,loading:G}=Y(),B=s.useRef(null),E=s.useRef(null),L=ne(I)==="rtl";s.useEffect(()=>{document.documentElement.lang=I,document.documentElement.dir=L?"rtl":"ltr"},[I,L]),s.useEffect(()=>{if(typeof window<"u"){const t=new URLSearchParams(window.location.search).get("redirect")||"my-albums.html",i=(l=>l.startsWith("/")||l.startsWith(window.location.origin)||/^https?:\/\/([\w-]+\.)*6180\.app(\/.*)?$/.test(l))(t)?t.startsWith("http")||t.startsWith("/")?t:`/${t}`:"my-albums.html";D(i)}},[]),s.useEffect(()=>{a&&E.current&&E.current.focus()},[a]);function H(t){const o=t.target.value;/^\d*$/.test(o)&&o.length<=6&&_(o)}async function z(){var o;c("sending"),m("");const t=$(r);if(!t||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)){c("error"),m(n("Please enter a valid email address"));return}try{const i=new pe({ClientId:P,Username:t,Password:crypto.randomUUID(),UserAttributes:[{Name:"email",Value:t}]});try{await b.send(i)}catch(p){if(!((o=p.name)!=null&&o.includes("UsernameExistsException")))throw p}const l=new he({ClientId:P,AuthFlow:"CUSTOM_AUTH",AuthParameters:{USERNAME:t}}),g=await b.send(l);if(g.Session)k(g.Session),x(!0),c("idle");else throw new Error("No session returned from InitiateAuth")}catch(i){console.error(i),c("error"),m(n("Unable to send verification code. Please try again later."))}}async function F(){var o,i,l,g,p,j;c("verifying"),m("");const t=$(r);try{const v=new fe({ClientId:P,ChallengeName:"CUSTOM_CHALLENGE",ChallengeResponses:{USERNAME:t,ANSWER:C},Session:O}),f=(o=(await b.send(v)).AuthenticationResult)==null?void 0:o.IdToken;if(!f)throw new Error("No token received");localStorage.setItem("idToken",f);const q=`${JSON.parse(atob(f.split(".")[1]))["cognito:username"]}_____Public____Profile`,w=await(await fetch(se,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${f}`},body:JSON.stringify({query:`
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
          `,variables:{relationIds:[q]}})})).json(),M=(j=(p=(g=(l=(i=w==null?void 0:w.data)==null?void 0:i.batchGetItems)==null?void 0:l.items)==null?void 0:g[0])==null?void 0:p.item)==null?void 0:j.anyDisplayName;M&&localStorage.setItem(oe.PUBLIC_USERNAME,M),re(W)}catch(v){console.error(v),c("error"),m(n("Invalid or expired verification code. Please try again or request a new code."))}}function V(){x(!1),_(""),c("idle")}return G?e.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",fontFamily:"system-ui, -apple-system, sans-serif"},children:"Loading..."}):e.jsxs(e.Fragment,{children:[e.jsx(X,{}),e.jsx(Z,{$isRTL:L,children:e.jsxs(ae,{children:[e.jsx(Ce,{children:e.jsxs(ie,{children:[e.jsxs(le,{children:[e.jsx(de,{src:y("images/logo_no_background.png"),alt:"6180 Logo"}),e.jsx(xe,{children:n("Login to 6180")})]}),T&&e.jsx(ee,{$type:"error",children:T}),a?e.jsxs(e.Fragment,{children:[e.jsxs(U,{style:{marginBottom:"16px",color:"#555"},children:[n("We sent a 6-digit code to")," ",e.jsx("strong",{children:r})]}),e.jsx(ce,{ref:E,type:"tel",inputMode:"numeric",pattern:"[0-9]*",maxLength:6,value:C,onChange:H,placeholder:n("Enter 6-digit code")}),e.jsx(N,{$primary:!0,onClick:F,disabled:h==="verifying"||C.length!==6,style:{width:"100%",backgroundColor:"#28a745"},children:n(h==="verifying"?"Verifying...":"Verify Code")}),e.jsxs(ue,{children:[e.jsx("span",{children:n("Didn't receive a code?")}),e.jsx(me,{onClick:V,children:n("Send new code")})]})]}):e.jsxs(e.Fragment,{children:[e.jsx(ye,{ref:B,type:"email",value:r,onChange:t=>d(t.target.value),placeholder:n("Enter your email")}),e.jsx(N,{$primary:!0,onClick:z,disabled:h==="sending"||!r.trim(),style:{width:"100%"},children:n(h==="sending"?"Sending...":"Send Verification Code")}),e.jsx(U,{children:n("We'll email you a one-time code to verify it's really you")})]})]})}),e.jsxs(te,{children:[e.jsx(R,{href:y("terms.html"),$isHovered:S==="terms",onMouseEnter:()=>u("terms"),onMouseLeave:()=>u(null),children:n("Terms of Service")}),e.jsx(R,{href:y("privacy.html"),$isHovered:S==="privacy",onMouseEnter:()=>u("privacy"),onMouseLeave:()=>u(null),children:n("Privacy Policy")}),e.jsx(R,{href:y("support.html"),$isHovered:S==="support",onMouseEnter:()=>u("support"),onMouseLeave:()=>u(null),children:n("Support")})]})]})})]})},Ie=()=>{const[r,d]=s.useState("en");return s.useEffect(()=>{const a=localStorage.getItem("preferred-language")||localStorage.getItem("user_language")||"en";d(a)},[]),e.jsx(Q,{initialLanguage:r,preloadLanguages:["en"],children:e.jsx(Se,{})})};typeof window<"u"&&K.createRoot(document.getElementById("root")).render(e.jsx(Ie,{}));
