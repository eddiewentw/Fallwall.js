import gulp from 'gulp';
import babel from 'gulp-babel';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';

gulp.task('minify', () => (
	gulp.src('./src/fallwall.js')
		.pipe( babel() )
		.pipe( uglify({
			preserveComments: 'license',
		}) )
		.pipe( rename('fallwall.min.js') )
		.pipe( gulp.dest('./dist') )
));

gulp.task('default', [ 'minify' ]);
