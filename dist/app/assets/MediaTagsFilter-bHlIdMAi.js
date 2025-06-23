import{M as Z,J as _,j as r,d as h,u as ee,a as w,g as te}from"./utils-DJV_2HXH.js";var oe=Z();const H=_(oe),ce=({isOpen:o,onClose:T,inviteLink:f,onCopy:p,onCreateSubAlbum:y,showCreateSubAlbum:i=!1,t:c,isRTL:S})=>{if(!o)return null;const g=S?"right":"left",u={width:"100%",padding:"12px",margin:"8px 0",border:"1px solid #ddd",borderRadius:"6px",backgroundColor:"#fff",textAlign:g,cursor:"pointer",fontSize:"14px",transition:"background-color 0.2s"},m=r.jsxs("div",{style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 0.5)",display:"flex",justifyContent:"center",alignItems:"center",zIndex:1e4,backdropFilter:"blur(4px)",WebkitBackdropFilter:"blur(4px)"},onClick:T,children:[r.jsxs("div",{style:{backgroundColor:"white",borderRadius:"12px",padding:"20px",width:"90%",maxWidth:"400px",boxShadow:"0 20px 60px rgba(0, 0, 0, 0.3)",direction:S?"rtl":"ltr",textAlign:g,position:"relative",animation:"modalFadeIn 0.2s ease-out"},onClick:t=>t.stopPropagation(),children:[r.jsx("h3",{style:{marginTop:0,marginBottom:"16px",fontSize:"18px",color:"#333",fontWeight:"600"},children:c("Choose an action")}),i&&y&&r.jsx("button",{style:u,onClick:t=>{t.stopPropagation(),y()},onMouseOver:t=>{t.stopPropagation(),t.currentTarget.style.backgroundColor="#f5f5f5"},onMouseOut:t=>{t.stopPropagation(),t.currentTarget.style.backgroundColor="#fff"},children:c("Share Specific Files")}),r.jsx("button",{style:u,onClick:t=>{t.stopPropagation(),p(f)},onMouseOver:t=>{t.stopPropagation(),t.currentTarget.style.backgroundColor="#f5f5f5"},onMouseOut:t=>{t.stopPropagation(),t.currentTarget.style.backgroundColor="#fff"},children:c("Link Only")}),r.jsx("button",{style:u,onClick:t=>{t.stopPropagation(),p(`${c("Here are photos from our event")}: ${f}`)},onMouseOver:t=>{t.stopPropagation(),t.currentTarget.style.backgroundColor="#f5f5f5"},onMouseOut:t=>{t.stopPropagation(),t.currentTarget.style.backgroundColor="#fff"},children:c("View Album Photos")}),r.jsx("button",{style:u,onClick:t=>{t.stopPropagation(),p(`${c("Please add any photos from our event here")}: ${f}`)},onMouseOver:t=>{t.stopPropagation(),t.currentTarget.style.backgroundColor="#f5f5f5"},onMouseOut:t=>{t.stopPropagation(),t.currentTarget.style.backgroundColor="#fff"},children:c("Add Photos To Album")}),r.jsx("button",{style:{...u,backgroundColor:"#f0f0f0",marginTop:"16px"},onClick:t=>{t.stopPropagation(),T()},onMouseOver:t=>{t.stopPropagation(),t.currentTarget.style.backgroundColor="#e0e0e0"},onMouseOut:t=>{t.stopPropagation(),t.currentTarget.style.backgroundColor="#f0f0f0"},children:c("Cancel")})]}),r.jsx("style",{children:`
          @keyframes modalFadeIn {
            from {
              opacity: 0;
              transform: scale(0.9) translateY(-10px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
        `})]});return H.createPortal(m,document.body)},ge=({isOpen:o,onClose:T,t:f,isRTL:p})=>{if(!o)return null;const y=r.jsx("div",{style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 0.5)",display:"flex",justifyContent:"center",alignItems:"center",zIndex:1e4},onClick:T,children:r.jsxs("div",{style:{backgroundColor:"white",borderRadius:"12px",padding:"20px",width:"90%",maxWidth:"400px",boxShadow:"0 4px 20px rgba(0, 0, 0, 0.15)",direction:p?"rtl":"ltr",textAlign:p?"right":"left"},onClick:i=>i.stopPropagation(),children:[r.jsx("h3",{style:{marginTop:0,marginBottom:"16px",fontSize:"18px"},children:f("Link to album website copied.")}),r.jsx("button",{style:{width:"100%",padding:"12px",border:"1px solid #ddd",borderRadius:"6px",backgroundColor:"#f0f0f0",textAlign:"center",cursor:"pointer",fontSize:"14px"},onClick:i=>{i.stopPropagation(),T()},onMouseOver:i=>{i.stopPropagation(),i.currentTarget.style.backgroundColor="#e0e0e0"},onMouseOut:i=>{i.stopPropagation(),i.currentTarget.style.backgroundColor="#f0f0f0"},children:f("OK")})]})});return H.createPortal(y,document.body)},ae=h.div`
  width: 100%;
  /* Remove gray background, padding, border, and border-radius */
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  direction: ${o=>o.$isRTL?"rtl":"ltr"};
`,V=h.div`
  margin-bottom: 8px; /* Reduced from 12px to 8px for tighter spacing */

  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 6px; /* Tighter mobile spacing */
  }
`,Y=h.div`
  display: flex;
  flex-direction: ${o=>o.$isRTL?"row-reverse":"row"};
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
`,se=h.button`
  padding: 6px 12px; /* Keeping existing padding for good touch targets */
  border: 1px solid ${o=>o.$isDisplayed?"#28a745":o.$isSelected?"#000000":"#ced4da"};
  border-radius: 16px;
  background: ${o=>o.$isDisplayed?"#28a745":o.$isSelected?"#000000":"#ffffff"};
  color: ${o=>o.$isDisplayed||o.$isSelected?"#ffffff":"#495057"};
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
    background: ${o=>o.$isDisplayed?"#1e7e34":o.$isSelected?"#333333":"#e9ecef"};
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
`,ne=h.button`
  padding: 4px 8px;
  border: 1px solid ${o=>o.$isSelected?"#000000":"#ced4da"};  // Changed from #007bff to #000000 (black)
  border-radius: 12px;
  background: ${o=>o.$isSelected?"#000000":"#ffffff"};  // Changed from #007bff to #000000 (black)
  color: ${o=>o.$isSelected?"#ffffff":"#495057"};
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
  height: 28px; /* Reduced height for subtags */
  display: flex;
  align-items: center;

  &:hover {
    background: ${o=>o.$isSelected?"#333333":"#e9ecef"};  // Changed from #0056b3 to #333333 (dark gray)
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
`,re=h.div`
  margin-top: 6px; /* Reduced from 8px to 6px */
  font-size: 13px;
  color: #555;
  font-style: italic;
  text-align: ${o=>o.$isRTL?"right":"left"};
`,ie=h.div`
  color: #6c757d;
  font-size: 13px;
  font-style: italic;
  padding: 6px 0; /* Reduced from 8px to 6px */
`,le=h.button`
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
`,pe=({mediaItems:o,onFilterChange:T,resetFilter:f})=>{var A,D,K,L,B;const{t:p,language:y}=ee(),i=te(y)==="rtl";console.log("🎯 MediaTagsFilter received props:",{mediaItemsCount:o.length,mediaItemsWithTags:o.filter(e=>e.selectedTags&&e.selectedTags.length>0).length,firstItemHasTags:!!((A=o[0])!=null&&A.selectedTags),firstItemTagCount:((K=(D=o[0])==null?void 0:D.selectedTags)==null?void 0:K.length)||0,sampleTags:((B=(L=o[0])==null?void 0:L.selectedTags)==null?void 0:B.slice(0,2))||[]}),o.slice(0,3).forEach((e,n)=>{var a,s;console.log(`🎯 Filter received item ${n}:`,{fileId:e.fileId,hasSelectedTags:!!e.selectedTags,tagCount:((a=e.selectedTags)==null?void 0:a.length)||0,tags:((s=e.selectedTags)==null?void 0:s.map(l=>{var d;return`${l.tagTitle}(${((d=l.subtags)==null?void 0:d.length)||0})`}))||[]})});const[c,S]=w.useState([]),[g,u]=w.useState([]),[m,t]=w.useState(null),[E,v]=w.useState([]),O=e=>e.subtags.filter(n=>g.includes(n.key)),N=e=>{const n=O(e);if(n.length===0)return`${e.tagTitle} (${e.count})`;const a=n.map(s=>`${s.subtagTitle} (${s.count})`).join(", ");return`${e.tagTitle} (${a})`};w.useEffect(()=>{console.log("🏷️ MediaTagsFilter: Starting tag extraction from mediaItems:",o.length);const e=new Map;o.forEach((a,s)=>{var l,d;console.log(`🏷️ Processing mediaItem ${s}:`,{fileId:a.fileId,hasSelectedTags:!!a.selectedTags,selectedTagsLength:((l=a.selectedTags)==null?void 0:l.length)||0}),(d=a.selectedTags)==null||d.forEach((x,$)=>{var W;console.log(`  🏷️ Processing tag ${$}:`,x);const k=`${x.TagType}-${x.tagTitle}`;e.has(k)||(e.set(k,{tag:{key:k,TagType:x.TagType,tagTitle:x.tagTitle,count:0,subtags:[]},count:0}),console.log(`    ✅ Created new tag: ${k}`));const C=e.get(k);C.count++,C.tag.count=C.count,console.log(`    📊 Updated tag count: ${k} = ${C.count}`),(W=x.subtags)==null||W.forEach((b,Q)=>{console.log(`    🏷️ Processing subtag ${Q}:`,b);const j=`${b.TagType}-${b.tagTitle}-${b.subtagTitle}`,I=C.tag,F=I.subtags.find(X=>X.key===j);F?(F.count++,console.log(`      📊 Updated subtag count: ${j} = ${F.count}`)):(I.subtags.push({key:j,TagType:b.TagType,tagTitle:b.tagTitle,subtagTitle:b.subtagTitle,count:1}),console.log(`      ✅ Created new subtag: ${j}`))})})});const n=Array.from(e.values()).sort((a,s)=>s.count-a.count).map(a=>(a.tag.subtags.sort((s,l)=>l.count-s.count),a.tag));console.log("🏷️ Final tags array:",{totalTags:n.length,tags:n.map(a=>({key:a.key,title:a.tagTitle,count:a.count,subtagsCount:a.subtags.length}))}),S(n),v(n)},[o]);const P=e=>{if(e.length===0){f(),v(c);return}const n=o.filter(a=>{var l;const s=new Set;return(l=a.selectedTags)==null||l.forEach(d=>{var x;s.add(`${d.TagType}-${d.tagTitle}`),(x=d.subtags)==null||x.forEach($=>{s.add(`${$.TagType}-${$.tagTitle}-${$.subtagTitle}`)})}),e.every(d=>s.has(d))});G(n),T(n)},U=e=>{const n=g.includes(e.key),a=m===e.key;if(n){if(n&&!a)t(e.key);else if(n&&a){const s=g.filter(l=>l!==e.key&&!e.subtags.some(d=>d.key===l));u(s),t(null),P(s)}}else{const s=[...g,e.key];u(s),t(e.key),P(s)}},q=e=>{const n=g.includes(e.key);let a;n?a=g.filter(s=>s!==e.key):a=[...g,e.key],u(a),P(a)},J=()=>{u([]),t(null),f(),v(c)},G=e=>{const n=new Set;e.forEach(s=>{var l;(l=s.selectedTags)==null||l.forEach(d=>{n.add(`${d.TagType}-${d.tagTitle}`)})}),g.forEach(s=>{s.includes("-",s.indexOf("-")+1)||n.add(s)});const a=c.filter(s=>n.has(s.key));v(a)},R=m?c.find(e=>e.key===m):null,z=g.length,M=c.length>0;return console.log("🎯 MediaTagsFilter render decision:",{allTagsLength:c.length,hasTags:M,willRender:M}),M?(console.log("✅ MediaTagsFilter: Rendering with tags"),r.jsxs(ae,{$isRTL:i,children:[r.jsx(V,{children:r.jsxs(Y,{$isRTL:i,children:[z>0&&r.jsx(le,{onClick:J,children:p("Clear All")}),E.length>0?E.map(e=>{const n=O(e),a=n.length>0?p("{{tagType}}: {{tagTitle}} ({{subtags}})",{tagType:e.TagType,tagTitle:e.tagTitle,subtags:n.map(s=>s.subtagTitle).join(", ")}):p("Click to add/remove: {{tagType}}: {{tagTitle}}",{tagType:e.TagType,tagTitle:e.tagTitle});return r.jsx(se,{$isSelected:g.includes(e.key),$isDisplayed:m===e.key,onClick:()=>U(e),title:a,children:N(e)},e.key)}):r.jsx(ie,{children:p("No tags available")})]})}),R&&R.subtags.length>0&&r.jsx(V,{children:r.jsx(Y,{$isRTL:i,children:R.subtags.map(e=>r.jsxs(ne,{$isSelected:g.includes(e.key),onClick:()=>q(e),title:p("Click to add/remove: {{tagType}}: {{tagTitle}} → {{subtagTitle}}",{tagType:e.TagType,tagTitle:e.tagTitle,subtagTitle:e.subtagTitle}),children:[e.subtagTitle," (",e.count,")"]},e.key))})}),z>0&&r.jsx(re,{$isRTL:i,children:p("Showing photos with all selected tags")})]})):(console.log("❌ MediaTagsFilter: No tags found, returning null"),null)};export{ce as C,pe as M,H as R,ge as a};
