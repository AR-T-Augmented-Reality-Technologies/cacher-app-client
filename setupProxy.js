const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://176.58.114.213:4000',
      changeOrigin: true,
    })
  );
};
