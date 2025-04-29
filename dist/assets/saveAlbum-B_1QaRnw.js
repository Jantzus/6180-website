import{b as re,r as j,u as Yt,j as a,g as Kt,R as Mr,I as Lr,S as _e,G as at}from"./config-DVBt75YP.js";import{a as ke,g as At}from"./utils-dfiwzYQD.js";import{u as Gr,s as Wr,L as Hr,p as Vr,c as qr,a as Yr,m as Kr,b as Jr}from"./file-upload-utils-DYmr0ckP.js";import"./index-DFUfgcbK.js";var U=function(){return U=Object.assign||function(t){for(var r,n=1,s=arguments.length;n<s;n++){r=arguments[n];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(t[o]=r[o])}return t},U.apply(this,arguments)};function $e(e,t,r){if(r||arguments.length===2)for(var n=0,s=t.length,o;n<s;n++)(o||!(n in t))&&(o||(o=Array.prototype.slice.call(t,0,n)),o[n]=t[n]);return e.concat(o||Array.prototype.slice.call(t))}var E="-ms-",Ae="-moz-",I="-webkit-",Jt="comm",Xe="rule",wt="decl",Qr="@import",Qt="@keyframes",Zr="@layer",Zt=Math.abs,St=String.fromCharCode,pt=Object.assign;function Xr(e,t){return O(e,0)^45?(((t<<2^O(e,0))<<2^O(e,1))<<2^O(e,2))<<2^O(e,3):0}function Xt(e){return e.trim()}function te(e,t){return(e=t.exec(e))?e[0]:e}function b(e,t,r){return e.replace(t,r)}function We(e,t,r){return e.indexOf(t,r)}function O(e,t){return e.charCodeAt(t)|0}function me(e,t,r){return e.slice(t,r)}function Q(e){return e.length}function er(e){return e.length}function Ee(e,t){return t.push(e),e}function en(e,t){return e.map(t).join("")}function $t(e,t){return e.filter(function(r){return!te(r,t)})}var et=1,xe=1,tr=0,W=0,N=0,we="";function tt(e,t,r,n,s,o,c,p){return{value:e,root:t,parent:r,type:n,props:s,children:o,line:et,column:xe,length:c,return:"",siblings:p}}function se(e,t){return pt(tt("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},t)}function he(e){for(;e.root;)e=se(e.root,{children:[e]});Ee(e,e.siblings)}function tn(){return N}function rn(){return N=W>0?O(we,--W):0,xe--,N===10&&(xe=1,et--),N}function Y(){return N=W<tr?O(we,W++):0,xe++,N===10&&(xe=1,et++),N}function le(){return O(we,W)}function He(){return W}function rt(e,t){return me(we,e,t)}function ft(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function nn(e){return et=xe=1,tr=Q(we=e),W=0,[]}function sn(e){return we="",e}function it(e){return Xt(rt(W-1,ht(e===91?e+2:e===40?e+1:e)))}function on(e){for(;(N=le())&&N<33;)Y();return ft(e)>2||ft(N)>3?"":" "}function an(e,t){for(;--t&&Y()&&!(N<48||N>102||N>57&&N<65||N>70&&N<97););return rt(e,He()+(t<6&&le()==32&&Y()==32))}function ht(e){for(;Y();)switch(N){case e:return W;case 34:case 39:e!==34&&e!==39&&ht(N);break;case 40:e===41&&ht(e);break;case 92:Y();break}return W}function cn(e,t){for(;Y()&&e+N!==57;)if(e+N===84&&le()===47)break;return"/*"+rt(t,W-1)+"*"+St(e===47?e:Y())}function dn(e){for(;!ft(le());)Y();return rt(e,W)}function ln(e){return sn(Ve("",null,null,null,[""],e=nn(e),0,[0],e))}function Ve(e,t,r,n,s,o,c,p,f){for(var h=0,x=0,l=c,y=0,v=0,w=0,C=1,z=1,$=1,_=0,k="",A=s,D=o,P=n,m=k;z;)switch(w=_,_=Y()){case 40:if(w!=108&&O(m,l-1)==58){We(m+=b(it(_),"&","&\f"),"&\f",Zt(h?p[h-1]:0))!=-1&&($=-1);break}case 34:case 39:case 91:m+=it(_);break;case 9:case 10:case 13:case 32:m+=on(w);break;case 92:m+=an(He()-1,7);continue;case 47:switch(le()){case 42:case 47:Ee(un(cn(Y(),He()),t,r,f),f);break;default:m+="/"}break;case 123*C:p[h++]=Q(m)*$;case 125*C:case 59:case 0:switch(_){case 0:case 125:z=0;case 59+x:$==-1&&(m=b(m,/\f/g,"")),v>0&&Q(m)-l&&Ee(v>32?Dt(m+";",n,r,l-1,f):Dt(b(m," ","")+";",n,r,l-2,f),f);break;case 59:m+=";";default:if(Ee(P=Rt(m,t,r,h,x,s,p,k,A=[],D=[],l,o),o),_===123)if(x===0)Ve(m,t,P,P,A,o,l,p,D);else switch(y===99&&O(m,3)===110?100:y){case 100:case 108:case 109:case 115:Ve(e,P,P,n&&Ee(Rt(e,P,P,0,0,s,p,k,s,A=[],l,D),D),s,D,l,p,n?A:D);break;default:Ve(m,P,P,P,[""],D,0,p,D)}}h=x=v=0,C=$=1,k=m="",l=c;break;case 58:l=1+Q(m),v=w;default:if(C<1){if(_==123)--C;else if(_==125&&C++==0&&rn()==125)continue}switch(m+=St(_),_*C){case 38:$=x>0?1:(m+="\f",-1);break;case 44:p[h++]=(Q(m)-1)*$,$=1;break;case 64:le()===45&&(m+=it(Y())),y=le(),x=l=Q(k=m+=dn(He())),_++;break;case 45:w===45&&Q(m)==2&&(C=0)}}return o}function Rt(e,t,r,n,s,o,c,p,f,h,x,l){for(var y=s-1,v=s===0?o:[""],w=er(v),C=0,z=0,$=0;C<n;++C)for(var _=0,k=me(e,y+1,y=Zt(z=c[C])),A=e;_<w;++_)(A=Xt(z>0?v[_]+" "+k:b(k,/&\f/g,v[_])))&&(f[$++]=A);return tt(e,t,r,s===0?Xe:p,f,h,x,l)}function un(e,t,r,n){return tt(e,t,r,Jt,St(tn()),me(e,2,-2),0,n)}function Dt(e,t,r,n,s){return tt(e,t,r,wt,me(e,0,n),me(e,n+1,-1),n,s)}function rr(e,t,r){switch(Xr(e,t)){case 5103:return I+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return I+e+e;case 4789:return Ae+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return I+e+Ae+e+E+e+e;case 5936:switch(O(e,t+11)){case 114:return I+e+E+b(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return I+e+E+b(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return I+e+E+b(e,/[svh]\w+-[tblr]{2}/,"lr")+e}case 6828:case 4268:case 2903:return I+e+E+e+e;case 6165:return I+e+E+"flex-"+e+e;case 5187:return I+e+b(e,/(\w+).+(:[^]+)/,I+"box-$1$2"+E+"flex-$1$2")+e;case 5443:return I+e+E+"flex-item-"+b(e,/flex-|-self/g,"")+(te(e,/flex-|baseline/)?"":E+"grid-row-"+b(e,/flex-|-self/g,""))+e;case 4675:return I+e+E+"flex-line-pack"+b(e,/align-content|flex-|-self/g,"")+e;case 5548:return I+e+E+b(e,"shrink","negative")+e;case 5292:return I+e+E+b(e,"basis","preferred-size")+e;case 6060:return I+"box-"+b(e,"-grow","")+I+e+E+b(e,"grow","positive")+e;case 4554:return I+b(e,/([^-])(transform)/g,"$1"+I+"$2")+e;case 6187:return b(b(b(e,/(zoom-|grab)/,I+"$1"),/(image-set)/,I+"$1"),e,"")+e;case 5495:case 3959:return b(e,/(image-set\([^]*)/,I+"$1$`$1");case 4968:return b(b(e,/(.+:)(flex-)?(.*)/,I+"box-pack:$3"+E+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+I+e+e;case 4200:if(!te(e,/flex-|baseline/))return E+"grid-column-align"+me(e,t)+e;break;case 2592:case 3360:return E+b(e,"template-","")+e;case 4384:case 3616:return r&&r.some(function(n,s){return t=s,te(n.props,/grid-\w+-end/)})?~We(e+(r=r[t].value),"span",0)?e:E+b(e,"-start","")+e+E+"grid-row-span:"+(~We(r,"span",0)?te(r,/\d+/):+te(r,/\d+/)-+te(e,/\d+/))+";":E+b(e,"-start","")+e;case 4896:case 4128:return r&&r.some(function(n){return te(n.props,/grid-\w+-start/)})?e:E+b(b(e,"-end","-span"),"span ","")+e;case 4095:case 3583:case 4068:case 2532:return b(e,/(.+)-inline(.+)/,I+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(Q(e)-1-t>6)switch(O(e,t+1)){case 109:if(O(e,t+4)!==45)break;case 102:return b(e,/(.+:)(.+)-([^]+)/,"$1"+I+"$2-$3$1"+Ae+(O(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~We(e,"stretch",0)?rr(b(e,"stretch","fill-available"),t,r)+e:e}break;case 5152:case 5920:return b(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(n,s,o,c,p,f,h){return E+s+":"+o+h+(c?E+s+"-span:"+(p?f:+f-+o)+h:"")+e});case 4949:if(O(e,t+6)===121)return b(e,":",":"+I)+e;break;case 6444:switch(O(e,O(e,14)===45?18:11)){case 120:return b(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+I+(O(e,14)===45?"inline-":"")+"box$3$1"+I+"$2$3$1"+E+"$2box$3")+e;case 100:return b(e,":",":"+E)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return b(e,"scroll-","scroll-snap-")+e}return e}function Ke(e,t){for(var r="",n=0;n<e.length;n++)r+=t(e[n],n,e,t)||"";return r}function pn(e,t,r,n){switch(e.type){case Zr:if(e.children.length)break;case Qr:case wt:return e.return=e.return||e.value;case Jt:return"";case Qt:return e.return=e.value+"{"+Ke(e.children,n)+"}";case Xe:if(!Q(e.value=e.props.join(",")))return""}return Q(r=Ke(e.children,n))?e.return=e.value+"{"+r+"}":""}function fn(e){var t=er(e);return function(r,n,s,o){for(var c="",p=0;p<t;p++)c+=e[p](r,n,s,o)||"";return c}}function hn(e){return function(t){t.root||(t=t.return)&&e(t)}}function gn(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case wt:e.return=rr(e.value,e.length,r);return;case Qt:return Ke([se(e,{value:b(e.value,"@","@"+I)})],n);case Xe:if(e.length)return en(r=e.props,function(s){switch(te(s,n=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":he(se(e,{props:[b(s,/:(read-\w+)/,":"+Ae+"$1")]})),he(se(e,{props:[s]})),pt(e,{props:$t(r,n)});break;case"::placeholder":he(se(e,{props:[b(s,/:(plac\w+)/,":"+I+"input-$1")]})),he(se(e,{props:[b(s,/:(plac\w+)/,":"+Ae+"$1")]})),he(se(e,{props:[b(s,/:(plac\w+)/,E+"input-$1")]})),he(se(e,{props:[s]})),pt(e,{props:$t(r,n)});break}return""})}}var mn={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},G={},be=typeof process<"u"&&G!==void 0&&(G.REACT_APP_SC_ATTR||G.SC_ATTR)||"data-styled",nr="active",sr="data-styled-version",nt="6.1.17",Pt=`/*!sc*/
`,Je=typeof window<"u"&&"HTMLElement"in window,xn=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&G!==void 0&&G.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&G.REACT_APP_SC_DISABLE_SPEEDY!==""?G.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&G.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&G!==void 0&&G.SC_DISABLE_SPEEDY!==void 0&&G.SC_DISABLE_SPEEDY!==""&&G.SC_DISABLE_SPEEDY!=="false"&&G.SC_DISABLE_SPEEDY),bn={},st=Object.freeze([]),ye=Object.freeze({});function or(e,t,r){return r===void 0&&(r=ye),e.theme!==r.theme&&e.theme||t||r.theme}var ar=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),yn=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,vn=/(^-|-$)/g;function Tt(e){return e.replace(yn,"-").replace(vn,"")}var wn=/(a)(d)/gi,ze=52,Nt=function(e){return String.fromCharCode(e+(e>25?39:97))};function gt(e){var t,r="";for(t=Math.abs(e);t>ze;t=t/ze|0)r=Nt(t%ze)+r;return(Nt(t%ze)+r).replace(wn,"$1-$2")}var ct,ir=5381,ge=function(e,t){for(var r=t.length;r;)e=33*e^t.charCodeAt(--r);return e},cr=function(e){return ge(ir,e)};function dr(e){return gt(cr(e)>>>0)}function Sn(e){return e.displayName||e.name||"Component"}function dt(e){return typeof e=="string"&&!0}var lr=typeof Symbol=="function"&&Symbol.for,ur=lr?Symbol.for("react.memo"):60115,Pn=lr?Symbol.for("react.forward_ref"):60112,In={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},jn={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},pr={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},Cn=((ct={})[Pn]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},ct[ur]=pr,ct);function Ft(e){return("type"in(t=e)&&t.type.$$typeof)===ur?pr:"$$typeof"in e?Cn[e.$$typeof]:In;var t}var _n=Object.defineProperty,kn=Object.getOwnPropertyNames,Ot=Object.getOwnPropertySymbols,En=Object.getOwnPropertyDescriptor,An=Object.getPrototypeOf,zt=Object.prototype;function fr(e,t,r){if(typeof t!="string"){if(zt){var n=An(t);n&&n!==zt&&fr(e,n,r)}var s=kn(t);Ot&&(s=s.concat(Ot(t)));for(var o=Ft(e),c=Ft(t),p=0;p<s.length;++p){var f=s[p];if(!(f in jn||r&&r[f]||c&&f in c||o&&f in o)){var h=En(t,f);try{_n(e,f,h)}catch{}}}}return e}function ve(e){return typeof e=="function"}function It(e){return typeof e=="object"&&"styledComponentId"in e}function de(e,t){return e&&t?"".concat(e," ").concat(t):e||t||""}function mt(e,t){if(e.length===0)return"";for(var r=e[0],n=1;n<e.length;n++)r+=e[n];return r}function Re(e){return e!==null&&typeof e=="object"&&e.constructor.name===Object.name&&!("props"in e&&e.$$typeof)}function xt(e,t,r){if(r===void 0&&(r=!1),!r&&!Re(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(var n=0;n<t.length;n++)e[n]=xt(e[n],t[n]);else if(Re(t))for(var n in t)e[n]=xt(e[n],t[n]);return e}function jt(e,t){Object.defineProperty(e,"toString",{value:t})}function De(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e," for more information.").concat(t.length>0?" Args: ".concat(t.join(", ")):""))}var $n=function(){function e(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t}return e.prototype.indexOfGroup=function(t){for(var r=0,n=0;n<t;n++)r+=this.groupSizes[n];return r},e.prototype.insertRules=function(t,r){if(t>=this.groupSizes.length){for(var n=this.groupSizes,s=n.length,o=s;t>=o;)if((o<<=1)<0)throw De(16,"".concat(t));this.groupSizes=new Uint32Array(o),this.groupSizes.set(n),this.length=o;for(var c=s;c<o;c++)this.groupSizes[c]=0}for(var p=this.indexOfGroup(t+1),f=(c=0,r.length);c<f;c++)this.tag.insertRule(p,r[c])&&(this.groupSizes[t]++,p++)},e.prototype.clearGroup=function(t){if(t<this.length){var r=this.groupSizes[t],n=this.indexOfGroup(t),s=n+r;this.groupSizes[t]=0;for(var o=n;o<s;o++)this.tag.deleteRule(n)}},e.prototype.getGroup=function(t){var r="";if(t>=this.length||this.groupSizes[t]===0)return r;for(var n=this.groupSizes[t],s=this.indexOfGroup(t),o=s+n,c=s;c<o;c++)r+="".concat(this.tag.getRule(c)).concat(Pt);return r},e}(),qe=new Map,Qe=new Map,Ye=1,Be=function(e){if(qe.has(e))return qe.get(e);for(;Qe.has(Ye);)Ye++;var t=Ye++;return qe.set(e,t),Qe.set(t,e),t},Rn=function(e,t){Ye=t+1,qe.set(e,t),Qe.set(t,e)},Dn="style[".concat(be,"][").concat(sr,'="').concat(nt,'"]'),Tn=new RegExp("^".concat(be,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),Nn=function(e,t,r){for(var n,s=r.split(","),o=0,c=s.length;o<c;o++)(n=s[o])&&e.registerName(t,n)},Fn=function(e,t){for(var r,n=((r=t.textContent)!==null&&r!==void 0?r:"").split(Pt),s=[],o=0,c=n.length;o<c;o++){var p=n[o].trim();if(p){var f=p.match(Tn);if(f){var h=0|parseInt(f[1],10),x=f[2];h!==0&&(Rn(x,h),Nn(e,x,f[3]),e.getTag().insertRules(h,s)),s.length=0}else s.push(p)}}},Bt=function(e){for(var t=document.querySelectorAll(Dn),r=0,n=t.length;r<n;r++){var s=t[r];s&&s.getAttribute(be)!==nr&&(Fn(e,s),s.parentNode&&s.parentNode.removeChild(s))}};function On(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var hr=function(e){var t=document.head,r=e||t,n=document.createElement("style"),s=function(p){var f=Array.from(p.querySelectorAll("style[".concat(be,"]")));return f[f.length-1]}(r),o=s!==void 0?s.nextSibling:null;n.setAttribute(be,nr),n.setAttribute(sr,nt);var c=On();return c&&n.setAttribute("nonce",c),r.insertBefore(n,o),n},zn=function(){function e(t){this.element=hr(t),this.element.appendChild(document.createTextNode("")),this.sheet=function(r){if(r.sheet)return r.sheet;for(var n=document.styleSheets,s=0,o=n.length;s<o;s++){var c=n[s];if(c.ownerNode===r)return c}throw De(17)}(this.element),this.length=0}return e.prototype.insertRule=function(t,r){try{return this.sheet.insertRule(r,t),this.length++,!0}catch{return!1}},e.prototype.deleteRule=function(t){this.sheet.deleteRule(t),this.length--},e.prototype.getRule=function(t){var r=this.sheet.cssRules[t];return r&&r.cssText?r.cssText:""},e}(),Bn=function(){function e(t){this.element=hr(t),this.nodes=this.element.childNodes,this.length=0}return e.prototype.insertRule=function(t,r){if(t<=this.length&&t>=0){var n=document.createTextNode(r);return this.element.insertBefore(n,this.nodes[t]||null),this.length++,!0}return!1},e.prototype.deleteRule=function(t){this.element.removeChild(this.nodes[t]),this.length--},e.prototype.getRule=function(t){return t<this.length?this.nodes[t].textContent:""},e}(),Un=function(){function e(t){this.rules=[],this.length=0}return e.prototype.insertRule=function(t,r){return t<=this.length&&(this.rules.splice(t,0,r),this.length++,!0)},e.prototype.deleteRule=function(t){this.rules.splice(t,1),this.length--},e.prototype.getRule=function(t){return t<this.length?this.rules[t]:""},e}(),Ut=Je,Mn={isServer:!Je,useCSSOMInjection:!xn},Ze=function(){function e(t,r,n){t===void 0&&(t=ye),r===void 0&&(r={});var s=this;this.options=U(U({},Mn),t),this.gs=r,this.names=new Map(n),this.server=!!t.isServer,!this.server&&Je&&Ut&&(Ut=!1,Bt(this)),jt(this,function(){return function(o){for(var c=o.getTag(),p=c.length,f="",h=function(l){var y=function($){return Qe.get($)}(l);if(y===void 0)return"continue";var v=o.names.get(y),w=c.getGroup(l);if(v===void 0||!v.size||w.length===0)return"continue";var C="".concat(be,".g").concat(l,'[id="').concat(y,'"]'),z="";v!==void 0&&v.forEach(function($){$.length>0&&(z+="".concat($,","))}),f+="".concat(w).concat(C,'{content:"').concat(z,'"}').concat(Pt)},x=0;x<p;x++)h(x);return f}(s)})}return e.registerId=function(t){return Be(t)},e.prototype.rehydrate=function(){!this.server&&Je&&Bt(this)},e.prototype.reconstructWithOptions=function(t,r){return r===void 0&&(r=!0),new e(U(U({},this.options),t),this.gs,r&&this.names||void 0)},e.prototype.allocateGSInstance=function(t){return this.gs[t]=(this.gs[t]||0)+1},e.prototype.getTag=function(){return this.tag||(this.tag=(t=function(r){var n=r.useCSSOMInjection,s=r.target;return r.isServer?new Un(s):n?new zn(s):new Bn(s)}(this.options),new $n(t)));var t},e.prototype.hasNameForId=function(t,r){return this.names.has(t)&&this.names.get(t).has(r)},e.prototype.registerName=function(t,r){if(Be(t),this.names.has(t))this.names.get(t).add(r);else{var n=new Set;n.add(r),this.names.set(t,n)}},e.prototype.insertRules=function(t,r,n){this.registerName(t,r),this.getTag().insertRules(Be(t),n)},e.prototype.clearNames=function(t){this.names.has(t)&&this.names.get(t).clear()},e.prototype.clearRules=function(t){this.getTag().clearGroup(Be(t)),this.clearNames(t)},e.prototype.clearTag=function(){this.tag=void 0},e}(),Ln=/&/g,Gn=/^\s*\/\/.*$/gm;function gr(e,t){return e.map(function(r){return r.type==="rule"&&(r.value="".concat(t," ").concat(r.value),r.value=r.value.replaceAll(",",",".concat(t," ")),r.props=r.props.map(function(n){return"".concat(t," ").concat(n)})),Array.isArray(r.children)&&r.type!=="@keyframes"&&(r.children=gr(r.children,t)),r})}function Wn(e){var t,r,n,s=ye,o=s.options,c=o===void 0?ye:o,p=s.plugins,f=p===void 0?st:p,h=function(y,v,w){return w.startsWith(r)&&w.endsWith(r)&&w.replaceAll(r,"").length>0?".".concat(t):y},x=f.slice();x.push(function(y){y.type===Xe&&y.value.includes("&")&&(y.props[0]=y.props[0].replace(Ln,r).replace(n,h))}),c.prefix&&x.push(gn),x.push(pn);var l=function(y,v,w,C){v===void 0&&(v=""),w===void 0&&(w=""),C===void 0&&(C="&"),t=C,r=v,n=new RegExp("\\".concat(r,"\\b"),"g");var z=y.replace(Gn,""),$=ln(w||v?"".concat(w," ").concat(v," { ").concat(z," }"):z);c.namespace&&($=gr($,c.namespace));var _=[];return Ke($,fn(x.concat(hn(function(k){return _.push(k)})))),_};return l.hash=f.length?f.reduce(function(y,v){return v.name||De(15),ge(y,v.name)},ir).toString():"",l}var Hn=new Ze,bt=Wn(),mr=re.createContext({shouldForwardProp:void 0,styleSheet:Hn,stylis:bt});mr.Consumer;re.createContext(void 0);function yt(){return j.useContext(mr)}var Vn=function(){function e(t,r){var n=this;this.inject=function(s,o){o===void 0&&(o=bt);var c=n.name+o.hash;s.hasNameForId(n.id,c)||s.insertRules(n.id,c,o(n.rules,c,"@keyframes"))},this.name=t,this.id="sc-keyframes-".concat(t),this.rules=r,jt(this,function(){throw De(12,String(n.name))})}return e.prototype.getName=function(t){return t===void 0&&(t=bt),this.name+t.hash},e}(),qn=function(e){return e>="A"&&e<="Z"};function Mt(e){for(var t="",r=0;r<e.length;r++){var n=e[r];if(r===1&&n==="-"&&e[0]==="-")return e;qn(n)?t+="-"+n.toLowerCase():t+=n}return t.startsWith("ms-")?"-"+t:t}var xr=function(e){return e==null||e===!1||e===""},br=function(e){var t,r,n=[];for(var s in e){var o=e[s];e.hasOwnProperty(s)&&!xr(o)&&(Array.isArray(o)&&o.isCss||ve(o)?n.push("".concat(Mt(s),":"),o,";"):Re(o)?n.push.apply(n,$e($e(["".concat(s," {")],br(o),!1),["}"],!1)):n.push("".concat(Mt(s),": ").concat((t=s,(r=o)==null||typeof r=="boolean"||r===""?"":typeof r!="number"||r===0||t in mn||t.startsWith("--")?String(r).trim():"".concat(r,"px")),";")))}return n};function oe(e,t,r,n){if(xr(e))return[];if(It(e))return[".".concat(e.styledComponentId)];if(ve(e)){if(!ve(o=e)||o.prototype&&o.prototype.isReactComponent||!t)return[e];var s=e(t);return oe(s,t,r,n)}var o;return e instanceof Vn?r?(e.inject(r,n),[e.getName(n)]):[e]:Re(e)?br(e):Array.isArray(e)?Array.prototype.concat.apply(st,e.map(function(c){return oe(c,t,r,n)})):[e.toString()]}function yr(e){for(var t=0;t<e.length;t+=1){var r=e[t];if(ve(r)&&!It(r))return!1}return!0}var Yn=cr(nt),Kn=function(){function e(t,r,n){this.rules=t,this.staticRulesId="",this.isStatic=(n===void 0||n.isStatic)&&yr(t),this.componentId=r,this.baseHash=ge(Yn,r),this.baseStyle=n,Ze.registerId(r)}return e.prototype.generateAndInjectStyles=function(t,r,n){var s=this.baseStyle?this.baseStyle.generateAndInjectStyles(t,r,n):"";if(this.isStatic&&!n.hash)if(this.staticRulesId&&r.hasNameForId(this.componentId,this.staticRulesId))s=de(s,this.staticRulesId);else{var o=mt(oe(this.rules,t,r,n)),c=gt(ge(this.baseHash,o)>>>0);if(!r.hasNameForId(this.componentId,c)){var p=n(o,".".concat(c),void 0,this.componentId);r.insertRules(this.componentId,c,p)}s=de(s,c),this.staticRulesId=c}else{for(var f=ge(this.baseHash,n.hash),h="",x=0;x<this.rules.length;x++){var l=this.rules[x];if(typeof l=="string")h+=l;else if(l){var y=mt(oe(l,t,r,n));f=ge(f,y+x),h+=y}}if(h){var v=gt(f>>>0);r.hasNameForId(this.componentId,v)||r.insertRules(this.componentId,v,n(h,".".concat(v),void 0,this.componentId)),s=de(s,v)}}return s},e}(),Ct=re.createContext(void 0);Ct.Consumer;var lt={};function Jn(e,t,r){var n=It(e),s=e,o=!dt(e),c=t.attrs,p=c===void 0?st:c,f=t.componentId,h=f===void 0?function(A,D){var P=typeof A!="string"?"sc":Tt(A);lt[P]=(lt[P]||0)+1;var m="".concat(P,"-").concat(dr(nt+P+lt[P]));return D?"".concat(D,"-").concat(m):m}(t.displayName,t.parentComponentId):f,x=t.displayName,l=x===void 0?function(A){return dt(A)?"styled.".concat(A):"Styled(".concat(Sn(A),")")}(e):x,y=t.displayName&&t.componentId?"".concat(Tt(t.displayName),"-").concat(t.componentId):t.componentId||h,v=n&&s.attrs?s.attrs.concat(p).filter(Boolean):p,w=t.shouldForwardProp;if(n&&s.shouldForwardProp){var C=s.shouldForwardProp;if(t.shouldForwardProp){var z=t.shouldForwardProp;w=function(A,D){return C(A,D)&&z(A,D)}}else w=C}var $=new Kn(r,y,n?s.componentStyle:void 0);function _(A,D){return function(P,m,Z){var H=P.attrs,V=P.componentStyle,Te=P.defaultProps,Ne=P.foldedComponentIds,Fe=P.styledComponentId,Oe=P.target,ot=re.useContext(Ct),Se=yt(),ue=P.shouldForwardProp||Se.shouldForwardProp,Pe=or(m,ot,Te)||ye,F=function(ne,ae,pe){for(var ie,ee=U(U({},ae),{className:void 0,theme:pe}),je=0;je<ne.length;je+=1){var fe=ve(ie=ne[je])?ie(ee):ie;for(var J in fe)ee[J]=J==="className"?de(ee[J],fe[J]):J==="style"?U(U({},ee[J]),fe[J]):fe[J]}return ae.className&&(ee.className=de(ee.className,ae.className)),ee}(H,m,Pe),q=F.as||Oe,K={};for(var L in F)F[L]===void 0||L[0]==="$"||L==="as"||L==="theme"&&F.theme===Pe||(L==="forwardedAs"?K.as=F.forwardedAs:ue&&!ue(L,q)||(K[L]=F[L]));var Ie=function(ne,ae){var pe=yt(),ie=ne.generateAndInjectStyles(ae,pe.styleSheet,pe.stylis);return ie}(V,F),X=de(Ne,Fe);return Ie&&(X+=" "+Ie),F.className&&(X+=" "+F.className),K[dt(q)&&!ar.has(q)?"class":"className"]=X,Z&&(K.ref=Z),j.createElement(q,K)}(k,A,D)}_.displayName=l;var k=re.forwardRef(_);return k.attrs=v,k.componentStyle=$,k.displayName=l,k.shouldForwardProp=w,k.foldedComponentIds=n?de(s.foldedComponentIds,s.styledComponentId):"",k.styledComponentId=y,k.target=n?s.target:e,Object.defineProperty(k,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(A){this._foldedDefaultProps=n?function(D){for(var P=[],m=1;m<arguments.length;m++)P[m-1]=arguments[m];for(var Z=0,H=P;Z<H.length;Z++)xt(D,H[Z],!0);return D}({},s.defaultProps,A):A}}),jt(k,function(){return".".concat(k.styledComponentId)}),o&&fr(k,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),k}function Lt(e,t){for(var r=[e[0]],n=0,s=t.length;n<s;n+=1)r.push(t[n],e[n+1]);return r}var Gt=function(e){return Object.assign(e,{isCss:!0})};function _t(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(ve(e)||Re(e))return Gt(oe(Lt(st,$e([e],t,!0))));var n=e;return t.length===0&&n.length===1&&typeof n[0]=="string"?oe(n):Gt(oe(Lt(n,t)))}function vt(e,t,r){if(r===void 0&&(r=ye),!t)throw De(1,t);var n=function(s){for(var o=[],c=1;c<arguments.length;c++)o[c-1]=arguments[c];return e(t,r,_t.apply(void 0,$e([s],o,!1)))};return n.attrs=function(s){return vt(e,t,U(U({},r),{attrs:Array.prototype.concat(r.attrs,s).filter(Boolean)}))},n.withConfig=function(s){return vt(e,t,U(U({},r),s))},n}var vr=function(e){return vt(Jn,e)},d=vr;ar.forEach(function(e){d[e]=vr(e)});var Qn=function(){function e(t,r){this.rules=t,this.componentId=r,this.isStatic=yr(t),Ze.registerId(this.componentId+1)}return e.prototype.createStyles=function(t,r,n,s){var o=s(mt(oe(this.rules,r,n,s)),""),c=this.componentId+t;n.insertRules(c,c,o)},e.prototype.removeStyles=function(t,r){r.clearRules(this.componentId+t)},e.prototype.renderStyles=function(t,r,n,s){t>2&&Ze.registerId(this.componentId+t),this.removeStyles(t,n),this.createStyles(t,r,n,s)},e}();function Zn(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];var n=_t.apply(void 0,$e([e],t,!1)),s="sc-global-".concat(dr(JSON.stringify(n))),o=new Qn(n,s),c=function(f){var h=yt(),x=re.useContext(Ct),l=re.useRef(h.styleSheet.allocateGSInstance(s)).current;return h.styleSheet.server&&p(l,f,h.styleSheet,x,h.stylis),re.useLayoutEffect(function(){if(!h.styleSheet.server)return p(l,f,h.styleSheet,x,h.stylis),function(){return o.removeStyles(l,h.styleSheet)}},[l,f,h.styleSheet,x,h.stylis]),null};function p(f,h,x,l,y){if(o.isStatic)o.renderStyles(f,bn,x,y);else{var v=U(U({},h),{theme:or(h,l,c.defaultProps)});o.renderStyles(f,v,x,y)}}return re.memo(c)}const Xn=Zn`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }
`,wr=e=>_t`
  direction: ${e?"rtl":"ltr"};
`,es=d.div`
  padding: 40px 20px;
  background-color: #f9fafb;
  min-height: 100vh;
  ${e=>wr(e.isRTL)}
`,ts=d.div`
  max-width: 900px;
  margin: 0 auto;
`,rs=d.div`
  margin-bottom: 20px;
`,ns=d.div`
  margin-bottom: 12px;
`,ss=d.a`
  font-size: 16px;
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
`,os=d.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,as=d.div`
  font-size: 16px;
  color: #666;
`,is=d.div`
  margin-bottom: 24px;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,cs=d.h3`
  font-size: 18px;
  margin: 0 0 12px 0;
`,ds=d.div`
  margin-bottom: 12px;
`,ls=d.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 6px;
`,us=d.div`
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`,ps=d.div`
  height: 100%;
  background-color: #4caf50;
  border-radius: 4px;
  transition: width 0.3s ease;
  width: ${e=>e.progress*100}%;
`,fs=d.div`
  display: flex;
  gap: 12px;
  font-size: 14px;
  color: #666;
`,Ue=d.div`
  color: ${e=>e.isError?"#e53935":"inherit"};
`,hs=d.div`
  margin-bottom: 24px;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,gs=d.h3`
  font-size: 18px;
  margin: 0 0 12px 0;
`,ms=d.div`
  font-size: 14px;
  margin-bottom: 8px;
`,xs=d.div`
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`,bs=d.div`
  height: 100%;
  background-color: #2196f3;
  border-radius: 4px;
  transition: width 0.3s ease;
`,ys=d.p`
  font-size: 16px;
  margin-bottom: 16px;
  color: #333;
`,vs=d.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 32px;
`,ws=d.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.03);
  width: 160px;
  position: relative;
`,Ss=d.div`
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
`,Ps=d.div`
  position: relative;
  margin-bottom: 8px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`,Is=d.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 6px;
`,js=d.video`
  max-width: 100%;
  max-height: 100%;
  border-radius: 6px;
`,Cs=d.div`
  position: absolute;
  bottom: 4px;
  left: 4px;
  right: 4px;
  height: 4px;
  background-color: rgba(0,0,0,0.2);
  border-radius: 2px;
  overflow: hidden;
`,_s=d.div`
  height: 100%;
  background-color: ${e=>e.status==="processing"?"#ff9800":"#2196f3"};
  transition: width 0.3s ease;
  width: ${e=>e.progress*100}%;
`,ks=d.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 6px;
`,Es=d.div`
  font-size: 12px;
  color: #e53935;
  margin-bottom: 6px;
`,As=d.button`
  background-color: #e53935;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 8px;
  font-size: 12px;
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  margin-top: auto;
  opacity: ${e=>e.disabled?.6:1};
`,$s=d.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`,Sr=d.button`
  padding: 14px 28px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  opacity: ${e=>e.disabled?.6:1};
`,Rs=d(Sr)`
  background-color: #007bff;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
`,Pr=d(Sr)`
  background-color: #8c8c8c;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
`,Ds=d(Pr)`
  color: ${e=>e.passwordSet?"#000000":"white"};
  font-weight: ${e=>e.passwordSet?"bold":"normal"};
`,Ts=d.div`
  margin-top: 12px;
  margin-bottom: 12px;
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,Wt=d.div`
  margin-bottom: 16px;
`,Ht=d.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
`,Ns=d.input`
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-sizing: border-box;
`,Fs=d.textarea`
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  resize: vertical;
`,Os=d.div`
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
`,zs=d.div`
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  ${e=>wr(e.isRTL)}
`,Bs=d.p`
  font-size: 16px;
  margin-bottom: 12px;
`,Us=d.p`
  font-size: 14px;
  margin-bottom: 16px;
  color: #666;
`,Ms=d.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
  text-align: ${e=>e.isRTL?"right":"left"};
`,Ls=d.div`
  color: #e53935;
  margin-bottom: 12px;
`,Gs=d.button`
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
`,Ws=d.button`
  width: 100%;
  padding: 12px;
  background-color: #6c757d;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  opacity: ${e=>e.disabled?.6:1};
`,Hs=d.div`
  margin-top: 24px;
  padding: 16px;
  background-color: #f0f0f0;
  border-radius: 8px;
`,Vs=d.h3`
  margin: 0 0 12px 0;
  font-size: 16px;
`,qs=d.pre`
  margin: 0;
  font-size: 12px;
  white-space: pre-wrap;
  max-height: 200px;
  overflow-y: auto;
`,Ys=d.div`
  margin-bottom: 4px;
`,Ks=d.input`
  display: none;
`,Js=d.div`
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
`,Qs=d.div`
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`,Zs=d.div`
  font-size: 18px;
  font-weight: 500;
  color: white;
  background-color: #888;
  padding: 15px 20px;
  text-align: center;
`,Xs=d.div`
  direction: ${e=>e.isRTL?"rtl":"ltr"};
  padding: 30px;
`,Vt=d.p`
  margin-bottom: 15px;
  font-size: 16px;
`,eo=d.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 25px;
  margin-top: 20px;
  box-sizing: border-box;
`,to=d.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
`,Me=d.div`
  display: flex;
  align-items: center;
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  opacity: ${e=>e.disabled?.7:1};
`,Le=d.input`
  margin-right: 10px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  
  &:disabled {
    cursor: not-allowed;
  }
`,Ge=d.label`
  display: flex;
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  font-size: 16px;
`,ut=d.span`
  color: #aaa;
  margin-left: 8px;
`,ro=d.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`,qt=d.button`
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
`,no=({isOpen:e,onClose:t,initialOption:r="noPassword",initialPassword:n=""})=>{const{t:s,language:o}=Yt(),c=Kt(o)==="rtl",[p,f]=j.useState(r),[h,x]=j.useState(n);if(j.useEffect(()=>{e&&(f(r),x(n))},[e,r,n]),!e)return null;const l=h.trim()==="",y=w=>{w!=="noPassword"&&l||f(w)},v=w=>{w.target===w.currentTarget&&t()};return a.jsx(Js,{onClick:v,children:a.jsxs(Qs,{children:[a.jsx(Zs,{children:s("Album Password Policy")}),a.jsxs(Xs,{isRTL:c,children:[a.jsx(Vt,{children:s("Enter a password for this album.")}),a.jsx(Vt,{children:s("Select what can be done with photos and videos without a password.")}),a.jsx(eo,{type:"text",placeholder:s("Enter password"),value:h,onChange:w=>x(w.target.value),autoCapitalize:"none",autoComplete:"off",spellCheck:"false",autoCorrect:"off"}),a.jsxs(to,{children:[a.jsxs(Me,{disabled:l,children:[a.jsx(Le,{type:"radio",name:"protection",id:"notVisible",checked:p==="notVisible",onChange:()=>{},disabled:l,onClick:()=>!l&&y("notVisible")}),a.jsxs(Ge,{htmlFor:"notVisible",disabled:l,children:[s("Not Visible"),l&&a.jsx(ut,{children:s("Password required")})]})]}),a.jsxs(Me,{disabled:l,children:[a.jsx(Le,{type:"radio",name:"protection",id:"watermark",checked:p==="watermark",onChange:()=>{},disabled:l,onClick:()=>!l&&y("watermark")}),a.jsxs(Ge,{htmlFor:"watermark",disabled:l,children:[s("Watermark"),l&&a.jsx(ut,{children:s("Password required")})]})]}),a.jsxs(Me,{disabled:l,children:[a.jsx(Le,{type:"radio",name:"protection",id:"cannotBeSaved",checked:p==="cannotBeSaved",onChange:()=>{},disabled:l,onClick:()=>!l&&y("cannotBeSaved")}),a.jsxs(Ge,{htmlFor:"cannotBeSaved",disabled:l,children:[s("Cannot Be Saved"),l&&a.jsx(ut,{children:s("Password required")})]})]}),a.jsxs(Me,{disabled:!1,children:[a.jsx(Le,{type:"radio",name:"protection",id:"noPassword",checked:p==="noPassword",onChange:()=>{},onClick:()=>y("noPassword")}),a.jsx(Ge,{htmlFor:"noPassword",disabled:!1,children:s("No Password")})]})]}),a.jsxs(ro,{children:[a.jsx(qt,{onClick:()=>t(),children:s("Cancel")}),a.jsx(qt,{onClick:()=>{console.log(`Saving with option: ${p}, password: ${h.length>0?"********":"none"}`),t(p,h)},children:s("Save")})]})]})]})})};var Ir=(e=>(e.NotVisible="NotVisible",e.Watermark="Watermark",e.CannotBeSaved="CannotBeSaved",e.NoPassword="NoPassword",e))(Ir||{});const so=`
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
`,oo=()=>{const{t:e,language:t}=Yt(),r=Kt(t)==="rtl",[n,s]=j.useState(null),[o,c]=j.useState([]),[p,f]=j.useState([]),[h,x]=j.useState(null),[l,y]=j.useState(null),[v,w]=j.useState(!1),[C,z]=j.useState(""),[$,_]=j.useState(""),[k,A]=j.useState(!1),[D,P]=j.useState(!1),[m,Z]=j.useState({totalFiles:0,filesComplete:0,filesUploading:0,filesProcessing:0,filesWithError:0,overallProgress:0}),[H,V]=j.useState(!1),[Te,Ne]=j.useState(""),[Fe,Oe]=j.useState(""),[ot,Se]=j.useState(!1),[ue,Pe]=j.useState(!1),[F,q]=j.useState("noPassword"),[K,L]=j.useState(""),[Ie,X]=j.useState(null),ne=Yr(f),ae=qr(c);j.useEffect(()=>{pe()},[]),j.useEffect(()=>{o.length>0&&localStorage.setItem(_e.SELECTED_PHOTOS,JSON.stringify(o))},[o]),j.useEffect(()=>{Gr(o,Z)},[o]);const pe=async()=>{V(!1);try{const i=await ke();if(!i)return;try{const u=localStorage.getItem("publicUsername");x(u||null);const g=JSON.parse(atob(i.split(".")[1]))["cognito:username"];g&&(y(g),await ie(g))}catch(u){console.error("User data initialization error:",u)}je(),fe()}catch(i){console.error("Initialization error:",i)}},ie=async i=>{try{const S=new URLSearchParams(window.location.search).get("folderId");if(S){s(S);try{const g=await ee(S);if(g){const T=`${i}_____${i}____Account`,R=g.creatorId===T;if(X(R),R)switch(Se(!0),Ne(g.folderName),Oe(g.folderDescription),g.passwordPolicy){case"NoPassword":q("noPassword");break;case"NotVisible":q("notVisible"),L(g.password);break;case"Watermark":q("watermark"),L(g.password);break;case"CannotBeSaved":q("cannotBeSaved"),L(g.password);break;default:q("noPassword")}else Se(!1)}else X(!1)}catch(g){console.error("Error fetching folder details:",g),X(!1)}}else{const g=`${i}_____${At()}____Folder`;s(g),X(!0),Se(!0)}}catch(u){console.error("Folder ID initialization error:",u),X(!1)}},ee=async i=>{var u,S,g,T;try{const R=await ke();if(!R)return null;const B=await(await fetch(at,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${R}`},body:JSON.stringify({query:so,variables:{folderIds:[i]}})})).json();if(B.errors)return console.error("GraphQL errors:",B.errors),null;const ce=((S=(u=B==null?void 0:B.data)==null?void 0:u.fetchFolders)==null?void 0:S.items)||[];if(ce.length===0)return null;const Ce=ce[0];return{creatorId:Ce.creatorId||"",folderName:Ce.folderName||"",folderDescription:Ce.folderDescription||"",passwordPolicy:((g=Ce.folderPassword)==null?void 0:g.policy)||"NoPassword",password:((T=Ce.folderPassword)==null?void 0:T.password)||""}}catch(R){return console.error("Error in fetchFolderDetails:",R),null}},je=()=>{try{const i=localStorage.getItem(_e.SELECTED_PHOTOS);if(i)try{const u=JSON.parse(i);Array.isArray(u)&&u.length>0&&c(u)}catch(u){console.error("Error parsing stored photos:",u)}}catch(i){console.error("Error restoring photos from storage:",i)}},fe=()=>{try{Wr||console.error("S3 client not available")}catch(i){console.error("S3 connection test error:",i)}},J=i=>{const u=o.filter((S,g)=>g!==i);c(u),u.length>0?localStorage.setItem(_e.SELECTED_PHOTOS,JSON.stringify(u)):localStorage.removeItem(_e.SELECTED_PHOTOS)},jr=async i=>{if(!l)return;const u=Array.from(i.target.files||[]);if(u.length)try{const S=Cr(u);c(R=>[...R,...S]);const g=o.length,T=await Vr(u,l,(R,M,B,ce)=>{ae(g+R,M,B,ce)},ne);_r(g,T)}catch(S){console.error("Error in handleAddPhotos:",S)}finally{i.target.value=""}},Cr=i=>i.map(u=>{const S=u.type,g=u.name.split(".").pop()||"jpg";return{fileName:`${At()}.${g}`,s3PreviewUrl:URL.createObjectURL(u),type:S,size:u.size,status:"pending",progress:0}}),_r=(i,u)=>{c(S=>{const g=[...S];return u.forEach((T,R)=>{const M=i+R;M<g.length&&(g[M]=T)}),g})},kr=async()=>{V(!0);try{if(h!=null&&h.startsWith("Profile-")){z(h),w(!0),V(!1);return}kt()}catch(i){console.error("Error in handleSaveAlbum:",i),V(!1)}},kt=async()=>{V(!0);try{if(!await Er()){V(!1);return}const i=o.filter(B=>B.status==="complete"),u=Math.floor(Date.now()/1e3),S=`${l}_____${l}____Account`,T=n.split("_____")[1].split("____")[0];await Kr(i,Ar,ne);const R=$r(u,S,T,i),M=Rr(i,u,S);await Dr(R,M)}catch(i){console.error("Error in saveAlbumDirectly:",i),V(!1)}},Er=async()=>!(!await ke()||!l||!n),Ar=i=>{const u=document.getElementById("saveProgress");u&&(u.style.width=`${i}%`)},$r=(i,u,S,g)=>({currentTime:i,folderId:n,profileIds:["Only Me_____Only Me____Profile"],folderPositionSelectedTagInputs:[],folderPositionPoints:1,acceptedFileReferenceIds:g.map(T=>`${S}_____${T.fileName}____FileReference`),hiddenFileReferenceIds:[],folderInput:{folderSelectedTagInputs:[],folderAboutContactIds:[u],folderName:Te,folderDescription:Fe,folderPasswordInput:{password:F!=="noPassword"?K:null,policy:Ir[F.charAt(0).toUpperCase()+F.slice(1)]},folderInviteParametersInput:{folderIsOnlyVisibleThroughCode:!0,folderInviteHasBeenDisabled:!1,usingFolderInviteGrantsRightToRemoveItems:!1,tagContactIdUsingFolderInviteAsFolderAboutContact:!0,usingFolderInviteGrantsRightToAddItems:!0,addedItemsNeedFolderCreatorApproval:!1}}}),Rr=(i,u,S)=>i.map(g=>{var M;const T=g.type==="video"||(M=g.type)!=null&&M.startsWith("video")?`Input/Video/${g.fileName}`:`Input/Image/${g.fileName}`,R=`${l}_____${g.fileName}____File`;return{fileReferencesHolderId:n,currentTime:u,points:1,hasBeenDeleted:!1,selectedTagInputs:[],fileId:R,fileInput:{fileId:R,ownerFileInput:{editorContactIds:[S],FileSharingOptionsEnum:"Anyone",dataKey:T,thumbnailDataKey:g.thumbnailDataKey,dataInBytes:g.size,thumbnailDataInBytes:g.thumbnailSize||0,s3UploadedAt:u,durationInSeconds:g.duration},editorFileInput:{aboutContactIds:[S],captionText:"",numericFilterInputs:[]}}}}),Dr=async(i,u)=>{const S=document.getElementById("saveProgressText");S&&(S.innerText=e("Finalizing album..."));const g=await ke();if(!g){V(!1);return}const T=`
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
    `,R={folderPositionInputs:[i],updatedFileReferenceInputs:u},B=await(await fetch(at,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${g}`},body:JSON.stringify({query:T,variables:R})})).json();B.errors?(console.error("Upload failed:",B.errors),V(!1)):Tr()},Tr=()=>{Jr(c,Z,[_e.SELECTED_PHOTOS],ne);const i=document.getElementById("saveProgressText");i&&(i.innerText=e("Album saved successfully!")),sessionStorage.setItem("album_just_saved","true"),setTimeout(()=>{window.location.href="/my-albums.html"},1e3)},Nr=i=>/^[a-zA-Z0-9-]+$/.test(i),Et=async i=>{var T,R;P(!0),_("");const u=await ke();if(!u){P(!1);return}const S=`
      mutation MyMutation($savePublicProfileDisplayNameInput: SavePublicProfileDisplayNameInput) {
        changeMyAccountItem(savePublicProfileDisplayNameInput: $savePublicProfileDisplayNameInput) {
          ... on Profile {
            anyDisplayName
          }
        }
      }
    `,g={savePublicProfileDisplayNameInput:{anyDisplayName:i}};try{const B=await(await fetch(at,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${u}`},body:JSON.stringify({query:S,variables:g})})).json(),ce=(R=(T=B==null?void 0:B.data)==null?void 0:T.changeMyAccountItem)==null?void 0:R.anyDisplayName;if(ce)Fr(ce);else throw new Error("Username taken")}catch{_(e("Username is already taken. Please try a different one.")),A(!0),P(!1)}},Fr=i=>{localStorage.setItem("publicUsername",i),x(i),w(!1),kt()},Or=()=>{const i=Math.floor(1e5+Math.random()*9e5).toString(),u=`${C}${i}`;z(u),Et(u)},zr=(i,u)=>{i&&q(i),u!==void 0&&L(u),Pe(!1)},Br=()=>F==="noPassword"?e("Album Password Policy"):`${e(F==="notVisible"?"Not Visible":F==="watermark"?"Watermark":"Cannot Be Saved")} ${K?`(${K})`:""}`,Ur=()=>{Pe(!0)};return a.jsxs(a.Fragment,{children:[a.jsx(Xn,{}),a.jsxs(es,{isRTL:r,children:[a.jsxs(ts,{children:[a.jsxs(rs,{children:[a.jsx(ns,{children:a.jsx(ss,{href:"/my-albums.html",children:e("My Albums")})}),h&&a.jsxs(os,{children:[a.jsx(as,{children:h}),a.jsx(Hr,{t:e})]})]}),m.totalFiles>0&&a.jsxs(is,{children:[a.jsx(cs,{children:e("Upload Progress")}),a.jsxs(ds,{children:[a.jsxs(ls,{children:[a.jsxs("span",{children:[e("Overall Progress"),": ",Math.round(m.overallProgress*100),"%"]}),a.jsxs("span",{children:[m.filesComplete," ",e("of")," ",m.totalFiles," ",e("complete")]})]}),a.jsx(us,{children:a.jsx(ps,{progress:m.overallProgress})})]}),a.jsxs(fs,{children:[m.filesUploading>0&&a.jsxs(Ue,{children:[e("Uploading"),": ",m.filesUploading]}),m.filesProcessing>0&&a.jsxs(Ue,{children:[e("Processing"),": ",m.filesProcessing]}),m.filesComplete>0&&a.jsxs(Ue,{children:[e("Complete"),": ",m.filesComplete]}),m.filesWithError>0&&a.jsxs(Ue,{isError:!0,children:[e("Failed"),": ",m.filesWithError]})]})]}),H&&a.jsxs(hs,{children:[a.jsx(gs,{children:e("Saving Album")}),a.jsx(ms,{id:"saveProgressText",children:e("Moving files...")}),a.jsx(xs,{children:a.jsx(bs,{id:"saveProgress",style:{width:"5%"}})})]}),a.jsx(Ks,{id:"file-input",type:"file",accept:"image/*,video/*",multiple:!0,onChange:jr}),o.length>0&&a.jsxs(a.Fragment,{children:[a.jsxs(ys,{children:[o.length," ",o.length>1?e("photos selected"):e("photo selected"),":"]}),a.jsx(vs,{children:o.map((i,u)=>{var S,g;return a.jsxs(ws,{children:[a.jsx(Ss,{status:i.status,children:i.status==="complete"?"✓":i.status==="error"?"✕":i.status==="uploading"?"↑":i.status==="processing"?"⚙️":"•"}),a.jsxs(Ps,{children:[i.type==="video"||(S=i.type)!=null&&S.startsWith("video")?a.jsx(js,{src:i.s3PreviewUrl,controls:!0}):a.jsx(Is,{src:i.s3PreviewUrl,alt:i.fileName}),(i.status==="uploading"||i.status==="processing")&&a.jsx(Cs,{children:a.jsx(_s,{progress:i.progress,status:i.status})})]}),a.jsxs(ks,{children:[(g=i.type)!=null&&g.startsWith("video")?e("Video"):e("Image"),i.size&&` • ${(i.size/1024/1024).toFixed(1)} MB`,i.duration&&` • ${i.duration}s`]}),i.status==="error"&&i.errorMessage&&a.jsxs(Es,{children:[e("Error"),": ",i.errorMessage.length>40?i.errorMessage.substring(0,37)+"...":i.errorMessage]}),a.jsx(As,{onClick:()=>J(u),disabled:H,children:e("Remove")})]},u)})})]}),a.jsxs($s,{children:[ot&&Ie===!0&&a.jsxs(Ts,{children:[a.jsxs(Wt,{children:[a.jsx(Ht,{htmlFor:"folderName",children:e("Album Name (Optional)")}),a.jsx(Ns,{id:"folderName",type:"text",value:Te,onChange:i=>Ne(i.target.value),placeholder:e("Enter album name")})]}),a.jsxs(Wt,{children:[a.jsx(Ht,{htmlFor:"folderDescription",children:e("Album Description (Optional)")}),a.jsx(Fs,{id:"folderDescription",value:Fe,onChange:i=>Oe(i.target.value),placeholder:e("Enter album description"),rows:4})]})]}),a.jsx(Pr,{onClick:()=>{const i=document.getElementById("file-input");i==null||i.click()},disabled:H,children:e("Add More Photos")}),Ie===!0&&a.jsx(Ds,{passwordSet:F!=="noPassword",onClick:Ur,disabled:H,children:Br()}),a.jsx(Rs,{onClick:kr,disabled:H,children:e(H?"Saving Album...":"Save Album")})]}),v&&a.jsx(Os,{children:a.jsxs(zs,{isRTL:r,children:[a.jsx(Bs,{children:e("Enter Username")}),a.jsx(Us,{children:e("Username should contain only letters, numbers and hyphens. Example: john-doe2")}),a.jsx(Ms,{value:C,onChange:i=>z(i.target.value),isRTL:r}),$&&a.jsx(Ls,{children:$}),a.jsx(Gs,{disabled:D,onClick:()=>{if(!Nr(C)){_(e("Username must contain only letters, numbers, and hyphens."));return}Et(C)},children:e("Select Username")}),k&&a.jsx(Ws,{disabled:D,onClick:Or,children:e("Add Random Digits to Username")})]})}),ue&&a.jsx(no,{isOpen:ue,onClose:zr,initialOption:F,initialPassword:K})]}),p.length>0&&a.jsxs(Hs,{children:[a.jsx(Vs,{children:e("Debug Log")}),a.jsx(qs,{children:p.map((i,u)=>a.jsx(Ys,{children:i},u))})]})]})]})},ao=()=>a.jsx(Lr,{children:a.jsx(oo,{})});Mr.createRoot(document.getElementById("root")).render(a.jsx(ao,{}));
