import { defineStore } from 'pinia';
import type {
  ReqChkByPltf,
  ReqTrvlCanc,
  ReqTrvlMrnpDtlInfo,
  ReqUserInfoData,
  ResPaymentDtlInfo,
  ResPaymentReceiptInfo,
  ResTrvlCancInfo,
  ResTrvlMrnpDtlInfo,
  ResUserInfoData,
  TrvlCancRgtData
} from '@/service/usage-history/model/travelHistoryModel';
import {
  reqTrvlMrnpDtl,
  reqUserInfoList,
  reqUpdatePassengerInfo,
  reqPaymentDtl,
  reqPaymentReceipt,
  reqPaymentCancInfo,
  reqTrvlCancRgt,
  reqTrvlPymCanc,
  reqChkByPltf
} from '@/service/usage-history/api/travelHistoryApi';
import type { PassengerData } from '@/service/travel/reservationModule';
import { TrvlMrsSta, TrvlPymPrcgSta } from '../travel/travelConsts';
import { travelErrCheck } from '@/views/travel/travelUtils';

/**
 * @description 여행이용자정보목록
 */
interface TrvlMrnpDtlListState {
  trvlMrnpSno: string;
  trvlMrnpDtlList: ResUserInfoData[];
}
/**
 * @description 여행예약상세정보조회
 */
interface TrvlMrnpDtlState {
  reqMrnpDtlParam: ReqTrvlMrnpDtlInfo;
  trvlMrnpDtl: ResTrvlMrnpDtlInfo | null;
  isPayCancel: boolean;
  isReserveCancel: boolean;
  qrData: {
    tmgMbrsSno: string;
    trvlMrnpSno: string;
    trvlTissuId: string;
  };
}
/**
 * @description 여행이용자정보수정 요청
 */
interface ReqUpdateTrvlUserState {
  reqTrvlUserList: ReqUserInfoData[];
}
/**
 * @description 여행결제상세정보조회 응답
 */
interface ResPaymentDtlState {
  paymentDtl: ResPaymentDtlInfo | null;
}
/**
 * @description 여행결제영수증조회 응답
 */
interface ResPaymentReceiptState {
  paymentRecp: ResPaymentReceiptInfo | null;
}
/**
 * @description 여행취소정보조회 응답
 */
interface ResTrvlCancInfoState {
  trvlCancInfo: ResTrvlCancInfo | null;
}
/**
 * @description 여행취소등록요청/여행결제취소요청 요청
 */
interface ReqTrvlCancState {
  reqTrvlCancData: ReqTrvlCanc | null;
}
const reqMrnpDtlParamInit = {
  trvlMrnpSno: '',
  trvlMrsStaCd: '',
  trvlMrnpCancSqno: ''
};
const qrDataInit = {
  tmgMbrsSno: '',
  trvlMrnpSno: '',
  trvlTissuId: ''
};

