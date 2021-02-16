(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 11:
/*!*******************************************!*\
  !*** G:/work/洁利来h5商城/utils/http/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _interface = _interopRequireDefault(__webpack_require__(/*! ./interface */ 12));


var _auth = _interopRequireDefault(__webpack_require__(/*! ../module/auth.js */ 16));
var _SET = _interopRequireDefault(__webpack_require__(/*! ../../SET.js */ 15));

var _business = _interopRequireDefault(__webpack_require__(/*! ../module/business.js */ 17));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

// 集合部分升星
// import LevelUp from '../module/levelUp.js'

/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 * 
 */

// 单独导出(测试接口) import {test} from '@/common/vmeitime-http/'
// export const test = (data) => {
// 	// /* http.config.baseUrl = "http://localhost:8080/api/"
// 	//设置请求前拦截器 若设置会覆盖全局
// 	http.interceptor.request = (config) => {
// 		config.header = {
// 			"token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
// 		}
// 		console.log('个性化request....');
// 		// return config
// 	} 
// 	//设置请求结束后拦截器
// 	http.interceptor.response = (response) => {
// 		console.log('个性化response....')
// 		//判断返回状态 执行相应操作
// 		return response; 
// 	}
//     return http.request({
// 		// baseUrl: 'https://unsdaf.net.cn/',
//         url: 'ajax/echo/text?name=uni-app',
// 		dataType: 'text',
//         data,
//     })
// }
// 


// 默认全部导出  import api from '@/common/vmeitime-http/'
var _default = _objectSpread({},
_auth.default, {},
_business.default, {
  // ...LevelUp,
  baseUrl: _SET.default.baseUrl,
  mainUrl: _SET.default.mainUrl });


// export const baseUrl = 'http://taobao.fjdmll.com'
exports.default = _default;

/***/ }),

/***/ 12:
/*!***********************************************!*\
  !*** G:/work/洁利来h5商城/utils/http/interface.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;



var _index = _interopRequireDefault(__webpack_require__(/*! ../../store/index.js */ 13));
var _SET = _interopRequireDefault(__webpack_require__(/*! ../../SET.js */ 15));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                          * 通用uni-app网络请求
                                                                                                                                                          * 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
                                                                                                                                                          */var _default = { config: { // baseUrl: "https://hp.fjhjc.net/Data",
    baseUrl: _SET.default.baseUrl,

    // baseUrl: "https://testapi.kuxiong999.com",   //测试连接
    header: {
      'Content-Type': 'application/json;charset=UTF-8'
      // 'Content-Type':'application/x-www-form-urlencoded'
    },
    data: {},
    method: "GET",
    dataType: "json",
    /* 如设为json，会对返回的数据做一次 JSON.parse */
    responseType: "text",
    success: function success() {},
    fail: function fail() {},
    complete: function complete() {

    } },

  interceptor: {
    request: function request(config, ifLoad) {
      var value = uni.getStorageSync('hepai_token');
      // console.log(value)
      if (value) {
        config.header.Authorization = value;
      }
      return config;
    },
    response: function response(_response, ifLoad) {
      var statusCode = _response.statusCode;
      var that = this;
      // console.log(response)
      // 一般在这里做全局的错误事件处理
      if (statusCode === 200) {//成功
        return _response.data;
      } else if (statusCode === 401) {
        // if (true) {	
        if (!_index.default.state.hasLogin) return;
        uni.showModal({
          title: ' 洁利来商城提醒您',
          content: '登陆状态失效,请重新登陆',
          showCancel: false,
          success: function success(res) {
            if (res.confirm) {
              uni.removeStorageSync('hepai_token');
              uni.removeStorageSync('user');
              uni.navigateTo({
                url: '/pages/role/login/login' });

            }
          } });

        return '权限失效';
      } else if (_response.errMsg == "request:fail abort") {






        var ifLock = uni.getStorageSync('errlock');
        console.log(ifLock);
        // uni.setStorageSync('errlock',false)
        if (!ifLock) {
          uni.setStorageSync('errlock', true);
          setTimeout(function () {
            uni.navigateTo({
              url: '/pages/errors/errors' });


          }, 1000);

        }


        return '请检查网络';
      } else {

        return '未知错误';
      }

    } },

  request: function request(options, ifLoad) {var _this = this;
    var that = this;
    if (!options) {
      options = {};
    }
    options.baseUrl = options.baseUrl || this.config.baseUrl;
    options.dataType = options.dataType || this.config.dataType;
    options.url = options.baseUrl + options.url;
    options.data = options.data || {};
    options.method = options.method || this.config.method;
    options.timeout = 10000;
    // console.log('执行')

    return new Promise(function (resolve, reject) {
      var _config = null;

      options.complete = function (response) {
        var statusCode = response.statusCode;
        // console.log(response)
        // response.config = _config
        if (_this.interceptor.response) {
          // reject('没有权限')
          var re = _this.interceptor.response(response, ifLoad);
          // console.log(re)
          if (re === '权限失效') {
            reject('权限失效');
            return;
          } else if (re === '请检查网络') {
            reject('请检查网络');
            return;
          } else if (re === '未知错误') {
            reject('未知错误');
            return;
          } else {
            resolve(re);
          }
        }

      };

      _config = Object.assign({}, _this.config, options);
      _config.requestId = new Date().getTime();
      // console.log(_config)
      if (_this.interceptor.request) {
        var re = _this.interceptor.request(_config, ifLoad);
        _config = re;
      }


      uni.request(_config);
    });
  } };



/**
        * 请求接口日志记录
        */exports.default = _default;
function _reqlog(req) {
  if (true) {
    // console.log("【" + req.requestId + "】 地址：" + req.url)
    if (req.data) {
      // console.log("【" + req.requestId + "】 请求参数：" + JSON.stringify(req.data))
    }
  }
  //TODO 调接口异步写入日志数据库
}

/**
   * 响应接口日志记录
   */
function _reslog(res) {
  var _statusCode = res.statusCode;
  if (true) {
    // console.log("【" + res.config.requestId + "】 地址：" + res.config.url)
    if (res.config.data) {

    } // console.log("【" + res.config.requestId + "】 请求参数：" + JSON.stringify(res.config.data))
    // console.log("【" + res.config.requestId + "】 响应结果：" + JSON.stringify(res))
  }
  //TODO 除了接口服务错误外，其他日志调接口异步写入日志数据库
  switch (_statusCode) {
    case 200:
      break;
    case 401:
      break;
    case 404:
      break;
    default:
      break;}

}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 13:
/*!**************************************!*\
  !*** G:/work/洁利来h5商城/store/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 14));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

_vue.default.use(_vuex.default);

var store = new _vuex.default.Store({
  state: {
    /**
            * 是否需要强制登录
            */
    forcedLogin: false,
    hasLogin: false,
    userInfo: {}, //用户微信获得基本信息
    accountInfo: {}, //账户基本信息
    merchantInfo: {}, //店铺基本信息
    levelAccount: {}, //渠道个人信息
    config: {},
    currentChannel: 0, //1聚友之家  2粉丝空间 3vip空间
    cards: {}, //购物车
    currentOrder: [], //创建订单
    currentPro: {},
    currentRoleCode: '' //聚友空间当前的账户身份的 code
  },
  mutations: {
    login: function login(state, userName) {
      console.log('login_STORE');
      state.hasLogin = true;
    },
    logout: function logout(state) {
      state.hasLogin = false;
      state.accountInfo = {}; //账户基本信息
      state.merchantInfo = {}; //店铺基本信息
      state.levelAccount = {}; //渠道个人信息
    },
    setRoleCode: function setRoleCode(state, info) {
      // console.log('储存信息1')
      state.currentRoleCode = info;
    },
    setUserInfo: function setUserInfo(state, info) {
      // console.log('储存信息1')
      state.userInfo = _objectSpread({}, info);
    },
    setAccountInfo: function setAccountInfo(state, info) {
      // console.log('储存信息2')
      state.accountInfo = _objectSpread({}, info);
    },
    setConfig: function setConfig(state, info) {
      // console.log('储存信息2')
      state.config = _objectSpread({}, info);
    },
    setMerchantInfo: function setMerchantInfo(state, info) {
      // console.log('储存信息2')
      state.merchantInfo = _objectSpread({}, info);
    },
    setCurrentChannel: function setCurrentChannel(state, info) {
      state.currentChannel = info;
    },
    setLevelAccountInfo: function setLevelAccountInfo(state, info) {
      state.levelAccount = info;
    },
    addCard: function addCard(state, item) {

      state.cards = Object.assign(state.cards, item);
      // console.log(state.cards)
    },
    creatOrder: function creatOrder(state, items) {
      state.currentOrder = _toConsumableArray(items);
      // debugger
    },
    completeOrder: function completeOrder(state) {
      state.currentOrder = new Array();
    },
    currenPro: function currenPro(state, items) {
      state.currentPro = _objectSpread({}, items);
    } },

  getters: {
    cardsProduct: function cardsProduct(state) {
      // console.log(state.cards)
      // let arr = Object.values(state.cards)  不能用额
      // let arr = Object.keys(state.cards) 
      // let res = []
      // arr.forEach(item=>{
      // 	res.push(state.cards[item])
      // })
      // console.log(res)
      // return res
      return state.cards;
    } } });var _default =



store;exports.default = _default;

/***/ }),

/***/ 14:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),

/***/ 15:
/*!******************************!*\
  !*** G:/work/洁利来h5商城/SET.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
// 全局设置
var _default = {
  baseUrl: "http://h5.gllo.com.cn/Data", //api业务接口域名
  mainUrl: "http://h5.gllo.com.cn/", //项目域名
  // 测试环境
  // wx_appid: 'wx09daee2f47e178aa',    //微信授权 appid  測試公衆號
  wx_appid: 'wxbb1e69472b847c6e', //代码力量 测试
  // wx_redirect_url:'http://192.168.1.9:8080',
  wx_redirect_url: 'http://h5.gllo.com.cn', //微信授权 回调页地址

  versionUrl: '/api/AppVersion/VersionCheck' //app版本检测url   // 1是不更新 2是强制更新 3可选择更新 4//appstore更新
};exports.default = _default;

/***/ }),

/***/ 16:
/*!********************************************!*\
  !*** G:/work/洁利来h5商城/utils/module/auth.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _interface = _interopRequireDefault(__webpack_require__(/*! ../http/interface */ 12));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 用户身份相关接口
// 我要积分
var Auth = { // 获取验证码
  getVerificateCode: function getVerificateCode(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Msg/SendVerificationCode',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },
  // 微信api
  GetWxJsApiConfig: function GetWxJsApiConfig(data) {
    return _interface.default.request({
      url: '/api/Authorize/GetJsApiConfig',
      method: 'POST',
      data: data
      // handle:true
    });
  },
  // 登录
  userLogin: function userLogin(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Authorize/Token',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },
  // 快捷登录
  shortcutToken: function shortcutToken(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Authorize/ShortcutToken',
      method: 'GET',
      data: data
      // handle:true
    }, ifLoad);
  },
  // OpenId登录
  WxTokenLogin: function WxTokenLogin(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Authorize/WxToken',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },
  // 注册用户 
  userRegiste: function userRegiste(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Authorize/Registe',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },
  // 忘记密码
  findPassword: function findPassword(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Authorize/FindPassword',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },
  // 获取用户信息
  getConsumer: function getConsumer(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Consumer/Get',
      method: 'GET',
      data: data
      // handle:true
    }, ifLoad);
  },

  //更新用户信息
  userInfoUpdate: function userInfoUpdate(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Consumer/PerfectInfo',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },
  // 设置支付密码
  SettingPayPassword: function SettingPayPassword(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Consumer/SettingPayPassword',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },
  // 微信绑定手机号
  BindWxUserMobile: function BindWxUserMobile(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Authorize/BindWxUserMobile',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 支付
  toPayment: function toPayment(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Pay/Payment',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },


  // 	=============商家部分\\\



  // 获取商家信息
  GetBusinessInfo: function GetBusinessInfo(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Shop/GetBusinessInfo',
      method: 'GET',
      data: data
      // handle:true
    }, ifLoad);
  },
  // 修改商家信息
  BusinessEditor: function BusinessEditor(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Shop/BusinessEditor',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },


  //=============== 全局=================

  // 获取全局配置
  getConfig: function getConfig(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Service/Config',
      method: 'GET',
      data: data
      // handle:true
    }, ifLoad);
  },

  // app更新
  VersionCheck: function VersionCheck(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/AppVersion/VersionCheck',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 手机号登录
  MobileToken: function MobileToken(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Authorize/MobileToken',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  } };var _default =

Auth;exports.default = _default;

/***/ }),

/***/ 17:
/*!************************************************!*\
  !*** G:/work/洁利来h5商城/utils/module/business.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _interface = _interopRequireDefault(__webpack_require__(/*! ../http/interface */ 12));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 用户身份相关接口
var Set = {
  // 最后一个子订单是否退邮费
  ifLastSubOrder: function ifLastSubOrder(data) {
    return _interface.default.request({
      url: '/api/Order/GetChildIsSucceed',
      method: 'POST',
      data: data
      // handle:true
    });
  },

  // 热门推荐
  GetGoodsList: function GetGoodsList(data) {
    return _interface.default.request({
      url: '/api/Project/GetGoodsList',
      method: 'POST',
      data: data
      // handle:true
    });
  },
  // 获取详情
  GetGoodsInfo: function GetGoodsInfo(data) {
    return _interface.default.request({
      url: '/api/Project/GetGoodsInfo',
      method: 'GET',
      data: data
      // handle:true
    });
  },
  // 优店
  GetMerchantList: function GetMerchantList(data) {
    return _interface.default.request({
      url: '/api/Shop/GetMerchantList',
      method: 'POST',
      data: data
      // handle:true
    });
  },
  // 获取店铺详情 及商品
  GetBusinessProjectList: function GetBusinessProjectList(data) {
    return _interface.default.request({
      url: '/api/Shop/GetBusinessProjectList',
      method: 'POST',
      data: data
      // handle:true
    });
  },
  // 获取分类列表
  GetClassList: function GetClassList(data) {
    return _interface.default.request({
      url: '/api/Project/GetClass',
      method: 'GET',
      data: data
      // handle:true
    });
  },
  // 根据分类获取 商品
  GetGoodsByClassList: function GetGoodsByClassList(data) {
    return _interface.default.request({
      url: '/api/Project/GetGoodsByClassList',
      method: 'POST',
      data: data
      // handle:true
    });
  },
  // 获取收货地址
  GetAddressList: function GetAddressList(data) {
    return _interface.default.request({
      url: '/api/Address/GetAddressList',
      method: 'POST',
      data: data
      // handle:true
    });
  },
  // 删除地址
  addressDel: function addressDel(data) {
    return _interface.default.request({
      url: '/api/Address/Del',
      method: 'GET',
      data: data
      // handle:true
    });
  },
  // 设置默认地址
  DefaultAddress: function DefaultAddress(data) {
    return _interface.default.request({
      url: '/api/Address/DefaultAddress',
      method: 'GET',
      data: data
      // handle:true
    });
  },
  // 获取拍品信息
  GetAuctionProject: function GetAuctionProject(data) {
    return _interface.default.request({
      url: '/api/Project/Get',
      method: 'POST',
      data: data
      // handle:true
    });
  },

  // 获取充值列表
  RechargeList: function RechargeList(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Recharge/RechargeList',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 生成充值订单
  Recharge: function Recharge(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Recharge/Recharge',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },
  // 新建地址
  addAddress: function addAddress(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Address/Add',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },
  // 确认拍品
  verifyAuction: function verifyAuction(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Order/Verify',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 不要改拍品
  NoVerifyAuction: function NoVerifyAuction(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Order/NoVerify',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 客户获取订单
  GetOrderList: function GetOrderList(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Order/GetOrderList',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 购买加价

  doAuction: function doAuction(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Auction/Auction',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 竞价记录

  GetAuctionList: function GetAuctionList(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Auction/GetAuctionList',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 发起退货申请

  ApplyRefund: function ApplyRefund(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Refund/Apply',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 确认拍品
  Receiving: function Receiving(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '	/api/Order/Receiving',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },
  // 获取银行卡列表

  GetBankList: function GetBankList(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Bank/GetBankList',
      method: 'GET',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 添加新卡
  BuilderBank: function BuilderBank(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Bank/BuilderBank',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },


  // 默认银行卡
  DefaultBank: function DefaultBank(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Bank/DefaultBank',
      method: 'GET',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 解绑银行卡
  RelieveBank: function RelieveBank(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Bank/RelieveBank',
      method: 'GET',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 申请提现
  SubmitCash: function SubmitCash(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Cash/SubmitCash',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 实名认证
  SubmitProve: function SubmitProve(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Consumer/Prove',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 问题反馈
  SubmitComment: function SubmitComment(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Feedback/Submit',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 余额明细
  AccountList: function AccountList(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/AccountDetail/GetList',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 关注列表
  GetAttentionList: function GetAttentionList(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Shop/GetAttentionList',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 关注店铺
  Attention: function Attention(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Shop/Attention',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 合家慈登陆账户
  GetHJCConsumer: function GetHJCConsumer(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Recharge/GetHJCConsumer',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 合家慈积分转化
  HJCIntegralRecharge: function HJCIntegralRecharge(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Recharge/HJCIntegralRecharge',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 提醒发货
  Prompt: function Prompt(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Order/Prompt',
      method: 'GET',
      data: data
      // handle:true
    }, ifLoad);
  },



  // 插卡内流信息
  GetEMS: function GetEMS(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Order/GetEMS',
      method: 'GET',
      data: data
      // handle:true
    }, ifLoad);
  },
  // 获取文档
  getGuide: function getGuide(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Service/Guide',
      method: 'GET',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 加入购物车
  cardAdd: function cardAdd(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Catr/Add',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },
  // 获取购物车列表
  cardList: function cardList(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Catr/GetList',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },
  // 刪除購物車
  cardDelete: function cardDelete(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Catr/Delect',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },


  // 提交订单
  CreateOrder: function CreateOrder(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Order/CreateOrder',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 删除订单

  CancelOrder: function CancelOrder(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Order/CancelOrder',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 计算邮费

  GetEmsPrice: function GetEmsPrice(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Order/GetEmsPrice',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 获取退款列表

  GetRefundOrderList: function GetRefundOrderList(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Order/GetRefundOrderList',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 获取退款详情
  GetRefundOrderInfo: function GetRefundOrderInfo(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Order/GetRefundInfo',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },


  // 取消退款申请
  CancelRefund: function CancelRefund(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Refund/Cancel',
      method: 'GET',
      data: data
      // handle:true
    }, ifLoad);
  },
  // 删除退款申请
  DelectRefund: function DelectRefund(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Refund/Delect',
      method: 'GET',
      data: data
      // handle:true
    }, ifLoad);
  },
  // 物流确认
  RefundEms: function RefundEms(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Refund/RefundEms',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },
  // 获取着陆页分类商品
  GetClassHotList: function GetClassHotList(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Project/GetClassHotList',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // code获取OpenId
  GetOpenId: function GetOpenId(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Authorize/GetOpenId',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },


  // 模拟下单
  mockPay: function mockPay(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Pay/getNotify',
      method: 'GET',
      data: data
      // handle:true
    }, ifLoad);
  },




  // 	=============商家部分\\\


  // 商家 发布拍品/重新发布
  shopSubmit: function shopSubmit(data) {
    return _interface.default.request({
      url: '/api/shop/Submit',
      method: 'POST',
      data: data
      // handle:true
    });
  },

  // 商家获取商家订单
  GetBusinessList: function GetBusinessList(data) {
    return _interface.default.request({
      url: '/api/Order/GetBusinessList',
      method: 'POST',
      data: data
      // handle:true
    });
  },


  // 商家同意退款
  agreeRefund: function agreeRefund(data) {
    return _interface.default.request({
      url: '/api/Order/Refund',
      method: 'POST',
      data: data
      // handle:true
    });
  },
  // 商家获取订单详情
  getOrderDetail: function getOrderDetail(data) {
    return _interface.default.request({
      url: '/api/Order/Get',
      method: 'POST',
      data: data
      // handle:true
    });
  },

  // 商家发货
  merchantDispatch: function merchantDispatch(data) {
    return _interface.default.request({
      url: '/api/Order/Dispatch',
      method: 'POST',
      data: data
      // handle:true
    });
  },

  // 商家成交纪录列表
  GetAccomplishList: function GetAccomplishList(data) {
    return _interface.default.request({
      url: '/api/Project/GetAccomplishList',
      method: 'POST',
      data: data
      // handle:true
    });
  },
  // 我的拍品
  GetConsumerList: function GetConsumerList(data) {
    return _interface.default.request({
      url: '/api/Project/GetConsumerList',
      method: 'POST',
      data: data
      // handle:true
    });
  },
  // 商品管理
  GetMerchantProduct: function GetMerchantProduct(data) {
    return _interface.default.request({
      url: '/api/Shop/GetList',
      method: 'POST',
      data: data
      // handle:true
    });
  },
  // 商家获取拍品信息
  merchantProductInfo: function merchantProductInfo(data) {
    return _interface.default.request({
      url: '/api/Shop/Get',
      method: 'GET',
      data: data
      // handle:true
    });
  },

  // 商家下架商品
  SoldOut: function SoldOut(data) {
    return _interface.default.request({
      url: '/api/Project/SoldOut',
      method: 'POST',
      data: data
      // handle:true
    });
  },

  // 商家下架商品
  GetBusinessAddress: function GetBusinessAddress(data) {
    return _interface.default.request({
      url: '/api/Address/GetBusiness',
      method: 'GET',
      data: data
      // handle:true
    });
  },

  // 商家营业执照
  BusinessProve: function BusinessProve(data) {
    return _interface.default.request({
      url: '/api/Shop/BusinessProve',
      method: 'POST',
      data: data
      // handle:true
    });
  },


  // 商家限时购列表
  LimitActivityGoods: function LimitActivityGoods(data) {
    return _interface.default.request({
      url: '/api/LimitActivityGoods/GetGoodsList',
      method: 'POST',
      data: data
      // handle:true
    });
  } };var _default =


Set;exports.default = _default;

/***/ }),

/***/ 18:
/*!****************************************************************!*\
  !*** G:/work/洁利来h5商城/node_modules/jweixin-module/lib/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}!function (e, n) { true ? !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {return n(e);}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;}(window, function (o, e) {if (!o.jWeixin) {var _w;var n,c = { config: "preVerifyJSAPI", onMenuShareTimeline: "menu:share:timeline", onMenuShareAppMessage: "menu:share:appmessage", onMenuShareQQ: "menu:share:qq", onMenuShareWeibo: "menu:share:weiboApp", onMenuShareQZone: "menu:share:QZone", previewImage: "imagePreview", getLocation: "geoLocation", openProductSpecificView: "openProductViewWithPid", addCard: "batchAddCard", openCard: "batchViewCard", chooseWXPay: "getBrandWCPayRequest", openEnterpriseRedPacket: "getRecevieBizHongBaoRequest", startSearchBeacons: "startMonitoringBeacons", stopSearchBeacons: "stopMonitoringBeacons", onSearchBeacons: "onBeaconsInRange", consumeAndShareCard: "consumedShareCard", openAddress: "editAddress" },a = function () {var e = {};for (var n in c) {e[c[n]] = n;}return e;}(),i = o.document,t = i.title,r = navigator.userAgent.toLowerCase(),s = navigator.platform.toLowerCase(),d = !(!s.match("mac") && !s.match("win")),u = -1 != r.indexOf("wxdebugger"),l = -1 != r.indexOf("micromessenger"),p = -1 != r.indexOf("android"),f = -1 != r.indexOf("iphone") || -1 != r.indexOf("ipad"),m = (n = r.match(/micromessenger\/(\d+\.\d+\.\d+)/) || r.match(/micromessenger\/(\d+\.\d+)/)) ? n[1] : "",g = { initStartTime: L(), initEndTime: 0, preVerifyStartTime: 0, preVerifyEndTime: 0 },h = { version: 1, appId: "", initTime: 0, preVerifyTime: 0, networkType: "", isPreVerifyOk: 1, systemType: f ? 1 : p ? 2 : -1, clientVersion: m, url: encodeURIComponent(location.href) },v = {},S = { _completes: [] },y = { state: 0, data: {} };O(function () {g.initEndTime = L();});var I = !1,_ = [],w = (_w = { config: function config(e) {B("config", v = e);var t = !1 !== v.check;O(function () {if (t) M(c.config, { verifyJsApiList: C(v.jsApiList), verifyOpenTagList: C(v.openTagList) }, function () {S._complete = function (e) {g.preVerifyEndTime = L(), y.state = 1, y.data = e;}, S.success = function (e) {h.isPreVerifyOk = 0;}, S.fail = function (e) {S._fail ? S._fail(e) : y.state = -1;};var t = S._completes;return t.push(function () {!function () {if (!(d || u || v.debug || m < "6.0.2" || h.systemType < 0)) {var i = new Image();h.appId = v.appId, h.initTime = g.initEndTime - g.initStartTime, h.preVerifyTime = g.preVerifyEndTime - g.preVerifyStartTime, w.getNetworkType({ isInnerInvoke: !0, success: function success(e) {h.networkType = e.networkType;var n = "https://open.weixin.qq.com/sdk/report?v=" + h.version + "&o=" + h.isPreVerifyOk + "&s=" + h.systemType + "&c=" + h.clientVersion + "&a=" + h.appId + "&n=" + h.networkType + "&i=" + h.initTime + "&p=" + h.preVerifyTime + "&u=" + h.url;i.src = n;} });}}();}), S.complete = function (e) {for (var n = 0, i = t.length; n < i; ++n) {t[n]();}S._completes = [];}, S;}()), g.preVerifyStartTime = L();else {y.state = 1;for (var e = S._completes, n = 0, i = e.length; n < i; ++n) {e[n]();}S._completes = [];}}), w.invoke || (w.invoke = function (e, n, i) {o.WeixinJSBridge && WeixinJSBridge.invoke(e, x(n), i);}, w.on = function (e, n) {o.WeixinJSBridge && WeixinJSBridge.on(e, n);});}, ready: function ready(e) {0 != y.state ? e() : (S._completes.push(e), !l && v.debug && e());}, error: function error(e) {m < "6.0.2" || (-1 == y.state ? e(y.data) : S._fail = e);}, checkJsApi: function checkJsApi(e) {M("checkJsApi", { jsApiList: C(e.jsApiList) }, (e._complete = function (e) {if (p) {var n = e.checkResult;n && (e.checkResult = JSON.parse(n));}e = function (e) {var n = e.checkResult;for (var i in n) {var t = a[i];t && (n[t] = n[i], delete n[i]);}return e;}(e);}, e));}, onMenuShareTimeline: function onMenuShareTimeline(e) {P(c.onMenuShareTimeline, { complete: function complete() {M("shareTimeline", { title: e.title || t, desc: e.title || t, img_url: e.imgUrl || "", link: e.link || location.href, type: e.type || "link", data_url: e.dataUrl || "" }, e);} }, e);}, onMenuShareAppMessage: function onMenuShareAppMessage(n) {P(c.onMenuShareAppMessage, { complete: function complete(e) {"favorite" === e.scene ? M("sendAppMessage", { title: n.title || t, desc: n.desc || "", link: n.link || location.href, img_url: n.imgUrl || "", type: n.type || "link", data_url: n.dataUrl || "" }) : M("sendAppMessage", { title: n.title || t, desc: n.desc || "", link: n.link || location.href, img_url: n.imgUrl || "", type: n.type || "link", data_url: n.dataUrl || "" }, n);} }, n);}, onMenuShareQQ: function onMenuShareQQ(e) {P(c.onMenuShareQQ, { complete: function complete() {M("shareQQ", { title: e.title || t, desc: e.desc || "", img_url: e.imgUrl || "", link: e.link || location.href }, e);} }, e);}, onMenuShareWeibo: function onMenuShareWeibo(e) {P(c.onMenuShareWeibo, { complete: function complete() {M("shareWeiboApp", { title: e.title || t, desc: e.desc || "", img_url: e.imgUrl || "", link: e.link || location.href }, e);} }, e);}, onMenuShareQZone: function onMenuShareQZone(e) {P(c.onMenuShareQZone, { complete: function complete() {M("shareQZone", { title: e.title || t, desc: e.desc || "", img_url: e.imgUrl || "", link: e.link || location.href }, e);} }, e);}, updateTimelineShareData: function updateTimelineShareData(e) {M("updateTimelineShareData", { title: e.title, link: e.link, imgUrl: e.imgUrl }, e);}, updateAppMessageShareData: function updateAppMessageShareData(e) {M("updateAppMessageShareData", { title: e.title, desc: e.desc, link: e.link, imgUrl: e.imgUrl }, e);}, startRecord: function startRecord(e) {M("startRecord", {}, e);}, stopRecord: function stopRecord(e) {M("stopRecord", {}, e);}, onVoiceRecordEnd: function onVoiceRecordEnd(e) {P("onVoiceRecordEnd", e);}, playVoice: function playVoice(e) {M("playVoice", { localId: e.localId }, e);}, pauseVoice: function pauseVoice(e) {M("pauseVoice", { localId: e.localId }, e);}, stopVoice: function stopVoice(e) {M("stopVoice", { localId: e.localId }, e);}, onVoicePlayEnd: function onVoicePlayEnd(e) {P("onVoicePlayEnd", e);}, uploadVoice: function uploadVoice(e) {M("uploadVoice", { localId: e.localId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 }, e);}, downloadVoice: function downloadVoice(e) {M("downloadVoice", { serverId: e.serverId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 }, e);}, translateVoice: function translateVoice(e) {M("translateVoice", { localId: e.localId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 }, e);}, chooseImage: function chooseImage(e) {M("chooseImage", { scene: "1|2", count: e.count || 9, sizeType: e.sizeType || ["original", "compressed"], sourceType: e.sourceType || ["album", "camera"] }, (e._complete = function (e) {if (p) {var n = e.localIds;try {n && (e.localIds = JSON.parse(n));} catch (e) {}}}, e));}, getLocation: function getLocation(e) {}, previewImage: function previewImage(e) {M(c.previewImage, { current: e.current, urls: e.urls }, e);}, uploadImage: function uploadImage(e) {M("uploadImage", { localId: e.localId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 }, e);}, downloadImage: function downloadImage(e) {M("downloadImage", { serverId: e.serverId, isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 }, e);}, getLocalImgData: function getLocalImgData(e) {!1 === I ? (I = !0, M("getLocalImgData", { localId: e.localId }, (e._complete = function (e) {if (I = !1, 0 < _.length) {var n = _.shift();wx.getLocalImgData(n);}}, e))) : _.push(e);}, getNetworkType: function getNetworkType(e) {M("getNetworkType", {}, (e._complete = function (e) {e = function (e) {var n = e.errMsg;e.errMsg = "getNetworkType:ok";var i = e.subtype;if (delete e.subtype, i) e.networkType = i;else {var t = n.indexOf(":"),o = n.substring(t + 1);switch (o) {case "wifi":case "edge":case "wwan":e.networkType = o;break;default:e.errMsg = "getNetworkType:fail";}}return e;}(e);}, e));}, openLocation: function openLocation(e) {M("openLocation", { latitude: e.latitude, longitude: e.longitude, name: e.name || "", address: e.address || "", scale: e.scale || 28, infoUrl: e.infoUrl || "" }, e);} }, _defineProperty(_w, "getLocation", function getLocation(e) {M(c.getLocation, { type: (e = e || {}).type || "wgs84" }, (e._complete = function (e) {delete e.type;}, e));}), _defineProperty(_w, "hideOptionMenu", function hideOptionMenu(e) {M("hideOptionMenu", {}, e);}), _defineProperty(_w, "showOptionMenu", function showOptionMenu(e) {M("showOptionMenu", {}, e);}), _defineProperty(_w, "closeWindow", function closeWindow(e) {M("closeWindow", {}, e = e || {});}), _defineProperty(_w, "hideMenuItems", function hideMenuItems(e) {M("hideMenuItems", { menuList: e.menuList }, e);}), _defineProperty(_w, "showMenuItems", function showMenuItems(e) {M("showMenuItems", { menuList: e.menuList }, e);}), _defineProperty(_w, "hideAllNonBaseMenuItem", function hideAllNonBaseMenuItem(e) {M("hideAllNonBaseMenuItem", {}, e);}), _defineProperty(_w, "showAllNonBaseMenuItem", function showAllNonBaseMenuItem(e) {M("showAllNonBaseMenuItem", {}, e);}), _defineProperty(_w, "scanQRCode", function scanQRCode(e) {M("scanQRCode", { needResult: (e = e || {}).needResult || 0, scanType: e.scanType || ["qrCode", "barCode"] }, (e._complete = function (e) {if (f) {var n = e.resultStr;if (n) {var i = JSON.parse(n);e.resultStr = i && i.scan_code && i.scan_code.scan_result;}}}, e));}), _defineProperty(_w, "openAddress", function openAddress(e) {M(c.openAddress, {}, (e._complete = function (e) {e = function (e) {return e.postalCode = e.addressPostalCode, delete e.addressPostalCode, e.provinceName = e.proviceFirstStageName, delete e.proviceFirstStageName, e.cityName = e.addressCitySecondStageName, delete e.addressCitySecondStageName, e.countryName = e.addressCountiesThirdStageName, delete e.addressCountiesThirdStageName, e.detailInfo = e.addressDetailInfo, delete e.addressDetailInfo, e;}(e);}, e));}), _defineProperty(_w, "openProductSpecificView", function openProductSpecificView(e) {M(c.openProductSpecificView, { pid: e.productId, view_type: e.viewType || 0, ext_info: e.extInfo }, e);}), _defineProperty(_w, "addCard", function addCard(e) {for (var n = e.cardList, i = [], t = 0, o = n.length; t < o; ++t) {var r = n[t],a = { card_id: r.cardId, card_ext: r.cardExt };i.push(a);}M(c.addCard, { card_list: i }, (e._complete = function (e) {var n = e.card_list;if (n) {for (var i = 0, t = (n = JSON.parse(n)).length; i < t; ++i) {var o = n[i];o.cardId = o.card_id, o.cardExt = o.card_ext, o.isSuccess = !!o.is_succ, delete o.card_id, delete o.card_ext, delete o.is_succ;}e.cardList = n, delete e.card_list;}}, e));}), _defineProperty(_w, "chooseCard", function chooseCard(e) {M("chooseCard", { app_id: v.appId, location_id: e.shopId || "", sign_type: e.signType || "SHA1", card_id: e.cardId || "", card_type: e.cardType || "", card_sign: e.cardSign, time_stamp: e.timestamp + "", nonce_str: e.nonceStr }, (e._complete = function (e) {e.cardList = e.choose_card_info, delete e.choose_card_info;}, e));}), _defineProperty(_w, "openCard", function openCard(e) {for (var n = e.cardList, i = [], t = 0, o = n.length; t < o; ++t) {var r = n[t],a = { card_id: r.cardId, code: r.code };i.push(a);}M(c.openCard, { card_list: i }, e);}), _defineProperty(_w, "consumeAndShareCard", function consumeAndShareCard(e) {M(c.consumeAndShareCard, { consumedCardId: e.cardId, consumedCode: e.code }, e);}), _defineProperty(_w, "chooseWXPay", function chooseWXPay(e) {M(c.chooseWXPay, V(e), e);}), _defineProperty(_w, "openEnterpriseRedPacket", function openEnterpriseRedPacket(e) {M(c.openEnterpriseRedPacket, V(e), e);}), _defineProperty(_w, "startSearchBeacons", function startSearchBeacons(e) {M(c.startSearchBeacons, { ticket: e.ticket }, e);}), _defineProperty(_w, "stopSearchBeacons", function stopSearchBeacons(e) {M(c.stopSearchBeacons, {}, e);}), _defineProperty(_w, "onSearchBeacons", function onSearchBeacons(e) {P(c.onSearchBeacons, e);}), _defineProperty(_w, "openEnterpriseChat", function openEnterpriseChat(e) {M("openEnterpriseChat", { useridlist: e.userIds, chatname: e.groupName }, e);}), _defineProperty(_w, "launchMiniProgram", function launchMiniProgram(e) {M("launchMiniProgram", { targetAppId: e.targetAppId, path: function (e) {if ("string" == typeof e && 0 < e.length) {var n = e.split("?")[0],i = e.split("?")[1];return n += ".html", void 0 !== i ? n + "?" + i : n;}}(e.path), envVersion: e.envVersion }, e);}), _defineProperty(_w, "openBusinessView", function openBusinessView(e) {M("openBusinessView", { businessType: e.businessType, queryString: e.queryString || "", envVersion: e.envVersion }, (e._complete = function (n) {if (p) {var e = n.extraData;if (e) try {n.extraData = JSON.parse(e);} catch (e) {n.extraData = {};}}}, e));}), _defineProperty(_w, "miniProgram", { navigateBack: function navigateBack(e) {e = e || {}, O(function () {M("invokeMiniProgramAPI", { name: "navigateBack", arg: { delta: e.delta || 1 } }, e);});}, navigateTo: function navigateTo(e) {O(function () {M("invokeMiniProgramAPI", { name: "navigateTo", arg: { url: e.url } }, e);});}, redirectTo: function redirectTo(e) {O(function () {M("invokeMiniProgramAPI", { name: "redirectTo", arg: { url: e.url } }, e);});}, switchTab: function switchTab(e) {O(function () {M("invokeMiniProgramAPI", { name: "switchTab", arg: { url: e.url } }, e);});}, reLaunch: function reLaunch(e) {O(function () {M("invokeMiniProgramAPI", { name: "reLaunch", arg: { url: e.url } }, e);});}, postMessage: function postMessage(e) {O(function () {M("invokeMiniProgramAPI", { name: "postMessage", arg: e.data || {} }, e);});}, getEnv: function getEnv(e) {O(function () {e({ miniprogram: "miniprogram" === o.__wxjs_environment });});} }), _w),T = 1,k = {};return i.addEventListener("error", function (e) {if (!p) {var n = e.target,i = n.tagName,t = n.src;if ("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i) if (-1 != t.indexOf("wxlocalresource://")) {e.preventDefault(), e.stopPropagation();var o = n["wx-id"];if (o || (o = T++, n["wx-id"] = o), k[o]) return;k[o] = !0, wx.ready(function () {wx.getLocalImgData({ localId: t, success: function success(e) {n.src = e.localData;} });});}}}, !0), i.addEventListener("load", function (e) {if (!p) {var n = e.target,i = n.tagName;n.src;if ("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i) {var t = n["wx-id"];t && (k[t] = !1);}}}, !0), e && (o.wx = o.jWeixin = w), w;}function M(n, e, i) {o.WeixinJSBridge ? WeixinJSBridge.invoke(n, x(e), function (e) {A(n, e, i);}) : B(n, i);}function P(n, i, t) {o.WeixinJSBridge ? WeixinJSBridge.on(n, function (e) {t && t.trigger && t.trigger(e), A(n, e, i);}) : B(n, t || i);}function x(e) {return (e = e || {}).appId = v.appId, e.verifyAppId = v.appId, e.verifySignType = "sha1", e.verifyTimestamp = v.timestamp + "", e.verifyNonceStr = v.nonceStr, e.verifySignature = v.signature, e;}function V(e) {return { timeStamp: e.timestamp + "", nonceStr: e.nonceStr, package: e.package, paySign: e.paySign, signType: e.signType || "SHA1" };}function A(e, n, i) {"openEnterpriseChat" != e && "openBusinessView" !== e || (n.errCode = n.err_code), delete n.err_code, delete n.err_desc, delete n.err_detail;var t = n.errMsg;t || (t = n.err_msg, delete n.err_msg, t = function (e, n) {var i = e,t = a[i];t && (i = t);var o = "ok";if (n) {var r = n.indexOf(":");"confirm" == (o = n.substring(r + 1)) && (o = "ok"), "failed" == o && (o = "fail"), -1 != o.indexOf("failed_") && (o = o.substring(7)), -1 != o.indexOf("fail_") && (o = o.substring(5)), "access denied" != (o = (o = o.replace(/_/g, " ")).toLowerCase()) && "no permission to execute" != o || (o = "permission denied"), "config" == i && "function not exist" == o && (o = "ok"), "" == o && (o = "fail");}return n = i + ":" + o;}(e, t), n.errMsg = t), (i = i || {})._complete && (i._complete(n), delete i._complete), t = n.errMsg || "", v.debug && !i.isInnerInvoke && alert(JSON.stringify(n));var o = t.indexOf(":");switch (t.substring(o + 1)) {case "ok":i.success && i.success(n);break;case "cancel":i.cancel && i.cancel(n);break;default:i.fail && i.fail(n);}i.complete && i.complete(n);}function C(e) {if (e) {for (var n = 0, i = e.length; n < i; ++n) {var t = e[n],o = c[t];o && (e[n] = o);}return e;}}function B(e, n) {if (!(!v.debug || n && n.isInnerInvoke)) {var i = a[e];i && (e = i), n && n._complete && delete n._complete, console.log('"' + e + '",', n || "");}}function L() {return new Date().getTime();}function O(e) {l && (o.WeixinJSBridge ? e() : i.addEventListener && i.addEventListener("WeixinJSBridgeReady", e, !1));}});

/***/ }),

/***/ 198:
/*!********************************************!*\
  !*** G:/work/洁利来h5商城/utils/picker.city.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var data = [{
  "id": 110000,
  "name": "北京市",
  "children": [{
    "children": [{
      "name": "东城区",
      "id": 110101 },

    {
      "name": "西城区",
      "id": 110102 },

    {
      "name": "朝阳区",
      "id": 110105 },

    {
      "name": "丰台区",
      "id": 110106 },

    {
      "name": "石景山区",
      "id": 110107 },

    {
      "name": "海淀区",
      "id": 110108 },

    {
      "name": "门头沟区",
      "id": 110109 },

    {
      "name": "房山区",
      "id": 110111 },

    {
      "name": "通州区",
      "id": 110112 },

    {
      "name": "顺义区",
      "id": 110113 },

    {
      "name": "昌平区",
      "id": 110114 },

    {
      "name": "大兴区",
      "id": 110115 },

    {
      "name": "怀柔区",
      "id": 110116 },

    {
      "name": "平谷区",
      "id": 110117 },

    {
      "name": "密云县",
      "id": 110228 },

    {
      "name": "延庆县",
      "id": 110229 }],


    "name": "北京市",
    "id": 110000 }] },


{
  "id": 120000,
  "name": "天津市",
  "children": [{
    "children": [{
      "name": "和平区",
      "id": 120101 },

    {
      "name": "河东区",
      "id": 120102 },

    {
      "name": "河西区",
      "id": 120103 },

    {
      "name": "南开区",
      "id": 120104 },

    {
      "name": "河北区",
      "id": 120105 },

    {
      "name": "红桥区",
      "id": 120106 },

    {
      "name": "东丽区",
      "id": 120110 },

    {
      "name": "西青区",
      "id": 120111 },

    {
      "name": "津南区",
      "id": 120112 },

    {
      "name": "北辰区",
      "id": 120113 },

    {
      "name": "武清区",
      "id": 120114 },

    {
      "name": "宝坻区",
      "id": 120115 },

    {
      "name": "滨海新区",
      "id": 120116 },

    {
      "name": "宁河县",
      "id": 120221 },

    {
      "name": "静海县",
      "id": 120223 },

    {
      "name": "蓟县",
      "id": 120225 }],


    "name": "天津市",
    "id": 120000 }] },


{
  "id": 130000,
  "name": "河北省",
  "children": [{
    "children": [{
      "name": "市辖区",
      "id": 130101 },

    {
      "name": "长安区",
      "id": 130102 },

    {
      "name": "桥东区",
      "id": 130103 },

    {
      "name": "桥西区",
      "id": 130104 },

    {
      "name": "新华区",
      "id": 130105 },

    {
      "name": "井陉矿区",
      "id": 130107 },

    {
      "name": "裕华区",
      "id": 130108 },

    {
      "name": "井陉县",
      "id": 130121 },

    {
      "name": "正定县",
      "id": 130123 },

    {
      "name": "栾城县",
      "id": 130124 },

    {
      "name": "行唐县",
      "id": 130125 },

    {
      "name": "灵寿县",
      "id": 130126 },

    {
      "name": "高邑县",
      "id": 130127 },

    {
      "name": "深泽县",
      "id": 130128 },

    {
      "name": "赞皇县",
      "id": 130129 },

    {
      "name": "无极县",
      "id": 130130 },

    {
      "name": "平山县",
      "id": 130131 },

    {
      "name": "元氏县",
      "id": 130132 },

    {
      "name": "赵县",
      "id": 130133 },

    {
      "name": "辛集市",
      "id": 130181 },

    {
      "name": "藁城市",
      "id": 130182 },

    {
      "name": "晋州市",
      "id": 130183 },

    {
      "name": "新乐市",
      "id": 130184 },

    {
      "name": "鹿泉市",
      "id": 130185 }],


    "name": "石家庄市",
    "id": 130100 },

  {
    "children": [{
      "name": "市辖区",
      "id": 130201 },

    {
      "name": "路南区",
      "id": 130202 },

    {
      "name": "路北区",
      "id": 130203 },

    {
      "name": "古冶区",
      "id": 130204 },

    {
      "name": "开平区",
      "id": 130205 },

    {
      "name": "丰南区",
      "id": 130207 },

    {
      "name": "丰润区",
      "id": 130208 },

    {
      "name": "曹妃甸区",
      "id": 130209 },

    {
      "name": "滦县",
      "id": 130223 },

    {
      "name": "滦南县",
      "id": 130224 },

    {
      "name": "乐亭县",
      "id": 130225 },

    {
      "name": "迁西县",
      "id": 130227 },

    {
      "name": "玉田县",
      "id": 130229 },

    {
      "name": "遵化市",
      "id": 130281 },

    {
      "name": "迁安市",
      "id": 130283 }],


    "name": "唐山市",
    "id": 130200 },

  {
    "children": [{
      "name": "市辖区",
      "id": 130301 },

    {
      "name": "海港区",
      "id": 130302 },

    {
      "name": "山海关区",
      "id": 130303 },

    {
      "name": "北戴河区",
      "id": 130304 },

    {
      "name": "青龙满族自治县",
      "id": 130321 },

    {
      "name": "昌黎县",
      "id": 130322 },

    {
      "name": "抚宁县",
      "id": 130323 },

    {
      "name": "卢龙县",
      "id": 130324 }],


    "name": "秦皇岛市",
    "id": 130300 },

  {
    "children": [{
      "name": "市辖区",
      "id": 130401 },

    {
      "name": "邯山区",
      "id": 130402 },

    {
      "name": "丛台区",
      "id": 130403 },

    {
      "name": "复兴区",
      "id": 130404 },

    {
      "name": "峰峰矿区",
      "id": 130406 },

    {
      "name": "邯郸县",
      "id": 130421 },

    {
      "name": "临漳县",
      "id": 130423 },

    {
      "name": "成安县",
      "id": 130424 },

    {
      "name": "大名县",
      "id": 130425 },

    {
      "name": "涉县",
      "id": 130426 },

    {
      "name": "磁县",
      "id": 130427 },

    {
      "name": "肥乡县",
      "id": 130428 },

    {
      "name": "永年县",
      "id": 130429 },

    {
      "name": "邱县",
      "id": 130430 },

    {
      "name": "鸡泽县",
      "id": 130431 },

    {
      "name": "广平县",
      "id": 130432 },

    {
      "name": "馆陶县",
      "id": 130433 },

    {
      "name": "魏县",
      "id": 130434 },

    {
      "name": "曲周县",
      "id": 130435 },

    {
      "name": "武安市",
      "id": 130481 }],


    "name": "邯郸市",
    "id": 130400 },

  {
    "children": [{
      "name": "市辖区",
      "id": 130501 },

    {
      "name": "桥东区",
      "id": 130502 },

    {
      "name": "桥西区",
      "id": 130503 },

    {
      "name": "邢台县",
      "id": 130521 },

    {
      "name": "临城县",
      "id": 130522 },

    {
      "name": "内丘县",
      "id": 130523 },

    {
      "name": "柏乡县",
      "id": 130524 },

    {
      "name": "隆尧县",
      "id": 130525 },

    {
      "name": "任县",
      "id": 130526 },

    {
      "name": "南和县",
      "id": 130527 },

    {
      "name": "宁晋县",
      "id": 130528 },

    {
      "name": "巨鹿县",
      "id": 130529 },

    {
      "name": "新河县",
      "id": 130530 },

    {
      "name": "广宗县",
      "id": 130531 },

    {
      "name": "平乡县",
      "id": 130532 },

    {
      "name": "威县",
      "id": 130533 },

    {
      "name": "清河县",
      "id": 130534 },

    {
      "name": "临西县",
      "id": 130535 },

    {
      "name": "南宫市",
      "id": 130581 },

    {
      "name": "沙河市",
      "id": 130582 }],


    "name": "邢台市",
    "id": 130500 },

  {
    "children": [{
      "name": "市辖区",
      "id": 130601 },

    {
      "name": "新市区",
      "id": 130602 },

    {
      "name": "北市区",
      "id": 130603 },

    {
      "name": "南市区",
      "id": 130604 },

    {
      "name": "满城县",
      "id": 130621 },

    {
      "name": "清苑县",
      "id": 130622 },

    {
      "name": "涞水县",
      "id": 130623 },

    {
      "name": "阜平县",
      "id": 130624 },

    {
      "name": "徐水县",
      "id": 130625 },

    {
      "name": "定兴县",
      "id": 130626 },

    {
      "name": "唐县",
      "id": 130627 },

    {
      "name": "高阳县",
      "id": 130628 },

    {
      "name": "容城县",
      "id": 130629 },

    {
      "name": "涞源县",
      "id": 130630 },

    {
      "name": "望都县",
      "id": 130631 },

    {
      "name": "安新县",
      "id": 130632 },

    {
      "name": "易县",
      "id": 130633 },

    {
      "name": "曲阳县",
      "id": 130634 },

    {
      "name": "蠡县",
      "id": 130635 },

    {
      "name": "顺平县",
      "id": 130636 },

    {
      "name": "博野县",
      "id": 130637 },

    {
      "name": "雄县",
      "id": 130638 },

    {
      "name": "涿州市",
      "id": 130681 },

    {
      "name": "定州市",
      "id": 130682 },

    {
      "name": "安国市",
      "id": 130683 },

    {
      "name": "高碑店市",
      "id": 130684 }],


    "name": "保定市",
    "id": 130600 },

  {
    "children": [{
      "name": "市辖区",
      "id": 130701 },

    {
      "name": "桥东区",
      "id": 130702 },

    {
      "name": "桥西区",
      "id": 130703 },

    {
      "name": "宣化区",
      "id": 130705 },

    {
      "name": "下花园区",
      "id": 130706 },

    {
      "name": "宣化县",
      "id": 130721 },

    {
      "name": "张北县",
      "id": 130722 },

    {
      "name": "康保县",
      "id": 130723 },

    {
      "name": "沽源县",
      "id": 130724 },

    {
      "name": "尚义县",
      "id": 130725 },

    {
      "name": "蔚县",
      "id": 130726 },

    {
      "name": "阳原县",
      "id": 130727 },

    {
      "name": "怀安县",
      "id": 130728 },

    {
      "name": "万全县",
      "id": 130729 },

    {
      "name": "怀来县",
      "id": 130730 },

    {
      "name": "涿鹿县",
      "id": 130731 },

    {
      "name": "赤城县",
      "id": 130732 },

    {
      "name": "崇礼县",
      "id": 130733 }],


    "name": "张家口市",
    "id": 130700 },

  {
    "children": [{
      "name": "市辖区",
      "id": 130801 },

    {
      "name": "双桥区",
      "id": 130802 },

    {
      "name": "双滦区",
      "id": 130803 },

    {
      "name": "鹰手营子矿区",
      "id": 130804 },

    {
      "name": "承德县",
      "id": 130821 },

    {
      "name": "兴隆县",
      "id": 130822 },

    {
      "name": "平泉县",
      "id": 130823 },

    {
      "name": "滦平县",
      "id": 130824 },

    {
      "name": "隆化县",
      "id": 130825 },

    {
      "name": "丰宁满族自治县",
      "id": 130826 },

    {
      "name": "宽城满族自治县",
      "id": 130827 },

    {
      "name": "围场满族蒙古族自治县",
      "id": 130828 }],


    "name": "承德市",
    "id": 130800 },

  {
    "children": [{
      "name": "市辖区",
      "id": 130901 },

    {
      "name": "新华区",
      "id": 130902 },

    {
      "name": "运河区",
      "id": 130903 },

    {
      "name": "沧县",
      "id": 130921 },

    {
      "name": "青县",
      "id": 130922 },

    {
      "name": "东光县",
      "id": 130923 },

    {
      "name": "海兴县",
      "id": 130924 },

    {
      "name": "盐山县",
      "id": 130925 },

    {
      "name": "肃宁县",
      "id": 130926 },

    {
      "name": "南皮县",
      "id": 130927 },

    {
      "name": "吴桥县",
      "id": 130928 },

    {
      "name": "献县",
      "id": 130929 },

    {
      "name": "孟村回族自治县",
      "id": 130930 },

    {
      "name": "泊头市",
      "id": 130981 },

    {
      "name": "任丘市",
      "id": 130982 },

    {
      "name": "黄骅市",
      "id": 130983 },

    {
      "name": "河间市",
      "id": 130984 }],


    "name": "沧州市",
    "id": 130900 },

  {
    "children": [{
      "name": "市辖区",
      "id": 131001 },

    {
      "name": "安次区",
      "id": 131002 },

    {
      "name": "广阳区",
      "id": 131003 },

    {
      "name": "固安县",
      "id": 131022 },

    {
      "name": "永清县",
      "id": 131023 },

    {
      "name": "香河县",
      "id": 131024 },

    {
      "name": "大城县",
      "id": 131025 },

    {
      "name": "文安县",
      "id": 131026 },

    {
      "name": "大厂回族自治县",
      "id": 131028 },

    {
      "name": "霸州市",
      "id": 131081 },

    {
      "name": "三河市",
      "id": 131082 }],


    "name": "廊坊市",
    "id": 131000 },

  {
    "children": [{
      "name": "市辖区",
      "id": 131101 },

    {
      "name": "桃城区",
      "id": 131102 },

    {
      "name": "枣强县",
      "id": 131121 },

    {
      "name": "武邑县",
      "id": 131122 },

    {
      "name": "武强县",
      "id": 131123 },

    {
      "name": "饶阳县",
      "id": 131124 },

    {
      "name": "安平县",
      "id": 131125 },

    {
      "name": "故城县",
      "id": 131126 },

    {
      "name": "景县",
      "id": 131127 },

    {
      "name": "阜城县",
      "id": 131128 },

    {
      "name": "冀州市",
      "id": 131181 },

    {
      "name": "深州市",
      "id": 131182 }],


    "name": "衡水市",
    "id": 131100 }] },



{
  "id": 140000,
  "name": "山西省",
  "children": [{
    "children": [{
      "name": "市辖区",
      "id": 140101 },

    {
      "name": "小店区",
      "id": 140105 },

    {
      "name": "迎泽区",
      "id": 140106 },

    {
      "name": "杏花岭区",
      "id": 140107 },

    {
      "name": "尖草坪区",
      "id": 140108 },

    {
      "name": "万柏林区",
      "id": 140109 },

    {
      "name": "晋源区",
      "id": 140110 },

    {
      "name": "清徐县",
      "id": 140121 },

    {
      "name": "阳曲县",
      "id": 140122 },

    {
      "name": "娄烦县",
      "id": 140123 },

    {
      "name": "古交市",
      "id": 140181 }],


    "name": "太原市",
    "id": 140100 },

  {
    "children": [{
      "name": "市辖区",
      "id": 140201 },

    {
      "name": "城区",
      "id": 140202 },

    {
      "name": "矿区",
      "id": 140203 },

    {
      "name": "南郊区",
      "id": 140211 },

    {
      "name": "新荣区",
      "id": 140212 },

    {
      "name": "阳高县",
      "id": 140221 },

    {
      "name": "天镇县",
      "id": 140222 },

    {
      "name": "广灵县",
      "id": 140223 },

    {
      "name": "灵丘县",
      "id": 140224 },

    {
      "name": "浑源县",
      "id": 140225 },

    {
      "name": "左云县",
      "id": 140226 },

    {
      "name": "大同县",
      "id": 140227 }],


    "name": "大同市",
    "id": 140200 },

  {
    "children": [{
      "name": "市辖区",
      "id": 140301 },

    {
      "name": "城区",
      "id": 140302 },

    {
      "name": "矿区",
      "id": 140303 },

    {
      "name": "郊区",
      "id": 140311 },

    {
      "name": "平定县",
      "id": 140321 },

    {
      "name": "盂县",
      "id": 140322 }],


    "name": "阳泉市",
    "id": 140300 },

  {
    "children": [{
      "name": "市辖区",
      "id": 140401 },

    {
      "name": "城区",
      "id": 140402 },

    {
      "name": "郊区",
      "id": 140411 },

    {
      "name": "长治县",
      "id": 140421 },

    {
      "name": "襄垣县",
      "id": 140423 },

    {
      "name": "屯留县",
      "id": 140424 },

    {
      "name": "平顺县",
      "id": 140425 },

    {
      "name": "黎城县",
      "id": 140426 },

    {
      "name": "壶关县",
      "id": 140427 },

    {
      "name": "长子县",
      "id": 140428 },

    {
      "name": "武乡县",
      "id": 140429 },

    {
      "name": "沁县",
      "id": 140430 },

    {
      "name": "沁源县",
      "id": 140431 },

    {
      "name": "潞城市",
      "id": 140481 }],


    "name": "长治市",
    "id": 140400 },

  {
    "children": [{
      "name": "市辖区",
      "id": 140501 },

    {
      "name": "城区",
      "id": 140502 },

    {
      "name": "沁水县",
      "id": 140521 },

    {
      "name": "阳城县",
      "id": 140522 },

    {
      "name": "陵川县",
      "id": 140524 },

    {
      "name": "泽州县",
      "id": 140525 },

    {
      "name": "高平市",
      "id": 140581 }],


    "name": "晋城市",
    "id": 140500 },

  {
    "children": [{
      "name": "市辖区",
      "id": 140601 },

    {
      "name": "朔城区",
      "id": 140602 },

    {
      "name": "平鲁区",
      "id": 140603 },

    {
      "name": "山阴县",
      "id": 140621 },

    {
      "name": "应县",
      "id": 140622 },

    {
      "name": "右玉县",
      "id": 140623 },

    {
      "name": "怀仁县",
      "id": 140624 }],


    "name": "朔州市",
    "id": 140600 },

  {
    "children": [{
      "name": "市辖区",
      "id": 140701 },

    {
      "name": "榆次区",
      "id": 140702 },

    {
      "name": "榆社县",
      "id": 140721 },

    {
      "name": "左权县",
      "id": 140722 },

    {
      "name": "和顺县",
      "id": 140723 },

    {
      "name": "昔阳县",
      "id": 140724 },

    {
      "name": "寿阳县",
      "id": 140725 },

    {
      "name": "太谷县",
      "id": 140726 },

    {
      "name": "祁县",
      "id": 140727 },

    {
      "name": "平遥县",
      "id": 140728 },

    {
      "name": "灵石县",
      "id": 140729 },

    {
      "name": "介休市",
      "id": 140781 }],


    "name": "晋中市",
    "id": 140700 },

  {
    "children": [{
      "name": "市辖区",
      "id": 140801 },

    {
      "name": "盐湖区",
      "id": 140802 },

    {
      "name": "临猗县",
      "id": 140821 },

    {
      "name": "万荣县",
      "id": 140822 },

    {
      "name": "闻喜县",
      "id": 140823 },

    {
      "name": "稷山县",
      "id": 140824 },

    {
      "name": "新绛县",
      "id": 140825 },

    {
      "name": "绛县",
      "id": 140826 },

    {
      "name": "垣曲县",
      "id": 140827 },

    {
      "name": "夏县",
      "id": 140828 },

    {
      "name": "平陆县",
      "id": 140829 },

    {
      "name": "芮城县",
      "id": 140830 },

    {
      "name": "永济市",
      "id": 140881 },

    {
      "name": "河津市",
      "id": 140882 }],


    "name": "运城市",
    "id": 140800 },

  {
    "children": [{
      "name": "市辖区",
      "id": 140901 },

    {
      "name": "忻府区",
      "id": 140902 },

    {
      "name": "定襄县",
      "id": 140921 },

    {
      "name": "五台县",
      "id": 140922 },

    {
      "name": "代县",
      "id": 140923 },

    {
      "name": "繁峙县",
      "id": 140924 },

    {
      "name": "宁武县",
      "id": 140925 },

    {
      "name": "静乐县",
      "id": 140926 },

    {
      "name": "神池县",
      "id": 140927 },

    {
      "name": "五寨县",
      "id": 140928 },

    {
      "name": "岢岚县",
      "id": 140929 },

    {
      "name": "河曲县",
      "id": 140930 },

    {
      "name": "保德县",
      "id": 140931 },

    {
      "name": "偏关县",
      "id": 140932 },

    {
      "name": "原平市",
      "id": 140981 }],


    "name": "忻州市",
    "id": 140900 },

  {
    "children": [{
      "name": "市辖区",
      "id": 141001 },

    {
      "name": "尧都区",
      "id": 141002 },

    {
      "name": "曲沃县",
      "id": 141021 },

    {
      "name": "翼城县",
      "id": 141022 },

    {
      "name": "襄汾县",
      "id": 141023 },

    {
      "name": "洪洞县",
      "id": 141024 },

    {
      "name": "古县",
      "id": 141025 },

    {
      "name": "安泽县",
      "id": 141026 },

    {
      "name": "浮山县",
      "id": 141027 },

    {
      "name": "吉县",
      "id": 141028 },

    {
      "name": "乡宁县",
      "id": 141029 },

    {
      "name": "大宁县",
      "id": 141030 },

    {
      "name": "隰县",
      "id": 141031 },

    {
      "name": "永和县",
      "id": 141032 },

    {
      "name": "蒲县",
      "id": 141033 },

    {
      "name": "汾西县",
      "id": 141034 },

    {
      "name": "侯马市",
      "id": 141081 },

    {
      "name": "霍州市",
      "id": 141082 }],


    "name": "临汾市",
    "id": 141000 },

  {
    "children": [{
      "name": "市辖区",
      "id": 141101 },

    {
      "name": "离石区",
      "id": 141102 },

    {
      "name": "文水县",
      "id": 141121 },

    {
      "name": "交城县",
      "id": 141122 },

    {
      "name": "兴县",
      "id": 141123 },

    {
      "name": "临县",
      "id": 141124 },

    {
      "name": "柳林县",
      "id": 141125 },

    {
      "name": "石楼县",
      "id": 141126 },

    {
      "name": "岚县",
      "id": 141127 },

    {
      "name": "方山县",
      "id": 141128 },

    {
      "name": "中阳县",
      "id": 141129 },

    {
      "name": "交口县",
      "id": 141130 },

    {
      "name": "孝义市",
      "id": 141181 },

    {
      "name": "汾阳市",
      "id": 141182 }],


    "name": "吕梁市",
    "id": 141100 }] },



{
  "id": 150000,
  "name": "内蒙古自治区",
  "children": [{
    "children": [{
      "name": "市辖区",
      "id": 150101 },

    {
      "name": "新城区",
      "id": 150102 },

    {
      "name": "回民区",
      "id": 150103 },

    {
      "name": "玉泉区",
      "id": 150104 },

    {
      "name": "赛罕区",
      "id": 150105 },

    {
      "name": "土默特左旗",
      "id": 150121 },

    {
      "name": "托克托县",
      "id": 150122 },

    {
      "name": "和林格尔县",
      "id": 150123 },

    {
      "name": "清水河县",
      "id": 150124 },

    {
      "name": "武川县",
      "id": 150125 }],


    "name": "呼和浩特市",
    "id": 150100 },

  {
    "children": [{
      "name": "市辖区",
      "id": 150201 },

    {
      "name": "东河区",
      "id": 150202 },

    {
      "name": "昆都仑区",
      "id": 150203 },

    {
      "name": "青山区",
      "id": 150204 },

    {
      "name": "石拐区",
      "id": 150205 },

    {
      "name": "白云鄂博矿区",
      "id": 150206 },

    {
      "name": "九原区",
      "id": 150207 },

    {
      "name": "土默特右旗",
      "id": 150221 },

    {
      "name": "固阳县",
      "id": 150222 },

    {
      "name": "达尔罕茂明安联合旗",
      "id": 150223 }],


    "name": "包头市",
    "id": 150200 },

  {
    "children": [{
      "name": "市辖区",
      "id": 150301 },

    {
      "name": "海勃湾区",
      "id": 150302 },

    {
      "name": "海南区",
      "id": 150303 },

    {
      "name": "乌达区",
      "id": 150304 }],


    "name": "乌海市",
    "id": 150300 },

  {
    "children": [{
      "name": "市辖区",
      "id": 150401 },

    {
      "name": "红山区",
      "id": 150402 },

    {
      "name": "元宝山区",
      "id": 150403 },

    {
      "name": "松山区",
      "id": 150404 },

    {
      "name": "阿鲁科尔沁旗",
      "id": 150421 },

    {
      "name": "巴林左旗",
      "id": 150422 },

    {
      "name": "巴林右旗",
      "id": 150423 },

    {
      "name": "林西县",
      "id": 150424 },

    {
      "name": "克什克腾旗",
      "id": 150425 },

    {
      "name": "翁牛特旗",
      "id": 150426 },

    {
      "name": "喀喇沁旗",
      "id": 150428 },

    {
      "name": "宁城县",
      "id": 150429 },

    {
      "name": "敖汉旗",
      "id": 150430 }],


    "name": "赤峰市",
    "id": 150400 },

  {
    "children": [{
      "name": "市辖区",
      "id": 150501 },

    {
      "name": "科尔沁区",
      "id": 150502 },

    {
      "name": "科尔沁左翼中旗",
      "id": 150521 },

    {
      "name": "科尔沁左翼后旗",
      "id": 150522 },

    {
      "name": "开鲁县",
      "id": 150523 },

    {
      "name": "库伦旗",
      "id": 150524 },

    {
      "name": "奈曼旗",
      "id": 150525 },

    {
      "name": "扎鲁特旗",
      "id": 150526 },

    {
      "name": "霍林郭勒市",
      "id": 150581 }],


    "name": "通辽市",
    "id": 150500 },

  {
    "children": [{
      "name": "市辖区",
      "id": 150601 },

    {
      "name": "东胜区",
      "id": 150602 },

    {
      "name": "达拉特旗",
      "id": 150621 },

    {
      "name": "准格尔旗",
      "id": 150622 },

    {
      "name": "鄂托克前旗",
      "id": 150623 },

    {
      "name": "鄂托克旗",
      "id": 150624 },

    {
      "name": "杭锦旗",
      "id": 150625 },

    {
      "name": "乌审旗",
      "id": 150626 },

    {
      "name": "伊金霍洛旗",
      "id": 150627 }],


    "name": "鄂尔多斯市",
    "id": 150600 },

  {
    "children": [{
      "name": "市辖区",
      "id": 150701 },

    {
      "name": "海拉尔区",
      "id": 150702 },

    {
      "name": "扎赉诺尔区",
      "id": 150703 },

    {
      "name": "阿荣旗",
      "id": 150721 },

    {
      "name": "莫力达瓦达斡尔族自治旗",
      "id": 150722 },

    {
      "name": "鄂伦春自治旗",
      "id": 150723 },

    {
      "name": "鄂温克族自治旗",
      "id": 150724 },

    {
      "name": "陈巴尔虎旗",
      "id": 150725 },

    {
      "name": "新巴尔虎左旗",
      "id": 150726 },

    {
      "name": "新巴尔虎右旗",
      "id": 150727 },

    {
      "name": "满洲里市",
      "id": 150781 },

    {
      "name": "牙克石市",
      "id": 150782 },

    {
      "name": "扎兰屯市",
      "id": 150783 },

    {
      "name": "额尔古纳市",
      "id": 150784 },

    {
      "name": "根河市",
      "id": 150785 }],


    "name": "呼伦贝尔市",
    "id": 150700 },

  {
    "children": [{
      "name": "市辖区",
      "id": 150801 },

    {
      "name": "临河区",
      "id": 150802 },

    {
      "name": "五原县",
      "id": 150821 },

    {
      "name": "磴口县",
      "id": 150822 },

    {
      "name": "乌拉特前旗",
      "id": 150823 },

    {
      "name": "乌拉特中旗",
      "id": 150824 },

    {
      "name": "乌拉特后旗",
      "id": 150825 },

    {
      "name": "杭锦后旗",
      "id": 150826 }],


    "name": "巴彦淖尔市",
    "id": 150800 },

  {
    "children": [{
      "name": "市辖区",
      "id": 150901 },

    {
      "name": "集宁区",
      "id": 150902 },

    {
      "name": "卓资县",
      "id": 150921 },

    {
      "name": "化德县",
      "id": 150922 },

    {
      "name": "商都县",
      "id": 150923 },

    {
      "name": "兴和县",
      "id": 150924 },

    {
      "name": "凉城县",
      "id": 150925 },

    {
      "name": "察哈尔右翼前旗",
      "id": 150926 },

    {
      "name": "察哈尔右翼中旗",
      "id": 150927 },

    {
      "name": "察哈尔右翼后旗",
      "id": 150928 },

    {
      "name": "四子王旗",
      "id": 150929 },

    {
      "name": "丰镇市",
      "id": 150981 }],


    "name": "乌兰察布市",
    "id": 150900 },

  {
    "children": [{
      "name": "乌兰浩特市",
      "id": 152201 },

    {
      "name": "阿尔山市",
      "id": 152202 },

    {
      "name": "科尔沁右翼前旗",
      "id": 152221 },

    {
      "name": "科尔沁右翼中旗",
      "id": 152222 },

    {
      "name": "扎赉特旗",
      "id": 152223 },

    {
      "name": "突泉县",
      "id": 152224 }],


    "name": "兴安盟",
    "id": 152200 },

  {
    "children": [{
      "name": "二连浩特市",
      "id": 152501 },

    {
      "name": "锡林浩特市",
      "id": 152502 },

    {
      "name": "阿巴嘎旗",
      "id": 152522 },

    {
      "name": "苏尼特左旗",
      "id": 152523 },

    {
      "name": "苏尼特右旗",
      "id": 152524 },

    {
      "name": "东乌珠穆沁旗",
      "id": 152525 },

    {
      "name": "西乌珠穆沁旗",
      "id": 152526 },

    {
      "name": "太仆寺旗",
      "id": 152527 },

    {
      "name": "镶黄旗",
      "id": 152528 },

    {
      "name": "正镶白旗",
      "id": 152529 },

    {
      "name": "正蓝旗",
      "id": 152530 },

    {
      "name": "多伦县",
      "id": 152531 }],


    "name": "锡林郭勒盟",
    "id": 152500 },

  {
    "children": [{
      "name": "阿拉善左旗",
      "id": 152921 },

    {
      "name": "阿拉善右旗",
      "id": 152922 },

    {
      "name": "额济纳旗",
      "id": 152923 }],


    "name": "阿拉善盟",
    "id": 152900 }] },



{
  "id": 210000,
  "name": "辽宁省",
  "children": [{
    "children": [{
      "name": "市辖区",
      "id": 210101 },

    {
      "name": "和平区",
      "id": 210102 },

    {
      "name": "沈河区",
      "id": 210103 },

    {
      "name": "大东区",
      "id": 210104 },

    {
      "name": "皇姑区",
      "id": 210105 },

    {
      "name": "铁西区",
      "id": 210106 },

    {
      "name": "苏家屯区",
      "id": 210111 },

    {
      "name": "东陵区",
      "id": 210112 },

    {
      "name": "沈北新区",
      "id": 210113 },

    {
      "name": "于洪区",
      "id": 210114 },

    {
      "name": "辽中县",
      "id": 210122 },

    {
      "name": "康平县",
      "id": 210123 },

    {
      "name": "法库县",
      "id": 210124 },

    {
      "name": "新民市",
      "id": 210181 }],


    "name": "沈阳市",
    "id": 210100 },

  {
    "children": [{
      "name": "市辖区",
      "id": 210201 },

    {
      "name": "中山区",
      "id": 210202 },

    {
      "name": "西岗区",
      "id": 210203 },

    {
      "name": "沙河口区",
      "id": 210204 },

    {
      "name": "甘井子区",
      "id": 210211 },

    {
      "name": "旅顺口区",
      "id": 210212 },

    {
      "name": "金州区",
      "id": 210213 },

    {
      "name": "长海县",
      "id": 210224 },

    {
      "name": "瓦房店市",
      "id": 210281 },

    {
      "name": "普兰店市",
      "id": 210282 },

    {
      "name": "庄河市",
      "id": 210283 }],


    "name": "大连市",
    "id": 210200 },

  {
    "children": [{
      "name": "市辖区",
      "id": 210301 },

    {
      "name": "铁东区",
      "id": 210302 },

    {
      "name": "铁西区",
      "id": 210303 },

    {
      "name": "立山区",
      "id": 210304 },

    {
      "name": "千山区",
      "id": 210311 },

    {
      "name": "台安县",
      "id": 210321 },

    {
      "name": "岫岩满族自治县",
      "id": 210323 },

    {
      "name": "海城市",
      "id": 210381 }],


    "name": "鞍山市",
    "id": 210300 },

  {
    "children": [{
      "name": "市辖区",
      "id": 210401 },

    {
      "name": "新抚区",
      "id": 210402 },

    {
      "name": "东洲区",
      "id": 210403 },

    {
      "name": "望花区",
      "id": 210404 },

    {
      "name": "顺城区",
      "id": 210411 },

    {
      "name": "抚顺县",
      "id": 210421 },

    {
      "name": "新宾满族自治县",
      "id": 210422 },

    {
      "name": "清原满族自治县",
      "id": 210423 }],


    "name": "抚顺市",
    "id": 210400 },

  {
    "children": [{
      "name": "市辖区",
      "id": 210501 },

    {
      "name": "平山区",
      "id": 210502 },

    {
      "name": "溪湖区",
      "id": 210503 },

    {
      "name": "明山区",
      "id": 210504 },

    {
      "name": "南芬区",
      "id": 210505 },

    {
      "name": "本溪满族自治县",
      "id": 210521 },

    {
      "name": "桓仁满族自治县",
      "id": 210522 }],


    "name": "本溪市",
    "id": 210500 },

  {
    "children": [{
      "name": "市辖区",
      "id": 210601 },

    {
      "name": "元宝区",
      "id": 210602 },

    {
      "name": "振兴区",
      "id": 210603 },

    {
      "name": "振安区",
      "id": 210604 },

    {
      "name": "宽甸满族自治县",
      "id": 210624 },

    {
      "name": "东港市",
      "id": 210681 },

    {
      "name": "凤城市",
      "id": 210682 }],


    "name": "丹东市",
    "id": 210600 },

  {
    "children": [{
      "name": "市辖区",
      "id": 210701 },

    {
      "name": "古塔区",
      "id": 210702 },

    {
      "name": "凌河区",
      "id": 210703 },

    {
      "name": "太和区",
      "id": 210711 },

    {
      "name": "黑山县",
      "id": 210726 },

    {
      "name": "义县",
      "id": 210727 },

    {
      "name": "凌海市",
      "id": 210781 },

    {
      "name": "北镇市",
      "id": 210782 }],


    "name": "锦州市",
    "id": 210700 },

  {
    "children": [{
      "name": "市辖区",
      "id": 210801 },

    {
      "name": "站前区",
      "id": 210802 },

    {
      "name": "西市区",
      "id": 210803 },

    {
      "name": "鲅鱼圈区",
      "id": 210804 },

    {
      "name": "老边区",
      "id": 210811 },

    {
      "name": "盖州市",
      "id": 210881 },

    {
      "name": "大石桥市",
      "id": 210882 }],


    "name": "营口市",
    "id": 210800 },

  {
    "children": [{
      "name": "市辖区",
      "id": 210901 },

    {
      "name": "海州区",
      "id": 210902 },

    {
      "name": "新邱区",
      "id": 210903 },

    {
      "name": "太平区",
      "id": 210904 },

    {
      "name": "清河门区",
      "id": 210905 },

    {
      "name": "细河区",
      "id": 210911 },

    {
      "name": "阜新蒙古族自治县",
      "id": 210921 },

    {
      "name": "彰武县",
      "id": 210922 }],


    "name": "阜新市",
    "id": 210900 },

  {
    "children": [{
      "name": "市辖区",
      "id": 211001 },

    {
      "name": "白塔区",
      "id": 211002 },

    {
      "name": "文圣区",
      "id": 211003 },

    {
      "name": "宏伟区",
      "id": 211004 },

    {
      "name": "弓长岭区",
      "id": 211005 },

    {
      "name": "太子河区",
      "id": 211011 },

    {
      "name": "辽阳县",
      "id": 211021 },

    {
      "name": "灯塔市",
      "id": 211081 }],


    "name": "辽阳市",
    "id": 211000 },

  {
    "children": [{
      "name": "市辖区",
      "id": 211101 },

    {
      "name": "双台子区",
      "id": 211102 },

    {
      "name": "兴隆台区",
      "id": 211103 },

    {
      "name": "大洼县",
      "id": 211121 },

    {
      "name": "盘山县",
      "id": 211122 }],


    "name": "盘锦市",
    "id": 211100 },

  {
    "children": [{
      "name": "市辖区",
      "id": 211201 },

    {
      "name": "银州区",
      "id": 211202 },

    {
      "name": "清河区",
      "id": 211204 },

    {
      "name": "铁岭县",
      "id": 211221 },

    {
      "name": "西丰县",
      "id": 211223 },

    {
      "name": "昌图县",
      "id": 211224 },

    {
      "name": "调兵山市",
      "id": 211281 },

    {
      "name": "开原市",
      "id": 211282 }],


    "name": "铁岭市",
    "id": 211200 },

  {
    "children": [{
      "name": "市辖区",
      "id": 211301 },

    {
      "name": "双塔区",
      "id": 211302 },

    {
      "name": "龙城区",
      "id": 211303 },

    {
      "name": "朝阳县",
      "id": 211321 },

    {
      "name": "建平县",
      "id": 211322 },

    {
      "name": "喀喇沁左翼蒙古族自治县",
      "id": 211324 },

    {
      "name": "北票市",
      "id": 211381 },

    {
      "name": "凌源市",
      "id": 211382 }],


    "name": "朝阳市",
    "id": 211300 },

  {
    "children": [{
      "name": "市辖区",
      "id": 211401 },

    {
      "name": "连山区",
      "id": 211402 },

    {
      "name": "龙港区",
      "id": 211403 },

    {
      "name": "南票区",
      "id": 211404 },

    {
      "name": "绥中县",
      "id": 211421 },

    {
      "name": "建昌县",
      "id": 211422 },

    {
      "name": "兴城市",
      "id": 211481 }],


    "name": "葫芦岛市",
    "id": 211400 }] },



{
  "id": 220000,
  "name": "吉林省",
  "children": [{
    "children": [{
      "name": "市辖区",
      "id": 220101 },

    {
      "name": "南关区",
      "id": 220102 },

    {
      "name": "宽城区",
      "id": 220103 },

    {
      "name": "朝阳区",
      "id": 220104 },

    {
      "name": "二道区",
      "id": 220105 },

    {
      "name": "绿园区",
      "id": 220106 },

    {
      "name": "双阳区",
      "id": 220112 },

    {
      "name": "农安县",
      "id": 220122 },

    {
      "name": "九台市",
      "id": 220181 },

    {
      "name": "榆树市",
      "id": 220182 },

    {
      "name": "德惠市",
      "id": 220183 }],


    "name": "长春市",
    "id": 220100 },

  {
    "children": [{
      "name": "市辖区",
      "id": 220201 },

    {
      "name": "昌邑区",
      "id": 220202 },

    {
      "name": "龙潭区",
      "id": 220203 },

    {
      "name": "船营区",
      "id": 220204 },

    {
      "name": "丰满区",
      "id": 220211 },

    {
      "name": "永吉县",
      "id": 220221 },

    {
      "name": "蛟河市",
      "id": 220281 },

    {
      "name": "桦甸市",
      "id": 220282 },

    {
      "name": "舒兰市",
      "id": 220283 },

    {
      "name": "磐石市",
      "id": 220284 }],


    "name": "吉林市",
    "id": 220200 },

  {
    "children": [{
      "name": "市辖区",
      "id": 220301 },

    {
      "name": "铁西区",
      "id": 220302 },

    {
      "name": "铁东区",
      "id": 220303 },

    {
      "name": "梨树县",
      "id": 220322 },

    {
      "name": "伊通满族自治县",
      "id": 220323 },

    {
      "name": "公主岭市",
      "id": 220381 },

    {
      "name": "双辽市",
      "id": 220382 }],


    "name": "四平市",
    "id": 220300 },

  {
    "children": [{
      "name": "市辖区",
      "id": 220401 },

    {
      "name": "龙山区",
      "id": 220402 },

    {
      "name": "西安区",
      "id": 220403 },

    {
      "name": "东丰县",
      "id": 220421 },

    {
      "name": "东辽县",
      "id": 220422 }],


    "name": "辽源市",
    "id": 220400 },

  {
    "children": [{
      "name": "市辖区",
      "id": 220501 },

    {
      "name": "东昌区",
      "id": 220502 },

    {
      "name": "二道江区",
      "id": 220503 },

    {
      "name": "通化县",
      "id": 220521 },

    {
      "name": "辉南县",
      "id": 220523 },

    {
      "name": "柳河县",
      "id": 220524 },

    {
      "name": "梅河口市",
      "id": 220581 },

    {
      "name": "集安市",
      "id": 220582 }],


    "name": "通化市",
    "id": 220500 },

  {
    "children": [{
      "name": "市辖区",
      "id": 220601 },

    {
      "name": "浑江区",
      "id": 220602 },

    {
      "name": "江源区",
      "id": 220605 },

    {
      "name": "抚松县",
      "id": 220621 },

    {
      "name": "靖宇县",
      "id": 220622 },

    {
      "name": "长白朝鲜族自治县",
      "id": 220623 },

    {
      "name": "临江市",
      "id": 220681 }],


    "name": "白山市",
    "id": 220600 },

  {
    "children": [{
      "name": "市辖区",
      "id": 220701 },

    {
      "name": "宁江区",
      "id": 220702 },

    {
      "name": "前郭尔罗斯蒙古族自治县",
      "id": 220721 },

    {
      "name": "长岭县",
      "id": 220722 },

    {
      "name": "乾安县",
      "id": 220723 },

    {
      "name": "扶余市",
      "id": 220781 }],


    "name": "松原市",
    "id": 220700 },

  {
    "children": [{
      "name": "市辖区",
      "id": 220801 },

    {
      "name": "洮北区",
      "id": 220802 },

    {
      "name": "镇赉县",
      "id": 220821 },

    {
      "name": "通榆县",
      "id": 220822 },

    {
      "name": "洮南市",
      "id": 220881 },

    {
      "name": "大安市",
      "id": 220882 }],


    "name": "白城市",
    "id": 220800 },

  {
    "children": [{
      "name": "延吉市",
      "id": 222401 },

    {
      "name": "图们市",
      "id": 222402 },

    {
      "name": "敦化市",
      "id": 222403 },

    {
      "name": "珲春市",
      "id": 222404 },

    {
      "name": "龙井市",
      "id": 222405 },

    {
      "name": "和龙市",
      "id": 222406 },

    {
      "name": "汪清县",
      "id": 222424 },

    {
      "name": "安图县",
      "id": 222426 }],


    "name": "延边朝鲜族自治州",
    "id": 222400 }] },



{
  "id": 230000,
  "name": "黑龙江省",
  "children": [{
    "children": [{
      "name": "市辖区",
      "id": 230101 },

    {
      "name": "道里区",
      "id": 230102 },

    {
      "name": "南岗区",
      "id": 230103 },

    {
      "name": "道外区",
      "id": 230104 },

    {
      "name": "平房区",
      "id": 230108 },

    {
      "name": "松北区",
      "id": 230109 },

    {
      "name": "香坊区",
      "id": 230110 },

    {
      "name": "呼兰区",
      "id": 230111 },

    {
      "name": "阿城区",
      "id": 230112 },

    {
      "name": "依兰县",
      "id": 230123 },

    {
      "name": "方正县",
      "id": 230124 },

    {
      "name": "宾县",
      "id": 230125 },

    {
      "name": "巴彦县",
      "id": 230126 },

    {
      "name": "木兰县",
      "id": 230127 },

    {
      "name": "通河县",
      "id": 230128 },

    {
      "name": "延寿县",
      "id": 230129 },

    {
      "name": "双城市",
      "id": 230182 },

    {
      "name": "尚志市",
      "id": 230183 },

    {
      "name": "五常市",
      "id": 230184 }],


    "name": "哈尔滨市",
    "id": 230100 },

  {
    "children": [{
      "name": "市辖区",
      "id": 230201 },

    {
      "name": "龙沙区",
      "id": 230202 },

    {
      "name": "建华区",
      "id": 230203 },

    {
      "name": "铁锋区",
      "id": 230204 },

    {
      "name": "昂昂溪区",
      "id": 230205 },

    {
      "name": "富拉尔基区",
      "id": 230206 },

    {
      "name": "碾子山区",
      "id": 230207 },

    {
      "name": "梅里斯达斡尔族区",
      "id": 230208 },

    {
      "name": "龙江县",
      "id": 230221 },

    {
      "name": "依安县",
      "id": 230223 },

    {
      "name": "泰来县",
      "id": 230224 },

    {
      "name": "甘南县",
      "id": 230225 },

    {
      "name": "富裕县",
      "id": 230227 },

    {
      "name": "克山县",
      "id": 230229 },

    {
      "name": "克东县",
      "id": 230230 },

    {
      "name": "拜泉县",
      "id": 230231 },

    {
      "name": "讷河市",
      "id": 230281 }],


    "name": "齐齐哈尔市",
    "id": 230200 },

  {
    "children": [{
      "name": "市辖区",
      "id": 230301 },

    {
      "name": "鸡冠区",
      "id": 230302 },

    {
      "name": "恒山区",
      "id": 230303 },

    {
      "name": "滴道区",
      "id": 230304 },

    {
      "name": "梨树区",
      "id": 230305 },

    {
      "name": "城子河区",
      "id": 230306 },

    {
      "name": "麻山区",
      "id": 230307 },

    {
      "name": "鸡东县",
      "id": 230321 },

    {
      "name": "虎林市",
      "id": 230381 },

    {
      "name": "密山市",
      "id": 230382 }],


    "name": "鸡西市",
    "id": 230300 },

  {
    "children": [{
      "name": "市辖区",
      "id": 230401 },

    {
      "name": "向阳区",
      "id": 230402 },

    {
      "name": "工农区",
      "id": 230403 },

    {
      "name": "南山区",
      "id": 230404 },

    {
      "name": "兴安区",
      "id": 230405 },

    {
      "name": "东山区",
      "id": 230406 },

    {
      "name": "兴山区",
      "id": 230407 },

    {
      "name": "萝北县",
      "id": 230421 },

    {
      "name": "绥滨县",
      "id": 230422 }],


    "name": "鹤岗市",
    "id": 230400 },

  {
    "children": [{
      "name": "市辖区",
      "id": 230501 },

    {
      "name": "尖山区",
      "id": 230502 },

    {
      "name": "岭东区",
      "id": 230503 },

    {
      "name": "四方台区",
      "id": 230505 },

    {
      "name": "宝山区",
      "id": 230506 },

    {
      "name": "集贤县",
      "id": 230521 },

    {
      "name": "友谊县",
      "id": 230522 },

    {
      "name": "宝清县",
      "id": 230523 },

    {
      "name": "饶河县",
      "id": 230524 }],


    "name": "双鸭山市",
    "id": 230500 },

  {
    "children": [{
      "name": "市辖区",
      "id": 230601 },

    {
      "name": "萨尔图区",
      "id": 230602 },

    {
      "name": "龙凤区",
      "id": 230603 },

    {
      "name": "让胡路区",
      "id": 230604 },

    {
      "name": "红岗区",
      "id": 230605 },

    {
      "name": "大同区",
      "id": 230606 },

    {
      "name": "肇州县",
      "id": 230621 },

    {
      "name": "肇源县",
      "id": 230622 },

    {
      "name": "林甸县",
      "id": 230623 },

    {
      "name": "杜尔伯特蒙古族自治县",
      "id": 230624 }],


    "name": "大庆市",
    "id": 230600 },

  {
    "children": [{
      "name": "市辖区",
      "id": 230701 },

    {
      "name": "伊春区",
      "id": 230702 },

    {
      "name": "南岔区",
      "id": 230703 },

    {
      "name": "友好区",
      "id": 230704 },

    {
      "name": "西林区",
      "id": 230705 },

    {
      "name": "翠峦区",
      "id": 230706 },

    {
      "name": "新青区",
      "id": 230707 },

    {
      "name": "美溪区",
      "id": 230708 },

    {
      "name": "金山屯区",
      "id": 230709 },

    {
      "name": "五营区",
      "id": 230710 },

    {
      "name": "乌马河区",
      "id": 230711 },

    {
      "name": "汤旺河区",
      "id": 230712 },

    {
      "name": "带岭区",
      "id": 230713 },

    {
      "name": "乌伊岭区",
      "id": 230714 },

    {
      "name": "红星区",
      "id": 230715 },

    {
      "name": "上甘岭区",
      "id": 230716 },

    {
      "name": "嘉荫县",
      "id": 230722 },

    {
      "name": "铁力市",
      "id": 230781 }],


    "name": "伊春市",
    "id": 230700 },

  {
    "children": [{
      "name": "市辖区",
      "id": 230801 },

    {
      "name": "向阳区",
      "id": 230803 },

    {
      "name": "前进区",
      "id": 230804 },

    {
      "name": "东风区",
      "id": 230805 },

    {
      "name": "郊区",
      "id": 230811 },

    {
      "name": "桦南县",
      "id": 230822 },

    {
      "name": "桦川县",
      "id": 230826 },

    {
      "name": "汤原县",
      "id": 230828 },

    {
      "name": "抚远县",
      "id": 230833 },

    {
      "name": "同江市",
      "id": 230881 },

    {
      "name": "富锦市",
      "id": 230882 }],


    "name": "佳木斯市",
    "id": 230800 },

  {
    "children": [{
      "name": "市辖区",
      "id": 230901 },

    {
      "name": "新兴区",
      "id": 230902 },

    {
      "name": "桃山区",
      "id": 230903 },

    {
      "name": "茄子河区",
      "id": 230904 },

    {
      "name": "勃利县",
      "id": 230921 }],


    "name": "七台河市",
    "id": 230900 },

  {
    "children": [{
      "name": "市辖区",
      "id": 231001 },

    {
      "name": "东安区",
      "id": 231002 },

    {
      "name": "阳明区",
      "id": 231003 },

    {
      "name": "爱民区",
      "id": 231004 },

    {
      "name": "西安区",
      "id": 231005 },

    {
      "name": "东宁县",
      "id": 231024 },

    {
      "name": "林口县",
      "id": 231025 },

    {
      "name": "绥芬河市",
      "id": 231081 },

    {
      "name": "海林市",
      "id": 231083 },

    {
      "name": "宁安市",
      "id": 231084 },

    {
      "name": "穆棱市",
      "id": 231085 }],


    "name": "牡丹江市",
    "id": 231000 },

  {
    "children": [{
      "name": "市辖区",
      "id": 231101 },

    {
      "name": "爱辉区",
      "id": 231102 },

    {
      "name": "嫩江县",
      "id": 231121 },

    {
      "name": "逊克县",
      "id": 231123 },

    {
      "name": "孙吴县",
      "id": 231124 },

    {
      "name": "北安市",
      "id": 231181 },

    {
      "name": "五大连池市",
      "id": 231182 }],


    "name": "黑河市",
    "id": 231100 },

  {
    "children": [{
      "name": "市辖区",
      "id": 231201 },

    {
      "name": "北林区",
      "id": 231202 },

    {
      "name": "望奎县",
      "id": 231221 },

    {
      "name": "兰西县",
      "id": 231222 },

    {
      "name": "青冈县",
      "id": 231223 },

    {
      "name": "庆安县",
      "id": 231224 },

    {
      "name": "明水县",
      "id": 231225 },

    {
      "name": "绥棱县",
      "id": 231226 },

    {
      "name": "安达市",
      "id": 231281 },

    {
      "name": "肇东市",
      "id": 231282 },

    {
      "name": "海伦市",
      "id": 231283 }],


    "name": "绥化市",
    "id": 231200 },

  {
    "children": [{
      "name": "呼玛县",
      "id": 232721 },

    {
      "name": "塔河县",
      "id": 232722 },

    {
      "name": "漠河县",
      "id": 232723 }],


    "name": "大兴安岭地区",
    "id": 232700 }] },



{
  "id": 310000,
  "name": "上海市",
  "children": [{
    "children": [{
      "name": "黄浦区",
      "id": 310101 },

    {
      "name": "徐汇区",
      "id": 310104 },

    {
      "name": "长宁区",
      "id": 310105 },

    {
      "name": "静安区",
      "id": 310106 },

    {
      "name": "普陀区",
      "id": 310107 },

    {
      "name": "闸北区",
      "id": 310108 },

    {
      "name": "虹口区",
      "id": 310109 },

    {
      "name": "杨浦区",
      "id": 310110 },

    {
      "name": "闵行区",
      "id": 310112 },

    {
      "name": "宝山区",
      "id": 310113 },

    {
      "name": "嘉定区",
      "id": 310114 },

    {
      "name": "浦东新区",
      "id": 310115 },

    {
      "name": "金山区",
      "id": 310116 },

    {
      "name": "松江区",
      "id": 310117 },

    {
      "name": "青浦区",
      "id": 310118 },

    {
      "name": "奉贤区",
      "id": 310120 },

    {
      "name": "崇明县",
      "id": 310230 }],


    "name": "上海市",
    "id": 310000 }] },


{
  "id": 320000,
  "name": "江苏省",
  "children": [{
    "children": [{
      "name": "市辖区",
      "id": 320101 },

    {
      "name": "玄武区",
      "id": 320102 },

    {
      "name": "秦淮区",
      "id": 320104 },

    {
      "name": "建邺区",
      "id": 320105 },

    {
      "name": "鼓楼区",
      "id": 320106 },

    {
      "name": "浦口区",
      "id": 320111 },

    {
      "name": "栖霞区",
      "id": 320113 },

    {
      "name": "雨花台区",
      "id": 320114 },

    {
      "name": "江宁区",
      "id": 320115 },

    {
      "name": "六合区",
      "id": 320116 },

    {
      "name": "溧水区",
      "id": 320117 },

    {
      "name": "高淳区",
      "id": 320118 }],


    "name": "南京市",
    "id": 320100 },

  {
    "children": [{
      "name": "市辖区",
      "id": 320201 },

    {
      "name": "崇安区",
      "id": 320202 },

    {
      "name": "南长区",
      "id": 320203 },

    {
      "name": "北塘区",
      "id": 320204 },

    {
      "name": "锡山区",
      "id": 320205 },

    {
      "name": "惠山区",
      "id": 320206 },

    {
      "name": "滨湖区",
      "id": 320211 },

    {
      "name": "江阴市",
      "id": 320281 },

    {
      "name": "宜兴市",
      "id": 320282 }],


    "name": "无锡市",
    "id": 320200 },

  {
    "children": [{
      "name": "市辖区",
      "id": 320301 },

    {
      "name": "鼓楼区",
      "id": 320302 },

    {
      "name": "云龙区",
      "id": 320303 },

    {
      "name": "贾汪区",
      "id": 320305 },

    {
      "name": "泉山区",
      "id": 320311 },

    {
      "name": "铜山区",
      "id": 320312 },

    {
      "name": "丰县",
      "id": 320321 },

    {
      "name": "沛县",
      "id": 320322 },

    {
      "name": "睢宁县",
      "id": 320324 },

    {
      "name": "新沂市",
      "id": 320381 },

    {
      "name": "邳州市",
      "id": 320382 }],


    "name": "徐州市",
    "id": 320300 },

  {
    "children": [{
      "name": "市辖区",
      "id": 320401 },

    {
      "name": "天宁区",
      "id": 320402 },

    {
      "name": "钟楼区",
      "id": 320404 },

    {
      "name": "戚墅堰区",
      "id": 320405 },

    {
      "name": "新北区",
      "id": 320411 },

    {
      "name": "武进区",
      "id": 320412 },

    {
      "name": "溧阳市",
      "id": 320481 },

    {
      "name": "金坛市",
      "id": 320482 }],


    "name": "常州市",
    "id": 320400 },

  {
    "children": [{
      "name": "市辖区",
      "id": 320501 },

    {
      "name": "虎丘区",
      "id": 320505 },

    {
      "name": "吴中区",
      "id": 320506 },

    {
      "name": "相城区",
      "id": 320507 },

    {
      "name": "姑苏区",
      "id": 320508 },

    {
      "name": "吴江区",
      "id": 320509 },

    {
      "name": "常熟市",
      "id": 320581 },

    {
      "name": "张家港市",
      "id": 320582 },

    {
      "name": "昆山市",
      "id": 320583 },

    {
      "name": "太仓市",
      "id": 320585 }],


    "name": "苏州市",
    "id": 320500 },

  {
    "children": [{
      "name": "市辖区",
      "id": 320601 },

    {
      "name": "崇川区",
      "id": 320602 },

    {
      "name": "港闸区",
      "id": 320611 },

    {
      "name": "通州区",
      "id": 320612 },

    {
      "name": "海安县",
      "id": 320621 },

    {
      "name": "如东县",
      "id": 320623 },

    {
      "name": "启东市",
      "id": 320681 },

    {
      "name": "如皋市",
      "id": 320682 },

    {
      "name": "海门市",
      "id": 320684 }],


    "name": "南通市",
    "id": 320600 },

  {
    "children": [{
      "name": "市辖区",
      "id": 320701 },

    {
      "name": "连云区",
      "id": 320703 },

    {
      "name": "新浦区",
      "id": 320705 },

    {
      "name": "海州区",
      "id": 320706 },

    {
      "name": "赣榆县",
      "id": 320721 },

    {
      "name": "东海县",
      "id": 320722 },

    {
      "name": "灌云县",
      "id": 320723 },

    {
      "name": "灌南县",
      "id": 320724 }],


    "name": "连云港市",
    "id": 320700 },

  {
    "children": [{
      "name": "市辖区",
      "id": 320801 },

    {
      "name": "清河区",
      "id": 320802 },

    {
      "name": "淮安区",
      "id": 320803 },

    {
      "name": "淮阴区",
      "id": 320804 },

    {
      "name": "清浦区",
      "id": 320811 },

    {
      "name": "涟水县",
      "id": 320826 },

    {
      "name": "洪泽县",
      "id": 320829 },

    {
      "name": "盱眙县",
      "id": 320830 },

    {
      "name": "金湖县",
      "id": 320831 }],


    "name": "淮安市",
    "id": 320800 },

  {
    "children": [{
      "name": "市辖区",
      "id": 320901 },

    {
      "name": "亭湖区",
      "id": 320902 },

    {
      "name": "盐都区",
      "id": 320903 },

    {
      "name": "响水县",
      "id": 320921 },

    {
      "name": "滨海县",
      "id": 320922 },

    {
      "name": "阜宁县",
      "id": 320923 },

    {
      "name": "射阳县",
      "id": 320924 },

    {
      "name": "建湖县",
      "id": 320925 },

    {
      "name": "东台市",
      "id": 320981 },

    {
      "name": "大丰市",
      "id": 320982 }],


    "name": "盐城市",
    "id": 320900 },

  {
    "children": [{
      "name": "市辖区",
      "id": 321001 },

    {
      "name": "广陵区",
      "id": 321002 },

    {
      "name": "邗江区",
      "id": 321003 },

    {
      "name": "江都区",
      "id": 321012 },

    {
      "name": "宝应县",
      "id": 321023 },

    {
      "name": "仪征市",
      "id": 321081 },

    {
      "name": "高邮市",
      "id": 321084 }],


    "name": "扬州市",
    "id": 321000 },

  {
    "children": [{
      "name": "市辖区",
      "id": 321101 },

    {
      "name": "京口区",
      "id": 321102 },

    {
      "name": "润州区",
      "id": 321111 },

    {
      "name": "丹徒区",
      "id": 321112 },

    {
      "name": "丹阳市",
      "id": 321181 },

    {
      "name": "扬中市",
      "id": 321182 },

    {
      "name": "句容市",
      "id": 321183 }],


    "name": "镇江市",
    "id": 321100 },

  {
    "children": [{
      "name": "市辖区",
      "id": 321201 },

    {
      "name": "海陵区",
      "id": 321202 },

    {
      "name": "高港区",
      "id": 321203 },

    {
      "name": "姜堰区",
      "id": 321204 },

    {
      "name": "兴化市",
      "id": 321281 },

    {
      "name": "靖江市",
      "id": 321282 },

    {
      "name": "泰兴市",
      "id": 321283 }],


    "name": "泰州市",
    "id": 321200 },

  {
    "children": [{
      "name": "市辖区",
      "id": 321301 },

    {
      "name": "宿城区",
      "id": 321302 },

    {
      "name": "宿豫区",
      "id": 321311 },

    {
      "name": "沭阳县",
      "id": 321322 },

    {
      "name": "泗阳县",
      "id": 321323 },

    {
      "name": "泗洪县",
      "id": 321324 }],


    "name": "宿迁市",
    "id": 321300 }] },



{
  "id": 330000,
  "name": "浙江省",
  "children": [{
    "children": [{
      "name": "市辖区",
      "id": 330101 },

    {
      "name": "上城区",
      "id": 330102 },

    {
      "name": "下城区",
      "id": 330103 },

    {
      "name": "江干区",
      "id": 330104 },

    {
      "name": "拱墅区",
      "id": 330105 },

    {
      "name": "西湖区",
      "id": 330106 },

    {
      "name": "滨江区",
      "id": 330108 },

    {
      "name": "萧山区",
      "id": 330109 },

    {
      "name": "余杭区",
      "id": 330110 },

    {
      "name": "桐庐县",
      "id": 330122 },

    {
      "name": "淳安县",
      "id": 330127 },

    {
      "name": "建德市",
      "id": 330182 },

    {
      "name": "富阳市",
      "id": 330183 },

    {
      "name": "临安市",
      "id": 330185 }],


    "name": "杭州市",
    "id": 330100 },

  {
    "children": [{
      "name": "市辖区",
      "id": 330201 },

    {
      "name": "海曙区",
      "id": 330203 },

    {
      "name": "江东区",
      "id": 330204 },

    {
      "name": "江北区",
      "id": 330205 },

    {
      "name": "北仑区",
      "id": 330206 },

    {
      "name": "镇海区",
      "id": 330211 },

    {
      "name": "鄞州区",
      "id": 330212 },

    {
      "name": "象山县",
      "id": 330225 },

    {
      "name": "宁海县",
      "id": 330226 },

    {
      "name": "余姚市",
      "id": 330281 },

    {
      "name": "慈溪市",
      "id": 330282 },

    {
      "name": "奉化市",
      "id": 330283 }],


    "name": "宁波市",
    "id": 330200 },

  {
    "children": [{
      "name": "市辖区",
      "id": 330301 },

    {
      "name": "鹿城区",
      "id": 330302 },

    {
      "name": "龙湾区",
      "id": 330303 },

    {
      "name": "瓯海区",
      "id": 330304 },

    {
      "name": "洞头县",
      "id": 330322 },

    {
      "name": "永嘉县",
      "id": 330324 },

    {
      "name": "平阳县",
      "id": 330326 },

    {
      "name": "苍南县",
      "id": 330327 },

    {
      "name": "文成县",
      "id": 330328 },

    {
      "name": "泰顺县",
      "id": 330329 },

    {
      "name": "瑞安市",
      "id": 330381 },

    {
      "name": "乐清市",
      "id": 330382 }],


    "name": "温州市",
    "id": 330300 },

  {
    "children": [{
      "name": "市辖区",
      "id": 330401 },

    {
      "name": "南湖区",
      "id": 330402 },

    {
      "name": "秀洲区",
      "id": 330411 },

    {
      "name": "嘉善县",
      "id": 330421 },

    {
      "name": "海盐县",
      "id": 330424 },

    {
      "name": "海宁市",
      "id": 330481 },

    {
      "name": "平湖市",
      "id": 330482 },

    {
      "name": "桐乡市",
      "id": 330483 }],


    "name": "嘉兴市",
    "id": 330400 },

  {
    "children": [{
      "name": "市辖区",
      "id": 330501 },

    {
      "name": "吴兴区",
      "id": 330502 },

    {
      "name": "南浔区",
      "id": 330503 },

    {
      "name": "德清县",
      "id": 330521 },

    {
      "name": "长兴县",
      "id": 330522 },

    {
      "name": "安吉县",
      "id": 330523 }],


    "name": "湖州市",
    "id": 330500 },

  {
    "children": [{
      "name": "市辖区",
      "id": 330601 },

    {
      "name": "越城区",
      "id": 330602 },

    {
      "name": "绍兴县",
      "id": 330621 },

    {
      "name": "新昌县",
      "id": 330624 },

    {
      "name": "诸暨市",
      "id": 330681 },

    {
      "name": "上虞市",
      "id": 330682 },

    {
      "name": "嵊州市",
      "id": 330683 }],


    "name": "绍兴市",
    "id": 330600 },

  {
    "children": [{
      "name": "市辖区",
      "id": 330701 },

    {
      "name": "婺城区",
      "id": 330702 },

    {
      "name": "金东区",
      "id": 330703 },

    {
      "name": "武义县",
      "id": 330723 },

    {
      "name": "浦江县",
      "id": 330726 },

    {
      "name": "磐安县",
      "id": 330727 },

    {
      "name": "兰溪市",
      "id": 330781 },

    {
      "name": "义乌市",
      "id": 330782 },

    {
      "name": "东阳市",
      "id": 330783 },

    {
      "name": "永康市",
      "id": 330784 }],


    "name": "金华市",
    "id": 330700 },

  {
    "children": [{
      "name": "市辖区",
      "id": 330801 },

    {
      "name": "柯城区",
      "id": 330802 },

    {
      "name": "衢江区",
      "id": 330803 },

    {
      "name": "常山县",
      "id": 330822 },

    {
      "name": "开化县",
      "id": 330824 },

    {
      "name": "龙游县",
      "id": 330825 },

    {
      "name": "江山市",
      "id": 330881 }],


    "name": "衢州市",
    "id": 330800 },

  {
    "children": [{
      "name": "市辖区",
      "id": 330901 },

    {
      "name": "定海区",
      "id": 330902 },

    {
      "name": "普陀区",
      "id": 330903 },

    {
      "name": "岱山县",
      "id": 330921 },

    {
      "name": "嵊泗县",
      "id": 330922 }],


    "name": "舟山市",
    "id": 330900 },

  {
    "children": [{
      "name": "市辖区",
      "id": 331001 },

    {
      "name": "椒江区",
      "id": 331002 },

    {
      "name": "黄岩区",
      "id": 331003 },

    {
      "name": "路桥区",
      "id": 331004 },

    {
      "name": "玉环县",
      "id": 331021 },

    {
      "name": "三门县",
      "id": 331022 },

    {
      "name": "天台县",
      "id": 331023 },

    {
      "name": "仙居县",
      "id": 331024 },

    {
      "name": "温岭市",
      "id": 331081 },

    {
      "name": "临海市",
      "id": 331082 }],


    "name": "台州市",
    "id": 331000 },

  {
    "children": [{
      "name": "市辖区",
      "id": 331101 },

    {
      "name": "莲都区",
      "id": 331102 },

    {
      "name": "青田县",
      "id": 331121 },

    {
      "name": "缙云县",
      "id": 331122 },

    {
      "name": "遂昌县",
      "id": 331123 },

    {
      "name": "松阳县",
      "id": 331124 },

    {
      "name": "云和县",
      "id": 331125 },

    {
      "name": "庆元县",
      "id": 331126 },

    {
      "name": "景宁畲族自治县",
      "id": 331127 },

    {
      "name": "龙泉市",
      "id": 331181 }],


    "name": "丽水市",
    "id": 331100 }] },



{
  "id": 340000,
  "name": "安徽省",
  "children": [{
    "children": [{
      "name": "市辖区",
      "id": 340101 },

    {
      "name": "瑶海区",
      "id": 340102 },

    {
      "name": "庐阳区",
      "id": 340103 },

    {
      "name": "蜀山区",
      "id": 340104 },

    {
      "name": "包河区",
      "id": 340111 },

    {
      "name": "长丰县",
      "id": 340121 },

    {
      "name": "肥东县",
      "id": 340122 },

    {
      "name": "肥西县",
      "id": 340123 },

    {
      "name": "庐江县",
      "id": 340124 },

    {
      "name": "巢湖市",
      "id": 340181 }],


    "name": "合肥市",
    "id": 340100 },

  {
    "children": [{
      "name": "市辖区",
      "id": 340201 },

    {
      "name": "镜湖区",
      "id": 340202 },

    {
      "name": "弋江区",
      "id": 340203 },

    {
      "name": "鸠江区",
      "id": 340207 },

    {
      "name": "三山区",
      "id": 340208 },

    {
      "name": "芜湖县",
      "id": 340221 },

    {
      "name": "繁昌县",
      "id": 340222 },

    {
      "name": "南陵县",
      "id": 340223 },

    {
      "name": "无为县",
      "id": 340225 }],


    "name": "芜湖市",
    "id": 340200 },

  {
    "children": [{
      "name": "市辖区",
      "id": 340301 },

    {
      "name": "龙子湖区",
      "id": 340302 },

    {
      "name": "蚌山区",
      "id": 340303 },

    {
      "name": "禹会区",
      "id": 340304 },

    {
      "name": "淮上区",
      "id": 340311 },

    {
      "name": "怀远县",
      "id": 340321 },

    {
      "name": "五河县",
      "id": 340322 },

    {
      "name": "固镇县",
      "id": 340323 }],


    "name": "蚌埠市",
    "id": 340300 },

  {
    "children": [{
      "name": "市辖区",
      "id": 340401 },

    {
      "name": "大通区",
      "id": 340402 },

    {
      "name": "田家庵区",
      "id": 340403 },

    {
      "name": "谢家集区",
      "id": 340404 },

    {
      "name": "八公山区",
      "id": 340405 },

    {
      "name": "潘集区",
      "id": 340406 },

    {
      "name": "凤台县",
      "id": 340421 }],


    "name": "淮南市",
    "id": 340400 },

  {
    "children": [{
      "name": "市辖区",
      "id": 340501 },

    {
      "name": "花山区",
      "id": 340503 },

    {
      "name": "雨山区",
      "id": 340504 },

    {
      "name": "博望区",
      "id": 340506 },

    {
      "name": "当涂县",
      "id": 340521 },

    {
      "name": "含山县",
      "id": 340522 },

    {
      "name": "和县",
      "id": 340523 }],


    "name": "马鞍山市",
    "id": 340500 },

  {
    "children": [{
      "name": "市辖区",
      "id": 340601 },

    {
      "name": "杜集区",
      "id": 340602 },

    {
      "name": "相山区",
      "id": 340603 },

    {
      "name": "烈山区",
      "id": 340604 },

    {
      "name": "濉溪县",
      "id": 340621 }],


    "name": "淮北市",
    "id": 340600 },

  {
    "children": [{
      "name": "市辖区",
      "id": 340701 },

    {
      "name": "铜官山区",
      "id": 340702 },

    {
      "name": "狮子山区",
      "id": 340703 },

    {
      "name": "郊区",
      "id": 340711 },

    {
      "name": "铜陵县",
      "id": 340721 }],


    "name": "铜陵市",
    "id": 340700 },

  {
    "children": [{
      "name": "市辖区",
      "id": 340801 },

    {
      "name": "迎江区",
      "id": 340802 },

    {
      "name": "大观区",
      "id": 340803 },

    {
      "name": "宜秀区",
      "id": 340811 },

    {
      "name": "怀宁县",
      "id": 340822 },

    {
      "name": "枞阳县",
      "id": 340823 },

    {
      "name": "潜山县",
      "id": 340824 },

    {
      "name": "太湖县",
      "id": 340825 },

    {
      "name": "宿松县",
      "id": 340826 },

    {
      "name": "望江县",
      "id": 340827 },

    {
      "name": "岳西县",
      "id": 340828 },

    {
      "name": "桐城市",
      "id": 340881 }],


    "name": "安庆市",
    "id": 340800 },

  {
    "children": [{
      "name": "市辖区",
      "id": 341001 },

    {
      "name": "屯溪区",
      "id": 341002 },

    {
      "name": "黄山区",
      "id": 341003 },

    {
      "name": "徽州区",
      "id": 341004 },

    {
      "name": "歙县",
      "id": 341021 },

    {
      "name": "休宁县",
      "id": 341022 },

    {
      "name": "黟县",
      "id": 341023 },

    {
      "name": "祁门县",
      "id": 341024 }],


    "name": "黄山市",
    "id": 341000 },

  {
    "children": [{
      "name": "市辖区",
      "id": 341101 },

    {
      "name": "琅琊区",
      "id": 341102 },

    {
      "name": "南谯区",
      "id": 341103 },

    {
      "name": "来安县",
      "id": 341122 },

    {
      "name": "全椒县",
      "id": 341124 },

    {
      "name": "定远县",
      "id": 341125 },

    {
      "name": "凤阳县",
      "id": 341126 },

    {
      "name": "天长市",
      "id": 341181 },

    {
      "name": "明光市",
      "id": 341182 }],


    "name": "滁州市",
    "id": 341100 },

  {
    "children": [{
      "name": "市辖区",
      "id": 341201 },

    {
      "name": "颍州区",
      "id": 341202 },

    {
      "name": "颍东区",
      "id": 341203 },

    {
      "name": "颍泉区",
      "id": 341204 },

    {
      "name": "临泉县",
      "id": 341221 },

    {
      "name": "太和县",
      "id": 341222 },

    {
      "name": "阜南县",
      "id": 341225 },

    {
      "name": "颍上县",
      "id": 341226 },

    {
      "name": "界首市",
      "id": 341282 }],


    "name": "阜阳市",
    "id": 341200 },

  {
    "children": [{
      "name": "市辖区",
      "id": 341301 },

    {
      "name": "埇桥区",
      "id": 341302 },

    {
      "name": "砀山县",
      "id": 341321 },

    {
      "name": "萧县",
      "id": 341322 },

    {
      "name": "灵璧县",
      "id": 341323 },

    {
      "name": "泗县",
      "id": 341324 }],


    "name": "宿州市",
    "id": 341300 },

  {
    "children": [{
      "name": "市辖区",
      "id": 341501 },

    {
      "name": "金安区",
      "id": 341502 },

    {
      "name": "裕安区",
      "id": 341503 },

    {
      "name": "寿县",
      "id": 341521 },

    {
      "name": "霍邱县",
      "id": 341522 },

    {
      "name": "舒城县",
      "id": 341523 },

    {
      "name": "金寨县",
      "id": 341524 },

    {
      "name": "霍山县",
      "id": 341525 }],


    "name": "六安市",
    "id": 341500 },

  {
    "children": [{
      "name": "市辖区",
      "id": 341601 },

    {
      "name": "谯城区",
      "id": 341602 },

    {
      "name": "涡阳县",
      "id": 341621 },

    {
      "name": "蒙城县",
      "id": 341622 },

    {
      "name": "利辛县",
      "id": 341623 }],


    "name": "亳州市",
    "id": 341600 },

  {
    "children": [{
      "name": "市辖区",
      "id": 341701 },

    {
      "name": "贵池区",
      "id": 341702 },

    {
      "name": "东至县",
      "id": 341721 },

    {
      "name": "石台县",
      "id": 341722 },

    {
      "name": "青阳县",
      "id": 341723 }],


    "name": "池州市",
    "id": 341700 },

  {
    "children": [{
      "name": "市辖区",
      "id": 341801 },

    {
      "name": "宣州区",
      "id": 341802 },

    {
      "name": "郎溪县",
      "id": 341821 },

    {
      "name": "广德县",
      "id": 341822 },

    {
      "name": "泾县",
      "id": 341823 },

    {
      "name": "绩溪县",
      "id": 341824 },

    {
      "name": "旌德县",
      "id": 341825 },

    {
      "name": "宁国市",
      "id": 341881 }],


    "name": "宣城市",
    "id": 341800 }] },



{
  "id": 350000,
  "name": "福建省",
  "children": [{
    "children": [{
      "name": "市辖区",
      "id": 350101 },

    {
      "name": "鼓楼区",
      "id": 350102 },

    {
      "name": "台江区",
      "id": 350103 },

    {
      "name": "仓山区",
      "id": 350104 },

    {
      "name": "马尾区",
      "id": 350105 },

    {
      "name": "晋安区",
      "id": 350111 },

    {
      "name": "闽侯县",
      "id": 350121 },

    {
      "name": "连江县",
      "id": 350122 },

    {
      "name": "罗源县",
      "id": 350123 },

    {
      "name": "闽清县",
      "id": 350124 },

    {
      "name": "永泰县",
      "id": 350125 },

    {
      "name": "平潭县",
      "id": 350128 },

    {
      "name": "福清市",
      "id": 350181 },

    {
      "name": "长乐市",
      "id": 350182 }],


    "name": "福州市",
    "id": 350100 },

  {
    "children": [{
      "name": "市辖区",
      "id": 350201 },

    {
      "name": "思明区",
      "id": 350203 },

    {
      "name": "海沧区",
      "id": 350205 },

    {
      "name": "湖里区",
      "id": 350206 },

    {
      "name": "集美区",
      "id": 350211 },

    {
      "name": "同安区",
      "id": 350212 },

    {
      "name": "翔安区",
      "id": 350213 }],


    "name": "厦门市",
    "id": 350200 },

  {
    "children": [{
      "name": "市辖区",
      "id": 350301 },

    {
      "name": "城厢区",
      "id": 350302 },

    {
      "name": "涵江区",
      "id": 350303 },

    {
      "name": "荔城区",
      "id": 350304 },

    {
      "name": "秀屿区",
      "id": 350305 },

    {
      "name": "仙游县",
      "id": 350322 }],


    "name": "莆田市",
    "id": 350300 },

  {
    "children": [{
      "name": "市辖区",
      "id": 350401 },

    {
      "name": "梅列区",
      "id": 350402 },

    {
      "name": "三元区",
      "id": 350403 },

    {
      "name": "明溪县",
      "id": 350421 },

    {
      "name": "清流县",
      "id": 350423 },

    {
      "name": "宁化县",
      "id": 350424 },

    {
      "name": "大田县",
      "id": 350425 },

    {
      "name": "尤溪县",
      "id": 350426 },

    {
      "name": "沙县",
      "id": 350427 },

    {
      "name": "将乐县",
      "id": 350428 },

    {
      "name": "泰宁县",
      "id": 350429 },

    {
      "name": "建宁县",
      "id": 350430 },

    {
      "name": "永安市",
      "id": 350481 }],


    "name": "三明市",
    "id": 350400 },

  {
    "children": [{
      "name": "市辖区",
      "id": 350501 },

    {
      "name": "鲤城区",
      "id": 350502 },

    {
      "name": "丰泽区",
      "id": 350503 },

    {
      "name": "洛江区",
      "id": 350504 },

    {
      "name": "泉港区",
      "id": 350505 },

    {
      "name": "惠安县",
      "id": 350521 },

    {
      "name": "安溪县",
      "id": 350524 },

    {
      "name": "永春县",
      "id": 350525 },

    {
      "name": "德化县",
      "id": 350526 },

    {
      "name": "金门县",
      "id": 350527 },

    {
      "name": "石狮市",
      "id": 350581 },

    {
      "name": "晋江市",
      "id": 350582 },

    {
      "name": "南安市",
      "id": 350583 }],


    "name": "泉州市",
    "id": 350500 },

  {
    "children": [{
      "name": "市辖区",
      "id": 350601 },

    {
      "name": "芗城区",
      "id": 350602 },

    {
      "name": "龙文区",
      "id": 350603 },

    {
      "name": "云霄县",
      "id": 350622 },

    {
      "name": "漳浦县",
      "id": 350623 },

    {
      "name": "诏安县",
      "id": 350624 },

    {
      "name": "长泰县",
      "id": 350625 },

    {
      "name": "东山县",
      "id": 350626 },

    {
      "name": "南靖县",
      "id": 350627 },

    {
      "name": "平和县",
      "id": 350628 },

    {
      "name": "华安县",
      "id": 350629 },

    {
      "name": "龙海市",
      "id": 350681 }],


    "name": "漳州市",
    "id": 350600 },

  {
    "children": [{
      "name": "市辖区",
      "id": 350701 },

    {
      "name": "延平区",
      "id": 350702 },

    {
      "name": "顺昌县",
      "id": 350721 },

    {
      "name": "浦城县",
      "id": 350722 },

    {
      "name": "光泽县",
      "id": 350723 },

    {
      "name": "松溪县",
      "id": 350724 },

    {
      "name": "政和县",
      "id": 350725 },

    {
      "name": "邵武市",
      "id": 350781 },

    {
      "name": "武夷山市",
      "id": 350782 },

    {
      "name": "建瓯市",
      "id": 350783 },

    {
      "name": "建阳市",
      "id": 350784 }],


    "name": "南平市",
    "id": 350700 },

  {
    "children": [{
      "name": "市辖区",
      "id": 350801 },

    {
      "name": "新罗区",
      "id": 350802 },

    {
      "name": "长汀县",
      "id": 350821 },

    {
      "name": "永定县",
      "id": 350822 },

    {
      "name": "上杭县",
      "id": 350823 },

    {
      "name": "武平县",
      "id": 350824 },

    {
      "name": "连城县",
      "id": 350825 },

    {
      "name": "漳平市",
      "id": 350881 }],


    "name": "龙岩市",
    "id": 350800 },

  {
    "children": [{
      "name": "市辖区",
      "id": 350901 },

    {
      "name": "蕉城区",
      "id": 350902 },

    {
      "name": "霞浦县",
      "id": 350921 },

    {
      "name": "古田县",
      "id": 350922 },

    {
      "name": "屏南县",
      "id": 350923 },

    {
      "name": "寿宁县",
      "id": 350924 },

    {
      "name": "周宁县",
      "id": 350925 },

    {
      "name": "柘荣县",
      "id": 350926 },

    {
      "name": "福安市",
      "id": 350981 },

    {
      "name": "福鼎市",
      "id": 350982 }],


    "name": "宁德市",
    "id": 350900 }] },



{
  "id": 360000,
  "name": "江西省",
  "children": [{
    "children": [{
      "name": "市辖区",
      "id": 360101 },

    {
      "name": "东湖区",
      "id": 360102 },

    {
      "name": "西湖区",
      "id": 360103 },

    {
      "name": "青云谱区",
      "id": 360104 },

    {
      "name": "湾里区",
      "id": 360105 },

    {
      "name": "青山湖区",
      "id": 360111 },

    {
      "name": "南昌县",
      "id": 360121 },

    {
      "name": "新建县",
      "id": 360122 },

    {
      "name": "安义县",
      "id": 360123 },

    {
      "name": "进贤县",
      "id": 360124 }],


    "name": "南昌市",
    "id": 360100 },

  {
    "children": [{
      "name": "市辖区",
      "id": 360201 },

    {
      "name": "昌江区",
      "id": 360202 },

    {
      "name": "珠山区",
      "id": 360203 },

    {
      "name": "浮梁县",
      "id": 360222 },

    {
      "name": "乐平市",
      "id": 360281 }],


    "name": "景德镇市",
    "id": 360200 },

  {
    "children": [{
      "name": "市辖区",
      "id": 360301 },

    {
      "name": "安源区",
      "id": 360302 },

    {
      "name": "湘东区",
      "id": 360313 },

    {
      "name": "莲花县",
      "id": 360321 },

    {
      "name": "上栗县",
      "id": 360322 },

    {
      "name": "芦溪县",
      "id": 360323 }],


    "name": "萍乡市",
    "id": 360300 },

  {
    "children": [{
      "name": "市辖区",
      "id": 360401 },

    {
      "name": "庐山区",
      "id": 360402 },

    {
      "name": "浔阳区",
      "id": 360403 },

    {
      "name": "九江县",
      "id": 360421 },

    {
      "name": "武宁县",
      "id": 360423 },

    {
      "name": "修水县",
      "id": 360424 },

    {
      "name": "永修县",
      "id": 360425 },

    {
      "name": "德安县",
      "id": 360426 },

    {
      "name": "星子县",
      "id": 360427 },

    {
      "name": "都昌县",
      "id": 360428 },

    {
      "name": "湖口县",
      "id": 360429 },

    {
      "name": "彭泽县",
      "id": 360430 },

    {
      "name": "瑞昌市",
      "id": 360481 },

    {
      "name": "共青城市",
      "id": 360482 }],


    "name": "九江市",
    "id": 360400 },

  {
    "children": [{
      "name": "市辖区",
      "id": 360501 },

    {
      "name": "渝水区",
      "id": 360502 },

    {
      "name": "分宜县",
      "id": 360521 }],


    "name": "新余市",
    "id": 360500 },

  {
    "children": [{
      "name": "市辖区",
      "id": 360601 },

    {
      "name": "月湖区",
      "id": 360602 },

    {
      "name": "余江县",
      "id": 360622 },

    {
      "name": "贵溪市",
      "id": 360681 }],


    "name": "鹰潭市",
    "id": 360600 },

  {
    "children": [{
      "name": "市辖区",
      "id": 360701 },

    {
      "name": "章贡区",
      "id": 360702 },

    {
      "name": "赣县",
      "id": 360721 },

    {
      "name": "信丰县",
      "id": 360722 },

    {
      "name": "大余县",
      "id": 360723 },

    {
      "name": "上犹县",
      "id": 360724 },

    {
      "name": "崇义县",
      "id": 360725 },

    {
      "name": "安远县",
      "id": 360726 },

    {
      "name": "龙南县",
      "id": 360727 },

    {
      "name": "定南县",
      "id": 360728 },

    {
      "name": "全南县",
      "id": 360729 },

    {
      "name": "宁都县",
      "id": 360730 },

    {
      "name": "于都县",
      "id": 360731 },

    {
      "name": "兴国县",
      "id": 360732 },

    {
      "name": "会昌县",
      "id": 360733 },

    {
      "name": "寻乌县",
      "id": 360734 },

    {
      "name": "石城县",
      "id": 360735 },

    {
      "name": "瑞金市",
      "id": 360781 },

    {
      "name": "南康市",
      "id": 360782 }],


    "name": "赣州市",
    "id": 360700 },

  {
    "children": [{
      "name": "市辖区",
      "id": 360801 },

    {
      "name": "吉州区",
      "id": 360802 },

    {
      "name": "青原区",
      "id": 360803 },

    {
      "name": "吉安县",
      "id": 360821 },

    {
      "name": "吉水县",
      "id": 360822 },

    {
      "name": "峡江县",
      "id": 360823 },

    {
      "name": "新干县",
      "id": 360824 },

    {
      "name": "永丰县",
      "id": 360825 },

    {
      "name": "泰和县",
      "id": 360826 },

    {
      "name": "遂川县",
      "id": 360827 },

    {
      "name": "万安县",
      "id": 360828 },

    {
      "name": "安福县",
      "id": 360829 },

    {
      "name": "永新县",
      "id": 360830 },

    {
      "name": "井冈山市",
      "id": 360881 }],


    "name": "吉安市",
    "id": 360800 },

  {
    "children": [{
      "name": "市辖区",
      "id": 360901 },

    {
      "name": "袁州区",
      "id": 360902 },

    {
      "name": "奉新县",
      "id": 360921 },

    {
      "name": "万载县",
      "id": 360922 },

    {
      "name": "上高县",
      "id": 360923 },

    {
      "name": "宜丰县",
      "id": 360924 },

    {
      "name": "靖安县",
      "id": 360925 },

    {
      "name": "铜鼓县",
      "id": 360926 },

    {
      "name": "丰城市",
      "id": 360981 },

    {
      "name": "樟树市",
      "id": 360982 },

    {
      "name": "高安市",
      "id": 360983 }],


    "name": "宜春市",
    "id": 360900 },

  {
    "children": [{
      "name": "市辖区",
      "id": 361001 },

    {
      "name": "临川区",
      "id": 361002 },

    {
      "name": "南城县",
      "id": 361021 },

    {
      "name": "黎川县",
      "id": 361022 },

    {
      "name": "南丰县",
      "id": 361023 },

    {
      "name": "崇仁县",
      "id": 361024 },

    {
      "name": "乐安县",
      "id": 361025 },

    {
      "name": "宜黄县",
      "id": 361026 },

    {
      "name": "金溪县",
      "id": 361027 },

    {
      "name": "资溪县",
      "id": 361028 },

    {
      "name": "东乡县",
      "id": 361029 },

    {
      "name": "广昌县",
      "id": 361030 }],


    "name": "抚州市",
    "id": 361000 },

  {
    "children": [{
      "name": "市辖区",
      "id": 361101 },

    {
      "name": "信州区",
      "id": 361102 },

    {
      "name": "上饶县",
      "id": 361121 },

    {
      "name": "广丰县",
      "id": 361122 },

    {
      "name": "玉山县",
      "id": 361123 },

    {
      "name": "铅山县",
      "id": 361124 },

    {
      "name": "横峰县",
      "id": 361125 },

    {
      "name": "弋阳县",
      "id": 361126 },

    {
      "name": "余干县",
      "id": 361127 },

    {
      "name": "鄱阳县",
      "id": 361128 },

    {
      "name": "万年县",
      "id": 361129 },

    {
      "name": "婺源县",
      "id": 361130 },

    {
      "name": "德兴市",
      "id": 361181 }],


    "name": "上饶市",
    "id": 361100 }] },



{
  "id": 370000,
  "name": "山东省",
  "children": [{
    "children": [{
      "name": "市辖区",
      "id": 370101 },

    {
      "name": "历下区",
      "id": 370102 },

    {
      "name": "市中区",
      "id": 370103 },

    {
      "name": "槐荫区",
      "id": 370104 },

    {
      "name": "天桥区",
      "id": 370105 },

    {
      "name": "历城区",
      "id": 370112 },

    {
      "name": "长清区",
      "id": 370113 },

    {
      "name": "平阴县",
      "id": 370124 },

    {
      "name": "济阳县",
      "id": 370125 },

    {
      "name": "商河县",
      "id": 370126 },

    {
      "name": "章丘市",
      "id": 370181 }],


    "name": "济南市",
    "id": 370100 },

  {
    "children": [{
      "name": "市辖区",
      "id": 370201 },

    {
      "name": "市南区",
      "id": 370202 },

    {
      "name": "市北区",
      "id": 370203 },

    {
      "name": "黄岛区",
      "id": 370211 },

    {
      "name": "崂山区",
      "id": 370212 },

    {
      "name": "李沧区",
      "id": 370213 },

    {
      "name": "城阳区",
      "id": 370214 },

    {
      "name": "胶州市",
      "id": 370281 },

    {
      "name": "即墨市",
      "id": 370282 },

    {
      "name": "平度市",
      "id": 370283 },

    {
      "name": "莱西市",
      "id": 370285 }],


    "name": "青岛市",
    "id": 370200 },

  {
    "children": [{
      "name": "市辖区",
      "id": 370301 },

    {
      "name": "淄川区",
      "id": 370302 },

    {
      "name": "张店区",
      "id": 370303 },

    {
      "name": "博山区",
      "id": 370304 },

    {
      "name": "临淄区",
      "id": 370305 },

    {
      "name": "周村区",
      "id": 370306 },

    {
      "name": "桓台县",
      "id": 370321 },

    {
      "name": "高青县",
      "id": 370322 },

    {
      "name": "沂源县",
      "id": 370323 }],


    "name": "淄博市",
    "id": 370300 },

  {
    "children": [{
      "name": "市辖区",
      "id": 370401 },

    {
      "name": "市中区",
      "id": 370402 },

    {
      "name": "薛城区",
      "id": 370403 },

    {
      "name": "峄城区",
      "id": 370404 },

    {
      "name": "台儿庄区",
      "id": 370405 },

    {
      "name": "山亭区",
      "id": 370406 },

    {
      "name": "滕州市",
      "id": 370481 }],


    "name": "枣庄市",
    "id": 370400 },

  {
    "children": [{
      "name": "市辖区",
      "id": 370501 },

    {
      "name": "东营区",
      "id": 370502 },

    {
      "name": "河口区",
      "id": 370503 },

    {
      "name": "垦利县",
      "id": 370521 },

    {
      "name": "利津县",
      "id": 370522 },

    {
      "name": "广饶县",
      "id": 370523 }],


    "name": "东营市",
    "id": 370500 },

  {
    "children": [{
      "name": "市辖区",
      "id": 370601 },

    {
      "name": "芝罘区",
      "id": 370602 },

    {
      "name": "福山区",
      "id": 370611 },

    {
      "name": "牟平区",
      "id": 370612 },

    {
      "name": "莱山区",
      "id": 370613 },

    {
      "name": "长岛县",
      "id": 370634 },

    {
      "name": "龙口市",
      "id": 370681 },

    {
      "name": "莱阳市",
      "id": 370682 },

    {
      "name": "莱州市",
      "id": 370683 },

    {
      "name": "蓬莱市",
      "id": 370684 },

    {
      "name": "招远市",
      "id": 370685 },

    {
      "name": "栖霞市",
      "id": 370686 },

    {
      "name": "海阳市",
      "id": 370687 }],


    "name": "烟台市",
    "id": 370600 },

  {
    "children": [{
      "name": "市辖区",
      "id": 370701 },

    {
      "name": "潍城区",
      "id": 370702 },

    {
      "name": "寒亭区",
      "id": 370703 },

    {
      "name": "坊子区",
      "id": 370704 },

    {
      "name": "奎文区",
      "id": 370705 },

    {
      "name": "临朐县",
      "id": 370724 },

    {
      "name": "昌乐县",
      "id": 370725 },

    {
      "name": "青州市",
      "id": 370781 },

    {
      "name": "诸城市",
      "id": 370782 },

    {
      "name": "寿光市",
      "id": 370783 },

    {
      "name": "安丘市",
      "id": 370784 },

    {
      "name": "高密市",
      "id": 370785 },

    {
      "name": "昌邑市",
      "id": 370786 }],


    "name": "潍坊市",
    "id": 370700 },

  {
    "children": [{
      "name": "市辖区",
      "id": 370801 },

    {
      "name": "市中区",
      "id": 370802 },

    {
      "name": "任城区",
      "id": 370811 },

    {
      "name": "微山县",
      "id": 370826 },

    {
      "name": "鱼台县",
      "id": 370827 },

    {
      "name": "金乡县",
      "id": 370828 },

    {
      "name": "嘉祥县",
      "id": 370829 },

    {
      "name": "汶上县",
      "id": 370830 },

    {
      "name": "泗水县",
      "id": 370831 },

    {
      "name": "梁山县",
      "id": 370832 },

    {
      "name": "曲阜市",
      "id": 370881 },

    {
      "name": "兖州市",
      "id": 370882 },

    {
      "name": "邹城市",
      "id": 370883 }],


    "name": "济宁市",
    "id": 370800 },

  {
    "children": [{
      "name": "市辖区",
      "id": 370901 },

    {
      "name": "泰山区",
      "id": 370902 },

    {
      "name": "岱岳区",
      "id": 370911 },

    {
      "name": "宁阳县",
      "id": 370921 },

    {
      "name": "东平县",
      "id": 370923 },

    {
      "name": "新泰市",
      "id": 370982 },

    {
      "name": "肥城市",
      "id": 370983 }],


    "name": "泰安市",
    "id": 370900 },

  {
    "children": [{
      "name": "市辖区",
      "id": 371001 },

    {
      "name": "环翠区",
      "id": 371002 },

    {
      "name": "文登市",
      "id": 371081 },

    {
      "name": "荣成市",
      "id": 371082 },

    {
      "name": "乳山市",
      "id": 371083 }],


    "name": "威海市",
    "id": 371000 },

  {
    "children": [{
      "name": "市辖区",
      "id": 371101 },

    {
      "name": "东港区",
      "id": 371102 },

    {
      "name": "岚山区",
      "id": 371103 },

    {
      "name": "五莲县",
      "id": 371121 },

    {
      "name": "莒县",
      "id": 371122 }],


    "name": "日照市",
    "id": 371100 },

  {
    "children": [{
      "name": "市辖区",
      "id": 371201 },

    {
      "name": "莱城区",
      "id": 371202 },

    {
      "name": "钢城区",
      "id": 371203 }],


    "name": "莱芜市",
    "id": 371200 },

  {
    "children": [{
      "name": "市辖区",
      "id": 371301 },

    {
      "name": "兰山区",
      "id": 371302 },

    {
      "name": "罗庄区",
      "id": 371311 },

    {
      "name": "河东区",
      "id": 371312 },

    {
      "name": "沂南县",
      "id": 371321 },

    {
      "name": "郯城县",
      "id": 371322 },

    {
      "name": "沂水县",
      "id": 371323 },

    {
      "name": "苍山县",
      "id": 371324 },

    {
      "name": "费县",
      "id": 371325 },

    {
      "name": "平邑县",
      "id": 371326 },

    {
      "name": "莒南县",
      "id": 371327 },

    {
      "name": "蒙阴县",
      "id": 371328 },

    {
      "name": "临沭县",
      "id": 371329 }],


    "name": "临沂市",
    "id": 371300 },

  {
    "children": [{
      "name": "市辖区",
      "id": 371401 },

    {
      "name": "德城区",
      "id": 371402 },

    {
      "name": "陵县",
      "id": 371421 },

    {
      "name": "宁津县",
      "id": 371422 },

    {
      "name": "庆云县",
      "id": 371423 },

    {
      "name": "临邑县",
      "id": 371424 },

    {
      "name": "齐河县",
      "id": 371425 },

    {
      "name": "平原县",
      "id": 371426 },

    {
      "name": "夏津县",
      "id": 371427 },

    {
      "name": "武城县",
      "id": 371428 },

    {
      "name": "乐陵市",
      "id": 371481 },

    {
      "name": "禹城市",
      "id": 371482 }],


    "name": "德州市",
    "id": 371400 },

  {
    "children": [{
      "name": "市辖区",
      "id": 371501 },

    {
      "name": "东昌府区",
      "id": 371502 },

    {
      "name": "阳谷县",
      "id": 371521 },

    {
      "name": "莘县",
      "id": 371522 },

    {
      "name": "茌平县",
      "id": 371523 },

    {
      "name": "东阿县",
      "id": 371524 },

    {
      "name": "冠县",
      "id": 371525 },

    {
      "name": "高唐县",
      "id": 371526 },

    {
      "name": "临清市",
      "id": 371581 }],


    "name": "聊城市",
    "id": 371500 },

  {
    "children": [{
      "name": "市辖区",
      "id": 371601 },

    {
      "name": "滨城区",
      "id": 371602 },

    {
      "name": "惠民县",
      "id": 371621 },

    {
      "name": "阳信县",
      "id": 371622 },

    {
      "name": "无棣县",
      "id": 371623 },

    {
      "name": "沾化县",
      "id": 371624 },

    {
      "name": "博兴县",
      "id": 371625 },

    {
      "name": "邹平县",
      "id": 371626 }],


    "name": "滨州市",
    "id": 371600 },

  {
    "children": [{
      "name": "市辖区",
      "id": 371701 },

    {
      "name": "牡丹区",
      "id": 371702 },

    {
      "name": "曹县",
      "id": 371721 },

    {
      "name": "单县",
      "id": 371722 },

    {
      "name": "成武县",
      "id": 371723 },

    {
      "name": "巨野县",
      "id": 371724 },

    {
      "name": "郓城县",
      "id": 371725 },

    {
      "name": "鄄城县",
      "id": 371726 },

    {
      "name": "定陶县",
      "id": 371727 },

    {
      "name": "东明县",
      "id": 371728 }],


    "name": "菏泽市",
    "id": 371700 }] },



{
  "id": 410000,
  "name": "河南省",
  "children": [{
    "children": [{
      "name": "市辖区",
      "id": 410101 },

    {
      "name": "中原区",
      "id": 410102 },

    {
      "name": "二七区",
      "id": 410103 },

    {
      "name": "管城回族区",
      "id": 410104 },

    {
      "name": "金水区",
      "id": 410105 },

    {
      "name": "上街区",
      "id": 410106 },

    {
      "name": "惠济区",
      "id": 410108 },

    {
      "name": "中牟县",
      "id": 410122 },

    {
      "name": "巩义市",
      "id": 410181 },

    {
      "name": "荥阳市",
      "id": 410182 },

    {
      "name": "新密市",
      "id": 410183 },

    {
      "name": "新郑市",
      "id": 410184 },

    {
      "name": "登封市",
      "id": 410185 }],


    "name": "郑州市",
    "id": 410100 },

  {
    "children": [{
      "name": "市辖区",
      "id": 410201 },

    {
      "name": "龙亭区",
      "id": 410202 },

    {
      "name": "顺河回族区",
      "id": 410203 },

    {
      "name": "鼓楼区",
      "id": 410204 },

    {
      "name": "禹王台区",
      "id": 410205 },

    {
      "name": "金明区",
      "id": 410211 },

    {
      "name": "杞县",
      "id": 410221 },

    {
      "name": "通许县",
      "id": 410222 },

    {
      "name": "尉氏县",
      "id": 410223 },

    {
      "name": "开封县",
      "id": 410224 },

    {
      "name": "兰考县",
      "id": 410225 }],


    "name": "开封市",
    "id": 410200 },

  {
    "children": [{
      "name": "市辖区",
      "id": 410301 },

    {
      "name": "老城区",
      "id": 410302 },

    {
      "name": "西工区",
      "id": 410303 },

    {
      "name": "瀍河回族区",
      "id": 410304 },

    {
      "name": "涧西区",
      "id": 410305 },

    {
      "name": "吉利区",
      "id": 410306 },

    {
      "name": "洛龙区",
      "id": 410311 },

    {
      "name": "孟津县",
      "id": 410322 },

    {
      "name": "新安县",
      "id": 410323 },

    {
      "name": "栾川县",
      "id": 410324 },

    {
      "name": "嵩县",
      "id": 410325 },

    {
      "name": "汝阳县",
      "id": 410326 },

    {
      "name": "宜阳县",
      "id": 410327 },

    {
      "name": "洛宁县",
      "id": 410328 },

    {
      "name": "伊川县",
      "id": 410329 },

    {
      "name": "偃师市",
      "id": 410381 }],


    "name": "洛阳市",
    "id": 410300 },

  {
    "children": [{
      "name": "市辖区",
      "id": 410401 },

    {
      "name": "新华区",
      "id": 410402 },

    {
      "name": "卫东区",
      "id": 410403 },

    {
      "name": "石龙区",
      "id": 410404 },

    {
      "name": "湛河区",
      "id": 410411 },

    {
      "name": "宝丰县",
      "id": 410421 },

    {
      "name": "叶县",
      "id": 410422 },

    {
      "name": "鲁山县",
      "id": 410423 },

    {
      "name": "郏县",
      "id": 410425 },

    {
      "name": "舞钢市",
      "id": 410481 },

    {
      "name": "汝州市",
      "id": 410482 }],


    "name": "平顶山市",
    "id": 410400 },

  {
    "children": [{
      "name": "市辖区",
      "id": 410501 },

    {
      "name": "文峰区",
      "id": 410502 },

    {
      "name": "北关区",
      "id": 410503 },

    {
      "name": "殷都区",
      "id": 410505 },

    {
      "name": "龙安区",
      "id": 410506 },

    {
      "name": "安阳县",
      "id": 410522 },

    {
      "name": "汤阴县",
      "id": 410523 },

    {
      "name": "滑县",
      "id": 410526 },

    {
      "name": "内黄县",
      "id": 410527 },

    {
      "name": "林州市",
      "id": 410581 }],


    "name": "安阳市",
    "id": 410500 },

  {
    "children": [{
      "name": "市辖区",
      "id": 410601 },

    {
      "name": "鹤山区",
      "id": 410602 },

    {
      "name": "山城区",
      "id": 410603 },

    {
      "name": "淇滨区",
      "id": 410611 },

    {
      "name": "浚县",
      "id": 410621 },

    {
      "name": "淇县",
      "id": 410622 }],


    "name": "鹤壁市",
    "id": 410600 },

  {
    "children": [{
      "name": "市辖区",
      "id": 410701 },

    {
      "name": "红旗区",
      "id": 410702 },

    {
      "name": "卫滨区",
      "id": 410703 },

    {
      "name": "凤泉区",
      "id": 410704 },

    {
      "name": "牧野区",
      "id": 410711 },

    {
      "name": "新乡县",
      "id": 410721 },

    {
      "name": "获嘉县",
      "id": 410724 },

    {
      "name": "原阳县",
      "id": 410725 },

    {
      "name": "延津县",
      "id": 410726 },

    {
      "name": "封丘县",
      "id": 410727 },

    {
      "name": "长垣县",
      "id": 410728 },

    {
      "name": "卫辉市",
      "id": 410781 },

    {
      "name": "辉县市",
      "id": 410782 }],


    "name": "新乡市",
    "id": 410700 },

  {
    "children": [{
      "name": "市辖区",
      "id": 410801 },

    {
      "name": "解放区",
      "id": 410802 },

    {
      "name": "中站区",
      "id": 410803 },

    {
      "name": "马村区",
      "id": 410804 },

    {
      "name": "山阳区",
      "id": 410811 },

    {
      "name": "修武县",
      "id": 410821 },

    {
      "name": "博爱县",
      "id": 410822 },

    {
      "name": "武陟县",
      "id": 410823 },

    {
      "name": "温县",
      "id": 410825 },

    {
      "name": "沁阳市",
      "id": 410882 },

    {
      "name": "孟州市",
      "id": 410883 }],


    "name": "焦作市",
    "id": 410800 },

  {
    "children": [{
      "name": "市辖区",
      "id": 410901 },

    {
      "name": "华龙区",
      "id": 410902 },

    {
      "name": "清丰县",
      "id": 410922 },

    {
      "name": "南乐县",
      "id": 410923 },

    {
      "name": "范县",
      "id": 410926 },

    {
      "name": "台前县",
      "id": 410927 },

    {
      "name": "濮阳县",
      "id": 410928 }],


    "name": "濮阳市",
    "id": 410900 },

  {
    "children": [{
      "name": "市辖区",
      "id": 411001 },

    {
      "name": "魏都区",
      "id": 411002 },

    {
      "name": "许昌县",
      "id": 411023 },

    {
      "name": "鄢陵县",
      "id": 411024 },

    {
      "name": "襄城县",
      "id": 411025 },

    {
      "name": "禹州市",
      "id": 411081 },

    {
      "name": "长葛市",
      "id": 411082 }],


    "name": "许昌市",
    "id": 411000 },

  {
    "children": [{
      "name": "市辖区",
      "id": 411101 },

    {
      "name": "源汇区",
      "id": 411102 },

    {
      "name": "郾城区",
      "id": 411103 },

    {
      "name": "召陵区",
      "id": 411104 },

    {
      "name": "舞阳县",
      "id": 411121 },

    {
      "name": "临颍县",
      "id": 411122 }],


    "name": "漯河市",
    "id": 411100 },

  {
    "children": [{
      "name": "市辖区",
      "id": 411201 },

    {
      "name": "湖滨区",
      "id": 411202 },

    {
      "name": "渑池县",
      "id": 411221 },

    {
      "name": "陕县",
      "id": 411222 },

    {
      "name": "卢氏县",
      "id": 411224 },

    {
      "name": "义马市",
      "id": 411281 },

    {
      "name": "灵宝市",
      "id": 411282 }],


    "name": "三门峡市",
    "id": 411200 },

  {
    "children": [{
      "name": "市辖区",
      "id": 411301 },

    {
      "name": "宛城区",
      "id": 411302 },

    {
      "name": "卧龙区",
      "id": 411303 },

    {
      "name": "南召县",
      "id": 411321 },

    {
      "name": "方城县",
      "id": 411322 },

    {
      "name": "西峡县",
      "id": 411323 },

    {
      "name": "镇平县",
      "id": 411324 },

    {
      "name": "内乡县",
      "id": 411325 },

    {
      "name": "淅川县",
      "id": 411326 },

    {
      "name": "社旗县",
      "id": 411327 },

    {
      "name": "唐河县",
      "id": 411328 },

    {
      "name": "新野县",
      "id": 411329 },

    {
      "name": "桐柏县",
      "id": 411330 },

    {
      "name": "邓州市",
      "id": 411381 }],


    "name": "南阳市",
    "id": 411300 },

  {
    "children": [{
      "name": "市辖区",
      "id": 411401 },

    {
      "name": "梁园区",
      "id": 411402 },

    {
      "name": "睢阳区",
      "id": 411403 },

    {
      "name": "民权县",
      "id": 411421 },

    {
      "name": "睢县",
      "id": 411422 },

    {
      "name": "宁陵县",
      "id": 411423 },

    {
      "name": "柘城县",
      "id": 411424 },

    {
      "name": "虞城县",
      "id": 411425 },

    {
      "name": "夏邑县",
      "id": 411426 },

    {
      "name": "永城市",
      "id": 411481 }],


    "name": "商丘市",
    "id": 411400 },

  {
    "children": [{
      "name": "市辖区",
      "id": 411501 },

    {
      "name": "浉河区",
      "id": 411502 },

    {
      "name": "平桥区",
      "id": 411503 },

    {
      "name": "罗山县",
      "id": 411521 },

    {
      "name": "光山县",
      "id": 411522 },

    {
      "name": "新县",
      "id": 411523 },

    {
      "name": "商城县",
      "id": 411524 },

    {
      "name": "固始县",
      "id": 411525 },

    {
      "name": "潢川县",
      "id": 411526 },

    {
      "name": "淮滨县",
      "id": 411527 },

    {
      "name": "息县",
      "id": 411528 }],


    "name": "信阳市",
    "id": 411500 },

  {
    "children": [{
      "name": "市辖区",
      "id": 411601 },

    {
      "name": "川汇区",
      "id": 411602 },

    {
      "name": "扶沟县",
      "id": 411621 },

    {
      "name": "西华县",
      "id": 411622 },

    {
      "name": "商水县",
      "id": 411623 },

    {
      "name": "沈丘县",
      "id": 411624 },

    {
      "name": "郸城县",
      "id": 411625 },

    {
      "name": "淮阳县",
      "id": 411626 },

    {
      "name": "太康县",
      "id": 411627 },

    {
      "name": "鹿邑县",
      "id": 411628 },

    {
      "name": "项城市",
      "id": 411681 }],


    "name": "周口市",
    "id": 411600 },

  {
    "children": [{
      "name": "市辖区",
      "id": 411701 },

    {
      "name": "驿城区",
      "id": 411702 },

    {
      "name": "西平县",
      "id": 411721 },

    {
      "name": "上蔡县",
      "id": 411722 },

    {
      "name": "平舆县",
      "id": 411723 },

    {
      "name": "正阳县",
      "id": 411724 },

    {
      "name": "确山县",
      "id": 411725 },

    {
      "name": "泌阳县",
      "id": 411726 },

    {
      "name": "汝南县",
      "id": 411727 },

    {
      "name": "遂平县",
      "id": 411728 },

    {
      "name": "新蔡县",
      "id": 411729 }],


    "name": "驻马店市",
    "id": 411700 },

  {
    "children": [{
      "name": "济源市",
      "id": 419001 }],

    "name": "省直辖县级行政区划",
    "id": 419000 }] },



{
  "id": 420000,
  "name": "湖北省",
  "children": [{
    "children": [{
      "name": "市辖区",
      "id": 420101 },

    {
      "name": "江岸区",
      "id": 420102 },

    {
      "name": "江汉区",
      "id": 420103 },

    {
      "name": "硚口区",
      "id": 420104 },

    {
      "name": "汉阳区",
      "id": 420105 },

    {
      "name": "武昌区",
      "id": 420106 },

    {
      "name": "青山区",
      "id": 420107 },

    {
      "name": "洪山区",
      "id": 420111 },

    {
      "name": "东西湖区",
      "id": 420112 },

    {
      "name": "汉南区",
      "id": 420113 },

    {
      "name": "蔡甸区",
      "id": 420114 },

    {
      "name": "江夏区",
      "id": 420115 },

    {
      "name": "黄陂区",
      "id": 420116 },

    {
      "name": "新洲区",
      "id": 420117 }],


    "name": "武汉市",
    "id": 420100 },

  {
    "children": [{
      "name": "市辖区",
      "id": 420201 },

    {
      "name": "黄石港区",
      "id": 420202 },

    {
      "name": "西塞山区",
      "id": 420203 },

    {
      "name": "下陆区",
      "id": 420204 },

    {
      "name": "铁山区",
      "id": 420205 },

    {
      "name": "阳新县",
      "id": 420222 },

    {
      "name": "大冶市",
      "id": 420281 }],


    "name": "黄石市",
    "id": 420200 },

  {
    "children": [{
      "name": "市辖区",
      "id": 420301 },

    {
      "name": "茅箭区",
      "id": 420302 },

    {
      "name": "张湾区",
      "id": 420303 },

    {
      "name": "郧县",
      "id": 420321 },

    {
      "name": "郧西县",
      "id": 420322 },

    {
      "name": "竹山县",
      "id": 420323 },

    {
      "name": "竹溪县",
      "id": 420324 },

    {
      "name": "房县",
      "id": 420325 },

    {
      "name": "丹江口市",
      "id": 420381 }],


    "name": "十堰市",
    "id": 420300 },

  {
    "children": [{
      "name": "市辖区",
      "id": 420501 },

    {
      "name": "西陵区",
      "id": 420502 },

    {
      "name": "伍家岗区",
      "id": 420503 },

    {
      "name": "点军区",
      "id": 420504 },

    {
      "name": "猇亭区",
      "id": 420505 },

    {
      "name": "夷陵区",
      "id": 420506 },

    {
      "name": "远安县",
      "id": 420525 },

    {
      "name": "兴山县",
      "id": 420526 },

    {
      "name": "秭归县",
      "id": 420527 },

    {
      "name": "长阳土家族自治县",
      "id": 420528 },

    {
      "name": "五峰土家族自治县",
      "id": 420529 },

    {
      "name": "宜都市",
      "id": 420581 },

    {
      "name": "当阳市",
      "id": 420582 },

    {
      "name": "枝江市",
      "id": 420583 }],


    "name": "宜昌市",
    "id": 420500 },

  {
    "children": [{
      "name": "市辖区",
      "id": 420601 },

    {
      "name": "襄城区",
      "id": 420602 },

    {
      "name": "樊城区",
      "id": 420606 },

    {
      "name": "襄州区",
      "id": 420607 },

    {
      "name": "南漳县",
      "id": 420624 },

    {
      "name": "谷城县",
      "id": 420625 },

    {
      "name": "保康县",
      "id": 420626 },

    {
      "name": "老河口市",
      "id": 420682 },

    {
      "name": "枣阳市",
      "id": 420683 },

    {
      "name": "宜城市",
      "id": 420684 }],


    "name": "襄阳市",
    "id": 420600 },

  {
    "children": [{
      "name": "市辖区",
      "id": 420701 },

    {
      "name": "梁子湖区",
      "id": 420702 },

    {
      "name": "华容区",
      "id": 420703 },

    {
      "name": "鄂城区",
      "id": 420704 }],


    "name": "鄂州市",
    "id": 420700 },

  {
    "children": [{
      "name": "市辖区",
      "id": 420801 },

    {
      "name": "东宝区",
      "id": 420802 },

    {
      "name": "掇刀区",
      "id": 420804 },

    {
      "name": "京山县",
      "id": 420821 },

    {
      "name": "沙洋县",
      "id": 420822 },

    {
      "name": "钟祥市",
      "id": 420881 }],


    "name": "荆门市",
    "id": 420800 },

  {
    "children": [{
      "name": "市辖区",
      "id": 420901 },

    {
      "name": "孝南区",
      "id": 420902 },

    {
      "name": "孝昌县",
      "id": 420921 },

    {
      "name": "大悟县",
      "id": 420922 },

    {
      "name": "云梦县",
      "id": 420923 },

    {
      "name": "应城市",
      "id": 420981 },

    {
      "name": "安陆市",
      "id": 420982 },

    {
      "name": "汉川市",
      "id": 420984 }],


    "name": "孝感市",
    "id": 420900 },

  {
    "children": [{
      "name": "市辖区",
      "id": 421001 },

    {
      "name": "沙市区",
      "id": 421002 },

    {
      "name": "荆州区",
      "id": 421003 },

    {
      "name": "公安县",
      "id": 421022 },

    {
      "name": "监利县",
      "id": 421023 },

    {
      "name": "江陵县",
      "id": 421024 },

    {
      "name": "石首市",
      "id": 421081 },

    {
      "name": "洪湖市",
      "id": 421083 },

    {
      "name": "松滋市",
      "id": 421087 }],


    "name": "荆州市",
    "id": 421000 },

  {
    "children": [{
      "name": "市辖区",
      "id": 421101 },

    {
      "name": "黄州区",
      "id": 421102 },

    {
      "name": "团风县",
      "id": 421121 },

    {
      "name": "红安县",
      "id": 421122 },

    {
      "name": "罗田县",
      "id": 421123 },

    {
      "name": "英山县",
      "id": 421124 },

    {
      "name": "浠水县",
      "id": 421125 },

    {
      "name": "蕲春县",
      "id": 421126 },

    {
      "name": "黄梅县",
      "id": 421127 },

    {
      "name": "麻城市",
      "id": 421181 },

    {
      "name": "武穴市",
      "id": 421182 }],


    "name": "黄冈市",
    "id": 421100 },

  {
    "children": [{
      "name": "市辖区",
      "id": 421201 },

    {
      "name": "咸安区",
      "id": 421202 },

    {
      "name": "嘉鱼县",
      "id": 421221 },

    {
      "name": "通城县",
      "id": 421222 },

    {
      "name": "崇阳县",
      "id": 421223 },

    {
      "name": "通山县",
      "id": 421224 },

    {
      "name": "赤壁市",
      "id": 421281 }],


    "name": "咸宁市",
    "id": 421200 },

  {
    "children": [{
      "name": "市辖区",
      "id": 421301 },

    {
      "name": "曾都区",
      "id": 421303 },

    {
      "name": "随县",
      "id": 421321 },

    {
      "name": "广水市",
      "id": 421381 }],


    "name": "随州市",
    "id": 421300 },

  {
    "children": [{
      "name": "恩施市",
      "id": 422801 },

    {
      "name": "利川市",
      "id": 422802 },

    {
      "name": "建始县",
      "id": 422822 },

    {
      "name": "巴东县",
      "id": 422823 },

    {
      "name": "宣恩县",
      "id": 422825 },

    {
      "name": "咸丰县",
      "id": 422826 },

    {
      "name": "来凤县",
      "id": 422827 },

    {
      "name": "鹤峰县",
      "id": 422828 }],


    "name": "恩施土家族苗族自治州",
    "id": 422800 },

  {
    "children": [{
      "name": "仙桃市",
      "id": 429004 },

    {
      "name": "潜江市",
      "id": 429005 },

    {
      "name": "天门市",
      "id": 429006 },

    {
      "name": "神农架林区",
      "id": 429021 }],


    "name": "省直辖县级行政区划",
    "id": 429000 }] },



{
  "id": 430000,
  "name": "湖南省",
  "children": [{
    "children": [{
      "name": "市辖区",
      "id": 430101 },

    {
      "name": "芙蓉区",
      "id": 430102 },

    {
      "name": "天心区",
      "id": 430103 },

    {
      "name": "岳麓区",
      "id": 430104 },

    {
      "name": "开福区",
      "id": 430105 },

    {
      "name": "雨花区",
      "id": 430111 },

    {
      "name": "望城区",
      "id": 430112 },

    {
      "name": "长沙县",
      "id": 430121 },

    {
      "name": "宁乡县",
      "id": 430124 },

    {
      "name": "浏阳市",
      "id": 430181 }],


    "name": "长沙市",
    "id": 430100 },

  {
    "children": [{
      "name": "市辖区",
      "id": 430201 },

    {
      "name": "荷塘区",
      "id": 430202 },

    {
      "name": "芦淞区",
      "id": 430203 },

    {
      "name": "石峰区",
      "id": 430204 },

    {
      "name": "天元区",
      "id": 430211 },

    {
      "name": "株洲县",
      "id": 430221 },

    {
      "name": "攸县",
      "id": 430223 },

    {
      "name": "茶陵县",
      "id": 430224 },

    {
      "name": "炎陵县",
      "id": 430225 },

    {
      "name": "醴陵市",
      "id": 430281 }],


    "name": "株洲市",
    "id": 430200 },

  {
    "children": [{
      "name": "市辖区",
      "id": 430301 },

    {
      "name": "雨湖区",
      "id": 430302 },

    {
      "name": "岳塘区",
      "id": 430304 },

    {
      "name": "湘潭县",
      "id": 430321 },

    {
      "name": "湘乡市",
      "id": 430381 },

    {
      "name": "韶山市",
      "id": 430382 }],


    "name": "湘潭市",
    "id": 430300 },

  {
    "children": [{
      "name": "市辖区",
      "id": 430401 },

    {
      "name": "珠晖区",
      "id": 430405 },

    {
      "name": "雁峰区",
      "id": 430406 },

    {
      "name": "石鼓区",
      "id": 430407 },

    {
      "name": "蒸湘区",
      "id": 430408 },

    {
      "name": "南岳区",
      "id": 430412 },

    {
      "name": "衡阳县",
      "id": 430421 },

    {
      "name": "衡南县",
      "id": 430422 },

    {
      "name": "衡山县",
      "id": 430423 },

    {
      "name": "衡东县",
      "id": 430424 },

    {
      "name": "祁东县",
      "id": 430426 },

    {
      "name": "耒阳市",
      "id": 430481 },

    {
      "name": "常宁市",
      "id": 430482 }],


    "name": "衡阳市",
    "id": 430400 },

  {
    "children": [{
      "name": "市辖区",
      "id": 430501 },

    {
      "name": "双清区",
      "id": 430502 },

    {
      "name": "大祥区",
      "id": 430503 },

    {
      "name": "北塔区",
      "id": 430511 },

    {
      "name": "邵东县",
      "id": 430521 },

    {
      "name": "新邵县",
      "id": 430522 },

    {
      "name": "邵阳县",
      "id": 430523 },

    {
      "name": "隆回县",
      "id": 430524 },

    {
      "name": "洞口县",
      "id": 430525 },

    {
      "name": "绥宁县",
      "id": 430527 },

    {
      "name": "新宁县",
      "id": 430528 },

    {
      "name": "城步苗族自治县",
      "id": 430529 },

    {
      "name": "武冈市",
      "id": 430581 }],


    "name": "邵阳市",
    "id": 430500 },

  {
    "children": [{
      "name": "市辖区",
      "id": 430601 },

    {
      "name": "岳阳楼区",
      "id": 430602 },

    {
      "name": "云溪区",
      "id": 430603 },

    {
      "name": "君山区",
      "id": 430611 },

    {
      "name": "岳阳县",
      "id": 430621 },

    {
      "name": "华容县",
      "id": 430623 },

    {
      "name": "湘阴县",
      "id": 430624 },

    {
      "name": "平江县",
      "id": 430626 },

    {
      "name": "汨罗市",
      "id": 430681 },

    {
      "name": "临湘市",
      "id": 430682 }],


    "name": "岳阳市",
    "id": 430600 },

  {
    "children": [{
      "name": "市辖区",
      "id": 430701 },

    {
      "name": "武陵区",
      "id": 430702 },

    {
      "name": "鼎城区",
      "id": 430703 },

    {
      "name": "安乡县",
      "id": 430721 },

    {
      "name": "汉寿县",
      "id": 430722 },

    {
      "name": "澧县",
      "id": 430723 },

    {
      "name": "临澧县",
      "id": 430724 },

    {
      "name": "桃源县",
      "id": 430725 },

    {
      "name": "石门县",
      "id": 430726 },

    {
      "name": "津市市",
      "id": 430781 }],


    "name": "常德市",
    "id": 430700 },

  {
    "children": [{
      "name": "市辖区",
      "id": 430801 },

    {
      "name": "永定区",
      "id": 430802 },

    {
      "name": "武陵源区",
      "id": 430811 },

    {
      "name": "慈利县",
      "id": 430821 },

    {
      "name": "桑植县",
      "id": 430822 }],


    "name": "张家界市",
    "id": 430800 },

  {
    "children": [{
      "name": "市辖区",
      "id": 430901 },

    {
      "name": "资阳区",
      "id": 430902 },

    {
      "name": "赫山区",
      "id": 430903 },

    {
      "name": "南县",
      "id": 430921 },

    {
      "name": "桃江县",
      "id": 430922 },

    {
      "name": "安化县",
      "id": 430923 },

    {
      "name": "沅江市",
      "id": 430981 }],


    "name": "益阳市",
    "id": 430900 },

  {
    "children": [{
      "name": "市辖区",
      "id": 431001 },

    {
      "name": "北湖区",
      "id": 431002 },

    {
      "name": "苏仙区",
      "id": 431003 },

    {
      "name": "桂阳县",
      "id": 431021 },

    {
      "name": "宜章县",
      "id": 431022 },

    {
      "name": "永兴县",
      "id": 431023 },

    {
      "name": "嘉禾县",
      "id": 431024 },

    {
      "name": "临武县",
      "id": 431025 },

    {
      "name": "汝城县",
      "id": 431026 },

    {
      "name": "桂东县",
      "id": 431027 },

    {
      "name": "安仁县",
      "id": 431028 },

    {
      "name": "资兴市",
      "id": 431081 }],


    "name": "郴州市",
    "id": 431000 },

  {
    "children": [{
      "name": "市辖区",
      "id": 431101 },

    {
      "name": "零陵区",
      "id": 431102 },

    {
      "name": "冷水滩区",
      "id": 431103 },

    {
      "name": "祁阳县",
      "id": 431121 },

    {
      "name": "东安县",
      "id": 431122 },

    {
      "name": "双牌县",
      "id": 431123 },

    {
      "name": "道县",
      "id": 431124 },

    {
      "name": "江永县",
      "id": 431125 },

    {
      "name": "宁远县",
      "id": 431126 },

    {
      "name": "蓝山县",
      "id": 431127 },

    {
      "name": "新田县",
      "id": 431128 },

    {
      "name": "江华瑶族自治县",
      "id": 431129 }],


    "name": "永州市",
    "id": 431100 },

  {
    "children": [{
      "name": "市辖区",
      "id": 431201 },

    {
      "name": "鹤城区",
      "id": 431202 },

    {
      "name": "中方县",
      "id": 431221 },

    {
      "name": "沅陵县",
      "id": 431222 },

    {
      "name": "辰溪县",
      "id": 431223 },

    {
      "name": "溆浦县",
      "id": 431224 },

    {
      "name": "会同县",
      "id": 431225 },

    {
      "name": "麻阳苗族自治县",
      "id": 431226 },

    {
      "name": "新晃侗族自治县",
      "id": 431227 },

    {
      "name": "芷江侗族自治县",
      "id": 431228 },

    {
      "name": "靖州苗族侗族自治县",
      "id": 431229 },

    {
      "name": "通道侗族自治县",
      "id": 431230 },

    {
      "name": "洪江市",
      "id": 431281 }],


    "name": "怀化市",
    "id": 431200 },

  {
    "children": [{
      "name": "市辖区",
      "id": 431301 },

    {
      "name": "娄星区",
      "id": 431302 },

    {
      "name": "双峰县",
      "id": 431321 },

    {
      "name": "新化县",
      "id": 431322 },

    {
      "name": "冷水江市",
      "id": 431381 },

    {
      "name": "涟源市",
      "id": 431382 }],


    "name": "娄底市",
    "id": 431300 },

  {
    "children": [{
      "name": "吉首市",
      "id": 433101 },

    {
      "name": "泸溪县",
      "id": 433122 },

    {
      "name": "凤凰县",
      "id": 433123 },

    {
      "name": "花垣县",
      "id": 433124 },

    {
      "name": "保靖县",
      "id": 433125 },

    {
      "name": "古丈县",
      "id": 433126 },

    {
      "name": "永顺县",
      "id": 433127 },

    {
      "name": "龙山县",
      "id": 433130 }],


    "name": "湘西土家族苗族自治州",
    "id": 433100 }] },



{
  "id": 440000,
  "name": "广东省",
  "children": [{
    "children": [{
      "name": "市辖区",
      "id": 440101 },

    {
      "name": "荔湾区",
      "id": 440103 },

    {
      "name": "越秀区",
      "id": 440104 },

    {
      "name": "海珠区",
      "id": 440105 },

    {
      "name": "天河区",
      "id": 440106 },

    {
      "name": "白云区",
      "id": 440111 },

    {
      "name": "黄埔区",
      "id": 440112 },

    {
      "name": "番禺区",
      "id": 440113 },

    {
      "name": "花都区",
      "id": 440114 },

    {
      "name": "南沙区",
      "id": 440115 },

    {
      "name": "萝岗区",
      "id": 440116 },

    {
      "name": "增城市",
      "id": 440183 },

    {
      "name": "从化市",
      "id": 440184 }],


    "name": "广州市",
    "id": 440100 },

  {
    "children": [{
      "name": "市辖区",
      "id": 440201 },

    {
      "name": "武江区",
      "id": 440203 },

    {
      "name": "浈江区",
      "id": 440204 },

    {
      "name": "曲江区",
      "id": 440205 },

    {
      "name": "始兴县",
      "id": 440222 },

    {
      "name": "仁化县",
      "id": 440224 },

    {
      "name": "翁源县",
      "id": 440229 },

    {
      "name": "乳源瑶族自治县",
      "id": 440232 },

    {
      "name": "新丰县",
      "id": 440233 },

    {
      "name": "乐昌市",
      "id": 440281 },

    {
      "name": "南雄市",
      "id": 440282 }],


    "name": "韶关市",
    "id": 440200 },

  {
    "children": [{
      "name": "市辖区",
      "id": 440301 },

    {
      "name": "罗湖区",
      "id": 440303 },

    {
      "name": "福田区",
      "id": 440304 },

    {
      "name": "南山区",
      "id": 440305 },

    {
      "name": "宝安区",
      "id": 440306 },

    {
      "name": "龙岗区",
      "id": 440307 },

    {
      "name": "盐田区",
      "id": 440308 }],


    "name": "深圳市",
    "id": 440300 },

  {
    "children": [{
      "name": "市辖区",
      "id": 440401 },

    {
      "name": "香洲区",
      "id": 440402 },

    {
      "name": "斗门区",
      "id": 440403 },

    {
      "name": "金湾区",
      "id": 440404 }],


    "name": "珠海市",
    "id": 440400 },

  {
    "children": [{
      "name": "市辖区",
      "id": 440501 },

    {
      "name": "龙湖区",
      "id": 440507 },

    {
      "name": "金平区",
      "id": 440511 },

    {
      "name": "濠江区",
      "id": 440512 },

    {
      "name": "潮阳区",
      "id": 440513 },

    {
      "name": "潮南区",
      "id": 440514 },

    {
      "name": "澄海区",
      "id": 440515 },

    {
      "name": "南澳县",
      "id": 440523 }],


    "name": "汕头市",
    "id": 440500 },

  {
    "children": [{
      "name": "市辖区",
      "id": 440601 },

    {
      "name": "禅城区",
      "id": 440604 },

    {
      "name": "南海区",
      "id": 440605 },

    {
      "name": "顺德区",
      "id": 440606 },

    {
      "name": "三水区",
      "id": 440607 },

    {
      "name": "高明区",
      "id": 440608 }],


    "name": "佛山市",
    "id": 440600 },

  {
    "children": [{
      "name": "市辖区",
      "id": 440701 },

    {
      "name": "蓬江区",
      "id": 440703 },

    {
      "name": "江海区",
      "id": 440704 },

    {
      "name": "新会区",
      "id": 440705 },

    {
      "name": "台山市",
      "id": 440781 },

    {
      "name": "开平市",
      "id": 440783 },

    {
      "name": "鹤山市",
      "id": 440784 },

    {
      "name": "恩平市",
      "id": 440785 }],


    "name": "江门市",
    "id": 440700 },

  {
    "children": [{
      "name": "市辖区",
      "id": 440801 },

    {
      "name": "赤坎区",
      "id": 440802 },

    {
      "name": "霞山区",
      "id": 440803 },

    {
      "name": "坡头区",
      "id": 440804 },

    {
      "name": "麻章区",
      "id": 440811 },

    {
      "name": "遂溪县",
      "id": 440823 },

    {
      "name": "徐闻县",
      "id": 440825 },

    {
      "name": "廉江市",
      "id": 440881 },

    {
      "name": "雷州市",
      "id": 440882 },

    {
      "name": "吴川市",
      "id": 440883 }],


    "name": "湛江市",
    "id": 440800 },

  {
    "children": [{
      "name": "市辖区",
      "id": 440901 },

    {
      "name": "茂南区",
      "id": 440902 },

    {
      "name": "茂港区",
      "id": 440903 },

    {
      "name": "电白县",
      "id": 440923 },

    {
      "name": "高州市",
      "id": 440981 },

    {
      "name": "化州市",
      "id": 440982 },

    {
      "name": "信宜市",
      "id": 440983 }],


    "name": "茂名市",
    "id": 440900 },

  {
    "children": [{
      "name": "市辖区",
      "id": 441201 },

    {
      "name": "端州区",
      "id": 441202 },

    {
      "name": "鼎湖区",
      "id": 441203 },

    {
      "name": "广宁县",
      "id": 441223 },

    {
      "name": "怀集县",
      "id": 441224 },

    {
      "name": "封开县",
      "id": 441225 },

    {
      "name": "德庆县",
      "id": 441226 },

    {
      "name": "高要市",
      "id": 441283 },

    {
      "name": "四会市",
      "id": 441284 }],


    "name": "肇庆市",
    "id": 441200 },

  {
    "children": [{
      "name": "市辖区",
      "id": 441301 },

    {
      "name": "惠城区",
      "id": 441302 },

    {
      "name": "惠阳区",
      "id": 441303 },

    {
      "name": "博罗县",
      "id": 441322 },

    {
      "name": "惠东县",
      "id": 441323 },

    {
      "name": "龙门县",
      "id": 441324 }],


    "name": "惠州市",
    "id": 441300 },

  {
    "children": [{
      "name": "市辖区",
      "id": 441401 },

    {
      "name": "梅江区",
      "id": 441402 },

    {
      "name": "梅县",
      "id": 441421 },

    {
      "name": "大埔县",
      "id": 441422 },

    {
      "name": "丰顺县",
      "id": 441423 },

    {
      "name": "五华县",
      "id": 441424 },

    {
      "name": "平远县",
      "id": 441426 },

    {
      "name": "蕉岭县",
      "id": 441427 },

    {
      "name": "兴宁市",
      "id": 441481 }],


    "name": "梅州市",
    "id": 441400 },

  {
    "children": [{
      "name": "市辖区",
      "id": 441501 },

    {
      "name": "城区",
      "id": 441502 },

    {
      "name": "海丰县",
      "id": 441521 },

    {
      "name": "陆河县",
      "id": 441523 },

    {
      "name": "陆丰市",
      "id": 441581 }],


    "name": "汕尾市",
    "id": 441500 },

  {
    "children": [{
      "name": "市辖区",
      "id": 441601 },

    {
      "name": "源城区",
      "id": 441602 },

    {
      "name": "紫金县",
      "id": 441621 },

    {
      "name": "龙川县",
      "id": 441622 },

    {
      "name": "连平县",
      "id": 441623 },

    {
      "name": "和平县",
      "id": 441624 },

    {
      "name": "东源县",
      "id": 441625 }],


    "name": "河源市",
    "id": 441600 },

  {
    "children": [{
      "name": "市辖区",
      "id": 441701 },

    {
      "name": "江城区",
      "id": 441702 },

    {
      "name": "阳西县",
      "id": 441721 },

    {
      "name": "阳东县",
      "id": 441723 },

    {
      "name": "阳春市",
      "id": 441781 }],


    "name": "阳江市",
    "id": 441700 },

  {
    "children": [{
      "name": "市辖区",
      "id": 441801 },

    {
      "name": "清城区",
      "id": 441802 },

    {
      "name": "清新区",
      "id": 441803 },

    {
      "name": "佛冈县",
      "id": 441821 },

    {
      "name": "阳山县",
      "id": 441823 },

    {
      "name": "连山壮族瑶族自治县",
      "id": 441825 },

    {
      "name": "连南瑶族自治县",
      "id": 441826 },

    {
      "name": "英德市",
      "id": 441881 },

    {
      "name": "连州市",
      "id": 441882 }],


    "name": "清远市",
    "id": 441800 },

  {
    "children": [{
      "name": "东莞市",
      "id": 441900 }],

    "name": "东莞市",
    "id": 441900 },

  {
    "children": [{
      "name": "中山市",
      "id": 442000 }],

    "name": "中山市",
    "id": 442000 },

  {
    "children": [{
      "name": "市辖区",
      "id": 445101 },

    {
      "name": "湘桥区",
      "id": 445102 },

    {
      "name": "潮安区",
      "id": 445103 },

    {
      "name": "饶平县",
      "id": 445122 }],


    "name": "潮州市",
    "id": 445100 },

  {
    "children": [{
      "name": "市辖区",
      "id": 445201 },

    {
      "name": "榕城区",
      "id": 445202 },

    {
      "name": "揭东区",
      "id": 445203 },

    {
      "name": "揭西县",
      "id": 445222 },

    {
      "name": "惠来县",
      "id": 445224 },

    {
      "name": "普宁市",
      "id": 445281 }],


    "name": "揭阳市",
    "id": 445200 },

  {
    "children": [{
      "name": "市辖区",
      "id": 445301 },

    {
      "name": "云城区",
      "id": 445302 },

    {
      "name": "新兴县",
      "id": 445321 },

    {
      "name": "郁南县",
      "id": 445322 },

    {
      "name": "云安县",
      "id": 445323 },

    {
      "name": "罗定市",
      "id": 445381 }],


    "name": "云浮市",
    "id": 445300 }] },



{
  "id": 450000,
  "name": "广西壮族自治区",
  "children": [{
    "children": [{
      "name": "市辖区",
      "id": 450101 },

    {
      "name": "兴宁区",
      "id": 450102 },

    {
      "name": "青秀区",
      "id": 450103 },

    {
      "name": "江南区",
      "id": 450105 },

    {
      "name": "西乡塘区",
      "id": 450107 },

    {
      "name": "良庆区",
      "id": 450108 },

    {
      "name": "邕宁区",
      "id": 450109 },

    {
      "name": "武鸣县",
      "id": 450122 },

    {
      "name": "隆安县",
      "id": 450123 },

    {
      "name": "马山县",
      "id": 450124 },

    {
      "name": "上林县",
      "id": 450125 },

    {
      "name": "宾阳县",
      "id": 450126 },

    {
      "name": "横县",
      "id": 450127 }],


    "name": "南宁市",
    "id": 450100 },

  {
    "children": [{
      "name": "市辖区",
      "id": 450201 },

    {
      "name": "城中区",
      "id": 450202 },

    {
      "name": "鱼峰区",
      "id": 450203 },

    {
      "name": "柳南区",
      "id": 450204 },

    {
      "name": "柳北区",
      "id": 450205 },

    {
      "name": "柳江县",
      "id": 450221 },

    {
      "name": "柳城县",
      "id": 450222 },

    {
      "name": "鹿寨县",
      "id": 450223 },

    {
      "name": "融安县",
      "id": 450224 },

    {
      "name": "融水苗族自治县",
      "id": 450225 },

    {
      "name": "三江侗族自治县",
      "id": 450226 }],


    "name": "柳州市",
    "id": 450200 },

  {
    "children": [{
      "name": "市辖区",
      "id": 450301 },

    {
      "name": "秀峰区",
      "id": 450302 },

    {
      "name": "叠彩区",
      "id": 450303 },

    {
      "name": "象山区",
      "id": 450304 },

    {
      "name": "七星区",
      "id": 450305 },

    {
      "name": "雁山区",
      "id": 450311 },

    {
      "name": "临桂区",
      "id": 450312 },

    {
      "name": "阳朔县",
      "id": 450321 },

    {
      "name": "灵川县",
      "id": 450323 },

    {
      "name": "全州县",
      "id": 450324 },

    {
      "name": "兴安县",
      "id": 450325 },

    {
      "name": "永福县",
      "id": 450326 },

    {
      "name": "灌阳县",
      "id": 450327 },

    {
      "name": "龙胜各族自治县",
      "id": 450328 },

    {
      "name": "资源县",
      "id": 450329 },

    {
      "name": "平乐县",
      "id": 450330 },

    {
      "name": "荔浦县",
      "id": 450331 },

    {
      "name": "恭城瑶族自治县",
      "id": 450332 }],


    "name": "桂林市",
    "id": 450300 },

  {
    "children": [{
      "name": "市辖区",
      "id": 450401 },

    {
      "name": "万秀区",
      "id": 450403 },

    {
      "name": "长洲区",
      "id": 450405 },

    {
      "name": "龙圩区",
      "id": 450406 },

    {
      "name": "苍梧县",
      "id": 450421 },

    {
      "name": "藤县",
      "id": 450422 },

    {
      "name": "蒙山县",
      "id": 450423 },

    {
      "name": "岑溪市",
      "id": 450481 }],


    "name": "梧州市",
    "id": 450400 },

  {
    "children": [{
      "name": "市辖区",
      "id": 450501 },

    {
      "name": "海城区",
      "id": 450502 },

    {
      "name": "银海区",
      "id": 450503 },

    {
      "name": "铁山港区",
      "id": 450512 },

    {
      "name": "合浦县",
      "id": 450521 }],


    "name": "北海市",
    "id": 450500 },

  {
    "children": [{
      "name": "市辖区",
      "id": 450601 },

    {
      "name": "港口区",
      "id": 450602 },

    {
      "name": "防城区",
      "id": 450603 },

    {
      "name": "上思县",
      "id": 450621 },

    {
      "name": "东兴市",
      "id": 450681 }],


    "name": "防城港市",
    "id": 450600 },

  {
    "children": [{
      "name": "市辖区",
      "id": 450701 },

    {
      "name": "钦南区",
      "id": 450702 },

    {
      "name": "钦北区",
      "id": 450703 },

    {
      "name": "灵山县",
      "id": 450721 },

    {
      "name": "浦北县",
      "id": 450722 }],


    "name": "钦州市",
    "id": 450700 },

  {
    "children": [{
      "name": "市辖区",
      "id": 450801 },

    {
      "name": "港北区",
      "id": 450802 },

    {
      "name": "港南区",
      "id": 450803 },

    {
      "name": "覃塘区",
      "id": 450804 },

    {
      "name": "平南县",
      "id": 450821 },

    {
      "name": "桂平市",
      "id": 450881 }],


    "name": "贵港市",
    "id": 450800 },

  {
    "children": [{
      "name": "市辖区",
      "id": 450901 },

    {
      "name": "玉州区",
      "id": 450902 },

    {
      "name": "福绵区",
      "id": 450903 },

    {
      "name": "容县",
      "id": 450921 },

    {
      "name": "陆川县",
      "id": 450922 },

    {
      "name": "博白县",
      "id": 450923 },

    {
      "name": "兴业县",
      "id": 450924 },

    {
      "name": "北流市",
      "id": 450981 }],


    "name": "玉林市",
    "id": 450900 },

  {
    "children": [{
      "name": "市辖区",
      "id": 451001 },

    {
      "name": "右江区",
      "id": 451002 },

    {
      "name": "田阳县",
      "id": 451021 },

    {
      "name": "田东县",
      "id": 451022 },

    {
      "name": "平果县",
      "id": 451023 },

    {
      "name": "德保县",
      "id": 451024 },

    {
      "name": "靖西县",
      "id": 451025 },

    {
      "name": "那坡县",
      "id": 451026 },

    {
      "name": "凌云县",
      "id": 451027 },

    {
      "name": "乐业县",
      "id": 451028 },

    {
      "name": "田林县",
      "id": 451029 },

    {
      "name": "西林县",
      "id": 451030 },

    {
      "name": "隆林各族自治县",
      "id": 451031 }],


    "name": "百色市",
    "id": 451000 },

  {
    "children": [{
      "name": "市辖区",
      "id": 451101 },

    {
      "name": "八步区",
      "id": 451102 },

    {
      "name": "昭平县",
      "id": 451121 },

    {
      "name": "钟山县",
      "id": 451122 },

    {
      "name": "富川瑶族自治县",
      "id": 451123 }],


    "name": "贺州市",
    "id": 451100 },

  {
    "children": [{
      "name": "市辖区",
      "id": 451201 },

    {
      "name": "金城江区",
      "id": 451202 },

    {
      "name": "南丹县",
      "id": 451221 },

    {
      "name": "天峨县",
      "id": 451222 },

    {
      "name": "凤山县",
      "id": 451223 },

    {
      "name": "东兰县",
      "id": 451224 },

    {
      "name": "罗城仫佬族自治县",
      "id": 451225 },

    {
      "name": "环江毛南族自治县",
      "id": 451226 },

    {
      "name": "巴马瑶族自治县",
      "id": 451227 },

    {
      "name": "都安瑶族自治县",
      "id": 451228 },

    {
      "name": "大化瑶族自治县",
      "id": 451229 },

    {
      "name": "宜州市",
      "id": 451281 }],


    "name": "河池市",
    "id": 451200 },

  {
    "children": [{
      "name": "市辖区",
      "id": 451301 },

    {
      "name": "兴宾区",
      "id": 451302 },

    {
      "name": "忻城县",
      "id": 451321 },

    {
      "name": "象州县",
      "id": 451322 },

    {
      "name": "武宣县",
      "id": 451323 },

    {
      "name": "金秀瑶族自治县",
      "id": 451324 },

    {
      "name": "合山市",
      "id": 451381 }],


    "name": "来宾市",
    "id": 451300 },

  {
    "children": [{
      "name": "市辖区",
      "id": 451401 },

    {
      "name": "江州区",
      "id": 451402 },

    {
      "name": "扶绥县",
      "id": 451421 },

    {
      "name": "宁明县",
      "id": 451422 },

    {
      "name": "龙州县",
      "id": 451423 },

    {
      "name": "大新县",
      "id": 451424 },

    {
      "name": "天等县",
      "id": 451425 },

    {
      "name": "凭祥市",
      "id": 451481 }],


    "name": "崇左市",
    "id": 451400 }] },



{
  "id": 460000,
  "name": "海南省",
  "children": [{
    "children": [{
      "name": "市辖区",
      "id": 460101 },

    {
      "name": "秀英区",
      "id": 460105 },

    {
      "name": "龙华区",
      "id": 460106 },

    {
      "name": "琼山区",
      "id": 460107 },

    {
      "name": "美兰区",
      "id": 460108 }],


    "name": "海口市",
    "id": 460100 },

  {
    "children": [{
      "name": "市辖区",
      "id": 460201 }],

    "name": "三亚市",
    "id": 460200 },

  {
    "children": [{
      "name": "西沙群岛",
      "id": 460321 },

    {
      "name": "南沙群岛",
      "id": 460322 },

    {
      "name": "中沙群岛的岛礁及其海域",
      "id": 460323 }],


    "name": "三沙市",
    "id": 460300 },

  {
    "children": [{
      "name": "五指山市",
      "id": 469001 },

    {
      "name": "琼海市",
      "id": 469002 },

    {
      "name": "儋州市",
      "id": 469003 },

    {
      "name": "文昌市",
      "id": 469005 },

    {
      "name": "万宁市",
      "id": 469006 },

    {
      "name": "东方市",
      "id": 469007 },

    {
      "name": "定安县",
      "id": 469021 },

    {
      "name": "屯昌县",
      "id": 469022 },

    {
      "name": "澄迈县",
      "id": 469023 },

    {
      "name": "临高县",
      "id": 469024 },

    {
      "name": "白沙黎族自治县",
      "id": 469025 },

    {
      "name": "昌江黎族自治县",
      "id": 469026 },

    {
      "name": "乐东黎族自治县",
      "id": 469027 },

    {
      "name": "陵水黎族自治县",
      "id": 469028 },

    {
      "name": "保亭黎族苗族自治县",
      "id": 469029 },

    {
      "name": "琼中黎族苗族自治县",
      "id": 469030 }],


    "name": "省直辖县级行政区划",
    "id": 469000 }] },



{
  "id": 500000,
  "name": "重庆市",
  "children": [{
    "children": [{
      "name": "万州区",
      "id": 500101 },

    {
      "name": "涪陵区",
      "id": 500102 },

    {
      "name": "渝中区",
      "id": 500103 },

    {
      "name": "大渡口区",
      "id": 500104 },

    {
      "name": "江北区",
      "id": 500105 },

    {
      "name": "沙坪坝区",
      "id": 500106 },

    {
      "name": "九龙坡区",
      "id": 500107 },

    {
      "name": "南岸区",
      "id": 500108 },

    {
      "name": "北碚区",
      "id": 500109 },

    {
      "name": "綦江区",
      "id": 500110 },

    {
      "name": "大足区",
      "id": 500111 },

    {
      "name": "渝北区",
      "id": 500112 },

    {
      "name": "巴南区",
      "id": 500113 },

    {
      "name": "黔江区",
      "id": 500114 },

    {
      "name": "长寿区",
      "id": 500115 },

    {
      "name": "江津区",
      "id": 500116 },

    {
      "name": "合川区",
      "id": 500117 },

    {
      "name": "永川区",
      "id": 500118 },

    {
      "name": "南川区",
      "id": 500119 },

    {
      "name": "潼南县",
      "id": 500223 },

    {
      "name": "铜梁县",
      "id": 500224 },

    {
      "name": "荣昌县",
      "id": 500226 },

    {
      "name": "璧山县",
      "id": 500227 },

    {
      "name": "梁平县",
      "id": 500228 },

    {
      "name": "城口县",
      "id": 500229 },

    {
      "name": "丰都县",
      "id": 500230 },

    {
      "name": "垫江县",
      "id": 500231 },

    {
      "name": "武隆县",
      "id": 500232 },

    {
      "name": "忠县",
      "id": 500233 },

    {
      "name": "开县",
      "id": 500234 },

    {
      "name": "云阳县",
      "id": 500235 },

    {
      "name": "奉节县",
      "id": 500236 },

    {
      "name": "巫山县",
      "id": 500237 },

    {
      "name": "巫溪县",
      "id": 500238 },

    {
      "name": "石柱土家族自治县",
      "id": 500240 },

    {
      "name": "秀山土家族苗族自治县",
      "id": 500241 },

    {
      "name": "酉阳土家族苗族自治县",
      "id": 500242 },

    {
      "name": "彭水苗族土家族自治县",
      "id": 500243 }],


    "name": "重庆市",
    "id": 500000 }] },


{
  "id": 510000,
  "name": "四川省",
  "children": [{
    "children": [{
      "name": "市辖区",
      "id": 510101 },

    {
      "name": "锦江区",
      "id": 510104 },

    {
      "name": "青羊区",
      "id": 510105 },

    {
      "name": "金牛区",
      "id": 510106 },

    {
      "name": "武侯区",
      "id": 510107 },

    {
      "name": "成华区",
      "id": 510108 },

    {
      "name": "龙泉驿区",
      "id": 510112 },

    {
      "name": "青白江区",
      "id": 510113 },

    {
      "name": "新都区",
      "id": 510114 },

    {
      "name": "温江区",
      "id": 510115 },

    {
      "name": "金堂县",
      "id": 510121 },

    {
      "name": "双流县",
      "id": 510122 },

    {
      "name": "郫县",
      "id": 510124 },

    {
      "name": "大邑县",
      "id": 510129 },

    {
      "name": "蒲江县",
      "id": 510131 },

    {
      "name": "新津县",
      "id": 510132 },

    {
      "name": "都江堰市",
      "id": 510181 },

    {
      "name": "彭州市",
      "id": 510182 },

    {
      "name": "邛崃市",
      "id": 510183 },

    {
      "name": "崇州市",
      "id": 510184 }],


    "name": "成都市",
    "id": 510100 },

  {
    "children": [{
      "name": "市辖区",
      "id": 510301 },

    {
      "name": "自流井区",
      "id": 510302 },

    {
      "name": "贡井区",
      "id": 510303 },

    {
      "name": "大安区",
      "id": 510304 },

    {
      "name": "沿滩区",
      "id": 510311 },

    {
      "name": "荣县",
      "id": 510321 },

    {
      "name": "富顺县",
      "id": 510322 }],


    "name": "自贡市",
    "id": 510300 },

  {
    "children": [{
      "name": "市辖区",
      "id": 510401 },

    {
      "name": "东区",
      "id": 510402 },

    {
      "name": "西区",
      "id": 510403 },

    {
      "name": "仁和区",
      "id": 510411 },

    {
      "name": "米易县",
      "id": 510421 },

    {
      "name": "盐边县",
      "id": 510422 }],


    "name": "攀枝花市",
    "id": 510400 },

  {
    "children": [{
      "name": "市辖区",
      "id": 510501 },

    {
      "name": "江阳区",
      "id": 510502 },

    {
      "name": "纳溪区",
      "id": 510503 },

    {
      "name": "龙马潭区",
      "id": 510504 },

    {
      "name": "泸县",
      "id": 510521 },

    {
      "name": "合江县",
      "id": 510522 },

    {
      "name": "叙永县",
      "id": 510524 },

    {
      "name": "古蔺县",
      "id": 510525 }],


    "name": "泸州市",
    "id": 510500 },

  {
    "children": [{
      "name": "市辖区",
      "id": 510601 },

    {
      "name": "旌阳区",
      "id": 510603 },

    {
      "name": "中江县",
      "id": 510623 },

    {
      "name": "罗江县",
      "id": 510626 },

    {
      "name": "广汉市",
      "id": 510681 },

    {
      "name": "什邡市",
      "id": 510682 },

    {
      "name": "绵竹市",
      "id": 510683 }],


    "name": "德阳市",
    "id": 510600 },

  {
    "children": [{
      "name": "市辖区",
      "id": 510701 },

    {
      "name": "涪城区",
      "id": 510703 },

    {
      "name": "游仙区",
      "id": 510704 },

    {
      "name": "三台县",
      "id": 510722 },

    {
      "name": "盐亭县",
      "id": 510723 },

    {
      "name": "安县",
      "id": 510724 },

    {
      "name": "梓潼县",
      "id": 510725 },

    {
      "name": "北川羌族自治县",
      "id": 510726 },

    {
      "name": "平武县",
      "id": 510727 },

    {
      "name": "江油市",
      "id": 510781 }],


    "name": "绵阳市",
    "id": 510700 },

  {
    "children": [{
      "name": "市辖区",
      "id": 510801 },

    {
      "name": "利州区",
      "id": 510802 },

    {
      "name": "元坝区",
      "id": 510811 },

    {
      "name": "朝天区",
      "id": 510812 },

    {
      "name": "旺苍县",
      "id": 510821 },

    {
      "name": "青川县",
      "id": 510822 },

    {
      "name": "剑阁县",
      "id": 510823 },

    {
      "name": "苍溪县",
      "id": 510824 }],


    "name": "广元市",
    "id": 510800 },

  {
    "children": [{
      "name": "市辖区",
      "id": 510901 },

    {
      "name": "船山区",
      "id": 510903 },

    {
      "name": "安居区",
      "id": 510904 },

    {
      "name": "蓬溪县",
      "id": 510921 },

    {
      "name": "射洪县",
      "id": 510922 },

    {
      "name": "大英县",
      "id": 510923 }],


    "name": "遂宁市",
    "id": 510900 },

  {
    "children": [{
      "name": "市辖区",
      "id": 511001 },

    {
      "name": "市中区",
      "id": 511002 },

    {
      "name": "东兴区",
      "id": 511011 },

    {
      "name": "威远县",
      "id": 511024 },

    {
      "name": "资中县",
      "id": 511025 },

    {
      "name": "隆昌县",
      "id": 511028 }],


    "name": "内江市",
    "id": 511000 },

  {
    "children": [{
      "name": "市辖区",
      "id": 511101 },

    {
      "name": "市中区",
      "id": 511102 },

    {
      "name": "沙湾区",
      "id": 511111 },

    {
      "name": "五通桥区",
      "id": 511112 },

    {
      "name": "金口河区",
      "id": 511113 },

    {
      "name": "犍为县",
      "id": 511123 },

    {
      "name": "井研县",
      "id": 511124 },

    {
      "name": "夹江县",
      "id": 511126 },

    {
      "name": "沐川县",
      "id": 511129 },

    {
      "name": "峨边彝族自治县",
      "id": 511132 },

    {
      "name": "马边彝族自治县",
      "id": 511133 },

    {
      "name": "峨眉山市",
      "id": 511181 }],


    "name": "乐山市",
    "id": 511100 },

  {
    "children": [{
      "name": "市辖区",
      "id": 511301 },

    {
      "name": "顺庆区",
      "id": 511302 },

    {
      "name": "高坪区",
      "id": 511303 },

    {
      "name": "嘉陵区",
      "id": 511304 },

    {
      "name": "南部县",
      "id": 511321 },

    {
      "name": "营山县",
      "id": 511322 },

    {
      "name": "蓬安县",
      "id": 511323 },

    {
      "name": "仪陇县",
      "id": 511324 },

    {
      "name": "西充县",
      "id": 511325 },

    {
      "name": "阆中市",
      "id": 511381 }],


    "name": "南充市",
    "id": 511300 },

  {
    "children": [{
      "name": "市辖区",
      "id": 511401 },

    {
      "name": "东坡区",
      "id": 511402 },

    {
      "name": "仁寿县",
      "id": 511421 },

    {
      "name": "彭山县",
      "id": 511422 },

    {
      "name": "洪雅县",
      "id": 511423 },

    {
      "name": "丹棱县",
      "id": 511424 },

    {
      "name": "青神县",
      "id": 511425 }],


    "name": "眉山市",
    "id": 511400 },

  {
    "children": [{
      "name": "市辖区",
      "id": 511501 },

    {
      "name": "翠屏区",
      "id": 511502 },

    {
      "name": "南溪区",
      "id": 511503 },

    {
      "name": "宜宾县",
      "id": 511521 },

    {
      "name": "江安县",
      "id": 511523 },

    {
      "name": "长宁县",
      "id": 511524 },

    {
      "name": "高县",
      "id": 511525 },

    {
      "name": "珙县",
      "id": 511526 },

    {
      "name": "筠连县",
      "id": 511527 },

    {
      "name": "兴文县",
      "id": 511528 },

    {
      "name": "屏山县",
      "id": 511529 }],


    "name": "宜宾市",
    "id": 511500 },

  {
    "children": [{
      "name": "市辖区",
      "id": 511601 },

    {
      "name": "广安区",
      "id": 511602 },

    {
      "name": "前锋区",
      "id": 511603 },

    {
      "name": "岳池县",
      "id": 511621 },

    {
      "name": "武胜县",
      "id": 511622 },

    {
      "name": "邻水县",
      "id": 511623 },

    {
      "name": "华蓥市",
      "id": 511681 }],


    "name": "广安市",
    "id": 511600 },

  {
    "children": [{
      "name": "市辖区",
      "id": 511701 },

    {
      "name": "通川区",
      "id": 511702 },

    {
      "name": "达川区",
      "id": 511703 },

    {
      "name": "宣汉县",
      "id": 511722 },

    {
      "name": "开江县",
      "id": 511723 },

    {
      "name": "大竹县",
      "id": 511724 },

    {
      "name": "渠县",
      "id": 511725 },

    {
      "name": "万源市",
      "id": 511781 }],


    "name": "达州市",
    "id": 511700 },

  {
    "children": [{
      "name": "市辖区",
      "id": 511801 },

    {
      "name": "雨城区",
      "id": 511802 },

    {
      "name": "名山区",
      "id": 511803 },

    {
      "name": "荥经县",
      "id": 511822 },

    {
      "name": "汉源县",
      "id": 511823 },

    {
      "name": "石棉县",
      "id": 511824 },

    {
      "name": "天全县",
      "id": 511825 },

    {
      "name": "芦山县",
      "id": 511826 },

    {
      "name": "宝兴县",
      "id": 511827 }],


    "name": "雅安市",
    "id": 511800 },

  {
    "children": [{
      "name": "市辖区",
      "id": 511901 },

    {
      "name": "巴州区",
      "id": 511902 },

    {
      "name": "恩阳区",
      "id": 511903 },

    {
      "name": "通江县",
      "id": 511921 },

    {
      "name": "南江县",
      "id": 511922 },

    {
      "name": "平昌县",
      "id": 511923 }],


    "name": "巴中市",
    "id": 511900 },

  {
    "children": [{
      "name": "市辖区",
      "id": 512001 },

    {
      "name": "雁江区",
      "id": 512002 },

    {
      "name": "安岳县",
      "id": 512021 },

    {
      "name": "乐至县",
      "id": 512022 },

    {
      "name": "简阳市",
      "id": 512081 }],


    "name": "资阳市",
    "id": 512000 },

  {
    "children": [{
      "name": "汶川县",
      "id": 513221 },

    {
      "name": "理县",
      "id": 513222 },

    {
      "name": "茂县",
      "id": 513223 },

    {
      "name": "松潘县",
      "id": 513224 },

    {
      "name": "九寨沟县",
      "id": 513225 },

    {
      "name": "金川县",
      "id": 513226 },

    {
      "name": "小金县",
      "id": 513227 },

    {
      "name": "黑水县",
      "id": 513228 },

    {
      "name": "马尔康县",
      "id": 513229 },

    {
      "name": "壤塘县",
      "id": 513230 },

    {
      "name": "阿坝县",
      "id": 513231 },

    {
      "name": "若尔盖县",
      "id": 513232 },

    {
      "name": "红原县",
      "id": 513233 }],


    "name": "阿坝藏族羌族自治州",
    "id": 513200 },

  {
    "children": [{
      "name": "康定县",
      "id": 513321 },

    {
      "name": "泸定县",
      "id": 513322 },

    {
      "name": "丹巴县",
      "id": 513323 },

    {
      "name": "九龙县",
      "id": 513324 },

    {
      "name": "雅江县",
      "id": 513325 },

    {
      "name": "道孚县",
      "id": 513326 },

    {
      "name": "炉霍县",
      "id": 513327 },

    {
      "name": "甘孜县",
      "id": 513328 },

    {
      "name": "新龙县",
      "id": 513329 },

    {
      "name": "德格县",
      "id": 513330 },

    {
      "name": "白玉县",
      "id": 513331 },

    {
      "name": "石渠县",
      "id": 513332 },

    {
      "name": "色达县",
      "id": 513333 },

    {
      "name": "理塘县",
      "id": 513334 },

    {
      "name": "巴塘县",
      "id": 513335 },

    {
      "name": "乡城县",
      "id": 513336 },

    {
      "name": "稻城县",
      "id": 513337 },

    {
      "name": "得荣县",
      "id": 513338 }],


    "name": "甘孜藏族自治州",
    "id": 513300 },

  {
    "children": [{
      "name": "西昌市",
      "id": 513401 },

    {
      "name": "木里藏族自治县",
      "id": 513422 },

    {
      "name": "盐源县",
      "id": 513423 },

    {
      "name": "德昌县",
      "id": 513424 },

    {
      "name": "会理县",
      "id": 513425 },

    {
      "name": "会东县",
      "id": 513426 },

    {
      "name": "宁南县",
      "id": 513427 },

    {
      "name": "普格县",
      "id": 513428 },

    {
      "name": "布拖县",
      "id": 513429 },

    {
      "name": "金阳县",
      "id": 513430 },

    {
      "name": "昭觉县",
      "id": 513431 },

    {
      "name": "喜德县",
      "id": 513432 },

    {
      "name": "冕宁县",
      "id": 513433 },

    {
      "name": "越西县",
      "id": 513434 },

    {
      "name": "甘洛县",
      "id": 513435 },

    {
      "name": "美姑县",
      "id": 513436 },

    {
      "name": "雷波县",
      "id": 513437 }],


    "name": "凉山彝族自治州",
    "id": 513400 }] },



{
  "id": 520000,
  "name": "贵州省",
  "children": [{
    "children": [{
      "name": "市辖区",
      "id": 520101 },

    {
      "name": "南明区",
      "id": 520102 },

    {
      "name": "云岩区",
      "id": 520103 },

    {
      "name": "花溪区",
      "id": 520111 },

    {
      "name": "乌当区",
      "id": 520112 },

    {
      "name": "白云区",
      "id": 520113 },

    {
      "name": "观山湖区",
      "id": 520115 },

    {
      "name": "开阳县",
      "id": 520121 },

    {
      "name": "息烽县",
      "id": 520122 },

    {
      "name": "修文县",
      "id": 520123 },

    {
      "name": "清镇市",
      "id": 520181 }],


    "name": "贵阳市",
    "id": 520100 },

  {
    "children": [{
      "name": "钟山区",
      "id": 520201 },

    {
      "name": "六枝特区",
      "id": 520203 },

    {
      "name": "水城县",
      "id": 520221 },

    {
      "name": "盘县",
      "id": 520222 }],


    "name": "六盘水市",
    "id": 520200 },

  {
    "children": [{
      "name": "市辖区",
      "id": 520301 },

    {
      "name": "红花岗区",
      "id": 520302 },

    {
      "name": "汇川区",
      "id": 520303 },

    {
      "name": "遵义县",
      "id": 520321 },

    {
      "name": "桐梓县",
      "id": 520322 },

    {
      "name": "绥阳县",
      "id": 520323 },

    {
      "name": "正安县",
      "id": 520324 },

    {
      "name": "道真仡佬族苗族自治县",
      "id": 520325 },

    {
      "name": "务川仡佬族苗族自治县",
      "id": 520326 },

    {
      "name": "凤冈县",
      "id": 520327 },

    {
      "name": "湄潭县",
      "id": 520328 },

    {
      "name": "余庆县",
      "id": 520329 },

    {
      "name": "习水县",
      "id": 520330 },

    {
      "name": "赤水市",
      "id": 520381 },

    {
      "name": "仁怀市",
      "id": 520382 }],


    "name": "遵义市",
    "id": 520300 },

  {
    "children": [{
      "name": "市辖区",
      "id": 520401 },

    {
      "name": "西秀区",
      "id": 520402 },

    {
      "name": "平坝县",
      "id": 520421 },

    {
      "name": "普定县",
      "id": 520422 },

    {
      "name": "镇宁布依族苗族自治县",
      "id": 520423 },

    {
      "name": "关岭布依族苗族自治县",
      "id": 520424 },

    {
      "name": "紫云苗族布依族自治县",
      "id": 520425 }],


    "name": "安顺市",
    "id": 520400 },

  {
    "children": [{
      "name": "市辖区",
      "id": 520501 },

    {
      "name": "七星关区",
      "id": 520502 },

    {
      "name": "大方县",
      "id": 520521 },

    {
      "name": "黔西县",
      "id": 520522 },

    {
      "name": "金沙县",
      "id": 520523 },

    {
      "name": "织金县",
      "id": 520524 },

    {
      "name": "纳雍县",
      "id": 520525 },

    {
      "name": "威宁彝族回族苗族自治县",
      "id": 520526 },

    {
      "name": "赫章县",
      "id": 520527 }],


    "name": "毕节市",
    "id": 520500 },

  {
    "children": [{
      "name": "市辖区",
      "id": 520601 },

    {
      "name": "碧江区",
      "id": 520602 },

    {
      "name": "万山区",
      "id": 520603 },

    {
      "name": "江口县",
      "id": 520621 },

    {
      "name": "玉屏侗族自治县",
      "id": 520622 },

    {
      "name": "石阡县",
      "id": 520623 },

    {
      "name": "思南县",
      "id": 520624 },

    {
      "name": "印江土家族苗族自治县",
      "id": 520625 },

    {
      "name": "德江县",
      "id": 520626 },

    {
      "name": "沿河土家族自治县",
      "id": 520627 },

    {
      "name": "松桃苗族自治县",
      "id": 520628 }],


    "name": "铜仁市",
    "id": 520600 },

  {
    "children": [{
      "name": "兴义市",
      "id": 522301 },

    {
      "name": "兴仁县",
      "id": 522322 },

    {
      "name": "普安县",
      "id": 522323 },

    {
      "name": "晴隆县",
      "id": 522324 },

    {
      "name": "贞丰县",
      "id": 522325 },

    {
      "name": "望谟县",
      "id": 522326 },

    {
      "name": "册亨县",
      "id": 522327 },

    {
      "name": "安龙县",
      "id": 522328 }],


    "name": "黔西南布依族苗族自治州",
    "id": 522300 },

  {
    "children": [{
      "name": "凯里市",
      "id": 522601 },

    {
      "name": "黄平县",
      "id": 522622 },

    {
      "name": "施秉县",
      "id": 522623 },

    {
      "name": "三穗县",
      "id": 522624 },

    {
      "name": "镇远县",
      "id": 522625 },

    {
      "name": "岑巩县",
      "id": 522626 },

    {
      "name": "天柱县",
      "id": 522627 },

    {
      "name": "锦屏县",
      "id": 522628 },

    {
      "name": "剑河县",
      "id": 522629 },

    {
      "name": "台江县",
      "id": 522630 },

    {
      "name": "黎平县",
      "id": 522631 },

    {
      "name": "榕江县",
      "id": 522632 },

    {
      "name": "从江县",
      "id": 522633 },

    {
      "name": "雷山县",
      "id": 522634 },

    {
      "name": "麻江县",
      "id": 522635 },

    {
      "name": "丹寨县",
      "id": 522636 }],


    "name": "黔东南苗族侗族自治州",
    "id": 522600 },

  {
    "children": [{
      "name": "都匀市",
      "id": 522701 },

    {
      "name": "福泉市",
      "id": 522702 },

    {
      "name": "荔波县",
      "id": 522722 },

    {
      "name": "贵定县",
      "id": 522723 },

    {
      "name": "瓮安县",
      "id": 522725 },

    {
      "name": "独山县",
      "id": 522726 },

    {
      "name": "平塘县",
      "id": 522727 },

    {
      "name": "罗甸县",
      "id": 522728 },

    {
      "name": "长顺县",
      "id": 522729 },

    {
      "name": "龙里县",
      "id": 522730 },

    {
      "name": "惠水县",
      "id": 522731 },

    {
      "name": "三都水族自治县",
      "id": 522732 }],


    "name": "黔南布依族苗族自治州",
    "id": 522700 }] },



{
  "id": 530000,
  "name": "云南省",
  "children": [{
    "children": [{
      "name": "市辖区",
      "id": 530101 },

    {
      "name": "五华区",
      "id": 530102 },

    {
      "name": "盘龙区",
      "id": 530103 },

    {
      "name": "官渡区",
      "id": 530111 },

    {
      "name": "西山区",
      "id": 530112 },

    {
      "name": "东川区",
      "id": 530113 },

    {
      "name": "呈贡区",
      "id": 530114 },

    {
      "name": "晋宁县",
      "id": 530122 },

    {
      "name": "富民县",
      "id": 530124 },

    {
      "name": "宜良县",
      "id": 530125 },

    {
      "name": "石林彝族自治县",
      "id": 530126 },

    {
      "name": "嵩明县",
      "id": 530127 },

    {
      "name": "禄劝彝族苗族自治县",
      "id": 530128 },

    {
      "name": "寻甸回族彝族自治县",
      "id": 530129 },

    {
      "name": "安宁市",
      "id": 530181 }],


    "name": "昆明市",
    "id": 530100 },

  {
    "children": [{
      "name": "市辖区",
      "id": 530301 },

    {
      "name": "麒麟区",
      "id": 530302 },

    {
      "name": "马龙县",
      "id": 530321 },

    {
      "name": "陆良县",
      "id": 530322 },

    {
      "name": "师宗县",
      "id": 530323 },

    {
      "name": "罗平县",
      "id": 530324 },

    {
      "name": "富源县",
      "id": 530325 },

    {
      "name": "会泽县",
      "id": 530326 },

    {
      "name": "沾益县",
      "id": 530328 },

    {
      "name": "宣威市",
      "id": 530381 }],


    "name": "曲靖市",
    "id": 530300 },

  {
    "children": [{
      "name": "市辖区",
      "id": 530401 },

    {
      "name": "红塔区",
      "id": 530402 },

    {
      "name": "江川县",
      "id": 530421 },

    {
      "name": "澄江县",
      "id": 530422 },

    {
      "name": "通海县",
      "id": 530423 },

    {
      "name": "华宁县",
      "id": 530424 },

    {
      "name": "易门县",
      "id": 530425 },

    {
      "name": "峨山彝族自治县",
      "id": 530426 },

    {
      "name": "新平彝族傣族自治县",
      "id": 530427 },

    {
      "name": "元江哈尼族彝族傣族自治县",
      "id": 530428 }],


    "name": "玉溪市",
    "id": 530400 },

  {
    "children": [{
      "name": "市辖区",
      "id": 530501 },

    {
      "name": "隆阳区",
      "id": 530502 },

    {
      "name": "施甸县",
      "id": 530521 },

    {
      "name": "腾冲县",
      "id": 530522 },

    {
      "name": "龙陵县",
      "id": 530523 },

    {
      "name": "昌宁县",
      "id": 530524 }],


    "name": "保山市",
    "id": 530500 },

  {
    "children": [{
      "name": "市辖区",
      "id": 530601 },

    {
      "name": "昭阳区",
      "id": 530602 },

    {
      "name": "鲁甸县",
      "id": 530621 },

    {
      "name": "巧家县",
      "id": 530622 },

    {
      "name": "盐津县",
      "id": 530623 },

    {
      "name": "大关县",
      "id": 530624 },

    {
      "name": "永善县",
      "id": 530625 },

    {
      "name": "绥江县",
      "id": 530626 },

    {
      "name": "镇雄县",
      "id": 530627 },

    {
      "name": "彝良县",
      "id": 530628 },

    {
      "name": "威信县",
      "id": 530629 },

    {
      "name": "水富县",
      "id": 530630 }],


    "name": "昭通市",
    "id": 530600 },

  {
    "children": [{
      "name": "市辖区",
      "id": 530701 },

    {
      "name": "古城区",
      "id": 530702 },

    {
      "name": "玉龙纳西族自治县",
      "id": 530721 },

    {
      "name": "永胜县",
      "id": 530722 },

    {
      "name": "华坪县",
      "id": 530723 },

    {
      "name": "宁蒗彝族自治县",
      "id": 530724 }],


    "name": "丽江市",
    "id": 530700 },

  {
    "children": [{
      "name": "市辖区",
      "id": 530801 },

    {
      "name": "思茅区",
      "id": 530802 },

    {
      "name": "宁洱哈尼族彝族自治县",
      "id": 530821 },

    {
      "name": "墨江哈尼族自治县",
      "id": 530822 },

    {
      "name": "景东彝族自治县",
      "id": 530823 },

    {
      "name": "景谷傣族彝族自治县",
      "id": 530824 },

    {
      "name": "镇沅彝族哈尼族拉祜族自治县",
      "id": 530825 },

    {
      "name": "江城哈尼族彝族自治县",
      "id": 530826 },

    {
      "name": "孟连傣族拉祜族佤族自治县",
      "id": 530827 },

    {
      "name": "澜沧拉祜族自治县",
      "id": 530828 },

    {
      "name": "西盟佤族自治县",
      "id": 530829 }],


    "name": "普洱市",
    "id": 530800 },

  {
    "children": [{
      "name": "市辖区",
      "id": 530901 },

    {
      "name": "临翔区",
      "id": 530902 },

    {
      "name": "凤庆县",
      "id": 530921 },

    {
      "name": "云县",
      "id": 530922 },

    {
      "name": "永德县",
      "id": 530923 },

    {
      "name": "镇康县",
      "id": 530924 },

    {
      "name": "双江拉祜族佤族布朗族傣族自治县",
      "id": 530925 },

    {
      "name": "耿马傣族佤族自治县",
      "id": 530926 },

    {
      "name": "沧源佤族自治县",
      "id": 530927 }],


    "name": "临沧市",
    "id": 530900 },

  {
    "children": [{
      "name": "楚雄市",
      "id": 532301 },

    {
      "name": "双柏县",
      "id": 532322 },

    {
      "name": "牟定县",
      "id": 532323 },

    {
      "name": "南华县",
      "id": 532324 },

    {
      "name": "姚安县",
      "id": 532325 },

    {
      "name": "大姚县",
      "id": 532326 },

    {
      "name": "永仁县",
      "id": 532327 },

    {
      "name": "元谋县",
      "id": 532328 },

    {
      "name": "武定县",
      "id": 532329 },

    {
      "name": "禄丰县",
      "id": 532331 }],


    "name": "楚雄彝族自治州",
    "id": 532300 },

  {
    "children": [{
      "name": "个旧市",
      "id": 532501 },

    {
      "name": "开远市",
      "id": 532502 },

    {
      "name": "蒙自市",
      "id": 532503 },

    {
      "name": "弥勒市",
      "id": 532504 },

    {
      "name": "屏边苗族自治县",
      "id": 532523 },

    {
      "name": "建水县",
      "id": 532524 },

    {
      "name": "石屏县",
      "id": 532525 },

    {
      "name": "泸西县",
      "id": 532527 },

    {
      "name": "元阳县",
      "id": 532528 },

    {
      "name": "红河县",
      "id": 532529 },

    {
      "name": "金平苗族瑶族傣族自治县",
      "id": 532530 },

    {
      "name": "绿春县",
      "id": 532531 },

    {
      "name": "河口瑶族自治县",
      "id": 532532 }],


    "name": "红河哈尼族彝族自治州",
    "id": 532500 },

  {
    "children": [{
      "name": "文山市",
      "id": 532601 },

    {
      "name": "砚山县",
      "id": 532622 },

    {
      "name": "西畴县",
      "id": 532623 },

    {
      "name": "麻栗坡县",
      "id": 532624 },

    {
      "name": "马关县",
      "id": 532625 },

    {
      "name": "丘北县",
      "id": 532626 },

    {
      "name": "广南县",
      "id": 532627 },

    {
      "name": "富宁县",
      "id": 532628 }],


    "name": "文山壮族苗族自治州",
    "id": 532600 },

  {
    "children": [{
      "name": "景洪市",
      "id": 532801 },

    {
      "name": "勐海县",
      "id": 532822 },

    {
      "name": "勐腊县",
      "id": 532823 }],


    "name": "西双版纳傣族自治州",
    "id": 532800 },

  {
    "children": [{
      "name": "大理市",
      "id": 532901 },

    {
      "name": "漾濞彝族自治县",
      "id": 532922 },

    {
      "name": "祥云县",
      "id": 532923 },

    {
      "name": "宾川县",
      "id": 532924 },

    {
      "name": "弥渡县",
      "id": 532925 },

    {
      "name": "南涧彝族自治县",
      "id": 532926 },

    {
      "name": "巍山彝族回族自治县",
      "id": 532927 },

    {
      "name": "永平县",
      "id": 532928 },

    {
      "name": "云龙县",
      "id": 532929 },

    {
      "name": "洱源县",
      "id": 532930 },

    {
      "name": "剑川县",
      "id": 532931 },

    {
      "name": "鹤庆县",
      "id": 532932 }],


    "name": "大理白族自治州",
    "id": 532900 },

  {
    "children": [{
      "name": "瑞丽市",
      "id": 533102 },

    {
      "name": "芒市",
      "id": 533103 },

    {
      "name": "梁河县",
      "id": 533122 },

    {
      "name": "盈江县",
      "id": 533123 },

    {
      "name": "陇川县",
      "id": 533124 }],


    "name": "德宏傣族景颇族自治州",
    "id": 533100 },

  {
    "children": [{
      "name": "泸水县",
      "id": 533321 },

    {
      "name": "福贡县",
      "id": 533323 },

    {
      "name": "贡山独龙族怒族自治县",
      "id": 533324 },

    {
      "name": "兰坪白族普米族自治县",
      "id": 533325 }],


    "name": "怒江傈僳族自治州",
    "id": 533300 },

  {
    "children": [{
      "name": "香格里拉县",
      "id": 533421 },

    {
      "name": "德钦县",
      "id": 533422 },

    {
      "name": "维西傈僳族自治县",
      "id": 533423 }],


    "name": "迪庆藏族自治州",
    "id": 533400 }] },



{
  "id": 540000,
  "name": "西藏自治区",
  "children": [{
    "children": [{
      "name": "市辖区",
      "id": 540101 },

    {
      "name": "城关区",
      "id": 540102 },

    {
      "name": "林周县",
      "id": 540121 },

    {
      "name": "当雄县",
      "id": 540122 },

    {
      "name": "尼木县",
      "id": 540123 },

    {
      "name": "曲水县",
      "id": 540124 },

    {
      "name": "堆龙德庆县",
      "id": 540125 },

    {
      "name": "达孜县",
      "id": 540126 },

    {
      "name": "墨竹工卡县",
      "id": 540127 }],


    "name": "拉萨市",
    "id": 540100 },

  {
    "children": [{
      "name": "昌都县",
      "id": 542121 },

    {
      "name": "江达县",
      "id": 542122 },

    {
      "name": "贡觉县",
      "id": 542123 },

    {
      "name": "类乌齐县",
      "id": 542124 },

    {
      "name": "丁青县",
      "id": 542125 },

    {
      "name": "察雅县",
      "id": 542126 },

    {
      "name": "八宿县",
      "id": 542127 },

    {
      "name": "左贡县",
      "id": 542128 },

    {
      "name": "芒康县",
      "id": 542129 },

    {
      "name": "洛隆县",
      "id": 542132 },

    {
      "name": "边坝县",
      "id": 542133 }],


    "name": "昌都地区",
    "id": 542100 },

  {
    "children": [{
      "name": "乃东县",
      "id": 542221 },

    {
      "name": "扎囊县",
      "id": 542222 },

    {
      "name": "贡嘎县",
      "id": 542223 },

    {
      "name": "桑日县",
      "id": 542224 },

    {
      "name": "琼结县",
      "id": 542225 },

    {
      "name": "曲松县",
      "id": 542226 },

    {
      "name": "措美县",
      "id": 542227 },

    {
      "name": "洛扎县",
      "id": 542228 },

    {
      "name": "加查县",
      "id": 542229 },

    {
      "name": "隆子县",
      "id": 542231 },

    {
      "name": "错那县",
      "id": 542232 },

    {
      "name": "浪卡子县",
      "id": 542233 }],


    "name": "山南地区",
    "id": 542200 },

  {
    "children": [{
      "name": "日喀则市",
      "id": 542301 },

    {
      "name": "南木林县",
      "id": 542322 },

    {
      "name": "江孜县",
      "id": 542323 },

    {
      "name": "定日县",
      "id": 542324 },

    {
      "name": "萨迦县",
      "id": 542325 },

    {
      "name": "拉孜县",
      "id": 542326 },

    {
      "name": "昂仁县",
      "id": 542327 },

    {
      "name": "谢通门县",
      "id": 542328 },

    {
      "name": "白朗县",
      "id": 542329 },

    {
      "name": "仁布县",
      "id": 542330 },

    {
      "name": "康马县",
      "id": 542331 },

    {
      "name": "定结县",
      "id": 542332 },

    {
      "name": "仲巴县",
      "id": 542333 },

    {
      "name": "亚东县",
      "id": 542334 },

    {
      "name": "吉隆县",
      "id": 542335 },

    {
      "name": "聂拉木县",
      "id": 542336 },

    {
      "name": "萨嘎县",
      "id": 542337 },

    {
      "name": "岗巴县",
      "id": 542338 }],


    "name": "日喀则地区",
    "id": 542300 },

  {
    "children": [{
      "name": "那曲县",
      "id": 542421 },

    {
      "name": "嘉黎县",
      "id": 542422 },

    {
      "name": "比如县",
      "id": 542423 },

    {
      "name": "聂荣县",
      "id": 542424 },

    {
      "name": "安多县",
      "id": 542425 },

    {
      "name": "申扎县",
      "id": 542426 },

    {
      "name": "索县",
      "id": 542427 },

    {
      "name": "班戈县",
      "id": 542428 },

    {
      "name": "巴青县",
      "id": 542429 },

    {
      "name": "尼玛县",
      "id": 542430 },

    {
      "name": "双湖县",
      "id": 542431 }],


    "name": "那曲地区",
    "id": 542400 },

  {
    "children": [{
      "name": "普兰县",
      "id": 542521 },

    {
      "name": "札达县",
      "id": 542522 },

    {
      "name": "噶尔县",
      "id": 542523 },

    {
      "name": "日土县",
      "id": 542524 },

    {
      "name": "革吉县",
      "id": 542525 },

    {
      "name": "改则县",
      "id": 542526 },

    {
      "name": "措勤县",
      "id": 542527 }],


    "name": "阿里地区",
    "id": 542500 },

  {
    "children": [{
      "name": "林芝县",
      "id": 542621 },

    {
      "name": "工布江达县",
      "id": 542622 },

    {
      "name": "米林县",
      "id": 542623 },

    {
      "name": "墨脱县",
      "id": 542624 },

    {
      "name": "波密县",
      "id": 542625 },

    {
      "name": "察隅县",
      "id": 542626 },

    {
      "name": "朗县",
      "id": 542627 }],


    "name": "林芝地区",
    "id": 542600 }] },



{
  "id": 610000,
  "name": "陕西省",
  "children": [{
    "children": [{
      "name": "市辖区",
      "id": 610101 },

    {
      "name": "新城区",
      "id": 610102 },

    {
      "name": "碑林区",
      "id": 610103 },

    {
      "name": "莲湖区",
      "id": 610104 },

    {
      "name": "灞桥区",
      "id": 610111 },

    {
      "name": "未央区",
      "id": 610112 },

    {
      "name": "雁塔区",
      "id": 610113 },

    {
      "name": "阎良区",
      "id": 610114 },

    {
      "name": "临潼区",
      "id": 610115 },

    {
      "name": "长安区",
      "id": 610116 },

    {
      "name": "蓝田县",
      "id": 610122 },

    {
      "name": "周至县",
      "id": 610124 },

    {
      "name": "户县",
      "id": 610125 },

    {
      "name": "高陵县",
      "id": 610126 }],


    "name": "西安市",
    "id": 610100 },

  {
    "children": [{
      "name": "市辖区",
      "id": 610201 },

    {
      "name": "王益区",
      "id": 610202 },

    {
      "name": "印台区",
      "id": 610203 },

    {
      "name": "耀州区",
      "id": 610204 },

    {
      "name": "宜君县",
      "id": 610222 }],


    "name": "铜川市",
    "id": 610200 },

  {
    "children": [{
      "name": "市辖区",
      "id": 610301 },

    {
      "name": "渭滨区",
      "id": 610302 },

    {
      "name": "金台区",
      "id": 610303 },

    {
      "name": "陈仓区",
      "id": 610304 },

    {
      "name": "凤翔县",
      "id": 610322 },

    {
      "name": "岐山县",
      "id": 610323 },

    {
      "name": "扶风县",
      "id": 610324 },

    {
      "name": "眉县",
      "id": 610326 },

    {
      "name": "陇县",
      "id": 610327 },

    {
      "name": "千阳县",
      "id": 610328 },

    {
      "name": "麟游县",
      "id": 610329 },

    {
      "name": "凤县",
      "id": 610330 },

    {
      "name": "太白县",
      "id": 610331 }],


    "name": "宝鸡市",
    "id": 610300 },

  {
    "children": [{
      "name": "市辖区",
      "id": 610401 },

    {
      "name": "秦都区",
      "id": 610402 },

    {
      "name": "杨陵区",
      "id": 610403 },

    {
      "name": "渭城区",
      "id": 610404 },

    {
      "name": "三原县",
      "id": 610422 },

    {
      "name": "泾阳县",
      "id": 610423 },

    {
      "name": "乾县",
      "id": 610424 },

    {
      "name": "礼泉县",
      "id": 610425 },

    {
      "name": "永寿县",
      "id": 610426 },

    {
      "name": "彬县",
      "id": 610427 },

    {
      "name": "长武县",
      "id": 610428 },

    {
      "name": "旬邑县",
      "id": 610429 },

    {
      "name": "淳化县",
      "id": 610430 },

    {
      "name": "武功县",
      "id": 610431 },

    {
      "name": "兴平市",
      "id": 610481 }],


    "name": "咸阳市",
    "id": 610400 },

  {
    "children": [{
      "name": "市辖区",
      "id": 610501 },

    {
      "name": "临渭区",
      "id": 610502 },

    {
      "name": "华县",
      "id": 610521 },

    {
      "name": "潼关县",
      "id": 610522 },

    {
      "name": "大荔县",
      "id": 610523 },

    {
      "name": "合阳县",
      "id": 610524 },

    {
      "name": "澄城县",
      "id": 610525 },

    {
      "name": "蒲城县",
      "id": 610526 },

    {
      "name": "白水县",
      "id": 610527 },

    {
      "name": "富平县",
      "id": 610528 },

    {
      "name": "韩城市",
      "id": 610581 },

    {
      "name": "华阴市",
      "id": 610582 }],


    "name": "渭南市",
    "id": 610500 },

  {
    "children": [{
      "name": "市辖区",
      "id": 610601 },

    {
      "name": "宝塔区",
      "id": 610602 },

    {
      "name": "延长县",
      "id": 610621 },

    {
      "name": "延川县",
      "id": 610622 },

    {
      "name": "子长县",
      "id": 610623 },

    {
      "name": "安塞县",
      "id": 610624 },

    {
      "name": "志丹县",
      "id": 610625 },

    {
      "name": "吴起县",
      "id": 610626 },

    {
      "name": "甘泉县",
      "id": 610627 },

    {
      "name": "富县",
      "id": 610628 },

    {
      "name": "洛川县",
      "id": 610629 },

    {
      "name": "宜川县",
      "id": 610630 },

    {
      "name": "黄龙县",
      "id": 610631 },

    {
      "name": "黄陵县",
      "id": 610632 }],


    "name": "延安市",
    "id": 610600 },

  {
    "children": [{
      "name": "市辖区",
      "id": 610701 },

    {
      "name": "汉台区",
      "id": 610702 },

    {
      "name": "南郑县",
      "id": 610721 },

    {
      "name": "城固县",
      "id": 610722 },

    {
      "name": "洋县",
      "id": 610723 },

    {
      "name": "西乡县",
      "id": 610724 },

    {
      "name": "勉县",
      "id": 610725 },

    {
      "name": "宁强县",
      "id": 610726 },

    {
      "name": "略阳县",
      "id": 610727 },

    {
      "name": "镇巴县",
      "id": 610728 },

    {
      "name": "留坝县",
      "id": 610729 },

    {
      "name": "佛坪县",
      "id": 610730 }],


    "name": "汉中市",
    "id": 610700 },

  {
    "children": [{
      "name": "市辖区",
      "id": 610801 },

    {
      "name": "榆阳区",
      "id": 610802 },

    {
      "name": "神木县",
      "id": 610821 },

    {
      "name": "府谷县",
      "id": 610822 },

    {
      "name": "横山县",
      "id": 610823 },

    {
      "name": "靖边县",
      "id": 610824 },

    {
      "name": "定边县",
      "id": 610825 },

    {
      "name": "绥德县",
      "id": 610826 },

    {
      "name": "米脂县",
      "id": 610827 },

    {
      "name": "佳县",
      "id": 610828 },

    {
      "name": "吴堡县",
      "id": 610829 },

    {
      "name": "清涧县",
      "id": 610830 },

    {
      "name": "子洲县",
      "id": 610831 }],


    "name": "榆林市",
    "id": 610800 },

  {
    "children": [{
      "name": "市辖区",
      "id": 610901 },

    {
      "name": "汉滨区",
      "id": 610902 },

    {
      "name": "汉阴县",
      "id": 610921 },

    {
      "name": "石泉县",
      "id": 610922 },

    {
      "name": "宁陕县",
      "id": 610923 },

    {
      "name": "紫阳县",
      "id": 610924 },

    {
      "name": "岚皋县",
      "id": 610925 },

    {
      "name": "平利县",
      "id": 610926 },

    {
      "name": "镇坪县",
      "id": 610927 },

    {
      "name": "旬阳县",
      "id": 610928 },

    {
      "name": "白河县",
      "id": 610929 }],


    "name": "安康市",
    "id": 610900 },

  {
    "children": [{
      "name": "市辖区",
      "id": 611001 },

    {
      "name": "商州区",
      "id": 611002 },

    {
      "name": "洛南县",
      "id": 611021 },

    {
      "name": "丹凤县",
      "id": 611022 },

    {
      "name": "商南县",
      "id": 611023 },

    {
      "name": "山阳县",
      "id": 611024 },

    {
      "name": "镇安县",
      "id": 611025 },

    {
      "name": "柞水县",
      "id": 611026 }],


    "name": "商洛市",
    "id": 611000 }] },



{
  "id": 620000,
  "name": "甘肃省",
  "children": [{
    "children": [{
      "name": "市辖区",
      "id": 620101 },

    {
      "name": "城关区",
      "id": 620102 },

    {
      "name": "七里河区",
      "id": 620103 },

    {
      "name": "西固区",
      "id": 620104 },

    {
      "name": "安宁区",
      "id": 620105 },

    {
      "name": "红古区",
      "id": 620111 },

    {
      "name": "永登县",
      "id": 620121 },

    {
      "name": "皋兰县",
      "id": 620122 },

    {
      "name": "榆中县",
      "id": 620123 }],


    "name": "兰州市",
    "id": 620100 },

  {
    "children": [{
      "name": "市辖区",
      "id": 620201 }],

    "name": "嘉峪关市",
    "id": 620200 },

  {
    "children": [{
      "name": "市辖区",
      "id": 620301 },

    {
      "name": "金川区",
      "id": 620302 },

    {
      "name": "永昌县",
      "id": 620321 }],


    "name": "金昌市",
    "id": 620300 },

  {
    "children": [{
      "name": "市辖区",
      "id": 620401 },

    {
      "name": "白银区",
      "id": 620402 },

    {
      "name": "平川区",
      "id": 620403 },

    {
      "name": "靖远县",
      "id": 620421 },

    {
      "name": "会宁县",
      "id": 620422 },

    {
      "name": "景泰县",
      "id": 620423 }],


    "name": "白银市",
    "id": 620400 },

  {
    "children": [{
      "name": "市辖区",
      "id": 620501 },

    {
      "name": "秦州区",
      "id": 620502 },

    {
      "name": "麦积区",
      "id": 620503 },

    {
      "name": "清水县",
      "id": 620521 },

    {
      "name": "秦安县",
      "id": 620522 },

    {
      "name": "甘谷县",
      "id": 620523 },

    {
      "name": "武山县",
      "id": 620524 },

    {
      "name": "张家川回族自治县",
      "id": 620525 }],


    "name": "天水市",
    "id": 620500 },

  {
    "children": [{
      "name": "市辖区",
      "id": 620601 },

    {
      "name": "凉州区",
      "id": 620602 },

    {
      "name": "民勤县",
      "id": 620621 },

    {
      "name": "古浪县",
      "id": 620622 },

    {
      "name": "天祝藏族自治县",
      "id": 620623 }],


    "name": "武威市",
    "id": 620600 },

  {
    "children": [{
      "name": "市辖区",
      "id": 620701 },

    {
      "name": "甘州区",
      "id": 620702 },

    {
      "name": "肃南裕固族自治县",
      "id": 620721 },

    {
      "name": "民乐县",
      "id": 620722 },

    {
      "name": "临泽县",
      "id": 620723 },

    {
      "name": "高台县",
      "id": 620724 },

    {
      "name": "山丹县",
      "id": 620725 }],


    "name": "张掖市",
    "id": 620700 },

  {
    "children": [{
      "name": "市辖区",
      "id": 620801 },

    {
      "name": "崆峒区",
      "id": 620802 },

    {
      "name": "泾川县",
      "id": 620821 },

    {
      "name": "灵台县",
      "id": 620822 },

    {
      "name": "崇信县",
      "id": 620823 },

    {
      "name": "华亭县",
      "id": 620824 },

    {
      "name": "庄浪县",
      "id": 620825 },

    {
      "name": "静宁县",
      "id": 620826 }],


    "name": "平凉市",
    "id": 620800 },

  {
    "children": [{
      "name": "市辖区",
      "id": 620901 },

    {
      "name": "肃州区",
      "id": 620902 },

    {
      "name": "金塔县",
      "id": 620921 },

    {
      "name": "瓜州县",
      "id": 620922 },

    {
      "name": "肃北蒙古族自治县",
      "id": 620923 },

    {
      "name": "阿克塞哈萨克族自治县",
      "id": 620924 },

    {
      "name": "玉门市",
      "id": 620981 },

    {
      "name": "敦煌市",
      "id": 620982 }],


    "name": "酒泉市",
    "id": 620900 },

  {
    "children": [{
      "name": "市辖区",
      "id": 621001 },

    {
      "name": "西峰区",
      "id": 621002 },

    {
      "name": "庆城县",
      "id": 621021 },

    {
      "name": "环县",
      "id": 621022 },

    {
      "name": "华池县",
      "id": 621023 },

    {
      "name": "合水县",
      "id": 621024 },

    {
      "name": "正宁县",
      "id": 621025 },

    {
      "name": "宁县",
      "id": 621026 },

    {
      "name": "镇原县",
      "id": 621027 }],


    "name": "庆阳市",
    "id": 621000 },

  {
    "children": [{
      "name": "市辖区",
      "id": 621101 },

    {
      "name": "安定区",
      "id": 621102 },

    {
      "name": "通渭县",
      "id": 621121 },

    {
      "name": "陇西县",
      "id": 621122 },

    {
      "name": "渭源县",
      "id": 621123 },

    {
      "name": "临洮县",
      "id": 621124 },

    {
      "name": "漳县",
      "id": 621125 },

    {
      "name": "岷县",
      "id": 621126 }],


    "name": "定西市",
    "id": 621100 },

  {
    "children": [{
      "name": "市辖区",
      "id": 621201 },

    {
      "name": "武都区",
      "id": 621202 },

    {
      "name": "成县",
      "id": 621221 },

    {
      "name": "文县",
      "id": 621222 },

    {
      "name": "宕昌县",
      "id": 621223 },

    {
      "name": "康县",
      "id": 621224 },

    {
      "name": "西和县",
      "id": 621225 },

    {
      "name": "礼县",
      "id": 621226 },

    {
      "name": "徽县",
      "id": 621227 },

    {
      "name": "两当县",
      "id": 621228 }],


    "name": "陇南市",
    "id": 621200 },

  {
    "children": [{
      "name": "临夏市",
      "id": 622901 },

    {
      "name": "临夏县",
      "id": 622921 },

    {
      "name": "康乐县",
      "id": 622922 },

    {
      "name": "永靖县",
      "id": 622923 },

    {
      "name": "广河县",
      "id": 622924 },

    {
      "name": "和政县",
      "id": 622925 },

    {
      "name": "东乡族自治县",
      "id": 622926 },

    {
      "name": "积石山保安族东乡族撒拉族自治县",
      "id": 622927 }],


    "name": "临夏回族自治州",
    "id": 622900 },

  {
    "children": [{
      "name": "合作市",
      "id": 623001 },

    {
      "name": "临潭县",
      "id": 623021 },

    {
      "name": "卓尼县",
      "id": 623022 },

    {
      "name": "舟曲县",
      "id": 623023 },

    {
      "name": "迭部县",
      "id": 623024 },

    {
      "name": "玛曲县",
      "id": 623025 },

    {
      "name": "碌曲县",
      "id": 623026 },

    {
      "name": "夏河县",
      "id": 623027 }],


    "name": "甘南藏族自治州",
    "id": 623000 }] },



{
  "id": 630000,
  "name": "青海省",
  "children": [{
    "children": [{
      "name": "市辖区",
      "id": 630101 },

    {
      "name": "城东区",
      "id": 630102 },

    {
      "name": "城中区",
      "id": 630103 },

    {
      "name": "城西区",
      "id": 630104 },

    {
      "name": "城北区",
      "id": 630105 },

    {
      "name": "大通回族土族自治县",
      "id": 630121 },

    {
      "name": "湟中县",
      "id": 630122 },

    {
      "name": "湟源县",
      "id": 630123 }],


    "name": "西宁市",
    "id": 630100 },

  {
    "children": [{
      "name": "乐都区",
      "id": 630202 },

    {
      "name": "平安县",
      "id": 630221 },

    {
      "name": "民和回族土族自治县",
      "id": 630222 },

    {
      "name": "互助土族自治县",
      "id": 630223 },

    {
      "name": "化隆回族自治县",
      "id": 630224 },

    {
      "name": "循化撒拉族自治县",
      "id": 630225 }],


    "name": "海东市",
    "id": 630200 },

  {
    "children": [{
      "name": "门源回族自治县",
      "id": 632221 },

    {
      "name": "祁连县",
      "id": 632222 },

    {
      "name": "海晏县",
      "id": 632223 },

    {
      "name": "刚察县",
      "id": 632224 }],


    "name": "海北藏族自治州",
    "id": 632200 },

  {
    "children": [{
      "name": "同仁县",
      "id": 632321 },

    {
      "name": "尖扎县",
      "id": 632322 },

    {
      "name": "泽库县",
      "id": 632323 },

    {
      "name": "河南蒙古族自治县",
      "id": 632324 }],


    "name": "黄南藏族自治州",
    "id": 632300 },

  {
    "children": [{
      "name": "共和县",
      "id": 632521 },

    {
      "name": "同德县",
      "id": 632522 },

    {
      "name": "贵德县",
      "id": 632523 },

    {
      "name": "兴海县",
      "id": 632524 },

    {
      "name": "贵南县",
      "id": 632525 }],


    "name": "海南藏族自治州",
    "id": 632500 },

  {
    "children": [{
      "name": "玛沁县",
      "id": 632621 },

    {
      "name": "班玛县",
      "id": 632622 },

    {
      "name": "甘德县",
      "id": 632623 },

    {
      "name": "达日县",
      "id": 632624 },

    {
      "name": "久治县",
      "id": 632625 },

    {
      "name": "玛多县",
      "id": 632626 }],


    "name": "果洛藏族自治州",
    "id": 632600 },

  {
    "children": [{
      "name": "玉树市",
      "id": 632701 },

    {
      "name": "杂多县",
      "id": 632722 },

    {
      "name": "称多县",
      "id": 632723 },

    {
      "name": "治多县",
      "id": 632724 },

    {
      "name": "囊谦县",
      "id": 632725 },

    {
      "name": "曲麻莱县",
      "id": 632726 }],


    "name": "玉树藏族自治州",
    "id": 632700 },

  {
    "children": [{
      "name": "格尔木市",
      "id": 632801 },

    {
      "name": "德令哈市",
      "id": 632802 },

    {
      "name": "乌兰县",
      "id": 632821 },

    {
      "name": "都兰县",
      "id": 632822 },

    {
      "name": "天峻县",
      "id": 632823 }],


    "name": "海西蒙古族藏族自治州",
    "id": 632800 }] },



{
  "id": 640000,
  "name": "宁夏回族自治区",
  "children": [{
    "children": [{
      "name": "市辖区",
      "id": 640101 },

    {
      "name": "兴庆区",
      "id": 640104 },

    {
      "name": "西夏区",
      "id": 640105 },

    {
      "name": "金凤区",
      "id": 640106 },

    {
      "name": "永宁县",
      "id": 640121 },

    {
      "name": "贺兰县",
      "id": 640122 },

    {
      "name": "灵武市",
      "id": 640181 }],


    "name": "银川市",
    "id": 640100 },

  {
    "children": [{
      "name": "市辖区",
      "id": 640201 },

    {
      "name": "大武口区",
      "id": 640202 },

    {
      "name": "惠农区",
      "id": 640205 },

    {
      "name": "平罗县",
      "id": 640221 }],


    "name": "石嘴山市",
    "id": 640200 },

  {
    "children": [{
      "name": "市辖区",
      "id": 640301 },

    {
      "name": "利通区",
      "id": 640302 },

    {
      "name": "红寺堡区",
      "id": 640303 },

    {
      "name": "盐池县",
      "id": 640323 },

    {
      "name": "同心县",
      "id": 640324 },

    {
      "name": "青铜峡市",
      "id": 640381 }],


    "name": "吴忠市",
    "id": 640300 },

  {
    "children": [{
      "name": "市辖区",
      "id": 640401 },

    {
      "name": "原州区",
      "id": 640402 },

    {
      "name": "西吉县",
      "id": 640422 },

    {
      "name": "隆德县",
      "id": 640423 },

    {
      "name": "泾源县",
      "id": 640424 },

    {
      "name": "彭阳县",
      "id": 640425 }],


    "name": "固原市",
    "id": 640400 },

  {
    "children": [{
      "name": "市辖区",
      "id": 640501 },

    {
      "name": "沙坡头区",
      "id": 640502 },

    {
      "name": "中宁县",
      "id": 640521 },

    {
      "name": "海原县",
      "id": 640522 }],


    "name": "中卫市",
    "id": 640500 }] },



{
  "id": 650000,
  "name": "新疆维吾尔自治区",
  "children": [{
    "children": [{
      "name": "市辖区",
      "id": 650101 },

    {
      "name": "天山区",
      "id": 650102 },

    {
      "name": "沙依巴克区",
      "id": 650103 },

    {
      "name": "新市区",
      "id": 650104 },

    {
      "name": "水磨沟区",
      "id": 650105 },

    {
      "name": "头屯河区",
      "id": 650106 },

    {
      "name": "达坂城区",
      "id": 650107 },

    {
      "name": "米东区",
      "id": 650109 },

    {
      "name": "乌鲁木齐县",
      "id": 650121 }],


    "name": "乌鲁木齐市",
    "id": 650100 },

  {
    "children": [{
      "name": "市辖区",
      "id": 650201 },

    {
      "name": "独山子区",
      "id": 650202 },

    {
      "name": "克拉玛依区",
      "id": 650203 },

    {
      "name": "白碱滩区",
      "id": 650204 },

    {
      "name": "乌尔禾区",
      "id": 650205 }],


    "name": "克拉玛依市",
    "id": 650200 },

  {
    "children": [{
      "name": "吐鲁番市",
      "id": 652101 },

    {
      "name": "鄯善县",
      "id": 652122 },

    {
      "name": "托克逊县",
      "id": 652123 }],


    "name": "吐鲁番地区",
    "id": 652100 },

  {
    "children": [{
      "name": "哈密市",
      "id": 652201 },

    {
      "name": "巴里坤哈萨克自治县",
      "id": 652222 },

    {
      "name": "伊吾县",
      "id": 652223 }],


    "name": "哈密地区",
    "id": 652200 },

  {
    "children": [{
      "name": "昌吉市",
      "id": 652301 },

    {
      "name": "阜康市",
      "id": 652302 },

    {
      "name": "呼图壁县",
      "id": 652323 },

    {
      "name": "玛纳斯县",
      "id": 652324 },

    {
      "name": "奇台县",
      "id": 652325 },

    {
      "name": "吉木萨尔县",
      "id": 652327 },

    {
      "name": "木垒哈萨克自治县",
      "id": 652328 }],


    "name": "昌吉回族自治州",
    "id": 652300 },

  {
    "children": [{
      "name": "博乐市",
      "id": 652701 },

    {
      "name": "阿拉山口市",
      "id": 652702 },

    {
      "name": "精河县",
      "id": 652722 },

    {
      "name": "温泉县",
      "id": 652723 }],


    "name": "博尔塔拉蒙古自治州",
    "id": 652700 },

  {
    "children": [{
      "name": "库尔勒市",
      "id": 652801 },

    {
      "name": "轮台县",
      "id": 652822 },

    {
      "name": "尉犁县",
      "id": 652823 },

    {
      "name": "若羌县",
      "id": 652824 },

    {
      "name": "且末县",
      "id": 652825 },

    {
      "name": "焉耆回族自治县",
      "id": 652826 },

    {
      "name": "和静县",
      "id": 652827 },

    {
      "name": "和硕县",
      "id": 652828 },

    {
      "name": "博湖县",
      "id": 652829 }],


    "name": "巴音郭楞蒙古自治州",
    "id": 652800 },

  {
    "children": [{
      "name": "阿克苏市",
      "id": 652901 },

    {
      "name": "温宿县",
      "id": 652922 },

    {
      "name": "库车县",
      "id": 652923 },

    {
      "name": "沙雅县",
      "id": 652924 },

    {
      "name": "新和县",
      "id": 652925 },

    {
      "name": "拜城县",
      "id": 652926 },

    {
      "name": "乌什县",
      "id": 652927 },

    {
      "name": "阿瓦提县",
      "id": 652928 },

    {
      "name": "柯坪县",
      "id": 652929 }],


    "name": "阿克苏地区",
    "id": 652900 },

  {
    "children": [{
      "name": "阿图什市",
      "id": 653001 },

    {
      "name": "阿克陶县",
      "id": 653022 },

    {
      "name": "阿合奇县",
      "id": 653023 },

    {
      "name": "乌恰县",
      "id": 653024 }],


    "name": "克孜勒苏柯尔克孜自治州",
    "id": 653000 },

  {
    "children": [{
      "name": "喀什市",
      "id": 653101 },

    {
      "name": "疏附县",
      "id": 653121 },

    {
      "name": "疏勒县",
      "id": 653122 },

    {
      "name": "英吉沙县",
      "id": 653123 },

    {
      "name": "泽普县",
      "id": 653124 },

    {
      "name": "莎车县",
      "id": 653125 },

    {
      "name": "叶城县",
      "id": 653126 },

    {
      "name": "麦盖提县",
      "id": 653127 },

    {
      "name": "岳普湖县",
      "id": 653128 },

    {
      "name": "伽师县",
      "id": 653129 },

    {
      "name": "巴楚县",
      "id": 653130 },

    {
      "name": "塔什库尔干塔吉克自治县",
      "id": 653131 }],


    "name": "喀什地区",
    "id": 653100 },

  {
    "children": [{
      "name": "和田市",
      "id": 653201 },

    {
      "name": "和田县",
      "id": 653221 },

    {
      "name": "墨玉县",
      "id": 653222 },

    {
      "name": "皮山县",
      "id": 653223 },

    {
      "name": "洛浦县",
      "id": 653224 },

    {
      "name": "策勒县",
      "id": 653225 },

    {
      "name": "于田县",
      "id": 653226 },

    {
      "name": "民丰县",
      "id": 653227 }],


    "name": "和田地区",
    "id": 653200 },

  {
    "children": [{
      "name": "伊宁市",
      "id": 654002 },

    {
      "name": "奎屯市",
      "id": 654003 },

    {
      "name": "伊宁县",
      "id": 654021 },

    {
      "name": "察布查尔锡伯自治县",
      "id": 654022 },

    {
      "name": "霍城县",
      "id": 654023 },

    {
      "name": "巩留县",
      "id": 654024 },

    {
      "name": "新源县",
      "id": 654025 },

    {
      "name": "昭苏县",
      "id": 654026 },

    {
      "name": "特克斯县",
      "id": 654027 },

    {
      "name": "尼勒克县",
      "id": 654028 }],


    "name": "伊犁哈萨克自治州",
    "id": 654000 },

  {
    "children": [{
      "name": "塔城市",
      "id": 654201 },

    {
      "name": "乌苏市",
      "id": 654202 },

    {
      "name": "额敏县",
      "id": 654221 },

    {
      "name": "沙湾县",
      "id": 654223 },

    {
      "name": "托里县",
      "id": 654224 },

    {
      "name": "裕民县",
      "id": 654225 },

    {
      "name": "和布克赛尔蒙古自治县",
      "id": 654226 }],


    "name": "塔城地区",
    "id": 654200 },

  {
    "children": [{
      "name": "阿勒泰市",
      "id": 654301 },

    {
      "name": "布尔津县",
      "id": 654321 },

    {
      "name": "富蕴县",
      "id": 654322 },

    {
      "name": "福海县",
      "id": 654323 },

    {
      "name": "哈巴河县",
      "id": 654324 },

    {
      "name": "青河县",
      "id": 654325 },

    {
      "name": "吉木乃县",
      "id": 654326 }],


    "name": "阿勒泰地区",
    "id": 654300 },

  {
    "children": [{
      "name": "石河子市",
      "id": 659001 },

    {
      "name": "阿拉尔市",
      "id": 659002 },

    {
      "name": "图木舒克市",
      "id": 659003 },

    {
      "name": "五家渠市",
      "id": 659004 }],


    "name": "自治区直辖县级行政区划",
    "id": 659000 }] },



{
  "id": 810000,
  "name": "香港特别行政区",
  "children": [{
    "children": [{
      "name": "香港特别行政区",
      "id": 810000 }],

    "name": "香港特别行政区",
    "id": 810000 }] },


{
  "id": 820000,
  "name": "澳门特别行政区",
  "children": [{
    "children": [{
      "name": "澳门特别行政区",
      "id": 820000 }],

    "name": "澳门特别行政区",
    "id": 820000 }] }];var _default =




data = data;exports.default = _default;

/***/ }),

/***/ 199:
/*!******************************************************************!*\
  !*** G:/work/洁利来h5商城/js_sdk/graceui-dataChecker/graceChecker.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                     数据验证（表单验证）
                                                                                                     来自 grace.hcoder.net 
                                                                                                     作者 hcoder 深海
                                                                                                     
                                                                                                     版权声明 : 
                                                                                                     GraceUI 的版权约束是不能转售或者将 GraceUI 直接发布到公开渠道！
                                                                                                     侵权必究，请遵守版权约定！
                                                                                                     */
var obj = {
  error: '',
  check: function check(data, rule) {
    for (var i = 0; i < rule.length; i++) {
      if (!rule[i].checkType) {return true;}
      if (!rule[i].name) {return true;}
      if (!rule[i].errorMsg) {return true;}
      if (!data[rule[i].name]) {this.error = rule[i].errorMsg;return false;}
      switch (rule[i].checkType) {
        case 'string':
          var reg = new RegExp('^.{' + rule[i].checkRule + '}$');
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          break;
        case 'int':
          var reg = new RegExp('^(-[1-9]|[1-9])[0-9]{' + rule[i].checkRule + '}$');
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          break;
          break;
        case 'between':
          if (!this.isNumber(data[rule[i].name])) {
            this.error = rule[i].errorMsg;
            return false;
          }
          var minMax = rule[i].checkRule.split(',');
          minMax[0] = Number(minMax[0]);
          minMax[1] = Number(minMax[1]);
          if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
            this.error = rule[i].errorMsg;
            return false;
          }
          break;
        case 'betweenD':
          var reg = /^-?[1-9][0-9]?$/;
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          var minMax = rule[i].checkRule.split(',');
          minMax[0] = Number(minMax[0]);
          minMax[1] = Number(minMax[1]);
          if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
            this.error = rule[i].errorMsg;
            return false;
          }
          break;
        case 'betweenF':
          var reg = /^-?[0-9][0-9]?.+[0-9]+$/;
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          var minMax = rule[i].checkRule.split(',');
          minMax[0] = Number(minMax[0]);
          minMax[1] = Number(minMax[1]);
          if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
            this.error = rule[i].errorMsg;
            return false;
          }
          break;
        case 'same':
          if (data[rule[i].name] != rule[i].checkRule) {this.error = rule[i].errorMsg;return false;}
          break;
        case 'notsame':
          if (data[rule[i].name] == rule[i].checkRule) {this.error = rule[i].errorMsg;return false;}
          break;
        case 'email':
          var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          break;
        case 'phoneno':
          var reg = /^1[0-9]{10,10}$/;
          // alert(reg.test(data[rule[i].name]))
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          break;
        case 'zipcode':
          var reg = /^[0-9]{6}$/;
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          break;
        case 'reg':
          var reg = new RegExp(rule[i].checkRule);
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          break;
        case 'in':
          if (rule[i].checkRule.indexOf(data[rule[i].name]) == -1) {
            this.error = rule[i].errorMsg;return false;
          }
          break;
        case 'notnull':
          if (data[rule[i].name] == null || data[rule[i].name].length < 1) {this.error = rule[i].errorMsg;return false;}
          break;}

    }
    return true;
  },
  isNumber: function isNumber(checkVal) {
    checkVal = Number(checkVal);
    if (checkVal == NaN) {return false;}
    return true;
  } };var _default =


obj = obj;exports.default = _default;

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 21:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 22:
/*!********************************************!*\
  !*** G:/work/洁利来h5商城/static/defaultSet.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var set = {
  "service_mobile": "059183612095",
  "rechargeStatus": [{
    "Value": "0",
    "Text": "待支付" },

  {
    "Value": "1",
    "Text": "已支付" }],


  "projectStatus": [{
    "Value": "0",
    "Text": "待审核" },

  {
    "Value": "1",
    "Text": "已上架" },

  {
    "Value": "2",
    "Text": "未通过" },

  {
    "Value": "9",
    "Text": "已下架" }],


  "payType": [{
    "Value": "0",
    "Text": "微信" },
  {
    "Value": "1",
    "Text": "支付宝" },
  {
    "Value": "2",
    "Text": "购物券" }],

  "detailType": [{
    "Value": "0",
    "Text": "余额收入明细" },
  {
    "Value": "1",
    "Text": "余额支出明细" },
  {
    "Value": "2",
    "Text": "购物券券收入明细" },
  {
    "Value": "3",
    "Text": "购物券券支出明细" }],

  "orderStatus": [{
    "Value": "0",
    "Text": "待付款" },
  {
    "Value": "1",
    "Text": "待发货" },
  {
    "Value": "2",
    "Text": "待收货" },
  {
    "Value": "3",
    "Text": "待评价" },
  {
    "Value": "4",
    "Text": "待退款" },
  {
    "Value": "5",
    "Text": "交易成功" },
  {
    "Value": "9",
    "Text": "交易关闭" }],

  "orderRefund": [],
  "auditStatus": [{
    "Value": "0",
    "Text": "待商家审核" },
  {
    "Value": "1",
    "Text": "待商家收货" },
  {
    "Value": "2",
    "Text": "商家拒绝" },
  {
    "Value": "3",
    "Text": "商家通过审核" },
  {
    "Value": "4",
    "Text": "用户取消退款" },
  {
    "Value": "5",
    "Text": "商家退款成功" }],

  "refundType": [{
    "Value": "0",
    "Text": "退款 " },
  {
    "Value": "1",
    "Text": "退货退款" }],

  "refundPayStatus": [{
    "Value": "0",
    "Text": "待支付" },
  {
    "Value": "1",
    "Text": "支付成功" },
  {
    "Value": "2",
    "Text": "支付失败" }],

  "refundPayType": [{
    "Value": "1",
    "Text": "原路返回" },
  {
    "Value": "2",
    "Text": "线下支付" },
  {
    "Value": "3",
    "Text": "退到预付款" }],

  "classList": [{
    "class_code": "174a73b64ed840e3889029b3cb917357",
    "class_name": "感应洁具",
    "class_logo": "http://h5.gllo.com.cn/upload/shopclasslogo/4F2A13B32488DF889250C2F0A77724AD.png",
    "class_descript": "感应洁具" },
  {
    "class_code": "40df750b4e2149c08698d2a2292275f3",
    "class_name": "水龙头",
    "class_logo": "http://h5.gllo.com.cn/upload/shopclasslogo/545B0CA76C593F1A2D2288D85C72677.png",
    "class_descript": "水龙头" },
  {
    "class_code": "58bacbcdc23245e48e3f54edfd70e8b4",
    "class_name": "马桶",
    "class_logo": "http://h5.gllo.com.cn/upload/shopclasslogo/9D2F051FAEFD0B26B5CDF8A3D45D1AF.png",
    "class_descript": "马桶" },
  {
    "class_code": "6a5be108765441fea4c3f3342e956d1e",
    "class_name": "花洒系列",
    "class_logo": "http://h5.gllo.com.cn/upload/shopclasslogo/D55C1CC49E92B48618E1E870C4814C8F.png",
    "class_descript": "花洒系列" }],

  "fatherClassList": [{
    "class_code": "174a73b64ed840e3889029b3cb917357",
    "class_name": "感应洁具",
    "class_logo": "http://h5.gllo.com.cn/upload/shopclasslogo/4F2A13B32488DF889250C2F0A77724AD.png",
    "class_descript": "感应洁具" },
  {
    "class_code": "40df750b4e2149c08698d2a2292275f3",
    "class_name": "水龙头",
    "class_logo": "http://h5.gllo.com.cn/upload/shopclasslogo/545B0CA76C593F1A2D2288D85C72677.png",
    "class_descript": "水龙头" },
  {
    "class_code": "58bacbcdc23245e48e3f54edfd70e8b4",
    "class_name": "马桶",
    "class_logo": "http://h5.gllo.com.cn/upload/shopclasslogo/9D2F051FAEFD0B26B5CDF8A3D45D1AF.png",
    "class_descript": "马桶" },
  {
    "class_code": "6a5be108765441fea4c3f3342e956d1e",
    "class_name": "花洒系列",
    "class_logo": "http://h5.gllo.com.cn/upload/shopclasslogo/D55C1CC49E92B48618E1E870C4814C8F.png",
    "class_descript": "花洒系列" },
  {
    "class_code": "257eebee16c2456597ca8534ad4d283b",
    "class_name": "配件/挂件",
    "class_logo": "http://h5.gllo.com.cn/upload/shopclasslogo/2C1C7F5EF8FE405A40ADC8C9266D84BF.png",
    "class_descript": "配件" },
  {
    "class_code": "4a24ebc16e6d4ded86081ff77ba9acbe",
    "class_name": "其他",
    "class_logo": "",
    "class_descript": "" }],

  "banerList": [{
    "Text": "http://h5.gllo.com.cn/upload/cmslinkimage/879686C29035716E179D52E99ECE9FAB.jpg",
    "Url": "/pages/classify/products/products?type=1",
    "Value": "龙头专区" },
  {
    "Text": "http://h5.gllo.com.cn/upload/cmslinkimage/1FBCF99869ABE49D1EDE857C88FECB8.jpg",
    "Url": "/pages/classify/products/products?type=3",
    "Value": "花洒专区" },
  {
    "Text": "http://h5.gllo.com.cn/upload/cmslinkimage/16062E891B0BE58D24DAE4CFCD75937.jpg",
    "Url": "/pages/classify/products/products?type=2",
    "Value": "智能马桶专区" }],

  "iconList": [{
    "Value": "4",
    "Text": "http://h5.gllo.com.cn/upload/cmslinkimage/4E6F28FC8DED157F5BEC9AA8D61CEA6.png" },
  {
    "Value": "3",
    "Text": "http://h5.gllo.com.cn/upload/cmslinkimage/81C9925C9E4D12E6E481973631E3C6C.png" },
  {
    "Value": "2",
    "Text": "http://h5.gllo.com.cn/upload/cmslinkimage/D1FD9EBE70E47F7499107E7471915150.png" },
  {
    "Value": "1",
    "Text": "http://h5.gllo.com.cn/upload/cmslinkimage/38241656FDA8C4F844B265653BAC373.png" }],

  "indexGoodsList": [{
    "Value": "4cb5889c315540b4aa4e7ec16d166de0",
    "Text": "http://h5.gllo.com.cn/upload/cmslinkimage/23419D3FCFF41D17E540747DF9FF6.jpg" },
  {
    "Value": "722f992f104e4e1f91505ff255b61e00",
    "Text": "http://h5.gllo.com.cn/upload/cmslinkimage/36BA0B571D368C3394C4437D6C6222.jpg" },
  {
    "Value": "bc1f6cefb75d4897ac3df86da02e2be5",
    "Text": "http://h5.gllo.com.cn/upload/cmslinkimage/77BC59FF848379C3BE525A4D35B79A9D.jpg" },
  {
    "Value": "6e13bf0a62c441b596a8df4ae272c457",
    "Text": "http://h5.gllo.com.cn/upload/cmslinkimage/26BDD6D99914250722CDE99210A9CCB.jpg" }],

  "project_service1": [{
    "Value": "d4863b21098648a1b5637f402c1af139",
    "Text": "送货入户",
    "price": 0.0 },
  {
    "Value": "4e858f482ef34c1d92cc7cd6d6207bc9",
    "Text": "上门安装",
    "price": 53.35 },
  {
    "Value": "5c7f30cfdb7d43af84e63745266901fb",
    "Text": "送货入户并安装",
    "price": 76.0 }],

  "project_service2": [{
    "Value": "c8c2a6efbc5d479c907a6c2e1ecee7e0",
    "Text": "全面保修二年",
    "price": 260.0 },
  {
    "Value": "b630b784555c49a4a33cb3996a0b5e50",
    "Text": "全面保修三年",
    "price": 288.0 }],

  "project_service3": [{
    "Value": "d9580f1dc11342ce9d3db79dd8ff6208",
    "Text": "意外保修三年",
    "price": 212.0 },
  {
    "Value": "fcfadfddb8e741d2bc52dfe6eeca878f",
    "Text": "意外保修二年",
    "price": 231.0 }],

  "pay_route": [{
    "Value": "CCB",
    "Text": "建设银行" },
  {
    "Value": "test",
    "Text": "测试" }],

  "is_refund": [{
    "Value": "0",
    "Text": "未退款" },
  {
    "Value": "1",
    "Text": "退款中" },
  {
    "Value": "2",
    "Text": "退款失败" },
  {
    "Value": "3",
    "Text": "退款成功" },
  {
    "Value": "4",
    "Text": "取消退款" }] };var _default =



set;exports.default = _default;

/***/ }),

/***/ 232:
/*!**************************************!*\
  !*** G:/work/洁利来h5商城/utils/banks.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var list = [
// {
// 	value: 'CDB',
// 	text: '国家开发银行'
// },
{
  value: 'ICBC',
  text: '中国工商银行' },

{
  value: 'ABC',
  text: '中国农业银行' },

{
  value: 'BOC',
  text: '中国银行' },

{
  value: 'CCB',
  text: '中国建设银行' },

{
  value: 'PSBC',
  text: '中国邮政储蓄银行' },

{
  value: 'COMM',
  text: '交通银行' },

{
  value: 'CMB',
  text: '招商银行' },

{
  value: 'SPDB',
  text: '上海浦东发展银行' },

{
  value: 'CIB',
  text: '兴业银行' },

{
  value: 'HXBANK',
  text: '华夏银行' },

{
  value: 'GDB',
  text: '广东发展银行' },

{
  value: 'CMBC',
  text: '中国民生银行' },

{
  value: 'CITIC',
  text: '中信银行' },

{
  value: 'CEB',
  text: '中国光大银行' },

// {
// 	value: 'EGBANK',
// 	text: '恒丰银行'
// },
// {
// 	value: 'CZBANK',
// 	text: '浙商银行'
// },
// {
// 	value: 'BOHAIB',
// 	text: '渤海银行'
// },
{
  value: 'SPABANK',
  text: '平安银行' },

// {
// 	value: 'SHRCB',
// 	text: '上海农村商业银行'
// },
// {
// 	value: 'YXCCB',
// 	text: '玉溪市商业银行'
// },
// {
// 	value: 'YDRCB',
// 	text: '尧都农商行'
// },
// {
// 	value: 'BJBANK',
// 	text: '北京银行'
// },
// {
// 	value: 'SHBANK',
// 	text: '上海银行'
// },
// {
// 	value: 'JSBANK',
// 	text: '江苏银行'
// },
// {
// 	value: 'HZCB',
// 	text: '杭州银行'
// },
// {
// 	value: 'NJCB',
// 	text: '南京银行'
// },
// {
// 	value: 'NBBANK',
// 	text: '宁波银行'
// },
// {
// 	value: 'HSBANK',
// 	text: '徽商银行'
// },
// {
// 	value: 'CSCB',
// 	text: '长沙银行'
// },
// {
// 	value: 'CDCB',
// 	text: '成都银行'
// },
// {
// 	value: 'CQBANK',
// 	text: '重庆银行'
// },
// {
// 	value: 'DLB',
// 	text: '大连银行'
// },
// {
// 	value: 'NCB',
// 	text: '南昌银行'
// },
{
  value: 'FJHXBC',
  text: '福建海峡银行' }

// {
// 	value: 'HKB',
// 	text: '汉口银行'
// },
// {
// 	value: 'WZCB',
// 	text: '温州银行'
// },
// {
// 	value: 'QDCCB',
// 	text: '青岛银行'
// },
// {
// 	value: 'TZCB',
// 	text: '台州银行'
// },
// {
// 	value: 'JXBANK',
// 	text: '嘉兴银行'
// },
// {
// 	value: 'CSRCB',
// 	text: '常熟农村商业银行'
// },
// {
// 	value: 'NHB',
// 	text: '南海农村信用联社'
// },
// {
// 	value: 'CZRCB',
// 	text: '常州农村信用联社'
// },
// {
// 	value: 'H3CB',
// 	text: '内蒙古银行'
// },
// {
// 	value: 'SXCB',
// 	text: '绍兴银行'
// },
// {
// 	value: 'SDEB',
// 	text: '顺德农商银行'
// },
// {
// 	value: 'WJRCB',
// 	text: '吴江农商银行'
// },
// {
// 	value: 'ZBCB',
// 	text: '齐商银行'
// },
// {
// 	value: 'GYCB',
// 	text: '贵阳市商业银行'
// },
// {
// 	value: 'ZYCBANK',
// 	text: '遵义市商业银行'
// },
// {
// 	value: 'HZCCB',
// 	text: '湖州市商业银行'
// },
// {
// 	value: 'DAQINGB',
// 	text: '龙江银行'
// },
// {
// 	value: 'JINCHB',
// 	text: '晋城银行JCBANK'
// },
// {
// 	value: 'ZJTLCB',
// 	text: '浙江泰隆商业银行'
// },
// {
// 	value: 'GDRCC',
// 	text: '广东省农村信用社联合社'
// },
// {
// 	value: 'DRCBCL',
// 	text: '东莞农村商业银行'
// },
// {
// 	value: 'MTBANK',
// 	text: '浙江民泰商业银行'
// },
// {
// 	value: 'GCB',
// 	text: '广州银行'
// },
// {
// 	value: 'LYCB',
// 	text: '辽阳市商业银行'
// },
// {
// 	value: 'JSRCU',
// 	text: '江苏省农村信用联合社'
// },
// {
// 	value: 'LANGFB',
// 	text: '廊坊银行'
// },
// {
// 	value: 'CZCB',
// 	text: '浙江稠州商业银行'
// },
// {
// 	value: 'DYCB',
// 	text: '德阳商业银行'
// },
// {
// 	value: 'JZBANK',
// 	text: '晋中市商业银行'
// },
// {
// 	value: 'BOSZ',
// 	text: '苏州银行'
// },
// {
// 	value: 'GLBANK',
// 	text: '桂林银行'
// },
// {
// 	value: 'URMQCCB',
// 	text: '乌鲁木齐市商业银行'
// },
// {
// 	value: 'CDRCB',
// 	text: '成都农商银行'
// },
// {
// 	value: 'ZRCBANK',
// 	text: '张家港农村商业银行'
// },
// {
// 	value: 'BOD',
// 	text: '东莞银行'
// },
// {
// 	value: 'LSBANK',
// 	text: '莱商银行'
// },
// {
// 	value: 'BJRCB',
// 	text: '北京农村商业银行'
// },
// {
// 	value: 'TRCB',
// 	text: '天津农商银行'
// },
// {
// 	value: 'SRBANK',
// 	text: '上饶银行'
// },
// {
// 	value: 'FDB',
// 	text: '富滇银行'
// },
// {
// 	value: 'CRCBANK',
// 	text: '重庆农村商业银行'
// },
// {
// 	value: 'ASCB',
// 	text: '鞍山银行'
// },
// {
// 	value: 'NXBANK',
// 	text: '宁夏银行'
// },
// {
// 	value: 'BHB',
// 	text: '河北银行'
// },
// {
// 	value: 'HRXJB',
// 	text: '华融湘江银行'
// },
// {
// 	value: 'ZGCCB',
// 	text: '自贡市商业银行'
// },
// {
// 	value: 'YNRCC',
// 	text: '云南省农村信用社'
// },
// {
// 	value: 'JLBANK',
// 	text: '吉林银行'
// },
// {
// 	value: 'DYCCB',
// 	text: '东营市商业银行'
// },
// {
// 	value: 'KLB',
// 	text: '昆仑银行'
// },
// {
// 	value: 'ORBANK',
// 	text: '鄂尔多斯银行'
// },
// {
// 	value: 'XTB',
// 	text: '邢台银行'
// },
// {
// 	value: 'JSB',
// 	text: '晋商银行'
// },
// {
// 	value: 'TCCB',
// 	text: '天津银行'
// },
// {
// 	value: 'BOYK',
// 	text: '营口银行'
// },
// {
// 	value: 'JLRCU',
// 	text: '吉林农信'
// },
// {
// 	value: 'SDRCU',
// 	text: '山东农信'
// },
// {
// 	value: 'XABANK',
// 	text: '西安银行'
// },
// {
// 	value: 'HBRCU',
// 	text: '河北省农村信用社'
// },
// {
// 	value: 'NXRCU',
// 	text: '宁夏黄河农村商业银行'
// },
// {
// 	value: 'GZRCU',
// 	text: '贵州省农村信用社'
// },
// {
// 	value: 'FXCB',
// 	text: '阜新银行'
// },
// {
// 	value: 'HBHSBANK',
// 	text: '湖北银行黄石分行'
// },
// {
// 	value: 'ZJNX',
// 	text: '浙江省农村信用社联合社'
// },
// {
// 	value: 'XXBANK',
// 	text: '新乡银行'
// },
// {
// 	value: 'HBYCBANK',
// 	text: '湖北银行宜昌分行'
// },
// {
// 	value: 'LSCCB',
// 	text: '乐山市商业银行'
// },
// {
// 	value: 'TCRCB',
// 	text: '江苏太仓农村商业银行'
// },
// {
// 	value: 'BZMD',
// 	text: '驻马店银行'
// },
// {
// 	value: 'GZB',
// 	text: '赣州银行'
// },
// {
// 	value: 'WRCB',
// 	text: '无锡农村商业银行'
// },
// {
// 	value: 'BGB',
// 	text: '广西北部湾银行'
// },
// {
// 	value: 'GRCB',
// 	text: '广州农商银行'
// },
// {
// 	value: 'JRCB',
// 	text: '江苏江阴农村商业银行'
// },
// {
// 	value: 'BOP',
// 	text: '平顶山银行'
// },
// {
// 	value: 'TACCB',
// 	text: '泰安市商业银行'
// },
// {
// 	value: 'CGNB',
// 	text: '南充市商业银行'
// },
// {
// 	value: 'CCQTGB',
// 	text: '重庆三峡银行'
// },
// {
// 	value: 'XLBANK',
// 	text: '中山小榄村镇银行'
// },
// {
// 	value: 'HDBANK',
// 	text: '邯郸银行'
// },
// {
// 	value: 'KORLABANK',
// 	text: '库尔勒市商业银行'
// },
// {
// 	value: 'BOJZ',
// 	text: '锦州银行'
// },
// {
// 	value: 'QLBANK',
// 	text: '齐鲁银行'
// },
// {
// 	value: 'BOQH',
// 	text: '青海银行'
// },
// {
// 	value: 'YQCCB',
// 	text: '阳泉银行'
// },
// {
// 	value: 'SJBANK',
// 	text: '盛京银行'
// },
// {
// 	value: 'FSCB',
// 	text: '抚顺银行'
// },
// {
// 	value: 'ZZBANK',
// 	text: '郑州银行'
// },
// {
// 	value: 'SRCB',
// 	text: '深圳农村商业银行'
// },
// {
// 	value: 'BANKWF',
// 	text: '潍坊银行'
// },
// {
// 	value: 'JJBANK',
// 	text: '九江银行'
// },
// {
// 	value: 'JXRCU',
// 	text: '江西省农村信用'
// },
// {
// 	value: 'HNRCU',
// 	text: '河南省农村信用'
// },
// {
// 	value: 'GSRCU',
// 	text: '甘肃省农村信用'
// },
// {
// 	value: 'SCRCU',
// 	text: '四川省农村信用'
// },
// {
// 	value: 'GXRCU',
// 	text: '广西省农村信用'
// },
// {
// 	value: 'SXRCCU',
// 	text: '陕西信合'
// },
// {
// 	value: 'WHRCB',
// 	text: '武汉农村商业银行'
// },
// {
// 	value: 'YBCCB',
// 	text: '宜宾市商业银行'
// },
// {
// 	value: 'KSRB',
// 	text: '昆山农村商业银行'
// },
// {
// 	value: 'SZSBK',
// 	text: '石嘴山银行'
// },
// {
// 	value: 'HSBK',
// 	text: '衡水银行'
// },
// {
// 	value: 'XYBANK',
// 	text: '信阳银行'
// },
// {
// 	value: 'NBYZ',
// 	text: '鄞州银行'
// },
// {
// 	value: 'ZJKCCB',
// 	text: '张家口市商业银行'
// },
// {
// 	value: 'XCYH',
// 	text: '许昌银行'
// },
// {
// 	value: 'JNBANK',
// 	text: '济宁银行'
// },
// {
// 	value: 'CBKF',
// 	text: '开封市商业银行'
// },
// {
// 	value: 'WHCCB',
// 	text: '威海市商业银行'
// },
// {
// 	value: 'HBC',
// 	text: '湖北银行'
// },
// {
// 	value: 'BOCD',
// 	text: '承德银行'
// },
// {
// 	value: 'BODD',
// 	text: '丹东银行'
// },
// {
// 	value: 'JHBANK',
// 	text: '金华银行'
// },
// {
// 	value: 'BOCY',
// 	text: '朝阳银行'
// },
// {
// 	value: 'LSBC',
// 	text: '临商银行'
// },
// {
// 	value: 'BSB',
// 	text: '包商银行'
// },
// {
// 	value: 'LZYH',
// 	text: '兰州银行'
// },
// {
// 	value: 'BOZK',
// 	text: '周口银行'
// },
// {
// 	value: 'DZBANK',
// 	text: '德州银行'
// },
// {
// 	value: 'SCCB',
// 	text: '三门峡银行'
// },
// {
// 	value: 'AYCB',
// 	text: '安阳银行'
// },
// {
// 	value: 'ARCU',
// 	text: '安徽省农村信用社'
// },
// {
// 	value: 'HURCB',
// 	text: '湖北省农村信用社'
// },
// {
// 	value: 'HNRCC',
// 	text: '湖南省农村信用社'
// },
// {
// 	value: 'NYNB',
// 	text: '广东南粤银行'
// },
// {
// 	value: 'LYBANK',
// 	text: '洛阳银行'
// },
// {
// 	value: 'NHQS',
// 	text: '农信银清算中心'
// },
// {
// 	value: 'CBBQS',
// 	text: '城市商业银行资金清算中心'
// }
];var _default =

list;exports.default = _default;

/***/ }),

/***/ 257:
/*!***************************************************************************!*\
  !*** G:/work/洁利来h5商城/js_sdk/junyi-h5-copy/junyi-h5-copy/junyi-h5-copy.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = h5Copy;function h5Copy(content) {

  if (!document.queryCommandSupported('copy')) {
    // 不支持
    return false;
  }

  var textarea = document.createElement("textarea");
  textarea.value = content;
  textarea.readOnly = "readOnly";
  document.body.appendChild(textarea);
  textarea.select(); // 选择对象
  textarea.setSelectionRange(0, content.length); //核心
  var result = document.execCommand("copy"); // 执行浏览器复制命令
  textarea.remove();
  return result;

}

/***/ }),

/***/ 29:
/*!**************************************!*\
  !*** G:/work/洁利来h5商城/utils/utils.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _SET = _interopRequireDefault(__webpack_require__(/*! ../SET.js */ 15));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var Utils = {
  phoneCheck: function phoneCheck(value) {
    var reg = /^1\d{10}$/;
    var r = reg.test(value);
    return r;
  },
  passCheck: function passCheck(val) {
    var patrn = /^(\w){6,20}$/;
    if (!patrn.exec(val)) return false;
    return true;
  },
  // 银行卡校验
  bankCardCheck: function bankCardCheck(val) {
    var patrn = /^([1-9]{1})(\d{15}|\d{18})$/;
    if (!patrn.test(val)) return false;
    return true;
  },
  // 中文字符
  chineseCheck: function chineseCheck(val) {
    var patrn = /^[\u4E00-\u9FA5]{2,4}/;

    if (!patrn.test(val)) return false;
    return true;
  },
  // 银行卡数字加密
  encryptBankCode: function encryptBankCode(val) {

    var str = val.replace(/\s/g, '');
    console.log(str);
    var reg = /^(\d{4})\d+(\d{4})$/;
    str.replace(reg, "$1 **** **** $2");
    console.log(str);
    return str;
  },


  /**
      * Parse the time to string
      * @param {(Object|string|number)} time
      * @param {string} cFormat
      * @returns {string}
      */
  parseTime: function parseTime(time, cFormat) {
    if (arguments.length === 0) {
      return null;
    }
    var format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    var date;
    if (typeof time === 'object') {
      date = time;
    } else {
      if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
        time = parseInt(time);
      }
      if (typeof time === 'number' && time.toString().length === 10) {
        time = time * 1000;
      }
      date = new Date(time);
    }
    var formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay() };

    var time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, function (result, key) {
      var value = formatObj[key];
      // Note: getDay() returns 0 on Sunday
      if (key === 'a') {
        return ['日', '一', '二', '三', '四', '五', '六'][value];
      }
      if (result.length > 0 && value < 10) {
        value = '0' + value;
      }
      return value || 0;
    });
    return time_str;
  },

  /**
      * @param {number} time
      * @param {string} option
      * @returns {string}
      */
  formatTime: function formatTime(time, option) {
    if (('' + time).length === 10) {
      time = parseInt(time) * 1000;
    } else {
      time = +time;
    }
    var d = new Date(time);
    var now = Date.now();

    var diff = (now - d) / 1000;

    if (diff < 30) {
      return '刚刚';
    } else if (diff < 3600) {
      // less 1 hour
      return Math.ceil(diff / 60) + '分钟前';
    } else if (diff < 3600 * 24) {
      return Math.ceil(diff / 3600) + '小时前';
    } else if (diff < 3600 * 24 * 2) {
      return '1天前';
    }
    if (option) {
      return parseTime(time, option);
    } else {
      return (
        d.getMonth() +
        1 +
        '月' +
        d.getDate() +
        '日' +
        d.getHours() +
        '时' +
        d.getMinutes() +
        '分');

    }
  },
  /**
      * @param {string} type
      * @returns {Date}
      */
  getTime: function getTime(type) {
    if (type === 'start') {
      return new Date().getTime() - 3600 * 1000 * 24 * 90;
    } else {
      return new Date(new Date().toDateString());
    }
  },

  // 记录本地足迹
  // setTrace(item) {
  // 	let list = uni.getStorageSync('kxTraceList');
  // 	if (list) {
  // 		list = JSON.parse(list)
  // 	} else {
  // 		list = {}
  // 	}
  // 	console.log('存入足迹')
  // 	// 判断该记录书是否存在
  // 	let time = new Date().getTime()
  // 	let id = item.code
  // 	item.time = time
  // 	list[id] = item
  // 	uni.setStorageSync('kxTraceList', JSON.stringify(list));
  // },
  // // 获取足迹
  // getTrace() {
  // 	let list = uni.getStorageSync('kxTraceList');
  // 	if (list) {
  // 		return (JSON.parse(list))
  // 	} else {
  // 		return []
  // 	}

  // },
  // // 清除所有足迹
  // clearTrace() {
  // 	uni.removeStorageSync('kxTraceList');
  // },

  // 支付宝支付
  AliPay: function AliPay(strData, callback, failFun) {
    if (!strData) {
      uni.showToast({
        icon: 'none',
        title: '支付参数无效' });

      return;
    }
    uni.requestPayment({
      provider: "alipay",
      orderInfo: strData,
      success: function success(res) {
        plus.nativeUI.toast('支付成功');
        if (callback) callback();
      },
      fail: function fail(res) {
        if (failFun) {
          failFun();
          return;
        }
        uni.showToast({
          title: '支付失败',
          icon: "none",
          duration: 2000,
          complete: function complete() {
            uni.redirectTo({
              url: '/pages/features/order/order?current=1' });

          } });

      } });

  },

  // 微信支付
  WxPay: function WxPay(orderinfo, callback, failFun) {
    if (!orderinfo) {
      uni.showToast({
        icon: 'none',
        title: '支付参数无效' });

      return;
    }
    // console.log(JSON.stringify(orderinfo));
    uni.requestPayment({
      provider: "wxpay",
      timeStamp: orderinfo.timestamp,
      nonceStr: orderinfo.noncestr,
      package: orderinfo.package,
      signType: "MD5",
      paySign: orderinfo.paySign,
      orderInfo: {
        appid: orderinfo.appid,
        noncestr: orderinfo.noncestr,
        package: orderinfo.package,
        partnerid: orderinfo.mchid,
        prepayid: orderinfo.prepayid,
        timestamp: orderinfo.timestamp,
        sign: orderinfo.sign },

      success: function success(res) {
        plus.nativeUI.toast('支付成功');
        if (callback) callback();
      },
      fail: function fail(res) {
        console.log(JSON.stringify(res));
        if (failFun) {
          failFun();
          return;
        }
        uni.showToast({
          title: '支付失败',
          icon: "none",
          duration: 2000,
          complete: function complete() {
            uni.redirectTo({
              url: '/pages/features/order/order?current=1' });

          } });

      } });

  },
  // 判断是否可以指纹解锁
  // 判断当前机型是否支持指纹
  checkFinger: function checkFinger() {
    if (!plus.fingerprint.isSupport()) {
      plus.nativeUI.toast('此设备不支持指纹识别');
      // this.supportFinger = false;
      return false;
    } else if (!plus.fingerprint.isKeyguardSecure()) {
      plus.nativeUI.toast('此设备未设置密码锁屏');
      // this.supportFinger = false;
      return false;
    } else if (!plus.fingerprint.isEnrolledFingerprints()) {
      plus.nativeUI.toast('此设备未录入指纹');
      // this.supportFinger = false;
      return false;
    } else {
      // this.supportFinger = true;
      return true;
    }

  },
  // 是否微信浏览器
  is_weixn: function is_weixn() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      return true;
    } else {
      return false;
    }
  },
  // 是否受过权
  // 返回code
  ifAuth: function ifAuth(success) {
    var url = window.location.href;
    var s = url.match(/code=(.*)&state/);
    if (s) {
      // 是授权后的页面,则做opnegid判断 使用code获取pid
      // return s[1]
      // 换取oid
      success(s[1]);
    } else {
      // 不是授权的页面，重定向进行授权

      this.wxauth();
    }
  },

  // wx授权跳转
  wx_auth: function wx_auth() {
    // alert(1)
    var set = {
      appid: _SET.default.wx_appid, //测试环境
      redirect_uri: _SET.default.wx_redirect_url };

    window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + set.appid + '&redirect_uri=' +
    set.redirect_uri + '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
  } };var _default =


Utils;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!*********************************************************************************************!*\
  !*** ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator/index.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 5);

/***/ }),

/***/ 485:
/*!*******************************************************!*\
  !*** G:/work/洁利来h5商城/components/tki-qrcode/qrcode.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var QRCode = {};
(function () {
  /**
               * 获取单个字符的utf8编码
               * unicode BMP平面约65535个字符
               * @param {num} code
               * return {array}
               */
  function unicodeFormat8(code) {
    // 1 byte
    var c0, c1, c2;
    if (code < 128) {
      return [code];
      // 2 bytes
    } else if (code < 2048) {
      c0 = 192 + (code >> 6);
      c1 = 128 + (code & 63);
      return [c0, c1];
      // 3 bytes
    } else {
      c0 = 224 + (code >> 12);
      c1 = 128 + (code >> 6 & 63);
      c2 = 128 + (code & 63);
      return [c0, c1, c2];
    }
  }
  /**
     * 获取字符串的utf8编码字节串
     * @param {string} string
     * @return {array}
     */
  function getUTF8Bytes(string) {
    var utf8codes = [];
    for (var i = 0; i < string.length; i++) {
      var code = string.charCodeAt(i);
      var utf8 = unicodeFormat8(code);
      for (var j = 0; j < utf8.length; j++) {
        utf8codes.push(utf8[j]);
      }
    }
    return utf8codes;
  }
  /**
     * 二维码算法实现
     * @param {string} data              要编码的信息字符串
     * @param {num} errorCorrectLevel 纠错等级
     */
  function QRCodeAlg(data, errorCorrectLevel) {
    this.typeNumber = -1; //版本
    this.errorCorrectLevel = errorCorrectLevel;
    this.modules = null; //二维矩阵，存放最终结果
    this.moduleCount = 0; //矩阵大小
    this.dataCache = null; //数据缓存
    this.rsBlocks = null; //版本数据信息
    this.totalDataCount = -1; //可使用的数据量
    this.data = data;
    this.utf8bytes = getUTF8Bytes(data);
    this.make();
  }
  QRCodeAlg.prototype = {
    constructor: QRCodeAlg,
    /**
                             * 获取二维码矩阵大小
                             * @return {num} 矩阵大小
                             */
    getModuleCount: function getModuleCount() {
      return this.moduleCount;
    },
    /**
        * 编码
        */
    make: function make() {
      this.getRightType();
      this.dataCache = this.createData();
      this.createQrcode();
    },
    /**
        * 设置二位矩阵功能图形
        * @param  {bool} test 表示是否在寻找最好掩膜阶段
        * @param  {num} maskPattern 掩膜的版本
        */
    makeImpl: function makeImpl(maskPattern) {
      this.moduleCount = this.typeNumber * 4 + 17;
      this.modules = new Array(this.moduleCount);
      for (var row = 0; row < this.moduleCount; row++) {
        this.modules[row] = new Array(this.moduleCount);
      }
      this.setupPositionProbePattern(0, 0);
      this.setupPositionProbePattern(this.moduleCount - 7, 0);
      this.setupPositionProbePattern(0, this.moduleCount - 7);
      this.setupPositionAdjustPattern();
      this.setupTimingPattern();
      this.setupTypeInfo(true, maskPattern);
      if (this.typeNumber >= 7) {
        this.setupTypeNumber(true);
      }
      this.mapData(this.dataCache, maskPattern);
    },
    /**
        * 设置二维码的位置探测图形
        * @param  {num} row 探测图形的中心横坐标
        * @param  {num} col 探测图形的中心纵坐标
        */
    setupPositionProbePattern: function setupPositionProbePattern(row, col) {
      for (var r = -1; r <= 7; r++) {
        if (row + r <= -1 || this.moduleCount <= row + r) continue;
        for (var c = -1; c <= 7; c++) {
          if (col + c <= -1 || this.moduleCount <= col + c) continue;
          if (0 <= r && r <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4) {
            this.modules[row + r][col + c] = true;
          } else {
            this.modules[row + r][col + c] = false;
          }
        }
      }
    },
    /**
        * 创建二维码
        * @return {[type]} [description]
        */
    createQrcode: function createQrcode() {
      var minLostPoint = 0;
      var pattern = 0;
      var bestModules = null;
      for (var i = 0; i < 8; i++) {
        this.makeImpl(i);
        var lostPoint = QRUtil.getLostPoint(this);
        if (i == 0 || minLostPoint > lostPoint) {
          minLostPoint = lostPoint;
          pattern = i;
          bestModules = this.modules;
        }
      }
      this.modules = bestModules;
      this.setupTypeInfo(false, pattern);
      if (this.typeNumber >= 7) {
        this.setupTypeNumber(false);
      }
    },
    /**
        * 设置定位图形
        * @return {[type]} [description]
        */
    setupTimingPattern: function setupTimingPattern() {
      for (var r = 8; r < this.moduleCount - 8; r++) {
        if (this.modules[r][6] != null) {
          continue;
        }
        this.modules[r][6] = r % 2 == 0;
        if (this.modules[6][r] != null) {
          continue;
        }
        this.modules[6][r] = r % 2 == 0;
      }
    },
    /**
        * 设置矫正图形
        * @return {[type]} [description]
        */
    setupPositionAdjustPattern: function setupPositionAdjustPattern() {
      var pos = QRUtil.getPatternPosition(this.typeNumber);
      for (var i = 0; i < pos.length; i++) {
        for (var j = 0; j < pos.length; j++) {
          var row = pos[i];
          var col = pos[j];
          if (this.modules[row][col] != null) {
            continue;
          }
          for (var r = -2; r <= 2; r++) {
            for (var c = -2; c <= 2; c++) {
              if (r == -2 || r == 2 || c == -2 || c == 2 || r == 0 && c == 0) {
                this.modules[row + r][col + c] = true;
              } else {
                this.modules[row + r][col + c] = false;
              }
            }
          }
        }
      }
    },
    /**
        * 设置版本信息（7以上版本才有）
        * @param  {bool} test 是否处于判断最佳掩膜阶段
        * @return {[type]}      [description]
        */
    setupTypeNumber: function setupTypeNumber(test) {
      var bits = QRUtil.getBCHTypeNumber(this.typeNumber);
      for (var i = 0; i < 18; i++) {
        var mod = !test && (bits >> i & 1) == 1;
        this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
        this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
      }
    },
    /**
        * 设置格式信息（纠错等级和掩膜版本）
        * @param  {bool} test
        * @param  {num} maskPattern 掩膜版本
        * @return {}
        */
    setupTypeInfo: function setupTypeInfo(test, maskPattern) {
      var data = QRErrorCorrectLevel[this.errorCorrectLevel] << 3 | maskPattern;
      var bits = QRUtil.getBCHTypeInfo(data);
      // vertical
      for (var i = 0; i < 15; i++) {
        var mod = !test && (bits >> i & 1) == 1;
        if (i < 6) {
          this.modules[i][8] = mod;
        } else if (i < 8) {
          this.modules[i + 1][8] = mod;
        } else {
          this.modules[this.moduleCount - 15 + i][8] = mod;
        }
        // horizontal
        var mod = !test && (bits >> i & 1) == 1;
        if (i < 8) {
          this.modules[8][this.moduleCount - i - 1] = mod;
        } else if (i < 9) {
          this.modules[8][15 - i - 1 + 1] = mod;
        } else {
          this.modules[8][15 - i - 1] = mod;
        }
      }
      // fixed module
      this.modules[this.moduleCount - 8][8] = !test;
    },
    /**
        * 数据编码
        * @return {[type]} [description]
        */
    createData: function createData() {
      var buffer = new QRBitBuffer();
      var lengthBits = this.typeNumber > 9 ? 16 : 8;
      buffer.put(4, 4); //添加模式
      buffer.put(this.utf8bytes.length, lengthBits);
      for (var i = 0, l = this.utf8bytes.length; i < l; i++) {
        buffer.put(this.utf8bytes[i], 8);
      }
      if (buffer.length + 4 <= this.totalDataCount * 8) {
        buffer.put(0, 4);
      }
      // padding
      while (buffer.length % 8 != 0) {
        buffer.putBit(false);
      }
      // padding
      while (true) {
        if (buffer.length >= this.totalDataCount * 8) {
          break;
        }
        buffer.put(QRCodeAlg.PAD0, 8);
        if (buffer.length >= this.totalDataCount * 8) {
          break;
        }
        buffer.put(QRCodeAlg.PAD1, 8);
      }
      return this.createBytes(buffer);
    },
    /**
        * 纠错码编码
        * @param  {buffer} buffer 数据编码
        * @return {[type]}
        */
    createBytes: function createBytes(buffer) {
      var offset = 0;
      var maxDcCount = 0;
      var maxEcCount = 0;
      var length = this.rsBlock.length / 3;
      var rsBlocks = new Array();
      for (var i = 0; i < length; i++) {
        var count = this.rsBlock[i * 3 + 0];
        var totalCount = this.rsBlock[i * 3 + 1];
        var dataCount = this.rsBlock[i * 3 + 2];
        for (var j = 0; j < count; j++) {
          rsBlocks.push([dataCount, totalCount]);
        }
      }
      var dcdata = new Array(rsBlocks.length);
      var ecdata = new Array(rsBlocks.length);
      for (var r = 0; r < rsBlocks.length; r++) {
        var dcCount = rsBlocks[r][0];
        var ecCount = rsBlocks[r][1] - dcCount;
        maxDcCount = Math.max(maxDcCount, dcCount);
        maxEcCount = Math.max(maxEcCount, ecCount);
        dcdata[r] = new Array(dcCount);
        for (var i = 0; i < dcdata[r].length; i++) {
          dcdata[r][i] = 0xff & buffer.buffer[i + offset];
        }
        offset += dcCount;
        var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
        var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
        var modPoly = rawPoly.mod(rsPoly);
        ecdata[r] = new Array(rsPoly.getLength() - 1);
        for (var i = 0; i < ecdata[r].length; i++) {
          var modIndex = i + modPoly.getLength() - ecdata[r].length;
          ecdata[r][i] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
        }
      }
      var data = new Array(this.totalDataCount);
      var index = 0;
      for (var i = 0; i < maxDcCount; i++) {
        for (var r = 0; r < rsBlocks.length; r++) {
          if (i < dcdata[r].length) {
            data[index++] = dcdata[r][i];
          }
        }
      }
      for (var i = 0; i < maxEcCount; i++) {
        for (var r = 0; r < rsBlocks.length; r++) {
          if (i < ecdata[r].length) {
            data[index++] = ecdata[r][i];
          }
        }
      }
      return data;

    },
    /**
        * 布置模块，构建最终信息
        * @param  {} data
        * @param  {} maskPattern
        * @return {}
        */
    mapData: function mapData(data, maskPattern) {
      var inc = -1;
      var row = this.moduleCount - 1;
      var bitIndex = 7;
      var byteIndex = 0;
      for (var col = this.moduleCount - 1; col > 0; col -= 2) {
        if (col == 6) col--;
        while (true) {
          for (var c = 0; c < 2; c++) {
            if (this.modules[row][col - c] == null) {
              var dark = false;
              if (byteIndex < data.length) {
                dark = (data[byteIndex] >>> bitIndex & 1) == 1;
              }
              var mask = QRUtil.getMask(maskPattern, row, col - c);
              if (mask) {
                dark = !dark;
              }
              this.modules[row][col - c] = dark;
              bitIndex--;
              if (bitIndex == -1) {
                byteIndex++;
                bitIndex = 7;
              }
            }
          }
          row += inc;
          if (row < 0 || this.moduleCount <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }
    } };

  /**
          * 填充字段
          */
  QRCodeAlg.PAD0 = 0xEC;
  QRCodeAlg.PAD1 = 0x11;
  //---------------------------------------------------------------------
  // 纠错等级对应的编码
  //---------------------------------------------------------------------
  var QRErrorCorrectLevel = [1, 0, 3, 2];
  //---------------------------------------------------------------------
  // 掩膜版本
  //---------------------------------------------------------------------
  var QRMaskPattern = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7 };

  //---------------------------------------------------------------------
  // 工具类
  //---------------------------------------------------------------------
  var QRUtil = {
    /*
                 每个版本矫正图形的位置
                  */
    PATTERN_POSITION_TABLE: [
    [],
    [6, 18],
    [6, 22],
    [6, 26],
    [6, 30],
    [6, 34],
    [6, 22, 38],
    [6, 24, 42],
    [6, 26, 46],
    [6, 28, 50],
    [6, 30, 54],
    [6, 32, 58],
    [6, 34, 62],
    [6, 26, 46, 66],
    [6, 26, 48, 70],
    [6, 26, 50, 74],
    [6, 30, 54, 78],
    [6, 30, 56, 82],
    [6, 30, 58, 86],
    [6, 34, 62, 90],
    [6, 28, 50, 72, 94],
    [6, 26, 50, 74, 98],
    [6, 30, 54, 78, 102],
    [6, 28, 54, 80, 106],
    [6, 32, 58, 84, 110],
    [6, 30, 58, 86, 114],
    [6, 34, 62, 90, 118],
    [6, 26, 50, 74, 98, 122],
    [6, 30, 54, 78, 102, 126],
    [6, 26, 52, 78, 104, 130],
    [6, 30, 56, 82, 108, 134],
    [6, 34, 60, 86, 112, 138],
    [6, 30, 58, 86, 114, 142],
    [6, 34, 62, 90, 118, 146],
    [6, 30, 54, 78, 102, 126, 150],
    [6, 24, 50, 76, 102, 128, 154],
    [6, 28, 54, 80, 106, 132, 158],
    [6, 32, 58, 84, 110, 136, 162],
    [6, 26, 54, 82, 110, 138, 166],
    [6, 30, 58, 86, 114, 142, 170]],

    G15: 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0,
    G18: 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0,
    G15_MASK: 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1,
    /*
                                                             BCH编码格式信息
                                                              */
    getBCHTypeInfo: function getBCHTypeInfo(data) {
      var d = data << 10;
      while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
        d ^= QRUtil.G15 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);
      }
      return (data << 10 | d) ^ QRUtil.G15_MASK;
    },
    /*
       BCH编码版本信息
        */
    getBCHTypeNumber: function getBCHTypeNumber(data) {
      var d = data << 12;
      while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
        d ^= QRUtil.G18 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);
      }
      return data << 12 | d;
    },
    /*
       获取BCH位信息
        */
    getBCHDigit: function getBCHDigit(data) {
      var digit = 0;
      while (data != 0) {
        digit++;
        data >>>= 1;
      }
      return digit;
    },
    /*
       获取版本对应的矫正图形位置
        */
    getPatternPosition: function getPatternPosition(typeNumber) {
      return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
    },
    /*
       掩膜算法
        */
    getMask: function getMask(maskPattern, i, j) {
      switch (maskPattern) {
        case QRMaskPattern.PATTERN000:
          return (i + j) % 2 == 0;
        case QRMaskPattern.PATTERN001:
          return i % 2 == 0;
        case QRMaskPattern.PATTERN010:
          return j % 3 == 0;
        case QRMaskPattern.PATTERN011:
          return (i + j) % 3 == 0;
        case QRMaskPattern.PATTERN100:
          return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
        case QRMaskPattern.PATTERN101:
          return i * j % 2 + i * j % 3 == 0;
        case QRMaskPattern.PATTERN110:
          return (i * j % 2 + i * j % 3) % 2 == 0;
        case QRMaskPattern.PATTERN111:
          return (i * j % 3 + (i + j) % 2) % 2 == 0;
        default:
          throw new Error("bad maskPattern:" + maskPattern);}

    },
    /*
       获取RS的纠错多项式
        */
    getErrorCorrectPolynomial: function getErrorCorrectPolynomial(errorCorrectLength) {
      var a = new QRPolynomial([1], 0);
      for (var i = 0; i < errorCorrectLength; i++) {
        a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
      }
      return a;
    },
    /*
       获取评价
        */
    getLostPoint: function getLostPoint(qrCode) {
      var moduleCount = qrCode.getModuleCount(),
      lostPoint = 0,
      darkCount = 0;
      for (var row = 0; row < moduleCount; row++) {
        var sameCount = 0;
        var head = qrCode.modules[row][0];
        for (var col = 0; col < moduleCount; col++) {
          var current = qrCode.modules[row][col];
          //level 3 评价
          if (col < moduleCount - 6) {
            if (current && !qrCode.modules[row][col + 1] && qrCode.modules[row][col + 2] && qrCode.modules[row][col + 3] && qrCode.modules[row][col + 4] && !qrCode.modules[row][col + 5] && qrCode.modules[row][col + 6]) {
              if (col < moduleCount - 10) {
                if (qrCode.modules[row][col + 7] && qrCode.modules[row][col + 8] && qrCode.modules[row][col + 9] && qrCode.modules[row][col + 10]) {
                  lostPoint += 40;
                }
              } else if (col > 3) {
                if (qrCode.modules[row][col - 1] && qrCode.modules[row][col - 2] && qrCode.modules[row][col - 3] && qrCode.modules[row][col - 4]) {
                  lostPoint += 40;
                }
              }
            }
          }
          //level 2 评价
          if (row < moduleCount - 1 && col < moduleCount - 1) {
            var count = 0;
            if (current) count++;
            if (qrCode.modules[row + 1][col]) count++;
            if (qrCode.modules[row][col + 1]) count++;
            if (qrCode.modules[row + 1][col + 1]) count++;
            if (count == 0 || count == 4) {
              lostPoint += 3;
            }
          }
          //level 1 评价
          if (head ^ current) {
            sameCount++;
          } else {
            head = current;
            if (sameCount >= 5) {
              lostPoint += 3 + sameCount - 5;
            }
            sameCount = 1;
          }
          //level 4 评价
          if (current) {
            darkCount++;
          }
        }
      }
      for (var col = 0; col < moduleCount; col++) {
        var sameCount = 0;
        var head = qrCode.modules[0][col];
        for (var row = 0; row < moduleCount; row++) {
          var current = qrCode.modules[row][col];
          //level 3 评价
          if (row < moduleCount - 6) {
            if (current && !qrCode.modules[row + 1][col] && qrCode.modules[row + 2][col] && qrCode.modules[row + 3][col] && qrCode.modules[row + 4][col] && !qrCode.modules[row + 5][col] && qrCode.modules[row + 6][col]) {
              if (row < moduleCount - 10) {
                if (qrCode.modules[row + 7][col] && qrCode.modules[row + 8][col] && qrCode.modules[row + 9][col] && qrCode.modules[row + 10][col]) {
                  lostPoint += 40;
                }
              } else if (row > 3) {
                if (qrCode.modules[row - 1][col] && qrCode.modules[row - 2][col] && qrCode.modules[row - 3][col] && qrCode.modules[row - 4][col]) {
                  lostPoint += 40;
                }
              }
            }
          }
          //level 1 评价
          if (head ^ current) {
            sameCount++;
          } else {
            head = current;
            if (sameCount >= 5) {
              lostPoint += 3 + sameCount - 5;
            }
            sameCount = 1;
          }
        }
      }
      // LEVEL4
      var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
      lostPoint += ratio * 10;
      return lostPoint;
    } };


  //---------------------------------------------------------------------
  // QRMath使用的数学工具
  //---------------------------------------------------------------------
  var QRMath = {
    /*
                 将n转化为a^m
                  */
    glog: function glog(n) {
      if (n < 1) {
        throw new Error("glog(" + n + ")");
      }
      return QRMath.LOG_TABLE[n];
    },
    /*
       将a^m转化为n
        */
    gexp: function gexp(n) {
      while (n < 0) {
        n += 255;
      }
      while (n >= 256) {
        n -= 255;
      }
      return QRMath.EXP_TABLE[n];
    },
    EXP_TABLE: new Array(256),
    LOG_TABLE: new Array(256) };


  for (var i = 0; i < 8; i++) {
    QRMath.EXP_TABLE[i] = 1 << i;
  }
  for (var i = 8; i < 256; i++) {
    QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
  }
  for (var i = 0; i < 255; i++) {
    QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
  }
  //---------------------------------------------------------------------
  // QRPolynomial 多项式
  //---------------------------------------------------------------------
  /**
   * 多项式类
   * @param {Array} num   系数
   * @param {num} shift a^shift
   */
  function QRPolynomial(num, shift) {
    if (num.length == undefined) {
      throw new Error(num.length + "/" + shift);
    }
    var offset = 0;
    while (offset < num.length && num[offset] == 0) {
      offset++;
    }
    this.num = new Array(num.length - offset + shift);
    for (var i = 0; i < num.length - offset; i++) {
      this.num[i] = num[i + offset];
    }
  }
  QRPolynomial.prototype = {
    get: function get(index) {
      return this.num[index];
    },
    getLength: function getLength() {
      return this.num.length;
    },
    /**
        * 多项式乘法
        * @param  {QRPolynomial} e 被乘多项式
        * @return {[type]}   [description]
        */
    multiply: function multiply(e) {
      var num = new Array(this.getLength() + e.getLength() - 1);
      for (var i = 0; i < this.getLength(); i++) {
        for (var j = 0; j < e.getLength(); j++) {
          num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
        }
      }
      return new QRPolynomial(num, 0);
    },
    /**
        * 多项式模运算
        * @param  {QRPolynomial} e 模多项式
        * @return {}
        */
    mod: function mod(e) {
      var tl = this.getLength(),
      el = e.getLength();
      if (tl - el < 0) {
        return this;
      }
      var num = new Array(tl);
      for (var i = 0; i < tl; i++) {
        num[i] = this.get(i);
      }
      while (num.length >= el) {
        var ratio = QRMath.glog(num[0]) - QRMath.glog(e.get(0));

        for (var i = 0; i < e.getLength(); i++) {
          num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
        }
        while (num[0] == 0) {
          num.shift();
        }
      }
      return new QRPolynomial(num, 0);
    } };


  //---------------------------------------------------------------------
  // RS_BLOCK_TABLE
  //---------------------------------------------------------------------
  /*
  二维码各个版本信息[块数, 每块中的数据块数, 每块中的信息块数]
   */
  var RS_BLOCK_TABLE = [
  // L
  // M
  // Q
  // H
  // 1
  [1, 26, 19],
  [1, 26, 16],
  [1, 26, 13],
  [1, 26, 9],

  // 2
  [1, 44, 34],
  [1, 44, 28],
  [1, 44, 22],
  [1, 44, 16],

  // 3
  [1, 70, 55],
  [1, 70, 44],
  [2, 35, 17],
  [2, 35, 13],

  // 4
  [1, 100, 80],
  [2, 50, 32],
  [2, 50, 24],
  [4, 25, 9],

  // 5
  [1, 134, 108],
  [2, 67, 43],
  [2, 33, 15, 2, 34, 16],
  [2, 33, 11, 2, 34, 12],

  // 6
  [2, 86, 68],
  [4, 43, 27],
  [4, 43, 19],
  [4, 43, 15],

  // 7
  [2, 98, 78],
  [4, 49, 31],
  [2, 32, 14, 4, 33, 15],
  [4, 39, 13, 1, 40, 14],

  // 8
  [2, 121, 97],
  [2, 60, 38, 2, 61, 39],
  [4, 40, 18, 2, 41, 19],
  [4, 40, 14, 2, 41, 15],

  // 9
  [2, 146, 116],
  [3, 58, 36, 2, 59, 37],
  [4, 36, 16, 4, 37, 17],
  [4, 36, 12, 4, 37, 13],

  // 10
  [2, 86, 68, 2, 87, 69],
  [4, 69, 43, 1, 70, 44],
  [6, 43, 19, 2, 44, 20],
  [6, 43, 15, 2, 44, 16],

  // 11
  [4, 101, 81],
  [1, 80, 50, 4, 81, 51],
  [4, 50, 22, 4, 51, 23],
  [3, 36, 12, 8, 37, 13],

  // 12
  [2, 116, 92, 2, 117, 93],
  [6, 58, 36, 2, 59, 37],
  [4, 46, 20, 6, 47, 21],
  [7, 42, 14, 4, 43, 15],

  // 13
  [4, 133, 107],
  [8, 59, 37, 1, 60, 38],
  [8, 44, 20, 4, 45, 21],
  [12, 33, 11, 4, 34, 12],

  // 14
  [3, 145, 115, 1, 146, 116],
  [4, 64, 40, 5, 65, 41],
  [11, 36, 16, 5, 37, 17],
  [11, 36, 12, 5, 37, 13],

  // 15
  [5, 109, 87, 1, 110, 88],
  [5, 65, 41, 5, 66, 42],
  [5, 54, 24, 7, 55, 25],
  [11, 36, 12],

  // 16
  [5, 122, 98, 1, 123, 99],
  [7, 73, 45, 3, 74, 46],
  [15, 43, 19, 2, 44, 20],
  [3, 45, 15, 13, 46, 16],

  // 17
  [1, 135, 107, 5, 136, 108],
  [10, 74, 46, 1, 75, 47],
  [1, 50, 22, 15, 51, 23],
  [2, 42, 14, 17, 43, 15],

  // 18
  [5, 150, 120, 1, 151, 121],
  [9, 69, 43, 4, 70, 44],
  [17, 50, 22, 1, 51, 23],
  [2, 42, 14, 19, 43, 15],

  // 19
  [3, 141, 113, 4, 142, 114],
  [3, 70, 44, 11, 71, 45],
  [17, 47, 21, 4, 48, 22],
  [9, 39, 13, 16, 40, 14],

  // 20
  [3, 135, 107, 5, 136, 108],
  [3, 67, 41, 13, 68, 42],
  [15, 54, 24, 5, 55, 25],
  [15, 43, 15, 10, 44, 16],

  // 21
  [4, 144, 116, 4, 145, 117],
  [17, 68, 42],
  [17, 50, 22, 6, 51, 23],
  [19, 46, 16, 6, 47, 17],

  // 22
  [2, 139, 111, 7, 140, 112],
  [17, 74, 46],
  [7, 54, 24, 16, 55, 25],
  [34, 37, 13],

  // 23
  [4, 151, 121, 5, 152, 122],
  [4, 75, 47, 14, 76, 48],
  [11, 54, 24, 14, 55, 25],
  [16, 45, 15, 14, 46, 16],

  // 24
  [6, 147, 117, 4, 148, 118],
  [6, 73, 45, 14, 74, 46],
  [11, 54, 24, 16, 55, 25],
  [30, 46, 16, 2, 47, 17],

  // 25
  [8, 132, 106, 4, 133, 107],
  [8, 75, 47, 13, 76, 48],
  [7, 54, 24, 22, 55, 25],
  [22, 45, 15, 13, 46, 16],

  // 26
  [10, 142, 114, 2, 143, 115],
  [19, 74, 46, 4, 75, 47],
  [28, 50, 22, 6, 51, 23],
  [33, 46, 16, 4, 47, 17],

  // 27
  [8, 152, 122, 4, 153, 123],
  [22, 73, 45, 3, 74, 46],
  [8, 53, 23, 26, 54, 24],
  [12, 45, 15, 28, 46, 16],

  // 28
  [3, 147, 117, 10, 148, 118],
  [3, 73, 45, 23, 74, 46],
  [4, 54, 24, 31, 55, 25],
  [11, 45, 15, 31, 46, 16],

  // 29
  [7, 146, 116, 7, 147, 117],
  [21, 73, 45, 7, 74, 46],
  [1, 53, 23, 37, 54, 24],
  [19, 45, 15, 26, 46, 16],

  // 30
  [5, 145, 115, 10, 146, 116],
  [19, 75, 47, 10, 76, 48],
  [15, 54, 24, 25, 55, 25],
  [23, 45, 15, 25, 46, 16],

  // 31
  [13, 145, 115, 3, 146, 116],
  [2, 74, 46, 29, 75, 47],
  [42, 54, 24, 1, 55, 25],
  [23, 45, 15, 28, 46, 16],

  // 32
  [17, 145, 115],
  [10, 74, 46, 23, 75, 47],
  [10, 54, 24, 35, 55, 25],
  [19, 45, 15, 35, 46, 16],

  // 33
  [17, 145, 115, 1, 146, 116],
  [14, 74, 46, 21, 75, 47],
  [29, 54, 24, 19, 55, 25],
  [11, 45, 15, 46, 46, 16],

  // 34
  [13, 145, 115, 6, 146, 116],
  [14, 74, 46, 23, 75, 47],
  [44, 54, 24, 7, 55, 25],
  [59, 46, 16, 1, 47, 17],

  // 35
  [12, 151, 121, 7, 152, 122],
  [12, 75, 47, 26, 76, 48],
  [39, 54, 24, 14, 55, 25],
  [22, 45, 15, 41, 46, 16],

  // 36
  [6, 151, 121, 14, 152, 122],
  [6, 75, 47, 34, 76, 48],
  [46, 54, 24, 10, 55, 25],
  [2, 45, 15, 64, 46, 16],

  // 37
  [17, 152, 122, 4, 153, 123],
  [29, 74, 46, 14, 75, 47],
  [49, 54, 24, 10, 55, 25],
  [24, 45, 15, 46, 46, 16],

  // 38
  [4, 152, 122, 18, 153, 123],
  [13, 74, 46, 32, 75, 47],
  [48, 54, 24, 14, 55, 25],
  [42, 45, 15, 32, 46, 16],

  // 39
  [20, 147, 117, 4, 148, 118],
  [40, 75, 47, 7, 76, 48],
  [43, 54, 24, 22, 55, 25],
  [10, 45, 15, 67, 46, 16],

  // 40
  [19, 148, 118, 6, 149, 119],
  [18, 75, 47, 31, 76, 48],
  [34, 54, 24, 34, 55, 25],
  [20, 45, 15, 61, 46, 16]];


  /**
                              * 根据数据获取对应版本
                              * @return {[type]} [description]
                              */
  QRCodeAlg.prototype.getRightType = function () {
    for (var typeNumber = 1; typeNumber < 41; typeNumber++) {
      var rsBlock = RS_BLOCK_TABLE[(typeNumber - 1) * 4 + this.errorCorrectLevel];
      if (rsBlock == undefined) {
        throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + this.errorCorrectLevel);
      }
      var length = rsBlock.length / 3;
      var totalDataCount = 0;
      for (var i = 0; i < length; i++) {
        var count = rsBlock[i * 3 + 0];
        var dataCount = rsBlock[i * 3 + 2];
        totalDataCount += dataCount * count;
      }
      var lengthBytes = typeNumber > 9 ? 2 : 1;
      if (this.utf8bytes.length + lengthBytes < totalDataCount || typeNumber == 40) {
        this.typeNumber = typeNumber;
        this.rsBlock = rsBlock;
        this.totalDataCount = totalDataCount;
        break;
      }
    }
  };

  //---------------------------------------------------------------------
  // QRBitBuffer
  //---------------------------------------------------------------------
  function QRBitBuffer() {
    this.buffer = new Array();
    this.length = 0;
  }
  QRBitBuffer.prototype = {
    get: function get(index) {
      var bufIndex = Math.floor(index / 8);
      return this.buffer[bufIndex] >>> 7 - index % 8 & 1;
    },
    put: function put(num, length) {
      for (var i = 0; i < length; i++) {
        this.putBit(num >>> length - i - 1 & 1);
      }
    },
    putBit: function putBit(bit) {
      var bufIndex = Math.floor(this.length / 8);
      if (this.buffer.length <= bufIndex) {
        this.buffer.push(0);
      }
      if (bit) {
        this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
      }
      this.length++;
    } };




  // xzedit
  var qrcodeAlgObjCache = [];
  /**
                               * 二维码构造函数，主要用于绘制
                               * @param  {参数列表} opt 传递参数
                               * @return {}
                               */
  QRCode = function QRCode(opt) {
    //设置默认参数
    this.options = {
      text: '',
      size: 256,
      correctLevel: 3,
      background: '#ffffff',
      foreground: '#000000',
      pdground: '#000000',
      image: '',
      imageSize: 30,
      canvasId: opt.canvasId,
      context: opt.context,
      usingComponents: opt.usingComponents,
      showLoading: opt.showLoading,
      loadingText: opt.loadingText };

    if (typeof opt === 'string') {// 只编码ASCII字符串
      opt = {
        text: opt };

    }
    if (opt) {
      for (var i in opt) {
        this.options[i] = opt[i];
      }
    }
    //使用QRCodeAlg创建二维码结构
    var qrCodeAlg = null;
    for (var i = 0, l = qrcodeAlgObjCache.length; i < l; i++) {
      if (qrcodeAlgObjCache[i].text == this.options.text && qrcodeAlgObjCache[i].text.correctLevel == this.options.correctLevel) {
        qrCodeAlg = qrcodeAlgObjCache[i].obj;
        break;
      }
    }
    if (i == l) {
      qrCodeAlg = new QRCodeAlg(this.options.text, this.options.correctLevel);
      qrcodeAlgObjCache.push({
        text: this.options.text,
        correctLevel: this.options.correctLevel,
        obj: qrCodeAlg });

    }
    /**
       * 计算矩阵点的前景色
       * @param {Obj} config
       * @param {Number} config.row 点x坐标
       * @param {Number} config.col 点y坐标
       * @param {Number} config.count 矩阵大小
       * @param {Number} config.options 组件的options
       * @return {String}
       */
    var getForeGround = function getForeGround(config) {
      var options = config.options;
      if (options.pdground && (
      config.row > 1 && config.row < 5 && config.col > 1 && config.col < 5 ||
      config.row > config.count - 6 && config.row < config.count - 2 && config.col > 1 && config.col < 5 ||
      config.row > 1 && config.row < 5 && config.col > config.count - 6 && config.col < config.count - 2))
      {
        return options.pdground;
      }
      return options.foreground;
    };
    // 创建canvas
    var createCanvas = function createCanvas(options) {
      if (options.showLoading) {
        uni.showLoading({
          title: options.loadingText,
          mask: true });

      }
      var ctx = uni.createCanvasContext(options.canvasId, options.context);
      var count = qrCodeAlg.getModuleCount();
      var ratioSize = options.size;
      var ratioImgSize = options.imageSize;
      //计算每个点的长宽
      var tileW = (ratioSize / count).toPrecision(4);
      var tileH = (ratioSize / count).toPrecision(4);
      //绘制
      for (var row = 0; row < count; row++) {
        for (var col = 0; col < count; col++) {
          var w = Math.ceil((col + 1) * tileW) - Math.floor(col * tileW);
          var h = Math.ceil((row + 1) * tileW) - Math.floor(row * tileW);
          var foreground = getForeGround({
            row: row,
            col: col,
            count: count,
            options: options });

          ctx.setFillStyle(qrCodeAlg.modules[row][col] ? foreground : options.background);
          ctx.fillRect(Math.round(col * tileW), Math.round(row * tileH), w, h);
        }
      }
      if (options.image) {




        // 画圆角矩形
        var drawRoundedRect = function drawRoundedRect(ctxi, x, y, width, height, r, lineWidth, fill, stroke) {
          ctxi.setLineWidth(lineWidth);
          ctxi.setFillStyle(options.background);
          ctxi.setStrokeStyle(options.background);
          ctxi.beginPath(); // draw top and top right corner 
          ctxi.moveTo(x + r, y);
          ctxi.arcTo(x + width, y, x + width, y + r, r); // draw right side and bottom right corner 
          ctxi.arcTo(x + width, y + height, x + width - r, y + height, r); // draw bottom and bottom left corner 
          ctxi.arcTo(x, y + height, x, y + height - r, r); // draw left and top left corner 
          ctxi.arcTo(x, y, x + r, y, r);
          ctxi.closePath();
          if (fill) {
            ctxi.fill();
          }
          if (stroke) {
            ctxi.stroke();
          }
        };var x = Number(((ratioSize - ratioImgSize) / 2).toFixed(2));var y = Number(((ratioSize - ratioImgSize) / 2).toFixed(2));drawRoundedRect(ctx, x, y, ratioImgSize, ratioImgSize, 2, 6, true, true);ctx.drawImage(options.image, x, y, ratioImgSize, ratioImgSize);
      }
      setTimeout(function () {
        ctx.draw(true, function () {
          // 保存到临时区域
          setTimeout(function () {
            uni.canvasToTempFilePath({
              width: options.width,
              height: options.height,
              destWidth: options.width,
              destHeight: options.height,
              canvasId: options.canvasId,
              quality: Number(1),
              success: function success(res) {
                if (options.cbResult) {
                  // 由于官方还没有统一此接口的输出字段，所以先判定下  支付宝为 res.apFilePath
                  if (!empty(res.tempFilePath)) {
                    options.cbResult(res.tempFilePath);
                  } else if (!empty(res.apFilePath)) {
                    options.cbResult(res.apFilePath);
                  } else {
                    options.cbResult(res.tempFilePath);
                  }
                }
              },
              fail: function fail(res) {
                if (options.cbResult) {
                  options.cbResult(res);
                }
              },
              complete: function complete() {



              } },
            options.context);
          }, options.text.length + 100);
        });
      }, options.usingComponents ? 0 : 150);
    };
    createCanvas(this.options);
    // 空判定
    var empty = function empty(v) {
      var tp = typeof v,
      rt = false;
      if (tp == "number" && String(v) == "") {
        rt = true;
      } else if (tp == "undefined") {
        rt = true;
      } else if (tp == "object") {
        if (JSON.stringify(v) == "{}" || JSON.stringify(v) == "[]" || v == null) rt = true;
      } else if (tp == "string") {
        if (v == "" || v == "undefined" || v == "null" || v == "{}" || v == "[]") rt = true;
      } else if (tp == "function") {
        rt = false;
      }
      return rt;
    };
  };
  QRCode.prototype.clear = function (fn) {
    var ctx = uni.createCanvasContext(this.options.canvasId, this.options.context);
    ctx.clearRect(0, 0, this.options.size, this.options.size);
    ctx.draw(false, function () {
      if (fn) {
        fn();
      }
    });
  };
})();var _default =

QRCode;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 496:
/*!*****************************************************!*\
  !*** G:/work/洁利来h5商城/static/img/inpus/bukejian.png ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIEAYAAAD9yHLdAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAGQBJREFUeNrt3X1QU1f6B/DnJIBigfpepegqorV2BEkCArYqaqvr4qq1sOtb6e60KusLOqJiX3R0aMWiY4VBq+64u7Z1V0J3tNWtVVBRFIEkKEzR8SW1atX6UgWxgCR5fn9cwv6kdVXKvReS7+cf54aYc85Nbp4855x7DhEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQLPTzdHN0c0ZMUL3ge4D3QcxMWrXBwDkE3o39G7o3Vdf1W3TbdNtmzpV7fpAKxVxKeJSxCVvb121rlpXff68Xq/X6/XM+gP6A/oDOTl6nV6n1w0cqHY9AaDpwnqH9Q7rHRam36ffp9+Xl+e8znU2nU1nq6gIiw2LDYvt1k3terZUQu0KtFT6Gn2Nvub992kIDaEhb7/d+O9czMVcbLOJC+KCuLB1q/2y/bL98rvvnhh6YuiJoTduqF1/APg56Ydfz54cz/Ecn5IivhHfiG+mTSMzmcksfv59yMTEf/2r2WK2mC1vvaV2/VsaBJBGwi6HXQ673K+fY69jr2NvaSltpI20sU2bR/7HeTSP5t2+LR2sXl3tXe1d7b1uXXlceVx53P37arcLwB1JPQkdO96/ff/2/duLF4siUSSK5s9/7Ot6Js2kmQ6HSBNpIi0y0nTWdNZ0tqhI7Xa1FAggDxBCSmFzc6Xj6Ogmv9Q79A69U14uboqb4mZSkmmGaYZpxldfqd1CAFcWnBacFpz21FNeH3h94PXB7Nn8R/4j/3HpUiqiIipq377JLxxN0RR9/Lh5jXmNeU1UlPQgs9rtVRsCSD1dV11XXddp00QP0UP0+OSTZi8ghVIopaDA8ZzjOcdzq1aVBJYElgTu3i39ER9EgKYY0mlIpyGdfH2rd1TvqN7x5z+LJWKJWLJkifTX7t3lKfWNN8xms9ls/sc/1G6/2rRqV0Bt4WfDz4af9fPj/byf9+/aJT3q69vsBR2gA3SgRw9hFEZhnDy5+5buW7pvGT/e/7T/af/TP/549erVq1evnjql9vkAaMmkMYzOnf2v+F/xv7J4sa2brZut27/+Jd4X74v3J06UniXD9VuP1/E6XhcZ6X/S/6T/yS1bpOu2tlbt86IWt89ApC6rDRuko4QE1SqyjJbRspMnaQWtoBXvvy8N2mVnS39EhgLuafD2wdsHb3/mGdtk22Tb5IQEtrOd7QsWiMFisBjs56daxZiYeO1a6TpNSlL7PKnFbQOIc/qeY6ljqWPp8eO0iTbRJo1G7Xo58TJexsuKi+kCXaALq1b1ye+T3yf/iy+MRqPRaLTb1a4fgByk+zCef15kiAyRkZgouoquousbbzz2oLei6uqkf4ODpS6t06fVrpHS3DSAaDS6Cl2FrqKgQIwQI8SI8HC1a/RIkRRJkVeuUAZlUMaWLfYj9iP2I5mZmDYMrdGArAFZA7K8vLxTvVO9U8eP5yRO4qQZM8QhcUgcGjnyodNqWxheyAt5YU6OZYplimXKyy+rXR+ltfg3qLnpjXqj3jh3LqVSKqWmp6tdnyYzkIEM9+9TMRVT8a5dYqVYKVZu3myKMcWYYnJy1K4ewP8XMitkVsisZ5/12Oix0WPjW2/Rp/QpfZqQQB/RR/RR165q1695TJwoZSI7d6pdE6W4TQAJSg9KD0pv0+bpM0+fefqM1UoFVEAF/v5q16u5NXR91VIt1W7Y4BXpFekVuWPH8R7HexzvUV2tdv3AtQ3jYTyMPTzupdxLuZcydqzjN47fOH4za5aoETWiZvToltZV3LzKyqQAEhIiHbv+2KXbBBAn5y8h7fPa57XPr1r1yDtRWzku4iIuqq4Wy8VysTw3l/5D/6H/bNtWnVydXJ28axdudISmiI2NjY2N1Wqt563nrecjI0mQIBEbK81S+sMfxAKxQCx45hm16ykbPelJz0wmMpHJOdklKUkaVL94Ue3qKcXlvjCflKHMUGYoGzaMt/JW3pqeTofpMB0ODla7XrILp3AKv3OH+3N/7v/llzyOx/E4o1HzmuY1zWt790oXgnOQENybRiNNn42KaggUBVzABXFxIlJEikg3WiuKiYkLCx1hjjBH2IIFJZtKNpVsKihQu1pqcfsA4uRMvauyq7KrshMSeAJP4AnLl4sIESEiOnVSu35KkX5B/vCDCBSBIjA7mzfwBt7w5Zfia/G1+PrIESlF/+kntesJzavhhryF1QurFw4bJj4Xn4vPx46l+TSf5k+a5FpjFU8gmZIp+exZcUQcEUeWLjWlm9JN6Z9/rna1WgoEkIeQZon4+HjHesd6xyYlsYMd7Fi8WISLcBHu7a12/ZTWsHjkIrFILDp5UlqMLidHc1FzUXMxJ0cae8nLQ+bSMjl/IN3V39Xf1YeEiESRKBJHjWJP9mTPUaNEnsgTeUOHSl0yXl5q11ctvIbX8JrLl8lOdrKvWVPzY82PNT9u3Iiu3l+GAPKYpDvWAwJsu2y7bLtWrKChNJSGxseLBJEgErRuf0e/s0tMWnPo0CFRKSpFZW6usAmbsBUWtrO2s7azlpXliTyRJ2pq1K6uqxk4cODAgQM7dPDy8vLy8ho0SHp08GD+mr/mr0eMoA7UgTq8+KK7/gB6KCYmvnlT6ppLTfUx+Zh8TJmZ+Jw+HgSQJpLWzgoOFhPFRDGxuNjdf7k9ijODoZ/oJ/rp9GnxrfhWfHviBL1Bb9AbJ05wJEdyZElJXV5dXl1eSUlZWVlZWZlzdWP3FcIhHMK9enkYPAwehkGDpM/ZoEHSNO6QEFpEi2jRoEGURmmU1quX2vVtLbiQC7mwsrIutC60LrRXL3zemgYBpImkjaVef126gLGomjwuXqSX6WV6+dw5nsEzeMa330pLvlit9Aq9Qq98950mVBOqCb182d7L3sve6/p1h4/Dx+Fz9epJcVKcFHfuqFXzhjE1fZW+Su/vLwXMHj14D+/hPT17so1tbHv2WWm2Uo8e0v/q2VNayiYggG7RLbrVpw+lUzqld+ig9jvhstIojdLi480jzCPMI7ZtU7s6rQ0CyBNqmL4YZ42zxp06Jd2Q2Lev2vWCRhIogRJqa6mESqikslK676eyUlqW+84d8iRP8qyo4GAO5mCHQwpIzOIV8Yp45b+Bh/fxPt7Xvr0YLUaL0R4eNJyG03A/Px7Fo3hU27bSsbe3SBJJIsnXV+rK8/DAF38rUT9I7vOaz2s+rw0YIHVd2WxqV6u1QAB5QtLii/Hx0tHf/652fQCgGSATaRIXvSO0+TkzDz7CR/jI0qVq1wcAmtFO2kk733vP2fWodnVaCwSQx2RNsCZYE6ZOFS+Jl8RLzz2ndn0AXJlzBQXFCjxKR+loUFDVwaqDVQenTFG7/a0FAsgjNPwiuUW36Na77ypWcBiFUdi9e44MR4Yj47e/5Uk8iSdt2iT9saJC7fMC0CycY1XjaByNy8oSM8VMMXPsWM8dnjs8d/TuTbNpNs2uqlKsPvXXOTKRx4MT9AhVhipDlWHqVOlIucFyfoqf4qcyM0uiSqJKovbulR7du1f6YM+fL83uGTeutS6DDW7qHXqH3ikvp7t0l+5u22bvbe9t771164k3T7x54s2fb0ugK9WV6kozMwUJEuTcqlZG9ZNiqjpVdarq5MxEMCbyMPiieYgHlzYpL1dstlV95lHXp65PXZ/AwNJFpYtKF12//qj/Ztht2G3YHRjo2OnY6dg5fTpNokk0KTZWvCveFe++8ILa5xPcC6dwCqd8840YI8aIMdnZmkxNpibTaCyeUzyneM433zzu6ww6POjwoMNdumjPac9pz1mtlEmZlOnjI3sDMDvrsSCAPIRas614OA/n4R9+aFlrWWtZ++t/cYWPCx8XPq53b1uiLdGW+PvfSzegxcaKkWKkGDlkiFLtAhflzCgm0kSaaDRKG51lZUkbnZWXN1cxUiaSmir+JP4k/qRAJuKE2Vn/EwJII60t82iqQfMGzRs0r29fzUjNSM3Izz6TNqQKC5O9neBC9uyRFteMiZG7JGQiLRMG0RtpGPNQ+AZB55iH3IHD6UT6ifQT6WfPimpRLaq7dFGqneAaeD2v5/WRkdKR/BtEObduZgMb2JCZqVhDnWMimJ31ixBA6ql2n0d95mHrZutm67Z2rVLFSvs79OyJNZSgKaTVfDt2DIsNiw2LVW7/HG1HbUdtx7Q0zuAMzrh7V7EG4z6RX4QAUk+1+zxSKZVSN2xQKvNw4kqu5MqRIxUrbwkv4SV5ec4NeRpW74UnU78THq/m1bz62285kRM58auv6HV6nV5fs0Z6Unq6UtXho3yUj0ZHK1VecUBxQHHArVvkQz7ks2GDUuXiPpFf5vaR9MExD+Xv86jbUrelbovzwldQLuVS7vDh9Cq9Sq/KXxxf5It8MT7eYrFYLJbvviMLWchCFJwWnBac1rWr1xivMV5jnn/eYXVYHdZ+/cQKsUKseO45aZnt/v2lwNOnD6dzOqd37er8Baz4eWuu85HJmZxZUyMuiAviwrVr0r4cV65I9yFcvSrui/vi/pkzvJJX8srycgqgAAo4dcrW19bX1vf06dJRpaNKR9271/h1G5Z1n+s112vunDly70HO2ZzN2dHRFEVRFLVunVLnz3HHccdxZ+1a7WztbO3s2bMVGxN54D6R7dvdfUzE7QfRVVtVN5dyKTctzdze3N7cfvFipdutq9XV6movXhRRIkpEOVeDbX6cz/mcb7VavC3eFu8+fZrrdaUuOE9PR1tHW0fbLl3EOXFOnOvcWQSIABHQrRvP5/k8v0sX2k7baXuXLpRIiZT45puyT2seTsNpuNnMIRzCIevWifVivVh/5YrjkOOQ49C1a0qtFizNIjSbpSOdTrb2EhFRRUVgYGBgYGCnTkaj0Wg02u3ylvdfmJ2lLrfNQJxjHucjzkecj3j7belGJQWonHmEHgs9FnosKEjuwNHgKl2lqwcPNvfLPrjz4ZUrDf9ep+t0vbRU6tL57/P11/XX9dede3rLGEAO0kE6aLVK07A/+6zhcV/yJV/ZSv0Z/oQ/4U8OHRLTxXQxXe4A8vTT574/9/2570NDpWOTSal2OsdE7Bn2DHvGX/4i5oq5Yq6v/Gf6gTER981E3HYMxGq1Wq3WadOUHvNQerZVY+KGuCFuKNdnTfmUT/nNH0DgEXbSTtqp3HkX3UQ30U3Bz1U9jImoy+0CSMNsq1W8ile9/bZiBas02+pn9KQnvXIXuv2Y/Zj92KFDqrXXTYlskS2yjxzhjbyRNyrQpTSBJtAE5QOIE2ZnqcPtAsj52POx52OnTxdLxVKxtF8/pcpVO/NwEqkiVaQOGyZ7e1fxKl515szJj09+fPLj779Xq73uSuriq6iQuhAtFrnLEzZhE7aXXnKOTSndXmQi6nCbAOLMPKg9taf2rn+fR2PSoGr//tLOfP7+shdoIhOZ0HWlusN0mA4r8D7Uz4LirtyVu+r1ajUXmYiy3CaAuHvmIVGwi2E5LaflCCBqk7YBUPB9WEbLaJl6XVnIRJTl8gHE3TOPBkxMrMCFXX+jm3aCdoJ2Ql6e2s12d7WXay/XXs7Pl46cs9Zk1I/6UT/1AogTMhFluHwAQeZBRCQEf8Qf8UdDh8pe1BgaQ2NOnSo2FhuLjdeuqdtuKI8rjyuPq6qiFEqhFPmn14rRYrQYPWRIUHpQelB6mzZqtRuZiDJcNoAg85AYphmmGaa98IJYIBaIBc88I3d5XMqlXHrggNrthkaiKZqilerKatfOr8ivyK8oPFztZiMTkZfLBhBkHvX1Gc/jebxyXQq8kBfyQox9tDQiR+SIHAXfl3k0j+ap35WFTEReLhtANDGaGE1Mbq50lJ7uXHtItgJbWObRoIzKqEy5sQ/NMM0wzbDDh9VuNjyIl/NyXn7sWMMe5HILoiAKUj+AOCmWiRjIQIb798lIRjJu3mzLsmXZspzfQ67HZQOIqZ2pnandpUvShjeJiZpgTbAm2JmJNH9AaWmZh0Sjod20m3a/9JLsRf2Ofke/Ky2V7j+4eVPtlsODpOvgp5/oDJ2hM0VFcpcn/i3+Lf4dGRlxKeJSxCVvb7XbL1sm0ihgaJO0SdqkPn3MgeZAc+DMma5+H5TLBpDGZAsoLTTzaNinQZAg0bmz7AVGUiRFouuqxQukQApU4H3aSBtpY5s2dRPqJtRNiIhQu9lOvzoTeUTAKOpb1Leo7+XLardTKW4TQBprHFA8rZ5WT2uvXvw3/hv/bfVqLuIiLqquftTrtMzMQ/l9GsQmsUlsQgBp8WbSTJqp9PvUcrqynjgTQcD4n9w2gDRWOKVwSuGUH36wBFuCLcHJyZ47PHd47ujd+6EBpYVmHk4N+zTIXU79Wku1WbVZtVlHjqjdbvjfKjIqMioyCgoe9wdS82g5AcTpoZkIAsYTcfv9QB5X+Nnws+FnAwLs3nZvu3dyMl/n63z99m2LzqKz6N57T+36OTmnL1s7WztbO9+8SUVUREXt28tbqsUiZXLqLWHxKNIaTVlZUpdebKxsBTExsdEojQXFxand7oeej2R9sj45N5f2037aP2KEbAXVfyHXBdUF1QV17Chl6j/fCEu18/Cx/mP9xytWUAzFUEynTtpqbbW2OjUVgeLxuOz85Ob24Adqzhy16/Mwzn0ZNFaNVWOVO3AQSftuHDhAZjKTWe3Ww2PbT/tpv3OVZBkDiIlMZPLy8lztudpzdVSUtHHb/v1qN9/JPMs8yzxr+XK169FaoQvLxWhPaU9pT8n4hdDYJJpESq61BM2DiYkVfN8+pU/p05bXlQW/DgKIi+FdvIt3KTD2UczFXGyzSSm/c60laC2qk6uTq5OLipxjebIXeIEu0AUEEFeDAOIinEsmsAd7sMeQIXKXJwzCIAxms9S1V1mpdvvhyUhrZN2/zymcwinHjsldHn/IH/KHBoM0lujnp3b7oXkggLiIylmVsypnhYUptie0IEECXVet3hk6Q2fkfx9FmAgTYR4ejoOOg46D8v/AAWUggLgIcU/cE/cU7CJQug8d5LGSVtJK5d5HjuM4jkNXlqtAAHEVY2ksjVXqwqyrq5tcN7lu8tGjajcbfh3fr3y/8v3KZOJCLuRCBboi8ymf8hFAXAUCSCs3IGtA1oAsLy9xWBwWhyMj5S6PczmXc4uKWtp8fmiaPJEn8oTNRttpO22X/weBtOVtaOjAgQMHDhzYoYPa7YdfBwGklWv7Rdsv2n4xeDAVUzEVP/WU7AVayUpWdF25nJ20k3YqMBaSIBJEglbbJq5NXJs4BRb5BFkhgLR2Su+7sJW20lYEEFfD1/gaX1NwLGQmz+SZ6Mpq7RBAWjul9l2o30fCa4nXEq8lBQVqNxuaV9CzQc8GPVtSQuEUTuF37sheYAEVUAECSGuHANJKSfd9tG0rTcOUf7ls9mM/9jt+/HiP4z2O91BqET5QitFoNBqNdjtNp+k0XYFFMffQHtoTHCytUabAdgMgCwSQVur2mttrbq/x86Pu1J26Z2VJj168KFuB+2gf7UPXlavjlbySV8q9p/3Vq9Laaf/8p81sM9vMPj5qtxuaBosptlIN+48sokW0KD7e+XhoVGhUaJS/v6ZGU6OpGTKEsimbskeNoliKpdgxY6Rn9ez5pOVxf+7P/RFAXJ3WV+ur9T10yHHDccNxowkvEEERFHHjBnWgDtShsJD6Ul/qm5/P63k9r8/JsdSTnsws3ZCqdquhqRBAXEzJsZJjJceuXJGOjEZpBzqj0fl3w27DbsPuwEDHMscyx7JRoyie4in+xRcpmIIpODpaJIkkkRQQ4Hy+c9+Iu5l3M+9mFhaq3T6QV7Gx2FhsLC2VupZu3my8o2XD/hkX6AJdKCwUdaJO1OXkNASITEumJfP/BQhwaQggbsYUY4oxxVit0tHmzWQhC1k2b5aOhTBMM0wzTHvhBR7P43l8dLTQCI3QdOp0bt65eefm1daqXX9QgsMhBY61a7kLd+EuNTXOzKQ4qjiqOKq0tOF54NaQPIJbwIZSAM0Pg+gAANAkCCAAANAkCCAAANAkCCAAANAkCCAAANAkCCAAANAkuA8E3MNCWkgLjx+ntbSW1ipQzlSaSlPVbjQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8av8Hhlp7jPTTJqMAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTktMTEtMThUMTA6MzY6MTArMDg6MDCSzy1cAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTExLTE4VDEwOjM2OjEwKzA4OjAw45KV4AAAAEt0RVh0c3ZnOmJhc2UtdXJpAGZpbGU6Ly8vaG9tZS9hZG1pbi9pY29uLWZvbnQvdG1wL2ljb25feXJxNDdvdWN6b2ovYnVrZWppYW4uc3ZnoH8NoAAAAABJRU5ErkJggg=="

/***/ }),

/***/ 497:
/*!***************************************************!*\
  !*** G:/work/洁利来h5商城/static/img/inpus/kejian.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 5:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 6);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 500:
/*!**********************************************************!*\
  !*** G:/work/洁利来h5商城/components/InputGrouds/js/utils.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var Utils = {
  phoneCheck: function phoneCheck(value) {
    var reg = /^1\d{10}$/;
    var r = reg.test(value);
    return r;
  },
  passCheck: function passCheck(val) {
    var patrn = /^(\w){6,20}$/;
    if (!patrn.exec(val)) return false;
    return true;
  },
  // 银行卡校验
  bankCardCheck: function bankCardCheck(val) {
    var patrn = /^([1-9]{1})(\d{15}|\d{18})$/;
    if (!patrn.test(val)) return false;
    return true;
  },
  // 中文字符
  chineseCheck: function chineseCheck(val) {
    var patrn = /^[\u4E00-\u9FA5]{2,4}/;

    if (!patrn.test(val)) return false;
    return true;
  },
  // 银行卡数字加密
  encryptBankCode: function encryptBankCode(val) {

    var str = val.replace(/\s/g, '');
    console.log(str);
    var reg = /^(\d{4})\d+(\d{4})$/;
    str.replace(reg, "$1 **** **** $2");
    console.log(str);
    return str;
  },


  /**
      * Parse the time to string
      * @param {(Object|string|number)} time
      * @param {string} cFormat
      * @returns {string}
      */
  parseTime: function parseTime(time, cFormat) {
    if (arguments.length === 0) {
      return null;
    }
    var format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    var date;
    if (typeof time === 'object') {
      date = time;
    } else {
      if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
        time = parseInt(time);
      }
      if (typeof time === 'number' && time.toString().length === 10) {
        time = time * 1000;
      }
      date = new Date(time);
    }
    var formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay() };

    var time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, function (result, key) {
      var value = formatObj[key];
      // Note: getDay() returns 0 on Sunday
      if (key === 'a') {
        return ['日', '一', '二', '三', '四', '五', '六'][value];
      }
      if (result.length > 0 && value < 10) {
        value = '0' + value;
      }
      return value || 0;
    });
    return time_str;
  },

  /**
      * @param {number} time
      * @param {string} option
      * @returns {string}
      */
  formatTime: function formatTime(time, option) {
    if (('' + time).length === 10) {
      time = parseInt(time) * 1000;
    } else {
      time = +time;
    }
    var d = new Date(time);
    var now = Date.now();

    var diff = (now - d) / 1000;

    if (diff < 30) {
      return '刚刚';
    } else if (diff < 3600) {
      // less 1 hour
      return Math.ceil(diff / 60) + '分钟前';
    } else if (diff < 3600 * 24) {
      return Math.ceil(diff / 3600) + '小时前';
    } else if (diff < 3600 * 24 * 2) {
      return '1天前';
    }
    if (option) {
      return parseTime(time, option);
    } else {
      return (
        d.getMonth() +
        1 +
        '月' +
        d.getDate() +
        '日' +
        d.getHours() +
        '时' +
        d.getMinutes() +
        '分');

    }
  },
  /**
      * @param {string} type
      * @returns {Date}
      */
  getTime: function getTime(type) {
    if (type === 'start') {
      return new Date().getTime() - 3600 * 1000 * 24 * 90;
    } else {
      return new Date(new Date().toDateString());
    }
  }

  // 微信初始化
};var _default =



Utils;exports.default = _default;

/***/ }),

/***/ 501:
/*!******************************************************************!*\
  !*** G:/work/洁利来h5商城/components/InputGrouds/js/defaultInputs.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var defaultInputs = {
  // 普通文本类型
  text: {
    type: 'text',
    label: '普通文本',
    required: true,
    id: 'username',
    ifArrow: false,
    classfy: 'phone',
    errMsg: '输入错误示例',
    icon: 'icon-fenlei',
    iconColor: '#333',
    rule: '',
    placeholder: '' },

  // 用户手机号码
  phone: {
    type: 'phone',
    label: '手机号码',
    required: true,
    id: 'userphone',
    ifArrow: false,
    classfy: 'phone',
    errMsg: '无效的手机号',
    icon: 'icon-phone_icon',

    iconColor: '#333',
    rule: /^[1][0-9]{10}$/,
    placeholder: '' },

  // 用户密码类型
  password: {
    type: 'password',
    label: '密码',
    required: true,
    id: 'userpass',
    ifArrow: true,
    errMsg: '密码为6位数以上',
    icon: 'icon-mima',
    iconColor: '#333',
    rule: /^(\w){6,20}$/,
    placeholder: '',
    defaulPass: true },

  // 用户验证码；类型
  verify: {
    type: 'verify',
    label: '验证码',
    required: true,
    id: 'userverify',
    relevantId: 'userPassword',
    ifArrow: true,
    errMsg: '验证码错误',
    icon: 'icon-yanzhengma',
    iconColor: '#333',
    rule: '',
    placeholder: '',
    defaulPass: true,
    arg: {} },



  // 用户密码类型
  repass: {
    type: 'repass',
    label: '确认密码',
    required: true,
    id: 'repassword',
    ifArrow: true,
    errMsg: '错误的密码格式,两次密码不一致',
    icon: 'icon-quanxianyuechi-xianxing',
    iconColor: '#333',
    rule: '',
    placeholder: '',
    defaulPass: true },

  // 银行卡
  bankCard: {
    type: 'bankCard',
    label: '银行卡卡号',
    required: true,
    id: 'bankCard',
    ifArrow: true,
    errMsg: '错误的银行卡号',
    icon: 'icon-qiabao',
    iconColor: '#333',
    rule: /^([1-9]{1})(\d{15}|\d{18})$/,
    placeholder: '',
    defaulPass: true },

  // 邮箱类型
  eMail: {
    type: 'eMail',
    label: '电子邮箱',
    required: true,
    id: 'eMail',
    ifArrow: true,
    errMsg: '错误的邮箱号码',
    icon: 'icon-xiaoxi',
    iconColor: '#333',
    rule: /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/,
    placeholder: '',
    defaulPass: true },

  // 身份证
  idCard: {
    type: 'idCard',
    label: '身份证',
    required: true,
    id: 'idCard',
    ifArrow: true,
    errMsg: '错误的身份证号码',
    icon: 'icon-qiapian',
    iconColor: '#333',
    rule: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    placeholder: '',
    defaulPass: true } };var _default =




defaultInputs;exports.default = _default;

/***/ }),

/***/ 6:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 7:
/*!**********************************!*\
  !*** G:/work/洁利来h5商城/pages.json ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 84:
/*!********************************************!*\
  !*** G:/work/洁利来h5商城/static/img/dd_df.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 85:
/*!*********************************************!*\
  !*** G:/work/洁利来h5商城/static/img/dd_dfh.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 86:
/*!*********************************************!*\
  !*** G:/work/洁利来h5商城/static/img/dd_dsh.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 87:
/*!********************************************!*\
  !*** G:/work/洁利来h5商城/static/img/dd_th.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 88:
/*!********************************************!*\
  !*** G:/work/洁利来h5商城/static/img/ic_dz.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 89:
/*!********************************************!*\
  !*** G:/work/洁利来h5商城/static/img/ic_bz.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABD1JREFUaAXtmE1oXFUUgDOZxDRtgiFWBtNFycJqNwpOfkwyYkp/pmbAjQ1Z1BQnFSyI2kKhLlNoFlUwoLbQQpMSumhLCy1WWgcrEZo2ZJJVF62KBISYIlQ0iZKZTGb8TvpOuAnMZOa9zKuL9+Dl3HPe/fnuuefeczMlJd7jecDzgOcBzwMOPOB30NZR05aWlspAIFAzPT39r5OOSp00ttu2ubn5lWQy+avP53vU0NDQ39nZaduRPrsQdtu1trZuTSQSd2lfZ/QRq66u7hoeHv7LsOVVdHUCTU1Nzy0uLt6B7OXVdKzGz9jeHh8f/2n1t1y6ayEUDAY3An8DGIVPAH1B4TKZzDbeUSYZVls+0pUJtLe3lwFzmfd1CyoN/Lt4u7u0tDSKLWnZa9Lp9Lfsi4OWvqZwZQJzc3NnIIkoDfAfA39F9Hg8ft7v9+/C9qforIJs6K/klBJ9rafoE8CbfUD1KAigfcCfUl0kXk9Qp0JtlCfD4XBC9VyyqJsY+A+B+VoBgB8AfkV4cKS+mEqlRqjzvNSjziPCqnVsbGxS2+WSRVsB4PcB/6Ux+I2qqqoPDL0E+AAb+xY2hZ+l3JEvvPRVlBVobGx8k7D4jv41LEYp75yYmFjOum1tbdXz8/PD2F/jlSeJ5zvYE7efqPn9tZ0Bs3UvWRavxvi+yarzUDYpoTOjbThSy6lzHT1k2TKETjd1vtE6+cp1DSHJssTzTQZ/1gL4vaKiYi8h8ViBCCtZ9UHkbrXh+SPAX1S9ELluISRZlrAZAewlC+Bv5BuEzX0TCO9/jn5UbXj+M+CPqV6oXJcJSJZlYIldTVQJvBomnn80gdjYh5lgv9qAH6LOe8iM2gqVjkMoS5bdvxqejd0F/BcKCPQtTqWDTuClL8cTIMuepZ/lLIvnPyIkriqoSFZoB+E1RHFpxYGO19bW7uP2mTLr2Sk7mgBgx/FqVAcG/gSeP626SPbGqwBfo/iMZf+lsrIyEovF/rF0R8L2HpC7ysLCwgwTkIuaZNBzeP59k8a6+9/D9oJVp6Asa/aVrWx7BfB2mQE/X19fvyLLyqnEf12SzBR+hkm+VUiWzQZt2m2vAPA+TpVFOpM+MnjfD+DSaWKtzm3qtFiDJUlmAv+DOfh6lG2vgAWrcewLhUJVAsSptIHQumTAZ1itA8WAl/Fsr4A0ZhNPIeqkzPOAVy5lm0Uxnk9IZualzvjkvLi0Ae12wyrM4mltvl0LKvH8SU6losHLOLZDSBoDL7fMFQ+TkrP9N2Qf8J+u+FgExdEK8FPIIRKZ3CAX2KRTJKupSCTyR29vb7oIrF6X/0sP5DyFBgcHazgS90Cu/1m5PYlEeXl5LBqNZv3FLuceAP57NmrQbWpzPBgm0BtMm1nOeQoBv8Ws/DTKazHkXAGOwneA7uHVm6Tbc5Bf7AbcHtQbz/OA5wHPA54HPA+45oH/AGO2hfhPWNrHAAAAAElFTkSuQmCC"

/***/ }),

/***/ 90:
/*!********************************************!*\
  !*** G:/work/洁利来h5商城/static/img/ic_sz.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABVJJREFUaAXtmE1oXFUUxzP5UmiCRMyiptJoBambKPmalIpBJJtAs9GNWAsmUXAppqgLG6xYjVqQ4kKTCH4h2G4s2SgiEYuZfFFCwSL4UdHShZJNCKQhyfj7P+8Z7kzfm7w3Q0HwXbhz7z33nP/533M/39TUpCmNQBqBNAJpBP7PEchUM/jOzs4D2D9OvoucCCuTyezk8/k/a2trv1hcXPy1Uh6JnPpOID8AiS8hcasvT1oHYwOMoeXl5a+T2kq/ogH09PR07ezsfF8teSOsQTATDy0sLCyZLG5ZH1fR9CCd6erqOkM7iDzOL1L/EPm26cQpsatD72nsHlQgtre3z1AeQp6PY286iWegu7v7SaL/iQO4XldXd5DI/WaASUpm8m6IX8bmFtkxC0fZD58mwahNojwwMLAH8m94NqcrJS8MZ3va8IQtH9aOUyYawOrq6kuAtjnga83Nza/HcVJOx2Fcczptzkc5k6K+2Esom822b21tXdZ6FQJr9djS0tLHRWgVNthTT4H7kcPdqK+vP5jL5a7EgYs9A5B/yyO/wFq1fRDHT1kdYRGQBSnJh3yVNfA6Y80AG/dh1uess8sToUPz8/M5D6dQnZ6ebmZjvoDgCGTuVQfkfqY4z4Z/e3h4eE2y0tTb25uF+A/IA05s6H4G9l2pXml71xkYHx+vhfy7ZgiZz6LIT05OPgL5SxB/hfwANk3KqkumPukYll8KU9gmk0/5tnZUuavCzMzMKMYdDmC9oaHhxTAwEYPkN+T9Yf2SqU86UYNw2OvOvsP5joIL5GUHwHPhNhyeNAQidGpubu6qta3UskFPl1kw/ejpjfME/Xcqqy6Z9KUjXdmo7Sdhy4fJ0DspDtYOK8vexICdAKTVGV5pamp6JwxEax69IPKOfMfIyMiqp/v51NTUVyyLFfT2SdftkxOeTlCVj7W1tREa7eRWcaB8nhyaImeAkd+Bo+fMCqCx2dnZDWv7JXpD1kbveAn5oEsy9Zke5RGvXqjKh3yZQBzExdqlZeQAUDxMDq54ABc588+VGnvtA1b3TisTFUq/D2LBCVXo9CryJZ9OJA7iEprKDSDU4L8mLDeAC5C9LsJEq5tp1IdLaCJaOueDpPP739qNv36fb1OqKV/y6eTiIC6hKXIAfGD8jZP3PKuJ/v7+4Bnhyax63io4nmDD3m5tKyVTn7UpCzaerMb5KOiJg7j4On693m+U1nH4KrKj5FZyO6eDbtjXyEVJNyynyjH095P36bThrD9ua16Rpz6hPhlC6nfZFIG4hvPR7pp/YSMOkSk4tyN76eAZ8QzO33c6642NjfeF3QXeRVYWE/J58qOjo6Pflvrt6+tr29zc/Al58KRm4M/ynPigVM9vRy4hUxocHJyivuLae3DwpvX5pQiJmKLry/26+qQTRl56Dtu+B1acbx/ihnrZaJl2JY85pl53Q3C8Qlqb/KY85mINQAPhzX4WUo+pDiE9p7OUebWrTeBmCFKOskdY4J7jLog89Xx/uy4hU+YJPQZwcBPLkT5CrK/a0n3QGHl90IzFxYw9AH0hMQD/5DjFkdcU11GUnsMoPODkI+7XmDBjD0DKLS0t+qC31+hejryXJa8mOYy9DuOq8xEbMvYeMETWatHfKhx197MfKvprEKx7OKJ/BDt4c4GV+G+VxAPQhmPN6tMvq0Ex5RcpqvpjSzikHBv35v+xJU98v3Zy815gMFFPC6nFTjocuJkP81m5HNvIKSbaAwYuR5AfkmOTVVoKQ1iVkJfPxEvIJ8qrUReVzuvEf69jozvkD/JZHmu/UKYpjUAagTQCaQTSCCSOwD8i3XsnQnS1iQAAAABJRU5ErkJggg=="

/***/ }),

/***/ 91:
/*!********************************************!*\
  !*** G:/work/洁利来h5商城/static/img/ic_kf.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map