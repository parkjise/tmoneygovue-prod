import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type {
  RequestOptions,
  DefaultResult,
  TravelResult,
  OndataxiResult,
  HeaderSetter,
  MobilityResult
} from './types/axios';
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform';
import { BaseAxios } from './baseAxios';
import {
  RequestEnum,
  ContentTypeEnum,
  DefaultResultEnum,
  TravelResultCodeEnum,
  TravelErorCodeEnum,
  OndataxiResultCodeEnum,
  MobilityResultCodeEnum,
  MobilityErorCodeEnum
} from './enum/httpEnum';
import { isString } from '@/utils/is';
import { deepMerge, getAppBridge } from '@/utils';
import { formatRequestDate } from './helper';
import { useAuthStore } from '@/service/auth/authModule';
// import { logger } from '@/utils/logger';
import { useI18n } from '@/composables/useI18n';
import { useAxiosModal } from './composerbles/useAxiosModal';
import router from '@/router';
import { useAxiosSpinner } from './composerbles/useAxiosSpinner';
import { useCommonStore } from '@/service/common/commonModule';
import { baseAxiosTypeEnum, getAxiosBaseUrl } from '@/utils/linkUtils';
import type { AuthInfoInterface } from '@/service/auth/model/authModel';
import { VerifyType } from '@/utils/hybrid/etc/etc.type';

/**
 * @description: AxiosTransform
 */
