<!-- 
    결제하기 - 미사용
    pubPath: tmoney/Transit/TIP05003.vue
    @author inu.jeong
 -->
<template>
  <div></div>
  <!-- <sub-header title="결제하기" right-content>
    <template #header_right>
      <uu-button btn-style="none" label="결제수단" class="btn_payment_method" href="/payment/payment-manage" />
    </template>
  </sub-header>
  <main id="main" class="main det">
    <div class="container bottom_btns">
      <div class="payment_area">
        <pay-detail-info />
        <pay-coupon-mileage />
        <payMethodComponent />
        <pay-detail-list />
        <pay-term-component />
      </div>
      <div class="btn_area">
        <uu-button size="xl" btn-color="primary" label="결제하기" @click="payCheck" :disabled="btnDisabled" />
      </div>
    </div>
  </main>
  <PaymentResultPopup ref="payResult" />
  <payPwdPopup ref="pwdPopup" initType="password-input" @ok="methodPay" /> -->
</template>
<script setup lang="ts">
// // util
// import { getAppBridge } from '@/utils';
// import { onBeforeRouteLeave, useRouter } from 'vue-router';
// import { computed, onBeforeMount, onMounted, ref, toRefs } from 'vue';
// import { useMessageModal } from '@/composables/useMessageModal';

// //component
// import payPwdPopup from '@/views/payment-mng/components/PaymentPasswordPopup.vue';
// import payDetailInfo from './components/PaymentDetailInfoComponent.vue';
// import PayCouponMileage from './components/PaymentCouponMileageComponent.vue';
// import payDetailList from './components/PaymentDetailListComponent.vue';
// import payMethodComponent from './components/PaymentMethodComponent.vue';
// import PaymentResultPopup from './components/PaymentResultPopup.vue';
// import payTermComponent from './components/PaymentTermComponent.vue';
// import { cloneDeep } from 'lodash-es';

// // store
// import { orderPayInit, orderSmpcInit, orderTmpyInit, useOrderStore } from '@/service/order/orderModule';
// import { useReservationStore } from '@/service/travel/reservationModule';
// import { storeToRefs } from 'pinia';
// import { useProductStore } from '@/service/travel/productModule';
// import { useAuthStore } from '@/service/auth/authModule';

// // method
// import { requestTrvlPym } from '@/service/order/orderApi';
// import type {
//   OrderPayInfo,
//   OrderSmpcInfo,
//   OrderTmpyInfo,
//   RequestTravelPayment,
//   PymInfo,
//   ResponseTravelPayment
// } from '@/service/order/model/orderModel';
// import { requestTrvlCpnVrfc } from '@/service/coupon/couponApi';
// import type { RequestTravelValidateCoupon } from '@/service/coupon/model/requestModel';
// import { naverPayBillCreate } from '@/service/payment/api/naverPaymentApi';
// import { tossPayBillCreate } from '@/service/payment/api/tossPaymentApi';
// import { inqrPymStatusInfo } from '@/service/payment/api/paymentApi';
// import type { TravelResult } from '@/utils/http/axios/types/axios';
// import { FlexResponseCode } from '@/utils/hybrid/type';
// import type { ReqTermsAgree } from '@/service/terms/model/requestModel';
// import { crtnMbrsLnkgSvcInfo } from '@/service/terms/termsApi';
// import { formatDate } from '@/utils/dateUtils';
// import { getLinkedSvcList } from '@/service/member/memberApi';

// const props = defineProps({
//   utlzSvcDvsCd: {
//     type: String,
//     default: 'FG'
//   }
// });
// const { utlzSvcDvsCd } = toRefs(props);

// // 결제 관련 입력 정보
// const orderStore = useOrderStore();
// const {
//   orderInfo,
//   paymentManagement,
//   getTotalFee,
//   getPaymentAmount,
//   getTmgAcmtAmt,
//   isMileageAllPay,
//   getAgreedStplList
// } = storeToRefs(orderStore);

// // 상품, 이용자 목록 정보
// const passengerStore = useReservationStore();
// const { selSatsList, getDAlcnInfo, trvlMrnpDtlList, bookerInfo } = storeToRefs(passengerStore);

