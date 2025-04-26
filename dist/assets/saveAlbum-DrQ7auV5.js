import{a as te,r as $,u as Mt,j as a,g as Lt,R as Nr,I as Rr}from"./react-B1IqpKuI.js";import{a4 as Ce,a3 as rt}from"./config-MU1r0ubE.js";import{u as Dr,c as Tr,g as Ct,s as Fr,L as Or,p as zr,a as Br,b as Ur,m as Mr,d as Lr}from"./file-upload-utils-BY1HcCxT.js";var U=function(){return U=Object.assign||function(t){for(var r,n=1,s=arguments.length;n<s;n++){r=arguments[n];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(t[o]=r[o])}return t},U.apply(this,arguments)};function $e(e,t,r){if(r||arguments.length===2)for(var n=0,s=t.length,o;n<s;n++)(o||!(n in t))&&(o||(o=Array.prototype.slice.call(t,0,n)),o[n]=t[n]);return e.concat(o||Array.prototype.slice.call(t))}var _="-ms-",ke="-moz-",I="-webkit-",Gt="comm",Ke="rule",mt="decl",Gr="@import",Wt="@keyframes",Wr="@layer",Vt=Math.abs,bt=String.fromCharCode,it=Object.assign;function Vr(e,t){return O(e,0)^45?(((t<<2^O(e,0))<<2^O(e,1))<<2^O(e,2))<<2^O(e,3):0}function Ht(e){return e.trim()}function ee(e,t){return(e=t.exec(e))?e[0]:e}function v(e,t,r){return e.replace(t,r)}function Ue(e,t,r){return e.indexOf(t,r)}function O(e,t){return e.charCodeAt(t)|0}function me(e,t,r){return e.slice(t,r)}function Q(e){return e.length}function qt(e){return e.length}function je(e,t){return t.push(e),e}function Hr(e,t){return e.map(t).join("")}function jt(e,t){return e.filter(function(r){return!ee(r,t)})}var Je=1,be=1,Yt=0,W=0,D=0,we="";function Qe(e,t,r,n,s,o,c,d){return{value:e,root:t,parent:r,type:n,props:s,children:o,line:Je,column:be,length:c,return:"",siblings:d}}function re(e,t){return it(Qe("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function he(e){for(;e.root;)e=re(e.root,{children:[e]});je(e,e.siblings)}function qr(){return D}function Yr(){return D=W>0?O(we,--W):0,be--,D===10&&(be=1,Je--),D}function q(){return D=W<Yt?O(we,W++):0,be++,D===10&&(be=1,Je++),D}function ce(){return O(we,W)}function Me(){return W}function Ze(e,t){return me(we,e,t)}function ct(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Kr(e){return Je=be=1,Yt=Q(we=e),W=0,[]}function Jr(e){return we="",e}function nt(e){return Ht(Ze(W-1,lt(e===91?e+2:e===40?e+1:e)))}function Qr(e){for(;(D=ce())&&D<33;)q();return ct(e)>2||ct(D)>3?"":" "}function Zr(e,t){for(;--t&&q()&&!(D<48||D>102||D>57&&D<65||D>70&&D<97););return Ze(e,Me()+(t<6&&ce()==32&&q()==32))}function lt(e){for(;q();)switch(D){case e:return W;case 34:case 39:e!==34&&e!==39&&lt(D);break;case 40:e===41&&lt(e);break;case 92:q();break}return W}function Xr(e,t){for(;q()&&e+D!==57;)if(e+D===84&&ce()===47)break;return"/*"+Ze(t,W-1)+"*"+bt(e===47?e:q())}function en(e){for(;!ct(ce());)q();return Ze(e,W)}function tn(e){return Jr(Le("",null,null,null,[""],e=Kr(e),0,[0],e))}function Le(e,t,r,n,s,o,c,d,f){for(var h=0,y=0,l=c,b=0,w=0,C=0,x=1,z=1,A=1,j=0,k="",E=s,N=o,P=n,g=k;z;)switch(C=j,j=q()){case 40:if(C!=108&&O(g,l-1)==58){Ue(g+=v(nt(j),"&","&\f"),"&\f",Vt(h?d[h-1]:0))!=-1&&(A=-1);break}case 34:case 39:case 91:g+=nt(j);break;case 9:case 10:case 13:case 32:g+=Qr(C);break;case 92:g+=Zr(Me()-1,7);continue;case 47:switch(ce()){case 42:case 47:je(rn(Xr(q(),Me()),t,r,f),f);break;default:g+="/"}break;case 123*x:d[h++]=Q(g)*A;case 125*x:case 59:case 0:switch(j){case 0:case 125:z=0;case 59+y:A==-1&&(g=v(g,/\f/g,"")),w>0&&Q(g)-l&&je(w>32?$t(g+";",n,r,l-1,f):$t(v(g," ","")+";",n,r,l-2,f),f);break;case 59:g+=";";default:if(je(P=kt(g,t,r,h,y,s,d,k,E=[],N=[],l,o),o),j===123)if(y===0)Le(g,t,P,P,E,o,l,d,N);else switch(b===99&&O(g,3)===110?100:b){case 100:case 108:case 109:case 115:Le(e,P,P,n&&je(kt(e,P,P,0,0,s,d,k,s,E=[],l,N),N),s,N,l,d,n?E:N);break;default:Le(g,P,P,P,[""],N,0,d,N)}}h=y=w=0,x=A=1,k=g="",l=c;break;case 58:l=1+Q(g),w=C;default:if(x<1){if(j==123)--x;else if(j==125&&x++==0&&Yr()==125)continue}switch(g+=bt(j),j*x){case 38:A=y>0?1:(g+="\f",-1);break;case 44:d[h++]=(Q(g)-1)*A,A=1;break;case 64:ce()===45&&(g+=nt(q())),b=ce(),y=l=Q(k=g+=en(Me())),j++;break;case 45:C===45&&Q(g)==2&&(x=0)}}return o}function kt(e,t,r,n,s,o,c,d,f,h,y,l){for(var b=s-1,w=s===0?o:[""],C=qt(w),x=0,z=0,A=0;x<n;++x)for(var j=0,k=me(e,b+1,b=Vt(z=c[x])),E=e;j<C;++j)(E=Ht(z>0?w[j]+" "+k:v(k,/&\f/g,w[j])))&&(f[A++]=E);return Qe(e,t,r,s===0?Ke:d,f,h,y,l)}function rn(e,t,r,n){return Qe(e,t,r,Gt,bt(qr()),me(e,2,-2),0,n)}function $t(e,t,r,n,s){return Qe(e,t,r,mt,me(e,0,n),me(e,n+1,-1),n,s)}function Kt(e,t,r){switch(Vr(e,t)){case 5103:return I+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return I+e+e;case 4789:return ke+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return I+e+ke+e+_+e+e;case 5936:switch(O(e,t+11)){case 114:return I+e+_+v(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return I+e+_+v(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return I+e+_+v(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return I+e+_+e+e;case 6165:return I+e+_+"flex-"+e+e;case 5187:return I+e+v(e,/(\w+).+(:[^]+)/,I+"box-$1$2"+_+"flex-$1$2")+e;case 5443:return I+e+_+"flex-item-"+v(e,/flex-|-self/g,"")+(ee(e,/flex-|baseline/)?"":_+"grid-row-"+v(e,/flex-|-self/g,""))+e;case 4675:return I+e+_+"flex-line-pack"+v(e,/align-content|flex-|-self/g,"")+e;case 5548:return I+e+_+v(e,"shrink","negative")+e;case 5292:return I+e+_+v(e,"basis","preferred-size")+e;case 6060:return I+"box-"+v(e,"-grow","")+I+e+_+v(e,"grow","positive")+e;case 4554:return I+v(e,/([^-])(transform)/g,"$1"+I+"$2")+e;case 6187:return v(v(v(e,/(zoom-|grab)/,I+"$1"),/(image-set)/,I+"$1"),e,"")+e;case 5495:case 3959:return v(e,/(image-set\([^]*)/,I+"$1$`$1");case 4968:return v(v(e,/(.+:)(flex-)?(.*)/,I+"box-pack:$3"+_+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+I+e+e;case 4200:if(!ee(e,/flex-|baseline/))return _+"grid-column-align"+me(e,t)+e;break;case 2592:case 3360:return _+v(e,"template-","")+e;case 4384:case 3616:return r&&r.some(function(n,s){return t=s,ee(n.props,/grid-\w+-end/)})?~Ue(e+(r=r[t].value),"span",0)?e:_+v(e,"-start","")+e+_+"grid-row-span:"+(~Ue(r,"span",0)?ee(r,/\d+/):+ee(r,/\d+/)-+ee(e,/\d+/))+";":_+v(e,"-start","")+e;case 4896:case 4128:return r&&r.some(function(n){return ee(n.props,/grid-\w+-start/)})?e:_+v(v(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return v(e,/(.+)-inline(.+)/,I+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(Q(e)-1-t>6)switch(O(e,t+1)){case 109:if(O(e,t+4)!==45)break;case 102:return v(e,/(.+:)(.+)-([^]+)/,"$1"+I+"$2-$3$1"+ke+(O(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~Ue(e,"stretch",0)?Kt(v(e,"stretch","fill-available"),t,r)+e:e}break;case 5152:case 5920:return v(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(n,s,o,c,d,f,h){return _+s+":"+o+h+(c?_+s+"-span:"+(d?f:+f-+o)+h:"")+e});case 4949:if(O(e,t+6)===121)return v(e,":",":"+I)+e;break;case 6444:switch(O(e,O(e,14)===45?18:11)){case 120:return v(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+I+(O(e,14)===45?"inline-":"")+"box$3$1"+I+"$2$3$1"+_+"$2box$3")+e;case 100:return v(e,":",":"+_)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return v(e,"scroll-","scroll-snap-")+e}return e}function Ve(e,t){for(var r="",n=0;n<e.length;n++)r+=t(e[n],n,e,t)||"";return r}function nn(e,t,r,n){switch(e.type){case Wr:if(e.children.length)break;case Gr:case mt:return e.return=e.return||e.value;case Gt:return"";case Wt:return e.return=e.value+"{"+Ve(e.children,n)+"}";case Ke:if(!Q(e.value=e.props.join(",")))return""}return Q(r=Ve(e.children,n))?e.return=e.value+"{"+r+"}":""}function sn(e){var t=qt(e);return function(r,n,s,o){for(var c="",d=0;d<t;d++)c+=e[d](r,n,s,o)||"";return c}}function on(e){return function(t){t.root||(t=t.return)&&e(t)}}function an(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case mt:e.return=Kt(e.value,e.length,r);return;case Wt:return Ve([re(e,{value:v(e.value,"@","@"+I)})],n);case Ke:if(e.length)return Hr(r=e.props,function(s){switch(ee(s,n=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":he(re(e,{props:[v(s,/:(read-\w+)/,":"+ke+"$1")]})),he(re(e,{props:[s]})),it(e,{props:jt(r,n)});break;case"::placeholder":he(re(e,{props:[v(s,/:(plac\w+)/,":"+I+"input-$1")]})),he(re(e,{props:[v(s,/:(plac\w+)/,":"+ke+"$1")]})),he(re(e,{props:[v(s,/:(plac\w+)/,_+"input-$1")]})),he(re(e,{props:[s]})),it(e,{props:jt(r,n)});break}return""})}}var cn={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},G={},xe=typeof process<"u"&&G!==void 0&&(G.REACT_APP_SC_ATTR||G.SC_ATTR)||"data-styled",Jt="active",Qt="data-styled-version",Xe="6.1.17",xt=`/*!sc*/
`,He=typeof window<"u"&&"HTMLElement"in window,ln=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&G!==void 0&&G.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&G.REACT_APP_SC_DISABLE_SPEEDY!==""?G.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&G.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&G!==void 0&&G.SC_DISABLE_SPEEDY!==void 0&&G.SC_DISABLE_SPEEDY!==""&&G.SC_DISABLE_SPEEDY!=="false"&&G.SC_DISABLE_SPEEDY),dn={},et=Object.freeze([]),ye=Object.freeze({});function Zt(e,t,r){return r===void 0&&(r=ye),e.theme!==r.theme&&e.theme||t||r.theme}var Xt=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),un=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,pn=/(^-|-$)/g;function _t(e){return e.replace(un,"-").replace(pn,"")}var fn=/(a)(d)/gi,Oe=52,Et=function(e){return String.fromCharCode(e+(e>25?39:97))};function dt(e){var t,r="";for(t=Math.abs(e);t>Oe;t=t/Oe|0)r=Et(t%Oe)+r;return(Et(t%Oe)+r).replace(fn,"$1-$2")}var st,er=5381,ge=function(e,t){for(var r=t.length;r;)e=33*e^t.charCodeAt(--r);return e},tr=function(e){return ge(er,e)};function rr(e){return dt(tr(e)>>>0)}function hn(e){return e.displayName||e.name||"Component"}function ot(e){return typeof e=="string"&&!0}var nr=typeof Symbol=="function"&&Symbol.for,sr=nr?Symbol.for("react.memo"):60115,gn=nr?Symbol.for("react.forward_ref"):60112,mn={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},bn={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},or={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},xn=((st={})[gn]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},st[sr]=or,st);function At(e){return("type"in(t=e)&&t.type.$$typeof)===sr?or:"$$typeof"in e?xn[e.$$typeof]:mn;var t}var yn=Object.defineProperty,vn=Object.getOwnPropertyNames,Nt=Object.getOwnPropertySymbols,wn=Object.getOwnPropertyDescriptor,Sn=Object.getPrototypeOf,Rt=Object.prototype;function ar(e,t,r){if(typeof t!="string"){if(Rt){var n=Sn(t);n&&n!==Rt&&ar(e,n,r)}var s=vn(t);Nt&&(s=s.concat(Nt(t)));for(var o=At(e),c=At(t),d=0;d<s.length;++d){var f=s[d];if(!(f in bn||r&&r[f]||c&&f in c||o&&f in o)){var h=wn(t,f);try{yn(e,f,h)}catch{}}}}return e}function ve(e){return typeof e=="function"}function yt(e){return typeof e=="object"&&"styledComponentId"in e}function ie(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function ut(e,t){if(e.length===0)return"";for(var r=e[0],n=1;n<e.length;n++)r+=e[n];return r}function _e(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function pt(e,t,r){if(r===void 0&&(r=!1),!r&&!_e(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var n=0;n<t.length;n++)e[n]=pt(e[n],t[n]);else if(_e(t))for(var n in t)e[n]=pt(e[n],t[n]);return e}function vt(e,t){Object.defineProperty(e,"toString",{value:t})}function Ee(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var Pn=function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}return e.prototype.indexOfGroup=function(t){for(var r=0,n=0;n<t;n++)r+=this.groupSizes[n];return r},e.prototype.insertRules=function(t,r){if(t>=this.groupSizes.length){for(var n=this.groupSizes,s=n.length,o=s;t>=o;)if((o<<=1)<0)throw Ee(16,"".concat(t));this.groupSizes=new Uint32Array(o),this.groupSizes.set(n),this.length=o;for(var c=s;c<o;c++)this.groupSizes[c]=0}for(var d=this.indexOfGroup(t+1),f=(c=0,r.length);c<f;c++)this.tag.insertRule(d,r[c])&&(this.groupSizes[t]++,d++)},e.prototype.clearGroup=function(t){if(t<this.length){var r=this.groupSizes[t],n=this.indexOfGroup(t),s=n+r;this.groupSizes[t]=0;for(var o=n;o<s;o++)this.tag.deleteRule(n)}},e.prototype.getGroup=function(t){var r="";if(t>=this.length||this.groupSizes[t]===0)return r;for(var n=this.groupSizes[t],s=this.indexOfGroup(t),o=s+n,c=s;c<o;c++)r+="".concat(this.tag.getRule(c)).concat(xt);return r},e}(),Ge=new Map,qe=new Map,We=1,ze=function(e){if(Ge.has(e))return Ge.get(e);for(;qe.has(We);)We++;var t=We++;return Ge.set(e,t),qe.set(t,e),t},In=function(e,t){We=t+1,Ge.set(e,t),qe.set(t,e)},Cn="style[".concat(xe,"][").concat(Qt,'="').concat(Xe,'"]'),jn=new RegExp("^".concat(xe,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),kn=function(e,t,r){for(var n,s=r.split(","),o=0,c=s.length;o<c;o++)(n=s[o])&&e.registerName(t,n)},$n=function(e,t){for(var r,n=((r=t.textContent)!==null&&r!==void 0?r:"").split(xt),s=[],o=0,c=n.length;o<c;o++){var d=n[o].trim();if(d){var f=d.match(jn);if(f){var h=0|parseInt(f[1],10),y=f[2];h!==0&&(In(y,h),kn(e,y,f[3]),e.getTag().insertRules(h,s)),s.length=0}else s.push(d)}}},Dt=function(e){for(var t=document.querySelectorAll(Cn),r=0,n=t.length;r<n;r++){var s=t[r];s&&s.getAttribute(xe)!==Jt&&($n(e,s),s.parentNode&&s.parentNode.removeChild(s))}};function _n(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var ir=function(e){var t=document.head,r=e||t,n=document.createElement("style"),s=function(d){var f=Array.from(d.querySelectorAll("style[".concat(xe,"]")));return f[f.length-1]}(r),o=s!==void 0?s.nextSibling:null;n.setAttribute(xe,Jt),n.setAttribute(Qt,Xe);var c=_n();return c&&n.setAttribute("nonce",c),r.insertBefore(n,o),n},En=function(){function e(t){this.element=ir(t),this.element.appendChild(document.createTextNode("")),this.sheet=function(r){if(r.sheet)return r.sheet;for(var n=document.styleSheets,s=0,o=n.length;s<o;s++){var c=n[s];if(c.ownerNode===r)return c}throw Ee(17)}(this.element),this.length=0}return e.prototype.insertRule=function(t,r){try{return this.sheet.insertRule(r,t),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.prototype.getRule=function(t){var r=this.sheet.cssRules[t];return r&&r.cssText?r.cssText:""},e}(),An=function(){function e(t){this.element=ir(t),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(t,r){if(t<=this.length&&t>=0){var n=document.createTextNode(r);return this.element.insertBefore(n,this.nodes[t]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.prototype.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e}(),Nn=function(){function e(t){this.rules=[],this.length=0}return e.prototype.insertRule=function(t,r){return t<=this.length&&(this.rules.splice(t,0,r),this.length++,!0)},e.prototype.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.prototype.getRule=function(t){return t<this.length?this.rules[t]:""},e}(),Tt=He,Rn={isServer:!He,useCSSOMInjection:!ln},Ye=function(){function e(t,r,n){t===void 0&&(t=ye),r===void 0&&(r={});var s=this;this.options=U(U({},Rn),t),this.gs=r,this.names=new Map(n),this.server=!!t.isServer,!this.server&&He&&Tt&&(Tt=!1,Dt(this)),vt(this,function(){return function(o){for(var c=o.getTag(),d=c.length,f="",h=function(l){var b=function(A){return qe.get(A)}(l);if(b===void 0)return"continue";var w=o.names.get(b),C=c.getGroup(l);if(w===void 0||!w.size||C.length===0)return"continue";var x="".concat(xe,".g").concat(l,'[id="').concat(b,'"]'),z="";w!==void 0&&w.forEach(function(A){A.length>0&&(z+="".concat(A,","))}),f+="".concat(C).concat(x,'{content:"').concat(z,'"}').concat(xt)},y=0;y<d;y++)h(y);return f}(s)})}return e.registerId=function(t){return ze(t)},e.prototype.rehydrate=function(){!this.server&&He&&Dt(this)},e.prototype.reconstructWithOptions=function(t,r){return r===void 0&&(r=!0),new e(U(U({},this.options),t),this.gs,r&&this.names||void 0)},e.prototype.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(t=function(r){var n=r.useCSSOMInjection,s=r.target;return r.isServer?new Nn(s):n?new En(s):new An(s)}(this.options),new Pn(t)));var t},e.prototype.hasNameForId=function(t,r){return this.names.has(t)&&this.names.get(t).has(r)},e.prototype.registerName=function(t,r){if(ze(t),this.names.has(t))this.names.get(t).add(r);else{var n=new Set;n.add(r),this.names.set(t,n)}},e.prototype.insertRules=function(t,r,n){this.registerName(t,r),this.getTag().insertRules(ze(t),n)},e.prototype.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.prototype.clearRules=function(t){this.getTag().clearGroup(ze(t)),this.clearNames(t)},e.prototype.clearTag=function(){this.tag=void 0},e}(),Dn=/&/g,Tn=/^\s*\/\/.*$/gm;function cr(e,t){return e.map(function(r){return r.type==="rule"&&(r.value="".concat(t," ").concat(r.value),r.value=r.value.replaceAll(",",",".concat(t," ")),r.props=r.props.map(function(n){return"".concat(t," ").concat(n)})),Array.isArray(r.children)&&r.type!=="@keyframes"&&(r.children=cr(r.children,t)),r})}function Fn(e){var t,r,n,s=ye,o=s.options,c=o===void 0?ye:o,d=s.plugins,f=d===void 0?et:d,h=function(b,w,C){return C.startsWith(r)&&C.endsWith(r)&&C.replaceAll(r,"").length>0?".".concat(t):b},y=f.slice();y.push(function(b){b.type===Ke&&b.value.includes("&")&&(b.props[0]=b.props[0].replace(Dn,r).replace(n,h))}),c.prefix&&y.push(an),y.push(nn);var l=function(b,w,C,x){w===void 0&&(w=""),C===void 0&&(C=""),x===void 0&&(x="&"),t=x,r=w,n=new RegExp("\\".concat(r,"\\b"),"g");var z=b.replace(Tn,""),A=tn(C||w?"".concat(C," ").concat(w," { ").concat(z," }"):z);c.namespace&&(A=cr(A,c.namespace));var j=[];return Ve(A,sn(y.concat(on(function(k){return j.push(k)})))),j};return l.hash=f.length?f.reduce(function(b,w){return w.name||Ee(15),ge(b,w.name)},er).toString():"",l}var On=new Ye,ft=Fn(),lr=te.createContext({shouldForwardProp:void 0,styleSheet:On,stylis:ft});lr.Consumer;te.createContext(void 0);function ht(){return $.useContext(lr)}var zn=function(){function e(t,r){var n=this;this.inject=function(s,o){o===void 0&&(o=ft);var c=n.name+o.hash;s.hasNameForId(n.id,c)||s.insertRules(n.id,c,o(n.rules,c,"@keyframes"))},this.name=t,this.id="sc-keyframes-".concat(t),this.rules=r,vt(this,function(){throw Ee(12,String(n.name))})}return e.prototype.getName=function(t){return t===void 0&&(t=ft),this.name+t.hash},e}(),Bn=function(e){return e>="A"&&e<="Z"};function Ft(e){for(var t="",r=0;r<e.length;r++){var n=e[r];if(r===1&&n==="-"&&e[0]==="-")return e;Bn(n)?t+="-"+n.toLowerCase():t+=n}return t.startsWith("ms-")?"-"+t:t}var dr=function(e){return e==null||e===!1||e===""},ur=function(e){var t,r,n=[];for(var s in e){var o=e[s];e.hasOwnProperty(s)&&!dr(o)&&(Array.isArray(o)&&o.isCss||ve(o)?n.push("".concat(Ft(s),":"),o,";"):_e(o)?n.push.apply(n,$e($e(["".concat(s," {")],ur(o),!1),["}"],!1)):n.push("".concat(Ft(s),": ").concat((t=s,(r=o)==null||typeof r=="boolean"||r===""?"":typeof r!="number"||r===0||t in cn||t.startsWith("--")?String(r).trim():"".concat(r,"px")),";")))}return n};function ne(e,t,r,n){if(dr(e))return[];if(yt(e))return[".".concat(e.styledComponentId)];if(ve(e)){if(!ve(o=e)||o.prototype&&o.prototype.isReactComponent||!t)return[e];var s=e(t);return ne(s,t,r,n)}var o;return e instanceof zn?r?(e.inject(r,n),[e.getName(n)]):[e]:_e(e)?ur(e):Array.isArray(e)?Array.prototype.concat.apply(et,e.map(function(c){return ne(c,t,r,n)})):[e.toString()]}function pr(e){for(var t=0;t<e.length;t+=1){var r=e[t];if(ve(r)&&!yt(r))return!1}return!0}var Un=tr(Xe),Mn=function(){function e(t,r,n){this.rules=t,this.staticRulesId="",this.isStatic=(n===void 0||n.isStatic)&&pr(t),this.componentId=r,this.baseHash=ge(Un,r),this.baseStyle=n,Ye.registerId(r)}return e.prototype.generateAndInjectStyles=function(t,r,n){var s=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,r,n):"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&r.hasNameForId(this.componentId,this.staticRulesId))s=ie(s,this.staticRulesId);else{var o=ut(ne(this.rules,t,r,n)),c=dt(ge(this.baseHash,o)>>>0);if(!r.hasNameForId(this.componentId,c)){var d=n(o,".".concat(c),void 0,this.componentId);r.insertRules(this.componentId,c,d)}s=ie(s,c),this.staticRulesId=c}else{for(var f=ge(this.baseHash,n.hash),h="",y=0;y<this.rules.length;y++){var l=this.rules[y];if(typeof l=="string")h+=l;else if(l){var b=ut(ne(l,t,r,n));f=ge(f,b+y),h+=b}}if(h){var w=dt(f>>>0);r.hasNameForId(this.componentId,w)||r.insertRules(this.componentId,w,n(h,".".concat(w),void 0,this.componentId)),s=ie(s,w)}}return s},e}(),wt=te.createContext(void 0);wt.Consumer;var at={};function Ln(e,t,r){var n=yt(e),s=e,o=!ot(e),c=t.attrs,d=c===void 0?et:c,f=t.componentId,h=f===void 0?function(E,N){var P=typeof E!="string"?"sc":_t(E);at[P]=(at[P]||0)+1;var g="".concat(P,"-").concat(rr(Xe+P+at[P]));return N?"".concat(N,"-").concat(g):g}(t.displayName,t.parentComponentId):f,y=t.displayName,l=y===void 0?function(E){return ot(E)?"styled.".concat(E):"Styled(".concat(hn(E),")")}(e):y,b=t.displayName&&t.componentId?"".concat(_t(t.displayName),"-").concat(t.componentId):t.componentId||h,w=n&&s.attrs?s.attrs.concat(d).filter(Boolean):d,C=t.shouldForwardProp;if(n&&s.shouldForwardProp){var x=s.shouldForwardProp;if(t.shouldForwardProp){var z=t.shouldForwardProp;C=function(E,N){return x(E,N)&&z(E,N)}}else C=x}var A=new Mn(r,b,n?s.componentStyle:void 0);function j(E,N){return function(P,g,Z){var V=P.attrs,Y=P.componentStyle,Ae=P.defaultProps,Ne=P.foldedComponentIds,Re=P.styledComponentId,De=P.target,tt=te.useContext(wt),Te=ht(),le=P.shouldForwardProp||Te.shouldForwardProp,Se=Zt(g,tt,Ae)||ye,F=function(ue,se,pe){for(var oe,X=U(U({},se),{className:void 0,theme:pe}),Ie=0;Ie<ue.length;Ie+=1){var fe=ve(oe=ue[Ie])?oe(X):oe;for(var J in fe)X[J]=J==="className"?ie(X[J],fe[J]):J==="style"?U(U({},X[J]),fe[J]):fe[J]}return se.className&&(X.className=ie(X.className,se.className)),X}(V,g,Se),H=F.as||De,K={};for(var M in F)F[M]===void 0||M[0]==="$"||M==="as"||M==="theme"&&F.theme===Se||(M==="forwardedAs"?K.as=F.forwardedAs:le&&!le(M,H)||(K[M]=F[M]));var de=function(ue,se){var pe=ht(),oe=ue.generateAndInjectStyles(se,pe.styleSheet,pe.stylis);return oe}(Y,F),Pe=ie(Ne,Re);return de&&(Pe+=" "+de),F.className&&(Pe+=" "+F.className),K[ot(H)&&!Xt.has(H)?"class":"className"]=Pe,Z&&(K.ref=Z),$.createElement(H,K)}(k,E,N)}j.displayName=l;var k=te.forwardRef(j);return k.attrs=w,k.componentStyle=A,k.displayName=l,k.shouldForwardProp=C,k.foldedComponentIds=n?ie(s.foldedComponentIds,s.styledComponentId):"",k.styledComponentId=b,k.target=n?s.target:e,Object.defineProperty(k,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(E){this._foldedDefaultProps=n?function(N){for(var P=[],g=1;g<arguments.length;g++)P[g-1]=arguments[g];for(var Z=0,V=P;Z<V.length;Z++)pt(N,V[Z],!0);return N}({},s.defaultProps,E):E}}),vt(k,function(){return".".concat(k.styledComponentId)}),o&&ar(k,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),k}function Ot(e,t){for(var r=[e[0]],n=0,s=t.length;n<s;n+=1)r.push(t[n],e[n+1]);return r}var zt=function(e){return Object.assign(e,{isCss:!0})};function St(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(ve(e)||_e(e))return zt(ne(Ot(et,$e([e],t,!0))));var n=e;return t.length===0&&n.length===1&&typeof n[0]=="string"?ne(n):zt(ne(Ot(n,t)))}function gt(e,t,r){if(r===void 0&&(r=ye),!t)throw Ee(1,t);var n=function(s){for(var o=[],c=1;c<arguments.length;c++)o[c-1]=arguments[c];return e(t,r,St.apply(void 0,$e([s],o,!1)))};return n.attrs=function(s){return gt(e,t,U(U({},r),{attrs:Array.prototype.concat(r.attrs,s).filter(Boolean)}))},n.withConfig=function(s){return gt(e,t,U(U({},r),s))},n}var fr=function(e){return gt(Ln,e)},p=fr;Xt.forEach(function(e){p[e]=fr(e)});var Gn=function(){function e(t,r){this.rules=t,this.componentId=r,this.isStatic=pr(t),Ye.registerId(this.componentId+1)}return e.prototype.createStyles=function(t,r,n,s){var o=s(ut(ne(this.rules,r,n,s)),""),c=this.componentId+t;n.insertRules(c,c,o)},e.prototype.removeStyles=function(t,r){r.clearRules(this.componentId+t)},e.prototype.renderStyles=function(t,r,n,s){t>2&&Ye.registerId(this.componentId+t),this.removeStyles(t,n),this.createStyles(t,r,n,s)},e}();function Wn(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var n=St.apply(void 0,$e([e],t,!1)),s="sc-global-".concat(rr(JSON.stringify(n))),o=new Gn(n,s),c=function(f){var h=ht(),y=te.useContext(wt),l=te.useRef(h.styleSheet.allocateGSInstance(s)).current;return h.styleSheet.server&&d(l,f,h.styleSheet,y,h.stylis),te.useLayoutEffect(function(){if(!h.styleSheet.server)return d(l,f,h.styleSheet,y,h.stylis),function(){return o.removeStyles(l,h.styleSheet)}},[l,f,h.styleSheet,y,h.stylis]),null};function d(f,h,y,l,b){if(o.isStatic)o.renderStyles(f,dn,y,b);else{var w=U(U({},h),{theme:Zt(h,l,c.defaultProps)});o.renderStyles(f,w,y,b)}}return te.memo(c)}const Vn=({isOpen:e,onClose:t,initialOption:r="noPassword",initialPassword:n=""})=>{const{t:s,language:o}=Mt(),c=Lt(o)==="rtl",[d,f]=$.useState(r),[h,y]=$.useState(n);if($.useEffect(()=>{e&&(f(r),y(n))},[e,r,n]),!e)return null;const l=h.trim()==="",b=x=>{x!=="noPassword"&&l||f(x)},w=x=>{x.preventDefault(),x.stopPropagation()},C=x=>{x.target===x.currentTarget&&t()};return a.jsx("div",{className:"modal-backdrop",onClick:C,children:a.jsxs("div",{className:`modal-container ${c?"rtl":"ltr"}`,onClick:w,children:[a.jsxs("div",{className:`modal-header ${c?"text-right":"text-left"}`,children:[s("Enter a password for this album."),a.jsx("br",{}),a.jsx("br",{}),s("Select what can be done with photos and videos without a password.")]}),a.jsx("input",{type:"text",className:"password-input",placeholder:s("Enter password"),value:h,onChange:x=>y(x.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"}),a.jsxs("div",{className:"options-container",children:[a.jsxs("div",{className:`option ${d==="notVisible"?"selected":""} ${l?"disabled":""}`,onClick:()=>!l&&b("notVisible"),children:[a.jsx("input",{type:"radio",name:"protection",id:"notVisible",className:`radio-input ${c?"rtl":"ltr"}`,checked:d==="notVisible",onChange:()=>{},disabled:l,onClick:x=>{x.stopPropagation(),!l&&b("notVisible")}}),a.jsxs("label",{htmlFor:"notVisible",className:`option-label ${l?"disabled":""}`,onClick:()=>!l&&b("notVisible"),children:[s("Not Visible"),l&&a.jsx("span",{className:"password-required-text",children:s("Password required")})]})]}),a.jsxs("div",{className:`option ${d==="watermark"?"selected":""} ${l?"disabled":""}`,onClick:()=>!l&&b("watermark"),children:[a.jsx("input",{type:"radio",name:"protection",id:"watermark",className:`radio-input ${c?"rtl":"ltr"}`,checked:d==="watermark",onChange:()=>{},disabled:l,onClick:x=>{x.stopPropagation(),!l&&b("watermark")}}),a.jsxs("label",{htmlFor:"watermark",className:`option-label ${l?"disabled":""}`,onClick:()=>!l&&b("watermark"),children:[s("Watermark"),l&&a.jsx("span",{className:"password-required-text",children:s("Password required")})]})]}),a.jsxs("div",{className:`option ${d==="cannotBeSaved"?"selected":""} ${l?"disabled":""}`,onClick:()=>!l&&b("cannotBeSaved"),children:[a.jsx("input",{type:"radio",name:"protection",id:"cannotBeSaved",className:`radio-input ${c?"rtl":"ltr"}`,checked:d==="cannotBeSaved",onChange:()=>{},disabled:l,onClick:x=>{x.stopPropagation(),!l&&b("cannotBeSaved")}}),a.jsxs("label",{htmlFor:"cannotBeSaved",className:`option-label ${l?"disabled":""}`,onClick:()=>!l&&b("cannotBeSaved"),children:[s("Cannot Be Saved"),l&&a.jsx("span",{className:"password-required-text",children:s("Password required")})]})]}),a.jsxs("div",{className:`option ${d==="noPassword"?"selected":""}`,onClick:()=>b("noPassword"),children:[a.jsx("input",{type:"radio",name:"protection",id:"noPassword",className:`radio-input ${c?"rtl":"ltr"}`,checked:d==="noPassword",onChange:()=>{},onClick:x=>{x.stopPropagation(),b("noPassword")}}),a.jsx("label",{htmlFor:"noPassword",className:"option-label",onClick:()=>b("noPassword"),children:s("No Password")})]})]}),a.jsxs("div",{className:`button-container ${c?"rtl":"ltr"}`,children:[a.jsx("button",{className:"cancel-button",onClick:()=>t(),children:s("Cancel")}),a.jsx("button",{className:"save-button",onClick:()=>{console.log(`Saving with option: ${d}, password: ${h.length>0?"********":"none"}`),t(d,h)},children:s("Save")})]})]})})};var hr=(e=>(e.NotVisible="NotVisible",e.Watermark="Watermark",e.CannotBeSaved="CannotBeSaved",e.NoPassword="NoPassword",e))(hr||{});const Hn=`
  query FetchFolders($folderIds: [String!]!) {
    fetchFolders(folderIds: $folderIds) {
      items {
        folderName
        folderDescription
        folderPassword {
          password
          policy
        }
        fileReferencesPage {
          items {
            file {
              ownerContactId
              dataKey
              thumbnailDataKey
              durationInSeconds
            }
          }
        }
        contactsUsingInvite {
          items {
            id
            item {
              ... on Persona {
                publicDisplayName
              }
            }
          }
        }
        folderPosition {
          id
        }          
      }
    }
  }
`,qn=Wn`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }
`,gr=e=>St`
  direction: ${e?"rtl":"ltr"};
`,Yn=p.div`
  padding: 40px 20px;
  background-color: #f9fafb;
  min-height: 100vh;
  ${e=>gr(e.isRTL)}
`,Kn=p.div`
  max-width: 900px;
  margin: 0 auto;
`,Jn=p.div`
  margin-bottom: 20px;
`,Qn=p.div`
  margin-bottom: 12px;
`,Zn=p.a`
  font-size: 16px;
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
`,Xn=p.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,es=p.div`
  font-size: 16px;
  color: #666;
`,ts=p.div`
  margin-bottom: 24px;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,rs=p.h3`
  font-size: 18px;
  margin: 0 0 12px 0;
`,ns=p.div`
  margin-bottom: 12px;
`,ss=p.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 6px;
`,os=p.div`
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`,as=p.div`
  height: 100%;
  background-color: #4caf50;
  border-radius: 4px;
  transition: width 0.3s ease;
  width: ${e=>e.progress*100}%;
`,is=p.div`
  display: flex;
  gap: 12px;
  font-size: 14px;
  color: #666;
`,Be=p.div`
  color: ${e=>e.isError?"#e53935":"inherit"};
`,cs=p.div`
  margin-bottom: 24px;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,ls=p.h3`
  font-size: 18px;
  margin: 0 0 12px 0;
`,ds=p.div`
  font-size: 14px;
  margin-bottom: 8px;
`,us=p.div`
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`,ps=p.div`
  height: 100%;
  background-color: #2196f3;
  border-radius: 4px;
  transition: width 0.3s ease;
`,fs=p.p`
  font-size: 16px;
  margin-bottom: 16px;
  color: #333;
`,hs=p.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 32px;
`,gs=p.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.03);
  width: 160px;
  position: relative;
`,ms=p.div`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: white;
  z-index: 1;
  background-color: ${e=>{switch(e.status){case"complete":return"#4caf50";case"error":return"#e53935";case"uploading":return"#2196f3";case"processing":return"#ff9800";default:return"#9e9e9e"}}};
`,bs=p.div`
  position: relative;
  margin-bottom: 8px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`,xs=p.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 6px;
`,ys=p.video`
  max-width: 100%;
  max-height: 100%;
  border-radius: 6px;
`,vs=p.div`
  position: absolute;
  bottom: 4px;
  left: 4px;
  right: 4px;
  height: 4px;
  background-color: rgba(0,0,0,0.2);
  border-radius: 2px;
  overflow: hidden;
`,ws=p.div`
  height: 100%;
  background-color: ${e=>e.status==="processing"?"#ff9800":"#2196f3"};
  transition: width 0.3s ease;
  width: ${e=>e.progress*100}%;
`,Ss=p.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 6px;
`,Ps=p.div`
  font-size: 12px;
  color: #e53935;
  margin-bottom: 6px;
`,Is=p.button`
  background-color: #e53935;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 8px;
  font-size: 12px;
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  margin-top: auto;
  opacity: ${e=>e.disabled?.6:1};
`,Cs=p.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`,mr=p.button`
  padding: 14px 28px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  opacity: ${e=>e.disabled?.6:1};
`,js=p(mr)`
  background-color: #007bff;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
`,br=p(mr)`
  background-color: #8c8c8c;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
`,ks=p(br)`
  color: ${e=>e.passwordSet?"#000000":"white"};
  font-weight: ${e=>e.passwordSet?"bold":"normal"};
`,$s=p.div`
  margin-top: 12px;
  margin-bottom: 12px;
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,Bt=p.div`
  margin-bottom: 16px;
`,Ut=p.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
`,_s=p.input`
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-sizing: border-box;
`,Es=p.textarea`
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  resize: vertical;
`,As=p.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`,Ns=p.div`
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  ${e=>gr(e.isRTL)}
`,Rs=p.p`
  font-size: 16px;
  margin-bottom: 12px;
`,Ds=p.p`
  font-size: 14px;
  margin-bottom: 16px;
  color: #666;
`,Ts=p.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
  text-align: ${e=>e.isRTL?"right":"left"};
`,Fs=p.div`
  color: #e53935;
  margin-bottom: 12px;
`,Os=p.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  margin-bottom: 10px;
  opacity: ${e=>e.disabled?.6:1};
`,zs=p.button`
  width: 100%;
  padding: 12px;
  background-color: #6c757d;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  opacity: ${e=>e.disabled?.6:1};
`,Bs=p.div`
  margin-top: 24px;
  padding: 16px;
  background-color: #f0f0f0;
  border-radius: 8px;
`,Us=p.h3`
  margin: 0 0 12px 0;
  font-size: 16px;
`,Ms=p.pre`
  margin: 0;
  font-size: 12px;
  white-space: pre-wrap;
  max-height: 200px;
  overflow-y: auto;
`,Ls=p.div`
  margin-bottom: 4px;
`,Gs=p.input`
  display: none;
`,Ws=()=>{const{t:e,language:t}=Mt(),r=Lt(t)==="rtl",[n,s]=$.useState(null),[o,c]=$.useState([]),[d,f]=$.useState([]),[h,y]=$.useState(null),[l,b]=$.useState(null),[w,C]=$.useState(!1),[x,z]=$.useState(""),[A,j]=$.useState(""),[k,E]=$.useState(!1),[N,P]=$.useState(!1),[g,Z]=$.useState({totalFiles:0,filesComplete:0,filesUploading:0,filesProcessing:0,filesWithError:0,overallProgress:0}),[V,Y]=$.useState(!1),[Ae,Ne]=$.useState(""),[Re,De]=$.useState(""),[tt,Te]=$.useState(!1),[le,Se]=$.useState(!1),[F,H]=$.useState("noPassword"),[K,M]=$.useState(""),de=Ur(f),Pe=Br(c);$.useEffect(()=>{ue()},[]),$.useEffect(()=>{o.length>0&&localStorage.setItem(Ce.SELECTED_PHOTOS,JSON.stringify(o))},[o]),$.useEffect(()=>{Dr(o,Z)},[o]);const ue=async()=>{Y(!1);try{const i=Tr();if(!i)return;try{const u=localStorage.getItem("publicUsername");y(u||null);const m=JSON.parse(atob(i.split(".")[1]))["cognito:username"];m&&(b(m),await se(m))}catch(u){console.error("User data initialization error:",u)}oe(),X()}catch(i){console.error("Initialization error:",i)}},se=async i=>{try{const S=new URLSearchParams(window.location.search).get("folderId");if(S){s(S),Te(!0);try{const m=await pe(S);if(m)switch(Ne(m.folderName),De(m.folderDescription),m.passwordPolicy){case"NoPassword":H("noPassword");break;case"NotVisible":H("notVisible"),M(m.password);break;case"Watermark":H("watermark"),M(m.password);break;case"CannotBeSaved":H("cannotBeSaved"),M(m.password);break;default:H("noPassword")}}catch(m){console.error("Error fetching folder details:",m)}}else{const m=`${i}_____${Ct()}____Folder`;s(m),Te(!0)}}catch(u){console.error("Folder ID initialization error:",u)}},pe=async i=>{var u,S,m,T;try{const R=localStorage.getItem("idToken");if(!R)return null;const B=await(await fetch(rt,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${R}`},body:JSON.stringify({query:Hn,variables:{folderIds:[i]}})})).json();if(B.errors)return console.error("GraphQL errors:",B.errors),null;const ae=((S=(u=B==null?void 0:B.data)==null?void 0:u.fetchFolders)==null?void 0:S.items)||[];if(ae.length===0)return null;const Fe=ae[0];return{folderName:Fe.folderName||"",folderDescription:Fe.folderDescription||"",passwordPolicy:((m=Fe.folderPassword)==null?void 0:m.policy)||"NoPassword",password:((T=Fe.folderPassword)==null?void 0:T.password)||""}}catch(R){return console.error("Error in fetchFolderDetails:",R),null}},oe=()=>{try{const i=localStorage.getItem(Ce.SELECTED_PHOTOS);if(i)try{const u=JSON.parse(i);Array.isArray(u)&&u.length>0&&c(u)}catch(u){console.error("Error parsing stored photos:",u)}}catch(i){console.error("Error restoring photos from storage:",i)}},X=()=>{try{Fr||console.error("S3 client not available")}catch(i){console.error("S3 connection test error:",i)}},Ie=i=>{const u=o.filter((S,m)=>m!==i);c(u),u.length>0?localStorage.setItem(Ce.SELECTED_PHOTOS,JSON.stringify(u)):localStorage.removeItem(Ce.SELECTED_PHOTOS)},fe=async i=>{if(!l)return;const u=Array.from(i.target.files||[]);if(u.length)try{const S=J(u);c(R=>[...R,...S]);const m=o.length,T=await zr(u,l,(R,L,B,ae)=>{Pe(m+R,L,B,ae)},de);xr(m,T)}catch(S){console.error("Error in handleAddPhotos:",S)}finally{i.target.value=""}},J=i=>i.map(u=>{const S=u.type,m=u.name.split(".").pop()||"jpg";return{fileName:`${Ct()}.${m}`,s3PreviewUrl:URL.createObjectURL(u),type:S,size:u.size,status:"pending",progress:0}}),xr=(i,u)=>{c(S=>{const m=[...S];return u.forEach((T,R)=>{const L=i+R;L<m.length&&(m[L]=T)}),m})},yr=async()=>{Y(!0);try{if(h!=null&&h.startsWith("Profile-")){z(h),C(!0),Y(!1);return}Pt()}catch(i){console.error("Error in handleSaveAlbum:",i),Y(!1)}},Pt=async()=>{Y(!0);try{if(!vr()){Y(!1);return}const i=o.filter(B=>B.status==="complete"),u=Math.floor(Date.now()/1e3),S=`${l}_____${l}____Account`,T=n.split("_____")[1].split("____")[0];await Mr(i,wr,de);const R=Sr(u,S,T,i),L=Pr(i,u,S);await Ir(R,L)}catch(i){console.error("Error in saveAlbumDirectly:",i),Y(!1)}},vr=()=>!(!localStorage.getItem("idToken")||!l||!n),wr=i=>{const u=document.getElementById("saveProgress");u&&(u.style.width=`${i}%`)},Sr=(i,u,S,m)=>({currentTime:i,folderId:n,profileIds:["Only Me_____Only Me____Profile"],folderPositionSelectedTagInputs:[],folderPositionPoints:1,acceptedFileReferenceIds:m.map(T=>`${S}_____${T.fileName}____FileReference`),hiddenFileReferenceIds:[],folderInput:{folderSelectedTagInputs:[],folderAboutContactIds:[u],folderName:Ae,folderDescription:Re,folderPasswordInput:{password:F!=="noPassword"?K:null,policy:hr[F.charAt(0).toUpperCase()+F.slice(1)]},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,usingFolderInviteGrantsRightToRemoveItems:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:!0,addedItemsNeedFolderCreatorApproval:!1}}}),Pr=(i,u,S)=>i.map(m=>{var L;const T=m.type==="video"||(L=m.type)!=null&&L.startsWith("video")?`Input/Video/${m.fileName}`:`Input/Image/${m.fileName}`,R=`${l}_____${m.fileName}____File`;return{fileReferencesHolderId:n,currentTime:u,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:R,fileInput:{fileId:R,ownerFileInput:{editorContactIds:[S],FileSharingOptionsEnum:"Anyone",dataKey:T,thumbnailDataKey:m.thumbnailDataKey,dataInBytes:m.size,thumbnailDataInBytes:m.thumbnailSize||0,s3UploadedAt:u,durationInSeconds:m.duration},editorFileInput:{aboutContactIds:[S],captionText:"",numericFilterInputs:[]}}}}),Ir=async(i,u)=>{const S=document.getElementById("saveProgressText");S&&(S.innerText=e("Finalizing album..."));const m=localStorage.getItem("idToken"),T=`
      mutation MyMutation(
        $folderPositionInputs: [FolderPositionInput!],
        $updatedFileReferenceInputs: [UpdatedFileReferenceInput!]
      ) {
        changeFiles0(updatedFileReferenceInputs: $updatedFileReferenceInputs) {
          items {
            ... on FileReference { id createdAt updatedAt fileId file { dataKey thumbnailDataKey } }
          }
        }
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items { id }
        }
      }
    `,R={folderPositionInputs:[i],updatedFileReferenceInputs:u},B=await(await fetch(rt,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${m}`},body:JSON.stringify({query:T,variables:R})})).json();B.errors?(console.error("Upload failed:",B.errors),Y(!1)):Cr()},Cr=()=>{Lr(c,Z,[Ce.SELECTED_PHOTOS],de);const i=document.getElementById("saveProgressText");i&&(i.innerText=e("Album saved successfully!")),sessionStorage.setItem("album_just_saved","true"),setTimeout(()=>{window.location.href="/my-albums.html"},1e3)},jr=i=>/^[a-zA-Z0-9-]+$/.test(i),It=async i=>{var T,R;P(!0),j("");const u=localStorage.getItem("idToken");if(!u)return;const S=`
      mutation MyMutation($savePublicProfileDisplayNameInput: SavePublicProfileDisplayNameInput) {
        changeMyAccountItem(savePublicProfileDisplayNameInput: $savePublicProfileDisplayNameInput) {
          ... on Profile {
            anyDisplayName
          }
        }
      }
    `,m={savePublicProfileDisplayNameInput:{anyDisplayName:i}};try{const B=await(await fetch(rt,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${u}`},body:JSON.stringify({query:S,variables:m})})).json(),ae=(R=(T=B==null?void 0:B.data)==null?void 0:T.changeMyAccountItem)==null?void 0:R.anyDisplayName;if(ae)kr(ae);else throw new Error("Username taken")}catch{j(e("Username is already taken. Please try a different one.")),E(!0),P(!1)}},kr=i=>{localStorage.setItem("publicUsername",i),y(i),C(!1),Pt()},$r=()=>{const i=Math.floor(1e5+Math.random()*9e5).toString(),u=`${x}${i}`;z(u),It(u)},_r=(i,u)=>{i&&H(i),u!==void 0&&M(u),Se(!1)},Er=()=>F==="noPassword"?e("Album Password Policy"):`${e(F==="notVisible"?"Not Visible":F==="watermark"?"Watermark":"Cannot Be Saved")} ${K?`(${K})`:""}`,Ar=()=>{Se(!0)};return a.jsxs(a.Fragment,{children:[a.jsx(qn,{}),a.jsxs(Yn,{isRTL:r,children:[a.jsxs(Kn,{children:[a.jsxs(Jn,{children:[a.jsx(Qn,{children:a.jsx(Zn,{href:"/my-albums.html",children:e("My Albums")})}),h&&a.jsxs(Xn,{children:[a.jsx(es,{children:h}),a.jsx(Or,{t:e})]})]}),g.totalFiles>0&&a.jsxs(ts,{children:[a.jsx(rs,{children:e("Upload Progress")}),a.jsxs(ns,{children:[a.jsxs(ss,{children:[a.jsxs("span",{children:[e("Overall Progress"),": ",Math.round(g.overallProgress*100),"%"]}),a.jsxs("span",{children:[g.filesComplete," ",e("of")," ",g.totalFiles," ",e("complete")]})]}),a.jsx(os,{children:a.jsx(as,{progress:g.overallProgress})})]}),a.jsxs(is,{children:[g.filesUploading>0&&a.jsxs(Be,{children:[e("Uploading"),": ",g.filesUploading]}),g.filesProcessing>0&&a.jsxs(Be,{children:[e("Processing"),": ",g.filesProcessing]}),g.filesComplete>0&&a.jsxs(Be,{children:[e("Complete"),": ",g.filesComplete]}),g.filesWithError>0&&a.jsxs(Be,{isError:!0,children:[e("Failed"),": ",g.filesWithError]})]})]}),V&&a.jsxs(cs,{children:[a.jsx(ls,{children:e("Saving Album")}),a.jsx(ds,{id:"saveProgressText",children:e("Moving files...")}),a.jsx(us,{children:a.jsx(ps,{id:"saveProgress",style:{width:"5%"}})})]}),a.jsx(Gs,{id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:fe}),o.length>0&&a.jsxs(a.Fragment,{children:[a.jsxs(fs,{children:[o.length," ",o.length>1?e("photos selected"):e("photo selected"),":"]}),a.jsx(hs,{children:o.map((i,u)=>{var S,m;return a.jsxs(gs,{children:[a.jsx(ms,{status:i.status,children:i.status==="complete"?"✓":i.status==="error"?"✕":i.status==="uploading"?"↑":i.status==="processing"?"⚙️":"•"}),a.jsxs(bs,{children:[i.type==="video"||(S=i.type)!=null&&S.startsWith("video")?a.jsx(ys,{src:i.s3PreviewUrl,controls:!0}):a.jsx(xs,{src:i.s3PreviewUrl,alt:i.fileName}),(i.status==="uploading"||i.status==="processing")&&a.jsx(vs,{children:a.jsx(ws,{progress:i.progress,status:i.status})})]}),a.jsxs(Ss,{children:[(m=i.type)!=null&&m.startsWith("video")?e("Video"):e("Image"),i.size&&` • ${(i.size/1024/1024).toFixed(1)} MB`,i.duration&&` • ${i.duration}s`]}),i.status==="error"&&i.errorMessage&&a.jsxs(Ps,{children:[e("Error"),": ",i.errorMessage.length>40?i.errorMessage.substring(0,37)+"...":i.errorMessage]}),a.jsx(Is,{onClick:()=>Ie(u),disabled:V,children:e("Remove")})]},u)})})]}),a.jsxs(Cs,{children:[a.jsx(js,{onClick:yr,disabled:V,children:e(V?"Saving Album...":"Save Album")}),tt&&a.jsxs($s,{children:[a.jsxs(Bt,{children:[a.jsx(Ut,{htmlFor:"folderName",children:e("Album Name (Optional)")}),a.jsx(_s,{id:"folderName",type:"text",value:Ae,onChange:i=>Ne(i.target.value),placeholder:e("Enter album name")})]}),a.jsxs(Bt,{children:[a.jsx(Ut,{htmlFor:"folderDescription",children:e("Album Description (Optional)")}),a.jsx(Es,{id:"folderDescription",value:Re,onChange:i=>De(i.target.value),placeholder:e("Enter album description"),rows:4})]})]}),a.jsx(br,{onClick:()=>{const i=document.getElementById("file-input");i==null||i.click()},disabled:V,children:e("Add More Photos")}),a.jsx(ks,{passwordSet:F!=="noPassword",onClick:Ar,disabled:V,children:Er()})]}),w&&a.jsx(As,{children:a.jsxs(Ns,{isRTL:r,children:[a.jsx(Rs,{children:e("Enter Username")}),a.jsx(Ds,{children:e("Username should contain only letters, numbers and hyphens. Example: john-doe2")}),a.jsx(Ts,{value:x,onChange:i=>z(i.target.value),isRTL:r}),A&&a.jsx(Fs,{children:A}),a.jsx(Os,{disabled:N,onClick:()=>{if(!jr(x)){j(e("Username must contain only letters, numbers, and hyphens."));return}It(x)},children:e("Select Username")}),k&&a.jsx(zs,{disabled:N,onClick:$r,children:e("Add Random Digits to Username")})]})}),le&&a.jsx(Vn,{isOpen:le,onClose:_r,initialOption:F,initialPassword:K})]}),d.length>0&&a.jsxs(Bs,{children:[a.jsx(Us,{children:e("Debug Log")}),a.jsx(Ms,{children:d.map((i,u)=>a.jsx(Ls,{children:i},u))})]})]})]})},Vs=()=>a.jsx(Rr,{children:a.jsx(Ws,{})});Nr.createRoot(document.getElementById("root")).render(a.jsx(Vs,{}));
