(this['webpackJsonppart1-a']=this['webpackJsonppart1-a']||[]).push([[0],{40:function(e,n,t){},41:function(e,n,t){'use strict';t.r(n);var c=t(1),r=t(16),a=t.n(r),o=t(3),u=t(0),i=function(e){var n=e.persons,t=e.deletePerson;return n.map((function(e){return Object(u.jsxs)('p',{children:[e.name,' ',e.number,Object(u.jsx)('button',{onClick:function(){return t(e.id);},children:'delete'})]},e.id);}));},s=function(e){return Object(u.jsxs)('form',{onSubmit:e.addPerson,children:[Object(u.jsxs)('div',{children:['name:',Object(u.jsx)('input',{value:e.newName,onChange:e.handleNameChange})]}),Object(u.jsxs)('div',{children:['number:',Object(u.jsx)('input',{value:e.newNumber,onChange:e.handleNumberChange})]}),Object(u.jsx)('div',{children:Object(u.jsx)('button',{type:'submit',children:'add'})})]});},d=function(e){var n=e.notification;return null===n?null:Object(u.jsx)('div',{className:n.type,children:n.message});},l=function(e){return Object(u.jsx)('input',{value:e.value,onChange:e.onChange});},j=t(4),b=t.n(j),h='/api/persons',f=function(){return b.a.get(h).then((function(e){return e.data;}));},m=function(e){return b.a.post(h,e).then((function(e){return e.data;}));},O=function(e){return b.a.delete(''.concat(h,'/').concat(e)).then((function(e){return e.data;}));},p=function(){var e=Object(c.useState)([]),n=Object(o.a)(e,2),t=n[0],r=n[1],a=Object(c.useState)(''),j=Object(o.a)(a,2),b=j[0],h=j[1],p=Object(c.useState)(''),v=Object(o.a)(p,2),x=v[0],g=v[1],w=Object(c.useState)(''),C=Object(o.a)(w,2),N=C[0],S=C[1],y=Object(c.useState)(null),P=Object(o.a)(y,2),k=P[0],D=P[1];Object(c.useEffect)((function(){f().then((function(e){r(e);}));}),[]);var E=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:'success';D({message:e,type:n}),setTimeout((function(){D(null);}),5e3);},J=0===N.length?t:t.filter((function(e){return e.name.toLowerCase().includes(N.toLowerCase());}));return Object(u.jsxs)('div',{children:[Object(u.jsx)('h2',{children:'Phonebook'}),Object(u.jsx)(d,{notification:k}),'filter shown with:',Object(u.jsx)(l,{value:N,onChange:function(e){S(e.target.value);}}),Object(u.jsx)('h3',{children:'add a new'}),Object(u.jsx)(s,{handleNameChange:function(e){h(e.target.value);},handleNumberChange:function(e){g(e.target.value);},newNumber:x,newName:b,addPerson:function(e){e.preventDefault(),m({name:b,number:x}).then((function(e){r(t.concat(e)),E('Added '.concat(b)),h(''),g('');})).catch((function(e){console.log(e.response.data.error),E(''.concat(e.response.data.error,' '),'error');}));}}),Object(u.jsx)('h3',{children:'Numbers'}),Object(u.jsx)(i,{persons:J,deletePerson:function(e){var n=t.find((function(n){return n.id===e;}));window.confirm('Delete '.concat(n.name))&&O(e).then((function(c){r(t.filter((function(n){return n.id!==e;}))),E('Deleted '.concat(n.name));})).catch((function(){r(t.filter((function(n){return n.id!==e;}))),E(''.concat(n.name,' had already been removed'),'error');}));}})]});};t(40);a.a.render(Object(u.jsx)(p,{}),document.getElementById('root'));}},[[41,1,2]]]);
//# sourceMappingURL=main.c70f947f.chunk.js.map