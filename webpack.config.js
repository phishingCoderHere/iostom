const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    target: "node",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // MiniCssExtractPlugin.loader,
                    'css-loader',
                    // 'style-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|PNG|JPG)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            // {
            //     test: /\.file.js$/,
            //     use: [
            //         'file-loader'
            //     ]
            // },
            // {
            //     test: /\.js$/,
            //     exclude: /\.file.js$/,
            //     loader: 'babel-loader',
            // },
            // {
            //     test: /\.art$/,
            //     loader: "art-template-loader",
            //     options: {
            //         // art-template options (if necessary)
            //         // @see https://github.com/aui/art-template
            //     }
            // },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: {
                            removeComments: true,
                            collapseWhitespace: true,
                        },
                        // Disables attributes processing
                        attributes: {
                            list: [
                                {
                                    tag: 'img',
                                    attribute: 'src',
                                    type: 'src',
                                },
                                // {
                                //     tag: 'img',
                                //     attribute: 'srcset',
                                //     type: 'srcset',
                                // },
                                // {
                                //     tag: 'img',
                                //     attribute: 'data-src',
                                //     type: 'src',
                                // },
                                // {
                                //     tag: 'img',
                                //     attribute: 'data-srcset',
                                //     type: 'srcset',
                                // },
                                // {
                                //     tag: 'script',
                                //     attribute: 'src',
                                //     type: 'src'
                                // },
                                // {
                                //     tag: 'link',
                                //     attribute: 'href',
                                //     type: 'src',
                                // filter: (tag, attribute, attributes) => {
                                //     if (!/stylesheet/i.test(attributes.rel)) {
                                //         return false;
                                //     }

                                //     if (
                                //         attributes.type &&
                                //         attributes.type.trim().toLowerCase() !== 'text/css'
                                //     ) {
                                //         return false;
                                //     }

                                //     return true;
                                // },
                                // },
                                // More attributes
                            ],
                        }
                    },
                }],
            }
        ]
    },
    devtool: 'inlin-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'iostom',
            template: './src/template.html'
        }),
        new CleanWebpackPlugin(),
        // new MiniCssExtractPlugin({
        //     // Options similar to the same options in webpackOptions.output
        //     // both options are optional
        //     filename: "[name].css",
        //     chunkFilename: "[id].css"
        // })
    ]
};