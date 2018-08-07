const
    gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass');
// cleanCSS = require('gulp-clean-css'),
// gcmq = require('gulp-group-css-media-queries'),
// sourcemaps = require('gulp-sourcemaps'),
// rename = require('gulp-rename');

const config = {
    src: './src',
    css: {
        watch: '/precss/**/*.scss',
        src: '/precss/main.scss',
        dest: '/css'
    },
    html: {
        src: '/index.html'
    },
    js: {
        src: '/js/*.js'
    }
};

gulp.task('build', function () {
    gulp.src(config.src + config.css.src)
        // .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: require('node-normalize-scss').includePaths
        }).on('error', sass.logError))
        // .pipe(gcmq())
        .pipe(autoprefixer({
            browsers: ['last 15 version', '> 0.1%'],
            cascade: false
        }))
        // .pipe(cleanCSS({
        //     level: 2
        // }))
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.src + config.css.dest))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('watch', ['browserSync'], function () {
    gulp.watch(config.src + config.css.watch, ['build']);
    gulp.watch(config.src + config.html.src, browserSync.reload);
    gulp.watch(config.src + config.js.src, browserSync.reload);
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: config.src
        }
    });
});