var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({lazy: false});
var config = require('./config');
var Server = require('karma').Server;

gulp.task('test', config.buildTasks, (done) => {
  new Server({
    configFile: config.karmaConfigPath,
    singleRun: true
  }, done).start();
});
