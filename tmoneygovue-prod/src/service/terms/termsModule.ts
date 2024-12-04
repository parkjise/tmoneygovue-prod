import { defineStore } from 'pinia';
import type { TermsInfo, StplGroupInfo } from '@/service/terms/model/termsModel';
import { inqrStplList, inqrStplListAll } from '@/service/terms/termsApi';
import type { ReqTermsInfo, reqJoinStplAgreeInfo, reqStplAgreeInfo } from './model/requestModel';
import { getAppBridge } from '@/utils';

interface termsState {
  reqTermsInfo: ReqTermsInfo;
  termsInfo: TermsInfo;
  isLoadingTermsList: boolean;
  isDoneTermsList: boolean;
  errorTermsList: string;
  termsAgreeCallback?: any;
  allChecked: boolean;
  mrkgTermYn?: string;
  utlzSvcDvsCdList : string[];
}

export interface ServiceItem {
  utlzSvcDvsCd: string;
  required: boolean;
};

export interface ServiceMap {
  [key: string]: ServiceItem[];
};

// 약관관련 정보 초기화
export const termsInfoInit = {
  stplList: [] as StplGroupInfo[],
  msg: ''
};

// 약관리스트 조회 초기화
export const reqTermsInfoInit = {
  svcDvsCd: '',
  stplGrpCd: ''
};

