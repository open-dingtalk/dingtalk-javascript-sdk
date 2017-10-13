/**
 * Created by xiangwenwen on 2017/3/24.
 */

// @flow

import android_exec from './android_exec.js';
import ios_exec from './ios_exec.js';
import polyfills from 'dingtalk-sdk-polyfills';
import web_exec from './web_exec.js';

let env  = polyfills.env;
let nativeExec: ?Function = null;
const { isWeex, isWeexiOS, isWeexAndroid } = env;
if (isWeex){
  nativeExec = polyfills.requireModule('nuvajs-exec').exec;
}

function exec_affirm(plugin: string, action: string, args: ?Object,onSuccess: ?Function, onFail: ?Function, context: ?Object){
  const body: {
    plugin: string,
    action: string,
    args: Object
  } = {
    plugin: plugin,
    action: action,
    args: args ? args : {}
  }
  const config: {
    body: Object,
    onSuccess: ?Function,
    onFail: ?Function,
    context: ?Object
  } = {
    body: body,
    onSuccess: onSuccess ? onSuccess : null,
    onFail: onFail ? onFail : null,
    context: context ? context : null
  }
  exec(config);
}

function exec(config:Object) {
  let native_exec: Function = nativeExec ? nativeExec : function(){};
  if (isWeexiOS){
    ios_exec(native_exec,config);
  } else if(isWeexAndroid) {
    android_exec(native_exec,config);
  } else {
    web_exec(config);
  }
}

export default exec;
