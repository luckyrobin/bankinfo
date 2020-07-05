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
      url: 'mongodb://127.0.0.1:27017/bank', // connect to other docker image port: 27017
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      },
    },
    jwt: {
      secret: config.keys,
      options: {
        expiresIn: 60 * 60 * 5, // Access Token 过期时间
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

  return {
    ...config,
    ...userConfig,
    ...statusCode,
  };
};
