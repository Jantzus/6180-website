import{d as x,R as de,j as n,I as ue,u as pe,r as l,a as ne,b as ie,h as oe,f as ae,g as me}from"./utils-2qV3otm0.js";import{u as ge}from"./useFolderManagement-E9I4aG1O.js";import"./types-CyPfckSQ.js";const fe=()=>{const[e,a]=l.useState(!1),[s,i]=l.useState(null),[p,t]=l.useState(null);return l.useEffect(()=>{a(!0),typeof window<"u"&&i(window),typeof document<"u"&&t(document)},[]),{isClient:e,window:s,document:p}},he=()=>{const[e,a]=l.useState(!1);l.useEffect(()=>{a(!0)},[]);const s=l.useCallback(t=>{if(!e||typeof localStorage>"u")return null;try{return localStorage.getItem(t)}catch{return null}},[e]),i=l.useCallback((t,c)=>{if(!(!e||typeof localStorage>"u"))try{localStorage.setItem(t,c)}catch{}},[e]),p=l.useCallback(t=>{if(!(!e||typeof localStorage>"u"))try{localStorage.removeItem(t)}catch{}},[e]);return{getItem:s,setItem:i,removeItem:p,isClient:e}},ce=()=>{const[e,a]=l.useState("US"),[s,i]=l.useState(!1);l.useEffect(()=>{if(i(!0),!(typeof Intl>"u"))try{const t=Intl.DateTimeFormat().resolvedOptions().timeZone;t.includes("Europe/Amsterdam")?a("NL"):t.includes("Europe/Berlin")?a("DE"):t.includes("Europe/Vienna")?a("AT"):t.includes("Europe/Brussels")?a("BE"):t.includes("Europe/Warsaw")?a("PL"):a("US")}catch{a("US")}},[]);const p=l.useCallback((t,c="USD")=>{if(!s||typeof Intl>"u")return`$${t.toFixed(2)}`;try{return new Intl.NumberFormat("en-US",{style:"currency",currency:c}).format(t)}catch{return`$${t.toFixed(2)}`}},[s]);return{userCountry:e,formatCurrency:p,isClient:s}},ye=()=>{const[e,a]=l.useState(!1);l.useEffect(()=>{a(!0)},[]);const s=l.useCallback(()=>{if(!e||typeof window>"u")return null;try{return new URLSearchParams(window.location.search)}catch{return null}},[e]),i=l.useCallback(()=>{if(!e||typeof window>"u")return null;try{return{origin:window.location.origin,pathname:window.location.pathname}}catch{return null}},[e]),p=l.useCallback(t=>{if(!(!e||typeof window>"u"||typeof document>"u"))try{window.history.replaceState({},document.title||"",t)}catch{}},[e]);return{getURLParams:s,getCurrentURL:i,replaceURL:p,isClient:e}},xe=`
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
`,be=`
  mutation UpdateSubscription($input: UpdateSubscriptionInput!) {
    changeMySubscription(updateSubscription: $input) {
      ... on SubscriptionInfo {
        id
        intNumberOfSubscriptions
        currentPeriodEndEpochTime
      }
    }
  }
`;class A{static async initializeStripe(a,s,i){if(!s||!i)throw new Error("Browser environment required for Stripe initialization");if(!s.Stripe){const p=i.createElement("script");p.src="https://js.stripe.com/v3/",i.head.appendChild(p),await new Promise(t=>{p.onload=t})}return s.Stripe(a)}static async createPaymentIntentWithProration(a,s=["card"]){var c,u;const i=await oe();if(!i)throw new Error("Authentication failed");const t=await(await fetch(ae,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({query:xe,variables:{input:{targetTier:a,currency:"usd",paymentMethodTypes:s}}})})).json();if(t.errors)throw console.error("GraphQL errors:",t.errors),new Error(((c=t.errors[0])==null?void 0:c.message)||"Failed to create payment intent");return(u=t.data)==null?void 0:u.changeMySubscription}static async updateSubscription(a,s="create_prorations"){var c,u;const i=await oe();if(!i)throw new Error("Authentication failed");const t=await(await fetch(ae,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({query:be,variables:{input:{newTier:a,prorationBehavior:s}}})})).json();if(t.errors)throw console.error("GraphQL errors:",t.errors),new Error(((c=t.errors[0])==null?void 0:c.message)||"Failed to update subscription");return(u=t.data)==null?void 0:u.changeMySubscription}static async confirmPayment(a,s,i,p,t){const c=t==null?void 0:t(),u=c?`${c.origin}${c.pathname}?payment_return=true`:"https://example.com/fallback";switch(s){case"card":if(!p)throw new Error("Card element not initialized");return await a.confirmCardPayment(i,{payment_method:{card:p}});case"alipay":return await a.confirmAlipayPayment(i,{return_url:u});case"wechat_pay":return await a.confirmWechatPayPayment(i,{payment_method_options:{wechat_pay:{client:"web"}}});case"klarna":return await a.confirmKlarnaPayment(i,{payment_method:{billing_details:{email:"customer@example.com"}},return_url:u});case"ideal":return await a.confirmIdealPayment(i,{payment_method:{ideal:{bank:"abn_amro"}},return_url:u});case"sofort":return await a.confirmSofortPayment(i,{payment_method:{sofort:{country:"DE"}},return_url:u});case"bancontact":return await a.confirmBancontactPayment(i,{payment_method:{billing_details:{name:"Customer Name"}},return_url:u});case"giropay":return await a.confirmGiropayPayment(i,{payment_method:{billing_details:{name:"Customer Name"}},return_url:u});case"eps":return await a.confirmEpsPayment(i,{payment_method:{eps:{bank:"arzte_und_apotheker_bank"}},return_url:u});case"p24":return await a.confirmP24Payment(i,{payment_method:{billing_details:{email:"customer@example.com"}},return_url:u});default:throw new Error(`Unsupported payment method: ${s}`)}}}const V=e=>e/(1024*1024*1024),Q=e=>{const a=e/1048576,s=e/(1024*1024*1024),i=e/(1024*1024*1024*1024);return i>=1?`${i.toFixed(1)} TB`:s>=1?`${s.toFixed(1)} GB`:`${Math.round(a)} MB`},U=e=>e<=1?10:e*10,J=e=>e===0?0:1+.75*(e-1),k=(e,a)=>e<=10?a<=5?0:1:Math.ceil(e/10),H=e=>({card:{requiresElement:!0,redirects:!1,description:"Credit or debit card"},alipay:{requiresElement:!1,redirects:!0,description:"Popular in China",minimumAmount:.5,supportedCurrencies:["usd","eur","gbp","cad","aud","sgd"]},wechat_pay:{requiresElement:!1,redirects:!1,description:"Popular in China",minimumAmount:.5,supportedCurrencies:["usd","cny"]},klarna:{requiresElement:!1,redirects:!0,description:"Buy now, pay later",minimumAmount:1,supportedCountries:["AT","BE","DK","FI","FR","DE","IT","NL","NO","ES","SE","GB","US"]},ideal:{requiresElement:!1,redirects:!0,description:"Dutch bank transfer",supportedCountries:["NL"],minimumAmount:.5},sofort:{requiresElement:!1,redirects:!0,description:"German bank transfer",supportedCountries:["DE","AT"],minimumAmount:.5},bancontact:{requiresElement:!1,redirects:!0,description:"Belgian bank transfer",supportedCountries:["BE"],minimumAmount:.5},giropay:{requiresElement:!1,redirects:!0,description:"German bank transfer",supportedCountries:["DE"],minimumAmount:.5},eps:{requiresElement:!1,redirects:!0,description:"Austrian bank transfer",supportedCountries:["AT"],minimumAmount:.5},p24:{requiresElement:!1,redirects:!0,description:"Polish bank transfer",supportedCountries:["PL"],minimumAmount:.5}})[e],r={colors:{primary:"#007bff",primaryDark:"#0056b3",success:"#4caf50",danger:"#e53935",warning:"#ff9800",white:"#fff",text:{primary:"#333",secondary:"#666"},background:{primary:"#f9fafb",card:"#fff",highlight:"#f0f7ff"},border:"#ddd",grayLight:"#e0e0e0"},spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px"},borderRadius:{small:"4px",medium:"8px"},boxShadow:{sm:"0 1px 2px rgba(0,0,0,0.06)",md:"0 1px 3px rgba(0,0,0,0.1)",lg:"0 4px 10px rgba(0,0,0,0.08)"}},we=x.div`
  padding: ${r.spacing.md};
  background-color: ${r.colors.background.primary};
  min-height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  direction: ${e=>e.$isRTL?"rtl":"ltr"};
  position: relative;
`,Se=x.button`
  background: transparent;
  border: 1px solid ${r.colors.primary};
  color: ${r.colors.primary};
  padding: 8px 16px;
  border-radius: ${r.borderRadius.medium};
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${r.colors.primary};
    color: ${r.colors.white};
  }
