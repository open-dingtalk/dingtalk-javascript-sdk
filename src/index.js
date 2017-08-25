// @flow
import weexEnvVar from 'dingtalk-sdk-polyfills';
import initWebDingtalkSDK from './platforms/web/index.js';
import initWeexDingtalkSDK from './platforms/weex/index.js';
import logger from 'shared/logger.js';

let initCtrl: boolean = true;
let platform: string = weexEnvVar.env.platform;
let isDingtalk: boolean = weexEnvVar.env.isDingtalk;
let dingtalkSDK: Object = {};

if (!isDingtalk){
  logger.warn('can only open the page be Dingtalk Container');
}

if (initCtrl){
  initCtrl = false;
  switch (platform){
    case 'Web':
        dingtalkSDK = initWebDingtalkSDK();
      break;
    default:
        dingtalkSDK = initWeexDingtalkSDK();
      break
  }
  dingtalkSDK.init();
}

export default dingtalkSDK;