export const useHistoryStore = defineStore({
  id: 'travel-history-store',
  state: (): TrvlMrnpDtlListState &
    TrvlMrnpDtlState &
    ResPaymentDtlState &
    ReqUpdateTrvlUserState &
    ResPaymentReceiptState &
    ResTrvlCancInfoState &
    ReqTrvlCancState => ({
    trvlMrnpSno: '',
    trvlMrnpDtlList: [],
    reqMrnpDtlParam: reqMrnpDtlParamInit,
    trvlMrnpDtl: null,
    isPayCancel: false,
    isReserveCancel: false,
    reqTrvlUserList: [],
    paymentDtl: null,
    paymentRecp: null,
    trvlCancInfo: null,
    reqTrvlCancData: null,
    qrData: qrDataInit
  }),
  getters: {},
  actions: {
    /**
     * @description 여행예약상세정보조회 요청 파라미터 저장
     * @param trvlMrnpSno 여행예약일련번호, 여행예매상태코드, 여행예약취소순번
     */
    setReqMrnpDtlParam(param: ReqTrvlMrnpDtlInfo) {
      this.trvlMrnpSno = param.trvlMrnpSno;
      this.reqMrnpDtlParam.trvlMrnpSno = param.trvlMrnpSno;
      this.reqMrnpDtlParam.trvlMrsStaCd = param.trvlMrsStaCd || '';
      this.reqMrnpDtlParam.trvlMrnpCancSqno = param.trvlMrnpCancSqno || '';
    },
    /**
     * @description 여행예약상세정보조회
     * @param param 여행예약일련번호, 여행예매상태코드, 여행예약취소순번
     */
    async reqTrvlMrnpDtl(param?: ReqTrvlMrnpDtlInfo) {
      if (param) this.setReqMrnpDtlParam(param);
      const res = await reqTrvlMrnpDtl(this.reqMrnpDtlParam);

      const errChk = travelErrCheck(res);

      if (!errChk) return { res: false, msg: res?.err_msg };

      const dta = res as unknown as ResTrvlMrnpDtlInfo;
      this.trvlMrnpDtl = dta;
      this.isReserveCancel = this.reqMrnpDtlParam.trvlMrsStaCd === TrvlMrsSta.CANC;
      return { res: true };
    },
    async reqChkByPltf(params: ReqChkByPltf) {
      try {
        const res = await reqChkByPltf(params);
        if (res) {
          return res;
        }
      } catch (e) {
        return null;
      }
      return null;
    },
    /**
     * @description 여행이용자정보목록조회
     */
    async reqUserInfoList() {
      const res = await reqUserInfoList({ trvlMrnpSno: this.trvlMrnpSno });
      if (res) {
        this.trvlMrnpDtlList = res;
      }
    },
    /**
     * @description 여행이용자정보 저장
     * @param data 이용자정보
     */
    setUserPsngInfo(data: PassengerData[]) {
      this.reqTrvlUserList = data.map((item, idx) => {
        return {
          trvlMrnpSno: this.trvlMrnpSno,
          trvlMrnpSqno: idx + 1,
          psngFrnm: item.psngFrnm || '',
          psngMbphNo: item.psngMbphNo || '',
          psngGndrCd: item.psngGndrCd || ''
        };
      });
    },
    /**
     * @description 여행이용자정보수정 요청
     */
    async reqUpdatePassengerInfo() {
      const reqParam: ReqUserInfoData[] = [];
      this.reqTrvlUserList.forEach((data) => {
        reqParam.push({
          trvlMrnpSno: data.trvlMrnpSno,
          trvlMrnpSqno: data.trvlMrnpSqno,
          psngFrnm: data.psngFrnm || '',
          psngMbphNo: data.psngMbphNo || '',
          psngGndrCd: data.psngGndrCd || ''
        });
      });
      const res = await reqUpdatePassengerInfo({ trvlMrnpDtlList: reqParam });
      return res?.err_cod === undefined;
    },
    /**
     * @description 여행결제상세정보조회
     * @returns
     */
    async reqPaymentDtl() {
      const res = await reqPaymentDtl({ trvlMrnpSno: this.trvlMrnpSno });
      if (res) {
        this.paymentDtl = res;
        this.isPayCancel = res.trvlPymPrcgStaCd !== TrvlPymPrcgSta.PYM_COMP;
        return true;
      }
      return false;
    },
    /**
     * @description 여행결제영수증조회
     * @returns
     */
    async reqPaymentReceipt() {
      const res = await reqPaymentReceipt({ trvlMrnpSno: this.trvlMrnpSno });
      if (res) {
        this.paymentRecp = res;
        return true;
      }
      return false;
    },
    /**
     * @description 여행취소정보조회
     */
    async reqPaymentCancInfo(trvlMrnpSno?: string) {
      this.trvlMrnpSno = trvlMrnpSno ?? this.trvlMrnpSno;
      const res = await reqPaymentCancInfo({ trvlMrnpSno: this.trvlMrnpSno });

      if (res && !res.err_cod) {
        this.trvlCancInfo = res as unknown as ResTrvlCancInfo;
        return { message: '', flag: true };
      }

      const errChk = travelErrCheck(res);
      if (!errChk) return { message: res?.err_msg ?? '', flag: false };
    },
    /**
     * @description 여행취소등록요청
     */
    async reqTrvlCancRgt(reqTrvlCancDataList: TrvlCancRgtData[]): Promise<{ message: string; flag: boolean }> {
      if (reqTrvlCancDataList) {
        const res = await reqTrvlCancRgt({ trvlMrnpDtlList: reqTrvlCancDataList });
        if (!res) return { message: '', flag: true };
        return { message: res?.err_msg ?? '', flag: travelErrCheck(res) };
      }
      return { message: '', flag: false };
    },
    /**
     * @description 여행결제취소요청
     */
    async reqTrvlCancPayment(reqTrvlCancDataList: TrvlCancRgtData[]): Promise<{ message: string; flag: boolean }> {
      if (reqTrvlCancDataList) {
        const res = await reqTrvlPymCanc({ trvlMrnpDtlList: reqTrvlCancDataList });
        if (!res) return { message: '', flag: true };
        return { message: res?.err_msg ?? '', flag: travelErrCheck(res) };
      }
      return { message: '', flag: false };
    },
    /**
     * @description 수동검표에 필요한 파라미터 저장
     */
    setReqQrScreenData(qrData: { tmgMbrsSno: string; trvlMrnpSno: string; trvlTissuId: string }) {
      this.qrData = qrData;
    },
    initCancInfo() {
      this.trvlCancInfo = null;
    }
  }
});
