import{i as te,d as x,R as ne,j as e,r,I as re,u as se,C as M,k as oe,l as ie,a as ae,G as le,A as ce,b as E,M as de,B as G,e as ue,f as N,g as fe}from"./buttons-CJB49aeq.js";import{C as ge,L as me,a as pe,b as he,I as O,R as ye,c as xe,O as ve}from"./loginStyles-DsggsOdN.js";import{C as Ce,R as Se,S as we,I as Ie}from"./SignUpCommand-BazhjDqD.js";import"./forms-DoOSyb7H.js";import"./parseJsonBody-CiQf1sgt.js";const U=new Ce({region:te}),Ee=x.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
  box-sizing: border-box;
`,je=x.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
`,Le=x.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`,Re=x(ve)`
  transition: all 0.3s ease;
  ${s=>s.$isAutoVerifying&&`
    border-color: #28a745;
    box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.2);
    background-color: #f8fff9;
  `}
`,be=x.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 8px 0;
  font-size: 14px;
  color: #28a745;
  opacity: ${s=>s.$show?1:0};
  transition: opacity 0.3s ease;
  height: ${s=>s.$show?"auto":"0"};
  overflow: hidden;
`,Ae=x.div`
  width: 16px;
  height: 16px;
  border: 2px solid #e3e3e3;
  border-top: 2px solid #28a745;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;function H(s){const m=s.trim().toLowerCase(),a="@gmail.com";return m.endsWith(a)?`${m.slice(0,-a.length).replace(/\./g,"")}${a}`:m}const Te=()=>{const[s,m]=r.useState(""),[a,j]=r.useState(!1),[l,V]=r.useState(""),[D,F]=r.useState(""),[o,u]=r.useState("idle"),[L,p]=r.useState(""),[R,h]=r.useState(null),[W,q]=r.useState("my-albums.html"),[b,v]=r.useState(!1),{t:n,language:A,loading:K}=se(),J=r.useRef(null),y=r.useRef(null),c=r.useRef(null),i=r.useRef(!1),T=fe(A)==="rtl";r.useEffect(()=>{document.documentElement.lang=A,document.documentElement.dir=T?"rtl":"ltr"},[A,T]),r.useEffect(()=>{if(typeof window<"u"){const t=new URLSearchParams(window.location.search).get("redirect")||"my-albums.html",f=(g=>g.startsWith("/")||g.startsWith(window.location.origin)||/^https?:\/\/([\w-]+\.)*6180\.app(\/.*)?$/.test(g))(t)?t.startsWith("http")||t.startsWith("/")?t:`/${t}`:"my-albums.html";q(f)}},[]),r.useEffect(()=>{a&&y.current&&y.current.focus()},[a]);function Q(t){const d=t.target.value;/^\d*$/.test(d)&&d.length<=6&&(V(d),L&&(o==="error"||i.current)&&(p(""),u("idle")))}function Y(t){t.key==="Enter"&&l.length===6&&(t.preventDefault(),c.current&&clearTimeout(c.current),w(!1)),t.key==="Backspace"&&i.current&&(i.current=!1)}const w=r.useCallback(async(t=!1)=>{var f,g,C,S,P,z;if(o==="verifying"||o==="auto-verifying")return;u(t?"auto-verifying":"verifying"),p(""),v(!1),i.current=!0;const d=H(s);try{const $=new Se({ClientId:M,ChallengeName:"CUSTOM_CHALLENGE",ChallengeResponses:{USERNAME:d,ANSWER:l},Session:D}),I=(f=(await U.send($)).AuthenticationResult)==null?void 0:f.IdToken;if(!I)throw new Error("No token received");localStorage.setItem("idToken",I);const ee=`${JSON.parse(atob(I.split(".")[1]))["cognito:username"]}_____Public____Profile`,k=await(await fetch(oe,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${I}`},body:JSON.stringify({query:`
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
          `,variables:{relationIds:[ee]}})})).json(),B=(z=(P=(S=(C=(g=k==null?void 0:k.data)==null?void 0:g.batchGetItems)==null?void 0:C.items)==null?void 0:S[0])==null?void 0:P.item)==null?void 0:z.anyDisplayName;B&&localStorage.setItem(ie.PUBLIC_USERNAME,B),ae(W)}catch($){console.error($),u("error"),i.current=!1,p(n("Invalid or expired verification code. Please try again or request a new code.")),y.current&&(y.current.focus(),setTimeout(()=>{var _;(_=y.current)==null||_.select()},100))}},[o,s,l,D,n,W]);r.useEffect(()=>(c.current&&clearTimeout(c.current),l.length===6&&o!=="verifying"&&o!=="auto-verifying"&&!i.current?(v(!0),c.current=setTimeout(()=>{w(!0)},500)):l.length<6&&(v(!1),i.current&&l.length<6&&(i.current=!1)),()=>{c.current&&clearTimeout(c.current)}),[l,o,w]);async function X(){var d;u("sending"),p(""),v(!1),i.current=!1;const t=H(s);if(!t||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)){u("error"),p(n("Please enter a valid email address"));return}try{const f=new we({ClientId:M,Username:t,Password:crypto.randomUUID(),UserAttributes:[{Name:"email",Value:t}]});try{await U.send(f)}catch(S){if(!((d=S.name)!=null&&d.includes("UsernameExistsException")))throw S}const g=new Ie({ClientId:M,AuthFlow:"CUSTOM_AUTH",AuthParameters:{USERNAME:t}}),C=await U.send(g);if(C.Session)F(C.Session),j(!0),u("idle");else throw new Error("No session returned from InitiateAuth")}catch(f){console.error(f),u("error"),p(n("Unable to send verification code. Please try again later."))}}function Z(){j(!1),V(""),u("idle"),v(!1),p(""),i.current=!1,c.current&&clearTimeout(c.current)}return K?e.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",fontFamily:"system-ui, -apple-system, sans-serif"},children:"Loading..."}):e.jsxs(e.Fragment,{children:[e.jsx(le,{}),e.jsx(ce,{$isRTL:T,children:e.jsxs(ge,{children:[e.jsx(Le,{children:e.jsxs(me,{children:[e.jsxs(pe,{children:[e.jsx(he,{src:E("images/logo_no_background.png"),alt:"6180 Logo"}),e.jsx(je,{children:n("Login to 6180")})]}),L&&e.jsx(de,{$type:"error",children:L}),a?e.jsxs(e.Fragment,{children:[e.jsxs(O,{style:{marginBottom:"16px",color:"#555"},children:[n("We sent a 6-digit code to")," ",e.jsx("strong",{children:s})]}),e.jsx(Re,{ref:y,type:"tel",inputMode:"numeric",pattern:"[0-9]*",maxLength:6,value:l,onChange:Q,onKeyDown:Y,placeholder:n("Enter 6-digit code"),$isAutoVerifying:b||o==="auto-verifying"}),e.jsxs(be,{$show:b||o==="auto-verifying",children:[e.jsx(Ae,{}),e.jsx("span",{children:n("Verifying code...")})]}),e.jsx(G,{$primary:!0,onClick:()=>w(!1),disabled:o==="verifying"||o==="auto-verifying"||l.length!==6,style:{width:"100%",backgroundColor:"#28a745",opacity:o==="auto-verifying"||b?.7:1},children:n(o==="verifying"||o==="auto-verifying"?"Verifying...":"Verify Code")}),e.jsx(O,{style:{fontSize:"12px",color:"#666",marginTop:"8px"},children:n("Code will be verified automatically when you finish typing")}),e.jsxs(ye,{children:[e.jsx("span",{children:n("Didn't receive a code?")}),e.jsx(xe,{onClick:Z,children:n("Send new code")})]})]}):e.jsxs(e.Fragment,{children:[e.jsx(Ee,{ref:J,type:"email",value:s,onChange:t=>m(t.target.value),placeholder:n("Enter your email")}),e.jsx(G,{$primary:!0,onClick:X,disabled:o==="sending"||!s.trim(),style:{width:"100%"},children:n(o==="sending"?"Sending...":"Send Verification Code")}),e.jsx(O,{children:n("We'll email you a one-time code to verify it's really you")})]})]})}),e.jsxs(ue,{children:[e.jsx(N,{href:E("terms.html"),$isHovered:R==="terms",onMouseEnter:()=>h("terms"),onMouseLeave:()=>h(null),children:n("Terms of Service")}),e.jsx(N,{href:E("privacy.html"),$isHovered:R==="privacy",onMouseEnter:()=>h("privacy"),onMouseLeave:()=>h(null),children:n("Privacy Policy")}),e.jsx(N,{href:E("support.html"),$isHovered:R==="support",onMouseEnter:()=>h("support"),onMouseLeave:()=>h(null),children:n("Support")})]})]})})]})},Pe=()=>{const[s,m]=r.useState("en");return r.useEffect(()=>{const a=localStorage.getItem("preferred-language")||localStorage.getItem("user_language")||"en";m(a)},[]),e.jsx(re,{initialLanguage:s,preloadLanguages:["en"],children:e.jsx(Te,{})})};typeof window<"u"&&ne.createRoot(document.getElementById("root")).render(e.jsx(Pe,{}));
