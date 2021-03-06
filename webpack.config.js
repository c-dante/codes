const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');


/**
 * splitChunks plugin config -- separate your build into hash-able chunks for loading/caching
 *
 * @see https://webpack.js.org/plugins/split-chunks-plugin/
 */
const splitChunks = {
	chunks: 'async',
	minSize: 100,
	maxSize: 0,
	minChunks: 1,
	maxAsyncRequests: 5,
	maxInitialRequests: 3,
	automaticNameDelimiter: '~',
	name: true,
	cacheGroups: {
		vendors: {
			test: /[\\/]node_modules[\\/]/,
			chunks: 'all',
			priority: -10,
		},
		styles: {
			name: 'styles',
			test: /\.css$/,
			chunks: 'all',
			enforce: true
		},
		default: {
			minChunks: 2,
			priority: -20,
			reuseExistingChunk: true,
		},
	},
};

// @see https://webpack.js.org/configuration/optimization/
const prodOptimization = {
	minimizer: [
		new TerserPlugin(),
		new OptimizeCSSAssetsPlugin({}),
	],
};

// Plugin stack
// @see https://webpack.js.org/guides/development/#choosing-a-development-tool
const buildPlugins = [
	// Generate a manifest
	new HtmlWebpackPlugin({
		filename: 'webpack-common-manifest.json',
		template: './manifest.tpl',
		inject: false,
	}),

	// Build the app
	new HtmlWebpackPlugin({
		template: './src/index.pug',
		chunksSortMode: 'dependency',
		excludeChunks: [],
		chunks: [
			'styles',
		],
	}),
];

const devPlugins = [
	// Extract CSS
	new MiniCssExtractPlugin({
		filename: '[name].[contenthash].css',
		sourceMap: true,
	}),
	new webpack.SourceMapDevToolPlugin({
		columns: false,
		filename: '[file].map[query]',
		lineToLine: false,
		module: false,
	}),
	new webpack.HotModuleReplacementPlugin(),
];

const prodPlugins = [
	new CleanWebpackPlugin(['dist']),

	// Extract CSS
	new MiniCssExtractPlugin({
		filename: '[name].[contenthash].css',
		sourceMap: false,
	}),
];

// CSS loader based on prod or not
const prodCssLoader = {
	loader: MiniCssExtractPlugin.loader,
	options: {
		hmr: false,
	}
};

const devCssLoader = {
	loader: MiniCssExtractPlugin.loader,
	options: {
		hmr: true,
	}
};

/**
 * entry points: src/index
 *
 * @param {
 * @returns {env => webpack config}
 */
module.exports = ({
	production = false,
} = {}) => {
	// configure plugins/etc
	const mode = production ? 'production' : 'development';

	const plugins = [
		...(production ? prodPlugins : devPlugins),
		...buildPlugins,
	];

	const optimization = {
		splitChunks,
		...(production ? prodOptimization : {}),
	};

	return {
		mode,
		plugins,
		optimization,
		entry: {
			index: './src/index.css',
		},
		module: {
			rules: [
				// templates
				{
					test: /\.pug$/,
					use: [
						'pug-loader'
					],
				},
				// styles
				{
					test: /\.css$/,
					use: [
						production ? prodCssLoader : devCssLoader,
						{ loader: 'css-loader', options: { importLoaders: 1 } },
						'postcss-loader',
					],
				},
				// js / babel
				{
					test: /\.m?js$/,
					exclude: /(node_modules)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
						},
					},
				},
			],
		},
		output: {
			filename: production ? '[name].[contenthash].bundle.js' : '[name].bundle.js',
			publicPath: './',
			path: path.resolve(__dirname, 'dist'),
		},
		// Development settings
		devServer: {
			publicPath: '/',
			contentBase: './src',
			hot: true,
			// This is configured to allow client side cors request to some other server
			// @see: https://webpack.js.org/configuration/dev-server/#devserver-proxy
			proxy: {
				'/api': {
					changeOrigin: true,
					target: 'https://api.example.com/',
					pathRewrite: {'^/api' : ''},
					secure: false,
				},
			},
		},
	};
};