const transform: AxiosTransform = {
  /**
   * @description: transformResponseHook
   */
  transformResponseHook: <T = DefaultResult>(res: AxiosResponse<T>, options: RequestOptions) => {
    // logger.debug('transformResponseHook start');
    const { t } = useI18n();
    const { isReturnNativeResponse, interfaceName } = options;
    // 서버응답 그대로 처리(axios 응답을 포함한 응답)
    if (isReturnNativeResponse) {
      return res;
    }
    if (!res) {
      throw new Error(t('system.api.networkExceptionMsg'));
    }

    // 인터페이스명에 따른 응답처리. default: 모바일서버(티머니고2.0), travel: 운송여행서버
    let resData, hasSuccess, errorMsg;
    if (interfaceName === 'travel') {
      // travel: 운송여행서버
      const resTravel = res as AxiosResponse<TravelResult>;
      resData = resTravel.data;
      errorMsg = resData.err_msg;

      const rstCode = resData.rstCd;
      const errorCode = resData.err_cod;
      hasSuccess = resData && rstCode == TravelResultCodeEnum.SUCCESS && errorCode == TravelErorCodeEnum.SUCCESS;
    } else if (interfaceName === 'mobility') {
      // mobility: 모빌리티
      const resMobility = res as AxiosResponse<MobilityResult>;
      resData = resMobility.data;

      const rstCode = resData.rstCd;
      const errorCode = resData.err_cod;

      hasSuccess = resData && rstCode == MobilityResultCodeEnum.SUCCESS && errorCode == MobilityErorCodeEnum.SUCCESS;
    } else if (interfaceName === 'ondataxi') {
      // ondataxi: 온다택시
      const resOndataxi = res as AxiosResponse<OndataxiResult>;
      resData = resOndataxi.data;

      const errCode = resData.err_code;
      hasSuccess = resData && errCode == OndataxiResultCodeEnum.SUCCESS;
    } else {
      // default: 모바일서버(티머니고2.0, 티머니고1.0)
      const resDefault = res as AxiosResponse<DefaultResult>;
      resData = resDefault.data;

      const rstCd = resData.rstCd;
      hasSuccess = resData && rstCd == DefaultResultEnum.SUCCESS;
    }

    if (hasSuccess) {
      if (interfaceName === 'ondataxi') {
        return resData;
      }
      return resData.dta;
    }

    if (options.errorMessageMode === 'modal') {
      // 운송중개서버(여행) 에러메세지 처리. 재시도/뒤로가기
      if (interfaceName === 'travel') {
        const { createErrorModalByFunction } = useAxiosModal();
        createErrorModalByFunction(
          t('system.api.notifyTitleMsg'),
          errorMsg || t('system.api.networkExceptionMsg'),
          retryAxios,
          t('common.retryText'),
          goBack,
          t('common.goBackText')
        );
      } else {
        // 디폴트 애러메세지 처리. 재시도/종료
        const { createErrorModalByFunction } = useAxiosModal();
        createErrorModalByFunction(
          t('system.api.notifyTitleMsg'),
          t('system.api.networkExceptionMsg'),
          retryAxios,
          t('common.retryText'),
          closeApp,
          t('common.terminateText')
        );
      }
    }
    // TODO 실패 코드 응답 처리
    // logger.debug('transformResponseHook end');
    return resData;
  },

  /**
   * @description: beforeRequestHook
   * 요청보내기 전 처리.
   */
  beforeRequestHook: (config, options) => {
    // logger.debug('beforeRequestHook start');
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, urlPrefix } = options;

    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }
    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }
    const params = config.params || {};
    const data = config.data || false;
    formatDate && data && !isString(data) && formatRequestDate(data);
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        config.params = Object.assign(params || {});
      } else {
        config.url = config.url + params;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params);
        if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length > 0) {
          config.data = data;
          config.params = params;
        } else {
          config.data = params;
          config.params = undefined;
        }
        if (joinParamsToUrl) {
          /*
          config.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data)
          );*/
        }
      } else {
        config.url = config.url + params;
        config.params = undefined;
      }
    }

    // logger.debug('beforeRequestHook end');
    return config;
  },

  /**
   * @description: requestInterceptors
   */
  requestInterceptors: async (config, options) => {
    // logger.debug('requestInterceptors start');

    // API인증정보 세팅. 인증정보는 브릿지를 통해서 가져옴
    const authStore = useAuthStore();
    const authInfo = authStore.getAuthInfo;

    if ((config as any).requestOptions?.withToken == true) {

      config.headers.Authorization = options.authenticationScheme
        ? `${options.authenticationScheme} ${authInfo.token}`
        : authInfo.token;

      if((config as any).requestOptions?.customToken && (config as any).requestOptions?.customToken != ''){
        config.headers.Authorization = options.authenticationScheme
        ? `${options.authenticationScheme} ${(config as any).requestOptions?.customToken}`
        : (config as any).requestOptions?.customToken;
      }

      // 인터페이스별 헤더값 설정
      const interfaceName = options.requestOptions?.interfaceName;
      if (interfaceName && headerSetters[interfaceName]) {
        headerSetters[interfaceName](config, authInfo);
      }
    }

    // spinner show
    const axiosSpinner = useAxiosSpinner();
    axiosSpinner.createSpinner();

    // logger.debug('requestInterceptors end');
    return config;
  },

  /**
   * @description: responseInterceptors
   */
  responseInterceptors: (res: AxiosResponse<any>) => {
    // logger.debug('responseInterceptors start');

    // spinner hide
    const commonStore = useCommonStore();
    commonStore.setDecCommonUseAxiosSpinnerShowedSpinnerCount();

    // logger.debug('responseInterceptors end');

    return res;
  },

  /**
   * @description: responseInterceptorsCatch
   */
  responseInterceptorsCatch: async (axiosInstance: AxiosInstance, error: any) => {
    // logger.debug('responseInterceptorsCatch start' + error);
    const { t } = useI18n();
    const { code, message, config } = error || {};
    const err: string = error?.toString?.() ?? '';
    let errMessage = '';

    // spinner hide
    const commonStore = useCommonStore();
    commonStore.setDecCommonUseAxiosSpinnerShowedSpinnerCount();

    // error message mode가 none이면 에러메세지 처리하지 않음
    if (config.requestOptions.errorMessageMode === 'none') {
      return Promise.reject(error);
    }
    try {
      const { createErrorModalByFunction } = useAxiosModal();
      const httpStatus = error?.response?.status;

      // 401 에러 처리. 토큰 재발급
      if (httpStatus === 401) {
        const authStore = useAuthStore();
        if (authStore.getToken == '') {
          // 로그아웃 처리. openLoginPage
          createErrorModalByFunction(
            t('system.api.notifyTitleMsg'),
            t('system.api.duplcateLoginMsg'),
            moveLoginBridge,
            t('common.okText')
          );
          return Promise.reject(error);
        }
        const { retryMaxCount, retryCount } = config.requestOptions;

        config.requestOptions.retryCount = retryCount + 1;
        // 토큰 재발급(API 최대 3번만큼 재시도)
        if (retryCount < retryMaxCount) {
          // const authStore = useAuthStore();
          const authTokenTknInfo = await authStore.getAuthTokenTknAction();
          if (authTokenTknInfo.token != '') {
            await delay(1000);
            return await axiosInstance.request(config);
          }
        } else {
          // 로그아웃 처리. openLoginPage
          createErrorModalByFunction(
            t('system.api.notifyTitleMsg'),
            t('system.api.duplcateLoginMsg'),
            moveLoginBridge,
            t('common.okText')
          );
          return Promise.reject(error);
        }
      }

      // 406, 412 에러 처리. 중복로그인
      if (httpStatus === 406 || httpStatus === 412) {
        // 로그아웃 처리. openLoginPage
        createErrorModalByFunction(
          t('system.api.notifyTitleMsg'),
          t('system.api.networkExceptionMsg'),
          moveLoginBridge,
          t('common.okText')
        );
        return Promise.reject(error);
      }

      // TODO 409 에러 처리. 휴면화면 시나리오 확인필요. 브릿지 호출까지만 전달받음.
      // if(httpStatus === 409 ){

      // }

      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        errMessage = t('system.api.apiTimeoutMsg');
      }
      if (err?.includes('Network Error')) {
        errMessage = t('system.api.networkExceptionMsg');
      }

      const { errorMessageMode, interfaceName } = config.requestOptions;
      if (errorMessageMode === 'modal') {
        // 운송중개서버(여행) 에러메세지 처리. 재시도/뒤로가기
        if (interfaceName === 'travel') {
          const { createErrorModalByFunction } = useAxiosModal();
          createErrorModalByFunction(
            t('system.api.notifyTitleMsg'),
            errMessage || t('system.api.networkExceptionMsg'),
            retryAxios,
            t('common.retryText'),
            goBack,
            t('common.goBackText')
          );
        } else {
          // 디폴트 애러메세지 처리. 재시도/종료
          const { createErrorModalByFunction } = useAxiosModal();
          createErrorModalByFunction(
            t('system.api.notifyTitleMsg'),
            t('system.api.networkExceptionMsg'),
            retryAxios,
            t('common.retryText'),
            closeApp,
            t('common.terminateText')
          );
        }
      }
    } catch (error) {
      throw new Error(error as unknown as string);
    }
    // logger.debug('responseInterceptorsCatch end');
    return Promise.reject(error);
  },

  requestCatchHook: (error: Error) => {
    // logger.debug('requestCatchHook start');
    // logger.debug('requestCatchHook end');
    return Promise.reject(error);
  }
};

