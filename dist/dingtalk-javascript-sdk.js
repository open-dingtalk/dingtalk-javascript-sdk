'use strict';

var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

function parse(e, r, n) {
  var i = Object.create(null);if ("string" != typeof e || 0 === e.length) return i;r = r || "&", n = n || "=";for (var o = e.split(r), t = 0, a = o.length; t < a; t++) {
    var l = o[t].split(n),
        s = l[0].trim(),
        u = "";l.length >= 3 ? function () {
      l.splice(0, 1);var e = l.length - 1;l.forEach(function (r, i) {
        r = r.trim(), u += i === e ? r : r + n;
      });
    }() : u = l[1].trim();var d = i[s];if (d) {
      if (Array.isArray(d)) d.push(decodeURIComponent(u));else {
        var p = d;i[s] = new Array(), i[s].push(p), i[s].push(decodeURIComponent(u));
      }
    } else i[s] = decodeURIComponent(u);
  }return i;
}function stringify(e, r, n) {
  if (r = r || "&", n = n || "=", null !== e && "object" === (void 0 === e ? "undefined" : _typeof(e))) {
    for (var i = Object.keys(e), o = i.length, t = o - 1, a = "", l = 0; l < o; l++) {
      var s = i[l],
          u = e[s],
          d = s + n;if (Array.isArray(u)) {
        for (var p = u.length, g = p - 1, c = 0; c < p; ++c) {
          a += d + decodeURIComponent(u[c]), c < g && (a += r);
        }p && l < t && (a += r);
      } else a += d + decodeURIComponent(u), l < t && (a += r);
    }return a;
  }return "";
}function format(e, r) {
  return e + "?" + querystring.stringify(r);
}function parse$1(e, r) {
  var n = { hash: null, search: null };if (!e) return {};var i = e.indexOf("?");if (-1 === i) return {};var o = e.indexOf("#");o > -1 ? (n.hash = e.slice(o), n.search = e.slice(i, o)) : n.search = e.slice(i);var t = n.search.slice(1),
      a = querystring.parse(t);return "string" == typeof r && r.length > 0 ? a[r] : a;
}function getEnv() {
  var e = {};if ("undefined" != typeof weex) {
    var r = weex.config,
        n = r.env;if (e.platform = n.platform, e.bundleFrameworkType = "Vue", "Web" !== e.platform) e.dingtalk = { bundleUrl: r.bundleUrl, originalUrl: r.originalUrl }, e.appVersion = n.appVersion, e.appName = n.appName;else {
      var i = location.href,
          o = url.parse(i, "dd_wx_tpl"),
          t = url.parse(i, "_wx_tpl");e.dingtalk = { bundleUrl: o || t || "", originalUrl: i };
    }
  } else {
    if ("function" == typeof callNative) e.platform = navigator.platform, e.appName = navigator.appName, e.appVersion = navigator.appVersion, e.dingtalk = { bundleUrl: __weex_options__.bundleUrl, originalUrl: __weex_options__.originalUrl };else {
      e.platform = "Web";var a = location.href,
          l = url.parse(a, "dd_wx_tpl"),
          s = url.parse(a, "_wx_tpl");e.dingtalk = { bundleUrl: l || s || "", originalUrl: a };
    }e.bundleFrameworkType = "Rax";
  }return e;
}function dingtalkContainer() {
  return isWeex$1 ? "DingTalk" === env$2.appName || "com.alibaba.android.rimet" === env$2.appName : UA && UA.indexOf("dingtalk") > -1;
}function webAndroid() {
  return isWeb$1 ? UA && UA.indexOf("android") > -1 : null;
}function webiOS() {
  return isWeb$1 ? UA && /iphone|ipad|ipod|ios/.test(UA) : null;
}function fetchVersion() {
  if (isWeb$1) {
    var e = UA.match(/aliapp\(\w+\/([a-zA-Z0-9.-]+)\)/);null === e && (e = UA.match(/dingtalk\/([a-zA-Z0-9.-]+)/));return e && e[1];
  }return env$2.appVersion;
}function toPlatform() {
  var e = void 0;return isDingtalk$1 ? isWebAndroid ? e = "web.android" : isWebiOS ? e = "web.ios" : isWeexAndroid ? e = "weex.android" : isWeexiOS && (e = "weex.ios") : e = "not.dingtalk", e;
}function compareVersion(e, r, n) {
  if ("string" != typeof e || "string" != typeof r) return !1;var i = e.split("."),
      o = r.split("."),
      t = void 0,
      a = void 0;do {
    t = i.shift(), a = o.shift();
  } while (t === a && o.length > 0);return n ? (0 | a) >= (0 | t) : (0 | a) > (0 | t);
}function requireModule$1(e) {
  if (isWeex$1$1) {
    if ("Vue" === bundleFrameworkType$1) return weex.requireModule(e);var r = "@weex-module/" + e;return __weex_require__(r);
  }if ("Vue" === bundleFrameworkType$1) return weex.requireModule(e);
}function Document() {
  return isWeex$2 && "Vue" === bundleFrameworkType$2 ? weex.document : document;
}function setTimeout(e, r) {
  return isWeex$3 ? (timer.setTimeout(e, r), doc.taskCenter.callbackManager.lastCallbackId.toString()) : window.setTimeout(e, r);
}function clearTimeout(e) {
  isWeex$3 ? timer.clearTimeout(e) : window.clearTimeout(e);
}function setInterval(e, r) {
  return isWeex$3 ? (timer.setInterval(e, r), doc.taskCenter.callbackManager.lastCallbackId.toString()) : window.setInterval(e, r);
}function clearInterva(e) {
  isWeex$3 ? timer.clearInterva(e) : window.clearInterva(e);
}function fillZore(e) {
  var r = "00" + e;return r.substring(r.length - 2);
}var _typeof = "function" == typeof Symbol && "symbol" == _typeof$1(Symbol.iterator) ? function (e) {
  return typeof e === "undefined" ? "undefined" : _typeof$1(e);
} : function (e) {
  return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof$1(e);
};
var toConsumableArray$$1 = function toConsumableArray$$1(e) {
  if (Array.isArray(e)) {
    for (var r = 0, n = Array(e.length); r < e.length; r++) {
      n[r] = e[r];
    }return n;
  }return Array.from(e);
};
var querystring = { stringify: stringify, parse: parse };
var url = { format: format, parse: parse$1 };
var env$2 = getEnv();
var isWeb$1 = "Web" === env$2.platform;
var isWeexiOS = "iOS" === env$2.platform;
var isWeexAndroid = "android" === env$2.platform;
var isWeex$1 = isWeexiOS || isWeexAndroid;
var dingtalk = env$2.dingtalk;
var bundleFrameworkType = env$2.bundleFrameworkType;
var bundleUrl = dingtalk.bundleUrl;
var originalUrl = dingtalk.originalUrl;
var UA = void 0;isWeb$1 && (UA = window.navigator.userAgent.toLowerCase());var isDingtalk$1 = dingtalkContainer(); var isWebiOS = webiOS(); var isWebAndroid = webAndroid(); var version = fetchVersion(); var env$1$1 = { isDingtalk: isDingtalk$1, isWeb: isWeb$1, isWebiOS: isWebiOS, isWebAndroid: isWebAndroid, isWeex: isWeex$1, isWeexiOS: isWeexiOS, isWeexAndroid: isWeexAndroid, bundleFrameworkType: bundleFrameworkType, bundleUrl: bundleUrl, originalUrl: originalUrl, version: version, platform: toPlatform() }; var bundleFrameworkType$1 = env$1$1.bundleFrameworkType; var isWeex$1$1 = env$1$1.isWeex; var bundleFrameworkType$2 = env$1$1.bundleFrameworkType; var isWeex$2 = env$1$1.isWeex; var doc = Document(); var timer = requireModule$1("timer"); var isWeex$3 = env$1$1.isWeex; var timer$1 = { setTimeout: setTimeout, clearTimeout: clearTimeout, setInterval: setInterval, clearInterva: clearInterva }; var LOG = "LOG"; var INFO = "INFO"; var WARNING = "WARNING"; var ERROR = "ERROR"; var LogType$1 = { LOG: LOG, INFO: INFO, WARNING: WARNING, ERROR: ERROR }; var logChannel = function logChannel(e) {
  var r,
      n,
      i,
      o,
      t = fillZore(e.time.getHours()) + ":" + fillZore(e.time.getMinutes()) + ":" + fillZore(e.time.getSeconds());switch (e.type) {case LogType$1.LOG:
      (r = console).log.apply(r, ["time:" + t + " | log: "].concat(toConsumableArray$$1(e.logArr)));break;case LogType$1.INFO:
      (n = console).info.apply(n, ["time:" + t + " | info: "].concat(toConsumableArray$$1(e.logArr)));break;case LogType$1.ERROR:
      (i = console).error.apply(i, ["time:" + t + " | error: "].concat(toConsumableArray$$1(e.logArr)));break;case LogType$1.WARNING:
      (o = console).warn.apply(o, ["time:" + t + " | warning: "].concat(toConsumableArray$$1(e.logArr)));}
}; var setLog$1 = function setLog$1(e) {
  logChannel = e;
}; var log$1 = function log$1(e) {
  var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : LogType$1.LOG;logChannel({ type: r, logArr: e, time: new Date() });
};log$1(["current environment: " + env$1$1.platform]);var logger = { log: log$1, setLog: setLog$1, LogType: LogType$1 }; var log = logger.log; var setLog = logger.setLog; var LogType = logger.LogType; var index = { querystring: querystring, url: url, env: env$1$1, compareVersion: compareVersion, requireModule: requireModule$1, document: doc, timer: timer$1, LogType: LogType, setLog: setLog, log: log };var journeyMin = index;

