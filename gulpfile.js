var gulp = require('gulp'),
/*
    PROCESSING
    ========================
    (PostCSS - Gulp-PostCSS)
    Pipe CSS through several processors, but parse CSS only once.
    https://www.npmjs.com/package/gulp-postcss
    http://postcss.org/
*/
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  sourcemaps = require('gulp-sourcemaps'),
  cssnano = require('cssnano'),
/*
    POST-CSS PLUGINS
    ========================
    Lost Grid:
    https://www.npmjs.com/package/lost
*/
  lost = require('lost'),
/*
    Add prefixes to CSS properties. (postCSS)
    https://www.npmjs.com/package/autoprefixer
*/
  autoprefixer = require('autoprefixer'),
/*
  Combine media queries.
  There may be a possibility you do NOT want this plugin actived.
  Read Known Issues : https://docs.omniref.com/js/npm/css-mqpacker/3.1.0#label-KNOWN+ISSUES
*/
  mediaQueryPacker = require('css-mqpacker'),

/*
  Responsive Fonts! Set responsive min/max font-sizes within viewport ranges.
  https://github.com/ccurtin/postcss-responsive-font
*/
  responsiveFont = require('postcss-responsive-font'),
/*
    UTILITIES
    ========================
    BrowserSync (live reloading/style injections)
    https://www.npmjs.com/package/browser-sync
*/
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
/*
    Catch and Throw errors w/o halting watch tasks.
    https://www.npmjs.com/package/gulp-plumber
    https://www.npmjs.com/package/gulp-util
    https://www.npmjs.com/package/gulp-rename
    https://www.npmjs.com/package/beepbeep

*/
  plumber = require('gulp-plumber'),
  gutil = require('gulp-util'),
  rename = require("gulp-rename"),
  beep = require('beepbeep'); // aurally notify user of error with beeps. This is so we can KNOW there is an error w/o monitoring the console.
/*
    VARIABLES
    ========================
*/
var path = {
  source: {
    sassFiles: ['components/sass/**/*.{sass,scss,css}'],
    jsFiles: ['components/js/**.*']
  },
  app: {
    allFiles: 'app/**/*.*',
    cssDir: 'app/css/',
    cssFiles: 'app/css/**.*',
    jsDir: 'app/js/',
    jsFiles: 'app/js/**.*',
    appViews: ['app/**/*.{html,php,py}'], // include/exclude extensions you find fit.
    appImages: ['app/**/*.{jpeg,jpg,png,gif}']  // include/exclude extensions you find fit.
  },
};

var onErrorStyles = function (err) {
  beep([200, 200, 200]);
  gutil.log(gutil.colors.magenta(err))
  this.emit('end');
};

/*
    GULP TASKS
    ========================
*/

/*
  Injecting styles, reloading views. Dictate relative path or proxy server to use.
*/
gulp.task('browser-sync', ['process-styles'], function () {
  browserSync.init({
    server: {
      baseDir: "./app"
    }
    //// alternative to "server:{baseDir}" above. Useful if working out of a VM.
    // proxy: yoursite.local,

    //// Will make app available outside of network on "staging-url.localtunnel.me" (if url is available)
    //// more info @ https://localtunnel.github.io/www/
    // tunnel: true,
    // tunnel: "staging-url"
  });
  gulp.watch(path.source.sassFiles, ['process-styles']);
  gulp.watch([path.app.appViews]).on('change', reload);
  gulp.watch([path.app.appImages]).on('change', reload);
});

/*
  Always runs before the `browser-sync` task.
  A Mix of SASS(libsass) and PostCSS modules.
*/
gulp.task('process-styles', function () {
    // if using (s)FTP, servers erase the file completely before writing again.
    // That empty file can get processed, resulting in an empty CSS file 
    setTimeout(function(){
      return gulp.src(path.source.sassFiles)
        .pipe(sourcemaps.init())
        .pipe(plumber({
          errorHandler: onErrorStyles
        }))
        .pipe(sass({
          errLogToConsole: true
        }))
        .pipe(postcss([
          lost(),
          autoprefixer({
            browsers: ['last 5 versions']
          }),
          cssnano(),
          responsiveFont(),
          mediaQueryPacker()
        ]))
        .pipe(rename("style.css"))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.app.cssDir))
        .pipe(browserSync.stream({
          match: '**/*.css',
          stream: true
        }));
     }, 300)
});

gulp.task('default', ['browser-sync']);
