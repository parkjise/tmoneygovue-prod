import { defineStore } from 'pinia';
import type { ProductData, ResProductDtl, ReqTravelProduct, ReqProductDtl } from './model/productModel';
import { reqPrdList, reqPrdDtl } from './travelApi';
import { ALL_CODE, Sort, TicketCatgrCd } from './travelConsts';
import { LocalStorageKey } from '@/utils/constants/globalConstants';
import { cloneDeep } from 'lodash-es';
import type { Total } from './model/trvlCmmModel';

/**
 * @description 여행상품목록
 */
interface PrdLstState extends Total {
  prdList: ProductData[]; //상품목록
  productDtl: ResProductDtl | null; //상품상세
  trvlPrdId: string;
  filter: FilterState; //상품목록조회 요청 파라미터
}
export interface FilterState {
  areaIds?: string[];
  categoryId?: string;
  themeIds?: string[];
  lowPrice?: number;
  highPrice?: number;
  sort?: string;
}
interface PageState {
  page: number;
  size: number;
}
const prdListInit = {
  totalItems: 0,
  totalPages: 0,
  prdList: []
};
const filterInit = {
  areaIds: [ALL_CODE],
  categoryId: '',
  themeIds: [ALL_CODE],
  lowPrice: 0,
  highPrice: 0,
  sort: Sort.RECOMMEND.value
};

type PrdState = PrdLstState & PageState;
export const useProductStore = defineStore({
  id: 'travel-product-store',

  state: (): PrdState => ({
    totalItems: prdListInit.totalItems,
    totalPages: prdListInit.totalPages,
    prdList: prdListInit.prdList,
    productDtl: null,
    filter: filterInit,
    page: 1,
    size: 20,
    trvlPrdId: ''
  }),
  getters: {
    /**
     * @description 티켓상품여부
     * @returns
     */
    getIsTicketPrd(): boolean {
      if (this.productDtl)
        return this.productDtl.categoryList.findIndex((item) => item.categoryId === TicketCatgrCd) > -1;
      return false;
    }
  },
  actions: {
    /**
     * @description 여행상품목록조회
     * @returns
     */
    async reqPrdList(moreSearch: boolean, keyword: string) {
      this.page = moreSearch ? this.page + 1 : 1;
      const categoryIds = [];
      const areaIds = [];

      if (this.filter.categoryId !== ALL_CODE) {
        categoryIds.push(this.filter.categoryId);
      }

      if (this.filter.themeIds && !this.filter?.themeIds?.includes(ALL_CODE)) {
        categoryIds.push(...this.filter.themeIds);
      }

      if (this.filter.areaIds && !this.filter.areaIds.includes(ALL_CODE)) {
        areaIds.push(...this.filter.areaIds);
      }

      const reqParam: ReqTravelProduct = {
        keyword: keyword,
        areaIds: areaIds.join(','),
        categoryIds: categoryIds.join(','),
        sort: this.filter.sort,
        lowPrice: this.filter.lowPrice,
        ...((this.filter.highPrice || 0 > 0) && { highPrice: this.filter.highPrice }),
        page: this.page,
        size: this.size
      };
      try {
        const res = await reqPrdList(reqParam);
        if (res) {
          this.totalItems = res.totalItems;
          this.totalPages = res.totalPages;
          if (moreSearch) {
            this.prdList.push(...res.prdList);
          } else {
            this.prdList = res.prdList;
          }
          return true;
        }
      } catch (e) {
        return false;
      }
      return false;
    },
    /**
     * @description 더보기 상품목록 세팅
     * @param param 더보기 상품목록
     */
    async setMorePrdList(param: ProductData[]) {
      this.prdList = this.prdList.concat(param);
    },
    /**
     * @description 필터 초기화
     */
    initFilter() {
      this.filter = cloneDeep(filterInit);
    },
    /**
     * @description 필터 저장(검색어 제외)
     * @param filter
     */
    setFilter(filter: FilterState) {
      this.filter.categoryId = filter.categoryId;
      this.filter.areaIds = filter?.areaIds ?? this.filter.areaIds;
      this.filter.themeIds = filter.themeIds;
      this.filter.sort = filter.sort ?? this.filter.sort;
      this.filter.highPrice = filter.highPrice ?? this.filter.highPrice;
      this.filter.lowPrice = filter.lowPrice ?? this.filter.lowPrice;
    },
    /**
     * @description 상품상세 조회
     * @param id 상품ID
     */
    async reqTrvlPrdDtl(trvlPrdId: string) {
      const reqParam: ReqProductDtl = { trvlPrdId: trvlPrdId };
      this.trvlPrdId = trvlPrdId;
      const res = await reqPrdDtl(reqParam);
      if (res) {
        this.productDtl = res;
        // 최근조회상품 저장
        localStorage.setItem(
          LocalStorageKey.RCTLY_PRD,
          JSON.stringify({ trvlPrdId: res.trvlPrdId, trvlPrdNm: res.trvlPrdNm })
        );
        return true;
      }
      return false;
    },
    initStore() {
      this.totalItems = prdListInit.totalItems;
      this.totalPages = prdListInit.totalPages;
      this.prdList = prdListInit.prdList;
      this.productDtl = null;
      this.filter = cloneDeep(filterInit);
      this.page = 1;
      this.size = 20;
      this.trvlPrdId = '';
    }
  }
});
