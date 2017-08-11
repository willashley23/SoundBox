"use strict";
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: __dirname,
  entry: __dirname + "/frontend/app.jsx",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  plugins: [
    new ExtractTextPlugin("style.css")
  ],
  module: {
    loaders: [
        {
            test: [/\.jsx?$/, /\.js?$/],
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
              presets: ['react', 'es2015']
            }
        },
        {
            test: /\.css$/,
            exclude:/node_modules/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
            })
        },
        {
            test: /\.less$/,
            exclude:/node_modules/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader!less-loader'
            })
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loader: 'file-loader?emitFile=false&name=[path][name].[ext]',
        }, 
    ]
  },
  devtool: 'source-maps',
  resolve: {
    extensions: [".js", '.jsx']
  }
};