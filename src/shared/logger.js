/* @flow */

const logger:{
  warn:Function,
  info:Function,
  error:Function
} = {
  warn: function (msg: string, e:Object){
    console.warn('[DINGTALK JS SDK Warning]:', msg);
    if (e) {
      throw e;
    } else {
      const warning = new Error('WARNING STACK TRACE');
      console.warn(warning.stack);
    }
  },
  info: function (msg: string){
    console.info('[DINGTALK JS SDK INFO]:', msg);
  },
  error: function (msg: string){
    console.error('[DINGTALK JS SDK ERROR]:', msg);
  }
};

export default logger;
