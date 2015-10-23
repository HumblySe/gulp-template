'use strict';
var config = require('./config'),
    exclude_paths = new RegExp(config.vendors.concat('webpack').join("|")); // Paths pointing to libraries. Added webpack for cache folder

module.exports = {

    context: __dirname,

    entry: {
        main: config.mainfile ,
        vendors: config.vendors
    },

    output: {
        path: config.publicdirectory + config.jsdirectory,
        filename: "bundle.js"
    },

    resolve: {
        modulesDirectories: config.vendor_path
    },

    jscs: config.jscs_options,

    module: {
        preLoaders: [{
            test:    /\.js$/,
            exclude: exclude_paths,
            loader: 'jscs-loader'
        }],

        loaders: [
            {
                test: /\.js$/,
                exclude: exclude_paths, // Exclude all vendors
                loaders: ['babel-loader']
            }
        ]
    },

    plugins: [
        new config.webpack.ProvidePlugin({
            'jQuery': 'jquery',
            '$': 'jquery',
            'window.jQuery': 'jquery'
        }),
        new config.webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    ]
};