const gulp = require('gulp');

// Копируем все шрифты из папки dev в dist

module.exports = function fonts() {
  return gulp.src('dev/web/fonts/**/*.*')
    .pipe(gulp.dest('dist/web/fonts'))
};
