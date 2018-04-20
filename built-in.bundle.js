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
/******/ 	return __webpack_require__(__webpack_require__.s = 217);
/******/ })
/************************************************************************/
/******/ ({

/***/ 118:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader = false;
	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		registeredInModuleLoader = true;
	}
	if (true) {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				// We're using "expires" because "max-age" is not supported by IE
				attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				var stringifiedAttributes = '';

				for (var attributeName in attributes) {
					if (!attributes[attributeName]) {
						continue;
					}
					stringifiedAttributes += '; ' + attributeName;
					if (attributes[attributeName] === true) {
						continue;
					}
					stringifiedAttributes += '=' + attributes[attributeName];
				}
				return (document.cookie = key + '=' + value + stringifiedAttributes);
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!this.json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));


/***/ }),

/***/ 119:
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),

/***/ 120:
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && msCrypto.getRandomValues.bind(msCrypto));
if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),

/***/ 121:
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

module.exports = bytesToUuid;


/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(20);
var logger_1 = __webpack_require__(40);
var getWindowSize = function (w) { return ({
    h: w.innerHeight,
    w: w.innerWidth
}); };
var getResourceSize = function (d) {
    var body = d.body;
    return {
        h: body.clientHeight,
        w: body.clientWidth
    };
};
var getScreenSize = function (s) { return ({
    h: s.height,
    w: s.width
}); };
exports.getLocation = function () { return location; };
exports.getName = function (d) {
    var element = d.querySelector("[" + constants_1.NAMESPACE + "]");
    return element.getAttribute(constants_1.NAMESPACE);
};
exports.getOffset = function (w) { return ({
    x: w.scrollX || w.pageXOffset,
    y: w.scrollY || w.pageYOffset
}); };
exports.getEnv = function (page) {
    try {
        var d = document;
        var screenSize = getScreenSize(screen);
        var windowSize = getWindowSize(window);
        var resourceSize = getResourceSize(d);
        return {
            v: constants_1.VERSION,
            r: d.referrer,
            n: d.title,
            l: page,
            sh: screenSize.h,
            sw: screenSize.w,
            wh: windowSize.h,
            ww: windowSize.w,
            h: resourceSize.h,
            w: resourceSize.w
        };
    }
    catch (err) {
        logger_1.error(err);
    }
};
exports.validate = function (apis) {
    return !apis.some(function (api) { return !(api in window); });
};
//# sourceMappingURL=browser.js.map

/***/ }),

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var intervals = [];
function push(t, n) {
    for (var i = 0; i < n; i++) {
        intervals.push(t);
    }
}
push(2, 300);
exports.CUSTOM_INDEX = 20;
exports.INTERACT = 5;
exports.INTERVAL = intervals.sort();
exports.LISTENER = ['addEventListener', 'removeEventListener'];
exports.NAMESPACE = "data-ud-namespace";
exports.SCROLL = ['pageXOffset', 'pageYOffset'];
exports.TOUCH = ['ontouchstart', 'ontouchmove', 'ontouchend'];
exports.VERSION = 1;
exports.SETTINGS = {
    allowLinker: false,
    linkerName: '__ud',
    baseUrl: 'https://v1.userdive.com',
    cookieDomain: '',
    cookieExpires: 730,
    cookieName: '_ud',
    Raven: undefined
};
exports.MAX_EVENT_SEQ = 10;
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__userdive_agent__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__userdive_agent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__userdive_agent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__userdive_linker__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__userdive_linker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__userdive_linker__);


var agent = new __WEBPACK_IMPORTED_MODULE_0__userdive_agent___default.a('af57h6gb', 'auto');
agent.provide('linker', __WEBPACK_IMPORTED_MODULE_1__userdive_linker___default.a);
agent.require('linker');
agent.run('linker', 'autoLink', ['developers.userdive.com']);
agent.send('pageview');


/***/ }),

