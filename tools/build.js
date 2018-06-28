/**
 * Babel Starter Kit (https://www.kriasoft.com/babel-starter-kit)
 *
 * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 * API refer： http://www.rollupjs.com/javascript-api/
 */

'use strict';

const fs = require('fs');
const path = require('path');
const del = require('del');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const pkg = require('../package.json');
const uglify = require('rollup-plugin-uglify').uglify;
const minify = require('uglify-es').minify;
const buble = require('rollup-plugin-buble');
let promise = Promise.resolve();
var typescript = require('rollup-plugin-typescript2');
var commonjs = require('rollup-plugin-commonjs')
// var resolve = require('rollup-plugin-node-resolve')

// Clean up the output directory
// promise = promise.then(() => del(['dist/*']));
let defaults = {
    compilerOptions: {
        declaration: true
    }
};
let override = {
    compilerOptions: {
        declaration: false
    }
};

const componentDir = path.join(process.cwd(), 'src')
compileDir(componentDir)

//to build fast, add limit
const whiteList = [
    // 'list/..',
    'modal',
    'list',
    'picker',
    'button',
    'stepper',
    'toast',
    'calendar',
    'input-item',
    "locale"
]

function compileDir(dir) {
    // dir.forEach(file => {
    // __dirname：    获得当前执行文件所在目录的完整目录名
    // __filename：   获得当前执行文件的带有完整绝对路径的文件名
    // process.cwd()：获得当前执行node命令时候的文件夹目录名
    // ./：           文件所在目录
    // console.log(dir)
    fs.readdir(dir, (err, files) => {
        files && files.forEach(subfile => {
            if (!subfile.match("native") && subfile.endsWith(".tsx")
            && !subfile.match("android") && !subfile.match("ios")
        ) {
                // not build src/index.tsx
                if (!dir.endsWith("src"))
                    rollupFile(path.join(dir.substr(dir.indexOf("src") + 4), subfile).replace(".tsx", ""))

            } else if (!subfile.match(/\./) && !subfile.match("tests")
            && !subfile.match("demo") && !subfile.startsWith("_")
            && !subfile.match("style")
            && whiteList.indexOf(subfile) >= 0
        ) {
                compileDir(path.join(dir, subfile))
            }
        });
    })

    // })
}

function rollupFile(file) {
    console.log(file);
    // return;
    [
        'es',
        'cjs',
        // 'umd'
    ].forEach((format) => {
        promise = promise.then(() => rollup.rollup({
            input: `src/${file}.tsx`,
            external: [],
            plugins: [
                commonjs({
                    include: 'node_modules/**', // 包括
                    exclude: [], // 排除
                }),
                typescript({
                    tsconfigDefaults: defaults,
                    tsconfig: "tsconfig.json",
                    tsconfigOverride: override
                }),
                // resolve({ "jsnext": true, module: true, main: true }),
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
                            // "pragma": "h"
                        }],
                        "external-helpers" //注意这个参数不能加，加了之后模块exports有问题，坑坑坑
                    ]
                })
            ]
        }).then(bundle => bundle.write({
            file: `${format === 'cjs' ? `dist/${file}` : `es/${file}`}.js`,
            format,
            sourceMap: true,
            name: format === 'umd' ? pkg.name : undefined,
        })));
    });
}

// Copy package.json and LICENSE.txt
// promise = promise.then(() => {
//     delete pkg.private;
//     delete pkg.devDependencies;
//     delete pkg.scripts;
//     delete pkg.eslintConfig;
//     delete pkg.babel;
//     fs.writeFileSync('dist/package.json', JSON.stringify(pkg, null, '  '), 'utf-8');
//     fs.writeFileSync('dist/LICENSE.txt', fs.readFileSync('LICENSE.txt', 'utf-8'), 'utf-8');
// });

// promise.catch(err => console.error(err.stack)); // eslint-disable-line no-console
