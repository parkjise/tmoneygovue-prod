<template>
  <subHeader title="출발지 선택" />
  <main id="main" class="main">
    <div class="container no_padding">
      <div class="selected_product">
        <div class="product_name">{{ params.trvlPrdNm }}</div>
      </div>
      <div class="select_option_wrap">
        <button type="button" class="select_date" @click="calendarBottom = true">
          <uu-ic size="20" name="calender" class="ic_left" />
          {{ getDateStr }}
          <uu-ic size="24" name="arrow" status="down" class="ic_right" />
        </button>
        <div class="select_option" v-if="reqComplete && resultData">
          <form>
            <div class="form_radio_btn_wrap">
              <uu-radio
                v-for="(item, index) in getDeprList"
                :key="index"
                v-model="selAlcnSqno"
                :value="item.rotSqno"
                :disabled="Number(item.rmnSatsNum) < 1"
                check-line
                @click="setSelAlcnSqno(item)"
                aria-labelledby="null"
                :aria-label="
                  Number(item.rmnSatsNum) > 0
                    ? `${getTime(item)}시간 ${item.deprTrmlNm} ${item.adltFee.toLocaleString()}원 잔여좌석 ${item.rmnSatsNum}명`
                    : `${getTime(item)}시간 ${item.deprTrmlNm} ${item.adltFee.toLocaleString()}원 매진`
                "
                tabindex="0"
              >
                <template #label>
                  <div class="info_wrap">
                    <div class="depart_time">{{ getTime(item) }}</div>
                    <div class="info">
                      <div class="station">{{ item.deprTrmlNm }}</div>
                      <div class="price_wrap">
                        <span class="price">{{ item.adltFee.toLocaleString() }}</span
                        >원
                      </div>
                    </div>
                    <div class="remain" :class="{ sold_out: item.alcnStaCd === 'P' || Number(item.rmnSatsNum) < 1 }">
                      <template v-if="item.alcnStaCd === 'P' || Number(item.rmnSatsNum) < 1"> 매진 </template>
                      <template v-else>
                        <template v-if="Number(item.rmnSatsNum) > 0">
                          잔여좌석<br />
                          <span class="remain_num">{{ item.rmnSatsNum }}</span
                          >명
                        </template>
                      </template>
                    </div>
                  </div>
                </template>
              </uu-radio>
            </div>
          </form>
        </div>
        <!-- 일별배차목록이 없는경우 -->
        <no-reseult-component
          v-if="!loding && getDeprList.length == 0 && !reqException"
          message="예약 가능한 잔여좌석이 없습니다."
          class="sat_result"
        />
        <!-- API 조회 에러 -->
        <travel-exception v-else-if="reqException" @retry="reqDAlcnList" />
      </div>
    </div>
    <uu-floating always>
      <template #ic>
        <uu-ic size="20" name="reload" @click="clickReload" />
        <span class="sr_only">새로고침</span>
      </template>
    </uu-floating>
    <!-- 캘린더 바텀시트 -->
    <rsrv-calendar-bottom
      :is-show="calendarBottom"
      :date="new Date(formatDate(params.selDate))"
      :mounted="false"
      :rot-id="params.trvlRotId"
      @ok="setSelDate"
      @close="calendarBottom = false"
    />
    <!-- 인원선택 바텀시트 -->
    <select-personnel-bottom
      :is-show="selectPersonnel"
      :select-date="dayjs(params.selDate)"
      :max-cnt="Number(resSatsList.rmnSatsNum)"
      :tck-data="selSatsList"
      @ok="selectComplete"
      @close="closeBottom"
    />
    <!-- 예약확인 풀팝업 -->
    <reservation-confirm-full-popup
      :is-show="rsvrConfFull"
      :prd-nm="params.trvlPrdNm ?? ''"
      :is-ticket="params.isTicket === 'true'"
      @close="rsvrConfFull = false"
      @next="goNext"
      @main="goMain"
    />
  </main>
</template>
<script setup lang="ts">
import NoReseultComponent from '@/views/travel/component/NoResultComponent.vue';
import TravelException from '@/views/travel/component/TravelException.vue';
import RsrvCalendarBottom from './component/RsrvCalendarBottom.vue';
import SelectPersonnelBottom from './component/SelectPersonnelBottom.vue';
import ReservationConfirmFullPopup from './component/ReservationConfirmFullPopup.vue';

import { ref, onMounted, computed } from 'vue';
import { formatDate, getDayWeek } from '@/utils/dateUtils';
import { useReservationStore, type TckData } from '@/service/travel/reservationModule';
import type { ResDAlcnData, ReqDAlcnList } from '@/service/travel/model/reservationModel';

import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
import { storeToRefs } from 'pinia';
import { throttle } from 'lodash-es';
import { getDeprTime } from '../travelUtils';

