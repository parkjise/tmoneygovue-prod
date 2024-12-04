import { defineStore } from 'pinia';
import type {
  reqMbrMileageCouponCntInfoModel,
  resMbrMileageCouponCntInfoModel
} from '@/service/main/model/moreMainModel';
import type { PaymentManagement, RepresentPaymentManagement, SmpcPym } from '@/service/payment/model/paymentModel';
import type { RequestPaymentManagement } from '@/service/payment/model/requestModel';
import type { CouponModel } from '@/service/coupon/model/couponModel';
import { paymentManagementInit, representPaymentManagementInit } from '@/service/payment/paymentManageModule';
import { mbrMileageCouponCntInfoInit } from '@/service/main/moreMainModule';
import { termsInfoInit } from '@/service/terms/termsModule';
import { getMbrMileageCouponCntInfo } from '@/service/main/moreMainApi';
import { inqrRprnPymMnsInfo, pymMnsListAtPym } from '@/service/payment/api/paymentApi';
import { inqrPsnCpnListBySvc, reqCpnIssu } from '@/service/coupon/couponApi';
import { inqrStplList } from '@/service/terms/termsApi';
import type { OrderInfo, OrderTckData, ReqTrvlPaymentMrnp } from '@/service/order/model/orderModel';
import type { ReqTermsInfo, reqStplAgreeInfo } from '@/service/terms/model/requestModel';
import { couponAmountCalculate, filterCoupon, validateCheck } from '@/utils/couponUtils';
import { type PassengerData, type TckData } from '@/service/travel/reservationModule';
import type { ResDAlcnData } from '@/service/travel/model/reservationModel';
import { cloneDeep } from 'lodash-es';
import { requestPymMrnp } from './orderApi';

export interface PaymentCouponModel extends CouponModel {
  issue: boolean;
  enable: boolean;
  productCategoryList?: string[];
  productThemeList?: string[];
}
interface orderState {
  // 티머니 화면 오픈관련 정보
  tmoneyMoreContent: boolean;
  // 대표 결제수단 정보
  representPaymentManagement: RepresentPaymentManagement;
  // 특정 서비스 보유, 발급 가능 쿠폰 목록 조회
  // couponList: CouponListModel;
  couponError: boolean;
  couponList: Array<PaymentCouponModel>;
  // 사용자별결제수단목록조회(결제시)
  paymentManagementLoad: boolean;
  paymentManagement: PaymentManagement;
  // 회원마일리지 쿠폰 정보
  mbrMileageCouponCntInfo: resMbrMileageCouponCntInfoModel;
  // 입력 결제정보
  orderInfo: OrderInfo;
  // 이용구분코드
  utlzSvcDvsCd: string;
  // 여행예약일련번호
  trvlMrnpSno: string;
}

export const PaymentType = {
  NONE: 0,
  TMONEY: 1,
  CARD: 3,
  TOSS_PAY: 12,
  NAVER_PAY: 13
};

export const PaymentCd = {
  TMONEY: 'B',
  CARD: 'C',
  TOSS_PAY: 'T',
  NAVER_PAY: 'N'
};

const dAlcInfoInit = {
  trvlRotId: '',
  rotSqno: 0,
  deprTrmlCd: '',
  deprTrmlNm: '',
  alcnDt: '',
  alcnSqno: 0,
  stptTrmlCd: '',
  eptTrmlCd: '',
  atlDeprDt: '',
  atlDeprTime: '',
  allSatsNum: '',
  rmnSatsNum: '',
  mrsPsbYn: '',
  mvmnDrtm: '',
  thruTrmlYn: '',
  alcnStaCd: '',
  adltFee: 0,
  chldFee: 0,
  busClsCd: ''
};

export const orderInfoInit = {
  pymMnsId: '',
  pymKndCd: '',
  pymMnsNm: '',
  paymentKey: '',
  cpn: {
    cpnDfntSno: '',
    cpnNm: '',
    cpnSno: '',
    dcCtt: '',
    dcAmt: 0,
    applyType: '',
    applyTypeNm: '',
    dcKndCd: '',
    dcRt: 0,
    applyAmt: 0
  },
  tmgMlgPymAmt: 0,
  tMlgAmt: 0,
  termsInfo: termsInfoInit,
  selSatsList: [],
  dAlcnInfo: dAlcInfoInit,
  productDtl: null,
  trvlMrnpDtlList: [],
  installment: '00'
};

export const orderSmpcInit = {
  billingKey: '',
  msknCardNoVal: '',
  cardCpNm: '',
  mipTerm: ''
};

