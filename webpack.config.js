const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        background: './src/background.js',
        'content-script': './src/content-script.js'
    },
    output: {
        publicPath: "",
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    resolve: {
        fallback: {
            fs: false,
            assert: require.resolve("assert/"),
            url: require.resolve("url/"),
            crypto: require.resolve("crypto-browserify"),
            stream: require.resolve("stream-browserify"),
            path: require.resolve("path-browserify")
        }
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
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {targets: "defaults"}], "@babel/preset-react"
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'manifest.json' }
            ]
        }),
        new HtmlWebpackPlugin({  // Also generate a test.html
            filename: 'index.html',
            template: 'src/ui/index.html'
        }),
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ]
};
