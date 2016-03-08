module.exports = {
  context: __dirname + '/app',
  entry: {
    javascript: getEntrySources(['./scripts/app.js']),
    html: './index.html'
  },
  output: {
    publicPath: 'http://localhost:8080/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loaders: ['img', 'url?limit=8192']
      }
    ]
  }
}

function getEntrySources(sources) {
  if (process.env.NODE_ENV !== 'production') {
    sources.push('webpack-dev-server/client?http://localhost:8080');
    sources.push('webpack/hot/only-dev-server');
  }

  return sources;
}
