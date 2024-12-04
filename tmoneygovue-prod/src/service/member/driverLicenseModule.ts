import { defineStore } from 'pinia';
import type {
  reqCheckDriverLicenseModel,
  reqRemoveDriverLicenseModel,
  reqDriverLicenceTypeListModel,
  resDriverLicenceTypeListModel,
  resDriverLicenceTermList,
  stplInfo
} from '@/service/member/model/driverLicenseModel';
import {
  checkDriverLicense,
  removeDriverLicense,
  getDriverLicenceTypeList,
  getDriverLicenceTermList
} from '@/service/member/driverLicenseApi';

interface driverLicenseState {
  driverLicenceTypeList: resDriverLicenceTypeListModel;
  driverLicenceTermList: resDriverLicenceTermList;
  checkedLcnsKndCd: string;
  checkedLcnsKndNm: string;
}

export const driverLicenceTypeListInit = {
  rspCd: '',
  rspMsg: '',
  cmnCdId: '',
  cmnCdNm: '',
  codeList: []
};

export const driverLicenceTermListInit = {
  rspCd: '',
  rspTtl: '',
  rspMsg: '',
  data: { stplList: [] }
};

export const useDriverLicense = defineStore({
  id: 'dirver-license-store',

  state: (): driverLicenseState => ({
    driverLicenceTypeList: driverLicenceTypeListInit,
    driverLicenceTermList: driverLicenceTermListInit,
    checkedLcnsKndCd: '',
    checkedLcnsKndNm: ''
  }),
  getters: {
    getDriverLicenceTypeList(): resDriverLicenceTypeListModel {
      return this.driverLicenceTypeList;
    },
    getDriverLicenceTermList(): stplInfo[] {
      return this.driverLicenceTermList.data.stplList;
    }
  },
  actions: {
    /**
     * 운전자 면허 정보 검증
     * @param param reqCheckDriverLicenseModel
     * @returns resCheckDriverLicenseModel
     */
    async checkDriverLicense(param: reqCheckDriverLicenseModel) {
      const res = await checkDriverLicense(param);
      return res;
    },
    /**
     * 스쿠터 운전 면허 정보 삭제
     * @param param reqRemoveDriverLicenseModel
     * @returns resDriverLicenceTypeListModel
     */
    async removeDriverLicense(param: reqRemoveDriverLicenseModel) {
      const res = await removeDriverLicense(param);
      return res;
    },
    /**
     * 공통코드 조회 (운전면허종별코드)
     * @param param reqRemoveDriverLicenseModel
     * @returns reqRemoveDriverLicenseModel
     */
    async setDriverLicenceTypeList(param: reqDriverLicenceTypeListModel) {
      const res = await getDriverLicenceTypeList(param);
      this.driverLicenceTypeList = res;
    },
    /**
     * 페이지정보 조회 (운전면허등록 페이지 약관조회)
     * @param param string
     * @returns resDriverLicenceTermList
     */
    async setDriverLicenceTermList(param: string) {
      const res = await getDriverLicenceTermList(param);
      this.driverLicenceTermList = res;
    },
    /**
     * 약관 동의 해제
     * @param
     * @returns
     */
    disagreeAll() {
      for (const element of this.driverLicenceTermList.data.stplList) {
        element.stplCheck = false;
      }
    }
  }
});
