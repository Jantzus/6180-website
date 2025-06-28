import{r as o,m as E,k as j,t as e,d as s,J as z,j as i,M as A,B as R,g as L,l as M}from"./buttons-lpKlibkr.js";import{U as C}from"./forms-CAu2QtYr.js";import{d as D,e as B}from"./UploadProgress-CRfKII2S.js";const _=t=>{const[x,b]=o.useState(!1),[m,g]=o.useState(""),[f,c]=o.useState(""),[w,u]=o.useState(!1),[y,l]=o.useState(!1),$=o.useCallback(n=>{const a=/^[a-zA-Z0-9-]+$/.test(n);return console.log(`Username validation for '${n}': ${a}`),a},[]),p=o.useCallback(async(n,a)=>{var v,k;console.log(`Submitting username: ${n}`),l(!0),c("");const r=await E();if(!r){c(t("Authentication error. Please try again.")),l(!1);return}const h=`
      mutation MyMutation($savePublicProfileDisplayNameInput: SavePublicProfileDisplayNameInput) {
        changeMyAccountItem(savePublicProfileDisplayNameInput: $savePublicProfileDisplayNameInput) {
          ... on Profile {
            anyDisplayName
          }
        }
      }
    `,d={savePublicProfileDisplayNameInput:{anyDisplayName:n}};try{const S=await(await fetch(j,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({query:h,variables:d})})).json(),P=(k=(v=S==null?void 0:S.data)==null?void 0:v.changeMyAccountItem)==null?void 0:k.anyDisplayName;if(P)a(P);else throw new Error("Username taken")}catch(I){console.error(`Error submitting username: ${I}`),c(t("Username is already taken. Please try a different one.")),u(!0),l(!1)}},[t]),U=o.useCallback(n=>{const a=Math.floor(1e5+Math.random()*9e5).toString(),r=`${m}${a}`;console.log(`Appending random digits to username: ${m} -> ${r}`),g(r),p(r,n)},[m,p]);return{showUsernamePrompt:x,setShowUsernamePrompt:b,usernameInput:m,setUsernameInput:g,usernameError:f,setUsernameError:c,showAltButton:w,setShowAltButton:u,isSubmittingUsername:y,setIsSubmittingUsername:l,validateUsername:$,submitUsername:p,appendRandomDigits:U}},O=s.div`
  position: relative;
  overflow: hidden;
  background-color: ${e.colors.grayLighter};
  width: 100%;
  padding-bottom: 75%;
  height: 0;
  border-radius: ${e.borderRadius.medium};
  
  @media (max-width: ${e.breakpoints.mobile}) {
    padding-bottom: 100%;
  }
`,V=s.img`
  opacity: ${t=>t.$isLoaded?1:0};
  transition: opacity 0.3s;
  max-width: 100%;
  max-height: 100%;
  object-fit: ${t=>t.$objectFit||"contain"};
  border-radius: ${e.borderRadius.medium};
  /* Image protection */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
  pointer-events: auto; /* Keep pointer events for click handlers */
  
  ${t=>t.$objectFit==="cover"&&z`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  `}
`,F=s.div`
  position: relative;
  overflow: hidden;
  background-color: ${e.colors.grayLighter};
  width: 100%;
  min-height: 200px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  border-radius: ${e.borderRadius.medium};
  
  @media (max-width: ${e.breakpoints.mobile}) {
    min-height: 120px;
    aspect-ratio: 1/1;
    height: 0;
    padding-bottom: 100%;
  }
`,G=s.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background-color: ${e.colors.overlayLight};
  border-radius: ${e.borderRadius.circle};
  z-index: 2;
  
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 55%;
    transform: translate(-50%, -50%);
    border-style: solid;
    border-width: 15px 0 15px 25px;
    border-color: transparent transparent transparent ${e.colors.white};
  }
  
  @media (max-width: ${e.breakpoints.mobile}) {
    width: 40px;
    height: 40px;
    
    &::before {
      border-width: 10px 0 10px 16px;
    }
  }
`,J=s.div`
  position: relative;
  margin-bottom: ${e.spacing.sm};
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`,K=s.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: ${e.borderRadius.medium};
  /* Image protection */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
  pointer-events: auto;
`,q=s.video`
  max-width: 100%;
  max-height: 100%;
  border-radius: ${e.borderRadius.medium};
  /* Video protection */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
`;s.div`
  position: relative;
`;const H=s.div`
  color: ${e.colors.white};
  font-size: ${e.fontSizes.xxl};
  font-weight: bold;
  transform: rotate(-30deg);
  opacity: 0.7;
  text-shadow: ${e.boxShadow.textShadow};
  user-select: none;
  white-space: nowrap;
`;s.div`
  font-size: ${e.fontSizes.xs};
  color: ${e.colors.text.secondary};
  margin-bottom: 6px;
`;const Q=({t,language:x,usernameManager:b,onSuccess:m})=>{const[g,f]=o.useState(!1),{showUsernamePrompt:c,setShowUsernamePrompt:w,usernameInput:u,setUsernameInput:y,usernameError:l,validateUsername:$,submitUsername:p,showAltButton:U,appendRandomDigits:n,isSubmittingUsername:a}=b;o.useEffect(()=>{f(!0)},[]);const r=d=>{console.log(`Username successfully updated to: ${d}`),g&&typeof window<"u"&&localStorage.setItem(M.PUBLIC_USERNAME,d),w(!1),m(d)},h=L(x)==="rtl";return c?i.jsx(D,{$zIndex:9999,children:i.jsxs(B,{$isRTL:h,style:{background:"#fff",padding:"30px",borderRadius:"12px",width:"90%",maxWidth:"400px",boxShadow:"0 8px 24px rgba(0,0,0,0.2)",direction:h?"rtl":"ltr"},children:[i.jsx("h2",{style:{fontSize:"16px",marginBottom:"12px"},children:t("Enter Username")}),i.jsx("p",{style:{fontSize:"14px",marginBottom:"16px",color:"#666"},children:t("Username should contain only letters, numbers and hyphens. Example: john-doe2")}),i.jsx(C,{value:u,onChange:d=>y(d.target.value),$isRTL:h}),l&&i.jsx(A,{$type:"error",style:{fontSize:"14px",padding:"8px",marginBottom:"12px"},children:l}),i.jsx(R,{$primary:!0,disabled:a,onClick:()=>{if(!$(u)){b.setUsernameError(t("Username must contain only letters, numbers, and hyphens."));return}p(u,r)},style:{width:"100%",marginBottom:"10px"},children:t("Select Username")}),U&&i.jsx(R,{disabled:a,onClick:()=>n(r),style:{width:"100%"},children:t("Add Random Digits to Username")})]})}):null};export{V as I,O as L,J as M,G as P,F as T,Q as U,q as V,H as W,K as a,_ as u};
