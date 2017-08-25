/**
 * Created by xiangwenwen on 2017/3/24.
 */

// @flow

import exec from 'dingtalk-sdk-exec';
import EventEmitter from './global-api/EventEmitter.js';
import parseJsApis from './core/parseJsApis.js';
import weexInstanceVar from 'dingtalk-sdk-polyfills';

let platform = weexInstanceVar.env.platform;
let globalEvent: Object = {};
if (platform !== 'Web'){
  globalEvent = weexInstanceVar.requireModule('globalEvent');
}

function rtFunc(method: string): Function {
  return function(cb: Function) {
    const config:{
      body: Object,
      onSuccess: Function,
      onFail: Function,
      context: ?Object
    } = {
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

function initDingtalkRequire(cb: Function){
    rtFunc('getModules')(cb);
}

let ship: {
  apis: ?Object,
  isReady: boolean,
  runtime: Object,
  init: Function,
  ready: Function,
  on: Function,
  off: Function,
  EventEmitter: Object
} = {
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
  ready: function(cb: Function){
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
  on: function(type: string, handler: Function){
    globalEvent.addEventListener(type,function(e){
      const event:{
        preventDefault: Function,
        detail: Object
      } = {
        preventDefault: function () {
          console.warn('当前环境不支持 preventDefault')
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
