import{d as b,R as se,j as n,I as ce,u as le,r as d,a as ee,b as re,h as te,f as ne,g as de}from"./utils-2qV3otm0.js";import{u as ue}from"./useFolderManagement-CkeWpL4i.js";import"./types-CyPfckSQ.js";const pe=()=>{const[r,a]=d.useState(!1),[c,i]=d.useState(null),[u,t]=d.useState(null);return d.useEffect(()=>{a(!0),typeof window<"u"&&i(window),typeof document<"u"&&t(document)},[]),{isClient:r,window:c,document:u}},me=()=>{const[r,a]=d.useState(!1);d.useEffect(()=>{a(!0)},[]);const c=d.useCallback(t=>{if(!r||typeof localStorage>"u")return null;try{return localStorage.getItem(t)}catch{return null}},[r]),i=d.useCallback((t,s)=>{if(!(!r||typeof localStorage>"u"))try{localStorage.setItem(t,s)}catch{}},[r]),u=d.useCallback(t=>{if(!(!r||typeof localStorage>"u"))try{localStorage.removeItem(t)}catch{}},[r]);return{getItem:c,setItem:i,removeItem:u,isClient:r}},oe=()=>{const[r,a]=d.useState("US"),[c,i]=d.useState(!1);d.useEffect(()=>{if(i(!0),!(typeof Intl>"u"))try{const t=Intl.DateTimeFormat().resolvedOptions().timeZone;t.includes("Europe/Amsterdam")?a("NL"):t.includes("Europe/Berlin")?a("DE"):t.includes("Europe/Vienna")?a("AT"):t.includes("Europe/Brussels")?a("BE"):t.includes("Europe/Warsaw")?a("PL"):a("US")}catch{a("US")}},[]);const u=d.useCallback((t,s="USD")=>{if(!c||typeof Intl>"u")return`$${t.toFixed(2)}`;try{return new Intl.NumberFormat("en-US",{style:"currency",currency:s}).format(t)}catch{return`$${t.toFixed(2)}`}},[c]);return{userCountry:r,formatCurrency:u,isClient:c}},ge=`
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
`,fe=`
  mutation UpdateSubscription($input: UpdateSubscriptionInput!) {
    changeMySubscription(updateSubscription: $input) {
      ... on SubscriptionInfo {
        id
        intNumberOfSubscriptions
        currentPeriodEndEpochTime
      }
    }
  }
`;class _{static async initializeStripe(a,c,i){if(!c||!i)throw new Error("Browser environment required for Stripe initialization");if(!c.Stripe){const u=i.createElement("script");u.src="https://js.stripe.com/v3/",i.head.appendChild(u),await new Promise(t=>{u.onload=t})}return c.Stripe(a)}static async createPaymentIntentWithProration(a,c=["card"]){var s,f;const i=await te();if(!i)throw new Error("Authentication failed");const t=await(await fetch(ne,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({query:ge,variables:{input:{targetTier:a,currency:"usd",paymentMethodTypes:c}}})})).json();if(t.errors)throw console.error("GraphQL errors:",t.errors),new Error(((s=t.errors[0])==null?void 0:s.message)||"Failed to create payment intent");return(f=t.data)==null?void 0:f.changeMySubscription}static async updateSubscription(a,c="create_prorations"){var s,f;const i=await te();if(!i)throw new Error("Authentication failed");const t=await(await fetch(ne,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({query:fe,variables:{input:{newTier:a,prorationBehavior:c}}})})).json();if(t.errors)throw console.error("GraphQL errors:",t.errors),new Error(((s=t.errors[0])==null?void 0:s.message)||"Failed to update subscription");return(f=t.data)==null?void 0:f.changeMySubscription}static async confirmPayment(a,c,i,u,t){if(!t)throw new Error("Browser environment required for payment confirmation");const s=`${t.location.origin}${t.location.pathname}?payment_return=true`;switch(c){case"card":if(!u)throw new Error("Card element not initialized");return await a.confirmCardPayment(i,{payment_method:{card:u}});case"alipay":return await a.confirmAlipayPayment(i,{return_url:s});case"wechat_pay":return await a.confirmWechatPayPayment(i,{payment_method_options:{wechat_pay:{client:"web"}}});case"klarna":return await a.confirmKlarnaPayment(i,{payment_method:{billing_details:{email:"customer@example.com"}},return_url:s});case"ideal":return await a.confirmIdealPayment(i,{payment_method:{ideal:{bank:"abn_amro"}},return_url:s});case"sofort":return await a.confirmSofortPayment(i,{payment_method:{sofort:{country:"DE"}},return_url:s});case"bancontact":return await a.confirmBancontactPayment(i,{payment_method:{billing_details:{name:"Customer Name"}},return_url:s});case"giropay":return await a.confirmGiropayPayment(i,{payment_method:{billing_details:{name:"Customer Name"}},return_url:s});case"eps":return await a.confirmEpsPayment(i,{payment_method:{eps:{bank:"arzte_und_apotheker_bank"}},return_url:s});case"p24":return await a.confirmP24Payment(i,{payment_method:{billing_details:{email:"customer@example.com"}},return_url:s});default:throw new Error(`Unsupported payment method: ${c}`)}}}const Q=r=>r/(1024*1024*1024),q=r=>{const a=r/1048576,c=r/(1024*1024*1024),i=r/(1024*1024*1024*1024);return i>=1?`${i.toFixed(1)} TB`:c>=1?`${c.toFixed(1)} GB`:`${Math.round(a)} MB`},G=r=>r<=1?10:r*10,X=r=>r===0?0:1+.75*(r-1),A=(r,a)=>r<=10?a<=5?0:1:Math.ceil(r/10),Y=r=>({card:{requiresElement:!0,redirects:!1,description:"Credit or debit card"},alipay:{requiresElement:!1,redirects:!0,description:"Popular in China",minimumAmount:.5,supportedCurrencies:["usd","eur","gbp","cad","aud","sgd"]},wechat_pay:{requiresElement:!1,redirects:!1,description:"Popular in China",minimumAmount:.5,supportedCurrencies:["usd","cny"]},klarna:{requiresElement:!1,redirects:!0,description:"Buy now, pay later",minimumAmount:1,supportedCountries:["AT","BE","DK","FI","FR","DE","IT","NL","NO","ES","SE","GB","US"]},ideal:{requiresElement:!1,redirects:!0,description:"Dutch bank transfer",supportedCountries:["NL"],minimumAmount:.5},sofort:{requiresElement:!1,redirects:!0,description:"German bank transfer",supportedCountries:["DE","AT"],minimumAmount:.5},bancontact:{requiresElement:!1,redirects:!0,description:"Belgian bank transfer",supportedCountries:["BE"],minimumAmount:.5},giropay:{requiresElement:!1,redirects:!0,description:"German bank transfer",supportedCountries:["DE"],minimumAmount:.5},eps:{requiresElement:!1,redirects:!0,description:"Austrian bank transfer",supportedCountries:["AT"],minimumAmount:.5},p24:{requiresElement:!1,redirects:!0,description:"Polish bank transfer",supportedCountries:["PL"],minimumAmount:.5}})[r],e={colors:{primary:"#007bff",primaryDark:"#0056b3",success:"#4caf50",danger:"#e53935",warning:"#ff9800",white:"#fff",text:{primary:"#333",secondary:"#666"},background:{primary:"#f9fafb",card:"#fff",highlight:"#f0f7ff"},border:"#ddd",grayLight:"#e0e0e0"},spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px"},borderRadius:{small:"4px",medium:"8px"},boxShadow:{sm:"0 1px 2px rgba(0,0,0,0.06)",md:"0 1px 3px rgba(0,0,0,0.1)",lg:"0 4px 10px rgba(0,0,0,0.08)"}},he=b.div`
  padding: ${e.spacing.md};
  background-color: ${e.colors.background.primary};
  min-height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  direction: ${r=>r.$isRTL?"rtl":"ltr"};
  position: relative;
`,ye=b.button`
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
`,J=b.div`
  background-color: ${e.colors.background.card};
  border-radius: ${e.borderRadius.medium};
  box-shadow: ${e.boxShadow.md};
  padding: ${e.spacing.lg};
  margin-bottom: ${e.spacing.lg};
`,xe=b.h2`
  font-size: 18px;
  margin: 0 0 ${e.spacing.md} 0;
  color: ${e.colors.text.primary};
`,be=b.div`
  background-color: ${e.colors.grayLight};
  border-radius: ${e.borderRadius.small};
  height: 20px;
  overflow: hidden;
  margin: ${e.spacing.md} 0;
`,Se=b.div`
  height: 100%;
  background-color: ${r=>r.$percentage>90?e.colors.danger:r.$percentage>75?e.colors.warning:e.colors.primary};
  width: ${r=>Math.min(r.$percentage,100)}%;
  transition: width 0.3s ease;
`,ie=b.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: ${e.colors.text.secondary};
`,we=b.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${e.spacing.md};
  margin-top: ${e.spacing.md};
`,$e=b.div`
  border: ${r=>r.$isInsufficient?`2px solid ${e.colors.danger}`:r.$isSelected?`2px solid ${e.colors.primary}`:`1px solid ${e.colors.grayLight}`};
  border-radius: ${e.borderRadius.medium};
  padding: ${e.spacing.md};
  cursor: ${r=>r.$isInsufficient?"not-allowed":"pointer"};
  transition: all 0.2s ease;
  background-color: ${r=>r.$isInsufficient?"#ffebee":r.$isSelected?e.colors.background.highlight:e.colors.white};
  opacity: ${r=>r.$isInsufficient?.7:1};
  position: relative;
`,Ce=b.h3`
  margin: 0 0 ${e.spacing.sm} 0;
  font-size: 16px;
  color: ${e.colors.text.primary};
`,Pe=b.div`
  font-size: 18px;
  font-weight: bold;
  color: ${e.colors.primary};
  margin-bottom: ${e.spacing.sm};
`,je=b.div`
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
`,K=b.button`
  background-color: ${r=>r.$variant==="danger"?e.colors.danger:r.$variant==="secondary"?"transparent":r.$variant==="success"?e.colors.success:e.colors.primary};
  color: ${r=>r.$variant==="secondary"?e.colors.primary:e.colors.white};
  border: ${r=>r.$variant==="secondary"?`1px solid ${e.colors.primary}`:"none"};
  padding: ${r=>r.$size==="small"?"8px 16px":r.$size==="large"?"16px 32px":"12px 24px"};
  border-radius: ${e.borderRadius.medium};
  cursor: ${r=>r.disabled?"not-allowed":"pointer"};
  font-size: ${r=>r.$size==="small"?"14px":r.$size==="large"?"18px":"16px"};
  font-weight: 500;
  transition: all 0.2s ease;
  opacity: ${r=>r.disabled?.6:1};
  margin-right: ${e.spacing.sm};

  &:hover:not(:disabled) {
    background-color: ${r=>r.$variant==="danger"?"#c62828":r.$variant==="secondary"?e.colors.background.highlight:r.$variant==="success"?"#388e3c":e.colors.primaryDark};
  }
`,V=b.div`
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
`,ae=b.div`
  margin-bottom: ${e.spacing.md};
`,Z=b.label`
  display: block;
  margin-bottom: ${e.spacing.sm};
  font-size: 14px;
  font-weight: 500;
  color: ${e.colors.text.primary};
`,ve=b.input`
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
`,Te=b.div`
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
`,Ee=b.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
`,ke=b.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${e.spacing.sm};
  margin: ${e.spacing.md} 0;
`,Be=b.div`
  border: 2px solid ${r=>r.$isSelected?e.colors.primary:e.colors.border};
  border-radius: ${e.borderRadius.medium};
  padding: ${e.spacing.md};
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${r=>r.$isSelected?e.colors.background.highlight:e.colors.white};
`,Ne=b.div`
  background-color: ${e.colors.background.primary};
  border-radius: ${e.borderRadius.medium};
  padding: ${e.spacing.md};
  margin: ${e.spacing.md} 0;
  border-left: 4px solid ${e.colors.success};
`,Ae=b.div`
  border: 1px solid ${e.colors.border};
  border-radius: ${e.borderRadius.small};
  padding: 10px 12px;
  margin-bottom: ${e.spacing.md};
  background-color: ${e.colors.white};

  .StripeElement {
    width: 100%;
  }

  .StripeElement--focus {
    border-color: ${e.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`,Ie=(r,a,c,i)=>{const u=d.useCallback(s=>{if(!r)return{canDowngrade:!1,reason:i("Loading subscription information...")};const y=G(s)*1024*1024*1024,o=a<=y;if(s===0){const l=c<=5;if(!o&&!l)return{canDowngrade:!1,reason:i("Insufficient storage and too many albums (max 5 for free)")};if(o){if(!l)return{canDowngrade:!1,reason:i("Too many albums (free tier allows max 5 albums)")}}else return{canDowngrade:!1,reason:i("Insufficient storage capacity")};return{canDowngrade:!0}}return{canDowngrade:o,reason:o?void 0:i("Insufficient storage capacity")}},[r,a,c,i]),t=d.useCallback(()=>{if(!r)return[];const s=r.intNumberOfSubscriptions,f=[],y=(l,g=!1)=>{const w=G(l),$=X(l),P=u(l);f.push({id:l,price:l===0?i("Free"):i("US${{price}} / month",{price:$.toFixed(2)}),subscriptions:l,storageGB:w,isInsufficient:!P.canDowngrade,isCurrent:g,insufficientReason:P.reason})};y(s,!0);const o=s+2;for(let l=s+1;l<=o;l++)y(l,!1);return f.sort((l,g)=>l.subscriptions-g.subscriptions)},[r,u,i]);return{canDowngrade:u,generatePlans:t}},Re=({subscriptionInfo:r,calculatedBytesUsed:a,t:c,formatCurrency:i})=>{if(!r)return n.jsx(J,{children:n.jsxs("div",{style:{textAlign:"center",padding:e.spacing.lg},children:[n.jsx(V,{}),n.jsx("span",{style:{marginLeft:e.spacing.sm,color:e.colors.text.secondary},children:c("Loading account information...")})]})});const u=G(r.intNumberOfSubscriptions),t=a/(u*1024*1024*1024)*100,s=X(r.intNumberOfSubscriptions);return n.jsxs(J,{children:[n.jsxs(ie,{children:[n.jsx("strong",{children:n.jsx("span",{children:q(u*1024*1024*1024)})}),n.jsx("span",{children:r.intNumberOfSubscriptions===0?c("Free"):i(s)})]}),n.jsxs(ie,{children:[n.jsx("span",{children:c("Used: {{used}}",{used:q(a)})}),n.jsx("span",{children:c("Total: {{total}}",{total:q(u*1024*1024*1024)})})]}),n.jsx(be,{children:n.jsx(Se,{$percentage:t})})]})},_e=({customGB:r,onCustomGBChange:a,subscriptionInfo:c,calculatedBytesUsed:i,albumCount:u,t,formatCurrency:s})=>{const f=()=>{if(!r||isNaN(parseFloat(r))||!c)return"";const o=parseFloat(r),l=c.intNumberOfSubscriptions;if(o<=0)return n.jsx("span",{style:{color:e.colors.danger},children:t("Please enter a positive number")});if(o<10)return A(10,u)===l?n.jsx("span",{style:{color:e.colors.text.secondary},children:t("Current Plan")}):n.jsx("span",{style:{color:e.colors.warning},children:t("Minimum: 10 GB")});const g=Q(i);if(o<g)return n.jsx("span",{style:{color:e.colors.danger,fontWeight:"bold"},children:t("Error: You are using {{used}}",{used:q(i)})});const w=A(o,u),$=G(w),P=X(w);return w===l?n.jsx("span",{style:{color:e.colors.text.secondary},children:t("Current Plan")}):w===0?n.jsx("span",{style:{color:e.colors.success,fontWeight:"bold"},children:t("10 GB - Free")}):n.jsx("span",{style:{color:e.colors.primary,fontWeight:"bold"},children:t("{{gb}} GB - {{price}} / month",{gb:$,price:s(P)})})},y=r&&!isNaN(parseFloat(r))&&c&&parseFloat(r)<Q(i);return n.jsxs("div",{style:{marginTop:e.spacing.lg},children:[n.jsx(Z,{style:{fontWeight:"bold"},children:t("Number of GB Needed:")}),n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:e.spacing.sm,marginTop:e.spacing.sm},children:[n.jsx(ve,{type:"number",min:"1",step:"1",inputMode:"numeric",placeholder:t("e.g. 50"),value:r,onChange:o=>a(o.target.value),style:{width:"120px",borderColor:y?e.colors.danger:e.colors.border}}),n.jsx("span",{style:{fontSize:"14px",color:e.colors.text.secondary,minWidth:"200px"},children:f()})]}),y&&n.jsx("div",{style:{marginTop:e.spacing.sm,padding:e.spacing.sm,backgroundColor:"#ffebee",borderRadius:e.borderRadius.small,border:`1px solid ${e.colors.danger}`,fontSize:"12px",color:e.colors.danger},children:t("This capacity is insufficient for your current usage. Please select a larger capacity or delete some files first.")})]})},ze=({plans:r,selectedTier:a,isPlanSelected:c,customGB:i,onPlanSelect:u,t})=>n.jsx(we,{children:r.map(s=>n.jsxs($e,{$isSelected:c&&a===s.subscriptions&&!i&&!s.isInsufficient,$isInsufficient:s.isInsufficient,onClick:()=>u(s),children:[n.jsxs(Ce,{children:[t("{{gb}} GB",{gb:s.storageGB}),s.subscriptions===0&&n.jsxs("span",{style:{marginLeft:"8px",fontSize:"12px",color:e.colors.text.secondary,fontWeight:"normal"},children:["(",t("Max 5 albums"),")"]}),s.isCurrent&&n.jsxs("span",{style:{marginLeft:"8px",fontSize:"12px",color:e.colors.primary,fontWeight:"normal"},children:["(",t("Current"),")"]})]}),n.jsx(Pe,{style:{color:s.isInsufficient?e.colors.text.secondary:e.colors.primary},children:s.price}),s.isInsufficient&&n.jsxs(n.Fragment,{children:[n.jsx("div",{style:{fontSize:"12px",color:e.colors.danger,fontWeight:"bold",marginTop:"8px"},children:s.insufficientReason||t("Insufficient Capacity")}),n.jsx(je,{children:"⚠️"})]})]},s.id))}),Fe=({selectedMethod:r,onMethodSelect:a,amount:c,currency:i="usd",userCountry:u="US",t})=>{var y;const f=[{id:"card",name:t("Credit Card"),icon:"💳"},{id:"alipay",name:t("Alipay"),icon:"🇨🇳"},{id:"wechat_pay",name:t("WeChat Pay"),icon:"💬"},{id:"klarna",name:t("Klarna"),icon:"🛍️"},{id:"ideal",name:t("iDEAL"),icon:"🇳🇱"},{id:"sofort",name:t("SOFORT"),icon:"🏦"},{id:"bancontact",name:t("Bancontact"),icon:"🇧🇪"},{id:"giropay",name:t("Giropay"),icon:"🇩🇪"},{id:"eps",name:t("EPS"),icon:"🇦🇹"},{id:"p24",name:t("Przelewy24"),icon:"🇵🇱"}].filter(o=>{const l=Y(o.id);return!(l.minimumAmount&&c<l.minimumAmount||l.supportedCountries&&!l.supportedCountries.includes(u)||l.supportedCurrencies&&!l.supportedCurrencies.includes(i.toLowerCase()))});return n.jsxs(ae,{children:[n.jsx(Z,{children:t("Payment Method")}),n.jsx(ke,{children:f.map(o=>{const l=Y(o.id);return n.jsxs(Be,{$isSelected:r===o.id,onClick:()=>a(o.id),children:[n.jsx("div",{style:{fontSize:"24px",marginBottom:e.spacing.xs},children:o.icon}),n.jsx("div",{style:{fontSize:"12px",fontWeight:"500"},children:o.name}),l.description&&n.jsx("div",{style:{fontSize:"10px",color:e.colors.text.secondary,marginTop:"4px"},children:t(l.description)})]},o.id)})}),((y=Y(r))==null?void 0:y.redirects)&&n.jsx("div",{style:{fontSize:"12px",color:e.colors.text.secondary,textAlign:"center",marginTop:e.spacing.sm,fontStyle:"italic"},children:t("You will be redirected to complete this payment")})]})},Me=({proRataInfo:r,isUpgrade:a,t:c,formatCurrency:i})=>!r||!a?null:n.jsxs(Ne,{children:[n.jsx("div",{style:{fontWeight:"bold",marginBottom:e.spacing.sm,color:e.colors.success},children:c("✓ Today's Charge Calculation")}),n.jsxs("div",{style:{fontSize:"14px",color:e.colors.text.secondary},children:[n.jsx("div",{children:c("Current plan credit: {{credit}}",{credit:i(r.proRataCredit)})}),n.jsx("div",{children:c("New plan charge: {{charge}}",{charge:i(r.proRataCharge)})}),n.jsx("div",{style:{fontWeight:"bold",marginTop:e.spacing.xs,color:e.colors.text.primary},children:r.netAmount>0?c("Amount due today: {{amount}}",{amount:i(r.netAmount)}):c("No charge today (credit covers upgrade)")}),n.jsx("div",{style:{fontSize:"12px",marginTop:e.spacing.xs},children:c("({{days}} days remaining in billing cycle)",{days:r.daysRemainingInCycle})})]})]}),De=({showStripe:r,loading:a,selectedTier:c,customGB:i,albumCount:u,subscriptionInfo:t,onClose:s,onPaymentSuccess:f,setLoading:y,t:o,formatCurrency:l})=>{const[g,w]=d.useState("card"),[$,P]=d.useState(null),[S,z]=d.useState(null),[p,k]=d.useState(null),{window:v,document:j,isClient:T}=pe(),{userCountry:H}=oe(),F=me(),B=i&&!isNaN(parseFloat(i))?A(parseFloat(i),u):c,W=G(B),M=X(B),I=(t==null?void 0:t.intNumberOfSubscriptions)||0,E=B>I;d.useEffect(()=>{r&&!S&&T&&v&&j&&(async()=>{try{const m=await _.initializeStripe("pk_live_51O77MNA5szNEcsv6LqXfWX0BY2V8mBwAXnaBHcmdwsBHUaeXlQjlqRq3ELWFaycPzQvCRYOyz3sg3x2EkZ7ifRnR00QewJDIRL",v,j);if(z(m),g==="card"){const R=m.elements().create("card",{style:{base:{fontSize:"16px",color:"#333","::placeholder":{color:"#aab7c4"}}}});k(R),setTimeout(()=>{j.getElementById("card-element")&&R.mount("#card-element")},100)}}catch(m){console.error("Failed to initialize Stripe:",m)}})()},[r,S,g,T,v,j]),d.useEffect(()=>{if(S&&g==="card"&&!p&&T&&j){const m=S.elements().create("card",{style:{base:{fontSize:"16px",color:"#333","::placeholder":{color:"#aab7c4"}}}});k(m),setTimeout(()=>{j.getElementById("card-element")&&m.mount("#card-element")},100)}else g!=="card"&&p&&(p.unmount(),k(null))},[g,S,p,T,j]),d.useEffect(()=>{r&&E&&t?(async()=>{try{if(t.intNumberOfSubscriptions>0){const m=await _.createPaymentIntentWithProration(B,[g]);P(m.proration)}else P(null)}catch(m){console.error("Failed to get proration info:",m),P(null)}})():P(null)},[r,E,I,B,t,g]),d.useEffect(()=>()=>{p&&p.unmount()},[p]),d.useEffect(()=>{r&&(async()=>{if(!T||!v||!j)return;const m=new URLSearchParams(v.location.search),N=m.get("payment_return"),R=m.get("payment_intent_client_secret");if(N==="true"&&R&&S)try{y(!0);const{paymentIntent:D}=await S.retrievePaymentIntent(R);if(D.status==="succeeded"){const O=F.getItem("pendingSubscriptionTier");if(O){const L=I>0&&parseInt(O)>I?"create_prorations":"none";await _.updateSubscription(parseInt(O),L),F.removeItem("pendingSubscriptionTier");const C=v.location.href.split("?")[0];v.history.replaceState({},j.title||"",C),f()}}else D.status==="requires_payment_method"&&alert(o("Payment failed. Please try again with a different payment method."))}catch{alert(o("There was an issue processing your payment. Please contact support."))}finally{y(!1)}})()},[r,S,I,f,y,o,T,v,j,F]);const x=async()=>{var h;y(!0);try{let m;if(i&&!isNaN(parseFloat(i))){const U=parseFloat(i);if(U<10){alert(o("Minimum storage capacity is 10 GB")),y(!1);return}m=A(U,u)}else m=c;const N=(t==null?void 0:t.intNumberOfSubscriptions)||0,R=m>N;(h=Y(g))!=null&&h.redirects&&F.setItem("pendingSubscriptionTier",m.toString());const D=await _.createPaymentIntentWithProration(m,[g]);if(!S)throw new Error("Stripe not properly initialized");const O=await _.confirmPayment(S,g,D.clientSecret,p||void 0,v),{error:L,paymentIntent:C}=O;if(L)throw new Error(L.message);if((C==null?void 0:C.status)==="succeeded"){const U=N>0&&R?"create_prorations":"none";await _.updateSubscription(m,U),y(!1),f()}else if((C==null?void 0:C.status)==="requires_action"||(C==null?void 0:C.status)==="requires_source_action")y(!1);else if((C==null?void 0:C.status)==="processing")y(!1),alert(o("Payment is being processed. You will receive confirmation once completed.")),s();else throw new Error("Payment was not successful")}catch{y(!1),alert(o("Payment failed. Please try again."))}};return r?n.jsxs(n.Fragment,{children:[n.jsx(Ee,{onClick:()=>!a&&s()}),n.jsxs(Te,{children:[n.jsxs("div",{style:{textAlign:"center",marginBottom:e.spacing.lg},children:[n.jsx("h3",{style:{margin:0,marginBottom:e.spacing.sm},children:E?o("Upgrade to {{gb}} GB",{gb:W}):o("Change to {{gb}} GB",{gb:W})}),n.jsxs("div",{style:{fontSize:"24px",fontWeight:"bold",color:e.colors.primary},children:[l(M)," ",o("/ month")]}),E&&$&&t&&t.intNumberOfSubscriptions>0&&$.netAmount>0&&n.jsx("div",{style:{fontSize:"14px",color:e.colors.text.secondary,marginTop:e.spacing.sm,fontStyle:"italic"},children:o("{{amount}} due today (with pro-rata credit)",{amount:l($.netAmount)})}),n.jsx("div",{style:{fontSize:"12px",color:e.colors.text.secondary,marginTop:e.spacing.md,padding:e.spacing.sm,backgroundColor:e.colors.background.primary,borderRadius:e.borderRadius.small,border:`1px solid ${e.colors.border}`},children:o("You will be automatically billed {{amount}} monthly on this payment method unless you change it.",{amount:l(M)})})]}),n.jsx(Me,{proRataInfo:$,isUpgrade:E,t:o,formatCurrency:l}),n.jsx(Fe,{selectedMethod:g,onMethodSelect:w,amount:M,currency:"usd",userCountry:H,t:o}),g==="card"&&n.jsxs(ae,{children:[n.jsx(Z,{children:o("Card Information")}),n.jsx(Ae,{children:n.jsx("div",{id:"card-element"})})]}),(g==="alipay"||g==="wechat_pay")&&n.jsxs("div",{style:{padding:e.spacing.lg,backgroundColor:e.colors.background.primary,borderRadius:e.borderRadius.medium,textAlign:"center",margin:`${e.spacing.md} 0`},children:[n.jsx("div",{style:{fontSize:"48px",marginBottom:e.spacing.md},children:g==="alipay"?"🇨🇳":"💬"}),n.jsx("div",{style:{fontWeight:"bold",marginBottom:e.spacing.sm},children:o(g==="alipay"?"Alipay Payment":"WeChat Pay")}),n.jsx("div",{style:{fontSize:"14px",color:e.colors.text.secondary},children:o(g==="alipay"?"You will be redirected to complete payment":"Scan QR code with WeChat to complete payment")})]}),n.jsxs("div",{style:{textAlign:"center",marginTop:e.spacing.lg},children:[n.jsxs(K,{onClick:x,disabled:a||g==="card"&&!p,$size:"large",children:[a&&n.jsx(V,{}),a?o("Processing..."):E&&$&&t&&t.intNumberOfSubscriptions>0&&$.netAmount>0?o("Pay {{amount}} Today",{amount:l($.netAmount)}):E&&$&&t&&t.intNumberOfSubscriptions>0&&$.netAmount===0?o("Start Subscription (No charge today)"):E?o("Start {{amount}}/month Subscription",{amount:l(M)}):o("Confirm Change")]}),n.jsx(K,{$variant:"secondary",onClick:s,disabled:a,children:o("Cancel")})]}),n.jsx("div",{style:{marginTop:e.spacing.lg,padding:e.spacing.md,backgroundColor:e.colors.background.primary,borderRadius:e.borderRadius.small,textAlign:"center",fontSize:"12px",color:e.colors.text.secondary},children:o("🔒 Secure payment powered by Stripe")})]})]}):null},Oe=()=>{const{t:r,language:a}=le(),c=de(a)==="rtl",{formatCurrency:i}=oe(),{folders:u,subscriptionInfo:t,calculatedBytesUsed:s}=ue(x=>console.log(x)),f=u.length,y=t!==null,[o,l]=d.useState(0),[g,w]=d.useState(!1),[$,P]=d.useState(!1),[S,z]=d.useState(!1),[p,k]=d.useState("");d.useEffect(()=>{t&&o===0&&l(t.intNumberOfSubscriptions)},[t,o]);const{canDowngrade:v,generatePlans:j}=Ie(t,s,f,r),T=d.useMemo(()=>y?j():[],[y,j]),H=d.useCallback(x=>{k(x);const h=parseFloat(x);if(x&&!isNaN(h)&&h>0){const m=A(Math.max(h,10),f);l(m),w(!1)}else x||(l((t==null?void 0:t.intNumberOfSubscriptions)||0),w(!1))},[t,f]),F=d.useCallback(x=>{if(x.isInsufficient)return;g&&o===x.subscriptions&&!p?(l((t==null?void 0:t.intNumberOfSubscriptions)||0),w(!1)):(l(x.subscriptions),w(!0)),k("")},[g,o,p,t]),B=d.useCallback(async()=>{z(!0);try{await _.updateSubscription(0,"none"),setTimeout(()=>{l(0),k(""),w(!1),z(!1),alert(r("Successfully scheduled downgrade to free plan at end of billing period."))},2e3)}catch{z(!1),alert(r("Error processing downgrade. Please try again."))}},[r]),W=d.useCallback(()=>{if(!t)return;let x;if(p&&!isNaN(parseFloat(p))){const m=parseFloat(p);if(m<=0){alert(r("Please enter a positive number"));return}if(m<10){alert(r("Minimum storage capacity is 10 GB"));return}x=A(m,f)}else x=o;if(x===t.intNumberOfSubscriptions)return;const h=v(x);if(!h.canDowngrade){alert(h.reason||r("Cannot select this plan"));return}x===0?typeof window<"u"&&window.confirm&&window.confirm(r("Are you sure you want to downgrade to the free plan? This will take effect at the end of your current billing period."))&&B():P(!0)},[t,p,o,f,v,B,r]),M=d.useCallback(()=>{P(!1),k(""),w(!1),alert(r("Payment successful! Your subscription has been updated.")),ee(re("my-albums.html"))},[r]),I=d.useCallback(()=>{if(!t)return r("Change Plan");const x=t.intNumberOfSubscriptions;let h;if(p&&!isNaN(parseFloat(p))){const m=parseFloat(p);if(m<Q(s))return r("Change Plan");h=A(Math.max(m,10),f)}else h=o;return h===x?r("Current Plan"):h>x?r("Upgrade (Pro-rata Credit)"):r(h===0?"Downgrade To Free (End of Period)":"Change Plan (Immediate)")},[t,p,o,s,f,r]),E=d.useMemo(()=>{var x;if(!t)return!0;if(p&&!isNaN(parseFloat(p))){const h=parseFloat(p);if(h<=0)return!0;const m=A(Math.max(h,10),f),N=t.intNumberOfSubscriptions;if(m===N||h<Q(s))return!0}return!g&&!p||o===t.intNumberOfSubscriptions&&!p||S||!!(p&&(isNaN(parseFloat(p))||parseFloat(p)<=0))||!!((x=T.find(h=>h.subscriptions===o))!=null&&x.isInsufficient)},[t,g,p,o,S,T,s,f]);return n.jsxs(he,{$isRTL:c,children:[n.jsx("div",{style:{marginBottom:e.spacing.md,textAlign:"right"},children:n.jsx(ye,{onClick:()=>ee(re("my-albums.html")),children:r("← Back To Albums")})}),n.jsx(Re,{subscriptionInfo:t,calculatedBytesUsed:s,t:r,formatCurrency:i}),n.jsxs(J,{children:[n.jsx(xe,{children:r("Select Storage Capacity")}),n.jsx("div",{style:{fontSize:"14px",color:e.colors.text.secondary,marginBottom:e.spacing.md,fontStyle:"italic"},children:r("Paid tiers have unlimited albums and are limited only by storage. Upgrades include pro-rata credit for unused time.")}),y?n.jsxs(n.Fragment,{children:[n.jsx(ze,{plans:T,selectedTier:o,isPlanSelected:g,customGB:p,onPlanSelect:F,t:r}),n.jsx(_e,{customGB:p,onCustomGBChange:H,subscriptionInfo:t,calculatedBytesUsed:s,albumCount:f,t:r,formatCurrency:i}),n.jsx("div",{style:{marginTop:e.spacing.lg,textAlign:"center"},children:n.jsxs(K,{onClick:W,disabled:E,children:[S&&n.jsx(V,{}),I()]})})]}):n.jsxs("div",{style:{textAlign:"center",padding:e.spacing.lg},children:[n.jsx(V,{}),n.jsx("span",{style:{marginLeft:e.spacing.sm,color:e.colors.text.secondary},children:r("Loading subscription plans...")})]})]}),n.jsx(De,{showStripe:$,loading:S,selectedTier:o,customGB:p,albumCount:f,subscriptionInfo:t,onClose:()=>P(!1),onPaymentSuccess:M,setLoading:z,t:r,formatCurrency:i})]})},Ge=()=>n.jsx(ce,{children:n.jsx(Oe,{})});typeof document<"u"&&typeof window<"u"&&se.createRoot(document.getElementById("root")).render(n.jsx(Ge,{}));
