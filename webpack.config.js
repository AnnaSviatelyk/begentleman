const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let outDirectory = path.resolve(__dirname, 'dist');
let outputFilename = '[name].js';

module.exports = {
    mode: 'production',
    entry: './src/main.js',
    devtool: false,
    output: {
        filename: outputFilename,
        path: outDirectory,
        // publicPath: '/'
    },
    devServer: {
        contentBase: outDirectory
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'product-page.html',
            template: './src/product-page.html'
        }),

        new HtmlWebpackPlugin({
            filename: 'shop-page.html',
            template: './src/shop-page.html'
        }),

        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new webpack.SourceMapDevToolPlugin({})
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|svg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images',
                            publicPath: 'images',
                            esModule: false
                        }
                    },
                ]
            },
            // {
            //     test: /\.html$/,
            //     use: [
            //         {
            //           loader: 'file-loader',
            //           options: {
            //               name: '[name].[ext]'

            //           }
            //         },
            //       ],
            //       exclude: path.resolve(__dirname, 'src/index.html')
            // }
        ]
    }
};