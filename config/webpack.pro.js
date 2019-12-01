const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 删除文件
const Visualizer = require('webpack-visualizer-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const base = require('./webpack.base.js');
const ReplacerPlugin = require('../plugins/webpack-replacer/index');
const TimerPlugin = require('../plugins/webpack-timer/index');
const isAnalyze = process.env.NODE_ENV === 'analyze';
const package = require('../package.json');
const halls = package.halls;

const outputFilenames = halls.map((item) => {
    return `app/${item.name}-admin`;
});

// outputFilenames.unshift('app/admin');

const plugins = [
    // new webpack.optimize.UglifyJsPlugin({
    //     output: {
    //         comments: false, // remove all comments
    //     },
    //     compress: {
    //         warnings: false,
    //         drop_console: true,
    //         drop_debugger: true,
    //     },
    // }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    // 删除打包生成的文件插件
    new CleanWebpackPlugin([...outputFilenames, 'app/prod'], {
        // build文件夹名
        root: path.resolve(__dirname, '../'),
        verbose: true,
        dry: false,
    }),

    // 复制包 并 替换标识
    new ReplacerPlugin({
        output: path.join(__dirname, '../app'), // 输出目录
        filename: halls, // 格式  [{name:'name',value:'1'}]
        indentifier: /HALL_IDENTIFIER_TEST/g, // 全局匹配需要替换的字符串 标识
        name: (name) => {
            // 输出文件夹命名
            return `${name}-admin`;
        },
    }),
    new CompressionPlugin({
        filename: '[path].gz[query]', //目标资源名称。[file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
        algorithm: 'gzip',//算法
        test: new RegExp(
            '\\.(js|css)$'    //压缩 js 与 css
        ),
        threshold: 10240,//只处理比这个值大的资源。按字节计算
        minRatio: 0.8//只有压缩率比这个值小的资源才会被处理
    }),
];
if (isAnalyze) {
    plugins.push(new Visualizer());
}

base.devtool = 'false';
base.mode = 'production';
base.plugins.push(...plugins);
module.exports = base;
