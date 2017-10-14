'use strict';

/**
 * Created by xiangwenwen on 2017/3/24.
 */

var STATUS_OK = '1';
var STATUS_ERROR = '2';

function android_exec(exec, config) {
  var body = config.body;
  var win = config.onSuccess;
  var fail = config.onFail;
  var context = config.context;
  if (exec && typeof exec === 'function') {
    exec(body, function (response) {
      if (typeof response !== "undefined" && response.__status__) {
        var status = response.__status__;
        var message = response.__message__;
        if (STATUS_OK === status) {
          win && win.call(context, message);
        } else if (STATUS_ERROR === status) {
          fail && fail.call(context, message);
        }
      } else {
        fail && fail.call('-1', "");
      }
    });
  } else {
    fail && fail.call('-1', "");
  }
}

/**
 * Created by xiangwenwen on 2017/3/24.
 */

function ios_exec(exec, config) {
  var body = config.body;
  var win = config.onSuccess;
  var fail = config.onFail;
  var context = config.context;
  if (exec && typeof exec === 'function') {
    exec(body, function (response) {
      if (typeof response !== "undefined") {
        if ('0' === response.errorCode) {
          win && win.call(context, response.result);
        } else {
          fail && fail.call(context, response.result);
        }
      } else {
        fail && fail.call('-1', "");
      }
    });
  } else {
    fail && fail.call('-1', "");
  }
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};























































var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

function parse(qs, sep, eq) {
  var obj = Object.create(null);
  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }
  sep = sep || '&';
  eq = eq || '=';
  var params = qs.split(sep);
  var i = 0;
  var l = params.length;
  for (; i < l; i++) {
    var items = params[i].split(eq);
    var queryKey = items[0].trim();
    var queryVal = '';
    if (items.length >= 3) {
      (function () {
        items.splice(0, 1);
        var lastIndex = items.length - 1;
        items.forEach(function (v, i) {
          v = v.trim();
          if (i === lastIndex) {
            queryVal += v;
          } else {
            queryVal += v + eq;
          }
        });
      })();
    } else {
      queryVal = items[1].trim();
    }
    var cur = obj[queryKey];
    if (cur) {
      if (Array.isArray(cur)) {
        cur.push(decodeURIComponent(queryVal));
      } else {
        var temp = cur;
        obj[queryKey] = new Array();
        obj[queryKey].push(temp);
        obj[queryKey].push(decodeURIComponent(queryVal));
      }
    } else {
      obj[queryKey] = decodeURIComponent(queryVal);
    }
  }
  return obj;
}

function stringify(obj, sep, eq) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
    var keys = Object.keys(obj);
    var len = keys.length;
    var flast = len - 1;
    var fields = '';
    var i = 0;
    for (; i < len; i++) {
      var k = keys[i];
      var v = obj[k];
      var ks = k + eq;
      if (Array.isArray(v)) {
        var vlen = v.length;
        var vlast = vlen - 1;
        var j = 0;
        for (; j < vlen; ++j) {
          fields += ks + decodeURIComponent(v[j]);
          if (j < vlast) {
            fields += sep;
          }
        }
        if (vlen && i < flast) {
          fields += sep;
        }
      } else {
        fields += ks + decodeURIComponent(v);
        if (i < flast) {
          fields += sep;
        }
      }
    }
    return fields;
  }
  return '';
}

var querystring$1 = {
  stringify: stringify,
  parse: parse
};

function format(url, query) {
  var search = querystring$1.stringify(query);
  return url + '?' + search;
}

function parse$1(url, parseQueryString) {
  var location = {
    hash: null,
    search: null
  };
  if (!url) {
    return {};
  }
  var searchIndex = url.indexOf('?');
  if (searchIndex === -1) {
    return {};
  }
  var hashIndex = url.indexOf('#');
  if (hashIndex > -1) {
    location.hash = url.slice(hashIndex);
    location.search = url.slice(searchIndex, hashIndex);
  } else {
    location.search = url.slice(searchIndex);
  }
  var searchString = location.search.slice(1);
  var query = querystring$1.parse(searchString);
  if (typeof parseQueryString === 'string' && parseQueryString.length > 0) {
    return query[parseQueryString];
  } else {
    return query;
  }
}