/***/ 218:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var objectAssign = __webpack_require__(15);
var browser_1 = __webpack_require__(19);
var constants_1 = __webpack_require__(20);
var core_1 = __webpack_require__(219);
var click_1 = __webpack_require__(231);
var mousemove_1 = __webpack_require__(232);
var scroll_1 = __webpack_require__(233);
var touch_1 = __webpack_require__(234);
var logger_1 = __webpack_require__(40);
var PLUGINS = 'plugins';
var Agent = /** @class */ (function () {
    function Agent(projectId, cookieDomain, fieldsObject) {
        var _this = this;
        this.plugins = {};
        var config = objectAssign({}, constants_1.SETTINGS, { cookieDomain: cookieDomain }, fieldsObject || {});
        this.core = new core_1.default(projectId, [click_1.default, mousemove_1.default, scroll_1.default, touch_1.default], config);
        this.linkerName = config.linkerName;
        logger_1.setup(config);
        if (browser_1.validate(constants_1.LISTENER.concat(['onpagehide']))) {
            window.addEventListener('pagehide', function () {
                _this.core.send([], true);
            }, false);
        }
    }
    Agent.prototype.send = function (type, data) {
        if (typeof type === 'object') {
            data = type;
            type = type.hitType;
        }
        var page;
        if (typeof data === 'object') {
            page = this.set(data).env.l;
        }
        switch (type) {
            // _ud('send', 'pageview')
            // _ud('send', 'pageview', internet.url())
            // _ud('send', 'pageview', { page: internet.url() })
            case 'pageview':
                this.core.pageview((typeof page === 'string' ? page : data) ||
                    browser_1.getLocation().href);
                break;
            case 'event':
                this.core.event(data);
                break;
        }
        return this.core;
    };
    Agent.prototype.set = function (key, value) {
        if (typeof key === 'string' && value) {
            return this.core.set(key, value);
        }
        return this.core.mergeDeep(key);
    };
    Agent.prototype.get = function (key) {
        return key === 'linkerParam'
            ? this.linkerName + "=" + this.core.get('userId')
            : '';
    };
    Agent.prototype.provide = function (name, pluginConstructor) {
        this[PLUGINS][name] = pluginConstructor;
        return this[PLUGINS][name];
    };
    Agent.prototype.require = function (pluginName, pluginOptions) {
        if (this[PLUGINS][pluginName]) {
            this[PLUGINS][pluginName] = new this[PLUGINS][pluginName](this, pluginOptions);
            return true;
        }
        return false;
    };
    Agent.prototype.run = function (pluginName, methodName) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var p = this[PLUGINS][pluginName];
        if (p && p[methodName]) {
            var res = p[methodName].apply(p, args);
            return res === undefined ? true : !!res;
        }
        return false;
    };
    Agent.prototype.subscribe = function (target, eventName, handler) {
        return this.core.observer.subscribe(target, eventName, handler);
    };
    return Agent;
}());
exports.default = Agent;
//# sourceMappingURL=agent.js.map

/***/ }),

