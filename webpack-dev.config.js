var path = require('path');
var autoprefixer = require('autoprefixer');
var precss = require('precss');

module.exports = {
  context: __dirname + '/app',
  entry: {
    javascript: getEntrySources(['./scripts/app.js']),
    html: './index.html',
  },
  output: {
    publicPath: 'http://localhost:8080/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{ loader: 'file-loader?name=[name].[ext]' }],
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer()],
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [{ loader: 'img-loader' }, { loader: 'url-loader?limit=8192' }],
      },
    ],
  },
};

function getEntrySources(sources) {
  if (process.env.NODE_ENV !== 'production') {
    sources.push('webpack-dev-server/client?http://localhost:8080');
    sources.push('webpack/hot/only-dev-server');
  }

  return sources;
}
