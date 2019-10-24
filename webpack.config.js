const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/app.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'index.css'
    })
  ],

  module: {
    rules: [
      {
        test: /\.m?jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },

      {
        test: /\.css$/,
        //use: ['style-loader', 'css-loader']
        use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
      },

      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ]
      },

      //img config
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            //file larger than 8k will be a seperate file
            options: { limit: 8192 },
          },
        ],
      },

      /*font loader
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: ['file-loader']
      }
      */

      //alternative font loader
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            //file larger than 8k will be a seperate file
            options: { limit: 8192 },
          },
        ],
      }

    ]
  },

  devServer: {
    contentBase: './dist',
    port: 8086
  }
};