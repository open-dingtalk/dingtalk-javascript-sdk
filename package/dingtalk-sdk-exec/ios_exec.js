/**
 * Created by xiangwenwen on 2017/3/24.
 */

// @flow

export default function ios_exec(exec:Function,config:Object){
  const body = config.body;
  const win = config.onSuccess;
  const fail = config.onFail;
  const context = config.context;
  if (exec && typeof exec === 'function'){
    exec(body,function (response) {
      if (typeof response !== "undefined") {
        if ('0' === response.errorCode) {
          win && win.call(context, response.result);
        } else {
          fail && fail.call(context, response.result);
        }
      }
      else {
          fail && fail.call('-1', "");
      }
    });
  } else {
    fail && fail.call('-1', "");
  }
}