var url$1 = {
  format: format,
  parse: parse$1
};

function getEnv() {
  var containerEnv = {};
  if (typeof weex !== 'undefined') {
    var config = weex.config;
    var _env = config.env;
    containerEnv.platform = _env.platform;
    containerEnv.bundleFrameworkType = 'Vue';
    if (containerEnv.platform !== 'Web') {
      containerEnv.dingtalk = {
        bundleUrl: config.bundleUrl,
        originalUrl: config.originalUrl
      };
      containerEnv.appVersion = _env.appVersion;
      containerEnv.appName = _env.appName;
    } else {
      // Vue Web
      var href = location.href;
      var tpl = url$1.parse(href, 'dd_wx_tpl');
      var _wx_tpl = url$1.parse(href, '_wx_tpl');
      containerEnv.dingtalk = {
        bundleUrl: tpl ? tpl : _wx_tpl ? _wx_tpl : '',
        originalUrl: href
      };
    }
  } else {
    // Rax Weex
    if (typeof callNative === 'function') {
      containerEnv.platform = navigator.platform;
      containerEnv.appName = navigator.appName;
      containerEnv.appVersion = navigator.appVersion;
      containerEnv.dingtalk = {
        bundleUrl: __weex_options__.bundleUrl,
        originalUrl: __weex_options__.originalUrl
      };
    } else {
      // Rax Web
      containerEnv.platform = 'Web';
      var _href = location.href;
      var _tpl = url$1.parse(_href, 'dd_wx_tpl');
      var _wx_tpl2 = url$1.parse(_href, '_wx_tpl');
      containerEnv.dingtalk = {
        bundleUrl: _tpl ? _tpl : _wx_tpl2 ? _wx_tpl2 : '',
        originalUrl: _href
      };
    }
    containerEnv.bundleFrameworkType = 'Rax';
  }
  return containerEnv;
}

var env$1 = getEnv();
var isWeb$1 = env$1.platform === 'Web';
var isWeexiOS$1 = env$1.platform === 'iOS';
var isWeexAndroid$1 = env$1.platform === 'android';
var isWeex$3 = isWeexiOS$1 || isWeexAndroid$1;
var dingtalk = env$1.dingtalk;
var bundleFrameworkType = env$1.bundleFrameworkType;
var bundleUrl = dingtalk.bundleUrl;
var originalUrl = dingtalk.originalUrl;


var UA = void 0;
if (isWeb$1) {
  UA = window.navigator.userAgent.toLowerCase();
}

var isDingtalk$1 = dingtalkContainer();

function dingtalkContainer() {
  if (isWeex$3) {
    if (env$1.appName === 'DingTalk' || env$1.appName === 'com.alibaba.android.rimet') {
      return true;
    }
    return false;
  } else {
    return UA && UA.indexOf('dingtalk') > -1;
  }
}

function webAndroid() {
  if (isWeb$1) {
    return UA && UA.indexOf('android') > -1;
  }
  return null;
}

function webiOS() {
  if (isWeb$1) {
    return UA && /iphone|ipad|ipod|ios/.test(UA);
  }
  return null;
}

function fetchVersion() {
  if (isWeb$1) {
    var matches = UA.match(/aliapp\(\w+\/([a-zA-Z0-9.-]+)\)/);
    if (matches === null) {
      matches = UA.match(/dingtalk\/([a-zA-Z0-9.-]+)/);
    }
    var _version = matches && matches[1];
    return _version;
  } else {
    return env$1.appVersion;
  }
}

var isWebiOS = webiOS();
var isWebAndroid = webAndroid();
var version = fetchVersion();

function toPlatform() {
  var platform = void 0;
  if (isDingtalk$1) {
    if (isWebAndroid) {
      platform = 'web.android';
    } else if (isWebiOS) {
      platform = 'web.ios';
    } else if (isWeexAndroid$1) {
      platform = 'weex.android';
    } else if (isWeexiOS$1) {
      platform = 'weex.ios';
    }
  } else {
    platform = 'not.dingtalk';
  }
  return platform;
}

