import { defineStore } from 'pinia';

import { reqDAlcnList, reqMntlAlcnList, reqSatsList } from './travelApi';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { formatDate } from '@/utils/dateUtils';
import type {
  ReqMntlAlcnList,
  ResMntlAlcnData,
  ReqDAlcnList,
  ResDAlcnData,
  ReqSatsList,
  ResSatsList,
  BusTckData
} from './model/reservationModel';
import { TravelErorCodeEnum } from '@/utils/http/axios/enum/httpEnum';
import { cloneDeep } from 'lodash-es';

/**
 * @description 월간배차목록조회
 */
interface MntlAlcnListState {
  reqMntlAlcnInfo: ReqMntlAlcnList;
  resMntlAlcnList: ResMntlAlcnData[];
}
/**
 * @description 일별배차목록조회
 */
interface DAlcnListState {
  selDate: Dayjs;
  selAlcnSqno: number; // = rotSqno(노선순번)
  reqDAlcnListParam: ReqDAlcnList;
  resDAlcnList: ResDAlcnData[];
}
/**
 * @description 잔여석목록조회
 */
interface SatsListState {
  reqSatsListParam: ReqSatsList;
  resSatsList: ResSatsList;
}
/**
 * @description 선택좌석정보
 */
export interface SelSatsState {
  selSatsList: TckData[];
}
export interface TckData extends BusTckData {
  busTckCnt: number;
}
/**
 * @description 예약자정보
 */
interface BookerState {
  bookerInfo: BookerData;
}
/**
 * @description 여행이용자정보
 */
interface PassengerState {
  isSameBookerInfo: boolean;
  isFromPaymentPage: boolean;
  trvlMrnpDtlList: PassengerData[];
}
/**
 * @description 예약자정보
 */
export interface BookerData {
  psngFrnm: string;
  psngMbphNo: string;
  psngEmail: string;
  mrnpReqCtt: string;
}
export interface PassengerData {
  psngFrnm: string; // 승객이름
  psngMbphNo: string; //승객휴대폰번호
  psngGndrCd: string; //승객성별코드
  typeCd?: string; //승객타입
  typeNm?: string;
  evcpUseYn?: string; //이벤트쿠폰사용여부
  isShow?: boolean;
}
/**
 * @description 월간배차목록조회 요청 init
 */
const reqMntlAlcnInit = {
  reqSttDt: '',
  reqEndDt: '',
  trvlRotId: ''
};
/**
 * @description 월간배차목록조회 응답 init
 */
const resMntlAlcnInit = [
  {
    alcnDt: '',
    adltFee: 0
  }
];
/**
 * @description 일별배차목록조회 요청 init
 */
const reqDAlcnListInit = {
  atlDeprDt: '',
  atlDeprTime: '',
  trvlRotId: ''
};
/**
 * @description 잔여석목록조회 요청 init
 */
const reqSatsListInit = {
  trvlRotId: '',
  rotSqno: -1,
  alcnDt: '',
  alcnSqno: -1,
  stptTrmlCd: '',
  eptTrmlCd: ''
};
/**
 * @description 잔여석목록조회 응답 init
 */
const resSatsListInit = {
  dist: 0,
  mvmnDrtm: '0',
  sellPsbSatsNum: 0,
  satiUseYn: 'N',
  busTckKndNum: 0,
  busTckList: [],
  rmnSatsNum: 0
};
/**
 * @description 선택배차정보 init
 */
export const selSatsInfoInit = {
  adltCount: 0,
  chldCount: 0
};
/**
 * @description 예약자정보 init
 */
const bookerInfoInit = {
  psngFrnm: '',
  psngMbphNo: '',
  psngEmail: '',
  mrnpReqCtt: ''
};

const dAlcnInfoInit = {
  trvlRotId: '',
  rotSqno: 0,
  deprTrmlCd: '',
  deprTrmlNm: '',
  alcnDt: '',
  alcnSqno: 0,
  stptTrmlCd: '',
  eptTrmlCd: '',
  atlDeprDt: '',
  atlDeprTime: '',
  allSatsNum: '',
  rmnSatsNum: '',
  mrsPsbYn: '',
  mvmnDrtm: '',
  thruTrmlYn: '',
  alcnStaCd: '',
  adltFee: 0,
  chldFee: 0,
  busClsCd: ''
};

