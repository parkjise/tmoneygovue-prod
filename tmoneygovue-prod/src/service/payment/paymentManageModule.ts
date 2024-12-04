import { defineStore } from 'pinia';
import type {
  AppSmpcPym,
  DeletionPossibility,
  PaymentManagement,
  PaymentStatusInfo,
  RepresentPaymentManagement,
  SmpcPym
} from '@/service/payment/model/paymentModel';
import type { RequestDeletionPossibility, RequestPaymentManagement } from '@/service/payment/model/requestModel';
import { inqrPymMnsListAtMng, inqrPymStatusInfo, inqrRprnPymMnsInfo, inqrPymMnsDltPsbYN } from '@/service/payment/api/paymentApi';
import { getAppBridge } from '@/utils';
import type { StplAgreeInfo } from '../terms/model/termsModel';
import { inqrPrpmAutPymStplAgrmYN } from '../terms/termsApi';
import { FlexResponseCode } from '@/utils/hybrid/type';

interface paymentManageState {
  representPaymentManagement: RepresentPaymentManagement;
  paymentManagement: PaymentManagement;
  paymentStatusInfo: PaymentStatusInfo;
  deletionPossibility: DeletionPossibility;
}

export const representPaymentManagementInit = {
  respCd: '',
  respMsg: '',
  rprnPaymentKey: '',
  issurCd: '',
  rprnPymMnsId: '',
  rprnPymMnsNm: ''
};
export const paymentManagementInit = {
  respCd: '',
  respMsg: '',
  rprnPymMnsId: '',
  rprnPaymentKey: '',
  rprnElwlProdCd: '',
  rollingBnrList: []
};
export const paymentStatusInfoInit = {
  pwdLockYn: 'N',
  pwdExistingYn: 'N',
  pwdUseYn: 'N'
};
export const termsAgreeInfoInit = {
  stplList: [],
  rspCd: '',
  rspMsg: ''
};
export const deletionPossibilityInit= {
  rspCd: '',
  rspMsg: '',
  moappMbrsSno: '',
  pymMnsId: '',
  paymentKey: '',
  dtlPsbYn: '',
  utlzMblt: '',
  msg: '',
};

