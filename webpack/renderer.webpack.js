const path = require('path');

const root = path.resolve(__dirname, '..');

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(root, 'src'),
    },
  },
  module: {
    rules: require('./rules.webpack'),
  },
};
