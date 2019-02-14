const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
//  webpack v4之前是用xtract-text-webpack-plugin
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const terserPlugin = require('terser-webpack-plugin');
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const bundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const merge = require('webpack-merge');

const glob = require('glob');


console.log(22222, process.env.NODE_ENV);

function resolve(dir) {
  return path.resolve(__dirname,  dir);
}

function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else if (m.name) {
    return m.name;
  } else {
    return false;
  }
}

console.log('~~~', process.env.NODE_ENV)

// 动态加载多个入口文件
const entries = {};
glob.sync('src/js/*.js').forEach(path => {
  let name = path.match(/\/([\w-_]+)(?=.js)/)[1];
  entries[name] = `./${path}`;
});
// entries.vendor = ['jquery']

const config = {
  mode: "development",
  // 入口
  /* entry: {
    index: './src/js/index.js',
    detail: './src/js/detail.js'
  }, */
  entry: entries,
  // 出口
  output: {
    filename: 'js/[name].[hash:8].js',
    // 所有输出文件的目标路径
    // filename: '[name].js',
    // webpack 如何输出结果的相关选项
    path: resolve('../dist'),
    chunkFilename: 'js/[name].[hash:8].js'
    // 处理静态文件路径，可用于配置cdn等资源文件
    // publicPath: '//stdl.qq.com/stdl/skin/10/assets/',
    // 「入口分块(entry chunk)」的文件名模板,知道如何寻找图片等资源
    // publicPath: 'dist/'
  },
  // loader 模块和资源的转换器
  module: {
    rules: [
      // 处理我们在html 中引入图片的问题
      {
        test:/\.(htm|html)$/,
        use: ['html-withimg-loader']
      }, {
        test: /\.(css|less)$/, // css资源加载
        use: [{
          loader: miniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          }, {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true
            }
          }, 
          {loader: 'postcss-loader'}, {loader: 'less-loader'}
        ], // load从右向左加载
        // include: [resolve('src')],
      },
      // Babel可以直接在webpack.config.js中进行配置, 但是考虑到babel具有非常多的配置选项
      {
        test: /\.js$/,
        loader: ['babel-loader'],
        include: [resolve('src'), resolve('test')], // 匹配特定条件。
        // exclude: [resolve('build')] // 排除特定条件
      }, {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 4096,
          outputPath: 'images/',
          // publicPath: resolve('dist/images/'),
          name: '[name].[hash:8].[ext]'
        }
      }
    ]
  },
  // 模块和资源的转换工作由 loader 来处理，除此之外的其他任何工作都可以交由 plugin 来完成。
  plugins: [
    // new bundleAnalyzerPlugin(),
    // 清除文件
    new cleanWebpackPlugin(
      [resolve('../dist')], {
        root: path.resolve(__dirname, '../'),
        // 排除
        exclude:  ['test.html'],
        // Write logs to console.
        verbose: true,
        // Use boolean "true" to test/emulate delete. (will not remove files).
        dry: false,
        // If true, remove files on recompile. 
        watch: false,
        // 在将文件发送到输出目录之前执行清理
        beforeEmit: false
    }),
    new miniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "css/[name].[hash:8].css",
      // chunkFilename: "[id].css"
    }),
    /* new htmlWebpackPlugin({
      title: 'testooo',
      filename: 'index.html',
      template: './src/index.html',
      chunks:['index', 'detail'],
      hash: true,
      minify: {
          removeAttributeQuotes:true,
          removeComments: true,
          collapseWhitespace: true,
          removeScriptTypeAttributes:true,
          removeStyleLinkTypeAttributes:true
      }
    }),
    new htmlWebpackPlugin({
      title: 'detail',
      filename: 'detail.html',
      template: './src/detail.html',
      chunks:['detail'],
      minify: {
          removeAttributeQuotes:true,
          removeComments: true,
          collapseWhitespace: true,
          removeScriptTypeAttributes:true,
          removeStyleLinkTypeAttributes:true
      }
    }) */
  ],
  /* resolve: {
    // 自动补全后缀列表
    extension: ['.js', '.vue', '.json'],
    // 别名
    alias: {
      '@': resolve('src'),
      components: path.resolve(__dirname, './src/components'),
    }
  }, */
  optimization: {
    minimizer: [
      new terserPlugin({ // 压缩js
        cache:  true,
        parallel:  true
      }),
      new optimizeCSSAssetsPlugin({ // 压缩css
        cssProcessorOptions: {
          safe: true
        }
      })
    ],
    usedExports: true,
    sideEffects: true
    // 配置css合并打包的方式
    /* splitChunks: {
      cacheGroups: {
        fooStyles: {
          name: 'index',
          test: (m,c,entry = 'index') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',  // merge all the css chunk to one file
          enforce: true
        },
        barStyles: {
          name: 'detail',
          test: (m,c,entry = 'detail') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true
        }
      }
    } */
  }
}

// 示例1: 多个webpack文件[主动配置]
const htmlConfig = [{
  file: 'index.html',
  chunks: ['index']
}, {
  file: 'detail.html',
  chunks: ['index', 'detail']
}];
/* htmlConfig.forEach(item => {
  config.plugins.push(new htmlWebpackPlugin({
    filename: item.file,
    template: './src/' + item.file,
    // chunk属性是让你选择对应的js模块
    chunks: item.chunks,
    hash: false,
    minify: {
        removeAttributeQuotes:true,
        removeComments: true,
        collapseWhitespace: true,
        removeScriptTypeAttributes:true,
        removeStyleLinkTypeAttributes:true
    }
  }));
}); */

// 示例2: 多个webpack文件[动态读取]
const html = glob.sync('src/*.html').map(path => {
  let name = path.match(/([\w-_]+)(?=.html)/)[1];
  console.log('~~~~~', path, name)
  config.plugins.push(new htmlWebpackPlugin({
    title: 'testooo',
    template: path,
    filename: `${name}.html`,
    // chunk属性是让你选择对应的js模块
    chunks: [name, 'vendor'],
    // 压缩的选项
    minify: {
      removeAttributeQuotes:true,
      removeComments: true,
      collapseWhitespace: true,
      removeScriptTypeAttributes:true,
      removeStyleLinkTypeAttributes:true
  }
  }));
});

module.exports = config;
