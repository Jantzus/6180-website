import{an as se,ao as re,r as v,j as o,d as u,u as te,g as oe,a3 as J,Y as ae}from"./buttons-CJB49aeq.js";import{L as le}from"./LazyImage-CH2pOAJ-.js";var de=se();const V=re(de),Qe=({isOpen:e,onClose:s,t:i,isRTL:t})=>{const[l,r]=v.useState(!1);if(v.useEffect(()=>{r(!0)},[]),!e||!l)return null;const x=o.jsx("div",{style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 0.5)",display:"flex",justifyContent:"center",alignItems:"center",zIndex:1e4},onClick:s,children:o.jsxs("div",{style:{backgroundColor:"white",borderRadius:"12px",padding:"20px",width:"90%",maxWidth:"400px",boxShadow:"0 4px 20px rgba(0, 0, 0, 0.15)",direction:t?"rtl":"ltr",textAlign:t?"right":"left"},onClick:g=>g.stopPropagation(),children:[o.jsx("h3",{style:{marginTop:0,marginBottom:"16px",fontSize:"18px"},children:i("Link to album website copied.")}),o.jsx("button",{style:{width:"100%",padding:"12px",border:"1px solid #ddd",borderRadius:"6px",backgroundColor:"#f0f0f0",textAlign:"center",cursor:"pointer",fontSize:"14px"},onClick:g=>{g.stopPropagation(),s()},onMouseOver:g=>{g.stopPropagation(),g.currentTarget.style.backgroundColor="#e0e0e0"},onMouseOut:g=>{g.stopPropagation(),g.currentTarget.style.backgroundColor="#f0f0f0"},children:i("OK")})]})});return V.createPortal(x,document.body)},Ve=({isOpen:e,onClose:s,albumLink:i,t,isRTL:l})=>{const[r,x]=v.useState(!1);if(v.useEffect(()=>{x(!0)},[]),!e||!r)return null;const g=`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(i)}`,f=o.jsxs("div",{style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 0.5)",display:"flex",justifyContent:"center",alignItems:"center",zIndex:1e4,backdropFilter:"blur(4px)",WebkitBackdropFilter:"blur(4px)",padding:"20px"},onClick:s,children:[o.jsxs("div",{style:{backgroundColor:"white",borderRadius:"16px",padding:"32px",width:"90%",maxWidth:"400px",boxShadow:"0 20px 60px rgba(0, 0, 0, 0.3)",direction:l?"rtl":"ltr",textAlign:"center",position:"relative",animation:"modalFadeIn 0.3s ease-out"},onClick:m=>m.stopPropagation(),children:[o.jsx("h3",{style:{marginTop:0,marginBottom:"16px",fontSize:"20px",color:"#333",fontWeight:"600"},children:t("Share Album with QR Code")}),o.jsx("p",{style:{margin:"0 0 24px 0",fontSize:"14px",color:"#666",lineHeight:"1.5"},children:t("Let others scan this QR code with their phone camera to instantly access your album")}),o.jsx("div",{style:{display:"flex",justifyContent:"center",marginBottom:"24px",padding:"20px",backgroundColor:"#f8f9fa",borderRadius:"12px",border:"1px solid #e9ecef"},children:o.jsx("img",{src:g,alt:t("QR Code for album"),style:{width:"200px",height:"200px",border:"4px solid white",borderRadius:"8px",boxShadow:"0 2px 8px rgba(0,0,0,0.1)"},onError:m=>{m.currentTarget.style.display="none";const d=m.currentTarget.parentElement;d&&(d.innerHTML=`
                  <div style="
                    width: 200px; 
                    height: 200px; 
                    background: #f0f0f0; 
                    border-radius: 8px; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center;
                    color: #666;
                    font-size: 14px;
                    text-align: center;
                    padding: 20px;
                    box-sizing: border-box;
                  ">
                    ${t("QR Code could not be generated. Please use the link sharing option instead.")}
                  </div>
                `)}})}),o.jsxs("div",{style:{backgroundColor:"#e8f4f8",padding:"16px",borderRadius:"8px",marginBottom:"24px",border:"1px solid #b3e0f2"},children:[o.jsx("p",{style:{margin:"0 0 8px 0",fontSize:"13px",color:"#0c5460",fontWeight:"600"},children:t("How to scan:")}),o.jsxs("p",{style:{margin:0,fontSize:"12px",color:"#0c5460",lineHeight:"1.4",textAlign:l?"right":"left"},children:["• ",t("open your phone camera app (or use any QR code scanner app)"),o.jsx("br",{}),"• ",t("point camera at the QR code"),o.jsx("br",{}),"• ",t("tap the notification that appears"),o.jsx("br",{})]})]}),o.jsxs("div",{style:{backgroundColor:"#f8f9fa",padding:"12px",borderRadius:"6px",marginBottom:"20px",border:"1px solid #e9ecef"},children:[o.jsx("p",{style:{margin:"0 0 4px 0",fontSize:"11px",color:"#666",fontWeight:"600"},children:t("Album Link:")}),o.jsx("p",{style:{margin:0,fontSize:"11px",color:"#333",wordBreak:"break-all",fontFamily:"monospace"},children:i})]}),o.jsx("button",{style:{width:"100%",padding:"12px 24px",border:"none",borderRadius:"8px",backgroundColor:"#007bff",color:"white",fontSize:"14px",fontWeight:"600",cursor:"pointer",transition:"background-color 0.2s"},onClick:m=>{m.stopPropagation(),s()},onMouseOver:m=>{m.currentTarget.style.backgroundColor="#0056b3"},onMouseOut:m=>{m.currentTarget.style.backgroundColor="#007bff"},children:t("Close")})]}),o.jsx("style",{children:`
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
        `})]});return V.createPortal(f,document.body)},F=typeof window<"u"&&typeof document<"u",ce=(e,s,i)=>{if(!F){console.warn("downloadPhotos called in non-browser environment");return}/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?pe(e,s,i):xe(e,s)},q=async(e,s)=>{try{const i=await fetch(e.url);if(!i.ok)throw new Error(`HTTP error! status: ${i.status}`);const t=await i.blob(),l=window.URL.createObjectURL(t),r=document.createElement("a");return r.href=l,r.download=s,r.style.display="none",document.body.appendChild(r),r.click(),document.body.removeChild(r),window.URL.revokeObjectURL(l),!0}catch(i){return console.warn("Blob download failed:",i),!1}},pe=(e,s,i)=>{if(!F)return;const t=document.createElement("div");t.style.cssText=`
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background-color: rgba(0, 0, 0, 0.7); z-index: 10000;
    display: flex; justify-content: center; align-items: center;
  `;const l=document.createElement("div");l.style.cssText=`
    background: white; border-radius: 8px; padding: 0; width: 95%;
    max-width: 400px; max-height: 85%; display: flex; flex-direction: column;
    position: relative; box-sizing: border-box;
  `;const r=document.createElement("div");r.style.cssText=`
    position: sticky; top: 0; background: white; z-index: 10;
    padding: 15px 20px; border-top-left-radius: 8px; border-top-right-radius: 8px;
    display: flex; justify-content: flex-start;
  `;const x=document.createElement("button");x.textContent=s("Close"),x.style.cssText=`
    padding: 10px 16px; background: #f3f4f6; border: none;
    border-radius: 4px; cursor: pointer;
  `,x.onclick=()=>document.body.removeChild(t),r.appendChild(x);const g=document.createElement("div");g.style.cssText=`
    overflow: auto; padding: 0px 16px; flex-grow: 1;
    width: 100%; box-sizing: border-box;
  `;const f=document.createElement("div");f.style.cssText=`
    display: grid; grid-template-columns: repeat(2, 1fr);
    gap: 10px; margin-bottom: 20px; width: 100%; box-sizing: border-box;
  `,e&&e.mediaItems.length>0&&e.mediaItems.forEach((b,y)=>{const $=document.createElement("div");$.style.cssText=`
        display: flex; flex-direction: column; align-items: center;
        border: 1px solid #eee; padding: 10px; border-radius: 4px;
      `;const j=document.createElement("img");j.src=b.type==="image"?b.thumbnailUrl||b.url:b.thumbnailUrl||"",j.style.cssText=`
        width: 100%; height: 120px; object-fit: cover;
        margin-bottom: 10px; cursor: pointer;
      `,j.onclick=()=>{document.body.removeChild(t),i(y)};const w=document.createElement("button"),D=b.fileDisplayName||`${e.folderName||"media"}-${y+1}.${b.type==="image"?"jpg":"mp4"}`;/iPhone|iPad|iPod/.test(navigator.userAgent)?(w.addEventListener("click",function(E){E.preventDefault(),document.body.removeChild(t),i(y)}),w.textContent=b.type==="image"?s("View Photo"):s("View Video")):(w.addEventListener("click",async function(E){E.preventDefault(),w.textContent=s("Downloading..."),w.disabled=!0;const B=await q(b,D);w.textContent=s(B?"Downloaded!":"Download Failed"),w.disabled=!1,setTimeout(()=>{w.textContent=s("Download")},2e3)}),w.textContent=s("Download")),w.style.cssText=`
        text-decoration: none; color: white; background-color: #006adc;
        padding: 8px 8px; border: none; border-radius: 4px; font-size: 13px;
        text-align: center; width: 100%; box-sizing: border-box;
        white-space: nowrap; cursor: pointer;
      `,$.appendChild(j),$.appendChild(w),f.appendChild($)});const m=document.createElement("p");m.innerHTML=s("Due to technical limitations, bulk downloads on mobile browsers aren't supported, and some videos may not download.<br><br>To download all photos and videos at once, please:"),m.style.cssText="padding-right: 10px; font-size: 14px; width: 100%; box-sizing: border-box;";const d=document.createElement("ul");d.style.paddingLeft="20px",[s("visit this page on a desktop computer to download all photos and videos at once"),s("save the photos to your 6180 account and use the 6180 app"),s('select the "Open On iPhone App" option')].forEach(b=>{const y=document.createElement("li");y.textContent=b,y.style.cssText="margin-bottom: 10px; font-size: 14px;",d.appendChild(y)}),l.appendChild(r),g.appendChild(m),g.appendChild(d),g.appendChild(f),l.appendChild(g),t.appendChild(l),document.body.appendChild(t)},xe=(e,s)=>{if(!F)return;if(!e||e.mediaItems.length===0){alert(s("No items to download"));return}const i=e.mediaItems,t=e.folderName||"Photos";if(i.length>50&&!confirm(s(`You are downloading ${i.length} files. This may take several minutes. Continue?`)))return;const l=ge(s);if(!l)return;document.body.appendChild(l.container);let r=!1;l.cancelBtn.onclick=()=>{r=!0,document.body.removeChild(l.container)},ue(i,t,l,s,()=>r).then(()=>{r||setTimeout(()=>{document.body.contains(l.container)&&document.body.removeChild(l.container)},2e3)}).catch(x=>{r||he(l,s,x.message,()=>{document.body.removeChild(l.container),fe(i,t)})})},ge=e=>{if(!F)return null;const s=document.createElement("div");s.style.cssText=`
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center;
    align-items: center; z-index: 2000;
  `;const i=document.createElement("div");i.style.cssText=`
    background: white; padding: 30px; border-radius: 8px;
    text-align: center; min-width: 300px;
  `;const t=document.createElement("p");t.textContent=e("Preparing your download..."),t.style.cssText="margin-bottom: 20px; font-size: 16px; font-weight: 500;";const l=document.createElement("div");l.style.cssText=`
    width: 100%; background: #f0f0f0; border-radius: 4px;
    overflow: hidden; margin-bottom: 10px;
  `;const r=document.createElement("div");r.style.cssText=`
    width: 0%; height: 20px; background: #006adc;
    transition: width 0.3s ease;
  `;const x=document.createElement("div");x.style.cssText="font-size: 12px; color: #666; margin-bottom: 10px;";const g=document.createElement("button");return g.textContent=e("Cancel"),g.style.cssText=`
    padding: 8px 16px; background: #f3f4f6; border: 1px solid #ccc;
    border-radius: 4px; cursor: pointer; margin-top: 10px;
  `,l.appendChild(r),i.appendChild(t),i.appendChild(l),i.appendChild(x),i.appendChild(g),s.appendChild(i),{container:s,title:t,progressBar:r,progressText:x,cancelBtn:g}},ue=async(e,s,i,t,l)=>{if(!F)return;let r=0,x=0;const g=new Set;i.title.textContent=t("Starting downloads..."),i.progressText.textContent=t("Files will download with their original names");for(let f=0;f<e.length;f++){if(l())return;const m=e[f];let d=m.fileDisplayName;if(!d){const $=m.type==="image"?"jpg":"mp4";d=`${s}-${f+1}.${$}`}let T=d,b=1;for(;g.has(T.toLowerCase());){const $=d.lastIndexOf(".");if($!==-1){const j=d.substring(0,$),w=d.substring($);T=`${j} (${b})${w}`}else T=`${d} (${b})`;b++}g.add(T.toLowerCase()),i.progressText.textContent=t(`Downloading ${f+1} of ${e.length}: ${T}`);try{await q(m,T)?r++:x++,await new Promise(j=>setTimeout(j,500))}catch($){console.warn(`Failed to download file ${T}:`,$),x++}const y=Math.round((f+1)/e.length*100);i.progressBar.style.width=`${y}%`}l()||(i.title.textContent=t("Downloads complete!"),x>0?i.progressText.textContent=t(`${r} files downloaded with original names, ${x} failed`):i.progressText.textContent=t(`All ${r} files downloaded with their original names!`),setTimeout(()=>{!l()&&document.body.contains(i.container)&&document.body.removeChild(i.container)},3e3))},fe=async(e,s)=>{if(F)for(let i=0;i<e.length;i++){const t=e[i],l=t.fileDisplayName||`${s}-${i+1}.${t.type==="image"?"jpg":"mp4"}`;await new Promise(r=>setTimeout(r,i*1e3));try{await q(t,l)}catch(r){console.warn(`Failed to download file ${i+1}:`,r)}}},he=(e,s,i,t)=>{if(!F||!e)return;e.title.textContent=s("Download failed"),e.progressText.textContent=i,e.progressBar.style.backgroundColor="#d32f2f",e.progressBar.style.width="100%",e.cancelBtn.textContent=s("Close");const l=document.createElement("button");l.textContent=s("Retry"),l.style.cssText=`
    padding: 8px 16px; background: #006adc; color: white;
    border: none; border-radius: 4px; cursor: pointer;
    margin-top: 10px; margin-left: 10px;
  `,l.onclick=t,e.cancelBtn.parentNode.appendChild(l)},me=u.div`
  width: 100%;
  /* Remove gray background, padding, border, and border-radius */
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  direction: ${e=>e.$isRTL?"rtl":"ltr"};
`,X=u.div`
  margin-bottom: 8px; /* Reduced from 12px to 8px for tighter spacing */

  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 6px; /* Tighter mobile spacing */
  }
`,Z=u.div`
  display: flex;
  flex-direction: ${e=>e.$isRTL?"row-reverse":"row"};
  gap: 12px; /* Keep 12px horizontal spacing between tag buttons */
  overflow-x: auto;
  padding-bottom: 6px; /* Reduced from 8px to 6px */
  -webkit-overflow-scrolling: touch;
  flex-wrap: nowrap;
  align-items: center;

  /* Hide scrollbar for WebKit browsers */
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for Firefox */
  scrollbar-width: none;
  
  @media (max-width: 480px) {
    gap: 8px; /* Tighter mobile spacing */
    padding-bottom: 4px; /* Tighter mobile spacing */
  }
`,be=u.button`
  padding: 6px 12px; /* Keeping existing padding for good touch targets */
  border: 1px solid ${e=>e.$isDisplayed?"#28a745":e.$isSelected?"#000000":"#ced4da"};
  border-radius: 16px;
  background: ${e=>e.$isDisplayed?"#28a745":e.$isSelected?"#000000":"#ffffff"};
  color: ${e=>e.$isDisplayed||e.$isSelected?"#ffffff":"#495057"};
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
  height: 36px; /* Reduced from 40px to 36px */
  display: flex;
  align-items: center;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background: ${e=>e.$isDisplayed?"#1e7e34":e.$isSelected?"#333333":"#e9ecef"};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  @media (max-width: 480px) {
    padding: 5px 10px; /* Slightly tighter mobile padding */
    font-size: 12px;
    height: 32px; /* Reduced mobile height */
    max-width: 250px;
    border-radius: 12px;
  }
`,ye=u.button`
  padding: 4px 8px;
  border: 1px solid ${e=>e.$isSelected?"#000000":"#ced4da"};  // Changed from #007bff to #000000 (black)
  border-radius: 12px;
  background: ${e=>e.$isSelected?"#000000":"#ffffff"};  // Changed from #007bff to #000000 (black)
  color: ${e=>e.$isSelected?"#ffffff":"#495057"};
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
  height: 28px; /* Reduced height for subtags */
  display: flex;
  align-items: center;

  &:hover {
    background: ${e=>e.$isSelected?"#333333":"#e9ecef"};  // Changed from #0056b3 to #333333 (dark gray)
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  @media (max-width: 480px) {
    padding: 3px 6px; /* Tighter mobile padding */
    font-size: 11px;
    height: 24px; /* Smaller mobile height */
    border-radius: 8px;
  }
`,we=u.div`
  margin-top: 6px; /* Reduced from 8px to 6px */
  font-size: 13px;
  color: #555;
  font-style: italic;
  text-align: ${e=>e.$isRTL?"right":"left"};
`,Te=u.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 6px 0; /* Reduced from 8px to 6px */
`,$e=u.button`
  padding: 6px 12px;
  border: 1px solid #dc3545;
  border-radius: 16px;
  background: #ffffff;
  color: #dc3545;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
  height: 36px; /* Reduced from 40px to 36px */
  display: flex;
  align-items: center;

  &:hover {
    background: #dc3545;
    color: #ffffff;
    transform: translateY(-1px);
  }
  
  @media (max-width: 480px) {
    padding: 5px 10px; /* Tighter mobile padding */
    font-size: 12px;
    height: 32px; /* Reduced mobile height */
    border-radius: 12px;
  }
`,ve=({mediaItems:e,onFilterChange:s,resetFilter:i})=>{var W,a,S,z,I;const{t,language:l}=te(),r=oe(l)==="rtl";console.log("🎯 MediaTagsFilter received props:",{mediaItemsCount:e.length,mediaItemsWithTags:e.filter(n=>n.selectedTags&&n.selectedTags.length>0).length,firstItemHasTags:!!((W=e[0])!=null&&W.selectedTags),firstItemTagCount:((S=(a=e[0])==null?void 0:a.selectedTags)==null?void 0:S.length)||0,sampleTags:((I=(z=e[0])==null?void 0:z.selectedTags)==null?void 0:I.slice(0,2))||[]}),e.slice(0,3).forEach((n,h)=>{var c,p;console.log(`🎯 Filter received item ${h}:`,{fileId:n.fileId,hasSelectedTags:!!n.selectedTags,tagCount:((c=n.selectedTags)==null?void 0:c.length)||0,tags:((p=n.selectedTags)==null?void 0:p.map(C=>{var k;return`${C.tagTitle}(${((k=C.subtags)==null?void 0:k.length)||0})`}))||[]})});const[x,g]=v.useState([]),[f,m]=v.useState([]),[d,T]=v.useState(null),[b,y]=v.useState([]),$=n=>n.subtags.filter(h=>f.includes(h.key)),j=n=>{const h=$(n);if(h.length===0)return`${n.tagTitle} (${n.count})`;const c=h.map(p=>`${p.subtagTitle} (${p.count})`).join(", ");return`${n.tagTitle} (${c})`};v.useEffect(()=>{console.log("🏷️ MediaTagsFilter: Starting tag extraction from mediaItems:",e.length);const n=new Map;e.forEach((c,p)=>{var C,k;console.log(`🏷️ Processing mediaItem ${p}:`,{fileId:c.fileId,hasSelectedTags:!!c.selectedTags,selectedTagsLength:((C=c.selectedTags)==null?void 0:C.length)||0}),(k=c.selectedTags)==null||k.forEach((R,K)=>{var _;console.log(`  🏷️ Processing tag ${K}:`,R);const L=`${R.TagType}-${R.tagTitle}`;n.has(L)||(n.set(L,{tag:{key:L,TagType:R.TagType,tagTitle:R.tagTitle,count:0,subtags:[]},count:0}),console.log(`    ✅ Created new tag: ${L}`));const O=n.get(L);O.count++,O.tag.count=O.count,console.log(`    📊 Updated tag count: ${L} = ${O.count}`),(_=R.subtags)==null||_.forEach((M,ne)=>{console.log(`    🏷️ Processing subtag ${ne}:`,M);const H=`${M.TagType}-${M.tagTitle}-${M.subtagTitle}`,G=O.tag,Q=G.subtags.find(ie=>ie.key===H);Q?(Q.count++,console.log(`      📊 Updated subtag count: ${H} = ${Q.count}`)):(G.subtags.push({key:H,TagType:M.TagType,tagTitle:M.tagTitle,subtagTitle:M.subtagTitle,count:1}),console.log(`      ✅ Created new subtag: ${H}`))})})});const h=Array.from(n.values()).sort((c,p)=>p.count-c.count).map(c=>(c.tag.subtags.sort((p,C)=>C.count-p.count),c.tag));console.log("🏷️ Final tags array:",{totalTags:h.length,tags:h.map(c=>({key:c.key,title:c.tagTitle,count:c.count,subtagsCount:c.subtags.length}))}),g(h),y(h)},[e]);const w=n=>{if(n.length===0){i(),y(x);return}const h=e.filter(c=>{var C;const p=new Set;return(C=c.selectedTags)==null||C.forEach(k=>{var R;p.add(`${k.TagType}-${k.tagTitle}`),(R=k.subtags)==null||R.forEach(K=>{p.add(`${K.TagType}-${K.tagTitle}-${K.subtagTitle}`)})}),n.every(k=>p.has(k))});B(h),s(h)},D=n=>{const h=f.includes(n.key),c=d===n.key;if(h){if(h&&!c)T(n.key);else if(h&&c){const p=f.filter(C=>C!==n.key&&!n.subtags.some(k=>k.key===C));m(p),T(null),w(p)}}else{const p=[...f,n.key];m(p),T(n.key),w(p)}},N=n=>{const h=f.includes(n.key);let c;h?c=f.filter(p=>p!==n.key):c=[...f,n.key],m(c),w(c)},E=()=>{m([]),T(null),i(),y(x)},B=n=>{const h=new Set;n.forEach(p=>{var C;(C=p.selectedTags)==null||C.forEach(k=>{h.add(`${k.TagType}-${k.tagTitle}`)})}),f.forEach(p=>{p.includes("-",p.indexOf("-")+1)||h.add(p)});const c=x.filter(p=>h.has(p.key));y(c)},P=d?x.find(n=>n.key===d):null,U=f.length,A=x.length>0;return console.log("🎯 MediaTagsFilter render decision:",{allTagsLength:x.length,hasTags:A,willRender:A}),A?(console.log("✅ MediaTagsFilter: Rendering with tags"),o.jsxs(me,{$isRTL:r,children:[o.jsx(X,{children:o.jsxs(Z,{$isRTL:r,children:[U>0&&o.jsx($e,{onClick:E,children:t("Clear All")}),b.length>0?b.map(n=>{const h=$(n),c=h.length>0?t("{{tagType}}: {{tagTitle}} ({{subtags}})",{tagType:n.TagType,tagTitle:n.tagTitle,subtags:h.map(p=>p.subtagTitle).join(", ")}):t("Click to add/remove: {{tagType}}: {{tagTitle}}",{tagType:n.TagType,tagTitle:n.tagTitle});return o.jsx(be,{$isSelected:f.includes(n.key),$isDisplayed:d===n.key,onClick:()=>D(n),title:c,children:j(n)},n.key)}):o.jsx(Te,{children:t("No tags available")})]})}),P&&P.subtags.length>0&&o.jsx(X,{children:o.jsx(Z,{$isRTL:r,children:P.subtags.map(n=>o.jsxs(ye,{$isSelected:f.includes(n.key),onClick:()=>N(n),title:t("Click to add/remove: {{tagType}}: {{tagTitle}} → {{subtagTitle}}",{tagType:n.TagType,tagTitle:n.tagTitle,subtagTitle:n.subtagTitle}),children:[n.subtagTitle," (",n.count,")"]},n.key))})}),U>0&&o.jsx(we,{$isRTL:r,children:t("Showing photos with all selected tags")})]})):(console.log("❌ MediaTagsFilter: No tags found, returning null"),null)},Ce=u.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  padding: 40px 16px;
  overflow: hidden;
  overscroll-behavior: contain;
  
  @media (max-width: 768px) {
    padding: 60px 16px;
  }
`,ke=u.div`
  background: white;
  border-radius: 16px;
  padding: 0;
  width: 100%;
  max-width: 1200px;
  max-height: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  direction: ${e=>e.$isRTL?"rtl":"ltr"};
  animation: modalFadeIn 0.3s ease-out;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
  @media (max-width: 768px) {
    border-radius: 12px;
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
`,Se=u.div`
  padding: 20px 24px 16px 24px;
  border-bottom: 1px solid #e9ecef;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: ${e=>e.$isRTL?"row-reverse":"row"};
  
  @media (max-width: 768px) {
    padding: 16px 16px 12px 16px;
  }
`,je=u.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
`,ze=u.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 12px 24px;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  
  @media (max-width: 768px) {
    padding: 8px 16px;
  }
`,Re=u.div`
  padding: 12px 24px 20px 24px;
  border-top: 1px solid #e9ecef;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: ${e=>e.$isRTL?"row-reverse":"row"};
  
  @media (max-width: 768px) {
    padding: 16px 16px 20px 16px;
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
`,Ee=u.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-direction: ${e=>e.$isRTL?"row-reverse":"row"};
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    gap: 8px;
  }
`,Me=u.span`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`,Fe=u.div`
  display: flex;
  gap: 12px;
  
  @media (max-width: 768px) {
    width: 100%;
    gap: 12px;
  }
`,Y=u.button`
  padding: 8px 16px;
  border: ${e=>e.$primary?"none":"1px solid #ccc"};
  border-radius: 6px;
  background: ${e=>e.$primary?"#007bff":"transparent"};
  color: ${e=>e.$primary?"white":"#666"};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  
  &:hover {
    background: ${e=>e.$primary?"#0056b3":"#f5f5f5"};
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
  
  @media (max-width: 768px) {
    flex: 1;
    padding: 14px 16px;
    font-size: 13px;
  }
`,Ie=u(Y)`
  background: #28a745;
  border: none;
  color: white;
  
  &:hover:not(:disabled) {
    background: #1e7e34;
  }
`,Le=u.div`
  margin-bottom: 16px;
  direction: ${e=>e.$isRTL?"rtl":"ltr"};
  
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`,ee=u.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
  flex-direction: ${e=>e.$isRTL?"row-reverse":"row"};
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 12px;
    margin-bottom: 10px;
  }
`,De=u.label`
  font-size: 13px;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    font-size: 12px;
  }
`,Be=u.select`
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 13px;
  background: white;
  cursor: pointer;
  
  @media (max-width: 768px) {
    font-size: 12px;
  }
`,Pe=u.div`
  font-size: 13px;
  font-weight: 500;
  color: #333;
  margin-bottom: 6px;
  
  @media (max-width: 768px) {
    font-size: 12px;
    margin-bottom: 8px;
  }
`,Ae=u.div`
  margin: 10px 0;
  
  @media (max-width: 768px) {
    margin: 12px 0;
  }
`,Ke=u.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid ${e=>e.$isSelected?"#007bff":"transparent"};
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`,Oe=u.div`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${e=>e.$isSelected?"#007bff":"rgba(255, 255, 255, 0.8)"};
  border: 2px solid ${e=>e.$isSelected?"#007bff":"#ccc"};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  
  &::after {
    content: '✓';
    color: white;
    font-size: 10px;
    font-weight: bold;
    opacity: ${e=>e.$isSelected?1:0};
  }
`,Ne=u.div`
  position: absolute;
  bottom: 6px;
  right: 6px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 500;
`,Ue=u.div`
  text-align: center;
  padding: 40px 20px;
  color: #666;
  font-size: 14px;
  grid-column: 1 / -1;
`,We=e=>{const s=Math.floor(e/60),i=Math.floor(e%60);return`${s}:${i.toString().padStart(2,"0")}`},qe=({isOpen:e,folder:s,onClose:i})=>{const{t,language:l}=te(),r=oe(l)==="rtl",[x,g]=v.useState(!1),[f,m]=v.useState("3"),[d,T]=v.useState(new Set);v.useEffect(()=>{g(!0)},[]);const b=v.useMemo(()=>s.files.map(a=>({type:/\.(mp4|mov|avi|wmv|flv|webm|mkv)$/i.test(a.dataKey)?"video":"image",fileId:a.dataKey,url:`${J}${a.dataKey}`,thumbnailUrl:a.thumbnailDataKey?`${J}${a.thumbnailDataKey}`:void 0,duration:a.durationInSeconds?We(a.durationInSeconds):void 0,loaded:!1,dataInBytes:a.dataInBytes,selectedTags:a.selectedTags,fileDisplayName:a.fileDisplayName})),[s.files]),[y,$]=v.useState(b),[j,w]=v.useState(!1);v.useEffect(()=>{$(b),T(new Set),w(!1)},[b]);const D=b.some(a=>a.selectedTags&&a.selectedTags.length>0),N=a=>{T(S=>{const z=new Set(S);return z.has(a)?z.delete(a):z.add(a),z})},E=()=>{T(new Set([...Array(y.length).keys()]))},B=()=>{T(new Set)},P=()=>{if(d.size===0)return;const a=Array.from(d).map(I=>y[I]),S={mediaItems:a,folderName:s.folderName||"Selected Items"};ce(S,t,I=>{x&&window.open(a[I].url,"_blank")}),i()},U=a=>{$(a),w(!0),T(new Set)},A=()=>{$(b),w(!1),T(new Set)};if(v.useEffect(()=>{if(e&&x){const a=document.body.style.overflow,S=document.body.style.touchAction;return document.body.style.overflow="hidden",document.body.style.touchAction="none",()=>{document.body.style.overflow=a,document.body.style.touchAction=S}}},[e,x]),!e||!x)return null;const W=o.jsx(Ce,{onClick:i,onTouchMove:a=>{a.preventDefault()},children:o.jsxs(ke,{$isRTL:r,onClick:a=>a.stopPropagation(),onTouchMove:a=>{a.stopPropagation()},children:[o.jsx(Se,{$isRTL:r,children:o.jsx(je,{children:t("Select Items to Download")})}),o.jsxs(ze,{children:[o.jsxs(Le,{$isRTL:r,children:[o.jsxs(ee,{$isRTL:r,children:[o.jsx(De,{children:t("Columns:")}),o.jsxs(Be,{value:f,onChange:a=>m(a.target.value),children:[o.jsx("option",{value:"2",children:"2"}),o.jsx("option",{value:"3",children:"3"}),o.jsx("option",{value:"4",children:"4"}),o.jsx("option",{value:"5",children:"5"})]})]}),D&&o.jsxs(Ae,{children:[o.jsx(Pe,{children:t("Filter by tags:")}),o.jsx(ve,{mediaItems:b,onFilterChange:U,resetFilter:A})]}),o.jsxs(ee,{$isRTL:r,children:[d.size<y.length&&o.jsx(Y,{onClick:E,children:j?t("Select Filtered ({{count}})",{count:y.length.toString()}):t("Select All")}),d.size>0&&o.jsx(Y,{onClick:B,children:t("Unselect All")})]})]}),y.length>0?o.jsx(ae,{$columns:f,children:y.map((a,S)=>o.jsxs(Ke,{$isSelected:d.has(S),onClick:()=>N(S),children:[o.jsx(le,{src:a.thumbnailUrl||a.url,alt:a.fileDisplayName||`Item ${S+1}`,style:{width:"100%",height:"100%",objectFit:"cover"}}),o.jsx(Oe,{$isSelected:d.has(S)}),a.type==="video"&&a.duration&&o.jsx(Ne,{children:a.duration})]},S))}):o.jsx(Ue,{children:t(j?"No items match the current filter":"No items to download")})]}),o.jsxs(Re,{$isRTL:r,children:[o.jsxs(Ee,{$isRTL:r,children:[o.jsx(Me,{children:d.size===1?t("{{count}} item selected",{count:d.size.toString()}):t("{{count}} items selected",{count:d.size.toString()})}),j&&o.jsx("span",{style:{fontSize:"12px",color:"#666",fontStyle:"italic"},children:y.length===1?t("({{count}} item shown after filtering)",{count:y.length.toString()}):t("({{count}} items shown after filtering)",{count:y.length.toString()})})]}),o.jsxs(Fe,{children:[o.jsx(Y,{onClick:i,children:t("Cancel")}),o.jsx(Ie,{onClick:P,disabled:d.size===0,children:d.size===0?t("Select items to download"):d.size===1?t("Download {{count}} item",{count:d.size.toString()}):t("Download {{count}} items",{count:d.size.toString()})})]})]})]})});return V.createPortal(W,document.body)};export{Qe as C,qe as D,ve as M,Ve as Q,V as R};
