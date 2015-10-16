var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var less = require('gulp-less');
var refresh = require('gulp-livereload');
var lr = require('tiny-lr');
var server = lr();
var minifyCSS = require('gulp-minify-css');
var embedlr = require('gulp-embedlr');

gulp.task('scripts', function() {
    gulp.src(['build/js/**/*.js'])
        .pipe(browserify())
        .pipe(concat('script.js'))
        .pipe(gulp.dest('js/'))
        .pipe(refresh(server))
})

gulp.task('styles', function() {
    gulp.src(['build/less/style.less'])
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('css'))
        .pipe(refresh(server))
})

gulp.task('lr-server', function() {
    server.listen(35729, function(err) {
        if(err) return console.log(err);
    });
})

gulp.task('html', function() {
    gulp.src("build/html/*.html")
        .pipe(embedlr())
        .pipe(gulp.dest(''))
        .pipe(refresh(server));
})

gulp.task('default', ['lr-server', 'scripts', 'styles', 'html'], function() {
    

    gulp.watch('build/js/**', function(event) {
        gulp.run('scripts');
    })

    gulp.watch('build/less/**', function(event) {
        gulp.run('styles');
    })

    gulp.watch('app/**/*.html', function(event) {
        gulp.run('html');
    })
})