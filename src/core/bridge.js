/* @flow */

import ship from 'dingtalk-sdk-ship';
import { extend } from 'shared/util.js';
import logger from 'shared/logger.js';
import checkConfigVars from 'shared/checkConfigVars.js';
import permissionJsApis from './permissionJsApis.js';

let dingtalkJsApisConfig: ?Object = null;
let dingtalkQueue: ?Array<Function> = null;
let dingtalkErrorCb: ?Function = null;
let isReady: boolean = false;

function performQueue (){
  if (dingtalkQueue && dingtalkQueue.length > 0){
    dingtalkQueue.forEach(function(task){
      task();
    });
    dingtalkQueue.length = 0;
  }
}

function initDingtalkSDK() : Object{
  let dingtalk: {
    apis: Object,
    config: Function,
    init: Function,
    ready: Function,
    error: Function,
    EventEmitter: Object
  } = {
    apis: {},
    config: function(config: Object){
      if (!config){
        logger.warn('config is undefined,you must configure Dingtalk parameters');
        return;
      }
      if (process.env.NODE_ENV !== 'production'){
        checkConfigVars(config);
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
    ready: function(cb: Function){
      if (!cb || typeof cb !== 'function'){
        logger.warn('callback is undefined');
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
