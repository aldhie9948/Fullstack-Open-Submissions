(this.webpackJsonplesson=this.webpackJsonplesson||[]).push([[0],{41:function(t,e,n){},42:function(t,e,n){"use strict";n.r(e);var c=n(2),o=n(17),r=n.n(o),i=n(8),a=n(4),u=n(3),s=n.n(u),l=n(0),j=function(t){var e=t.note,n=t.toggleImportance,c=e.important?"make not important":"make important";return Object(l.jsxs)("li",{className:"note",children:[e.content,Object(l.jsx)("button",{onClick:n,children:c})]})},b="/api/notes",f=function(t){return s.a.post(b,t).then((function(t){return t.data}))},d=function(t,e){return s.a.put("".concat(b,"/").concat(t),e).then((function(t){return t.data}))},m=function(t){var e=t.message;return null===e?null:Object(l.jsx)("div",{className:"error",children:e})},O=function(){return Object(l.jsxs)("div",{style:{color:"green",fontStyle:"italic",fontSize:16},children:[Object(l.jsx)("br",{}),Object(l.jsx)("em",{children:"Note app, Departement of Computer Science, University of Helsinki 2022"})]})},p=function(){var t=Object(c.useState)([]),e=Object(a.a)(t,2),n=e[0],o=e[1],r=Object(c.useState)("a new note..."),u=Object(a.a)(r,2),b=u[0],p=u[1],h=Object(c.useState)(!0),g=Object(a.a)(h,2),x=g[0],v=g[1],S=x?n:n.filter((function(t){return!0===t.important})),k=Object(c.useState)(null),w=Object(a.a)(k,2),y=w[0],C=w[1];Object(c.useEffect)((function(){s.a.get("/api/notes").then((function(t){return o(t.data)}))}),[]);return Object(l.jsxs)("div",{children:[Object(l.jsx)("h1",{children:"Notes"}),Object(l.jsx)(m,{message:y}),Object(l.jsx)("div",{children:Object(l.jsxs)("button",{onClick:function(){return v(!x)},children:["show ",x?"important":"all"]})}),Object(l.jsx)("ul",{children:S.map((function(t){return Object(l.jsx)(j,{note:t,toggleImportance:function(){return function(t){console.log("importance of ".concat(t," needs to be toggled"));var e=n.find((function(e){return e.id===t})),c=Object(i.a)(Object(i.a)({},e),{},{important:!e.important});d(t,c).then((function(e){o(n.map((function(n){return n.id!==t?n:e})))})).catch((function(c){C('the note "'.concat(e.content,'" was already deleted from server')),setTimeout((function(){C(null)}),5e3),o(n.filter((function(e){return e.id!==t})))}))}(t.id)}},t.id)}))}),Object(l.jsxs)("form",{onSubmit:function(t){t.preventDefault(),console.log("button clicked",t.target);var e={content:b,date:(new Date).toISOString(),important:Math.random()<.5};f(e).then((function(t){o(n.concat(t)),p("")}))},children:[Object(l.jsx)("input",{value:b,onChange:function(t){console.log(t.target.value),p(t.target.value)}}),Object(l.jsx)("button",{type:"submit",children:"save"})]}),Object(l.jsx)(O,{})]})};n(41);r.a.render(Object(l.jsx)(p,{}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.9c3dc66a.chunk.js.map