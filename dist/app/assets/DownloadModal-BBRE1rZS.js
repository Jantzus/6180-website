import{J as ie,K as se,r as $,j as o,d as g,u as ee,g as te,S as G}from"./utils-DTlE70TL.js";import{L as re}from"./LazyImage-C_AG4_7a.js";var ae=ie();const V=se(ae),Ye=({isOpen:e,onClose:s,t:i,isRTL:t})=>{const[r,d]=$.useState(!1);if($.useEffect(()=>{d(!0)},[]),!e||!r)return null;const x=o.jsx("div",{style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 0.5)",display:"flex",justifyContent:"center",alignItems:"center",zIndex:1e4},onClick:s,children:o.jsxs("div",{style:{backgroundColor:"white",borderRadius:"12px",padding:"20px",width:"90%",maxWidth:"400px",boxShadow:"0 4px 20px rgba(0, 0, 0, 0.15)",direction:t?"rtl":"ltr",textAlign:t?"right":"left"},onClick:u=>u.stopPropagation(),children:[o.jsx("h3",{style:{marginTop:0,marginBottom:"16px",fontSize:"18px"},children:i("Link to album website copied.")}),o.jsx("button",{style:{width:"100%",padding:"12px",border:"1px solid #ddd",borderRadius:"6px",backgroundColor:"#f0f0f0",textAlign:"center",cursor:"pointer",fontSize:"14px"},onClick:u=>{u.stopPropagation(),s()},onMouseOver:u=>{u.stopPropagation(),u.currentTarget.style.backgroundColor="#e0e0e0"},onMouseOut:u=>{u.stopPropagation(),u.currentTarget.style.backgroundColor="#f0f0f0"},children:i("OK")})]})});return V.createPortal(x,document.body)},Qe=({isOpen:e,onClose:s,albumLink:i,t,isRTL:r})=>{const[d,x]=$.useState(!1);if($.useEffect(()=>{x(!0)},[]),!e||!d)return null;const u=`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(i)}`,h=o.jsxs("div",{style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 0.5)",display:"flex",justifyContent:"center",alignItems:"center",zIndex:1e4,backdropFilter:"blur(4px)",WebkitBackdropFilter:"blur(4px)",padding:"20px"},onClick:s,children:[o.jsxs("div",{style:{backgroundColor:"white",borderRadius:"16px",padding:"32px",width:"90%",maxWidth:"400px",boxShadow:"0 20px 60px rgba(0, 0, 0, 0.3)",direction:r?"rtl":"ltr",textAlign:"center",position:"relative",animation:"modalFadeIn 0.3s ease-out"},onClick:b=>b.stopPropagation(),children:[o.jsx("h3",{style:{marginTop:0,marginBottom:"16px",fontSize:"20px",color:"#333",fontWeight:"600"},children:t("Share Album with QR Code")}),o.jsx("p",{style:{margin:"0 0 24px 0",fontSize:"14px",color:"#666",lineHeight:"1.5"},children:t("Let others scan this QR code with their phone camera to instantly access your album")}),o.jsx("div",{style:{display:"flex",justifyContent:"center",marginBottom:"24px",padding:"20px",backgroundColor:"#f8f9fa",borderRadius:"12px",border:"1px solid #e9ecef"},children:o.jsx("img",{src:u,alt:t("QR Code for album"),style:{width:"200px",height:"200px",border:"4px solid white",borderRadius:"8px",boxShadow:"0 2px 8px rgba(0,0,0,0.1)"},onError:b=>{b.currentTarget.style.display="none";const l=b.currentTarget.parentElement;l&&(l.innerHTML=`
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
                `)}})}),o.jsxs("div",{style:{backgroundColor:"#e8f4f8",padding:"16px",borderRadius:"8px",marginBottom:"24px",border:"1px solid #b3e0f2"},children:[o.jsx("p",{style:{margin:"0 0 8px 0",fontSize:"13px",color:"#0c5460",fontWeight:"600"},children:t("How to scan:")}),o.jsxs("p",{style:{margin:0,fontSize:"12px",color:"#0c5460",lineHeight:"1.4",textAlign:r?"right":"left"},children:["• ",t("open your phone camera app (or use any QR code scanner app)"),o.jsx("br",{}),"• ",t("point camera at the QR code"),o.jsx("br",{}),"• ",t("tap the notification that appears"),o.jsx("br",{})]})]}),o.jsxs("div",{style:{backgroundColor:"#f8f9fa",padding:"12px",borderRadius:"6px",marginBottom:"20px",border:"1px solid #e9ecef"},children:[o.jsx("p",{style:{margin:"0 0 4px 0",fontSize:"11px",color:"#666",fontWeight:"600"},children:t("Album Link:")}),o.jsx("p",{style:{margin:0,fontSize:"11px",color:"#333",wordBreak:"break-all",fontFamily:"monospace"},children:i})]}),o.jsx("button",{style:{width:"100%",padding:"12px 24px",border:"none",borderRadius:"8px",backgroundColor:"#007bff",color:"white",fontSize:"14px",fontWeight:"600",cursor:"pointer",transition:"background-color 0.2s"},onClick:b=>{b.stopPropagation(),s()},onMouseOver:b=>{b.currentTarget.style.backgroundColor="#0056b3"},onMouseOut:b=>{b.currentTarget.style.backgroundColor="#007bff"},children:t("Close")})]}),o.jsx("style",{children:`
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
        `})]});return V.createPortal(h,document.body)},M=typeof window<"u"&&typeof document<"u",le=(e,s,i)=>{if(!M){console.warn("downloadPhotos called in non-browser environment");return}/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?de(e,s,i):ce(e,s)},de=(e,s,i)=>{if(!M)return;const t=document.createElement("div");t.style.cssText=`
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background-color: rgba(0, 0, 0, 0.7); z-index: 10000;
    display: flex; justify-content: center; align-items: center;
  `;const r=document.createElement("div");r.style.cssText=`
    background: white; border-radius: 8px; padding: 0; width: 95%;
    max-width: 400px; max-height: 85%; display: flex; flex-direction: column;
    position: relative; box-sizing: border-box;
  `;const d=document.createElement("div");d.style.cssText=`
    position: sticky; top: 0; background: white; z-index: 10;
    padding: 15px 20px; border-top-left-radius: 8px; border-top-right-radius: 8px;
    display: flex; justify-content: flex-start;
  `;const x=document.createElement("button");x.textContent=s("Close"),x.style.cssText=`
    padding: 10px 16px; background: #f3f4f6; border: none;
    border-radius: 4px; cursor: pointer;
  `,x.onclick=()=>document.body.removeChild(t),d.appendChild(x);const u=document.createElement("div");u.style.cssText=`
    overflow: auto; padding: 0px 16px; flex-grow: 1;
    width: 100%; box-sizing: border-box;
  `;const h=document.createElement("div");h.style.cssText=`
    display: grid; grid-template-columns: repeat(2, 1fr);
    gap: 10px; margin-bottom: 20px; width: 100%; box-sizing: border-box;
  `,e&&e.mediaItems.length>0&&e.mediaItems.forEach((w,y)=>{const m=document.createElement("div");m.style.cssText=`
        display: flex; flex-direction: column; align-items: center;
        border: 1px solid #eee; padding: 10px; border-radius: 4px;
      `;const j=document.createElement("img");j.src=w.type==="image"?w.thumbnailUrl||w.url:w.thumbnailUrl||"",j.style.cssText=`
        width: 100%; height: 120px; object-fit: cover;
        margin-bottom: 10px; cursor: pointer;
      `,j.onclick=()=>{document.body.removeChild(t),i(y)};const C=document.createElement("a");C.href=w.url,/iPhone|iPad|iPod/.test(navigator.userAgent)?(C.addEventListener("click",function(L){L.preventDefault(),document.body.removeChild(t),i(y)}),C.textContent=w.type==="image"?s("View Photo"):s("View Video")):(C.download=`${e.folderName||"media"}-${y+1}.${w.type==="image"?"jpg":"mp4"}`,C.textContent=s("Select For Download")),C.style.cssText=`
        text-decoration: none; color: white; background-color: #006adc;
        padding: 8px 8px; border-radius: 4px; font-size: 13px;
        text-align: center; width: 100%; box-sizing: border-box;
        white-space: nowrap;
      `,m.appendChild(j),m.appendChild(C),h.appendChild(m)});const b=document.createElement("p");b.innerHTML=s("Due to technical limitations, bulk downloads on mobile browsers aren't supported, and some videos may not download.<br><br>To download all photos and videos at once, please:"),b.style.cssText="padding-right: 10px; font-size: 14px; width: 100%; box-sizing: border-box;";const l=document.createElement("ul");l.style.paddingLeft="20px",[s("visit this page on a desktop computer to download all photos and videos at once"),s("save the photos to your 6180 account and use the 6180 app"),s('select the "Open On iPhone App" option')].forEach(w=>{const y=document.createElement("li");y.textContent=w,y.style.cssText="margin-bottom: 10px; font-size: 14px;",l.appendChild(y)}),r.appendChild(d),u.appendChild(b),u.appendChild(l),u.appendChild(h),r.appendChild(u),t.appendChild(r),document.body.appendChild(t)},ce=(e,s)=>{if(!M)return;if(!e||e.mediaItems.length===0){alert(s("No items to download"));return}const i=e.mediaItems,t=e.folderName||"Photos";if(i.length>50&&!confirm(s(`You are downloading ${i.length} files. This may take several minutes. Continue?`)))return;const r=pe(s);if(!r)return;document.body.appendChild(r.container);let d=!1;r.cancelBtn.onclick=()=>{d=!0,document.body.removeChild(r.container)},xe(i,t,r,s,d).then(()=>{d||setTimeout(()=>{document.body.contains(r.container)&&document.body.removeChild(r.container)},2e3)}).catch(x=>{d||ue(r,s,x.message,()=>{document.body.removeChild(r.container),ge(i,t)})})},pe=e=>{if(!M)return null;const s=document.createElement("div");s.style.cssText=`
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center;
    align-items: center; z-index: 2000;
  `;const i=document.createElement("div");i.style.cssText=`
    background: white; padding: 30px; border-radius: 8px;
    text-align: center; min-width: 300px;
  `;const t=document.createElement("p");t.textContent=e("Preparing your download..."),t.style.cssText="margin-bottom: 20px; font-size: 16px; font-weight: 500;";const r=document.createElement("div");r.style.cssText=`
    width: 100%; background: #f0f0f0; border-radius: 4px;
    overflow: hidden; margin-bottom: 10px;
  `;const d=document.createElement("div");d.style.cssText=`
    width: 0%; height: 20px; background: #006adc;
    transition: width 0.3s ease;
  `;const x=document.createElement("div");x.style.cssText="font-size: 12px; color: #666; margin-bottom: 10px;";const u=document.createElement("button");return u.textContent=e("Cancel"),u.style.cssText=`
    padding: 8px 16px; background: #f3f4f6; border: 1px solid #ccc;
    border-radius: 4px; cursor: pointer; margin-top: 10px;
  `,r.appendChild(d),i.appendChild(t),i.appendChild(r),i.appendChild(x),i.appendChild(u),s.appendChild(i),{container:s,title:t,progressBar:d,progressText:x,cancelBtn:u}},xe=async(e,s,i,t,r)=>{if(!M)return;let d=0,x=0;const u=new Set;i.title.textContent=t("Starting downloads..."),i.progressText.textContent=t("Files will download with their original names");for(let h=0;h<e.length;h++){if(r)return;const b=e[h];let l=b.fileDisplayName;if(!l){const m=b.type==="image"?"jpg":"mp4";l=`${s}-${h+1}.${m}`}let T=l,w=1;for(;u.has(T.toLowerCase());){const m=l.lastIndexOf(".");if(m!==-1){const j=l.substring(0,m),C=l.substring(m);T=`${j} (${w})${C}`}else T=`${l} (${w})`;w++}u.add(T.toLowerCase()),i.progressText.textContent=t(`Downloading ${h+1} of ${e.length}: ${T}`);try{const m=document.createElement("a");m.href=b.url,m.download=T,m.style.display="none",document.body.appendChild(m),m.click(),document.body.removeChild(m),d++,await new Promise(j=>setTimeout(j,500))}catch(m){console.warn(`Failed to download file ${T}:`,m),x++}const y=Math.round((h+1)/e.length*100);i.progressBar.style.width=`${y}%`}r||(i.title.textContent=t("Downloads complete!"),x>0?i.progressText.textContent=t(`${d} files downloaded with original names, ${x} failed`):i.progressText.textContent=t(`All ${d} files downloaded with their original names!`),setTimeout(()=>{!r&&document.body.contains(i.container)&&document.body.removeChild(i.container)},3e3))},ge=(e,s)=>{M&&e.forEach((i,t)=>{setTimeout(()=>{const r=document.createElement("a");r.href=i.url,r.download=i.fileDisplayName||`${s}-${t+1}.${i.type==="image"?"jpg":"mp4"}`,r.style.display="none",document.body.appendChild(r),r.click(),document.body.removeChild(r)},t*500)})},ue=(e,s,i,t)=>{if(!M||!e)return;e.title.textContent=s("Download failed"),e.progressText.textContent=i,e.progressBar.style.backgroundColor="#d32f2f",e.progressBar.style.width="100%",e.cancelBtn.textContent=s("Close");const r=document.createElement("button");r.textContent=s("Retry"),r.style.cssText=`
    padding: 8px 16px; background: #006adc; color: white;
    border: none; border-radius: 4px; cursor: pointer;
    margin-top: 10px; margin-left: 10px;
  `,r.onclick=t,e.cancelBtn.parentNode.appendChild(r)},he=g.div`
  width: 100%;
  /* Remove gray background, padding, border, and border-radius */
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  direction: ${e=>e.$isRTL?"rtl":"ltr"};
`,J=g.div`
  margin-bottom: 8px; /* Reduced from 12px to 8px for tighter spacing */

  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 6px; /* Tighter mobile spacing */
  }
`,X=g.div`
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
`,fe=g.button`
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
`,me=g.button`
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
`,be=g.div`
  margin-top: 6px; /* Reduced from 8px to 6px */
  font-size: 13px;
  color: #555;
  font-style: italic;
  text-align: ${e=>e.$isRTL?"right":"left"};
`,ye=g.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 6px 0; /* Reduced from 8px to 6px */
`,we=g.button`
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
`,Te=({mediaItems:e,onFilterChange:s,resetFilter:i})=>{var O,a,S,z,I;const{t,language:r}=ee(),d=te(r)==="rtl";console.log("🎯 MediaTagsFilter received props:",{mediaItemsCount:e.length,mediaItemsWithTags:e.filter(n=>n.selectedTags&&n.selectedTags.length>0).length,firstItemHasTags:!!((O=e[0])!=null&&O.selectedTags),firstItemTagCount:((S=(a=e[0])==null?void 0:a.selectedTags)==null?void 0:S.length)||0,sampleTags:((I=(z=e[0])==null?void 0:z.selectedTags)==null?void 0:I.slice(0,2))||[]}),e.slice(0,3).forEach((n,f)=>{var c,p;console.log(`🎯 Filter received item ${f}:`,{fileId:n.fileId,hasSelectedTags:!!n.selectedTags,tagCount:((c=n.selectedTags)==null?void 0:c.length)||0,tags:((p=n.selectedTags)==null?void 0:p.map(v=>{var k;return`${v.tagTitle}(${((k=v.subtags)==null?void 0:k.length)||0})`}))||[]})});const[x,u]=$.useState([]),[h,b]=$.useState([]),[l,T]=$.useState(null),[w,y]=$.useState([]),m=n=>n.subtags.filter(f=>h.includes(f.key)),j=n=>{const f=m(n);if(f.length===0)return`${n.tagTitle} (${n.count})`;const c=f.map(p=>`${p.subtagTitle} (${p.count})`).join(", ");return`${n.tagTitle} (${c})`};$.useEffect(()=>{console.log("🏷️ MediaTagsFilter: Starting tag extraction from mediaItems:",e.length);const n=new Map;e.forEach((c,p)=>{var v,k;console.log(`🏷️ Processing mediaItem ${p}:`,{fileId:c.fileId,hasSelectedTags:!!c.selectedTags,selectedTagsLength:((v=c.selectedTags)==null?void 0:v.length)||0}),(k=c.selectedTags)==null||k.forEach((R,P)=>{var q;console.log(`  🏷️ Processing tag ${P}:`,R);const F=`${R.TagType}-${R.tagTitle}`;n.has(F)||(n.set(F,{tag:{key:F,TagType:R.TagType,tagTitle:R.tagTitle,count:0,subtags:[]},count:0}),console.log(`    ✅ Created new tag: ${F}`));const A=n.get(F);A.count++,A.tag.count=A.count,console.log(`    📊 Updated tag count: ${F} = ${A.count}`),(q=R.subtags)==null||q.forEach((E,oe)=>{console.log(`    🏷️ Processing subtag ${oe}:`,E);const U=`${E.TagType}-${E.tagTitle}-${E.subtagTitle}`,_=A.tag,Q=_.subtags.find(ne=>ne.key===U);Q?(Q.count++,console.log(`      📊 Updated subtag count: ${U} = ${Q.count}`)):(_.subtags.push({key:U,TagType:E.TagType,tagTitle:E.tagTitle,subtagTitle:E.subtagTitle,count:1}),console.log(`      ✅ Created new subtag: ${U}`))})})});const f=Array.from(n.values()).sort((c,p)=>p.count-c.count).map(c=>(c.tag.subtags.sort((p,v)=>v.count-p.count),c.tag));console.log("🏷️ Final tags array:",{totalTags:f.length,tags:f.map(c=>({key:c.key,title:c.tagTitle,count:c.count,subtagsCount:c.subtags.length}))}),u(f),y(f)},[e]);const C=n=>{if(n.length===0){i(),y(x);return}const f=e.filter(c=>{var v;const p=new Set;return(v=c.selectedTags)==null||v.forEach(k=>{var R;p.add(`${k.TagType}-${k.tagTitle}`),(R=k.subtags)==null||R.forEach(P=>{p.add(`${P.TagType}-${P.tagTitle}-${P.subtagTitle}`)})}),n.every(k=>p.has(k))});Y(f),s(f)},K=n=>{const f=h.includes(n.key),c=l===n.key;if(f){if(f&&!c)T(n.key);else if(f&&c){const p=h.filter(v=>v!==n.key&&!n.subtags.some(k=>k.key===v));b(p),T(null),C(p)}}else{const p=[...h,n.key];b(p),T(n.key),C(p)}},L=n=>{const f=h.includes(n.key);let c;f?c=h.filter(p=>p!==n.key):c=[...h,n.key],b(c),C(c)},H=()=>{b([]),T(null),i(),y(x)},Y=n=>{const f=new Set;n.forEach(p=>{var v;(v=p.selectedTags)==null||v.forEach(k=>{f.add(`${k.TagType}-${k.tagTitle}`)})}),h.forEach(p=>{p.includes("-",p.indexOf("-")+1)||f.add(p)});const c=x.filter(p=>f.has(p.key));y(c)},D=l?x.find(n=>n.key===l):null,N=h.length,B=x.length>0;return console.log("🎯 MediaTagsFilter render decision:",{allTagsLength:x.length,hasTags:B,willRender:B}),B?(console.log("✅ MediaTagsFilter: Rendering with tags"),o.jsxs(he,{$isRTL:d,children:[o.jsx(J,{children:o.jsxs(X,{$isRTL:d,children:[N>0&&o.jsx(we,{onClick:H,children:t("Clear All")}),w.length>0?w.map(n=>{const f=m(n),c=f.length>0?t("{{tagType}}: {{tagTitle}} ({{subtags}})",{tagType:n.TagType,tagTitle:n.tagTitle,subtags:f.map(p=>p.subtagTitle).join(", ")}):t("Click to add/remove: {{tagType}}: {{tagTitle}}",{tagType:n.TagType,tagTitle:n.tagTitle});return o.jsx(fe,{$isSelected:h.includes(n.key),$isDisplayed:l===n.key,onClick:()=>K(n),title:c,children:j(n)},n.key)}):o.jsx(ye,{children:t("No tags available")})]})}),D&&D.subtags.length>0&&o.jsx(J,{children:o.jsx(X,{$isRTL:d,children:D.subtags.map(n=>o.jsxs(me,{$isSelected:h.includes(n.key),onClick:()=>L(n),title:t("Click to add/remove: {{tagType}}: {{tagTitle}} → {{subtagTitle}}",{tagType:n.TagType,tagTitle:n.tagTitle,subtagTitle:n.subtagTitle}),children:[n.subtagTitle," (",n.count,")"]},n.key))})}),N>0&&o.jsx(be,{$isRTL:d,children:t("Showing photos with all selected tags")})]})):(console.log("❌ MediaTagsFilter: No tags found, returning null"),null)},$e=g.div`
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
`,Ce=g.div`
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
`,ve=g.div`
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
`,ke=g.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
`,Se=g.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 12px 24px;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  
  @media (max-width: 768px) {
    padding: 8px 16px;
  }
`,je=g.div`
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
`,ze=g.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-direction: ${e=>e.$isRTL?"row-reverse":"row"};
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    gap: 8px;
  }
