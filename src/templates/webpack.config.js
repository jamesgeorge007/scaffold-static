/* tslint:disable */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './js/main.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase: './dist',
        open: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Template',
            template: 'index.html',
        }),
    ],
    module: {
        rules: [
            {
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                ],
                test: /\.css$/,
            },
        ],
    },
};
