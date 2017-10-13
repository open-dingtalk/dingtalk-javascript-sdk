
import initDingtalkSDK from 'core/bridge.js';
import installNativeEvent from './nativeEvent.js';

function initWeexDingtalkSDK(){
  let dingtalk = initDingtalkSDK();
  installNativeEvent(dingtalk);
  return dingtalk;
}

export default initWeexDingtalkSDK;
