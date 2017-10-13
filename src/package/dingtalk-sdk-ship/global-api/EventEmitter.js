/**
 * Created by xiangwenwen on 2017/3/24.
 */

let cat = {};
let EventEmitter = {
  on: function(event,fun){
    let cbs = cat[event];
    cbs ? cbs.push(fun) : cat[event] = [];
    if (!cbs) {
      cat[event].push(fun);
    }
  },
  off: function(event,fun){
    let cbs = cat[event];
    if (!cbs) {
      return false;
    }
    if (!event && !fun) {
      cat = {};
      return true;
    }
    if (event && !fun) {
      cat[event] = null;
      return true;
    }
    let cb;
    let i = cbs.length;
    while(i--){
      cb = cbs[i];
      if (cb === fun || cb.fun === fun) {
        cbs.splice(i,1);
        break;
      }
    }
    return true;
  },
  once: function(event,fun){
    function _on(){
      EventEmitter.off(event,_on);
      fun.apply(this,arguments);
    }
    _on.fun = fun;
    EventEmitter.on(event,_on);
  },
  emit: function(event){
    let isString = typeof event === 'string';
    if (!isString){
      return;
    }
    let cbs = cat[event];
    let args = toArray(arguments,1);
    if (cbs) {
      let i = 0;
      let j = cbs.length;
      for(;i<j;i++){
        let cb = cbs[i];
        cb.apply(this,args);
      }
    }
  }
};

function toArray(list, index) {
  let _index = index || 0;
  let i = list.length - _index;
  let _array = new Array(i);
  while(i--){
    _array[i] = list[i + _index]
  }
  return _array
}

export default EventEmitter;
