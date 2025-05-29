import{d as a,R as ee,j as o,I as re,u as te,r as u,a as O,b as z,g as oe}from"./utils-D99WuR6c.js";const se=()=>{const[t,w]=u.useState({intNumberOfSubscriptions:2,bytesOfDataUsed:5368709120,SubscriptionStatus:"active"});return{subscriptionInfo:t,setSubscriptionInfo:w}},e={colors:{primary:"#007bff",primaryDark:"#0056b3",danger:"#e53935",warning:"#ff9800",white:"#fff",text:{primary:"#333",secondary:"#666"},background:{primary:"#f9fafb",card:"#fff",highlight:"#f0f7ff"},border:"#ddd",grayLight:"#e0e0e0"},spacing:{sm:"8px",md:"16px",lg:"24px",xl:"32px"},borderRadius:{small:"4px",medium:"8px"},boxShadow:{md:"0 1px 3px rgba(0,0,0,0.1)",lg:"0 4px 10px rgba(0,0,0,0.08)"}},ne=a.div`
  padding: ${e.spacing.md};
  background-color: ${e.colors.background.primary};
  min-height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  direction: ${t=>t.isRTL?"rtl":"ltr"};
`,ae=a.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${e.spacing.lg};
`,ie=a.h1`
  font-size: 24px;
  margin: 0;
  color: ${e.colors.text.primary};
`,ce=a.button`
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
`,U=a.div`
  background-color: ${e.colors.background.card};
  border-radius: ${e.borderRadius.medium};
  box-shadow: ${e.boxShadow.md};
  padding: ${e.spacing.lg};
  margin-bottom: ${e.spacing.lg};
`,de=a.h2`
  font-size: 18px;
  margin: 0 0 ${e.spacing.md} 0;
  color: ${e.colors.text.primary};
`,le=a.div`
  background-color: ${e.colors.grayLight};
  border-radius: ${e.borderRadius.small};
  height: 20px;
  overflow: hidden;
  margin: ${e.spacing.md} 0;
`,pe=a.div`
  height: 100%;
  background-color: ${t=>t.percentage>90?e.colors.danger:t.percentage>75?e.colors.warning:e.colors.primary};
  width: ${t=>Math.min(t.percentage,100)}%;
  transition: width 0.3s ease;
`,I=a.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: ${e.colors.text.secondary};
`,ge=a.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${e.spacing.md};
  margin-top: ${e.spacing.md};
`,ue=a.div`
  border: 2px solid ${t=>t.isSelected?e.colors.primary:e.colors.border};
  border-radius: ${e.borderRadius.medium};
  padding: ${e.spacing.md};
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${t=>t.isSelected?e.colors.background.highlight:e.colors.white};

  &:hover {
    border-color: ${e.colors.primary};
  }
`,me=a.h3`
  margin: 0 0 ${e.spacing.sm} 0;
  font-size: 16px;
  color: ${e.colors.text.primary};
`,be=a.div`
  font-size: 18px;
  font-weight: bold;
  color: ${e.colors.primary};
  margin-bottom: ${e.spacing.sm};
`,F=a.button`
  background-color: ${t=>t.variant==="danger"?e.colors.danger:t.variant==="secondary"?"transparent":e.colors.primary};
  color: ${t=>t.variant==="secondary"?e.colors.primary:e.colors.white};
  border: ${t=>t.variant==="secondary"?`1px solid ${e.colors.primary}`:"none"};
  padding: 12px 24px;
  border-radius: ${e.borderRadius.medium};
  cursor: ${t=>t.disabled?"not-allowed":"pointer"};
  font-size: 16px;
  font-weight: 500;
  transition: all 0.2s ease;
  opacity: ${t=>t.disabled?.6:1};
  margin-right: ${e.spacing.sm};

  &:hover:not(:disabled) {
    background-color: ${t=>t.variant==="danger"?"#c62828":t.variant==="secondary"?e.colors.background.highlight:e.colors.primaryDark};
  }
