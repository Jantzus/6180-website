import{d as s,R as $,j as e,I as S,a,u as R,K as C,r as L,b as i,g as M}from"./utils-CuQXS0Z6.js";import{G as P,A as I,c as _,d as f,B as N,C as D}from"./styled-components-D8vdsHoZ.js";const F=s(D)`
  max-width: 400px;
  width: 100%;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.06);
  text-align: center;
`,O=s.img`
  height: 60px;
  margin-bottom: 16px;
`,y=s.div`
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
`,U=s.div`
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
`,A=s.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  padding: 20px;
`,B=s.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`,G=C,H=()=>{const[t,c]=a.useState("loading"),[E,u]=a.useState(""),[p,o]=a.useState(null),{t:r,language:m,loading:b}=R(),h=M(m)==="rtl";a.useEffect(()=>{document.documentElement.lang=m,document.documentElement.dir=h?"rtl":"ltr"},[m,h]),a.useEffect(()=>{const d=new URLSearchParams(window.location.search),l=d.get("token"),n=d.get("redirect")||"/home";if(!l){c("error"),u(r("No login token provided"));return}v(l,n)},[r]);const v=async(d,l)=>{try{c("loading");const n=await fetch(`${G}?token=${encodeURIComponent(d)}`,{method:"GET",credentials:"include",headers:{"Content-Type":"application/json"}}),j=await n.json();if(!n.ok)throw new Error(j.error||"Token redemption failed");const g=j;if(g.success){c("redirecting");const x=new URL(window.location.href);x.searchParams.delete("token"),x.searchParams.delete("redirect"),window.history.replaceState({},"",x.pathname),g.userSub;const T=g.redirect||l;setTimeout(()=>{L(T)},1e3)}else throw new Error(g.message||"Login failed")}catch(n){console.error("Token redemption error:",n),c("error"),n instanceof Error?u(n.message):u(r("An unexpected error occurred during login"))}},w=()=>{L(i("login.html"))};if(b)return e.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"},children:r("Loading...")});const k=()=>{switch(t){case"loading":return e.jsxs(e.Fragment,{children:[e.jsx(U,{}),e.jsx(y,{$type:"loading",children:r("Logging you in...")})]});case"success":case"redirecting":return e.jsx(y,{$type:"success",children:r("Login successful! Redirecting...")});case"error":return e.jsxs(e.Fragment,{children:[e.jsx(y,{$type:"error",children:E||r("Login failed")}),e.jsx(N,{$primary:!0,onClick:w,style:{width:"100%",padding:"12px",fontSize:"16px"},children:r("Go to Login Page")})]});default:return null}};return e.jsxs(e.Fragment,{children:[e.jsx(P,{}),e.jsx(I,{$isRTL:h,children:e.jsxs(A,{children:[e.jsx(B,{children:e.jsxs(F,{children:[e.jsx(O,{src:i("images/logo_no_background.png"),alt:"6180 Logo"}),k()]})}),e.jsxs(_,{children:[e.jsx(f,{href:i("terms.html"),$isHovered:p==="terms",onMouseEnter:()=>o("terms"),onMouseLeave:()=>o(null),children:r("Terms of Service")}),e.jsx(f,{href:i("privacy.html"),$isHovered:p==="privacy",onMouseEnter:()=>o("privacy"),onMouseLeave:()=>o(null),children:r("Privacy Policy")}),e.jsx(f,{href:i("support.html"),$isHovered:p==="support",onMouseEnter:()=>o("support"),onMouseLeave:()=>o(null),children:r("Support")})]})]})})]})},K=localStorage.getItem("preferred-language")||localStorage.getItem("user_language")||"en";$.createRoot(document.getElementById("root")).render(e.jsx(S,{initialLanguage:K,preloadLanguages:["en"],children:e.jsx(H,{})}));
