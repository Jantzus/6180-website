import{R,j as e,r as c}from"./client-Cud3CRJO.js";import{c as S,a as f,S as A,G as C}from"./utils-DZ9AgAGK.js";const k=()=>{const[p,g]=c.useState([]),[h,y]=c.useState(null);c.useEffect(()=>{y(localStorage.getItem("publicUsername")||null);const t=S();if(!t)return;(async()=>{var a,l;const r=`
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
      `,m={fetchRelationsInput:{ownerItemId:"myAccountOwnerItemId",rangeKeyPrefix:"FolderPosition",index:"ownerItemId_____RelationType____sortParameter",limit:50,scanIndexForward:!1}};try{const s=await(await fetch(C,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({query:r,variables:m})})).json(),_=(((l=(a=s==null?void 0:s.data)==null?void 0:a.fetchRelations)==null?void 0:l.items)||[]).map(v=>{var u,x;const n=v.folder,w=((x=(u=n==null?void 0:n.fileReferencesPage)==null?void 0:u.items)==null?void 0:x.map(d=>d.file))||[];return{id:n.id,folderName:n.folderName,createdAt:n.createdAt,updatedAt:n.updatedAt,files:w.filter(d=>d&&d.dataKey)}});g(_)}catch(o){console.error("Failed to load folders:",o)}})()},[]);const b=t=>t.split("_____")[0],I=t=>{var i;return((i=t.split("_____")[1])==null?void 0:i.split("____")[0])||""},j=()=>{localStorage.clear(),window.location.href="/index.html"};return e.jsx("div",{style:{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',backgroundColor:"#f8f9fa",minHeight:"100vh",padding:"40px 20px"},children:e.jsxs("div",{style:{maxWidth:900,margin:"0 auto"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:20},children:[e.jsx("h1",{style:{fontSize:28,margin:0,color:"#333"},children:"My Albums"}),e.jsx("button",{onClick:()=>{localStorage.removeItem("selectedPhotos"),window.location.href="/app/save-album.html"},style:{fontSize:"14px",padding:"8px 16px",backgroundColor:"#007bff",color:"white",border:"none",borderRadius:"6px",cursor:"pointer"},children:"New Album"})]}),h&&e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsx("div",{style:{fontSize:"16px",color:"#666"},children:h}),e.jsx("button",{onClick:j,style:{fontSize:"14px",padding:"6px 12px",backgroundColor:"#e53935",color:"white",border:"none",borderRadius:"6px",cursor:"pointer"},children:"Log Out"})]})]}),p.length===0&&e.jsx("p",{style:{fontSize:16,color:"#555"},children:"No albums found or still loading..."}),p.map(t=>{const i=t.createdAt!=null,r=t.updatedAt!=null&&t.updatedAt!==t.createdAt,a=`https://6180.io/photos/${`${b(t.id)}_${I(t.id)}`}`,l=o=>{o.preventDefault(),navigator.clipboard.writeText(a)};return e.jsxs("div",{style:{display:"flex",alignItems:"flex-start",marginBottom:30},children:[e.jsx("button",{onClick:l,style:{marginRight:16,padding:"8px 12px",backgroundColor:"#e0e0e0",border:"none",borderRadius:6,cursor:"pointer",fontSize:14,height:40,alignSelf:"center"},children:"Copy Link"}),e.jsx("a",{href:a,style:{textDecoration:"none",color:"inherit",flex:1},children:e.jsxs("div",{style:{background:"#fff",borderRadius:12,padding:20,boxShadow:"0 4px 12px rgba(0,0,0,0.05)",transition:"box-shadow 0.2s ease"},onMouseOver:o=>o.currentTarget.style.boxShadow="0 6px 16px rgba(0,0,0,0.08)",onMouseOut:o=>o.currentTarget.style.boxShadow="0 4px 12px rgba(0,0,0,0.05)",children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12},children:[e.jsx("h2",{style:{fontSize:20,margin:0,color:"#222"},children:t.folderName||""}),(i||r)&&e.jsxs("div",{style:{fontSize:13,color:"#777",textAlign:"right"},children:[i&&e.jsxs("div",{children:["Created: ",f(t.createdAt)]}),r&&e.jsxs("div",{children:["Updated: ",f(t.updatedAt)]})]})]}),e.jsx("div",{style:{display:"flex",overflowX:"auto",gap:12},children:t.files.map((o,s)=>e.jsx("img",{src:`${A}${o.thumbnailDataKey||o.dataKey}`,alt:"Thumbnail",style:{width:140,height:90,objectFit:"cover",borderRadius:6,border:"1px solid #ddd",flexShrink:0}},s))})]})})]},t.id)})]})})};R.createRoot(document.getElementById("root")).render(e.jsx(k,{}));
