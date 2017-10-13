var path = require('path');

function absolute (str) {
  return path.resolve(__dirname, '..', str)
}

module.exports = {
  'dingtalk-sdk-polyfills': absolute('src/package/dingtalk-sdk-polyfills/index.js'),
  'dingtalk-sdk-exec': absolute('src/package/dingtalk-sdk-exec/index.js'),
  'dingtalk-sdk-ship': absolute('src/package/dingtalk-sdk-ship/index.js'),
  'shared': absolute('src/shared'),
  'core': absolute('src/core')
};