/**
 * @description: axios 재시도(현재 화면 재호출)
 */
const retryAxios = async () => {
  const currentRoute = router.currentRoute.value.fullPath;
  await router.replace('/common/move-view');
  await router.replace(currentRoute);
};

/**
 * @description: APP 종료
 */
const closeApp = async () => {
  const appBridge = await getAppBridge();
  await appBridge.terminateApp();
};

/**
 * @description: 뒤로가기
 */
const goBack = async () => {
  if (
    '/main/my-main' == router.currentRoute.value.path ||
    '/main/benefit-main' == router.currentRoute.value.path ||
    '/main/more-main' == router.currentRoute.value.path
  ) {
    // APP 종료 브릿지 요청
    const appBridge = await getAppBridge();
    await appBridge.terminateApp();
    return;
  } else if ('/travel/main' == router.currentRoute.value.path) {
    // 여행메인화면에서 뒤로가기시 웹뷰 닫기
    const appBridge = await getAppBridge();
    await appBridge.closeWebView();
    return;
  }

  router.back();
};

/**
 * @description: 세션만료(로그인페이지 호출. bridge 호출)
 */
const moveLoginBridge = async () => {
  const appBridge = await getAppBridge();
  await appBridge.callIdentityVerify({
    verifyType: VerifyType.SING_UP
  });
};

