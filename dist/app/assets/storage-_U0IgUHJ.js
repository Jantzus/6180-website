import{A as V,d as s,R as J,j as e,I as K,r as o,u as Q,b as x,g as Y,C as w,f as X,L as Z,a as ee}from"./utils-D99WuR6c.js";import{G as te,A as ne,M as oe,B as T,c as se,d as R,C as re}from"./styled-components-zBaijokq.js";import{C as ie,S as ae,I as le,R as ce}from"./SignUpCommand-wsTj0ZxF.js";import"./parseJsonBody-y53hXqCe.js";const A=new ie({region:V}),de=s(re)`
  max-width: 450px;
  width: 100%;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.06);
  text-align: center;
`,pe=s.div`
  margin-bottom: 24px;
`,me=s.img`
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
`,ue=s(O)`
  letter-spacing: 2px;
  text-align: center;
`,U=s.p`
  font-size: 13px;
  color: #666;
  margin-top: 16px;
  text-align: center;
`,ge=s.div`
  margin-top: 16px;
  font-size: 14px;
  color: #666;
  display: flex;
  justify-content: center;
  gap: 8px;
`,xe=s.button`
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
`,fe=s.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;function k(i){const p=i.trim().toLowerCase(),a="@gmail.com";return p.endsWith(a)?`${p.slice(0,-a.length).replace(/\./g,"")}${a}`:p}const ye=()=>{const[i,p]=o.useState(""),[a,C]=o.useState(!1),[S,P]=o.useState(""),[z,B]=o.useState(""),[h,l]=o.useState("idle"),[_,m]=o.useState(""),[v,c]=o.useState(null),{t,language:I}=Q(),D=o.useRef(null),E=o.useRef(null),j=Y(I)==="rtl";o.useEffect(()=>{document.documentElement.lang=I,document.documentElement.dir=j?"rtl":"ltr"},[I,j]),o.useEffect(()=>{a&&E.current&&E.current.focus()},[a]);const G="storage/manage.html";function H(n){const r=n.target.value;/^\d*$/.test(r)&&r.length<=6&&P(r)}async function $(){var r;l("sending"),m("");const n=k(i);if(!n||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n)){l("error"),m(t("Please enter a valid email address"));return}try{const d=new ae({ClientId:w,Username:n,Password:crypto.randomUUID(),UserAttributes:[{Name:"email",Value:n}]});try{await A.send(d)}catch(g){if(!((r=g.name)!=null&&r.includes("UsernameExistsException")))throw g}const f=new le({ClientId:w,AuthFlow:"CUSTOM_AUTH",AuthParameters:{USERNAME:n}}),u=await A.send(f);if(u.Session)B(u.Session),C(!0),l("idle");else throw new Error("No session returned from InitiateAuth")}catch(d){console.error(d),l("error"),m(t("Unable to send verification code. Please try again later."))}}async function W(){var r,d,f,u,g,M;l("verifying"),m("");const n=k(i);try{const b=new ce({ClientId:w,ChallengeName:"CUSTOM_CHALLENGE",ChallengeResponses:{USERNAME:n,ANSWER:S},Session:z}),y=(r=(await A.send(b)).AuthenticationResult)==null?void 0:r.IdToken;if(!y)throw new Error("No token received");localStorage.setItem("idToken",y);const q=`${JSON.parse(atob(y.split(".")[1]))["cognito:username"]}_____Public____Profile`,L=await(await fetch(X,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${y}`},body:JSON.stringify({query:`
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
          `,variables:{relationIds:[q]}})})).json(),N=(M=(g=(u=(f=(d=L==null?void 0:L.data)==null?void 0:d.batchGetItems)==null?void 0:f.items)==null?void 0:u[0])==null?void 0:g.item)==null?void 0:M.anyDisplayName;N&&localStorage.setItem(Z.PUBLIC_USERNAME,N),ee(x(G))}catch(b){console.error(b),l("error"),m(t("Invalid or expired verification code. Please try again or request a new code."))}}function F(){C(!1),P(""),l("idle")}return e.jsxs(e.Fragment,{children:[e.jsx(te,{}),e.jsx(ne,{isRTL:j,children:e.jsxs(he,{children:[e.jsx(fe,{children:e.jsxs(de,{children:[e.jsxs(pe,{children:[e.jsx(me,{src:x("images/logo_no_background.png"),alt:"6180 Logo"}),e.jsx("div",{style:{fontSize:"18px",color:"#333",lineHeight:"1.5",marginBottom:"24px",textAlign:"center"},children:t("Upgrade your subscription to continue uploading files.")})]}),_&&e.jsx(oe,{type:"error",children:_}),a?e.jsxs(e.Fragment,{children:[e.jsxs(U,{style:{marginBottom:"16px",color:"#555"},children:[t("Check your email for a 6-digit verification code sent to")," ",e.jsx("strong",{children:i})]}),e.jsx(ue,{ref:E,type:"tel",inputMode:"numeric",pattern:"[0-9]*",maxLength:6,value:S,onChange:H,placeholder:t("Enter 6-digit code")}),e.jsx(T,{primary:!0,onClick:W,disabled:h==="verifying"||S.length!==6,style:{width:"100%",padding:"12px",fontSize:"16px",backgroundColor:"#28a745"},children:t(h==="verifying"?"Verifying...":"Storage Management")}),e.jsxs(ge,{children:[e.jsx("span",{children:t("Didn't receive a code?")}),e.jsx(xe,{onClick:F,children:t("Send new code")})]})]}):e.jsxs(e.Fragment,{children:[e.jsx(O,{ref:D,type:"email",value:i,onChange:n=>p(n.target.value),placeholder:t("Enter your email")}),e.jsx(T,{primary:!0,onClick:$,disabled:h==="sending"||!i.trim(),style:{width:"100%",padding:"12px",fontSize:"16px"},children:t(h==="sending"?"Sending...":"Send Verification Code")}),e.jsx(U,{children:t("We'll send a secure verification code to your email")})]})]})}),e.jsxs(se,{children:[e.jsx(R,{href:x("terms.html"),isHovered:v==="terms",onMouseEnter:()=>c("terms"),onMouseLeave:()=>c(null),children:t("Terms of Service")}),e.jsx(R,{href:x("privacy.html"),isHovered:v==="privacy",onMouseEnter:()=>c("privacy"),onMouseLeave:()=>c(null),children:t("Privacy Policy")}),e.jsx(R,{href:x("support.html"),isHovered:v==="support",onMouseEnter:()=>c("support"),onMouseLeave:()=>c(null),children:t("Support")})]})]})})]})},Ce=()=>e.jsx(K,{children:e.jsx(ye,{})});J.createRoot(document.getElementById("root")).render(e.jsx(Ce,{}));
