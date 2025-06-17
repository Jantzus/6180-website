import{d as h,R as ne,j as t,I as ie,u as oe,a as b,r as J,b as K,h as Z,f as ee,g as ae,q as M}from"./utils-CPz2uLz2.js";import{u as se}from"./utils-CvyTYgBj.js";import"./types-B2_92tNb.js";const ce=`
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
`,le=`
  mutation UpdateSubscription($input: UpdateSubscriptionInput!) {
    changeMySubscription(updateSubscription: $input) {
      ... on SubscriptionInfo {
        id
        intNumberOfSubscriptions
        currentPeriodEndEpochTime
      }
    }
  }
`;class _{static async initializeStripe(c){if(!window.Stripe){const d=document.createElement("script");d.src="https://js.stripe.com/v3/",document.head.appendChild(d),await new Promise(i=>{d.onload=i})}return window.Stripe(c)}static async createPaymentIntentWithProration(c,d=["card"]){var l,y;const i=await Z();if(!i)throw new Error("Authentication failed");const n=await(await fetch(ee,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({query:ce,variables:{input:{targetTier:c,currency:"usd",paymentMethodTypes:d}}})})).json();if(n.errors)throw console.error("GraphQL errors:",n.errors),new Error(((l=n.errors[0])==null?void 0:l.message)||"Failed to create payment intent");return(y=n.data)==null?void 0:y.changeMySubscription}static async updateSubscription(c,d="create_prorations"){var l,y;const i=await Z();if(!i)throw new Error("Authentication failed");const n=await(await fetch(ee,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({query:le,variables:{input:{newTier:c,prorationBehavior:d}}})})).json();if(n.errors)throw console.error("GraphQL errors:",n.errors),new Error(((l=n.errors[0])==null?void 0:l.message)||"Failed to update subscription");return(y=n.data)==null?void 0:y.changeMySubscription}static async confirmPayment(c,d,i,s){const n=`${window.location.origin}${window.location.pathname}?payment_return=true`;switch(d){case"card":if(!s)throw new Error("Card element not initialized");return await c.confirmCardPayment(i,{payment_method:{card:s}});case"alipay":return await c.confirmAlipayPayment(i,{return_url:n});case"wechat_pay":return await c.confirmWechatPayPayment(i,{payment_method_options:{wechat_pay:{client:"web"}}});case"klarna":return await c.confirmKlarnaPayment(i,{payment_method:{billing_details:{email:"customer@example.com"}},return_url:n});case"ideal":return await c.confirmIdealPayment(i,{payment_method:{ideal:{bank:"abn_amro"}},return_url:n});case"sofort":return await c.confirmSofortPayment(i,{payment_method:{sofort:{country:"DE"}},return_url:n});case"bancontact":return await c.confirmBancontactPayment(i,{payment_method:{billing_details:{name:"Customer Name"}},return_url:n});case"giropay":return await c.confirmGiropayPayment(i,{payment_method:{billing_details:{name:"Customer Name"}},return_url:n});case"eps":return await c.confirmEpsPayment(i,{payment_method:{eps:{bank:"arzte_und_apotheker_bank"}},return_url:n});case"p24":return await c.confirmP24Payment(i,{payment_method:{billing_details:{email:"customer@example.com"}},return_url:n});default:throw new Error(`Unsupported payment method: ${d}`)}}}const U=r=>r/(1024*1024*1024),W=r=>{const c=r/1048576,d=r/(1024*1024*1024),i=r/(1024*1024*1024*1024);return i>=1?`${i.toFixed(1)} TB`:d>=1?`${d.toFixed(1)} GB`:`${Math.round(c)} MB`},O=r=>r<=1?10:r*10,Y=r=>r===0?0:1+.75*(r-1),B=(r,c)=>r<=10?c<=5?0:1:Math.ceil(r/10),v=(r,c="USD")=>new Intl.NumberFormat("en-US",{style:"currency",currency:c}).format(r),L=r=>({card:{requiresElement:!0,redirects:!1,description:"Credit or debit card"},alipay:{requiresElement:!1,redirects:!0,description:"Popular in China",minimumAmount:.5,supportedCurrencies:["usd","eur","gbp","cad","aud","sgd"]},wechat_pay:{requiresElement:!1,redirects:!1,description:"Popular in China",minimumAmount:.5,supportedCurrencies:["usd","cny"]},klarna:{requiresElement:!1,redirects:!0,description:"Buy now, pay later",minimumAmount:1,supportedCountries:["AT","BE","DK","FI","FR","DE","IT","NL","NO","ES","SE","GB","US"]},ideal:{requiresElement:!1,redirects:!0,description:"Dutch bank transfer",supportedCountries:["NL"],minimumAmount:.5},sofort:{requiresElement:!1,redirects:!0,description:"German bank transfer",supportedCountries:["DE","AT"],minimumAmount:.5},bancontact:{requiresElement:!1,redirects:!0,description:"Belgian bank transfer",supportedCountries:["BE"],minimumAmount:.5},giropay:{requiresElement:!1,redirects:!0,description:"German bank transfer",supportedCountries:["DE"],minimumAmount:.5},eps:{requiresElement:!1,redirects:!0,description:"Austrian bank transfer",supportedCountries:["AT"],minimumAmount:.5},p24:{requiresElement:!1,redirects:!0,description:"Polish bank transfer",supportedCountries:["PL"],minimumAmount:.5}})[r],de=()=>{const r=Intl.DateTimeFormat().resolvedOptions().timeZone;return r.includes("Europe/Amsterdam")?"NL":r.includes("Europe/Berlin")?"DE":r.includes("Europe/Vienna")?"AT":r.includes("Europe/Brussels")?"BE":r.includes("Europe/Warsaw")?"PL":"US"},e={colors:{primary:"#007bff",primaryDark:"#0056b3",success:"#4caf50",danger:"#e53935",warning:"#ff9800",white:"#fff",text:{primary:"#333",secondary:"#666"},background:{primary:"#f9fafb",card:"#fff",highlight:"#f0f7ff"},border:"#ddd",grayLight:"#e0e0e0"},spacing:{xs:"4px",sm:"8px",md:"16px",lg:"24px"},borderRadius:{small:"4px",medium:"8px"},boxShadow:{sm:"0 1px 2px rgba(0,0,0,0.06)",md:"0 1px 3px rgba(0,0,0,0.1)",lg:"0 4px 10px rgba(0,0,0,0.08)"}},ue=h.div`
  padding: ${e.spacing.md};
  background-color: ${e.colors.background.primary};
  min-height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  direction: ${r=>r.$isRTL?"rtl":"ltr"};
  position: relative;
`,pe=h.button`
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
`,V=h.div`
  background-color: ${e.colors.background.card};
  border-radius: ${e.borderRadius.medium};
  box-shadow: ${e.boxShadow.md};
  padding: ${e.spacing.lg};
  margin-bottom: ${e.spacing.lg};
`,me=h.h2`
  font-size: 18px;
  margin: 0 0 ${e.spacing.md} 0;
  color: ${e.colors.text.primary};
`,ge=h.div`
  background-color: ${e.colors.grayLight};
  border-radius: ${e.borderRadius.small};
  height: 20px;
  overflow: hidden;
  margin: ${e.spacing.md} 0;
`,fe=h.div`
  height: 100%;
  background-color: ${r=>r.$percentage>90?e.colors.danger:r.$percentage>75?e.colors.warning:e.colors.primary};
  width: ${r=>Math.min(r.$percentage,100)}%;
  transition: width 0.3s ease;
`,re=h.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: ${e.colors.text.secondary};
`,he=h.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${e.spacing.md};
  margin-top: ${e.spacing.md};
`,ye=h.div`
  border: ${r=>r.$isInsufficient?`2px solid ${e.colors.danger}`:r.$isSelected?`2px solid ${e.colors.primary}`:`1px solid ${e.colors.grayLight}`};
  border-radius: ${e.borderRadius.medium};
  padding: ${e.spacing.md};
  cursor: ${r=>r.$isInsufficient?"not-allowed":"pointer"};
  transition: all 0.2s ease;
  background-color: ${r=>r.$isInsufficient?"#ffebee":r.$isSelected?e.colors.background.highlight:e.colors.white};
  opacity: ${r=>r.$isInsufficient?.7:1};
  position: relative;
`,xe=h.h3`
  margin: 0 0 ${e.spacing.sm} 0;
  font-size: 16px;
  color: ${e.colors.text.primary};
`,be=h.div`
  font-size: 18px;
  font-weight: bold;
  color: ${e.colors.primary};
  margin-bottom: ${e.spacing.sm};
`,Se=h.div`
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
`,X=h.button`
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
`,q=h.div`
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
`,te=h.div`
  margin-bottom: ${e.spacing.md};
`,H=h.label`
  display: block;
  margin-bottom: ${e.spacing.sm};
  font-size: 14px;
  font-weight: 500;
  color: ${e.colors.text.primary};
`,we=h.input`
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
`,$e=h.div`
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
`,Pe=h.div`
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
`,Ce=h.div`
  border: 2px solid ${r=>r.$isSelected?e.colors.primary:e.colors.border};
  border-radius: ${e.borderRadius.medium};
  padding: ${e.spacing.md};
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${r=>r.$isSelected?e.colors.background.highlight:e.colors.white};
`,ve=h.div`
  background-color: ${e.colors.background.primary};
  border-radius: ${e.borderRadius.medium};
  padding: ${e.spacing.md};
  margin: ${e.spacing.md} 0;
  border-left: 4px solid ${e.colors.success};
`,Te=h.div`
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
`,Ee=(r,c,d,i)=>{const s=b.useCallback(l=>{if(!r)return{canDowngrade:!1,reason:i("Loading subscription information...")};const u=O(l)*1024*1024*1024,a=c<=u;if(l===0){const o=d<=5;if(!a&&!o)return{canDowngrade:!1,reason:i("Insufficient storage and too many albums (max 5 for free)")};if(a){if(!o)return{canDowngrade:!1,reason:i("Too many albums (free tier allows max 5 albums)")}}else return{canDowngrade:!1,reason:i("Insufficient storage capacity")};return{canDowngrade:!0}}return{canDowngrade:a,reason:a?void 0:i("Insufficient storage capacity")}},[r,c,d,i]),n=b.useCallback(()=>{if(!r)return[];const l=r.intNumberOfSubscriptions,y=[],u=(o,S=!1)=>{const $=O(o),j=Y(o),x=s(o);y.push({id:o,price:o===0?i("Free"):i("US${{price}} / month",{price:j.toFixed(2)}),subscriptions:o,storageGB:$,isInsufficient:!x.canDowngrade,isCurrent:S,insufficientReason:x.reason})};u(l,!0);const a=l+2;for(let o=l+1;o<=a;o++)u(o,!1);return y.sort((o,S)=>o.subscriptions-S.subscriptions)},[r,s,i]);return{canDowngrade:s,generatePlans:n}},ke=({subscriptionInfo:r,calculatedBytesUsed:c,t:d})=>{if(!r)return t.jsx(V,{children:t.jsxs("div",{style:{textAlign:"center",padding:e.spacing.lg},children:[t.jsx(q,{}),t.jsx("span",{style:{marginLeft:e.spacing.sm,color:e.colors.text.secondary},children:d("Loading account information...")})]})});const i=O(r.intNumberOfSubscriptions),s=c/(i*1024*1024*1024)*100,n=Y(r.intNumberOfSubscriptions);return t.jsxs(V,{children:[t.jsxs(re,{children:[t.jsx("strong",{children:t.jsx("span",{children:W(i*1024*1024*1024)})}),t.jsx("span",{children:r.intNumberOfSubscriptions===0?d("Free"):v(n)})]}),t.jsxs(re,{children:[t.jsx("span",{children:d("Used: {{used}}",{used:W(c)})}),t.jsx("span",{children:d("Total: {{total}}",{total:W(i*1024*1024*1024)})})]}),t.jsx(ge,{children:t.jsx(fe,{$percentage:s})})]})},Ne=({customGB:r,onCustomGBChange:c,subscriptionInfo:d,calculatedBytesUsed:i,albumCount:s,t:n})=>{const l=()=>{if(!r||isNaN(parseFloat(r))||!d)return"";const u=parseFloat(r),a=d.intNumberOfSubscriptions;if(u<=0)return t.jsx("span",{style:{color:e.colors.danger},children:n("Please enter a positive number")});if(u<10)return B(10,s)===a?t.jsx("span",{style:{color:e.colors.text.secondary},children:n("Current Plan")}):t.jsx("span",{style:{color:e.colors.warning},children:n("Minimum: 10 GB")});const o=U(i);if(u<o)return t.jsx("span",{style:{color:e.colors.danger,fontWeight:"bold"},children:n("Error: You are using {{used}}",{used:W(i)})});const S=B(u,s),$=O(S),j=Y(S);return S===a?t.jsx("span",{style:{color:e.colors.text.secondary},children:n("Current Plan")}):S===0?t.jsx("span",{style:{color:e.colors.success,fontWeight:"bold"},children:n("10 GB - Free")}):t.jsx("span",{style:{color:e.colors.primary,fontWeight:"bold"},children:n("{{gb}} GB - {{price}} / month",{gb:$,price:v(j)})})},y=r&&!isNaN(parseFloat(r))&&d&&parseFloat(r)<U(i);return t.jsxs("div",{style:{marginTop:e.spacing.lg},children:[t.jsx(H,{style:{fontWeight:"bold"},children:n("Number of GB Needed:")}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:e.spacing.sm,marginTop:e.spacing.sm},children:[t.jsx(we,{type:"number",min:"1",step:"1",inputMode:"numeric",placeholder:n("e.g. 50"),value:r,onChange:u=>c(u.target.value),style:{width:"120px",borderColor:y?e.colors.danger:e.colors.border}}),t.jsx("span",{style:{fontSize:"14px",color:e.colors.text.secondary,minWidth:"200px"},children:l()})]}),y&&t.jsx("div",{style:{marginTop:e.spacing.sm,padding:e.spacing.sm,backgroundColor:"#ffebee",borderRadius:e.borderRadius.small,border:`1px solid ${e.colors.danger}`,fontSize:"12px",color:e.colors.danger},children:n("This capacity is insufficient for your current usage. Please select a larger capacity or delete some files first.")})]})},Be=({plans:r,selectedTier:c,isPlanSelected:d,customGB:i,onPlanSelect:s,t:n})=>t.jsx(he,{children:r.map(l=>t.jsxs(ye,{$isSelected:d&&c===l.subscriptions&&!i&&!l.isInsufficient,$isInsufficient:l.isInsufficient,onClick:()=>s(l),children:[t.jsxs(xe,{children:[n("{{gb}} GB",{gb:l.storageGB}),l.subscriptions===0&&t.jsxs("span",{style:{marginLeft:"8px",fontSize:"12px",color:e.colors.text.secondary,fontWeight:"normal"},children:["(",n("Max 5 albums"),")"]}),l.isCurrent&&t.jsxs("span",{style:{marginLeft:"8px",fontSize:"12px",color:e.colors.primary,fontWeight:"normal"},children:["(",n("Current"),")"]})]}),t.jsx(be,{style:{color:l.isInsufficient?e.colors.text.secondary:e.colors.primary},children:l.price}),l.isInsufficient&&t.jsxs(t.Fragment,{children:[t.jsx("div",{style:{fontSize:"12px",color:e.colors.danger,fontWeight:"bold",marginTop:"8px"},children:l.insufficientReason||n("Insufficient Capacity")}),t.jsx(Se,{children:"⚠️"})]})]},l.id))}),Ae=({selectedMethod:r,onMethodSelect:c,amount:d,currency:i="usd",userCountry:s="US",t:n})=>{var u;const y=[{id:"card",name:n("Credit Card"),icon:"💳"},{id:"alipay",name:n("Alipay"),icon:"🇨🇳"},{id:"wechat_pay",name:n("WeChat Pay"),icon:"💬"},{id:"klarna",name:n("Klarna"),icon:"🛍️"},{id:"ideal",name:n("iDEAL"),icon:"🇳🇱"},{id:"sofort",name:n("SOFORT"),icon:"🏦"},{id:"bancontact",name:n("Bancontact"),icon:"🇧🇪"},{id:"giropay",name:n("Giropay"),icon:"🇩🇪"},{id:"eps",name:n("EPS"),icon:"🇦🇹"},{id:"p24",name:n("Przelewy24"),icon:"🇵🇱"}].filter(a=>{const o=L(a.id);return!(o.minimumAmount&&d<o.minimumAmount||o.supportedCountries&&!o.supportedCountries.includes(s)||o.supportedCurrencies&&!o.supportedCurrencies.includes(i.toLowerCase()))});return t.jsxs(te,{children:[t.jsx(H,{children:n("Payment Method")}),t.jsx(je,{children:y.map(a=>{const o=L(a.id);return t.jsxs(Ce,{$isSelected:r===a.id,onClick:()=>c(a.id),children:[t.jsx("div",{style:{fontSize:"24px",marginBottom:e.spacing.xs},children:a.icon}),t.jsx("div",{style:{fontSize:"12px",fontWeight:"500"},children:a.name}),o.description&&t.jsx("div",{style:{fontSize:"10px",color:e.colors.text.secondary,marginTop:"4px"},children:n(o.description)})]},a.id)})}),((u=L(r))==null?void 0:u.redirects)&&t.jsx("div",{style:{fontSize:"12px",color:e.colors.text.secondary,textAlign:"center",marginTop:e.spacing.sm,fontStyle:"italic"},children:n("You will be redirected to complete this payment")})]})},Re=({proRataInfo:r,isUpgrade:c,t:d})=>!r||!c?null:t.jsxs(ve,{children:[t.jsx("div",{style:{fontWeight:"bold",marginBottom:e.spacing.sm,color:e.colors.success},children:d("✓ Today's Charge Calculation")}),t.jsxs("div",{style:{fontSize:"14px",color:e.colors.text.secondary},children:[t.jsx("div",{children:d("Current plan credit: {{credit}}",{credit:v(r.proRataCredit)})}),t.jsx("div",{children:d("New plan charge: {{charge}}",{charge:v(r.proRataCharge)})}),t.jsx("div",{style:{fontWeight:"bold",marginTop:e.spacing.xs,color:e.colors.text.primary},children:r.netAmount>0?d("Amount due today: {{amount}}",{amount:v(r.netAmount)}):d("No charge today (credit covers upgrade)")}),t.jsx("div",{style:{fontSize:"12px",marginTop:e.spacing.xs},children:d("({{days}} days remaining in billing cycle)",{days:r.daysRemainingInCycle})})]})]}),_e=({showStripe:r,loading:c,selectedTier:d,customGB:i,albumCount:s,subscriptionInfo:n,onClose:l,onPaymentSuccess:y,setLoading:u,t:a})=>{const[o,S]=b.useState("card"),[$,j]=b.useState(null),[x,z]=b.useState(null),[p,T]=b.useState(null),E=i&&!isNaN(parseFloat(i))?B(parseFloat(i),s):d,I=O(E),k=Y(E),A=(n==null?void 0:n.intNumberOfSubscriptions)||0,C=E>A,D=de();M.useEffect(()=>{r&&!x&&(async()=>{try{const f=await _.initializeStripe("pk_live_51O77MNA5szNEcsv6LqXfWX0BY2V8mBwAXnaBHcmdwsBHUaeXlQjlqRq3ELWFaycPzQvCRYOyz3sg3x2EkZ7ifRnR00QewJDIRL");if(z(f),o==="card"){const m=f.elements().create("card",{style:{base:{fontSize:"16px",color:"#333","::placeholder":{color:"#aab7c4"}}}});T(m),setTimeout(()=>{document.getElementById("card-element")&&m.mount("#card-element")},100)}}catch(f){console.error("Failed to initialize Stripe:",f)}})()},[r,x,o]),M.useEffect(()=>{if(x&&o==="card"&&!p){const f=x.elements().create("card",{style:{base:{fontSize:"16px",color:"#333","::placeholder":{color:"#aab7c4"}}}});T(f),setTimeout(()=>{document.getElementById("card-element")&&f.mount("#card-element")},100)}else o!=="card"&&p&&(p.unmount(),T(null))},[o,x,p]),M.useEffect(()=>{r&&C&&n?(async()=>{try{if(n.intNumberOfSubscriptions>0){const f=await _.createPaymentIntentWithProration(E,[o]);j(f.proration)}else j(null)}catch(f){console.error("Failed to get proration info:",f),j(null)}})():j(null)},[r,C,A,E,n,o]),M.useEffect(()=>()=>{p&&p.unmount()},[p]),M.useEffect(()=>{r&&(async()=>{const f=new URLSearchParams(window.location.search),R=f.get("payment_return"),m=f.get("payment_intent_client_secret");if(R==="true"&&m&&x)try{u(!0);const{paymentIntent:g}=await x.retrievePaymentIntent(m);if(g.status==="succeeded"){const w=localStorage.getItem("pendingSubscriptionTier");if(w){const F=A>0&&parseInt(w)>A?"create_prorations":"none";await _.updateSubscription(parseInt(w),F),localStorage.removeItem("pendingSubscriptionTier");const P=window.location.href.split("?")[0];window.history.replaceState({},document.title,P),y()}}else g.status==="requires_payment_method"&&alert(a("Payment failed. Please try again with a different payment method."))}catch(g){console.error("Error handling payment completion:",g),alert(a("There was an issue processing your payment. Please contact support."))}finally{u(!1)}})()},[r,x,A,y,u,a]);const Q=async()=>{var N;u(!0);try{let f;if(i&&!isNaN(parseFloat(i))){const G=parseFloat(i);if(G<10){alert(a("Minimum storage capacity is 10 GB")),u(!1);return}f=B(G,s)}else f=d;const R=(n==null?void 0:n.intNumberOfSubscriptions)||0,m=f>R;(N=L(o))!=null&&N.redirects&&localStorage.setItem("pendingSubscriptionTier",f.toString());const g=await _.createPaymentIntentWithProration(f,[o]);if(!x)throw new Error("Stripe not properly initialized");const w=await _.confirmPayment(x,o,g.clientSecret,p),{error:F,paymentIntent:P}=w;if(F)throw new Error(F.message);if((P==null?void 0:P.status)==="succeeded"){const G=R>0&&m?"create_prorations":"none";await _.updateSubscription(f,G),u(!1),y()}else if((P==null?void 0:P.status)==="requires_action"||(P==null?void 0:P.status)==="requires_source_action")u(!1);else if((P==null?void 0:P.status)==="processing")u(!1),alert(a("Payment is being processed. You will receive confirmation once completed.")),l();else throw new Error("Payment was not successful")}catch(f){u(!1),console.error("Payment error:",f),alert(a("Payment failed. Please try again."))}};return r?t.jsxs(t.Fragment,{children:[t.jsx(Pe,{onClick:()=>!c&&l()}),t.jsxs($e,{children:[t.jsxs("div",{style:{textAlign:"center",marginBottom:e.spacing.lg},children:[t.jsx("h3",{style:{margin:0,marginBottom:e.spacing.sm},children:C?a("Upgrade to {{gb}} GB",{gb:I}):a("Change to {{gb}} GB",{gb:I})}),t.jsxs("div",{style:{fontSize:"24px",fontWeight:"bold",color:e.colors.primary},children:[v(k)," ",a("/ month")]}),C&&$&&n&&n.intNumberOfSubscriptions>0&&$.netAmount>0&&t.jsx("div",{style:{fontSize:"14px",color:e.colors.text.secondary,marginTop:e.spacing.sm,fontStyle:"italic"},children:a("{{amount}} due today (with pro-rata credit)",{amount:v($.netAmount)})}),t.jsx("div",{style:{fontSize:"12px",color:e.colors.text.secondary,marginTop:e.spacing.md,padding:e.spacing.sm,backgroundColor:e.colors.background.primary,borderRadius:e.borderRadius.small,border:`1px solid ${e.colors.border}`},children:a("You will be automatically billed {{amount}} monthly on this payment method unless you change it.",{amount:v(k)})})]}),t.jsx(Re,{proRataInfo:$,isUpgrade:C,t:a}),t.jsx(Ae,{selectedMethod:o,onMethodSelect:S,amount:k,currency:"usd",userCountry:D,t:a}),o==="card"&&t.jsxs(te,{children:[t.jsx(H,{children:a("Card Information")}),t.jsx(Te,{children:t.jsx("div",{id:"card-element"})})]}),(o==="alipay"||o==="wechat_pay")&&t.jsxs("div",{style:{padding:e.spacing.lg,backgroundColor:e.colors.background.primary,borderRadius:e.borderRadius.medium,textAlign:"center",margin:`${e.spacing.md} 0`},children:[t.jsx("div",{style:{fontSize:"48px",marginBottom:e.spacing.md},children:o==="alipay"?"🇨🇳":"💬"}),t.jsx("div",{style:{fontWeight:"bold",marginBottom:e.spacing.sm},children:a(o==="alipay"?"Alipay Payment":"WeChat Pay")}),t.jsx("div",{style:{fontSize:"14px",color:e.colors.text.secondary},children:a(o==="alipay"?"You will be redirected to complete payment":"Scan QR code with WeChat to complete payment")})]}),t.jsxs("div",{style:{textAlign:"center",marginTop:e.spacing.lg},children:[t.jsxs(X,{onClick:Q,disabled:c||o==="card"&&!p,$size:"large",children:[c&&t.jsx(q,{}),c?a("Processing..."):C&&$&&n&&n.intNumberOfSubscriptions>0&&$.netAmount>0?a("Pay {{amount}} Today",{amount:v($.netAmount)}):C&&$&&n&&n.intNumberOfSubscriptions>0&&$.netAmount===0?a("Start Subscription (No charge today)"):C?a("Start {{amount}}/month Subscription",{amount:v(k)}):a("Confirm Change")]}),t.jsx(X,{$variant:"secondary",onClick:l,disabled:c,children:a("Cancel")})]}),t.jsx("div",{style:{marginTop:e.spacing.lg,padding:e.spacing.md,backgroundColor:e.colors.background.primary,borderRadius:e.borderRadius.small,textAlign:"center",fontSize:"12px",color:e.colors.text.secondary},children:a("🔒 Secure payment powered by Stripe")})]})]}):null},ze=()=>{const{t:r,language:c}=oe(),d=ae(c)==="rtl",{folders:i,subscriptionInfo:s,calculatedBytesUsed:n}=se(m=>console.log(m)),l=i.length,y=s!==null,[u,a]=b.useState((s==null?void 0:s.intNumberOfSubscriptions)||0),[o,S]=b.useState(!1),[$,j]=b.useState(!1),[x,z]=b.useState(!1),[p,T]=b.useState(""),{canDowngrade:E,generatePlans:I}=Ee(s,n,l,r),k=b.useMemo(()=>y?I():[],[y,I]),A=b.useCallback(m=>{T(m);const g=parseFloat(m);if(m&&!isNaN(g)&&g>0){const w=B(Math.max(g,10),l);a(w),S(!1)}else m||(a((s==null?void 0:s.intNumberOfSubscriptions)||0),S(!1))},[s,l]),C=b.useCallback(m=>{if(m.isInsufficient)return;o&&u===m.subscriptions&&!p?(a((s==null?void 0:s.intNumberOfSubscriptions)||0),S(!1)):(a(m.subscriptions),S(!0)),T("")},[o,u,p,s]),D=b.useCallback(async()=>{z(!0);try{await _.updateSubscription(0,"none"),setTimeout(()=>{a(0),T(""),S(!1),z(!1),alert(r("Successfully scheduled downgrade to free plan at end of billing period."))},2e3)}catch{z(!1),alert(r("Error processing downgrade. Please try again."))}},[r]),Q=b.useCallback(()=>{if(!s)return;let m;if(p&&!isNaN(parseFloat(p))){const w=parseFloat(p);if(w<=0){alert(r("Please enter a positive number"));return}if(w<10){alert(r("Minimum storage capacity is 10 GB"));return}m=B(w,l)}else m=u;if(m===s.intNumberOfSubscriptions)return;const g=E(m);if(!g.canDowngrade){alert(g.reason||r("Cannot select this plan"));return}m===0?window.confirm(r("Are you sure you want to downgrade to the free plan? This will take effect at the end of your current billing period."))&&D():j(!0)},[s,p,u,l,E,D,r]),N=b.useCallback(()=>{j(!1),T(""),S(!1),alert(r("Payment successful! Your subscription has been updated.")),J(K("my-albums.html"))},[r]),f=b.useCallback(()=>{if(!s)return r("Change Plan");const m=s.intNumberOfSubscriptions;let g;if(p&&!isNaN(parseFloat(p))){const w=parseFloat(p);if(w<U(n))return r("Change Plan");g=B(Math.max(w,10),l)}else g=u;return g===m?r("Current Plan"):g>m?r("Upgrade (Pro-rata Credit)"):r(g===0?"Downgrade To Free (End of Period)":"Change Plan (Immediate)")},[s,p,u,n,l,r]),R=b.useMemo(()=>{var m;if(!s)return!0;if(p&&!isNaN(parseFloat(p))){const g=parseFloat(p);if(g<=0)return!0;const w=B(Math.max(g,10),l),F=s.intNumberOfSubscriptions;if(w===F||g<U(n))return!0}return!o&&!p||u===s.intNumberOfSubscriptions&&!p||x||!!(p&&(isNaN(parseFloat(p))||parseFloat(p)<=0))||!!((m=k.find(g=>g.subscriptions===u))!=null&&m.isInsufficient)},[s,o,p,u,x,k,n,l]);return t.jsxs(ue,{$isRTL:d,children:[t.jsx("div",{style:{marginBottom:e.spacing.md,textAlign:"right"},children:t.jsx(pe,{onClick:()=>J(K("my-albums.html")),children:r("← Back To Albums")})}),t.jsx(ke,{subscriptionInfo:s,calculatedBytesUsed:n,t:r}),t.jsxs(V,{children:[t.jsx(me,{children:r("Select Storage Capacity")}),t.jsx("div",{style:{fontSize:"14px",color:e.colors.text.secondary,marginBottom:e.spacing.md,fontStyle:"italic"},children:r("Paid tiers have unlimited albums and are limited only by storage. Upgrades include pro-rata credit for unused time.")}),y?t.jsxs(t.Fragment,{children:[t.jsx(Be,{plans:k,selectedTier:u,isPlanSelected:o,customGB:p,onPlanSelect:C,t:r}),t.jsx(Ne,{customGB:p,onCustomGBChange:A,subscriptionInfo:s,calculatedBytesUsed:n,albumCount:l,t:r}),t.jsx("div",{style:{marginTop:e.spacing.lg,textAlign:"center"},children:t.jsxs(X,{onClick:Q,disabled:R,children:[x&&t.jsx(q,{}),f()]})})]}):t.jsxs("div",{style:{textAlign:"center",padding:e.spacing.lg},children:[t.jsx(q,{}),t.jsx("span",{style:{marginLeft:e.spacing.sm,color:e.colors.text.secondary},children:r("Loading subscription plans...")})]})]}),t.jsx(_e,{showStripe:$,loading:x,selectedTier:u,customGB:p,albumCount:l,subscriptionInfo:s,onClose:()=>j(!1),onPaymentSuccess:N,setLoading:z,t:r})]})},Fe=()=>t.jsx(ie,{children:t.jsx(ze,{})});ne.createRoot(document.getElementById("root")).render(t.jsx(Fe,{}));