// 지정된 시간만큼 대기
const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// set 티머니 2.0 헤더값
function setTmoney2Headers(config: InternalAxiosRequestConfig<any>, authInfo: AuthInfoInterface) {
  config.headers['appCode'] = authInfo.appCode;
  config.headers['UUID'] = authInfo.uuid;
  config.headers['appVer'] = authInfo.appVer;
  config.headers['osKnd'] = authInfo.osKnd;
  config.headers['osVer'] = authInfo.osVer;
}

// set 여행 헤더값
function setTravelHeaders(config: InternalAxiosRequestConfig<any>, authInfo: AuthInfoInterface) {
  config.headers['appCode'] = authInfo.appCode;
  config.headers['UUID'] = authInfo.uuid;
  config.headers['appVer'] = authInfo.appVer;
}

// set 모빌리티 헤더값
function setMobilityHeaders(config: InternalAxiosRequestConfig<any>, authInfo: AuthInfoInterface) {
  config.headers['appCode'] = authInfo.appCode;
  config.headers['UUID'] = authInfo.uuid;
}

// set 온다택시 헤더값
function setOndataxiHeaders(config: InternalAxiosRequestConfig<any>, authInfo: AuthInfoInterface) {
  config.headers.Authorization = authInfo.ondaAuthToken;
  config.headers['source'] = 'APP';
  config.headers['pnb'] = authInfo.mbrphNo;
  config.headers['osType'] = authInfo.osKnd == 'A' ? 'Android' : 'IOS';
  config.headers['osVersion'] = authInfo.osVer;
  config.headers['appVersion'] = authInfo.appVer;
  config.headers['device'] = '';
  config.headers['adid'] = '00000000-0000-0000-0000-000000000000';
  config.headers['loginChannelType'] = 'LC00TG';
  config.headers['TGOAuth'] = authInfo.token;
  config.headers['tgoMbrsSno'] = authInfo.moappMbrsSno;
}

// axios 헤더값 설정
const headerSetters: { [key: string]: HeaderSetter } = {
  tmoney2: setTmoney2Headers,
  tmoney1: setTmoney2Headers,
  travel: setTravelHeaders,
  mobility: setMobilityHeaders,
  ondataxi: setOndataxiHeaders
};

// axios 공통 옵션
const commonBaseAxiosOpt = {
  authenticationScheme: 'Bearer',
  timeout: 10 * 1000,
  transform,
  requestOptions: {
    joinPrefix: false,
    isReturnNativeResponse: false,
    isTransformResponse: true,
    joinParamsToUrl: false,
    formatDate: true,
    errorMessageMode: 'modal',
    joinTime: true,
    withToken: true,
    retryMaxCount: 3,
    retryCount: 0
  }
};

/**
 * @description: 디폴트 axios 생성
 */
function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new BaseAxios(
    deepMerge(
      {
        ...commonBaseAxiosOpt,
        baseURL: getAxiosBaseUrl(baseAxiosTypeEnum.TMONEY2),
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        requestOptions: {
          ...commonBaseAxiosOpt.requestOptions,
          interfaceName: 'tmoney2'
        }
      },
      opt || {}
    )
  );
}

// 여행 서버 axios 생성
function createTravelAxios(opt?: Partial<CreateAxiosOptions>) {
  return new BaseAxios(
    deepMerge(
      {
        ...commonBaseAxiosOpt,
        baseURL: getAxiosBaseUrl(baseAxiosTypeEnum.TRAVEL),
        headers: { 'Content-Type': ContentTypeEnum.JSON, Accept: 'application/json;charset=UTF-8, text/plain, */*' },
        requestOptions: {
          ...commonBaseAxiosOpt.requestOptions,
          interfaceName: 'travel'
        }
      },
      opt || {}
    )
  );
}

// 티머니 1.0 서버 axios 생성
function createTmoney1Axios(opt?: Partial<CreateAxiosOptions>) {
  return new BaseAxios(
    deepMerge(
      {
        ...commonBaseAxiosOpt,
        baseURL: getAxiosBaseUrl(baseAxiosTypeEnum.TMONEY1),
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        requestOptions: {
          ...commonBaseAxiosOpt.requestOptions,
          interfaceName: 'tmoney1'
        }
      },
      opt || {}
    )
  );
}

