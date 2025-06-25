import{d,R as A,j as e,r as o,I as O,u as D,M as G,f as F,L as U,a as _,b as c,g as B}from"./utils-2qV3otm0.js";import{G as H,A as q,c as z,d as E,B as K,C as J}from"./styled-components-UVQg2Kys.js";const W=d(J)`
  max-width: 400px;
  width: 100%;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.06);
  text-align: center;
`,Q=d.img`
  height: 60px;
  margin-bottom: 16px;
`,m=d.div`
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
`,V=d.div`
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
`,Y=d.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  padding: 20px;
`,X=d.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`,Z=G,ee=()=>{const[t,s]=o.useState("waiting"),[f,h]=o.useState(""),[x,a]=o.useState(null),{t:r,language:y,loading:P}=D(),w=B(y)==="rtl";o.useEffect(()=>{document.documentElement.lang=y,document.documentElement.dir=w?"rtl":"ltr"},[y,w]),o.useEffect(()=>{if(typeof window>"u")return;const l=new URLSearchParams(window.location.search),g=l.get("token"),p=l.get("redirect")||"/home";if(!g){s("error"),h(r("No login token provided"));return}s("loading"),$(g,p)},[r]);const $=async(l,g)=>{var p,j,T,k,b;try{const i=await fetch(`${Z}?token=${encodeURIComponent(l)}`,{method:"GET",credentials:"include",headers:{"Content-Type":"application/json"}}),v=await i.json();if(!i.ok)throw new Error(v.error||"Token redemption failed");const n=v;if(n.success){if(n.idToken){localStorage.setItem("idToken",n.idToken);const C=`${JSON.parse(atob(n.idToken.split(".")[1]))["cognito:username"]}_____Public____Profile`;try{const L=await(await fetch(F,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n.idToken}`},body:JSON.stringify({query:`
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
                `,variables:{relationIds:[C]}})})).json(),S=(b=(k=(T=(j=(p=L==null?void 0:L.data)==null?void 0:p.batchGetItems)==null?void 0:j.items)==null?void 0:T[0])==null?void 0:k.item)==null?void 0:b.anyDisplayName;S&&localStorage.setItem(U.PUBLIC_USERNAME,S)}catch(I){console.warn("Failed to fetch profile info:",I)}}else throw new Error("No IdToken received from server");if(s("redirecting"),typeof window<"u"){const u=new URL(window.location.href);u.searchParams.delete("token"),u.searchParams.delete("redirect"),window.history.replaceState({},"",u.pathname)}const N=n.redirect||g;setTimeout(()=>{_(N)},1e3)}else throw new Error(n.message||"Login failed")}catch(i){console.error("Token redemption error:",i),s("error"),i instanceof Error?h(i.message):h(r("An unexpected error occurred during login"))}},R=()=>{_(c("login.html"))};if(P)return e.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",fontFamily:"system-ui, -apple-system, sans-serif"},children:"Loading..."});const M=()=>{switch(t){case"waiting":return e.jsx(m,{$type:"loading",children:r("Preparing login...")});case"loading":return e.jsxs(e.Fragment,{children:[e.jsx(V,{}),e.jsx(m,{$type:"loading",children:r("Logging you in...")})]});case"success":case"redirecting":return e.jsx(m,{$type:"success",children:r("Login successful! Redirecting...")});case"error":return e.jsxs(e.Fragment,{children:[e.jsx(m,{$type:"error",children:f||r("Login failed")}),e.jsx(K,{$primary:!0,onClick:R,style:{width:"100%",padding:"12px",fontSize:"16px"},children:r("Go to Login Page")})]});default:return null}};return e.jsxs(e.Fragment,{children:[e.jsx(H,{}),e.jsx(q,{$isRTL:w,children:e.jsxs(Y,{children:[e.jsx(X,{children:e.jsxs(W,{children:[e.jsx(Q,{src:c("images/logo_no_background.png"),alt:"6180 Logo"}),M()]})}),e.jsxs(z,{children:[e.jsx(E,{href:c("terms.html"),$isHovered:x==="terms",onMouseEnter:()=>a("terms"),onMouseLeave:()=>a(null),children:r("Terms of Service")}),e.jsx(E,{href:c("privacy.html"),$isHovered:x==="privacy",onMouseEnter:()=>a("privacy"),onMouseLeave:()=>a(null),children:r("Privacy Policy")}),e.jsx(E,{href:c("support.html"),$isHovered:x==="support",onMouseEnter:()=>a("support"),onMouseLeave:()=>a(null),children:r("Support")})]})]})})]})},re=()=>{const[t,s]=o.useState("en");return o.useEffect(()=>{const f=localStorage.getItem("preferred-language")||localStorage.getItem("user_language")||"en";s(f)},[]),e.jsx(O,{initialLanguage:t,preloadLanguages:["en"],children:e.jsx(ee,{})})};typeof window<"u"&&A.createRoot(document.getElementById("root")).render(e.jsx(re,{}));
