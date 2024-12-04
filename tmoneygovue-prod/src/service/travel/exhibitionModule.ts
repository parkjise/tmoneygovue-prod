import { defineStore } from 'pinia';
import { reqExhbtDtl, reqExhbtList } from './travelApi';
import type { PlanData, ResPlanDtlData } from './model/exhibitionModel';
import { cloneDeep } from 'lodash-es';

/** @description 기획전목록 */
interface ExhibitionState {
  // 요청
  reqExhbtParam: {
    page: number;
    size: number;
  };
  // 응답
  exhbtList: {
    totalItems: number;
    totalPages: number;
    planList: PlanData[];
  };
}
/** @description 기획전상세 */
interface ExhibitionDtlState {
  // 요청
  planId: string;
  // 응답
  exhbtDtl: ResPlanDtlData;
}
/** @description 기획전상세 응답 초기화 */
const exhbtDtlInit = {
  planId: '',
  title: '',
  startDate: '',
  endDate: '',
  imageUrl: '',
  totalItems: 0,
  totalPages: 0,
  prdList: []
};

const pageInit = {
  page: 0,
  size: 20
};
type ExhbtFullState = ExhibitionState & ExhibitionDtlState;
export const useTrvlExbhtStore = defineStore({
  id: 'travel-exhbt-store',
  state: (): ExhbtFullState => ({
    reqExhbtParam: pageInit,
    exhbtList: {
      totalItems: 0,
      totalPages: 0,
      planList: []
    },
    planId: '',
    exhbtDtl: exhbtDtlInit
  }),
  getters: {},
  actions: {
    /**
     * @description 기획전목록 조회
     */
    async reqExhbtList(isMore?: boolean) {
      this.reqExhbtParam.page = isMore ? this.reqExhbtParam.page++ : 1;
      try {
        const res = await reqExhbtList(this.reqExhbtParam);
        if (res) {
          this.exhbtList.totalItems = res.totalItems;
          this.exhbtList.totalPages = res.totalPages;
          this.exhbtList.planList = res.planList;
          return true;
        }
      } catch (e) {
        return false;
      }
      return false;
    },
    /**
     * @description 기획전상세 조회
     */
    async reqExhbtDtl(planId: string) {
      this.planId = planId;
      const res = await reqExhbtDtl({ planId: this.planId });
      if (res) {
        this.exhbtDtl = res;
        return true;
      }
      return false;
    },
    initStore() {
      this.reqExhbtParam = cloneDeep(pageInit);
      this.exhbtList = {
        totalItems: 0,
        totalPages: 0,
        planList: []
      };
      this.planId = '';
      this.exhbtDtl = cloneDeep(exhbtDtlInit);
    }
  }
});
