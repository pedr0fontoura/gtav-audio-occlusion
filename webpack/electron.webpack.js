const path = require('path');
const root = path.resolve(__dirname, '..');

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(root, 'src'),
    },
  },
  devtool: 'source-map',
  entry: path.resolve(root, 'src', 'electron', 'main', 'index.ts'),
  target: 'electron-main',
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
  node: {
    __dirname: false,
  },
  output: {
    path: path.resolve(root, 'dist'),
    filename: '[name].js',
  },
};
