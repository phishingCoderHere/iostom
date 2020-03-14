const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

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
                    'css-loader',
                    'style-loader'
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
            {
                test: /\.art$/,
                loader: "art-template-loader",
                options: {
                    // art-template options (if necessary)
                    // @see https://github.com/aui/art-template
                }
            }
        ]
    },
    devtool: 'inlin-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'iostom'
        }),
        new CleanWebpackPlugin(),

    ]
};