<!-- 
    결제하기
    pubPath: tmoney/Transit/TIP05003.vue
    @author inu.jeong
 -->
<template>
  <sub-header title="결제하기" right-content>
    <template #header_right>
      <uu-button
        btn-style="none"
        label="결제수단"
        class="btn_payment_method"
        @click="onClickMovePage('/payment/payment-manage')"
      />
    </template>
  </sub-header>
  <main id="main" class="main det">
    <div class="container bottom_btns">
      <div class="payment_area">
        <!-- 결제 정보 -->
        <pay-detail-info />
        <!-- 쿠폰마일리지 -->
        <pay-coupon-mileage />
        <!-- 결제수단 -->
        <pay-method-component />
        <!-- 결제상세 -->
        <pay-detail-list />
        <!-- 이용약관 -->
        <pay-term-component />
      </div>
      <div class="btn_area">
        <uu-button size="xl" btn-color="primary" label="결제하기" @click="payCheck" :disabled="btnDisabled" />
      </div>
    </div>
  </main>
  <!-- 결제완료 -->
  <payment-result-popup ref="payResult" />
  <!-- 결제비밀번호 -->
  <pay-pwd-popup ref="pwdPopup" initType="password-input" @ok="methodPay" />
</template>
<script setup lang="ts">
// util
import { getAppBridge } from '@/utils';
import { onBeforeRouteLeave, useRouter } from 'vue-router';
import { computed, onBeforeMount, onMounted, ref, toRefs } from 'vue';
import { useMessageModal } from '@/composables/useMessageModal';

//component
import PayPwdPopup from '@/views/payment-mng/components/PaymentPasswordPopup.vue';
import PayDetailInfo from '@/views/payment/components/PaymentDetailInfoComponent.vue';
import PayCouponMileage from '@/views/payment/components/PaymentCouponMileageComponent.vue';
import PayDetailList from '@/views/payment/components/PaymentDetailListComponent.vue';
import PayMethodComponent from '@/views/payment/components/PaymentMethodComponent.vue';
import PaymentResultPopup from '@/views/payment/components/PaymentResultPopup.vue';
import PayTermComponent from '@/views/payment/components/PaymentTermComponent.vue';
import { cloneDeep } from 'lodash-es';

// store
import {
  orderPayInit,
  orderSmpcInit,
  orderTmpyInit,
  PaymentCd,
  useOrderStore,
  PaymentType
} from '@/service/order/orderModule';
import { useReservationStore } from '@/service/travel/reservationModule';
import { storeToRefs } from 'pinia';
import { useProductStore } from '@/service/travel/productModule';
import { useAuthStore } from '@/service/auth/authModule';

// method
import { requestTrvlPym } from '@/service/order/orderApi';
import type {
  OrderPayInfo,
  OrderSmpcInfo,
  OrderTmpyInfo,
  RequestTravelPayment,
  PymInfo,
  ResponseTravelPayment
} from '@/service/order/model/orderModel';
import { requestTrvlCpnVrfc } from '@/service/coupon/couponApi';
import type { RequestTravelValidateCoupon } from '@/service/coupon/model/requestModel';
import { naverPayBillCreate } from '@/service/payment/api/naverPaymentApi';
import { tossPayBillCreate } from '@/service/payment/api/tossPaymentApi';
import { inqrPymStatusInfo } from '@/service/payment/api/paymentApi';
import type { TravelResult } from '@/utils/http/axios/types/axios';
import { FlexResponseCode } from '@/utils/hybrid/type';
import type { ReqTermsAgree } from '@/service/terms/model/requestModel';
import { crtnMbrsLnkgSvcInfo } from '@/service/terms/termsApi';
import { formatDate } from '@/utils/dateUtils';
import { getLinkedSvcList } from '@/service/member/memberApi';
import type { registPreviousPaymentTypeRequest } from '@/utils/hybrid/payment/payment.type';

