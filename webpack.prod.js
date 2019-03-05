const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WebpackBundleSizeAnalyzerPlugin = require('webpack-bundle-size-analyzer')
  .WebpackBundleSizeAnalyzerPlugin;

const projectTitle = 'dump-sms'; //set this on start

module.exports = {
  mode: 'production',
  entry: [resolve(__dirname, 'src') + '/index.jsx'],
  output: {
    filename: 'app.bundle.js',
    path: resolve(__dirname, 'build')
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\.jsx*/gi,
        exclude: /\/node_modules/
      })
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new CleanWebpackPlugin(resolve(__dirname, 'build')),
    new HtmlWebpackPlugin({
      template: 'template.ejs',
      appMountId: 'react-app-root',
      title: projectTitle,
      filename: resolve(__dirname, 'build', 'index.html')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new WebpackBundleSizeAnalyzerPlugin(
      resolve(__dirname, 'build', 'plain-report.txt')
    ),
    new MinifyPlugin(
      {},
      {
        exclude: ['node_modules'],
        sourceMap: null
      }
    )
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          emitWarning: true,
          configFile: './.eslintrc.json'
        }
      },
      {
        test: /\.(png|gif|jp(e*)g|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8000,
            name: 'images/[hash]-[name].[ext]'
          }
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      }
    ]
  }
};
