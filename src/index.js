import polyfills from 'dingtalk-sdk-polyfills';
import initWebDingtalkSDK from './platforms/web/index.js';
import initWeexDingtalkSDK from './platforms/weex/index.js';
import { log, LogType } from 'dingtalk-javascript-utility';

let initCtrl = true;
let env = polyfills.env;
const { isDingtalk, isWeex, isWeb } = env;

let dingtalkSDK= {};

if (!isDingtalk){
  log(['can only open the page be Dingtalk Container'],LogType.WARNING);
}

if (initCtrl){
  initCtrl = false;
  if (isWeex){
    dingtalkSDK = initWeexDingtalkSDK();
  } else if (isWeb){
    dingtalkSDK = initWebDingtalkSDK();
  }
  dingtalkSDK.init();
}

export default dingtalkSDK;