`,ee=x.div`
  background-color: ${r.colors.background.card};
  border-radius: ${r.borderRadius.medium};
  box-shadow: ${r.boxShadow.md};
  padding: ${r.spacing.lg};
  margin-bottom: ${r.spacing.lg};
`,$e=x.h2`
  font-size: 18px;
  margin: 0 0 ${r.spacing.md} 0;
  color: ${r.colors.text.primary};
`,Ce=x.div`
  background-color: ${r.colors.grayLight};
  border-radius: ${r.borderRadius.small};
  height: 20px;
  overflow: hidden;
  margin: ${r.spacing.md} 0;
`,Pe=x.div`
  height: 100%;
  background-color: ${e=>e.$percentage>90?r.colors.danger:e.$percentage>75?r.colors.warning:r.colors.primary};
  width: ${e=>Math.min(e.$percentage,100)}%;
  transition: width 0.3s ease;
`,se=x.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: ${r.colors.text.secondary};
`,je=x.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${r.spacing.md};
  margin-top: ${r.spacing.md};
`,ve=x.div`
  border: ${e=>e.$isInsufficient?`2px solid ${r.colors.danger}`:e.$isSelected?`2px solid ${r.colors.primary}`:`1px solid ${r.colors.grayLight}`};
  border-radius: ${r.borderRadius.medium};
  padding: ${r.spacing.md};
  cursor: ${e=>e.$isInsufficient?"not-allowed":"pointer"};
  transition: all 0.2s ease;
  background-color: ${e=>e.$isInsufficient?"#ffebee":e.$isSelected?r.colors.background.highlight:r.colors.white};
  opacity: ${e=>e.$isInsufficient?.7:1};
  position: relative;
