'use strict';
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var path = require('path');


// Gen env arg
const buildEnv = process.argv.filter(
	(arg, i, col) => i > 0 && col[i - 1] === '--env'
)[0] || 'localhost';

// @todo: env can override webpack
const wpPlugins = [];

if (buildEnv === 'prod') {
	wpPlugins.push(new webpack.optimize.UglifyJsPlugin({
	sourceMap: false
	}));

	wpPlugins.push(new webpack.optimize.DedupePlugin());

} else {
	wpPlugins.push(new webpack.SourceMapDevToolPlugin({
		// exclude the index entry point
		exclude: /.*index.*$/,
		columns: false,
		filename: '[file].map[query]',
		lineToLine: false,
		module: false
	}));
}

module.exports = {
	resolve: {
		alias: {
			environment: path.resolve(process.cwd(), 'env', buildEnv)
		}
	},
	module:	{
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] },
			{ test: /\.(ico|eot|woff|woff2|ttf|svg|png|jpg)(\?.*)?$/, loaders: ['file'] },
			{ test: /\.css$/, loaders: ['style', 'css', 'postcss'] },
			{ test: /\.less$/, loaders: ['style', 'css', 'postcss', 'less'] },
			{ test: /\.tpl\.(pug|jade)$/, loaders: ['html?removeRedundantAttributes=false', 'jade-html'] },
			{ test: /\.tpl\.html$/, loaders: ['html?removeRedundantAttributes=false'] },
			{ test: /[^\.][^t][^p][^l]\.(pug|jade)$/, loaders: ['file?name=[name].html', 'jade-html' ] },
			{ test: /index\.scss$/, loaders: ['file?name=[name].css', 'postcss', 'sass']},
			{ test: /\.(sass|scss)$/, loaders: ['style', 'css', 'postcss', 'sass'], exclude: /index\.scss$/ },
			{ test: /[^\.][^t][^p][^l]\.html$/, loaders: ['file?name=[name].[ext]'] },
			{ test: require.resolve('tern'), loader: 'expose?tern' }
		]
	},
	postcss: function(){
		return [autoprefixer,cssnano]
	},
	plugins: wpPlugins,
	entry: {
		app: [
			'tern',
			'./favicon.ico',
			'./index.scss',
			'./index.jade',
			'./main.js',
		]
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(process.cwd(), 'bin')
	},
	context: path.resolve(process.cwd(), 'src'),
	devServer: {
		publicPath: '/',
		outputPath: '/',
		filename: 'app.bundle.js',
		watchOptions: undefined,
		watchDelay: undefined,
		contentBase: path.resolve(process.cwd(), 'src'),
		stats: {
			cached: false,
			cachedAssets: false,
			colors: true
		}
	}
};
