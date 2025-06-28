import{r as i,a6 as ee,a7 as te,a8 as G,m as oe,n as se,a9 as re,l as K,E as ne,a as ie,t as e,d as m,B as ae,u as le,j as s}from"./buttons-DAdOhyvx.js";const ce=(g,T)=>{const S=i.useRef(null),[a,v]=i.useState([]),[z,h]=i.useState(!1),[E,$]=i.useState(!1),[j,x]=i.useState({totalFiles:0,filesComplete:0,filesUploading:0,filesProcessing:0,filesWithError:0,overallProgress:0}),[P,U]=i.useState([]),[t,c]=i.useState(!1),[u,w]=i.useState(null),[b,k]=i.useState(!1),o=i.useMemo(()=>ee(U),[]),f=i.useMemo(()=>te(v),[]);i.useEffect(()=>{(async()=>{try{await ne(),o("🔥 S3 credentials prewarmed successfully")}catch(l){o(`⚠️ Credential prewarming failed: ${String(l)}`)}})()},[o]),i.useEffect(()=>{G(a,x)},[a]);const p=i.useRef(null);i.useEffect(()=>{if(t&&a.length>0&&T!==!0&&!b){p.current&&clearTimeout(p.current);const l=a.filter(n=>n.status==="complete").length,d=a.filter(n=>n.status==="error").length;o(`✅ Upload complete: ${l} successful, ${d} failed`),o(`🚀 Navigating to save-album with folderId: ${u}`),h(!1),$(!1),p.current=setTimeout(()=>{try{if(g)o(`🎯 Using custom navigation callback with folderId: ${u}`),g(u);else{const n=u?`save-album.html?folderId=${encodeURIComponent(u)}`:"save-album.html";o(`🎯 Using default navigation to: ${n}`),ie(n)}}catch(n){o(`❌ Navigation error: ${String(n)}`)}},500)}else if(t&&a.length>0&&b){const l=a.filter(n=>n.status==="complete").length,d=a.filter(n=>n.status==="error").length;o(`✅ Files added to existing album: ${l} successful, ${d} failed`),h(!1),$(!1)}return()=>{p.current&&clearTimeout(p.current)}},[t,a,u,g,o,T,b]);const I=i.useCallback(()=>{v([]),x({totalFiles:0,filesComplete:0,filesUploading:0,filesProcessing:0,filesWithError:0,overallProgress:0}),U([]),h(!1),$(!1),c(!1),k(!1),p.current&&(clearTimeout(p.current),p.current=null)},[]),H=i.useCallback((r=null)=>{var d;const l=!!r;w(r),c(!1),$(!1),p.current&&(clearTimeout(p.current),p.current=null),o(l?`📂 Opening file picker for existing album: ${r}`:"📂 Opening file picker for new album"),(d=S.current)==null||d.click()},[o]),F=i.useCallback(r=>{k(r),o(`🏠 Set isOnSaveAlbumPage to: ${r}`)},[o]),M=i.useCallback(async(r,l)=>{const d=Array.from(r.target.files||[]).sort((y,O)=>y.name.localeCompare(O.name,void 0,{numeric:!0,sensitivity:"base"}));if(!d.length)return o("❌ No files selected"),!1;const n=b?a.filter(y=>y.status==="complete"||y.status==="error"):[],Q=n.length>0;o(u?Q?`📸 Adding ${d.length} new files to existing album with ${n.length} previously uploaded photos`:`📸 Adding ${d.length} new files to existing album: ${u}`:`📸 Processing ${d.length} new files for new album`),o(`📝 Original filenames: ${d.map(y=>y.name).join(", ")}`),h(!0),$(!0),c(!1);const N=n.length+d.length,J=n.length;x({totalFiles:N,filesComplete:J,filesUploading:0,filesProcessing:d.length,filesWithError:0,overallProgress:N>0?Math.round(J/N*100):0});try{if(!await oe())return o("❌ Authentication failed"),h(!1),$(!1),!1;if(!l)return o("❌ Missing Cognito Username"),h(!1),$(!1),!1;const O=u||`${l}_____${se()}____Folder`;o(`📁 Using folder ID: ${O}${u?" (existing)":" (new)"}`),w(O);const V=d.map(C=>({fileName:C.name,originalFileName:C.name,s3PreviewUrl:URL.createObjectURL(C),type:C.type,size:C.size,status:"pending",progress:0})),X=[...n,...V];v(X),o(`🚀 Starting upload process for ${d.length} files with original filenames preserved...`);const R=await re(d,l,f,o),L=[...n,...R];v(L),G(L,x),localStorage.setItem(K.SELECTED_PHOTOS,JSON.stringify(L)),o(`💾 Saved ${L.length} photos metadata to localStorage (including original filenames)`);const Z=R.filter(C=>C.status==="complete"),Y=R.filter(C=>C.status==="error");return Z.length===R.length&&Y.length===0?o(`✅ All ${R.length} new files successfully uploaded with original filenames`):Y.length>0&&o(`⚠️ Upload completed with ${Y.length} errors out of ${R.length} new files`),o("🎯 Setting fileProcessingComplete=true to trigger navigation"),c(!0),!0}catch(y){return o(`❌ Fatal error in handleFileSelection: ${String(y)}`),console.error("Upload error:",y),h(!1),$(!1),c(!1),!1}finally{r.target&&(r.target.value="")}},[u,f,o,a,b]),B=i.useCallback(()=>{I(),w(null),k(!1),o("🔄 Reset for new album creation")},[I,o]),_=i.useCallback(()=>{try{const r=localStorage.getItem(K.SELECTED_PHOTOS);if(r){const l=JSON.parse(r);if(Array.isArray(l)&&l.length>0)return v(l),o(`📸 Loaded ${l.length} photos from storage (including original filenames)`),l}}catch(r){o(`⚠️ Failed to load photos from storage: ${String(r)}`)}return[]},[o]),W=i.useCallback(()=>z||E||j.totalFiles>0&&j.filesComplete<j.totalFiles,[z,E,j]),A=i.useCallback(()=>{const r=a.filter(n=>n.status==="complete").length,l=a.filter(n=>n.status==="error").length,d=a.filter(n=>n.status==="pending"||n.status==="uploading").length;return{total:a.length,complete:r,errors:l,pending:d,successRate:a.length>0?r/a.length*100:0}},[a]);return i.useEffect(()=>()=>{p.current&&clearTimeout(p.current),a.forEach(r=>{r.s3PreviewUrl&&r.s3PreviewUrl.startsWith("blob:")&&URL.revokeObjectURL(r.s3PreviewUrl)})},[a]),{fileInputRef:S,selectedPhotos:a,setSelectedPhotos:v,isUploading:z,setIsUploading:h,isProcessingFiles:E,setIsProcessingFiles:$,progressTracker:j,setProgressTracker:x,debugMessages:P,fileProcessingComplete:t,setFileProcessingComplete:c,currentFolderId:u,isOnSaveAlbumPage:b,openFilePicker:H,handleFileSelection:M,clearUploadData:I,log:o,updatePhotoStatus:f,setOnSaveAlbumPage:F,resetForNewAlbum:B,loadPhotosFromStorage:_,hasUploadsInProgress:W,getUploadStats:A}},ge=m.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${e.colors.overlay};
  z-index: ${g=>g.$zIndex||1e4}; /* Always above header (9999) */
  display: flex;
  justify-content: center;
  align-items: center;
