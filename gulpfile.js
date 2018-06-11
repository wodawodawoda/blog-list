'use strict';

var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var log = require('gulplog');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('default', ['html', 'sass', 'js'], function() {
	browserSync.init({
		server: './dist'
	})
	gulp.watch('src/**/*.js', ['js']).on('change', browserSync.reload);
	gulp.watch('src/**/*.sass', ['sass']).on('change', browserSync.reload);
	gulp.watch('src/index.html', ['html']).on('change', browserSync.reload);
});

gulp.task('html', function() {
	gulp.src('src/index.html')
		.pipe(gulp.dest('./dist'));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
	gulp.src('src/**/*.sass')
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.stream());
});

// add custom browserify options here
var customOpts = {
	entries: ['./src/app.js'],
	debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts).transform('babelify', {'presets': ['env']}));

// add transformations here
// i.e. b.transform(coffeeify);

gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', log.info); // output build logs to terminal

function bundle() {
	return b.bundle()
	// log errors if they happen
		.on('error', log.error.bind(log, 'Browserify Error'))
		.pipe(source('bundle.js'))
		// optional, remove if you don't need to buffer file contents
		.pipe(buffer())
		// optional, remove if you dont want sourcemaps
		.pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
		// Add transformation tasks to the pipeline here.
		.pipe(sourcemaps.write('./')) // writes .map file
		.pipe(gulp.dest('./dist'));
}
