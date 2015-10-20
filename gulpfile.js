var gulp = require('gulp');
var gutil = require('gulp-util');
var env = require('./environment.json');
var concat = require('gulp-concat');
var less = require('gulp-less');
var minifycss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var browsersync = require('browser-sync').create();
var publicdir = '.' + env.publicdirectory;

// dev tasks
gulp.task('dev:css', function(cb) {
	return gulp.src('./build/less/style.less')
		.pipe(sourcemaps.init())
		.pipe(less())
        .on('error', gutil.log)
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(publicdir + '/css'))
		.pipe(browsersync.stream());
});

gulp.task('dev:watch', function() {
	return gulp.watch('./build/less/style.less', ['dev:css']);
});

gulp.task('dev:browsersync', function() {
	var options = env.proxy ? { proxy: env.proxy } : { server: { baseDir: publicdir } };
    options.files = [publicdir + '/css/style.css'];
    options.port = env.port;
	browsersync.init(options);
});

// vendor tasks
gulp.task('vendor:css', function(cb) {
	return gulp.src('./build/less/vendor.less')
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(publicdir + '/css'))
});

// dist tasks
gulp.task('dist:vendor-css', function(cb) {
	return gulp.src('./build/less/vendor.less')
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(minifycss())
		.pipe(rename('vendor.min.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(publicdir + '/dist/css'))
});
gulp.task('dist:css', function(cb) {
	return gulp.src('./build/less/style.css')
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(minifycss())
		.pipe(rename('style.min.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(publicdir + '/css'))
});

gulp.task('dev', ['dev:watch', 'dev:css', 'dev:browsersync']);

gulp.task('vendor', ['vendor:css']);

gulp.task('dist', ['dist:vendor-css','dist:css']);
