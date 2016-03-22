'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cleanCSS = require('gulp-clean-css'),
    //imagemin = require('gulp-imagemin'),
    //pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    ngrok = require('ngrok'),
    mainBowerFiles = require('main-bower-files'),
    webstandards = require('gulp-webstandards');


// Подготавливаем пути
var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        cssmin: 'build/css/min',
        img: 'build/images/',
        fonts: 'build/fonts/',
        package: 'build/**/*'
    },
    src: { //Пути откуда брать исходники
        html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/js/main.js',//В стилях и скриптах нам понадобятся только main файлы
        style: 'src/scss/style.scss',
        img: 'src/images/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'src/fonts/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/scss/**/*.scss',
        img: 'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    bower: {
        root: './bower_components/**/*.css'
    },
    clean: './build'
};

// Настройки сервера
var config = {
    server: {
        baseDir: "./build"
    },
    port: 9000
};

// Собираем html
gulp.task('html:build', function () {
    gulp.src(path.src.html) // Выберем файлы по нужному пути
        .pipe(rigger()) // Прогоним через rigger 
        .pipe(gulp.dest(path.build.html)) // Выплюнем их в папку build
        .pipe(reload({stream: true})); // И перезагрузим наш сервер для обновлений
});

// Собираем images
gulp.task('image:build', function () {
    gulp.src(path.src.img) // Выберем файлы по нужному пути 
        .pipe(gulp.dest(path.build.img)) // Выплюнем их в папку build
        .pipe(reload({stream: true})); // И перезагрузим наш сервер для обновлений
});

// Собираем javascript
gulp.task('js:build', function () {
    gulp.src(path.src.js) // Найдем наш main файл
        .pipe(rigger()) // Прогоним через rigger
        .pipe(sourcemaps.init()) // Инициализируем sourcemap
        //.pipe(uglify()) // Сожмем наш js
        .pipe(sourcemaps.write()) // Пропишем карты
        .pipe(gulp.dest(path.build.js)) // Выплюнем готовый файл в build
        .pipe(reload({stream: true})); // И перезагрузим сервер
});

// Собираем scss
gulp.task('style:build', function () {
    gulp.src(path.src.style) //Выберем наш main.scss
        //.pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(sass({
            sourceComments : true
        })) //Скомпилируем
        .pipe(prefixer()) //Добавим вендорные префиксы
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(cleanCSS()) //Сожмем
        .pipe(gulp.dest(path.build.cssmin))
        .pipe(reload({stream: true}));
});

// Собираем все вместе
gulp.task('build', [
    'html:build',
    'js:build',
    'image:build',
    'style:build',
]);

// Отслеживаем изменения
gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});

// Запуск сервера
gulp.task('webserver', function () {
    browserSync(config,
        function (err, url) {
            ngrok.connect({
                proto: 'http', 
                addr: 9000,
                auth: 'testUser:test_pswd_16', 
                authtoken: '5fdwQ3W7CTN1BArki37Lc_6PXtkUpqMMVyEWaFMHLmD'}, 
                function(err, url) {
                    console.log('=================== \n' + url);
                    if (err !== null) {
                        console.log(log(err));
                    }
                }
            )
        }
    );
});

// Очистка сборки
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('ngrok', function () {
    ngrok.connect({
        proto: 'http', 
        addr: 9000,
        auth: 'user:pwd', 
        authtoken: '5fdwQ3W7CTN1BArki37Lc_6PXtkUpqMMVyEWaFMHLmD'}, function(err, url) {
        console.log(url);
        if (err !== null) {
          console.log(log(err));
        }
    });
});

// Проверям соответствие стандартам
gulp.task('build:check', function(){
    return gulp.src(path.build.package)
    .pipe(webstandards());
});

// Запускаем все
gulp.task('default', ['build', 'webserver', 'watch']);


function log(error) {
    console.log([
        '',
        "----------ERROR MESSAGE START----------".bold.red.underline,
        ("[" + error.name + " in " + error.plugin + "]").red.bold.inverse,
        error.message,
        "----------ERROR MESSAGE END----------".bold.red.underline,
        ''
    ].join('\n'));
    this.end();
}