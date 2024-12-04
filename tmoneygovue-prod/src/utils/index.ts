import { isMobileApp, isObject } from '@/utils/is';
import type AppBridge from '@/utils/hybrid/index';
import { UtilNativeToWeb } from '@/utils/hybrid/util/nativeToWeb';
import DOMPurify from 'dompurify';
import { EmulatorDevice, EmulatorEtc, EmulatorPayment } from '@/utils/hybrid/emulator/index';

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: Record<string, string>): string {
  let parameters = '';
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }
  parameters = parameters.replace(/&$/, '');
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}

/**
 * get WebToNative 객체
 * @returns {Promise<AppBridge>}
 */
export async function getAppBridge(): Promise<AppBridge> {
  return new Promise((resolve) => {
    if (typeof (window as any)['$flex'] === 'object') {
      resolve((window as any)['$flex']);
    } else {
      const tm = window.setInterval(() => {
        if (typeof (window as any)['$flex'] === 'object') {
          window.clearInterval(tm);
          resolve((window as any)['$flex']);
        }
      }, 100);
    }
  });
}

/**
 * load NativeToWeb 객체
 * */
export function loadNativeToWebBridge() {
  const nativeToWeb = { ...UtilNativeToWeb };

  if (!(window as any)['$flex'].web) {
    (window as any)['$flex'].web = {};
  }

  if (typeof nativeToWeb === 'object') {
    Object.assign((window as any)['$flex'].web, nativeToWeb);
  }

  return (window as any)['$flex'].web;
}

export function checkLoadNativeToWebBridge(): Promise<void> {
  return new Promise((resolve) => {
    const intervalId = setInterval(() => {
      // 'web' 속성이 할당되었는지 확인
      // debugger;
      if ((window as any)['$flex'].web) {
        // console.log("['$flex'].web has been assigned." + (window as any)['$flex'].web.backWebView);

        // 할당이 확인되면 Promise를 resolve하고 인터벌을 중지
        clearInterval(intervalId);
        resolve();
      }
    }, 100);
  });
}

/**
 * 개발용 브릿지 애뮬레이터 로드
 * PC환경일때만 로드. PC로 개발을 진행할때 브릿지를 사용하기 위함
 * @returns (window as any)['$flex']
 */
export function loadEmulWebToNativeBridge() {
  // mobile app이 아닌 pc환경에서만 로드
  if (!isMobileApp()) {
    const emulatorBridge = { ...EmulatorDevice, ...EmulatorEtc, ...EmulatorPayment };
    Object.defineProperty(window, '$flex', { value: {}, writable: true, enumerable: true, configurable: true });
    if (typeof emulatorBridge === 'object') {
      Object.assign((window as any)['$flex'], emulatorBridge);
    }
    return (window as any)['$flex'];
  }
}

export function santizedHtml(html: string): string {
  const config = {
    FORBID_TAGS: ['style', 'script'],
    FORBID_ATTR: ['href', 'onclick', 'onerror', 'onload']
  };
  return DOMPurify.sanitize(html, config);
}
