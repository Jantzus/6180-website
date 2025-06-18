import{d as a,R as A,j as e,I as O,a as i,u as D,M as G,f as U,L as B,r as S,b as c,g as F}from"./utils--6iex9oF.js";import{G as H,A as q,c as z,d as E,B as K,C as J}from"./styled-components-5L_zwx_8.js";const W=a(J)`
  max-width: 400px;
  width: 100%;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.06);
  text-align: center;
`,Q=a.img`
  height: 60px;
  margin-bottom: 16px;
`,L=a.div`
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
`,V=a.div`
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
`,Y=a.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  padding: 20px;
`,X=a.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`,Z=G,ee=()=>{const[t,d]=i.useState("loading"),[_,u]=i.useState(""),[m,n]=i.useState(null),{t:r,language:h,loading:P}=D(),f=F(h)==="rtl";i.useEffect(()=>{document.documentElement.lang=h,document.documentElement.dir=f?"rtl":"ltr"},[h,f]),i.useEffect(()=>{const l=new URLSearchParams(window.location.search),g=l.get("token"),p=l.get("redirect")||"/home";if(!g){d("error"),u(r("No login token provided"));return}R(g,p)},[r]);const R=async(l,g)=>{var p,j,T,k,b;try{d("loading");const s=await fetch(`${Z}?token=${encodeURIComponent(l)}`,{method:"GET",credentials:"include",headers:{"Content-Type":"application/json"}}),w=await s.json();if(!s.ok)throw new Error(w.error||"Token redemption failed");const o=w;if(o.success){if(o.idToken){localStorage.setItem("idToken",o.idToken);const C=`${JSON.parse(atob(o.idToken.split(".")[1]))["cognito:username"]}_____Public____Profile`;try{const y=await(await fetch(U,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o.idToken}`},body:JSON.stringify({query:`
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
                `,variables:{relationIds:[C]}})})).json(),I=(b=(k=(T=(j=(p=y==null?void 0:y.data)==null?void 0:p.batchGetItems)==null?void 0:j.items)==null?void 0:T[0])==null?void 0:k.item)==null?void 0:b.anyDisplayName;I&&localStorage.setItem(B.PUBLIC_USERNAME,I)}catch(v){console.warn("Failed to fetch profile info:",v)}}else throw new Error("No IdToken received from server");d("redirecting");const x=new URL(window.location.href);x.searchParams.delete("token"),x.searchParams.delete("redirect"),window.history.replaceState({},"",x.pathname);const N=o.redirect||g;setTimeout(()=>{S(N)},1e3)}else throw new Error(o.message||"Login failed")}catch(s){console.error("Token redemption error:",s),d("error"),s instanceof Error?u(s.message):u(r("An unexpected error occurred during login"))}},$=()=>{S(c("login.html"))};if(P)return e.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"},children:r("Loading...")});const M=()=>{switch(t){case"loading":return e.jsxs(e.Fragment,{children:[e.jsx(V,{}),e.jsx(L,{$type:"loading",children:r("Logging you in...")})]});case"success":case"redirecting":return e.jsx(L,{$type:"success",children:r("Login successful! Redirecting...")});case"error":return e.jsxs(e.Fragment,{children:[e.jsx(L,{$type:"error",children:_||r("Login failed")}),e.jsx(K,{$primary:!0,onClick:$,style:{width:"100%",padding:"12px",fontSize:"16px"},children:r("Go to Login Page")})]});default:return null}};return e.jsxs(e.Fragment,{children:[e.jsx(H,{}),e.jsx(q,{$isRTL:f,children:e.jsxs(Y,{children:[e.jsx(X,{children:e.jsxs(W,{children:[e.jsx(Q,{src:c("images/logo_no_background.png"),alt:"6180 Logo"}),M()]})}),e.jsxs(z,{children:[e.jsx(E,{href:c("terms.html"),$isHovered:m==="terms",onMouseEnter:()=>n("terms"),onMouseLeave:()=>n(null),children:r("Terms of Service")}),e.jsx(E,{href:c("privacy.html"),$isHovered:m==="privacy",onMouseEnter:()=>n("privacy"),onMouseLeave:()=>n(null),children:r("Privacy Policy")}),e.jsx(E,{href:c("support.html"),$isHovered:m==="support",onMouseEnter:()=>n("support"),onMouseLeave:()=>n(null),children:r("Support")})]})]})})]})},re=localStorage.getItem("preferred-language")||localStorage.getItem("user_language")||"en";A.createRoot(document.getElementById("root")).render(e.jsx(O,{initialLanguage:re,preloadLanguages:["en"],children:e.jsx(ee,{})}));
