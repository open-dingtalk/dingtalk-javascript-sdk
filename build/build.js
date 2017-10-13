var fs = require('fs');
var path = require('path');
var rollup = require('rollup');
var babel = require('rollup-plugin-babel');
var resolve = require('rollup-plugin-node-resolve');
var uglify = require('rollup-plugin-uglify');
var watch = require('rollup-watch');
var alias = require('rollup-plugin-alias');
var configAlias = require('./alias.js');
var commonjs = require('rollup-plugin-commonjs');

var isWatch = false;
if (process.argv[3]) {
    isWatch = process.argv[3] === '--watch' || process.argv[3] === '-w'
}

if (process.argv[2]){
    build(process.argv[2]);
}

function build(name){
  let config = {
    entry: './src/index.js',
    plugins: [ alias(configAlias),resolve(),commonjs(),babel() ],
    dest:'./dist/dingtalk-javascript-sdk.js',
    format: 'cjs',
    sourceMap: true
  };

  if (name === 'build'){
    config.plugins.push(uglify());
    config.dest = './dist/dingtalk-javascript-sdk-min.js'
  }

  if (isWatch){
    return rollupOnWatch(config);
  } else {
    runRollup(config).then(function(){
      // TODO:xww 处理构建发布版本
    });
  }
}

function runRollup(config){
  return new Promise(function(resolve, reject){
    rollup.rollup(config).then(function(bundle){
      bundle.write(config).then(function(){
        report(config.dest);
        resolve();
      }).catch(function(err){
        console.log(err);
      });
    });
  });
}

function rollupOnWatch(config) {
  var watcher = watch(rollup, config);
  watcher.on('event', function(event){
    switch (event.code) {
      case 'STARTING':
        console.log('checking rollup-watch version...');
        break;
      case 'BUILD_START':
        console.log('bundling...');
        break;
      case 'BUILD_END':
        console.log('bundled in ' + path.relative(process.cwd(), config.dest)
              + ' (' + event.duration + 'ms)');
        console.log('Watching for changes...' );
        break;
      case 'ERROR':
        console.error('ERROR: ', event.error);
        break;
      default:
        console.error('unknown event', event);
    }
  });
}

function report (filePath) {
  var size = (fs.statSync(filePath).size / 1024).toFixed(2) + 'KB';
  var file = path.relative(process.cwd(), filePath);
  console.log(` => write ${file} (${size})`)
}
