import{b as re,r as j,u as qt,j as a,g as Yt,R as Ur,I as Mr,S as ke,G as st}from"./config-D0Da7euU.js";import{a as Lr,g as Et}from"./utils-DnizJ1zw.js";import{u as Gr,s as Wr,L as Hr,p as Vr,c as qr,a as Yr,m as Kr,b as Jr}from"./file-upload-utils-B__S_2ih.js";import"./index-DFUfgcbK.js";var U=function(){return U=Object.assign||function(t){for(var r,n=1,o=arguments.length;n<o;n++){r=arguments[n];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(t[s]=r[s])}return t},U.apply(this,arguments)};function Ae(e,t,r){if(r||arguments.length===2)for(var n=0,o=t.length,s;n<o;n++)(s||!(n in t))&&(s||(s=Array.prototype.slice.call(t,0,n)),s[n]=t[n]);return e.concat(s||Array.prototype.slice.call(t))}var E="-ms-",Ee="-moz-",I="-webkit-",Kt="comm",Ze="rule",vt="decl",Qr="@import",Jt="@keyframes",Zr="@layer",Qt=Math.abs,wt=String.fromCharCode,ut=Object.assign;function Xr(e,t){return O(e,0)^45?(((t<<2^O(e,0))<<2^O(e,1))<<2^O(e,2))<<2^O(e,3):0}function Zt(e){return e.trim()}function te(e,t){return(e=t.exec(e))?e[0]:e}function b(e,t,r){return e.replace(t,r)}function Ge(e,t,r){return e.indexOf(t,r)}function O(e,t){return e.charCodeAt(t)|0}function me(e,t,r){return e.slice(t,r)}function Q(e){return e.length}function Xt(e){return e.length}function _e(e,t){return t.push(e),e}function en(e,t){return e.map(t).join("")}function At(e,t){return e.filter(function(r){return!te(r,t)})}var Xe=1,xe=1,er=0,W=0,N=0,we="";function et(e,t,r,n,o,s,c,p){return{value:e,root:t,parent:r,type:n,props:o,children:s,line:Xe,column:xe,length:c,return:"",siblings:p}}function oe(e,t){return ut(et("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function he(e){for(;e.root;)e=oe(e.root,{children:[e]});_e(e,e.siblings)}function tn(){return N}function rn(){return N=W>0?O(we,--W):0,xe--,N===10&&(xe=1,Xe--),N}function q(){return N=W<er?O(we,W++):0,xe++,N===10&&(xe=1,Xe++),N}function le(){return O(we,W)}function We(){return W}function tt(e,t){return me(we,e,t)}function pt(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function nn(e){return Xe=xe=1,er=Q(we=e),W=0,[]}function on(e){return we="",e}function at(e){return Zt(tt(W-1,ft(e===91?e+2:e===40?e+1:e)))}function sn(e){for(;(N=le())&&N<33;)q();return pt(e)>2||pt(N)>3?"":" "}function an(e,t){for(;--t&&q()&&!(N<48||N>102||N>57&&N<65||N>70&&N<97););return tt(e,We()+(t<6&&le()==32&&q()==32))}function ft(e){for(;q();)switch(N){case e:return W;case 34:case 39:e!==34&&e!==39&&ft(N);break;case 40:e===41&&ft(e);break;case 92:q();break}return W}function cn(e,t){for(;q()&&e+N!==57;)if(e+N===84&&le()===47)break;return"/*"+tt(t,W-1)+"*"+wt(e===47?e:q())}function dn(e){for(;!pt(le());)q();return tt(e,W)}function ln(e){return on(He("",null,null,null,[""],e=nn(e),0,[0],e))}function He(e,t,r,n,o,s,c,p,f){for(var h=0,x=0,l=c,y=0,v=0,w=0,C=1,z=1,$=1,k=0,_="",A=o,T=s,P=n,g=_;z;)switch(w=k,k=q()){case 40:if(w!=108&&O(g,l-1)==58){Ge(g+=b(at(k),"&","&\f"),"&\f",Qt(h?p[h-1]:0))!=-1&&($=-1);break}case 34:case 39:case 91:g+=at(k);break;case 9:case 10:case 13:case 32:g+=sn(w);break;case 92:g+=an(We()-1,7);continue;case 47:switch(le()){case 42:case 47:_e(un(cn(q(),We()),t,r,f),f);break;default:g+="/"}break;case 123*C:p[h++]=Q(g)*$;case 125*C:case 59:case 0:switch(k){case 0:case 125:z=0;case 59+x:$==-1&&(g=b(g,/\f/g,"")),v>0&&Q(g)-l&&_e(v>32?Rt(g+";",n,r,l-1,f):Rt(b(g," ","")+";",n,r,l-2,f),f);break;case 59:g+=";";default:if(_e(P=$t(g,t,r,h,x,o,p,_,A=[],T=[],l,s),s),k===123)if(x===0)He(g,t,P,P,A,s,l,p,T);else switch(y===99&&O(g,3)===110?100:y){case 100:case 108:case 109:case 115:He(e,P,P,n&&_e($t(e,P,P,0,0,o,p,_,o,A=[],l,T),T),o,T,l,p,n?A:T);break;default:He(g,P,P,P,[""],T,0,p,T)}}h=x=v=0,C=$=1,_=g="",l=c;break;case 58:l=1+Q(g),v=w;default:if(C<1){if(k==123)--C;else if(k==125&&C++==0&&rn()==125)continue}switch(g+=wt(k),k*C){case 38:$=x>0?1:(g+="\f",-1);break;case 44:p[h++]=(Q(g)-1)*$,$=1;break;case 64:le()===45&&(g+=at(q())),y=le(),x=l=Q(_=g+=dn(We())),k++;break;case 45:w===45&&Q(g)==2&&(C=0)}}return s}function $t(e,t,r,n,o,s,c,p,f,h,x,l){for(var y=o-1,v=o===0?s:[""],w=Xt(v),C=0,z=0,$=0;C<n;++C)for(var k=0,_=me(e,y+1,y=Qt(z=c[C])),A=e;k<w;++k)(A=Zt(z>0?v[k]+" "+_:b(_,/&\f/g,v[k])))&&(f[$++]=A);return et(e,t,r,o===0?Ze:p,f,h,x,l)}function un(e,t,r,n){return et(e,t,r,Kt,wt(tn()),me(e,2,-2),0,n)}function Rt(e,t,r,n,o){return et(e,t,r,vt,me(e,0,n),me(e,n+1,-1),n,o)}function tr(e,t,r){switch(Xr(e,t)){case 5103:return I+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return I+e+e;case 4789:return Ee+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return I+e+Ee+e+E+e+e;case 5936:switch(O(e,t+11)){case 114:return I+e+E+b(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return I+e+E+b(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return I+e+E+b(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return I+e+E+e+e;case 6165:return I+e+E+"flex-"+e+e;case 5187:return I+e+b(e,/(\w+).+(:[^]+)/,I+"box-$1$2"+E+"flex-$1$2")+e;case 5443:return I+e+E+"flex-item-"+b(e,/flex-|-self/g,"")+(te(e,/flex-|baseline/)?"":E+"grid-row-"+b(e,/flex-|-self/g,""))+e;case 4675:return I+e+E+"flex-line-pack"+b(e,/align-content|flex-|-self/g,"")+e;case 5548:return I+e+E+b(e,"shrink","negative")+e;case 5292:return I+e+E+b(e,"basis","preferred-size")+e;case 6060:return I+"box-"+b(e,"-grow","")+I+e+E+b(e,"grow","positive")+e;case 4554:return I+b(e,/([^-])(transform)/g,"$1"+I+"$2")+e;case 6187:return b(b(b(e,/(zoom-|grab)/,I+"$1"),/(image-set)/,I+"$1"),e,"")+e;case 5495:case 3959:return b(e,/(image-set\([^]*)/,I+"$1$`$1");case 4968:return b(b(e,/(.+:)(flex-)?(.*)/,I+"box-pack:$3"+E+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+I+e+e;case 4200:if(!te(e,/flex-|baseline/))return E+"grid-column-align"+me(e,t)+e;break;case 2592:case 3360:return E+b(e,"template-","")+e;case 4384:case 3616:return r&&r.some(function(n,o){return t=o,te(n.props,/grid-\w+-end/)})?~Ge(e+(r=r[t].value),"span",0)?e:E+b(e,"-start","")+e+E+"grid-row-span:"+(~Ge(r,"span",0)?te(r,/\d+/):+te(r,/\d+/)-+te(e,/\d+/))+";":E+b(e,"-start","")+e;case 4896:case 4128:return r&&r.some(function(n){return te(n.props,/grid-\w+-start/)})?e:E+b(b(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return b(e,/(.+)-inline(.+)/,I+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(Q(e)-1-t>6)switch(O(e,t+1)){case 109:if(O(e,t+4)!==45)break;case 102:return b(e,/(.+:)(.+)-([^]+)/,"$1"+I+"$2-$3$1"+Ee+(O(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~Ge(e,"stretch",0)?tr(b(e,"stretch","fill-available"),t,r)+e:e}break;case 5152:case 5920:return b(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(n,o,s,c,p,f,h){return E+o+":"+s+h+(c?E+o+"-span:"+(p?f:+f-+s)+h:"")+e});case 4949:if(O(e,t+6)===121)return b(e,":",":"+I)+e;break;case 6444:switch(O(e,O(e,14)===45?18:11)){case 120:return b(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+I+(O(e,14)===45?"inline-":"")+"box$3$1"+I+"$2$3$1"+E+"$2box$3")+e;case 100:return b(e,":",":"+E)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return b(e,"scroll-","scroll-snap-")+e}return e}function Ye(e,t){for(var r="",n=0;n<e.length;n++)r+=t(e[n],n,e,t)||"";return r}function pn(e,t,r,n){switch(e.type){case Zr:if(e.children.length)break;case Qr:case vt:return e.return=e.return||e.value;case Kt:return"";case Jt:return e.return=e.value+"{"+Ye(e.children,n)+"}";case Ze:if(!Q(e.value=e.props.join(",")))return""}return Q(r=Ye(e.children,n))?e.return=e.value+"{"+r+"}":""}function fn(e){var t=Xt(e);return function(r,n,o,s){for(var c="",p=0;p<t;p++)c+=e[p](r,n,o,s)||"";return c}}function hn(e){return function(t){t.root||(t=t.return)&&e(t)}}function gn(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case vt:e.return=tr(e.value,e.length,r);return;case Jt:return Ye([oe(e,{value:b(e.value,"@","@"+I)})],n);case Ze:if(e.length)return en(r=e.props,function(o){switch(te(o,n=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":he(oe(e,{props:[b(o,/:(read-\w+)/,":"+Ee+"$1")]})),he(oe(e,{props:[o]})),ut(e,{props:At(r,n)});break;case"::placeholder":he(oe(e,{props:[b(o,/:(plac\w+)/,":"+I+"input-$1")]})),he(oe(e,{props:[b(o,/:(plac\w+)/,":"+Ee+"$1")]})),he(oe(e,{props:[b(o,/:(plac\w+)/,E+"input-$1")]})),he(oe(e,{props:[o]})),ut(e,{props:At(r,n)});break}return""})}}var mn={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},G={},be=typeof process<"u"&&G!==void 0&&(G.REACT_APP_SC_ATTR||G.SC_ATTR)||"data-styled",rr="active",nr="data-styled-version",rt="6.1.17",St=`/*!sc*/
`,Ke=typeof window<"u"&&"HTMLElement"in window,xn=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&G!==void 0&&G.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&G.REACT_APP_SC_DISABLE_SPEEDY!==""?G.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&G.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&G!==void 0&&G.SC_DISABLE_SPEEDY!==void 0&&G.SC_DISABLE_SPEEDY!==""&&G.SC_DISABLE_SPEEDY!=="false"&&G.SC_DISABLE_SPEEDY),bn={},nt=Object.freeze([]),ye=Object.freeze({});function or(e,t,r){return r===void 0&&(r=ye),e.theme!==r.theme&&e.theme||t||r.theme}var sr=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),yn=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,vn=/(^-|-$)/g;function Tt(e){return e.replace(yn,"-").replace(vn,"")}var wn=/(a)(d)/gi,Oe=52,Dt=function(e){return String.fromCharCode(e+(e>25?39:97))};function ht(e){var t,r="";for(t=Math.abs(e);t>Oe;t=t/Oe|0)r=Dt(t%Oe)+r;return(Dt(t%Oe)+r).replace(wn,"$1-$2")}var it,ar=5381,ge=function(e,t){for(var r=t.length;r;)e=33*e^t.charCodeAt(--r);return e},ir=function(e){return ge(ar,e)};function cr(e){return ht(ir(e)>>>0)}function Sn(e){return e.displayName||e.name||"Component"}function ct(e){return typeof e=="string"&&!0}var dr=typeof Symbol=="function"&&Symbol.for,lr=dr?Symbol.for("react.memo"):60115,Pn=dr?Symbol.for("react.forward_ref"):60112,In={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},jn={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},ur={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},Cn=((it={})[Pn]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},it[lr]=ur,it);function Nt(e){return("type"in(t=e)&&t.type.$$typeof)===lr?ur:"$$typeof"in e?Cn[e.$$typeof]:In;var t}var kn=Object.defineProperty,_n=Object.getOwnPropertyNames,Ft=Object.getOwnPropertySymbols,En=Object.getOwnPropertyDescriptor,An=Object.getPrototypeOf,Ot=Object.prototype;function pr(e,t,r){if(typeof t!="string"){if(Ot){var n=An(t);n&&n!==Ot&&pr(e,n,r)}var o=_n(t);Ft&&(o=o.concat(Ft(t)));for(var s=Nt(e),c=Nt(t),p=0;p<o.length;++p){var f=o[p];if(!(f in jn||r&&r[f]||c&&f in c||s&&f in s)){var h=En(t,f);try{kn(e,f,h)}catch{}}}}return e}function ve(e){return typeof e=="function"}function Pt(e){return typeof e=="object"&&"styledComponentId"in e}function de(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function gt(e,t){if(e.length===0)return"";for(var r=e[0],n=1;n<e.length;n++)r+=e[n];return r}function $e(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function mt(e,t,r){if(r===void 0&&(r=!1),!r&&!$e(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var n=0;n<t.length;n++)e[n]=mt(e[n],t[n]);else if($e(t))for(var n in t)e[n]=mt(e[n],t[n]);return e}function It(e,t){Object.defineProperty(e,"toString",{value:t})}function Re(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var $n=function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}return e.prototype.indexOfGroup=function(t){for(var r=0,n=0;n<t;n++)r+=this.groupSizes[n];return r},e.prototype.insertRules=function(t,r){if(t>=this.groupSizes.length){for(var n=this.groupSizes,o=n.length,s=o;t>=s;)if((s<<=1)<0)throw Re(16,"".concat(t));this.groupSizes=new Uint32Array(s),this.groupSizes.set(n),this.length=s;for(var c=o;c<s;c++)this.groupSizes[c]=0}for(var p=this.indexOfGroup(t+1),f=(c=0,r.length);c<f;c++)this.tag.insertRule(p,r[c])&&(this.groupSizes[t]++,p++)},e.prototype.clearGroup=function(t){if(t<this.length){var r=this.groupSizes[t],n=this.indexOfGroup(t),o=n+r;this.groupSizes[t]=0;for(var s=n;s<o;s++)this.tag.deleteRule(n)}},e.prototype.getGroup=function(t){var r="";if(t>=this.length||this.groupSizes[t]===0)return r;for(var n=this.groupSizes[t],o=this.indexOfGroup(t),s=o+n,c=o;c<s;c++)r+="".concat(this.tag.getRule(c)).concat(St);return r},e}(),Ve=new Map,Je=new Map,qe=1,ze=function(e){if(Ve.has(e))return Ve.get(e);for(;Je.has(qe);)qe++;var t=qe++;return Ve.set(e,t),Je.set(t,e),t},Rn=function(e,t){qe=t+1,Ve.set(e,t),Je.set(t,e)},Tn="style[".concat(be,"][").concat(nr,'="').concat(rt,'"]'),Dn=new RegExp("^".concat(be,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),Nn=function(e,t,r){for(var n,o=r.split(","),s=0,c=o.length;s<c;s++)(n=o[s])&&e.registerName(t,n)},Fn=function(e,t){for(var r,n=((r=t.textContent)!==null&&r!==void 0?r:"").split(St),o=[],s=0,c=n.length;s<c;s++){var p=n[s].trim();if(p){var f=p.match(Dn);if(f){var h=0|parseInt(f[1],10),x=f[2];h!==0&&(Rn(x,h),Nn(e,x,f[3]),e.getTag().insertRules(h,o)),o.length=0}else o.push(p)}}},zt=function(e){for(var t=document.querySelectorAll(Tn),r=0,n=t.length;r<n;r++){var o=t[r];o&&o.getAttribute(be)!==rr&&(Fn(e,o),o.parentNode&&o.parentNode.removeChild(o))}};function On(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var fr=function(e){var t=document.head,r=e||t,n=document.createElement("style"),o=function(p){var f=Array.from(p.querySelectorAll("style[".concat(be,"]")));return f[f.length-1]}(r),s=o!==void 0?o.nextSibling:null;n.setAttribute(be,rr),n.setAttribute(nr,rt);var c=On();return c&&n.setAttribute("nonce",c),r.insertBefore(n,s),n},zn=function(){function e(t){this.element=fr(t),this.element.appendChild(document.createTextNode("")),this.sheet=function(r){if(r.sheet)return r.sheet;for(var n=document.styleSheets,o=0,s=n.length;o<s;o++){var c=n[o];if(c.ownerNode===r)return c}throw Re(17)}(this.element),this.length=0}return e.prototype.insertRule=function(t,r){try{return this.sheet.insertRule(r,t),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.prototype.getRule=function(t){var r=this.sheet.cssRules[t];return r&&r.cssText?r.cssText:""},e}(),Bn=function(){function e(t){this.element=fr(t),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(t,r){if(t<=this.length&&t>=0){var n=document.createTextNode(r);return this.element.insertBefore(n,this.nodes[t]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.prototype.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e}(),Un=function(){function e(t){this.rules=[],this.length=0}return e.prototype.insertRule=function(t,r){return t<=this.length&&(this.rules.splice(t,0,r),this.length++,!0)},e.prototype.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.prototype.getRule=function(t){return t<this.length?this.rules[t]:""},e}(),Bt=Ke,Mn={isServer:!Ke,useCSSOMInjection:!xn},Qe=function(){function e(t,r,n){t===void 0&&(t=ye),r===void 0&&(r={});var o=this;this.options=U(U({},Mn),t),this.gs=r,this.names=new Map(n),this.server=!!t.isServer,!this.server&&Ke&&Bt&&(Bt=!1,zt(this)),It(this,function(){return function(s){for(var c=s.getTag(),p=c.length,f="",h=function(l){var y=function($){return Je.get($)}(l);if(y===void 0)return"continue";var v=s.names.get(y),w=c.getGroup(l);if(v===void 0||!v.size||w.length===0)return"continue";var C="".concat(be,".g").concat(l,'[id="').concat(y,'"]'),z="";v!==void 0&&v.forEach(function($){$.length>0&&(z+="".concat($,","))}),f+="".concat(w).concat(C,'{content:"').concat(z,'"}').concat(St)},x=0;x<p;x++)h(x);return f}(o)})}return e.registerId=function(t){return ze(t)},e.prototype.rehydrate=function(){!this.server&&Ke&&zt(this)},e.prototype.reconstructWithOptions=function(t,r){return r===void 0&&(r=!0),new e(U(U({},this.options),t),this.gs,r&&this.names||void 0)},e.prototype.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(t=function(r){var n=r.useCSSOMInjection,o=r.target;return r.isServer?new Un(o):n?new zn(o):new Bn(o)}(this.options),new $n(t)));var t},e.prototype.hasNameForId=function(t,r){return this.names.has(t)&&this.names.get(t).has(r)},e.prototype.registerName=function(t,r){if(ze(t),this.names.has(t))this.names.get(t).add(r);else{var n=new Set;n.add(r),this.names.set(t,n)}},e.prototype.insertRules=function(t,r,n){this.registerName(t,r),this.getTag().insertRules(ze(t),n)},e.prototype.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.prototype.clearRules=function(t){this.getTag().clearGroup(ze(t)),this.clearNames(t)},e.prototype.clearTag=function(){this.tag=void 0},e}(),Ln=/&/g,Gn=/^\s*\/\/.*$/gm;function hr(e,t){return e.map(function(r){return r.type==="rule"&&(r.value="".concat(t," ").concat(r.value),r.value=r.value.replaceAll(",",",".concat(t," ")),r.props=r.props.map(function(n){return"".concat(t," ").concat(n)})),Array.isArray(r.children)&&r.type!=="@keyframes"&&(r.children=hr(r.children,t)),r})}function Wn(e){var t,r,n,o=ye,s=o.options,c=s===void 0?ye:s,p=o.plugins,f=p===void 0?nt:p,h=function(y,v,w){return w.startsWith(r)&&w.endsWith(r)&&w.replaceAll(r,"").length>0?".".concat(t):y},x=f.slice();x.push(function(y){y.type===Ze&&y.value.includes("&")&&(y.props[0]=y.props[0].replace(Ln,r).replace(n,h))}),c.prefix&&x.push(gn),x.push(pn);var l=function(y,v,w,C){v===void 0&&(v=""),w===void 0&&(w=""),C===void 0&&(C="&"),t=C,r=v,n=new RegExp("\\".concat(r,"\\b"),"g");var z=y.replace(Gn,""),$=ln(w||v?"".concat(w," ").concat(v," { ").concat(z," }"):z);c.namespace&&($=hr($,c.namespace));var k=[];return Ye($,fn(x.concat(hn(function(_){return k.push(_)})))),k};return l.hash=f.length?f.reduce(function(y,v){return v.name||Re(15),ge(y,v.name)},ar).toString():"",l}var Hn=new Qe,xt=Wn(),gr=re.createContext({shouldForwardProp:void 0,styleSheet:Hn,stylis:xt});gr.Consumer;re.createContext(void 0);function bt(){return j.useContext(gr)}var Vn=function(){function e(t,r){var n=this;this.inject=function(o,s){s===void 0&&(s=xt);var c=n.name+s.hash;o.hasNameForId(n.id,c)||o.insertRules(n.id,c,s(n.rules,c,"@keyframes"))},this.name=t,this.id="sc-keyframes-".concat(t),this.rules=r,It(this,function(){throw Re(12,String(n.name))})}return e.prototype.getName=function(t){return t===void 0&&(t=xt),this.name+t.hash},e}(),qn=function(e){return e>="A"&&e<="Z"};function Ut(e){for(var t="",r=0;r<e.length;r++){var n=e[r];if(r===1&&n==="-"&&e[0]==="-")return e;qn(n)?t+="-"+n.toLowerCase():t+=n}return t.startsWith("ms-")?"-"+t:t}var mr=function(e){return e==null||e===!1||e===""},xr=function(e){var t,r,n=[];for(var o in e){var s=e[o];e.hasOwnProperty(o)&&!mr(s)&&(Array.isArray(s)&&s.isCss||ve(s)?n.push("".concat(Ut(o),":"),s,";"):$e(s)?n.push.apply(n,Ae(Ae(["".concat(o," {")],xr(s),!1),["}"],!1)):n.push("".concat(Ut(o),": ").concat((t=o,(r=s)==null||typeof r=="boolean"||r===""?"":typeof r!="number"||r===0||t in mn||t.startsWith("--")?String(r).trim():"".concat(r,"px")),";")))}return n};function se(e,t,r,n){if(mr(e))return[];if(Pt(e))return[".".concat(e.styledComponentId)];if(ve(e)){if(!ve(s=e)||s.prototype&&s.prototype.isReactComponent||!t)return[e];var o=e(t);return se(o,t,r,n)}var s;return e instanceof Vn?r?(e.inject(r,n),[e.getName(n)]):[e]:$e(e)?xr(e):Array.isArray(e)?Array.prototype.concat.apply(nt,e.map(function(c){return se(c,t,r,n)})):[e.toString()]}function br(e){for(var t=0;t<e.length;t+=1){var r=e[t];if(ve(r)&&!Pt(r))return!1}return!0}var Yn=ir(rt),Kn=function(){function e(t,r,n){this.rules=t,this.staticRulesId="",this.isStatic=(n===void 0||n.isStatic)&&br(t),this.componentId=r,this.baseHash=ge(Yn,r),this.baseStyle=n,Qe.registerId(r)}return e.prototype.generateAndInjectStyles=function(t,r,n){var o=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,r,n):"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&r.hasNameForId(this.componentId,this.staticRulesId))o=de(o,this.staticRulesId);else{var s=gt(se(this.rules,t,r,n)),c=ht(ge(this.baseHash,s)>>>0);if(!r.hasNameForId(this.componentId,c)){var p=n(s,".".concat(c),void 0,this.componentId);r.insertRules(this.componentId,c,p)}o=de(o,c),this.staticRulesId=c}else{for(var f=ge(this.baseHash,n.hash),h="",x=0;x<this.rules.length;x++){var l=this.rules[x];if(typeof l=="string")h+=l;else if(l){var y=gt(se(l,t,r,n));f=ge(f,y+x),h+=y}}if(h){var v=ht(f>>>0);r.hasNameForId(this.componentId,v)||r.insertRules(this.componentId,v,n(h,".".concat(v),void 0,this.componentId)),o=de(o,v)}}return o},e}(),jt=re.createContext(void 0);jt.Consumer;var dt={};function Jn(e,t,r){var n=Pt(e),o=e,s=!ct(e),c=t.attrs,p=c===void 0?nt:c,f=t.componentId,h=f===void 0?function(A,T){var P=typeof A!="string"?"sc":Tt(A);dt[P]=(dt[P]||0)+1;var g="".concat(P,"-").concat(cr(rt+P+dt[P]));return T?"".concat(T,"-").concat(g):g}(t.displayName,t.parentComponentId):f,x=t.displayName,l=x===void 0?function(A){return ct(A)?"styled.".concat(A):"Styled(".concat(Sn(A),")")}(e):x,y=t.displayName&&t.componentId?"".concat(Tt(t.displayName),"-").concat(t.componentId):t.componentId||h,v=n&&o.attrs?o.attrs.concat(p).filter(Boolean):p,w=t.shouldForwardProp;if(n&&o.shouldForwardProp){var C=o.shouldForwardProp;if(t.shouldForwardProp){var z=t.shouldForwardProp;w=function(A,T){return C(A,T)&&z(A,T)}}else w=C}var $=new Kn(r,y,n?o.componentStyle:void 0);function k(A,T){return function(P,g,Z){var H=P.attrs,Y=P.componentStyle,Te=P.defaultProps,De=P.foldedComponentIds,Ne=P.styledComponentId,Fe=P.target,ot=re.useContext(jt),Se=bt(),ue=P.shouldForwardProp||Se.shouldForwardProp,Pe=or(g,ot,Te)||ye,F=function(ne,ae,pe){for(var ie,ee=U(U({},ae),{className:void 0,theme:pe}),je=0;je<ne.length;je+=1){var fe=ve(ie=ne[je])?ie(ee):ie;for(var J in fe)ee[J]=J==="className"?de(ee[J],fe[J]):J==="style"?U(U({},ee[J]),fe[J]):fe[J]}return ae.className&&(ee.className=de(ee.className,ae.className)),ee}(H,g,Pe),V=F.as||Fe,K={};for(var L in F)F[L]===void 0||L[0]==="$"||L==="as"||L==="theme"&&F.theme===Pe||(L==="forwardedAs"?K.as=F.forwardedAs:ue&&!ue(L,V)||(K[L]=F[L]));var Ie=function(ne,ae){var pe=bt(),ie=ne.generateAndInjectStyles(ae,pe.styleSheet,pe.stylis);return ie}(Y,F),X=de(De,Ne);return Ie&&(X+=" "+Ie),F.className&&(X+=" "+F.className),K[ct(V)&&!sr.has(V)?"class":"className"]=X,Z&&(K.ref=Z),j.createElement(V,K)}(_,A,T)}k.displayName=l;var _=re.forwardRef(k);return _.attrs=v,_.componentStyle=$,_.displayName=l,_.shouldForwardProp=w,_.foldedComponentIds=n?de(o.foldedComponentIds,o.styledComponentId):"",_.styledComponentId=y,_.target=n?o.target:e,Object.defineProperty(_,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(A){this._foldedDefaultProps=n?function(T){for(var P=[],g=1;g<arguments.length;g++)P[g-1]=arguments[g];for(var Z=0,H=P;Z<H.length;Z++)mt(T,H[Z],!0);return T}({},o.defaultProps,A):A}}),It(_,function(){return".".concat(_.styledComponentId)}),s&&pr(_,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),_}function Mt(e,t){for(var r=[e[0]],n=0,o=t.length;n<o;n+=1)r.push(t[n],e[n+1]);return r}var Lt=function(e){return Object.assign(e,{isCss:!0})};function Ct(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(ve(e)||$e(e))return Lt(se(Mt(nt,Ae([e],t,!0))));var n=e;return t.length===0&&n.length===1&&typeof n[0]=="string"?se(n):Lt(se(Mt(n,t)))}function yt(e,t,r){if(r===void 0&&(r=ye),!t)throw Re(1,t);var n=function(o){for(var s=[],c=1;c<arguments.length;c++)s[c-1]=arguments[c];return e(t,r,Ct.apply(void 0,Ae([o],s,!1)))};return n.attrs=function(o){return yt(e,t,U(U({},r),{attrs:Array.prototype.concat(r.attrs,o).filter(Boolean)}))},n.withConfig=function(o){return yt(e,t,U(U({},r),o))},n}var yr=function(e){return yt(Jn,e)},d=yr;sr.forEach(function(e){d[e]=yr(e)});var Qn=function(){function e(t,r){this.rules=t,this.componentId=r,this.isStatic=br(t),Qe.registerId(this.componentId+1)}return e.prototype.createStyles=function(t,r,n,o){var s=o(gt(se(this.rules,r,n,o)),""),c=this.componentId+t;n.insertRules(c,c,s)},e.prototype.removeStyles=function(t,r){r.clearRules(this.componentId+t)},e.prototype.renderStyles=function(t,r,n,o){t>2&&Qe.registerId(this.componentId+t),this.removeStyles(t,n),this.createStyles(t,r,n,o)},e}();function Zn(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var n=Ct.apply(void 0,Ae([e],t,!1)),o="sc-global-".concat(cr(JSON.stringify(n))),s=new Qn(n,o),c=function(f){var h=bt(),x=re.useContext(jt),l=re.useRef(h.styleSheet.allocateGSInstance(o)).current;return h.styleSheet.server&&p(l,f,h.styleSheet,x,h.stylis),re.useLayoutEffect(function(){if(!h.styleSheet.server)return p(l,f,h.styleSheet,x,h.stylis),function(){return s.removeStyles(l,h.styleSheet)}},[l,f,h.styleSheet,x,h.stylis]),null};function p(f,h,x,l,y){if(s.isStatic)s.renderStyles(f,bn,x,y);else{var v=U(U({},h),{theme:or(h,l,c.defaultProps)});s.renderStyles(f,v,x,y)}}return re.memo(c)}const Xn=Zn`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }
`,vr=e=>Ct`
  direction: ${e?"rtl":"ltr"};
`,eo=d.div`
  padding: 40px 20px;
  background-color: #f9fafb;
  min-height: 100vh;
  ${e=>vr(e.isRTL)}
`,to=d.div`
  max-width: 900px;
  margin: 0 auto;
`,ro=d.div`
  margin-bottom: 20px;
`,no=d.div`
  margin-bottom: 12px;
`,oo=d.a`
  font-size: 16px;
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
`,so=d.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,ao=d.div`
  font-size: 16px;
  color: #666;
`,io=d.div`
  margin-bottom: 24px;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,co=d.h3`
  font-size: 18px;
  margin: 0 0 12px 0;
`,lo=d.div`
  margin-bottom: 12px;
`,uo=d.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 6px;
`,po=d.div`
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`,fo=d.div`
  height: 100%;
  background-color: #4caf50;
  border-radius: 4px;
  transition: width 0.3s ease;
  width: ${e=>e.progress*100}%;
`,ho=d.div`
  display: flex;
  gap: 12px;
  font-size: 14px;
  color: #666;
`,Be=d.div`
  color: ${e=>e.isError?"#e53935":"inherit"};
`,go=d.div`
  margin-bottom: 24px;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,mo=d.h3`
  font-size: 18px;
  margin: 0 0 12px 0;
`,xo=d.div`
  font-size: 14px;
  margin-bottom: 8px;
`,bo=d.div`
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`,yo=d.div`
  height: 100%;
  background-color: #2196f3;
  border-radius: 4px;
  transition: width 0.3s ease;
`,vo=d.p`
  font-size: 16px;
  margin-bottom: 16px;
  color: #333;
`,wo=d.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 32px;
`,So=d.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.03);
  width: 160px;
  position: relative;
`,Po=d.div`
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
`,Io=d.div`
  position: relative;
  margin-bottom: 8px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`,jo=d.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 6px;
`,Co=d.video`
  max-width: 100%;
  max-height: 100%;
  border-radius: 6px;
`,ko=d.div`
  position: absolute;
  bottom: 4px;
  left: 4px;
  right: 4px;
  height: 4px;
  background-color: rgba(0,0,0,0.2);
  border-radius: 2px;
  overflow: hidden;
`,_o=d.div`
  height: 100%;
  background-color: ${e=>e.status==="processing"?"#ff9800":"#2196f3"};
  transition: width 0.3s ease;
  width: ${e=>e.progress*100}%;
`,Eo=d.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 6px;
`,Ao=d.div`
  font-size: 12px;
  color: #e53935;
  margin-bottom: 6px;
`,$o=d.button`
  background-color: #e53935;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 8px;
  font-size: 12px;
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  margin-top: auto;
  opacity: ${e=>e.disabled?.6:1};
`,Ro=d.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`,wr=d.button`
  padding: 14px 28px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  opacity: ${e=>e.disabled?.6:1};
`,To=d(wr)`
  background-color: #007bff;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
`,Sr=d(wr)`
  background-color: #8c8c8c;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
`,Do=d(Sr)`
  color: ${e=>e.passwordSet?"#000000":"white"};
  font-weight: ${e=>e.passwordSet?"bold":"normal"};
`,No=d.div`
  margin-top: 12px;
  margin-bottom: 12px;
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,Gt=d.div`
  margin-bottom: 16px;
`,Wt=d.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
`,Fo=d.input`
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-sizing: border-box;
`,Oo=d.textarea`
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  resize: vertical;
`,zo=d.div`
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
`,Bo=d.div`
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  ${e=>vr(e.isRTL)}
`,Uo=d.p`
  font-size: 16px;
  margin-bottom: 12px;
`,Mo=d.p`
  font-size: 14px;
  margin-bottom: 16px;
  color: #666;
`,Lo=d.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
  text-align: ${e=>e.isRTL?"right":"left"};
`,Go=d.div`
  color: #e53935;
  margin-bottom: 12px;
`,Wo=d.button`
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
`,Ho=d.button`
  width: 100%;
  padding: 12px;
  background-color: #6c757d;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  opacity: ${e=>e.disabled?.6:1};
`,Vo=d.div`
  margin-top: 24px;
  padding: 16px;
  background-color: #f0f0f0;
  border-radius: 8px;
`,qo=d.h3`
  margin: 0 0 12px 0;
  font-size: 16px;
`,Yo=d.pre`
  margin: 0;
  font-size: 12px;
  white-space: pre-wrap;
  max-height: 200px;
  overflow-y: auto;
`,Ko=d.div`
  margin-bottom: 4px;
`,Jo=d.input`
  display: none;
`,Qo=d.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`,Zo=d.div`
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`,Xo=d.div`
  font-size: 18px;
  font-weight: 500;
  color: white;
  background-color: #888;
  padding: 15px 20px;
  text-align: center;
`,es=d.div`
  direction: ${e=>e.isRTL?"rtl":"ltr"};
  padding: 30px;
`,Ht=d.p`
  margin-bottom: 15px;
  font-size: 16px;
`,ts=d.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 25px;
  margin-top: 20px;
  box-sizing: border-box;
`,rs=d.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
`,Ue=d.div`
  display: flex;
  align-items: center;
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  opacity: ${e=>e.disabled?.7:1};
`,Me=d.input`
  margin-right: 10px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  
  &:disabled {
    cursor: not-allowed;
  }
`,Le=d.label`
  display: flex;
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  font-size: 16px;
`,lt=d.span`
  color: #aaa;
  margin-left: 8px;
`,ns=d.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`,Vt=d.button`
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
`,os=({isOpen:e,onClose:t,initialOption:r="noPassword",initialPassword:n=""})=>{const{t:o,language:s}=qt(),c=Yt(s)==="rtl",[p,f]=j.useState(r),[h,x]=j.useState(n);if(j.useEffect(()=>{e&&(f(r),x(n))},[e,r,n]),!e)return null;const l=h.trim()==="",y=w=>{w!=="noPassword"&&l||f(w)},v=w=>{w.target===w.currentTarget&&t()};return a.jsx(Qo,{onClick:v,children:a.jsxs(Zo,{children:[a.jsx(Xo,{children:o("Album Password Policy")}),a.jsxs(es,{isRTL:c,children:[a.jsx(Ht,{children:o("Enter a password for this album.")}),a.jsx(Ht,{children:o("Select what can be done with photos and videos without a password.")}),a.jsx(ts,{type:"text",placeholder:o("Enter password"),value:h,onChange:w=>x(w.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"}),a.jsxs(rs,{children:[a.jsxs(Ue,{disabled:l,children:[a.jsx(Me,{type:"radio",name:"protection",id:"notVisible",checked:p==="notVisible",onChange:()=>{},disabled:l,onClick:()=>!l&&y("notVisible")}),a.jsxs(Le,{htmlFor:"notVisible",disabled:l,children:[o("Not Visible"),l&&a.jsx(lt,{children:o("Password required")})]})]}),a.jsxs(Ue,{disabled:l,children:[a.jsx(Me,{type:"radio",name:"protection",id:"watermark",checked:p==="watermark",onChange:()=>{},disabled:l,onClick:()=>!l&&y("watermark")}),a.jsxs(Le,{htmlFor:"watermark",disabled:l,children:[o("Watermark"),l&&a.jsx(lt,{children:o("Password required")})]})]}),a.jsxs(Ue,{disabled:l,children:[a.jsx(Me,{type:"radio",name:"protection",id:"cannotBeSaved",checked:p==="cannotBeSaved",onChange:()=>{},disabled:l,onClick:()=>!l&&y("cannotBeSaved")}),a.jsxs(Le,{htmlFor:"cannotBeSaved",disabled:l,children:[o("Cannot Be Saved"),l&&a.jsx(lt,{children:o("Password required")})]})]}),a.jsxs(Ue,{disabled:!1,children:[a.jsx(Me,{type:"radio",name:"protection",id:"noPassword",checked:p==="noPassword",onChange:()=>{},onClick:()=>y("noPassword")}),a.jsx(Le,{htmlFor:"noPassword",disabled:!1,children:o("No Password")})]})]}),a.jsxs(ns,{children:[a.jsx(Vt,{onClick:()=>t(),children:o("Cancel")}),a.jsx(Vt,{onClick:()=>{console.log(`Saving with option: ${p}, password: ${h.length>0?"********":"none"}`),t(p,h)},children:o("Save")})]})]})]})})};var Pr=(e=>(e.NotVisible="NotVisible",e.Watermark="Watermark",e.CannotBeSaved="CannotBeSaved",e.NoPassword="NoPassword",e))(Pr||{});const ss=`
  query FetchFolders($folderIds: [String!]!) {
    fetchFolders(folderIds: $folderIds) {
      items {
        creatorId      
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
`,as=()=>{const{t:e,language:t}=qt(),r=Yt(t)==="rtl",[n,o]=j.useState(null),[s,c]=j.useState([]),[p,f]=j.useState([]),[h,x]=j.useState(null),[l,y]=j.useState(null),[v,w]=j.useState(!1),[C,z]=j.useState(""),[$,k]=j.useState(""),[_,A]=j.useState(!1),[T,P]=j.useState(!1),[g,Z]=j.useState({totalFiles:0,filesComplete:0,filesUploading:0,filesProcessing:0,filesWithError:0,overallProgress:0}),[H,Y]=j.useState(!1),[Te,De]=j.useState(""),[Ne,Fe]=j.useState(""),[ot,Se]=j.useState(!1),[ue,Pe]=j.useState(!1),[F,V]=j.useState("noPassword"),[K,L]=j.useState(""),[Ie,X]=j.useState(null),ne=Yr(f),ae=qr(c);j.useEffect(()=>{pe()},[]),j.useEffect(()=>{s.length>0&&localStorage.setItem(ke.SELECTED_PHOTOS,JSON.stringify(s))},[s]),j.useEffect(()=>{Gr(s,Z)},[s]);const pe=async()=>{Y(!1);try{const i=Lr();if(!i)return;try{const u=localStorage.getItem("publicUsername");x(u||null);const m=JSON.parse(atob(i.split(".")[1]))["cognito:username"];m&&(y(m),await ie(m))}catch(u){console.error("User data initialization error:",u)}je(),fe()}catch(i){console.error("Initialization error:",i)}},ie=async i=>{try{const S=new URLSearchParams(window.location.search).get("folderId");if(S){o(S);try{const m=await ee(S);if(m){const D=`${i}_____${i}____Account`,R=m.creatorId===D;if(X(R),R)switch(Se(!0),De(m.folderName),Fe(m.folderDescription),m.passwordPolicy){case"NoPassword":V("noPassword");break;case"NotVisible":V("notVisible"),L(m.password);break;case"Watermark":V("watermark"),L(m.password);break;case"CannotBeSaved":V("cannotBeSaved"),L(m.password);break;default:V("noPassword")}else Se(!1)}else X(!1)}catch(m){console.error("Error fetching folder details:",m),X(!1)}}else{const m=`${i}_____${Et()}____Folder`;o(m),X(!0),Se(!0)}}catch(u){console.error("Folder ID initialization error:",u),X(!1)}},ee=async i=>{var u,S,m,D;try{const R=localStorage.getItem("idToken");if(!R)return null;const B=await(await fetch(st,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${R}`},body:JSON.stringify({query:ss,variables:{folderIds:[i]}})})).json();if(B.errors)return console.error("GraphQL errors:",B.errors),null;const ce=((S=(u=B==null?void 0:B.data)==null?void 0:u.fetchFolders)==null?void 0:S.items)||[];if(ce.length===0)return null;const Ce=ce[0];return{creatorId:Ce.creatorId||"",folderName:Ce.folderName||"",folderDescription:Ce.folderDescription||"",passwordPolicy:((m=Ce.folderPassword)==null?void 0:m.policy)||"NoPassword",password:((D=Ce.folderPassword)==null?void 0:D.password)||""}}catch(R){return console.error("Error in fetchFolderDetails:",R),null}},je=()=>{try{const i=localStorage.getItem(ke.SELECTED_PHOTOS);if(i)try{const u=JSON.parse(i);Array.isArray(u)&&u.length>0&&c(u)}catch(u){console.error("Error parsing stored photos:",u)}}catch(i){console.error("Error restoring photos from storage:",i)}},fe=()=>{try{Wr||console.error("S3 client not available")}catch(i){console.error("S3 connection test error:",i)}},J=i=>{const u=s.filter((S,m)=>m!==i);c(u),u.length>0?localStorage.setItem(ke.SELECTED_PHOTOS,JSON.stringify(u)):localStorage.removeItem(ke.SELECTED_PHOTOS)},Ir=async i=>{if(!l)return;const u=Array.from(i.target.files||[]);if(u.length)try{const S=jr(u);c(R=>[...R,...S]);const m=s.length,D=await Vr(u,l,(R,M,B,ce)=>{ae(m+R,M,B,ce)},ne);Cr(m,D)}catch(S){console.error("Error in handleAddPhotos:",S)}finally{i.target.value=""}},jr=i=>i.map(u=>{const S=u.type,m=u.name.split(".").pop()||"jpg";return{fileName:`${Et()}.${m}`,s3PreviewUrl:URL.createObjectURL(u),type:S,size:u.size,status:"pending",progress:0}}),Cr=(i,u)=>{c(S=>{const m=[...S];return u.forEach((D,R)=>{const M=i+R;M<m.length&&(m[M]=D)}),m})},kr=async()=>{Y(!0);try{if(h!=null&&h.startsWith("Profile-")){z(h),w(!0),Y(!1);return}kt()}catch(i){console.error("Error in handleSaveAlbum:",i),Y(!1)}},kt=async()=>{Y(!0);try{if(!_r()){Y(!1);return}const i=s.filter(B=>B.status==="complete"),u=Math.floor(Date.now()/1e3),S=`${l}_____${l}____Account`,D=n.split("_____")[1].split("____")[0];await Kr(i,Er,ne);const R=Ar(u,S,D,i),M=$r(i,u,S);await Rr(R,M)}catch(i){console.error("Error in saveAlbumDirectly:",i),Y(!1)}},_r=()=>!(!localStorage.getItem("idToken")||!l||!n),Er=i=>{const u=document.getElementById("saveProgress");u&&(u.style.width=`${i}%`)},Ar=(i,u,S,m)=>({currentTime:i,folderId:n,profileIds:["Only Me_____Only Me____Profile"],folderPositionSelectedTagInputs:[],folderPositionPoints:1,acceptedFileReferenceIds:m.map(D=>`${S}_____${D.fileName}____FileReference`),hiddenFileReferenceIds:[],folderInput:{folderSelectedTagInputs:[],folderAboutContactIds:[u],folderName:Te,folderDescription:Ne,folderPasswordInput:{password:F!=="noPassword"?K:null,policy:Pr[F.charAt(0).toUpperCase()+F.slice(1)]},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,usingFolderInviteGrantsRightToRemoveItems:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:!0,addedItemsNeedFolderCreatorApproval:!1}}}),$r=(i,u,S)=>i.map(m=>{var M;const D=m.type==="video"||(M=m.type)!=null&&M.startsWith("video")?`Input/Video/${m.fileName}`:`Input/Image/${m.fileName}`,R=`${l}_____${m.fileName}____File`;return{fileReferencesHolderId:n,currentTime:u,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:R,fileInput:{fileId:R,ownerFileInput:{editorContactIds:[S],FileSharingOptionsEnum:"Anyone",dataKey:D,thumbnailDataKey:m.thumbnailDataKey,dataInBytes:m.size,thumbnailDataInBytes:m.thumbnailSize||0,s3UploadedAt:u,durationInSeconds:m.duration},editorFileInput:{aboutContactIds:[S],captionText:"",numericFilterInputs:[]}}}}),Rr=async(i,u)=>{const S=document.getElementById("saveProgressText");S&&(S.innerText=e("Finalizing album..."));const m=localStorage.getItem("idToken"),D=`
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
    `,R={folderPositionInputs:[i],updatedFileReferenceInputs:u},B=await(await fetch(st,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${m}`},body:JSON.stringify({query:D,variables:R})})).json();B.errors?(console.error("Upload failed:",B.errors),Y(!1)):Tr()},Tr=()=>{Jr(c,Z,[ke.SELECTED_PHOTOS],ne);const i=document.getElementById("saveProgressText");i&&(i.innerText=e("Album saved successfully!")),sessionStorage.setItem("album_just_saved","true"),setTimeout(()=>{window.location.href="/my-albums.html"},1e3)},Dr=i=>/^[a-zA-Z0-9-]+$/.test(i),_t=async i=>{var D,R;P(!0),k("");const u=localStorage.getItem("idToken");if(!u)return;const S=`
      mutation MyMutation($savePublicProfileDisplayNameInput: SavePublicProfileDisplayNameInput) {
        changeMyAccountItem(savePublicProfileDisplayNameInput: $savePublicProfileDisplayNameInput) {
          ... on Profile {
            anyDisplayName
          }
        }
      }
    `,m={savePublicProfileDisplayNameInput:{anyDisplayName:i}};try{const B=await(await fetch(st,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${u}`},body:JSON.stringify({query:S,variables:m})})).json(),ce=(R=(D=B==null?void 0:B.data)==null?void 0:D.changeMyAccountItem)==null?void 0:R.anyDisplayName;if(ce)Nr(ce);else throw new Error("Username taken")}catch{k(e("Username is already taken. Please try a different one.")),A(!0),P(!1)}},Nr=i=>{localStorage.setItem("publicUsername",i),x(i),w(!1),kt()},Fr=()=>{const i=Math.floor(1e5+Math.random()*9e5).toString(),u=`${C}${i}`;z(u),_t(u)},Or=(i,u)=>{i&&V(i),u!==void 0&&L(u),Pe(!1)},zr=()=>F==="noPassword"?e("Album Password Policy"):`${e(F==="notVisible"?"Not Visible":F==="watermark"?"Watermark":"Cannot Be Saved")} ${K?`(${K})`:""}`,Br=()=>{Pe(!0)};return a.jsxs(a.Fragment,{children:[a.jsx(Xn,{}),a.jsxs(eo,{isRTL:r,children:[a.jsxs(to,{children:[a.jsxs(ro,{children:[a.jsx(no,{children:a.jsx(oo,{href:"/my-albums.html",children:e("My Albums")})}),h&&a.jsxs(so,{children:[a.jsx(ao,{children:h}),a.jsx(Hr,{t:e})]})]}),g.totalFiles>0&&a.jsxs(io,{children:[a.jsx(co,{children:e("Upload Progress")}),a.jsxs(lo,{children:[a.jsxs(uo,{children:[a.jsxs("span",{children:[e("Overall Progress"),": ",Math.round(g.overallProgress*100),"%"]}),a.jsxs("span",{children:[g.filesComplete," ",e("of")," ",g.totalFiles," ",e("complete")]})]}),a.jsx(po,{children:a.jsx(fo,{progress:g.overallProgress})})]}),a.jsxs(ho,{children:[g.filesUploading>0&&a.jsxs(Be,{children:[e("Uploading"),": ",g.filesUploading]}),g.filesProcessing>0&&a.jsxs(Be,{children:[e("Processing"),": ",g.filesProcessing]}),g.filesComplete>0&&a.jsxs(Be,{children:[e("Complete"),": ",g.filesComplete]}),g.filesWithError>0&&a.jsxs(Be,{isError:!0,children:[e("Failed"),": ",g.filesWithError]})]})]}),H&&a.jsxs(go,{children:[a.jsx(mo,{children:e("Saving Album")}),a.jsx(xo,{id:"saveProgressText",children:e("Moving files...")}),a.jsx(bo,{children:a.jsx(yo,{id:"saveProgress",style:{width:"5%"}})})]}),a.jsx(Jo,{id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:Ir}),s.length>0&&a.jsxs(a.Fragment,{children:[a.jsxs(vo,{children:[s.length," ",s.length>1?e("photos selected"):e("photo selected"),":"]}),a.jsx(wo,{children:s.map((i,u)=>{var S,m;return a.jsxs(So,{children:[a.jsx(Po,{status:i.status,children:i.status==="complete"?"✓":i.status==="error"?"✕":i.status==="uploading"?"↑":i.status==="processing"?"⚙️":"•"}),a.jsxs(Io,{children:[i.type==="video"||(S=i.type)!=null&&S.startsWith("video")?a.jsx(Co,{src:i.s3PreviewUrl,controls:!0}):a.jsx(jo,{src:i.s3PreviewUrl,alt:i.fileName}),(i.status==="uploading"||i.status==="processing")&&a.jsx(ko,{children:a.jsx(_o,{progress:i.progress,status:i.status})})]}),a.jsxs(Eo,{children:[(m=i.type)!=null&&m.startsWith("video")?e("Video"):e("Image"),i.size&&` • ${(i.size/1024/1024).toFixed(1)} MB`,i.duration&&` • ${i.duration}s`]}),i.status==="error"&&i.errorMessage&&a.jsxs(Ao,{children:[e("Error"),": ",i.errorMessage.length>40?i.errorMessage.substring(0,37)+"...":i.errorMessage]}),a.jsx($o,{onClick:()=>J(u),disabled:H,children:e("Remove")})]},u)})})]}),a.jsxs(Ro,{children:[ot&&Ie===!0&&a.jsxs(No,{children:[a.jsxs(Gt,{children:[a.jsx(Wt,{htmlFor:"folderName",children:e("Album Name (Optional)")}),a.jsx(Fo,{id:"folderName",type:"text",value:Te,onChange:i=>De(i.target.value),placeholder:e("Enter album name")})]}),a.jsxs(Gt,{children:[a.jsx(Wt,{htmlFor:"folderDescription",children:e("Album Description (Optional)")}),a.jsx(Oo,{id:"folderDescription",value:Ne,onChange:i=>Fe(i.target.value),placeholder:e("Enter album description"),rows:4})]})]}),a.jsx(Sr,{onClick:()=>{const i=document.getElementById("file-input");i==null||i.click()},disabled:H,children:e("Add More Photos")}),Ie===!0&&a.jsx(Do,{passwordSet:F!=="noPassword",onClick:Br,disabled:H,children:zr()}),a.jsx(To,{onClick:kr,disabled:H,children:e(H?"Saving Album...":"Save Album")})]}),v&&a.jsx(zo,{children:a.jsxs(Bo,{isRTL:r,children:[a.jsx(Uo,{children:e("Enter Username")}),a.jsx(Mo,{children:e("Username should contain only letters, numbers and hyphens. Example: john-doe2")}),a.jsx(Lo,{value:C,onChange:i=>z(i.target.value),isRTL:r}),$&&a.jsx(Go,{children:$}),a.jsx(Wo,{disabled:T,onClick:()=>{if(!Dr(C)){k(e("Username must contain only letters, numbers, and hyphens."));return}_t(C)},children:e("Select Username")}),_&&a.jsx(Ho,{disabled:T,onClick:Fr,children:e("Add Random Digits to Username")})]})}),ue&&a.jsx(os,{isOpen:ue,onClose:Or,initialOption:F,initialPassword:K})]}),p.length>0&&a.jsxs(Vo,{children:[a.jsx(qo,{children:e("Debug Log")}),a.jsx(Yo,{children:p.map((i,u)=>a.jsx(Ko,{children:i},u))})]})]})]})},is=()=>a.jsx(Mr,{children:a.jsx(as,{})});Ur.createRoot(document.getElementById("root")).render(a.jsx(is,{}));