/***/ 219:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var auto_cookie_1 = __webpack_require__(220);
var events_1 = __webpack_require__(119);
var js_cookie_1 = __webpack_require__(118);
var objectAssign = __webpack_require__(15);
var ui_event_observer_1 = __webpack_require__(221);
var uuid_1 = __webpack_require__(226);
var browser_1 = __webpack_require__(19);
var constants_1 = __webpack_require__(20);
var logger_1 = __webpack_require__(40);
var requests_1 = __webpack_require__(229);
var store_1 = __webpack_require__(230);
var generateId = function () { return uuid_1.v4().replace(/-/g, ''); };
var cacheValidator = function (_a) {
    var x = _a.x, y = _a.y, type = _a.type, left = _a.left, top = _a.top;
    if (x > 0 && y > 0 && type && left >= 0 && top >= 0) {
        return true;
    }
    return false;
};
var toInt = function (n) { return Math.floor(n); };
var createInteractData = function (d) {
    return cacheValidator(d)
        ? d.type + "," + d.id + "," + toInt(d.x) + "," + toInt(d.y) + "," + toInt(d.left) + "," + toInt(d.top)
        : '';
};
var findOrCreateUserId = function (_a, _b) {
    var allowLinker = _a.allowLinker, cookieDomain = _a.cookieDomain, expires = _a.cookieExpires, cookieName = _a.cookieName, path = _a.cookiePath, linkerName = _a.linkerName;
    var search = _b.search;
    var userId = js_cookie_1.get(cookieName);
    if (allowLinker) {
        var qs = search.trim().replace(/^[?#&]/, '');
        var linkerParam = qs
            .split('&')
            .filter(function (s) { return s.length && s.split('=')[0] === linkerName; })[0];
        var id = linkerParam ? linkerParam.split('=')[1] : undefined;
        if (id && id.length === 32 && !id.match(/[^A-Za-z0-9]+/)) {
            userId = id;
        }
    }
    if (!userId || allowLinker) {
        userId = userId || generateId();
        var writeCookie = cookieDomain === 'auto' ? auto_cookie_1.save : js_cookie_1.set;
        writeCookie(cookieName, userId, {
            domain: cookieDomain === 'auto' ? undefined : cookieDomain,
            expires: expires,
            path: path
        });
    }
    return userId;
};
var pathname2href = function (pathname) {
    return !/^http/.test(pathname)
        ? location.protocol + "//" + location.host + pathname
        : pathname;
};
var AgentCore = /** @class */ (function (_super) {
    __extends(AgentCore, _super);
    function AgentCore(id, eventsClass, // TODO
    settings) {
        var _this = this;
        var userId = findOrCreateUserId(settings, browser_1.getLocation());
        _this = _super.call(this, userId) || this;
        _this.id = generateId();
        _this.clear();
        _this.events = [];
        _this.interacts = [];
        _this.interval = [];
        _this.interactId = 0;
        _this.eventId = 0;
        _this.emitter = new events_1.EventEmitter();
        _this.observer = new ui_event_observer_1.UIEventObserver(); // singleton
        eventsClass.forEach(function (Class) {
            _this.events.push(new Class(_this.id, _this.emitter, _this.observer));
        });
        if (!id || !userId) {
            logger_1.raise('need generated id');
            return;
        }
        _this.baseUrl = settings.baseUrl + "/" + id + "/" + userId;
        _this.emitter.on(_this.id, _this.updateInteractCache.bind(_this));
        return _this;
    }
    AgentCore.prototype.pageview = function (page) {
        var _this = this;
        this.send([], true);
        if (!this.loadTime) {
            this.bind();
        }
        var data = browser_1.getEnv(pathname2href(page));
        if (!data || !this.baseUrl) {
            return logger_1.warning("failed init");
        }
        this.merge({ type: 'env', data: data });
        this.interval = constants_1.INTERVAL.concat();
        this.interactId = 0;
        this.eventId = 0;
        this.loadTime = Date.now();
        this.sendWithUpdate();
        requests_1.get(this.baseUrl + "/" + this.loadTime + "/env.gif", requests_1.obj2query(objectAssign({}, this.get('env'), this.get('custom')) /* TODO */), function () {
            _this.destroy();
        });
        this.set('page', undefined); // remove locale cache
    };
    AgentCore.prototype.event = function (_a) {
        var category = _a.eventCategory, label = _a.eventLabel, action = _a.eventAction, value = _a.eventValue;
        this.eventId++;
        var isNumber = function (n) { return typeof n === 'number' && n >= 0; };
        if (this.eventId <= constants_1.MAX_EVENT_SEQ &&
            category &&
            action &&
            (!value || isNumber(value))) {
            this.send([
                "e=" + this.eventId + "," + category + "," + action + "," + (label || '') + (isNumber(value) ? ',' + value : '')
            ], true);
        }
    };
    AgentCore.prototype.destroy = function () {
        this.emitter.removeAllListeners(this.id);
        this.events.forEach(function (e) { return e.off(); });
        this.loadTime = 0;
    };
    AgentCore.prototype.send = function (query, force) {
        var _this = this;
        this.interacts.forEach(function (data) {
            var q = createInteractData(data);
            if (q.length) {
                query.push("d=" + q);
            }
        });
        if (this.baseUrl &&
            (query.length >= constants_1.INTERACT || (force && query.length > 0))) {
            requests_1.get(this.baseUrl + "/" + this.loadTime + "/int.gif", query.concat(requests_1.obj2query(this.get('custom') /* TODO */)), function () {
                _this.destroy();
            });
            this.interacts.length = 0;
        }
    };
    AgentCore.prototype.sendWithUpdate = function () {
        var _this = this;
        Object.keys(this.cache).forEach(function (key) {
            var cache = _this.cache[key]; // TODO
            if (cacheValidator(cache)) {
                cache.id = _this.interactId;
                _this.interacts.push(cache);
            }
        });
        this.clear();
        this.send([]);
        if (this.loadTime) {
            var delay = this.interval.shift();
            if (delay !== undefined && delay >= 0) {
                setTimeout(this.sendWithUpdate.bind(this), delay * 1000);
            }
            this.interactId++;
        }
    };
    AgentCore.prototype.bind = function () {
        this.events.forEach(function (e) { return e.on(); });
    };
    AgentCore.prototype.updateInteractCache = function (data) {
        if (cacheValidator(data) && this.loadTime) {
            this.cache[data.type] = data;
        }
    };
    AgentCore.prototype.clear = function () {
        this.cache = {
            a: {},
            l: {}
        };
    };
    return AgentCore;
}(store_1.default));
exports.default = AgentCore;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 220:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cookies = __webpack_require__(118);
function removeNaked() {
    var domain = "" + location.hostname;
    return domain.indexOf('www.') === 0 ? domain.substring(4) : domain;
}
function setCookie(domainParts, name, options, data) {
    var domain = domainParts[domainParts.length - 1];
    var attr = options;
    for (var i = 2; i <= domainParts.length; i++) {
        domain = domainParts[domainParts.length - i] + "." + domain;
        attr.domain = domain;
        cookies.set(name, data, attr);
        if (cookies.get(name)) {
            return domain;
        }
    }
    cookies.set(name, data, options);
    return cookies.get(name);
}
function save(name, data, options) {
    var value = cookies.get(name);
    if (value) {
        return value;
    }
    var domainParts = removeNaked().split('.');
    var subDomain = domainParts[domainParts.length - 1];
    if (domainParts.length === 4 && parseInt(subDomain, 10) == subDomain) {
        return cookies.get(name);
    }
    if (data) {
        setCookie(domainParts, name, options || {}, data);
    }
    return cookies.get(name);
}
exports.save = save;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 221:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// LICENSE : MIT


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UIEventObserver = exports.eventObserver = undefined;

var _UIEventObserver = __webpack_require__(222);

var _UIEventObserver2 = _interopRequireDefault(_UIEventObserver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// singleton
var eventObserver = new _UIEventObserver2.default();
exports.eventObserver = eventObserver;
exports.UIEventObserver = _UIEventObserver2.default;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 222:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// LICENSE : MIT


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DOMEventEmitter = __webpack_require__(223);

var _DOMEventEmitter2 = _interopRequireDefault(_DOMEventEmitter);

var _EventTargetMap = __webpack_require__(224);

var _EventTargetMap2 = _interopRequireDefault(_EventTargetMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * UIEventObserver class provide performant/simple way to subscribe to browser DOM UI Events.
 * @public
 */
var UIEventObserver = function () {
    function UIEventObserver() {
        _classCallCheck(this, UIEventObserver);

        this._eventTargetMap = new _EventTargetMap2.default();
        this._eventHandlerMap = new _EventTargetMap2.default();
    }

    /**
     * registers the specified `handler` on the `target` element it's called `eventName`.
     * @param {Object} target target Element Node
     * @param {string} eventName event name
     * @param {Function} handler event handler
     * @returns {Function} unsubscribe handler
     * @public
     */


    _createClass(UIEventObserver, [{
        key: "subscribe",
        value: function subscribe(target, eventName, handler) {
            var _this = this;

            var domEventEmitter = this._eventTargetMap.get([eventName, target]);
            if (!domEventEmitter) {
                domEventEmitter = this._createEventEmitter(domEventEmitter);
                this._eventTargetMap.set([eventName, target], domEventEmitter);
                var _handler = function _handler(event) {
                    domEventEmitter.emit(event);
                };
                this._eventHandlerMap.set([eventName, target], _handler);
                target.addEventListener(eventName, _handler);
            }
            domEventEmitter.on(handler);
            return function () {
                _this.unsubscribe(target, eventName, handler);
            };
        }

        /**
         * registers the specified `handler` on the `target` element it's called `eventName`.
         * It is called at once difference from UIEventObserver#subscribe
         * @param {Object} target target Element Node
         * @param {string} eventName event name
         * @param {Function} handler event handler
         * @returns {Function} unsubscribe handler
         * @public
         */

    }, {
        key: "subscribeOnce",
        value: function subscribeOnce(target, eventName, handler) {
            var _this2 = this;

            var onceHandler = function onceHandler(event) {
                handler(event);
                _this2.unsubscribe(target, eventName, onceHandler);
            };
            return this.subscribe(target, eventName, onceHandler);
        }

        /**
         * removes the event `handler` previously registered with UIEventObserver#subscribe
         * @param {Object} target target Element Node
         * @param {string} eventName event name
         * @param {Function} handler event handler
         * @public
         */

    }, {
        key: "unsubscribe",
        value: function unsubscribe(target, eventName, handler) {
            var domEventEmitter = this._eventTargetMap.get([eventName, target]);
            if (!domEventEmitter) {
                return;
            }
            domEventEmitter.removeListener(handler);
            target.removeEventListener(eventName, handler);
            this._eventHandlerMap.delete([eventName, target]);
        }

        /**
         * unsubscribe all events with DOM Event
         * @public
         */

    }, {
        key: "unsubscribeAll",
        value: function unsubscribeAll() {
            var _this3 = this;

            this._eventTargetMap.forEach(function (target, eventName) {
                var handler = _this3._eventHandlerMap.get([eventName, target]);
                if (handler) {
                    _this3.unsubscribe(target, eventName, handler);
                }
            });
        }

        /**
         * if has a subscriber at least one, return true
         * @param {Object} targetElement
         * @param {string} domEventName
         * @returns {boolean}
         * @public
         */

    }, {
        key: "hasSubscriber",
        value: function hasSubscriber(targetElement, domEventName) {
            return this._eventHandlerMap.has([domEventName, targetElement]);
        }

        /**
         * @param eventName
         * @returns {DOMEventEmitter}
         * @private
         */

    }, {
        key: "_createEventEmitter",
        value: function _createEventEmitter(eventName) {
            return new _DOMEventEmitter2.default(eventName);
        }
    }]);

    return UIEventObserver;
}();

exports.default = UIEventObserver;
//# sourceMappingURL=UIEventObserver.js.map

/***/ }),

/***/ 223:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// LICENSE : MIT


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventEmitter = __webpack_require__(119);
/**
 * The EventEmitter bind `eventName`
 */

var DOMEventEmitter = function (_EventEmitter) {
    _inherits(DOMEventEmitter, _EventEmitter);

    function DOMEventEmitter(eventName) {
        _classCallCheck(this, DOMEventEmitter);

        var _this = _possibleConstructorReturn(this, (DOMEventEmitter.__proto__ || Object.getPrototypeOf(DOMEventEmitter)).call(this));

        _this.eventName = eventName;
        _this.setMaxListeners(0);
        return _this;
    }

    _createClass(DOMEventEmitter, [{
        key: "on",
        value: function on(handler) {
            _get(DOMEventEmitter.prototype.__proto__ || Object.getPrototypeOf(DOMEventEmitter.prototype), "on", this).call(this, this.eventName, handler);
        }
    }, {
        key: "emit",
        value: function emit(event) {
            _get(DOMEventEmitter.prototype.__proto__ || Object.getPrototypeOf(DOMEventEmitter.prototype), "emit", this).call(this, this.eventName, event);
        }
    }, {
        key: "removeListener",
        value: function removeListener(handler) {
            _get(DOMEventEmitter.prototype.__proto__ || Object.getPrototypeOf(DOMEventEmitter.prototype), "removeListener", this).call(this, this.eventName, handler);
        }
    }]);

    return DOMEventEmitter;
}(EventEmitter);

exports.default = DOMEventEmitter;
//# sourceMappingURL=DOMEventEmitter.js.map

/***/ }),