export const useReservationStore = defineStore({
  id: 'travel-reservation-store',
  state: (): MntlAlcnListState & DAlcnListState & SatsListState & SelSatsState & PassengerState & BookerState => ({
    reqMntlAlcnInfo: reqMntlAlcnInit,
    resMntlAlcnList: resMntlAlcnInit,
    reqDAlcnListParam: reqDAlcnListInit,
    resDAlcnList: [],
    reqSatsListParam: reqSatsListInit,
    resSatsList: resSatsListInit,
    selDate: dayjs(),
    selAlcnSqno: 0,
    selSatsList: [],
    isSameBookerInfo: false,
    isFromPaymentPage: true,
    trvlMrnpDtlList: [],
    bookerInfo: bookerInfoInit
  }),
  getters: {
    /**
     * @description 현재 선택한 배차(일일)정보 노출
     * @returns {ResDAlcnData} getDAlcnInfo
     */
    getDAlcnInfo(): ResDAlcnData {
      if (this.resDAlcnList === null) return dAlcnInfoInit;
      return (
        this.resDAlcnList.filter(
          (d) => d.alcnDt === formatDate(this.selDate, 'YYYYMMDD') && d.rotSqno === this.selAlcnSqno
        )[0] ?? reqDAlcnListInit
      );
    },
    getTotalPassengerCnt(): number {
      return this.selSatsList.reduce((acc, cur) => {
        return acc + cur.busTckCnt;
      }, 0);
    },
    getTotalPrice(): number {
      return this.selSatsList.reduce((acc, cur) => {
        return acc + cur.busTckCnt * cur.fee;
      }, 0);
    }
  },
  actions: {
    /**
     * @description 월배차목록조회
     * @param param
     * @returns
     */
    async reqMntlAlcnList(param: ReqMntlAlcnList) {
      const res = await reqMntlAlcnList(param);
      if (res) {
        this.resMntlAlcnList = res;
        return true;
      }
      return false;
    },
    /**
     * @description 일별배차목록조회
     * @param param
     * @returns
     */
    async reqDAlcnList(param: ReqDAlcnList) {
      this.reqDAlcnListParam = param;
      let res = await reqDAlcnList(this.reqDAlcnListParam);

      if (res?.err_cod && res.err_cod !== TravelErorCodeEnum.SUCCESS) return false;
      if (res===null) return true;

      const dta = res as unknown as ResDAlcnData[];
      this.resDAlcnList = dta;

      return this.resDAlcnList !== null && this.resDAlcnList.length > 0;
    },
    /**
     * @description 잔여석목록조회
     * @param param
     */
    async reqSatsList() {
      const reqParam = {
        trvlRotId: this.getDAlcnInfo.trvlRotId,
        rotSqno: this.getDAlcnInfo.rotSqno,
        alcnDt: this.getDAlcnInfo.alcnDt,
        alcnSqno: this.getDAlcnInfo.alcnSqno,
        stptTrmlCd: this.getDAlcnInfo.deprTrmlCd,
        eptTrmlCd: this.getDAlcnInfo.eptTrmlCd
      };
      const res = await reqSatsList(reqParam);
      if (res) {
        this.resSatsList = res;
        this.selSatsList = [];
        if (res.busTckList) {
          res.busTckList.forEach((d) => {
            this.selSatsList.push({
              busTckKndCd: d.busTckKndCd,
              busTckKndNm: d.busTckKndNm,
              fee: d.fee,
              busTckCnt: 0
            });
          });
          return true;
        }
      }
      return false;
    },
    setIsFromPaymentPage(data: boolean) {
      this.isFromPaymentPage = data;
    },
    /**
     * @description 선택일자 저장
     * @param date
     */
    setSelectedDate(date: Dayjs) {
      this.selDate = date;
    },
    /**
     * @description 선택일배차정보 저장
     * @param data
     */
    setAlcnSqno(rotSqno: number) {
      this.selAlcnSqno = rotSqno;
    },
    /**
     * @description 선택인원정보 저장
     * @param data
     */
    async setSelSatsInfo(data: TckData[]) {
      this.selSatsList = data;
    },
    /**
     * @description 예약자정보 저장
     * @param data
     */
    setBookerInfo(data?: BookerData) {
      this.bookerInfo = data ? data : cloneDeep(bookerInfoInit);
    },
    /**
     * @description 이용자정보 저장
     * @param data
     */
    setPassengerInfo(data: PassengerData[], isSameBookerInfo?: boolean) {
      this.isSameBookerInfo = isSameBookerInfo ?? false;
      this.trvlMrnpDtlList = data;
    },
    async initMntlAlcnList() {
      this.resMntlAlcnList = [];
    },
    async initStore() {
      this.reqMntlAlcnInfo = reqMntlAlcnInit;
      this.resMntlAlcnList = resMntlAlcnInit;
      this.reqDAlcnListParam = reqDAlcnListInit;
      this.resDAlcnList = [];
      this.reqSatsListParam = reqSatsListInit;
      this.resSatsList = resSatsListInit;
      this.selDate = dayjs();
      this.selAlcnSqno = 0;
      this.selSatsList = [];
      this.isSameBookerInfo = false;
      this.isFromPaymentPage = true;
      this.trvlMrnpDtlList = [];
      this.bookerInfo = bookerInfoInit;
    }
  }
});
