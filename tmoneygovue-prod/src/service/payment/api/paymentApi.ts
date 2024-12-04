import { defHttp, defHttpOpt } from '@/utils/http/axios';
import type {
  DeletionPossibility,
  PaymentManagement,
  PaymentStatusInfo,
  RepresentPaymentManagement,
  SmpcPaymentAliasModification
} from '@/service/payment/model/paymentModel';
import type { ResponseInfo, ResponsePaymentPassword } from '@/service/payment/model/responseModel';
import type {
  RequestDeletionPossibility,
  RequestPasswordConfirm,
  RequestPaymentManagement,
  RequestPaymentPassword,
  RequestRepresentPaymentManagement
} from '@/service/payment/model/requestModel';

enum Api {
  pymMnsListAtMng = '/api/pym/v2/inqrPymMnsListAtMng',
  rprnPymMnsInfo = '/api/pym/v2/inqrRprnPymMnsInfo',
  inqrPymStatusInfo = '/api/pym/v2/inqrPymStatusInfo',
  reqPymPwdUseYnInfo = '/api/pym/v2/reqPymPwdUseYnInfo',
  cardPymKeyRgt = '/api/pym/v2/reqRprnCardPymKeyRgt',
  reqPymPwdRgtInfo = '/api/pym/v2/reqPymPwdRgtInfo',
  reqPymPwdAuthInfo = '/api/pym/v2/reqPymPwdAuthInfo',
  reqPymPwdLockInfo = '/api/pym/v2/reqPymPwdLockInfo',
  pymMnsListAtPym = '/api/pym/v2/inqrPymMnsListAtPym',
  reqPymPwdCfrm = '/api/pym/v2/reqPymPwdCfrm',
  pymMnsDltPsbYN = '/api/pym/v2/inqrPymMnsDltPsbYN',
}

/**
 * @description IO-MID2-O-0304 사용자별 결제수단 목록 조회(관리시)
 * @returns {Promise<PaymentManagement>} 사용자별 결제 수단 목록
 */
export const inqrPymMnsListAtMng = (): Promise<PaymentManagement> => {
  return defHttp.post({
    url: Api.pymMnsListAtMng
  });
};

/**
 * @description IO-MID2-O-0307 대표 결제수단 결제키 등록
 * @param {string} pymMnsId 결제수단Id ( 'TMPY', 'BZPY', 'PRPM' )
 * @param {string} paymentKey 결제키
 * @param {string} issuerCd 발급사코드
 * @returns {Promise<SmpcPaymentAliasModification>} 대표 결제수단 정보
 */
export const cardPymKeyRgt = (params: RequestRepresentPaymentManagement): Promise<SmpcPaymentAliasModification> => {
  return defHttp.post({
    params: params,
    url: Api.cardPymKeyRgt
  });
};

/**
 * @description IO-MID2-O-0308 대표 결제수단 목록 조회
 * @param {string} reqDtm 요청일 'yyyyMMddHHmmss'
 * @param {string} inqrDtm 조회일 'yyyyMMddHHmmss'
 * @returns {Promise<RepresentPaymentManagement>} 대표 결제수단 정보
 */
export const inqrRprnPymMnsInfo = (
  RequestRepresentPaymentManagement: RequestPaymentManagement
): Promise<RepresentPaymentManagement> => {
  return defHttp.post({
    url: Api.rprnPymMnsInfo,
    params: RequestRepresentPaymentManagement
  });
};

/**
 * @description IO-MID2-O-0312 결제비밀번호 상태 조회
 * @returns {Promise<PaymentStatusInfo>} 결제비밀번호 상태 정보
 */
export const inqrPymStatusInfo = (): Promise<PaymentStatusInfo> => {
  return defHttp.post({
    url: Api.inqrPymStatusInfo
  });
};

/**
 * @description IO-MID2-O-0312 결제비밀번호 사용여부 등록 요청
 * @param {string} pwdUseYn 결제 비밀번호 사용여부(Y:사용, N:미사용)
 * @returns {Promise<ResponseInfo>} 기본처리 결과
 */
export const reqPymPwdUseYnInfo = (useYn: string): Promise<ResponseInfo> => {
  return defHttp.post({
    params: {
      pwdUseYn: useYn
    },
    url: Api.reqPymPwdUseYnInfo
  });
};

/**
 * @description IO-MID2-O-0315 – 결제비밀번호 등록 요청
 * @param {string} encPwd 암호화 된 결제 비밀번호 ( 네이티브 통신 통해 받아와야 함)
 * @returns {Promise<ResponseInfo>} 기본처리 결과
 */
export const reqPymPwdRgtInfo = (encPwd: string): Promise<ResponseInfo> => {
  return defHttp.post({
    params: {
      encPwd: encPwd
    },
    url: Api.reqPymPwdRgtInfo
  });
};

/**
 * @description IO-MID2-O-0316 – 결제비밀번호 인증 요청
 * @param {string} encPwd 암호화 된 결제 비밀번호 ( 네이티브 통신 통해 받아와야 함)
 * @param {string} pwdUseYn 결제 비밀번호 사용 여부 구분자 ( Y:사용, N:미사용 )
 * @returns {Promise<ResponsePaymentPassword>} 결제비밀번호 전달
 */
export const reqPymPwdAuthInfo = (params: RequestPaymentPassword): Promise<ResponsePaymentPassword> => {
  return defHttpOpt({
    requestOptions: {
      errorMessageMode: 'none'
    }
  }).post({
    params: params,
    url: Api.reqPymPwdAuthInfo
  });
};

/**
 * @description IO-MID2-O-0313 – 결제비밀번호 잠금 요청
 * @returns {Promise<ResponseInfo>} 기본처리 결과
 */
export const reqPymPwdLockInfo = (): Promise<ResponseInfo> => {
  return defHttp.post({
    url: Api.reqPymPwdLockInfo
  });
};

/**
 * @description IO-MID2-O-0305 – 사용자별결제수단목록조회(결제시)
 * @param {string} utlzSvcDvsCd 이용서비스구분코드(B:버스, H:고속, C:시외, O:온다, T:따릉이, X:씽씽, FG: 운송중개)
 * @returns {Promise<PaymentManagement>} 사용자별 결제 수단 목록
 */
export const pymMnsListAtPym = (utlzSvcDvsCd: string): Promise<PaymentManagement> => {
  return defHttp.post({
    params: {
      utlzSvcDvsCd: utlzSvcDvsCd
    },
    url: Api.pymMnsListAtPym
  });
};

/**
 * @description IO-MID2-O-0334 - 결제 비밀번호 확인 요청
 * @param {string} encPwd
 * @param {string} encPwdCfrm
 * @returns {Promise<ResponseInfo>}
 */
export const reqPymPwdCfrm = (params: RequestPasswordConfirm): Promise<ResponseInfo> => {
  return defHttp.post({
    params: params,
    url: Api.reqPymPwdCfrm
  });
};

/**
 * @description IO-MID2-O-0335 – 결제수단 삭제가능여부 조회
 * @param {string} pymMnsId required true
 * @param {string} paymentKey required false
 * @returns {Promise<DeletionPossibility>}
 */
export const inqrPymMnsDltPsbYN = (params: RequestDeletionPossibility): Promise<DeletionPossibility> => {
  return defHttp.post({
    params: params,
    url: Api.pymMnsDltPsbYN
  });
};
