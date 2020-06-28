module.exports = {
  devServer: {
    // 设置默认端口
    port: 8081,
    host: "localhost",
    // 设置代理
    proxy: {
      "/api": {
        // websocket协议代理
        ws: false,
        // 目标 API 地址
        target: "http://localhost:8080",
        // 将主机标头的原点更改为目标URL
        changeOrigin: true
      }
    }
  },
  publicPath: "./",
  productionSourceMap: false
};