const props = defineProps({
  utlzSvcDvsCd: {
    type: String,
    default: 'FG'
  }
});
const { utlzSvcDvsCd } = toRefs(props);

const pwdEnc = ref(''); // 결제비밀번호 암호화

// 결제 관련 입력 정보
const orderStore = useOrderStore();
const {
  orderInfo,
  paymentManagement,
  getTotalFee,
  getPaymentAmount,
  getTmgAcmtAmt,
  isMileageAllPay,
  getAgreedStplList,
  trvlMrnpSno,
  getTossPayRegistered,
  getNaverPayRegistered
} = storeToRefs(orderStore);

// 상품, 이용자 목록 정보
const passengerStore = useReservationStore();
const { selSatsList, getDAlcnInfo, trvlMrnpDtlList, bookerInfo } = storeToRefs(passengerStore);

// 상품 상세 정보
const productStore = useProductStore();
const { productDtl } = storeToRefs(productStore);

// 로그인|회원 정보
const authStore = useAuthStore();
const { authInfo } = storeToRefs(authStore);

// modal 적용
const { createErrorModal } = useMessageModal();

// 결제 비밀번호 팝업
const pwdPopup = ref();

// 결제 완료 팝업
const payResult = ref();

const router = useRouter();

onBeforeMount(() => {
  // 비정상 접근 처리
  if (selSatsList.value.length === 0) {
    router.push({ path: '/travel/main' });
  }
});

onMounted(async () => {
  // 뒤로가기 관련 리스트 유지용 값 set
  passengerStore.setIsFromPaymentPage(true);
  // 이용구분코드 설정( 운송중개:'FG')
  // 미적용시 데이터 정상적용 불가 필수 적용
  orderStore.setUtlzSvcDvsCd(utlzSvcDvsCd.value);
  // 선택한 상품 및 일별배차를 위한 정보
  orderStore.setSatsInfo(selSatsList.value, getDAlcnInfo.value, productDtl.value);
  // 이용승객관련 정보 저장
  if (orderInfo.value.trvlMrnpDtlList.length === 0) {
    orderStore.setTrvlList(trvlMrnpDtlList.value);
  }
  // 회원 마일리지 쿠폰 정보 조회
  orderStore.requestMbrMileageCouponCntInfo({
    atncChkYn: 'N',
    cpnChkYn: 'N',
    dotChkYn: 'N',
    goMlgChkYn: 'Y',
    offwallMlgChkYn: 'N',
    tMlgInqrYn: 'Y',
    trPrwnCpnYn: 'N'
  });
  // 대표결제수단 조회
  const today = formatDate(new Date(), 'YYYYMMDDHHmmss');
  const params = {
    reqDtm: today,
    inqrDtm: today
  };
  orderStore.requestRepresentManagement(params);
  // 이용약관, orderInfo의 termsInfo 없을시 수정
  if (orderInfo.value.termsInfo.stplList.length === 0) {
    let grpCd = '';
    switch (utlzSvcDvsCd.value) {
      case 'FG': {
        grpCd = 'FGP';
        break;
      }
      default: {
        break;
      }
    }
    if (grpCd === '') {
      return;
    }
    orderStore.requestTermsInfo({
      stplGrpCd: grpCd,
      svcDvsCd: '2'
    });
  }
  // 보유,발급 가능 쿠폰 목록 조회
  orderStore.requestCouponList();
  // 결제수단 설정
  await orderStore.requestPaymentManagement();
  // 여행예약일련번호 조회
  await orderStore.requestTrvlPymMrnp({
    trvlPrdId: productDtl.value?.trvlPrdId ?? '',
    trvlPrdNm: productDtl.value?.trvlPrdNm ?? '',
    busCacmCd: productDtl.value?.busCacmCd ?? '',
    areaId: productDtl.value?.areaId ?? '',
    areaName: productDtl.value?.areaName ?? '',
    trvlRotId: productDtl.value?.trvlRotId ?? '',
    rotSqno: getDAlcnInfo.value.rotSqno ?? 0,
    alcnDt: getDAlcnInfo.value.alcnDt ?? '',
    alcnSqno: getDAlcnInfo.value.alcnSqno ?? 0,
    busClsCd: getDAlcnInfo.value.busClsCd ?? '',
    atlDeprDt: getDAlcnInfo.value.atlDeprDt ?? '',
    atlDeprTime: getDAlcnInfo.value.atlDeprTime ?? '',
    deprTrmlNm: getDAlcnInfo.value.deprTrmlNm ?? '',
    deprTrmlCd: getDAlcnInfo.value.deprTrmlCd ?? '',
    arvlTrmlCd: getDAlcnInfo.value.eptTrmlCd ?? '',
    pymAmt: getTotalFee.value
  });
});