const router = useRouter();
const rsrvStore = useReservationStore();

const { selSatsList, resDAlcnList, resSatsList } = storeToRefs(rsrvStore);

const reqComplete = ref(false); //일별배차목록조회 결과
const resultData = ref(false); //일별배차목록 데이터존재여부
const reqException = ref(false); //exception여부(mounted시점에 exception화면 미노출을 위해 분리)

const calendarBottom = ref(false); // 캘린더 바텀시트
const selectPersonnel = ref(false); // 예약인원 선택 바텀시트

const selAlcnSqno = ref(-1); // 선택 노선순번(rotSqno)
const rsvrConfFull = ref(false); // 예약하기 풀팝업

const params = ref({ trvlRotId: '', trvlPrdNm: '', selDate: '', isTicket: 'false' }); // selDate = YYYYMMDD

let loding = ref(true);

onMounted(() => {
  params.value.trvlRotId = router.currentRoute.value.query['trvlRotId'] as string;
  params.value.selDate = router.currentRoute.value.query['selDate'] as string;
  params.value.trvlPrdNm = router.currentRoute.value.query['trvlPrdNm'] as string;
  params.value.isTicket = router.currentRoute.value.query['isTicket'] as string;
  rsrvStore.setSelectedDate(dayjs(params.value.selDate));
  reqDAlcnList();
  rsrvStore.setPassengerInfo([]); // 이용자정보 초기화
});

/**
 * @description 일별배차목록조회
 */
const reqDAlcnList = async () => {
  const deprTime = await getDeprTime(params.value.selDate);
  const param: ReqDAlcnList = {
    trvlRotId: params.value.trvlRotId || '',
    atlDeprDt: params.value.selDate,
    atlDeprTime: deprTime
  };
  
  loding.value = true;

  reqComplete.value = await rsrvStore.reqDAlcnList(param);
  resultData.value = resDAlcnList.value !== null && resDAlcnList.value.length > 0;
  reqException.value = !reqComplete.value;

  loding.value = false;
};

/**
 * @description 일별배차목록
 */
const getDeprList = computed(() => {
  if (resDAlcnList.value && resDAlcnList.value.length > 0) {
    return resDAlcnList.value.filter((item) => item.alcnDt === params.value.selDate);
  }
  return [];
});

const clickReload = throttle(() => {
  reqDAlcnList();
}, 1000);
/**
 * @description 잔여석목록조회
 */
const reqSatsList = async () => {
  return await rsrvStore.reqSatsList();
};
/**
 * @description 날짜 텍스트
 */
const getDateStr = computed(() => {
  return `${formatDate(params.value.selDate, 'YYYY.MM.DD')}(${getDayWeek(params.value.selDate)})`;
});
/**
 * @description 출발시간
 */
const getTime = (item: ResDAlcnData) => {
  if (item) return `${item.atlDeprTime.substring(0, 2)}:${item.atlDeprTime.substring(2, 4)}`;
};
/**
 * @description 선택배차정보 저장
 */
const setSelAlcnSqno = async (item: ResDAlcnData) => {
  // 예약 상태값 마감일 경우
  if (item && item.alcnStaCd === 'P') return;
  // 잔여좌석 0일 경우
  if (item && Number(item.rmnSatsNum) < 1) return;

  rsrvStore.setAlcnSqno(item.rotSqno);
  selAlcnSqno.value = item.rotSqno;

  const result = await reqSatsList();
  selectPersonnel.value = result;
};

/**
 * @description 캘린더에서 선택한 날짜 저장
 */
const setSelDate = async (date: Date) => {
  params.value.selDate = formatDate(date, 'YYYYMMDD');
  rsrvStore.setSelectedDate(dayjs(date));
  // 라우터 query변경
  router.replace({ name: 'reservation-departure', query: params.value });
  // 일별배치목록 재조회
  await reqDAlcnList();
    calendarBottom.value = false;
};

/**
 * @description 선택한 배차정보,인원정보 저장
 */
const selectComplete = async (selSatsList: TckData[]) => {
  await rsrvStore.setSelSatsInfo(selSatsList);
  selectPersonnel.value = false;
  rsvrConfFull.value = true;
};
/**
 * 바텀시트 닫기
 */
const closeBottom = () => {
  selectPersonnel.value = false;
};
/**
 * 정보입력 화면 이동
 */
const goNext = () => {
  // 예약자정보 초기화
  rsrvStore.setBookerInfo();
  rsrvStore.setIsFromPaymentPage(false);
  router.push({ name: 'reservation-info' });
};
/**
 * 여행 메인 화면 이동
 */
const goMain = () => {
  router.push({ name: 'travel-main' });
};
</script>
