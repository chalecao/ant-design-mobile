'use strict';
var gulp = require('gulp');

gulp.task('copy-less', function () {
    return gulp.src('src/**/*.less')
    .pipe(gulp.dest('es/'))
    .pipe(gulp.dest('dist/'));
})
