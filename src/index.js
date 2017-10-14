/**
 * Created by xiangwenwen on 2017/3/27.
 */

import initWebDingtalkSDK from './platforms/web/index.js';
import initWeexDingtalkSDK from './platforms/weex/index.js';
import { log, LogType, env } from 'dingtalk-javascript-utility';

let initCtrl = true;
let dingtalkSDK = {};
const { isDingtalk, isWeex, isWeb } = env;

log(['current environment: ' + env.platform]);

if (isDingtalk){
  if (initCtrl){
    initCtrl = false;
    if (isWeex){
      dingtalkSDK = initWeexDingtalkSDK();
    } else if (isWeb){
      dingtalkSDK = initWebDingtalkSDK();
    }
    dingtalkSDK.init();
  }
} else {
  log(['can only open the page be Dingtalk Container'],LogType.WARNING);
}

export default dingtalkSDK;