`,ue=m.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${e.colors.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  padding: 20px;
  overflow: hidden;
  overscroll-behavior: contain;
  
  @media (max-width: ${e.breakpoints.mobile}) {
    padding: 16px;
  }
`,D=m.div`
  background: ${e.colors.background.card};
  border-radius: ${e.borderRadius.large};
  padding: ${e.spacing.xl};
  width: 100%;
  box-shadow: ${e.boxShadow.xl};
  direction: ${g=>g.$isRTL?"rtl":"ltr"};
  animation: modalFadeIn 0.3s ease-out;
  position: relative;
  
  @media (max-width: ${e.breakpoints.mobile}) {
    padding: ${e.spacing.lg};
    border-radius: ${e.borderRadius.medium};
  }
  
  @keyframes modalFadeIn {
    from {
      opacity: 0;
      transform: scale(0.9) translateY(-20px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`,pe=m.h2`
  margin: 0 0 ${e.spacing.md} 0;
  font-size: ${e.fontSizes.xxl};
  font-weight: 600;
  color: ${e.colors.text.primary};
  text-align: center;
  
  @media (max-width: ${e.breakpoints.mobile}) {
    font-size: ${e.fontSizes.xl};
  }
`,fe=m.p`
  margin: 0 0 ${e.spacing.lg} 0;
  font-size: ${e.fontSizes.md};
  color: ${e.colors.text.secondary};
  line-height: 1.5;
  text-align: center;
  
  @media (max-width: ${e.breakpoints.mobile}) {
    font-size: ${e.fontSizes.sm};
  }
`,q=m(ae)`
  width: 100%;
  padding: 12px ${e.spacing.lg};
  font-size: ${e.fontSizes.sm};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: ${e.breakpoints.mobile}) {
    padding: 14px ${e.spacing.md};
  }
`,me=m(q)`
  background: transparent;
  color: ${e.colors.text.secondary};
  border: 1px solid ${e.colors.text.secondary};

  &:hover {
    background: ${e.colors.text.secondary};
    color: ${e.colors.white};
  }
`;m(q)`
  background: ${e.colors.primary};
  color: ${e.colors.white};
  border: none;

  &:hover:not(:disabled) {
    background: ${e.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;m.div`
  padding: ${e.spacing.lg} ${e.spacing.lg} ${e.spacing.md} ${e.spacing.lg};
  border-bottom: 1px solid ${e.colors.borderLight};
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: ${g=>g.$isRTL?"row-reverse":"row"};
  
  @media (max-width: ${e.breakpoints.mobile}) {
    padding: ${e.spacing.md} ${e.spacing.md} ${e.spacing.sm} ${e.spacing.md};
  }
