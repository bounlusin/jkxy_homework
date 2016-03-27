var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('less', function() {
    gulp.src('less/main.less')
        .pipe(less())
        .pipe(gulp.dest('styles/'));
});

gulp.task('auto', function() {
    gulp.watch('less/main.less', ['less']);
});

gulp.task('default', ['less', 'auto']);
