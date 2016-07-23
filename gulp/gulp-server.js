var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({lazy: false});
var gulpConfig = require('./config');

// Useful for front-end-only projects
gulp.task('server', ['watch'], () => {
  return gulp.src(gulpConfig.distPath)
    .pipe(plugins.webserver({
      host: gulpConfig.host,
      port: gulpConfig.port,
      fallback: 'index.html',
      livereload: {
        enable: true,
        port: 35728
      },
      open: true
    }));
});
