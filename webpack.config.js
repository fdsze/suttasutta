var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var extractSass = new ExtractTextPlugin({
    filename: './styles/[name].css',
});

module.exports = {
  entry: {
    'main': ['./assets/scripts/main.js'],
    'vendor': ['./assets/scripts/vendor.js']
	},
  output: {
    filename: './scripts/[name].js',
    publicPath: '',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        // test: /\.js$/,
        // loader: 'babel-loader',
        // exclude: /node_modules/,
      },
      {
        test: /images\/.+\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]?[hash]'
        }
      },
      {
        test: /fonts\/.+\.(svg|ttf|woff|woff2|eot)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]?[hash]'
        }
      },
      {
        test: /main\.s?css$/,
        use: extractSass.extract({
          use: [
          {
          //     loader: "style-loader"
          // }, {
            loader: "css-loader",
            options: {
                sourceMap: true        
            }
          }, {
          //     loader: "resolve-url-loader"
          // }, {
            loader: "sass-loader",
            options: {
                includePaths: [path.resolve(__dirname, 'node_modules')],
                sourceMap: true,
                // sourceMapContents: true,
                // sourceMapEmbed: true,
                // sourceMapRoot: 'wp-content/themes/unearthed/',
                outputStyle: 'expanded'
            }
          }],
          publicPath: '../'
        })
    	}
    ]
  },
  resolve: {
    alias: {
      // 'vue$': 'vue/dist/vue.esm.js'
    }
  },
  watch: true
};

module.exports.plugins = [
  extractSass
]

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // module.exports.plugins = (module.exports.plugins || []).concat([
  //   new webpack.DefinePlugin({
  //     'process.env': {
  //       NODE_ENV: '"production"'
  //     }
  //   }),
  // ])
} else {
  /* NODE_ENV === 'development' */
  // module.exports.plugins = (module.exports.plugins || []).concat([
  //   new webpack.DefinePlugin({
  //     'process.env': {
  //       NODE_ENV: '"development"'
  //     }
  //   })
  // ])
}