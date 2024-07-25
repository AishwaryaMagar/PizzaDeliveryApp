// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',  // Requests to /api will be forwarded to the Twitter API
    createProxyMiddleware({
      target: 'https://api.twitter.com',
      changeOrigin: true,
    })
  );
};