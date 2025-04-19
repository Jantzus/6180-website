import{R as v,j as t,r as h}from"./client-Cud3CRJO.js";import{c as S}from"./checkLogin-rqu5e6z9.js";const A="https://hhmbamfr3fhjjelhzs5fm7hrki.appsync-api.us-east-1.amazonaws.com/graphql",k="https://i6180-assets-prod-0.s3.amazonaws.com/public/",g=a=>a?new Date(a).toLocaleString(void 0,{year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):"",z=()=>{const[a,m]=h.useState([]),[p,y]=h.useState(null);h.useEffect(()=>{y(localStorage.getItem("publicUsername")||null);const e=S();if(!e)return;(async()=>{var r,o;const i=`
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
      `,u={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:50,scanIndexForward:!1}};try{const c=await(await fetch(A,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({query:i,variables:u})})).json(),I=(((o=(r=c==null?void 0:c.data)==null?void 0:r.fetchRelations)==null?void 0:o.items)||[]).map(w=>{var f,x;const n=w.folder,R=((x=(f=n==null?void 0:n.fileReferencesPage)==null?void 0:f.items)==null?void 0:x.map(d=>d.file))||[];return{id:n.id,folderName:n.folderName,createdAt:n.createdAt,updatedAt:n.updatedAt,files:R.filter(d=>d&&d.dataKey)}});m(I)}catch(l){console.error("Failed to load folders:",l)}})()},[]);const b=e=>e.split("_____")[0],_=e=>{var s;return((s=e.split("_____")[1])==null?void 0:s.split("____")[0])||""},j=()=>{localStorage.clear(),window.location.href="/index.html"};return t.jsx("div",{style:{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',backgroundColor:"#f8f9fa",minHeight:"100vh",padding:"40px 20px"},children:t.jsxs("div",{style:{maxWidth:900,margin:"0 auto"},children:[t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24},children:[t.jsx("h1",{style:{fontSize:28,margin:0,color:"#333"},children:"My Albums"}),p&&t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[t.jsx("div",{style:{fontSize:"16px",color:"#666"},children:p}),t.jsx("button",{onClick:j,style:{fontSize:"14px",padding:"6px 12px",backgroundColor:"#e53935",color:"white",border:"none",borderRadius:"6px",cursor:"pointer"},children:"Log Out"})]})]}),a.length===0&&t.jsx("p",{style:{fontSize:16,color:"#555"},children:"No albums found or still loading..."}),a.map(e=>{const s=e.createdAt!=null,i=e.updatedAt!=null&&e.updatedAt!==e.createdAt,r=`https://6180.io/photos/${`${b(e.id)}_${_(e.id)}`}`;return t.jsx("a",{href:r,style:{textDecoration:"none",color:"inherit",display:"block",marginBottom:30},children:t.jsxs("div",{style:{background:"#fff",borderRadius:12,padding:20,boxShadow:"0 4px 12px rgba(0,0,0,0.05)",transition:"box-shadow 0.2s ease"},onMouseOver:o=>o.currentTarget.style.boxShadow="0 6px 16px rgba(0,0,0,0.08)",onMouseOut:o=>o.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.05)",children:[t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12},children:[t.jsx("h2",{style:{fontSize:20,margin:0,color:"#222"},children:e.folderName||""}),(s||i)&&t.jsxs("div",{style:{fontSize:13,color:"#777",textAlign:"right"},children:[s&&t.jsxs("div",{children:["Created: ",g(e.createdAt)]}),i&&t.jsxs("div",{children:["Updated: ",g(e.updatedAt)]})]})]}),t.jsx("div",{style:{display:"flex",overflowX:"auto",gap:12},children:e.files.map((o,l)=>t.jsx("img",{src:`${k}${o.thumbnailDataKey||o.dataKey}`,alt:"Thumbnail",style:{width:140,height:90,objectFit:"cover",borderRadius:6,border:"1px solid #ddd",flexShrink:0}},l))})]})},e.id)})]})})};v.createRoot(document.getElementById("root")).render(t.jsx(z,{}));
