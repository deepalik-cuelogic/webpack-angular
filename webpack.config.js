'use strict';
const path = require('path');
const fs = require('fs');
var webpack = require('webpack');
var ExtractCSS = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    // entry: './server.js',
    // output: {
    //     path: path.join(__dirname, 'build'),
    //     filename: 'bundle.js'
    // },
    // externals: nodeModules,
    // module: {
    //     loaders: [{
    //         exclude: /node_modules/,
    //         loader: 'babel-loader',
    //         query: {
    //             presets: ['es2015', 'stage-2']
    //         }
    //     }]
    // }

    entry: {
        app:'./bootstrap.angular.app.js',
        vendor: ['angular','angular-ui-router']
    },
    output: {
        path: path.resolve('build/resource'),
        publicPath: '/build/resource/',
        filename: 'js/client.bundle.js'
    },
    plugins: [
        new ExtractCSS('css/lessonBee.css'),
        new CopyWebpackPlugin([
          {
            from: './index.html',
            to: path.resolve(__dirname, 'build')
          }
        ]),
        new webpack.optimize.CommonsChunkPlugin(
          { 
            name: 'vendor', 
            filename: 'js/vendor.bundle.js',
            minChunks: Infinity,
          })
    ],
    module: {
        rules: [
            {
                test: /\.exec\.js$/,
                exclude: /node_modules/,
                use: [ 'script-loader' ]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ExtractCSS.extract({ fallbackLoader: 'style-loader', loader: 'css-loader' })
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                loader: ExtractCSS.extract({ fallbackLoader: 'style-loader', loader: 'css-loader!less-loader' })
            },
            {
                test: /\.(jpg|jpeg|gif|png)$/,
                exclude: /node_modules/,
                loader:'url-loader?limit=1024&name=images/[name].[ext]'
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=1024&name=fonts/[name].[ext]'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.scss' ,'.css']
      },
    //externals: nodeModules,
}
