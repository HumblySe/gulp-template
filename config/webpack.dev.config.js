'use strict';
var config = require('./config');

module.exports = {

    context: __dirname,

    entry: {
        main: '../build/js/main.js',
        vendors: config.vendors
    },

    output: {
        path: config.publicdirectory + "/js",
        filename: "bundle.js"
    },

    resolve: {
        modulesDirectories: config.vendor_path
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: new RegExp(config.vendors.join("|")), // Exclude all vendors
                loaders: ['babel-loader']
            }
        ]
    },

    plugins: [
        new config.webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new config.webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    ]
};