import ship from 'dingtalk-sdk-ship';

function installNativeEvent(dingtalk){
  dingtalk.on = ship.on;
  dingtalk.off = ship.off;
}

export default installNativeEvent;
