const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: {
        background: './src/background.js',
        'content-script': './src/content-script.js'
    },
    output: {
        publicPath: "",
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {ascii_only: true},
                },
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {targets: "defaults"}]
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        })
    ]
};
