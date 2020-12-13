const del = require('del');
const execa = require('execa');
const gulp = require('gulp');

gulp.task('clean', () => {
  return del('./lib/*', { force: true });
});

gulp.task('typescript', async () => {
  const { exitCode } = await execa('tsc', { stdio: 'inherit' });
  console.log(`The process exited with code ${exitCode}`);
});

gulp.task('copy', () => {
  return gulp
    .src('./src/templates/**/*.{html,js}')
    .pipe(gulp.dest('./lib/templates'));
});

gulp.task('default', gulp.series('clean', 'typescript', 'copy'));
