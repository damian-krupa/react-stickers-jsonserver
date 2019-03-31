var path = require("path");
var Html = require("html-webpack-plugin");

module.exports = {
    entry: ['whatwg-fetch' ,"./js/index.jsx"],
    output: {
        filename: "./js/out.js",
        path: path.resolve(__dirname)
    },
    mode: 'development',
    devtool: "source-map",
    watch: true,
    module: {
        rules: [
            {
                test: /\.jsx|js$/ ,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["es2015", "stage-2", "react"]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: () => [new require("autoprefixer")()]
                        }
                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.(jpg|jpeg|gif|png|csv)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        publicPath: "images",
                        outputPath: "images"
                    }
                }
            }
        ]
    }
};