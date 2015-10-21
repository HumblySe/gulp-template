'use strict';
var config = require('./config');

module.exports = {

    context: __dirname,

    entry: {
        main: '../build/js/main.js',
        vendors: config.vendors
    },

    output: {
        path: "dist",
        filename: "bundle.js"
    },


    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: new RegExp(config.vendors_unresolved.join("|")), // Exclude all vendors
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