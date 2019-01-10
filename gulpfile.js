var gulp = require("gulp");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("gulp-autoprefixer");
var cleanCSS = require("gulp-clean-css");
//处理uncss文件夹css到css文件夹
gulp.task("css", function() {
    return gulp
        .src("uncss/*")
        .pipe(less())
        .pipe(
            autoprefixer({
                browsers: ["last 40 versions", "Android >= 4.0", "Ios >= 6.0"]
            })
        )
        .pipe(postcss([require("precss")]))
        .pipe(cleanCSS())
        .pipe(gulp.dest("css/"));
});
gulp.task("watch", function() {
    gulp.watch("./uncss/*", ["css"]);
});
