var gulp = require('gulp');
var htmlclean = require('gulp-htmlclean');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var imagemin = require('gulp-imagemin');
var connect = require('gulp-connect');

var folder = {
    src: 'src/',
    dist: 'dist/'
}
var devMode = process.env.NODE_ENV !== 'production';

gulp.task('html', function(){
    var html = gulp.src(folder.src + 'html/*')
                    .pipe(connect.reload())
    if(!devMode){
        html.pipe(htmlclean())
    }
    html.pipe(gulp.dest(folder.dist + 'html/'))
})

gulp.task('js', function(){
    var js = gulp.src(folder.src + 'js/*')
                .pipe(connect.reload())
    if(!devMode){
        js.pipe(uglify())
    }
    js.pipe(gulp.dest(folder.dist + 'js/'))
})

gulp.task('css', function(){
    var options = [
        autoprefixer()
    ]
    var css = gulp.src(folder.src + 'css/*')
        .pipe(connect.reload())
        .pipe(less())
    if(!devMode){
        css.push(cssnano())
    }
    css.pipe(postcss(options))
        .pipe(gulp.dest(folder.dist + 'css/'))
})

gulp.task('images', function(){
    gulp.src(folder.src + 'images/*')
        .pipe(imagemin())
        .pipe(gulp.dest(folder.dist + 'images/'))
})

gulp.task('watch',function(){
    gulp.watch(folder.src + 'html/*', ['html']);
    gulp.watch(folder.src + 'images/*', ['images']);
    gulp.watch(folder.src + 'js/*', ['js']);
    gulp.watch(folder.src + 'css/*', ['css']);
})

gulp.task('server',function(){
    connect.server({
        livereload : true
    });
})

gulp.task('default', ['html', 'js', 'css', 'images', 'watch', 'server'])