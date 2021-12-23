const gulp = require('gulp');
const concat = require('gulp-concat');

const vendorsScripts = [
  'node_modules/svg4everybody/dist/svg4everybody.min.js',
  'node_modules/swiper/js/swiper.min.js',
  'node_modules/imask/dist/imask.min.js',
  // 'node_modules/d3/dist/d3.min.js',
  // 'node_modules/magnific-popup/dist/jquery.magnific-popup.min.js',
  // 'node_modules/jquery-circle-progress/dist/circle-progress.min.js',
  // 'node_modules/masonry-layout/dist/masonry.pkgd.min.js',
  // 'node_modules/fullcalendar/main.js',
  // 'node_modules/fullcalendar/locales/ru.js',
  // 'node_modules/fslightbox/index.js',
  'node_modules/lightcase/src/js/lightcase.js',
  // 'node_modules/mixitup/dist/mixitup.min.js'
];

module.exports = function vendors(cb) {
  return vendorsScripts.length
    ? gulp.src(vendorsScripts)
      .pipe(concat('libs.js'))
      .pipe(gulp.dest('dist/web/js/vendor/'))
    : cb();
};
