import{n as h,p as i,q as f,o as $,t as x,u as b}from"../chunks/disclose-version.BzPpjM3p.js";import{x as w,y as p,w as y,z as l,u as k,A as q,f as m,B as z,C as a,D as A,F as B,e as C,t as D,G as E,v as F}from"../chunks/runtime.B4JADg52.js";import{s as g}from"../chunks/render.CtxIRnTw.js";import{s as G}from"../chunks/entry.DhmllS4k.js";function S(){const s=y,e=s.l.u;e&&(e.b.length&&w(()=>{d(s),l(e.b)}),p(()=>{const r=k(()=>e.m.map(q));return()=>{for(const t of r)typeof t=="function"&&t()}}),e.a.length&&p(()=>{d(s),l(e.a)}))}function d(s){if(s.l.s)for(const e of s.l.s)m(e);z(s.s)}function j(s,e,r){if(s==null)return e(void 0),a;const t=s.subscribe(e,r);return t.unsubscribe?()=>t.unsubscribe():t}function H(s,e,r){const t=r[e]??(r[e]={store:null,source:B(void 0),unsubscribe:a});if(t.store!==s)if(t.unsubscribe(),t.store=s??null,s==null)t.source.v=void 0,t.unsubscribe=a;else{var u=!0;t.unsubscribe=j(s,n=>{u?t.source.v=n:C(t.source,n)}),u=!1}return m(t.source)}function I(){const s={};return A(()=>{for(var e in s)s[e].unsubscribe()}),s}const J=()=>{const s=G;return{page:{subscribe:s.page.subscribe},navigating:{subscribe:s.navigating.subscribe},updated:s.updated}},K={subscribe(s){return J().page.subscribe(s)}};var L=x("<h1> </h1> <p> </p>",1);function Q(s,e){D(e,!1);const r=I(),t=()=>H(K,"$page",r);S();var u=L(),n=h(u),v=i(n);b(n);var o=f(f(n,!0)),_=i(o);b(o),E(()=>{var c;g(v,t().status),g(_,(c=t().error)==null?void 0:c.message)}),$(s,u),F()}export{Q as component};