/***/ 224:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// LICENSE : MIT


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = __webpack_require__(225),
    MapLike = _require.MapLike;
/**
 * EventTargetMap use `eventName` and `target` as a key.
 * It means that [eventName, target] tuple object as a key.
 */


var EventTargetMap = function () {
    function EventTargetMap() {
        _classCallCheck(this, EventTargetMap);

        this._eventMap = new MapLike();
    }

    /**
     * @param {string} eventName
     * @param {Object} target
     * @param {*} handler
     */


    _createClass(EventTargetMap, [{
        key: "set",
        value: function set(_ref, handler) {
            var _ref2 = _slicedToArray(_ref, 2),
                eventName = _ref2[0],
                target = _ref2[1];

            var targetMap = this._getTargetMap(eventName);
            targetMap.set(target, handler);
        }

        /**
         *
         * @param {string} eventName
         * @param {Object} target
         * @returns {MapLike}
         */

    }, {
        key: "get",
        value: function get(_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
                eventName = _ref4[0],
                target = _ref4[1];

            var targetMap = this._getTargetMap(eventName);
            return targetMap.get(target);
        }

        /**
         * @param {string} eventName
         * @param {Object} target
         * @returns {boolean}
         */

    }, {
        key: "has",
        value: function has(_ref5) {
            var _ref6 = _slicedToArray(_ref5, 2),
                eventName = _ref6[0],
                target = _ref6[1];

            var targetMap = this._getTargetMap(eventName);
            return targetMap.has(target);
        }

        /**
         * @param {function(target,eventName)}handler
         */

    }, {
        key: "forEach",
        value: function forEach(handler) {
            this._eventMap.forEach(function (targetMap, eventName) {
                targetMap.forEach(function (targetEventEmitter, target) {
                    handler(target, eventName);
                });
            });
        }

        /**
         * @param {string} eventName
         * @param {Object} target
         * @returns {boolean}
         */

    }, {
        key: "delete",
        value: function _delete(_ref7) {
            var _ref8 = _slicedToArray(_ref7, 2),
                eventName = _ref8[0],
                target = _ref8[1];

            var targetMap = this._getTargetMap(eventName);
            if (targetMap) {
                targetMap.delete(target);
            }
        }

        /**
         *
         * @param {string} eventName
         * @returns {MapLike} targetMap
         * @private
         */

    }, {
        key: "_getTargetMap",
        value: function _getTargetMap(eventName) {
            var targetMap = this._eventMap.get(eventName);
            if (!targetMap) {
                targetMap = new MapLike();
                this._eventMap.set(eventName, targetMap);
            }
            return targetMap;
        }
    }]);

    return EventTargetMap;
}();

