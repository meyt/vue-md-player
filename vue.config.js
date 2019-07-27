module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-md-player/'
    : '/',
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  }
}
