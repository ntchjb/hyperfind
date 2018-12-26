const path = require('path');

module.exports = {
  target: 'node',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: 'hyperfind.js',
    libraryTarget: 'commonjs',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
