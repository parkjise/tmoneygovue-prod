<template>
  <sub-header title="환승 내역 문의" />
  <main id="main" class="main mor">
    <div class="container bg_white no_padding">
      <div class="transfer_reward_inquiry">
        <div ref="noScrollDivTop" class="no_scroll top">
          <form>
            <uu-button size="lg" class="btn_date" @click="showCalendarBottom.open()">
              <!-- 날짜 선택 전 -->
              <span v-if="selectedDate.length == 0">날짜를 선택해주세요</span>
              <!-- 날짜 선택시 date 클래스 추가 -->
              <span class="date" v-else>{{ formatDate(selectedDate, 'YYYY.MM.DD') }}</span>
            </uu-button>
            <uu-button
              label="조회"
              size="lg"
              btn-style="line"
              @click="onClickDetail"
              :disabled="selectedDate.length == 0"
            />
          </form>
          <p>최근 6개월까지의 이력만 조회 가능합니다.</p>
        </div>
        <div ref="scrollDiv" class="scroll_wrap" v-if="transferHistoryDetail.length != 0 && showInit">
          <table>
            <colgroup>
              <col width="33.333%" />
              <col width="33.333%" />
              <col width="33.333%" />
            </colgroup>
            <thead>
              <tr class="th_wrap">
                <th>교통수단</th>
                <th>승/하차</th>
                <th>이용시간</th>
              </tr>
            </thead>
            <tbody v-for="(item, i) in transferHistoryDetail" :key="i">
              <tr>
                <td>{{ item.mntnNm }}</td>
                <td>{{ item.trdTypNm }}</td>
                <td class="date">{{ item.trdDrtm }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 환승 내역이 없을 경우 -->
        <div ref="scrollDiv" class="scroll_wrap" v-if="transferHistoryDetail.length == 0 && showInit">
          <div class="no_data">
            <uu-ic size="48" name="exclamation" />
            <p>이용 내역이 존재하지 않습니다.</p>
          </div>
        </div>
        <!-- // 환승 내역이 없을 경우 -->

        <div ref="noScrollDivBottom" class="no_scroll bottom" v-if="showInit">
          <form>
            <uu-textarea v-model="msg" label="문의 내용" placeholder="문의하실 내용을 작성해 주세요." />
          </form>
          <div class="ticket_notice">
            <p class="title">
              <uu-ic size="16" name="exclamation" />
              문의하신 내역은 메뉴>고객지원>1:1문의에서 확인 가능 합니다.
            </p>
          </div>
          <div class="btn_area">
            <uu-button
              btn-color="primary"
              size="xl"
              label="문의 접수하기"
              :disabled="msg.length == 0"
              @click="onClickInquiry"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
  <!-- 조회 날짜 선택-->
  <transfer-reward-calendar-bottom ref="showCalendarBottom" @ok="setDate" />
</template>

<script setup lang="ts">
import { useMessageModal } from '@/composables/useMessageModal';
import TransferRewardCalendarBottom from './component/TransferRewardCalendarBottom.vue';
import { useTransferStore } from '@/service/transfer/transferModule';
import { formatDate } from '@/utils/dateUtils';
import { storeToRefs } from 'pinia';
import { ref, computed, nextTick } from 'vue';
import { useRouter } from 'vue-router';

// scroll
const topHeight = ref<number>(0);
const bottomHeight = ref<number>(0);
const scrollDivHeight = ref<number>(0);
const bodyHeight = ref<number>(0);
const noScrollDivTop = ref<HTMLElement | null>(null);
const noScrollDivBottom = ref<HTMLElement | null>(null);
const scrollDiv = ref<HTMLElement | null>(null);

const router = useRouter();
const { createNotificationModal } = useMessageModal();
const transferStore = useTransferStore();
const { getTransferHistoryDetailInfo } = storeToRefs(transferStore);

const showInit = ref(false);
const showCalendarBottom = ref();
const selectedDate = ref<string>(''); // 선택한 날짜
const msg = ref(''); // 문의내역 메세지

const transferHistoryDetail = computed(() => getTransferHistoryDetailInfo.value);

// 조회하기
const onClickDetail = async () => {
  showInit.value = false;
  transferStore.initTransferHistoryDetail();
  await transferStore.requestTransferHistoryDetail(selectedDate.value);
  showInit.value = true;
  nextTick(() => {
    if (noScrollDivTop.value && noScrollDivBottom.value && scrollDiv.value) {
      calculateHeights();
    }
  });
};

// 문의하기
const onClickInquiry = async () => {
  const cvcpCtt = `문의일: ${formatDate(selectedDate.value, 'YYYY.MM.DD')}\n${msg.value}`;
  const params = { cvcpTypCd: '23', cvcpCtt, cvcpTtlNm: '제목' };
  const res = await transferStore.requestTransferHistoryComplain(params);
  if (res?.scsYn == 'Y') {
    createNotificationModal(
      '문의 접수안내',
      '문의하신 내용이 정상적으로 접수되었습니다.<br/>문의하신 내역은 1:1문의에서 확인 가능합니다.',
      () => okCallback()
    );
  }
};
const okCallback = () => {
  // 1:1문의 화면으로 이동
  router.push({ path: '/customer-support/complain', state: { tap: 1 } });
};

// 날짜 set
const setDate = (dateArr: number[]) => {
  selectedDate.value = `${dateArr[0]}${dateArr[1].toString().padStart(2, '0')}${dateArr[2].toString().padStart(2, '0')}`;
  selectedDate.value = formatDate(selectedDate.value, 'YYYYMMDD');
};

const calculateHeights = () => {
  if (noScrollDivTop.value && noScrollDivBottom.value && scrollDiv.value) {
    topHeight.value = noScrollDivTop.value.clientHeight;
    bottomHeight.value = noScrollDivBottom.value.clientHeight;
    bodyHeight.value = document.body.clientHeight;

    scrollDivHeight.value = bodyHeight.value - topHeight.value - bottomHeight.value - 96;
    scrollDiv.value.style.height = scrollDivHeight.value + `px`;
  }
};
</script>
