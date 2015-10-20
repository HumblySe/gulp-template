module.exports = {

    /*
        Do not edit here, edit in package.json instead.
        Paths resoled on runtime.
    */
    vendors: [],
    app_path: [],
    vendor_path: ['./bower_components/'], // Resolved on runtime. Added default bower_component

    // Internal vars
    node_modules: null,
    webpack: require('webpack'),
    app_watchpath: null,

    init: function() {

        var gutil = require('gulp-util'),
            path = require('path'),
            pkg = require('../environment-default.json');

        // Concat path to files
        this.vendor_path = this.vendor_path.concat(pkg.js_vendor_path);
        this.app_path = this.app_path.concat(pkg.js_build__path);
        this.vendors = this.vendors.concat(pkg.js_vendors);

        this.node_modules = path.resolve('./node_modules');

        return this;
    },

    resolveDependencies: function() {

        var t = this,
            gutil = require('gulp-util');

        console.log();
        gutil.log('Resolving JS dependencies');
        t.vendors = t.vendors.reduce(function(vendors, vendor) {
            var initialLength = vendors.length;

            try {
                require.resolve(vendor);
                vendors.push(vendor);
                gutil.log(gutil.colors.gray(gutil.colors.bgGreen(vendor, 'in node_modules')));
            } catch(e) {
                t.vendor_path.forEach(function(path) {
                    try {

                        var newpath = '../'+ path + vendor;
                        require.resolve(newpath);
                        vendors.push(newpath);

                        gutil.log(gutil.colors.gray(gutil.colors.bgGreen(vendor, 'in', path)));
                    } catch(e) {

                    }
                });
            }
            if (vendors.length === initialLength) {
                gutil.beep();
                gutil.log(gutil.colors.gray(gutil.colors.bgRed(vendor, 'could not be resolved')));
            }
            return vendors;
        }, []);
        console.log();

        return t;
    }

}.init();