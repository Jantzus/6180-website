import{i as te,d as b,R as ne,j as e,r as n,I as re,u as oe,C as $,k as se,l as ie,a as ae,G as le,A as ce,b as I,M as de,B as z,e as ue,f as M,g as fe}from"./buttons-DVLwyWsJ.js";import{C as ge,L as me,a as pe,I as N,R as he,b as ye,c as xe,O as Ce}from"./loginStyles-CauSN0IP.js";import{C as ve,R as be,S as Se,I as Ee}from"./SignUpCommand-DcqUHEhw.js";import"./forms-DYxGj0FK.js";import"./parseJsonBody-BTeOVZPd.js";const O=new ve({region:te}),Ie=b.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
  box-sizing: border-box;
`,we=b.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
`,Le=b.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`,je=b(xe)`
  /* Enhanced elevation styling */
  box-shadow: 0 6px 20px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04);
  border: 1px solid rgba(255, 255, 255, 0.9);
  background: white;
  position: relative;
  
  /* Subtle gradient border effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(145deg, rgba(255,255,255,0.8), rgba(0,0,0,0.05));
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: xor;
    -webkit-mask-composite: xor;
    pointer-events: none;
  }
`,Re=b(Ce)`
  transition: all 0.3s ease;
  ${s=>s.$isAutoVerifying&&`
    border-color: #28a745;
    box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.2);
    background-color: #f8fff9;
  `}
`;function H(s){const m=s.trim().toLowerCase(),a="@gmail.com";return m.endsWith(a)?`${m.slice(0,-a.length).replace(/\./g,"")}${a}`:m}const Te=()=>{const[s,m]=n.useState(""),[a,w]=n.useState(!1),[l,U]=n.useState(""),[D,F]=n.useState(""),[o,u]=n.useState("idle"),[L,p]=n.useState(""),[j,h]=n.useState(null),[V,q]=n.useState("my-albums.html"),[W,x]=n.useState(!1),{t:r,language:R,loading:K}=oe(),J=n.useRef(null),y=n.useRef(null),c=n.useRef(null),i=n.useRef(!1),T=fe(R)==="rtl";n.useEffect(()=>{document.documentElement.lang=R,document.documentElement.dir=T?"rtl":"ltr"},[R,T]),n.useEffect(()=>{if(typeof window<"u"){const t=new URLSearchParams(window.location.search).get("redirect")||"my-albums.html",f=(g=>g.startsWith("/")||g.startsWith(window.location.origin)||/^https?:\/\/([\w-]+\.)*6180\.app(\/.*)?$/.test(g))(t)?t.startsWith("http")||t.startsWith("/")?t:`/${t}`:"my-albums.html";q(f)}},[]),n.useEffect(()=>{a&&y.current&&y.current.focus()},[a]);function Q(t){const d=t.target.value;/^\d*$/.test(d)&&d.length<=6&&(U(d),L&&(o==="error"||i.current)&&(p(""),u("idle")))}function Y(t){t.key==="Enter"&&l.length===6&&(t.preventDefault(),c.current&&clearTimeout(c.current),S(!1)),t.key==="Backspace"&&i.current&&(i.current=!1)}const S=n.useCallback(async(t=!1)=>{var f,g,C,v,A,B;if(o==="verifying"||o==="auto-verifying")return;u(t?"auto-verifying":"verifying"),p(""),x(!1),i.current=!0;const d=H(s);try{const k=new be({ClientId:$,ChallengeName:"CUSTOM_CHALLENGE",ChallengeResponses:{USERNAME:d,ANSWER:l},Session:D}),E=(f=(await O.send(k)).AuthenticationResult)==null?void 0:f.IdToken;if(!E)throw new Error("No token received");localStorage.setItem("idToken",E);const ee=`${JSON.parse(atob(E.split(".")[1]))["cognito:username"]}_____Public____Profile`,_=await(await fetch(se,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${E}`},body:JSON.stringify({query:`
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
          `,variables:{relationIds:[ee]}})})).json(),G=(B=(A=(v=(C=(g=_==null?void 0:_.data)==null?void 0:g.batchGetItems)==null?void 0:C.items)==null?void 0:v[0])==null?void 0:A.item)==null?void 0:B.anyDisplayName;G&&localStorage.setItem(ie.PUBLIC_USERNAME,G),ae(V)}catch(k){console.error(k),u("error"),i.current=!1,p(r("Invalid or expired verification code. Please try again or request a new code.")),y.current&&(y.current.focus(),setTimeout(()=>{var P;(P=y.current)==null||P.select()},100))}},[o,s,l,D,r,V]);n.useEffect(()=>(c.current&&clearTimeout(c.current),l.length===6&&o!=="verifying"&&o!=="auto-verifying"&&!i.current?(x(!0),c.current=setTimeout(()=>{S(!0)},500)):l.length<6&&(x(!1),i.current&&l.length<6&&(i.current=!1)),()=>{c.current&&clearTimeout(c.current)}),[l,o,S]);async function X(){var d;u("sending"),p(""),x(!1),i.current=!1;const t=H(s);if(!t||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)){u("error"),p(r("Please enter a valid email address"));return}try{const f=new Se({ClientId:$,Username:t,Password:crypto.randomUUID(),UserAttributes:[{Name:"email",Value:t}]});try{await O.send(f)}catch(v){if(!((d=v.name)!=null&&d.includes("UsernameExistsException")))throw v}const g=new Ee({ClientId:$,AuthFlow:"CUSTOM_AUTH",AuthParameters:{USERNAME:t}}),C=await O.send(g);if(C.Session)F(C.Session),w(!0),u("idle");else throw new Error("No session returned from InitiateAuth")}catch(f){console.error(f),u("error"),p(r("Unable to send verification code. Please try again later."))}}function Z(){w(!1),U(""),u("idle"),x(!1),p(""),i.current=!1,c.current&&clearTimeout(c.current)}return K?e.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",fontFamily:"system-ui, -apple-system, sans-serif"},children:"Loading..."}):e.jsxs(e.Fragment,{children:[e.jsx(le,{}),e.jsx(ce,{$isRTL:T,children:e.jsxs(ge,{children:[e.jsx(Le,{children:e.jsxs(je,{children:[e.jsxs(me,{children:[e.jsx(pe,{src:I("images/logo_no_background.png"),alt:"6180 Logo"}),e.jsx(we,{children:r("Login to 6180")})]}),L&&e.jsx(de,{$type:"error",children:L}),a?e.jsxs(e.Fragment,{children:[e.jsxs(N,{style:{marginBottom:"16px",color:"#555"},children:[r("We sent a 6-digit code to")," ",e.jsx("strong",{children:s})]}),e.jsx(Re,{ref:y,type:"tel",inputMode:"numeric",pattern:"[0-9]*",maxLength:6,value:l,onChange:Q,onKeyDown:Y,placeholder:r("Enter 6-digit code"),$isAutoVerifying:W||o==="auto-verifying"}),e.jsx(z,{$primary:!0,onClick:()=>S(!1),disabled:o==="verifying"||o==="auto-verifying"||l.length!==6,style:{width:"100%",backgroundColor:"#28a745",opacity:o==="auto-verifying"||W?.7:1},children:r(o==="verifying"||o==="auto-verifying"?"Verifying...":"Verify Code")}),e.jsx(N,{style:{fontSize:"12px",color:"#666",marginTop:"8px"},children:r("Code will be verified automatically when you finish typing")}),e.jsxs(he,{children:[e.jsx("span",{children:r("Didn't receive a code?")}),e.jsx(ye,{onClick:Z,children:r("Send new code")})]})]}):e.jsxs(e.Fragment,{children:[e.jsx(Ie,{ref:J,type:"email",value:s,onChange:t=>m(t.target.value),placeholder:r("Enter your email")}),e.jsx(z,{$primary:!0,onClick:X,disabled:o==="sending"||!s.trim(),style:{width:"100%"},children:r(o==="sending"?"Sending...":"Send Verification Code")}),e.jsx(N,{children:r("We'll email you a one-time account access code")})]})]})}),e.jsxs(ue,{children:[e.jsx(M,{href:I("terms.html"),$isHovered:j==="terms",onMouseEnter:()=>h("terms"),onMouseLeave:()=>h(null),children:r("Terms of Service")}),e.jsx(M,{href:I("privacy.html"),$isHovered:j==="privacy",onMouseEnter:()=>h("privacy"),onMouseLeave:()=>h(null),children:r("Privacy Policy")}),e.jsx(M,{href:I("support.html"),$isHovered:j==="support",onMouseEnter:()=>h("support"),onMouseLeave:()=>h(null),children:r("Support")})]})]})})]})},Ae=()=>{const[s,m]=n.useState("en");return n.useEffect(()=>{const a=localStorage.getItem("preferred-language")||localStorage.getItem("user_language")||"en";m(a)},[]),e.jsx(re,{initialLanguage:s,preloadLanguages:["en"],children:e.jsx(Te,{})})};typeof window<"u"&&ne.createRoot(document.getElementById("root")).render(e.jsx(Ae,{}));
