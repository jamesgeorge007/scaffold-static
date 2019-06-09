const gulp = require('gulp');
const del = require('del');
const tsc = require('typescript');

gulp.task('clean', () => {
    return del('./lib/*', { force: true });
});

gulp.task('copy', () => {
    return gulp
        .src('./src/templates/**/*.html')
        .pipe(gulp.dest('./lib/templates'));
});

gulp.task('directory', () => {
    return gulp
        .src('./lib/scaffold.js')
        .pipe(gulp.dest('./lib/commands'));
});

gulp.task('wrapup', () => {
    return del('./lib/scaffold.js');
});

gulp.task('tasks', gulp.series('copy', 'directory', 'wrapup'));