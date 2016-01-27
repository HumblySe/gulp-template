var gulp =        require('gulp'),
    gutil =       require("gulp-util"),
    env =         require('./environment.json'),
    concat =      require('gulp-concat'),
    less =        require('gulp-less'),
    minifycss =   require('gulp-minify-css'),
    sourcemaps =  require('gulp-sourcemaps'),
    rename =      require('gulp-rename'),
    browsersync = require('browser-sync').create(),
    webpack =     require('webpack'),
    config =      require('./config/config.js'),
    watch =       require('gulp-watch'),
    mustache =    require('gulp-mustache'),
    devConfig =   require("./config/webpack.dev.config.js"), // Load webpack dev config
    pkg =         require("./package.json"),
    publicdir =   pkg.buildConfig.rootpath + pkg.buildConfig.publicdirectory,
    cssdir =      publicdir + pkg.buildConfig.cssdirectory,
    jsdir =       publicdir + pkg.buildConfig.jsdirectory,
    dist_directory = pkg.buildConfig.rootpath + pkg.buildConfig.dist_directory,

    lessError = function(error) {
        this.emit("end");
        gutil.beep();
        gutil.log(gutil.colors.red(error.message));

        error.extract.forEach(function(extract) {
            if(extract !== undefined && extract !== '') {
                gutil.log(gutil.colors.red(extract));
            }
        });
    },

    checkError = function(status) { // fn beep if compilation errors
        if (status.compilation.errors.length > 0) {
            gutil.beep();
        }
    },

    help = function() { // fn to log help
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
        webpack(devConfig, (err, status)  => {
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

    var prodConfig = Object.create(devConfig); // Copy dev config

    // Add plugins for production
    prodConfig.plugins = devConfig.plugins.concat([
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            screw_ie8: true,
            compressor: {
                warnings: false
            }
        })
    ]);

    prodConfig.output.filename = 'bundle.min.js'; // Change name to bundle.min.js
    prodConfig.entry.main = config.vendors.concat(prodConfig.entry.main); // Merge all files to bundle.js
    delete prodConfig.entry.vendors;
    prodConfig.output.path = dist_directory; // Switch output directory to production
    prodConfig.plugins = prodConfig.plugins.filter(function(item) {
        var plugin_name = item.constructor.name;
        if ('CommonsChunkPlugin' !== plugin_name) {
            return true;
        } else {
            return false;
        }
    });


    webpack(prodConfig, function(err, status) { // Run webkpack with production conf
        if (err) {
            gutil.beep();
            throw new gutil.PluginError("dist:webpack", err);
        } else {
            checkError(status);
            gutil.log("[dist:webpack]", status.toString({ colors: true }));
            console.log();
            gutil.log(gutil.colors.green('May the force be with you'));
            console.log();
            callback();
        }
    });
});

// CSS
gulp.task('dev:css', function() {

    var stream = gulp.src(pkg.buildConfig.less_build_path + pkg.buildConfig.less_main_file).on('error', function(e,b){
        gutil.log(1);
    });

    stream.pipe(sourcemaps.init())
        .pipe(less().on('error', lessError))
        .pipe(sourcemaps.write())
        .pipe(browsersync.stream())
        .pipe(gulp.dest(cssdir));

    return stream;
});

// Watch task
gulp.task('dev:watch', function() {

    gutil.log(gutil.colors.green("Now watching"), '[', gutil.colors.cyan(pkg.buildConfig.js_build_path), ']\n');
    watch(pkg.buildConfig.js_build_path + pkg.buildConfig.js_watch_path, function() {
        gulp.run(["dev:webpack"]);
    });

    gutil.log(gutil.colors.green("Now watching"), '[', gutil.colors.cyan(pkg.buildConfig.less_build_path + pkg.buildConfig.less_watch_path), ']\n');
    return gulp.watch(pkg.buildConfig.less_build_path + pkg.buildConfig.less_watch_path, ['dev:css']);

});

gulp.task('templates', function() {
    return gulp.src('./templates/*.mustache')
        .pipe(mustache({
            cssdir: pkg.buildConfig.cssdirectory,
            jsdir: pkg.buildConfig.jsdirectory
         }))
        .pipe(rename(function(path) {
            path.extname = '.html'
        }))
        .pipe(gulp.dest(publicdir));
});

// Browsersync
gulp.task('dev:browsersync', ['dev:css','dev:webpack'], function() {
    var options = env.proxy ? { proxy: env.proxy } : { server: { baseDir: publicdir } };
    options.port = env.port;
    browsersync.init(options);
});

// Vendor tasks
gulp.task('vendors:css', function(cb) {
    return gulp.src(pkg.buildConfig.less_build_path + pkg.buildConfig.less_vendor_file)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(cssdir));
});

// Dist vendors css
gulp.task('dist:vendors-css', function(cb) {
    return gulp.src(pkg.buildConfig.less_build_path + pkg.buildConfig.less_vendor_file)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(minifycss())
        .pipe(sourcemaps.write())
        .pipe(rename('vendors.min.css'))
        .pipe(gulp.dest(dist_directory));
});

// Dist css
gulp.task('dist:css', function(cb) {
    return gulp.src([pkg.buildConfig.less_build_path + pkg.buildConfig.less_vendor_file,pkg.buildConfig.less_build_path + pkg.buildConfig.less_main_file])
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat('merged.css'))
        .pipe(minifycss({ keepSpecialComments:0, advanced:false }))
        .pipe(sourcemaps.write())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest(dist_directory));
});

// Register actual tasks
gulp.task('dev', ['dev:css', 'dev:webpack', 'dev:watch', 'dev:browsersync']);
gulp.task('vendors', ['vendors:css', 'dev:webpack']);
gulp.task('dist', ['dist:css', 'dist:webpack'], function(cb) { gutil.log('Outputing to folder:', gutil.colors.bold(gutil.colors.green(pkg.buildConfig.publicdirectory))); cb(); });
gulp.task('default', help);
gulp.task('help', help);
