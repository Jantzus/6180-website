import{d as f,R as Z,j as s,I as _,u as ee,r as h,a as I,b as W,g as re}from"./utils-BHKWecq1.js";import{u as se}from"./utils-BPrgj0Sg.js";import"./types-DVf3Qveq.js";const F=r=>r/(1024*1024*1024),P=r=>{const c=r/1048576,n=r/(1024*1024*1024),m=r/(1024*1024*1024*1024);return m>=1?`${m.toFixed(1)} TB`:n>=1?`${n.toFixed(1)} GB`:`${Math.round(c)} MB`},k=r=>r<=1?10:r*10,G=r=>r===0?0:1+.75*(r-1),S=(r,c)=>r<=10?c<=5?0:1:Math.ceil(r/10),e={colors:{primary:"#007bff",primaryDark:"#0056b3",success:"#4caf50",danger:"#e53935",warning:"#ff9800",white:"#fff",text:{primary:"#333",secondary:"#666"},background:{primary:"#f9fafb",card:"#fff",highlight:"#f0f7ff"},border:"#ddd",grayLight:"#e0e0e0"},spacing:{sm:"8px",md:"16px",lg:"24px",xl:"32px"},borderRadius:{small:"4px",medium:"8px"},boxShadow:{sm:"0 1px 2px rgba(0,0,0,0.06)",md:"0 1px 3px rgba(0,0,0,0.1)",lg:"0 4px 10px rgba(0,0,0,0.08)"}},te=f.div`
  padding: ${e.spacing.md};
  background-color: ${e.colors.background.primary};
  min-height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  direction: ${r=>r.isRTL?"rtl":"ltr"};
`,ne=f.button`
  background: transparent;
  border: 1px solid ${e.colors.primary};
  color: ${e.colors.primary};
  padding: 8px 16px;
  border-radius: ${e.borderRadius.medium};
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${e.colors.primary};
    color: ${e.colors.white};
  }
`,O=f.div`
  background-color: ${e.colors.background.card};
  border-radius: ${e.borderRadius.medium};
  box-shadow: ${e.boxShadow.md};
  padding: ${e.spacing.lg};
  margin-bottom: ${e.spacing.lg};
`,oe=f.h2`
  font-size: 18px;
  margin: 0 0 ${e.spacing.md} 0;
  color: ${e.colors.text.primary};
`,ae=f.div`
  background-color: ${e.colors.grayLight};
  border-radius: ${e.borderRadius.small};
  height: 20px;
  overflow: hidden;
  margin: ${e.spacing.md} 0;
`,ie=f.div`
  height: 100%;
  background-color: ${r=>r.percentage>90?e.colors.danger:r.percentage>75?e.colors.warning:e.colors.primary};
  width: ${r=>Math.min(r.percentage,100)}%;
  transition: width 0.3s ease;
`,E=f.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: ${e.colors.text.secondary};
`,ce=f.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${e.spacing.md};
  margin-top: ${e.spacing.md};
`,le=f.div`
  border: 2px solid ${r=>r.isInsufficient?e.colors.danger:r.isSelected?e.colors.primary:e.colors.border};
  border-radius: ${e.borderRadius.medium};
  padding: ${e.spacing.md};
  cursor: ${r=>r.isInsufficient?"not-allowed":"pointer"};
  transition: all 0.2s ease;
  background-color: ${r=>r.isInsufficient?"#ffebee":r.isSelected?e.colors.background.highlight:e.colors.white};
  opacity: ${r=>r.isInsufficient?.7:1};
  position: relative;

  &:hover {
    border-color: ${r=>r.isInsufficient?e.colors.danger:e.colors.primary};
  }
`,de=f.h3`
  margin: 0 0 ${e.spacing.sm} 0;
  font-size: 16px;
  color: ${e.colors.text.primary};
`,ue=f.div`
  font-size: 18px;
  font-weight: bold;
  color: ${e.colors.primary};
  margin-bottom: ${e.spacing.sm};
`,ge=f.div`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: ${e.colors.danger};
  color: white;
  font-size: 10px;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 12px;
  white-space: nowrap;
  box-shadow: ${e.boxShadow.sm};
`,z=f.button`
  background-color: ${r=>r.variant==="danger"?e.colors.danger:r.variant==="secondary"?"transparent":e.colors.primary};
  color: ${r=>r.variant==="secondary"?e.colors.primary:e.colors.white};
  border: ${r=>r.variant==="secondary"?`1px solid ${e.colors.primary}`:"none"};
  padding: 12px 24px;
  border-radius: ${e.borderRadius.medium};
  cursor: ${r=>r.disabled?"not-allowed":"pointer"};
  font-size: 16px;
  font-weight: 500;
  transition: all 0.2s ease;
  opacity: ${r=>r.disabled?.6:1};
  margin-right: ${e.spacing.sm};

  &:hover:not(:disabled) {
    background-color: ${r=>r.variant==="danger"?"#c62828":r.variant==="secondary"?e.colors.background.highlight:e.colors.primaryDark};
  }
`,D=f.div`
  border: 2px solid ${e.colors.grayLight};
  border-top: 2px solid ${e.colors.primary};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  display: inline-block;
  margin-right: ${e.spacing.sm};

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`,B=f.div`
  margin-bottom: ${e.spacing.md};
`,C=f.label`
  display: block;
  margin-bottom: ${e.spacing.sm};
  font-size: 14px;
  font-weight: 500;
  color: ${e.colors.text.primary};
`,T=f.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${e.colors.border};
  border-radius: ${e.borderRadius.small};
  font-size: 16px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${e.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`,pe=f.div`
  background-color: ${e.colors.white};
  border-radius: ${e.borderRadius.medium};
  box-shadow: ${e.boxShadow.lg};
  padding: ${e.spacing.xl};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  min-width: 400px;
  max-width: 90vw;
`,fe=f.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
`,me=(r,c,n)=>{const m=h.useCallback(i=>{if(!r)return{canDowngrade:!1,reason:n("Loading subscription information...")};const u=k(i)*1024*1024*1024,p=r.bytesOfDataUsed<=u;if(i===0){const o=c<=5;if(!p&&!o)return{canDowngrade:!1,reason:n("Insufficient storage and too many albums (max 5 for free)")};if(p){if(!o)return{canDowngrade:!1,reason:n("Too many albums (free tier allows max 5 albums)")}}else return{canDowngrade:!1,reason:n("Insufficient storage capacity")};return{canDowngrade:!0}}return{canDowngrade:p,reason:p?void 0:n("Insufficient storage capacity")}},[r,c,n]),t=h.useCallback(()=>{if(!r)return[];const i=r.intNumberOfSubscriptions,l=[],u=(o,x=!1)=>{const $=k(o),j=G(o),b=m(o);l.push({id:o,price:o===0?n("Free"):n("US${{price}} / month",{price:j.toFixed(2)}),subscriptions:o,storageGB:$,isInsufficient:!b.canDowngrade,isCurrent:x,insufficientReason:b.reason})};u(i,!0);const p=i+2;for(let o=i+1;o<=p;o++)u(o,!1);return l.sort((o,x)=>o.subscriptions-x.subscriptions)},[r,m,n]);return{canDowngrade:m,generatePlans:t}},xe=({subscriptionInfo:r,t:c})=>{if(!r)return s.jsx(O,{children:s.jsxs("div",{style:{textAlign:"center",padding:e.spacing.lg},children:[s.jsx(D,{}),s.jsx("span",{style:{marginLeft:e.spacing.sm,color:e.colors.text.secondary},children:c("Loading account information...")})]})});const n=k(r.intNumberOfSubscriptions),m=r.bytesOfDataUsed/(n*1024*1024*1024)*100,t=G(r.intNumberOfSubscriptions);return s.jsxs(O,{children:[s.jsxs(E,{children:[s.jsx("strong",{children:s.jsx("span",{children:P(n*1024*1024*1024)})}),s.jsx("span",{children:c("US${{price}} / month",{price:t.toFixed(2)})})]}),s.jsxs(E,{children:[s.jsx("span",{children:c("Used: {{used}}",{used:P(r.bytesOfDataUsed)})}),s.jsx("span",{children:c("Total: {{total}}",{total:P(n*1024*1024*1024)})})]}),s.jsx(ae,{children:s.jsx(ie,{percentage:m})})]})},he=({customGB:r,onCustomGBChange:c,subscriptionInfo:n,albumCount:m,t})=>{const i=()=>{if(!r||isNaN(parseFloat(r))||!n)return"";const u=parseFloat(r),p=n.intNumberOfSubscriptions;if(u<=0)return s.jsx("span",{style:{color:e.colors.danger},children:t("Please enter a positive number")});if(u<10)return S(10,m)===p?s.jsx("span",{style:{color:e.colors.text.secondary},children:t("Current Plan")}):s.jsx("span",{style:{color:e.colors.warning},children:t("Minimum: 10 GB")});const o=F(n.bytesOfDataUsed);if(u<o)return s.jsx("span",{style:{color:e.colors.danger,fontWeight:"bold"},children:t("Error: You are using {{used}}",{used:P(n.bytesOfDataUsed)})});const x=S(u,m),$=k(x),j=G(x);return x===p?s.jsx("span",{style:{color:e.colors.text.secondary},children:t("Current Plan")}):x===0?s.jsx("span",{style:{color:e.colors.success,fontWeight:"bold"},children:t("10 GB - Free")}):s.jsx("span",{style:{color:e.colors.primary,fontWeight:"bold"},children:t("{{gb}} GB - US${{price}} / month",{gb:$,price:j.toFixed(2)})})},l=r&&!isNaN(parseFloat(r))&&n&&parseFloat(r)<F(n.bytesOfDataUsed);return s.jsxs("div",{style:{marginTop:e.spacing.lg},children:[s.jsx(C,{style:{fontWeight:"bold"},children:t("Number of GB Needed:")}),s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:e.spacing.sm,marginTop:e.spacing.sm},children:[s.jsx(T,{type:"number",min:"1",step:"1",inputMode:"numeric",placeholder:t("e.g. 50"),value:r,onChange:u=>c(u.target.value),style:{width:"120px",borderColor:l?e.colors.danger:e.colors.border}}),s.jsx("span",{style:{fontSize:"14px",color:e.colors.text.secondary,minWidth:"200px"},children:i()})]}),l&&s.jsx("div",{style:{marginTop:e.spacing.sm,padding:e.spacing.sm,backgroundColor:"#ffebee",borderRadius:e.borderRadius.small,border:`1px solid ${e.colors.danger}`,fontSize:"12px",color:e.colors.danger},children:t("This capacity is insufficient for your current usage. Please select a larger capacity or delete some files first.")})]})},be=({plans:r,selectedTier:c,isPlanSelected:n,customGB:m,onPlanSelect:t,t:i})=>s.jsx(ce,{children:r.map(l=>s.jsxs(le,{isSelected:n&&c===l.subscriptions&&!m&&!l.isInsufficient,isInsufficient:l.isInsufficient,onClick:()=>t(l),children:[s.jsxs(de,{children:[i("{{gb}} GB",{gb:l.storageGB}),l.subscriptions===0&&s.jsxs("span",{style:{marginLeft:"8px",fontSize:"12px",color:e.colors.text.secondary,fontWeight:"normal"},children:["(",i("Max 5 albums"),")"]}),l.isCurrent&&s.jsxs("span",{style:{marginLeft:"8px",fontSize:"12px",color:e.colors.primary,fontWeight:"normal"},children:["(",i("Current"),")"]})]}),s.jsx(ue,{style:{color:l.isInsufficient?e.colors.text.secondary:e.colors.primary},children:l.price}),l.isInsufficient&&s.jsxs(s.Fragment,{children:[s.jsx("div",{style:{fontSize:"12px",color:e.colors.danger,fontWeight:"bold",marginTop:"8px"},children:l.insufficientReason||i("Insufficient Capacity")}),s.jsx(ge,{children:"⚠️"})]})]},l.id))}),ye=({showStripe:r,paymentData:c,loading:n,selectedTier:m,customGB:t,albumCount:i,onClose:l,onSubmit:u,onInputChange:p,t:o})=>{if(!r)return null;const x=t&&!isNaN(parseFloat(t))?S(parseFloat(t),i):m,$=k(x),j=G(x);return s.jsxs(s.Fragment,{children:[s.jsx(fe,{onClick:()=>!n&&l()}),s.jsxs(pe,{children:[s.jsx("div",{style:{textAlign:"center",marginBottom:e.spacing.lg},children:s.jsx("h3",{style:{margin:0,marginBottom:e.spacing.sm},children:o("{{gb}} GB - US${{price}} / month",{gb:$,price:j.toFixed(2)})})}),s.jsxs("div",{children:[s.jsxs(B,{children:[s.jsx(C,{children:o("Card Number")}),s.jsx(T,{type:"text",placeholder:o("1234 5678 9012 3456"),value:c.cardNumber,onChange:b=>p("cardNumber",b.target.value),required:!0,disabled:n})]}),s.jsxs("div",{style:{display:"flex",gap:e.spacing.md},children:[s.jsxs(B,{style:{flex:1},children:[s.jsx(C,{children:o("Expiry Date")}),s.jsx(T,{type:"text",placeholder:o("MM/YY"),value:c.expiryDate,onChange:b=>p("expiryDate",b.target.value),required:!0,disabled:n})]}),s.jsxs(B,{style:{flex:1},children:[s.jsx(C,{children:o("CVC")}),s.jsx(T,{type:"text",placeholder:o("123"),value:c.cvc,onChange:b=>p("cvc",b.target.value),required:!0,disabled:n})]})]}),s.jsxs(B,{children:[s.jsx(C,{children:o("Cardholder Name")}),s.jsx(T,{type:"text",placeholder:o("John Doe"),value:c.name,onChange:b=>p("name",b.target.value),required:!0,disabled:n})]}),s.jsxs("div",{style:{textAlign:"center",marginTop:e.spacing.lg},children:[s.jsxs(z,{onClick:u,disabled:n||!c.cardNumber||!c.expiryDate||!c.cvc||!c.name,children:[n&&s.jsx(D,{}),o(n?"Processing...":"Pay")]}),s.jsx(z,{variant:"secondary",onClick:l,disabled:n,children:o("Cancel")})]})]}),s.jsx("div",{style:{marginTop:e.spacing.lg,padding:e.spacing.md,backgroundColor:e.colors.background.primary,borderRadius:e.borderRadius.small,textAlign:"center",fontSize:"12px",color:e.colors.text.secondary},children:o("🔒 Demo payment - no real charges")})]})]})},je=()=>{const{t:r,language:c}=ee(),n=re(c)==="rtl",{folders:m,subscriptionInfo:t}=se(a=>console.log(a)),i=m.length,l=t!==null,[u,p]=h.useState((t==null?void 0:t.intNumberOfSubscriptions)||0),[o,x]=h.useState(!1),[$,j]=h.useState(!1),[b,v]=h.useState(!1),[g,N]=h.useState(""),[w,Y]=h.useState({cardNumber:"",expiryDate:"",cvc:"",name:""}),{canDowngrade:L,generatePlans:U}=me(t,i,r),R=h.useMemo(()=>l?U():[],[l,U]),q=h.useCallback(a=>{N(a);const d=parseFloat(a);if(a&&!isNaN(d)&&d>0){const y=S(Math.max(d,10),i);p(y),x(!1)}else a||(p((t==null?void 0:t.intNumberOfSubscriptions)||0),x(!1))},[t,i]),V=h.useCallback(a=>{a.isInsufficient||(p(a.subscriptions),N(""),x(!0))},[]),A=h.useCallback(()=>{v(!0),setTimeout(()=>{p(0),N(""),x(!1),v(!1),alert(r("Successfully downgraded to free plan."))},2e3)},[r]),J=h.useCallback(()=>{if(!t)return;let a;if(g&&!isNaN(parseFloat(g))){const y=parseFloat(g);if(y<=0){alert(r("Please enter a positive number"));return}if(y<10){alert(r("Minimum storage capacity is 10 GB"));return}a=S(y,i)}else a=u;if(a===t.intNumberOfSubscriptions)return;const d=L(a);if(!d.canDowngrade){alert(d.reason||r("Cannot select this plan"));return}a===0?window.confirm(r("Are you sure you want to downgrade to the free plan?"))&&A():j(!0)},[t,g,u,i,L,A,r]),H=h.useCallback(()=>{if(!w.cardNumber||!w.expiryDate||!w.cvc||!w.name){alert(r("Please fill in all payment fields."));return}v(!0);let a;if(g&&!isNaN(parseFloat(g))){const d=parseFloat(g);if(d<10){alert(r("Minimum storage capacity is 10 GB")),v(!1);return}a=S(d,i)}else a=u;setTimeout(()=>{console.log("Would update subscription to tier:",a),v(!1),j(!1),N(""),x(!1),alert(r("Payment successful! Your subscription has been updated.")),setTimeout(()=>{I(W("my-albums.html"))},1500)},3e3)},[w,g,u,i,r]),K=h.useCallback((a,d)=>{let y=d;a==="cardNumber"&&(y=d.replace(/\s/g,"").replace(/(.{4})/g,"$1 ").trim().substring(0,19)),a==="expiryDate"&&(y=d.replace(/\D/g,"").replace(/(\d{2})(\d)/,"$1/$2").substring(0,5)),a==="cvc"&&(y=d.replace(/\D/g,"").substring(0,4)),Y(M=>({...M,[a]:y}))},[]),Q=h.useCallback(()=>{if(!t)return r("Change Plan");const a=t.intNumberOfSubscriptions;let d;if(g&&!isNaN(parseFloat(g))){const y=parseFloat(g);if(y<F(t.bytesOfDataUsed))return r("Change Plan");d=S(Math.max(y,10),i)}else d=u;return d===a?r("Current Plan"):d>a?r("Upgrade"):r(d===0?"Downgrade To Free":"Change Plan")},[t,g,u,i,r]),X=h.useMemo(()=>{var a;if(!t)return!0;if(g&&!isNaN(parseFloat(g))){const d=parseFloat(g);if(d<=0)return!0;const y=S(Math.max(d,10),i),M=t.intNumberOfSubscriptions;if(y===M||d<F(t.bytesOfDataUsed))return!0}return!o&&!g||u===t.intNumberOfSubscriptions&&!g||b||!!(g&&(isNaN(parseFloat(g))||parseFloat(g)<=0))||!!((a=R.find(d=>d.subscriptions===u))!=null&&a.isInsufficient)},[t,o,g,u,b,R,i]);return s.jsxs(te,{isRTL:n,children:[s.jsx("div",{style:{marginBottom:e.spacing.md,textAlign:"right"},children:s.jsx(ne,{onClick:()=>I(W("my-albums.html")),children:r("← Back To Albums")})}),s.jsx(xe,{subscriptionInfo:t,t:r}),s.jsxs(O,{children:[s.jsx(oe,{children:r("Select Storage Capacity")}),l?s.jsxs(s.Fragment,{children:[s.jsx(be,{plans:R,selectedTier:u,isPlanSelected:o,customGB:g,onPlanSelect:V,t:r}),s.jsx(he,{customGB:g,onCustomGBChange:q,subscriptionInfo:t,albumCount:i,t:r}),s.jsx("div",{style:{marginTop:e.spacing.lg,textAlign:"center"},children:s.jsxs(z,{onClick:J,disabled:X,children:[b&&s.jsx(D,{}),Q()]})})]}):s.jsxs("div",{style:{textAlign:"center",padding:e.spacing.lg},children:[s.jsx(D,{}),s.jsx("span",{style:{marginLeft:e.spacing.sm,color:e.colors.text.secondary},children:r("Loading subscription plans...")})]})]}),s.jsx(ye,{showStripe:$,paymentData:w,loading:b,selectedTier:u,customGB:g,albumCount:i,onClose:()=>j(!1),onSubmit:H,onInputChange:K,t:r})]})},Se=()=>s.jsx(_,{children:s.jsx(je,{})});Z.createRoot(document.getElementById("root")).render(s.jsx(Se,{}));
