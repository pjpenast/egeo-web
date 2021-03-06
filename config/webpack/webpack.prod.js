const helpers = require('../helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const IgnorePlugin = require('webpack/lib/IgnorePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const HMR = false;

module.exports = function (env) {
   return webpackMerge(commonConfig({
      env: ENV
   }), {
      devtool: 'source-map',
      output: {
         path: helpers.root('target', 'site', 'web'),
         filename: '[name].bundle.js',
         sourceMapFilename: '[name].bundle.map',
         chunkFilename: '[name].chunk.js'
      },
      module: {
         rules: [{
               test: /\.css$/,
               loader: ExtractTextPlugin.extract({
                  fallbackLoader: 'style-loader',
                  loader: 'css-loader'
               }),
               include: [helpers.root('src', 'styles')]
            },
            {
               test: /\.scss$/,
               loader: ExtractTextPlugin.extract({
                  fallbackLoader: 'style-loader',
                  loader: 'css-loader!sass-loader'
               }),
               include: [helpers.root('src', 'styles')]
            },
            {
               test: /\.css$/,
               use: ['to-string-loader', 'css-loader'],
               include: [helpers.root('node_modules')]
            }
         ]
      },
      plugins: [
         new OptimizeJsPlugin({
            sourceMap: false
         }),
         new ExtractTextPlugin('[name].css'),
         new DefinePlugin({
            'ENV': JSON.stringify(ENV),
            'HMR': HMR,
            'process.env': {
               'ENV': JSON.stringify(ENV),
               'NODE_ENV': JSON.stringify(ENV),
               'HMR': HMR,
            }
         }),
         new CompressionPlugin({
            asset: "[path].gz",
            algorithm: "gzip",
            test: /\.js$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
         }),
         new UglifyJsPlugin({
            beautify: false, //prod
            output: {
               comments: false
            }, //prod
            mangle: {
               screw_ie8: true
            }, //prod
            compress: {
               screw_ie8: true,
               warnings: false,
               conditionals: true,
               unused: true,
               comparisons: true,
               sequences: true,
               dead_code: true,
               evaluate: true,
               if_return: true,
               join_vars: true,
               negate_iife: false
            },
         }),
         new NormalModuleReplacementPlugin(
            /angular2-hmr/,
            helpers.root('config/empty.js')
         ),

         new NormalModuleReplacementPlugin(
            /zone\.js(\\|\/)dist(\\|\/)long-stack-trace-zone/,
            helpers.root('config/empty.js')
         ),

         new LoaderOptionsPlugin({
            minimize: true,
            debug: false,
            options: {
               htmlLoader: {
                  minimize: true,
                  removeAttributeQuotes: false,
                  caseSensitive: true,
                  customAttrSurround: [
                     [/#/, /(?:)/],
                     [/\*/, /(?:)/],
                     [/\[?\(?/, /(?:)/]
                  ],
                  customAttrAssign: [/\)?\]?=/]
               },

            }
         }),
      ],
      node: {
         global: true,
         crypto: 'empty',
         process: false,
         module: false,
         clearImmediate: false,
         setImmediate: false
      }

   });
}