exports.default = EventTargetMap;
//# sourceMappingURL=EventTargetMap.js.map

/***/ }),

/***/ 225:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// LICENSE : MIT

// constants

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NanSymbolMark = {};

function encodeKey(key) {
    var isNotNumber = typeof key === "number" && key !== key;
    return isNotNumber ? NanSymbolMark : key;
}

function decodeKey(encodedKey) {
    return encodedKey === NanSymbolMark ? NaN : encodedKey;
}

/**
 * ES6 Map like object.
 * See [Map - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map "Map - JavaScript | MDN")
 */

var MapLike = exports.MapLike = function () {
    function MapLike() {
        var _this = this;

        var entries = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

        _classCallCheck(this, MapLike);

        /**
         * @type {Array}
         * @private
         */
        this._keys = [];
        /**
         *
         * @type {Array}
         * @private
         */
        this._values = [];
        entries.forEach(function (entry) {
            if (!Array.isArray(entry)) {
                throw new Error("should be `new MapLike([ [key, value] ])`");
            }
            if (entry.length !== 2) {
                throw new Error("should be `new MapLike([ [key, value] ])`");
            }
            _this.set(entry[0], entry[1]);
        });
    }

    /**
     * return map size
     * @returns {Number}
     */


    _createClass(MapLike, [{
        key: "entries",


        /**
         * entries [[key, value], [key, value]] value
         * @returns {Array}
         */
        value: function entries() {
            var _this2 = this;

            return this.keys().map(function (key) {
                var value = _this2.get(key);
                return [decodeKey(key), value];
            });
        }

        /**
         * get keys
         * @returns {Array}
         */

    }, {
        key: "keys",
        value: function keys() {
            return this._keys.filter(function (value) {
                return value !== undefined;
            }).map(decodeKey);
        }

        /**
         * get values
         * @returns {Array}
         */

    }, {
        key: "values",
        value: function values() {
            return this._values.slice();
        }

        /**
         * @param {*} key - The key of the element to return from the Map object.
         * @returns {*}
         */

    }, {
        key: "get",
        value: function get(key) {
            var idx = this._keys.indexOf(encodeKey(key));
            return idx !== -1 ? this._values[idx] : undefined;
        }

        /**
         * has value of key
         * @param {*} key - The key of the element to return from the Map object.
         * @returns {boolean}
         */

    }, {
        key: "has",
        value: function has(key) {
            return this._keys.indexOf(encodeKey(key)) !== -1;
        }

        /**
         * set value for key
         * @param {*} key - The key of the element to return from the Map object.
         * @param {*} value
         * @return {MapLike}
         */

    }, {
        key: "set",
        value: function set(key, value) {
            var idx = this._keys.indexOf(encodeKey(key));
            if (idx !== -1) {
                this._values[idx] = value;
            } else {
                this._keys.push(encodeKey(key));
                this._values.push(value);
            }
            return this;
        }

        /**
         * delete value for key
         * @param {*} key - The key of the element to return from the Map object.
         * @returns {boolean}
         */

    }, {
        key: "delete",
        value: function _delete(key) {
            var idx = this._keys.indexOf(encodeKey(key));
            if (idx === -1) {
                return false;
            }
            this._keys.splice(idx, 1);
            this._values.splice(idx, 1);
            return true;
        }

        /**
         * clear defined key,value
         * @returns {MapLike}
         */

    }, {
        key: "clear",
        value: function clear() {
            this._keys = [];
            this._values = [];
            return this;
        }

        /**
         * forEach map
         * @param {function(value, key, map)} handler
         * @param {*} [thisArg]
         */

    }, {
        key: "forEach",
        value: function forEach(handler, thisArg) {
            var _this3 = this;

            this.keys().forEach(function (key) {
                // value, key, map
                handler(_this3.get(key), key, thisArg || _this3);
            });
        }
    }, {
        key: "size",
        get: function get() {
            return this._values.filter(function (value) {
                return value !== undefined;
            }).length;
        }
    }]);

    return MapLike;
}();
//# sourceMappingURL=MapLike.js.map

