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
            pkg = require('../environment.json');

        // Concat path to files
        this.vendor_path = this.vendor_path.concat(pkg.js_vendor_path);
        this.app_path = this.app_path.concat(pkg.js_build__path);
        this.vendors = this.vendors.concat(pkg.js_vendors);
        this.publicdirectory = pkg.publicdirectory;
        this.jsdirectory = pkg.jsdirectory;

        // this.node_modules = path.resolve('./node_modules');
        return this;
    }
}.init();