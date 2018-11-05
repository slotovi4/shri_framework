const gulp = require("gulp"), //gulp
  ts = require("gulp-typescript"); //TypeScript

const source = "./components/dispatcher/",
  dist = "./",
  path = {
    src: {
      ts: source + "**/*.ts"
    },
    dev: {
      js: dist + "js"
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

gulp.task("watch", ["ts"], function() {
  gulp.watch([path.src.ts], ["ts"]);
});