/***/ }),

/***/ 226:
/***/ (function(module, exports, __webpack_require__) {

var v1 = __webpack_require__(227);
var v4 = __webpack_require__(228);

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;


/***/ }),

/***/ 227:
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(120);
var bytesToUuid = __webpack_require__(121);

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),

/***/ 228:
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(120);
var bytesToUuid = __webpack_require__(121);

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

/***/ 229:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// https://developer.mozilla.org/ja/docs/Web/API/Navigator/doNotTrack
function enable() {
    var w = window;
    var dnt = w.navigator.doNotTrack || w.doNotTrack;
    if (dnt === '1' || dnt === 'yes') {
        return false;
    }
    return true;
}
exports.enable = enable;
function get(url, query, onerror) {
    if (enable() && query.length > 0) {
        var img = document.createElement('img');
        img.onload = function () {
            // nothing todo
        };
        img.onerror = onerror;
        img.src = url + "?" + query.join('&');
    }
}
exports.get = get;
function obj2query(data) {
    var query = [];
    Object.keys(data).forEach(function (key) {
        if (data[key]) {
            query.push(key + "=" + encodeURIComponent(data[key]));
        }
    });
    return query;
}
exports.obj2query = obj2query;
//# sourceMappingURL=requests.js.map

/***/ }),

/***/ 230:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var objectAssign = __webpack_require__(15);
var constants_1 = __webpack_require__(20);
var parseCustomDataKey = function (long, prefix) {
    var _a = long.split(prefix), index = _a[1];
    return parseInt(index, 10) <= constants_1.CUSTOM_INDEX ? "c" + prefix[0] + index : '';
};
var parseCustomData = function (key, // TODO only enum string Metric | Dimension
value) {
    var data = {};
    var splitedKey = parseCustomDataKey(key, 'dimension');
    if (splitedKey && value) {
        data[splitedKey] = value;
    }
    splitedKey = parseCustomDataKey(key, 'metric');
    if (splitedKey && typeof value === 'number') {
        data[splitedKey] = value;
    }
    return data;
};
var initialState = function () { return ({
    userId: '',
    env: {
        v: constants_1.VERSION,
        l: '',
        r: '',
        n: '',
        h: 0,
        w: 0,
        sh: 0,
        sw: 0,
        wh: 0,
        ww: 0
    },
    custom: {}
}); };
var Store = /** @class */ (function () {
    function Store(id) {
        this.reset();
        this.state.userId = id;
    }
    Store.prototype.get = function (key) {
        var data = this.state[key];
        if (key === 'custom') {
            this.state[key] = {};
        }
        return data;
    };
    Store.prototype.set = function (type, data) {
        switch (type) {
            case 'page':
                this.state.env.l = data;
                break;
            default:
                this.state.custom = objectAssign({}, this.state.custom, parseCustomData(type, data));
        }
        return this.state;
    };
    Store.prototype.merge = function (_a) {
        var type = _a.type, data = _a.data;
        var stateObj = initialState();
        this.state[type] = objectAssign({}, stateObj[type], this.state[type], data);
        return this.state;
    };
    Store.prototype.mergeDeep = function (obj) {
        if (obj.page) {
            this.state.env.l = obj.page;
        }
        var data = {};
        Object.keys(obj).forEach(function (key) {
            data = objectAssign({}, data, parseCustomData(key, obj[key]));
        });
        return this.merge({ type: 'custom', data: data });
    };
    Store.prototype.reset = function () {
        this.state = initialState();
    };
    return Store;
}());
exports.default = Store;
//# sourceMappingURL=store.js.map

