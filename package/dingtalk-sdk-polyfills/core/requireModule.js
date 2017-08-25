/* @flow */

function initRequireModule () : Function {
  let requireModule = function(name){
    let moduleName = '@weex-module/' + name;
    return __weex_require__(moduleName);
  }
  if (typeof weex !== 'undefined'){
    requireModule = weex.requireModule;
  }
  return requireModule;
}

export default initRequireModule;
