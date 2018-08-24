// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var sass        = require('gulp-sass');
var compass     = require('gulp-compass');
var minifycss   = require('gulp-clean-css');
var sourcemaps  = require('gulp-sourcemaps');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');


var paths = {
  assetsSass   : 'assets/sass', //  pasta resource são os arquivos a serem processados
  assetsJs     : 'assets/js',
  assetsFonts  : 'assets/fonts',
  assetsVendor : 'node_modules/',
  distCss      : 'dist/css', //  pasta assets são os arquivos gerados
  distJs       : 'dist/js',
  distFonts    : 'dist/fonts',
};

var fileNames = {
  css : {
    'main'    : 'main.css',
    'vendor'  : 'vendors.css',
  },

  js  : {
    'main'    : 'main.js',
    'vendor'  : 'vendors.js',
  }
};

var resourceFiles = {
  sass    : paths.assetsSass + '/**/*.scss',
  scripts : paths.assetsJs + '/**/*.js',
  vendors : {
        js : [
             paths.assetsVendor + 'jquery/dist/jquery.js',
             paths.assetsVendor + 'bootstrap/dist/js/bootstrap.js',
            //  paths.assetsVendor + 'materialize-css/dist/js/materialize.js',
            //  paths.assetsVendor + 'slick-carousel/slick/slick.js',
        ],
        css : [
            paths.assetsSass + 'vendors.scss'
        ],
        fonts: [
            paths.assetsFonts + '/*',
            //paths.assetsVendor + 'materialize-css/dist/fonts/roboto/*',
            //paths.assetsVendor + 'bootstrap-sass/assets/fonts/bootstrap/*',
        ]
    },
    watch : {
        js : paths.assetsJs + '/**/*.js',
        sass : paths.assetsSass + '/**/*.scss',
    }
}

gulp.task('sass', function () {
  return gulp.src(resourceFiles.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(minifycss())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest(paths.distCss));
});

gulp.task('sass:noMinify', function () {
  return gulp.src(resourceFiles.sass)
    .pipe(sass().on('error', sass.logError))
    // .pipe(minifycss())
    .pipe(gulp.dest(paths.distCss));
});

// Minify JS
gulp.task('scripts', function() {
    return gulp.src(resourceFiles.scripts)
        .pipe(concat(fileNames.js.main))
        .pipe(uglify())
        .pipe(gulp.dest(paths.distJs));
});

// Concatenate CSS e JS vendors
gulp.task('vendors:sass', function() {
    return gulp.src(resourceFiles.vendors.css)
        .pipe(minifycss())
        .pipe(gulp.dest(paths.distCss));
});

gulp.task('vendors:js', function() {
    return gulp.src(resourceFiles.vendors.js)
        .pipe(concat(fileNames.js.vendor))
        .pipe(uglify())
        .pipe(gulp.dest(paths.distJs));
});

gulp.task('fonts', function() {
    gulp.src(resourceFiles.vendors.fonts)
        .pipe(gulp.dest(paths.distFonts));
 });

gulp.task('sass:watch', function () {
  gulp.watch('resource/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'sass:noMinify']);
// gulp.task('default', [
//   'sass', 
//   'vendors:sass', 
//   'scripts', 
//   'vendors:js', 
//   'fonts'
//   ]
// );