const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const staticRelativePath = 'static';
const publicPath = '/';
const entry = path.join(__dirname, 'src', 'entry.jsx');

const analyze = !!process.argv.find(arg => arg.includes('analyze'));

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

const outputPath = path.join(__dirname, 'dist');
const file = filename => staticRelativePath.concat(`/${filename}`);
const devtool = isProduction ? 'hidden-source-maps' : 'source-maps';
const mode = isProduction ? 'production' : 'development';

const devPlugins = [];

const prodPlugins = [
  new OptimizeCSSAssetsPlugin({}),
  new MiniCssExtractPlugin({
    filename: file('[name].[contenthash].css'),
    chunkFilename: file('[id].[contenthash].css'),
  }),
].concat(
  analyze ? new BundleAnalyzerPlugin() : null,
).filter(Boolean);

const envPlugins = isProduction ? prodPlugins : devPlugins;

const plugins = [
  new CopyPlugin([{
    from: path.join(__dirname, 'public', 'favicon.png'),
    to: path.join(__dirname, 'dist', 'favicon.png'),
  }]),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'public', 'index.html'),
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(
      process.env.NODE_ENV || 'development',
    ),
  }),
  new FriendlyErrorsWebpackPlugin(),
  ...envPlugins,
];

const cssLoaders = ({ modules = true } = {}) => ([isProduction ? MiniCssExtractPlugin.loader : 'style-loader'])
  .concat({
    loader: 'css-loader',
    options: {
      modules,
      camelCase: true,
      importLoaders: true,
      sourceMap: true,
      localIdentName: '[name]__[local]___[hash:base64:5]',
    },
  }).concat([
    'resolve-url-loader',
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
      },
    },
  ]);

module.exports = {
  mode,
  devtool,
  plugins,
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
  },
  entry: {
    main: [
      ...(isDevelopment
        ? [
          'react-dev-utils/webpackHotDevClient',
          'webpack/hot/dev-server',
        ]
        : []),
      '@babel/polyfill',
      entry,
    ].filter(Boolean),
    vendor: [
      'axios',
      'prop-types',
      'react',
      'react-dom',
    ],
  },
  output: {
    publicPath,
    path: outputPath,
    filename: isProduction
      ? file('[name].[contenthash].js')
      : file('[name].js'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: staticRelativePath,
              emitFile: true,
              limit: 1024,
            },
          },
        ],
      },
      {
        test: /\.s?css$/,
        use: cssLoaders(),
      },
      {
        test: /\.(ttf|woff2?)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              emitFile: true,
              publicPath: `../${staticRelativePath}`,
              outputPath: staticRelativePath,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true,
        },
      },
    },
  },
};
