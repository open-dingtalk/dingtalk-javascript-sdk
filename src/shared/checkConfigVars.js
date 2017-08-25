/* @flow */

import logger from './logger.js';

const checks = [
  'agentId',
  'corpId',
  'timeStamp',
  'nonceStr',
  'signature',
  'jsApiList'
];

export default function checkConfigVars(config:Object){
  /*
    corpId,
    appId,
    timeStamp,
    nonceStr,
    signature,
    jsApiList,
    type,
    agentId
   */
  let checkInfo = [];
  let infoKey = Object.keys(config);
  checks.map(function(v){
     const checkResult = infoKey.filter(function (k) { return v === k;});
     if (checkResult.length === 0){
         logger.warn('configure : ' + v + 'is empty');
     }
  });
}
