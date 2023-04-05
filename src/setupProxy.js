// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/news', {
      target: 'https://developer-lostark.game.onstove.com',
      secure: false,
      changeOrigin: true,
      onProxyRes: function (proxyRes, req, res) {
        const cookies = proxyRes.headers['set-cookie'];
        if (cookies) {
          const newCookie = cookies.map(function (cookie) {
            return cookie.replace(/SameSite=Lax/gi, '');
          });
          proxyRes.headers['set-cookie'] = newCookie;
        }
      },
    })
  );

  app.use(
    createProxyMiddleware('/gamecontents', {
      target: 'https://developer-lostark.game.onstove.com',
      secure: false,
      changeOrigin: true,
      onProxyRes: function (proxyRes, req, res) {
        const cookies = proxyRes.headers['set-cookie'];
        if (cookies) {
          const newCookie = cookies.map(function (cookie) {
            return cookie.replace(/SameSite=Lax/gi, '');
          });
          proxyRes.headers['set-cookie'] = newCookie;
        }
      },
    })
  );

  app.use(
    createProxyMiddleware('/characters', {
      target: 'https://developer-lostark.game.onstove.com',
      secure: false,
      changeOrigin: true,
      onProxyRes: function (proxyRes, req, res) {
        const cookies = proxyRes.headers['set-cookie'];
        if (cookies) {
          const newCookie = cookies.map(function (cookie) {
            return cookie.replace(/SameSite=Lax/gi, '');
          });
          proxyRes.headers['set-cookie'] = newCookie;
        }
      },
    })
  );

  app.use(
    createProxyMiddleware('/armories', {
      target: 'https://developer-lostark.game.onstove.com',
      secure: false,
      changeOrigin: true,
      onProxyRes: function (proxyRes, req, res) {
        const cookies = proxyRes.headers['set-cookie'];
        if (cookies) {
          const newCookie = cookies.map(function (cookie) {
            return cookie.replace(/SameSite=Lax/gi, '');
          });
          proxyRes.headers['set-cookie'] = newCookie;
        }
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
