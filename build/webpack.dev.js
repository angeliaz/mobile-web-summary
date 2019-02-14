const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base');

console.log(11111, process.env.NODE_ENV);

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devServer: {
    host: 'test.qq.com',
    port: 80,
    contentBase: path.join(__dirname, 'dist'),
    open: false,
    hot: false,
    disableHostCheck: true,
    proxy: {},
    before () {}
  },
  plugins: [
    // 启用 HMR
    new webpack.HotModuleReplacementPlugin({})
  ]
});
