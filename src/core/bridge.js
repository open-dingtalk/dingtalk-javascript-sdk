/**
 * Created by xiangwenwen on 2017/3/27.
 */

import ship from 'dingtalk-sdk-ship';
import { log, LogType } from 'dingtalk-javascript-utility';
import { extend } from 'shared/util.js';
import permissionJsApis from './permissionJsApis.js';

let dingtalkJsApisConfig = null;
let dingtalkQueue = null;
let dingtalkErrorCb = null;
let isReady = false;

function performQueue (){
  if (dingtalkQueue && dingtalkQueue.length > 0){
    dingtalkQueue.forEach(function(task){
      task();
    });
    dingtalkQueue.length = 0;
  }
}

function initDingtalkSDK(){
  let dingtalk = {
    apis: {},
    config: function(config){
      if (!config){
        log(['config is undefined,you must configure Dingtalk parameters'],LogType.WARNING);
        return;
      }
      dingtalkJsApisConfig = config;
    },
    init: function(){
      // 初始化一次
      dingtalkQueue = [];
      ship.init();
      ship.ready(function(){
        isReady = ship.isReady;
        dingtalk.apis = ship.apis ? ship.apis : {};
        performQueue();
      });
    },
    ready: function(cb){
      if (!cb || typeof cb !== 'function'){
        log(['callback is undefined'],LogType.WARNING);
        return;
      }
      if (isReady){
        permissionJsApis(cb,dingtalkJsApisConfig,dingtalkErrorCb);
      } else {
        function bufferFunction(cb){
          return function(){
            permissionJsApis(cb,dingtalkJsApisConfig,dingtalkErrorCb);
          }
        }
        dingtalkQueue && dingtalkQueue.push(bufferFunction(cb));
      }
    },
    error: function(cb){
      if (typeof cb === 'function'){
        dingtalkErrorCb = cb;
      }
    },
    EventEmitter: ship.EventEmitter
  };
  return dingtalk;
}

export default initDingtalkSDK;
