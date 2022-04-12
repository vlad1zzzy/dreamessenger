const path = require('path');
const fs = require('fs');
const { SourceMapDevToolPlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const appDirectory = fs.realpathSync(process.cwd());
const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath);
const host = process.env.HOST || 'localhost';

process.env.NODE_ENV = 'development';

module.exports = _ => ({
    plugins: [
        new SourceMapDevToolPlugin({
            filename: "[file].map"
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public/index.html"),
            filename: "./index.html",
            inject: true,
            favicon: "./public/favicon.ico"
        }),
        new SpriteLoaderPlugin()
    ],
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].[contenthash:8].js",
        publicPath: '',
    },
    devServer: {
        static: resolveAppPath('public'),
        compress: true,
        open: true,
        port: 9000,
        host,
        historyApiFallback: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
            {
                test: /\.(jsx|js|tsx|ts)$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        cacheCompression: false,
                        presets: [
                            ['@babel/preset-env', {
                                "targets": "defaults"
                            }],
                            '@babel/preset-react'
                        ]
                    }
                }]
            },
            {
                test: /\.(tsx|ts)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: true,
                            symbolId: 'icon-[name]',
                            publicPath: 'assets/icons/',
                            spriteFilename: '_sprite.svg'
                        }
                    }
                ],
            },
            {
                test: /\.(png|jp(e*)g|gif)$/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/img/[hash]-[name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.ttf$/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 100000,
                            name: 'assets/fonts/[hash]-[name].ttf',
                        },
                    },
                ],
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    }
});