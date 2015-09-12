'use strict';

var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    eslint = require('gulp-eslint'),
    cfenv = require('cfenv'),
    browserSync = require('browser-sync').create();

gulp.task('lint', function () {
  gulp.src('Gulpfile.js')
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('nodemon', function (cb) {
  nodemon({
    'script': 'app.js',
    'watch': [
      'app.js'
    ],
    'ext': 'js',
    'env': {
      'NODE_ENV': 'development'
    }
  })
  .once('start', function () {
    cb();
  })
  .on('start', function () {
    setTimeout(function () {
      browserSync.reload();
    }, 500);
  })
  .on('restart', function () {

  });
});

gulp.task('browser-sync', ['nodemon'], function () {
  var appEnv = cfenv.getAppEnv();

  browserSync.init({
    'proxy': appEnv.url,
  });
});

gulp.task('default', ['browser-sync', 'lint']);