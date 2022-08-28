const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const root = path.resolve(__dirname, '..');

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    mainFields: ['main', 'module', 'browser'],
  },
  entry: path.resolve(root, 'src', 'web', 'App.tsx'),
  target: 'electron-renderer',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(root, 'dist', 'web'),
    historyApiFallback: true,
    compress: true,
    hot: true,
    host: '0.0.0.0',
    port: 4000,
    publicPath: '/',
  },
  output: {
    path: path.resolve(root, 'dist', 'web'),
    filename: 'js/[name].js',
    publicPath: './',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(root, 'src', 'web', 'index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
