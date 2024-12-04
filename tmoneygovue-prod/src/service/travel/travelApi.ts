import { defHttpOpt, travelHttp, travelHttpOpt } from '@/utils/http/axios';
import type {
  BannerData,
  BestPrdData,
  CategoryData,
  PopularAreaData,
  ReqAdvrList,
  ResAdvrList,
  TrvlMrnpData
} from './model/introModel';
import type { ResAssosiatedSrch, SrchPlanData } from './model/searchModel';
import type { ReqPlanData, ResPlanData, ResPlanDtlData } from './model/exhibitionModel';
import type { Area } from './model/trvlCmmModel';
import type { ReqProductDtl, ReqTravelProduct, ResProductDtl, ResTravelProduct } from './model/productModel';
import type {
  ReqDAlcnList,
  ReqMntlAlcnList,
  ReqSatsList,
  ResDAlcnData,
  ResMntlAlcnData,
  ResSatsList
} from './model/reservationModel';
import type { TravelResult } from '@/utils/http/axios/types/axios';

const Api = {
  intro: {
    reqCategoryList: '/api/prd/v1/selectPrdCtgList.do',
    reqAreaList: '/api/prd/v1/selectTotalAreaList.do',
    reqPopularAreaList: '/api/prd/v1/selectAreaList.do',
    reqBestPrdList: '/api/prd/v1/selectBestPrdList.do',
    reqEvtBannerList: '/api/prd/v1/selectEventBannerList.do',
    reqMbrTrvlMrnpList: '/api/mrnp/v1/selectMbrTrvlMrnpList.do',
    reqAdvrPupStupInfo: '/api/mui/v2/inqrAdvrPupStupInf',
    reqTrvlMrnpSync: '/api/pym/v1/requestTrvlMrnpSync.do'
  },
  search: {
    reqSelKeywords: '/api/prd/v1/selectKeywords.do',
    reqSelPrdPlanList: '/api/prd/v1/selectPrdPlanList.do',
    reqSelPrdBanner: '/api/prd/v1/selectPrdBanner.do',
    reqPrdSrchKwd: '/api/prd/v1/selectPrdSrchKwd.do'
  },
  exhibition: {
    reqExhbtList: '/api/prd/v1/selectPlanList.do',
    reqExhbtDtl: '/api/prd/v1/selectPlanDtl.do'
  },
  product: {
    reqPrdList: '/api/prd/v1/selectTrvlPrdList.do',
    reqPrdDtl: '/api/prd/v1/selectTrvlPrdDtl.do'
  },
  reservation: {
    reqMntlAlcnList: '/api/prd/v1/selectMntlAlcnList.do',
    reqDAlcnList: '/api/prd/v1/selectBydAlcnList.do',
    reqSatsList: '/api/prd/v1/selectRmnSatsList.do'
  }
};

/**
 * @description 상품카테고리목록조회
 * @returns
 */
export const reqCategoryList = (): Promise<CategoryData[]> => {
  return travelHttp.post({
    url: Api.intro.reqCategoryList
  });
};
/**
 * @description 지역목록조회
 * @returns
 */
export const reqAreaList = (): Promise<Area[]> => {
  return travelHttp.post({
    url: Api.intro.reqAreaList
  });
};
/**
 * @description 인기여행지목록조회
 * @returns
 */
export const reqPopularAreaList = (): Promise<PopularAreaData[]> => {
  return travelHttpOpt({
    requestOptions: {
      errorMessageMode: 'none'
    }
  }).post({
    url: Api.intro.reqPopularAreaList
  });
};
/**
 * @description 베스트상품목록조회
 * @returns
 */
export const reqBestPrdList = (): Promise<BestPrdData[]> => {
  return travelHttpOpt({
    requestOptions: {
      errorMessageMode: 'none'
    }
  }).post({
    url: Api.intro.reqBestPrdList
  });
};
/**
 * @description 이벤트배너조회
 * @returns
 */
export const reqEvtBannerList = (): Promise<BannerData[]> => {
  return travelHttp.post({
    url: Api.intro.reqEvtBannerList
  });
};
/**
 * @description 회원별예약목록조회
 * @returns
 */
