const path = require('path')
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "[name].[contenthash].js",
        publicPath: "/simple/",
        clean: true
    },
    module: {
        rules: [
            {
                use: "babel-loader",
                test: /.(js|jsx)$/,
                exclude: /node_modules/
            },
            {
                type: "asset",
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx", ".json"]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            favicon: "./src/favicon.ico"
        })
    ]
}
