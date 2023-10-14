// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/news', {
      target: 'https://developer-lostark.game.onstove.com',
      secure: false,
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware('/gamecontents', {
      target: 'https://developer-lostark.game.onstove.com',
      secure: false,
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware('/characters', {
      target: 'https://developer-lostark.game.onstove.com',
      secure: false,
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware('/armories', {
      target: 'https://developer-lostark.game.onstove.com',
      secure: false,
      changeOrigin: true,
    })
  );
};
