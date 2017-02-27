var HtmlWebpackPlugin = require('html-webpack-plugin');

var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});
var webpack = require("webpack");

module.exports = {
  entry: ['webpack-dev-server/client?http://0.0.0.0:8180', // WebpackDevServer host and port
    'webpack/hot/only-dev-server',
    './app/index.js'
  ],
  output: {
    path: __dirname + '/dist',
    filename: "index_bundle.js",
    publicPath: "/"
    //,publicPath: 'http://0.0.0.0:8180/dist'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ["react-hot","babel?presets[]=es2015"]
      }, {
        test: /\.scss$/,
        loaders: [ 'style', 'css?sourceMap&root=http://0.0.0.0:8181','sass?sourceMap']
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        loader: "file"
      }
    ]
  },
  
    "resolve": {
      "alias": {
        "react": "preact-compat",
        "react-dom": "preact-compat"
      }
    }
  ,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    HTMLWebpackPluginConfig,
    new webpack.optimize.DedupePlugin()
  ]
};