const onClickMovePage = async (link: string) => {
  // TODO 여행분리에 따른 수정. repository를 분리하게 되면 불필요소스
  const webBase = import.meta.env.VITE_AXIOS_BASE_TARGET || 'TMONEY2';
  if (webBase === 'TRAVEL') {
    const appBridge = await getAppBridge();
    await appBridge.openView({
      url: 'tmoneytia://mywallet/tmoneypay',
      viewType: 'deeplink'
    });
    // 결제수단정보 조회
    await orderStore.requestPaymentManagement();

    // 네이버/토스페이 포커스 변경. 간편등록 상태 > 결제수단관리 > 네이버/토스 카드삭제 > 결제화면으로 오면 간편등록이 비활성화 상태인데 포커스 되어 있는현상 방지
    if (orderInfo.value.pymKndCd === PaymentCd.NAVER_PAY && !getNaverPayRegistered.value) {
      orderInfo.value.pymMnsId = 'NPAY';
    }
    if (orderInfo.value.pymKndCd === PaymentCd.TOSS_PAY && !getTossPayRegistered.value) {
      orderInfo.value.pymMnsId = 'TSPY';
    }
  } else {
    router.push({ path: link });
  }
};

// 결제 가능 체크
const btnDisabled = computed(() => !termChkAll.value || !paymentChk.value);
// 약관 체크
const termChkAll = computed(() =>
  orderInfo.value.termsInfo.stplList.every((group) =>
    group.stplDtlList.every((detail) => detail.mndtYn !== 'Y' || detail.stplCheck)
  )
);
// 결제수단 입력 체크
const paymentChk = computed(() => {
  if (getPaymentAmount.value === 0) {
    return true;
  }
  if (isMileageAllPay.value || orderInfo.value.pymMnsId === 'NPAY' || orderInfo.value.pymMnsId === 'TSPY') {
    return true;
  }
  if (orderInfo.value.paymentKey) {
    return true;
  }
  return false;
});

// 결제이전 검증
const payCheck = async () => {
  // 쿠폰 유효화 검사
  if (orderInfo.value.cpn.cpnSno !== '') {
    const typeData = orderInfo.value.selSatsList.find(
      (passenger) => passenger.busTckKndCd === orderInfo.value.cpn.applyType
    );
    const param: RequestTravelValidateCoupon = {
      evcpSno: orderInfo.value.cpn.cpnSno,
      pymMnsId: isMileageAllPay.value ? 'TMGM' : orderInfo.value.pymMnsId,
      crpcId:
        paymentManagement.value.smpcPymInfo?.smpcPymList?.find((d) => d.paymentKey === orderInfo.value.paymentKey)
          ?.crpcId || '',

      elwlPrdCd:
        paymentManagement.value.tmoneyPayInfo?.elwlProdList?.find((d) => d.tmcrNo === orderInfo.value.paymentKey)
          ?.elwlPrdCd || '',
      pymAmt: typeData?.fee || 0,
      trvlPrdId: orderInfo.value.productDtl?.trvlPrdId || '',
      busCacmCd: orderInfo.value.productDtl?.busCacmCd || '',
      trvlRotId: orderInfo.value.productDtl?.trvlRotId || '',
      categoryList: orderInfo.value.productDtl?.categoryList || []
    };
    const couponRes: any = await requestTrvlCpnVrfc(param).catch(() => {
      return {
        cpnUsePsbYn: 'E'
      };
    });
    if (couponRes.cpnUsePsbYn === 'E') {
      createErrorModal('', '쿠폰유효화통신에러 발생(적용불가)');
      return false;
    }
    if (couponRes.cpnUsePsbYn !== 'Y') {
      createErrorModal('쿠폰 적용이 불가합니다.', couponRes.err_msg || '해당 결제 수단에서는 쿠폰 적용이 불가합니다.');
      return false;
    }
  }

  // 결제 비밀번호 조회
  const res = await inqrPymStatusInfo();
  if (res && res.pwdUseYn === 'Y') {
    pwdPopup.value.open();
  } else {
    methodPay();
  }
};

