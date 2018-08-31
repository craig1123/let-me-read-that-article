require('babel-core/register');
import gulp from 'gulp';
import uglify from 'gulp-uglify'
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';
import minifyCss from 'gulp-minify-css';
import htmlmin from 'gulp-htmlmin';
import babel from 'gulp-babel';
import plumber from 'gulp-plumber';
import livereload from 'gulp-livereload';

const cssPaths = {
  src: './src/*.css',
  dest: './public/css/'
};
const scriptsPaths = {
  src: './src/*.js',
  dest: './public/js/'
};
const htmlPaths = {
  src: './src/*.html',
  dest: './'
};

gulp.task('default', ['babel', 'css', 'html', 'watch']);

gulp.task('html', function(){
  return gulp.src(htmlPaths.src)
      .pipe(htmlmin({
        collapseWhitespace: true,
        ignoreCustomFragments: [ /<%[\s\S]*?%>/, /<\?[=|php]?[\s\S]*?\?>/ ]
      }))
      .pipe(gulp.dest(htmlPaths.dest));
});

gulp.task('css', function(done) {
  gulp.src(cssPaths.src)
    .pipe(minifyCss({ keepSpecialComments: 0 }))
    .pipe(gulp.dest(cssPaths.dest))
    .pipe(livereload({ start: true }))
    .on('end', done);
});

gulp.task("babel", function() {
  return gulp.src(scriptsPaths.src)
    .pipe(plumber())
    .pipe(babel({ presets: ['es2015']}))
    .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(gulp.dest(scriptsPaths.dest));
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(scriptsPaths.src, ['babel']);
  gulp.watch(cssPaths.src, ['css']);
  gulp.watch(htmlPaths.src, ['html']);
});
