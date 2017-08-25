/* @flow */

let weexEnv = {};

if (typeof weex !== 'undefined'){
  const config = weex.config;
  const env = config.env;
  weexEnv.platform = env.platform;
  weexEnv.bundleFrameworkType = 'Vue';
  if (weexEnv.platform !== 'Web'){
    weexEnv.dingtalk = {
      bundleUrl: config.bundleUrl,
      originalUrl: config.originalUrl
    };
    weexEnv.appVersion = env.appVersion;
    weexEnv.appName = env.appName;
  }
} else {
  if (typeof callNative === 'function'){
    weexEnv.platform = navigator.platform;
    weexEnv.appName = navigator.appName;
  } else {
    weexEnv.platform = 'Web';
  }
  weexEnv.bundleFrameworkType = 'Rax';
}

const isWeb = weexEnv.platform === 'Web';
const isWeexiOS = weexEnv.platform === 'iOS';
const isWeexAndroid = weexEnv.platform === 'android';
const isWeex = isWeexiOS || isWeexAndroid;

let UA;
if(isWeb){
  UA = window.navigator.userAgent.toLowerCase();
}

function dingtalkContainer(){
  if (isWeex){
    if (weexEnv.appName === 'DingTalk' || weexEnv.appName === 'com.alibaba.android.rimet'){
      return true;
    }
    return false;
  } else {
    return UA && UA.indexOf('dingtalk') > -1;
  }
}

weexEnv.isDingtalk = dingtalkContainer();

export default weexEnv;
