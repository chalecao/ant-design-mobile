import buble from 'rollup-plugin-buble';
// 通过这个插件可以方便的使用 javascript 的新特性，配置上稍微麻烦一些，如下安装相应插件（包括配置babel 需要的插件）
import babel from 'rollup-plugin-babel';
// 帮助 Rollup 查找外部模块，然后安装，相关配置
import resolve from 'rollup-plugin-node-resolve';
// import json from 'rollup-plugin-json';
// rollup-plugin-node-resolve 插件可以解决 ES6模块的查找导入，但是npm中的大多数包都是以CommonJS模块的形式出现的，所以需要使用这个插件将CommonJS模块转换为 ES2015 供 Rollup 处理
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace';
import typescript from 'rollup-plugin-typescript2';
import alias from 'rollup-plugin-alias'
import path from "path"

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
export default [{
    input: 'src/button/index.tsx',
    output: {
        file: 'src/button/index.js',
        format: 'es'
    },
    // banner: 'define("zebra-pages/chaoshi-104576/module/main/index", function (require, exports, module) {',
    // footer: "})",
    external: [],
    plugins: [
        typescript({
            tsconfigDefaults: defaults,
            tsconfig: "tsconfig.json",
            tsconfigOverride: override
        }),
        // replace({
        //     "process.env.NODE_ENV": "\'production\'"
        // }),
        // alias({
        //     'react': path.resolve('./node_modules/preact-compat/dist/preact-compat.es.js'),
        //     'react-dom': path.resolve('./node_modules/preact-compat/dist/preact-compat.es.js'),
        //     'indexof': path.resolve('./node_modules/component-indexof/index.js'),
        //     './locale/zh_CN': path.resolve('./node_modules/antd-mobile/es/picker/locale/zh_CN.js'),
        // }),
        // resolve({
        //     "jsnext": true,
        //     module: true,
        //     main: true
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
                "external-helpers" //注意这个参数不能加，加了之后模块exports有问题，坑坑坑
            ]
        }),

        // commonjs({
        //     include: 'node_modules/**', // 包括
        //     exclude: [], // 排除
        // }),
        // buble()
    ]
}]
