'use strict';

var gulp = require('gulp'),
    deploy = require('gulp-deploy-git');


// Подготавливаем пути
var path = {
    build: {
        deploy: './**/*',
    },
    git: {
        repo: 'https://meshock@github.com/meshock/mj.git',
    },
};

// Загружаем все в репозиторий
gulp.task('deploy', function() {
  return gulp.src(path.build.deploy, { read: false })
    .pipe(deploy({
      repository: path.git.repo,
      branches:   ['gh-pages']
    }));
});


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