`;m.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: ${e.spacing.sm} ${e.spacing.lg};
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  
  @media (max-width: ${e.breakpoints.mobile}) {
    padding: ${e.spacing.sm} ${e.spacing.md};
  }
`;m.div`
  padding: ${e.spacing.sm} ${e.spacing.lg} ${e.spacing.lg} ${e.spacing.lg};
  border-top: 1px solid ${e.colors.borderLight};
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: ${g=>g.$isRTL?"row-reverse":"row"};
  gap: ${e.spacing.sm};
  
  @media (max-width: ${e.breakpoints.mobile}) {
    padding: ${e.spacing.md} ${e.spacing.md} ${e.spacing.lg} ${e.spacing.md};
    flex-direction: column;
    gap: ${e.spacing.md};
    align-items: stretch;
  }
`;m(D)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-height: 90vh;
  max-width: 90vw;
`;const he=m(D)`
  max-width: 500px;
  
  @media (max-width: ${e.breakpoints.mobile}) {
    max-width: calc(100vw - 32px);
  }
`;m(D)`
  max-width: 1200px;
  max-height: 90vh;
  
  @media (max-width: ${e.breakpoints.mobile}) {
    max-width: calc(100vw - 32px);
  }
`;const be=({progressTracker:g,isRTL:T=!1,onCancel:S,style:a,className:v,variant:z="default",showDetailsLabels:h=!0,showSuccessMessage:E=!1,showErrorMessage:$=!1,customMessages:j={},isUploading:x=!1,isProcessingFiles:P=!1,context:U="uploading"})=>{const{t}=le(),{totalFiles:c,filesComplete:u,filesWithError:w,filesUploading:b,filesProcessing:k,overallProgress:o}=g,f=c>0&&u===c&&w===0,p=b>0||k>0||c>0&&!f;if(!(x||P||p))return null;const F=()=>w>0?"#ff9800":f?"#2e7d32":"#4caf50",M=()=>f?t(U==="saving"?"Album Ready":"Completed"):k>0||P?t(U==="saving"?"Preparing Album":"Processing"):b>0?t("Uploading"):t(x&&c===0?"Preparing":U==="saving"?"Preparing Album":"Uploading"),B=()=>{switch(U){case"saving":return t(f?"Album preparation complete":"Album preparation");case"processing":return t(f?"Processing complete":"File processing");case"uploading":default:return t(f?"Upload complete":"Upload progress")}},_=E&&g.filesComplete>0&&g.filesComplete===g.totalFiles,W=$&&g.filesWithError>0,A={marginBottom:24,padding:16,backgroundColor:"#f5f5f5",borderRadius:8,width:"100%",boxSizing:"border-box",direction:T?"rtl":"ltr",boxShadow:"0 1px 3px rgba(0,0,0,0.1)",animation:"fadeIn 0.3s ease-in-out",...a},r=f?100:c>0?o:0,l=c>0?c:x?"...":0,d=c>0?u:0;return z==="compact"?s.jsxs("div",{className:v,style:A,children:[s.jsxs("div",{style:{marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center"},children:[s.jsxs("span",{style:{fontSize:14,color:"#555"},children:[s.jsx("strong",{children:M()}),": ",Math.round(r),"%"]}),S&&!f&&s.jsx("button",{onClick:S,style:{background:"none",border:"none",cursor:"pointer",color:"#d32f2f",fontSize:13,padding:"4px 8px",borderRadius:4},"aria-label":t("Cancel"),title:t("Cancel"),children:t("Cancel")})]}),s.jsxs("div",{style:{width:"100%",height:8,backgroundColor:"#e0e0e0",borderRadius:4,overflow:"hidden",position:"relative"},children:[s.jsx("div",{style:{width:`${r}%`,height:"100%",backgroundColor:F(),transition:"width 0.3s ease-in-out"}}),(P||x&&c===0)&&r===0&&s.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,bottom:0,background:"linear-gradient(90deg, transparent, rgba(76, 175, 80, 0.3), transparent)",backgroundSize:"200% 100%",animation:"shimmer 1.5s infinite",pointerEvents:"none"}})]})]}):z==="detailed"?s.jsxs("div",{className:v,style:A,children:[s.jsxs("div",{style:{marginBottom:12},children:[s.jsx("h3",{style:{margin:0,fontSize:16,fontWeight:"bold",color:"#333",marginBottom:8},children:B()}),s.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:6},children:[s.jsxs("span",{style:{fontSize:14,color:"#555"},children:[t("Overall progress"),": ",Math.round(r),"%"]}),s.jsxs("span",{style:{fontSize:14,color:"#555"},children:[t("Complete"),": ",d," / ",l]})]})]}),s.jsxs("div",{style:{width:"100%",height:8,backgroundColor:"#e0e0e0",borderRadius:4,overflow:"hidden",position:"relative",marginBottom:16},children:[s.jsx("div",{style:{width:`${r}%`,height:"100%",backgroundColor:F(),transition:"width 0.3s ease-in-out"}}),(P||x&&c===0)&&r===0&&s.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,bottom:0,background:"linear-gradient(90deg, transparent, rgba(76, 175, 80, 0.3), transparent)",backgroundSize:"200% 100%",animation:"shimmer 1.5s infinite",pointerEvents:"none"}})]}),s.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:12,fontSize:14,color:"#555"},children:[b>0&&s.jsxs("div",{children:[h?`${t("Uploading")}: `:"",b]}),(k>0||P)&&s.jsxs("div",{children:[h?`${t("Processing")}: `:"",k||"..."]}),u>0&&s.jsxs("div",{children:[h?`${t("Complete")}: `:"",u]}),w>0&&s.jsxs("div",{style:{color:"#d32f2f"},children:[h?`${t("Failed")}: `:"",w]}),S&&!f&&s.jsx("button",{onClick:S,style:{marginLeft:"auto",background:"none",border:"none",cursor:"pointer",color:"#d32f2f",fontSize:13,padding:"4px 8px",borderRadius:4},children:t("Cancel")})]})]}):s.jsxs("div",{className:v,style:A,children:[s.jsxs("div",{style:{marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center"},children:[s.jsxs("span",{style:{fontSize:14,color:"#555"},children:[s.jsx("strong",{children:M()}),": ",d,"/",l,w>0&&` (${t("{{count}} failed",{count:w.toString()})})`,b>0&&` (${t("{{count}} in progress",{count:b.toString()})})`]}),s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[s.jsxs("span",{style:{fontSize:14,color:"#555",fontWeight:"bold"},children:[Math.round(r),"%"]}),S&&!f&&s.jsx("button",{onClick:S,style:{background:"none",border:"none",cursor:"pointer",color:"#d32f2f",fontSize:13,padding:"4px 8px",borderRadius:4},"aria-label":t("Cancel"),title:t("Cancel"),children:t("Cancel")})]})]}),s.jsxs("div",{style:{width:"100%",height:8,backgroundColor:"#e0e0e0",borderRadius:4,overflow:"hidden",position:"relative"},children:[s.jsx("div",{style:{width:`${r}%`,height:"100%",backgroundColor:F(),transition:"width 0.3s ease-in-out"}}),(P||x&&c===0||k>0)&&r<100&&s.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,bottom:0,background:"linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",backgroundSize:"200% 100%",animation:"shimmer 1.5s infinite",pointerEvents:"none"}})]}),_&&s.jsx("div",{style:{backgroundColor:"#e8f5e9",color:"#2e7d32",padding:"10px 16px",borderRadius:"6px",fontSize:"14px",marginTop:"10px",textAlign:"center"},children:j.success||t(U==="saving"?"Album ready to save!":"Upload complete! Preparing to save your album...")}),W&&s.jsx("div",{style:{backgroundColor:"#ffebee",color:"#c62828",padding:"10px 16px",borderRadius:"6px",fontSize:"14px",marginTop:"10px",textAlign:"center"},children:j.error||t("Some files could not be uploaded. You can continue with the successfully uploaded files.")}),s.jsx("style",{children:`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `})]})};export{ue as M,he as S,be as U,pe as a,fe as b,me as c,ge as d,D as e,ce as u};
