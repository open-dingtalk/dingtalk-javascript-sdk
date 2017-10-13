/**
 * Created by xiangwenwen on 2017/3/27.
 */

import exec from 'dingtalk-sdk-exec';

function createApi(_name,_action){
  return function(params){
    if (!params) {
      params = {};
    }
    let onSuccess = params.onSuccess;
    let onFail = params.onFail;
    delete params.onSuccess;
    delete params.onFail;
    delete params.onCancel;
    const config = {
      body: {
        plugin: _name,
        action: _action,
        args: params
      },
      onSuccess: onSuccess,
      onFail: onFail
    };
    exec(config);
  }
}

function createFuns(name,funs){
  let s = Object.create(null);
  funs.forEach(function(action){
    s[action] = createApi(name, action);
  });
  return s;
}

export default function parseJsApis(jsApis){
  let apis = Object.create(null);
  for (let name in jsApis) {
    let node = name.split('.');
    let funs = jsApis[name];
    let staging = null;
    let i = 0;
    let j = node.length;
    while (true) {
      if (!staging) {
        if (1 === j) {
          let h = false;
          let p = apis[node[i]];
          let s = createFuns(name, funs);
          for (let x in p){
            if (p.hasOwnProperty(x)){
              h = true;
              break;
            }
          }
          if (h){
            for (let k in s){
              p[k] = s[k];
            }
          } else {
            apis[node[i]] = createFuns(name, funs);
          }
          break;
        }
        if (apis[node[i]]){
          staging = apis[node[i]];
          i++;
          continue;
        }
        apis[node[i]] = {};
        staging = apis[node[i]];
        i++;
        continue;
      } else {
        if ((j - 1) === i) {
          staging[node[i]] = createFuns(name, funs);
          break;
        }
        if (staging[node[i]]) {
          i++;
          continue;
        }
        staging[node[i]] = {};
        staging = staging[node[i]];
      }
      i++;
      if (i > j) {
        break;
      }
    }
  }
	return apis;
}
