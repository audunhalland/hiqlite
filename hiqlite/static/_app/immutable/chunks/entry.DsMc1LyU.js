var st,it;import{a5 as lt}from"./runtime.5e4YztcE.js";import{w as ie}from"./index.B2GT7aTr.js";new URL("sveltekit-internal://");function ct(e,r){return e==="/"||r==="ignore"?e:r==="never"?e.endsWith("/")?e.slice(0,-1):e:r==="always"&&!e.endsWith("/")?e+"/":e}function ut(e){return e.split("%25").map(decodeURI).join("%25")}function ft(e){for(const r in e)e[r]=decodeURIComponent(e[r]);return e}function le({href:e}){return e.split("#")[0]}const dt=["href","pathname","search","toString","toJSON"];function pt(e,r,t){const n=new URL(e);Object.defineProperty(n,"searchParams",{value:new Proxy(n.searchParams,{get(a,o){if(o==="get"||o==="getAll"||o==="has")return s=>(t(s),a[o](s));r();const i=Reflect.get(a,o);return typeof i=="function"?i.bind(a):i}}),enumerable:!0,configurable:!0});for(const a of dt)Object.defineProperty(n,a,{get(){return r(),e[a]},enumerable:!0,configurable:!0});return n}const ht="/__data.json",mt=".html__data.json";function gt(e){return e.endsWith(".html")?e.replace(/\.html$/,mt):e.replace(/\/$/,"")+ht}function yt(...e){let r=5381;for(const t of e)if(typeof t=="string"){let n=t.length;for(;n;)r=r*33^t.charCodeAt(--n)}else if(ArrayBuffer.isView(t)){const n=new Uint8Array(t.buffer,t.byteOffset,t.byteLength);let a=n.length;for(;a;)r=r*33^n[--a]}else throw new TypeError("value must be a string or TypedArray");return(r>>>0).toString(36)}function wt(e){const r=atob(e),t=new Uint8Array(r.length);for(let n=0;n<r.length;n++)t[n]=r.charCodeAt(n);return t.buffer}const xe=window.fetch;window.fetch=(e,r)=>((e instanceof Request?e.method:(r==null?void 0:r.method)||"GET")!=="GET"&&V.delete(ce(e)),xe(e,r));const V=new Map;function vt(e,r){const t=ce(e,r),n=document.querySelector(t);if(n!=null&&n.textContent){let{body:a,...o}=JSON.parse(n.textContent);const i=n.getAttribute("data-ttl");return i&&V.set(t,{body:a,init:o,ttl:1e3*Number(i)}),n.getAttribute("data-b64")!==null&&(a=wt(a)),Promise.resolve(new Response(a,o))}return window.fetch(e,r)}function bt(e,r,t){if(V.size>0){const n=ce(e,t),a=V.get(n);if(a){if(performance.now()<a.ttl&&["default","force-cache","only-if-cached",void 0].includes(t==null?void 0:t.cache))return new Response(a.body,a.init);V.delete(n)}}return window.fetch(r,t)}function ce(e,r){let t=`script[data-sveltekit-fetched][data-url=${JSON.stringify(e instanceof Request?e.url:e)}]`;if(r!=null&&r.headers||r!=null&&r.body){const n=[];r.headers&&n.push([...new Headers(r.headers)].join(",")),r.body&&(typeof r.body=="string"||ArrayBuffer.isView(r.body))&&n.push(r.body),t+=`[data-hash="${yt(...n)}"]`}return t}const kt=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function At(e){const r=[];return{pattern:e==="/"?/^\/$/:new RegExp(`^${Et(e).map(t=>{const n=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(t);if(n)return r.push({name:n[1],matcher:n[2],optional:!1,rest:!0,chained:!0}),"(?:/(.*))?";const a=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(t);if(a)return r.push({name:a[1],matcher:a[2],optional:!0,rest:!1,chained:!0}),"(?:/([^/]+))?";if(!t)return;const o=t.split(/\[(.+?)\](?!\])/);return"/"+o.map((i,s)=>{if(s%2){if(i.startsWith("x+"))return ue(String.fromCharCode(parseInt(i.slice(2),16)));if(i.startsWith("u+"))return ue(String.fromCharCode(...i.slice(2).split("-").map(d=>parseInt(d,16))));const l=kt.exec(i),[,u,f,h,p]=l;return r.push({name:h,matcher:p,optional:!!u,rest:!!f,chained:f?s===1&&o[0]==="":!1}),f?"(.*?)":u?"([^/]*)?":"([^/]+?)"}return ue(i)}).join("")}).join("")}/?$`),params:r}}function St(e){return!/^\([^)]+\)$/.test(e)}function Et(e){return e.slice(1).split("/").filter(St)}function Rt(e,r,t){const n={},a=e.slice(1),o=a.filter(s=>s!==void 0);let i=0;for(let s=0;s<r.length;s+=1){const l=r[s];let u=a[s-i];if(l.chained&&l.rest&&i&&(u=a.slice(s-i,s+1).filter(f=>f).join("/"),i=0),u===void 0){l.rest&&(n[l.name]="");continue}if(!l.matcher||t[l.matcher](u)){n[l.name]=u;const f=r[s+1],h=a[s+1];f&&!f.rest&&f.optional&&h&&l.chained&&(i=0),!f&&!h&&Object.keys(n).length===o.length&&(i=0);continue}if(l.optional&&l.chained){i++;continue}return}if(!i)return n}function ue(e){return e.normalize().replace(/[[\]]/g,"\\$&").replace(/%/g,"%25").replace(/\//g,"%2[Ff]").replace(/\?/g,"%3[Ff]").replace(/#/g,"%23").replace(/[.*+?^${}()|\\]/g,"\\$&")}function xt({nodes:e,server_loads:r,dictionary:t,matchers:n}){const a=new Set(r);return Object.entries(t).map(([s,[l,u,f]])=>{const{pattern:h,params:p}=At(s),d={id:s,exec:y=>{const c=h.exec(y);if(c)return Rt(c,p,n)},errors:[1,...f||[]].map(y=>e[y]),layouts:[0,...u||[]].map(i),leaf:o(l)};return d.errors.length=d.layouts.length=Math.max(d.errors.length,d.layouts.length),d});function o(s){const l=s<0;return l&&(s=~s),[l,e[s]]}function i(s){return s===void 0?s:[a.has(s),e[s]]}}function _e(e,r=JSON.parse){try{return r(sessionStorage[e])}catch{}}function Ue(e,r,t=JSON.stringify){const n=t(r);try{sessionStorage[e]=n}catch{}}const x=((st=globalThis.__sveltekit_wx9hef)==null?void 0:st.base)??"/dashboard",_t=((it=globalThis.__sveltekit_wx9hef)==null?void 0:it.assets)??x,Ut="1728985995096",Ce="sveltekit:snapshot",Le="sveltekit:scroll",Pe="sveltekit:states",Ct="sveltekit:pageurl",O="sveltekit:history",F="sveltekit:navigation",H={tap:1,hover:2,viewport:3,eager:4,off:-1,false:-1},q=location.origin;function je(e){if(e instanceof URL)return e;let r=document.baseURI;if(!r){const t=document.getElementsByTagName("base");r=t.length?t[0].href:document.URL}return new URL(e,r)}function fe(){return{x:pageXOffset,y:pageYOffset}}function T(e,r){return e.getAttribute(`data-sveltekit-${r}`)}const Ie={...H,"":H.hover};function Oe(e){let r=e.assignedSlot??e.parentNode;return(r==null?void 0:r.nodeType)===11&&(r=r.host),r}function Te(e,r){for(;e&&e!==r;){if(e.nodeName.toUpperCase()==="A"&&e.hasAttribute("href"))return e;e=Oe(e)}}function de(e,r){let t;try{t=new URL(e instanceof SVGAElement?e.href.baseVal:e.href,document.baseURI)}catch{}const n=e instanceof SVGAElement?e.target.baseVal:e.target,a=!t||!!n||z(t,r)||(e.getAttribute("rel")||"").split(/\s+/).includes("external"),o=(t==null?void 0:t.origin)===q&&e.hasAttribute("download");return{url:t,external:a,target:n,download:o}}function K(e){let r=null,t=null,n=null,a=null,o=null,i=null,s=e;for(;s&&s!==document.documentElement;)n===null&&(n=T(s,"preload-code")),a===null&&(a=T(s,"preload-data")),r===null&&(r=T(s,"keepfocus")),t===null&&(t=T(s,"noscroll")),o===null&&(o=T(s,"reload")),i===null&&(i=T(s,"replacestate")),s=Oe(s);function l(u){switch(u){case"":case"true":return!0;case"off":case"false":return!1;default:return}}return{preload_code:Ie[n??"off"],preload_data:Ie[a??"off"],keepfocus:l(r),noscroll:l(t),reload:l(o),replace_state:l(i)}}function $e(e){const r=ie(e);let t=!0;function n(){t=!0,r.update(i=>i)}function a(i){t=!1,r.set(i)}function o(i){let s;return r.subscribe(l=>{(s===void 0||t&&l!==s)&&i(s=l)})}return{notify:n,set:a,subscribe:o}}function Lt(){const{set:e,subscribe:r}=ie(!1);let t;async function n(){clearTimeout(t);try{const a=await fetch(`${_t}/_app/version.json`,{headers:{pragma:"no-cache","cache-control":"no-cache"}});if(!a.ok)return!1;const o=(await a.json()).version!==Ut;return o&&(e(!0),clearTimeout(t)),o}catch{return!1}}return{subscribe:r,check:n}}function z(e,r){return e.origin!==q||!e.pathname.startsWith(r)}function Ne(e){const r=jt(e),t=new ArrayBuffer(r.length),n=new DataView(t);for(let a=0;a<t.byteLength;a++)n.setUint8(a,r.charCodeAt(a));return t}const Pt="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";function jt(e){e.length%4===0&&(e=e.replace(/==?$/,""));let r="",t=0,n=0;for(let a=0;a<e.length;a++)t<<=6,t|=Pt.indexOf(e[a]),n+=6,n===24&&(r+=String.fromCharCode((t&16711680)>>16),r+=String.fromCharCode((t&65280)>>8),r+=String.fromCharCode(t&255),t=n=0);return n===12?(t>>=4,r+=String.fromCharCode(t)):n===18&&(t>>=2,r+=String.fromCharCode((t&65280)>>8),r+=String.fromCharCode(t&255)),r}const It=-1,Ot=-2,Tt=-3,$t=-4,Nt=-5,Dt=-6;function Bt(e,r){if(typeof e=="number")return a(e,!0);if(!Array.isArray(e)||e.length===0)throw new Error("Invalid input");const t=e,n=Array(t.length);function a(o,i=!1){if(o===It)return;if(o===Tt)return NaN;if(o===$t)return 1/0;if(o===Nt)return-1/0;if(o===Dt)return-0;if(i)throw new Error("Invalid input");if(o in n)return n[o];const s=t[o];if(!s||typeof s!="object")n[o]=s;else if(Array.isArray(s))if(typeof s[0]=="string"){const l=s[0],u=r==null?void 0:r[l];if(u)return n[o]=u(a(s[1]));switch(l){case"Date":n[o]=new Date(s[1]);break;case"Set":const f=new Set;n[o]=f;for(let d=1;d<s.length;d+=1)f.add(a(s[d]));break;case"Map":const h=new Map;n[o]=h;for(let d=1;d<s.length;d+=2)h.set(a(s[d]),a(s[d+1]));break;case"RegExp":n[o]=new RegExp(s[1],s[2]);break;case"Object":n[o]=Object(s[1]);break;case"BigInt":n[o]=BigInt(s[1]);break;case"null":const p=Object.create(null);n[o]=p;for(let d=1;d<s.length;d+=2)p[s[d]]=a(s[d+1]);break;case"Int8Array":case"Uint8Array":case"Uint8ClampedArray":case"Int16Array":case"Uint16Array":case"Int32Array":case"Uint32Array":case"Float32Array":case"Float64Array":case"BigInt64Array":case"BigUint64Array":{const d=globalThis[l],y=s[1],c=Ne(y),g=new d(c);n[o]=g;break}case"ArrayBuffer":{const d=s[1],y=Ne(d);n[o]=y;break}default:throw new Error(`Unknown type ${l}`)}}else{const l=new Array(s.length);n[o]=l;for(let u=0;u<s.length;u+=1){const f=s[u];f!==Ot&&(l[u]=a(f))}}else{const l={};n[o]=l;for(const u in s){const f=s[u];l[u]=a(f)}}return n[o]}return a(0)}const De=new Set(["load","prerender","csr","ssr","trailingSlash","config"]);[...De];const Vt=new Set([...De]);[...Vt];function Ft(e){return e.filter(r=>r!=null)}class X{constructor(r,t){this.status=r,typeof t=="string"?this.body={message:t}:t?this.body=t:this.body={message:`Error: ${r}`}}toString(){return JSON.stringify(this.body)}}class Be{constructor(r,t){this.status=r,this.location=t}}class pe extends Error{constructor(r,t,n){super(n),this.status=r,this.text=t}}const qt="x-sveltekit-invalidated",Wt="x-sveltekit-trailing-slash";function Y(e){return e instanceof X||e instanceof pe?e.status:500}function Mt(e){return e instanceof pe?e.text:"Internal Error"}const I=_e(Le)??{},W=_e(Ce)??{},P={url:$e({}),page:$e({}),navigating:ie(null),updated:Lt()};function he(e){I[e]=fe()}function Jt(e,r){let t=e+1;for(;I[t];)delete I[t],t+=1;for(t=r+1;W[t];)delete W[t],t+=1}function $(e){return location.href=e.href,new Promise(()=>{})}async function Ve(){if("serviceWorker"in navigator){const e=await navigator.serviceWorker.getRegistration(x||"/");e&&await e.update()}}function Fe(){}let Z,me,Q,j,ge,N;const qe=[],ee=[];let _=null;const We=[],Gt=[];let D=[],w={branch:[],error:null,url:null},ye=!1,te=!1,Me=!0,M=!1,J=!1,Je=!1,we=!1,ve,E,U,C,re;const G=new Set;async function Ht(e,r,t){var a,o;document.URL!==location.href&&(location.href=location.href),N=e,Z=xt(e),j=document.documentElement,ge=r,me=e.nodes[0],Q=e.nodes[1],me(),Q(),E=(a=history.state)==null?void 0:a[O],U=(o=history.state)==null?void 0:o[F],E||(E=U=Date.now(),history.replaceState({...history.state,[O]:E,[F]:U},""));const n=I[E];n&&(history.scrollRestoration="manual",scrollTo(n.x,n.y)),t?await tr(ge,t):Qt(location.href,{replaceState:!0}),er()}function Kt(){qe.length=0,we=!1}function Ge(e){ee.some(r=>r==null?void 0:r.snapshot)&&(W[e]=ee.map(r=>{var t;return(t=r==null?void 0:r.snapshot)==null?void 0:t.capture()}))}function He(e){var r;(r=W[e])==null||r.forEach((t,n)=>{var a,o;(o=(a=ee[n])==null?void 0:a.snapshot)==null||o.restore(t)})}function Ke(){he(E),Ue(Le,I),Ge(U),Ue(Ce,W)}async function ze(e,r,t,n){return oe({type:"goto",url:je(e),keepfocus:r.keepFocus,noscroll:r.noScroll,replace_state:r.replaceState,state:r.state,redirect_count:t,nav_token:n,accept:()=>{r.invalidateAll&&(we=!0)}})}async function zt(e){if(e.id!==(_==null?void 0:_.id)){const r={};G.add(r),_={id:e.id,token:r,promise:Qe({...e,preload:r}).then(t=>(G.delete(r),t.type==="loaded"&&t.state.error&&(_=null),t))}}return _.promise}async function be(e){const r=Z.find(t=>t.exec(et(e)));r&&await Promise.all([...r.layouts,r.leaf].map(t=>t==null?void 0:t[1]()))}function Xe(e,r,t){var o;w=e.state;const n=document.querySelector("style[data-sveltekit]");n&&n.remove(),C=e.props.page,ve=new N.root({target:r,props:{...e.props,stores:P,components:ee},hydrate:t,sync:!1}),He(U);const a={from:null,to:{params:w.params,route:{id:((o=w.route)==null?void 0:o.id)??null},url:new URL(location.href)},willUnload:!1,type:"enter",complete:Promise.resolve()};D.forEach(i=>i(a)),te=!0}function ne({url:e,params:r,branch:t,status:n,error:a,route:o,form:i}){let s="never";if(x&&(e.pathname===x||e.pathname===x+"/"))s="always";else for(const p of t)(p==null?void 0:p.slash)!==void 0&&(s=p.slash);e.pathname=ct(e.pathname,s),e.search=e.search;const l={type:"loaded",state:{url:e,params:r,branch:t,error:a,route:o},props:{constructors:Ft(t).map(p=>p.node.component),page:C}};i!==void 0&&(l.props.form=i);let u={},f=!C,h=0;for(let p=0;p<Math.max(t.length,w.branch.length);p+=1){const d=t[p],y=w.branch[p];(d==null?void 0:d.data)!==(y==null?void 0:y.data)&&(f=!0),d&&(u={...u,...d.data},f&&(l.props[`data_${h}`]=u),h+=1)}return(!w.url||e.href!==w.url.href||w.error!==a||i!==void 0&&i!==C.form||f)&&(l.props.page={error:a,params:r,route:{id:(o==null?void 0:o.id)??null},state:{},status:n,url:new URL(e),form:i??null,data:f?u:C.data}),l}async function ke({loader:e,parent:r,url:t,params:n,route:a,server_data_node:o}){var f,h,p;let i=null,s=!0;const l={dependencies:new Set,params:new Set,parent:!1,route:!1,url:!1,search_params:new Set},u=await e();if((f=u.universal)!=null&&f.load){let d=function(...c){for(const g of c){const{href:v}=new URL(g,t);l.dependencies.add(v)}};const y={route:new Proxy(a,{get:(c,g)=>(s&&(l.route=!0),c[g])}),params:new Proxy(n,{get:(c,g)=>(s&&l.params.add(g),c[g])}),data:(o==null?void 0:o.data)??null,url:pt(t,()=>{s&&(l.url=!0)},c=>{s&&l.search_params.add(c)}),async fetch(c,g){let v;c instanceof Request?(v=c.url,g={body:c.method==="GET"||c.method==="HEAD"?void 0:await c.blob(),cache:c.cache,credentials:c.credentials,headers:c.headers,integrity:c.integrity,keepalive:c.keepalive,method:c.method,mode:c.mode,redirect:c.redirect,referrer:c.referrer,referrerPolicy:c.referrerPolicy,signal:c.signal,...g}):v=c;const R=new URL(v,t);return s&&d(R.href),R.origin===t.origin&&(v=R.href.slice(t.origin.length)),te?bt(v,R.href,g):vt(v,g)},setHeaders:()=>{},depends:d,parent(){return s&&(l.parent=!0),r()},untrack(c){s=!1;try{return c()}finally{s=!0}}};i=await u.universal.load.call(null,y)??null}return{node:u,loader:e,server:o,universal:(h=u.universal)!=null&&h.load?{type:"data",data:i,uses:l}:null,data:i??(o==null?void 0:o.data)??null,slash:((p=u.universal)==null?void 0:p.trailingSlash)??(o==null?void 0:o.slash)}}function Ye(e,r,t,n,a,o){if(we)return!0;if(!a)return!1;if(a.parent&&e||a.route&&r||a.url&&t)return!0;for(const i of a.search_params)if(n.has(i))return!0;for(const i of a.params)if(o[i]!==w.params[i])return!0;for(const i of a.dependencies)if(qe.some(s=>s(new URL(i))))return!0;return!1}function Ae(e,r){return(e==null?void 0:e.type)==="data"?e:(e==null?void 0:e.type)==="skip"?r??null:null}function Xt(e,r){if(!e)return new Set(r.searchParams.keys());const t=new Set([...e.searchParams.keys(),...r.searchParams.keys()]);for(const n of t){const a=e.searchParams.getAll(n),o=r.searchParams.getAll(n);a.every(i=>o.includes(i))&&o.every(i=>a.includes(i))&&t.delete(n)}return t}function Ze({error:e,url:r,route:t,params:n}){return{type:"loaded",state:{error:e,url:r,route:t,params:n,branch:[]},props:{page:C,constructors:[]}}}async function Qe({id:e,invalidating:r,url:t,params:n,route:a,preload:o}){if((_==null?void 0:_.id)===e)return G.delete(_.token),_.promise;const{errors:i,layouts:s,leaf:l}=a,u=[...s,l];i.forEach(m=>m==null?void 0:m().catch(()=>{})),u.forEach(m=>m==null?void 0:m[1]().catch(()=>{}));let f=null;const h=w.url?e!==w.url.pathname+w.url.search:!1,p=w.route?a.id!==w.route.id:!1,d=Xt(w.url,t);let y=!1;const c=u.map((m,k)=>{var L;const A=w.branch[k],S=!!(m!=null&&m[0])&&((A==null?void 0:A.loader)!==m[1]||Ye(y,p,h,d,(L=A.server)==null?void 0:L.uses,n));return S&&(y=!0),S});if(c.some(Boolean)){try{f=await nt(t,c)}catch(m){const k=await B(m,{url:t,params:n,route:{id:e}});return G.has(o)?Ze({error:k,url:t,params:n,route:a}):ae({status:Y(m),error:k,url:t,route:a})}if(f.type==="redirect")return f}const g=f==null?void 0:f.nodes;let v=!1;const R=u.map(async(m,k)=>{var L;if(!m)return;const A=w.branch[k],S=g==null?void 0:g[k];if((!S||S.type==="skip")&&m[1]===(A==null?void 0:A.loader)&&!Ye(v,p,h,d,(L=A.universal)==null?void 0:L.uses,n))return A;if(v=!0,(S==null?void 0:S.type)==="error")throw S;return ke({loader:m[1],url:t,params:n,route:a,parent:async()=>{var Re;const Ee={};for(let se=0;se<k;se+=1)Object.assign(Ee,(Re=await R[se])==null?void 0:Re.data);return Ee},server_data_node:Ae(S===void 0&&m[0]?{type:"skip"}:S??null,m[0]?A==null?void 0:A.server:void 0)})});for(const m of R)m.catch(()=>{});const b=[];for(let m=0;m<u.length;m+=1)if(u[m])try{b.push(await R[m])}catch(k){if(k instanceof Be)return{type:"redirect",location:k.location};if(G.has(o))return Ze({error:await B(k,{params:n,url:t,route:{id:a.id}}),url:t,params:n,route:a});let A=Y(k),S;if(g!=null&&g.includes(k))A=k.status??A,S=k.error;else if(k instanceof X)S=k.body;else{if(await P.updated.check())return await Ve(),await $(t);S=await B(k,{params:n,url:t,route:{id:a.id}})}const L=await Yt(m,b,i);return L?ne({url:t,params:n,branch:b.slice(0,L.idx).concat(L.node),status:A,error:S,route:a}):await rt(t,{id:a.id},S,A)}else b.push(void 0);return ne({url:t,params:n,branch:b,status:200,error:null,route:a,form:r?void 0:null})}async function Yt(e,r,t){for(;e--;)if(t[e]){let n=e;for(;!r[n];)n-=1;try{return{idx:n+1,node:{node:await t[e](),loader:t[e],data:{},server:null,universal:null}}}catch{continue}}}async function ae({status:e,error:r,url:t,route:n}){const a={};let o=null;if(N.server_loads[0]===0)try{const l=await nt(t,[!0]);if(l.type!=="data"||l.nodes[0]&&l.nodes[0].type!=="data")throw 0;o=l.nodes[0]??null}catch{(t.origin!==q||t.pathname!==location.pathname||ye)&&await $(t)}const i=await ke({loader:me,url:t,params:a,route:n,parent:()=>Promise.resolve({}),server_data_node:Ae(o)}),s={node:await Q(),loader:Q,universal:null,server:null,data:null};return ne({url:t,params:a,branch:[i,s],status:e,error:r,route:null})}function Se(e,r){if(!e||z(e,x))return;let t;try{t=N.hooks.reroute({url:new URL(e)})??e.pathname}catch{return}const n=et(t);for(const a of Z){const o=a.exec(n);if(o)return{id:e.pathname+e.search,invalidating:r,route:a,params:ft(o),url:e}}}function et(e){return ut(e.slice(x.length)||"/")}function tt({url:e,type:r,intent:t,delta:n}){let a=!1;const o=ot(w,t,e,r);n!==void 0&&(o.navigation.delta=n);const i={...o.navigation,cancel:()=>{a=!0,o.reject(new Error("navigation cancelled"))}};return M||We.forEach(s=>s(i)),a?null:o}async function oe({type:e,url:r,popped:t,keepfocus:n,noscroll:a,replace_state:o,state:i={},redirect_count:s=0,nav_token:l={},accept:u=Fe,block:f=Fe}){const h=Se(r,!1),p=tt({url:r,type:e,delta:t==null?void 0:t.delta,intent:h});if(!p){f();return}const d=E,y=U;u(),M=!0,te&&P.navigating.set(p.navigation),re=l;let c=h&&await Qe(h);if(!c){if(z(r,x))return await $(r);c=await rt(r,{id:null},await B(new pe(404,"Not Found",`Not found: ${r.pathname}`),{url:r,params:{},route:{id:null}}),404)}if(r=(h==null?void 0:h.url)||r,re!==l)return p.reject(new Error("navigation aborted")),!1;if(c.type==="redirect")if(s>=20)c=await ae({status:500,error:await B(new Error("Redirect loop"),{url:r,params:{},route:{id:null}}),url:r,route:{id:null}});else return ze(new URL(c.location,r).href,{},s+1,l),!1;else c.props.page.status>=400&&await P.updated.check()&&(await Ve(),await $(r));if(Kt(),he(d),Ge(y),c.props.page.url.pathname!==r.pathname&&(r.pathname=c.props.page.url.pathname),i=t?t.state:i,!t){const b=o?0:1,m={[O]:E+=b,[F]:U+=b,[Pe]:i};(o?history.replaceState:history.pushState).call(history,m,"",r),o||Jt(E,U)}if(_=null,c.props.page.state=i,te){w=c.state,c.props.page&&(c.props.page.url=r);const b=(await Promise.all(Gt.map(m=>m(p.navigation)))).filter(m=>typeof m=="function");if(b.length>0){let m=function(){D=D.filter(k=>!b.includes(k))};b.push(m),D.push(...b)}ve.$set(c.props),Je=!0}else Xe(c,ge,!1);const{activeElement:g}=document;await lt();const v=t?t.scroll:a?fe():null;if(Me){const b=r.hash&&document.getElementById(decodeURIComponent(r.hash.slice(1)));v?scrollTo(v.x,v.y):b?b.scrollIntoView():scrollTo(0,0)}const R=document.activeElement!==g&&document.activeElement!==document.body;!n&&!R&&rr(),Me=!0,c.props.page&&(C=c.props.page),M=!1,e==="popstate"&&He(U),p.fulfil(void 0),D.forEach(b=>b(p.navigation)),P.navigating.set(null)}async function rt(e,r,t,n){return e.origin===q&&e.pathname===location.pathname&&!ye?await ae({status:n,error:t,url:e,route:r}):await $(e)}function Zt(){let e;j.addEventListener("mousemove",o=>{const i=o.target;clearTimeout(e),e=setTimeout(()=>{n(i,2)},20)});function r(o){n(o.composedPath()[0],1)}j.addEventListener("mousedown",r),j.addEventListener("touchstart",r,{passive:!0});const t=new IntersectionObserver(o=>{for(const i of o)i.isIntersecting&&(be(i.target.href),t.unobserve(i.target))},{threshold:0});function n(o,i){const s=Te(o,j);if(!s)return;const{url:l,external:u,download:f}=de(s,x);if(u||f)return;const h=K(s),p=l&&w.url.pathname+w.url.search===l.pathname+l.search;if(!h.reload&&!p)if(i<=h.preload_data){const d=Se(l,!1);d&&zt(d)}else i<=h.preload_code&&be(l.pathname)}function a(){t.disconnect();for(const o of j.querySelectorAll("a")){const{url:i,external:s,download:l}=de(o,x);if(s||l)continue;const u=K(o);u.reload||(u.preload_code===H.viewport&&t.observe(o),u.preload_code===H.eager&&be(i.pathname))}}D.push(a),a()}function B(e,r){if(e instanceof X)return e.body;const t=Y(e),n=Mt(e);return N.hooks.handleError({error:e,event:r,status:t,message:n})??{message:n}}function Qt(e,r={}){return e=je(e),e.origin!==q?Promise.reject(new Error("goto: invalid URL")):ze(e,r,0)}function er(){var r;history.scrollRestoration="manual",addEventListener("beforeunload",t=>{let n=!1;if(Ke(),!M){const a=ot(w,void 0,null,"leave"),o={...a.navigation,cancel:()=>{n=!0,a.reject(new Error("navigation cancelled"))}};We.forEach(i=>i(o))}n?(t.preventDefault(),t.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&Ke()}),(r=navigator.connection)!=null&&r.saveData||Zt(),j.addEventListener("click",async t=>{var h;if(t.button||t.which!==1||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.defaultPrevented)return;const n=Te(t.composedPath()[0],j);if(!n)return;const{url:a,external:o,target:i,download:s}=de(n,x);if(!a)return;if(i==="_parent"||i==="_top"){if(window.parent!==window)return}else if(i&&i!=="_self")return;const l=K(n);if(!(n instanceof SVGAElement)&&a.protocol!==location.protocol&&!(a.protocol==="https:"||a.protocol==="http:")||s)return;if(o||l.reload){tt({url:a,type:"link"})?M=!0:t.preventDefault();return}const[u,f]=a.href.split("#");if(f!==void 0&&u===le(location)){const[,p]=w.url.href.split("#");if(p===f){t.preventDefault(),f===""||f==="top"&&n.ownerDocument.getElementById("top")===null?window.scrollTo({top:0}):(h=n.ownerDocument.getElementById(decodeURIComponent(f)))==null||h.scrollIntoView();return}if(J=!0,he(E),e(a),!l.replace_state)return;J=!1}t.preventDefault(),await new Promise(p=>{requestAnimationFrame(()=>{setTimeout(p,0)}),setTimeout(p,100)}),oe({type:"link",url:a,keepfocus:l.keepfocus,noscroll:l.noscroll,replace_state:l.replace_state??a.href===location.href})}),j.addEventListener("submit",t=>{if(t.defaultPrevented)return;const n=HTMLFormElement.prototype.cloneNode.call(t.target),a=t.submitter;if(((a==null?void 0:a.formTarget)||n.target)==="_blank"||((a==null?void 0:a.formMethod)||n.method)!=="get")return;const o=new URL((a==null?void 0:a.hasAttribute("formaction"))&&(a==null?void 0:a.formAction)||n.action);if(z(o,x))return;const i=t.target,s=K(i);if(s.reload)return;t.preventDefault(),t.stopPropagation();const l=new FormData(i),u=a==null?void 0:a.getAttribute("name");u&&l.append(u,(a==null?void 0:a.getAttribute("value"))??""),o.search=new URLSearchParams(l).toString(),oe({type:"form",url:o,keepfocus:s.keepfocus,noscroll:s.noscroll,replace_state:s.replace_state??o.href===location.href})}),addEventListener("popstate",async t=>{var n;if((n=t.state)!=null&&n[O]){const a=t.state[O];if(re={},a===E)return;const o=I[a],i=t.state[Pe]??{},s=new URL(t.state[Ct]??location.href),l=t.state[F],u=le(location)===le(w.url);if(l===U&&(Je||u)){e(s),I[E]=fe(),o&&scrollTo(o.x,o.y),i!==C.state&&(C={...C,state:i},ve.$set({page:C})),E=a;return}const f=a-E;await oe({type:"popstate",url:s,popped:{state:i,scroll:o,delta:f},accept:()=>{E=a,U=l},block:()=>{history.go(-f)},nav_token:re})}else if(!J){const a=new URL(location.href);e(a)}}),addEventListener("hashchange",()=>{J&&(J=!1,history.replaceState({...history.state,[O]:++E,[F]:U},"",location.href))});for(const t of document.querySelectorAll("link"))t.rel==="icon"&&(t.href=t.href);addEventListener("pageshow",t=>{t.persisted&&P.navigating.set(null)});function e(t){w.url=t,P.page.set({...C,url:t}),P.page.notify()}}async function tr(e,{status:r=200,error:t,node_ids:n,params:a,route:o,data:i,form:s}){ye=!0;const l=new URL(location.href);({params:a={},route:o={id:null}}=Se(l,!1)||{});let u;try{const f=n.map(async(d,y)=>{const c=i[y];return c!=null&&c.uses&&(c.uses=at(c.uses)),ke({loader:N.nodes[d],url:l,params:a,route:o,parent:async()=>{const g={};for(let v=0;v<y;v+=1)Object.assign(g,(await f[v]).data);return g},server_data_node:Ae(c)})}),h=await Promise.all(f),p=Z.find(({id:d})=>d===o.id);if(p){const d=p.layouts;for(let y=0;y<d.length;y++)d[y]||h.splice(y,0,void 0)}u=ne({url:l,params:a,branch:h,status:r,error:t,form:s,route:p??null})}catch(f){if(f instanceof Be){await $(new URL(f.location,location.href));return}u=await ae({status:Y(f),error:await B(f,{url:l,params:a,route:o}),url:l,route:o})}u.props.page&&(u.props.page.state={}),Xe(u,e,!0)}async function nt(e,r){var a;const t=new URL(e);t.pathname=gt(e.pathname),e.pathname.endsWith("/")&&t.searchParams.append(Wt,"1"),t.searchParams.append(qt,r.map(o=>o?"1":"0").join(""));const n=await xe(t.href);if(!n.ok){let o;throw(a=n.headers.get("content-type"))!=null&&a.includes("application/json")?o=await n.json():n.status===404?o="Not Found":n.status===500&&(o="Internal Error"),new X(n.status,o)}return new Promise(async o=>{var h;const i=new Map,s=n.body.getReader(),l=new TextDecoder;function u(p){return Bt(p,{Promise:d=>new Promise((y,c)=>{i.set(d,{fulfil:y,reject:c})})})}let f="";for(;;){const{done:p,value:d}=await s.read();if(p&&!f)break;for(f+=!d&&f?`
`:l.decode(d,{stream:!0});;){const y=f.indexOf(`
`);if(y===-1)break;const c=JSON.parse(f.slice(0,y));if(f=f.slice(y+1),c.type==="redirect")return o(c);if(c.type==="data")(h=c.nodes)==null||h.forEach(g=>{(g==null?void 0:g.type)==="data"&&(g.uses=at(g.uses),g.data=u(g.data))}),o(c);else if(c.type==="chunk"){const{id:g,data:v,error:R}=c,b=i.get(g);i.delete(g),R?b.reject(u(R)):b.fulfil(u(v))}}}})}function at(e){return{dependencies:new Set((e==null?void 0:e.dependencies)??[]),params:new Set((e==null?void 0:e.params)??[]),parent:!!(e!=null&&e.parent),route:!!(e!=null&&e.route),url:!!(e!=null&&e.url),search_params:new Set((e==null?void 0:e.search_params)??[])}}function rr(){const e=document.querySelector("[autofocus]");if(e)e.focus();else{const r=document.body,t=r.getAttribute("tabindex");r.tabIndex=-1,r.focus({preventScroll:!0,focusVisible:!1}),t!==null?r.setAttribute("tabindex",t):r.removeAttribute("tabindex");const n=getSelection();if(n&&n.type!=="None"){const a=[];for(let o=0;o<n.rangeCount;o+=1)a.push(n.getRangeAt(o));setTimeout(()=>{if(n.rangeCount===a.length){for(let o=0;o<n.rangeCount;o+=1){const i=a[o],s=n.getRangeAt(o);if(i.commonAncestorContainer!==s.commonAncestorContainer||i.startContainer!==s.startContainer||i.endContainer!==s.endContainer||i.startOffset!==s.startOffset||i.endOffset!==s.endOffset)return}n.removeAllRanges()}})}}}function ot(e,r,t,n){var s,l;let a,o;const i=new Promise((u,f)=>{a=u,o=f});return i.catch(()=>{}),{navigation:{from:{params:e.params,route:{id:((s=e.route)==null?void 0:s.id)??null},url:e.url},to:t&&{params:(r==null?void 0:r.params)??null,route:{id:((l=r==null?void 0:r.route)==null?void 0:l.id)??null},url:t},willUnload:!r,type:n,complete:i},fulfil:a,reject:o}}export{Ht as a,P as s};