// // 상품 상세 정보
// const productStore = useProductStore();
// const { productDtl } = storeToRefs(productStore);

// // 로그인|회원 정보
// const authStore = useAuthStore();
// const { authInfo } = storeToRefs(authStore);

// // modal 적용
// const { createErrorModal } = useMessageModal();

// // 결제 비밀번호 팝업
// const pwdPopup = ref();

// // 결제 완료 팝업
// const payResult = ref();

// onBeforeMount(() => {
//   // 비정상 접근 처리
//   if (selSatsList.value.length === 0) {
//     const router = useRouter();
//     router.push({ path: '/travel/main' });
//   }
// });

// onMounted(() => {
//   // 뒤로가기 관련 리스트 유지용 값 set
//   passengerStore.setIsFromPaymentPage(true);
//   // 이용구분코드 설정( 운송중개:'FG')
//   // 미적용시 데이터 정상적용 불가 필수 적용
//   orderStore.setUtlzSvcDvsCd(utlzSvcDvsCd.value);
//   // 선택한 상품 및 일별배차를 위한 정보
//   orderStore.setSatsInfo(selSatsList.value, getDAlcnInfo.value, productDtl.value);
//   // 이용승객관련 정보 저장
//   if (orderInfo.value.trvlMrnpDtlList.length === 0) {
//     orderStore.setTrvlList(trvlMrnpDtlList.value);
//   }
//   // 회원 마일리지 쿠폰 정보 조회
//   orderStore.requestMbrMileageCouponCntInfo({
//     atncChkYn: 'N',
//     cpnChkYn: 'N',
//     dotChkYn: 'N',
//     goMlgChkYn: 'Y',
//     offwallMlgChkYn: 'N',
//     tMlgInqrYn: 'Y',
//     trPrwnCpnYn: 'N'
//   });
//   // 대표결제수단 조회
//   const today = formatDate(new Date(), 'YYYYMMDDHHmmss');
//   const params = {
//     reqDtm: today,
//     inqrDtm: today
//   };
//   orderStore.requestRepresentManagement(params);
//   // 결제수단 설정
//   orderStore.requestPaymentManagement();
//   // 이용약관, orderInfo의 termsInfo 없을시 수정
//   if (orderInfo.value.termsInfo.stplList.length === 0) {
//     let grpCd = '';
//     switch (utlzSvcDvsCd.value) {
//       case 'FG': {
//         grpCd = 'FGP';
//         break;
//       }
//       default: {
//         break;
//       }
//     }
//     if (grpCd === '') {
//       return;
//     }
//     orderStore.requestTermsInfo({
//       stplGrpCd: grpCd,
//       svcDvsCd: '2'
//     });
//   }
//   // 보유,발급 가능 쿠폰 목록 조회
//   orderStore.requestCouponList();
// });

// // 결제 가능 체크
// const btnDisabled = computed(() => !termChkAll.value || !paymentChk.value);
// // 약관 체크
// const termChkAll = computed(() =>
//   orderInfo.value.termsInfo.stplList.every((group) =>
//     group.stplDtlList.every((detail) => detail.mndtYn !== 'Y' || detail.stplCheck)
//   )
// );
// // 결제수단 입력 체크
// const paymentChk = computed(() => {
//   if (getPaymentAmount.value === 0) {
//     return true;
//   }
//   return (
//     // 마일리지전액결제, 네이버 일반결제, 토스페이 일반결제의 경우는 결제키 없음
//     isMileageAllPay.value ||
//     orderInfo.value.pymMnsId === 'NPAY' ||
//     orderInfo.value.pymMnsId === 'TSPY' ||
//     (orderInfo.value.pymMnsId !== 'NPAY' && orderInfo.value.pymMnsId !== 'TSPY' && orderInfo.value.paymentKey !== '')
//   );
// });