`,Re=g.span`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`,Ee=g.div`
  display: flex;
  gap: 12px;
  
  @media (max-width: 768px) {
    width: 100%;
    gap: 12px;
  }
`,W=g.button`
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
`,Me=g(W)`
  background: #28a745;
  border: none;
  color: white;
  
  &:hover:not(:disabled) {
    background: #1e7e34;
  }
`,Ie=g.div`
  margin-bottom: 16px;
  direction: ${e=>e.$isRTL?"rtl":"ltr"};
  
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`,Z=g.div`
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
`,Fe=g.label`
  font-size: 13px;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    font-size: 12px;
  }
`,Le=g.select`
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 13px;
  background: white;
  cursor: pointer;
  
  @media (max-width: 768px) {
    font-size: 12px;
  }
`,De=g.div`
  font-size: 13px;
  font-weight: 500;
  color: #333;
  margin-bottom: 6px;
  
  @media (max-width: 768px) {
    font-size: 12px;
    margin-bottom: 8px;
  }
`,Be=g.div`
  margin: 10px 0;
  
  @media (max-width: 768px) {
    margin: 12px 0;
  }
`,Pe=g.div`
  display: grid;
  grid-template-columns: repeat(${e=>e.$columns}, 1fr);
  gap: 12px;
  margin-top: 12px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(${e=>Math.min(parseInt(e.$columns),3)}, 1fr);
    gap: 8px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(${e=>Math.min(parseInt(e.$columns),2)}, 1fr);
    gap: 6px;
  }