/***/ }),

/***/ 231:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var browser_1 = __webpack_require__(19);
var events_1 = __webpack_require__(41);
var ClickEvents = /** @class */ (function (_super) {
    __extends(ClickEvents, _super);
    function ClickEvents() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClickEvents.prototype.on = function () {
        var _this = this;
        _super.prototype.on.call(this, 'click', function (e) {
            _this.emit({ x: e.pageX, y: e.pageY });
        }, 'a');
    };
    ClickEvents.prototype.validate = function () {
        var enable = browser_1.validate(['onclick']);
        if (!enable) {
            this.warning('disable click');
        }
        return enable;
    };
    return ClickEvents;
}(events_1.default));
exports.default = ClickEvents;
//# sourceMappingURL=click.js.map

/***/ }),

/***/ 232:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var browser_1 = __webpack_require__(19);
var events_1 = __webpack_require__(41);
var MouseMoveEvents = /** @class */ (function (_super) {
    __extends(MouseMoveEvents, _super);
    function MouseMoveEvents() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MouseMoveEvents.prototype.on = function () {
        var _this = this;
        _super.prototype.on.call(this, 'mousemove', function (e) {
            _this.emit({ x: e.pageX, y: e.pageY });
        }, 'l');
    };
    MouseMoveEvents.prototype.validate = function () {
        var enable = browser_1.validate(['onmousemove']);
        if (!enable) {
            this.warning('disable mousemove');
        }
        return enable;
    };
    return MouseMoveEvents;
}(events_1.default));
exports.default = MouseMoveEvents;
//# sourceMappingURL=mousemove.js.map

/***/ }),

/***/ 233:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var browser_1 = __webpack_require__(19);
var constants_1 = __webpack_require__(20);
var events_1 = __webpack_require__(41);
function getPotision(w) {
    var _a = browser_1.getOffset(w), x = _a.x, y = _a.y;
    return { x: x + w.innerWidth / 2, y: y + w.innerHeight / 2 };
}
var eventName = 'scroll';
var ScrollEvents = /** @class */ (function (_super) {
    __extends(ScrollEvents, _super);
    function ScrollEvents() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScrollEvents.prototype.on = function () {
        var _this = this;
        _super.prototype.on.call(this, eventName, function () {
            _this.emit(getPotision(window));
        }, 'l');
    };
    ScrollEvents.prototype.validate = function () {
        return browser_1.validate(constants_1.SCROLL.concat(['innerWidth', 'innerHeight']).concat(constants_1.TOUCH));
    };
    return ScrollEvents;
}(events_1.default));
exports.default = ScrollEvents;
//# sourceMappingURL=scroll.js.map

/***/ }),

/***/ 234:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var browser_1 = __webpack_require__(19);
var constants_1 = __webpack_require__(20);
var events_1 = __webpack_require__(41);
function getFirstTouch(e) {
    return e.changedTouches ? e.changedTouches[0] : e.touches[0];
}
var TouchEvents = /** @class */ (function (_super) {
    __extends(TouchEvents, _super);
    function TouchEvents() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TouchEvents.prototype.on = function () {
        var _this = this;
        _super.prototype.on.call(this, 'touchstart', function (e) {
            _this.start = getFirstTouch(e);
            _this.emit({ x: _this.start.pageX, y: _this.start.pageY });
        }, 'l');
        _super.prototype.on.call(this, 'touchmove', function (e) {
            var t = getFirstTouch(e);
            _this.emit({ x: t.pageX, y: t.pageY });
        }, 'l');
        _super.prototype.on.call(this, 'touchend', function (e) {
            var t = getFirstTouch(e);
            if (!_this.start) {
                return _this.warning("start is not defined");
            }
            if (Math.abs(_this.start.pageX - t.pageX) < 10 &&
                Math.abs(_this.start.pageY - t.pageY) < 10) {
                _this.emit({ x: t.pageX, y: t.pageY });
            }
        }, 'a');
    };
    TouchEvents.prototype.validate = function () {
        return browser_1.validate(constants_1.TOUCH);
    };
    return TouchEvents;
}(events_1.default));
exports.default = TouchEvents;
//# sourceMappingURL=touch.js.map

/***/ }),

/***/ 235:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var handler_1 = __webpack_require__(236);
var Linker = /** @class */ (function () {
    function Linker(agent) {
        this.agent = agent;
    }
    Linker.prototype.autoLink = function (domains) {
        var _this = this;
        var events = ['mousedown', 'keyup'];
        var param = this.agent.get('linkerParam');
        events.forEach(function (event) {
            return _this.agent.subscribe(document, event, handler_1.link(domains, param, 100));
        });
        this.agent.subscribe(document, 'submit', handler_1.submit(domains, param));
    };
    return Linker;
}());
exports.default = Linker;
//# sourceMappingURL=linker.js.map

/***/ }),

