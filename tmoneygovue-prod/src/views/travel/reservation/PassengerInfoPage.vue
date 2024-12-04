<template>
  <sub-header title="이용자 정보 입력" />
  <main id="main" class="main">
    <div class="container bottom_btns">
      <booker-info
        :info="getBookerInfo"
        :is-ticket-prd="prdStore.getIsTicketPrd"
        :is-rsrv-page="true"
        @email="setBookerEmail"
        @reqCtt="setBooketReqCtt"
      />
      <passenger-info
        :is-rsrv-page="true"
        title="예매자 정보"
        :list="getPsngList"
        :sats-list="selSatsList"
        :max-cnt="getTotalPassengerCnt"
        :is-same="isSameBookerInfo"
        @valid="setPsngInfoValid"
      />
      <div class="btn_area has_bg">
        <uu-button
          size="xl"
          btn-color="primary"
          label="입력완료"
          aria-label="입력완료"
          :disabled="!psngInfoValid || !bookerInfoValid"
          @click="savePsngInfo"
        />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import BookerInfo from './info/BookerInfo.vue';
import PassengerInfo from './info/PassengerInfo.vue';

import { computed, onMounted, ref } from 'vue';
import { useAuthStore } from '@/service/auth/authModule';
import { useProductStore } from '@/service/travel/productModule';
import { useReservationStore, type PassengerData } from '@/service/travel/reservationModule';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

const router = useRouter();
const authStore = useAuthStore();
const prdStore = useProductStore();
const rsrvStore = useReservationStore();

const { bookerInfo, isSameBookerInfo, isFromPaymentPage, trvlMrnpDtlList, selSatsList, getTotalPassengerCnt } =
  storeToRefs(rsrvStore);

const bookerInfoValid = ref(false); // 예약자정보 유효성검사 결과
const psngInfoValid = ref(false); // 이용자정보 유효성검사 결과

const psngInfoList = ref<PassengerData[]>([]);
const isSameBooker = ref(false); // 이용자1 정보가 예약자정보와 동일한지 여부

onMounted(() => {
  isSameBooker.value = isSameBookerInfo.value;
});
/**
 * @description 예약자정보
 */
const getBookerInfo = computed(() => {
  return {
    psngFrnm: authStore.getMbrNm || '',
    psngMbphNo: authStore.getAuthInfo.mbrphNo || '',
    psngEmail: bookerInfo.value.psngEmail ?? '',
    mrnpReqCtt: bookerInfo.value.mrnpReqCtt ?? ''
  };
});
/**
 * @description 이용자정보 기본 리스트
 */
const getPsngList = computed((): PassengerData[] => {
  let list: PassengerData[] = [];

  // 예약하기화면에서 넘어간 경우 || 이용자정보가 없는 경우
  const isInit = !isFromPaymentPage.value || trvlMrnpDtlList.value.length < 1;
  if (isInit) {
    let satsIdx = -1;
    selSatsList.value.forEach((d, idx) => {
      satsIdx = satsIdx === -1 && d.busTckCnt > 0 ? idx : satsIdx;
      for (let i = 0; i < d.busTckCnt; i++) {
        list.push({
          psngFrnm: '',
          psngMbphNo: '',
          psngGndrCd: '',
          typeCd: d.busTckKndCd,
          typeNm: d.busTckKndNm,
          isShow: satsIdx === idx && i === 0
        });
      }
    });
  } else {
    trvlMrnpDtlList.value.forEach((d) => {
      list.push({
        psngFrnm: d.psngFrnm,
        psngMbphNo: d.psngMbphNo,
        psngGndrCd: d.psngGndrCd,
        typeCd: d.typeCd,
        typeNm: d.typeNm,
        isShow: d.isShow
      });
    });
  }
  return list;
});

/**
 * @description 예약자정보 유효성검사
 * @param valid
 * @param bookerInfo
 */
const setBookerEmail = (valid: boolean, email: string) => {
  bookerInfoValid.value = valid;
  if (valid) {
    getBookerInfo.value.psngEmail = email;
  }
};
const setBooketReqCtt = (reqCtt: string) => {
  getBookerInfo.value.mrnpReqCtt = reqCtt;
};
/**
 * @description 이용자정보 유효성검사 (1번만 필수, 나머지는 입력시 패턴체크)
 * @param valid
 * @param info
 */
const setPsngInfoValid = (valid: boolean, info: PassengerData[], isSameBookerInfo: boolean) => {
  psngInfoValid.value = valid;
  psngInfoList.value = info;
  isSameBooker.value = isSameBookerInfo;
};

/**
 * @description 이용자정보 저장
 */
const savePsngInfo = () => {
  rsrvStore.setBookerInfo(getBookerInfo.value);
  rsrvStore.setPassengerInfo(psngInfoList.value, isSameBooker.value);
  router.push({ path: '/travel/payment' });
};
</script>