// // 결제이전 검증
// const payCheck = async () => {
//   // 쿠폰 유효화 검사
//   if (orderInfo.value.cpn.cpnSno !== '') {
//     const typeData = orderInfo.value.selSatsList.findLast(
//       (passenger) => passenger.busTckKndCd === orderInfo.value.cpn.applyType
//     );
//     const param: RequestTravelValidateCoupon = {
//       evcpSno: orderInfo.value.cpn.cpnSno,
//       pymMnsId: isMileageAllPay.value ? 'TMGM' : orderInfo.value.pymMnsId,
//       crpcId:
//         paymentManagement.value.smpcPymInfo?.smpcPymList.find((d) => d.paymentKey === orderInfo.value.paymentKey)
//           ?.crpcId || '',

//       elwlPrdCd:
//         paymentManagement.value.tmoneyPayInfo?.elwlProdList.findLast((d) => d.tmcrNo === orderInfo.value.paymentKey)
//           ?.elwlPrdCd || '',
//       pymAmt: typeData?.fee || 0,
//       trvlPrdId: orderInfo.value.productDtl?.trvlPrdId || '',
//       busCacmCd: orderInfo.value.productDtl?.busCacmCd || '',
//       trvlRotId: orderInfo.value.productDtl?.trvlRotId || '',
//       categoryList: orderInfo.value.productDtl?.categoryList || []
//     };
//     const couponRes: any = await requestTrvlCpnVrfc(param).catch(() => {
//       return {
//         cpnUsePsbYn: 'E'
//       };
//     });
//     if (couponRes.cpnUsePsbYn === 'E') {
//       createErrorModal('', '쿠폰유효화통신에러 발생(적용불가)');
//       return false;
//     }
//     if (couponRes.cpnUsePsbYn !== 'Y') {
//       createErrorModal('쿠폰 적용이 불가합니다.', couponRes.err_msg || '해당 결제 수단에서는 쿠폰 적용이 불가합니다.');
//       return false;
//     }
//   }

//   // 결제 비밀번호 조회
//   const res = await inqrPymStatusInfo();
//   if (res && res.pwdUseYn === 'Y') {
//     pwdPopup.value.open();
//   } else {
//     methodPay();
//   }
// };

// // 결제를 태우기 전 parameter 세팅
// const setOrderPaymentReqeust = (): RequestTravelPayment => {
//   let tmpyReq: OrderTmpyInfo = cloneDeep(orderTmpyInit);
//   let payReq: OrderPayInfo = cloneDeep(orderPayInit);
//   let smpcReq: OrderSmpcInfo = cloneDeep(orderSmpcInit);
//   const paymentInfo: PymInfo = {
//     pymAmt: getTotalFee.value,
//     tmgMlgPymAmt: orderInfo.value.tmgMlgPymAmt,
//     evcpSno: orderInfo.value.cpn.cpnSno,
//     evcpUseAmt: orderInfo.value.cpn.applyAmt,
//     pymMnsId: isMileageAllPay.value ? 'TMGM' : orderInfo.value.pymMnsId,
//     pmmtPymAmt: getPaymentAmount.value,
//     smpcInfo: smpcReq,
//     payInfo: payReq,
//     tmpyInfo: tmpyReq
//   };
//   return {
//     trvlPrdId: orderInfo.value.productDtl?.trvlPrdId || '',
//     trvlPrdNm: orderInfo.value.productDtl?.trvlPrdNm || '',
//     busCacmCd: orderInfo.value.productDtl?.busCacmCd || '',
//     areaId: orderInfo.value.productDtl?.areaId || '',
//     areaName: orderInfo.value.productDtl?.areaName || '',
//     trvlRotId: orderInfo.value.productDtl?.trvlRotId || '',
//     rotSqno: orderInfo.value.dAlcnInfo?.rotSqno || 0,
//     alcnDt: orderInfo.value.dAlcnInfo?.alcnDt || '',
//     alcnSqno: orderInfo.value.dAlcnInfo?.alcnSqno || 0,
//     busClsCd: orderInfo.value.dAlcnInfo?.busClsCd || '',
//     atlDeprDt: orderInfo.value.dAlcnInfo?.atlDeprDt || '',
//     atlDeprTime: orderInfo.value.dAlcnInfo?.atlDeprTime || '',
//     deprTrmlNm: orderInfo.value.dAlcnInfo?.deprTrmlNm || '',
//     deprTrmlCd: orderInfo.value.dAlcnInfo?.deprTrmlCd || '',
//     arvlTrmlCd: orderInfo.value.dAlcnInfo?.eptTrmlCd || '',
//     mnppNm: bookerInfo.value.psngFrnm || '',
//     mnppMbphNo: bookerInfo.value.psngMbphNo || '',
//     mnppMailAddr: bookerInfo.value.psngEmail || '',
//     mrnpReqCtt: bookerInfo.value.mrnpReqCtt || '',
//     dcAcmtSno: orderInfo.value.productDtl?.dcAcmtSno,
//     tmgAcmtAmt: getTmgAcmtAmt.value,
//     categoryList: orderInfo.value.productDtl?.categoryList || [],
//     trvlMrnpDtlList: orderInfo.value.trvlMrnpDtlList || [],
//     pymInfo: paymentInfo
//   };
// };

