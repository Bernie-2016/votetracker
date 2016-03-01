import path from 'path';
import webpack from 'webpack';
import nib from 'nib';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;
const getPath = (...args) => path.join(__dirname, ...args);
// Remove any falsy values from the input args or array. Return an array.
const getArray = (...args) => [].concat(...args).filter(Boolean);

const config = {
  context: getPath('./'),
  entry: './src/client/app',
  output: {
    path: getPath('public'),
    filename: 'app.js',
    pathinfo: isDevelopment,
    publicPath: '/',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.styl'],
  },
  devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: {
      index: 'index.html',
    },
    proxy: {
      '/api/*': {
        target: 'http://localhost:8000/',
        secure: false,
        rewrite: req => {
          req.url = req.url.replace(/^\/api/, ''); // eslint-disable-line
        },
      },
    },
  },
  plugins: getArray([
    new webpack.optimize.OccurenceOrderPlugin(),
    isProduction && new webpack.optimize.DedupePlugin(),
    isProduction && new webpack.optimize.UglifyJsPlugin({ minimize: true, sourceMap: true }),
    isDevelopment && new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ]),
  stylus: {
    use: [nib()],
    import: ['~nib/lib/nib/index.styl'],
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: getArray(isDevelopment && 'eslint-loader'),
        include: getPath('src'),
      },
    ],
    loaders: [
      {
        test: /\.csv$/,
        loaders: ['dsv-loader'],
        include: getPath('fixtures'),
      },
      {
        test: /\.(svg|jpg|png)$/,
        loaders: ['url-loader?limit=25000'],
        include: getPath('src'),
      },
      {
        test: /\.(ttf|otf)$/,
        loaders: ['file-loader'],
        include: getPath('src'),
      },
      {
        test: /\.ico$/,
        loaders: ['file-loader?name=[name].[ext]'],
        include: getPath('src'),
      },
      {
        test: /\.json$/,
        loaders: ['json-loader'],
        include: getPath('fixtures'),
      },
      {
        test: /\.jsx?$/,
        loaders: getArray(isDevelopment && 'react-hot', 'babel-loader'),
        include: getPath('src'),
      },
      {
        test: /\.styl$/,
        loaders: ['style-loader', 'css-loader', 'stylus-loader'],
        include: getPath('src'),
      },
    ],
  },
};

if (isDevelopment) {
  config.output.publicPath = 'http://localhost:8080/';
}

export default config;
