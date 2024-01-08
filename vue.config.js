module.exports = {
  publicPath: './',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api':{
        target:'http://localhost:8018/',
        changeOrigin:true,
        pathRewrite:{
          '/api':''
        }
      }
    }
  }
}