var env$2 = {
  isDingtalk: isDingtalk$1,
  isWeb: isWeb$1,
  isWebiOS: isWebiOS,
  isWebAndroid: isWebAndroid,
  isWeex: isWeex$3,
  isWeexiOS: isWeexiOS$1,
  isWeexAndroid: isWeexAndroid$1,
  bundleFrameworkType: bundleFrameworkType,
  bundleUrl: bundleUrl,
  originalUrl: originalUrl,
  version: version,
  platform: toPlatform()
};

var bundleFrameworkType$1 = env$2.bundleFrameworkType;
var isWeex$4 = env$2.isWeex;


function requireModule$1(name) {
  if (isWeex$4) {
    if (bundleFrameworkType$1 === 'Vue') {
      return weex.requireModule(name);
    } else {
      var moduleName = '@weex-module/' + name;
      return __weex_require__(moduleName);
    }
  } else {
    if (bundleFrameworkType$1 === 'Vue') {
      return weex.requireModule(name);
    }
  }
}

var timer$1 = requireModule$1('timer');

var LOG = 'LOG';
var INFO = 'INFO';
var WARNING = 'WARNING';
var ERROR = 'ERROR';

var LogType$1 = {
  LOG: LOG,
  INFO: INFO,
  WARNING: WARNING,
  ERROR: ERROR
};

function fillZore(str) {
  var res = '00' + str;
  return res.substring(res.length - 2);
}

var logChannel = function logChannel(logData) {
  var _console, _console2, _console3, _console4;

  var time = fillZore(logData.time.getHours()) + ':' + fillZore(logData.time.getMinutes()) + ':' + fillZore(logData.time.getSeconds());
  switch (logData.type) {
    case LogType$1.LOG:
      (_console = console).log.apply(_console, ['time:' + time + ' | log: '].concat(toConsumableArray(logData.logArr)));
      break;
    case LogType$1.INFO:
      (_console2 = console).info.apply(_console2, ['time:' + time + ' | info: '].concat(toConsumableArray(logData.logArr)));
      break;
    case LogType$1.ERROR:
      (_console3 = console).error.apply(_console3, ['time:' + time + ' | error: '].concat(toConsumableArray(logData.logArr)));
      break;
    case LogType$1.WARNING:
      (_console4 = console).warn.apply(_console4, ['time:' + time + ' | warning: '].concat(toConsumableArray(logData.logArr)));
      break;
    default:
      break;
  }
};

var setLog$1 = function setLog(fn) {
  logChannel = fn;
};

var log$1 = function log(logArr) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : LogType$1.LOG;

  logChannel({
    type: type,
    logArr: logArr,
    time: new Date()
  });
};

var dingLogger$1 = {
  log: log$1,
  setLog: setLog$1,
  LogType: LogType$1
};

var env = env$2;

var requireModule = requireModule$1;


var log = dingLogger$1.log;
var LogType = dingLogger$1.LogType;

/**
 * Created by xiangwenwen on 2017/3/27.
 */

var isAndroid = null;
var isIOS = null;
var bridgeReady = false;
var isWeb$2 = env.isWeb;


if (isWeb$2) {
  var UA$1 = window.navigator.userAgent.toLowerCase();
  isAndroid = UA$1 && UA$1.indexOf('android') > -1;
  isIOS = UA$1 && /iphone|ipad|ipod|ios/.test(UA$1);
}

function ios_exec$1(config) {
  var webViewJavascriptBridge = window._WebViewJavascriptBridge;
  if (!webViewJavascriptBridge) {
    throw 'runtime and bridge are not ready';
  }
  var body = config.body,
      onSuccess = config.onSuccess,
      onFail = config.onFail,
      context = config.context;

  webViewJavascriptBridge.callHandler('exec', body, function (response) {
    if (typeof response !== 'undefined') {
      if ('0' === response.errorCode) {
        typeof onSuccess === 'function' && onSuccess.call(context, response.result);
      } else {
        typeof onFail === 'function' && onFail.call(context, response.result);
      }
    }
    typeof onFail === 'function' && onFail.call('-1', '');
  });
}

