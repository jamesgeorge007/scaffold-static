const gulp = require('gulp');

gulp.task('copy', () => {
    return gulp
        .src('./src/templates/**/*.html')
        .pipe(gulp.dest('./lib/templates'));
});