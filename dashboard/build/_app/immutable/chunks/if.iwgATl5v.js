import{i as v,S as A,a as r,o as O,b as x,d as N,s as b,c as D,e as u,g,f as y,h as I,u as k,j as L,k as j,r as R,l as T,p as w,E as F}from"./runtime.B4JADg52.js";import{U as _,h as m,a as M,H as Y,r as B,s as H,b as E,c as K}from"./disclose-version.BzPpjM3p.js";function h(e,t=null,s){if(typeof e=="object"&&e!=null&&!v(e)&&!(A in e)){if(r in e){const n=e[r];if(n.t===e||n.p===e)return n.p}const f=L(e);if(f===O||f===x){const n=new Proxy(e,U);return N(e,r,{value:{s:new Map,v:b(0),a:D(e),p:n,t:e},writable:!0,enumerable:!1}),n}}return e}function P(e,t=1){u(e,e.v+t)}const U={defineProperty(e,t,s){if(s.value){const f=e[r],n=f.s.get(t);n!==void 0&&u(n,h(s.value,f))}return Reflect.defineProperty(e,t,s)},deleteProperty(e,t){const s=e[r],f=s.s.get(t),n=s.a,i=delete e[t];if(n&&i){const a=s.s.get("length"),o=e.length-1;a!==void 0&&a.v!==o&&u(a,o)}return f!==void 0&&u(f,_),i&&P(s.v),i},get(e,t,s){var i;if(t===r)return Reflect.get(e,r);const f=e[r];let n=f.s.get(t);if(n===void 0&&(!(t in e)||(i=g(e,t))!=null&&i.writable)&&(n=b(h(e[t],f)),f.s.set(t,n)),n!==void 0){const a=y(n);return a===_?void 0:a}return Reflect.get(e,t,s)},getOwnPropertyDescriptor(e,t){const s=Reflect.getOwnPropertyDescriptor(e,t);if(s&&"value"in s){const n=e[r].s.get(t);n&&(s.value=y(n))}return s},has(e,t){var i;if(t===r)return!0;const s=e[r],f=Reflect.has(e,t);let n=s.s.get(t);return(n!==void 0||I!==null&&(!f||(i=g(e,t))!=null&&i.writable))&&(n===void 0&&(n=b(f?h(e[t],s):_),s.s.set(t,n)),y(n)===_)?!1:f},set(e,t,s,f){const n=e[r];let i=n.s.get(t);i===void 0&&(k(()=>f[t]),i=n.s.get(t)),i!==void 0&&u(i,h(s,n));const a=n.a,o=!(t in e);if(a&&t==="length")for(let l=s;l<e.length;l+=1){const d=n.s.get(l+"");d!==void 0&&u(d,_)}var c=Reflect.getOwnPropertyDescriptor(e,t);if(c!=null&&c.set?c.set.call(f,s):e[t]=s,o){if(a){const l=n.s.get("length"),d=e.length;l!==void 0&&l.v!==d&&u(l,d)}P(n.v)}return!0},ownKeys(e){const t=e[r];return y(t.v),Reflect.ownKeys(e)}};function z(e,t,s,f=null,n=!1){m&&M();var i=e,a=null,o=null,c=null,l=n?F:0;j(()=>{if(c===(c=!!t()))return;let d=!1;if(m){const S=i.data===Y;c===S&&(i=B(),H(i),E(!1),d=!0)}c?(a?R(a):a=T(()=>s(i)),o&&w(o,()=>{o=null})):(o?R(o):f&&(o=T(()=>f(i))),a&&w(a,()=>{a=null})),d&&E(!0)},l),m&&(i=K)}export{z as i,h as p};