export const orderPayInit = {
  billAuthData: {},
  mipTerm: '',
  oderSno: ''
};

export const orderTmpyInit = {
  virtCardRfrnId: '',
  elwlPrdCd: '',
  tmnyMlgPymAmt: 0
};

export const useOrderStore = defineStore({
  id: 'order-store',
  state: (): orderState => ({
    tmoneyMoreContent: false,
    couponError: false,
    representPaymentManagement: representPaymentManagementInit,
    couponList: [],
    paymentManagementLoad: false,
    paymentManagement: paymentManagementInit,
    mbrMileageCouponCntInfo: mbrMileageCouponCntInfoInit,
    orderInfo: cloneDeep(orderInfoInit),
    utlzSvcDvsCd: '',
    trvlMrnpSno: ''
  }),
  getters: {
    //대표결제수단등록유무
    getRepresentManagementUse(): boolean {
      return this.representPaymentManagement.rprnPaymentKey === '';
    },
    // 대표결제수단정보
    getRepresentPaymentManagement(): RepresentPaymentManagement {
      return this.representPaymentManagement;
    },
    // 예매건 있는 타입 return
    getCntSatsList(): OrderTckData[] {
      return this.orderInfo.selSatsList.filter((item) => item.busTckCnt > 0);
    },
    // 다중타입 예매건 여부
    getMultiTypeReservation(): boolean {
      return (
        this.orderInfo.selSatsList.length > 0 &&
        this.orderInfo.selSatsList.filter((item) => item.busTckCnt > 0).length > 1
      );
    },
    // 티머니페이 노출 여부
    getTmoneyPayInfoDisplay(): boolean {
      return this.paymentManagement.tmoneyPayInfo?.displayYn === 'Y';
    },
    // 티머니페이 등록 여부
    getTmoneyPayInfoRegistered(): boolean {
      return (
        this.paymentManagement.tmoneyPayInfo?.mbrsUseYn === 'Y' &&
        this.paymentManagement.tmoneyPayInfo?.elwlProdList?.length > 0
      );
    },
    // 비즈페이 노출 여부
    getBizPayInfoDisplay(): boolean {
      return this.paymentManagement.bizPayInfo?.displayYn === 'Y';
    },
    // 비즈페이 등록 여부
    getBizPayInfoRegistered(): boolean {
      return this.paymentManagement.bizPayInfo?.mbrsUseYn === 'Y';
    },
    // 네이버페이 노출 여부
    getNaverPayInfoDisplay(): boolean {
      return this.paymentManagement.npayPymInfo?.displayYn === 'Y';
    },
    // 토스페이 노출 여부
    getTossPayInfoDisplay(): boolean {
      return this.paymentManagement.tspyPymInfo?.displayYn === 'Y';
    },
    // 신용카드 노출 여부
    getSmpcPayInfoDisplay(): boolean {
      return this.paymentManagement.smpcPymInfo?.displayYn === 'Y';
    },
    // 네이버페이 자동결제 등록 여부
    getNaverPayRegistered(): boolean {
      return (
        this.paymentManagement.npayautPymInfo?.cardCpNm !== undefined &&
        this.paymentManagement.npayautPymInfo?.cardCpNm !== null &&
        this.paymentManagement.npayautPymInfo?.cardCpNm !== '' &&
        this.paymentManagement.npayautPymInfo?.cardNum4th !== undefined &&
        this.paymentManagement.npayautPymInfo?.cardNum4th !== null &&
        this.paymentManagement.npayautPymInfo?.cardNum4th !== ''
      );
    },
    // 토스페이 자동결제 등록 여부
    getTossPayRegistered(): boolean {
      return (
        this.paymentManagement.tspyautPymInfo?.cardCpNm !== undefined &&
        this.paymentManagement.tspyautPymInfo?.cardCpNm !== null &&
        this.paymentManagement.tspyautPymInfo?.cardCpNm !== '' &&
        this.paymentManagement.tspyautPymInfo?.cardNum4th !== undefined &&
        this.paymentManagement.tspyautPymInfo?.cardNum4th !== null &&
        this.paymentManagement.tspyautPymInfo?.cardNum4th !== ''
      );
    },
    // 신용카드 등록 여부
    getSmpcPayRegistered(): boolean {
      return (
        this.paymentManagement.smpcPymInfo !== undefined &&
        this.paymentManagement.smpcPymInfo &&
        this.paymentManagement.smpcPymInfo?.smpcPymList &&
        this.paymentManagement.smpcPymInfo?.smpcPymList.length > 0
      );
    },
    // 적용 가능한 쿠폰
    getPsnCouponCount(): number {
      return this.couponList.filter((d) => !d.issue && d.enable)?.length;
    },
    // 발급 가능한 쿠폰
    getIssueCouponCount(): number {
      return this.couponList.filter((d) => d.issue && d.enable)?.length;
    },
    // 쿠폰적용 여부
    getOrderCouponApplied(): boolean {
      return this.orderInfo.cpn?.cpnSno !== '' && this.orderInfo.cpn?.applyType !== '';
    },
    // 이용약관 전체 선택 체크여부
    getTermAllChecked(): boolean {
      return this.orderInfo.termsInfo.stplList.every((group) => group.stplDtlList.every((detail) => detail.stplCheck));
    },
    // 결제수단 결제금액
    getPaymentAmount(): number {
      const cpn = this.orderInfo.cpn?.cpnSno === '' ? 0 : this.orderInfo.cpn?.applyAmt;
      return this.getTotalFee - cpn - this.orderInfo.tmgMlgPymAmt;
    },
    // 총결제 금액
    getTotalFee(): number {
      return this.orderInfo.selSatsList.reduce((total, item) => {
        return total + item.fee * item.busTckCnt;
      }, 0);
    },
    // 마일리지 100프로 결제 체크
    // 전체금액 - cpn이 마일리지 금액과 같은경우
    isMileageAllPay(): boolean {
      const cpn = this.orderInfo.cpn?.cpnSno === '' ? 0 : this.orderInfo.cpn?.applyAmt;
      return this.getTotalFee - cpn === this.orderInfo.tmgMlgPymAmt;
    },
    // 총 이용객 카운트
    getTotalPsngCount(): number {
      return this.orderInfo.selSatsList.reduce((total, item) => {
        return total + item.busTckCnt;
      }, 0);
    },
    // 할부개월수 라벨
    getInstallment(): string {
      return this.orderInfo.installment == '00' ? '일시불' : `${+this.orderInfo.installment}개월`;
    },
    // 티머니Go적립금액 계산액
    getTmgAcmtAmt(): number {
      return this.orderInfo.productDtl?.famtFxrtDvsCd === '10'
        ? this.orderInfo.productDtl?.ctAmt || 0
        : this.orderInfo.productDtl?.famtFxrtDvsCd === '20'
          ? this.getPaymentAmount * (this.orderInfo.productDtl?.ctRt / 100)
          : 0;
    },
    // 결제수단명
    getPymMnsNm(): string {
      switch (this.isMileageAllPay ? 'TMGM' : this.orderInfo.pymMnsId) {
        case 'TMPY':
          if (this.orderInfo.paymentKey === '2100400801') {
            return '티머니Pay&GO';
          } else {
            return '페이머니';
          }
        case 'NPAYA':
          return '네이버페이(자동)';
        case 'NPAY':
          return '네이버페이(일반)';
        case 'TSPYA':
          return '토스페이(자동)';
        case 'TSPY':
          return '토스페이(일반)';
        case 'PRPM':
          return `신용카드(
            ${
              (this.getSmpcPayRegistered &&
                this.paymentManagement.smpcPymInfo?.smpcPymList.find((d) => d.paymentKey === this.orderInfo.paymentKey)
                  ?.cardName) ||
              ''
            })`;
        case 'TMGM':
          return 'GO마일리지전액결제';
        default:
          return '';
      }
    },
    // 동의한 약관 리스트 추출
    getAgreedStplList(): reqStplAgreeInfo[] {
      const arr: reqStplAgreeInfo[] = [];
      this.orderInfo.termsInfo.stplList.forEach((group) => {
        group.stplDtlList.forEach((detail) => {
          arr.push({
            stplSno: detail.sno,
            agrmYn: detail.stplCheck ? 'Y' : 'N'
          });
        });
      });
      return arr;
    }
  },
  actions: {
    /**
     * @description 여행결제예약요청
     * @param param ReqTrvlPaymentMrnp
     */
    async requestTrvlPymMrnp(param: ReqTrvlPaymentMrnp) {
      const res = await requestPymMrnp(param);
      if (res) this.trvlMrnpSno = res.trvlMrnpSno;
    },
    /**
     * @description 대표결제수단정보
     * @param param RequestPaymentManagement
     */
    async requestRepresentManagement(param: RequestPaymentManagement): Promise<void> {
      const res = await inqrRprnPymMnsInfo(param);
      if (res) {
        this.representPaymentManagement = res;
        // 대표결제수단 지정된 경우, 적용한 값이 없을경우
        if (this.orderInfo.pymKndCd === '') {
          this.orderInfo.pymMnsId = res.rprnPymMnsId;
          this.orderInfo.paymentKey = res.rprnPaymentKey;
        }
      }
    },
    /**
     * @description 특정 서비스 보유, 발급 가능 쿠폰 목록 조회
     * @param utlzSvcDvsCd 이용서비스구분코드(고속:H, 시외:C,온다:O,따릉이:T,씽씽:X,FG:운송중개)
     */
    // issue: 발급가능, enable: 사용가능 -> 사용이 불가하면 발급도 불가
    async requestCouponList(): Promise<void> {
      this.couponError = false;
      const res = await inqrPsnCpnListBySvc(this.utlzSvcDvsCd);
      if (res) {
        // 쿠폰 등록여부에 따라 issue flag 사용. issue 값에 따라 발급 버튼 표시
        this.couponList = [];
        // 보유 쿠폰
        const psnCpnList = res.psnCpnList.map((v) => {
          const reCpnModel: PaymentCouponModel = v as PaymentCouponModel;
          reCpnModel.issue = false; // 발급 불가 (이미 발급받았기 때문)
          // reCpnModel.enable = true; // 사용 가능
          reCpnModel.enable = validateCheck(reCpnModel.cndtKeyVal);
          return reCpnModel;
        });
        // 발급가능 쿠폰
        const issueList = res.issuCpnList.map((v) => {
          const reCpnModel: PaymentCouponModel = v as PaymentCouponModel;
          reCpnModel.issue = true;
          // reCpnModel.enable = true;
          reCpnModel.enable = validateCheck(reCpnModel.cndtKeyVal);
          return reCpnModel;
        });
        let amount: number = 0;
        let keyCheckInfo: any;
        // 운송중개일경우
        if (this.utlzSvcDvsCd === 'FG') {
          const fees = this.orderInfo.selSatsList.map((item) => item.fee);
          amount = Math.max(...fees);
          keyCheckInfo = this.orderInfo.productDtl;
        }
        const filterList = filterCoupon([...psnCpnList, ...issueList], this.utlzSvcDvsCd, amount, keyCheckInfo);
        this.couponList.push(...filterList);
      } else {
        this.couponError = true;
      }
    },
    /**
     * @description 쿠폰 재필터링
     * @param utlzSvcDvsCd
     */
    filterCoupon() {
      let amount: number = 0;
      let keyCheckInfo: any;
      if (this.utlzSvcDvsCd === 'FG') {
        const fees = this.orderInfo.selSatsList.map((item) => item.fee);
        amount = Math.max(...fees);
        keyCheckInfo = this.orderInfo.productDtl;
      }
      this.couponList = filterCoupon(this.couponList, this.utlzSvcDvsCd, amount, keyCheckInfo);
    },
    /**
     * @description 사용자별 결제 수단 정보
     */
    async requestPaymentManagement(): Promise<void> {
      if (this.utlzSvcDvsCd === '') {
        return;
      }
      this.paymentManagementLoad = false;
      const res = await pymMnsListAtPym(this.utlzSvcDvsCd);
      if (res) {
        this.paymentManagement = res;
        // 데이터가 있을경우 정렬 적용
        if (this.getSmpcPayRegistered) {
          this.paymentManagement.smpcPymInfo?.smpcPymList.sort((a: SmpcPym, b: SmpcPym) => {
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
      }
      this.paymentManagementLoad = true;
    },
    /**
     * @description 회원마일리지 쿠폰 정보 조회
     * @param param reqMbrMileageCouponCntInfoModel
     * @returns resMbrMileageCouponCntInfoModel
     */
    async requestMbrMileageCouponCntInfo(param: reqMbrMileageCouponCntInfoModel) {
      const res = await getMbrMileageCouponCntInfo(param);
      if (res) {
        this.mbrMileageCouponCntInfo = res;
      }
      return res;
    },
    /**
     * @description 이용약관
     * @param param
     */
    async requestTermsInfo(param: ReqTermsInfo): Promise<void> {
      const res = await inqrStplList(param);
      if (res) {
        this.orderInfo.termsInfo = res;
      }
    },
    /**
     * @description 주문정보 덮어쓰기
     * @param param
     */
    setOrderInfo(param: OrderInfo) {
      this.orderInfo = param;
    },
    /**
     * @description 쿠폰발급요청
     * @param cpnDfntSno
     */
    async requestCouponIssue(cpnDfntSno: string): Promise<void> {
      const res = await reqCpnIssu(cpnDfntSno);
      if (res) {
        await this.requestCouponList();
      }
    },
    /**
     * @description 주문정보 초기화
     */
    resetOrderInfo(): void {
      this.orderInfo = cloneDeep(orderInfoInit);
    },
    /**
     * @description 전체체크처리
     * @param checked
     */
    checkAll(checked: boolean) {
      this.orderInfo.termsInfo.stplList.forEach((group) => {
        group.stplDtlList.forEach((detail) => {
          detail.stplCheck = checked;
        });
      });
    },
    /**
     * @description 선택한 상품/선택 좌석 정보
     * @param info 선택좌석정보
     * @param dalInfo 선택 일별배차 정보
     */
    setSatsInfo(selSatsList: TckData[], dalInfo: ResDAlcnData, productDtl: any) {
      this.orderInfo.selSatsList = [];
      selSatsList.forEach((item) => {
        this.orderInfo.selSatsList.push({
          ...item,
          cpnDcntFee: 0
        });
      });
      this.orderInfo.dAlcnInfo = dalInfo;
      this.orderInfo.productDtl = productDtl;
    },
    /**
     * @description 입력 가능한 액수 한계 노출
     * @param type 조회 타입 구분 ('go':고마일리지, 't':티마일리지)
     * @returns
     */
    getAmountLimit(type: string): number {
      const totalFee = this.getTotalFee;
      const cpn = this.orderInfo.cpn?.cpnSno === '' ? 0 : this.orderInfo.cpn?.applyAmt;
      const goMlgAmt = type === 'go' ? 0 : this.orderInfo.tmgMlgPymAmt;
      const tMlgAmt = type === 't' ? 0 : this.orderInfo.tMlgAmt;
      return totalFee - cpn - goMlgAmt - tMlgAmt;
    },
    /**
     * @description 이용객 정보 적용
     * @param trvlMrnpDtlList 이용객리스트(입력정보)
     * @param resSatsList 버스티켓정보
     */
    setTrvlList(trvlMrnpDtlList: PassengerData[]) {
      let cnt = 1;
      this.orderInfo.selSatsList.forEach((selSat) => {
        const typeData = trvlMrnpDtlList.filter((passenger) => passenger.typeCd === selSat.busTckKndCd);

        if (selSat.busTckCnt > 0) {
          typeData.forEach((passengerData) => {
            const payPassengerData = {
              trvlMrnpSqno: cnt++,
              busTckKndCd: selSat.busTckKndCd,
              busTckKndNm: selSat.busTckKndNm,
              tissuAmt: selSat.fee || 0,
              evcpUseYn: 'N',
              ...(passengerData.psngFrnm && { psngFrnm: passengerData.psngFrnm }),
              ...(passengerData.psngMbphNo && { psngMbphNo: passengerData.psngMbphNo }),
              ...(passengerData.psngGndrCd && { psngGndrCd: passengerData.psngGndrCd })
            };
            this.orderInfo.trvlMrnpDtlList.push(payPassengerData);
          });
        }
        for (let i = 0; i < selSat.busTckCnt - typeData.length; i++) {
          this.orderInfo.trvlMrnpDtlList.push({
            trvlMrnpSqno: cnt++,
            busTckKndCd: selSat.busTckKndCd,
            busTckKndNm: selSat.busTckKndNm,
            tissuAmt: selSat.fee || 0,
            evcpUseYn: 'N',
            psngFrnm: '',
            psngMbphNo: '',
            psngGndrCd: ''
          });
        }
      });
    },
    /**
     * @description 이용구분 설정
     * @param utlzSvcDvsCd 이용서비스구분코드(고속:H, 시외:C,온다:O,따릉이:T,씽씽:X,FG:운송중개)
     */
    setUtlzSvcDvsCd(utlzSvcDvsCd: string) {
      this.utlzSvcDvsCd = utlzSvcDvsCd;
    },
    /**
     * @description 쿠폰 적용시 쿠폰가 적용
     * @param coupon 쿠폰정보(쿠폰할인가적용)
     */
    setCouponDiscountFee(coupon: PaymentCouponModel | undefined) {
      this.orderInfo.selSatsList.forEach((item) => {
        item.cpnDcntFee = couponAmountCalculate(coupon, item.fee);
      });
    }
  }
});
