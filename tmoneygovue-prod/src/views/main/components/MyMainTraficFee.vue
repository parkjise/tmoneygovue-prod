<template>
  <div class="user">
    <p class="box_title" :style="titleStyle" v-html="santizedHtml(props.myTraficFeeScrnMrk.svcTtlNm)"></p>
    <div class="trans_pay">
      <div class="chart">
        <!-- <canvas ref="transCanvas1" tabindex="0" />
        <div class="month_wrap">
          <div class="last_month" v-for="myTraficFee in myTraficFeeList" :key="myTraficFee.utlzSvcMonth">
            <p class="month">
              <strong>{{ makeMyTraficFeeMonth(myTraficFee.utlzSvcMonth) }}</strong
              >월
            </p>
            <p>{{ myTraficFee.utlzSvcTerm }}</p>
          </div>
        </div> -->

        <!-- [240821] 접근성 수정 -->
        <div class="last_month">
          <canvas
            ref="transCanvas1"
            tabindex="0"
            :aria-label="`${makeMyTraficFeeMonth(myTraficFeeList[0].utlzSvcMonth)}월 교통비 사용량은 ${traficMonthFeeDatas[0]}원 입니다.`"
          />
          <div class="month_wrap">
            <p class="month">
              <strong
                >{{ makeMyTraficFeeMonth(myTraficFeeList[0].utlzSvcMonth) }}<span class="sr_only">월</span>
              </strong>
              <span aria-hidden="true">월</span>
            </p>
            <p>{{ myTraficFeeList[0].utlzSvcTerm }}</p>
          </div>
        </div>
        <div class="this_month">
          <canvas
            ref="transCanvas2"
            tabindex="0"
            :aria-label="`${makeMyTraficFeeMonth(myTraficFeeList[1].utlzSvcMonth)}월 교통비 사용량은 ${traficMonthFeeDatas[1]}원 입니다.`"
          />
          <div class="month_wrap">
            <p class="month">
              <strong
                >{{ makeMyTraficFeeMonth(myTraficFeeList[1].utlzSvcMonth) }}<span class="sr_only">월</span>
              </strong>
              <span aria-hidden="true">월</span>
            </p>
            <p>{{ myTraficFeeList[1].utlzSvcTerm }}</p>
          </div>
        </div>
        <!-- // [240821] 접근성 수정 -->
      </div>
      <uu-button
        class="btn_go"
        :style="btnStyle"
        @click="
          sendAdbrix(AdbrixEvtId.tapMyCost),
            onClickMovePage(myTraficFeeScrnMrk.dtlMvmnNmChcMvmnPath || '', props.myTraficFeeScrnMrk.dtlMvmnTitlNm)
        "
      >
        {{ props.myTraficFeeScrnMrk.dtlMvmnNm || '나의 교통비 보러 가기' }}
        <my-main-arrow-icon :arrowColor="myTraficFeeScrnMrk.dtlMvmnNmLrCd || '#111111'" />
      </uu-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type myScrnMrkListModel } from '@/service/main/model/myMainModel';
