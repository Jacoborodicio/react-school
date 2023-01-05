const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const common = require("./webpack.common");
const {merge} = require("webpack-merge");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const developConfig = {
    mode: "development",
    output: {
        publicPath: "/",
    },
    devServer: {
        port: 3000,
        static: [{
            directory: path.join(__dirname, '../dist'),
            publicPath: '/',
        }],
        historyApiFallback: true,
        compress: true,
        hot: true
        // open: "chrome" // To open the browser directly

    },
    target: "web",
    plugins: [
        new ReactRefreshWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                from: './src/manifest.json',
                to: 'manifest.json'
            },
                {
                    from: './src/assets/icons'
                }]
        })
    ],
    devtool: "eval-source-map",
    module: {
        rules: [
            {
                use: ["style-loader", "css-loader", "sass-loader"],
                test: /.(css|sass|scss)$/,
            },
        ]
    }
}
module.exports = merge(common, developConfig);
