module.exports = {

    /*
        Do not edit here, edit in package.json instead.
        Paths resoled on runtime.
    */
    vendors: [],
    app_path: [],
    vendor_path: ['web_modules', 'node_modules', 'bower_components'], // Resolved on runtime. Added default bower_component

    vendors_unresolved: null,
    // Internal vars
    node_modules: null,
    webpack: require('webpack'),
    app_watchpath: null,
    publicdirectory: null,

    init: function() {

        var gutil = require('gulp-util'),
            path = require('path'),
            pkg = require('../package.json');

        // Concat path to files
        this.vendor_path = this.vendor_path.concat(pkg.buildConfig.js_vendor_path);
        this.app_path = this.app_path.concat(pkg.buildConfig.js_build__path);
        this.vendors = this.vendors.concat(pkg.buildConfig.js_vendors);
        this.publicdirectory = pkg.buildConfig.publicdirectory;
        this.jsdirectory = pkg.buildConfig.jsdirectory;

        // this.node_modules = path.resolve('./node_modules');
        return this;
    }
}.init();