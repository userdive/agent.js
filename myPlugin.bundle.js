!function(e){var t={};function n(r){if(t[r])return t[r].exports;var u=t[r]={i:r,l:!1,exports:{}};return e[r].call(u.exports,u,u.exports,n),u.l=!0,u.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var u in e)n.d(r,u,function(t){return e[t]}.bind(null,u));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=150)}({14:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,u,o="script";function c(e,t){var n=document.createElement(o),r=document.getElementsByTagName(o)[0];n.async=!0,n.defer=!0,n.src=e,n.charset="UTF-8",Object.keys(t).forEach(function(e){n.setAttribute(e,t[e])}),r.parentNode.insertBefore(n,r)}function i(e,t){return t[e]=t[e]||function(){(t[e].q=t[e].q||[]).push(arguments)},t[e]}t.inject=c,t.q=i,t.namespace="data-ud-namespace",t.default=function(e,n,o){var a;return r=r||e||"_ud",u=u||n||"https://cdn.userdive.com/agent.js",(o=o||window)[r]?o[r]:(c(u,((a={})[t.namespace]=r,a)),i(r,o))}},150:function(e,t,n){"use strict";n.r(t);var r=n(79),u=n.n(r),o=function(){function e(e){this.tracker=e}return e.prototype.echoId=function(){document.getElementById("app").innerHTML="<p>linkerParam: "+this.tracker.get("linkerParam")+"</p>"},e}();u()("myplugin",o)},79:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(14);t.default=function(e,t){var n=document.querySelector("["+r.namespace+"]");return r.q(n.getAttribute(r.namespace),window)("provide",e,t)}}});
//# sourceMappingURL=myPlugin.bundle.js.map