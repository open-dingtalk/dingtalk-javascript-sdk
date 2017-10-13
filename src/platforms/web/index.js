import initDingtalkSDK from 'core/bridge.js';
import installNativeEvent from './nativeEvent.js';

function initWebDingtalkSDK(){
  let dingtalk = initDingtalkSDK();
  installNativeEvent(dingtalk);
  return dingtalk;
}

export default initWebDingtalkSDK;
