'use strict';
var gulp = require('gulp');
var ts = require('gulp-typescript');
// var babel = require('gulp-babel');
let rollup = require('gulp-rollup');
let tsProject = ts.createProject("tsconfig.json", {
    //typescript: require("typescript")
});

var typescript = require('rollup-plugin-typescript2');
var babel = require('rollup-plugin-babel');
var rollupEach = require('gulp-rollup-each');
var resolve = require( 'rollup-plugin-node-resolve');
var commonjs = require( 'rollup-plugin-commonjs')
let override = {
    compilerOptions: {
        declaration: false
    }
};

gulp.task('bundle', function () {
    return gulp.src([
        'src/button/index.tsx',
        '!src/**/*.native.tsx' // exclude modules
      ])
      .pipe(rollupEach({
            output: {
                format: 'es'
            },
            external: ['react', 'classnames', 'prop-types', 'babel-runtime'],
            plugins: [
                typescript({
                    tsconfig: "tsconfig.json",
                    tsconfigOverride: override
                }),
                resolve({ module: true, jsnext: true,  main: true }),
                // commonjs({
                //     include: 'node_modules/**', // 包括
                //     exclude: [],  // 排除
                // }),
                babel({
                    "presets": [
                        [
                            "env",
                            {
                                "modules": false,
                                loose: true,
                                exclude: ['transform-es2015-typeof-symbol'],
                                targets: {
                                    browsers: ['last 2 versions', 'IE >= 9']
                                }
                            }
                        ], "stage-3"
                    ],
                    "plugins": [
                        ["transform-react-jsx", {
                            "pragma": "h"
                        }],
                        "add-module-exports",
                        "external-helpers"
                    ]
                })
            ]
        }))
        .pipe(gulp.dest('./dist'));

});

gulp.task('default', function () {
    return gulp.src('src/calendar/*.tsx')
        .pipe(tsProject())
        .pipe(babel({
            presets: [
                [
                    "env",
                    "react",
                    {
                        "modules": false,
                        loose: true,
                        exclude: ['transform-es2015-typeof-symbol', 'node_modules/'],
                        targets: {
                            browsers: ["Android >= 4.4", "ios > 7"]
                        },
                        "useBuiltIns": true
                    }
                ]
            ],
            plugins: ["transform-react-jsx"]
        }))
        .pipe(gulp.dest('build/'));
});

gulp.task('less', function () {
    return gulp.src('src/**/*.less')
    .pipe(gulp.dest('dist/'));
})
