import { defineStore } from 'pinia';
import type {
  RequestMileageExchange,
  RequestMileageGuide,
  RequestMileageHistory,
  RequestMileageInfo,
  ResponseMileageExchange,
  ResponseMileageGuide,
  ResponseMileageHistoryList,
  ResponseMileageInfo,
  mileageGuide
} from './model/goMileageModel';
import {
  getGTTMlgBeforeInfo,
  getMileageExchange,
  getMileageGuide,
  getMileageHistory,
  getSearchTMlg,
  inqrMileageExpiredYn
} from './goMileageApi';
import { getSpfStplAgree, getSpfStplAgrmYn } from '@/service/terms/termsApi';
import type { StplAgreeInfo, TermsAgreeInfo } from '@/service/terms/model/termsModel';
import type { ReqSpfTermsAgree } from '@/service/terms/model/requestModel';

const initMileageHistoryList = {
  mlgList: [],
  nxtMonExpiSchdAmt: 0,
  aftNxtMonExpiSchdAmt: 0,
  mlgAcmtSchdAmt: 0,
  mbrsMlgAmt: 0,
  monExpiSchdAmt: 0,
  mlgUseAmt: 0,
  msg: '',
  scsYn: ''
};
const initSpfStplInfo = {
  stplList: [],
  rspCd: '',
  rspMsg: ''
};
const initMileageBeforeInfo = {
  infoImgPath: '',
  mlgSwtcUGD: '',
  stplList: [],
  allStplAgrmYn: '',
  tmnyIntgMbrsYn: '',
  GOMlgAmt: 0,
  TMlgAmt: 0,
  popMsgTtl: '',
  popMsgCtt: '',
  rspCd: '',
  rspMsg: ''
};
const initMileageExchangeInfo = {
  mlgSwtcDtm: '',
  popMsgCtt: '',
  popMsgTtl: '',
  swtcMlgScsYn: '',
  rmnTmnyMlgAmt: 0,
  rmnTmgMlgAmt: 0,
  mlgSwtcAmt: 0,
  rspCd: '',
  rspMsg: ''
};
const initMileageGuide = {
  rspCd: '',
  rspMsg: '',
  data: []
};

interface mileageState {
  isLast: boolean;
  mileageHistoryList: ResponseMileageHistoryList;
  mileageSpfStplInfo: TermsAgreeInfo;
  mileageBeforeInfo: ResponseMileageInfo;
  mileageExchangeInfo: ResponseMileageExchange;
  mileageGuideInfo: ResponseMileageGuide;
}

