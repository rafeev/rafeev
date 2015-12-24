var   gulp = require('gulp'),
      concatCss = require('gulp-concat-css'),
      livereload = require('gulp-livereload'),
      connect = require('gulp-connect'),
      path = require('path'),
      less = require('gulp-less');

gulp.task('connect', function() {
   connect.server({
      root: 'app',
      livereload: true
   });
});

gulp.task('concat-css', function () {
   return gulp.src('css/*.css')
   .pipe(concatCss("style.css"))
   .pipe(gulp.dest('app/css'))
   .pipe(connect.reload());
});

gulp.task('html', function() {
   gulp.src('index.html')
   .pipe(gulp.dest('app'))
   .pipe(connect.reload());
});

gulp.task('less', function () {
   return gulp.src('less/style.less')
   .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
   }))
   .pipe(gulp.dest('css/'))
   .pipe(connect.reload());
});

gulp.task('img', function() {
   return gulp.src(['img/*.jpg','img/*.png',])
   .pipe(gulp.dest('app/img/'))
   .pipe(connect.reload())
});

gulp.task('img2', function() {
   return gulp.src([	'images/*.jpg','images/*.png',])
   .pipe(gulp.dest('app/images/'))
   .pipe(connect.reload())
});

gulp.task('favicon', function() {
   return gulp.src([	'img/favicon/*.jpg','img/favicon/*.xml','img/favicon/*.png','img/favicon/*.ico','img/favicon/*.json',])
   .pipe(gulp.dest('app/img/favicon/'))
   .pipe(connect.reload())
});

gulp.task('js', function() {
   return gulp.src('js/*.js')
   .pipe(gulp.dest('app/js/'))
   .pipe(connect.reload())
});

// перетаскиваем шрифты
gulp.task('fonts', function() {
   return gulp.src([	'fonts/*.eot','fonts/*.woff','fonts/*.svg','fonts/*.ttf'])
   .pipe(gulp.dest('app/fonts/'))
});

gulp.task('watch', function() {
   gulp.watch('css/*.css', ['concat-css'])
   gulp.watch('*.html', ['html'])
   gulp.watch('less/*.less', ['less'])
   gulp.watch('js/*.js', ['js'])
});

gulp.task('default', ['connect', 'less', 'concat-css', 'html', 'js', 'img', 'fonts', 'img2', 'favicon', 'watch']);