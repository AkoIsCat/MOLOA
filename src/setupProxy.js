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
