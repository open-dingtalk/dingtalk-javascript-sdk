'use strict';

var weexEnv = {};

if (typeof weex !== 'undefined') {
  var config = weex.config;
  var _env = config.env;
  weexEnv.platform = _env.platform;
  weexEnv.bundleFrameworkType = 'Vue';
  if (weexEnv.platform !== 'Web') {
    weexEnv.dingtalk = {
      bundleUrl: config.bundleUrl,
      originalUrl: config.originalUrl
    };
    weexEnv.appVersion = _env.appVersion;
    weexEnv.appName = _env.appName;
  }
} else {
  if (typeof callNative === 'function') {
    weexEnv.platform = navigator.platform;
    weexEnv.appName = navigator.appName;
  } else {
    weexEnv.platform = 'Web';
  }
  weexEnv.bundleFrameworkType = 'Rax';
}

var isWeb = weexEnv.platform === 'Web';
var isWeexiOS = env.platform === 'iOS';
var isWeexAndroid = env.platform === 'android';
var isWeex = isWeexiOS || isWeexAndroid;

var UA = void 0;
if (isWeb) {
  UA = window.navigator.userAgent.toLowerCase();
}

function dingtalkContainer() {
  if (isWeex) {
    if (weexEnv.appName === 'DingTalk' || weexEnv.appName === 'com.alibaba.android.rimet') {
      return true;
    }
    return false;
  } else {
    return UA && UA.indexOf('dingtalk') > -1;
  }
}

weexEnv.isDingtalk = dingtalkContainer();

function initRequireModule$1() {
  var requireModule = function requireModule(name) {
    var moduleName = '@weex-module/' + name;
    return __weex_require__(moduleName);
  };
  if (typeof weex !== 'undefined') {
    requireModule = weex.requireModule;
  }
  return requireModule;
}

var weexEnvVar = {
  env: weexEnv,
  requireModule: initRequireModule$1()
};

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

var platform$3 = weexEnvVar.env.platform;
var isAndroid = null;
var isIOS = null;
var bridgeReady = false;

if (platform$3 === 'Web') {
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

var platform$2 = weexEnvVar.env.platform;
var nativeExec = null;
if (platform$2 !== 'Web') {
  nativeExec = weexEnvVar.requireModule('nuvajs-exec').exec;
}

function exec(config) {
  var native_exec = nativeExec ? nativeExec : function () {};
  if (platform$2 === 'iOS') {
    ios_exec(native_exec, config);
  } else if (platform$2 === 'android') {
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
    var args = toArray(arguments, 1);
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

function toArray(list, index) {
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

var platform$1 = weexEnvVar.env.platform;
var globalEvent = {};
if (platform$1 !== 'Web') {
  globalEvent = weexEnvVar.requireModule('globalEvent');
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
          console.warn('当前环境不支持 preventDefault');
        },
        detail: e
      };
      handler.call(this, event);
    });
  },
  off: globalEvent.removeEventListener,
  EventEmitter: EventEmitter
};

var logger = {
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
      logger.warn('configure : ' + v + 'is empty');
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
        logger.warn('config is undefined,you must configure Dingtalk parameters');
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
        logger.warn('callback is undefined');
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
var platform = weexEnvVar.env.platform;
var isDingtalk = weexEnvVar.env.isDingtalk;
var dingtalkSDK = {};

if (!isDingtalk) {
  logger.warn('can only open the page be Dingtalk Container');
}

if (initCtrl) {
  initCtrl = false;
  switch (platform) {
    case 'Web':
      dingtalkSDK = initWebDingtalkSDK();
      break;
    default:
      dingtalkSDK = initWeexDingtalkSDK();
      break;
  }
  dingtalkSDK.init();
}

var dingtalkSDK$1 = dingtalkSDK;

module.exports = dingtalkSDK$1;
//# sourceMappingURL=dingtalk-sdk.js.map
