/* @flow */

import initDingtalkSDK from 'core/bridge.js';
import installNativeEvent from './nativeEvent.js';

function initWeexDingtalkSDK() : Object{
  let dingtalk = initDingtalkSDK();
  installNativeEvent(dingtalk);
  return dingtalk;
}

export default initWeexDingtalkSDK;
