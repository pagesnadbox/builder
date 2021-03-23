module.exports = {
  devServer: {
    disableHostCheck: true,
  },
  lintOnSave: false,
  transpileDependencies: [
    'vuetify',
  ],
  publicPath: process.env.NODE_ENV === 'production'
  ? '/landingpagebuilder/'
  : '/',
}
