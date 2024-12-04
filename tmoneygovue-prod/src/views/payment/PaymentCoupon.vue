<!-- 
    결제하기>쿠폰 선택 - 미사용
    pubPath: /tmoney/Transit/TIP05005 ~ TIP05005_2
    @author inu.jeong
 -->
<template>
  <div></div>
  <!-- <sub-header title="쿠폰 선택" :clickCallback="clickCallback" />
  <main id="main" class="main det">
    <div class="container bottom_btns">
      <div class="coupon_area transit has_bottom">
        <form>
          <uu-radio v-model="radio01" value="" label="선택 안함" class="no_select" />
          <uu-radio
            v-model="radio01"
            v-for="(couponInfo, idx) in couponList"
            :value="couponInfo.issue ? 'x' : couponInfo.cpnSno"
            :key="idx"
            :class="couponInfo.issue ? 'has_btn' : ''"
            :disabled="couponInfo.issue || !couponInfo.enable"
          >
            <template #label>
              <span class="title" v-if="couponInfo.cpnNm">{{ couponInfo.cpnNm }}</span>
              <span class="discount" v-if="couponInfo.dcKndCd === 'DA'"
                >{{ formatAmount(couponInfo.dcAmt) }}원 할인
                {{ Number(couponInfo.minPymAmt) > 0 ? `(${formatAmount(couponInfo.minPymAmt)}원 이상)` : '' }}</span
              >
              <span class="discount" v-else
                >{{ formatAmount(couponInfo.dcRt) }}% 할인
                {{ Number(couponInfo.maxDcAmt) > 0 ? `(최대 ${formatAmount(couponInfo.maxDcAmt)}원)` : '' }}</span
              >
              <span class="case" v-if="couponInfo.cndtCtt">{{ couponInfo.cndtCtt }}</span>
              <span class="date"
                >{{ formatDate(couponInfo.useSttDtm, 'YYYY.MM.DD') }} ~
                {{ formatDate(couponInfo.useEndDtm, 'YYYY.MM.DD') }}</span
              >
              <div class="badge_area" v-if="couponInfo.cndtUseYn === 'Y'">
                <template v-for="(category, index) in couponInfo.productCategoryList" :key="index">
                  <uu-badge
                    v-if="categoryName(category, 'category')"
                    :label="categoryName(category, 'category')"
                    size="sm"
                  />
                </template>
                <template v-for="(category, index) in couponInfo.productThemeList" :key="index">
                  <uu-badge v-if="categoryName(category, 'theme')" :label="categoryName(category, 'theme')" size="sm" />
                </template>
              </div>
              <uu-button
                class="btn_apply"
                btn-style="line"
                size="lg"
                v-show="radio01 === couponInfo.cpnSno && !couponInfo.issue && getMultiTypeReservation"
                @click="apply(couponInfo)"
              >
                적용 받을 대상
                <uu-ic size="24" name="arrow" />
              </uu-button>
            </template>
            <template #button v-if="couponInfo.issue && couponInfo.enable">
              <uu-button btn-style="line" size="xs" @click="couponIssue(couponInfo.cpnDfntSno)">
                <uu-ic size="14" name="download" />
                발급
              </uu-button>
            </template>
          </uu-radio>
        </form>
        <div class="no_data" v-if="couponList.length < 1">
          <uu-ic size="48" name="exclamation" />
          <p>적용 가능한 쿠폰이 없습니다.</p>
        </div>
      </div>
      <div class="btn_area has_bg">
        <ul class="expected_amount">
          <li>
            <p>이용금액</p>
            <p>
              <strong>{{ formatAmount(getTotalFee) }}</strong
              >원
            </p>
          </li>
          <li v-if="couponApplied && couponTemp.cpnSno !== ''">
            <p>{{ couponTemp.dcCtt }}</p>
            <p class="primary">
              <strong>-{{ formatAmount(couponTemp.applyAmt) }}</strong
              >원
            </p>
          </li>
          <li>
            <p>예상 결제금액</p>
            <p>
              <strong>{{ formatAmount(getTotalFee - couponTemp.applyAmt) }}</strong
              >원
            </p>
          </li>
        </ul>
        <uu-button size="xl" btn-color="primary" label="적용하기" @click="applyCoupon" :disabled="!couponApplied" />
      </div>
    </div>
  </main>
  <PaymentCouponClearPopup ref="clearPopup" @ok="setClearGoback" />
  <PaymentCouponApplyPopup ref="applyPopup" @update="updateApply" /> -->
