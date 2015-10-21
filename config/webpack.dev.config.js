'use strict';
var config = require('./config');
console.log("TEST: " + makeVendorRegex());
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

    resolveLoader: {
        modulesDirectories: [
            config.node_modules
        ]
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: makeVendorRegex(), // TODO: exclude all vendor folders
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
        // new config.webpack.HotModuleReplacementPlugin()
    ]
};
function makeVendorRegex() {
    var regexescaped = config.vendors.map(function(vendor) {
        return vendor.replace('.././','').replace('\\','\\\\').replace('.','\\.');
    }).join('|');
    return new RegExp(regexescaped);
}