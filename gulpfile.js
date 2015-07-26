var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');
var plumber = require('gulp-plumber');

gulp.task('js', function () {
    return gulp.src('./src/*.js')
  		.pipe(plumber())
		.pipe(jshint('.jshintrc'))
    	//.pipe(sourcemaps.init())
        .pipe(babel({

        }))
        //.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./KeyboardPagination.safariextension/'));
});

gulp.task('build', [
	'js'
]);

gulp.task('watch', ['build'], function () {
	gulp.watch('./src/**/*.js', ['js']);
});


gulp.task('default', ['watch']);
