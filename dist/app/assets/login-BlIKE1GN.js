import{i as te,d as w,R as ne,j as e,r as n,I as re,u as se,C as $,k as oe,l as ie,a as ae,G as le,A as ce,b as E,M as de,B as z,e as ue,f as M,g as fe}from"./buttons-CJB49aeq.js";import{C as me,L as ge,a as pe,b as he,I as N,R as ye,c as xe,O as Ce}from"./loginStyles-DsggsOdN.js";import{C as ve,R as Se,S as Ie,I as Ee}from"./SignUpCommand-BazhjDqD.js";import"./forms-DoOSyb7H.js";import"./parseJsonBody-CiQf1sgt.js";const O=new ve({region:te}),we=w.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
  box-sizing: border-box;
`,je=w.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
`,Le=w.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`,Re=w(Ce)`
  transition: all 0.3s ease;
  ${o=>o.$isAutoVerifying&&`
    border-color: #28a745;
    box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.2);
    background-color: #f8fff9;
  `}
`;function H(o){const g=o.trim().toLowerCase(),a="@gmail.com";return g.endsWith(a)?`${g.slice(0,-a.length).replace(/\./g,"")}${a}`:g}const be=()=>{const[o,g]=n.useState(""),[a,j]=n.useState(!1),[l,U]=n.useState(""),[D,F]=n.useState(""),[s,u]=n.useState("idle"),[L,p]=n.useState(""),[R,h]=n.useState(null),[V,q]=n.useState("my-albums.html"),[W,x]=n.useState(!1),{t:r,language:b,loading:K}=se(),J=n.useRef(null),y=n.useRef(null),c=n.useRef(null),i=n.useRef(!1),T=fe(b)==="rtl";n.useEffect(()=>{document.documentElement.lang=b,document.documentElement.dir=T?"rtl":"ltr"},[b,T]),n.useEffect(()=>{if(typeof window<"u"){const t=new URLSearchParams(window.location.search).get("redirect")||"my-albums.html",f=(m=>m.startsWith("/")||m.startsWith(window.location.origin)||/^https?:\/\/([\w-]+\.)*6180\.app(\/.*)?$/.test(m))(t)?t.startsWith("http")||t.startsWith("/")?t:`/${t}`:"my-albums.html";q(f)}},[]),n.useEffect(()=>{a&&y.current&&y.current.focus()},[a]);function Q(t){const d=t.target.value;/^\d*$/.test(d)&&d.length<=6&&(U(d),L&&(s==="error"||i.current)&&(p(""),u("idle")))}function Y(t){t.key==="Enter"&&l.length===6&&(t.preventDefault(),c.current&&clearTimeout(c.current),S(!1)),t.key==="Backspace"&&i.current&&(i.current=!1)}const S=n.useCallback(async(t=!1)=>{var f,m,C,v,A,B;if(s==="verifying"||s==="auto-verifying")return;u(t?"auto-verifying":"verifying"),p(""),x(!1),i.current=!0;const d=H(o);try{const P=new Se({ClientId:$,ChallengeName:"CUSTOM_CHALLENGE",ChallengeResponses:{USERNAME:d,ANSWER:l},Session:D}),I=(f=(await O.send(P)).AuthenticationResult)==null?void 0:f.IdToken;if(!I)throw new Error("No token received");localStorage.setItem("idToken",I);const ee=`${JSON.parse(atob(I.split(".")[1]))["cognito:username"]}_____Public____Profile`,k=await(await fetch(oe,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${I}`},body:JSON.stringify({query:`
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
          `,variables:{relationIds:[ee]}})})).json(),G=(B=(A=(v=(C=(m=k==null?void 0:k.data)==null?void 0:m.batchGetItems)==null?void 0:C.items)==null?void 0:v[0])==null?void 0:A.item)==null?void 0:B.anyDisplayName;G&&localStorage.setItem(ie.PUBLIC_USERNAME,G),ae(V)}catch(P){console.error(P),u("error"),i.current=!1,p(r("Invalid or expired verification code. Please try again or request a new code.")),y.current&&(y.current.focus(),setTimeout(()=>{var _;(_=y.current)==null||_.select()},100))}},[s,o,l,D,r,V]);n.useEffect(()=>(c.current&&clearTimeout(c.current),l.length===6&&s!=="verifying"&&s!=="auto-verifying"&&!i.current?(x(!0),c.current=setTimeout(()=>{S(!0)},500)):l.length<6&&(x(!1),i.current&&l.length<6&&(i.current=!1)),()=>{c.current&&clearTimeout(c.current)}),[l,s,S]);async function X(){var d;u("sending"),p(""),x(!1),i.current=!1;const t=H(o);if(!t||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)){u("error"),p(r("Please enter a valid email address"));return}try{const f=new Ie({ClientId:$,Username:t,Password:crypto.randomUUID(),UserAttributes:[{Name:"email",Value:t}]});try{await O.send(f)}catch(v){if(!((d=v.name)!=null&&d.includes("UsernameExistsException")))throw v}const m=new Ee({ClientId:$,AuthFlow:"CUSTOM_AUTH",AuthParameters:{USERNAME:t}}),C=await O.send(m);if(C.Session)F(C.Session),j(!0),u("idle");else throw new Error("No session returned from InitiateAuth")}catch(f){console.error(f),u("error"),p(r("Unable to send verification code. Please try again later."))}}function Z(){j(!1),U(""),u("idle"),x(!1),p(""),i.current=!1,c.current&&clearTimeout(c.current)}return K?e.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",fontFamily:"system-ui, -apple-system, sans-serif"},children:"Loading..."}):e.jsxs(e.Fragment,{children:[e.jsx(le,{}),e.jsx(ce,{$isRTL:T,children:e.jsxs(me,{children:[e.jsx(Le,{children:e.jsxs(ge,{children:[e.jsxs(pe,{children:[e.jsx(he,{src:E("images/logo_no_background.png"),alt:"6180 Logo"}),e.jsx(je,{children:r("Login to 6180")})]}),L&&e.jsx(de,{$type:"error",children:L}),a?e.jsxs(e.Fragment,{children:[e.jsxs(N,{style:{marginBottom:"16px",color:"#555"},children:[r("We sent a 6-digit code to")," ",e.jsx("strong",{children:o})]}),e.jsx(Re,{ref:y,type:"tel",inputMode:"numeric",pattern:"[0-9]*",maxLength:6,value:l,onChange:Q,onKeyDown:Y,placeholder:r("Enter 6-digit code"),$isAutoVerifying:W||s==="auto-verifying"}),e.jsx(z,{$primary:!0,onClick:()=>S(!1),disabled:s==="verifying"||s==="auto-verifying"||l.length!==6,style:{width:"100%",backgroundColor:"#28a745",opacity:s==="auto-verifying"||W?.7:1},children:r(s==="verifying"||s==="auto-verifying"?"Verifying...":"Verify Code")}),e.jsx(N,{style:{fontSize:"12px",color:"#666",marginTop:"8px"},children:r("Code will be verified automatically when you finish typing")}),e.jsxs(ye,{children:[e.jsx("span",{children:r("Didn't receive a code?")}),e.jsx(xe,{onClick:Z,children:r("Send new code")})]})]}):e.jsxs(e.Fragment,{children:[e.jsx(we,{ref:J,type:"email",value:o,onChange:t=>g(t.target.value),placeholder:r("Enter your email")}),e.jsx(z,{$primary:!0,onClick:X,disabled:s==="sending"||!o.trim(),style:{width:"100%"},children:r(s==="sending"?"Sending...":"Send Verification Code")}),e.jsx(N,{children:r("We'll email you a one-time code to verify it's really you")})]})]})}),e.jsxs(ue,{children:[e.jsx(M,{href:E("terms.html"),$isHovered:R==="terms",onMouseEnter:()=>h("terms"),onMouseLeave:()=>h(null),children:r("Terms of Service")}),e.jsx(M,{href:E("privacy.html"),$isHovered:R==="privacy",onMouseEnter:()=>h("privacy"),onMouseLeave:()=>h(null),children:r("Privacy Policy")}),e.jsx(M,{href:E("support.html"),$isHovered:R==="support",onMouseEnter:()=>h("support"),onMouseLeave:()=>h(null),children:r("Support")})]})]})})]})},Te=()=>{const[o,g]=n.useState("en");return n.useEffect(()=>{const a=localStorage.getItem("preferred-language")||localStorage.getItem("user_language")||"en";g(a)},[]),e.jsx(re,{initialLanguage:o,preloadLanguages:["en"],children:e.jsx(be,{})})};typeof window<"u"&&ne.createRoot(document.getElementById("root")).render(e.jsx(Te,{}));
