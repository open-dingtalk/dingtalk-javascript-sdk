/**
 * Created by xiangwenwen on 2017/3/24.
 */

import exec from 'dingtalk-sdk-exec';
import EventEmitter from './global-api/EventEmitter.js';
import parseJsApis from './core/parseJsApis.js';
import { env,requireModule,log, LogType } from 'dingtalk-javascript-utility';

let globalEvent = {};
const { isWeex } = env;
if (isWeex){
  globalEvent = requireModule('globalEvent');
}

function rtFunc(method){
  return function(cb) {
    const config = {
      body: {
        plugin: 'runtime',
        action: method,
        args: {}
      },
      onSuccess: function(response){
        if (typeof cb === 'function'){
          cb(response);
        }
      },
      onFail: function(){

      },
      context: null
    };
    exec(config);
  };
}

function initDingtalkRequire(cb){
  rtFunc('getModules')(cb);
}

let ship = {
  getModules: null,
  isReady: false,
  runtime: {
    info: rtFunc('info'),
    _interceptBackButton: rtFunc('interceptBackButton'),
    _interceptNavTitle: rtFunc('interceptNavTitle'),
    _recoverNavTitle: rtFunc('recoverNavTitle'),
    _getModules: rtFunc('getModules')
  },
  init: function(){
    initDingtalkRequire(function(response){
      if(response){
        ship.isReady = true;
        ship.apis = parseJsApis(response);
        EventEmitter.emit('__ship_ready__');
      }
    });
  },
  ready: function(cb){
    if (ship.isReady){
      if (typeof cb === 'function'){
        cb();
      }
    } else {
      if (typeof cb === 'function'){
        EventEmitter.once('__ship_ready__', function(){
          cb();
        });
      }
    }
  },
  on: function(type, handler){
    globalEvent.addEventListener(type,function(e){
      const event = {
        preventDefault: function () {
          log(['does not support preventDefault'],LogType.WARNING);
        },
        detail: e
      };
      handler.call(this,event);
    });
  },
  off: globalEvent.removeEventListener,
  EventEmitter: EventEmitter
};

export default ship;
