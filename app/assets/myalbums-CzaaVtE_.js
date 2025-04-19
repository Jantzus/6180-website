import{R as v,j as t,r as m}from"./client-Cud3CRJO.js";import{c as w}from"./checkLogin-rqu5e6z9.js";const A="https://hhmbamfr3fhjjelhzs5fm7hrki.appsync-api.us-east-1.amazonaws.com/graphql",S="https://i6180-assets-prod-0.s3.amazonaws.com/public/",x=o=>o?new Date(o).toLocaleString(void 0,{year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):"",F=()=>{const[o,h]=m.useState([]),[p,g]=m.useState(null);m.useEffect(()=>{g(localStorage.getItem("publicUsername")||null);const e=w();if(!e)return;(async()=>{var r,s;const i=`
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
      `,u={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:50,scanIndexForward:!1}};try{const c=await(await fetch(A,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({query:i,variables:u})})).json(),I=(((s=(r=c==null?void 0:c.data)==null?void 0:r.fetchRelations)==null?void 0:s.items)||[]).map(j=>{var f,y;const a=j.folder,R=((y=(f=a==null?void 0:a.fileReferencesPage)==null?void 0:f.items)==null?void 0:y.map(l=>l.file))||[];return{id:a.id,folderName:a.folderName,createdAt:a.createdAt,updatedAt:a.updatedAt,files:R.filter(l=>l&&l.dataKey)}});h(I)}catch(d){console.error("Failed to load folders:",d)}})()},[]);const b=e=>e.split("_____")[0],_=e=>{var n;return((n=e.split("_____")[1])==null?void 0:n.split("____")[0])||""};return t.jsx("div",{style:{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',backgroundColor:"#f8f9fa",minHeight:"100vh",padding:"40px 20px"},children:t.jsxs("div",{style:{maxWidth:900,margin:"0 auto"},children:[t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24},children:[t.jsx("h1",{style:{fontSize:28,margin:0,color:"#333"},children:"My Albums"}),p&&t.jsx("div",{style:{fontSize:16,color:"#666"},children:p})]}),o.length===0&&t.jsx("p",{style:{fontSize:16,color:"#555"},children:"No albums found or still loading..."}),o.map(e=>{const n=e.createdAt!=null,i=e.updatedAt!=null&&e.updatedAt!==e.createdAt,r=`https://6180.io/photos/${`${b(e.id)}_${_(e.id)}`}`;return t.jsx("a",{href:r,style:{textDecoration:"none",color:"inherit",display:"block",marginBottom:30},children:t.jsxs("div",{style:{background:"#fff",borderRadius:12,padding:20,boxShadow:"0 4px 12px rgba(0,0,0,0.05)",transition:"box-shadow 0.2s ease"},onMouseOver:s=>s.currentTarget.style.boxShadow="0 6px 16px rgba(0,0,0,0.08)",onMouseOut:s=>s.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.05)",children:[t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12},children:[t.jsx("h2",{style:{fontSize:20,margin:0,color:"#222"},children:e.folderName||""}),(n||i)&&t.jsxs("div",{style:{fontSize:13,color:"#777",textAlign:"right"},children:[n&&t.jsxs("div",{children:["Created: ",x(e.createdAt)]}),i&&t.jsxs("div",{children:["Updated: ",x(e.updatedAt)]})]})]}),t.jsx("div",{style:{display:"flex",overflowX:"auto",gap:12},children:e.files.map((s,d)=>t.jsx("img",{src:`${S}${s.thumbnailDataKey||s.dataKey}`,alt:"Thumbnail",style:{width:140,height:90,objectFit:"cover",borderRadius:6,border:"1px solid #ddd",flexShrink:0}},d))})]})},e.id)})]})})};v.createRoot(document.getElementById("root")).render(t.jsx(F,{}));
