/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");
const nodeExternals = require("webpack-node-externals"); // Import the plugin

module.exports = {
  mode: "production",
  entry: "./src/app.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  target: "node", // Specify the target as Node.js
  externals: [nodeExternals()], // Use the webpack-node-externals plugin
};
