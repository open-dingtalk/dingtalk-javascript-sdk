// @flow
import polyfills from 'dingtalk-sdk-polyfills';
import initWebDingtalkSDK from './platforms/web/index.js';
import initWeexDingtalkSDK from './platforms/weex/index.js';
import logger from 'shared/logger.js';

let initCtrl: boolean = true;
let env = polyfills.env;
const { isDingtalk, isWeex, isWeb } = env;

let dingtalkSDK: Object = {};

if (!isDingtalk){
  logger.warn('can only open the page be Dingtalk Container');
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
