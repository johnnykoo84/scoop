const webpack = require('webpack');
const path = require('path');

module.exports = {

  entry: [
    path.resolve('./client/index.js'),
    'webpack-dev-server/client?http://0.0.0.0:3001',
    'webpack/hot/only-dev-server'
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  devServer: {
    hot: true,
    filename: 'bundle.js',
    publicPath: '/',
    historyApiFallback: true,
    contentBase: './public',
    proxy: {
        "*": "http://localhost:3000"
    }
  },

    plugins: [
      new webpack.HotModuleReplacementPlugin(), // Enable HMR
      new webpack.NoEmitOnErrorsPlugin()
    ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'client'),
        loader: ['react-hot-loader', 'babel-loader?' + JSON.stringify({
          cacheDirectory: true,
          presets: ['es2015', 'react']
        })],
      },
    ]
  }
};
