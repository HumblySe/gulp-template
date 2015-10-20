'use strict';
var config = require('./config');

module.exports = {

    context: __dirname,

    entry: {
        main: '../build/js/main.js'
    },

    output: {
        path: "dist",
        filename: "bundle.js"
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
        // new config.webpack.HotModuleReplacementPlugin()
    ]
};