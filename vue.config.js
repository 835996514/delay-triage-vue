const { defineConfig } = require('@vue/cli-service')

// const name = defaultSettings.title || 'vue Element Admin' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 8084 // dev port

module.exports = defineConfig({
  transpileDependencies: true,
  pages:{
    index:{
      entry: 'src/main.js',   //page入口
      template: 'public/index.html',   //模板来源
      filename: 'index.html',  //在dist/index.html的输出
    }
  },
  lintOnSave: process.env.NODE_ENV != 'production',
  publicPath: '/tempRegister',
  outputDir: 'dist',
  assetsDir: 'static',
  devServer: {
    port: port,
    open: {
      app: {
        name: 'chrome'
      }
    },
  }
})
