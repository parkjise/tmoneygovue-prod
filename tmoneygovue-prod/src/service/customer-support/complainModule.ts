import { defineStore } from 'pinia';
import type {
  resComplainListModel,
  complainInfoModel,
  resComplainGroupModel,
  reqComplainGroupModel,
  complainGroupModel,
  complainTypeModel,
  reqComplainRegistModel,
  reqComplainDeleteModel
} from '@/service/customer-support/model/complainModel';
import {
  getComplainList,
  getComplainTypeList,
  registComplain,
  deleteComplain
} from '@/service/customer-support/complainApi';

interface complainState {
  resComplainList: resComplainListModel;
  complainInfoList: complainInfoModel[];
  complainTypeList: resComplainGroupModel;
  complainDetailTypes: complainTypeModel[];
  checkedCvcpTypGrpNm: string;
  checkedCvcpTypDtlNm: string;
  checkedCvcpTypDtlCd: string;
  isLast: boolean;
  tabIndex: number;
  complainDetail: complainInfoModel;
}

// 1:1 민원 목록 초기화
export const resComplainListInit = {
  msg: '',
  inqrCnt: 0,
  cvcpList: []
};

// 민원 유형 목록 초기화
export const complaiTypeListInit = {
  msg: '',
  cvcpTypGrpList: []
};

export const complainDetailInit = {
  cvcpSno: '',
  rgtDtm: '',
  cvcpTypCd: '',
  cvcpTypNm: '',
  cvcpTtlNm: '',
  cvcpCtt: '',
  answYn: '',
  answTtlNm: '',
  answCtt: '',
  answDtm: ''
};

export const useComplainStore = defineStore({
  id: 'complain-store',

  state: (): complainState => ({
    resComplainList: resComplainListInit,
    complainInfoList: [],
    complainTypeList: complaiTypeListInit,
    complainDetailTypes: [],
    checkedCvcpTypGrpNm: '',
    checkedCvcpTypDtlNm: '',
    checkedCvcpTypDtlCd: '',
    isLast: true,
    tabIndex: 0,
    complainDetail: complainDetailInit
  }),

  getters: {
    isComplainHistoryExist(): boolean {
      return this.complainInfoList.length === 0;
    },
    getComplainTypes(): complainGroupModel[] {
      return this.complainTypeList.cvcpTypGrpList;
    },
    getComplainDetailTypes(): complainTypeModel[] {
      return this.complainDetailTypes;
    },
    getTabIndex(): number {
      return this.tabIndex;
    },
    getComplainDetail(): complainInfoModel {
      return this.complainDetail;
    }
  },
  actions: {
    /**
     * 1:1 문의 조회 조회
     * @param
     * @returns resComplainListModel
     */
    async setComplainList(pageNo: number) {
      this.resComplainList = resComplainListInit;
      if (pageNo === 1) {
        this.complainInfoList = [];
        this.isLast = false;
      }
      const params = {
        pageNo: pageNo
      };
      const res = await getComplainList(params);
      if (res) {
        this.resComplainList = res;
        if (res.cvcpList) {
          this.complainInfoList.push(...res.cvcpList);
          this.isLast = res.cvcpList.length < 1;
        }
      }
      return res;
    },

    /**
     * 1:1 문의 유형 리스트 조회
     * @param
     * @returns setComplainTypeListAction
     */
    async setComplainTypeListAction(params: reqComplainGroupModel) {
      this.complainTypeList = complaiTypeListInit;
      const res = await getComplainTypeList(params);
      if (res) {
        this.complainTypeList = res;
      }
      return res;
    },

    /**
     * 1:1 문의 생성
     * @param
     * @returns deleteComplainAction
     */
    async registComplainAction(params: reqComplainRegistModel) {
      const res = await registComplain(params);
      return res;
    },

    /**
     * 1:1 문의 삭제
     * @param
     * @returns deleteComplainAction
     */
    async deleteComplainAction(params: reqComplainDeleteModel) {
      const res = await deleteComplain(params);
      return res;
    },

    /**
     * 1:1 문의 타입 상세
     * @param
     * @returns setComplainDetailTypes
     */
    setComplainDetailTypes(complainTypes: complainTypeModel[]) {
      this.complainDetailTypes = complainTypes;
    },

    /**
     * 삭제된 1:1 문의 목록에서 제거
     * @param
     * @returns deleteComplainAction
     */
    setDeletedComplain(deleteIndex: number) {
      this.complainInfoList.splice(deleteIndex, 1);
    },

    /**
     * 1:1 문의 유형 선택 초기화
     * @param
     * @returns deleteComplainAction
     */
    setComplainTypeInit() {
      this.checkedCvcpTypDtlCd = '';
      this.checkedCvcpTypDtlNm = '';
      this.checkedCvcpTypGrpNm = this.complainTypeList.cvcpTypGrpList[0].cvcpTypGrpNm ?? '';
      this.complainDetailTypes = this.complainTypeList.cvcpTypGrpList[0].cvcpTypDtlList ?? [];
    },
    /**
     * TabIndex 저장(0: 문의하기, 1: 문의내역 보기 )
     */
    setTabIndex(idx: number) {
      this.tabIndex = idx;
    },

    /**
     * 1:1 문의 상세
     */
    setComplainDetail(complainInfo: complainInfoModel) {
      this.complainDetail = complainInfo;
    },

    /**
     * 1:1 문의 상세 찾기
     */
    async searchComplainDetail(cvcpSno: string) {
      let pageNo = 1;
      let flag = true;
      while (flag) {
        const res = await this.setComplainList(pageNo);
        const complain = res.cvcpList.find((item) => item.cvcpSno === cvcpSno);
        if (complain) {
          this.complainDetail = complain;
          break;
        }
        if (this.isLast) {
          this.complainDetail = complainDetailInit;
          flag = false;
        } else {
          pageNo++;
        }
      }
    }
  }
});