// 결제를 태우기 전 parameter 세팅
const setOrderPaymentReqeust = (): RequestTravelPayment => {
  let tmpyReq: OrderTmpyInfo = cloneDeep(orderTmpyInit);
  let payReq: OrderPayInfo = cloneDeep(orderPayInit);
  let smpcReq: OrderSmpcInfo = cloneDeep(orderSmpcInit);
  const paymentInfo: PymInfo = {
    pymAmt: getTotalFee.value,
    tmgMlgPymAmt: orderInfo.value.tmgMlgPymAmt,
    evcpSno: orderInfo.value.cpn.cpnSno,
    evcpUseAmt: orderInfo.value.cpn.applyAmt,
    pymMnsId: isMileageAllPay.value ? 'TMGM' : orderInfo.value.pymMnsId,
    pmmtPymAmt: getPaymentAmount.value,
    smpcInfo: smpcReq,
    payInfo: payReq,
    tmpyInfo: tmpyReq
  };
  return {
    encPwd: pwdEnc.value,
    trvlMrnpSno: trvlMrnpSno.value || '',
    trvlPrdId: orderInfo.value.productDtl?.trvlPrdId || '',
    trvlPrdNm: orderInfo.value.productDtl?.trvlPrdNm || '',
    busCacmCd: orderInfo.value.productDtl?.busCacmCd || '',
    areaId: orderInfo.value.productDtl?.areaId || '',
    areaName: orderInfo.value.productDtl?.areaName || '',
    trvlRotId: orderInfo.value.productDtl?.trvlRotId || '',
    rotSqno: orderInfo.value.dAlcnInfo?.rotSqno || 0,
    alcnDt: orderInfo.value.dAlcnInfo?.alcnDt || '',
    alcnSqno: orderInfo.value.dAlcnInfo?.alcnSqno || 0,
    busClsCd: orderInfo.value.dAlcnInfo?.busClsCd || '',
    atlDeprDt: orderInfo.value.dAlcnInfo?.atlDeprDt || '',
    atlDeprTime: orderInfo.value.dAlcnInfo?.atlDeprTime || '',
    deprTrmlNm: orderInfo.value.dAlcnInfo?.deprTrmlNm || '',
    deprTrmlCd: orderInfo.value.dAlcnInfo?.deprTrmlCd || '',
    arvlTrmlCd: orderInfo.value.dAlcnInfo?.eptTrmlCd || '',
    mnppNm: bookerInfo.value.psngFrnm || '',
    mnppMbphNo: bookerInfo.value.psngMbphNo || '',
    mnppMailAddr: bookerInfo.value.psngEmail || '',
    mrnpReqCtt: bookerInfo.value.mrnpReqCtt || '',
    dcAcmtSno: orderInfo.value.productDtl?.dcAcmtSno,
    tmgAcmtAmt: getTmgAcmtAmt.value,
    categoryList: orderInfo.value.productDtl?.categoryList || [],
    trvlMrnpDtlList: orderInfo.value.trvlMrnpDtlList || [],
    pymInfo: paymentInfo
  };
};

