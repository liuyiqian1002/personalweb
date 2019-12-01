const path = require('path');
const Extract = require('extract-text-webpack-plugin');
const HtmlPulgin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');
const excludeReg = /(node_modules|bower_components)/;
const isProduction = process.env.NODE_ENV === 'production'; // 是否是生产环境

module.exports = {
    entry: {
        app: ['babel-polyfill', path.join(__dirname, '../src/app')],
    },
    output: {
        path: path.join(__dirname, '../app/prod'),
        filename: '[name].[chunkHash:5].js',
        chunkFilename: '[name].[chunkHash:5].min.js',
    },
    optimization: {
        splitChunks: {
            chunks: 'async',
            name: 'vendors',
            maxInitialRequests: Infinity,
            minSize: 0,
            minChunks: 1,
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                },
                // commons: {
                //     name: "commons",
                //     chunks: 'initial',
                //     minChunks: 2, 
                //     maxInitialRequests: 5,
                //     minSize: 0
                // },
                // vendor: { // key 为entry中定义的 入口名称
                //     chunks: "initial", // 必须三选一： "initial" | "all" | "async"(默认就是async) 
                //     test: /node_modules/, // 正则规则验证，如果符合就提取 chunk
                //     name: "vendor", // 要缓存的 分隔出来的 chunk 名称 
                //     minSize: 30000,
                //     minChunks: 1,
                //     enforce: true,
                //     maxAsyncRequests: 5, // 最大异步请求数， 默认1
                //     maxInitialRequests: 3, // 最大初始化请求书，默认1
                //     reuseExistingChunk: true, // 可设置是否重用该chunk
                //     priority:10
                // }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: true,
                    mangle: true,
                    output: {
                        comments: false,
                    },
                },
                sourceMap: true,
            })
        ],
        runtimeChunk: true
    },
    module: {
        // noParse: /node_modules\/(react|react-dom|react-router-dom|jquey|moment|chart\.js)/,
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader?cacheDirectory',
                exclude: excludeReg,
            },
            {
                test: /\.(css|less)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[local]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ],
                                    flexbox: 'no-2009',
                                }),
                            ],
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            modifyVars: {},
                            javascriptEnabled: true,
                        }
                    }
                ]

            },
            {
                test: /\.(jpg|jpeg|png|gif|eot|svg|ttf|woff|mp3)/,
                loader: 'url-loader?limit=1000&name=images/[hash:8].[name].[ext]',
                exclude: excludeReg,
            },
            // {
            //     test: /\.less$/,
            //     loader: Extract.extract({
            //         fallback: 'style-loader',
            //         use: [
            //             {
            //                 loader: 'css-loader',
            //                 options: {
            //                     minimize: isProduction,
            //                 },
            //             },
            //             {
            //                 loader: 'postcss-loader',
            //             },
            //             {
            //                 loader: 'less-loader',
            //                 options: {
            //                     modifyVars: {},
            //                     javascriptEnabled: true,
            //                 },
            //             },
            //         ],
            //     }),
            // },
        ],
    },
    resolve: {
        alias: {
            component: path.join(__dirname, '../src/component'),
            page: path.join(__dirname, '../src/page'),
            less: path.join(__dirname, '../src/asset/less'),
            img: path.join(__dirname, '../src/asset/img'),
            utils: path.join(__dirname, '../src/utils'),
            router: path.join(__dirname, '../src/router'),
            api: path.join(__dirname, '../src/api'),
            actions: path.join(__dirname, '../src/actions'),
            reducer: path.join(__dirname, '../src/reducers'),
            store: path.join(__dirname, '../src/store'),
        },
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[\\\\/]locale$/, /^\.\/(zh-cn)$/),
        new HtmlPulgin({
            template: path.join(__dirname, '../template/index.html'),
            favicon: path.join(__dirname, '../src/asset/img/favicon.ico'),
            inject: true, // 自动注入
            minify: {
                removeComments: true, // 去注释
                collapseWhitespace: true, // 压缩空格
                removeAttributeQuotes: true, // 去除属性引用
            },
            chunksSortMode: 'dependency',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[chunkHash:5].css',
            allChunks: true,
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: ['vendor2', 'vendor1'],
        //     minChunks: 2,
        // }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isProduction, // 定义是否是生产环境
            },
        }),
    ],
};