export const usePaymentManageStore = defineStore({
  id: 'payment-manage-store',

  state: (): paymentManageState => ({
    representPaymentManagement: representPaymentManagementInit,
    paymentManagement: paymentManagementInit,
    paymentStatusInfo: paymentStatusInfoInit,
    deletionPossibility: deletionPossibilityInit,
  }),
  getters: {
    //대표결제수단등록유무
    getRepresentManagementUse(): boolean {
      return this.representPaymentManagement.rprnPaymentKey === '';
    },
    // 티머니페이 등록 여부
    getTmoneyPayInfoRegistered(): boolean {
      return (
        this.paymentManagement.tmoneyPayInfo?.mbrsUseYn === 'Y' &&
        this.paymentManagement.tmoneyPayInfo?.elwlProdList?.length > 0
      );
    },
    // 비즈페이 등록 여부
    getBizPayInfoRegistered(): boolean {
      return this.paymentManagement.bizPayInfo?.mbrsUseYn === 'Y';
    },
    // 네이버페이 등록 여부
    getNaverPayRegistered(): boolean {
      return (
        Boolean(this.paymentManagement.npayPymInfo?.cardCpNm) && Boolean(this.paymentManagement.npayPymInfo?.cardNum4th)
      );
    },
    // 토스페이 등록 여부
    getTossPayRegistered(): boolean {
      return (
        Boolean(this.paymentManagement.tspyPymInfo?.cardCpNm) && Boolean(this.paymentManagement.tspyPymInfo?.cardNum4th)
      );
    },
    // 신용/체크카드 등록 여부
    getSmpcPayRegistered(): boolean {
      return (
        this.paymentManagement.smpcPymInfo?.smpcPymList !== undefined &&
        this.paymentManagement.smpcPymInfo?.smpcPymList !== null &&
        this.paymentManagement.smpcPymInfo?.smpcPymList.length > 0
      );
    },
    // 결제 비밀번호 잠김 여부
    getPasswordLocked(): boolean {
      return this.paymentStatusInfo.pwdLockYn === 'Y';
    },
    // 결제 비밀번호 존재 여부
    getPasswordExist(): boolean {
      return this.paymentStatusInfo.pwdExistingYn === 'Y';
    },
    // 결제 비밀번호 사용 여부
    getPasswordUse(): boolean {
      return this.paymentStatusInfo.pwdUseYn === 'Y';
    }
  },
  actions: {
    /**
     * 대표결제수단정보
     */
    async requestRepresentManagement(param: RequestPaymentManagement): Promise<void> {
      const res = await inqrRprnPymMnsInfo(param);
      if (res) {
        this.representPaymentManagement = res;
      }
    },
    /**
     * 사용자별 결제 수단 정보
     * 1. api를 통해 조회한 결제수단 정보
     * 2. AppDatabase에 등록된 정보 추가
     */
    async requestPaymentManagement(): Promise<void> {
      // api 통한 결제 수단 등록
      const res = await inqrPymMnsListAtMng();
      if (res) {
        // 간편결제리스트 주카드 우선 정렬
        if (res && res.smpcPymInfo?.smpcPymList) {
          res.smpcPymInfo.smpcPymList.sort((a: SmpcPym, b: SmpcPym) => {
            const rprnCardYnA = this.representPaymentManagement.rprnPaymentKey === a.paymentKey;
            const rprnCardYnB = this.representPaymentManagement.rprnPaymentKey === b.paymentKey;
            if (rprnCardYnA && !rprnCardYnB) {
              return -1;
            }
            if (!rprnCardYnA && rprnCardYnB) {
              return 1;
            }
            return 0;
          });
        }
        this.paymentManagement = res;
      }
      // Appdatabase에 등록된 정보
      await this.setSmpcAppPaymentInfo();
    },
    /**
     * AppDatabase에 등록된 간편결제 정보 추가
     */
    async setSmpcAppPaymentInfo(): Promise<void> {
      const appBridge = await getAppBridge();
      const appRes = await appBridge.getCardList();
      if (appRes && appRes.response.code === FlexResponseCode.OK) {
        if (appRes.smpcPymList) {
          // 주카드 우선 정렬
          if (appRes.smpcPymList) {
            appRes.smpcPymList.sort((a: AppSmpcPym, b: AppSmpcPym) => {
              if (a.rprnCardYn === 'Y' && b.rprnCardYn !== 'Y') {
                return -1;
              }
              if (a.rprnCardYn !== 'Y' && b.rprnCardYn === 'Y') {
                return 1;
              }
              return 0;
            });
          }
          this.paymentManagement.appSmpcPymList = appRes.smpcPymList;
        }
      }
    },
    /**
     * 결제 비밀번호 정보
     */
    async requestPaymentStatusInfo(): Promise<void> {
      const res = await inqrPymStatusInfo();
      if (res) {
        this.paymentStatusInfo = res;
      }
    },
    /**
     * 결제 비밀번호 사용 여부 변경
     */
    setPaymentPasswordUse(useYn: string): void {
      this.paymentStatusInfo.pwdUseYn = useYn;
    },
    /**
     * 사전등록자동결제약관 동의여부 조회
     * @param stplTypCd 이용약관 그룹코드
     */
    async requestAutoPaymentAgreeList(stplTypCd: string): Promise<StplAgreeInfo[]> {
      const res = await inqrPrpmAutPymStplAgrmYN(stplTypCd);
      if (res) {
        return res.stplList.map((item: StplAgreeInfo) => {
          return {
            ...item,
            stplCheck: item.stplAgrmYn === 'Y'
          };
        });
      }
      return [];
    },
    /**
     * 결제수단 삭제 가능 여부 조회
     */
    async requestDeletionPossibility(param: RequestDeletionPossibility): Promise<DeletionPossibility> {
      const res = await inqrPymMnsDltPsbYN(param);
      if (res) {
        this.deletionPossibility = res;
      }
      return this.deletionPossibility;
    },
  }
});
