import { defineStore } from 'pinia';
import type { ResponseNoticeDtlInfo, ResponseNoticeList, noticeDtlInfo } from './model/noticeModel';
import { getNoticeDtlInfo, getNoticeListInfo } from './noticeApi';

const noticeInfo = {
  faqTypCd: '',
  moappSno: '',
  mblOsKndCd: '',
  moappVer: '',
  rnwlNedYn: '',
  rgsrId: '',
  rgtDtm: '',
  updrId: '',
  updDtm: '',
  ntfcTtlNm: '',
  ntfcCtt: '',
  cnctMoappUrlVal: '',
  faqCtgCd: '',
  cateTitle: '',
  cdSndAdtnInfCtt: '',
  cateCd: '',
  cateNm: '',
  dtlCmnCdNm: '',
  faqTtlNm: '',
  faqCtt: '',
  keyWord: '',
  moappNtcMttrSno: '',
  ntcMttrDvsCd: '',
  ntcMttrDvsNm: '',
  ntcMttrTtlNm: '',
  ntcMttrCtt: '',
  bltnSttDtm: '',
  bltnEndDtm: '',
  bltnYn: '',
  dotUseYn: '',
  dotUseSttDtm: '',
  dotUseEndDtm: '',
  ntcRgtDtm: '',
  dotScrExprYn: '',
  ntcMttrImgPathVal: '',
  mvmnPathVal: ''
};
const initNoticeList = {
  userAppVer: '',
  noticList: []
};
const initNoticeInfo = {
  rspCd: '',
  rspMsg: '',
  noticeDtlInfo: noticeInfo
};

interface noticeState {
  noticeList: ResponseNoticeList;
  noticeInfo: ResponseNoticeDtlInfo;
}

export const useNoticeStore = defineStore({
  id: 'use-notice-store',

  state: (): noticeState => ({
    // 공지사항 목록
    noticeList: initNoticeList,
    // 공지사항 상세
    noticeInfo: initNoticeInfo
  }),
  getters: {
    // 공지사항 목록
    getNoticeList(): noticeDtlInfo[] {
      return this.noticeList.noticList;
    },
    // 공지사항 상세
    getNoticeInfo(): noticeDtlInfo {
      return this.noticeInfo.noticeDtlInfo;
    }
  },
  actions: {
    /**
     * 공지사항 목록 조회
     */
    async requestNoticeList() {
      try {
        const res = await getNoticeListInfo();
        if (res) {
          this.noticeList = res;
        }
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    /**
     * 공지사항 상세
     * @param {string} moappNtcMttrSno
     * @returns
     */
    async requestNoticeDetail(moappNtcMttrSno: string) {
      try {
        const res = await getNoticeDtlInfo(moappNtcMttrSno);
        if (res) {
          this.noticeInfo = res;
        }
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
});