// 티머니페이, 체크/신용카드 간편결제 요청
const requestPay = async (payType: string) => {
  const date = new Date();
  let params = setOrderPaymentReqeust();
  if (payType === 'TMPY') {
    // 티머니페이
    const tmpy = paymentManagement.value.tmoneyPayInfo?.elwlProdList.find(
      (d) => d.tmcrNo === orderInfo.value.paymentKey
    );
    if (!tmpy) {
      payResult.value.open({
        sucCd: false,
        resMessage: '유효한 결제 요청이 아닙니다.',
        payDate: date
      });
      return false;
    }
    params.pymInfo.tmpyInfo = {
      virtCardRfrnId: tmpy.virtCardRfrnId || '',
      elwlPrdCd: tmpy.elwlPrdCd,
      tmnyMlgPymAmt: orderInfo.value.tmgMlgPymAmt
    };
  } else if (payType === 'PRPM') {
    // 체크/신용카드 간편결제
    const smpc = paymentManagement.value.smpcPymInfo?.smpcPymList?.find(
      (d) => d.paymentKey === orderInfo.value.paymentKey
    );
    if (!smpc) {
      payResult.value.open({
        sucCd: false,
        resMessage: '유효한 결제 요청이 아닙니다.',
        payDate: date
      });
      return false;
    }
    params.pymInfo.smpcInfo = {
      issurCd: smpc.issuerCd,
      billingKey: smpc.paymentKey,
      msknCardNoVal: smpc.maskCardNo,
      cardCpNm:
        smpc.cardAliasName !== undefined && smpc.cardAliasName !== null && smpc.cardAliasName !== ''
          ? smpc.cardAliasName
          : smpc.cardName,
      mipTerm: orderInfo.value.installment
    };
  } else if (payType === 'NPAYA') {
    // 네이버페이
    const npaya = paymentManagement.value.npayautPymInfo;
    if (!npaya) {
      payResult.value.open({
        sucCd: false,
        resMessage: '유효한 결제 요청이 아닙니다.',
        payDate: date
      });
      return false;
    }
    params.pymInfo.smpcInfo = {
      billingKey: npaya.automaticPayId || '',
      msknCardNoVal: npaya.cardNum4th || '',
      cardCpNm: npaya.cardCpNm || '',
      mipTerm: orderInfo.value.installment
    };
  } else {
    //토스페이
    const tspy = paymentManagement.value.tspyautPymInfo;
    if (!tspy) {
      payResult.value.open({
        sucCd: false,
        resMessage: '유효한 결제 요청이 아닙니다.',
        payDate: date
      });
      return false;
    }
    params.pymInfo.smpcInfo = {
      billingKey: tspy.billingKey || '',
      msknCardNoVal: tspy.cardNum4th || '',
      cardCpNm: tspy.cardCpNm || '',
      mipTerm: orderInfo.value.installment
    };
  }
  // 여행결제요청
  const res = await requestTrvlPym(params).catch(() => {
    payResult.value.open({
      sucCd: false,
      resMessage: '결제요청 통신에러',
      payDate: date
    });
    return;
  });
  if (res && (res as TravelResult<ResponseTravelPayment>).err_cod === undefined) {
    // 이전결제수단 등록
    const appBridge = await getAppBridge();
    const paymentKey = Object.keys(PaymentCd).find(
      (key) => PaymentCd[key as keyof typeof PaymentCd] === orderInfo.value.pymKndCd
    ) as keyof typeof PaymentCd | undefined;
    const paymentTypeValue = paymentKey ? PaymentType[paymentKey] : PaymentType.NONE;
    const registPreviousPaymentTypeParams: registPreviousPaymentTypeRequest = {
      paymentType: paymentTypeValue
    };
    appBridge.registPreviousPaymentType(registPreviousPaymentTypeParams);

    // 이용등록서비스 등록
    const lnkgSvcCdRes = await getLinkedSvcList({
      inqrDtm: formatDate(new Date(), 'YYYYMMDDHHmmss')
    });
    if (lnkgSvcCdRes) {
      if (lnkgSvcCdRes.lnkgSvcList && lnkgSvcCdRes.lnkgSvcList.length > 0) {
        // 이용등록 or 약관변경 없는 경우는 그냥 넘어감
        const lnkgSvcCd = lnkgSvcCdRes.lnkgSvcList.find(
          (item) => item.lnkgSvcCd === utlzSvcDvsCd.value && item.lnkgYn === 'Y' && item.stplModYn === 'N'
        );
        if (!lnkgSvcCd) {
          // 조건을 만족하는 경우의 처리를 여기에 추가
          const params: ReqTermsAgree = {
            lnkgSvcCd: utlzSvcDvsCd.value,
            stplList: getAgreedStplList.value
          };
          crtnMbrsLnkgSvcInfo(params);
        }
      }
    }
    payResult.value.open({
      sucCd: true,
      payDate: date,
      paymetResponse: res,
      deprTrmlCd: orderInfo.value.dAlcnInfo?.deprTrmlCd || '',
      arvlTrmlCd: orderInfo.value.dAlcnInfo?.eptTrmlCd || ''
    });
  } else {
    // 실패
    payResult.value.open({
      sucCd: false,
      resMessage: (res as TravelResult<ResponseTravelPayment>).err_msg || '',
      payDate: date
    });
  }
};

