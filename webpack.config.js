// webpack.config.js
module.exports = {
  mode: "development",
  entry: "/js/main.js",
  output: {
    filename: "index.js",
    publicPath: "dist",
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
    ],
  },
};
