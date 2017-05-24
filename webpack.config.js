var path = require('path')
var webpack = require('webpack')

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

//生产环境使用
const extractSass = new ExtractTextPlugin({
	filename: "./css/[name].[hash].css",
	disable: process.env.NODE_ENV === "development"
});

module.exports = {
	entry: {
		index: './src/js/index.js',
		home: './src/js/home.js',
	},
	output: {
		path: path.resolve(__dirname, './dist/'),
		//publicPath: '/dist/',
		filename: './js/[name].[hash].js'
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: extractSass.extract({
					use: [
						{
							loader: "css-loader",
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: [
									autoprefixer
								]
							}
						},
						{
							loader: "sass-loader"
						}
					],
					/*// 在开发环境使用 style-loader*/
					fallback: "style-loader"
				})
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]?[hash]'
				}
			}
		]
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		}
	},
	devServer: {
		historyApiFallback: true,
		noInfo: true,
		hot: false,
	},
	performance: {
		hints: false
	},
	plugins: [
		extractSass,
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html',
			inject: true,
			chunks: ['index'],
			/*minify: {
			 removeComments: true,
			 collapseWhitespace: true,
			 removeAttributeQuotes: true
			 // more options:
			 // https://github.com/kangax/html-minifier#options-quick-reference
			 },*/
			// necessary to consistently work with multiple chunks via CommonsChunkPlugin
			chunksSortMode: 'dependency'
		}),
		new HtmlWebpackPlugin({
			filename: 'home.html',
			template: './src/home.html',
			inject: true,
			chunks: ['home'],
			/*minify: {
			 removeComments: true,
			 collapseWhitespace: true,
			 removeAttributeQuotes: true
			 // more options:
			 // https://github.com/kangax/html-minifier#options-quick-reference
			 },*/
			// necessary to consistently work with multiple chunks via CommonsChunkPlugin
			chunksSortMode: 'dependency'
		})
	],
	devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
	module.exports.devtool = '#source-map'
	// http://vue-loader.vuejs.org/en/workflow/production.html
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: false
		})
	])
}
