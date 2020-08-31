const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


let outDirectory = path.resolve(__dirname, 'dist');
let outputFilename = '[name].js';


module.exports = {
    mode: 'production',
    entry: {
        main: './src/main.js',
        shopPage: './src/shopPage.js',
        productPage: './src/productPage.js'
    },
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
            template: './src/index.html',
            inject: false,
        }),
        new HtmlWebpackPlugin({
            filename: 'product-page.html',
            template: './src/product-page.html',
            inject: false,
        }),

        new HtmlWebpackPlugin({
            filename: 'shop-page.html',
            template: './src/shop-page.html',
            inject: false,
        }),

        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),

        // new webpack.SourceMapDevToolPlugin({}),
        new BundleAnalyzerPlugin(),
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
                },]
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']   //  <=  Order is very important
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