import { formatDateToDayjs } from '@/utils/dateUtils';
import { computed, onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { santizedHtml } from '@/utils';
import MyMainArrowIcon from '@/views/main/components/MyMainArrowIcon.vue';

import { AdbrixEvtId } from '@/utils/hybrid/type';
import { sendAdbrix } from '@/utils/sendAdbrixUtil';

const props = defineProps({
  // 나의 교통비 화면 마크업 정보
  myTraficFeeScrnMrk: {
    type: Object as () => myScrnMrkListModel,
    required: true
  }
});

const emit = defineEmits(['onClickMovePage']);

const titleStyle = computed(() => {
  return {
    color: props.myTraficFeeScrnMrk.svcTtlNmLrCd || '#111111'
  };
});

const btnStyle = computed(() => {
  return {
    color: props.myTraficFeeScrnMrk.dtlMvmnNmLrCd || '#111111'
  };
});

// 화면 이동
const onClickMovePage = (link: string, headerTitle: string | null) => {
  emit('onClickMovePage', link, headerTitle);
};

onMounted(() => {
  // 교통비 차트 초기화
  initTraficFeeChart();
});

// 나의 교통비 리스트. 교통비 리스트를 역순으로 정렬. 서버에서는 최신순으로 응답함
const myTraficFeeList = computed(() => {
  return props.myTraficFeeScrnMrk.thmmTrcsInfoList.slice().reverse() || [];
});

// 해당 월 문자열 포맷
const makeMyTraficFeeMonth = (yearMonth: string) => {
  return (formatDateToDayjs(yearMonth, 'YYYY년 MM월').month() + 1).toString().padStart(2, '0');
};

const transCanvas1 = ref<HTMLCanvasElement | null>(null);
const transCanvas2 = ref<HTMLCanvasElement | null>(null);
Chart.register(ChartDataLabels);
// 교통비 차트 초기화

const traficMonthFeeDatas = ref<string[]>([]);
const initTraficFeeChart = () => {
  traficMonthFeeDatas.value = myTraficFeeList.value.map((item) => item.utlzSvcAmt);
  const traficMonthFeeSum = myTraficFeeList.value.map((item) => Number(item.utlzSvcAmt)).reduce((a, b) => a + b, 0);

  // 당월지출 교통비
  if (!transCanvas1.value) return;
  if (!transCanvas2.value) return;
  const ctx1 = transCanvas1.value.getContext('2d');
  const ctx2 = transCanvas2.value.getContext('2d');
  if (!ctx1) return;
  if (!ctx2) return;
  new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: ['12월'],
      datasets: [
        {
          data: [traficMonthFeeDatas.value[0]],
          backgroundColor: ['#EEEEEE'],
          borderRadius: 10,
          maxBarThickness: 40,
          minBarLength: 10,
          hoverBackgroundColor: ['#EEEEEE']
        }
      ]
    },
    options: {
      scales: {
        x: {
          display: false,
          grid: {
            display: false
          },
          ticks: {
            display: false
          }
        },
        y: {
          display: false,
          beginAtZero: true,
          // 교통비 최댓값
          max: traficMonthFeeSum + traficMonthFeeSum / 4
        }
      },
      plugins: {
        tooltip: {
          enabled: false
        },
        legend: {
          display: false
        },
        datalabels: {
          align: 'top',
          anchor: 'end',
          color: ['#888888'],
          font: function () {
            const size = 14;
            const weight = 400;
            return {
              family: 'Spoqa Han Sans Neo',
              size: size,
              weight: weight
            };
          },
          formatter: function (value) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          }
        }
      },
      responsive: true, // 차트 컨테이너 크기에 따라 반응형으로 조정
      maintainAspectRatio: false // 컨테이너 크기에 맞게 조정
    }
  });
  new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: ['1월'],
      datasets: [
        {
          data: [traficMonthFeeDatas.value[1]],
          backgroundColor: ['#8E0D80'],
          borderRadius: 10,
          maxBarThickness: 40,
          minBarLength: 10,
          hoverBackgroundColor: ['#8E0D80']
        }
      ]
    },
    options: {
      scales: {
        x: {
          display: false,
          grid: {
            display: false
          },
          ticks: {
            display: false
          }
        },
        y: {
          display: false,
          beginAtZero: true,
          // 교통비 최댓값
          max: traficMonthFeeSum + traficMonthFeeSum / 4
        }
      },
      plugins: {
        tooltip: {
          enabled: false
        },
        legend: {
          display: false
        },
        datalabels: {
          align: 'top',
          anchor: 'end',
          color: ['#8E0D80'],
          font: function () {
            const size = 16;
            const weight = 700;
            return {
              family: 'Spoqa Han Sans Neo',
              size: size,
              weight: weight
            };
          },
          formatter: function (value) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          }
        }
      },
      responsive: true, // 차트 컨테이너 크기에 따라 반응형으로 조정
      maintainAspectRatio: false // 컨테이너 크기에 맞게 조정
    }
  });
};
</script>

<style scoped></style>
