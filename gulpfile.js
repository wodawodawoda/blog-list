var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var babel = require('gulp-babel');

gulp.task('default', ['html', 'scripts'], function() {
	browserSync.init({
		server: './dist'
	})
	gulp.watch('src/**/*.js', ['scripts']).on('change', browserSync.reload);
	gulp.watch('src/index.html', ['html']).on('change', browserSync.reload);
});

gulp.task('html', function() {
	gulp.src('src/index.html')
		.pipe(gulp.dest('./dist'));
});

gulp.task('scripts', function() {
	gulp.src('src/**/*.js')
		.pipe(concat('app.js'))
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(gulp.dest('./dist'));
});
