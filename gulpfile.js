var   gulp = require('gulp'),
      concatCss = require('gulp-concat-css'),
      livereload = require('gulp-livereload'),
      connect = require('gulp-connect'),
      path = require('path'),
      less = require('gulp-less');

// for livereload pipe
gulp.task('connect', function() {
   connect.server({
      root: 'app',
      livereload: true
   });
});

// concat css
gulp.task('concat-css', function () {
   return gulp.src('css/*.css')
   .pipe(concatCss('style.css'))
   .pipe(gulp.dest('app/css'))
   .pipe(connect.reload());
});

// move html files to app folder
gulp.task('html', function() {
   gulp.src('*.html')
   .pipe(gulp.dest('app'))
   .pipe(connect.reload());
});

// less compilation
gulp.task('less', function () {
   return gulp.src('less/*.less')
   .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
   }))
   .pipe(gulp.dest('css/'))
   .pipe(connect.reload());
});

// move images for styles
gulp.task('img', function() {
   return gulp.src(['img/*.*'])
   .pipe(gulp.dest('app/img/'))
   .pipe(connect.reload())
});

// move images for conten
gulp.task('img2', function() {
   return gulp.src(['images/*.*'])
   .pipe(gulp.dest('app/images/'))
   .pipe(connect.reload())
});

// move favicons
gulp.task('favicon', function() {
   return gulp.src([	'img/favicon/*.*',])
   .pipe(gulp.dest('app/img/favicon/'))
   .pipe(connect.reload())
});

// concat .js files
gulp.task('js', function() {
   return gulp.src('js/*.js')
   .pipe(gulp.dest('app/js/'))
   .pipe(connect.reload())
});

// move fonts
gulp.task('fonts', function() {
   return gulp.src([	'fonts/*.*'])
   .pipe(gulp.dest('app/fonts/'))
   .pipe(connect.reload())
});

// watcher
gulp.task('watch', function() {
   gulp.watch('css/*.css', ['concat-css'])
   gulp.watch('*.html', ['html'])
   gulp.watch('img/*.*', ['img'])
   gulp.watch('img/favicon/*.*', ['favicon'])
   gulp.watch('images/*.*', ['img2'])
   gulp.watch('fonts/*.*', ['fonts'])
   gulp.watch('less/*.less', ['less'])
   gulp.watch('js/*.js', ['js'])
});

// default tusk "gulp"
gulp.task('default', ['connect', 'less', 'concat-css', 'html', 'js', 'img', 'fonts', 'img2', 'favicon', 'watch']);