import { defineStore } from 'pinia';
import { reqPrdSrchKwd, reqSelKeywords, reqSelPrdBanner, reqSelPrdPlanList } from './travelApi';

import type { SrchPlanData, AscAreaData, AscPrdData } from './model/searchModel';
import type { BannerData } from './model/introModel';

/** @description 검색화면 응답 */
interface SearchState {
  keywordList: string[];
  srchPlanList: SrchPlanData[];
  srchBannerList: BannerData[];
  // 연관검색어
  srchAreaList: AscAreaData[];
  keywords: string[];
  prdList: AscPrdData[];
}
type SearchFullState = SearchState;
export const useTrvlSrchStore = defineStore({
  id: 'travel-search-store',
  state: (): SearchFullState => ({
    keywordList: [],
    srchPlanList: [],
    srchBannerList: [],
    srchAreaList: [],
    keywords: [],
    prdList: []
  }),
  getters: {},
  actions: {
    /**
     * @description 상품검색화면 조회
     * @returns
     */
    async reqTrvlSearch() {
      let keywordErr = false;
      let bannerErr = false;

      const resPlanList = await reqSelPrdPlanList();
      if (resPlanList) this.srchPlanList = resPlanList;

      try {
        const resKeywords = await reqSelKeywords();
        if (resKeywords) this.keywordList = resKeywords;
      } catch (e) {
        keywordErr = true;
      }
      try {
        const resBanner = await reqSelPrdBanner();
        if (resBanner) this.srchBannerList = resBanner;
      } catch (e) {
        bannerErr = true;
      }

      return { keywordErr, bannerErr };
    },
    /**
     * @description 연관검색어 조회
     */
    async reqPrdSrchKwd(keyword: string) {
      try {
        const res = await reqPrdSrchKwd({ keyword: keyword });
        if (res) {
          this.srchAreaList = res.areaList;
          this.keywords = res.keywords;
          this.prdList = res.prdList;
          return true;
        }
      } catch (e) {
        return false;
      }
      return false;
    }
  }
});
