import { parse } from 'querystring';
import pathRegexp from 'path-to-regexp';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = path => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
export const getPageQuery = () => parse(window.location.href.split('?')[1]);
/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */

export const getAuthorityFromRouter = (router = [], pathname) => {
  const authority = router.find(
    ({ routes, path = '/', target = '_self' }) =>
      (path && target !== '_blank' && pathRegexp(path).exec(pathname)) ||
      (routes && getAuthorityFromRouter(routes, pathname)),
  );
  if (authority) return authority;
  return undefined;
};
export const getRouteAuthority = (path, routeData) => {
  let authorities;
  routeData.forEach(route => {
    // match prefix
    if (pathRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
      if (route.authority) {
        authorities = route.authority;
      } // exact match

      if (route.path === path) {
        authorities = route.authority || authorities;
      } // get children authority recursively

      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

export function convertResp2Blob(response) {
  if (!response.data || !response.response) return;
  const matchFileName = response.response.headers.get('Content-Disposition').match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1];
  const fileName = matchFileName.replace(/^"{1}|"{1}$/g, '');
  // create a blob
  const blob = new Blob([response.data], { type: 'application/octet-stream' });
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    // compatibility：support IE，window.navigator.msSaveBlob
    window.navigator.msSaveBlob(blob, decodeURI(fileName));
  } else {
    // create a url for blob
    const blobURL = window.URL.createObjectURL(blob);
    // create a temporary link
    const tempLink = document.createElement('a')
    tempLink.style.display = 'none'
    tempLink.href = blobURL
    tempLink.setAttribute('download', decodeURI(fileName));
    // compatibility：support download attribute
    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank')
    }
    document.body.appendChild(tempLink)
    tempLink.click()
    document.body.removeChild(tempLink)
    // release
    window.URL.revokeObjectURL(blobURL)
  }
}

export function getBirthday(identityCard) {
  const len = `${identityCard}`.length;
  let strBirthday = '';
  if (len === 18) {
    strBirthday = `${identityCard.substr(6, 4)}年${identityCard.substr(10, 2)}月${identityCard.substr(12, 2)}日`;
  }
  if (len === 15) {
      let birthdayValue = '';
      birthdayValue = identityCard.charAt(6) + identityCard.charAt(7);
      if (parseInt(birthdayValue, 10) < 10) {
          strBirthday = `20${identityCard.substr(6, 2)}年${identityCard.substr(8, 2)}月${identityCard.substr(10, 2)}日`;
      } else {
          strBirthday = `19${identityCard.substr(6, 2)}年${identityCard.substr(8, 2)}月${identityCard.substr(10, 2)}日`;
      }
  }
  return strBirthday;
}

export function toFixed(number, digits) {
  const raw = Math.pow(10, digits);
  return Math.round(number * raw) / raw;
}
