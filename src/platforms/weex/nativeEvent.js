/* @flow */

import ship from 'dingtalk-sdk-ship';

function installNativeEvent(dingtalk:Object){
  dingtalk.on = ship.on;
  dingtalk.off = ship.off;
}

export default installNativeEvent;