export const useGoMileageStore = defineStore({
  id: 'use-go-milege-store',
  state: (): mileageState => ({
    // paging(false: 더보기)
    isLast: false,
    // 마일리지 내역 정보
    mileageHistoryList: initMileageHistoryList,
    // 마일리지 약관 정보
    mileageSpfStplInfo: initSpfStplInfo,
    // 마일리지 전환 사전 정보
    mileageBeforeInfo: initMileageBeforeInfo,
    // 마일리지 전환 정보
    mileageExchangeInfo: initMileageExchangeInfo,
    // GO마일리지 적립 및 사용안내 정보
    mileageGuideInfo: initMileageGuide
  }),
  getters: {
    // 마일리지 내역 정보
    getMileageHistoryList(): ResponseMileageHistoryList {
      return this.mileageHistoryList;
    },
    // 마일리지 약관 목록
    getSpfStplInfo(): StplAgreeInfo[] {
      return this.mileageSpfStplInfo.stplList;
    },
    // 마일리지 전환 사전 정보
    getMileageBeforeInfo(): ResponseMileageInfo {
      return this.mileageBeforeInfo;
    },
    // 마일리지 전환 메인 약관
    getMileageBeforeInfoStpl(): StplAgreeInfo[] {
      return this.mileageBeforeInfo.stplList;
    },
    // 티머니 회원 여부
    getNotTmoneyMembers(): boolean {
      return (
        this.mileageBeforeInfo.tmnyIntgMbrsYn === '' ||
        this.mileageBeforeInfo.tmnyIntgMbrsYn === 'N' ||
        this.mileageBeforeInfo.tmnyIntgMbrsYn === null
      );
    },
    // 약관 동의 여부(약관동의 === "Y" && 티머니 회원 === "Y")
    getAllAgreeTerms(): boolean {
      return this.mileageBeforeInfo.allStplAgrmYn === 'Y' && this.mileageBeforeInfo.tmnyIntgMbrsYn === 'Y';
    },
    // 마일리지 전환 유의사항
    getMileageExchangeNotes(): string {
      return this.mileageBeforeInfo.mlgSwtcUGD;
    },
    // 마일리지 전환 정보
    getMileageExchangeInfo(): ResponseMileageExchange {
      return this.mileageExchangeInfo;
    },
    // GO마일리지 적립 및 사용안내 정보
    getMileageGuideInfo(): mileageGuide[] {
      return this.mileageGuideInfo.data;
    }
  },
  actions: {
    /**
     * GO마일리지 내역 조회
     */
    async requestMileageHistoryList(param: RequestMileageHistory, isMore: boolean) {
      try {
        const res = await getMileageHistory(param);
        console.log(res.mlgList.length);
        if (res) {
          if (!isMore) {
            // 처음 조회
            this.mileageHistoryList = res;
            this.isLast = res.mlgList.length >= 20 ? false : true;
          } else {
            // 더보기
            this.mileageHistoryList.mlgList.push(...res.mlgList);
            this.isLast = res.mlgList.length < 20;
          }
        }
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * GO마일리지 약관
     * GO마일리지 내역 조회 -> 밑에 배너에서 약관
     * @param {string} stplTypCd 약관유형코드("A")
     */
    async requestSpfStplAgrmYN(stplTypCd: string) {
      try {
        const res = await getSpfStplAgrmYn(stplTypCd);
        if (res) {
          this.mileageSpfStplInfo = {
            stplList: res.stplList.map((item) => ({
              ...item,
              stplCheck: item.stplAgrmYn === 'Y'
            })),
            rspCd: res.rspCd,
            rspMsg: res.rspMsg
          };
        }
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * 모든 약관 체크 여부
     */
    getIsAllCheck(): boolean {
      let allChecked = true;

      for (let i = 0; i < this.mileageSpfStplInfo.stplList.length; i++) {
        const item = this.mileageSpfStplInfo.stplList[i];
        if (item.stplCheck === undefined || !item.stplCheck) {
          allChecked = false;
          break;
        }
      }
      return allChecked;
    },
    /**
     * 특정약관 동의정보 등록
     */
    async requestRegisterTermAgreeYN(param: ReqSpfTermsAgree) {
      try {
        const res = await getSpfStplAgree(param);
        if (res) {
          return res;
        }
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * 마일리지 전환 사전정보 조회
     */
    async requestMileageBeforeInfo(param: RequestMileageInfo) {
      try {
        const res = await getGTTMlgBeforeInfo(param);
        if (res) {
          this.mileageBeforeInfo = res;
        }
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * T마일리지 조회하기
     */
    async requestSearchTMlg(param: RequestMileageInfo) {
      try {
        const res = await getSearchTMlg(param);
        if (res) {
          this.mileageBeforeInfo = res;
        }
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * 마일리지 전환
     */
    async requestMileageExchange(param: RequestMileageExchange) {
      try {
        const res = await getMileageExchange(param);
        if (res) {
          this.mileageExchangeInfo = res;
        }
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * GO마일리지 적립 및 사용안내
     */
    async requestMileageGuide(param: RequestMileageGuide) {
      try {
        const res = await getMileageGuide(param);
        if (res) {
          this.mileageGuideInfo = res;
        }
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    // GO마일리지 내역 초기화
    initMileageHistory() {
      this.mileageHistoryList.mlgList = [];
    },
    /**
     * 마일리지 소멸 여부 확인
     */
    async requestMileageExpiredYn() {
      try {
        const res = await inqrMileageExpiredYn();
        if (res) {
          return res.mlgExpiYn;
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
});
