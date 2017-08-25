/**
 * Created by xiangwenwen on 2017/3/24.
 */

// @flow
const STATUS_NO_RESULT: string = '0';
const STATUS_OK: string = '1';
const STATUS_ERROR: string = '2';

export default function android_exec(exec:Function,config:Object){
  const body = config.body;
  const win = config.onSuccess;
  const fail = config.onFail;
  const context = config.context;
  if (exec && typeof exec === 'function'){
    exec(body,function (response) {
      if (typeof response !== "undefined" && response.__status__) {
        const status = response.__status__;
        const message = response.__message__;
        if (STATUS_OK === status){
            win && win.call(context, message);
        } else if (STATUS_ERROR === status){
            fail && fail.call(context, message);
        }
      } else {
        fail && fail.call('-1', "");
      }
    });
  } else {
    fail && fail.call('-1', "");
  }
}
