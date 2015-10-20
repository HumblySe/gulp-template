'use strict';
var config = require('./config');

module.exports = {

    context: __dirname,

    entry: {
        vendors: config.vendors
    },

    output: {
        path: "dist",
        filename: "vendors.js"
    },

    resolveLoader: {
        modulesDirectories: [
            config.node_modules
        ]
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            }
        ]
    },

    plugins: [
        new config.webpack.optimize.DedupePlugin(),
        new config.webpack.optimize.UglifyJsPlugin({
            screw_ie8: true,
            compressor: {
                warnings: false
            }
        }),
        new config.webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            bootstrap: 'bootstrap'
        })
    ]
};