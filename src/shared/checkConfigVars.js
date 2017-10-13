import { log, LogType } from 'dingtalk-javascript-utility';

const checks = [
  'agentId',
  'corpId',
  'timeStamp',
  'nonceStr',
  'signature',
  'jsApiList'
];

export default function checkConfigVars(config){
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
         log(['configure : ' + v + 'is empty'],LogType.WARNING);
     }
  });
}
