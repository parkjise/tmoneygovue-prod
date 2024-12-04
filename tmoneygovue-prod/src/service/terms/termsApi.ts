import { defHttp, defHttpOpt } from '@/utils/http/axios';
import type { TermsAgreeInfo, TermsInfo } from '@/service/terms/model/termsModel';
import type {
  ReqTermsInfo,
  ReqTermsAgree,
  ReqSpfTermsAgree,
  ReqEventTermAgreeInfo
} from '@/service/terms/model/requestModel';
import type {
  ResponseEventTermAgree,
  ResponseEventTermInfo,
  ResponseInfo,
  ResponseSpfTermAgreeInfo
} from '@/service/terms/model/responseModel';
import type { CreateAxiosOptions } from '@/utils/http/axios/axiosTransform';

enum Api {
  inqrStplList = '/api/mbrs/v2/inqrStplList',
  inqrPrpmAutPymStplAgrmYN = '/api/pym/v2/inqrPrpmAutPymStplAgrmYN',
  crtnMbrsLnkgSvcInfo = '/api/mbrs/v2/crtnMbrsLnkgSvcInfo',
  inqrSpfStplAgrmYN = '/api/mbrs/v2/inqrSpfStplAgrmYN',
  crtnSpfStplAgrmInfo = '/api/mbrs/v2/crtnSpfStplAgrmInfo',
  getWebviewMbrsStplInfo = '/webview/app/v2/getWebviewMbrsStplInfo',
  setWebviewMbrsStpl = '/webview/app/v2/setWebviewMbrsStpl'
}

/**
 * @description IO-MID2-O-0102 - 약관리스트 조회
 * @param {string} svcDvsCd 서비스구분코드
 * @param {string} stplGrpCd 이용약관그룹코드
 * @returns {Promse<TermsInfo>} 이용약관리스트
 */
export const inqrStplList = (reqTermsInfo: ReqTermsInfo): Promise<TermsInfo> => {
  const opts: Partial<CreateAxiosOptions> = {
    requestOptions: {
      withToken: false
    }
  };
  return defHttpOpt(opts).post({
    url: Api.inqrStplList,
    params: {
      svcDvsCd: reqTermsInfo.svcDvsCd,
      stplGrpCd: reqTermsInfo.stplGrpCd
    }
  });
};

/**
 * @description IO-MID2-O-0102 - 약관리스트 전체 조회
 */
export const inqrStplListAll = (reqTermsInfo: ReqTermsInfo): Promise<TermsInfo> => {
  const opts: Partial<CreateAxiosOptions> = {
    requestOptions: {
      withToken: false
    }
  };
  return defHttpOpt(opts).post({
    url: Api.inqrStplList,
    params: {
      SvcDvsCd: reqTermsInfo.svcDvsCd,
      StplGrpCd: reqTermsInfo.stplGrpCd
    }
  });
};

/**
 * @description IO-MID2-O-0317 – 사전등록자동결제약관 동의여부 조회
 * @param {string} stplTypCd 이용약관그룹코드
 * @returns {Promse<TermsAgreeInfo>} 이용약관동의리스트
 */
export const inqrPrpmAutPymStplAgrmYN = (stplTypCd: string): Promise<TermsAgreeInfo> => {
  return defHttp.post({
    url: Api.inqrPrpmAutPymStplAgrmYN,
    params: {
      stplTypCd: stplTypCd
    }
  });
};

/**
 * @description	IO-MID2-O-0113 – 회원 서비스 연동 등록
 * @param {ReqTermsAgree} params 회원서비스 연동
 * @returns {Promise<ResponseInfo>} 기본 응답값
 */
export const crtnMbrsLnkgSvcInfo = (params: ReqTermsAgree, authToken?: string): Promise<ResponseInfo> => {
  return defHttpOpt({
    requestOptions: {
      errorMessageMode: 'none',
      customToken: authToken
    }
  }).post({
    url: Api.crtnMbrsLnkgSvcInfo,
    params: params
  });
};

/**
 * @description IO-MID2-O-0152 – 특정약관 동의여부 조회
 * @param {string} stplTypCd 약관유형코드 (A:(오퍼월)티머니GO-엔비티간 개인정보,B:(마일리지전환)개인정보,...)
 * @returns
 */
export const getSpfStplAgrmYn = (stplTypCd: string): Promise<TermsAgreeInfo> => {
  return defHttp.post({
    url: Api.inqrSpfStplAgrmYN,
    params: { stplTypCd }
  });
};

/**
 * @description IO-MID2-O-0153 – 특정약관 동의정보 등록
 * @param {ReqSpfTermsAgree} params 동의약관 리스트
 * @returns {Promise<ResponseSpfTermAgreeInfo>}
 */
export const getSpfStplAgree = (params: ReqSpfTermsAgree): Promise<ResponseSpfTermAgreeInfo> => {
  return defHttp.post({
    url: Api.crtnSpfStplAgrmInfo,
    params
  });
};

/**
 * @description 이벤트 약관 목록
 * @param {ReqEventTermAgreeInfo} params 동의약관 리스트
 * @returns {Promise<ResponseEventTermInfo>}
 */
export const getEventTerms = (params: ReqEventTermAgreeInfo): Promise<ResponseEventTermInfo> => {
  return defHttp.post({
    url: Api.getWebviewMbrsStplInfo,
    params
  });
};

/**
 * @description 이벤트 약관 동의
 * @param {ReqEventTermAgreeInfo} params 동의약관 리스트
 * @returns {Promise<ResponseEventTermAgree>}
 */
export const getEventTermsAgree = (params: ReqEventTermAgreeInfo): Promise<ResponseEventTermAgree> => {
  return defHttp.post({
    url: Api.setWebviewMbrsStpl,
    params
  });
};