// 일반결제 요청
const requestGeneralPay = async (payType: string) => {
  const date = new Date();
  const appBridge = await getAppBridge();
  let payRes;

  if (payType === 'N') {
    //네이버페이
    payRes = await naverPayBillCreate({
      moappMbrsSno: authInfo.value.moappMbrsSno || '',
      utlzSvcDvsCd: utlzSvcDvsCd.value,
      productName: orderInfo.value.productDtl?.trvlPrdNm || '',
      productCount: orderInfo.value.trvlMrnpDtlList.length,
      productAmount: getPaymentAmount.value
    });
  } else {
    //토스페이
    payRes = await tossPayBillCreate({
      moappMbrsSno: authInfo.value.moappMbrsSno || '',
      utlzSvcDvsCd: utlzSvcDvsCd.value,
      tosspayMethod: '3',
      productDesc: orderInfo.value.productDtl?.trvlPrdNm || '',
      amount: getPaymentAmount.value
    });
  }
  if (payRes && payRes.rspCd === '0000') {
    // 일반결제 요청
    const pymInfo = await appBridge.requestGeneralPay({
      paymentType: payType,
      checkoutPage: payRes.checkoutPage
    });

    if (pymInfo.result !== 'success') return;

    // 취소(결제하기 화면 유지)
    if (pymInfo.response.code === FlexResponseCode.OK) {
      let params = setOrderPaymentReqeust();
      params.pymInfo.payInfo = {
        billAuthData: pymInfo.billAuthData || {},
        mipTerm: pymInfo.spreadOut || '00',
        oderSno: pymInfo.oderSno || ''
      };
      // 여행결제요청
      const res = await requestTrvlPym(params).catch(() => {
        payResult.value.open({
          sucCd: false,
          resMessage: '결제요청 통신에러',
          payDate: date
        });
        return;
      });
      if (res && (res as TravelResult<ResponseTravelPayment>).err_cod === undefined) {
        // 이전결제수단 등록
        const paymentKey = Object.keys(PaymentCd).find(
          (key) => PaymentCd[key as keyof typeof PaymentCd] === orderInfo.value.pymKndCd
        ) as keyof typeof PaymentCd | undefined;
        const paymentTypeValue = paymentKey ? PaymentType[paymentKey] : PaymentType.NONE;
        const registPreviousPaymentTypeParams: registPreviousPaymentTypeRequest = {
          paymentType: paymentTypeValue
        };
        appBridge.registPreviousPaymentType(registPreviousPaymentTypeParams);

        // 이용등록서비스 적용
        const lnkgSvcCdRes = await getLinkedSvcList({
          inqrDtm: formatDate(new Date(), 'YYYYMMDDHHmmss')
        });
        if (lnkgSvcCdRes) {
          if (lnkgSvcCdRes.lnkgSvcList && lnkgSvcCdRes.lnkgSvcList.length > 0) {
            // 이용등록 or 약관변경 없는 경우는 그냥 넘어감
            const lnkgSvcCd = lnkgSvcCdRes.lnkgSvcList.find(
              (item) => item.lnkgSvcCd === utlzSvcDvsCd.value && item.lnkgYn === 'Y' && item.stplModYn === 'N'
            );
            if (!lnkgSvcCd) {
              // 조건을 만족하는 경우의 처리를 여기에 추가
              const params: ReqTermsAgree = {
                lnkgSvcCd: utlzSvcDvsCd.value,
                stplList: getAgreedStplList.value
              };
              crtnMbrsLnkgSvcInfo(params);
            }
          }
        }
        payResult.value.open({
          sucCd: true,
          payDate: date,
          paymetResponse: res,
          deprTrmlCd: orderInfo.value.dAlcnInfo?.deprTrmlCd || '',
          arvlTrmlCd: orderInfo.value.dAlcnInfo?.eptTrmlCd || ''
        });
      } else {
        payResult.value.open({
          sucCd: false,
          resMessage: (res as TravelResult<ResponseTravelPayment>).err_msg || '',
          payDate: date
        });
      }
    } else {
      // 실패(실패화면이동)
      payResult.value.open({
        sucCd: false,
        resMessage: pymInfo.message || '결제요청 오류',
        payDate: date
      });
    }
  } else {
    payResult.value.open({
      sucCd: false,
      resMessage: payRes.rspMsg || '',
      payDate: date
    });
  }
};

