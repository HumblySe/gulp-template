var gulp = require('gulp');
var env = require('./environment.json');
var concat = require('gulp-concat');
var less = require('gulp-less');
var minifycss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var browsersync = require('browser-sync').create();

// dev tasks
gulp.task('dev:css', function(cb) {
	gulp.src('./build/less/style.less')
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./dist/css'))
		.pipe(browsersync.stream());
});

gulp.task('dev:watch', function() {
	gulp.watch('build/less/style.less', function() { gulp.run('dev:css'); });
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

gulp.task('dev', ['dev:css', 'dev:browsersync', 'dev:watch']);

gulp.task('vendor', ['vendor:css']);

gulp.task('dist', ['dist:vendor-css','dist:css']);
