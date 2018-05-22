const extractTextPlugin = require("extract-text-webpack-plugin");
const rules = [{
		test: /\.(css|scss|sass)$/,
		// 不分离的写法
		// use: ["style-loader", "css-loader",sass-loader"]
		// 使用postcss不分离的写法
		// use: ["style-loader", "css-loader", sass-loader","postcss-loader"]
		// 此处为分离css的写法
		/*use: extractTextPlugin.extract({
			fallback: "style-loader",
			use: ["css-loader", "sass-loader"],
			// css中的基础路径
			publicPath: "../"
		})*/
		// 此处为使用postcss分离css的写法
		use: extractTextPlugin.extract({
			fallback: "style-loader",
			use: ["css-loader", "sass-loader", "postcss-loader"],
			// css中的基础路径
			publicPath: "../"

		})
	},
	{
		test: /\.js$/,
		use: ["babel-loader"],
		// 不检查node_modules下的js文件
		exclude: "/node_modules/"
	}, {
		test: /\.(png|jpg|gif)$/,
		use: [{
			// 需要下载file-loader和url-loader
			loader: "url-loader",
			options: {
				limit: 20,
				// 图片文件输出的文件夹
				outputPath: "images"
			}
		}]
	}, 
	 {
	 	test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
	 	loader: 'url-loader',
	 	options: {
	 		limit: 10000,
	 	}
	 },
	{
		test: /\.html$/,
		// html中的img标签
		use: ["html-withimg-loader"]
	}, {
		test: /\.less$/,
		// 三个loader的顺序不能变
		// 不分离的写法
		// use: ["style-loader", "css-loader", "less-loader"]
		// 分离的写法
		use: extractTextPlugin.extract({
			fallback: "style-loader",
			use: ["css-loader", "less-loader"],
			// css中的基础路径
			publicPath: "../"
		})
	},
];
module.exports = rules;