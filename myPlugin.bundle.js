/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 235);
/******/ })
/************************************************************************/
/******/ ({

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TAG_NAME = 'script';
function inject(source, attributes) {
    var element = document.createElement(TAG_NAME);
    var script = document.getElementsByTagName(TAG_NAME)[0];
    element.async = true;
    element.defer = true;
    element.src = source;
    element.charset = 'UTF-8';
    Object.keys(attributes).forEach(function (key) {
        element.setAttribute(key, attributes[key]);
    });
    script.parentNode.insertBefore(element, script);
}
exports.inject = inject;
function q(name, global) {
    global[name] =
        global[name] ||
            function () {
                (global[name].q = global[name].q || []).push(arguments);
            };
    return global[name];
}
exports.q = q;
exports.namespace = 'data-ud-namespace';
var name;
var source;
function default_1(overrideName, overrideSource, global) {
    name = name || (overrideName || '_ud');
    source = source || (overrideSource || 'https://cdn.userdive.com/agent.js');
    global = global || window;
    if (global[name]) {
        return global[name];
    }
    inject(source, (_a = {}, _a[exports.namespace] = name, _a));
    return q(name, global);
    var _a;
}
exports.default = default_1;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__userdive_provider__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__userdive_provider___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__userdive_provider__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1____ = __webpack_require__(237);


__WEBPACK_IMPORTED_MODULE_0__userdive_provider___default()('myplugin', __WEBPACK_IMPORTED_MODULE_1____["a" /* MyPlugin */]);


/***/ }),

/***/ 236:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var userdive_1 = __webpack_require__(11);
function default_1(pluginName, pluginConstructor) {
    var element = document.querySelector("[" + userdive_1.namespace + "]");
    return userdive_1.q(element.getAttribute(userdive_1.namespace), window)('provide', pluginName, pluginConstructor);
}
exports.default = default_1;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 237:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyPlugin; });
var MyPlugin = /** @class */ (function () {
    function MyPlugin(tracker) {
        this.tracker = tracker;
    }
    MyPlugin.prototype.echoId = function () {
        var element = document.getElementById('app');
        element.innerHTML = "<p>linkerParam: " + this.tracker.get('linkerParam') + "</p>";
    };
    return MyPlugin;
}());



/***/ })

/******/ });
//# sourceMappingURL=myPlugin.bundle.js.map