var et=Array.isArray,ut=Array.from,lt=Object.isFrozen,st=Object.defineProperty,ot=Object.getOwnPropertyDescriptor,Rn=Object.getOwnPropertyDescriptors,it=Object.prototype,ft=Array.prototype,Nn=Object.getPrototypeOf;function at(n){return typeof n=="function"}const _t=()=>{};function ct(n){return n()}function un(n){for(var t=0;t<n.length;t++)n[t]()}const g=2,ln=4,F=8,sn=16,E=32,V=64,x=128,M=256,m=512,y=1024,b=2048,C=4096,D=8192,jn=16384,on=32768,vt=65536,In=1<<18,Q=Symbol("$state"),pt=Symbol("$state.frozen"),ht=Symbol("");function fn(n){return n===this.v}function Mn(n,t){return n!=n?t==t:n!==t||n!==null&&typeof n=="object"||typeof n=="function"}function an(n){return!Mn(n,this.v)}function Ln(n){throw new Error("effect_in_teardown")}function Yn(){throw new Error("effect_in_unowned_derived")}function Pn(n){throw new Error("effect_orphan")}function Bn(){throw new Error("effect_update_depth_exceeded")}function wt(){throw new Error("hydration_failed")}function mt(n){throw new Error("props_invalid_value")}function Hn(){throw new Error("state_unsafe_mutation")}function _n(n){return{f:0,v:n,reactions:null,equals:fn,version:0}}function Et(n){var r;const t=_n(n);return t.equals=an,i!==null&&i.l!==null&&((r=i.l).s??(r.s=[])).push(t),t}function dt(n,t){return a!==null&&$()&&a.f&g&&Hn(),n.equals(t)||(n.v=t,n.version=On(),cn(n,y),$()&&f!==null&&f.f&m&&!(f.f&E)&&(c!==null&&c.includes(n)?(h(f,y),U(f)):d===null?Zn([n]):d.push(n))),t}function cn(n,t){var r=n.reactions;if(r!==null)for(var e=$(),l=r.length,u=0;u<l;u++){var s=r[u],o=s.f;o&y||!e&&s===f||(h(s,t),o&(m|x)&&(o&g?cn(s,b):U(s)))}}function vn(n){f===null&&a===null&&Pn(),a!==null&&a.f&x&&Yn(),W&&Ln()}function X(n,t){var r=t.last;r===null?t.last=t.first=n:(r.next=n,n.prev=r,t.last=n)}function R(n,t,r,e=!0){var l=(n&V)!==0,u={ctx:i,deps:null,nodes:null,f:n|y,first:null,fn:t,last:null,next:null,parent:l?null:f,prev:null,teardown:null,transitions:null,version:0};if(r){var s=S;try{nn(!0),H(u),u.f|=jn}catch(_){throw P(u),_}finally{nn(s)}}else t!==null&&U(u);var o=r&&u.deps===null&&u.first===null&&u.nodes===null&&u.teardown===null;return!o&&!l&&e&&(f!==null&&X(u,f),a!==null&&a.f&g&&X(u,a)),u}function yt(n){const t=R(F,null,!1);return h(t,m),t.teardown=n,t}function kt(n){vn();var t=f!==null&&(f.f&F)!==0&&i!==null&&!i.m;if(t){var r=i;(r.e??(r.e=[])).push(n)}else{var e=pn(n);return e}}function gt(n){return vn(),hn(n)}function xt(n){const t=R(V,n,!0);return()=>{P(t)}}function pn(n){return R(ln,n,!1)}function hn(n){return R(F,n,!0)}function Tt(n){return hn(n)}function qt(n,t=0){return R(F|sn|t,n,!0)}function Ot(n,t=!0){return R(F|E,n,!0,t)}function wn(n){var t=n.teardown;if(t!==null){const r=W,e=a;tn(!0),rn(null);try{t.call(null)}finally{tn(r),rn(e)}}}function P(n,t=!0){var r=!1;if((t||n.f&In)&&n.nodes!==null){for(var e=n.nodes.start,l=n.nodes.end;e!==null;){var u=e===l?null:e.nextSibling;e.remove(),e=u}r=!0}if(Z(n,t&&!r),B(n,0),h(n,D),n.transitions)for(const o of n.transitions)o.stop();wn(n);var s=n.parent;s!==null&&n.f&E&&s.first!==null&&mn(n),n.next=n.prev=n.teardown=n.ctx=n.deps=n.parent=n.fn=n.nodes=null}function mn(n){var t=n.parent,r=n.prev,e=n.next;r!==null&&(r.next=e),e!==null&&(e.prev=r),t!==null&&(t.first===n&&(t.first=e),t.last===n&&(t.last=r))}function St(n,t){var r=[];En(n,r,!0),Un(r,()=>{P(n),t&&t()})}function Un(n,t){var r=n.length;if(r>0){var e=()=>--r||t();for(var l of n)l.out(e)}else t()}function En(n,t,r){if(!(n.f&C)){if(n.f^=C,n.transitions!==null)for(const s of n.transitions)(s.is_global||r)&&t.push(s);for(var e=n.first;e!==null;){var l=e.next,u=(e.f&on)!==0||(e.f&E)!==0;En(e,t,u?r:!1),e=l}}}function At(n){dn(n,!0)}function dn(n,t){if(n.f&C){n.f^=C,j(n)&&H(n);for(var r=n.first;r!==null;){var e=r.next,l=(r.f&on)!==0||(r.f&E)!==0;dn(r,l?t:!1),r=e}if(n.transitions!==null)for(const u of n.transitions)(u.is_global||t)&&u.in()}}const zn=typeof requestIdleCallback>"u"?n=>setTimeout(n,1):requestIdleCallback;let L=!1,Y=!1,z=[],K=[];function yn(){L=!1;const n=z.slice();z=[],un(n)}function kn(){Y=!1;const n=K.slice();K=[],un(n)}function Ct(n){L||(L=!0,queueMicrotask(yn)),z.push(n)}function Ft(n){Y||(Y=!0,zn(kn)),K.push(n)}function Kn(){L&&yn(),Y&&kn()}function $n(n){let t=g|y;f===null&&(t|=x);const r={deps:null,deriveds:null,equals:fn,f:t,first:null,fn:n,last:null,reactions:null,v:null,version:0};if(a!==null&&a.f&g){var e=a;e.deriveds===null?e.deriveds=[r]:e.deriveds.push(r)}return r}function bt(n){const t=$n(n);return t.equals=an,t}function gn(n){Z(n);var t=n.deriveds;if(t!==null){n.deriveds=null;for(var r=0;r<t.length;r+=1)Gn(t[r])}}function xn(n){gn(n);var t=Sn(n),r=(O||n.f&x)&&n.deps!==null?b:m;h(n,r),n.equals(t)||(n.v=t,n.version=On())}function Gn(n){gn(n),B(n,0),h(n,D),n.first=n.last=n.deps=n.reactions=n.fn=null}function Vn(n){throw new Error("lifecycle_outside_component")}const Tn=0,Wn=1;let I=Tn,N=!1,S=!1,W=!1;function nn(n){S=n}function tn(n){W=n}let k=[],A=0,a=null;function rn(n){a=n}let f=null,c=null,v=0,d=null;function Zn(n){d=n}let qn=0,O=!1,i=null;function On(){return qn++}function $(){return i!==null&&i.l===null}function j(n){var s,o;var t=n.f;if(t&y)return!0;if(t&b){var r=n.deps;if(r!==null){var e=(t&x)!==0,l;if(t&M){for(l=0;l<r.length;l++)((s=r[l]).reactions??(s.reactions=[])).push(n);n.f^=M}for(l=0;l<r.length;l++){var u=r[l];if(j(u)&&xn(u),u.version>n.version)return!0;e&&!O&&!((o=u==null?void 0:u.reactions)!=null&&o.includes(n))&&(u.reactions??(u.reactions=[])).push(n)}}h(n,m)}return!1}function Jn(n,t,r){throw n}function Sn(n){var t=c,r=v,e=d,l=a,u=O;c=null,v=0,d=null,a=n.f&(E|V)?null:n,O=!S&&(n.f&x)!==0;try{var s=(0,n.fn)(),o=n.deps;if(c!==null){var _,p;if(o!==null){var T=v===0?c:o.slice(0,v).concat(c),q=T.length>16?new Set(T):null;for(p=v;p<o.length;p++)_=o[p],(q!==null?!q.has(_):!T.includes(_))&&An(n,_)}if(o!==null&&v>0)for(o.length=v+c.length,p=0;p<c.length;p++)o[v+p]=c[p];else n.deps=o=c;if(!O)for(p=v;p<o.length;p++){_=o[p];var w=_.reactions;w===null?_.reactions=[n]:w[w.length-1]!==n&&!w.includes(n)&&w.push(n)}}else o!==null&&v<o.length&&(B(n,v),o.length=v);return s}finally{c=t,v=r,d=e,a=l,O=u}}function An(n,t){const r=t.reactions;let e=0;if(r!==null){e=r.length-1;const l=r.indexOf(n);l!==-1&&(e===0?t.reactions=null:(r[l]=r[e],r.pop()))}e===0&&t.f&g&&(h(t,b),t.f&(x|M)||(t.f^=M),B(t,0))}function B(n,t){var r=n.deps;if(r!==null)for(var e=t===0?null:r.slice(0,t),l=new Set,u=t;u<r.length;u++){var s=r[u];l.has(s)||(l.add(s),(e===null||!e.includes(s))&&An(n,s))}}function Z(n,t=!1){var r=n.first;for(n.first=n.last=null;r!==null;){var e=r.next;P(r,t),r=e}}function H(n){var t=n.f;if(!(t&D)){h(n,m);var r=n.ctx,e=f,l=i;f=n,i=r;try{t&sn||Z(n),wn(n);var u=Sn(n);n.teardown=typeof u=="function"?u:null,n.version=qn}catch(s){Jn(s)}finally{f=e,i=l}}}function Cn(){A>1e3&&(A=0,Bn()),A++}function Fn(n){var t=n.length;if(t!==0){Cn();var r=S;S=!0;try{for(var e=0;e<t;e++){var l=n[e];if(l.first===null&&!(l.f&E))en([l]);else{var u=[];bn(l,u),en(u)}}}finally{S=r}}}function en(n){var t=n.length;if(t!==0)for(var r=0;r<t;r++){var e=n[r];!(e.f&(D|C))&&j(e)&&(H(e),e.deps===null&&e.first===null&&e.nodes===null&&(e.teardown===null?mn(e):e.fn=null))}}function Qn(){if(N=!1,A>1001)return;const n=k;k=[],Fn(n),N||(A=0)}function U(n){I===Tn&&(N||(N=!0,queueMicrotask(Qn)));for(var t=n;t.parent!==null;){t=t.parent;var r=t.f;if(r&E){if(!(r&m))return;h(t,b)}}k.push(t)}function bn(n,t){var r=n.first,e=[];n:for(;r!==null;){var l=r.f,u=(l&(D|C))===0,s=l&E,o=(l&m)!==0,_=r.first;if(u&&(!s||!o)){if(s&&h(r,m),l&F){if(!s&&j(r)&&(H(r),_=r.first),_!==null){r=_;continue}}else if(l&ln)if(s||o){if(_!==null){r=_;continue}}else e.push(r)}var p=r.next;if(p===null){let w=r.parent;for(;w!==null;){if(n===w)break n;var T=w.next;if(T!==null){r=T;continue n}w=w.parent}}r=p}for(var q=0;q<e.length;q++)_=e[q],t.push(_),bn(_,t)}function Dn(n){var t=I,r=k;try{Cn();const l=[];I=Wn,k=l,N=!1,Fn(r);var e=n==null?void 0:n();return Kn(),(k.length>0||l.length>0)&&Dn(),A=0,e}finally{I=t,k=r}}async function Dt(){await Promise.resolve(),Dn()}function Xn(n){var t=n.f;if(t&D)return n.v;if(a!==null){var r=a.deps;c===null&&r!==null&&r[v]===n?v++:(r===null||v===0||r[v-1]!==n)&&(c===null?c=[n]:c[c.length-1]!==n&&c.push(n)),d!==null&&f!==null&&f.f&m&&!(f.f&E)&&d.includes(n)&&(h(f,y),U(f))}if(t&g){var e=n;j(e)&&xn(e)}return n.v}function Rt(n){const t=a;try{return a=null,n()}finally{a=t}}const nt=~(y|b|m);function h(n,t){n.f=n.f&nt|t}function tt(n){return typeof n=="object"&&n!==null&&typeof n.f=="number"}function Nt(n){return J().get(n)}function jt(n,t){return J().set(n,t),t}function It(n){return J().has(n)}function J(n){return i===null&&Vn(),i.c??(i.c=new Map(rt(i)||void 0))}function rt(n){let t=n.p;for(;t!==null;){const r=t.c;if(r!==null)return r;t=t.p}return null}function Mt(n,t=!1,r){i={p:i,c:null,e:null,m:!1,s:n,x:null,l:null},t||(i.l={s:null,u:null,r1:[],r2:_n(!1)})}function Lt(n){const t=i;if(t!==null){const e=t.e;if(e!==null){t.e=null;for(var r=0;r<e.length;r++)pn(e[r])}i=t.p,t.m=!0}return{}}function Yt(n){if(!(typeof n!="object"||!n||n instanceof EventTarget)){if(Q in n)G(n);else if(!Array.isArray(n))for(let t in n){const r=n[t];typeof r=="object"&&r&&Q in r&&G(r)}}}function G(n,t=new Set){if(typeof n=="object"&&n!==null&&!(n instanceof EventTarget)&&!t.has(n)){t.add(n),n instanceof Date&&n.getTime();for(let e in n)try{G(n[e],t)}catch{}const r=Nn(n);if(r!==Object.prototype&&r!==Array.prototype&&r!==Map.prototype&&r!==Set.prototype&&r!==Date.prototype){const e=Rn(r);for(let l in e){const u=e[l].get;if(u)try{u.call(n)}catch{}}}}}function Pt(n){return tt(n)?Xn(n):n}export{ht as $,ot as A,f as B,Nn as C,mt as D,on as E,an as F,$n as G,bt as H,Et as I,yt as J,Mt as K,vt as L,Tt as M,Lt as N,Dn as O,Dt as P,Pt as Q,In as R,Q as S,wt as T,ut as U,xt as V,C as W,En as X,Un as Y,P as Z,Ft as _,kt as a,sn as a0,jn as a1,at as a2,It as a3,Nt as a4,jt as a5,Rt as b,i as c,ct as d,Yt as e,pn as f,Xn as g,hn as h,qt as i,At as j,Ot as k,Vn as l,lt as m,_t as n,pt as o,St as p,Ct as q,un as r,Mn as s,it as t,gt as u,ft as v,st as w,_n as x,et as y,dt as z};