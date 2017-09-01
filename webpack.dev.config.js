const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin('semantic/semantic.min.css');
const autoprefixer = require('autoprefixer');

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
    extensions: ['.js', '.jsx', '.css']
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
    new webpack.NoEmitOnErrorsPlugin(),
    extractCSS,
    new webpack.LoaderOptionsPlugin({ options: { postcss: [ autoprefixer ] } })
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'client'),
        use: ['react-hot-loader', 'babel-loader?' + JSON.stringify({
          cacheDirectory: true,
          presets: ['es2015', 'react', 'stage-1']
        })],
      }
    ]
  }
};
