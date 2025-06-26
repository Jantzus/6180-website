import{d as o,t as e}from"./buttons-CJB49aeq.js";import{I as r}from"./forms-DoOSyb7H.js";const a=o(r)`
  letter-spacing: 2px;
  text-align: center;
`,d=o.p`
  font-size: 13px;
  color: #666;
  margin-top: 16px;
  text-align: center;
`,i=o.div`
  margin-top: 16px;
  font-size: 14px;
  color: #666;
  display: flex;
  justify-content: center;
  gap: 8px;
`,p=o.button`
  background: none;
  border: none;
  color: #007bff;
  padding: 0;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${e.colors.primaryDark};
  }
`,s=o.div`
  max-width: 400px;
  width: 100%;
  /* Enhanced: Increased top padding for breathing room above logo */
  padding: 40px 32px 32px;
  /* Enhanced: Larger border radius for more modern look */
  border-radius: ${e.borderRadius.large}; // 16px as mentioned
  /* Enhanced: Softer, more elevated shadow */
  box-shadow: ${e.boxShadow.cardSoft};
  text-align: center;
  background-color: ${e.colors.background.card};
  /* Add subtle backdrop blur for depth */
  backdrop-filter: blur(10px);
  
  @media (max-width: ${e.breakpoints.mobile}) {
    padding: 32px 24px 24px;
    margin: 0 16px;
  }
`,c=o.div`
  margin-bottom: 24px;
`,x=o.img`
  height: 60px;
  margin-bottom: 16px;
`,g=o.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  padding: 20px;
`;export{g as C,d as I,s as L,a as O,i as R,c as a,x as b,p as c};
