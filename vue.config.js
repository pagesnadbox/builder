const Dotenv = require('dotenv-webpack');

module.exports = {
  configureWebpack: {
    plugins: [
      new Dotenv()
    ],
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false
    }
  },
  devServer: {
    disableHostCheck: true,
  },
  lintOnSave: false,
  transpileDependencies: [
    'vuetify',
  ],
  publicPath: process.env.NODE_ENV === 'staging'
    ? '/pagesandbox/'
    : '/',
  chainWebpack: (config) => {
    // Disable prefetch and preload of async modules for 'app' page
    // config.plugins.store.delete('prefetch-app');
    // config.plugins.store.delete('preload-app');
    // Use this syntax if not using multipage setup
    config.optimization.delete("splitChunks");
    config.plugins.store.delete('prefetch');
    config.plugins.store.delete('preload');
    config.plugins.delete('prefetch');
    config.plugins.delete('preload');
    // config.plugins.store.delete('prefetch');
    // config.plugins.store.delete('preload');
  },
  filenameHashing: false,
  css: {
    extract: true
  },
}
