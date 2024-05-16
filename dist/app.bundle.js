(()=>{"use strict";var t={621:(t,e,n)=>{n.d(e,{A:()=>d});var r=n(601),a=n.n(r),o=n(314),i=n.n(o),s=n(47),c=i()(a());c.i(s.A),c.push([t.id,'.topbar-container,\n.hamburger-container {\n  height: var(--h-topbar-container);\n}\n\n::marker {\n  content: "";\n}\n\nbody {\n  font-family: var(--ff-primary);\n  background-color: var(--clr-primary-100);\n  color: var(--clr-neutral-700);\n}\n\nh1 {\n  font: var(--fw-bold) var(--fs-primary-heading) var(--ff-primary);\n}\n\nbody {\n  --fg-r-side: 1;\n  --fg-sidebar: 2;\n  --fb-sidebar: calc(\n    100% * calc(var(--fg-r-side) / calc(var(--fg-r-side) + var(--fg-sidebar)))\n  );\n  --fb-sidebar-fixed: 290px;\n  display: flex;\n}\n\n.side-bar {\n  flex: 0 0 var(--fb-sidebar-fixed);\n  background-color: var(--clr-neutral-700);\n}\n\n.side-bar > :not(dialog) * {\n  color: var(--clr-primary-100);\n}\n\n.r-side {\n  flex: 0 1 var(--w-page-primary);\n  margin: 0 auto;\n}\n\n.page {\n}\n\n.task-form {\n  display: none;\n}\n\ndiv.task-container {\n  display: flex;\n  align-items: start;\n}\n\n.page__btn-add-task {\n  display: none;\n}\n\n.task-container[data-priority="p1"] {\n  border: 1px solid red;\n}\n\n.task-container[data-priority="p2"] {\n  border: 1px solid yellow;\n}\n\n.task-container[data-priority="p3"] {\n  border: 1px solid blue;\n}\n\n.side-bar {\n  display: flex;\n  flex-direction: column;\n  transition: margin-left var(--as-nav) ease;\n}\n\n.side-bar__project-list .btn:hover * {\n  color: var(--clr-neutral-700);\n}\n\n.side-bar.hidden {\n  margin-left: calc(-1 * var(--fb-sidebar-fixed));\n}\n\n.hamburger-container.nav-open {\n  margin-right: 10px;\n}\n\n.hamburger-container {\n  margin-right: -90px;\n  align-self: flex-end;\n  z-index: 1;\n  transition: margin-right var(--as-nav) ease;\n  background-color: grey;\n  cursor: pointer;\n}\n\n.my-projects-container {\n  display: flex;\n}\n\n@media only screen and (max-width: 800px) {\n  .side-bar.hidden {\n    transform: translateX(-100%);\n    margin-left: 0;\n  }\n\n  .side-bar {\n    position: fixed;\n    transition: transform var(--as-nav) ease;\n    transform: translateX(0);\n  }\n}\n',""]);const d=c},47:(t,e,n)=>{n.d(e,{A:()=>m});var r=n(601),a=n.n(r),o=n(314),i=n.n(o),s=n(417),c=n.n(s),d=new URL(n(828),n.b),l=new URL(n(651),n.b),p=i()(a()),u=c()(d),f=c()(l);p.push([t.id,`@font-face {\n  font-family: "intertight";\n  src: url(${u}) format("woff2");\n}\n\n@font-face {\n  font-family: "intertight_italic";\n  src: url(${f}) format("woff2");\n}\n\n:root {\n  --clr-accent-400: #9f0217;\n  --clr-accent-300: linear-gradient(45deg, #ffa0a0, #ffb45b);\n  --clr-primary-100: #ebebeb;\n  --clr-primary-200: #e6e6e6;\n  --clr-neutral-700: #121212;\n\n  --ff-primary: "intertight", helvetica, arial;\n  --ff-italics: "intertight_italic", helvetica, arial;\n\n  --fw-light: 300;\n  --fw-regular: 400;\n  --fw-light-bold: 500;\n  --fw-semi-bold: 600;\n  --fw-bold: 700;\n\n  --fs-300: 0.85rem;\n  --fs-400: 1rem;\n  --fs-600: 1.25rem;\n  --fs-700: 2.2rem;\n  --fs-body: var(--fs-400);\n  --fs-primary-heading: var(--fs-700);\n  --fs-secondary-heading: var(--fs-600);\n  --fs-button: var(--fs-400);\n\n  --h-topbar-container: 50px;\n\n  --w-page-primary: 60%;\n\n  --as-nav: 500ms;\n\n  --btn-box-shadow: 0px 1px 10px #0000001a;\n}\n\n/*\n  1. Use a more-intuitive box-sizing model.\n*/\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n/*\n  2. Remove default margin\n*/\n*:not(dialog) {\n  margin: 0;\n}\n/*\n  Typographic tweaks!\n  3. Add accessible line-height\n  4. Improve text rendering\n*/\nbody {\n  line-height: 1.5;\n  -webkit-font-smoothing: antialiased;\n}\n/*\n  5. Improve media defaults\n*/\nimg,\npicture,\nvideo,\ncanvas,\nsvg {\n  display: block;\n  max-width: 100%;\n}\n/*\n  6. Remove built-in form typography styles\n*/\ninput,\nbutton,\ntextarea,\nselect {\n  font: inherit;\n}\n/*\n  7. Avoid text overflows\n*/\np,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  overflow-wrap: break-word;\n}\n/*\n  8. Create a root stacking context\n*/\n#root,\n#__next {\n  isolation: isolate;\n}\n\n/*\n  9. Set default button styles\n*/\nbutton {\n  cursor: pointer;\n  background-color: transparent;\n  border: 1px solid grey;\n}\n\n/*\n  10. Set min-height to 100vh\n*/\n\nbody {\n  min-height: 100vh;\n}\n\n/*\n  11. Set ul padding to li\n*/\nul {\n  padding: 0;\n}\nli {\n  padding-left: 20px;\n}\n\n/*\n  custom classes\n*/\n.flex {\n  display: flex;\n}\n\n.btn {\n  cursor: pointer;\n}\n\n.btn:hover {\n  background-color: var(--clr-primary-200);\n  box-shadow: var(--btn-box-shadow);\n}\n`,""]);const m=p},314:t=>{t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n="",r=void 0!==e[5];return e[4]&&(n+="@supports (".concat(e[4],") {")),e[2]&&(n+="@media ".concat(e[2]," {")),r&&(n+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),n+=t(e),r&&(n+="}"),e[2]&&(n+="}"),e[4]&&(n+="}"),n})).join("")},e.i=function(t,n,r,a,o){"string"==typeof t&&(t=[[null,t,void 0]]);var i={};if(r)for(var s=0;s<this.length;s++){var c=this[s][0];null!=c&&(i[c]=!0)}for(var d=0;d<t.length;d++){var l=[].concat(t[d]);r&&i[l[0]]||(void 0!==o&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=o),n&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=n):l[2]=n),a&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=a):l[4]="".concat(a)),e.push(l))}},e}},417:t=>{t.exports=function(t,e){return e||(e={}),t?(t=String(t.__esModule?t.default:t),/^['"].*['"]$/.test(t)&&(t=t.slice(1,-1)),e.hash&&(t+=e.hash),/["'() \t\n]|(%20)/.test(t)||e.needQuotes?'"'.concat(t.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):t):t}},601:t=>{t.exports=function(t){return t[1]}},72:t=>{var e=[];function n(t){for(var n=-1,r=0;r<e.length;r++)if(e[r].identifier===t){n=r;break}return n}function r(t,r){for(var o={},i=[],s=0;s<t.length;s++){var c=t[s],d=r.base?c[0]+r.base:c[0],l=o[d]||0,p="".concat(d," ").concat(l);o[d]=l+1;var u=n(p),f={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==u)e[u].references++,e[u].updater(f);else{var m=a(f,r);r.byIndex=s,e.splice(s,0,{identifier:p,updater:m,references:1})}i.push(p)}return i}function a(t,e){var n=e.domAPI(e);return n.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;n.update(t=e)}else n.remove()}}t.exports=function(t,a){var o=r(t=t||[],a=a||{});return function(t){t=t||[];for(var i=0;i<o.length;i++){var s=n(o[i]);e[s].references--}for(var c=r(t,a),d=0;d<o.length;d++){var l=n(o[d]);0===e[l].references&&(e[l].updater(),e.splice(l,1))}o=c}}},659:t=>{var e={};t.exports=function(t,n){var r=function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}(t);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},540:t=>{t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},56:(t,e,n)=>{t.exports=function(t){var e=n.nc;e&&t.setAttribute("nonce",e)}},825:t=>{t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=t.insertStyleElement(t);return{update:function(n){!function(t,e,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var a=void 0!==n.layer;a&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,a&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var o=n.sourceMap;o&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),e.styleTagTransform(r,t,e.options)}(e,t,n)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},113:t=>{t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}},651:(t,e,n)=>{t.exports=n.p+"intertight-italic-variable-font.asset..woff2"},828:(t,e,n)=>{t.exports=n.p+"intertight-variable-font.asset..woff2"}},e={};function n(r){var a=e[r];if(void 0!==a)return a.exports;var o=e[r]={id:r,exports:{}};return t[r](o,o.exports,n),o.exports}n.m=t,n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t;n.g.importScripts&&(t=n.g.location+"");var e=n.g.document;if(!t&&e&&(e.currentScript&&(t=e.currentScript.src),!t)){var r=e.getElementsByTagName("script");if(r.length)for(var a=r.length-1;a>-1&&(!t||!/^http(s?):/.test(t));)t=r[a--].src}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=t})(),n.b=document.baseURI||self.location.href,n.nc=void 0,(()=>{const t={form:{attributes:{method:"post",action:""}}},e=()=>({appendChildren(...t){for(let e of t)void 0!==e&&this.appendChild(e)}});function r(n,r){const a=document.createElement(n);if(void 0!==(r=t[n]?Object.assign({},t[n],r):r)){for(let t in r.attributes)a.setAttribute(t,r.attributes[t]);for(let t in r.property)a[t]=r.property[t]}return Object.assign(a,e())}const a=function(){const t=t=>document.querySelector(t);return t.all=t=>document.querySelectorAll(t),t}(),o={},i=(t,e)=>{o[t]=o[t]||[],o[t].push(e)},s=(t,e,n)=>{let r=null;return o[t]&&o[t].forEach((function(t){t.name===n?r=t(e):t(e)})),r};let c=[];const d=t=>({type:"inNOutInterface",add(e){t.add(e,this)},remove(e){t.remove(e,this)}}),l=t=>({type:"fetchAllInterface",fetchAll(){return t.fetchAll(this)}}),p=t=>({type:"fetchOneInterface",fetch(e){return t.fetch(e,this)}}),u=t=>({type:"modifyInterface",modify(e,n){return t.modify(e,n,this)}}),f=(t,e=[])=>{const n={add:(t,e)=>(e.tasks.push(t),t),remove:(t,e)=>e.tasks.splice(t,1),fetchAll:t=>t.tasks.slice(),modify:(t,e,n)=>Object.assign(n.tasks[t],e)},r=d(n),a=l(n),o=u(n),i=Object.assign(r,a,o);return Object.assign(Object.create(i),t,{tasks:e})},m=(t=>{const e={add:t=>(t.taskManager=f(),c.push(t),t),remove:t=>{for(let e=0;e<c.length;e++)t===c[e].name&&c.splice(e,1)},fetchAll:()=>c.slice(),fetch:t=>b(t),modify:(t,e)=>Object.assign(t,e)},n=d(e),r=l(e),a=p(e),o=u(e),i=Object.assign({},n,r,a,o);return Object.assign(Object.create(i),void 0)})();function b(t){for(let e of c)if(t===e.name)return e}function h(t){const{tIndex:e,pName:n}=t;b(n).taskManager.remove(e),y()}function v(t){for(let e of c)if(e.name===t)return!1;return!0}const g=localStorage.getItem("todolist");function y(){localStorage.setItem("todolist",JSON.stringify(c))}g?function(){const t=JSON.parse(g);t.forEach((t=>{const e=t.taskManager.tasks;t.taskManager=f({},e)})),c=t}():(m.add({name:"sicko",color:"red"}),m.add({name:"joker",color:"blue"}),localStorage.setItem("todolist",JSON.stringify(c))),i("addNewProject",(function(t){m.add(t),y()})),i("addNewTask",(function(t){const[e,n]=t,r=b(e),a=void 0!==r;return a&&r.taskManager.add(n),y(),a})),i("getProjectTasks",(function(t){let e=b(t).taskManager.fetchAll();s("return__getProjectTasks",{tasks:e,pName:t})})),i("taskCompletedLogic",h),i("editTask",(function({pName:t,tIndex:e,opts:n}){b(t).taskManager.modify(e,n),y()})),i("getProjectList",(function(){const t=m.fetchAll();s("return__getProjectList",t)})),i("removeProject",(function(t){m.remove(t),y()})),i("removeTask",h),i("editProject",(function({oldName:t,name:e,color:n}){m.modify(b(t),{name:e,color:n}),y()}));const k=a(".btn-add-project"),_=a("dialog.edit-project"),j=a("dialog.add-project"),x=a(".btn__form-add-project"),C=a("dialog.add-project > form"),A=a("#project-name"),w=a("#project-color"),L=a(".heading>h1"),N=a(".task-form"),E=a(".page__btn-add-task"),S=a("#task_name"),T=a("#due_date"),$=a("#task_dec"),P=a(".page"),I=a(".task-form__btn-add-task"),O=a(".task-form__btn-cancel"),M=a(".btn-project-home"),D=a(".btn__cancel-project-form"),q=a(".btn__form-edit-project"),R=a(".hamburger-container"),U=a(".side-bar"),V=a(".projects-nav-container"),J=a(".page__projects-nav-primary"),z="data-priority";function F(t){const e=r("div",{attributes:{class:"task-info"}}),n=r("h3",{property:{textContent:`${t.name}`},attributes:{class:"name"}}),a=t.desc?r("p",{attributes:{class:"desc"},property:{textContent:`${t.desc}`}}):void 0,o=r("span",{attributes:{class:"due-date"},property:{textContent:`${t.dueDate}`}});return e.appendChildren(n,a,o),e}M.addEventListener("click",(()=>s("getProjectList"))),R.addEventListener("click",(function(){U.classList.toggle("hidden"),this.classList.toggle("nav-open")})),E.addEventListener("click",(function(t){N.style.display="block",t.target.style.display="none"})),O.addEventListener("click",(function(){N.style.display="none",E.style.display="block"}));const H=()=>j.showModal();function X(t){const e=this.getAttribute("data-project-name");t.target.classList.contains("side-bar__remove-project-btn")?et(e):t.target.classList.contains("project-edit-button")?rt(this.getAttribute("data-project-name")):s("getProjectTasks",e)}function B(t){const e=r("li",{attributes:{class:"side-bar__project btn","data-project-name":t.name}}),n=r("div",{attributes:{class:"side-bar__project-container"}}),o=r("span",{property:{textContent:t.name},attributes:{class:"project-name"}}),i=r("div",{attributes:{class:"side-bar__project-button-container"}}),s=r("button",{attributes:{class:"side-bar__remove-project-btn"},property:{textContent:"remove"}}),c=r("button",{attributes:{class:"project-edit-button"},property:{textContent:"edit"}});i.appendChildren(c,s),n.appendChildren(o,i),e.appendChild(n),e.addEventListener("click",X),a(".side-bar__project-list").appendChild(e)}function Q(t){const e=a(".task-list"),n=r("li");n.addEventListener("click",W);const o=r("input",{attributes:{type:"radio",name:`${t.name}`,value:t.name}});o.addEventListener("click",Y);const i=F(t),s=r("div",{attributes:{class:"task-container",[z]:t.priority}}),c=r("button",{attributes:{class:"btn-edit-task"},property:{textContent:"edit"}}),d=r("button",{attributes:{class:"btn-remove-task"},property:{textContent:"remove"}});s.appendChildren(o,i,c,d),n.appendChild(s),e.appendChild(n)}function G(){s("removeTask",{tIndex:Array.from(this.parentNode.children).indexOf(this),pName:L.getAttribute("data-projectNm")}),this.remove()}function K(){const t=this.querySelector.bind(this),e=t(".task-info .name").textContent;let n=t(".task-info .desc");n=null===n?"":n.textContent;const a=t(".task-info .due-date").textContent,o=t(".task-container").getAttribute(z).split("")[1],i=r("div",{attributes:{class:"task-edit-form-container"}}),c=r("form"),d=r("fieldset"),l=r("legend",{property:{textContent:"edit"}}),p=r("input",{attributes:{type:"text",id:"edit_tName",name:"task_name",placeholder:"task name",value:`${e}`,required:null}}),u=r("label",{attributes:{for:"edit_tName"},property:{textContent:"name"}}),f=r("input",{attributes:{type:"textarea",id:"edit_tDesc",name:"task_desc",placeholder:"description",value:`${n}`}}),m=r("label",{attributes:{for:"edit_tDesc"},property:{textContent:"description"}}),b=r("input",{attributes:{type:"date",id:"edit_tDate",name:"due_date",value:`${a}`,required:null}}),h=r("label",{attributes:{for:"edit_tDesc"},property:{textContent:"due date"}}),v=r("fieldset",{}),g=r("legend",{property:{textContent:"priority"}}),y={};for(let t=1;t<=3;t++){const e={attributes:{type:"radio",id:`edit_p${t}`,name:"priorityp",value:`p${t}`}},n={attributes:{for:`edit_p${t}`},property:{textContent:`priority ${t}`}};t===+o&&(e.attributes.checked=null),y[`p${t}`]=r("input",e),y[`label_p${t}`]=r("label",n)}const k=r("button",{attributes:{class:"edit-form__btn-submit",type:"submit"},property:{textContent:"save"}});k.addEventListener("click",(e=>{if(e.stopPropagation(),!t("#edit_tName").checkValidity()||!t("#edit_tDate").checkValidity())return;e.preventDefault();const n=t("#edit_tName").value,r=t("#edit_tDesc").value,a=t("#edit_tDate").value,o=t(".task-edit-form-container input:not(:disabled):checked").value,i=t(".task-container");i.removeChild(t(".task-info"));const c=F({name:n,desc:r,dueDate:a});t('.task-container input[type="radio"]').after(c),i.setAttribute(z,o);const d=L.getAttribute("data-projectNm"),l={name:n,desc:r,dueDate:a,priority:o},p=function(t){const e=document.querySelectorAll(".page .task-list>li");for(let t=0;t<e.length;t++)if(e[t])return t}();s("editTask",{pName:d,tIndex:p,opts:l}),this.removeChild(t(".task-edit-form-container")),t(".task-container").removeAttribute("style")}));const _=r("button",{attributes:{class:"edit-form__btn-cancel"},property:{textContent:"cancel"}});_.addEventListener("click",(e=>{e.stopPropagation();const n=t(".task-edit-form-container"),r=t(".task-container");this.removeChild(n),r.removeAttribute("style")})),v.appendChildren(g,y.p1,y.label_p1,y.p2,y.label_p2,y.p3,y.label_p3),d.appendChildren(l,u,p,m,f,h,b,v,k,_),c.appendChild(d),i.appendChild(c),this.appendChild(i),this.querySelector(".task-container").style.display="none"}function W(t){if(t.target.classList.contains("btn-remove-task"))G.call(this);else{if(!t.target.classList.contains("btn-edit-task"))return;K.call(this)}}function Y(t){const e=L.getAttribute("data-projectNm");let n;const r=a(".task-list").querySelectorAll('.task-container>input[type="radio"]');for(let e=0;e<r.length;e++)if(r[e]===t.target){n=e;break}a(`.task-list>li:nth-child(${n+1})`).remove(),s("taskCompletedLogic",{tIndex:n,pName:e})}function Z(t){!function(){const t=a(".page__projects-projects-list"),e=a(".side-bar__project-list"),n=a(".page > .task-list"),r=a(".page__btn-add-project");e&&e.remove(),t&&t.remove(),n&&n.remove(),r&&r.remove()}(),L.textContent="My projects",L.setAttribute("data-is-projects-page",!0),E.setAttribute("style","display: none;");const e=r("ul",{attributes:{class:"page__projects-list"}}),n=r("ul",{attributes:{class:"side-bar__project-list"}});V.appendChild(n),t.forEach((t=>{tt(t,e),B(t)}));const o=r("button",{attributes:{class:"page__btn-add-project"},property:{textContent:"add project"}});o.addEventListener("click",H),J.appendChild(e),P.prepend(o)}function tt(t,e=a(".page__projects-list")){const n=r("li",{attributes:{class:"project-list__project-item btn","data-project-name":t.name}}),o=r("div",{attributes:{class:"project-item__container flex"}}),i=r("h3",{property:{textContent:t.name},attributes:{class:"project-name"}}),s=r("div",{attributes:{class:"page__project-list__btn-container"}}),c=r("button",{attributes:{class:"btn-container__edit"},property:{textContent:"edit"}}),d=r("button",{attributes:{class:"btn-container__remove"},property:{textContent:"remove"}});n.addEventListener("click",nt),s.appendChildren(c,d),o.appendChildren(i,s),n.appendChild(o),e.appendChild(n)}function et(t){document.querySelectorAll(`li[data-project-name="${t}"]`).forEach((t=>t.remove())),s("removeProject",t),t===L.getAttribute("data-projectNm")&&s("getProjectList")}function nt(t){const e=this.getAttribute("data-project-name");t.target.classList.contains("btn-container__remove")?et(e):t.target.classList.contains("btn-container__edit")?rt(e):s("getProjectTasks",e)}function rt(t){_.showModal(),q.setAttribute("data-project-name",t)}D.addEventListener("click",(function(){C.reset(),j.close()})),k.addEventListener("click",H),x.addEventListener("click",(function(t){if(!A.checkValidity())return;if(t.preventDefault(),!v(A.value))return void alert("project exists");const e={};e.name=A.value,e.color=w.value,s("addNewProject",e),j.close(),C.reset(),B(e),"false"!==L.getAttribute("data-is-projects-page")&&tt(e)})),I.addEventListener("click",(function(t){if(!S.checkValidity())return;if(!T.checkValidity())return;t.preventDefault();const e=L.getAttribute("data-projectNm"),n=a('.page .task-form input[type="radio"]:not(:disabled):checked'),r={name:`${S.value}`,dueDate:`${T.value}`,desc:`${$.value}`,priority:n.value};s("addNewTask",[e,r],"addNewTask")?Q(r):alert("project doesn't exist")})),q.addEventListener("click",(function(t){const e=a("#edit-project-name").value;if(!a("#edit-project-name").checkValidity())return;if(t.preventDefault(),!v(e))return;const n=this.getAttribute("data-project-name"),r=a("#edit-project-color > :checked").value;document.querySelectorAll(`li[data-project-name="${n}"`).forEach((t=>{t.querySelector(".project-name").textContent=e,t.setAttribute("data-project-name",e)})),_.close(),s("editProject",{oldName:n,name:e,color:r})})),a(".btn__cancel-edit-project").addEventListener("click",(function(){_.close(),a("dialog.edit-project >form").reset()})),i("return__getProjectTasks",(function({tasks:t,pName:e}){const n=a(".page__btn-add-project"),o=a(".page> .task-list");n&&n.remove(),o&&o.remove(),"true"===L.getAttribute("data-is-projects-page")&&(a(".page__projects-list").remove(),L.setAttribute("data-is-projects-page",!1)),P.prepend(r("ul",{attributes:{class:"task-list"}})),t.forEach((t=>Q(t))),L.setAttribute("data-projectNm",e),L.textContent=L.getAttribute("data-projectNm"),N.style.display="none",E.style.display="block"})),i("return__getProjectList",Z),i("initApp",(function(t){window.screen.width>800||(U.setAttribute("class","side-bar hidden"),R.setAttribute("class","btn-hamburger")),Z(t)}));var at=n(72),ot=n.n(at),it=n(825),st=n.n(it),ct=n(659),dt=n.n(ct),lt=n(56),pt=n.n(lt),ut=n(540),ft=n.n(ut),mt=n(113),bt=n.n(mt),ht=n(621),vt={};vt.styleTagTransform=bt(),vt.setAttributes=pt(),vt.insert=dt().bind(null,"head"),vt.domAPI=st(),vt.insertStyleElement=ft(),ot()(ht.A,vt),ht.A&&ht.A.locals&&ht.A.locals,s("initApp",m.fetchAll())})()})();