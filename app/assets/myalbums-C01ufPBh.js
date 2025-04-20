import{R as v,j as t,r as c}from"./client-Cud3CRJO.js";import{c as w,a as f,S as A,G as k}from"./utils-DZ9AgAGK.js";const F=()=>{const[p,g]=c.useState([]),[m,y]=c.useState(null);c.useEffect(()=>{y(localStorage.getItem("publicUsername")||null);const e=w();if(!e)return;(async()=>{var i,o;const a=`
        mutation FetchRelations($fetchRelationsInput: FetchRelationsInput!) {
          fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
            items {
              ... on FolderPosition {
                folder {
                  id
                  folderName
                  createdAt
                  updatedAt
                  fileReferencesPage {
                    items {
                      file {
                        dataKey
                        thumbnailDataKey
                        durationInSeconds
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,h={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:50,scanIndexForward:!1}};try{const d=await(await fetch(k,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({query:a,variables:h})})).json(),j=(((o=(i=d==null?void 0:d.data)==null?void 0:i.fetchRelations)==null?void 0:o.items)||[]).map(R=>{var u,x;const s=R.folder,S=((x=(u=s==null?void 0:s.fileReferencesPage)==null?void 0:u.items)==null?void 0:x.map(l=>l.file))||[];return{id:s.id,folderName:s.folderName,createdAt:s.createdAt,updatedAt:s.updatedAt,files:S.filter(l=>l&&l.dataKey)}});g(j)}catch(r){console.error("Failed to load folders:",r)}})()},[]);const b=e=>e.split("_____")[0],_=e=>{var n;return((n=e.split("_____")[1])==null?void 0:n.split("____")[0])||""},I=()=>{localStorage.clear(),window.location.href="/index.html"};return t.jsx("div",{style:{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',backgroundColor:"#f8f9fa",minHeight:"100vh",padding:"40px 20px"},children:t.jsxs("div",{style:{maxWidth:900,margin:"0 auto"},children:[t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24},children:[t.jsx("h1",{style:{fontSize:28,margin:0,color:"#333"},children:"My Albums"}),m&&t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[t.jsx("div",{style:{fontSize:"16px",color:"#666"},children:m}),t.jsx("button",{onClick:I,style:{fontSize:"14px",padding:"6px 12px",backgroundColor:"#e53935",color:"white",border:"none",borderRadius:"6px",cursor:"pointer"},children:"Log Out"})]})]}),p.length===0&&t.jsx("p",{style:{fontSize:16,color:"#555"},children:"No albums found or still loading..."}),p.map(e=>{const n=e.createdAt!=null,a=e.updatedAt!=null&&e.updatedAt!==e.createdAt,i=`https://6180.io/photos/${`${b(e.id)}_${_(e.id)}`}`;return t.jsx("a",{href:i,style:{textDecoration:"none",color:"inherit",display:"block",marginBottom:30},children:t.jsxs("div",{style:{background:"#fff",borderRadius:12,padding:20,boxShadow:"0 4px 12px rgba(0,0,0,0.05)",transition:"box-shadow 0.2s ease"},onMouseOver:o=>o.currentTarget.style.boxShadow="0 6px 16px rgba(0,0,0,0.08)",onMouseOut:o=>o.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.05)",children:[t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12},children:[t.jsx("h2",{style:{fontSize:20,margin:0,color:"#222"},children:e.folderName||""}),(n||a)&&t.jsxs("div",{style:{fontSize:13,color:"#777",textAlign:"right"},children:[n&&t.jsxs("div",{children:["Created: ",f(e.createdAt)]}),a&&t.jsxs("div",{children:["Updated: ",f(e.updatedAt)]})]})]}),t.jsx("div",{style:{display:"flex",overflowX:"auto",gap:12},children:e.files.map((o,r)=>t.jsx("img",{src:`${A}${o.thumbnailDataKey||o.dataKey}`,alt:"Thumbnail",style:{width:140,height:90,objectFit:"cover",borderRadius:6,border:"1px solid #ddd",flexShrink:0}},r))})]})},e.id)})]})})};v.createRoot(document.getElementById("root")).render(t.jsx(F,{}));
