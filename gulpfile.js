const gulp = require("gulp"), //gulp
  ts = require("gulp-typescript"), //TypeScript
  rename = require("gulp-rename"),
  uglify = require("gulp-uglify-es").default;

const source = "./components/dispatcher/",
  dist = "./",
  path = {
    src: {
      allts: "./components/**/*.ts",
      ts: source + "**/*.ts"
    },
    dev: {
      js: dist + "js",
      main: dist + "js/main.js"
    }
  };

//Сборка ts
gulp.task("ts", function() {
  return gulp
    .src(path.src.ts)
    .pipe(
      ts({
        noImplicitAny: true,
        target: "es6",
        module: "amd",
        outFile: "main.js"
      })
    )
    .pipe(gulp.dest(path.dev.js));
});

gulp.task("minify-js", function() {
  return gulp
    .src(path.dev.main)
    .pipe(rename("main.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest(path.dev.js));
});

gulp.task("watch", ["ts"], function() {
  gulp.watch([path.src.allts], ["ts"]);
});
