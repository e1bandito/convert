const { parallel, src, dest } = require('gulp');
const squoosh = require('gulp-libsquoosh');
const path = require('path');
const argv = require('yargs').argv;
const rename = require('gulp-rename');

const arr = process.argv.splice(3);
let width = +arr[1];

function convert() {
  return src(['./img/**/*.{png,jpg}'])
    .pipe(
      squoosh((src) => {
        const extname = path.extname(src.path);
        let options = {
          encodeOptions: squoosh.DefaultEncodeOptions[extname],
        };

        if (extname === '.jpg') {
          options = {
            encodeOptions: {
              webp: {},
              mozjpeg: {},
            },
            preprocessOptions: {
              resize: {
                width: width,
              }
            }
          };
        }

        if (extname === '.png') {
          options = {
            encodeOptions: {
              webp: {},
              oxipng: {}
            },
            preprocessOptions: {
              quant: {
                enabled: true,
                numColors: 16,
              },
              resize: {
                width: width,
              }
            },
          };
        }

        return options;
      })
    )
    .pipe(rename({ suffix: arr[0].replace('--', '-') }))
    .pipe(dest('./output'));
}

function convert2x() {
  return src(['./img/**/*.{png,jpg}'])
    .pipe(
      squoosh((src) => {
        const extname = path.extname(src.path);
        let options = {
          encodeOptions: squoosh.DefaultEncodeOptions[extname],
        };

        if (extname === '.jpg') {
          options = {
            encodeOptions: {
              webp: {},
              mozjpeg: {},
            },
            preprocessOptions: {
              resize: {
                width: width * 2,
              }
            }
          };
        }

        if (extname === '.png') {
          options = {
            encodeOptions: {
              webp: {},
              oxipng: {}
            },
            preprocessOptions: {
              quant: {
                enabled: true,
                numColors: 16,
              },
              resize: {
                width: width * 2,
              }
            },
          };
        }

        return options;
      })
    )
    .pipe(rename({ suffix: arr[0].replace('--', '-') + '@2x' }))
    .pipe(dest('./output'));
}

exports.convert = parallel(convert, convert2x);
