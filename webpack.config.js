const webpack = require("webpack");

module.exports = {
  // other configurations
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    // other plugins
  ],
};
