/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend, ResponseError } from 'umi-request';
import { notification } from 'antd';
import { stringify } from 'querystring';

const CUSTOM_RESPONSE = 'custom_response';
const CUSTOM_401 = 'custom_401';

const redirect2Login = () => {
  const queryString = stringify({
    redirect: window.location.href,
  });

  if (window.location.pathname !== '/user/login') {
    window.location.href = (`/user/login?${queryString}`);
  }
};

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * 异常处理程序
 */

const errorHandler = error => {
  const { response, data } = error;
  if (data === CUSTOM_RESPONSE) {
    notification.error({
      message: '请求错误',
      description: error.message,
    });
    return response;
  }

  if (data === CUSTOM_401) {
    notification.error({
      message: '请求错误',
      description: error.message,
    });
    setTimeout(() => {
      redirect2Login();
    }, 3000);
    return response;
  }

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }

  return response;
};
/**
 * 配置request请求时的默认参数
 */

const request = extend({
  errorHandler,
  // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
  headers: {
    'Content-Type': 'application/json',
  },
});

request.interceptors.request.use((url, options) => {
  const merged = options;
  merged.headers.Authorization = global.localStorage.getItem('token');
  return {
    url: `${url}`,
    options: { ...merged, },
  };
});

request.interceptors.response.use(async response => {
  if (response.status !== 200) {
    throw new ResponseError(response);
  }
  const resp = await response.clone().json();
  const { code, msg } = resp;
  switch (code) {
    case 0: {
      return resp.data;
    }
    case 401: {
      throw new ResponseError(response, '未登录或者登录过期，请重新登录', CUSTOM_401);
    }
    default: {
      throw new ResponseError(response, msg || codeMessage[code], CUSTOM_RESPONSE);
    }
  }
}, { global: false });

const download = extend({
  errorHandler,
  // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
  responseType: 'blob',
  getResponse: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': 'application/json',
  },
});

download.interceptors.response.use(async response => {
  if (response.status !== 200) {
    throw new ResponseError(response);
  }
  if (response.headers.get('Content-Disposition')) return response;
  const resp = await response.clone().json();
  const { code, msg } = resp;
  if (!code) return response;
  switch (code) {
    case 0: {
      return response;
    }
    case 401: {
      throw new ResponseError(response, '未登录或者登录过期，请重新登录', CUSTOM_401);
    }
    default: {
      throw new ResponseError(response, msg || codeMessage[code], CUSTOM_RESPONSE);
    }
  }
},  { global: false });

export { download };

export default request;
