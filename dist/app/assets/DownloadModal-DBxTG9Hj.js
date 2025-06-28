import{an as se,ao as re,r as $,j as o,d as u,u as ee,g as te,a3 as G,Y as ae}from"./buttons-DAdOhyvx.js";import{L as le}from"./LazyImage-NXOXfEhL.js";var de=se();const V=re(de),Qe=({isOpen:e,onClose:s,t:i,isRTL:t})=>{const[l,r]=$.useState(!1);if($.useEffect(()=>{r(!0)},[]),!e||!l)return null;const x=o.jsx("div",{style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 0.5)",display:"flex",justifyContent:"center",alignItems:"center",zIndex:1e4},onClick:s,children:o.jsxs("div",{style:{backgroundColor:"white",borderRadius:"12px",padding:"20px",width:"90%",maxWidth:"400px",boxShadow:"0 4px 20px rgba(0, 0, 0, 0.15)",direction:t?"rtl":"ltr",textAlign:t?"right":"left"},onClick:g=>g.stopPropagation(),children:[o.jsx("h3",{style:{marginTop:0,marginBottom:"16px",fontSize:"18px"},children:i("Link to album website copied.")}),o.jsx("button",{style:{width:"100%",padding:"12px",border:"1px solid #ddd",borderRadius:"6px",backgroundColor:"#f0f0f0",textAlign:"center",cursor:"pointer",fontSize:"14px"},onClick:g=>{g.stopPropagation(),s()},onMouseOver:g=>{g.stopPropagation(),g.currentTarget.style.backgroundColor="#e0e0e0"},onMouseOut:g=>{g.stopPropagation(),g.currentTarget.style.backgroundColor="#f0f0f0"},children:i("OK")})]})});return V.createPortal(x,document.body)},Ve=({isOpen:e,onClose:s,albumLink:i,t,isRTL:l})=>{const[r,x]=$.useState(!1);if($.useEffect(()=>{x(!0)},[]),!e||!r)return null;const g=`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(i)}`,h=o.jsxs("div",{style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 0.5)",display:"flex",justifyContent:"center",alignItems:"center",zIndex:1e4,backdropFilter:"blur(4px)",WebkitBackdropFilter:"blur(4px)",padding:"20px"},onClick:s,children:[o.jsxs("div",{style:{backgroundColor:"white",borderRadius:"16px",padding:"32px",width:"90%",maxWidth:"400px",boxShadow:"0 20px 60px rgba(0, 0, 0, 0.3)",direction:l?"rtl":"ltr",textAlign:"center",position:"relative",animation:"modalFadeIn 0.3s ease-out"},onClick:m=>m.stopPropagation(),children:[o.jsx("h3",{style:{marginTop:0,marginBottom:"16px",fontSize:"20px",color:"#333",fontWeight:"600"},children:t("Share Album with QR Code")}),o.jsx("p",{style:{margin:"0 0 24px 0",fontSize:"14px",color:"#666",lineHeight:"1.5"},children:t("Let others scan this QR code with their phone camera to instantly access your album")}),o.jsx("div",{style:{display:"flex",justifyContent:"center",marginBottom:"24px",padding:"20px",backgroundColor:"#f8f9fa",borderRadius:"12px",border:"1px solid #e9ecef"},children:o.jsx("img",{src:g,alt:t("QR Code for album"),style:{width:"200px",height:"200px",border:"4px solid white",borderRadius:"8px",boxShadow:"0 2px 8px rgba(0,0,0,0.1)"},onError:m=>{m.currentTarget.style.display="none";const d=m.currentTarget.parentElement;d&&(d.innerHTML=`
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
        `})]});return V.createPortal(h,document.body)},M=typeof window<"u"&&typeof document<"u",ce=(e,s,i)=>{if(!M){console.warn("downloadPhotos called in non-browser environment");return}/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?pe(e,s,i):xe(e,s)},oe=async(e,s)=>{try{const i=await fetch(e.url);if(!i.ok)throw new Error(`HTTP error! status: ${i.status}`);const t=await i.blob(),l=window.URL.createObjectURL(t),r=document.createElement("a");return r.href=l,r.download=s,r.style.display="none",document.body.appendChild(r),r.click(),document.body.removeChild(r),window.URL.revokeObjectURL(l),!0}catch(i){return console.warn("Blob download failed:",i),!1}},pe=(e,s,i)=>{if(!M)return;const t=document.createElement("div");t.style.cssText=`
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
  `;const h=document.createElement("div");h.style.cssText=`
    display: grid; grid-template-columns: repeat(2, 1fr);
    gap: 10px; margin-bottom: 20px; width: 100%; box-sizing: border-box;
  `,e&&e.mediaItems.length>0&&e.mediaItems.forEach((y,b)=>{const T=document.createElement("div");T.style.cssText=`
        display: flex; flex-direction: column; align-items: center;
        border: 1px solid #eee; padding: 10px; border-radius: 4px;
      `;const S=document.createElement("img");S.src=y.type==="image"?y.thumbnailUrl||y.url:y.thumbnailUrl||"",S.style.cssText=`
        width: 100%; height: 120px; object-fit: cover;
        margin-bottom: 10px; cursor: pointer;
      `,S.onclick=()=>{document.body.removeChild(t),i(b)};const j=document.createElement("button");j.addEventListener("click",function(I){I.preventDefault(),document.body.removeChild(t),i(b)}),j.textContent=y.type==="image"?s("View Photo"):s("View Video"),j.style.cssText=`
        text-decoration: none; color: white; background-color: #006adc;
        padding: 8px 8px; border: none; border-radius: 4px; font-size: 13px;
        text-align: center; width: 100%; box-sizing: border-box;
        white-space: nowrap; cursor: pointer;
      `,T.appendChild(S),T.appendChild(j),h.appendChild(T)});const m=document.createElement("p");m.innerHTML=s("Due to technical limitations, bulk downloads on mobile browsers aren't supported, and some videos may not download.<br><br>To download all photos and videos at once, please:"),m.style.cssText="padding-right: 10px; font-size: 14px; width: 100%; box-sizing: border-box;";const d=document.createElement("ul");d.style.paddingLeft="20px",[s("visit this page on a desktop computer to download all photos and videos at once"),s("save the photos to your 6180 account and use the 6180 app"),s('select the "Open On iPhone App" option')].forEach(y=>{const b=document.createElement("li");b.textContent=y,b.style.cssText="margin-bottom: 10px; font-size: 14px;",d.appendChild(b)}),l.appendChild(r),g.appendChild(m),g.appendChild(d),g.appendChild(h),l.appendChild(g),t.appendChild(l),document.body.appendChild(t)},xe=(e,s)=>{if(!M)return;if(!e||e.mediaItems.length===0){alert(s("No items to download"));return}const i=e.mediaItems,t=e.folderName||"Photos";if(i.length>50&&!confirm(s(`You are downloading ${i.length} files. This may take several minutes. Continue?`)))return;const l=ge(s);if(!l)return;document.body.appendChild(l.container);let r=!1;l.cancelBtn.onclick=()=>{r=!0,document.body.removeChild(l.container)},ue(i,t,l,s,()=>r).then(()=>{r||setTimeout(()=>{document.body.contains(l.container)&&document.body.removeChild(l.container)},2e3)}).catch(x=>{r||fe(l,s,x.message,()=>{document.body.removeChild(l.container),he(i,t)})})},ge=e=>{if(!M)return null;const s=document.createElement("div");s.style.cssText=`
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
  `,l.appendChild(r),i.appendChild(t),i.appendChild(l),i.appendChild(x),i.appendChild(g),s.appendChild(i),{container:s,title:t,progressBar:r,progressText:x,cancelBtn:g}},ue=async(e,s,i,t,l)=>{if(!M)return;let r=0,x=0;const g=new Set;i.title.textContent=t("Starting downloads..."),i.progressText.textContent=t("Files will download with their original names");for(let h=0;h<e.length;h++){if(l())return;const m=e[h];let d=m.fileDisplayName;if(!d){const T=m.type==="image"?"jpg":"mp4";d=`${s}-${h+1}.${T}`}let w=d,y=1;for(;g.has(w.toLowerCase());){const T=d.lastIndexOf(".");if(T!==-1){const S=d.substring(0,T),j=d.substring(T);w=`${S} (${y})${j}`}else w=`${d} (${y})`;y++}g.add(w.toLowerCase()),i.progressText.textContent=t(`Downloading ${h+1} of ${e.length}: ${w}`);try{await oe(m,w)?r++:x++,await new Promise(S=>setTimeout(S,500))}catch(T){console.warn(`Failed to download file ${w}:`,T),x++}const b=Math.round((h+1)/e.length*100);i.progressBar.style.width=`${b}%`}l()||(i.title.textContent=t("Downloads complete!"),x>0?i.progressText.textContent=t(`${r} files downloaded with original names, ${x} failed`):i.progressText.textContent=t(`All ${r} files downloaded with their original names!`),setTimeout(()=>{!l()&&document.body.contains(i.container)&&document.body.removeChild(i.container)},3e3))},he=async(e,s)=>{if(M)for(let i=0;i<e.length;i++){const t=e[i],l=t.fileDisplayName||`${s}-${i+1}.${t.type==="image"?"jpg":"mp4"}`;await new Promise(r=>setTimeout(r,i*1e3));try{await oe(t,l)}catch(r){console.warn(`Failed to download file ${i+1}:`,r)}}},fe=(e,s,i,t)=>{if(!M||!e)return;e.title.textContent=s("Download failed"),e.progressText.textContent=i,e.progressBar.style.backgroundColor="#d32f2f",e.progressBar.style.width="100%",e.cancelBtn.textContent=s("Close");const l=document.createElement("button");l.textContent=s("Retry"),l.style.cssText=`
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
`,J=u.div`
  margin-bottom: 8px; /* Reduced from 12px to 8px for tighter spacing */

  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 6px; /* Tighter mobile spacing */
  }
`,X=u.div`
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
`,ve=({mediaItems:e,onFilterChange:s,resetFilter:i})=>{var O,a,k,z,F;const{t,language:l}=ee(),r=te(l)==="rtl";console.log("🎯 MediaTagsFilter received props:",{mediaItemsCount:e.length,mediaItemsWithTags:e.filter(n=>n.selectedTags&&n.selectedTags.length>0).length,firstItemHasTags:!!((O=e[0])!=null&&O.selectedTags),firstItemTagCount:((k=(a=e[0])==null?void 0:a.selectedTags)==null?void 0:k.length)||0,sampleTags:((F=(z=e[0])==null?void 0:z.selectedTags)==null?void 0:F.slice(0,2))||[]}),e.slice(0,3).forEach((n,f)=>{var c,p;console.log(`🎯 Filter received item ${f}:`,{fileId:n.fileId,hasSelectedTags:!!n.selectedTags,tagCount:((c=n.selectedTags)==null?void 0:c.length)||0,tags:((p=n.selectedTags)==null?void 0:p.map(v=>{var C;return`${v.tagTitle}(${((C=v.subtags)==null?void 0:C.length)||0})`}))||[]})});const[x,g]=$.useState([]),[h,m]=$.useState([]),[d,w]=$.useState(null),[y,b]=$.useState([]),T=n=>n.subtags.filter(f=>h.includes(f.key)),S=n=>{const f=T(n);if(f.length===0)return`${n.tagTitle} (${n.count})`;const c=f.map(p=>`${p.subtagTitle} (${p.count})`).join(", ");return`${n.tagTitle} (${c})`};$.useEffect(()=>{console.log("🏷️ MediaTagsFilter: Starting tag extraction from mediaItems:",e.length);const n=new Map;e.forEach((c,p)=>{var v,C;console.log(`🏷️ Processing mediaItem ${p}:`,{fileId:c.fileId,hasSelectedTags:!!c.selectedTags,selectedTagsLength:((v=c.selectedTags)==null?void 0:v.length)||0}),(C=c.selectedTags)==null||C.forEach((R,P)=>{var q;console.log(`  🏷️ Processing tag ${P}:`,R);const L=`${R.TagType}-${R.tagTitle}`;n.has(L)||(n.set(L,{tag:{key:L,TagType:R.TagType,tagTitle:R.tagTitle,count:0,subtags:[]},count:0}),console.log(`    ✅ Created new tag: ${L}`));const A=n.get(L);A.count++,A.tag.count=A.count,console.log(`    📊 Updated tag count: ${L} = ${A.count}`),(q=R.subtags)==null||q.forEach((E,ne)=>{console.log(`    🏷️ Processing subtag ${ne}:`,E);const N=`${E.TagType}-${E.tagTitle}-${E.subtagTitle}`,_=A.tag,Q=_.subtags.find(ie=>ie.key===N);Q?(Q.count++,console.log(`      📊 Updated subtag count: ${N} = ${Q.count}`)):(_.subtags.push({key:N,TagType:E.TagType,tagTitle:E.tagTitle,subtagTitle:E.subtagTitle,count:1}),console.log(`      ✅ Created new subtag: ${N}`))})})});const f=Array.from(n.values()).sort((c,p)=>p.count-c.count).map(c=>(c.tag.subtags.sort((p,v)=>v.count-p.count),c.tag));console.log("🏷️ Final tags array:",{totalTags:f.length,tags:f.map(c=>({key:c.key,title:c.tagTitle,count:c.count,subtagsCount:c.subtags.length}))}),g(f),b(f)},[e]);const j=n=>{if(n.length===0){i(),b(x);return}const f=e.filter(c=>{var v;const p=new Set;return(v=c.selectedTags)==null||v.forEach(C=>{var R;p.add(`${C.TagType}-${C.tagTitle}`),(R=C.subtags)==null||R.forEach(P=>{p.add(`${P.TagType}-${P.tagTitle}-${P.subtagTitle}`)})}),n.every(C=>p.has(C))});Y(f),s(f)},I=n=>{const f=h.includes(n.key),c=d===n.key;if(f){if(f&&!c)w(n.key);else if(f&&c){const p=h.filter(v=>v!==n.key&&!n.subtags.some(C=>C.key===v));m(p),w(null),j(p)}}else{const p=[...h,n.key];m(p),w(n.key),j(p)}},W=n=>{const f=h.includes(n.key);let c;f?c=h.filter(p=>p!==n.key):c=[...h,n.key],m(c),j(c)},H=()=>{m([]),w(null),i(),b(x)},Y=n=>{const f=new Set;n.forEach(p=>{var v;(v=p.selectedTags)==null||v.forEach(C=>{f.add(`${C.TagType}-${C.tagTitle}`)})}),h.forEach(p=>{p.includes("-",p.indexOf("-")+1)||f.add(p)});const c=x.filter(p=>f.has(p.key));b(c)},D=d?x.find(n=>n.key===d):null,K=h.length,B=x.length>0;return console.log("🎯 MediaTagsFilter render decision:",{allTagsLength:x.length,hasTags:B,willRender:B}),B?(console.log("✅ MediaTagsFilter: Rendering with tags"),o.jsxs(me,{$isRTL:r,children:[o.jsx(J,{children:o.jsxs(X,{$isRTL:r,children:[K>0&&o.jsx($e,{onClick:H,children:t("Clear All")}),y.length>0?y.map(n=>{const f=T(n),c=f.length>0?t("{{tagType}}: {{tagTitle}} ({{subtags}})",{tagType:n.TagType,tagTitle:n.tagTitle,subtags:f.map(p=>p.subtagTitle).join(", ")}):t("Click to add/remove: {{tagType}}: {{tagTitle}}",{tagType:n.TagType,tagTitle:n.tagTitle});return o.jsx(be,{$isSelected:h.includes(n.key),$isDisplayed:d===n.key,onClick:()=>I(n),title:c,children:S(n)},n.key)}):o.jsx(Te,{children:t("No tags available")})]})}),D&&D.subtags.length>0&&o.jsx(J,{children:o.jsx(X,{$isRTL:r,children:D.subtags.map(n=>o.jsxs(ye,{$isSelected:h.includes(n.key),onClick:()=>W(n),title:t("Click to add/remove: {{tagType}}: {{tagTitle}} → {{subtagTitle}}",{tagType:n.TagType,tagTitle:n.tagTitle,subtagTitle:n.subtagTitle}),children:[n.subtagTitle," (",n.count,")"]},n.key))})}),K>0&&o.jsx(we,{$isRTL:r,children:t("Showing photos with all selected tags")})]})):(console.log("❌ MediaTagsFilter: No tags found, returning null"),null)},Ce=u.div`
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
`,U=u.button`
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
`,Le=u(U)`
  background: #28a745;
  border: none;
  color: white;
  
  &:hover:not(:disabled) {
    background: #1e7e34;
  }
`,Ie=u.div`
  margin-bottom: 16px;
  direction: ${e=>e.$isRTL?"rtl":"ltr"};
  
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`,Z=u.div`
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
`,We=e=>{const s=Math.floor(e/60),i=Math.floor(e%60);return`${s}:${i.toString().padStart(2,"0")}`},qe=({isOpen:e,folder:s,onClose:i})=>{const{t,language:l}=ee(),r=te(l)==="rtl",[x,g]=$.useState(!1),[h,m]=$.useState("3"),[d,w]=$.useState(new Set);$.useEffect(()=>{g(!0)},[]);const y=$.useMemo(()=>s.files.map(a=>({type:/\.(mp4|mov|avi|wmv|flv|webm|mkv)$/i.test(a.dataKey)?"video":"image",fileId:a.dataKey,url:`${G}${a.dataKey}`,thumbnailUrl:a.thumbnailDataKey?`${G}${a.thumbnailDataKey}`:void 0,duration:a.durationInSeconds?We(a.durationInSeconds):void 0,loaded:!1,dataInBytes:a.dataInBytes,selectedTags:a.selectedTags,fileDisplayName:a.fileDisplayName})),[s.files]),[b,T]=$.useState(y),[S,j]=$.useState(!1);$.useEffect(()=>{T(y),w(new Set),j(!1)},[y]);const I=y.some(a=>a.selectedTags&&a.selectedTags.length>0),W=a=>{w(k=>{const z=new Set(k);return z.has(a)?z.delete(a):z.add(a),z})},H=()=>{w(new Set([...Array(b.length).keys()]))},Y=()=>{w(new Set)},D=()=>{if(d.size===0)return;const a=Array.from(d).map(F=>b[F]),k={mediaItems:a,folderName:s.folderName||"Selected Items"};ce(k,t,F=>{x&&window.open(a[F].url,"_blank")}),i()},K=a=>{T(a),j(!0),w(new Set)},B=()=>{T(y),j(!1),w(new Set)};if($.useEffect(()=>{if(e&&x){const a=document.body.style.overflow,k=document.body.style.touchAction;return document.body.style.overflow="hidden",document.body.style.touchAction="none",()=>{document.body.style.overflow=a,document.body.style.touchAction=k}}},[e,x]),!e||!x)return null;const O=o.jsx(Ce,{onClick:i,onTouchMove:a=>{a.preventDefault()},children:o.jsxs(ke,{$isRTL:r,onClick:a=>a.stopPropagation(),onTouchMove:a=>{a.stopPropagation()},children:[o.jsx(Se,{$isRTL:r,children:o.jsx(je,{children:t("Select Items to Download")})}),o.jsxs(ze,{children:[o.jsxs(Ie,{$isRTL:r,children:[o.jsxs(Z,{$isRTL:r,children:[o.jsx(De,{children:t("Columns:")}),o.jsxs(Be,{value:h,onChange:a=>m(a.target.value),children:[o.jsx("option",{value:"2",children:"2"}),o.jsx("option",{value:"3",children:"3"}),o.jsx("option",{value:"4",children:"4"}),o.jsx("option",{value:"5",children:"5"})]})]}),I&&o.jsxs(Ae,{children:[o.jsx(Pe,{children:t("Filter by tags:")}),o.jsx(ve,{mediaItems:y,onFilterChange:K,resetFilter:B})]}),o.jsxs(Z,{$isRTL:r,children:[d.size<b.length&&o.jsx(U,{onClick:H,children:S?t("Select Filtered ({{count}})",{count:b.length.toString()}):t("Select All")}),d.size>0&&o.jsx(U,{onClick:Y,children:t("Unselect All")})]})]}),b.length>0?o.jsx(ae,{$columns:h,children:b.map((a,k)=>o.jsxs(Ke,{$isSelected:d.has(k),onClick:()=>W(k),children:[o.jsx(le,{src:a.thumbnailUrl||a.url,alt:a.fileDisplayName||`Item ${k+1}`,style:{width:"100%",height:"100%",objectFit:"cover"}}),o.jsx(Oe,{$isSelected:d.has(k)}),a.type==="video"&&a.duration&&o.jsx(Ne,{children:a.duration})]},k))}):o.jsx(Ue,{children:t(S?"No items match the current filter":"No items to download")})]}),o.jsxs(Re,{$isRTL:r,children:[o.jsxs(Ee,{$isRTL:r,children:[o.jsx(Me,{children:d.size===1?t("{{count}} item selected",{count:d.size.toString()}):t("{{count}} items selected",{count:d.size.toString()})}),S&&o.jsx("span",{style:{fontSize:"12px",color:"#666",fontStyle:"italic"},children:b.length===1?t("({{count}} item shown after filtering)",{count:b.length.toString()}):t("({{count}} items shown after filtering)",{count:b.length.toString()})})]}),o.jsxs(Fe,{children:[o.jsx(U,{onClick:i,children:t("Cancel")}),o.jsx(Le,{onClick:D,disabled:d.size===0,children:d.size===0?t("Select items to download"):d.size===1?t("Download {{count}} item",{count:d.size.toString()}):t("Download {{count}} items",{count:d.size.toString()})})]})]})]})});return V.createPortal(O,document.body)};export{Qe as C,qe as D,ve as M,Ve as Q,V as R};
