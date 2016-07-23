var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({lazy: false});
var config = require('./config');

gulp.task('shaders', () => {
  return gulp.src(config.shadersSrc)
      .pipe(plugins.plumber())
      .pipe(plugins.flatten())
      .pipe(gulp.dest(config.shadersDist));
});