`,xe=a.div`
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
`,he=a.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
`,B=a.div`
  margin-bottom: ${e.spacing.md};
`,b=a.label`
  display: block;
  margin-bottom: ${e.spacing.sm};
  font-size: 14px;
  font-weight: 500;
  color: ${e.colors.text.primary};
`,x=a.input`
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
`,L=a.div`
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
`,fe=()=>{const{t,language:w}=te(),A=oe(w)==="rtl",{subscriptionInfo:l,setSubscriptionInfo:M}=se(),h=r=>r===0?.5:r*10,m=r=>r<=.5?0:Math.ceil(r/10),p=r=>r<=.5?.5:Math.ceil(r/10)*10,[g,N]=u.useState(h(l.intNumberOfSubscriptions)),[q,f]=u.useState(!1),[d,y]=u.useState(!1),[n,S]=u.useState(""),[c,E]=u.useState({cardNumber:"",expiryDate:"",cvc:"",name:""}),D=500,Y=r=>r===0?D/1024:r*10,k=r=>r===0?0:1+.75*(r-1),P=r=>{const s=m(r);return k(s)},T=Y(l.intNumberOfSubscriptions),$=T*1024,V=l.bytesOfDataUsed/(T*1024*1024*1024)*100,H=l.bytesOfDataUsed/(1024*1024),J=(()=>{const r=h(l.intNumberOfSubscriptions),s=[],i=r===.5?.5:Math.max(.5,r-10),C=Math.min(100,r+20);i<=.5&&s.push({id:0,price:t("Free"),subscriptions:0,storageGB:.5});for(let v=10;v<=C;v+=10){const G=m(v),_=k(G);s.push({id:G,price:t("US${{price}} / month",{price:_.toFixed(2)}),subscriptions:G,storageGB:v})}return s})(),R=r=>{const s=m(r),i=s===0?D*1024*1024:s*10*1024*1024*1024;return l.bytesOfDataUsed<=i},K=r=>{R(r)&&(N(r),S(""))},Q=r=>{S(r);const s=parseFloat(r);if(r&&!isNaN(s)&&s>=.5){const i=p(s);N(i)}},W=()=>{const r=n&&!isNaN(parseFloat(n))?p(parseFloat(n)):g,s=m(r);if(s!==l.intNumberOfSubscriptions){if(!R(r)){alert(t("Cannot select this plan: You would exceed the storage limit. Please delete some files first."));return}s===0?window.confirm(t("Are you sure you want to downgrade to the free plan?"))&&X():f(!0)}},X=()=>{y(!0),setTimeout(()=>{M(r=>({...r,intNumberOfSubscriptions:0,SubscriptionStatus:"canceled"})),N(.5),S(""),y(!1),alert(t("Successfully downgraded to free plan."))},2e3)},Z=()=>{if(!c.cardNumber||!c.expiryDate||!c.cvc||!c.name){alert(t("Please fill in all payment fields."));return}y(!0);const r=n&&!isNaN(parseFloat(n))?p(parseFloat(n)):g,s=m(r);setTimeout(()=>{M(i=>({...i,intNumberOfSubscriptions:s,SubscriptionStatus:"active"})),y(!1),f(!1),S(""),alert(t("Payment successful! Your subscription has been updated.")),setTimeout(()=>{O(z("my-albums.html"))},1500)},3e3)},j=(r,s)=>{let i=s;r==="cardNumber"&&(i=s.replace(/\s/g,"").replace(/(.{4})/g,"$1 ").trim().substring(0,19)),r==="expiryDate"&&(i=s.replace(/\D/g,"").replace(/(\d{2})(\d)/,"$1/$2").substring(0,5)),r==="cvc"&&(i=s.replace(/\D/g,"").substring(0,4)),E(C=>({...C,[r]:i}))};return o.jsxs(ne,{isRTL:A,children:[o.jsxs(ae,{children:[o.jsx(ie,{children:t("Storage Management")}),o.jsx(ce,{onClick:()=>O(z("my-albums.html")),children:t("← Back to Albums")})]}),o.jsxs(U,{children:[o.jsxs(I,{children:[o.jsx("strong",{children:o.jsx("span",{children:$<1024?`${Math.round($)} MB`:`${Math.round($)} MB`})}),o.jsx("span",{children:t("US${{price}} / month",{price:k(l.intNumberOfSubscriptions).toFixed(2)})})]}),o.jsxs(I,{children:[o.jsx("span",{children:t("Used: {{used}} MB",{used:Math.round(H)})}),o.jsx("span",{children:t("Total: {{total}} MB",{total:Math.round($)})})]}),o.jsx(le,{children:o.jsx(pe,{percentage:V})})]}),o.jsxs(U,{children:[o.jsx(de,{children:t("Select Store Capacity")}),o.jsx(ge,{children:J.map(r=>o.jsxs(ue,{isSelected:g===r.storageGB&&!n,onClick:()=>K(r.storageGB),children:[o.jsx(me,{children:r.storageGB===.5?t("500 MB"):t("{{gb}} GB",{gb:r.storageGB})}),o.jsx(be,{children:r.price})]},r.id))}),o.jsxs("div",{style:{marginTop:e.spacing.lg},children:[o.jsx(b,{children:t("Number of GB Needed:")}),o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:e.spacing.sm,marginTop:e.spacing.sm},children:[o.jsx(x,{type:"number",min:"0.5",step:"0.5",placeholder:t("e.g. 15"),value:n,onChange:r=>Q(r.target.value),style:{width:"120px"}}),o.jsx("span",{style:{fontSize:"14px",color:e.colors.text.secondary},children:n&&!isNaN(parseFloat(n))&&parseFloat(n)>=.5?(()=>{const r=parseFloat(n),s=p(r),i=P(s);return s<=.5?t("500 MB - Free"):r!==s?t("{{gb}} GB - US${{price}} / month",{gb:s,price:i.toFixed(2)}):t("{{gb}} GB - US${{price}} / month",{gb:s,price:i.toFixed(2)})})():""})]})]}),o.jsx("div",{style:{marginTop:e.spacing.lg,textAlign:"center"},children:o.jsxs(F,{onClick:W,disabled:g===h(l.intNumberOfSubscriptions)&&!n||d||!!(n&&(isNaN(parseFloat(n))||parseFloat(n)<.5)),children:[d&&o.jsx(L,{}),(()=>{const r=n&&!isNaN(parseFloat(n))?p(parseFloat(n)):g,s=h(l.intNumberOfSubscriptions);return r===s?t("Current Plan"):r>s?t("Upgrade"):r<=.5?t("Downgrade To Free"):t("Change Plan")})()]})})]}),q&&o.jsxs(o.Fragment,{children:[o.jsx(he,{onClick:()=>!d&&f(!1)}),o.jsxs(xe,{children:[o.jsx("div",{style:{textAlign:"center",marginBottom:e.spacing.lg},children:o.jsx("h3",{style:{margin:0,marginBottom:e.spacing.sm},children:(()=>{const r=n&&!isNaN(parseFloat(n))?p(parseFloat(n)):g;return t("{{gb}} GB - US${{price}} / month",{gb:r,price:P(r).toFixed(2)})})()})}),o.jsxs("div",{children:[o.jsxs(B,{children:[o.jsx(b,{children:t("Card Number")}),o.jsx(x,{type:"text",placeholder:t("1234 5678 9012 3456"),value:c.cardNumber,onChange:r=>j("cardNumber",r.target.value),required:!0,disabled:d})]}),o.jsxs("div",{style:{display:"flex",gap:e.spacing.md},children:[o.jsxs(B,{style:{flex:1},children:[o.jsx(b,{children:t("Expiry Date")}),o.jsx(x,{type:"text",placeholder:t("MM/YY"),value:c.expiryDate,onChange:r=>j("expiryDate",r.target.value),required:!0,disabled:d})]}),o.jsxs(B,{style:{flex:1},children:[o.jsx(b,{children:t("CVC")}),o.jsx(x,{type:"text",placeholder:t("123"),value:c.cvc,onChange:r=>j("cvc",r.target.value),required:!0,disabled:d})]})]}),o.jsxs(B,{children:[o.jsx(b,{children:t("Cardholder Name")}),o.jsx(x,{type:"text",placeholder:t("John Doe"),value:c.name,onChange:r=>j("name",r.target.value),required:!0,disabled:d})]}),o.jsxs("div",{style:{textAlign:"center",marginTop:e.spacing.lg},children:[o.jsxs(F,{onClick:Z,disabled:d||!c.cardNumber||!c.expiryDate||!c.cvc||!c.name,children:[d&&o.jsx(L,{}),t(d?"Processing...":"Pay")]}),o.jsx(F,{variant:"secondary",onClick:()=>f(!1),disabled:d,children:t("Cancel")})]})]}),o.jsx("div",{style:{marginTop:e.spacing.lg,padding:e.spacing.md,backgroundColor:e.colors.background.primary,borderRadius:e.borderRadius.small,textAlign:"center",fontSize:"12px",color:e.colors.text.secondary},children:t("🔒 Demo payment - no real charges")})]})]})]})},ye=()=>o.jsx(re,{children:o.jsx(fe,{})});ee.createRoot(document.getElementById("root")).render(o.jsx(ye,{}));
