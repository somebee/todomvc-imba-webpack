var path = require('path');
var webpack = require('webpack');

module.exports = {
	module: {
		loaders: [{ "test": /\.imba$/, "loader": 'imba-loader'}]
	},
	resolveLoader: { root: path.join(__dirname, "node_modules") },
	resolve: {extensions: ['', '.imba', '.js']},
	entry: "./src/app.imba",
	output: { filename: "./js/bundle.js" },
	plugins: [
		new webpack.DefinePlugin({"Imba.SERVER": false,"Imba.CLIENT": true})
	]
}