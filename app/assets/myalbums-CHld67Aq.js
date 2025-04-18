import{R as j,j as e,r as f}from"./client-Cud3CRJO.js";import{c as R}from"./checkLogin-qnSOvydV.js";const w="https://hhmbamfr3fhjjelhzs5fm7hrki.appsync-api.us-east-1.amazonaws.com/graphql",A="https://i6180-assets-prod-0.s3.amazonaws.com/public/",x=n=>n?new Date(n).toLocaleString(void 0,{year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):"",v=()=>{const[n,h]=f.useState([]);f.useEffect(()=>{const t=R();if(!t)return;(async()=>{var r,a;const i=`
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
      `,m={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:50,scanIndexForward:!1}};try{const l=await(await fetch(w,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({query:i,variables:m})})).json(),_=(((a=(r=l==null?void 0:l.data)==null?void 0:r.fetchRelations)==null?void 0:a.items)||[]).map(b=>{var p,u;const o=b.folder,I=((u=(p=o==null?void 0:o.fileReferencesPage)==null?void 0:p.items)==null?void 0:u.map(c=>c.file))||[];return{id:o.id,folderName:o.folderName,createdAt:o.createdAt,updatedAt:o.updatedAt,files:I.filter(c=>c&&c.dataKey)}});h(_)}catch(d){console.error("Failed to load folders:",d)}})()},[]);const y=t=>t.split("_____")[0],g=t=>{var s;return((s=t.split("_____")[1])==null?void 0:s.split("____")[0])||""};return e.jsx("div",{style:{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',backgroundColor:"#f8f9fa",minHeight:"100vh",padding:"40px 20px"},children:e.jsxs("div",{style:{maxWidth:900,margin:"0 auto"},children:[e.jsx("h1",{style:{fontSize:28,marginBottom:24,color:"#333"},children:"My Albums"}),n.length===0&&e.jsx("p",{style:{fontSize:16,color:"#555"},children:"No albums found or still loading..."}),n.map(t=>{const s=t.createdAt!=null,i=t.updatedAt!=null&&t.updatedAt!==t.createdAt,r=`https://6180.io/photos/${`${y(t.id)}_${g(t.id)}`}`;return e.jsx("a",{href:r,style:{textDecoration:"none",color:"inherit",display:"block",marginBottom:30},children:e.jsxs("div",{style:{background:"#fff",borderRadius:12,padding:20,boxShadow:"0 4px 12px rgba(0,0,0,0.05)",transition:"box-shadow 0.2s ease"},onMouseOver:a=>a.currentTarget.style.boxShadow="0 6px 16px rgba(0,0,0,0.08)",onMouseOut:a=>a.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.05)",children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12},children:[e.jsx("h2",{style:{fontSize:20,margin:0,color:"#222"},children:t.folderName||""}),(s||i)&&e.jsxs("div",{style:{fontSize:13,color:"#777",textAlign:"right"},children:[s&&e.jsxs("div",{children:["Created: ",x(t.createdAt)]}),i&&e.jsxs("div",{children:["Updated: ",x(t.updatedAt)]})]})]}),e.jsx("div",{style:{display:"flex",overflowX:"auto",gap:12},children:t.files.map((a,d)=>e.jsx("img",{src:`${A}${a.thumbnailDataKey||a.dataKey}`,alt:"Thumbnail",style:{width:140,height:90,objectFit:"cover",borderRadius:6,border:"1px solid #ddd",flexShrink:0}},d))})]})},t.id)})]})})};j.createRoot(document.getElementById("root")).render(e.jsx(v,{}));