function android_exec$1(config) {
  var body = config.body,
      onSuccess = config.onSuccess,
      onFail = config.onFail,
      context = config.context;
  var plugin = body.plugin,
      action = body.action,
      args = body.args;

  var webViewJavascriptBridge = window.WebViewJavascriptBridgeAndroid;
  webViewJavascriptBridge(plugin, action, args, onSuccess, onFail, context);
}

function runAndroid() {
  window.WebViewJavascriptBridgeAndroid = window.nuva.require();
}

function web_exec(config) {
  if (isIOS) {
    if (window._WebViewJavascriptBridge) {
      ios_exec$1(config);
    } else {
      document.addEventListener('_WebViewJavascriptBridgeReady', function () {
        ios_exec$1(config);
      }, false);
    }
  } else if (isAndroid) {
    var win = window;
    if (win.nuva && (win.nuva.isReady === undefined || win.nuva.isReady)) {
      if (!bridgeReady) {
        runAndroid();
      }
      android_exec$1(config);
    } else {
      document.addEventListener('runtimeready', function () {
        if (!bridgeReady) {
          runAndroid();
        }
        android_exec$1(config);
      }, false);
    }
  }
}

/**
 * Created by xiangwenwen on 2017/3/24.
 */

var nativeExec = null;
var isWeex$2 = env.isWeex;
var isWeexiOS = env.isWeexiOS;
var isWeexAndroid = env.isWeexAndroid;

if (isWeex$2) {
  nativeExec = requireModule('nuvajs-exec').exec;
}

function exec(config) {
  var native_exec = nativeExec ? nativeExec : function () {};
  if (isWeexiOS) {
    ios_exec(native_exec, config);
  } else if (isWeexAndroid) {
    android_exec(native_exec, config);
  } else {
    web_exec(config);
  }
}

/**
 * Created by xiangwenwen on 2017/3/24.
 */

var cat = {};
var EventEmitter = {
  on: function on(event, fun) {
    var cbs = cat[event];
    cbs ? cbs.push(fun) : cat[event] = [];
    if (!cbs) {
      cat[event].push(fun);
    }
  },
  off: function off(event, fun) {
    var cbs = cat[event];
    if (!cbs) {
      return false;
    }
    if (!event && !fun) {
      cat = {};
      return true;
    }
    if (event && !fun) {
      cat[event] = null;
      return true;
    }
    var cb = void 0;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fun || cb.fun === fun) {
        cbs.splice(i, 1);
        break;
      }
    }
    return true;
  },
  once: function once(event, fun) {
    function _on() {
      EventEmitter.off(event, _on);
      fun.apply(this, arguments);
    }
    _on.fun = fun;
    EventEmitter.on(event, _on);
  },
  emit: function emit(event) {
    var isString = typeof event === 'string';
    if (!isString) {
      return;
    }
    var cbs = cat[event];
    var args = toArray$1(arguments, 1);
    if (cbs) {
      var i = 0;
      var j = cbs.length;
      for (; i < j; i++) {
        var cb = cbs[i];
        cb.apply(this, args);
      }
    }
  }
};

function toArray$1(list, index) {
  var _index = index || 0;
  var i = list.length - _index;
  var _array = new Array(i);
  while (i--) {
    _array[i] = list[i + _index];
  }
  return _array;
}

/**
 * Created by xiangwenwen on 2017/3/27.
 */

function createApi(_name, _action) {
  return function (params) {
    if (!params) {
      params = {};
    }
    var onSuccess = params.onSuccess;
    var onFail = params.onFail;
    delete params.onSuccess;
    delete params.onFail;
    delete params.onCancel;
    var config = {
      body: {
        plugin: _name,
        action: _action,
        args: params
      },
      onSuccess: onSuccess,
      onFail: onFail
    };
    exec(config);
  };
}

function createFuns(name, funs) {
  var s = Object.create(null);
  funs.forEach(function (action) {
    s[action] = createApi(name, action);
  });
  return s;
}

