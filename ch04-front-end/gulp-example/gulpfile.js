const gulp = require('gulp');
//gulp plugins
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const watch = require('gulp-watch');
 
gulp.task('default', () => {
  //GATHER INPUT FILES (build-in gulp.src is used to find all React jsx files)
  return gulp.src('app/*.jsx')
    //start watching source files to build source maps for debugging
    .pipe(sourcemaps.init())
    //TRANSPILE (configures gulp-babel to use ES2015 and React (JSX))
    .pipe(babel({
      presets: ['es2015', 'react']
    }))
    //CONCAT all of the source files together into all.js
    .pipe(concat('all.js'))
    //write the source map files separately
    .pipe(sourcemaps.write('.'))
    //OUTPUT (redirect all files to the /dist folder)
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
  watch('app/**.jsx', () => gulp.start('default'));
});
