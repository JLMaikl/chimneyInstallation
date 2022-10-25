const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');

gulp.task('pug', function(callback) {
    return gulp
      .src('./src/pug/pages/**/*.pug')
      .pipe(
        plumber({
          errorHandler: notify.onError(function (err) {
            return {
              title: 'Pug',
              sound: false,
              message: err.message,
            };
          }),
        }),
      )
      .pipe(
        pug({
          pretty: true,
        }),
      )
      .pipe(gulp.dest('./build/'))
      .pipe(browserSync.stream());
    callback();
});


//Таск для компиляции scss в css
gulp.task('scss', function(callback) {
    return gulp
      .src('./src/scss/**/*.scss')
      .pipe(
        plumber({
          errorHandler: notify.onError(function (err) {
            return {
              title: 'Styles',
              sound: false,
              message: err.message,
            };
          }),
        }),
      )
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(
        autoprefixer({
          overrideBrowserslist: ['last 4 versions'],
        }),
      )
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./build/css/'))
      .pipe(browserSync.stream())
    
    callback();
});

//Копирование изображений
gulp.task('copy:img', function(callback) {
    return gulp.src('./src/img/**/*.*')
      .pipe(gulp.dest('./build/img/'))
    callback();
});

//Копирование скриптов
gulp.task('copy:js', function(callback) {
    return gulp.src('./src/js/**/*.*')
      .pipe(gulp.dest('./build/js/'))
    callback();
});

//Слежение за html и css браузера
gulp.task('watch', function() {

    watch(['./build/img/**/*.*', './build/js/**/*.*'], gulp.parallel( browserSync.reload));
    
    //Слежение за SCSS и компиляция в CSS
    watch('./src/scss/**/*.scss', gulp.parallel('scss'));

    //Слежение за PUG
    watch('./src/pug/**/*.pug', gulp.parallel('pug'));


    //Следим за картинками и скриптами и копируем их в build
    watch('./src/img/**/*.*', gulp.parallel('copy:img'));
    watch('./src/js/**/*.*', gulp.parallel('copy:js'));

});

//Таск для старта сервера из папки app
gulp.task('server', function () {
  browserSync.init({
    server: {
      baseDir: './build/',
    },
  });
});


//Запускаем задачи
gulp.task(
  'default',
  gulp.series(
    gulp.parallel('scss', 'pug', 'copy:img', 'copy:js'),
    gulp.parallel('server', 'watch')
  )
);
