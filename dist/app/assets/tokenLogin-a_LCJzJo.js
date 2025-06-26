import{d as f,R as A,j as e,r as n,I as O,u as D,av as G,k as F,l as U,a as P,G as B,A as H,b as d,e as q,f as L,g as z,B as K,x as J}from"./layout-D_Ibv38s.js";import{C as W,b as Q}from"./loginStyles-CWAI3AFP.js";import"./forms-H2jxYTvQ.js";const V=f(J)`
  max-width: 400px;
  width: 100%;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.06);
  text-align: center;
`,p=f.div`
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
`,Z=G,ee=()=>{const[t,s]=n.useState("waiting"),[m,h]=n.useState(""),[x,a]=n.useState(null),{t:r,language:y,loading:$}=D(),w=z(y)==="rtl";n.useEffect(()=>{document.documentElement.lang=y,document.documentElement.dir=w?"rtl":"ltr"},[y,w]);const j=n.useCallback(async(c,l)=>{var g,k,T,b,I;try{const i=await fetch(`${Z}?token=${encodeURIComponent(c)}`,{method:"GET",credentials:"include",headers:{"Content-Type":"application/json"}}),S=await i.json();if(!i.ok)throw new Error(S.error||"Token redemption failed");const o=S;if(o.success){if(o.idToken){localStorage.setItem("idToken",o.idToken);const M=`${JSON.parse(atob(o.idToken.split(".")[1]))["cognito:username"]}_____Public____Profile`;try{const E=await(await fetch(F,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o.idToken}`},body:JSON.stringify({query:`
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
                `,variables:{relationIds:[M]}})})).json(),_=(I=(b=(T=(k=(g=E==null?void 0:E.data)==null?void 0:g.batchGetItems)==null?void 0:k.items)==null?void 0:T[0])==null?void 0:b.item)==null?void 0:I.anyDisplayName;_&&localStorage.setItem(U.PUBLIC_USERNAME,_)}catch(v){console.warn("Failed to fetch profile info:",v)}}else throw new Error("No IdToken received from server");if(s("redirecting"),typeof window<"u"){const u=new URL(window.location.href);u.searchParams.delete("token"),u.searchParams.delete("redirect"),window.history.replaceState({},"",u.pathname)}const N=o.redirect||l;setTimeout(()=>{P(N)},1e3)}else throw new Error(o.message||"Login failed")}catch(i){console.error("Token redemption error:",i),s("error"),i instanceof Error?h(i.message):h(r("An unexpected error occurred during login"))}},[r]);n.useEffect(()=>{if(typeof window>"u")return;const c=new URLSearchParams(window.location.search),l=c.get("token"),g=c.get("redirect")||"/home";if(!l){s("error"),h(r("No login token provided"));return}s("loading"),j(l,g)},[r,j]);const R=()=>{P(d("login.html"))};if($)return e.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",fontFamily:"system-ui, -apple-system, sans-serif"},children:"Loading..."});const C=()=>{switch(t){case"waiting":return e.jsx(p,{$type:"loading",children:r("Preparing login...")});case"loading":return e.jsxs(e.Fragment,{children:[e.jsx(Y,{}),e.jsx(p,{$type:"loading",children:r("Logging you in...")})]});case"success":case"redirecting":return e.jsx(p,{$type:"success",children:r("Login successful! Redirecting...")});case"error":return e.jsxs(e.Fragment,{children:[e.jsx(p,{$type:"error",children:m||r("Login failed")}),e.jsx(K,{$primary:!0,onClick:R,style:{width:"100%",padding:"12px",fontSize:"16px"},children:r("Go to Login Page")})]});default:return null}};return e.jsxs(e.Fragment,{children:[e.jsx(B,{}),e.jsx(H,{$isRTL:w,children:e.jsxs(W,{children:[e.jsx(X,{children:e.jsxs(V,{children:[e.jsx(Q,{src:d("images/logo_no_background.png"),alt:"6180 Logo"}),C()]})}),e.jsxs(q,{children:[e.jsx(L,{href:d("terms.html"),$isHovered:x==="terms",onMouseEnter:()=>a("terms"),onMouseLeave:()=>a(null),children:r("Terms of Service")}),e.jsx(L,{href:d("privacy.html"),$isHovered:x==="privacy",onMouseEnter:()=>a("privacy"),onMouseLeave:()=>a(null),children:r("Privacy Policy")}),e.jsx(L,{href:d("support.html"),$isHovered:x==="support",onMouseEnter:()=>a("support"),onMouseLeave:()=>a(null),children:r("Support")})]})]})})]})},re=()=>{const[t,s]=n.useState("en");return n.useEffect(()=>{const m=localStorage.getItem("preferred-language")||localStorage.getItem("user_language")||"en";s(m)},[]),e.jsx(O,{initialLanguage:t,preloadLanguages:["en"],children:e.jsx(ee,{})})};typeof window<"u"&&A.createRoot(document.getElementById("root")).render(e.jsx(re,{}));
