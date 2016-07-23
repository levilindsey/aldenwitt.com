var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({lazy: false});
var config = require('./config');
var Server = require('karma').Server;

gulp.task('tdd', (done) => {
  new Server({
    configFile: config.karmaConfigPath
  }, done).start();
});
