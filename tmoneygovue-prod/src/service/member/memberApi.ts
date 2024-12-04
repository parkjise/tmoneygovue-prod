import { defHttp, defHttpOpt, tmoney1Http } from '@/utils/http/axios';
import type {
  reqMemberInfoModel,
  resMemberInfoModel,
  reqMemberWithdrawModel,
  resMemberWithdrawModel,
  reqLinkedServiceCodeListModel,
  resLinkedServiceCodeListModel,
  reqBlackListYnModel,
  resBlackListYnModel,
  reqLogoutModel,
  resLogoutModel,
  reqLogoutDdareongMemberModel,
  resLogoutDdareongMemberYnModel,
  reqDdareongMemberInfoChangeEmailModel,
  reqDdareongMemberInfoChangePWModel,
  reqDdareongMemberInfoChangeWeightModel,
  resDdareongMemberInfoChangeModel,
  reqChangeParentPhoneNumberModel,
  resChangeParentPhoneNumberModel,
  reqSignUpModel,
  resSignUpModel,
  reqUpdatePushToken,
  resUpdatePushToken,
  reqTossAuthResultModel, 
  reqTossLoginModel, 
  resTossAuthModel, 
  resTossAuthResultModel
} from '@/service/member/model/memberModel';

enum Api {
  memberInfo = '/api/mbrs/v2/inqrMbrsPageInfo',
  withdrawMembership = '/api/mbrs/v2/crtnMbrsScsnInfo',
  linkedService = '/api/mbrs/v2/inqrMbrsLnkgSvcList',
  getBlackListYn = '/api/mbrs/v2/inqrBlackListYn',
  crtnMbrsLgtInfo = '/api/mbrs/v2/crtnMbrsLgtInfo',
  savePmUserLnkgClrInf = '/api/pm/cmn/savePmUserLnkgClrInf',
  reqMailMod = '/api/reqMailMod',
  reqPwdMod = '/api/reqPwdMod',
  reqWeightMod = '/api/reqWeightMod',
  reqPrntMbphNoMod = '/api/reqPrntMbphNoMod',
  signUp = '/api/mbrs/v2/crtnMbrsInfo',
  updatePushToken = '/api/push/v2/crtnPushTknInfo',
  tossAuth = '/api/mbrs/auth/v2/toss/auth',
  tossAuthResult = '/api/mbrs/auth/v2/toss/authResult'
}

/**
 * @description: 회원 프로필 정보
 */
export const getMemberInfo = (param: reqMemberInfoModel): Promise<resMemberInfoModel> => {
  return defHttp.post({
    url: Api.memberInfo,
    params: param
  });
};

/**
 * @description: 회원가입
 */
export const signUp = (param: reqSignUpModel): Promise<resSignUpModel> => {
  return defHttp.post({
    url: Api.signUp,
    params: param
  });
};

/**
 * @description: 회원탈퇴
 */
export const withdrawMembership = (param: reqMemberWithdrawModel): Promise<resMemberWithdrawModel> => {
  return defHttp.post({
    url: Api.withdrawMembership,
    params: param
  });
};

/**
 * @description: getLinkedServiceCodeList
 */
export const getLinkedServiceCodeList = (
  param: reqLinkedServiceCodeListModel
): Promise<resLinkedServiceCodeListModel> => {
  return defHttp.post({
    url: Api.linkedService,
    params: param
  });
};

/**
 * @description: getLinkedSvcList
 */
export const getLinkedSvcList = (param: reqLinkedServiceCodeListModel): Promise<resLinkedServiceCodeListModel> => {
  return defHttpOpt({
    requestOptions: {
      errorMessageMode: 'none'
    }
  }).post({
    url: Api.linkedService,
    params: param
  });
};

/**
 * @description: getBlackListYn
 */
export const getBlackListYn = (param: reqBlackListYnModel): Promise<resBlackListYnModel> => {
  return defHttp.post({
    url: Api.getBlackListYn,
    params: param
  });
};

/**
 * @description: logout
 */
export const logout = (param: reqLogoutModel): Promise<resLogoutModel> => {
  return defHttp.post({
    url: Api.crtnMbrsLgtInfo,
    params: param
  });
};

/**
 * @description: logoutDdareong
 */
export const logoutDdareong = (param: reqLogoutDdareongMemberModel): Promise<resLogoutDdareongMemberYnModel> => {
  return tmoney1Http.post({
    url: Api.savePmUserLnkgClrInf,
    params: param
  });
};

/**
 * @description: changeDdareongEmail
 */
export const changeDdareongEmail = (
  param: reqDdareongMemberInfoChangeEmailModel
): Promise<resDdareongMemberInfoChangeModel> => {
  return tmoney1Http.post({
    url: Api.reqMailMod,
    params: param
  });
};

/**
 * @description: changeDdareongPW
 */
export const changeDdareongPW = (
  param: reqDdareongMemberInfoChangePWModel
): Promise<resDdareongMemberInfoChangeModel> => {
  return tmoney1Http.post({
    url: Api.reqPwdMod,
    params: param
  });
};

/**
 * @description: changeDdareongWeight
 */
export const changeDdareongWeight = (
  param: reqDdareongMemberInfoChangeWeightModel
): Promise<resDdareongMemberInfoChangeModel> => {
  return tmoney1Http.post({
    url: Api.reqWeightMod,
    params: param
  });
};

/**
 * @description: changeParentPhoneNumber
 */
export const changeParentPhoneNumber = (
  param: reqChangeParentPhoneNumberModel
): Promise<resChangeParentPhoneNumberModel> => {
  return defHttp.post({
    url: Api.reqPrntMbphNoMod,
    params: param
  });
};

/**
 * @description: 푸시 토큰 업데이트
 */
export const updatePushToken = (
  param: reqUpdatePushToken
): Promise<resUpdatePushToken> => {
  return defHttp.post({
    url: Api.reqPrntMbphNoMod,
    params: param
  });
};


/**
 * @description: 토스 회원본인인증 요청
 */
export const reqTossAuth = (
  param: reqTossLoginModel
): Promise<resTossAuthModel> => {
  return defHttp.post({
    url: Api.tossAuth,
    params: param
  });
};

/**
 * @description: 토스 회원본인인증 확인
 */
export const getTossAuthResult = (
  param: reqTossAuthResultModel
): Promise<resTossAuthResultModel> => {
  return defHttp.post({
    url: Api.tossAuthResult,
    params: param
  });
};
