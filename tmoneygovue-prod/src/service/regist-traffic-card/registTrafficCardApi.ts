import { defHttp, defHttpOpt, tmoney1Http } from '@/utils/http/axios';
import type {
  ResponseCardBinInfo,
  ResponseRegisterCardNo,
  ResponseRegisteredTrCardList,
  ResponseRemoveInfo,
  ResponseTmoneyPayCardNo,
  ResquestRegisterCardNo,
  ResponseRegisterTmoneyPayCardNo,
  ResponseRegisteredCardInfo,
  ResponseNotesInfo,
  ResponseCreditNotesInfo,
  RequestMemberStat,
  ResponseMemberStat,
  ResponseEvntBnftPlusInfo
} from './model/registTrafficCardModel';

enum Api {
  inqrMbrsTrcrCntInfo = '/api/mbrs/v2/inqrMbrsTrcrCntInfo',
  inqrMbrsTrcrNoList = '/api/mbrs/v2/inqrMbrsTrcrNoList',
  inqrMbrsStatInfo = '/api/mbrs/v2/inqrMbrsStatInfo',
  inqrTmpyTrcr = '/api/tmpy/v2/inqrTmpyTrcr', 
  inqrPageInfoS = '/api/app/v2/inqrPageInfoS',
  inqrPageInfoSS = '/api/app/v2/inqrPageInfoSS', // TODO 나중에 없애기
  reqRgtTmpyTrcr = '/api/tmpy/v2/reqRgtTmpyTrcr', 
  crtnMbrsTrcrNoInfo = '/api/mbrs/v2/crtnMbrsIntgTrcrNoInfo',
  inqrCardBinInfo = '/api/pym/v2/inqrIntgCardBinInfo',
  delMbrsTrcrNoInfo = '/api/mbrs/v2/delMbrsTrcrNoInfo',
  inqrEvntBnftPlusInfo = '/webview/evnt/v2/inqrEvntBnftPlus2408Info.ajax',
  
  //2.4.4 버전 이하
  asIsInqrTmpyTrcr = '/api/inqrTmpyTrcr', // https://tiaapid.tmoney.co.kr:20318
  asIsReqRgtTmpyTrcr = '/api/reqRgtTmpyTrcr', // https://tiaapid.tmoney.co.kr:20318
  asIsCrtnMbrsTrcrNoInfo = '/api/mbrs/v2/crtnMbrsTrcrNoInfo',
  asIsInqrCardBinInfo = '/api/pym/v2/inqrCardBinInfo',
}

/**
 * @description: 메인화면 유의사항
 * @param {string} pageId TrcrReg1
 */
export const getRegisteredTrafficCardMain = (pageId: string): Promise<ResponseNotesInfo> => {
  return defHttp.post({
    url: Api.inqrPageInfoS,
    params: { pageId }
  });
};

/**
 * @description: 등록된 교통카드 정보 조회(메인화면 카드 개수)
 */
export const getRegisteredTrafficCardCnt = (inqrDtm: string): Promise<ResponseRegisteredCardInfo> => {
  return defHttp.post({
    url: Api.inqrMbrsTrcrCntInfo,
    params: { inqrDtm }
  });
};

/**
 * @description: 회원 상태 조회
 * @param {string} inqrDtm YYYYMMDDHHmmss
 * @param {string} moappMbrsSno 모바일앱 회원 일련번호
 */
export const getMemberStat = (params: RequestMemberStat): Promise<ResponseMemberStat> => {
  return defHttp.post({
    url: Api.inqrMbrsStatInfo,
    params
  });
};

/**
 * @description: 티머니 교통카드 등록 유의사항
 * @param {string} pageId TrcrReg3
 */
export const getTmoneyNotes = (pageId: string): Promise<ResponseNotesInfo> => {
  return defHttp.post({
    url: Api.inqrPageInfoS,
    params: { pageId }
  });
};

/**
 * @description: New - 2.27 IO-MID2-O-0126 – 등록된 교통카드번호 조회
 * @param trcrDvsCd 카드구분코드 (0:전체(선불+후불), 1:선불, 2:후불)
 */
