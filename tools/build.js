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
const del = require('del');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const pkg = require('../package.json');
const uglify = require('rollup-plugin-uglify').uglify;
const minify = require('uglify-es').minify;
const buble = require('rollup-plugin-buble');
let promise = Promise.resolve();
var typescript = require('rollup-plugin-typescript2');
var commonjs = require( 'rollup-plugin-commonjs')
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
let components = [
    'list/..',
    'list',
    'picker',
    'button',
    'stepper',
    'toast',
    'calendar',
    'input-item'
]
// Compile source code into a distributable format with Babel
components.forEach(file => {

    ['es', 'cjs', 'umd'].forEach((format) => {
        promise = promise.then(() => rollup.rollup({
            input: `src/${file}/index.tsx`,
            external: [],
            plugins: [
                commonjs({
                    include: 'node_modules/**', // 包括
                    exclude: [],  // 排除
                }),
                typescript({
                    tsconfigDefaults: defaults,
                    tsconfig: "tsconfig.json",
                    tsconfigOverride: override
                }),
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
                        "external-helpers" //注意这个参数不能加，加了之后模块exports有问题，坑坑坑
                    ]
                })
            ]
        }).then(bundle => bundle.write({
            file: `dist/${file}/${format === 'cjs' ? 'index' : `index.${format}`}.js`,
            format,
            sourceMap: true,
            name: format === 'umd' ? pkg.name : undefined,
        })));
    });
})

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
