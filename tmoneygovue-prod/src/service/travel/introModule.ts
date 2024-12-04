import { defineStore } from 'pinia';
import type {
  BannerData,
  BestPrdData,
  CategoryData,
  ReqAdvrList,
  TrvlMrnpData,
  AdvrData,
  NtcMttrData,
  PopularAreaData
} from './model/introModel';
import {
  reqAdvrPupStupInfo,
  reqAreaList,
  reqBestPrdList,
  reqCategoryList,
  reqEvtBannerList,
  reqMbrTrvlMrnpList,
  reqPopularAreaList,
  reqTrvlMrnpSync
} from './travelApi';
import type { Area } from './model/trvlCmmModel';
import { ALL_CODE, AdvrLocCd } from './travelConsts';

/** @description 인트로팝업광고 요청 */
interface ReqAdvrState {
  reqAdvrParam: ReqAdvrList;
}
/** @description 인트로 */
interface IntroState {
  /** 상품카테고리목록 */
  categoryList: CategoryData[];
  /** 지역목록 */
  areaList: Area[];
  /** 인기여행지목록 */
  popularAreaList: PopularAreaData[];
  /** 베스트상품목록 */
  bestList: BestPrdData[];
  /** 배너목록 */
  bannerList: BannerData[];
  /** 여행예약목록 */
  trvlMrnpList: TrvlMrnpData[];
  /** 공지사항팝업목록 */
  noticePopupList: NtcMttrData[];
  /** 이벤트팝업목록 */
  evtPopupList: AdvrData[];
  evtBannerList: AdvrData[];
}
/** @description 인트로팝업광고 요청 초기화 */
const reqAdvrParamInit = {
  advrSvcDvsCd: 'FG',
  advrLocDvsCd: AdvrLocCd.I
};

export const useTrvlIntroStore = defineStore({
  id: 'travel-intro-store',
  state: (): IntroState & ReqAdvrState => ({
    reqAdvrParam: reqAdvrParamInit,
    categoryList: [],
    areaList: [],
    popularAreaList: [],
    bestList: [],
    bannerList: [],
    trvlMrnpList: [],
    noticePopupList: [],
    evtPopupList: [],
    evtBannerList: []
  }),
  getters: {
    /**
     * @description 인트로화면 카테고리
     * @returns
     */
    getCategoryList(): CategoryData[] {
      return this.categoryList.filter((item) => item.categoryId !== ALL_CODE);
    }
  },
  actions: {
    /**
     * @description 카테고리목록조회
     * @returns
     */
    async reqCatetory() {
      const resCategory = await reqCategoryList();
      if (resCategory) {
        this.categoryList = resCategory;
        return true;
      }
      return false;
    },
    /**
     * @description 지역목록조회
     * @returns
     */
    async reqArea() {
      const resArea = await reqAreaList();
      if (resArea) {
        this.areaList = [{ areaId: 'ALL', areaName: '전체' }, ...resArea];
        return true;
      }
      return false;
    },
    /**
     * @description 베스트상품목록조회
     * @returns
     */
    async reqBestPrdList() {
      const resBest = await reqBestPrdList();
      if (resBest) {
        this.bestList = resBest;
        return true;
      }
      return false;
    },
    /**
     * @description 인기여행지조회
     * @returns
     */
    async reqPopularArea() {
      try {
        const resPopularArea = await reqPopularAreaList();
        if (resPopularArea) {
          this.popularAreaList = [...resPopularArea];
          return true;
        }
      } catch (e) {
        return false;
      }
      return false;
    },
    /**
     * @description 이벤트배너조회
     * @returns
     */
    async reqEvtBannerList() {
      try {
        const resBanner = await reqEvtBannerList();
        if (resBanner) {
          this.bannerList = resBanner;
          return true;
        }
      } catch (e) {
        return false;
      }
      return false;
    },
    /**
     * @description 이벤트 팝업/배너 조회
     * @returns
     */
    async reqAdvrPupStupInfo() {
      try {
        const resPopup = await reqAdvrPupStupInfo(this.reqAdvrParam);
        this.reqAdvrParam.advrLocDvsCd = AdvrLocCd.H;
        const resBanner = await reqAdvrPupStupInfo(this.reqAdvrParam);
        let popupRes = false;
        let bannerRes = false;
        if (resPopup) {
          this.noticePopupList = resPopup.ntcMttrList ?? [];
          this.evtPopupList = resPopup.advrList ?? [];
          popupRes = true;
        }
        if (resBanner) {
          this.evtBannerList = resBanner.advrList ?? [];
          bannerRes = true;
        }
        return popupRes || bannerRes;
      } catch (e) {
        return false;
      }
    },
    /**
     * @description 회원별예약목록
     */
    async reqTrvlMrnp() {
      const resMrnp = await reqMbrTrvlMrnpList();
      if (resMrnp) {
        this.trvlMrnpList = resMrnp;
        return true;
      }
      return false;
    },
    /**
     * @description 회원별예약목록동기화
     */
    async reqTrvlMrnpSync() {
      const res = await reqTrvlMrnpSync();
      if (res) {
        this.trvlMrnpList = res;
        return true;
      }
      return false;
    }
  }
});
