const del = require('del');
const gulp = require('gulp');
const { spawn } = require('child_process');

gulp.task('clean', () => {
    return del('./lib/*', { force: true });
});

gulp.task('typescript', (cb) => {
    const cmd = spawn('tsc', { stdio: 'inherit' });
    cmd.on('close', (code) => {
      console.log(`The process exited with code ${code}`);
      cb(code);
  });
});

gulp.task('copy', () => {
    return gulp
        .src('./src/templates/**/*.{html,js}')
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

gulp.task('default', gulp.series('clean', 'typescript', 'copy', 'directory', 'wrapup'));