</template>
<script setup lang="ts">
// import { useOrderStore, type PaymentCouponModel } from '@/service/order/orderModule';
// import { formatAmount } from '@/utils/amountUtils';
// import { formatDate } from '@/utils/dateUtils';
// import { computed, onMounted, ref, watch } from 'vue';
// import { useRouter } from 'vue-router';
// import { storeToRefs } from 'pinia';
// import PaymentCouponClearPopup from './components/PaymentCouponClearPopup.vue';
// import PaymentCouponApplyPopup from './components/PaymentCouponApplyPopup.vue';
// import type { OrderCouponInfo } from '@/service/order/model/orderModel';
// import { cloneDeep } from 'lodash-es';
// import { useTrvlIntroStore } from '@/service/travel/introModule';

// const router = useRouter();

// const orderStore = useOrderStore();
// const { couponList, orderInfo, getOrderCouponApplied, getTotalFee, getMultiTypeReservation } = storeToRefs(orderStore);

// const introStore = useTrvlIntroStore();
// const { getCategoryList } = storeToRefs(introStore);

// const radio01 = ref('');
// const clearPopup = ref();
// const applyPopup = ref();

// // 적용쿠폰 정보 reset
// const initCouponInfo: OrderCouponInfo = {
//   cpnDfntSno: '',
//   cpnSno: '',
//   cpnNm: '',
//   dcCtt: '',
//   dcAmt: 0,
//   applyType: '',
//   dcKndCd: '',
//   dcRt: 0,
//   applyAmt: 0
// };

// // 뒤로가기 및 쿠폰 초기화시
// const setClearGoback = () => {
//   router.back();
// };

// // 뒤로가기시 쿠폰적용 여부 적용
// const clickCallback = () => {
//   if (!getOrderCouponApplied.value) {
//     clearPopup.value.open();
//     return false;
//   }
//   router.back();
// };

// // 쿠폰 발급
// const couponIssue = (cpnDfntSno: string) => orderStore.requestCouponIssue(cpnDfntSno);

// // 쿠폰 임시 정보
// const couponTemp = ref({
//   cpnDfntSno: '',
//   cpnSno: '',
//   cpnNm: '',
//   dcCtt: '',
//   dcAmt: 0,
//   applyType: '',
//   dcKndCd: '',
//   dcRt: 0,
//   applyAmt: 0
// });
// const existingApplyType = ref(orderInfo.value.cpn?.applyType);
// onMounted(() => {
//   // 화면 접근시 적용된 쿠폰 있을경우 임시 정보로 적용
//   if (orderInfo.value.cpn?.cpnSno) {
//     radio01.value = orderInfo.value.cpn?.cpnSno;
//     couponTemp.value = { ...orderInfo.value.cpn };
//   }
//   orderStore.filterCoupon();
// });

// // 쿠폰적용 가능 여부용 computed값
// const couponApplied = computed(
//   () => couponTemp.value.cpnSno === '' || (couponTemp.value.cpnSno !== '' && couponTemp.value.applyType !== '')
// );