`,Te=x.h3`
  margin: 0 0 ${r.spacing.sm} 0;
  font-size: 16px;
  color: ${r.colors.text.primary};
`,Ee=x.div`
  font-size: 18px;
  font-weight: bold;
  color: ${r.colors.primary};
  margin-bottom: ${r.spacing.sm};
`,ke=x.div`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: ${r.colors.danger};
  color: white;
  font-size: 10px;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 12px;
  white-space: nowrap;
  box-shadow: ${r.boxShadow.sm};
`,re=x.button`
  background-color: ${e=>e.$variant==="danger"?r.colors.danger:e.$variant==="secondary"?"transparent":e.$variant==="success"?r.colors.success:r.colors.primary};
  color: ${e=>e.$variant==="secondary"?r.colors.primary:r.colors.white};
  border: ${e=>e.$variant==="secondary"?`1px solid ${r.colors.primary}`:"none"};
  padding: ${e=>e.$size==="small"?"8px 16px":e.$size==="large"?"16px 32px":"12px 24px"};
  border-radius: ${r.borderRadius.medium};
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  font-size: ${e=>e.$size==="small"?"14px":e.$size==="large"?"18px":"16px"};
  font-weight: 500;
  transition: all 0.2s ease;
  opacity: ${e=>e.disabled?.6:1};
  margin-right: ${r.spacing.sm};

  &:hover:not(:disabled) {
    background-color: ${e=>e.$variant==="danger"?"#c62828":e.$variant==="secondary"?r.colors.background.highlight:e.$variant==="success"?"#388e3c":r.colors.primaryDark};
  }
`,X=x.div`
  border: 2px solid ${r.colors.grayLight};
  border-top: 2px solid ${r.colors.primary};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  display: inline-block;
  margin-right: ${r.spacing.sm};

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`,le=x.div`
  margin-bottom: ${r.spacing.md};
`,te=x.label`
  display: block;
  margin-bottom: ${r.spacing.sm};
  font-size: 14px;
  font-weight: 500;
  color: ${r.colors.text.primary};