`,Ae=g.div`
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
`,Ke=g.div`
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
`,Ne=g.div`
  position: absolute;
  bottom: 6px;
  right: 6px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 500;
`,Oe=g.div`
  text-align: center;
  padding: 40px 20px;
  color: #666;
  font-size: 14px;
  grid-column: 1 / -1;
`,Ue=e=>{const s=Math.floor(e/60),i=Math.floor(e%60);return`${s}:${i.toString().padStart(2,"0")}`},Ve=({isOpen:e,folder:s,onClose:i})=>{const{t,language:r}=ee(),d=te(r)==="rtl",[x,u]=$.useState(!1),[h,b]=$.useState("3"),[l,T]=$.useState(new Set);$.useEffect(()=>{u(!0)},[]);const w=$.useMemo(()=>s.files.map(a=>({type:/\.(mp4|mov|avi|wmv|flv|webm|mkv)$/i.test(a.dataKey)?"video":"image",fileId:a.dataKey,url:`${G}${a.dataKey}`,thumbnailUrl:a.thumbnailDataKey?`${G}${a.thumbnailDataKey}`:void 0,duration:a.durationInSeconds?Ue(a.durationInSeconds):void 0,loaded:!1,dataInBytes:a.dataInBytes,selectedTags:a.selectedTags,fileDisplayName:a.fileDisplayName})),[s.files]),[y,m]=$.useState(w),[j,C]=$.useState(!1);$.useEffect(()=>{m(w),T(new Set),C(!1)},[w]);const K=w.some(a=>a.selectedTags&&a.selectedTags.length>0),L=a=>{T(S=>{const z=new Set(S);return z.has(a)?z.delete(a):z.add(a),z})},H=()=>{T(new Set([...Array(y.length).keys()]))},Y=()=>{T(new Set)},D=()=>{if(l.size===0)return;const a=Array.from(l).map(I=>y[I]),S={mediaItems:a,folderName:s.folderName||"Selected Items"};le(S,t,I=>{x&&window.open(a[I].url,"_blank")}),i()},N=a=>{m(a),C(!0),T(new Set)},B=()=>{m(w),C(!1),T(new Set)};if($.useEffect(()=>{if(e&&x){const a=document.body.style.overflow,S=document.body.style.touchAction;return document.body.style.overflow="hidden",document.body.style.touchAction="none",()=>{document.body.style.overflow=a,document.body.style.touchAction=S}}},[e,x]),!e||!x)return null;const O=o.jsx($e,{onClick:i,onTouchMove:a=>{a.preventDefault()},children:o.jsxs(Ce,{$isRTL:d,onClick:a=>a.stopPropagation(),onTouchMove:a=>{a.stopPropagation()},children:[o.jsx(ve,{$isRTL:d,children:o.jsx(ke,{children:t("Select Items to Download")})}),o.jsxs(Se,{children:[o.jsxs(Ie,{$isRTL:d,children:[o.jsxs(Z,{$isRTL:d,children:[o.jsx(Fe,{children:t("Columns:")}),o.jsxs(Le,{value:h,onChange:a=>b(a.target.value),children:[o.jsx("option",{value:"2",children:"2"}),o.jsx("option",{value:"3",children:"3"}),o.jsx("option",{value:"4",children:"4"}),o.jsx("option",{value:"5",children:"5"})]})]}),K&&o.jsxs(Be,{children:[o.jsx(De,{children:t("Filter by tags:")}),o.jsx(Te,{mediaItems:w,onFilterChange:N,resetFilter:B})]}),o.jsxs(Z,{$isRTL:d,children:[l.size<y.length&&o.jsx(W,{onClick:H,children:j?t("Select Filtered ({{count}})",{count:y.length.toString()}):t("Select All")}),l.size>0&&o.jsx(W,{onClick:Y,children:t("Unselect All")})]})]}),y.length>0?o.jsx(Pe,{$columns:h,children:y.map((a,S)=>o.jsxs(Ae,{$isSelected:l.has(S),onClick:()=>L(S),children:[o.jsx(re,{src:a.thumbnailUrl||a.url,alt:a.fileDisplayName||`Item ${S+1}`,style:{width:"100%",height:"100%",objectFit:"cover"}}),o.jsx(Ke,{$isSelected:l.has(S)}),a.type==="video"&&a.duration&&o.jsx(Ne,{children:a.duration})]},S))}):o.jsx(Oe,{children:t(j?"No items match the current filter":"No items to download")})]}),o.jsxs(je,{$isRTL:d,children:[o.jsxs(ze,{$isRTL:d,children:[o.jsx(Re,{children:l.size===1?t("{{count}} item selected",{count:l.size.toString()}):t("{{count}} items selected",{count:l.size.toString()})}),j&&o.jsx("span",{style:{fontSize:"12px",color:"#666",fontStyle:"italic"},children:y.length===1?t("({{count}} item shown after filtering)",{count:y.length.toString()}):t("({{count}} items shown after filtering)",{count:y.length.toString()})})]}),o.jsxs(Ee,{children:[o.jsx(W,{onClick:i,children:t("Cancel")}),o.jsx(Me,{onClick:D,disabled:l.size===0,children:l.size===0?t("Select items to download"):l.size===1?t("Download {{count}} item",{count:l.size.toString()}):t("Download {{count}} items",{count:l.size.toString()})})]})]})]})});return V.createPortal(O,document.body)};export{Ye as C,Ve as D,Te as M,Qe as Q,V as R};