const methodPay = (passwordEnc?: string) => {
  if (passwordEnc && passwordEnc !== '') pwdEnc.value = passwordEnc;
  switch (isMileageAllPay.value ? 'TMGM' : orderInfo.value.pymMnsId) {
    case 'TMPY':
      // 티머니페이결제
      requestPay(orderInfo.value.pymMnsId);
      break;
    case 'NPAYA':
      // 네이버페이 자동결제
      requestPay(orderInfo.value.pymMnsId);
      break;
    case 'NPAY':
      // 네이버페이일반결제
      requestGeneralPay('N');
      break;
    case 'TSPY':
      // 토스페이일반결제
      requestGeneralPay('T');
      break;
    case 'TSPYA':
      // 토스페이자동결제
      requestPay(orderInfo.value.pymMnsId);
      break;
    case 'PRPM':
      // 체크/신용카드간편결제
      requestPay(orderInfo.value.pymMnsId);
      break;
    default:
      // 마일리지 전액 결제
      if (isMileageAllPay.value) {
        requestPay('TMGM');
      } else {
        payResult.value.open({ sucCd: false, resMessage: '유효한 결제 요청이 아닙니다.', payDate: new Date() });
      }
      break;
  }
};

// 쿠폰선택, 결제수단 화면 이동 제외 orderInfo 초기화
onBeforeRouteLeave((to, from, next) => {
  const exceptionConditions = [
    from.path === '/tobe/travel/payment' &&
      (to.path === '/travel/payment-coupon' ||
        to.path === '/payment/payment-manage' ||
        to.path === '/payment/smpc-card-register'),
    from.path === '/payment/payment-manage' && to.path === '/payment/smpc-card-register'
  ];

  const shouldResetOrderInfo = !exceptionConditions.some((condition) => condition);

  if (shouldResetOrderInfo) {
    orderStore.resetOrderInfo();
  }

  next();
});
</script>
