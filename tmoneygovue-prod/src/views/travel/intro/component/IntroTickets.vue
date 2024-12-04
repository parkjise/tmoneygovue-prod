<!-- 예약 티켓 (회원) -->
<template>
  <round-box padding-bottom="1.2rem">
    <template #title>
      예약 티켓
      <button type="button" class="reload_btn" aria-label="새로고침" @click="clickRefresh">
        <uu-ic name="reload" size="16" />
      </button>
    </template>
    <div class="reservation_ticket">
      <uu-swiper ref="swiperRef" type="paginationFraction">
        <swiper-slide v-for="(item, index) in trvlMrnpList" :key="index" @click="clickTicket(item)">
          <div class="swiper_inner">
            <div class="ticket">
              <div class="ticket_header split">
                <span>{{ item.prdCtgNm }}</span>
              </div>
              <ul class="ticket_info">
                <li>
                  <uu-ic name="ticket" size="16" />
                  <span class="title">{{ item.trvlPrdNm }}</span>
                </li>
                <li>
                  <uu-ic name="calender" size="16" />
                  <div class="split">
                    <span>{{ getDeprDate(item) }}</span>
                    <span>{{ getDeprTime(item) }}</span>
                  </div>
                </li>
                <li>
                  <uu-ic name="person" size="16" />
                  <div class="split">
                    <span>{{ item.tissuNcnt }}명</span>
                    <span>{{ item.busTckKndNm }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </swiper-slide>
      </uu-swiper>
    </div>
  </round-box>
</template>

<script setup lang="ts">
import type { TrvlMrnpData } from '@/service/travel/model/introModel';
import { useTrvlIntroStore } from '@/service/travel/introModule';
import { formatDate, getDayWeek } from '@/utils/dateUtils';
import { SwiperSlide } from 'swiper/vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { throttle } from 'lodash-es';
import { ref } from 'vue';

const router = useRouter();
const introStore = useTrvlIntroStore();

const { trvlMrnpList } = storeToRefs(introStore);

const swiperRef = ref();

/**
 * @description 출발일자 문자열 계산
 * @param item 예약정보
 */
const getDeprDate = (item: TrvlMrnpData) => {
  return `${formatDate(item.deprDt, 'YYYY.MM.DD')}(${getDayWeek(item.deprDt)})`;
};

/**
 * @description 출발시간 문자열 계산
 * @param item 예약정보
 */
const getDeprTime = (item: TrvlMrnpData) => {
  return `${formatDate(`${item.deprDt}${item.deprTime}`, 'HH:mm')}`;
};

/**
 * @description 예약정보 새로고침 (5초 인터벌)
 */
const clickRefresh = throttle(async () => {
  await introStore.reqTrvlMrnpSync();
  swiperRef.value.resetToSlide();
}, 5000);

/**
 * @description 이용내역 이동
 */
const clickTicket = (item: TrvlMrnpData) => {
  router.push({
    name: 'travel-history-detail',
    query: { trvlMrnpSno: item.trvlMrnpSno, trvlMrsStaCd: item.trvlMrsStaCd }
  });
};
</script>