function parseJsApis(jsApis) {
  var apis = Object.create(null);
  for (var name in jsApis) {
    var node = name.split('.');
    var funs = jsApis[name];
    var staging = null;
    var i = 0;
    var j = node.length;
    while (true) {
      if (!staging) {
        if (1 === j) {
          var h = false;
          var p = apis[node[i]];
          var s = createFuns(name, funs);
          for (var x in p) {
            if (p.hasOwnProperty(x)) {
              h = true;
              break;
            }
          }
          if (h) {
            for (var k in s) {
              p[k] = s[k];
            }
          } else {
            apis[node[i]] = createFuns(name, funs);
          }
          break;
        }
        if (apis[node[i]]) {
          staging = apis[node[i]];
          i++;
          continue;
        }
        apis[node[i]] = {};
        staging = apis[node[i]];
        i++;
        continue;
      } else {
        if (j - 1 === i) {
          staging[node[i]] = createFuns(name, funs);
          break;
        }
        if (staging[node[i]]) {
          i++;
          continue;
        }
        staging[node[i]] = {};
        staging = staging[node[i]];
      }
      i++;
      if (i > j) {
        break;
      }
    }
  }
  return apis;
}

/**
 * Created by xiangwenwen on 2017/3/24.
 */

var globalEvent = {};
var isWeex$1 = env.isWeex;

if (isWeex$1) {
  globalEvent = requireModule('globalEvent');
}

function rtFunc(method) {
  return function (cb) {
    var config = {
      body: {
        plugin: 'runtime',
        action: method,
        args: {}
      },
      onSuccess: function onSuccess(response) {
        if (typeof cb === 'function') {
          cb(response);
        }
      },
      onFail: function onFail() {},
      context: null
    };
    exec(config);
  };
}

function initDingtalkRequire(cb) {
  rtFunc('getModules')(cb);
}

var ship = {
  getModules: null,
  isReady: false,
  runtime: {
    info: rtFunc('info'),
    _interceptBackButton: rtFunc('interceptBackButton'),
    _interceptNavTitle: rtFunc('interceptNavTitle'),
    _recoverNavTitle: rtFunc('recoverNavTitle'),
    _getModules: rtFunc('getModules')
  },
  init: function init() {
    initDingtalkRequire(function (response) {
      if (response) {
        ship.isReady = true;
        ship.apis = parseJsApis(response);
        EventEmitter.emit('__ship_ready__');
      }
    });
  },
  ready: function ready(cb) {
    if (ship.isReady) {
      if (typeof cb === 'function') {
        cb();
      }
    } else {
      if (typeof cb === 'function') {
        EventEmitter.once('__ship_ready__', function () {
          cb();
        });
      }
    }
  },
  on: function on(type, handler) {
    globalEvent.addEventListener(type, function (e) {
      var event = {
        preventDefault: function preventDefault() {
          log(['does not support preventDefault'], LogType.WARNING);
        },
        detail: e
      };
      handler.call(this, event);
    });
  },
  off: globalEvent.removeEventListener,
  EventEmitter: EventEmitter
};

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
    var apisConf = jsApisConfig || {};
    var errCb = errorCb || null;
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

/**
 * Created by xiangwenwen on 2017/3/27.
 */

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
    config: function config(_config) {
      if (!_config) {
        log(['config is undefined,you must configure Dingtalk parameters'], LogType.WARNING);
        return;
      }
      dingtalkJsApisConfig = _config;
    },
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
        log(['callback is undefined'], LogType.WARNING);
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

/**
 * Created by xiangwenwen on 2017/3/27.
 */

var initCtrl = true;
var dingtalkSDK = {};
var isDingtalk = env.isDingtalk;
var isWeex = env.isWeex;
var isWeb = env.isWeb;


log(['current environment: ' + env.platform]);

if (isDingtalk) {
  if (initCtrl) {
    initCtrl = false;
    if (isWeex) {
      dingtalkSDK = initWeexDingtalkSDK();
    } else if (isWeb) {
      dingtalkSDK = initWebDingtalkSDK();
    }
    dingtalkSDK.init();
  }
} else {
  log(['can only open the page be Dingtalk Container'], LogType.WARNING);
}

var dingtalkSDK$1 = dingtalkSDK;

module.exports = dingtalkSDK$1;
//# sourceMappingURL=dingtalk-javascript-sdk.js.map
