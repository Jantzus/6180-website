import{A as K,d as s,R as Q,j as e,r as o,I as Y,u as X,b as y,g as Z,C as b,f as ee,L as te,a as ne}from"./utils-2qV3otm0.js";import{G as oe,A as se,M as re,B as N,c as ie,d as R,C as ae}from"./styled-components-UVQg2Kys.js";import{C as le,S as de,I as ce,R as ue}from"./SignUpCommand-JfQ0fOlx.js";import"./parseJsonBody-ql7eeBcg.js";const P=new le({region:K}),me=s(ae)`
  max-width: 400px;
  width: 100%;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.06);
  text-align: center;
`,ge=s.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
`,pe=s.div`
  margin-bottom: 24px;
`,he=s.img`
  height: 60px;
  margin-bottom: 16px;
`,k=s.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
  box-sizing: border-box;
`,fe=s(k)`
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
`;function $(i){const c=i.trim().toLowerCase(),a="@gmail.com";return c.endsWith(a)?`${c.slice(0,-a.length).replace(/\./g,"")}${a}`:c}const Ie=()=>{const[i,c]=o.useState(""),[a,C]=o.useState(!1),[S,A]=o.useState(""),[O,W]=o.useState(""),[f,u]=o.useState("idle"),[_,g]=o.useState(""),[I,m]=o.useState(null),[z,D]=o.useState("my-albums.html"),{t:n,language:v,loading:G}=X(),B=o.useRef(null),E=o.useRef(null),j=Z(v)==="rtl";o.useEffect(()=>{document.documentElement.lang=v,document.documentElement.dir=j?"rtl":"ltr"},[v,j]),o.useEffect(()=>{if(typeof window<"u"){const t=new URLSearchParams(window.location.search).get("redirect")||"my-albums.html",l=(d=>d.startsWith("/")||d.startsWith(window.location.origin)||/^https?:\/\/([\w-]+\.)*6180\.app(\/.*)?$/.test(d))(t)?t.startsWith("http")||t.startsWith("/")?t:`/${t}`:"my-albums.html";D(l)}},[]),o.useEffect(()=>{a&&E.current&&E.current.focus()},[a]);function H(t){const r=t.target.value;/^\d*$/.test(r)&&r.length<=6&&A(r)}async function F(){var r;u("sending"),g("");const t=$(i);if(!t||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)){u("error"),g(n("Please enter a valid email address"));return}try{const l=new de({ClientId:b,Username:t,Password:crypto.randomUUID(),UserAttributes:[{Name:"email",Value:t}]});try{await P.send(l)}catch(h){if(!((r=h.name)!=null&&r.includes("UsernameExistsException")))throw h}const d=new ce({ClientId:b,AuthFlow:"CUSTOM_AUTH",AuthParameters:{USERNAME:t}}),p=await P.send(d);if(p.Session)W(p.Session),C(!0),u("idle");else throw new Error("No session returned from InitiateAuth")}catch(l){console.error(l),u("error"),g(n("Unable to send verification code. Please try again later."))}}async function V(){var r,l,d,p,h,T;u("verifying"),g("");const t=$(i);try{const w=new ue({ClientId:b,ChallengeName:"CUSTOM_CHALLENGE",ChallengeResponses:{USERNAME:t,ANSWER:S},Session:O}),x=(r=(await P.send(w)).AuthenticationResult)==null?void 0:r.IdToken;if(!x)throw new Error("No token received");localStorage.setItem("idToken",x);const J=`${JSON.parse(atob(x.split(".")[1]))["cognito:username"]}_____Public____Profile`,L=await(await fetch(ee,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${x}`},body:JSON.stringify({query:`
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
          `,variables:{relationIds:[J]}})})).json(),M=(T=(h=(p=(d=(l=L==null?void 0:L.data)==null?void 0:l.batchGetItems)==null?void 0:d.items)==null?void 0:p[0])==null?void 0:h.item)==null?void 0:T.anyDisplayName;M&&localStorage.setItem(te.PUBLIC_USERNAME,M),ne(z)}catch(w){console.error(w),u("error"),g(n("Invalid or expired verification code. Please try again or request a new code."))}}function q(){C(!1),A(""),u("idle")}return G?e.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",fontFamily:"system-ui, -apple-system, sans-serif"},children:"Loading..."}):e.jsxs(e.Fragment,{children:[e.jsx(oe,{}),e.jsx(se,{$isRTL:j,children:e.jsxs(Ce,{children:[e.jsx(Se,{children:e.jsxs(me,{children:[e.jsxs(pe,{children:[e.jsx(he,{src:y("images/logo_no_background.png"),alt:"6180 Logo"}),e.jsx(ge,{children:n("Login to 6180")})]}),_&&e.jsx(re,{$type:"error",children:_}),a?e.jsxs(e.Fragment,{children:[e.jsxs(U,{style:{marginBottom:"16px",color:"#555"},children:[n("We sent a 6-digit code to")," ",e.jsx("strong",{children:i})]}),e.jsx(fe,{ref:E,type:"tel",inputMode:"numeric",pattern:"[0-9]*",maxLength:6,value:S,onChange:H,placeholder:n("Enter 6-digit code")}),e.jsx(N,{$primary:!0,onClick:V,disabled:f==="verifying"||S.length!==6,style:{width:"100%",backgroundColor:"#28a745"},children:n(f==="verifying"?"Verifying...":"Verify Code")}),e.jsxs(xe,{children:[e.jsx("span",{children:n("Didn't receive a code?")}),e.jsx(ye,{onClick:q,children:n("Send new code")})]})]}):e.jsxs(e.Fragment,{children:[e.jsx(k,{ref:B,type:"email",value:i,onChange:t=>c(t.target.value),placeholder:n("Enter your email")}),e.jsx(N,{$primary:!0,onClick:F,disabled:f==="sending"||!i.trim(),style:{width:"100%"},children:n(f==="sending"?"Sending...":"Send Verification Code")}),e.jsx(U,{children:n("We'll email you a one-time code to verify it's really you")})]})]})}),e.jsxs(ie,{children:[e.jsx(R,{href:y("terms.html"),$isHovered:I==="terms",onMouseEnter:()=>m("terms"),onMouseLeave:()=>m(null),children:n("Terms of Service")}),e.jsx(R,{href:y("privacy.html"),$isHovered:I==="privacy",onMouseEnter:()=>m("privacy"),onMouseLeave:()=>m(null),children:n("Privacy Policy")}),e.jsx(R,{href:y("support.html"),$isHovered:I==="support",onMouseEnter:()=>m("support"),onMouseLeave:()=>m(null),children:n("Support")})]})]})})]})},ve=()=>{const[i,c]=o.useState("en");return o.useEffect(()=>{const a=localStorage.getItem("preferred-language")||localStorage.getItem("user_language")||"en";c(a)},[]),e.jsx(Y,{initialLanguage:i,preloadLanguages:["en"],children:e.jsx(Ie,{})})};typeof window<"u"&&Q.createRoot(document.getElementById("root")).render(e.jsx(ve,{}));
