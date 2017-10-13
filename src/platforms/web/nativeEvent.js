
function installNativeEvent(dingtalk){
  dingtalk.on = function(type, listener, useCapture){
    document.addEventListener(type, listener, useCapture);
  }
  dingtalk.off = function(type, listener, useCapture){
    document.removeEventListener(type, listener, useCapture);
  }
}

export default installNativeEvent;