export const reqMbrTrvlMrnpList = (): Promise<TrvlMrnpData[]> => {
  return travelHttp.post({
    url: Api.intro.reqMbrTrvlMrnpList
  });
};
/**
 * @description PM광고팝업설정정보조회(티머니GO서버)
 * @returns
 */
export const reqAdvrPupStupInfo = (reqParam: ReqAdvrList): Promise<ResAdvrList> => {
  return defHttpOpt({
    requestOptions: {
      errorMessageMode: 'none'
    }
  }).post({
    url: Api.intro.reqAdvrPupStupInfo,
    params: reqParam
  });
};
/**
 * @description 회원별예약목록 동기화
 * @returns
 */
export const reqTrvlMrnpSync = (): Promise<TrvlMrnpData[]> => {
  return travelHttp.post({
    url: Api.intro.reqTrvlMrnpSync
  });
};
/**
 * @description 인기검색어조회
 * @returns
 */
export const reqSelKeywords = (): Promise<string[]> => {
  return travelHttpOpt({
    requestOptions: {
      errorMessageMode: 'none'
    }
  }).post({
    url: Api.search.reqSelKeywords
  });
};
/**
 * @description 추천기획전목록조회
 * @returns
 */
export const reqSelPrdPlanList = (): Promise<SrchPlanData[]> => {
  return travelHttpOpt({
    requestOptions: {
      errorMessageMode: 'none'
    }
  }).post({
    url: Api.search.reqSelPrdPlanList
  });
};
/**
 * @description 상품이벤트배너목록조회
 * @returns
 */
export const reqSelPrdBanner = (): Promise<BannerData[]> => {
  return travelHttpOpt({
    requestOptions: {
      errorMessageMode: 'none'
    }
  }).post({
    url: Api.search.reqSelPrdBanner
  });
};
/**
 * @description 연관검색어조회
 * @returns
 */
export const reqPrdSrchKwd = (reqParam: { keyword: string }): Promise<ResAssosiatedSrch> => {
  return travelHttpOpt({
    requestOptions: {
      errorMessageMode: 'none'
    }
  }).post({
    url: Api.search.reqPrdSrchKwd,
    params: reqParam
  });
};

/**
 * @description 기획전목록조회
 * @returns
 */
export const reqExhbtList = (reqParam: ReqPlanData): Promise<ResPlanData> => {
  return travelHttpOpt({
    requestOptions: {
      errorMessageMode: 'none'
    }
  }).post({
    url: Api.exhibition.reqExhbtList,
    params: reqParam
  });
};
/**
 * @description 기획전상세목록조회
 * @returns
 */
export const reqExhbtDtl = (reqParam: { planId: string }): Promise<ResPlanDtlData> => {
  return travelHttp.post({
    url: Api.exhibition.reqExhbtDtl,
    params: reqParam
  });
};
/**
 * @description 상품목록 조회
 * @returns
 */
export const reqPrdList = (reqParam: ReqTravelProduct): Promise<ResTravelProduct> => {
  return travelHttp.post({
    url: Api.product.reqPrdList,
    params: reqParam
  });
};

/**
 *
 * @param reqParam 상품상세 조회
 * @returns
 */
export const reqPrdDtl = (reqParam: ReqProductDtl): Promise<ResProductDtl> => {
  return travelHttp.post({
    url: Api.product.reqPrdDtl,
    params: reqParam
  });
};
/**
 * @description 월간배차목록조회
 * @returns
 */
export const reqMntlAlcnList = (reqParam: ReqMntlAlcnList): Promise<ResMntlAlcnData[]> => {
  return travelHttp.post({
    url: Api.reservation.reqMntlAlcnList,
    params: reqParam
  });
};

/**
 * @description 일별배차목록조회
 * @param reqParam
 * @returns
 */
export const reqDAlcnList = (reqParam: ReqDAlcnList): Promise<TravelResult<ResDAlcnData[]>> => {
  return travelHttpOpt({
    requestOptions: {
      errorMessageMode: 'none'
    }
  }).post({
    url: Api.reservation.reqDAlcnList,
    params: reqParam
  });
};

/**
 * @description 잔여석목록조회
 * @param reqParam
 * @returns
 */
export const reqSatsList = (reqParam: ReqSatsList): Promise<ResSatsList> => {
  return travelHttp.post({
    url: Api.reservation.reqSatsList,
    params: reqParam
  });
};