var env$1 = journeyMin.env;
var requireModule = journeyMin.requireModule;


var polyfills = {
  env: env$1,
  requireModule: requireModule
};

/**
 * Created by xiangwenwen on 2017/3/24.
 */

var cat = {};

/**
 * Created by xiangwenwen on 2017/3/27.
 */

// import exec from 'dingtalk-sdk-exec';

/**
 * Created by xiangwenwen on 2017/3/24.
 */

// import exec from 'dingtalk-sdk-exec';
// let env = polyfills.env;
// let globalEvent: Object = {};
// const { isWeex } = env;
// if (isWeex){
//   globalEvent = polyfills.requireModule('globalEvent');
// }

// function rtFunc(method: string): Function {
//   return function(cb: Function) {
//     const config:{
//       body: Object,
//       onSuccess: Function,
//       onFail: Function,
//       context: ?Object
//     } = {
//       body: {
//         plugin: 'runtime',
//         action: method,
//         args: {}
//       },
//       onSuccess: function(response){
//         if (typeof cb === 'function'){
//           cb(response);
//         }
//       },
//       onFail: function(){

//       },
//       context: null
//     };
//     exec(config);
//   };
// }

// function initDingtalkRequire(cb: Function){
//     rtFunc('getModules')(cb);
// }

// let ship: {
//   apis: ?Object,
//   isReady: boolean,
//   runtime: Object,
//   init: Function,
//   ready: Function,
//   on: Function,
//   off: Function,
//   EventEmitter: Object
// } = {
//   getModules: null,
//   isReady: false,
//   runtime: {
//     info: rtFunc('info'),
//     _interceptBackButton: rtFunc('interceptBackButton'),
//     _interceptNavTitle: rtFunc('interceptNavTitle'),
//     _recoverNavTitle: rtFunc('recoverNavTitle'),
//     _getModules: rtFunc('getModules')
//   },
//   init: function(){
//     initDingtalkRequire(function(response){
//       if(response){
//         ship.isReady = true;
//         ship.apis = parseJsApis(response);
//         EventEmitter.emit('__ship_ready__');
//       }
//     });
//   },
//   ready: function(cb: Function){
//     if (ship.isReady){
//       if (typeof cb === 'function'){
//         cb();
//       }
//     } else {
//       if (typeof cb === 'function'){
//         EventEmitter.once('__ship_ready__', function(){
//           cb();
//         });
//       }
//     }
//   },
//   on: function(type: string, handler: Function){
//     globalEvent.addEventListener(type,function(e){
//       const event:{
//         preventDefault: Function,
//         detail: Object
//       } = {
//         preventDefault: function () {
//           console.warn('当前环境不支持 preventDefault')
//         },
//         detail: e
//       };
//       handler.call(this,event);
//     });
//   },
//   off: globalEvent.removeEventListener,
//   EventEmitter: EventEmitter
// };

