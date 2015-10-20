var gulp = 		  require('gulp'),
	gutil = 	  require("gulp-util"),
	env = 		  require('./environment-default.json'),
	concat = 	  require('gulp-concat'),
	less = 		  require('gulp-less'),
	minifycss =   require('gulp-minify-css'),
	sourcemaps =  require('gulp-sourcemaps'),
	rename = 	  require('gulp-rename'),
	browsersync = require('browser-sync').create(),
	webpack = 	  require('webpack'),
	config = 	  require('./config/config.js'),
	watch = 	  require('gulp-watch'),
	devConfig =   require("./config/webpack.dev.config.js"), // Load webpack dev config
    devCompiler = webpack(devConfig), // create a single instance of the compiler to allow caching

	checkError = function(status) {
        if (status.compilation.errors.length > 0) {
            gutil.beep();
        }
    },

    help = function() {
        console.log();
        console.log(gutil.colors.dim('#####################################'));
        console.log(gutil.colors.dim('#################STAY#HUMBLE#ASK#FOR#'));
        console.log();
        console.log(gutil.colors.dim('  ##  ##  #######  ##     ######'));
        console.log(gutil.colors.dim('  ##  ##  ##       ##     ##  ##' ));
        console.log(gutil.colors.dim('  ######  #####    ##     ######'));
        console.log(gutil.colors.dim('  ##  ##  ##       ##     ##'));
        console.log(gutil.colors.dim('  ##  ##  #######  #####  ##'));
        console.log();
        console.log(gutil.colors.dim('############################HUMBLE'));


        console.log();
        console.log(gutil.colors.underline('Avaiable tasks:'));
        console.log(gutil.colors.bold('help:'), 'this');
        console.log(gutil.colors.bold('vendors:'), 'concatinate vendor files to', gutil.colors.cyan('vendor.js'));
        console.log(gutil.colors.bold('dev:'), 'concatinate vendor to', gutil.colors.cyan('vendor.js'), 'and build to', gutil.colors.cyan('bundle.js'),'watches', gutil.colors.cyan('app_path'));
        console.log(gutil.colors.bold('prod:'), 'concatinate and minfies all vendors and buildfiles to', gutil.colors.cyan('bundle.js'));
        console.log();

        console.log(gutil.colors.underline('Libraries & plugins:'));
        console.log('Edit the', gutil.colors.bold('vendors'), 'in', gutil.colors.cyan('package.json'));
        console.log();

        console.log(gutil.colors.underline('Paths:'));
        console.log('Developement files: ', gutil.colors.bold('app_path'), 'in', gutil.colors.cyan('package.json'));
        console.log('Libraries & plugins:', gutil.colors.bold('vendor_path'), 'in', gutil.colors.cyan('package.json'));
        console.log();

        console.log(gutil.colors.underline('NOTE:'));
        console.log('This task automatically resolves libraries and plugins without');
        console.log('having to specify the installation directory for each vendor.');
        console.log('Just make sure that', gutil.colors.cyan('vendor_path'), 'are pointer to correct folders');
        console.log();

    };

gulp.task("dev:webpack", function(callback) {
    // run webpack
    devCompiler.run(function(err, status) {

        if (err) {
            gutil.beep();
            throw new gutil.PluginError("dev:webpack", err);
        } else {
            checkError(status);
            gutil.log("[dev:webpack]", status.toString({ colors: true }));
            callback();
        }
    });
});

gulp.task("vendor:webpack", function(callback) {

    config.resolveDependencies();

    // Load webpack vendors config
    var vendorConfig = require("./config/webpack.vendors.config.js");

    // run webpack for vendors
    webpack(vendorConfig, function(err, status) {

        if (err) {
            gutil.beep();
            throw new gutil.PluginError("vendor:webpack", err);
        } else {
            checkError(status);
            gutil.log("[vendor:webpack]", status.toString({ colors: true }));
            callback();
        }
    });
});

gulp.task("dist:webpack", function(callback) {

    var fName = "dist.bundle.js";
    gutil.log('Building for production');
    config.resolveDependencies();

    var prodConfig = Object.create(devConfig);

    prodConfig.plugins = devConfig.plugins.concat([
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            screw_ie8: true,
            compressor: {
                warnings: false
            }
        })
    ]);

    prodConfig.entry.main = config.vendors.concat(prodConfig.entry.main);
    prodConfig.output.filename = fName;

    webpack(prodConfig, function(err, status) {
        if (err) {
            gutil.beep();
            throw new gutil.PluginError("dist:webpack", err);
        } else {
            checkError(status);
            gutil.log("[dist:webpack]", status.toString({ colors: true }));
            console.log();
            gutil.log(gutil.colors.green('Output to', fName));
            gutil.log(gutil.colors.green('May the deployment gods smile upon you'));
            console.log();
            callback();
        }
    });
});

// dev tasks
gulp.task('dev:css', function(cb) {
    console.log('mapping style');
	gulp.src('./build/less/style.less')
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./dist/css'))
		.pipe(browsersync.stream());
});

gulp.task('dev:watch', function() {

	gutil.log(gutil.colors.green("Now watching"), '[', gutil.colors.cyan('./build/less/style.less'), ']\n');
    gulp.watch(['./build/less/style.less'], ["dev:css", function() { console.log('csswatch'); }]);

	gutil.log(gutil.colors.green("Now watching"), '[', gutil.colors.cyan(config.app_path), ']\n');
    watch(config.app_path, function() {
        gulp.run(["dev:webpack"]);
    });
});

gulp.task('dev:browsersync', function() {
	console.log(env.proxy);
	browsersync.init({
		proxy: env.proxy,
		port: 9999
	});
});

// vendor tasks
gulp.task('vendor:css', function(cb) {
	gulp.src('./build/less/vendor.less')
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./dist/css'))
});

// dist tasks
gulp.task('dist:vendor-css', function(cb) {
	gulp.src('./build/less/vendor.less')
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(minifycss())
		.pipe(rename('vendor.min.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./dist/css'))
});

gulp.task('dist:css', function(cb) {
	gulp.src('./build/less/style.css')
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(minifycss())
		.pipe(rename('style.min.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./dist/css'))
});

gulp.task('dev', ['vendor:webpack', 'dev:css', 'dev:webpack', 'dev:watch', 'dev:browsersync']);

gulp.task('vendor', ['vendor:css', 'vendor:webpack']);

gulp.task('dist', ['dist:vendor-css','dist:css', 'dist:webpack']);
