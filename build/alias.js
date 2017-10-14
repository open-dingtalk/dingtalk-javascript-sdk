var path = require('path');

function absolute (str) {
  return path.resolve(__dirname, '..', str)
}

// console.log({
//   'dingtalk-sdk-exec': absolute('src/package/dingtalk-sdk-exec/index.js'),
//   'dingtalk-sdk-ship': absolute('src/package/dingtalk-sdk-ship/index.js'),
//   'shared': absolute('src/shared'),
//   'core': absolute('src/core'),
//   'dingtalk-javascript-utility': absolute('../dingtalk-javascript-utility/src/local.index.js')
// })

module.exports = {
  'dingtalk-sdk-exec': absolute('src/package/dingtalk-sdk-exec/index.js'),
  'dingtalk-sdk-ship': absolute('src/package/dingtalk-sdk-ship/index.js'),
  'shared': absolute('src/shared'),
  'core': absolute('src/core'),
  'dingtalk-javascript-utility': absolute('../dingtalk-javascript-utility/src/local.index.js')
};
