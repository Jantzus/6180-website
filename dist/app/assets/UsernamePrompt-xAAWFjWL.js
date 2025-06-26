import{r as o,m as E,k as j,t,d as i,J as A,j as r,X as L,ab as M,M as C,B as R,g as D,l as z}from"./layout-D_Ibv38s.js";import{d as B}from"./UploadProgress-CMaSe76V.js";const _=e=>{const[x,b]=o.useState(!1),[m,g]=o.useState(""),[f,c]=o.useState(""),[y,u]=o.useState(!1),[w,l]=o.useState(!1),$=o.useCallback(s=>{const n=/^[a-zA-Z0-9-]+$/.test(s);return console.log(`Username validation for '${s}': ${n}`),n},[]),p=o.useCallback(async(s,n)=>{var S,k;console.log(`Submitting username: ${s}`),l(!0),c("");const a=await E();if(!a){c(e("Authentication error. Please try again.")),l(!1);return}const h=`
      mutation MyMutation($savePublicProfileDisplayNameInput: SavePublicProfileDisplayNameInput) {
        changeMyAccountItem(savePublicProfileDisplayNameInput: $savePublicProfileDisplayNameInput) {
          ... on Profile {
            anyDisplayName
          }
        }
      }
    `,d={savePublicProfileDisplayNameInput:{anyDisplayName:s}};try{const v=await(await fetch(j,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({query:h,variables:d})})).json(),P=(k=(S=v==null?void 0:v.data)==null?void 0:S.changeMyAccountItem)==null?void 0:k.anyDisplayName;if(P)n(P);else throw new Error("Username taken")}catch(I){console.error(`Error submitting username: ${I}`),c(e("Username is already taken. Please try a different one.")),u(!0),l(!1)}},[e]),U=o.useCallback(s=>{const n=Math.floor(1e5+Math.random()*9e5).toString(),a=`${m}${n}`;console.log(`Appending random digits to username: ${m} -> ${a}`),g(a),p(a,s)},[m,p]);return{showUsernamePrompt:x,setShowUsernamePrompt:b,usernameInput:m,setUsernameInput:g,usernameError:f,setUsernameError:c,showAltButton:y,setShowAltButton:u,isSubmittingUsername:w,setIsSubmittingUsername:l,validateUsername:$,submitUsername:p,appendRandomDigits:U}},O=i.div`
  position: relative;
  overflow: hidden;
  background-color: ${t.colors.grayLighter};
  width: 100%;
  padding-bottom: 75%;
  height: 0;
  border-radius: ${t.borderRadius.medium};
  
  @media (max-width: ${t.breakpoints.mobile}) {
    padding-bottom: 100%;
  }
`,V=i.img`
  opacity: ${e=>e.$isLoaded?1:0};
  transition: opacity 0.3s;
  max-width: 100%;
  max-height: 100%;
  object-fit: ${e=>e.$objectFit||"contain"};
  border-radius: ${t.borderRadius.medium};
  /* Image protection */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
  pointer-events: auto; /* Keep pointer events for click handlers */
  
  ${e=>e.$objectFit==="cover"&&A`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  `}
`,W=i.div`
  position: relative;
  overflow: hidden;
  background-color: ${t.colors.grayLighter};
  width: 100%;
  min-height: 200px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  border-radius: ${t.borderRadius.medium};
  
  @media (max-width: ${t.breakpoints.mobile}) {
    min-height: 120px;
    aspect-ratio: 1/1;
    height: 0;
    padding-bottom: 100%;
  }
`,F=i.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background-color: ${t.colors.overlayLight};
  border-radius: ${t.borderRadius.circle};
  z-index: 2;
  
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 55%;
    transform: translate(-50%, -50%);
    border-style: solid;
    border-width: 15px 0 15px 25px;
    border-color: transparent transparent transparent ${t.colors.white};
  }
  
  @media (max-width: ${t.breakpoints.mobile}) {
    width: 40px;
    height: 40px;
    
    &::before {
      border-width: 10px 0 10px 16px;
    }
  }
`,G=i.div`
  position: relative;
  margin-bottom: ${t.spacing.sm};
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`,J=i.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: ${t.borderRadius.medium};
  /* Image protection */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
  pointer-events: auto;
`,K=i.video`
  max-width: 100%;
  max-height: 100%;
  border-radius: ${t.borderRadius.medium};
  /* Video protection */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
`;i.div`
  position: relative;
`;const q=({t:e,language:x,usernameManager:b,onSuccess:m})=>{const[g,f]=o.useState(!1),{showUsernamePrompt:c,setShowUsernamePrompt:y,usernameInput:u,setUsernameInput:w,usernameError:l,validateUsername:$,submitUsername:p,showAltButton:U,appendRandomDigits:s,isSubmittingUsername:n}=b;o.useEffect(()=>{f(!0)},[]);const a=d=>{console.log(`Username successfully updated to: ${d}`),g&&typeof window<"u"&&localStorage.setItem(z.PUBLIC_USERNAME,d),y(!1),m(d)},h=D(x)==="rtl";return c?r.jsx(L,{$zIndex:9999,children:r.jsxs(B,{$isRTL:h,style:{background:"#fff",padding:"30px",borderRadius:"12px",width:"90%",maxWidth:"400px",boxShadow:"0 8px 24px rgba(0,0,0,0.2)",direction:h?"rtl":"ltr"},children:[r.jsx("h2",{style:{fontSize:"16px",marginBottom:"12px"},children:e("Enter Username")}),r.jsx("p",{style:{fontSize:"14px",marginBottom:"16px",color:"#666"},children:e("Username should contain only letters, numbers and hyphens. Example: john-doe2")}),r.jsx(M,{value:u,onChange:d=>w(d.target.value),$isRTL:h}),l&&r.jsx(C,{$type:"error",style:{fontSize:"14px",padding:"8px",marginBottom:"12px"},children:l}),r.jsx(R,{$primary:!0,disabled:n,onClick:()=>{if(!$(u)){b.setUsernameError(e("Username must contain only letters, numbers, and hyphens."));return}p(u,a)},style:{width:"100%",marginBottom:"10px"},children:e("Select Username")}),U&&r.jsx(R,{disabled:n,onClick:()=>s(a),style:{width:"100%"},children:e("Add Random Digits to Username")})]})}):null};export{V as I,O as L,G as M,F as P,W as T,q as U,K as V,J as a,_ as u};