/***/ 236:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function link(domains, linkerParam, max) {
    return function (_a) {
        var target = _a.target, srcElement = _a.srcElement;
        var node = (target || srcElement);
        for (var i = 0; i < max && node; i++) {
            // TODO need area tag support?
            if (node instanceof HTMLAnchorElement && linkable(domains, node)) {
                node.href = linkUrl(node.href, linkerParam);
                return;
            }
            node = node.parentNode;
        }
    };
}
exports.link = link;
function submit(domains, linkerParam) {
    return function (_a) {
        var target = _a.target, srcElement = _a.srcElement;
        var form = (target || srcElement);
        if (!addableForm(domains, form)) {
            return;
        }
        var method = form.method.toLocaleLowerCase();
        if (method === 'get') {
            addHiddenInput(form, linkerParam);
        }
        if (method === 'post') {
            form.action = linkUrl(form.action, linkerParam);
        }
    };
}
exports.submit = submit;
function linkable(domains, _a) {
    var protocol = _a.protocol, href = _a.href;
    var isHttp = protocol === 'http:' || protocol === 'https:';
    if (!href || !isHttp) {
        return false;
    }
    return matchDomain(domains, href);
}
var matchUrl = /^https?:\/\/([^\/:]+)/;
function addableForm(domains, element) {
    var match;
    if (element instanceof HTMLFormElement && element.action) {
        match = element.action.match(matchUrl);
    }
    return match ? matchDomain(domains, match[1]) : false;
}
var re = new RegExp(location.hostname);
function matchDomain(domains, link) {
    if (link.match(re)) {
        return false;
    }
    return domains.some(function (d) { return (d instanceof RegExp && d.test(link)) || link.indexOf(d) >= 0; });
}
function linkUrl(href, linkerParam) {
    var e = document.createElement('a');
    e.href = href;
    var qs = e.search.trim().replace(/^[?#&]/, '');
    if (!qs
        .split('&')
        .filter(function (link) { return link.length && link.split('=')[0] === linkerParam.split('=')[0]; }).length) {
        e.search = e.search ? e.search + "&" + linkerParam : linkerParam;
    }
    return e.href;
}
function addHiddenInput(form, linkerParam) {
    var _a = linkerParam.split('='), key = _a[0], value = _a[1];
    var nodes = form.childNodes;
    for (var i_1 = 0; i_1 < nodes.length; i_1++) {
        if (nodes[i_1].name === key) {
            nodes[i_1].setAttribute('value', value);
            return;
        }
    }
    var i = document.createElement('input');
    i.setAttribute('type', 'hidden');
    i.setAttribute('name', key);
    i.setAttribute('value', value);
    form.appendChild(i);
}
//# sourceMappingURL=handler.js.map

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.raise = function (msg) {
    if (process.env.NODE_ENV !== 'production') {
        throw new Error(msg);
    }
    console.warn(msg);
};
var isDefined = function (instance) { return instance && instance.isSetup(); };
var Raven;
exports.setup = function (_a) {
    var raven = _a.Raven;
    var isSetup = isDefined(raven);
    if (isSetup) {
        Raven = raven;
        Raven.setRelease(process.env.VERSION);
    }
    return isSetup;
};
var capture = function (err, options) {
    if (isDefined(Raven)) {
        console.warn(err, options);
        if (typeof err === 'string') {
            Raven.captureMessage(err, options);
            return;
        }
        Raven.captureException(err, options);
    }
};
exports.error = function (err, extra) {
    capture(err, { level: 'error', extra: extra });
};
exports.warning = function (err, extra) {
    capture(err, { level: 'warning', extra: extra });
};
//# sourceMappingURL=logger.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var objectAssign = __webpack_require__(15);
var browser_1 = __webpack_require__(19);
var constants_1 = __webpack_require__(20);
var logger_1 = __webpack_require__(40);
var Events = /** @class */ (function () {
    function Events(emitName, eventEmitter, eventObserver) {
        this.name = emitName;
        this.emitter = eventEmitter;
        this.observer = eventObserver;
    }
    Events.prototype.on = function (eventName, handler, type) {
        if (typeof handler !== 'function' || !(type === 'a' || type === 'l')) {
            return logger_1.raise('please override on');
        }
        if (!this.validate() || !browser_1.validate(constants_1.LISTENER.concat(constants_1.SCROLL))) {
            return;
        }
        this.observer.subscribe(window, eventName, function (e) {
            try {
                handler(e);
            }
            catch (err) {
                logger_1.error(err);
            }
        });
        this.type = type;
    };
    Events.prototype.off = function () {
        this.observer.unsubscribeAll();
    };
    Events.prototype.error = function (err) {
        logger_1.error(err);
    };
    Events.prototype.warning = function (err) {
        logger_1.warning(err);
    };
    Events.prototype.validate = function () {
        logger_1.raise('please override validate');
        return false;
    };
    Events.prototype.emit = function (data) {
        if (data.x < 0 || data.y < 0 || !this.type) {
            return;
        }
        var _a = browser_1.getOffset(window), x = _a.x, y = _a.y;
        this.emitter.emit(this.name, objectAssign({}, data, {
            type: this.type,
            left: x,
            top: y
        }));
    };
    return Events;
}());
exports.default = Events;
//# sourceMappingURL=events.js.map

/***/ })

/******/ });
//# sourceMappingURL=built-in.bundle.js.map