/**
 * Created by xiangwenwen on 2017/3/27.
 */
import ship from 'dingtalk-sdk-ship';

export default function permissionJsApis(cb,jsApisConfig,errorCb){
  if (!jsApisConfig){
    ship.ready(function(){
      cb(null);
    });
    return;
  }
  ship.ready(function(){
    const permission = ship.apis.runtime.permission;
    let apisConf =  jsApisConfig || {};
    let errCb = errorCb || null;
    apisConf.onSuccess = function(response){
      cb(null, response);
    };
    apisConf.onFail = function(error){
      if (typeof errCb === 'function'){
        errCb(error);
      } else {
        cb(error, null);
      }
    };
    permission.requestJsApis(apisConf);
  });
}
