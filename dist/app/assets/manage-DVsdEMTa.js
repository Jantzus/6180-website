import{d as f,R as _,j as s,I as ee,u as re,a as x,r as E,b as U,g as se}from"./utils-BJzWXlCI.js";import{u as ne}from"./utils-BdszLkTh.js";import"./types-DVf3Qveq.js";const R=r=>r/(1024*1024*1024),F=r=>{const g=r/1048576,a=r/(1024*1024*1024),d=r/(1024*1024*1024*1024);return d>=1?`${d.toFixed(1)} TB`:a>=1?`${a.toFixed(1)} GB`:`${Math.round(g)} MB`},N=r=>r<=1?10:r*10,G=r=>r===0?0:1+.75*(r-1),S=(r,g)=>r<=10?g<=5?0:1:Math.ceil(r/10),e={colors:{primary:"#007bff",primaryDark:"#0056b3",success:"#4caf50",danger:"#e53935",warning:"#ff9800",white:"#fff",text:{primary:"#333",secondary:"#666"},background:{primary:"#f9fafb",card:"#fff",highlight:"#f0f7ff"},border:"#ddd",grayLight:"#e0e0e0"},spacing:{sm:"8px",md:"16px",lg:"24px",xl:"32px"},borderRadius:{small:"4px",medium:"8px"},boxShadow:{sm:"0 1px 2px rgba(0,0,0,0.06)",md:"0 1px 3px rgba(0,0,0,0.1)",lg:"0 4px 10px rgba(0,0,0,0.08)"}},te=f.div`
  padding: ${e.spacing.md};
  background-color: ${e.colors.background.primary};
  min-height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  direction: ${r=>r.$isRTL?"rtl":"ltr"};
`,oe=f.button`
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
`,L=f.div`
  background-color: ${e.colors.background.card};
  border-radius: ${e.borderRadius.medium};
  box-shadow: ${e.boxShadow.md};
  padding: ${e.spacing.lg};
  margin-bottom: ${e.spacing.lg};
`,ie=f.h2`
  font-size: 18px;
  margin: 0 0 ${e.spacing.md} 0;
  color: ${e.colors.text.primary};
`,ae=f.div`
  background-color: ${e.colors.grayLight};
  border-radius: ${e.borderRadius.small};
  height: 20px;
  overflow: hidden;
  margin: ${e.spacing.md} 0;
`,ce=f.div`
  height: 100%;
  background-color: ${r=>r.$percentage>90?e.colors.danger:r.$percentage>75?e.colors.warning:e.colors.primary};
  width: ${r=>Math.min(r.$percentage,100)}%;
  transition: width 0.3s ease;
`,Y=f.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: ${e.colors.text.secondary};
`,le=f.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${e.spacing.md};
  margin-top: ${e.spacing.md};
`,de=f.div`
  border: 2px solid ${r=>r.$isInsufficient?e.colors.danger:r.$isSelected?e.colors.primary:e.colors.border};
  border-radius: ${e.borderRadius.medium};
  padding: ${e.spacing.md};
  cursor: ${r=>r.$isInsufficient?"not-allowed":"pointer"};
  transition: all 0.2s ease;
  background-color: ${r=>r.$isInsufficient?"#ffebee":r.$isSelected?e.colors.background.highlight:e.colors.white};
  opacity: ${r=>r.$isInsufficient?.7:1};
  position: relative;

  &:hover {
    border-color: ${r=>r.$isInsufficient?e.colors.danger:e.colors.primary};
  }
`,ue=f.h3`
  margin: 0 0 ${e.spacing.sm} 0;
  font-size: 16px;
  color: ${e.colors.text.primary};
`,ge=f.div`
  font-size: 18px;
  font-weight: bold;
  color: ${e.colors.primary};
  margin-bottom: ${e.spacing.sm};
`,pe=f.div`
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
`,I=f.button`
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
`,T=f.label`
  display: block;
  margin-bottom: ${e.spacing.sm};
  font-size: 14px;
  font-weight: 500;
  color: ${e.colors.text.primary};
`,k=f.input`
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
`,me=f.div`
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
`,xe=(r,g,a,d)=>{const t=x.useCallback(n=>{if(!r)return{canDowngrade:!1,reason:d("Loading subscription information...")};const c=N(n)*1024*1024*1024,l=g<=c;if(n===0){const p=a<=5;if(!l&&!p)return{canDowngrade:!1,reason:d("Insufficient storage and too many albums (max 5 for free)")};if(l){if(!p)return{canDowngrade:!1,reason:d("Too many albums (free tier allows max 5 albums)")}}else return{canDowngrade:!1,reason:d("Insufficient storage capacity")};return{canDowngrade:!0}}return{canDowngrade:l,reason:l?void 0:d("Insufficient storage capacity")}},[r,g,a,d]),i=x.useCallback(()=>{if(!r)return[];const n=r.intNumberOfSubscriptions,$=[],c=(p,h=!1)=>{const w=N(p),b=G(p),j=t(p);$.push({id:p,price:p===0?d("Free"):d("US${{price}} / month",{price:b.toFixed(2)}),subscriptions:p,storageGB:w,isInsufficient:!j.canDowngrade,isCurrent:h,insufficientReason:j.reason})};c(n,!0);const l=n+2;for(let p=n+1;p<=l;p++)c(p,!1);return $.sort((p,h)=>p.subscriptions-h.subscriptions)},[r,t,d]);return{canDowngrade:t,generatePlans:i}},he=({subscriptionInfo:r,calculatedBytesUsed:g,t:a})=>{if(!r)return s.jsx(L,{children:s.jsxs("div",{style:{textAlign:"center",padding:e.spacing.lg},children:[s.jsx(D,{}),s.jsx("span",{style:{marginLeft:e.spacing.sm,color:e.colors.text.secondary},children:a("Loading account information...")})]})});const d=N(r.intNumberOfSubscriptions),t=g/(d*1024*1024*1024)*100,i=G(r.intNumberOfSubscriptions);return s.jsxs(L,{children:[s.jsxs(Y,{children:[s.jsx("strong",{children:s.jsx("span",{children:F(d*1024*1024*1024)})}),s.jsx("span",{children:a("US${{price}} / month",{price:i.toFixed(2)})})]}),s.jsxs(Y,{children:[s.jsx("span",{children:a("Used: {{used}}",{used:F(g)})}),s.jsx("span",{children:a("Total: {{total}}",{total:F(d*1024*1024*1024)})})]}),s.jsx(ae,{children:s.jsx(ce,{$percentage:t})})]})},be=({customGB:r,onCustomGBChange:g,subscriptionInfo:a,calculatedBytesUsed:d,albumCount:t,t:i})=>{const n=()=>{if(!r||isNaN(parseFloat(r))||!a)return"";const c=parseFloat(r),l=a.intNumberOfSubscriptions;if(c<=0)return s.jsx("span",{style:{color:e.colors.danger},children:i("Please enter a positive number")});if(c<10)return S(10,t)===l?s.jsx("span",{style:{color:e.colors.text.secondary},children:i("Current Plan")}):s.jsx("span",{style:{color:e.colors.warning},children:i("Minimum: 10 GB")});const p=R(d);if(c<p)return s.jsx("span",{style:{color:e.colors.danger,fontWeight:"bold"},children:i("Error: You are using {{used}}",{used:F(d)})});const h=S(c,t),w=N(h),b=G(h);return h===l?s.jsx("span",{style:{color:e.colors.text.secondary},children:i("Current Plan")}):h===0?s.jsx("span",{style:{color:e.colors.success,fontWeight:"bold"},children:i("10 GB - Free")}):s.jsx("span",{style:{color:e.colors.primary,fontWeight:"bold"},children:i("{{gb}} GB - US${{price}} / month",{gb:w,price:b.toFixed(2)})})},$=r&&!isNaN(parseFloat(r))&&a&&parseFloat(r)<R(d);return s.jsxs("div",{style:{marginTop:e.spacing.lg},children:[s.jsx(T,{style:{fontWeight:"bold"},children:i("Number of GB Needed:")}),s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:e.spacing.sm,marginTop:e.spacing.sm},children:[s.jsx(k,{type:"number",min:"1",step:"1",inputMode:"numeric",placeholder:i("e.g. 50"),value:r,onChange:c=>g(c.target.value),style:{width:"120px",borderColor:$?e.colors.danger:e.colors.border}}),s.jsx("span",{style:{fontSize:"14px",color:e.colors.text.secondary,minWidth:"200px"},children:n()})]}),$&&s.jsx("div",{style:{marginTop:e.spacing.sm,padding:e.spacing.sm,backgroundColor:"#ffebee",borderRadius:e.borderRadius.small,border:`1px solid ${e.colors.danger}`,fontSize:"12px",color:e.colors.danger},children:i("This capacity is insufficient for your current usage. Please select a larger capacity or delete some files first.")})]})},ye=({plans:r,selectedTier:g,isPlanSelected:a,customGB:d,onPlanSelect:t,t:i})=>s.jsx(le,{children:r.map(n=>s.jsxs(de,{$isSelected:a&&g===n.subscriptions&&!d&&!n.isInsufficient,$isInsufficient:n.isInsufficient,onClick:()=>t(n),children:[s.jsxs(ue,{children:[i("{{gb}} GB",{gb:n.storageGB}),n.subscriptions===0&&s.jsxs("span",{style:{marginLeft:"8px",fontSize:"12px",color:e.colors.text.secondary,fontWeight:"normal"},children:["(",i("Max 5 albums"),")"]}),n.isCurrent&&s.jsxs("span",{style:{marginLeft:"8px",fontSize:"12px",color:e.colors.primary,fontWeight:"normal"},children:["(",i("Current"),")"]})]}),s.jsx(ge,{style:{color:n.isInsufficient?e.colors.text.secondary:e.colors.primary},children:n.price}),n.isInsufficient&&s.jsxs(s.Fragment,{children:[s.jsx("div",{style:{fontSize:"12px",color:e.colors.danger,fontWeight:"bold",marginTop:"8px"},children:n.insufficientReason||i("Insufficient Capacity")}),s.jsx(pe,{children:"⚠️"})]})]},n.id))}),$e=({showStripe:r,paymentData:g,loading:a,selectedTier:d,customGB:t,albumCount:i,onClose:n,onSubmit:$,onInputChange:c,t:l})=>{if(!r)return null;const p=t&&!isNaN(parseFloat(t))?S(parseFloat(t),i):d,h=N(p),w=G(p);return s.jsxs(s.Fragment,{children:[s.jsx(fe,{onClick:()=>!a&&n()}),s.jsxs(me,{children:[s.jsx("div",{style:{textAlign:"center",marginBottom:e.spacing.lg},children:s.jsx("h3",{style:{margin:0,marginBottom:e.spacing.sm},children:l("{{gb}} GB - US${{price}} / month",{gb:h,price:w.toFixed(2)})})}),s.jsxs("div",{children:[s.jsxs(B,{children:[s.jsx(T,{children:l("Card Number")}),s.jsx(k,{type:"text",placeholder:l("1234 5678 9012 3456"),value:g.cardNumber,onChange:b=>c("cardNumber",b.target.value),required:!0,disabled:a})]}),s.jsxs("div",{style:{display:"flex",gap:e.spacing.md},children:[s.jsxs(B,{style:{flex:1},children:[s.jsx(T,{children:l("Expiry Date")}),s.jsx(k,{type:"text",placeholder:l("MM/YY"),value:g.expiryDate,onChange:b=>c("expiryDate",b.target.value),required:!0,disabled:a})]}),s.jsxs(B,{style:{flex:1},children:[s.jsx(T,{children:l("CVC")}),s.jsx(k,{type:"text",placeholder:l("123"),value:g.cvc,onChange:b=>c("cvc",b.target.value),required:!0,disabled:a})]})]}),s.jsxs(B,{children:[s.jsx(T,{children:l("Cardholder Name")}),s.jsx(k,{type:"text",placeholder:l("John Doe"),value:g.name,onChange:b=>c("name",b.target.value),required:!0,disabled:a})]}),s.jsxs("div",{style:{textAlign:"center",marginTop:e.spacing.lg},children:[s.jsxs(I,{onClick:$,disabled:a||!g.cardNumber||!g.expiryDate||!g.cvc||!g.name,children:[a&&s.jsx(D,{}),l(a?"Processing...":"Pay")]}),s.jsx(I,{variant:"secondary",onClick:n,disabled:a,children:l("Cancel")})]})]}),s.jsx("div",{style:{marginTop:e.spacing.lg,padding:e.spacing.md,backgroundColor:e.colors.background.primary,borderRadius:e.borderRadius.small,textAlign:"center",fontSize:"12px",color:e.colors.text.secondary},children:l("🔒 Demo payment - no real charges")})]})]})},je=()=>{const{t:r,language:g}=re(),a=se(g)==="rtl",{folders:d,subscriptionInfo:t,calculatedBytesUsed:i}=ne(o=>console.log(o)),n=d.length,$=t!==null,[c,l]=x.useState((t==null?void 0:t.intNumberOfSubscriptions)||0),[p,h]=x.useState(!1),[w,b]=x.useState(!1),[j,C]=x.useState(!1),[m,P]=x.useState(""),[v,q]=x.useState({cardNumber:"",expiryDate:"",cvc:"",name:""}),{canDowngrade:O,generatePlans:A}=xe(t,i,n,r),M=x.useMemo(()=>$?A():[],[$,A]),V=x.useCallback(o=>{P(o);const u=parseFloat(o);if(o&&!isNaN(u)&&u>0){const y=S(Math.max(u,10),n);l(y),h(!1)}else o||(l((t==null?void 0:t.intNumberOfSubscriptions)||0),h(!1))},[t,n]),J=x.useCallback(o=>{o.isInsufficient||(l(o.subscriptions),P(""),h(!0))},[]),W=x.useCallback(()=>{C(!0),setTimeout(()=>{l(0),P(""),h(!1),C(!1),alert(r("Successfully downgraded to free plan."))},2e3)},[r]),H=x.useCallback(()=>{if(!t)return;let o;if(m&&!isNaN(parseFloat(m))){const y=parseFloat(m);if(y<=0){alert(r("Please enter a positive number"));return}if(y<10){alert(r("Minimum storage capacity is 10 GB"));return}o=S(y,n)}else o=c;if(o===t.intNumberOfSubscriptions)return;const u=O(o);if(!u.canDowngrade){alert(u.reason||r("Cannot select this plan"));return}o===0?window.confirm(r("Are you sure you want to downgrade to the free plan?"))&&W():b(!0)},[t,m,c,n,O,W,r]),K=x.useCallback(()=>{if(!v.cardNumber||!v.expiryDate||!v.cvc||!v.name){alert(r("Please fill in all payment fields."));return}C(!0);let o;if(m&&!isNaN(parseFloat(m))){const u=parseFloat(m);if(u<10){alert(r("Minimum storage capacity is 10 GB")),C(!1);return}o=S(u,n)}else o=c;setTimeout(()=>{console.log("Would update subscription to tier:",o),C(!1),b(!1),P(""),h(!1),alert(r("Payment successful! Your subscription has been updated.")),setTimeout(()=>{E(U("my-albums.html"))},1500)},3e3)},[v,m,c,n,r]),Q=x.useCallback((o,u)=>{let y=u;o==="cardNumber"&&(y=u.replace(/\s/g,"").replace(/(.{4})/g,"$1 ").trim().substring(0,19)),o==="expiryDate"&&(y=u.replace(/\D/g,"").replace(/(\d{2})(\d)/,"$1/$2").substring(0,5)),o==="cvc"&&(y=u.replace(/\D/g,"").substring(0,4)),q(z=>({...z,[o]:y}))},[]),X=x.useCallback(()=>{if(!t)return r("Change Plan");const o=t.intNumberOfSubscriptions;let u;if(m&&!isNaN(parseFloat(m))){const y=parseFloat(m);if(y<R(i))return r("Change Plan");u=S(Math.max(y,10),n)}else u=c;return u===o?r("Current Plan"):u>o?r("Upgrade"):r(u===0?"Downgrade To Free":"Change Plan")},[t,m,c,i,n,r]),Z=x.useMemo(()=>{var o;if(!t)return!0;if(m&&!isNaN(parseFloat(m))){const u=parseFloat(m);if(u<=0)return!0;const y=S(Math.max(u,10),n),z=t.intNumberOfSubscriptions;if(y===z||u<R(i))return!0}return!p&&!m||c===t.intNumberOfSubscriptions&&!m||j||!!(m&&(isNaN(parseFloat(m))||parseFloat(m)<=0))||!!((o=M.find(u=>u.subscriptions===c))!=null&&o.isInsufficient)},[t,p,m,c,j,M,i,n]);return s.jsxs(te,{$isRTL:a,children:[s.jsx("div",{style:{marginBottom:e.spacing.md,textAlign:"right"},children:s.jsx(oe,{onClick:()=>E(U("my-albums.html")),children:r("← Back To Albums")})}),s.jsx(he,{subscriptionInfo:t,calculatedBytesUsed:i,t:r}),s.jsxs(L,{children:[s.jsx(ie,{children:r("Select Storage Capacity")}),s.jsx("div",{style:{fontSize:"14px",color:e.colors.text.secondary,marginBottom:e.spacing.md,fontStyle:"italic"},children:r("Paid tiers have unlimited albums and are limited only by storage")}),$?s.jsxs(s.Fragment,{children:[s.jsx(ye,{plans:M,selectedTier:c,isPlanSelected:p,customGB:m,onPlanSelect:J,t:r}),s.jsx(be,{customGB:m,onCustomGBChange:V,subscriptionInfo:t,calculatedBytesUsed:i,albumCount:n,t:r}),s.jsx("div",{style:{marginTop:e.spacing.lg,textAlign:"center"},children:s.jsxs(I,{onClick:H,disabled:Z,children:[j&&s.jsx(D,{}),X()]})})]}):s.jsxs("div",{style:{textAlign:"center",padding:e.spacing.lg},children:[s.jsx(D,{}),s.jsx("span",{style:{marginLeft:e.spacing.sm,color:e.colors.text.secondary},children:r("Loading subscription plans...")})]})]}),s.jsx($e,{showStripe:w,paymentData:v,loading:j,selectedTier:c,customGB:m,albumCount:n,onClose:()=>b(!1),onSubmit:K,onInputChange:Q,t:r})]})},Se=()=>s.jsx(ee,{children:s.jsx(je,{})});_.createRoot(document.getElementById("root")).render(s.jsx(Se,{}));
