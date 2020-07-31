/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1593957523580_7903';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    multipart: {
      mode: 'file',
      whitelist: [ '.doc', '.docx' ],
    },
    view: {
      root: path.join(appInfo.baseDir, 'app/view'),
      mapping: {
        '.html': 'nunjucks',
      },
    },
    assets: {
      publicPath: '/public',
      devServer: {
        autoPort: true,
        command: 'umi dev --port={port}',
        env: {
          APP_ROOT: path.join(__dirname, '../app/web'),
          BROWSER: 'none',
          SOCKET_SERVER: 'http://127.0.0.1:{port}',
        },
        debug: true,
      },
    },
    security: {
      csrf: false,
    },
    mongoose: {
      url: `mongodb://root:123456@${process.env.docker_db}`,
      options: {
        dbName: 'bank',
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      },
    },
    jwt: {
      secret: config.keys,
      options: {
        expiresIn: 60 * 60 * 12, // Access Token 过期时间
      },
    },
  };

  const statusCode = {
    errorCode: {
      RE_LOGIN: {
        code: 401,
        msg: 'Re login',
      },
      AUTH_FAILED: {
        code: 403,
        msg: 'Auth failed',
      },
      VALID_FAILED: {
        code: 422,
        msg: 'Valid failed',
      },
      MISS_PARAMS: {
        code: 10002,
        msg: 'Parameter absent',
      },
    },
  };

  config.development = {
    overrideDefault: true,
    watchDirs: [
      'app/controller',
      'app/extend',
      'app/middleware',
      'app/model',
      'app/schedule',
      'app/service',
      'app/router.js',
      'config', 'mocks', 'mocks_proxy', 'app.js',
    ],
    ignoreDirs: [ 'app/web' ],
  };

  return {
    ...config,
    ...userConfig,
    ...statusCode,
  };
};
