const path = require('path');
const webpack = require('webpack');
const uglify = require('uglifyjs-webpack-plugin');
const htmlWebpackPlugin =  require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const config = {
  mode: 'development',
  entry: {
  	index: path.resolve(__dirname, 'src/scripts/index.js')
  },
  output: {
  	path: path.resolve(__dirname, ''),
  	filename: 'release/js/[name]-[hash].js',
    /*publicPath: 'http://liuxue.lfclass.com/'*/
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
        query:{
          "presets": ["latest"]
        }
      },
      { 
        test: /\.tpl$/,
        loader: 'ejs-loader'
      },
      {
        test:/\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader?importLoaders=1'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [autoprefixer('last 5 versions')]
              }
            }
          }
        ]
      },
      {
        test:/\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader?importLoaders=1'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [autoprefixer('last 5 versions')]
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/i,
        loaders: [
          'url-loader?limit=10000&name=dist/images/[name]-[hash:16].[ext]',
          'image-webpack-loader'
        ]
      }
    ]
  },
  plugins:[
    new uglify(),
    new htmlWebpackPlugin({
    	minify: {
    		removeComments: true,
    		collapseWhitespace: true
    	},
    	hash: true,
    	filename: 'index.html',
    	template: path.resolve(__dirname, 'src/tpls/index.html'),
    	title: '蓝轨迹留学',
    	chunksSortMode: 'manual',
    	chunks: ['common', 'index']
    })
  ]
}

module.exports = config;