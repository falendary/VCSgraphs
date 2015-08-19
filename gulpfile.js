(function () {
    "use strict";
    var gulp = require('gulp')
        , browserify = require('gulp-browserify')
        , uglify = require('gulp-uglify')
        , rename = require('gulp-rename')
        , plumber = require('gulp-plumber');

    gulp.task('example', function() {
        return gulp.src('./dist/vcsgraph.min.js')
            .pipe(gulp.dest('./example/js/'));
    });

    gulp.task('min', function(){
        return gulp.src('./src/vcsgraph.js')
            //.pipe(browserify())
            .pipe(plumber())
            .pipe(uglify())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('./dist'));
    });

    gulp.task('watch', function(){
        gulp.watch('./src/*.js', ['min']);
        gulp.watch('./dist/*.js', ['example']);
    });

    gulp.task('default', ['watch']);

}());