// // radio변경될 시 쿠폰정보 적용
// watch(radio01, () => {
//   if (radio01.value) {
//     const selectedCoupon = couponList.value.find((item: PaymentCouponModel) => item.cpnSno === radio01.value);
//     couponTemp.value = {
//       cpnDfntSno: selectedCoupon?.cpnDfntSno ?? '',
//       cpnSno: selectedCoupon?.cpnSno ?? '',
//       cpnNm: selectedCoupon?.cpnNm ?? '',
//       dcCtt:
//         selectedCoupon?.dcCtt ||
//         (selectedCoupon?.dcKndCd === 'DA'
//           ? `${formatAmount(selectedCoupon?.dcAmt ?? 0)}원 할인`
//           : `${formatAmount(selectedCoupon?.dcRt ?? 0)}% 할인`),
//       dcAmt: Number(selectedCoupon?.dcAmt ?? '0'),
//       applyType: existingApplyType.value,
//       dcKndCd: selectedCoupon?.dcKndCd ?? '',
//       dcRt: Number(selectedCoupon?.dcRt ?? '0'),
//       applyAmt: 0
//     };
//     // 구분종류가 하나일 경우 바로 회원구분 할당
//     if (!getMultiTypeReservation.value) {
//       apply(selectedCoupon);
//     }
//     existingApplyType.value = '';
//   } else {
//     couponTemp.value = cloneDeep(initCouponInfo);
//   }
// });

// //쿠폰 회원구분할당 적용하기
// const apply = (coupon: PaymentCouponModel | undefined) => {
//   orderStore.setCouponDiscountFee(coupon);
//   // 주문 티켓구분수가 2명 이상일 경우
//   if (getMultiTypeReservation.value) {
//     applyPopup.value.open();
//   } else {
//     const couponType = orderInfo.value.selSatsList.findLast((item) => item.busTckCnt > 0);
//     couponTemp.value.applyType = couponType?.busTckKndCd || '';
//     couponTemp.value.applyAmt = couponType?.cpnDcntFee || 0;
//   }
// };

// // 선택한 회원구분 및 할인가 적용
// const updateApply = (updateType: string) => {
//   couponTemp.value.applyType = updateType;
//   couponTemp.value.applyAmt =
//     orderInfo.value.selSatsList.findLast((item) => item.busTckKndCd === updateType)?.cpnDcntFee || 0;
// };

// // 선택한 쿠폰 적용
// const applyCoupon = () => {
//   orderInfo.value.cpn = couponTemp.value;

//   orderInfo.value.trvlMrnpDtlList.forEach((d) => (d.evcpUseYn = 'N'));

//   // 승객에 할인쿠폰 여부 적용
//   if (orderInfo.value.cpn.cpnSno !== '') {
//     // 선택된 승객코드 적용
//     const filteredList = orderInfo.value.trvlMrnpDtlList.filter(
//       (item) => item.busTckKndCd === orderInfo.value.cpn.applyType
//     );
//     if (filteredList.length > 0) {
//       // `trvlMrnpSqno`가 가장 작은 객체를 찾음
//       const targetItem = filteredList.sort((a, b) => a.trvlMrnpSqno - b.trvlMrnpSqno)[0];
//       // 쿠폰을 적용
//       targetItem.evcpUseYn = 'Y';
//     }
//   }
//   // 쿠폰 재적용시 마일리지 초기화
//   orderInfo.value.tmgMlgPymAmt = 0;
//   orderInfo.value.tMlgAmt = 0;
//   router.back();
// };

// // categoryName 출력
// // type (category:카테고리(1차), theme:테마(2차) )
// const categoryName = (categoryId: string, type: string) => {
//   // 카테고리일 경우
//   if (type === 'category') {
//     const category = getCategoryList.value.find((cat) => `${cat.categoryId}000` === categoryId);
//     return category ? category.categoryName : null;
//   }

//   if (type === 'theme') {
//     for (const category of getCategoryList.value) {
//       if (category.subCategories) {
//         const theme = category.subCategories.find(
//           (theme) => `${category.categoryId}${theme.categoryId}` === categoryId
//         );
//         if (theme) {
//           return theme.categoryName;
//         }
//       }
//     }
//   }

//   return null;
// };
</script>
