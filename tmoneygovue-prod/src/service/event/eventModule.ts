import { defineStore } from 'pinia';
import type {
  RequestEventDtlInfo,
  RequestEventList,
  ResponseEventDtlInfo,
  ResponseEventList,
  eventInfo
} from './model/eventModel';
import { getEventDtlInfo, getMoappEventList } from './eventApi';
import type { ReqEventTermAgreeInfo } from '../terms/model/requestModel';
import { getEventTerms, getEventTermsAgree } from '../terms/termsApi';
import type { ResponseEventTermInfo, resStplInfo } from '../terms/model/responseModel';

const initEventList = {
  evntList: [],
  inqrNcnt: 0
};
const initEventDetail = {
  imgLinkUrl: '',
  rspCd: '',
  rspMsg: '',
  scrnNm: '',
  webviewScrnDetail: [],
  webviewScrnMaster: []
};
const initEventStplInfo = {
  stplList: [],
  rspCd: '',
  rspMsg: ''
};

interface eventState {
  eventList: ResponseEventList;
  eventDetail: ResponseEventDtlInfo;
  eventStplInfo: ResponseEventTermInfo;
}

export const useEventStore = defineStore({
  id: 'use-event-store',

  state: (): eventState => ({
    // 이벤트 목록
    eventList: initEventList,
    // 이벤트 상세
    eventDetail: initEventDetail,
    // 이벤트 약관 정보
    eventStplInfo: initEventStplInfo
  }),
  getters: {
    // 이벤트 목록
    getEventList(): eventInfo[] {
      return this.eventList.evntList;
    },
    // 이벤트 상세
    getEventDetailInfo(): ResponseEventDtlInfo {
      return this.eventDetail;
    },
    // 이벤트 약관 목록
    getEventStplInfo(): resStplInfo[] {
      return this.eventStplInfo.stplList;
    }
  },
  actions: {
    /**
     * @description 이벤트 목록
     */
    async requestEventList(param: RequestEventList) {
      try {
        const res = await getMoappEventList(param);
        if (res) {
          this.eventList = res;
        }
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * @description 이벤트 상세
     */
    async requestEventDetail(param: RequestEventDtlInfo) {
      try {
        const res = await getEventDtlInfo(param);
        if (res) {
          this.eventDetail = res;
        }
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * @description 이벤트 상세 -> 약관
     */
    async requestEventStplInfo(param: ReqEventTermAgreeInfo) {
      try {
        const res = await getEventTerms(param);
        if (res) {
          this.eventStplInfo = {
            stplList: res.stplList.map((item: resStplInfo) => {
              return {
                ...item,
                stplCheck: item.stplAgrmYn === 'Y'
              };
            }),
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
     *@description  이벤트 상세 -> 약관 동의
     */
    async requestEventTermsAgree(param: ReqEventTermAgreeInfo) {
      try {
        const res = await getEventTermsAgree(param);
        if (res) {
          return res;
        }
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * @description 모든 약관 체크 여부
     */
    getIsAllCheck(): boolean {
      let allChecked = true;

      for (let i = 0; i < this.eventStplInfo.stplList.length; i++) {
        const item = this.eventStplInfo.stplList[i];
        if (item.stplCheck === undefined || !item.stplCheck) {
          allChecked = false;
          break;
        }
      }
      return allChecked;
    },
    /**
     * @description 약관 전체 동의
     */
    setAllCheck(isChecked: boolean) {
      this.eventStplInfo.stplList.forEach((detail) => {
        detail.stplCheck = isChecked;
      });
    }
  }
});
