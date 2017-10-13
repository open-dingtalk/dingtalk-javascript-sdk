/**
 * Created by xiangwenwen on 2017/3/27.
 */

import { env } from 'dingtalk-javascript-utility';

let isAndroid = null;
let isIOS = null;
let bridgeReady = false;
const { isWeb } = env;

if (isWeb){
  const UA = window.navigator.userAgent.toLowerCase();
  isAndroid = UA && UA.indexOf('android') > -1;
  isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
}

function ios_exec(config){
  const webViewJavascriptBridge = window._WebViewJavascriptBridge;
  if (!webViewJavascriptBridge){
    throw 'runtime and bridge are not ready';
  }
  const { body, onSuccess, onFail, context } = config;
  webViewJavascriptBridge.callHandler('exec',body,function(response){
    if (typeof response !== 'undefined'){
      if ('0' === response.errorCode){
        typeof onSuccess === 'function' && onSuccess.call(context,response.result);
      } else {
        typeof onFail === 'function' && onFail.call(context,response.result);
      }
    }
    typeof onFail === 'function' && onFail.call('-1','');
  });
}

function android_exec(config){
  let { body, onSuccess, onFail, context } = config;
  let { plugin, action, args } = body;
  const webViewJavascriptBridge = window.WebViewJavascriptBridgeAndroid;
  webViewJavascriptBridge(plugin, action, args, onSuccess, onFail, context);
}

function runAndroid(){
  window.WebViewJavascriptBridgeAndroid = window.nuva.require();
}

export default function web_exec(config){
  if (isIOS){
    if (window._WebViewJavascriptBridge){
      ios_exec(config);
    } else {
      document.addEventListener('_WebViewJavascriptBridgeReady',function(){
        ios_exec(config);
      },false);
    }
  } else if (isAndroid) {
    const win = window;
    if (win.nuva && (win.nuva.isReady === undefined || win.nuva.isReady)){
      if (!bridgeReady){
        runAndroid();
      }
      android_exec(config);
    } else {
      document.addEventListener('runtimeready',function(){
        if (!bridgeReady){
          runAndroid();
        }
        android_exec(config);
      },false);
    }
  }
}
