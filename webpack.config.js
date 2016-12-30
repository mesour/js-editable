var	path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: path.resolve(__dirname, 'src/index.jsx'),
	output: {
		library: 'Mesour editable component',
		libraryTarget: 'umd',

		path: path.resolve(__dirname, 'dist'),
		filename: 'js/mesour.editable.js'
	},
	module: {
		loaders: [
			{
				test: /.jsx$/,
				loader: 'babel',
				include: path.resolve(__dirname, 'src')
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract("style", "css!sass")
			}
		]
	},
	resolve: {
		extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
	},
	devtool: 'eval',
	plugins: [
		new ExtractTextPlugin('css/mesour.editable.css', {
			allChunks: true
		})
	]
};