export const useTermsStore = defineStore({
  id: 'term-store',
  state: (): termsState => ({
    reqTermsInfo: reqTermsInfoInit,
    termsInfo: termsInfoInit,
    isLoadingTermsList: false,
    isDoneTermsList: false,
    errorTermsList: '',
    allChecked: false,
    mrkgTermYn: '',
    utlzSvcDvsCdList : [],
  }),
  getters: {
    getStplListExist(): boolean {
      return this.termsInfo.stplList.length < 1;
    },
    getStplListAllChecked(): boolean {
      // 모든 stplDtlList가 체크되었는지 여부를 저장할 변수
      let allChecked = true;

      // 각 stplGroup 안의 stplDtlList를 순회하며 체크 여부 확인
      this.termsInfo.stplList.forEach((group) => {
        let allCheckedInGroup = true;  // 그룹별 체크여부
        
        group.stplDtlList.forEach((detail) => {
          if (detail.stplCheck === undefined || !detail.stplCheck) {
            allChecked = false;
            allCheckedInGroup = false; 
            group.isChecked = false;
            return;  // 체크되지 않은 항목이 발견되면 반복문 종료
          }
        });

        if (allCheckedInGroup) {
          group.isChecked = true;  // 그룹 내 모든 항목이 체크되었으면 그룹을 체크된 상태로 설정
        }
        if(allChecked == true){
          group.isChecked = true;
        }
      });

      return allChecked;
    },
    getStplListCanAgree(): boolean {
      // 모든 stplDtlList가 체크되었는지 여부를 저장할 변수
      let allChecked = true;

      // 각 stplGroup 안의 stplDtlList를 순회하며 체크 여부 확인
      this.termsInfo.stplList.forEach((group) => {
        if(group.isRequired){
          group.stplDtlList.forEach((detail) => {
            // 필수 항목인 경우에만 체크 여부 확인
            if (detail.mndtYn === 'Y') {
              if (detail.stplCheck === undefined) {
                allChecked = false;
                return;
              }
              if (!detail.stplCheck) {
                // 필수 항목이 체크되지 않은 경우, allChecked를 false로 설정하고 반복문 탈출
                allChecked = false;
                return;
              }
            }
          });
        }
      });

      return allChecked;
    },
    getAgreedStplList(): reqStplAgreeInfo[] {
      const arr: reqStplAgreeInfo[] = [];
      this.termsInfo.stplList.forEach((group) => {
        group.stplDtlList.forEach((detail) => {
          arr.push({
            stplSno: detail.sno,
            agrmYn: detail.stplCheck ? 'Y' : 'N'
          });
        });
      });
      return arr;
    },
    getStplAllList(): reqJoinStplAgreeInfo[] {
      const result: reqJoinStplAgreeInfo[] = [];
      this.termsInfo.stplList.forEach((group) => {
        const arr: reqStplAgreeInfo[] = [];
        group.stplDtlList.forEach((detail) => {
          if(detail.sno == '20210616000000000228'){
            this.mrkgTermYn = detail.stplCheck ? 'Y' : 'N'
          }
          arr.push({
            stplSno: detail.sno,
            agrmYn: detail.stplCheck ? 'Y' : 'N'
          });
        });
        result.push({
          utlzSvcDvsCd: group.utlzSvcDvsCd,
          stplList: arr
        });
      });
      return result;
    },
    getMrkgYn(): string {
      return this.mrkgTermYn || '';
    },
  },
  actions: {
    // 약관 리스트 조회
    async setHttpTermsList() {
      this.termsInfo = termsInfoInit;
      this.isLoadingTermsList = true;
      this.isDoneTermsList = false;
      this.errorTermsList = '';
      this.allChecked = false;
      try {
        const res = await inqrStplList(this.reqTermsInfo);
        if (res) {
          this.termsInfo = res;
        }
        this.isLoadingTermsList = false;
        this.isDoneTermsList = true;
        return res;
      } catch (error) {
        this.isLoadingTermsList = false;
        this.isDoneTermsList = false;
        this.errorTermsList = '에러가 발생했습니다. #1';
        return Promise.reject(error);
      }
    },
    async setHttpTermsListAll() {
      this.termsInfo = termsInfoInit;
      this.isLoadingTermsList = true;
      this.isDoneTermsList = false;
      this.errorTermsList = '';
      this.allChecked = false;
      try {
        const res = await inqrStplListAll(this.reqTermsInfo);
        if (res) {
          this.termsInfo = res;
        }
        this.isLoadingTermsList = false;
        this.isDoneTermsList = true;
        return res;
      } catch (error) {
        this.isLoadingTermsList = false;
        this.isDoneTermsList = false;
        this.errorTermsList = '에러가 발생했습니다. #1';
        return Promise.reject(error);
      }
    },
    // 약관사항 전체 체크
    checkAllList(isChecked: boolean) {
      this.termsInfo.stplList.forEach((group) => {
        group.isChecked = isChecked;
        group.stplDtlList.forEach((detail) => {
          detail.stplCheck = isChecked;
        });
      });
      this.allChecked = isChecked;
    },
    checkGroupList(group: string, isChecked: boolean) {
      const groupItem = this.termsInfo.stplList.find(item => item.utlzSvcDvsCd === group);

      if (groupItem) {
        groupItem.stplDtlList.forEach((detail) => {
          detail.stplCheck = isChecked;
        });
      }
      this.allChecked = this.getStplListAllChecked;
    },
    // 약관 항목 체크시 전체 체크 확인
    allCheckChange() {
      this.allChecked = this.getStplListAllChecked;
    },
    // 초기 데이터 세팅
    initParam(params: ReqTermsInfo, agreeFunc: any) {
      this.reqTermsInfo = params;
      if (agreeFunc) {
        this.termsAgreeCallback = agreeFunc;
      }
    },
    // 콜백 받아와서 실행
    async executeCallback() {
      if (this.termsAgreeCallback) {
        // 콜백함수 실행
        this.termsAgreeCallback();
      }else{
        // 없을경우 웹뷰 닫기
        console.log('executeCallback')
        const appBridge = await getAppBridge()
        await appBridge.closeWebView()
      }
      // callback후 초기화
      this.reqTermsInfo = reqTermsInfoInit;
      this.termsInfo = termsInfoInit;
      this.allChecked = false;
    },
    setTermsInfo(item : TermsInfo){
      this.termsInfo = item;
    }
  }
});
