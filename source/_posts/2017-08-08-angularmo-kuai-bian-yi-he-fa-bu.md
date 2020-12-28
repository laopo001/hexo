---
title: Angular模块编译和发布
slug: angularmo-kuai-bian-yi-he-fa-bu
date: 2017-08-08T11:22:03.000Z
date_updated: 2017-08-10T05:32:32.000Z
---

## gulp-inline-ng2-template

使用这个模块把，`templateUrl`和`styleUrls`的相对路径转`template`和`styles`。安装gulp4.0 `npm install gulpjs/gulp.git#4.0 --save-dev`

    var inlineTemplatesTask = lazypipe()
      .pipe(inlineTemplates, {
        base: '/src',
        useRelativePaths: true,
        templateProcessor: function (filepath, ext, file, cb) {
          var minifiedFile = htmlMinifier.minify(file, {
            collapseWhitespace: true,
            caseSensitive: true,
            removeComments: true,
            removeRedundantAttributes: true
          });
          cb(null, minifiedFile);
        },
      });
    
    gulp.task('ngc:templates', function () {
      return gulp.src(PATHS.src, { base: 'src' })
        .pipe(inlineTemplatesTask())
        .pipe(gulp.dest(PATHS.tsInline));
    });
    
    gulp.task('ngc', gulp.series( 'ngc:templates', function __ngc(cb) {
      exec(`${executable} -p ./tsconfig-aot.json`, (e) => {
        if (e) console.log(e);
        del('./temp/aot');
        cb();
      }).stdout.on('data', function (data) { console.log(data); });
    }));
    //gulpfile.js
    

## tsconfig-aot.json

    {
      "compilerOptions": {
        "target": "es5",
        "lib": [
          "es2015",
          "dom"
        ],
        "module": "commonjs",
        "moduleResolution": "node",
        "declaration": true,
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
        "outDir": "lib",
        "rootDir": "./temp/inline",
        "sourceMap": true,
        "inlineSources": true,
        "noImplicitAny": false
      },
      "typeRoots": [
        // add path to @types
        "node_modules/@types"
      ],
      "files": [
        "temp/inline/index.ts"
      ],
      "exclude": [
        "node_modules"
      ],
      "angularCompilerOptions": {
        "strictMetadataEmit": true,
        "genDir": "temp/aot"
      }
    }
    

## AoT 编译

首先安装`@angular/compiler-cli``@angular/compiler`

运行`ngc -p tsconfig-aot.json`是AoT 编译，要求严格的，不要使用tsc编译。遇到的一些坑。除了第二条不提示以外，其他按照提示改就行。

1. template标签必须用ng-template代替。可能我用的@angular/compiler版本较高。
2. AoT 不支持"export default class",这个有点坑。不管是component还是module,不要用default导出。
3. interface和type等必须export出来。

## npm publish

按照上次npm包发布就行。