// // 티머니페이, 체크/신용카드 간편결제 요청
// const requestPay = async (payType: string) => {
//   const date = new Date();
//   let params = setOrderPaymentReqeust();
//   if (payType === 'TMPY') {
//     // 티머니페이
//     const tmpy = paymentManagement.value.tmoneyPayInfo?.elwlProdList.findLast(
//       (d) => d.tmcrNo === orderInfo.value.paymentKey
//     );
//     if (!tmpy) {
//       payResult.value.open({
//         sucCd: false,
//         resMessage: '유효한 결제 요청이 아닙니다.',
//         payDate: date
//       });
//       return false;
//     }
//     params.pymInfo.tmpyInfo = {
//       virtCardRfrnId: tmpy.virtCardRfrnId || '',
//       elwlPrdCd: tmpy.elwlPrdCd,
//       tmnyMlgPymAmt: orderInfo.value.tmgMlgPymAmt
//     };
//   } else if (payType === 'PRPM') {
//     // 체크/신용카드 간편결제
//     const smpc = paymentManagement.value.smpcPymInfo?.smpcPymList.findLast(
//       (d) => d.paymentKey === orderInfo.value.paymentKey
//     );
//     if (!smpc) {
//       payResult.value.open({
//         sucCd: false,
//         resMessage: '유효한 결제 요청이 아닙니다.',
//         payDate: date
//       });
//       return false;
//     }
//     params.pymInfo.smpcInfo = {
//       issurCd: smpc.issuerCd,
//       billingKey: smpc.paymentKey,
//       msknCardNoVal: smpc.maskCardNo,
//       cardCpNm:
//         smpc.cardAliasName !== undefined && smpc.cardAliasName !== null && smpc.cardAliasName !== ''
//           ? smpc.cardAliasName
//           : smpc.cardName,
//       mipTerm: orderInfo.value.installment
//     };
//   } else if (payType === 'NPAYA') {
//     // 네이버페이
//     const npaya = paymentManagement.value.npayautPymInfo;
//     if (!npaya) {
//       payResult.value.open({
//         sucCd: false,
//         resMessage: '유효한 결제 요청이 아닙니다.',
//         payDate: date
//       });
//       return false;
//     }
//     params.pymInfo.smpcInfo = {
//       billingKey: npaya.automaticPayId || '',
//       msknCardNoVal: npaya.cardNum4th || '',
//       cardCpNm: npaya.cardCpNm || '',
//       mipTerm: orderInfo.value.installment
//     };
//   } else {
//     //토스페이
//     const tspy = paymentManagement.value.tspyautPymInfo;
//     if (!tspy) {
//       payResult.value.open({
//         sucCd: false,
//         resMessage: '유효한 결제 요청이 아닙니다.',
//         payDate: date
//       });
//       return false;
//     }
//     params.pymInfo.smpcInfo = {
//       billingKey: tspy.billingKey || '',
//       msknCardNoVal: tspy.cardNum4th || '',
//       cardCpNm: tspy.cardCpNm || '',
//       mipTerm: orderInfo.value.installment
//     };
//   }
//   // 여행결제요청
//   const res = await requestTrvlPym(params).catch(() => {
//     payResult.value.open({
//       sucCd: false,
//       resMessage: '결제요청 통신에러',
//       payDate: date
//     });
//     return;
//   });
//   if (res && (res as TravelResult<ResponseTravelPayment>).err_cod === undefined) {
//     // 성공
//     // const appBridge = await getAppBridge();
//     // Todo. 이전결제관련 브릿지 개발 후 적용
//     // const paymentKey = Object.keys(PaymentCd).find(
//     //   (key) => PaymentCd[key as keyof typeof PaymentCd] === orderInfo.value.pymKndCd
//     // ) as keyof typeof PaymentCd | undefined;
//     // const paymentTypeValue = paymentKey ? PaymentType[paymentKey] : PaymentType.NONE;
//     // appBridge.registPreviousPaymentType(paymentTypeValue);
//     const lnkgSvcCdRes = await getLinkedSvcList({
//       inqrDtm: formatDate(new Date(), 'YYYYMMDDHHmmss')
//     });
//     if (lnkgSvcCdRes) {
//       if (lnkgSvcCdRes.lnkgSvcList && lnkgSvcCdRes.lnkgSvcList.length > 0) {
//         // 이용등록 or 약관변경 없는 경우는 그냥 넘어감
//         const lnkgSvcCd = lnkgSvcCdRes.lnkgSvcList.find(
//           (item) => item.lnkgSvcCd === utlzSvcDvsCd.value && item.lnkgYn === 'Y' && item.stplModYn === 'N'
//         );
//         if (!lnkgSvcCd) {
//           // 조건을 만족하는 경우의 처리를 여기에 추가
//           const params: ReqTermsAgree = {
//             lnkgSvcCd: utlzSvcDvsCd.value,
//             stplList: getAgreedStplList.value
//           };
//           crtnMbrsLnkgSvcInfo(params);
//         }
//       }
//     }
//     payResult.value.open({
//       sucCd: true,
//       payDate: date,
//       paymetResponse: res,
//       deprTrmlCd: orderInfo.value.dAlcnInfo?.deprTrmlCd || '',
//       arvlTrmlCd: orderInfo.value.dAlcnInfo?.eptTrmlCd || ''
//     });
//   } else {
//     // 실패
//     payResult.value.open({
//       sucCd: false,
//       resMessage: (res as TravelResult<ResponseTravelPayment>).err_msg || '',
//       payDate: date
//     });
//   }
// };

