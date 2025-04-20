import{R as v,j as t,r as c}from"./client-Cud3CRJO.js";import{c as S,a as x}from"./utils-BcGQbDZV.js";const A="https://hhmbamfr3fhjjelhzs5fm7hrki.appsync-api.us-east-1.amazonaws.com/graphql",k="https://i6180-assets-prod-0.s3.amazonaws.com/public/",z=()=>{const[p,g]=c.useState([]),[h,y]=c.useState(null);c.useEffect(()=>{y(localStorage.getItem("publicUsername")||null);const e=S();if(!e)return;(async()=>{var i,s;const n=`
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
      `,m={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:50,scanIndexForward:!1}};try{const d=await(await fetch(A,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({query:n,variables:m})})).json(),I=(((s=(i=d==null?void 0:d.data)==null?void 0:i.fetchRelations)==null?void 0:s.items)||[]).map(w=>{var u,f;const o=w.folder,R=((f=(u=o==null?void 0:o.fileReferencesPage)==null?void 0:u.items)==null?void 0:f.map(l=>l.file))||[];return{id:o.id,folderName:o.folderName,createdAt:o.createdAt,updatedAt:o.updatedAt,files:R.filter(l=>l&&l.dataKey)}});g(I)}catch(r){console.error("Failed to load folders:",r)}})()},[]);const b=e=>e.split("_____")[0],_=e=>{var a;return((a=e.split("_____")[1])==null?void 0:a.split("____")[0])||""},j=()=>{localStorage.clear(),window.location.href="/index.html"};return t.jsx("div",{style:{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',backgroundColor:"#f8f9fa",minHeight:"100vh",padding:"40px 20px"},children:t.jsxs("div",{style:{maxWidth:900,margin:"0 auto"},children:[t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24},children:[t.jsx("h1",{style:{fontSize:28,margin:0,color:"#333"},children:"My Albums"}),h&&t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[t.jsx("div",{style:{fontSize:"16px",color:"#666"},children:h}),t.jsx("button",{onClick:j,style:{fontSize:"14px",padding:"6px 12px",backgroundColor:"#e53935",color:"white",border:"none",borderRadius:"6px",cursor:"pointer"},children:"Log Out"})]})]}),p.length===0&&t.jsx("p",{style:{fontSize:16,color:"#555"},children:"No albums found or still loading..."}),p.map(e=>{const a=e.createdAt!=null,n=e.updatedAt!=null&&e.updatedAt!==e.createdAt,i=`https://6180.io/photos/${`${b(e.id)}_${_(e.id)}`}`;return t.jsx("a",{href:i,style:{textDecoration:"none",color:"inherit",display:"block",marginBottom:30},children:t.jsxs("div",{style:{background:"#fff",borderRadius:12,padding:20,boxShadow:"0 4px 12px rgba(0,0,0,0.05)",transition:"box-shadow 0.2s ease"},onMouseOver:s=>s.currentTarget.style.boxShadow="0 6px 16px rgba(0,0,0,0.08)",onMouseOut:s=>s.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.05)",children:[t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12},children:[t.jsx("h2",{style:{fontSize:20,margin:0,color:"#222"},children:e.folderName||""}),(a||n)&&t.jsxs("div",{style:{fontSize:13,color:"#777",textAlign:"right"},children:[a&&t.jsxs("div",{children:["Created: ",x(e.createdAt)]}),n&&t.jsxs("div",{children:["Updated: ",x(e.updatedAt)]})]})]}),t.jsx("div",{style:{display:"flex",overflowX:"auto",gap:12},children:e.files.map((s,r)=>t.jsx("img",{src:`${k}${s.thumbnailDataKey||s.dataKey}`,alt:"Thumbnail",style:{width:140,height:90,objectFit:"cover",borderRadius:6,border:"1px solid #ddd",flexShrink:0}},r))})]})},e.id)})]})})};v.createRoot(document.getElementById("root")).render(t.jsx(z,{}));
