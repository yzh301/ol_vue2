const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
module.exports = {
  publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : "./", // 部署应用包时的基本 URL，如果是生产环境则使用环境变量中的 VUE_APP_PUBLIC_PATH
  outputDir: process.env.outputDir || "dist", // 生产环境构建文件的目录
  assetsDir: "", // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: false, // 关闭eslint
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境不生成source map
  parallel: require("os").cpus().length > 1, // 多线程打包
  pwa: {}, // PWA插件配置
};
