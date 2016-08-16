import gulp from "gulp";
import riot from "gulp-riot";
import webpack from "gulp-webpack";

var webpackConfig = require("./webpack.config.js"),
    webpackEntries = Object.keys(webpackConfig.entry).map((key) => {
        return webpackConfig.entry[key];
    }),
    riotEntries = "./riot-widgets/*.tag";


gulp.task("build", [
    "copy-libs",
    "webpack",
    "riot"
]);


gulp.task("webpack", () => {
    return gulp.src("")
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(webpackConfig.output.path));
});


gulp.task("dev", ["webpack", "riot"], () => {
    var reactFiles = [
        "container-app/**/*.js",
        "react-widgets/**/*.js"
    ];
    gulp.watch(reactFiles, ["webpack"]);
    gulp.watch(riotEntries, ["riot"]);
});


gulp.task("riot", () => {
    gulp.src(riotEntries)
        .pipe(riot())
        .pipe(gulp.dest("./public/widgets/riot/"));
});


gulp.task("copy-libs", () => {
    return gulp
        .src([
            "./node_modules/riot/riot.min.js",
            "./node_modules/systemjs/dist/system.js"
        ])
        .pipe(gulp.dest("./public/"))
});
