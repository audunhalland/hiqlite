import{a7 as ve,t as ce,ao as R,v as p,y as $,w as V,p as de,ak as z,H as pe,x as F,z as q,D as w,A as U,B as Y,C as he,ap as me,q as ge,j as J,aq as E,g as W,ar as P,as as _e,O as xe,d as X,at as be,aj as Z,au as ye,av as Le,ab as I,ag as ke,aw as Ce,aa as we,ax as Ae,ay as Se,r as Te}from"./runtime.Blj131-X.js";import{w as $e}from"./index.BdLFUWS_.js";import{a as qe}from"./props.DuX1E6kY.js";let j=null;function Ee(e,t){return t}function Pe(e,t,n,a){for(var s=[],v=t.length,o=0;o<v;o++)be(t[o].e,s,!0);var x=v>0&&s.length===0&&n!==null;if(x){var g=n.parentNode;Z(g),g.append(n),a.clear(),k(e,t[0].prev,t[v-1].next)}ye(s,()=>{for(var h=0;h<v;h++){var c=t[h];x||(a.delete(c.k),k(e,c.prev,c.next)),Le(c.e,!x)}})}function je(e,t,n,a,s,v=null){var o=e,x={flags:t,items:new Map,first:null},g=(t&R)!==0;if(g){var h=e;o=p?$(I(h)):h.appendChild(ve())}p&&V();var c=null;ce(()=>{var r=n(),d=de(r)?r:r==null?[]:z(r),u=d.length;let f=!1;if(p){var _=o.data===pe;_!==(u===0)&&(o=F(),$(o),q(!1),f=!0)}if(p){for(var b=null,y,m=0;m<u;m++){if(w.nodeType===8&&w.data===ke){o=w,f=!0,q(!1);break}var l=d[m],i=a(l,m);y=ee(w,x,b,null,l,i,m,s,t),x.items.set(i,y),b=y}u>0&&$(F())}p||Oe(d,x,o,s,t,a),v!==null&&(u===0?c?U(c):c=Y(()=>v(o)):c!==null&&he(c,()=>{c=null})),f&&q(!0)}),p&&(o=w)}function Oe(e,t,n,a,s,v){var H,K,M,N;var o=(s&Ce)!==0,x=(s&(E|P))!==0,g=e.length,h=t.items,c=t.first,r=c,d,u=null,f,_=[],b=[],y,m,l,i;if(o)for(i=0;i<g;i+=1)y=e[i],m=v(y,i),l=h.get(m),l!==void 0&&((H=l.a)==null||H.measure(),(f??(f=new Set)).add(l));for(i=0;i<g;i+=1){if(y=e[i],m=v(y,i),l=h.get(m),l===void 0){var oe=r?r.e.nodes_start:n;u=ee(oe,t,u,u===null?t.first:u.next,y,m,i,a,s),h.set(m,u),_=[],b=[],r=u.next;continue}if(x&&Be(l,y,i,s),l.e.f&me&&(U(l.e),o&&((K=l.a)==null||K.unfix(),(f??(f=new Set)).delete(l))),l!==r){if(d!==void 0&&d.has(l)){if(_.length<b.length){var A=b[0],L;u=A.prev;var G=_[0],S=_[_.length-1];for(L=0;L<_.length;L+=1)te(_[L],A,n);for(L=0;L<b.length;L+=1)d.delete(b[L]);k(t,G.prev,S.next),k(t,u,G),k(t,S,A),r=A,u=S,i-=1,_=[],b=[]}else d.delete(l),te(l,r,n),k(t,l.prev,l.next),k(t,l,u===null?t.first:u.next),k(t,u,l),u=l;continue}for(_=[],b=[];r!==null&&r.k!==m;)(d??(d=new Set)).add(r),b.push(r),r=r.next;if(r===null)continue;l=r}_.push(l),u=l,r=l.next}if(r!==null||d!==void 0){for(var C=d===void 0?[]:z(d);r!==null;)C.push(r),r=r.next;var T=C.length;if(T>0){var fe=s&R&&g===0?n:null;if(o){for(i=0;i<T;i+=1)(M=C[i].a)==null||M.measure();for(i=0;i<T;i+=1)(N=C[i].a)==null||N.fix()}Pe(t,C,fe,h)}}o&&ge(()=>{var Q;if(f!==void 0)for(l of f)(Q=l.a)==null||Q.apply()}),J.first=t.first&&t.first.e,J.last=u&&u.e}function Be(e,t,n,a){a&E&&W(e.v,t),a&P?W(e.i,n):e.i=n}function ee(e,t,n,a,s,v,o,x,g){var h=j;try{var c=(g&E)!==0,r=(g&_e)===0,d=c?r?xe(s):X(s):s,u=g&P?X(o):o,f={i:u,v:d,k:v,a:null,e:null,prev:n,next:a};return j=f,f.e=Y(()=>x(e,d,u),p),f.e.prev=n&&n.e,f.e.next=a&&a.e,n===null?t.first=f:(n.next=f,n.e.next=f.e),a!==null&&(a.prev=f,a.e.prev=f.e),f}finally{j=h}}function te(e,t,n){for(var a=e.next?e.next.e.nodes_start:n,s=t?t.e.nodes_start:n,v=e.e.nodes_start;v!==a;){var o=we(v);s.before(v),v=o}}function k(e,t,n){t===null?e.first=n:(t.next=n,t.e.next=n&&n.e),n!==null&&(n.prev=t,n.e.prev=t&&t.e)}function De(e,t,n,a){p&&V(),t===void 0||t(e,n)}function Ge(e){p&&I(e)!==null&&Z(e)}let ne=!1;function ae(){ne||(ne=!0,document.addEventListener("reset",e=>{Promise.resolve().then(()=>{var t;if(!e.defaultPrevented)for(const n of e.target.elements)(t=n.__on_r)==null||t.call(n)})},{capture:!0}))}function He(e){if(p){var t=!1,n=()=>{if(!t){if(t=!0,e.hasAttribute("value")){var a=e.value;O(e,"value",null),e.value=a}if(e.hasAttribute("checked")){var s=e.checked;O(e,"checked",null),e.checked=s}}};e.__on_r=n,Ae(n),ae()}}function O(e,t,n,a){n=n==null?null:n+"";var s=e.__attributes??(e.__attributes={});p&&(s[t]=e.getAttribute(t),t==="src"||t==="srcset"||t==="href"&&e.nodeName==="LINK")||s[t]!==(s[t]=n)&&(t==="loading"&&(e[Se]=n),n===null?e.removeAttribute(t):e.setAttribute(t,n))}function Ke(e,t){var n=e.__className,a=Me(t);p&&e.className===a?e.__className=a:(n!==a||p&&e.className!==a)&&(t==null?e.removeAttribute("class"):e.className=a,e.__className=a)}function Me(e){return e??""}function Ne(e,t,n){if(n){if(e.classList.contains(t))return;e.classList.add(t)}else{if(!e.classList.contains(t))return;e.classList.remove(t)}}function Qe(e,t,n,a=n){e.addEventListener(t,n);const s=e.__on_r;s?e.__on_r=()=>{s(),a()}:e.__on_r=a,ae()}function Re(e,t,n){Qe(e,"input",()=>{n(se(e)?le(e.value):e.value)}),Te(()=>{var a=t();if(p&&e.defaultValue!==e.value){n(e.value);return}se(e)&&a===le(e.value)||e.type==="date"&&!a&&!e.value||(e.value=a??"")})}function se(e){var t=e.type;return t==="number"||t==="range"}function le(e){return e===""?null:+e}function Ve(e){var n;var t=(n=e.$$slots)==null?void 0:n.default;return t===!0?e.children:t}const re=$e(void 0),B="/dashboard/api";async function ze(e){let t=await fetch(`${B}${e}`,{method:"GET"});return D(t)}async function Fe(e,t){let n=await fetch(`${B}${e}`,{method:"POST",body:t});return D(n)}function D(e){return e.status===401&&re.set(void 0),e}const ue=`-- comments will be ignored but only a single query is allowed
-- press CTRL + Enter to execute
SELECT 1`,ie={id:"SELECT 1",query:ue},Ue="--!auto-query";let Ye=qe([ie]);const Je=e=>{let t="";const n=e||8;for(let a=0;a<n;a+=1){let s=60;for(;s>57&&s<65||s>90&&s<97;)s=Math.floor(Math.random()*74)+48;t=t.concat(String.fromCharCode(s))}return t};export{Ue as A,ue as D,Ye as Q,De as a,Re as b,Ke as c,Ve as d,je as e,Fe as f,Je as g,ie as h,Ee as i,D as j,He as k,B as l,re as m,ze as n,Ge as r,O as s,Ne as t};