`,Ne=x.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${r.colors.border};
  border-radius: ${r.borderRadius.small};
  font-size: 16px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${r.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`,Be=x.div`
  background-color: ${r.colors.white};
  border-radius: ${r.borderRadius.medium};
  box-shadow: ${r.boxShadow.lg};
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
    padding: ${r.spacing.lg};
  }
`,Ae=x.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
`,Ie=x.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${r.spacing.sm};
  margin: ${r.spacing.md} 0;
`,Re=x.div`
  border: 2px solid ${e=>e.$isSelected?r.colors.primary:r.colors.border};
  border-radius: ${r.borderRadius.medium};
  padding: ${r.spacing.md};
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${e=>e.$isSelected?r.colors.background.highlight:r.colors.white};
`,_e=x.div`
  background-color: ${r.colors.background.primary};
  border-radius: ${r.borderRadius.medium};
  padding: ${r.spacing.md};
  margin: ${r.spacing.md} 0;
  border-left: 4px solid ${r.colors.success};
`,ze=x.div`
  border: 1px solid ${r.colors.border};
  border-radius: ${r.borderRadius.small};
  padding: 10px 12px;
  margin-bottom: ${r.spacing.md};
  background-color: ${r.colors.white};

  .StripeElement {
    width: 100%;
  }

  .StripeElement--focus {
    border-color: ${r.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`,Fe=(e,a,s,i)=>{const p=l.useCallback(c=>{if(!e)return{canDowngrade:!1,reason:i("Loading subscription information...")};const y=U(c)*1024*1024*1024,o=a<=y;if(c===0){const d=s<=5;if(!o&&!d)return{canDowngrade:!1,reason:i("Insufficient storage and too many albums (max 5 for free)")};if(o){if(!d)return{canDowngrade:!1,reason:i("Too many albums (free tier allows max 5 albums)")}}else return{canDowngrade:!1,reason:i("Insufficient storage capacity")};return{canDowngrade:!0}}return{canDowngrade:o,reason:o?void 0:i("Insufficient storage capacity")}},[e,a,s,i]),t=l.useCallback(()=>{if(!e)return[];const c=e.intNumberOfSubscriptions,u=[],y=(d,g=!1)=>{const C=U(d),P=J(d),j=p(d);u.push({id:d,price:d===0?i("Free"):i("US${{price}} / month",{price:P.toFixed(2)}),subscriptions:d,storageGB:C,isInsufficient:!j.canDowngrade,isCurrent:g,insufficientReason:j.reason})};y(c,!0);const o=c+2;for(let d=c+1;d<=o;d++)y(d,!1);return u.sort((d,g)=>d.subscriptions-g.subscriptions)},[e,p,i]);return{canDowngrade:p,generatePlans:t}},Me=({subscriptionInfo:e,calculatedBytesUsed:a,t:s,formatCurrency:i})=>{if(!e)return n.jsx(ee,{children:n.jsxs("div",{style:{textAlign:"center",padding:r.spacing.lg},children:[n.jsx(X,{}),n.jsx("span",{style:{marginLeft:r.spacing.sm,color:r.colors.text.secondary},children:s("Loading account information...")})]})});const p=U(e.intNumberOfSubscriptions),t=a/(p*1024*1024*1024)*100,c=J(e.intNumberOfSubscriptions);return n.jsxs(ee,{children:[n.jsxs(se,{children:[n.jsx("strong",{children:n.jsx("span",{children:Q(p*1024*1024*1024)})}),n.jsx("span",{children:e.intNumberOfSubscriptions===0?s("Free"):i(c)})]}),n.jsxs(se,{children:[n.jsx("span",{children:s("Used: {{used}}",{used:Q(a)})}),n.jsx("span",{children:s("Total: {{total}}",{total:Q(p*1024*1024*1024)})})]}),n.jsx(Ce,{children:n.jsx(Pe,{$percentage:t})})]})},Oe=({customGB:e,onCustomGBChange:a,subscriptionInfo:s,calculatedBytesUsed:i,albumCount:p,t,formatCurrency:c})=>{const u=()=>{if(!e||isNaN(parseFloat(e))||!s)return"";const o=parseFloat(e),d=s.intNumberOfSubscriptions;if(o<=0)return n.jsx("span",{style:{color:r.colors.danger},children:t("Please enter a positive number")});if(o<10)return k(10,p)===d?n.jsx("span",{style:{color:r.colors.text.secondary},children:t("Current Plan")}):n.jsx("span",{style:{color:r.colors.warning},children:t("Minimum: 10 GB")});const g=V(i);if(o<g)return n.jsx("span",{style:{color:r.colors.danger,fontWeight:"bold"},children:t("Error: You are using {{used}}",{used:Q(i)})});const C=k(o,p),P=U(C),j=J(C);return C===d?n.jsx("span",{style:{color:r.colors.text.secondary},children:t("Current Plan")}):C===0?n.jsx("span",{style:{color:r.colors.success,fontWeight:"bold"},children:t("10 GB - Free")}):n.jsx("span",{style:{color:r.colors.primary,fontWeight:"bold"},children:t("{{gb}} GB - {{price}} / month",{gb:P,price:c(j)})})},y=e&&!isNaN(parseFloat(e))&&s&&parseFloat(e)<V(i);return n.jsxs("div",{style:{marginTop:r.spacing.lg},children:[n.jsx(te,{style:{fontWeight:"bold"},children:t("Number of GB Needed:")}),n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:r.spacing.sm,marginTop:r.spacing.sm},children:[n.jsx(Ne,{type:"number",min:"1",step:"1",inputMode:"numeric",placeholder:t("e.g. 50"),value:e,onChange:o=>a(o.target.value),style:{width:"120px",borderColor:y?r.colors.danger:r.colors.border}}),n.jsx("span",{style:{fontSize:"14px",color:r.colors.text.secondary,minWidth:"200px"},children:u()})]}),y&&n.jsx("div",{style:{marginTop:r.spacing.sm,padding:r.spacing.sm,backgroundColor:"#ffebee",borderRadius:r.borderRadius.small,border:`1px solid ${r.colors.danger}`,fontSize:"12px",color:r.colors.danger},children:t("This capacity is insufficient for your current usage. Please select a larger capacity or delete some files first.")})]})},De=({plans:e,selectedTier:a,isPlanSelected:s,customGB:i,onPlanSelect:p,t})=>n.jsx(je,{children:e.map(c=>n.jsxs(ve,{$isSelected:s&&a===c.subscriptions&&!i&&!c.isInsufficient,$isInsufficient:c.isInsufficient,onClick:()=>p(c),children:[n.jsxs(Te,{children:[t("{{gb}} GB",{gb:c.storageGB}),c.subscriptions===0&&n.jsxs("span",{style:{marginLeft:"8px",fontSize:"12px",color:r.colors.text.secondary,fontWeight:"normal"},children:["(",t("Max 5 albums"),")"]}),c.isCurrent&&n.jsxs("span",{style:{marginLeft:"8px",fontSize:"12px",color:r.colors.primary,fontWeight:"normal"},children:["(",t("Current"),")"]})]}),n.jsx(Ee,{style:{color:c.isInsufficient?r.colors.text.secondary:r.colors.primary},children:c.price}),c.isInsufficient&&n.jsxs(n.Fragment,{children:[n.jsx("div",{style:{fontSize:"12px",color:r.colors.danger,fontWeight:"bold",marginTop:"8px"},children:c.insufficientReason||t("Insufficient Capacity")}),n.jsx(ke,{children:"⚠️"})]})]},c.id))}),Le=({selectedMethod:e,onMethodSelect:a,amount:s,currency:i="usd",userCountry:p="US",t})=>{var y;const u=[{id:"card",name:t("Credit Card"),icon:"💳"},{id:"alipay",name:t("Alipay"),icon:"🇨🇳"},{id:"wechat_pay",name:t("WeChat Pay"),icon:"💬"},{id:"klarna",name:t("Klarna"),icon:"🛍️"},{id:"ideal",name:t("iDEAL"),icon:"🇳🇱"},{id:"sofort",name:t("SOFORT"),icon:"🏦"},{id:"bancontact",name:t("Bancontact"),icon:"🇧🇪"},{id:"giropay",name:t("Giropay"),icon:"🇩🇪"},{id:"eps",name:t("EPS"),icon:"🇦🇹"},{id:"p24",name:t("Przelewy24"),icon:"🇵🇱"}].filter(o=>{const d=H(o.id);return!(d.minimumAmount&&s<d.minimumAmount||d.supportedCountries&&!d.supportedCountries.includes(p)||d.supportedCurrencies&&!d.supportedCurrencies.includes(i.toLowerCase()))});return n.jsxs(le,{children:[n.jsx(te,{children:t("Payment Method")}),n.jsx(Ie,{children:u.map(o=>{const d=H(o.id);return n.jsxs(Re,{$isSelected:e===o.id,onClick:()=>a(o.id),children:[n.jsx("div",{style:{fontSize:"24px",marginBottom:r.spacing.xs},children:o.icon}),n.jsx("div",{style:{fontSize:"12px",fontWeight:"500"},children:o.name}),d.description&&n.jsx("div",{style:{fontSize:"10px",color:r.colors.text.secondary,marginTop:"4px"},children:t(d.description)})]},o.id)})}),((y=H(e))==null?void 0:y.redirects)&&n.jsx("div",{style:{fontSize:"12px",color:r.colors.text.secondary,textAlign:"center",marginTop:r.spacing.sm,fontStyle:"italic"},children:t("You will be redirected to complete this payment")})]})},Ge=({proRataInfo:e,isUpgrade:a,t:s,formatCurrency:i})=>!e||!a?null:n.jsxs(_e,{children:[n.jsx("div",{style:{fontWeight:"bold",marginBottom:r.spacing.sm,color:r.colors.success},children:s("✓ Today's Charge Calculation")}),n.jsxs("div",{style:{fontSize:"14px",color:r.colors.text.secondary},children:[n.jsx("div",{children:s("Current plan credit: {{credit}}",{credit:i(e.proRataCredit)})}),n.jsx("div",{children:s("New plan charge: {{charge}}",{charge:i(e.proRataCharge)})}),n.jsx("div",{style:{fontWeight:"bold",marginTop:r.spacing.xs,color:r.colors.text.primary},children:e.netAmount>0?s("Amount due today: {{amount}}",{amount:i(e.netAmount)}):s("No charge today (credit covers upgrade)")}),n.jsx("div",{style:{fontSize:"12px",marginTop:r.spacing.xs},children:s("({{days}} days remaining in billing cycle)",{days:e.daysRemainingInCycle})})]})]}),Ue=({showStripe:e,loading:a,selectedTier:s,customGB:i,albumCount:p,subscriptionInfo:t,onClose:c,onPaymentSuccess:u,setLoading:y,t:o,formatCurrency:d})=>{const[g,C]=l.useState("card"),[P,j]=l.useState(null),[S,I]=l.useState(null),[m,E]=l.useState(null),{window:R,document:v,isClient:T}=fe(),{userCountry:K}=ce(),_=he(),{getURLParams:O,getCurrentURL:D,replaceURL:W}=ye(),N=i&&!isNaN(parseFloat(i))?k(parseFloat(i),p):s,q=U(N),f=J(N),h=(t==null?void 0:t.intNumberOfSubscriptions)||0,w=N>h;l.useEffect(()=>{e&&!S&&T&&R&&v&&(async()=>{try{const b=await A.initializeStripe("pk_live_51O77MNA5szNEcsv6LqXfWX0BY2V8mBwAXnaBHcmdwsBHUaeXlQjlqRq3ELWFaycPzQvCRYOyz3sg3x2EkZ7ifRnR00QewJDIRL",R,v);if(I(b),g==="card"){const B=b.elements().create("card",{style:{base:{fontSize:"16px",color:"#333","::placeholder":{color:"#aab7c4"}}}});E(B),setTimeout(()=>{v.getElementById("card-element")&&B.mount("#card-element")},100)}}catch(b){console.error("Failed to initialize Stripe:",b)}})()},[e,S,g,T,R,v]),l.useEffect(()=>{if(S&&g==="card"&&!m&&T&&v){const b=S.elements().create("card",{style:{base:{fontSize:"16px",color:"#333","::placeholder":{color:"#aab7c4"}}}});E(b),setTimeout(()=>{v.getElementById("card-element")&&b.mount("#card-element")},100)}else g!=="card"&&m&&(m.unmount(),E(null))},[g,S,m,T,v]),l.useEffect(()=>{e&&w&&t?(async()=>{try{if(t.intNumberOfSubscriptions>0){const b=await A.createPaymentIntentWithProration(N,[g]);j(b.proration)}else j(null)}catch(b){console.error("Failed to get proration info:",b),j(null)}})():j(null)},[e,w,h,N,t,g]),l.useEffect(()=>()=>{m&&m.unmount()},[m]),l.useEffect(()=>{e&&(async()=>{if(!T)return;const b=O();if(!b)return;const F=b.get("payment_return"),B=b.get("payment_intent_client_secret");if(F==="true"&&B&&S)try{y(!0);const{paymentIntent:L}=await S.retrievePaymentIntent(B);if(L.status==="succeeded"){const G=_.getItem("pendingSubscriptionTier");if(G){const Y=h>0&&parseInt(G)>h?"create_prorations":"none";await A.updateSubscription(parseInt(G),Y),_.removeItem("pendingSubscriptionTier");const $=D();if($){const M=`${$.origin}${$.pathname}`;W(M)}u()}}else L.status==="requires_payment_method"&&alert(o("Payment failed. Please try again with a different payment method."))}catch{alert(o("There was an issue processing your payment. Please contact support."))}finally{y(!1)}})()},[e,S,h,u,y,o,T,O,D,W,_]);const Z=async()=>{var z;y(!0);try{let b;if(i&&!isNaN(parseFloat(i))){const M=parseFloat(i);if(M<10){alert(o("Minimum storage capacity is 10 GB")),y(!1);return}b=k(M,p)}else b=s;const F=(t==null?void 0:t.intNumberOfSubscriptions)||0,B=b>F;(z=H(g))!=null&&z.redirects&&_.setItem("pendingSubscriptionTier",b.toString());const L=await A.createPaymentIntentWithProration(b,[g]);if(!S)throw new Error("Stripe not properly initialized");const G=await A.confirmPayment(S,g,L.clientSecret,m||void 0,D),{error:Y,paymentIntent:$}=G;if(Y)throw new Error(Y.message);if(($==null?void 0:$.status)==="succeeded"){const M=F>0&&B?"create_prorations":"none";await A.updateSubscription(b,M),y(!1),u()}else if(($==null?void 0:$.status)==="requires_action"||($==null?void 0:$.status)==="requires_source_action")y(!1);else if(($==null?void 0:$.status)==="processing")y(!1),alert(o("Payment is being processed. You will receive confirmation once completed.")),c();else throw new Error("Payment was not successful")}catch{y(!1),alert(o("Payment failed. Please try again."))}};return e?n.jsxs(n.Fragment,{children:[n.jsx(Ae,{onClick:()=>!a&&c()}),n.jsxs(Be,{children:[n.jsxs("div",{style:{textAlign:"center",marginBottom:r.spacing.lg},children:[n.jsx("h3",{style:{margin:0,marginBottom:r.spacing.sm},children:w?o("Upgrade to {{gb}} GB",{gb:q}):o("Change to {{gb}} GB",{gb:q})}),n.jsxs("div",{style:{fontSize:"24px",fontWeight:"bold",color:r.colors.primary},children:[d(f)," ",o("/ month")]}),w&&P&&t&&t.intNumberOfSubscriptions>0&&P.netAmount>0&&n.jsx("div",{style:{fontSize:"14px",color:r.colors.text.secondary,marginTop:r.spacing.sm,fontStyle:"italic"},children:o("{{amount}} due today (with pro-rata credit)",{amount:d(P.netAmount)})}),n.jsx("div",{style:{fontSize:"12px",color:r.colors.text.secondary,marginTop:r.spacing.md,padding:r.spacing.sm,backgroundColor:r.colors.background.primary,borderRadius:r.borderRadius.small,border:`1px solid ${r.colors.border}`},children:o("You will be automatically billed {{amount}} monthly on this payment method unless you change it.",{amount:d(f)})})]}),n.jsx(Ge,{proRataInfo:P,isUpgrade:w,t:o,formatCurrency:d}),n.jsx(Le,{selectedMethod:g,onMethodSelect:C,amount:f,currency:"usd",userCountry:K,t:o}),g==="card"&&n.jsxs(le,{children:[n.jsx(te,{children:o("Card Information")}),n.jsx(ze,{children:n.jsx("div",{id:"card-element"})})]}),(g==="alipay"||g==="wechat_pay")&&n.jsxs("div",{style:{padding:r.spacing.lg,backgroundColor:r.colors.background.primary,borderRadius:r.borderRadius.medium,textAlign:"center",margin:`${r.spacing.md} 0`},children:[n.jsx("div",{style:{fontSize:"48px",marginBottom:r.spacing.md},children:g==="alipay"?"🇨🇳":"💬"}),n.jsx("div",{style:{fontWeight:"bold",marginBottom:r.spacing.sm},children:o(g==="alipay"?"Alipay Payment":"WeChat Pay")}),n.jsx("div",{style:{fontSize:"14px",color:r.colors.text.secondary},children:o(g==="alipay"?"You will be redirected to complete payment":"Scan QR code with WeChat to complete payment")})]}),n.jsxs("div",{style:{textAlign:"center",marginTop:r.spacing.lg},children:[n.jsxs(re,{onClick:Z,disabled:a||g==="card"&&!m,$size:"large",children:[a&&n.jsx(X,{}),a?o("Processing..."):w&&P&&t&&t.intNumberOfSubscriptions>0&&P.netAmount>0?o("Pay {{amount}} Today",{amount:d(P.netAmount)}):w&&P&&t&&t.intNumberOfSubscriptions>0&&P.netAmount===0?o("Start Subscription (No charge today)"):w?o("Start {{amount}}/month Subscription",{amount:d(f)}):o("Confirm Change")]}),n.jsx(re,{$variant:"secondary",onClick:c,disabled:a,children:o("Cancel")})]}),n.jsx("div",{style:{marginTop:r.spacing.lg,padding:r.spacing.md,backgroundColor:r.colors.background.primary,borderRadius:r.borderRadius.small,textAlign:"center",fontSize:"12px",color:r.colors.text.secondary},children:o("🔒 Secure payment powered by Stripe")})]})]}):null},We=()=>{const{t:e,language:a}=pe(),s=me(a)==="rtl",{formatCurrency:i}=ce(),{folders:p,subscriptionInfo:t,calculatedBytesUsed:c}=ge(f=>console.log(f)),u=p.length,y=t!==null,[o,d]=l.useState(0),[g,C]=l.useState(!1),[P,j]=l.useState(!1),[S,I]=l.useState(!1),[m,E]=l.useState("");l.useEffect(()=>{t&&o===0&&d(t.intNumberOfSubscriptions)},[t,o]);const{canDowngrade:R,generatePlans:v}=Fe(t,c,u,e),T=l.useMemo(()=>y?v():[],[y,v]),K=l.useCallback(f=>{E(f);const h=parseFloat(f);if(f&&!isNaN(h)&&h>0){const w=k(Math.max(h,10),u);d(w),C(!1)}else f||(d((t==null?void 0:t.intNumberOfSubscriptions)||0),C(!1))},[t,u]),_=l.useCallback(f=>{if(f.isInsufficient)return;g&&o===f.subscriptions&&!m?(d((t==null?void 0:t.intNumberOfSubscriptions)||0),C(!1)):(d(f.subscriptions),C(!0)),E("")},[g,o,m,t]),O=l.useCallback(async()=>{I(!0);try{await A.updateSubscription(0,"none"),setTimeout(()=>{d(0),E(""),C(!1),I(!1),alert(e("Successfully scheduled downgrade to free plan at end of billing period."))},2e3)}catch{I(!1),alert(e("Error processing downgrade. Please try again."))}},[e]),D=l.useCallback(()=>{if(!t)return;let f;if(m&&!isNaN(parseFloat(m))){const w=parseFloat(m);if(w<=0){alert(e("Please enter a positive number"));return}if(w<10){alert(e("Minimum storage capacity is 10 GB"));return}f=k(w,u)}else f=o;if(f===t.intNumberOfSubscriptions)return;const h=R(f);if(!h.canDowngrade){alert(h.reason||e("Cannot select this plan"));return}f===0?typeof window<"u"&&window.confirm&&window.confirm(e("Are you sure you want to downgrade to the free plan? This will take effect at the end of your current billing period."))&&O():j(!0)},[t,m,o,u,R,O,e]),W=l.useCallback(()=>{j(!1),E(""),C(!1),alert(e("Payment successful! Your subscription has been updated.")),ne(ie("my-albums.html"))},[e]),N=l.useCallback(()=>{if(!t)return e("Change Plan");const f=t.intNumberOfSubscriptions;let h;if(m&&!isNaN(parseFloat(m))){const w=parseFloat(m);if(w<V(c))return e("Change Plan");h=k(Math.max(w,10),u)}else h=o;return h===f?e("Current Plan"):h>f?e("Upgrade (Pro-rata Credit)"):e(h===0?"Downgrade To Free (End of Period)":"Change Plan (Immediate)")},[t,m,o,c,u,e]),q=l.useMemo(()=>{var f;if(!t)return!0;if(m&&!isNaN(parseFloat(m))){const h=parseFloat(m);if(h<=0)return!0;const w=k(Math.max(h,10),u),Z=t.intNumberOfSubscriptions;if(w===Z||h<V(c))return!0}return!g&&!m||o===t.intNumberOfSubscriptions&&!m||S||!!(m&&(isNaN(parseFloat(m))||parseFloat(m)<=0))||!!((f=T.find(h=>h.subscriptions===o))!=null&&f.isInsufficient)},[t,g,m,o,S,T,c,u]);return n.jsxs(we,{$isRTL:s,children:[n.jsx("div",{style:{marginBottom:r.spacing.md,textAlign:s?"right":"left"},children:n.jsx(Se,{onClick:()=>ne(ie("my-albums.html")),children:e("← Back To Albums")})}),n.jsx(Me,{subscriptionInfo:t,calculatedBytesUsed:c,t:e,formatCurrency:i}),n.jsxs(ee,{children:[n.jsx($e,{children:e("Select Storage Capacity")}),n.jsx("div",{style:{fontSize:"14px",color:r.colors.text.secondary,marginBottom:r.spacing.md,fontStyle:"italic"},children:e("Paid tiers have unlimited albums and are limited only by storage. Upgrades include pro-rata credit for unused time.")}),y?n.jsxs(n.Fragment,{children:[n.jsx(De,{plans:T,selectedTier:o,isPlanSelected:g,customGB:m,onPlanSelect:_,t:e}),n.jsx(Oe,{customGB:m,onCustomGBChange:K,subscriptionInfo:t,calculatedBytesUsed:c,albumCount:u,t:e,formatCurrency:i}),n.jsx("div",{style:{marginTop:r.spacing.lg,textAlign:"center"},children:n.jsxs(re,{onClick:D,disabled:q,children:[S&&n.jsx(X,{}),N()]})})]}):n.jsxs("div",{style:{textAlign:"center",padding:r.spacing.lg},children:[n.jsx(X,{}),n.jsx("span",{style:{marginLeft:r.spacing.sm,color:r.colors.text.secondary},children:e("Loading subscription plans...")})]})]}),n.jsx(Ue,{showStripe:P,loading:S,selectedTier:o,customGB:m,albumCount:u,subscriptionInfo:t,onClose:()=>j(!1),onPaymentSuccess:W,setLoading:I,t:e,formatCurrency:i})]})},qe=()=>n.jsx(ue,{children:n.jsx(We,{})});if(typeof document<"u"){const e=document.getElementById("root");e&&de.createRoot(e).render(n.jsx(qe,{}))}
