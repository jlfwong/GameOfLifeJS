var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var gulp = require('gulp');
var http = require('http');
var nodeStatic = require('node-static');
var stylus = require('gulp-stylus');

gulp.task('bundle-js', function() {
  gulp.src(['src/js/index.js'])
    .pipe(browserify())
    .pipe(concat('index.js'))
    .pipe(gulp.dest("build/js"));
});

gulp.task('bundle-js-tests', function() {
  gulp.src(['src/js/**/*-test.js'])
    .pipe(browserify())
    .pipe(concat('test.js'))
    .pipe(gulp.dest("build/js"));
});

gulp.task('copy', function() {
  gulp.src(['src/assets/**/*'])
    .pipe(gulp.dest("build"));
});

gulp.task('stylus', function() {
  gulp.src(['src/css/**/*.styl'])
    .pipe(stylus())
    .pipe(concat('main.css'))
    .pipe(gulp.dest("build/css"));
});

gulp.task('serve', function() {
  var file = new nodeStatic.Server('./build');

  require('http').createServer(function (request, response) {
    request.addListener('end', function () {
      file.serve(request, response);
    }).resume();
  }).listen(1234);
});

gulp.task('default', function() {
  gulp.run('build', 'serve');

  gulp.watch(['src/js/**/*.js'], function() {
    gulp.run('bundle-js');
  });

  gulp.watch(['src/js/**/*.js'], function() {
    gulp.run('bundle-js-tests');
  });

  gulp.watch(['src/css/**/*.styl'], function() {
    gulp.run('stylus');
  });

  gulp.watch(['src/assets/**/*'], function() {
    gulp.run('copy');
  });
});

gulp.task('build', function() {
  gulp.run('bundle-js', 'bundle-js-tests', 'copy', 'stylus');
});
