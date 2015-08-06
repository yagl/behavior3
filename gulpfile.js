
var gulp = require('gulp');
var concat = require('gulp-concat');
var babel = require('gulp-babel');

gulp.task('default', ['scripts']);

var paths = [
  'lib/**/*.js'
];

gulp.task('scripts', function () {
  return gulp.src(paths)
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});