// // 일반결제 요청
// const requestGeneralPay = async (payType: string) => {
//   const date = new Date();
//   const appBridge = await getAppBridge();
//   let payRes;

//   if (payType === 'N') {
//     //네이버페이
//     payRes = await naverPayBillCreate({
//       moappMbrsSno: authInfo.value.moappMbrsSno || '',
//       utlzSvcDvsCd: utlzSvcDvsCd.value,
//       productName: orderInfo.value.productDtl?.trvlPrdNm || '',
//       productCount: orderInfo.value.trvlMrnpDtlList.length,
//       productAmount: getPaymentAmount.value
//     });
//   } else {
//     //토스페이
//     payRes = await tossPayBillCreate({
//       moappMbrsSno: authInfo.value.moappMbrsSno || '',
//       utlzSvcDvsCd: utlzSvcDvsCd.value,
//       tosspayMethod: '3',
//       productDesc: orderInfo.value.productDtl?.trvlPrdNm || '',
//       amount: getPaymentAmount.value
//     });
//   }
//   if (payRes && payRes.rspCd === '0000') {
//     // 일반결제 요청
//     const pymInfo = await appBridge.requestGeneralPay({
//       paymentType: payType,
//       checkoutPage: payRes.checkoutPage
//     });
//     if (pymInfo.response.code === FlexResponseCode.OK && pymInfo.result === 'success') {
//       let params = setOrderPaymentReqeust();
//       params.pymInfo.payInfo = {
//         billAuthData: pymInfo.billAuthData || {},
//         mipTerm: pymInfo.spreadOut || '00',
//         oderSno: pymInfo.oderSno || ''
//       };
//       // 여행결제요청
//       const res = await requestTrvlPym(params).catch(() => {
//         payResult.value.open({
//           sucCd: false,
//           resMessage: '결제요청 통신에러',
//           payDate: date
//         });
//         return;
//       });
//       if (res && (res as TravelResult<ResponseTravelPayment>).err_cod === undefined) {
//         // TODO. 이전결제관련 브릿지 개발 후 적용
//         // const paymentKey = Object.keys(PaymentCd).find(
//         //   (key) => PaymentCd[key as keyof typeof PaymentCd] === orderInfo.value.pymKndCd
//         // ) as keyof typeof PaymentCd | undefined;
//         // const paymentTypeValue = paymentKey ? PaymentType[paymentKey] : PaymentType.NONE;
//         // appBridge.registPreviousPaymentType(paymentTypeValue);
//         const lnkgSvcCdRes = await getLinkedSvcList({
//           inqrDtm: formatDate(new Date(), 'YYYYMMDDHHmmss')
//         });
//         if (lnkgSvcCdRes) {
//           if (lnkgSvcCdRes.lnkgSvcList && lnkgSvcCdRes.lnkgSvcList.length > 0) {
//             // 이용등록 or 약관변경 없는 경우는 그냥 넘어감
//             const lnkgSvcCd = lnkgSvcCdRes.lnkgSvcList.find(
//               (item) => item.lnkgSvcCd === utlzSvcDvsCd.value && item.lnkgYn === 'Y' && item.stplModYn === 'N'
//             );
//             if (!lnkgSvcCd) {
//               // 조건을 만족하는 경우의 처리를 여기에 추가
//               const params: ReqTermsAgree = {
//                 lnkgSvcCd: utlzSvcDvsCd.value,
//                 stplList: getAgreedStplList.value
//               };
//               crtnMbrsLnkgSvcInfo(params);
//             }
//           }
//         }
//         payResult.value.open({
//           sucCd: true,
//           payDate: date,
//           paymetResponse: res,
//           deprTrmlCd: orderInfo.value.dAlcnInfo?.deprTrmlCd || '',
//           arvlTrmlCd: orderInfo.value.dAlcnInfo?.eptTrmlCd || ''
//         });
//       } else {
//         payResult.value.open({
//           sucCd: false,
//           resMessage: (res as TravelResult<ResponseTravelPayment>).err_msg || '',
//           payDate: date
//         });
//       }
//     } else {
//       payResult.value.open({
//         sucCd: false,
//         resMessage: pymInfo.message,
//         payDate: date
//       });
//     }
//   } else {
//     payResult.value.open({
//       sucCd: false,
//       resMessage: payRes.rspMsg || '',
//       payDate: date
//     });
//   }
// };

