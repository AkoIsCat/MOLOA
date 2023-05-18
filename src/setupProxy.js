// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/news', {
      target: 'https://developer-lostark.game.onstove.com',
      secure: false,
      changeOrigin: true,
      cookieDomainRewrite: {
        '*': '', // 쿠키 도메인 설정
      },
      onProxyRes: function (proxyRes, req, res) {
        // 쿠키에 SameSite=None 설정
        proxyRes.headers['set-cookie'] = proxyRes.headers['set-cookie']
          .map((cookie) => cookie.replace(/;\s*SameSite=Strict/, ''))
          .map((cookie) => cookie.replace(/;\s*SameSite=Lax/, ''))
          .map((cookie) => cookie + '; SameSite=None; Secure');
      },
    })
  );

  app.use(
    createProxyMiddleware('/gamecontents', {
      target: 'https://developer-lostark.game.onstove.com',
      secure: false,
      changeOrigin: true,
      cookieDomainRewrite: {
        '*': '', // 쿠키 도메인 설정
      },
      onProxyRes: function (proxyRes, req, res) {
        // 쿠키에 SameSite=None 설정
        proxyRes.headers['set-cookie'] = proxyRes.headers['set-cookie']
          .map((cookie) => cookie.replace(/;\s*SameSite=Strict/, ''))
          .map((cookie) => cookie.replace(/;\s*SameSite=Lax/, ''))
          .map((cookie) => cookie + '; SameSite=None; Secure');
      },
    })
  );

  app.use(
    createProxyMiddleware('/characters', {
      target: 'https://developer-lostark.game.onstove.com',
      secure: false,
      changeOrigin: true,
      cookieDomainRewrite: {
        '*': '', // 쿠키 도메인 설정
      },
      onProxyRes: function (proxyRes, req, res) {
        // 쿠키에 SameSite=None 설정
        proxyRes.headers['set-cookie'] = proxyRes.headers['set-cookie']
          .map((cookie) => cookie.replace(/;\s*SameSite=Strict/, ''))
          .map((cookie) => cookie.replace(/;\s*SameSite=Lax/, ''))
          .map((cookie) => cookie + '; SameSite=None; Secure');
      },
    })
  );

  app.use(
    createProxyMiddleware('/armories', {
      target: 'https://developer-lostark.game.onstove.com',
      secure: false,
      changeOrigin: true,
      cookieDomainRewrite: {
        '*': '', // 쿠키 도메인 설정
      },
      onProxyRes: function (proxyRes, req, res) {
        // 쿠키에 SameSite=None 설정
        proxyRes.headers['set-cookie'] = proxyRes.headers['set-cookie']
          .map((cookie) => cookie.replace(/;\s*SameSite=Strict/, ''))
          .map((cookie) => cookie.replace(/;\s*SameSite=Lax/, ''))
          .map((cookie) => cookie + '; SameSite=None; Secure');
      },
    })
  );

  // app.use(
  //   createProxyMiddleware('/api', {
  //     target: 'http://localhost:3000/',
  //     changeOrigin: true,
  //   })
  // );

  // const cors = require('cors');
  // app.use(cors());

  app.use(
    createProxyMiddleware('/Discord', {
      target: 'https://lostark-bf0ba-default-rtdb.firebaseio.com',
      changeOrigin: true,
      pathRewrite: {
        '^/PopularCharacter': '',
      },
    })
  );
};
