import{d as h,R as oe,j as t,I as ie,u as se,a as f,r as q,b as V,g as ae,w as ce}from"./utils-BzOvwzP3.js";import{u as le}from"./utils-ClLP-QFl.js";import"./types-DVf3Qveq.js";class D{static initializeStripe(s){return console.log("Initializing Stripe with key:",s),Promise.resolve({elements:()=>({create:(n,c)=>({mount:o=>console.log(`Mounting ${n} to ${o}`),unmount:()=>console.log("Unmounting element"),on:(o,d)=>console.log(`Event listener added for ${o}`),clear:()=>console.log("Element cleared")})}),confirmPayment:n=>Promise.resolve({error:null,paymentIntent:{status:"succeeded"}}),confirmAlipayPayment:(n,c)=>Promise.resolve({error:null}),confirmWechatPayPayment:(n,c)=>Promise.resolve({error:null})})}static async createPaymentIntent(s,n="usd",c=["card"]){return console.log("Creating payment intent:",{amount:s,currency:n,paymentMethodTypes:c}),Promise.resolve({clientSecret:`pi_mock_${Date.now()}_secret_mock`,id:`pi_mock_${Date.now()}`})}static async createSetupIntent(s){return console.log("Creating setup intent for customer:",s),Promise.resolve({clientSecret:`seti_mock_${Date.now()}_secret_mock`})}static async updateSubscription(s,n,c="create_prorations"){return console.log("Updating subscription:",{subscriptionId:s,newPriceId:n,prorationBehavior:c}),Promise.resolve({id:s,status:"active",current_period_end:Math.floor(Date.now()/1e3)+30*24*60*60})}static async cancelSubscription(s,n=!0){return console.log("Canceling subscription:",{subscriptionId:s,at_period_end:n}),Promise.resolve({id:s,status:n?"active":"canceled",cancel_at_period_end:n})}static async getPaymentMethods(s){return console.log("Getting payment methods for customer:",s),Promise.resolve([])}static async calculateProRata(s,n,c){console.log("Calculating pro-rata:",{currentPriceId:s,newPriceId:n,subscriptionId:c});const o=parseFloat(s)||1.75,d=parseFloat(n)||2.5,a=15,b=30,u=o/b*a,m=d/b*a,i=m-u;return Promise.resolve({currentMonthlyPrice:o,newMonthlyPrice:d,daysRemainingInCycle:a,totalDaysInCycle:b,proRataCredit:u,proRataCharge:m,netAmount:Math.max(0,i)})}}const A=r=>r/(1024*1024*1024),G=r=>{const s=r/1048576,n=r/(1024*1024*1024),c=r/(1024*1024*1024*1024);return c>=1?`${c.toFixed(1)} TB`:n>=1?`${n.toFixed(1)} GB`:`${Math.round(s)} MB`},F=r=>r<=1?10:r*10,_=r=>r===0?0:1+.75*(r-1),T=(r,s)=>r<=10?s<=5?0:1:Math.ceil(r/10),P=(r,s="USD")=>new Intl.NumberFormat("en-US",{style:"currency",currency:s}).format(r),e={colors:{primary:"#007bff",primaryDark:"#0056b3",success:"#4caf50",danger:"#e53935",warning:"#ff9800",white:"#fff",text:{primary:"#333",secondary:"#666"},background:{primary:"#f9fafb",card:"#fff",highlight:"#f0f7ff"},border:"#ddd",grayLight:"#e0e0e0"},spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px"},borderRadius:{small:"4px",medium:"8px"},boxShadow:{sm:"0 1px 2px rgba(0,0,0,0.06)",md:"0 1px 3px rgba(0,0,0,0.1)",lg:"0 4px 10px rgba(0,0,0,0.08)"}},de=h.div`
  padding: ${e.spacing.md};
  background-color: ${e.colors.background.primary};
  min-height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  direction: ${r=>r.$isRTL?"rtl":"ltr"};
  position: relative;
`,ue=h.button`
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
`,W=h.div`
  background-color: ${e.colors.background.card};
  border-radius: ${e.borderRadius.medium};
  box-shadow: ${e.boxShadow.md};
  padding: ${e.spacing.lg};
  margin-bottom: ${e.spacing.lg};
`,ge=h.h2`
  font-size: 18px;
  margin: 0 0 ${e.spacing.md} 0;
  color: ${e.colors.text.primary};
`,pe=h.div`
  background-color: ${e.colors.grayLight};
  border-radius: ${e.borderRadius.small};
  height: 20px;
  overflow: hidden;
  margin: ${e.spacing.md} 0;
`,me=h.div`
  height: 100%;
  background-color: ${r=>r.$percentage>90?e.colors.danger:r.$percentage>75?e.colors.warning:e.colors.primary};
  width: ${r=>Math.min(r.$percentage,100)}%;
  transition: width 0.3s ease;
`,J=h.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: ${e.colors.text.secondary};
`,xe=h.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${e.spacing.md};
  margin-top: ${e.spacing.md};
`,he=h.div`
  border: ${r=>r.$isInsufficient?`2px solid ${e.colors.danger}`:r.$isSelected?`2px solid ${e.colors.primary}`:`1px solid ${e.colors.grayLight}`};
  border-radius: ${e.borderRadius.medium};
  padding: ${e.spacing.md};
  cursor: ${r=>r.$isInsufficient?"not-allowed":"pointer"};
  transition: all 0.2s ease;
  background-color: ${r=>r.$isInsufficient?"#ffebee":r.$isSelected?e.colors.background.highlight:e.colors.white};
  opacity: ${r=>r.$isInsufficient?.7:1};
  position: relative;
`,fe=h.h3`
  margin: 0 0 ${e.spacing.sm} 0;
  font-size: 16px;
  color: ${e.colors.text.primary};
`,ye=h.div`
  font-size: 18px;
  font-weight: bold;
  color: ${e.colors.primary};
  margin-bottom: ${e.spacing.sm};
`,be=h.div`
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
`,E=h.button`
  background-color: ${r=>r.variant==="danger"?e.colors.danger:r.variant==="secondary"?"transparent":r.variant==="success"?e.colors.success:e.colors.primary};
  color: ${r=>r.variant==="secondary"?e.colors.primary:e.colors.white};
  border: ${r=>r.variant==="secondary"?`1px solid ${e.colors.primary}`:"none"};
  padding: ${r=>r.size==="small"?"8px 16px":r.size==="large"?"16px 32px":"12px 24px"};
  border-radius: ${e.borderRadius.medium};
  cursor: ${r=>r.disabled?"not-allowed":"pointer"};
  font-size: ${r=>r.size==="small"?"14px":r.size==="large"?"18px":"16px"};
  font-weight: 500;
  transition: all 0.2s ease;
  opacity: ${r=>r.disabled?.6:1};
  margin-right: ${e.spacing.sm};

  &:hover:not(:disabled) {
    background-color: ${r=>r.variant==="danger"?"#c62828":r.variant==="secondary"?e.colors.background.highlight:r.variant==="success"?"#388e3c":e.colors.primaryDark};
  }
`,L=h.div`
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
`,M=h.div`
  margin-bottom: ${e.spacing.md};
`,B=h.label`
  display: block;
  margin-bottom: ${e.spacing.sm};
  font-size: 14px;
  font-weight: 500;
  color: ${e.colors.text.primary};
`,z=h.input`
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
`,Se=h.div`
  background-color: ${e.colors.white};
  border-radius: ${e.borderRadius.medium};
  box-shadow: ${e.boxShadow.lg};
  padding: 40px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  width: min(450px, calc(100vw - 64px));
  max-height: calc(100vh - 64px);
  overflow-y: auto;
  
  @media (max-width: 480px) {
    width: calc(100vw - 80px);
    max-height: calc(100vh - 80px);
    padding: ${e.spacing.lg};
  }
`,$e=h.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
`,je=h.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${e.spacing.sm};
  margin: ${e.spacing.md} 0;
`,ve=h.div`
  border: 2px solid ${r=>r.$isSelected?e.colors.primary:e.colors.border};
  border-radius: ${e.borderRadius.medium};
  padding: ${e.spacing.md};
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${r=>r.$isSelected?e.colors.background.highlight:e.colors.white};
`,we=h.div`
  background-color: ${e.colors.background.primary};
  border-radius: ${e.borderRadius.medium};
  padding: ${e.spacing.md};
  margin: ${e.spacing.md} 0;
  border-left: 4px solid ${e.colors.success};
`,Ce=(r,s,n,c)=>{const o=f.useCallback(a=>{if(!r)return{canDowngrade:!1,reason:c("Loading subscription information...")};const u=F(a)*1024*1024*1024,m=s<=u;if(a===0){const i=n<=5;if(!m&&!i)return{canDowngrade:!1,reason:c("Insufficient storage and too many albums (max 5 for free)")};if(m){if(!i)return{canDowngrade:!1,reason:c("Too many albums (free tier allows max 5 albums)")}}else return{canDowngrade:!1,reason:c("Insufficient storage capacity")};return{canDowngrade:!0}}return{canDowngrade:m,reason:m?void 0:c("Insufficient storage capacity")}},[r,s,n,c]),d=f.useCallback(()=>{if(!r)return[];const a=r.intNumberOfSubscriptions,b=[],u=(i,x=!1)=>{const N=F(i),S=_(i),j=o(i);b.push({id:i,price:i===0?c("Free"):c("US${{price}} / month",{price:S.toFixed(2)}),subscriptions:i,storageGB:N,isInsufficient:!j.canDowngrade,isCurrent:x,insufficientReason:j.reason})};u(a,!0);const m=a+2;for(let i=a+1;i<=m;i++)u(i,!1);return b.sort((i,x)=>i.subscriptions-x.subscriptions)},[r,o,c]);return{canDowngrade:o,generatePlans:d}},Pe=({subscriptionInfo:r,calculatedBytesUsed:s,t:n})=>{if(!r)return t.jsx(W,{children:t.jsxs("div",{style:{textAlign:"center",padding:e.spacing.lg},children:[t.jsx(L,{}),t.jsx("span",{style:{marginLeft:e.spacing.sm,color:e.colors.text.secondary},children:n("Loading account information...")})]})});const c=F(r.intNumberOfSubscriptions),o=s/(c*1024*1024*1024)*100,d=_(r.intNumberOfSubscriptions);return t.jsxs(W,{children:[t.jsxs(J,{children:[t.jsx("strong",{children:t.jsx("span",{children:G(c*1024*1024*1024)})}),t.jsx("span",{children:r.intNumberOfSubscriptions===0?n("Free"):P(d)})]}),t.jsxs(J,{children:[t.jsx("span",{children:n("Used: {{used}}",{used:G(s)})}),t.jsx("span",{children:n("Total: {{total}}",{total:G(c*1024*1024*1024)})})]}),t.jsx(pe,{children:t.jsx(me,{$percentage:o})})]})},ke=({customGB:r,onCustomGBChange:s,subscriptionInfo:n,calculatedBytesUsed:c,albumCount:o,t:d})=>{const a=()=>{if(!r||isNaN(parseFloat(r))||!n)return"";const u=parseFloat(r),m=n.intNumberOfSubscriptions;if(u<=0)return t.jsx("span",{style:{color:e.colors.danger},children:d("Please enter a positive number")});if(u<10)return T(10,o)===m?t.jsx("span",{style:{color:e.colors.text.secondary},children:d("Current Plan")}):t.jsx("span",{style:{color:e.colors.warning},children:d("Minimum: 10 GB")});const i=A(c);if(u<i)return t.jsx("span",{style:{color:e.colors.danger,fontWeight:"bold"},children:d("Error: You are using {{used}}",{used:G(c)})});const x=T(u,o),N=F(x),S=_(x);return x===m?t.jsx("span",{style:{color:e.colors.text.secondary},children:d("Current Plan")}):x===0?t.jsx("span",{style:{color:e.colors.success,fontWeight:"bold"},children:d("10 GB - Free")}):t.jsx("span",{style:{color:e.colors.primary,fontWeight:"bold"},children:d("{{gb}} GB - {{price}} / month",{gb:N,price:P(S)})})},b=r&&!isNaN(parseFloat(r))&&n&&parseFloat(r)<A(c);return t.jsxs("div",{style:{marginTop:e.spacing.lg},children:[t.jsx(B,{style:{fontWeight:"bold"},children:d("Number of GB Needed:")}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:e.spacing.sm,marginTop:e.spacing.sm},children:[t.jsx(z,{type:"number",min:"1",step:"1",inputMode:"numeric",placeholder:d("e.g. 50"),value:r,onChange:u=>s(u.target.value),style:{width:"120px",borderColor:b?e.colors.danger:e.colors.border}}),t.jsx("span",{style:{fontSize:"14px",color:e.colors.text.secondary,minWidth:"200px"},children:a()})]}),b&&t.jsx("div",{style:{marginTop:e.spacing.sm,padding:e.spacing.sm,backgroundColor:"#ffebee",borderRadius:e.borderRadius.small,border:`1px solid ${e.colors.danger}`,fontSize:"12px",color:e.colors.danger},children:d("This capacity is insufficient for your current usage. Please select a larger capacity or delete some files first.")})]})},Te=({plans:r,selectedTier:s,isPlanSelected:n,customGB:c,onPlanSelect:o,t:d})=>t.jsx(xe,{children:r.map(a=>t.jsxs(he,{$isSelected:n&&s===a.subscriptions&&!c&&!a.isInsufficient,$isInsufficient:a.isInsufficient,onClick:()=>o(a),children:[t.jsxs(fe,{children:[d("{{gb}} GB",{gb:a.storageGB}),a.subscriptions===0&&t.jsxs("span",{style:{marginLeft:"8px",fontSize:"12px",color:e.colors.text.secondary,fontWeight:"normal"},children:["(",d("Max 5 albums"),")"]}),a.isCurrent&&t.jsxs("span",{style:{marginLeft:"8px",fontSize:"12px",color:e.colors.primary,fontWeight:"normal"},children:["(",d("Current"),")"]})]}),t.jsx(ye,{style:{color:a.isInsufficient?e.colors.text.secondary:e.colors.primary},children:a.price}),a.isInsufficient&&t.jsxs(t.Fragment,{children:[t.jsx("div",{style:{fontSize:"12px",color:e.colors.danger,fontWeight:"bold",marginTop:"8px"},children:a.insufficientReason||d("Insufficient Capacity")}),t.jsx(be,{children:"⚠️"})]})]},a.id))}),Ne=({selectedMethod:r,onMethodSelect:s,t:n})=>{const c=[{id:"card",name:n("Credit Card"),icon:"💳"},{id:"alipay",name:n("Alipay"),icon:"🇨🇳"},{id:"wechat_pay",name:n("WeChat Pay"),icon:"💬"},{id:"klarna",name:n("Klarna"),icon:"🛍️"},{id:"ideal",name:n("iDEAL"),icon:"🇳🇱"},{id:"sofort",name:n("SOFORT"),icon:"🏦"},{id:"bancontact",name:n("Bancontact"),icon:"🇧🇪"},{id:"giropay",name:n("Giropay"),icon:"🇩🇪"},{id:"eps",name:n("EPS"),icon:"🇦🇹"},{id:"p24",name:n("Przelewy24"),icon:"🇵🇱"}];return t.jsxs(M,{children:[t.jsx(B,{children:n("Payment Method")}),t.jsx(je,{children:c.map(o=>t.jsxs(ve,{$isSelected:r===o.id,onClick:()=>s(o.id),children:[t.jsx("div",{style:{fontSize:"24px",marginBottom:e.spacing.xs},children:o.icon}),t.jsx("div",{style:{fontSize:"12px",fontWeight:"500"},children:o.name})]},o.id))})]})},Be=({proRataInfo:r,isUpgrade:s,t:n})=>!r||!s?null:t.jsxs(we,{children:[t.jsx("div",{style:{fontWeight:"bold",marginBottom:e.spacing.sm,color:e.colors.success},children:n("✓ Today's Charge Calculation")}),t.jsxs("div",{style:{fontSize:"14px",color:e.colors.text.secondary},children:[t.jsx("div",{children:n("Current plan credit: {{credit}}",{credit:P(r.proRataCredit)})}),t.jsx("div",{children:n("New plan charge: {{charge}}",{charge:P(r.proRataCharge)})}),t.jsx("div",{style:{fontWeight:"bold",marginTop:e.spacing.xs,color:e.colors.text.primary},children:r.netAmount>0?n("Amount due today: {{amount}}",{amount:P(r.netAmount)}):n("No charge today (credit covers upgrade)")}),t.jsx("div",{style:{fontSize:"12px",marginTop:e.spacing.xs},children:n("({{days}} days remaining in billing cycle)",{days:r.daysRemainingInCycle})})]})]}),Re=({showStripe:r,paymentData:s,loading:n,selectedTier:c,customGB:o,albumCount:d,subscriptionInfo:a,onClose:b,onSubmit:u,onInputChange:m,t:i})=>{const[x,N]=f.useState("card"),[S,j]=f.useState(null),$=o&&!isNaN(parseFloat(o))?T(parseFloat(o),d):c,g=F($),k=_($),v=(a==null?void 0:a.intNumberOfSubscriptions)||0,w=$>v;return ce.useEffect(()=>{r&&w&&a?D.calculateProRata(v.toString(),$.toString(),"sub_mock_subscription_id").then(j):j(null)},[r,w,v,$,a]),r?t.jsxs(t.Fragment,{children:[t.jsx($e,{onClick:()=>!n&&b()}),t.jsxs(Se,{children:[t.jsxs("div",{style:{textAlign:"center",marginBottom:e.spacing.lg},children:[t.jsx("h3",{style:{margin:0,marginBottom:e.spacing.sm},children:w?i("Upgrade to {{gb}} GB",{gb:g}):i("Change to {{gb}} GB",{gb:g})}),t.jsxs("div",{style:{fontSize:"24px",fontWeight:"bold",color:e.colors.primary},children:[P(k)," ",i("/ month")]}),w&&S&&S.netAmount>0&&t.jsx("div",{style:{fontSize:"14px",color:e.colors.text.secondary,marginTop:e.spacing.sm,fontStyle:"italic"},children:i("{{amount}} due today (with pro-rata credit)",{amount:P(S.netAmount)})}),t.jsx("div",{style:{fontSize:"12px",color:e.colors.text.secondary,marginTop:e.spacing.md,padding:e.spacing.sm,backgroundColor:e.colors.background.primary,borderRadius:e.borderRadius.small,border:`1px solid ${e.colors.border}`},children:i("You will be automatically billed {{amount}} monthly on this card unless you change your payment method.",{amount:P(k)})})]}),t.jsx(Be,{proRataInfo:S,isUpgrade:w,t:i}),t.jsx(Ne,{selectedMethod:x,onMethodSelect:N,t:i}),x==="card"&&t.jsxs("div",{children:[t.jsxs(M,{children:[t.jsx(B,{children:i("Card Number")}),t.jsx(z,{type:"text",placeholder:i("1234 5678 9012 3456"),value:s.cardNumber,onChange:C=>m("cardNumber",C.target.value),required:!0,disabled:n})]}),t.jsxs("div",{style:{display:"flex",gap:e.spacing.md},children:[t.jsxs(M,{style:{flex:1},children:[t.jsx(B,{children:i("Expiry Date")}),t.jsx(z,{type:"text",placeholder:i("MM/YY"),value:s.expiryDate,onChange:C=>m("expiryDate",C.target.value),required:!0,disabled:n})]}),t.jsxs(M,{style:{flex:1},children:[t.jsx(B,{children:i("CVC")}),t.jsx(z,{type:"text",placeholder:i("123"),value:s.cvc,onChange:C=>m("cvc",C.target.value),required:!0,disabled:n})]})]}),t.jsxs(M,{children:[t.jsx(B,{children:i("Cardholder Name")}),t.jsx(z,{type:"text",placeholder:i("John Doe"),value:s.name,onChange:C=>m("name",C.target.value),required:!0,disabled:n})]})]}),(x==="alipay"||x==="wechat_pay")&&t.jsxs("div",{style:{padding:e.spacing.lg,backgroundColor:e.colors.background.primary,borderRadius:e.borderRadius.medium,textAlign:"center",margin:`${e.spacing.md} 0`},children:[t.jsx("div",{style:{fontSize:"48px",marginBottom:e.spacing.md},children:x==="alipay"?"🇨🇳":"💬"}),t.jsx("div",{style:{fontWeight:"bold",marginBottom:e.spacing.sm},children:i(x==="alipay"?"Alipay Payment":"WeChat Pay")}),t.jsx("div",{style:{fontSize:"14px",color:e.colors.text.secondary},children:i("You will be redirected to complete payment")})]}),t.jsxs("div",{style:{textAlign:"center",marginTop:e.spacing.lg},children:[t.jsxs(E,{onClick:u,disabled:n||x==="card"&&(!s.cardNumber||!s.expiryDate||!s.cvc||!s.name),size:"large",children:[n&&t.jsx(L,{}),n?i("Processing..."):w&&S&&S.netAmount>0?i("Pay {{amount}} Today",{amount:P(S.netAmount)}):w&&S&&S.netAmount===0?i("Start Subscription (No charge today)"):w?i("Start {{amount}}/month Subscription",{amount:P(k)}):i("Confirm Change")]}),t.jsx(E,{variant:"secondary",onClick:b,disabled:n,children:i("Cancel")})]}),t.jsx("div",{style:{marginTop:e.spacing.lg,padding:e.spacing.md,backgroundColor:e.colors.background.primary,borderRadius:e.borderRadius.small,textAlign:"center",fontSize:"12px",color:e.colors.text.secondary},children:i("🔒 Secure payment powered by Stripe")})]})]}):null},Me=()=>{const{t:r,language:s}=se(),n=ae(s)==="rtl",{folders:c,subscriptionInfo:o,calculatedBytesUsed:d}=le(l=>console.log(l)),a=c.length,b=o!==null,[u,m]=f.useState((o==null?void 0:o.intNumberOfSubscriptions)||0),[i,x]=f.useState(!1),[N,S]=f.useState(!1),[j,$]=f.useState(!1),[g,k]=f.useState(""),[v,w]=f.useState({cardNumber:"",expiryDate:"",cvc:"",name:""}),{canDowngrade:C,generatePlans:U}=Ce(o,d,a,r),O=f.useMemo(()=>b?U():[],[b,U]),K=f.useCallback(l=>{k(l);const p=parseFloat(l);if(l&&!isNaN(p)&&p>0){const y=T(Math.max(p,10),a);m(y),x(!1)}else l||(m((o==null?void 0:o.intNumberOfSubscriptions)||0),x(!1))},[o,a]),H=f.useCallback(l=>{if(l.isInsufficient)return;i&&u===l.subscriptions&&!g?(m((o==null?void 0:o.intNumberOfSubscriptions)||0),x(!1)):(m(l.subscriptions),x(!0)),k("")},[i,u,g,o]),I=f.useCallback(async()=>{$(!0);try{await D.cancelSubscription("sub_mock_subscription_id",!0),setTimeout(()=>{m(0),k(""),x(!1),$(!1),alert(r("Successfully scheduled downgrade to free plan at end of billing period."))},2e3)}catch{$(!1),alert(r("Error processing downgrade. Please try again."))}},[r]),Q=f.useCallback(()=>{if(!o)return;let l;if(g&&!isNaN(parseFloat(g))){const y=parseFloat(g);if(y<=0){alert(r("Please enter a positive number"));return}if(y<10){alert(r("Minimum storage capacity is 10 GB"));return}l=T(y,a)}else l=u;if(l===o.intNumberOfSubscriptions)return;const p=C(l);if(!p.canDowngrade){alert(p.reason||r("Cannot select this plan"));return}l===0?window.confirm(r("Are you sure you want to downgrade to the free plan? This will take effect at the end of your current billing period."))&&I():S(!0)},[o,g,u,a,C,I,r]),X=f.useCallback(async()=>{if(!v.cardNumber||!v.expiryDate||!v.cvc||!v.name){alert(r("Please fill in all payment fields."));return}$(!0);try{let l;if(g&&!isNaN(parseFloat(g))){const Y=parseFloat(g);if(Y<10){alert(r("Minimum storage capacity is 10 GB")),$(!1);return}l=T(Y,a)}else l=u;const p=(o==null?void 0:o.intNumberOfSubscriptions)||0,y=l>p,R=_(l),te=await D.createPaymentIntent(Math.round(R*100),"usd",["card","alipay","wechat_pay"]);console.log("Payment intent created:",te.clientSecret);const ne=y?"create_prorations":"none";await D.updateSubscription("sub_mock_subscription_id",`price_${l}`,ne),setTimeout(()=>{console.log("Subscription updated to tier:",l),$(!1),S(!1),k(""),x(!1),alert(r(y?"Payment successful! Your subscription has been upgraded with pro-rata credit applied.":"Subscription updated successfully! Changes take effect immediately.")),setTimeout(()=>{q(V("my-albums.html"))},1500)},3e3)}catch{$(!1),alert(r("Payment failed. Please try again."))}},[v,g,u,a,o,r]),Z=f.useCallback((l,p)=>{let y=p;l==="cardNumber"&&(y=p.replace(/\s/g,"").replace(/(.{4})/g,"$1 ").trim().substring(0,19)),l==="expiryDate"&&(y=p.replace(/\D/g,"").replace(/(\d{2})(\d)/,"$1/$2").substring(0,5)),l==="cvc"&&(y=p.replace(/\D/g,"").substring(0,4)),w(R=>({...R,[l]:y}))},[]),ee=f.useCallback(()=>{if(!o)return r("Change Plan");const l=o.intNumberOfSubscriptions;let p;if(g&&!isNaN(parseFloat(g))){const y=parseFloat(g);if(y<A(d))return r("Change Plan");p=T(Math.max(y,10),a)}else p=u;return p===l?r("Current Plan"):p>l?r("Upgrade (Pro-rata Credit)"):r(p===0?"Downgrade To Free (End of Period)":"Change Plan (Immediate)")},[o,g,u,d,a,r]),re=f.useMemo(()=>{var l;if(!o)return!0;if(g&&!isNaN(parseFloat(g))){const p=parseFloat(g);if(p<=0)return!0;const y=T(Math.max(p,10),a),R=o.intNumberOfSubscriptions;if(y===R||p<A(d))return!0}return!i&&!g||u===o.intNumberOfSubscriptions&&!g||j||!!(g&&(isNaN(parseFloat(g))||parseFloat(g)<=0))||!!((l=O.find(p=>p.subscriptions===u))!=null&&l.isInsufficient)},[o,i,g,u,j,O,d,a]);return t.jsxs(de,{$isRTL:n,children:[t.jsx("div",{style:{marginBottom:e.spacing.md,textAlign:"right"},children:t.jsx(ue,{onClick:()=>q(V("my-albums.html")),children:r("← Back To Albums")})}),t.jsx(Pe,{subscriptionInfo:o,calculatedBytesUsed:d,t:r}),t.jsxs(W,{children:[t.jsx(ge,{children:r("Select Storage Capacity")}),t.jsx("div",{style:{fontSize:"14px",color:e.colors.text.secondary,marginBottom:e.spacing.md,fontStyle:"italic"},children:r("Paid tiers have unlimited albums and are limited only by storage. Upgrades include pro-rata credit for unused time.")}),b?t.jsxs(t.Fragment,{children:[t.jsx(Te,{plans:O,selectedTier:u,isPlanSelected:i,customGB:g,onPlanSelect:H,t:r}),t.jsx(ke,{customGB:g,onCustomGBChange:K,subscriptionInfo:o,calculatedBytesUsed:d,albumCount:a,t:r}),t.jsx("div",{style:{marginTop:e.spacing.lg,textAlign:"center"},children:t.jsxs(E,{onClick:Q,disabled:re,children:[j&&t.jsx(L,{}),ee()]})})]}):t.jsxs("div",{style:{textAlign:"center",padding:e.spacing.lg},children:[t.jsx(L,{}),t.jsx("span",{style:{marginLeft:e.spacing.sm,color:e.colors.text.secondary},children:r("Loading subscription plans...")})]})]}),t.jsx(Re,{showStripe:N,paymentData:v,loading:j,selectedTier:u,customGB:g,albumCount:a,subscriptionInfo:o,onClose:()=>S(!1),onSubmit:X,onInputChange:Z,t:r})]})},ze=()=>t.jsx(ie,{children:t.jsx(Me,{})});oe.createRoot(document.getElementById("root")).render(t.jsx(ze,{}));
