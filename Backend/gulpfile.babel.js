var gulp = require('gulp');
var sourceMaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var path = require('path');


var PathsBackend = {
  es6: ['./src/**/*.js'],
  es5: './dist',
  sourceRoot: path.join(__dirname, 'src')
};

gulp.task('BabelBackend', function() {
  return gulp
    .src(PathsBackend.es6)
    .pipe(sourceMaps.init())
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(sourceMaps.write('.', { sourceRoot: PathsBackend.sourceRoot }))
    .pipe(gulp.dest(PathsBackend.es5));
});
gulp.task('watchBackend', function() {
  gulp.watch(PathsBackend.es6, ['BabelBackend'])
});
gulp.task('Backend', ['watchBackend', 'BabelBackend']);


gulp.task('default', ['Backend']);
