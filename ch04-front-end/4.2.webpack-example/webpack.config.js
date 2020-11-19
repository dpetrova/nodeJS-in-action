const path = require('path');
const webpack = require('webpack');
 
module.exports = {
  entry: './app/index.jsx', //input file ( main file that loads the application)
  output: { path: __dirname, filename: 'dist/bundle.js' }, //output file
  module: {
    loaders: [
      {
        test: /.jsx?$/, //match all JSX files
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'] //use Babel ES2015 and React plugins
        }
      }
    ]
  },
};
