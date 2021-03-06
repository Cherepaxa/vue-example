const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = merge(baseConfig, {
  entry: {
    app: './src/entry-client.js'
  },
  optimization: {
    splitChunks: {
      chunks: 'initial'
    }
  },
  resolve: {
    alias: Object.assign({}, baseConfig.resolve.alias, {
      'create-api': './create-api-client.js'
    })
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      'process.browser': true,
      'process.server': false
    }),
    new VueSSRClientPlugin()
  ]
})