// const methodPay = () => {
//   switch (isMileageAllPay.value ? 'TMGM' : orderInfo.value.pymMnsId) {
//     case 'TMPY':
//       // 티머니페이결제
//       requestPay(orderInfo.value.pymMnsId);
//       break;
//     case 'NPAYA':
//       // 네이버페이 자동결제
//       requestPay(orderInfo.value.pymMnsId);
//       break;
//     case 'NPAY':
//       // 네이버페이일반결제
//       requestGeneralPay('N');
//       break;
//     case 'TSPY':
//       // 토스페이일반결제
//       requestGeneralPay('T');
//       break;
//     case 'TSPYA':
//       // 토스페이자동결제
//       requestPay(orderInfo.value.pymMnsId);
//       break;
//     case 'PRPM':
//       // 체크/신용카드간편결제
//       requestPay(orderInfo.value.pymMnsId);
//       break;
//     default:
//       // 마일리지 전액 결제
//       if (isMileageAllPay.value) {
//         requestPay('TMGM');
//       } else {
//         payResult.value.open({ sucCd: false, resMessage: '유효한 결제 요청이 아닙니다.', payDate: new Date() });
//       }
//       break;
//   }
// };

// // 쿠폰선택, 결제수단 화면 이동 제외 orderInfo 초기화
// onBeforeRouteLeave((to, from, next) => {
//   if (
//     !(
//       from.path === '/payment/payment' &&
//       (to.path === '/payment/payment-coupon' || to.path === '/payment/payment-manage')
//     )
//   ) {
//     orderStore.resetOrderInfo();
//   }
//   next();
// });
</script>
