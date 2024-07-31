var gulp = require('gulp')
var fs = require('fs')
var scss = require('sass')

var clean = require('gulp-clean')
var sass = require('gulp-sass')(scss)
var webpack = require('webpack-stream')
var concat = require('gulp-concat')
var minifyCSS = require('gulp-clean-css')
var minifyHTML = require('gulp-htmlmin')

gulp.task('clean', function() {
    if (fs.existsSync('./dist')) {
        return gulp.src('./dist', { read: false })
        .pipe(clean({ force: true }))
    }

    return new Promise(res => res())
})

gulp.task('copy', function() {
    return gulp.src('./assets/**')
    .pipe(gulp.dest('./dist/assets/'))
})

gulp.task('html', function() {
    return gulp.src('./src/html/*.html')
    .pipe(minifyHTML({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('styles', function() {
    return gulp.src('./src/scss/*.scss')
    .pipe(sass())
    .pipe(concat('styles.css'))
    .pipe(minifyCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('scripts', function() {
    return webpack(require('./webpack.config.js'))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('default', gulp.series(['clean', 'copy', 'html', 'styles', 'scripts']))