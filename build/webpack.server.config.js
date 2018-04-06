const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.base.config.js')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(baseConfig, {
  entry: './src/entry-server.js',
  target: 'node',
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2'
  },
  externals: nodeExternals({
    whitelist: /\.css$/
  }),
  resolve: {
    alias: Object.assign({}, baseConfig.resolve.alias, {
      'create-api': './create-api-server.js'
    })
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.browser': false,
      'process.server': true
    }),
    new VueSSRServerPlugin()
  ]
})
