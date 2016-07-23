var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var plugins = require('gulp-load-plugins')({lazy: false});
var config = require('./config');

gulp.task('scripts', () => {
  //return gulp.src(config.mainScriptSrc)
  //    .pipe(plugins.sourcemaps.init())
  //    .pipe(plugins.babel({ optional: ['runtime'] }))
  //    .pipe(plugins.concat(config.scriptDistFileName))
  //    .pipe(plugins.sourcemaps.write('.'))
  //    .pipe(gulp.dest(config.scriptsDist));

  browserify({entries: config.mainScriptSrc, extensions: ['.js'], debug: true})
    .transform(babelify, {presets: ['es2015']})
    .bundle()
      .on('error', (error) => { console.error(error); this.emit('end'); })
    .pipe(source(config.scriptDistFileName))
    .pipe(buffer())
    .pipe(plugins.sourcemaps.init({loadMaps: true}))
    .pipe(plugins.sourcemaps.write(config.sourceMapsDist))
    .pipe(gulp.dest(config.scriptsDist))
    .pipe(plugins.size({title: 'Scripts before minifying'}));

  // TODO: Add minification back in (also, concatenate third-party-licenses.md).
  //.pipe(plugins.rename({suffix: '.min'}))
  //.pipe(plugins.sourcemaps.init({loadMaps: true}))
  //.pipe(plugins.uglify())
  //.pipe(plugins.sourcemaps.write(config.sourceMapsDist))
  //.pipe(gulp.dest(config.scriptsDist))
  //.pipe(plugins.size({title: 'Scripts after minifying'}));
});
