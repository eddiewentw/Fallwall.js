import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import cssmin from 'gulp-cssmin';
import concat from 'gulp-concat';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import clean from 'gulp-clean';
import replace from 'gulp-html-replace';

gulp.task('babel-main', () => (
	gulp.src('./src/main.js')
		.pipe( babel() )
		.pipe( gulp.dest('./') )
));

gulp.task('js', ['babel-main'], () => (
	gulp.src([
		'./node_modules/jquery/dist/jquery.min.js',
		'./node_modules/fallwall/dist/fallwall.min.js',
		'./main.js',
	])
		.pipe( concat('bundle.js') )
		.pipe( uglify({
			preserveComments: 'license',
		}) )
		.pipe( gulp.dest('./') )
));

gulp.task('html', ['js'], () => (
	gulp.src('./src/index.html')
		.pipe( replace({ js: './bundle.js' }) )
		.pipe( htmlmin({
			collapseWhitespace: true,
			quoteCharacter: '\'',
		}) )
		.pipe( gulp.dest('./') )
));

gulp.task('css', ['html'], () => (
	gulp.src('./src/index.css')
		.pipe( cssmin() )
		.pipe( gulp.dest('./') )
));

gulp.task('clean', ['css'], () => (
	gulp.src('./main.js')
		.pipe(clean())
));

gulp.task('default', ['babel-main', 'js', 'html', 'css', 'clean']);
