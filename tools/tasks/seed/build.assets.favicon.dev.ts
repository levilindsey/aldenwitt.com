import * as gulp from 'gulp';
import { join } from 'path';

import { APP_DEST, FAVICONS_SRC, TEMP_FILES } from '../../config';

/**
 * Executes the build process, copying the assets located in `src/client` over to the appropriate
 * `dist/dev` directory.
 */
export = () => {
  let paths: string[] = [
    join(FAVICONS_SRC, '**'),
  ].concat(TEMP_FILES.map((p) => { return '!' + p; }));

  return gulp.src(paths)
    .pipe(gulp.dest(APP_DEST));
};
