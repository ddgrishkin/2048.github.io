const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const BASE_PLUGINS = [
	new CssMinimizerPlugin(),
	new MiniCssExtractPlugin(),
	new CleanWebpackPlugin({
		protectWebpackAssets: false,
		cleanAfterEveryBuildPatterns: ['*LICENSE.txt'],
	}),
	new CopyWebpackPlugin({
		patterns: [
			{
				from: path.resolve(__dirname, '../src/styles'),
				to: 'css',
			},
		],
	}),
];

module.exports = function getPlugins() {
	if (process.env.NODE_ENV === 'production') {
		return BASE_PLUGINS;
	}

	return [
		...BASE_PLUGINS,
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../development.html'),
			chunks: ['dev'],
		}),
	];
}
