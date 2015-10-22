var gulp = 		  require('gulp'),
	gutil = 	  require("gulp-util"),
	env = 		  require('./environment.json'),
	concat = 	  require('gulp-concat'),
	less = 		  require('gulp-less'),
	minifycss =   require('gulp-minify-css'),
	sourcemaps =  require('gulp-sourcemaps'),
	rename = 	  require('gulp-rename'),
	browsersync = require('browser-sync').create(),
	webpack = 	  require('webpack'),
	config = 	  require('./config/config.js'),
	watch = 	  require('gulp-watch'),
    mustache =    require('gulp-mustache'),
	devConfig =   require("./config/webpack.dev.config.js"), // Load webpack dev config
    devCompiler = webpack(devConfig), // create a single instance of the compiler to allow caching
    publicdir =   env.publicdirectory,
    cssdir =      publicdir + env.cssdirectory,
    jsdir =       publicdir + env.jsdirectory

	checkError = function(status) {
        if (status.compilation.errors.length > 0) {
            gutil.beep();
        }
    },

    // Help
    help = function() {
        console.log();
        console.log(gutil.colors.dim('#################################'));
        console.log();
        console.log(gutil.colors.dim(' ##  ##  #######  ##     ######'));
        console.log(gutil.colors.dim(' ##  ##  ##       ##     ##  ##' ));
        console.log(gutil.colors.dim(' ######  #####    ##     ######'));
        console.log(gutil.colors.dim(' ##  ##  ##       ##     ##'));
        console.log(gutil.colors.dim(' ##  ##  #######  #####  ##'));
        console.log();
        console.log(gutil.colors.dim('###########STAY#HUMBLE###########'));

        console.log();
        console.log(gutil.colors.underline('Avaiable tasks:'));
        console.log(gutil.colors.bold('help:'), 'this');
        console.log(gutil.colors.bold('vendors:'), 'concatinate vendor files to', gutil.colors.cyan('vendor.js'));
        console.log(gutil.colors.bold('dev:'), 'concatinate vendor to', gutil.colors.cyan('vendor.js'), 'and build to', gutil.colors.cyan('bundle.js'),'watches', gutil.colors.cyan('app_path'));
        console.log(gutil.colors.bold('prod:'), 'concatinate and minfies all vendors and buildfiles to', gutil.colors.cyan('bundle.js'));
        console.log();

        console.log(gutil.colors.underline('Libraries & plugins:'));
        console.log('Edit the', gutil.colors.bold('vendors'), 'in', gutil.colors.cyan('environment.json'));
        console.log();

        console.log(gutil.colors.underline('Paths:'));
        console.log('Developement files: ', gutil.colors.bold('app_path'), 'in', gutil.colors.cyan('environment.json'));
        console.log('Libraries & plugins:', gutil.colors.bold('vendor_path'), 'in', gutil.colors.cyan('environment.json'));
        console.log();

        console.log(gutil.colors.underline('NOTE:'));
        console.log('This task automatically resolves libraries and plugins without');
        console.log('having to specify the installation directory for each vendor.');
        console.log('Just make sure that', gutil.colors.cyan('vendor_path'), 'are pointer to correct folders');
        console.log();

    };

// Dev webpack task
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

// Dist webpack task
gulp.task("dist:webpack", function(callback) {

    gutil.log('Building for production');

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
    prodConfig.output.path = env.publicdirectory + env.jsdirectory;

    webpack(prodConfig, function(err, status) {
        if (err) {
            gutil.beep();
            throw new gutil.PluginError("dist:webpack", err);
        } else {
            checkError(status);
            gutil.log("[dist:webpack]", status.toString({ colors: true }));
            console.log();
            gutil.log(gutil.colors.green('May the deployment gods smile upon you'));
            console.log();
            callback();
        }
    });
});

// CSS
gulp.task('dev:css', function(cb) {
	return gulp.src('./build/less/style.less')
		.pipe(sourcemaps.init())
		.pipe(less())
        .on('error', gutil.log)
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(cssdir))
		.pipe(browsersync.stream());
});

// Watch task
gulp.task('dev:watch', function() {

	gutil.log(gutil.colors.green("Now watching"), '[', gutil.colors.cyan(env.js_build_path), ']\n');
    watch(env.js_build_path, function() {
        gulp.run(["dev:webpack"]);
    });

    gutil.log(gutil.colors.green("Now watching"), '[', gutil.colors.cyan('./build/less/style.less'), ']\n');
    return gulp.watch('./build/less/style.less', ['dev:css']);

});

gulp.task('dev:templates', function() {
    return gulp.src('./templates/*.mustache')
        .pipe(mustache({
            cssdir: env.cssdirectory,
            jsdir: env.jsdirectory
         }))
        .pipe(rename(function(path) {
            path.extname = '.html'
        }))
        .pipe(gulp.dest(publicdir));
});

// Browsersync
gulp.task('dev:browsersync', ['dev:css','dev:webpack','dev:templates'], function() {
	var options = env.proxy ? { proxy: env.proxy } : { server: { baseDir: publicdir } };
    options.files = [cssdir];
    options.port = env.port;
	browsersync.init(options);
});

// Vendor tasks
gulp.task('vendors:css', function(cb) {
	return gulp.src('./build/less/vendors.less')
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(cssdir));
});

// Dist vendors css
gulp.task('dist:vendors-css', function(cb) {
	return gulp.src('./build/less/vendors.less')
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(minifycss())
		.pipe(sourcemaps.write())
        .pipe(rename('vendors.min.css'))
		.pipe(gulp.dest(cssdir));
});

// Dist css
gulp.task('dist:css', function(cb) {
	return gulp.src('./build/less/style.less')
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(minifycss())
		.pipe(sourcemaps.write())
        rename('style.min.css')
		.pipe(gulp.dest(cssdir));
});

// Register actual tasks
gulp.task('dev', ['dist:vendors-css', 'dev:css', 'dev:webpack', 'dev:watch', 'dev:browsersync']);
gulp.task('vendors', ['vendors:css']);
gulp.task('dist', ['dist:vendors-css','dist:css', 'dist:webpack']);
gulp.task('default', help);
gulp.task('help', help);
