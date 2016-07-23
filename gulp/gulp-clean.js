var gulp = require('gulp');
var del = require('del');
var config = require('./config');

gulp.task('clean', (done) => {
  del([config.distPath]).then((paths) => {
    done();
  });
});
