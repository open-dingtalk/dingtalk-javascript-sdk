/**
 * Created by xiangwenwen on 2017/3/24.
 */

import android_exec from './android_exec.js';
import ios_exec from './ios_exec.js';
import { env, requireModule } from 'dingtalk-javascript-utility';
import web_exec from './web_exec.js';

let nativeExec = null;
const { isWeex, isWeexiOS, isWeexAndroid } = env;
if (isWeex){
  nativeExec = requireModule('nuvajs-exec').exec;
}

function exec_affirm(plugin, action, args,onSuccess, onFail, context){
  const body = {
    plugin: plugin,
    action: action,
    args: args ? args : {}
  }
  const config = {
    body: body,
    onSuccess: onSuccess ? onSuccess : null,
    onFail: onFail ? onFail : null,
    context: context ? context : null
  }
  exec(config);
}

function exec(config) {
  let native_exec = nativeExec ? nativeExec : function(){};
  if (isWeexiOS){
    ios_exec(native_exec,config);
  } else if(isWeexAndroid) {
    android_exec(native_exec,config);
  } else {
    web_exec(config);
  }
}

export default exec;
