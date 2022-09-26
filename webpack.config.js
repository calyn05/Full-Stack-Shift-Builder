const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: "./assets/main.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist/assets"),
    filename: "[name].bundle.js",
    clean: true,
    assetModuleFilename: "./images/[hash][ext][query]",
  },
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "./"),
    },
    compress: true,
    port: 9000,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      template: "./pages/add-shift.html",
      filename: "./pages/add-shift.html",
      chunks: ["add-shift"],
    }),
    new HtmlWebpackPlugin({
      template: "./pages/admin.html",
      filename: "./pages/admin.html",
      chunks: ["admin"],
    }),
    new HtmlWebpackPlugin({
      template: "./pages/homepage.html",
      filename: "./pages/homepage.html",
      chunks: ["homepage"],
    }),
    new HtmlWebpackPlugin({
      template: "./pages/profile.html",
      filename: "./pages/profile.html",
      chunks: ["profile"],
    }),
    new HtmlWebpackPlugin({
      template: "./pages/register.html",
      filename: "./pages/register.html",
      chunks: ["register"],
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: "single",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpe?g|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
