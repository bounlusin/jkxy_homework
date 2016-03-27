var gulp = require('gulp');
var less = require('gulp-less');
var clean = require('gulp-clean-css');

gulp.task('less', function() {
    gulp.src('less/style.less')
        .pipe(less())
        .pipe(clean())
        .pipe(gulp.dest('styles/'));
});

gulp.task('auto', function() {
    gulp.watch('less/*.less', ['less']);
});

gulp.task('default', ['less', 'auto']);
