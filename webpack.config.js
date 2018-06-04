const path = require('path');
const { InfernoLoadablePlugin } = require('./webpack');
console.log(path.resolve(__dirname, './src/index.js'));
module.exports = {
  entry: {
    main: './example/client'
  },
  output: {
    path: path.join(__dirname, 'example', 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/dist/'
  },
  resolve: {
    alias: {
      'inferno-loadable': path.resolve(__dirname, './src/index.js'),
      'inferno-loadable/server': './src/server.js',
      'inferno-loadable/webpack': './src/webpack.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [['es2015', { modules: false }]],
            plugins: ['syntax-dynamic-import', 'transform-class-properties', 'transform-object-assign', require.resolve('./babel'), ['inferno', { imports: true }], 'syntax-jsx']
          }
        }
      }
    ]
  },
  devtool: 'inline-source-map',
  resolve: {
    alias: {
      'react-loadable': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    new InfernoLoadablePlugin({
      filename: path.resolve(__dirname, 'example', 'dist', 'inferno-loadable.json')
    })
  ]
};
