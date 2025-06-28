import{d as f,R as A,j as e,r as o,I as O,u as D,ap as G,k as F,l as U,a as P,G as B,A as H,b as d,e as q,f as k,g as z,B as K,x as J}from"./buttons-DmOL7fFv.js";import{C as W,a as Q}from"./loginStyles-BxZuqbpc.js";import"./forms-B4HN34YU.js";const V=f(J)`
  max-width: 400px;
  width: 100%;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04);
  border: 1px solid rgba(255, 255, 255, 0.9);
  text-align: center;
  background: white;
  
  /* Enhanced elevation with subtle additional effects */
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 12px;
    padding: 1px;
    background: linear-gradient(145deg, rgba(255,255,255,0.8), rgba(0,0,0,0.05));
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: xor;
    -webkit-mask-composite: xor;
    pointer-events: none;
  }
`,u=f.div`
  font-size: 16px;
  margin: 24px 0;
  padding: 16px;
  border-radius: 8px;
  
  ${t=>t.$type==="loading"&&`
    color: #666;
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
  `}
  
  ${t=>t.$type==="success"&&`
    color: #155724;
    background-color: #d4edda;
    border: 1px solid #c3e6cb;
  `}
  
  ${t=>t.$type==="error"&&`
    color: #721c24;
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
  `}
`,Y=f.div`
  border: 3px solid #f3f3f3;
  border-top: 3px solid #007bff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`,X=f.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`,Z=G,ee=()=>{const[t,s]=o.useState("waiting"),[m,h]=o.useState(""),[x,a]=o.useState(null),{t:r,language:y,loading:$}=D(),b=z(y)==="rtl";o.useEffect(()=>{document.documentElement.lang=y,document.documentElement.dir=b?"rtl":"ltr"},[y,b]);const E=o.useCallback(async(c,l)=>{var g,L,j,T,v;try{const i=await fetch(`${Z}?token=${encodeURIComponent(c)}`,{method:"GET",credentials:"include",headers:{"Content-Type":"application/json"}}),I=await i.json();if(!i.ok)throw new Error(I.error||"Token redemption failed");const n=I;if(n.success){if(n.idToken){localStorage.setItem("idToken",n.idToken);const M=`${JSON.parse(atob(n.idToken.split(".")[1]))["cognito:username"]}_____Public____Profile`;try{const w=await(await fetch(F,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n.idToken}`},body:JSON.stringify({query:`
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
                `,variables:{relationIds:[M]}})})).json(),_=(v=(T=(j=(L=(g=w==null?void 0:w.data)==null?void 0:g.batchGetItems)==null?void 0:L.items)==null?void 0:j[0])==null?void 0:T.item)==null?void 0:v.anyDisplayName;_&&localStorage.setItem(U.PUBLIC_USERNAME,_)}catch(S){console.warn("Failed to fetch profile info:",S)}}else throw new Error("No IdToken received from server");if(s("redirecting"),typeof window<"u"){const p=new URL(window.location.href);p.searchParams.delete("token"),p.searchParams.delete("redirect"),window.history.replaceState({},"",p.pathname)}const N=n.redirect||l;setTimeout(()=>{P(N)},1e3)}else throw new Error(n.message||"Login failed")}catch(i){console.error("Token redemption error:",i),s("error"),i instanceof Error?h(i.message):h(r("An unexpected error occurred during login"))}},[r]);o.useEffect(()=>{if(typeof window>"u")return;const c=new URLSearchParams(window.location.search),l=c.get("token"),g=c.get("redirect")||"/home";if(!l){s("error"),h(r("No login token provided"));return}s("loading"),E(l,g)},[r,E]);const R=()=>{P(d("login.html"))};if($)return e.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",fontFamily:"system-ui, -apple-system, sans-serif"},children:"Loading..."});const C=()=>{switch(t){case"waiting":return e.jsx(u,{$type:"loading",children:r("Preparing login...")});case"loading":return e.jsxs(e.Fragment,{children:[e.jsx(Y,{}),e.jsx(u,{$type:"loading",children:r("Logging you in...")})]});case"success":case"redirecting":return e.jsx(u,{$type:"success",children:r("Login successful! Redirecting...")});case"error":return e.jsxs(e.Fragment,{children:[e.jsx(u,{$type:"error",children:m||r("Login failed")}),e.jsx(K,{$primary:!0,onClick:R,style:{width:"100%",padding:"12px",fontSize:"16px"},children:r("Go to Login Page")})]});default:return null}};return e.jsxs(e.Fragment,{children:[e.jsx(B,{}),e.jsx(H,{$isRTL:b,children:e.jsxs(W,{children:[e.jsx(X,{children:e.jsxs(V,{children:[e.jsx(Q,{src:d("images/logo_no_background.png"),alt:"6180 Logo"}),C()]})}),e.jsxs(q,{children:[e.jsx(k,{href:d("terms.html"),$isHovered:x==="terms",onMouseEnter:()=>a("terms"),onMouseLeave:()=>a(null),children:r("Terms of Service")}),e.jsx(k,{href:d("privacy.html"),$isHovered:x==="privacy",onMouseEnter:()=>a("privacy"),onMouseLeave:()=>a(null),children:r("Privacy Policy")}),e.jsx(k,{href:d("support.html"),$isHovered:x==="support",onMouseEnter:()=>a("support"),onMouseLeave:()=>a(null),children:r("Support")})]})]})})]})},re=()=>{const[t,s]=o.useState("en");return o.useEffect(()=>{const m=localStorage.getItem("preferred-language")||localStorage.getItem("user_language")||"en";s(m)},[]),e.jsx(O,{initialLanguage:t,preloadLanguages:["en"],children:e.jsx(ee,{})})};typeof window<"u"&&A.createRoot(document.getElementById("root")).render(e.jsx(re,{}));