// 모빌리티 서버 axios 생성
function createMobilityAxios(opt?: Partial<CreateAxiosOptions>) {
  return new BaseAxios(
    deepMerge(
      {
        ...commonBaseAxiosOpt,
        baseURL: getAxiosBaseUrl(baseAxiosTypeEnum.MOBILITY),
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        requestOptions: {
          ...commonBaseAxiosOpt.requestOptions,
          interfaceName: 'mobility'
        }
      },
      opt || {}
    )
  );
}

// 온다택시 서버 axios 생성
function createOndataxiAxios(opt?: Partial<CreateAxiosOptions>) {
  return new BaseAxios(
    deepMerge(
      {
        ...commonBaseAxiosOpt,
        baseURL: getAxiosBaseUrl(baseAxiosTypeEnum.ONDATAXI),
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        requestOptions: {
          ...commonBaseAxiosOpt.requestOptions,
          interfaceName: 'ondataxi'
        }
      },
      opt || {}
    )
  );
}

/**
 * @description: defHttp
 * axios 디폴트 옵션으로 생성
 * ex. defHttp.get<HellowModel>({ url: Api.GetHellowWorld });
 */
export const defHttp = createAxios();

/**
 * @description: defHttpOpt
 * axios 커스텀 옵션으로 생성. 디폴트 설정에서 커스텀이 필요한 필드와 merge
 * ex. defHttpOpt({ timeout: 200 * 1000 }).get<HellowModel>({url: Api.GetHellowWorld,});
 */
export const defHttpOpt = (opt?: Partial<CreateAxiosOptions>): BaseAxios => createAxios(opt);

/**
 * @description: travelHttp
 * axios 디폴트 여행 옵션으로 생성
 * ex. travelHttp.get<HellowModel>({ url: Api.GetHellowWorld });
 */
export const travelHttp = createTravelAxios();

/**
 * @description: travelHttpOpt
 * axios 커스텀 옵션으로 생성. 디폴트 설정에서 커스텀이 필요한 필드와 merge
 * ex. travelHttpOpt({ timeout: 200 * 1000 }).get<HellowModel>({url: Api.GetHellowWorld,});
 */
export const travelHttpOpt = (opt?: Partial<CreateAxiosOptions>): BaseAxios => createTravelAxios(opt);

/**
 * @description: tmoney1Http
 * axios 디폴트 여행 옵션으로 생성
 * ex. tmoney1Http.get<HellowModel>({ url: Api.GetHellowWorld });
 */
export const tmoney1Http = createTmoney1Axios();

/**
 * @description: tmoney1HttpOpt
 * axios 커스텀 옵션으로 생성. 디폴트 설정에서 커스텀이 필요한 필드와 merge
 * ex. travelHttpOpt({ timeout: 200 * 1000 }).get<HellowModel>({url: Api.GetHellowWorld,});
 */
export const tmoney1HttpOpt = (opt?: Partial<CreateAxiosOptions>): BaseAxios => createTmoney1Axios(opt);

/**
 * @description: mobilityHttp
 * axios 디폴트 여행 옵션으로 생성
 * ex. mobilityHttp.get<HellowModel>({ url: Api.GetHellowWorld });
 */
export const mobilityHttp = createMobilityAxios();

/**
 * @description: mobilityHttpOpt
 * axios 커스텀 옵션으로 생성. 디폴트 설정에서 커스텀이 필요한 필드와 merge
 * ex. mobilityHttpOpt({ timeout: 200 * 1000 }).get<HellowModel>({url: Api.GetHellowWorld,});
 */
export const mobilityHttpOpt = (opt?: Partial<CreateAxiosOptions>): BaseAxios => createMobilityAxios(opt);

/**
 * @description: ondataxiHttp
 * axios 디폴트 온다택시 옵션으로 생성
 * ex. ondataxiHttp.get<HellowModel>({ url: Api.GetHellowWorld });
 */
export const ondataxiHttp = createOndataxiAxios();

/**
 * @description: ondataxiHttpOpt
 * axios 커스텀 옵션으로 생성. 디폴트 설정에서 커스텀이 필요한 필드와 merge
 * ex. ondataxiHttpOpt({ timeout: 200 * 1000 }).get<HellowModel>({url: Api.GetHellowWorld,});
 */
export const ondataxiHttpOpt = (opt?: Partial<CreateAxiosOptions>): BaseAxios => createOndataxiAxios(opt);
