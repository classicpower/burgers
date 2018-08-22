const
    gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    gcmq = require('gulp-group-css-media-queries'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    rename = require('gulp-rename');

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
    },
    img: {
        src: '/img/**/*',
        dest: '/img/'
    }
};
gulp.task('clean', function () {
    return del.sync(config.src + config.css.dest);
});

gulp.task('build', ['clean'], function () {
    gulp.src(config.src + config.css.src)
        .pipe(sass({
            includePaths: require('node-normalize-scss').includePaths
        }).on('error', sass.logError))
        .pipe(gcmq())
        .pipe(autoprefixer({
            browsers: ['last 15 version', '> 0.1%'],
            cascade: false
        }))
        .pipe(gulp.dest(config.src + config.css.dest))
        .pipe(sourcemaps.init())
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.src + config.css.dest))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task('image', function () {
    gulp.src(config.src + config.img.src)
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(gulp.dest(config.src + config.img.dest))
}
);

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