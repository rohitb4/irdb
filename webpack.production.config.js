var HtmlWebpackPlugin = require('html-webpack-plugin');

var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});
var webpack = require("webpack");

module.exports = {
  entry: [
    './app/index.js'
  ],
  output: {
    path: __dirname + '/dist',
    filename: "index_bundle.js",
    publicPath: "/"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ["babel?presets[]=es2015"]
      }, {
        test: /\.scss$/,
        loaders: [ 'style', 'css', 'sass']
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        loader: "file"
      }
    ]
  },
  resolve: {
    "alias": {
      "react": "preact-compat",
      "react-dom": "preact-compat"
    }
  },
  plugins: [
    HTMLWebpackPluginConfig,
    new webpack.optimize.UglifyJsPlugin({
      output: {
          comments: false
      }
    }),
    new webpack.optimize.DedupePlugin()
  ]
};