var ship = {};

var logger$1 = {
  warn: function warn(msg, e) {
    console.warn('[DINGTALK JS SDK Warning]:', msg);
    if (e) {
      throw e;
    } else {
      var warning = new Error('WARNING STACK TRACE');
      console.warn(warning.stack);
    }
  },
  info: function info(msg) {
    console.info('[DINGTALK JS SDK INFO]:', msg);
  },
  error: function error(msg) {
    console.error('[DINGTALK JS SDK ERROR]:', msg);
  }
};

var checks = ['agentId', 'corpId', 'timeStamp', 'nonceStr', 'signature', 'jsApiList'];

function checkConfigVars(config) {
  /*
    corpId,
    appId,
    timeStamp,
    nonceStr,
    signature,
    jsApiList,
    type,
    agentId
   */
  var checkInfo = [];
  var infoKey = Object.keys(config);
  checks.map(function (v) {
    var checkResult = infoKey.filter(function (k) {
      return v === k;
    });
    if (checkResult.length === 0) {
      logger$1.warn('configure : ' + v + 'is empty');
    }
  });
}

/**
 * Created by xiangwenwen on 2017/3/27.
 */

function permissionJsApis(cb, jsApisConfig, errorCb) {
  if (!jsApisConfig) {
    ship.ready(function () {
      cb(null);
    });
    return;
  }
  ship.ready(function () {
    var permission = ship.apis.runtime.permission;
    var apisConf = jsApisConfig ? jsApisConfig : {};
    var errCb = errorCb ? errorCb : null;
    apisConf.onSuccess = function (response) {
      cb(null, response);
    };
    apisConf.onFail = function (error) {
      if (typeof errCb === 'function') {
        errCb(error);
      } else {
        cb(error, null);
      }
    };
    permission.requestJsApis(apisConf);
  });
}

