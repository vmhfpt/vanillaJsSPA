const path = require('path');

module.exports = {
  entry: './frontend/static/js/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'frontend'),
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
};