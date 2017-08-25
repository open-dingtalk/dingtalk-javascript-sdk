var webpack = require('webpack');
var path = require('path');
var RaxPlugin = require('rax-webpack-plugin');

var plugins = [];
var alias = {};
var entry = '';

var env = process.env.NODE_ENV;

function abs(src){
	return path.resolve(__dirname, '', src);
}

if(env === 'weex'){
	alias = {
		'Rax': abs('src/weex-rax.js')
	};
	// entry = './src/weex-entry.js';
	entry = './src/weex-s-entry.js';
	plugins.push(
		new RaxPlugin({
			target: 'bundle',
			externalBuiltinModules: false
		})
	);
} else {
	entry = './src/web-entry.js'
}

// plugins.push(
//   new webpack.BannerPlugin({
//    	raw: true ,
//    	banner: '// { "framework": "Rax" }\n'
//   })
// );

var config = {
	entry: entry,
	output: {
		path: abs('dist'),
		filename: 'bundle-'+ ( env === 'weex' ? "weex" : "web")+'.js'
	},
	resolve: {
		alias: alias
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['es2015','rax']
						}
					}
				]
			}
		]
	},
	watch: true,
	plugins: plugins,

};

module.exports = config;
