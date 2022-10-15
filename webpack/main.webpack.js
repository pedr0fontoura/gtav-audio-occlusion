const path = require('path');

const root = path.resolve(__dirname, '..');

module.exports = {
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(root, 'src'),
    },
  },
  entry: path.resolve(root, 'src', 'electron', 'main', 'index.ts'),
  module: {
    rules: require('./rules.webpack'),
  },
};
