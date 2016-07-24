import * as gulp from 'gulp';
import { join } from 'path';

import { APP_DEST, FAVICONS_SRC, TEMP_FILES } from '../../config';

// TODO: There should be a more elegant way to prevent empty directories from copying.
let es: any = require('event-stream');
var onlyDirs = function (es: any) {
  return es.map(function (file: any, cb: any) {
    if (file.stat.isFile()) {
      return cb(null, file);
    } else {
      return cb();
    }
  });
};

/**
 * Executes the build process, copying the assets located in `src/client` over to the appropriate
 * `dist/prod` directory.
 */
export = () => {
  return gulp.src([
    join(FAVICONS_SRC, '**'),
  ].concat(TEMP_FILES.map((p) => { return '!' + p; })))
    .pipe(onlyDirs(es))
    .pipe(gulp.dest(APP_DEST));
};