export const getRegistTrCardList = (trcrDvsCd: string): Promise<ResponseRegisteredTrCardList> => {
  return defHttp.post({
    url: Api.inqrMbrsTrcrNoList,
    params: { trcrDvsCd }
  });
};

/**
 * @description: 교통카드 불러오기 버튼 ASIS
 */
export const asIsGetTmoneyPayCard = (): Promise<ResponseTmoneyPayCardNo> => {
  return tmoney1Http.get({
    url: Api.asIsInqrTmpyTrcr
  });
};

/**
 * @description: 교통카드 불러오기 버튼
 */
export const getTmoneyPayCard = (): Promise<ResponseTmoneyPayCardNo> => {
  return defHttp.get({
    url: Api.inqrTmpyTrcr
  });
};

/**
 * @description: New - 2.22 IO-MID2-O-0121 – 교통 카드 번호 등록 요청
 */
export const getRegisterTmoneyPayCardNo = (reqDtm: string): Promise<ResponseRegisterTmoneyPayCardNo> => {
  return defHttp.post({
    url: Api.reqRgtTmpyTrcr,
    params: { reqDtm }
  });
};

/**
 * @description: New - 2.22 IO-MID2-O-0121 – 교통 카드 번호 등록 요청 ASIS
 */
export const asIsGetRegisterTmoneyPayCardNo = (reqDtm: string): Promise<ResponseRegisterTmoneyPayCardNo> => {
  return tmoney1Http.post({
    url: Api.asIsReqRgtTmpyTrcr,
    params: { reqDtm }
  });
};

/**
 * @description: 티머니 교통카드 등록 버튼
 */
export const getRegisterTmoneyCardNo = (params: ResquestRegisterCardNo): Promise<ResponseRegisterCardNo> => {
  return defHttp.post({
    url: Api.crtnMbrsTrcrNoInfo,
    params
  });
};

/**
 * @description: 티머니 교통카드 등록 버튼 ASIS
 */
export const asIsGetRegisterTmoneyCardNo = (params: ResquestRegisterCardNo): Promise<ResponseRegisterCardNo> => {
  return defHttp.post({
    url: Api.asIsCrtnMbrsTrcrNoInfo,
    params
  });
};

/**
 * @description: 신용(체크)카드 등록 유의사항
 * @param {string} pageId TrcrReg2
 */
export const getCreditNotes = (pageId: string): Promise<ResponseCreditNotesInfo> => {
  return defHttp.post({
    url: Api.inqrPageInfoS, // TODO inqrPageInfoS로 수정
    params: { pageId }
  });
};

/**
 * @description: 신용카드 검증
 */
export const getInqrCardBinInfo = (cardBin: string): Promise<ResponseCardBinInfo> => {
  return defHttpOpt({
    requestOptions: {
      errorMessageMode: 'none'
    }
  }).post({
    url: Api.inqrCardBinInfo,
    params: { cardBin }
  });
};

/**
 * @description: 신용카드 검증 ASIS
 */
export const asIsGetInqrCardBinInfo = (cardBin: string): Promise<ResponseCardBinInfo> => {
  return defHttpOpt({
    requestOptions: {
      errorMessageMode: 'none'
    }
  }).post({
    url: Api.asIsInqrCardBinInfo,
    params: { cardBin }
  });
};


/**
 * @description: 신용(체크)카드 등록 버튼
 */
export const getRegisterCreditCardNo = (params: ResquestRegisterCardNo): Promise<ResponseRegisterCardNo> => {
  return defHttp.post({
    url: Api.crtnMbrsTrcrNoInfo,
    params
  });
};

/**
 * @description: 신용(체크) 교통 카드 삭제
 */
export const getRemoveCardNo = (trcrSno?: string): Promise<ResponseRemoveInfo> => {
  return defHttp.post({
    url: Api.delMbrsTrcrNoInfo,
    params: { trcrSno }
  });
};

/**
 * @description: 대중교통 챌린지 혜택플러스 조회
 */
export const inqrEvntBnftPlusInfo = (data: any): Promise<ResponseEvntBnftPlusInfo> => {
  return defHttp.post({
    url: Api.inqrEvntBnftPlusInfo,
    params: { evntScrnId: data.evntScrnId, moappMbrsSno: data.moappMbrsSno }
  });
};
