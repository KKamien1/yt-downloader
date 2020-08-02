const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./Client/src/index.js",
  mode: "development",
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      options: { presets: ["@babel/env"] }
    }, {
      test: /\.css$/,
      use: ["style-loader", "css-loader"]
    }, {
      test: /\.html$/,
      loader: 'html-loader?attrs[]=video:src'
    },
    {
      test: /\.mp4$/,
      loader: 'url?limit=10000&mimetype=video/mp4'
    }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "Client/dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "Client/public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist",
    hotOnly: true,
    open: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};