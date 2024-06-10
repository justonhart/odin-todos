const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		index: './src/script.ts',
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(png|jpg|svg)$/i,
				type: 'asset/resource'
			},
			{
				test: /\.ts?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		]
	},
	resolve: {
		extensions: [
			'.tsx',
			'.ts',
			'.js'
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Output Management',
			template: './src/index.html'
		})
	]
};
