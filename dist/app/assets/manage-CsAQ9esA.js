import{d as b,j as t,x as U,m as Y,k as q,r as g,B as _,R as V,I as K,u as Z,a as Q,b as H,z as ee,g as te}from"./buttons-DVLwyWsJ.js";import{u as re}from"./useFolderManagement-DvaMQRbG.js";import{a as J,I as ne,F as ie}from"./forms-DYxGj0FK.js";import"./types-CyPfckSQ.js";const i={colors:{primary:"#007bff",success:"#4caf50",danger:"#e53935",warning:"#ff9800",white:"#fff",text:{primary:"#333",secondary:"#666"},background:{primary:"#f9fafb",highlight:"#f0f7ff"},border:"#ddd",grayLight:"#e0e0e0"},spacing:{sm:"8px",md:"16px",lg:"24px"},borderRadius:{small:"4px",medium:"8px"},boxShadow:{sm:"0 1px 2px rgba(0,0,0,0.06)",lg:"0 4px 10px rgba(0,0,0,0.08)"}},oe=b.div`
  padding: ${i.spacing.md};
  background-color: ${i.colors.background.primary};
  min-height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  direction: ${e=>e.$isRTL?"rtl":"ltr"};
  position: relative;
`,se=b.h2`
  font-size: 18px;
  margin: 0 0 ${i.spacing.md} 0;
  color: ${i.colors.text.primary};
`,ae=b.div`
  background-color: ${i.colors.grayLight};
  border-radius: ${i.borderRadius.small};
  height: 20px;
  overflow: hidden;
  margin: ${i.spacing.md} 0;
`,ce=b.div`
  height: 100%;
  background-color: ${e=>e.$percentage>90?i.colors.danger:e.$percentage>75?i.colors.warning:i.colors.primary};
  width: ${e=>Math.min(e.$percentage,100)}%;
  transition: width 0.3s ease;
`,X=b.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: ${i.colors.text.secondary};
`,le=b.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${i.spacing.md};
  margin-top: ${i.spacing.md};
`,de=b.div`
  border: ${e=>e.$isInsufficient?`2px solid ${i.colors.danger}`:e.$isSelected?`2px solid ${i.colors.primary}`:`1px solid ${i.colors.grayLight}`};
  border-radius: ${i.borderRadius.medium};
  padding: ${i.spacing.md};
  cursor: ${e=>e.$isInsufficient?"not-allowed":"pointer"};
  transition: all 0.2s ease;
  background-color: ${e=>e.$isInsufficient?"#ffebee":e.$isSelected?i.colors.background.highlight:i.colors.white};
  opacity: ${e=>e.$isInsufficient?.7:1};
  position: relative;
`,ue=b.h3`
  margin: 0 0 ${i.spacing.sm} 0;
  font-size: 16px;
  color: ${i.colors.text.primary};
`,pe=b.div`
  font-size: 18px;
  font-weight: bold;
  color: ${i.colors.primary};
  margin-bottom: ${i.spacing.sm};
`,fe=b.div`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: ${i.colors.danger};
  color: white;
  font-size: 10px;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 12px;
  white-space: nowrap;
  box-shadow: ${i.boxShadow.sm};
`,I=b.div`
  border: 2px solid ${i.colors.grayLight};
  border-top: 2px solid ${i.colors.primary};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  display: inline-block;
  margin-right: ${i.spacing.sm};

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`,ge=b.div`
  background-color: ${i.colors.white};
  border-radius: ${i.borderRadius.medium};
  box-shadow: ${i.boxShadow.lg};
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
    padding: ${i.spacing.lg};
  }
`,me=b.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
`;b.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${i.spacing.sm};
  margin: ${i.spacing.md} 0;
`;b.div`
  border: 2px solid ${e=>e.$isSelected?i.colors.primary:i.colors.border};
  border-radius: ${i.borderRadius.medium};
  padding: ${i.spacing.md};
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${e=>e.$isSelected?i.colors.background.highlight:i.colors.white};
`;const he=b.div`
  background-color: ${i.colors.background.primary};
  border-radius: ${i.borderRadius.medium};
  padding: ${i.spacing.md};
  margin: ${i.spacing.md} 0;
  border-left: 4px solid ${i.colors.success};
`,xe=b.div`
  border: 1px solid ${i.colors.border};
  border-radius: ${i.borderRadius.small};
  padding: 10px 12px;
  margin-bottom: ${i.spacing.md};
  background-color: ${i.colors.white};

  .StripeElement {
    width: 100%;
  }

  .StripeElement--focus {
    border-color: ${i.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`,A=e=>e/(1024*1024*1024),M=e=>{const c=e/1048576,s=e/(1024*1024*1024),o=e/(1024*1024*1024*1024);return o>=1?`${o.toFixed(1)} TB`:s>=1?`${s.toFixed(1)} GB`:`${Math.round(c)} MB`},O=e=>e<=1?10:e*10,D=e=>e===0?0:1+.75*(e-1),B=(e,c)=>e<=10?c<=5?0:1:Math.ceil(e/10),be=({subscriptionInfo:e,calculatedBytesUsed:c,t:s,formatCurrency:o})=>{if(!e)return t.jsx(U,{children:t.jsxs("div",{style:{textAlign:"center",padding:"24px"},children:[t.jsx(I,{}),t.jsx("span",{style:{marginLeft:"8px",color:"#666"},children:s("Loading account information...")})]})});const u=O(e.intNumberOfSubscriptions),r=c/(u*1024*1024*1024)*100,a=D(e.intNumberOfSubscriptions);return t.jsxs(U,{children:[t.jsxs(X,{children:[t.jsx("strong",{children:t.jsx("span",{children:M(u*1024*1024*1024)})}),t.jsx("span",{children:e.intNumberOfSubscriptions===0?s("Free"):o(a)})]}),t.jsxs(X,{children:[t.jsx("span",{children:s("Used: {{used}}",{used:M(c)})}),t.jsx("span",{children:s("Total: {{total}}",{total:M(u*1024*1024*1024)})})]}),t.jsx(ae,{children:t.jsx(ce,{$percentage:r})})]})},ye=({customGB:e,onCustomGBChange:c,subscriptionInfo:s,calculatedBytesUsed:o,albumCount:u,t:r,formatCurrency:a})=>{const f=()=>{if(!e||isNaN(parseFloat(e))||!s)return"";const p=parseFloat(e),m=s.intNumberOfSubscriptions;if(p<=0)return t.jsx("span",{style:{color:"#e53935"},children:r("Please enter a positive number")});if(p<10)return t.jsx("span",{style:{color:"#ff9800"},children:r("Minimum: 10 GB")});const j=A(o);if(p<j)return t.jsx("span",{style:{color:"#e53935",fontWeight:"bold"},children:r("Error: You are using {{used}}",{used:M(o)})});const $=B(p,u),C=O($),S=D($);return $===m?t.jsx("span",{style:{color:"#666"},children:r("Current Plan")}):$<m?t.jsx("span",{style:{color:"#ff9800",fontWeight:"bold"},children:r("{{gb}} GB - {{price}} / month (Smaller Plan)",{gb:C,price:a(S)})}):$===0?t.jsx("span",{style:{color:"#4caf50",fontWeight:"bold"},children:r("10 GB - Free")}):t.jsx("span",{style:{color:"#007bff",fontWeight:"bold"},children:r("{{gb}} GB - {{price}} / month (Upgrade)",{gb:C,price:a(S)})})},x=e&&!isNaN(parseFloat(e))&&s&&parseFloat(e)<A(o),n=e&&!isNaN(parseFloat(e))&&s&&B(parseFloat(e),u)<s.intNumberOfSubscriptions;return t.jsxs("div",{style:{marginTop:"32px"},children:[t.jsx(J,{style:{fontWeight:"bold"},children:r("Number of GB Needed:")}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginTop:"8px"},children:[t.jsx(ne,{type:"number",min:"1",step:"1",inputMode:"numeric",placeholder:r("e.g. 50"),value:e,onChange:p=>c(p.target.value),style:{width:"120px",borderColor:x||n?"#ff9800":"#ddd"}}),t.jsx("span",{style:{fontSize:"14px",color:"#666",minWidth:"200px"},children:f()})]}),x&&t.jsx("div",{style:{marginTop:"8px",padding:"8px",backgroundColor:"#ffebee",borderRadius:"4px",border:"1px solid #e53935",fontSize:"12px",color:"#e53935"},children:r("This capacity is insufficient for your current usage. Please select a larger capacity.")}),n&&!x&&t.jsx("div",{style:{marginTop:"8px",padding:"8px",backgroundColor:"#fff3e0",borderRadius:"4px",border:"1px solid #ff9800",fontSize:"12px",color:"#f57c00"},children:r("Plan changes to a smaller capacity take effect at the end of your current billing period.")})]})},Se=({plans:e,selectedTier:c,isPlanSelected:s,customGB:o,onPlanSelect:u,t:r})=>t.jsx(le,{children:e.map(a=>t.jsxs(de,{$isSelected:s&&c===a.subscriptions&&!o&&!a.isInsufficient,$isInsufficient:a.isInsufficient,onClick:()=>u(a),children:[t.jsxs(ue,{children:[r("{{gb}} GB",{gb:a.storageGB}),a.subscriptions===0&&t.jsxs("span",{style:{marginLeft:"8px",fontSize:"12px",color:"#666",fontWeight:"normal"},children:["(",r("Max 5 albums"),")"]})]}),t.jsx(pe,{style:{color:a.isInsufficient?"#666":"#007bff"},children:a.price}),a.isInsufficient&&t.jsxs(t.Fragment,{children:[t.jsx("div",{style:{fontSize:"12px",color:"#e53935",fontWeight:"bold",marginTop:"8px"},children:a.insufficientReason||r("Insufficient Capacity")}),t.jsx(fe,{children:"⚠️"})]})]},a.id))}),we=({proRataInfo:e,isUpgrade:c,t:s,formatCurrency:o})=>!e||!c?null:t.jsxs(he,{children:[t.jsx("div",{style:{fontWeight:"bold",marginBottom:"8px",color:"#4caf50"},children:s("✓ Today's Charge Calculation")}),t.jsxs("div",{style:{fontSize:"14px",color:"#666"},children:[t.jsx("div",{children:s("Current plan credit: {{credit}}",{credit:o(e.proRataCredit)})}),t.jsx("div",{children:s("New plan charge: {{charge}}",{charge:o(e.proRataCharge)})}),t.jsx("div",{style:{fontWeight:"bold",marginTop:"4px",color:"#333"},children:e.netAmount>0?s("Amount due today: {{amount}}",{amount:o(e.netAmount)}):s("No charge today (credit covers upgrade)")}),t.jsx("div",{style:{fontSize:"12px",marginTop:"4px"},children:s("({{days}} days remaining in billing cycle)",{days:e.daysRemainingInCycle})})]})]}),je=`
  mutation CreatePaymentIntentWithProration($input: CreatePaymentIntentWithProrationInput!) {
    changeMySubscription(createPaymentIntentWithProration: $input) {
      ... on PaymentIntentResponse {
        id
        clientSecret
        proration {
          currentMonthlyPrice
          newMonthlyPrice
          daysRemainingInCycle
          totalDaysInCycle
          proRataCredit
          proRataCharge
          netAmount
        }
      }
    }
  }
`,$e=`
  mutation UpdateSubscription($input: UpdateSubscriptionInput!) {
    changeMySubscription(updateSubscription: $input) {
      ... on SubscriptionInfo {
        id
        intNumberOfSubscriptions
        currentPeriodEndEpochTime
      }
    }
  }
`,Pe="pk_live_51O77MNA5szNEcsv6LqXfWX0BY2V8mBwAXnaBHcmdwsBHUaeXlQjlqRq3ELWFaycPzQvCRYOyz3sg3x2EkZ7ifRnR00QewJDIRL";class R{static async initializeStripe(c=Pe){if(typeof window>"u"||typeof document>"u")throw new Error("Browser environment required for Stripe initialization");const s=window,o=document;if(!s.Stripe){const u=o.createElement("script");u.src="https://js.stripe.com/v3/",o.head.appendChild(u),await new Promise(r=>{u.onload=r})}if(!s.Stripe)throw new Error("Failed to load Stripe.js");return s.Stripe(c)}static async createPaymentIntentWithProration(c,s=["card"]){var a,f;const o=await Y();if(!o)throw new Error("Authentication failed");const r=await(await fetch(q,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({query:je,variables:{input:{targetTier:c,currency:"usd",paymentMethodTypes:s}}})})).json();if(r.errors)throw console.error("GraphQL errors:",r.errors),new Error(((a=r.errors[0])==null?void 0:a.message)||"Failed to create payment intent");return(f=r.data)==null?void 0:f.changeMySubscription}static async updateSubscription(c,s="create_prorations"){var a,f;const o=await Y();if(!o)throw new Error("Authentication failed");const r=await(await fetch(q,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({query:$e,variables:{input:{newTier:c,prorationBehavior:s}}})})).json();if(r.errors)throw console.error("GraphQL errors:",r.errors),new Error(((a=r.errors[0])==null?void 0:a.message)||"Failed to update subscription");return(f=r.data)==null?void 0:f.changeMySubscription}static async confirmPayment(c,s,o,u){if(s!=="card")throw new Error(`Unsupported payment method: ${s}`);if(!u)throw new Error("Card element not initialized");return await c.confirmCardPayment(o,{payment_method:{card:u}})}}const Te=({showStripe:e,loading:c,selectedTier:s,customGB:o,albumCount:u,subscriptionInfo:r,onClose:a,onPaymentSuccess:f,setLoading:x,t:n,formatCurrency:p})=>{const[m,j]=g.useState(null),[$,C]=g.useState(null),[S,L]=g.useState(null),l=o&&!isNaN(parseFloat(o))?B(parseFloat(o),u):s,k=O(l),F=D(l),E=(r==null?void 0:r.intNumberOfSubscriptions)||0,N=l>E,z=l<E;g.useEffect(()=>{if(!e||$||typeof window>"u"||typeof document>"u")return;(async()=>{try{const w=await R.initializeStripe();C(w);const d=w.elements().create("card",{style:{base:{fontSize:"16px",color:"#333","::placeholder":{color:"#aab7c4"}}}});L(d),setTimeout(()=>{document.getElementById("card-element")&&d.mount("#card-element")},100)}catch(w){console.error("Failed to initialize Stripe:",w)}})()},[e,$]),g.useEffect(()=>{e&&N&&r?(async()=>{try{if(r.intNumberOfSubscriptions>0){const w=await R.createPaymentIntentWithProration(l,["card"]);j(w.proration)}else j(null)}catch(w){console.error("Failed to get proration info:",w),j(null)}})():j(null)},[e,N,E,l,r]),g.useEffect(()=>()=>{S&&S.unmount()},[S]);const W=async()=>{x(!0);try{let T;if(o&&!isNaN(parseFloat(o))){const v=parseFloat(o);if(v<10){alert(n("Minimum storage capacity is 10 GB")),x(!1);return}T=B(v,u)}else{T=s;const v=(r==null?void 0:r.intNumberOfSubscriptions)||0;if(T<=v){alert(n("Use the custom GB input to select a different plan size.")),x(!1);return}}const w=(r==null?void 0:r.intNumberOfSubscriptions)||0,G=T<w,d=await R.createPaymentIntentWithProration(T,["card"]);if(!$||!S)throw new Error("Stripe not properly initialized");const h=await R.confirmPayment($,"card",d.clientSecret,S),{error:P,paymentIntent:y}=h;if(P)throw new Error(P.message);if((y==null?void 0:y.status)==="succeeded"){const v=G?"none":w>0?"create_prorations":"none";await R.updateSubscription(T,v),x(!1),f()}else if((y==null?void 0:y.status)==="requires_action"||(y==null?void 0:y.status)==="requires_source_action")x(!1),alert(n("Additional authentication required. Please follow the prompts to complete payment."));else if((y==null?void 0:y.status)==="processing")x(!1),alert(n("Payment is being processed. You will receive confirmation once completed.")),a();else throw new Error("Payment was not successful")}catch{x(!1),alert(n("Payment failed. Please try again."))}};return e?t.jsxs(t.Fragment,{children:[t.jsx(me,{onClick:()=>!c&&a()}),t.jsxs(ge,{children:[t.jsxs("div",{style:{textAlign:"center",marginBottom:"24px"},children:[t.jsx("h3",{style:{margin:0,marginBottom:"8px"},children:z?n("Change to {{gb}} GB Plan",{gb:k}):n("Upgrade to {{gb}} GB",{gb:k})}),t.jsxs("div",{style:{fontSize:"24px",fontWeight:"bold",color:"#007bff"},children:[p(F)," ",n("/ month")]}),N&&m&&r&&r.intNumberOfSubscriptions>0&&m.netAmount>0&&t.jsx("div",{style:{fontSize:"14px",color:"#666",marginTop:"8px",fontStyle:"italic"},children:n("{{amount}} due today (with pro-rata credit)",{amount:p(m.netAmount)})}),t.jsx("div",{style:{fontSize:"12px",color:"#666",marginTop:"16px",padding:"8px",backgroundColor:"#f9fafb",borderRadius:"4px",border:"1px solid #ddd"},children:n("You will be automatically billed {{amount}} monthly on this payment method unless you change it.",{amount:p(F)})})]}),t.jsx(we,{proRataInfo:m,isUpgrade:N,t:n,formatCurrency:p}),t.jsxs(ie,{children:[t.jsx(J,{children:n("Card Information")}),t.jsx(xe,{children:t.jsx("div",{id:"card-element"})})]}),t.jsxs("div",{style:{textAlign:"center",marginTop:"32px"},children:[t.jsxs(_,{onClick:W,disabled:c||!S,$primary:!0,children:[c&&t.jsx(I,{}),c?n("Processing..."):z?n("Confirm Plan Change (End of Period)"):N&&m&&r&&r.intNumberOfSubscriptions>0&&m.netAmount>0?n("Pay {{amount}} Today",{amount:p(m.netAmount)}):N&&m&&r&&r.intNumberOfSubscriptions>0&&m.netAmount===0?n("Start Subscription (No charge today)"):n("Start {{amount}}/month Subscription",{amount:p(F)})]}),t.jsx(_,{onClick:a,disabled:c,style:{marginLeft:"8px"},children:n("Cancel")})]}),t.jsx("div",{style:{marginTop:"32px",padding:"16px",backgroundColor:"#f9fafb",borderRadius:"4px",textAlign:"center",fontSize:"12px",color:"#666"},children:n("🔒 Secure payment powered by Stripe")})]})]}):null},ve=()=>{const[e,c]=g.useState(!1);return g.useEffect(()=>{c(!0)},[]),{formatCurrency:g.useCallback((o,u="USD")=>{if(!e||typeof Intl>"u")return`$${o.toFixed(2)}`;try{return new Intl.NumberFormat("en-US",{style:"currency",currency:u}).format(o)}catch{return`$${o.toFixed(2)}`}},[e]),isClient:e}},Ce=(e,c,s,o)=>{const u=g.useCallback(a=>{if(!e)return{canDowngrade:!1,reason:o("Loading subscription information...")};const x=O(a)*1024*1024*1024,n=c<=x;if(a===0){const p=s<=5;if(!n&&!p)return{canDowngrade:!1,reason:o("Insufficient storage and too many albums (max 5 for free)")};if(n){if(!p)return{canDowngrade:!1,reason:o("Too many albums (free tier allows max 5 albums)")}}else return{canDowngrade:!1,reason:o("Insufficient storage capacity")};return{canDowngrade:!0}}return{canDowngrade:n,reason:n?void 0:o("Insufficient storage capacity")}},[e,c,s,o]),r=g.useCallback(()=>{if(!e)return[];const a=e.intNumberOfSubscriptions,f=[],x=n=>{const p=O(n),m=D(n);f.push({id:n,price:n===0?o("Free"):o("US${{price}} / month",{price:m.toFixed(2)}),subscriptions:n,storageGB:p,isInsufficient:!1,isCurrent:!1,insufficientReason:void 0})};for(let n=a+1;n<=a+3;n++)x(n);return f.sort((n,p)=>n.subscriptions-p.subscriptions)},[e,o]);return{canDowngrade:u,generatePlans:r}},Ne=()=>{const{t:e,language:c}=Z(),s=te(c)==="rtl",{formatCurrency:o}=ve(),{folders:u,subscriptionInfo:r,calculatedBytesUsed:a}=re(d=>console.log(d)),f=u.length,x=r!==null,[n,p]=g.useState(0),[m,j]=g.useState(!1),[$,C]=g.useState(!1),[S,L]=g.useState(!1),[l,k]=g.useState("");g.useEffect(()=>{r&&n===0&&p(r.intNumberOfSubscriptions)},[r,n]);const{generatePlans:F}=Ce(r,a,f,e),E=g.useMemo(()=>x?F():[],[x,F]),N=g.useCallback(d=>{k(d);const h=parseFloat(d);if(d&&!isNaN(h)&&h>0){const P=B(Math.max(h,10),f);p(P),j(!1)}else d||(p((r==null?void 0:r.intNumberOfSubscriptions)||0),j(!1))},[r,f]),z=g.useCallback(d=>{if(d.isInsufficient)return;m&&n===d.subscriptions&&!l?(p((r==null?void 0:r.intNumberOfSubscriptions)||0),j(!1)):(p(d.subscriptions),j(!0)),k("")},[m,n,l,r]),W=g.useCallback(()=>{if(!r)return;let d;if(l&&!isNaN(parseFloat(l))){const v=parseFloat(l);if(v<=0){alert(e("Please enter a positive number"));return}if(v<10){alert(e("Minimum storage capacity is 10 GB"));return}d=B(v,f)}else if(d=n,d<r.intNumberOfSubscriptions){alert(e("Use the custom GB input below to select a smaller plan."));return}if(d===r.intNumberOfSubscriptions)return;const P=A(a);if(d*10<P){alert(e("This capacity is insufficient for your current usage. Please select a larger capacity or delete some files first."));return}d<r.intNumberOfSubscriptions?typeof window<"u"&&window.confirm&&window.confirm(e("Are you sure you want to change to a smaller plan? This will take effect at the end of your current billing period."))&&C(!0):C(!0)},[r,l,n,f,a,e]),T=g.useCallback(()=>{C(!1),k(""),j(!1),alert(e("Payment successful! Your subscription has been updated.")),Q(H("my-albums.html"))},[e]),w=g.useCallback(()=>{if(!r)return e("Select Plan");const d=r.intNumberOfSubscriptions;let h;if(l&&!isNaN(parseFloat(l))){const P=parseFloat(l);if(P<A(a))return e("Select Plan");h=B(Math.max(P,10),f)}else h=n;return h===d?e("Current Plan"):h>d?e("Upgrade (Pro-rata Credit)"):h<d?e("Change Plan (End of Period)"):e("Select Plan")},[r,l,n,a,f,e]),G=g.useMemo(()=>{var d;if(!r)return!0;if(l&&!isNaN(parseFloat(l))){const h=parseFloat(l);if(h<=0)return!0;const P=B(Math.max(h,10),f),y=r.intNumberOfSubscriptions;if(P===y||h<A(a))return!0}else if(n<r.intNumberOfSubscriptions)return!0;return!m&&!l||n===r.intNumberOfSubscriptions&&!l||S||!!(l&&(isNaN(parseFloat(l))||parseFloat(l)<=0))||!!((d=E.find(h=>h.subscriptions===n))!=null&&d.isInsufficient)},[r,m,l,n,S,E,a,f]);return t.jsxs(oe,{$isRTL:s,children:[t.jsx("div",{style:{marginBottom:"16px",textAlign:s?"right":"left"},children:t.jsx(ee,{onClick:()=>Q(H("my-albums.html")),children:e("← Back To Albums")})}),t.jsx(be,{subscriptionInfo:r,calculatedBytesUsed:a,t:e,formatCurrency:o}),t.jsxs(U,{children:[t.jsx(se,{children:e("Select Your Storage Plan")}),t.jsx("div",{style:{fontSize:"14px",color:"#666",marginBottom:"16px",fontStyle:"italic"},children:e("Choose the plan that best fits your needs. You can select from the options below or enter a custom amount.")}),x?t.jsxs(t.Fragment,{children:[t.jsx(Se,{plans:E,selectedTier:n,isPlanSelected:m,customGB:l,onPlanSelect:z,t:e}),t.jsx(ye,{customGB:l,onCustomGBChange:N,subscriptionInfo:r,calculatedBytesUsed:a,albumCount:f,t:e,formatCurrency:o}),t.jsx("div",{style:{marginTop:"32px",textAlign:"center"},children:t.jsxs(_,{onClick:W,disabled:G,$primary:!0,children:[S&&t.jsx(I,{}),w()]})})]}):t.jsxs("div",{style:{textAlign:"center",padding:"24px"},children:[t.jsx(I,{}),t.jsx("span",{style:{marginLeft:"8px",color:"#666"},children:e("Loading subscription plans...")})]})]}),t.jsx(Te,{showStripe:$,loading:S,selectedTier:n,customGB:l,albumCount:f,subscriptionInfo:r,onClose:()=>C(!1),onPaymentSuccess:T,setLoading:L,t:e,formatCurrency:o})]})},Be=()=>t.jsx(K,{children:t.jsx(Ne,{})});if(typeof document<"u"){const e=document.getElementById("root");e&&V.createRoot(e).render(t.jsx(Be,{}))}
