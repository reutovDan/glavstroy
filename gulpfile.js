var gulp = require('gulp'),
 	concat = require('gulp-concat'),
 	rename = require("gulp-rename"),
 	minifyCSS = require('gulp-minify-css'),
 	notify = require("gulp-notify"),
 	autoprefixer = require('gulp-autoprefixer'),
 	sass = require('gulp-sass'),
 	spritesmith = require('gulp.spritesmith'),
 	imagemin = require('gulp-imagemin'),
  browserSync = require('browser-sync'),
  cache       = require('gulp-cache'),
  pngquant    = require('pngquant'),
  cssImageDimensions = require("gulp-css-image-dimensions"),
  uglify = require('gulp-uglify');

//Desktop
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './build/desktop'
        },
        notify: false
    });
});

gulp.task('img', function () {
 	gulp.src('./app/desktop/img/**/*.{jpg,jpeg,png,gif,svg}')
      .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
          interlaced: true,
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngquant()]
      })))
 		.pipe(gulp.dest('./build/desktop/img/'))
    .pipe(browserSync.reload({stream: true}));
    //.pipe(notify('Html скомпилирован!'));
});

gulp.task('fonts', function () {
 	gulp.src('./app/desktop/fonts/**/*.*')
 		.pipe(gulp.dest('./build/desktop/fonts/'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('clear', function () {
    return cache.clearAll();
})

gulp.task('html', function () {
 	gulp.src('./app/desktop/*.html')
 		.pipe(gulp.dest('./build/desktop/'))
    .pipe(browserSync.reload({stream: true}));
    //.pipe(notify('Html скомпилирован!'));
});

gulp.task('sass', function() {
  gulp.src([
		'./app/desktop/sass/*.sass',
		'!./app/desktop/sass/vars.sass',
		'!./app/desktop/sass/media.sass',
		'!./app/desktop/sass/fonts.sass',
  	])
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
  .pipe(cssImageDimensions('../img'))
	.pipe(minifyCSS())
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(gulp.dest('./build/desktop/css/'))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('csslibs', function() {
	gulp.src([
		'./libs/normalize-css/normalize.css',
    './libs/slick/slick.css',
    './libs/magnific-popup/dist/magnific-popup.css'
		])
		.pipe(concat('libs.css'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('./build/desktop/css/'));
});

gulp.task('scripts', function() {
	gulp.src([
    './libs/jquery/dist/jquery.min.js',
		'./libs/modernizr/modernizr.js',
    './libs/slick/slick.min.js',
    './libs/magnific-popup/dist/jquery.magnific-popup.min.js',
    './libs/jquery-maskedinput/jquery.maskedinput.min.js'
		])
    .pipe(uglify())
		.pipe(concat('libs.js'))

		.pipe(gulp.dest('./build/desktop/js/'));

		gulp.src('./app/desktop/js/**/*')
 		.pipe(gulp.dest('./build/desktop/js/'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch',function (){
	gulp.watch('./app/desktop/sass/*.sass',['sass']);
	gulp.watch('app/desktop/*.html', ['html']);
	gulp.watch('./app/desktop/js/*.js', ['scripts']);
	gulp.watch('app/desktop/img/**/*', ['img']);
	gulp.watch('app/desktop/fonts/**/*', ['fonts']);
})

gulp.task('default', ['browser-sync','sass','scripts','html','img','fonts','watch','csslibs']);


//Mobile tasks


gulp.task('m_browser-sync', function() {
    browserSync({
        server: {
            baseDir: './build/mobile'
        },
        notify: false
    });
});

gulp.task('m_img', function () {
 	gulp.src('./app/mobile/img/**/*.{jpg,jpeg,png,gif,svg}')
      .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
          interlaced: true,
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngquant()]
      })))
 		.pipe(gulp.dest('./build/mobile/img/'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('m_fonts', function () {
 	gulp.src('./app/mobile/fonts/**/*.*')
 		.pipe(gulp.dest('./build/mobile/fonts/'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('m_html', function () {
 	gulp.src('./app/mobile/*.html')
 		.pipe(gulp.dest('./build/mobile/'))
    .pipe(browserSync.reload({stream: true}));
    //.pipe(notify('Html скомпилирован!'));
});

gulp.task('m_sass', function() {
  gulp.src([
		'./app/mobile/sass/*.sass',
		'!./app/mobile/sass/vars.sass',
		'!./app/mobile/sass/media.sass',
		'!./app/mobile/sass/fonts.sass',
  	])
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
  .pipe(cssImageDimensions('../img'))
	.pipe(minifyCSS())
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(gulp.dest('./build/mobile/css/'))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('m_csslibs', function() {
	gulp.src([
		'./libs/normalize-css/normalize.css',
    './libs/owl2/owl.carousel.css'
		])
		.pipe(concat('libs.css'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('./build/mobile/css/'));
});

gulp.task('m_scripts', function() {
	gulp.src([
		'./libs/modernizr/modernizr.js',
    './libs/owl2/owl.carousel.js',
    './libs/jquery.countdown/dist/jquery.countdown.js'
		])
		.pipe(concat('libs.js'))
    .pipe(uglify())
		.pipe(gulp.dest('./build/mobile/js/'));

		gulp.src('./app/mobile/js/**/*')
 		.pipe(gulp.dest('./build/mobile/js/'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('m_watch',function (){
	gulp.watch('./app/mobile/sass/*.sass',['m_sass']);
	gulp.watch('app/mobile/*.html', ['m_html']);
	gulp.watch('./app/mobile/js/*.js', ['m_scripts']);
	gulp.watch('app/mobile/img/**/*', ['m_img']);
	gulp.watch('app/mobile/fonts/**/*', ['m_fonts']);
})

gulp.task('mobile', ['m_browser-sync','m_sass','m_scripts','m_html','m_img','m_fonts','m_watch','m_csslibs']);
