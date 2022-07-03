const gulp = require('gulp');
const del = require('del');
const squoosh = require('gulp-squoosh');
const path = require('path');
const argv = require('yargs').argv;
const rename = require('gulp-rename');

// convert img
gulp.task('convert', (done) => {
  const arr = process.argv.splice(3);
  console.log(arr);

  let prOpt = {
    resize: {
      width: +arr[1],
    },
  };
  gulp
    .src(['img/**/*.{png,jpg}'])
    .pipe(
      squoosh(({ filePath }) => ({
        preprocessOptions: prOpt,
        encodeOptions: {
          webp: {},
          ...(path.extname(filePath) === '.png'
            ? { oxipng: {} }
            : { mozjpeg: {} }),
        },
      })),
    )
    .pipe(rename({ suffix: arr[0].replace('--', '-') }))
    .pipe(gulp.dest('output'));

  done();
});

// clean images
gulp.task('clean', () => {
  return del('output');
});