var dingtalkJsApisConfig = null;
var dingtalkQueue = null;
var dingtalkErrorCb = null;
var isReady = false;

function performQueue() {
  if (dingtalkQueue && dingtalkQueue.length > 0) {
    dingtalkQueue.forEach(function (task) {
      task();
    });
    dingtalkQueue.length = 0;
  }
}

function initDingtalkSDK() {
  var dingtalk = {
    apis: {},
    config: function (_config) {
      function config(_x) {
        return _config.apply(this, arguments);
      }

      config.toString = function () {
        return _config.toString();
      };

      return config;
    }(function (config) {
      if (!config) {
        logger$1.warn('config is undefined,you must configure Dingtalk parameters');
        return;
      }
      if (process.env.NODE_ENV !== 'production') {
        checkConfigVars(config);
      }
      dingtalkJsApisConfig = config;
    }),
    init: function init() {
      // 初始化一次
      dingtalkQueue = [];
      ship.init();
      ship.ready(function () {
        isReady = ship.isReady;
        dingtalk.apis = ship.apis ? ship.apis : {};
        performQueue();
      });
    },
    ready: function ready(cb) {
      if (!cb || typeof cb !== 'function') {
        logger$1.warn('callback is undefined');
        return;
      }
      if (isReady) {
        permissionJsApis(cb, dingtalkJsApisConfig, dingtalkErrorCb);
      } else {
        var bufferFunction = function bufferFunction(cb) {
          return function () {
            permissionJsApis(cb, dingtalkJsApisConfig, dingtalkErrorCb);
          };
        };

        dingtalkQueue && dingtalkQueue.push(bufferFunction(cb));
      }
    },
    error: function error(cb) {
      if (typeof cb === 'function') {
        dingtalkErrorCb = cb;
      }
    },
    EventEmitter: ship.EventEmitter
  };
  return dingtalk;
}

function installNativeEvent(dingtalk) {
  dingtalk.on = function (type, listener, useCapture) {
    document.addEventListener(type, listener, useCapture);
  };
  dingtalk.off = function (type, listener, useCapture) {
    document.removeEventListener(type, listener, useCapture);
  };
}

function initWebDingtalkSDK() {
  var dingtalk = initDingtalkSDK();
  installNativeEvent(dingtalk);
  return dingtalk;
}

function installNativeEvent$2(dingtalk) {
  dingtalk.on = ship.on;
  dingtalk.off = ship.off;
}

function initWeexDingtalkSDK() {
  var dingtalk = initDingtalkSDK();
  installNativeEvent$2(dingtalk);
  return dingtalk;
}

var initCtrl = true;
var env = polyfills.env;
var isDingtalk = env.isDingtalk;
var isWeex = env.isWeex;
var isWeb = env.isWeb;


var dingtalkSDK = {};

if (!isDingtalk) {
  logger$1.warn('can only open the page be Dingtalk Container');
}

if (initCtrl) {
  initCtrl = false;
  if (isWeex) {
    dingtalkSDK = initWeexDingtalkSDK();
  } else if (isWeb) {
    dingtalkSDK = initWebDingtalkSDK();
  }
  dingtalkSDK.init();
}

var dingtalkSDK$1 = dingtalkSDK;

module.exports = dingtalkSDK$1;
//# sourceMappingURL=dingtalk-javascript-sdk.js.map
