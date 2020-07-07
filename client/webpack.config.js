const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
	.BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const config = {
	entry: ["./src/index.jsx"],
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: "babel-loader",
				exclude: /node_modules/
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ["file-loader"]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ["file-loader"]
			}
		]
	},
	resolve: {
		extensions: [".js", ".jsx"]
	},
	plugins: [
		new BundleAnalyzerPlugin({
			analyzerMode: "static",
			openAnalyzer: false
		}),
		new HtmlWebpackPlugin({
			template: "./src/static/index.html"
		}),
		new CleanWebpackPlugin()
	],
	devServer: {
		contentBase: "./build"
	},
	optimization: {
		runtimeChunk: "single",
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					chunks: "all"
				}
			}
		},
		minimize: true,
		minimizer: [
			new TerserPlugin({
				extractComments: false,
				terserOptions: {
					compress: {
						drop_console: true
					},
					output: {
						comments: false
					}
				}
			})
		]
	}
};

module.exports = config;
