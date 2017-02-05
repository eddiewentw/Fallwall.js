import gulp from 'gulp';
import babel from 'gulp-babel';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import sourcemap from 'gulp-sourcemaps';

gulp.task('minify', () => (
	gulp.src('./src/fallwall.js')
		.pipe( sourcemap.init() )
		.pipe( babel() )
		.pipe( uglify({
			preserveComments: 'license',
		}) )
		.pipe( rename('fallwall.min.js') )
		.pipe( sourcemap.write('.') )
		.pipe( gulp.dest('./dist') )
));

gulp.task('default', [ 'minify' ]);
