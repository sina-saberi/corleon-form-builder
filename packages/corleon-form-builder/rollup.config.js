const pkg = require("./package.json");
const typescript = require("@rollup/plugin-typescript");
const dts = require("rollup-plugin-dts");
const commonjs = require("@rollup/plugin-commonjs");
const nodeResolve = require('@rollup/plugin-node-resolve');
const assets = require("rollup-plugin-static-files");
const json = require("@rollup/plugin-json");
const scss = require("rollup-plugin-scss");
const postcss = require("rollup-plugin-postcss");
const pcss = require("rollup-plugin-postcss");
const url = require('postcss-url');

const packageConfig = {
    input: "src/index.ts",
    output: [
        {
            file: pkg.main, // out directory for commonjs bundle
            format: "cjs",
            sourcemap: "inline"
        },
        {
            file: pkg.module, // out directory for esm bundle
            format: "esm",
            sourcemap: "inline"
        }
    ],
    plugins: [
        nodeResolve({ jsnext: true, preferBuiltins: true, browser: true }),
        commonjs({
            include: 'node_modules/**'
        }),
        postcss({
            plugins: [
                url({
                    url: "inline",
                    maxSize: Infinity,
                    fallback: "copy",
                }),
            ],
        }),
        json(), //resolve jsone files
        typescript({ tsconfig: "./tsconfig.json" }), //resolve type script files using ts config
    ],
    external: Object.keys(pkg.peerDependencies || {}, "fs"), //exclude peer dependency packages
};

const scssConfig = {
    input: "src/styles/index.tsx",
    output: {
        file: "scssChunkFile.js", // this bundle config is only usefull for scss files and assets the main reson to bundle in this way is to exclude assets from the package bundle
        format: "cjs",
    },
    plugins: [scss({ fileName: 'assets/index.css' })]
}

const typingConfig = {
    input: "out/esm/types/index.d.ts",
    output: [{
        file: "out/index.d.ts", // this config is usefull for project targets that uses type script it just a type defination
        format: "esm"
    }],
    plugins: [dts.default(), assets({ include: ['./assets'], })], // using this plugin to copy assets to bundle directory
    external: [/\.css$/u] //avoid error
}

module.exports = [packageConfig, scssConfig, typingConfig]