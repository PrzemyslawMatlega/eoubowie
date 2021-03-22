// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/styles/app.scss";`
      }
    }
  }
}
